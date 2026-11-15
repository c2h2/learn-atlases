Asset-pricing theory — the CAPM, multifactor models, the stochastic discount factor — makes **testable restrictions** on moments of returns. The CAPM says that a regression of an asset's excess return on the market's excess return has intercept zero. A factor model says the same of a multivariate intercept. Hansen's GMM says that a set of pricing errors, averaged, is zero. This chapter treats those claims as **econometrics**: which regression, which standard error, which finite-sample trap. It does not treat them as a reason to buy, sell, or hold any security. Illustrative numbers are simulated with fixed seeds, or are published empirical findings with a source and a date. None is a forecast of a return, and none is investment or financial advice. For the theory being tested, see [[asset-pricing/capm]], [[asset-pricing/factor-models]] and [[asset-pricing/stochastic-discount-factor]].

Two time-series facts from earlier chapters sit underneath every test. Returns at daily and weekly horizons are close to uncorrelated in *levels* but clustered in *squares* ([[time-series/volatility]]). Predictors used in return regressions — dividend-price ratios, yield spreads — are often highly persistent, which makes OLS $t$ statistics the wrong ones in small samples (Stambaugh 1999). Both facts are reasons to be careful with software defaults, not reasons to “trade the residual”.

## Time-series tests of the CAPM

Let $R_{i,t}$ be the excess return on asset $i$ and $R_{m,t}$ the excess return on a stated market proxy. The CAPM regression is

