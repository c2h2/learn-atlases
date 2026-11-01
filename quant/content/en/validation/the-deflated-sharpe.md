The best of many tries is a different random variable from any one try that was named in advance. [[validation/parameter-search]] counted the tries: nine grid cells on WF04, thirty sequential trials on WF05. This chapter asks what that count does to a performance statistic under a deliberately narrow probability model, and it stops where the model stops. The **deflated Sharpe ratio**, as defined by David H. Bailey and Marcos López de Prado in the Journal of Portfolio Management in 2014, is a correction of a reported Sharpe ratio for selection among trials, for the length of the sample, and for non-normal returns. This lesson does not reproduce their expression. Writing a half-remembered version of it would be worse than pointing at the paper. What is derived here is the normal approximation the trial count enters through: under a true null and independent normal trials, the expected maximum of $N$ standardised statistics grows like $\sqrt{2\ln N}$.

That phrase is a statement about growth, not an identity you may paste over a Sharpe ratio. The object $\sqrt{2\ln N}$ is a **leading-term selection scale** in standardised units. It is not itself a Sharpe ratio, not an annualised pass mark, and not the deflated Sharpe ratio. A reported in-sample Sharpe ratio has to clear a hurdle that rises with $N$ once the statistic has been studentised. Sample length is how you studentise. Skewness and heavier tails change the studentisation again. Both of those adjustments live in the 2014 paper. They do not live in the symbol $\sqrt{2\ln N}$.

Nothing on this page is a threshold above which a rule should be traded. The library pages do not, in the table this atlas quotes, report the nine WF04 cell Sharpe ratios or the WF05 winner's Sharpe ratio. There is therefore nothing on those pages for us to pass or fail. Inventing a pass would be inventing a backtest.

## A scale for the maximum, and what it assumes

Standardisation comes first. A raw Sharpe ratio is a mean divided by a standard deviation. Under a null of no edge its sampling distribution, in large samples and under further assumptions, concentrates near zero and has some standard error. Dividing the estimate by that standard error produces a standardised statistic. If the standardisation is right, the statistic is approximately standard normal when the null is true. The selection problem then concerns the maximum of several such statistics.

