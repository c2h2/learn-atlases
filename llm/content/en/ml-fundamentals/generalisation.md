A model is useful only if it does well on data it has not seen. [[ml-fundamentals/learning-problem]] put this precisely — we want small **risk**, but we can only measure **empirical risk** — and showed that the two can be far apart: a lookup table fits any training set perfectly and predicts nothing. This chapter is about the gap between them, the **generalisation gap**, from three directions. Practically: how to estimate the risk honestly with held-out data and use those estimates to choose between models, by validation and cross-validation. Statistically: how the expected test error of a fitted model splits into noise, **bias** and **variance**, and why flexible models trade one for the other. Theoretically: the classical bounds that guarantee a small gap when the hypothesis class is small enough — by counting hypotheses, or by its **VC dimension** — and why those bounds say almost nothing about today's very large models, which generalise well in a regime the classical picture did not anticipate (**double descent** and **benign overfitting**).

The chapter uses the least-squares fits of [[ml-fundamentals/linear-regression]] for its experiments and the bias–variance decomposition of an estimator from [[math-for-ml/estimation#prop-bias-variance]]. Concentration of averages, which underlies all the bounds, is the law of large numbers made quantitative; the Maths Atlas lesson on [limit theorems](/learn/maths/lesson.php?c=probability&l=limit-theorems) gives the background.

## Training, validation and test data {#sec-splits}

The only general way to estimate a model's risk is to measure its loss on examples that played no part in producing it. A standard protocol splits the available data three ways.

::: definition Training, validation and test sets {#def-splits}
- The **training set** is used to fit the parameters of a model (by ERM, usually with a penalty).
- The **validation set** (or development set) is used to make choices that the training procedure cannot make for itself — the model class, the polynomial degree, the penalty strength, the learning rate, when to stop — by comparing the validation errors of the candidates. Such choices are called **hyperparameters**.
- The **test set** is used once, at the end, to estimate the risk of the single model finally chosen.

The three sets are disjoint samples from the same distribution. Typical proportions are $60/20/20$ or $80/10/10$, depending on how much data there is.
:::

Why three sets and not two? Because choosing a model by its validation error is itself a form of fitting. If one hundred hyperparameter settings are tried and the best validation error reported, that number is the minimum of one hundred noisy estimates and is biased downwards, exactly as the training error of the ERM hypothesis is ([[ml-fundamentals/learning-problem#prop-optimism]]). The test set, untouched by any choice, restores an unbiased estimate. Its precision is that of any average of independent losses: for 0–1 loss and $m$ test examples the standard error is $\sqrt{R(1 - R)/m}$, so $1{,}000$ test examples measure an error near $10\%$ to within about $\pm2$ percentage points (95% confidence), and comparing two models needs the paired analysis of [[ml-fundamentals/evaluation-metrics]].

::: warning Leakage and test-set reuse
Any information about the test set that reaches training or model selection invalidates the test estimate. Common routes: normalising features with statistics computed on all the data before splitting; duplicates or near-duplicates across the split (the same patient in training and test, the same web page crawled twice); choosing among models, prompts or checkpoints by their test score; and, for language models, benchmark questions that appear in the pretraining corpus (**contamination**, [[evaluation/contamination]]). Time-ordered data must be split by time, not at random, or the model is evaluated on the past with knowledge of the future. Repeatedly "peeking" at a public test set over years of research slowly overfits the whole field to it.
:::

### Cross-validation {#sec-cv}

With little data, setting aside a large validation set is expensive, and a small one gives noisy choices. Cross-validation reuses every example for both purposes.

::: algorithm $k$-fold cross-validation {#alg-cv}
Input: a data set of $n$ examples, a learning procedure $A$ with hyperparameter $\lambda$, candidate values $\lambda_1, \dots, \lambda_M$, and $k\ge2$.

1. Shuffle the data and split it into $k$ folds $F_1, \dots, F_k$ of (nearly) equal size.
2. For each candidate $\lambda$ and each fold $j$: train $A$ with hyperparameter $\lambda$ on all folds except $F_j$, and compute its average loss $e_j(\lambda)$ on $F_j$.
3. The cross-validation estimate is $\operatorname{CV}(\lambda) = \frac1n\sum_j\lvert F_j\rvert\,e_j(\lambda)$, the average held-out loss over all $n$ examples.
4. Choose $\hat\lambda = \arg\min_\lambda\operatorname{CV}(\lambda)$ and retrain on all the data with $\hat\lambda$.

With $k = n$ this is **leave-one-out** cross-validation (LOO).
:::

Each example is held out exactly once, so every example contributes to the error estimate, and every model is trained on a fraction $(k - 1)/k$ of the data. The cost is $kM$ trainings plus a final one. Common choices are $k = 5$ or $10$: LOO is nearly unbiased for the risk of a model trained on $n - 1$ points but can be expensive and has high variance, while small $k$ trains on noticeably less data and so slightly overestimates the error. Cross-validation estimates the performance of the *procedure* ("fit with $\lambda$"), not of one fitted model; if it is used to choose $\lambda$, the minimum $\operatorname{CV}(\hat\lambda)$ is again optimistic, and an honest estimate needs a separate test set or **nested** cross-validation, with the whole selection procedure run inside each outer fold.

::: example Leave-one-out by hand {#ex-loo}
For the labels $2, 4, 9$ and the model "predict the training mean", compute the training mean squared error and the leave-one-out estimate.
::: solution
The training mean is $5$, and the training MSE is $\frac13(9 + 1 + 16) = 26/3\approx8.67$. Leaving out $2$, the mean of the others is $6.5$, error $4.5^2 = 20.25$; leaving out $4$, the mean is $5.5$, error $2.25$; leaving out $9$, the mean is $3$, error $36$. The LOO estimate is $58.5/3 = 19.5$, more than twice the training error. In general, for this model, each LOO residual is the training residual times $n/(n - 1)$, so the LOO error is $(n/(n - 1))^2$ times the training error: $2.25$ times here, which matters for tiny $n$ and fades for large $n$. Exercise 9 gives the analogous shortcut for any least-squares fit.
:::
:::

## Underfitting, overfitting and the bias–variance decomposition {#sec-bias-variance}

Fit polynomials of increasing degree to $15$ noisy points of a smooth curve. A straight line cannot follow the curve: it **underfits**, with high error on training and test data alike. A polynomial of degree $13$ threads through nearly every point, noise included: it **overfits**, with tiny training error and large test error. In between lies a degree that captures the curve but not the noise. The decomposition below makes this precise for the squared loss.

Fix an input $\mathbf{x}$ and suppose $y = f(\mathbf{x}) + \varepsilon$ with $\E\varepsilon = 0$ and $\Var\varepsilon = \sigma^2$, the noise independent of the training data. Let $\hat f_S$ be the model fitted to a random training set $S$, and write $\bar f(\mathbf{x}) = \E_S[\hat f_S(\mathbf{x})]$ for the average prediction over training sets.

::: theorem Bias–variance decomposition {#thm-bias-variance}
The expected squared error at $\mathbf{x}$, averaged over training sets and over the noise of a new label, is

$$
\E_{S, \varepsilon}\big[(y - \hat f_S(\mathbf{x}))^2\big] = \underbrace{\sigma^2}_{\text{noise}} + \underbrace{\big(f(\mathbf{x}) - \bar f(\mathbf{x})\big)^2}_{\text{bias}^2} + \underbrace{\E_S\big[(\hat f_S(\mathbf{x}) - \bar f(\mathbf{x}))^2\big]}_{\text{variance}}.
$$ {#eq-bias-variance}

Averaging over $\mathbf{x}$ gives the same decomposition of the expected risk.
:::

::: proof
Write $y - \hat f_S = \varepsilon + (f - \bar f) + (\bar f - \hat f_S)$, all at the fixed $\mathbf{x}$. Squaring gives three squares and three cross terms. The cross terms with $\varepsilon$ vanish in expectation, because $\varepsilon$ has mean zero and is independent of $S$. The remaining cross term is $2(f - \bar f)\,\E_S[\bar f - \hat f_S] = 0$, because $f - \bar f$ is a constant and $\E_S\hat f_S = \bar f$ by definition. What remains are the three squares, whose expectations are $\sigma^2$, $(f - \bar f)^2$ and the variance.
:::

The three terms behave differently. The **noise** is the Bayes risk of [[ml-fundamentals/learning-problem#prop-bayes]]: no model can remove it. The **bias** measures how far the *average* fitted model is from the truth — the systematic error of the class and the fitting procedure, which more data does not cure. The **variance** measures how much the fitted model changes from one training set to another — its sensitivity to the particular sample, which more data reduces. Flexible classes have low bias and high variance; rigid classes the reverse. Regularisation, averaging (bagging), and more data are all ways of reducing variance; richer features and larger models reduce bias.

The listing estimates the three terms by brute force: $500$ training sets of $15$ points at fixed, evenly spaced inputs on $[-1, 1]$, labels $\sin(\pi x)$ plus Gaussian noise with $\sigma = 0.3$, polynomial least-squares fits of each degree, and predictions on $50$ test inputs.

```python
import math, random

rng = random.Random(3)
f = lambda x: math.sin(math.pi * x)              # true regression function on [-1, 1]
sigma, n, trials = 0.3, 15, 500

def solve(A, b):
    m = len(A); M = [r[:] + [v] for r, v in zip(A, b)]
    for k in range(m):
        p = max(range(k, m), key=lambda i: abs(M[i][k])); M[k], M[p] = M[p], M[k]
        for i in range(k + 1, m):
            c = M[i][k] / M[k][k]
            for j in range(k, m + 1): M[i][j] -= c * M[k][j]
    x = [0.0] * m
    for k in reversed(range(m)):
        x[k] = (M[k][m] - sum(M[k][j] * x[j] for j in range(k + 1, m))) / M[k][k]
    return x

def polyfit(xs, ys, deg):
    """Least squares on features 1, x, ..., x^deg via the normal equations."""
    Phi = [[x ** j for j in range(deg + 1)] for x in xs]
    G = [[sum(r[i] * r[j] for r in Phi) for j in range(deg + 1)] for i in range(deg + 1)]
    g = [sum(r[i] * y for r, y in zip(Phi, ys)) for i in range(deg + 1)]
    return solve(G, g)

peval = lambda c, x: sum(cj * x ** j for j, cj in enumerate(c))
xs = [-1 + 2 * i / (n - 1) for i in range(n)]                 # fixed design, 15 points
grid = [-1 + 2 * (k + 0.5) / 50 for k in range(50)]          # test inputs

print("deg  train_mse  test_mse  bias^2  variance  sum")
for deg in (0, 1, 3, 5, 7, 9, 11, 13):
    preds = [[] for _ in grid]
    tr = te = 0.0
    for _ in range(trials):
        ys = [f(x) + rng.gauss(0, sigma) for x in xs]
        c = polyfit(xs, ys, deg)
        tr += sum((peval(c, x) - y) ** 2 for x, y in zip(xs, ys)) / n / trials
        for k, x in enumerate(grid):
            preds[k].append(peval(c, x))
            te += (peval(c, x) - f(x) - rng.gauss(0, sigma)) ** 2 / len(grid) / trials
    bias2 = sum((sum(p) / trials - f(x)) ** 2 for p, x in zip(preds, grid)) / len(grid)
    var = sum(sum((v - sum(p) / trials) ** 2 for v in p) / trials for p in preds) / len(grid)
    print(f"{deg:3d}  {tr:9.3f}  {te:8.3f}  {bias2:6.3f}  {var:8.3f}  {bias2 + var + sigma**2:.3f}")
```

```text
deg  train_mse  test_mse  bias^2  variance  sum
  0      0.551     0.595   0.500     0.006  0.596
  1      0.324     0.310   0.207     0.012  0.309
  3      0.070     0.115   0.006     0.020  0.116
  5      0.053     0.121   0.000     0.032  0.122
  7      0.041     0.134   0.000     0.043  0.133
  9      0.031     0.159   0.000     0.067  0.157
 11      0.017     0.248   0.000     0.158  0.248
 13      0.006     3.919   0.002     3.829  3.920
```

The last column, $\text{bias}^2 + \text{variance} + \sigma^2$ with $\sigma^2 = 0.09$, matches the simulated test error, as [[#thm-bias-variance]] requires. The training error falls with every added degree. The test error falls while the bias drops (degrees $0$ to $3$: a cubic already approximates $\sin\pi x$ well), then rises as the variance grows, slowly at first and explosively at degree $13$, where $14$ parameters chase $15$ noisy points and the fitted polynomial oscillates wildly between them. The best degree here is $3$. The training error of a correctly specified model is *below* the noise level, $\sigma^2(n - p)/n$ in expectation ([[ml-fundamentals/linear-regression]], exercise 10): degree $11$ has $p = 12$ and training error close to $0.09\cdot3/15 = 0.018$.

::: widget regression
points: -1,0.2; -0.7,-0.9; -0.4,-1.1; -0.1,-0.1; 0.2,0.5; 0.5,1.2; 0.8,0.4; 1,-0.3
degree: 3
residuals: true
x: -1.2, 1.2
y: -2.5, 2.5
caption: Eight noisy points of $\sin(\pi x)$. Move the degree slider: a line underfits; degree $3$ follows the curve; degree $7$ passes through all eight points ($R^2 = 1$) and swings far outside the data between and beyond them. Drag one point slightly and watch how much the high-degree fit moves compared with the cubic — that sensitivity is the variance term of [[#thm-bias-variance]].
:::

::: example Bias and variance of a neighbour average {#ex-knn}
To predict at $x_0 = 0$, a $k$-nearest-neighbour regressor averages the labels of the $k$ training inputs closest to $0$. The inputs are $\pm0.1, \pm0.2, \pm0.3, \pm0.4$, the truth is $f(x) = x^2$ and the noise has $\sigma = 0.1$. Compute bias², variance and expected squared error at $0$ for $k = 2, 4, 8$.
::: solution
The prediction is the average of $k$ labels, so its variance is $\sigma^2/k = 0.01/k$, and its mean is the average of $f$ over the neighbours, while $f(0) = 0$.

| $k$ | neighbours | mean of $f$ | bias² | variance | total with noise |
|---|---|---|---|---|---|
| $2$ | $\pm0.1$ | $0.01$ | $0.0001$ | $0.005$ | $0.0151$ |
| $4$ | $\pm0.1, \pm0.2$ | $0.025$ | $0.000625$ | $0.0025$ | $0.013125$ |
| $8$ | $\pm0.1, \dots, \pm0.4$ | $0.075$ | $0.005625$ | $0.00125$ | $0.016875$ |

Averaging more neighbours reduces variance but reaches further from $x_0$, where $f$ differs, so bias grows; $k = 4$ is best of the three. The number of neighbours plays the role that the degree played above, in reverse: small $k$ is the flexible end.
:::
:::

## Classical generalisation bounds {#sec-bounds}

Validation measures the gap after the fact. Learning theory asks for guarantees in advance: given the size of a class and the number of examples, how large can the gap be? The basic tool is a sharp form of the law of large numbers.

::: theorem Hoeffding's inequality {#thm-hoeffding}
Let $Z_1, \dots, Z_n$ be independent random variables with values in $[0, 1]$ and mean $\mu$, and let $\bar Z = \frac1n\sum_iZ_i$. For every $\epsilon > 0$,

$$
\Prob\big(\lvert\bar Z - \mu\rvert > \epsilon\big)\le2e^{-2n\epsilon^2}.
$$
:::

(Hoeffding, 1963; a proof is in Appendix B of Shalev-Shwartz and Ben-David, 2014.) For one fixed hypothesis with a loss in $[0, 1]$, take $Z_i = \ell(h(\mathbf{x}_i), y_i)$: the empirical risk is within $\epsilon$ of the risk except with probability $2e^{-2n\epsilon^2}$, which falls exponentially in $n$. But ERM does not use one fixed hypothesis — it picks the one that looks best, and the deviation of *that* one is what matters. If the class is finite, a union bound handles all of them at once.

::: theorem Uniform convergence for a finite class {#thm-finite}
Let $\mathcal{H}$ be finite, the loss take values in $[0, 1]$, and $S$ be $n$ i.i.d. examples. For every $\delta\in(0, 1)$, with probability at least $1 - \delta$ over $S$, every $h\in\mathcal{H}$ satisfies

$$
\lvert R(h) - \hat R_S(h)\rvert\le\epsilon_n := \sqrt{\frac{\log(2\lvert\mathcal{H}\rvert/\delta)}{2n}}.
$$ {#eq-finite}

Consequently the ERM hypothesis satisfies $R(\hat h_S)\le\min_{h\in\mathcal{H}}R(h) + 2\epsilon_n$ with probability at least $1 - \delta$.
:::

::: proof
For each fixed $h$, [[#thm-hoeffding]] gives $\Prob(\lvert R(h) - \hat R_S(h)\rvert > \epsilon)\le2e^{-2n\epsilon^2}$. The probability that *some* $h$ deviates by more than $\epsilon$ is at most the sum of these probabilities (the union bound, $\Prob(\bigcup_hA_h)\le\sum_h\Prob(A_h)$), that is, at most $2\lvert\mathcal{H}\rvert e^{-2n\epsilon^2}$. Setting this equal to $\delta$ and solving for $\epsilon$ gives $\epsilon_n$. On the event that all deviations are at most $\epsilon_n$, let $h^\circ$ minimise $R$ over $\mathcal{H}$; then

$$
R(\hat h_S)\le\hat R_S(\hat h_S) + \epsilon_n\le\hat R_S(h^\circ) + \epsilon_n\le R(h^\circ) + 2\epsilon_n,
$$

using in turn the uniform bound, the definition of ERM, and the uniform bound again.
:::

Three features of [[#eq-finite]] are worth noticing. The gap shrinks like $1/\sqrt n$. The size of the class enters only through $\log\lvert\mathcal{H}\rvert$, so a class can be very large and still learnable: squaring the number of hypotheses only doubles the log. And the bound holds for *every* distribution, which is its strength and, as we shall see, its weakness. Inverting it gives a **sample complexity**: $n\ge\log(2\lvert\mathcal{H}\rvert/\delta)/(2\epsilon^2)$ examples suffice for all empirical risks to be $\epsilon$-accurate with probability $1 - \delta$. This is the setting of Valiant's **probably approximately correct** (PAC) learning (1984): a class is PAC-learnable if, for every $\epsilon$ and $\delta$, some algorithm returns with probability at least $1 - \delta$ ("probably") a hypothesis within $\epsilon$ of the best ("approximately correct") from a number of examples polynomial in $1/\epsilon$ and $1/\delta$.

::: example Bounds in numbers {#ex-bound-numbers}
(a) In the threshold experiment of [[ml-fundamentals/learning-problem]], $\mathcal{H}$ had $101$ thresholds and $n = 50$. What does [[#thm-finite]] guarantee with $\delta = 0.05$, and with $n = 1000$? (b) A model has $d$ real parameters, each stored as a $32$-bit number. Bound $\log\lvert\mathcal{H}\rvert$ and the $n$ needed for $\epsilon_n\le0.05$ when $d = 10^6$.
::: solution
(a) $\log(2\cdot101/0.05) = \log4040 = 8.30$, so $\epsilon_{50} = \sqrt{8.30/100} = 0.288$ and $\epsilon_{1000} = \sqrt{8.30/2000} = 0.064$. With $50$ examples the guarantee is weak (a gap of up to $29$ points), with $1000$ it is useful.

(b) There are at most $2^{32d}$ distinct parameter settings, so $\log\lvert\mathcal{H}\rvert\le32d\log2 = 22.2d$. For $d = 10^6$, $\epsilon_n\le0.05$ needs $n\ge(2.22\times10^7 + \log40)/(2\cdot0.0025)\approx4.4\times10^9$ examples — far more than most models with a million parameters are trained on, although such models often generalise well. The bound is valid but loose, because it ignores everything about the data and the training algorithm except the number of bits.
:::
:::

::: widget plot
f: sqrt((L*ln(10) + ln(2/q))/(2*x))
x: 10, 5000
y: 0, 0.6
sliders: L=2:0:9:1; q=0.05:0.01:0.3:0.01
labels: $\epsilon_n$ for $\lvert\mathcal{H}\rvert = 10^L$
caption: The uniform deviation $\epsilon_n$ of [[#thm-finite]] against the sample size $n$, for a class of $10^L$ hypotheses and failure probability $\delta = q$. Multiplying the class size by $10$ adds $\log10$ under the square root; demanding more confidence (smaller $\delta$) costs even less. The $1/\sqrt n$ decay is the dominant effect: halving the gap needs four times the data.
:::

### The VC dimension {#sec-vc}

Most interesting classes are infinite — linear classifiers have real-valued weights — but on a finite sample an infinite class can only produce finitely many labelings. Counting those labelings replaces $\lvert\mathcal{H}\rvert$.

::: definition Shattering, growth function and VC dimension {#def-vc}
Let $\mathcal{H}$ be a class of functions $\mathcal{X}\to\{0, 1\}$. A finite set $C = \{\mathbf{x}_1, \dots, \mathbf{x}_m\}\subseteq\mathcal{X}$ is **shattered** by $\mathcal{H}$ if every one of the $2^m$ labelings of $C$ is produced by some $h\in\mathcal{H}$. The **growth function** $\Pi_{\mathcal{H}}(m)$ is the largest number of distinct labelings that $\mathcal{H}$ produces on any $m$ points. The **Vapnik–Chervonenkis (VC) dimension** $\operatorname{VC}(\mathcal{H})$ is the size of the largest shattered set (infinite if arbitrarily large sets are shattered).
:::

Examples. Thresholds $[x > t]$ on the line shatter any single point but no pair (the labeling "left point $1$, right point $0$" is impossible), so their VC dimension is $1$. Intervals $[a\le x\le b]$ shatter two points but not three (the labeling $1, 0, 1$ is impossible): VC dimension $2$. Linear classifiers $[\mathbf{w}^\top\mathbf{x} + b > 0]$ in $\R^d$ have VC dimension $d + 1$ (exercise 8 does $d = 2$). A class can have few parameters and infinite VC dimension — $\{[\sin(\theta x) > 0]\colon\theta\in\R\}$ has one parameter and shatters arbitrarily large sets — so VC dimension measures expressiveness, not parameter count.

The key combinatorial fact (the **Sauer–Shelah lemma**; Vapnik and Chervonenkis, 1971; Sauer, 1972; Shelah, 1972) is that if $\operatorname{VC}(\mathcal{H}) = d < \infty$, then $\Pi_{\mathcal{H}}(m)\le\sum_{i=0}^d\binom mi\le(em/d)^d$ for $m\ge d$: the number of labelings grows only polynomially in $m$, not like $2^m$. Replacing $\lvert\mathcal{H}\rvert$ by this polynomial in an argument like that of [[#thm-finite]] (made rigorous by a "ghost sample" symmetrisation) gives the central result of VC theory. We state it without proof.

::: theorem VC generalisation bound {#thm-vc}
Let $\mathcal{H}$ be a class of binary classifiers with $\operatorname{VC}(\mathcal{H}) = d < \infty$, and use the 0–1 loss. For $n > d$ and $\delta\in(0, 1)$, with probability at least $1 - \delta$ over an i.i.d. sample of size $n$, every $h\in\mathcal{H}$ satisfies

$$
R(h)\le\hat R_S(h) + \sqrt{\frac{d\big(\log(2n/d) + 1\big) + \log(4/\delta)}{n}}.
$$ {#eq-vc}

Moreover (the "fundamental theorem of statistical learning"), $\mathcal{H}$ is PAC-learnable if and only if its VC dimension is finite, and the number of examples needed to come within $\epsilon$ of the best risk in $\mathcal{H}$ with probability $1 - \delta$ is of order $(d + \log(1/\delta))/\epsilon^2$, up to constant factors, in the worst case over distributions.
:::

The form [[#eq-vc]] is Vapnik's (1995), as quoted by Burges (1998); constants differ between textbook versions, and Shalev-Shwartz and Ben-David (2014, Theorem 6.8) prove the fundamental theorem with matching upper and lower bounds. The lesson is the same as for finite classes, with $d\log n$ in place of $\log\lvert\mathcal{H}\rvert$: the gap is small once $n$ is large compared with the VC dimension.

::: example A VC bound for a linear classifier {#ex-vc}
A linear classifier on $10$ features is trained on $n = 10{,}000$ examples and has training error $0.08$. What does [[#eq-vc]] guarantee with $\delta = 0.05$?
::: solution
$d = 11$. Then $d(\log(2n/d) + 1) = 11(\log1818.2 + 1) = 11\cdot8.506 = 93.6$ and $\log(4/0.05) = \log80 = 4.38$, so the square root is $\sqrt{98.0/10{,}000} = 0.099$. With $95\%$ probability the risk is at most $0.08 + 0.099 = 0.179$. True, but a held-out set of $1{,}000$ examples would pin the risk down to about $\pm0.017$: worst-case bounds are much looser than measurements.
:::
:::

::: quiz
A class of classifiers has VC dimension $3$. Which statement follows?
- [ ] Every set of three points is shattered by the class
- [x] Some set of three points is shattered, and no set of four points is
- [ ] The class has exactly three parameters
- [ ] The training error of the ERM hypothesis on any sample of three points is zero, whatever the labels
::: solution
By [[#def-vc]], VC dimension $3$ means that *some* three-point set is shattered and *no* four-point set is. Particular three-point sets may not be (three collinear points are not shattered by lines in the plane, whose VC dimension is $3$). VC dimension is not a parameter count. The last option would require every three-point set to be shattered.
:::
:::

## Beyond the classical picture {#sec-modern}

The classical account predicts a U-shaped test-error curve: as capacity grows past the point where the model fits its training data, variance should dominate and test error grow. Modern neural networks contradict that picture. They are routinely trained to near-zero training error with far more parameters than examples, and yet generalise well. Zhang et al. (2017) showed the tension sharply: standard image-classification networks can fit the CIFAR-10 training set even with *random labels*, so their effective capacity is large enough to make capacity-based bounds such as [[#thm-vc]] vacuous — and yet with true labels the same networks generalise. This is an empirical observation about trained networks, and as of 2026 there is no complete theory of it; but two phenomena, and one mechanism, are well documented.

**Double descent.** Belkin, Hsu, Ma and Mandal (2019) reported that if model capacity is pushed *past* the interpolation threshold — the point where the model can fit the training data exactly — test error, after peaking at the threshold, can **decrease again**, sometimes below the best value of the classical regime. They observed it for random-feature models, decision-tree ensembles and neural networks; Nakkiran et al. (2020) documented it for deep networks as a function of width, of training time and of sample size; similar peaks had been seen earlier in the statistical physics of learning (for instance Krogh and Hertz, 1992) and by Advani and Saxe (2017), and Loog et al. (2020) survey this prehistory. The shape depends on the noise level, the regularisation (a well-tuned penalty often removes the peak) and the setting; it is a description of observed curves, not a law.

The phenomenon appears in its simplest form in linear regression, where the interpolating solution is well defined. When $p > n$, the normal equations have infinitely many solutions that fit the data exactly. Gradient descent picks a particular one.

::: proposition Gradient descent finds the minimum-norm interpolant {#prop-min-norm}
Let $X\in\R^{n\times p}$ have rank $n < p$. Gradient descent on the least-squares loss started at $\mathbf{w}_0 = \mathbf{0}$, with a step size small enough to converge, converges to the **minimum-norm interpolant** $\mathbf{w}^\dagger = X^\top(XX^\top)^{-1}\mathbf{y}$, the solution of $X\mathbf{w} = \mathbf{y}$ with smallest $\lVert\mathbf{w}\rVert$.
:::

::: proof
Each gradient $\frac2nX^\top(X\mathbf{w}_t - \mathbf{y})$ is a combination of the rows of $X$, so every iterate lies in the row space $\mathcal{R} = \{X^\top\mathbf{a}\colon\mathbf{a}\in\R^n\}$. On $\mathcal{R}$ the Hessian is positive definite (if $X^\top\mathbf{a}\ne\mathbf{0}$ then $XX^\top\mathbf{a}\ne\mathbf{0}$, because $\mathbf{a}^\top XX^\top\mathbf{a} = \lVert X^\top\mathbf{a}\rVert^2$), so the argument of [[ml-fundamentals/linear-regression#prop-gd]] restricted to $\mathcal{R}$ shows convergence to the unique minimiser in $\mathcal{R}$. Since $X$ has rank $n$, the minimum loss is $0$, attained exactly by the solutions of $X\mathbf{w} = \mathbf{y}$, and $\mathbf{w}^\dagger$ is one of them that lies in $\mathcal{R}$, so it is the limit. Any other solution is $\mathbf{w}^\dagger + \mathbf{v}$ with $X\mathbf{v} = \mathbf{0}$; such $\mathbf{v}$ is orthogonal to every row, hence to $\mathbf{w}^\dagger\in\mathcal{R}$, and $\lVert\mathbf{w}^\dagger + \mathbf{v}\rVert^2 = \lVert\mathbf{w}^\dagger\rVert^2 + \lVert\mathbf{v}\rVert^2\ge\lVert\mathbf{w}^\dagger\rVert^2$.
:::

This is an **implicit bias**: nothing in the loss prefers small weights, but the algorithm does. Among all the interpolants, a smaller norm usually means a smoother, less wild function, and as $p$ grows past $n$ there are more directions over which to spread the fit, so the minimum norm — and the variance — falls. The listing shows the effect. The data have $D = 100$ Gaussian features, each contributing a little to the label ($\boldsymbol\beta = \mathbf{1}/\sqrt{100}$, noise $\sigma = 0.5$), and $n = 40$ examples. A model using only the first $p$ features is fitted by least squares for $p\le n$ and by the minimum-norm interpolant for $p > n$; with Gaussian inputs its expected test error is exactly $\lVert\mathbf{w} - \boldsymbol\beta\rVert^2 + \sigma^2$, counting the unused features as zero weights. Results are averaged over $50$ data sets.

```python
import math, random

rng = random.Random(5)
D, n, sigma, reps = 100, 40, 0.5, 50            # D features exist; the model uses the first p
beta = [1 / math.sqrt(D)] * D                   # every feature matters a little; |beta| = 1

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

def min_norm_lstsq(X, y):
    """Least squares; for p > n the interpolating solution of smallest norm, X^T (X X^T)^-1 y."""
    n, p = len(X), len(X[0])
    if p <= n:
        G = [[sum(r[i] * r[j] for r in X) for j in range(p)] for i in range(p)]
        return solve(G, [sum(r[i] * v for r, v in zip(X, y)) for i in range(p)])
    K = [[sum(a * b for a, b in zip(ri, rj)) for rj in X] for ri in X]       # (n, n)
    alpha = solve(K, y)
    return [sum(alpha[i] * X[i][j] for i in range(n)) for j in range(p)]

print("  p   train_mse  test_mse")
for p in (5, 10, 20, 30, 35, 38, 40, 42, 45, 50, 60, 80, 100):
    tr = te = 0.0
    for _ in range(reps):
        X = [[rng.gauss(0, 1) for _ in range(D)] for _ in range(n)]
        y = [sum(a * b for a, b in zip(r, beta)) + rng.gauss(0, sigma) for r in X]
        w = min_norm_lstsq([r[:p] for r in X], y)
        tr += sum((sum(a * b for a, b in zip(r[:p], w)) - v) ** 2 for r, v in zip(X, y)) / n / reps
        # exact test error for Gaussian inputs: |w - beta|^2 + sigma^2 (missing features count as w_j = 0)
        te += (sum((wj - bj) ** 2 for wj, bj in zip(w + [0.0] * (D - p), beta)) + sigma ** 2) / reps
    print(f"{p:3d}  {tr:9.3f}  {te:8.2f}")
```

```text
  p   train_mse  test_mse
  5      1.025      1.35
 10      0.940      1.58
 20      0.528      2.21
 30      0.242      3.80
 35      0.110      7.03
 38      0.042     17.69
 40      0.000   4788.27
 42      0.000     25.44
 45      0.000     10.27
 50      0.000      3.60
 60      0.000      2.20
 80      0.000      1.28
100      0.000      1.02
```

In this setting there is no first descent at all — each feature carries so little signal that adding features to an under-parameterised model mostly adds variance — and the test error climbs towards the interpolation threshold $p = n = 40$, where $X$ is square and nearly singular, so the fit amplifies the noise by the reciprocal of a tiny singular value; the average at $p = 40$ is dominated by a few catastrophic draws. Past the threshold, the training error is exactly zero, yet the test error falls steadily — to $1.02$ at $p = 100$, below every under-parameterised model and below the $1.25$ of predicting zero. Exercise 10 shows that a ridge penalty removes the peak.

**Benign overfitting.** The second phenomenon is that a model can fit noisy training labels *exactly* and still predict nearly as well as the Bayes predictor. For linear regression this has been proved: Bartlett, Long, Lugosi and Tsigler (2020) characterised when the minimum-norm interpolant has risk close to the noise level, in terms of the spectrum of the feature covariance — roughly, there must be many directions of small variance in which the noise can be "absorbed" harmlessly, in addition to a few important directions in which the signal is learned. For deep networks, interpolation of noisy labels without catastrophic harm is an empirical observation, with partial theory (as of 2026) in simplified settings.

For language models the classical worries take yet another form. A large pretraining run sees most of its tokens only once or a few times, so each new batch is a fresh sample and the training loss is itself an estimate of the risk; the relation between loss, model size and data is described by empirical **scaling laws** ([[scaling/scaling-laws]]) rather than by capacity bounds. Classical overfitting returns when data are repeated many times or a model is fine-tuned on a small set, which is where the tools of this chapter and [[ml-fundamentals/regularisation]] apply directly.

::: history
The idea of measuring a predictor on held-out data is old in statistics; cross-validation was formalised by Mervyn Stone (1974) and Seymour Geisser (1975), and Allen's PRESS statistic (1974) is leave-one-out for regression. Wassily Hoeffding published his inequality in 1963. Vladimir Vapnik and Alexey Chervonenkis introduced uniform convergence of frequencies to probabilities and the dimension now named after them (1968 in Russian; 1971 in English), with the counting lemma found independently by Norbert Sauer (1972) and Saharon Shelah (1972). Leslie Valiant's PAC model (1984) and the paper of Blumer, Ehrenfeucht, Haussler and Warmuth (1989) connected learnability to the VC dimension. Stuart Geman, Elie Bienenstock and René Doursat (1992) brought the bias–variance dilemma to neural networks. The modern questions were sharpened by Zhang, Bengio, Hardt, Recht and Vinyals (2017), Belkin, Hsu, Ma and Mandal (2019), Nakkiran et al. (2020) and Bartlett, Long, Lugosi and Tsigler (2020).
:::

::: summary
- Fit on a training set, choose hyperparameters on a validation set (or by $k$-fold cross-validation), and estimate the final risk once on an untouched test set; any choice made with a data set biases that set's error downwards.
- For squared loss, expected test error $=$ noise $+$ bias² $+$ variance. Rigid models have high bias; flexible models have high variance; the best capacity balances them.
- Hoeffding's inequality and a union bound give, for a finite class, $\lvert R - \hat R\rvert\le\sqrt{\log(2\lvert\mathcal{H}\rvert/\delta)/(2n)}$ for all $h$ simultaneously, with probability $1 - \delta$; ERM is then within $2\epsilon_n$ of the best in the class.
- For infinite classes the VC dimension replaces $\log\lvert\mathcal{H}\rvert$: finite VC dimension is equivalent to PAC-learnability, with sample complexity of order $(d + \log(1/\delta))/\epsilon^2$.
- Over-parameterised models defy the U-curve: **double descent** and **benign overfitting** are documented empirically for neural networks and proved in linear settings, where gradient descent's implicit bias towards the minimum-norm interpolant explains much of the effect.
:::

## Exercises

::: exercise A uniform deviation {level=1 check="sqrt(ln(2*1000/0.05)/(2*2000))"}
A class of $1000$ classifiers is evaluated on $n = 2000$ i.i.d. examples. With $\delta = 0.05$, what uniform deviation $\epsilon_n$ does [[#thm-finite]] give?
::: solution
$\epsilon_n = \sqrt{\log(2\cdot1000/0.05)/(2\cdot2000)} = \sqrt{\log40{,}000/4000} = \sqrt{10.597/4000} = 0.0515$: with probability at least $0.95$, every one of the thousand training errors is within about five percentage points of its risk.
:::
:::

::: exercise A sample size {level=1 check="2120"}
For the same class of $1000$ hypotheses and $\delta = 0.05$, what is the smallest $n$ for which [[#thm-finite]] guarantees $\epsilon_n\le0.05$?
::: solution
We need $\log(2\lvert\mathcal{H}\rvert/\delta)/(2n)\le\epsilon^2$, that is $n\ge\log(40{,}000)/(2\cdot0.0025) = 10.597/0.005 = 2119.4$, so $n = 2120$.
:::
:::

::: exercise Adding up the error {level=1 check="0.08"}
At some input, a regression method's predictions have bias $0.1$ and variance $0.02$ over training sets, and the label noise has variance $0.05$. What is the expected squared error of its prediction there?
::: solution
By [[#thm-bias-variance]], $0.05 + 0.1^2 + 0.02 = 0.08$.
:::
:::

::: exercise The cost of cross-validation {level=1 check="21"}
Five-fold cross-validation is used to choose among four values of a penalty $\lambda$, followed by a final fit on all the data. How many models are trained in total?
::: solution
$5$ folds times $4$ values gives $20$ fits, plus $1$ final fit: $21$.
:::
:::

::: exercise Many comparisons {level=2 check="1-0.95^20"}
Twenty model variants, none better than the baseline, are each compared with it by an independent test at the $5\%$ level. What is the probability that at least one variant appears significantly better or worse?
::: solution
Each comparison is a false alarm with probability $0.05$, so the probability of no false alarms is $0.95^{20}$ and of at least one is $1 - 0.95^{20}\approx0.642$. Selecting the best-looking of many variants on the same data is the same effect, and the reason for a final, untouched test set.
:::
:::

::: exercise The VC dimension of intervals {level=2 check="2"}
Let $\mathcal{H}$ consist of the indicator functions $[a\le x\le b]$ of intervals on the real line (including empty intervals). Show that $\operatorname{VC}(\mathcal{H}) = 2$.
::: solution
Two points $x_1 < x_2$ are shattered: the empty interval gives $(0, 0)$, a small interval around one point gives $(1, 0)$ or $(0, 1)$, and $[x_1, x_2]$ gives $(1, 1)$. No three points $x_1 < x_2 < x_3$ are shattered: an interval containing $x_1$ and $x_3$ contains $x_2$, so the labeling $(1, 0, 1)$ is impossible. Hence the VC dimension is $2$.
:::
:::

::: exercise Ridge in one dimension: the best penalty {level=2 check="4"}
Let $y_i = \beta x_i + \varepsilon_i$ with fixed inputs, $S = \sum_ix_i^2$, and i.i.d. noise of variance $\sigma^2$. The ridge estimate (no intercept) is $\hat w_\lambda = \sum_ix_iy_i/(S + \lambda)$. Compute its bias and variance, and show that the mean squared error $\E(\hat w_\lambda - \beta)^2$ is minimised at $\lambda^* = \sigma^2/\beta^2$. Evaluate $\lambda^*$ for $\sigma = 1$ and $\beta = 0.5$.
::: solution
$\hat w_\lambda = (S\beta + \sum_ix_i\varepsilon_i)/(S + \lambda)$, so the bias is $S\beta/(S + \lambda) - \beta = -\lambda\beta/(S + \lambda)$ and the variance is $\sigma^2S/(S + \lambda)^2$. The MSE is $M(\lambda) = (\lambda^2\beta^2 + \sigma^2S)/(S + \lambda)^2$. Differentiating, the numerator of $M'(\lambda)$ is $2\lambda\beta^2(S + \lambda) - 2(\lambda^2\beta^2 + \sigma^2S) = 2S(\lambda\beta^2 - \sigma^2)$, which is negative for $\lambda < \sigma^2/\beta^2$ and positive beyond, so $\lambda^* = \sigma^2/\beta^2 = 1/0.25 = 4$. This is the MAP penalty of [[ml-fundamentals/linear-regression#prop-ridge-map]] with prior variance $\tau^2 = \beta^2$: the best penalty matches the prior to the actual size of the coefficient. Any $\lambda\in(0, 2\lambda^*)$ beats least squares ($\lambda = 0$).
:::
:::

::: exercise Lines in the plane {level=2 check="3"}
Show that linear classifiers $[w_1x_1 + w_2x_2 + b > 0]$ in $\R^2$ shatter some set of three points, and that they shatter no set of four points. What is their VC dimension?
::: solution
Take three points not on a line, the corners of a triangle. Labeling all of them $0$ or all $1$ is done by a line far away; labeling one corner differently from the other two is done by a line cutting that corner off; the labelings with two $1$s and one $0$ are complements of these, obtained by flipping the sign of $(\mathbf{w}, b)$. So all $8$ labelings occur. For four points: if one lies inside the triangle of the other three (or on it), label the inner point $1$ and the corners $0$. The region labelled $0$ is a half-plane, which is convex; it contains the three corners, hence the whole triangle, hence the inner point — a contradiction. If three of the points are collinear, label the middle one differently from its two neighbours; the same convexity argument applies to the segment joining them. Otherwise the four points are the corners of a convex quadrilateral; label the two ends of one diagonal $1$ and the other two $0$. The half-plane labelled $1$ contains the first diagonal and the half-plane labelled $0$ the second, but the two diagonals cross, so the disjoint half-planes would share a point — again impossible. The VC dimension is $3 = d + 1$.
:::
:::

::: exercise Leave-one-out without refitting {level=3}
For least squares with full-rank design $X$ and hat matrix $P$ ([[ml-fundamentals/linear-regression#prop-projection]]), let $r_i$ be the training residual of example $i$ and $h_{ii} = P_{ii}$ its **leverage**. Show that the residual of example $i$ under the model fitted without it is $r_i/(1 - h_{ii})$, so that the LOO error is $\frac1n\sum_i\big(r_i/(1 - h_{ii})\big)^2$. Check it against [[#ex-loo]].
::: solution
Let $A = X^\top X$, $\mathbf{x} = \mathbf{x}_i$, and let $\boldsymbol\beta_{-i}$ be the fit without example $i$: $(A - \mathbf{x}\mathbf{x}^\top)\boldsymbol\beta_{-i} = X^\top\mathbf{y} - y_i\mathbf{x}$. By the Sherman–Morrison formula, $(A - \mathbf{x}\mathbf{x}^\top)^{-1} = A^{-1} + A^{-1}\mathbf{x}\mathbf{x}^\top A^{-1}/(1 - h)$ with $h = \mathbf{x}^\top A^{-1}\mathbf{x} = h_{ii}$. Then $\mathbf{x}^\top(A - \mathbf{x}\mathbf{x}^\top)^{-1} = \mathbf{x}^\top A^{-1}\big(1 + h/(1 - h)\big) = \mathbf{x}^\top A^{-1}/(1 - h)$, so

$$
\mathbf{x}^\top\boldsymbol\beta_{-i} = \frac{\mathbf{x}^\top A^{-1}(X^\top\mathbf{y} - y_i\mathbf{x})}{1 - h} = \frac{\hat y_i - hy_i}{1 - h},
$$

and $y_i - \mathbf{x}^\top\boldsymbol\beta_{-i} = \big((1 - h)y_i - \hat y_i + hy_i\big)/(1 - h) = r_i/(1 - h)$. For the constant model of [[#ex-loo]], $X$ is a column of ones, $P = \frac1n\mathbf{1}\mathbf{1}^\top$ and $h_{ii} = 1/n$, so each LOO residual is $r_i\cdot n/(n - 1)$: $-3\cdot1.5 = -4.5$, $-1.5$ and $6$, matching the direct computation. Points with high leverage (unusual inputs, $h_{ii}$ near $1$) have LOO residuals much larger than their training residuals.
:::
:::

::: exercise Regularisation removes the peak {level=3}
Modify the double-descent listing so that `min_norm_lstsq` solves ridge regression with penalty $\lambda$: add $\lambda$ to the diagonal of $X^\top X$ when $p\le n$, and to the diagonal of $XX^\top$ when $p > n$. Explain why the second form is ridge regression, and describe the test-error curve for $\lambda = 5$.
::: solution
For $p > n$ use $\mathbf{w} = X^\top(XX^\top + \lambda I_n)^{-1}\mathbf{y}$. It equals the ridge solution $(X^\top X + \lambda I_p)^{-1}X^\top\mathbf{y}$ by the push-through identity $(X^\top X + \lambda I)^{-1}X^\top = X^\top(XX^\top + \lambda I)^{-1}$, which follows from multiplying out $X^\top(XX^\top + \lambda I) = (X^\top X + \lambda I)X^\top$. With $\lambda = 5$ and the same seed the output is

```text
  p   train_mse  test_mse
  5      1.028      1.31
 10      0.950      1.43
 20      0.559      1.63
 30      0.313      1.74
 35      0.212      1.73
 38      0.165      1.74
 40      0.138      1.71
 42      0.140      1.78
 45      0.115      1.72
 50      0.071      1.61
 60      0.037      1.45
 80      0.013      1.13
100      0.005      0.99
```

The peak at $p = n$ is gone: the penalty bounds the amplification $1/s_{\min}$ of the noise by $s/(s^2 + \lambda)\le1/(2\sqrt\lambda)$ for every singular value $s$, so a nearly singular $X$ no longer explodes. The model no longer interpolates (training error stays positive), and the error at $p = 100$ is about the same as without the penalty. This matches the finding of Nakkiran, Venkat, Kakade and Ma (2021) that optimally tuned regularisation can make the test error monotone in model size in such settings.
:::
:::
