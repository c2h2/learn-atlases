During the Second World War, Allied statisticians were asked how many tanks Germany was producing. Captured tanks carried serial numbers, and if production is numbered $1, 2, \ldots, N$, the serial numbers seen on captured tanks are like a random sample from $\{1,\ldots,N\}$. Suppose four captured tanks have serial numbers $19$, $40$, $42$ and $60$. What is the best guess for $N$? The largest number seen, $60$, is surely too small, since the largest serial number in a sample can only underestimate the largest in existence. Twice the average, $80.5$, has the right average behaviour but can even come out below the largest observed number. The estimates the statisticians actually used, built from the sample maximum, turned out after the war to be far more accurate than intelligence reports, which were several times too high.

This chapter is about **point estimation**: using data to produce a single best guess for an unknown parameter. Many different estimators are possible, so we first need criteria for comparing them: **bias**, **variance**, **mean squared error** and **consistency**. Then we meet two general methods for constructing estimators, the **method of moments** and **maximum likelihood**, and finally the **Cramér–Rao bound**, which says how precise an unbiased estimator can possibly be, and shows that maximum likelihood is, in large samples, as good as it gets.

## Estimators and their properties {#properties}

Throughout, $X_1,\ldots,X_n$ is a random sample from a distribution that depends on an unknown parameter $\theta$ (a number, or a vector of numbers), lying in a known set $\Theta$ of possible values. We write $\Prob_\theta$ and $\E_\theta$ for probabilities and expectations computed when $\theta$ is the true value.

