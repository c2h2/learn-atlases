Every model in this atlas is trained the same way: write down a loss $\mathcal{L}(\theta)$ that measures how badly the parameters $\theta$ fit the data, compute its gradient by backpropagation, and take a small step downhill. Repeat a few hundred thousand times. That such a simple procedure finds good parameters for a non-convex function of billions of variables is one of the surprises of deep learning, and it is not fully explained. What *is* well understood is how gradient descent behaves on simpler functions, and that theory explains most of what practitioners worry about: why the learning rate must be below a threshold set by the curvature, why ill-conditioned problems are slow, why stochastic gradients need decaying or small steps, and what momentum and Adam are for.

This chapter develops that theory with full proofs where they are short: convexity, the descent lemma for $L$-smooth functions, convergence of gradient descent in the non-convex and convex cases, the exact analysis on a quadratic, and then the stochastic and adaptive methods used to train language models — SGD, momentum, Adam and AdamW, stated with their update rules. It ends with constrained optimisation and Lagrange multipliers, which turn out to explain where the softmax comes from. For background on extrema of functions of several variables, see the Maths Atlas lesson on [extrema](/learn/maths/lesson.php?c=multivariable&l=extrema), and for iterative methods in general, [iterative methods](/learn/maths/lesson.php?c=numerical-analysis&l=iterative-methods).

## The problem {#sec-problem}

