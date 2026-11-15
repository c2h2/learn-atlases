Quarterly real GDP in South Africa, monthly consumer prices in India, and daily closing quotes on the naira all arrive as **sequences in time**. Adjacent observations are almost never independent. A high inflation reading is typically followed by another high reading; a quarter of falling output is more often followed by another weak quarter than by a boom. The methods of [[econometrics]] — ordinary least squares, $t$ tests, $R^2$ — were derived for random samples, in which the order of the observations is irrelevant. For a time series the order *is* the information. Treating 120 months of inflation as 120 independent draws produces standard errors that are too small, and it produces forecasts that ignore the most useful fact in the sample: last month's inflation is a good guess at this month's.

This chapter builds the probability language for that dependence. A time series is a realisation of a **stochastic process**. The process is **weakly stationary** when its mean and autocovariances do not depend on the date. The autocovariance function, and the autocorrelation function obtained from it, are then well-defined objects that we can estimate from a single finite record. **White noise** is the special case of no serial correlation; it is the building block from which every linear model in the rest of the course is assembled. Probability tools used here — expectation, covariance, the law of large numbers — are developed fully in the Maths Atlas; we import them rather than re-deriving them.

The chapter is for education. Historical series are cited with a source and a date to illustrate a concept; they are not forecasts, and nothing here is investment or financial advice.

## Time-series data

A **time series** is a sequence $\{y_t\}_{t=1}^{T}$ indexed by equally spaced time. The spacing is part of the definition: quarterly real GDP and monthly industrial production are different series even if they describe the same economy. Typical sources in this atlas are national statistical offices and central-bank databases (FRED, ONS, Eurostat, IBGE, MOSPI, Statistics South Africa, NBS China, NBS Nigeria). Before any model is written down, three mundane questions have to be answered, because they change the object being modelled.

- **Level or transformation.** Many macro series are analysed in logarithms, so that first differences are approximately growth rates. A price index $P_t$ becomes $p_t = \log P_t$ and $\Delta p_t \approx (P_t - P_{t-1})/P_{t-1}$. Returns on a financial asset are often computed as $r_t = \log P_t - \log P_{t-1}$; that choice, and its limitations, is discussed in [[asset-pricing/returns-and-risk]]. Illustrative numbers in this course are not a recommendation to compute, hold or trade any return.
- **Seasonal adjustment.** Monthly retail sales and quarterly GDP have a seasonal component. Statistical offices often publish a seasonally adjusted vintage; using it and then adding seasonal dummies double-counts the season. Using the unadjusted vintage and ignoring the season leaves a periodic mean that looks like serial correlation.
- **Revisions and vintages.** Macro data are revised. A regression of 2020-vintage GDP growth on a policy shock is not the same regression as one that uses the 2026 vintage of the same dates. Time-series econometrics is applied to a chosen vintage; the vintage is part of the data description.

