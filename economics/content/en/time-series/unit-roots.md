Many macroeconomic series — the level of real GDP, a consumer-price index, a nominal exchange rate — do not look like the stationary ARMA processes of the last three chapters. They wander. The wander can be a **deterministic trend**, $\alpha + \delta t$ plus a stationary remainder, or a **stochastic trend**, a random walk (perhaps with drift) whose variance grows with $t$. The two descriptions have the same visual impression in a short sample and radically different implications for forecasting, for the validity of OLS $t$ tests, and for whether a regression of one series on another is meaningful.

Yule (1926) already knew that trending series produce “nonsense correlations”. Granger and Newbold (1974) showed how spectacular the nonsense can be; Phillips (1986) derived the limiting distributions. Dickey and Fuller (1979) gave a test of the random-walk null against a stationary alternative, with a non-standard distribution that does not resemble Student's $t$. This chapter develops those results. Simulated random walks below use fixed NumPy seeds. Historical citations are dated sample findings, not forecasts, and nothing here is investment or policy advice.

## Two kinds of trend

::: definition Deterministic and stochastic trends {#def-trends}
A process has a **deterministic trend** (is trend-stationary) if

$$
Y_t = \alpha + \delta t + U_t
$$

with $\{U_t\}$ weakly stationary. It has a **stochastic trend** (is difference-stationary, or integrated of order one, $I(1)$) if

$$
Y_t = c + Y_{t-1} + \varepsilon_t, \qquad \varepsilon_t \sim \mathrm{WN}(0,\sigma^2),
$$ {#eq-rw}

so that $\Delta Y_t$ is weakly stationary. If $c = 0$ and $Y_0 = 0$, [[#eq-rw]] is a **random walk** and $\Var(Y_t) = t\sigma^2$. If $c \neq 0$ it is a **random walk with drift**. A stationary process is $I(0)$. A process that must be differenced $d$ times to obtain an $I(0)$ series is $I(d)$.
:::

The two models are not small perturbations of each other. Under a deterministic trend, $Y_t - \alpha - \delta t$ has a forecast MSE that levels off, and a shock $\varepsilon_t$ has a temporary effect. Under a stochastic trend, the $h$-step forecast of the level is $Y_t + c h$, the MSE is $\sigma^2 h$ (plus the contribution of estimating $c$), and a shock has a permanent effect: $\partial Y_{t+h}/\partial\varepsilon_t = 1$ for every $h$.

::: proposition Random-walk moments {#prop-rw}
Let $Y_t = Y_{t-1} + \varepsilon_t$ with $Y_0 = 0$ and $\varepsilon_t \sim \mathrm{WN}(0,\sigma^2)$. Then $\E[Y_t] = 0$, $\Var(Y_t) = t\sigma^2$, and $\Corr(Y_t, Y_{t-k}) = \sqrt{(t-k)/t}$ for $k < t$. In particular the correlation between $Y_t$ and $Y_{t-1}$ tends to $1$ as $t$ grows, and the sample ACF of a long random walk decays very slowly.
:::

::: proof
$Y_t = \sum_{s=1}^{t}\varepsilon_s$, so the mean is zero and the variance is $t\sigma^2$ by orthogonality. The covariance $\Cov(Y_t, Y_{t-k}) = \Var(Y_{t-k}) = (t-k)\sigma^2$, and dividing by the standard deviations gives the correlation. For large $t$ and fixed $k$ this is $\sqrt{1-k/t} \approx 1 - k/(2t)$, which is close to $1$ even at lags that would be negligible for a stationary AR(1).
:::

::: example Variance of a random walk {#ex-rw-var}
A random walk is simulated for $T = 100$ steps from $\varepsilon_t \iid \Normal(0,1)$, seed $23$, starting at $0$. The last value is $11.07$ and the sample mean is $3.02$. Is $11.07$ an unusual terminal value? What would the corresponding standard deviation be at $T = 400$?
::: solution
$\Var(Y_{100}) = 100$, so the standard deviation is $10$. A terminal value of $11.07$ is $1.11$ standard deviations above zero — unremarkable. At $T = 400$ the standard deviation is $20$: quadrupling the sample *doubles* the typical size of $Y_T$. A stationary AR(1) with $\phi = 0.7$ has $\Var(Y_t) \to 1.96$ regardless of $T$. That is the operational difference between [[#def-trends]]'s two cases, and it is not visible from a single plot of length $100$.
:::
:::

::: widget plot
f: sigma*sqrt(x); sigma*sqrt(x)*1.96; -sigma*sqrt(x)*1.96
sliders: sigma=1:0.5:2:0.1
x: 1, 200
y: -30, 30
labels: \sqrt{t}\,\sigma; 1.96\sqrt{t}\,\sigma; -1.96\sqrt{t}\,\sigma
caption: Standard deviation of a random walk $Y_t = \sum_{s=1}^{t}\varepsilon_s$ as a function of $t$, with a pointwise 95% band under Gaussian innovations. Stretch $t$ and the band keeps widening. A trend-stationary series, by contrast, would have a band of constant width around $\alpha+\delta t$.
:::

A third, visually similar, process is a **broken trend**: $Y_t = \alpha + \delta t + \gamma\,1_{t>t_0}(t-t_0) + U_t$. Perron (1989, *Econometrica*) showed that a conventional Dickey–Fuller test has essentially no power against this alternative when $t_0$ is in the sample — the 1929 crash in Nelson and Plosser's US series was his example. Distinguishing a broken trend from a unit root is a genuine identification problem, not a solved diagnostic.

## Spurious regression

Regressing one $I(1)$ series on another, unrelated, $I(1)$ series is the most famous trap in applied time-series work.

::: theorem Spurious regression {#thm-spurious}
Let $X_t$ and $Y_t$ be independent random walks, $X_t = X_{t-1}+\eta_t$, $Y_t = Y_{t-1}+\varepsilon_t$, with $(\eta_t, \varepsilon_t)$ i.i.d. and independent across equations, and consider the OLS regression $Y_t = \hat a + \hat b X_t + \hat u_t$ on a sample of length $T$. Then, as $T\to\infty$:

- $\hat b$ converges not to $0$ but to a non-degenerate random variable;
- the $t$-statistic for $H_0{:}\, b = 0$ **diverges** (rejects with probability tending to $1$);
- $R^2$ converges to a non-degenerate random variable in $(0,1)$, not to $0$;
- the Durbin–Watson statistic $\mathrm{DW}\to_p 0$.

The same qualitative conclusions hold with independent random walks with drift, and with independent $I(1)$ processes more generally (Phillips 1986).
:::

The proof uses functional central limit theorems (the partial-sum process of $\varepsilon$ converges to Brownian motion) and continuous-mapping arguments; Hamilton (1994, ch. 18) is the standard derivation. The message for applied work does not depend on the derivation: a large $t$-statistic and a respectable $R^2$ in a regression of one trending series on another are **not** evidence of a relationship. The giveaway in the output is a tiny Durbin–Watson statistic — residuals that are themselves close to a random walk.

::: example Two independent random walks, seed 21 {#ex-spurious}
Two independent Gaussian random walks of length $T = 100$ were drawn with seed $21$. OLS of $y$ on a constant and $x$ produces

$$
\hat a = -7.50\ (0.45),\qquad \hat b = -0.258\ (0.083),\qquad t_b = -3.11, \qquad R^2 = 0.090, \qquad \mathrm{DW} = 0.060.
$$

The sample correlation is $-0.30$. The same regression in **differences** produces $\hat b = -0.028$ ($t = -0.32$), $R^2 = 0.001$, $\mathrm{DW} = 1.94$. Interpret the two outputs.
::: solution
In levels, a $t$-statistic of $-3.11$ would be a 1% rejection of $b = 0$ by ordinary critical values, and one might talk about a “significant negative relationship”. There is no relationship: the series were drawn independently. The Durbin–Watson statistic $0.06$ is the red flag that [[#thm-spurious]] predicts. (With $T = 100$ the $R^2$ is only $0.09$ — spurious $R^2$s of $0.5$ and above are common in longer samples and with drift.) In differences both series are approximately white noise, OLS is the usual regression, $t = -0.32$ does not reject, $R^2$ is zero, and DW is near $2$. Differencing restored a regression to which [[econometrics/inference]] applies. (Differencing also *destroys* a genuine levels relationship if one is present; that is the cointegration problem of the next chapter.)
:::
:::

::: widget regression
points: -0.05,0.95; -0.66,0.03; 1.42,-4.36; -5.50,-8.97; -2.18,-13.84; -0.59,-11.62; 0.57,-10.64; 0.14,-4.16; 2.85,-7.21; 3.59,-5.23; 10.92,-11.37; 11.69,-12.08; 10.75,-12.13
degree: 1
residuals: true
x: -8, 14
y: -16, 4
caption: A thinned scatter of the two independent random walks in [[#ex-spurious]]. OLS draws a negatively sloped line and the residuals are hugely persistent (they are nearly a random walk themselves). Drag a late, large-$x$ point and watch the slope swing: the “relationship” is an artefact of two wandering levels. In a genuine cointegrating relation the scatter would hug a line and the residuals would look stationary.
:::

::: warning A significant $t$ on trending variables is not a finding
Software will happily print stars next to $\hat b$ in a levels regression of $I(1)$ on $I(1)$. The stars use $\Normal(0,1)$ or $t_{T-2}$ critical values, which are the wrong ones under [[#thm-spurious]]. A DW below $0.5$, or a residual ACF that looks like [[time-series/stationarity#prop-ar1-acf]] with $\phi \approx 1$, is a reason to stop, not a reason to “correct for serial correlation” with Newey–West and keep the stars.
:::

## Dickey–Fuller tests

The AR(1) $Y_t = c + \phi Y_{t-1} + \varepsilon_t$ has a unit root when $\phi = 1$. Rearranged,

$$
\Delta Y_t = c + \rho Y_{t-1} + \varepsilon_t, \qquad \rho = \phi - 1,
$$ {#eq-df}

so the null of a unit root is $H_0{:}\,\rho = 0$ against $H_1{:}\,\rho < 0$ (stationary). The OLS $t$-statistic on $\rho$ does **not** have a Student-$t$ limiting distribution under $H_0$.

::: definition Dickey–Fuller statistics {#def-df}
The **Dickey–Fuller** (DF) $t$-statistic is the OLS $t$-ratio for $\rho$ in one of three regressions:

1. no constant: $\Delta Y_t = \rho Y_{t-1} + \varepsilon_t$ (appropriate if the series is a zero-mean random walk under $H_0$);
2. constant: $\Delta Y_t = a + \rho Y_{t-1} + \varepsilon_t$ (random walk, possibly with non-zero mean under $H_1$);
3. constant and trend: $\Delta Y_t = a + b t + \rho Y_{t-1} + \varepsilon_t$ (random walk with drift under $H_0$, trend-stationary under $H_1$).

The **augmented** Dickey–Fuller (ADF) regression adds lags of $\Delta Y_t$ to soak up serial correlation in $\varepsilon_t$:

$$
\Delta Y_t = a + [b t] + \rho Y_{t-1} + \sum_{j=1}^{p} \gamma_j \Delta Y_{t-j} + e_t.
$$ {#eq-adf}

The statistic is still the $t$-ratio on $\rho$. Under $H_0$ and with $p$ large enough that $e_t$ is approximately white noise, ADF and DF have the same limiting distribution, tabulated by Dickey and Fuller (1979) and to higher precision by MacKinnon (1991, 2010). Asymptotic 5% critical values are approximately $-1.95$ (no constant), $-2.86$ (constant), $-3.41$ (constant and trend). Rejection is in the **left** tail.
:::

The critical values are more negative than $-1.65$ or $-1.96$ because a stationary-looking finite-sample random walk is common: $\hat\rho$ is biased downwards under $H_0$, and the $t$-ratio has a skewed distribution. Using a $t_{T-2}$ 5% critical value of about $-1.66$ (one-sided) over-rejects the unit-root null badly.

::: proposition DF limit (outline) {#prop-df-limit}
If $Y_t$ is a random walk with $\varepsilon_t$ i.i.d. $(0,\sigma^2)$ and finite variance, then the DF $t$-statistic in the no-constant regression satisfies

$$
t_{\rho} \ \to_d\  \frac{\int_0^1 W\,dW}{\bigl(\int_0^1 W^2\bigr)^{1/2}} = \frac{\tfrac12\bigl(W(1)^2-1\bigr)}{\bigl(\int_0^1 W^2\bigr)^{1/2}},
$$

where $W$ is a standard Brownian motion on $[0,1]$. The constant and constant-and-trend statistics have analogous limits, with $W$ replaced by a demeaned or detrended Brownian motion. The limits do not depend on $\sigma^2$.
:::

::: proof
Divide the OLS formulae by the appropriate powers of $T$. Under $H_0$, $T^{-1/2} Y_{\lfloor rT\rfloor} \Rightarrow \sigma W(r)$ (Donsker's theorem). The numerator of $\hat\rho$ is $T^{-1}\sum Y_{t-1}\Delta Y_t \Rightarrow \sigma^2\int W\,dW$, and the denominator $T^{-2}\sum Y_{t-1}^2 \Rightarrow \sigma^2\int W^2$. The $t$-ratio is their quotient, up to a consistent estimator of $\sigma$. Itô's formula gives $\int W\,dW = \tfrac12(W(1)^2-1)$. Full proofs are in Phillips (1987) and Hamilton (1994, ch. 17).
:::

::: example DF on a random walk, seed 23 {#ex-df-rw}
On the seed-$23$ random walk of length $100$, the three DF $t$-statistics (no extra lags) are

| specification | $\hat\rho$ | $t_{\rho}$ | 5% critical | reject at 5%? |
|---|---|---|---|---|
| no constant | $0.006$ | $0.33$ | $-1.95$ | no |
| constant | $-0.008$ | $-0.37$ | $-2.89$ | no |
| constant and trend | $-0.120$ | $-2.68$ | $-3.50$ | no |

(The finite-$T$ MacKinnon critical values for $T = 100$ are a little more negative than the asymptotic $-2.86$ and $-3.41$.) Does the test behave?
::: solution
None of the three statistics comes close to its left-tail critical value. That is the correct decision: the DGP is a random walk. The no-constant $\hat\rho$ is slightly *positive*, which happens often in short random walks that have drifted away from zero (here $Y_T = 11.07$). The trend specification, which is over-specified for this DGP, has a more negative $t$ but still does not reject. Over-specifying the deterministic terms costs power; under-specifying them (testing a drifting walk in the no-constant regression) costs size. The practical default for a macro *level* that has grown is specification 3; for a possibly non-zero-mean series without a trend, specification 2.
:::
:::

::: example DF on a stationary AR(1), seed 29 {#ex-df-stat}
An AR(1) $Y_t = 0.7 Y_{t-1}+\varepsilon_t$, $\varepsilon_t\iid\Normal(0,1)$, seed $29$, $T = 200$, is tested in the constant specification. OLS on [[#eq-df]] gives $\hat a = 0.006$, $\hat\rho = -0.371$ (implied $\hat\phi = 0.629$), $t_{\rho} = -6.67$. The 5% critical value is about $-2.88$.
::: solution
$-6.67$ is far to the left of $-2.88$, so the test correctly rejects the unit-root null. The implied $\hat\phi = 1+\hat\rho = 0.629$ is $1.3$ standard errors below the true $0.7$ (the DF regression standard error on $\rho$ is $0.056$), a downward bias that is the finite-sample companion of the bias under $H_0$. Power against $\phi = 0.7$ at $T = 200$ is high; power against $\phi = 0.95$ at $T = 100$ is not, which is why “failure to reject a unit root” is not the same statement as “the series is $I(1)$”.
:::
:::

::: quiz
A quarterly log real-GDP series of length $T = 120$ is tested by ADF with a constant and a trend. The $t$-statistic on $\rho$ is $-2.40$. The 5% MacKinnon critical value is $-3.45$. Which report is accurate?
- [ ] GDP is stationary around a trend, because $-2.40 < 0$
- [ ] GDP has a unit root, because we failed to reject
- [x] We fail to reject a unit root at 5%; the test has limited power against a very persistent trend-stationary alternative, so both descriptions remain open
- [ ] We should re-run the test with ordinary $t$ critical values, which would reject
::: solution
Failure to reject is not acceptance. ADF against a root of $0.95$ in a sample of $120$ is known to have modest power (Cochrane 1991; Blough 1992). Ordinary $t$ critical values are the wrong ones and would over-reject $H_0$. The accurate report is the third: the test does not settle the question at this sample size.
:::
:::

::: widget distribution
dist: t
params: nu=8
a: -1.86
b: 1.86
caption: Student's $t$ with $8$ degrees of freedom, the sort of reference distribution OLS software will use if you ask for a $t$ test of $\rho = 0$ and it treats the regression as [[econometrics/inference]]. The Dickey–Fuller 5% critical value in the constant specification is near $-2.86$, well to the left of $-1.86$. Using this widget's tails to “reject a unit root” is the mistake [[#def-df]] exists to prevent. Switch to a normal ($\nu\to\infty$) and notice that the problem does not go away: the DF distribution is not $\Normal(0,1)$ either.
:::

The **Phillips–Perron** (1988) test uses the same DF regression without lagged differences, and corrects the $t$-ratio non-parametrically for serial correlation and heteroskedasticity in $\varepsilon_t$ (a Newey–West long-run variance). The **KPSS** test (Kwiatkowski, Phillips, Schmidt and Shin 1992) reverses the null: $H_0$ is stationarity (around a mean or a trend), and the statistic is a LM test for a random-walk component. ADF/PP and KPSS together are often reported as a pair: reject ADF and fail to reject KPSS, and stationarity is the more comfortable description; the opposite pair supports $I(1)$. Conflicting pairs (both reject, or neither) are common and should be reported as conflicting, not resolved by picking the more convenient test.

Lag length in the ADF regression is not a detail. Too few lags: serial correlation remains in $e_t$ and the test is mis-sized. Too many: power falls. Information criteria (Ng and Perron 2001) or a general-to-specific $t$ test on the last lag are the usual rules. Seasonal series need seasonal lags; a single $\Delta Y_{t-1}$ will not soak up a lag-$12$ MA.

## Evidence

Nelson and Plosser (1982) applied DF tests to 14 historical US macro series and failed to reject a unit root in 13 of them (the exception was the unemployment rate). The paper redirected applied macro from trend-stationary ARMA around a linear trend to difference-stationary models. Perron (1989) argued that a single break in 1929 could explain the findings for several of the same series. Subsequent panels (Levin, Lin and Chu 2002; Im, Pesaran and Shin 2003) and tests allowing multiple breaks (Bai and Perron 1998, as a related technology) have not produced a consensus for “all macro levels are $I(1)$” or the reverse.

For inflation, the right specification has changed with the monetary regime. US quarterly inflation is closer to $I(0)$ in the Great Moderation than in 1965–1984; Brazilian IPCA inflation (IBGE) and Israeli inflation over the 1980s look $I(1)$ or explosive in short windows and $I(0)$ after stabilisation. An ADF test on a pooled postwar sample answers a question nobody asked.

Real exchange rates are the other classic battleground. Purchasing-power-parity implies that the real rate is $I(0)$; ADF tests on 20–30 years of monthly rates typically fail to reject a unit root, while century-long spans (Taylor 2002) and panels of countries (Frankel and Rose 1996) are more favourable to stationarity. The issue is power at the relevant persistence, not a contradiction in the arithmetic.

None of these findings is a forecast of GDP, inflation or an exchange rate, and none is a reason to take a position in any market.

::: application Forecasting under the two models
Under trend-stationarity, the $h$-step forecast of $Y_{t+h}$ returns to $\alpha + \delta(t+h)$ with MSE that levels off. Under a random walk with drift, the forecast is $Y_t + c h$ and the MSE is $\sigma^2 h$. At a horizon of 40 quarters the two intervals, fitted to the same postwar GDP sample, barely overlap in width. Cochrane (1988, *Journal of Political Economy*) measured how much of a GDP shock remains after $h$ years by the ratio of long-horizon to short-horizon variances; values near $1$ support a dominant stochastic trend, values near $0$ a transitory one. For US real GNP he estimated a remainder well below $1$ but well above $0$. The number is a sample description of 1869–1986, not a law of output.
:::

## Where this leads

If two or more $I(1)$ series are each random walks but a linear combination is $I(0)$, they are **cointegrated**: the levels regression is then not spurious, and an error-correction model describes the short run. That is [[time-series/cointegration]]. A VAR in levels of $I(1)$ series is still a legitimate reduced form, but its impulse responses at long horizons are imprecisely estimated and its Granger tests have non-standard distributions unless cointegration is handled; [[time-series/var-models]] returns to this. In finance, log prices are the leading $I(1)$ suspects and returns the leading $I(0)$ suspects; whether log *dividends* and log prices cointegrate is an empirical question for [[time-series/financial-econometrics]].

::: history
**1926, G. Udny Yule.** “Nonsense correlations” between trending series: the first clear warning.

**1974, Clive Granger and Paul Newbold.** Monte Carlo experiments showed that independent random walks routinely produce $t$-statistics above $2$ and low Durbin–Watson statistics.

**1979, David Dickey and Wayne Fuller.** The non-standard distribution of the AR coefficient under a unit root, with tabulated critical values.

**1982, Charles Nelson and Charles Plosser.** DF tests on historical US macro series; the empirical unit-root literature begins.

**1986, Peter Phillips.** Asymptotic theory of spurious regression, using Brownian-motion limits.

**1988, Peter Phillips and Pierre Perron; 1989, Pierre Perron; 1992, Kwiatkowski, Phillips, Schmidt and Shin.** Semiparametric unit-root tests, the broken-trend critique, and a stationarity null.
:::

::: summary
- Trend-stationary series revert to a line $\alpha+\delta t$; $I(1)$ series have a stochastic trend whose forecast MSE grows with the horizon ([[#def-trends]], [[#prop-rw]]).
- OLS of one independent $I(1)$ series on another is spurious: $t$ diverges, $R^2$ does not vanish, DW tends to $0$ ([[#thm-spurious]]). Differencing restores standard inference but destroys a levels relationship if one exists.
- The DF/ADF $t$-statistic for $H_0{:}\,\rho = 0$ has a Brownian-motion limit, not a $t$ limit. Use MacKinnon critical values and reject only in the left tail ([[#def-df]], [[#prop-df-limit]]).
- Failure to reject is not proof of a unit root. Power against $\phi = 0.95$ is low in typical macro samples. KPSS reverses the null; breaks in trend (Perron) mimic unit roots.
- Specification of deterministic terms (constant, trend) is part of the hypothesis, not a cosmetic option.
:::

## Exercises

::: exercise Random-walk variance {level=1 check="25"}
If $Y_t$ is a Gaussian random walk with $\sigma^2 = 1$ and $Y_0 = 0$, what is $\Var(Y_{25})$? (Enter the variance.)
::: solution
$\Var(Y_t) = t\sigma^2 = 25$.
:::
:::

::: exercise Random-walk correlation {level=1 check="0.8"}
In the same setting, compute $\Corr(Y_{25}, Y_{16})$. (Enter the correlation as a decimal.)
::: solution
$\Corr(Y_t, Y_{t-k}) = \sqrt{(t-k)/t} = \sqrt{16/25} = 0.8$.
:::
:::

::: exercise DF decision {level=1}
An ADF $t$-statistic (constant only) equals $-2.10$. The 5% critical value is $-2.86$ and the 10% value is $-2.57$. Do you reject a unit root at 5%? At 10%?
::: solution
The test rejects for $t_{\rho}$ *more negative* than the critical value. $-2.10$ is to the right of both $-2.86$ and $-2.57$, so we fail to reject at 5% and at 10%.
:::
:::

::: exercise Implied $\phi$ {level=2 check="0.92"}
In the ADF regression with a constant, $\hat\rho = -0.08$. What is the implied $\hat\phi$? (Enter $\hat\phi$.)
::: solution
$\hat\phi = 1 + \hat\rho = 0.92$.
:::
:::

::: exercise Spurious DW {level=2}
A levels regression of two macro series produces $R^2 = 0.71$, $t_b = 8.4$ and $\mathrm{DW} = 0.22$. What should you do before claiming a relationship, and why does the DW number matter?
::: solution
Test each series for a unit root, and inspect the residual ACF. DW $= 0.22$ implies residual first autocorrelation $\approx 1 - \mathrm{DW}/2 = 0.89$, so the residuals are themselves highly persistent — the signature of [[#thm-spurious]]. Newey–West standard errors do not restore the $t$ statistic to a $\Normal(0,1)$ limit in this experiment. Either difference both series (if they are not cointegrated) or test for cointegration (next chapter).
:::
:::

::: exercise Which DF specification? {level=2}
You have quarterly log CPI, which has risen from $4.0$ to $5.2$ over $T = 160$ quarters (logs of an index). Which of the three DF specifications in [[#def-df]] matches the alternative “CPI is stationary around a linear trend”, and what is the null in that specification?
::: solution
Specification 3 (constant and trend). The alternative is trend-stationarity of log CPI; the null is a random walk with drift (so that the drift can generate the same average growth as the trend under $H_1$). Specifications 1 and 2 omit the trend and will tend to fail to reject even if log CPI is trend-stationary, because the omitted trend is absorbed into a unit-root-like wander.
:::
:::

::: exercise Power versus size {level=2}
Explain, in a paragraph, why “the ADF test did not reject, therefore the series has a unit root” is a mistake, referring to $\phi = 0.95$ and $T = 80$.
::: solution
ADF is a test of $H_0{:}\,\phi = 1$ against $\phi < 1$. Not rejecting means the data are compatible with $\phi = 1$ at the chosen size; they are also compatible with $\phi = 0.95$, because a sample of $80$ observations from an AR(1) with $\phi = 0.95$ produces sample paths and DF statistics that overlap heavily with those from a random walk (the two models' forecast functions are close for $h \ll 1/(1-\phi) = 20$). Low power is a property of the experiment, not a finding about the series. Reporting the statistic, the specification, the critical value and the sample period is the honest alternative to a binary verdict.
:::
:::

::: exercise Functional CLT arithmetic {level=3}
For a random walk with $\sigma = 1$, $T^{-1}\sum_{t=1}^{T} Y_{t-1}\Delta Y_t$ converges in distribution to $\int_0^1 W\,dW = \tfrac12(W(1)^2-1)$. What are the mean and variance of this limiting random variable? (Use $\E[W(1)^2] = 1$ and $\E[W(1)^4] = 3$.)
::: hint
$W(1)\sim\Normal(0,1)$.
:::
::: solution
$\E[\tfrac12(W(1)^2-1)] = \tfrac12(1-1) = 0$. $\Var\bigl(\tfrac12(W(1)^2-1)\bigr) = \tfrac14\Var(W(1)^2) = \tfrac14\bigl(\E[W(1)^4]-1\bigr) = \tfrac14(3-1) = 1/2$. The numerator of the DF coefficient, suitably scaled, is centred at zero but is not Gaussian (it is an affine transform of a $\chi^2_1$). That is one source of the skewness of the DF distribution.
:::
:::

::: exercise KPSS versus ADF {level=3}
A series yields ADF $t_{\rho} = -1.8$ (constant, 5% critical $-2.89$) and a KPSS statistic of $0.15$ (constant, 5% critical $0.463$; KPSS rejects for *large* values). How would you describe the series, and what additional check would you run?
::: solution
ADF fails to reject a unit root; KPSS fails to reject stationarity. The pair is uninformative: the sample is compatible with both nulls, which is typical when persistence is high and $T$ is moderate. Additional checks: look at the sample ACF of the levels and of the differences; try ADF with a trend; split the sample for a possible break (Perron); report confidence intervals for $\phi$ (Stock 1991) rather than a yes/no. Do not pick the test that matches a preferred story.
:::
:::

::: exercise Drift and the no-constant test {level=2}
A random walk *with drift* $Y_t = 0.2 + Y_{t-1}+\varepsilon_t$ is tested by DF *without* a constant. Why is the test inconsistent (why will it reject $H_0$ as $T\to\infty$ even though there is a unit root)?
::: hint
Under the DGP, $Y_t \approx 0.2\, t$.
:::
::: solution
$Y_t = 0.2 t + $ a random walk, so $Y_t$ is dominated by the linear drift. In the no-constant regression $\Delta Y_t = \rho Y_{t-1}+\varepsilon_t$, the omitted drift makes $Y_{t-1}$ look like a trend and $\Delta Y_t$ like a non-zero mean. The OLS $\hat\rho$ behaves like the coefficient from regressing a constant on a trend, which is of order $T^{-1}$ *and* produces a $t$-statistic that diverges to $-\infty$. The test rejects a unit root that is there. This is why the no-constant specification is reserved for series that are plausibly zero-mean under both null and alternative.
:::
:::
