The previous chapters treated parallelism one scheme at a time. A frontier-scale training run uses all of them at once, on tens of thousands of accelerators, for weeks or months, and must keep making progress while hardware fails every few hours. At that scale the problems are no longer only about arithmetic and memory. They are about how the devices are wired together, how the parallel dimensions are laid out on that wiring, how much of the hardware's peak actually turns into training, and how quickly the run can detect a failure, discard the lost work and resume. This chapter puts the pieces together: the anatomy of a training cluster, a complete layout for a model of about $400$ billion parameters worked through from memory to throughput, the measurement of utilisation, and the reliability engineering — failure rates, checkpoint intervals and recovery — documented in published reports of large runs.

The numbers here build on all the earlier chapters: FLOPs and memory from [[scaling/flops-memory]], device and link figures from [[scaling/accelerators]], sharding from [[scaling/data-parallelism]] and the tensor, pipeline and context schemes of [[scaling/model-parallelism]]. The same topics appear in brief, from the side of the training recipe, in [[pretraining/training-loop]] and [[pretraining/training-stability]]; the energy and environmental cost of such runs is the subject of [[llm-society/environmental-cost]].

## Anatomy of a training cluster {#sec-cluster}

A training cluster for large language models, as described in public reports from 2022 to 2025, is built from a few repeated units.

- **Servers** (nodes) of typically $8$ accelerators, joined internally by a high-bandwidth fabric (NVLink and NVSwitch for NVIDIA GPUs, Infinity Fabric for AMD), with CPUs, host memory and local storage. Newer rack-scale systems (as of 2026) extend the fast fabric to tens of accelerators.
- **A scale-out network**: usually one network interface per accelerator, at $400$ Gb/s in 2023–2024 systems, over InfiniBand or RDMA-capable Ethernet (RoCE), arranged so that the $k$-th accelerator of each server connects to its own set of switches — a **rail-optimised** topology — under several layers of a fat tree. TPU pods instead connect chips directly in a torus with optical circuit switches ([[scaling/accelerators]]).
- **Storage**: a parallel file system or object store holding the training data and checkpoints, fast enough to absorb a checkpoint of terabytes in minutes.
- **Control software**: a scheduler, health checks, and the training framework's own monitoring.

Meta's Llama 3 report (2024) is one of the most detailed public descriptions: its largest model was trained on up to $16{,}384$ H100 GPUs, eight per server, on a RoCE network with $400$ Gb/s per GPU in a three-layer topology, with the layout chosen so that the most communication-intensive parallelism stayed within servers. The report also noted that the synchronised compute and communication phases of thousands of GPUs made the data centre's power draw fluctuate by tens of megawatts, a constraint for the electrical grid — a reminder that at this scale the facility is part of the system.

## A complete layout {#sec-layout}

The parallel dimensions — tensor ($t$), context ($c$), pipeline ($p$) and data ($d$) — multiply to the number of devices, $n = t\cdot c\cdot p\cdot d$. The standard heuristic orders them by communication intensity against link speed:

1. **Tensor parallelism innermost**, within a server ($t\le8$): it needs an all-reduce of activations in every block.
2. **Context parallelism** next, only when sequences are long enough to need it.
3. **Pipeline parallelism** across servers: point-to-point activations between adjacent stages, tolerant of slower links.
4. **Data parallelism outermost**, sharded (ZeRO or FSDP) as needed: one gradient reduction per step, overlapped with the backward pass.

