OLS needs $\E(u \mid x) = 0$. When that fails, $\hat\beta_1$ is consistent for a linear projection, not for the ceteris paribus effect in $y = \beta_0 + \beta_1 x + u$. Three mechanisms, already named in [[econometrics/economic-data]], produce the failure: an omitted confounder, reverse causality (or simultaneity), and measurement error in $x$. **Instrumental variables** (IV) replace the endogenous $x$ with a **exogenous shifter** $z$ that moves $x$ and does not belong in the $y$ equation. The IV estimator is then a ratio of covariances, or, with several instruments and regressors, **two-stage least squares** (2SLS): $\hat{\boldsymbol\beta}_{\mathrm{2SLS}} = (X\T P_Z X)^{-1} X\T P_Z \mathbf{y}$. This chapter states the conditions, derives the estimators, diagnoses weak instruments, and sketches the local average treatment effect that [[causal-inference/iv-and-late]] develops in full.

## Endogeneity

::: definition Endogeneity {#def-endogenous}
A regressor $x$ is **endogenous** in $y = \beta_0 + \beta_1 x + u$ if $\Cov(x, u) \ne 0$, and **exogenous** if $\Cov(x, u) = 0$. Under endogeneity the OLS slope has probability limit $\beta_1 + \Cov(x,u)/\Var(x)$, which is not $\beta_1$.
:::

The three classical sources:

**Omitted variables.** Ability in a wage–schooling equation: $\Cov(s, u) > 0$ if $u$ contains ability, so OLS overstates $\beta_1$ ([[econometrics/multiple-regression#thm-ovb]]).

**Simultaneity.** Price and quantity in a market: the scatter is the cloud of equilibria. OLS of quantity on price is neither a demand slope nor a supply slope. A demand shifter (income, a preference shock) that does not belong in supply can trace out the supply curve, and vice versa — Working's and Haavelmo's identification problem.

**Measurement error.** If we observe $\tilde x = x + e$ with $e$ classical (uncorrelated with $x$ and $u$), OLS of $y$ on $\tilde x$ is biased toward zero: the **attenuation** bias is $-\beta_1 \sigma_e^2 / (\sigma_x^2 + \sigma_e^2)$. Years of schooling reported in a survey are noisy; OLS returns-to-schooling estimates are pulled down, which can offset ability bias in either direction.

::: example OLS with a correlated error, seed 17 {#ex-ols-endog}
Draw $n = 100$ from $y = 2 + 1\cdot x + u$ and $x = 3 + 0.8 z + 0.6 u + v$, with $z, u, v$ independent standard normals, using `numpy.random.default_rng(17)`. Compute OLS of $y$ on $x$, and the sample correlations of $(x, u)$ and $(z, u)$.
::: solution
OLS gives $\hat y = 1.111 + 1.355 x$. The slope overshoots $1$ because $\widehat{\Corr}(x, u) = 0.46$: the $0.6 u$ in the $x$ equation is simultaneity (or omitted-variable bias, depending on the story). $\widehat{\Corr}(z, u) = -0.06$, consistent with the design $\Cov(z, u) = 0$, and $\widehat{\Corr}(z, x) = 0.62$, so $z$ moves $x$. Those two facts — $z$ uncorrelated with $u$, $z$ correlated with $x$ — are the IV assumptions.
:::
:::

## The IV estimator

::: definition Instrument {#def-iv}
A variable $z$ is a **valid instrument** for $x$ in $y = \beta_0 + \beta_1 x + u$ if it satisfies

1. **Exogeneity (exclusion):** $\Cov(z, u) = 0$, equivalently $z$ does not belong in the $y$ equation except through $x$;
2. **Relevance:** $\Cov(z, x) \ne 0$.

With an intercept, the **IV estimator** is

$$
\hat\beta_{1,\mathrm{IV}} = \frac{\sum_i (z_i - \bar z)(y_i - \bar y)}{\sum_i (z_i - \bar z)(x_i - \bar x)} = \frac{\widehat{\Cov}(z,y)}{\widehat{\Cov}(z,x)}, \qquad \hat\beta_{0,\mathrm{IV}} = \bar y - \hat\beta_{1,\mathrm{IV}}\bar x.
$$ {#eq-iv}

In matrix form, with $Z$ the $n \times 2$ matrix of $(1, z)$ and $X$ the matrix of $(1, x)$, $\hat{\boldsymbol\beta}_{\mathrm{IV}} = (Z\T X)^{-1} Z\T\mathbf{y}$ when $Z$ and $X$ have the same number of columns (**just-identified** IV).
:::

::: theorem Consistency of IV {#thm-iv-cons}
Under [[#eq-iv]]'s two conditions, random sampling, and finite second moments with $\Cov(z,x) \ne 0$, $\hat\beta_{1,\mathrm{IV}} \to_p \beta_1$. OLS is consistent only if in addition $\Cov(x,u) = 0$. IV is not unbiased in finite samples.
:::

::: proof
Write $y - \bar y = \beta_1 (x - \bar x) + (u - \bar u)$. Then $\widehat{\Cov}(z,y) = \beta_1 \widehat{\Cov}(z,x) + \widehat{\Cov}(z,u)$. Divide by $\widehat{\Cov}(z,x)$ and take probability limits: $\operatorname{plim}\widehat{\Cov}(z,u) = \Cov(z,u) = 0$ and $\operatorname{plim}\widehat{\Cov}(z,x) = \Cov(z,x) \ne 0$, so $\operatorname{plim}\hat\beta_{1,\mathrm{IV}} = \beta_1$. Unbiasedness fails because we divide by a random $\widehat{\Cov}(z,x)$; the expectation of a ratio is not the ratio of expectations, and with a weak first stage the ratio can be wild.
:::

Exclusion is a substantive claim, not a testable one in the just-identified case: we have used up the moment $\E(z u) = 0$ to estimate $\beta_1$. Relevance *is* testable: it is the $t$ (or $F$) statistic in the **first-stage** regression of $x$ on $z$.

::: example A Wald IV by hand {#ex-wald}
Ten people are assigned an offer $z \in \{0,1\}$. Among the five with $z = 1$, mean $y$ is $6$ and mean $x$ is $0.8$; among the five with $z = 0$, mean $y$ is $4$ and mean $x$ is $0.4$. The Wald IV slope is $(6-4)/(0.8-0.4) = 5$. OLS of $y$ on $x$ would use the individual $(x_i, y_i)$ pairs and, if $x$ is endogenous, would not equal $5$.
::: solution
[[#eq-iv]] with a dummy $z$ reduces to the ratio of mean differences (the Wald formula proved in the last exercise). Here the offer raises $x$ by $0.4$ and $y$ by $2$, so each unit of $x$ induced by the offer is associated with $5$ units of $y$. That is an IV slope, not an OLS slope: OLS would weight all variation in $x$, including the variation that is correlated with $u$.
:::
:::

::: example IV on the simulated sample {#ex-iv}
For the data of [[#ex-ols-endog]], compute $\hat\beta_{1,\mathrm{IV}}$ and the first-stage regression of $x$ on $z$.
::: solution
$\widehat{\Cov}(z,y)/\widehat{\Cov}(z,x) = 0.926$. In matrix form, $(Z\T X)^{-1}Z\T\mathbf{y} = (2.276,\ 0.926)\T$. The first stage is $\hat x = 2.816 + 0.759 z$, with $R^2 = 0.384$ and $F = 61.2$ ($n = 100$, one excluded instrument). The first stage is strong: $F$ far above the rule of thumb of $10$ discussed below. IV has pulled the slope from the OLS $1.355$ toward the true $1$, and in this draw a little past it. Reproducing the calculation:

```python
Z = np.column_stack([np.ones(n), z])
X = np.column_stack([np.ones(n), x])
b_iv = np.linalg.inv(Z.T @ X) @ Z.T @ y
pi = np.linalg.inv(Z.T @ Z) @ Z.T @ x   # first stage
```
:::
:::

::: widget plot
f: 1.111+1.355*x; 2.276+0.926*x; 2+1*x
x: 0, 6
y: 0, 12
labels: \text{OLS}; \text{IV}; \text{true}
caption: OLS, IV and the true line for [[#ex-ols-endog]]. OLS is steeper because $x$ shares the shock $u$. IV uses only the variation in $x$ that $z$ produces, which is uncorrelated with $u$ by construction, and lands near the true slope. In a sample where $z$ barely moves $x$, the IV line would swing wildly.
:::

::: warning Exclusion is not "z is uncorrelated with x"
Relevance *is* $\Corr(z,x) \ne 0$. Exclusion is $\Corr(z,u) = 0$. A variable that is highly correlated with $x$ is a tempting instrument and often a bad one: it is correlated with $x$ *because* it belongs in $u$ (another outcome, a proxy for the confounder). The first-stage $F$ does not certify exclusion. Exclusion is an economic argument — a story about why $z$ shifts $x$ and why it does not shift $y$ except through $x$.
:::

## Two-stage least squares

With $k$ endogenous regressors we need at least $k$ instruments. Extra instruments over-identify the model and can be used to improve precision and to test exclusion.

::: theorem Two-stage least squares {#thm-2sls}
Let $X$ be $n \times (k+1)$ (including the intercept and any exogenous regressors) and let $Z$ be $n \times (m+1)$ with $m \ge k$, containing the exogenous regressors and the **excluded instruments**. Let $P_Z = Z(Z\T Z)^{-1}Z\T$. The **2SLS** estimator is

$$
\hat{\boldsymbol\beta}_{\mathrm{2SLS}} = (X\T P_Z X)^{-1} X\T P_Z \mathbf{y}.
$$ {#eq-2sls}

It equals OLS of $\mathbf{y}$ on $\hat X = P_Z X$, the fitted values from the first-stage regressions of each column of $X$ on $Z$. When $m = k$ (just identified), 2SLS equals IV, $(Z\T X)^{-1}Z\T\mathbf{y}$. Under relevance ($\operatorname{plim} n^{-1} Z\T X$ full rank $k+1$), exclusion ($\E(z_{ij} u_i) = 0$), and standard moments, 2SLS is consistent for $\boldsymbol\beta$.
:::

::: proof
The moment conditions are $\E(Z\T\mathbf{u}) = \mathbf{0}$. Substituting $\mathbf{u} = \mathbf{y} - X\boldsymbol\beta$ and replacing the expectation by a sample average gives the linear GMM estimator with weight $(Z\T Z)^{-1}$, which is 2SLS. The two-stage reading: $P_Z X$ is the projection of $X$ onto $\operatorname{Col}(Z)$, hence exogenous under exclusion; OLS of $\mathbf{y}$ on that projection is consistent by the usual argument, because $\operatorname{plim} n^{-1}\hat X\T\mathbf{u} = 0$. When $m = k$, $P_Z X$ and $Z$ span the same space (if $Z\T X$ is invertible), so 2SLS $= (Z\T X)^{-1}Z\T\mathbf{y}$.
:::

**Do not** compute the second-stage standard errors from OLS of $y$ on $\hat X$ as if $\hat X$ were the original data: that ignores the first-stage estimation. The 2SLS residual is $y - X\hat{\boldsymbol\beta}_{\mathrm{2SLS}}$ (using $X$, not $\hat X$), and the asymptotic variance is a sandwich with those residuals. Heteroskedasticity-robust and clustered versions exist, of the same shape as in [[econometrics/heteroskedasticity]].

Exogenous regressors that belong in the $y$ equation (controls) belong in $Z$ as well as in $X$. Excluding a control from $Z$ while including it in $X$ makes 2SLS try to instrument the control, which is not the intention.

::: quiz
2SLS is run with one endogenous $x$ and two excluded instruments. The first-stage $F$ on the two instruments is $3.2$. Which concern is the most immediate?
- [ ] Overidentification: there are too many instruments.
- [x] Weak instruments: the instruments barely move $x$, so 2SLS can be badly biased toward OLS and have a non-normal sampling distribution.
- [ ] Exclusion must fail, because $F$ is small.
- [ ] 2SLS is inconsistent whenever $m > k$.
::: solution
$m > k$ is overidentification, which is a chance to test exclusion (Sargan/Hansen) and is not by itself a problem. A small first-stage $F$ is the weak-instrument problem; it does not speak to exclusion. 2SLS remains consistent, in large samples, when $m \ge k$ and the instruments are strong and valid.
:::
:::

## Weak instruments and overidentification

If $\Cov(z,x)$ is close to zero, the denominator of [[#eq-iv]] is close to zero, IV has huge variance, and in finite samples it is biased toward OLS. Staiger and Stock (1997) suggested treating a first-stage $F$ below $10$ as a warning; Stock and Yogo (2005) tabulated more precise thresholds that depend on the number of instruments and on how much bias one will tolerate. With many weak instruments the problem is worse, not better.

A **rule of thumb**, not a theorem: inspect the first-stage $F$ on the *excluded* instruments. If it is below $10$ (or below the Stock–Yogo line), do not trust the usual 2SLS $t$ statistic. Robust alternatives include Anderson–Rubin confidence sets, which invert a test that is valid even when the instrument is arbitrarily weak, and limited-information maximum likelihood (LIML).

When $m > k$, the **Sargan test** (homoskedastic) or **Hansen $J$ test** (robust) of overidentifying restrictions asks whether the $m+1$ moment conditions $\E(z_j u) = 0$ are jointly compatible with a single $\boldsymbol\beta$. The statistic is $n R^2$ from a regression of the 2SLS residuals on $Z$, asymptotically $\chi^2_{m-k}$ under the null that *all* instruments are valid. Rejection means at least one instrument is invalid — or the model is otherwise misspecified. **Non-rejection does not prove validity**: if all instruments fail exclusion in the same way, $J$ will not notice.

::: example Overidentified 2SLS, seed 17 {#ex-overid}
Draw $n = 100$ from $y = 2 + 1\cdot x + u$ and $x = 3 + 0.5 z_1 + 0.4 z_2 + 0.6 u + v$, with $z_1, z_2, u, v$ independent standard normals, using `numpy.random.default_rng(17)`. Estimate 2SLS using $Z = (1, z_1, z_2)$, and compute Sargan's $n R^2$.
::: solution
2SLS gives $\hat{\boldsymbol\beta} = (1.650,\ 1.043)\T$. The slope is close to the true $1$. The 2SLS residuals, regressed on $Z$, produce $n R^2 = 0.22$, which is $\chi^2_1$ with $p = 0.64$: we do not reject, as we should not, because both instruments are valid by construction. The first-stage $F$ on the two excluded instruments is $14.5$, above the rule of thumb of $10$. In observational data a non-rejection of Sargan is a necessary condition, not a sufficient one: if both instruments failed exclusion in the same way, $J$ would not notice.
:::
:::

## LATE, a preview

When $x$ is a dummy treatment and $z$ is a dummy instrument (an offer, a lottery, a legal threshold), IV estimates the **local average treatment effect** (LATE) on **compliers**: people whose treatment status is shifted by $z$ (Imbens and Angrist, 1994). It does not estimate the average effect on the whole population, nor on the always-takers. Quarter of birth, as an instrument for schooling (Angrist and Krueger, *QJE* 1991), shifts schooling for people constrained by compulsory-attendance laws, not for everyone. That is why IV estimates of the return to schooling are often *larger* than OLS, against the naive ability-bias prediction: the local effect for compliers can exceed the population average, and OLS is also attenuated by measurement error. The full LATE argument — monotonicity, the exclusion restriction in potential-outcome form — is [[causal-inference/iv-and-late]].

::: application Compulsory schooling
Angrist and Krueger (1991) used quarter of birth as $z$ for years of school $x$ in a log-wage equation, because children born at the start of the year reach the legal dropout age with less school than children born at the end. The first stage is small (a fraction of a year) but, in a huge Census sample, precise. Subsequent work (Bound, Jaeger and Baker, 1995) showed that a weak first stage plus many quarter-of-birth $\times$ state $\times$ year instruments can resurrect OLS bias — the weak-instrument lesson in a famous application. The design remains a canonical illustration of exclusion (season of birth should not affect wages except through school) being an argument, and a contested one (season of birth correlates with health and with family background).
:::

::: history
**1928, Philip Wright; 1944, Trygve Haavelmo; 1991, Joshua Angrist and Alan Krueger.** Wright's appendix to *The Tariff on Animal and Vegetable Oils* stated the IV formula as a way of tracing demand and supply. Haavelmo's probability approach made the simultaneity problem a statistical one. Angrist and Krueger's quarter-of-birth study, and Imbens and Angrist's LATE theorem (1994), recast IV as a research design for causal effects rather than as a correction for "the" endogenous regressor, and set the agenda of [[causal-inference/potential-outcomes]].
:::

## Where this leads

IV is the last estimator of this course and the first of the next. [[causal-inference/iv-and-late]] takes the dummy-treatment, dummy-instrument case to LATE, weak-instrument robust inference, and the critique of invalid exclusion. [[causal-inference/difference-in-differences]] and [[causal-inference/regression-discontinuity]] are two other designs that, like a good instrument, produce variation in $x$ that is as good as random for a defined population. Panel FE ([[econometrics/panel-data]]) and IV are complements: FE-IV uses a time-varying instrument after $a_i$ has been differenced out. Time-series IV, with lags as instruments, is a different and more dangerous game ([[time-series/stationarity]]).

::: summary
- $x$ is endogenous when $\Cov(x,u) \ne 0$. OLS then misses $\beta_1$ by $\Cov(x,u)/\Var(x)$. Sources: omitted variables, simultaneity, measurement error (attenuation).
- A valid instrument is relevant, $\Cov(z,x) \ne 0$, and exogenous, $\Cov(z,u) = 0$. Just-identified IV is $\widehat{\Cov}(z,y)/\widehat{\Cov}(z,x)$.
- 2SLS is OLS of $y$ on $X$ projected onto $Z$. Controls that belong in the $y$ equation belong in $Z$ too. Use 2SLS residuals $y - X\hat\beta$, not $y - \hat X\hat\beta$, for standard errors.
- A first-stage $F$ below $10$ (or below Stock–Yogo) is a weak-instrument warning: 2SLS is biased toward OLS and usual $t$ tests mislead.
- Overidentification lets one test exclusion (Sargan/Hansen $J$), never prove it. LATE is the effect on compliers; it is not "the" average effect.
:::

## Exercises

::: exercise Attenuation {level=1 check="0.5"}
In the classical measurement-error formula, $\operatorname{plim}\hat\beta_{\mathrm{OLS}} = \beta_1 \sigma_x^2 / (\sigma_x^2 + \sigma_e^2)$. If $\beta_1 = 1$ and $\sigma_e^2 = \sigma_x^2$, what is the probability limit of OLS? (Enter the plim.)
::: solution
$1 \times 1/2 = 0.5$: OLS is pulled halfway to zero. IV with an instrument correlated with true $x$ but not with $e$ recovers $1$.
:::
:::

::: exercise The IV ratio {level=1 check="2"}
Suppose $\widehat{\Cov}(z,y) = 4$ and $\widehat{\Cov}(z,x) = 2$. Compute $\hat\beta_{1,\mathrm{IV}}$. (Enter the IV slope.)
::: solution
$4/2 = 2$.
:::
:::

::: exercise First-stage $F$ {level=1 check="61"}
In [[#ex-iv]] the first-stage $F$ is $61.2$. Using the Staiger–Stock rule of thumb of $10$, is the instrument weak? Enter $61$, the $F$ statistic rounded to the nearest integer, as a reminder to look at that number.
::: solution
$F \approx 61 > 10$: not weak by the rule of thumb. (The rule is a warning threshold, not a theorem.)
:::
:::

::: exercise OLS versus IV in the simulation {level=2}
In [[#ex-ols-endog]] and [[#ex-iv]], OLS is $1.355$ and IV is $0.926$, with true $\beta_1 = 1$. Which estimator is closer to $1$ in this draw, and why is OLS too high?
::: solution
IV ($0.926$) is closer than OLS ($1.355$). OLS is too high because $x$ is built to contain $0.6 u$, so $\Cov(x,u) > 0$ and $\operatorname{plim}\hat\beta_{\mathrm{OLS}} = 1 + \Cov(x,u)/\Var(x) > 1$. IV uses only the $z$-driven part of $x$, which is independent of $u$.
:::
:::

::: exercise Reduced form {level=2 check="0.703"}
The **reduced form** is the OLS of $y$ on $z$. In the just-identified case, $\hat\beta_{1,\mathrm{IV}} = \hat\pi_{y z} / \hat\pi_{x z}$, the ratio of reduced-form and first-stage slopes (on the demeaned variables). If the first-stage slope is $0.759$ and the IV slope is $0.926$, compute the reduced-form slope to three decimal places. (Enter $\hat\pi_{yz}$.)
::: solution
$\hat\pi_{yz} = 0.926 \times 0.759 = 0.7028$, which rounds to $0.703$. A weak reduced form and a weak first stage go together; a strong first stage with a zero reduced form means IV is near zero.
:::
:::

::: exercise Why not OLS on $\hat x$ standard errors {level=2}
A student runs the first stage, saves $\hat x$, and then runs OLS of $y$ on $\hat x$, reporting the printed OLS standard error of the slope. What two things has the student got right, and what is wrong with the standard error?
::: solution
The point estimate is 2SLS (just-identified, one $x$), so the slope is right. The residual that belongs in the variance is $y - x\hat\beta_{\mathrm{IV}}$, using the original $x$; OLS of $y$ on $\hat x$ uses $y - \hat x\hat\beta$, which is too small (the first stage overfits $x$), so the printed se is too small. The student has also treated $\hat x$ as non-random, ignoring first-stage uncertainty. Use the 2SLS formula, preferably with a robust sandwich.
:::
:::

::: exercise Exclusion versus relevance {level=3}
For each candidate $z$ in a wage–schooling equation, say whether the obvious worry is relevance, exclusion, both, or neither: (a) distance to the nearest college; (b) the worker's own IQ score; (c) a randomly assigned voucher for an extra year of school; (d) the worker's current occupation.
::: solution
(a) Distance is a classic (Card 1995) instrument: relevance is empirical (does distance shift schooling?), exclusion is the worry (families that live near colleges differ in $u$). (b) IQ is highly relevant and obviously excluded from *exclusion*: it belongs in $u$. (c) A random voucher is relevant if people use it and exogenous by design — the textbook instrument. (d) Occupation is an outcome, or a mediator, of schooling; it is neither a valid instrument nor a harmless control if the object is the full return to school.
:::
:::

::: exercise The Wald IV for a dummy instrument {level=3}
Suppose $z \in \{0,1\}$, $x$ and $y$ are unrestricted, and we estimate a just-identified IV without other regressors. Show that $\hat\beta_{1,\mathrm{IV}} = (\bar y_1 - \bar y_0)/(\bar x_1 - \bar x_0)$, where $\bar y_1$ is the mean of $y$ among units with $z = 1$. Interpret the formula when $x$ is also a dummy (the Wald estimator).
::: hint
$\widehat{\Cov}(z,y) = \bar z(1-\bar z)(\bar y_1 - \bar y_0)$, and likewise for $x$.
:::
::: solution
$\widehat{\Cov}(z,y) = n^{-1}\sum_i (z_i - \bar z)(y_i - \bar y) = \bar z(1-\bar z)(\bar y_1 - \bar y_0)$, because $z_i - \bar z$ equals $1-\bar z$ on the $z = 1$ group and $-\bar z$ on the $z = 0$ group. The same identity with $x$ in place of $y$ gives $\widehat{\Cov}(z,x) = \bar z(1-\bar z)(\bar x_1 - \bar x_0)$. The ratio is $(\bar y_1 - \bar y_0)/(\bar x_1 - \bar x_0)$. When $x$ is a dummy, $\bar x_1 - \bar x_0$ is the difference in treatment rates (the first-stage take-up gap) and $\bar y_1 - \bar y_0$ is the reduced-form difference in mean outcomes. IV is then the **Wald estimator**: the ITT effect on $y$ divided by the ITT effect on $x$. Under monotonicity that is the LATE on compliers ([[causal-inference/iv-and-late]]).
:::
:::