$$
R_{i,t} = \alpha_i + \beta_i R_{m,t} + e_{i,t}.
$$ {#eq-capm}

::: definition Time-series intercept test {#def-alpha}
Under the CAPM, if $R_{m,t}$ is the excess return on the mean-variance-efficient portfolio of risky assets, $\alpha_i = 0$ for every $i$. The OLS $t$-statistic $t_{\hat\alpha_i} = \hat\alpha_i / \widehat{\mathrm{se}}(\hat\alpha_i)$ is the **time-series intercept test** for asset $i$. In a system of $N$ assets, the **GRS statistic** (Gibbons, Ross and Shanken 1989) tests $H_0{:}\,\alpha = 0$ jointly,

$$
\mathrm{GRS} = \frac{T-N-1}{N}\frac{\hat\alpha\T\hat\Sigma^{-1}\hat\alpha}{1+\bar R_m^2/\hat\sigma_m^2},
$$

and is compared with $F_{N, T-N-1}$ under Gaussian i.i.d. $e_{i,t}$. Large GRS rejects the joint intercept restriction.
:::

Rejection is a rejection of a *joint* hypothesis: the CAPM *and* the stated market proxy *and* the maintained error law. It is not a discovery of a profitable trading rule. An estimated $\hat\alpha_i > 0$ in a sample is a pricing error in that sample; after costs, after a different proxy, after a later sample, the number moves. Jensen (1968) introduced $\alpha$ as a performance statistic for mutual funds; the same arithmetic is an econometric restriction, not a ranking of funds to buy.

::: proposition OLS in [[#eq-capm]] {#prop-capm-ols}
If $e_{i,t}$ is a martingale difference with finite variance, uncorrelated with $R_{m,t}$, then OLS $(\hat\alpha_i, \hat\beta_i)$ is consistent and $\sqrt{T}$-asymptotically normal. Heteroskedasticity (including GARCH) and serial correlation in $e_{i,t}$ do not bias OLS but they invalidate conventional standard errors; HAC or GARCH-based standard errors restore the [hypothesis test](/a/maths/lesson.php?c=statistics&l=hypothesis-testing). If $e_{i,t}$ is correlated with $R_{m,t}$ — a measurement-error or omitted-factor problem — $\hat\beta_i$ is inconsistent and the intercept test is not a test of the CAPM.
:::

::: proof
This is the standard OLS argument of [[econometrics/simple-regression]] with a time-series twist: replace independence by a martingale-difference CLT for $x_t e_t$ where $x_t = (1, R_{m,t})$. Consistency of $\hat\beta$ needs $\E[R_{m,t} e_{i,t}] = 0$, which is part of the CAPM's projection interpretation. Sandwich standard errors are the formula of White (1980) or Newey–West (1987).
:::

::: example A simulated CAPM regression, seed 47 {#ex-capm}
$T = 180$ observations were drawn from $R_{i,t} = 0.001 + 1.2 R_{m,t} + e_{t}$ with $R_{m,t}\iid\Normal(0.008, 0.045^2)$ and $e_t\iid\Normal(0, 0.03^2)$, seed $47$. OLS produces

$$
\hat\alpha = 0.00152\ (0.00219),\qquad \hat\beta = 1.218\ (0.046),\qquad t_{\hat\alpha} = 0.69,\qquad t_{\hat\beta} = 26.5,\qquad R^2 = 0.80.
$$

The two-sided $p$-value for $H_0{:}\,\alpha = 0$ is $0.49$; for $H_0{:}\,\beta = 1$ it is essentially $0$. Sample means are $\bar R_i = 0.0142$ and $\bar R_m = 0.0104$.
::: solution
The intercept is within $0.3$ standard errors of both $0$ and the true $0.001$; we do not reject $\alpha = 0$ at any conventional level, which is the right decision for a true $\alpha$ of $0.001$ on $T = 180$ with this noise. $\hat\beta$ is within $0.4$ se of $1.2$ and far from $1$. $R^2 = 0.80$ matches $1 - 0.03^2 / \Var(R_i)$, with $\Var(R_i) \approx 1.2^2\times 0.045^2 + 0.03^2 = 0.00381$ and $0.03^2/0.00381 \approx 0.24$. The numbers describe a simulated process. They are not an estimated premium on any real security, and $\hat\alpha > 0$ is not a recommendation to hold the asset.
:::
:::

::: widget regression
points: -0.030,-0.028; -0.034,-0.040; -0.031,-0.047; 0.010,0.020; -0.040,-0.048; -0.078,-0.091; -0.010,-0.061; 0.002,0.013; 0.052,0.079; 0.003,-0.023; 0.057,0.067; -0.068,-0.125; -0.001,0.040; 0.018,0.027; -0.006,0.020
degree: 1
residuals: true
x: -0.10, 0.08
y: -0.15, 0.10
caption: Thinned scatter of the simulated CAPM regression in [[#ex-capm]], excess return of the asset against the market proxy. The OLS slope is $\hat\beta$; the intercept is $\hat\alpha$. Drag a point and watch $\hat\alpha$ move: at $T = 15$ visible points the intercept is unidentified noise. The full $T = 180$ estimate $t_{\hat\alpha} = 0.69$ does not reject zero. This is a picture of a test, not a security-market line to invest along.
:::

The **Roll critique** (1977) is identification, not statistics: the CAPM is a statement about the *wealth* portfolio, which is not the CRSP value-weighted index. A rejection with a proxy is a rejection of the proxy-efficiency of that index, which is what [[#def-alpha]] actually tests. An acceptance can be a quiet proxy.

## The cross-section and Fama–MacBeth

A second, equivalent under some conditions, way to test a factor model is to ask whether average returns line up with betas.

::: definition Fama–MacBeth two-pass {#def-fm}
**Pass 1.** For each asset $i = 1,\ldots,N$, estimate $\hat\beta_i$ from a time-series regression of $R_{i,t}$ on a constant and the factor (or factors) $f_t$.

**Pass 2.** For each date $t$, run the **cross-sectional** regression $R_{i,t} = \lambda_{0t} + \lambda_{1t}\hat\beta_i + u_{i,t}$. The **Fama–MacBeth** estimator of the factor premium is $\hat\lambda_1 = T^{-1}\sum_t \hat\lambda_{1t}$, with standard error $T^{-1/2}$ times the sample standard deviation of $\hat\lambda_{1t}$ (Fama and MacBeth 1973). A test of the CAPM intercept restriction in the cross-section is a test of $\lambda_0 = 0$ by the same averaging.

Shanken (1992) corrects the Pass-2 standard errors for the fact that $\hat\beta_i$ is estimated. Without the correction, se$(\hat\lambda)$ is too small.
:::

Fama and French (1993, *Journal of Financial Economics*) added size and book-to-market factors to the market, turning [[#eq-capm]] into a three-factor time-series regression and [[#def-fm]] into a three-$\beta$ cross-section. The empirical finding — a slope on the market $\beta$ that is too flat, and slopes on size and value that are not zero, in US samples of the 1963–1990 kind — is a dated, sourced regularity. It has been revisited on later samples, other countries, and after publication (a multiple-testing concern; Harvey, Liu and Zhu 2016). It is not a recipe for a “value portfolio”.

::: example A two-pass illustration, seed 59 {#ex-fm}
$N = 10$ assets and $T = 120$ periods were drawn from $R_{i,t} = \beta_i f_t + e_{i,t}$ with true $\beta_i$ equally spaced from $0.4$ to $1.6$, $f_t\iid\Normal(0.006, 0.04^2)$ and $e_{i,t}\iid\Normal(0, 0.03^2)$, seed $59$ — so the true intercepts are zero and the true premium is $\E[f_t] = 0.006$. Pass-1 betas range from $0.30$ to $1.77$. Pass 2, run on *average* returns (a collapsed Fama–MacBeth), gives

$$
\hat\lambda_0 = 0.00284\ (0.00118),\qquad \hat\lambda_1 = 0.00470\ (0.00109),\qquad R^2 = 0.70.
$$

(The standard errors here are OLS on $N = 10$ averages; they are *not* Fama–MacBeth standard errors, and they ignore Shanken's correction.)
::: solution
$\hat\lambda_1 = 0.0047$ is in the same neighbourhood as the true $0.006$; with $N = 10$ and noisy $\hat\beta_i$, a discrepancy of $0.0013$ is unsurprising. $\hat\lambda_0$ is small but the naive OLS $t = 2.40$ would “reject” $\lambda_0 = 0$ — which is the wrong conclusion, and a reason Shanken's correction and a proper FM covariance exist. The time-series alphas (not tabulated) have mean $0.0015$ and mean $|t_{\hat\alpha}| = 0.62$, consistent with true zeros. The exercise is a picture of two-pass arithmetic on a simulated factor model, not an estimated premium.
:::
:::

::: warning Estimated $\beta$ on the right-hand side
Pass 2 regresses returns on $\hat\beta$, not on $\beta$. That is classical measurement error: $\hat\lambda_1$ is biased towards zero in a single cross-section (attenuation), and the bias does not vanish by averaging over $t$ in the way a law of large numbers might suggest, because the same $\hat\beta$ is used at every $t$. Shanken (1992) and Jagannathan and Wang (1998) are the references; ignoring them produces $t$-statistics on $\hat\lambda$ that are too large. A related trap is using the *same* sample to form portfolios on a characteristic and then to test whether that characteristic is priced — a form of data snooping that GRS and FM cannot detect.
:::

::: quiz
A paper reports that “the CAPM is rejected because $\hat\alpha = 0.004$ per month, $t = 2.1$, on a single industry portfolio”. Which response is the most careful?
- [ ] The industry is mispriced and should be bought
- [ ] The CAPM is false, because one $t$-statistic exceeds $2$
- [x] A single-asset intercept test at $t = 2.1$ is weak evidence: no GRS joint test, no adjustment for multiple assets, no HAC, no statement of the proxy; it is not a trading recommendation
- [ ] $\alpha$ cannot be estimated, so the paper is meaningless
::: solution
$\alpha$ can be estimated; the question is what a $t = 2.1$ on one of many assets, with unspecified standard errors, proves. GRS exists because $N$ correlated intercepts will produce some $t > 2$ under the null. Multiple testing, a market proxy, and clustering of residuals are the econometric issues. “Should be bought” is not an econometric conclusion.
:::
:::

## Return predictability

A separate literature asks whether $R_{t+1}$ is forecastable from a variable $x_t$ known at $t$, typically a valuation ratio.

$$
R_{t+1} = a + b x_t + e_{t+1}.
$$ {#eq-pred}

::: proposition Persistent predictors and Stambaugh bias {#prop-stambaugh}
Suppose $x_{t+1} = c + \rho x_t + u_{t+1}$ with $\rho$ close to $1$, and $\Corr(e_{t+1}, u_{t+1}) = \gamma < 0$ (as when $x_t$ is a log dividend-price ratio: a return shock raises $P_t$ and lowers $x_t$). Then the OLS $\hat b$ in [[#eq-pred]] is biased **upwards** in finite samples, with bias approximately $\gamma\cdot\E[\hat\rho-\rho]$, and $\E[\hat\rho-\rho] < 0$. Ordinary $t$ tests over-reject $H_0{:}\, b = 0$. The bias shrinks as $T$ grows but is material at $T = 60$–$120$ annual observations (Stambaugh 1999).
:::

::: proof
Write $\hat b - b$ in terms of the residual of $x$ and the residual of $R$. Because $e$ and $u$ are correlated, the usual OLS orthogonality fails in finite samples where $\hat\rho \neq \rho$. The formula $\E[\hat b-b] \approx \gamma\,\E[\hat\rho-\rho]$ is Stambaugh's approximation; $\E[\hat\rho-\rho] < 0$ is the Kendall bias for a persistent AR(1). Negative $\gamma$ and negative $\E[\hat\rho-\rho]$ make $\E[\hat b-b] > 0$.
:::

Campbell and Shiller (1988) and Fama and French (1988) documented in-sample predictive slopes of this kind for US equity returns on dividend-price and earnings-price ratios. Subsequent work (Goyal and Welch 2008, *Review of Financial Studies*) found that many of those regressions fail a genuine out-of-sample comparison of the kind in [[time-series/forecasting]]: a trailing-mean forecast of returns often has lower MSPE than the predictive regression. Cochrane (2008) argued that the *dividend-growth* identity makes a failure to predict returns equivalent to a strong statement about dividend growth. The debate is unresolved and is about samples, identities and out-of-sample criteria. It is not a finding that “one should time the market using $d-p$”.

::: example A predictive regression, seed 53 {#ex-pred}
A predictor $x_t$ was drawn as an AR(1) with mean $-3.4$, $\rho = 0.92$ and innovation sd $0.08$, seed $53$, $T = 200$. Returns were $R_{t} = 0.12 + 0.04(x_{t-1}+3.4) + e_t$ with $e_t\iid\Normal(0, 0.04^2)$. OLS of $R_t$ on a constant and $x_{t-1}$ produces $\hat a = 0.250$, $\hat b = 0.0386$ (se $0.0160$), $t_b = 2.41$, $R^2 = 0.029$.
::: solution
The DGP slope is $0.04$; $\hat b = 0.039$ is on top of it. $R^2 = 0.029$ is small, as return-predictability $R^2$s are even when $b\neq 0$: most of a return is the shock $e_t$. A $t$ of $2.41$ would reject $b = 0$ at 5% by ordinary critical values; Stambaugh's bias is limited here because $T = 200$ is large for a monthly-style sample and because this DGP set $\Corr(e,u) = 0$ (the two shocks were drawn independently). In the empirically relevant case $\gamma < 0$ and $T = 80$, the same $t = 2.41$ would be weaker evidence. The $R^2$ is not a fraction of a market to be harvested.
:::
:::

::: widget plot
f: 0.04*(x + 3.4) + 0.12
x: -4.2, -2.6
y: 0.08, 0.16
labels: \E[R\mid x]
caption: Conditional mean in the simulated predictive DGP of [[#ex-pred]], $R$ against the lagged predictor $x$. The slope is $0.04$ per unit of $x$, small relative to the residual sd $0.04$. A scatter of actual returns (not plotted) would be a cloud around this line, which is why $R^2 = 0.03$ is the right order of magnitude even when the slope is true. The line is a conditional expectation in a model, not a signal to scale a position in $x$.
:::

## GMM and the stochastic discount factor

A unifying language, due to Hansen (1982) and Hansen and Singleton (1982), is the **stochastic discount factor** (SDF) $m_{t+1}$: a pricing model says $\E[m_{t+1} R_{i,t+1}^g] = 1$ for gross returns, or $\E[m_{t+1} R_{i,t+1}] = 0$ for excess returns. Linear factor models are the special case $m_{t+1} = a - b\T f_{t+1}$.

::: definition Hansen's GMM {#def-gmm}
Let $g(w_t,\theta)$ be an $m\times 1$ vector of **moment conditions** with $\E[g(w_t,\theta_0)] = 0$ at the true $\theta_0\in\R^k$, $k \le m$. The **GMM estimator** with weighting matrix $W$ minimises $Q_T(\theta) = \bar g_T(\theta)\T W \bar g_T(\theta)$, where $\bar g_T = T^{-1}\sum_t g(w_t,\theta)$. Under standard regularity (Hansen 1982),

$$
\sqrt{T}(\hat\theta - \theta_0) \to_d \Normal\bigl(0, (G\T WG)^{-1} G\T W S W G (G\T WG)^{-1}\bigr),
$$

with $G = \E[\partial g/\partial\theta\T]$ and $S = \sum_{j=-\infty}^{\infty}\E[g_t g_{t-j}\T]$ the long-run variance of the moments. The efficient $W$ is $S^{-1}$. The **overidentification** (Hansen $J$) statistic $T Q_T(\hat\theta)$ at the efficient $W$ is asymptotically $\chi^2_{m-k}$ under $H_0$ and the correct $S$.
:::

For the CAPM in excess returns, $g_t(\alpha,\beta)$ is not the usual GMM packaging; the SDF packaging is $g_{i,t} = m_t(\theta) R_{i,t}$ with $m_t = a - b R_{m,t}$ and $\theta = (a,b)$. Then $m = N$ assets, $k = 2$ parameters, and $J$ tests the $N-2$ extra pricing restrictions — a GMM version of GRS. Serial correlation and heteroskedasticity enter through $S$, which is why GMM and HAC are the same family of tools. Weak identification (Stock and Wright 2000) — an SDF that barely prices the factors — produces $J$ tests that over-reject and standard errors that cannot be trusted, the time-series cousin of weak instruments in [[econometrics/instrumental-variables]].

::: example Counting $J$ degrees of freedom {#ex-j}
A linear SDF $m_t = a - b_1 f_{1t} - b_2 f_{2t}$ is estimated on $N = 10$ excess returns. What is $k$, what is $m$, and what is the $J$ distribution under the null that the SDF prices all ten assets?
::: solution
Two slopes and an intercept in $m$ give $k = 3$ (or $k = 2$ if $a$ is normalised another way; the usual excess-return normalisation $E[m R^e] = 0$ uses $k = 2$ factor loadings and absorbs $a$ into scale). With $m = 10$ moment conditions (one per asset), $J \to_d \chi^2_{10-3} = \chi^2_7$ if $k = 3$, or $\chi^2_8$ if $k = 2$. A $J$ of $22$ on $\chi^2_7$ (5% critical value $14.07$) would reject. Rejection means the two-factor SDF does not price this cross-section, not that a particular portfolio should be shorted.
:::
:::

::: intuition GMM is IV, and IV is GMM
The moment $\E[z_t e_t(\theta)] = 0$ with $e_t = y_t - x_t\T\theta$ is 2SLS when $W$ is chosen accordingly. Hansen's contribution was to allow $m > k$, a HAC $S$, and a $\chi^2$ test of the extra moments. Asset-pricing tests are overidentified IV: the “instruments” are $1$ and the factors, the “errors” are pricing errors $m_t R_{i,t}$. The same weak-instrument diagnostics that belong in [[econometrics/instrumental-variables]] belong here when the factors are weak or the SDF is nearly unidentified.
:::

::: application Hansen–Singleton and the equity premium
Hansen and Singleton (1982, *Econometrica*) estimated a consumption-CAPM SDF $m_{t+1} = \beta (C_{t+1}/C_t)^{-\gamma}$ by GMM on US returns and consumption growth. Subsequent work (Hansen and Jagannathan 1991; Mehra and Prescott 1985 as the calibration counterpart) documented that the required $\gamma$ is far larger than values considered plausible from other evidence — the **equity-premium puzzle**, treated as theory in [[asset-pricing/consumption-based-pricing]]. The econometric content in this chapter is the $J$ test and the sensitivity of $\hat\gamma$ to the choice of instruments and of $S$. Those are specification issues. They are not a statement that equities are “cheap”.
:::

## Putting the toolkit together

A serious test of a factor model in a realistic sample uses almost everything in this course:

- a mean equation that may include a lagged return or a predictor ([[time-series/arma-models]], [[#eq-pred]]);
- standard errors that survive clustering of $e_{i,t}^2$ ([[time-series/volatility]]) and overlapping horizons (Hansen and Hodrick 1980);
- unit-root and persistence awareness for the predictor ([[time-series/unit-roots]], [[#prop-stambaugh]]);
- a joint, not asset-by-asset, intercept test ([[#def-alpha]]) or a $J$ test ([[#def-gmm]]);
- an out-of-sample check if the claim is forecastability ([[time-series/forecasting]]).

The output is a statistical decision about a restriction in a sample. It becomes a *market* claim only after a pricing theory, a proxy, a sample split, and a cost calculation that this atlas does not perform, and it never becomes a recommendation.

::: history
**1964–1966, William Sharpe, John Lintner, Jan Mossin.** The CAPM as an equilibrium restriction, later tested as $\alpha_i = 0$.

**1968, Michael Jensen.** The intercept $\alpha$ as a time-series performance statistic.

**1973, Eugene Fama and James MacBeth.** Two-pass cross-sectional regressions with time-averaged standard errors.

**1982, Lars Peter Hansen; Hansen and Kenneth Singleton.** GMM, and GMM estimation of a consumption SDF.

**1988–1989, John Campbell and Robert Shiller; Fama and French.** Valuation ratios and the predictability debate; GRS as a joint intercept test (Gibbons, Ross and Shanken 1989).

**1992–1993, Jay Shanken; Fama and French.** Errors-in-variables correction for two-pass estimators; the three-factor model as an empirical description of the US cross-section.

**1999, Robert Stambaugh.** Finite-sample bias in predictive regressions with persistent, endogenous predictors.
:::

::: summary
- The CAPM (and a factor model) implies $\alpha_i = 0$ in a time-series regression on the factors. GRS tests the intercepts jointly ([[#def-alpha]], [[#prop-capm-ols]]). Rejection is of a joint hypothesis, not a trading rule.
- Fama–MacBeth estimates a cross-sectional premium from time-varying cross-sections of $\hat\beta_i$. Shanken's correction accounts for generated regressors ([[#def-fm]]).
- Predictive regressions of returns on persistent valuation ratios have small $R^2$ and a finite-sample bias when the predictor's innovation is correlated with the return (Stambaugh). Out-of-sample MSPE is the relevant forecast check ([[#prop-stambaugh]]).
- GMM estimates and tests SDF moment conditions $\E[m_t(\theta) R_{i,t}] = 0$. $J \sim \chi^2_{m-k}$ is the overidentification test; weak identification is a real risk ([[#def-gmm]]).
- HAC, GARCH, overlapping observations and multiple testing are part of the specification, not optional extras. Nothing in this chapter is investment advice.
:::

## Exercises

::: exercise CAPM intercept {level=1 check="0.69"}
In [[#ex-capm]], $\hat\alpha = 0.00152$ and $\widehat{\mathrm{se}}(\hat\alpha) = 0.00219$. Compute $t_{\hat\alpha}$ to two decimals. (Enter the $t$-statistic.)
::: solution
$0.00152/0.00219 \approx 0.69$.
:::
:::

::: exercise CAPM $\beta$ versus one {level=1}
Using $\hat\beta = 1.218$ and $\mathrm{se} = 0.046$, test $H_0{:}\,\beta = 1$ at 5% two-sided against $\Normal(0,1)$.
::: solution
$t = (1.218-1)/0.046 = 4.74$, far above $1.96$. Reject $H_0$. (In the DGP $\beta = 1.2$, so this is a correct rejection of a false null.)
:::
:::

::: exercise GRS degrees of freedom {level=1}
A GRS test on $N = 5$ portfolios with $T = 120$ is compared with which $F$ distribution?
::: solution
$F_{N, T-N-1} = F_{5, 114}$.
:::
:::

::: exercise Predictability $R^2$ {level=2 check="0.029"}
In [[#ex-pred]], the residual variance is about $0.04^2 = 0.0016$ and $\Var(R)$ is about $0.0016 + 0.04^2\Var(x)$. Given the reported $R^2 = 0.029$, what $R^2$ (to three decimals) did OLS actually print? (Enter $0.029$.)
::: solution
$0.029$, as reported. The exercise is a reminder that a “significant” $t_b = 2.41$ coexists with $R^2 \approx 3\%$.
:::
:::

::: exercise Stambaugh direction {level=2}
If $\gamma = \Corr(e,u) < 0$ and $\E[\hat\rho-\rho] < 0$, is $\E[\hat b - b]$ positive or negative? What does that do to a test of $H_0{:}\, b = 0$ against $b > 0$?
::: solution
The product $\gamma\cdot\E[\hat\rho-\rho]$ is positive, so $\hat b$ is biased up. Tests of $b = 0$ against a positive alternative over-reject: too many samples look like $b > 0$ when $b = 0$.
:::
:::

::: exercise $J$ degrees of freedom {level=2 check="8"}
An SDF with $k = 2$ parameters is estimated on $m = 10$ excess-return moment conditions. Under the null and a correct $S$, $J$ is $\chi^2$ with how many degrees of freedom? (Enter the df.)
::: solution
$m - k = 8$.
:::
:::

::: exercise Shanken intuition {level=2}
Why does using $\hat\beta_i$ rather than $\beta_i$ in Pass 2 make naive OLS standard errors on $\hat\lambda$ too small, even after Fama–MacBeth averaging of $\hat\lambda_t$?
::: solution
Every period's $\hat\lambda_t$ is computed from the *same* noisy $\hat\beta$. The $T$ cross-sections are not independent information about $\lambda$; they share Pass-1 estimation error. Fama–MacBeth se treats $\hat\lambda_t$ as if the only noise were the cross-sectional $u_{i,t}$. Shanken adds the Pass-1 contribution, which inflates the se and reduces $t$.
:::
:::

::: exercise Overlapping returns {level=3}
Annual returns formed as the sum of twelve monthly returns, and then used in a monthly-frequency regression, have MA($11$) errors. Which standard-error formula from this course applies, and which chapter supplied it?
::: hint
Look at $h$-step forecast errors in [[time-series/forecasting]].
:::
::: solution
Hansen–Hodrick / Newey–West HAC with at least $11$ lags, the same construction as the Diebold–Mariano se for $h$-step forecasts in [[time-series/forecasting#def-dm]]. Using OLS se on overlapping returns understates uncertainty, often badly. (Hansen and Hodrick 1980 is the classic reference for forward-rate regressions.)
:::
:::

::: exercise Joint versus marginal {level=3}
Ten assets are tested one-by-one for $\alpha_i = 0$ at 5%. Under the joint null and independence, what is the probability of at least one rejection? How does GRS differ?
::: solution
$1 - 0.95^{10} \approx 0.40$. Four in ten samples produce at least one “significant” alpha by chance. GRS tests the vector $\alpha = 0$ at a single 5% size, taking residual correlation into account via $\hat\Sigma^{-1}$. It is the test that matches the claim “the factor model prices this *set* of assets”.
:::
:::

::: exercise A number that is not a trade {level=2}
A fitted three-factor model on a simulated industry portfolio has $\hat\alpha = 0.003$ per month, HAC $t = 1.4$. Write two sentences that report the result accurately and two that would be a misuse.
::: solution
Accurate: “The intercept is $0.003$ per month with a HAC $t$-statistic of $1.4$, so we do not reject $\alpha = 0$ at 5% for this portfolio and this factor model in this sample. The estimate is a pricing error under the model's assumptions, not a forecast of next month's residual.” Misuse: “The industry has a significant alpha and should be overweighted.” “A $t$ of $1.4$ proves the three-factor model is true.” The second pair adds a recommendation or treats non-rejection as proof.
:::
:::
