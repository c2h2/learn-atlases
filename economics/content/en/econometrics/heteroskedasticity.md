The Gauss–Markov theorem needs $\Var(u \mid x_1, \dots, x_k) = \sigma^2$, a constant. Economic data often violate that. Expenditure on food varies more among rich households than among poor ones; firm investment is more volatile among large firms; the scatter of wages around a fitted Mincer equation fans out with experience. **Heteroskedasticity** is the name for $\Var(u \mid X) = \sigma_i^2$, not constant across $i$. OLS remains unbiased and consistent under MLR.1–MLR.4, but it is no longer BLUE, and the usual standard errors $\hat\sigma\sqrt{(X\T X)^{-1}_{jj}}$ are wrong, sometimes badly. This chapter records the consequences, tests for heteroskedasticity, computes **White (robust)** and **clustered** standard errors, and describes weighted least squares when the form of $\sigma_i^2$ is known or well estimated.

## What fails, and what does not

Heteroskedasticity is a statement about the *spread* of $u$, not about its mean. A scatter can be centred on a straight line and still fan out. The line is the conditional mean that OLS estimates; the fan is the conditional variance that usual standard errors ignore. In household surveys the fan is the rule: expenditure, hours and income all have larger residuals at the top of the distribution than at the bottom. Treating those residuals as iid is a modelling choice, and it is usually the wrong one for inference.

Write $\Var(\mathbf{u}\mid X) = \sigma^2 \Omega$, with $\Omega$ a diagonal matrix of $h_i = \sigma_i^2/\sigma^2$ in the heteroskedastic-but-uncorrelated case. Then

