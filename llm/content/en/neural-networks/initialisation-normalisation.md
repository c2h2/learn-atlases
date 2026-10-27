For a quarter of a century after backpropagation was popularised, networks with more than a few hidden layers were considered nearly impossible to train from a random start. The obstacle was not the optimiser but the **scale of the signals**: passing through layer after layer, activations and gradients shrink or grow geometrically, so that after twenty layers they are a million times too small or too large and the first layers receive no useful gradient at all. Three ideas, all from 2010 to 2016, removed the obstacle: initialisations that preserve the scale of signals by design, **normalisation** layers that restore it at every layer, and **residual connections** that give the gradient a path around every layer. A modern Transformer uses all three.

This chapter derives the conditions under which signals neither vanish nor explode, obtains Xavier and He initialisation from them, defines batch, layer and RMS normalisation and the property they share, and explains why residual networks of a hundred or more layers train. It assumes the backpropagation equations of [[neural-networks/backpropagation#thm-mlp-backprop]] and the variance computation of [[math-for-ml/probability#prop-init]], which it extends.

## Vanishing and exploding gradients {#sec-vanishing}

Write an MLP as $\mathbf{h}_\ell = \phi(\mathbf{a}_\ell)$, $\mathbf{a}_\ell = W_\ell\mathbf{h}_{\ell-1}$ (biases are zero at initialisation and can be ignored here). By the chain rule the gradient reaching layer $\ell$ is

$$
\frac{\partial\mathcal{L}}{\partial\mathbf{h}_\ell} = J_{\ell+1}^\top J_{\ell+2}^\top\cdots J_L^\top\,\frac{\partial\mathcal{L}}{\partial\mathbf{h}_L},\qquad J_k = \frac{\partial\mathbf{h}_k}{\partial\mathbf{h}_{k-1}} = \operatorname{diag}\big(\phi'(\mathbf{a}_k)\big)W_k,
$$ {#eq-jacobian-product}

a product of $L - \ell$ matrices. Products of many matrices behave like powers of a number: unless each factor preserves lengths on average, the product shrinks or grows exponentially in the number of factors. The forward signal $\mathbf{h}_\ell$ is a product of the same kind.

::: proposition Signal propagation in a random network {#prop-propagation}
Let the weights of layer $\ell$ be independent with mean $0$ and variance $\sigma_\ell^2$, independent of everything before them, and let $q_\ell = \frac1{d_\ell}\E\lVert\mathbf{a}_\ell\rVert^2$ be the mean squared pre-activation. Suppose $\phi$ is the identity or ReLU, and for ReLU that the pre-activations are symmetric about $0$. Then

$$
q_\ell = d_{\ell-1}\sigma_\ell^2\,c_\phi\,q_{\ell-1},\qquad c_{\text{identity}} = 1,\quad c_{\text{ReLU}} = \tfrac12,
$$ {#eq-propagation}

so $q_L = q_1\prod_{\ell=2}^Ld_{\ell-1}\sigma_\ell^2c_\phi$, which vanishes or explodes geometrically unless $d_{\ell-1}\sigma_\ell^2c_\phi = 1$. The same holds for the mean squared gradient $\frac1{d_{\ell-1}}\E\lVert\partial\mathcal{L}/\partial\mathbf{a}_{\ell-1}\rVert^2$ propagating backwards, with $d_\ell$ (fan-out) in place of $d_{\ell-1}$ (fan-in), under the usual simplifying assumption that the weights used in the backward pass are independent of the forward activations.
:::

::: proof
By [[math-for-ml/probability#prop-init]], each coordinate of $\mathbf{a}_\ell = W_\ell\mathbf{h}_{\ell-1}$ has mean $0$ and second moment $d_{\ell-1}\sigma_\ell^2\,\E[h_{\ell-1,j}^2]$, averaged over $j$. For the identity, $\E h^2 = \E a^2$, so $c = 1$. For ReLU with a pre-activation $a$ symmetric about $0$, $\E[\operatorname{ReLU}(a)^2] = \E[a^2\,[a > 0]] = \frac12\E[a^2]$ by symmetry, so $c = \frac12$. Iterating gives the product. Backwards, $\partial\mathcal{L}/\partial\mathbf{a}_{\ell-1} = \phi'(\mathbf{a}_{\ell-1})\odot W_\ell^\top\boldsymbol\delta_\ell$; each coordinate of $W_\ell^\top\boldsymbol\delta_\ell$ is a sum of $d_\ell$ terms, with second moment $d_\ell\sigma_\ell^2$ times that of $\boldsymbol\delta_\ell$, and multiplying by $\phi'$ multiplies the second moment by $\E[\phi'(a)^2]$, which is $1$ for the identity and $\frac12$ for ReLU.
:::

For other activations the factor $c_\phi$ depends on $q$ itself, and the analysis tracks a nonlinear map $q_{\ell-1}\mapsto q_\ell$ and its fixed points (Poole et al., 2016; Schoenholz et al., 2017, "deep information propagation"). For tanh, $c_\phi < 1$ and the signal slowly contracts; for the logistic sigmoid the derivative is at most $\frac14$, so gradients shrink by at least a factor of four per layer unless the weights are large, and large weights saturate the units (exercise 10 of [[neural-networks/backpropagation]]). This is the **vanishing gradient problem** identified by Hochreiter (1991) for recurrent networks and analysed by Bengio, Simard and Frasconi (1994).

::: widget plot
f: x*log10(g); log10(1 + a*x)
x: 0, 50
y: -6, 6
sliders: g=1.2:0.5:2:0.01; a=1:0:2:0.05
hlines: 0
labels: plain network: $\log_{10}$ of signal size with gain $g$ per layer; pre-norm residual network: $\log_{10}(1 + aL)$
caption: How the mean squared signal changes with depth $L$. In a plain network each layer multiplies it by the gain $g = d\sigma^2c_\phi$ of [[#eq-propagation]]; any $g\ne1$ gives a straight line on this logarithmic scale — a factor of $10^6$ after fifty layers for $g = 1.32$. In a residual network whose branches see normalised inputs, each block *adds* a roughly constant amount $a$, and the signal grows only linearly. Gradients flowing backwards behave the same way.
:::

::: example Small errors in scale compound {#ex-compound}
A $50$-layer ReLU network of width $512$ is initialised with standard deviation $0.066$ instead of He's $\sqrt{2/512} = 0.0625$. By what factor does the mean squared signal change over the network? What if the standard deviation is $0.059$?
::: solution
The gain per layer is $512\cdot0.066^2\cdot\frac12 = 1.115$, so over $50$ layers the factor is $1.115^{50}\approx230$. With $0.059$ the gain is $512\cdot0.059^2/2 = 0.891$ and the factor is $0.891^{50}\approx0.0031$. A $6\%$ error in the standard deviation becomes a factor of several hundred in the signal's second moment. For comparison, the exact He value gives gain $1$, and gains of $1.1$ and $0.9$ give $1.1^{50} = 117$ and $0.9^{50} = 0.0052$.
:::
:::

::: widget distribution
dist: normal
params: mu=0, sigma=0.0625
a: -0.125
b: 0.125
caption: The He initialisation $\Normal(0, 2/n)$ for a layer of width $n = 512$, with the interval $\pm2\sigma$ shaded. Many code bases draw from this distribution truncated to $\pm2\sigma$ (resampling values outside), which slightly reduces the variance — to about $0.774\sigma^2$ — unless the standard deviation is corrected for it. Change $\sigma$ to see how narrow the initial weights are: almost all lie within $\pm0.13$.
:::

## Initialisation {#sec-init}

### Breaking symmetry {#sec-symmetry}

The simplest initialisation, all weights zero, fails for a reason unrelated to scale.

::: proposition Identical units stay identical {#prop-symmetry}
If two hidden units of an MLP have identical incoming weights and identical outgoing weights, they receive identical gradients, so gradient descent (or any optimiser applied elementwise, such as Adam) keeps them identical for ever. In particular, initialising all weights of a layer to the same constant makes the layer behave like a single unit.
:::

::: proof
Let units $i$ and $j$ of layer $\ell$ have equal incoming weight rows $W_{\ell, i:} = W_{\ell, j:}$ and biases, and equal outgoing columns $W_{\ell+1, :i} = W_{\ell+1, :j}$. Then for every input they have equal pre-activations and activations. Their error signals are $\delta_{\ell, i} = \phi'(a_{\ell, i})(W_{\ell+1, :i}^\top\boldsymbol\delta_{\ell+1})$ and the same with $j$, hence equal. The incoming weight gradients $\delta_{\ell, i}\mathbf{h}_{\ell-1}$ and $\delta_{\ell, j}\mathbf{h}_{\ell-1}$ are equal, and the outgoing ones $\boldsymbol\delta_{\ell+1}h_{\ell, i}$ and $\boldsymbol\delta_{\ell+1}h_{\ell, j}$ are equal. After the update the two units are still identical, and by induction they remain so. Swapping the two units is a symmetry of the network that the gradient respects.
:::

So weights must be **random**, to break the symmetry between units, with the scale chosen by [[#prop-propagation]]. Biases can start at zero, since the random weights already make units different.

### Xavier and He initialisation {#sec-xavier-he}

::: definition Xavier (Glorot) and He initialisation {#def-init}
For a layer with fan-in $n_{\text{in}}$ and fan-out $n_{\text{out}}$, draw the weights independently with mean $0$ and variance

$$
\sigma^2_{\text{Xavier}} = \frac{2}{n_{\text{in}} + n_{\text{out}}}\qquad\text{or}\qquad\sigma^2_{\text{He}} = \frac{2}{n_{\text{in}}},
$$

from a normal distribution, or from the uniform distribution on $[-r, r]$ with $r = \sqrt{3\sigma^2}$ (since a uniform variable on $[-r, r]$ has variance $r^2/3$). **Xavier** (or **Glorot**) initialisation (Glorot and Bengio, 2010) targets activations that are approximately linear near $0$, such as tanh; **He** (or **Kaiming**) initialisation (He, Zhang, Ren and Sun, 2015) targets ReLU. The variance $1/n_{\text{in}}$ is called **LeCun** initialisation (LeCun et al., 1998).
:::

::: proposition Where the formulas come from {#prop-init-derivation}
Under the assumptions of [[#prop-propagation]], the forward signal is preserved exactly when $n_{\text{in}}\sigma^2c_\phi = 1$ and the backward gradient when $n_{\text{out}}\sigma^2c_\phi = 1$. For the identity ($c_\phi = 1$) the two conditions are $\sigma^2 = 1/n_{\text{in}}$ and $\sigma^2 = 1/n_{\text{out}}$, and Xavier's $\sigma^2 = 2/(n_{\text{in}} + n_{\text{out}})$ is their harmonic mean, satisfying both when $n_{\text{in}} = n_{\text{out}}$. For ReLU ($c_\phi = \frac12$) the forward condition is $\sigma^2 = 2/n_{\text{in}}$, He's choice.
:::

::: proof
Set the per-layer factor of [[#eq-propagation]] — $n_{\text{in}}\sigma^2c_\phi$ forwards, $n_{\text{out}}\sigma^2c_\phi$ backwards — equal to $1$ and solve for $\sigma^2$. The harmonic mean of $1/n_{\text{in}}$ and $1/n_{\text{out}}$ is $2\big/\big(n_{\text{in}} + n_{\text{out}}\big)$.
:::

Glorot and Bengio could not satisfy both conditions when consecutive layers have different widths and chose the compromise. He et al. observed that with ReLU and fan-in scaling the backward factor is $n_{\text{out}}/n_{\text{in}}$ per layer, and the product of these factors telescopes to the ratio of the first and last widths — a constant, not an exponential — so preserving either direction suffices. The deeper point of both papers is that the right scale depends on the activation: Xavier's $1/n$ (for equal widths) applied to ReLU halves the signal at every layer, and a $30$-layer ReLU network so initialised starts with a signal $2^{-15}\approx3\times10^{-5}$ times too small, as the experiment below shows. He et al. trained a $30$-layer ReLU network from scratch with their initialisation, which had failed with Xavier's.

::: example Initial scales for a digit classifier {#ex-init-scales}
For the first layer of the MLP of [[neural-networks/perceptrons-mlps#ex-params]] ($n_{\text{in}} = 784$, $n_{\text{out}} = 512$), give the standard deviation under LeCun, Xavier (normal) and He initialisation, and the bound $r$ for Xavier uniform.
::: solution
LeCun: $\sqrt{1/784} = 0.0357$. Xavier normal: $\sqrt{2/(784 + 512)} = \sqrt{2/1296} = 0.0393$. He: $\sqrt{2/784} = 0.0505$. Xavier uniform: $r = \sqrt{3\cdot2/1296} = \sqrt{6/1296} = 0.0680$. The differences look small, but they compound: per layer, He's variance is $1296/784\approx1.65$ times Xavier's here, and between Xavier and He for square layers it is a factor $2$, which over $30$ layers is $2^{30}\approx10^9$ in variance.
:::
:::

### An experiment {#sec-experiment}

The listing pushes a batch of $32$ unit-variance inputs through $30$ layers of width $128$ and backpropagates a random unit-variance gradient from the top, recording the root-mean-square activation and gradient at layers $1$, $10$, $20$ and $30$. The last two cases use residual blocks $H\leftarrow H + s\cdot\operatorname{ReLU}(H)W$, discussed in [[#sec-residual]].

```python
import math, random

rng = random.Random(0)
n, depth, B = 128, 30, 32                     # width, number of layers, batch size

def matmul(H, W):                             # H: (B, n), W: (n, n) -> (B, n)
    Wt = list(zip(*W))
    return [[sum(h * w for h, w in zip(row, col)) for col in Wt] for row in H]

def rms(M):                                   # root-mean-square entry of a matrix
    return math.sqrt(sum(v * v for row in M for v in row) / (len(M) * len(M[0])))

def run(act, std, residual=False, s=1.0):
    """Plain layers H <- act(H W) or residual blocks H <- H + s * act(H) W, with W ~ N(0, std^2).
    Returns rms of the activations H_l and of the gradients dL/dH_l for l = 1, 10, 20, 30."""
    Ws = [[[rng.gauss(0, std) for _ in range(n)] for _ in range(n)] for _ in range(depth)]
    H = [[rng.gauss(0, 1) for _ in range(n)] for _ in range(B)]   # (B, n) unit-variance input
    cache, fwd = [], []
    for W in Ws:                                                  # forward pass
        if residual:
            cache.append(H)                                       # block input
            F = matmul([[act(h)[0] for h in row] for row in H], W)
            H = [[h + s * f for h, f in zip(hr, fr)] for hr, fr in zip(H, F)]
        else:
            A = matmul(H, W)
            cache.append(A)                                       # pre-activation
            H = [[act(a)[0] for a in row] for row in A]
        fwd.append(rms(H))
    G = [[rng.gauss(0, 1) for _ in range(n)] for _ in range(B)]   # a random dL/dH_30
    bwd = [rms(G)]
    for W, C in zip(reversed(Ws), reversed(cache)):               # backward pass
        Wt = [list(r) for r in zip(*W)]
        if residual:          # dL/dH_in = G + s * (G W^T) * act'(H_in): identity path + branch
            GW = matmul(G, Wt)
            G = [[g + s * d * act(h)[1] for g, d, h in zip(gr, dr, hr)]
                 for gr, dr, hr in zip(G, GW, C)]
        else:                 # dL/dH_in = (G * act'(A)) W^T
            D = [[g * act(a)[1] for g, a in zip(gr, ar)] for gr, ar in zip(G, C)]
            G = matmul(D, Wt)
        bwd.append(rms(G))
    bwd.reverse()                                                 # bwd[l] = rms dL/dH_l, l = 0..30
    pick = [1, 10, 20, 30]
    return [fwd[l - 1] for l in pick], [bwd[l] for l in pick]

tanh = lambda a: (math.tanh(a), 1 - math.tanh(a) ** 2)
relu = lambda a: (max(a, 0.0), 1.0 if a > 0 else 0.0)
cases = [("plain tanh, std 1/sqrt(n)      ", tanh, 1 / math.sqrt(n), False, 1.0),
         ("plain ReLU, std 1/sqrt(n)      ", relu, 1 / math.sqrt(n), False, 1.0),
         ("plain ReLU, std sqrt(2/n) (He) ", relu, math.sqrt(2 / n), False, 1.0),
         ("plain ReLU, std 1.5 sqrt(2/n)  ", relu, 1.5 * math.sqrt(2 / n), False, 1.0),
         ("residual ReLU, He, s = 1       ", relu, math.sqrt(2 / n), True, 1.0),
         ("residual ReLU, He, s = 1/sqrt30", relu, math.sqrt(2 / n), True, 1 / math.sqrt(depth))]
print("                                 rms H_l, l = 1/10/20/30            |  rms dL/dH_l, l = 1/10/20/30")
for name, act, std, res, s in cases:
    f, b = run(act, std, res, s)
    print(f"{name}  " + " ".join(f"{v:8.2e}" for v in f) + "  |  " + " ".join(f"{v:8.2e}" for v in b))
```

```text
                                 rms H_l, l = 1/10/20/30            |  rms dL/dH_l, l = 1/10/20/30
plain tanh, std 1/sqrt(n)        6.21e-01 2.22e-01 1.48e-01 1.16e-01  |  2.03e-01 5.45e-01 7.85e-01 9.95e-01
plain ReLU, std 1/sqrt(n)        7.41e-01 2.03e-02 3.49e-04 9.32e-06  |  3.54e-05 9.10e-04 3.26e-02 9.93e-01
plain ReLU, std sqrt(2/n) (He)   9.97e-01 7.27e-01 7.35e-01 5.00e-01  |  7.46e-01 8.32e-01 7.64e-01 1.01e+00
plain ReLU, std 1.5 sqrt(2/n)    1.50e+00 5.20e+01 3.77e+03 1.47e+05  |  1.42e+05 3.24e+03 5.32e+01 9.97e-01
residual ReLU, He, s = 1         1.40e+00 4.35e+01 1.75e+03 5.27e+04  |  2.79e+04 1.11e+03 3.35e+01 9.95e-01
residual ReLU, He, s = 1/sqrt30  1.02e+00 1.17e+00 1.38e+00 1.65e+00  |  1.61e+00 1.37e+00 1.19e+00 1.02e+00
```

The ReLU rows are [[#prop-propagation]] in action. With variance $1/n$ the gain is $\frac12$ per layer and both the activations and the gradient at the first layer collapse by four to five orders of magnitude; with He's $2/n$ they stay of order $1$; multiplying the standard deviation by $1.5$ (variance gain $2.25$) makes them explode by five orders of magnitude. The measured values drift somewhat from the mean prediction — the He activations fall to $0.5$ by layer $30$, and the collapse under $1/n$ is about three times worse than $2^{-15}$ — because at finite width each layer's gain is itself random, and a product of random gains drifts like a random walk in its logarithm (Hanin and Rolnick, 2018). The tanh network contracts slowly, as tanh's gain is below $1$ away from $0$.

::: warning Good initialisation is necessary, not sufficient
A correct variance at initialisation only guarantees a well-scaled network at step zero. Training changes the weights, and nothing in the initialisation keeps the scales right afterwards; the deeper the network and the higher the learning rate, the sooner they drift. This is why deep networks also use normalisation layers or residual connections (usually both), and why practitioners monitor activation and gradient norms throughout training rather than only at the start. Conversely, with normalisation in every layer the exact initial scale matters much less — though not at all is too strong: the scale of residual branches still matters (see [[#sec-residual]]).
:::

## Normalisation layers {#sec-normalisation}

Instead of hoping the scale stays right, a normalisation layer resets it explicitly, standardising activations to zero mean and unit variance and then applying a learned scale and shift. The variants differ in which numbers they compute the statistics over.

::: definition Batch normalisation {#def-batchnorm}
For a mini-batch of pre-activations $A\in\R^{B\times d}$, **batch normalisation** (Ioffe and Szegedy, 2015) normalises each feature $k$ over the batch:

$$
\mu_k = \frac1B\sum_{r=1}^BA_{rk},\qquad s_k^2 = \frac1B\sum_{r=1}^B(A_{rk} - \mu_k)^2,\qquad\operatorname{BN}(A)_{rk} = \gamma_k\frac{A_{rk} - \mu_k}{\sqrt{s_k^2 + \epsilon}} + \beta_k,
$$

with learned $\boldsymbol\gamma, \boldsymbol\beta\in\R^d$ and a small $\epsilon$. During training the statistics come from the current batch (and the backward pass differentiates through them); running averages of $\mu_k$ and $s_k^2$ are kept and used instead at inference, so that a prediction does not depend on the other examples in the batch. In convolutional networks the statistics for each channel are taken over the batch *and* all spatial positions.
:::

::: definition Layer and RMS normalisation {#def-layer-rms}
**Layer normalisation** (Ba, Kiros and Hinton, 2016) normalises each example over its own $d$ features: for a row $\mathbf{a}\in\R^d$, $\mu = \frac1d\sum_ka_k$, $s^2 = \frac1d\sum_k(a_k - \mu)^2$ and $\operatorname{LN}(\mathbf{a}) = \boldsymbol\gamma\odot(\mathbf{a} - \mu)/\sqrt{s^2 + \epsilon} + \boldsymbol\beta$. **RMS normalisation** (Zhang and Sennrich, 2019) omits the centring and the shift: $\operatorname{RMSNorm}(\mathbf{a}) = \boldsymbol\gamma\odot\mathbf{a}/\sqrt{\frac1d\sum_ka_k^2 + \epsilon}$. Both are the same at training and inference time and do not depend on the batch.
:::

These are the normalisations of every Transformer, defined there as [[transformers/transformer-block#def-layernorm]] and [[transformers/transformer-block#def-rmsnorm]] and computed by hand in [[transformers/transformer-block#ex-norms]]. Batch normalisation standardises a feature *across examples*, layer and RMS normalisation standardise an example *across features*. A further variant, **group normalisation** (Wu and He, 2018), normalises over groups of channels within each example, for convolutional networks trained with small batches.

::: example Batch normalisation by hand {#ex-bn}
One feature takes the values $1, 2, 3, 6$ on a batch of four examples. Compute the normalised values (with $\epsilon$ negligible, $\gamma = 1$, $\beta = 0$), and what layer normalisation would do to a single example with these four features.
::: solution
The mean is $3$ and the (biased) variance $\frac14(4 + 1 + 0 + 9) = 3.5$, so $s = 1.871$ and the normalised values are $(-2, -1, 0, 3)/1.871 = (-1.069, -0.535, 0, 1.604)$: mean $0$, variance $1$. If instead $(1, 2, 3, 6)$ are the four features of one example, layer normalisation performs the same arithmetic on that row and gives the same numbers — the difference between the two is which axis the four numbers come from. RMS normalisation of the row divides by $\sqrt{(1 + 4 + 9 + 36)/4} = \sqrt{12.5} = 3.536$, giving $(0.283, 0.566, 0.849, 1.697)$, without centring.
:::
:::

Normalisation makes the forward signal well scaled by construction. It also changes the geometry of the loss in a way that explains much of its effect on training.

::: proposition Scale invariance of normalised layers {#prop-scale-invariance}
Let $\mathcal{L}(W)$ depend on a weight matrix $W$ only through $\operatorname{Norm}(W\mathbf{x})$ (for all inputs $\mathbf{x}$), where $\operatorname{Norm}$ is batch, layer or RMS normalisation and $\epsilon = 0$. Then for every $c > 0$:

1. $\mathcal{L}(cW) = \mathcal{L}(W)$;
2. $\langle\nabla\mathcal{L}(W), W\rangle = 0$: the gradient is orthogonal to the weights;
3. $\nabla\mathcal{L}(cW) = \frac1c\nabla\mathcal{L}(W)$: scaling the weights up scales the gradient down.

(For batch normalisation the statement holds for each row of $W$ separately.)
:::

::: proof
(1) Each normalisation divides by a standard deviation (or RMS) computed from the same numbers it normalises, so multiplying its input by $c > 0$ multiplies the numerator and the denominator by $c$; with the mean subtracted first, $c$ also cancels in the centred numerator. (2) Differentiate $\mathcal{L}(cW) = \mathcal{L}(W)$ with respect to $c$ at $c = 1$: by the chain rule $\langle\nabla\mathcal{L}(W), W\rangle = 0$. (3) Differentiate $\mathcal{L}(cW) = \mathcal{L}(W)$ with respect to $W$: the left side gives $c\,\nabla\mathcal{L}(cW)$ and the right side $\nabla\mathcal{L}(W)$.
:::

Two consequences follow. First, the *direction* of $W$ is what matters, and the effective learning rate for that direction is $\eta/\lVert W\rVert^2$: a gradient step of length $\eta\lVert\nabla\mathcal{L}\rVert$ rotates $W$ by an angle of about $\eta\lVert\nabla\mathcal{L}(W)\rVert/\lVert W\rVert$, and $\lVert\nabla\mathcal{L}(W)\rVert$ itself scales as $1/\lVert W\rVert$. Second, because the gradient is orthogonal to $W$, plain gradient descent can only *increase* the norm, $\lVert W - \eta\mathbf{g}\rVert^2 = \lVert W\rVert^2 + \eta^2\lVert\mathbf{g}\rVert^2$, so the effective learning rate decays automatically during training. Weight decay counteracts the growth, and the balance between the two sets an equilibrium effective learning rate — which is why weight decay has an effect on normalised networks although it cannot change the function they compute (van Laarhoven, 2017; [[neural-networks/regularisation-deep]]).

Why batch normalisation helps optimisation is still debated. Ioffe and Szegedy motivated it by reducing **internal covariate shift**, the change in each layer's input distribution as earlier layers learn. Santurkar, Tsipras, Ilyas and Madry (2018) found that adding noise that *increases* that shift barely hurts, and argued instead that normalisation makes the loss and its gradients smoother, allowing larger learning rates. Its practical benefits — faster training, robustness to initialisation, tolerance of higher learning rates, and a mild regularising effect from the batch noise — are well established empirically. Its drawbacks are equally clear: it couples the examples in a batch, behaves poorly with small batches, differs between training and inference, and is awkward for sequence models with variable lengths and autoregressive generation. Layer normalisation avoids all four, which is why Transformers use it (or RMSNorm, which drops the mean subtraction at a small saving with similar results).

::: quiz
A network uses layer normalisation directly after a linear layer $W$. During training, the norm of $W$ doubles. What happens to the network's output and to the gradient with respect to $W$?
- [ ] Both double
- [x] The output is unchanged and the gradient halves
- [ ] The output doubles and the gradient is unchanged
- [ ] Both are unchanged
::: solution
By [[#prop-scale-invariance]], $\mathcal{L}(2W) = \mathcal{L}(W)$ and $\nabla\mathcal{L}(2W) = \frac12\nabla\mathcal{L}(W)$. The same learning rate therefore turns $W$ through a quarter of the angle it did before: growing weight norms act as a decaying learning rate.
:::
:::

## Residual connections {#sec-residual}

By 2015, with good initialisation and batch normalisation, networks of twenty or thirty layers trained well. Deeper ones did not: He, Zhang, Ren and Sun (2016) reported that a plain $56$-layer convolutional network had *higher training error* on CIFAR-10 than a $20$-layer one. This **degradation** is not overfitting — the training error itself is worse — and cannot be a limit of expressiveness, since the deeper network could copy the shallower one and set its extra layers to the identity. The optimiser simply fails to find such solutions. Their remedy makes the identity the default.

::: definition Residual block {#def-residual}
A **residual block** computes $\mathbf{x}_{\ell+1} = \mathbf{x}_\ell + F_\ell(\mathbf{x}_\ell)$, where $F_\ell$, the **residual branch**, is a small network — in the original ResNet two $3\times3$ convolutions with batch normalisation and ReLU — and the identity path is the **skip** (or shortcut) connection. When the branch changes the shape, the skip applies a linear projection instead of the identity.
:::

The branch only has to learn the *difference* from the identity, and a block whose branch outputs zero passes its input through unchanged. The gradient benefits even more directly: by [[transformers/transformer-block#prop-identity]], the Jacobian of $L$ residual blocks is $\prod_\ell(I + J_\ell) = I + \sum_\ell J_\ell + \dots$, so the gradient at any layer contains the gradient at the top unchanged, however deep the network. The product of [[#eq-jacobian-product]], which vanished or exploded geometrically, becomes a sum plus higher-order terms. With residual connections and batch normalisation He et al. trained networks of $152$ layers on ImageNet and over $1{,}000$ layers on CIFAR-10.

Residual connections create a new scaling question. Each block *adds* to the stream, so the stream grows.

::: proposition Variance in the residual stream {#prop-residual-variance}
Let $\mathbf{x}_{\ell+1} = \mathbf{x}_\ell + s\,F_\ell(\mathbf{x}_\ell)$, where each branch output has mean zero and is uncorrelated with its input, with $\frac1d\E\lVert F_\ell(\mathbf{x}_\ell)\rVert^2 = v_\ell$. Then $q_{\ell+1} = q_\ell + s^2v_\ell$, where $q_\ell = \frac1d\E\lVert\mathbf{x}_\ell\rVert^2$. In particular:

1. if the branch reads a *normalised* input (pre-norm), $v_\ell = v$ is constant and $q_L = q_0 + Ls^2v$ grows linearly with depth;
2. if the branch output scales with its input, $v_\ell = \alpha q_\ell$, then $q_L = (1 + s^2\alpha)^Lq_0$, which is exponential unless $s^2\alpha = O(1/L)$.
:::

::: proof
Expanding, $\E\lVert\mathbf{x}_\ell + sF_\ell\rVert^2 = \E\lVert\mathbf{x}_\ell\rVert^2 + 2s\,\E\langle\mathbf{x}_\ell, F_\ell\rangle + s^2\E\lVert F_\ell\rVert^2$, and the middle term vanishes because $F_\ell$ has mean zero and is uncorrelated with $\mathbf{x}_\ell$. Dividing by $d$ gives the recursion; summing it for constant $v$ gives (1), and solving $q_{\ell+1} = (1 + s^2\alpha)q_\ell$ gives (2).
:::

The last two rows of the experiment in [[#sec-experiment]] are case 2 with $\alpha = 1$ (a He-initialised branch preserves its input's scale): with $s = 1$ the signal doubles in variance at every block, $2^{30}$ in all, and with $s = 1/\sqrt{30}$ it grows by $(1 + 1/30)^{30}\approx e$ in variance, a factor $(1 + 1/30)^{15} = 1.64$ in size, as measured. Several practical recipes implement the scaling $s\propto1/\sqrt L$ or start each branch at zero: Goyal et al. (2017) initialise the last batch-normalisation gain of each residual branch to $0$; Fixup (Zhang, Dauphin and Ma, 2019) rescales branch weights and trains deep residual networks without normalisation; and GPT-2 (Radford et al., 2019) scales the initial weights of the output projection of every residual branch by $1/\sqrt N$, with $N$ the number of residual layers. Pre-norm Transformers are case 1: the stream grows only linearly, and the final normalisation before the output layer removes its scale.

::: example Residual scaling in GPT-2 {#ex-gpt2-scaling}
GPT-2 small has $12$ blocks, each with two residual branches (attention and feed-forward), and initialises weights from $\Normal(0, 0.02^2)$, with the branch output projections additionally scaled by $1/\sqrt N$. What standard deviation do those projections get, and how much does the residual stream's variance grow over the network at initialisation if every branch output has the variance $v$ it would have without the scaling?
::: solution
$N = 2\cdot12 = 24$ residual layers, so the output projections get standard deviation $0.02/\sqrt{24} = 0.00408$. Their outputs' variance is scaled by $1/24$, so by [[#prop-residual-variance]] (case 1) the stream's variance grows by $24\cdot v/24 = v$ in total over all the branches instead of $24v$: the stream at the top has the same order of magnitude as at the bottom, whatever the depth. Many open implementations use $\text{std} = 0.02/\sqrt{2L}$ for exactly this reason.
:::
:::

::: history
The difficulty of training deep and recurrent networks was analysed by Sepp Hochreiter in his 1991 diploma thesis and by Yoshua Bengio, Patrice Simard and Paolo Frasconi (1994); the LSTM (Hochreiter and Schmidhuber, 1997) addressed it for recurrent networks with an additive memory cell — a residual connection through time. In 2006 Hinton, Osindero and Teh revived deep networks by greedy layer-wise pretraining, which provided a good initialisation. Xavier Glorot and Yoshua Bengio's "Understanding the difficulty of training deep feedforward neural networks" (2010) derived scale-preserving initialisations and showed plain deep networks could be trained without pretraining; Kaiming He and colleagues adapted the analysis to ReLU (2015). Sergey Ioffe and Christian Szegedy introduced batch normalisation in 2015, Jimmy Ba, Jamie Kiros and Geoffrey Hinton layer normalisation in 2016, and Biao Zhang and Rico Sennrich RMSNorm in 2019. Residual networks (He, Zhang, Ren and Sun; arXiv December 2015, CVPR 2016) won the 2015 ImageNet competition with $152$ layers; Rupesh Srivastava, Klaus Greff and Jürgen Schmidhuber's highway networks (2015) had used gated skip connections shortly before. Residual connections and normalisation became the two structural elements of the Transformer (2017).
:::

::: summary
- The gradient at a deep layer is a product of many Jacobians, and the forward signal a product of many layers; both **vanish or explode** geometrically unless each layer preserves scale on average.
- Weights must be random to break the **symmetry** between units. For ReLU, $\E[\operatorname{ReLU}(a)^2] = \frac12\E a^2$, so variance $2/n_{\text{in}}$ (**He**) preserves the signal; for roughly linear activations, $1/n_{\text{in}}$ preserves it forwards and **Xavier**'s $2/(n_{\text{in}} + n_{\text{out}})$ balances forwards and backwards.
- **Batch normalisation** standardises each feature over the batch (with running statistics at inference); **layer** and **RMS normalisation** standardise each example over its features and are independent of the batch, which suits Transformers.
- Normalised layers are **scale-invariant** in their weights: gradients are orthogonal to the weights and shrink as the weights grow, so weight norm acts as an inverse learning rate.
- **Residual connections** $\mathbf{x} + F(\mathbf{x})$ give the gradient an identity path and made networks of $100$+ layers trainable. The stream's variance grows with each branch, so branches are scaled (by about $1/\sqrt L$) or initialised to zero, and pre-norm keeps the growth linear.
:::

## Exercises

::: exercise He initialisation for a wide layer {level=1 check="sqrt(2/4096)"}
What standard deviation does He initialisation give a layer with $4{,}096$ inputs?
::: solution
$\sqrt{2/4096} = 0.0221$.
:::
:::

::: exercise Xavier uniform {level=1 check="sqrt(6/(256+128))"}
Give the bound $r$ of the Xavier uniform distribution for a layer with $n_{\text{in}} = 256$ and $n_{\text{out}} = 128$.
::: solution
$r = \sqrt{3\sigma^2} = \sqrt{3\cdot2/(256 + 128)} = \sqrt{6/384} = 0.125$.
:::
:::

::: exercise A shrinking signal {level=1 check="2^(-20)"}
A ReLU network with $20$ layers of equal width is initialised with variance $1/n$. By [[#prop-propagation]], by what factor is the mean squared pre-activation of the last layer smaller than that of the first? (Use $20$ factors.)
::: solution
The per-layer gain is $n\cdot\frac1n\cdot\frac12 = \frac12$, so the factor is $2^{-20}\approx9.5\times10^{-7}$, about a millionth — a factor of $1{,}000$ in standard deviation.
:::
:::

::: exercise The ReLU second moment {level=2}
Let $a\sim\Normal(0, q)$. Compute $\E[\operatorname{ReLU}(a)]$, $\E[\operatorname{ReLU}(a)^2]$ and $\Var(\operatorname{ReLU}(a))$. Why does [[#prop-propagation]] track the second moment rather than the variance of the activations?
::: solution
By symmetry $\E[\operatorname{ReLU}(a)^2] = \frac12\E a^2 = q/2$. The mean is $\E[a\,[a > 0]] = \sqrt q\int_0^\infty z\varphi(z)\,dz = \sqrt q\,\varphi(0) = \sqrt{q/(2\pi)}$, where $\varphi$ is the standard normal density. So $\Var = q/2 - q/(2\pi) = q(\pi - 1)/(2\pi)\approx0.341q$. The next layer's pre-activation variance is $n\sigma^2\E[h^2]$ — the second moment, mean included, because a zero-mean weight times a non-zero-mean input still contributes the input's full second moment ([[math-for-ml/probability#prop-init]]). Tracking the variance alone would underestimate the next layer by the factor $0.341/0.5$.
:::
:::

::: exercise Batch normalisation at inference {level=2 check="(5-3)/sqrt(3.5)"}
After training, a feature's running mean is $3$ and its running variance $3.5$, with $\gamma = 1$ and $\beta = 0$. A single test example has value $5$. What does batch normalisation output? What would go wrong if the test example were normalised with its own batch statistics?
::: solution
$(5 - 3)/\sqrt{3.5} = 1.069$. With a batch of one, the batch mean would be $5$ and the variance $0$, so the output would be $0$ (or undefined without $\epsilon$) whatever the input: the prediction would carry no information. Using running statistics makes inference deterministic and independent of the other examples.
:::
:::

::: exercise Symmetric units {level=2}
A network with one hidden layer of $100$ units is initialised with all incoming weights equal to $0.01$ and all outgoing weights equal to $0.01$. How many distinct hidden units does it effectively have after training with SGD? Would adding dropout during training change the answer?
::: solution
By [[#prop-symmetry]] all $100$ units remain identical, so the network behaves as one hidden unit (with its outgoing weight multiplied by $100$). Dropout zeroes a random subset of units on each step, so different units receive different gradients and the symmetry is broken; the units would gradually differentiate, but slowly and wastefully. Random initialisation is the right fix.
:::
:::

::: exercise Weight norms under normalisation {level=2 check="sqrt(1+0.01)"}
A weight vector $\mathbf{w}$ with $\lVert\mathbf{w}\rVert = 1$ feeds a layer normalisation, and a gradient step with $\eta\lVert\nabla\mathcal{L}\rVert = 0.1$ is taken. Using [[#prop-scale-invariance]], what is $\lVert\mathbf{w}\rVert$ after the step? Explain why the norm keeps growing under repeated steps without weight decay.
::: solution
The gradient is orthogonal to $\mathbf{w}$, so by Pythagoras $\lVert\mathbf{w} - \eta\nabla\mathcal{L}\rVert^2 = 1 + 0.01$ and the new norm is $\sqrt{1.01}\approx1.005$. Every step adds $\eta^2\lVert\nabla\mathcal{L}\rVert^2 > 0$ to the squared norm and nothing ever removes it, so the norm grows monotonically, and with it the effective learning rate $\eta/\lVert\mathbf{w}\rVert^2$ falls. Weight decay multiplies the norm by $1 - \eta\lambda$ each step, and the two effects balance at an equilibrium norm.
:::
:::

::: exercise Growth of an unscaled residual stream {level=3 check="2^24"}
A plain residual network has $24$ blocks $\mathbf{x}\leftarrow\mathbf{x} + F(\mathbf{x})$ whose branches preserve the second moment of their input ($\alpha = 1$ in [[#prop-residual-variance]]). By what factor does the mean squared activation grow from input to output? What branch scale $s$ limits the growth to a factor of at most $e$?
::: solution
$(1 + 1)^{24} = 2^{24}\approx1.7\times10^7$. With scale $s$, the factor is $(1 + s^2)^{24}\le e^{24s^2}$, which is at most $e$ if $s^2\le1/24$, that is $s\le1/\sqrt{24}\approx0.204$; the exact condition $(1 + s^2)^{24} = e$ gives $s^2 = e^{1/24} - 1 = 0.0425$, $s = 0.206$. This is the $1/\sqrt L$ rule.
:::
:::

::: exercise Gradients through a residual chain {level=3}
Consider the scalar chain $x_{\ell+1} = x_\ell + s\,w_\ell\tanh(x_\ell)$ for $\ell = 0, \dots, L - 1$ with $\lvert w_\ell\rvert\le1$. Show that $\partial x_L/\partial x_0$ lies between $(1 - s)^L$ and $(1 + s)^L$, and compare with the plain chain $x_{\ell+1} = w_\ell\tanh(x_\ell)$. What does this say about the choice $s = 1/L$?
::: solution
$\partial x_{\ell+1}/\partial x_\ell = 1 + sw_\ell\tanh'(x_\ell)$, and $0 < \tanh'\le1$, so each factor lies in $[1 - s, 1 + s]$, and the product of $L$ factors lies between $(1 - s)^L$ and $(1 + s)^L$. For the plain chain each factor is $w_\ell\tanh'(x_\ell)$, of absolute value at most $1$ and typically much less, so the product can vanish geometrically. With $s = 1/L$, $(1 \pm 1/L)^L\to e^{\pm1}$: the gradient through the whole network stays between about $0.37$ and $2.72$ times the top gradient for every depth — the residual network's gradient neither vanishes nor explodes.
:::
:::

::: exercise LayerNorm's backward pass is a projection {level=3}
Let $\mathbf{y} = (\mathbf{a} - \mu\mathbf{1})/s$ be layer normalisation without gain, shift or $\epsilon$, for $\mathbf{a}\in\R^d$ not constant. Show that the gradient $\bar{\mathbf{a}} = J^\top\bar{\mathbf{y}}$ is orthogonal to both $\mathbf{1}$ and $\mathbf{y}$, and find it explicitly. Interpret the result.
::: solution
$\mathbf{y}$ is unchanged if $\mathbf{a}$ is shifted ($\mathbf{a} + c\mathbf{1}$) or scaled ($c\mathbf{a}$, $c > 0$). Differentiating these invariances: $J\mathbf{1} = \mathbf{0}$ and $J\mathbf{a} = \mathbf{0}$, hence $J(\mathbf{a} - \mu\mathbf{1}) = J(s\mathbf{y}) = \mathbf{0}$. So $\mathbf{1}^\top\bar{\mathbf{a}} = \mathbf{1}^\top J^\top\bar{\mathbf{y}} = (J\mathbf{1})^\top\bar{\mathbf{y}} = 0$ and likewise $\mathbf{y}^\top\bar{\mathbf{a}} = 0$. Explicitly, differentiating $\mu$ and $s$ gives
$$
\bar{\mathbf{a}} = \frac1s\Big(\bar{\mathbf{y}} - \frac1d(\mathbf{1}^\top\bar{\mathbf{y}})\mathbf{1} - \frac1d(\mathbf{y}^\top\bar{\mathbf{y}})\mathbf{y}\Big),
$$
which is $\frac1s$ times the projection of $\bar{\mathbf{y}}$ onto the orthogonal complement of $\mathbf{1}$ and $\mathbf{y}$ (these two are orthogonal, and $\lVert\mathbf{y}\rVert^2 = d$). The normalisation discards any gradient component that would only change the mean or the scale of its input — the directions along which its output cannot change — and divides the rest by the input's scale, the per-example version of [[#prop-scale-invariance]].
:::
:::