::: definition Stochastic process and realisation {#def-process}
A **stochastic process** is a family of random variables $\{Y_t : t \in \Z\}$ defined on a common probability space. A **realisation** (or sample path) is one draw of the whole family, written $\{y_t\}$. The econometrician observes a finite segment $y_1,\ldots,y_T$ of one realisation and wishes to say something about the process that generated it.
:::

The distinction between process and realisation is not pedantry. With a random sample of households we observe many independent copies of the same random variable. With a time series we observe many dates of *one* copy of a process. To learn the mean of $Y_t$ from a single path we need the path to visit the typical behaviour of the process — which is precisely what stationarity and ergodicity will encode.

::: example A short invented path {#ex-path}
An invented quarterly growth rate (percentage points, not a real country's data) reads

$$
1.2,\ 0.4,\ -0.3,\ 0.8,\ 1.1,\ 0.2,\ -0.5,\ 0.6.
$$

Compute the sample mean and the first two sample autocovariances, using the divisor $T$ for the autocovariances (the convention of [[#def-sample-acf]] below).
::: solution
Here $T = 8$ and $\bar y = (1.2+0.4-0.3+0.8+1.1+0.2-0.5+0.6)/8 = 3.5/8 = 0.4375$. The demeaned values are

$$
0.7625,\ -0.0375,\ -0.7375,\ 0.3625,\ 0.6625,\ -0.2375,\ -0.9375,\ 0.1625.
$$

The sample variance with divisor $T$ is $\hat\gamma_0 = T^{-1}\sum_{t=1}^{T}(y_t-\bar y)^2 = 2.77375/8 = 0.3467$ to four decimals. The lag-1 autocovariance is $\hat\gamma_1 = T^{-1}\sum_{t=2}^{T}(y_t-\bar y)(y_{t-1}-\bar y) = -0.3766/8 = -0.0471$. The lag-2 autocovariance is $\hat\gamma_2 = T^{-1}\sum_{t=3}^{T}(y_t-\bar y)(y_{t-2}-\bar y) = -0.5481/8 = -0.0685$. The corresponding sample autocorrelations are $\hat\rho_1 = \hat\gamma_1/\hat\gamma_0 = -0.136$ and $\hat\rho_2 = -0.198$. A path of length 8 is too short for these numbers to mean much; they illustrate the arithmetic, not a finding about growth.
:::
:::

## Weak stationarity

A process can be strictly stationary — every finite collection $(Y_{t_1+k},\ldots,Y_{t_n+k})$ has the same distribution for every shift $k$ — or weakly stationary, which is a restriction only on the first two moments. Weak stationarity is what ARMA modelling uses, and it is what this course means by “stationary” unless a stricter qualifier is added.

::: definition Weak stationarity {#def-weak-stat}
The process $\{Y_t\}$ is **weakly stationary** (covariance-stationary) if

1. $\E[Y_t] = \mu$ is finite and does not depend on $t$;
2. $\Var(Y_t) = \gamma_0$ is finite and does not depend on $t$;
3. $\Cov(Y_t, Y_{t-k}) = \gamma_k$ exists and depends on $t$ and $t-k$ only through the lag $k$.

The sequence $\{\gamma_k\}_{k\in\Z}$ is the **autocovariance function**. It satisfies $\gamma_{-k} = \gamma_k$ and $|\gamma_k| \le \gamma_0$.
:::

The third clause is the important one. For a weakly stationary process the covariance between this quarter and last quarter is the same number as the covariance between 1987:Q2 and 1987:Q1. That is an assumption, not a fact: a war, a change of monetary regime or a pandemic can break it. The diagnostics of later chapters are, in part, checks that the assumption is not hopeless for the sample at hand.

Two processes that fail [[#def-weak-stat]] appear constantly and will occupy [[time-series/unit-roots]].

- A **deterministic trend**, $Y_t = \alpha + \delta t + U_t$ with $\{U_t\}$ stationary, has a mean that grows with $t$. The detrended series $Y_t - \hat\alpha - \hat\delta t$ may be stationary.
- A **random walk**, $Y_t = Y_{t-1} + \varepsilon_t$ with white-noise $\varepsilon_t$, has $\Var(Y_t) = t\,\sigma^2$ if $Y_0 = 0$, which grows without bound. Differencing, not detrending, is the operation that restores stationarity.

::: warning Stationary is not the same as “looks flat”
A series can wander for a long time and still be stationary: an AR(1) with coefficient $0.95$ has mean reversion so slow that a sample of a few hundred observations looks like a random walk. Conversely, a random walk can, in a particular sample, look as if it is reverting to a mean. Eyeballing a plot is not a test. The sample autocorrelation function and the unit-root tests of [[time-series/unit-roots]] are the tools that make the distinction operational.
:::

::: intuition Why the mean has to be constant
If $\E[Y_t]$ depends on $t$, the sample average $\bar y = T^{-1}\sum_{t=1}^{T} y_t$ is an average of different means. It converges, under mild conditions, to the average of those means over the sample, not to “the” mean of the process — there isn't one. Forecasts that treat $\bar y$ as the long-run level then systematically miss. This is the simplest reason to difference a trending series, or to include a time trend, *before* talking about serial correlation.
:::

Strict stationarity implies weak stationarity whenever second moments exist. The converse is false: a process can have constant mean and autocovariance and still have, for example, a variance of the conditional distribution that changes with $t$ in a way that the unconditional variance does not see. GARCH processes in [[time-series/volatility]] are weakly stationary (under a parameter restriction) but not i.i.d.; their conditional variance moves even though $\gamma_0$ does not.

## Autocovariance and autocorrelation

The autocovariance function of a weakly stationary process is easier to compare across series if it is scaled by the variance.

::: definition Autocorrelation function {#def-acf}
The **autocorrelation function** (ACF) of a weakly stationary process is

$$
\rho_k = \frac{\gamma_k}{\gamma_0} = \Corr(Y_t, Y_{t-k}), \qquad k \in \Z.
$$

In particular $\rho_0 = 1$ and $|\rho_k| \le 1$. The **partial autocorrelation** $\phi_{kk}$ is the correlation between $Y_t$ and $Y_{t-k}$ after linear projection on $Y_{t-1},\ldots,Y_{t-k+1}$ has been partialled out; it is constructed in [[time-series/arma-models]].
:::

Covariance and correlation for a pair of random variables are defined in the Maths Atlas ([joint distributions](/a/maths/lesson.php?c=probability&l=joint-distributions)). The only new element here is that the pair is $(Y_t, Y_{t-k})$, and that stationarity makes the correlation a function of $k$ alone.

A leading family of stationary processes, used as a running example in this chapter and developed fully in the next, is the **first-order autoregression**.

::: proposition ACF of an AR(1) {#prop-ar1-acf}
Let $\varepsilon_t$ be white noise with variance $\sigma^2$, and let

$$
Y_t = c + \phi Y_{t-1} + \varepsilon_t, \qquad |\phi| < 1.
$$ {#eq-ar1}

Then $\{Y_t\}$ is weakly stationary, with

$$
\mu = \frac{c}{1-\phi}, \qquad \gamma_0 = \frac{\sigma^2}{1-\phi^2}, \qquad \rho_k = \phi^{|k|}.
$$
:::

::: proof
Iterate [[#eq-ar1]] backwards $n$ steps:

$$
Y_t = c\frac{1-\phi^n}{1-\phi} + \phi^n Y_{t-n} + \sum_{j=0}^{n-1} \phi^j \varepsilon_{t-j}.
$$

As $n\to\infty$, $\phi^n \to 0$ because $|\phi|<1$, and the infinite sum $\sum_{j=0}^{\infty}\phi^j\varepsilon_{t-j}$ converges in mean square (its variance $\sigma^2\sum\phi^{2j} = \sigma^2/(1-\phi^2)$ is finite). Taking expectations gives $\mu = c/(1-\phi)$. The demeaned process $X_t = Y_t - \mu$ satisfies $X_t = \phi X_{t-1} + \varepsilon_t$. Then $\gamma_0 = \E[X_t^2] = \phi^2\gamma_0 + \sigma^2$, so $\gamma_0 = \sigma^2/(1-\phi^2)$. For $k\ge 1$, $\gamma_k = \E[X_t X_{t-k}] = \phi\,\E[X_{t-1}X_{t-k}] = \phi\gamma_{k-1}$, and iterating yields $\gamma_k = \phi^k\gamma_0$.
:::

The condition $|\phi|<1$ is the stationarity condition for an AR(1). If $\phi = 1$ the process is a random walk (with drift $c$), which is the subject of [[time-series/unit-roots]]. If $|\phi|>1$ the process can be rewritten as a forward-looking series that is stationary after a sign change of time, but that representation is rarely useful for economic data recorded forwards.

::: example Theoretical ACF of an AR(1) {#ex-ar1-theo}
For [[#eq-ar1]] with $\phi = 0.7$, $c = 0$ and $\sigma^2 = 1$, compute $\mu$, $\gamma_0$ and $\rho_k$ for $k = 1,\ldots,5$. Repeat for $\phi = -0.6$.
::: solution
With $c = 0$ we have $\mu = 0$. For $\phi = 0.7$,

$$
\gamma_0 = \frac{1}{1-0.49} = \frac{1}{0.51} \approx 1.961,
$$

and $\rho_k = 0.7^k$, so

$$
\rho_1 = 0.700,\ \rho_2 = 0.490,\ \rho_3 = 0.343,\ \rho_4 = 0.240,\ \rho_5 = 0.168.
$$

The ACF is positive and decays geometrically. For $\phi = -0.6$, $\gamma_0 = 1/(1-0.36) = 1/0.64 = 1.5625$ and $\rho_k = (-0.6)^k$, so

$$
\rho_1 = -0.600,\ \rho_2 = 0.360,\ \rho_3 = -0.216,\ \rho_4 = 0.130,\ \rho_5 = -0.078.
$$

The ACF oscillates in sign and still decays geometrically. In both cases $|\rho_k|\to 0$, which is the sense in which a stationary AR(1) “forgets” its starting point.
:::
:::

::: widget plot
f: phi^x; abs(phi)^x
sliders: phi=0.7:0.05:0.95:0.05
x: 0, 16
y: -0.2, 1.05
labels: \rho_x; |\phi|^x
caption: Theoretical ACF of a stationary AR(1), $\rho_x = \phi^{x}$ for $x \ge 0$. Drag $\phi$ towards $1$: decay becomes slow, and a short sample will look like a random walk. The envelope $|\phi|^{x}$ is drawn for comparison. (The slider is restricted to positive $\phi$ so that $\phi^{x}$ stays real for non-integer $x$.)
:::

The same geometric decay is the impulse response of the AR(1): a one-unit shock $\varepsilon_t$ raises $Y_{t+k}$ by $\phi^k$ on average. Slow decay of the ACF and a long-lived impulse response are the same fact.

## White noise

Every linear time-series model in this course is driven by a shock series that is unpredictable from its own past.

::: definition White noise {#def-wn}
The process $\{\varepsilon_t\}$ is **white noise**, written $\varepsilon_t \sim \mathrm{WN}(0,\sigma^2)$, if $\E[\varepsilon_t] = 0$, $\Var(\varepsilon_t) = \sigma^2 < \infty$, and $\Cov(\varepsilon_t, \varepsilon_{t-k}) = 0$ for every $k \neq 0$. It is **strong white noise** (or i.i.d. white noise) if the $\varepsilon_t$ are i.i.d. with mean $0$ and variance $\sigma^2$. Gaussian white noise is i.i.d. $\Normal(0,\sigma^2)$.
:::

White noise is weakly stationary, with $\rho_k = 0$ for $k \neq 0$. Strong white noise is a strictly stationary special case. The distinction matters for volatility: a GARCH process can have uncorrelated levels (so the levels are white noise) while the *squares* are strongly serially correlated. Calling a return series “white noise” does not say that it is i.i.d., and it does not say that it is Gaussian.

::: proposition Autocovariance of white noise {#prop-wn}
If $\varepsilon_t \sim \mathrm{WN}(0,\sigma^2)$, then $\gamma_0 = \sigma^2$ and $\gamma_k = 0$ for $k \neq 0$. Consequently the ACF is a spike at lag $0$. Linear combinations $Y_t = \mu + \sum_{j=0}^{\infty} \psi_j \varepsilon_{t-j}$ with $\sum_j \psi_j^2 < \infty$ are weakly stationary, with

$$
\gamma_k = \sigma^2 \sum_{j=0}^{\infty} \psi_j \psi_{j+k}.
$$ {#eq-wold-gamma}
:::

::: proof
The statements about $\varepsilon_t$ are the definition. For the linear combination, $\E[Y_t] = \mu$ because each $\varepsilon$ has mean zero. The covariance formula is the bilinear expansion of $\E[(Y_t-\mu)(Y_{t-k}-\mu)]$, in which $\E[\varepsilon_{t-j}\varepsilon_{t-k-\ell}] = \sigma^2$ only when the indices match, i.e. $j = \ell + k$, and is zero otherwise. Mean-square convergence of the infinite sum follows from $\sum\psi_j^2 < \infty$.
:::

[[#eq-wold-gamma]] is the computational engine of ARMA modelling. Wold's decomposition, proved in 1938, says something stronger: *every* weakly stationary purely nondeterministic process has such a representation, with $\psi_0 = 1$ and $\varepsilon_t$ equal to the one-step forecast error. The ARMA models of the next chapter are the parametric special cases in which the $\psi_j$ obey a linear recurrence.

::: quiz
Which of the following processes is weakly stationary?
- [ ] $Y_t = 0.3\, t + \varepsilon_t$ with $\varepsilon_t \sim \mathrm{WN}(0,1)$
- [x] $Y_t = 2 + 0.8 Y_{t-1} + \varepsilon_t$ with $\varepsilon_t \sim \mathrm{WN}(0,1)$
- [ ] $Y_t = Y_{t-1} + \varepsilon_t$ with $\varepsilon_t \sim \mathrm{WN}(0,1)$ and $Y_0 = 0$
- [ ] $Y_t = \varepsilon_t^2$ where $\varepsilon_t = t^{-1/2} \eta_t$ and $\eta_t \sim \mathrm{WN}(0,1)$
::: solution
The AR(1) has $|\phi| = 0.8 < 1$, so [[#prop-ar1-acf]] applies: it is weakly stationary with mean $2/(1-0.8) = 10$. The linear trend has a time-varying mean. The random walk has $\Var(Y_t) = t$. The last process has $\Var(Y_t) = \E[\varepsilon_t^4]$ which, even if $\eta_t$ is Gaussian, depends on $t$ through the factor $t^{-2}$ in $\E[\varepsilon_t^4]$.
:::
:::

## The sample ACF

Given one realisation of length $T$, the natural estimators of $\mu$ and $\gamma_k$ replace expectations by sample averages. Because we have only one path, these averages run over time rather than over independent copies. That is legitimate when the process is ergodic for the relevant moments: time averages converge to ensemble averages. For weakly stationary processes with absolutely summable autocovariances, $\sum_k |\gamma_k| < \infty$, ergodicity of the mean and of the autocovariances holds; ARMA processes with roots outside the unit circle satisfy the condition. The underlying [law of large numbers](/a/maths/lesson.php?c=probability&l=limit-theorems) is the same idea as in the i.i.d. case, with dependence decaying fast enough to play the role of independence.

::: definition Sample mean and sample ACF {#def-sample-acf}
For a sample $y_1,\ldots,y_T$, the **sample mean** is $\bar y = T^{-1}\sum_{t=1}^{T} y_t$. The **sample autocovariance** at lag $k \ge 0$ is

$$
\hat\gamma_k = \frac{1}{T} \sum_{t=k+1}^{T} (y_t - \bar y)(y_{t-k} - \bar y),
$$

and the **sample autocorrelation** is $\hat\rho_k = \hat\gamma_k / \hat\gamma_0$. The divisor is $T$, not $T-k$: this keeps the sample autocovariance matrix positive semi-definite.
:::

Under weak stationarity and $\sum |\gamma_k| < \infty$, $\bar y$ is consistent for $\mu$ with asymptotic variance $T^{-1}\sum_{k=-\infty}^{\infty}\gamma_k$. The extra factor $\sum_k \rho_k$ relative to the i.i.d. formula $\sigma^2/T$ is the price of serial correlation: positive $\rho_k$ inflates the variance of the sample mean, which is why OLS standard errors that ignore serial correlation are too small ([[econometrics/inference]]).

For the sample ACF itself, a classical result of Bartlett gives a usable standard error when the truth is white noise.

::: proposition Bartlett's formula for white noise {#prop-bartlett}
If $\{Y_t\}$ is i.i.d. with finite fourth moment, then for each fixed $k \ge 1$,

$$
\sqrt{T}\,\hat\rho_k \ \to_d\ \Normal(0, 1).
$$

Hence an approximate 95% band for $\hat\rho_k$ under the white-noise null is $\pm 1.96/\sqrt{T}$. More generally, if $Y_t$ is white noise (uncorrelated, not necessarily i.i.d.) with finite fourth moments and $\E[Y_t^2 Y_{t-k} Y_{t-\ell}] = 0$ for $k \neq \ell$, the same $\Normal(0,1)$ limit holds.
:::

::: proof
Under i.i.d., $\hat\gamma_k = T^{-1}\sum_{t=k+1}^{T} (Y_t-\bar Y)(Y_{t-k}-\bar Y)$ is a sample average of mean-zero terms plus a contribution from $\bar Y$ that is $O_p(T^{-1})$. The central limit theorem ([limit theorems](/a/maths/lesson.php?c=probability&l=limit-theorems)) gives $\sqrt{T}\,\hat\gamma_k \to_d \Normal(0, \gamma_0^2)$. Slutsky's lemma and $\hat\gamma_0 \to_p \gamma_0$ yield the result for $\hat\rho_k$. The uncorrelated case uses a martingale-difference CLT in place of the i.i.d. CLT; the extra moment restriction kills the covariance between distinct lags' summands.
:::

The band $\pm 1.96/\sqrt{T}$ is drawn on every correlogram in applied work. It is a *pointwise* band under the null of white noise, not a simultaneous band for many lags, and it is not valid if the series is correlated. For an AR(1) with $\phi = 0.7$, $\Var(\hat\rho_1)$ is smaller than $1/T$ and $\Var(\hat\rho_k)$ for large $k$ is larger; using the white-noise band to “see whether lag 8 is significant” on an AR(1) is a misreading of [[#prop-bartlett]].

A portmanteau statistic that looks at many lags at once is the Ljung–Box $Q$.

::: definition Ljung–Box statistic {#def-lb}
The **Ljung–Box statistic** at lag $h$ is

$$
Q(h) = T(T+2)\sum_{k=1}^{h} \frac{\hat\rho_k^2}{T-k}.
$$

Under the null that the series is i.i.d. (or, for residuals from an estimated ARMA$(p,q)$, that the *innovations* are i.i.d.) and $h$ is fixed, $Q(h) \to_d \chi^2_{h}$ (or $\chi^2_{h-p-q}$ for residuals). Large $Q$ rejects uncorrelatedness.
:::

The $\chi^2$ approximation is a large-sample statement; see [hypothesis tests](/a/maths/lesson.php?c=statistics&l=hypothesis-testing) for the meaning of a $p$-value. Residual $Q$ tests after fitting a model are taken up in [[time-series/arma-models]].

::: example White noise, seed 42 {#ex-wn-sim}
A Gaussian white-noise series of length $T = 200$ was drawn as $\varepsilon_t \iid \Normal(0,1)$ with NumPy seed $42$. The first eight values are $0.497$, $-0.138$, $0.648$, $1.523$, $-0.234$, $-0.234$, $1.579$, $0.767$. The sample mean is $-0.041$ and the sample variance (divisor $T-1$) is $0.867$. The sample ACF at lags $1$ through $8$ is

$$
-0.052,\ -0.039,\ 0.002,\ -0.120,\ 0.109,\ 0.052,\ 0.043,\ -0.061.
$$

Does anything here contradict white noise? Compute the 95% Bartlett band and the Ljung–Box $Q(10)$, which equals $8.85$.
::: solution
The Bartlett band is $\pm 1.96/\sqrt{200} = \pm 0.139$. Every reported $\hat\rho_k$ lies inside the band; the largest in magnitude is $\hat\rho_4 = -0.120$. Under the white-noise null this is unsurprising: with eight lags one expects the occasional near-miss. The Ljung–Box statistic $Q(10) = 8.85$ is compared with $\chi^2_{10}$, whose 5% critical value is $18.31$. The $p$-value is $0.55$. The sample does not reject white noise, as it should not: it was drawn from white noise. The sample variance $0.867$ is a bit below $1$ because $T = 200$ is finite; that is sampling variation, not a specification error.
:::
:::

::: example AR(1) sample ACF, seed 7 {#ex-ar1-sim}
An AR(1) of length $250$ was drawn from $Y_t = 0.7 Y_{t-1} + \varepsilon_t$, $\varepsilon_t \iid \Normal(0,1)$, NumPy seed $7$, and the first $50$ observations were discarded as burn-in, leaving $T = 200$. The sample mean is $-0.035$ and the sample variance is $1.591$ (the theoretical variance is $1.961$). Sample and theoretical autocorrelations:

| lag $k$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ |
|---|---|---|---|---|---|---|---|---|
| $\hat\rho_k$ | $0.675$ | $0.472$ | $0.358$ | $0.266$ | $0.170$ | $0.176$ | $0.155$ | $0.111$ |
| $\phi^k$ | $0.700$ | $0.490$ | $0.343$ | $0.240$ | $0.168$ | $0.118$ | $0.082$ | $0.058$ |

The OLS regression of $y_t$ on a constant and $y_{t-1}$ gives $\hat\phi = 0.679$ (standard error $0.052$). How does the sample ACF compare with [[#prop-ar1-acf]], and what does the white-noise Bartlett band $\pm 0.139$ wrongly suggest?
::: solution
The sample ACF tracks $\phi^k$ closely at the first five lags and is a little high thereafter — ordinary sampling variation at $T = 200$. The OLS estimate $0.679$ is $0.4$ standard errors below $0.7$. The Bartlett band $\pm 0.139$ is the *white-noise* band. Under it, lags $1$ through $8$ would all be declared “significant”, which is the correct qualitative conclusion (the series is not white noise) but the wrong standard error for any particular $\hat\rho_k$ once dependence is granted. Ljung–Box $Q(10)$ on the *levels* is $199.1$, which rejects white noise at any conventional level. On the OLS residuals it is $5.53$ ($p = 0.79$ against $\chi^2_9$), which is what a well-specified AR(1) should produce.
:::
:::

::: widget sequence
a: phi^n
sliders: phi=0.7:0.1:0.95:0.05
N: 24
start: 0
mode: terms
limit: 0
y: -0.1, 1.05
caption: Geometric decay $\phi^{n}$ of an AR(1) autocorrelation. Raise $\phi$ towards $1$ and watch how many lags remain far from zero. Those are the lags at which a short sample still remembers the starting value.
:::

A negative $\phi$ produces an oscillating ACF, as in [[#ex-ar1-theo]]. A simulated AR(1) with $\phi = -0.6$, seed $8$, $T = 200$ after burn-in, has sample ACF

$$
-0.503,\ 0.164,\ 0.034,\ -0.035,\ -0.006,\ -0.081
$$

against theoretical values $-0.600$, $0.360$, $-0.216$, $0.130$, $-0.078$, $0.047$. The first two lags have the right signs and the right orders of magnitude; higher lags are noisy, as $\phi^k$ is already small.

::: quiz
A monthly series of length $T = 100$ has $\hat\rho_1 = 0.22$ and $\hat\rho_{12} = 0.41$. Using only the white-noise Bartlett band, which statement is reasonable?
- [ ] Both lags are consistent with white noise, because $0.22 < 1$
- [ ] Only lag $1$ is evidence against white noise
- [x] Lag $12$ lies well outside $\pm 1.96/\sqrt{100} = \pm 0.196$, so white noise is not a good description; a seasonal ARMA term is a candidate
- [ ] The sample ACF cannot be used at lag $12$ because $12 > \sqrt{T}$
::: solution
The pointwise 95% band under white noise is $\pm 0.196$. Then $0.22$ is a mild rejection at lag $1$ and $0.41$ is a clear rejection at lag $12$. Monthly series often have a seasonal spike at lag $12$; that is a modelling clue, not a reason to discard the lag. There is no rule that the ACF is unusable beyond $\sqrt{T}$, although the variance of $\hat\rho_k$ does grow with $k$ and very large $k$ (a substantial fraction of $T$) should not be over-interpreted.
:::
:::

## Evidence: persistence in economic series

Whether a particular economic series is well approximated as stationary around a mean, stationary around a trend, or integrated of order one is an empirical question, and a contentious one. The rest of this course develops the tests. A few documented regularities set the scene; they are stylised facts, not theorems.

Growth rates of real output are much closer to stationarity than the *level* of output. For the United States, quarterly real GDP (FRED series GDPC1, chained 2017 dollars, seasonally adjusted) has a strong upward trend in levels over 1947–2024; its quarter-on-quarter log difference has a sample first autocorrelation typically in the range $0.2$–$0.4$ depending on the exact window (a representative post-1984 window is towards the lower end). Nelson and Plosser (1982, *Journal of Monetary Economics*) could not reject a unit root in the *level* of 13 of 14 historical US macro series; their paper launched the unit-root literature of [[time-series/unit-roots]]. Subsequent work (Perron 1989; Rudebusch 1993; Christiano and Eichenbaum 1990) showed that the distinction between a trend break and a unit root is hard to make in samples of a few hundred observations. The debate is unresolved in the strong sense that different, statistically defensible, transformations of the same official series lead to different short-run models.

Inflation is persistent, but how persistent depends on the monetary regime. For the United Kingdom, annual CPI inflation (ONS, 2015=100) was high and persistent in the 1970s, then lower after the 1992 inflation-targeting regime and the 1997 independence of the Bank of England. A first-order autocorrelation computed on monthly inflation over a Great-Moderation window is much smaller than the same statistic over 1970–1990. South African CPI inflation (Statistics South Africa) and Brazilian IPCA inflation (IBGE) show the same qualitative pattern: persistence is a property of a sample, not an invariant of “inflation”. Modelling the whole postwar sample as one stationary AR(1) is therefore a specification choice that should be argued for, not assumed.

Financial returns, by contrast, have sample autocorrelations at daily and weekly horizons that are usually small. Fama (1965, *Journal of Business*) documented this for US equities; Cont (2001, *Quantitative Finance*) lists “absence of linear autocorrelation” among the stylised facts of asset returns, together with the *presence* of strong autocorrelation in *squared* returns — volatility clustering, the subject of [[time-series/volatility]]. Small autocorrelation of returns is not a theorem of efficient markets, and it is not a forecast of future returns. It is a sample regularity, with a source and a date, and it is compatible with both a martingale-difference model and a model with a small, hard-to-detect, predictable component ([[time-series/financial-econometrics]]).

A different kind of evidence is seasonal. India's Index of Industrial Production (MOSPI) and China's industrial value-added series (NBS) have strong within-year patterns; so do retail sales in almost every country that publishes them. A sample ACF of a seasonally unadjusted monthly series typically shows spikes at lags $12$, $24$, $36$. Those spikes are not a reason to difference at lag $1$; they are a reason to use a seasonal filter, seasonal dummies, or a seasonal ARMA term.

::: application Sample mean of a persistent series
Suppose monthly inflation is an AR(1) with $\phi = 0.8$ and innovation variance $\sigma^2$, and we estimate the mean from $T = 120$ months. The asymptotic variance of $\bar y$ is

$$
\frac{\gamma_0}{T}\sum_{k=-\infty}^{\infty}\rho_k = \frac{\sigma^2}{T(1-\phi)^2(1+\phi)}\cdot(1+\phi) = \frac{\sigma^2}{T(1-\phi)^2},
$$

which is $(1+\phi)/(1-\phi) = 9$ times the i.i.d. formula $\gamma_0/T$. A confidence interval that uses $s/\sqrt{T}$ is three times too narrow. This is one concrete cost of ignoring [[#def-weak-stat]] and [[#prop-ar1-acf]] when reporting an “average inflation rate” as if the months were a random sample.
:::

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: -1.96
b: 1.96
caption: Under the white-noise null, $\sqrt{T}\,\hat\rho_k$ is approximately standard normal ([[#prop-bartlett]]). Shade $\pm 1.96$ and compare with a sample autocorrelation multiplied by $\sqrt{T}$. For $T = 200$, the band $\pm 0.139$ used in [[#ex-wn-sim]] is exactly this interval mapped back to $\hat\rho$ scale. Drag the bounds and recall that this calibration is for one lag, not for a fishing expedition across twenty lags.
:::

## Where this leads

A weakly stationary series with a decaying ACF is the raw material of [[time-series/arma-models]]: we will match a parametric ACF (autoregressive, moving-average, or mixed) to the sample ACF and estimate the parameters. Those models produce the minimum-MSE forecasts of [[time-series/forecasting]]. When the sample ACF decays too slowly, or when $\hat\rho_1$ is close to $1$, the stationarity assumption itself is in doubt, and [[time-series/unit-roots]] takes over. Several such series may still move together; that is cointegration ([[time-series/cointegration]]). Several series modelled jointly, without first taking a stand on exogenous and endogenous, are vector autoregressions ([[time-series/var-models]]). And a series whose *levels* look like white noise but whose *squares* do not is the starting point of [[time-series/volatility]].

Throughout, the probability model is the object of interest. The sample ACF is an estimate of $\rho_k$, not a property of “the data” independent of a process. Changing the sample, the transformation or the seasonal filter changes the estimate because it changes the process being approximated.

::: history
**1926, G. Udny Yule.** In “Why do we sometimes get nonsense-correlations between time-series?”, Yule showed that two independent integrated series can display a large sample correlation. The paper is the ancestor of the spurious-regression literature.

**1927, Eugen Slutsky.** Slutsky showed that summing (moving-averaging) white noise produces cycles that look like business cycles — a warning that periodicity in a plot is not evidence of a periodic mechanism.

**1938, Herman Wold.** Wold's *A Study in the Analysis of Stationary Time Series* proved that every weakly stationary purely nondeterministic process has an infinite moving-average representation in its innovations. Linear time-series modelling has been a parametric version of that representation ever since.

**1976, George Box and Gwilym Jenkins** (second printing of the 1970 book). Their identification–estimation–checking cycle made the sample ACF and PACF the standard pictures through which applied workers look at a stationary series.
:::

::: summary
- A time series is one realisation of a stochastic process. Learning the process from one path requires stationarity (and ergodicity): means and autocovariances that do not depend on the date ([[#def-process]], [[#def-weak-stat]]).
- The ACF $\rho_k = \gamma_k/\gamma_0$ summarises linear serial dependence. For a stationary AR(1), $\rho_k = \phi^{|k|}$ with $|\phi|<1$ ([[#prop-ar1-acf]]).
- White noise is uncorrelated (not necessarily i.i.d. or Gaussian) and is the building block of linear models ([[#def-wn]], [[#prop-wn]]).
- The sample ACF $\hat\rho_k$ is consistent under summability of $\gamma_k$. Under white noise, $\sqrt{T}\,\hat\rho_k \approx \Normal(0,1)$, giving the band $\pm 1.96/\sqrt{T}$ ([[#prop-bartlett]]). The Ljung–Box $Q$ tests many lags at once ([[#def-lb]]).
- Growth rates are closer to stationarity than levels; inflation persistence depends on the monetary regime; daily returns often have small $\hat\rho_k$ but large $\widehat{\Corr}(r_t^2, r_{t-k}^2)$. These are sample regularities with sources, not theorems and not forecasts.
- A slowly decaying sample ACF is a clue that $|\phi|$ is near $1$ or that a unit root is present; that distinction is the next course of business after ARMA modelling.
:::

## Exercises

::: exercise Mean and variance of an AR(1) {level=1 check="4"}
For $Y_t = 1.2 + 0.7 Y_{t-1} + \varepsilon_t$ with $\varepsilon_t \sim \mathrm{WN}(0, 2)$, compute the unconditional mean $\mu$. (Enter $\mu$.)
::: solution
By [[#prop-ar1-acf]], $\mu = 1.2/(1-0.7) = 1.2/0.3 = 4$.
:::
:::

::: exercise AR(1) variance {level=1 check="3.922"}
In the previous exercise, $\sigma^2 = 2$ and $\phi = 0.7$. Compute $\gamma_0 = \Var(Y_t)$ to three decimals. (Enter $\gamma_0$.)
::: solution
$\gamma_0 = 2/(1-0.49) = 2/0.51 \approx 3.922$.
:::
:::

::: exercise ACF at lag 3 {level=1 check="0.343"}
If $\rho_k = 0.7^{|k|}$, what is $\rho_3$? (Enter the value to three decimals.)
::: solution
$0.7^3 = 0.343$.
:::
:::

::: exercise Bartlett band {level=1 check="0.196"}
For a sample of length $T = 100$, what is the 95% Bartlett half-width $1.96/\sqrt{T}$ under white noise, to three decimals? (Enter the half-width.)
::: solution
$1.96/\sqrt{100} = 0.196$.
:::
:::

::: exercise Which $\hat\rho_k$ reject white noise? {level=2}
A series of length $T = 200$ has $\hat\rho_1 = 0.11$, $\hat\rho_2 = -0.04$, $\hat\rho_4 = -0.18$, $\hat\rho_{12} = 0.21$. Using the pointwise 95% Bartlett band, which lags are inconsistent with white noise?
::: hint
The band is $\pm 1.96/\sqrt{200}$.
:::
::: solution
$1.96/\sqrt{200} \approx 0.139$. Then $|\hat\rho_1| = 0.11$ and $|\hat\rho_2| = 0.04$ lie inside the band; $|\hat\rho_4| = 0.18$ and $|\hat\rho_{12}| = 0.21$ lie outside. Lags $4$ and $12$ are inconsistent with the white-noise null at the 5% pointwise level. (A joint test such as Ljung–Box would be needed to control the family-wise error.)
:::
:::

::: exercise Variance of the sample mean {level=2}
Let $Y_t$ be a stationary AR(1) with $\phi = 0.5$, $\sigma^2 = 1$, $c = 0$. Compute $\Var(\bar Y)$ using the asymptotic formula $T^{-1}\sum_{k=-\infty}^{\infty}\gamma_k$, for $T = 64$. Compare it with the i.i.d. formula $\gamma_0/T$.
::: hint
$\sum_{k=-\infty}^{\infty}\rho_k = (1+\phi)/(1-\phi)$ for a stationary AR(1).
:::
::: solution
$\gamma_0 = 1/(1-0.25) = 4/3$. Then $\sum_k \gamma_k = \gamma_0(1+\phi)/(1-\phi) = (4/3)\cdot 1.5/0.5 = (4/3)\cdot 3 = 4$, so $\Var(\bar Y) \approx 4/64 = 1/16 = 0.0625$. The i.i.d. formula gives $(4/3)/64 = 1/48 \approx 0.0208$, which is smaller by the factor $(1+\phi)/(1-\phi) = 3$. Using $s/\sqrt{T}$ on this series understates the uncertainty of the mean by a factor of $\sqrt{3}$.
:::
:::

::: exercise Ljung–Box arithmetic {level=2 check="4.38"}
Suppose $T = 80$ and $\hat\rho_1 = 0.20$, $\hat\rho_2 = 0.10$, $\hat\rho_3 = -0.05$. Compute the Ljung–Box statistic $Q(3)$ to two decimals. The 5% critical value of $\chi^2_3$ is $7.81$. Does $Q(3)$ reject white noise at 5%? (Enter $Q(3)$ to two decimals.)
::: solution
$$
Q(3) = 80\cdot 82\left(\frac{0.20^2}{79} + \frac{0.10^2}{78} + \frac{(-0.05)^2}{77}\right) = 6560\left(\frac{0.04}{79} + \frac{0.01}{78} + \frac{0.0025}{77}\right).
$$

The sum in parentheses is $0.00050633 + 0.00012821 + 0.00003247 = 0.00066701$, so $Q(3) = 6560 \times 0.00066701 = 4.38$ to two decimals. This is below $7.81$, so the test does not reject white noise at 5%.
:::
:::

::: exercise A $\chi^2$ critical value {level=2 check="18.31"}
The 5% critical value of $\chi^2_{10}$ is needed for $Q(10)$ under white noise. Enter it to two decimals (the conventional tabulated value).
::: solution
The 0.95 quantile of $\chi^2_{10}$ is $18.31$ (more precisely $18.307$). Ljung–Box $Q(10)$ larger than this rejects i.i.d. noise at 5%.
:::
:::

::: exercise Demeaning and $\hat\gamma_k$ {level=3}
Show that if the sample mean is not subtracted — i.e. if one computes $T^{-1}\sum_{t=k+1}^{T} y_t y_{t-k}$ — the result estimates $\gamma_k + \mu^2$, not $\gamma_k$. Explain why this matters for a series whose mean is far from zero, such as a price *level*.
::: hint
Write $y_t = \mu + (y_t-\mu)$ and expand the product.
:::
::: solution
$y_t y_{t-k} = \bigl(\mu + (y_t-\mu)\bigr)\bigl(\mu + (y_{t-k}-\mu)\bigr) = \mu^2 + \mu(y_t-\mu) + \mu(y_{t-k}-\mu) + (y_t-\mu)(y_{t-k}-\mu)$. Averaging, the cross terms vanish in probability if $\bar y \to_p \mu$, and one is left with $\mu^2 + \gamma_k$. For a price level with $\mu$ in the hundreds, $\mu^2$ swamps $\gamma_k$ and the undemeaned “ACF” is close to $1$ at every lag. That is an artefact of a non-zero mean, not evidence of a unit root — though a unit root will *also* produce a slowly decaying ACF, for a different reason. Always demean (or detrend, if a trend is in the model) before reading a correlogram.
:::
:::

::: exercise Ergodicity of the mean for MA($\infty$) {level=3}
Let $Y_t = \sum_{j=0}^{\infty} \psi_j \varepsilon_{t-j}$ with $\varepsilon_t \sim \mathrm{WN}(0,\sigma^2)$ and $\sum_{j=0}^{\infty}|\psi_j| < \infty$. Show that $\sum_{k=-\infty}^{\infty}|\gamma_k| < \infty$, and conclude that $\Var(\bar Y) = O(T^{-1})$. (Absolute summability of $\psi$ is stronger than square-summability, and is the usual sufficient condition quoted for ARMA processes.)
::: hint
Use [[#eq-wold-gamma]] and switch the order of summation.
:::
::: solution
From [[#eq-wold-gamma]], $|\gamma_k| \le \sigma^2 \sum_{j=0}^{\infty}|\psi_j|\,|\psi_{j+k}|$. Summing over $k \ge 0$,

$$
\sum_{k=0}^{\infty}|\gamma_k| \le \sigma^2 \sum_{j=0}^{\infty}|\psi_j|\sum_{k=0}^{\infty}|\psi_{j+k}| \le \sigma^2 \Bigl(\sum_{j=0}^{\infty}|\psi_j|\Bigr)^2 < \infty.
$$

The $k<0$ half is the same because $\gamma_{-k}=\gamma_k$. Then $\Var(\bar Y) = T^{-1}\sum_{|k|<T}(1-|k|/T)\gamma_k$ is bounded by $T^{-1}\sum_k|\gamma_k| = O(T^{-1})$. Absolute summability of the MA coefficients — which holds for any causal ARMA process with AR roots outside the unit circle — is therefore enough for the sample mean to have the usual $1/T$ rate.
:::
:::

::: exercise An oscillating ACF {level=2}
A process has $\rho_k = (-0.5)^{|k|}$. Compute $\rho_1$, $\rho_2$, $\rho_3$ and sketch (in words) what the correlogram looks like. What AR(1) coefficient produces this ACF?
::: solution
$\rho_1 = -0.5$, $\rho_2 = 0.25$, $\rho_3 = -0.125$. The correlogram alternates in sign and halves in magnitude at each lag. By [[#prop-ar1-acf]] this is exactly the ACF of a stationary AR(1) with $\phi = -0.5$.
:::
:::
