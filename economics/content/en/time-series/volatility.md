A one-step interval for a daily return that uses a single number $\hat\sigma$, estimated from five years of data, is an interval for a *typical* day. Some days are not typical. After a crash, after a policy announcement, or during a harvest failure that moves a commodity price, the squares of recent returns are large, and treating tomorrow as a draw from the same $\Normal(0,\hat\sigma^2)$ understates the width of a 95% band. Linear ARMA, which is a model of the *mean*, has nothing to say about that width.

Daily and weekly returns on equities, exchange rates and commodities have a look that linear ARMA does not capture. The *levels* are close to uncorrelated — yesterday's return is a poor linear predictor of today's — but the *squares* are strongly correlated. Large moves cluster: a turbulent week is more often followed by another turbulent week than a Gaussian white-noise model would allow. Mandelbrot (1963) and Fama (1965) documented the phenomenon; Engle (1982) and Bollerslev (1986) gave it a parametric home, **ARCH** and **GARCH**, in which the conditional variance $\sigma_t^2 = \Var(r_t\mid\mathcal{F}_{t-1})$ is a function of past squares (and past variances).

This chapter states the clustering facts, specifies ARCH and GARCH, derives the stationarity and persistence formulae, estimates a GARCH(1,1) on a simulated path with a known seed, and distinguishes **conditional** volatility from **realised** volatility computed from high-frequency returns. The models describe a second-moment process. They are not a recommendation to sell, hedge, or take a position, and a fitted $\sigma_t$ is not a forecast of a market to be traded.

## Stylised facts

