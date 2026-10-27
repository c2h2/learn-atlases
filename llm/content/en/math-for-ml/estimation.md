Pretraining a language model is, at bottom, a statistical estimation problem. There is an unknown distribution over text; we have a very large sample from it; we choose parameters $\theta$ for a model $p_\theta$ so that the model explains the sample as well as possible. "As well as possible" has a precise meaning — maximise the probability the model assigns to the data — and that principle, **maximum likelihood**, turns out to be the same thing as minimising the cross-entropy loss that every language model is trained with. Adding a prior belief about the parameters turns it into **maximum a posteriori** estimation, and the most common prior turns out to be weight decay.

This chapter develops these ideas from small examples — a coin, a bigram model, a Gaussian — where everything can be computed by hand, and then turns to the other side of estimation: how much an estimate can be trusted. Bias and variance describe an estimator's errors; standard errors and confidence intervals describe the uncertainty of a measured number, such as a model's accuracy on a benchmark. The Maths Atlas lessons on [estimation](/learn/maths/lesson.php?c=statistics&l=estimation), [Bayesian inference](/learn/maths/lesson.php?c=statistics&l=bayesian) and [confidence intervals](/learn/maths/lesson.php?c=statistics&l=confidence-intervals) treat the statistics more fully.

## Likelihood {#sec-likelihood}

