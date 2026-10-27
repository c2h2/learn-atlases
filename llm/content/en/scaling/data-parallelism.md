The simplest way to train on many accelerators is to give each one a complete copy of the model and a different slice of every batch. Each device computes gradients on its slice; the gradients are averaged across devices; every device applies the same update and the copies stay identical. This is **data parallelism**, and it is the outermost layer of almost every large training run. It is simple because nothing about the model changes; it scales because the expensive part, the forward and backward passes, is divided perfectly; and its costs are two that this chapter studies in detail — the communication of averaging gradients every step, and the memory of keeping a full copy of the training state on every device.

We first make precise why data-parallel training computes the same thing as training on one device, then define the collective operations that parallel training is built from and derive the cost of the **ring all-reduce**, verifying it with a simulation. We then look at overlapping communication with computation, and at the limits that large batches place on data parallelism. The second half removes the memory redundancy: **ZeRO** shards optimiser state, gradients and parameters across the data-parallel devices, and **fully sharded data parallelism** (FSDP) is its implementation in PyTorch. The memory counts come from [[scaling/flops-memory]] and the link speeds from [[scaling/accelerators]]; [[pretraining/training-loop]] gives a brief overview of the same ideas in the context of a pretraining run.

## Synchronous data parallelism {#sec-sync}

