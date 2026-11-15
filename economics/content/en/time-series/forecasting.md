A fitted ARMA model is useful only if it says something about dates that are not in the sample. **Forecasting** is the construction of a predictor of $Y_{t+h}$ from information dated $t$ and earlier, together with an honest statement of how wrong that predictor is likely to be. The theory is older than ARMA: the minimum mean squared error predictor is a conditional expectation, and for Gaussian processes it is linear. Box and Jenkins made the linear predictor a recursive function of an estimated ARMA; Diebold and Mariano (1995) made the comparison of two forecast methods a [hypothesis test](/a/maths/lesson.php?c=statistics&l=hypothesis-testing).

This chapter derives the linear $h$-step forecast and its MSE for causal ARMA processes, constructs interval forecasts, discusses information criteria as forecast-oriented model selectors, and evaluates forecasts out of sample. Worked numbers come from the same seed-$7$ AR(1) used in [[time-series/arma-models]], so the estimates match. The numbers are properties of that simulated path. They are not a forecast of any real economy or market, and nothing in the chapter is investment, trading or policy advice.

## The forecasting problem

Let $\mathcal{F}_t$ denote information available at date $t$ — in this chapter, typically $\{Y_s : s \le t\}$, or a finite window of it. A **point forecast** of $Y_{t+h}$ is any $\mathcal{F}_t$-measurable random variable $\hat Y_{t+h\mid t}$. Its accuracy is judged, unless some other loss is named, by **mean squared error** $\E[(Y_{t+h}-\hat Y_{t+h\mid t})^2]$.

