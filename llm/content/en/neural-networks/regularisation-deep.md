A modern network often has more parameters than it has training examples, and can fit its training set perfectly — even when the labels are replaced by random noise. Classical theory says such a model should overfit badly. Deep networks frequently do not, and understanding why is one of the central open questions of the field. Part of the answer is explicit **regularisation**, the techniques this chapter covers: dropout, weight decay, label smoothing, data augmentation and early stopping. Part of it is **implicit** regularisation: the optimiser, the architecture and the training procedure prefer some solutions over others, even when nothing in the loss asks them to.

The basic tools were introduced for linear models in [[ml-fundamentals/regularisation]] — penalised risk, the $\ell_2$ penalty as weight decay ([[ml-fundamentals/regularisation#prop-decay]]), early stopping as spectral filtering, data augmentation and input noise as ridge regression — and the classical and modern pictures of generalisation in [[ml-fundamentals/generalisation]]. This chapter asks what changes in deep networks: the methods that only make sense for them (dropout), the ways familiar methods behave differently (weight decay with normalisation layers), the methods designed for their output layers (label smoothing), and what is known, and not known, about implicit regularisation.

## Networks can memorise {#sec-memorise}

Zhang, Bengio, Hardt, Recht and Vinyals (2017) trained standard image classifiers on CIFAR-10 with the labels replaced by uniformly random ones. The networks reached zero training error — they memorised $50{,}000$ arbitrary labels — taking only a small factor longer than on the true labels. On true labels the same networks generalised well. So the architecture can represent wildly overfitting functions, and capacity measures that depend only on the function class (like the VC bounds of [[ml-fundamentals/generalisation#sec-bounds]]) cannot explain why it usually finds well-generalising ones. Explicit regularisers helped somewhat in their experiments but were neither necessary nor sufficient for good test accuracy. Whatever makes deep networks generalise is largely a property of *how they are trained on real data*, not merely of the model class.

Two further empirical findings frame the rest of the chapter. First, test error as a function of model size can show **double descent**: it falls, rises near the size at which the model can just interpolate the training data, and falls again beyond it (Belkin, Hsu, Ma and Mandal, 2019; Nakkiran et al., 2020, who also observed it as a function of training time). Second, for language models trained for roughly one pass over enormous corpora, overfitting in the classical sense is rarely the binding constraint; regularisation there is mostly about optimisation stability and about making the most of data when it starts to run out ([[#sec-llms]]).

## Dropout {#sec-dropout}

**Dropout** (Hinton et al., 2012; Srivastava et al., 2014) randomly switches off units during training, so that no unit can rely on the presence of particular others.

::: definition Dropout {#def-dropout}
During training, a dropout layer with rate $p\in[0, 1)$ maps $\mathbf{h}\in\R^d$ to

$$
\tilde{\mathbf{h}} = \frac{\mathbf{m}\odot\mathbf{h}}{1 - p},\qquad m_j\overset{\text{iid}}{\sim}\operatorname{Bernoulli}(1 - p),
$$

with a fresh mask $\mathbf{m}$ for every example and every step; at test time it is the identity. (This is "inverted" dropout, which rescales during training; the original formulation instead multiplied the weights by $1 - p$ at test time, which is equivalent.)
:::

::: proposition Dropout preserves the mean {#prop-dropout-mean}
For a fixed $\mathbf{h}$, $\E_{\mathbf{m}}[\tilde{\mathbf{h}}] = \mathbf{h}$ and $\Var(\tilde h_j) = \frac{p}{1 - p}h_j^2$. Consequently, for any linear function $\mathbf{w}^\top\tilde{\mathbf{h}}$, the average over masks of the training-time output equals the test-time output $\mathbf{w}^\top\mathbf{h}$.
:::

::: proof
$\E m_j = 1 - p$, so $\E\tilde h_j = (1 - p)h_j/(1 - p) = h_j$. $\Var m_j = p(1 - p)$, so $\Var\tilde h_j = p(1 - p)h_j^2/(1 - p)^2 = \frac{p}{1 - p}h_j^2$. Linearity of expectation gives the last statement.
:::

Through a nonlinearity the test-time network is only an approximation to the average over the $2^d$ "thinned" networks that dropout samples from; Srivastava et al. found the approximation good in practice. The intended effect is to prevent **co-adaptation**: a unit cannot depend on a specific partner being present, so it has to be useful in many contexts. Another view is that dropout trains an exponentially large ensemble of networks with shared weights. For a linear model the effect can be computed exactly, and it is a familiar penalty.

::: proposition Dropout on a linear model is a data-dependent ridge penalty {#prop-dropout-ridge}
Apply dropout with rate $p$ to the inputs of a linear regression, $\hat y = \mathbf{w}^\top\tilde{\mathbf{x}}$. The expected squared loss over the masks, summed over the data, is

$$
\E_{\mathbf{m}}\sum_{i=1}^n\big(y_i - \mathbf{w}^\top\tilde{\mathbf{x}}_i\big)^2 = \lVert\mathbf{y} - X\mathbf{w}\rVert^2 + \frac{p}{1 - p}\sum_{j=1}^dw_j^2\,(X^\top X)_{jj},
$$ {#eq-dropout-ridge}

a ridge penalty in which each weight is penalised in proportion to the squared size of its feature. Its minimiser solves $\big(X^\top X + \frac{p}{1 - p}\operatorname{diag}(X^\top X)\big)\mathbf{w} = X^\top\mathbf{y}$.
:::

::: proof
For one example, $\E[(y - \hat y)^2] = (y - \E\hat y)^2 + \Var\hat y$. By [[#prop-dropout-mean]] $\E\hat y = \mathbf{w}^\top\mathbf{x}$, and since the $m_j$ are independent, $\Var\hat y = \sum_jw_j^2\Var(\tilde x_j) = \frac p{1 - p}\sum_jw_j^2x_j^2$. Summing over the examples, $\sum_ix_{ij}^2 = (X^\top X)_{jj}$. The objective is a convex quadratic; setting its gradient $-2X^\top(\mathbf{y} - X\mathbf{w}) + \frac{2p}{1 - p}\operatorname{diag}(X^\top X)\mathbf{w}$ to zero gives the normal equations.
:::

::: example Dropout with a single feature {#ex-dropout-one}
A regression has one feature and no intercept, with least-squares solution $w_{\text{LS}} = \sum_ix_iy_i/\sum_ix_i^2$. Find the minimiser of the expected dropout loss for rate $p$, and evaluate it for $w_{\text{LS}} = 2$ and $p = 0.2$.
::: solution
With $d = 1$, [[#prop-dropout-ridge]] gives $\big(\sum_ix_i^2 + \frac{p}{1 - p}\sum_ix_i^2\big)w = \sum_ix_iy_i$, so $w = w_{\text{LS}}\big/\big(1 + \frac{p}{1 - p}\big) = (1 - p)\,w_{\text{LS}}$. For $w_{\text{LS}} = 2$ and $p = 0.2$, $w = 1.6$. The shrinkage factor $1 - p$ does not depend on the data at all — the scale-invariance of the dropout penalty in its simplest form. With several correlated features the shrinkage is no longer a single factor, as the listing shows.
:::
:::

This result (Srivastava et al., 2014, §9; Wager, Wang and Liang, 2013) makes the effect concrete: dropout shrinks the weights, as ridge regression does, but it penalises each weight relative to its feature's scale, so the result does not change when a feature is rescaled — unlike plain ridge, which penalises the weights of small-scale features most. The listing checks the prediction by running SGD with dropout masks.

```python
import math, random

rng = random.Random(0)
n, d, p = 200, 3, 0.5                          # examples, features, dropout probability

# data with features of different scales: x = (z1, 2 z2, z1 + 0.5 z3)
X, y = [], []
for _ in range(n):
    z = [rng.gauss(0, 1) for _ in range(3)]
    x = [z[0], 2 * z[1], z[0] + 0.5 * z[2]]
    X.append(x); y.append(1.0 * x[0] - 0.5 * x[1] + 1.0 * x[2] + rng.gauss(0, 0.5))

def solve(A, b):                               # Gaussian elimination for a small system
    M = [row[:] + [bi] for row, bi in zip(A, b)]
    k = len(b)
    for i in range(k):
        piv = max(range(i, k), key=lambda r: abs(M[r][i])); M[i], M[piv] = M[piv], M[i]
        for r in range(k):
            if r != i:
                f = M[r][i] / M[i][i]
                M[r] = [a - f * c for a, c in zip(M[r], M[i])]
    return [M[i][k] / M[i][i] for i in range(k)]

XtX = [[sum(x[i] * x[j] for x in X) for j in range(d)] for i in range(d)]
Xty = [sum(x[i] * t for x, t in zip(X, y)) for i in range(d)]
w_ols = solve(XtX, Xty)
lam = p / (1 - p)                              # dropout's penalty: lam * sum_j w_j^2 (X^T X)_jj
A = [[XtX[i][j] + (lam * XtX[i][i] if i == j else 0.0) for j in range(d)] for i in range(d)]
w_pred = solve(A, Xty)

# SGD with inverted dropout on the inputs: x_j -> x_j * m_j / (1 - p), m_j ~ Bernoulli(1 - p)
w = [0.0] * d
T = 400000
for t in range(T):
    x, target = X[t % n], y[t % n]
    xd = [xj * (rng.random() >= p) / (1 - p) for xj in x]
    r = sum(wj * xj for wj, xj in zip(w, xd)) - target
    lr = 0.01 * (1 - t / T)                    # linear decay to zero removes the noise floor
    w = [wj - lr * r * xj for wj, xj in zip(w, xd)]

fmt = lambda v: "(" + ", ".join(f"{a:6.3f}" for a in v) + ")"
print("least squares            ", fmt(w_ols))
print("predicted dropout optimum", fmt(w_pred))
print("SGD with dropout         ", fmt(w))

# label smoothing: the minimiser of the smoothed cross-entropy has finite logits
K, eps = 10, 0.1
q = [1 - eps + eps / K] + [eps / K] * (K - 1)  # smoothed target for class 0
z = [0.0] * K
for step in range(20000):                      # gradient descent on the logits: grad = p - q
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
    z = [zi - 0.5 * (ei / s - qi) for zi, ei, qi in zip(z, e, q)]
print(f"label smoothing: logit gap {z[0] - z[1]:.4f}, predicted log(q0/q1) = {math.log(q[0] / q[1]):.4f}")
```

```text
least squares             ( 1.018, -0.496,  0.965)
predicted dropout optimum ( 0.705, -0.268,  0.626)
SGD with dropout          ( 0.709, -0.267,  0.614)
label smoothing: logit gap 4.5109, predicted log(q0/q1) = 4.5109
```

SGD with dropout lands within about $0.01$ of the optimum predicted by [[#eq-dropout-ridge]], well away from the least-squares solution: with $p = 0.5$ the penalty coefficient is $1$, and the weights shrink by roughly a third. (The last line of the output belongs to [[#sec-label-smoothing]].)

::: example How much noise does dropout inject? {#ex-dropout-noise}
A layer of $512$ units with activations all equal to $1$ feeds a unit with weights all equal to $0.01$. With dropout $p = 0.1$, find the mean and standard deviation of that unit's input during training, and the number of units kept.
::: solution
The number kept is Binomial$(512, 0.9)$: mean $460.8$, standard deviation $\sqrt{512\cdot0.9\cdot0.1} = 6.79$. The unit's input is $0.01\cdot(\text{kept})/0.9$, with mean $0.01\cdot512 = 5.12$ — the test-time value, by [[#prop-dropout-mean]] — and standard deviation $0.01\cdot6.79/0.9 = 0.0754$, about $1.5\%$ of the mean. With $p = 0.5$ the standard deviation would be $0.01\cdot\sqrt{128}/0.5 = 0.226$, $4.4\%$ of the mean. The noise is modest per unit but differs on every step and every example.
:::
:::

::: widget distribution
dist: binomial
params: n=512, p=0.9
a: 450
b: 472
caption: The number of units kept by dropout with rate $p = 0.1$ in a layer of $512$: Binomial$(512, 0.9)$, mean $460.8$, standard deviation $6.8$. The shaded range is roughly mean $\pm1.6$ standard deviations. Change the keep probability to see how the noise grows as the dropout rate approaches $0.5$.
:::

In practice dropout rates of $0.1$ to $0.5$ were common in fully connected layers; AlexNet used $0.5$ in its two large fully connected layers. Convolutional layers, whose units are spatially correlated, benefit less from unit dropout and use structured variants such as dropping whole channels or regions. The original Transformer applied dropout $0.1$ to every sub-layer's output before the residual addition, to the attention weights and to the embeddings. Dropout can also be kept *on* at test time and the predictions averaged over masks, which gives a rough estimate of uncertainty ("Monte Carlo dropout", Gal and Ghahramani, 2016). **Stochastic depth** (Huang et al., 2016) drops entire residual branches at random during training — possible only because of the identity path — and is a standard ingredient of deep vision models.

::: warning Train and evaluation modes
Dropout and batch normalisation behave differently in training and at test time, and frameworks switch between the two with a global flag (`model.train()` and `model.eval()` in PyTorch). Evaluating a model left in training mode gives noisy, systematically worse predictions; training a model left in evaluation mode silently disables dropout and freezes batch statistics. Both mistakes produce plausible-looking numbers. A related trap: when gradients are checked numerically ([[neural-networks/backpropagation#sec-gradcheck]]) the dropout masks must be held fixed between evaluations, or the check is meaningless.
:::

## Weight decay in deep networks {#sec-weight-decay}

Weight decay multiplies every weight by $1 - \eta\lambda$ at every step; for SGD it is the gradient of the penalty $\frac\lambda2\lVert\theta\rVert^2$, and for Adam it should be applied in decoupled form ([[neural-networks/optimisers#prop-decoupled]]). In a network without normalisation it acts as in a linear model, shrinking weights towards zero. In a network *with* normalisation it acts quite differently, because most weights feed a normalisation layer and the loss does not depend on their scale at all ([[neural-networks/initialisation-normalisation#prop-scale-invariance]]). Shrinking such a weight cannot change the function the network computes. What it changes is the **effective learning rate**.

::: proposition Equilibrium of weight decay and a scale-invariant loss {#prop-equilibrium}
Let the loss be scale-invariant in a weight vector $\mathbf{w}$, so that $\nabla\mathcal{L}(\mathbf{w})\perp\mathbf{w}$ and $\lVert\nabla\mathcal{L}(\mathbf{w})\rVert = G/\lVert\mathbf{w}\rVert$, where $G$ is the gradient norm at the same direction with unit norm. Suppose SGD with weight decay, $\mathbf{w}\leftarrow(1 - \eta\lambda)\mathbf{w} - \eta\nabla\mathcal{L}(\mathbf{w})$, is run with $G$ approximately constant. Then the norm converges to the equilibrium

$$
\lVert\mathbf{w}\rVert^4 = \frac{\eta G^2}{\lambda(2 - \eta\lambda)}\approx\frac{\eta G^2}{2\lambda},
$$

at which each step rotates $\mathbf{w}$ by a relative amount $\eta\lVert\nabla\mathcal{L}\rVert/\lVert\mathbf{w}\rVert\approx\sqrt{2\eta\lambda}$, independent of $G$.
:::

::: proof
Because the gradient is orthogonal to $\mathbf{w}$, $\lVert\mathbf{w}'\rVert^2 = (1 - \eta\lambda)^2\lVert\mathbf{w}\rVert^2 + \eta^2G^2/\lVert\mathbf{w}\rVert^2$. Write $u = \lVert\mathbf{w}\rVert^2$; the map $u\mapsto(1 - \eta\lambda)^2u + \eta^2G^2/u$ has the fixed point $u^2\big(1 - (1 - \eta\lambda)^2\big) = \eta^2G^2$, that is $u^2 = \eta^2G^2/(\eta\lambda(2 - \eta\lambda)) = \eta G^2/(\lambda(2 - \eta\lambda))$; the map's derivative there is $(1 - \eta\lambda)^2 - \eta^2G^2/u^2 = 2(1 - \eta\lambda)^2 - 1$, of absolute value below $1$ for small $\eta\lambda > 0$, so the fixed point is attracting. At equilibrium the relative step is $\eta(G/\lVert\mathbf{w}\rVert)/\lVert\mathbf{w}\rVert = \eta G/u\approx\eta G\sqrt{2\lambda/(\eta G^2)} = \sqrt{2\eta\lambda}$.
:::

A simulation with $\eta = 0.1$, $\lambda = 0.01$ and $G = 1$ settles at $\lVert\mathbf{w}\rVert = 1.4955$, the value of the formula. The conclusion is surprising at first: in a normalised network weight decay does not regularise the function directly, but it keeps the weights from growing and so keeps the effective learning rate from decaying ([[neural-networks/initialisation-normalisation#sec-normalisation]]), with the rotation per step set by $\sqrt{\eta\lambda}$ (van Laarhoven, 2017; Wan et al., 2021 analysed the dynamics in detail). Learning rate and weight decay are therefore coupled hyperparameters. Weight decay is usually not applied to biases and normalisation gains, whose scale does matter.

## Label smoothing {#sec-label-smoothing}

The cross-entropy loss is minimised by predicting probability $1$ for the observed class, which requires the correct logit to exceed the others by an infinite margin. On separable data the logits therefore grow without bound ([[ml-fundamentals/logistic-regression#prop-separable]]), and the network becomes overconfident. **Label smoothing** (Szegedy et al., 2016) removes the incentive.

::: definition Label smoothing {#def-label-smoothing}
With $K$ classes and smoothing $\varepsilon\in(0, 1)$, replace the one-hot target $\mathbf{e}_y$ by

$$
\mathbf{q} = (1 - \varepsilon)\mathbf{e}_y + \frac\varepsilon K\mathbf{1},
$$

and minimise the cross-entropy $-\sum_kq_k\log p_k$ between $\mathbf{q}$ and the prediction $\mathbf{p} = \operatorname{softmax}(\mathbf{z})$.
:::

::: proposition Label smoothing bounds the logit gaps {#prop-ls-optimum}
For a single example the smoothed loss is minimised exactly when $\mathbf{p} = \mathbf{q}$. At the minimum every wrong class's logit is below the correct one by

$$
z_y - z_k = \log\frac{1 - \varepsilon + \varepsilon/K}{\varepsilon/K},
$$

a finite number. Equivalently, the smoothed loss is $(1 - \varepsilon)\,\mathrm{CE}(\mathbf{e}_y, \mathbf{p}) + \varepsilon\,\mathrm{CE}(\mathbf{u}, \mathbf{p})$, where $\mathbf{u}$ is the uniform distribution: ordinary cross-entropy plus a penalty for predictions far from uniform.
:::

::: proof
The cross-entropy $-\sum_kq_k\log p_k$ equals $H(\mathbf{q}) + \mathrm{KL}(\mathbf{q}\,\Vert\,\mathbf{p})$, which is minimised over distributions $\mathbf{p}$ exactly at $\mathbf{p} = \mathbf{q}$, since the KL divergence is non-negative and zero only for equal distributions ([[math-for-ml/information-theory]]). Its gradient with respect to the logits, $\mathbf{p} - \mathbf{q}$, vanishes there. The softmax gives $p_y/p_k = e^{z_y - z_k}$, so $\mathbf{p} = \mathbf{q}$ means $z_y - z_k = \log(q_y/q_k)$, the formula. The decomposition follows from linearity of the cross-entropy in its first argument: $\mathbf{q} = (1 - \varepsilon)\mathbf{e}_y + \varepsilon\mathbf{u}$.
:::

::: example Label smoothing on ten classes {#ex-label-smoothing}
For $K = 10$ and $\varepsilon = 0.1$, give the smoothed target, the optimal logit gap, and the loss of a prediction that puts probability $0.999$ on the correct class and spreads the rest evenly.
::: solution
$\mathbf{q}$ has $0.9 + 0.01 = 0.91$ on the correct class and $0.01$ on each of the other nine. The optimal gap is $\log(0.91/0.01) = \log91 = 4.511$, the value found numerically in the listing. The overconfident prediction has $p_y = 0.999$ and $p_k = 0.000111$, with loss $-0.91\log0.999 - 9\cdot0.01\log0.000111 = 0.00091 + 0.09\cdot9.106 = 0.820$, whereas the minimum, $H(\mathbf{q}) = -0.91\log0.91 - 0.09\log0.01 = 0.0858 + 0.4145 = 0.500$, is achieved by the less confident $\mathbf{p} = \mathbf{q}$. Unsmoothed cross-entropy would have preferred the confident prediction ($0.001$ against $0.094$).
:::
:::

::: widget plot
f: (1 - e/2)*ln(1 + exp(-x)) + (e/2)*ln(1 + exp(x)); ln(1 + exp(-x))
x: -2, 10
y: 0, 2
sliders: e=0.1:0:0.5:0.01
labels: smoothed cross-entropy; ordinary cross-entropy
caption: Two-class loss as a function of the logit gap $z = z_y - z_{\text{other}}$. Ordinary cross-entropy keeps decreasing as the gap grows, so training pushes the logits apart indefinitely. With smoothing $\varepsilon$ the loss has a minimum at $z = \log\big((2 - \varepsilon)/\varepsilon\big)$ — about $2.94$ for $\varepsilon = 0.1$ — and rises again beyond it.
:::

Label smoothing was introduced for image classification and used in the original Transformer ($\varepsilon = 0.1$), where Vaswani et al. noted that it hurts perplexity but improves accuracy and BLEU score. Müller, Kornblith and Hinton (2019) found that it improves calibration but makes the penultimate-layer representations of different examples of a class cluster tightly, which can hurt knowledge distillation from the smoothed model. Language-model pretraining recipes generally do not use it, since the next-token distribution is intrinsically uncertain and perplexity is the quantity being optimised.

## Data augmentation {#sec-augmentation}

The most effective regulariser is more data, and **data augmentation** manufactures it from transformations that should not change the label. [[ml-fundamentals/regularisation#prop-noise]] showed that adding input noise to linear regression is equivalent to ridge regression; for deep networks the transformations encode domain knowledge rather than mere noise.

- **Images.** Random crops and rescaling, horizontal flips, colour jitter; stronger policies combine many such operations (AutoAugment, Cubuk et al., 2019; RandAugment, 2020). **Cutout** (DeVries and Taylor, 2017) erases random patches. **Mixup** (Zhang, Cisse, Dauphin and Lopez-Paz, 2018) trains on convex combinations $\lambda\mathbf{x}_i + (1 - \lambda)\mathbf{x}_j$ with targets $\lambda\mathbf{e}_{y_i} + (1 - \lambda)\mathbf{e}_{y_j}$, $\lambda\sim\operatorname{Beta}(\alpha, \alpha)$; **CutMix** (Yun et al., 2019) pastes a patch of one image into another and mixes the labels in proportion to the area.
- **Audio.** Time and frequency masking of spectrograms (SpecAugment, Park et al., 2019), speed and noise perturbations.
- **Text.** Label-preserving transformations of text are harder to find: back-translation (translating to another language and back; Sennrich, Haddow and Birch, 2016) and token-level noise are used for some tasks, but for language-model pretraining the dominant strategy is simply more, cleaner and more diverse data ([[pretraining]]).

::: example A mixup target {#ex-mixup}
Mixup draws $\lambda = 0.7$ and mixes an image of a cat (class $1$) with an image of a dog (class $2$). What is the training target, and what loss does the model incur if it predicts $(0.9, 0.1)$ for the mixed image? What prediction minimises the loss?
::: solution
The input is $0.7\mathbf{x}_{\text{cat}} + 0.3\mathbf{x}_{\text{dog}}$ and the target $(0.7, 0.3)$. The cross-entropy of the prediction $(0.9, 0.1)$ is $-0.7\ln0.9 - 0.3\ln0.1 = 0.074 + 0.691 = 0.765$. It is minimised by predicting the target itself, $(0.7, 0.3)$, with loss equal to its entropy, $-0.7\ln0.7 - 0.3\ln0.3 = 0.611$. Like label smoothing, mixup penalises confident predictions, but it does so on inputs between the training examples rather than at them.
:::
:::

Augmentation encodes an invariance: a network trained on flipped images learns, approximately, to be invariant to flips. When the invariance can be built into the architecture exactly — translation equivariance in convolutional networks ([[neural-networks/convolutional-networks]]) — that is usually more efficient than learning it from augmented data.

::: quiz
Which of the following does **not** change the function a network computes when applied only to weights that feed directly into a layer normalisation?
- [ ] Dropout on those weights' inputs
- [x] Rescaling those weights by a positive constant, as one step of weight decay does
- [ ] Adding Gaussian noise to those weights
- [ ] Replacing them by their sign
::: solution
By the scale invariance of [[neural-networks/initialisation-normalisation#prop-scale-invariance]], multiplying the weights by a positive constant leaves the output of the normalisation unchanged, so a weight-decay step changes the function only through its effect on later gradient steps ([[#prop-equilibrium]]). The other operations change the direction of the weights, or their inputs, and therefore the function.
:::
:::

## Early stopping and implicit regularisation {#sec-implicit}

**Early stopping** — keeping the parameters from the step with the best validation loss — is the oldest and cheapest regulariser for networks, and for linear models it acts like an $\ell_2$ penalty whose strength decreases with training time ([[ml-fundamentals/regularisation#prop-early-stopping]]). For deep networks no comparably exact statement holds, but the qualitative picture is similar: early in training the network fits the broad structure of the data, later it fits idiosyncrasies and noise. On noisy labels the effect is dramatic: networks fit the clean examples first and the mislabelled ones much later (Arpit et al., 2017), so stopping early removes much of the damage.

Beyond early stopping, the training procedure itself selects among the many solutions that fit the data.

- **Implicit bias of gradient descent.** On underdetermined linear regression, gradient descent from zero converges to the minimum-norm interpolant ([[ml-fundamentals/generalisation#prop-min-norm]]), and on separable classification its direction converges to the maximum-margin separator. Analogous results are known for some simplified networks (deep linear networks, homogeneous networks); for practical architectures they are conjectures supported by experiment.
- **Stochastic noise and flatness.** Keskar et al. (2017) found that very large batches tended to generalise worse and to end in "sharper" minima, and argued that SGD's noise steers it towards flat regions. Flatness is not parametrisation-invariant (Dinh et al., 2017, showed that sharp minima can be made flat by rescaling), and with appropriate learning-rate scaling much of the large-batch gap closes, so this is an active area rather than settled knowledge.
- **Architecture.** Weight sharing, normalisation, residual structure and the choice of activation all bias which functions are easy to reach. The success of convolutional networks on images and of Transformers on text is largely a statement about these inductive biases.

## Regularisation for large language models {#sec-llms}

Language-model pretraining has an unusual regime. A model trained on more tokens than it could memorise, for about one epoch, sees almost every example once, so the classical overfitting that dropout and augmentation address barely arises: the training loss on the next batch is an unbiased estimate of the test loss. Published recipes reflect this. As of 2026, documented pretraining configurations commonly use AdamW with weight decay around $0.1$ and gradient clipping, and dropout is often left out of pretraining altogether (it does not appear in the published LLaMA recipe, for example; Touvron et al., 2023), whereas dropout remains common when fine-tuning on small datasets.

When high-quality data runs out, repetition becomes the question. Muennighoff et al. (2023) trained models on repeated data and found that up to about four epochs of repetition gave nearly the same loss as fresh data, with rapidly diminishing value beyond that — an empirical regularity for their setting, used to plan data-constrained training. Regularisation then matters again, and so does deduplication of the training corpus, which reduces memorisation of repeated passages.

::: history
Weight decay for neural networks goes back at least to Hinton's work in the 1980s and Krogh and Hertz's "A simple weight decay can improve generalization" (1992); early stopping was studied by Morgan and Bourlard (1990) among others. Data augmentation was central to LeCun et al.'s digit recognisers and to the elastic distortions of Simard, Steinkraus and Platt (2003). Geoffrey Hinton and colleagues introduced dropout in a 2012 preprint, and Nitish Srivastava, Hinton, Alex Krizhevsky, Ilya Sutskever and Ruslan Salakhutdinov published the full study in 2014; AlexNet's 2012 win used both dropout and heavy augmentation. Christian Szegedy and colleagues introduced label smoothing in the Inception-v3 paper (2016). The random-label experiments of Chiyuan Zhang and colleagues (2017), and the double-descent curves of Mikhail Belkin and colleagues (2019) and Preetum Nakkiran and colleagues (2020), reopened the theory of generalisation for overparametrised models.
:::

::: summary
- Deep networks can memorise random labels, so their generalisation is a property of training on real data, not only of the model class; test error can show **double descent** in model size.
- **Dropout** zeroes each unit with probability $p$ and rescales by $1/(1 - p)$; it preserves means, injects multiplicative noise, and for a linear model equals a ridge penalty scaled by each feature's size. It is turned off at test time.
- In normalised networks **weight decay** cannot change the function directly; it balances the growth of weight norms and fixes the effective rotation per step at about $\sqrt{2\eta\lambda}$.
- **Label smoothing** mixes the one-hot target with the uniform distribution; the optimum has finite logit gaps $\log\big((1 - \varepsilon + \varepsilon/K)/(\varepsilon/K)\big)$, preventing overconfidence.
- **Data augmentation** (crops, flips, mixup, CutMix, SpecAugment, back-translation) encodes invariances; **early stopping** and the **implicit biases** of the optimiser and architecture regularise without any explicit term.
- LLM pretraining, at about one epoch, uses weight decay and clipping but often no dropout; with limited data, a few epochs of repetition cost little.
:::

## Exercises

::: exercise Inverted dropout by hand {level=1 check="3.75"}
With dropout rate $p = 0.2$, a unit's activation $3$ is kept. What value does inverted dropout pass on? What does it pass on at test time?
::: solution
$3/(1 - 0.2) = 3.75$ during training (and $0$ if the unit is dropped); $3$ at test time. The average over masks is $0.8\cdot3.75 = 3$.
:::
:::

::: exercise A smoothed target {level=1 check="0.92"}
With $K = 5$ classes and $\varepsilon = 0.1$, what probability does the smoothed target assign to the correct class, and to each other class?
::: solution
$1 - 0.1 + 0.1/5 = 0.92$ for the correct class and $0.1/5 = 0.02$ for each of the other four; the five numbers sum to $1$.
:::
:::

::: exercise Units kept {level=1 check="460.8"}
A layer of $512$ units uses dropout with $p = 0.1$. What is the expected number of units kept on one example?
::: solution
$512\cdot0.9 = 460.8$, with standard deviation $\sqrt{512\cdot0.9\cdot0.1}\approx6.79$ ([[#ex-dropout-noise]]).
:::
:::

::: exercise A dropout penalty {level=2 check="200"}
In [[#prop-dropout-ridge]] a feature has $\sum_ix_{ij}^2 = 50$ and its weight is $w_j = 2$. What does it contribute to the penalty with $p = 0.5$? How does the contribution change if the feature is multiplied by $10$ and the weight divided by $10$ (the same predictions)?
::: solution
$\frac{p}{1 - p}w_j^2\sum_ix_{ij}^2 = 1\cdot4\cdot50 = 200$. After rescaling, $\sum_ix_{ij}^2$ becomes $5{,}000$ and $w_j^2$ becomes $0.04$, so the contribution is again $200$: the dropout penalty is invariant to rescaling features, unlike plain ridge regression, whose penalty $\lambda w_j^2$ would fall from $4\lambda$ to $0.04\lambda$.
:::
:::

::: exercise Logit gaps with a large vocabulary {level=2 check="ln(9001)"}
For a softmax over $K = 1{,}000$ classes with $\varepsilon = 0.1$, what logit gap between the correct class and any other minimises the smoothed loss?
::: solution
$q_y = 0.9 + 0.0001 = 0.9001$ and $q_k = 0.0001$, so the gap is $\log(0.9001/0.0001) = \log9001\approx9.105$. The gap grows like $\log K$: with many classes, smoothing permits larger logits but still caps them.
:::
:::

::: exercise An equilibrium weight norm {level=2 check="(0.01/(0.1*1.999))^(1/4)"}
A scale-invariant weight vector is trained with $\eta = 0.01$ and $\lambda = 0.1$, and its unit-norm gradient size is $G = 1$. Find the equilibrium norm from [[#prop-equilibrium]] and the relative rotation per step. Enter the norm.
::: solution
$\lVert\mathbf{w}\rVert^4 = 0.01/(0.1\cdot(2 - 0.001)) = 0.01/0.1999 = 0.05003$, so $\lVert\mathbf{w}\rVert = 0.05003^{1/4}\approx0.473$. The relative step is $\eta G/\lVert\mathbf{w}\rVert^2 = 0.01/0.2237 = 0.0447$, close to $\sqrt{2\eta\lambda} = \sqrt{0.002} = 0.0447$.
:::
:::

::: exercise Label smoothing as a penalty {level=2}
Show that the smoothed loss equals $(1 - \varepsilon)\mathrm{CE}(\mathbf{e}_y, \mathbf{p}) + \varepsilon\big(\log K + \mathrm{KL}(\mathbf{u}\,\Vert\,\mathbf{p})\big)$, and interpret the second term. What happens as $\varepsilon\to1$?
::: solution
$\mathrm{CE}(\mathbf{q}, \mathbf{p}) = -\sum_kq_k\log p_k$ is linear in $\mathbf{q}$, so with $\mathbf{q} = (1 - \varepsilon)\mathbf{e}_y + \varepsilon\mathbf{u}$ it splits as $(1 - \varepsilon)\mathrm{CE}(\mathbf{e}_y, \mathbf{p}) + \varepsilon\,\mathrm{CE}(\mathbf{u}, \mathbf{p})$, and $\mathrm{CE}(\mathbf{u}, \mathbf{p}) = H(\mathbf{u}) + \mathrm{KL}(\mathbf{u}\,\Vert\,\mathbf{p}) = \log K + \mathrm{KL}(\mathbf{u}\,\Vert\,\mathbf{p})$. The second term penalises predictions that put very little probability on any class — exactly what confident predictions do — with weight $\varepsilon$. As $\varepsilon\to1$ the target becomes uniform and the optimum is the uniform prediction, ignoring the label entirely.
:::
:::

::: exercise Gaussian dropout {level=3}
Instead of Bernoulli masks, multiply each input of a linear model by independent noise $\xi_j\sim\Normal(1, \alpha)$. Show that the expected squared loss is the least-squares loss plus $\alpha\sum_jw_j^2(X^\top X)_{jj}$, and find the $\alpha$ that matches Bernoulli dropout with rate $p$.
::: solution
For one example, $\hat y = \sum_jw_jx_j\xi_j$ has mean $\mathbf{w}^\top\mathbf{x}$ and variance $\sum_jw_j^2x_j^2\alpha$, so $\E(y - \hat y)^2 = (y - \mathbf{w}^\top\mathbf{x})^2 + \alpha\sum_jw_j^2x_j^2$; summing over examples gives the stated form. Matching [[#eq-dropout-ridge]] requires $\alpha = p/(1 - p)$, which is also the variance of the inverted Bernoulli mask $m_j/(1 - p)$. This "Gaussian dropout" was proposed by Srivastava et al. (2014) and has the same first two moments as Bernoulli dropout.
:::
:::

::: exercise Rotation per step at equilibrium {level=3 check="0.01"}
Show from [[#prop-equilibrium]] that the relative rotation per step at equilibrium does not depend on $G$, and evaluate it for $\eta = 0.1$ and $\lambda = 5\times10^{-4}$, typical values for SGD on ImageNet. What does this imply about tuning $\eta$ and $\lambda$ separately?
::: solution
At equilibrium $u = \lVert\mathbf{w}\rVert^2 = G\sqrt{\eta/(\lambda(2 - \eta\lambda))}$, so the relative step $\eta G/u = \sqrt{\eta\lambda(2 - \eta\lambda)}\approx\sqrt{2\eta\lambda}$: $G$ cancels. For $\eta = 0.1$ and $\lambda = 5\times10^{-4}$, $\sqrt{2\cdot5\times10^{-5}} = \sqrt{10^{-4}} = 0.01$: a $1\%$ rotation per step. For the scale-invariant weights only the product $\eta\lambda$ matters in equilibrium; doubling $\eta$ and halving $\lambda$ gives the same steady-state dynamics (though it takes a different time to reach it, about $1/(\eta\lambda)$ steps). This is one reason learning rate and weight decay should be tuned together.
:::
:::

::: exercise Mixup on two points {level=3}
Mixup with $\lambda\sim\operatorname{Beta}(\alpha, \alpha)$ trains a two-class logistic model on the point $\lambda\mathbf{x}_1 + (1 - \lambda)\mathbf{x}_2$ with soft label $\lambda$, where $\mathbf{x}_1$ has class $1$ and $\mathbf{x}_2$ class $0$. Show that a model with $\Prob(y = 1\mid\mathbf{x})$ linear along the segment would have zero mixup loss gradient in a sense made precise, and explain why mixup therefore encourages predictions that change linearly between training examples.
::: solution
Parametrise the segment by $\lambda\in[0, 1]$, the point $\mathbf{x}(\lambda) = \lambda\mathbf{x}_1 + (1 - \lambda)\mathbf{x}_2$. The mixup loss at $\lambda$ is the cross-entropy between the soft target $(\lambda, 1 - \lambda)$ and the prediction $(p(\lambda), 1 - p(\lambda))$, minimised over $p$ exactly when $p(\lambda) = \lambda$ ([[#prop-ls-optimum]]'s argument: cross-entropy is minimised when prediction equals target). So the loss, averaged over $\lambda$, is minimised by any model whose predicted probability rises linearly from $0$ at $\mathbf{x}_2$ to $1$ at $\mathbf{x}_1$ along the segment, and every other model pays a positive KL penalty somewhere on it. Mixup thus asks the network to interpolate *linearly in probability* between training examples of different classes, discouraging sharp jumps and overconfident predictions in between — a smoothness prior. A logistic model can only produce sigmoid-shaped (not linear) probabilities along a line, so it achieves this approximately, which acts as a pull towards smaller weights.
:::
:::