We want to minimise a differentiable function $f\colon\R^d\to\R$ — in machine learning, the average loss over a training set, $f(\theta) = \frac1N\sum_n\ell(\theta; x_n)$. A point $\theta^*$ is a **global minimiser** if $f(\theta^*)\le f(\theta)$ for all $\theta$, and a **local minimiser** if this holds for $\theta$ near $\theta^*$. At any local minimiser of a differentiable function the gradient vanishes, $\nabla f(\theta^*) = \mathbf{0}$; points with zero gradient are **stationary points**, and they also include maxima and **saddle points**, where the function curves up in some directions and down in others. The second-order picture is given by the **Hessian** $\nabla^2f$, the symmetric matrix of second partial derivatives: at a stationary point, a positive definite Hessian means a strict local minimum, and a Hessian with eigenvalues of both signs means a saddle ([[math-for-ml/matrix-decompositions#def-psd]]).

The basic algorithm is the one Cauchy proposed in 1847.

::: algorithm Gradient descent {#alg-gd}
Input: a starting point $\theta_0$ and a **learning rate** (step size) $\eta > 0$. For $k = 0, 1, 2, \dots$:

$$
\theta_{k+1} = \theta_k - \eta\,\nabla f(\theta_k).
$$
:::

By [[math-for-ml/gradients#prop-steepest]], $-\nabla f$ is the direction of steepest local descent. Whether a step in that direction actually decreases $f$ depends on how far the linear approximation can be trusted, and that is a question about curvature.

## Convexity {#sec-convex}

::: definition Convex function {#def-convex}
A function $f\colon\R^d\to\R$ is **convex** if for all $\mathbf{x}, \mathbf{y}$ and $t\in[0, 1]$,

$$
f\big(t\mathbf{x} + (1 - t)\mathbf{y}\big)\le tf(\mathbf{x}) + (1 - t)f(\mathbf{y}):
$$

the graph lies below every chord. It is **$\mu$-strongly convex** ($\mu > 0$) if $f(\mathbf{x}) - \frac\mu2\lVert\mathbf{x}\rVert^2$ is convex.
:::

::: proposition First-order characterisation; local is global {#prop-convex}
Let $f$ be differentiable. Then $f$ is convex if and only if

$$
f(\mathbf{y})\ge f(\mathbf{x}) + \nabla f(\mathbf{x})\cdot(\mathbf{y} - \mathbf{x})\qquad\text{for all }\mathbf{x}, \mathbf{y}:
$$ {#eq-tangent}

every tangent plane lies below the graph. Consequently, for a convex differentiable $f$, every stationary point is a global minimiser. A twice-differentiable $f$ is convex if and only if its Hessian is positive semidefinite everywhere.
:::

::: proof
If $f$ is convex, then for $t\in(0, 1]$, $f(\mathbf{x} + t(\mathbf{y} - \mathbf{x}))\le f(\mathbf{x}) + t\big(f(\mathbf{y}) - f(\mathbf{x})\big)$; subtract $f(\mathbf{x})$, divide by $t$ and let $t\to0$: the left side tends to the directional derivative $\nabla f(\mathbf{x})\cdot(\mathbf{y} - \mathbf{x})$, which gives [[#eq-tangent]]. Conversely, if [[#eq-tangent]] holds, put $\mathbf{z} = t\mathbf{x} + (1 - t)\mathbf{y}$ and apply it at $\mathbf{z}$ towards $\mathbf{x}$ and towards $\mathbf{y}$; adding $t$ times the first inequality to $1 - t$ times the second, the gradient terms cancel and leave $tf(\mathbf{x}) + (1 - t)f(\mathbf{y})\ge f(\mathbf{z})$. If $\nabla f(\mathbf{x}) = \mathbf{0}$, [[#eq-tangent]] reads $f(\mathbf{y})\ge f(\mathbf{x})$ for every $\mathbf{y}$. For the Hessian criterion, apply the one-dimensional fact ($g'' \ge 0$ iff $g$ convex) to $g(t) = f(\mathbf{x} + t\mathbf{u})$, whose second derivative is $\mathbf{u}^\top\nabla^2f\,\mathbf{u}$.
:::

Convex problems have no spurious local minima, and a stationary point found by any method is the answer. Linear and logistic regression, softmax regression with a fixed feature map and the cross-entropy loss as a function of the logits are all convex. Neural networks are not: permuting the hidden units of a layer gives a different parameter vector with exactly the same loss, so any minimiser has many copies, and the average of two copies — a point on the chord between them — is usually a much worse network. Convex theory is therefore a guide to *local* behaviour and to the effect of hyperparameters, not a guarantee about training a network.

::: example Convex or not? {#ex-convex}
Decide whether these are convex: (a) $f(\mathbf{x}) = \lVert A\mathbf{x} - \mathbf{b}\rVert^2$; (b) the cross-entropy $-\log\operatorname{softmax}(\mathbf{z})_y$ as a function of $\mathbf{z}$; (c) the loss $(w_2w_1 - 1)^2$ of a two-layer linear "network" with scalar weights.
::: solution
(a) Hessian $2A^\top A$, positive semidefinite ([[math-for-ml/matrix-decompositions#prop-psd]]): convex. (b) $-z_y + \log\sum_ke^{z_k}$ is linear plus log-sum-exp, whose Hessian $\diag(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$ is PSD: convex. (c) At $(w_1, w_2) = (0, 0)$ the gradient is zero and the Hessian is $\begin{pmatrix}0&-2\\-2&0\end{pmatrix}$, with eigenvalues $\pm2$: a saddle, so the function is not convex. Its minimisers form the hyperbola $w_1w_2 = 1$, and the midpoint of the minimisers $(1, 1)$ and $(-1, -1)$ is the saddle $(0, 0)$ with loss $1$ — the symmetry argument above in miniature.
:::
:::

## Smoothness and the descent lemma {#sec-smooth}

::: definition $L$-smooth function {#def-smooth}
A differentiable $f$ is **$L$-smooth** if its gradient is $L$-Lipschitz: $\lVert\nabla f(\mathbf{x}) - \nabla f(\mathbf{y})\rVert\le L\lVert\mathbf{x} - \mathbf{y}\rVert$ for all $\mathbf{x}, \mathbf{y}$. For twice-differentiable $f$ this holds if and only if every eigenvalue of the Hessian lies in $[-L, L]$ everywhere.
:::

$L$ bounds the curvature: how fast the gradient can change as we move. It turns the linear approximation into an upper bound.

::: lemma Descent lemma {#lem-descent}
If $f$ is $L$-smooth, then for all $\mathbf{x}, \mathbf{y}$,

$$
f(\mathbf{y})\le f(\mathbf{x}) + \nabla f(\mathbf{x})\cdot(\mathbf{y} - \mathbf{x}) + \frac L2\lVert\mathbf{y} - \mathbf{x}\rVert^2.
$$ {#eq-descent}

In particular one gradient step with $\eta = 1/L$ decreases $f$ by at least $\frac1{2L}\lVert\nabla f(\mathbf{x})\rVert^2$.
:::

::: proof
Let $\mathbf{h} = \mathbf{y} - \mathbf{x}$ and $g(t) = f(\mathbf{x} + t\mathbf{h})$, so $g'(t) = \nabla f(\mathbf{x} + t\mathbf{h})\cdot\mathbf{h}$. Then

$$
f(\mathbf{y}) - f(\mathbf{x}) - \nabla f(\mathbf{x})\cdot\mathbf{h} = \int_0^1\big(\nabla f(\mathbf{x} + t\mathbf{h}) - \nabla f(\mathbf{x})\big)\cdot\mathbf{h}\,dt\le\int_0^1Lt\lVert\mathbf{h}\rVert^2\,dt = \frac L2\lVert\mathbf{h}\rVert^2,
$$

using Cauchy–Schwarz and the Lipschitz bound inside the integral. For the step, put $\mathbf{y} = \mathbf{x} - \frac1L\nabla f(\mathbf{x})$: the right side of [[#eq-descent]] becomes $f(\mathbf{x}) - \frac1L\lVert\nabla f\rVert^2 + \frac1{2L}\lVert\nabla f\rVert^2 = f(\mathbf{x}) - \frac1{2L}\lVert\nabla f\rVert^2$.
:::

More generally, a step of size $\eta$ changes $f$ by at most $-\eta(1 - \frac{L\eta}2)\lVert\nabla f\rVert^2$, which is a guaranteed decrease for every $\eta < 2/L$ and is most negative at $\eta = 1/L$. Two convergence theorems follow in a few lines.

::: theorem Gradient descent on a smooth function {#thm-gd-nonconvex}
Let $f$ be $L$-smooth and bounded below by $f_{\inf}$, and run gradient descent with $\eta = 1/L$. Then $f(\theta_k)$ is non-increasing, and after $K$ steps

$$
\min_{0\le k<K}\lVert\nabla f(\theta_k)\rVert^2\le\frac{2L\big(f(\theta_0) - f_{\inf}\big)}{K}.
$$
:::

::: proof
By [[#lem-descent]], $f(\theta_{k+1})\le f(\theta_k) - \frac1{2L}\lVert\nabla f(\theta_k)\rVert^2$ for each $k$, so the values decrease. Summing over $k = 0, \dots, K - 1$, the left sides telescope:

$$
\frac1{2L}\sum_{k=0}^{K-1}\lVert\nabla f(\theta_k)\rVert^2\le f(\theta_0) - f(\theta_K)\le f(\theta_0) - f_{\inf}.
$$

The minimum of $K$ numbers is at most their average, which gives the bound.
:::

This is the only guarantee that holds without convexity, and it is weak: it promises an approximately **stationary** point, not a minimum, at the slow rate $1/K$ for the squared gradient norm. It does not exclude saddle points, though for generic starting points gradient descent almost surely does not converge to a strict saddle (Lee et al., 2016). With convexity we get a guarantee on the function value itself.

::: theorem Gradient descent on a smooth convex function {#thm-gd-convex}
Let $f$ be convex and $L$-smooth with a minimiser $\theta^*$, and run gradient descent with $\eta = 1/L$. Then

$$
f(\theta_K) - f(\theta^*)\le\frac{L\lVert\theta_0 - \theta^*\rVert^2}{2K}.
$$
:::

::: proof
Write $\mathbf{g}_k = \nabla f(\theta_k)$. By [[#lem-descent]] and then [[#eq-tangent]] with $\mathbf{y} = \theta^*$,

$$
f(\theta_{k+1})\le f(\theta_k) - \frac1{2L}\lVert\mathbf{g}_k\rVert^2\le f(\theta^*) + \mathbf{g}_k\cdot(\theta_k - \theta^*) - \frac1{2L}\lVert\mathbf{g}_k\rVert^2.
$$

Completing the square, $\mathbf{g}_k\cdot(\theta_k - \theta^*) - \frac1{2L}\lVert\mathbf{g}_k\rVert^2 = \frac L2\big(\lVert\theta_k - \theta^*\rVert^2 - \lVert\theta_k - \theta^* - \tfrac1L\mathbf{g}_k\rVert^2\big)$, and $\theta_k - \frac1L\mathbf{g}_k = \theta_{k+1}$. Hence

$$
f(\theta_{k+1}) - f(\theta^*)\le\frac L2\big(\lVert\theta_k - \theta^*\rVert^2 - \lVert\theta_{k+1} - \theta^*\rVert^2\big).
$$

Summing over $k = 0, \dots, K - 1$ telescopes the right side to at most $\frac L2\lVert\theta_0 - \theta^*\rVert^2$. Since $f(\theta_k)$ is non-increasing, $K\big(f(\theta_K) - f(\theta^*)\big)\le\sum_{k=1}^K\big(f(\theta_k) - f(\theta^*)\big)$, and dividing by $K$ gives the result.
:::

If $f$ is in addition $\mu$-strongly convex, the convergence becomes **linear** (geometric): $\lVert\theta_k - \theta^*\rVert^2\le(1 - \mu/L)^k\lVert\theta_0 - \theta^*\rVert^2$ with $\eta = 1/L$. The ratio $\kappa = L/\mu$ is the **condition number** of the problem, and the number of steps to reach a given accuracy grows in proportion to it. A quadratic shows all of this exactly.

## The quadratic model {#sec-quadratic}

Near a minimum, any smooth loss looks like a quadratic, $f(\theta)\approx f(\theta^*) + \frac12(\theta - \theta^*)^\top H(\theta - \theta^*)$ with $H$ the Hessian at the minimum. So the behaviour of gradient descent on $f(\theta) = \frac12\theta^\top A\theta$, with $A$ symmetric positive definite, is the local behaviour of gradient descent everywhere.

::: proposition Gradient descent on a quadratic {#prop-quadratic}
Let $f(\theta) = \frac12\theta^\top A\theta$ where $A$ has eigenvalues $0 < \mu = \lambda_d\le\dots\le\lambda_1 = L$. Gradient descent with step $\eta$ gives $\theta_k = (I - \eta A)^k\theta_0$, and the component of $\theta_k$ along the eigenvector $\mathbf{q}_i$ is multiplied by $1 - \eta\lambda_i$ at each step. Hence

1. the iteration converges for every $\theta_0$ if and only if $0 < \eta < 2/L$;
2. the error contracts by the factor $\rho(\eta) = \max_i\lvert1 - \eta\lambda_i\rvert$ per step;
3. the best fixed step is $\eta^* = 2/(L + \mu)$, with $\rho(\eta^*) = (\kappa - 1)/(\kappa + 1)$, $\kappa = L/\mu$.
:::

::: proof
$\nabla f = A\theta$, so $\theta_{k+1} = (I - \eta A)\theta_k$. In the eigenbasis of [[math-for-ml/matrix-decompositions#thm-spectral]], $I - \eta A = Q\diag(1 - \eta\lambda_i)Q^\top$, so coordinate $i$ is multiplied by $1 - \eta\lambda_i$ per step. Every coordinate shrinks if and only if $\lvert1 - \eta\lambda_i\rvert < 1$ for all $i$, i.e. $0 < \eta\lambda_i < 2$, and the binding constraint is the largest eigenvalue $L$. The worst factor is $\max(\lvert1 - \eta\mu\rvert, \lvert1 - \eta L\rvert)$, since $\lvert1 - \eta\lambda\rvert$ is largest at an end of the range; it is minimised when the two are equal, $1 - \eta\mu = \eta L - 1$, giving $\eta^* = 2/(L + \mu)$ and $\rho = (L - \mu)/(L + \mu)$.
:::

::: example Learning rates on an elongated bowl {#ex-quadratic}
For $f(x, y) = \frac12(x^2 + 10y^2)$, starting at $(1, 1)$, predict the behaviour of gradient descent with $\eta = 0.1$, $\eta = 2/11$, $\eta = 0.19$ and $\eta = 0.21$, and check by running $30$ steps.
::: solution
The eigenvalues are $\mu = 1$ and $L = 10$, $\kappa = 10$, and the step limit is $2/L = 0.2$. The per-step factors $(1 - \eta, 1 - 10\eta)$ are: $\eta = 0.1$: $(0.9, 0)$ — $y$ is solved in one step, $x$ shrinks slowly; $\eta = 2/11$: $(0.818, -0.818)$ — the best balance; $\eta = 0.19$: $(0.81, -0.9)$ — $y$ oscillates from side to side; $\eta = 0.21$: $(0.79, -1.1)$ — $y$ oscillates with growing amplitude and the iteration diverges. After $30$ steps the distances to the minimum should be about $0.9^{30} = 0.042$, $\sqrt2(9/11)^{30} = 0.0034$, $0.9^{30} = 0.042$ and $1.1^{30} = 17.4$:

```python
import math

def grad(x, y):                 # f(x, y) = (x^2 + 10 y^2) / 2, so L = 10, mu = 1
    return x, 10 * y

def run(eta, beta=0.0, steps=30):
    x, y = 1.0, 1.0             # start
    vx, vy = 0.0, 0.0           # momentum buffer (heavy ball)
    for _ in range(steps):
        gx, gy = grad(x, y)
        vx, vy = beta * vx - eta * gx, beta * vy - eta * gy
        x, y = x + vx, y + vy
    return math.hypot(x, y)     # distance to the minimiser (0, 0)

for eta in (0.1, 2 / 11, 0.19, 0.21):
    print(f"GD        eta={eta:.4f}  distance after 30 steps: {run(eta):.3e}")
k = 10.0
beta = ((math.sqrt(k) - 1) / (math.sqrt(k) + 1)) ** 2
eta = 4 / (1 + math.sqrt(k)) ** 2       # optimal heavy-ball parameters for mu = 1, L = 10
print(f"momentum  eta={eta:.4f} beta={beta:.4f}  distance after 30 steps: {run(eta, beta):.3e}")
```

```text
GD        eta=0.1000  distance after 30 steps: 4.239e-02
GD        eta=0.1818  distance after 30 steps: 3.436e-03
GD        eta=0.1900  distance after 30 steps: 4.243e-02
GD        eta=0.2100  distance after 30 steps: 1.745e+01
momentum  eta=0.2309 beta=0.2699  distance after 30 steps: 1.440e-07
```

The last line anticipates [[#sec-momentum]]: with well-chosen momentum the same $30$ steps get four orders of magnitude closer.
:::
:::

::: widget gradientdescent
f: 0.5*(x^2 + 10*y^2)
start: 1, 1
rate: 0.19
steps: 30
x: -1.5, 1.5
y: -1.5, 1.5
caption: Gradient descent on $\frac12(x^2 + 10y^2)$ from $(1, 1)$ with $\eta = 0.19$, just below the limit $2/L = 0.2$: the iterates bounce across the narrow direction while creeping along the wide one. Move the learning rate above $0.2$ and they fly off; lower it to $0.1$ and the bouncing stops but progress along $x$ is slow. Switch the method to momentum and compare.
:::

The quadratic explains the most important practical fact about training: **the learning rate is limited by the sharpest direction of the loss, while progress is limited by the flattest.** For a network, $L$ is the largest eigenvalue of the Hessian (the "sharpness"), and an empirical finding of Cohen et al. (2021) is that full-batch training of neural networks tends to drive the sharpness up until it hovers around $2/\eta$ — the "edge of stability" — rather than staying safely below it, with the loss decreasing non-monotonically in the long run. Real training dynamics are richer than the quadratic picture, but the threshold $2/L$ is visibly at work.

::: warning What the theorems do not say
[[#thm-gd-nonconvex]] and [[#thm-gd-convex]] assume a fixed, known smoothness constant, exact gradients and, for the second, convexity. Training a language model has none of these: the loss is non-convex, the curvature changes during training, gradients are stochastic, and the loss can spike when an update enters a region of high curvature. The theory explains the *shape* of good practice — learning rates below a curvature threshold, warm-up while curvature is high and uncertain, decay at the end to reduce noise — but the actual values come from experiment. And reaching a low training loss is not the goal in itself: generalisation to new data is a separate question.
:::

## Stochastic gradients {#sec-sgd}

Computing the full gradient of $f(\theta) = \frac1N\sum_n\ell(\theta; x_n)$ costs a pass over all $N$ examples, which for a pretraining corpus of $10^{12}$ tokens is out of the question at every step. Instead, each step uses a random **mini-batch** $\mathcal{B}$ of $B$ examples.

::: definition Stochastic gradient descent {#def-sgd}
**Stochastic gradient descent** (SGD) updates

$$
\theta_{k+1} = \theta_k - \eta_k\,\mathbf{g}_k,\qquad\mathbf{g}_k = \frac1B\sum_{n\in\mathcal{B}_k}\nabla\ell(\theta_k; x_n),
$$

where the mini-batch $\mathcal{B}_k$ is drawn at random and $\eta_k$ is the learning rate at step $k$.
:::

If the batch is drawn uniformly, $\mathbf{g}_k$ is an **unbiased** estimate of $\nabla f(\theta_k)$: $\E[\mathbf{g}_k] = \nabla f(\theta_k)$. Its covariance is the per-example gradient covariance divided by $B$ (for sampling with replacement; [[math-for-ml/probability#prop-linearity]]), so doubling the batch halves the gradient noise's variance at twice the cost per step. The noise changes the convergence picture in one essential way: with a constant learning rate SGD does not converge to the minimiser but keeps fluctuating in a region whose size is proportional to $\eta$ times the noise (exercise 9). Robbins and Monro (1951) showed that step sizes with

$$
\sum_k\eta_k = \infty\qquad\text{and}\qquad\sum_k\eta_k^2 < \infty,
$$

such as $\eta_k\propto1/k$, give convergence despite the noise: the first condition lets the iterates travel any distance, the second makes the accumulated noise finite. Modern training uses schedules in the same spirit — a large learning rate for most of training, decayed towards zero at the end (for example cosine decay) — usually preceded by a short **warm-up** in which the learning rate rises linearly from zero.

::: example Signal and noise in a mini-batch gradient {#ex-batch-noise}
For one parameter, the per-example gradients have mean $0.1$ and standard deviation $2$ — typical of a parameter whose average gradient is small compared with its example-to-example variation. Find the standard deviation of the mini-batch gradient and its signal-to-noise ratio (mean divided by standard deviation) for batch sizes $B = 32$ and $B = 1024$, and the batch size at which the ratio reaches $1$.
::: solution
The mini-batch mean has standard deviation $2/\sqrt B$: $2/\sqrt{32} = 0.354$ for $B = 32$, and $2/\sqrt{1024} = 0.0625$ for $B = 1024$. The signal-to-noise ratios are $0.1/0.354 = 0.28$ and $0.1/0.0625 = 1.6$. At $B = 32$ the sign of a single step's gradient is wrong with substantial probability (about $39\%$ if the noise is roughly normal), and progress comes from averaging over many steps; at $B = 1024$ most steps point the right way. The ratio is $1$ when $\sqrt B = 2/0.1 = 20$, that is $B = 400$. Beyond that point larger batches mainly buy accuracy the optimiser does not need, which is the intuition behind a critical batch size.
:::
:::

Gradient noise is not only a nuisance. It lets SGD escape saddle points and sharp regions, and the ratio of learning rate to batch size acts like a temperature of this noise; empirically, up to a "critical batch size" that depends on the problem, increasing the batch and the learning rate together gives nearly the same result in fewer steps (McCandlish et al., 2018). These are empirical regularities of training, not theorems.

## Momentum and Adam {#sec-momentum}

On an ill-conditioned problem plain gradient descent zig-zags across the narrow directions and crawls along the flat ones. **Momentum** accumulates a running average of past gradients, so oscillating components cancel and consistent components add up.

::: definition Heavy-ball momentum {#def-momentum}
With momentum coefficient $\beta\in[0, 1)$ and velocity $\mathbf{v}_0 = \mathbf{0}$, **Polyak's heavy-ball method** updates

$$
\mathbf{v}_{k+1} = \beta\mathbf{v}_k - \eta\,\mathbf{g}_k,\qquad\theta_{k+1} = \theta_k + \mathbf{v}_{k+1}.
$$
:::

With a constant gradient $\mathbf{g}$ the velocity approaches $-\eta\mathbf{g}/(1 - \beta)$, an effective learning rate ten times larger at the usual $\beta = 0.9$, while gradients that flip sign from step to step largely cancel. On a strongly convex quadratic, with $\eta = 4/(\sqrt L + \sqrt\mu)^2$ and $\beta = \big((\sqrt\kappa - 1)/(\sqrt\kappa + 1)\big)^2$, the error contracts asymptotically by the factor $(\sqrt\kappa - 1)/(\sqrt\kappa + 1)$ per step instead of $(\kappa - 1)/(\kappa + 1)$: the dependence on the condition number improves from $\kappa$ to $\sqrt\kappa$ (Polyak, 1964). Nesterov's accelerated gradient (1983) achieves the $\sqrt\kappa$ rate with a guarantee for all smooth strongly convex functions, not just quadratics.

The optimiser used to train almost every current language model goes further and gives each parameter its own step size.

::: algorithm Adam and AdamW {#alg-adam}
Hyperparameters: learning rate $\eta$, decay rates $\beta_1, \beta_2\in[0, 1)$, a small $\epsilon > 0$, weight decay $\lambda\ge0$. Initialise $\mathbf{m}_0 = \mathbf{v}_0 = \mathbf{0}$. At step $t = 1, 2, \dots$, with stochastic gradient $\mathbf{g}_t$ and all operations elementwise:

1. $\mathbf{m}_t = \beta_1\mathbf{m}_{t-1} + (1 - \beta_1)\mathbf{g}_t$ (first moment, a running mean of gradients);
2. $\mathbf{v}_t = \beta_2\mathbf{v}_{t-1} + (1 - \beta_2)\mathbf{g}_t^2$ (second moment, a running mean of squared gradients);
3. $\hat{\mathbf{m}}_t = \mathbf{m}_t/(1 - \beta_1^t)$ and $\hat{\mathbf{v}}_t = \mathbf{v}_t/(1 - \beta_2^t)$ (bias correction);
4. $\theta_t = \theta_{t-1} - \eta\Big(\dfrac{\hat{\mathbf{m}}_t}{\sqrt{\hat{\mathbf{v}}_t} + \epsilon} + \lambda\theta_{t-1}\Big)$.

With $\lambda = 0$ this is **Adam** (Kingma and Ba, 2015). With $\lambda > 0$ applied as in step 4, outside the adaptive scaling, it is **AdamW** (Loshchilov and Hutter, 2019). The defaults in the Adam paper are $\beta_1 = 0.9$, $\beta_2 = 0.999$, $\epsilon = 10^{-8}$; many published language-model recipes use $\beta_2 = 0.95$.
:::

Each step moves each parameter by roughly $\eta$ times the ratio of its average gradient to its root-mean-square gradient — a number of size at most about $1$, whatever the scale of the gradient. Parameters whose gradients are consistently small take steps as large as those with large gradients, which matters in a Transformer, where embeddings, attention projections and normalisation gains receive gradients of very different sizes. The bias correction compensates for initialising the averages at zero: without it, early averages would be too small by the factors $1 - \beta_1^t$ and $1 - \beta_2^t$. The decoupled weight decay of AdamW shrinks every weight by the same fraction $\eta\lambda$ per step; adding $\lambda\lVert\theta\rVert^2$ to the loss instead would pass the penalty's gradient through the adaptive scaling and decay parameters with large gradient histories less, which is not the MAP prior of [[math-for-ml/estimation#prop-weight-decay]] and was found to regularise worse.

::: example The first Adam step, and Adam's memory {#ex-adam}
(a) Show that Adam's first update is $-\eta\,\mathbf{g}_1/(\lvert\mathbf{g}_1\rvert + \epsilon)\approx-\eta\operatorname{sign}(\mathbf{g}_1)$, and find the size of the first step without bias correction for $\beta_1 = 0.9$ and $\beta_2 = 0.999$. (b) How much memory do Adam's two moment buffers need for a model with $7\times10^9$ parameters, stored in 32-bit floats?
::: solution
(a) $\mathbf{m}_1 = (1 - \beta_1)\mathbf{g}_1$ and $\mathbf{v}_1 = (1 - \beta_2)\mathbf{g}_1^2$, so $\hat{\mathbf{m}}_1 = \mathbf{g}_1$ and $\hat{\mathbf{v}}_1 = \mathbf{g}_1^2$, and the update is $-\eta\,\mathbf{g}_1/(\lvert\mathbf{g}_1\rvert + \epsilon)$: a step of size $\eta$ in every coordinate with a nonzero gradient. Without correction it would be $-\eta(1 - \beta_1)\mathbf{g}_1/(\sqrt{1 - \beta_2}\lvert\mathbf{g}_1\rvert) = -\eta\cdot0.1/0.0316\cdot\operatorname{sign}(\mathbf{g}_1)$, that is $3.16$ times too large — at the very start of training, when large steps do most damage.

(b) Two buffers of $7\times10^9$ numbers at $4$ bytes each: $2\cdot4\cdot7\times10^9 = 5.6\times10^{10}$ bytes $= 56$ GB, four times the $14$ GB of the weights themselves in 16-bit precision. Optimiser state is a major part of the memory of training, which is what methods that shard it across devices, or store it in fewer bits, address.
:::
:::

::: quiz
On $f(x, y) = \frac12(x^2 + 10y^2)$ starting from $(1, 1)$, Adam with $\eta = 0.1$ produces iterates with $x_t = y_t$ at every step. Why?
- [ ] Because Adam computes the exact Newton step
- [x] Because Adam divides each coordinate's gradient by a running estimate of its own scale, so a constant rescaling of one coordinate's gradients has no effect
- [ ] Because momentum averages the two coordinates
- [ ] Because the bias correction makes all coordinates equal
::: solution
Here $g_y = 10y$ and $g_x = x$; if $x = y$ then $g_y$ is exactly $10g_x$ at every step, and $m_y/\sqrt{v_y} = 10m_x/\sqrt{100v_x} = m_x/\sqrt{v_x}$ (ignoring $\epsilon$). So both coordinates receive identical updates and stay equal. Adam is invariant to rescaling individual coordinates, which is why it handles a diagonal ill-conditioning that slows gradient descent; it is not invariant to rotations, so ill-conditioning along non-axis directions still hurts it. Running Adam on this problem gives $(0.9, 0.9)$ after one step and $(0.0762, 0.0762)$ after ten (exercise 10).
:::
:::

## Constrained optimisation {#sec-constrained}

Sometimes the variables must satisfy constraints: probabilities must sum to one, a norm must stay bounded. For an equality constraint the classical tool is the **Lagrange multiplier**: at a minimiser $\mathbf{x}^*$ of $f$ subject to $h(\mathbf{x}) = 0$, if $\nabla h(\mathbf{x}^*)\ne\mathbf{0}$, there is a number $\lambda$ with

$$
\nabla f(\mathbf{x}^*) = \lambda\nabla h(\mathbf{x}^*):
$$ {#eq-lagrange}

the gradient of the objective is perpendicular to the constraint surface, so no allowed direction decreases $f$ to first order. With inequality constraints this generalises to the Karush–Kuhn–Tucker conditions, and the theory of duality (Boyd and Vandenberghe, chapter 5). In deep learning constraints are usually handled more simply — by a parametrisation that satisfies them automatically (a softmax produces probabilities; an exponential produces a positive number), by projection after each step, or by a penalty. One constrained problem deserves a full solution, because its answer is the softmax itself.

::: proposition The softmax maximises entropy-regularised score {#prop-softmax-variational}
For scores $\mathbf{z}\in\R^K$ and a temperature $\tau > 0$, among all distributions $\mathbf{p}$ on $K$ outcomes,

$$
\max_{\mathbf{p}\in\Delta^{K-1}}\Big[\sum_ip_iz_i + \tau H(\mathbf{p})\Big] = \tau\log\sum_ie^{z_i/\tau},
$$

and the maximum is attained uniquely at $\mathbf{p} = \operatorname{softmax}(\mathbf{z}/\tau)$.
:::

::: proof
Let $\mathbf{s} = \operatorname{softmax}(\mathbf{z}/\tau)$, so $z_i = \tau\log s_i + \tau\log Z$ with $Z = \sum_ie^{z_i/\tau}$. Then for any $\mathbf{p}$,

$$
\sum_ip_iz_i + \tau H(\mathbf{p}) = \tau\sum_ip_i\log s_i + \tau\log Z - \tau\sum_ip_i\log p_i = \tau\log Z - \tau\operatorname{KL}(\mathbf{p}\,\Vert\,\mathbf{s}).
$$

By Gibbs' inequality ([[math-for-ml/information-theory#thm-gibbs]]) the divergence is $\ge0$, with equality only at $\mathbf{p} = \mathbf{s}$.
:::

::: widget contour
f: x^2 + y^2
x: -3, 3
y: -3, 3
constraint: x + 2y - 3
point: 1, 1
caption: Minimising $x^2 + y^2$ on the line $x + 2y = 3$. At the constrained minimum $(0.6, 1.2)$ the level circle touches the line, and the gradient of the objective is parallel to the normal $(1, 2)$ of the constraint, as [[#eq-lagrange]] requires; at any other point of the line the gradient has a component along the line, and moving along it lowers the objective.
:::

The softmax is thus the distribution that scores best while staying as uncertain as possible, with the temperature setting the exchange rate between score and entropy: $\tau\to0$ gives the hard argmax, $\tau\to\infty$ the uniform distribution. The same calculation, with a reference distribution in place of the entropy, gives the optimal policy $\pi^*(y)\propto\pi_{\text{ref}}(y)\,e^{r(y)/\beta}$ of the KL-regularised reward objective, on which the direct preference optimisation of [[post-training]] is built.

::: history
Augustin-Louis Cauchy proposed the method of steepest descent in 1847 for solving systems of equations arising in astronomy. Joseph-Louis Lagrange introduced his multipliers in the *Mécanique analytique* (1788); William Karush (1939) and Harold Kuhn and Albert Tucker (1951) extended them to inequality constraints. Herbert Robbins and Sutton Monro (1951) founded stochastic approximation, and Jack Kiefer and Jacob Wolfowitz (1952) adapted it to minimisation. Boris Polyak introduced the heavy-ball method in 1964, and Yurii Nesterov's accelerated gradient method (1983) attained the optimal rate for smooth convex problems. Adaptive per-coordinate methods followed for large-scale learning: AdaGrad (Duchi, Hazan and Singer, 2011), RMSProp (presented by Geoffrey Hinton in a 2012 lecture course), and Adam (Kingma and Ba, published at ICLR 2015), whose decoupled-weight-decay variant AdamW (Loshchilov and Hutter, 2019) became the standard optimiser for Transformers.
:::

::: summary
- Training minimises a non-convex loss; convexity makes every stationary point a global minimum, and the tangent-plane inequality [[#eq-tangent]] characterises it. Neural networks are not convex, but convex theory describes their local behaviour.
- For an $L$-smooth function the descent lemma bounds $f$ by a quadratic, so steps with $\eta < 2/L$ decrease $f$. With $\eta = 1/L$, gradient descent finds an approximately stationary point at rate $\min\lVert\nabla f\rVert^2\le2L(f(\theta_0) - f_{\inf})/K$, and on convex functions $f(\theta_K) - f^*\le L\lVert\theta_0 - \theta^*\rVert^2/2K$.
- On a quadratic each eigen-direction shrinks by $\lvert1 - \eta\lambda_i\rvert$: the sharpest direction limits the learning rate, the flattest limits progress, and the rate is $(\kappa - 1)/(\kappa + 1)$ at best.
- SGD uses unbiased mini-batch gradients whose variance falls like $1/B$; with constant steps it hovers near a minimum, so learning rates are decayed.
- Momentum averages gradients and improves the dependence on $\kappa$ to $\sqrt\kappa$; Adam scales each coordinate by its RMS gradient, with bias correction, and AdamW decouples weight decay. Adam keeps two extra numbers per parameter, a large part of the memory of training.
- Lagrange multipliers handle constraints; the softmax is the solution of an entropy-regularised maximisation over the simplex.
:::

## Exercises

::: exercise A stability threshold {level=1 check="2/400"}
The largest eigenvalue of the Hessian of a loss near a minimum is $400$. Above which learning rate does gradient descent become unstable there?
::: solution
By [[#prop-quadratic]] the iteration diverges along the sharpest direction once $\eta > 2/L = 2/400 = 0.005$.
:::
:::

::: exercise Three steps by hand {level=1 check="0.375"}
Run gradient descent on $f(x) = x^2$ from $x_0 = 3$ with $\eta = 0.25$. What is $x_3$?
::: solution
$f'(x) = 2x$, so $x_{k+1} = x_k - 0.5x_k = 0.5x_k$. Then $x_1 = 1.5$, $x_2 = 0.75$ and $x_3 = 0.375$. Here $L = 2$ and the factor $1 - \eta L = 0.5$; at $\eta = 0.5$ the method would jump to $0$ in one step, and at $\eta = 1$ it would oscillate between $3$ and $-3$ for ever.
:::
:::

::: exercise Optimiser memory {level=1 check="104"}
How many gigabytes ($10^9$ bytes) do Adam's first- and second-moment buffers take for a model with $13\times10^9$ parameters in 32-bit precision?
::: solution
$2\cdot4\cdot13\times10^9 = 1.04\times10^{11}$ bytes $= 104$ GB.
:::
:::

::: exercise Is it convex? {level=2 check="-1"}
Is $f(x, y) = x^2 + 3xy + y^2$ convex? Give the smallest eigenvalue of its Hessian.
::: solution
The Hessian is $\begin{pmatrix}2&3\\3&2\end{pmatrix}$, with eigenvalues $2\pm3$, that is $5$ and $-1$. It is not positive semidefinite, so $f$ is not convex: along $(1, -1)$, $f(t, -t) = -t^2$ decreases without bound. The origin is a saddle point. The smallest eigenvalue is $-1$.
:::
:::

::: exercise How many steps? {level=2 check="8000"}
A loss is $4$-smooth, its starting value exceeds its infimum by $10$, and gradient descent uses $\eta = 1/4$. How many steps does [[#thm-gd-nonconvex]] require to guarantee that some iterate has $\lVert\nabla f\rVert^2\le0.01$?
::: solution
We need $2L(f(\theta_0) - f_{\inf})/K\le0.01$, i.e. $K\ge2\cdot4\cdot10/0.01 = 8000$.
:::
:::

::: exercise The price of ill-conditioning {level=2 check="346"}
A quadratic has condition number $\kappa = 100$. With the best fixed step, how many gradient-descent steps reduce the error by a factor of $1000$? How many does heavy-ball momentum need, using its asymptotic rate $(\sqrt\kappa - 1)/(\sqrt\kappa + 1)$?
::: solution
Gradient descent contracts by $99/101$ per step: $k\ge\ln10^{-3}/\ln(99/101) = 345.4$, so $346$ steps. Momentum contracts by $9/11$: $k\ge\ln10^{-3}/\ln(9/11) = 34.4$, about $35$ steps — ten times fewer, the factor $\sqrt\kappa$.
:::
:::

::: exercise Momentum as an effective learning rate {level=2 check="10"}
With heavy-ball momentum ([[#def-momentum]]) and a constant gradient $\mathbf{g}$, show that $\mathbf{v}_k\to-\eta\mathbf{g}/(1 - \beta)$. By what factor is the step multiplied for $\beta = 0.9$?
::: solution
$\mathbf{v}_k = \beta\mathbf{v}_{k-1} - \eta\mathbf{g}$ with $\mathbf{v}_0 = \mathbf{0}$ gives $\mathbf{v}_k = -\eta\mathbf{g}(1 + \beta + \dots + \beta^{k-1}) = -\eta\mathbf{g}(1 - \beta^k)/(1 - \beta)\to-\eta\mathbf{g}/(1 - \beta)$. For $\beta = 0.9$ the factor is $1/(1 - 0.9) = 10$. This is why changing $\beta$ without adjusting $\eta$ changes the effective learning rate.
:::
:::

::: exercise A constrained minimum {level=2 check="1"}
Use [[#eq-lagrange]] to minimise $\lVert\mathbf{x}\rVert^2$ subject to $\mathbf{a}^\top\mathbf{x} = b$, and evaluate the minimum value for $\mathbf{a} = (1, 2, 2)$, $b = 3$.
::: solution
With $h(\mathbf{x}) = \mathbf{a}^\top\mathbf{x} - b$, the condition is $2\mathbf{x} = \lambda\mathbf{a}$, so $\mathbf{x} = \frac\lambda2\mathbf{a}$; the constraint gives $\frac\lambda2\lVert\mathbf{a}\rVert^2 = b$, so $\mathbf{x}^* = b\,\mathbf{a}/\lVert\mathbf{a}\rVert^2$ and the minimum is $b^2/\lVert\mathbf{a}\rVert^2$. For the given values $\lVert\mathbf{a}\rVert^2 = 9$, $\mathbf{x}^* = (1/3, 2/3, 2/3)$ and the minimum is $9/9 = 1$. Geometrically, $\mathbf{x}^*$ is the point of the plane $\mathbf{a}^\top\mathbf{x} = b$ closest to the origin, along the normal $\mathbf{a}$.
:::
:::

::: exercise The noise ball of SGD {level=3 check="0.1/1.9"}
Minimise $f(x) = \frac a2x^2$ with noisy gradients $g_k = ax_k + \xi_k$, where the $\xi_k$ are independent with mean $0$ and variance $\sigma^2$, using a constant step $\eta$ with $0 < \eta a < 2$. Show that $\E x_k\to0$ and that $\Var x_k$ converges to $\eta\sigma^2/\big(a(2 - \eta a)\big)$. Evaluate the limit for $a = 1$, $\eta = 0.1$, $\sigma^2 = 1$.
::: solution
$x_{k+1} = (1 - \eta a)x_k - \eta\xi_k$. Taking expectations, $\E x_{k+1} = (1 - \eta a)\E x_k\to0$ since $\lvert1 - \eta a\rvert < 1$. Since $\xi_k$ is independent of $x_k$, $\Var x_{k+1} = (1 - \eta a)^2\Var x_k + \eta^2\sigma^2$, a linear recursion that converges to the fixed point $V = \eta^2\sigma^2/\big(1 - (1 - \eta a)^2\big) = \eta^2\sigma^2/\big(\eta a(2 - \eta a)\big) = \eta\sigma^2/\big(a(2 - \eta a)\big)$. For the given values $V = 0.1/1.9 = 0.0526$. For small $\eta$ the stationary variance is about $\eta\sigma^2/2a$: proportional to the learning rate, which is why decaying the learning rate at the end of training lowers the loss.
:::
:::

::: exercise Adam in plain Python {level=3}
Implement [[#alg-adam]] (with $\lambda = 0$) in plain Python and run it with $\eta = 0.1$ for $100$ steps on $f(x, y) = \frac12(x^2 + 10y^2)$ from $(1, 1)$, printing the iterate at steps $1$, $2$, $10$ and $100$. Compare with gradient descent at its best fixed step, and explain the result.
::: solution
```python
import math

def adam(grad, theta, eta=0.1, b1=0.9, b2=0.999, eps=1e-8, steps=100):
    m = [0.0] * len(theta)                     # first moment, same shape as theta
    v = [0.0] * len(theta)                     # second moment
    for t in range(1, steps + 1):
        g = grad(theta)
        m = [b1 * mi + (1 - b1) * gi for mi, gi in zip(m, g)]
        v = [b2 * vi + (1 - b2) * gi * gi for vi, gi in zip(v, g)]
        mhat = [mi / (1 - b1 ** t) for mi in m]           # bias correction
        vhat = [vi / (1 - b2 ** t) for vi in v]
        theta = [th - eta * mh / (math.sqrt(vh) + eps)
                 for th, mh, vh in zip(theta, mhat, vhat)]
        if t in (1, 2, 10, 100):
            print(t, [round(th, 4) for th in theta])
    return theta

grad = lambda th: [th[0], 10 * th[1]]          # f = (x^2 + 10 y^2) / 2
adam(grad, [1.0, 1.0])
```

```text
1 [0.9, 0.9]
2 [0.8004, 0.8004]
10 [0.0762, 0.0762]
100 [0.0029, 0.0029]
```

The first step has size exactly $\eta = 0.1$ in each coordinate, as [[#ex-adam]] predicts, and the two coordinates stay equal throughout (the quick check explains why): Adam does not see the factor $10$ between the curvatures. Gradient descent at $\eta = 2/11$ reaches distance $0.0034$ after $30$ steps ([[#ex-quadratic]]); Adam is at $0.0029$ only after $100$: its normalised steps do not shrink in proportion to the gradient, so with $\beta_1 = 0.9$ it overshoots the minimum (to about $-0.27$ around step $20$) and then oscillates about it with slowly decaying amplitude. Adam's advantage is robustness to badly scaled parameters, not speed on a small, well-understood quadratic; in practice its learning rate is also decayed.
:::
:::