::: definition Likelihood and maximum-likelihood estimate {#def-mle}
A **statistical model** is a family of distributions $p_\theta$ indexed by parameters $\theta\in\Theta$. Given data $x_1, \dots, x_N$ assumed independent and identically distributed (**i.i.d.**), the **likelihood** of $\theta$ is

$$
L(\theta) = \prod_{n=1}^Np_\theta(x_n),
$$

and the **log-likelihood** is $\ell(\theta) = \sum_{n=1}^N\log p_\theta(x_n)$. A **maximum-likelihood estimate** (MLE) is a parameter $\hat\theta$ that maximises $L$, equivalently $\ell$, equivalently minimises the **average negative log-likelihood**

$$
\mathcal{L}(\theta) = -\frac1N\sum_{n=1}^N\log p_\theta(x_n).
$$ {#eq-nll}
:::

The likelihood is the probability of the observed data, viewed as a function of the parameters with the data held fixed. It is *not* a probability distribution over $\theta$: it need not integrate to $1$ over $\Theta$. Taking logarithms turns the product into a sum, which is easier to differentiate and does not underflow; dividing by $N$ makes the objective an average, comparable across data sets of different sizes. Equation [[#eq-nll]] is exactly the training loss of a language model, with each "data point" a token and its probability given by the model's next-token distribution in context.

::: proposition MLE of a Bernoulli parameter {#prop-bernoulli-mle}
If $x_1, \dots, x_N\in\{0, 1\}$ are i.i.d. Bernoulli$(p)$ and $k = \sum_nx_n$ is the number of ones, with $0 < k < N$, the MLE is $\hat p = k/N$.
:::

::: proof
$\ell(p) = k\log p + (N - k)\log(1 - p)$. Its derivative $k/p - (N - k)/(1 - p)$ vanishes when $k(1 - p) = (N - k)p$, that is $p = k/N$. The second derivative $-k/p^2 - (N - k)/(1 - p)^2$ is negative, so $\ell$ is concave on $(0, 1)$ and this stationary point is the maximum.
:::

::: example A coin, and a model's accuracy {#ex-coin}
A model answers $7$ of $10$ questions correctly. Treating each answer as an independent Bernoulli trial with unknown success probability $p$, find the MLE and the maximised log-likelihood, and compare the log-likelihood at $p = 0.5$.
::: solution
$\hat p = 7/10 = 0.7$. The log-likelihood is $\ell(0.7) = 7\ln0.7 + 3\ln0.3 = -2.497 - 3.612 = -6.109$. At $p = 0.5$ it is $10\ln0.5 = -6.931$. The data are $e^{6.931 - 6.109} = e^{0.822} = 2.3$ times more probable under $p = 0.7$ than under $p = 0.5$ — not a large factor, which is a first hint that ten questions say little about a model.
:::
:::

### Counting is maximum likelihood {#sec-counting}

A categorical distribution with $K$ outcomes has $K$ probabilities constrained to sum to $1$; its MLE is the obvious one.

::: proposition MLE of a categorical distribution {#prop-categorical-mle}
If $x_1, \dots, x_N$ are i.i.d. $\operatorname{Cat}(\mathbf{p})$ and outcome $k$ occurs $c_k$ times, the MLE is $\hat p_k = c_k/N$.
:::

::: proof
Maximise $\ell(\mathbf{p}) = \sum_kc_k\log p_k$ subject to $\sum_kp_k = 1$. With a Lagrange multiplier $\lambda$, set the derivative of $\sum_kc_k\log p_k - \lambda(\sum_kp_k - 1)$ to zero: $c_k/p_k = \lambda$, so $p_k = c_k/\lambda$, and the constraint gives $\lambda = \sum_kc_k = N$. The objective is concave (a sum of concave functions), so the stationary point is the maximum. (Outcomes with $c_k = 0$ get $\hat p_k = 0$, which is also the limit of the formula.) A proof without multipliers follows from Gibbs' inequality in [[math-for-ml/information-theory]].
:::

The same result, applied to each context separately, estimates an $n$-gram language model: the MLE of $p(w\mid u)$ in a bigram model is the number of times $w$ follows $u$ divided by the number of times $u$ is followed by anything, $\hat p(w\mid u) = c(u, w)/c(u)$.

::: example A bigram model, and why counts fail {#ex-bigram}
Estimate a bigram model from the training text *the cat sat . the dog sat . the cat ran .* and use it to score the new sentence *the dog ran .*
::: solution
The word *the* is followed by *cat* twice and *dog* once, so $\hat p(\textit{cat}\mid\textit{the}) = 2/3$ and $\hat p(\textit{dog}\mid\textit{the}) = 1/3$. *Dog* is followed only by *sat*, so $\hat p(\textit{ran}\mid\textit{dog}) = 0$, and *ran* only by *.*, so $\hat p(.\mid\textit{ran}) = 1$. The new sentence gets probability $\frac13\cdot0\cdot1 = 0$, and its negative log-likelihood is infinite: a perfectly reasonable sentence is declared impossible because one pair never appeared in training. The code below repeats the computation with **add-one smoothing**, which adds $1$ to every count, $\hat p(w\mid u) = (c(u, w) + 1)/(c(u) + \lvert\mathcal{V}\rvert)$, with $\lvert\mathcal{V}\rvert = 6$ word types here.
:::
:::

```python
import math
from collections import Counter

train = "the cat sat . the dog sat . the cat ran .".split()
vocab = sorted(set(train))                       # 6 word types
pairs = Counter(zip(train, train[1:]))           # bigram counts c(u, w)
first = Counter(train[:-1])                      # c(u) = number of bigrams starting with u

def p_mle(w, u):
    return pairs[(u, w)] / first[u]

def p_add_one(w, u):
    return (pairs[(u, w)] + 1) / (first[u] + len(vocab))

test = "the dog ran .".split()
for name, p in [("MLE", p_mle), ("add-one", p_add_one)]:
    probs = [p(w, u) for u, w in zip(test, test[1:])]
    nll = sum(-math.log(q) if q > 0 else math.inf for q in probs)
    print(name, [round(q, 3) for q in probs], "NLL", round(nll, 3))
```

```text
MLE [0.333, 0.0, 1.0] NLL inf
add-one [0.222, 0.143, 0.286] NLL 4.703
```

Smoothing gives every unseen pair a small probability (here $\hat p(\textit{ran}\mid\textit{dog}) = 1/7$) at the cost of lowering the seen ones. It is not an ad hoc fix: [[#sec-map]] shows that it is a Bayesian estimate under a prior that considers every continuation possible.

::: warning Maximum likelihood overfits small data
The MLE matches the data as closely as the model allows, including its accidents. With few observations per parameter it assigns zero probability to everything unseen, and a model trained to the maximum of its likelihood on a small data set does well on that data and badly on new data. Neural language models avoid the zero-count problem because the softmax never outputs exactly zero and because similar contexts share parameters, but the same principle applies to them: the training loss alone says nothing about generalisation, and it must be compared with the loss on held-out data.
:::

## The Gaussian and least squares {#sec-gaussian-mle}

::: proposition MLE of a Gaussian, and least squares {#prop-gaussian-mle}
(a) If $x_1, \dots, x_N$ are i.i.d. $\Normal(\mu, \sigma^2)$, the MLEs are the sample mean and the uncorrected sample variance,

$$
\hat\mu = \frac1N\sum_nx_n,\qquad\hat\sigma^2 = \frac1N\sum_n(x_n - \hat\mu)^2.
$$

(b) If $y_n = f_\theta(\mathbf{x}_n) + \varepsilon_n$ with i.i.d. noise $\varepsilon_n\sim\Normal(0, \sigma^2)$ and $\sigma$ fixed, maximising the likelihood of the $y_n$ over $\theta$ is the same as minimising the sum of squared errors $\sum_n(y_n - f_\theta(\mathbf{x}_n))^2$.
:::

::: proof
(a) $\ell(\mu, \sigma^2) = -\frac N2\log(2\pi\sigma^2) - \frac1{2\sigma^2}\sum_n(x_n - \mu)^2$. Setting $\partial\ell/\partial\mu = \frac1{\sigma^2}\sum_n(x_n - \mu) = 0$ gives $\hat\mu$. Setting $\partial\ell/\partial\sigma^2 = -\frac N{2\sigma^2} + \frac1{2\sigma^4}\sum_n(x_n - \hat\mu)^2 = 0$ gives $\hat\sigma^2$.

(b) The log-likelihood is $-\frac N2\log(2\pi\sigma^2) - \frac1{2\sigma^2}\sum_n(y_n - f_\theta(\mathbf{x}_n))^2$; the first term does not depend on $\theta$ and the second is a negative constant times the sum of squares.
:::

Part (b) is why mean squared error is the default loss for regression and why Gauss could justify least squares by assuming normal errors (see the history note). The general lesson: **choosing a loss is choosing a noise model.** Squared error assumes Gaussian noise; absolute error assumes Laplace noise; cross-entropy on a softmax assumes the target is a categorical draw.

::: example The MLE of a variance is biased {#ex-variance}
For the data $2, 4, 4, 4, 5, 5, 7, 9$, compute $\hat\mu$, the MLE $\hat\sigma^2$, and the corrected estimate $s^2 = \frac{1}{N-1}\sum_n(x_n - \hat\mu)^2$.
::: solution
$\hat\mu = 40/8 = 5$. The squared deviations are $9, 1, 1, 1, 0, 0, 4, 16$, summing to $32$, so $\hat\sigma^2 = 32/8 = 4$ and $s^2 = 32/7 = 4.571$. The MLE is smaller because the deviations are measured from $\hat\mu$, which is fitted to these very points and so is closer to them than the true mean is; on average this makes $\hat\sigma^2$ too small by the factor $(N-1)/N$ (exercise 9). With $8$ points the difference is $12\%$; with a million it is negligible.
:::
:::

## Bias, variance and error {#sec-bias-variance}

An estimator is a function of random data, so it is itself random: a different sample gives a different estimate. Two numbers describe how it errs.

::: definition Bias, variance and mean squared error {#def-bias}
Let $\hat\theta$ be an estimator of a parameter $\theta$ computed from random data. Its **bias** is $\E[\hat\theta] - \theta$, its **variance** is $\Var(\hat\theta)$, and its **mean squared error** is $\operatorname{MSE}(\hat\theta) = \E\big[(\hat\theta - \theta)^2\big]$. It is **unbiased** if its bias is zero, and **consistent** if $\hat\theta\to\theta$ in probability as the sample size grows.
:::

::: proposition Bias–variance decomposition {#prop-bias-variance}
$$
\operatorname{MSE}(\hat\theta) = \big(\E[\hat\theta] - \theta\big)^2 + \Var(\hat\theta).
$$
:::

::: proof
Write $m = \E\hat\theta$. Then $\hat\theta - \theta = (\hat\theta - m) + (m - \theta)$, and

$$
\E\big[(\hat\theta - \theta)^2\big] = \E\big[(\hat\theta - m)^2\big] + 2(m - \theta)\,\E[\hat\theta - m] + (m - \theta)^2 = \Var(\hat\theta) + 0 + (m - \theta)^2.
$$
:::

Unbiasedness is not the goal; small error is. A slightly biased estimator with much lower variance can be better, and that is the logic of regularisation and smoothing: they pull estimates towards a default (zero weights, uniform probabilities), introducing bias, in exchange for a large reduction in variance when data are scarce. Under standard regularity conditions the MLE is consistent and, for large samples, approximately unbiased with the smallest possible variance among such estimators — but these are large-sample guarantees, and they say nothing about a model with more parameters than data points.

The same decomposition, applied to the predictions of a learned model averaged over random training sets, gives the classical **bias–variance trade-off** of model complexity: simple models are biased, flexible models have high variance, and the best test error lies in between (Geman, Bienenstock and Doursat, 1992). Large neural networks complicate that picture. Belkin et al. (2019) and Nakkiran et al. (2020) documented **double descent**: as model size grows past the point where the training data can be fitted exactly, test error can fall again. This is an empirical finding about trained networks, the subject of [[ml-fundamentals]] rather than a theorem of estimation.

## Maximum a posteriori estimation {#sec-map}

::: definition MAP estimate {#def-map}
With a **prior** density $p(\theta)$ on the parameters, Bayes' rule ([[math-for-ml/probability#thm-bayes]]) gives the **posterior** $p(\theta\mid\mathcal{D})\propto p(\mathcal{D}\mid\theta)\,p(\theta)$. The **maximum a posteriori** (MAP) estimate is

$$
\hat\theta_{\text{MAP}} = \arg\max_\theta\Big[\sum_n\log p_\theta(x_n) + \log p(\theta)\Big].
$$

The normalising constant $p(\mathcal{D})$ does not depend on $\theta$ and drops out.
:::

The MAP objective is the log-likelihood plus a penalty $\log p(\theta)$, which does not grow with $N$: with little data the prior matters a lot, with much data the likelihood dominates and MAP approaches the MLE.

::: proposition A Gaussian prior is weight decay {#prop-weight-decay}
If the prior makes the parameters independent $\Normal(0, \tau^2)$, then

$$
\hat\theta_{\text{MAP}} = \arg\min_\theta\Big[-\sum_n\log p_\theta(x_n) + \frac{1}{2\tau^2}\lVert\theta\rVert^2\Big],
$$

the negative log-likelihood with an **$\ell_2$ penalty** of strength $\lambda = 1/(2\tau^2)$. A Laplace prior $p(\theta_i)\propto e^{-\lvert\theta_i\rvert/b}$ gives instead the $\ell_1$ penalty $\frac1b\lVert\theta\rVert_1$.
:::

::: proof
$\log p(\theta) = \sum_i\log\big(e^{-\theta_i^2/2\tau^2}/\sqrt{2\pi\tau^2}\big) = -\frac{1}{2\tau^2}\lVert\theta\rVert^2 + \text{const}$. Maximising the log-likelihood plus this is minimising its negative. The Laplace case is the same with $\log p(\theta_i) = -\lvert\theta_i\rvert/b + \text{const}$.
:::

A narrow prior (small $\tau$) means a strong belief that weights are small and a large penalty. With plain gradient descent, the $\ell_2$ penalty adds $\theta/\tau^2$ to the gradient, so each step shrinks every weight by a constant fraction — hence the name **weight decay**. (For adaptive optimisers such as Adam, decaying the weights directly and adding the penalty to the loss are no longer the same thing; Loshchilov and Hutter's AdamW, discussed in [[math-for-ml/optimisation]], decouples the two.)

For a Bernoulli or categorical parameter the natural prior is the **Beta** (or **Dirichlet**) distribution, $p(q)\propto q^{\alpha-1}(1 - q)^{\beta-1}$ on $[0, 1]$. It is **conjugate**: after $k$ successes in $N$ trials the posterior is $\operatorname{Beta}(\alpha + k, \beta + N - k)$, so the prior acts like $\alpha - 1$ imaginary successes and $\beta - 1$ imaginary failures. The posterior mode (MAP) is $(k + \alpha - 1)/(N + \alpha + \beta - 2)$ and the posterior mean is $(k + \alpha)/(N + \alpha + \beta)$.

::: example Smoothing as a Bayesian estimate {#ex-beta}
For the $7$ correct answers out of $10$ of [[#ex-coin]], compute the MAP estimate and the posterior mean under a uniform prior $\operatorname{Beta}(1, 1)$ and under $\operatorname{Beta}(2, 2)$. Which prior turns the MAP estimate into add-one smoothing?
::: solution
Under $\operatorname{Beta}(1, 1)$ the posterior is $\operatorname{Beta}(8, 4)$: MAP $7/10 = 0.7$ (the uniform prior changes nothing), posterior mean $8/12 = 0.667$. Under $\operatorname{Beta}(2, 2)$ the posterior is $\operatorname{Beta}(9, 5)$: MAP $8/12 = 0.667$, posterior mean $9/14 = 0.643$. The $\operatorname{Beta}(2, 2)$ MAP adds one imaginary success and one imaginary failure: $(k + 1)/(N + 2)$, which is add-one smoothing for two outcomes (and equals Laplace's rule of succession, the posterior mean under the uniform prior). With $K$ outcomes and a symmetric Dirichlet prior with all parameters $2$, the MAP is $(c_k + 1)/(N + K)$ — exactly the smoothed bigram estimate of [[#ex-bigram]].
:::
:::

::: widget bayes
mode: beta
a: 2
b: 2
successes: 7
trials: 10
caption: The prior $\operatorname{Beta}(2, 2)$ and the posterior after $7$ successes in $10$ trials, as in [[#ex-beta]]. Increase the number of trials at the same success rate and the posterior narrows around $0.7$ while the prior's influence fades; make the prior stronger (larger $a$ and $b$) and more data are needed to move it.
:::

::: quiz
A model is trained by minimising the average cross-entropy on its training tokens plus $\lambda\lVert\theta\rVert^2$. Which description is correct?
- [ ] Maximum-likelihood estimation with a uniform prior
- [x] MAP estimation with a zero-mean Gaussian prior on the parameters
- [ ] MAP estimation with a Laplace prior on the parameters
- [ ] Bayesian inference: the result is the full posterior distribution
::: solution
By [[#prop-weight-decay]] an $\ell_2$ penalty is the negative log of a zero-mean Gaussian prior, so minimising loss plus penalty is MAP estimation. A Laplace prior gives an $\ell_1$ penalty. MAP returns one point, the posterior's mode, not the whole distribution; full Bayesian inference would average predictions over the posterior.
:::
:::

## Maximum likelihood for language models {#sec-lm-mle}

A neural language model is trained exactly by [[#eq-nll]]. Treat a training corpus as one long sequence of tokens $x_1, \dots, x_N$. By the chain rule of probability ([[math-for-ml/probability#prop-chain-rule]]), the model's log-likelihood of the corpus is $\sum_t\log p_\theta(x_t\mid x_{<t})$ (in practice the corpus is cut into windows, and the context is the window so far), and the average negative log-likelihood is

$$
\mathcal{L}(\theta) = -\frac1N\sum_{t=1}^N\log p_\theta(x_t\mid x_{<t}),
$$

the familiar per-token cross-entropy loss. Each term is $-\log\operatorname{softmax}(\mathbf{z}_t)_{x_t}$, whose gradient with respect to the logits is $\mathbf{p}_t - \mathbf{e}_{x_t}$ ([[math-for-ml/gradients#prop-softmax-ce]]). Three remarks connect this to the rest of the chapter.

- The tokens of a text are not independent, but the factorisation makes the likelihood a product of conditional probabilities, and the MLE theory applies to the conditional model.
- Pretraining corpora are so large relative to the number of passes over them that a language model often sees each token only once or a few times. The training loss on new batches is then itself an estimate of the loss on unseen data, and overfitting in the classical sense is rare; the classical form returns when data are repeated many times or a model is fine-tuned on a small set.
- Weight decay in language-model training is usually described as a regulariser, consistent with [[#prop-weight-decay]], though in practice its effect on optimisation dynamics may matter as much as its prior interpretation.

[[math-for-ml/information-theory]] shows that minimising this loss is the same as minimising the KL divergence from the data distribution to the model.

## The statistics of evaluation {#sec-evaluation}

The other half of estimation is uncertainty. A benchmark score is an estimate, from a finite sample of questions, of how a model would do on the whole population of similar questions, and it comes with a standard error.

::: definition Standard error and confidence interval {#def-ci}
The **standard error** of an estimator is its standard deviation. For an accuracy $\hat p$ measured on $n$ independent questions it is $\operatorname{SE} = \sqrt{p(1 - p)/n}\approx\sqrt{\hat p(1 - \hat p)/n}$. An approximate **95% confidence interval** is $\hat p\pm1.96\,\operatorname{SE}$: a procedure that, over repeated samples, produces intervals containing the true value about $95\%$ of the time.
:::

The factor $1.96$ comes from the central limit theorem: for large $n$ the estimate is approximately normal, and a normal variable lies within $1.96$ standard deviations of its mean with probability $0.95$. For accuracies near $0$ or $1$, or for small $n$, better intervals exist (the Wilson interval is a common choice); the bootstrap — resampling the questions with replacement and recomputing the score — gives intervals for any metric.

::: widget confidence
dist: bernoulli
n: 100
level: 0.95
intervals: 50
method: z
caption: Fifty simulated benchmarks of $100$ questions each, with a $95\%$ interval computed from each. About $95\%$ of the intervals contain the true accuracy and about $5\%$ miss it — but any single interval either contains it or does not. Increase $n$ and the intervals shrink like $1/\sqrt n$.
:::

::: example Is model A better than model B? {#ex-compare}
On the same $1000$ questions, model A scores $72\%$ and model B $70\%$. Give a $95\%$ interval for A's accuracy. Then judge the difference (a) treating the two scores as independent and (b) using the fact that A alone is right on $60$ questions and B alone on $40$.
::: solution
$\operatorname{SE}_A = \sqrt{0.72\cdot0.28/1000} = 0.0142$, so the interval is $0.72\pm0.028$, about $[0.692, 0.748]$.

(a) If the scores were independent, the difference $0.02$ would have $\operatorname{SE} = \sqrt{0.0142^2 + 0.0145^2} = 0.0203$, giving $z = 0.02/0.0203 = 0.99$: no evidence of a difference.

(b) The scores are not independent — both models are tested on the same questions, and most questions are easy or hard for both. Per question, let $d = +1$ if only A is right, $-1$ if only B is right, $0$ otherwise. Then $\bar d = (60 - 40)/1000 = 0.02$, $\E d^2 = 100/1000 = 0.1$, $\Var d = 0.1 - 0.0004 = 0.0996$, and $\operatorname{SE} = \sqrt{0.0996/1000} = 0.0100$, so $z = 2.0$. The **paired** analysis, which uses the questions on which the models disagree, is twice as sensitive and finds the difference borderline significant at the $5\%$ level.
:::
:::

::: warning Many comparisons and noisy leaderboards
A $95\%$ interval misses $5\%$ of the time. Compare twenty model variants on the same benchmark and, even if none is really better, one will typically look significantly better by chance; choosing the best of many runs, prompts or checkpoints on the test set inflates its score in the same way. Report how many configurations were tried, keep a held-out test set for the final number, and treat small differences on small benchmarks with suspicion. The evaluation course of the atlas ([[evaluation]]) returns to these problems.
:::

::: history
Gauss, in his *Theoria motus* (1809), justified least squares by assuming normally distributed errors — in effect the first maximum-likelihood argument — and Laplace's rule of succession (1814) estimated the probability that the sun will rise tomorrow with what is now the posterior mean under a uniform prior, the origin of add-one smoothing. Ronald Fisher introduced maximum likelihood as a general method in 1912 and developed its theory, including consistency and efficiency, in *On the mathematical foundations of theoretical statistics* (1922). Jerzy Neyman defined confidence intervals in 1937. For language, I. J. Good, building on wartime work with Alan Turing, published the Good–Turing estimate of the probability of unseen events in 1953, and smoothing methods for $n$-gram models were refined through the 1990s, culminating in the comparisons of Chen and Goodman (1998). Andrey Tikhonov's regularisation (1943, 1963) and Hoerl and Kennard's ridge regression (1970) introduced the $\ell_2$ penalty, and Tibshirani's lasso (1996) the $\ell_1$ penalty. Bradley Efron introduced the bootstrap in 1979.
:::

::: summary
- The likelihood is the probability of the data as a function of the parameters; maximum likelihood minimises the average negative log-likelihood, which for a language model is the per-token cross-entropy loss.
- For Bernoulli and categorical models the MLE is the observed frequency; for a Gaussian it is the sample mean and the uncorrected variance; with Gaussian noise it is least squares. Choosing a loss is choosing a noise model.
- MSE = bias² + variance. The MLE overfits small data (zero counts); smoothing and regularisation trade a little bias for less variance.
- MAP adds the log-prior to the log-likelihood: a Gaussian prior is $\ell_2$ weight decay, a Laplace prior is $\ell_1$, and a Beta or Dirichlet prior is additive smoothing.
- A benchmark score has standard error $\sqrt{p(1-p)/n}$; compare models on the same questions with a paired analysis, and beware of many comparisons.
:::

## Exercises

::: exercise A Bernoulli MLE {level=1 check="0.3"}
A filter flags $12$ of $40$ requests. Under a Bernoulli model, what is the MLE of the flag rate?
::: solution
By [[#prop-bernoulli-mle]], $\hat p = 12/40 = 0.3$.
:::
:::

::: exercise A smoothed bigram {level=1 check="1/3"}
In the training text of [[#ex-bigram]], estimate $p(\textit{cat}\mid\textit{the})$ with add-one smoothing.
::: solution
$c(\textit{the}, \textit{cat}) = 2$, $c(\textit{the}) = 3$ and $\lvert\mathcal{V}\rvert = 6$, so the estimate is $(2 + 1)/(3 + 6) = 1/3$, down from the MLE $2/3$: the probability taken away is spread over the five continuations never seen after *the*.
:::
:::

::: exercise Variance estimates {level=1 check="5"}
For the data $1, 3, 5, 7$, compute the MLE of the variance and the corrected estimate $s^2$. What is the MLE?
::: solution
$\hat\mu = 4$, the squared deviations are $9, 1, 1, 9$ with sum $20$, so $\hat\sigma^2 = 20/4 = 5$ and $s^2 = 20/3\approx6.67$.
:::
:::

::: exercise A Beta posterior {level=2 check="5/7"}
With a $\operatorname{Beta}(3, 3)$ prior on a success probability, a model succeeds on $8$ of $10$ tasks. What is the posterior, and what are the MAP estimate and the posterior mean? Give the MAP estimate.
::: solution
The posterior is $\operatorname{Beta}(3 + 8, 3 + 2) = \operatorname{Beta}(11, 5)$. The MAP is $(11 - 1)/(11 + 5 - 2) = 10/14 = 5/7\approx0.714$ and the posterior mean is $11/16 = 0.6875$, both pulled from the MLE $0.8$ towards the prior's centre $0.5$.
:::
:::

::: exercise A shrinkage estimator {level=2 check="0.8"}
Let $\bar X$ be the mean of $n$ i.i.d. observations with mean $\mu$ and variance $\sigma^2$, and consider $\hat\mu_c = c\bar X$ for a constant $c$. Find its bias, variance and MSE, and the $c$ that minimises the MSE when $\mu = 1$ and $\sigma^2/n = 0.25$. What is that $c$?
::: solution
Bias $(c - 1)\mu$, variance $c^2\sigma^2/n$, so by [[#prop-bias-variance]] $\operatorname{MSE}(c) = (1 - c)^2\mu^2 + c^2\sigma^2/n$. Setting the derivative $-2(1 - c)\mu^2 + 2c\sigma^2/n$ to zero gives $c = \mu^2/(\mu^2 + \sigma^2/n) = 1/1.25 = 0.8$. Then $\operatorname{MSE} = 0.04 + 0.16 = 0.20$, against $0.25$ for the unbiased $\bar X$. (The optimal $c$ depends on the unknown $\mu$, so this is an illustration, not a usable estimator; practical shrinkage estimators estimate it from data.)
:::
:::

::: exercise Weight decay from a prior {level=2 check="5*10^(-5)"}
A model is trained on $N = 10^6$ examples by minimising the *average* negative log-likelihood plus $\lambda\lVert\theta\rVert^2$. Which value of $\lambda$ corresponds to MAP estimation with a prior $\Normal(0, \tau^2)$ on each parameter, $\tau = 0.1$?
::: solution
By [[#prop-weight-decay]] MAP minimises $-\sum_n\log p_\theta(x_n) + \lVert\theta\rVert^2/(2\tau^2)$. Dividing by $N$ does not move the minimum and gives the average loss plus $\lVert\theta\rVert^2/(2N\tau^2)$, so $\lambda = 1/(2\cdot10^6\cdot0.01) = 5\times10^{-5}$. The same prior corresponds to a smaller penalty on a larger data set: the prior's influence fades as data accumulate.
:::
:::

::: exercise An interval for accuracy {level=2 check="1.96*sqrt(0.75*0.25/400)"}
A model answers $300$ of $400$ questions correctly. Give the approximate $95\%$ confidence interval for its accuracy. What is its half-width?
::: solution
$\hat p = 0.75$, $\operatorname{SE} = \sqrt{0.75\cdot0.25/400} = 0.0217$, and the half-width is $1.96\cdot0.0217 = 0.0424$: the interval is about $[0.708, 0.792]$, more than eight percentage points wide.
:::
:::

::: exercise Least squares with unknown noise {level=3}
In part (b) of [[#prop-gaussian-mle]], let $\sigma^2$ also be unknown. Show that the MLE of $\theta$ is still the least-squares fit $\hat\theta$, and that $\hat\sigma^2 = \frac1N\sum_n\big(y_n - f_{\hat\theta}(\mathbf{x}_n)\big)^2$, the mean squared residual. What is the maximised log-likelihood in terms of $\hat\sigma^2$?
::: solution
For any fixed $\sigma^2$ the log-likelihood is maximised over $\theta$ by minimising the sum of squares $S(\theta)$, and the minimiser $\hat\theta$ does not depend on $\sigma^2$. Then maximise $-\frac N2\log(2\pi\sigma^2) - S(\hat\theta)/(2\sigma^2)$ over $\sigma^2$: the derivative $-\frac N{2\sigma^2} + \frac{S(\hat\theta)}{2\sigma^4}$ vanishes at $\sigma^2 = S(\hat\theta)/N$. Substituting, the maximum is $-\frac N2\big(\log(2\pi\hat\sigma^2) + 1\big)$: a model with smaller residual variance has higher likelihood, by $\frac N2$ times the log of the ratio of variances.
:::
:::

::: exercise The corrected variance is unbiased {level=3}
Let $x_1, \dots, x_N$ be i.i.d. with mean $\mu$ and variance $\sigma^2$. Show that $\E\big[\sum_n(x_n - \bar x)^2\big] = (N - 1)\sigma^2$, so that $s^2$ is unbiased and the MLE $\hat\sigma^2$ has bias $-\sigma^2/N$.
::: solution
$\sum_n(x_n - \bar x)^2 = \sum_n(x_n - \mu)^2 - N(\bar x - \mu)^2$, by expanding $(x_n - \mu) - (\bar x - \mu)$ and using $\sum_n(x_n - \mu) = N(\bar x - \mu)$. The expectation of the first sum is $N\sigma^2$, and $\E[(\bar x - \mu)^2] = \Var\bar x = \sigma^2/N$. Hence the expectation is $N\sigma^2 - \sigma^2 = (N - 1)\sigma^2$. Dividing by $N - 1$ gives an unbiased estimate; dividing by $N$ gives $\E\hat\sigma^2 = \frac{N-1}N\sigma^2$, a bias of $-\sigma^2/N$.
:::
:::

::: exercise Maximum likelihood matches moments {level=3}
A softmax classifier has logits $\mathbf{z} = W\mathbf{x}$ and is fitted by maximum likelihood to pairs $(\mathbf{x}_n, y_n)$, $n = 1, \dots, N$. Show that the gradient of the total negative log-likelihood with respect to $W$ is $\sum_n(\mathbf{p}_n - \mathbf{e}_{y_n})\mathbf{x}_n^\top$, and deduce that at a maximum of the likelihood, for every class $k$, $\sum_n p_{n,k}\mathbf{x}_n = \sum_{n: y_n = k}\mathbf{x}_n$. Interpret this "moment matching" condition.
::: solution
For one example the loss is $-\log\operatorname{softmax}(W\mathbf{x}_n)_{y_n}$, with gradient $\mathbf{p}_n - \mathbf{e}_{y_n}$ with respect to the logits ([[math-for-ml/gradients#prop-softmax-ce]]), and by the linear-layer rule ([[math-for-ml/gradients#prop-linear-grad]]) the gradient with respect to $W$ is $(\mathbf{p}_n - \mathbf{e}_{y_n})\mathbf{x}_n^\top$. Summing over examples and setting the gradient to zero, row $k$ reads $\sum_n(p_{n,k} - [y_n = k])\mathbf{x}_n^\top = \mathbf{0}$, which is the stated identity. It says that, at the MLE, the total of each feature over the examples the model *expects* to be in class $k$ (weighted by its probabilities) equals the total over the examples that *are* in class $k$. If one feature is a constant $1$ (a bias), this includes $\sum_np_{n,k} = \#\{n: y_n = k\}$: the model's predicted class frequencies match the observed ones on the training data.
:::
:::