$$
\Var(\hat{\boldsymbol\beta}\mid X) = (X\T X)^{-1} X\T (\sigma^2 \Omega) X (X\T X)^{-1},
$$ {#eq-sandwich}

the **sandwich** formula. The usual estimator $\hat\sigma^2 (X\T X)^{-1}$ equals this only when $\Omega = I$. If larger-variance observations also have unusual $x$, usual standard errors can be too small (over-rejection) or too large (under-rejection). Unbiasedness does not use $\Omega$, so $\E(\hat{\boldsymbol\beta}\mid X) = \boldsymbol\beta$ still holds under MLR.1–MLR.4. Consistency likewise survives, provided the $h_i$ are not so wild that averages fail to settle.

::: definition Heteroskedasticity {#def-hetero}
The errors are **heteroskedastic** if $\Var(u_i \mid x_i)$ is not constant in $i$. They are **homoskedastic** if $\Var(u_i \mid x_i) = \sigma^2$ for all $i$ (MLR.5). **Serial correlation** (or clustering) is a different failure: off-diagonal entries of $\Omega$ are non-zero. The two can occur together.
:::

::: proposition OLS under heteroskedasticity {#prop-ols-hetero}
Under MLR.1–MLR.4, $\hat{\boldsymbol\beta}$ is unbiased (and, under standard moment conditions, consistent) whether or not MLR.5 holds. The usual variance estimator $\hat\sigma^2 (X\T X)^{-1}$ is consistent for $\Var(\hat{\boldsymbol\beta}\mid X)$ if and only if MLR.5 holds (or, more weakly, if $X$ and the $h_i$ are uncorrelated in a sense that makes the sandwich collapse). Gauss–Markov fails as soon as $\Omega \ne I$: GLS, not OLS, is BLUE.
:::

::: proof
Unbiasedness is $\hat{\boldsymbol\beta} = \boldsymbol\beta + (X\T X)^{-1}X\T\mathbf{u}$ and $\E(\mathbf{u}\mid X) = \mathbf{0}$, which never uses $\Var(\mathbf{u}\mid X)$. The sandwich [[#eq-sandwich]] is the exact conditional variance; it equals $\sigma^2 (X\T X)^{-1}$ when $\Omega = I$. If $\Omega \ne I$, the GLS estimator $(X\T \Omega^{-1} X)^{-1} X\T \Omega^{-1}\mathbf{y}$ is the linear unbiased estimator with smallest variance, by the same argument as Gauss–Markov with a transformed model.
:::

::: warning Usual $t$ statistics can be far from $N(0,1)$
A $t$ ratio that uses too-small standard errors will reject a true $H_0$ more than $5\%$ of the time. That is not a small-sample curiosity: in cross-sections of households and firms it is the typical state of affairs. The repair — compute a variance estimator that is consistent for the sandwich — is cheap, and it is the default in most applied work. Do not report usual OLS standard errors from a heteroskedastic scatter without saying so.
:::

## Seeing and testing heteroskedasticity

A residual plot against $\hat y$ or against a suspected $x_j$ is the first diagnostic: a fan, a bow-tie, or a clump of large residuals at one end of $x$ is the picture of $h_i$ changing. Because OLS residuals are orthogonal to $x$, the plot will not show a *linear* trend; it is the **spread** that matters.

::: widget plot
f: 3+0.5*x; 3+0.5*x+0.5*x; 3+0.5*x-0.5*x
x: 1, 10
y: -4, 12
labels: \E(y\mid x); \E(y\mid x)+\sigma(x); \E(y\mid x)-\sigma(x)
caption: A heteroskedastic population: $\E(y \mid x) = 3 + 0.5x$ with $\sigma(x) = 0.5 x$. The band widens with $x$. OLS still estimates the line consistently; the usual formula $\sigma^2/S_{xx}$ understates the sampling variance of the slope if large-$x$ points dominate the residuals. Compare with the parallel band of [[econometrics/simple-regression]], which was homoskedastic.
:::

Two classical tests formalise the plot. Both regress a function of the residuals on variables thought to drive $\sigma_i^2$.

::: definition Breusch–Pagan and White tests {#def-bp-white}
The **Breusch–Pagan test** (1979) regresses $\hat u_i^2$ on the original regressors (or on a shorter list of $z$'s) and forms $\mathrm{LM} = n R^2_{\hat u^2}$, which is asymptotically $\chi^2_q$ under homoskedasticity, with $q$ the number of extra slopes in that auxiliary regression. The **White test** (1980) uses as $z$'s the original regressors, their squares and their cross-products — a general test against heteroskedasticity of unknown form. A significant statistic is evidence against MLR.5, not a prescription of the form of $h_i$.
:::

::: example A residual fan by hand {#ex-fan-hand}
Three fitted residuals at low $x$ are $-0.4, 0.2, 0.1$; three at high $x$ are $-2.0, 1.5, 1.8$. The first group has sample variance $0.13$; the second has sample variance $4.4$. Nothing in the OLS point estimates uses those variances, but a usual standard error pretends they are equal. A plot of $\hat u$ against $x$ would show the fan; a Breusch–Pagan regression of $\hat u^2$ on $x$ would pick it up as a positive slope.
::: solution
The two group variances differ by a factor of about thirty. That is heteroskedasticity as a description of the scatter, visible without a formal test. The next step is a robust sandwich, not a claim that OLS is "invalid".
:::
:::

::: example A simulated fan, seed 21 {#ex-fan}
Draw $n = 60$ from $y = 3 + 0.5 x + u$ with $x$ uniform on $(1, 10)$ and $u \mid x \sim \Normal(0, (0.5 x)^2)$, using `numpy.random.default_rng(21)`. Fit OLS, compute usual and White standard errors, and run a Breusch–Pagan test of $\hat u_i^2$ on $x$.
::: solution
OLS gives $\hat y = 2.915 + 0.506 x$, close to $(3, 0.5)$. Usual standard errors are $0.738$ (intercept) and $0.124$ (slope). White's HC0 standard errors are $0.487$ and $0.123$; the HC1 version, which multiplies the sandwich by $n/(n-k-1) = 60/58$, gives $0.495$ and $0.126$. In this draw the slope's usual and robust standard errors happen to be close; the intercept's usual standard error is *larger* than the robust one. The Breusch–Pagan auxiliary $R^2$ is $0.183$, so $\mathrm{LM} = 60 \times 0.183 = 10.97$, which is $\chi^2_1$ with $p = 0.0009$: homoskedasticity is rejected, as the design intended.

The computation, with no statistical package:

```python
import numpy as np
from numpy.linalg import inv
n, k = 60, 1
X = np.column_stack([np.ones(n), x])
b = inv(X.T @ X) @ X.T @ y
e = y - X @ b
s2 = (e @ e) / (n - k - 1)
se_usual = np.sqrt(s2 * np.diag(inv(X.T @ X)))
meat = X.T @ ((e**2)[:, None] * X)
bread = inv(X.T @ X)
V_hc0 = bread @ meat @ bread
se_hc0 = np.sqrt(np.diag(V_hc0))
```
:::
:::

## Robust standard errors

White (1980) estimated the meat $X\T (\sigma^2 \Omega) X$ by replacing each unknown $\sigma_i^2$ with $\hat u_i^2$.

::: theorem White's heteroskedasticity-robust variance {#thm-white}
Assume MLR.1–MLR.4, finite fourth moments, and $\operatorname{plim} n^{-1} X\T X$ positive definite. Then

$$
\hat V_{\mathrm{HC0}} = (X\T X)^{-1}\Bigl(\sum_{i=1}^n \hat u_i^2 x_i x_i\T\Bigr)(X\T X)^{-1}
$$ {#eq-hc0}

is consistent for $\Var(\hat{\boldsymbol\beta})$. The **HC1** variant multiplies by $n/(n-k-1)$; **HC2** and **HC3** divide $\hat u_i^2$ by $1-P_{ii}$ and $(1-P_{ii})^2$ respectively, where $P_{ii}$ is the leverage. Robust $t$ statistics $t_j = \hat\beta_j / \operatorname{se}_{\mathrm{HC}}(\hat\beta_j)$ are asymptotically $N(0,1)$ under $H_0$: $\beta_j = 0$.
:::

::: proof
The middle of the sandwich is $n^{-1}\sum_i \sigma_i^2 x_i x_i\T$ plus a term that vanishes if $\hat{\boldsymbol\beta}$ is consistent (so $\hat u_i^2 - u_i^2 \to_p 0$ on average) and fourth moments keep the average from exploding. The bread $n(X\T X)^{-1}$ converges by the law of large numbers. Slutsky's lemma gives consistency of $\hat V_{\mathrm{HC0}}$. The usual central limit theorem for $n^{-1/2} X\T\mathbf{u}$ then yields asymptotic normality of $\hat{\boldsymbol\beta}$ with that variance, so the robust $t$ is asymptotically $N(0,1)$.
:::

HC1 is the small-sample tweak that matches the usual $\hat\sigma^2$ divisor when $\Omega = I$; many packages default to it. HC3 is more conservative in small samples with high-leverage points (MacKinnon and White, 1985). In large micro samples the variants agree. **Never** mix a robust standard error with a usual $F$ test that uses only SSE: the joint robust test is a **Wald** statistic $\hat{\boldsymbol\beta}\T R\T (R \hat V_{\mathrm{HC}} R\T)^{-1} R\hat{\boldsymbol\beta}$, compared to $\chi^2_q$ (or to $F_{q, n-k-1}$ as a finite-sample habit).

::: quiz
OLS is estimated on a cross-section of $4{,}000$ households. Residuals fan out with income. Which statement is correct?
- [ ] $\hat\beta$ is inconsistent, so the point estimates should be discarded.
- [x] $\hat\beta$ can still be consistent; usual standard errors should be replaced by robust (or clustered) ones.
- [ ] Gauss–Markov still applies, because $n$ is large.
- [ ] One must use weighted least squares; OLS is biased.
::: solution
Unbiasedness and consistency need MLR.1–MLR.4, not MLR.5. Gauss–Markov needs MLR.5 regardless of $n$. WLS is more efficient *if* the weights are right; it is not required for consistency, and wrong weights can make things worse. The standard applied response is to keep OLS and report robust (or clustered) standard errors.
:::
:::

## Clustered standard errors

Households in the same village, workers in the same firm, and years in the same country are not independent. If $\Omega$ is block-diagonal, with blocks of correlated errors inside clusters and zeros across clusters, White's HC0 ignores the within-cluster covariance and typically understates the variance of $\hat{\boldsymbol\beta}$.

::: definition Clustered sandwich {#def-cluster}
Suppose there are $G$ clusters and the score contribution of cluster $g$ is $X_g\T \hat{\mathbf{u}}_g$. The **cluster-robust** variance estimator is

$$
\hat V_{\mathrm{cl}} = (X\T X)^{-1}\Bigl(\sum_{g=1}^G X_g\T \hat{\mathbf{u}}_g \hat{\mathbf{u}}_g\T X_g\Bigr)(X\T X)^{-1},
$$

often multiplied by $G/(G-1)$ (and sometimes also by $(n-1)/(n-k-1)$). It is consistent for $\Var(\hat{\boldsymbol\beta})$ as $G \to \infty$, allowing arbitrary heteroskedasticity and arbitrary correlation *within* cluster, provided clusters are independent of each other.
:::

The important number is $G$, not $n$. Fifty states, even with millions of people, are fifty clusters; the cluster-robust $t$ is then closer to $t_{G-1}$ than to $N(0,1)$, and with $G = 10$ it is not to be trusted. If clustering is nested (schools in districts), cluster at the more aggregated level. If the clustering variable is the one whose coefficient you care about (a state policy), cluster-robust standard errors are the beginning of the analysis, not the end: the effective sample size for that coefficient is the number of states.

::: remark Robust versus clustered versus usual
Usual standard errors assume $\Omega = I$. Heteroskedasticity-robust standard errors allow a diagonal $\Omega$. Clustered standard errors allow a block-diagonal $\Omega$. Each nests the previous as a special case. Going in the other direction — using clustered standard errors when errors really are iid — costs some precision but does not bias the point estimates. In a cross-section with a grouping that could have induced dependence, clustering is the conservative default.
:::

## Weighted least squares

If $\sigma_i^2 = \sigma^2 h(x_i)$ is known, transforming the model to restore homoskedasticity recovers efficiency.

::: theorem Weighted least squares {#thm-wls}
Suppose $\Var(u_i \mid x_i) = \sigma^2 h_i$ with $h_i$ known and positive. The GLS estimator is OLS applied to $y_i/\sqrt{h_i}$ and $x_{ij}/\sqrt{h_i}$ (including the intercept column). Equivalently, it minimises $\sum_i (y_i - x_i\T\mathbf{b})^2 / h_i$. Under MLR.1–MLR.4 and this variance, WLS is BLUE. If $h_i$ is estimated consistently (**feasible GLS**), the estimator is asymptotically equivalent to GLS.
:::

::: proof
Divide $y_i = x_i\T\boldsymbol\beta + u_i$ by $\sqrt{h_i}$. The new error has variance $\sigma^2$. Gauss–Markov in the transformed sample gives the claim. Feasible GLS replaces $h_i$ by $\hat h_i$; under regularity the difference is $o_p(n^{-1/2})$.
:::

A common parametric choice is $h_i = x_i^2$ (spread proportional to $x$), or $\log \hat u_i^2$ regressed on $\log x_i$ to estimate an exponent. In [[#ex-fan]] the design has $h_i = x_i^2$ (up to a constant). WLS with those weights gives $\hat\beta_0 = 2.911$, $\hat\beta_1 = 0.509$, very close to OLS in this particular draw; the gain is in variance, which a single sample does not display. If the $h_i$ are badly wrong, WLS can be *worse* than OLS, and its usual standard errors can be wrong too. A robust sandwich computed on the *weighted* residuals is a reasonable compromise: estimate efficiently if the weights are roughly right, and still report a variance that does not trust them fully.

::: example Usual versus robust rejection {#ex-reject-dir}
Suppose $\hat\beta_1 = 0.40$, the usual se is $0.18$ and the HC1 se is $0.28$, with $n = 200$ so that $t$ critical values are about $1.97$. Then $t_{\mathrm{usual}} = 2.22$ (reject at $5\%$) and $t_{\mathrm{HC1}} = 1.43$ (do not reject). The same point estimate, two different inferences: the usual test over-rejects because it understates the sampling variance. Publishing the usual $t$ would report a "significant" slope that a robust $t$ does not support.
::: solution
$0.40/0.18 = 2.22 > 1.97$ and $0.40/0.28 = 1.43 < 1.97$. Coverage of the usual interval $\hat\beta_1 \pm 1.97\times 0.18$ is below $95\%$ in repeated heteroskedastic samples; the HC1 interval is asymptotically honest. Report the robust interval.
:::
:::

::: example WLS on the fan {#ex-wls}
For the sample of [[#ex-fan]], re-estimate by WLS with $h_i = x_i^2$.
::: solution
Set $y_i^* = y_i / x_i$ and $X_i^* = (1/x_i,\ 1)$, since $\sqrt{h_i} = x_i$. OLS of $y^*$ on $X^*$ produces $(2.911,\ 0.509)$. In `numpy`,

```python
sqrtw = 1 / x
yw = sqrtw * y
Xw = X * sqrtw[:, None]
b_wls = np.linalg.inv(Xw.T @ Xw) @ Xw.T @ yw
```

The slope matches OLS to two hundredths in this sample; with a more dramatic fan or a smaller $n$, WLS and OLS would part company more visibly. Either way, the WLS standard errors assume that $h_i = x_i^2$ is right.
:::
:::

::: widget montecarlo
mode: pi
n: 1000
caption: Monte Carlo error shrinks like $1/\sqrt{n}$, the same rate as $\operatorname{se}(\hat\beta_j)$. Heteroskedasticity does not change the rate — $\hat\beta$ is still $\sqrt{n}$-consistent under MLR.1–MLR.4 — but it changes the *constant* in front of $1/\sqrt{n}$. Robust standard errors estimate that constant from the data instead of assuming it equals $\sigma^2 (X\T X)^{-1}$.
:::

::: application Food Engel curves
Engel curves relating food expenditure to income are a textbook heteroskedastic scatter: the variance of expenditure rises with income. Working's log-share specification and the Working–Leser form are attempts to stabilise that scatter as well as to estimate an income elasticity. In the World Bank's LSMS household surveys, food-share regressions routinely report White or clustered (at the primary sampling unit) standard errors; usual OLS standard errors would treat two households in the same village as independent draws.
:::

::: history
**1979, Trevor Breusch and Adrian Pagan; 1980, Halbert White.** Breusch and Pagan's LM test (*Econometrica*) and White's heteroskedasticity-consistent covariance matrix (*Econometrica*) arrived within a year of each other and changed applied practice: one could test MLR.5 and, if it failed, still report valid standard errors without specifying $h_i$. Clustered standard errors, used earlier in survey statistics, entered the economics default toolkit in the 1990s and 2000s (Arellano, 1987; Bertrand, Duflo and Mullainathan, *QJE* 2004, on serial correlation in differences-in-differences).
:::

## Where this leads

Robust and clustered standard errors repair inference; they do not repair a failure of MLR.4. If $u$ is correlated with $x$, a precise wrong number is still wrong. [[econometrics/binary-outcomes]] faces a different failure of the linear model: $y$ itself is $0$ or $1$. [[econometrics/panel-data]] uses clustering in $i$ over $t$ as a matter of course, and often differences out a component of $u$. [[econometrics/instrumental-variables]] needs its own robust and clustered variance estimators, of the same sandwich shape.

::: summary
- Heteroskedasticity does not bias OLS under MLR.1–MLR.4; it invalidates usual standard errors and Gauss–Markov.
- The correct variance is the sandwich $(X\T X)^{-1}(X\T \sigma^2\Omega X)(X\T X)^{-1}$. White's HC0 estimates the meat by $\sum_i \hat u_i^2 x_i x_i\T$.
- Clustered standard errors allow arbitrary within-cluster correlation; the relevant sample size is the number of clusters $G$.
- Breusch–Pagan and White tests detect heteroskedasticity; they do not by themselves say what to do next.
- WLS is BLUE if $h_i$ is known. If $h_i$ is doubtful, prefer OLS with a robust sandwich, or WLS with a robust sandwich of its own.
:::

## Exercises

::: exercise What remains true {level=1}
Under MLR.1–MLR.4 with heteroskedastic errors, which of the following remain true of OLS: unbiasedness of $\hat{\boldsymbol\beta}$; consistency of $\hat{\boldsymbol\beta}$; the usual $t$ statistic being exactly $t_{n-k-1}$; Gauss–Markov?
::: solution
Unbiasedness and consistency remain (the latter under moment conditions). The exact $t$ distribution needs MLR.5 and MLR.6. Gauss–Markov needs MLR.5. So only the first two survive.
:::
:::

::: exercise A Breusch–Pagan LM {level=1 check="12"}
An auxiliary regression of $\hat u_i^2$ on a constant and two $z$-variables, with $n = 80$, has $R^2 = 0.15$. Compute the Breusch–Pagan LM statistic. (Enter $n R^2$.)
::: solution
$\mathrm{LM} = 80 \times 0.15 = 12$. Under $H_0$ this is $\chi^2_2$; the $5\%$ critical value is $5.99$, so homoskedasticity is rejected.
:::
:::

::: exercise Reading White versus usual {level=1}
In [[#ex-fan]] the usual se of the intercept is $0.738$ and the HC0 se is $0.487$. If you tested $H_0$: $\beta_0 = 0$ with the usual se rather than HC0, would you be more or less likely to reject than with the robust se?
::: solution
The usual se is *larger*, so $\lvert t\rvert$ is *smaller*: you would be less likely to reject. Heteroskedasticity does not always shrink usual standard errors; the direction depends on how $h_i$ lines up with $x_i$. That is a reason to compute the sandwich rather than to guess.
:::
:::

::: exercise HC1 from HC0 {level=2 check="0.126"}
In [[#ex-fan]], $n = 60$, $k = 1$, and the HC0 standard error of the slope is $0.1235$. Compute the HC1 standard error to three decimal places. (Enter the HC1 se.)
::: solution
HC1 multiplies the variance by $n/(n-k-1) = 60/58$, hence the se by $\sqrt{60/58} \approx 1.017$. Then $0.1235 \times 1.017 \approx 0.1256$, which rounds to $0.126$.
:::
:::

::: exercise A Wald statistic {level=2 check="5.99"}
Two restrictions are tested with a robust Wald statistic $W = 16$ in a large sample. The $5\%$ critical value of $\chi^2_2$ is $5.99$. Enter that critical value, and in the solution decide whether $H_0$ is rejected.
::: solution
The critical value is $5.99$. Since $16 > 5.99$, reject $H_0$. (The $p$-value is $\Prob(\chi^2_2 \ge 16) \approx 0.0003$.) The usual SSE-based $F$ is the wrong statistic once standard errors are robust.
:::
:::

::: exercise Why $G$ not $n$ {level=2}
A labour survey interviews $20{,}000$ workers in $40$ firms. The regression of interest has a firm-level policy as the regressor of interest. Explain in two sentences why cluster-robust standard errors should use $G = 40$, and why a $t_{39}$ critical value is more honest than $1.96$.
::: solution
All workers in a firm share the same policy and, typically, a common unobserved firm shock, so their residuals are dependent: the independent pieces of information about the policy coefficient are the $40$ firms. With $G = 40$ the cluster-robust $t$ is closer to $t_{39}$ (critical value about $2.02$) than to $N(0,1)$; using $1.96$ overstates precision slightly, and with smaller $G$ the gap is much larger.
:::
:::

::: exercise Derive the sandwich in simple regression {level=3}
In simple regression, show that $\Var(\hat\beta_1 \mid X) = \sum_i w_i^2 \sigma_i^2$ with $w_i = (x_i - \bar x)/S_{xx}$, and that this equals $\sigma^2 / S_{xx}$ if $\sigma_i^2 = \sigma^2$. What is White's estimator of this variance?
::: hint
Use $\hat\beta_1 = \beta_1 + \sum_i w_i u_i$ from [[econometrics/simple-regression#eq-linear-combo]].
:::
::: solution
$\hat\beta_1 - \beta_1 = \sum_i w_i u_i$ with the $w_i$ functions of $X$ only, so $\Var(\hat\beta_1 \mid X) = \sum_i w_i^2 \Var(u_i \mid X) = \sum_i w_i^2 \sigma_i^2$ if the $u_i$ are uncorrelated. If $\sigma_i^2 = \sigma^2$, this is $\sigma^2 \sum_i w_i^2 = \sigma^2 / S_{xx}$ because $\sum_i (x_i - \bar x)^2 / S_{xx}^2 = 1/S_{xx}$. White's estimator is $\sum_i w_i^2 \hat u_i^2 = \sum_i (x_i - \bar x)^2 \hat u_i^2 / S_{xx}^2$.
:::
:::

::: exercise Feasible WLS in two steps {level=3}
Describe a feasible WLS procedure that estimates $\log \sigma_i^2 = \alpha_0 + \alpha_1 \log x_i$ from OLS residuals, and state one thing that can go wrong if some $\hat u_i$ are near zero.
::: solution
Step 1: OLS of $y$ on $X$, keep $\hat u_i$. Step 2: regress $\log(\hat u_i^2)$ on a constant and $\log x_i$; fitted values $\widehat{\log \sigma_i^2}$ give $\hat h_i = \exp(\widehat{\log \sigma_i^2})$. Step 3: WLS with those $\hat h_i$. If some $\hat u_i \approx 0$, $\log(\hat u_i^2)$ is a large negative outlier and can dominate the auxiliary regression, producing wild weights. A fix is to Winsorise $\hat u_i^2$ or to add a small constant; a better fix is not to trust a tightly parametric $h_i$ in the first place and to report OLS with a robust sandwich as well.
:::
:::
