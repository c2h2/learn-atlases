An $n$-gram model ([[text-and-language/ngram-models]]) predicts the next token from a window of the last $n - 1$ tokens and forgets everything before it. Widening the window is hopeless: the number of possible contexts grows as $\lvert\mathcal{V}\rvert^{n-1}$, so almost every long context is unseen. A feed-forward neural language model shares statistical strength between similar contexts through embeddings, but its window is still fixed. A **recurrent neural network** (RNN) takes a different route. It reads the sequence one token at a time and carries a **hidden state** — a vector of fixed size that is updated at every step and is meant to summarise everything read so far. The same weights are used at every position, so one network handles sequences of any length, and its prediction can in principle depend on tokens arbitrarily far back.

This chapter defines the simple (Elman) recurrent network, unrolls it into an ordinary computation graph, turns it into a language model, and derives its training algorithm, **backpropagation through time** (BPTT), from the backpropagation of [[neural-networks/backpropagation]]. The derivation exposes a product of Jacobians whose size decides whether information from early tokens can influence learning at all; the next chapter, [[sequence-models/long-range-dependencies]], is about what goes wrong with that product and how gated cells fix it. We finish with a complete RNN language model in plain Python, gradient-checked, whose failure on a toy corpus previews that problem.

## The recurrence {#sec-recurrence}

Write the input sequence as vectors $\mathbf{x}_1, \dots, \mathbf{x}_T\in\R^{d}$ — for text, the embeddings of the tokens (or one-hot vectors, in which case the input weight matrix *is* the embedding table).

