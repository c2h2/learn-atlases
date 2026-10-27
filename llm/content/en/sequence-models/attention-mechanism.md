The encoder–decoder of [[sequence-models/seq2seq]] squeezes the whole source into one vector and asks the decoder to unpack it. A human translator does something else: while writing each word of the translation, they look back at the part of the source it corresponds to. **Attention** gives the decoder that ability. At every output step it compares its current state with every encoder state, turns the comparisons into a probability distribution over source positions, and reads a weighted average of the encoder states — a context vector computed afresh for each output word. Nothing about the source needs to be forgotten, because the encoder states are all kept; the decoder learns *where to look*.

Attention was introduced for translation by Bahdanau, Cho and Bengio (2015) and refined by Luong, Pham and Manning (2015). It removed the bottleneck, made translation quality nearly independent of sentence length, and produced, as a by-product, soft **alignments** between source and target words that could be inspected. Two years later Vaswani et al. (2017) built a model from attention alone — the Transformer — and the vocabulary of that model (queries, keys, values, scaled dot products) is already present here. This chapter derives additive and multiplicative attention, computes them by hand, shows why attention shortens gradient paths, implements an attention-based encoder–decoder with a gradient check, and ends with attention as a soft dictionary lookup, which [[transformers/self-attention]] develops into self-attention.

## Attention over encoder states {#sec-attention}