::: definition Estimator {#def-estimator}
An **estimator** of $\theta$ is a statistic $\hat\theta = T(X_1,\ldots,X_n)$ used to guess $\theta$; its value $T(x_1,\ldots,x_n)$ for observed data is an **estimate**. The **bias** of $\hat\theta$ is $\operatorname{bias}_\theta(\hat\theta) = \E_\theta\hat\theta - \theta$, and $\hat\theta$ is **unbiased** if its bias is $0$ for every $\theta\in\Theta$. Its **mean squared error** is

$$
\operatorname{MSE}_\theta(\hat\theta) = \E_\theta\bigl(\hat\theta-\theta\bigr)^2 .
$$
:::

An estimator is a *procedure*; bias and MSE describe how the procedure performs over repeated samples, not how close any particular estimate is to the truth. We have already met two unbiased estimators: the sample mean $\bar X$ for the population mean $\mu$, and the sample variance $S^2$ for $\sigma^2$ ([[statistics/sampling#thm-sample-moments]]).

::: theorem Bias–variance decomposition {#thm-mse}
If $\hat\theta$ has finite variance, then

$$
\operatorname{MSE}_\theta(\hat\theta) = \Var_\theta(\hat\theta) + \bigl(\operatorname{bias}_\theta(\hat\theta)\bigr)^2 .
$$
:::

::: proof
Write $m = \E_\theta\hat\theta$, so that $\hat\theta - \theta = (\hat\theta - m) + (m - \theta)$, where $m-\theta$ is the bias, a constant. Expanding the square,

$$
\E_\theta(\hat\theta-\theta)^2 = \E_\theta(\hat\theta-m)^2 + 2(m-\theta)\,\E_\theta(\hat\theta - m) + (m-\theta)^2 = \Var_\theta(\hat\theta) + (m-\theta)^2,
$$

because $\E_\theta(\hat\theta-m) = 0$.
:::

The decomposition shows a trade-off: an estimator can have small MSE by being unbiased with moderate variance, or by accepting a little bias in return for a large reduction in variance. Unbiasedness is attractive, but it is not sacred.

::: example Dividing by n − 1, n or n + 1 {#ex-variance-divisors}
For a normal sample, compare the estimators $\frac1d\sum_i(X_i-\bar X)^2$ of $\sigma^2$ with divisors $d = n-1$ (the sample variance $S^2$), $d = n$ and $d = n+1$.
::: solution
Let $Q = \sum_i(X_i - \bar X)^2$. By [[statistics/sampling#thm-normal-sample]], $Q/\sigma^2\sim\chi^2_{n-1}$, so $\E Q = (n-1)\sigma^2$ and $\Var Q = 2(n-1)\sigma^4$. For the estimator $Q/d$, the bias is $\bigl(\frac{n-1}{d}-1\bigr)\sigma^2$ and the variance is $\frac{2(n-1)}{d^2}\sigma^4$, so by [[#thm-mse]]

$$
\frac{\operatorname{MSE}}{\sigma^4} = \frac{2(n-1)}{d^2} + \Bigl(\frac{n-1}{d}-1\Bigr)^2 .
$$

For $d = n-1$ this is $\frac{2}{n-1}$; for $d = n$ it is $\frac{2(n-1)}{n^2}+\frac{1}{n^2} = \frac{2n-1}{n^2}$, which is smaller since $(2n-1)(n-1)<2n^2$; and minimising over $d$ (set the derivative with respect to $1/d$ to zero) gives the optimum $d = n+1$, with MSE $\frac{2}{n+1}\sigma^4$. So the unbiased $S^2$ has the *largest* mean squared error of the three. With $n = 10$: $0.222\sigma^4$, $0.190\sigma^4$ and $0.182\sigma^4$.
:::
:::

::: widget plot
f: 2*(n - 1)/x^2 + ((n - 1)/x - 1)^2
x: 2, 30
y: 0, 1
sliders: n=10:3:25:1
labels: \text{MSE}/\sigma^4 \text{ against divisor } d
caption: Mean squared error of $\frac1d\sum(X_i-\bar X)^2$ as an estimator of $\sigma^2$ for normal data, as a function of the divisor $d$. The minimum is at $d = n+1$, slightly to the right of the unbiased choice $d = n - 1$. The curve is flat near its minimum, so for moderate $n$ the choice matters little; small divisors (too little shrinkage) are much worse than large ones.
:::

A minimal requirement for any sensible estimator is that it should home in on the truth as the sample grows.

::: definition Consistency {#def-consistent}
A sequence of estimators $\hat\theta_n$ (one for each sample size $n$) is **consistent** for $\theta$ if $\hat\theta_n\xrightarrow{\;\Prob\;}\theta$ for every $\theta\in\Theta$: for every $\eps>0$, $\Prob_\theta(\lvert\hat\theta_n-\theta\rvert\ge\eps)\to0$ as $n\to\infty$.
:::

::: theorem Mean square convergence implies consistency {#thm-consistency}
If $\operatorname{MSE}_\theta(\hat\theta_n)\to0$ for every $\theta$ — equivalently, both the bias and the variance tend to $0$ — then $\hat\theta_n$ is consistent.
:::

::: proof
By Markov's inequality ([[probability/limit-theorems#thm-markov]]) applied to the non-negative random variable $(\hat\theta_n-\theta)^2$,

$$
\Prob_\theta\bigl(\lvert\hat\theta_n-\theta\rvert\ge\eps\bigr) = \Prob_\theta\bigl((\hat\theta_n-\theta)^2\ge\eps^2\bigr)\le\frac{\operatorname{MSE}_\theta(\hat\theta_n)}{\eps^2}\to0 .
$$

The equivalence with bias and variance tending to $0$ is [[#thm-mse]].
:::

For example $\bar X$ is consistent for $\mu$ (this is the weak law of large numbers), and both $S^2$ and the divisor-$n$ estimator are consistent for $\sigma^2$ when the fourth moment is finite.

::: quiz
An estimator $\hat\theta$ has bias $0.3$ and standard deviation $0.4$. What is its mean squared error?
- [ ] $0.07$
- [x] $0.25$
- [ ] $0.5$
- [ ] $0.7$
::: solution
By [[#thm-mse]], $\operatorname{MSE} = 0.4^2 + 0.3^2 = 0.16 + 0.09 = 0.25$; the root mean squared error is $0.5$. Bias and standard deviation combine like the two shorter sides of a right-angled triangle, not by simple addition.
:::
:::

## The method of moments {#moments}

The oldest general recipe for estimators equates population moments with sample moments. If the population mean is a known function of $\theta$, $\E_\theta X = m_1(\theta)$, set it equal to the sample mean and solve for $\theta$. With $k$ parameters, use the first $k$ moments: $m_j(\theta) = \E_\theta X^j$ is matched with $\frac1n\sum_iX_i^j$ for $j = 1,\ldots,k$. The resulting **method of moments** estimators are usually easy to compute and consistent (sample moments converge to population moments by the law of large numbers), but not always efficient or even sensible.

::: example Moments for a gamma model {#ex-gamma-moments}
For the gamma distribution with shape $\alpha$ and rate $\lambda$ (the distribution of [[probability/joint-distributions#eq-gamma]], with $\alpha$ allowed to be any positive number), $\E X = \alpha/\lambda$ and $\Var X = \alpha/\lambda^2$. Find the method of moments estimators, and evaluate them for data with $\bar x = 4$ and $\frac1n\sum(x_i-\bar x)^2 = 8$.
::: solution
Matching the first two moments is equivalent to matching the mean and the variance: $\alpha/\lambda = \bar x$ and $\alpha/\lambda^2 = \hat\sigma^2$, where $\hat\sigma^2 = \frac1n\sum(x_i-\bar x)^2$. Dividing, $\lambda = \bar x/\hat\sigma^2$, and then $\alpha = \bar x\lambda = \bar x^2/\hat\sigma^2$:

$$
\hat\lambda = \frac{\bar x}{\hat\sigma^2},\qquad\hat\alpha = \frac{\bar x^2}{\hat\sigma^2}.
$$

With the given data, $\hat\lambda = 4/8 = 0.5$ and $\hat\alpha = 16/8 = 2$. Maximum likelihood for the gamma model has no closed form and must be computed numerically, so the moment estimates are often used as its starting values.
:::
:::

For the tank problem, model the serial numbers as uniform on $\{1,\ldots,N\}$, with mean $\frac{N+1}{2}$. The method of moments gives $\hat N = 2\bar X - 1$, which for the data $19, 40, 42, 60$ is $2\times40.25 - 1 = 79.5$. If the four numbers had been $5, 6, 7, 60$, the same formula would give $38$, less than a serial number actually observed — an estimate that is impossible given the data. Maximum likelihood avoids this.

## Maximum likelihood {#mle}

The idea of maximum likelihood is to choose the parameter value that makes the observed data most probable.

::: definition Likelihood and maximum likelihood estimator {#def-likelihood}
Let $f(x;\theta)$ be the pmf or density of the population. For observed data $x_1,\ldots,x_n$, the **likelihood function** is

$$
L(\theta) = \prod_{i=1}^nf(x_i;\theta),\qquad\theta\in\Theta,
$$

and the **log-likelihood** is $\ell(\theta) = \ln L(\theta) = \sum_i\ln f(x_i;\theta)$. A **maximum likelihood estimate** $\hat\theta$ is a value of $\theta$ that maximises $L$ (equivalently $\ell$) over $\Theta$; the corresponding statistic is the **maximum likelihood estimator** (MLE).
:::

The likelihood is the joint pmf or density of the sample, viewed as a function of the parameter with the data held fixed. For discrete data $L(\theta)$ is literally the probability of the observed sample. Taking logarithms turns the product into a sum, which is easier to differentiate; when $\ell$ is differentiable and the maximum is in the interior of $\Theta$, the MLE solves the **likelihood equation** $\ell'(\theta) = 0$.

::: example Estimating a proportion {#ex-mle-bernoulli}
In $n$ independent trials with success probability $p$, $k$ successes are observed. Find the MLE of $p$.
::: solution
The likelihood of a particular sequence with $k$ successes is $L(p) = p^k(1-p)^{n-k}$ (using the binomial pmf instead only multiplies by $\binom nk$, which does not change the maximiser). For $0<k<n$,

$$
\ell(p) = k\ln p + (n-k)\ln(1-p),\qquad\ell'(p) = \frac kp - \frac{n-k}{1-p} = 0\iff k(1-p) = (n-k)p\iff p = \frac kn .
$$

Since $\ell''(p) = -k/p^2 - (n-k)/(1-p)^2<0$, this is a maximum. If $k = 0$ or $k = n$, $L$ is monotone and the maximum is at the endpoint $p = 0$ or $p = 1$, again $k/n$. So $\hat p = k/n$, the sample proportion.
:::
:::

::: widget plot
f: (x/h)^(n*h)*((1 - x)/(1 - h))^(n*(1 - h))
x: 0, 1
y: 0, 1.1
sliders: n=20:5:500:5; h=0.35:0.05:0.95:0.01
labels: L(p)/L(\hat p)
caption: The relative likelihood $L(p)/L(\hat p)$ for $n$ trials with observed proportion $\hat p = h$. The curve always peaks at $p = \hat p$ with height $1$. Increase $n$ with $h$ fixed: the curve narrows like $1/\sqrt n$, so the data rule out more and more values of $p$. Parameter values where the relative likelihood is tiny are strongly contradicted by the data.
:::

::: example Exponential waiting times {#ex-mle-exponential}
The waiting times (in minutes) between nine successive calls to a help desk were $2.3, 0.8, 4.1, 1.6, 0.4, 3.2, 1.1, 2.5$. Assuming they are iid $\operatorname{Exp}(\lambda)$, find the MLE of the call rate $\lambda$.
::: solution
The likelihood is $L(\lambda) = \prod_i\lambda e^{-\lambda x_i} = \lambda^ne^{-\lambda\sum x_i}$, so

$$
\ell(\lambda) = n\ln\lambda - \lambda\sum_ix_i,\qquad\ell'(\lambda) = \frac n\lambda - \sum_ix_i = 0\iff\lambda = \frac{n}{\sum_ix_i} = \frac{1}{\bar x}.
$$

Since $\ell''(\lambda) = -n/\lambda^2<0$, this is the maximum. Here $\sum x_i = 16.0$ and $n = 8$, so $\bar x = 2$ minutes and $\hat\lambda = 0.5$ calls per minute. (The estimator $1/\bar X$ is slightly biased upwards — by Jensen's inequality $\E(1/\bar X)>1/\E\bar X$ — although the bias vanishes as $n\to\infty$.)
:::
:::

With several parameters the likelihood is maximised by setting all partial derivatives to zero ([[multivariable/extrema]]).

::: example The normal model {#ex-mle-normal}
Find the MLEs of $\mu$ and $\sigma^2$ from a sample $x_1,\ldots,x_n$ from $\Normal(\mu,\sigma^2)$.
::: solution
Writing $v = \sigma^2$,

$$
\ell(\mu, v) = -\frac n2\ln(2\pi) - \frac n2\ln v - \frac{1}{2v}\sum_i(x_i-\mu)^2 .
$$

For each fixed $v$, $\ell$ is maximised by minimising $\sum(x_i-\mu)^2$ over $\mu$, which happens at $\mu = \bar x$ (an exercise in [[statistics/sampling]]). Substituting $\mu = \bar x$ and differentiating in $v$:

$$
\frac{\partial\ell}{\partial v} = -\frac{n}{2v} + \frac{1}{2v^2}\sum_i(x_i-\bar x)^2 = 0\iff v = \frac1n\sum_i(x_i-\bar x)^2 .
$$

So $\hat\mu = \bar x$ and $\hat\sigma^2 = \frac1n\sum_i(x_i-\bar x)^2$, the divisor-$n$ estimator of [[#ex-variance-divisors]]: maximum likelihood estimators need not be unbiased.
:::
:::

Not every MLE comes from setting a derivative to zero.

::: example The tank problem by maximum likelihood {#ex-tanks}
Model the serial numbers $x_1,\ldots,x_n$ as a random sample from the continuous uniform distribution on $[0,\theta]$. Find the MLE of $\theta$, and compare its mean squared error with that of the method of moments estimator $2\bar X$.
::: solution
The density is $1/\theta$ on $[0,\theta]$, so $L(\theta) = \theta^{-n}$ if $\theta\ge\max_ix_i$, and $L(\theta) = 0$ otherwise (a value of $\theta$ below some observation makes that observation impossible). $L$ is decreasing on $[\max x_i,\infty)$, so the maximum is at the boundary point $\hat\theta = M = \max_iX_i$; the likelihood equation plays no role.

For the distribution of $M$: $\Prob(M\le t) = (t/\theta)^n$ for $0\le t\le\theta$, which gives $\E M = \frac{n}{n+1}\theta$ and $\Var M = \frac{n\theta^2}{(n+1)^2(n+2)}$. So $M$ is biased low, and $\hat\theta_U = \frac{n+1}{n}M$ is unbiased, with variance $\frac{\theta^2}{n(n+2)}$. In contrast $2\bar X$ is unbiased with variance $4\cdot\frac{\theta^2}{12n} = \frac{\theta^2}{3n}$. For $n = 5$:

$$
\operatorname{MSE}(2\bar X) = \frac{\theta^2}{15}\approx0.067\theta^2,\qquad\operatorname{MSE}\Bigl(\tfrac65M\Bigr) = \frac{\theta^2}{35}\approx0.029\theta^2 .
$$

The estimators based on the maximum have variance of order $1/n^2$, much smaller than the $1/n$ of the moment estimator. For the discrete tank problem the analogous unbiased estimator is $M + M/n - 1$, which for the serial numbers $19, 40, 42, 60$ gives $60 + 15 - 1 = 74$.
:::
:::

::: widget plot
f: 1/(3x); 2/((x + 1)*(x + 2)); 1/(x*(x + 2))
x: 1, 20
y: 0, 0.35
labels: 2\bar X; M; \tfrac{n+1}{n}M
caption: Mean squared errors (in units of $\theta^2$) of three estimators of the endpoint $\theta$ of a uniform distribution, as functions of the sample size $n$. The moment estimator $2\bar X$ improves like $1/n$, the maximum $M$ and its unbiased rescaling like $1/n^2$. For $n\ge2$ the rescaled maximum is best, even though the plain maximum is the MLE.
:::

Maximum likelihood estimates behave well under reparametrisation.

::: theorem Invariance of maximum likelihood {#thm-invariance}
If $\hat\theta$ is an MLE of $\theta$ and $g$ is a one-to-one function, then $g(\hat\theta)$ is an MLE of $\eta = g(\theta)$.
:::

::: proof
In terms of $\eta$ the likelihood is $L^*(\eta) = L(g^{-1}(\eta))$. For every $\eta$ in the range of $g$, $L^*(\eta) = L(g^{-1}(\eta))\le L(\hat\theta) = L^*(g(\hat\theta))$, so $g(\hat\theta)$ maximises $L^*$.
:::

(For functions that are not one-to-one, the same conclusion holds with a suitable definition of the likelihood of $\eta$, the profile likelihood.) For example, if counts are modelled as $\operatorname{Poisson}(\lambda)$ then $\hat\lambda = \bar x$ (an exercise), so the MLE of the probability of a zero count, $e^{-\lambda}$, is $e^{-\bar x}$, and the MLE of the standard deviation of a normal population is $\hat\sigma = \sqrt{\hat\sigma^2}$.

::: warning The likelihood is not a probability distribution for θ
$L(\theta)$ is the probability (or density) of the *data* under each value of $\theta$; it is not the probability that $\theta$ is the true value, and it does not integrate to $1$ over $\theta$. Saying "$p = 0.35$ is the most likely value of $p$" is a loose way of saying that $p = 0.35$ makes the data most likely. Turning likelihoods into probabilities for parameters requires a prior distribution and Bayes' theorem — the approach of [[statistics/bayesian]].
:::

## Efficiency and the Cramér–Rao bound {#cramer-rao}

How small can the variance of an unbiased estimator be? Intuitively it depends on how sharply the likelihood is peaked, that is, on how much information each observation carries about $\theta$.

::: definition Score and Fisher information {#def-fisher}
For a one-parameter family $f(x;\theta)$, the **score** of an observation is $\dfrac{\partial}{\partial\theta}\ln f(X;\theta)$, and the **Fisher information** in one observation is

$$
I(\theta) = \E_\theta\Bigl[\Bigl(\frac{\partial}{\partial\theta}\ln f(X;\theta)\Bigr)^2\Bigr].
$$ {#eq-fisher}
:::

We assume throughout this section the usual **regularity conditions**: the set where $f(x;\theta)>0$ does not depend on $\theta$, $f$ is differentiable in $\theta$, and derivatives with respect to $\theta$ may be taken inside integrals (or sums) over $x$. Under these conditions the score has mean zero: differentiating $\int f(x;\theta)\,dx = 1$ gives

$$
0 = \int\frac{\partial f}{\partial\theta}\,dx = \int\Bigl(\frac{\partial}{\partial\theta}\ln f\Bigr)f\,dx = \E_\theta\Bigl[\frac{\partial}{\partial\theta}\ln f(X;\theta)\Bigr],
$$

so $I(\theta)$ is the *variance* of the score. Differentiating once more shows that, if second derivatives exist, $I(\theta) = -\E_\theta\bigl[\frac{\partial^2}{\partial\theta^2}\ln f(X;\theta)\bigr]$ — the average curvature of the log-likelihood.

::: theorem Cramér–Rao lower bound {#thm-cramer-rao}
Under the regularity conditions, let $T = T(X_1,\ldots,X_n)$ be an unbiased estimator of $\theta$ based on a random sample of size $n$, with finite variance, for which differentiation under the integral sign in $\frac{d}{d\theta}\E_\theta T$ is allowed. Then for every $\theta$

$$
\Var_\theta(T)\ge\frac{1}{nI(\theta)}.
$$ {#eq-crlb}
:::

::: proof
Let $U = \sum_{i=1}^n\frac{\partial}{\partial\theta}\ln f(X_i;\theta)$ be the score of the whole sample. It is a sum of $n$ independent terms with mean $0$ and variance $I(\theta)$, so $\E_\theta U = 0$ and $\Var_\theta U = nI(\theta)$. Write $L(\theta;\mathbf x) = \prod_if(x_i;\theta)$ for the joint density, so that $U = \frac{\partial}{\partial\theta}\ln L$. Since $T$ is unbiased, $\int T(\mathbf x)L(\theta;\mathbf x)\,d\mathbf x = \theta$ for all $\theta$; differentiating under the integral sign,

$$
1 = \int T(\mathbf x)\frac{\partial L}{\partial\theta}\,d\mathbf x = \int T(\mathbf x)\Bigl(\frac{\partial}{\partial\theta}\ln L\Bigr)L\,d\mathbf x = \E_\theta(TU) = \Cov_\theta(T,U),
$$

the last step because $\E_\theta U = 0$. By the correlation inequality ([[probability/joint-distributions#thm-correlation-bound]]), $\Cov(T,U)^2\le\Var(T)\Var(U)$, that is $1\le\Var_\theta(T)\cdot nI(\theta)$.
:::

An unbiased estimator whose variance equals the bound is called **efficient**; it is then the best possible unbiased estimator.

::: example Poisson counts {#ex-poisson-efficient}
For a random sample from $\operatorname{Poisson}(\lambda)$, find $I(\lambda)$ and show that $\bar X$ is efficient.
::: solution
$\ln f(x;\lambda) = -\lambda + x\ln\lambda - \ln x!$, so the score is $-1 + x/\lambda$ and

$$
I(\lambda) = \Var_\lambda\Bigl(\frac{X}{\lambda}\Bigr) = \frac{\lambda}{\lambda^2} = \frac1\lambda .
$$

The bound is $\lambda/n$. Since $\Var\bar X = \Var X/n = \lambda/n$ and $\bar X$ is unbiased, it attains the bound: no unbiased estimator of a Poisson mean does better than the sample mean. (The same is true of $\bar X$ for a normal mean, where $I = 1/\sigma^2$, and for a Bernoulli proportion; see the exercises.)
:::
:::

The uniform model of [[#ex-tanks]] violates the regularity conditions, since the support $[0,\theta]$ depends on $\theta$; that is how its estimators manage variances of order $1/n^2$, beating the $1/n$ rate that the bound imposes in regular problems.

The most important property of maximum likelihood is that, in regular problems, it achieves the Cramér–Rao bound asymptotically.

::: theorem Asymptotic normality of the MLE {#thm-mle-asymptotic}
Under regularity conditions (stronger than those above, involving third derivatives), the MLE $\hat\theta_n$ is consistent and

$$
\sqrt n\,(\hat\theta_n-\theta)\xrightarrow{\;d\;}\Normal\Bigl(0,\frac{1}{I(\theta)}\Bigr).
$$
:::

*Proof sketch.* Expand the likelihood equation around the true value: $0 = \ell'(\hat\theta_n)\approx\ell'(\theta) + (\hat\theta_n - \theta)\ell''(\theta)$, so $\sqrt n(\hat\theta_n-\theta)\approx\dfrac{\ell'(\theta)/\sqrt n}{-\ell''(\theta)/n}$. The numerator is a standardised sum of iid scores, approximately $\Normal(0, I(\theta))$ by the central limit theorem; the denominator converges to $I(\theta)$ by the law of large numbers. The ratio is therefore approximately $\Normal(0, I(\theta)/I(\theta)^2) = \Normal(0, 1/I(\theta))$. Making the approximation rigorous requires controlling the remainder; see Casella and Berger, *Statistical Inference*, Section 10.1.

In practice the theorem gives an approximate **standard error** for any MLE: $\operatorname{se}(\hat\theta)\approx1/\sqrt{nI(\hat\theta)}$. For the exponential waiting times of [[#ex-mle-exponential]], $\ln f = \ln\lambda - \lambda x$ has second derivative $-1/\lambda^2$, so $I(\lambda) = 1/\lambda^2$ and $\operatorname{se}(\hat\lambda)\approx\hat\lambda/\sqrt n = 0.5/\sqrt8\approx0.18$ calls per minute. Standard errors of this kind are the basis of the large-sample confidence intervals in [[statistics/confidence-intervals]].

::: quiz
Which of the following is guaranteed for a maximum likelihood estimator in a regular one-parameter model?
- [ ] It is unbiased for every sample size.
- [ ] It has the smallest variance among all estimators.
- [x] It is consistent, and approximately normal with variance $1/(nI(\theta))$ for large $n$.
- [ ] It is always found by solving $\ell'(\theta) = 0$.
::: solution
MLEs are often biased in finite samples (the normal variance MLE divides by $n$), biased estimators can have smaller variance, and the maximum can lie on a boundary (the uniform example). What maximum likelihood guarantees, under regularity conditions, is good *large-sample* behaviour: consistency and asymptotic efficiency.
:::
:::

::: history
Carl Friedrich Gauss justified least squares in 1809 by finding the "most probable" values of unknowns when errors are normally distributed, which amounts to maximum likelihood with a flat prior. Karl Pearson introduced the method of moments in 1894, fitting mixtures of two normal distributions to measurements of crabs. Ronald Fisher proposed maximum likelihood in 1912, as an undergraduate, and in "On the mathematical foundations of theoretical statistics" (1922) introduced the vocabulary of the subject: consistency, efficiency, sufficiency and the likelihood itself; information followed in 1925. The lower bound on the variance of unbiased estimators was found independently by several authors in the 1940s, including Maurice Fréchet (1943), C. R. Rao (1945) and Harald Cramér (1946). The German tank problem was solved by Allied economists and statisticians, among them Richard Ruggles and Henry Brodie, who described their methods in 1947.
:::

## Where this leads {#where-next}

Point estimates are incomplete without a statement of their uncertainty: [[statistics/confidence-intervals]] turns sampling distributions and standard errors into interval estimates. Likelihood ratios give the most powerful tests ([[statistics/hypothesis-testing]]). Least squares, the subject of [[statistics/regression]], is maximum likelihood for normal errors, and its estimators are best among unbiased linear estimators by the Gauss–Markov theorem. In [[statistics/bayesian]] the likelihood is combined with a prior distribution, and the posterior mean emerges as a natural estimator that trades a little bias for lower mean squared error. The theory of sufficient statistics and minimum variance unbiased estimators (the Rao–Blackwell and Lehmann–Scheffé theorems) is the next step; see Casella and Berger.

::: summary
- An estimator is judged over repeated samples: $\operatorname{MSE} = \text{variance} + \text{bias}^2$; unbiasedness is one desirable property, not the only one.
- An estimator is consistent if it converges in probability to $\theta$; MSE tending to $0$ is sufficient.
- Method of moments: match sample moments to population moments. Simple and consistent, sometimes inefficient or even impossible given the data.
- Maximum likelihood: maximise $L(\theta) = \prod f(x_i;\theta)$, usually via $\ell'(\theta) = 0$, but check boundaries and non-differentiable cases.
- MLEs are invariant under reparametrisation, often biased in small samples, and in regular models consistent and asymptotically $\Normal(\theta, 1/(nI(\theta)))$.
- Cramér–Rao: an unbiased estimator has $\Var\ge1/(nI(\theta))$ in regular models; $\bar X$ attains the bound for Poisson, Bernoulli and normal means.
- The likelihood describes how probable the data are under each parameter value; it is not a probability distribution for the parameter.
:::

## Exercises

::: exercise A sample proportion {level=1 check="37/120"}
In a survey of $120$ randomly chosen households, $37$ own an electric car. Give the maximum likelihood estimate of the proportion of households that do.
::: solution
By [[#ex-mle-bernoulli]], $\hat p = 37/120\approx0.308$.
:::
:::

::: exercise A bias {level=1 check="-0.4"}
For a sample of size $n = 10$ from a population with variance $\sigma^2 = 4$, find the bias of $\hat\sigma^2 = \frac1n\sum(X_i - \bar X)^2$.
::: solution
$\hat\sigma^2 = \frac{n-1}{n}S^2$ has expectation $\frac{n-1}{n}\sigma^2$, so its bias is $-\sigma^2/n = -4/10 = -0.4$.
:::
:::

::: exercise An exponential rate {level=1 check="2/3"}
Lifetimes (in years) of six components were $2.1, 0.4, 1.3, 3.0, 0.7, 1.5$. Assuming an $\operatorname{Exp}(\lambda)$ model, find the maximum likelihood estimate of $\lambda$.
::: solution
By [[#ex-mle-exponential]], $\hat\lambda = 1/\bar x = 6/9.0 = 2/3$ per year.
:::
:::

::: exercise A Poisson probability {level=2 check="exp(-2)"}
The numbers of goals in eight football matches were $2, 0, 3, 1, 1, 4, 2, 3$. Assuming a $\operatorname{Poisson}(\lambda)$ model, show that the MLE of $\lambda$ is $\bar x$, and find the MLE of the probability of a goalless match.
::: solution
$\ell(\lambda) = -n\lambda + \bigl(\sum x_i\bigr)\ln\lambda - \sum\ln x_i!$, so $\ell'(\lambda) = -n + \sum x_i/\lambda = 0$ gives $\hat\lambda = \bar x$ (and $\ell''<0$). Here $\bar x = 16/8 = 2$. By invariance ([[#thm-invariance]]), the MLE of $\Prob(X = 0) = e^{-\lambda}$ is $e^{-2}\approx0.135$.
:::
:::

::: exercise Comparing uniform estimators {level=2 check="2"}
For a sample of size $n = 4$ from $\operatorname{U}(0,\theta)$, find the ratio $\operatorname{MSE}(2\bar X)/\operatorname{MSE}\bigl(\tfrac54M\bigr)$, where $M$ is the sample maximum.
::: solution
From [[#ex-tanks]], $\operatorname{MSE}(2\bar X) = \theta^2/(3n) = \theta^2/12$ and $\operatorname{MSE}\bigl(\frac{n+1}{n}M\bigr) = \theta^2/(n(n+2)) = \theta^2/24$. The ratio is $2$: even with only four observations, the estimator based on the maximum is twice as efficient.
:::
:::

::: exercise A power-function density {level=2 check="-4/ln(0.216)"}
A sample $x_1,\ldots,x_n$ comes from the density $f(x;\theta) = \theta x^{\theta-1}$ on $(0,1)$, with $\theta>0$. Find the MLE of $\theta$, and evaluate it for the data $0.5, 0.8, 0.9, 0.6$.
::: solution
$\ell(\theta) = n\ln\theta + (\theta-1)\sum\ln x_i$, so $\ell'(\theta) = n/\theta + \sum\ln x_i = 0$ gives $\hat\theta = -n/\sum_i\ln x_i$ (positive, since each $\ln x_i<0$), and $\ell''(\theta) = -n/\theta^2<0$. Here $\sum\ln x_i = \ln(0.5\times0.8\times0.9\times0.6) = \ln0.216\approx-1.532$, so $\hat\theta = -4/\ln0.216\approx2.61$.
:::
:::

::: exercise A geometric parameter {level=2 check="1/3"}
The numbers of attempts a student needed to pass five independent driving tests (with the same success probability $p$ each time) were $3, 1, 4, 2, 5$. Find the MLE of $p$ under a geometric model.
::: solution
For $\operatorname{Geom}(p)$, $L(p) = \prod p(1-p)^{x_i-1} = p^n(1-p)^{\sum x_i - n}$, so $\ell'(p) = n/p - (\sum x_i - n)/(1-p) = 0$ gives $\hat p = n/\sum x_i = 1/\bar x$. Here $\bar x = 15/5 = 3$, so $\hat p = \tfrac13$.
:::
:::

::: exercise The sample maximum is consistent {level=3}
For a random sample from $\operatorname{U}(0,\theta)$, prove directly from the definition that $M = \max_iX_i$ is consistent for $\theta$.
::: solution
Since $M\le\theta$ always, for $0<\eps<\theta$

$$
\Prob(\lvert M-\theta\rvert\ge\eps) = \Prob(M\le\theta-\eps) = \Prob(\text{all } X_i\le\theta-\eps) = \Bigl(1 - \frac\eps\theta\Bigr)^n\to0,
$$

and for $\eps\ge\theta$ the probability is $0$. (Alternatively, $\operatorname{MSE}(M) = \frac{2\theta^2}{(n+1)(n+2)}\to0$ and [[#thm-consistency]] applies.)
:::
:::

::: exercise Efficiency for a proportion {level=3}
For $X\sim\operatorname{Bernoulli}(p)$ with $0<p<1$, show that $I(p) = \dfrac{1}{p(1-p)}$, and deduce that the sample proportion is an efficient estimator of $p$.
::: solution
$\ln f(x;p) = x\ln p + (1-x)\ln(1-p)$ for $x\in\{0,1\}$, so the score is $\frac xp - \frac{1-x}{1-p} = \frac{x - p}{p(1-p)}$. Its variance is $\dfrac{\Var X}{p^2(1-p)^2} = \dfrac{p(1-p)}{p^2(1-p)^2} = \dfrac{1}{p(1-p)}$. The Cramér–Rao bound for unbiased estimators from $n$ observations is therefore $p(1-p)/n$, which is exactly $\Var\bar X$; since $\bar X$ is unbiased, it is efficient.
:::
:::

::: exercise A biased estimator that beats the unbiased one {level=3}
Let $X_1,\ldots,X_n\iid\Normal(\mu,\sigma^2)$ with $\sigma^2$ known, and consider the shrinkage estimators $c\bar X$ of $\mu$, for constants $0\le c\le1$. Show that $\operatorname{MSE}(c\bar X) = c^2\sigma^2/n + (1-c)^2\mu^2$, and that for $\mu^2<\sigma^2/n$ the estimator $\tfrac12\bar X$ has smaller MSE than $\bar X$. Why can this not be used to improve on $\bar X$ in practice?
::: solution
$c\bar X$ has mean $c\mu$ (bias $(c-1)\mu$) and variance $c^2\sigma^2/n$, so [[#thm-mse]] gives the formula. For $c = \tfrac12$ the MSE is $\frac{\sigma^2}{4n} + \frac{\mu^2}{4}$, which is less than $\operatorname{MSE}(\bar X) = \sigma^2/n$ exactly when $\mu^2<3\sigma^2/n$, in particular when $\mu^2<\sigma^2/n$. But whether this condition holds depends on the unknown $\mu$; for large $\lvert\mu\rvert$ the shrunken estimator is much worse. No estimator has smallest MSE for every $\theta$ simultaneously, which is why we need criteria such as unbiasedness, or a prior distribution as in [[statistics/bayesian]], where shrinkage towards a prior mean arises naturally.
:::
:::