::: definition Simple recurrent network {#def-elman}
A **simple recurrent network** (Elman network) with hidden size $H$ has parameters $W_{xh}\in\R^{H\times d}$, $W_{hh}\in\R^{H\times H}$, $\mathbf{b}_h\in\R^H$, $W_{hy}\in\R^{K\times H}$, $\mathbf{b}_y\in\R^K$ and an initial state $\mathbf{h}_0$ (usually $\mathbf{0}$). For $t = 1, \dots, T$ it computes

$$
\mathbf{a}_t = W_{hh}\mathbf{h}_{t-1} + W_{xh}\mathbf{x}_t + \mathbf{b}_h,\qquad
\mathbf{h}_t = \tanh(\mathbf{a}_t),\qquad
\mathbf{z}_t = W_{hy}\mathbf{h}_t + \mathbf{b}_y ,
$$ {#eq-elman}

with $\tanh$ applied elementwise. The vector $\mathbf{h}_t\in\R^H$ is the **hidden state** at step $t$ and $\mathbf{z}_t\in\R^K$ the output (logits) at step $t$.
:::

Three properties make this the basic sequence model of deep learning.

- **Weight sharing across time.** The same $W_{hh}$, $W_{xh}$, $W_{hy}$ act at every step, just as a convolution uses the same kernel at every position ([[neural-networks/convolutional-networks]]). The number of parameters, $H^2 + Hd + HK + H + K$, does not depend on $T$.
- **A fixed-size state.** Everything the network can use about $\mathbf{x}_1, \dots, \mathbf{x}_t$ must be packed into $H$ numbers. That is a bottleneck and a strength: the cost per step does not grow with the length of the past.
- **Sequential computation.** $\mathbf{h}_t$ needs $\mathbf{h}_{t-1}$, so the $T$ steps of one sequence cannot be computed in parallel. The matrix products inside a step, and different sequences of a batch, can.

The update is a nonlinear dynamical system driven by the input. Its power is considerable in principle: Siegelmann and Sontag (1995) showed that a recurrent network with rational weights, a saturated-linear activation and unbounded numerical precision can simulate any Turing machine. With finite precision and finite training data that statement says little about what a trained network will actually do, which is the practical question of this course.

::: example A forward pass by hand {#ex-forward}
Take a scalar RNN ($H = d = 1$) with $w_{hh} = 0.5$, $w_{xh} = 1$, $b_h = 0$, $h_0 = 0$ and inputs $x = (1, -1, 2)$. Compute $h_1, h_2, h_3$.
::: solution
$h_1 = \tanh(0.5\cdot0 + 1) = \tanh 1 = 0.761594$.
$h_2 = \tanh(0.5\cdot0.761594 - 1) = \tanh(-0.619203) = -0.550573$.
$h_3 = \tanh(0.5\cdot(-0.550573) + 2) = \tanh(1.724714) = 0.938428$.

The state at step 3 depends on all three inputs, but with weights that shrink as we go back: changing $x_1$ changes $h_3$ only through two multiplications by $w_{hh} = 0.5$ and two tanh slopes. This is the first glimpse of the decay studied in [[#sec-jacobians]].
:::
:::

### Unrolling {#sec-unrolling}

For a given length $T$, the recurrence can be written out as a feed-forward computation graph with $T$ copies of the cell, one per step, all sharing the same parameters. This **unrolled** graph ([[neural-networks/backpropagation#def-graph]]) is acyclic, so everything we know about backpropagation applies to it; the only new feature is that one parameter feeds many nodes.

::: widget graph
nodes: h0@0,1; x1@1,0; h1@1,1; y1@1,2; x2@2,0; h2@2,1; y2@2,2; x3@3,0; h3@3,1; y3@3,2; L@4,2.6
edges: h0>h1; x1>h1; h1>y1; h1>h2; x2>h2; h2>y2; h2>h3; x3>h3; h3>y3; y1>L; y2>L; y3>L
algorithm: topo
start: h0
caption: An RNN unrolled over three steps. Each $h_t$ is computed from $h_{t-1}$ and $x_t$ by the same cell, each output $y_t$ (logits and per-step loss) from $h_t$, and the total loss $L$ sums the per-step losses. Step through the topological sort: the forward pass must visit $h_1, h_2, h_3$ in order. Backpropagation through time visits them in reverse, and $h_1$ has two children ($y_1$ and $h_2$), so its gradient collects a contribution from its own output and one from the future.
:::

Unrolling also shows the shapes of computation the same cell supports. A **many-to-one** network reads a whole sequence and uses only $\mathbf{h}_T$ (sentiment classification). A **many-to-many** network emits an output at every step (tagging each word with its part of speech, or predicting the next token). A **one-to-many** network starts from a single input — an image embedding as $\mathbf{h}_0$ in early captioning models — and emits a sequence. The encoder–decoder of [[sequence-models/seq2seq]] chains a many-to-one reader and a one-to-many writer.

## Recurrent language models {#sec-lm}

A language model factorises the probability of a token sequence by the chain rule, $p(x_1, \dots, x_T) = \prod_tp(x_t\mid x_{<t})$. An RNN supplies each conditional from its state.

::: definition RNN language model {#def-rnnlm}
An **RNN language model** over vocabulary $\mathcal{V}$ feeds the embedding $\mathbf{x}_t = E[x_t]$ of each token into the recurrence [[#eq-elman]] with $K = \lvert\mathcal{V}\rvert$ outputs, and reads the next-token distribution from the softmax of the logits:

$$
p_\theta(x_{t+1} = v\mid x_{\le t}) = \operatorname{softmax}(\mathbf{z}_t)_v .
$$

It is trained by minimising the summed cross-entropy of a training sequence,

$$
\mathcal{L}(\theta) = \sum_{t=1}^{T}\ell_t,\qquad \ell_t = -\log p_\theta(x_{t+1}\mid x_{\le t}),
$$ {#eq-lm-loss}

and evaluated by the perplexity $\exp(\mathcal{L}/T)$ on held-out text ([[text-and-language/perplexity]]).
:::

During training the input at step $t + 1$ is the true token $x_{t+1}$ from the data, not the model's own prediction; this is **teacher forcing**, and it makes all $T$ losses available from one forward pass over the sequence. At generation time there is no data: the model samples $x_{t+1}$ from its own distribution and feeds it back in. The mismatch between the two regimes is called **exposure bias**, and it is discussed in [[sequence-models/seq2seq]] and [[sequence-models/decoding-basics]].

Where an $n$-gram model needs a separate count for every context, the RNN shares everything: the embedding places similar tokens near each other, and the recurrence maps similar histories to similar states. Mikolov and colleagues (2010) reported that recurrent language models lowered perplexity substantially compared with smoothed $n$-gram models and reduced word error rates in speech recognition, and RNNs (later LSTMs) remained the standard neural language model until the Transformer.

::: example Counting parameters {#ex-params}
A word-level RNN language model has $\lvert\mathcal{V}\rvert = 10{,}000$, embedding size $d = 256$ and $H = 512$. How many parameters does it have, and where are they?
::: solution
Embedding $E$: $10{,}000\times256 = 2{,}560{,}000$. Recurrent cell: $W_{xh}$ is $512\times256 = 131{,}072$, $W_{hh}$ is $512^2 = 262{,}144$, $\mathbf{b}_h$ is $512$, together $393{,}728$. Output layer: $W_{hy}$ is $10{,}000\times512 = 5{,}120{,}000$ plus $10{,}000$ biases. Total $8{,}083{,}728$.

The recurrence itself is under $5\%$ of the model; the vocabulary-sized input and output matrices dominate. That is why **weight tying** (using $E$ as the output matrix, which needs $H = d$ or a projection; Press and Wolf, 2017; Inan et al., 2017) saves so much. For comparison, a trigram model over the same vocabulary has $10^{12}$ possible contexts-and-continuations, of which a corpus can fill only a vanishing fraction.
:::
:::

## Backpropagation through time {#sec-bptt}

Training needs $\partial\mathcal{L}/\partial\theta$. Since the unrolled network is an ordinary computation graph, backpropagation applied to it — under the name **backpropagation through time** (Werbos, 1990; Rumelhart, Hinton and Williams, 1986) — computes the gradient exactly. The interesting part is the structure of the result.

Write $\boldsymbol\delta_t = \partial\mathcal{L}/\partial\mathbf{a}_t\in\R^H$ for the error at the pre-activation of step $t$, and $\mathbf{g}_t = \partial\ell_t/\partial\mathbf{z}_t = \mathbf{p}_t - \mathbf{e}_{x_{t+1}}$ for the output error of step $t$ (prediction minus one-hot target, [[neural-networks/backpropagation#thm-mlp-backprop]]).

::: theorem Backpropagation through time {#thm-bptt}
For the network [[#eq-elman]] with loss [[#eq-lm-loss]], define $\boldsymbol\delta_{T+1} = \mathbf{0}$ and, for $t = T, T - 1, \dots, 1$,

$$
\bar{\mathbf{h}}_t = W_{hy}^\top\mathbf{g}_t + W_{hh}^\top\boldsymbol\delta_{t+1},\qquad
\boldsymbol\delta_t = \bar{\mathbf{h}}_t\odot\big(1 - \mathbf{h}_t\odot\mathbf{h}_t\big).
$$ {#eq-bptt}

Then the gradients are sums over time,

$$
\frac{\partial\mathcal{L}}{\partial W_{hy}} = \sum_{t=1}^T\mathbf{g}_t\mathbf{h}_t^\top,\quad
\frac{\partial\mathcal{L}}{\partial W_{hh}} = \sum_{t=1}^T\boldsymbol\delta_t\mathbf{h}_{t-1}^\top,\quad
\frac{\partial\mathcal{L}}{\partial W_{xh}} = \sum_{t=1}^T\boldsymbol\delta_t\mathbf{x}_t^\top,\quad
\frac{\partial\mathcal{L}}{\partial\mathbf{b}_h} = \sum_{t=1}^T\boldsymbol\delta_t,
$$ {#eq-bptt-grads}

and $\partial\mathcal{L}/\partial\mathbf{b}_y = \sum_t\mathbf{g}_t$. For an embedding input, $\partial\mathcal{L}/\partial\mathbf{x}_t = W_{xh}^\top\boldsymbol\delta_t$ is added to row $x_t$ of $E$.
:::

::: proof
Apply [[neural-networks/backpropagation#thm-backprop]] to the unrolled graph, in reverse topological order. The hidden state $\mathbf{h}_t$ has two children: the logits $\mathbf{z}_t = W_{hy}\mathbf{h}_t + \mathbf{b}_y$, and the next pre-activation $\mathbf{a}_{t+1} = W_{hh}\mathbf{h}_t + W_{xh}\mathbf{x}_{t+1} + \mathbf{b}_h$ (for $t < T$). By the fan-out rule its adjoint is the sum of the two vector–Jacobian products, $\bar{\mathbf{h}}_t = W_{hy}^\top\bar{\mathbf{z}}_t + W_{hh}^\top\bar{\mathbf{a}}_{t+1}$. Only $\ell_t$ depends on $\mathbf{z}_t$, so $\bar{\mathbf{z}}_t = \mathbf{g}_t$; and $\bar{\mathbf{a}}_{t+1} = \boldsymbol\delta_{t+1}$, which is $\mathbf{0}$ for $t = T$ because nothing follows the last step. Next, $\mathbf{h}_t = \tanh(\mathbf{a}_t)$ elementwise, with $\tanh' = 1 - \tanh^2$, so $\boldsymbol\delta_t = \bar{\mathbf{h}}_t\odot(1 - \mathbf{h}_t^2)$. Processing $t = T, \dots, 1$ in this order ensures $\boldsymbol\delta_{t+1}$ is known when $\bar{\mathbf{h}}_t$ is computed.

For the weights: each parameter is used once per step, so its adjoint is the sum over steps of the local contributions. At step $t$, $\mathbf{a}_t$ depends on $W_{hh}$ through $W_{hh}\mathbf{h}_{t-1}$, whose vector–Jacobian product with $\boldsymbol\delta_t$ is the outer product $\boldsymbol\delta_t\mathbf{h}_{t-1}^\top$ (as for a linear layer); likewise $\boldsymbol\delta_t\mathbf{x}_t^\top$ for $W_{xh}$, $\boldsymbol\delta_t$ for $\mathbf{b}_h$, $\mathbf{g}_t\mathbf{h}_t^\top$ for $W_{hy}$ and $\mathbf{g}_t$ for $\mathbf{b}_y$. Summing over $t$ gives [[#eq-bptt-grads]].
:::

The recursion [[#eq-bptt]] is a second recurrent network, running backwards in time: its state $\boldsymbol\delta_t$ is driven by the output errors $\mathbf{g}_t$ and propagated by the transposed recurrent matrix, gated at each step by the tanh slopes. Every quantity it uses — $\mathbf{h}_t$ for all $t$ — comes from the forward pass, so BPTT must store the whole sequence of hidden states: memory $O(TH)$ per sequence, on top of the $O(TH^2 + TH\lvert\mathcal{V}\rvert)$ arithmetic of the forward and backward sweeps.

::: example BPTT by hand {#ex-bptt-scalar}
In [[#ex-forward]], put a loss only on the last step, $\mathcal{L} = \frac12(h_3 - y)^2$ with $y = 0.5$. Compute $\partial\mathcal{L}/\partial w_{hh}$ by [[#thm-bptt]] and check it numerically.
::: solution
In the scalar case $\bar h_t = g_t + w_{hh}\delta_{t+1}$ with $g_3 = h_3 - y = 0.438428$ and $g_1 = g_2 = 0$.

- $t = 3$: $\bar h_3 = 0.438428$, $\delta_3 = 0.438428\,(1 - 0.938428^2) = 0.052328$; contribution $\delta_3h_2 = 0.052328\cdot(-0.550573) = -0.028810$.
- $t = 2$: $\bar h_2 = 0.5\cdot0.052328 = 0.026164$, $\delta_2 = 0.026164\,(1 - 0.550573^2) = 0.018233$; contribution $\delta_2h_1 = 0.018233\cdot0.761594 = 0.013886$.
- $t = 1$: $\bar h_1 = 0.5\cdot0.018233 = 0.009116$, $\delta_1 = 0.003829$; contribution $\delta_1h_0 = 0$.

So $\partial\mathcal{L}/\partial w_{hh} = -0.028810 + 0.013886 + 0 = -0.014924$. A central difference with step $10^{-6}$ gives $-0.0149242$, in agreement. Notice how the error shrinks as it travels back: $\delta_3 = 0.052$, $\delta_2 = 0.018$, $\delta_1 = 0.0038$ — each step multiplies it by $w_{hh}$ and a tanh slope. The two contributions also have opposite signs: lowering $w_{hh}$ helps through the direct effect of $h_2$ on $h_3$ but hurts through its effect on $h_2$ itself.
:::
:::

### The Jacobian product {#sec-jacobians}

Unrolling the recursion [[#eq-bptt]] shows how the loss at step $t$ reaches the state at an earlier step $k$. Write $D_s = \operatorname{diag}(1 - \mathbf{h}_s^2)$ for the tanh slopes at step $s$; then $\partial\mathbf{h}_s/\partial\mathbf{h}_{s-1} = D_sW_{hh}$.

::: proposition Long-range gradients are Jacobian products {#prop-jacobian}
For $k < t$,

$$
\frac{\partial\ell_t}{\partial\mathbf{h}_k} = \Big(\prod_{s=k+1}^{t}D_sW_{hh}\Big)^{\!\top}\frac{\partial\ell_t}{\partial\mathbf{h}_t},\qquad
\Big\lVert\frac{\partial\mathbf{h}_t}{\partial\mathbf{h}_k}\Big\rVert\le\big(\gamma\,\sigma_{\max}(W_{hh})\big)^{t-k},
$$ {#eq-jacobian}

where the product is ordered with later steps on the left, $\sigma_{\max}$ is the largest singular value and $\gamma = \max_s\max_i(1 - h_{s,i}^2)\le1$ bounds the tanh slopes.
:::

::: proof
$\mathbf{h}_t$ depends on $\mathbf{h}_k$ only through the chain $\mathbf{h}_k\to\mathbf{h}_{k+1}\to\dots\to\mathbf{h}_t$, so the chain rule gives $\partial\mathbf{h}_t/\partial\mathbf{h}_k = \prod_{s=k+1}^{t}\partial\mathbf{h}_s/\partial\mathbf{h}_{s-1}$, and each factor is $D_sW_{hh}$ by differentiating $\tanh(W_{hh}\mathbf{h}_{s-1} + \dots)$. The gradient is the transposed Jacobian applied to $\partial\ell_t/\partial\mathbf{h}_t$. For the bound, the spectral norm is submultiplicative, $\lVert D_s\rVert = \max_i(1 - h_{s,i}^2)\le\gamma$ for a diagonal matrix, and $\lVert W_{hh}\rVert = \sigma_{\max}(W_{hh})$.
:::

The total gradient with respect to $W_{hh}$ is a sum, over pairs $k\le t$, of terms that contain this product of $t - k$ factors. If $\gamma\sigma_{\max} < 1$, the terms linking distant steps shrink geometrically: the network receives almost no signal telling it to keep information from step $k$ for use at step $t\gg k$. That is the **vanishing gradient** problem. If the product instead grows — possible when $\sigma_{\max} > 1$ and the units are not saturated — the gradient **explodes**. Hochreiter (1991) and Bengio, Simard and Frasconi (1994) identified both; [[sequence-models/long-range-dependencies]] develops the analysis and the remedies. The figure shows the essential arithmetic for a linear scalar recurrence $h_t = \lambda h_{t-1}$, for which the factor is exactly $\lambda^{t-k}$.

::: widget plot
f: log10(abs(lam)^x); log10(abs(lam)^x*g^x)
x: 0, 100
y: -12, 6
sliders: lam=0.95:0.5:1.5:0.01; g=0.8:0.3:1:0.01
labels: \log_{10}\lvert\lambda\rvert^{t-k}\ \text{(linear)}; \text{with tanh slope } g \text{ per step}
hlines: 0
caption: How the gradient factor between steps $k$ and $t$ depends on the distance $t - k$ (horizontal axis), on a logarithmic scale. With $\lvert\lambda\rvert = 0.95$ the factor after $100$ steps is $0.95^{100}\approx0.006$; with $\lambda = 1.05$ it is about $131$. An average tanh slope $g < 1$ multiplies in on top and pushes the curve down. Only a factor of exactly $1$ per step keeps distant gradients at their original size — the idea behind the LSTM's cell state.
:::

## Cost and truncation {#sec-truncation}

One forward and backward pass over a sequence of length $T$ costs $O\big(T(Hd + H^2 + H\lvert\mathcal{V}\rvert)\big)$ arithmetic and stores $O(T(H + \lvert\mathcal{V}\rvert))$ activations (the probabilities $\mathbf{p}_t$ can be recomputed). For a long document — a book is millions of tokens — neither the memory nor the delay of one update per document is acceptable.

::: definition Truncated BPTT {#def-tbptt}
**Truncated backpropagation through time** with window $T_w$ splits a long sequence into consecutive windows of $T_w$ tokens. The forward pass runs continuously, carrying the hidden state from the end of one window into the start of the next; the backward pass and the parameter update are done for each window separately, treating the carried-in state as a constant (its gradient is not propagated into the previous window).
:::

Truncation keeps the forward computation exact — the state still carries information across window boundaries — but gradients cannot flow back further than the start of the current window. A dependency longer than $T_w$ can therefore be *used* only if something learned for shorter-range reasons happens to preserve it; the gradient will never ask the network to store it. Williams and Peng (1990) analysed such schemes; RNN language models of the 2010s typically used windows of a few dozen to a few hundred tokens (Zaremba, Sutskever and Vinyals, 2014, used $35$). The alternative, **real-time recurrent learning** (Williams and Zipser, 1989), carries forward the full derivative $\partial\mathbf{h}_t/\partial\theta$ and needs no backward pass, but costs $O(H^4)$ per step for a dense network, which is why it is rarely used.

::: example The cost of a training step {#ex-cost}
For the model of [[#ex-params]], estimate the forward FLOPs per token and the activation memory of a batch of $32$ sequences with $T_w = 35$ in 32-bit floats, storing $\mathbf{h}_t$ and the logits $\mathbf{z}_t$.
::: solution
Counting $2$ FLOPs per multiply–add, a token costs $2(Hd + H^2 + H\lvert\mathcal{V}\rvert) = 2(131{,}072 + 262{,}144 + 5{,}120{,}000)\approx1.10\times10^7$ FLOPs forward, about $11$ MFLOPs — again dominated by the output layer. The backward pass costs about twice as much ([[neural-networks/backpropagation#prop-flops]]). Memory: $32\cdot35 = 1{,}120$ positions, each with $512 + 10{,}000$ floats of $4$ bytes, about $47$ MB. The hidden states alone would take $2.3$ MB; the logits are the expensive part, which is why implementations often compute the softmax loss in chunks.
:::
:::

::: quiz
With truncated BPTT and window $T_w = 20$, the hidden state is carried across window boundaries. Which statement is right?
- [ ] The model cannot use any information from more than $20$ tokens back.
- [x] The forward pass can carry information from more than $20$ tokens back, but no gradient teaches the network to keep such information.
- [ ] The gradient is exact as long as the hidden state is carried over.
- [ ] Truncation only changes the speed of training, not what can be learned.
::: solution
The carried state is a function of the whole past, so information can survive across boundaries; but the backward pass stops at the window start, treating the incoming state as a constant. The gradient is that of a different objective, in which dependencies longer than the window carry no learning signal. The listing in [[#sec-code]] shows the consequence.
:::
:::

## Implementing it {#sec-code}

The listing trains a character-level RNN language model on a two-sentence corpus, in plain Python. It implements [[#thm-bptt]] directly, checks three gradient entries against central differences, and trains with truncated BPTT ($T_w = 16$), plain SGD and clipping of the global gradient norm at $5$ ([[neural-networks/optimisers#def-clipping]]).

```python
import math, random

text = "the cat sat on the mat. the dog sat on the log. "
chars = sorted(set(text)); V = len(chars)
ix = {c: i for i, c in enumerate(chars)}
data = [ix[c] for c in text * 2]              # a periodic stream

H = 16                                     # hidden size
rng = random.Random(0)
def mat(r, c, s): return [[rng.gauss(0, s) for _ in range(c)] for _ in range(r)]
P = {"Wxh": mat(H, V, 0.1),                # (H, V)  input weights
     "Whh": mat(H, H, 1 / math.sqrt(H)),   # (H, H)  recurrent weights
     "Why": mat(V, H, 0.1),                # (V, H)  output weights
     "bh": [0.0] * H, "by": [0.0] * V}

def mv(M, v): return [sum(m * x for m, x in zip(row, v)) for row in M]

def forward_backward(P, xs, ys, h0):
    """xs, ys: lists of T token ids; h0: (H,). Returns loss, grads, last h."""
    hs, ps, loss = {-1: h0}, {}, 0.0
    for t, (x, y) in enumerate(zip(xs, ys)):              # forward
        a = [P["Wxh"][i][x] + w + b for i, (w, b) in
             enumerate(zip(mv(P["Whh"], hs[t - 1]), P["bh"]))]
        hs[t] = [math.tanh(v) for v in a]                  # (H,)
        z = [u + b for u, b in zip(mv(P["Why"], hs[t]), P["by"])]   # (V,)
        m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
        ps[t] = [v / s for v in e]                         # softmax (V,)
        loss -= math.log(ps[t][y])
    G = {k: ([[0.0] * len(v[0]) for _ in v] if isinstance(v[0], list)
             else [0.0] * len(v)) for k, v in P.items()}
    dh_next = [0.0] * H                                    # W_hh^T delta_{t+1}
    for t in reversed(range(len(xs))):                     # backward through time
        dz = ps[t][:]; dz[ys[t]] -= 1.0                    # g_t = p_t - e_y  (V,)
        for k in range(V):
            G["by"][k] += dz[k]
            for j in range(H): G["Why"][k][j] += dz[k] * hs[t][j]
        dh = [sum(P["Why"][k][j] * dz[k] for k in range(V)) + dh_next[j]
              for j in range(H)]                           # h-bar_t  (H,)
        da = [d * (1 - h * h) for d, h in zip(dh, hs[t])]  # delta_t  (H,)
        for i in range(H):
            G["bh"][i] += da[i]; G["Wxh"][i][xs[t]] += da[i]
            for j in range(H): G["Whh"][i][j] += da[i] * hs[t - 1][j]
        dh_next = [sum(P["Whh"][i][j] * da[i] for i in range(H)) for j in range(H)]
    return loss, G, hs[len(xs) - 1]

# --- gradient check on a short window ---------------------------------------
xs, ys = data[:8], data[1:9]
loss, G, _ = forward_backward(P, xs, ys, [0.0] * H)
for name, i, j in [("Whh", 3, 5), ("Wxh", 0, ix["t"]), ("Why", 2, 7)]:
    old = P[name][i][j]; eps = 1e-5
    P[name][i][j] = old + eps; lp = forward_backward(P, xs, ys, [0.0] * H)[0]
    P[name][i][j] = old - eps; lm = forward_backward(P, xs, ys, [0.0] * H)[0]
    P[name][i][j] = old
    num = (lp - lm) / (2 * eps)
    print(f"{name}[{i}][{j}]  bptt {G[name][i][j]: .8f}  numeric {num: .8f}")

# --- training: truncated BPTT over consecutive windows, SGD + clipping ------------
T, lr, h, hist = 16, 0.1, [0.0] * H, []
print(f"V = {V}, initial loss per char = {loss / len(xs):.3f} (log V = {math.log(V):.3f})")
for step in range(3003):
    p = (step * T) % len(text)                              # windows follow each other
    loss, G, h = forward_backward(P, data[p:p + T], data[p + 1:p + T + 1], h)
    norm = math.sqrt(sum(g * g for v in G.values() for r in v
                         for g in (r if isinstance(r, list) else [r])))
    c = min(1.0, 5.0 / norm)                                # clip global norm at 5
    for k in P:
        if isinstance(P[k][0], list):
            for r, gr in zip(P[k], G[k]):
                for j in range(len(r)): r[j] -= lr * c * gr[j]
        else:
            for j in range(len(P[k])): P[k][j] -= lr * c * G[k][j]
    hist.append(loss / T)
    if step % 1000 == 2:                                    # mean over one pass (3 windows)
        m = sum(hist[-3:]) / 3
        print(f"step {step:4d}  loss/char {m:.3f}  perplexity {math.exp(m):.2f}")

# --- greedy generation after a prompt -----------------------------------------
def step_h(h, x):
    a = [P["Wxh"][i][x] + w + b for i, (w, b) in enumerate(zip(mv(P["Whh"], h), P["bh"]))]
    return [math.tanh(v) for v in a]
for prompt in ["the cat sat on the ", "the dog sat on the "]:
    h = [0.0] * H
    for ch in prompt: h = step_h(h, ix[ch])
    z = [u + b for u, b in zip(mv(P["Why"], h), P["by"])]
    e = [math.exp(v - max(z)) for v in z]
    print(f"after {prompt!r}: p(m) = {e[ix['m']] / sum(e):.3f}, p(l) = {e[ix['l']] / sum(e):.3f}")
    out = prompt
    for _ in range(12):
        z = [u + b for u, b in zip(mv(P["Why"], h), P["by"])]
        x = max(range(V), key=lambda k: z[k])               # most probable next char
        out += chars[x]; h = step_h(h, x)
    print(repr(out))
```

Its output (Python 3, about ten seconds):

```
Whh[3][5]  bptt  0.09506486  numeric  0.09506486
Wxh[0][13]  bptt  0.11786848  numeric  0.11786848
Why[2][7]  bptt  0.03650066  numeric  0.03650066
V = 14, initial loss per char = 2.622 (log V = 2.639)
step    2  loss/char 2.528  perplexity 12.53
step 1002  loss/char 0.038  perplexity 1.04
step 2002  loss/char 0.035  perplexity 1.04
step 3002  loss/char 0.034  perplexity 1.03
after 'the cat sat on the ': p(m) = 0.451, p(l) = 0.541
'the cat sat on the log. the cat'
after 'the dog sat on the ': p(m) = 0.451, p(l) = 0.541
'the dog sat on the log. the cat'
```

The gradients agree with the finite differences to all eight printed digits, and the initial loss is close to $\log V$, as it should be for a network whose outputs start nearly uniform ([[neural-networks/training-practice#prop-initial-loss]]). Training brings the loss down to $0.034$ nats per character, but not to zero, and the generations show why: after "the cat sat on the " and after "the dog sat on the " the model gives exactly the same probabilities to "m" and "l". The animal is $14$ characters before the decision, and with the windows aligned as they are (they start at characters $0$, $16$ and $32$ of the $48$-character text), the animal and the decision always fall in *different* windows. No gradient ever connected them, so the network never learned to keep the animal in its state — the situation of the quiz above. A model that guesses both two-way choices of the text ("mat"/"log", and "cat"/"dog" after the full stop) at random pays $2\ln2/48\approx0.029$ nats per character, close to the floor observed.

::: warning "An RNN has unlimited context"
The recurrence lets $\mathbf{h}_t$ depend on every earlier token, and it is tempting to conclude that an RNN uses all of its context. In practice what it *can* use is limited by three things: the capacity of an $H$-dimensional state, the vanishing of long-range gradients ([[#prop-jacobian]]), and the truncation window of training. Measurements on trained LSTM language models found that they used roughly the last $200$ tokens of context, and word order mainly within the last $50$ (Khandelwal et al., 2018). "Unlimited in principle" and "used in practice" are different claims.
:::

## Deeper and bidirectional networks {#sec-variants}

Two extensions of [[#def-elman]] were standard in the RNN era and reappear in [[sequence-models/contextual-embeddings]].

**Stacking.** A **deep** (stacked) RNN feeds the hidden states of layer $\ell$ as the inputs of layer $\ell + 1$: $\mathbf{h}^{(\ell)}_t = \tanh\big(W^{(\ell)}_{hh}\mathbf{h}^{(\ell)}_{t-1} + W^{(\ell)}_{xh}\mathbf{h}^{(\ell-1)}_t + \mathbf{b}^{(\ell)}\big)$, with $\mathbf{h}^{(0)}_t = \mathbf{x}_t$. Two to four layers were typical; Sutskever, Vinyals and Le (2014) used four-layer LSTMs for translation. Depth adds computation per step, while time adds computation along the sequence — a grid of cells.

**Bidirectionality.** When the whole input is available — tagging, classification, encoding a sentence to be translated — nothing forces the model to read only left to right. A **bidirectional** RNN (Schuster and Paliwal, 1997) runs one RNN forwards, giving $\overrightarrow{\mathbf{h}}_t$ from $\mathbf{x}_1, \dots, \mathbf{x}_t$, and another backwards, giving $\overleftarrow{\mathbf{h}}_t$ from $\mathbf{x}_T, \dots, \mathbf{x}_t$, and represents position $t$ by the concatenation $[\overrightarrow{\mathbf{h}}_t; \overleftarrow{\mathbf{h}}_t]$, which depends on the whole sequence. A bidirectional network cannot be a left-to-right language model: its representation of position $t$ has already seen $x_{t+1}$.

::: example A bidirectional representation {#ex-birnn}
A bidirectional encoder with $H = 256$ per direction reads a sentence of $T = 12$ tokens. What are the shapes of its outputs, and which inputs does the representation of token $5$ depend on?
::: solution
Each direction produces $12$ vectors of size $256$; concatenated, the encoder output is a $(12, 512)$ matrix (with a batch of $B$ sentences, $(B, 12, 512)$). Token $5$'s vector $[\overrightarrow{\mathbf{h}}_5; \overleftarrow{\mathbf{h}}_5]$ depends on tokens $1$–$5$ through the forward half and on tokens $5$–$12$ through the backward half — on all twelve. The two halves are computed independently, so they can run in parallel with each other, though each is sequential in $t$.
:::
:::

::: history
Recurrent connections are as old as neural networks — McCulloch and Pitts (1943) allowed cycles — and Hopfield (1982) used symmetric recurrent networks as associative memories. For sequence processing, Michael Jordan (1986) fed a network's outputs back as inputs, and Jeffrey Elman's "Finding Structure in Time" (*Cognitive Science*, 1990) fed back the hidden layer, trained the network to predict the next word of simple sentences, and showed that its hidden states clustered words into nouns and verbs, animate and inanimate — an early demonstration that next-word prediction induces linguistic structure. Training by unrolling was described by Rumelhart, Hinton and Williams (1986) and set out in detail by Paul Werbos ("Backpropagation through time: what it does and how to do it", *Proceedings of the IEEE*, 1990); Williams and Zipser (1989) gave real-time recurrent learning. Sepp Hochreiter's 1991 diploma thesis (Munich) and Bengio, Simard and Frasconi (1994) explained why such training fails on long dependencies, which led to the LSTM. Two decades later, with GPUs, clipping and better initialisation, recurrent language models overtook $n$-grams (Mikolov et al., 2010), and Sutskever, Martens and Hinton (2011) and Graves (2013) generated surprisingly fluent text one character at a time.
:::

::: summary
- A **simple recurrent network** updates a fixed-size hidden state $\mathbf{h}_t = \tanh(W_{hh}\mathbf{h}_{t-1} + W_{xh}\mathbf{x}_t + \mathbf{b}_h)$ with the same weights at every step; the cost per step does not depend on the length of the past, but the steps are sequential.
- An **RNN language model** predicts $p(x_{t+1}\mid x_{\le t}) = \operatorname{softmax}(W_{hy}\mathbf{h}_t + \mathbf{b}_y)$ and is trained with teacher forcing on the summed cross-entropy; its parameters are dominated by the vocabulary-sized input and output matrices.
- **Backpropagation through time** is backpropagation on the unrolled graph: a backward recurrence $\boldsymbol\delta_t = (W_{hy}^\top\mathbf{g}_t + W_{hh}^\top\boldsymbol\delta_{t+1})\odot(1 - \mathbf{h}_t^2)$ and weight gradients summed over time. It stores all hidden states.
- The gradient linking steps $k < t$ contains the Jacobian product $\prod D_sW_{hh}$, bounded by $(\gamma\sigma_{\max})^{t-k}$: it vanishes or explodes geometrically with distance.
- **Truncated BPTT** keeps the forward pass continuous but stops gradients at window boundaries, so dependencies longer than the window get no learning signal.
- **Stacked** RNNs add depth; **bidirectional** RNNs represent each position by a forward and a backward state and see the whole input, so they cannot serve as left-to-right language models.
:::

## Exercises

::: exercise Parameter count {level=1 check="6740"}
A simple RNN has input size $d = 20$, hidden size $H = 64$ and $K = 20$ outputs. How many parameters does it have, counting both bias vectors (but not $\mathbf{h}_0$)?
::: solution
$W_{xh}$: $64\cdot20 = 1{,}280$; $W_{hh}$: $64^2 = 4{,}096$; $\mathbf{b}_h$: $64$; $W_{hy}$: $20\cdot64 = 1{,}280$; $\mathbf{b}_y$: $20$. Total $1{,}280 + 4{,}096 + 64 + 1{,}280 + 20 = 6{,}740$. The recurrent matrix $W_{hh}$ alone is $61\%$ of the parameters here, because the vocabulary is tiny; with a realistic vocabulary the output layer dominates ([[#ex-params]]).
:::
:::

::: exercise Unrolled depth {level=1}
An RNN with $L = 3$ stacked layers reads a sequence of $T = 50$ tokens. How many applications of a recurrent cell does the forward pass make, and what is the length of the longest path in the unrolled graph from $\mathbf{x}_1$ to the output at step $50$? Why does the second number matter for training?
::: solution
There are $L\cdot T = 150$ cell applications. The longest path from $\mathbf{x}_1$ to $\mathbf{z}_{50}$ goes up through the three layers and along time: $3 + 49 = 52$ cell applications (the order of the vertical and horizontal moves does not matter for the count). Gradients from the loss at step $50$ to $\mathbf{x}_1$ pass through a product of about $52$ Jacobians, so the unrolled network is as deep as a $52$-layer feed-forward network for that dependency, with the same vanishing and exploding risks — but with one matrix $W_{hh}$ repeated along time instead of independent layers.
:::
:::

::: exercise A two-step forward pass {level=1 check="tanh(0.5*tanh(1)+1)"}
A scalar RNN has $w_{hh} = 0.5$, $w_{xh} = 1$, $b_h = 0$, $h_0 = 0$, and both inputs equal to $1$. Compute $h_2$.
::: solution
$h_1 = \tanh(1) = 0.761594$ and $h_2 = \tanh(0.5\cdot0.761594 + 1) = \tanh(1.380797) = 0.881$.
:::
:::

::: exercise A gradient with losses at every step {level=2}
In [[#ex-forward]], let the loss be $\mathcal{L} = \frac12\sum_{t=1}^3(h_t - y_t)^2$ with $y = (0, 0, 0.5)$. Compute $\delta_3$, $\delta_2$, $\delta_1$ and $\partial\mathcal{L}/\partial w_{hh}$.
::: solution
Now $g_t = h_t - y_t$: $g_1 = 0.761594$, $g_2 = -0.550573$, $g_3 = 0.438428$. Backwards:
$\delta_3 = 0.438428\cdot(1 - 0.938428^2) = 0.052328$.
$\bar h_2 = g_2 + 0.5\,\delta_3 = -0.550573 + 0.026164 = -0.524409$, $\delta_2 = -0.524409\cdot(1 - 0.303131) = -0.365445$.
$\bar h_1 = g_1 + 0.5\,\delta_2 = 0.761594 - 0.182723 = 0.578871$, $\delta_1 = 0.578871\cdot(1 - 0.580026) = 0.243111$.
Then $\partial\mathcal{L}/\partial w_{hh} = \delta_3h_2 + \delta_2h_1 + \delta_1h_0 = -0.028810 - 0.278321 + 0 = -0.307131$. The losses at intermediate steps now dominate: $\delta_2$ is mostly the step-2 error itself, not the error passed back from step 3.
:::
:::

::: exercise Exploding and vanishing factors {level=2 check="log(1e-6)/log(0.9)"}
For the linear recurrence $\mathbf{h}_t = W\mathbf{h}_{t-1}$ with $W$ symmetric and largest eigenvalue magnitude $0.9$, after how many steps (as a real number) has the bound on $\lVert\partial\mathbf{h}_t/\partial\mathbf{h}_0\rVert$ fallen to $10^{-6}$? What happens instead if the largest eigenvalue is $1.1$?
::: solution
For a symmetric matrix $\lVert W^n\rVert = 0.9^n$, which equals $10^{-6}$ at $n = \ln10^{-6}/\ln0.9\approx131.1$ steps. With largest eigenvalue $1.1$, $\lVert W^n\rVert = 1.1^n$, which exceeds $10^{6}$ after $\ln10^6/\ln1.1\approx145$ steps: a gradient that was $1$ at step $t$ becomes a million at step $0$. Real RNNs have the tanh slopes as well, which can only shrink the factor; that is why exploding gradients need the units to operate in their linear range.
:::
:::

::: exercise Why the probabilities are equal {level=2}
In the output of [[#sec-code]], the two prompts give *identical* probabilities $p(\text{m}) = 0.451$ to three decimals. Explain why this is consistent with how the network was trained, and propose two changes to the training procedure that would let the model learn the dependency.
::: solution
The only difference between the prompts is "c" versus "d" at position $4$, and the decision is made $14$ steps later. In training, every occurrence of the animal and the corresponding decision lay in different windows of truncated BPTT, so the gradient never rewarded carrying the animal forward; the network learned dynamics that forget the distinction (its state contracts, so after $14$ steps the two trajectories have converged to within rounding of the printed digits). Changes: (1) use windows long enough to contain each dependency, or windows that start at different offsets so that some window contains both the animal and the decision; (2) use a cell with better long-range gradient flow, such as an LSTM ([[sequence-models/long-range-dependencies]]), together with (1). Merely training longer would not help, because the objective being optimised does not involve the dependency.
:::
:::

::: exercise Memory of full BPTT {level=2 check="floor(2^30/(4*(1024+50000)))"}
An RNN language model with $H = 1{,}024$ and $\lvert\mathcal{V}\rvert = 50{,}000$ stores $\mathbf{h}_t$ and the logits $\mathbf{z}_t$ in 32-bit floats for one sequence. How many positions fit in $1$ GiB ($2^{30}$ bytes)? How does recomputing the logits in the backward pass change the answer?
::: solution
Each position needs $4(1{,}024 + 50{,}000) = 204{,}096$ bytes, so $2^{30}/204{,}096 = 5{,}260.96$, and $5{,}260$ whole positions fit. If the logits are recomputed from $\mathbf{h}_t$ during the backward pass (one extra output matmul per step), only $4\cdot1{,}024 = 4{,}096$ bytes per position are needed, about $262{,}144$ positions — fifty times more. The general version of this trade is gradient checkpointing ([[neural-networks/training-practice]]).
:::
:::

::: exercise The gradient for the embedding table {level=2}
For an RNN language model with embeddings $\mathbf{x}_t = E[x_t]$, show that the gradient of $\mathcal{L}$ with respect to row $v$ of $E$ is $\sum_{t\,:\,x_t = v}W_{xh}^\top\boldsymbol\delta_t$. What does this mean for rare tokens?
::: solution
Row $v$ of $E$ is used at exactly the steps $t$ with $x_t = v$, each time entering $\mathbf{a}_t$ through $W_{xh}\mathbf{x}_t$. The vector–Jacobian product of that linear map with $\boldsymbol\delta_t$ is $W_{xh}^\top\boldsymbol\delta_t$, and by the fan-out rule the uses add up, giving the sum over occurrences. A token that does not occur in a batch receives no gradient at all, and a rare token receives few updates — its embedding stays close to its initialisation for a long time, one reason subword tokenisation ([[text-and-language/tokenisation]]) helps.
:::
:::

::: exercise A diagonal recurrence {level=3}
Let $W_{hh} = \operatorname{diag}(\lambda_1, \dots, \lambda_H)$ and suppose all units operate in the linear range of tanh (slopes $\approx1$). Show that $\mathbf{h}_t\approx\sum_{k=1}^{t}\Lambda^{t-k}W_{xh}\mathbf{x}_k$ (with $\mathbf{h}_0 = \mathbf{0}$, $\mathbf{b}_h = \mathbf{0}$, $\Lambda = W_{hh}$), and interpret each hidden unit as an exponential moving average with its own time scale. For which $\lambda_i$ does unit $i$ remember an input for about $100$ steps (factor $e^{-1}$)?
::: solution
With identity activation, $\mathbf{h}_t = \Lambda\mathbf{h}_{t-1} + W_{xh}\mathbf{x}_t$; unrolling, $\mathbf{h}_t = \Lambda^t\mathbf{h}_0 + \sum_{k=1}^t\Lambda^{t-k}W_{xh}\mathbf{x}_k$, and $\mathbf{h}_0 = \mathbf{0}$ removes the first term. Since $\Lambda$ is diagonal, unit $i$ is $h_{t,i} = \sum_k\lambda_i^{t-k}u_{k,i}$ with $u_k = W_{xh}\mathbf{x}_k$: a sum of past inputs weighted by a geometric decay $\lambda_i^{t-k}$ — an (unnormalised) exponential moving average with time constant $-1/\ln\lambda_i$. A factor $e^{-1}$ after $100$ steps needs $\lambda_i^{100} = e^{-1}$, i.e. $\lambda_i = e^{-0.01}\approx0.990$. Units with $\lambda_i$ near $1$ remember long, units with small $\lambda_i$ react quickly. Diagonal linear recurrences of exactly this kind are the starting point of the state-space models in [[sequence-models/state-space-models]].
:::
:::

::: exercise Implement a gradient check over time {level=3}
Modify the listing of [[#sec-code]] to compute, for a window of $T = 16$ characters, the norm $\lVert\partial\ell_{16}/\partial\mathbf{h}_k\rVert$ for $k = 15, 14, \dots, 1$, using only the loss at the last step. Describe what you expect at initialisation and after training, and explain how the result relates to [[#prop-jacobian]].
::: solution
Run the forward pass, then the backward recursion of [[#thm-bptt]] with $\mathbf{g}_t = \mathbf{0}$ for $t < 16$ and $\mathbf{g}_{16} = \mathbf{p}_{16} - \mathbf{e}_{y}$; after computing $\bar{\mathbf{h}}_k$ at each step, record its norm (in the listing, `dh` at step `t` before the tanh slope is applied). Each step multiplies by $W_{hh}^\top D_{k+1}$, so the norms follow the Jacobian product. At initialisation $W_{hh}$ has entries of standard deviation $1/\sqrt H$, so its spectral radius is about $1$, and the norms decay only slowly because the tanh slopes are below $1$. Running this with the listing's seed, relative to $\lVert\bar{\mathbf{h}}_{16}\rVert$, the norm $15$ steps back is $0.51$ at initialisation but $1.5\times10^{-3}$ after the $3{,}003$ training steps: the trained network has learned strongly contracting dynamics, consistent with its forgetting of the animal (the exact numbers depend on the seed and the window). Plotting $\log\lVert\bar{\mathbf{h}}_k\rVert$ against $16 - k$ gives roughly a straight line whose slope is the average log contraction per step, the empirical counterpart of $\log(\gamma\sigma_{\max})$ in [[#prop-jacobian]].
:::
:::
