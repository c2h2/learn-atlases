A new drug cures $7$ of the first $10$ patients who receive it. What is the probability that its cure rate is above $50\%$? This sounds like the most natural question in the world, yet the methods of the previous chapters cannot answer it. For a frequentist the cure rate $p$ is a fixed unknown number, not a random variable, so "the probability that $p>0.5$" is either $0$ or $1$, and we do not know which. Confidence intervals and p-values describe the behaviour of procedures over repeated samples, not the probability of statements about $p$.

**Bayesian inference** answers the question directly, by treating the unknown parameter as a random variable whose distribution expresses our uncertainty about it. Before seeing the data, uncertainty is described by a **prior distribution**; Bayes' theorem ([[probability/conditional-probability#thm-bayes]]) combines it with the likelihood of the data to give a **posterior distribution**; and every conclusion — estimates, intervals, predictions, probabilities of hypotheses — is read off from the posterior. For the drug, with a uniform prior, the answer turns out to be $\Prob(p>0.5\mid\text{data}) = 227/256\approx0.89$. This chapter develops the machinery, works through the main **conjugate** models, and compares the Bayesian and frequentist approaches honestly.

## From Bayes' theorem to posterior distributions {#posterior}

In [[probability/conditional-probability]] Bayes' theorem updated the probabilities of a partition of events. The same calculation applies when the "events" are the possible values of a parameter.