A daily (log) return $r_t = \log P_t - \log P_{t-1}$ is, for many liquid instruments, approximately a martingale difference: $\E[r_t\mid\mathcal{F}_{t-1}]\approx 0$, and the sample ACF of $r_t$ sits inside the Bartlett band of [[time-series/stationarity#prop-bartlett]] after lag $0$. The sample ACF of $r_t^2$ does not. Cont (2001, *Quantitative Finance*) lists this pair — uncorrelated returns, correlated squares — among the **stylised facts** of asset returns, together with heavy tails (excess kurtosis), a slow decay of $\widehat{\Corr}(r_t^2, r_{t-k}^2)$, and a leverage effect (negative returns raising subsequent volatility more than positive returns of the same size, especially in equity indices).

These are sample regularities with sources and dates, not theorems, and they are not a claim that any particular instrument will display them next year. They are the reason a constant-$\sigma$ Gaussian ARMA is a poor model of *intervals* for returns even when it is an adequate model of *point* forecasts.

::: definition Conditional variance {#def-condvar}
Let $r_t$ be a return (or a residual from a mean model) with $\E[r_t\mid\mathcal{F}_{t-1}] = 0$. The **conditional variance** is $\sigma_t^2 = \Var(r_t\mid\mathcal{F}_{t-1}) = \E[r_t^2\mid\mathcal{F}_{t-1}]$. A process has **volatility clustering** if $\sigma_t^2$ is non-constant and positively dependent on recent $r_{t-j}^2$ (or on recent $\sigma_{t-j}^2$). The **unconditional** variance, when it exists, is $\gamma_0 = \E[r_t^2] = \E[\sigma_t^2]$.
:::

The distinction is the same as the distinction between $\Var(Y_t)$ and $\Var(Y_t\mid\mathcal{F}_{t-1})$ in an AR(1): the first is a number, the second is a random variable. GARCH models $\sigma_t^2$ parametrically so that a one-step interval can be $\pm 1.96\hat\sigma_t$ *today*, not $\pm 1.96\hat\sigma$ forever.

::: example Simulated GARCH, seed 43 {#ex-garch-path}
A series of length $800$ was drawn from the GARCH(1,1) defined in [[#def-garch]] below, with $(\omega,\alpha,\beta) = (0.05, 0.10, 0.80)$ and $z_t\iid\Normal(0,1)$, seed $43$. After discarding $100$ burn-in observations ($T = 700$):

- sample mean $\bar r = -0.004$, sample variance $0.473$ (theoretical unconditional variance $0.50$);
- sample ACF of $r_t$ at lags $1$–$6$: $0.024,\ -0.013,\ 0.027,\ -0.006,\ -0.049,\ -0.010$;
- sample ACF of $r_t^2$: $0.129,\ 0.052,\ 0.062,\ 0.020,\ 0.110,\ 0.049,\ -0.016,\ -0.029$;
- sample kurtosis $3.05$ (theoretical $3.35$);
- an ARCH-LM statistic, defined in [[#ex-arch-lm]], of $TR^2 = 14.76$ on four lags ($p = 0.005$ against $\chi^2_4$).

The first eight post-burn-in returns are $0.127$, $-1.116$, $0.258$, $0.808$, $-0.467$, $-0.131$, $-1.918$, $-1.071$.
::: solution
The levels ACF is inside the Bartlett band $\pm 1.96/\sqrt{700} \approx \pm 0.074$ except for a borderline lag $5$. The squares' ACF at lag $1$ is $0.129$, well outside, and $TR^2$ rejects conditional homoskedasticity at 1%. This is the clustering signature: uncorrelated $r_t$, correlated $r_t^2$. Kurtosis is only mildly above $3$ because these parameters imply a modest excess (see [[#prop-garch-mom]]); heavier tails want a larger $\alpha$ or a Student-$t$ $z_t$. The path is a simulated process, not a return series from any exchange.
:::
:::

::: widget distribution
dist: t
params: nu=5
a: -2
b: 2
caption: A Student-$t$ density with $5$ degrees of freedom, a standard choice for GARCH innovations $z_t$ when Gaussian $z_t$ cannot match sample kurtosis. Compare the tails with a normal (set the widget to `normal` in your head, or open a normal widget): more mass beyond $\pm 2$ is the heavy-tail stylised fact. Using a Gaussian one-step interval $\pm 1.96\sigma_t$ on $t_5$ data under-covers, which is why tail risk in this chapter is a statement about a distribution, not a trading signal.
:::

## ARCH and GARCH

::: definition ARCH($q$) and GARCH($p,q$) {#def-garch}
An **ARCH($q$)** process (Engle 1982) is $r_t = \sigma_t z_t$ with $z_t$ i.i.d. $(0,1)$ and

$$
\sigma_t^2 = \omega + \alpha_1 r_{t-1}^2 + \cdots + \alpha_q r_{t-q}^2, \qquad \omega > 0,\ \alpha_i \ge 0.
$$

A **GARCH($p,q$)** process (Bollerslev 1986) adds lagged conditional variances,

$$
\sigma_t^2 = \omega + \sum_{i=1}^{q}\alpha_i r_{t-i}^2 + \sum_{j=1}^{p}\beta_j \sigma_{t-j}^2.
$$ {#eq-garch}

The **GARCH(1,1)** $\sigma_t^2 = \omega + \alpha r_{t-1}^2 + \beta\sigma_{t-1}^2$, with $\omega>0$, $\alpha\ge 0$, $\beta\ge 0$, is the workhorse. The process is often written on the residual of a mean equation, $r_t = \mu + \phi r_{t-1} + \sigma_t z_t$; this chapter sets $\mu = \phi = 0$ unless a mean is needed.
:::

Non-negativity of $(\omega,\alpha,\beta)$ keeps $\sigma_t^2 \ge 0$. A GARCH(1,1) is an ARMA(1,1) in *squares*: $r_t^2 = \omega + (\alpha+\beta)r_{t-1}^2 + v_t - \beta v_{t-1}$ where $v_t = r_t^2 - \sigma_t^2$ is a martingale difference. That is why the sample ACF of $r_t^2$ looks like the ACF of a persistent ARMA, and it is why $\alpha+\beta$ is the persistence parameter.

::: proposition GARCH(1,1) moments {#prop-garch-mom}
Let $\sigma_t^2 = \omega + \alpha r_{t-1}^2 + \beta\sigma_{t-1}^2$ with $r_t = \sigma_t z_t$, $z_t$ i.i.d. $(0,1)$ and $\E[z_t^4] = \kappa_z < \infty$.

1. If $\alpha + \beta < 1$, then $\{r_t\}$ is weakly stationary with $\E[r_t^2] = \omega/(1-\alpha-\beta)$.
2. If in addition $(\kappa_z-1)\alpha^2 + 2\alpha\beta + \beta^2 < 1$ (for Gaussian $z_t$, $\kappa_z = 3$, this is $3\alpha^2+2\alpha\beta+\beta^2 < 1$), then $\E[r_t^4] < \infty$ and the unconditional kurtosis exceeds $\kappa_z$.
3. The **half-life** of a variance shock, under (1), is $\log(1/2)/\log(\alpha+\beta)$ periods.

The **news-impact** curve, holding $\sigma_{t-1}^2$ at its unconditional mean, is $\sigma_t^2 = \omega + \beta\bar\sigma^2 + \alpha r_{t-1}^2$, a parabola in the lagged return.
:::

::: proof
Take $\E[\,\cdot\mid\mathcal{F}_{t-1}]$ in [[#eq-garch]] and then $\E[\,\cdot\,]$: $\E[\sigma_t^2] = \omega + \alpha\E[r_{t-1}^2] + \beta\E[\sigma_{t-1}^2]$. Under stationarity $\E[r^2] = \E[\sigma^2]$, so $\E[r^2](1-\alpha-\beta) = \omega$. For the fourth moment, expand $\E[r_t^4] = \kappa_z\E[\sigma_t^4]$ and substitute [[#eq-garch]]; a linear equation for $\E[\sigma^4]$ has a finite positive solution under the stated inequality (Bollerslev 1986). The ARMA-in-squares representation has AR coefficient $\alpha+\beta$, whose geometric decay has half-life $\log 2 / |\log(\alpha+\beta)|$. News impact is [[#eq-garch]] with $\sigma_{t-1}^2$ fixed.
:::

If $\alpha+\beta = 1$ the process is **IGARCH**: $r_t^2$ has a unit root, $\E[r_t^2]$ does not exist (or depends on $t$ given a finite start), and variance forecasts do not revert. IGARCH is a useful local approximation for $\alpha+\beta \approx 0.98$, common in daily-return estimates; it is a unit-root model in squares, with the same forecasting consequences as [[time-series/unit-roots]] in levels.

::: example Persistence and half-life {#ex-halflife}
For $(\omega,\alpha,\beta) = (0.05, 0.10, 0.80)$ as in [[#ex-garch-path]], compute the unconditional variance, the Gaussian fourth-moment condition, the theoretical kurtosis, and the half-life.
::: solution
$\alpha+\beta = 0.90 < 1$, so $\E[r_t^2] = 0.05/0.10 = 0.50$. The Gaussian condition: $3(0.10)^2 + 2(0.10)(0.80) + 0.80^2 = 0.03+0.16+0.64 = 0.83 < 1$, so the fourth moment exists. The formula $\E[r^4]/(\E[r^2])^2 = 3\bigl(1-(\alpha+\beta)^2\bigr)/\bigl(1-2\alpha^2-(\alpha+\beta)^2\bigr)$ gives $3(1-0.81)/(1-0.02-0.81) = 3\times 0.19/0.17 \approx 3.35$. Half-life: $\log 0.5 / \log 0.9 \approx 6.58$ periods. A variance shock is estimated to be half gone in about a week of daily data, if the period is a day. The simulated sample kurtosis $3.05$ in [[#ex-garch-path]] sits below $3.35$, ordinary finite-sample noise.
:::
:::

::: widget plot
f: omega/(1-alpha-beta); omega + alpha*x^2 + beta*(omega/(1-alpha-beta))
sliders: omega=0.05:0.01:0.12:0.01; alpha=0.1:0.02:0.3:0.02; beta=0.8:0.4:0.92:0.02
x: -3, 3
y: 0, 2.5
labels: \bar\sigma^2; \sigma^2(r_{t-1})
caption: Unconditional variance (horizontal) and the news-impact curve of a GARCH(1,1), $\sigma_t^2$ as a function of $r_{t-1} = x$, with $\sigma_{t-1}^2$ held at its mean. Raise $\alpha$: news impact steepens (squares matter more). Raise $\beta$ with $\alpha+\beta$ still below $1$: the mean variance rises and shocks last longer. If $\alpha+\beta$ reaches $1$ the mean formula breaks — that is IGARCH.
:::

::: warning $\alpha+\beta < 1$ is not optional decoration
Software will sometimes report $\hat\alpha+\hat\beta = 1.02$ and a finite $\hat\omega$. The implied unconditional variance is then negative or infinite, and the recursion for $\sigma_t^2$ is not weakly stationary. Either the model is IGARCH (impose $\alpha+\beta = 1$ and drop $\omega$, or keep $\omega$ as a starting-value crutch), or the mean equation is misspecified, or a rare cluster has dominated a short sample. Do not compute $\omega/(1-\alpha-\beta)$ when the denominator is non-positive, and do not treat a non-stationary GARCH as a well-defined long-run variance for an interval forecast at horizon $60$.
:::

## Estimation and testing

Gaussian (quasi) maximum likelihood maximises

$$
\ell = -\frac12\sum_{t=1}^{T}\Bigl(\log\sigma_t^2 + \frac{r_t^2}{\sigma_t^2}\Bigr),
$$

with $\sigma_t^2$ computed recursively from [[#eq-garch]] given $(\omega,\alpha,\beta)$ and a start $\sigma_1^2$ (unconditional mean, or backcast). Under the conditions of [[#prop-garch-mom]] (1) and mild extra regularity, QMLE is consistent and asymptotically normal even if $z_t$ is not Gaussian (Bollerslev and Wooldridge 1992), provided a sandwich covariance is used. Student-$t$ MLE is more efficient if the tails are $t$ and the degrees of freedom are estimated.

A standard pretest for clustering is Engle's **ARCH-LM**: regress $r_t^2$ on a constant and $q$ lags of $r_t^2$, and compare $TR^2$ with $\chi^2_q$. It is the Lagrange-multiplier test of $\alpha_1 = \cdots = \alpha_q = 0$ in an ARCH($q$).

::: example ARCH-LM, seed 43 {#ex-arch-lm}
On the $T = 700$ post-burn-in path of [[#ex-garch-path]], the regression of $r_t^2$ on a constant and four lags of $r_t^2$ has $R^2 = 0.0212$ with $n = 696$ effective observations, so $TR^2 = 14.76$. The 5% critical value of $\chi^2_4$ is $9.49$; the $p$-value is $0.005$.
::: solution
The test rejects conditional homoskedasticity at 1%. The $R^2$ is small, $0.021$: four lags of squares explain little of the *level* of $r_t^2$ on any given day, but they explain enough, jointly, to reject a constant variance. That is typical. GARCH(1,1) then imposes a parsimonious ARMA structure on those squares rather than a long ARCH($q$).
:::
:::

::: example One-step $\sigma_t$ at the end of the sample {#ex-last-sigma}
The last five simulated returns of [[#ex-garch-path]] are $0.020$, $-0.244$, $0.008$, $0.973$, $0.728$, and the matching $\sigma_t$ (square roots of the DGP conditional variances) are $0.700$, $0.665$, $0.640$, $0.615$, $0.668$. Check that the last step obeys [[#eq-garch]] with the stated parameters, up to rounding.
::: solution
Entering the fourth-from-last $\sigma = 0.615$ and $r = 0.973$ into the recursion for the *last* variance:

$$
\sigma_{\mathrm{last}}^2 = 0.05 + 0.10(0.973)^2 + 0.80(0.615)^2 = 0.05 + 0.0947 + 0.3026 = 0.4473,
$$

so $\sigma_{\mathrm{last}} = \sqrt{0.4473} = 0.669$, matching $0.668$ to three decimals (the table's $0.615$ and $0.668$ are already rounded). After the quiet observations $0.020$, $-0.244$, $0.008$, $\sigma_t$ had fallen toward the floor $\sqrt{\omega/(1-\beta)}$ direction; the $0.973$ move pushed it back up. That is clustering as a recursion, not as a narrative about a market.
:::
:::

::: quiz
A fitted GARCH(1,1) on daily returns has $\hat\alpha = 0.06$, $\hat\beta = 0.91$, $\hat\omega = 0.02$. Which statement is right?
- [ ] The unconditional variance is $0.02$
- [x] $\hat\alpha+\hat\beta = 0.97 < 1$, so a finite unconditional variance exists and equals $0.02/(1-0.97) \approx 0.67$; shocks are highly persistent
- [ ] The process is IGARCH because $\hat\beta > 0.9$
- [ ] $\hat\alpha$ is insignificant because it is smaller than $\hat\beta$, so the model is just an AR in $\sigma_t^2$
::: solution
$\alpha+\beta = 0.97 < 1$, not IGARCH. Unconditional variance is $\omega/(1-\alpha-\beta)$, not $\omega$. A small $\alpha$ with a large $\beta$ is the usual pattern: today's variance is mostly yesterday's variance, with a modest kick from yesterday's square. Setting $\alpha = 0$ would make $\sigma_t^2$ deterministic given $\sigma_0^2$, which is not GARCH.
:::
:::

Asymmetric extensions — **GJR-GARCH** (Glosten, Jagannathan and Runkle 1993) and **EGARCH** (Nelson 1991) — let a negative $r_{t-1}$ raise $\sigma_t^2$ more than a positive one, matching the equity-index leverage effect. They add a parameter, not a trading rule. Multivariate GARCH (BEKK, DCC) models a matrix $\Sigma_t$; the identification and curse-of-dimensionality issues are those of [[time-series/var-models]] plus positivity of $\Sigma_t$.

## Realised volatility

GARCH is a *model* of $\sigma_t^2$ from daily (or weekly) squares. If the data are high-frequency trades or quotes, one can *measure* a day's variance by summing squared intraday returns.

::: definition Realised variance {#def-rv}
Given $M$ intraday log-returns $r_{t,i}$ on day $t$, the **realised variance** is $\mathrm{RV}_t = \sum_{i=1}^{M} r_{t,i}^2$, and **realised volatility** is $\sqrt{\mathrm{RV}_t}$. Under an Itô semimartingale for the log-price and $M\to\infty$ with a fixed day, $\mathrm{RV}_t$ is consistent for the day's quadratic variation. Market microstructure noise (bid–ask bounce, rounding) biases $\mathrm{RV}_t$ upward as $M$ grows; sparse sampling, kernel estimators (Barndorff-Nielsen, Hansen, Lunde and Shephard 2008) and pre-averaging are the standard repairs.
:::

Andersen, Bollerslev, Diebold and Labys (2003, *Econometrica*) showed that $\log\mathrm{RV}_t$ is close to Gaussian and is well modelled by a heterogeneous autoregression (Corsi 2009) on daily, weekly and monthly realised volatilities. The comparison with GARCH is empirical: RV uses more information, GARCH uses less and a parametric filter. Neither is a forecast of a price, and a realised-volatility series constructed from a particular contract is an illustration of a measurement, not a recommendation to trade that contract.

A useful diagnostic is to treat $\mathrm{RV}_t$ as a proxy for $\sigma_t^2$ and to ask whether a GARCH $\hat\sigma_t^2$ moves with it. Mincer–Zarnowitz regressions of $\mathrm{RV}_t$ on $\hat\sigma_t^2$ (the forecast evaluation of [[time-series/forecasting]]) are how that question is asked. $R^2$s are typically modest at the daily horizon and higher after a weekly aggregation.

::: application Risk measurement is not a recommendation
Value-at-risk and expected-shortfall numbers computed from a GARCH filter — $\mathrm{VaR}_{t+1}^{0.05} = -\hat\mu_{t+1} - 1.65\hat\sigma_{t+1}$ under Gaussian $z_t$, or a heavier quantile under $t_\nu$ — are *model-implied* quantiles of a stated process. They are used in the industry as risk reports; in this atlas they are an exercise in mapping $(\hat\mu,\hat\sigma,\text{a law for }z)$ to a number. Changing $z_t$ from Gaussian to $t_5$ changes the 5% quantile from $1.65\sigma$ to about $2.02\sigma$ (scaled $t_5$), a 20% increase, with no change in $\hat\sigma$. That sensitivity is the educational point. It is not a recommendation of a capital number, a hedge, or a portfolio.
:::

::: widget sequence
a: (alpha+beta)^n
sliders: alpha=0.1:0.02:0.3:0.02; beta=0.8:0.5:0.95:0.01
N: 30
start: 0
mode: terms
limit: 0
y: -0.05, 1.05
caption: Persistence of a GARCH(1,1) variance shock, $(\alpha+\beta)^{n}$. At the chapter's default $(0.1,0.8)$ the half-life is about $6.6$ steps. Push $\alpha+\beta$ towards $1$ and the shock never dies in any sample you will plot. If the slider combination exceeds $1$, the picture is no longer a stationary GARCH.
:::

## Where this leads

A GARCH residual $r_t/\hat\sigma_t$ is the input to many asset-pricing tests: a factor-model residual that is still clustered needs GARCH (or at least HAC) standard errors, which is one of the practical points of [[time-series/financial-econometrics]]. Stochastic-volatility and realised-volatility models are the natural next step beyond a single GARCH(1,1); so is the multivariate case, in which a covariance $\Sigma_t$ rather than a scalar $\sigma_t^2$ is the object. Option-implied volatilities are a different measurement again, built from a pricing model ([[asset-pricing]] and a derivatives course), and comparing implied to realised is an *econometric* exercise about information sets, not a trade.

::: history
**1963, Benoit Mandelbrot.** Cotton futures changes have heavy tails and clustered large moves; Gaussian i.i.d. increments are the wrong model.

**1965, Eugene Fama.** Daily US stock returns are close to uncorrelated but are not Gaussian.

**1982, Robert Engle.** ARCH: a parametric conditional variance as a function of lagged squares, with an LM test and an MLE. (Nobel prize 2003, shared with Granger.)

**1986, Tim Bollerslev.** GARCH: a parsimonious ARMA-like recursion for $\sigma_t^2$ that fits persistence with two parameters rather than a long ARCH lag.

**1991, Daniel Nelson; 1993, Glosten, Jagannathan and Runkle.** EGARCH and GJR-GARCH, allowing the leverage effect.

**2003, Andersen, Bollerslev, Diebold and Labys.** Realised volatility from high-frequency returns as a measurement, not only a model.
:::

::: summary
- Returns often have small ACF in *levels* and a large ACF in *squares*: volatility clustering ([[#def-condvar]]). This is a stylised fact, not a trading signal.
- ARCH($q$) and GARCH($p,q$) model $\sigma_t^2 = \Var(r_t\mid\mathcal{F}_{t-1})$. GARCH(1,1) is weakly stationary if $\alpha+\beta<1$, with $\E[r_t^2]=\omega/(1-\alpha-\beta)$ ([[#def-garch]], [[#prop-garch-mom]]).
- Persistence is $\alpha+\beta$; half-life $\log 2/|\log(\alpha+\beta)|$. IGARCH ($\alpha+\beta=1$) has no finite unconditional variance.
- QMLE is the default estimator; ARCH-LM is the default pretest. Gaussian intervals under-cover if $z_t$ is heavy-tailed.
- Realised variance sums intraday squares and, with a microstructure correction, measures a day's quadratic variation ([[#def-rv]]). Comparing RV to GARCH $\hat\sigma_t^2$ is forecast evaluation.
- None of these objects is investment advice. A fitted $\sigma_t$ is a number in a model of a stated process.
:::

## Exercises

::: exercise Unconditional variance {level=1 check="0.5"}
For $\omega = 0.05$, $\alpha = 0.10$, $\beta = 0.80$, compute $\E[r_t^2]$. (Enter the variance.)
::: solution
$0.05/(1-0.10-0.80) = 0.05/0.10 = 0.5$.
:::
:::

::: exercise Persistence {level=1 check="0.9"}
In the same GARCH(1,1), what is $\alpha+\beta$? (Enter the sum.)
::: solution
$0.10+0.80 = 0.90$.
:::
:::

::: exercise Half-life {level=2 check="6.58"}
With $\alpha+\beta = 0.9$, compute the half-life $\log(1/2)/\log(\alpha+\beta)$ to two decimals. (Enter the half-life.)
::: solution
$\log 0.5 / \log 0.9 \approx (-0.693147)/(-0.105361) = 6.58$.
:::
:::

::: exercise ARCH-LM decision {level=1}
$TR^2 = 14.76$ with $q = 4$. The 5% $\chi^2_4$ critical value is $9.49$. Do you reject conditional homoskedasticity at 5%?
::: solution
Yes: $14.76 > 9.49$.
:::
:::

::: exercise News impact {level=2}
A GARCH(1,1) has $\omega = 0.05$, $\alpha = 0.10$, $\beta = 0.80$, and $\sigma_{t-1}^2 = 0.50$. Compute $\sigma_t^2$ if $r_{t-1} = 2$ and if $r_{t-1} = 0$.
::: solution
$\sigma_t^2 = 0.05 + 0.10 r_{t-1}^2 + 0.80\times 0.50 = 0.45 + 0.10 r_{t-1}^2$. For $r_{t-1} = 2$, $\sigma_t^2 = 0.45+0.40 = 0.85$. For $r_{t-1} = 0$, $\sigma_t^2 = 0.45$. A two-standard-deviation move (relative to unconditional $\sigma = \sqrt{0.5}\approx 0.71$, so $2$ is a large return) nearly doubles the conditional variance from the quiet-day value.
:::
:::

::: exercise IGARCH {level=2}
If $\alpha+\beta = 1$ and $\omega > 0$, why is $\omega/(1-\alpha-\beta)$ not a variance? What does the $h$-step variance forecast do as $h$ grows, given $\sigma_t^2$ today?
::: solution
The denominator is zero, so the formula is undefined (or infinite). Under IGARCH, $\E[r_{t+h}^2\mid\mathcal{F}_t] = \sigma_{t+h\mid t}^2 = \sigma_t^2 + \omega h$ if $\omega>0$ (a drift in variance), or $=\sigma_t^2$ if $\omega = 0$ (a random walk in variance). Either way the forecast does not revert to a finite mean. Long-horizon intervals keep widening.
:::
:::

::: exercise Fourth-moment bound {level=2}
For Gaussian GARCH(1,1), check whether $(\alpha,\beta) = (0.20, 0.70)$ satisfies the finite-kurtosis condition $3\alpha^2+2\alpha\beta+\beta^2 < 1$. What about $(0.10, 0.80)$?
::: solution
For $(0.20, 0.70)$: $3(0.04)+2(0.14)+0.49 = 0.12+0.28+0.49 = 0.89 < 1$, finite kurtosis. For $(0.10, 0.80)$: $0.03+0.16+0.64 = 0.83 < 1$, also finite, as in [[#ex-halflife]]. (The pair $(0.30, 0.60)$ gives $0.27+0.36+0.36 = 0.99$, on the edge.)
:::
:::

::: exercise Why levels look white {level=3}
Using $r_t = \sigma_t z_t$ with $z_t$ independent of $\mathcal{F}_{t-1}$, $\E[z_t] = 0$ and $\sigma_t$ $\mathcal{F}_{t-1}$-measurable, show that $\E[r_t r_{t-k}] = 0$ for $k \ge 1$. Why does this *not* imply that $r_t^2$ is uncorrelated with $r_{t-k}^2$?
::: solution
$\E[r_t r_{t-k}\mid\mathcal{F}_{t-1}] = \sigma_t r_{t-k}\E[z_t\mid\mathcal{F}_{t-1}] = 0$, so $\E[r_t r_{t-k}] = 0$. For squares, $\E[r_t^2 r_{t-k}^2] = \E[\sigma_t^2 r_{t-k}^2]$, and $\sigma_t^2$ is a function of $r_{t-1}^2, \sigma_{t-1}^2, \ldots$, hence of $r_{t-k}^2$. The product need not factor. Uncorrelated levels and correlated squares live in the same process because correlation is a linear operation and clustering is a statement about a quadratic.
:::
:::

::: exercise Changing the innovation law {level=3}
A one-step 5% Gaussian VaR number is $1.65\sigma_t$. For a standardised $t_5$ (variance $1$), the 5% quantile is approximately $2.02$. By what percentage does the VaR number increase if you switch from Gaussian $z_t$ to $t_5$, holding $\sigma_t$ fixed? What educational point does that make?
::: solution
$2.02/1.65 - 1 \approx 0.224$, a $22\%$ increase. The same GARCH filter, with the same $\sigma_t$, produces a substantially different quantile once the tail law changes. A reported VaR is therefore a joint statement about $(\sigma_t, \text{the law of }z)$, not a measurement of “the” risk. That is a reason to report the innovation assumption, not a reason to pick a number and trade on it.
:::
:::

::: exercise Realised versus GARCH {level=2}
Give two reasons why $\mathrm{RV}_t$ and a GARCH $\hat\sigma_t^2$ estimated from daily returns need not be equal, even if both are “the day's variance”.
::: solution
(1) Information: RV uses intraday returns; GARCH uses only the daily square and a parametric filter of the past. (2) Object: RV estimates quadratic variation of an observed path, including jumps; GARCH $\sigma_t^2$ is a *conditional expectation* $\E[r_t^2\mid\mathcal{F}_{t-1}^{\mathrm{daily}}]$, which does not include the day's realised shock. A Mincer–Zarnowitz $R^2$ well below $1$ is expected, not a failure of either measure.
:::
:::
