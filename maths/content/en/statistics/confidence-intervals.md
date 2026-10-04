An opinion poll of $1000$ voters finds $52\%$ support for a proposal, and the report adds that "the margin of error is $3$ percentage points". The single number $52\%$ is a point estimate, and on its own it is almost certainly wrong: the true level of support in the population is not exactly $52.0\%$. What the margin of error adds is an honest statement of how wrong it is likely to be. The interval from $49\%$ to $55\%$ is a **confidence interval**, and the method that produced it captures the true value in about $95\%$ of the polls on which it is used.

This chapter shows how to construct confidence intervals and, just as importantly, what they mean. The key tool is a **pivotal quantity**: a function of the data and the parameter whose distribution is completely known. The sampling distributions of [[statistics/sampling]] supply pivots for a normal mean (with known or unknown variance) and for a normal variance; the central limit theorem supplies approximate pivots for proportions and other large-sample problems. We also see how to choose a sample size, how to compare two groups, and why the most popular interval for a proportion can be badly wrong.

## What a confidence interval is {#definition}

Let $X = (X_1,\ldots,X_n)$ be a sample from a distribution with unknown parameter $\theta$.

::: definition Confidence interval {#def-ci}
Let $L(X)\le U(X)$ be two statistics and $0<\alpha<1$. The random interval $[L(X), U(X)]$ is a **confidence interval for $\theta$ with confidence level $1-\alpha$** if

$$
\Prob_\theta\bigl(L(X)\le\theta\le U(X)\bigr)\ge1-\alpha\qquad\text{for every }\theta\in\Theta .
$$ {#eq-coverage}

The probability on the left is the **coverage probability**. When the data $x$ are observed, the numerical interval $[L(x), U(x)]$ is also called a confidence interval.
:::

In [[#eq-coverage]] the parameter $\theta$ is fixed and the *interval* is random: it is the endpoints that vary from sample to sample. A $95\%$ confidence procedure is one that, used over and over on new samples, produces intervals that contain the true $\theta$ in (at least) $95\%$ of cases. Common choices are $1-\alpha = 0.90$, $0.95$ and $0.99$.

::: widget confidence
dist: normal
n: 15
level: 0.95
intervals: 50
method: t
caption: Fifty $95\%$ t-intervals for a population mean, each from a new simulated sample of size $15$; the vertical line is the true mean. About $95\%$ of the intervals cover it, and the misses (highlighted) fall on either side. The intervals have different centres *and* different widths, because both $\bar x$ and $s$ vary. Lower the level to $0.8$ and the intervals shrink while the misses become more frequent.
:::

::: warning What 95% confidence does not mean
Once the data are in and the interval computed — say $[96.1, 105.4]$ — it is tempting to say "there is a $95\%$ probability that $\mu$ lies between $96.1$ and $105.4$". In the framework of this chapter that statement is meaningless: $\mu$ is a fixed number, and it either lies in the interval or it does not. The $95\%$ describes the long-run success rate of the *method*, not the particular interval. (A statement of the form "$\Prob(\mu\in[a,b]\mid\text{data}) = 0.95$" does make sense in Bayesian inference, where it is called a credible interval; see [[statistics/bayesian]].) Nor does a $95\%$ confidence interval for the mean contain $95\%$ of the *data*: it is an interval for $\mu$, and it shrinks as $n$ grows, while the spread of individual values does not.
:::

## Pivotal quantities and the z-interval {#pivots}

The standard way to build an interval is to find a quantity that involves $\theta$ but whose distribution does not.

::: definition Pivotal quantity {#def-pivot}
A **pivotal quantity** (or **pivot**) is a function $Q(X,\theta)$ of the data and the parameter whose distribution is the same for every value of $\theta$ (and of any other unknown parameters).
:::

Given a pivot, choose numbers $a<b$ with $\Prob(a\le Q(X,\theta)\le b) = 1-\alpha$; then the set of $\theta$ for which $a\le Q(X,\theta)\le b$ — usually an interval, found by solving the inequalities for $\theta$ — has coverage $1-\alpha$ exactly. We write $z_p$ for the upper-$p$ point of the standard normal distribution, $\Prob(Z>z_p) = p$, so that $z_{0.05} = 1.645$, $z_{0.025} = 1.960$ and $z_{0.005} = 2.576$.

::: theorem z-interval for a normal mean with known variance {#thm-z-interval}
If $X_1,\ldots,X_n\iid\Normal(\mu,\sigma^2)$ with $\sigma$ known, then

$$
\Bigl[\bar X - z_{\alpha/2}\frac{\sigma}{\sqrt n},\ \bar X + z_{\alpha/2}\frac{\sigma}{\sqrt n}\Bigr]
$$ {#eq-z-interval}

is a confidence interval for $\mu$ with confidence level exactly $1-\alpha$.
:::

::: proof
$Q = \dfrac{\bar X-\mu}{\sigma/\sqrt n}$ is a pivot: it has the $\Normal(0,1)$ distribution whatever $\mu$ is ([[statistics/sampling]]). Hence

$$
1-\alpha = \Prob\bigl(-z_{\alpha/2}\le Q\le z_{\alpha/2}\bigr) = \Prob\Bigl(\bar X - z_{\alpha/2}\frac{\sigma}{\sqrt n}\le\mu\le\bar X + z_{\alpha/2}\frac{\sigma}{\sqrt n}\Bigr),
$$

because the two inequalities describe the same event, rearranged to isolate $\mu$.
:::

By the central limit theorem the same interval has *approximately* the right coverage for non-normal populations when $n$ is large. The quantity $z_{\alpha/2}\sigma/\sqrt n$ is the **margin of error**, and the interval has the form

$$
\text{estimate}\ \pm\ (\text{critical value})\times(\text{standard error}),
$$

a pattern that recurs throughout statistics.

::: example Bolt lengths {#ex-bolts-ci}
For the bolts of [[statistics/sampling#ex-bolts]] ($\sigma = 0.2$ mm, $n = 25$, $\bar x = 50.08$ mm), find a $95\%$ confidence interval for the mean length, and the sample size needed for a margin of error of $0.05$ mm.
::: solution
The standard error is $0.2/\sqrt{25} = 0.04$, so the interval is $50.08\pm1.96\times0.04 = 50.08\pm0.078$, that is $[50.002, 50.158]$ mm. The target value $50$ lies just outside it. For a margin of error $E$ we need $1.96\,\sigma/\sqrt n\le E$, that is

$$
n\ge\Bigl(\frac{1.96\,\sigma}{E}\Bigr)^2 = \Bigl(\frac{1.96\times0.2}{0.05}\Bigr)^2 = 61.5,
$$

so $62$ bolts. Since the margin is proportional to $1/\sqrt n$, halving it requires four times as many observations.
:::
:::

::: quiz
A $95\%$ confidence interval for a mean, based on $100$ observations, has width $4$. Roughly what width would a $95\%$ interval based on $400$ observations from the same population have?
- [ ] $1$
- [x] $2$
- [ ] $4$
- [ ] $8$
::: solution
The width is proportional to $\sigma/\sqrt n$. Multiplying $n$ by $4$ multiplies $1/\sqrt n$ by $\tfrac12$, so the width becomes about $2$. Precision is expensive: each extra decimal digit costs a hundredfold increase in sample size.
:::
:::

## The t-interval for a mean {#t-interval}

In practice $\sigma$ is unknown. Replacing it by the sample standard deviation $S$ gives the studentised mean, whose exact distribution for normal data is Student's $t$ ([[statistics/sampling#cor-t-statistic]]). Write $t_{k,p}$ for the upper-$p$ point of $t_k$.

::: theorem t-interval for a normal mean {#thm-t-interval}
If $X_1,\ldots,X_n\iid\Normal(\mu,\sigma^2)$ with both parameters unknown, then

$$
\Bigl[\bar X - t_{n-1,\alpha/2}\frac{S}{\sqrt n},\ \bar X + t_{n-1,\alpha/2}\frac{S}{\sqrt n}\Bigr]
$$ {#eq-t-interval}

is a confidence interval for $\mu$ with confidence level exactly $1-\alpha$.
:::

::: proof
$T = \dfrac{\bar X - \mu}{S/\sqrt n}$ has the $t_{n-1}$ distribution for every $\mu$ and $\sigma$, so it is a pivot. As in [[#thm-z-interval]], $\Prob(-t_{n-1,\alpha/2}\le T\le t_{n-1,\alpha/2}) = 1-\alpha$, and rearranging the inequalities to isolate $\mu$ gives the interval.
:::

::: example Caffeine content {#ex-caffeine}
The caffeine contents (mg) of eight cups of coffee from the same café were $98, 105, 92, 110, 101, 97, 104, 99$. Assuming a normal model, find a $95\%$ confidence interval for the mean caffeine content.
::: solution
Here $n = 8$, $\bar x = 806/8 = 100.75$, and $s = 5.55$, so the estimated standard error is $s/\sqrt8 = 1.962$. With $t_{7,0.025} = 2.365$,

$$
100.75\pm2.365\times1.962 = 100.75\pm4.64,\qquad\text{that is }[96.1,\ 105.4]\text{ mg}.
$$

Using $1.96$ instead of $2.365$ would give the narrower interval $[96.9, 104.6]$, whose true coverage is only about $91\%$: with a small sample, ignoring the uncertainty in $s$ makes us overconfident.
:::
:::

The t-interval is fairly **robust**: for moderate $n$ its coverage stays close to the nominal level even when the data are not normal, provided they are not strongly skewed or contaminated by outliers, because the central limit theorem makes $\bar X$ nearly normal. For large $n$ the $t$ and $z$ critical values are almost equal.

::: remark Intervals for a new observation
The interval [[#eq-t-interval]] is for the *mean* $\mu$. To predict a single new observation $X_{n+1}$ from the same normal population, note that $X_{n+1} - \bar X$ has variance $\sigma^2(1 + \frac1n)$ and is independent of $S$, which leads to the **prediction interval** $\bar X\pm t_{n-1,\alpha/2}\,S\sqrt{1 + 1/n}$. For the coffee data it is $100.75\pm2.365\times5.55\times1.061 = [86.8, 114.7]$ mg, much wider than the interval for the mean, and it does not shrink to zero width as $n\to\infty$.
:::

## Intervals for a proportion {#proportions}

For a proportion $p$ estimated by $\hat p = X/n$ with $X\sim\Bin(n,p)$, there is no exact pivot, but the central limit theorem provides an approximate one: $\dfrac{\hat p - p}{\sqrt{p(1-p)/n}}$ is approximately $\Normal(0,1)$ for large $n$. Replacing the unknown $p$ in the standard error by $\hat p$ gives the widely used **Wald interval**

$$
\hat p\pm z_{\alpha/2}\sqrt{\frac{\hat p(1-\hat p)}{n}}.
$$ {#eq-wald}

Its coverage tends to $1-\alpha$ as $n\to\infty$. The justification needs one more limit theorem, **Slutsky's theorem**: if $Y_n\xrightarrow{d}\Normal(0,1)$ and $V_n\xrightarrow{\Prob}1$, then $Y_n/V_n\xrightarrow{d}\Normal(0,1)$. Apply it with $V_n = \sqrt{\hat p(1-\hat p)/\bigl(p(1-p)\bigr)}$, which tends to $1$ in probability by the law of large numbers. The same argument shows that $\hat\theta\pm z_{\alpha/2}\operatorname{se}(\hat\theta)$ is an approximate confidence interval for any asymptotically normal estimator, such as the maximum likelihood estimators of [[statistics/estimation#thm-mle-asymptotic]].

::: example Approximate and exact intervals for a rate {#ex-rate-ci}
For the eight exponential waiting times of [[statistics/estimation#ex-mle-exponential]] ($\sum x_i = 16$ minutes, $\hat\lambda = 0.5$ calls per minute), compare the large-sample interval $\hat\lambda\pm1.96\operatorname{se}(\hat\lambda)$ with the exact interval based on the pivot $2\lambda\sum X_i\sim\chi^2_{2n}$ (derived in the exercises).
::: solution
The Fisher-information standard error is $\hat\lambda/\sqrt n = 0.5/\sqrt8 = 0.177$, so the large-sample interval is $0.5\pm0.35 = [0.15, 0.85]$. For the exact interval, $2\lambda\times16\sim\chi^2_{16}$, whose $2.5\%$ and $97.5\%$ points are $6.91$ and $28.85$; solving $6.91\le32\lambda\le28.85$ gives $[0.216, 0.901]$. The exact interval is shifted to the right and is not symmetric about $\hat\lambda$, reflecting the skewness of the sampling distribution of $\hat\lambda$ in a sample of eight. With small samples, approximate intervals should be treated with caution; with hundreds of observations the two would agree closely.
:::
:::

::: example A poll {#ex-poll-ci}
In a random sample of $1000$ voters, $520$ support a proposal. Find an approximate $95\%$ confidence interval for the population proportion.
::: solution
$\hat p = 0.52$ and $\sqrt{0.52\times0.48/1000} = 0.0158$, so the interval is $0.52\pm1.96\times0.0158 = 0.52\pm0.031$, that is $[0.489, 0.551]$. This is the "margin of error of $3$ percentage points" of the introduction. Since the interval contains $0.5$, the poll does not establish that a majority supports the proposal.
:::
:::

For small samples or proportions near $0$ or $1$ the Wald interval behaves badly. With $2$ successes in $20$ trials it gives $[-0.031, 0.231]$, which includes impossible negative values; with $0$ successes it collapses to the single point $[0, 0]$. Its actual coverage can be far below $95\%$ (see the exercises). A better interval, due to Edwin Wilson (1927), inverts the approximate pivot *without* replacing $p$ by $\hat p$ in the standard error: it is the set of $p$ satisfying $\lvert\hat p - p\rvert\le z_{\alpha/2}\sqrt{p(1-p)/n}$, a quadratic inequality in $p$. For $2$ out of $20$ it gives $[0.028, 0.301]$, and for $0$ out of $20$ it gives $[0, 0.161]$; for $520$ out of $1000$ it agrees with the Wald interval to three decimal places.

::: widget confidence
dist: bernoulli
n: 20
level: 0.95
intervals: 50
method: z
caption: Wald intervals $\hat p\pm1.96\sqrt{\hat p(1-\hat p)/n}$ for a proportion, from samples of size $20$. Count the misses: the coverage is usually noticeably below $95\%$, and some intervals stick out below $0$ or have zero width. Increase $n$ to $200$ and the coverage approaches the nominal level.
:::

::: application The rule of three
If a new treatment produces no serious side effects in $n$ patients, what can we say about the rate $p$ of side effects? The exact upper $95\%$ confidence bound is the value of $p$ for which observing zero events has probability $0.05$: $(1-p)^n = 0.05$, so $p = 1 - 0.05^{1/n}$. Since $\ln 0.05\approx-3$, this is approximately $3/n$. With no events in $300$ patients we can be $95\%$ confident that the rate is below about $1\%$ — not that it is zero.
:::

::: remark One-sided confidence bounds
Sometimes only one direction matters: a regulator wants to know that the caffeine content is *at least* some amount, or that a failure rate is *at most* some amount. Using the whole tail probability $\alpha$ on one side gives a **one-sided confidence bound**; for a normal mean, $\bar X - t_{n-1,\alpha}S/\sqrt n$ is a lower $1-\alpha$ bound, since $\Prob(T\le t_{n-1,\alpha}) = 1-\alpha$. For the coffee data, with $t_{7,0.05} = 1.895$, we can be $95\%$ confident that the mean caffeine content is at least $100.75 - 1.895\times1.962 = 97.0$ mg. The rule of three above is an upper one-sided bound.
:::

## An interval for a variance {#variance}

For a normal population, [[statistics/sampling#thm-normal-sample]] provides the pivot $(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$. Write $\chi^2_{k,p}$ for the upper-$p$ point of $\chi^2_k$.

::: theorem Chi-square interval for a normal variance {#thm-variance-interval}
If $X_1,\ldots,X_n\iid\Normal(\mu,\sigma^2)$, then

$$
\Bigl[\frac{(n-1)S^2}{\chi^2_{n-1,\alpha/2}},\ \frac{(n-1)S^2}{\chi^2_{n-1,1-\alpha/2}}\Bigr]
$$

is a confidence interval for $\sigma^2$ with confidence level $1-\alpha$. Taking square roots of the endpoints gives an interval for $\sigma$.
:::

::: proof
$\Prob\bigl(\chi^2_{n-1,1-\alpha/2}\le(n-1)S^2/\sigma^2\le\chi^2_{n-1,\alpha/2}\bigr) = 1-\alpha$. The inequality $(n-1)S^2/\sigma^2\le\chi^2_{n-1,\alpha/2}$ is equivalent to $\sigma^2\ge(n-1)S^2/\chi^2_{n-1,\alpha/2}$, and similarly for the other one, which gives the interval. Taking square roots preserves the event, since all quantities are positive.
:::

::: example Variability of a filling machine {#ex-variance-ci}
A sample of $10$ bottles from a filling machine has sample variance $s^2 = 4$ ml$^2$. Find a $95\%$ confidence interval for the standard deviation of the fill volume.
::: solution
With $9$ degrees of freedom, $\chi^2_{9,0.975} = 2.700$ and $\chi^2_{9,0.025} = 19.023$. The interval for $\sigma^2$ is

$$
\Bigl[\frac{9\times4}{19.023},\ \frac{9\times4}{2.700}\Bigr] = [1.89,\ 13.33],
$$

so for $\sigma$ it is $[1.38, 3.65]$ ml. The interval is not symmetric about $s = 2$, because the chi-square distribution is skewed, and it is wide: ten observations pin down a standard deviation only to within a factor of about $2.7$.
:::
:::

::: widget distribution
dist: chisq
params: k=9
a: 2.70
b: 19.02
caption: The $\chi^2_9$ distribution with its central $95\%$ shaded, between $2.70$ and $19.02$. These are the two critical values in the variance interval. Because the distribution is skewed to the right, the interval for $\sigma^2$ extends much further above $s^2$ than below it.
:::

Unlike the t-interval, this interval is **not robust**: its coverage can be far from $95\%$ if the population has heavier or lighter tails than the normal, even for large samples, because the variance of $S^2$ depends on the fourth moment of the population.

## Comparing two means {#two-sample}

Often the question is not about one mean but about a difference: does a new teaching method raise scores, is one fertiliser better than another? Suppose $X_1,\ldots,X_m\iid\Normal(\mu_1,\sigma^2)$ and, independently, $Y_1,\ldots,Y_n\iid\Normal(\mu_2,\sigma^2)$, with a *common* unknown variance. The **pooled variance**

$$
S_p^2 = \frac{(m-1)S_X^2 + (n-1)S_Y^2}{m+n-2}
$$

combines the two sample variances, and $(m+n-2)S_p^2/\sigma^2\sim\chi^2_{m+n-2}$, being the sum of independent $\chi^2_{m-1}$ and $\chi^2_{n-1}$ variables. Since $\bar X - \bar Y\sim\Normal\bigl(\mu_1-\mu_2,\sigma^2(\frac1m+\frac1n)\bigr)$ is independent of $S_p^2$,

$$
\frac{(\bar X - \bar Y) - (\mu_1-\mu_2)}{S_p\sqrt{\frac1m+\frac1n}}\sim t_{m+n-2},
$$

and the confidence interval for $\mu_1 - \mu_2$ is $\bar X - \bar Y\pm t_{m+n-2,\alpha/2}\,S_p\sqrt{\frac1m+\frac1n}$.

::: example Two teaching methods {#ex-two-sample}
Twelve students taught by method A scored a mean of $24.3$ with $s = 3.1$; ten students taught by method B scored a mean of $21.8$ with $s = 2.8$. Find a $95\%$ confidence interval for the difference in population means, assuming normal scores with equal variances.
::: solution
$s_p^2 = \dfrac{11\times3.1^2 + 9\times2.8^2}{20} = 8.81$, so $s_p = 2.97$ and the standard error of the difference is $2.97\sqrt{\frac1{12}+\frac1{10}} = 1.27$. With $t_{20,0.025} = 2.086$, the interval is

$$
2.5\pm2.086\times1.27 = 2.5\pm2.65,\qquad\text{that is }[-0.15,\ 5.15].
$$

The interval contains $0$, so the data are consistent with no difference between the methods, although they are also consistent with a difference of five points in favour of A. A larger study is needed to decide.
:::
:::

If the variances cannot be assumed equal, **Welch's interval** uses $\sqrt{S_X^2/m + S_Y^2/n}$ as the standard error with an approximate number of degrees of freedom; for the data above it gives almost the same answer, $[-0.13, 5.13]$. When the observations come in natural pairs — the same patient before and after treatment, twins, left and right eyes — they are not independent samples, and the right method is to compute the differences within pairs and apply the one-sample t-interval to them. Pairing removes the variation between subjects and often gives much shorter intervals.

::: quiz
A $95\%$ confidence interval for a mean difference is $[1.2, 4.8]$. Which statement is correct?
- [ ] There is a $95\%$ probability that the true difference is between $1.2$ and $4.8$.
- [ ] $95\%$ of the individual differences lie between $1.2$ and $4.8$.
- [x] The interval was produced by a method that captures the true difference in $95\%$ of samples, and it excludes $0$.
- [ ] If the study were repeated, there is a $95\%$ chance that the new estimate would lie between $1.2$ and $4.8$.
::: solution
The confidence level is a property of the procedure. The first statement is the common misinterpretation (it is a Bayesian statement, which needs a prior). The second confuses an interval for a mean with the spread of individual values. The fourth is also false: a replicated estimate falls in the original interval only about $83\%$ of the time on average, since both estimates vary. The useful conclusion here is that $0$ is excluded — the connection with tests is made in [[statistics/hypothesis-testing]].
:::
:::

::: history
Pierre-Simon Laplace computed approximate intervals for proportions in the early nineteenth century, in effect using the normal approximation of [[#eq-wald]], and "probable errors" were routinely quoted by astronomers and surveyors. The modern frequentist concept was created by Jerzy Neyman, first in a 1934 paper on sampling methods and then systematically in "Outline of a theory of statistical estimation based on the classical theory of probability" (1937), where he coined the term "confidence interval" and insisted on the interpretation in terms of long-run coverage. Edwin Bidwell Wilson proposed his interval for a proportion in 1927, and Charles Clopper and Egon Pearson gave an exact (conservative) interval based on the binomial distribution in 1934. Ronald Fisher's rival theory of "fiducial" intervals, which tried to attach probabilities to parameters without a prior, led to a long and bitter dispute with Neyman.
:::

## Where this leads {#where-next}

Confidence intervals and hypothesis tests are two sides of one coin: a value $\theta_0$ lies outside a $95\%$ confidence interval exactly when a corresponding test rejects $\theta = \theta_0$ at the $5\%$ level, as shown in [[statistics/hypothesis-testing]]. Intervals for regression coefficients and for predictions appear in [[statistics/regression]]. Bayesian credible intervals ([[statistics/bayesian]]) answer the question that confidence intervals are so often misread as answering. When no pivot is available and the sample is moderate, the **bootstrap** approximates the sampling distribution by resampling the data.

::: summary
- A $1-\alpha$ confidence interval is a random interval that covers the fixed true parameter with probability at least $1-\alpha$; the level describes the method, not one computed interval.
- Pivots — functions of data and parameter with a known distribution — are inverted to produce intervals: estimate $\pm$ critical value $\times$ standard error.
- Normal mean: $\bar x\pm z_{\alpha/2}\sigma/\sqrt n$ with $\sigma$ known, $\bar x\pm t_{n-1,\alpha/2}s/\sqrt n$ with $\sigma$ unknown; the t-interval is fairly robust to non-normality.
- Width is proportional to $1/\sqrt n$: to halve it, quadruple the sample; $n\ge(z\sigma/E)^2$ achieves margin $E$.
- Proportions: the Wald interval $\hat p\pm z\sqrt{\hat p(1-\hat p)/n}$ is fine for large samples but unreliable for small $n$ or extreme $p$; the Wilson interval is better. Zero events in $n$ trials gives an upper bound of about $3/n$.
- Normal variance: invert $(n-1)S^2/\sigma^2\sim\chi^2_{n-1}$; the interval is asymmetric and not robust.
- Two independent samples: pooled or Welch t-intervals for $\mu_1-\mu_2$; for paired data, analyse the differences.
:::

## Exercises

::: exercise A z-interval {level=1 check="1.96"}
A sample of $36$ observations from a normal population with $\sigma = 6$ has mean $72.4$. Find a $95\%$ confidence interval for $\mu$; enter its half-width (the margin of error).
::: solution
The standard error is $6/\sqrt{36} = 1$, so the margin is $1.96\times1 = 1.96$ and the interval is $[70.44, 74.36]$.
:::
:::

::: exercise A sample size {level=1 check="97"}
How large a sample is needed to estimate a mean to within $\pm2$ with $95\%$ confidence, if $\sigma = 10$?
::: solution
$n\ge(1.96\times10/2)^2 = 96.04$, so $n = 97$ (always round up).
:::
:::

::: exercise Shrinking an interval {level=1 check="1/2"}
By what factor does the width of a confidence interval for a mean change when the sample size is increased from $100$ to $400$ (other things equal)?
::: solution
The width is proportional to $1/\sqrt n$, so it is multiplied by $\sqrt{100/400} = \tfrac12$.
:::
:::

::: exercise A t-interval from summaries {level=2}
A sample of $16$ measurements from a normal population has $\bar x = 15.2$ and $s = 2.4$. Find a $95\%$ confidence interval for $\mu$ ($t_{15,0.025} = 2.131$).
::: solution
The standard error is $2.4/4 = 0.6$, so the interval is $15.2\pm2.131\times0.6 = 15.2\pm1.28$, that is $[13.92, 16.48]$.
:::
:::

::: exercise A proportion {level=2}
In a sample of $400$ adults, $180$ say they exercise regularly. Find an approximate $95\%$ confidence interval for the population proportion. Does it support the claim that fewer than half of adults exercise regularly?
::: solution
$\hat p = 0.45$ and $\sqrt{0.45\times0.55/400} = 0.0249$, so the interval is $0.45\pm0.049$, that is $[0.401, 0.499]$. It lies entirely below $0.5$, so the data support the claim (only just) at this confidence level.
:::
:::

::: exercise No side effects {level=2 check="1-0.05^(1/300)"}
A drug was given to $300$ patients and no serious side effect occurred. Find the exact upper $95\%$ confidence bound for the side-effect rate $p$, that is, the value of $p$ for which $\Prob(\text{no events}) = 0.05$.
::: solution
$(1-p)^{300} = 0.05$ gives $p = 1 - 0.05^{1/300}\approx0.00994$, close to the rule-of-three value $3/300 = 0.01$.
:::
:::

::: exercise An interval for a standard deviation {level=2}
A normal sample of size $15$ has $s^2 = 9$. Using $\chi^2_{14,0.975} = 5.629$ and $\chi^2_{14,0.025} = 26.119$, find a $95\%$ confidence interval for $\sigma$.
::: solution
For $\sigma^2$: $\bigl[\frac{14\times9}{26.119},\frac{14\times9}{5.629}\bigr] = [4.82, 22.38]$. Taking square roots, $\sigma\in[2.20, 4.73]$.
:::
:::

::: exercise An exact interval for an exponential mean {level=3}
Let $X_1,\ldots,X_n\iid\operatorname{Exp}(\lambda)$. Show that $2\lambda\sum_iX_i\sim\chi^2_{2n}$, and use it to construct an exact $1-\alpha$ confidence interval for the mean lifetime $1/\lambda$.
::: hint
Show first that $2\lambda X_1\sim\operatorname{Exp}(\tfrac12)$, which is $\chi^2_2$.
:::
::: solution
If $X\sim\operatorname{Exp}(\lambda)$ then $\Prob(2\lambda X>t) = \Prob(X>t/(2\lambda)) = e^{-t/2}$, so $2\lambda X\sim\operatorname{Exp}(\tfrac12)$, which is the $\chi^2_2$ distribution (its density $\tfrac12e^{-x/2}$ is the $k = 2$ case of the chi-square density). A sum of $n$ independent $\chi^2_2$ variables is $\chi^2_{2n}$, so $Q = 2\lambda\sum X_i\sim\chi^2_{2n}$ for every $\lambda$: a pivot. Then

$$
1-\alpha = \Prob\bigl(\chi^2_{2n,1-\alpha/2}\le2\lambda\textstyle\sum X_i\le\chi^2_{2n,\alpha/2}\bigr) = \Prob\Bigl(\dfrac{2\sum X_i}{\chi^2_{2n,\alpha/2}}\le\dfrac1\lambda\le\dfrac{2\sum X_i}{\chi^2_{2n,1-\alpha/2}}\Bigr),
$$

so $\Bigl[\dfrac{2\sum X_i}{\chi^2_{2n,\alpha/2}},\ \dfrac{2\sum X_i}{\chi^2_{2n,1-\alpha/2}}\Bigr]$ is an exact $1-\alpha$ interval for the mean $1/\lambda$.
:::
:::

::: exercise Simultaneous intervals {level=3}
$I_1$ and $I_2$ are confidence intervals for parameters $\theta_1$ and $\theta_2$, each with confidence level $1-\alpha/2$, computed from the same data (so they may be dependent). Prove that the probability that both cover their parameters is at least $1-\alpha$.
::: solution
Let $A_j$ be the event that $I_j$ fails to cover $\theta_j$, so $\Prob(A_j)\le\alpha/2$. By the union bound ([[probability/probability-spaces#thm-union-bound]]), $\Prob(A_1\cup A_2)\le\alpha$, so $\Prob(\text{both cover}) = 1 - \Prob(A_1\cup A_2)\ge1-\alpha$. More generally, $k$ intervals each at level $1-\alpha/k$ cover simultaneously with probability at least $1-\alpha$ (the Bonferroni method), whatever their dependence.
:::
:::

::: exercise When the Wald interval fails {level=3}
Let $X\sim\Bin(20, 0.01)$. Show that the $95\%$ Wald interval [[#eq-wald]] covers $p = 0.01$ only when $X\in\{1,2,3\}$, and deduce that its coverage probability is about $0.18$.
::: solution
If $X = 0$, then $\hat p = 0$ and the interval is $[0,0]$, which misses $0.01$. For $X = k\ge1$, $\hat p = k/20$ and the lower endpoint is $\hat p - 1.96\sqrt{\hat p(1-\hat p)/20}$: for $k = 1, 2, 3$ it is $-0.046$, $-0.031$, $-0.006$ (below $0.01$), and the upper endpoints exceed $0.01$; for $k = 4$ it is $0.2 - 1.96\sqrt{0.16/20} = 0.025>0.01$, and it increases with $k$ beyond that. So the coverage is $\Prob(1\le X\le3)$, which is $1 - 0.99^{20} - \Prob(X\ge4)\approx1 - 0.818 - 0.00004\approx0.182$. The nominal $95\%$ interval covers the truth less than a fifth of the time, almost entirely because it degenerates when no successes are observed.
:::
:::
