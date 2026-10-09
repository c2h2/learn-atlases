A single attention head computes one weighted average per position, so each token can follow only one pattern of relevance at a time. Language asks for several at once. In *the keys to the cabinet are on the table*, the verb *are* needs its subject (*keys*, not *cabinet*, to agree in number), the noun *keys* is modified by *to the cabinet*, and every word has neighbours that matter simply because they are adjacent. One softmax over the positions has to compromise between these relations.

**Multi-head attention** runs several attention heads side by side, each with its own projections into a smaller space, and combines their results. Different heads are free to learn different relations — and in trained models many do. This chapter defines the layer, shows that splitting it into heads costs no extra parameters, adds the **causal mask** that lets a language model train on every position of a sequence at once, and works through the shapes and costs of a real implementation.

## Several heads in parallel {#sec-heads}

The idea is to split the model dimension $d_{\text{model}}$ into $h$ slices of size $d_k = d_{\text{model}}/h$, run attention in each slice independently, and then mix the slices with one more linear map.

::: definition Multi-head attention {#def-mha}
Let $X\in\R^{T\times d_{\text{model}}}$ and let $h$ divide $d_{\text{model}}$, with $d_k = d_v = d_{\text{model}}/h$. For each head $i = 1, \dots, h$ take learned matrices $W_Q^{(i)}, W_K^{(i)}, W_V^{(i)}\in\R^{d_{\text{model}}\times d_k}$ and compute

$$
\text{head}_i = \operatorname{Attention}\big(XW_Q^{(i)},\, XW_K^{(i)},\, XW_V^{(i)}\big)\in\R^{T\times d_k}.
$$

**Multi-head attention** concatenates the heads along the feature axis and applies an output matrix $W_O\in\R^{d_{\text{model}}\times d_{\text{model}}}$:

$$
\operatorname{MHA}(X) = \big[\text{head}_1\ \text{head}_2\ \cdots\ \text{head}_h\big]\,W_O\in\R^{T\times d_{\text{model}}}.
$$ {#eq-mha}
:::

In practice the $h$ query matrices are stored side by side as one $d_{\text{model}}\times d_{\text{model}}$ matrix $W_Q = [W_Q^{(1)}\cdots W_Q^{(h)}]$, and likewise for keys and values, so the projections are three ordinary matrix products; the split into heads is only a reshape. The original Transformer used $d_{\text{model}} = 512$ with $h = 8$ heads of size $64$; GPT-2 small uses $768 = 12\times 64$. Head dimensions of $64$ or $128$ are by far the most common.

::: example Two heads, two relations {#ex-two-heads}
Three tokens have $4$-dimensional representations

$$
\mathbf{x}_1 = (1, 0, 1, 0), \qquad \mathbf{x}_2 = (0, 1, 1, 0), \qquad \mathbf{x}_3 = (1, 0, 0, 1).
$$

Head 1 reads the first two coordinates and head 2 the last two: for each head take $W_Q^{(i)} = W_K^{(i)}$ to be the projection onto its two coordinates, so $d_k = 2$. Compute both attention matrices.
::: solution
Head 1 sees $\mathbf{x}_1\mapsto(1,0)$, $\mathbf{x}_2\mapsto(0,1)$, $\mathbf{x}_3\mapsto(1,0)$. The scaled scores of token 1 are $(1, 0, 1)/\sqrt2$, giving weights $(0.401, 0.198, 0.401)$, and the full matrix is

$$
A^{(1)} = \begin{pmatrix}0.401&0.198&0.401\\0.248&0.503&0.248\\0.401&0.198&0.401\end{pmatrix}.
$$

Head 2 sees $(1,0)$, $(1,0)$, $(0,1)$: now tokens 1 and 2 match, and

$$
A^{(2)} = \begin{pmatrix}0.401&0.401&0.198\\0.401&0.401&0.198\\0.248&0.248&0.503\end{pmatrix}.
$$

Token 1 pairs with token 3 in head 1 and with token 2 in head 2. A single head over all four coordinates would have to blend these preferences; two heads keep them apart, and $W_O$ lets the next layer use both.
:::
:::

Splitting into heads is free in parameters.

::: proposition The size of a multi-head attention layer {#prop-params}
Without biases, a multi-head attention layer with model dimension $d$ has $4d^2$ parameters, whatever the number of heads $h$.
:::

::: proof
Each head has three matrices of size $d\times d_k$, so the $h$ heads together have $3h\cdot d\cdot d_k = 3d\cdot(hd_k) = 3d^2$ parameters, since $hd_k = d$. The output matrix $W_O$ adds $d^2$. The total $4d^2$ does not involve $h$.
:::

With biases on the four projections the count is $4d^2 + 4d$; for GPT-2 small, $4\cdot768^2 + 4\cdot768 = 2{,}362{,}368$. More heads mean smaller heads, not a bigger layer.

The output matrix can also be split by heads. Write $W_O$ as $h$ blocks of rows, $W_O^{(1)}, \dots, W_O^{(h)}\in\R^{d_k\times d}$. Multiplying a concatenation by a matrix split into row blocks gives a sum of products, so

$$
\operatorname{MHA}(X) = \sum_{i=1}^{h} \text{head}_i\,W_O^{(i)}.
$$ {#eq-mha-sum}

Each head therefore computes its own contribution of full width $d_{\text{model}}$, and the layer adds them up. This is the view taken by interpretability research ([[interpretability/residual-stream]]): every head reads from the shared representation and writes its own term back into it, independently of the other heads in the same layer.

## Causal masking {#sec-causal}

A language model is trained to predict each token from the ones before it. Given a sequence $x_1, \dots, x_T$, it should output, at every position $t$, a distribution over $x_{t+1}$ that uses only $x_1, \dots, x_t$. If position $t$ could attend to position $t + 1$, the model would simply copy the answer. The **causal mask** forbids attention to later positions.

::: definition Causal mask {#def-causal-mask}
The **causal mask** of length $T$ is the matrix $M\in\R^{T\times T}$ with

$$
M_{ij} = \begin{cases}0 & \text{if } j\le i,\\ -\infty & \text{if } j > i.\end{cases}
$$

**Causal attention** adds it to the scores before the softmax:

$$
\operatorname{softmax}\!\Big(\frac{QK^\top}{\sqrt{d_k}} + M\Big)\,V.
$$
:::

Since $e^{-\infty} = 0$, masked entries get weight zero, and the softmax renormalises the remaining ones: position $t$ distributes all its attention over positions $1, \dots, t$. The attention matrix becomes lower triangular, with $T(T+1)/2$ allowed entries instead of $T^2$.

::: proposition Causal attention only looks back {#prop-causal}
In a stack of causal attention layers, each combined with position-wise operations (feed-forward layers, normalisation, residual connections), the output at position $t$ depends only on the inputs at positions $1, \dots, t$.
:::

::: proof
By induction on the number of layers. Suppose the representations at position $s$ after layer $\ell$ depend only on inputs $1, \dots, s$ for every $s$. In layer $\ell + 1$, position $t$ attends only to positions $s\le t$, whose representations depend only on inputs $1, \dots, s\subseteq 1, \dots, t$; its query, and the position-wise operations, use only position $t$ itself. So the new representation at $t$ depends only on inputs $1, \dots, t$. The base case is the input layer, where position $t$ holds token $t$ alone.
:::

This proposition is what makes Transformers efficient to train. One forward pass over a sequence of $T$ tokens produces $T$ predictions — the next token after every prefix — and none of them can see its own answer. A recurrent network gets the same $T$ predictions, but must compute them one after another; a causal Transformer computes them all in parallel, which is the reason it can be trained on trillions of tokens. The same structure allows text generation one token at a time, reusing earlier computations ([[inference/kv-cache]]).

Concretely, the training loss for one sequence is the average of $T$ cross-entropies,

$$
\mathcal{L} = -\frac{1}{T}\sum_{t=1}^{T}\log p_\theta(x_{t+1}\mid x_{\le t}),
$$

where $p_\theta(\cdot\mid x_{\le t})$ is read off the output at position $t$ (the last position predicts the token after the sequence, which is taken from the data as well). Every token of the training text is a target once, which is why decoder-only models extract so much signal per sequence compared with the masked objectives of [[transformers/architecture-families]]. During training the model always conditions on the *true* previous tokens — this is called **teacher forcing** — whereas during generation it conditions on its own earlier samples; the consequences of this mismatch are discussed in [[sequence-models/decoding-basics]].

::: widget graph
nodes: t1@0,0; t2@1,1.3; t3@2,1.8; t4@3,1.3; t5@4,0
edges: t1>t2; t1>t3; t1>t4; t1>t5; t2>t3; t2>t4; t2>t5; t3>t4; t3>t5; t4>t5
algorithm: topo
caption: Information flow in causal attention over five tokens: an arrow from $t_i$ to $t_j$ means that position $j$ may attend to position $i$ (every position may also attend to itself). The graph has no cycles, so the positions can be put in an order in which each depends only on earlier ones — step through the topological sort. Without the mask the graph would be complete, and $t_4$ could see $t_5$, the token it is meant to predict.
:::

::: example A masked row {#ex-masked-row}
At position $3$ of a four-token sequence, the scaled scores against keys $1, \dots, 4$ are $(1, 0.5, 2, 3)$. Compute the attention weights with and without the causal mask.
::: solution
Without the mask: $\operatorname{softmax}(1, 0.5, 2, 3) = (0.085, 0.052, 0.232, 0.631)$, with most weight on key $4$ — the future token.

With the mask the scores become $(1, 0.5, 2, -\infty)$. The last weight is $0$, and the others are renormalised among themselves: $\operatorname{softmax}(1, 0.5, 2) = (0.231, 0.140, 0.629)$. Masking does not simply delete key $4$'s share; the remaining weights are rescaled so that they again sum to $1$.
:::
:::

::: warning Mask the scores, not the weights
The mask must be added to the scores *before* the softmax. Setting the forbidden weights to zero *after* the softmax leaves rows that no longer sum to one — in [[#ex-masked-row]] the row would become $(0.085, 0.052, 0.232, 0)$, summing to $0.369$ — and, worse, the remaining weights were computed with the future score in the denominator, so information from the future still leaks into them. In half-precision arithmetic $-\infty$ is often replaced by the most negative representable number, which has the same effect.
:::

Sequences in a batch rarely have the same length, so shorter ones are filled with padding tokens. A **padding mask** sets the scores of padding keys to $-\infty$ in the same way, so that real tokens never attend to padding. Masks combine by adding them. One case needs care: if a row is masked entirely — a padding query in a causal layer, for example — every score is $-\infty$, and $e^{-\infty}/\sum e^{-\infty} = 0/0$ is undefined (NaN). Implementations avoid it by never masking a position's own key, or by zeroing such rows explicitly.

## Shapes and implementation {#sec-shapes}

The whole layer is matrix products and reshapes. For a batch of $B$ sequences:

1. Project: $XW_Q$, $XW_K$, $XW_V$, each $(B, T, d_{\text{model}})$.
2. Split the last axis into heads: $(B, T, h, d_k)$, then swap axes to $(B, h, T, d_k)$, so each head is a separate batch of matrices.
3. Scores $QK^\top/\sqrt{d_k}$: $(B, h, T, T)$; add the mask; softmax over the last axis.
4. Weighted sum with $V$: $(B, h, T, d_k)$.
5. Swap back to $(B, T, h, d_k)$, merge the last two axes to $(B, T, d_{\text{model}})$ — the concatenation of [[#eq-mha]] — and multiply by $W_O$.

```python
import torch

def multi_head_attention(X, W_q, W_k, W_v, W_o, h, causal=True):
    # X: (B, T, d); all weight matrices: (d, d)
    B, T, d = X.shape
    d_k = d // h
    def split(Y):                                   # (B, T, d) -> (B, h, T, d_k)
        return Y.view(B, T, h, d_k).transpose(1, 2)
    Q, K, V = split(X @ W_q), split(X @ W_k), split(X @ W_v)
    S = Q @ K.transpose(-2, -1) / d_k ** 0.5        # (B, h, T, T)
    if causal:
        future = torch.triu(torch.ones(T, T, dtype=torch.bool), diagonal=1)
        S = S.masked_fill(future, float('-inf'))    # mask before the softmax
    A = S.softmax(dim=-1)                           # (B, h, T, T)
    O = A @ V                                       # (B, h, T, d_k)
    O = O.transpose(1, 2).reshape(B, T, d)          # concatenate the heads
    return O @ W_o                                  # (B, T, d)

torch.manual_seed(0)
B, T, d, h = 2, 6, 16, 4
X = torch.randn(B, T, d)
W_q, W_k, W_v, W_o = (torch.randn(d, d) / d ** 0.5 for _ in range(4))
print(multi_head_attention(X, W_q, W_k, W_v, W_o, h).shape)   # torch.Size([2, 6, 16])
```

::: example Shapes in GPT-2 small {#ex-shapes}
Follow a batch of $B = 8$ sequences of $T = 1024$ tokens through one attention layer of GPT-2 small ($d_{\text{model}} = 768$, $h = 12$). Give every intermediate shape and the number of entries in the score tensor.
::: solution
$X$: $(8, 1024, 768)$. Each projection: $(8, 1024, 768)$; split into heads: $(8, 1024, 12, 64)$, transposed to $(8, 12, 1024, 64)$. Scores and weights: $(8, 12, 1024, 1024)$, which is $8\cdot12\cdot1024^2 = 100{,}663{,}296$ numbers. Weighted values: $(8, 12, 1024, 64)$; merged: $(8, 1024, 768)$; after $W_O$: $(8, 1024, 768)$. Per head, the score tensor has $T/d_k = 1024/64 = 16$ times as many entries as the value tensor, which is why it dominates memory at long contexts.
:::
:::

That last remark deserves numbers, because it explains much of the engineering in [[transformers/attention-complexity]].

::: example The memory of the score tensor {#ex-score-memory}
A model with $h = 32$ heads processes a batch of $B = 8$ sequences of $T = 4096$ tokens in bfloat16 (two bytes per number). How much memory does one layer's score tensor occupy if it is materialised?
::: solution
$B\cdot h\cdot T^2 = 8\cdot32\cdot4096^2 = 4{,}294{,}967{,}296$ numbers, at $2$ bytes each $8{,}589{,}934{,}592$ bytes $= 8$ GiB — for a single layer, before the attention weights of the backward pass are stored as well. Modern kernels never materialise this tensor; [[transformers/attention-complexity]] shows how.
:::
:::

## Counting the cost {#sec-cost}

Count a multiply–add as two floating-point operations (FLOPs). Multiplying a $T\times d$ matrix by a $d\times d$ one costs $2Td^2$ FLOPs, so the four projections cost $8Td^2$. Each head computes a $T\times T$ score matrix from $T\times d_k$ factors, costing $2T^2d_k$, and the same again for the product with $V$; over all heads that is $4T^2d$. Per layer and per sequence,

$$
\text{FLOPs}(\operatorname{MHA}) \approx 8Td^2 + 4T^2d.
$$ {#eq-mha-flops}

Per token, the projections cost a constant $8d^2$, while the attention part costs $4Td$, growing with the context. The two are equal at $T = 2d$. With a causal mask, an efficient kernel can skip the masked half of the scores, but the growth in $T$ remains.

::: widget plot
f: 8*d^2/1e6; 4*d*x/1e6
x: 0, 8192
sliders: d=768:256:4096:128
labels: projections $8d^2$; scores and values $4Td$
caption: Forward FLOPs per token (in millions) of one multi-head attention layer, as the context length $T$ grows, for model width $d$. The projections cost the same for every token; the attention computation grows linearly with the number of tokens attended to. The curves cross at $T = 2d$ — at $T = 1536$ for $d = 768$.
:::

::: quiz
A model has $d_{\text{model}} = 2048$. One design uses $16$ heads of size $128$, another $32$ heads of size $64$. How do their attention layers compare?
- [x] Same number of parameters and essentially the same FLOPs; they differ in how the scores are partitioned
- [ ] The 32-head layer has twice as many parameters
- [ ] The 32-head layer has twice the FLOPs for the score matrices
- [ ] The 16-head layer cannot use a causal mask
::: solution
By [[#prop-params]] both have $4d^2$ parameters. The score computation costs $2T^2d_k$ per head, so $h\cdot2T^2d_k = 2T^2d$ in total either way, and similarly for the values. What changes is that the 32-head layer computes $32$ separate $T\times T$ weight matrices from $64$-dimensional comparisons, the other $16$ from $128$-dimensional ones — more patterns, each from a lower-dimensional view. Masks apply to any number of heads.
:::
:::

## What do the heads do? {#sec-what}

Nothing in the training objective tells head $i$ what to attend to, and different heads end up doing different things. Studies of trained models have found heads that attend to the previous or the next token, heads that link verbs to their objects or pronouns to their antecedents, and heads that attend mostly to separator or beginning-of-sequence tokens, which seems to work as a "no-op" when nothing else is relevant (Clark et al., 2019; Voita et al., 2019). In language models, **induction heads** look for an earlier occurrence of the current token and copy what followed it, a mechanism behind much of in-context learning ([[interpretability/circuits]]).

Heads are also redundant. Michel, Levy and Neubig (2019) removed most of the heads of trained translation and BERT models at test time with little loss of accuracy, and Voita et al. (2019) found that a few specialised heads do most of the work. A related limit is the **low-rank bottleneck**: each head's score matrix $Q_iK_i^\top$ is a product of $T\times d_k$ and $d_k\times T$ matrices, so its rank is at most $d_k$ (Bhojanapalli et al., 2020). When $d_k$ is much smaller than $T$, a head cannot express arbitrary attention patterns — one reason head dimensions have not shrunk below $64$ even as models grew.

::: warning Heads are not labelled modules
Descriptions such as "the coreference head" summarise what a head tends to do on some inputs. Heads are not trained to perform a named function, the same head often does several things, and functions are frequently spread over several heads and layers. Treat such labels as hypotheses to test, as in [[interpretability/causal-interventions]].
:::

::: history
Vaswani et al. (2017) introduced multi-head attention with the Transformer and justified it as letting the model "jointly attend to information from different representation subspaces at different positions"; their base model used $8$ heads of size $64$, their large model $16$. The causal mask came with the decoder of the same paper and became the basis of GPT (Radford et al., 2018) and every decoder-only language model since. Analyses of what heads learn followed quickly: Voita et al. (2019) found specialised positional, syntactic and rare-word heads in translation models, Clark et al. (2019) studied BERT's heads, and Michel, Levy and Neubig (2019) asked "are sixteen heads really better than one?" and pruned most of them. Bhojanapalli et al. (2020) identified the low-rank bottleneck of small heads, and Olsson et al. (2022) connected induction heads to in-context learning. To save memory at inference, Shazeer (2019) let all heads share one key and value head (multi-query attention), an idea refined into grouped-query attention ([[transformers/efficient-attention]]).
:::

::: summary
- Multi-head attention runs $h$ attention heads of size $d_k = d_{\text{model}}/h$ in parallel, concatenates them and applies $W_O$; it has $4d^2$ parameters regardless of $h$.
- The output is a sum of per-head contributions $\text{head}_i W_O^{(i)}$, each written into the model's representation independently.
- The causal mask adds $-\infty$ to the scores of future positions before the softmax, so position $t$ depends only on tokens $1, \dots, t$; one forward pass then trains $T$ next-token predictions in parallel.
- An implementation is three projections, a reshape to $(B, h, T, d_k)$, a masked softmax over $(B, h, T, T)$ scores, a weighted sum, a reshape back and $W_O$.
- The layer costs about $8Td^2 + 4T^2d$ FLOPs; the attention term overtakes the projections at $T = 2d$, and the score tensor dominates memory at long contexts.
:::

## Exercises

::: exercise Head size {level=1 check="64"}
A model has $d_{\text{model}} = 1024$ and $16$ heads. What is the head dimension $d_k$, and what are the shapes of $W_Q^{(i)}$ and of $W_O$?
::: solution
$d_k = 1024/16 = 64$. Each $W_Q^{(i)}$ is $1024\times64$; $W_O$ is $1024\times1024$ (equivalently $16$ row blocks of size $64\times1024$).
:::
:::

::: exercise Parameters of an attention layer {level=1 check="2359296"}
How many parameters does a multi-head attention layer with $d_{\text{model}} = 768$ and $12$ heads have, without biases? How does the answer change with $24$ heads?
::: solution
By [[#prop-params]], $4\cdot768^2 = 2{,}359{,}296$, and the same with $24$ heads (of size $32$).
:::
:::

::: exercise Allowed pairs {level=1 check="21"}
How many (query, key) pairs are allowed by a causal mask of length $T = 6$? What fraction of the $T^2$ pairs is that, and what does the fraction tend to for large $T$?
::: solution
Position $i$ may attend to $i$ keys, so the total is $1 + 2 + \dots + 6 = 21$, out of $36$, a fraction $21/36 = 7/12$. In general $\frac{T(T+1)/2}{T^2} = \frac{T+1}{2T}\to\frac12$.
:::
:::

::: exercise A masked softmax {level=2 check="exp(2)/(exp(1)+exp(0.5)+exp(2))"}
In [[#ex-masked-row]], find the exact weight that position $3$ gives to its own key under the causal mask.
::: solution
The allowed scores are $(1, 0.5, 2)$, so the weight on key $3$ is $e^2/(e^1 + e^{0.5} + e^2)\approx 7.389/11.756\approx0.629$.
:::
:::

::: exercise Masking is renormalisation {level=2}
Let $\mathbf{z}\in\R^n$ and let $S\subseteq\{1, \dots, n\}$ be non-empty. Define $\mathbf{m}$ by $m_j = 0$ for $j\in S$ and $m_j = -\infty$ otherwise. Show that $\operatorname{softmax}(\mathbf{z} + \mathbf{m})_j = 0$ for $j\notin S$, and that for $j\in S$ it equals the softmax of the scores $(z_k)_{k\in S}$ alone. What goes wrong if $S$ is empty?
::: solution
For $j\notin S$ the numerator is $e^{z_j - \infty} = 0$. For $j\in S$ the denominator is $\sum_ke^{z_k + m_k} = \sum_{k\in S}e^{z_k}$, since the other terms vanish, so $\operatorname{softmax}(\mathbf{z} + \mathbf{m})_j = e^{z_j}/\sum_{k\in S}e^{z_k}$, the softmax over $S$. If $S$ is empty the denominator is $0$ as well, giving $0/0$: the NaN of fully masked rows.
:::
:::

::: exercise Which term dominates? {level=2 check="0.25"}
For one sequence of $T = 2048$ tokens and $d_{\text{model}} = 4096$, compute the projection FLOPs $8Td^2$ and the attention FLOPs $4T^2d$ of [[#eq-mha-flops]]. What is the ratio of attention to projection FLOPs?
::: solution
$8\cdot2048\cdot4096^2 = 274{,}877{,}906{,}944\approx2.7\times10^{11}$ and $4\cdot2048^2\cdot4096 = 68{,}719{,}476{,}736\approx6.9\times10^{10}$. The ratio is $\frac{4T^2d}{8Td^2} = \frac{T}{2d} = \frac{2048}{8192} = 0.25$: at this width the projections still dominate, and the attention term catches up only at $T = 8192$.
:::
:::

::: exercise Memory of the scores {level=2 check="8"}
Repeat [[#ex-score-memory]]: how many gibibytes does the score tensor of one layer occupy for $B = 8$, $h = 32$, $T = 4096$ in bfloat16? By what factor does it grow if the context is doubled?
::: solution
$8\cdot32\cdot4096^2\cdot2$ bytes $= 2^{33}$ bytes $= 8$ GiB. Doubling $T$ multiplies $T^2$ by $4$: $32$ GiB.
:::
:::

::: exercise A second look at two heads {level=2 check="exp(1/sqrt(2))/(2+exp(1/sqrt(2)))"}
In [[#ex-two-heads]], derive the second row of $A^{(1)}$ exactly. What weight does token 2 give to itself in head 1?
::: solution
In head 1, token 2 has query $(0, 1)$ and the keys are $(1,0)$, $(0,1)$, $(1,0)$, so the raw scores are $(0, 1, 0)$ and the scaled ones $(0, 1/\sqrt2, 0)$. The weights are $(1, e^{1/\sqrt2}, 1)/(2 + e^{1/\sqrt2})$, and the weight on itself is $e^{1/\sqrt2}/(2 + e^{1/\sqrt2})\approx2.028/4.028\approx0.503$.
:::
:::

::: exercise The low-rank bottleneck {level=3}
Show that each head's score matrix $Q_iK_i^\top\in\R^{T\times T}$ has rank at most $d_k$. Then explain why, when $d_k < T$, a single head cannot produce every possible pattern of attention weights — for instance, why it cannot in general make the $T\times T$ matrix of scores equal to an arbitrary target matrix. Does the softmax help?
::: solution
$Q_i$ is $T\times d_k$ and $K_i^\top$ is $d_k\times T$; the column space of $Q_iK_i^\top$ lies in the column space of $Q_i$, which has dimension at most $d_k$. So the score matrix has rank at most $d_k$, and a matrix of rank greater than $d_k$ (for example the identity when $T > d_k$) cannot be a score matrix. The softmax is applied row by row and is non-linear, so the weight matrix itself can have higher rank; but the scores that determine it are fixed by the $2Td_k$ entries of $Q_i$ and $K_i$ rather than by $T^2$ free numbers. This is the bottleneck: many heads of tiny size cannot express sharp, arbitrary patterns, which is one reason $d_k$ is kept at $64$ or more.
:::
:::

::: exercise Checking an implementation {level=3}
Verify the function `multi_head_attention` of [[#sec-shapes]] by computing the same result a second way: slice the projected $Q$, $K$, $V$ into heads by columns, call `torch.nn.functional.scaled_dot_product_attention(..., is_causal=True)` on each slice, concatenate the outputs and multiply by $W_O$. Explain why the two computations must agree.
::: solution
```python
import torch, torch.nn.functional as F
# reuse X, W_q, W_k, W_v, W_o, h, d and multi_head_attention from the chapter
d_k = d // h
Q, K, V = X @ W_q, X @ W_k, X @ W_v
heads = [F.scaled_dot_product_attention(Q[..., i*d_k:(i+1)*d_k], K[..., i*d_k:(i+1)*d_k],
                                        V[..., i*d_k:(i+1)*d_k], is_causal=True) for i in range(h)]
ref = torch.cat(heads, dim=-1) @ W_o
print(torch.allclose(multi_head_attention(X, W_q, W_k, W_v, W_o, h), ref, atol=1e-5))   # True
```

Columns $i d_k, \dots, (i+1)d_k - 1$ of $XW_Q$ are exactly $XW_Q^{(i)}$, which is what `view(B, T, h, d_k)` selects for head $i$; the causal flag applies the same mask; and concatenating the heads before $W_O$ is what the final `reshape` does. The check ran with output `True`.
:::
:::

::: exercise Padding and empty rows {level=3}
A batch contains a sequence of length $3$ padded to length $5$, and the layer uses both the causal mask and a padding mask that blocks keys $4$ and $5$. Write out the combined $5\times5$ pattern of allowed (query, key) pairs. Which rows are fully masked, and why does placing the padding on the *left* (keys $1$ and $2$ blocked) cause trouble for queries $1$ and $2$?
::: solution
With right padding, query $i$ may see keys $j\le i$ with $j\le3$: rows $1$–$3$ allow $\{1\}, \{1,2\}, \{1,2,3\}$, and rows $4$ and $5$ (padding queries) allow $\{1,2,3\}$. No row is empty; the outputs at padding positions are simply ignored by the loss.

With left padding the real tokens sit at positions $3$–$5$ and keys $1$, $2$ are blocked. Query $1$ may only see key $1$ (causal) but key $1$ is padding, so its row is empty, and likewise query $2$: their softmax is $0/0$ and produces NaN, which can spread into the loss and gradients. Implementations therefore either let padding queries see something harmless, or replace such rows with zeros after the softmax.
:::
:::
