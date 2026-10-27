The previous chapters each removed one bottleneck: batching amortises weight reads, paging and quantisation make room for more requests, speculative decoding converts idle arithmetic into tokens, and FlashAttention makes long prompts tractable. This chapter puts them together into the three numbers that users and operators care about — **how fast** (time to first token and time per output token), **how much** (throughput, and so cost per token) and **at what energy** — and into a method for improving them.

The approach is the one this course has used throughout: estimate before you measure, and measure before you optimise. We derive the best-case token rate of a device from its memory bandwidth, build the **throughput–latency curve** of a deployment from a roofline step-time model and show that every batch size is a Pareto-optimal trade-off, turn throughput into **cost per million tokens** and **energy per token** with clearly labelled illustrative prices and power figures, and end with a checklist that maps each bottleneck to the techniques of the earlier chapters. All hardware figures are dated and used as examples; prices in particular change quickly and differ between providers, and the ones below are **illustrative assumptions, not quotes**.

## Latency from first principles {#sec-latency}

From [[inference/batching-serving#def-slo]], a request with $n$ output tokens has end-to-end latency $\text{TTFT} + (n - 1)\,\text{TPOT}$. Each term has a lower bound set by hardware.

::: proposition Bandwidth bound on the token rate {#prop-bandwidth}
A decode step that reads $W$ bytes of weights and, for each of $B$ sequences with mean context $\bar t$, $s_{\text{KV}}\bar t$ bytes of cache, from memory of bandwidth $\beta$, takes at least

$$
\text{TPOT}\ \ge\ \frac{W + Bs_{\text{KV}}\bar t}{\beta}.
$$

So a single stream ($B = 1$, short context) cannot exceed $\beta/W$ tokens per second, and the aggregate throughput $B/\text{TPOT}$ cannot exceed $\beta/(s_{\text{KV}}\bar t)$, however large the batch, nor $\pi/(2N)$ for a dense model of $N$ parameters at arithmetic rate $\pi$.
:::

::: proof
Every weight and every cached key and value of every sequence must be read in each step, which takes the stated time at bandwidth $\beta$ (overlap with arithmetic can hide the arithmetic, not the reads). For $B = 1$ and negligible cache, the rate is at most $1/\text{TPOT}\le\beta/W$. In general $B/\text{TPOT}\le B\beta/(W + Bs_{\text{KV}}\bar t) < \beta/(s_{\text{KV}}\bar t)$. Independently, the step performs at least $2NB$ FLOPs, so $\text{TPOT}\ge2NB/\pi$ and $B/\text{TPOT}\le\pi/(2N)$.
:::

The first bound is the quickest estimate in inference: **tokens per second per stream $\approx$ bandwidth / bytes of weights**. A $70$-billion-parameter model quantised to about $35$ GB on a device with $3.35$ TB/s cannot exceed about $96$ tokens per second for one user, whatever the software; in 16 bits on two such devices (with tensor parallelism, [[scaling/model-parallelism]]), $140$ GB over $6.7$ TB/s, about $48$. Real systems reach a fraction of these bounds — commonly well over half for well-optimised decode kernels at small batch, but less when communication, sampling and scheduling overheads are counted.

Time to first token is bounded similarly by prefill arithmetic, $2NP/\pi$ for a prompt of $P$ tokens (plus attention, quadratic in $P$, [[inference/long-context#prop-crossover-len]]), and in a loaded system by the time spent queueing, which grows without bound as utilisation approaches $1$ ([[inference/batching-serving#prop-mm1]]).

::: example Latency budget of a chat reply {#ex-budget}
On the accelerator of [[inference/batching-serving#ex-roofline]] (achieved $593$ TFLOP/s and $2.68$ TB/s), an $8$-billion-parameter model in bfloat16 serves a request with a $1500$-token prompt and a $400$-token reply in a batch of $64$ at context about $2000$. Ignoring queueing, estimate TTFT, TPOT and end-to-end latency. Which term dominates?
::: solution
Prefill: $2\cdot8\times10^9\cdot1500/593.4\times10^{12} = 40$ ms, plus the step in which it runs. TPOT: $12.4$ ms ([[inference/batching-serving#ex-roofline]]). End to end: $0.04 + 399\cdot0.0124 = 5.0$ s, of which $99\%$ is decode. For chat, output length and TPOT dominate; TTFT dominates only for long prompts with short answers (classification, extraction, retrieval-augmented question answering with a one-line answer).
:::
:::

## The throughput–latency curve {#sec-pareto}

Raising the batch size raises throughput and slows every stream. Using the step-time model of [[inference/batching-serving#def-step-model]], for a fixed configuration (model, precision, hardware) and context, write $\tau(B)$ for the decode step time at batch $B$ and $R(B) = B/\tau(B)$ for the throughput.

::: proposition Every batch size is a Pareto-optimal operating point {#prop-pareto}
If $\tau(B) = \max\big(a + bB,\ cB\big) + \tau_0$ with $a, b, c, \tau_0 > 0$ (memory term $a + bB$, compute term $cB$, overhead $\tau_0$), then both $\tau(B)$ and $R(B)$ are strictly increasing in $B$. Hence no batch size gives both lower latency and higher throughput than another: the points $(\tau(B), R(B))$ form a **Pareto frontier**, and choosing $B$ means choosing a trade-off. Throughput rises towards $\min(1/b, 1/c)$.
:::

::: proof
$\tau$ is a maximum of increasing functions of $B$ plus a constant, so it is strictly increasing. For throughput, $R(B) = B/\tau(B)$. On the memory branch, $R = B/(a + \tau_0 + bB)$, whose derivative $(a + \tau_0)/(a + \tau_0 + bB)^2$ is positive. On the compute branch, $R = B/(cB + \tau_0)$, with derivative $\tau_0/(cB + \tau_0)^2 > 0$. Since $\tau$ is continuous and $R$ increases on each branch, $R$ is increasing overall. If $B_1 < B_2$ then $\tau(B_1) < \tau(B_2)$ and $R(B_1) < R(B_2)$: neither dominates. As $B\to\infty$, $R\to1/b$ on the memory branch or $1/c$ on the compute branch, whichever binds.
:::

::: definition Dominance and the deployment frontier {#def-frontier}
An operating point is a configuration (model, precision, parallelism, hardware, scheduler settings) together with a batch limit, characterised on a fixed workload by its latency $\ell$ (for example p99 TPOT) and its cost per token $\kappa$. Point $A$ **dominates** point $B$ if $\ell_A\le\ell_B$ and $\kappa_A\le\kappa_B$ with at least one inequality strict. The **deployment frontier** is the set of points not dominated by any other; the best deployment for a latency target $\ell^*$ is the frontier point of lowest cost with $\ell\le\ell^*$.
:::

Across *different* configurations, by contrast, one can dominate another: a quantised model may have both a lower step time and a higher throughput at every batch size. The useful object is therefore the **frontier over configurations**: for each latency target, the configuration and batch size that give the highest throughput (equivalently, the lowest cost per token). The operating point on it is then chosen by the latency SLO and by the load.

## Cost per token {#sec-cost}

If a deployment of $D$ accelerators costs $p$ per accelerator-hour and produces $R$ tokens per second, its cost per million tokens is

$$
\text{cost per }10^6\text{ tokens} = \frac{pD}{3600\,R}\cdot10^6.
$$ {#eq-cost}

This assumes the deployment is fully used. A service sized for its peak runs at a lower average utilisation $u$, and the cost of the idle capacity is spread over the tokens actually served: the effective cost is the formula divided by $u$.

::: example Cost per million tokens (illustrative) {#ex-cost}
**Assume, for illustration only**, an accelerator rented at $\$3.00$ per hour — a round number, not a quote; as of 2026, prices for data-centre accelerators vary several-fold between providers, commitments and hardware generations. For the model and accelerator of [[#ex-budget]], compute the cost per million output tokens at batch sizes $1$, $16$ and $64$, and at batch $64$ when the service is on average $40\%$ utilised. Compare with prefill (input) tokens at full utilisation.
::: solution
Throughputs from [[inference/batching-serving#ex-roofline]] and the listing below: $160$, $2068$ and $5149$ tokens/s. By [[#eq-cost]] with $D = 1$: $\$3/(3600\cdot160)\cdot10^6 = \$5.22$, $\$0.40$ and $\$0.16$ per million output tokens. A batch of $64$ is $32$ times cheaper per token than a single stream. At $40\%$ utilisation: $\$0.16/0.4 = \$0.40$. Prefill is compute-bound at about $\pi/(2N) = 37{,}000$ tokens/s, so input tokens cost $\$0.0225$ per million at full use, about seven times less than output tokens at $B = 64$. This asymmetry — input tokens cheap because they are processed in parallel, output tokens expensive because they are memory-bound — is why many commercial interfaces, as of 2026, price output tokens several times higher than input tokens, and cached input tokens lower still ([[inference/kv-cache#sec-prefix]]).
:::
:::

::: widget plot
f: p*1e6/3600*(max(16e9*x/593.4e12, (16e9 + x*2000*131072)/2.68e12) + 2e-4)/x
x: 1, 228
y: 0, 2
sliders: p=3:0.5:10:0.25
labels: cost per million output tokens (illustrative dollars)
caption: Cost per million output tokens against the batch size, from [[#eq-cost]] and the step-time model, for an $8$-billion-parameter bfloat16 model at context $2000$ on one accelerator priced at $p$ dollars per hour (slider; the default $\$3$ is an illustrative assumption, not a price). Cost falls steeply at first, while weight reads are shared, then flattens as cache reads dominate; the curve ends at $B = 228$, where cache memory runs out. At $B = 1$ the cost ($\$5.2$ at $p = 3$) is off the top of the chart.
:::

Two corrections matter in practice. First, **tokens are not words**: tokenisers differ, and the same text may take $20$–$50\%$ more tokens under one tokeniser than another, especially for languages and scripts underrepresented in the tokeniser's training data ([[text-and-language]]). Prices per token compare models only after converting to cost per unit of text or per task. Second, **the task decides the token count**: models that generate long hidden chains of reasoning before answering ([[reasoning/test-time-scaling]]) can produce many times more output tokens than the visible answer, and cost per *task* — tokens per task times cost per token — is the honest comparison.

::: example Buying latency with tensor parallelism {#ex-tp}
Using the listing below, compare one accelerator and two accelerators with tensor parallelism for the bfloat16 model at $B = 1$ and $B = 64$: step time and illustrative cost per million tokens. When is the second accelerator worth it?
::: solution
At $B = 1$: one device $6.27$ ms and $\$5.22$ per million; two devices $3.43$ ms and $\$5.72$. At $B = 64$: $12.43$ ms and $\$0.16$ against $6.52$ ms and $\$0.17$. Splitting the weights halves the bytes each device reads, so the step is almost twice as fast, but two devices cost twice as much per hour and lose a little to communication, so the cost per token rises by $3$–$10\%$. The second device is worth it when a latency target cannot otherwise be met (for instance a TPOT of $5$ ms in bfloat16), or when the model does not fit on one device at all; it is not a way to lower cost. A quantised model on one device reaches $1.9$ ms at a third of the cost in this model — if its quality is acceptable.
:::
:::

## Energy per token {#sec-energy}

The same throughput figures give an energy estimate. If a deployment draws power $P_{\text{dev}}$ per accelerator while producing $R$ tokens per second,

$$
E_{\text{token}} = \frac{D\,P_{\text{dev}}}{R}\quad\text{joules per token (accelerators only)},
$$ {#eq-energy}

to which host processors, memory, networking and cooling add a facility overhead, often summarised by the power usage effectiveness (PUE), the ratio of total facility power to IT power.

::: example Energy per token (illustrative) {#ex-energy}
The accelerator of [[#ex-budget]] has a published maximum power of $700$ W; assume it draws that much while serving. Estimate the accelerator energy per output token at batch $1$ and $64$, the energy of a $500$-token reply at batch $64$ in watt-hours, and the effect of a facility PUE of $1.2$.
::: solution
$B = 1$: $700/160 = 4.4$ J per token. $B = 64$: $700/5149 = 0.136$ J per token. A $500$-token reply at $B = 64$: $68$ J $= 0.019$ Wh at the accelerator, $0.023$ Wh with PUE $1.2$ — before counting the host and the energy of prefill, idle capacity and the request's share of training. The estimate moves by more than an order of magnitude with batch size alone, and further with model size, precision, hardware and output length.
:::
:::

::: widget plot
f: w*(max(16e9*x/593.4e12, (16e9 + x*2000*131072)/2.68e12) + 2e-4)/x
x: 1, 228
y: 0, 1.5
sliders: w=700:300:1200:10
labels: accelerator energy per output token (J)
caption: Accelerator energy per output token against the batch size for the model of [[#ex-energy]], at an assumed power draw of $w$ watts (slider; $700$ W is the published maximum of the example accelerator, and real draw is often lower). Like cost, energy per token falls steeply with batching — from $4.4$ J at $B = 1$ (off the chart) to $0.14$ J at $B = 64$ — and flattens once cache reads dominate.
:::

Published measurements of inference energy vary by orders of magnitude because they differ in all of these and in what they include (accelerators only, whole servers, whole data centres, idle time); estimates should always state their boundary and assumptions. The environmental and social side of these numbers — electricity sources, water, the share of inference in the total footprint — is discussed in [[llm-society/environmental-cost]].

::: warning "Cost per token is a property of the model"
The same model can cost $30$ times more or less per token depending on batch size, precision, hardware, utilisation, context length and the serving software ([[#ex-cost]]). Statements such as "model X costs $c$ per million tokens" describe a particular deployment at a particular time. Comparisons of models' efficiency need the same hardware, the same workload (prompt and output length distributions, arrival pattern) and the same latency targets — and per-token prices also hide differences in tokenisers and in the number of tokens a task needs.
:::

## Implementing it {#sec-code}

The listing evaluates four configurations of the $8$-billion-parameter model on the illustrative accelerator — bfloat16; 4-bit weights (about $4.5$ bits with group scales, [[inference/quantisation#eq-bits]]); 4-bit weights with an 8-bit cache; and bfloat16 split over two devices by tensor parallelism with a small communication overhead — at several batch sizes, up to the batch at which the cache fills the memory. It prints step time, throughput, illustrative cost and accelerator energy per token, and the Pareto frontier over all configurations.

```python
# Throughput-latency trade-off, cost and energy per token from a roofline step-time model.
# Hardware figures are illustrative: an accelerator with published peaks of 989 TFLOP/s (16-bit)
# and 3.35 TB/s, 80 GB of memory, 700 W at full load; achieved 60% / 80% of peak.
PI, BETA, MEM, WATTS = 989e12 * 0.6, 3.35e12 * 0.8, 80e9, 700.0
PRICE = 3.00                       # ILLUSTRATIVE accelerator-hour price in dollars, not a quote
N, CTX = 8e9, 2000                 # 8B-parameter dense model, mean context 2000 tokens

configs = {   # name: (bytes per weight, cache bytes per token, devices for tensor parallelism)
    "bf16, bf16 cache":       (2.0, 131072, 1),
    "int4 weights, bf16 cache": (0.5625, 131072, 1),    # 4.5 bits incl. group scales
    "int4 weights, int8 cache": (0.5625, 65536, 1),
    "bf16, 2-way tensor par.": (2.0, 131072, 2),
}
def step(B, wbytes, kv, dev):
    W = N * wbytes
    flops, bytes_ = 2 * N * B, W + B * CTX * kv
    t = max(flops / (PI * dev), bytes_ / (BETA * dev)) + 2e-4
    if dev > 1: t += 2e-4                         # communication between devices: illustrative 0.2 ms per step
    return t

points = []
for name, (wb, kv, dev) in configs.items():
    Bmax = int((MEM * dev - N * wb - 4e9 * dev) // (CTX * kv))            # cache memory limit
    print(f"{name:25s} max batch {Bmax:4d}")
    for B in (1, 4, 16, 64, 256):
        if B > Bmax: continue
        t = step(B, wb, kv, dev); thr = B / t                             # tokens/s for the deployment
        usd = PRICE * dev / 3600 / thr * 1e6                              # $ per million output tokens
        joule = WATTS * dev / thr                                         # accelerator energy per token
        points.append((name, B, t * 1e3, thr, usd, joule))
        print(f"   B={B:3d}: TPOT {t * 1e3:6.2f} ms, {thr:7.0f} tok/s, ${usd:6.3f}/M tokens, {joule:6.3f} J/token")

# Pareto frontier over all configurations: lowest cost for each latency
front = [p for p in points if not any(q[2] <= p[2] and q[4] <= p[4] and q != p for q in points)]
print("Pareto-optimal points (lowest cost at each TPOT):")
for n, b, t, _, c, _ in sorted(front, key=lambda p: p[2]): print(f"   {n}, B={b}: {t:.2f} ms, ${c:.3f}/M")

# prefill (input) tokens: compute-bound, so their cost per token is set by FLOP/s
thr_prefill = PI / (2 * N)
print(f"prefill: {thr_prefill:.0f} tok/s, ${PRICE / 3600 / thr_prefill * 1e6:.4f}/M input tokens at full use")
```

Output:

```
bf16, bf16 cache          max batch  228
   B=  1: TPOT   6.27 ms,     160 tok/s, $ 5.223/M tokens,  4.388 J/token
   B=  4: TPOT   6.56 ms,     610 tok/s, $ 1.367/M tokens,  1.148 J/token
   B= 16: TPOT   7.74 ms,    2068 tok/s, $ 0.403/M tokens,  0.338 J/token
   B= 64: TPOT  12.43 ms,    5149 tok/s, $ 0.162/M tokens,  0.136 J/token
int4 weights, bf16 cache  max batch  272
   B=  1: TPOT   1.98 ms,     506 tok/s, $ 1.647/M tokens,  1.384 J/token
   B=  4: TPOT   2.27 ms,    1762 tok/s, $ 0.473/M tokens,  0.397 J/token
   B= 16: TPOT   3.44 ms,    4646 tok/s, $ 0.179/M tokens,  0.151 J/token
   B= 64: TPOT   8.14 ms,    7863 tok/s, $ 0.106/M tokens,  0.089 J/token
   B=256: TPOT  26.92 ms,    9510 tok/s, $ 0.088/M tokens,  0.074 J/token
int4 weights, int8 cache  max batch  545
   B=  1: TPOT   1.93 ms,     519 tok/s, $ 1.607/M tokens,  1.350 J/token
   B=  4: TPOT   2.07 ms,    1928 tok/s, $ 0.432/M tokens,  0.363 J/token
   B= 16: TPOT   2.66 ms,    6011 tok/s, $ 0.139/M tokens,  0.116 J/token
   B= 64: TPOT   5.01 ms,   12777 tok/s, $ 0.065/M tokens,  0.055 J/token
   B=256: TPOT  14.40 ms,   17779 tok/s, $ 0.047/M tokens,  0.039 J/token
bf16, 2-way tensor par.   max batch  518
   B=  1: TPOT   3.43 ms,     291 tok/s, $ 5.723/M tokens,  4.808 J/token
   B=  4: TPOT   3.58 ms,    1117 tok/s, $ 1.492/M tokens,  1.253 J/token
   B= 16: TPOT   4.17 ms,    3839 tok/s, $ 0.434/M tokens,  0.365 J/token
   B= 64: TPOT   6.52 ms,    9823 tok/s, $ 0.170/M tokens,  0.143 J/token
   B=256: TPOT  15.91 ms,   16095 tok/s, $ 0.104/M tokens,  0.087 J/token
Pareto-optimal points (lowest cost at each TPOT):
   int4 weights, int8 cache, B=1: 1.93 ms, $1.607/M
   int4 weights, int8 cache, B=4: 2.07 ms, $0.432/M
   int4 weights, int8 cache, B=16: 2.66 ms, $0.139/M
   int4 weights, int8 cache, B=64: 5.01 ms, $0.065/M
   int4 weights, int8 cache, B=256: 14.40 ms, $0.047/M
prefill: 37088 tok/s, $0.0225/M input tokens at full use
```

Within each configuration, step time and throughput rise together with $B$, as [[#prop-pareto]] says. Across configurations, the quantised model with a quantised cache dominates in this model: it is faster *and* cheaper at every batch size, because a memory-bound step's time is its bytes. Tensor parallelism halves the step time at small batch (from $6.3$ to $3.4$ ms at $B = 1$) at a higher cost per token (two devices, plus communication); it buys latency, not efficiency. Three things the model leaves out could change the ranking: the *quality* of the quantised model, which must be measured ([[inference/quantisation#sec-weight-only]]); the arithmetic cost of dequantisation in the kernels, which can make low-bit kernels compute-bound earlier than this model predicts; and the communication cost of tensor parallelism, assumed here to be a fixed $0.2$ ms per step.

::: quiz
A deployment is operating at a batch of $16$ and meets its TPOT target with room to spare. The operator wants a lower cost per token without new hardware. Which change is the most direct?
- [ ] Reduce the batch size to lower TPOT further
- [x] Admit more concurrent requests (raise the batch) until the TPOT target or memory binds
- [ ] Switch to two-way tensor parallelism
- [ ] Disable prefix caching to free memory
::: solution
By [[#prop-pareto]], raising $B$ raises throughput and so lowers cost per token, at the price of a higher TPOT; spare latency budget is exactly what this trade uses. Smaller batches and tensor parallelism raise cost per token. Prefix caching saves prefill work; disabling it would raise cost.
:::
:::

## A method for optimising inference {#sec-method}

The techniques of this course each relieve a specific bottleneck. The table maps symptoms to remedies.

| symptom (measured) | bottleneck | remedies (chapter) |
|---|---|---|
| decode step time $\approx$ weight bytes / bandwidth; arithmetic idle | memory bandwidth, weights | larger batches ([[inference/batching-serving]]); weight quantisation ([[inference/quantisation]]); speculative decoding ([[inference/speculative-decoding]]); a smaller or distilled model ([[inference/model-compression]]) |
| step time grows with total context | memory bandwidth, cache | GQA/MLA models, cache quantisation ([[inference/kv-cache]], [[inference/quantisation]]); sliding-window or interleaved models ([[inference/long-context]]) |
| batch limited by memory, requests queueing | memory capacity | paged cache, cache quantisation, weight quantisation, offloading ([[inference/kv-cache]]) |
| TTFT high for long prompts | prefill compute, attention | FlashAttention kernels, prefix caching, chunked prefill, context parallelism ([[inference/long-context]]) |
| TPOT spikes when prompts arrive | prefill interference | chunked prefill, prefill–decode disaggregation ([[inference/batching-serving]]) |
| latency rises sharply at peak load | queueing ($\rho\to1$) | more replicas, admission control, priority scheduling ([[inference/batching-serving#sec-queueing]]) |
| outputs differ between identical runs | batch-dependent kernels | per-request seeds, batch-invariant kernels ([[inference/decoding-sampling#sec-determinism]]) |

::: algorithm Optimising a deployment {#alg-optimise}
1. **Define the workload and targets**: distributions of prompt and output lengths, arrival pattern and peak rate, SLOs on TTFT and TPOT percentiles, and a quality bar on the real task.
2. **Estimate** the bounds: weight and cache bytes, bandwidth-bound TPOT, compute-bound prefill time, memory-limited batch ([[#prop-bandwidth]], [[inference/kv-cache#prop-batch-kv]]).
3. **Measure** a baseline under a realistic load: a replayed or synthetic trace with the right length distributions and arrival process, after warm-up, reporting throughput, goodput and latency percentiles.
4. **Locate** the bottleneck by comparing measurements with the bounds (the table above).
5. **Apply one change**, re-measure performance *and* quality, and keep it only if it moves the frontier at the target SLO without crossing the quality bar.
6. **Repeat**, then choose the operating point (batch limit, replicas) from the measured frontier and the expected load, with headroom for peaks ([[inference/batching-serving#ex-little]]).
:::

::: application Choosing a model size for a product
Suppose a product needs a TPOT of at most $50$ ms and quality above a bar on its own test set. A larger model may pass the bar with fewer retries or shorter outputs, a smaller one may need speculative decoding or retrieval to pass it. The decision is made on *cost per successful task* at the SLO: for each candidate configuration, measure the success rate and the tokens per task on the test set, and the cost per token at the frontier point meeting $50$ ms. Neither the cheapest model per token nor the best model on benchmarks is necessarily cheapest per success.
:::

::: history
Systematic analysis of Transformer inference cost began with work on serving very large models: Pope et al. ("Efficiently Scaling Transformer Inference", MLSys 2023) analysed latency and throughput of partitioned inference from first principles, including multi-query attention and the memory-bound regime. Kwon et al.'s vLLM (2023), Zhong et al.'s DistServe (2024) and Agrawal et al.'s Sarathi-Serve (2024) made goodput under latency targets the standard measure for serving systems. Measurements of inference energy, such as Samsi et al. (2023) and Luccioni, Jernite and Strubell (FAccT 2024), showed large variation with model, hardware and task. Texts such as "How to Scale Your Model" (Austin et al., 2025) collected roofline-style estimates of inference into teaching material.
:::

::: summary
- **Tokens per second per stream $\le$ bandwidth / bytes read per step**: weights at small batch, weights plus caches at large batch; throughput is also capped by $\pi/(2N)$.
- For one configuration, step time and throughput both increase with batch size, so every batch size is **Pareto-optimal**; across configurations, some dominate (often quantised ones, subject to quality).
- **Cost per million tokens** $= pD\cdot10^6/(3600R)$, divided by the utilisation; output tokens cost more than input tokens because decode is memory-bound and prefill is compute-bound. Prices used here are illustrative.
- **Energy per token** $= DP_{\text{dev}}/R$ at the accelerator, plus facility overhead; it varies by more than an order of magnitude with batch size alone.
- Compare deployments at the same workload and SLO; compare models per task, not per token.
- Optimise by estimating bounds, measuring under realistic load, locating the bottleneck and applying the matching technique, checking quality every time.
:::

## Exercises

::: exercise A single-stream bound {level=1 check="95.7"}
A model's weights occupy $35$ GB and are read from memory at $3.35$ TB/s. What is the upper bound on tokens per second for a single stream, ignoring the cache? One decimal place.
::: solution
$3.35\times10^{12}/35\times10^9 = 95.7$ tokens per second ([[#prop-bandwidth]]).
:::
:::

::: exercise Cost per million tokens {level=1 check="0.1667"}
A deployment of one accelerator costs (illustratively) $\$3.00$ per hour and produces $5000$ tokens per second at full use. What is the cost per million tokens, to four decimal places?
::: solution
$3/(3600\cdot5000)\cdot10^6 = \$0.1667$.
:::
:::

::: exercise Energy per token {level=1 check="0.14"}
An accelerator drawing $700$ W produces $5000$ tokens per second. What is the accelerator energy per token in joules?
::: solution
$700/5000 = 0.14$ J per token.
:::
:::

::: exercise The cost of idle capacity {level=2 check="0.5556"}
The deployment of the cost exercise is sized for peak load and is on average $30\%$ utilised. What is the effective cost per million tokens served? Four decimal places.
::: solution
$0.16667/0.3 = \$0.5556$. Raising the average utilisation (sharing capacity between services, scaling replicas with load, serving batch work in off-peak hours) is often the largest cost lever of all.
:::
:::

::: exercise Tokeniser efficiency {level=2 check="1.231"}
Two models charge the same price per token. On your documents, model A uses $1.3$ tokens per word and model B $1.6$. By what factor is B more expensive per word? Three decimal places.
::: solution
$1.6/1.3 = 1.231$: $23\%$ more per word at the same price per token. For text in scripts underrepresented in a tokeniser's training data the gap can be much larger.
:::
:::

::: exercise Hidden reasoning tokens {level=2 check="7.667"}
A reasoning model produces $2000$ reasoning tokens and a $300$-token visible answer, all billed as output. A non-reasoning model answers in $300$ tokens at the same price per token. By what factor is the reasoning model's output cost per task higher? Three decimal places.
::: solution
$(2000 + 300)/300 = 7.667$. Whether it is worth it depends on the success rates: if the reasoning model succeeds on $90\%$ of tasks and the other on $40\%$, with retries until success the expected costs per success are $7.667/0.9 = 8.5$ and $1/0.4 = 2.5$ units, still favouring the cheaper model — unless failures have costs beyond the retry.
:::
:::

::: exercise Prefill against decode {level=2}
Using the listing's figures, by what factor is an input (prefill) token cheaper than an output token at $B = 64$ in bfloat16, at full utilisation? Why does this ratio shrink for very long prompts?
::: solution
Prefill runs at $37{,}088$ tokens/s and decode at $5149$, so input tokens are $37{,}088/5149 = 7.2$ times cheaper. For long prompts the attention term $2LdP^2$ grows quadratically ([[inference/long-context#prop-crossover-len]]), so the cost per input token rises with $P$ — at $P = 131{,}072$ prefill FLOPs per token are about three times those of a short prompt — while decode cost per token rises more slowly, linearly through the cache reads.
:::
:::

::: exercise The Pareto argument {level=2}
In [[#prop-pareto]], suppose instead that $\tau_0 = 0$ and the step is always compute-bound, $\tau(B) = cB$. What happens to the throughput–latency trade-off, and what does this say about the role of the fixed overhead and the memory term?
::: solution
Then $R(B) = B/(cB) = 1/c$, constant: larger batches only add latency without adding throughput, so $B = 1$ is the only sensible choice and all other points are dominated. The trade-off exists because a step has a cost that does not grow with the batch — the weight reads $a$ and the overhead $\tau_0$ — which batching amortises. In the compute-bound regime there is nothing left to amortise, which is also why speculative decoding stops helping there ([[inference/speculative-decoding#sec-speedup]]).
:::
:::

::: exercise Sizing a fleet {level=3}
A service expects a peak of $50$ requests per second, each with $400$ output tokens on average, and requires TPOT at most $15$ ms. Using the listing's configurations, which configuration and batch size would you choose per accelerator, how many accelerators are needed at peak (ignore prefill and queueing), and what is the illustrative cost per hour at peak? What is missing from this estimate?
::: solution
Demand: $50\cdot400 = 20{,}000$ output tokens per second. Configurations meeting $15$ ms: bfloat16 up to $B = 64$ ($12.4$ ms, $5149$ tok/s); int4 with bf16 cache up to $B = 64$ ($8.1$ ms, $7863$ tok/s); int4 with int8 cache up to $B = 256$ ($14.4$ ms, $17{,}779$ tok/s); the two-device bfloat16 configuration at $B = 64$ ($6.5$ ms, $9823$ tok/s on two devices). The cheapest is int4 weights with an int8 cache at $B = 256$: $\lceil20{,}000/17{,}779\rceil = 2$ accelerators ($\$6$ per hour at the illustrative price) against $\lceil20{,}000/5149\rceil = 4$ in bfloat16 ($\$12$). Missing: prefill load, which adds compute and TPOT interference; queueing headroom, since running at $\rho\approx1$ makes latency explode ([[inference/batching-serving#prop-mm1]]) — a margin of $20$–$40\%$ is typical; the quality of the quantised model; variation in context lengths (the batch limit depends on them); and redundancy for failures.
:::
:::

::: exercise A frontier for speculative decoding {level=3}
Add speculative decoding to the step-time model: at batch $B$, each iteration runs $\gamma$ draft steps of a model one tenth the size of the target (step time from the same formula with $N/10$ and weights $W/10$) and one target pass over $B(\gamma + 1)$ positions (FLOPs $2N B(\gamma + 1)$, bytes as for a normal step), and yields $(1 - \alpha^{\gamma+1})/(1 - \alpha)$ tokens per sequence with $\alpha = 0.8$. For the bfloat16 configuration, compute the effective TPOT and throughput at $B = 1$ and $B = 64$ with $\gamma = 4$, and compare with plain decoding.
::: solution
```python
PI, BETA, N, CTX, KV = 989e12 * 0.6, 3.35e12 * 0.8, 8e9, 2000, 131072
def step(B, N, W, pos=1):
    return max(2 * N * B * pos / PI, (W + B * CTX * KV) / BETA) + 2e-4
a, g = 0.8, 4
tok = (1 - a ** (g + 1)) / (1 - a)
for B in (1, 64):
    plain = step(B, N, 2 * N)
    it = g * step(B, N / 10, 2 * N / 10) + step(B, N, 2 * N, pos=g + 1)
    print(B, round(plain * 1e3, 2), round(it / tok * 1e3, 2), round(B / plain), round(B * tok / it))
```

Output:

```
1 6.27 2.93 160 341
64 12.43 12.1 5149 5291
```

With $3.36$ tokens per iteration, the effective TPOT falls from $6.27$ to $2.93$ ms at $B = 1$, more than doubling the single-stream rate. At $B = 64$ the gain almost vanishes ($12.43$ to $12.10$ ms): in this simple model each draft step reads the cache of all $64$ sequences at the target's size per token ($16.8$ GB), so four draft steps cost nearly as much as the target pass they save. A draft with its own much smaller cache would do better, but at larger batches the target pass over $5$ positions becomes compute-bound and the gain shrinks anyway ([[inference/speculative-decoding#sec-speedup]]). Speculative decoding moves the small-batch end of the frontier — lower latency — far more than the large-batch end. The model also ignores the cost of rejected tokens in the cache and of tree verification.
:::
:::