::: example Which coin? {#ex-three-coins}
A bag contains three coins with probabilities of heads $0.25$, $0.5$ and $0.75$. One coin is drawn at random and tossed $10$ times, giving $7$ heads. Find the posterior probability of each coin.
::: solution
The prior gives each coin probability $\tfrac13$. The likelihood of $7$ heads in $10$ tosses for a coin with parameter $p$ is $\binom{10}{7}p^7(1-p)^3$; the binomial coefficient is common to all three and cancels. The values of $p^7(1-p)^3$ are $2.57\times10^{-5}$, $9.77\times10^{-4}$ and $2.09\times10^{-3}$. Multiplying by the prior and normalising,

$$
\Prob(p = 0.25\mid\text{data}) = 0.008,\qquad\Prob(p = 0.5\mid\text{data}) = 0.316,\qquad\Prob(p = 0.75\mid\text{data}) = 0.675 .
$$

The data have made the biased-towards-heads coin about twice as probable as the fair one, and have practically excluded the coin biased towards tails.
:::
:::

When the parameter is continuous, probabilities are replaced by densities. Write $\pi(\theta)$ for the prior density of $\theta$ and $f(x\mid\theta)$ for the density (or pmf) of the data $x = (x_1,\ldots,x_n)$ given $\theta$ — for a random sample, the product $\prod_if(x_i\mid\theta)$, which is the likelihood $L(\theta)$ of [[statistics/estimation#def-likelihood]].

::: theorem Bayes' theorem for densities {#thm-bayes-density}
The posterior density of $\theta$ given the data $x$ is

$$
\pi(\theta\mid x) = \frac{f(x\mid\theta)\,\pi(\theta)}{\int f(x\mid\vartheta)\,\pi(\vartheta)\,d\vartheta}\ \propto\ L(\theta)\,\pi(\theta),
$$ {#eq-posterior}

provided the denominator, the **marginal likelihood** $m(x)$, is positive and finite.
:::

::: proof
Treat $(\theta, X)$ as a pair of jointly distributed random variables with joint density $f(x\mid\theta)\pi(\theta)$ — the prior density of $\theta$ times the conditional density of the data given $\theta$. The marginal density of the data is $m(x) = \int f(x\mid\vartheta)\pi(\vartheta)\,d\vartheta$ ([[probability/joint-distributions#prop-marginal-density]]), and the conditional density of $\theta$ given $X = x$ is the joint density divided by this marginal, by [[probability/joint-distributions#eq-conditional-density]].
:::

The slogan is **posterior $\propto$ likelihood $\times$ prior**. The constant of proportionality does not depend on $\theta$, and it can often be found at the end by recognising the form of a known density. Posteriors can also be updated sequentially: the posterior after one batch of data serves as the prior for the next, and the final result is the same as processing all the data at once (both are proportional to the prior times the product of all the likelihoods).

## The beta–binomial model {#beta-binomial}

For a proportion $p$, the natural family of priors is the beta family.

::: definition Beta distribution {#def-beta}
For $\alpha,\beta>0$, the **beta distribution** $\operatorname{Beta}(\alpha,\beta)$ has density

$$
\pi(p) = \frac{p^{\alpha-1}(1-p)^{\beta-1}}{B(\alpha,\beta)},\qquad0<p<1,
$$

where $B(\alpha,\beta) = \int_0^1t^{\alpha-1}(1-t)^{\beta-1}\,dt = \dfrac{\Gamma(\alpha)\Gamma(\beta)}{\Gamma(\alpha+\beta)}$. Its mean is $\dfrac{\alpha}{\alpha+\beta}$ and its variance is $\dfrac{\alpha\beta}{(\alpha+\beta)^2(\alpha+\beta+1)}$.
:::

The family is flexible: $\operatorname{Beta}(1,1)$ is the uniform distribution, $\operatorname{Beta}(\alpha,\beta)$ with $\alpha = \beta$ is symmetric about $\tfrac12$, and larger $\alpha+\beta$ means a more concentrated distribution. It is also exactly what a binomial likelihood turns into a posterior.

::: theorem Beta prior, binomial data {#thm-beta-binomial}
If $p\sim\operatorname{Beta}(\alpha,\beta)$ and, given $p$, $X\sim\Bin(n,p)$ is observed to equal $s$, then the posterior distribution is

$$
p\mid X = s\ \sim\ \operatorname{Beta}(\alpha + s,\ \beta + n - s).
$$
:::

::: proof
By [[#thm-bayes-density]], for $0<p<1$,

$$
\pi(p\mid s)\propto\binom nsp^s(1-p)^{n-s}\cdot p^{\alpha-1}(1-p)^{\beta-1}\propto p^{\alpha+s-1}(1-p)^{\beta+n-s-1}.
$$

This is, up to a constant, the $\operatorname{Beta}(\alpha+s,\beta+n-s)$ density; since both are densities (they integrate to $1$), the constants must agree.
:::

A family of priors that produces posteriors in the same family is called **conjugate** to the likelihood. The update has a beautifully simple interpretation: the prior acts like $\alpha$ prior successes and $\beta$ prior failures, and the data add $s$ real successes and $n-s$ real failures. The posterior mean is a weighted average of the prior mean and the sample proportion:

$$
\E(p\mid s) = \frac{\alpha+s}{\alpha+\beta+n} = \frac{\alpha+\beta}{\alpha+\beta+n}\cdot\frac{\alpha}{\alpha+\beta} + \frac{n}{\alpha+\beta+n}\cdot\frac{s}{n}.
$$ {#eq-shrinkage}

As $n$ grows the weight on the data tends to $1$, and the prior matters less and less.

::: example The new drug {#ex-drug}
With a uniform prior $\operatorname{Beta}(1,1)$ on the cure rate $p$, $7$ cures are observed in $10$ patients. Find the posterior distribution, the posterior mean, a $95\%$ credible interval, and $\Prob(p>0.5\mid\text{data})$.
::: solution
By [[#thm-beta-binomial]] the posterior is $\operatorname{Beta}(8, 4)$, with mean $8/12 = 2/3$ and standard deviation $0.13$. (The posterior *mode*, $7/10$, equals the maximum likelihood estimate, as it always does with a uniform prior.) The central $95\%$ of the $\operatorname{Beta}(8,4)$ distribution runs from its $2.5\%$ to its $97.5\%$ point:

$$
p\in[0.390,\ 0.891]\quad\text{with posterior probability }0.95 .
$$

Finally, integrating the posterior density $\frac{p^7(1-p)^3}{B(8,4)}$ from $0.5$ to $1$ (a polynomial integral) gives $\Prob(p>0.5\mid\text{data}) = \frac{227}{256}\approx0.887$. So, given the data and the prior, it is about $89\%$ probable that the drug cures more than half of patients — a direct answer to the question in the introduction.
:::
:::

::: widget bayes
mode: beta
a: 1
b: 1
successes: 7
trials: 10
caption: Beta prior (here uniform) and the posterior after $7$ successes in $10$ trials, $\operatorname{Beta}(8,4)$. Increase the number of trials keeping the proportion at $70\%$: the posterior narrows around $0.7$. Then try a sceptical prior such as $\operatorname{Beta}(10,10)$, centred at $\tfrac12$: with $10$ trials it pulls the posterior noticeably towards $0.5$, with $200$ trials hardly at all.
:::

The posterior also predicts future observations. The probability that the next patient is cured, given the data, averages the cure probability $p$ over the posterior: $\Prob(\text{next cured}\mid s) = \E(p\mid s)$, by the law of total probability (in its continuous form, [[probability/expectation#thm-tower]]).

::: corollary Laplace's rule of succession {#cor-succession}
With a uniform prior on $p$, after $s$ successes in $n$ independent trials, the probability that the next trial is a success is $\dfrac{s+1}{n+2}$.
:::

::: proof
The posterior is $\operatorname{Beta}(s+1, n-s+1)$, whose mean is $\dfrac{s+1}{n+2}$; by the remark above this is the predictive probability of a success.
:::

Laplace applied the rule, half seriously, to the question of whether the sun will rise tomorrow: taking recorded history to cover $5000$ years, about $1\,826\,213$ days of sunrises, he obtained odds of $1\,826\,214$ to $1$ in favour. The rule never gives probability $0$ or $1$: after $0$ successes in $n$ trials it gives $\frac{1}{n+2}$, not zero, a sensible hedge against the conclusion that something not yet seen is impossible.

## Normal data with known variance {#normal-normal}

For a normal mean, the conjugate prior is normal. It is convenient to work with **precisions**, the reciprocals of variances.

::: theorem Normal prior, normal data {#thm-normal-normal}
Let $\theta\sim\Normal(\mu_0,\tau_0^2)$ and, given $\theta$, let $X_1,\ldots,X_n\iid\Normal(\theta,\sigma^2)$ with $\sigma^2$ known. Then $\theta\mid x\sim\Normal(\mu_n,\tau_n^2)$, where

$$
\frac{1}{\tau_n^2} = \frac{1}{\tau_0^2} + \frac{n}{\sigma^2},\qquad\mu_n = \tau_n^2\Bigl(\frac{\mu_0}{\tau_0^2} + \frac{n\bar x}{\sigma^2}\Bigr).
$$ {#eq-normal-posterior}
:::

::: proof
As a function of $\theta$, the likelihood is

$$
L(\theta)\propto\exp\Bigl(-\frac{1}{2\sigma^2}\sum_i(x_i-\theta)^2\Bigr)\propto\exp\Bigl(-\frac{n}{2\sigma^2}(\theta-\bar x)^2\Bigr),
$$

using $\sum_i(x_i-\theta)^2 = \sum_i(x_i-\bar x)^2 + n(\bar x-\theta)^2$, whose first term does not involve $\theta$. Multiplying by the prior density and collecting the terms in the exponent that involve $\theta$,

$$
-\frac12\Bigl[\frac{(\theta-\mu_0)^2}{\tau_0^2} + \frac{n(\theta - \bar x)^2}{\sigma^2}\Bigr] = -\frac12\Bigl[\Bigl(\frac1{\tau_0^2}+\frac n{\sigma^2}\Bigr)\theta^2 - 2\Bigl(\frac{\mu_0}{\tau_0^2} + \frac{n\bar x}{\sigma^2}\Bigr)\theta\Bigr] + \text{const} = -\frac{(\theta-\mu_n)^2}{2\tau_n^2} + \text{const},
$$

by completing the square, with $\tau_n$ and $\mu_n$ as in [[#eq-normal-posterior]]. So the posterior density is proportional to the $\Normal(\mu_n,\tau_n^2)$ density, and hence equal to it.
:::

In words: **precisions add**, and the posterior mean is the precision-weighted average of the prior mean and the sample mean. The data enter only through $\bar x$, whose precision is $n/\sigma^2$.

::: example A noisy test score {#ex-iq}
IQ scores in a population are $\Normal(100, 15^2)$. A person's score on a test with measurement error of standard deviation $5$ is $130$. Treating their true IQ $\theta$ as drawn from the population, find its posterior distribution.
::: solution
The prior precision is $1/225$ and the data precision is $1/25$, nine times larger. By [[#thm-normal-normal]] with $n = 1$, the posterior precision is $\frac{1}{225}+\frac1{25} = \frac{10}{225}$, so $\tau_1^2 = 22.5$ and $\tau_1 = 4.74$, and

$$
\mu_1 = \frac{1}{10}\times100 + \frac{9}{10}\times130 = 127 .
$$

So $\theta\mid\text{score}\sim\Normal(127, 4.74^2)$, and a $95\%$ credible interval is $127\pm1.96\times4.74 = [117.7, 136.3]$. The estimate is **shrunk** from the observed $130$ towards the population mean: high scores are partly due to favourable measurement error, which is regression to the mean ([[statistics/regression]]) seen through Bayesian eyes. With more tests the data precision grows and the shrinkage fades.
:::
:::

::: widget plot
f: exp(-(x - m)^2/(2*t^2))/(t*sqrt(2*pi)); exp(-(x - 130)^2/(2*25/k))/sqrt(2*pi*25/k); exp(-(x - (m/t^2 + 130*k/25)/(1/t^2 + k/25))^2*(1/t^2 + k/25)/2)*sqrt((1/t^2 + k/25)/(2*pi))
x: 60, 160
y: 0, 0.4
sliders: m=100:70:130:1; t=15:2:30:1; k=1:1:20:1
labels: \text{prior}; \text{likelihood}; \text{posterior}
caption: Prior $\Normal(m, t^2)$ for a true score, likelihood from $k$ tests averaging $130$ (each with error standard deviation $5$), and the resulting posterior. The posterior always lies between prior and likelihood and is narrower than both. Increase $k$ and the posterior moves to the data; shrink the prior standard deviation $t$ and it is dragged towards the prior mean. A flat prior (large $t$) makes the posterior match the likelihood.
:::

::: quiz
In the normal–normal model, what happens to the posterior as the number of observations $n\to\infty$ (with the prior fixed)?
- [ ] It converges to the prior.
- [ ] Its variance converges to $\tau_0^2$.
- [x] Its mean approaches $\bar x$ and its variance behaves like $\sigma^2/n$.
- [ ] It becomes uniform.
::: solution
The posterior precision is $1/\tau_0^2 + n/\sigma^2$, dominated by $n/\sigma^2$ for large $n$, so the variance is about $\sigma^2/n$ and the weight on $\bar x$ tends to $1$. The prior is overwhelmed by the data, and the posterior looks like the frequentist sampling distribution of $\bar x$ re-centred at the data — a simple case of the Bernstein–von Mises theorem below.
:::
:::

## Posterior summaries and credible intervals {#credible}

The posterior distribution is the complete answer; in practice we summarise it.

::: definition Credible interval {#def-credible}
A **$1-\alpha$ credible interval** for $\theta$ is an interval $[a,b]$ with $\Prob(a\le\theta\le b\mid x) = 1-\alpha$. The **equal-tailed** interval puts posterior probability $\alpha/2$ in each tail; the **highest posterior density** (HPD) interval is the shortest one, consisting of the values with the highest posterior density.
:::

Point summaries include the posterior mean, median and mode. Each is optimal for a different notion of error: the posterior mean minimises the posterior expected squared error (see the exercises), the median the expected absolute error. For the drug, the equal-tailed $95\%$ interval is $[0.390, 0.891]$ and the HPD interval $[0.412, 0.907]$; they differ because the posterior is skewed.

The interpretation of a credible interval is the one people instinctively give to confidence intervals: *given the data and the prior*, the parameter lies in the interval with probability $0.95$. The price is the prior, on which the statement depends.

::: example Accident counts {#ex-gamma-poisson}
The number of accidents per month at a junction is $\operatorname{Poisson}(\lambda)$. Previous experience at similar junctions suggests a prior $\lambda\sim\operatorname{Gamma}(2, 1)$ (shape $2$, rate $1$, so prior mean $2$). Over three months, $3$, $5$ and $4$ accidents occur. Find the posterior distribution of $\lambda$ and the probability of an accident-free month next month.
::: solution
The likelihood is $\prod_ie^{-\lambda}\lambda^{x_i}/x_i!\propto\lambda^{12}e^{-3\lambda}$, and the gamma prior density is proportional to $\lambda^{2-1}e^{-\lambda}$. Their product is proportional to $\lambda^{14-1}e^{-4\lambda}$, so the posterior is $\operatorname{Gamma}(14, 4)$ — the gamma family is conjugate to the Poisson, the shape gaining the total count and the rate gaining the number of periods. The posterior mean is $14/4 = 3.5$, between the prior mean $2$ and the sample mean $4$, and the equal-tailed $95\%$ credible interval is $[1.91, 5.56]$.

For prediction, average the Poisson probability of zero over the posterior:

$$
\Prob(\text{no accidents}\mid\text{data}) = \int_0^\infty e^{-\lambda}\frac{4^{14}\lambda^{13}e^{-4\lambda}}{\Gamma(14)}\,d\lambda = \Bigl(\frac45\Bigr)^{14}\approx0.044,
$$

using $\int_0^\infty\lambda^{13}e^{-5\lambda}\,d\lambda = \Gamma(14)/5^{14}$. Plugging in the point estimate $\lambda = 3.5$ instead would give $e^{-3.5}\approx0.030$, which understates the chance because it ignores the uncertainty in $\lambda$.
:::
:::

::: widget distribution
dist: beta
params: alpha=8, beta=4
a: 0.5
b: 1
caption: The $\operatorname{Beta}(8,4)$ posterior for the cure rate of the new drug, with $\Prob(p>0.5\mid\text{data}) = 227/256\approx0.887$ shaded. Move the left end of the shaded region to $0.390$: the interval from $0.390$ to $0.891$, which carries $95\%$ of the posterior probability, is the $95\%$ equal-tailed credible interval.
:::

## Comparing hypotheses with Bayes factors {#bayes-factors}

To compare two hypotheses $H_0$ and $H_1$, Bayesian inference computes their posterior probabilities. In odds form ([[probability/conditional-probability#prop-odds]]),

$$
\frac{\Prob(H_0\mid x)}{\Prob(H_1\mid x)} = \underbrace{\frac{m_0(x)}{m_1(x)}}_{\text{Bayes factor }B_{01}}\times\frac{\Prob(H_0)}{\Prob(H_1)},
$$

where $m_j(x) = \int f(x\mid\theta)\pi_j(\theta)\,d\theta$ is the marginal likelihood of the data under $H_j$, the likelihood averaged over the prior that $H_j$ places on the parameter. The **Bayes factor** measures how much the data shift the odds; Harold Jeffreys suggested that factors above about $10$ count as strong evidence.

::: example Is the coin fair? A Bayesian answer {#ex-bayes-factor}
A coin shows $60$ heads in $100$ tosses. Compare $H_0$: $p = \tfrac12$ with $H_1$: $p\sim\operatorname{U}(0,1)$, giving the two hypotheses equal prior probability.
::: solution
Under $H_0$ the probability of the data is $\binom{100}{60}2^{-100} = 0.0108$. Under $H_1$ it is $\int_0^1\binom{100}{60}p^{60}(1-p)^{40}\,dp = \frac{1}{101}\approx0.0099$ (every number of heads from $0$ to $100$ is equally likely when $p$ is uniform, as in [[probability/expectation#ex-unknown-bias]]). So $B_{01} = 0.0108/0.0099\approx1.10$, and $\Prob(H_0\mid\text{data})\approx0.52$.

The data are essentially uninformative about fairness, even slightly favouring it. Contrast the two-sided p-value of $0.057$ in [[statistics/hypothesis-testing#ex-coin-test]], which is often read as "nearly significant evidence of bias". The two answers address different questions — and the Bayes factor depends on the prior under $H_1$ — but the comparison shows how weak a p-value near $0.05$ can be as evidence. This tension, in its extreme form with large samples, is known as **Lindley's paradox**.
:::
:::

## Bayesian and frequentist inference compared {#comparison}

The two schools differ in what they treat as random. Frequentist methods treat the parameter as fixed and the data as random, and evaluate *procedures* by their long-run performance (bias, coverage, error rates). Bayesian methods condition on the observed data and treat the parameter as random, expressing all uncertainty as probability.

- **What is answered.** A credible interval gives $\Prob(\theta\in I\mid x)$, a posterior probability for a hypothesis gives $\Prob(H\mid x)$ — the quantities people usually want. Confidence intervals and p-values give probabilities about data, which are easily misread.
- **The prior.** Bayesian conclusions depend on a prior, which may be informative (based on previous studies) or chosen to be weak. Critics see subjectivity; defenders reply that frequentist methods also involve choices (of model, test and stopping rule), and that priors are at least explicit and can be varied in a **sensitivity analysis**. **Improper priors**, such as a "flat" density on the whole real line, are often used as a reference and can give proper posteriors, but must be handled with care.
- **Large samples.** In regular models the two usually agree, because the likelihood dominates any fixed prior.

::: theorem Bernstein–von Mises theorem {#thm-bvm}
In a regular parametric model, with a prior density that is continuous and positive at the true value $\theta_0$, the posterior distribution is approximately $\Normal\bigl(\hat\theta_n, 1/(nI(\theta_0))\bigr)$ for large $n$, where $\hat\theta_n$ is the maximum likelihood estimator; precisely, the total variation distance between the posterior and this normal distribution tends to $0$ in probability.
:::

(The statement is given without proof; see van der Vaart, *Asymptotic Statistics*, Chapter 10.) Consequently $95\%$ credible intervals and $95\%$ confidence intervals nearly coincide in large samples, and posterior means are asymptotically efficient, by [[statistics/estimation#thm-mle-asymptotic]]. The approaches differ most in small samples, in problems with many parameters (where priors that **pool** information across groups give much better estimates), and in testing.

::: warning Credible and confidence intervals are not interchangeable
A $95\%$ credible interval says "given these data and this prior, $\theta$ is in the interval with probability $0.95$"; a $95\%$ confidence interval says "this method captures $\theta$ in $95\%$ of samples". They can coincide numerically — with a flat prior for a normal mean they are identical — but they can also differ substantially, as for the drug: the Wald confidence interval $0.7\pm1.96\sqrt{0.21/10} = [0.42, 0.98]$ against the credible interval $[0.39, 0.89]$. Do not report one with the interpretation of the other. And a posterior with a strongly informative prior can be confidently wrong if the prior is wrong: check how conclusions change when the prior changes.
:::

::: application Computing posteriors by simulation
Conjugate priors give closed-form posteriors, but realistic models — with many parameters, hierarchical structure, or non-standard likelihoods — rarely do: the normalising constant $m(x)$ in [[#eq-posterior]] is a high-dimensional integral that cannot be computed. **Markov chain Monte Carlo** sidesteps it. One constructs a Markov chain whose stationary distribution is the posterior, using only the unnormalised product $L(\theta)\pi(\theta)$, and runs it for a long time; by the convergence and ergodic theorems of [[probability/markov-chains]], the visited values behave like a sample from the posterior, from which means, intervals and predictive probabilities are estimated as averages. The Metropolis–Hastings algorithm and the Gibbs sampler made Bayesian statistics practical from about 1990, and they are the engines of modern probabilistic programming software.
:::

::: quiz
For the drug example, a frequentist and a Bayesian (with a uniform prior) both analyse the data $7/10$. Which statement can *only* the Bayesian make?
- [ ] The maximum likelihood estimate of $p$ is $0.7$.
- [ ] A procedure that produced the interval would cover $p$ in about $95\%$ of samples.
- [x] Given the data, the probability that $p$ exceeds $0.5$ is about $0.89$.
- [ ] The data are compatible with a cure rate of $0.6$.
::: solution
A probability statement about $p$ given the data needs a probability distribution for $p$, which only the Bayesian has. The MLE and coverage statements are frequentist, and "compatible with $0.6$" can be said by either (the value lies in both intervals).
:::
:::

::: history
Thomas Bayes's posthumous essay of 1763 solved the problem of inferring a binomial probability with a uniform prior, essentially the beta–binomial model of this chapter. Pierre-Simon Laplace independently developed "inverse probability" from 1774 onwards, derived the rule of succession, and applied Bayesian reasoning to problems from astronomy to the ratio of male to female births. In the early twentieth century Fisher's criticism of arbitrary priors pushed inverse probability out of favour, but it was kept alive by Harold Jeffreys, whose *Theory of Probability* (1939) introduced reference priors and Bayes factors, and given subjectivist foundations by Frank Ramsey, Bruno de Finetti and Leonard Savage (*The Foundations of Statistics*, 1954). During the Second World War Alan Turing and his colleagues at Bletchley Park used sequential Bayes factors, measured in units Turing called "bans", to help break the Enigma cipher. The practical revolution came with computing: the Metropolis algorithm (1953), generalised by Hastings (1970), was brought to statistics by Alan Gelfand and Adrian Smith in 1990.
:::

## Where this leads {#where-next}

Bayesian inference extends to every model in this course: Bayesian regression puts priors on the coefficients of [[statistics/regression]] (and, with normal priors, reproduces ridge regression); hierarchical models share information across groups, such as hospitals or schools, by giving their parameters a common prior with unknown parameters of its own; and Bayesian decision theory combines posteriors with costs of errors. Computation relies on the Markov chain theory of [[probability/markov-chains]]. Gelman and colleagues' *Bayesian Data Analysis* is the standard guide to applied Bayesian modelling.

::: summary
- Bayesian inference treats parameters as random: posterior $\propto$ likelihood $\times$ prior, and all conclusions come from the posterior.
- Beta–binomial: a $\operatorname{Beta}(\alpha,\beta)$ prior and $s$ successes in $n$ trials give $\operatorname{Beta}(\alpha+s,\beta+n-s)$; the posterior mean shrinks $s/n$ towards the prior mean.
- Normal–normal (known variance): precisions add, and the posterior mean is the precision-weighted average of the prior mean and $\bar x$. Gamma–Poisson is the conjugate pair for counts.
- Predictive probabilities average over the posterior; with a uniform prior, $\Prob(\text{next success}) = (s+1)/(n+2)$.
- A credible interval contains $\theta$ with posterior probability $1-\alpha$ — the interpretation often wrongly given to confidence intervals; it depends on the prior.
- Bayes factors compare hypotheses by their marginal likelihoods; a p-value near $0.05$ may correspond to almost no evidence.
- With large samples the prior is overwhelmed and Bayesian and frequentist answers agree (Bernstein–von Mises); MCMC makes complex posteriors computable.
:::

## Exercises

::: exercise A beta update {level=1 check="6/11"}
A proportion has prior $\operatorname{Beta}(2,3)$. In $6$ trials there are $4$ successes. Find the posterior distribution and the posterior mean.
::: solution
By [[#thm-beta-binomial]] the posterior is $\operatorname{Beta}(2+4, 3+2) = \operatorname{Beta}(6,5)$, with mean $6/11\approx0.545$.
:::
:::

::: exercise The rule of succession {level=1 check="10/11"}
An event has occurred in each of $9$ independent trials. With a uniform prior on its probability, what is the probability that it occurs on the next trial?
::: solution
By [[#cor-succession]], $(9+1)/(9+2) = 10/11\approx0.909$.
:::
:::

::: exercise A single normal observation {level=1 check="1"}
The prior for $\theta$ is $\Normal(0,1)$ and one observation $x = 2$ is made from $\Normal(\theta, 1)$. Find the posterior mean and variance; enter the mean.
::: solution
The prior and data precisions are both $1$, so the posterior precision is $2$ (variance $\tfrac12$) and the posterior mean is $\tfrac12\times0 + \tfrac12\times2 = 1$.
:::
:::

::: exercise Two more cures {level=2 check="6/13"}
With the $\operatorname{Beta}(8,4)$ posterior of [[#ex-drug]], find the probability that both of the next two patients are cured.
::: hint
Given $p$, the probability is $p^2$; average it over the posterior.
:::
::: solution
$\E(p^2\mid\text{data}) = \Var + (\E)^2$, or directly for $\operatorname{Beta}(a,b)$, $\E p^2 = \frac{a(a+1)}{(a+b)(a+b+1)} = \frac{8\times9}{12\times13} = \frac{72}{156} = \frac{6}{13}\approx0.46$. This is larger than $(2/3)^2 = 0.444$: uncertainty about $p$ makes outcomes positively correlated.
:::
:::

::: exercise A gamma–Poisson update {level=2 check="13/5"}
A rate $\lambda$ has prior $\operatorname{Gamma}(3,1)$. Poisson counts $2, 4, 1, 3$ are observed in four periods. Find the posterior distribution and posterior mean.
::: solution
As in [[#ex-gamma-poisson]], the shape gains the total count $10$ and the rate gains the number of periods $4$: the posterior is $\operatorname{Gamma}(13, 5)$, with mean $13/5 = 2.6$ (between the prior mean $3$ and the sample mean $2.5$).
:::
:::

::: exercise A two-headed coin? {level=2 check="0.01/(0.01+0.99/32)"}
A coin is either fair or two-headed; you believe it is two-headed with probability $0.01$. It is tossed $5$ times and shows $5$ heads. Find the posterior probability that it is two-headed.
::: solution
The likelihoods of $5$ heads are $1$ (two-headed) and $1/32$ (fair). By Bayes' theorem,

$$
\Prob(\text{two-headed}\mid5\text{ heads}) = \frac{0.01\times1}{0.01\times1 + 0.99\times\frac1{32}}\approx0.244 .
$$

The Bayes factor in favour of the two-headed coin is $32$, but the low prior keeps the posterior below $\tfrac14$; five more heads would raise it to about $0.91$.
:::
:::

::: exercise The posterior mean minimises squared error {level=3}
Let $\theta$ have posterior distribution with finite variance. Prove that $g(a) = \E\bigl[(\theta-a)^2\mid x\bigr]$ is minimised at $a = \E(\theta\mid x)$, with minimum value the posterior variance.
::: solution
Write $m = \E(\theta\mid x)$. Then $(\theta-a)^2 = (\theta-m)^2 + 2(\theta-m)(m-a) + (m-a)^2$, and taking posterior expectations, the middle term vanishes because $\E(\theta - m\mid x) = 0$:

$$
g(a) = \Var(\theta\mid x) + (m-a)^2,
$$

which is minimised exactly at $a = m$, with minimum $\Var(\theta\mid x)$. (This is the posterior version of the bias–variance decomposition in [[statistics/estimation#thm-mse]].)
:::
:::

::: exercise Only the sample mean matters {level=3}
In the normal–normal model of [[#thm-normal-normal]], show that the posterior given all of $x_1,\ldots,x_n$ is the same as the posterior given only $\bar x$, treated as a single observation from $\Normal(\theta,\sigma^2/n)$.
::: solution
Given $\theta$, $\bar X\sim\Normal(\theta,\sigma^2/n)$, so a single observation $\bar x$ with variance $\sigma^2/n$ has likelihood proportional to $\exp\bigl(-\frac{n}{2\sigma^2}(\theta-\bar x)^2\bigr)$. The proof of [[#thm-normal-normal]] showed that the likelihood of the full sample is proportional (as a function of $\theta$) to exactly the same expression. Since posterior $\propto$ likelihood $\times$ prior, the two posteriors coincide. In the language of [[statistics/estimation]], $\bar X$ is a **sufficient statistic**: it carries all the information in the sample about $\theta$.
:::
:::

::: exercise Jeffreys' prior for a proportion {level=3}
Harold Jeffreys proposed the prior $\pi(\theta)\propto\sqrt{I(\theta)}$, where $I$ is the Fisher information. Show that for a Bernoulli proportion it is the $\operatorname{Beta}(\tfrac12,\tfrac12)$ distribution, and find the posterior after $s$ successes in $n$ trials. What is the posterior mean after $0$ successes in $10$ trials?
::: solution
By [[statistics/estimation]], $I(p) = \frac{1}{p(1-p)}$, so $\sqrt{I(p)} = p^{-1/2}(1-p)^{-1/2}$, which is proportional to the $\operatorname{Beta}(\tfrac12,\tfrac12)$ density (it is integrable, since the exponents exceed $-1$). By [[#thm-beta-binomial]] the posterior is $\operatorname{Beta}\bigl(s+\tfrac12, n-s+\tfrac12\bigr)$, with mean $\frac{s+1/2}{n+1}$. After $0$ successes in $10$ trials this is $\frac{0.5}{11} = \frac{1}{22}\approx0.045$, compared with $\frac{1}{12}$ under the uniform prior. Jeffreys' prior has the attractive property that it gives the same answer whatever parametrisation of the model is used.
:::
:::
