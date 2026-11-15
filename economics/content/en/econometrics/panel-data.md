A cross-section sees each person once. Whatever is special about that person — ability, a firm's culture, a country's geography — is mixed into $u$ and, if it is correlated with $x$, biases OLS. A **panel** sees the same people, firms, or countries several times. That extra dimension does something no cross-section can: it lets us compare a unit with *itself*, and so difference out any unobserved characteristic that does not change. Ability, geography, a firm's culture, a country's legal origin — if they are constant over the sample window, they can be swept out of $u$ by a first difference or a within transformation, and MLR.4 becomes more plausible for the remaining, time-varying $x$. This chapter sets out pooled OLS, first differences, **fixed effects** and **random effects**, the Hausman comparison between the last two, and the clustered standard errors that panel residuals almost always need. The algebra is multiple regression with a particular $X$; the identification is the claim that, after the unit effect is gone, what is left of $x$ is exogenous.

## The unobserved-effects model

::: definition Unobserved-effects model {#def-ue}
A balanced panel on $i = 1, \dots, N$ units and $t = 1, \dots, T$ periods is modelled as

$$
y_{it} = \beta_0 + \mathbf{x}_{it}\T\boldsymbol\beta + a_i + u_{it},
$$ {#eq-ue}

where $a_i$ is an **unobserved effect** (or **individual heterogeneity**) constant over $t$, and $u_{it}$ is an idiosyncratic error. The panel is **balanced** if every unit is observed in every period; otherwise it is **unbalanced**. We take $N$ large and $T$ small, the typical micro panel.
:::

The composite error is $v_{it} = a_i + u_{it}$. If $a_i$ is correlated with $\mathbf{x}_{it}$ — able people have more schooling, productive firms have more capital — pooled OLS of $y$ on $x$ is biased for $\boldsymbol\beta$ by the omitted-variable formula of [[econometrics/multiple-regression#thm-ovb]], with $a_i$ the omitted variable. If $a_i$ is uncorrelated with $\mathbf{x}_{it}$, pooled OLS is consistent but inefficient, because $v_{it}$ is correlated across $t$ for a given $i$. **Fixed effects** (and first differences) allow $\Corr(a_i, \mathbf{x}_{it}) \ne 0$ and still estimate $\boldsymbol\beta$. **Random effects** assumes that correlation is zero and uses it to form a GLS estimator.

Two extra assumptions will be named as we need them: **strict exogeneity**, $\E(u_{it} \mid \mathbf{x}_{i1}, \dots, \mathbf{x}_{iT}, a_i) = 0$, which rules out feedback from $y_{it}$ onto future $x$; and **no serial correlation in $u_{it}$**, which simplifies the random-effects GLS and the usual FE standard errors.

## Pooled OLS and first differences

**Pooled OLS** stacks the $NT$ observations and runs OLS. It is consistent for $\boldsymbol\beta$ if $\E(a_i + u_{it} \mid \mathbf{x}_{it}) = 0$, a strong condition. Even then, residuals from the same $i$ are dependent, so standard errors must be clustered at the unit ([[econometrics/heteroskedasticity#def-cluster]]).

**First differences** subtract the $t-1$ equation from the $t$ equation:

$$
\Delta y_{it} = \Delta\mathbf{x}_{it}\T\boldsymbol\beta + \Delta u_{it}, \qquad t = 2, \dots, T.
$$ {#eq-fd}

The $a_i$ cancel. OLS of $\Delta y$ on $\Delta\mathbf{x}$ (usually without an intercept, unless there is a common time trend) is consistent for $\boldsymbol\beta$ under strict exogeneity of $u_{it}$ and variation in $\Delta\mathbf{x}$. Any $x$ that does not change over time — sex, legal origin, a time-invariant policy — is differenced out along with $a_i$ and cannot be estimated. That is the price of purging the unit effect.

::: example Two periods is a difference {#ex-t2}
A worker is observed in $t = 1$ and $t = 2$, with union status $x$ switching from $0$ to $1$ and log wage rising from $2.4$ to $2.6$. The FD (and FE) slope for this worker is $(2.6-2.4)/(1-0) = 0.2$. A second worker who is unionised in both periods, with log wages $2.5$ and $2.55$, contributes $\Delta x = 0$ and drops out of FD. FE uses only switchers to estimate the union coefficient: that is a feature, because the non-switchers' $a_i$ cannot be separated from a time-invariant $x$, and a limitation, because the estimated $\beta$ is an effect on those who switch.
::: solution
With $T = 2$, FE $=$ FD for a single slope, and only units with $\Delta x \ne 0$ identify $\beta$. Time-invariant union status is absorbed in $a_i$. Interpreting $0.2$ as "the" union effect on all workers requires the extra claim that switchers are informative about non-switchers — an external-validity step, not a property of FE.
:::
:::

::: example Four firms, three years {#ex-panel}
Four firms are observed for three years. The data-generating process is $y_{it} = 2 + 0.5 x_{it} + a_i + u_{it}$ with $a = (1, -0.5, 0.5, -1)$ and

$$
x = \begin{pmatrix}2&3&4\\1&1&2\\3&4&5\\0&2&3\end{pmatrix},\qquad
u = \begin{pmatrix}0.2&-0.1&0.0\\0.1&0.2&-0.2\\-0.1&0.0&0.1\\0.0&-0.2&0.2\end{pmatrix}.
$$

Then

$$
y = \begin{pmatrix}4.2&4.4&5.0\\2.1&2.2&2.3\\3.9&4.5&5.1\\1.0&1.8&2.7\end{pmatrix}.
$$

Compute pooled OLS of $y$ on $x$, the first-difference slope (through the origin), and the fixed-effects slope.
::: solution
Stacking the twelve observations, pooled OLS gives $\hat y = 1.158 + 0.843 x$. The slope overshoots $0.5$ because $a_i$ is positively correlated with $\bar x_i$ (firm 1 has $a = 1$ and $\bar x = 3$; firm 4 has $a = -1$ and $\bar x = 1.67$).

The eight first differences $(\Delta x, \Delta y)$ are $(1, 0.2),\ (1, 0.6),\ (0, 0.1),\ (1, 0.1),\ (1, 0.6),\ (1, 0.6),\ (2, 0.8),\ (1, 0.9)$. The through-origin slope is $\sum \Delta x\,\Delta y / \sum (\Delta x)^2 = 0.460$, close to $0.5$. (The $u_{it}$ were chosen small and non-zero, so we should not hit $0.5$ exactly.)

The within (fixed-effects) slope, computed next, is $0.496$.
:::
:::

::: widget plot
f: 1.158+0.843*x; 2+0.5*x
x: 0, 6
y: 0, 8
labels: \text{pooled OLS}; \text{true slope through }a=0
caption: Pooled OLS on [[#ex-panel]] is steeper than the true $0.5$ because firms with high $a_i$ also have high $x$. First differences and fixed effects compare each firm with itself and recover a slope near $0.5$. The intercept of the true line drawn here is $2$, the intercept of [[#eq-ue]] when $a_i = 0$; pooled OLS does not estimate that intercept.
:::

## Fixed effects

The **within transformation** subtracts unit means: $\ddot y_{it} = y_{it} - \bar y_i$ and $\ddot{\mathbf{x}}_{it} = \mathbf{x}_{it} - \bar{\mathbf{x}}_i$. Then

$$
\ddot y_{it} = \ddot{\mathbf{x}}_{it}\T\boldsymbol\beta + \ddot u_{it},
$$ {#eq-within}

and $a_i$ has gone. OLS of $\ddot y$ on $\ddot{\mathbf{x}}$ (no intercept: the means of $\ddot y$ and $\ddot x$ are zero) is the **fixed-effects (FE)** or **within** estimator. It is algebraically identical to the **least-squares dummy-variable** (LSDV) regression of $y_{it}$ on $\mathbf{x}_{it}$ and a dummy for each unit.

::: theorem Fixed-effects estimator {#thm-fe}
Assume [[#eq-ue]], strict exogeneity of $u_{it}$, and that the within variation of $\mathbf{x}$ has full rank. Then the FE estimator

$$
\hat{\boldsymbol\beta}_{\mathrm{FE}} = \Bigl(\sum_{i,t} \ddot{\mathbf{x}}_{it}\ddot{\mathbf{x}}_{it}\T\Bigr)^{-1}\sum_{i,t} \ddot{\mathbf{x}}_{it}\ddot y_{it}
$$

is unbiased (for fixed $T$, as $N$ grows it is consistent). Time-invariant regressors are collinear with $a_i$ and drop out. Residual degrees of freedom are $NT - N - k$ (or $NT - N - k - (T-1)$ with time dummies), not $NT - k$, because $N$ unit means were estimated.
:::

::: proof
The within transformation is $M_D \mathbf{y} = M_D X\boldsymbol\beta + M_D \mathbf{u}$ where $D$ is the matrix of unit dummies and $M_D$ is the residual maker for $D$. This is OLS on the transformed data, so unbiasedness follows from $\E(M_D\mathbf{u} \mid M_D X) = \mathbf{0}$, which is implied by strict exogeneity. Rank of $M_D X$ is the rank of the within variation. A time-invariant column of $X$ lies in $\operatorname{Col}(D)$ and is annihilated by $M_D$.
:::

In [[#ex-panel]], $\sum_{i,t} \ddot x_{it}^2 = 9.333$ and $\sum_{i,t} \ddot x_{it}\ddot y_{it} = 4.633$, so $\hat\beta_{\mathrm{FE}} = 4.633/9.333 = 0.496$. LSDV with four firm dummies and $x$ returns the same $0.496$ as the coefficient on $x$, together with four intercepts $2+a_i$ estimated up to the realised $u$.

**Two-way fixed effects** add time dummies (or demean also by period): they absorb a common shock in each $t$ as well as $a_i$. Difference-in-differences with two groups and two periods is two-way FE on a treatment dummy ([[causal-inference/difference-in-differences]]).

Standard errors for FE should be clustered at the unit: $\ddot u_{it}$ is serially correlated even if $u_{it}$ is not, because demeaning mixes the $T$ errors of $i$. With small $T$ and large $N$, the cluster-robust sandwich of [[econometrics/heteroskedasticity#def-cluster]] with $G = N$ is the default.

::: warning Strict exogeneity is stronger than contemporaneous exogeneity
FE and FD use $\mathbf{x}_{is}$ for $s \ne t$ in the transformation. If $u_{it}$ feeds into $\mathbf{x}_{i,t+1}$ — a firm hit by a shock next year cuts investment; a worker who had a bad wage this year trains next year — then $\ddot{\mathbf{x}}_{it}$ is correlated with $\ddot u_{it}$ and FE is inconsistent. That is why lagged dependent variables need a different estimator (Arellano–Bond), not FE. A lead of $x$ in an FE regression, significant, is a warning of this feedback.
:::

## Random effects and Hausman

If we are willing to assume $\E(a_i \mid \mathbf{x}_{i1}, \dots, \mathbf{x}_{iT}) = 0$ — the unobserved effect is uncorrelated with the regressors in every period — then $a_i$ is a random component of the error, not a nuisance parameter, and GLS is available.

::: definition Random-effects estimator {#def-re}
The **random-effects (RE)** estimator is feasible GLS on [[#eq-ue]] under $\Var(a_i) = \sigma_a^2$, $\Var(u_{it}) = \sigma_u^2$, uncorrelated across $i$, and (typically) uncorrelated $u_{it}$ across $t$. The quasi-demeaning transformation is $y_{it} - \theta \bar y_i$ with

$$
\theta = 1 - \sqrt{\frac{\sigma_u^2}{T\sigma_a^2 + \sigma_u^2}} \in (0,1),
$$

and likewise for $\mathbf{x}_{it}$. OLS on the quasi-demeaned data is RE. If $\theta = 1$ (large $T\sigma_a^2$), RE equals FE; if $\theta = 0$ ($\sigma_a^2 = 0$), RE equals pooled OLS.
:::

RE uses both the within variation (like FE) and the **between** variation (the $N$ unit means). The between estimator is OLS of $\bar y_i$ on $\bar{\mathbf{x}}_i$. In [[#ex-panel]] the between slope is $1.080$, even more contaminated by $a_i$ than pooled OLS. RE is a matrix-weighted average of FE and between; it is consistent only when both are, that is only when $a_i$ is uncorrelated with $x$.

::: theorem Hausman's comparison {#thm-hausman}
Under the RE assumption (and the usual rank conditions), both $\hat{\boldsymbol\beta}_{\mathrm{FE}}$ and $\hat{\boldsymbol\beta}_{\mathrm{RE}}$ are consistent for $\boldsymbol\beta$, and RE is more efficient. Under the alternative $\Corr(a_i, \mathbf{x}_{it}) \ne 0$, FE remains consistent and RE does not. Hausman's statistic

$$
H = (\hat{\boldsymbol\beta}_{\mathrm{FE}} - \hat{\boldsymbol\beta}_{\mathrm{RE}})\T \widehat{\Var}(\hat{\boldsymbol\beta}_{\mathrm{FE}} - \hat{\boldsymbol\beta}_{\mathrm{RE}})^{-1} (\hat{\boldsymbol\beta}_{\mathrm{FE}} - \hat{\boldsymbol\beta}_{\mathrm{RE}})
$$

is asymptotically $\chi^2$ with degrees of freedom equal to the number of compared slopes. A significant $H$ is evidence against the RE assumption.
:::

::: proof
This is Hausman's (1978) specification test: compare an estimator consistent under both the null and the alternative (FE) with one efficient under the null and inconsistent under the alternative (RE). The variance of the difference equals $\Var(\mathrm{FE}) - \Var(\mathrm{RE})$ under the null, because the efficient estimator is uncorrelated with the difference (a general GMM fact).
:::

A significant Hausman test does not prove that FE is the causal effect; it proves that RE and FE disagree by more than sampling noise, so the RE assumption is doubtful. With clustered standard errors the classical Hausman formula needs a robust rewrite (a Wald test of FE versus a correlated random-effects specification, or a bootstrap). In applied micro, FE with clustered standard errors is the default; RE is used when the coefficient on a time-invariant $x$ is itself the object of interest *and* the orthogonality of $a_i$ is credible.

::: quiz
A researcher wants the effect of a time-invariant institutional index on growth in a panel of countries. Which estimator can produce a coefficient on that index?
- [ ] First differences
- [ ] Fixed effects
- [x] Random effects (or pooled OLS), at the cost of assuming the index is uncorrelated with $a_i$
- [ ] Two-way fixed effects
::: solution
FD, FE and two-way FE annihilate anything that does not vary over $t$ for a given country. RE and pooled OLS keep the between variation, and so can estimate a coefficient on a time-invariant index, but only if that index is uncorrelated with the unobserved country effect — a demanding assumption for "institutions" and "growth".
:::
:::

::: example LSDV matches FE {#ex-lsdv}
In [[#ex-panel]] the regression of the twelve $y_{it}$ on $x_{it}$ and four firm dummies (no overall intercept) returns dummy coefficients $(3.044,\ 1.538,\ 2.514,\ 1.006)$ and a slope $0.496$ on $x$. That slope equals $\hat\beta_{\mathrm{FE}}$ computed from $\sum \ddot x\ddot y / \sum \ddot x^2$. The four dummies are estimates of $2 + a_i$ plus the average idiosyncratic error of firm $i$; they are not needed if $\boldsymbol\beta$ is the only object of interest, which is why the within transformation is the usual implementation.
::: solution
LSDV and FE are two algorithms for the same estimator. With $N$ large, forming $N$ dummies is unnecessary: subtract unit means and run OLS on the demeaned data. Residual degrees of freedom must still subtract $N$, not $1$.
:::
:::

::: example Between versus within in the four-firm panel {#ex-between}
Using [[#ex-panel]], the unit means are $\bar x = (3, 1.33, 4, 1.67)$ and $\bar y = (4.53, 2.20, 4.50, 1.83)$. The between OLS is $\hat{\bar y} = 0.565 + 1.080 \bar x$. Contrast this with $\hat\beta_{\mathrm{FE}} = 0.496$ and the true $0.5$.
::: solution
The between slope uses only four points and attributes the high $y$ of high-$a$ firms to $x$. The within slope uses the year-to-year movements *inside* each firm, which are not driven by $a_i$, and lands on $0.496$. That is the whole argument for FE in one table of means. Pooled OLS, mixing within and between, sits in between at $0.843$.
:::
:::

::: application Wages, union status, and ability
Panel wage equations with a union dummy are a classic FE application: joining a union is correlated with unobserved productivity $a_i$. Freeman's and others' FE estimates of the union wage gap are smaller than pooled OLS estimates, consistent with positive selection into union jobs (Card, *Econometrica* 1996, among many). FE cannot estimate the return to schooling in a short panel of adults, because schooling barely changes; that coefficient needs a different design ([[econometrics/instrumental-variables]], [[labour-economics/human-capital]]).
:::

::: history
**1978, Jerry Hausman.** Hausman's *Econometrica* paper "Specification Tests in Econometrics" gave a general way to compare two estimators, and the FE-versus-RE application became the test that textbooks name after him. The within transformation itself is older: it is the analysis of covariance, used in agricultural experiments long before it was a panel estimator. Mundlak (1978) showed that RE with the unit means of $x$ added as extra regressors (correlated random effects) produces the FE slopes on the time-varying $x$ — a unification rather than a dichotomy.
:::

## Where this leads

FE and FD purge time-invariant confounding; they do not purge confounding that moves with $t$, and they need strict exogeneity. [[econometrics/instrumental-variables]] handles endogenous time-varying $x$ by finding a shifter. [[causal-inference/difference-in-differences]] is two-way FE on a treatment dummy, with a parallel-trends assumption that this chapter has not yet named. Serial correlation, dynamics, and unbalanced panels with missingness related to $u$ are further issues; clustered FE standard errors and a careful look at who is missing are the first defences. Time-series dependence of a different kind — one long $T$, small $N$ — is [[time-series/stationarity]].

::: summary
- The unobserved-effects model is $y_{it} = \beta_0 + \mathbf{x}_{it}\T\boldsymbol\beta + a_i + u_{it}$. If $a_i$ is correlated with $x$, pooled OLS is biased.
- First differences and fixed effects eliminate $a_i$. They cannot estimate time-invariant slopes, and they need strict exogeneity of $u_{it}$.
- FE is OLS after subtracting unit means, and equals LSDV. Cluster standard errors at the unit.
- Random effects is GLS under $\Corr(a_i, x) = 0$. It uses between as well as within variation.
- A Hausman test of FE versus RE is a test of that orthogonality. In micro panels, FE with clustered standard errors is the usual default.
:::

## Exercises

::: exercise Who is differenced out? {level=1}
In a worker–year panel, which of the following regressors survive FE, and which are absorbed by $a_i$: years of experience, sex, a year dummy, a union dummy that some workers switch, region of birth?
::: solution
Survive: experience (it changes), year dummies (they change with $t$, not $i$), union if some workers switch. Absorbed: sex, region of birth — both constant for a worker. (A year dummy is a two-way FE term, not part of $a_i$; it is estimated.)
:::
:::

::: exercise A within slope {level=1 check="0.5"}
A single unit is observed twice, with $(x, y) = (1, 3)$ and $(3, 4)$. Compute the FE (equals FD) slope for this unit. (Enter the slope.)
::: solution
$\Delta y / \Delta x = (4-3)/(3-1) = 0.5$. With $T = 2$, FE and FD are the same comparison.
:::
:::

::: exercise Degrees of freedom {level=1 check="17"}
A balanced panel has $N = 10$, $T = 3$, and $k = 3$ time-varying regressors, estimated by one-way FE (no time dummies). What are the residual degrees of freedom? (Enter $NT - N - k$.)
::: solution
$NT - N - k = 30 - 10 - 3 = 17$. Ten unit means were estimated, in addition to the three slopes. (Pooled OLS would have claimed $30 - 4 = 26$ if it included an intercept, which is too many.)
:::
:::

::: exercise Pooled bias in the four-firm panel {level=2 check="0.843"}
In [[#ex-panel]] the pooled OLS slope is $0.843$ and the true slope is $0.5$. By how much does pooled OLS overshoot? Enter the pooled slope itself, as reported in the example.
::: solution
The pooled slope is $0.843$, which overshoots by $0.343$. The overshoot is omitted-variable bias from $a_i$.
:::
:::

::: exercise First-difference arithmetic {level=2 check="0.46"}
Using the eight first differences in [[#ex-panel]], $\sum (\Delta x)^2 = 1+1+0+1+1+1+4+1 = 10$ and $\sum \Delta x\,\Delta y = 0.2+0.6+0+0.1+0.6+0.6+1.6+0.9 = 4.6$. Compute the through-origin FD slope. (Enter the slope.)
::: solution
$4.6/10 = 0.46$.
:::
:::

::: exercise FE versus FD with $T = 2$ {level=2}
Show that in a balanced panel with $T = 2$, the FE and FD estimators of a single slope coincide.
::: hint
For $T = 2$, $\ddot x_{i1} = x_{i1} - \bar x_i = (x_{i1} - x_{i2})/2 = -\Delta x_{i2}/2$ and $\ddot x_{i2} = \Delta x_{i2}/2$, and likewise for $y$.
:::
::: solution
$\bar x_i = (x_{i1}+x_{i2})/2$, so $\ddot x_{i1} = -\Delta x_i/2$ and $\ddot x_{i2} = \Delta x_i/2$, with $\Delta x_i = x_{i2}-x_{i1}$. Then $\sum_{i,t} \ddot x_{it}\ddot y_{it} = \sum_i \bigl((\Delta x_i/2)(\Delta y_i/2) + (-\Delta x_i/2)(-\Delta y_i/2)\bigr) = \tfrac12 \sum_i \Delta x_i \Delta y_i$ and $\sum_{i,t} \ddot x_{it}^2 = \tfrac12 \sum_i (\Delta x_i)^2$. The ratio is $\sum_i \Delta x_i \Delta y_i / \sum_i (\Delta x_i)^2$, which is FD through the origin. For $T > 2$ the two estimators differ (they weight the periods differently) but are both consistent under the same strict exogeneity.
:::
:::

::: exercise A Hausman decision {level=3}
In a large $N$, small $T$ wage panel, $\hat\beta_{\mathrm{FE}} = 0.04$ and $\hat\beta_{\mathrm{RE}} = 0.10$ on a union dummy, with $\widehat{\mathrm{se}}(\hat\beta_{\mathrm{FE}} - \hat\beta_{\mathrm{RE}}) = 0.015$. Compute the Hausman statistic for this single coefficient and test at $5\%$ against $\chi^2_1$ (critical value $3.84$). Which estimator would you report, and what does the gap suggest about selection into union jobs?
::: hint
For one coefficient, $H = \bigl((\hat\beta_{\mathrm{FE}} - \hat\beta_{\mathrm{RE}})/\widehat{\mathrm{se}}\bigr)^2$.
:::
::: solution
$H = \bigl((0.04-0.10)/0.015\bigr)^2 = (-4)^2 = 16 > 3.84$. Reject the RE assumption. Report FE (with unit-clustered standard errors): $0.04$ is the within-worker union gap. The larger RE (and typically pooled) estimate $0.10$ mixes that gap with between-worker selection — workers who are ever in a union differ in $a_i$ in a way that raises wages — so the gap of $0.06$ is a selection component, not a causal union effect.
:::
:::

::: exercise Strict exogeneity and a lead {level=3}
A critic of an FE investment regression suggests adding $x_{i,t+1}$ to the right-hand side. If the coefficient on the lead is large and significant, what does that say, and which estimator in this chapter is then untrustworthy?
::: solution
Under strict exogeneity, $x_{i,t+1}$ is uncorrelated with $u_{it}$ and, after the within transformation, should have coefficient zero once current (and perhaps lagged) $x$ are included. A significant lead is evidence of feedback: today's $u$ moves tomorrow's $x$. FE and FD, both of which use future $x$ in the transformation, are then inconsistent. A possible next step is an IV estimator that uses lagged $x$ as instruments for $\Delta x$ (Arellano–Bond), not more FE.
:::
:::
