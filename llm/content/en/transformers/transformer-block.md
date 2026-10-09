Multi-head attention lets each position gather information from the others, but on its own it is a weak building block: its outputs are averages of values, and stacking averages does not create new features. A Transformer therefore alternates attention with a second kind of layer, a small **feed-forward network** applied to every position separately, and wraps both in **residual connections** and **normalisation** so that dozens of such blocks can be stacked and trained. GPT-2 small has $12$ blocks, LLaMA-7B has $32$, and the largest published models have around a hundred.

This chapter assembles the block piece by piece: the residual stream that runs through the whole network, the two normalisations in use (LayerNorm and RMSNorm), the feed-forward layer and its gated variant SwiGLU, and the bookkeeping that turns a model's shape into its parameter count. By the end you will be able to write a block in a dozen lines of PyTorch and count the parameters of a published model exactly.

## The residual stream {#sec-residual}

Almost every current language model uses the **pre-norm** arrangement: each sub-layer reads a normalised copy of the current representation and *adds* its output back.

::: definition Pre-norm Transformer block {#def-block}
Let $\mathbf{x}\in\R^{T\times d}$ be the representations entering a block. A **pre-norm Transformer block** computes

$$
\begin{aligned}
\mathbf{h} &= \mathbf{x} + \operatorname{MHA}\big(\operatorname{Norm}_1(\mathbf{x})\big),\\
\mathbf{y} &= \mathbf{h} + \operatorname{FFN}\big(\operatorname{Norm}_2(\mathbf{h})\big),
\end{aligned}
$$ {#eq-block}

where $\operatorname{MHA}$ is causal multi-head attention ([[transformers/multi-head-attention]]), $\operatorname{FFN}$ is a feed-forward network applied to each position independently ([[#def-ffn]]), and $\operatorname{Norm}$ is LayerNorm or RMSNorm ([[#sec-norm]]). A model applies $L$ such blocks in sequence to the token embeddings, then a final normalisation, then the output (unembedding) layer.
:::

Unrolling [[#eq-block]] over all layers shows what the network computes. If $\mathbf{x}_0$ is the embedding and each of the $2L$ sub-layers adds its output $\mathbf{u}_k$, then

$$
\mathbf{x}_{\text{final}} = \mathbf{x}_0 + \sum_{k=1}^{2L}\mathbf{u}_k.
$$

The representation is a running sum — the **residual stream** — that every sub-layer reads from (through a normalisation) and writes to. Information placed in the stream by an early layer is still there, unchanged, for every later layer to read, unless some layer actively writes over it. This view, popularised by work on interpretability ([[interpretability/residual-stream]]), is also the key to why deep Transformers can be trained at all.

::: proposition The identity path {#prop-identity}
Let $\mathbf{x}_{\ell+1} = \mathbf{x}_\ell + F_\ell(\mathbf{x}_\ell)$ for $\ell = 0, \dots, L-1$, with differentiable maps $F_\ell$, and let $\mathcal{L}$ be a loss computed from $\mathbf{x}_L$. Then

$$
\frac{\partial\mathbf{x}_L}{\partial\mathbf{x}_\ell} = \prod_{k=\ell}^{L-1}\big(I + J_k\big) = I + \sum_{k=\ell}^{L-1} J_k + (\text{products of two or more } J\text{'s}),
$$

where $J_k$ is the Jacobian of $F_k$ at $\mathbf{x}_k$. In particular the gradient $\partial\mathcal{L}/\partial\mathbf{x}_\ell$ always contains the term $\partial\mathcal{L}/\partial\mathbf{x}_L$ itself, passed back unchanged.
:::

::: proof
By the chain rule $\partial\mathbf{x}_{k+1}/\partial\mathbf{x}_k = I + J_k$, and the Jacobian of the composition from layer $\ell$ to layer $L$ is the product of these factors (taken in order of the layers). Expanding the product, the term in which every factor contributes $I$ is $I$; the terms with exactly one $J_k$ give the sum; the rest contain two or more. Multiplying by $\partial\mathcal{L}/\partial\mathbf{x}_L$ gives the gradient at layer $\ell$, whose first term is $\partial\mathcal{L}/\partial\mathbf{x}_L$.
:::

Without the residual connections the Jacobian would be a product of $L - \ell$ matrices $J_k$, which tends to shrink or explode geometrically with depth — the vanishing and exploding gradients of [[neural-networks/initialisation-normalisation]]. With them, every layer receives the loss gradient directly through the identity term, however deep the network.

The original Transformer placed the normalisation *after* the addition, $\mathbf{x}_{\ell+1} = \operatorname{Norm}(\mathbf{x}_\ell + F_\ell(\mathbf{x}_\ell))$. In this **post-norm** arrangement the stream itself passes through a normalisation at every layer, so the clean identity path of [[#prop-identity]] is lost; such models trained well only with a careful learning-rate warm-up. GPT-2 moved the normalisation to the input of each sub-layer and added one after the last block, and Xiong et al. (2020) showed that pre-norm models have well-behaved gradients at initialisation and can be trained without warm-up. Pre-norm is the standard today. Variants keep appearing: Gemma 2 normalises both the input and the output of each sub-layer, and several recent models also normalise the queries and keys before their dot product ("QK-norm", used at scale in ViT-22B by Dehghani et al., 2023) to stop attention logits from growing during training.

::: quiz
In the pre-norm block of [[#def-block]], what does the first residual connection add to $\mathbf{x}$?
- [x] $\operatorname{MHA}(\operatorname{Norm}(\mathbf{x}))$
- [ ] $\operatorname{Norm}(\mathbf{x} + \operatorname{MHA}(\mathbf{x}))$
- [ ] $\operatorname{MHA}(\mathbf{x})$, with the normalisation applied afterwards to the sum
- [ ] $\operatorname{Norm}(\operatorname{MHA}(\mathbf{x}))$
::: solution
In a pre-norm block the sub-layer reads a normalised copy and its output is added to the un-normalised stream: $\mathbf{x} + \operatorname{MHA}(\operatorname{Norm}(\mathbf{x}))$. The second option is the post-norm block of the original Transformer. The stream itself is never normalised inside the stack — only by the final normalisation before the output layer.
:::
:::

## Normalisation {#sec-norm}

Activations in a deep network drift in scale as training proceeds, and a layer whose inputs change scale must keep readjusting. Normalisation rescales each token's representation to a standard size before a sub-layer reads it.

::: definition Layer normalisation {#def-layernorm}
For a vector $\mathbf{x}\in\R^d$ (the representation of one token) let $\mu = \frac1d\sum_ix_i$ and $\sigma^2 = \frac1d\sum_i(x_i - \mu)^2$. **LayerNorm** with learned gain $\boldsymbol\gamma\in\R^d$ and bias $\boldsymbol\beta\in\R^d$ is

$$
\operatorname{LayerNorm}(\mathbf{x})_i = \gamma_i\,\frac{x_i - \mu}{\sqrt{\sigma^2 + \varepsilon}} + \beta_i,
$$

where $\varepsilon$ is a small constant (such as $10^{-5}$) for numerical safety.
:::

::: definition RMS normalisation {#def-rmsnorm}
**RMSNorm** omits the centring and the bias: with $\operatorname{RMS}(\mathbf{x}) = \sqrt{\frac1d\sum_ix_i^2}$,

$$
\operatorname{RMSNorm}(\mathbf{x})_i = \gamma_i\,\frac{x_i}{\sqrt{\operatorname{RMS}(\mathbf{x})^2 + \varepsilon}}.
$$
:::

Both work on one token at a time, across its $d$ features. RMSNorm (Zhang and Sennrich, 2019) is slightly cheaper and in practice works as well; LLaMA, Mistral and most recent open models use it.

::: example Both normalisations by hand {#ex-norms}
Normalise $\mathbf{x} = (1, 2, 3, 6)$ with LayerNorm and with RMSNorm, taking $\boldsymbol\gamma = \mathbf{1}$, $\boldsymbol\beta = \mathbf{0}$ and $\varepsilon = 0$.
::: solution
LayerNorm: $\mu = 12/4 = 3$ and $\sigma^2 = \big((-2)^2 + (-1)^2 + 0^2 + 3^2\big)/4 = 14/4 = 3.5$, so $\sigma = 1.871$ and

$$
\operatorname{LayerNorm}(\mathbf{x}) = \frac{(-2, -1, 0, 3)}{1.871} = (-1.069,\ -0.535,\ 0,\ 1.604).
$$

The result has mean $0$ and variance $1$. RMSNorm: $\operatorname{RMS}(\mathbf{x}) = \sqrt{(1 + 4 + 9 + 36)/4} = \sqrt{12.5} = 3.536$, so

$$
\operatorname{RMSNorm}(\mathbf{x}) = (0.283,\ 0.566,\ 0.849,\ 1.697).
$$

This has root mean square $1$ but mean $0.849$: RMSNorm fixes the size of the vector without moving its centre.
:::
:::

::: warning LayerNorm is not BatchNorm
Batch normalisation, common in convolutional networks, normalises each feature using statistics computed *across the examples of a batch*. LayerNorm and RMSNorm normalise each token *across its own features* and never look at other tokens or other sequences. That is why they behave identically in training and generation, work with a batch of one, and do not leak information between the sequences of a batch — all essential for language models.
:::

## The feed-forward layer {#sec-ffn}

Attention moves information between positions; the feed-forward network transforms the information at each position. It is the same small two-layer network, applied to every token independently.

::: definition Position-wise feed-forward network {#def-ffn}
With weights $W_1\in\R^{d\times d_{\text{ff}}}$, $W_2\in\R^{d_{\text{ff}}\times d}$, biases $\mathbf{b}_1, \mathbf{b}_2$ and a non-linear activation $\phi$ applied elementwise, the **feed-forward network** maps each token's vector $\mathbf{x}\in\R^d$ to

$$
\operatorname{FFN}(\mathbf{x}) = \phi(\mathbf{x}W_1 + \mathbf{b}_1)\,W_2 + \mathbf{b}_2.
$$

The hidden width is usually $d_{\text{ff}} = 4d$.
:::

The original Transformer used the ReLU activation $\max(0, x)$; GPT and BERT switched to the **GELU**, $\operatorname{GELU}(x) = x\,\Phi(x)$ with $\Phi$ the standard normal distribution function, and many later models use the **SiLU** (or Swish), $\operatorname{SiLU}(x) = x\,\sigma(x) = x/(1 + e^{-x})$. Both are smooth versions of ReLU that let a little negative signal through.

::: widget plot
f: max(0, x); 0.5x(1 + erf(x/sqrt(2))); x/(1 + exp(-x))
x: -4, 4
y: -1, 4
labels: ReLU; GELU $x\,\Phi(x)$; SiLU $x\,\sigma(x)$
caption: Three activation functions. All are close to $0$ for large negative inputs and to $x$ for large positive ones. GELU and SiLU are smooth and dip slightly below zero (to about $-0.17$ and $-0.28$), so negative inputs still pass a small gradient; ReLU has a kink at $0$ and no gradient at all for negative inputs.
:::

The feed-forward network holds most of a model's parameters, and it can be read as a memory. The rows of $W_1$ act as "keys" that detect patterns in the incoming representation, the activation decides how strongly each pattern fired, and the rows of $W_2$ are "values" that are added to the stream in proportion. Geva et al. (2021) found that many such keys respond to recognisable patterns in the input and that the corresponding values promote plausible next tokens — one picture of where factual knowledge is stored.

Most current models use a **gated** feed-forward layer instead.

::: definition SwiGLU feed-forward network {#def-swiglu}
With $W_1, W_3\in\R^{d\times d_{\text{ff}}}$ and $W_2\in\R^{d_{\text{ff}}\times d}$ (and no biases), the **SwiGLU** network is

$$
\operatorname{FFN}_{\text{SwiGLU}}(\mathbf{x}) = \big(\operatorname{SiLU}(\mathbf{x}W_1)\odot\mathbf{x}W_3\big)\,W_2,
$$

where $\odot$ is the elementwise product. The branch $\operatorname{SiLU}(\mathbf{x}W_1)$ acts as a gate that scales each hidden unit of the linear branch $\mathbf{x}W_3$.
:::

::: example A SwiGLU unit by hand {#ex-swiglu}
Take $d = d_{\text{ff}} = 2$, the input $\mathbf{x} = (1, 2)$ and

$$
W_1 = \begin{pmatrix}1&0\\0&-1\end{pmatrix}, \qquad W_3 = \begin{pmatrix}1&1\\1&0\end{pmatrix}, \qquad W_2 = I.
$$

Compute $\operatorname{FFN}_{\text{SwiGLU}}(\mathbf{x})$.
::: solution
The gate branch is $\mathbf{x}W_1 = (1, -2)$ and $\operatorname{SiLU}(1, -2) = (0.731, -0.238)$; the linear branch is $\mathbf{x}W_3 = (3, 1)$. Their elementwise product is $(0.731\cdot3,\ -0.238\cdot1) = (2.193, -0.238)$, and $W_2 = I$ leaves it unchanged. The first hidden unit's gate is open (its pre-activation is positive), so it passes most of its linear signal; the second unit's gate is nearly closed and lets through only a small, sign-flipped fraction. Unlike a ReLU unit, whose output would simply be its activation, a gated unit multiplies a *content* signal by a separately computed *gate*.
:::
:::

Shazeer (2020) compared several such gated variants and found that they lowered the loss of Transformer language models at the same cost; SwiGLU was adopted by PaLM and LLaMA and is now the most common choice. A gated network has three matrices instead of two, so to keep the parameter count unchanged its hidden width is reduced.

::: proposition Matching the parameter count {#prop-swiglu}
A ReLU or GELU feed-forward network with $d_{\text{ff}} = 4d$ and a SwiGLU network with $d_{\text{ff}} = \tfrac83d$ have the same number of weights, $8d^2$.
:::

::: proof
The standard network has $W_1$ and $W_2$, with $2\cdot d\cdot 4d = 8d^2$ weights. The SwiGLU network has three matrices of size $d\times d_{\text{ff}}$, that is $3d\,d_{\text{ff}}$ weights, which equals $8d^2$ exactly when $d_{\text{ff}} = 8d/3$.
:::

In practice $8d/3$ is rounded up to a multiple of a convenient number for the hardware. LLaMA-7B has $d = 4096$, so $8d/3 = 10{,}922.7$, rounded up to $11{,}008 = 43\cdot256$.

::: widget plot
f: heaviside(x); 0.5(1 + erf(x/sqrt(2))) + x exp(-x^2/2)/sqrt(2pi); (1 + exp(-x))^(-1) (1 + x (1 - (1 + exp(-x))^(-1)))
x: -4, 4
y: -0.3, 1.3
labels: ReLU$'$; GELU$'$; SiLU$'$
caption: The derivatives of the three activations. ReLU's derivative is a step: $0$ for every negative input, so a unit that is always negative never learns again (a "dead" ReLU). The derivatives of GELU and SiLU are smooth, are never exactly zero near the origin, and slightly exceed $1$ for moderate positive inputs.
:::

## Counting parameters {#sec-count}

A model's size follows from a few numbers: the width $d$, the number of blocks $L$, the feed-forward width, and the vocabulary size $\lvert\mathcal{V}\rvert$.

::: proposition Parameters of a block {#prop-block-params}
Ignoring biases and normalisation gains, a Transformer block with model width $d$ and a feed-forward network of $8d^2$ weights (either $d_{\text{ff}} = 4d$, or SwiGLU with $d_{\text{ff}} = 8d/3$) has $12d^2$ parameters: $4d^2$ in attention and $8d^2$ in the feed-forward network.
:::

::: proof
Attention has $4d^2$ weights by [[transformers/multi-head-attention#prop-params]], and the feed-forward network $8d^2$ by [[#prop-swiglu]].
:::

So a model with $L$ blocks has about $12Ld^2$ parameters in its blocks, plus $\lvert\mathcal{V}\rvert d$ in the token embedding, plus another $\lvert\mathcal{V}\rvert d$ for the output layer unless the two are **tied** (the same matrix used for both, as in GPT-2). Two thirds of every block sits in the feed-forward network.

::: example GPT-2 small, exactly {#ex-gpt2}
GPT-2 small has $L = 12$, $d = 768$, $d_{\text{ff}} = 3072$, a vocabulary of $50{,}257$ tokens, $1024$ learned positions, tied input and output embeddings, biases on every linear layer, and LayerNorm with gain and bias before each sub-layer and after the last block. Count its parameters.
::: solution
Per block: two LayerNorms, $2\cdot2\cdot768 = 3072$; attention, $768\cdot2304 + 2304$ for the joint $Q, K, V$ projection and $768\cdot768 + 768$ for the output, together $2{,}362{,}368$; feed-forward, $768\cdot3072 + 3072 + 3072\cdot768 + 768 = 4{,}722{,}432$. Total per block: $7{,}087{,}872$, and for $12$ blocks $85{,}054{,}464$.

Embeddings: tokens $50{,}257\cdot768 = 38{,}597{,}376$, positions $1024\cdot768 = 786{,}432$. Final LayerNorm: $1536$. The output layer reuses the token embedding. Total:

$$
85{,}054{,}464 + 38{,}597{,}376 + 786{,}432 + 1536 = 124{,}439{,}808,
$$

the "124M" usually quoted. Almost a third of the parameters sit in the token embedding, typical of small models with large vocabularies.
:::
:::

::: example LLaMA-7B, exactly {#ex-llama}
LLaMA-7B has $L = 32$, $d = 4096$, a SwiGLU network with $d_{\text{ff}} = 11{,}008$, a vocabulary of $32{,}000$, RoPE (no position parameters), RMSNorm (gains only), no biases, and separate input and output embeddings. Count its parameters.
::: solution
Per block: attention $4\cdot4096^2 = 67{,}108{,}864$; feed-forward $3\cdot4096\cdot11{,}008 = 135{,}266{,}304$; two RMSNorm gains $8192$; total $202{,}383{,}360$. For $32$ blocks: $6{,}476{,}267{,}520$. Embeddings: $2\cdot32{,}000\cdot4096 = 262{,}144{,}000$. Final RMSNorm: $4096$. Total:

$$
6{,}476{,}267{,}520 + 262{,}144{,}000 + 4096 = 6{,}738{,}415{,}616,
$$

the "6.7B" of the LLaMA paper. Here the embeddings are only $4\%$ of the total: as models grow, the blocks dominate.
:::
:::

A useful rule follows from [[#prop-block-params]]. A forward pass multiplies each token's vector by every weight matrix once, costing $2$ FLOPs per weight, so a model with $N$ non-embedding parameters needs about $2N$ FLOPs per token for the forward pass, plus the attention scores of [[transformers/multi-head-attention#eq-mha-flops]]. The backward pass costs about twice the forward, giving the $6N$ FLOPs per training token used throughout [[scaling/flops-memory]].

::: example The cost of one token in LLaMA-7B {#ex-flops}
Estimate the forward FLOPs per token of LLaMA-7B ($6.48\times10^9$ non-embedding parameters, $L = 32$, $d = 4096$) at a context of $T = 2048$ tokens, and the training FLOPs per token.
::: solution
The weight matrices cost $2N = 2\cdot6.476\times10^9\approx1.30\times10^{10}$ FLOPs per token. The attention scores and weighted values add $4Td$ per layer and token ([[transformers/multi-head-attention#eq-mha-flops]] divided by $T$): $4\cdot2048\cdot4096\cdot32\approx1.07\times10^9$, about $8\%$ more. The output layer, $2\lvert\mathcal{V}\rvert d = 2\cdot32{,}000\cdot4096\approx2.6\times10^8$, adds another $2\%$. So a forward pass costs about $1.4\times10^{10}$ FLOPs per token, and training about three times that, roughly $4\times10^{10}$ FLOPs per token. At this context length the $2N$ rule is accurate to about ten per cent; at much longer contexts the attention term grows in proportion to $T$ and can no longer be ignored.
:::
:::

## A block in code {#sec-code}

```python
import torch, torch.nn as nn, torch.nn.functional as F

class RMSNorm(nn.Module):
    def __init__(self, d, eps=1e-6):
        super().__init__()
        self.g, self.eps = nn.Parameter(torch.ones(d)), eps
    def forward(self, x):                                  # x: (B, T, d)
        return x * torch.rsqrt(x.pow(2).mean(-1, keepdim=True) + self.eps) * self.g

class Block(nn.Module):
    def __init__(self, d, h, d_ff):
        super().__init__()
        self.h = h
        self.norm1, self.norm2 = RMSNorm(d), RMSNorm(d)
        self.qkv = nn.Linear(d, 3 * d, bias=False)          # W_Q, W_K, W_V side by side
        self.out = nn.Linear(d, d, bias=False)               # W_O
        self.w1 = nn.Linear(d, d_ff, bias=False)             # gate branch
        self.w3 = nn.Linear(d, d_ff, bias=False)             # linear branch
        self.w2 = nn.Linear(d_ff, d, bias=False)
    def forward(self, x):                                    # x: (B, T, d)
        B, T, d = x.shape
        q, k, v = self.qkv(self.norm1(x)).split(d, dim=-1)   # each (B, T, d)
        q, k, v = (t.view(B, T, self.h, d // self.h).transpose(1, 2) for t in (q, k, v))
        a = F.scaled_dot_product_attention(q, k, v, is_causal=True)   # (B, h, T, d_k)
        x = x + self.out(a.transpose(1, 2).reshape(B, T, d))           # residual 1
        z = self.norm2(x)
        return x + self.w2(F.silu(self.w1(z)) * self.w3(z))            # residual 2 (SwiGLU)

d, h = 192, 6
block = Block(d, h, d_ff=8 * d // 3)                         # d_ff = 512
n = sum(p.numel() for p in block.parameters())
print(n, 12 * d * d + 2 * d)                                 # 442752 442752
print(block(torch.randn(2, 10, d)).shape)                    # torch.Size([2, 10, 192])
```

Positional information (RoPE, [[transformers/positional-encoding]]) would be applied to `q` and `k` just before the attention call; it is omitted here to keep the block short.

::: warning Do not forget the final normalisation
In a pre-norm stack the residual stream is never normalised inside the blocks, and its scale typically grows with depth as each layer adds to it. The final normalisation before the output layer is therefore not optional: without it the logits' scale depends on the depth and the training run often diverges. When porting a model, check that this last norm is present and in the right place.
:::

::: history
Residual connections came from ResNets for image recognition (He et al., 2015); layer normalisation was introduced by Ba, Kiros and Hinton (2016) for recurrent networks. The original Transformer (Vaswani et al., 2017) combined them in the post-norm arrangement, with ReLU feed-forward layers of width $4d$. GELU (Hendrycks and Gimpel, 2016) was adopted by GPT and BERT. GPT-2 (Radford et al., 2019) moved the normalisation to the input of each sub-layer and added a final one, and Xiong et al. (2020) analysed why this pre-norm arrangement trains more stably. Zhang and Sennrich (2019) proposed RMSNorm. Gated linear units go back to Dauphin et al. (2017); Shazeer (2020) showed that variants such as SwiGLU improve Transformer feed-forward layers, and PaLM (2022) and LLaMA (Touvron et al., 2023) made the combination of pre-norm RMSNorm, SwiGLU and RoPE the standard recipe. Geva et al. (2021) proposed reading feed-forward layers as key–value memories.
:::

::: summary
- A pre-norm block computes $\mathbf{h} = \mathbf{x} + \operatorname{MHA}(\operatorname{Norm}(\mathbf{x}))$ and $\mathbf{y} = \mathbf{h} + \operatorname{FFN}(\operatorname{Norm}(\mathbf{h}))$; the model ends with a final normalisation.
- The residual stream is a running sum that every sub-layer reads and writes; its identity path delivers the loss gradient to every layer, which is what makes deep stacks trainable.
- LayerNorm centres and rescales each token's features; RMSNorm only rescales. Both act per token, unlike BatchNorm.
- The feed-forward network transforms each position independently, usually with width $4d$ (GELU) or $\tfrac83d$ (SwiGLU), and holds two thirds of each block's parameters.
- A block has about $12d^2$ parameters; with embeddings this gives exact counts such as $124{,}439{,}808$ for GPT-2 small and $6{,}738{,}415{,}616$ for LLaMA-7B, and about $2N$ FLOPs per token for a forward pass.
:::

## Exercises

::: exercise LayerNorm by hand {level=1 check="-2/sqrt(3.5)"}
Compute the first component of $\operatorname{LayerNorm}(1, 2, 3, 6)$ with $\boldsymbol\gamma = \mathbf{1}$, $\boldsymbol\beta = \mathbf{0}$, $\varepsilon = 0$.
::: solution
$\mu = 3$, $\sigma^2 = 3.5$, so the first component is $(1 - 3)/\sqrt{3.5} = -2/\sqrt{3.5}\approx-1.069$, as in [[#ex-norms]].
:::
:::

::: exercise RMSNorm by hand {level=1 check="1/sqrt(12.5)"}
Compute the first component of $\operatorname{RMSNorm}(1, 2, 3, 6)$ with $\boldsymbol\gamma = \mathbf{1}$ and $\varepsilon = 0$.
::: solution
$\operatorname{RMS} = \sqrt{50/4} = \sqrt{12.5}$, so the first component is $1/\sqrt{12.5}\approx0.283$.
:::
:::

::: exercise A block's parameters {level=1 check="12582912"}
How many weights does one Transformer block with $d = 1024$ and $d_{\text{ff}} = 4096$ have, ignoring biases and normalisation gains?
::: solution
By [[#prop-block-params]], $12\cdot1024^2 = 12{,}582{,}912$: $4{,}194{,}304$ in attention and $8{,}388{,}608$ in the feed-forward network.
:::
:::

::: exercise A SwiGLU width {level=1 check="8*5120/3"}
A model with $d = 5120$ uses SwiGLU. What hidden width $d_{\text{ff}}$ gives exactly the parameter count of a $4d$ ReLU network? LLaMA-13B uses $13{,}824$; what is that, rounded to what?
::: solution
$d_{\text{ff}} = 8\cdot5120/3 = 13{,}653.3$. Rounded up to the next multiple of $256$ this is $54\cdot256 = 13{,}824$, the width LLaMA-13B uses.
:::
:::

::: exercise What normalisation ignores {level=2}
Show that the normalised part of LayerNorm, $(\mathbf{x} - \mu\mathbf{1})/\sigma$, has mean $0$ and variance $1$, and that it is unchanged if $\mathbf{x}$ is replaced by $a\mathbf{x} + c\mathbf{1}$ with $a > 0$ (ignoring $\varepsilon$). Which of these two invariances does RMSNorm have? What does this mean for a sub-layer that reads a normalised stream?
::: solution
Write $\hat x_i = (x_i - \mu)/\sigma$. Then $\sum_i\hat x_i = (\sum_ix_i - d\mu)/\sigma = 0$ and $\frac1d\sum_i\hat x_i^2 = \sigma^2/\sigma^2 = 1$. For $\mathbf{x}' = a\mathbf{x} + c\mathbf{1}$, $\mu' = a\mu + c$ and $\sigma' = a\sigma$, so $(x'_i - \mu')/\sigma' = a(x_i - \mu)/(a\sigma) = \hat x_i$. RMSNorm divides by $\operatorname{RMS}(a\mathbf{x}) = a\operatorname{RMS}(\mathbf{x})$, so it is invariant to scaling by $a > 0$ but not to adding $c\mathbf{1}$. A sub-layer reading a normalised stream therefore sees only the *direction* of the representation (and, for LayerNorm, its deviation from the mean); the overall size of the residual stream, which grows with depth, does not affect it. (With $\varepsilon > 0$ the invariance holds up to a tiny error.)
:::
:::

::: exercise Counting GPT-2 small {level=2 check="124439808"}
Reproduce the count of [[#ex-gpt2]]. How would the total change if the output layer were *not* tied to the token embedding?
::: solution
As in the example, $12\cdot7{,}087{,}872 + 50{,}257\cdot768 + 1024\cdot768 + 2\cdot768 = 124{,}439{,}808$. An untied output layer would add another $50{,}257\cdot768 = 38{,}597{,}376$ weights (and $50{,}257$ biases if it had them), for about $163$ million in total.
:::
:::

::: exercise Counting LLaMA-7B {level=2 check="6738415616"}
Reproduce the count of [[#ex-llama]]. What fraction of LLaMA-7B's parameters are in the feed-forward networks?
::: solution
As in [[#ex-llama]]: $32\cdot202{,}383{,}360 + 2\cdot32{,}000\cdot4096 + 4096 = 6{,}738{,}415{,}616$. The feed-forward networks hold $32\cdot135{,}266{,}304 = 4{,}328{,}521{,}728$, which is $64\%$ of the total — close to the two thirds of [[#prop-block-params]], the embeddings making up most of the difference.
:::
:::

::: exercise FLOPs of a block {level=2 check="24"}
Show that one block with $12d^2$ weights costs about $24d^2$ FLOPs per token in the forward pass, apart from the attention scores, and that this is the same whether the feed-forward network uses GELU with $4d$ or SwiGLU with $\tfrac83d$. What is the coefficient in front of $d^2$?
::: solution
Each weight is used in one multiply–add per token, which is $2$ FLOPs, so $12d^2$ weights cost $24d^2$ FLOPs per token. In detail: the four attention projections cost $4\cdot2d^2 = 8d^2$; the GELU network costs $2\cdot2\cdot d\cdot4d = 16d^2$, and SwiGLU costs $3\cdot2\cdot d\cdot\frac83d = 16d^2$ as well (the elementwise gate and activation are negligible). The coefficient is $24$.
:::
:::

::: exercise Gradients through the stream {level=3}
Consider a two-block network $\mathbf{x}_1 = \mathbf{x}_0 + F_0(\mathbf{x}_0)$, $\mathbf{x}_2 = \mathbf{x}_1 + F_1(\mathbf{x}_1)$, and suppose at initialisation the Jacobians are small, $J_0 = J_1 = \eta A$ for a fixed matrix $A$ with $\lVert A\rVert = 1$ and $\eta = 0.01$. (a) Compute $\partial\mathbf{x}_2/\partial\mathbf{x}_0$ exactly. (b) Compare with the plain network $\mathbf{x}_2 = F_1(F_0(\mathbf{x}_0))$ with the same Jacobians. (c) What happens to each as the depth grows to $L$ blocks?
::: solution
(a) $(I + \eta A)(I + \eta A) = I + 2\eta A + \eta^2A^2$, whose norm is close to $1$. (b) Without residuals the Jacobian is $J_1J_0 = \eta^2A^2$, of norm at most $10^{-4}$: the gradient reaching $\mathbf{x}_0$ is ten thousand times smaller than at the output. (c) With residuals, $(I + \eta A)^L$ has norm between roughly $1$ and $(1 + \eta)^L$, which stays moderate for $L\eta$ of order one; without them, $\eta^LA^L$ has norm at most $\eta^L$, which vanishes geometrically. This is [[#prop-identity]] in miniature, and why residual connections are indispensable in deep networks.
:::
:::

::: exercise A block from scratch {level=3}
Run the `Block` of [[#sec-code]] and confirm its parameter count, $12d^2 + 2d$. Then (a) replace the SwiGLU network with a GELU network of width $4d$ and check that the count stays $12d^2 + 2d$; (b) verify causality: change the input at position $5$ only and confirm that the outputs at positions $0$–$4$ do not change.
::: solution
```python
import torch, torch.nn as nn, torch.nn.functional as F
# with Block, RMSNorm from the chapter, and d = 192, h = 6
class GeluBlock(Block):
    def __init__(self, d, h):
        super().__init__(d, h, d_ff=4 * d)
        del self.w3                                            # GELU uses two matrices only
    def forward(self, x):
        B, T, d = x.shape
        q, k, v = self.qkv(self.norm1(x)).split(d, dim=-1)
        q, k, v = (t.view(B, T, self.h, d // self.h).transpose(1, 2) for t in (q, k, v))
        a = F.scaled_dot_product_attention(q, k, v, is_causal=True)
        x = x + self.out(a.transpose(1, 2).reshape(B, T, d))
        return x + self.w2(F.gelu(self.w1(self.norm2(x))))

g = GeluBlock(d, h)
print(sum(p.numel() for p in g.parameters()) == 12 * d * d + 2 * d)      # True
x = torch.randn(1, 10, d); y = block(x)
x2 = x.clone(); x2[0, 5] += 1.0; y2 = block(x2)
print(torch.allclose(y[0, :5], y2[0, :5]), torch.allclose(y[0, 5:], y2[0, 5:]))   # True False
```

(a) Two matrices of $d\times4d$ give $8d^2$, as do three of $d\times\frac83d$; the gains add $2d$. (b) Changing token $5$ changes outputs $5$ onwards but not $0$–$4$, as [[transformers/multi-head-attention#prop-causal]] requires.
:::
:::

::: exercise Post-norm versus pre-norm {level=3}
In a post-norm network, $\mathbf{x}_{\ell+1} = \operatorname{Norm}(\mathbf{x}_\ell + F_\ell(\mathbf{x}_\ell))$. Write the Jacobian $\partial\mathbf{x}_{\ell+1}/\partial\mathbf{x}_\ell$ and explain why the identity term of [[#prop-identity]] no longer reaches early layers unchanged. Why does this make a learning-rate warm-up important?
::: solution
$\partial\mathbf{x}_{\ell+1}/\partial\mathbf{x}_\ell = N_\ell\,(I + J_\ell)$, where $N_\ell$ is the Jacobian of the normalisation at $\mathbf{x}_\ell + F_\ell(\mathbf{x}_\ell)$. The product over layers is $N_{L-1}(I + J_{L-1})\cdots N_\ell(I + J_\ell)$, so even its "identity" part is the product $N_{L-1}\cdots N_\ell$ of normalisation Jacobians, which rescale and project (removing the mean direction) at every layer. Gradients near the output are then much larger than near the input — Xiong et al. (2020) showed that at initialisation the gradients of the last layers of a post-norm Transformer are large — so a full learning rate at the start can destabilise the top layers before the lower ones have learned anything. A warm-up keeps the early steps small until the network reaches a better-conditioned region; pre-norm keeps the identity path clean and largely removes the need.
:::
:::
