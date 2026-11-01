The Path A ratio $0.6097$ is a function of seven numbers. A different seven numbers from the same process would have produced a different ratio, and seven numbers are not many. The sampling uncertainty is the subject of this chapter, not a finer definition of the ratio. The ratio itself, mean excess return over sample standard deviation, is [[performance/sharpe-and-its-relatives]]. The standard deviation in the denominator is [[performance/volatility-and-drawdown]]. What is new is the width of the sampling distribution around the number you just computed.

For a mean, the width has an elementary form. If the observations are uncorrelated and share a variance $\sigma^2$, the standard error of the sample mean is $\sigma/\sqrt{n}$. On Path A the plug-in, using the verified sample standard deviation $0.022848$ and $n = 7$, is $0.008636$. The verified mean $0.013930$ is only about $1.61$ of these standard errors above zero. A rough interval around the mean reaches below zero. The mean is a description of these seven simple returns. It is not a measured daily edge.

For the Sharpe ratio, Andrew Lo's 2002 approximation is the tool this chapter uses, and only inside the assumptions he needed for that formula. When excess returns are independent and identically distributed and normal, and when $S$ is the per-step ratio rather than an annualised one, the standard error is approximately

$$
\sqrt{ \frac{1 + \tfrac{1}{2} S^2}{n} }.
$$

With the plug-in $S = 0.6097$ and $n = 7$, the square root is $0.4116$, about $0.41$. An interval of that width cannot be read as a precise edge. The annualised figure near $9.68$, which is $0.6097 \times \sqrt{252}$, does not repair it. Multiplying the point estimate by $\sqrt{252}$ multiplies a noisy number by a constant. The standard error is multiplied by the same constant, and it becomes about $6.53$. A point near $9.68$ with a standard error near $6.53$ is the original warning, written in annual units. It is not a result to admire.

Nothing in the arithmetic recommends a trade, a fund, or a use of leverage. A wide interval is a reason to withhold a ranking, not a reason to take the other side of a point estimate. The library Sharpes quoted in the previous chapter do not acquire these standard errors by being mentioned here. Their conventions were not verified, and their dependence structure was not estimated.

## The standard error of a mean