::: definition Data parallelism {#def-dp}
In **synchronous data parallelism** over $p$ devices, each device $r$ holds a replica of the parameters $\theta$ and, at every step, receives a disjoint **shard** $\mathcal{B}_r$ of the global batch $\mathcal{B} = \mathcal{B}_1\cup\dots\cup\mathcal{B}_p$. It computes the local gradient $\mathbf{g}_r = \nabla_\theta\frac{1}{\lvert\mathcal{B}_r\rvert}\sum_{x\in\mathcal{B}_r}\ell(x;\theta)$; the devices compute the average $\bar{\mathbf{g}} = \frac1p\sum_r\mathbf{g}_r$ by a collective operation, and each applies the same optimiser update with $\bar{\mathbf{g}}$.
:::

::: proposition Equivalence with single-device training {#prop-dp-equivalence}
If the shards have equal size $\lvert\mathcal{B}_r\rvert = \lvert\mathcal{B}\rvert/p$, the averaged gradient equals the gradient of the mean loss over the whole batch, $\bar{\mathbf{g}} = \nabla_\theta\frac{1}{\lvert\mathcal{B}\rvert}\sum_{x\in\mathcal{B}}\ell(x;\theta)$. Consequently, if all replicas start from the same parameters and optimiser state and use the same deterministic optimiser, they remain identical, and the trajectory is that of single-device training with batch $\mathcal{B}$ (up to floating-point rounding).
:::

::: proof
With $\lvert\mathcal{B}_r\rvert = n$ and $\lvert\mathcal{B}\rvert = pn$, linearity of the gradient gives $\frac1p\sum_r\nabla\frac1n\sum_{x\in\mathcal{B}_r}\ell = \nabla\frac{1}{pn}\sum_{x\in\mathcal{B}}\ell$. Every replica then applies the same function of the same arguments (parameters, optimiser state, $\bar{\mathbf{g}}$), so by induction on steps the replicas stay equal. Floating-point addition is not associative, so a reduction in a different order may differ in the last bits; with a deterministic reduction order the results are reproducible.
:::

Two details matter in practice. If shards have unequal numbers of *tokens* — common when sequences of different lengths are packed, or when padding tokens are masked out — the plain average weights tokens unequally; the fix is to sum losses and divide by the global token count, communicated along with the gradients. And layers whose computation depends on batch statistics (batch normalisation, rarely used in language models) behave differently with small per-device batches.

Data parallelism composes with **gradient accumulation** ([[neural-networks/training-practice]]): each device processes $A$ micro-batches sequentially, summing their gradients, before the averaging step, so the global batch is $b_{\text{micro}}\cdot A\cdot p$ sequences and communication happens once per $A$ micro-batches.

## Collective operations {#sec-collectives}

::: definition Collectives {#def-collectives}
Let each of $p$ devices hold a buffer of $M$ bytes, divided into $p$ equal chunks. The collective operations used in training are:

- **all-reduce**: every device ends with the element-wise sum (or average) of all $p$ buffers;
- **reduce-scatter**: device $r$ ends with the sum of chunk $r$ across all devices ($M/p$ bytes each);
- **all-gather**: each device starts with one chunk of $M/p$ bytes and every device ends with all $p$ chunks;
- **broadcast** and **reduce**: one device's buffer is copied to all, or all buffers are summed onto one;
- **all-to-all**: device $r$ sends its chunk $s$ to device $s$, for every pair — a transposition of the chunks.

An all-reduce is equivalent to a reduce-scatter followed by an all-gather.
:::

Libraries such as NCCL (NVIDIA), RCCL (AMD), Gloo and MPI implement these operations with algorithms chosen for the topology and message size. The simplest correct way to all-reduce — send everything to one device, sum, send back — makes that device send and receive $(p - 1)M$ bytes, a bottleneck that grows with $p$. The ring algorithm makes the traffic per device independent of $p$.

::: algorithm Ring all-reduce {#alg-ring}
Arrange the $p$ devices in a ring, device $r$ sending to $r + 1 \bmod p$. Divide each buffer into chunks $0,\dots,p-1$.
1. **Reduce-scatter**, steps $t = 0,\dots,p-2$: device $r$ sends its current copy of chunk $(r - t)\bmod p$ to device $r + 1$, which adds it into its own copy of that chunk.
2. After $p - 1$ steps, device $r$ holds the complete sum of chunk $(r + 1)\bmod p$.
3. **All-gather**, steps $t = 0,\dots,p-2$: device $r$ sends chunk $(r + 1 - t)\bmod p$ — which it holds complete — to device $r + 1$, which overwrites its copy.
4. After $p - 1$ more steps every device holds every complete chunk.
:::

::: theorem Cost of the ring all-reduce {#thm-ring}
In [[#alg-ring]] each device sends and receives

$$
2\,\frac{p-1}{p}\,M\ \text{bytes},
$$ {#eq-ring}

in $2(p - 1)$ steps. Under the latency–bandwidth model ([[scaling/accelerators#def-alpha-beta]]) with per-message latency $\alpha$ and link bandwidth $\beta$, the time is

$$
T_{\text{ring}} = 2(p - 1)\,\alpha + 2\,\frac{p-1}{p}\,\frac{M}{\beta}.
$$ {#eq-ring-time}
:::

::: proof
*Correctness.* In the reduce-scatter phase, follow chunk $c$. At step $t = 0$ device $c$ sends its own copy of chunk $c$ to device $c + 1$, which adds its own; at step $t$, device $c + t$ sends chunk $(c + t - t) = c$, now holding the sum of the contributions of devices $c,\dots,c + t$, to device $c + t + 1$, which adds its own. After step $p - 2$, device $c + p - 1\equiv c - 1$ holds the sum over all $p$ devices; equivalently device $r$ holds the complete chunk $r + 1$. In the all-gather phase, chunk $r + 1$ travels from device $r$ around the ring, one hop per step, and after $p - 1$ steps has reached all other $p - 1$ devices.

*Cost.* In each of the $2(p - 1)$ steps every device sends exactly one chunk of $M/p$ bytes and receives one, so each sends and receives $2(p - 1)M/p$ bytes. All devices send simultaneously over distinct links, so a step takes $\alpha + (M/p)/\beta$, and the total is [[#eq-ring-time]].
:::

As $p$ grows, the bandwidth term approaches $2M/\beta$ — **twice the buffer, regardless of the number of devices** — which is why data parallelism scales to thousands of devices. It is also essentially optimal: in an all-gather each device must receive the $(p-1)M/p$ bytes it does not have, and Patarasuk and Yuan (2009) showed that $2(p-1)M/p$ is a lower bound on per-device traffic for all-reduce in this model. The weakness is the latency term, $2(p - 1)\alpha$, linear in $p$. Tree-based and **recursive halving and doubling** algorithms need only $O(\log p)$ steps, at the same bandwidth cost for power-of-two $p$; libraries switch between algorithms by message size, and large clusters use **hierarchical** schemes — reduce within each server over its fast links, all-reduce across servers, broadcast within each server — to match the topology.

The program simulates the ring algorithm element by element, checks the result against the exact sum and counts the elements each device sends.

```python
import random

def ring_all_reduce(bufs):
    """Sum p equal-length vectors with the ring algorithm. Each device's buffer is cut
    into p chunks; p-1 reduce-scatter steps, then p-1 all-gather steps. In every step
    device i sends one chunk to device (i+1) mod p. Returns results and bytes sent."""
    p, M = len(bufs), len(bufs[0])
    bounds = [(c * M // p, (c + 1) * M // p) for c in range(p)]
    data = [list(b) for b in bufs]
    sent = [0] * p                                    # elements sent by each device
    for step in range(p - 1):                         # reduce-scatter
        msgs = []
        for i in range(p):
            c = (i - step) % p                        # chunk device i forwards this step
            lo, hi = bounds[c]
            msgs.append(((i + 1) % p, c, data[i][lo:hi]))
            sent[i] += hi - lo
        for dst, c, chunk in msgs:                    # receiver adds into its copy
            lo, hi = bounds[c]
            for k, v in enumerate(chunk):
                data[dst][lo + k] += v
    # now device i holds the full sum of chunk (i + 1) mod p
    for step in range(p - 1):                         # all-gather
        msgs = []
        for i in range(p):
            c = (i + 1 - step) % p
            lo, hi = bounds[c]
            msgs.append(((i + 1) % p, c, data[i][lo:hi]))
            sent[i] += hi - lo
        for dst, c, chunk in msgs:                    # receiver overwrites
            lo, hi = bounds[c]
            data[dst][lo:hi] = chunk
    return data, sent

random.seed(0)
M = 1200                                              # elements per buffer
for p in (2, 4, 8, 16):
    bufs = [[random.randint(-100, 100) for _ in range(M)] for _ in range(p)]
    exact = [sum(col) for col in zip(*bufs)]
    out, sent = ring_all_reduce(bufs)
    ok = all(o == exact for o in out)
    print(f"p={p:2d}  correct={ok}  sent per device={sent[0]} elements"
          f"  = {sent[0] / M:.4f} M   formula 2(p-1)/p = {2 * (p - 1) / p:.4f}"
          f"   naive (gather to one, broadcast): root sends {(p - 1) * M}")
```

```text
p= 2  correct=True  sent per device=1200 elements  = 1.0000 M   formula 2(p-1)/p = 1.0000   naive (gather to one, broadcast): root sends 1200
p= 4  correct=True  sent per device=1800 elements  = 1.5000 M   formula 2(p-1)/p = 1.5000   naive (gather to one, broadcast): root sends 3600
p= 8  correct=True  sent per device=2100 elements  = 1.7500 M   formula 2(p-1)/p = 1.7500   naive (gather to one, broadcast): root sends 8400
p=16  correct=True  sent per device=2250 elements  = 1.8750 M   formula 2(p-1)/p = 1.8750   naive (gather to one, broadcast): root sends 18000
```

::: widget plot
f: 1000*(2*(x - 1)*a*1e-6 + 2*(x - 1)/x*m/50); 1000*(2*log2(x)*a*1e-6 + 2*(x - 1)/x*m/50)
x: 2, 1024
y: 0, 500
sliders: a=10:1:50:1; m=1:0.01:10:0.01
labels: ring; recursive halving and doubling
caption: All-reduce time in milliseconds against the number of devices $p$, from [[#eq-ring-time]], for a buffer of $m$ GB over $50$ GB/s links with per-message latency $a$ microseconds. For large buffers the bandwidth term dominates and the time is almost independent of $p$; for small buffers or very many devices the ring's latency term, linear in $p$, takes over, and a logarithmic algorithm wins. Libraries choose between them by message size.
:::

::: example All-reduce time for a 7B model {#ex-allreduce}
A $7$-billion-parameter model's bf16 gradients ($M = 14$ GB) are all-reduced over $p = 64$ devices with $\beta = 50$ GB/s and $\alpha = 20\,\mu$s. Compute the time from [[#eq-ring-time]]. How does it change for $p = 1024$?
::: solution
$p = 64$: bandwidth term $2\cdot(63/64)\cdot14/50 = 0.551$ s; latency term $2\cdot63\cdot20\,\mu\text{s} = 2.5$ ms. Total $0.554$ s. $p = 1024$: bandwidth term $2\cdot(1023/1024)\cdot14/50 = 0.5597$ s; latency term $2\cdot1023\cdot20\,\mu\text{s} = 41$ ms; total $0.60$ s. Sixteen times as many devices cost $9\%$ more communication time, almost all of it latency.
:::
:::

## Overlapping communication {#sec-overlap}

A step's all-reduce need not wait for the whole backward pass. Gradients become available layer by layer, in reverse order, and the all-reduce of the last layers' gradients can run while earlier layers are still being differentiated. PyTorch's DistributedDataParallel (Li et al., 2020) groups parameters into **buckets** (by default of about $25$ MB), in reverse order of their use, and launches each bucket's all-reduce as soon as all its gradients are ready. Bucketing amortises the per-message latency $\alpha$ over many small parameter tensors; reverse ordering lets communication start early.

::: proposition When communication is hidden {#prop-overlap}
Suppose the backward pass takes time $T_b$ and produces gradients at a uniform rate, the all-reduce of all gradients takes $T_c$ when run alone, and communication and computation proceed concurrently without slowing each other. Then the step's communication finishes at most $\max(0, T_c - T_b) + T_c/n_b$ after the backward pass, where $n_b$ is the number of equal buckets.
:::

::: proof
Bucket $k$ (of $n_b$) is ready at time $kT_b/n_b$ and takes $T_c/n_b$ to all-reduce; buckets are communicated in order. If $T_c\le T_b$, communication keeps pace with production, so each bucket finishes within $T_c/n_b$ of becoming ready, and the last finishes at $T_b + T_c/n_b$. If $T_c > T_b$, the link is always busy from the first bucket's readiness at $T_b/n_b$, and the last bucket finishes at $T_b/n_b + T_c$; subtracting $T_b$ gives $T_c - T_b + T_b/n_b\le T_c - T_b + T_c/n_b$.
:::

So communication is free when $T_c\le T_b$ — roughly, when the gradient all-reduce takes less time than the backward pass — apart from a final bucket. With gradient accumulation the backward passes of $A$ micro-batches are available to hide one all-reduce. In practice overlap is not perfect, because communication kernels compete with computation for memory bandwidth and on-chip resources, but the condition gives the right order of magnitude.

::: example Is the all-reduce hidden? {#ex-overlap}
The model of [[#ex-allreduce]] processes $8$ sequences of $4096$ tokens per device per step at $40\%$ MFU on devices with a peak of $10^{15}$ FLOP/s. Is the all-reduce over $64$ devices hidden behind the backward pass?
::: solution
Tokens per device: $32{,}768$. Compute: $6\cdot7\times10^9\cdot32{,}768 = 1.38\times10^{15}$ FLOPs, taking $1.38\times10^{15}/(4\times10^{14}) = 3.4$ s, of which the backward pass is about two thirds, $2.3$ s. The all-reduce takes $0.55$ s, well under $2.3$ s, so it can be hidden. With one sequence per device the backward pass would take $0.29$ s and communication would dominate — data parallelism needs enough work per device per step.
:::
:::

## How far can data parallelism go? {#sec-limits}

Adding data-parallel devices at a fixed per-device batch increases the global batch. Up to a point, a larger batch lets the run take proportionally fewer steps; beyond the **critical batch size** (McCandlish et al., 2018), which grows as training progresses and the loss falls, more tokens per step buy little reduction in steps, so extra devices waste compute ([[pretraining/training-loop]]). Hyperparameters must also change with the batch: for SGD, Goyal et al. (2017) scaled the learning rate linearly with batch size and added warm-up; for Adam-type optimisers a square-root rule is closer to what theory based on stochastic differential equations suggests (Malladi et al., 2022), and layer-wise adaptive methods (LARS, You et al., 2017; LAMB, You et al., 2020) were designed to push batches further. Published language-model runs use global batches of a few million to a few tens of millions of tokens.

The second limit is memory. Every replica holds the full training state, $16N$ bytes under [[scaling/flops-memory#prop-bytes]]: data parallelism alone cannot train a model whose state does not fit on one device, and for those that fit it wastes a factor of $p$. The rest of the chapter removes that waste.

## ZeRO: sharding the training state {#sec-zero}

The training state of plain data parallelism is redundant: $p$ devices store $p$ identical copies of the parameters, the gradients and the optimiser state. Rajbhandari, Rasley, Ruwase and He (2020) observed that each device only needs to *update* a $1/p$ share of the parameters, and introduced the **Zero Redundancy Optimizer** (ZeRO), which removes the redundancy in three stages.

::: definition ZeRO stages {#def-zero}
With $\Psi$ parameters, $p$ data-parallel devices, and each device $r$ responsible for a shard $\theta^{(r)}$ of $\Psi/p$ parameters:

- **Stage 1** ($P_{os}$): each device keeps only the optimiser state (fp32 master weights and moments) of its shard. After the backward pass, gradients are **reduce-scattered**, so device $r$ receives the averaged gradient of its shard; it updates its shard; the updated 16-bit parameters are **all-gathered**.
- **Stage 2** ($P_{os+g}$): as stage 1, and each device also keeps only the gradients of its shard, discarding the others as soon as they have been reduced.
- **Stage 3** ($P_{os+g+p}$): as stage 2, and each device also keeps only the 16-bit parameters of its shard. Before each layer's forward and backward computation the full parameters of that layer are all-gathered, used, and freed.
:::

::: theorem Memory and communication of ZeRO {#thm-zero}
With mixed-precision Adam — $2\Psi$ bytes of 16-bit parameters, $2\Psi$ of 16-bit gradients and $K\Psi$ of optimiser state with $K = 12$ — the model state per device is

| | bytes per device | communication per step per device |
|---|---|---|
| data parallelism | $(2 + 2 + K)\Psi$ | $2\Psi\cdot\frac{p-1}{p}\cdot2$ |
| stage 1 | $(2 + 2)\Psi + K\Psi/p$ | same |
| stage 2 | $2\Psi + (2 + K)\Psi/p$ | same |
| stage 3 | $(2 + 2 + K)\Psi/p$ | $1.5\times$ |

where the communication is in bytes for 16-bit gradients and parameters, with ring collectives.
:::

::: proof
*Memory.* Each stage keeps the unsharded items in full and $1/p$ of the sharded ones: stage 1 shards the $K\Psi$ of optimiser state; stage 2 additionally the $2\Psi$ of gradients; stage 3 additionally the $2\Psi$ of parameters.

*Communication.* Plain data parallelism all-reduces $2\Psi$ bytes of gradients, which by [[#thm-ring]] costs $2\cdot\frac{p-1}{p}\cdot2\Psi$ bytes per device — a reduce-scatter and an all-gather, each $\frac{p-1}{p}\cdot2\Psi$. Stages 1 and 2 perform exactly these two halves, separated in time: a reduce-scatter of gradients (each device obtains its averaged shard) and, after the shard update, an all-gather of parameters. The total is unchanged. Stage 3 must all-gather each layer's parameters once in the forward pass and again in the backward pass (they were freed in between), and reduce-scatter the gradients: three operations of $\frac{p-1}{p}\cdot2\Psi$ each, $1.5$ times the data-parallel volume.
:::

::: example The ZeRO paper's example {#ex-zero}
Rajbhandari et al. illustrated the stages with $\Psi = 7.5$ billion parameters and $p = 64$. Compute the model state per device for each stage.
::: solution
Data parallelism: $16\cdot7.5 = 120$ GB. Stage 1: $4\cdot7.5 + 12\cdot7.5/64 = 30 + 1.41 = 31.4$ GB. Stage 2: $2\cdot7.5 + 14\cdot7.5/64 = 15 + 1.64 = 16.6$ GB. Stage 3: $120/64 = 1.9$ GB. Stage 1 alone cuts memory by almost four, at no communication cost; stage 3 brings a model that needs $120$ GB onto devices with a few GB to spare, at $1.5$ times the communication.
:::
:::

::: widget plot
f: 16*s; 4*s + 12*s/x; 2*s + 14*s/x; 16*s/x
x: 1, 256
y: 0, 200
sliders: s=7.5:1:70:0.5
labels: data parallel; ZeRO-1; ZeRO-2; ZeRO-3 / FSDP
caption: Model state per device in GB, from [[#thm-zero]], against the number of data-parallel devices $p$, for $s$ billion parameters. Stages 1 and 2 level off at $4s$ and $2s$ GB — the unsharded 16-bit parameters (and gradients) — however many devices are added; only stage 3 keeps falling as $16s/p$. In practice memory is somewhat higher: activations, temporary buffers and the gathered layers of stage 3 come on top.
:::

Stage 3 has an additional memory cost not in the table: at any moment the device holds the full parameters of the layer being computed (and, with **prefetching**, of the next one), plus their gradients during the backward pass. For a model of $L$ equal layers this is about $2\cdot(2\Psi/L)$ bytes of gathered 16-bit parameters, small for deep models. Communication overlaps with computation in all stages: in stage 3, the all-gather of layer $\ell + 1$'s parameters is issued while layer $\ell$ computes.

Later work extended ZeRO in several directions: **ZeRO-Offload** (Ren et al., 2021) moves optimiser state and the update computation to CPU memory; **ZeRO-Infinity** (Rajbhandari et al., 2021) adds NVMe storage, trading bandwidth for capacity; and **ZeRO++** (Wang et al., 2023) reduces stage 3's communication by quantising the gathered weights and gradients and by keeping a secondary copy of parameters within each server.

## Fully sharded data parallelism {#sec-fsdp}

PyTorch's **Fully Sharded Data Parallel** (FSDP; Zhao et al., 2023) implements the ZeRO stage-3 scheme as a framework primitive. The model is divided into **units** — typically one Transformer block each — and each unit's parameters are flattened and sharded across the data-parallel group. In the forward pass, a unit's shards are all-gathered just before it runs and freed after (optionally kept until the backward pass, trading memory for one fewer all-gather); in the backward pass they are gathered again, the gradients are computed, and the gradients are reduce-scattered so that each device keeps the averaged gradient of its own shard, which its optimiser then updates. A later redesign (often called FSDP2, 2024) shards each parameter individually along its first dimension rather than flattening units, which composes more easily with tensor parallelism.

::: example Peak memory under FSDP {#ex-fsdp}
A $70$-billion-parameter model with $80$ equal blocks is trained with FSDP over $p = 512$ devices, one unit per block, prefetching one unit ahead. Estimate the model-state memory per device at the peak of the backward pass.
::: solution
Sharded state: $16\cdot7\times10^{10}/512 = 2.19$ GB. A unit holds $7\times10^{10}/80 = 8.75\times10^8$ parameters, $1.75$ GB in 16-bit. In the backward pass a device holds the gathered parameters of the current unit and the prefetched next one ($3.5$ GB) and the full 16-bit gradients of the current unit before they are reduce-scattered ($1.75$ GB). Peak: about $2.19 + 3.5 + 1.75 = 7.4$ GB, of which the sharded state is less than a third. Smaller units lower the peak but issue more, smaller collectives, paying more latency.
:::
:::

::: definition Hybrid sharding {#def-hsdp}
**Hybrid sharded data parallelism** (HSDP) divides the $p$ devices into $p/g$ groups of $g$ (for example the $g = 8$ devices of a server). The training state is sharded within each group, as in ZeRO-3, and replicated across groups; gradients are reduce-scattered within groups and then all-reduced across groups, shard by shard.
:::

Hybrid sharding confines the frequent, latency-sensitive all-gathers to fast in-server links and sends only one all-reduce of shard gradients ($2\Psi/g$ bytes per device) across the slower network, at the cost of memory $16\Psi/g$ per device instead of $16\Psi/p$. It is a natural fit for models that fit within a server's combined memory once sharded.

::: warning Sharding the state does not shard the activations
ZeRO and FSDP divide model state by $p$, but every device still runs the full model on its own micro-batch and stores that micro-batch's activations in full. For long sequences or large models the activations — $sbh(34 + 5as/h)$ bytes per layer in the accounting of [[scaling/flops-memory]] — can still exceed device memory. They are reduced by activation recomputation, smaller micro-batches, or by splitting the computation itself across devices with tensor, sequence and pipeline parallelism ([[scaling/model-parallelism]]). Sharding also does not reduce the FLOPs per device for a given micro-batch.
:::

::: quiz
A team moves a model from plain data parallelism to ZeRO stage 2 on the same $64$ devices. Which statements are true?
- [x] Memory per device for optimiser state falls by a factor of $64$.
- [ ] Communication volume per step falls.
- [x] The parameters are still replicated on every device.
- [ ] The global batch size must be divided by $64$.
::: solution
Stage 2 shards optimiser state and gradients, so those fall by $p = 64$, while 16-bit parameters remain replicated. Communication stays at the data-parallel volume (a reduce-scatter and an all-gather in place of an all-reduce). Nothing about the batch changes.
:::
:::

## Beyond synchronous averaging {#sec-local}

Every step of synchronous data parallelism ends with a global all-reduce, which requires a fast network across all devices. When devices are spread across datacentres or joined by slow links, methods that communicate less often become attractive. In **local SGD**, each replica takes several optimiser steps on its own data before parameters are averaged. **DiLoCo** (Douillard et al., 2023) runs an inner AdamW optimiser for hundreds of steps on each of several replicas and then applies an outer Nesterov-momentum step to the average of their parameter changes, and reported language-model quality comparable to fully synchronous training with hundreds of times less communication in its experiments. Such methods are an active research area (as of 2026); the largest published runs remain synchronous.

::: history
Data-parallel training with a parameter server, in which workers push gradients to central servers and pull parameters, was used for early large-scale deep learning (Dean et al., 2012, DistBelief); asynchronous variants such as Hogwild! (Recht et al., 2011) tolerated stale gradients. The ring all-reduce came from high-performance computing (Patarasuk and Yuan, 2009) and was popularised for deep learning by Baidu (2017) and Horovod (Sergeev and Del Balso, 2018); NVIDIA's NCCL library made it the default on GPUs. Goyal et al. (2017) trained ResNet-50 on ImageNet in an hour with large-batch synchronous SGD. Li et al. (2020) described PyTorch DDP's bucketing and overlap. Rajbhandari et al. (2020) introduced ZeRO in DeepSpeed, used to train the $17$-billion-parameter Turing-NLG; Zhao et al. (2023) described PyTorch FSDP, which made sharded training standard outside DeepSpeed.
:::

::: summary
- **Synchronous data parallelism** splits each batch across $p$ replicas and averages gradients; with equal shards it is equivalent to single-device training on the whole batch.
- An **all-reduce** is a reduce-scatter plus an all-gather; the **ring algorithm** sends $2(p-1)M/p$ bytes per device in $2(p-1)$ steps, nearly independent of $p$, with latency $2(p-1)\alpha$.
- **Bucketing** and **overlap** hide communication when the all-reduce takes less time than the backward pass; enough work per device is needed.
- Data parallelism is limited by the **critical batch size** and by the **memory redundancy** of $16N$ bytes per replica.
- **ZeRO** shards optimiser state (stage 1: $4\Psi + 12\Psi/p$), gradients (stage 2: $2\Psi + 14\Psi/p$) and parameters (stage 3: $16\Psi/p$), at the data-parallel communication volume for stages 1–2 and $1.5\times$ for stage 3.
- **FSDP** implements stage 3 unit by unit with prefetching; **hybrid sharding** shards within servers and replicates across them. Activations are not sharded.
:::

## Exercises

::: exercise Ring traffic {level=1 check="1.875"}
In a ring all-reduce over $p = 16$ devices, how many times the buffer size does each device send?
::: solution
$2(p-1)/p = 30/16 = 1.875$.
:::
:::

::: exercise Global batch {level=1 check="1024"}
A run uses micro-batches of $2$ sequences, $8$ accumulation steps and $64$ data-parallel replicas. How many sequences are in the global batch?
::: solution
$2\cdot8\cdot64 = 1024$.
:::
:::

::: exercise ZeRO-1 memory {level=1 check="51.172"}
For $\Psi = 1.25\times10^{10}$ parameters and $p = 128$, how many GB of model state does each device hold under ZeRO stage 1? Give three decimal places.
::: solution
$4\Psi + 12\Psi/p = 4\cdot12.5 + 12\cdot12.5/128 = 50 + 1.171875 = 51.172$ GB, against $200$ GB without sharding. The unsharded 16-bit parameters and gradients now dominate.
:::
:::

::: exercise Latency or bandwidth {level=2 check="800"}
For a ring all-reduce of a $M = 1$ GB buffer over links of $\beta = 50$ GB/s with $\alpha = 25\,\mu$s, at what number of devices $p$ does the latency term of [[#eq-ring-time]] equal the bandwidth term?
::: solution
$2(p - 1)\alpha = 2\frac{p-1}{p}\frac{M}{\beta}$; cancelling $2(p - 1)$ gives $p = M/(\alpha\beta) = 10^9/(25\times10^{-6}\cdot5\times10^{10}) = 800$. Beyond about $800$ devices a flat ring spends more time on latency than on moving data, which is one reason large clusters use hierarchical or tree algorithms.
:::
:::

::: exercise ZeRO-3 communication {level=2 check="41.34"}
For a model with $\Psi = 7\times10^9$ parameters and 16-bit gradients and parameters, how many GB does each device send per step under ZeRO stage 3 with $p = 64$? Give two decimal places.
::: solution
Three ring collectives of $2\Psi = 14$ GB each, each costing $\frac{p-1}{p}\cdot14 = 13.78$ GB per device: $3\cdot13.78 = 41.34$ GB, against $27.56$ GB for an all-reduce.
:::
:::

::: exercise Unequal shards {level=2}
Two devices process shards with $1000$ and $3000$ target tokens, and each computes the gradient of its *mean* token loss. Show that averaging the two gradients does not give the gradient of the mean loss over all $4000$ tokens, and give the correct combination.
::: solution
Let $S_1, S_2$ be the summed losses. The devices compute $\nabla S_1/1000$ and $\nabla S_2/3000$; their average is $\nabla S_1/2000 + \nabla S_2/6000$, weighting the first device's tokens three times as much as the second's. The gradient of the mean is $\nabla(S_1 + S_2)/4000$; it is obtained by having each device compute $\nabla S_r$ (or $\nabla S_r$ divided by a common constant), summing with an all-reduce, and dividing by the global token count $4000$, which is itself all-reduced.
:::
:::

::: exercise Hybrid sharding {level=2 check="14"}
A $7$-billion-parameter model is trained with hybrid sharding over $256$ devices in groups of $g = 8$. How many GB of model state does each device hold, and how much memory would full sharding over all $256$ save?
::: solution
$16\Psi/g = 16\cdot7/8 = 14$ GB per device under HSDP; full sharding would need $112/256 = 0.44$ GB, saving $13.6$ GB per device but making every parameter all-gather span the network.
:::
:::

::: exercise Hiding communication {level=2}
Using [[#prop-overlap]], a backward pass of $T_b = 1.2$ s and an all-reduce of $T_c = 0.9$ s are split into $n_b = 30$ buckets. How long after the backward pass does communication finish? What if $T_c = 1.8$ s?
::: solution
$T_c\le T_b$: the delay is at most $T_c/n_b = 0.03$ s. With $T_c = 1.8$ s: $T_c - T_b + T_b/n_b = 0.6 + 0.04 = 0.64$ s, so about $0.64$ s of exposed communication per step — the remedy being more work per device (larger micro-batches or more accumulation), fewer bytes (lower-precision gradients), or faster links.
:::
:::

::: exercise A tree all-reduce {level=3}
In a **binary-tree** all-reduce, buffers are summed up a binary tree of $p = 2^k$ devices to the root (each internal node receives two buffers, adds them, sends one up) and the result is broadcast back down. Assuming each device can send and receive one message of $M$ bytes at a time, count the steps and the bytes the busiest device sends and receives. Compare with the ring, and explain why tree algorithms use **pipelining** — splitting $M$ into chunks.
::: solution
Reduction takes $k = \log_2p$ levels and broadcast another $k$: $2\log_2p$ steps, each moving whole buffers, so the time is $2\log_2p\,(\alpha + M/\beta)$ if a node receives its two children's buffers one after another (or a constant factor more). An internal node receives $2M$ and sends $M$ upward, then receives $M$ and sends $2M$ downward: about $3M$ received and sent, independent of $p$ but larger than the ring's $2M$, and — more importantly — the bandwidth term is multiplied by $\log_2p$ because each level waits for the whole buffer. Splitting $M$ into $c$ chunks lets different levels work on different chunks concurrently, so the time becomes roughly $(2\log_2p + c)(\alpha + M/(c\beta))$: with $c\gg\log_2p$ the bandwidth term approaches a constant multiple of $M/\beta$ while keeping the latency logarithmic. NCCL uses pipelined double binary trees for this reason.
:::
:::

::: exercise Choosing a ZeRO stage {level=3}
A $30$-billion-parameter model is trained on $128$ devices with $80$ GB each. Activations with selective recomputation take $25$ GB per device, and $10$ GB is reserved for buffers. Which ZeRO stages fit? For the stage you choose, what fraction of a $10$ s step is spent sending data if links run at $50$ GB/s and nothing is overlapped?
::: solution
Available for model state: $80 - 25 - 10 = 45$ GB. Plain DP: $480$ GB, no. Stage 1: $4\cdot30 + 12\cdot30/128 = 120 + 2.8 = 122.8$ GB, no. Stage 2: $60 + 14\cdot30/128 = 63.3$ GB, no. Stage 3: $480/128 = 3.75$ GB, yes (plus a few GB for gathered layers). Communication: $3\cdot\frac{127}{128}\cdot60$ GB $= 178.6$ GB per device per step, $3.6$ s at $50$ GB/s, $36\%$ of the step if not overlapped. Overlapping the all-gathers with computation and using hybrid sharding (stage 3 within groups of $16$ devices would need $480/16 = 30$ GB, which fits) both reduce the exposed cost; combining with tensor parallelism inside servers is the other standard option ([[scaling/model-parallelism]]).
:::
:::
