Doubling the length of a Transformer's input doubles the work of every layer except one: attention, whose cost quadruples. For the short sequences of early models this hardly mattered, but language models now read documents, codebases and conversations of tens or hundreds of thousands of tokens, and the $T^2$ term decides what is feasible. The cost comes in two forms. There is arithmetic — floating-point operations, or FLOPs — and there is memory traffic: the attention matrix has $T^2$ entries per head, and moving it in and out of a GPU's main memory can take longer than computing it.

This chapter counts both. It derives when attention dominates a model's arithmetic, introduces the **roofline model** that tells whether a computation is limited by arithmetic or by memory bandwidth, and shows how **FlashAttention** computes exactly the same result as standard attention while never storing the attention matrix — by splitting it into tiles and normalising the softmax on the fly.

## Counting FLOPs {#sec-flops}

From [[transformers/transformer-block#prop-block-params]], a block has about $12d^2$ weights, and each weight costs $2$ FLOPs per token in the forward pass. The attention scores and the weighted sum of values add $4T^2d$ per sequence, or $4Td$ per token ([[transformers/multi-head-attention#eq-mha-flops]]).

::: proposition When attention dominates {#prop-crossover}
In the forward pass of a Transformer block with width $d$ and feed-forward width $4d$ (or SwiGLU with $\tfrac83d$), processing a sequence of $T$ tokens, the FLOPs of the attention scores and weighted values divided by the FLOPs of all weight matrices is

$$
\frac{4T^2d}{24Td^2} = \frac{T}{6d}.
$$

Attention costs more arithmetic than the rest of the block when $T > 6d$.
:::

::: proof
The weight matrices cost $2\cdot12d^2 = 24d^2$ FLOPs per token, so $24Td^2$ for the sequence. The scores $QK^\top$ cost $2T^2d$ summed over heads, and the product with $V$ the same, giving $4T^2d$. The ratio is $4T^2d/(24Td^2) = T/(6d)$.
:::

For a model with $d = 4096$ the crossover is at $T = 24{,}576$ tokens; for GPT-2 small ($d = 768$) at $4608$. Below the crossover the weights dominate and attention is a modest overhead; well above it, attention is most of the work. A causal mask halves the useful score computations, and efficient kernels skip the masked half, which moves the crossover to about $12d$ — but does not change the quadratic growth.

::: widget plot
f: 24*d^2/1e9; 4*d*x/1e9
x: 0, 100000
sliders: d=4096:768:8192:256
labels: weight matrices $24d^2$; attention $4Td$
caption: Forward FLOPs per token (in billions) of one Transformer block against the context length $T$, for width $d$. The cost of the weight matrices is the same for every token; the cost of attention grows with the number of tokens attended to. The lines cross at $T = 6d$ — at $24{,}576$ tokens for $d = 4096$.
:::

::: example Where the crossover lies {#ex-crossover}
For a model with $d = 4096$ and $32$ layers, compute the forward FLOPs per token of the weight matrices and of attention at $T = 8192$, and the total attention FLOPs for one sequence of that length. How long would those take at a peak of $989$ TFLOP/s?
::: solution
Per token and per layer: weights $24d^2 = 24\cdot4096^2\approx4.03\times10^8$, attention $4Td = 4\cdot8192\cdot4096\approx1.34\times10^8$ — a third of the weight cost, as $T/(6d) = 1/3$ predicts. For the whole sequence over $32$ layers, attention costs $4T^2d\cdot32 = 4\cdot8192^2\cdot4096\cdot32\approx3.5\times10^{13}$ FLOPs, which at $989\times10^{12}$ FLOP/s takes $0.036$ s if the hardware ran at full speed. Real attention kernels reach a fraction of the peak, and the rest of this chapter is about why.
:::
:::

## Counting memory {#sec-memory}

Arithmetic is only half the story. To compute the softmax, a straightforward implementation forms the score matrix $S = QK^\top/\sqrt{d_k}$, writes it to memory, reads it back to compute $P = \operatorname{softmax}(S)$, writes $P$, and reads $P$ again to compute $PV$. For training it also keeps $P$ for the backward pass.

::: example The size of the attention matrix {#ex-memory}
A model with $h = 32$ heads processes one sequence of $T = 32{,}768$ tokens. How much memory does one layer's attention matrix occupy in bfloat16 (two bytes per entry)? How does this compare with the memory of an 80 GB GPU?
::: solution
$h\cdot T^2 = 32\cdot32{,}768^2 = 3.4\times10^{10}$ entries, at two bytes each $68{,}719{,}476{,}736$ bytes $= 64$ GiB — for one layer of one sequence. Storing it for every layer, as a naive backward pass would require, is out of the question. Even a single layer's matrix would fill most of the GPU, which is why long-context training is impossible without implementations that never materialise it.
:::
:::

Even when the matrix fits, writing it and reading it back costs time. A GPU has a small, very fast on-chip memory (SRAM: registers and shared memory, about $192$ KB per streaming multiprocessor on an NVIDIA A100, some $20$ MB in total) and a large, much slower main memory (HBM: $40$–$80$ GB on an A100). Arithmetic happens only on data in SRAM; everything else must be moved in from HBM and the results moved back.

::: definition Arithmetic intensity {#def-intensity}
The **arithmetic intensity** of a computation is the number of floating-point operations it performs per byte moved between main memory and the processor:

$$
I = \frac{\text{FLOPs}}{\text{bytes read and written}}.
$$
:::

::: definition Roofline model {#def-roofline}
A processor with peak arithmetic throughput $\pi$ (FLOP/s) and memory bandwidth $\beta$ (bytes/s) can execute a computation of intensity $I$ at a rate of at most

$$
\text{attainable throughput} = \min(\pi,\ \beta I).
$$

Computations with $I < \pi/\beta$ are **memory-bound**: they wait for data. Those with $I > \pi/\beta$ are **compute-bound**. The value $\pi/\beta$ is the **ridge point**.
:::

As published by NVIDIA, an A100 (80 GB) has $\pi = 312$ TFLOP/s for dense bfloat16 arithmetic and $\beta = 2.04$ TB/s, a ridge point of about $153$ FLOPs per byte; an H100 SXM has $989$ TFLOP/s and $3.35$ TB/s, a ridge point of about $295$. The ridge point has *risen* with each generation: arithmetic has become cheaper faster than memory bandwidth, so ever more computations are memory-bound.

::: widget plot
f: min(989, 3.35x); min(312, 2.04x)
x: 0, 500
y: 0, 1050
labels: H100 SXM (989 TFLOP/s, 3.35 TB/s); A100 80 GB (312 TFLOP/s, 2.04 TB/s)
points: 1.25, 4.2; 120, 402
vlines: 153; 295
caption: Rooflines of two GPUs: attainable TFLOP/s against arithmetic intensity (FLOPs per byte). To the left of a ridge point (dashed lines) a computation is limited by memory bandwidth, to the right by arithmetic. The marked points are, on the H100, an elementwise softmax (intensity about $1.25$) and the score product $QK^\top$ for one head with $T = 4096$ and $d_k = 128$ (about $120$); a large square matrix product, at about $1365$, lies far to the right on the flat part of the roof.
:::

::: example Intensities in attention {#ex-intensity}
Compute the arithmetic intensity, in bfloat16, of (a) the score product $S = QK^\top$ for one head with $T = 4096$ and $d_k = 128$, writing $S$ to memory; (b) a row-wise softmax that reads $S$ and writes $P$; (c) the product of two $4096\times4096$ matrices. Which are memory-bound on an H100?
::: solution
(a) FLOPs $2T^2d_k = 2\cdot4096^2\cdot128\approx4.29\times10^9$. Bytes: read $Q$ and $K$, $2\cdot4096\cdot128\cdot2\approx2.1\times10^6$, and write $S$, $4096^2\cdot2\approx3.36\times10^7$. Intensity $\approx4.29\times10^9/3.57\times10^7\approx120$ FLOPs/byte — below the H100's ridge point of $295$, because writing the large output dominates.

(b) The softmax does about five operations per entry (subtract the maximum, exponentiate, sum, divide, plus finding the maximum) while reading and writing two bytes each: about $5/4\approx1.25$ FLOPs/byte, deeply memory-bound.

(c) $2\cdot4096^3\approx1.37\times10^{11}$ FLOPs for $3\cdot4096^2\cdot2\approx10^8$ bytes: about $1365$ FLOPs/byte, comfortably compute-bound.

So the attention matrix makes even the matrix product of standard attention memory-bound, and the softmax far more so. Large matrix products — the weight matrices of a Transformer — are the only parts that keep the arithmetic units busy.
:::
:::

## FlashAttention {#sec-flash}

The way out is to never write $S$ or $P$ to main memory. Split the keys and values into blocks small enough to sit in SRAM, and process them one block at a time, accumulating the output as you go. The obstacle is the softmax: the weight of a key depends on the sum $\sum_j e^{s_j}$ over *all* keys, which is not known until the last block has been seen. The solution, the **online softmax** (Milakov and Gimelshein, 2018), keeps running statistics and corrects earlier partial results when a larger score appears.

::: proposition The online softmax {#prop-online}
Let a row of scores be split into blocks $\mathbf{s}^{(1)}, \mathbf{s}^{(2)}, \dots$, and the matching values into $V^{(1)}, V^{(2)}, \dots$. Start with $m = -\infty$, $\ell = 0$, $\mathbf{o} = \mathbf{0}$, and for each block $b$ update

$$
\begin{aligned}
m' &= \max\big(m,\ \max_j s^{(b)}_j\big), \\
\ell' &= \ell\,e^{m - m'} + \textstyle\sum_j e^{s^{(b)}_j - m'}, \\
\mathbf{o}' &= \mathbf{o}\,e^{m - m'} + \textstyle\sum_j e^{s^{(b)}_j - m'}\,\mathbf{v}^{(b)}_j.
\end{aligned}
$$

After the last block, $m = \max_js_j$, $\ell = \sum_je^{s_j - m}$, and $\mathbf{o}/\ell = \sum_j\operatorname{softmax}(\mathbf{s})_j\mathbf{v}_j$, the exact attention output.
:::

::: proof
We show by induction that after processing blocks $1, \dots, b$, the variable $m$ is the maximum score so far, $\ell = \sum e^{s_j - m}$ and $\mathbf{o} = \sum e^{s_j - m}\mathbf{v}_j$, the sums running over all scores seen so far. Initially both sums are empty. Suppose the claim holds before block $b$. The new maximum is $m'$. Multiplying the old sums by $e^{m - m'}$ turns every term $e^{s_j - m}$ into $e^{s_j - m'}$, and the new block contributes its own terms already relative to $m'$; so $\ell'$ and $\mathbf{o}'$ are the sums over all scores so far, relative to $m'$. At the end, $\mathbf{o}/\ell = \sum_je^{s_j - m}\mathbf{v}_j/\sum_je^{s_j - m}$, and the factor $e^{-m}$ cancels to give the softmax-weighted average. (When $m = -\infty$ the factor $e^{m - m'}$ is $0$, which correctly discards the empty sums.)
:::

::: example An online softmax by hand {#ex-online}
A row of scores $(1, 3, 2, 0)$ arrives in two blocks, $(1, 3)$ and $(2, 0)$. Track $m$ and $\ell$, and check $\ell$ against the direct sum $\sum_je^{s_j - \max s}$.
::: solution
Block 1: $m = 3$, $\ell = e^{1-3} + e^{3-3} = 0.1353 + 1 = 1.1353$. Block 2: $m' = \max(3, 2) = 3$, so the old sum is multiplied by $e^0 = 1$ and $\ell' = 1.1353 + e^{2-3} + e^{0-3} = 1.1353 + 0.3679 + 0.0498 = 1.5530$. Directly: $e^{-2} + e^0 + e^{-1} + e^{-3} = 1.5530$. Had the blocks come in the other order, block 1 would give $m = 2$, $\ell = 1 + e^{-2} = 1.1353$; then block 2 raises the maximum to $3$, rescales the old sum by $e^{2-3} = 0.3679$ to $0.4177$, and adds $e^{1-3} + e^0 = 1.1353$, again $1.5530$.
:::
:::

FlashAttention (Dao et al., 2022) combines the online softmax with tiling. For each block of queries held in SRAM, it streams the blocks of keys and values through SRAM, computes that tile of scores, updates $m$, $\ell$ and the output accumulator, and discards the tile. Only the final output, and the two numbers $m$ and $\ell$ per query row, are written to main memory.

::: algorithm FlashAttention forward pass (one head) {#alg-flash}
1. Split $Q$ into row blocks $Q_i$ and $K$, $V$ into row blocks $K_j$, $V_j$, of sizes chosen so that a few blocks fit in SRAM.
2. For each query block $Q_i$: load it into SRAM and set $\mathbf{m} = -\infty$, $\boldsymbol\ell = 0$, $O_i = 0$ (one entry or row per query).
3. For each key–value block $j$: load $K_j$, $V_j$; compute the tile $S_{ij} = Q_iK_j^\top/\sqrt{d_k}$ (apply the causal mask if needed, and skip tiles that are entirely masked); update $\mathbf{m}$, $\boldsymbol\ell$ and $O_i$ by [[#prop-online]].
4. Write $O_i/\boldsymbol\ell$ and the statistics $\mathbf{m}$, $\boldsymbol\ell$ to main memory.
:::

In NumPy, with the tiles as plain array slices, the algorithm is a dozen lines and agrees with standard attention to rounding error:

```python
import numpy as np

def attention(Q, K, V):                                  # standard: materialises S and P
    S = Q @ K.T / np.sqrt(Q.shape[1])                    # (T, T)
    P = np.exp(S - S.max(1, keepdims=True))
    return (P / P.sum(1, keepdims=True)) @ V             # (T, d_v)

def tiled_attention(Q, K, V, block=4):                   # never forms the full (T, T) matrix
    T, d = Q.shape
    O = np.zeros((T, V.shape[1]))                        # output accumulator (T, d_v)
    m = np.full(T, -np.inf)                              # running row maxima (T,)
    l = np.zeros(T)                                      # running row sums (T,)
    for j in range(0, K.shape[0], block):
        S = Q @ K[j:j+block].T / np.sqrt(d)              # one tile of scores (T, block)
        m_new = np.maximum(m, S.max(1))
        P = np.exp(S - m_new[:, None])                   # (T, block)
        scale = np.exp(m - m_new)                        # correct the old statistics
        l = l * scale + P.sum(1)
        O = O * scale[:, None] + P @ V[j:j+block]
        m = m_new
    return O / l[:, None]

rng = np.random.default_rng(0)
Q, K, V = (rng.standard_normal((10, 8)) for _ in range(3))
print(np.allclose(tiled_attention(Q, K, V), attention(Q, K, V)))   # True
```

Real kernels tile the queries as well and run the loops inside a single GPU kernel, so that the tiles live in SRAM; the arithmetic is the same.

The backward pass needs the attention weights, which FlashAttention did not store. It recomputes them, tile by tile, from $Q$, $K$ and the saved statistics $m$ and $\ell$. This adds FLOPs but saves far more time in memory traffic, the same trade as gradient checkpointing (Chen et al., 2016). Dao et al. showed that standard attention moves $\Theta(Td + T^2)$ numbers between HBM and SRAM, while FlashAttention moves $\Theta(T^2d^2/M)$ for an SRAM of size $M$ — many times fewer for typical head dimensions and SRAM sizes — and that no exact attention algorithm can do asymptotically better for all $M$. The memory needed beyond the inputs and outputs falls from $O(T^2)$ to $O(T)$.

::: quiz
Compared with standard attention, what does FlashAttention change? (Select all that apply.)
- [x] The number of bytes moved between GPU main memory and on-chip memory
- [x] The memory needed for the forward and backward passes, from quadratic to linear in $T$
- [ ] The number of floating-point operations, which it reduces
- [ ] The result, which is an approximation of attention
::: solution
FlashAttention reduces memory traffic and memory footprint. It does not reduce the arithmetic — the backward pass even recomputes the attention weights, adding FLOPs — and its result is exact up to floating-point rounding, unlike the approximate methods of [[transformers/efficient-attention]]. It is faster because standard attention is limited by memory bandwidth, not by arithmetic.
:::
:::

::: warning Exact is not the same as cheap
FlashAttention is sometimes described as "efficient attention" alongside sparse and linear methods. It is a different kind of thing: it computes standard attention *exactly*, with the same $O(T^2d)$ arithmetic, but organises the computation around the memory hierarchy. It makes attention several times faster in practice, but it does not change the quadratic growth of the cost; reading a context ten times longer still costs a hundred times more attention arithmetic. Approximations that change the model are the subject of [[transformers/efficient-attention]].
:::

In practice FlashAttention made attention several times faster and long contexts feasible: the original paper reported a $3\times$ speed-up of GPT-2 training at sequence length $1024$ and trained models on sequences of $16{,}384$ and $65{,}536$ tokens. FlashAttention-2 (Dao, 2023) reorganised the work across GPU threads and reached $50$–$73\%$ of the A100's peak throughput, and FlashAttention-3 (Shah et al., 2024) used the asynchronous features of the H100 to reach about $75\%$ of its peak in 16-bit precision. Fused attention kernels of this kind are now the default in deep-learning libraries; PyTorch's `scaled_dot_product_attention` dispatches to one when it can.

## Attention at generation time {#sec-decode}

Generating text has a different cost profile. When a decoder produces the next token, it computes a single new query and attends to the stored keys and values of all previous tokens ([[inference/kv-cache]]). The work per token is $O(Td)$ per layer, linear in the context, but it reads the entire cache from memory to do $2$ FLOPs per number read — an arithmetic intensity of about $1$, far below any ridge point. Generation is therefore dominated by memory bandwidth and by the size of the cache, which is why the methods of [[transformers/efficient-attention]] that shrink the cache — multi-query and grouped-query attention — matter so much for serving.

::: history
Vaswani et al. (2017) already tabulated the $O(T^2d)$ cost of self-attention against recurrent and convolutional layers. The roofline model was introduced by Williams, Waterman and Patterson (2009) to explain the performance of computations on multicore processors. Chen et al. (2016) showed that recomputing activations in the backward pass trades a little arithmetic for a large saving in memory. Milakov and Gimelshein (2018) published the online softmax, which computes the normaliser in one pass; Rabe and Staats (2021) used the same idea to compute self-attention in memory that grows far more slowly than $T^2$. Dao, Fu, Ermon, Rudra and Ré (2022) combined online softmax with tiling and recomputation into FlashAttention, analysed its IO complexity and released fast GPU kernels; FlashAttention-2 (Dao, 2023) and FlashAttention-3 (Shah et al., 2024) adapted it to newer hardware.
:::

::: summary
- Attention adds $4Td$ FLOPs per token per layer to the $24d^2$ of the weight matrices; it dominates the arithmetic when $T > 6d$ (about $12d$ when masked tiles are skipped).
- The attention matrix has $hT^2$ entries per layer; at long contexts it cannot be stored, and moving it to and from GPU main memory costs more time than the arithmetic.
- The roofline model bounds throughput by $\min(\pi, \beta I)$; computations with intensity below the ridge point $\pi/\beta$ (about $150$–$300$ FLOPs per byte on current GPUs) are memory-bound, as standard attention and generation are.
- The online softmax keeps a running maximum and sum, rescaling earlier partial results, so a softmax-weighted sum can be computed block by block exactly.
- FlashAttention tiles $Q$, $K$ and $V$ through on-chip memory, never stores the attention matrix, and recomputes it in the backward pass; it is exact, uses $O(T)$ extra memory and is several times faster, but the arithmetic still grows like $T^2$.
:::

## Exercises

::: exercise A small model's crossover {level=1 check="4608"}
At what context length do attention FLOPs equal the FLOPs of the weight matrices in GPT-2 small ($d = 768$), by [[#prop-crossover]]?
::: solution
$T = 6d = 6\cdot768 = 4608$ tokens. GPT-2 small's maximum context of $1024$ is far below this, so attention was a minor part of its cost.
:::
:::

::: exercise One head's scores {level=1 check="256"}
How many mebibytes does the score matrix of a single head occupy for $T = 8192$ in 32-bit floating point?
::: solution
$8192^2\cdot4 = 268{,}435{,}456$ bytes $= 256$ MiB.
:::
:::

::: exercise A ridge point {level=1 check="312/2.04"}
Compute the ridge point of an A100 (80 GB) from $\pi = 312$ TFLOP/s and $\beta = 2.04$ TB/s. Is a computation with intensity $100$ FLOPs per byte memory-bound on it?
::: solution
$\pi/\beta = 312/2.04\approx153$ FLOPs per byte. An intensity of $100$ is below it, so the computation is memory-bound: at best it runs at $2.04\times10^{12}\cdot100 = 204$ TFLOP/s, two thirds of the peak.
:::
:::

::: exercise The intensity of a matrix product {level=2 check="4096/3"}
Show that multiplying two $n\times n$ matrices in a 16-bit format, reading both inputs and writing the output once, has arithmetic intensity $n/3$ FLOPs per byte. Evaluate it for $n = 4096$. How large must $n$ be for the product to be compute-bound on an H100 (ridge point $295$)?
::: solution
FLOPs: $n^3$ multiply–adds, $2n^3$. Bytes: three $n\times n$ matrices of two bytes, $6n^2$. Intensity $2n^3/6n^2 = n/3$; for $n = 4096$, $4096/3\approx1365$. The product is compute-bound when $n/3 > 295$, that is $n > 885$. This is why large matrix products — and hence the weight matrices of big models — run near peak speed, while thin or small products do not.
:::
:::

::: exercise Online softmax with values {level=2 check="(2*exp(-2) + exp(0) + 4*exp(-1))/(exp(-2)+exp(0)+exp(-1)+exp(-3))"}
Extend [[#ex-online]] with one-dimensional values $v = (2, 1, 4, 0)$ for the scores $(1, 3, 2, 0)$. Track the accumulator $o$ through the two blocks and give the final output $o/\ell$.
::: solution
Block 1 ($m = 3$): $o = e^{-2}\cdot2 + e^0\cdot1 = 0.2707 + 1 = 1.2707$, $\ell = 1.1353$. Block 2 ($m$ stays $3$, scale $1$): $o = 1.2707 + e^{-1}\cdot4 + e^{-3}\cdot0 = 1.2707 + 1.4715 = 2.7422$, $\ell = 1.5530$. Output $2.7422/1.5530\approx1.766$, which equals $\sum_j\operatorname{softmax}(\mathbf{s})_jv_j = (2e^{-2} + 1 + 4e^{-1})/(e^{-2} + 1 + e^{-1} + e^{-3})$.
:::
:::

::: exercise Causal savings {level=2}
With a causal mask, how many of the $T^2$ score entries are needed? Show that skipping the masked ones roughly halves the attention FLOPs, and use this to find the crossover of [[#prop-crossover]] for a causal model with an efficient kernel.
::: solution
Only the $T(T+1)/2$ entries with $j\le i$ are needed, about $T^2/2$; a kernel that skips tiles lying entirely above the diagonal does about half the score and value work, $\approx2T^2d$ instead of $4T^2d$. The ratio to the weight FLOPs becomes $2T^2d/(24Td^2) = T/(12d)$, so the crossover moves to $T = 12d$ — about $49{,}000$ tokens for $d = 4096$.
:::
:::

::: exercise Traffic of standard attention {level=2 check="128"}
A naive attention implementation writes $S$, reads it, writes $P$ and reads it again, in bfloat16. How many mebibytes of main-memory traffic does this cause for one head with $T = 4096$, not counting $Q$, $K$, $V$ and the output? At $3.35$ TB/s, how long does that traffic take, and how does it compare with the time for the head's $4T^2d_k$ FLOPs at $989$ TFLOP/s with $d_k = 128$?
::: solution
Each pass moves $T^2\cdot2 = 32$ MiB, and there are four: $128$ MiB, or $1.34\times10^8$ bytes, which takes $1.34\times10^8/3.35\times10^{12}\approx40\ \mu$s. The arithmetic is $4\cdot4096^2\cdot128\approx8.6\times10^9$ FLOPs, which takes $8.6\times10^9/989\times10^{12}\approx8.7\ \mu$s at peak. The memory traffic takes about five times as long as the arithmetic — removing it is where FlashAttention's speed comes from.
:::
:::

::: exercise What FlashAttention stores {level=3}
For one head with $T = 8192$, compare the number of values the backward pass needs from the forward pass in standard attention (the weight matrix $P$) and in FlashAttention (the output, which both store, plus the statistics $m$ and $\ell$ per row). What is the ratio? Explain how $P$ can be recomputed exactly from $Q$, $K$, $m$ and $\ell$.
::: solution
Standard attention keeps $P$, $T^2 = 67{,}108{,}864$ numbers. FlashAttention keeps $m$ and $\ell$, $2T = 16{,}384$ numbers: $4096$ times fewer. Recomputation: for any tile, form $S_{ij} = Q_iK_j^\top/\sqrt{d_k}$ again; then $P_{ij} = \exp(S_{ij} - m_i)/\ell_i$ row by row, because $m_i$ and $\ell_i$ are exactly the maximum and the normaliser of row $i$ over *all* keys. No second pass over the row is needed.
:::
:::

::: exercise The roofline of generation {level=3}
During generation, one new query of dimension $d_k = 128$ attends to a cache of $T$ keys and values per head, stored in bfloat16. Show that the arithmetic intensity of this attention is about $1$ FLOP per byte, independent of $T$. On an H100, what fraction of peak arithmetic can it reach? What does that imply about the most effective ways to speed up generation?
::: solution
FLOPs: $2Td_k$ for the scores and $2Td_k$ for the weighted values, $4Td_k$. Bytes: the cache, $2Td_k$ numbers of two bytes, $4Td_k$ bytes (the query and output are negligible). Intensity $4Td_k/4Td_k = 1$. The attainable throughput is $3.35\times10^{12}\cdot1$ FLOP/s, about $0.3\%$ of the $989$ TFLOP/s peak. Generation is therefore limited by how many bytes of cache must be read: shrinking the cache (fewer key–value heads, quantised caches) or reading it for many requests at once (batching) helps, while faster arithmetic does not.
:::
:::

::: exercise Tiles of queries too {level=3}
The `tiled_attention` function of [[#sec-flash]] tiles only the keys and values and keeps statistics for all $T$ queries at once. Modify it to loop over blocks of queries as well (an outer loop over query blocks, an inner loop over key blocks), add a causal mask, and skip key blocks that lie entirely in the future of a query block. Check the result against `attention` with a causal mask.
::: solution
```python
import numpy as np

def causal_attention(Q, K, V):
    T = Q.shape[0]
    S = Q @ K.T / np.sqrt(Q.shape[1]) + np.triu(np.full((T, T), -np.inf), 1)
    P = np.exp(S - S.max(1, keepdims=True))
    return (P / P.sum(1, keepdims=True)) @ V

def flash_causal(Q, K, V, bq=3, bk=4):
    T, d = Q.shape
    O = np.zeros((T, V.shape[1]))
    for i in range(0, T, bq):                              # query block i .. i+bq-1
        q = Q[i:i+bq]; rows = np.arange(i, min(i + bq, T))
        o = np.zeros((len(rows), V.shape[1])); m = np.full(len(rows), -np.inf); l = np.zeros(len(rows))
        for j in range(0, rows[-1] + 1, bk):               # skip key blocks entirely in the future
            cols = np.arange(j, min(j + bk, T))
            S = q @ K[cols].T / np.sqrt(d)
            S = np.where(cols[None, :] > rows[:, None], -np.inf, S)   # causal mask inside the tile
            m_new = np.maximum(m, S.max(1)); P = np.exp(S - m_new[:, None]); scale = np.exp(m - m_new)
            l = l * scale + P.sum(1); o = o * scale[:, None] + P @ V[cols]; m = m_new
        O[i:i+bq] = o / l[:, None]
    return O

rng = np.random.default_rng(1)
Q, K, V = (rng.standard_normal((11, 8)) for _ in range(3))
print(np.allclose(flash_causal(Q, K, V), causal_attention(Q, K, V)))   # True
```

The inner loop stops at the key block containing the last query of the block, which skips the tiles above the diagonal; inside a tile that straddles the diagonal the mask sets future scores to $-\infty$. Every row has at least its own key unmasked, so no row is ever empty.
:::
:::
