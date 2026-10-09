Read the sentence *The animal didn’t cross the street because it was too tired*. To understand *it*, a reader has to look back and decide that it refers to *the animal* and not to *the street*. Change one word — *because it was too wide* — and the answer flips. The meaning of a word depends on other words, sometimes far away, and which ones matter depends on the content of the sentence, not on a fixed position.

A recurrent network handles this by passing a hidden state from word to word, so that information about *the animal* must survive seven steps of updates before it reaches *it*. Self-attention takes a direct route: every position computes, from its own content, how relevant every other position is, and then takes a weighted average of what those positions offer. Any two tokens are one step apart, and all positions are processed at once. This chapter builds the mechanism from a single idea — a lookup that returns an average instead of one entry — and explains the details that make it work, above all the division by $\sqrt{d_k}$.

## A soft dictionary lookup {#sec-lookup}

A Python dictionary stores pairs (key, value). A query is compared with every key, and the value whose key matches exactly is returned. Attention relaxes this in two ways: keys and queries are vectors, compared by a similarity score rather than tested for equality, and instead of returning one value the lookup returns an average of all values, weighted by how well each key matches. The weights come from the softmax function.

::: definition Softmax {#def-softmax}
For a vector of scores $\mathbf{z} = (z_1, \dots, z_n)\in\R^n$, the **softmax** is the probability vector

$$
\operatorname{softmax}(\mathbf{z})_i = \frac{e^{z_i}}{\sum_{j=1}^{n} e^{z_j}}, \qquad i = 1, \dots, n.
$$

With a **temperature** $\tau > 0$ it is $\operatorname{softmax}(\mathbf{z}/\tau)$.
:::

The softmax turns arbitrary real scores into positive weights that sum to one, keeps their order, and exaggerates differences: a score larger by one unit gets $e \approx 2.7$ times the weight. Adding the same constant to every score changes nothing, because the factor $e^c$ cancels between numerator and denominator; implementations use this to subtract $\max_j z_j$ before exponentiating, which avoids overflow. The temperature controls how decisive the weights are: as $\tau\to 0$ the softmax puts all its weight on the largest score (a hard lookup), and as $\tau\to\infty$ it tends to the uniform average.

::: example A softmax by hand {#ex-softmax}
Compute $\operatorname{softmax}(2, 1, 0)$, and the same scores at temperatures $\tau = 0.5$ and $\tau = 2$.
::: solution
$e^2 = 7.389$, $e^1 = 2.718$, $e^0 = 1$, with sum $11.107$, so

$$
\operatorname{softmax}(2,1,0) = (0.665,\ 0.245,\ 0.090).
$$

At $\tau = 0.5$ the scores become $(4, 2, 0)$ and the weights $(0.867, 0.117, 0.016)$: almost all the weight goes to the first entry. At $\tau = 2$ they become $(1, 0.5, 0)$ and the weights $(0.507, 0.307, 0.186)$, much closer to uniform. The ranking never changes; only its sharpness does.
:::
:::

## Scaled dot-product attention {#sec-sdpa}

Stack the queries as the rows of a matrix $Q$, the keys as the rows of $K$ and the values as the rows of $V$. The similarity of query $i$ and key $j$ is their dot product $\mathbf{q}_i\cdot\mathbf{k}_j$, so all similarities at once form the matrix $QK^\top$.

::: definition Scaled dot-product attention {#def-attention}
Let $Q\in\R^{n\times d_k}$ hold $n$ queries, $K\in\R^{m\times d_k}$ hold $m$ keys and $V\in\R^{m\times d_v}$ the corresponding values. **Scaled dot-product attention** is

$$
\operatorname{Attention}(Q, K, V) = \operatorname{softmax}\!\Big(\frac{QK^\top}{\sqrt{d_k}}\Big)\,V \in \R^{n\times d_v},
$$ {#eq-attention}

where the softmax is applied to each row separately. The matrix $A = \operatorname{softmax}(QK^\top/\sqrt{d_k})\in\R^{n\times m}$ is the **attention matrix**; its entry $A_{ij}$ is the weight that query $i$ gives to key $j$.
:::

Row $i$ of the output is $\sum_j A_{ij}\mathbf{v}_j$: the values, averaged with the weights that query $i$ assigns. Queries and keys must have the same dimension $d_k$ so that they can be compared; values may have a different dimension $d_v$, which becomes the output dimension. The scale $1/\sqrt{d_k}$ looks like a detail but is essential; [[#sec-scaling]] explains why.

The dot product $\mathbf{q}\cdot\mathbf{k} = \lVert\mathbf{q}\rVert\,\lVert\mathbf{k}\rVert\cos\theta$ is large when the two vectors point the same way, zero when they are perpendicular and negative when they point apart. A query therefore "asks for" a direction in the key space, and keys that lie along that direction answer most strongly.

::: widget projection
u: 3,1
v: 1,2
caption: Let $\mathbf{u}$ be a key and $\mathbf{v}$ a query. Their score $\mathbf{u}\cdot\mathbf{v}$ is the length of the projection of $\mathbf{v}$ onto $\mathbf{u}$ multiplied by $\lVert\mathbf{u}\rVert$. Drag $\mathbf{v}$ round: the score is largest when the query points along the key, zero when it is perpendicular and negative when it points away. Lengthening either vector scales the score — which is why large vectors give sharp attention.
:::

## Self-attention {#sec-self}

In **self-attention** the queries, keys and values all come from the same sequence. Each token's representation is projected three times, by three learned matrices, into the role of asker, of advertiser and of content.

::: definition Self-attention {#def-self-attention}
Let $X\in\R^{T\times d_{\text{model}}}$ hold the representations of $T$ tokens, one per row. With learned matrices $W_Q, W_K\in\R^{d_{\text{model}}\times d_k}$ and $W_V\in\R^{d_{\text{model}}\times d_v}$, put

$$
Q = XW_Q, \qquad K = XW_K, \qquad V = XW_V,
$$

and output $\operatorname{Attention}(Q, K, V)\in\R^{T\times d_v}$. The attention matrix is $T\times T$: every position attends to every position, itself included.
:::

Why three projections rather than comparing the token vectors directly? With $Q = K = V = X$ the score of a token with itself, $\lVert\mathbf{x}_i\rVert^2$, would usually be the largest, so each token would mostly attend to itself, and what a token looks for would be tied to what it contains. Separate projections let a pronoun look for nouns ($W_Q$), let nouns advertise that they are nouns ($W_K$) and let them pass on something else entirely, such as their meaning ($W_V$). All three matrices are learned by gradient descent with the rest of the network.

::: example Three tokens by hand {#ex-three-tokens}
Three tokens have queries, keys and values (with $d_k = d_v = 2$)

$$
Q = K = \begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}, \qquad V = \begin{pmatrix}1&0\\0&1\\2&2\end{pmatrix}.
$$

Compute the attention matrix and the output.
::: solution
The scores are

$$
QK^\top = \begin{pmatrix}1&0&1\\0&1&1\\1&1&2\end{pmatrix}, \qquad \frac{QK^\top}{\sqrt2} = \begin{pmatrix}0.707&0&0.707\\0&0.707&0.707\\0.707&0.707&1.414\end{pmatrix}.
$$

Row 1: $e^{0.707} = 2.028$, so the weights are $(2.028, 1, 2.028)/5.056 = (0.401, 0.198, 0.401)$. Rows 2 and 3 work the same way:

$$
A = \begin{pmatrix}0.401&0.198&0.401\\0.198&0.401&0.401\\0.248&0.248&0.504\end{pmatrix}, \qquad AV = \begin{pmatrix}1.203&1.000\\1.000&1.203\\1.255&1.255\end{pmatrix}.
$$

For instance row 1 of the output is $0.401(1,0) + 0.198(0,1) + 0.401(2,2) = (1.203, 1.000)$. Token 1 ignores token 2 (perpendicular key) but listens to token 3, whose key overlaps with its query; token 3, whose query matches its own key best, weights itself most. Each row of $A$ sums to $1$.
:::
:::

::: quiz
In a self-attention layer all $T$ keys happen to be identical. What is the output at each position?
- [ ] The value of the position itself
- [x] The average of all the value vectors, the same at every position
- [ ] The value vector with the largest norm
- [ ] It depends on the queries, which still differ
::: solution
If every key is the same vector $\mathbf{k}$, then each row of scores is constant, $(\mathbf{q}_i\cdot\mathbf{k}, \dots, \mathbf{q}_i\cdot\mathbf{k})$, and the softmax of a constant vector is uniform, $1/T$ everywhere. Every output row is therefore $\frac1T\sum_j\mathbf{v}_j$, whatever the queries are. Queries can only discriminate between keys that differ.
:::
:::

## Attention is a weighted average {#sec-average}

Because the weights in each row are positive and sum to one, every output is a **convex combination** of the value vectors: it lies inside their convex hull. Attention cannot extrapolate or amplify; it can only select and blend. Everything a layer adds to the representations beyond such blends comes from the projections and from the feed-forward layer that follows (see [[transformers/transformer-block]]).

There is one more property, which shapes the rest of the architecture. Nothing in [[#def-self-attention]] refers to the positions $1, \dots, T$ — the computation treats the input as a set.

::: proposition Self-attention is permutation-equivariant {#prop-permutation}
Let $P$ be a $T\times T$ permutation matrix, so that $PX$ lists the rows of $X$ in a different order. Then

$$
\operatorname{SelfAttention}(PX) = P\,\operatorname{SelfAttention}(X).
$$

Permuting the tokens permutes the outputs in the same way and changes nothing else.
:::

::: proof
The projections give $(PX)W_Q = PQ$, and likewise $PK$ and $PV$. The scores become $(PQ)(PK)^\top = P\,QK^\top P^\top$: the same matrix with rows and columns permuted. The row-wise softmax commutes with permuting rows (each row is processed independently) and with permuting the entries within each row (the softmax treats its inputs symmetrically), so $\operatorname{softmax}(P S P^\top/\sqrt{d_k}) = P A P^\top$. Hence the output is $PAP^\top\,PV = PA(P^\top P)V = PAV$, since $P^\top P = I$.
:::

::: warning Self-attention does not know word order
By [[#prop-permutation]], *dog bites man* and *man bites dog* produce the same three output vectors, merely in a different order. A Transformer must therefore be told where each token is; this is the job of the positional information in [[transformers/positional-encoding]]. Forgetting it is a classic bug in from-scratch implementations: the model still trains, but treats text as a bag of words.
:::

The softmax makes each weight depend on all the scores in its row: raising one key's score lowers the weight of every other key. The figure shows this competition for three keys.

::: widget plot
f: exp(x/t)/(exp(x/t)+exp(1/t)+1); exp(1/t)/(exp(x/t)+exp(1/t)+1); 1/(exp(x/t)+exp(1/t)+1)
x: -4, 6
y: 0, 1
sliders: t=1:0.1:5:0.1
labels: key 1 (score $x$); key 2 (score $1$); key 3 (score $0$)
caption: The attention weights of three keys with scores $x$, $1$ and $0$, as $x$ varies, at temperature $t$. The three curves always add up to $1$. Lower $t$ and the weights approach a hard choice of the largest score; raise it and they flatten towards the plain average $1/3$.
:::

## Why divide by the square root of the dimension {#sec-scaling}

Suppose the components of a query and a key behave like independent random numbers with mean $0$ and variance $1$ — roughly the situation at the start of training, when the projections are random and their inputs are normalised.

::: proposition The variance of a dot product {#prop-variance}
Let $\mathbf{q}, \mathbf{k}\in\R^{d}$ have independent components, each with mean $0$ and variance $1$. Then $\mathbf{q}\cdot\mathbf{k}$ has mean $0$ and variance $d$, so $\mathbf{q}\cdot\mathbf{k}/\sqrt{d}$ has mean $0$ and variance $1$.
:::

::: proof
$\mathbf{q}\cdot\mathbf{k} = \sum_{i=1}^{d} q_ik_i$. By independence $\E[q_ik_i] = \E[q_i]\E[k_i] = 0$ and $\Var(q_ik_i) = \E[q_i^2k_i^2] - 0 = \E[q_i^2]\E[k_i^2] = 1$. The $d$ products are independent, so their variances add: $\Var(\mathbf{q}\cdot\mathbf{k}) = d$. Dividing by $\sqrt d$ divides the variance by $d$.
:::

So without the scale, the scores of a head with $d_k = 64$ have a standard deviation of about $8$, and the gaps between them are typically several units. Why is that bad? Look at how the softmax responds to small changes in its input.

::: proposition The Jacobian of the softmax {#prop-softmax-jacobian}
Let $\mathbf{p} = \operatorname{softmax}(\mathbf{z})$. Then

$$
\frac{\partial p_i}{\partial z_j} = p_i(\delta_{ij} - p_j), \qquad\text{that is,}\qquad J = \operatorname{diag}(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top,
$$

where $\delta_{ij}$ is $1$ if $i = j$ and $0$ otherwise.
:::

::: proof
Write $p_i = e^{z_i}/S$ with $S = \sum_k e^{z_k}$, so $\partial S/\partial z_j = e^{z_j}$. By the quotient rule,

$$
\frac{\partial p_i}{\partial z_j} = \frac{\delta_{ij}e^{z_i}S - e^{z_i}e^{z_j}}{S^2} = p_i\delta_{ij} - p_ip_j.
$$
:::

If $\mathbf{p}$ is close to one-hot — one entry near $1$, the others near $0$ — then every entry of $J$ is close to $0$: $p_i(1 - p_i)\approx 0$ on the diagonal and $p_ip_j\approx 0$ off it. The softmax is **saturated**, and almost no gradient flows back through it to the queries and keys, so they stop learning. The scale $1/\sqrt{d_k}$ keeps the scores at unit spread whatever the head dimension, so the softmax starts in its responsive range.

::: example Saturation in numbers {#ex-saturation}
A head with $d_k = 64$ produces raw scores $(8, 0, -8)$ for one query — a typical spread of one standard deviation either way. Compare the softmax and its largest Jacobian entry with and without the scale $1/\sqrt{64} = 1/8$.
::: solution
Unscaled: $\operatorname{softmax}(8, 0, -8) = (0.99966, 0.00034, 0.0000001)$. The largest entry of $J$ is $p_1(1 - p_1)\approx 0.00034$.

Scaled: the scores become $(1, 0, -1)$, the weights $(0.665, 0.245, 0.090)$, and the largest Jacobian entry is $p_1(1-p_1) = 0.223$ — about $660$ times larger. In the unscaled head the gradient that reaches the query and key projections is hundreds of times smaller, and training stalls exactly where the model most needs to learn which tokens to attend to.
:::
:::

The same reasoning explains why the softmax temperature matters when a trained model samples text (see [[inference/decoding-sampling]]): dividing scores by a small number sharpens a distribution, and by a large number flattens it.

## Computing self-attention {#sec-code}

In code, self-attention is three matrix products, a softmax and one more product. Real implementations work on a batch of $B$ sequences at once, with tensors of shape $(B, T, d)$.

```python
import numpy as np

def softmax(z, axis=-1):
    z = z - z.max(axis=axis, keepdims=True)      # shift for numerical safety
    e = np.exp(z)
    return e / e.sum(axis=axis, keepdims=True)

def self_attention(X, W_q, W_k, W_v):
    # X: (B, T, d_model); W_q, W_k: (d_model, d_k); W_v: (d_model, d_v)
    Q = X @ W_q                                  # (B, T, d_k)
    K = X @ W_k                                  # (B, T, d_k)
    V = X @ W_v                                  # (B, T, d_v)
    d_k = Q.shape[-1]
    S = Q @ K.transpose(0, 2, 1) / np.sqrt(d_k)  # (B, T, T) scores
    A = softmax(S, axis=-1)                      # (B, T, T) rows sum to 1
    return A @ V, A                              # (B, T, d_v), (B, T, T)

rng = np.random.default_rng(0)
B, T, d_model, d_k = 2, 5, 16, 4
X = rng.standard_normal((B, T, d_model))
W_q, W_k, W_v = (rng.standard_normal((d_model, d_k)) / np.sqrt(d_model) for _ in range(3))
out, A = self_attention(X, W_q, W_k, W_v)
print(out.shape, A.shape, np.allclose(A.sum(-1), 1))   # (2, 5, 4) (2, 5, 5) True
```

The scaling by $1/\sqrt{d_{\text{model}}}$ in the random initialisation keeps the entries of $Q$, $K$ and $V$ at unit scale, the assumption behind [[#prop-variance]]. Deep-learning libraries provide a fused function for the last three lines — in PyTorch, `torch.nn.functional.scaled_dot_product_attention` — which computes the same result faster and with less memory; [[transformers/attention-complexity]] explains how.

::: example Sizes in a realistic layer {#ex-sizes}
GPT-2 small uses $d_{\text{model}} = 768$ and heads of dimension $d_k = d_v = 64$, with contexts of up to $T = 1024$ tokens. For one head and one sequence of full length, give the shapes of $W_Q$, $Q$ and $A$, the number of entries in $A$, and the number of multiply–add operations needed for $QK^\top$.
::: solution
$W_Q$ is $768\times64$ (that is $49{,}152$ parameters), $Q$ is $1024\times 64$, and $A$ is $1024\times1024$, with $1{,}048{,}576$ entries. Each entry of $QK^\top$ is a dot product of length $64$, so $QK^\top$ costs $1024\cdot1024\cdot64 = 67{,}108{,}864$ multiply–adds. The value product $AV$ costs the same again. Both grow with $T^2$: doubling the context quadruples them, while the projections grow only linearly in $T$.
:::
:::

## Why attention replaced recurrence {#sec-why}

Self-attention was not adopted because it is cheaper — for long sequences it is not — but because of how information travels. The original Transformer paper compared three ways to build a layer over a sequence of length $T$ with width $d$:

| layer | work per layer | sequential steps | longest path between two positions |
|---|---|---|---|
| self-attention | $O(T^2 d)$ | $O(1)$ | $O(1)$ |
| recurrent | $O(T d^2)$ | $O(T)$ | $O(T)$ |
| convolution, width $w$ | $O(w\,T d^2)$ | $O(1)$ | $O(\log_w T)$ |

A recurrent layer must process the tokens one after another, so training cannot be spread over the positions of a sequence, and a dependency between distant tokens must be carried through many updates, which is where gradients vanish. Self-attention connects every pair of positions directly and computes all of them at once with matrix products, which GPUs execute very efficiently. The price is the $T^2$ term, the subject of [[transformers/attention-complexity]] and [[transformers/efficient-attention]].

::: warning Attention weights are not explanations
It is tempting to read the attention matrix as the reason for a prediction: *the model attended to "animal", so that is why it resolved "it"*. Jain and Wallace (2019) showed that very different attention patterns can often produce the same predictions, and Wiegreffe and Pinter (2019) that the question needs careful experiments rather than inspection. Attention weights say how values were mixed in one head of one layer; the output also depends on the values themselves, on other heads, and on every later layer. Use attention maps as hints, and test causal claims with the interventions of [[interpretability/causal-interventions]].
:::

::: history
Attention entered neural networks as a way for a translation model to look back at its input. Bahdanau, Cho and Bengio (2014) scored each encoder state against the decoder state with a small network ("additive" attention), and Luong, Pham and Manning (2015) used dot products ("multiplicative" attention). In the same years, memory-augmented networks — the Neural Turing Machine of Graves, Wayne and Danihelka (2014) and the memory networks of Weston, Chopra and Bordes (2014) — read from memory by content-based addressing, and key–value memory networks (Miller et al., 2016) separated the vectors used for matching from those returned. A sequence attending to itself ("intra-attention") was used for reading and sentence representations by Cheng, Dong and Lapata (2016), Parikh et al. (2016) and Lin et al. (2017). Vaswani et al. (2017) combined these threads into scaled dot-product self-attention, introduced the $1/\sqrt{d_k}$ factor with the argument of [[#prop-variance]], and built the Transformer from attention alone.
:::

::: summary
- Attention is a soft dictionary lookup: each query scores every key, the softmax turns the scores into weights, and the output is the weighted average of the values.
- $\operatorname{Attention}(Q, K, V) = \operatorname{softmax}(QK^\top/\sqrt{d_k})\,V$; in self-attention $Q$, $K$ and $V$ are three learned projections of the same sequence, and the attention matrix is $T\times T$ with rows summing to $1$.
- Each output is a convex combination of the values, and self-attention is permutation-equivariant: it ignores word order unless positions are supplied.
- Dot products of $d_k$-dimensional vectors grow like $\sqrt{d_k}$; dividing by $\sqrt{d_k}$ keeps the softmax out of saturation, where its Jacobian $\operatorname{diag}(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$ vanishes.
- Self-attention connects any two positions in one step and runs in parallel over the sequence, at a cost that grows with $T^2$.
:::

## Exercises

::: exercise Softmax of three scores {level=1 check="exp(2)/(exp(2)+exp(1)+1)"}
Compute $\operatorname{softmax}(2, 1, 0)$ exactly, in terms of $e$. What is its first component?
::: solution
$\operatorname{softmax}(2,1,0) = \dfrac{(e^2, e, 1)}{e^2 + e + 1}$. The first component is $e^2/(e^2 + e + 1) \approx 7.389/11.107 \approx 0.665$.
:::
:::

::: exercise Counting entries {level=1 check="100"}
A self-attention layer receives $T = 10$ tokens with $d_{\text{model}} = 512$ and uses $d_k = d_v = 64$. Give the shapes of $W_Q$, $Q$, $K^\top$, $A$ and the output. How many entries does the attention matrix have?
::: solution
$W_Q$ is $512\times64$, $Q$ is $10\times64$, $K^\top$ is $64\times10$, $A = \operatorname{softmax}(QK^\top/8)$ is $10\times10$ and the output $AV$ is $10\times64$. The attention matrix has $10\cdot10 = 100$ entries — one for every ordered pair of positions.
:::
:::

::: exercise Shifting the scores {level=1}
Show that $\operatorname{softmax}(\mathbf{z} + c\mathbf{1}) = \operatorname{softmax}(\mathbf{z})$ for every real $c$, and explain why implementations subtract $\max_j z_j$ before exponentiating. What would happen in 32-bit floating point to $\operatorname{softmax}(100, 101)$ computed naively?
::: solution
$e^{z_i + c}/\sum_j e^{z_j + c} = e^ce^{z_i}/(e^c\sum_je^{z_j}) = e^{z_i}/\sum_je^{z_j}$. Subtracting the maximum makes every exponent $\le 0$, so no $e^{z}$ overflows and the largest term is exactly $1$. Naively, $e^{100}\approx 2.7\times10^{43}$ already exceeds the largest 32-bit float (about $3.4\times10^{38}$), so both exponentials become infinity and the result is $\infty/\infty$, which is NaN. After the shift the input is $(-1, 0)$ and the answer is $(0.269, 0.731)$.
:::
:::

::: exercise The spread of raw scores {level=1 check="4"}
Queries and keys have $d_k = 16$ independent components with mean $0$ and variance $1$. What is the standard deviation of the raw score $\mathbf{q}\cdot\mathbf{k}$, and of the scaled score?
::: solution
By [[#prop-variance]] the raw score has variance $16$, so standard deviation $\sqrt{16} = 4$; the scaled score $\mathbf{q}\cdot\mathbf{k}/4$ has standard deviation $1$.
:::
:::

::: exercise When all keys agree {level=2 check="2"}
In a self-attention layer with three tokens, every key is the same vector, and the values are $(2, 0)$, $(4, 2)$ and $(0, 4)$. Find the output at each position. What is its first component?
::: solution
Identical keys give a constant row of scores at every position, so all weights are $1/3$ (as in the quick check above). Every output equals the mean of the values, $\frac13\big((2,0) + (4,2) + (0,4)\big) = (2, 2)$. Its first component is $2$, whatever the queries.
:::
:::

::: exercise One query, two keys {level=2 check="10*exp(sqrt(2))/(1+exp(sqrt(2)))"}
A query $\mathbf{q} = (2, 0)$ attends to keys $\mathbf{k}_1 = (1, 0)$ and $\mathbf{k}_2 = (0, 1)$ with values $\mathbf{v}_1 = (10, 0)$ and $\mathbf{v}_2 = (0, 10)$; here $d_k = 2$. Compute the attention weights and the output. What is the first component of the output?
::: solution
Raw scores $(2, 0)$, scaled by $1/\sqrt2$: $(\sqrt2, 0)$. The weights are $\big(e^{\sqrt2}, 1\big)/(e^{\sqrt2} + 1) = (0.804, 0.196)$, so the output is $0.804(10, 0) + 0.196(0, 10) = (8.04, 1.96)$. The first component is $10e^{\sqrt2}/(1 + e^{\sqrt2})\approx 8.04$.
:::
:::

::: exercise Temperature limits {level=2}
Let $\mathbf{z}\in\R^n$ have a unique largest entry $z_m$. Show that $\operatorname{softmax}(\mathbf{z}/\tau)$ tends to the one-hot vector $\mathbf{e}_m$ as $\tau\to0^+$ and to the uniform vector $(1/n, \dots, 1/n)$ as $\tau\to\infty$. What do these limits mean for attention?
::: solution
Divide numerator and denominator by $e^{z_m/\tau}$: $p_i = e^{(z_i - z_m)/\tau}/\sum_je^{(z_j - z_m)/\tau}$. For $i\ne m$, $z_i - z_m < 0$, so $e^{(z_i - z_m)/\tau}\to0$ as $\tau\to0^+$, while the $j = m$ term is $1$; hence $p_m\to1$ and $p_i\to0$. As $\tau\to\infty$ every exponent tends to $0$, every term to $1$, and $p_i\to1/n$. For attention, $\tau\to0$ is a hard lookup that returns the value of the best-matching key, and $\tau\to\infty$ ignores the query and averages all values. Learned attention lives between the two, and the scale $1/\sqrt{d_k}$ starts it in the middle.
:::
:::

::: exercise Equivariance with matrices {level=2}
Check [[#prop-permutation]] on the example of [[#ex-three-tokens]]: swap tokens 1 and 2 (so $P$ exchanges the first two rows), recompute the attention matrix, and confirm that it equals $PAP^\top$ and that the outputs are those of [[#ex-three-tokens]] with rows 1 and 2 exchanged.
::: solution
After the swap, $Q = K = \begin{pmatrix}0&1\\1&0\\1&1\end{pmatrix}$ and $V = \begin{pmatrix}0&1\\1&0\\2&2\end{pmatrix}$. The scores are $\begin{pmatrix}1&0&1\\0&1&1\\1&1&2\end{pmatrix}$ — by coincidence the same pattern, because the first two tokens play symmetric roles — so

$$
A' = \begin{pmatrix}0.401&0.198&0.401\\0.198&0.401&0.401\\0.248&0.248&0.504\end{pmatrix} = PAP^\top,
$$

as the symmetry of $A$ in its first two rows and columns confirms. The outputs are $A'V' = \begin{pmatrix}1.000&1.203\\1.203&1.000\\1.255&1.255\end{pmatrix}$, which are the rows of $AV$ with the first two exchanged. Nothing about the layer noticed that the tokens moved.
:::
:::

::: exercise The softmax Jacobian {level=3}
Using [[#prop-softmax-jacobian]], show that (a) every row of $J$ sums to $0$, and explain why; (b) the diagonal entries satisfy $0 < J_{ii}\le\frac14$; (c) $J$ is symmetric and positive semidefinite. What does (a) say about the gradient with respect to a score shift that is the same for all keys?
::: solution
(a) $\sum_j J_{ij} = p_i\sum_j(\delta_{ij} - p_j) = p_i(1 - 1) = 0$. Equivalently $J\mathbf{1} = \mathbf{0}$: adding the same amount to every score changes nothing (exercise 3), so the derivative in the direction $\mathbf{1}$ is zero.

(b) $J_{ii} = p_i(1 - p_i)$ with $0 < p_i < 1$, and $x(1 - x)\le\frac14$ with equality at $x = \frac12$.

(c) $J = \operatorname{diag}(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$ is symmetric. For any $\mathbf{u}$, $\mathbf{u}^\top J\mathbf{u} = \sum_ip_iu_i^2 - \big(\sum_ip_iu_i\big)^2$, which is the variance of $u$ under the distribution $\mathbf{p}$ and hence $\ge0$.

So gradients flowing back through the softmax never change the scores all together, only their differences; and when $\mathbf{p}$ is nearly one-hot, the variance of any $\mathbf{u}$ under $\mathbf{p}$ is nearly $0$, which is the saturation of [[#ex-saturation]].
:::
:::

::: exercise Attention as kernel smoothing {level=3}
Replace the dot-product score by a Gaussian similarity, $A_{ij}\propto\exp\big(-\lVert\mathbf{q}_i - \mathbf{k}_j\rVert^2/2\big)$. Show that

$$
\operatorname{softmax}_j\Big(-\tfrac12\lVert\mathbf{q}_i - \mathbf{k}_j\rVert^2\Big) = \operatorname{softmax}_j\Big(\mathbf{q}_i\cdot\mathbf{k}_j - \tfrac12\lVert\mathbf{k}_j\rVert^2\Big),
$$

and deduce that when all keys have the same norm, Gaussian attention and dot-product attention coincide. (This is the Nadaraya–Watson kernel regression of statistics: the output is a locally weighted average of the values.)
::: solution
Expand $-\frac12\lVert\mathbf{q}_i - \mathbf{k}_j\rVert^2 = -\frac12\lVert\mathbf{q}_i\rVert^2 + \mathbf{q}_i\cdot\mathbf{k}_j - \frac12\lVert\mathbf{k}_j\rVert^2$. The first term does not depend on $j$, so it is a constant shift of row $i$ and cancels in the softmax (exercise 3). If all $\lVert\mathbf{k}_j\rVert$ are equal, the last term is also constant in $j$ and cancels too, leaving $\operatorname{softmax}_j(\mathbf{q}_i\cdot\mathbf{k}_j)$. Attention can thus be read as a smoother that averages the values of the keys nearest to the query, with the projections learning what "near" should mean.
:::
:::

::: exercise A batched implementation {level=3}
Rewrite `self_attention` from [[#sec-code]] for PyTorch tensors using `torch.einsum`, and check numerically that it agrees with `torch.nn.functional.scaled_dot_product_attention(Q, K, V)` on random inputs of shape $(B, T, d_k) = (2, 5, 4)$.
::: solution
```python
import torch, torch.nn.functional as F

def attention(Q, K, V):
    # Q, K: (B, T, d_k); V: (B, T, d_v)
    S = torch.einsum('btd,bsd->bts', Q, K) / Q.shape[-1] ** 0.5   # (B, T, T)
    A = S.softmax(dim=-1)                                         # rows sum to 1
    return torch.einsum('bts,bsd->btd', A, V)                     # (B, T, d_v)

torch.manual_seed(0)
Q, K, V = (torch.randn(2, 5, 4) for _ in range(3))
print(torch.allclose(attention(Q, K, V), F.scaled_dot_product_attention(Q, K, V), atol=1e-6))  # True
```

The einsum `'btd,bsd->bts'` contracts the feature index $d$ for every batch $b$, query position $t$ and key position $s$, which is exactly $QK^\top$ per sequence; the second einsum is the weighted sum of values. The library function uses the same $1/\sqrt{d_k}$ scale by default.
:::
:::
