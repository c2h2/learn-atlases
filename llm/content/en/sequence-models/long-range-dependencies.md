The simple recurrent network of [[sequence-models/recurrent-networks]] can in principle carry information across any distance, but training it to do so is another matter. The gradient that would teach it to remember a token for $t - k$ steps is multiplied by $t - k$ Jacobians ([[sequence-models/recurrent-networks#prop-jacobian]]), and such a product almost always shrinks or grows geometrically. In the first case the network never learns long-range dependencies; in the second, training becomes unstable.

This chapter makes the problem precise, gives the standard cure for the exploding case — **gradient clipping** — and then develops the cure for the vanishing case that dominated sequence modelling for twenty years: **gated** recurrent cells. The **LSTM** (long short-term memory) adds a memory cell updated by addition rather than by matrix multiplication, so that along the cell the Jacobian is a product of diagonal gate values that the network can hold close to one; the **GRU** achieves a similar effect with fewer parameters. We derive both cells, implement the LSTM forward and backward passes in plain Python with a gradient check, and measure how much more gradient reaches the start of a sequence. The idea of an additive path protected from repeated multiplication reappears in residual networks and in the state-space models of [[sequence-models/state-space-models]].

## Vanishing and exploding gradients {#sec-vanishing}

Recall the setting: $\mathbf{h}_s = \tanh(\mathbf{a}_s)$ with $\mathbf{a}_s = W_{hh}\mathbf{h}_{s-1} + W_{xh}\mathbf{x}_s + \mathbf{b}$, and $D_s = \operatorname{diag}(1 - \mathbf{h}_s^2)$. The loss at step $t$ reaches an earlier state through

$$
\frac{\partial\mathbf{h}_t}{\partial\mathbf{h}_k} = D_tW_{hh}\,D_{t-1}W_{hh}\cdots D_{k+1}W_{hh} .
$$ {#eq-product}

The gradient of $\ell_t$ with respect to $W_{hh}$ is a sum over $k\le t$ of terms $\big(\partial\mathbf{h}_t/\partial\mathbf{h}_k\big)^{\!\top}$-weighted outer products, so the long-range part of the learning signal — the terms with $t - k$ large — is controlled by [[#eq-product]]. [[sequence-models/recurrent-networks#prop-jacobian]] bounded its norm by $(\gamma\sigma_{\max})^{t-k}$, where $\sigma_{\max}$ is the largest singular value of $W_{hh}$ and $\gamma\le1$ bounds the tanh slopes. Two consequences follow, which Pascanu, Mikolov and Bengio (2013) stated as necessary and sufficient conditions in this form.

::: proposition Conditions for vanishing and exploding {#prop-conditions}
Let $\gamma$ bound the derivative of the activation ($\gamma = 1$ for tanh, $\gamma = \frac14$ for the logistic sigmoid).

1. **Sufficient for vanishing.** If $\sigma_{\max}(W_{hh}) < 1/\gamma$, then $\lVert\partial\mathbf{h}_t/\partial\mathbf{h}_k\rVert\le\eta^{t-k}$ with $\eta = \gamma\sigma_{\max} < 1$, so the long-range terms tend to zero geometrically.
2. **Necessary for exploding.** If the long-range terms are unbounded as $t - k\to\infty$, then $\sigma_{\max}(W_{hh}) > 1/\gamma$.
:::

::: proof
(1) is the bound of [[sequence-models/recurrent-networks#prop-jacobian]] with $\eta = \gamma\sigma_{\max}$: by submultiplicativity of the spectral norm, $\lVert\prod_sD_sW_{hh}\rVert\le\prod_s\lVert D_s\rVert\lVert W_{hh}\rVert\le(\gamma\sigma_{\max})^{t-k}$, and $\eta^{t-k}\to0$ when $\eta < 1$. (2) is the contrapositive of (1) together with the boundary case: if $\sigma_{\max}\le1/\gamma$ the product is bounded by $1$, so unbounded growth requires $\sigma_{\max} > 1/\gamma$.
:::

The condition in (2) is necessary, not sufficient: a large $W_{hh}$ usually drives the units into saturation, where $D_s\approx0$ and the gradient vanishes after all. Exploding gradients therefore appear in bursts, in regions of parameter space where the dynamics are close to a bifurcation and a small change of the weights changes the trajectory drastically. Bengio, Simard and Frasconi (1994) gave a sharper argument for why vanishing is the typical case: for a network to store a bit *robustly* — so that small perturbations of the input do not erase it — its state must sit in a region where the dynamics are contracting, and in exactly those regions $\lVert\partial\mathbf{h}_t/\partial\mathbf{h}_k\rVert\to0$. Robust memory and long-range gradient flow pull in opposite directions in a simple RNN. Hochreiter's 1991 diploma thesis had reached the same diagnosis by analysing how error signals scale over time.

::: example How fast the signal disappears {#ex-decay}
A simple RNN has $\sigma_{\max}(W_{hh}) = 1.2$ and its units run at an average tanh slope of $0.6$ per step (treat the bound as typical). By what factor is the gradient from a loss at step $t$ reduced at step $t - 50$? What would be needed for the factor to be $1$?
::: solution
The per-step factor is at most $0.6\cdot1.2 = 0.72$, so after $50$ steps it is $0.72^{50}\approx7.4\times10^{-8}$. The loss at step $t$ tells the network about seven parts in a hundred million about what it should have done $50$ steps earlier — swamped by the gradients of short-range dependencies, which are added to the same weights. Keeping the factor at $1$ would need $\gamma\sigma_{\max} = 1$ exactly *and* the Jacobians aligned so the bound is tight — a knife-edge that training does not maintain. The LSTM's answer is to make a path on which the factor is a learned gate value near $1$ rather than the product of a matrix norm and a slope.
:::
:::

## Gradient clipping {#sec-clipping}

The exploding case has a blunt but effective remedy. Pascanu et al. (2013) observed that the loss surface of an RNN has steep "cliffs": a narrow region where the loss changes sharply, so that a gradient computed there is huge and a step along it throws the parameters far away, undoing previous progress. The direction of that gradient is still informative; its size is not.

::: definition Clipping by norm {#def-clip}
Given a gradient $\mathbf{g}$ and a threshold $c > 0$, **clipping by norm** replaces it by

$$
\mathbf{g}\leftarrow\min\Big(1, \frac{c}{\lVert\mathbf{g}\rVert}\Big)\,\mathbf{g} .
$$

The clipped vector points in the same direction and has norm $\min(\lVert\mathbf{g}\rVert, c)$. Applied to the concatenation of all parameter gradients it is **global-norm** clipping, the form described in [[neural-networks/optimisers#def-clipping]].
:::

Mikolov had used a cruder element-wise clipping in his RNN language models; Pascanu et al. analysed norm clipping and popularised it, and it became a standard part of every recurrent training recipe (the listing of [[sequence-models/recurrent-networks#sec-code]] clips at $5$). Typical thresholds were $1$ to $10$, chosen by looking at the distribution of gradient norms over a few hundred steps and setting $c$ a little above the typical value. Clipping does nothing for vanishing gradients — it only ever makes a gradient smaller.

::: example Clipping a gradient {#ex-clip}
A batch produces gradients $\mathbf{g}_1 = (30, 0)$ for the recurrent weights and $\mathbf{g}_2 = (0, 40)$ for the output weights, flattened. Clip the global norm to $c = 5$. What would per-tensor clipping at $5$ give instead?
::: solution
The global norm is $\sqrt{30^2 + 40^2} = 50$, so both are scaled by $5/50 = 0.1$: $\mathbf{g}_1 = (3, 0)$, $\mathbf{g}_2 = (0, 4)$. The ratio $3 : 4$ between the two parts is kept. Clipping each tensor separately to norm $5$ gives $(5, 0)$ and $(0, 5)$: the recurrent part has been scaled by $1/6$ and the output part by $1/8$, so the update direction has changed. Global clipping is the usual choice because it changes only the step size.
:::
:::

## The LSTM cell {#sec-lstm}

To learn long-range dependencies, the network needs a path through time along which the Jacobian stays close to the identity — what Hochreiter and Schmidhuber (1997) called the **constant error carousel**. Their construction is a memory cell $\mathbf{c}_t$ that is *added to*, not multiplied by a weight matrix, guarded by multiplicative **gates** that decide what to write, what to keep and what to show.

::: definition LSTM cell {#def-lstm}
An **LSTM** cell with hidden size $H$ and input size $d$ keeps a **cell state** $\mathbf{c}_t\in\R^H$ and a hidden state $\mathbf{h}_t\in\R^H$. With $\mathbf{u}_t = [\mathbf{h}_{t-1}; \mathbf{x}_t]\in\R^{H+d}$ it computes

$$
\begin{aligned}
\mathbf{i}_t &= \sigma(W_i\mathbf{u}_t + \mathbf{b}_i) &&\text{input gate}\\
\mathbf{f}_t &= \sigma(W_f\mathbf{u}_t + \mathbf{b}_f) &&\text{forget gate}\\
\mathbf{o}_t &= \sigma(W_o\mathbf{u}_t + \mathbf{b}_o) &&\text{output gate}\\
\mathbf{g}_t &= \tanh(W_g\mathbf{u}_t + \mathbf{b}_g) &&\text{candidate}\\
\mathbf{c}_t &= \mathbf{f}_t\odot\mathbf{c}_{t-1} + \mathbf{i}_t\odot\mathbf{g}_t\\
\mathbf{h}_t &= \mathbf{o}_t\odot\tanh(\mathbf{c}_t)
\end{aligned}
$$ {#eq-lstm}

with $W_i, W_f, W_o, W_g\in\R^{H\times(H+d)}$, $\sigma$ the logistic function and $\odot$ the elementwise product. It has $4\big(H(H + d) + H\big)$ parameters.
:::

Read the cell from the middle. The candidate $\mathbf{g}_t$ is what a simple RNN would compute. Instead of overwriting the state with it, the LSTM *adds* it to the cell, scaled per unit by the input gate $\mathbf{i}_t\in(0, 1)^H$, after scaling the old content by the forget gate $\mathbf{f}_t\in(0, 1)^H$. A unit with $f\approx1$, $i\approx0$ keeps its value unchanged for as long as the gates stay that way. The output gate decides how much of the (squashed) cell content is exposed as $\mathbf{h}_t$, which is what the gates, the candidate and the rest of the network see.

::: widget plot
f: 1/(1+exp(-(x+b))); exp(-(x+b))/(1+exp(-(x+b)))^2; 1-tanh(x)^2
x: -8, 8
y: 0, 1.05
sliders: b=0:-4:6:0.1
labels: \text{gate } \sigma(a + b); \text{its slope } \sigma'(a + b); \text{tanh slope } 1 - \tanh^2 a
caption: A gate is a logistic function of its pre-activation $a$, here shifted by a bias $b$. It takes values in $(0, 1)$ and acts as a soft switch: near $0$ it blocks, near $1$ it passes. Its slope, at most $\frac14$, is what the gradient *of the gate itself* sees — small when the gate is saturated open or shut. The value of the gate, not its slope, multiplies the cell's error on the carousel, so a saturated-open forget gate passes the cell's gradient almost unchanged even though it learns slowly itself.
:::

The original 1997 cell had no forget gate: $\mathbf{c}_t = \mathbf{c}_{t-1} + \mathbf{i}_t\odot\mathbf{g}_t$, an exact carousel with Jacobian $I$ along the cell. Gers, Schmidhuber and Cummins (2000) found that on long, continuing input streams the cell content then grows without bound, and added the forget gate so the cell can be reset; [[#eq-lstm]] with forget gate is what "LSTM" means today. Gers and Schmidhuber (2000) also proposed **peephole** connections that let the gates see $\mathbf{c}_{t-1}$ directly; later comparisons found them of little benefit on most tasks.

::: theorem The cell path {#thm-carousel}
In the unrolled graph of an LSTM, consider only the paths from $\mathbf{c}_k$ to $\mathbf{c}_t$ that pass through cell states alone ($\mathbf{c}_k\to\mathbf{c}_{k+1}\to\dots\to\mathbf{c}_t$). Their contribution to $\partial\mathbf{c}_t/\partial\mathbf{c}_k$ is

$$
\prod_{s=k+1}^{t}\operatorname{diag}(\mathbf{f}_s) = \operatorname{diag}\Big(\prod_{s=k+1}^{t}\mathbf{f}_s\Big),
$$ {#eq-cell-path}

a diagonal matrix with no weight matrix and no activation slope in it. In the backward pass, the error on the cell is propagated as $\bar{\mathbf{c}}_{s-1}\mathrel{+}=\mathbf{f}_s\odot\bar{\mathbf{c}}_s$.
:::

::: proof
By the path-sum form of the chain rule (the proof of [[neural-networks/backpropagation#thm-backprop]]), $\partial\mathbf{c}_t/\partial\mathbf{c}_k$ is the sum, over directed paths from $\mathbf{c}_k$ to $\mathbf{c}_t$, of the products of the local Jacobians along each path. The edge $\mathbf{c}_{s-1}\to\mathbf{c}_s$ comes from the term $\mathbf{f}_s\odot\mathbf{c}_{s-1}$ in [[#eq-lstm]], whose partial derivative with respect to $\mathbf{c}_{s-1}$, holding the gate fixed, is $\operatorname{diag}(\mathbf{f}_s)$. There is exactly one path using only these edges, and its product is [[#eq-cell-path]]; diagonal matrices commute, so the product is the diagonal of the elementwise products. The backward rule is the vector–Jacobian product of the same edge.
:::

Other paths exist — $\mathbf{c}_{s-1}$ also influences $\mathbf{h}_{s-1}$ and through it all four gates of step $s$ — and they carry the usual products of weight matrices and slopes, so the full Jacobian is not diagonal. But the gradient is a *sum* over paths, and the cell path cannot be cancelled by the others shrinking: if the network keeps $f_{s,j}\approx1$ for a unit $j$, that unit's error passes back undiminished. Whether the cell path carries signal is now decided by values the network learns — the forget gates — rather than by a matrix norm that must sit exactly at $1$.

::: example One LSTM step by hand {#ex-lstm-step}
A one-unit LSTM has $c_{t-1} = 0.8$ and, at step $t$, gate pre-activations $a_i = 0$, $a_f = 2$, $a_o = 1$, $a_g = 0.5$. Compute $c_t$ and $h_t$. If $\partial\mathcal{L}/\partial h_t = 1$ and no other gradient reaches $c_t$, what error reaches $c_{t-1}$ along the cell path?
::: solution
$i = \sigma(0) = 0.5$, $f = \sigma(2) = 0.880797$, $o = \sigma(1) = 0.731059$, $g = \tanh(0.5) = 0.462117$.
$c_t = 0.880797\cdot0.8 + 0.5\cdot0.462117 = 0.704638 + 0.231059 = 0.935696$.
$h_t = 0.731059\cdot\tanh(0.935696) = 0.731059\cdot0.733239 = 0.536040$.

Backward: $\bar c_t = \bar h_t\,o\,(1 - \tanh^2c_t) = 0.731059\cdot(1 - 0.537639) = 0.338013$, and the cell path passes $\bar c_{t-1} = f\,\bar c_t = 0.880797\cdot0.338013 = 0.297721$. The factor per step is just $f = 0.88$. Over ten such steps the error on the cell would be multiplied by $0.88^{10}\approx0.28$; through a simple RNN with a tanh slope of $0.46$ and unit weight it would be $0.46^{10}\approx4\times10^{-4}$.
:::
:::

### The forget-gate bias {#sec-forget-bias}

At initialisation the gate pre-activations are near their biases, so $\mathbf{f}\approx\sigma(\mathbf{b}_f)$. With $\mathbf{b}_f = \mathbf{0}$ every forget gate starts at $0.5$, and the cell path of [[#thm-carousel]] multiplies by $0.5$ per step — faster decay than a decent simple RNN. Gers et al. (2000) already recommended a positive forget bias, and Jozefowicz, Zaremba and Sutskever (2015), in a large search over recurrent architectures, found that initialising $\mathbf{b}_f$ to $1$ closed most of the gap between the LSTM and the best alternatives they found. Larger values set a longer initial memory.

::: widget plot
f: log10(1/(1+exp(-b)))*x; log10(g*s)*x
x: 0, 200
y: -10, 0
sliders: b=1:0:6:0.1; g=0.6:0.2:1:0.01; s=1.2:0.5:2:0.01
labels: \text{LSTM cell path } \sigma(b_f)^{k}; \text{simple RNN bound } (\gamma\sigma_{\max})^{k}
caption: The factor by which an error signal is multiplied after travelling $k$ steps back (horizontal axis), on a $\log_{10}$ scale, at initialisation. Blue: the LSTM cell path with all forget gates at $\sigma(b_f)$. Orange: the bound for a simple RNN with average tanh slope $\gamma$ and $\sigma_{\max}(W_{hh}) = s$. With $b_f = 1$ the cell path is no better than the RNN; at $b_f = 5$ the forget gates are $0.993$, and half the signal survives $100$ steps. Training then moves each unit's gates to the time scale it needs.
:::

::: example Memory time of a forget bias {#ex-forget-time}
With all forget gates at $\sigma(b_f)$ and nothing written, a cell's content after $k$ steps is $\sigma(b_f)^kc_0$. For $b_f = 0, 1, 3, 5$, what fraction remains after $100$ steps, and what is the half-life for $b_f = 5$?
::: solution
$\sigma(0)^{100} = 0.5^{100}\approx7.9\times10^{-31}$; $\sigma(1)^{100} = 0.7311^{100}\approx2.5\times10^{-14}$; $\sigma(3)^{100} = 0.9526^{100}\approx7.8\times10^{-3}$; $\sigma(5)^{100} = 0.99331^{100}\approx0.51$. The half-life for $b_f = 5$ is $\ln0.5/\ln0.99331\approx103$ steps. A useful rule: when $f$ is close to $1$, the memory time constant is about $1/(1 - f)$ steps — here $1/0.0067\approx149$.
:::
:::

## The GRU {#sec-gru}

Cho et al. (2014) proposed a simpler gated cell, now called the **gated recurrent unit**, in the paper that introduced the RNN encoder–decoder ([[sequence-models/seq2seq]]). It has no separate cell state and two gates instead of three.

::: definition Gated recurrent unit {#def-gru}
A **GRU** with hidden size $H$ computes, from $\mathbf{h}_{t-1}$ and $\mathbf{x}_t$,

$$
\begin{aligned}
\mathbf{z}_t &= \sigma(W_z\mathbf{x}_t + U_z\mathbf{h}_{t-1} + \mathbf{b}_z) &&\text{update gate}\\
\mathbf{r}_t &= \sigma(W_r\mathbf{x}_t + U_r\mathbf{h}_{t-1} + \mathbf{b}_r) &&\text{reset gate}\\
\tilde{\mathbf{h}}_t &= \tanh\big(W\mathbf{x}_t + U(\mathbf{r}_t\odot\mathbf{h}_{t-1}) + \mathbf{b}\big) &&\text{candidate}\\
\mathbf{h}_t &= \mathbf{z}_t\odot\mathbf{h}_{t-1} + (1 - \mathbf{z}_t)\odot\tilde{\mathbf{h}}_t
\end{aligned}
$$ {#eq-gru}

with $W_\bullet\in\R^{H\times d}$, $U_\bullet\in\R^{H\times H}$. It has $3\big(H(H + d) + H\big)$ parameters.
:::

The new state is a per-unit convex combination of the old state and the candidate: the update gate plays the role of the LSTM's forget gate, and $1 - \mathbf{z}_t$ that of its input gate, tied together so that keeping and writing trade off. The reset gate lets the candidate ignore the old state, so a unit can start afresh. Exactly as in [[#thm-carousel]], the direct path $\mathbf{h}_{t-1}\to\mathbf{h}_t$ through the first term has Jacobian $\operatorname{diag}(\mathbf{z}_t)$, so a unit with $z\approx1$ passes its value and its gradient through unchanged.

Conventions differ, and it matters when reading code. Cho et al. write the update as above; some textbooks swap the roles of $\mathbf{z}_t$ and $1 - \mathbf{z}_t$. PyTorch and cuDNN use Cho's convention for the interpolation but apply the reset gate *after* the matrix product, $\tanh\big(W\mathbf{x}_t + \mathbf{b} + \mathbf{r}_t\odot(U\mathbf{h}_{t-1} + \mathbf{b}')\big)$, which allows all three $U$-products to be computed as one matrix multiplication.

::: example One GRU step by hand {#ex-gru-step}
A one-unit GRU has $h_{t-1} = 0.5$ and, at step $t$, update pre-activation $-1$, reset pre-activation $1$, and candidate pre-activation $0.3 + 0.8\,(r\,h_{t-1})$ (that is, $Wx + b = 0.3$, $U = 0.8$). Compute $h_t$.
::: solution
$z = \sigma(-1) = 0.268941$, $r = \sigma(1) = 0.731059$. Candidate: $0.3 + 0.8\cdot0.731059\cdot0.5 = 0.592423$, $\tilde h = \tanh(0.592423) = 0.531636$. Then $h_t = 0.268941\cdot0.5 + 0.731059\cdot0.531636 = 0.134471 + 0.388657 = 0.523128$. With $z = 0.27$ the unit mostly takes the candidate; the direct gradient path back to $h_{t-1}$ carries a factor of only $0.27$ this step, while the path through the candidate carries $(1 - z)(1 - \tilde h^2)\,U\,r$ plus the derivatives through the gates.
:::
:::

::: quiz
Which statement about the LSTM is correct?
- [ ] The LSTM avoids exploding gradients, so it needs no clipping.
- [ ] The full Jacobian $\partial\mathbf{c}_t/\partial\mathbf{c}_{t-1}$ equals $\operatorname{diag}(\mathbf{f}_t)$.
- [x] Along the cell path the backward error is multiplied by the forget-gate values, which the network can learn to keep near $1$.
- [ ] Setting all forget-gate biases to $0$ maximises the memory of a freshly initialised LSTM.
::: solution
[[#thm-carousel]] concerns the cell path only; other paths through $\mathbf{h}$ and the gates add terms with weight matrices, so the full Jacobian is not diagonal and gradients can still explode — LSTM language models were routinely trained with clipping. A zero forget bias starts every gate at $0.5$, which halves the cell signal per step; positive biases ($1$ or more) start with longer memory.
:::
:::

## Implementing the LSTM {#sec-code}

The listing implements [[#eq-lstm]] with a classifier on the last hidden state, the backward pass derived from it, and a gradient check. The backward pass follows the forward equations in reverse: the error on $\mathbf{h}_t$ splits into the output gate and the cell, the cell error accumulates the carousel term from the future, and each gate's pre-activation error is its output error times the logistic or tanh slope.

```python
import math, random

def sig(a): return 1 / (1 + math.exp(-a))
def mv(M, v): return [sum(m * x for m, x in zip(row, v)) for row in M]

def init_lstm(H, d, K, rng, forget_bias=1.0):
    s = 1 / math.sqrt(H + d)
    W = {g: [[rng.gauss(0, s) for _ in range(H + d)] for _ in range(H)] for g in "ifog"}
    b = {g: [forget_bias if g == "f" else 0.0] * H for g in "ifog"}
    Wy = [[rng.gauss(0, 1 / math.sqrt(H)) for _ in range(H)] for _ in range(K)]
    return {"W": W, "b": b, "Wy": Wy, "by": [0.0] * K}

def lstm_loss_grad(P, xs, y):
    """xs: list of T input vectors (d,); y: target class at the last step."""
    H = len(P["b"]["i"]); h, c = [0.0] * H, [0.0] * H
    cache = []
    for x in xs:                                              # forward
        u = h + x                                             # [h_{t-1}; x_t]  (H+d,)
        a = {g: [p + q for p, q in zip(mv(P["W"][g], u), P["b"][g])] for g in "ifog"}
        i, f, o = ([sig(v) for v in a[g]] for g in "ifo")
        gg = [math.tanh(v) for v in a["g"]]
        c_new = [fj * cj + ij * gj for fj, cj, ij, gj in zip(f, c, i, gg)]   # cell
        tc = [math.tanh(v) for v in c_new]
        h_new = [oj * t for oj, t in zip(o, tc)]                             # hidden
        cache.append((u, i, f, o, gg, c, tc)); h, c = h_new, c_new
    z = [p + q for p, q in zip(mv(P["Wy"], h), P["by"])]
    m = max(z); e = [math.exp(v - m) for v in z]; p = [v / sum(e) for v in e]
    loss = -math.log(p[y])
    G = {"W": {g: [[0.0] * len(r) for r in P["W"][g]] for g in "ifog"},
         "b": {g: [0.0] * H for g in "ifog"},
         "Wy": [[0.0] * H for _ in P["Wy"]], "by": [0.0] * len(z)}
    dz = p[:]; dz[y] -= 1.0
    for k in range(len(z)):
        G["by"][k] = dz[k]
        for j in range(H): G["Wy"][k][j] = dz[k] * h[j]
    dh = [sum(P["Wy"][k][j] * dz[k] for k in range(len(z))) for j in range(H)]
    dc = [0.0] * H
    for (u, i, f, o, gg, c_prev, tc) in reversed(cache):      # backward through time
        do = [d * t for d, t in zip(dh, tc)]
        dc = [dcj + d * oj * (1 - t * t) for dcj, d, oj, t in zip(dc, dh, o, tc)]
        da = {"i": [d * gj * ij * (1 - ij) for d, gj, ij in zip(dc, gg, i)],
              "f": [d * cp * fj * (1 - fj) for d, cp, fj in zip(dc, c_prev, f)],
              "o": [d * oj * (1 - oj) for d, oj in zip(do, o)],
              "g": [d * ij * (1 - gj * gj) for d, ij, gj in zip(dc, i, gg)]}
        du = [0.0] * len(u)
        for g in "ifog":
            for r in range(H):
                G["b"][g][r] += da[g][r]
                for col in range(len(u)):
                    G["W"][g][r][col] += da[g][r] * u[col]
                    du[col] += P["W"][g][r][col] * da[g][r]
        dh = du[:H]                                           # to h_{t-1}
        dc = [d * fj for d, fj in zip(dc, f)]                 # to c_{t-1}: the carousel
    return loss, G

if __name__ == "__main__":
    rng = random.Random(1)
    H, d, K, T = 4, 3, 2, 6
    P = init_lstm(H, d, K, rng)
    xs = [[rng.gauss(0, 1) for _ in range(d)] for _ in range(T)]
    loss, G = lstm_loss_grad(P, xs, 1)
    for g, r, col in [("f", 0, 1), ("i", 2, 5), ("g", 3, 0), ("o", 1, 6)]:
        old = P["W"][g][r][col]; eps = 1e-5
        P["W"][g][r][col] = old + eps; lp = lstm_loss_grad(P, xs, 1)[0]
        P["W"][g][r][col] = old - eps; lm = lstm_loss_grad(P, xs, 1)[0]
        P["W"][g][r][col] = old
        print(f"W_{g}[{r}][{col}]  bptt {G['W'][g][r][col]: .9f}  numeric {(lp - lm) / (2 * eps): .9f}")
```

Output:

```
W_f[0][1]  bptt  0.000214333  numeric  0.000214333
W_i[2][5]  bptt -0.000056913  numeric -0.000056913
W_g[3][0]  bptt  0.023102620  numeric  0.023102620
W_o[1][6]  bptt  0.010254727  numeric  0.010254727
```

All four gates' gradients agree with central differences to nine decimals. Note the line `dc = [d * fj ...]`: it is [[#thm-carousel]] in code, and the only place where the cell error is carried from one step to the previous one.

### How much gradient reaches the start {#sec-measure}

To see the effect of the cell path, the same functions were extended to return $\partial\ell/\partial\mathbf{x}_1$, the gradient of the final-step loss with respect to the *first* input, on a task whose target is the first of $T$ one-hot symbols (the others are noise). The table gives $\log_{10}\lVert\partial\ell/\partial\mathbf{x}_1\rVert$ averaged over $20$ random initialisations (seeds $0$–$19$), for $H = 8$, at initialisation — before any learning.

| $T$ | simple RNN ($W_{hh}$ std $1/\sqrt H$) | LSTM, $b_f = 0$ | LSTM, $b_f = 1$ | LSTM, $b_f = 3$ | LSTM, $b_f = 5$ |
|---|---|---|---|---|---|
| $10$ | $-1.9$ | $-3.1$ | $-2.0$ | $-1.3$ | $-1.2$ |
| $50$ | $-8.1$ | $-10.4$ | $-4.8$ | $-2.1$ | $-1.7$ |
| $100$ | $-15.4$ | $-19.6$ | $-8.0$ | $-2.6$ | $-2.8$ |

At $T = 100$ the simple RNN passes back about $10^{-15}$ of the signal; an LSTM with $b_f = 0$ is *worse*, because its forget gates halve the cell each step; with $b_f = 3$ or $5$ about $10^{-2.7}$ survives — a factor of roughly $10^{13}$ more than the RNN. (The gradient of a loss is not a probability of success, and the table says nothing about whether training finds a solution; it says that the learning signal exists.)

::: warning "Gates mean the LSTM remembers"
Gates make long memory *learnable*; they do not make it automatic. A freshly initialised LSTM with zero forget bias forgets faster than a simple RNN (the table above), the forget gates must be trained to open on the units that need them, and the cell path is only one of several paths in the gradient. Conversely, on easy tasks — remembering a single symbol through clean noise — a well-initialised simple RNN can latch the information in a saturated unit and succeed over dozens of steps. The LSTM's advantage shows most clearly when the network must both store information for a long time *and* keep processing new input, which is what language requires. Its memory is also finite: an $H$-dimensional cell compresses the past, and [[sequence-models/attention-mechanism]] removes that bottleneck in a different way.
:::

## Choosing a cell {#sec-comparison}

After the LSTM's success, many variants were proposed, and several large studies compared them empirically.

- Chung, Gulcehre, Cho and Bengio (2014) compared LSTMs and GRUs on polyphonic music and speech signal modelling and found both clearly better than simple tanh RNNs, with neither consistently ahead of the other.
- Jozefowicz, Zaremba and Sutskever (2015) evaluated over ten thousand architectures generated by mutation. They found a few that slightly beat the LSTM on some tasks, none decisively, and that the LSTM with forget bias $1$ was competitive with the best.
- Greff et al. ("LSTM: A search space odyssey", 2017) compared eight LSTM variants on speech, handwriting and music and found none significantly better than the standard cell; the forget gate and the output activation were its most important components, and coupling the input and forget gates (as the GRU does) or removing peepholes did not hurt.

In practice the choice was made on cost: a GRU has three quarters of the LSTM's parameters and computation for the same $H$, an LSTM a separate cell that sometimes helped on the longest dependencies. Other ideas for stabilising simple RNNs — initialising $W_{hh}$ to the identity with ReLU units (Le, Jaitly and Hinton, 2015) or constraining it to be unitary (Arjovsky, Shah and Bengio, 2016) — showed that the vanishing problem can also be attacked through the recurrent matrix itself, an idea that returns in the carefully parameterised recurrences of state-space models.

::: example Parameters and cost of LSTM and GRU {#ex-lstm-gru-params}
For input size $d = 256$ and hidden size $H = 512$, count the parameters of an LSTM and a GRU layer, and their multiply–adds per step.
::: solution
One gate block has $H(H + d) + H = 512\cdot768 + 512 = 393{,}728$ parameters. The LSTM has four: $1{,}574{,}912$. The GRU has three: $1{,}181{,}184$. Per step the matrix products dominate: about $4\cdot512\cdot768 = 1{,}572{,}864$ multiply–adds for the LSTM and $1{,}179{,}648$ for the GRU, plus $O(H)$ elementwise work. In an implementation, the four (or three) gate matrices are stacked into one $4H\times(H + d)$ matrix and computed by a single matrix product per step.
:::
:::

::: application Gating beyond recurrent networks
The idea that a learned gate can let a signal bypass a transformation spread well beyond RNNs. **Highway networks** (Srivastava, Greff and Schmidhuber, 2015) applied LSTM-style gates across the *layers* of a deep feed-forward network, $\mathbf{y} = T(\mathbf{x})\odot F(\mathbf{x}) + (1 - T(\mathbf{x}))\odot\mathbf{x}$, and trained networks with a hundred layers; residual networks (He et al., 2016) drop the gate and keep the identity path, which is the form used in every Transformer block ([[neural-networks/initialisation-normalisation#def-residual]]). Gated linear units, including the SwiGLU feed-forward layers of many current language models, multiply one projection by a sigmoid- or Swish-gated other. And the selective state-space models of [[sequence-models/state-space-models]] are, in effect, linear recurrences whose decay plays the part of a forget gate.
:::

::: history
Sepp Hochreiter's diploma thesis (Technische Universität München, 1991, supervised by Jürgen Schmidhuber) analysed why error signals in recurrent networks vanish or explode, and Bengio, Simard and Frasconi's "Learning long-term dependencies with gradient descent is difficult" (*IEEE Transactions on Neural Networks*, 1994) proved the tension between robust storage and gradient flow. Hochreiter and Schmidhuber's "Long short-term memory" (*Neural Computation*, 1997) introduced the memory cell with input and output gates and solved artificial tasks with time lags of over a thousand steps. Gers, Schmidhuber and Cummins added the forget gate ("Learning to forget", *Neural Computation*, 2000). Alex Graves trained bidirectional LSTMs with connectionist temporal classification for handwriting and speech recognition in the late 2000s, and LSTMs became the default sequence model of the deep-learning revival: Google's speech recogniser, Sutskever, Vinyals and Le's translation system and Google Neural Machine Translation (2016) were LSTM-based. Pascanu, Mikolov and Bengio's "On the difficulty of training recurrent neural networks" (ICML 2013) made gradient clipping standard. Cho et al. introduced the GRU in 2014.
:::

::: summary
- Long-range gradients in a simple RNN contain the product $\prod_sD_sW_{hh}$; they vanish if $\gamma\sigma_{\max}(W_{hh}) < 1$, and can explode only if $\sigma_{\max} > 1/\gamma$. Robust storage requires contracting dynamics, which makes vanishing the typical case.
- **Gradient clipping** rescales a gradient whose (global) norm exceeds a threshold, keeping its direction; it cures bursts of explosion, not vanishing.
- The **LSTM** adds a cell $\mathbf{c}_t = \mathbf{f}_t\odot\mathbf{c}_{t-1} + \mathbf{i}_t\odot\mathbf{g}_t$ and exposes $\mathbf{h}_t = \mathbf{o}_t\odot\tanh\mathbf{c}_t$. Along the cell path the Jacobian is $\operatorname{diag}(\prod\mathbf{f}_s)$ — the constant error carousel — so learned forget gates near $1$ let errors travel far.
- The forget bias sets the initial memory: $\sigma(b_f)^k$ after $k$ steps, time constant about $1/(1 - f)$. Zero bias forgets fast; $b_f\ge1$ is standard.
- The **GRU** interpolates $\mathbf{h}_t = \mathbf{z}_t\odot\mathbf{h}_{t-1} + (1 - \mathbf{z}_t)\odot\tilde{\mathbf{h}}_t$ with a reset gate in the candidate; it has $3/4$ of the LSTM's parameters and performs comparably in published comparisons.
- Gates make long memory learnable, not guaranteed; the state remains a fixed-size bottleneck.
:::

## Exercises

::: exercise Counting LSTM parameters {level=1 check="4*(128*(128+64)+128)"}
How many parameters does an LSTM layer with input size $64$ and hidden size $128$ have (weights and biases)?
::: solution
$4\big(H(H + d) + H\big) = 4(128\cdot192 + 128) = 4\cdot24{,}704 = 98{,}816$.
:::
:::

::: exercise Clipping {level=1 check="1.2"}
A gradient has global norm $25$ and its first component is $6$. After clipping to norm $c = 5$, what is the first component?
::: solution
The scale factor is $5/25 = 0.2$, so the first component becomes $6\cdot0.2 = 1.2$. The direction is unchanged and the norm is now $5$.
:::
:::

::: exercise Forget gate and half-life {level=1 check="log(0.5)/log(1/(1+exp(-2)))"}
All forget gates of an LSTM are at $\sigma(2)$ and the input gates are closed. After how many steps has a cell's content halved?
::: solution
$\sigma(2) = 0.880797$; the content after $k$ steps is $0.880797^kc_0$, so the half-life is $\ln0.5/\ln0.880797\approx5.47$ steps. A bias of $2$ is far too small for long memory on its own; the network must learn larger forget pre-activations for units that store information.
:::
:::

::: exercise The LSTM without a forget gate {level=2}
In the 1997 LSTM, $\mathbf{c}_t = \mathbf{c}_{t-1} + \mathbf{i}_t\odot\mathbf{g}_t$. Show that along the cell path the Jacobian is exactly the identity, and explain why the cell content can grow without bound on a long input stream. Why does the output nonlinearity $\tanh(\mathbf{c}_t)$ not solve this?
::: solution
The cell-path edge has local Jacobian $\partial\mathbf{c}_t/\partial\mathbf{c}_{t-1} = I$ (holding the gates fixed), so the product over any number of steps is $I$: an exact carousel. Each step adds $\mathbf{i}_t\odot\mathbf{g}_t$ with entries in $(-1, 1)$; on a continuing stream these additions accumulate, and if they have a consistent sign the cell grows linearly with time. The output $\tanh(\mathbf{c}_t)$ is bounded, but once $\lvert c\rvert$ is large it saturates at $\pm1$, so $\mathbf{h}_t$ no longer reflects the cell's content, and its derivative $1 - \tanh^2c_t\approx0$ blocks the gradient from the output into the cell. The cell becomes useless until it is reset, which is what the forget gate allows (Gers et al., 2000).
:::
:::

::: exercise A GRU becomes a simple RNN {level=2}
Show that a GRU with $\mathbf{z}_t\equiv\mathbf{0}$ and $\mathbf{r}_t\equiv\mathbf{1}$ is a simple RNN, and that one with $\mathbf{z}_t\equiv\mathbf{1}$ ignores its input. What gate values give a leaky integrator $\mathbf{h}_t = \lambda\mathbf{h}_{t-1} + (1 - \lambda)\tilde{\mathbf{h}}_t$?
::: solution
With $\mathbf{z} = \mathbf{0}$, $\mathbf{h}_t = \tilde{\mathbf{h}}_t = \tanh(W\mathbf{x}_t + U\mathbf{h}_{t-1} + \mathbf{b})$ when $\mathbf{r} = \mathbf{1}$: exactly the Elman update. With $\mathbf{z} = \mathbf{1}$, $\mathbf{h}_t = \mathbf{h}_{t-1}$ for all $t$: the state is frozen and the input has no effect. A constant update gate $\mathbf{z}_t = \lambda\mathbf{1}$ (for example by large weights driving $\sigma$ to a fixed value, or, in the limit, by setting $U_z = W_z = 0$ and $\mathbf{b}_z = \operatorname{logit}\lambda$) gives the leaky integrator, an exponential moving average of the candidates with time constant $1/(1 - \lambda)$.
:::
:::

::: exercise Backward pass through the output gate {level=2}
For [[#eq-lstm]], given $\bar{\mathbf{h}}_t$ and the cell error $\bar{\mathbf{c}}_t^{\text{future}} = \mathbf{f}_{t+1}\odot\bar{\mathbf{c}}_{t+1}$ arriving from step $t + 1$, derive the errors on the output-gate pre-activation, on $\mathbf{c}_t$, and on the forget-gate pre-activation. Compare with the listing.
::: solution
From $\mathbf{h}_t = \mathbf{o}_t\odot\tanh\mathbf{c}_t$: $\bar{\mathbf{o}}_t = \bar{\mathbf{h}}_t\odot\tanh\mathbf{c}_t$, so the output-gate pre-activation receives $\bar{\mathbf{h}}_t\odot\tanh\mathbf{c}_t\odot\mathbf{o}_t\odot(1 - \mathbf{o}_t)$. The cell receives two contributions (fan-out): $\bar{\mathbf{c}}_t = \bar{\mathbf{h}}_t\odot\mathbf{o}_t\odot(1 - \tanh^2\mathbf{c}_t) + \mathbf{f}_{t+1}\odot\bar{\mathbf{c}}_{t+1}$. From $\mathbf{c}_t = \mathbf{f}_t\odot\mathbf{c}_{t-1} + \dots$: $\bar{\mathbf{f}}_t = \bar{\mathbf{c}}_t\odot\mathbf{c}_{t-1}$, and the forget pre-activation receives $\bar{\mathbf{c}}_t\odot\mathbf{c}_{t-1}\odot\mathbf{f}_t\odot(1 - \mathbf{f}_t)$. These are the lines `do`, `dc` and `da["f"]` of the listing, where the carousel term was already folded into `dc` at the end of the previous iteration.
:::
:::

::: exercise A vanishing bound for sigmoid units {level=2 check="(0.25*3)^20"}
A simple RNN uses the logistic sigmoid as its activation and $\sigma_{\max}(W_{hh}) = 3$. Bound $\lVert\partial\mathbf{h}_{t}/\partial\mathbf{h}_{t-20}\rVert$. Can this network's gradients explode?
::: solution
The sigmoid's slope is at most $\gamma = \frac14$, so the bound is $(\frac14\cdot3)^{20} = 0.75^{20}\approx3.2\times10^{-3}$. Since $\sigma_{\max} = 3 < 1/\gamma = 4$, [[#prop-conditions]] (1) applies: the long-range terms vanish geometrically, and by (2) they cannot explode. Explosion would require $\sigma_{\max} > 4$.
:::
:::

::: exercise Reproduce the measurement {level=3}
Modify the listing so that `lstm_loss_grad` also returns $\lVert\partial\ell/\partial\mathbf{x}_1\rVert$, generate the "remember the first symbol" sequences of [[#sec-measure]] (first symbol $0$ or $1$, then $T - 1$ symbols from $\{2, 3\}$, one-hot, target the first symbol), and reproduce the trend of the LSTM columns of the table for $T = 10, 50, 100$. Then derive a rough prediction: with forget gates at $f = \sigma(b_f)$ and the gradient dominated by the cell path, how should $\log_{10}\lVert\partial\ell/\partial\mathbf{x}_1\rVert$ grow with $T$?
::: solution
In the backward loop, the slice `du[H:]` at the last iteration (the first time step) is $\partial\ell/\partial\mathbf{x}_1$; keep it and return its norm. Averaging $\log_{10}$ of the norm over seeds $0$–$19$ with `init_lstm(8, 4, 2, random.Random(seed), forget_bias=b)` gives the table's numbers (the exact values depend on how the sequences are drawn from the generator). Prediction: if the cell path dominates, the error is multiplied by about $f$ per step, so $\log_{10}\lVert\cdot\rVert\approx\text{const} + (T - 1)\log_{10}\sigma(b_f)$. For $b_f = 1$, $\log_{10}0.731 = -0.136$ per step, predicting a drop of about $5.4$ between $T = 10$ and $T = 50$; the measured drop is $2.8$, less steep because the gates are not exactly at $\sigma(b_f)$ — the input contributes to the pre-activations and some forget gates are larger. For $b_f = 3$ the prediction is $-0.021$ per step, a drop of $0.84$ from $T = 10$ to $50$, close to the measured $0.8$.
:::
:::

::: exercise The robustness–gradient dilemma {level=3}
Consider a scalar RNN $h_t = \tanh(wh_{t-1} + x_t)$ with $w = 2$ and no input after $t = 1$. Find the nonzero fixed points of $h = \tanh(2h)$ numerically, show that they are stable, and compute the factor $\partial h_{t}/\partial h_{t-1}$ at them. Relate the result to the argument of Bengio, Simard and Frasconi (1994).
::: solution
Iterating $h\leftarrow\tanh(2h)$ from $h = 1$ gives $h^*\approx\pm0.9575$. The derivative of the map is $2(1 - \tanh^2(2h^*)) = 2(1 - h^{*2}) = 2(1 - 0.9168) = 0.1664$, below $1$, so the fixed points are stable: the network can store one bit as the sign of $h$, and small perturbations decay by a factor $0.17$ per step. But the same factor multiplies the gradient: after $10$ steps at the fixed point, $\partial h_t/\partial h_{t-10}\approx0.1664^{10}\approx1.6\times10^{-8}$. The stability that makes the memory robust to noise is exactly what makes the gradient from a later loss vanish — the dilemma Bengio et al. formalised. The LSTM sidesteps it by storing information in a cell whose retention is controlled by a gate rather than by contracting dynamics.
:::
:::