::: theorem Minimum-MSE forecast {#thm-mse}
If $\E[Y_{t+h}^2] < \infty$, the unique (up to almost-sure equality) minimiser of $\E[(Y_{t+h}-g)^2]$ over $\mathcal{F}_t$-measurable $g$ is the conditional expectation

$$
\hat Y_{t+h\mid t}^{\star} = \E[Y_{t+h}\mid \mathcal{F}_t].
$$

The achieved MSE is $\E\bigl[\Var(Y_{t+h}\mid\mathcal{F}_t)\bigr]$. If $(Y_t)$ is jointly Gaussian, $\E[Y_{t+h}\mid\mathcal{F}_t]$ is an affine function of the variables that generate $\mathcal{F}_t$.
:::

::: proof
For any competitor $g$,

$$
Y_{t+h} - g = \bigl(Y_{t+h} - \E[Y_{t+h}\mid\mathcal{F}_t]\bigr) + \bigl(\E[Y_{t+h}\mid\mathcal{F}_t] - g\bigr).
$$

The cross term vanishes on taking expectations because the first factor has conditional mean zero given $\mathcal{F}_t$ and the second factor is $\mathcal{F}_t$-measurable. Completing the square gives $\E[(Y_{t+h}-g)^2] = \E[(Y_{t+h}-\E[Y_{t+h}\mid\mathcal{F}_t])^2] + \E[(\E[Y_{t+h}\mid\mathcal{F}_t]-g)^2]$, which is minimised uniquely at $g = \E[Y_{t+h}\mid\mathcal{F}_t]$. Joint Gaussianity makes every conditional expectation linear, a standard fact about the multivariate normal ([joint distributions](/a/maths/lesson.php?c=probability&l=joint-distributions)).
:::

Two comments prevent over-reading [[#thm-mse]]. First, squared error is a choice of loss. For a skewed variable — daily rainfall, or a short-rate near zero — the minimiser of expected absolute error is the conditional median, not the mean. Second, $\mathcal{F}_t$ is a choice of information. A forecast that uses a future revision of GDP is not a forecast that could have been made at $t$; this is the **real-time** constraint emphasised in forecast evaluation.

When we restrict $g$ to be linear in $\{Y_s, s\le t\}$, the minimiser is the **linear projection** $P(Y_{t+h}\mid \{Y_s, s\le t\})$, which coincides with the conditional expectation for Gaussian ARMA and remains well-defined without Gaussianity. All ARMA forecasts below are linear projections. They are computed from the Wold representation $Y_t - \mu = \sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}$ with $\psi_0 = 1$.

::: proposition Wold formula for the linear forecast {#prop-wold-fcast}
Let $Y_t - \mu = \sum_{j=0}^{\infty}\psi_j\varepsilon_{t-j}$ be causal and weakly stationary, with $\varepsilon_t$ the one-step innovation, $\varepsilon_t = Y_t - P(Y_t\mid \{Y_s, s<t\})$. Then the $h$-step linear predictor and its MSE are

$$
\hat Y_{t+h\mid t} = \mu + \sum_{j=h}^{\infty}\psi_j\varepsilon_{t+h-j}, \qquad \mathrm{MSE}(h) = \sigma^2\sum_{j=0}^{h-1}\psi_j^2.
$$ {#eq-wold-fcast}

As $h\to\infty$, $\hat Y_{t+h\mid t} \to \mu$ and $\mathrm{MSE}(h) \to \gamma_0$.
:::

::: proof
Split $Y_{t+h}-\mu = \sum_{j=0}^{h-1}\psi_j\varepsilon_{t+h-j} + \sum_{j=h}^{\infty}\psi_j\varepsilon_{t+h-j}$. The first sum is orthogonal to $\mathcal{F}_t$ because each $\varepsilon_{t+1},\ldots,\varepsilon_{t+h}$ is. The second sum is $\mathcal{F}_t$-measurable (it involves $\varepsilon_t, \varepsilon_{t-1},\ldots$). The linear projection is therefore the second sum plus $\mu$, and the MSE is the variance of the first sum, which is [[#eq-wold-fcast]] by orthogonality of the $\varepsilon$'s. Square-summability of $\psi$ sends the tail of the MSE to $\gamma_0 = \sigma^2\sum_{j=0}^{\infty}\psi_j^2$, and the coefficients on past $\varepsilon$ in the forecast vanish.
:::

The formula has a simple reading. The $h$-step forecast keeps every Wold coefficient that multiplies a shock *already observed*, and it drops those that multiply shocks not yet realised. The dropped coefficients are the only source of forecast error among linear predictors.

## Forecasts from ARMA models

For a causal AR($p$), the Wold coefficients obey the same recurrence as the process, and the forecasts obey it too.

::: proposition AR($p$) forecasts {#prop-ar-fcast}
For a causal AR($p$) $Y_t = c + \phi_1 Y_{t-1}+\cdots+\phi_p Y_{t-p}+\varepsilon_t$, the linear forecasts satisfy the homogeneous recurrence

$$
\hat Y_{t+h\mid t} = c + \phi_1 \hat Y_{t+h-1\mid t} + \cdots + \phi_p \hat Y_{t+h-p\mid t}, \qquad h \ge 1,
$$

with the convention $\hat Y_{t-j\mid t} = Y_{t-j}$ for $j \ge 0$. For the AR(1) $Y_t = c + \phi Y_{t-1}+\varepsilon_t$, $|\phi|<1$,

$$
\hat Y_{t+h\mid t} = \mu + \phi^h (Y_t - \mu), \qquad \mathrm{MSE}(h) = \sigma^2\frac{1-\phi^{2h}}{1-\phi^2},
$$ {#eq-ar1-fcast}

where $\mu = c/(1-\phi)$.
:::

::: proof
Take the linear projection of the AR equation at date $t+h$ onto $\mathcal{F}_t$. For $h=1$, $P(\varepsilon_{t+1}\mid\mathcal{F}_t) = 0$ and $P(Y_t\mid\mathcal{F}_t) = Y_t$, which is the one-step case of the recurrence. For $h > 1$ the same argument applies with $Y_{t+h-j}$ replaced by its already-computed forecast. For AR(1), iterating $\hat Y_{t+h\mid t} = c + \phi\hat Y_{t+h-1\mid t}$ from $\hat Y_{t\mid t} = Y_t$ produces [[#eq-ar1-fcast]]. The MSE is $\sigma^2\sum_{j=0}^{h-1}\phi^{2j}$, the partial geometric sum of $\psi_j = \phi^j$.
:::

The AR(1) forecast is a weighted average of the last observation and the unconditional mean, with weight $\phi^h$ on the former. Persistent series ($\phi$ near $1$) have forecasts that stay near $Y_t$ for a long time; weakly dependent series snap back to $\mu$ almost immediately. That is mean reversion of the *forecast*, not a claim that any particular real series will revert.

For an MA($q$), $\psi_j = 0$ for $j > q$, so $\mathrm{MSE}(h) = \gamma_0$ for all $h > q$: beyond the MA memory the forecast is just $\mu$, and the interval is the unconditional interval. For ARMA, one-step forecasts are immediate from the equation (the MA part uses the already-estimated residuals); $h$-step forecasts iterate as in [[#prop-ar-fcast]], with future $\varepsilon$ replaced by zero.

::: example Theoretical AR(1) forecasts {#ex-ar1-theo-f}
Let $Y_t = 0.7 Y_{t-1} + \varepsilon_t$ with $\sigma^2 = 1$ and $Y_t = 2$. Compute $\hat Y_{t+h\mid t}$ and $\mathrm{MSE}(h)$ for $h = 1,2,5$, and the long-run MSE.
::: solution
Here $\mu = 0$ and $\phi = 0.7$. Then $\hat Y_{t+1\mid t} = 0.7\times 2 = 1.4$, $\hat Y_{t+2\mid t} = 0.49\times 2 = 0.98$, $\hat Y_{t+5\mid t} = 0.7^5 \times 2 = 0.16807\times 2 = 0.336$. The MSEs are

$$
\mathrm{MSE}(1) = 1, \quad \mathrm{MSE}(2) = 1+0.49 = 1.49, \quad \mathrm{MSE}(5) = \frac{1-0.7^{10}}{1-0.49} = \frac{1-0.02825}{0.51} \approx 1.905,
$$

and the long-run MSE is $\gamma_0 = 1/0.51 \approx 1.961$. Already at $h = 5$ the forecast error variance is 97% of the unconditional variance: five steps is a long horizon for $\phi = 0.7$.
:::
:::

::: example Estimated forecasts, seed 7 {#ex-ar1-est-f}
On the seed-$7$ AR(1) sample of length $T = 200$ (after burn-in), OLS gave $\hat c = -0.0264$, $\hat\phi = 0.6793$, $\hat\sigma^2 = 0.8485$. The last observation is $y_T = -1.473$. Using [[#eq-ar1-fcast]] with these estimates in place of $(c,\phi,\sigma^2)$, compute the forecasts, MSEs and approximate 95% interval half-widths $1.96\sqrt{\mathrm{MSE}(h)}$ for $h = 1,2,5,10$.
::: solution
The implied mean is $\hat\mu = \hat c/(1-\hat\phi) = -0.0264/0.3207 = -0.0825$. Then $\hat Y_{T+h\mid T} = -0.0825 + (0.6793)^h\bigl(-1.473 - (-0.0825)\bigr) = -0.0825 + (0.6793)^h(-1.390)$. Numerically

| $h$ | forecast | MSE | se | 95% half-width |
|---|---|---|---|---|
| $1$ | $-1.027$ | $0.849$ | $0.921$ | $1.805$ |
| $2$ | $-0.724$ | $1.240$ | $1.114$ | $2.183$ |
| $5$ | $-0.284$ | $1.543$ | $1.242$ | $2.434$ |
| $10$ | $-0.112$ | $1.575$ | $1.255$ | $2.460$ |

The point forecast moves from $-1.03$ towards the mean $-0.08$; the interval at $h = 10$ is already almost the unconditional interval. These numbers describe the simulated series. They are not a prediction of a real variable.
:::
:::

::: widget plot
f: s2*(1-phi^(2*x))/(1-phi^2); s2/(1-phi^2)
sliders: phi=0.7:0.1:0.95:0.05; s2=1:0.4:2:0.1
x: 1, 24
y: 0, 12
labels: \mathrm{MSE}(h); \gamma_0
caption: Forecast MSE of a causal AR(1) as a function of the horizon $h = x$, against the unconditional variance $\gamma_0$ (horizontal). Raise $\phi$ towards $1$: the MSE climbs slowly, and a “long-run” interval is not reached for many steps. At $\phi = 1$ the formula is invalid — the MSE of a random walk is $h\sigma^2$, which does not level off.
:::

::: warning Parameter uncertainty is missing from [[#eq-wold-fcast]]
The MSE in [[#eq-wold-fcast]] treats $(\phi,\theta,\sigma^2)$ as known. In practice they are estimated, and that extra uncertainty is material in small samples and at long horizons. A rough correction, Box–Jenkins style, inflates the one-step MSE by $k/T$ where $k$ is the number of estimated parameters. Bootstrap and Bayesian predictive distributions fold parameter uncertainty in more carefully. Reporting $\hat Y \pm 1.96\hat\sigma$ as a 95% interval for a one-step forecast on $T = 40$ with three estimated parameters is optimistic.
:::

## Interval forecasts

If the innovations are Gaussian, $Y_{t+h}\mid\mathcal{F}_t \sim \Normal\bigl(\hat Y_{t+h\mid t}, \mathrm{MSE}(h)\bigr)$, and the interval

$$
\hat Y_{t+h\mid t} \pm z_{1-\alpha/2}\sqrt{\mathrm{MSE}(h)}
$$

has exact conditional coverage $1-\alpha$. If the innovations are not Gaussian but have finite variance, the same interval has asymptotic coverage $1-\alpha$ by the [central limit theorem](/a/maths/lesson.php?c=probability&l=limit-theorems), at horizons where a sum of many $\psi_j\varepsilon_{t+h-j}$ has already kicked in. At $h = 1$, coverage is only as good as the innovation distribution: financial returns, treated in [[time-series/volatility]], have heavy tails, and a Gaussian one-step interval under-covers.

A useful check is to compare the **empirical coverage** of past interval forecasts with the nominal $1-\alpha$, on a hold-out sample. Intervals that contain the outcome 80% of the time when they claim 95% are not 95% intervals, whatever the formula.

::: example A Gaussian interval {#ex-interval}
Using [[#ex-ar1-est-f]], form the 95% interval for $h = 1$ and for $h = 10$. Interpret the $h = 10$ interval relative to the unconditional distribution of $Y_t$.
::: solution
For $h = 1$: $-1.027 \pm 1.96\times 0.921 = (-2.832,\ 0.778)$. For $h = 10$: $-0.112 \pm 1.96\times 1.255 = (-2.571,\ 2.348)$. The unconditional standard deviation is $\sqrt{1.575}\approx 1.255$ already at $h = 10$ (and $\sqrt{\hat\gamma_0}$ from the sample variance $1.591$ is $1.261$), so the $h = 10$ interval is essentially the unconditional 95% band of a $\Normal(-0.08, 1.59)$ random variable. Ten steps have wiped out the information in $y_T = -1.47$.
:::
:::

::: widget sequence
a: -0.0825 + (phi^n)*(-1.390)
sliders: phi=0.68:0.2:0.95:0.01
N: 16
start: 0
mode: terms
limit: -0.0825
y: -1.6, 0.3
caption: Point forecast of the seed-$7$ AR(1) as a function of horizon $n$, using $\hat\mu = -0.0825$ and $y_T - \hat\mu = -1.390$ from [[#ex-ar1-est-f]]. Increase $\phi$ and the return to the mean stretches out. At $n = 0$ the “forecast” is $y_T$ itself.
:::

## Model selection for forecasting

AIC and BIC were defined in [[time-series/arma-models#def-aic]]. Their justification as *forecast* criteria is this: AIC is an approximately unbiased estimator of the expected one-step Kullback–Leibler risk of the fitted model, and is asymptotically efficient (Shibata 1980) when the truth is not a finite ARMA; BIC is consistent for the true finite order when there is one (Schwarz 1978). If the aim is one-step forecasting and you do not believe the world is a low-order ARMA, AIC (or its small-sample cousin AICc) is the default. If the aim is to recover a DGP you believe is finite-order, use BIC.

Neither criterion is a substitute for **out-of-sample** evaluation. A model can win on AIC and lose on a genuine hold-out, because AIC is a function of the same residuals that the in-sample MSE uses.

A practical split for a series of length $T$ is to estimate on $1,\ldots,R$ and evaluate one-step (or $h$-step) forecasts on $R+1,\ldots,T$, either with a **fixed** origin (parameters frozen at $R$), a **rolling** window of length $R$, or a **recursive** window that grows. Rolling and recursive schemes produce a sequence of forecast errors $e_{t+h\mid t} = Y_{t+h} - \hat Y_{t+h\mid t}$ whose mean square is the **mean squared prediction error** (MSPE)

$$
\mathrm{MSPE} = \frac{1}{T-R-h+1}\sum_{t=R}^{T-h} e_{t+h\mid t}^2.
$$

Comparing two methods by their MSPE is the starting point of forecast evaluation; Diebold–Mariano, next, asks whether a gap in MSPE is distinguishable from noise.

::: example Hold-out MSPE, seed 7 {#ex-holdout}
The seed-$7$ AR(1) sample of length $200$ is split into a training sample of $160$ and a hold-out of $40$. An AR(1) with intercept, estimated on the training sample, gives $\hat c = -0.0341$, $\hat\phi = 0.6956$. Recursive one-step forecasts on the hold-out (updating the lagged $Y$ with the realised value, keeping parameters fixed) have $\mathrm{MSPE}_{\mathrm{AR}} = 0.616$. A no-change (random-walk) forecast has $\mathrm{MSPE}_{\mathrm{RW}} = 0.763$. A training-mean forecast has $\mathrm{MSPE}_{\mathrm{mean}} = 0.797$. The first hold-out observation is $-1.224$; the AR forecast of it, from $y_{160} = -0.124$, is $-0.120$.
::: solution
The AR(1) wins, as it should against a random-walk competitor when the DGP is a stationary AR(1) with $\phi = 0.7$. The gap $0.763-0.616 = 0.147$ is about 24% of the AR MSPE. The mean forecast is worst: the hold-out happens to contain several large negative values, and a constant predictor cannot track them. The first-step illustration is ordinary AR(1) arithmetic: $-0.034 + 0.696\times(-0.124) = -0.120$. Forty hold-out points is a small evaluation sample; [[#ex-dm]] puts a standard error on the comparison.
:::
:::

## Evaluating forecasts

Let $e_{1,t}$ and $e_{2,t}$ be the forecast errors of two methods (same target, same vintage, same information set), and let $d_t = e_{1,t}^2 - e_{2,t}^2$ be the **loss differential** under squared error. Method 1 is better in population if $\E[d_t] < 0$.

::: definition Diebold–Mariano test {#def-dm}
The **Diebold–Mariano statistic** for equal predictive accuracy is

$$
\mathrm{DM} = \frac{\bar d}{\widehat{\mathrm{se}}(\bar d)},
$$

where $\bar d$ is the sample mean of $d_t$ over the evaluation window and $\widehat{\mathrm{se}}(\bar d)$ is a heteroskedasticity-and-autocorrelation-consistent standard error (Newey–West, with a lag truncation of at least $h-1$ for $h$-step errors, which are MA($h-1$) under correct specification). Under the null $\E[d_t] = 0$ and mild regularity, $\mathrm{DM} \to_d \Normal(0,1)$.
:::

The test compares *forecast methods*, not models. It is valid when the methods are non-nested, when they are nested (with some caveats at the boundary; see Clark and McCracken 2001), and when the forecasts come from surveys rather than from estimated models. What it does not do is tell you that a model is “true”. A method can have lower MSPE than another and still be badly miscalibrated.

A second, more demanding, check is **Mincer–Zarnowitz** calibration: the regression

$$
Y_{t+h} = a + b\,\hat Y_{t+h\mid t} + u_{t+h}
$$

should have $(a,b) = (0,1)$ if the forecast is the conditional mean. A slope $b < 1$ is the usual finding when the forecast is noisier than the target — a consequence of attenuation, not necessarily of bias in $a$.

::: example A DM calculation {#ex-dm}
On a hold-out of $P = 40$, suppose the loss differential $d_t = e_{\mathrm{AR},t}^2 - e_{\mathrm{RW},t}^2$ has sample mean $\bar d = 0.616 - 0.763 = -0.147$ (using the MSPE gap of [[#ex-holdout]] as if it were $\bar d$) and Newey–West standard error $0.090$. Compute DM and the two-sided $p$-value against $\Normal(0,1)$.
::: solution
$\mathrm{DM} = -0.147/0.090 = -1.63$. The two-sided $p$-value is $2(1-\Phi(1.63)) \approx 0.10$. At 5% we would not reject equal accuracy; at 10% we would. Forty observations of a loss differential are not many, and a HAC standard error of $0.09$ on a gap of $0.15$ is the honest statement of that. The AR method looks better; the sample does not prove it at conventional 5% size. (The numerical se $0.090$ is an illustrative HAC figure consistent with the order of magnitude of $d_t$ on this hold-out; a full Newey–West calculation from the 40 individual $d_t$ would be the number to report in a paper.)
:::
:::

::: quiz
Two one-step methods are compared on $P = 200$ forecasts. MSPE is $1.00$ for method A and $1.04$ for method B. The DM statistic is $0.4$. Which report is accurate?
- [ ] A is significantly better because $1.00 < 1.04$
- [x] The gap is small relative to the sampling variation of the loss differential; we do not reject equal accuracy
- [ ] B is better because its MSPE is larger and therefore more conservative
- [ ] DM cannot be used because the MSPEs are close
::: solution
DM is $0.4$, far below $1.96$. The 4% gap in MSPE is well within noise at $P = 200$ for whatever serial correlation the HAC se is picking up. Smaller MSPE is better, so B is not “more conservative” in a sense that would make it preferable. Closeness of MSPEs is a reason to *run* DM, not a reason to skip it.
:::
:::

::: intuition Why one-step errors should be white noise
If $\hat Y_{t+1\mid t} = \E[Y_{t+1}\mid\mathcal{F}_t]$, the error $\varepsilon_{t+1} = Y_{t+1}-\hat Y_{t+1\mid t}$ is uncorrelated with every $\mathcal{F}_t$-measurable random variable, including past errors. A residual ACF in one-step forecast errors is therefore evidence that information in $\mathcal{F}_t$ was left unused — a bad forecast, not “just noise”. Multi-step errors are a different matter: $h$-step errors are MA($h-1$) even when the one-step errors are white, because they share the intervening shocks.
:::

::: application Macroeconomic forecast comparisons
The Meese–Rogoff (1983, *American Economic Review*) finding that a random walk beats a range of structural exchange-rate models in out-of-sample MSE is the most famous negative result in this chapter's spirit: in-sample fit did not survive a genuine forecast comparison. Subsequent work (Rogoff and Stavrakeva 2008; Rossi 2013) has qualified the result — some models win at long horizons, some lose because of small-sample instability of parameters — but has not overturned the methodological moral. A related, more positive, literature evaluates survey forecasts (SPF, Consensus Economics, central-bank staff forecasts) by MSPE and by calibration. Those evaluations are about *methods and institutions*, not about a trading rule, and they are dated: an SPF comparison through 2019 is not a comparison through 2024.
:::

::: widget montecarlo
mode: pi
n: 1000
caption: Monte Carlo estimation of $\pi$ by random points, as a picture of how simulation error shrinks like $1/\sqrt{n}$. The same $1/\sqrt{n}$ rate governs the standard error of an MSPE and of the Diebold–Mariano statistic: doubling the evaluation window does not double precision. Critical values for unit-root tests in the next chapter were originally tabulated by this kind of simulation.
:::

## Where this leads

Point and interval forecasts from a stationary ARMA assume that the future is drawn from the same process as the past. If the series has a unit root, the right forecast is (approximately) the last observation, and the MSE grows linearly in $h$ rather than levelling off; that is [[time-series/unit-roots]]. If several series are forecast jointly, the VAR of [[time-series/var-models]] produces a vector of forecasts and a matrix MSE. If the *variance* of the one-step error changes through time, a point forecast from an ARMA may still be reasonable while the interval is not; [[time-series/volatility]] repairs the interval. Combining forecasts — Bates and Granger (1969), Timmermann (2006) — is a natural next step once several methods are on the table, and it is still a statement about methods, not a recommendation to take a position.

::: history
**1939, Kolmogorov; 1941, Wiener.** The linear least-squares prediction problem for stationary processes was solved in the spectral domain, giving the formula that ARMA forecasting specialises.

**1969, J. M. Bates and Clive Granger.** “The combination of forecasts” showed that a weighted average of two forecasts can beat both, a result that still organises ensemble forecasting.

**1970, Box and Jenkins.** Recursive ARMA forecasting, forecast-error variances from the $\psi$ weights, and interval forecasts entered applied work.

**1983, Richard Meese and Kenneth Rogoff.** Out-of-sample exchange-rate “forecasts” from structural models lost to a random walk, making genuine hold-out evaluation a requirement rather than an option.

**1995, Francis Diebold and Roberto Mariano.** Their test of equal predictive accuracy gave a standard error to the MSPE comparison that applied work had been making informally.
:::

::: summary
- The minimum-MSE forecast is the conditional mean; for causal ARMA it is the linear Wold formula [[#eq-wold-fcast]] ([[#thm-mse]], [[#prop-wold-fcast]]).
- AR forecasts iterate the difference equation, with future $Y$ replaced by forecasts and future $\varepsilon$ by zero. For AR(1), $\hat Y_{t+h\mid t} = \mu + \phi^h(Y_t-\mu)$ and $\mathrm{MSE}(h)=\sigma^2(1-\phi^{2h})/(1-\phi^2)$ ([[#prop-ar-fcast]]).
- Interval forecasts add $\pm z\sqrt{\mathrm{MSE}(h)}$. They ignore parameter uncertainty unless a correction or a bootstrap is used, and they under-cover if one-step innovations are heavy-tailed.
- AIC is a forecast-oriented in-sample criterion; out-of-sample MSPE on a hold-out is the direct check. Diebold–Mariano tests whether a gap in MSPE is noise ([[#def-dm]]).
- One-step forecast errors should be uncorrelated with $\mathcal{F}_t$. A leftover ACF means unused information. None of these procedures is a trading rule or a policy recommendation.
:::

## Exercises

::: exercise AR(1) one-step {level=1 check="1.4"}
For $Y_t = 0.7 Y_{t-1}+\varepsilon_t$ and $Y_t = 2$, what is $\hat Y_{t+1\mid t}$? (Enter the forecast.)
::: solution
$0.7\times 2 = 1.4$.
:::
:::

::: exercise AR(1) five-step {level=1 check="0.336"}
In the same setting, compute $\hat Y_{t+5\mid t}$ to three decimals. (Enter the forecast.)
::: solution
$0.7^5 \times 2 = 0.16807\times 2 = 0.336$.
:::
:::

::: exercise One-step MSE {level=1 check="1"}
If $\sigma^2 = 1$ in that AR(1), what is $\mathrm{MSE}(1)$? (Enter the MSE.)
::: solution
The one-step error is $\varepsilon_{t+1}$, so $\mathrm{MSE}(1) = \sigma^2 = 1$.
:::
:::

::: exercise Two-step MSE {level=2 check="1.49"}
For the same AR(1), compute $\mathrm{MSE}(2)$. (Enter the MSE.)
::: solution
$\mathrm{MSE}(2) = \sigma^2(1+\phi^2) = 1+0.49 = 1.49$.
:::
:::

::: exercise Mean reversion of the forecast {level=2}
An AR(1) has $\mu = 4$, $\phi = 0.5$, $Y_t = 10$. Compute $\hat Y_{t+1\mid t}$, $\hat Y_{t+2\mid t}$ and $\lim_{h\to\infty}\hat Y_{t+h\mid t}$.
::: solution
$\hat Y_{t+1\mid t} = 4 + 0.5(10-4) = 7$, $\hat Y_{t+2\mid t} = 4 + 0.25\times 6 = 5.5$, and the limit is $\mu = 4$. Each step halves the gap to the mean.
:::
:::

::: exercise MA(1) two-step {level=2}
For $Y_t = \varepsilon_t + 0.4\varepsilon_{t-1}$ with $\sigma^2 = 1$, show that $\hat Y_{t+2\mid t} = 0$ and compute $\mathrm{MSE}(1)$ and $\mathrm{MSE}(2)$.
::: hint
$\psi_0 = 1$, $\psi_1 = 0.4$, $\psi_j = 0$ for $j \ge 2$.
:::
::: solution
By [[#prop-wold-fcast]], the two-step forecast drops $\psi_0\varepsilon_{t+2}$ and $\psi_1\varepsilon_{t+1}$, leaving nothing, so $\hat Y_{t+2\mid t} = \mu = 0$. $\mathrm{MSE}(1) = \psi_0^2 = 1$ and $\mathrm{MSE}(2) = 1+0.16 = 1.16 = \gamma_0$. Beyond lag $1$ the MA(1) has nothing to say.
:::
:::

::: exercise Coverage of a Gaussian interval {level=2}
A one-step 95% interval is $\hat Y_{t+1\mid t} \pm 1.96\hat\sigma$ with $\hat\sigma = 0.92$. If the true innovation is $\mathrm{t}_5$ scaled to variance $\hat\sigma^2$, will the interval under-cover or over-cover, and why?
::: solution
A $\mathrm{t}_5$ density has heavier tails than a normal with the same variance, so $\Prob(|Z|>1.96\sigma)$ exceeds $5\%$. The interval under-covers: actual coverage is below the nominal 95%. (The exact coverage depends on the scaling; the direction does not.)
:::
:::

::: exercise Diebold–Mariano arithmetic {level=2 check="-2"}
Suppose $\bar d = -0.20$ and $\widehat{\mathrm{se}}(\bar d) = 0.10$. Compute the DM statistic. (Enter DM.)
::: solution
$\mathrm{DM} = -0.20/0.10 = -2$. Against $\Normal(0,1)$ this is a two-sided 5% rejection of equal accuracy (critical value $1.96$).
:::
:::

::: exercise Why $h$-step errors are MA($h-1$) {level=3}
Using [[#eq-wold-fcast]], write the $h$-step error $Y_{t+h}-\hat Y_{t+h\mid t}$ as a moving average of $\varepsilon_{t+1},\ldots,\varepsilon_{t+h}$. Deduce that adjacent $h$-step errors (origins $t$ and $t+1$) are correlated, and that a HAC lag of at least $h-1$ is needed in [[#def-dm]].
::: hint
The error is $\sum_{j=0}^{h-1}\psi_j\varepsilon_{t+h-j}$.
:::
::: solution
$Y_{t+h}-\hat Y_{t+h\mid t} = \sum_{j=0}^{h-1}\psi_j\varepsilon_{t+h-j}$. The error at origin $t+1$ is $\sum_{j=0}^{h-1}\psi_j\varepsilon_{t+1+h-j}$. These two moving averages share $\varepsilon_{t+2},\ldots,\varepsilon_{t+h}$, so their covariance is in general non-zero. They share no shocks once the origins are $h$ or more apart. Hence $h$-step errors are MA($h-1$), and Newey–West for DM should use at least $h-1$ lags (more if the loss differential has additional persistence).
:::
:::

::: exercise Parameter-uncertainty inflation {level=3}
A rule of thumb replaces one-step MSE $\sigma^2$ by $\sigma^2(1+k/T)$ after estimating $k$ parameters on $T$ observations. For an AR(1) with intercept ($k = 3$ counting $\sigma^2$) and $T = 50$, by what percentage is the known-parameter interval half-width inflated? For $T = 500$?
::: solution
The half-width scales with $\sqrt{1+k/T}$. For $T = 50$, $\sqrt{1+3/50} = \sqrt{1.06} \approx 1.030$, a 3.0% inflation. For $T = 500$, $\sqrt{1+3/500} = \sqrt{1.006} \approx 1.003$, a 0.3% inflation. Parameter uncertainty is a small-sample concern for one-step ARMA intervals; it is not the dominant issue at $T = 500$. (At long horizons, uncertainty about $\phi$ near $1$ is a different, larger, story.)
:::
:::
