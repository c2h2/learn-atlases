A single series rarely answers a macroeconomic question. Did a rise in the policy rate lower output, or did a fall in output cause the central bank to cut? A **vector autoregression** (VAR) treats a small list of series as a joint process, each equation a function of lags of *all* the series, and lets the data speak about lead–lag relations before any simultaneous-equation restriction is imposed. Sims (1980, *Econometrica*) argued that the identifying restrictions in large Keynesian models were “incredible”; the VAR was his alternative reduced form.

This chapter defines the VAR, states the stability condition, estimates it by OLS, tests **Granger causality**, and computes **impulse responses** and **forecast-error variance decompositions**. Moving from the reduced form to a **structural** VAR requires identification: a timing convention (Cholesky), a long-run restriction (Blanchard and Quah 1989), or sign restrictions. Those are extra assumptions, and they are where disagreements in applied work live. Simulated paths below use a known bivariate VAR with NumPy seed $41$. They are not estimates for any real economy, and impulse responses in this chapter are not policy advice.

## The reduced-form VAR

::: definition VAR($p$) {#def-var}
A **vector autoregression** of order $p$ for an $n\times 1$ process $X_t$ is

$$
X_t = c + A_1 X_{t-1} + \cdots + A_p X_{t-p} + \varepsilon_t, \qquad \E[\varepsilon_t] = 0,\ \ \E[\varepsilon_t\varepsilon_t\T] = \Sigma,\ \ \E[\varepsilon_t\varepsilon_s\T] = 0\ (t\neq s).
$$ {#eq-var}

In companion form, $Z_t = \mathbf{c} + \mathbf{A} Z_{t-1} + U_t$ with $Z_t = (X_t\T,\ldots,X_{t-p+1}\T)\T$. The VAR is **stable** (weakly stationary) if every eigenvalue of $\mathbf{A}$ satisfies $|\lambda| < 1$, equivalently if $\det(I - A_1 z - \cdots - A_p z^p) \neq 0$ for all $|z|\le 1$.
:::

A stable VAR has a vector Wold representation $X_t = \mu + \sum_{j=0}^{\infty}\Psi_j\varepsilon_{t-j}$ with $\Psi_0 = I$ and $\Psi_j$ decaying geometrically. Each equation is an ARX: the lag polynomial of the own variable is not, in general, the same thing as a univariate AR, because other variables' lags are present. Univariate ARMA modelling of each component is therefore not a substitute for the system, and it is not implied by it except in special cases (no Granger causality, below).

::: proposition OLS in a stable VAR {#prop-var-ols}
If $\{X_t\}$ is a stable VAR($p$) with i.i.d. innovations of finite fourth moments, then equation-by-equation OLS (which is identical to system OLS, because the regressors are the same in every equation) is consistent and $\sqrt{T}$-asymptotically normal. The asymptotic variance is the usual formula of [[econometrics/multiple-regression]], with $\Sigma$ replacing the scalar $\sigma^2$ in the Kronecker structure. Lag length can be chosen by AIC or BIC on the *system* likelihood, $\mathrm{AIC} = T\log\det\hat\Sigma + 2k$, $k = n(np+1)$.
:::

::: proof
Each equation is a regression of $X_{it}$ on $1, X_{t-1},\ldots,X_{t-p}$. Stability plus finite fourth moments give a [law of large numbers](/a/maths/lesson.php?c=probability&l=limit-theorems) for the sample moment matrix of the lags and a martingale-difference CLT for the score. The algebra is the vector version of OLS in a causal AR. Because the regressors do not differ across equations, GLS and OLS coincide.
:::

If some series are $I(1)$ and not cointegrated, the VAR should be specified in differences; if they are cointegrated, a VEC ([[time-series/cointegration#thm-granger]]) is the restricted levels VAR. An unrestricted levels VAR of $I(1)$ series is still a consistent reduced form (Sims, Stock and Watson 1990), but Wald tests of some hypotheses have non-standard limits and long-horizon impulse responses are imprecise.

::: example A known bivariate VAR, seed 41 {#ex-var-dgp}
The DGP is the stable VAR(1)

$$
\begin{pmatrix} Y_{1t}\\ Y_{2t}\end{pmatrix}
=
\begin{pmatrix} 0.5 & 0.2\\ 0.1 & 0.4\end{pmatrix}
\begin{pmatrix} Y_{1,t-1}\\ Y_{2,t-1}\end{pmatrix}
+
\varepsilon_t,
\qquad
\varepsilon_t \iid \Normal(0, I_2).
$$

The eigenvalues of $A$ are $0.6$ and $0.3$, both inside the unit circle. A sample of length $250$ was drawn with seed $41$; the first $50$ observations were discarded. Equation-by-equation OLS on the remaining $T = 200$ ($199$ lagged observations) gives

$$
\begin{align*}
\hat Y_{1t} &= -0.047 + 0.532\, Y_{1,t-1} + 0.133\, Y_{2,t-1}, &\quad R^2 &= 0.31,\ \hat\sigma_1^2 = 1.041,\\
\hat Y_{2t} &= \phantom{-}0.025 + 0.077\, Y_{1,t-1} + 0.453\, Y_{2,t-1}, &\quad R^2 &= 0.22,\ \hat\sigma_2^2 = 0.811,
\end{align*}
$$

with standard errors $(0.073, 0.059, 0.072)$ on the first equation and $(0.064, 0.052, 0.063)$ on the second. The residual covariance is $\hat\Sigma \approx \bigl(\begin{smallmatrix}1.025 & -0.009\\ -0.009 & 0.799\end{smallmatrix}\bigr)$. The eigenvalues of $\hat A$ are $0.601$ and $0.384$.
::: solution
Every coefficient is within about one standard error of its DGP value except $\hat A_{12} = 0.133$ versus $0.2$ (about one se low) and $\hat A_{22} = 0.453$ versus $0.4$. Off-diagonal residual covariance is essentially zero, matching $\Sigma = I$. Stability is inherited: both estimated eigenvalues lie inside the unit circle. This is what [[#prop-var-ols]] promises at $T = 199$ for a well-separated stable VAR.
:::
:::

::: example A one-step VAR forecast {#ex-var-fcast}
Using the estimated VAR of [[#ex-var-dgp]] and a hypothetical last observation $(Y_{1T}, Y_{2T}) = (1.0,\ -0.5)$, compute the one-step reduced-form forecast $\hat X_{T+1\mid T}$.
::: solution
$$
\begin{align*}
\hat Y_{1,T+1\mid T} &= -0.047 + 0.532(1.0) + 0.133(-0.5) = -0.047 + 0.532 - 0.0665 = 0.418,\\
\hat Y_{2,T+1\mid T} &= \phantom{-}0.025 + 0.077(1.0) + 0.453(-0.5) = 0.025 + 0.077 - 0.2265 = -0.124.
\end{align*}
$$

The one-step error covariance is $\hat\Sigma$. A 95% interval for $Y_1$ that ignored contemporaneous correlation would be $0.418 \pm 1.96\sqrt{1.041} = 0.418 \pm 2.00$; a joint ellipse would use the off-diagonal $-0.009$, which here is negligible. These are reduced-form forecasts, not policy projections.
:::
:::

## Granger causality

::: definition Granger causality {#def-granger}
In a VAR, $X_j$ **does not Granger-cause** $X_i$ if all coefficients on lags of $X_j$ in the $X_i$ equation are zero — equivalently, if $X_j$ does not help to predict $X_i$ once lags of $X_i$ (and of the other variables in the VAR) are included. The restriction is tested by a Wald or $F$ test. In a bivariate VAR(1) the $F$ statistic for “$Y_2$ does not Granger-cause $Y_1$” is the square of the $t$-statistic on $A_{12}$, and more generally, with $p$ lags,

$$
F = \frac{(\mathrm{SSR}_r - \mathrm{SSR}_u)/p}{\mathrm{SSR}_u/(T-k)},
$$

compared with $F_{p, T-k}$ (or $pF$ with $\chi^2_p$ in large samples).
:::

Granger causality is a statement about **prediction in a stated information set**, not about economic causation. If a third variable is omitted, $Y_2$ can Granger-cause $Y_1$ in the bivariate VAR without any structural mechanism from $2$ to $1$. If agents are forward-looking, an effect can precede a cause in calendar time (the “policy anticipates the shock” problem). The test is still worth running: it is a compact description of lead–lag structure, and a block of zeros is a restriction a structural model should respect or explain.

::: example Granger tests, seed 41 {#ex-granger}
On the estimated VAR of [[#ex-var-dgp]], the $F$ test of $A_{12} = 0$ (does $Y_2$ Granger-cause $Y_1$?) is $F(1,196) = 3.44$, $p = 0.065$. The test of $A_{21} = 0$ (does $Y_1$ Granger-cause $Y_2$?) is $F = 2.15$, $p = 0.144$. The 5% critical value of $F(1,196)$ is $3.89$.
::: solution
Neither test rejects at 5%. The DGP has $A_{12} = 0.2$ and $A_{21} = 0.1$, so both directions are present but modest, and $T = 199$ is not enough for 5% rejections. The $p = 0.065$ in the first direction is a near miss matching the slightly larger DGP coefficient. A paper that reported “no Granger causality in either direction” would be using a 5% cutoff on an underpowered test; the honest report is the two $p$-values and the estimated $A$.
:::
:::

::: warning Granger causality is not identification
Finding that “oil prices Granger-cause output” in a bivariate VAR does not identify an oil-supply shock. Oil prices themselves respond to global demand. A structural interpretation needs extra information — a timing assumption, an external instrument, a sign restriction — of the kind discussed below. Conversely, failure to reject Granger non-causality does not prove that a structural coefficient is zero; it may be a power problem, as in [[#ex-granger]].
:::

::: quiz
In a trivariate VAR, $X$ Granger-causes $Y$ in the pair $(X,Y)$ but not once $Z$ is included. What is the most careful reading?
- [ ] $X$ causes $Y$ in the bivariate system and that is the fact that matters
- [x] The bivariate finding was likely an omitted-variable artefact; Granger causality is defined relative to an information set, and $Z$ belongs to a richer one
- [ ] The trivariate VAR is misspecified because adding $Z$ changed a result
- [ ] Causation in the philosophical sense has been disproved
::: solution
Granger's definition is always “given this information set”. Adding $Z$ changed the set, and the bivariate result did not survive. That is a reason to prefer the larger set if $Z$ is a legitimate predictor, not a reason to treat the bivariate finding as more “true” for being simpler. None of this is philosophical causation.
:::
:::

## Impulse responses and variance decompositions

The Wold matrices $\Psi_h$ are the **reduced-form impulse responses**: the $(i,j)$ entry of $\Psi_h$ is the response of $X_{i,t+h}$ to a unit innovation $\varepsilon_{jt}$, holding other reduced-form innovations fixed. They are computed from the recursion $\Psi_0 = I$, $\Psi_h = A_1\Psi_{h-1} + \cdots + A_p\Psi_{h-p}$ (with $\Psi_\ell = 0$ for $\ell < 0$). Because $\Sigma$ is not diagonal in general, a unit $\varepsilon_{jt}$ is not an isolated shock to variable $j$: reduced-form innovations are contemporaneously correlated.

A **Cholesky** (recursive) identification writes $\varepsilon_t = P \eta_t$ with $P$ the lower-triangular Cholesky factor of $\Sigma$, $PP\T = \Sigma$, and $\eta_t$ orthonormal. The **orthogonalised** impulse response is $\Psi_h P$. The ordering of the variables is the identifying assumption: a shock to the first variable is allowed to affect all variables contemporaneously; a shock to the last variable affects only itself contemporaneously.

::: definition Orthogonal IRF and FEVD {#def-irf}
Let $P$ be the Cholesky factor of $\Sigma$ for a stated ordering. The **orthogonal impulse response** at horizon $h$ is $\Theta_h = \Psi_h P$. The **forecast-error variance decomposition** of variable $i$ at horizon $H$ is the share of $\Var(X_{i,t+H}\mid\mathcal{F}_t)$ attributed to shock $j$,

$$
\mathrm{FEVD}_{i\leftarrow j}(H) = \frac{\sum_{h=0}^{H} \Theta_h[i,j]^2}{\sum_{j=1}^{n}\sum_{h=0}^{H} \Theta_h[i,j]^2}.
$$

Shares sum to one across $j$ for each $i$ and $H$.
:::

::: example Cholesky IRFs, seed 41 {#ex-irf}
From [[#ex-var-dgp]], $P = \bigl(\begin{smallmatrix}1.013 & 0\\ -0.009 & 0.894\end{smallmatrix}\bigr)$ (ordering $Y_1$ first). Selected orthogonal IRFs $\Theta_h$:

| $h$ | $\Theta_h[1,1]$ | $\Theta_h[1,2]$ | $\Theta_h[2,1]$ | $\Theta_h[2,2]$ |
|---|---|---|---|---|
| $0$ | $1.013$ | $0$ | $-0.009$ | $0.894$ |
| $1$ | $0.537$ | $0.119$ | $0.074$ | $0.405$ |
| $2$ | $0.295$ | $0.117$ | $0.075$ | $0.193$ |
| $4$ | $0.096$ | $0.060$ | $0.038$ | $0.050$ |
| $8$ | $0.012$ | $0.009$ | $0.006$ | $0.005$ |

The FEVD at $H = 8$ attributes $97.2\%$ of $Y_1$'s forecast-error variance to its own shock and $2.8\%$ to $Y_2$'s shock; for $Y_2$ the own-share is $98.4\%$.
::: solution
Because $\hat\Sigma$ is nearly diagonal, Cholesky is almost the identity scaled by residual standard deviations, and the off-diagonal IRFs are small. Own-shock responses decay geometrically, matching eigenvalues $0.60$ and $0.38$. The FEVD own-shares near $1$ say that, in this DGP and this sample, each series is mostly its own process; the $A_{12}$ and $A_{21}$ channels, though present, do not account for much of either series' variation at an eight-step horizon. A different ordering would barely change the picture here; it would change it a lot if $\hat\Sigma_{12}$ were large.
:::
:::

::: widget plot
f: 1.013*(0.53^x); 0.894*(0.45^x)
x: 0, 12
y: -0.1, 1.1
labels: \Theta_x[1,1]; \Theta_x[2,2]
caption: Schematic own-shock orthogonal IRFs using the seed-$41$ impact and the estimated own-lags as decay rates. Real IRFs also mix the off-diagonal of $\hat A$ (table in [[#ex-irf]]). Both responses die out, as they must in a stable VAR. A unit-root VAR would not die out: the long-run response would stay away from zero.
:::

Confidence bands for IRFs are not optional in applied work. Residual bootstrap (Runkle 1987) and local-projection intervals (Jordà 2005) are the two standard routes; delta-method bands from the OLS covariance of $\mathrm{vec}(\hat A)$ are a third. Point estimates without bands overstate the precision of a hump at horizon $8$.

## Structural identification

The reduced-form VAR does not name shocks. A **structural VAR** (SVAR) writes $B_0 X_t = c + B_1 X_{t-1} + \cdots + B_p X_{t-p} + \eta_t$ with $\E[\eta_t\eta_t\T] = I$ (or diagonal), so $\varepsilon_t = B_0^{-1}\eta_t$ and $\Sigma = B_0^{-1}(B_0^{-1})\T$. Recovering $B_0$ from $\Sigma$ takes $n(n-1)/2$ extra restrictions, because $\Sigma$ has $n(n+1)/2$ free elements and $B_0$ has $n^2$.

Three classical schemes:

- **Recursive (Cholesky).** $B_0^{-1}$ lower triangular: a timing (or causal) ordering. Sims (1980) ordered money last in $\{Y, P, M\}$ so that output and prices do not react to a money shock within the quarter. The ordering is the identifying assumption; it should be argued, not chosen to make a picture look nice.
- **Long-run restrictions.** Blanchard and Quah (1989) identify a “demand” shock as one that does not affect output in the long run, and a “supply” shock as the orthogonal shock that may. The restriction is $\Theta_\infty[i,j] = 0$ for a stated $(i,j)$, a linear restriction on the Wold sum $\Psi(1)P$. It is only as good as the economic claim that a demand shock is long-run neutral.
- **Sign restrictions.** Uhlig (2005) keeps all orthogonalisations whose IRFs have stated signs on stated horizons (a monetary contraction does not raise prices on impact, for example) and reports the set of surviving IRFs. Identification is set-valued; a single line in a figure is a selection, not the identified object.

External instruments (Stock and Watson 2012; Mertens and Ravn 2013) — a series $z_t$ correlated with one structural shock and not with the others — replace $B_0$ restrictions with a relevance-and-exogeneity assumption of the [[econometrics/instrumental-variables]] kind. High-frequency monetary surprises around central-bank announcements are the leading $z_t$. The quality of the SVAR is then the quality of the instrument, which is an empirical question with a date, not a software option.

::: proposition Identification is not testable from $\Sigma$ alone {#prop-id}
Given $\Sigma$, the set of $B_0$ with $B_0^{-1}(B_0^{-1})\T = \Sigma$ is a manifold of dimension $n(n-1)/2$. No further restriction on $B_0$ can be tested from the reduced-form $\Sigma$ without extra information (a restriction that overidentifies, an instrument, a different sample). Recursive, long-run and sign schemes that just-identify cannot be rejected by the VAR likelihood.
:::

::: proof
The Cholesky factor is one point in the set of square roots of $\Sigma$. Any orthogonal $Q$ produces another, $PQ$, and $Q\in O(n)$ has $n(n-1)/2$ free parameters. Just-identifying schemes pick one $Q$. The reduced-form likelihood depends on $(A_1,\ldots,A_p,\Sigma)$ only, so it is flat on that manifold.
:::

::: application Monetary VARs
Christiano, Eichenbaum and Evans (1999) survey recursive monetary VARs: a policy-rate shock identified by ordering the rate after output and prices, and before (or after) monetary aggregates, depending on the information assumption. A recurring anomaly is the **price puzzle** — prices rising after a contractionary shock — which subsequent work has attributed to omitted information (a commodity-price index, a forecast of inflation) rather than to a failure of monetary theory in every sample. The lesson for this chapter is methodological. An IRF is the response to a *named* shock; if the naming is wrong, the picture is a reduced-form fact about $\varepsilon_t$, not a structural fact about policy. It is not a recommendation to raise or cut any rate.
:::

::: intuition Local projections as a check
Jordà's local projection estimates the IRF at horizon $h$ by a direct regression of $X_{t+h}$ on a shock (or on $X_t$) rather than by iterating $\hat A$. In a correctly specified finite VAR the two agree in population. When the VAR is misspecified — too few lags, unnoticed cointegration, a nonlinearity — iterating $\hat A$ compounds the misspecification and local projections (with enough lags in the controls) can be more robust, at the cost of precision. Reporting both is increasingly standard.
:::

## Where this leads

A VAR with a cointegrating restriction is the VEC of [[time-series/cointegration]]; impulse responses then split into transitory responses along $\beta$ and permanent responses along the common trends. A VAR in *squares* of returns is not the right tool for volatility clustering; that is [[time-series/volatility]]. Using a VAR or a set of univariate AR models to test asset-pricing restrictions — predictability regressions, factor-model residuals as a vector — is [[time-series/financial-econometrics]].

Computationally, large $n$ relative to $T$ makes unrestricted OLS unreliable; Bayesian shrinkage (Minnesota prior, Litterman 1986) and factor-augmented VARs (Bernanke, Boivin and Eliasz 2005) are the standard repairs. They change the estimator, not the identification problem.

::: history
**1969, Clive Granger.** The operational definition of causality as incremental predictability.

**1980, Christopher Sims.** “Macroeconomics and reality”: VARs as a less incredible reduced form than large simultaneous-equation models.

**1989, Olivier Blanchard and Danny Quah.** Long-run restrictions to separate transitory and permanent shocks in a bivariate VAR for output and unemployment.

**1990, Christopher Sims, James Stock and Mark Watson.** Inference in VARs with some unit roots: many (not all) tests remain standard.

**2005, Òscar Jordà; 2005, Harald Uhlig.** Local projections, and sign-restricted SVARs, two techniques that now sit alongside Cholesky in applied work.
:::

::: summary
- A VAR($p$) is a linear system in $p$ lags of an $n$-vector. Stability is “all companion eigenvalues inside the unit circle” ([[#def-var]]). OLS equation by equation is consistent under stability ([[#prop-var-ols]]).
- Granger causality is incremental predictability in a stated information set, tested by $F$/Wald, and is not economic identification ([[#def-granger]]).
- Reduced-form IRFs are the Wold coefficients $\Psi_h$. Orthogonal IRFs need $n(n-1)/2$ extra restrictions; Cholesky supplies them by an ordering. FEVDs share out forecast-error variance ([[#def-irf]]).
- Recursive, long-run and sign identifications are not testable from $\Sigma$ alone ([[#prop-id]]). Instruments and overidentifying restrictions are.
- $I(1)$ series, small $T$/large $n$, and omitted variables are the usual ways a VAR is asked a question it cannot answer. Impulse responses are not policy advice.
:::

## Exercises

::: exercise Stability {level=1}
A univariate AR(1) is a $1$-variable VAR(1) with $A_1 = (0.8)$. Is it stable? What if $A_1 = (1.1)$?
::: solution
The eigenvalue is $0.8$, $|0.8|<1$, stable. For $1.1$, $|1.1|>1$, explosive, not stable.
:::
:::

::: exercise Counting restrictions {level=1 check="3"}
For $n = 3$, how many extra restrictions on $B_0$ are needed to just-identify an SVAR from $\Sigma$? (Enter the number.)
::: solution
$n(n-1)/2 = 3$.
:::
:::

::: exercise Granger $F$ in a VAR(1) {level=1}
In a bivariate VAR(1), the $t$-statistic on $A_{12}$ is $1.85$. What is the $F(1, T-k)$ statistic for Granger non-causality of $Y_2$ for $Y_1$, and does it reject at 5% if the critical value is $3.89$?
::: solution
$F = t^2 = 1.85^2 = 3.42$, which is less than $3.89$, so no rejection at 5%. (This is the seed-$41$ first-equation number.)
:::
:::

::: exercise Cholesky zeros {level=2}
With $P$ lower triangular in the ordering $(Y_1, Y_2)$, why is $\Theta_0[1,2] = 0$? What economic timing does that encode?
::: solution
$\Theta_0 = P$, and $P_{12} = 0$ by construction of a lower-triangular Cholesky factor. A shock to $Y_2$ does not affect $Y_1$ *within the period*. That is the identifying assumption: $Y_1$ is predetermined with respect to the $Y_2$ shock at horizon $0$. It is not implied by the data.
:::
:::

::: exercise Companion eigenvalues {level=2}
A VAR(1) has $A = \bigl(\begin{smallmatrix}0.5 & 0.2\\ 0.1 & 0.4\end{smallmatrix}\bigr)$. Compute $\det(A-\lambda I)$ and the eigenvalues.
::: hint
The characteristic polynomial is $\lambda^2 - (\mathrm{tr}\,A)\lambda + \det A$.
:::
::: solution
$\mathrm{tr}\,A = 0.9$, $\det A = 0.20-0.02 = 0.18$, so $\lambda^2 - 0.9\lambda + 0.18 = 0$. Discriminant $0.81 - 0.72 = 0.09$, $\lambda = (0.9\pm 0.3)/2$, hence $\lambda = 0.6$ and $\lambda = 0.3$. Both moduli are less than $1$, so the VAR is stable.
:::
:::

::: exercise FEVD adds up {level=2}
A bivariate FEVD at $H = 4$ gives own-share $0.91$ for variable $1$. What is the share attributed to shock $2$? If at $H = 40$ the own-share has fallen to $0.60$, what has happened?
::: solution
Shares sum to $1$, so shock $2$ has share $0.09$ at $H = 4$. By $H = 40$ more of variable 1's forecast-error variance is attributed to the other shock: the off-diagonal IRF has had time to accumulate. In a stable VAR the FEVD converges to a finite long-run share; in an $I(1)$ VAR the long-run share is dominated by whichever shock has a permanent effect.
:::
:::

::: exercise Omitted third variable {level=2}
True DGP: $Z_t$ Granger-causes both $X_t$ and $Y_t$; $X$ does not Granger-cause $Y$ given $(X,Y,Z)$. A bivariate VAR in $(X,Y)$ finds that $X$ Granger-causes $Y$. Explain without formulae.
::: solution
$Z$ is in the true information set and not in the bivariate one. If $Z$ drives $X$ with a lag and $Y$ with a longer lag (or with a contemporaneous link that the VAR folds into lags), $X$ becomes a proxy for lagged $Z$ in the bivariate system and appears to predict $Y$. Granger causality changed because the information set changed. The bivariate finding is not a property of $(X,Y)$ independent of $Z$.
:::
:::

::: exercise Long-run restriction {level=3}
In a bivariate Blanchard–Quah SVAR, the long-run response of output to a “demand” shock is set to zero. Write that restriction as a statement about $\Psi(1)P$, and state one economic reason it might fail.
::: solution
If output is ordered first and the demand shock is the second structural shock, the restriction is $(\Psi(1)P)_{12} = 0$: the $(1,2)$ element of the long-run MA matrix is zero. It fails if a shock one is willing to call “demand” has a permanent effect on output — hysteresis in unemployment, a permanent productivity effect of a deep recession, or a mis-labelled shock that is partly supply. The restriction is then false and the “supply” IRF absorbs the permanent part of demand.
:::
:::

::: exercise Wald in levels with a unit root {level=3}
Sims, Stock and Watson (1990) showed that some, not all, tests in a levels VAR of $I(1)$ series remain standard. Why is a test of Granger non-causality that involves *only coefficients on $I(0)$ regressors* better behaved than a test of a restriction on a cointegrating combination when $r$ is not imposed?
::: hint
Think about the rates of convergence of OLS on $I(1)$ versus $I(0)$ regressors.
:::
::: solution
Coefficients on stationary regressors (differences, or deviations from cointegrating relations) are $\sqrt{T}$-asymptotically normal even if other regressors are $I(1)$. A Granger test that can be rewritten as a restriction on those coefficients has a $\chi^2$ limit. A restriction that *is* a cointegrating restriction — for example, that a levels combination has coefficient zero when in fact $\beta\neq 0$ — is a restriction on a superconsistent functional and, if $r$ is not imposed, can have a non-standard limit. Practically: difference or VEC the system if you know the integration order; if you run levels, be careful which hypotheses you star.
:::
:::

::: exercise System AIC {level=2 check="2"}
A bivariate VAR is estimated at $p = 1$ and $p = 2$ on $T = 200$. Suppose $\log\det\hat\Sigma$ equals $0.10$ at $p = 1$ and $0.08$ at $p = 2$. Using $\mathrm{AIC} = T\log\det\hat\Sigma + 2k$ with $k = n(np+1)$, which $p$ does AIC pick? (Enter $1$ or $2$.)
::: solution
For $n=2$, $k = 2(2p+1)$: $k_1 = 6$, $k_2 = 10$. $\mathrm{AIC}(1) = 200\times 0.10 + 12 = 32$, $\mathrm{AIC}(2) = 200\times 0.08 + 20 = 36$. AIC picks $p = 1$.
:::
:::
