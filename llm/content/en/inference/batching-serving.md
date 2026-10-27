A model that generates $200$ tokens per second for one user is fast. A service that must answer thousands of users at once, each expecting their first token within a second and a steady stream after it, on a fixed number of accelerators, is a different problem. [[inference/decoding-sampling]] showed that a single decode stream is limited by memory bandwidth and leaves the arithmetic units nearly idle, and [[inference/kv-cache]] showed that each running request holds memory in proportion to its length. This chapter builds a serving system on those two facts.

The plan is quantitative. We derive the **arithmetic intensity** of a batched decode step and see on a roofline how batching turns idle arithmetic into throughput — for the weights but not for the cache. We compare **static** and **continuous** batching, then the two refinements that separate the phases of generation: **chunked prefill**, which mixes them carefully in one step, and **prefill–decode disaggregation**, which runs them on different machines. Finally we bring in **queueing theory**: Little's law, which links concurrency, throughput and latency, and the M/M/1 queue, which explains why latency explodes as a server approaches full load, and we define the **service-level objectives** that serving systems are judged by.

## Why batching helps: arithmetic intensity {#sec-intensity}

Most of the arithmetic of a Transformer is in its weight matrices. Consider one linear layer with weight $W\in\mathbb{R}^{d_{\text{in}}\times d_{\text{out}}}$ applied to a batch of $B$ token vectors — $B$ sequences in a decode step, or $B$ prompt tokens in prefill.

