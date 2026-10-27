Before a large training run is launched, a few lines of arithmetic decide whether it is possible at all. How many floating-point operations will it take? How much memory does each device need for weights, gradients, optimiser state and activations? How long will it run on the hardware available, and what will it cost? None of these needs a profiler or a single line of model code; they follow from the shape of the network — number of layers, width, heads, vocabulary, sequence length — and a small number of exact counting rules. This chapter derives those rules from first principles and assembles them into a calculator.

The two headline results — training costs about $6ND$ FLOPs, and mixed-precision Adam needs about $16$ bytes per parameter — are introduced briefly in [[pretraining/training-loop]] and [[neural-networks/training-practice]]. Here we derive them in full, layer by layer, including the terms the headline formulas leave out: attention's dependence on sequence length, the output layer, recomputation, and the memory of activations, which for long sequences can dwarf everything else. The chapters that follow use these counts constantly: [[scaling/accelerators]] asks how fast the FLOPs can be executed, and [[scaling/data-parallelism]] and [[scaling/model-parallelism]] ask how to divide the memory across devices.

## Counting rules {#sec-rules}

Everything in this chapter rests on one rule for matrix products.

::: proposition FLOPs of a matrix product {#prop-matmul}
Multiplying an $m\times k$ matrix by a $k\times n$ matrix takes $mn$ dot products of length $k$, each with $k$ multiplications and $k - 1$ additions. Counting a multiply–add as two FLOPs, the product costs

$$
2mkn\ \text{FLOPs}.
$$ {#eq-matmul}
:::

::: proof
Each of the $mn$ entries of the result is $\sum_{j=1}^{k}a_{ij}b_{jl}$, which needs $k$ products and $k - 1$ sums, $2k - 1$ FLOPs. The total is $mn(2k - 1)$, which is $2mkn$ up to the lower-order term $mn$ — the convention throughout the literature, and exact for hardware that performs fused multiply–adds into an accumulator initialised to zero.
:::

A linear layer applied to $n$ tokens multiplies an $n\times d_{\text{in}}$ activation matrix by a $d_{\text{in}}\times d_{\text{out}}$ weight matrix: $2nd_{\text{in}}d_{\text{out}}$ FLOPs, or **two FLOPs per weight per token**. Element-wise operations — activation functions, residual additions, normalisation — cost $O(d)$ per token, and with $d$ in the thousands they are a negligible share of the FLOPs (though not, as [[scaling/accelerators]] shows, of the time).

The backward pass is counted by the same rule.

::: proposition The backward pass costs twice the forward {#prop-backward}
For a linear layer $Y = XW$ with $X\in\R^{n\times d_{\text{in}}}$ and $W\in\R^{d_{\text{in}}\times d_{\text{out}}}$, the backward pass computes $\bar X = \bar YW\T$ and $\bar W = X\T\bar Y$ from the upstream gradient $\bar Y\in\R^{n\times d_{\text{out}}}$. Each costs $2nd_{\text{in}}d_{\text{out}}$ FLOPs, so the backward pass costs twice the forward pass and a training step three times.
:::

::: proof
By [[#eq-matmul]], $\bar YW\T$ is $(n\times d_{\text{out}})\cdot(d_{\text{out}}\times d_{\text{in}})$, costing $2nd_{\text{out}}d_{\text{in}}$, and $X\T\bar Y$ is $(d_{\text{in}}\times n)\cdot(n\times d_{\text{out}})$, costing $2d_{\text{in}}nd_{\text{out}}$. The forward product $XW$ costs the same. The matrix products inside attention, such as $S = QK\T$, obey the same pattern: their backward pass needs $\bar Q = \bar SK$ and $\bar K = \bar S\T Q$, two products of the forward's size. Element-wise operations have backward costs of the same order as their forward costs and remain negligible.
:::

## Parameters of a Transformer {#sec-params}

Take a decoder-only Transformer with $L$ blocks of width $d$, $a$ query heads of dimension $d_h = d/a$, $a_{kv}$ key–value heads (equal to $a$ for standard multi-head attention, smaller for grouped-query attention), a feed-forward width $d_{\text{ff}}$, and a vocabulary of $V$ tokens. The block structure is that of [[transformers/transformer-block]].

::: proposition Parameter count {#prop-params}
Ignoring biases, a block has

$$
\underbrace{2d^2 + 2d\,a_{kv}d_h}_{\text{attention: } W_Q, W_O, W_K, W_V} + \underbrace{c\,d\,d_{\text{ff}}}_{\text{feed-forward}} + \underbrace{2d}_{\text{norms}}
$$

parameters, where $c = 2$ for a two-matrix feed-forward network and $c = 3$ for a gated one such as SwiGLU. The model adds $Vd$ for the token embedding, another $Vd$ for the output layer unless they are tied, and $d$ for the final norm. With $a_{kv} = a$ and $c\,d_{\text{ff}} = 8d$ the block has $12d^2 + 2d$ parameters, so $N\approx12Ld^2$ for large models.
:::

::: proof
$W_Q$ and $W_O$ are $d\times d$ (queries for all $a$ heads, and the output projection from $a\,d_h = d$ back to $d$). $W_K$ and $W_V$ each map $d$ to $a_{kv}d_h$. The feed-forward network has $c$ matrices of $d\,d_{\text{ff}}$ entries. Two RMSNorm gain vectors (or LayerNorm gains; LayerNorm biases would add $2d$ more) have $d$ entries each. With $a_{kv}d_h = d$ attention contributes $4d^2$, and $c\,d_{\text{ff}} = 8d$ gives $8d^2$ for the feed-forward network: $12d^2$ in total.
:::

::: example Counting Llama-2-7B exactly {#ex-llama-params}
The 7-billion-parameter Llama 2 model (Touvron et al., 2023) has $L = 32$, $d = 4096$, $a = a_{kv} = 32$, SwiGLU with $d_{\text{ff}} = 11{,}008$, $V = 32{,}000$, untied embeddings and RMSNorm. Count its parameters.
::: solution
Attention: $4\cdot4096^2 = 67{,}108{,}864$. Feed-forward: $3\cdot4096\cdot11{,}008 = 135{,}266{,}304$. Norms: $8192$. Per block: $202{,}383{,}360$; for $32$ blocks, $6{,}476{,}267{,}520$. Embeddings: $2\cdot32{,}000\cdot4096 = 262{,}144{,}000$. Final norm: $4096$. Total: $6{,}738{,}415{,}616$ — the published "6.7B". The $12Ld^2$ approximation gives $6.44$ billion; the difference is the embeddings and the slightly larger feed-forward ($3\cdot11{,}008 = 33{,}024 > 8\cdot4096 = 32{,}768$).
:::
:::

## FLOPs of a training step {#sec-flops}

Now count the forward pass of one block over a sequence of $n$ tokens, with $a_{kv} = a$ and $c\,d_{\text{ff}} = 8d$.

::: theorem Forward FLOPs of a Transformer block {#thm-block-flops}
For a sequence of $n$ tokens, the forward pass of one block costs

$$
\underbrace{6nd^2}_{Q,K,V} + \underbrace{2n^2d}_{QK\T} + \underbrace{2n^2d}_{\text{softmax}\cdot V} + \underbrace{2nd^2}_{W_O} + \underbrace{16nd^2}_{\text{feed-forward}} = 24nd^2 + 4n^2d\ \text{FLOPs}
$$ {#eq-block-flops}

if the full $n\times n$ score matrix is computed, plus $O(nd + an^2)$ for element-wise operations. Exploiting the causal mask halves the attention term to $2n^2d$ on average. The output layer adds $2ndV$ FLOPs per sequence.
:::

::: proof
The projections multiply the $n\times d$ input by three $d\times d$ matrices, $3\cdot2nd^2$ by [[#eq-matmul]]. For each head, $Q_iK_i\T$ is an $(n\times d_h)(d_h\times n)$ product costing $2n^2d_h$, and the weighted sum $P_iV_i$ an $(n\times n)(n\times d_h)$ product costing $2n^2d_h$; summing over $a$ heads, with $ad_h = d$, gives $2n^2d$ each. The output projection costs $2nd^2$. The feed-forward matrices hold $8d^2$ weights, costing $2\cdot8d^2 = 16d^2$ per token. With a causal mask, query $t$ needs only $t$ keys, so a kernel that skips the masked half does $\sum_{t=1}^{n}t\approx n^2/2$ dot products instead of $n^2$, halving both attention products. The softmax, scaling, norms, activation and residual additions cost a constant number of FLOPs per entry of $n\times d$ or $a\times n\times n$ arrays. The output layer multiplies $n\times d$ by $d\times V$.
:::

Multiplying by three for the backward pass ([[#prop-backward]]) and summing over $L$ blocks and the output layer gives the training cost of a step with $B$ sequences:

$$
C_{\text{step}} = 3\big(L(24Bnd^2 + 4Bn^2d) + 2BndV\big) = 72BnLd^2\left(1 + \frac{n}{6d} + \frac{V}{12Ld}\right).
$$ {#eq-step-flops}

This is the form given by Narayanan et al. (2021) for Megatron-LM. Since $12Ld^2\approx N$, the leading term $72BnLd^2 = 6N\cdot Bn$: **six FLOPs per parameter per token**, the $6ND$ rule. The two corrections are the attention term, of relative size $n/(6d)$ with full score matrices ($n/(12d)$ with causal skipping — the form used in [[pretraining/training-loop]]), and the output layer, $V/(12Ld)$.

::: example Corrections for GPT-3 {#ex-gpt3-flops}
GPT-3 175B (Brown et al., 2020) has $L = 96$, $d = 12{,}288$, $n = 2048$ and $V = 50{,}257$. How large are the two corrections in [[#eq-step-flops]], and what is the training cost per sequence?
::: solution
$n/(6d) = 2048/73{,}728 = 0.028$ and $V/(12Ld) = 50{,}257/14{,}155{,}776 = 0.0036$. The step costs $72\cdot2048\cdot96\cdot12{,}288^2\cdot1.031 = 2.20\times10^{15}$ FLOPs per sequence, about $1.08\times10^{12}$ per token, against $6N = 1.05\times10^{12}$. At GPT-3's context, the $6ND$ rule is accurate to $3\%$; at a context of $32{,}768$ tokens the attention correction would be $44\%$ for the same model.
:::
:::

::: definition Activation recomputation {#def-recompute}
**Activation recomputation** (or gradient checkpointing; Chen et al., 2016) stores only some intermediate tensors in the forward pass and recomputes the others during the backward pass from the stored ones. **Full** recomputation stores only each block's input and repeats the block's whole forward pass in the backward pass; **selective** recomputation (Korthikanti et al., 2022) repeats only chosen operations whose outputs are large but cheap to compute.
:::

Full recomputation adds one forward pass, so a step costs $4\times$ the forward instead of $3\times$: the hardware executes about $8ND$ FLOPs while the model needs $6ND$. The factor $96$ in place of $72$ in Megatron-LM's formula for recomputed runs is this $4/3$. Because model FLOPs utilisation counts only the $6ND$ ([[scaling/large-runs]]), recomputation always lowers it; the question is whether the memory saved enables a configuration that more than repays the cost.

## Memory for training state {#sec-state}

Training memory divides into **model state** — quantities whose size is proportional to $N$ — and **activations**, whose size is proportional to the batch and sequence length. Model state is counted per parameter.

::: proposition Bytes per parameter of mixed-precision Adam {#prop-bytes}
With 16-bit (bf16 or fp16) weights and gradients and an fp32 master copy and fp32 Adam moments, each parameter needs

$$
\underbrace{2}_{\text{weights}} + \underbrace{2}_{\text{gradients}} + \underbrace{4 + 4 + 4}_{\text{master, } m, v} = 16\ \text{bytes}.
$$

Common variants: keeping gradients in fp32 (for accumulation) gives $18$; dropping the separate 16-bit copy and casting on the fly from the master gives $14$; pure bf16 training with bf16 moments and no master copy gives $8$; storing Adam's moments in $8$ bits (Dettmers et al., 2022) saves $6$ bytes.
:::

::: proof
Each item stores one number per parameter at the stated width: $2$ bytes for 16-bit, $4$ for fp32. Mixed-precision training keeps the fp32 master so that small updates are not lost to rounding ([[scaling/mixed-precision]]), and Adam's first and second moments $m, v$ are one number each. The variants change the width or presence of individual items: an fp32 gradient adds $2$; removing the 16-bit working copy subtracts $2$; bf16 moments and no master leave $2 + 2 + 2 + 2 = 8$; two 1-byte moments instead of two 4-byte ones save $6$.
:::

A $70$-billion-parameter model therefore needs $1.12$ TB of model state with the standard recipe — about fourteen accelerators' worth of memory at $80$ GB each, before a single activation is stored. This number drives the sharding of [[scaling/data-parallelism]]. Temporary buffers (communication buckets, fused-kernel workspaces) and memory fragmentation typically add a further $10$–$20\%$ in practice.

## Memory for activations {#sec-activations}

The backward pass of each layer needs inputs saved during the forward pass: to compute $\bar W = X\T\bar Y$ one needs $X$. How much is saved depends on the implementation; Korthikanti et al. (2022) gave an exact accounting for the Megatron-LM implementation of a GPT-style block (two-matrix GeLU feed-forward network with $d_{\text{ff}} = 4d$, dropout, LayerNorm), with 16-bit activations and 1-byte dropout masks.

::: theorem Activation memory per block {#thm-activations}
For micro-batch $b$, sequence length $s$, width $h$ and $a$ heads, a Transformer block stores, with no recomputation and no parallelism,

$$
M_{\text{act}} = sbh\left(34 + \frac{5as}{h}\right)\ \text{bytes}.
$$ {#eq-act}

With tensor parallelism of degree $t$ combined with sequence parallelism, every term is divided by $t$. With selective recomputation of the attention-score operations, the second term vanishes: $34sbh/t$. With full recomputation only the block input is kept: $2sbh$.
:::

::: proof
Count the tensors that the backward pass needs, at $2$ bytes per 16-bit element and $1$ byte per mask element.

*Attention.* The input to the $Q, K, V$ projections: $2sbh$. $Q$ and $K$, needed for the backward of $QK\T$: $4sbh$. The softmax output, needed for its own backward: $2as^2b$. The dropout mask on the attention probabilities: $as^2b$. The dropout output and $V$, needed for the backward of the weighted sum: $2as^2b + 2sbh$. The input to the output projection: $2sbh$. The dropout mask after it: $sbh$. Total: $11sbh + 5as^2b$.

*Feed-forward.* The input to the first matrix: $2sbh$. The input to the GeLU, of width $4h$: $8sbh$. The GeLU output, input to the second matrix: $8sbh$. Its dropout mask: $sbh$. Total: $19sbh$.

*Norms.* Each of the two LayerNorms stores its input: $4sbh$.

The sum is $34sbh + 5as^2b = sbh(34 + 5as/h)$. With tensor parallelism of degree $t$, the attention and feed-forward tensors are split across devices (by heads and by the feed-forward width); sequence parallelism splits the remaining tensors — norm inputs and dropout masks, which tensor parallelism alone replicates — along the sequence, so everything is divided by $t$. Selective recomputation discards the softmax output, its dropout mask and the dropout output — the $5as^2b$ terms, quadratic in $s$ but cheap to recompute — and regenerates them in the backward pass. Full recomputation keeps only the $2sbh$ bytes of the block input.
:::

Modern implementations change the constants but not the structure. Most large language models no longer use dropout in pretraining, which removes the masks; gated feed-forward networks change the $19sbh$; and fused attention kernels such as FlashAttention ([[transformers/attention-complexity]]) never store the $s\times s$ score matrix, recomputing it block by block in the backward pass, which removes the $5as/h$ term by construction. The lesson of [[#thm-activations]] that survives every variant: **activations grow linearly with micro-batch and sequence length, and quadratically with sequence length if score matrices are kept.**

::: example Activations of GPT-3 {#ex-gpt3-act}
For GPT-3 175B ($L = 96$, $h = 12{,}288$, $a = 96$, $s = 2048$) with micro-batch $b = 1$, compute the activation memory of the whole model with no recomputation, with tensor and sequence parallelism over $t = 8$ devices and selective recomputation, and with full recomputation.
::: solution
$5as/h = 5\cdot96\cdot2048/12{,}288 = 80$ — the attention-score terms are more than twice the rest. Per block: $2048\cdot12{,}288\cdot114 = 2.87$ GB; for $96$ blocks, $275$ GB. With $t = 8$ and selective recomputation: $96\cdot34\cdot2048\cdot12{,}288/8 = 10.3$ GB per device. Full recomputation: $96\cdot2\cdot2048\cdot12{,}288 = 4.8$ GB on one device (less with parallelism), at the price of one extra forward pass. Korthikanti et al. found selective recomputation with sequence parallelism recovered most of the memory saving of full recomputation at a compute overhead of a few per cent rather than about a third.
:::
:::

::: widget plot
f: x*1*4096*(34 + 5*32*x/4096)*32/1e9; x*1*4096*34*32/1e9; x*1*4096*2*32/1e9
x: 0, 32768
y: 0, 400
labels: no recomputation; selective recomputation; full recomputation
caption: Activation memory in GB from [[#thm-activations]] for a $32$-layer model of width $h = 4096$ with $32$ heads and micro-batch $1$, against sequence length $s$ (no parallelism). Storing score matrices makes the memory quadratic in $s$ — over $350$ GB at $32{,}768$ tokens — while selective recomputation leaves it linear. Full recomputation stores only block inputs; at this scale it is a few GB even for long sequences.
:::

::: warning Fitting the weights is not fitting the training run
A common mistake is to check that the parameters fit in memory and stop there. Training needs gradients and optimiser state as well — eight times the memory of the bf16 weights under [[#prop-bytes]] — and activations that, for long sequences, can exceed all of that combined. A $7$-billion-parameter model whose weights take $13.5$ GB in bf16 needs about $108$ GB of model state for Adam and, at $4096$ tokens per sequence without recomputation, of the order of $100$ GB of activations per sequence. Conversely, inference needs no gradients or optimiser state, but needs a KV cache.
:::

## The KV cache {#sec-kv-cache}

At inference, an autoregressive model generates one token at a time. Recomputing the keys and values of all previous tokens at every step would cost $O(n^2)$ work per sequence for the projections alone, so they are cached ([[transformers/efficient-attention]]).

::: proposition KV-cache size {#prop-kv}
A model with $L$ layers and $a_{kv}$ key–value heads of dimension $d_h$, storing keys and values at $p$ bytes per element, needs

$$
M_{\text{KV}} = 2\cdot L\cdot a_{kv}\cdot d_h\cdot p\ \text{bytes per token},
$$ {#eq-kv}

and $M_{\text{KV}}\cdot T\cdot B$ for a batch of $B$ sequences of $T$ tokens.
:::

::: proof
Each layer stores, for each token, one key and one value vector per key–value head, each of $d_h$ elements of $p$ bytes: $2a_{kv}d_hp$ per layer per token, and $L$ layers.
:::

::: example KV cache of a 70-billion-parameter model {#ex-kv}
Llama-2-70B has $L = 80$ layers, $64$ query heads and $a_{kv} = 8$ key–value heads (grouped-query attention) of dimension $d_h = 128$. In bf16, how much memory does the KV cache take per token, and for $16$ sequences of $4096$ tokens? What would it be with standard multi-head attention?
::: solution
$2\cdot80\cdot8\cdot128\cdot2 = 327{,}680$ bytes $= 0.3125$ MiB per token. For $16\cdot4096 = 65{,}536$ tokens: $21.5$ GB. With $a_{kv} = 64$ it would be eight times larger, $172$ GB — more than the $138$ GB of bf16 weights. Grouped-query attention was adopted largely to keep this number manageable.
:::
:::

::: widget plot
f: 2*80*g*128*2*x*b/1e9; 138
x: 0, 131072
y: 0, 400
sliders: g=8:1:64:1; b=4:1:32:1
labels: KV cache (GB); bf16 weights of a $70$B model
caption: KV-cache memory from [[#eq-kv]] for a model shaped like Llama-2-70B ($80$ layers, $d_h = 128$, bf16) against context length, with $g$ key–value heads and a batch of $b$ sequences. With multi-head attention ($g = 64$) a few long sequences need more memory than the weights; with $g = 8$ the cache grows eight times more slowly. Serving systems size their batches by this curve.
:::

Decoding one token at context position $t$ costs $2N$ FLOPs for the weight multiplications plus about $4Ltd$ for attention against the cache (with $d = ad_h$), but must *read* all the weights and the whole cache from memory — which is why decoding is limited by memory bandwidth rather than arithmetic, as [[scaling/accelerators]] explains.

## A calculator {#sec-calculator}

The function below collects the chapter's formulas. It counts parameters exactly as in [[#prop-params]], training FLOPs per token as three times the forward pass of [[#thm-block-flops]] (without causal skipping), model state at $16$ bytes per parameter, activations by [[#thm-activations]] — whose constants assume a GeLU feed-forward network of width $4h$, so for a SwiGLU model they are an approximation — and the KV cache by [[#eq-kv]].

```python
def transformer_budget(L, d, heads, kv_heads, d_ff, vocab, seq, micro_batch,
                       swiglu=True, tied=False, tp=1, recompute="none"):
    """Parameters, FLOPs and memory (bytes) of a decoder-only Transformer."""
    dh = d // heads
    attn = 2 * d * d + 2 * d * kv_heads * dh           # W_Q, W_O and the smaller W_K, W_V
    ffn = (3 if swiglu else 2) * d * d_ff              # gate, up, down (or up, down)
    block = attn + ffn + 2 * d                          # + two RMSNorm gains
    emb = vocab * d * (1 if tied else 2)
    N = L * block + emb + d                             # + final norm
    # forward FLOPs per token: 2 per weight in the blocks and the output layer,
    # plus 4*seq*d per layer for scores and the weighted sum (no causal saving)
    fwd = 2 * L * (attn + ffn) + 2 * vocab * d + 4 * L * seq * d
    s, b, h, a = seq, micro_batch, d, heads
    if recompute == "none":                            # Korthikanti et al. (2022), 16-bit
        act = L * s * b * h * (34 + 5 * a * s / h) / tp
    elif recompute == "selective":                     # attention scores recomputed
        act = L * s * b * h * 34 / tp
    else:                                              # full: keep each block's input
        act = L * 2 * s * b * h
    kv_per_token = 2 * L * kv_heads * dh * 2           # K and V, 2 bytes each
    return dict(params=N, train_flops_per_token=3 * fwd, state=16 * N,
                activations=act, kv_per_token=kv_per_token)

GB = 1e9
cfg = dict(L=32, d=4096, heads=32, kv_heads=32, d_ff=11008, vocab=32000)  # Llama-2-7B shape
r = transformer_budget(**cfg, seq=4096, micro_batch=1)
print(f"parameters            {r['params']:,}")
print(f"train FLOPs / token   {r['train_flops_per_token']:.3e}  (6N = {6 * r['params']:.3e})")
print(f"weights+grads+Adam    {r['state'] / GB:.1f} GB")
for mode in ("none", "selective", "full"):
    a = transformer_budget(**cfg, seq=4096, micro_batch=1, recompute=mode)["activations"]
    print(f"activations ({mode:9s}) {a / GB:6.1f} GB  per sequence of 4096 tokens")
print(f"KV cache              {r['kv_per_token'] / 2**20:.3f} MiB per token")

big = transformer_budget(L=80, d=8192, heads=64, kv_heads=8, d_ff=28672, vocab=32000,
                         seq=4096, micro_batch=1)                          # Llama-2-70B shape
print(f"70B shape: params {big['params'] / 1e9:.2f} B, KV {big['kv_per_token'] / 2**20:.3f} MiB/token,"
      f" 16 sequences x 4096 tokens: {16 * 4096 * big['kv_per_token'] / GB:.1f} GB")
```

```text
parameters            6,738,415,616
train FLOPs / token   4.608e+10  (6N = 4.043e+10)
weights+grads+Adam    107.8 GB
activations (none     )  104.2 GB  per sequence of 4096 tokens
activations (selective)   18.3 GB  per sequence of 4096 tokens
activations (full     )    1.1 GB  per sequence of 4096 tokens
KV cache              0.500 MiB per token
70B shape: params 68.98 B, KV 0.312 MiB/token, 16 sequences x 4096 tokens: 21.5 GB
```

The parameter count reproduces [[#ex-llama-params]]. At a context of $4096$ tokens, the attention term adds $6.4\times10^9$ FLOPs per token, $16\%$ of $6N$ ($8\%$ with causal skipping); the total is only $14\%$ above $6N$ because the input embedding, counted in $N$, is a look-up that costs no FLOPs. Without recomputation one sequence's activations are as large as the whole model state, which is why recomputation, fused attention and tensor or sequence parallelism are standard. The $70$B line reproduces [[#ex-kv]].

## Time and cost {#sec-time}

With the FLOP count in hand, training time follows from the throughput actually achieved.

::: proposition Wall-clock time and accelerator-hours {#prop-time}
A run of $C$ FLOPs on $n$ accelerators of peak throughput $F$ FLOP/s, at model FLOPs utilisation $U$, takes $t = C/(nFU)$ seconds and $nt/3600 = C/(3600FU)$ accelerator-hours. The accelerator-hours do not depend on $n$.
:::

::: proof
The cluster performs $nFU$ useful FLOPs per second, so it needs $C/(nFU)$ seconds; multiplying by $n$ and dividing by $3600$ gives accelerator-hours, in which $n$ cancels.
:::

The independence of $n$ is the reason to quote cost in accelerator-hours: adding devices shortens the run but, at constant utilisation, does not change its cost. In practice utilisation falls slowly as devices are added because communication grows ([[scaling/large-runs]]), so the cost rises somewhat with $n$.

::: example Checking a published figure {#ex-gpu-hours}
The Llama 2 paper (2023) reported $1{,}720{,}320$ GPU-hours to pretrain the $70$-billion-parameter model on $2$ trillion tokens, on NVIDIA A100 GPUs, whose dense bf16 peak NVIDIA lists as $312$ TFLOP/s. What MFU does this imply?
::: solution
$C = 6\cdot6.898\times10^{10}\cdot2\times10^{12} = 8.28\times10^{23}$ FLOPs. Peak FLOPs available: $1{,}720{,}320\cdot3600\cdot3.12\times10^{14} = 1.93\times10^{24}$. Implied MFU: $8.28/19.3 = 43\%$, within the range typical for large dense runs. (The reported hours include some overheads, so the true utilisation during training was probably slightly higher.) The same calculation for the $7$B model's $184{,}320$ GPU-hours gives $39\%$.
:::
:::

A monetary cost is accelerator-hours times a price per hour, which depends on hardware generation, contract and provider and changes quickly; any figure should be stated with its date and source. The energy used is accelerator-hours times average power per device plus the overhead of cooling and networking, discussed in [[llm-society/environmental-cost]].

::: quiz
A team doubles the sequence length of its training runs from $4096$ to $8192$ tokens, keeping tokens per batch fixed (halving the number of sequences). Which quantities change?
- [x] The attention part of the FLOPs per token roughly doubles.
- [ ] The model state (weights, gradients, optimiser) doubles.
- [x] Without fused attention or recomputation, the activation memory of the score matrices per micro-batch of one sequence quadruples.
- [ ] The $6N$ part of the FLOPs per token doubles.
::: solution
The attention term is $4nd$ FLOPs per token per layer, proportional to $n$. Model state depends only on $N$. The score terms $5as^2b$ are quadratic in $s$: doubling $s$ at $b = 1$ quadruples them (the linear terms double). The weight multiplications cost $6N$ per token regardless of sequence length.
:::
:::

::: history
Counting FLOPs to estimate the cost of neural networks is old practice; for Transformers, Kaplan et al. (2020) tabulated parameters and FLOPs per layer and popularised $C\approx6ND$, and Narayanan et al. (2021) gave the exact Megatron-LM formula with the attention and output-layer corrections. Chen, Xu, Zhang and Guestrin (2016) introduced gradient checkpointing for deep networks, with the result that a network of $L$ layers can be trained in $O(\sqrt L)$ memory at the cost of one extra forward pass, building on earlier checkpointing ideas from automatic differentiation (Griewank, 1992). Rajbhandari et al. (2020) laid out the $16$-bytes-per-parameter accounting of mixed-precision Adam in the ZeRO paper. Korthikanti et al. (2022) derived the activation memory of Transformer layers and introduced selective recomputation and sequence parallelism. The KV cache dates from the first autoregressive Transformer implementations; multi-query attention (Shazeer, 2019) and grouped-query attention (Ainslie et al., 2023) were introduced largely to shrink it.
:::

::: summary
- A product of $m\times k$ and $k\times n$ matrices costs $2mkn$ FLOPs; a linear layer costs $2$ FLOPs per weight per token forward and $4$ backward.
- A block has $2d^2 + 2da_{kv}d_h + c\,d\,d_{\text{ff}}$ weights, $12d^2$ in the standard shape, so $N\approx12Ld^2$ plus embeddings.
- The forward pass of a block costs $24nd^2 + 4n^2d$ FLOPs per sequence; a training step costs $72BnLd^2(1 + n/(6d) + V/(12Ld))$ — **$6ND$** plus attention and output-layer corrections. Full recomputation raises executed FLOPs to about $8ND$.
- Mixed-precision Adam needs **16 bytes per parameter** ($2 + 2 + 12$); variants range from $8$ to $18$.
- Activations take $sbh(34 + 5as/h)$ bytes per block in the Megatron accounting; tensor and sequence parallelism divide by $t$, selective recomputation removes the quadratic term, full recomputation leaves $2sbh$.
- The **KV cache** takes $2La_{kv}d_hp$ bytes per token; grouped-query attention shrinks it by $a/a_{kv}$.
- Training time is $C/(nFU)$; accelerator-hours $C/(3600FU)$ do not depend on the number of devices.
:::

## Exercises

::: exercise A matrix product {level=1 check="1.37e11"}
How many FLOPs does it take to multiply a $4096\times4096$ matrix by a $4096\times4096$ matrix? Give three significant figures.
::: solution
$2\cdot4096^3 = 1.37\times10^{11}$ FLOPs.
:::
:::

::: exercise Parameters of a block {level=1 check="201326592"}
A block has width $d = 4096$, standard multi-head attention and a feed-forward network with $d_{\text{ff}} = 4d$ and two matrices. Ignoring norms and biases, how many parameters does it have?
::: solution
$12d^2 = 12\cdot16{,}777{,}216 = 201{,}326{,}592$.
:::
:::

::: exercise Bytes per parameter {level=1 check="840"}
How many gigabytes of model state does a $70$-billion-parameter model need with fp32 master weights and fp32 Adam moments only (no 16-bit copies)?
::: solution
$12$ bytes per parameter: $12\cdot7\times10^{10} = 8.4\times10^{11}$ bytes $= 840$ GB — the size of a checkpoint that allows exact resumption.
:::
:::

::: exercise The attention correction {level=2 check="2048"}
For a model of width $d = 4096$ using full (non-causal) score computation, at what sequence length does the attention term of [[#eq-step-flops]] add $8.33\%$ to the FLOPs, that is $n/(6d) = 1/12$?
::: solution
$n = 6d/12 = d/2 = 2048$ tokens.
:::
:::

::: exercise KV cache with grouped-query attention {level=2 check="0.125"}
A model has $32$ layers and $8$ key–value heads of dimension $128$, with keys and values stored in bf16. How many MiB ($2^{20}$ bytes) does its KV cache take per token? Give three decimal places.
::: solution
$2\cdot32\cdot8\cdot128\cdot2 = 131{,}072$ bytes $= 0.125$ MiB per token. A context of $128$K tokens then takes $16$ GiB per sequence.
:::
:::

::: exercise Activations with parallelism {level=2 check="10.27"}
Verify the per-device activation memory of [[#ex-gpt3-act]] with $t = 8$ and selective recomputation, in GB to two decimal places.
::: solution
$96\cdot34\cdot2048\cdot12{,}288/8 = 1.0268\times10^{10}$ bytes $= 10.27$ GB.
:::
:::

::: exercise Accelerator-hours {level=2 check="1.6e6"}
A run of $2.304\times10^{24}$ FLOPs is planned on accelerators with a peak of $10^{15}$ FLOP/s at an expected MFU of $40\%$. How many accelerator-hours will it take? On $4096$ devices, how many days?
::: solution
Each accelerator-hour delivers $3600\cdot10^{15}\cdot0.4 = 1.44\times10^{18}$ useful FLOPs, so the run takes $2.304\times10^{24}/1.44\times10^{18} = 1.6\times10^6$ accelerator-hours. On $4096$ devices that is $1.6\times10^6/4096 = 391$ hours, about $16.3$ days.
:::
:::

::: exercise Recomputation cost {level=2}
Show that full recomputation raises the FLOPs executed per step by a factor $4/3$ and explain why Megatron-LM's formula changes from $72$ to $96$. Why does selective recomputation of attention scores cost much less?
::: solution
Without recomputation, forward plus backward costs $1 + 2 = 3$ forward passes. Full recomputation adds one forward pass during the backward pass: $4$, a factor $4/3$; $72\cdot4/3 = 96$. Selective recomputation repeats only the softmax, dropout and weighted-sum inputs — operations costing $O(as^2)$ element-wise work plus, for the weighted sum, a product of $2s^2d$ FLOPs per sequence per layer — rather than the $24sd^2$ of the projections and feed-forward network; for $s\ll6d$ that is a few per cent of the step.
:::
:::

::: exercise Memory planning {level=3}
A $13$-billion-parameter model ($L = 40$, $h = 5120$, $a = 40$) is to be trained with sequences of $4096$ tokens on accelerators with $80$ GB of memory each. Using [[#prop-bytes]] and [[#thm-activations]], decide whether it can be trained (a) on a single device with micro-batch $1$ and full recomputation, (b) with tensor and sequence parallelism over $t = 8$ devices, selective recomputation and micro-batch $1$, ignoring sharding of model state beyond what tensor parallelism provides. What does this suggest about the role of the sharding schemes of the next chapters?
::: solution
(a) Model state: $16\cdot1.3\times10^{10} = 208$ GB — already more than $80$ GB, so no. Activations with full recomputation would be only $40\cdot2\cdot4096\cdot5120 = 1.7$ GB. (b) Tensor parallelism divides the weights, gradients and optimiser state of the blocks by $8$: $208/8 = 26$ GB. Activations: $40\cdot34\cdot4096\cdot5120/8 = 3.6$ GB. Total about $30$ GB, which fits with room for buffers. The single device fails not because of activations but because of model state; dividing model state across devices — by tensor parallelism, or by sharding it across data-parallel replicas with ZeRO ([[scaling/data-parallelism]]) — is the essential step.
:::
:::

::: exercise Causal skipping {level=3}
Derive the total number of query–key dot products in a causal attention layer with $n$ tokens, and hence show that a kernel that skips fully masked blocks of size $c\times c$ (with $c$ dividing $n$) performs $\tfrac12n^2(1 + c/n)$ dot products. What fraction of the full $n^2$ does it save for $n = 8192$, $c = 128$?
::: solution
Query $t$ (from $1$ to $n$) attends to keys $1,\dots,t$: $\sum_{t=1}^{n}t = n(n+1)/2$ dot products. With blocks, the $n/c$ block rows each contain blocks $1,\dots,i$ that are not fully masked (block $i$ on the diagonal is partially masked but computed in full): $\sum_{i=1}^{n/c}i = \tfrac12(n/c)(n/c + 1)$ blocks of $c^2$ products each, giving $\tfrac12n^2(1 + c/n)$. For $n = 8192$ and $c = 128$, $1 + c/n = 1.0156$, so the kernel does $50.8\%$ of the full work and saves $49.2\%$.
:::
:::