:::definition Leading-term selection scale {#def-scale}
Let $Z_1, \ldots, Z_N$ be the standardised statistics of $N$ trials, and let $M_N = \max_i Z_i$. When $N \ge 2$, the leading-term selection scale is $\sqrt{2\ln N}$. It is the level used in the union bound of [[#prop-union]]. It is not a Sharpe ratio. The trial count $N$ is the number of configurations actually scored, in the sense of [[validation/parameter-search]], not the number of walk-forward folds of a later frozen test, and not the number of cells in a grid that was never run.
:::

The assumptions under which this scale describes a null maximum are narrow, and they should be recited whenever the number is computed.

- The null is true for every trial. No configuration has an edge. The scale is then a statement about noise, not a measurement of skill.
- Each $Z_i$ is standard normal. The standardisation that produced it has already used the sample length, and it has already assumed a shape for the returns. Skewness and excess kurtosis are exactly the kinds of shape the assumption excludes.
- The trials are independent. Shared dates, shared regimes, nested windows and a sequential sampler all violate this. Real financial trials are not independent. WF04's nine cells share a history. WF05's thirty TPE trials are dependent by construction, because the sampler proposes a later trial from earlier scores.
- $N$ is at least $2$, so that the logarithm is positive. A single pre-specified trial has standardised expectation $0$ under the null. The scale at $N = 1$ is $\sqrt{2\ln 1} = 0$, which matches that expectation, and the union bound below is stated for $N \ge 2$.

Drop any one of these and $\sqrt{2\ln N}$ is no longer a calibrated quantile of $M_N$. Dependence is the failure that matters most for the library pages. It does not merely add a footnote. It means the scale is not a p-value for WF04 or for WF05. The direction of the mistake is not something we will paper over with a fake effective-$N$ inside this chapter. Dependent trials on one history often move together, so the maximum is not as extreme as an independent calculation suggests. That observation is a reason to distrust the independent formula, not a reason to ignore selection, and not a number we can take from the catalogue. The catalogue does not report the correlation among WF04's cells.

:::proposition Union bound at the leading term {#prop-union}
Let $Z_1, \ldots, Z_N$ be independent standard normal random variables, with $N \ge 2$, and let $M_N = \max_i Z_i$. Then

$$
\Prob\bigl(M_N > \sqrt{2\ln N}\bigr) < \frac{1}{\sqrt{4\pi \ln N}}.
$$
:::

:::proof
Write $\phi$ for the standard normal density and $\Phi$ for the distribution function. For $t > 0$ and $x \ge t$, one has $x/t \ge 1$, and $x/t > 1$ on a set of positive length. Therefore

$$
1-\Phi(t) = \int_t^{\infty} \phi(x)\,dx < \int_t^{\infty} \frac{x}{t}\,\phi(x)\,dx = \frac{1}{t\sqrt{2\pi}}\exp(-t^2/2) = \frac{\phi(t)}{t}.
$$

The integral of $x\exp(-x^2/2)$ is $-\exp(-x^2/2)$, which supplies the middle equality. The union bound and independence are not both required for the next step: even without independence,

$$
\Prob(M_N > t) \le \sum_{i=1}^{N} \Prob(Z_i > t) = N\bigl(1-\Phi(t)\bigr) < \frac{N}{t\sqrt{2\pi}}\exp(-t^2/2).
$$

Set $t = \sqrt{2\ln N}$. Then $t > 0$ because $N \ge 2$, and $t^2/2 = \ln N$, so $\exp(-t^2/2) = 1/N$. The product $N\exp(-t^2/2)$ equals $1$, and the bound simplifies to $1/(t\sqrt{2\pi})$. Since $t\sqrt{2\pi} = \sqrt{2\ln N}\,\sqrt{2\pi} = \sqrt{4\pi \ln N}$, the inequality is the one claimed.
:::

Read the bound carefully. It says the chance of *exceeding* the leading term is smaller than about $0.190$ when $N = 9$ and smaller than about $0.153$ when $N = 30$. It does not say that the expected maximum equals the leading term. The maximum can sit below the leading term on most draws while the leading term remains the level at which a union of $N$ Gaussian tails stops being large. "Grows like $\sqrt{2\ln N}$" means that this is the scale of that level, and that the scale tends to infinity with $N$, slowly. A finer asymptotic expansion subtracts lower-order terms. Bailey and López de Prado's expected-maximum benchmark is one such finer object, built for the Sharpe ratio rather than for a generic standard normal, and this lesson does not write it down.

The bound also tends to zero as $N$ grows, because the denominator grows. That does not pull the maximum back to zero. The level $\sqrt{2\ln N}$ itself marches outward. The probability of being above an outward-moving level becomes small. The expected maximum becomes large. Both sentences are true, and they answer different questions.

:::proposition The expected maximum rises with the trial count {#prop-rise}
Let $Z_1, Z_2, \ldots$ be independent standard normal random variables and let $M_N = \max_{i \le N} Z_i$. Then $\E[M_N] > \E[M_{N-1}]$ for every $N > 1$, and $\E[M_N] > 0$.
:::

:::proof
$M_N = \max(M_{N-1}, Z_N) \ge M_{N-1}$, so the difference is non-negative. It is not almost surely zero: conditional on $M_{N-1} = m$, the next variable $Z_N$ is still standard normal and $\Prob(Z_N > m) > 0$ for every finite $m$. A non-negative random variable that is not almost surely zero has positive expectation, once it is integrable. Integrability holds because $|M_N| \le |Z_1| + \cdots + |Z_N|$ and each standard normal is integrable. Hence $\E[M_N] > \E[M_{N-1}]$. Since $M_1 = Z_1$ has mean $0$, the expectation $\E[M_N]$ is positive for $N > 1$.
:::

Together, the two propositions say what we will use and what we will not. The expected maximum of independent standard normals rises with $N$, so the hurdle for a selected statistic is higher at the WF05 budget than at the WF04 budget, under assumptions those budgets do not actually meet. The leading term $\sqrt{2\ln N}$ is a proved upper-tail scale for that maximum, not a proved formula for its mean, and not the deflated Sharpe ratio.

:::algorithm How to use the scale without overclaiming {#alg-read}
Count the trials actually scored. That count is $N$. Do not insert a later fold count in place of $N$, and do not insert the size of a grid that was not run. For $N \ge 2$, compute $\sqrt{2\ln N}$ in standardised units. List the assumptions in [[#def-scale]] that the experiment fails, independence first. Do not annualise the scale into a pass mark, and do not describe the result as a deflated Sharpe ratio. For the probability Bailey and López de Prado define, read their 2014 paper in the Journal of Portfolio Management.
:::

## The two budgets, computed

The natural inputs are the two budgets already counted. WF04 scores $N = 9$ cells. WF05 scores $N = 30$ trials before any later walk-forward of the winner. The walk-forward is not added to $N$. The trials are not thirty confirmations, and the nine cells are not nine confirmations. They are the $N$ in the scale, if one is willing to talk about a scale at all.

:::example The leading term at nine and at thirty {#ex-sqrt}
Compute $\sqrt{2\ln 9}$ and $\sqrt{2\ln 30}$ with the natural logarithm, and compute the difference. Round each reported figure to three decimal places after stating a more precise value.
:::solution
Python's `math.sqrt(2 * math.log(9))`, with `math.log` the natural logarithm, returns $2.096294\ldots$. Rounded to three decimal places, $\sqrt{2\ln 9} = 2.096$. The same call with $30$ returns $2.608140\ldots$, so $\sqrt{2\ln 30} = 2.608$ to three decimal places. The difference is $0.511846\ldots$, which rounds to $0.512$.

The hurdle in standardised units is higher at thirty trials than at nine, by about half a unit of the leading term, under the assumptions of [[#prop-union]]. Those assumptions include independence and a true null. WF04's nine Sharpe ratios are nine functions of one history, and WF05's thirty trials are sequential. The numbers $2.096$ and $2.608$ are still the right evaluations of the expression the approximation names. They are not p-values for the two library pages, they are not Sharpe ratios, and they are not thresholds for a trade. The catalogue does not report the cell scores one would need even to begin a comparison, and this atlas has not re-run the pages.
:::
:::

:::example How small the union bound is {#ex-bound}
Using [[#prop-union]], compute the numerical upper bound $1/\sqrt{4\pi \ln N}$ for $N = 9$ and for $N = 30$. Round to four decimal places.
:::solution
For $N = 9$, $\ln 9 = 2.197225\ldots$ and $4\pi \ln 9 = 27.612\ldots$. The square root is $5.2547\ldots$, and the reciprocal is $0.190308\ldots$, which is $0.1903$ to four decimal places. For $N = 30$, $\ln 30 = 3.401197\ldots$ and the same reciprocal is $0.152960\ldots$, which is $0.1530$ to four decimal places.

So the independent-normal model says that the chance of the maximum clearing its own leading term is under one fifth at $N = 9$ and under $0.16$ at $N = 30$. Clearing the leading term is a strong event in this model. Sitting somewhere below it is the ordinary event. A researcher who treats $\sqrt{2\ln N}$ as a typical value of every maximum, rather than as a high level in the tail bound, has read the proposition backwards. And a researcher who treats either probability as the probability that WF04 or WF05 "got lucky" has imported independence those pages do not have.
:::
:::

:::example The leading term is not the mean at $N = 2$ {#ex-two}
Let $Z_1$ and $Z_2$ be independent standard normals. Show that $\E[\max(Z_1, Z_2)] = 1/\sqrt{\pi}$, and compare it with $\sqrt{2\ln 2}$.
:::solution
The identity $\max(Z_1, Z_2) = \bigl(Z_1 + Z_2 + |Z_1 - Z_2|\bigr)/2$ and $\E[Z_1] = \E[Z_2] = 0$ give $\E[\max(Z_1, Z_2)] = \tfrac12 \E|Z_1 - Z_2|$. The difference of two independent standard normals is normal with mean $0$ and variance $2$, so its standard deviation is $\sqrt{2}$. The expected absolute value of a centred normal with standard deviation $\sigma$ is $\sigma\sqrt{2/\pi}$. Hence $\E|Z_1-Z_2| = \sqrt{2}\,\sqrt{2/\pi} = 2/\sqrt{\pi}$, and half of that is $1/\sqrt{\pi}$.

Numerically, $1/\sqrt{\pi} = 0.564190\ldots$, which is $0.564$ to three decimal places. The leading term is $\sqrt{2\ln 2} = 1.177410\ldots$, or $1.177$ to three decimal places, about twice the expectation. The union bound at $N = 2$ is $1/\sqrt{4\pi \ln 2} = 0.3388\ldots$, which only controls the upper tail. The gap between $0.564$ and $1.177$ is why this chapter says "grows like" and refuses to write $\E[M_N] = \sqrt{2\ln N}$. At the budgets $N = 9$ and $N = 30$ the leading term remains an upper-tail scale from [[#prop-union]], not a substitute for the expectation, and not a substitute for the expected-maximum term in Bailey and López de Prado (2014).
:::
:::

## Where sample length enters, and why we still do not write the paper's formula

Studentisation is the step that brings sample length in, and it is a step we already know from [[performance/uncertainty-of-performance]] under a list of assumptions that must be repeated. Lo, in 2002, gave an approximate standard error for a Sharpe ratio. In the special case of independent and identically distributed normal excess returns, with the Sharpe ratio $S$ not annualised, the standard error is approximately $\sqrt{(1 + \tfrac12 S^2)/n}$, where $n$ is the number of returns. Under a true null $S = 0$, that expression collapses to $1/\sqrt{n}$.

A standardised statistic is then about $\hat S \sqrt{n}$ when the estimate $\hat S$ is the per-step Sharpe ratio and the null standard error is $1/\sqrt{n}$. Setting the standardised statistic equal to the leading-term scale gives a per-step Sharpe ratio of size $\sqrt{2\ln N}/\sqrt{n}$. This translation is ours. It uses Lo's null standard error and the leading term from [[#def-scale]]. It is not the deflated Sharpe ratio. The 2014 formula also adjusts for skewness and for the fact that the Sharpe ratio's standard error depends on the Sharpe ratio itself, and it uses a more precise benchmark than $\sqrt{2\ln N}$ for the expected maximum. We point at Journal of Portfolio Management, 2014, for that expression. We do not reconstruct it.

:::example Two sample lengths, one scale {#ex-student}
Take $N = 9$, so the leading term is $2.096294\ldots$ as in [[#ex-sqrt]]. Assume independent and identically distributed normal excess returns, a risk-free rate of $0$, and a true Sharpe ratio of $0$, so that Lo's standard error is $1/\sqrt{n}$. What per-step Sharpe ratio studentises to the leading term when $n = 2520$, and when $n = 252$? Round to five decimal places. Do not annualise either figure.
:::solution
For $n = 2520$, which is about ten years of trading days if one counts $252$ days a year, $\sqrt{2520} = 50.1996\ldots$ and

$$
\frac{2.096294\ldots}{\sqrt{2520}} = 0.041759\ldots,
$$

which is $0.04176$ to five decimal places. For $n = 252$, one year under the same counting convention, the quotient is $0.132054\ldots$, which is $0.13205$ to five decimal places.

The standardised scale did not change. The raw per-step Sharpe ratio that maps to it did, because the standard error is wider on the shorter sample. Sample length is therefore part of any honest correction, and it is invisible in $\sqrt{2\ln N}$ alone. That invisibility is one reason the leading term is not the deflated Sharpe ratio.

The same arithmetic at $N = 30$, with leading term $2.608140\ldots$, gives $0.051955\ldots$ per step when $n = 2520$, or $0.05196$ to five decimal places. The rise from $0.04176$ to $0.05196$ is the trial-count effect inside this narrow model, on a long sample, in per-step units.

We stop before annualising. Multiplying a per-step figure by $\sqrt{252}$ produces a number that is easy to misread as an annualised Sharpe ratio one should require of a strategy. The model behind the multiplication needs independent and identically distributed returns, the null standard error, and the leading-term scale, and the conclusion people want to draw from it is a trading rule. None of that is on offer. The figures $0.04176$ and $0.05196$ are translations of a tail scale under stated assumptions. They are not pass marks. They are not estimates of WF04 or WF05. They are not the deflated Sharpe ratio.
:::
:::

:::warning Three substitutions that corrupt the scale
Replacing $N = 9$ with $N = 48$, because a walk-forward page used $48$ folds, answers a different question. The folds are slices of one path, not $48$ scored configurations, unless a search really scored $48$ configurations. Replacing $\sqrt{2\ln N}$ with a reported Sharpe ratio ignores units: the scale is standardised, and the Sharpe ratio is not, until a standard error has been introduced. Replacing the 2014 formula with $\sqrt{2\ln N}$ drops the sample length, the skewness adjustment and the paper's own expected-maximum term. The legal sentence is narrower. Under a true null and independent normal trials, the expected maximum of $N$ standardised statistics grows like $\sqrt{2\ln N}$. Real financial trials are not independent. The full deflated Sharpe ratio is in Bailey and López de Prado, Journal of Portfolio Management, 2014.
:::

:::widget confidence
dist: normal
n: 30
level: 0.95
intervals: 40
method: z
caption: Each interval is a confidence interval for a mean from one pre-specified normal sample. About the stated fraction of them cover the true mean. Picking, after the fact, the interval that sits furthest above zero is selection. This figure does not do that selection, and it does not compute a deflated Sharpe ratio.
:::

:::quiz
Which statement matches the approximation in this chapter?
- [ ] The deflated Sharpe ratio equals $\sqrt{2\ln N}$ for any backtest with $N$ folds.
- [x] Under a true null and independent normal trials, the expected maximum of $N$ standardised statistics grows like $\sqrt{2\ln N}$. The full deflated Sharpe ratio, which also adjusts for sample length and non-normality, is left to Bailey and López de Prado (2014).
- [ ] Because financial trials are dependent, selection can be ignored and $N$ can be reset to $1$.
- [ ] $\sqrt{2\ln 9} = 2.096$ is an annualised Sharpe ratio above which a rule should be traded.
:::solution
The second statement is the one the chapter defends. The scale is not the 2014 formula, folds are not automatically the trial count, dependence ruins the calibration without erasing selection, and $2.096$ is a standardised leading term for $N = 9$, not a trading threshold.
:::
:::

:::quiz
WF05 scores 30 TPE trials and then walks the winner forward. Which value of $N$ belongs in $\sqrt{2\ln N}$ for the search stage, under the definitions of this chapter?
- [ ] $1$, because only the winner is walked forward.
- [ ] $48$, because other walk-forward pages use 48 folds.
- [x] $30$, the number of trials scored in the search, with the warning that the trials are not independent and are not 30 confirmations.
- [ ] $30 \times 48$, the product of the trial budget and a fold count from a different page.
:::solution
The search scored 30 trials, so the trial count in the scale is 30, and the independence assumption is already false for a sequential sampler. The later walk-forward, if the winner is frozen, does not multiply the confirmations by 30. A fold count borrowed from WF01 is not WF05's trial count. The product of the two is not a sample size.
:::
:::

:::intuition Tail scale, not a mean
Picture $N$ independent standard normal draws and a bar placed at $\sqrt{2\ln N}$. [[#prop-union]] says the tallest draw clears the bar less often than the bound states. It does not say the tallest draw usually stands at the bar. At $N = 2$ we computed both objects: the expected height of the taller draw is $0.564$, and the bar is at $1.177$. The bar is a high mark used to control a tail. The 2014 paper builds a sharper high mark for a Sharpe ratio, then folds in sample length and non-normality. Our bar is the classroom object that makes the growth with $N$ visible.
:::

:::remark What dependence does, without a fake correction
If all $N$ trials return the identical statistic, the maximum equals that statistic and the behaviour is the behaviour of $N = 1$. The leading term $\sqrt{2\ln N}$ is then the wrong description, and $\sqrt{2\ln 1} = 0$ is the null expectation of the single shared statistic. WF05 is not that extreme. TPE trials are positively dependent through shared data and through the sampler, not identical. The independent calculation and the identical calculation bracket a range. They do not identify the point inside the range. Identifying it would require the joint distribution of the thirty scores, which the catalogue does not report and which this atlas will not invent. The honest output is the pair of computations, plus the citation.
:::

:::history
Halbert White's reality check of 2000, published in Econometrica, tests the best rule found by a search against the null that none of the tried rules has value. It is the predecessor of later deflators: the search is inside the test, not a private warm-up. Bailey and López de Prado (2014), in the Journal of Portfolio Management, defined the deflated Sharpe ratio, correcting a reported Sharpe ratio for selection, the number of trials, the sample, and non-normal returns. This chapter uses the 2014 paper as the location of the full expression. It uses White only as the historical point that a searched maximum is the object to be tested. Neither paper is a trading rule, and neither is reproduced in symbols here beyond the normal leading term $\sqrt{2\ln N}$ and the union bound that explains it.
:::

## Where this leads

A scale that survived every assumption in this chapter would still be a statement about one recorded history. [[validation/what-a-fold-does-not-prove]] is the reason a stack of folds, purged, embargoed and deflated, does not become a decision to trade. The trial counts it takes as input are the counts in [[validation/parameter-search]]. The standard error it borrows, under assumptions, is the one in [[performance/uncertainty-of-performance]], and the Sharpe ratio being standardised is the object in [[performance/sharpe-and-its-relatives]]. Hypothesis testing as a subject, without a grid of windows attached, is the [hypothesis tests](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing) chapter of the Maths Atlas.

:::summary
- Under a true null and independent normal trials, the expected maximum of $N$ standardised statistics grows like $\sqrt{2\ln N}$.
- Python gives $\sqrt{2\ln 9} = 2.096294\ldots$ and $\sqrt{2\ln 30} = 2.608140\ldots$, that is $2.096$ and $2.608$ to three decimal places. These match the WF04 and WF05 trial budgets. They are not those pages' Sharpe ratios.
- A union bound puts $\Prob(M_N > \sqrt{2\ln N})$ below $0.1903$ at $N = 9$ and below $0.1530$ at $N = 30$. The leading term is not proved equal to the expected maximum. At $N = 2$ the expected maximum is $1/\sqrt{\pi} \approx 0.564$, against a leading term of $1.177$.
- The expected maximum rises with $N$ for independent standard normals. Real financial trials are not independent, so the scale is not a calibrated p-value for a grid or for TPE.
- Sample length enters when a Sharpe ratio is studentised. The 2014 deflated Sharpe ratio also adjusts for non-normality. This lesson does not write that formula.
- The scale is not an annualised threshold and not a decision to trade.
:::

## Exercises

:::exercise A larger trial count {level=1 check="3.035"}
Compute $\sqrt{2\ln 100}$ with the natural logarithm, rounded to three decimal places. (Enter the rounded value.)
:::solution
Python returns $3.034854\ldots$. The fourth decimal digit is $8$, so the value rounded to three decimal places is $3.035$. The rise from $\sqrt{2\ln 9} = 2.096$ to $3.035$ is real and slow. One hundred independent normal trials are a different model from nine. They are still not one hundred confirmations of a trading rule.
:::
:::

:::exercise The bound at nine {level=1 check="0.190"}
For $N = 9$, compute the union-bound ceiling $1/\sqrt{4\pi \ln 9}$ and round it to three decimal places. (Enter the rounded value.)
:::solution
[[#ex-bound]] obtained $0.190308\ldots$. Rounded to three decimal places this is $0.190$. The probability of exceeding the leading term is less than $0.190$ in the independent standard normal model. It is not equal to $0.190$, and the model is not WF04.
:::
:::

:::exercise Which budget {level=1 check="9"}
WF04 scores the nine-cell grid in [[validation/parameter-search]]. Which trial count $N$ belongs in the leading-term scale for that search? (Enter $N$.)
:::solution
The search scores nine cells, so $N = 9$. A fold count of $48$ from WF01 is not the number of configurations WF04 scored. The independence assumption fails for the nine cells because they share a history. The failure changes the calibration. It does not change the fact that nine cells were scored.
:::
:::

:::exercise The gap between the two budgets {level=2 check="0.512"}
Compute $\sqrt{2\ln 30} - \sqrt{2\ln 9}$, using natural logarithms, and round to three decimal places. (Enter the rounded difference.)
:::solution
From [[#ex-sqrt]], the two leading terms are $2.608140\ldots$ and $2.096294\ldots$. The difference is $0.511846\ldots$, which rounds to $0.512$. Under the independent normal model this is how much the tail scale rises when the budget goes from the WF04 grid to the WF05 trial count. It is not a rise in expected wealth, and the two budgets are not independent of their own data.
:::
:::

:::exercise A per-step translation {level=2 check="0.04176"}
Using the assumptions of [[#ex-student]], with $N = 9$ and $n = 2520$, what per-step Sharpe ratio studentises to the leading term? Round to five decimal places. (Enter the rounded per-step value.)
:::solution
The quotient $(2.096294\ldots)/\sqrt{2520}$ equals $0.041759\ldots$, which is $0.04176$ to five decimal places. The assumptions are a true null, independent and identically distributed normal excess returns, a risk-free rate of $0$, and Lo's null standard error $1/\sqrt{n}$. The result is not a deflated Sharpe ratio and not a trading threshold. We do not multiply it by $\sqrt{252}$.
:::
:::

:::exercise Perfect dependence {level=2 check="0"}
All $N$ trials return exactly the same standardised statistic, and the null is true, so that shared statistic has expectation $0$. What is $\sqrt{2\ln 1}$, the leading term appropriate to a single shared statistic? (Enter that value.)
:::solution
$\ln 1 = 0$, so $\sqrt{2\ln 1} = 0$, which matches the null expectation. The independent-trial scale $\sqrt{2\ln N}$ would overstate the selection effect if it were applied to identical copies. Real TPE trials are neither independent nor identical. The exercise only identifies the two extremes. It does not estimate a dependence correction for WF05.
:::
:::

:::exercise The level that makes the exponential cancel {level=3 check="2.197"}
For $N = 9$, the proof of [[#prop-union]] sets $t = \sqrt{2\ln 9}$ and uses $t^2/2 = \ln 9$. Compute $\ln 9$ to three decimal places. (Enter that rounded logarithm.)
:::hint
The natural logarithm is the one inside the leading term. You are checking the identity $t^2/2 = \ln N$, not producing a Sharpe ratio. Python's `math.log(9)` is the natural logarithm.
:::
:::solution
`math.log(9)` returns $2.197225\ldots$, which is $2.197$ to three decimal places. Then $t^2/2 = \ln 9$ by the way $t$ was chosen, and $N\exp(-t^2/2) = 9 \times e^{-\ln 9} = 9 \times (1/9) = 1$. That cancellation is the whole reason the leading term, rather than some other multiple of $\sqrt{\ln N}$, appears in the union bound. Rounding $\ln 9$ to $2.197$ is a display choice. The identity itself is exact before rounding.
:::
:::

:::exercise A bound that shrinks while the level grows {level=3 check="0.107"}
Compute the union-bound ceiling $1/\sqrt{4\pi \ln N}$ at $N = 1000$, rounded to three decimal places. Then say why a smaller ceiling does not mean the expected maximum is getting smaller. (Enter the rounded ceiling.)
:::hint
Evaluate the same expression as in [[#prop-union]], at a larger $N$. The level $\sqrt{2\ln N}$ is moving up at the same time as the bound on the probability of exceeding it is moving down.
:::
:::solution
Python returns $0.107331\ldots$, which rounds to $0.107$. The probability of exceeding the leading term is less than $0.107$ at $N = 1000$ in the independent standard normal model, whereas the leading term itself has moved out to $\sqrt{2\ln 1000} = 3.716922\ldots$, or $3.717$ to three decimal places. A rarer exceedance of a higher bar is compatible with a larger expected maximum. [[#prop-rise]] already says the expected maximum increases with $N$. The shrinking ceiling does not contradict it. Neither figure is the deflated Sharpe ratio, and a thousand independent normal trials are not a description of one financial history.
:::
:::
