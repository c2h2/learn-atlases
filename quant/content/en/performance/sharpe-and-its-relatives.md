A mean without a scale cannot be compared across series, because a mean of $0.01$ is a large daily move and a small annual move. A scale without a mean cannot be compared as a reward, because a quiet loss and a quiet gain can share a standard deviation. The Sharpe ratio is the sample mean of excess return divided by the sample standard deviation of excess return. It is a ratio of two sample summaries. It is not a utility, and it is not a rank that survives a change of denominator.

On Path A the verified sample mean of the seven simple returns is $0.013930$ and the verified sample standard deviation, with divisor $n-1$, is $0.022848$. With a risk-free simple return of zero, stated as a modelling choice and not as a market quote, the ratio is $0.6097$ per step. It is not an annual figure. Multiplying $0.6097$ by $\sqrt{252}$ produces a number near $9.68$. That number is what the algebra does to seven observations under an assumption of uncorrelated equal-variance steps. It is a warning about annualisation. It is not a result to quote as an annual performance, and it is not evidence that a path which rose from $100$ to $110$ over seven marks has revealed a large edge. The uncertainty chapter puts a standard error next to $0.6097$ and finds that the error is already about $0.41$ before anyone annualises.

Changing the denominator produces a different ratio with a different name. Sortino replaces the standard deviation by downside deviation. Calmar replaces it by the absolute maximum drawdown and replaces the mean by a compound annual growth rate. An information ratio replaces the risk-free return by a stated benchmark. Each change has to be stated. Two published numbers that both get called "Sharpe" but were annualised differently, or subtracted a different cash rate, are not two estimates of one parameter. This chapter defines the versions used in the atlas's own examples. It does not claim that any catalogue of backtests uses the same conventions.

The examples are invented arithmetic, except where a sentence quotes a reported catalogue figure and says so. Nothing here recommends a security, a fund, a benchmark, or a leverage.

## The ratio we compute

