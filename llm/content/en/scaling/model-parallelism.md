Data parallelism, even fully sharded, has every device run the whole model on its own micro-batch. That breaks down in two ways as models grow. The computation of a single layer for a single micro-batch may be too slow, or its activations too large, for one device; and with ZeRO-3 the all-gathers of parameters for every layer, on every step, come to dominate the network. The remedy is to split the model itself: the matrices inside each layer (**tensor parallelism**), the sequence of tokens (**sequence and context parallelism**), the stack of layers (**pipeline parallelism**), or, in mixture-of-experts models, the experts (**expert parallelism**). Each splits a different dimension of the computation, and each has its own communication pattern, which decides where in the hierarchy of links it can be used.

This chapter derives each scheme from the structure of the Transformer block. For tensor parallelism we prove that splitting the first feed-forward matrix by columns and the second by rows needs a single all-reduce, and count the communication; for pipeline parallelism we derive the idle fraction $(p - 1)/(m + p - 1)$ and simulate the GPipe and one-forward-one-backward schedules; for mixtures of experts we derive the load-balancing loss's minimum and the cost of the all-to-all exchange. How these combine on a real cluster is worked through in [[scaling/large-runs]]. The block structure is that of [[transformers/transformer-block]], and the expert layer that of [[transformers/mixture-of-experts]].

## Tensor parallelism {#sec-tp}

Consider the feed-forward network of a block, $Z = \operatorname{GeLU}(XA)\,B$, with input $X\in\R^{n\times h}$ ($n$ tokens), $A\in\R^{h\times4h}$ and $B\in\R^{4h\times h}$. To split it across $t$ devices, one must decide how to partition $A$ and $B$.

