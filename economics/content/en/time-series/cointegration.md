Two $I(1)$ series wander. A linear combination of them need not. Log consumption and log income in a permanent-income economy, the spot and forward exchange rate under covered interest parity, and the log spot price of a commodity in two locations linked by trade are all pairs that economic theory says should not drift arbitrarily far apart. If they are each $I(1)$ but a combination $\beta_1 X_{1t} + \beta_2 X_{2t}$ is $I(0)$, the pair is **cointegrated**. The levels regression is then not the spurious regression of [[time-series/unit-roots#thm-spurious]]: it estimates the long-run relation. An **error-correction** equation describes the short-run adjustment that keeps the combination from exploding.

Engle and Granger (1987) made this precise, proved that cointegration implies error correction (and conversely), and gave a residual-based test. Johansen (1988, 1991) put the same idea inside a VAR, where the **rank** of a coefficient matrix is the number of cointegrating relations. This chapter develops both procedures. Simulated series below are generated from a known cointegrating pair with a fixed seed. They are not a claim about any particular market, and nothing here is trading or investment advice.

## Cointegration

::: definition Cointegration {#def-coint}
Let $X_t = (X_{1t},\ldots,X_{nt})\T$ be a vector of $I(1)$ series (each series is $I(1)$, and no component is $I(2)$). $X_t$ is **cointegrated** of order $(1,1)$ if there exists a non-zero vector $\beta\in\R^n$ such that $\beta\T X_t$ is $I(0)$. The vector $\beta$ is a **cointegrating vector**. The **cointegrating rank** $r$ is the dimension of the space of such $\beta$; $0 \le r < n$. (If $r = n$ then $X_t$ was $I(0)$ to begin with.)
:::

The cointegrating vector is identified only up to scale: if $\beta$ works, so does $c\beta$. A normalisation $\beta_1 = 1$ is a convenient choice in the bivariate case, converting $\beta\T X_t = X_{1t} - \beta_2 X_{2t}$ into a gap $X_{1t} - \beta_2 X_{2t}$ whose stationarity can be plotted and tested. For $n > 2$ the cointegrating *space* is the identified object; particular vectors in it are identified only with extra restrictions.

::: theorem Granger representation {#thm-granger}
Suppose $X_t$ is $I(1)$ with Wold representation $\Delta X_t = \delta + \Psi(L)\varepsilon_t$, where $\Psi(1)$ has rank $n-r$ and $\varepsilon_t$ is white noise with a positive-definite covariance. Then there exist full-rank matrices $\alpha, \beta$ of size $n\times r$ such that $\beta\T X_t$ is $I(0)$ and $X_t$ has the **vector error-correction** (VEC) representation

$$
\Delta X_t = \delta + \alpha\beta\T X_{t-1} + \sum_{j=1}^{p-1} \Gamma_j \Delta X_{t-j} + \varepsilon_t.
$$ {#eq-vec}

Conversely, a VEC with $0 < r < n$ and $\alpha, \beta$ of rank $r$ generates cointegrated $I(1)$ series. The columns of $\beta$ are cointegrating vectors; the columns of $\alpha$ are **adjustment** (or loading) coefficients.
:::

::: proof
The statement is Engle and Granger (1987, Theorem 2), with the existence of the VAR/VEC form following from invertibility of the Wold polynomial on the cointegrating space. Sketch for $n=2$, $r=1$. Cointegration means $\beta\T\Psi(1) = 0$, so $\Psi(1)$ has a left null vector $\beta$. The Beveridge–Nelson decomposition $X_t = X_0 + \Psi(1)\sum_{s=1}^{t}\varepsilon_s + $ stationary $= \Psi(1)\,(\text{common trend}) + $ stationary shows that $\beta\T X_t$ cancels the common trend. Substituting the inverted AR representation of $\Delta X_t$ and rearranging produces [[#eq-vec]] with $\alpha$ proportional to the residual of that inversion along the cointegrating direction. The converse is direct: $\beta\T X_t$ inherits a stationary ARMA law from [[#eq-vec]] whenever $\alpha\T\beta$ has eigenvalues inside the unit circle of the relevant error-correction dynamics, while each component of $X_t$ remains $I(1)$ if $r < n$.
:::

The error-correction term $\alpha\beta\T X_{t-1}$ is the mechanism. If $X_{1t}$ has drifted above its long-run value against $X_{2t}$, the corresponding element of $\alpha$ (typically negative, under the normalisation $\beta_1 = 1$) pulls $\Delta X_{1t}$ down. There is no need for anyone to “trade the gap”: [[#eq-vec]] is a description of a joint stochastic process, not a strategy.

::: example A bivariate DGP {#ex-dgp}
The simulated pair used below is generated, for $T = 200$ and seed $37$, as

$$
X_t = X_{t-1} + \eta_t, \qquad U_t = 0.4 U_{t-1} + e_t, \qquad Y_t = 1 + 0.8 X_t + U_t,
$$

with $\eta_t \iid \Normal(0,1)$ and $e_t \iid \Normal(0, 0.5^2)$, independent. Then $X_t$ is $I(1)$, $U_t$ is a causal AR(1), and $Y_t$ is $I(1)$ and cointegrated with $X_t$ with $\beta = (1,\ -0.8)\T$ (on the vector $(Y_t, X_t)$). What is the implied error-correction coefficient on the gap $Y_{t-1} - 1 - 0.8 X_{t-1}$ in a regression of $\Delta Y_t$ on that gap and $\Delta X_t$?
::: solution
$Y_t - 1 - 0.8 X_t = U_t$, so the gap is $U_{t-1}$ at lag one. Now $\Delta Y_t = 0.8\Delta X_t + \Delta U_t$ and $\Delta U_t = (0.4-1)U_{t-1} + e_t = -0.6 U_{t-1} + e_t$. Hence

$$
\Delta Y_t = -0.6\,(Y_{t-1} - 1 - 0.8 X_{t-1}) + 0.8\,\Delta X_t + e_t.
$$

The adjustment coefficient on the lagged gap is $-0.6$, and the contemporaneous coefficient on $\Delta X_t$ is $0.8$. Both will be estimated in [[#ex-ecm]].
:::
:::

## Engle–Granger two-step

The residual-based procedure of Engle and Granger (1987) is the applied default in the bivariate case.

::: definition Engle–Granger procedure {#def-eg}
**Step 1.** Estimate the **cointegrating regression**

$$
Y_t = a + b X_t + u_t
$$

by OLS, obtaining residuals $\hat u_t$. (Include a trend if the series have drift and the cointegrating relation is among detrended variables.)

**Step 2.** Test $\hat u_t$ for a unit root by a Dickey–Fuller (or ADF) regression **without** a constant (the OLS residuals have mean zero),

$$
\Delta \hat u_t = \rho \hat u_{t-1} + \sum_{j=1}^{p}\gamma_j \Delta\hat u_{t-j} + e_t.
$$

Rejecting a unit root in $\hat u_t$ is evidence of cointegration. The critical values are **not** the ordinary DF values of [[time-series/unit-roots#def-df]]: OLS estimation of $b$ makes $\hat u_t$ look more stationary than a genuine residual, so the critical values are more negative. MacKinnon (1991) 5% values for a bivariate regression with a constant are about $-3.34$ (asymptotic) to $-3.37$ ($T = 200$).

**Step 3.** If Step 2 rejects, estimate the error-correction model

$$
\Delta Y_t = c + \alpha\,\hat u_{t-1} + \gamma\Delta X_t + \text{lags} + e_t
$$ {#eq-ecm}

by OLS. Under cointegration, OLS on [[#eq-ecm]] is consistent and the usual $t$ tests apply to $\alpha$ and $\gamma$.
:::

OLS in Step 1 is **superconsistent** under cointegration: $\hat b - b = O_p(T^{-1})$, faster than the usual $T^{-1/2}$. That is the blessing. The curse is that the $t$-statistic on $b$ does *not* have a $\Normal(0,1)$ limit unless $\Delta X_t$ is strictly exogenous and a further endogeneity correction is applied (dynamic OLS of Stock and Watson 1993, or FM-OLS of Phillips and Hansen 1990). Reporting OLS standard errors from Step 1 as if they were those of [[econometrics/simple-regression]] is a mistake.

::: example Engle–Granger, seed 37 {#ex-eg}
On the DGP of [[#ex-dgp]], OLS of $y_t$ on a constant and $x_t$ produces

$$
\hat a = 1.087\ (0.077),\qquad \hat b = 0.786\ (0.009),\qquad R^2 = 0.973,\qquad \mathrm{DW} = 1.25.
$$

The residual DF (no constant, no extra lags) is $t_{\rho} = -9.50$ with $\hat\rho = -0.628$. Compare with the true $(a,b) = (1,\ 0.8)$ and with the MacKinnon 5% critical value $-3.37$. The residual sample ACF at lags $1$–$4$ is $0.372,\ 0.064,\ 0.044,\ 0.086$.
::: solution
$\hat b = 0.786$ is within $0.014$ of $0.8$, on $T = 200$; that is the superconsistency at work. The OLS standard error $0.009$ would suggest a $t$ of $(0.786-0.8)/0.009 = -1.5$ against the true value, but that standard error is not to be trusted in the usual way — it happens not to mislead much here because $\Delta x_t$ is close to white noise. $R^2 = 0.97$ is large, as it will be for any two $I(1)$ series that share a trend, cointegrated or not; the distinguishing number is DW $= 1.25$ (residual $\hat\rho_1 \approx 0.37$), far from the spurious-regression DW $\approx 0$ of [[time-series/unit-roots#ex-spurious]]. The residual DF $t_{\rho} = -9.50$ is far to the left of $-3.37$, so we reject a unit root in $\hat u_t$ and conclude cointegration, which is the right decision. Residual ACF after lag $1$ is small, matching the AR(1) error with $\phi = 0.4$.
:::
:::

::: example Error-correction estimates {#ex-ecm}
Continuing from [[#ex-eg]], OLS of $\Delta y_t$ on a constant, $\hat u_{t-1}$ and $\Delta x_t$ produces

$$
\Delta y_t = -0.002 - 0.617\,\hat u_{t-1} + 0.867\,\Delta x_t + \hat e_t,
$$

with standard errors $0.035$, $0.066$, $0.035$ and $t$-statistics $-0.06$, $-9.39$, $25.12$; $R^2 = 0.794$. Compare with the implied coefficients in [[#ex-dgp]].
::: solution
The estimated adjustment $-0.617$ is next to the implied $-0.6$ ($t$ of $-9.39$ against zero: the gap is strongly correcting). The coefficient on $\Delta x_t$ is $0.867$ next to $0.8$ (se $0.035$, so about two standard errors high — ordinary sampling variation). The intercept is a zero. Unlike Step 1, these $t$-statistics *are* asymptotically $\Normal(0,1)$ under cointegration, because every variable in [[#eq-ecm]] is $I(0)$. About $62\%$ of a disequilibrium is estimated to close in one period, consistent with $U_t$ being AR(1) with coefficient $0.4$.
:::
:::

::: widget regression
points: -0.05,0.96; 5.82,6.12; 5.40,4.90; 8.03,7.12; 6.28,5.77; 5.41,6.59; 6.43,5.91; 12.83,11.75; 15.16,14.57; 13.18,11.98; 5.15,5.68; 4.58,5.32; 3.81,4.21
degree: 1
residuals: true
x: -2, 18
y: -1, 17
caption: Thinned scatter of the cointegrated pair in [[#ex-eg]]. Compare with the spurious scatter of [[time-series/unit-roots]]: here the points hug a line of slope near $0.8$, and the residuals (the vertical gaps) are small and mean-reverting rather than themselves a random walk. Drag a point off the line: that is a disequilibrium, which the error-correction equation of [[#ex-ecm]] pulls back.
:::

::: example A gap that is not cointegration {#ex-not-coint}
Suppose $Y_t$ and $X_t$ are independent random walks and an applied worker runs Engle–Granger anyway, obtaining residual DF $t_{\rho} = -1.7$ against a MacKinnon 5% value of $-3.34$, $R^2 = 0.41$ and $\mathrm{DW} = 0.18$. Is $\hat b$ a cointegrating slope?
::: solution
No. Step 2 fails to reject a unit root in the residual, so the sample does not support cointegration. $R^2 = 0.41$ with $\mathrm{DW} = 0.18$ is the spurious-regression pattern of [[time-series/unit-roots#thm-spurious]], not a long-run elasticity. The worker should stop at Step 2 rather than estimate an error-correction coefficient on a non-stationary residual.
:::
:::

::: warning Cointegrating $t$-statistics are not $t$
Software reports a $t$-statistic of $84.6$ on $\hat b = 0.786$ in [[#ex-eg]]. That number uses $s/\sqrt{\sum(x-\bar x)^2}$, the formula from [[econometrics/simple-regression]]. Under cointegration the formula's denominator is the wrong order of magnitude, and under *no* cointegration we are back in [[time-series/unit-roots#thm-spurious]]. Do not star the cointegrating slope from OLS standard errors. Use MacKinnon $p$-values for the residual DF, and if you need an interval for $b$, use DOLS/FM-OLS or Johansen standard errors.
:::

::: quiz
You regress log consumption on log income, both $I(1)$, and obtain $\hat b = 0.97$, residual ADF $t_{\rho} = -2.1$, MacKinnon 5% critical value $-3.34$. What is the right conclusion?
- [ ] The series are cointegrated with elasticity $0.97$, because $\hat b$ is near $1$
- [x] You fail to reject a unit root in the residual, so this sample does not support cointegration at 5%; $\hat b$ is not a cointegrating elasticity on that evidence
- [ ] The series are cointegrated because both are $I(1)$
- [ ] You should difference both series and interpret $0.97$ as a short-run elasticity
::: solution
Step 2 is what decides cointegration, and $-2.1$ is not more negative than $-3.34$. Two $I(1)$ series are not cointegrated just by being $I(1)$; that is the spurious-regression case. Differencing would estimate a short-run elasticity if you want one, but it would not salvage a long-run claim that the residual DF has failed to support. (A Johansen test, or a longer sample, might; the report should say what was run.)
:::
:::

## Johansen's VAR approach

Engle–Granger has two limitations that become painful as soon as $n > 2$: the result can depend on which variable is on the left of Step 1, and it estimates at most one cointegrating vector. Johansen's procedure treats all $n$ series symmetrically inside a VAR of order $p$,

$$
\Delta X_t = \Pi X_{t-1} + \sum_{j=1}^{p-1}\Gamma_j\Delta X_{t-j} + \delta + \varepsilon_t, \qquad \Pi = \alpha\beta\T,
$$ {#eq-joh}

and tests the **rank** of $\Pi$.

::: definition Johansen trace and max-eigenvalue tests {#def-johansen}
Under Gaussian $\varepsilon_t$, the Gaussian MLE of [[#eq-joh]] subject to $\operatorname{rank}(\Pi) = r$ is a reduced-rank regression (Johansen 1988). The **trace** statistic for $H_0{:}\, r \le r_0$ against $r > r_0$ and the **maximum-eigenvalue** statistic for $H_0{:}\, r = r_0$ against $r = r_0+1$ are functions of the eigenvalues of that reduced-rank problem. Their limiting distributions are functionals of Brownian motion, tabulated by Osterwald-Lenum (1992) and MacKinnon, Haug and Michelis (1999), and they depend on the specification of deterministic terms (constant inside the cointegrating relation, extra drift outside, trend in the relation). For $n = 2$, a constant in the relation and no extra trend, the 5% trace critical value for $H_0{:}\, r = 0$ is about $15.5$, and for $H_0{:}\, r \le 1$ about $3.8$.
:::

The practical sequence is to test $r = 0$, then $r \le 1$, then $r \le 2$, stopping at the first non-rejection. Estimated $\beta$ (identified by a normalisation) is superconsistent; estimated $\alpha$ and the short-run $\Gamma_j$ are $\sqrt{T}$-consistent with usual $t$ tests. Restrictions on $\beta$ — a unit coefficient, a zero restriction, a homogeneity restriction $\beta_1 + \beta_2 = 0$ — are tested by likelihood ratio against a $\chi^2$ limit, which is one of the method's advantages over Engle–Granger.

Deterministic terms are, as in ADF, part of the hypothesis. Johansen's “intercept in the cointegrating relation, no linear trend in $\Delta X_t$” is the usual choice for series that have a non-zero mean gap but no drift in differences (interest rates, log ratios). Series with drift (log GDP, log prices) need a constant *outside* the cointegrating relation as well. Putting a trend in $\beta\T X_t$ is a last resort, and it changes the critical values.

::: proposition Reduced rank and common trends {#prop-rank}
In [[#eq-joh]], $\operatorname{rank}(\Pi) = r$ if and only if there are $r$ cointegrating relations and $n-r$ **common trends** (independent stochastic trends shared by the system). In particular $r = 0$ is a VAR in differences (no cointegration) and $r = n-1$ is a single common trend.
:::

::: proof
$\Pi = \alpha\beta\T$ with $\alpha, \beta$ of rank $r$ is the definition of rank $r$. The Beveridge–Nelson common-trend representation has $n-r$ independent random walks, the number of zero eigenvalues of $\Psi(1)$, and $\beta\T\Psi(1) = 0$ gives the $r$ left-null vectors. The boundary cases are: $r = 0 \Rightarrow \Pi = 0 \Rightarrow$ no levels term, a VAR in $\Delta X_t$; $r = n \Rightarrow X_t$ is $I(0)$, which contradicts the maintained $I(1)$ modelling of [[#eq-joh]] and is tested separately by ADF on the individual series.
:::

::: application Money demand
A once-standard application is a cointegrating relation among log real money, log real income and a nominal interest rate, $\beta\T X_t = m_t - p_t - \beta_y y_t - \beta_i i_t$. Engle and Granger (1987) and Johansen and Juselius (1990, Danish data) are the original empirical papers. Subsequent samples — US M1 after the 1980s, several inflation-targeting emerging markets — have been less kind to a stable $\beta$, which is itself information: cointegration is a property of a process over a sample, and a financial innovation or a regime change can end it. A broken cointegrating relation is not a reason to “trade the gap” that the old $\beta$ still prints.
:::

::: widget plot
f: alpha*x
sliders: alpha=-0.6:-1:-0.05:0.05
x: -2, 2
y: -2, 2
labels: \alpha\, u_{t-1}
caption: Error-correction as a function of the lagged gap $u_{t-1} = z$. With $\alpha < 0$ and the normalisation $\beta_1 = 1$, a positive gap (left-hand variable above its long-run value) produces a negative $\Delta Y$ next period. Drag $\alpha$ towards $0$: adjustment becomes sluggish, and in finite samples the residual DF in [[#def-eg]] loses power. At $\alpha = 0$ there is no cointegration.
:::

## Evidence and caveats

Cointegration is an empirical claim about a specified sample, a specified lag length, and a specified treatment of deterministic terms. Classic supporting findings include the cointegration of spot and forward exchange rates at short horizons (covered interest parity, subject to the CIP deviations documented after 2008 by Du, Tepper and Verdelhan 2018, *Journal of Finance*), and the cointegration of long and short interest rates in many countries in some, not all, monetary regimes (the expectations hypothesis as a cointegrating restriction; Campbell and Shiller 1987). Classic fragile findings include money demand, as above, and some income–consumption pairs once a break in the saving rate is allowed.

Small-sample size distortions of Johansen's tests are well documented (Toda 1995; Cheung and Lai 1993): with $T = 80$ and $n = 4$, a lag-heavy VAR over-rejects $r = 0$. Reinsel and Ahn (1992) small-sample corrections, or a bootstrap of the trace statistic (Cavaliere, Rahbek and Taylor 2012), are used for a reason. Engle–Granger, for its part, has low power when $\alpha$ is close to zero — slow adjustment looks like no cointegration.

$I(2)$ series (the *level* of a price index that has to be differenced twice, in some samples) break both procedures; they need a dedicated $I(2)$ cointegration analysis (Johansen 1995) that this chapter does not develop.

## Where this leads

A VEC is a VAR with a levels restriction; the next chapter develops unrestricted VARs, impulse responses and Granger causality, and notes how those objects change when cointegration is imposed rather than ignored. In finance, the present-value relation between prices and dividends is a cointegrating restriction if log prices and log dividends are $I(1)$ ([[time-series/financial-econometrics]], [[asset-pricing/market-efficiency]]); whether they are is disputed, and the dispute is about samples and tests, not about a trading rule.

::: history
**1981, Clive Granger.** The word “cointegration” and the observation that a VAR in differences is misspecified if the series are cointegrated.

**1987, Robert Engle and Clive Granger.** Definition, Granger representation theorem, residual-based test, and the two-step estimator. (The paper, with Engle's ARCH paper, was cited in the 2003 Nobel prize.)

**1988, 1991, Søren Johansen.** Likelihood analysis of cointegration in a VAR: rank tests, MLE of $\beta$, and hypothesis tests on $\alpha$ and $\beta$.

**1990, 1993, Peter Phillips and Bruce Hansen; James Stock and Mark Watson.** FM-OLS and dynamic OLS, giving asymptotically mixed-normal inference on $\beta$ in single-equation cointegrating regressions.

**1991, James MacKinnon.** Response-surface critical values for residual-based cointegration tests, still the default in software.
:::

::: summary
- Cointegration: $I(1)$ series with an $I(0)$ linear combination. The cointegrating rank $r$ is the dimension of that space ([[#def-coint]]).
- Granger's representation: cointegration $\Leftrightarrow$ a VEC $\Delta X_t = \alpha\beta\T X_{t-1} + \cdots$ ([[#thm-granger]]). The gap $\beta\T X_{t-1}$ is the error-correction term; $\alpha$ is the adjustment.
- Engle–Granger: OLS in levels, DF on residuals with MacKinnon critical values, then an $I(0)$ error-correction regression ([[#def-eg]]). Superconsistency of $\hat b$ does not license OLS $t$ tests on $\hat b$.
- Johansen: reduced-rank MLE in a VAR, trace and max-eigenvalue tests of $r$, with critical values that depend on deterministic terms ([[#def-johansen]], [[#prop-rank]]).
- Both procedures are sample-and-specification specific. Slow adjustment, breaks, $I(2)$ and small $T$ with large $n$ all produce misleading ranks. None of this is a trading signal.
:::

## Exercises

::: exercise Normalisation {level=1 check="1.25"}
If $(1,\ -1.25)$ is a cointegrating vector for $(Y_t, X_t)$, what slope $b$ appears in the cointegrating regression $Y_t = a + b X_t + u_t$? (Enter $b$.)
::: solution
$\beta\T (Y_t, X_t) = Y_t - 1.25 X_t$ is $I(0)$, which is the residual of $Y_t = a + 1.25 X_t + u_t$. So $b = 1.25$.
:::
:::

::: exercise Rank bounds {level=1}
If $X_t$ is a $4$-vector of $I(1)$ series, what are the possible cointegrating ranks $r$?
::: solution
$r \in \{0,1,2,3\}$. Rank $4$ would mean $X_t$ is $I(0)$.
:::
:::

::: exercise MacKinnon versus DF {level=1}
A residual DF $t_{\rho}$ equals $-3.00$. Ordinary DF 5% (no constant) is $-1.95$; MacKinnon EG 5% (bivariate, constant) is $-3.34$. Do you reject a unit root in the residual at 5% by the correct critical value?
::: solution
No. The correct comparison is with $-3.34$, and $-3.00$ is not more negative. Using $-1.95$ would wrongly reject. This is the bias [[#def-eg]] warns about.
:::
:::

::: exercise Superconsistency rate {level=2}
OLS in a cointegrating regression satisfies $\hat b - b = O_p(T^{-1})$. OLS in a stationary regression satisfies $\hat b - b = O_p(T^{-1/2})$. By what factor does the cointegrating rate improve at $T = 100$ relative to the stationary rate, in the big-$O$ sense of powers of $T$?
::: solution
The ratio of the rates is $T^{-1}/T^{-1/2} = T^{-1/2} = 0.1$ at $T = 100$: the cointegrating error is of a smaller order of magnitude by a factor of $10$ in this counting. (Constants in the $O_p$ can undo some of that in a given sample; the seed-$37$ error of $0.014$ on $b = 0.8$ is the actual finite-sample number.)
:::
:::

::: exercise Error-correction sign {level=2}
In $\Delta y_t = \alpha (y_{t-1} - 0.8 x_{t-1}) + \cdots$ with $y$ normalised as the left-hand variable, what sign of $\alpha$ produces mean-reverting gaps? If $\alpha = -0.6$, what fraction of a gap remains after two periods, holding $x$ fixed?
::: solution
A positive gap should lower $y$, so $\alpha < 0$. With $x$ fixed, the gap $g_t$ obeys $g_t = (1+\alpha) g_{t-1} = 0.4 g_{t-1}$. After two periods, $0.4^2 = 0.16$ of the original gap remains.
:::
:::

::: exercise Trace sequence {level=2}
A bivariate Johansen trace test gives $21.4$ for $H_0{:}\, r = 0$ (5% critical $15.5$) and $2.1$ for $H_0{:}\, r \le 1$ (5% critical $3.8$). What rank do you select?
::: solution
Reject $r = 0$, fail to reject $r \le 1$, so $\hat r = 1$: one cointegrating relation and one common trend.
:::
:::

::: exercise Which variable on the left {level=2}
In a bivariate system, Engle–Granger of $y$ on $x$ rejects no-cointegration but $x$ on $y$ does not, at 5%. What has gone wrong, and what method avoids the conflict?
::: solution
The residual DF's power depends on which series is the more weakly adjusting one. If $x$ does most of the adjusting, putting $x$ on the left (so $\alpha_x$ is large and $\alpha_y$ is near zero) is the more powerful direction; the other direction can fail to reject. Johansen's reduced-rank MLE treats both series symmetrically and estimates the space, not a single left-hand variable.
:::
:::

::: exercise From VEC to common trends {level=3}
A bivariate VEC has $\alpha = (-0.3,\ 0.1)\T$ and $\beta = (1,\ -2)\T$. Verify that $\Pi = \alpha\beta\T$ has rank $1$, write $\Pi$ explicitly, and interpret $\alpha_2 = 0.1$.
::: hint
$\Pi$ is the outer product $\alpha\beta\T$.
:::
::: solution
$$
\Pi = \begin{pmatrix}-0.3\\ 0.1\end{pmatrix}\begin{pmatrix}1 & -2\end{pmatrix} = \begin{pmatrix}-0.3 & 0.6\\ 0.1 & -0.2\end{pmatrix}.
$$

The second row is $-\tfrac13$ of the first, so rank $1$. The gap is $y - 2x$. When the gap is positive, $\Delta y$ has coefficient $-0.3$ ( $y$ falls) and $\Delta x$ has coefficient $0.1$ ( $x$ rises), both of which close a gap $y-2x$. The second series shares the adjustment; it is not weakly exogenous for $\beta$.
:::
:::

::: exercise Weak exogeneity {level=3}
In [[#eq-vec]], $X_{2t}$ is **weakly exogenous** for $\beta$ if the corresponding block of $\alpha$ is zero ( $X_2$ does not adjust). Why does that restriction let you estimate $\beta$ from a single equation for $X_1$, and why is it testable in Johansen's framework?
::: solution
If $\alpha_2 = 0$, the equation for $\Delta X_{2t}$ does not involve $\beta\T X_{t-1}$, so the likelihood factors and the MLE of $\beta$ is the single-equation (Engle–Granger or DOLS) estimator from the $X_1$ equation. The restriction $\alpha_2 = 0$ is a linear restriction on $\alpha$, tested by LR against $\chi^2$ in the Johansen system. Rejecting it means $X_2$ adjusts and single-equation estimation of $\beta$ is inefficient (and, if you also condition incorrectly, potentially misleading about adjustment speeds).
:::
:::

::: exercise Residual ADF with lags {level=2 check="-3.37"}
For a bivariate cointegrating regression with a constant and $T = 200$, what MacKinnon 5% critical value (to two decimals, conventional textbook rounding) should be used for the residual ADF? (Enter the critical value as a negative number.)
::: solution
About $-3.37$ (MacKinnon 1991 response surface for $T = 200$; the asymptotic value is $-3.34$). Ordinary DF $-1.95$ or $-2.86$ would be wrong.
:::
:::
