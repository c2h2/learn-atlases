[[ml-fundamentals/generalisation]] showed that a flexible model fitted to few examples has high variance: it fits the noise, and its test error is large even when its training error is tiny. **Regularisation** is the name for the many ways of reducing that variance without giving up the flexible model — of telling the learner, in addition to "fit the data", *which* of the functions that fit the data to prefer. Goodfellow, Bengio and Courville (2016) define it broadly as any modification of a learning algorithm intended to reduce its generalisation error but not its training error.

This chapter treats the four classical forms, each of which reappears in the training of neural networks and language models. **Penalties** on the size of the weights ($\ell_2$, giving ridge regression and weight decay, and $\ell_1$, giving the lasso and sparsity). **Early stopping** of gradient descent, which turns out to act much like an $\ell_2$ penalty. **Data augmentation**, which encodes known invariances by manufacturing new examples and, in its simplest form, is again equivalent to a penalty. And the **Bayesian** reading that unifies them: a penalty is a prior, and the fully Bayesian alternative averages over all the models the data allow rather than choosing one. Methods specific to deep networks — dropout, normalisation, label smoothing — are in [[neural-networks/regularisation-deep]].

We use the singular value decomposition of [[math-for-ml/matrix-decompositions]] throughout, the ridge estimator of [[ml-fundamentals/linear-regression#def-ridge]], and the correspondence between priors and penalties of [[math-for-ml/estimation#prop-weight-decay]].

## Penalised empirical risk {#sec-penalties}

::: definition Regularised empirical risk minimisation {#def-penalised}
Given an empirical risk $\hat R_S(\mathbf{w})$ and a **penalty** (regulariser) $\Omega(\mathbf{w})\ge0$, **regularised ERM** returns

$$
\hat{\mathbf{w}}_\lambda = \arg\min_{\mathbf{w}}\Big[\hat R_S(\mathbf{w}) + \lambda\,\Omega(\mathbf{w})\Big],
$$

where the **regularisation strength** $\lambda\ge0$ is a hyperparameter. The common penalties are $\Omega(\mathbf{w}) = \frac12\lVert\mathbf{w}\rVert_2^2$ (**$\ell_2$**, ridge, Tikhonov, weight decay) and $\Omega(\mathbf{w}) = \lVert\mathbf{w}\rVert_1 = \sum_j\lvert w_j\rvert$ (**$\ell_1$**, the lasso). The intercept is normally left unpenalised.
:::

A penalty does not restrict the hypothesis class — every $\mathbf{w}$ is still allowed — but it makes large weights expensive, so that a large weight is chosen only if it buys a correspondingly large reduction in training loss. For convex losses there is an equivalent **constrained** form: for each $\lambda > 0$ there is a radius $r$ such that $\hat{\mathbf{w}}_\lambda$ also minimises $\hat R_S(\mathbf{w})$ subject to $\Omega(\mathbf{w})\le r$, and vice versa. The penalty is the Lagrange multiplier of the constraint ([[math-for-ml/optimisation#sec-constrained]]). The constrained form explains the geometry; the penalised form is what is optimised.

::: widget contour
f: (x - 2)^2 + 2(y - 1)^2
constraint: x^2 + y^2 - 1
x: -2.5, 3.5
y: -2, 2.5
point: 0.8, 0.6
caption: Ridge regression as a constrained problem. The level curves are those of a quadratic training loss with unconstrained minimum at $(2, 1)$; the circle is the constraint $\lVert\mathbf{w}\rVert^2\le1$. Drag the point: the constrained minimum is where a level curve touches the circle, and there the gradient of the loss is parallel to the gradient of the constraint — the Lagrange condition, whose multiplier is the penalty $\lambda$. The solution is pulled towards the origin, more along the $x$ direction, in which the loss is flatter.
:::

### What the $\ell_2$ penalty does to each direction {#sec-ridge-svd}

For least squares the effect of the $\ell_2$ penalty can be read off exactly. Let $X = U\Sigma V^\top$ be a thin singular value decomposition, with singular values $s_1\ge\dots\ge s_p > 0$, left singular vectors $\mathbf{u}_j$ (orthonormal in $\R^n$) and right singular vectors $\mathbf{v}_j$ (orthonormal in $\R^p$).

::: proposition Ridge regression shrinks along the singular directions {#prop-ridge-svd}
The ridge estimate $\hat{\mathbf{w}}_\lambda = (X^\top X + \lambda I)^{-1}X^\top\mathbf{y}$ and its fitted values are

$$
\hat{\mathbf{w}}_\lambda = \sum_{j=1}^p\frac{s_j^2}{s_j^2 + \lambda}\cdot\frac{\mathbf{u}_j^\top\mathbf{y}}{s_j}\,\mathbf{v}_j,\qquad X\hat{\mathbf{w}}_\lambda = \sum_{j=1}^p\frac{s_j^2}{s_j^2 + \lambda}\,(\mathbf{u}_j^\top\mathbf{y})\,\mathbf{u}_j.
$$ {#eq-ridge-svd}

Least squares ($\lambda = 0$) takes the factor $s_j^2/(s_j^2 + \lambda)$ to be $1$. Ridge keeps directions with $s_j^2\gg\lambda$ almost unchanged and suppresses directions with $s_j^2\ll\lambda$. Its **effective number of parameters** is $\operatorname{df}(\lambda) = \sum_js_j^2/(s_j^2 + \lambda)$, which decreases from $p$ to $0$ as $\lambda$ grows.
:::

::: proof
$X^\top X = V\Sigma^2V^\top$ and $X^\top\mathbf{y} = V\Sigma U^\top\mathbf{y}$, so $(X^\top X + \lambda I)^{-1}X^\top\mathbf{y} = V(\Sigma^2 + \lambda I)^{-1}\Sigma U^\top\mathbf{y}$, whose $j$-th coordinate in the basis $\mathbf{v}_j$ is $s_j(\mathbf{u}_j^\top\mathbf{y})/(s_j^2 + \lambda)$, which is the stated expression. Multiplying by $X$ maps $\mathbf{v}_j$ to $s_j\mathbf{u}_j$, giving the fitted values. The fitted values are $H_\lambda\mathbf{y}$ with $H_\lambda = U\operatorname{diag}\big(s_j^2/(s_j^2 + \lambda)\big)U^\top$, and $\operatorname{df}(\lambda) = \operatorname{tr}H_\lambda$ generalises the trace $p$ of the least-squares hat matrix ([[ml-fundamentals/linear-regression#prop-projection]]).
:::

A direction with a small singular value is one in which the data barely vary: the training inputs hardly distinguish weight vectors that differ along $\mathbf{v}_j$. Least squares nevertheless estimates the coefficient in that direction as $\mathbf{u}_j^\top\mathbf{y}/s_j$, dividing by a small number, so the noise in $\mathbf{y}$ is amplified by $1/s_j$. This is the variance explosion of nearly collinear features, of high-degree polynomials, and of the interpolation peak in [[ml-fundamentals/generalisation#sec-modern]]. Ridge damps exactly those directions. Exercise 7 of [[ml-fundamentals/generalisation]] showed that the damping, chosen correctly, trades a little bias for a larger reduction in variance.

::: example Shrinkage factors {#ex-shrinkage}
A centred design has squared singular values $s_j^2 = 10$, $1$ and $0.1$. With $\lambda = 1$, compute the shrinkage factors and the effective number of parameters. By how much does each direction's noise amplification change?
::: solution
The factors $s_j^2/(s_j^2 + 1)$ are $10/11 = 0.909$, $1/2 = 0.5$ and $0.1/1.1 = 0.091$, so $\operatorname{df}(1) = 1.50$: three nominal parameters, one and a half effective ones. The noise in $\mathbf{u}_j^\top\mathbf{y}$ is multiplied by $1/s_j$ in least squares and by $s_j/(s_j^2 + \lambda)$ in ridge. For $s_j^2 = 0.1$ ($s_j = 0.316$) that is $3.16$ against $0.287$, an elevenfold reduction; for $s_j^2 = 10$ it is $0.316$ against $0.287$, almost no change.
:::
:::

### The $\ell_1$ penalty and sparsity {#sec-lasso}

Replacing the square by an absolute value changes the character of the solution: many coefficients become *exactly* zero. With an orthonormal design the solution is explicit.

::: proposition The lasso with orthonormal features is soft thresholding {#prop-lasso}
Suppose $X^\top X = I$ and let $\mathbf{z} = X^\top\mathbf{y}$ be the least-squares estimate. The minimiser of $\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2 + \lambda\lVert\mathbf{w}\rVert_1$ is

$$
\hat w_j = \operatorname{sign}(z_j)\max(\lvert z_j\rvert - \lambda, 0)\qquad(j = 1, \dots, p),
$$

whereas the minimiser of $\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2 + \frac\lambda2\lVert\mathbf{w}\rVert^2$ is $\hat w_j = z_j/(1 + \lambda)$.
:::

::: proof
With $X^\top X = I$, $\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2 = \frac12\lVert\mathbf{y}\rVert^2 - \mathbf{w}^\top\mathbf{z} + \frac12\lVert\mathbf{w}\rVert^2 = \frac12\lVert\mathbf{w} - \mathbf{z}\rVert^2 + \text{const}$, so both problems separate into one-dimensional problems $\min_w\frac12(w - z)^2 + \lambda\lvert w\rvert$ (respectively $+\frac\lambda2w^2$). The $\ell_2$ case has derivative $w - z + \lambda w$, zero at $w = z/(1 + \lambda)$. In the $\ell_1$ case, for $w > 0$ the derivative is $w - z + \lambda$, which vanishes at $w = z - \lambda$, a valid positive solution only if $z > \lambda$; symmetrically $w = z + \lambda$ for $z < -\lambda$. If $\lvert z\rvert\le\lambda$, the objective's slope is $-z + \lambda\ge0$ just to the right of $0$ and $-z - \lambda\le0$ just to the left, so $w = 0$ is the minimum. The objective is strictly convex, so these minimisers are unique.
:::

The $\ell_2$ penalty shrinks every coefficient by the same *factor*; the $\ell_1$ penalty shrinks every coefficient by the same *amount* and sets the small ones to zero. Geometrically, the $\ell_1$ ball $\{\lVert\mathbf{w}\rVert_1\le r\}$ is a diamond with corners on the axes, and the level curves of the loss typically first touch it at a corner, where some coordinates are zero. Sparse solutions select features, make models cheaper to evaluate and easier to read, and are the basis of compressed sensing. Statistically, $\ell_1$ is the MAP penalty for a Laplace prior ([[math-for-ml/estimation#prop-weight-decay]]). In general (non-orthonormal $X$) the lasso has no closed form and is solved by coordinate descent or proximal gradient methods, each of whose steps is a soft-thresholding.

::: widget plot
f: sign(x)*max(abs(x) - l, 0); x/(1 + l); x
x: -3, 3
y: -3, 3
sliders: l=0.5:0:2:0.05
labels: lasso (soft threshold); ridge; least squares
equal: true
caption: The penalised estimate of one coefficient as a function of its least-squares value $z$, for orthonormal features ([[#prop-lasso]]). The lasso sets every $\lvert z\rvert\le\lambda$ to exactly zero and moves the rest towards zero by $\lambda$; ridge scales every value by $1/(1 + \lambda)$ and never reaches zero. Large coefficients are biased more by ridge than by the lasso.
:::

::: example Lasso against ridge {#ex-lasso}
With orthonormal features, the least-squares coefficients are $\mathbf{z} = (3, -0.8, 0.2)$. Compute the lasso and ridge estimates with $\lambda = 0.5$ in the parametrisation of [[#prop-lasso]].
::: solution
Lasso: $\operatorname{sign}(z_j)\max(\lvert z_j\rvert - 0.5, 0)$ gives $(2.5, -0.3, 0)$ — the third feature is dropped, and every surviving coefficient moves $0.5$ towards zero. Ridge: $z_j/1.5$ gives $(2, -0.533, 0.133)$ — nothing is dropped, and the large coefficient loses the most in absolute terms.
:::
:::

## Weight decay {#sec-weight-decay}

In gradient-based training the $\ell_2$ penalty has a simple mechanical effect.

::: proposition The $\ell_2$ penalty is weight decay {#prop-decay}
One gradient step of size $\eta$ on $\hat R_S(\mathbf{w}) + \frac\lambda2\lVert\mathbf{w}\rVert^2$ is

$$
\mathbf{w}\leftarrow(1 - \eta\lambda)\,\mathbf{w} - \eta\nabla\hat R_S(\mathbf{w}):
$$

the weights are multiplied by the **decay factor** $1 - \eta\lambda$ and then updated by the plain gradient. In the absence of gradient signal a weight decays geometrically, to $(1 - \eta\lambda)^t\approx e^{-\eta\lambda t}$ of its value after $t$ steps.
:::

The proof is one line: the gradient of $\frac\lambda2\lVert\mathbf{w}\rVert^2$ is $\lambda\mathbf{w}$. Weights that the data keep supporting are maintained by the gradient; weights that the data do not need decay towards zero. For plain (stochastic) gradient descent, the penalty and the decay are the same thing. For adaptive optimisers such as Adam they are not: adding $\lambda\mathbf{w}$ to the gradient lets the adaptive per-coordinate scaling shrink the decay for parameters with large gradients, whereas multiplying the weights directly by $1 - \eta\lambda$ — **decoupled weight decay**, the AdamW optimiser of Loshchilov and Hutter (2019) — decays all weights at the same rate. AdamW is the standard optimiser for Transformers (see [[math-for-ml/optimisation]]); in such training weight decay is usually applied to weight matrices and not to biases or normalisation parameters, a convention rather than a theorem.

::: example How fast weights decay {#ex-decay}
A model is trained with learning rate $\eta = 0.01$ and weight decay $\lambda = 0.1$. What is the decay factor per step, and what fraction of a weight that receives no gradient survives $1000$ steps? How many steps halve it?
::: solution
The factor is $1 - 0.001 = 0.999$. After $1000$ steps, $0.999^{1000} = 0.368\approx e^{-1}$ remains. Halving takes $\log2/(-\log0.999)\approx693$ steps. In a training run of $10^5$ steps, an unsupported weight is forgotten many times over; the product $\eta\lambda$, not either number alone, sets the time scale of forgetting, which is why changing the learning rate without adjusting the weight decay changes the effective regularisation.
:::
:::

## Early stopping {#sec-early-stopping}

Gradient descent started at $\mathbf{w}_0 = \mathbf{0}$ moves towards the least-squares solution, but not uniformly: it fits the directions of large singular value first and the directions of small singular value — the noisy ones — last. Stopping it early is a regulariser in its own right, and for least squares it can be compared with ridge exactly. In this section the loss is $\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2$, whose gradient is $X^\top(X\mathbf{w} - \mathbf{y})$.

::: proposition Early stopping as spectral filtering {#prop-early-stopping}
Gradient descent $\mathbf{w}_{t+1} = \mathbf{w}_t - \eta X^\top(X\mathbf{w}_t - \mathbf{y})$ from $\mathbf{w}_0 = \mathbf{0}$, with $0 < \eta s_1^2 < 1$, gives after $t$ steps

$$
\mathbf{w}_t = \sum_{j=1}^p\Big[1 - (1 - \eta s_j^2)^t\Big]\frac{\mathbf{u}_j^\top\mathbf{y}}{s_j}\,\mathbf{v}_j.
$$ {#eq-early-stopping}

Compared with [[#eq-ridge-svd]], the ridge factor $s^2/(s^2 + \lambda)$ is replaced by $1 - (1 - \eta s^2)^t$. Both are near $1$ for large $s^2$ and near $0$ for small $s^2$, and both are close to $s^2/\lambda$ when $s^2\ll\lambda$ with the identification $\lambda = 1/(\eta t)$.
:::

::: proof
Write $\mathbf{w}_t = \sum_jc_j(t)\mathbf{v}_j$. Since $X^\top X\mathbf{v}_j = s_j^2\mathbf{v}_j$ and $X^\top\mathbf{y} = \sum_js_j(\mathbf{u}_j^\top\mathbf{y})\mathbf{v}_j$ (plus nothing outside the span of the $\mathbf{v}_j$), the update decouples: $c_j(t + 1) = (1 - \eta s_j^2)c_j(t) + \eta s_j\,\mathbf{u}_j^\top\mathbf{y}$. With $c_j(0) = 0$ and fixed point $c_j^* = \mathbf{u}_j^\top\mathbf{y}/s_j$, the error $c_j(t) - c_j^*$ is multiplied by $1 - \eta s_j^2$ at each step, so $c_j(t) = c_j^*\big(1 - (1 - \eta s_j^2)^t\big)$. For the comparison: if $\eta s^2t\ll1$ then $1 - (1 - \eta s^2)^t\approx\eta s^2t$, and if $s^2\ll\lambda$ then $s^2/(s^2 + \lambda)\approx s^2/\lambda$; these agree when $\lambda = 1/(\eta t)$. For large $s^2$ both factors tend to $1$.
:::

So the number of steps acts as an inverse regularisation strength: training longer is like lowering $\lambda$. Stopping at the minimum of the validation error is cheap model selection — it needs one training run, checkpointed — and is used for almost every neural network. The equivalence is exact only for quadratic losses, but the qualitative picture (gradient descent learns large-scale, well-determined structure first and fits noise last) carries over to neural networks, whose training curves often show validation loss reaching a minimum and then rising while training loss keeps falling.

::: widget plot
f: x/(x + l); 1 - (1 - h*x)^t
x: 0, 1
y: 0, 1.05
sliders: l=0.05:0.005:0.5:0.005; h=0.1:0.01:0.9:0.01; t=200:1:2000:1
labels: ridge $s^2/(s^2 + \lambda)$; early stopping $1 - (1 - \eta s^2)^t$
caption: The two spectral filters of [[#prop-early-stopping]] as functions of the squared singular value $s^2$. Set $\lambda = 1/(\eta t)$ (for instance $\eta = 0.1$, $t = 200$, $\lambda = 0.05$) and the curves nearly coincide for small $s^2$; early stopping cuts off more sharply. Increasing $t$ moves the early-stopping filter to the left, letting in more of the poorly determined directions, just as lowering $\lambda$ does.
:::

::: example Steps and penalties {#ex-early}
With $\eta = 0.1$ and $t = 100$ steps, compare the early-stopping and ridge factors (with $\lambda = 1/(\eta t)$) for $s^2 = 0.01$, $0.1$ and $1$.
::: solution
$\lambda = 1/(0.1\cdot100) = 0.1$.

| $s^2$ | early stopping $1 - (1 - 0.1s^2)^{100}$ | ridge $s^2/(s^2 + 0.1)$ |
|---|---|---|
| $0.01$ | $1 - 0.999^{100} = 0.095$ | $0.091$ |
| $0.1$ | $1 - 0.99^{100} = 0.634$ | $0.500$ |
| $1$ | $1 - 0.9^{100} = 1.000$ | $0.909$ |

The two agree on the directions that matter most for variance, those with small $s^2$, and early stopping is closer to "keep or kill": it leaves well-determined directions untouched, while ridge biases even them a little.
:::
:::

## Data augmentation {#sec-augmentation}

The most direct way to reduce variance is more data. When we know transformations that should not change the label — a photograph shifted by a few pixels or mirrored, a sound clip slightly faster, a sentence with a synonym substituted or translated to another language and back — we can **augment** the training set with transformed copies. This encodes prior knowledge as data rather than as a penalty, and for images it is often the single most effective regulariser. The transformations must genuinely preserve the label: mirroring is harmless for photographs of cats and fatal for images of text or of the digits $6$ and $9$ rotated by $180°$.

The simplest augmentation, adding small random noise to the inputs, is equivalent to a penalty.

::: proposition Input noise is ridge regression {#prop-noise}
For a linear model, let each input be perturbed by independent noise $\boldsymbol\xi$ with $\E\boldsymbol\xi = \mathbf{0}$ and $\Cov\boldsymbol\xi = \nu^2I$. Then the expected squared loss is

$$
\E_{\boldsymbol\xi}\big[(y - \mathbf{w}^\top(\mathbf{x} + \boldsymbol\xi))^2\big] = (y - \mathbf{w}^\top\mathbf{x})^2 + \nu^2\lVert\mathbf{w}\rVert^2,
$$

so training on many noisy copies of the data minimises, in the limit, the ridge objective with penalty $n\nu^2$ on the summed loss (equivalently $\nu^2$ on the mean loss).
:::

::: proof
$y - \mathbf{w}^\top(\mathbf{x} + \boldsymbol\xi) = (y - \mathbf{w}^\top\mathbf{x}) - \mathbf{w}^\top\boldsymbol\xi$. Squaring and taking the expectation, the cross term vanishes because $\E\boldsymbol\xi = \mathbf{0}$, and $\E(\mathbf{w}^\top\boldsymbol\xi)^2 = \mathbf{w}^\top\Cov(\boldsymbol\xi)\mathbf{w} = \nu^2\lVert\mathbf{w}\rVert^2$. Summing over the $n$ examples gives the penalty $n\nu^2\lVert\mathbf{w}\rVert^2$.
:::

This result, made general for non-linear models to first order in $\nu^2$ by Bishop (1995), explains why noisy augmentation regularises: a model that must give the same answer for nearby inputs cannot use large weights, which would make it sensitive to small perturbations. Richer augmentations encode richer invariances (exercise 9 works out one), and for language models the analogue is the sheer variety of the pretraining corpus, together with techniques such as back-translation for machine translation (Sennrich, Haddow and Birch, 2016).

## The Bayesian view {#sec-bayesian}

[[ml-fundamentals/linear-regression#prop-ridge-map]] showed that ridge regression is the MAP estimate under a Gaussian prior. MAP picks the mode of the posterior and discards the rest. Keeping the whole posterior gives more: an estimate of how uncertain each prediction is.

::: proposition Bayesian linear regression {#prop-posterior}
Let $\mathbf{y}\mid\mathbf{w}\sim\Normal(X\mathbf{w}, \sigma^2I)$ with prior $\mathbf{w}\sim\Normal(\mathbf{0}, \tau^2I)$. The posterior is $\Normal(\mathbf{m}, \Sigma_{\text{post}})$ with

$$
\Sigma_{\text{post}} = \Big(\frac{X^\top X}{\sigma^2} + \frac{I}{\tau^2}\Big)^{-1},\qquad\mathbf{m} = \frac1{\sigma^2}\Sigma_{\text{post}}X^\top\mathbf{y} = \Big(X^\top X + \frac{\sigma^2}{\tau^2}I\Big)^{-1}X^\top\mathbf{y}.
$$

The posterior mean is the ridge estimate with $\lambda = \sigma^2/\tau^2$. The **posterior predictive** distribution of a new label at $\mathbf{x}_*$ is $\Normal\big(\mathbf{m}^\top\mathbf{x}_*,\ \sigma^2 + \mathbf{x}_*^\top\Sigma_{\text{post}}\mathbf{x}_*\big)$.
:::

::: proof
The log-posterior is, up to a constant, $-\frac1{2\sigma^2}\lVert\mathbf{y} - X\mathbf{w}\rVert^2 - \frac1{2\tau^2}\lVert\mathbf{w}\rVert^2 = -\frac12\mathbf{w}^\top A\mathbf{w} + \mathbf{w}^\top\mathbf{b} + \text{const}$ with $A = X^\top X/\sigma^2 + I/\tau^2$ and $\mathbf{b} = X^\top\mathbf{y}/\sigma^2$. Completing the square, this is $-\frac12(\mathbf{w} - A^{-1}\mathbf{b})^\top A(\mathbf{w} - A^{-1}\mathbf{b}) + \text{const}$, the log-density of $\Normal(A^{-1}\mathbf{b}, A^{-1})$. Multiplying $A^{-1}\mathbf{b}$ through by $\sigma^2$ gives the second form of $\mathbf{m}$. A new label is $y_* = \mathbf{w}^\top\mathbf{x}_* + \varepsilon_*$ with $\varepsilon_*$ independent of $\mathbf{w}$; under the posterior, $\mathbf{w}^\top\mathbf{x}_*$ is Gaussian with mean $\mathbf{m}^\top\mathbf{x}_*$ and variance $\mathbf{x}_*^\top\Sigma_{\text{post}}\mathbf{x}_*$, and adding the independent noise adds $\sigma^2$ to the variance.
:::

The predictive variance has two parts: the irreducible noise $\sigma^2$ and the **epistemic** uncertainty $\mathbf{x}_*^\top\Sigma_{\text{post}}\mathbf{x}_*$ about the weights, which is small where training data are dense and large far from them. A point estimate — least squares, ridge, any MAP — reports neither. The Bayesian framework also offers a principled way to choose $\lambda$ (or $\sigma$ and $\tau$): maximise the **marginal likelihood** $p(\mathbf{y}\mid X, \sigma, \tau)$, the probability of the data with the weights integrated out (MacKay, 1992; Bishop, 2006, §3.5). For large neural networks exact posteriors are intractable, and approximations — ensembles of independently trained models, Laplace approximations, stochastic-gradient Monte Carlo — are active research rather than routine practice (as of 2026).

::: example A predictive interval {#ex-predictive}
Without an intercept, fit $y = wx$ to $(1, 2)$ and $(2, 4.5)$ with noise variance $\sigma^2 = 1$ and prior $w\sim\Normal(0, 1)$. Give the posterior and the predictive distribution at $x_* = 3$.
::: solution
$X^\top X = 5$, so $\Sigma_{\text{post}} = (5 + 1)^{-1} = 1/6$, and $m = \frac16\cdot X^\top\mathbf{y} = 11/6 = 1.833$ — the ridge slope with $\lambda = 1$ from exercise 3 of [[ml-fundamentals/linear-regression]]. At $x_* = 3$ the predictive mean is $5.5$ and the variance $1 + 9/6 = 2.5$, standard deviation $1.58$; a $95\%$ predictive interval is $5.5\pm1.96\cdot1.58 = [2.40, 8.60]$. Of the variance $2.5$, $1$ is noise and $1.5$ is uncertainty about $w$, which grows with $x_*^2$: predictions far from the data are less certain.
:::
:::

## Choosing the strength {#sec-choosing}

Every regulariser has a strength — $\lambda$, the number of steps, the size of the augmentation noise — and none can be set from the training data alone, since the training error always prefers no regularisation. The standard tool is cross-validation ([[ml-fundamentals/generalisation#alg-cv]]) over a logarithmic grid. The listing fits a polynomial of degree $10$ — eleven coefficients — to $30$ noisy points of $\sin(\pi x)$ on $[-1, 1]$ (noise $\sigma = 0.3$) with an unpenalised intercept, chooses $\lambda$ by five-fold cross-validation, and reports the error on $5000$ fresh test points.

```python
import math, random

rng = random.Random(6)
f = lambda x: math.sin(math.pi * x)
deg, sigma = 10, 0.3
phi = lambda x: [x ** j for j in range(deg + 1)]                  # 11 polynomial features

def data(n):
    xs = [rng.uniform(-1, 1) for _ in range(n)]
    return [(phi(x), f(x) + rng.gauss(0, sigma)) for x in xs]

def solve(A, b):
    m = len(A); M = [r[:] + [v] for r, v in zip(A, b)]
    for k in range(m):
        q = max(range(k, m), key=lambda i: abs(M[i][k])); M[k], M[q] = M[q], M[k]
        for i in range(k + 1, m):
            c = M[i][k] / M[k][k]
            for j in range(k, m + 1): M[i][j] -= c * M[k][j]
    x = [0.0] * m
    for k in reversed(range(m)):
        x[k] = (M[k][m] - sum(M[k][j] * x[j] for j in range(k + 1, m))) / M[k][k]
    return x

def ridge(D, lam):
    """Minimise sum (y - w.phi)^2 + lam * sum_{j>=1} w_j^2 (intercept w_0 not penalised)."""
    p = len(D[0][0])
    G = [[sum(x[i] * x[j] for x, _ in D) + (lam if i == j and i > 0 else 0) for j in range(p)] for i in range(p)]
    return solve(G, [sum(x[i] * y for x, y in D) for i in range(p)])

mse = lambda w, D: sum((sum(a * b for a, b in zip(w, x)) - y) ** 2 for x, y in D) / len(D)

train, test = data(30), data(5000)
folds = [train[i::5] for i in range(5)]                           # 5 folds of 6 examples

print("lambda     train    5-fold CV   test")
for lam in (0, 1e-4, 1e-3, 1e-2, 1e-1, 1, 10):
    cv = sum(mse(ridge([e for j, F in enumerate(folds) if j != k for e in F], lam), folds[k])
             for k in range(5)) / 5
    w = ridge(train, lam)
    print(f"{lam:8g}  {mse(w, train):7.3f}  {cv:10.3f}  {mse(w, test):6.3f}")
```

```text
lambda     train    5-fold CV   test
       0    0.075    4784.423  5043.619
  0.0001    0.086       1.479  11.254
   0.001    0.088       0.535   1.756
    0.01    0.095       0.264   0.126
     0.1    0.113       0.223   0.106
       1    0.169       0.247   0.326
      10    0.388       0.502   0.359
```

Without a penalty the degree-$10$ polynomial has a training error ($0.075$) below the noise level and a test error in the thousands: between and beyond the random training inputs it swings wildly. A penalty as small as $\lambda = 0.01$ tames it. Cross-validation picks $\lambda = 0.1$, which also has the lowest test error, $0.106$, close to the noise floor $\sigma^2 = 0.09$. As $\lambda$ grows past that, training, validation and test errors all rise: the model is now too constrained (bias dominates). The cross-validation errors are noisy — each fold has only six points — and larger than the test errors at small $\lambda$, because models trained on $24$ points are less stable than the final model on $30$; what matters is that their minimum is in the right place.

::: quiz
A ridge model's training error is $0.10$ and its cross-validated error is $0.40$. Which change is most likely to reduce the cross-validated error?
- [ ] Decrease $\lambda$, so the model fits the training data better
- [x] Increase $\lambda$, trading a higher training error for lower variance
- [ ] Choose $\lambda$ by minimising the training error instead
- [ ] Remove the intercept from the model
::: solution
A large gap between training and held-out error is the signature of high variance (overfitting), which a stronger penalty reduces. Decreasing $\lambda$ widens the gap. The training error always prefers $\lambda = 0$ and cannot be used to choose it. The intercept is not the source of variance and should stay unpenalised.
:::
:::

::: warning Regularisation is not a substitute for validation
Each regulariser is a bet on what the true function looks like — small weights, few non-zero features, invariance to some transformation. A bad bet does harm: an $\ell_1$ penalty on a problem whose signal is spread over many correlated features discards useful information, and an augmentation that changes labels teaches the model falsehoods. Penalties also interact with scaling: an $\ell_2$ penalty treats a feature measured in millimetres very differently from the same feature in kilometres, so standardise features before penalising them. And a regularised model's training error is not a measure of its quality any more than an unregularised one's: only held-out data can say whether the bet paid off.
:::

::: history
Andrey Tikhonov introduced the regularisation of ill-posed inverse problems by a quadratic penalty in 1943 and developed it in 1963; Arthur Hoerl and Robert Kennard proposed ridge regression for collinear statistical data in 1970. Robert Tibshirani's lasso (1996) — with the closely related basis pursuit of Chen, Donoho and Saunders (1998) — made the $\ell_1$ penalty standard and led to the theory of sparse recovery and compressed sensing (Candès, Romberg and Tao, 2006; Donoho, 2006). Weight decay for neural networks was studied by Hinton and others in the 1980s and analysed by Krogh and Hertz (1992), and early stopping by Morgan and Bourlard (1990) among others. Chris Bishop showed in 1995 that training with input noise is equivalent to Tikhonov regularisation. David MacKay's Bayesian treatment of neural networks (1992) introduced evidence-based choice of regularisation constants. Ilya Loshchilov and Frank Hutter's decoupled weight decay (AdamW, 2019) is used in training most current large language models.
:::

::: summary
- Regularisation reduces variance by expressing a preference among the functions that fit the data: penalties, early stopping, augmentation and priors.
- The $\ell_2$ penalty (ridge) multiplies the least-squares coefficient along each singular direction by $s_j^2/(s_j^2 + \lambda)$: well-determined directions are kept, poorly determined (noise-amplifying) ones suppressed. $\operatorname{df}(\lambda) = \sum_js_j^2/(s_j^2 + \lambda)$ counts the effective parameters.
- The $\ell_1$ penalty (lasso) soft-thresholds: it shrinks coefficients by a constant amount and sets small ones exactly to zero, selecting features.
- In gradient descent, the $\ell_2$ penalty is weight decay by the factor $1 - \eta\lambda$ per step; for Adam, decoupled decay (AdamW) is the standard form.
- Early stopping after $t$ steps filters the spectrum like ridge with $\lambda\approx1/(\eta t)$: longer training means weaker regularisation.
- Augmentation encodes invariances as data; input noise in a linear model is exactly an $\ell_2$ penalty.
- A Gaussian prior gives ridge as the posterior mean, and the full posterior adds predictive uncertainty. Choose every strength by validation, never by training error.
:::

## Exercises

::: exercise A shrinkage factor {level=1 check="4/5"}
In a ridge regression, one singular direction of the design has $s^2 = 4$ and the penalty is $\lambda = 1$. By what factor is the least-squares coefficient in that direction multiplied?
::: solution
By [[#prop-ridge-svd]], by $s^2/(s^2 + \lambda) = 4/5 = 0.8$.
:::
:::

::: exercise Effective parameters {level=1 check="3/2"}
A design has squared singular values $9$, $1$ and $1/9$. What is $\operatorname{df}(\lambda)$ at $\lambda = 1$?
::: solution
$9/10 + 1/2 + (1/9)/(10/9) = 0.9 + 0.5 + 0.1 = 1.5$.
:::
:::

::: exercise Soft thresholding {level=1 check="0.7"}
With orthonormal features and penalty $\lambda = 0.5$ as in [[#prop-lasso]], the least-squares coefficients are $1.2$ and $-0.3$. What are the lasso coefficients? Give the first.
::: solution
$\operatorname{sign}(1.2)\max(1.2 - 0.5, 0) = 0.7$ and $\operatorname{sign}(-0.3)\max(0.3 - 0.5, 0) = 0$: the second feature is removed.
:::
:::

::: exercise A half-life {level=2 check="693"}
With $\eta\lambda = 10^{-3}$ per step, after how many steps (the smallest integer) has a weight that receives no gradient decayed to at most half its value?
::: solution
We need $(1 - 10^{-3})^t\le1/2$, that is $t\ge\log2/(-\log0.999) = 0.693147/0.0010005 = 692.8$, so $t = 693$ steps. The approximation $e^{-\eta\lambda t}$ gives $\log2/10^{-3} = 693.1$, the same integer.
:::
:::

::: exercise The penalty of early stopping {level=2 check="0.05"}
Gradient descent with step size $\eta = 0.05$ on the loss $\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2$ is stopped after $t = 400$ steps. Which ridge penalty does it roughly correspond to, according to [[#prop-early-stopping]]?
::: solution
$\lambda\approx1/(\eta t) = 1/(0.05\cdot400) = 0.05$.
:::
:::

::: exercise Noise as a penalty {level=2 check="5"}
A linear model is trained by least squares (summed over examples) on $n = 500$ examples whose inputs are perturbed afresh at every step by independent noise with standard deviation $\nu = 0.1$ per feature. Which ridge penalty $\lambda$, for the objective $\lVert\mathbf{y} - X\mathbf{w}\rVert^2 + \lambda\lVert\mathbf{w}\rVert^2$, does this approximate?
::: solution
By [[#prop-noise]], each example contributes $\nu^2\lVert\mathbf{w}\rVert^2$ in expectation, so the total penalty is $n\nu^2 = 500\cdot0.01 = 5$.
:::
:::

::: exercise Predictive uncertainty {level=2 check="5/3"}
In [[#ex-predictive]], what is the predictive variance at $x_* = 2$?
::: solution
$\sigma^2 + x_*^2\Sigma_{\text{post}} = 1 + 4/6 = 5/3\approx1.67$.
:::
:::

::: exercise Best subset is hard thresholding {level=3}
With orthonormal features ($X^\top X = I$, $\mathbf{z} = X^\top\mathbf{y}$), consider the $\ell_0$ penalty, which counts non-zero coefficients: minimise $\frac12\lVert\mathbf{y} - X\mathbf{w}\rVert^2 + \lambda\lVert\mathbf{w}\rVert_0$. Show that the solution keeps $z_j$ unchanged if $\lvert z_j\rvert > \sqrt{2\lambda}$ and sets it to zero otherwise (hard thresholding). Compare with [[#prop-lasso]].
::: solution
As in the proof of [[#prop-lasso]], the objective is $\frac12\lVert\mathbf{w} - \mathbf{z}\rVert^2 + \lambda\lVert\mathbf{w}\rVert_0$ plus a constant, and it separates by coordinate. For coordinate $j$, choosing $w_j = 0$ costs $\frac12z_j^2$; choosing $w_j\ne0$ costs $\lambda$ plus $\frac12(w_j - z_j)^2$, minimised at $w_j = z_j$ with cost $\lambda$. Keep the coordinate when $\lambda < \frac12z_j^2$, that is $\lvert z_j\rvert > \sqrt{2\lambda}$. Unlike the lasso, coefficients that survive are not shrunk at all, so there is no bias on large coefficients; but the objective is not convex, and for general (non-orthonormal) $X$ best-subset selection is a combinatorial search, NP-hard in general. The lasso is its convex relaxation.
:::
:::

::: exercise Augmentation by a symmetry {level=3}
Polynomial features $1, x, \dots, x^p$ are used on inputs in $[-1, 1]$, and the label is known to be symmetric: $f(-x) = f(x)$. The training set is augmented by adding, for each $(x_i, y_i)$, the mirrored example $(-x_i, y_i)$. Show that the least-squares fit on the augmented set has zero coefficients on all odd powers, whatever the data.
::: solution
On the augmented inputs, every odd power has a sum of products with every even power equal to zero: $\sum_i(x_i^{a + b} + (-x_i)^{a + b}) = 0$ when $a + b$ is odd. So the Gram matrix $\Phi^\top\Phi$ is block diagonal, with an even block and an odd block, and the normal equations split. In the odd block the right-hand side is $\sum_i(x_i^a y_i + (-x_i)^a y_i) = 0$ for odd $a$. Hence the odd coefficients solve a homogeneous system, and (if that block is invertible, as it is for enough distinct inputs) they are zero; if it is singular, the minimum-norm solution is still zero. The fitted function is even: the augmentation has imposed the known symmetry exactly, halving the effective number of parameters without any penalty.
:::
:::

::: exercise Early stopping in practice {level=3}
Append to the listing a run of gradient descent on the training mean squared error, from $\mathbf{w} = \mathbf{0}$ with $\eta = 0.2$ and no penalty, printing training and test error after $10$, $100$, $1000$, $10^4$ and $10^5$ steps. Explain the output in terms of [[#prop-early-stopping]].
::: solution
The code is

```python
p = deg + 1
w = [0.0] * p
eta = 0.2
for t in range(1, 100001):
    r = [sum(a * b for a, b in zip(w, x)) - y for x, y in train]          # residuals (30,)
    g = [2 / len(train) * sum(ri * x[j] for ri, (x, _) in zip(r, train)) for j in range(p)]
    w = [wj - eta * gj for wj, gj in zip(w, g)]
    if t in (10, 100, 1000, 10000, 100000):
        print(f"step {t:6d}  train {mse(w, train):.3f}  test {mse(w, test):.3f}  "
              f"|w| {math.sqrt(sum(v*v for v in w)):.2f}")
```

and its output is

```text
step     10  train 0.286  test 0.363  |w| 0.94
step    100  train 0.149  test 0.359  |w| 1.87
step   1000  train 0.101  test 0.188  |w| 3.77
step  10000  train 0.093  test 0.119  |w| 5.61
step 100000  train 0.087  test 4.565  |w| 12.96
```

Training error falls monotonically towards the least-squares value $0.075$. Test error falls until around $10^4$ steps, where it is $0.119$ — close to the best ridge result — and then rises to $4.6$ after $10^5$ steps as gradient descent begins to fit the poorly determined directions (tiny $s_j^2$ of the polynomial design) that carry mostly noise. The weight norm grows steadily, as the coefficients along those directions fill in. Run long enough, gradient descent reaches the unregularised fit with test error in the thousands; stopping at the validation minimum is the implicit penalty $\lambda\approx1/(\eta t)$.
:::
:::