:::definition Standard error {#def-se}
The **standard error** of an estimator is the standard deviation of its sampling distribution, under a stated model for the sample. It is not the standard deviation of the data. The sample standard deviation $s$ describes how far the observations sit from their sample mean. The standard error of the mean describes how far the sample mean would sit from the population mean across repeated samples. Confusing the two numbers treats a scale of returns as a scale of uncertainty about the average return. On Path A those scales are $0.022848$ and $0.008636$. They differ by $\sqrt{7}$.
:::

The model has to be stated because the sampling distribution is not a property of one sample. One sample gives you one mean. The standard error is what a model says about the scatter of that mean. Change the model, by putting in serial correlation or by dropping identical variances, and the standard error changes even though the seven numbers do not.

:::proposition Variance of the mean when the sum's variance adds {#prop-mean-se}
Let $R_1, \ldots, R_n$ be uncorrelated, with common finite variance $\sigma^2$. Then

$$
\Var(\bar R) = \frac{\sigma^2}{n},
$$

and the standard error of $\bar R$ is $\sigma/\sqrt{n}$. Uncorrelatedness is the assumption that does the work. Equal variance is the assumption that lets the result be written with one $\sigma$. Normality is not required. Independence is stronger than what is used: uncorrelatedness kills the covariances, which is all the variance of the sum needs.
:::

:::proof
The sample mean is $\bar R = n^{-1}\sum_{t=1}^{n} R_t$, so

$$
\Var(\bar R) = n^{-2}\Var\Bigl(\sum_{t=1}^{n} R_t\Bigr).
$$

Because the variables are uncorrelated, the variance of the sum equals the sum of the variances, and each variance is $\sigma^2$. The sum of variances is $n\sigma^2$. Divide by $n^2$ and the variance of the mean is $\sigma^2/n$. The standard error is the positive square root. The same identity is why a volatility annualises with $\sqrt{K}$ in [[performance/volatility-and-drawdown]], and why a Sharpe ratio annualises with $\sqrt{K}$ in [[performance/sharpe-and-its-relatives]]. In every case the $\sqrt{K}$ is the standard deviation of a sum under uncorrelatedness, rearranged. It is not a reward for having written down more digits.
:::

In practice $\sigma$ is unknown. Replacing it by the sample standard deviation $s$ is a plug-in. The plug-in standard error $s/\sqrt{n}$ is itself random. For a normal sample, the studentised mean $(\bar R - \mu)/(s/\sqrt{n})$ follows a $t$ distribution with $n-1$ degrees of freedom, not a standard normal distribution. With $n = 7$ the degrees of freedom are $6$, and the $0.975$ quantile of that $t$ law is about $2.447$, against $1.96$ for a normal approximation. The distinction is material exactly when the sample is as short as Path A. On a sample of thousands of trading days the two quantiles are close, and the model assumptions, especially uncorrelatedness, matter more than the choice between $1.96$ and $2.0$.

:::example Path A's mean, with a plug-in standard error {#ex-se-mean}
Use the verified mean $0.013930$, the verified sample standard deviation $0.022848$, and $n = 7$. Compute the plug-in standard error of the mean, the ratio of the mean to that standard error, and a rough normal interval. Then replace $1.96$ by the $t$ quantile $2.447$.
:::solution
[[#prop-mean-se]] with $\sigma$ replaced by $s$ gives

$$
\frac{0.022848}{\sqrt{7}} = \frac{0.022848}{2.645751\ldots} = 0.008636
$$

to six decimals. The mean divided by this standard error is

$$
\frac{0.013930}{0.008636} = 1.613\ldots,
$$

about $1.61$. A normal approximation to a $95$ per cent interval is the mean plus or minus $1.96$ standard errors:

$$
0.013930 \pm 1.96 \times 0.008636,
$$

which runs from about $-0.0030$ to about $0.0309$. The interval contains zero and also contains values more than twice the point estimate. Using the $t$ quantile $2.447$ in place of $1.96$ widens it further, from about $-0.0072$ to about $0.0351$. Neither interval is a confidence statement the seven points have earned, because the uncorrelated normal model was assumed and not checked. Both intervals are wide enough to stop a reading in which $0.013930$ is a known per-step edge.

The sample standard deviation $0.022848$ remains the scale of the returns. The standard error $0.008636$ is the scale of the mean under the model. Quoting the first where the second belongs overstates how precisely the mean is known, by a factor $\sqrt{7}$.
:::
:::

:::quiz
The plug-in standard error of Path A's mean is $0.008636$, and the sample standard deviation is $0.022848$. Which statement is right?
- [ ] $0.022848$ is the uncertainty of the mean, because it is the larger number.
- [x] $0.008636$ is the plug-in standard error of the mean under uncorrelated equal variances, and $0.022848$ is the scale of the seven returns.
- [ ] Dividing by $\sqrt{7}$ annualises the mean.
- [ ] The standard error is $0.013930$, the sample mean.
:::solution
[[#def-se]] separates the scale of the data from the scale of the estimator. The factor $1/\sqrt{7}$ comes from [[#prop-mean-se]]. It is not an annualising factor. The annualising factor for a variance that adds over $252$ days is $\sqrt{252}$, a different use of the same algebra, and it is not what this numerical comparison is doing.
:::
:::

## Lo's approximation for the Sharpe ratio

The Sharpe ratio is a ratio of two sample quantities, the mean excess return and the standard deviation of excess return. Even if the standard deviation were known, the mean's sampling noise would pass into the ratio. The standard deviation is not known. Its sampling noise passes into the ratio as well. Under normality the sample mean and the sample variance are uncorrelated, which simplifies the delta-method calculation, and the asymptotic variance of the per-step sample Sharpe ratio is $(1 + \tfrac{1}{2} S^2)/n$. The square root of that variance is the standard error below. This chapter states the formula, attributes it, and computes it. It does not re-derive the delta method. A derivation that stopped halfway would be worse than a clear citation.

:::definition IID normal standard error of a per-step Sharpe ratio {#def-lo}
Let excess returns be independent and identically distributed and normal, with per-step Sharpe ratio $S$, and let $n$ be the number of steps. The large-sample standard error of the sample Sharpe ratio, in those same per-step units, is approximately

$$
\sqrt{ \frac{1 + \tfrac{1}{2} S^2}{n} }.
$$

The $S$ inside the formula is the population ratio in the asymptotic statement. The plug-in replaces it by the sample ratio. The formula is for a ratio that has not been annualised. If you annualise first and then insert the annualised number as if it were a per-step $S$, the formula is being fed the wrong units. Serial correlation is outside this expression. Positive autocorrelation shrinks the effective sample relative to the row count, which [[#prop-ar]] makes precise for the mean and which Lo's paper carries into the ratio. The approximation is large-sample. Using it at $n = 7$ is a warning about width, not a certified confidence interval.
:::

One remark keeps the plug-in honest on a short sample. Our sample Sharpe ratio uses the divisor $n-1$ in the standard deviation. The asymptotic standard error does not settle that finite-sample choice. At $n = 7$ the choice is visible. The root-mean-square deviation from the mean that divides by $n$ instead of $n-1$ rescales Path A's $0.022848$ to $0.021153$, and the ratio of the verified mean to that smaller scale is about $0.6585$, not $0.6097$. The two point estimates differ by several hundredths. The standard-error formula was not built to paper over that choice. This chapter keeps $0.6097$, the $n-1$ convention of [[performance/sharpe-and-its-relatives]], and treats $0.41$ as the width around that convention's point estimate under the asymptotic normal model. It does not average $0.6097$ with $0.6585$.

:::example Seven steps, standard error about 0.41 {#ex-se-sharpe}
Compute Lo's plug-in standard error for $S = 0.6097$ and $n = 7$. Place a one-standard-error band and a rough $1.96$-standard-error band around $0.6097$. Then scale the standard error by $\sqrt{252}$ and set it next to the annualised point near $9.68$.
:::solution
The piece inside the square root is

$$
1 + \tfrac{1}{2}(0.6097)^2 = 1 + \tfrac{1}{2}(0.371734) = 1.185867.
$$

Its square root is $1.088975$. Divide by $\sqrt{7} = 2.645751$:

$$
\frac{1.088975}{2.645751} = 0.4116
$$

to four decimals, which is about $0.41$. A one-standard-error band around the point estimate runs from about $0.198$ to about $1.021$. A band of $1.96$ standard errors runs from about $-0.197$ to about $1.416$. The second band contains zero, contains $0.6097$, and contains values above $1$. The seven observations have not pinned the ratio down. The assumptions were i.i.d. normality and a large-sample formula used at a sample size the asymptotics did not have in mind. The divisor remark makes the interval a warning about the model. The warning is that the interval is huge.

The annualised point estimate is $0.6097 \times \sqrt{252} \approx 9.68$. A positive constant multiplies a standard error by the same constant, because $\mathrm{sd}(c\hat\theta) = c\,\mathrm{sd}(\hat\theta)$ for $c > 0$, and $\sqrt{252}$ is non-random once you have chosen it. The scaled standard error is

$$
0.4116 \times \sqrt{252} \approx 6.53.
$$

An annualised figure near $9.68$ with a standard error near $6.53$ is not a precise annual performance. It is $0.6097 \pm 0.41$, rewritten in louder units. [[performance/sharpe-and-its-relatives]] asked that $9.68$ not be admired. The standard error is the quantitative form of that request. The scaling identity is [[#prop-scale]] below, stated on its own so the $6.53$ is not an extra ad hoc step.
:::
:::

:::proposition A non-random scale multiplies the standard error {#prop-scale}
Let $\hat\theta$ be an estimator with finite standard deviation $\mathrm{se}(\hat\theta)$, and let $c > 0$ be a non-random constant. Then $\mathrm{se}(c\hat\theta) = c\,\mathrm{se}(\hat\theta)$. In particular, if a per-step Sharpe ratio is multiplied by $\sqrt{K}$ under [[performance/sharpe-and-its-relatives]], the standard error of the product is the per-step standard error multiplied by $\sqrt{K}$. The constant does not have to be an annualising factor. It has to be non-random. A factor that depended on the same sample would not pass through the standard deviation in this way.
:::

:::proof
For any random variable $Y$ with finite variance and any constant $c > 0$, $\Var(cY) = c^2\Var(Y)$, so the standard deviation, being the positive square root, is multiplied by $c$. Apply that identity to $Y = \hat\theta$. The annualising factor $\sqrt{K}$ is chosen by the researcher as a unit convention. It is not estimated from the returns. Hence it is non-random relative to the sampling distribution, and the standard error scales exactly. The identity does not say that the annualised estimator is better. It says the annualised estimator is the original estimator in different units, noise included.
:::

:::warning Do not insert an annualised ratio into the per-step formula
The $S$ in [[#def-lo]] is in the same units as the steps counted by $n$. Path A's per-step ratio is $0.6097$, and $n = 7$ counts steps, so the standard error is about $0.41$. The annualised figure near $9.68$ is not a per-step ratio. Inserting $S \approx 9.68$ and $n = 7$ into the square root produces a number near $2.61$. That number is neither the per-step standard error nor the annualised standard error of about $6.53$. It is a unit error. Annualising the point estimate and annualising the standard error are the content of [[#prop-scale]]. Annualising only the symbol inside the formula, and leaving $n$ as a count of days, mixes a year with a week.
:::

:::example A long sample, and a per-step ratio that is an input {#ex-se-long}
Take $n = 2520$, about ten years of $252$-day years, and take a per-step Sharpe ratio $S = 0.05$. Compute the IID normal standard error. The value $0.05$ per day is an input to the formula so that a long sample can be compared with $n = 7$. It is not a result from Path A, not a target, and not a realistic claim about any market. Do not annualise it and quote the product as a finding.
:::solution
$$
1 + \tfrac{1}{2}(0.05)^2 = 1.00125, \qquad \sqrt{1.00125} = 1.000625.
$$

Since $\sqrt{2520} = 50.1996\ldots$,

$$
\frac{1.000625}{50.1996\ldots} = 0.019933
$$

to six decimals. The known-scale benchmark $1/\sqrt{2520}$ is $0.019920$. The extra $\tfrac{1}{2} S^2$ term barely moves the result, because $0.05$ is a small per-step ratio. A rough $1.96$-standard-error band around the input $0.05$ runs from about $0.0109$ to about $0.0891$. Under the IID normal model, a sample of this length can exclude zero for a per-step ratio of $0.05$. The band is still several hundredths wide. "Much smaller than $0.41$" is true, and "known precisely" would still be too strong.

Compare the two plug-ins directly. At $n = 7$ and $S = 0.6097$ the standard error is about $0.41$. At $n = 2520$ and $S = 0.05$ it is about $0.020$. Most of that factor is $\sqrt{2520/7}$. The long sample is what makes a per-step ratio estimable, and only under the assumptions. There is no ten-year series in the exercise, only a formula and an input. Annualising $0.05$ by $\sqrt{252}$ would be the same unit conversion already rejected for Path A, not a finding.
:::
:::

Do not attach either standard error to a catalogue Sharpe. Example O01 has a reported Sharpe of $0.21$ and example W01 has a reported Sharpe of $0.45$, as reported on quants.md for those QuantJourney examples (Apache-2.0), read in 2026. This atlas has not re-run the backtests. It has not verified the annualisation, the risk-free rate, or the dependence of the returns behind those reported figures. Writing $\pm 0.41$ or $\pm 0.020$ next to them would invent a precision [[#def-lo]] does not licence. The formula needs the per-step ratio, the sample size in those same steps, and the IID normal assumption. A reported Sharpe on a $25$-year dashboard supplies none of those ingredients until the convention is known. The previous chapter already refused to treat $0.45$ and $0.21$ as two draws of one estimator. This chapter refuses to decorate them with a standard error computed for a different estimator.

## Autocorrelation shrinks the effective sample

Uncorrelatedness let the variances add. Positive correlation with the previous step means a new row partly repeats information the sample already has, so $\Var(\bar R)$ exceeds $\sigma^2/n$ and the row count overstates what was learned. Negative correlation pulls the other way for the mean: the variance of the mean is then smaller than the IID formula. The warning in this section is the positive case, the one in which a naive standard error is too small.

:::proposition Large-sample variance of the mean under geometric correlation {#prop-ar}
Assume $R_t$ is stationary with $\Var(R_t) = \sigma^2 < \infty$ and $\Corr(R_t, R_{t-k}) = \rho^k$ for every lag $k \ge 0$, with $|\rho| < 1$. This is the correlation structure of a causal autoregression of order one. The innovation representation is not required. Then

$$
\Var(\bar R) = \frac{\sigma^2}{n}\left(1 + 2\sum_{k=1}^{n-1}\Bigl(1 - \frac{k}{n}\Bigr)\rho^k\right).
$$

As $n \to \infty$ the factor in parentheses tends to $(1+\rho)/(1-\rho)$. The large-sample standard error of the mean is therefore approximately

$$
\frac{\sigma}{\sqrt{n}}\sqrt{\frac{1+\rho}{1-\rho}},
$$

and the **effective sample size** $n(1-\rho)/(1+\rho)$ is the sample size that would produce the same variance if the observations were uncorrelated. When $\rho > 0$ the effective sample size is smaller than $n$. When $\rho = 0$ the proposition reduces to [[#prop-mean-se]].
:::

:::proof
Write the variance of the sum by expanding the double sum of covariances. Stationarity gives $\Cov(R_t, R_s) = \sigma^2 \rho^{|t-s|}$, so

$$
\Var\Bigl(\sum_{t=1}^{n} R_t\Bigr) = n\sigma^2 + 2\sigma^2\sum_{1 \le s < t \le n}\rho^{t-s}.
$$

Lag $k$ appears once for each pair with $t - s = k$, and there are $n - k$ such pairs. The inner sum is $\sum_{k=1}^{n-1}(n-k)\rho^k$. Divide by $n^2$ to pass from the sum to the mean:

$$
\Var(\bar R) = \frac{\sigma^2}{n}\left(1 + 2\sum_{k=1}^{n-1}\Bigl(1 - \frac{k}{n}\Bigr)\rho^k\right).
$$

That is the finite-sample identity. For the limit, use $|\rho| < 1$. The geometric series sums to $\sum_{k=1}^{\infty}\rho^k = \rho/(1-\rho)$. The weighted tail with the factor $k/n$ vanishes as $n \to \infty$, because $\sum_{k=1}^{\infty} k|\rho|^k$ converges, so

$$
\Bigl|\sum_{k=1}^{n-1}\frac{k}{n}\rho^k\Bigr| \le \frac{1}{n}\sum_{k=1}^{\infty} k|\rho|^k \to 0.
$$

The factor in parentheses therefore tends to $1 + 2\rho/(1-\rho) = (1-\rho+2\rho)/(1-\rho) = (1+\rho)/(1-\rho)$. The square root of that limit is the inflation of the IID standard error. Solving $(1+\rho)/(1-\rho) = n/n_{\mathrm{eff}}$ for the effective size gives $n_{\mathrm{eff}} = n(1-\rho)/(1+\rho)$.
:::

The proposition is about the mean. Lo's formula for the Sharpe ratio is not the same algebra with the letters renamed: the ratio's sampling variance also uses the squares of the excess returns. Positive dependence still widens that asymptotic variance in the cases Lo works out, so the effective $n$ shrinks relative to the number of rows. This chapter does not copy that expansion. It uses [[#prop-ar]] for the mean and points to the 2002 paper for the ratio.

Estimating $\rho$ from Path A's seven simple returns would be a noisy exercise. The statistics course computes a lag-one correlation on that series and treats the estimate as noisy. This chapter does not pre-empt that calculation with a quoted coefficient. The numerical illustration uses a stated hypothetical correlation, labelled as hypothetical.

:::example A stated correlation, not an estimate {#ex-ar}
Suppose, as a hypothetical and not as a measurement, that $\rho = 0.2$, that $\sigma = 0.01$, and that $n = 2520$. Compute the IID standard error of the mean, the large-sample autoregressive standard error, and the effective sample size.
:::solution
The IID standard error is $0.01/\sqrt{2520} = 0.000199$ to six decimals. The inflation factor is

$$
\sqrt{\frac{1.2}{0.8}} = \sqrt{1.5} = 1.224745\ldots,
$$

so the large-sample standard error under [[#prop-ar]] is about $0.000244$. The effective sample size is

$$
2520 \times \frac{0.8}{1.2} = 1680.
$$

A fifth of the rows, as information about the mean, are redundant at this correlation. The shrinkage is real and, at $\rho = 0.2$, not dramatic. At $\rho = 0.5$ the factor $(1+\rho)/(1-\rho)$ equals $3$ and the effective sample size is $n/3$. The hypothetical $\rho$ was not fitted to Path A. Fitting it on seven points and then inserting it into the large-sample formula would dress up a noisy correlation as a precise effective sample size. [[statistics/moments-and-dependence]] is where the lag-one correlation of a return series is defined and where Path A's estimate belongs, with the noise acknowledged.

The direction matters. If $\rho$ were $-0.2$, the factor $(1+\rho)/(1-\rho)$ would be $0.8/1.2 < 1$, and the IID standard error would overstate the variance of the mean. A blanket claim that "dependence always widens the interval" is false for the mean. The claim this chapter uses is the positive one: positive autocorrelation shrinks the effective sample, and an IID standard error is then too small.
:::
:::


The same inputs can be moved. Raising n shrinks the standard error like 1 over a square root, and annualising multiplies the point and the standard error together. The figure uses Path A’s plug-in 0.6097 when the sliders are at the verified mean and standard deviation.

:::widget sharpe
mean: 0.01393
sd: 0.022848
n: 7
rf: 0
annualise: false
caption: Start from n = 7. The standard error is about 0.4116. Increase n, or turn on √252. Annualising widens the bar by the same factor that lifts the dot. The assumptions are iid normal excess returns. The figure does not rank anything.
:::
:::widget confidence
dist: normal
n: 7
level: 0.95
intervals: 40
method: t
caption: Each bar is a simulated interval for a mean, at the stated level, from a normal sample of size n. With n at 7 the bars are long and some of them miss the true mean. Raise n and the bars shorten. The figure is a sampling diagram for a mean under a model, in the spirit of the Path A calculation. It is not a Sharpe ratio, not a price path, and not a forecast.
:::

:::quiz
You have a per-step Sharpe ratio and its IID normal standard error. You multiply the ratio by $\sqrt{252}$ to express it in annual units, and $\sqrt{252}$ was chosen as a constant. What happens to the standard error?
- [ ] It is divided by $\sqrt{252}$, because a year contains more information than a day.
- [ ] It is unchanged, because a unit conversion does not affect uncertainty.
- [x] It is multiplied by $\sqrt{252}$, because a positive constant scales the estimator and its standard error together.
- [ ] It becomes $1/\sqrt{n}$, with the $\tfrac{1}{2} S^2$ term deleted.
:::solution
[[#prop-scale]] applies because the annualising factor is non-random. The standard error grows by $\sqrt{252}$ when the point estimate does. Dividing the standard error would describe a more precise annual ratio than the sample contains. On Path A that mistake would turn a standard error of about $0.41$ into a spurious annual standard error near $0.026$, next to a point near $9.68$. The honest scaled standard error is about $6.53$.
:::
:::

A standard error computed on one predeclared ratio does not see a search. If many rules were tried and one ratio was quoted, the sampling distribution of the maximum is wider. That is [[validation/the-deflated-sharpe]], not a calculation here. The interval in [[#ex-se-sharpe]] is already wide for one ratio. This chapter computes the two objects the course named, the mean and the per-step Sharpe ratio, and does not pretend Lo's formula is a standard error for every column on a dashboard.

:::history
In 2002 Andrew W. Lo derived the sampling distribution of the Sharpe ratio, including the effect of serial correlation, and showed how wide the interval is for samples of a few years. The square-root formula in [[#def-lo]] is the i.i.d. normal special case of that argument, with the ratio left in per-step units. The width computed here for seven steps is the same moral on a sample too short for the asymptotics to be comfortable: a performance number without a standard error is not yet a measurement, and a standard error that has been annualised into silence is not the measurement either. This note follows the course record of the paper. It is not a reconstructed quotation.
:::

## Where this leads

The lag-one correlation that rescales the variance of the mean is defined properly in [[statistics/moments-and-dependence]], where Path A's own estimate can be computed and then distrusted because the series is short. Tests that turn a mean into a decision, and the cost of having searched many rules before reporting one, sit further along that course and in [[validation/the-deflated-sharpe]]. The performance ratios themselves stay what the previous chapters said they were: functions of a sample, not ranks.

:::summary
- The standard error of an estimator is the standard deviation of its sampling distribution under a stated model. It is not the standard deviation of the returns.
- If the returns are uncorrelated with common variance $\sigma^2$, the standard error of the mean is $\sigma/\sqrt{n}$. On Path A the plug-in is $0.022848/\sqrt{7} = 0.008636$. The mean $0.013930$ is about $1.61$ standard errors above zero, and a rough interval contains zero.
- At $n = 7$, a $t$ quantile near $2.447$ is more honest than $1.96$ if one is willing to assume normality. The interval gets wider, not narrower.
- Under i.i.d. normal excess returns, Lo's large-sample standard error of a per-step Sharpe ratio is $\sqrt{(1 + \tfrac{1}{2} S^2)/n}$. For $S = 0.6097$ and $n = 7$ it is $0.4116$, about $0.41$. A $1.96$-standard-error band runs from about $-0.20$ to about $1.42$.
- Multiplying the Path A ratio by $\sqrt{252}$ produces a figure near $9.68$ and multiplies the standard error by the same constant, to about $6.53$. The annualised figure is not a precise annual edge. Inserting $9.68$ back into the per-step formula with $n = 7$ is a unit error.
- At $n = 2520$ and a per-step input $S = 0.05$, the same IID formula gives a standard error of about $0.019933$. The input is not a finding. The comparison shows what a long sample does to the width.
- Under positive AR(1) correlation the variance of the mean is inflated by about $(1+\rho)/(1-\rho)$ in large samples, and the effective sample size shrinks. At a hypothetical $\rho = 0.2$ and $n = 2520$, the effective size is $1680$. This factor is for the mean. It is not a licence to attach $\pm 0.41$ or $\pm 0.02$ to a catalogue Sharpe whose convention was not verified.
:::

## Exercises

:::exercise Plug in Path A's standard deviation {level=1 check="0.008636"}
The verified sample standard deviation is $0.022848$ and $n = 7$. Under [[#prop-mean-se]], with $\sigma$ replaced by this sample standard deviation, compute the standard error of the mean to six decimal places. (Enter the standard error.)
:::solution
$0.022848 / \sqrt{7} = 0.008636$ to six decimal places. This is the scale of the mean under an uncorrelated model, not the scale of the seven returns.
:::
:::

:::exercise The seven-step Sharpe standard error {level=1 check="0.4116"}
Use $S = 0.6097$ and $n = 7$ in the IID normal formula $\sqrt{(1 + \tfrac{1}{2} S^2)/n}$. Round the result to four decimal places. (Enter the standard error.)
:::solution
$1 + \tfrac{1}{2}(0.6097)^2 = 1.185867$. The square root of that value is $1.088975$. Divide by $\sqrt{7}$:

$$
1.088975 / 2.645751 = 0.4116
$$

to four decimal places. About $0.41$ is the same quantity at two-decimal resolution. The annualised point near $9.68$ is not part of this exercise.
:::
:::

:::exercise A standard error you can do in your head {level=1 check="0.005"}
Observations are uncorrelated with common standard deviation $\sigma = 0.02$, and $n = 16$. Compute the standard error of the sample mean. (Enter the standard error.)
:::solution
$\sqrt{16} = 4$, so the standard error is $0.02/4 = 0.005$. [[#prop-mean-se]] is the whole argument. No annualising factor enters.
:::
:::

:::exercise Ten years of trading days, as an input {level=2 check="0.019933"}
Take $n = 2520$ and a per-step Sharpe ratio $S = 0.05$ inside the IID normal formula. Compute the standard error to six decimal places. (Enter the standard error.)
:::solution
$1 + \tfrac{1}{2}(0.05)^2 = 1.00125$, and $\sqrt{1.00125} = 1.000625$. Then $\sqrt{2520} = 50.199602\ldots$, and

$$
1.000625 / 50.199602 = 0.019933
$$

to six decimals. The input $S = 0.05$ per step is not a measured performance. The output is what the formula does to that input at this sample size. It is much smaller than $0.4116$ because $n$ is much larger, not because $0.05$ was annualised.
:::
:::

:::exercise Effective sample size at a stated correlation {level=2 check="1680"}
In the large-sample AR(1) approximation, $\rho = 0.2$ and $n = 2520$. Compute the effective sample size for the mean. (Enter the effective sample size.)
:::solution
$$
n_{\mathrm{eff}} = 2520 \times \frac{1-0.2}{1+0.2} = 2520 \times \frac{0.8}{1.2} = 1680.
$$

The IID formula would behave as if it had $1680$ uncorrelated observations rather than $2520$ rows. The correlation was stated, not estimated from Path A.
:::
:::

:::exercise How many standard errors is the mean? {level=2 check="1.61"}
Path A's verified mean is $0.013930$ and the plug-in standard error of the mean is $0.008636$. Compute the ratio of the mean to the standard error, rounded to two decimal places. (Enter the ratio.)
:::solution
$0.013930 / 0.008636 = 1.613\ldots = 1.61$ to two decimal places. Under a normal approximation this is not a large studentised value, and the matching interval in [[#ex-se-mean]] contains zero. The ratio is not a Sharpe ratio. The Sharpe ratio divides the mean by the standard deviation of the returns, $0.022848$, and equals $0.6097$. Dividing by the standard error of the mean instead is a statement about the mean alone.
:::
:::

:::exercise Scaling does not buy precision {level=3 check="6.53"}
The IID normal standard error of Path A's per-step Sharpe ratio is $0.4116$, rounded to four decimals. Multiply that standard error by $\sqrt{252}$ and round to two decimal places. In the solution, say what the scaled number is the standard error of, and what it is not. (Enter the scaled standard error.)
:::hint
[[#prop-scale]] says a positive non-random constant multiplies the estimator and the standard error by the same factor. Here the constant is $\sqrt{252}$ and the estimator is the per-step ratio $0.6097$. Compute $0.4116 \times \sqrt{252}$.
:::
:::solution
$$
0.4116 \times \sqrt{252} = 0.4116 \times 15.874508\ldots = 6.534\ldots = 6.53
$$

to two decimal places. By [[#prop-scale]] this is the standard error of the annualised ratio $0.6097 \times \sqrt{252} \approx 9.68$, under the same IID normal model, because the annualising factor is a constant. It is not a tighter interval. It is not the standard error you would get by inserting $9.68$ into [[#def-lo]] with $n = 7$, which is a unit error and produces a number near $2.61$. It is not a standard error for any catalogue Sharpe. The seven observations remain seven observations.
:::
:::

:::exercise The inflation factor at correlation one half {level=3 check="3"}
For the large-sample variance of the mean under [[#prop-ar]], set $\rho = 0.5$. Compute the factor $(1+\rho)/(1-\rho)$ by which the IID variance of the mean is multiplied. (Enter the factor.)
:::hint
Substitute $\rho = 0.5$ into $(1+\rho)/(1-\rho)$. You can also sum the geometric series in the proof: the limiting factor is $1 + 2\rho/(1-\rho)$. Either route should give the same number. Then note what the factor does to the effective sample size.
:::
:::solution
$$
\frac{1+0.5}{1-0.5} = \frac{1.5}{0.5} = 3.
$$

The same value is $1 + 2\times 0.5/(1-0.5) = 1 + 1/0.5 = 1 + 2 = 3$. The large-sample variance of the mean is three times the IID variance, so the standard error is multiplied by $\sqrt{3}$, not by $3$. The effective sample size is $n/3$. The exercise asks for the variance factor, which is $3$. The correlation is a stated input. At $\rho = 0.5$ a naive IID interval for the mean is substantially too narrow, which is the sense in which positive autocorrelation shrinks the amount of information in the row count. The factor is not Lo's full correction for the Sharpe ratio. It is the correction for the mean derived in [[#prop-ar]].
:::
:::
