A machine is supposed to cut bolts to a mean length of $50$ mm. You measure $25$ bolts and find an average of $50.08$ mm. Is the machine out of adjustment, or is a difference of $0.08$ mm just the luck of the draw? To answer, you need to know how much the average of $25$ bolts would vary from one batch of measurements to another *if* the machine were working correctly. That variation is described by a **sampling distribution**, and it is the bridge between probability and statistics.

Probability starts from a known model and predicts what data will look like. Statistics runs the other way: it starts from data and asks what can be said about the unknown model. This chapter sets up the language for that reversal. We first describe data by numbers such as the mean, median and standard deviation. Then we model data as a **random sample** from a population, and study how statistics computed from the sample vary: the sample mean has standard deviation $\sigma/\sqrt n$ and is approximately normal, and the sample variance is an unbiased estimate of the population variance. For samples from a normal population we derive exact distributions, which leads to the three distributions that run through the rest of the course: the **chi-square**, **t** and **F** distributions.

## Describing data {#describing-data}

A data set is a list of numbers $x_1,\ldots,x_n$: measurements, survey responses, times, counts. Before any modelling, it helps to summarise where the values are centred and how spread out they are.

::: definition Sample mean, variance and standard deviation {#def-sample-stats}
For data $x_1,\ldots,x_n$ the **sample mean** is $\bar x = \frac1n\sum_{i=1}^nx_i$, the **sample variance** is

$$
s^2 = \frac{1}{n-1}\sum_{i=1}^n(x_i-\bar x)^2,
$$ {#eq-sample-variance}

and the **sample standard deviation** is $s = \sqrt{s^2}$.
:::

The divisor $n-1$ rather than $n$ looks odd at first; [[#thm-sample-moments]] explains it. A useful computational form is $\sum(x_i-\bar x)^2 = \sum x_i^2 - n\bar x^2$.

The mean and standard deviation are sensitive to extreme values. Summaries based on ordering the data are more **robust**. The **median** is the middle value of the sorted data (the average of the two middle values when $n$ is even). The **quartiles** $Q_1$ and $Q_3$ are, roughly, the medians of the lower and upper halves of the data; several slightly different conventions exist, and software packages disagree in small samples. Here we take the medians of the values below and above the median. The **interquartile range** $\mathrm{IQR} = Q_3 - Q_1$ is the spread of the middle half of the data, and the **five-number summary** (minimum, $Q_1$, median, $Q_3$, maximum) is what a **box plot** draws. A common rule flags as possible **outliers** the values more than $1.5\,\mathrm{IQR}$ beyond the quartiles.

::: example Quiz times with an outlier {#ex-quiz-times}
Eleven students took the following times, in minutes, to complete a quiz:

$$
12,\ 15,\ 9,\ 22,\ 14,\ 13,\ 17,\ 11,\ 16,\ 14,\ 41 .
$$

Compute the mean, median, standard deviation, quartiles and IQR, and decide whether any value is an outlier. How do the summaries change if the value $41$ is removed?
::: solution
The sum is $184$, so $\bar x = 184/11\approx16.73$. Sorted, the data are $9, 11, 12, 13, 14, 14, 15, 16, 17, 22, 41$, so the median is the sixth value, $14$. The squared deviations from $\bar x$ sum to about $764.2$, so $s^2\approx764.2/10 = 76.4$ and $s\approx8.74$. The lower half $9, 11, 12, 13, 14$ has median $Q_1 = 12$, and the upper half $15, 16, 17, 22, 41$ has median $Q_3 = 17$, so $\mathrm{IQR} = 5$. The outlier fences are $12 - 7.5 = 4.5$ and $17 + 7.5 = 24.5$, so $41$ is flagged as an outlier.

Without the $41$, the mean drops to $143/10 = 14.3$ and the standard deviation to $3.59$, while the median stays at $14$. One slow student more than doubled the standard deviation and moved the mean by more than two minutes, but barely affected the median. For skewed data such as incomes or waiting times, the median is often the better summary of a "typical" value.
:::
:::

::: warning Mean and median answer different questions
Neither summary is "the right one". The mean is what you need for totals (total waiting time = $n\times$ mean), and it is the natural target of the theory in this course; the median describes the typical individual. When a distribution is skewed to the right — incomes, house prices, hospital stays — the mean is larger than the median, sometimes much larger, and reporting one when the reader expects the other is a classic way to mislead.
:::

## Random samples and sampling distributions {#random-samples}

To reason about the uncertainty in summaries like $\bar x$, we model the data as the observed values of random variables.

::: definition Random sample and statistic {#def-random-sample}
A **random sample** of size $n$ from a distribution $F$ is a collection of independent random variables $X_1,\ldots,X_n$, each with distribution $F$; we write $X_1,\ldots,X_n\iid F$. The distribution $F$ is called the **population** distribution, and numbers that describe it (its mean $\mu$, variance $\sigma^2$, median, and so on) are **parameters**. A **statistic** is any quantity computed from the sample, such as $\bar X = \frac1n\sum X_i$ or $S^2 = \frac{1}{n-1}\sum(X_i-\bar X)^2$; its probability distribution is its **sampling distribution**.
:::

Capital letters denote the random variables, lower-case letters their observed values: $\bar X$ is a random variable whose value $\bar x$ we compute from the data. A parameter is a fixed but unknown number; a statistic varies from sample to sample. The model fits, for example, measurements repeated under identical conditions, or individuals drawn at random (with replacement, or from a population much larger than the sample) from a large population.

::: theorem Mean and variance of the sample mean and sample variance {#thm-sample-moments}
Let $X_1,\ldots,X_n$ be a random sample from a distribution with mean $\mu$ and variance $\sigma^2$, with $n\ge2$. Then

$$
\E\bar X = \mu,\qquad\Var\bar X = \frac{\sigma^2}{n},\qquad\E S^2 = \sigma^2 .
$$
:::

::: proof
The first two statements were proved in [[probability/limit-theorems]], using linearity and the additivity of variances of independent random variables. For the third, expand around $\mu$: since $X_i - \mu = (X_i - \bar X) + (\bar X - \mu)$ and $\sum_i(X_i - \bar X) = 0$,

$$
\sum_{i=1}^n(X_i-\mu)^2 = \sum_{i=1}^n(X_i-\bar X)^2 + 2(\bar X-\mu)\sum_{i=1}^n(X_i - \bar X) + n(\bar X-\mu)^2 = \sum_{i=1}^n(X_i-\bar X)^2 + n(\bar X-\mu)^2 .
$$

Take expectations: $\E(X_i-\mu)^2 = \sigma^2$ and $\E(\bar X-\mu)^2 = \Var\bar X = \sigma^2/n$. Hence

$$
\E\sum_{i=1}^n(X_i-\bar X)^2 = n\sigma^2 - n\cdot\frac{\sigma^2}{n} = (n-1)\sigma^2,
$$

and dividing by $n-1$ gives $\E S^2 = \sigma^2$.
:::

The proof shows where the $n-1$ comes from: deviations are measured from $\bar X$, which is itself fitted to the data and so is closer to the data than the true mean $\mu$ is. The sum of squared deviations from $\bar X$ is therefore too small on average, by exactly one $\sigma^2$. Dividing by $n-1$ instead of $n$ corrects this; one says that the deviations $X_i - \bar X$ have $n-1$ **degrees of freedom**, since they are constrained to sum to zero. An estimator whose expectation equals the parameter, like $S^2$, is called **unbiased** ([[statistics/estimation]]).

The standard deviation of $\bar X$, namely $\sigma/\sqrt n$, is called the **standard error** of the mean. It is estimated from data by $s/\sqrt n$. By the central limit theorem ([[probability/limit-theorems#thm-clt]]), for large $n$

$$
\bar X\ \approx\ \Normal\Bigl(\mu,\frac{\sigma^2}{n}\Bigr),
$$ {#eq-clt-mean}

whatever the population distribution, provided its variance is finite.

::: widget clt
dist: skewed
n: 10
samples: 2000
caption: The sampling distribution of the mean of $n$ observations from a skewed population, built from $2000$ simulated samples, with the normal curve of [[#eq-clt-mean]]. With $n = 1$ the histogram is the skewed population itself; as $n$ grows it narrows like $1/\sqrt n$ and becomes symmetric. Increase $n$ fourfold and check that the spread halves.
:::

::: example Are the bolts too long? {#ex-bolts}
Bolt lengths from a correctly adjusted machine have mean $50$ mm and standard deviation $0.2$ mm. For a random sample of $25$ bolts, find the standard error of the mean and the approximate probability that $\bar X$ differs from $50$ by more than $0.1$ mm. What does this suggest about the observed $\bar x = 50.08$?
::: solution
The standard error is $0.2/\sqrt{25} = 0.04$ mm. By [[#eq-clt-mean]] (or exactly, if lengths are normally distributed),

$$
\Prob\bigl(\lvert\bar X - 50\rvert>0.1\bigr)\approx\Prob\bigl(\lvert Z\rvert>0.1/0.04\bigr) = 2\bigl(1-\Phi(2.5)\bigr)\approx0.012 .
$$

The observed deviation $0.08$ mm is $2$ standard errors; a deviation at least that large has probability $2(1-\Phi(2))\approx0.046$ for a correctly adjusted machine. So the observation is somewhat surprising, though not overwhelmingly so. Making this reasoning systematic is the subject of [[statistics/hypothesis-testing]].
:::
:::

::: warning Standard deviation versus standard error
The standard deviation $s$ describes the spread of *individual observations*; the standard error $s/\sqrt n$ describes the uncertainty in the *mean*. Collecting more data does not make individual bolts less variable — $s$ stays roughly the same — but it does make the mean more precise. Error bars in published graphs are sometimes standard deviations and sometimes standard errors (or confidence intervals), and the difference is a factor of $\sqrt n$; always check which.
:::

::: quiz
A survey's sample size is increased from $100$ to $400$. What happens, approximately, to the sample standard deviation $s$ and to the standard error of the mean?
- [ ] Both are halved.
- [x] $s$ stays about the same; the standard error is halved.
- [ ] $s$ is halved; the standard error is quartered.
- [ ] Both stay about the same.
::: solution
$s$ estimates the population standard deviation $\sigma$, which does not depend on $n$. The standard error $\sigma/\sqrt n$ falls by a factor of $\sqrt{400/100} = 2$. Quadrupling the sample size halves the uncertainty of the mean.
:::
:::

## Samples from a normal population {#normal-samples}

For a normal population we can do better than approximations. By [[probability/expectation#cor-normal-sum]], a sum of independent normal random variables is normal, so if $X_1,\ldots,X_n\iid\Normal(\mu,\sigma^2)$ then

$$
\bar X\sim\Normal\Bigl(\mu,\frac{\sigma^2}{n}\Bigr)\quad\text{exactly}.
$$

The distribution of $S^2$ requires a new family of distributions.

::: definition Chi-square distribution {#def-chi-square}
If $Z_1,\ldots,Z_k$ are independent standard normal random variables, the distribution of

$$
V = Z_1^2 + Z_2^2 + \dots + Z_k^2
$$

is the **chi-square distribution with $k$ degrees of freedom**, written $\chi^2_k$.
:::

Since $\E Z^2 = 1$ and $\Var Z^2 = \E Z^4 - 1 = 3 - 1 = 2$ ([[probability/expectation]]), a $\chi^2_k$ random variable has mean $k$ and variance $2k$. Directly from the definition, if $V_1\sim\chi^2_a$ and $V_2\sim\chi^2_b$ are independent then $V_1+V_2\sim\chi^2_{a+b}$. The $\chi^2_1$ density was found in [[probability/continuous-random-variables#ex-chi-square]]; in general the density is

$$
f(x) = \frac{x^{k/2-1}e^{-x/2}}{2^{k/2}\,\Gamma(k/2)},\qquad x>0,
$$

a gamma density (for $k = 2$ it is the $\operatorname{Exp}(\tfrac12)$ density). It is skewed to the right, increasingly symmetric as $k$ grows, and by the central limit theorem approximately $\Normal(k, 2k)$ for large $k$.

::: widget distribution
dist: chisq
params: k=4
caption: The $\chi^2_k$ density. For $k = 1$ and $k = 2$ it is largest at $0$; for larger $k$ it has a peak at $k - 2$, and the mean $k$ and standard deviation $\sqrt{2k}$ grow with $k$. Shade an interval to read off probabilities — for example, the central $95\%$ of $\chi^2_9$ lies between $2.70$ and $19.02$.
:::

The key result about normal samples is that the sample mean and sample variance are independent, and that the scaled sample variance has a chi-square distribution.

::: theorem Sampling distributions for a normal population {#thm-normal-sample}
Let $X_1,\ldots,X_n\iid\Normal(\mu,\sigma^2)$ with $n\ge2$. Then

1. $\bar X\sim\Normal(\mu,\sigma^2/n)$;
2. $\dfrac{(n-1)S^2}{\sigma^2} = \dfrac{1}{\sigma^2}\displaystyle\sum_{i=1}^n(X_i-\bar X)^2\sim\chi^2_{n-1}$;
3. $\bar X$ and $S^2$ are independent.
:::

::: proof
Standardise: $Z_i = (X_i-\mu)/\sigma$ are iid $\Normal(0,1)$, with $\bar Z = (\bar X-\mu)/\sigma$ and $\sum_i(Z_i-\bar Z)^2 = (n-1)S^2/\sigma^2$. Write $\mathbf Z = (Z_1,\ldots,Z_n)\T$.

Let $A$ be an orthogonal $n\times n$ matrix whose first row is $\bigl(\frac{1}{\sqrt n},\ldots,\frac{1}{\sqrt n}\bigr)$. Such a matrix exists: extend this unit vector to an orthonormal basis of $\R^n$ by the Gram–Schmidt process and use the basis vectors as rows ([[linear-algebra/inner-products]]). Put $\mathbf W = A\mathbf Z$.

*Step 1: $W_1,\ldots,W_n$ are iid $\Normal(0,1)$.* The joint density of $\mathbf Z$ is $(2\pi)^{-n/2}e^{-\lVert\mathbf z\rVert^2/2}$. The map $\mathbf z\mapsto A\mathbf z$ is linear with $\lvert\det A\rvert = 1$ and preserves lengths, so by the change-of-variables formula for multiple integrals ([[multivariable/change-of-variables]]) $\mathbf W$ has density $(2\pi)^{-n/2}e^{-\lVert A\T\mathbf w\rVert^2/2} = (2\pi)^{-n/2}e^{-\lVert\mathbf w\rVert^2/2} = \prod_i\varphi(w_i)$. This factorises into standard normal densities, so the $W_i$ are iid $\Normal(0,1)$.

*Step 2: express the statistics through $\mathbf W$.* The first coordinate is $W_1 = \frac{1}{\sqrt n}\sum_iZ_i = \sqrt n\,\bar Z$. Orthogonal matrices preserve length, so $\sum_iW_i^2 = \sum_iZ_i^2$, and therefore

$$
\sum_{i=2}^nW_i^2 = \sum_{i=1}^nZ_i^2 - n\bar Z^2 = \sum_{i=1}^n(Z_i-\bar Z)^2 = \frac{(n-1)S^2}{\sigma^2}.
$$

By Step 1 and the definition, $\sum_{i\ge2}W_i^2\sim\chi^2_{n-1}$, which is (2). It is a function of $W_2,\ldots,W_n$, whereas $\bar X = \mu + \sigma W_1/\sqrt n$ is a function of $W_1$ alone; since the $W_i$ are independent, $\bar X$ and $S^2$ are independent, which is (3). Statement (1) also follows, since $W_1\sim\Normal(0,1)$.
:::

The proof explains the "degrees of freedom" geometrically: the vector of deviations $(Z_i - \bar Z)$ lies in the $(n-1)$-dimensional subspace orthogonal to $(1,\ldots,1)$, and its squared length is a sum of $n-1$ independent squared standard normals. Independence of $\bar X$ and $S^2$ is special to the normal distribution — for exponential data, for example, a large sample mean tends to come with a large sample variance.

::: example How variable is the sample variance? {#ex-variance-tail}
For a sample of size $10$ from a normal population, find the probability that the sample variance exceeds the population variance by more than $50\%$.
::: solution
By [[#thm-normal-sample]], $9S^2/\sigma^2\sim\chi^2_9$, so

$$
\Prob\bigl(S^2>1.5\sigma^2\bigr) = \Prob\bigl(\chi^2_9>13.5\bigr)\approx0.141 .
$$

So about one sample in seven overestimates the variance by more than half. Sample variances from small samples are very imprecise: the standard deviation of $S^2$ is $\sigma^2\sqrt{2/(n-1)}$, which for $n = 10$ is $47\%$ of $\sigma^2$.
:::
:::

## Student's t distribution {#t-distribution}

If $\sigma$ were known, the standardised mean $(\bar X - \mu)/(\sigma/\sqrt n)$ would be exactly standard normal. In practice $\sigma$ is unknown and must be replaced by $S$, which adds extra variability, especially for small samples. The resulting distribution was found by William Gosset, writing as "Student".

::: definition Student's t distribution {#def-t}
If $Z\sim\Normal(0,1)$ and $V\sim\chi^2_k$ are independent, the distribution of

$$
T = \frac{Z}{\sqrt{V/k}}
$$

is **Student's t distribution with $k$ degrees of freedom**, written $t_k$.
:::

Its density, which we state without derivation (it follows from the joint density of $Z$ and $V$ by a change of variables), is

$$
f(t) = \frac{\Gamma\bigl(\frac{k+1}{2}\bigr)}{\sqrt{k\pi}\;\Gamma\bigl(\frac k2\bigr)}\Bigl(1+\frac{t^2}{k}\Bigr)^{-(k+1)/2},\qquad t\in\R .
$$

The $t_k$ distribution is symmetric about $0$ and bell-shaped, but its tails decay like a power of $t$ rather than like $e^{-t^2/2}$, so extreme values are more likely than for the normal. For $k = 1$ it is the Cauchy distribution, which has no mean; for $k>2$ the variance is $k/(k-2)>1$. As $k\to\infty$, $V/k\to1$ by the law of large numbers, and $t_k$ approaches $\Normal(0,1)$.

::: corollary The studentised mean {#cor-t-statistic}
If $X_1,\ldots,X_n\iid\Normal(\mu,\sigma^2)$, then

$$
T = \frac{\bar X - \mu}{S/\sqrt n}\sim t_{n-1}.
$$ {#eq-t-statistic}
:::

::: proof
Divide numerator and denominator by $\sigma/\sqrt n$:

$$
T = \frac{(\bar X-\mu)/(\sigma/\sqrt n)}{\sqrt{\dfrac{(n-1)S^2/\sigma^2}{n-1}}}.
$$

By [[#thm-normal-sample]] the numerator is $\Normal(0,1)$, the quantity under the square root is $\chi^2_{n-1}$ divided by its degrees of freedom, and the two are independent. This is the definition of $t_{n-1}$.
:::

Remarkably, the distribution of $T$ does not depend on the unknown $\sigma$: this is what makes it so useful in [[statistics/confidence-intervals]]. The upper $2.5\%$ points of $t_k$, which play the role of $1.96$ for the normal, are

| $k$ | $1$ | $2$ | $5$ | $9$ | $10$ | $20$ | $30$ | $60$ | $\infty$ |
|---|---|---|---|---|---|---|---|---|---|
| $t_{k,\,0.975}$ | $12.706$ | $4.303$ | $2.571$ | $2.262$ | $2.228$ | $2.086$ | $2.042$ | $2.000$ | $1.960$ |

::: widget distribution
dist: t
params: df=3
normal: true
caption: The $t_k$ density compared with the standard normal. With $k = 1$ or $2$ degrees of freedom the tails are dramatically heavier; by $k = 30$ the two curves are hard to tell apart except far out in the tails. Shade $\lvert t\rvert>1.96$ and watch the tail probability fall towards $0.05$ as $k$ increases.
:::

::: example Using s in place of sigma {#ex-t-vs-z}
For a normal sample of size $10$, compare $\Prob\bigl(\lvert\bar X-\mu\rvert>2S/\sqrt n\bigr)$ with $\Prob\bigl(\lvert\bar X-\mu\rvert>2\sigma/\sqrt n\bigr)$.
::: solution
The second probability is $\Prob(\lvert Z\rvert>2) = 0.0455$. The first is $\Prob(\lvert T\rvert>2)$ with $T\sim t_9$, which is $0.0766$. Treating the estimated standard error as if it were exact understates the chance of a large standardised deviation by about $40\%$ in a sample of $10$. To capture the middle $95\%$ of $t_9$ one must go out to $\pm2.262$ rather than $\pm1.96$.
:::
:::

::: quiz
Why is $(\bar X - \mu)/(S/\sqrt n)$ more variable than $(\bar X-\mu)/(\sigma/\sqrt n)$ for a small normal sample?
- [ ] Because $S$ is always smaller than $\sigma$.
- [ ] Because $\bar X$ and $S$ are dependent.
- [x] Because $S$ is itself random: when it happens to be small, the ratio is inflated.
- [ ] It is not; both are exactly standard normal.
::: solution
The denominator $S/\sqrt n$ varies from sample to sample. Samples in which $S$ underestimates $\sigma$ produce large values of the ratio, which fattens the tails. (For normal data $\bar X$ and $S$ are independent, and $S$ is not always smaller than $\sigma$ — though $\E S<\sigma$, as an exercise shows.)
:::
:::

## The F distribution {#f-distribution}

To compare the variability of two populations we look at the ratio of sample variances.

::: definition F distribution {#def-f}
If $U\sim\chi^2_m$ and $V\sim\chi^2_n$ are independent, the distribution of

$$
F = \frac{U/m}{V/n}
$$

is the **F distribution with $(m, n)$ degrees of freedom**, written $F_{m,n}$.
:::

Directly from the definitions: $1/F\sim F_{n,m}$, and if $T\sim t_k$ then $T^2\sim F_{1,k}$ (see the exercises). By [[#thm-normal-sample]], if $S_1^2$ and $S_2^2$ are the variances of independent samples of sizes $n_1$ and $n_2$ from $\Normal(\mu_1,\sigma_1^2)$ and $\Normal(\mu_2,\sigma_2^2)$, then

$$
\frac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}\sim F_{n_1-1,\;n_2-1}.
$$ {#eq-variance-ratio}

The F distribution is also the basis of the analysis of variance and of the overall significance test in multiple regression ([[statistics/regression]]).

::: example Comparing two variances {#ex-f-ratio}
Two machines have the same variability. Samples of $10$ bolts from the first and $15$ from the second are measured. How likely is it that the first sample variance is more than three times the second?
::: solution
With $\sigma_1 = \sigma_2$, [[#eq-variance-ratio]] gives $S_1^2/S_2^2\sim F_{9,14}$, and $\Prob(F_{9,14}>3)\approx0.032$. A ratio of $3$ is unusual but not impossible even when the machines are identical; small samples make variance comparisons weak. (The central $95\%$ of $F_{9,14}$ runs from $0.26$ to $3.21$.)
:::
:::

::: history
The modern theory of sampling distributions began with small samples in industry. William Sealy Gosset, a chemist at the Guinness brewery in Dublin, needed to draw conclusions from a handful of measurements on barley and yeast, and in 1908 published "The probable error of a mean" in *Biometrika* under the pseudonym "Student", because Guinness did not allow its staff to publish under their own names. He found the t distribution partly by mathematics and partly by simulation, shuffling measurements written on cards. Friedrich Robert Helmert had derived the distribution of the sample variance of normal data in 1876, and Karl Pearson introduced the chi-square distribution as the basis of his goodness-of-fit test in 1900. Ronald Fisher gave rigorous derivations, recast Student's statistic in its modern form, and in the 1920s developed the analysis of variance, whose test statistic George Snedecor named $F$ in Fisher's honour in 1934.
:::

## Where this leads {#where-next}

Sampling distributions are the raw material of inference. In [[statistics/estimation]] we judge estimators such as $\bar X$ and $S^2$ by their bias and variance; in [[statistics/confidence-intervals]] the t statistic [[#eq-t-statistic]] and the chi-square result of [[#thm-normal-sample]] become intervals for $\mu$ and $\sigma^2$; and in [[statistics/hypothesis-testing]] they become the t-test, the chi-square test and the F-test. When the population is not normal and the sample is small, exact distributions are rarely available; the **bootstrap**, which approximates a sampling distribution by resampling the data, is a modern alternative described in Wasserman's *All of Statistics*.

::: summary
- Summaries: the mean and standard deviation (divisor $n-1$) are efficient but sensitive to outliers; the median and IQR are robust.
- A random sample is a set of iid random variables; a statistic is a function of the sample, and its distribution is the sampling distribution.
- $\E\bar X = \mu$, $\Var\bar X = \sigma^2/n$ (standard error $\sigma/\sqrt n$), and $\E S^2 = \sigma^2$; by the CLT, $\bar X$ is approximately $\Normal(\mu,\sigma^2/n)$ for large $n$.
- $\chi^2_k$ is the distribution of a sum of $k$ squared independent standard normals: mean $k$, variance $2k$.
- For normal samples, $\bar X$ and $S^2$ are independent and $(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$, proved by an orthogonal change of variables.
- $(\bar X-\mu)/(S/\sqrt n)\sim t_{n-1}$: heavier-tailed than the normal for small $n$, and free of the unknown $\sigma$.
- Ratios of independent scaled chi-squares give the $F$ distribution, used to compare variances.
:::

## Exercises

::: exercise Mean and median {level=1 check="22/3"}
Find the mean and median of the data $3, 7, 8, 5, 12, 9$. Enter the mean.
::: solution
The sum is $44$, so $\bar x = 44/6 = 22/3\approx7.33$. Sorted: $3, 5, 7, 8, 9, 12$; with $n = 6$ the median is $(7+8)/2 = 7.5$.
:::
:::

::: exercise A sample variance {level=1 check="32/7"}
Compute the sample variance $s^2$ of $2, 4, 4, 4, 5, 5, 7, 9$.
::: solution
$\bar x = 40/8 = 5$, and the squared deviations are $9, 1, 1, 1, 0, 0, 4, 16$, with sum $32$. So $s^2 = 32/7\approx4.57$. (Dividing by $n = 8$ instead would give $4$.)
:::
:::

::: exercise A standard error {level=1 check="2"}
A population has standard deviation $12$. Find the standard error of the mean of a random sample of $36$.
::: solution
$12/\sqrt{36} = 2$.
:::
:::

::: exercise Two squared normals {level=2 check="exp(-1)"}
Let $Z_1$, $Z_2$ be independent standard normal. Find $\Prob(Z_1^2 + Z_2^2>2)$ exactly.
::: solution
$Z_1^2+Z_2^2\sim\chi^2_2$, whose density $\tfrac12e^{-x/2}$ is the $\operatorname{Exp}(\tfrac12)$ density. Hence $\Prob(\chi^2_2>2) = e^{-2/2} = e^{-1}\approx0.368$. (Geometrically: the probability that a standard normal point in the plane lies outside the circle of radius $\sqrt2$.)
:::
:::

::: exercise The variance of S² {level=2 check="1/5"}
For a random sample of size $n$ from $\Normal(\mu,\sigma^2)$, show that $\Var S^2 = \dfrac{2\sigma^4}{n-1}$, and evaluate it for $n = 11$, $\sigma^2 = 1$.
::: solution
By [[#thm-normal-sample]], $(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$, which has variance $2(n-1)$. So $\Var S^2 = \dfrac{\sigma^4}{(n-1)^2}\cdot2(n-1) = \dfrac{2\sigma^4}{n-1}$. For $n = 11$ and $\sigma^2 = 1$ this is $0.2$.
:::
:::

::: exercise A five-number summary {level=2}
For the data $31, 26, 44, 29, 35, 38, 27, 92, 33, 30$, find the five-number summary and the IQR, and decide whether any value is an outlier by the $1.5\,\mathrm{IQR}$ rule.
::: solution
Sorted: $26, 27, 29, 30, 31, 33, 35, 38, 44, 92$. The median is $(31+33)/2 = 32$. The lower half $26, 27, 29, 30, 31$ has median $Q_1 = 29$; the upper half $33, 35, 38, 44, 92$ has median $Q_3 = 38$. Five-number summary: $26, 29, 32, 38, 92$; $\mathrm{IQR} = 9$. The fences are $29 - 13.5 = 15.5$ and $38 + 13.5 = 51.5$, so $92$ is an outlier. (The mean, $38.5$, is pulled well above the median by it.)
:::
:::

::: exercise What the mean and median minimise {level=3}
Prove that for any data $x_1,\ldots,x_n$ the function $g(a) = \sum_i(x_i-a)^2$ is minimised at $a = \bar x$, and that $h(a) = \sum_i\lvert x_i-a\rvert$ is minimised at any median.
::: hint
For $g$, use the identity from the proof of [[#thm-sample-moments]] with $\mu$ replaced by $a$. For $h$, see how $h$ changes as $a$ moves past data points.
:::
::: solution
As in the proof of [[#thm-sample-moments]], $\sum_i(x_i-a)^2 = \sum_i(x_i-\bar x)^2 + n(\bar x-a)^2$, which is smallest exactly when $a = \bar x$.

For $h$: on any interval between consecutive data values, $h$ is linear in $a$ with slope $L(a) - R(a)$, where $L(a)$ is the number of data points less than $a$ and $R(a)$ the number greater than $a$ (each $\lvert x_i - a\rvert$ has slope $+1$ if $x_i<a$ and $-1$ if $x_i>a$). As $a$ increases, $L - R$ increases. It is negative while fewer than half the points lie below $a$, so $h$ decreases there, and positive once more than half lie below, so $h$ increases. Hence $h$ is minimised where the number of points on each side is balanced, which is at a median (for even $n$, every point between the two middle values minimises $h$).
:::
:::

::: exercise Squares of t {level=3}
Prove that if $T\sim t_k$ then $T^2\sim F_{1,k}$, and verify from the density that $t_1$ is the Cauchy distribution.
::: solution
Write $T = Z/\sqrt{V/k}$ with $Z\sim\Normal(0,1)$ and $V\sim\chi^2_k$ independent. Then $T^2 = \dfrac{Z^2/1}{V/k}$, and $Z^2\sim\chi^2_1$ is independent of $V$ (functions of independent random variables), so $T^2\sim F_{1,k}$ by definition. For $k = 1$, using $\Gamma(1) = 1$ and $\Gamma(\tfrac12) = \sqrt\pi$, the density is $\dfrac{1}{\sqrt\pi\cdot\sqrt\pi}(1+t^2)^{-1} = \dfrac{1}{\pi(1+t^2)}$, the standard Cauchy density.
:::
:::

::: exercise The sample standard deviation is biased {level=3}
Show that for a sample from any distribution with $\sigma>0$ for which $S$ is not almost surely constant, $\E S<\sigma$, even though $\E S^2 = \sigma^2$.
::: solution
The variance of $S$ is positive because $S$ is not constant, so $0<\Var S = \E S^2 - (\E S)^2 = \sigma^2 - (\E S)^2$. Hence $(\E S)^2<\sigma^2$ and, since $S\ge0$, $\E S<\sigma$. (For normal samples $S$ has a continuous distribution, so it is never constant; for $n = 2$, $\E S = \sigma\sqrt{2/\pi}\approx0.80\,\sigma$.) Unbiasedness is not preserved by non-linear transformations such as the square root.
:::
:::