Let the encoder produce states $\mathbf{h}_1, \dots, \mathbf{h}_S\in\R^{d_h}$ — usually from a bidirectional RNN, so that $\mathbf{h}_s$ describes source word $s$ in the context of the whole sentence ([[sequence-models/recurrent-networks#sec-variants]]). Let $\mathbf{s}\in\R^{d_s}$ be the decoder's state at the moment it must choose the next word.

::: definition Attention {#def-attention}
Given a **query** $\mathbf{s}$ and a **memory** of vectors $\mathbf{h}_1, \dots, \mathbf{h}_S$, an **attention** mechanism with score function $a$ computes

$$
e_j = a(\mathbf{s}, \mathbf{h}_j),\qquad
\alpha_j = \frac{\exp e_j}{\sum_{k=1}^S\exp e_k},\qquad
\mathbf{c} = \sum_{j=1}^S\alpha_j\mathbf{h}_j .
$$ {#eq-attention}

The $e_j$ are **scores** (or energies), the $\alpha_j$ **attention weights**, and $\mathbf{c}$ the **context vector**. In an encoder–decoder the query is the decoder state at step $t$, so each step has its own weights $\alpha_{tj}$ and context $\mathbf{c}_t$; the matrix $(\alpha_{tj})$ is the **alignment** matrix.
:::

The weights are non-negative and sum to $1$, so $\mathbf{c}$ is a convex combination of the encoder states — a point inside their convex hull. If one score is much larger than the others, $\alpha$ is nearly one-hot and $\mathbf{c}$ nearly copies one encoder state ("hard" attention to one word); if the scores are similar, $\mathbf{c}$ is an average. Everything in [[#eq-attention]] is differentiable, so the score function, the encoder and the decoder are trained together by backpropagation, with no supervision of where to attend.

### Additive attention {#sec-additive}

::: definition Additive (Bahdanau) attention {#def-additive}
**Additive attention** scores a query $\mathbf{s}\in\R^{d_s}$ against a memory vector $\mathbf{h}\in\R^{d_h}$ with a one-hidden-layer network,

$$
a(\mathbf{s}, \mathbf{h}) = \mathbf{v}^\top\tanh\big(W\mathbf{s} + U\mathbf{h}\big),
$$ {#eq-additive}

with parameters $W\in\R^{d_a\times d_s}$, $U\in\R^{d_a\times d_h}$ and $\mathbf{v}\in\R^{d_a}$. In Bahdanau et al.'s decoder the query at step $t$ is the *previous* decoder state $\mathbf{s}_{t-1}$, and the context enters the recurrence and the output:

$$
\mathbf{s}_t = f(\mathbf{s}_{t-1}, E[y_{t-1}], \mathbf{c}_t),\qquad p(y_t\mid y_{<t}, \mathbf{x}) = g(\mathbf{s}_t, E[y_{t-1}], \mathbf{c}_t).
$$
:::

The products $U\mathbf{h}_j$ do not depend on the decoder step, so they are computed once per source sentence; each step then costs $O(d_ad_s)$ for $W\mathbf{s}$ plus $O(Sd_a)$ for the scores. Bahdanau et al. used a bidirectional GRU encoder with $1{,}000$ units per direction and a GRU decoder of $1{,}000$ units, trained on English→French. Their model trained on sentences of up to $50$ words reached $26.75$ BLEU on the full test set, against $17.82$ for an encoder–decoder of the same size without attention, and — the decisive plot of the paper — its quality no longer collapsed on long sentences.

::: example Additive attention by hand {#ex-additive}
Let $d_s = d_h = d_a = 2$, $W = I$, $U = \begin{pmatrix}0.5 & -0.5\\ 1 & 0\end{pmatrix}$, $\mathbf{v} = (1, -1)$, the query $\mathbf{s} = (0.2, 0.4)$ and three encoder states $\mathbf{h}_1 = (1, 0)$, $\mathbf{h}_2 = (0, 1)$, $\mathbf{h}_3 = (1, 1)$. Compute the scores, weights and context.
::: solution
$W\mathbf{s} = (0.2, 0.4)$. Then $U\mathbf{h}_1 = (0.5, 1)$, $U\mathbf{h}_2 = (-0.5, 0)$, $U\mathbf{h}_3 = (0, 1)$, so the pre-activations are $(0.7, 1.4)$, $(-0.3, 0.4)$, $(0.2, 1.4)$. Applying tanh: $(0.6044, 0.8854)$, $(-0.2913, 0.3799)$, $(0.1974, 0.8854)$. Scores $e_j = \mathbf{v}^\top(\cdot) = $ first minus second component: $e = (-0.2810, -0.6713, -0.6880)$. Softmax: $\alpha = (0.4269, 0.2889, 0.2842)$. Context: $\mathbf{c} = 0.4269(1, 0) + 0.2889(0, 1) + 0.2842(1, 1) = (0.7111, 0.5731)$. The scores are close, so the weights are spread out; training would make $\mathbf{v}$, $W$, $U$ larger where sharper alignments help.
:::
:::

### Multiplicative attention {#sec-multiplicative}

Luong, Pham and Manning (2015) simplified the architecture and compared several score functions. Their decoder first updates its state $\mathbf{s}_t$ from $\mathbf{s}_{t-1}$ and $y_{t-1}$ as usual, then uses the *current* state as the query, and combines the context with it in an "attentional" layer before the softmax.

::: definition Multiplicative (Luong) attention {#def-multiplicative}
With the current decoder state $\mathbf{s}_t$ as query, **Luong attention** uses one of the scores

$$
a(\mathbf{s}_t, \mathbf{h}_j) = \begin{cases}\mathbf{s}_t^\top\mathbf{h}_j & \text{dot}\\ \mathbf{s}_t^\top W_a\mathbf{h}_j & \text{general (bilinear)}\\ \mathbf{v}^\top\tanh\big(W_a[\mathbf{s}_t; \mathbf{h}_j]\big) & \text{concat}\end{cases}
$$ {#eq-luong}

and predicts from the **attentional hidden state** $\tilde{\mathbf{s}}_t = \tanh\big(W_c[\mathbf{c}_t; \mathbf{s}_t]\big)$ via $p(y_t\mid y_{<t}, \mathbf{x}) = \operatorname{softmax}(W_y\tilde{\mathbf{s}}_t)$.
:::

The dot score needs no parameters and requires $d_s = d_h$; the general score allows different sizes and a learned similarity; concat is essentially additive attention. In a matrix form for all source positions at once, the general scores are $\mathbf{s}_t^\top W_aH^\top$ with $H\in\R^{S\times d_h}$ the stacked encoder states — one matrix–vector product, which is why multiplicative attention is faster on hardware built for matrix multiplication. Luong et al. also introduced **input feeding** (concatenating $\tilde{\mathbf{s}}_{t-1}$ to the next decoder input, so the decoder knows what it attended to before) and **local attention**, which attends only to a window of source positions around a predicted centre, with weights multiplied by a Gaussian. With local attention and an ensemble they reported $25.9$ BLEU on WMT'15 English→German, an improvement of $5$ BLEU over comparable systems without attention.

::: example Dot-product attention by hand {#ex-dot}
With dot scores, query $\mathbf{s} = (1, 0)$ and encoder states $\mathbf{h}_1 = (1, 1)$, $\mathbf{h}_2 = (0, 1)$, $\mathbf{h}_3 = (-1, 0.5)$, compute the weights and the context. What happens to the weights if the query is doubled?
::: solution
Scores $e = (1, 0, -1)$; softmax $\alpha = (0.6652, 0.2447, 0.0900)$. Context $\mathbf{c} = 0.6652(1, 1) + 0.2447(0, 1) + 0.0900(-1, 0.5) = (0.5752, 0.9550)$. Doubling the query doubles every score, $e = (2, 0, -2)$, which acts like halving the temperature ([[sequence-models/decoding-basics#def-temperature]]): $\alpha = (0.867, 0.117, 0.016)$, much sharper. With dot scores the *norm* of the query sets how peaked the attention is — the reason the Transformer divides scores by $\sqrt{d_k}$ ([[transformers/self-attention#prop-variance]]), since dot products of random $d$-dimensional vectors have variance growing with $d$.
:::
:::

::: widget plot
f: exp(-b*(x-m)^2)/sum(exp(-b*(k-m)^2), k, 1, 8)
x: 1, 8
y: 0, 1
sliders: m=4:1:8:0.1; b=1:0:6:0.05
points: 1,0; 2,0; 3,0; 4,0; 5,0; 6,0; 7,0; 8,0
caption: Attention weights over $S = 8$ source positions when the score is $e_j = -b(j - m)^2$: a query that "prefers" position $m$, with sharpness $b$ (read the curve at the marked integer positions; the weights there sum to $1$). With $b = 0$ all positions get $1/8$ and the context is a plain average; as $b$ grows the weight concentrates on the nearest position, approaching hard attention. Luong et al.'s local attention multiplies content-based weights by a Gaussian of exactly this shape around a predicted position $m$.
:::

## Why attention helps {#sec-why}

Attention changes two things: what information reaches the decoder, and how gradients reach the encoder.

::: proposition Gradients through attention {#prop-attn-grad}
For [[#eq-attention]], with $\bar{\mathbf{c}} = \partial\mathcal{L}/\partial\mathbf{c}$,

$$
\frac{\partial\mathcal{L}}{\partial e_j} = \alpha_j\big(\bar{\mathbf{c}}^\top\mathbf{h}_j - \bar{\mathbf{c}}^\top\mathbf{c}\big),\qquad
\frac{\partial\mathcal{L}}{\partial\mathbf{h}_j} = \alpha_j\,\bar{\mathbf{c}} + \frac{\partial\mathcal{L}}{\partial e_j}\,\frac{\partial a(\mathbf{s}, \mathbf{h}_j)}{\partial\mathbf{h}_j} .
$$ {#eq-attn-grad}

In particular every encoder state receives a gradient $\alpha_j\bar{\mathbf{c}}$ directly from the context, through a path of length one.
:::

::: proof
$\mathbf{c} = \sum_j\alpha_j\mathbf{h}_j$ depends on $\mathbf{h}_j$ in two ways: directly, with coefficient $\alpha_j$, and through the score $e_j$, which changes all the weights. For the weights, $\partial\mathcal{L}/\partial\alpha_j = \bar{\mathbf{c}}^\top\mathbf{h}_j$, and the softmax Jacobian $\partial\alpha_i/\partial e_j = \alpha_i(\delta_{ij} - \alpha_j)$ ([[transformers/self-attention#prop-softmax-jacobian]]) gives $\partial\mathcal{L}/\partial e_j = \sum_i\bar{\mathbf{c}}^\top\mathbf{h}_i\,\alpha_i(\delta_{ij} - \alpha_j) = \alpha_j\big(\bar{\mathbf{c}}^\top\mathbf{h}_j - \sum_i\alpha_i\bar{\mathbf{c}}^\top\mathbf{h}_i\big) = \alpha_j\big(\bar{\mathbf{c}}^\top\mathbf{h}_j - \bar{\mathbf{c}}^\top\mathbf{c}\big)$. By the fan-out rule ([[neural-networks/backpropagation#thm-backprop]]) the gradient on $\mathbf{h}_j$ is the sum of the direct term $\alpha_j\bar{\mathbf{c}}$ and the term through the score.
:::

The score gradient has a clean reading: position $j$'s score goes up when its state $\mathbf{h}_j$ is more aligned with the direction $\bar{\mathbf{c}}$ the loss wants the context to move in than the current context is. And the direct term is what removes the bottleneck for learning. Without attention, the loss at target position $t$ reaches source position $j$ through the remaining $S - j$ encoder steps and the $t$ decoder steps — a Jacobian product of length $S - j + t$, which vanishes geometrically ([[sequence-models/recurrent-networks#prop-jacobian]]). With attention there is a path of constant length, regardless of how far apart the two words are.

::: widget graph
nodes: e1@0,0; e2@1,0; e3@2,0; e4@3,0; d1@0.5,2; d2@1.5,2; d3@2.5,2
edges: e1>e2; e2>e3; e3>e4; e4>d1; d1>d2; d2>d3; e1>d1; e2>d1; e3>d1; e4>d1; e1>d2; e2>d2; e3>d2; e4>d2; e1>d3; e2>d3; e3>d3; e4>d3
algorithm: bfs
start: e1
caption: Paths from the first source position $e_1$ in an encoder–decoder with attention: recurrent edges along the encoder and decoder, and an attention edge from every encoder state to every decoder step. Breadth-first search from $e_1$ reaches every decoder state at distance $1$. Without the attention edges (imagine deleting them) $e_1$ would reach $d_3$ only after six steps, through $e_2, e_3, e_4, d_1, d_2$ — the path along which gradients vanish.
:::

::: quiz
In an encoder–decoder with attention, the decoder at step $t$ attends to $S$ encoder states. Which statement is correct?
- [ ] The context vector $\mathbf{c}_t$ is the same for every decoder step.
- [ ] The attention weights are trained with supervision from word alignments.
- [x] The context is a convex combination of the encoder states, and every encoder state gets a direct gradient proportional to its weight.
- [ ] Attention makes the decoder independent of its previous state.
::: solution
$\mathbf{c}_t = \sum_j\alpha_{tj}\mathbf{h}_j$ with weights that are non-negative and sum to one, recomputed at each step from the decoder's state; by [[#prop-attn-grad]] state $\mathbf{h}_j$ receives $\alpha_{tj}\bar{\mathbf{c}}_t$ directly. The weights are learned only from the translation loss (alignment supervision is possible but was not used in the original models), and the decoder remains recurrent.
:::
:::

::: example The cost of attention {#ex-cost}
For a source and target of $50$ tokens each, with $d_h = 2{,}000$ (bidirectional) and dot-style scores after projecting the query to $\R^{2000}$, count the multiply–adds for the scores and contexts of one sentence. How does this grow with length?
::: solution
Each of the $T = 50$ decoder steps computes $S = 50$ scores of $d_h = 2{,}000$ multiply–adds and a context of another $S\cdot d_h$: $2STd_h = 2\cdot50\cdot50\cdot2{,}000 = 10^7$ multiply–adds, plus the query projection, $Td_sd_h = 50\cdot1{,}000\cdot2{,}000 = 10^8$. The attention part is quadratic in length, $O(STd_h)$; for sentences it is a small fraction of the recurrent cells' $O((S + T)d^2)$, but for documents of thousands of tokens it dominates — the cost that [[transformers/attention-complexity]] analyses.
:::
:::

## An encoder–decoder with attention {#sec-code}

The listing adds Luong-style dot attention to the reversal model of [[sequence-models/seq2seq#sec-code]]: the decoder state $\mathbf{s}_t$ queries the encoder states, and the prediction is made from $\tilde{\mathbf{s}}_t = \tanh(W_c[\mathbf{c}_t; \mathbf{s}_t] + \mathbf{b}_c)$. The backward pass implements [[#eq-attn-grad]], sends the per-position gradients `d_enc` into the encoder's BPTT, and is checked against finite differences. Training is as before — the same data, seeds, learning rate and number of steps.

```python
import math, random

SYM = "abcd"; BOS, EOS = 4, 5; V = 6
H = 24
rng = random.Random(0)
def mat(r, c, s): return [[rng.gauss(0, s) for _ in range(c)] for _ in range(r)]
def mv(M, v): return [sum(m * x for m, x in zip(row, v)) for row in M]
def dot(a, b): return sum(x * y for x, y in zip(a, b))
P = {"Ee": mat(H, V, 0.5), "Ue": mat(H, H, 1 / math.sqrt(H)), "be": [0.0] * H,
     "Ed": mat(H, V, 0.5), "Ud": mat(H, H, 1 / math.sqrt(H)), "bd": [0.0] * H,
     "Wc": mat(H, 2 * H, 1 / math.sqrt(2 * H)), "bc": [0.0] * H,     # attentional layer
     "Wy": mat(V, H, 0.1), "by": [0.0] * V}

def cell(E, U, b, h, x):
    return [math.tanh(e[x] + u + bb) for e, u, bb in zip(E, mv(U, h), b)]
def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]

def attend(s, hs):
    """Dot-product attention of decoder state s (H,) over encoder states hs (S, H)."""
    alpha = softmax([dot(s, h) for h in hs])                  # (S,)
    c = [sum(a * h[j] for a, h in zip(alpha, hs)) for j in range(H)]   # (H,)
    return alpha, c

def step_out(P, s, hs):
    alpha, c = attend(s, hs)
    o = [math.tanh(v + b) for v, b in zip(mv(P["Wc"], c + s), P["bc"])]  # (H,)
    z = [u + b for u, b in zip(mv(P["Wy"], o), P["by"])]
    return alpha, c, o, z

def loss_grad(P, src, tgt):
    he = [[0.0] * H]
    for x in src: he.append(cell(P["Ee"], P["Ue"], P["be"], he[-1], x))
    enc = he[1:]                                               # (S, H) memory
    din, dout = [BOS] + tgt, tgt + [EOS]
    hd, cache, loss = [he[-1]], [], 0.0
    for x, y in zip(din, dout):
        hd.append(cell(P["Ed"], P["Ud"], P["bd"], hd[-1], x))
        alpha, c, o, z = step_out(P, hd[-1], enc)
        p = softmax(z); loss -= math.log(p[y]); cache.append((alpha, c, o, p))
    G = {k: ([[0.0] * len(v[0]) for _ in v] if isinstance(v[0], list) else [0.0] * len(v))
         for k, v in P.items()}
    d_enc = [[0.0] * H for _ in enc]                           # grads into encoder states
    ds_out = []                                                # grads into decoder states
    for t, ((alpha, c, o, p), y) in enumerate(zip(cache, dout)):
        s = hd[t + 1]
        dz = p[:]; dz[y] -= 1
        for k in range(V):
            G["by"][k] += dz[k]
            for j in range(H): G["Wy"][k][j] += dz[k] * o[j]
        do = [sum(P["Wy"][k][j] * dz[k] for k in range(V)) for j in range(H)]
        da = [d * (1 - v * v) for d, v in zip(do, o)]
        cs = c + s
        for i in range(H):
            G["bc"][i] += da[i]
            for j in range(2 * H): G["Wc"][i][j] += da[i] * cs[j]
        dcs = [sum(P["Wc"][i][j] * da[i] for i in range(H)) for j in range(2 * H)]
        dc, ds = dcs[:H], dcs[H:]
        dalpha = [dot(dc, h) for h in enc]
        m = dot(alpha, dalpha)
        de = [a * (g - m) for a, g in zip(alpha, dalpha)]      # softmax backward
        for si, h in enumerate(enc):
            for j in range(H):
                d_enc[si][j] += alpha[si] * dc[j] + de[si] * s[j]
                ds[j] += de[si] * h[j]
        ds_out.append(ds)
    def back(E, U, b, hs, xs, dh_out, dh, gE, gU, gb):
        for t in range(len(xs), 0, -1):
            if dh_out: dh = [a + c for a, c in zip(dh, dh_out[t - 1])]
            da = [d * (1 - h * h) for d, h in zip(dh, hs[t])]
            for i in range(H):
                gb[i] += da[i]; gE[i][xs[t - 1]] += da[i]
                for j in range(H): gU[i][j] += da[i] * hs[t - 1][j]
            dh = [sum(U[i][j] * da[i] for i in range(H)) for j in range(H)]
        return dh
    dh0 = back(P["Ed"], P["Ud"], P["bd"], hd, din, ds_out, [0.0] * H, G["Ed"], G["Ud"], G["bd"])
    back(P["Ee"], P["Ue"], P["be"], he, src, d_enc, dh0, G["Ee"], G["Ue"], G["be"])
    return loss, G

def greedy(P, src, max_len=12, show=False):
    h, enc = [0.0] * H, []
    for x in src: h = cell(P["Ee"], P["Ue"], P["be"], h, x); enc.append(h)
    out, x = [], BOS
    for _ in range(max_len):
        h = cell(P["Ed"], P["Ud"], P["bd"], h, x)
        alpha, c, o, z = step_out(P, h, enc)
        x = max(range(V), key=lambda k: z[k])
        if show: print("  ", "<eos>" if x == EOS else SYM[x], " ".join(f"{a:.2f}" for a in alpha))
        if x == EOS: break
        out.append(x)
    return out

def example(r):
    src = [r.randrange(4) for _ in range(r.randint(2, 5))]
    return src, src[::-1]

src, tgt = example(rng)
L, G = loss_grad(P, src, tgt)
for k, i, j in [("Ue", 1, 2), ("Ee", 0, src[0]), ("Wc", 3, 30), ("Ud", 2, 7)]:
    o = P[k][i][j]; P[k][i][j] = o + 1e-5; a = loss_grad(P, src, tgt)[0]
    P[k][i][j] = o - 1e-5; b = loss_grad(P, src, tgt)[0]; P[k][i][j] = o
    print(f"{k}[{i}][{j}]  backprop {G[k][i][j]: .8f}  numeric {(a - b) / 2e-5: .8f}")

lr = 0.05
for step in range(1, 20001):
    src, tgt = example(rng)
    L, G = loss_grad(P, src, tgt)
    n = math.sqrt(sum(g * g for v in G.values() for r in v for g in (r if isinstance(r, list) else [r])))
    c = min(1.0, 5.0 / n)
    for k in P:
        if isinstance(P[k][0], list):
            for r, gr in zip(P[k], G[k]):
                for j in range(len(r)): r[j] -= lr * c * gr[j]
        else:
            for j in range(len(P[k])): P[k][j] -= lr * c * G[k][j]
r = random.Random(7)
for n in range(2, 9):
    ok = sum(greedy(P, s) == s[::-1] for s in ([r.randrange(4) for _ in range(n)] for _ in range(200)))
    print(f"length {n}: free-running sequence accuracy {ok / 200:.3f}")
print("attention weights for source 'abcd' (one row per output token):")
greedy(P, [0, 1, 2, 3], show=True)
```

Output (about two minutes):

```
Ue[1][2]  backprop -0.00519286  numeric -0.00519286
Ee[0][2]  backprop -0.13625324  numeric -0.13625324
Wc[3][30]  backprop -0.07880990  numeric -0.07880990
Ud[2][7]  backprop  0.05131455  numeric  0.05131455
length 2: free-running sequence accuracy 1.000
length 3: free-running sequence accuracy 1.000
length 4: free-running sequence accuracy 1.000
length 5: free-running sequence accuracy 1.000
length 6: free-running sequence accuracy 0.295
length 7: free-running sequence accuracy 0.000
length 8: free-running sequence accuracy 0.000
attention weights for source 'abcd' (one row per output token):
   d 0.00 0.00 0.03 0.97
   c 0.00 0.04 0.94 0.01
   b 0.09 0.82 0.09 0.00
   a 0.91 0.09 0.01 0.00
   <eos> 0.88 0.11 0.00 0.01
```

The gradient check covers the encoder, the decoder and the attentional layer. Compared with the model without attention (whose lengths $4$ and $5$ scored $0.970$ and $0.965$), the attention model is perfect on all trained lengths, and the printed weights show why: the model has discovered, with no supervision, the **anti-diagonal alignment** of reversal — the first output attends to the last input with weight $0.97$, the second to the third, and so on. On the unseen length $6$ it is right $30\%$ of the time instead of $1.5\%$, but it still fails at lengths $7$ and $8$: attention removes the bottleneck on *what* the decoder can read, but the recurrent states that drive the queries have only ever counted up to five. Content-based attention knows nothing about positions except what the encoder writes into its states, a theme that returns with positional encodings in [[transformers/positional-encoding]].

::: warning "Attention weights explain the model's decision"
Alignment plots are vivid, and for translation they often match linguists' word alignments. But an attention weight says how much a vector contributed to a weighted average, not why the model produced its output. Jain and Wallace (2019) showed that for text classifiers, quite different attention distributions could often be substituted without changing the prediction; Wiegreffe and Pinter (2019) replied that this does not make attention meaningless and proposed stricter tests. The encoder state $\mathbf{h}_j$ mixes information from the whole sentence (it comes from a bidirectional RNN), so "attending to word $j$" is not "using only word $j$". Treat attention maps as one piece of evidence, to be checked against interventions ([[interpretability]]).
:::

## Attention as a soft dictionary lookup {#sec-lookup}

A Python dictionary maps a query to the value stored under the matching key. Attention is a differentiable version: compare the query with *every* key, and return a mixture of the values weighted by how well each key matches. In [[#eq-attention]] the encoder states served as both keys and values; separating the roles is the step from RNN attention to the Transformer.

::: definition Query–key–value attention {#def-qkv}
Given a query $\mathbf{q}\in\R^{d_k}$, keys $\mathbf{k}_1, \dots, \mathbf{k}_S\in\R^{d_k}$ and values $\mathbf{v}_1, \dots, \mathbf{v}_S\in\R^{d_v}$, **scaled dot-product attention** returns

$$
\operatorname{attn}(\mathbf{q}, K, V) = \sum_{j=1}^S\operatorname{softmax}_j\Big(\frac{\mathbf{q}^\top\mathbf{k}_j}{\sqrt{d_k}}\Big)\,\mathbf{v}_j .
$$ {#eq-qkv}

Luong's general score is the case $\mathbf{q} = \mathbf{s}_t$, $\mathbf{k}_j = W_a\mathbf{h}_j$, $\mathbf{v}_j = \mathbf{h}_j$ (without the scaling). Computing queries, keys and values as learned linear maps of the same sequence, $Q = XW_Q$, $K = XW_K$, $V = XW_V$, gives **self-attention**.
:::

The lookup picture explains the design. The key determines *whether* an item is retrieved, the value *what* is retrieved, so they need not be the same vector. If one key matches much better than the others, the softmax approaches a hard lookup; if several match, their values are blended. The scaling by $\sqrt{d_k}$ keeps the scores' variance independent of the dimension, so that the softmax neither saturates nor stays flat at initialisation ([[transformers/self-attention#sec-scaling]]).

The lookup has an older statistical ancestor. **Nadaraya–Watson kernel regression** (Nadaraya, 1964; Watson, 1964) predicts the response at a point $\mathbf{q}$ from training pairs $(\mathbf{k}_j, \mathbf{v}_j)$ by a weighted average of the responses, with weights given by a kernel $K$ that measures closeness: $\hat f(\mathbf{q}) = \sum_jK(\mathbf{q}, \mathbf{k}_j)\mathbf{v}_j/\sum_iK(\mathbf{q}, \mathbf{k}_i)$. With $K(\mathbf{q}, \mathbf{k}) = \exp(\mathbf{q}^\top\mathbf{k}/\sqrt{d_k})$ this *is* [[#eq-qkv]]; the difference is that in attention the queries, keys and values are themselves learned.

::: proposition Gaussian kernels and dot products {#prop-kernel}
If all keys have the same norm, $\lVert\mathbf{k}_j\rVert = r$, then Nadaraya–Watson regression with the Gaussian kernel $K(\mathbf{q}, \mathbf{k}) = \exp\big(-\lVert\mathbf{q} - \mathbf{k}\rVert^2/(2\sigma^2)\big)$ gives the same weights as dot-product attention with scores $\mathbf{q}^\top\mathbf{k}_j/\sigma^2$.
:::

::: proof
$-\lVert\mathbf{q} - \mathbf{k}_j\rVert^2/(2\sigma^2) = \big(-\lVert\mathbf{q}\rVert^2 - r^2 + 2\mathbf{q}^\top\mathbf{k}_j\big)/(2\sigma^2)$. The first two terms are the same for every $j$, and a constant added to all scores cancels in the normalisation (the softmax is shift-invariant). What remains is $\mathbf{q}^\top\mathbf{k}_j/\sigma^2$.
:::

So dot-product attention is a smoothing kernel in disguise, with the bandwidth $\sigma^2$ playing the role of temperature; the $\sqrt{d_k}$ of the Transformer is a choice of bandwidth. When key norms differ, dot products also favour long keys, which a Gaussian kernel would not.

Between 2015 and 2017 attention spread far beyond translation, often under other names. **Show, attend and tell** (Xu et al., 2015) attended over the regions of an image's convolutional feature map while generating a caption. **Listen, attend and spell** (Chan et al., 2016) and Chorowski et al. (2015) attended over audio frames in speech recognition. **Pointer networks** (Vinyals, Fortunato and Jaitly, 2015) used the attention distribution itself as the output — pointing at an input position — to solve combinatorial problems, and pointer-generator networks (See, Liu and Manning, 2017) mixed generating a word with copying one from the source in summarisation. Memory networks (Weston, Chopra and Bordes, 2015) and the neural Turing machine (Graves, Wayne and Danihelka, 2014) read from external memories by attention. Several models applied attention *within* one sequence — the LSTM-network of Cheng, Dong and Lapata (2016), the decomposable attention model of Parikh et al. (2016) and the structured self-attentive sentence embedding of Lin et al. (2017) — before Vaswani et al. (2017) dropped the recurrence entirely.

::: example From RNN attention to self-attention {#ex-self}
A sentence of $S = 6$ tokens has encoder states $H\in\R^{6\times512}$. (a) Write the shapes in Luong general attention for one decoder step with $\mathbf{s}_t\in\R^{512}$. (b) Now let every *encoder* position query every other with $Q = HW_Q$, $K = HW_K$, $V = HW_V$, $W_\bullet\in\R^{512\times64}$. Give the shapes of $Q$, $K$, $V$, the score matrix and the output, and the number of parameters.
::: solution
(a) $W_aH^\top$ is $(512\times512)(512\times6) = 512\times6$; the scores $\mathbf{s}_t^\top W_aH^\top$ are $1\times6$; the weights $1\times6$; the context $\alpha H$ is $1\times512$. Parameters: $512^2 = 262{,}144$ in $W_a$.
(b) $Q, K, V$ are each $6\times64$; the scores $QK^\top/\sqrt{64}$ are $6\times6$, one row per querying token; after a row-wise softmax the output $\operatorname{softmax}(QK^\top/8)V$ is $6\times64$, a new representation of every token computed from all the others. Parameters: $3\cdot512\cdot64 = 98{,}304$. Nothing in (b) is recurrent: all six rows are computed at once, which is what made the Transformer fast to train ([[transformers/self-attention]]).
:::
:::

::: history
Soft, differentiable attention had precursors: Alex Graves's handwriting-synthesis network (2013) used a learned soft window over the text to be written, and the idea of a network choosing where to look goes back to work on visual attention in the 1980s and 1990s. Dzmitry Bahdanau, Kyunghyun Cho and Yoshua Bengio's "Neural machine translation by jointly learning to align and translate" (posted September 2014, ICLR 2015) introduced attention into the encoder–decoder; Bahdanau was then an intern in Bengio's lab in Montreal. Minh-Thang Luong, Hieu Pham and Christopher Manning's "Effective approaches to attention-based neural machine translation" (EMNLP 2015) introduced global and local attention with multiplicative scores. Within two years attention-based LSTM encoder–decoders were in production translation systems (Wu et al., 2016), and "Attention is all you need" (Vaswani et al., NeurIPS 2017) showed that attention without recurrence was enough.
:::

::: summary
- **Attention** computes scores $e_j = a(\mathbf{s}, \mathbf{h}_j)$ between a query and every memory vector, weights $\alpha = \operatorname{softmax}(e)$, and a context $\mathbf{c} = \sum_j\alpha_j\mathbf{h}_j$ — a fresh convex combination of encoder states for each output step.
- **Additive** (Bahdanau) scores $\mathbf{v}^\top\tanh(W\mathbf{s} + U\mathbf{h})$ use the previous decoder state; **multiplicative** (Luong) scores $\mathbf{s}^\top\mathbf{h}$ or $\mathbf{s}^\top W_a\mathbf{h}$ use the current state and are cheaper as matrix products.
- Attention removes the fixed-size bottleneck and gives every encoder state a direct gradient $\alpha_j\bar{\mathbf{c}}$; translation quality stopped collapsing on long sentences.
- The weights form a soft **alignment**, learned without supervision; they are evidence about the model, not an explanation of it.
- Separating **queries, keys and values** and scaling by $\sqrt{d_k}$ gives scaled dot-product attention; applying it within one sequence is self-attention, the core of the Transformer.
:::

## Exercises

::: exercise Weights from scores {level=1 check="exp(2)/(exp(2)+exp(1)+1)"}
Scores $e = (2, 1, 0)$ over three encoder states. What is the weight of the first state?
::: solution
$\alpha_1 = e^2/(e^2 + e + 1) = 7.389/11.107 = 0.665$.
:::
:::

::: exercise A context vector {level=1 check="0.6*1+0.3*0+0.1*(-2)"}
With weights $(0.6, 0.3, 0.1)$ and scalar encoder states $h = (1, 0, -2)$, what is the context?
::: solution
$c = 0.6\cdot1 + 0.3\cdot0 + 0.1\cdot(-2) = 0.4$.
:::
:::

::: exercise Parameters of additive and general attention {level=1 check="1000*1000+1000*2000+1000"}
With decoder state size $d_s = 1{,}000$, encoder state size $d_h = 2{,}000$ and $d_a = 1{,}000$, how many parameters does additive attention [[#eq-additive]] have? How many does Luong's general score?
::: solution
Additive: $W$ is $1{,}000\times1{,}000$, $U$ is $1{,}000\times2{,}000$, $\mathbf{v}$ has $1{,}000$ entries: $1{,}000{,}000 + 2{,}000{,}000 + 1{,}000 = 3{,}001{,}000$. General: $W_a$ is $1{,}000\times2{,}000 = 2{,}000{,}000$.
:::
:::

::: exercise Uniform attention {level=2}
Show that if all scores are equal, the context is the mean of the encoder states and the gradient with respect to each score is $\frac1S\bar{\mathbf{c}}^\top(\mathbf{h}_j - \bar{\mathbf{h}})$, where $\bar{\mathbf{h}}$ is the mean. Interpret the result for training at initialisation.
::: solution
Equal scores give $\alpha_j = 1/S$, so $\mathbf{c} = \frac1S\sum_j\mathbf{h}_j = \bar{\mathbf{h}}$. By [[#eq-attn-grad]], $\partial\mathcal{L}/\partial e_j = \frac1S(\bar{\mathbf{c}}^\top\mathbf{h}_j - \bar{\mathbf{c}}^\top\bar{\mathbf{h}}) = \frac1S\bar{\mathbf{c}}^\top(\mathbf{h}_j - \bar{\mathbf{h}})$. At initialisation, attention is close to uniform; the gradient raises the score of positions whose states deviate from the average in the direction the loss wants the context to move. Positions that look like the average receive no push either way, so the alignment is learned from the differences between encoder states.
:::
:::

::: exercise Dot attention and norms {level=2}
With dot scores, show that scaling all encoder states by $\lambda > 0$ changes the attention weights, and that replacing the score by the cosine similarity $\mathbf{s}^\top\mathbf{h}_j/(\lVert\mathbf{s}\rVert\lVert\mathbf{h}_j\rVert)$ makes them invariant to rescaling but bounds every score in $[-1, 1]$. Why is the bound a problem, and how is it usually fixed?
::: solution
Scaling every $\mathbf{h}_j$ by $\lambda$ multiplies every score by $\lambda$, which acts as temperature $1/\lambda$ on the softmax: the weights become sharper for $\lambda > 1$ and flatter for $\lambda < 1$ (their order is unchanged). The cosine score is unchanged by any positive rescaling of $\mathbf{s}$ or $\mathbf{h}_j$, but lies in $[-1, 1]$, so the largest possible ratio of two weights is $e^{2}\approx7.4$: the attention can never be sharp, however clearly one position matches. The usual fix is a learned (or fixed) temperature, $\operatorname{softmax}(g\cos(\mathbf{s}, \mathbf{h}_j))$ with a scale $g$, as in some normalised-attention variants.
:::
:::

::: exercise Path lengths with and without attention {level=2 check="5-1+4"}
A source has $S = 5$ tokens and the decoder is at target step $t = 4$. Counting one edge per recurrent step and one for the context, how many steps separate source token $1$ from the decoder state $\mathbf{s}_4$ in a model without attention (the context is the last encoder state, which initialises the decoder)? How many with attention?
::: solution
Without attention: from $\mathbf{h}_1$ to $\mathbf{h}_5$ is $4$ encoder steps; $\mathbf{h}_5$ initialises $\mathbf{s}_0$, and from $\mathbf{s}_0$ to $\mathbf{s}_4$ is $4$ decoder steps: $(S - 1) + t = 8$. With attention, $\mathbf{h}_1$ enters $\mathbf{c}_4$ directly, which feeds $\mathbf{s}_4$ (Bahdanau) or the prediction at step $4$ (Luong): one step.
:::
:::

::: exercise The softmax Jacobian in attention {level=2}
For the weights of [[#ex-dot]], $\alpha = (0.6652, 0.2447, 0.0900)$, compute the Jacobian $\partial\alpha/\partial e$ and check that each row sums to zero. Why must it?
::: solution
$J_{ij} = \alpha_i(\delta_{ij} - \alpha_j)$. Row 1: $(0.6652\cdot0.3348, -0.6652\cdot0.2447, -0.6652\cdot0.0900) = (0.2227, -0.1628, -0.0599)$. Row 2: $(-0.1628, 0.2447\cdot0.7553, -0.0220) = (-0.1628, 0.1848, -0.0220)$. Row 3: $(-0.0599, -0.0220, 0.0900\cdot0.9100) = (-0.0599, -0.0220, 0.0819)$. Each row sums to $0$ (up to rounding). It must, because adding the same constant to every score leaves the softmax unchanged, so the derivative along the direction $(1, 1, 1)$ is zero: $J\mathbf{1} = \mathbf{0}$. The matrix is also symmetric.
:::
:::

::: exercise Hard attention {level=3}
Instead of the average $\sum_j\alpha_j\mathbf{h}_j$, **hard attention** samples one position $j\sim\alpha$ and uses $\mathbf{c} = \mathbf{h}_j$. Show that $\E[\mathbf{c}]$ equals the soft context, explain why the sampled $\mathbf{c}$ cannot be differentiated with respect to the scores, and derive the score-function (REINFORCE) estimator $\nabla_e\E_{j\sim\alpha}[\mathcal{L}(\mathbf{h}_j)] = \E_{j\sim\alpha}\big[\mathcal{L}(\mathbf{h}_j)\nabla_e\log\alpha_j\big]$ with $\partial\log\alpha_j/\partial e_i = \delta_{ij} - \alpha_i$.
::: solution
$\E[\mathbf{c}] = \sum_j\alpha_j\mathbf{h}_j$, the soft context. For a fixed random draw (say $j$ chosen by comparing a uniform number with the cumulative weights), the sampled $\mathbf{c}$ is a piecewise-constant function of the scores, jumping from one $\mathbf{h}_j$ to another; its derivative is zero wherever it exists and carries no information. Instead differentiate the expectation: $\nabla_e\sum_j\alpha_j\mathcal{L}(\mathbf{h}_j) = \sum_j\mathcal{L}(\mathbf{h}_j)\nabla_e\alpha_j = \sum_j\alpha_j\mathcal{L}(\mathbf{h}_j)\nabla_e\log\alpha_j$, using $\nabla\alpha_j = \alpha_j\nabla\log\alpha_j$; this is an expectation under $\alpha$, estimated by sampling. From $\log\alpha_j = e_j - \log\sum_ke^{e_k}$, $\partial\log\alpha_j/\partial e_i = \delta_{ij} - \alpha_i$. The estimator is unbiased but high-variance, which is why Xu et al. (2015) needed baselines for their hard-attention captioner and why soft attention became standard.
:::
:::

::: exercise Attention with a key–value split {level=3}
Modify `attend` in the listing to use separate learned keys and values, $\mathbf{k}_j = W_K\mathbf{h}_j$ and $\mathbf{v}_j = W_V\mathbf{h}_j$ with $W_K, W_V\in\R^{H\times H}$, scores $\mathbf{s}^\top\mathbf{k}_j/\sqrt H$, and context $\sum_j\alpha_j\mathbf{v}_j$. Derive the gradients with respect to $W_K$ and $W_V$, and say which lines of the backward pass change.
::: solution
Let $\bar{\mathbf{c}}$ be the context gradient (the listing's `dc`) and $\bar e_j = \alpha_j(\bar{\mathbf{c}}^\top\mathbf{v}_j - \bar{\mathbf{c}}^\top\mathbf{c})$ the score gradient (`de`, now computed with `dalpha = [dot(dc, v) for v in values]`). Since $\mathbf{c} = \sum_j\alpha_jW_V\mathbf{h}_j$, $\partial\mathcal{L}/\partial W_V = \sum_j\alpha_j\bar{\mathbf{c}}\mathbf{h}_j^\top$. Since $e_j = \mathbf{s}^\top W_K\mathbf{h}_j/\sqrt H$, $\partial\mathcal{L}/\partial W_K = \sum_j\bar e_j\,\mathbf{s}\mathbf{h}_j^\top/\sqrt H$. The gradients into the inputs become $\partial\mathcal{L}/\partial\mathbf{h}_j = \alpha_jW_V^\top\bar{\mathbf{c}} + \bar e_jW_K^\top\mathbf{s}/\sqrt H$ (replacing `alpha[si] * dc[j] + de[si] * s[j]`) and $\partial\mathcal{L}/\partial\mathbf{s}\mathrel{+}=\sum_j\bar e_j\mathbf{k}_j/\sqrt H$ (replacing `de[si] * h[j]`). Summing these over decoder steps and adding a finite-difference check on one entry of each new matrix confirms the derivation.
:::
:::