:::definition Sharpe ratio {#def-sharpe}
Let $R_t$ be the simple return of the account over step $t$, and let $R_{f,t}$ be the simple return of a stated risk-free alternative over the same step. The excess return is $X_t = R_t - R_{f,t}$. Given $n \ge 2$ excess returns, write $\bar X$ for their sample mean and $s_X$ for their sample standard deviation with divisor $n-1$, as in [[performance/volatility-and-drawdown]]. The **Sharpe ratio** of the sample is

$$
S = \frac{\bar X}{s_X} = \frac{\overline{(R - R_f)}}{s(R - R_f)},
$$

provided $s_X > 0$. If the risk-free simple return is a constant $R_f$ across the sample, then $s(R - R_f) = s(R)$ and $\bar X = \bar R - R_f$, so

$$
S = \frac{\bar R - R_f}{s(R)}.
$$

The ratio is in per-step units. It becomes an annual figure only after multiplication by a named factor, under named assumptions, in [[#prop-ann-sharpe]]. A zero denominator means the excess returns did not vary. The ratio is then undefined, not "perfect".
:::

In the short examples of this chapter the constant $R_f$ is often $0$. That is a choice of units for the exercise, so that $S$ collapses to $\bar R / s(R)$. It is not a claim that cash earns nothing, and it is not a claim that a published ratio used the same zero. When $R_f$ is not zero it is written in the same per-step units as $R$. A bond yield quoted once a year cannot be subtracted from a daily simple return until both are on the same clock. Getting that clock wrong moves the numerator and, if the conversion is not a constant, can move the denominator too.

:::example Path A with a zero risk-free return {#ex-sharpe-a}
Use the verified mean $0.013930$ and the verified sample standard deviation $0.022848$. Set $R_f = 0$. Compute the Sharpe ratio and say what it is not.
:::solution
Because $R_f$ is the constant $0$, the sample standard deviation of excess returns equals $0.022848$, and the mean excess return equals $0.013930$. The ratio is

$$
S = \frac{0.013930}{0.022848} = 0.609681\ldots,
$$

which rounds to $0.6097$. The units are per step. There are seven steps. The ratio is not annualised, not a CAGR, and not a maximum drawdown. Path A's compound simple return is $0.10$ and its maximum drawdown is $-0.009804$. Those are different sentences about the same prices. Dividing $0.10$ by $0.009804$ is about $10.20$, and that quotient is not a Sharpe ratio and not a Calmar ratio. The Sharpe ratio uses the mean and the standard deviation of the step-by-step simple returns, not the endpoints and not the worst peak-to-trough fall.

The figure $0.6097$ is large for a *daily* ratio, in the sense that a long uncorrelated sample with a true daily Sharpe ratio of $0.6$ would be an extraordinary process. Seven observations do not establish that the true ratio is $0.6$. They establish that this particular ratio of these particular summaries is $0.6097$. [[performance/uncertainty-of-performance]] is where that distinction becomes a standard error. Until then, do not promote $0.6097$ by multiplying it by $\sqrt{252}$.
:::
:::

:::example The same path with a non-zero risk-free return {#ex-sharpe-rf}
Keep Path A's verified mean and sample standard deviation. Set the constant risk-free simple return to $R_f = 0.005$ per step. This is an exercise input, not a quoted cash rate. Compute the mean excess return and the Sharpe ratio to four decimal places.
:::solution
The mean excess return is $0.013930 - 0.005 = 0.008930$. Subtracting a constant does not change deviations from the mean, so the sample standard deviation of excess returns remains $0.022848$. The ratio is

$$
S = \frac{0.008930}{0.022848} = 0.390844\ldots,
$$

which is $0.3908$ to four decimal places. It is smaller than $0.6097$ because the numerator is smaller and the denominator did not move. That is algebra. It is not a comment on whether a researcher "should" subtract a cash rate. It is a comment on comparability: a ratio that subtracted $0$ and a ratio that subtracted $0.005$ per step are different statistics. Ranking them as if they were the same statistic favours whichever convention left more in the numerator.

If the risk-free return had varied over the seven steps, the standard deviation would have changed as well, and $s(R - R_f)$ would have had to be recomputed from the excess returns themselves. Constancy is the only reason the denominator survived unchanged.
:::
:::

:::quiz
Path A's sample standard deviation of simple returns is $0.022848$. You subtract a constant risk-free simple return from each step. What happens to that sample standard deviation?
- [ ] It falls by the risk-free return.
- [ ] It is multiplied by $\sqrt{252}$.
- [x] It is unchanged, because every deviation from the mean is unchanged.
- [ ] It becomes the downside deviation.
:::solution
Adding or subtracting a constant shifts the sample mean and leaves $(R_t - \bar R)$ as it was. The sum of squared deviations is the same, so $s(R - R_f) = s(R)$ when $R_f$ is constant. The Sharpe ratio changes only through the numerator $\bar R - R_f$. Downside deviation is a different function and does use the level of each return, not only deviations from the mean.
:::
:::

## Annualising under an independence assumption

:::proposition Annualisation of a Sharpe ratio {#prop-ann-sharpe}
Let excess returns be uncorrelated, with common mean $\mu$ and common variance $\sigma^2 > 0$. The population per-step Sharpe ratio is $S = \mu/\sigma$. The sum of $K$ such excess returns has mean $K\mu$ and variance $K\sigma^2$, so the Sharpe ratio of the sum is

$$
\frac{K\mu}{\sigma\sqrt{K}} = S\sqrt{K}.
$$

The sample version multiplies the per-step sample Sharpe ratio by $\sqrt{K}$ under the same assumptions, with $K$ named. For a series whose steps are trading days, the conventional name is $K = 252$. The result is a Sharpe ratio for an additive $K$-step excess return, not a Sharpe ratio computed from $K$-step compound returns, and not a correction for overlapping samples.
:::

:::proof
Uncorrelated equal variances give $\Var(\sum_{i=1}^{K} X_i) = K\sigma^2$ by the argument of [[performance/volatility-and-drawdown]]. The mean of the sum is $K\mu$ by linearity, which does not need uncorrelatedness. Divide. The factor $\sqrt{K}$ is exact for those population moments of the sum. Replacing $S$ by a sample ratio $\hat S$ and reporting $\hat S\sqrt{K}$ is a plug-in. It inherits every sampling error in $\hat S$, and it adds the modelling error of the uncorrelated equal-variance assumption. If the excess returns are positively autocorrelated, the variance of the sum is larger than $K\sigma^2$ and the identity overstates the Sharpe ratio of the sum. The uncertainty chapter records the matching fact for the standard error of the mean.
:::

Apply the plug-in to Path A anyway, so the arithmetic is visible and the misreading is not. With $\hat S = 0.6097$ and $K = 252$,

$$
0.6097 \times \sqrt{252} = 0.6097 \times 15.874508\ldots = 9.6787\ldots,
$$

which is about $9.68$. A ratio near $9.68$, if it were an annual Sharpe ratio estimated from a long uncorrelated sample, would mean an extraordinary separation of annual mean and annual volatility. Here it means $\sqrt{252}$ times a ratio of two summaries of seven numbers. The multiplication did not create information. It relabelled a per-step ratio with an annual unit the sample does not earn.

There is a second, related confusion. The per-step mean $0.013930$, multiplied by $252$, is about $3.51$. Dividing that product by the annualised standard deviation $0.022848 \times \sqrt{252}$ recovers the same $9.68$, because $252 / \sqrt{252} = \sqrt{252}$. The arithmetic is consistent with itself and still describes seven steps. Consistency of the unit conversion is not evidence for the uncorrelatedness assumption.

:::warning Do not annualise seven observations
The figure near $9.68$ is $0.6097 \times \sqrt{252}$. It is not a meaningful annual Sharpe ratio of a seven-mark path. [[#prop-ann-sharpe]] multiplies by $\sqrt{K}$ only under uncorrelated equal variances, and only as a conversion of units. Seven points cannot support that assumption, and a unit conversion does not shrink the sampling error. If the per-step standard error is about $0.41$, the same factor $\sqrt{252}$ scales the standard error to something near $6.5$. An annualised point near $9.68$ with a standard error near $6.5$ is not a precise annual edge. It is the original uncertain ratio, written in louder units. Do not quote $9.68$ as a result. Quote $0.6097$ per step, with the sample size, or quote neither.
:::


The sliders start on Path A’s verified summaries, a mean of 0.013930 and a sample standard deviation of 0.022848, with a risk-free simple return of 0 and n = 7. The per-step ratio is 0.6097. Lo’s iid-normal standard error at that plug-in is about 0.4116. The annualise control multiplies the ratio and the standard error by √252. It does not create an annual performance.

:::widget sharpe
mean: 0.01393
sd: 0.022848
n: 7
rf: 0
annualise: false
caption: The dot is the Sharpe ratio and the bar is the Lo 2002 standard error under iid normal excess returns. Turn on annualising by √252 and both the dot and the bar are multiplied by the same factor. The picture is a sampling diagram for these inputs, not a result about a market.
:::
:::widget plot
f: x/s
sliders: s=0.022848:0.005:0.08:0.001
x: 0, 0.04
y: 0, 8
caption: The horizontal axis is a mean excess return and the curve is that mean divided by a fixed scale s. Drag s. The ratio moves because the denominator moved, which is not a change in the mean. Path A's per-step ratio uses a mean of 0.013930 and a scale of 0.022848. Nothing on the axes is annual, and nothing here is a forecast.
:::

## Sortino: a different denominator

:::definition Sortino ratio {#def-sortino}
Fix a target $\tau$ and let $\delta_\tau$ be the downside deviation of [[performance/volatility-and-drawdown]], the root mean square of $\min(R_t - \tau, 0)$ with divisor $n$. The **Sortino ratio** relative to that target is

$$
\frac{\bar R - \tau}{\delta_\tau},
$$

provided $\delta_\tau > 0$. Upside variation does not enter the denominator. If the target is the constant risk-free return, the numerator matches the Sharpe numerator and only the denominator has changed. If every return is at or above the target, then $\delta_\tau = 0$ and the ratio is undefined.
:::

:::example Sortino ratio of Path A at a target of zero {#ex-sortino}
Use $\tau = 0$, the verified mean $0.013930$, and the downside deviation $0.006278$ computed from Path A's simple returns. Compute the Sortino ratio to four decimal places and compare it with $0.6097$.
:::solution
$$
\frac{0.013930}{0.006278} = 2.2189
$$

to four decimal places. The Sharpe ratio of the same path, with $R_f = 0$, is $0.6097$. The numerators match. The Sortino figure is larger because $0.006278 < 0.022848$: the four positive simple returns, which pull the ordinary standard deviation up, contribute nothing to downside deviation. The path has not become a better object. The question has changed from "mean relative to total width" to "mean relative to downside width". Ranking a Sortino ratio against someone else's Sharpe ratio mixes the questions.

The target was $0$, not the $0.005$ of [[#ex-sharpe-rf]]. A Sortino ratio at target $0.005$ would need a new downside deviation, recomputed from $\min(R_t - 0.005, 0)$, and a numerator of $0.008930$. That is a third statistic. It is not the number $2.2189$ with a small edit in the numerator only, because downside deviation depends on the level of the target, not only on deviations from the mean.
:::
:::

Sortino and Price's 1994 proposal, recorded in the previous chapter's history, was exactly this change of denominator: upside variation is not treated as risk. The change is a modelling judgement about which variation counts. It does not make the resulting ratio a utility of the path, and it does not determine the maximum drawdown. A path can have a small downside deviation relative to its mean and still have fallen a long way from a peak if the losses arrived together. Order is invisible to $\delta_\tau$ for the same reason it is invisible to $s$.

## Calmar: a path statistic

:::definition Calmar ratio {#def-calmar}
Let $Y \ge 1$ be a stated number of years, let $V_0$ and $V_Y$ be the equity levels at the ends of that window, and let the CAGR be $(V_Y/V_0)^{1/Y} - 1$. Let $D$ be the maximum drawdown of the equity index over the same window, in the sense of [[performance/volatility-and-drawdown]], so $D < 0$ when a peak is later undercut. The **Calmar ratio** is the CAGR divided by the absolute drawdown,

$$
\frac{(V_Y/V_0)^{1/Y} - 1}{|D|},
$$

provided $D \neq 0$. Terry Young's 1991 ratio is this path statistic, typically discussed on a multi-year window. It is not a utility. It is not a Sharpe ratio. One gap sets the denominator, so the ratio moves with a single peak and a single trough even if every other step is quiet.
:::

The window has to be in years because the numerator is a CAGR. A seven-step compound return divided by an absolute drawdown is a different quotient. On Path A that mistaken quotient is $0.10 / 0.009804 \approx 10.20$. It uses no year count. It is not a Calmar ratio. Computing it is a useful way to see the temptation, and then to refuse it.

:::example A three-year window with an exact tenth {#ex-calmar}
Year-end equity levels are $1000$, $1300$, $1040$, $1331$. The drawdown is observed only at those marks. Compute the CAGR, the maximum drawdown, and the Calmar ratio.
:::solution
There are $Y = 3$ years. The terminal growth factor is $1331/1000 = 1.331$. Since $1331 = 11^3$ and $1000 = 10^3$,

$$
\Bigl(\frac{1331}{1000}\Bigr)^{1/3} - 1 = \frac{11}{10} - 1 = 0.10.
$$

The CAGR is $0.10$ exactly, not an approximation. The equity marks rise from $1000$ to $1300$, fall to $1040$, and finish at $1331$. The running peak reaches $1300$ and the trough at the next mark is $1040$, so

$$
D = \frac{1040}{1300} - 1 = -0.20.
$$

No other mark is as deep. The absolute drawdown is $0.20$. The Calmar ratio is $0.10 / 0.20 = 0.50$.

The window is three year-end marks. A deeper fall between year-ends is invisible to this calculation. The ratio $0.50$ is the path statistic defined above. It is not a reason to prefer this path to another, and the path is a constructed example with round levels, not a track record. Young's ratio was introduced as a smoother descriptive tool for looking at a multi-year path. Description is the most it does here.
:::
:::

A Calmar ratio and a Sharpe ratio can rank two paths in opposite orders, because one looks at a compounded endpoint and a single gap, and the other looks at a mean and a standard deviation of steps. If a report quotes one and not the other, the missing one is not implied. [[performance/volatility-and-drawdown]] already showed that a standard deviation does not determine a drawdown. Therefore a Sharpe ratio, which is built from the standard deviation, does not determine a Calmar ratio.

## Information ratio: a stated benchmark

:::definition Information ratio {#def-ir}
Let $R_t$ be the account's simple return and let $B_t$ be the simple return of a stated benchmark over the same step. The active return is $A_t = R_t - B_t$. The **information ratio** of the sample is

$$
\mathrm{IR} = \frac{\bar A}{s_A},
$$

where $s_A$ is the sample standard deviation of the active returns with divisor $n-1$, provided $s_A > 0$. The standard deviation $s_A$ is the tracking error of the sample, in per-step units. If the benchmark is the risk-free return, $A_t$ is the excess return and the information ratio is the Sharpe ratio. The name records the benchmark. It does not record a new utility.
:::

The benchmark is part of the definition. "Active" means active relative to a named series, not active in the sense of a busy trading schedule. Two information ratios relative to two different benchmarks are not comparable. A benchmark that is itself a strategy with its own costs and its own clock has to have that clock aligned with $R_t$. Subtracting a benchmark return that was earned over a different interval is the same class of mistake as subtracting an annual yield from a daily return.

A model sometimes written near this definition relates an information ratio to a correlation between forecasts and outcomes and to a count of independent bets. That model is a set of assumptions about forecasts, not an identity that turns a backtest into an expected information ratio. This chapter does not use it. The definition above is the sample ratio, and it can be computed from the active returns alone.

:::example Active returns against a constant benchmark {#ex-ir}
The account's simple returns over six steps are $0.03$, $0.01$, $0.00$, $0.04$, $-0.01$, $0.02$. The benchmark's simple return is the constant $0.01$ on each step. Compute the active returns, their sample mean, their sample standard deviation to six decimals, and the information ratio to four decimal places.
:::solution
Subtract $0.01$ from each account return. The active returns are

$$
0.02,\ 0.00,\ -0.01,\ 0.03,\ -0.02,\ 0.01.
$$

Their sum is $0.03$ and $n = 6$, so the mean is $0.005$ exactly. The squared deviations from $0.005$ sum to $0.00175$. The divisor is $n-1 = 5$, so the sample variance is $0.00175/5 = 0.00035$ and

$$
s_A = \sqrt{0.00035} = 0.018708
$$

to six decimals. The information ratio is

$$
\frac{0.005}{0.018708} = 0.2673
$$

to four decimal places. The benchmark was stated. If the benchmark had been $0$, the active returns would have been the account returns themselves, the mean and the standard deviation would both have changed, and the ratio would have been a Sharpe ratio with $R_f = 0$ rather than this information ratio. The constant $0.01$ is an exercise benchmark, not a market index the reader is being pointed towards.

Because the benchmark was constant, this information ratio equals the Sharpe ratio of the account relative to a risk-free simple return of $0.01$. [[#def-ir]] said that would happen. The arithmetic is here so the equality is a calculation and not only a sentence.
:::
:::

:::remark Reported catalogue ratios are not this definition
The open library's example O01, a market-order moving-average cross, has reported Sharpe $0.21$. Example W01, a daily-weight moving-average rule on a different book, has reported Sharpe $0.45$. Those figures are as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026. This atlas has not re-run the backtests and has not verified the annualisation convention, the risk-free rate, or the divisor behind either reported Sharpe. The two examples are different implementations, so the two numbers are not two draws of the estimator in [[#def-sharpe]]. A sentence that ranks $0.45$ above $0.21$ without those conventions is not using this chapter.
:::

The same caution applies inside the atlas's own formulas. [[#ex-sharpe-a]] and [[#ex-sortino]] and [[#ex-calmar]] answer three questions. A table that places $0.6097$, $2.2189$ and $0.50$ in one column labelled "performance" has erased the questions. The $0.50$ is not even from Path A. It is from a three-year constructed window. Borrowing it as "Path A's Calmar" would be a false sentence, not a rounding.

:::history
In 1966 William F. Sharpe defined the reward-to-variability ratio as the average excess return divided by the standard deviation of return, in the paper Mutual Fund Performance. In 1965 Jack Treynor had divided an average excess return by a systematic-risk scale rather than by total volatility. The two ratios are the ancestors of the family on this page: a mean stays in the numerator, and the denominator is a choice that has to be named. Sortino's downside deviation and Young's drawdown denominator are later members of that family, not synonyms for the 1966 ratio. This note follows the course record. It is not a reconstructed quotation, and it is not a claim about any fund those papers studied.
:::

## Where this leads

A win rate throws away the sizes that the Sharpe ratio keeps, and a profit factor keeps a different function of the sizes. [[performance/win-rate-and-profit-factor]] shows a high win rate with a poor compound return, and an infinite profit factor with a small CAGR. The standard error of the ratio $0.6097$, and the reason a short sample cannot wear an annualised figure near $9.68$, is [[performance/uncertainty-of-performance]]. Comparing two reported Sharpes whose conventions are unstated is the refusal the course asked for: the refusal is the definitions above, not a better ranking.

:::summary
- The Sharpe ratio in these examples is the mean excess return divided by the sample standard deviation of excess return, divisor $n-1$. With $R_f = 0$ on Path A it is $0.6097$ per step.
- A constant risk-free return changes the numerator and not the denominator. With $R_f = 0.005$ the Path A ratio is $0.3908$. Unstated cash conventions make published ratios incomparable.
- Under uncorrelated equal variances, a per-step Sharpe ratio scales by $\sqrt{K}$ when it is applied to an additive $K$-step sum. $K = 252$ is a named trading-day convention. On Path A the product is about $9.68$, and that product is not a meaningful annual Sharpe ratio of seven observations.
- The Sortino ratio puts the mean excess over a target in the numerator and downside deviation in the denominator. On Path A at target $0$ it is $2.2189$, larger than $0.6097$ only because the denominator changed.
- The Calmar ratio is a CAGR divided by the absolute maximum drawdown over a stated multi-year window. It is Young's 1991 path statistic, not a utility. On the constructed window $1000, 1300, 1040, 1331$ it is $0.50$. Path A's seven steps are not a Calmar input.
- The information ratio is the mean active return divided by the tracking error to a stated benchmark. If the benchmark is the risk-free return, it is the Sharpe ratio. On the six-step exercise it is $0.2673$.
- O01's reported Sharpe $0.21$ and W01's reported Sharpe $0.45$ are catalogue figures whose convention this atlas has not verified. They are not estimates under [[#def-sharpe]].
:::

## Exercises

:::exercise Divide the two verified summaries {level=1 check="0.6097"}
Divide the verified Path A mean $0.013930$ by the verified sample standard deviation $0.022848$, and round to four decimal places. The risk-free simple return is $0$. (Enter the ratio.)
:::solution
$0.013930 / 0.022848 = 0.609681\ldots$, which rounds to $0.6097$. The result is a per-step Sharpe ratio under [[#def-sharpe]]. It is not $0.6097 \times \sqrt{252}$.
:::
:::

:::exercise Subtract a constant from the mean {level=1 check="0.008930"}
The sample mean is $0.013930$ and the constant risk-free simple return is $0.005$. Compute the mean excess return. (Enter the mean excess return.)
:::solution
$0.013930 - 0.005 = 0.008930$. The sample standard deviation is unchanged because the risk-free return is constant. This exercise asks only for the numerator.
:::
:::

:::exercise Calmar arithmetic {level=1 check="0.50"}
A window has CAGR $0.10$ and maximum drawdown $-0.20$. Compute the Calmar ratio. (Enter the Calmar ratio.)
:::solution
The denominator is the absolute drawdown $0.20$. The ratio is $0.10/0.20 = 0.50$. The negative sign on the drawdown is removed by the absolute value in [[#def-calmar]]. Using $-0.20$ as a signed denominator would flip the ratio and would not be the definition. The CAGR and the drawdown were given; the exercise does not ask you to annualise anything else.
:::
:::

:::exercise Non-zero cash rate, full ratio {level=2 check="0.3908"}
Using Path A's verified mean $0.013930$, verified sample standard deviation $0.022848$, and constant $R_f = 0.005$, compute the Sharpe ratio to four decimal places. (Enter the per-step Sharpe ratio.)
:::solution
The mean excess return is $0.008930$ and the denominator is still $0.022848$, so

$$
S = 0.008930 / 0.022848 = 0.390844\ldots = 0.3908
$$

to four decimal places. This is [[#ex-sharpe-rf]]. It is smaller than $0.6097$ because the cash rate was subtracted, not because the path changed.
:::
:::

:::exercise Scale a per-step ratio, and say so {level=2 check="0.7937"}
A per-step Sharpe ratio is $0.05$, under the assumptions of [[#prop-ann-sharpe]] with $K = 252$. Compute the Sharpe ratio of the corresponding additive sum, to four decimal places. (Enter the scaled ratio.)
:::solution
$$
0.05 \times \sqrt{252} = 0.793725\ldots = 0.7937
$$

to four decimal places. The assumptions are uncorrelated excess returns of equal variance, and the object is the Sharpe ratio of an additive sum of $252$ steps. The input $0.05$ is not Path A's ratio, and the output is not the warning figure near $9.68$. That warning figure is $0.6097 \times \sqrt{252}$, a different and unsupported annualisation of seven observations. This exercise is only the unit conversion in the proposition, applied to a stated input.
:::
:::

:::exercise Tracking error of six active returns {level=2 check="0.2673"}
Active returns are $0.02$, $0.00$, $-0.01$, $0.03$, $-0.02$, $0.01$. Compute the information ratio to four decimal places, using divisor $n-1$. (Enter the information ratio.)
:::solution
The mean is $0.03/6 = 0.005$. The sum of squared deviations from $0.005$ is $0.00175$. Divide by $5$ to get variance $0.00035$, so $s_A = \sqrt{0.00035} = 0.018708$ to six decimals. Then

$$
0.005 / 0.018708 = 0.267261\ldots = 0.2673
$$

to four decimal places. The active returns were already net of the benchmark. If you are given account returns and benchmark returns separately, subtract first. Forgetting the subtraction and applying [[#def-sharpe]] with $R_f = 0$ answers a different question.
:::
:::

:::exercise Two uncorrelated steps {level=3 check="0.2828"}
Excess returns are uncorrelated, with common mean $\mu$ and common variance $\sigma^2$, and the per-step population Sharpe ratio $\mu/\sigma$ equals $0.20$. Compute the population Sharpe ratio of the sum of two such steps, to four decimal places. The solution should derive the factor $\sqrt{2}$ rather than only multiply. (Enter the two-step ratio.)
:::hint
The mean of a sum is the sum of the means. The variance of a sum of uncorrelated random variables is the sum of the variances. Write both for $K = 2$ before you divide.
:::
:::solution
Let the two excess returns be $X_1$ and $X_2$. Then $\E[X_1+X_2] = 2\mu$ and, because the covariance is zero, $\Var(X_1+X_2) = 2\sigma^2$. The Sharpe ratio of the sum is

$$
\frac{2\mu}{\sigma\sqrt{2}} = \frac{\mu}{\sigma}\sqrt{2} = 0.20 \times \sqrt{2} = 0.282843\ldots = 0.2828
$$

to four decimal places. This is [[#prop-ann-sharpe]] at $K = 2$. The compound return $(1+X_1)(1+X_2)-1$ is not the sum $X_1+X_2$, so the same factor is not a theorem about two-step compound excess returns. If the two steps were correlated, the variance would pick up $2\Cov(X_1, X_2)$ and the factor would not be $\sqrt{2}$.
:::
:::

:::exercise A zero downside denominator {level=3 check="0"}
The simple returns are $0.01$, $0.02$ and $0.03$, and the target is $\tau = 0$. Compute the downside deviation with divisor $n$. In the solution, say what the Sortino ratio is. (Enter the downside deviation.)
:::hint
$\min(R_t, 0)$ is zero on every step of this sample. A root mean square of zeros is zero. Then look at the denominator of [[#def-sortino]].
:::
:::solution
Every shortfall is $0$, so the sum of squares is $0$ and $\delta_0 = 0$. The Sortino ratio would divide the positive mean $0.02$ by $0$. The ratio is undefined. Calling the result infinite is a convention about the symbol $\infty$, not a sample value you can compare with Path A's $2.2189$. A sample of three gains has not measured an absence of downside risk in any process that might have produced a loss. It has measured that these three numbers happen to be positive. The ordinary sample standard deviation is positive, so the Sharpe ratio with $R_f = 0$ is defined: the mean is $0.02$ and the deviations are not all zero. Changing the denominator can turn a defined ratio into an undefined one without any change in the path's compound return, which is $(1.01)(1.02)(1.03) - 1$.
:::
:::