::: theorem The Megatron feed-forward split {#thm-megatron-mlp}
Partition $A$ by columns and $B$ by rows into $t$ blocks,

$$
A = \begin{bmatrix}A_1 & A_2 & \cdots & A_t\end{bmatrix},\qquad B = \begin{bmatrix}B_1\\ B_2\\ \vdots\\ B_t\end{bmatrix},\qquad A_i\in\R^{h\times4h/t},\ B_i\in\R^{4h/t\times h},
$$

and let device $i$ hold $A_i$ and $B_i$ and the full input $X$. Then

$$
Z = \sum_{i=1}^{t}\operatorname{GeLU}(XA_i)\,B_i.
$$ {#eq-megatron}

Each device computes its term with no communication, and a single **all-reduce** of the $n\times h$ partial results gives $Z$ on every device. In the backward pass, a single all-reduce of the $n\times h$ input gradients $\bar X$ is needed. No other communication is required.
:::

::: proof
Column partitioning gives $XA = \begin{bmatrix}XA_1 & \cdots & XA_t\end{bmatrix}$. GeLU acts element-wise, so it acts on each column block independently: $\operatorname{GeLU}(XA) = \begin{bmatrix}\operatorname{GeLU}(XA_1) & \cdots & \operatorname{GeLU}(XA_t)\end{bmatrix} = \begin{bmatrix}Y_1 & \cdots & Y_t\end{bmatrix}$. A block row-vector times a block column-vector is the sum of the products of corresponding blocks: $YB = \sum_iY_iB_i$, which is [[#eq-megatron]].

Backward: given $\bar Z$ (identical on all devices, since $Z$ is), device $i$ computes $\bar B_i = Y_i\T\bar Z$, $\bar Y_i = \bar ZB_i\T$, the GeLU backward element-wise, $\bar A_i = X\T\bar{(XA_i)}$ and its share of the input gradient $\bar X^{(i)} = \bar{(XA_i)}A_i\T$, all from local data. Since $X$ feeds every device's term, $\bar X = \sum_i\bar X^{(i)}$, computed by one all-reduce.
:::

The alternative — splitting $A$ by rows, so that each device holds a slice of the input dimension — fails: then $XA = \sum_iX_iA_i$ is a sum, and $\operatorname{GeLU}(\sum_iX_iA_i)\ne\sum_i\operatorname{GeLU}(X_iA_i)$, so the partial products must be summed *before* the non-linearity, adding an all-reduce. Shoeybi et al. (2019) chose the column-then-row arrangement for this reason. The same works for gated feed-forward networks such as SwiGLU, whose gate and up projections are both split by columns.

Attention splits the same way, along heads. With $a$ heads divisible by $t$, device $i$ holds the columns of $W_Q, W_K, W_V$ for heads $(i-1)a/t + 1,\dots,ia/t$, computes those heads' attention entirely locally (heads are independent), and holds the corresponding rows of the output projection $W_O$; one all-reduce after $W_O$ completes the forward pass. A block therefore needs **two all-reduces in the forward pass and two in the backward pass**, each of an $n\times h$ activation tensor. Megatron-LM writes them as a pair of conjugate operators: $f$ is the identity in the forward pass and an all-reduce in the backward pass, $g$ the reverse, placed at the start and end of each sub-layer.

::: widget graph
nodes: X@0,1; GeLU(XA1)@1,2; GeLU(XA2)@1,0; Y1B1@2,2; Y2B2@2,0; all-reduce@3,1; Z@4,1
edges: X>GeLU(XA1); X>GeLU(XA2); GeLU(XA1)>Y1B1; GeLU(XA2)>Y2B2; Y1B1>all-reduce; Y2B2>all-reduce; all-reduce>Z
caption: Data flow of the tensor-parallel feed-forward network of [[#thm-megatron-mlp]] on $t = 2$ devices. The input $X$ is replicated; each device multiplies by its column block $A_i$, applies GeLU locally, multiplies by its row block $B_i$, and a single all-reduce sums the two $n\times h$ partial outputs. Attention is split the same way, by heads.
:::

::: proposition Communication of tensor parallelism {#prop-tp-comm}
For a block of width $h$ processing $n$ tokens per device in 16-bit, with tensor parallelism of degree $t$ and ring all-reduces, each device sends per block per training step

$$
4\cdot2\,\frac{t-1}{t}\cdot2nh\ \text{bytes},
$$

while it performs about $72nh^2/t$ FLOPs (without attention scores). The ratio of FLOPs to bytes is $\approx\frac{72nh^2/t}{16nh} = \frac{9h}{2t}$ for large $t$.
:::

::: proof
Four all-reduces per block per step (two forward, two backward), each of $n\times h$ elements at $2$ bytes, cost $2\frac{t-1}{t}\cdot2nh$ bytes per device by [[scaling/data-parallelism#thm-ring]]. A block's training FLOPs are $72nh^2$ ([[scaling/flops-memory#eq-step-flops]], without the attention term), divided equally among $t$ devices. Dividing, $\frac{72nh^2/t}{16nh(t-1)/t} = \frac{9h}{2(t-1)}\approx\frac{9h}{2t}$.
:::

The ratio does not depend on $n$: making the batch larger does not help tensor parallelism amortise its communication, and it falls as $t$ grows. With $h = 8192$ and $t = 8$, the devices must move one byte for every $4600$ FLOPs, which a link of $450$ GB/s can sustain against $\sim$$400$ TFLOP/s of achieved compute only if most of it is overlapped; across a $50$ GB/s network it cannot. Tensor parallelism is therefore used **within a server**, over its fastest links, usually with $t\le8$.

::: example Tensor parallelism inside and outside a server {#ex-tp}
A block with $h = 8192$ processes $n = 4096$ tokens per device with $t = 8$. Assume devices achieve $400$ TFLOP/s on the matrix products. Estimate the compute and communication time per block per step over $450$ GB/s links within a server and over a $50$ GB/s network.
::: solution
Compute: $72\cdot4096\cdot8192^2/8 = 2.47\times10^{12}$ FLOPs, $6.2$ ms. Communication: each all-reduce moves $2\cdot\frac78\cdot2\cdot4096\cdot8192 = 117$ MB per device; four of them, $470$ MB. Within the server: $470\text{ MB}/450\text{ GB/s} = 1.0$ ms, $17\%$ of compute — tolerable, and partly overlappable. Across the network: $9.4$ ms, more than the compute itself. Hence the rule: tensor parallelism stays inside the fast domain.
:::
:::

The embedding and output layers are split along the vocabulary: each device holds $V/t$ rows of the embedding matrix and computes the logits of its vocabulary slice; the softmax cross-entropy is computed with all-reduces of the per-token maximum and sum of exponentials, avoiding ever gathering the full $n\times V$ logit matrix.

## Sequence and context parallelism {#sec-sp}

Tensor parallelism splits the matrix products, but the operations between them — layer normalisation, dropout, residual additions — are replicated on all $t$ devices, and so are their activations, which by [[scaling/flops-memory#thm-activations]] are a large share of the total.

::: definition Sequence parallelism {#def-sp}
**Sequence parallelism** (Korthikanti et al., 2022) splits the tokens of the non-tensor-parallel regions along the sequence dimension across the same $t$ devices. Each all-reduce of tensor parallelism is replaced by a **reduce-scatter** (leaving each device with the summed output for $n/t$ tokens, on which it applies the norm and residual addition) followed, at the start of the next tensor-parallel region, by an **all-gather** (reassembling the full sequence for the matrix product).
:::

Since an all-reduce *is* a reduce-scatter followed by an all-gather, sequence parallelism costs no extra communication; it simply does useful work in between, and divides the replicated activations by $t$. This is what makes the $1/t$ in [[scaling/flops-memory#thm-activations]] apply to every term.

::: example What sequence parallelism saves {#ex-sp}
Korthikanti et al. (2022) gave the activation memory per block with tensor parallelism alone as $sbh\,(10 + 24/t + 5as/(ht))$ bytes: the $10sbh$ of norm inputs and dropout masks is replicated. For the GPT-3 shape ($s = 2048$, $b = 1$, $h = 12{,}288$, $a = 96$) with $t = 8$, compare tensor parallelism alone, with sequence parallelism, and with sequence parallelism and selective recomputation.
::: solution
$sbh = 25.2$ million and $5as/(ht) = 10$. Tensor parallelism alone: $sbh(10 + 3 + 10) = 579$ MB per block. With sequence parallelism, $sbh(34/8 + 10) = 14.25\,sbh = 359$ MB. Adding selective recomputation removes the score terms: $4.25\,sbh = 107$ MB, against $2.87$ GB per block with no parallelism at all ([[scaling/flops-memory]]). Over $96$ blocks: $55.6$, $34.4$ and $10.3$ GB per device.
:::
:::

For very long contexts even that is not enough: attention's cost grows with $n^2$, and the activations of a single sequence of a million tokens do not fit on a server. **Context parallelism** splits the sequence across $c$ devices for the whole block, including attention. Attention is the only operation that mixes tokens, so it is the only one that needs communication.

::: algorithm Ring attention {#alg-ring-attention}
The sequence is divided into $c$ chunks; device $j$ holds the queries, keys and values of chunk $j$.
1. Each device computes attention of its queries against its own keys and values, keeping the running maximum, normaliser and output of the online softmax ([[transformers/attention-complexity]]).
2. For $c - 1$ steps: each device passes the key and value chunk it holds to the next device in a ring and receives one from the previous; it updates its running softmax statistics and output with attention against the received chunk. The transfer of the next chunk overlaps the computation on the current one.
3. After $c - 1$ steps every query has attended to every key; the normalised outputs are exact.
:::

Ring attention (Liu, Zaharia and Abbeel, 2023) moves each device's keys and values $c - 1$ times per layer, but the computation per step — attention between two chunks, quadratic in chunk length — grows faster than the communication, so long enough chunks hide it completely. With a causal mask, a naive contiguous split leaves the device holding the first chunk with almost nothing to do; implementations assign each device two chunks from opposite ends of the sequence to balance the work. An alternative, **DeepSpeed-Ulysses** (Jacobs et al., 2023), uses all-to-all exchanges to switch from a sequence-sharded layout to a head-sharded one for attention and back, which requires the number of heads to be divisible by $c$.

## Pipeline parallelism {#sec-pp}

::: definition Pipeline parallelism {#def-pp}
In **pipeline parallelism** the $L$ layers are divided into $p$ consecutive **stages**, stage $s$ on device (or device group) $s$. A batch is split into $m$ **micro-batches**. Each micro-batch's forward pass flows through stages $1,\dots,p$, sending activations from each stage to the next, and its backward pass flows back from $p$ to $1$, sending activation gradients. A **schedule** fixes the order in which each stage processes forward and backward passes of the micro-batches. In a synchronous (**flushing**) schedule, all micro-batches finish their backward passes before the optimiser step.
:::

The communication is light: only the activations at stage boundaries, $n\times h$ per micro-batch in each direction, point to point. Pipeline parallelism can therefore cross the network. Its cost is idle time.

::: theorem The pipeline bubble {#thm-bubble}
Let each stage take time $t_f$ for the forward pass and $t_b$ for the backward pass of one micro-batch, and ignore communication time. In the GPipe schedule — all $m$ forward passes, then all $m$ backward passes — a step takes

$$
T = (m + p - 1)(t_f + t_b),
$$

and the fraction of device time that is idle (the **bubble**) is

$$
\frac{p - 1}{m + p - 1}.
$$ {#eq-bubble}
:::

::: proof
*Forward phase.* Micro-batch $i$ ($i = 1,\dots,m$) can start on stage $s$ only after it has finished on stage $s - 1$ and stage $s$ has finished micro-batch $i - 1$. By induction, it finishes on stage $s$ at time $(i + s - 1)t_f$: true for $i = s = 1$, and if micro-batch $i$ finishes on stage $s - 1$ at $(i + s - 2)t_f$ and micro-batch $i - 1$ on stage $s$ at $(i + s - 2)t_f$, both constraints release it at $(i + s - 2)t_f$, and it finishes $t_f$ later. The last micro-batch leaves the last stage at $(m + p - 1)t_f$.

*Backward phase.* Symmetrically, the backward passes enter at stage $p$ and travel to stage $1$; the last finishes $(m + p - 1)t_b$ after the backward phase begins. (Stage $p$ can begin its first backward pass as soon as its last forward pass ends; the backward phase starts at stage $p$ at time $(m + p - 1)t_f$ and the earlier stages follow at the same rhythm, so the total is the sum of the two phases.)

*Bubble.* Each device does $m(t_f + t_b)$ of useful work in a step of length $(m + p - 1)(t_f + t_b)$, so its idle fraction is $1 - m/(m + p - 1) = (p - 1)/(m + p - 1)$.
:::

The bubble is the fill and drain of the pipeline: at the start, stage $s$ waits $(s - 1)t_f$ for its first micro-batch; at the end, it waits for the backward passes of the stages after it. It is small only when $m\gg p$. But in GPipe, a stage must keep the activations of all $m$ micro-batches until their backward passes begin, so memory grows with $m$ — exactly what one wants to make large.

::: algorithm One-forward-one-backward (1F1B) schedule {#alg-1f1b}
Stage $s$ (numbered $0,\dots,p-1$):
1. **Warm-up**: run the forward passes of the first $p - 1 - s$ micro-batches.
2. **Steady state**: alternate one forward pass (of the next micro-batch) and one backward pass (of the oldest micro-batch whose forward pass it has done) until all forward passes are done.
3. **Cool-down**: run the remaining backward passes.
:::

1F1B, from PipeDream (Narayanan et al., 2019) in its synchronous "PipeDream-Flush" form (Narayanan et al., 2021), starts each micro-batch's backward pass as early as possible. Its bubble is the same as GPipe's, but stage $s$ never holds more than $p - s$ micro-batches' activations at once — at most $p$, independent of $m$ — so $m$ can be increased to shrink the bubble without increasing memory. The program simulates both schedules with $t_b = 2t_f$, each stage processing its operations in schedule order as soon as their dependencies are met.

```python
def schedule(p, m, kind):
    """Per-stage operation order for GPipe or 1F1B: ('F', i) / ('B', i)."""
    orders = []
    for s in range(p):
        if kind == "gpipe":
            ops = [("F", i) for i in range(m)] + [("B", i) for i in range(m)]
        else:                                          # 1F1B (PipeDream-Flush)
            warm = min(p - 1 - s, m)
            ops = [("F", i) for i in range(warm)]
            f, b = warm, 0
            while b < m:
                if f < m:
                    ops.append(("F", f)); f += 1
                ops.append(("B", b)); b += 1
        orders.append(ops)
    return orders

def simulate(p, m, kind, tf=1.0, tb=2.0):
    """Each op starts when its stage is free and its dependency has finished:
    F(s,i) needs F(s-1,i); B(s,i) needs B(s+1,i) (and, on the last stage, F(s,i))."""
    orders = schedule(p, m, kind)
    done, free, pos = {}, [0.0] * p, [0] * p
    in_flight, peak = [0] * p, [0] * p
    while any(pos[s] < len(orders[s]) for s in range(p)):
        progressed = False
        for s in range(p):
            if pos[s] == len(orders[s]):
                continue
            op, i = orders[s][pos[s]]
            dep = (s - 1, "F", i) if op == "F" else (s + 1, "B", i)
            if op == "F" and s == 0:
                ready = 0.0
            elif op == "B" and s == p - 1:
                ready = done.get((s, "F", i))
            else:
                ready = done.get((dep[0], dep[1], i))
            if ready is None:
                continue
            start = max(free[s], ready)
            done[(s, op, i)] = free[s] = start + (tf if op == "F" else tb)
            in_flight[s] += 1 if op == "F" else -1
            peak[s] = max(peak[s], in_flight[s])
            pos[s] += 1
            progressed = True
        assert progressed, "deadlock"
    T = max(free)
    return T, 1 - m * (tf + tb) / T, max(peak)

print(" p   m  schedule  step time  bubble  (p-1)/(m+p-1)  peak micro-batches stored")
for p, m in ((4, 4), (4, 16), (8, 8), (8, 32)):
    for kind in ("gpipe", "1f1b"):
        T, bubble, peak = simulate(p, m, kind)
        print(f"{p:2d} {m:3d}  {kind:8s}  {T:8.1f}  {bubble:6.3f}  {(p - 1) / (m + p - 1):12.3f}"
              f"  {peak:4d}")
```

```text
 p   m  schedule  step time  bubble  (p-1)/(m+p-1)  peak micro-batches stored
 4   4  gpipe         21.0   0.429         0.429     4
 4   4  1f1b          21.0   0.429         0.429     4
 4  16  gpipe         57.0   0.158         0.158    16
 4  16  1f1b          57.0   0.158         0.158     4
 8   8  gpipe         45.0   0.467         0.467     8
 8   8  1f1b          45.0   0.467         0.467     8
 8  32  gpipe        117.0   0.179         0.179    32
 8  32  1f1b         117.0   0.179         0.179     8
```

Both schedules take $(m + p - 1)(t_f + t_b)$ and match [[#eq-bubble]] exactly; 1F1B's peak memory is $p$ micro-batches against GPipe's $m$.

::: proposition Interleaved schedules {#prop-interleaved}
If each device holds $v$ non-adjacent **virtual stages** (chunks of $L/(pv)$ layers, device $s$ holding chunks $s, s + p, s + 2p, \dots$), the fill and drain take $(p - 1)$ chunk-times of $(t_f + t_b)/v$, and the bubble fraction becomes

$$
\frac{(p - 1)/v}{m + (p - 1)/v} = \frac{p - 1}{vm + p - 1}.
$$
:::

::: proof
The useful work per device is unchanged, $m(t_f + t_b)$, now divided into $mv$ chunk-passes of $(t_f + t_b)/v$. The pipeline has $pv$ chunk-stages, but consecutive chunk-stages on the same device follow one another without fill: a micro-batch reaches device $p$ for the first time after $p - 1$ chunk-times, and the drain is symmetric, so the idle time per device is $(p - 1)(t_f + t_b)/v$, a factor $v$ smaller than without interleaving. The idle fraction is $\frac{(p-1)/v}{m + (p-1)/v}$.
:::

Interleaving (Narayanan et al., 2021) divides the bubble by $v$ at the cost of $v$ times as many point-to-point transfers. **Zero-bubble** schedules (Qi et al., 2024) go further by splitting each backward pass into the computation of input gradients, which the previous stage is waiting for, and of weight gradients, which nobody waits for and which can fill the bubbles.

::: widget plot
f: (p - 1)/(x + p - 1); (p - 1)/(v*x + p - 1)
x: 1, 64
y: 0, 1
sliders: p=8:2:32:1; v=2:1:8:1
labels: GPipe / 1F1B; interleaved with $v$ chunks per device
caption: Pipeline bubble fraction against the number of micro-batches $m$ per step, for $p$ stages, from [[#eq-bubble]] and [[#prop-interleaved]]. Keeping the bubble below about $10\%$ needs $m\approx9(p-1)$ without interleaving — a large global batch when $p$ is large — or $v$ times fewer with interleaving.
:::

::: example Sizing a pipeline {#ex-pipeline}
A model is split into $p = 16$ stages, and the global batch allows $m = 32$ micro-batches per data-parallel replica. What is the bubble with 1F1B, and with an interleaved schedule with $v = 4$? How many micro-batches would 1F1B need for a $5\%$ bubble?
::: solution
1F1B: $15/47 = 31.9\%$. Interleaved: $15/(128 + 15) = 10.5\%$. For $(p - 1)/(m + p - 1) = 0.05$: $m + 15 = 300$, $m = 285$ — about nine times the available micro-batches. Deep pipelines need interleaving, or a smaller $p$ with more tensor or data parallelism.
:::
:::

Two further costs of pipelines are worth knowing. The stages must be **balanced**: the slowest stage sets the pace, and the first and last stages also hold the embedding and output layers, which are often large (with a vocabulary of $128$K tokens and $h = 16{,}384$, the output layer has $2$ billion parameters), so they are commonly given fewer Transformer layers. And pipeline parallelism complicates everything that needs the whole model at once, from checkpointing to layer-dependent features.

## Expert parallelism {#sec-ep}

A mixture-of-experts (MoE) layer replaces the feed-forward network by $E$ expert networks and a **router** that sends each token to $k$ of them ([[transformers/mixture-of-experts]]). Shazeer et al. (2017) introduced the sparsely gated MoE layer with noisy top-$k$ routing; GShard (Lepikhin et al., 2021) used top-$2$ routing in Transformers with experts spread across devices; and the Switch Transformer (Fedus, Zoph and Shazeer, 2022) simplified it to top-$1$. The total parameter count grows with $E$, the compute per token only with $k$.

::: definition Expert parallelism {#def-ep}
In **expert parallelism** of degree $e$, the $E$ experts of each MoE layer are divided among $e$ devices, $E/e$ per device, while the rest of the model is replicated (or split by other schemes) and each device processes its own tokens. In each MoE layer: the router assigns each token to its experts; an **all-to-all** sends each token's hidden vector to the devices holding its experts (**dispatch**); each device applies its experts to the tokens it received; a second all-to-all returns the outputs to the tokens' home devices (**combine**). The backward pass repeats both exchanges in reverse.
:::

::: proposition Communication of expert parallelism {#prop-ep-comm}
If a device holds $n$ tokens of width $h$ in 16-bit, each routed to $k$ experts placed uniformly at random over $e$ devices, the expected number of bytes it sends in one all-to-all is

$$
\frac{e - 1}{e}\cdot k\cdot n\cdot2h,
$$

and a training step sends four such exchanges per MoE layer.
:::

::: proof
Each token is copied once per selected expert: $kn$ vectors of $2h$ bytes. A copy whose expert is on the device itself is not sent; with experts uniformly placed this happens with probability $1/e$, so the expected volume sent is $(1 - 1/e)\cdot2khn$. The forward pass has a dispatch and a combine, and the backward pass the corresponding exchanges of gradients: four.
:::

All-to-all traffic does not have the bandwidth-optimal structure of the ring all-reduce: every device talks to every other, so it is sensitive to the network's bisection bandwidth. Expert parallelism is often placed within a server or a fast domain, and large MoE models use routing restricted to a few devices per token or communication–computation overlap to contain the cost.

The volume also assumes that experts receive equal numbers of tokens. If the router sends too many tokens to one expert, that device becomes the straggler, and in fixed-size implementations the excess tokens are **dropped** (passed through only by the residual connection).

::: definition Capacity and the load-balancing loss {#def-balance}
With $T$ tokens in a batch and $E$ experts, the **expert capacity** is $\left\lceil\text{cf}\cdot kT/E\right\rceil$ token slots per expert, with **capacity factor** $\text{cf}\ge1$; tokens beyond capacity are dropped. The **auxiliary load-balancing loss** of the Switch Transformer is

$$
\mathcal{L}_{\text{aux}} = \alpha\,E\sum_{i=1}^{E}f_iP_i,
$$

where $f_i$ is the fraction of tokens dispatched to expert $i$, $P_i$ the average router probability assigned to expert $i$ over the batch, and $\alpha$ a small weight ($10^{-2}$ in Fedus et al.).
:::

::: proposition The balance loss is minimised by uniform routing {#prop-balance}
The quantity $f_i$ is piecewise constant in the router's parameters, so gradients reach the router through $P_i$. If routing is consistent with the probabilities, $f_i = P_i$, then $E\sum_iP_i^2\ge1$, with equality if and only if $P_i = 1/E$ for every $i$. At uniform routing $\mathcal{L}_{\text{aux}} = \alpha$.
:::

::: proof
The $P_i$ are averages of probability vectors, so $\sum_iP_i = 1$. By the Cauchy–Schwarz inequality, $1 = \big(\sum_i1\cdot P_i\big)^2\le E\sum_iP_i^2$, with equality exactly when $(P_i)$ is proportional to $(1,\dots,1)$, i.e. $P_i = 1/E$. Then $\mathcal{L}_{\text{aux}} = \alpha E\cdot E\cdot(1/E)^2 = \alpha$.
:::

Increasing the capacity factor drops fewer tokens but wastes compute and memory on empty slots and raises communication; Fedus et al. found values of $1$ to $1.25$ worked well with top-$1$ routing. Some later designs avoid dropping altogether ("dropless" MoE, Gale et al., 2023, with block-sparse kernels), and DeepSeek-V3 (2024) balanced load with per-expert bias terms adjusted outside the gradient instead of a large auxiliary loss.

::: example All-to-all volume {#ex-ep}
A device holds $n = 8192$ tokens of width $h = 4096$ in bf16, with top-$2$ routing over experts spread across $e = 8$ devices. How many bytes does it send per MoE layer per training step? With top-$2$ routing, $64$ experts and $T = 65{,}536$ tokens per batch, what is the capacity per expert at $\text{cf} = 1.25$?
::: solution
One all-to-all: $\frac78\cdot2\cdot8192\cdot2\cdot4096 = 117$ MB. Four per layer: $470$ MB — the same order as tensor parallelism's traffic for a block of twice the width in [[#ex-tp]], but in an all-to-all pattern. Capacity: $\lceil1.25\cdot2\cdot65{,}536/64\rceil = 2560$ token slots per expert, against an average load of $2048$.
:::
:::

::: warning Parallelism multiplies; it does not add
Each scheme divides a different quantity, and their effects on memory, communication and batch size compound. Tensor parallelism divides weights and activations by $t$ but needs a fast link; pipeline parallelism divides layers by $p$ but needs $m\gg p$ micro-batches, which, multiplied by the data-parallel degree, fixes a minimum global batch; data parallelism multiplies the batch again. With $t\cdot p\cdot d$ devices, the global batch is at least $m\cdot d$ micro-batches. Choosing degrees one at a time, without checking the global batch against the critical batch size and the per-device memory against the device, leads to configurations that run but waste most of the cluster. [[scaling/large-runs]] works through a complete layout.
:::

::: quiz
Which pairings of parallelism scheme and dominant communication pattern are correct?
- [x] Tensor parallelism — all-reduces (or reduce-scatter and all-gather) of activations in every block.
- [x] Pipeline parallelism — point-to-point transfers of activations between adjacent stages.
- [ ] Expert parallelism — ring all-reduce of expert weights.
- [x] Context parallelism with ring attention — passing key and value chunks around a ring.
::: solution
Expert parallelism exchanges tokens (hidden vectors) with all-to-all operations, not weights; the expert weights stay where they are. The other three are correct.
:::
:::

::: history
Model parallelism is as old as large neural networks: Krizhevsky et al.'s AlexNet (2012) split its layers across two GPUs, and Dean et al. (2012) partitioned models across machines in DistBelief. Shazeer et al. (2017) introduced sparsely gated mixture-of-experts layers with thousands of experts. Mesh-TensorFlow (Shazeer et al., 2018) expressed tensor splits as named mesh dimensions, and Shoeybi et al. (2019) gave the Megatron-LM tensor-parallel Transformer. Huang et al. (2019) introduced GPipe and Narayanan et al. (2019) PipeDream; Narayanan et al. (2021) combined tensor, pipeline and data parallelism with interleaved schedules to train a trillion-parameter model at $52\%$ of peak. Lepikhin et al. (2021) introduced GShard and Fedus et al. (2022) the Switch Transformer. Korthikanti et al. (2022) added sequence parallelism and selective recomputation; Liu et al. (2023) introduced ring attention and Jacobs et al. (2023) DeepSpeed-Ulysses; Qi et al. (2024) proposed zero-bubble pipeline schedules.
:::

::: summary
- **Tensor parallelism** splits the first matrix of each sub-layer by columns and the second by rows (attention by heads): one all-reduce per sub-layer forward and one backward. Its FLOPs-to-bytes ratio is about $9h/(2t)$, independent of batch, so it stays within a server.
- **Sequence parallelism** replaces each all-reduce by a reduce-scatter and an all-gather and shards norms and dropout along the sequence, dividing all activations by $t$ at no extra communication. **Context parallelism** (ring attention, Ulysses) splits long sequences, including attention.
- **Pipeline parallelism** splits layers into $p$ stages; with $m$ micro-batches the bubble is $(p-1)/(m+p-1)$. **1F1B** keeps at most $p$ micro-batches of activations; **interleaving** with $v$ chunks divides the bubble by $v$.
- **Expert parallelism** places experts on different devices and exchanges tokens with two all-to-alls forward and two backward, $\frac{e-1}{e}\cdot2khn$ bytes each; load balance is encouraged by $\alpha E\sum_if_iP_i$, minimised at uniform routing, and enforced by a capacity factor.
- The schemes multiply: devices $= t\cdot p\cdot d\,(\cdot c\cdot e)$, and the global batch is at least $m\cdot d$ micro-batches.
:::

## Exercises

::: exercise Shards of a matrix {level=1 check="67108864"}
In a tensor-parallel feed-forward network with $h = 8192$ and $t = 4$, how many entries does each device's block $A_i$ of the first matrix ($h\times4h$) have?
::: solution
$h\cdot4h/t = 4h^2/4 = h^2 = 8192^2 = 67{,}108{,}864$, or $134$ MB in bf16; $B_i$ has the same number.
:::
:::

::: exercise Bubble {level=1 check="0.125"}
A GPipe or 1F1B pipeline has $p = 4$ stages and $m = 21$ micro-batches. What is the bubble fraction?
::: solution
$(p-1)/(m+p-1) = 3/24 = 0.125$.
:::
:::

::: exercise Interleaving {level=1 check="0.0625"}
With $p = 8$, $m = 21$ and $v = 5$ virtual stages per device, what is the bubble fraction of the interleaved schedule?
::: solution
$(p-1)/(vm + p - 1) = 7/(105 + 7) = 7/112 = 0.0625$.
:::
:::

::: exercise Balance loss {level=2 check="0.0112"}
A Switch layer with $E = 4$ experts and $\alpha = 0.01$ has $f = (0.4, 0.2, 0.2, 0.2)$ and $P = (0.4, 0.2, 0.2, 0.2)$. Compute $\mathcal{L}_{\text{aux}}$ and compare with its value at uniform routing.
::: solution
$\sum f_iP_i = 0.16 + 0.04 + 0.04 + 0.04 = 0.28$; $\mathcal{L}_{\text{aux}} = 0.01\cdot4\cdot0.28 = 0.0112$, against $\alpha = 0.01$ at uniform routing: the imbalance raises the loss by $12\%$, and its gradient through $P_1$ pushes probability away from the overloaded expert.
:::
:::

::: exercise Micro-batches for a target bubble {level=2 check="58"}
How many micro-batches does a 1F1B pipeline with $p = 7$ stages need for a bubble of at most $9.5\%$? Give the smallest integer.
::: solution
$(p-1)/(m+p-1)\le0.095$ gives $m + 6\ge6/0.095 = 63.2$, so $m\ge57.2$ and the smallest integer is $58$ (check: $m = 57$ gives $6/63 = 0.0952$, just above the target; $m = 58$ gives $6/64 = 0.094$).
:::
:::

::: exercise Tensor-parallel traffic {level=2 check="117.44"}
Verify the size of one tensor-parallel all-reduce in [[#ex-tp]] ($n = 4096$, $h = 8192$, $t = 8$, bf16), in MB ($10^6$ bytes) to two decimal places.
::: solution
$2\cdot\frac78\cdot2\cdot4096\cdot8192 = 1.75\cdot67{,}108{,}864 = 117{,}440{,}512$ bytes $= 117.44$ MB.
:::
:::

::: exercise Why not split rows first? {level=2}
Show by a $1\times2$ example that $\operatorname{GeLU}(x_1a_1 + x_2a_2)\ne\operatorname{GeLU}(x_1a_1) + \operatorname{GeLU}(x_2a_2)$ in general, using $\operatorname{ReLU}$ for simplicity, and explain what extra communication a row-first split of $A$ would require.
::: solution
Take $x = (1, 1)$, $a = (1, -1)\T$: $\operatorname{ReLU}(1 - 1) = 0$ but $\operatorname{ReLU}(1) + \operatorname{ReLU}(-1) = 1$. With $A$ split by rows, each device computes a partial sum $X_iA_i$ of the pre-activation; the non-linearity needs the complete sum, so an all-reduce of the $n\times4h$ pre-activations is needed before GeLU — four times larger than the $n\times h$ all-reduce at the end of the Megatron split, and in addition to it.
:::
:::

::: exercise 1F1B memory {level=2}
In the 1F1B schedule with $p$ stages, how many micro-batches' activations does stage $s$ (numbered from $0$) hold at most? For a stage holding $L/p$ layers with activation memory $M_a$ per layer per micro-batch, what is the worst stage's activation memory, and how does it compare with GPipe's?
::: solution
Stage $s$ runs $p - 1 - s$ warm-up forward passes and then one more before its first backward pass, so it holds at most $p - s$ micro-batches — $p$ for the first stage. Worst-stage memory: $p\cdot(L/p)\cdot M_a = LM_a$, the activations of one micro-batch through the whole model, independent of $m$. GPipe holds $m$ micro-batches per stage: $m(L/p)M_a$, larger by $m/p$.
:::
:::

::: exercise Ring attention overlap {level=3}
In ring attention with $c$ devices, each holding a chunk of $n/c$ tokens of width $h$ (and the same width for keys and values, in bf16), one step computes attention between a query chunk and a key–value chunk and transfers one key–value chunk. Show that computation per step is about $4(n/c)^2h$ FLOPs and communication $4(n/c)h$ bytes, and find the chunk length at which they balance on a device with $400$ TFLOP/s achieved and a $50$ GB/s link. What does this imply for the minimum sequence length per device?
::: solution
Scores $QK\T$ for $n/c$ queries and $n/c$ keys cost $2(n/c)^2h$ FLOPs, the weighted sum of values another $2(n/c)^2h$: $4(n/c)^2h$ (forward; the backward is about twice that, and so is its communication). The transfer is one $K$ and one $V$ chunk: $2\cdot(n/c)h\cdot2 = 4(n/c)h$ bytes. Time balance: $4(n/c)^2h/(4\times10^{14}) = 4(n/c)h/(5\times10^{10})$ gives $n/c = 4\times10^{14}/5\times10^{10} = 8000$ tokens. With chunks of more than about $8000$ tokens per device the transfer hides behind the computation; ring attention is therefore efficient for sequences of hundreds of thousands of tokens over tens of devices, and wasteful for short ones. (Grouped-query attention shrinks $K$ and $V$ and lowers the threshold.)
:::
:::

::: exercise Choosing between pipeline and data parallelism {level=3}
A model needs at least $t\cdot p = 64$ devices to hold one replica, with $t = 8$ fixed. The cluster has $1024$ devices, the per-device micro-batch is $1$ sequence of $8192$ tokens, and the global batch must not exceed $1024$ sequences (8.4 million tokens). Compare the configurations $p = 8$ (with $d = 16$) and $p = 16$ (with $d = 8$), using 1F1B without interleaving: for each, the number of micro-batches per replica $m$ and the bubble. Which is better, and what would interleaving with $v = 2$ change?
::: solution
Devices $t\cdot p\cdot d = 1024$. With $p = 8$, $d = 1024/64 = 16$, so $m = 1024/16 = 64$ micro-batches per replica and bubble $7/71 = 9.9\%$. With $p = 16$, $d = 8$, $m = 128$, bubble $15/143 = 10.5\%$. They are close; $p = 8$ is slightly better on the bubble and halves the pipeline's activation memory per stage count, while $p = 16$ halves per-device model state, which may be needed to fit memory. With $v = 2$: $7/(128 + 7) = 5.2\%$ and $15/(256 + 15) = 5.5\%$. The global-batch cap, not the device count, is what limits how small the bubble can be.
:::
:::