::: definition Layout {#def-layout}
A **layout** of a training job on $n$ devices is an assignment of each device to coordinates $(i_t, i_c, i_p, i_d)$ in a grid of shape $t\times c\times p\times d$, together with a choice of micro-batch size, number of micro-batches $m$ per replica, pipeline schedule, sharding stage and recomputation policy. Devices sharing all coordinates but one form a **group** for that dimension, within which its collectives run.
:::

::: example Laying out a 405-billion-parameter model {#ex-layout}
The Llama 3 report gives the shape of its largest model — $L = 126$ layers, width $h = 16{,}384$, $128$ query heads and $8$ key–value heads, feed-forward width $53{,}248$, vocabulary $128{,}256$, $N\approx4.05\times10^{11}$ parameters — and its layout for pretraining at sequence length $s = 8192$ on $16{,}384$ GPUs: $t = 8$, $c = 1$, $p = 16$, $d = 128$, with $16$ sequences per data-parallel replica per step (about $16$ million tokens per batch). Check the arithmetic of this layout: device count, model state per GPU (assuming ZeRO-1 over the data-parallel group), activation memory with selective and with full recomputation under the Megatron accounting, and the pipeline bubble.
::: solution
*Devices:* $8\cdot1\cdot16\cdot128 = 16{,}384$. *Batch:* $128\cdot16 = 2048$ sequences $\times8192 = 16.8$ million tokens.

*Model state.* Each GPU holds $N/(tp) = 4.05\times10^{11}/128 = 3.16\times10^9$ parameters: $6.3$ GB of bf16 weights and $6.3$ GB of bf16 gradients. Its fp32 master weights and Adam moments ($12$ bytes per parameter, $38$ GB) are sharded over $d = 128$: $0.30$ GB. Total about $13$ GB.

*Activations.* With tensor and sequence parallelism and selective recomputation, a layer stores $34sbh/t = 34\cdot8192\cdot16{,}384/8 = 570$ MB per micro-batch of one sequence ([[scaling/flops-memory#thm-activations]]). A stage holds about $126/16\approx8$ layers, and under 1F1B the first stage holds up to $p = 16$ micro-batches: $8\cdot16\cdot0.57 = 72$ GB. With the $13$ GB of state this exceeds $80$ GB, so this accounting says the configuration does not fit with selective recomputation alone. Full recomputation stores only the sharded block inputs, $2sbh/t = 34$ MB per layer per micro-batch, $8\cdot16\cdot34\text{ MB} = 4.3$ GB, plus the working activations of the layer being recomputed. (Real implementations without dropout and with fused attention store less than the Megatron constants, and recomputation can be applied to only some layers; the point is that the recomputation policy is chosen by exactly this arithmetic.)

*Bubble.* With $m = 16$ micro-batches and $p = 16$ stages, a plain 1F1B schedule would idle $15/31 = 48\%$ of the time. An interleaved schedule with $v = 8$ virtual stages per device (one layer each) gives $15/(128 + 15) = 10.5\%$ ([[scaling/model-parallelism#prop-interleaved]]). The Llama 3 report describes modifying the interleaved schedule to work under exactly this kind of batch constraint.
:::
:::

The example shows the logic of layout design. The global batch is capped by optimisation (the critical batch size), which caps $m\cdot d$; the model state and activations per device cap how small $t\cdot p$ can be; the link hierarchy caps $t$; and the bubble pushes for large $m$ or interleaving. There is rarely slack in all four at once.

## Utilisation {#sec-mfu}

::: definition Model and hardware FLOPs utilisation {#def-mfu}
For a run processing $\tau$ tokens per second on $n$ devices of peak throughput $F$, the **model FLOPs utilisation** is

$$
\text{MFU} = \frac{c_{\text{tok}}\,\tau}{nF},
$$ {#eq-mfu}

where $c_{\text{tok}}$ is the number of FLOPs per token the model mathematically requires for a training step — $6N$, or $6N$ plus the attention term $6Lsh$ (with causal halving) when stated. The **hardware FLOPs utilisation** (HFU) counts in the numerator all FLOPs executed, including recomputation. Chowdhery et al. (2022) introduced MFU so that implementations could be compared without rewarding redundant work.
:::

::: example MFU of the layout {#ex-mfu}
The Llama 3 report gives, for the layout of [[#ex-layout]], a throughput of about $400$ TFLOP/s per GPU and an MFU of about $41\%$ (bf16 peak $989$ TFLOP/s per NVIDIA's H100 SXM specification). Reconstruct the MFU and the implied tokens per second and step time.
::: solution
$400/989 = 40.4\%$, consistent with the reported $41\%$ given rounding of the throughput. Model FLOPs per token, with the causal attention term: $6N + 6Lsh = 2.43\times10^{12} + 6\cdot126\cdot8192\cdot16{,}384 = 2.43\times10^{12} + 1.0\times10^{11} = 2.53\times10^{12}$. Cluster model FLOP/s: $16{,}384\cdot4\times10^{14} = 6.55\times10^{18}$. Tokens per second: $6.55\times10^{18}/2.53\times10^{12} = 2.59\times10^6$. A step of $16.8$ million tokens takes $6.5$ s. The whole budget the report states, about $3.8\times10^{25}$ FLOPs (which matches $6N\cdot15.6\times10^{12}$ tokens $= 3.79\times10^{25}$), would take $5.8\times10^6$ s, $67$ days, at this throughput without interruptions.
:::
:::

Where does the other $59\%$ go? The main losses, each estimable with the tools of earlier chapters, are: the pipeline bubble ($\sim10\%$ in the example); communication not hidden behind computation (tensor-parallel all-reduces, data-parallel reductions at the end of the step); memory-bound operations — norms, element-wise functions, the parts of attention that are not matrix products ([[scaling/accelerators]]); recomputation, which costs time but not MFU credit; load imbalance between pipeline stages; and kernels running below peak on matrix shapes that do not tile perfectly. Published MFU figures for dense models on large clusters have generally been in the range $35$–$55\%$ (PaLM, $46\%$ on $6144$ TPU v4 chips, 2022; Megatron-LM's trillion-parameter configuration, $52\%$ of peak on $3072$ A100s, 2021; Llama 3, $38$–$43\%$ depending on configuration, 2024). Mixture-of-experts models usually report lower MFU because of all-to-all communication and smaller per-expert matrix products.

MFU measures throughput while the job runs. A second number measures how much of the wall-clock time the job runs at all.

::: definition Effective training time {#def-goodput}
The **effective training time** (or **goodput** fraction) of a run is the fraction of its wall-clock time spent making progress that is kept — excluding time lost to failures (work since the last checkpoint), restarts, checkpoint saving that blocks training, and stalls. The end-to-end efficiency of a run is the product of MFU and effective training time.
:::

## Failures {#sec-failures}

A single accelerator, server or cable fails rarely. A cluster of tens of thousands fails constantly.

::: proposition Failure rate of a cluster {#prop-cluster-mtbf}
If a job depends on $n$ components whose failures are independent, and component $i$ fails after an exponentially distributed time with mean $M_i$, then the job's time to first failure is exponential with mean

$$
M_{\text{job}} = \Big(\sum_{i=1}^{n}\frac{1}{M_i}\Big)^{-1},
$$

which equals $M_1/n$ for identical components. A job that needs all $n$ components fails $n$ times as often as one of them.
:::

::: proof
The job runs until the first component fails, at $T = \min_iT_i$. For independent exponential $T_i$ with rates $\lambda_i = 1/M_i$, $\Prob(T > t) = \prod_i\Prob(T_i > t) = \prod_ie^{-\lambda_it} = e^{-(\sum_i\lambda_i)t}$, so $T$ is exponential with rate $\sum_i\lambda_i$ and mean $1/\sum_i\lambda_i$. With equal $M_i = M_1$ this is $M_1/n$.
:::

The exponential model is a simplification — real failures cluster in time, are more frequent in new ("infant mortality") and old hardware, and share causes such as a switch or a power feed — but it captures the essential scaling. The published record is consistent with it.

- **OPT-175B** (Zhang et al., 2022) was trained by Meta on $992$ A100 GPUs (80 GB) over about two months. The authors reported at least $35$ manual restarts and the cycling of over $100$ hosts because of hardware failures, and published the team's day-by-day **logbook** of the run — loss spikes, learning-rate changes, node failures and restarts — an unusually candid public record of what a large run involves.
- **PaLM** (Chowdhery et al., 2022) reported about $20$ loss spikes during training of its $540$-billion-parameter model despite gradient clipping; the remedy was to restart from a checkpoint about $100$ steps before the spike and skip roughly $200$–$500$ batches of data.
- **Llama 3** (2024) reported $466$ job interruptions during a $54$-day snapshot of pretraining on up to $16{,}384$ GPUs: $47$ planned (for maintenance and configuration) and $419$ unexpected, of which about $78\%$ were attributed to confirmed or suspected hardware problems, the largest single category being faulty GPUs and GPU memory. Despite this, the team reported more than $90\%$ effective training time, achieved through automation of detection and recovery.

::: example What the Llama 3 figures imply {#ex-llama-failures}
From $419$ unexpected interruptions in $54$ days on $16{,}384$ GPUs, estimate the job's mean time between failures, the implied mean time between failures per GPU (treating all failures as per-GPU), and the probability that a day passes without an unexpected interruption.
::: solution
$M_{\text{job}} = 54\cdot24/419 = 3.09$ hours. Per GPU, by [[#prop-cluster-mtbf]], $M_1 = nM_{\text{job}} = 16{,}384\cdot3.09 = 5.1\times10^4$ hours, about $5.8$ years — each GPU is very reliable, but the job is not. The probability of $24$ hours without failure is $e^{-24/3.09} = 4.3\times10^{-4}$: in practice, every day of the run includes several interruptions. Doubling the cluster would halve $M_{\text{job}}$ to about $1.5$ hours.
:::
:::

Besides outright crashes, large runs face failures that do not announce themselves. **Stragglers** — a slow GPU, a throttled link, a congested switch — slow every synchronous step to their pace; detecting them requires per-rank timing. **Hangs** in collectives, where one rank stops participating and the others wait, must be caught by timeouts. And **silent data corruption** — hardware that computes wrong results without raising an error — has been documented at fleet scale by Meta (Dixit et al., 2021) and Google (Hochschild et al., 2021); in training it can appear as an unexplained loss spike or divergence, and is countered by redundant computation checks, comparing replicas, and retiring suspect hardware.

## Checkpointing {#sec-checkpoints}

The universal defence against failure is the **checkpoint**: a saved copy of everything needed to resume exactly — fp32 master weights, optimiser moments, step counter, learning-rate schedule state, random-number generator states and the position in the data stream. For the $405$-billion-parameter model of [[#ex-layout]], at $16$ bytes per parameter of model state, a checkpoint is about $6.5$ TB.

How often to save? Each save costs time; each failure loses the work since the last save. The classical answer is due to Young (1974), with a refinement by Daly (2006).

::: theorem Optimal checkpoint interval {#thm-young}
Let a save block training for time $\delta$, failures arrive as a Poisson process with mean time between failures $M$, and each failure lose the work since the last completed checkpoint plus a restart time $R$. With a checkpoint after every $\tau$ of training time, and to first order in $\tau/M$ and $\delta/M$, the expected fraction of time lost is

$$
f(\tau) = \frac{\delta}{\tau} + \frac{\tau}{2M} + \frac{R}{M},
$$ {#eq-young}

minimised at

$$
\tau^\ast = \sqrt{2\delta M},\qquad f(\tau^\ast) = \sqrt{\frac{2\delta}{M}} + \frac{R}{M}.
$$ {#eq-young-opt}
:::

::: proof
*Saving.* Each interval of $\tau$ of training costs an additional $\delta$ for the save, a fraction $\delta/\tau$ (to first order, $\delta/(\tau + \delta)\approx\delta/\tau$).

*Lost work.* A failure is equally likely to occur at any point of an interval, so on average it destroys half an interval of work, $\tau/2$ (to first order — this neglects failures during saves and restarts, of relative size $\delta/M$ and $R/M$). Each failure also costs $R$. Failures occur at rate $1/M$ per unit time, so the expected loss per unit time is $(\tau/2 + R)/M$.

*Optimum.* $f'(\tau) = -\delta/\tau^2 + 1/(2M)$ vanishes at $\tau^\ast = \sqrt{2\delta M}$, and $f''(\tau) = 2\delta/\tau^3 > 0$, so this is the minimum. Substituting, $\delta/\tau^\ast = \sqrt{\delta/(2M)}$ and $\tau^\ast/(2M) = \sqrt{\delta/(2M)}$ — the two terms are equal at the optimum — so $f(\tau^\ast) = 2\sqrt{\delta/(2M)} + R/M = \sqrt{2\delta/M} + R/M$.
:::

Two features of the result are worth remembering. The restart time $R$ adds a constant loss but does not change the optimal interval. And at the optimum, the time spent saving equals the expected work lost: if one is much larger than the other, the interval is wrong. Daly (2006) derived a higher-order estimate, for $\delta < 2M$,

$$
\tau^\ast_{\text{Daly}} = \sqrt{2\delta M}\left[1 + \frac13\sqrt{\frac{\delta}{2M}} + \frac19\,\frac{\delta}{2M}\right] - \delta,
$$

which is more accurate when $\delta$ is not small compared with $M$. The program below compares both with the exact expectation and with a Monte Carlo simulation of a month-long run, using the Llama 3 failure rate ($M = 3$ hours), a blocking save of $\delta = 5$ minutes and a restart of $R = 10$ minutes. The exact expected wall time per unit of work, for segments that must each run $\tau + \delta$ without failure, is $(M + R)(e^{(\tau + \delta)/M} - 1)/\tau$, derived in [[#exr-overhead]].

```python
import math, random

def simulate(work, tau, delta, mtbf, restart, rng):
    """Wall-clock time to finish `work` hours of training, checkpointing (blocking,
    `delta` hours) after every `tau` hours of progress; failures arrive as a Poisson
    process with mean `mtbf`; after a failure, `restart` hours are lost and training
    resumes from the last checkpoint."""
    t, done = 0.0, 0.0
    next_fail = rng.expovariate(1 / mtbf)
    while done < work:
        seg = min(tau, work - done)
        need = seg + (delta if done + seg < work else 0.0)   # no save after the last segment
        if t + need <= next_fail:                            # segment and save complete
            t += need; done += seg
        else:                                                # failure: lose the segment
            t = next_fail + restart
            next_fail = t + rng.expovariate(1 / mtbf)
    return t

def expected_overhead(tau, delta, mtbf, restart):
    """Exact expected wall time per hour of work: a segment needs tau + delta hours
    without failure; each failed attempt costs the time to failure plus the restart."""
    return (mtbf + restart) * (math.exp((tau + delta) / mtbf) - 1) / tau

M, delta, R = 3.0, 5 / 60, 10 / 60          # hours: cluster MTBF, save time, restart time
young = math.sqrt(2 * delta * M)
r = delta / (2 * M)
daly = math.sqrt(2 * delta * M) * (1 + math.sqrt(r) / 3 + r / 9) - delta
best = min((expected_overhead(t / 1000, delta, M, R), t / 1000) for t in range(10, 5000))
print(f"Young tau* = {young * 60:.1f} min   Daly tau* = {daly * 60:.1f} min   "
      f"exact optimum = {best[1] * 60:.1f} min")

rng = random.Random(0)
work = 24 * 30                                # 30 days of useful training
print(" tau (min)  simulated overhead  exact expectation  first-order sqrt model")
for tau_min in (10, 20, 30, 43, 60, 120):
    tau = tau_min / 60
    sims = [simulate(work, tau, delta, M, R, rng) / work - 1 for _ in range(20)]
    exact = expected_overhead(tau, delta, M, R) - 1
    first = delta / tau + tau / (2 * M) + R / M
    print(f"{tau_min:9d}  {sum(sims) / len(sims):18.3f}  {exact:17.3f}  {first:22.3f}")
```

```text
Young tau* = 42.4 min   Daly tau* = 39.2 min   exact optimum = 39.2 min
 tau (min)  simulated overhead  exact expectation  first-order sqrt model
       10               0.651              0.651                   0.583
       20               0.420              0.415                   0.361
       30               0.356              0.359                   0.306
       43               0.354              0.350                   0.291
       60               0.367              0.377                   0.306
      120               0.605              0.587                   0.431
```

Daly's estimate matches the exact optimum to the resolution shown; Young's is $8\%$ longer, which costs almost nothing because the overhead curve is flat near its minimum (the overheads at $30$, $43$ and $60$ minutes are within $3$ percentage points). The simulation agrees with the exact expectation to within its sampling noise. The first-order model underestimates the overhead at these parameters, because $\delta/M$ and $R/M$ are not small. And the overhead itself — about $35\%$ of the run lost even at the best interval — shows that blocking saves of five minutes are untenable at this failure rate. This is the quantitative case for the engineering of large runs:

- **Asynchronous checkpointing**: copy the state from accelerator to host memory (seconds) and write it to storage in the background while training continues, so that $\delta$ is the copy time, not the write time.
- **In-memory and peer checkpoints**: keep recent checkpoints in the host memory of other servers, so that recovery need not read from remote storage (Wang et al., 2023, *Gemini* for distributed training).
- **Sharded checkpoints**: each rank writes only its own shard, in parallel, so that write bandwidth scales with the cluster.
- **Fast detection and restart**: health checks, collective timeouts, hot spare servers and automated job relaunch reduce $R$ from hours to minutes.

::: widget plot
f: d/x + x/(2*m) + r/m; sqrt(2*d/m) + r/m
x: 2, 180
y: 0, 0.5
sliders: d=2:0.5:15:0.5; m=180:30:1440:30; r=10:0:60:1
labels: lost fraction $f(\tau)$; minimum $\sqrt{2\delta/M} + R/M$
caption: The first-order lost fraction of [[#eq-young]] against the checkpoint interval $\tau$ in minutes, for a blocking save of $d$ minutes, a cluster MTBF of $m$ minutes and a restart time of $r$ minutes. Short intervals lose time saving, long ones lose work to failures; the minimum is at $\tau^\ast = \sqrt{2dm}$. Shrinking $d$ (asynchronous saving) lowers and sharpens the minimum; shrinking $r$ (fast restart) lowers the whole curve.
:::

::: example Asynchronous saves {#ex-async}
With $M = 3.09$ hours and a blocking cost reduced from $\delta = 5$ minutes to $\delta = 1$ minute by asynchronous saving, what are Young's optimal interval and the first-order loss (ignoring restart time)? What aggregate write bandwidth does a $6.5$ TB checkpoint need to be written in the background within one interval?
::: solution
$\delta = 1/60$ h: $\tau^\ast = \sqrt{2\cdot0.0167\cdot3.09} = 0.32$ h $= 19$ minutes, and $f = \sqrt{2\cdot0.0167/3.09} = 10.4\%$, against $23\%$ with $\delta = 5$ minutes. Writing $6.5$ TB within $19$ minutes needs $6.5\times10^{12}/1140\approx5.7$ GB/s aggregate — modest when shared by $2048$ servers ($2.8$ MB/s each), which is why sharded parallel writes make frequent checkpoints feasible. The remaining loss is dominated by lost work and restart time, which is why recovery speed is the next target.
:::
:::

::: warning Reliability does not scale for free
It is tempting to plan a run as "$C$ FLOPs on $n$ devices at MFU $U$ takes $C/(nFU)$ seconds". At large $n$ this omits the term that grows with $n$: failures arrive $n$ times as often ([[#prop-cluster-mtbf]]), and the optimal loss $\sqrt{2\delta/M} + R/M$ grows as $\sqrt n$ and $n$. Doubling a cluster without improving checkpoint and restart times can lose more to failures than it gains in throughput. Plan with effective training time as well as MFU, and measure both.
:::

::: widget plot
f: max(0, 1 - sqrt(2*(d/60)*x/k) - (r/60)*x/k)
x: 1000, 65536
y: 0, 1
sliders: d=1:0.25:10:0.25; r=10:1:60:1; k=50000:10000:200000:5000
labels: effective training fraction at the optimal interval
caption: First-order effective training time, $1 - \sqrt{2\delta/M} - R/M$ with $M = k/n$, against the number of devices $n$, for a save time of $d$ minutes, a restart time of $r$ minutes and a per-device MTBF of $k$ hours (about $5\times10^4$ hours in the Llama 3 figures). Every doubling of the cluster costs more than the last; faster saves and restarts, or more reliable hardware, push the curve up. Near the bottom of the plot the first-order formula is no longer accurate, and the true loss is larger.
:::

## Monitoring and decision-making {#sec-monitoring}

A large run is watched continuously, and the logbooks and reports of such runs show the same core signals ([[pretraining/in-training-evaluation]] covers the evaluation side):

- **Training loss** and its **spikes**; the **gradient norm** before clipping, whose growth often precedes a spike; the **learning rate** and **loss scale** (for fp16).
- **Throughput** in tokens per second and **MFU**, per step and per rank, to catch stragglers and regressions.
- **Hardware telemetry**: memory errors, temperatures, link error counters, and the distribution of step times across ranks.
- **Numerical health**: the largest activations and attention logits, the fraction of skipped steps, the norms of weights and of the output logits ([[pretraining/training-stability]]).

When a loss spike or divergence appears, the standard responses are, in increasing order of cost: wait (many spikes recover by themselves); roll back to an earlier checkpoint and skip the data batches around the spike (the PaLM procedure); roll back and lower the learning rate; or change the recipe. The OPT logbook shows several such interventions in a single run. Because each restart or rollback costs hours of cluster time, these decisions are among the most expensive a team makes, and automating the routine ones is part of reaching high effective training time.

::: quiz
A run on $8192$ devices has MFU $45\%$ and effective training time $85\%$. The cluster is doubled to $16{,}384$ devices, and MFU falls to $42\%$. Which statements are true?
- [x] The end-to-end efficiency before doubling is about $38\%$.
- [x] Without changes to checkpointing and recovery, the job's mean time between failures halves.
- [ ] The wall-clock time necessarily halves.
- [x] Effective training time is likely to fall unless saves and restarts get faster.
::: solution
$0.45\cdot0.85 = 0.38$. Failures scale with the number of devices ([[#prop-cluster-mtbf]]). Throughput rises by $2\cdot42/45 = 1.87$, not $2$, and effective training time falls as failures become more frequent, so the speed-up is less than $1.87$.
:::
:::

::: history
Checkpoint–restart for long computations was analysed by Young (1974) and refined by Daly (2006) for supercomputers, long before neural networks needed it. Large-scale model training reports became detailed in 2021–2022: Narayanan et al. (2021) described Megatron-LM's 3D parallelism on $3072$ GPUs; Chowdhery et al. (2022) introduced MFU with PaLM, trained on two TPU v4 pods; Zhang et al. (2022) released the OPT-175B logbook; the BigScience workshop (2022) trained the $176$-billion-parameter BLOOM openly and published its engineering notes; and Smith et al. (2022) described Megatron-Turing NLG 530B. The Llama 3 report (2024) documented failure statistics, effective training time and power behaviour of a $16{,}384$-GPU run. Dixit et al. (2021) and Hochschild et al. (2021) documented silent data corruption at fleet scale. Wang et al. (2023) proposed in-memory checkpointing for fast recovery.
:::

::: summary
- Clusters are built from **servers** of about $8$ accelerators on a fast internal fabric, joined by a **scale-out network** (InfiniBand or RoCE, rail-optimised fat trees) or, for TPUs, a torus with optical switches.
- A **layout** assigns devices to a $t\times c\times p\times d$ grid: tensor parallelism inside servers, pipeline across them, data parallelism outermost; the global batch, memory per device, link speeds and the bubble constrain it jointly.
- **MFU** $= c_{\text{tok}}\tau/(nF)$ counts only required FLOPs; large dense runs report $35$–$55\%$. **Effective training time** counts failures, saves and restarts; efficiency is their product.
- A job on $n$ components fails $n$ times as often as one component: $M_{\text{job}} = M_1/n$. Llama 3 saw an unexpected interruption about every $3$ hours on $16{,}384$ GPUs.
- The optimal checkpoint interval is $\tau^\ast = \sqrt{2\delta M}$ (Young; Daly's refinement subtracts about $\delta$), with lost fraction $\sqrt{2\delta/M} + R/M$; at the optimum saving time equals expected lost work.
- Large runs depend on **asynchronous, sharded and in-memory checkpoints**, **fast detection and restart**, and continuous **monitoring** of loss, gradient norms, throughput and hardware health.
:::

## Exercises

::: exercise Device count {level=1 check="4096"}
A layout uses $t = 8$, $c = 2$, $p = 8$ and $d = 32$. How many devices does it occupy?
::: solution
$8\cdot2\cdot8\cdot32 = 4096$.
:::
:::

::: exercise Cluster MTBF {level=1 check="2"}
Each of $25{,}000$ devices has a mean time between failures of $50{,}000$ hours. Under the independence assumption, what is the job's mean time between failures in hours?
::: solution
$50{,}000/25{,}000 = 2$ hours.
:::
:::

::: exercise Young's interval {level=1 check="21.91"}
A blocking save takes $\delta = 2$ minutes and the cluster's MTBF is $M = 120$ minutes. What is Young's optimal interval in minutes? Give two decimal places.
::: solution
$\sqrt{2\cdot2\cdot120} = \sqrt{480} = 21.91$ minutes; the first-order loss is $\sqrt{2\cdot2/120} = 18\%$ plus restart time.
:::
:::

::: exercise MFU from throughput {level=2 check="0.415"}
A $70$-billion-parameter dense model trains at $2.0\times10^6$ tokens per second on $2048$ devices with a peak of $989$ TFLOP/s each. What is its MFU using $6N$ FLOPs per token? Give three decimal places.
::: solution
$6\cdot7\times10^{10}\cdot2\times10^6 = 8.4\times10^{17}$ FLOP/s, over $2048\cdot9.89\times10^{14} = 2.025\times10^{18}$: MFU $= 0.415$.
:::
:::

::: exercise Daly's correction {level=2 check="20.6"}
For $\delta = 2$ minutes and $M = 120$ minutes, compute Daly's estimate of the optimal interval in minutes to one decimal place, and compare with Young's.
::: solution
$\delta/(2M) = 1/120 = 0.00833$, $\sqrt{0.00833} = 0.0913$. $\tau^\ast = 21.909\cdot(1 + 0.0304 + 0.00093) - 2 = 21.909\cdot1.0313 - 2 = 22.60 - 2 = 20.6$ minutes, about $1.3$ minutes shorter than Young's $21.9$; the difference in lost time is negligible.
:::
:::

::: exercise A day without failure {level=2 check="0.0498"}
A job's MTBF is $8$ hours. What is the probability that it runs $24$ hours without a failure, to three significant figures?
::: solution
$e^{-24/8} = e^{-3} = 0.0498$.
:::
:::

::: exercise Checkpoint bandwidth {level=2 check="108"}
A checkpoint of $16$ bytes per parameter for a $405$-billion-parameter model must be written to storage within $60$ seconds. What aggregate bandwidth, in GB/s, is needed?
::: solution
$16\cdot4.05\times10^{11} = 6.48\times10^{12}$ bytes; $6.48\times10^{12}/60 = 1.08\times10^{11}$ bytes/s $= 108$ GB/s.
:::
:::

::: exercise Scaling the failure loss {level=2}
Using [[#eq-young-opt]] with $M = M_1/n$, show how the optimal lost fraction grows with $n$. A run on $4096$ devices loses $5\%$ to checkpointing and lost work and $2\%$ to restarts at the optimum. What would the losses be on $16{,}384$ devices with the same per-device reliability, save time and restart time?
::: solution
$f^\ast = \sqrt{2\delta n/M_1} + Rn/M_1$: the first term grows as $\sqrt n$, the second linearly. Quadrupling $n$ doubles the first ($5\%\to10\%$) and quadruples the second ($2\%\to8\%$): $18\%$ in total instead of $7\%$ — and the first-order formula, valid only for small losses, is already becoming optimistic. Restart time, which seemed minor, becomes the dominant concern at scale.
:::
:::

::: exercise A layout under a batch cap {level=3}
A dense model of $1.4\times10^{11}$ parameters is to be trained on $8192$ devices of $80$ GB with sequences of $8192$ tokens and a global batch of at most $1024$ sequences. Tensor parallelism is limited to $t = 8$ (one server). Model state is $16$ bytes per parameter, with the $12$ bytes of optimiser state sharded over the data-parallel group (ZeRO-1). Find the smallest pipeline degree $p$ (a power of two) for which the bf16 weights and gradients take at most $20$ GB per device, and for that $p$ compute $d$, the number of micro-batches per replica (micro-batch of one sequence), and the 1F1B bubble. Would interleaving help, and what else could be changed?
::: solution
Weights and gradients per device: $4N/(tp) = 5.6\times10^{11}/(8p)$ bytes $= 70/p$ GB; $70/p\le20$ requires $p\ge3.5$, so $p = 4$ ($17.5$ GB). Then $d = 8192/(8\cdot4) = 256$, and $m = 1024/256 = 4$ micro-batches per replica — the bubble is $3/(4 + 3) = 43\%$. Interleaving with $v$ chunks gives $3/(4v + 3)$: $v = 8$ brings it to $8.6\%$ at the price of many more point-to-point transfers. Alternatives: fewer data-parallel replicas (use fewer devices, or larger $t\cdot p$ to raise $m$), context parallelism to give each replica more devices without enlarging the batch, or ZeRO-3/FSDP sharding of weights and gradients over the data-parallel group so that a smaller $p$ (even $p = 1$) suffices, trading pipeline bubbles for parameter all-gathers.
:::
:::

::: exercise The exact expected overhead {#exr-overhead level=3}
A segment of work needs $a = \tau + \delta$ hours without failure; failures arrive at rate $1/M$; each failure costs the time elapsed in the attempt plus a restart $R$ (during which no failure occurs), after which the segment is retried. Show that the expected wall time to complete the segment is $(M + R)(e^{a/M} - 1)$, and that its first-order expansion per unit of work reproduces [[#eq-young]].
::: solution
Let $q = e^{-a/M}$ be the probability that an attempt succeeds. The number of failed attempts $K$ is geometric with $\E[K] = (1 - q)/q$. A failed attempt lasts $X$ given $X < a$, with $\E[X\mid X < a] = \big(\int_0^axe^{-x/M}dx/M\big)/(1 - q) = M - aq/(1 - q)$, plus $R$. So $\E[T] = a + \E[K]\,(M - aq/(1 - q) + R) = a + \frac{1-q}{q}(M + R) - a = (M + R)\frac{1 - q}{q} = (M + R)(e^{a/M} - 1)$. Expanding, $e^{a/M} - 1 = a/M + a^2/(2M^2) + \dots$, so $\E[T]\approx(M + R)\big(a/M + a^2/(2M^2)\big)\approx a + a^2/(2M) + Ra/M$ to first order in $a/M$ and $R/M$. Per unit of work $\tau$, with $a = \tau + \delta$: $\E[T]/\tau - 1\approx\delta/\tau + \tau/(2M) + R/M$ plus terms of order $\delta/M$, which is [[#eq-young]].
:::
:::
