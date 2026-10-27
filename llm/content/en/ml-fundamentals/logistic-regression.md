Most questions put to a learned model have a finite set of answers: spam or not, which of ten digits, which of fifty thousand tokens comes next. This chapter builds the standard linear model for such questions. Its key move is to predict not a label but a **probability** for each label, by passing a linear score through the logistic function (for two classes) or the softmax function (for many), and to fit it by maximum likelihood, which turns out to mean minimising the **cross-entropy loss**. The result, logistic regression, has a convex loss with a simple gradient — prediction minus target, times input — and that gradient is, line for line, the gradient of the output layer of every neural classifier and every language model.

The chapter uses the least-squares machinery of [[ml-fundamentals/linear-regression]], the cross-entropy and KL divergence of [[math-for-ml/information-theory]], and the softmax gradient of [[math-for-ml/gradients#prop-softmax-ce]], which it does not re-derive. Convexity, and why it makes gradient descent reliable, is in [[math-for-ml/optimisation]].

## From scores to probabilities {#sec-scores}

Take labels $y\in\{0, 1\}$. One could simply run least squares on the $0/1$ labels and predict $1$ when the fitted value exceeds $1/2$. That works tolerably as a classifier, but the fitted values are not probabilities — they run below $0$ and above $1$ — and the squared loss punishes a correct prediction for being *too* confident: a point with label $1$ and score $5$ has squared loss $16$, so a few far-away, easy points can tilt the boundary away from the hard ones. We want a linear **score** $z = \mathbf{w}^\top\mathbf{x} + b$, which can be any real number, mapped monotonically into $(0, 1)$.

::: definition The logistic function {#def-sigmoid}
The **logistic** (or **sigmoid**) function is

$$
\sigma(z) = \frac1{1 + e^{-z}} = \frac{e^z}{1 + e^z}.
$$

It increases from $0$ to $1$, with $\sigma(0) = 1/2$, and satisfies $\sigma(-z) = 1 - \sigma(z)$ and $\sigma'(z) = \sigma(z)(1 - \sigma(z))$. Its inverse is the **logit**, or log-odds, $\sigma^{-1}(p) = \log\dfrac{p}{1 - p}$.
:::

The two identities take one line each: $\sigma(-z) = 1/(1 + e^z) = e^{-z}/(e^{-z} + 1) = 1 - \sigma(z)$, and differentiating $(1 + e^{-z})^{-1}$ gives $e^{-z}/(1 + e^{-z})^2 = \sigma(z)\cdot(1 - \sigma(z))$. Solving $p = 1/(1 + e^{-z})$ for $z$ gives the logit.

::: definition Logistic regression {#def-logistic}
The **logistic regression** model for $y\in\{0, 1\}$ is

$$
\Prob(y = 1\mid\mathbf{x}) = \sigma(\mathbf{w}^\top\mathbf{x} + b),
$$

equivalently, the log-odds of class $1$ are linear in the features: $\log\dfrac{\Prob(y = 1\mid\mathbf{x})}{\Prob(y = 0\mid\mathbf{x})} = \mathbf{w}^\top\mathbf{x} + b$. As a classifier it predicts $1$ when $\Prob(y = 1\mid\mathbf{x}) > 1/2$, that is, when $\mathbf{w}^\top\mathbf{x} + b > 0$: the **decision boundary** is the hyperplane $\mathbf{w}^\top\mathbf{x} + b = 0$.
:::

The weight vector is perpendicular to the decision boundary and points towards class $1$, and the score grows with the distance from it: a point at signed distance $\delta$ from the boundary has score $z = \lVert\mathbf{w}\rVert\delta$. So $\lVert\mathbf{w}\rVert$ sets how quickly the predicted probability goes from $1/2$ to near-certainty as one moves away from the boundary — a sharp or a soft transition.

::: widget plot
f: 1/(1 + exp(-(w*x + b)))
x: -6, 6
y: 0, 1
sliders: w=1:-4:4:0.1; b=0:-5:5:0.1
hlines: 0.5
labels: $\sigma(wx + b)$
caption: The logistic model $\Prob(y = 1\mid x) = \sigma(wx + b)$ for one feature. The curve crosses $1/2$ at the decision boundary $x = -b/w$; $b$ slides it, $\lvert w\rvert$ sets how steep it is, and a negative $w$ reverses it. As $\lvert w\rvert\to\infty$ the curve becomes a step: a hard classifier with no expressed uncertainty.
:::

::: example Reading a logistic model {#ex-odds}
A model of whether an e-mail is spam has intercept $b = -3$ and weights $0.8$ on the number of links and $2.0$ on an indicator that the sender is unknown. Find the spam probability of an e-mail with $2$ links from an unknown sender, and interpret the weight $0.8$.
::: solution
The score is $z = -3 + 0.8\cdot2 + 2.0\cdot1 = 0.6$, so $\Prob(\text{spam}) = \sigma(0.6) = 1/(1 + e^{-0.6}) = 0.646$. The log-odds are linear, so each extra link adds $0.8$ to the log-odds and multiplies the **odds** $p/(1 - p)$ by $e^{0.8} = 2.23$, whatever the other features are. From $0.646$ (odds $1.82$), a third link gives odds $4.06$ and probability $0.802$. The change in *probability* per link is not constant — it is largest near $p = 1/2$ and small near $0$ or $1$ — which is why logistic coefficients are reported as odds ratios.
:::
:::

## Maximum likelihood and the cross-entropy loss {#sec-likelihood}

The model specifies a Bernoulli distribution for each label, so it can be fitted by maximum likelihood ([[math-for-ml/estimation#def-mle]]). Write $p_i = \sigma(z_i)$ with $z_i = \mathbf{w}^\top\mathbf{x}_i + b$; as in linear regression, we absorb $b$ into $\mathbf{w}$ by a constant feature.

::: proposition The logistic loss {#prop-logistic-loss}
The average negative log-likelihood of logistic regression is the **binary cross-entropy**

$$
\mathcal{L}(\mathbf{w}) = -\frac1n\sum_{i=1}^n\Big[y_i\log p_i + (1 - y_i)\log(1 - p_i)\Big].
$$ {#eq-bce}

With labels recoded as $\tilde y_i = 2y_i - 1\in\{-1, +1\}$ it is $\frac1n\sum_i\log\big(1 + e^{-\tilde y_iz_i}\big)$, the logistic loss of the margin $\tilde y_iz_i$ ([[ml-fundamentals/learning-problem#sec-surrogates]]).
:::

::: proof
The Bernoulli probability of $y_i$ is $p_i^{y_i}(1 - p_i)^{1 - y_i}$; its negative log, averaged, is [[#eq-bce]]. For $y_i = 1$ the term is $-\log\sigma(z_i) = \log(1 + e^{-z_i})$, and for $y_i = 0$ it is $-\log(1 - \sigma(z_i)) = -\log\sigma(-z_i) = \log(1 + e^{z_i})$; both are $\log(1 + e^{-\tilde y_iz_i})$.
:::

Equation [[#eq-bce]] is the cross-entropy between the observed label, viewed as a distribution putting all its mass on $y_i$, and the predicted Bernoulli$(p_i)$ — the same quantity that a language model minimises, with two classes instead of a vocabulary. It charges a confident mistake heavily: predicting $p = 0.01$ for a true $1$ costs $-\log0.01 = 4.6$ nats, against $0.69$ for an uncommitted $p = 1/2$.

::: proposition Gradient and Hessian of the logistic loss {#prop-logistic-grad}
$$
\nabla\mathcal{L}(\mathbf{w}) = \frac1n\sum_{i=1}^n(p_i - y_i)\,\mathbf{x}_i = \frac1nX^\top(\mathbf{p} - \mathbf{y}),
\qquad
\nabla^2\mathcal{L}(\mathbf{w}) = \frac1n\sum_{i=1}^np_i(1 - p_i)\,\mathbf{x}_i\mathbf{x}_i^\top = \frac1nX^\top SX,
$$ {#eq-logistic-grad}

where $S = \operatorname{diag}\big(p_i(1 - p_i)\big)$.
:::

::: proof
For one example, $\ell = -y\log\sigma(z) - (1 - y)\log(1 - \sigma(z))$. Using $\sigma' = \sigma(1 - \sigma)$,

$$
\frac{\partial\ell}{\partial z} = -y\frac{\sigma(1 - \sigma)}{\sigma} + (1 - y)\frac{\sigma(1 - \sigma)}{1 - \sigma} = -y(1 - \sigma) + (1 - y)\sigma = \sigma(z) - y.
$$

Since $z = \mathbf{w}^\top\mathbf{x}$, the chain rule gives $\nabla_{\mathbf{w}}\ell = (\sigma(z) - y)\mathbf{x}$, and averaging gives the gradient. Differentiating $(\sigma(\mathbf{w}^\top\mathbf{x}) - y)\mathbf{x}$ once more gives $\sigma'(z)\mathbf{x}\mathbf{x}^\top = p(1 - p)\mathbf{x}\mathbf{x}^\top$.
:::

Compare with least squares, whose gradient is $\frac2nX^\top(X\mathbf{w} - \mathbf{y})$: in both cases it is **(prediction − target) × input**. This is no coincidence — both are generalised linear models fitted by maximum likelihood with their "canonical" link — and it is the pattern that backpropagation starts from at the output of a classifier.

::: theorem The logistic loss is convex {#thm-convex}
$\mathcal{L}$ is convex in $\mathbf{w}$. If $X$ has full column rank, it is strictly convex, so it has at most one minimiser, and any stationary point is the global minimum.
:::

::: proof
For any $\mathbf{v}$, $\mathbf{v}^\top\nabla^2\mathcal{L}\,\mathbf{v} = \frac1n\sum_ip_i(1 - p_i)(\mathbf{x}_i^\top\mathbf{v})^2\ge0$, so the Hessian is positive semi-definite everywhere and $\mathcal{L}$ is convex. Every $p_i$ lies strictly between $0$ and $1$, so every weight $p_i(1 - p_i)$ is positive, and the sum vanishes only if $\mathbf{x}_i^\top\mathbf{v} = 0$ for all $i$, that is, $X\mathbf{v} = \mathbf{0}$. With full column rank this forces $\mathbf{v} = \mathbf{0}$: the Hessian is positive definite and $\mathcal{L}$ strictly convex. A strictly convex function has at most one minimiser, and for a differentiable convex function every stationary point is a minimiser ([[math-for-ml/optimisation#prop-convex]]).
:::

Unlike least squares, setting the gradient to zero gives no closed form: $\mathbf{p}$ depends non-linearly on $\mathbf{w}$. Logistic regression is fitted iteratively — by gradient descent, or by Newton's method, which for this model is known as **iteratively reweighted least squares** because each Newton step solves a weighted least-squares problem with weights $S$ (exercise 9). Convexity guarantees that either method, run properly, finds the global minimum.

::: example One gradient step by hand {#ex-step}
Two examples, with a constant feature: $\mathbf{x}_1 = (1, 1)$ with $y_1 = 1$, and $\mathbf{x}_2 = (1, -1)$ with $y_2 = 0$. Starting from $\mathbf{w} = \mathbf{0}$, take one gradient step with $\eta = 1$ and compare the loss before and after.
::: solution
At $\mathbf{w} = \mathbf{0}$ both probabilities are $\sigma(0) = 1/2$ and the loss is $\log2 = 0.693$. By [[#eq-logistic-grad]],

$$
\nabla\mathcal{L} = \tfrac12\big[(\tfrac12 - 1)(1, 1) + (\tfrac12 - 0)(1, -1)\big] = \tfrac12\big[(-\tfrac12, -\tfrac12) + (\tfrac12, -\tfrac12)\big] = (0, -\tfrac12).
$$

So $\mathbf{w}\leftarrow\mathbf{0} - 1\cdot(0, -\frac12) = (0, \frac12)$. Now $z_1 = 0.5$ and $z_2 = -0.5$, so $p_1 = \sigma(0.5) = 0.622$ and $p_2 = 0.378$; each example has loss $-\log0.622 = 0.474$, and the average fell from $0.693$ to $0.474$. The intercept's gradient was zero because the predicted rate of class $1$, $(p_1 + p_2)/2 = 1/2$, already matched the observed rate.
:::
:::

### When the maximum does not exist {#sec-separable}

Strict convexity says there is *at most* one minimiser. Sometimes there is none.

::: proposition Separable data have no maximum-likelihood estimate {#prop-separable}
Suppose the data are **linearly separable**: some $\mathbf{u}$ has $\mathbf{u}^\top\mathbf{x}_i > 0$ whenever $y_i = 1$ and $\mathbf{u}^\top\mathbf{x}_i < 0$ whenever $y_i = 0$. Then $\inf_{\mathbf{w}}\mathcal{L}(\mathbf{w}) = 0$, but $\mathcal{L}(\mathbf{w}) > 0$ for every $\mathbf{w}$: the infimum is not attained, and minimising sequences have $\lVert\mathbf{w}\rVert\to\infty$.
:::

::: proof
In margin form every term is $\log(1 + e^{-m_i})$ with $m_i = \tilde y_i\mathbf{w}^\top\mathbf{x}_i$, which is positive for every finite $m_i$, so $\mathcal{L}(\mathbf{w}) > 0$. For $\mathbf{w} = c\mathbf{u}$ all margins are $c$ times positive numbers, so each term tends to $0$ as $c\to\infty$, and so does $\mathcal{L}(c\mathbf{u})$; hence the infimum is $0$. On any bounded set of $\mathbf{w}$ the margins are bounded, so $\mathcal{L}$ is bounded below by a positive constant there; a sequence with $\mathcal{L}\to0$ must therefore leave every bounded set.
:::

On separable data, gradient descent keeps making the classifier more confident: the loss falls towards zero, the weights grow without bound (slowly, like $\log t$), and the predicted probabilities approach $0$ and $1$. Soudry et al. (2018) proved that the *direction* $\mathbf{w}_t/\lVert\mathbf{w}_t\rVert$ converges to that of the maximum-margin separator, the solution of a hard-margin support vector machine — an example of the **implicit bias** of an optimiser, to which [[ml-fundamentals/generalisation]] returns. [[#ex-step]] is separable, so continuing those gradient steps would never stop. The practical cure is a penalty $\frac\lambda2\lVert\mathbf{w}\rVert^2$, which makes the loss strictly convex with a finite minimiser ([[ml-fundamentals/regularisation]]).

::: widget plot
f: ln(1 + exp(-x)) + l*x^2
x: -2, 10
y: 0, 2
sliders: l=0.02:0:0.3:0.005
labels: $\log(1 + e^{-w}) + \lambda w^2$
caption: The loss of a single correctly classifiable example as a function of a weight $w$ along the separating direction, plus a penalty $\lambda w^2$. With $\lambda = 0$ the curve decreases forever and has no minimum, as [[#prop-separable]] says; any $\lambda > 0$ creates a finite minimiser, which moves further out as $\lambda$ shrinks.
:::

::: warning Perfect training accuracy can mean overconfident probabilities
When a logistic model (or a neural network) separates its training data, maximum likelihood rewards making every training probability $0$ or $1$, and unregularised training drifts there. The decision boundary may still be sensible, but the probabilities are not: a test point near the boundary may be assigned $0.999$. Software that reports "convergence warnings" or huge standard errors for some coefficients is often signalling separation. Use a penalty, stop early, or both, and check calibration on held-out data ([[ml-fundamentals/evaluation-metrics]]).
:::

## Where the logistic model comes from {#sec-generative}

The logistic form is not arbitrary. It is exactly what Bayes' rule produces from a simple model of how the inputs of each class are generated.

::: proposition Gaussian classes give a logistic posterior {#prop-lda}
Suppose class $k\in\{0, 1\}$ has prior probability $\pi_k$ and the inputs of class $k$ are $\Normal(\boldsymbol\mu_k, \Sigma)$, with the same covariance $\Sigma$ for both. Then $\Prob(y = 1\mid\mathbf{x}) = \sigma(\mathbf{w}^\top\mathbf{x} + b)$ with

$$
\mathbf{w} = \Sigma^{-1}(\boldsymbol\mu_1 - \boldsymbol\mu_0),\qquad b = -\tfrac12\big(\boldsymbol\mu_1^\top\Sigma^{-1}\boldsymbol\mu_1 - \boldsymbol\mu_0^\top\Sigma^{-1}\boldsymbol\mu_0\big) + \log\frac{\pi_1}{\pi_0}.
$$
:::

::: proof
By Bayes' rule ([[math-for-ml/probability#thm-bayes]]) the log-odds are $\log\frac{\pi_1}{\pi_0} + \log\mathcal{N}(\mathbf{x};\boldsymbol\mu_1, \Sigma) - \log\mathcal{N}(\mathbf{x};\boldsymbol\mu_0, \Sigma)$. The normalising constants are equal and cancel, leaving $-\frac12(\mathbf{x} - \boldsymbol\mu_1)^\top\Sigma^{-1}(\mathbf{x} - \boldsymbol\mu_1) + \frac12(\mathbf{x} - \boldsymbol\mu_0)^\top\Sigma^{-1}(\mathbf{x} - \boldsymbol\mu_0)$. The quadratic terms $\mathbf{x}^\top\Sigma^{-1}\mathbf{x}$ cancel, and what remains is $(\boldsymbol\mu_1 - \boldsymbol\mu_0)^\top\Sigma^{-1}\mathbf{x} - \frac12(\boldsymbol\mu_1^\top\Sigma^{-1}\boldsymbol\mu_1 - \boldsymbol\mu_0^\top\Sigma^{-1}\boldsymbol\mu_0)$, using the symmetry of $\Sigma^{-1}$. Adding the prior term and applying $\sigma$ gives the result.
:::

Estimating $\boldsymbol\mu_k$, $\Sigma$ and $\pi_k$ from data and plugging them in is Fisher's **linear discriminant analysis** (LDA), a *generative* method: it models how $\mathbf{x}$ arises. Logistic regression is *discriminative*: it models only $\Prob(y\mid\mathbf{x})$ and makes no assumption about the distribution of $\mathbf{x}$. When the Gaussian assumption holds, LDA uses the data more efficiently; when it fails (binary features, skewed distributions, outliers), logistic regression is more robust, because the logistic posterior also arises from many other class-conditional distributions — for instance independent binary features with class-specific probabilities, or any exponential family whose sufficient statistic is $\mathbf{x}$ itself. Ng and Jordan (2001) compared the two and found that the generative model approaches its (higher) asymptotic error faster, the discriminative model reaching lower error with more data.

The listing fits logistic regression by gradient descent to $200$ points from exactly this model — two unit-variance Gaussian clouds centred at $(0, 0)$ and $(2, 2)$ with equal priors — and then to clouds so far apart that they are separable. By [[#prop-lda]], the true posterior has $\mathbf{w} = (2, 2)$ and $b = -4$.

```python
import math, random

rng = random.Random(2)

def make_data(n, shift):
    """Two Gaussian clouds in 2D: class 1 centred at (shift, shift), class 0 at (0, 0)."""
    data = []
    for i in range(n):
        y = i % 2
        c = shift if y else 0.0
        data.append(([1.0, c + rng.gauss(0, 1), c + rng.gauss(0, 1)], y))  # x = (1, x1, x2)
    return data

def sigmoid(z):
    return 1 / (1 + math.exp(-z)) if z >= 0 else math.exp(z) / (1 + math.exp(z))

def loss_and_grad(w, data):
    """Mean cross-entropy and its gradient (1/n) sum (p - y) x."""
    L, g = 0.0, [0.0] * len(w)
    for x, y in data:
        z = sum(a * b for a, b in zip(w, x))
        p = sigmoid(z)
        # -log p for y = 1, -log(1 - p) for y = 0, computed stably as softplus
        L += math.log1p(math.exp(-abs(z))) + max(z, 0) - y * z
        for j in range(len(w)):
            g[j] += (p - y) * x[j]
    n = len(data)
    return L / n, [gj / n for gj in g]

def accuracy(w, data):
    return sum((sum(a * b for a, b in zip(w, x)) > 0) == y for x, y in data) / len(data)

def train(data, eta, steps, report):
    w = [0.0, 0.0, 0.0]
    for t in range(1, steps + 1):
        L, g = loss_and_grad(w, data)
        w = [wj - eta * gj for wj, gj in zip(w, g)]
        if t in report:
            L, _ = loss_and_grad(w, data)
            norm = math.sqrt(w[1] ** 2 + w[2] ** 2)
            print(f"  step {t:5d}  loss {L:.4f}  acc {accuracy(w, data):.3f}  "
                  f"w = {[round(v, 2) for v in w]}  |w| = {norm:.2f}")
    return w

print("overlapping classes (shift 2):")
train_set, test_set = make_data(200, 2.0), make_data(2000, 2.0)
w = train(train_set, eta=0.5, steps=2000, report={10, 100, 2000})
print("  test accuracy", accuracy(w, test_set))

print("separable classes (shift 6):")
train(make_data(200, 6.0), eta=0.5, steps=20000, report={100, 1000, 20000})
```

```text
overlapping classes (shift 2):
  step    10  loss 0.3417  acc 0.875  w = [-0.57, 0.62, 0.75]  |w| = 0.97
  step   100  loss 0.2073  acc 0.915  w = [-2.46, 1.27, 1.59]  |w| = 2.03
  step  2000  loss 0.1935  acc 0.910  w = [-3.78, 1.84, 2.2]  |w| = 2.87
  test accuracy 0.915
separable classes (shift 6):
  step   100  loss 0.0350  acc 1.000  w = [-3.3, 0.74, 0.71]  |w| = 1.02
  step  1000  loss 0.0050  acc 1.000  w = [-6.27, 1.19, 1.21]  |w| = 1.70
  step 20000  loss 0.0005  acc 1.000  w = [-11.04, 2.01, 2.15]  |w| = 2.95
```

On overlapping classes the estimate $(-3.78, 1.84, 2.20)$ is close to the true $(-4, 2, 2)$, and the test accuracy $0.915$ is near the best possible: the Bayes classifier's boundary bisects the segment between the means, which are $2\sqrt2$ noise standard deviations apart, so its error is $\Phi(-\sqrt2)\approx0.079$ and no classifier can exceed an accuracy of about $0.921$. The loss converges to a positive value. On separable classes the loss keeps falling towards zero and the weights keep growing — $|\mathbf{w}|$ rises from $1.7$ to $2.95$ between steps $1000$ and $20{,}000$, roughly logarithmically — exactly as [[#prop-separable]] predicts. The `sigmoid` and loss are computed in forms that never evaluate `exp` of a large positive number; naive formulas overflow or return $\log0$ for confident predictions.

## Many classes: softmax regression {#sec-softmax}

With $K$ classes the model gives each class its own linear score, the **logit** $z_k = \mathbf{w}_k^\top\mathbf{x} + b_k$, and turns the $K$ logits into a probability vector.

::: definition Softmax regression {#def-softmax-regression}
**Softmax** (or multinomial logistic) regression with weight matrix $W\in\R^{K\times d}$ and bias $\mathbf{b}\in\R^K$ predicts

$$
\Prob(y = k\mid\mathbf{x}) = \operatorname{softmax}(\mathbf{z})_k = \frac{e^{z_k}}{\sum_{j=1}^Ke^{z_j}},\qquad\mathbf{z} = W\mathbf{x} + \mathbf{b}\in\R^K,
$$

and is fitted by minimising the average **cross-entropy** $\mathcal{L} = -\frac1n\sum_i\log\operatorname{softmax}(\mathbf{z}_i)_{y_i}$, the negative log-likelihood of a categorical model.
:::

::: proposition Gradient of softmax regression {#prop-softmax-grad}
For one example with probabilities $\mathbf{p} = \operatorname{softmax}(\mathbf{z})$ and one-hot target $\mathbf{e}_y$,

$$
\nabla_{\mathbf{z}}\ell = \mathbf{p} - \mathbf{e}_y,\qquad\nabla_W\ell = (\mathbf{p} - \mathbf{e}_y)\,\mathbf{x}^\top,\qquad\nabla_{\mathbf{b}}\ell = \mathbf{p} - \mathbf{e}_y.
$$

The loss is convex in $(W, \mathbf{b})$. Adding the same vector to every row of $W$ (and the same constant to every $b_k$) leaves all predictions unchanged.
:::

::: proof
The gradient with respect to the logits is [[math-for-ml/gradients#prop-softmax-ce]]; the gradients with respect to $W$ and $\mathbf{b}$ follow from $\mathbf{z} = W\mathbf{x} + \mathbf{b}$ by the linear-layer rule ([[math-for-ml/gradients#prop-linear-grad]]). For convexity, $\ell = \log\sum_je^{z_j} - z_y$; the log-sum-exp function is convex (its Hessian is $\operatorname{diag}(\mathbf{p}) - \mathbf{p}\mathbf{p}^\top$, which is positive semi-definite because $\mathbf{v}^\top(\operatorname{diag}\mathbf{p} - \mathbf{p}\mathbf{p}^\top)\mathbf{v} = \sum_jp_jv_j^2 - (\sum_jp_jv_j)^2$ is a variance), $z_y$ is linear, and $\mathbf{z}$ is linear in the parameters, so $\ell$ is convex in them. Finally, adding $\mathbf{c}^\top\mathbf{x} + c_0$ to every logit multiplies numerator and denominator of the softmax by the same factor $e^{\mathbf{c}^\top\mathbf{x} + c_0}$.
:::

The last statement means the parameters are not identifiable: only differences of logits matter, and the loss is convex but not strictly. With $K = 2$, only $z_1 - z_0$ matters and softmax regression reduces to logistic regression with $\mathbf{w} = \mathbf{w}_1 - \mathbf{w}_0$ (exercise 10). In practice nobody removes the redundancy; a small weight penalty picks one solution.

::: example A softmax step {#ex-softmax}
A three-class model gives logits $\mathbf{z} = (2.0, 1.0, 0.1)$ for an input whose true class is the second. Compute the probabilities, the loss and the gradient with respect to the logits.
::: solution
$e^{2} = 7.389$, $e^{1} = 2.718$, $e^{0.1} = 1.105$, total $11.212$, so $\mathbf{p} = (0.659, 0.242, 0.099)$. The loss is $-\log0.242 = 1.417$. The gradient is $\mathbf{p} - \mathbf{e}_2 = (0.659, -0.758, 0.099)$: a gradient step raises the true class's logit and lowers the others in proportion to their probabilities. The components sum to zero, reflecting the shift invariance of [[#prop-softmax-grad]].
:::
:::

### The output layer of a language model {#sec-lm-head}

A language model's last layer is softmax regression. The network computes a hidden vector $\mathbf{h}_t\in\R^{d_{\text{model}}}$ summarising the context $x_{<t}$, and an **unembedding** matrix $W_U\in\R^{\lvert\mathcal{V}\rvert\times d_{\text{model}}}$ turns it into logits $\mathbf{z}_t = W_U\mathbf{h}_t$, one per token of the vocabulary; the next-token distribution is $\operatorname{softmax}(\mathbf{z}_t)$, and the loss is the cross-entropy at the true next token. Everything in [[#prop-softmax-grad]] applies with $\mathbf{x} = \mathbf{h}_t$ and $K = \lvert\mathcal{V}\rvert$ — except that $\mathbf{h}_t$ is itself learned, which makes the whole problem non-convex.

::: example The size of the output layer {#ex-lm-head}
GPT-2 small has $d_{\text{model}} = 768$ and a vocabulary of $50{,}257$ tokens. How many parameters does its unembedding matrix have, and how many multiply–adds does it cost per token? How large is the gradient $\nabla_{\mathbf{z}}\ell$ for one token?
::: solution
$W_U$ has $50{,}257\times768 = 38{,}597{,}376$ entries — about $39$ million, nearly a third of the model's roughly $124$ million parameters (GPT-2 shares this matrix with the input embedding, a choice called weight tying). Computing the logits costs the same number of multiply–adds per token. The gradient with respect to the logits is the vector $\mathbf{p} - \mathbf{e}_y$ of length $50{,}257$, dense because the softmax gives every token positive probability: every token's logit is pushed down a little at every step, and the true one pushed up.
:::
:::

::: quiz
A softmax classifier currently assigns probabilities $(0.7, 0.2, 0.1)$ to three classes for a training example of class $3$. Which statement about the gradient of the cross-entropy with respect to the logits is correct?
- [ ] It is $(0, 0, -1)$: only the true class's logit changes
- [x] It is $(0.7, 0.2, -0.9)$: gradient descent lowers the logits of classes 1 and 2 and raises that of class 3
- [ ] It is $(-0.7, -0.2, 0.9)$, so gradient descent lowers the true class's logit
- [ ] It is zero, because the probabilities already sum to $1$
::: solution
By [[#prop-softmax-grad]] the gradient is $\mathbf{p} - \mathbf{e}_y = (0.7, 0.2, 0.1 - 1)$. Gradient descent moves the logits by $-\eta$ times it, raising $z_3$ by $0.9\eta$ and lowering $z_1$ and $z_2$ in proportion to the probability they wrongly hold.
:::
:::

## Classifying with probabilities {#sec-decisions}

A probabilistic classifier separates two questions: *how likely is each class?* (the model's job) and *what should we do about it?* (a decision). Predicting the most probable class minimises the expected 0–1 loss ([[ml-fundamentals/learning-problem#prop-bayes]]), but errors often have unequal costs — missing a tumour is worse than a false alarm — and then the threshold should move. If a false positive costs $c_{\text{FP}}$ and a false negative $c_{\text{FN}}$, predicting positive has expected cost $(1 - p)c_{\text{FP}}$ and predicting negative $pc_{\text{FN}}$, so the cost-minimising rule predicts positive when $p > c_{\text{FP}}/(c_{\text{FP}} + c_{\text{FN}})$. With $c_{\text{FN}} = 9c_{\text{FP}}$, the threshold is $0.1$. This only works if the probabilities mean what they say, which is the question of **calibration** taken up in [[ml-fundamentals/evaluation-metrics]].

::: history
The logistic curve was introduced by Pierre-François Verhulst (1838, 1845) as a model of population growth limited by resources. Joseph Berkson proposed the logit as an alternative to the probit for dose–response data (1944) and named it, and David Cox's "The regression analysis of binary sequences" (1958) established logistic regression as a general method. Nelder and Wedderburn (1972) placed it, with linear and Poisson regression, in the family of generalised linear models fitted by iteratively reweighted least squares. The multinomial version entered econometrics through Daniel McFadden's conditional logit model of discrete choice (1974). In neural networks, the name "softmax" is due to John Bridle (1990), who interpreted network outputs as probabilities; Rosenblatt's perceptron (1958) had used a hard threshold instead. Ronald Fisher's linear discriminant (1936) is the generative counterpart of [[#prop-lda]].
:::

::: summary
- Logistic regression models $\Prob(y = 1\mid\mathbf{x}) = \sigma(\mathbf{w}^\top\mathbf{x} + b)$: the log-odds are linear, the decision boundary is a hyperplane, and each weight is a log odds ratio.
- Maximum likelihood minimises the binary **cross-entropy**, equivalently the logistic loss of the margin. Its gradient is $\frac1nX^\top(\mathbf{p} - \mathbf{y})$ — prediction minus target, times input.
- The Hessian $\frac1nX^\top SX$ is positive semi-definite, so the loss is convex (strictly, with full-rank features); there is no closed form, but gradient descent and Newton's method find the global minimum.
- On linearly separable data no maximum-likelihood estimate exists: the weights grow without bound and the probabilities become overconfident unless the model is regularised.
- Gaussian classes with shared covariance yield exactly a logistic posterior (LDA); logistic regression models the posterior directly without assuming the input distribution.
- **Softmax regression** generalises to $K$ classes with gradient $(\mathbf{p} - \mathbf{e}_y)\mathbf{x}^\top$; it is the output layer of every language model, with one class per token.
:::

## Exercises

::: exercise A predicted probability {level=1 check="1/(1+exp(-1.5))"}
A logistic model has $\mathbf{w} = (2, -1)$ and $b = 0.5$. What probability does it give to class $1$ for $\mathbf{x} = (1, 1)$?
::: solution
$z = 2 - 1 + 0.5 = 1.5$, so $\Prob(y = 1\mid\mathbf{x}) = \sigma(1.5) = 1/(1 + e^{-1.5})\approx0.818$.
:::
:::

::: exercise An odds ratio {level=1 check="exp(0.7)"}
In a logistic model, feature $x_3$ has weight $0.7$. By what factor are the odds of class $1$ multiplied when $x_3$ increases by $1$ and the other features are held fixed?
::: solution
The log-odds increase by $0.7$, so the odds are multiplied by $e^{0.7}\approx2.01$ — roughly doubled — regardless of the starting value.
:::
:::

::: exercise A cross-entropy {level=1 check="-(ln(0.9)+ln(0.8)+ln(0.6))/3"}
A model predicts $\Prob(y = 1) = 0.9, 0.2, 0.6$ for three examples with labels $1, 0, 1$. Compute the average binary cross-entropy in nats.
::: solution
The terms are $-\ln0.9 = 0.105$, $-\ln(1 - 0.2) = 0.223$ and $-\ln0.6 = 0.511$, so the average is $0.839/3 = 0.280$ nats.
:::
:::

::: exercise A gradient step on one example {level=2 check="1/(1+exp(-2.5))"}
With $\mathbf{w} = \mathbf{0}$ and a single training example $\mathbf{x} = (1, 2)$ (the first entry a constant feature) with $y = 1$, take one gradient step with $\eta = 1$. What probability does the updated model give this example?
::: solution
$p = \sigma(0) = 1/2$, so by [[#eq-logistic-grad]] the gradient is $(1/2 - 1)(1, 2) = (-0.5, -1)$ and the new weights are $(0.5, 1)$. The new score is $0.5 + 2 = 2.5$ and the probability $\sigma(2.5)\approx0.924$.
:::
:::

::: exercise A softmax loss {level=2 check="ln(exp(2)+exp(1)+1)-1"}
A three-class model gives logits $(2, 1, 0)$ to an example of the second class. Compute its cross-entropy loss exactly, and the gradient with respect to the logits.
::: solution
The loss is $-\log\big(e^1/(e^2 + e^1 + e^0)\big) = \ln(e^2 + e + 1) - 1\approx1.408$. The probabilities are $(0.665, 0.245, 0.090)$ and the gradient is $\mathbf{p} - \mathbf{e}_2 = (0.665, -0.755, 0.090)$.
:::
:::

::: exercise A discriminant with unequal priors {level=2 check="1+ln(3)/2"}
In one dimension, class $0$ is $\Normal(0, 1)$ and class $1$ is $\Normal(2, 1)$, and class $1$ has prior probability $1/4$. Use [[#prop-lda]] to find the logistic parameters and the decision boundary.
::: solution
$w = (2 - 0)/1 = 2$ and $b = -\frac12(4 - 0) + \log\frac{1/4}{3/4} = -2 - \ln3$. The boundary $2x - 2 - \ln3 = 0$ is at $x = 1 + \frac{\ln3}2\approx1.549$. With equal priors it would be the midpoint $x = 1$; the rarer class $1$ needs stronger evidence, so its region starts further out.
:::
:::

::: exercise Separation in one dimension {level=2}
Two examples without intercept: $x = 1$ with $y = 1$ and $x = -1$ with $y = 0$. Write $\mathcal{L}(w)$ and show it has no minimiser. Then add the penalty $\frac\lambda2w^2$ and show that the minimiser $w_\lambda$ satisfies $\sigma(-w_\lambda) = \lambda w_\lambda$. What happens to $w_\lambda$ as $\lambda\to0$?
::: solution
Both margins equal $w$, so $\mathcal{L}(w) = \log(1 + e^{-w})$, which is positive and strictly decreasing with limit $0$: no minimiser, as [[#prop-separable]] says. With the penalty, the derivative is $-e^{-w}/(1 + e^{-w}) + \lambda w = -\sigma(-w) + \lambda w$, and setting it to zero gives $\sigma(-w_\lambda) = \lambda w_\lambda$. The left side decreases from $1/2$ at $w = 0$ towards $0$, the right side increases from $0$, so there is exactly one solution, and the objective is strictly convex, so it is the minimiser. As $\lambda\to0$ the right side flattens and the crossing moves out: $w_\lambda\to\infty$, roughly like $\log(1/\lambda)$, since for large $w$ the condition is $e^{-w}\approx\lambda w$.
:::
:::

::: exercise The perceptron and the logistic gradient {level=2}
Show that if every predicted probability is rounded to $0$ or $1$ ($p_i$ replaced by $[z_i > 0]$), the stochastic gradient step $\mathbf{w}\leftarrow\mathbf{w} - \eta(p_i - y_i)\mathbf{x}_i$ becomes Rosenblatt's perceptron rule: no change when an example is classified correctly, and $\mathbf{w}\leftarrow\mathbf{w}\pm\eta\mathbf{x}_i$ when it is misclassified. What does logistic regression do differently on correctly classified examples?
::: solution
With $\hat y_i = [z_i > 0]$, the factor $\hat y_i - y_i$ is $0$ when the prediction is right, $+1$ for a false positive (subtract $\eta\mathbf{x}_i$) and $-1$ for a false negative (add $\eta\mathbf{x}_i$): the perceptron update. Logistic regression uses $p_i - y_i$, which is non-zero even for correct predictions; correctly classified points near the boundary ($p_i$ near $1/2$) still push the weights, by an amount that fades as the margin grows. This is what makes the logistic loss smooth, gives it a unique minimiser on non-separable data, and lets it produce probabilities.
:::
:::

::: exercise Newton's method is reweighted least squares {level=3}
Show that a Newton step for logistic regression, $\mathbf{w}^+ = \mathbf{w} - (X^\top SX)^{-1}X^\top(\mathbf{p} - \mathbf{y})$, can be written as the weighted least-squares solution $\mathbf{w}^+ = (X^\top SX)^{-1}X^\top S\mathbf{u}$ for the "working response" $\mathbf{u} = X\mathbf{w} + S^{-1}(\mathbf{y} - \mathbf{p})$. Which examples get the most weight?
::: solution
By [[#prop-logistic-grad]] the Newton step uses the Hessian $\frac1nX^\top SX$ and gradient $\frac1nX^\top(\mathbf{p} - \mathbf{y})$; the factors $\frac1n$ cancel. Write $\mathbf{w} = (X^\top SX)^{-1}X^\top SX\mathbf{w}$; then $\mathbf{w}^+ = (X^\top SX)^{-1}\big(X^\top SX\mathbf{w} + X^\top(\mathbf{y} - \mathbf{p})\big) = (X^\top SX)^{-1}X^\top S\big(X\mathbf{w} + S^{-1}(\mathbf{y} - \mathbf{p})\big)$, which is the solution of the weighted normal equations $X^\top SX\mathbf{w}^+ = X^\top S\mathbf{u}$, that is, the minimiser of $\sum_is_i(u_i - \mathbf{x}_i^\top\mathbf{w}^+)^2$. The weights $s_i = p_i(1 - p_i)$ are largest ($1/4$) for examples the current model finds uncertain, $p_i\approx1/2$, and tiny for confidently classified examples. Each iteration re-solves a least-squares problem with new weights and responses — hence "iteratively reweighted least squares". (This requires all $s_i > 0$, which holds for finite $\mathbf{w}$.)
:::
:::

::: exercise Two-class softmax is logistic regression {level=3}
Show that softmax regression with $K = 2$ classes, weight rows $\mathbf{w}_0, \mathbf{w}_1$ and biases $b_0, b_1$, gives the same probabilities as logistic regression with $\mathbf{w} = \mathbf{w}_1 - \mathbf{w}_0$ and $b = b_1 - b_0$, and that their cross-entropy losses coincide. Why can the two-class softmax loss not be strictly convex in $(\mathbf{w}_0, \mathbf{w}_1, b_0, b_1)$?
::: solution
$\operatorname{softmax}(\mathbf{z})_1 = e^{z_1}/(e^{z_0} + e^{z_1}) = 1/(1 + e^{-(z_1 - z_0)}) = \sigma(z_1 - z_0)$, and $z_1 - z_0 = (\mathbf{w}_1 - \mathbf{w}_0)^\top\mathbf{x} + (b_1 - b_0)$. The probability of class $0$ is $1 - \sigma(z_1 - z_0)$. The cross-entropy depends only on these probabilities, so the losses coincide. The loss is unchanged along the direction that adds the same vector to $\mathbf{w}_0$ and $\mathbf{w}_1$ (and the same constant to $b_0$ and $b_1$), so it is constant along a line, and a strictly convex function cannot be constant along a line. With $K$ classes the same holds in $d + 1$ directions: the shift invariance of [[#prop-softmax-grad]].
:::
:::
