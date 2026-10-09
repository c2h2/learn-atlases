*Dog bites man* and *man bites dog* contain the same three words, but they report very different events. A model that reads only the set of words cannot tell them apart — and that is exactly what self-attention reads: by [[transformers/self-attention#prop-permutation]], shuffling the input tokens merely shuffles the outputs. A Transformer must be told where each token is.

There are two broad strategies. **Absolute** schemes attach to each token a vector that identifies its position, $1, 2, 3, \dots$, and let the network work out distances from those. **Relative** schemes change the attention scores so that they depend on how far apart two tokens are, which is usually what matters for language: an adjective modifies the noun *next to it*, wherever the pair occurs in the text. This chapter develops the main methods in historical order — learned and sinusoidal embeddings, relative biases, rotary position embedding (RoPE), which most current open models use, and ALiBi — and ends with how models are stretched to contexts longer than those they were trained on.

## Absolute position embeddings {#sec-absolute}

The simplest approach is to learn one vector per position. A model with context length $T_{\max}$ keeps a matrix $P\in\R^{T_{\max}\times d_{\text{model}}}$, and the input to the first layer at position $t$ is the token embedding plus row $t$ of $P$:

$$
\mathbf{x}_t = E[\text{token}_t] + P[t].
$$

BERT learned $512$ such vectors and GPT-2 $1024$. Learned embeddings are flexible, but they have two weaknesses: positions beyond $T_{\max}$ have no embedding at all, and positions that occur rarely in training (the last few hundred of a long context, if most training texts are short) get poorly trained vectors.

The original Transformer used fixed vectors built from sinusoids instead.

::: definition Sinusoidal position encoding {#def-sinusoidal}
For position $\text{pos}\in\{0, 1, 2, \dots\}$ and an even model dimension $d$, the **sinusoidal encoding** $\operatorname{PE}(\text{pos})\in\R^d$ has, for $i = 0, 1, \dots, d/2 - 1$,

$$
\operatorname{PE}(\text{pos})_{2i} = \sin(\omega_i\,\text{pos}), \qquad \operatorname{PE}(\text{pos})_{2i+1} = \cos(\omega_i\,\text{pos}), \qquad \omega_i = 10000^{-2i/d}.
$$

It is added to the token embedding at the input of the network.
:::

Each pair of coordinates is a clock hand turning at its own speed $\omega_i$: the first pair completes a turn every $2\pi\approx 6.3$ positions, the last one every $2\pi\cdot10000\approx 62{,}832$ positions. Together they give every position a distinct pattern, rather like the digits of a number in a mixed-radix system, with fast "digits" for fine position and slow ones for coarse position.

::: example The first encodings {#ex-sinusoid}
Write out $\operatorname{PE}(0)$ and $\operatorname{PE}(1)$ for $d = 4$.
::: solution
With $d = 4$ the frequencies are $\omega_0 = 1$ and $\omega_1 = 10000^{-1/2} = 0.01$. Then

$$
\operatorname{PE}(0) = (0, 1, 0, 1), \qquad \operatorname{PE}(1) = (\sin 1, \cos 1, \sin 0.01, \cos 0.01) = (0.841, 0.540, 0.010, 1.000).
$$

The first pair has turned by one radian; the second has hardly moved. Over a few hundred positions the second pair will move appreciably while the first spins round many times.
:::
:::

::: widget plot
f: sin(x/10000^(j/32)); cos(x/10000^(j/32))
x: 0, 200
y: -1.2, 1.2
sliders: j=0:0:31:1
labels: $\operatorname{PE}_{2j}$; $\operatorname{PE}_{2j+1}$
caption: The coordinates $2j$ and $2j+1$ of the sinusoidal encoding for $d = 64$, plotted against the position. Low $j$ oscillates fast and distinguishes neighbouring positions; high $j$ changes slowly and distinguishes distant regions of the text. No two positions share all $32$ pairs of values.
:::

Vaswani et al. chose sinusoids because they hoped the model could attend by *relative* position easily, and there is a precise reason for that hope.

::: proposition Shifting is a rotation {#prop-shift}
For every offset $k$ there is a matrix $M_k$, independent of $\text{pos}$, with $\operatorname{PE}(\text{pos} + k) = M_k\,\operatorname{PE}(\text{pos})$ for all $\text{pos}$. It is block diagonal with $2\times2$ blocks

$$
\begin{pmatrix}\cos\omega_ik & \sin\omega_ik\\ -\sin\omega_ik & \cos\omega_ik\end{pmatrix}, \qquad i = 0, \dots, d/2 - 1.
$$
:::

::: proof
For one pair write $a = \omega_i\,\text{pos}$ and $b = \omega_ik$. The addition formulas give

$$
\begin{pmatrix}\sin(a + b)\\ \cos(a + b)\end{pmatrix} = \begin{pmatrix}\sin a\cos b + \cos a\sin b\\ \cos a\cos b - \sin a\sin b\end{pmatrix} = \begin{pmatrix}\cos b & \sin b\\ -\sin b & \cos b\end{pmatrix}\begin{pmatrix}\sin a\\ \cos a\end{pmatrix}.
$$

The matrix depends on $k$ through $b$ but not on $\text{pos}$. Stacking the $d/2$ pairs gives $M_k$.
:::

So moving $k$ positions along is a fixed linear map, which a learned projection can in principle exploit. In practice, absolute encodings added to the input interact with the token content in every later layer, and the relative information is not cleanly available to attention. That motivated schemes that put distance into the attention scores directly.

## Relative position biases {#sec-relative}

Shaw, Uszkoreit and Vaswani (2018) let the score of query $i$ and key $j$ depend on a learned vector for the clipped distance $j - i$; Transformer-XL (Dai et al., 2019) refined the idea with sinusoidal relative terms. The T5 model (Raffel et al., 2019) used the simplest version: a learned scalar bias, one per head and per **bucket** of relative distance, added to the score,

$$
s_{ij} = \frac{\mathbf{q}_i\cdot\mathbf{k}_j}{\sqrt{d_k}} + b_{\text{bucket}(j - i)}.
$$

T5 used $32$ buckets: each small distance has its own bucket, and larger distances share logarithmically wider buckets, with everything beyond $128$ tokens in the last one. In T5's decoder, for instance, the distances $0$ to $15$ each have their own bucket, and the remaining $16$ buckets cover the distances from $16$ to $127$ on a logarithmic scale: the model distinguishes *three* tokens back from *four* tokens back, but not $100$ from $101$, which is rarely needed. Biases like these leave the token representations untouched and only change who attends to whom.

## Rotary position embedding {#sec-rope}

RoPE (Su et al., 2021) achieves relative attention by an elegant trick: instead of adding a position vector, it **rotates** the query and key vectors by angles proportional to their positions. Because rotating two vectors by the same angle leaves their dot product unchanged, only the *difference* of the angles — the relative position — survives in the score.

::: definition Rotary position embedding (RoPE) {#def-rope}
Let $d_k$ be even and $\theta_i = b^{-2i/d_k}$ for $i = 0, \dots, d_k/2 - 1$, with base $b$ (usually $10000$). For a position $m$ let $R_m\in\R^{d_k\times d_k}$ be block diagonal with $2\times2$ rotation blocks

$$
R_m = \operatorname{diag}\big(\rho(m\theta_0), \dots, \rho(m\theta_{d_k/2-1})\big), \qquad \rho(\alpha) = \begin{pmatrix}\cos\alpha & -\sin\alpha\\ \sin\alpha & \cos\alpha\end{pmatrix}.
$$

**RoPE** replaces the query at position $m$ by $R_m\mathbf{q}_m$ and the key at position $n$ by $R_n\mathbf{k}_n$, in every attention layer, before the scores are computed. The values are not rotated.
:::

::: proposition RoPE scores depend only on relative position {#prop-rope}
For all $\mathbf{q}, \mathbf{k}\in\R^{d_k}$ and positions $m, n$,

$$
(R_m\mathbf{q})\cdot(R_n\mathbf{k}) = \mathbf{q}\cdot(R_{n-m}\mathbf{k}).
$$
:::

::: proof
$(R_m\mathbf{q})\cdot(R_n\mathbf{k}) = \mathbf{q}^\top R_m^\top R_n\mathbf{k}$. The blocks are rotations, so $\rho(\alpha)^\top = \rho(-\alpha)$ and $\rho(-\alpha)\rho(\beta) = \rho(\beta - \alpha)$. Block by block, $R_m^\top R_n = \operatorname{diag}\big(\rho((n - m)\theta_i)\big) = R_{n-m}$.
:::

A rotation also preserves lengths, so RoPE changes neither the norm of a query nor that of a key — only the angle at which they meet. The same pair of tokens therefore gets the same score at positions $(3, 5)$ as at $(1003, 1005)$, which is the translation invariance that relative schemes are designed for, while the order still matters: $(5, 3)$ gives a different score from $(3, 5)$.

::: widget transform2d
matrix: cos(pi/6), -sin(pi/6); sin(pi/6), cos(pi/6)
vector: 2,1
caption: One pair of coordinates under RoPE: the rotation by $\alpha = \pi/6$ that a position $m$ applies when $m\theta_i = \pi/6$. Play the animation: the grid turns rigidly, every vector keeps its length and the angle between any two vectors is unchanged. A query rotated by $m\theta_i$ and a key rotated by $n\theta_i$ therefore meet at an angle that depends only on $n - m$.
:::

::: example RoPE in two dimensions {#ex-rope}
Take $d_k = 2$, a single frequency $\theta = 0.5$, the query $\mathbf{q} = (1, 0)$ and the key $\mathbf{k} = (1, 1)$. Compute the RoPE score for positions $(m, n) = (3, 5)$, $(10, 12)$ and $(5, 3)$.
::: solution
By [[#prop-rope]] the score is $\mathbf{q}\cdot\rho((n - m)\theta)\mathbf{k}$. For $(3, 5)$ and $(10, 12)$, $n - m = 2$ and the angle is $1$ radian:

$$
\rho(1)\begin{pmatrix}1\\1\end{pmatrix} = \begin{pmatrix}\cos1 - \sin1\\ \sin1 + \cos1\end{pmatrix} = \begin{pmatrix}-0.301\\1.382\end{pmatrix}, \qquad \text{score} = \cos1 - \sin1 = -0.301.
$$

Both pairs of positions give exactly $-0.301$. For $(5, 3)$ the angle is $-1$ and $\rho(-1)\mathbf{k} = (\cos1 + \sin1,\ \cos1 - \sin1) = (1.382, -0.301)$, so the score is $1.382$: the key two places *before* the query is scored very differently from the key two places *after* it. (With a causal mask only keys at or before the query are used, so this asymmetry is what a decoder sees.)
:::
:::

In code RoPE is applied by pairing coordinates and rotating each pair; with complex numbers a rotation by $\alpha$ is multiplication by $e^{\mathrm{i}\alpha}$, which gives a compact implementation.

```python
import torch

def rope(x, base=10000.0):
    # x: (B, h, T, d_k) queries or keys, d_k even
    B, h, T, d_k = x.shape
    theta = base ** (-torch.arange(0, d_k, 2).float() / d_k)          # (d_k/2,)
    angles = torch.arange(T).float()[:, None] * theta[None, :]          # (T, d_k/2): m * theta_i
    rot = torch.polar(torch.ones_like(angles), angles)                  # e^{i m theta_i}, (T, d_k/2)
    xc = torch.view_as_complex(x.float().reshape(B, h, T, d_k // 2, 2)) # pairs as complex numbers
    return torch.view_as_real(xc * rot).reshape(B, h, T, d_k)           # rotate, back to real pairs

torch.manual_seed(0)
q, k = torch.randn(1, 1, 16, 8), torch.randn(1, 1, 16, 8)
q[..., 3, :], k[..., 7, :] = q[..., 9, :], k[..., 13, :]                # same contents, shifted by 6
s = rope(q) @ rope(k).transpose(-2, -1)                                  # (1, 1, 16, 16) scores
print(torch.allclose(s[0, 0, 3, 7], s[0, 0, 9, 13], atol=1e-5))           # True: same offset, same score
```

The base $b$ sets the slowest frequency. With $d_k = 128$ and $b = 10000$, the slowest pair turns once every $2\pi\cdot10000^{126/128}\approx54{,}000$ positions, so positions far beyond a few thousand still get distinguishable angles in the slow pairs, while the fast pairs repeat every few tokens. Averaged over the pairs, the score between a query and a similar key tends to fall as their distance grows — the "long-term decay" that Su et al. pointed out.

Two practical details matter when RoPE meets real systems. First, a key's rotation depends only on its own position, so during generation each key is rotated once and stored, already rotated, in the KV cache ([[inference/kv-cache]]); each new query is rotated by its own position before it is compared with them. Second, some models rotate only part of each head: GPT-J applies RoPE to $64$ of the $256$ dimensions of each head and GPT-NeoX-20B to a quarter of them, leaving the remaining dimensions free to compare content without regard to position.

::: widget plot
f: sum(cos(x*b^(-k/16)), k, 0, 15)/16
x: 0, 400
y: -0.4, 1.05
sliders: b=10000:100:1000000:100
labels: score of $\mathbf{q} = \mathbf{k} = \mathbf{1}$, normalised
caption: The RoPE score of a query and a key that are both the all-ones vector in $d_k = 32$ dimensions (normalised so that it is $1$ at distance $0$), against their distance, for base $b$. The score falls with ripples as distance grows, because the fast pairs drift out of phase first. A larger base slows every rotation, which is one way long-context models adapt RoPE.
:::

::: quiz
Which of these position schemes leave the value vectors untouched and act only on how queries are compared with keys? (Select all that apply.)
- [x] RoPE
- [x] T5's relative bias buckets
- [x] ALiBi
- [ ] Sinusoidal encodings added to the input embeddings
::: solution
RoPE rotates queries and keys only; T5 biases and ALiBi add terms to the scores. Encodings added to the input change the token representation itself, so they flow into queries, keys *and* values in every layer.
:::
:::

::: warning RoPE is not an input embedding
A frequent implementation error is to apply RoPE once, to the token embeddings, like a sinusoidal encoding. RoPE must be applied to the queries and keys of every attention layer after their projections — and not to the values. Applied to the input it would be mixed by the projections and lose the property of [[#prop-rope]]; applied to the values it would make the *outputs* depend on absolute position.
:::

## ALiBi: a linear penalty for distance {#sec-alibi}

Press, Smith and Lewis (2021) proposed an even simpler relative scheme with no position vectors and no learned parameters.

::: definition ALiBi {#def-alibi}
**Attention with linear biases** subtracts from each score a penalty proportional to the distance between query $i$ and key $j\le i$:

$$
s_{ij} = \frac{\mathbf{q}_i\cdot\mathbf{k}_j}{\sqrt{d_k}} - m_h\,(i - j),
$$

with a fixed slope $m_h$ for head $h$. For $H$ heads the slopes form the geometric sequence $2^{-8/H}, 2^{-16/H}, \dots, 2^{-8}$; for $H = 8$ they are $\tfrac12, \tfrac14, \dots, \tfrac1{256}$.
:::

Heads with a steep slope attend locally; heads with a gentle slope can see far back. The authors showed that a model trained with ALiBi on sequences of $1024$ tokens kept working on longer sequences at test time, which learned and sinusoidal embeddings did not — the title of the paper is *Train Short, Test Long*. ALiBi was used in BLOOM and other models of 2022–2023, though RoPE has since become the more common choice.

::: example ALiBi biases {#ex-alibi}
In a model with $8$ heads using ALiBi, compute the bias added to the score of a query and a key $10$ positions earlier, in head $1$ and in head $8$. By how much is the weight of that key reduced, relative to a key at distance $0$ with the same raw score?
::: solution
Head 1 has slope $\tfrac12$, so the bias is $-\tfrac12\cdot10 = -5$, and the weight is multiplied by $e^{-5}\approx0.0067$ relative to the distance-$0$ key: this head is almost blind beyond a few tokens. Head 8 has slope $\tfrac1{256}$, bias $-10/256 = -0.039$, factor $e^{-0.039}\approx0.96$: this head barely cares about distance.
:::
:::

Not all models need explicit positions. In a *causal* decoder, position $t$ attends to exactly $t$ keys, and that alone leaks positional information: Haviv et al. (2022) found that decoders trained with no position encoding at all ("NoPE") learn position nearly as well as those with one. Exercise 11 shows how.

## Longer contexts than in training {#sec-extend}

Pretraining on long sequences is expensive, so models are usually pretrained at a moderate length (for example $4096$ tokens) and adapted afterwards. With RoPE, positions beyond the training range produce rotation angles the model has never seen in the slow pairs, and quality collapses. **Position interpolation** (Chen et al., 2023) rescales positions instead: to extend a context from $L$ to $sL$ tokens, position $m$ is rotated by the angles of position $m/s$. All angles then stay within the trained range, at the cost of packing positions more tightly, and a short fine-tuning run — about a thousand steps in the original experiments — lets the model adapt. Refinements change the base $b$ or scale the frequencies unevenly (for example YaRN, by Peng et al., 2023), keeping the fast pairs, which encode local order, almost untouched. [[inference/long-context]] returns to these methods.

A longer window does not guarantee that a model uses all of it. Liu et al. (2023) found that language models retrieve information placed at the beginning or the end of a long input much more reliably than information in the middle. Long-context models are therefore evaluated by placing the relevant facts at many depths and lengths, rather than by quoting the nominal size of the window ([[evaluation/benchmarks]]).

::: example Learned versus rotary {#ex-params}
How many parameters do the learned position embeddings of GPT-2 small ($T_{\max} = 1024$, $d_{\text{model}} = 768$) have, and how many does RoPE add to a model? What happens in each case at position $1500$?
::: solution
The learned table is $1024\times768 = 786{,}432$ parameters. RoPE adds none: its angles are fixed functions of the position. At position $1500$ GPT-2 has no embedding to look up at all, so the input cannot even be formed; a RoPE model can compute the rotation, but if it was trained only up to $1024$ the slow pairs reach angles it has never seen, and quality degrades unless positions are interpolated as above.
:::
:::

::: history
Position embeddings were learned in the convolutional sequence-to-sequence model of Gehring et al. (2017); the Transformer paper (Vaswani et al., 2017) proposed the sinusoidal encoding and reported that it worked as well as learned embeddings. BERT (2018) and GPT-2 (2019) nevertheless used learned absolute embeddings. Relative positions entered attention with Shaw, Uszkoreit and Vaswani (2018), were developed in Transformer-XL (Dai et al., 2019), and reduced to learned scalar biases in T5 (Raffel et al., 2019). Jianlin Su and colleagues introduced rotary position embedding in the RoFormer paper (2021); it was adopted by EleutherAI's GPT-J (2021) and GPT-NeoX-20B (2022), then by PaLM and LLaMA, and is now the default in open models. Press, Smith and Lewis published ALiBi in 2021. Haviv et al. (2022) showed that causal decoders learn position without any encoding. Chen et al. (2023) introduced position interpolation for extending RoPE models, and Peng et al. (2023) the YaRN family of frequency-scaling methods.
:::

::: summary
- Self-attention is order-blind, so positions must be supplied. Absolute schemes label each position; relative schemes make scores depend on distance.
- Learned absolute embeddings (BERT, GPT-2) cannot represent positions beyond their table; sinusoidal encodings use clocks at geometrically spaced speeds, and a shift by $k$ positions is a fixed rotation of the encoding.
- RoPE rotates each pair of query and key coordinates by an angle proportional to the position, in every layer; the score $(R_m\mathbf{q})\cdot(R_n\mathbf{k}) = \mathbf{q}\cdot R_{n-m}\mathbf{k}$ depends only on the offset, and the values are untouched.
- ALiBi subtracts a head-specific linear penalty $m_h(i - j)$ from the scores and adds no parameters; T5 adds learned biases per distance bucket.
- Contexts can be extended beyond the training length by interpolating RoPE positions or rescaling its frequencies, followed by brief fine-tuning.
:::

## Exercises

::: exercise The slowest clock {level=1 check="2*pi*10000"}
What are the shortest and the longest wavelengths (in positions) of the sinusoidal encoding of [[#def-sinusoidal]], for large $d$? Give the longest one.
::: solution
The wavelength of pair $i$ is $2\pi/\omega_i = 2\pi\cdot10000^{2i/d}$. The shortest is $2\pi\approx6.28$ (at $i = 0$); the longest, at $i = d/2 - 1$, is $2\pi\cdot10000^{(d-2)/d}$, which approaches $2\pi\cdot10000\approx62{,}832$ for large $d$.
:::
:::

::: exercise Position zero {level=1 check="4"}
Write down $\operatorname{PE}(0)$ for $d = 8$. What is the sum of its components?
::: solution
$\sin0 = 0$ and $\cos0 = 1$ in every pair: $\operatorname{PE}(0) = (0, 1, 0, 1, 0, 1, 0, 1)$, with sum $4$.
:::
:::

::: exercise A position table {level=1 check="786432"}
A model has learned absolute position embeddings for $T_{\max} = 1024$ positions and $d_{\text{model}} = 768$. How many parameters is that?
::: solution
$1024\cdot768 = 786{,}432$.
:::
:::

::: exercise An ALiBi penalty {level=1 check="-5"}
In an $8$-head model with ALiBi, what bias does head $1$ add to the score of a key $10$ positions before the query?
::: solution
The slope of head $1$ is $2^{-8/8} = \tfrac12$, so the bias is $-\tfrac12\cdot10 = -5$, as in [[#ex-alibi]].
:::
:::

::: exercise Shifts compose {level=2}
Using [[#prop-shift]], show that $M_kM_l = M_{k+l}$ and $M_k^\top = M_{-k}$, and deduce that $\operatorname{PE}(\text{pos})\cdot\operatorname{PE}(\text{pos} + k)$ does not depend on $\text{pos}$. What is this dot product for $k = 0$?
::: solution
Each block of $M_k$ is a rotation by $-\omega_ik$ (in the orientation of [[#prop-shift]]), and rotations by $\alpha$ and $\beta$ compose to a rotation by $\alpha + \beta$, so $M_kM_l = M_{k+l}$; a rotation's transpose is its inverse, so $M_k^\top = M_{-k}$. Then $\operatorname{PE}(\text{pos})\cdot\operatorname{PE}(\text{pos} + k) = \operatorname{PE}(\text{pos})^\top M_k\operatorname{PE}(\text{pos})$, and in each pair this is $\cos(\omega_ik)(\sin^2a + \cos^2a) = \cos(\omega_ik)$ (the $\sin$ terms cancel), independent of $\text{pos}$. Summing, $\operatorname{PE}(\text{pos})\cdot\operatorname{PE}(\text{pos}+k) = \sum_i\cos(\omega_ik)$, which is $d/2$ for $k = 0$ — the squared length of every encoding.
:::
:::

::: exercise Same offset, same score {level=2 check="cos(1)-sin(1)"}
In [[#ex-rope]], compute the RoPE score for positions $(m, n) = (10, 12)$ directly from the definition — rotate $\mathbf{q}$ by $10\theta$ and $\mathbf{k}$ by $12\theta$ — and confirm that it equals the value from [[#prop-rope]].
::: solution
$\rho(5)\mathbf{q} = (\cos5, \sin5)$ and $\rho(6)\mathbf{k} = (\cos6 - \sin6,\ \sin6 + \cos6)$. Their dot product is $\cos5\cos6 - \cos5\sin6 + \sin5\sin6 + \sin5\cos6 = \cos(6 - 5) - \sin(6 - 5) = \cos1 - \sin1\approx-0.301$, using $\cos5\cos6 + \sin5\sin6 = \cos1$ and $\sin5\cos6 - \cos5\sin6 = \sin(5 - 6) = -\sin1$. This agrees with [[#ex-rope]].
:::
:::

::: exercise The slowest rotary pair {level=2 check="2*pi*10000^(126/128)"}
For RoPE with $d_k = 128$ and base $10000$, find the angular frequency $\theta_{63}$ of the slowest pair and its wavelength in positions.
::: solution
$\theta_{63} = 10000^{-126/128}\approx1.155\times10^{-4}$ radians per position, so the wavelength is $2\pi/\theta_{63} = 2\pi\cdot10000^{126/128}\approx54{,}410$ positions.
:::
:::

::: exercise Add or concatenate? {level=2}
Sinusoidal encodings are *added* to token embeddings rather than concatenated to them. Argue that adding loses little: (a) show that if the token embeddings and the encodings lie in orthogonal subspaces of $\R^d$, a linear map can recover each from their sum; (b) explain why, in high dimensions, a learned embedding and a fixed encoding are nearly orthogonal even without being forced to be. What does concatenation cost?
::: solution
(a) If $\mathbf{e}\in U$ and $\mathbf{p}\in U^\perp$, the orthogonal projections $\Pi_U$ and $\Pi_{U^\perp}$ are linear and give $\Pi_U(\mathbf{e} + \mathbf{p}) = \mathbf{e}$ and $\Pi_{U^\perp}(\mathbf{e} + \mathbf{p}) = \mathbf{p}$; the projections $W_Q$, $W_K$, $W_V$ can learn to contain such maps. (b) Two unrelated vectors in high dimension have a cosine close to $0$ (for random directions it is of order $1/\sqrt d$), so the model can use the two signals almost independently. Concatenation would avoid all interference but would enlarge every representation and every weight matrix that reads it, raising parameters and FLOPs, for little gain.
:::
:::

::: exercise RoPE with complex numbers {level=3}
Identify each pair $(x_{2i}, x_{2i+1})$ with the complex number $z_i = x_{2i} + \mathrm{i}\,x_{2i+1}$. Show that rotating by $\alpha$ is multiplication by $e^{\mathrm{i}\alpha}$, that the real dot product of two vectors is $\operatorname{Re}\sum_i\overline{z_i}w_i$, and use these facts to give a one-line proof of [[#prop-rope]].
::: solution
$e^{\mathrm{i}\alpha}(a + \mathrm{i}b) = (a\cos\alpha - b\sin\alpha) + \mathrm{i}(a\sin\alpha + b\cos\alpha)$, which is the vector $\rho(\alpha)(a, b)$. For vectors $\mathbf{x}\leftrightarrow(z_i)$ and $\mathbf{y}\leftrightarrow(w_i)$, $\overline{z_i}w_i = (a - \mathrm{i}b)(c + \mathrm{i}d)$ has real part $ac + bd$, the contribution of pair $i$ to $\mathbf{x}\cdot\mathbf{y}$. Hence

$$
(R_m\mathbf{q})\cdot(R_n\mathbf{k}) = \operatorname{Re}\sum_i\overline{e^{\mathrm{i}m\theta_i}q_i}\,e^{\mathrm{i}n\theta_i}k_i = \operatorname{Re}\sum_i\overline{q_i}\,e^{\mathrm{i}(n - m)\theta_i}k_i = \mathbf{q}\cdot(R_{n-m}\mathbf{k}).
$$

This is exactly how the code in [[#sec-rope]] computes RoPE.
:::
:::

::: exercise Interpolating positions {level=3}
A RoPE model was trained with contexts of $L = 4096$ tokens, and position interpolation extends it to $16{,}384$. (a) What scale factor $s$ is used, and to which "virtual" position is position $10{,}000$ mapped? (b) For the fastest pair ($\theta_0 = 1$), how far apart in angle are two adjacent tokens before and after interpolation? (c) Why might this hurt, and how do methods like YaRN respond?
::: solution
(a) $s = 16384/4096 = 4$; position $10{,}000$ is rotated as position $2500$, inside the trained range. (b) Before, adjacent tokens differ by $\theta_0 = 1$ radian in the fastest pair; after, by $1/4$ radian. (c) The fast pairs carry fine, local order, and the model has learned to read differences of about one radian there; compressing them by four blurs neighbouring positions, which costs quality until the model is fine-tuned. YaRN and related methods therefore scale the slow pairs (which would otherwise leave the trained range) strongly and leave the fast pairs (which already cycle many times within the training length) nearly unscaled.
:::
:::

::: exercise Position without encodings {level=3}
A causal decoder has no position encoding, but its input always begins with a special start token whose embedding has a $1$ in some coordinate where every other token has $0$. Construct one attention head whose output at position $t$ contains the number $1/t$, and explain why later layers can therefore recover the position.
::: solution
Use a head whose query and key projections are zero, so every score is $0$ and causal attention at position $t$ is uniform over keys $1, \dots, t$, each with weight $1/t$. Let the value projection copy the special coordinate: the value is $1$ at the start token and $0$ elsewhere. The output at position $t$ is then $\frac1t\cdot1 + \frac1t\cdot0 + \dots = 1/t$. This number is different at every position, and later layers (with feed-forward non-linearities) can turn it into whatever positional features they need. Without the causal mask every position would see all $T$ keys and receive $1/T$, the same everywhere — which is why "NoPE" works in decoders but not in bidirectional encoders.
:::
:::