::: proposition Arithmetic intensity of a linear layer {#prop-linear-intensity}
Multiplying a $(B, d_{\text{in}})$ activation matrix by a $(d_{\text{in}}, d_{\text{out}})$ weight matrix, with all numbers stored in $b$ bytes, performs $2Bd_{\text{in}}d_{\text{out}}$ FLOPs and moves at least $b\,(d_{\text{in}}d_{\text{out}} + Bd_{\text{in}} + Bd_{\text{out}})$ bytes, so its arithmetic intensity is

$$
I(B) = \frac{2Bd_{\text{in}}d_{\text{out}}}{b\,(d_{\text{in}}d_{\text{out}} + B(d_{\text{in}} + d_{\text{out}}))}\approx\frac{2B}{b}\qquad(B\ll d_{\text{in}}, d_{\text{out}}).
$$ {#eq-intensity}
:::

::: proof
Each of the $Bd_{\text{out}}$ outputs is a dot product of length $d_{\text{in}}$: $d_{\text{in}}$ multiplications and $d_{\text{in}}$ additions (counting the first addition to zero), $2Bd_{\text{in}}d_{\text{out}}$ FLOPs. At minimum the weights are read once, the inputs read once and the outputs written once. Dividing gives the formula; when $B$ is small compared with both dimensions the weight term dominates the denominator, and $I\approx2Bd_{\text{in}}d_{\text{out}}/(bd_{\text{in}}d_{\text{out}}) = 2B/b$.
:::

The weights are read once per step however many tokens share them, so each extra sequence in the batch adds arithmetic almost for free until the intensity reaches the ridge point $\pi/\beta$ of the roofline ([[transformers/attention-complexity#def-roofline]]). In 16-bit precision ($b = 2$) the linear layers become compute-bound at a batch of about $B^* = \pi/\beta$ tokens.

The attention part of a decode step behaves differently, because the cache is not shared.

::: proposition Decode attention does not benefit from batching {#prop-attn-intensity}
In a decode step, each sequence reads its own cache of $t$ tokens, $2t\,h_{kv}d_kb$ bytes per layer, and performs $4t\,hd_k$ FLOPs on it ($h$ query heads, each computing $t$ scores and a weighted sum of $t$ values). The intensity is

$$
I_{\text{attn}} = \frac{2h}{h_{kv}\,b},
$$

independent of the batch size and of $t$.
:::

::: proof
FLOPs: per query head, $2td_k$ for the scores and $2td_k$ for the weighted sum of values. Bytes: the keys and values of $h_{kv}$ heads at $t$ positions. Dividing, $4thd_k/(2th_{kv}d_kb) = 2h/(h_{kv}b)$. A second sequence in the batch brings its own cache and its own query, so FLOPs and bytes both double.
:::

With $32$ query heads and $8$ key–value heads in bfloat16, $I_{\text{attn}} = 4$ FLOPs per byte, two orders of magnitude below any ridge point. Grouped-query attention helps exactly by this factor $h/h_{kv}$; nothing that a scheduler does helps. So a decode step has two parts with different behaviour: the weight reads, amortised by batching, and the cache reads, which grow in proportion to the total number of cached tokens.

::: definition A step-time model {#def-step-model}
For a dense model with $N$ parameters ($W = Nb$ bytes of weights) and $s_{\text{KV}}$ bytes of cache per token, a step that decodes one token for each of $B$ sequences with context lengths $t_1,\dots,t_B$ and also prefills $P$ prompt tokens takes approximately

$$
\tau_{\text{step}} = \max\!\left(\frac{2N(B + P)}{\pi_{\text{eff}}},\ \frac{W + s_{\text{KV}}\big(\sum_it_i + P\big)}{\beta_{\text{eff}}}\right) + \tau_0,
$$ {#eq-step}

where $\pi_{\text{eff}}$ and $\beta_{\text{eff}}$ are the arithmetic rate and bandwidth actually achieved (some fraction of the published peaks) and $\tau_0$ is a fixed per-step overhead (kernel launches, scheduling, sampling).
:::

The model ignores the attention FLOPs (small for these lengths, [[inference/decoding-sampling#prop-phases]]) and the overlap of memory traffic with arithmetic, but it captures the two regimes, and every number below comes from it.

::: example A roofline for decoding {#ex-roofline}
Serve the model of [[inference/kv-cache#ex-kv-weights]] ($N = 8\times10^9$, $W = 16$ GB, $s_{\text{KV}} = 128$ KiB) on an accelerator with published peaks of $989$ TFLOP/s and $3.35$ TB/s (an H100 SXM), assuming $60\%$ and $80\%$ of them are achieved and $\tau_0 = 0.2$ ms. (a) At what batch size would the weight reads alone stop being the bottleneck? (b) Compute the step time and throughput for $B = 1, 8, 64, 256$ sequences at context $2000$.
::: solution
(a) With the effective rates, $\pi_{\text{eff}}/\beta_{\text{eff}} = 593.4/2.68 = 221$ FLOPs per byte, so $2B/2\ge221$ needs $B\ge221$ tokens per step (with the published peaks, $295$). (b) Each sequence adds $2000\cdot131{,}072 = 262$ MB of cache reads. $B = 1$: bytes $16.26$ GB, $6.07$ ms $+ 0.2 = 6.27$ ms, $160$ tokens/s. $B = 8$: $18.1$ GB, $6.95$ ms, $1151$ tokens/s. $B = 64$: $32.8$ GB, $12.43$ ms, $5149$ tokens/s. $B = 256$: $83.1$ GB, $31.2$ ms, $8202$ tokens/s, while the arithmetic would take only $6.9$ ms. Batching multiplies throughput by $51$ from $B = 1$ to $B = 256$, but the step never becomes compute-bound at this context length: the cache reads, which batching does not amortise ([[#prop-attn-intensity]]), take over from the weights. Each user's token rate falls from $160$ to $32$ per second.
:::
:::

::: widget plot
f: x/(max(16e9*x/593.4e12, (16e9 + x*t*131072)/2.68e12) + 2e-4)
x: 1, 512
y: 0, 16000
sliders: t=2000:100:32000:100
labels: decode throughput (tokens/s) at context $t$
caption: Throughput of decode steps against the batch size $B$, from the step-time model [[#eq-step]] for the model and accelerator of [[#ex-roofline]], with every sequence at context $t$ (slider). At short contexts throughput rises almost linearly while weight reads dominate, then bends as the cache reads take over; at $t = 32{,}000$ it saturates early. Larger batches always raise throughput here, but each step gets slower, so each user receives tokens more slowly — the throughput–latency trade-off of [[inference/latency-cost]].
:::

## Static and continuous batching {#sec-continuous}

Batching needs requests to batch, and requests arrive at random times and want different numbers of output tokens.

::: definition Static and continuous batching {#def-batching}
- **Static** (request-level) batching forms a batch of up to $B$ waiting requests, runs prefill and decode until *every* request in the batch has finished, and only then forms the next batch. Requests that finish early leave idle slots (padding), and requests that arrive meanwhile wait.
- **Continuous** (iteration-level) batching, introduced by Orca (Yu et al., 2022), schedules at every decode step: finished requests leave the batch immediately and waiting requests join it, up to a limit set by memory.
:::

::: proposition Utilisation of a static batch {#prop-static-util}
A static batch of $B$ requests that generate $n_1,\dots,n_B$ tokens runs for $\max_in_i$ decode steps, of which a fraction

$$
U = \frac{\sum_in_i}{B\max_in_i}
$$

of the token slots do useful work. If the $n_i$ are independent and uniform on $[0, n_{\max}]$, then $\E\big[\max_in_i\big] = \frac{B}{B+1}n_{\max}$ and $U\approx\frac{B+1}{2B}$, which tends to $\tfrac12$ for large batches.
:::

::: proof
Slot $i$ is busy for $n_i$ of the $\max_jn_j$ steps; summing over slots gives the formula. For independent uniforms on $[0, n_{\max}]$, the maximum $M$ has $\Prob(M\le x) = (x/n_{\max})^B$, so $\E M = \int_0^{n_{\max}}\big(1 - (x/n_{\max})^B\big)dx = n_{\max}B/(B + 1)$, while $\E\sum_in_i = Bn_{\max}/2$. The ratio of expectations is $(B + 1)/(2B)$; for large $B$ the maximum concentrates near $n_{\max}$, so the ratio of expectations is also a good approximation of $\E U$.
:::

Half the capacity is wasted by length variation alone, before counting the waiting. Continuous batching removes both losses. Orca's second idea, **selective batching**, made it implementable: the requests in a step have different context lengths, so their attention cannot be one rectangular batched product, but every other operation (the linear layers, the MLP, normalisation) is position-wise and can treat the step's tokens as one flat matrix of shape $(\sum\text{tokens}, d)$. Attention is computed per request — today by kernels that read each request's paged cache ([[inference/kv-cache#def-paged]]) directly. As of 2026, essentially every serving engine for large language models batches continuously.

::: quiz
A static batch holds four requests that generate $100$, $200$, $300$ and $400$ tokens. What fraction of the decode slots does useful work?
- [ ] $1$
- [x] $0.625$
- [ ] $0.25$
- [ ] $0.5$
::: solution
The batch runs $400$ steps with $4$ slots, $1600$ slot-steps, of which $100 + 200 + 300 + 400 = 1000$ produce tokens: $1000/1600 = 0.625$ ([[#prop-static-util]]). Continuous batching would give the three freed slots to waiting requests.
:::
:::

### Chunked prefill {#sec-chunked}

Continuous batching raises a new question: when a request joins, its prompt must be prefilled. Running that prefill as a separate step stalls every running request for its duration; running it in the same step as the decodes makes that step long. Either way, the running requests see a spike in their time per output token whenever a long prompt arrives.

::: definition Chunked prefill {#def-chunked}
**Chunked prefill** (Agrawal et al., 2023; 2024) fixes a **token budget** $C$ per step. Each step first includes one token for every decoding request, then fills the rest of the budget with prompt tokens of joining requests, splitting a long prompt into chunks prefilled over several consecutive steps (each chunk attending to the cache of the previous chunks).
:::

The budget bounds the length of every step and so the time between tokens. It also improves efficiency: a decode-only step is memory-bound with idle arithmetic, and prefill tokens are exactly the compute-heavy work that can use it. By [[#eq-step]], adding prompt tokens to a memory-bound decode step is nearly free until the step becomes compute-bound. Agrawal et al. describe this as "piggybacking" decodes on prefills. The cost is a slightly longer time to first token for long prompts, which are now spread over several steps.

### Prefill–decode disaggregation {#sec-disagg}

The phases want different things: prefill is compute-bound and its latency is TTFT; decode is memory-bound and its latency is TPOT. Mixing them on one accelerator means each interferes with the other and both must use the same parallel configuration. **Disaggregation** runs them on separate pools of accelerators: a prefill instance processes the prompt and transfers the resulting KV cache to a decode instance, which generates the output. DistServe (Zhong et al., 2024) and Splitwise (Patel et al., 2024) showed that, when TTFT and TPOT targets are both tight, choosing separate degrees of parallelism and separate numbers of instances for each phase can serve more requests per accelerator within those targets. The price is the transfer of the cache and more complex scheduling.

::: example The cost of moving a cache {#ex-transfer}
After prefilling a $2000$-token prompt for the model of [[#ex-roofline]], a prefill instance sends the cache to a decode instance over a link that sustains $50$ GB/s. How long does the transfer take, compared with the prefill and with one decode step?
::: solution
The cache is $2000\cdot131{,}072 = 262$ MB, so the transfer takes $262\times10^6/50\times10^9 = 5.2$ ms. Prefill takes about $2\cdot8\times10^9\cdot2000/593.4\times10^{12} = 54$ ms, and a decode step $6$–$30$ ms. The transfer adds about $10\%$ to TTFT and can be overlapped with prefill layer by layer. For a model with a cache per token ten times larger (full multi-head attention on a bigger model) or a slower link, the transfer becomes comparable to prefill, and disaggregation pays only if interference was costing more.
:::
:::

### A simulation {#sec-sim}

The listing simulates one accelerator under the step-time model of [[#ex-roofline]], serving $2000$ requests that arrive as a Poisson process, with prompts uniform on $100$–$1000$ tokens and outputs uniform on $10$–$500$ tokens, and a maximum of $64$ concurrent requests (set by cache memory). It compares static batching, continuous batching with each prompt prefilled whole in the step it joins, and continuous batching with chunked prefill and a budget of $512$ tokens per step. It also checks Little's law (below) and the M/M/1 formula.

```python
import math, random

# Step-time model of one accelerator serving an 8B-parameter model in bfloat16
PI, BETA = 989e12 * 0.6, 3.35e12 * 0.8     # achievable FLOP/s and bytes/s (60% and 80% of peak)
N, W, KV = 8e9, 16e9, 131072               # parameters, weight bytes, cache bytes per token
def step_time(decode_ctx, prefill_tokens=0):
    """decode_ctx: context lengths of the sequences decoding one token this step;
    prefill_tokens: prompt tokens processed in the same step."""
    flops = 2 * N * (len(decode_ctx) + prefill_tokens)
    bytes_ = W + KV * (sum(decode_ctx) + prefill_tokens)      # weights once, caches read/written
    return max(flops / PI, bytes_ / BETA) + 2e-4                # plus a fixed per-step overhead

for B in (1, 8, 64, 256):
    t = step_time([2000] * B)
    print(f"decode batch {B:3d}: step {t * 1e3:6.2f} ms, {B / t:8.0f} tokens/s")

def make_requests(n, rate, seed):
    rng = random.Random(seed); t = 0.0; reqs = []
    for i in range(n):
        t += rng.expovariate(rate)                              # Poisson arrivals
        reqs.append({"arrive": t, "prompt": rng.randint(100, 1000), "out": rng.randint(10, 500)})
    return reqs

def simulate(reqs, policy, max_batch=64, chunk=512):
    clock, queue, running, done, i, gaps = 0.0, [], [], [], 0, []
    while len(done) < len(reqs):
        while i < len(reqs) and reqs[i]["arrive"] <= clock: queue.append(reqs[i]); i += 1
        if not running and not queue:                            # idle: jump to the next arrival
            clock = reqs[i]["arrive"]; continue
        if policy != "static" or not running:                    # static: refill only an empty batch
            while queue and len(running) < max_batch:
                r = queue.pop(0); r["pf"], r["gen"] = r["prompt"], 0; running.append(r)
        dec = [r for r in running if r["pf"] == 0 and "finish" not in r]
        pad = [r for r in running if "finish" in r]              # static: finished but still computed
        budget = chunk - len(dec) if policy == "chunked" else math.inf
        pre = {}
        for r in running:                                        # prompt tokens to prefill this step
            if r["pf"] > 0 and budget > 0:
                pre[id(r)] = min(r["pf"], budget); budget -= pre[id(r)]
        dt = step_time([r["prompt"] + r["gen"] for r in dec + pad], sum(pre.values()))
        clock += dt
        for r in running:
            if id(r) in pre:
                r["pf"] -= pre[id(r)]
                if r["pf"] == 0: r["gen"], r["first"], r["last"] = 1, clock, clock
        for r in dec:
            r["gen"] += 1; gaps.append(clock - r["last"]); r["last"] = clock
            if r["gen"] >= r["out"]: r["finish"] = clock
        if policy == "static":
            if all("finish" in r for r in running): done += running; running = []
        else:
            done += [r for r in running if "finish" in r]
            running = [r for r in running if "finish" not in r]
    return clock, done, sorted(gaps)

def in_system_average(done, end):           # time average of (arrived - finished), from event times
    ev = sorted([(r["arrive"], 1) for r in done] + [(r["finish"], -1) for r in done])
    area, n, last = 0.0, 0, 0.0
    for t, step in ev: area += n * (t - last); n += step; last = t
    return area / end

for rate in (8.0, 20.0):
    for policy in ("static", "continuous", "chunked"):
        reqs = make_requests(2000, rate, seed=1)
        end, done, gaps = simulate(reqs, policy)
        lat = sorted(r["finish"] - r["arrive"] for r in done)
        ttft = sorted(r["first"] - r["arrive"] for r in done)
        W_mean = sum(lat) / len(lat)
        print(f"rate {rate:2.0f}/s {policy:10s}: {sum(r['out'] for r in done) / end:4.0f} tok/s | "
              f"latency mean {W_mean:5.2f} s | TTFT p50 {ttft[len(ttft) // 2]:6.3f} s | "
              f"TPOT p99 {1e3 * gaps[int(0.99 * len(gaps))]:5.1f} ms | "
              f"L {in_system_average(done, end):5.1f} = lambda*W {len(done) / end * W_mean:5.1f}")

# M/M/1 queue: simulated mean time in system against 1/(mu - lambda)
rng = random.Random(7); mu = 1.0
for rho in (0.5, 0.8, 0.9):
    lam, t, free_at, total, n = rho * mu, 0.0, 0.0, 0.0, 1000000
    for _ in range(n):
        t += rng.expovariate(lam)
        start = max(t, free_at); free_at = start + rng.expovariate(mu)
        total += free_at - t
    print(f"rho={rho}: simulated W = {total / n:5.2f}, formula 1/(mu-lambda) = {1 / (mu - lam):5.2f}")
```

Output:

```
decode batch   1: step   6.27 ms,      160 tokens/s
decode batch   8: step   6.95 ms,     1151 tokens/s
decode batch  64: step  12.43 ms,     5149 tokens/s
decode batch 256: step  31.21 ms,     8202 tokens/s
rate  8/s static    : 1985 tok/s | latency mean  4.32 s | TTFT p50  2.450 s | TPOT p99   7.8 ms | L  33.5 = lambda*W  33.5
rate  8/s continuous: 2012 tok/s | latency mean  1.87 s | TTFT p50  0.020 s | TPOT p99  23.5 ms | L  14.7 = lambda*W  14.7
rate  8/s chunked   : 2012 tok/s | latency mean  1.83 s | TTFT p50  0.023 s | TPOT p99  14.0 ms | L  14.3 = lambda*W  14.3
rate 20/s static    : 3121 tok/s | latency mean 34.57 s | TTFT p50 32.874 s | TPOT p99   8.8 ms | L 420.8 = lambda*W 420.8
rate 20/s continuous: 4933 tok/s | latency mean  2.51 s | TTFT p50  0.026 s | TPOT p99  30.2 ms | L  48.3 = lambda*W  48.3
rate 20/s chunked   : 4935 tok/s | latency mean  2.29 s | TTFT p50  0.028 s | TPOT p99  14.0 ms | L  44.0 = lambda*W  44.0
rho=0.5: simulated W =  2.00, formula 1/(mu-lambda) =  2.00
rho=0.8: simulated W =  5.01, formula 1/(mu-lambda) =  5.00
rho=0.9: simulated W = 10.15, formula 1/(mu-lambda) = 10.00
```

At $8$ requests per second (a demand of about $2000$ tokens/s) all three policies keep up, but static batching makes each request wait for a batch to form and finish: median TTFT $2.45$ s against $20$ ms. At $20$ requests per second the demand, about $5100$ tokens/s, exceeds what static batching can deliver ($3121$): its queue grows throughout the run and mean latency reaches $35$ s, while continuous batching delivers $4933$ tokens/s with $2.5$ s mean latency. Static batching has the smoothest token stream (TPOT p99 $8.8$ ms), because nothing joins a running batch; continuous batching with whole-prompt prefill has p99 gaps of $30$ ms, the steps in which a prompt joined; chunked prefill caps them at $14$ ms with almost no change in TTFT. In every run the time-averaged number of requests in the system equals arrival rate times mean latency, as the next section proves it must.

## Queueing: Little's law and the M/M/1 queue {#sec-queueing}

A serving system is a queue: requests arrive, wait, are served, leave. Two results from queueing theory explain most of what is observed.

::: theorem Little's law {#thm-little}
Consider any system that requests enter and leave, observed over $[0, \mathcal{T}]$, empty at times $0$ and $\mathcal{T}$. Let $n$ requests arrive, let $W_i$ be the time request $i$ spends in the system, and let $N(t)$ be the number in the system at time $t$. Then

$$
\underbrace{\frac1{\mathcal{T}}\int_0^{\mathcal{T}}N(t)\,dt}_{\bar L} = \underbrace{\frac{n}{\mathcal{T}}}_{\bar\lambda}\cdot\underbrace{\frac1n\sum_{i=1}^nW_i}_{\bar W}.
$$ {#eq-little}

If, as $\mathcal{T}\to\infty$, the arrival rate and mean time in system converge to $\lambda$ and $W$, the mean number in system converges to $L = \lambda W$.
:::

::: proof
Write $N(t) = \sum_i\mathbb{1}[a_i\le t < a_i + W_i]$, where $a_i$ is the arrival time of request $i$. Since every request arrives and leaves within $[0, \mathcal{T}]$, integrating term by term gives $\int_0^{\mathcal{T}}N(t)\,dt = \sum_i\int_0^{\mathcal{T}}\mathbb{1}[a_i\le t < a_i + W_i]\,dt = \sum_iW_i$. Divide both sides by $\mathcal{T}$ and write $\sum_iW_i/\mathcal{T} = (n/\mathcal{T})(\sum_iW_i/n)$. The limit statement follows by applying this to long intervals (the boundary terms from requests in progress at the ends become negligible when $W_i$ is small compared with $\mathcal{T}$).
:::

The law needs no assumption about arrivals, service times or scheduling, which makes it the first tool of capacity planning: **concurrency = throughput × latency**. It applies at any level — requests in a server, tokens in flight, sequences holding cache memory.

::: example Sizing a deployment with Little's law {#ex-little}
A chat service expects $30$ requests per second at peak. Each request spends on average $4$ s in the system (queueing, prefill and $\sim$$300$ output tokens). How many requests are in the system on average? If each accelerator can hold the caches of $55$ concurrent requests ([[inference/kv-cache#ex-kv-weights]]), how many accelerators are needed at minimum?
::: solution
$L = \lambda W = 30\cdot4 = 120$ requests in the system on average. At $55$ per accelerator, at least $\lceil120/55\rceil = 3$ accelerators are needed for the average alone. Since the number in the system fluctuates around its mean and latency rises steeply near full load (below), a deployment would provision noticeably more, and would check that each accelerator also sustains the token throughput, $30\cdot300/3 = 3000$ tokens/s, within the TPOT target.
:::
:::

Little's law relates averages; to see how latency depends on load we need a model of randomness. The simplest is the M/M/1 queue: Poisson arrivals at rate $\lambda$ ("M" for memoryless), exponentially distributed service times with rate $\mu$, one server, first come first served.

::: proposition Latency of the M/M/1 queue {#prop-mm1}
If $\rho = \lambda/\mu < 1$, the M/M/1 queue has stationary distribution $\Prob(N = n) = (1 - \rho)\rho^n$ for $n = 0, 1, 2,\dots$, mean number in system $L = \rho/(1 - \rho)$, and mean time in system

$$
W = \frac{1}{\mu - \lambda} = \frac{1/\mu}{1 - \rho}.
$$ {#eq-mm1}
:::

::: proof
The number in the system is a birth–death Markov chain: it rises by one at rate $\lambda$ and, when positive, falls by one at rate $\mu$. In a stationary distribution $\pi$, the probability flow across the cut between $n$ and $n + 1$ balances: $\lambda\pi_n = \mu\pi_{n+1}$, so $\pi_n = \rho^n\pi_0$. Normalising, $\sum_n\rho^n\pi_0 = \pi_0/(1 - \rho) = 1$ requires $\rho < 1$ and gives $\pi_0 = 1 - \rho$. Then $L = \sum_nn(1 - \rho)\rho^n = \rho/(1 - \rho)$, using $\sum_nn\rho^n = \rho/(1 - \rho)^2$. By Little's law, $W = L/\lambda = \frac{\rho}{\lambda(1 - \rho)} = \frac1{\mu(1 - \rho)} = \frac1{\mu - \lambda}$.
:::

The factor $1/(1 - \rho)$ is the lesson: at $50\%$ utilisation a request spends twice its service time in the system, at $90\%$ ten times, and as $\rho\to1$ the delay is unbounded. A serving system is not an M/M/1 queue — it serves many requests at once, and its service rate depends on the batch — but the qualitative shape survives in every queueing model with random arrivals: latency grows without bound as load approaches capacity, and the last few percent of utilisation are bought with large increases in delay. The simulation's static batching at $20$ requests per second shows the extreme case, $\rho > 1$, where the queue simply grows.

::: widget plot
f: 1/(1-x); log(100)/(1-x)
x: 0, 0.95
y: 0, 60
labels: mean time in system $W\mu$; 99th percentile ($\ln 100/(1-\rho)$)
vlines: 0.8
caption: Time in system of an M/M/1 queue, in units of the mean service time $1/\mu$, against the utilisation $\rho$. The mean is $1/(1-\rho)$ ([[#prop-mm1]]); the time in system is exponentially distributed, so its 99th percentile is $\ln 100\approx4.6$ times the mean. Operators keep utilisation well below $1$ — often below the dashed line at $0.8$ — to keep tail latency bounded.
:::

## Service-level objectives {#sec-slo}

Users experience a stream of tokens, so a single latency number does not describe a language-model service.

::: definition Latency metrics and goodput {#def-slo}
For a request with $n$ output tokens:

- **Time to first token** (TTFT): from arrival to the first output token; it includes queueing and prefill.
- **Time per output token** (TPOT, or inter-token latency): the mean gap between consecutive output tokens after the first; its tail (the 99th percentile of gaps) measures stutter.
- **End-to-end latency**: $\text{TTFT} + (n - 1)\,\text{TPOT}$.

A **service-level objective** (SLO) sets targets for these, usually on percentiles (for example, p99 TTFT below $1$ s and p99 TPOT below $50$ ms). **Goodput** is the highest request rate at which a stated fraction of requests meets all the SLOs (Zhong et al., 2024).
:::

Throughput alone rewards a system for building huge batches that make every user wait; goodput counts only the work delivered within the targets, and is what disaggregation and chunked prefill were designed to raise. The targets depend on the application. A chat interface needs a TTFT of well under a second and a TPOT faster than reading speed (a person reads perhaps $4$–$8$ tokens per second, so $50$–$100$ ms per token suffices); a coding assistant completing a line needs the whole output fast; a batch job summarising documents overnight cares only about cost per token ([[inference/latency-cost]]).

::: example The largest batch that meets a TPOT target {#ex-tpot}
For the model and accelerator of [[#ex-roofline]], with every sequence at context $4000$, what is the largest decode batch whose step time stays within a TPOT target of $30$ ms? Does memory allow it, given $60$ GB for the cache?
::: solution
The step is memory-bound (the compute term at $B\approx120$ is under $4$ ms), so we need $(16\times10^9 + B\cdot4000\cdot131{,}072)/2.68\times10^{12} + 0.2\text{ ms}\le30$ ms, i.e. $16\times10^9 + 5.24\times10^8B\le7.99\times10^{10}$, $B\le121.8$: $121$ sequences. But $60$ GB holds $6\times10^{10}/131{,}072 = 457{,}800$ tokens, only $114$ sequences of $4000$. Memory binds first: at $B = 114$ the step takes $28.5$ ms and the accelerator delivers about $4000$ tokens/s. A tighter TPOT target, say $15$ ms, would cut the batch to $B\le45$ and the throughput with it — the latency target and the memory capacity together set the operating point.
:::
:::

::: warning "Higher throughput means a better serving system"
Throughput (tokens per second per accelerator) can always be raised by enlarging batches and admitting more requests — until memory runs out — while latency gets worse for everyone. Two systems must be compared on the same workload at the same latency targets, ideally by goodput or by a throughput–latency curve, not by peak throughput. Benchmarks that report throughput without the request-arrival pattern, prompt and output lengths and latency percentiles are not comparable.
:::

### Scheduling under memory pressure

Continuous batching admits requests according to memory, but outputs grow and their final lengths are unknown, so a system may run out of cache blocks mid-generation. The usual remedy is **preemption**: suspend one or more requests (typically the most recently admitted), free their blocks, and resume them later, either by **swapping** their cache to host memory and back or by **recomputing** it with a fresh prefill of prompt plus generated tokens — recomputation is often cheaper because prefill is efficient ([[inference/decoding-sampling#prop-phases]]). Schedulers also bound the number of queued requests (admission control, returning an error rather than accepting a request that cannot meet its SLO), give priority to interactive traffic over batch traffic, and route requests that share a prefix to the same replica so that prefix caching ([[inference/kv-cache#def-prefix]]) hits.

### Serving engines

As of 2026 the techniques of this chapter are implemented by several open-source serving engines, among them vLLM (from 2023, which introduced paged attention), Hugging Face Text Generation Inference (from 2023), NVIDIA TensorRT-LLM (from 2023), SGLang (from 2024, with radix-tree prefix caching) and, for local and CPU inference, llama.cpp (from 2023). They share the architecture described here: an HTTP front end, a scheduler running continuous batching over a paged cache, optional chunked prefill and prefix caching, kernels for attention over paged caches and for quantised weights ([[inference/quantisation]]), and support for splitting a model across accelerators by tensor or pipeline parallelism ([[scaling/model-parallelism]]) when its weights do not fit on one. Their relative performance changes from release to release and depends on the workload, so it is measured, not assumed.

::: application Splitting a model for serving
When a model is split across $k$ accelerators by tensor parallelism, each step reads $1/k$ of the weights from each device, so the memory-bound decode step is up to $k$ times faster for the same batch — at the price of communication between devices in every layer. Pipeline parallelism, by contrast, does not shorten a single step for a single request; it raises throughput by keeping several micro-batches in flight. For interactive serving, tensor parallelism within a machine with fast interconnect is the usual choice; see [[scaling/model-parallelism]].
:::

::: history
Batching requests to share weight reads is as old as serving neural networks on GPUs; the problem specific to autoregressive models — requests of unpredictable length — was addressed by Orca (Yu, Jeong, Kim, Kim and Chun, OSDI 2022), which introduced iteration-level scheduling and selective batching. PagedAttention (Kwon et al., SOSP 2023) removed the memory waste that limited batch sizes. Agrawal and colleagues proposed chunked prefill ("Sarathi", 2023, and Sarathi-Serve, OSDI 2024); Zhong and colleagues' DistServe (OSDI 2024) and Patel and colleagues' Splitwise (ISCA 2024) separated prefill from decode and introduced goodput under SLOs as the target. The queueing results are classical: Erlang (1909) studied telephone exchanges with Poisson arrivals, Kendall (1953) introduced the A/S/c notation, and Little (1961) proved $L = \lambda W$.
:::

::: summary
- A linear layer on $B$ tokens has arithmetic intensity about $2B/b$: batching amortises the weight reads, and the layers become compute-bound only at a batch near the ridge point (some $200$–$300$ tokens in 16-bit on current GPUs).
- Decode attention has intensity $2h/(h_{kv}b)$ whatever the batch: cache reads are never amortised, and at long contexts they dominate the step.
- **Static batching** wastes slots on padding (utilisation about $\tfrac12$ with uniform lengths) and makes requests wait; **continuous batching** schedules every step and is universal.
- **Chunked prefill** bounds each step with a token budget, mixing compute-heavy prompt chunks into memory-bound decode steps; **disaggregation** runs prefill and decode on separate pools and transfers the cache.
- **Little's law** $L = \lambda W$ holds for any system; the M/M/1 queue gives $W = 1/(\mu - \lambda)$, so latency explodes as utilisation approaches $1$.
- Services are judged by **TTFT**, **TPOT** and their percentiles against SLOs, and by **goodput**, not by raw throughput.
:::

## Exercises

::: exercise Little's law {level=1 check="120"}
A server completes $30$ requests per second in steady state and each request spends $4$ s in it. How many requests are in the server on average?
::: solution
$L = \lambda W = 30\cdot4 = 120$.
:::
:::

::: exercise An M/M/1 server {level=1 check="0.5"}
Requests arrive at $8$ per second and the server completes them at rate $10$ per second (exponential service times). What is the mean time in the system, in seconds?
::: solution
$W = 1/(\mu - \lambda) = 1/(10 - 8) = 0.5$ s, five times the mean service time of $0.1$ s, since $\rho = 0.8$.
:::
:::

::: exercise End-to-end latency {level=1 check="10.3"}
A request has a TTFT of $0.3$ s and a TPOT of $25$ ms, and generates $401$ tokens. What is its end-to-end latency in seconds?
::: solution
$0.3 + 400\cdot0.025 = 10.3$ s. The first token is covered by the TTFT; the remaining $400$ each take one TPOT.
:::
:::

::: exercise Exact intensity of a small batch {level=2 check="15.88"}
Compute, to two decimal places, the arithmetic intensity ([[#eq-intensity]]) of a $4096\times4096$ linear layer applied to a batch of $16$ tokens in 16-bit precision.
::: solution
FLOPs: $2\cdot16\cdot4096^2 = 5.37\times10^8$. Bytes: $2(4096^2 + 16\cdot8192) = 2(16{,}777{,}216 + 131{,}072) = 33{,}816{,}576$. Ratio: $536{,}870{,}912/33{,}816{,}576 = 15.88$ FLOPs per byte, just below the approximation $2B/b = 16$.
:::
:::

::: exercise The ridge batch {level=2 check="295"}
An accelerator has a peak of $989$ TFLOP/s and $3.35$ TB/s. Using $I\approx2B/b$ with $b = 2$, from what batch size (nearest integer) are the linear layers of a decode step compute-bound at peak rates?
::: solution
The ridge point is $989/3.35 = 295.2$ FLOPs per byte, and $I = B$ in 16-bit precision, so $B\approx295$. With $8$-bit weights ($b = 1$ for the weights) the intensity doubles and the ridge batch halves — one reason quantisation helps throughput as well as memory.
:::
:::

::: exercise Attention intensity with GQA {level=2 check="4"}
A model has $32$ query heads and $8$ key–value heads and keeps its cache in bfloat16. What is the arithmetic intensity, in FLOPs per byte, of decode attention? What would it be with an 8-bit cache?
::: solution
$2h/(h_{kv}b) = 2\cdot32/(8\cdot2) = 4$ FLOPs per byte ([[#prop-attn-intensity]]). With an $8$-bit cache, $b = 1$ and the intensity is $8$: the step reads half as many bytes for the same arithmetic.
:::
:::

::: exercise Tail latency of an M/M/1 queue {level=2}
In the M/M/1 queue the time in system of a request is exponentially distributed with rate $\mu - \lambda$ (you may assume this). Derive its $q$-quantile, and compute the 99th percentile for $\mu = 10$/s, $\lambda = 8$/s. By what factor must $\lambda$ be reduced to halve it?
::: solution
$\Prob(W > w) = e^{-(\mu - \lambda)w}$; setting it to $1 - q$ gives $w_q = \ln\frac{1}{1 - q}/(\mu - \lambda)$. For $q = 0.99$: $\ln100/2 = 2.30$ s, against a mean of $0.5$ s. Halving it needs $\mu - \lambda$ doubled, to $4$: $\lambda = 6$/s, a reduction by a factor of $0.75$ in load to halve the tail latency.
:::
:::

::: exercise Choosing a chunk size {level=3 check="670"}
Under the step-time model of [[#ex-roofline]], a step decodes $64$ sequences at context $2000$ and also prefills $C$ prompt tokens. The TPOT target is $20$ ms per step. What is the largest integer $C$ that meets it?
::: solution
The memory term is $(16\times10^9 + 131{,}072(64\cdot2000 + C))/2.68\times10^{12}$, about $12.2$ ms plus $0.05$ µs per prompt token, so it stays below $20$ ms for any $C$ in question. The compute term is $2\cdot8\times10^9(64 + C)/593.4\times10^{12}$. With the overhead, the step meets $20$ ms when $1.6\times10^{10}(64 + C)/593.4\times10^{12}\le19.8\times10^{-3}$, i.e. $64 + C\le734.4$, $C\le670$. (For $C = 670$ the memory term is about $12.3$ ms, so the compute term, $19.8$ ms, decides.) A budget of $512$, as in the simulation, leaves headroom for longer contexts.
:::
:::

::: exercise When disaggregation pays {level=3}
Model a mixed (non-disaggregated) server as follows: each prefill of $P$ tokens takes $t_p$ and, while it runs, delays all running decodes by $t_p$ (no chunking). A disaggregated pair instead adds a cache transfer time $t_x = Ps_{\text{KV}}/\beta_{\text{link}}$ to TTFT and never delays decodes. With prompts arriving at rate $\lambda$ per decode instance, express the fraction of time decodes are stalled in the mixed server, and derive a condition under which disaggregation lowers mean TPOT without raising mean TTFT by more than a factor $1 + \epsilon$. Evaluate it for the numbers of [[#ex-transfer]] with $\lambda = 8$/s.
::: solution
In the mixed server, prefills occupy a fraction $\lambda t_p$ of the time (for $\lambda t_p < 1$), and during it no decode tokens are produced, so the mean TPOT is inflated by a factor of about $1/(1 - \lambda t_p)$ compared with a decode-only server. Disaggregation removes the stalls entirely (decodes run on their own instance) and raises TTFT by $t_x$, so the TTFT condition is $t_x\le\epsilon\,\text{TTFT}\approx\epsilon\,t_p$, i.e. $Ps_{\text{KV}}/\beta_{\text{link}}\le\epsilon t_p$. With $t_p = 54$ ms, $t_x = 5.2$ ms and $\lambda = 8$/s: the mixed server is stalled $8\cdot0.054 = 43\%$ of the time, inflating TPOT by $1/0.57 = 1.76$; disaggregation raises TTFT by $5.2/54 = 9.6\%$, so it pays whenever a TTFT increase of about $10\%$ is acceptable. This crude model ignores that chunked prefill reduces the stalls without any transfer, and that disaggregation needs enough load to keep both pools busy; real comparisons (DistServe, Splitwise, Sarathi-Serve) measure goodput under SLOs on recorded workloads.
:::
:::

::: exercise Static batching with a maximum length {level=3}
In [[#prop-static-util]], suppose instead that output lengths are exponentially distributed with mean $m$, capped at $n_{\max} = 8m$. Estimate by simulation (plain Python, seeded) the utilisation of a static batch of $B = 32$, and explain why it is lower than with uniform lengths.
::: solution
```python
import random
rng = random.Random(0); m, B, trials = 100, 32, 20000
u = 0.0
for _ in range(trials):
    n = [min(rng.expovariate(1 / m), 8 * m) for _ in range(B)]
    u += sum(n) / (B * max(n)) / trials
print(round(u, 3))    # 0.261
```
The utilisation is about $0.26$. The mean of the capped exponential is about $m$, but the expected maximum of $B$ exponentials is $m\sum_{k\le B}1/k$, which for $B = 32$ is $4.06m$, so $U\approx1/4$ (the simulated mean of the ratio, $0.261$, is slightly above the ratio of the means). Long-tailed output lengths — common in practice, since a few requests generate far more than the rest — make static batching much worse than the uniform case's $\tfrac12$, while continuous batching is unaffected by the tail.
:::
:::
