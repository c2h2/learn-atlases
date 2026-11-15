A worker's wage depends on schooling *and* on experience, ability, industry, and a dozen other things. Simple regression of wages on schooling folds all of those into $u$. If any of them is correlated with schooling, $\hat\beta_1$ is biased for the ceteris paribus effect ([[econometrics/economic-data#prop-ovb-preview]]). **Multiple regression** puts the observables on the right-hand side:

$$
y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \cdots + \beta_k x_k + u.
$$ {#eq-mlr}

The slope $\beta_j$ is the partial effect of $x_j$ holding the other regressors fixed. Ordinary least squares still applies; the formula becomes $\hat{\boldsymbol\beta} = (X\T X)^{-1} X\T\mathbf{y}$. This chapter derives that estimator, interprets it by **partialling out** (the Frisch–Waugh–Lovell theorem), computes the omitted-variable bias formula in full, and proves the **Gauss–Markov theorem**: under stated assumptions, OLS is the best linear unbiased estimator. The linear algebra is that of [least squares](/a/maths/lesson.php?c=linear-algebra&l=least-squares) and [matrices](/a/maths/lesson.php?c=linear-algebra&l=matrices); the calculus of unconstrained minimisation is [[mathematical-economics/unconstrained-optimisation]].

## The model in matrix form

A sample of $n$ observations on $k$ regressors plus an intercept is stored as an $n \times (k+1)$ **design matrix** $X$ whose first column is ones and whose remaining columns are $x_1, \dots, x_k$, together with an $n$-vector $\mathbf{y}$. The population model for the sample is

$$
\mathbf{y} = X\boldsymbol\beta + \mathbf{u}, \qquad \boldsymbol\beta = (\beta_0, \beta_1, \dots, \beta_k)\T.
$$ {#eq-matrix}

::: definition Assumptions MLR.1–MLR.4 {#def-mlr-assumptions}
**MLR.1 (linearity).** The population is [[#eq-mlr]], equivalently [[#eq-matrix]].

**MLR.2 (random sampling).** The rows $(x_{i1}, \dots, x_{ik}, y_i)$ are iid from the population.

**MLR.3 (no perfect collinearity).** $X$ has rank $k+1$: no column is a linear combination of the others, in the sample. In particular $n \ge k+1$ and each regressor (and the intercept) has some variation that is not redundant.

**MLR.4 (zero conditional mean).** $\E(u \mid x_1, \dots, x_k) = 0$.

**MLR.5 (homoskedasticity)**, used from Gauss–Markov onward: $\Var(u \mid x_1, \dots, x_k) = \sigma^2$.
:::

MLR.3 is the multiple-regression version of " $x$ is not constant". If $x_2 = 2 x_1$, or if a dummy for "male" and a dummy for "female" are both included together with an intercept, $X\T X$ is singular and OLS does not exist. **Multicollinearity** in the looser, everyday sense — regressors that are highly but not perfectly correlated — does not break OLS; it inflates standard errors, because there is little independent variation with which to estimate a partial effect.

The objective is still the sum of squared residuals $Q(\mathbf{b}) = (\mathbf{y} - X\mathbf{b})\T(\mathbf{y} - X\mathbf{b})$.

::: theorem OLS in matrix form {#thm-ols-matrix}
Under MLR.3 the unique minimiser of $Q(\mathbf{b})$ is

$$
\hat{\boldsymbol\beta} = (X\T X)^{-1} X\T \mathbf{y}.
$$ {#eq-beta-hat}

The fitted vector is $\hat{\mathbf{y}} = X\hat{\boldsymbol\beta} = P\mathbf{y}$ and the residual vector is $\hat{\mathbf{u}} = \mathbf{y} - \hat{\mathbf{y}} = M\mathbf{y}$, where $P = X(X\T X)^{-1}X\T$ is the **projection** onto the column space of $X$ and $M = I_n - P$ is the **residual maker**. Both $P$ and $M$ are symmetric and idempotent, $PX = X$ and $MX = 0$, and $\hat{\mathbf{u}}$ is orthogonal to every column of $X$: $X\T\hat{\mathbf{u}} = \mathbf{0}$.
:::

::: proof
Expand $Q(\mathbf{b}) = \mathbf{y}\T\mathbf{y} - 2\mathbf{b}\T X\T\mathbf{y} + \mathbf{b}\T X\T X\mathbf{b}$. The gradient with respect to $\mathbf{b}$ is $-2X\T\mathbf{y} + 2 X\T X\mathbf{b}$. Setting it to zero gives the **normal equations** $X\T X\hat{\boldsymbol\beta} = X\T\mathbf{y}$. MLR.3 says $X\T X$ is invertible ([least squares](/a/maths/lesson.php?c=linear-algebra&l=least-squares)), which is [[#eq-beta-hat]]. The Hessian $2X\T X$ is positive definite, so the critical point is the unique minimum. The geometric reading is the same as in the Maths Atlas: $\hat{\mathbf{y}}$ is the point of $\operatorname{Col}(X)$ closest to $\mathbf{y}$, and the residual is orthogonal to that subspace, which is $X\T\hat{\mathbf{u}} = \mathbf{0}$.
:::

In `numpy`:

```python
import numpy as np
X = np.column_stack([np.ones(n), x1, x2])   # intercept and two regressors
beta_hat = np.linalg.inv(X.T @ X) @ X.T @ y
# or: beta_hat = np.linalg.lstsq(X, y, rcond=None)[0]
```

::: example Wages on schooling and experience, by hand {#ex-wage-two}
Five workers:

| Schooling $x_1$ | $8$ | $10$ | $12$ | $14$ | $16$ |
|---|---|---|---|---|---|
| Experience $x_2$ | $15$ | $10$ | $8$ | $6$ | $4$ |
| Wage $y$ | $12$ | $13$ | $16$ | $17$ | $20$ |

Estimate $y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + u$ by OLS.
::: solution
The design matrix and the products are

$$
X = \begin{pmatrix}1&8&15\\1&10&10\\1&12&8\\1&14&6\\1&16&4\end{pmatrix},\quad
X\T X = \begin{pmatrix}5&60&43\\60&760&464\\43&464&441\end{pmatrix},\quad
X\T\mathbf{y} = \begin{pmatrix}78\\976\\620\end{pmatrix}.
$$

Inverting (or solving the three normal equations) gives $\hat{\boldsymbol\beta} = (-4.467,\ 1.433,\ 0.333)\T$, to three decimals. Holding experience fixed, an extra year of school is associated with $1.433$ extra units of wages; holding schooling fixed, an extra year of experience is associated with $0.333$ extra units. The simple regression of $y$ on $x_1$ alone, by contrast, produces $\hat\beta_1^{\text{short}} = 1.00$. Experience is negatively correlated with schooling in this sample (the more schooled workers are younger), so omitting it *understates* the schooling slope — a numerical instance of [[#thm-ovb]].
:::
:::

::: widget plot
f: -4.467+1.433*x; 3.6+1.0*x
x: 7, 17
y: 8, 22
labels: \text{long (exper at 0)}; \text{short (educ only)}
caption: Two lines in the $(x_1, y)$ plane: the short regression of wages on schooling, and the long regression's schooling slope, drawn at $x_2 = 0$ for illustration. The two slopes differ because $x_2$ is correlated with $x_1$. The long-regression intercept is not comparable to the short one: it is the fitted wage at $(x_1, x_2) = (0,0)$.
:::

## Partialling out: Frisch–Waugh–Lovell

The multiple-regression slope on $x_1$ is *not* the simple-regression slope of $y$ on $x_1$. It is the simple-regression slope of $y$ on the part of $x_1$ that is not linear in the other regressors.

::: theorem Frisch–Waugh–Lovell {#thm-fwl}
Partition $X = (X_1,\ X_2)$ and $\boldsymbol\beta = (\boldsymbol\beta_1, \boldsymbol\beta_2)$. Let $M_2 = I - X_2(X_2\T X_2)^{-1}X_2\T$ be the residual maker for $X_2$. Then the OLS estimator of $\boldsymbol\beta_1$ in the long regression equals the OLS estimator from the regression of $M_2\mathbf{y}$ on $M_2 X_1$:

$$
\hat{\boldsymbol\beta}_1 = \bigl((M_2 X_1)\T (M_2 X_1)\bigr)^{-1} (M_2 X_1)\T (M_2\mathbf{y}).
$$

In words: residualise $y$ and $x_1$ on the other regressors, then run the simple (or shorter) regression of residual on residual.
:::

::: proof
The normal equations $X\T X\hat{\boldsymbol\beta} = X\T\mathbf{y}$ split as $X_1\T X_1\hat{\boldsymbol\beta}_1 + X_1\T X_2\hat{\boldsymbol\beta}_2 = X_1\T\mathbf{y}$ and $X_2\T X_1\hat{\boldsymbol\beta}_1 + X_2\T X_2\hat{\boldsymbol\beta}_2 = X_2\T\mathbf{y}$. Solve the second for $\hat{\boldsymbol\beta}_2$ and substitute into the first. Using $M_2 X_2 = 0$ and $M_2\T M_2 = M_2$, the result simplifies to $(X_1\T M_2 X_1)\hat{\boldsymbol\beta}_1 = X_1\T M_2\mathbf{y}$, which is the displayed formula.
:::

For a single coefficient $\beta_1$, FWL says: regress $x_1$ on $(1, x_2, \dots, x_k)$ and keep the residual $\tilde r_i$; regress $y$ on the same and keep $\tilde y_i$; then $\hat\beta_1 = \sum_i \tilde r_i \tilde y_i / \sum_i \tilde r_i^2$. That is why $\beta_1$ is a **partial** effect: it is the slope of $y$ on the variation in $x_1$ that is *not* associated with the other regressors. If those other regressors leave little leftover variation in $x_1$ (severe multicollinearity), the denominator is small and $\hat\beta_1$ is noisy.

::: example Multicollinearity without a breakdown {#ex-multicol}
Take the five workers of [[#ex-wage-two]] and add a third regressor $x_3 = x_1 + 0.1 x_2$, a near copy of schooling. The rank of $X$ is still $4$ (intercept plus three slopes), so MLR.3 holds and OLS exists. The schooling coefficient becomes noisy because almost all of $x_1$'s variation is shared with $x_3$: the residual $\tilde r_1$ from FWL is tiny, and $\operatorname{se}(\hat\beta_1)$ inflates. That is multicollinearity as a precision problem. If instead $x_3 = x_1$ exactly, $X\T X$ is singular and OLS is undefined — the dummy-variable trap is the same phenomenon with indicators.
::: solution
The distinction is between $\operatorname{rank}(X) = k+1$ (OLS exists, standard errors may be large) and $\operatorname{rank}(X) < k+1$ (OLS does not exist). Software that drops a column for you has imposed a normalisation; it has not "solved" collinearity. The economic response is to ask whether the two regressors really belong as separate partial effects, or whether a sum, a ratio, or a single dummy is the object of interest.
:::
:::

::: example FWL on the five workers {#ex-fwl}
For [[#ex-wage-two]], residualise $y$ and schooling on a constant and experience, and verify that the simple slope of residual on residual equals $1.433$.
::: solution
The OLS of $y$ on $(1, x_2)$ and of $x_1$ on $(1, x_2)$ produce residuals $\tilde y$ and $\tilde x_1$ (five numbers each). Their simple slope is $\sum \tilde x_1 \tilde y / \sum \tilde x_1^2 = 1.433$, matching the long-regression coefficient on schooling to the decimals reported in [[#ex-wage-two]]. (Any small discrepancy is rounding; in exact arithmetic the two coincide.)
:::
:::

::: intuition Holding other things fixed
"Holding $x_2$ fixed" does not mean that we literally freeze everyone's experience. It means we compare people who differ in schooling but, after we have projected both wages and schooling onto experience, look as if they had the same experience. If in the data high schooling *always* comes with low experience, there is no such comparison and the partial effect is unidentified — that is MLR.3 failing. If there is a little leftover variation, the comparison exists but is noisy.
:::

## Omitted-variable bias

Suppose the long model $y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + u$ satisfies MLR.1–MLR.4, but we estimate the short regression of $y$ on $x_1$ only.

::: theorem Omitted-variable bias {#thm-ovb}
Let $\tilde\beta_1$ be the OLS slope from the short regression of $y$ on $x_1$ (and an intercept). Let $\hat\delta_1$ be the OLS slope from the regression of $x_2$ on $x_1$. Then, in every sample,

$$
\tilde\beta_1 = \hat\beta_1 + \hat\beta_2\hat\delta_1,
$$

where $\hat\beta_1, \hat\beta_2$ are the long-regression estimates. Taking probability limits under MLR.1–MLR.4,

$$
\operatorname{plim}\tilde\beta_1 = \beta_1 + \beta_2 \delta_1,
$$

with $\delta_1$ the population slope of $x_2$ on $x_1$. The **omitted-variable bias** is $\beta_2\delta_1$. It is zero if $\beta_2 = 0$ or $\delta_1 = 0$.
:::

::: proof
By FWL, or by direct substitution: write $x_2 = \hat\delta_0 + \hat\delta_1 x_1 + \hat v$ with $\sum \hat v = 0$ and $\sum x_1 \hat v = 0$. Plug into the fitted long equation $y = \hat\beta_0 + \hat\beta_1 x_1 + \hat\beta_2 x_2 + \hat u$ and collect the coefficient on $x_1$. The residual $\hat u + \hat\beta_2\hat v$ is orthogonal to $x_1$, so the short-regression slope, which is the simple OLS of $y$ on $x_1$, must equal $\hat\beta_1 + \hat\beta_2\hat\delta_1$. Consistency of OLS in the long and auxiliary regressions gives the probability-limit statement.
:::

The **bias table** is worth memorising. If the omitted variable belongs with a positive coefficient ($\beta_2 > 0$) and is positively correlated with $x_1$ ($\delta_1 > 0$), the short slope is too large. Ability in a wage–schooling regression is the standard case. If the omitted variable is negatively correlated with $x_1$, the short slope is too small: experience in a sample of given age, or a scholarship targeted at low-ability students.

::: example Omitted experience in a simulated sample {#ex-ovb-sim}
Draw $n = 80$ observations from $y = 2 + 1.0\,\mathrm{educ} + 0.4\,\mathrm{exper} + u$ with `numpy.random.default_rng(11)`, where $\mathrm{educ} \sim \Normal(12, 2^2)$, $\mathrm{exper} = 8 - 0.4(\mathrm{educ}-12) + \Normal(0, 1.5^2)$ and $u \sim \Normal(0, 1.2^2)$. Compare the long and short OLS estimates of the schooling coefficient.
::: solution
The long regression recovers $\hat\beta_{\mathrm{educ}} = 1.004$ and $\hat\beta_{\mathrm{exper}} = 0.524$ (sampling noise around $1.0$ and $0.4$). The short regression of $y$ on educ alone gives $0.802$. The auxiliary slope of exper on educ is $\hat\delta_1 = -0.384$, and $0.524 \times (-0.384) = -0.201$, which equals $0.802 - 1.004$ to three decimals — [[#thm-ovb]] in a single sample. Omitting a positively valued regressor that is *negatively* correlated with schooling pulls the schooling slope down.
:::
:::

::: warning Kitchen-sink regression is not a solution
Including every available variable does not automatically purge omitted-variable bias. A control $z$ that is itself *caused by* $x$ (a **mediator**) absorbs part of the effect we want; a control that is caused by $y$ (a **collider**) can create bias that was not there. The right controls are the variables that belong in the zero-conditional-mean assumption: the confounders, not the mediators and not the colliders. That selection is an economic argument, not a maximisation of $R^2$. The potential-outcomes language for the same point is in [[causal-inference/selection-on-observables]].
:::

## Goodness of fit and degrees of freedom

As in simple regression, $\mathrm{SST} = \mathrm{SSR} + \mathrm{SSE}$ for a regression with an intercept, and $R^2 = 1 - \mathrm{SSE}/\mathrm{SST}$. Adding a regressor cannot raise SSE, so $R^2$ never falls when a variable is added. That makes $R^2$ a poor score for choosing regressors.

::: definition Adjusted $R^2$ {#def-r2-adj}
With $k$ regressors plus an intercept,

$$
\bar R^2 = 1 - \frac{\mathrm{SSE}/(n-k-1)}{\mathrm{SST}/(n-1)} = 1 - \frac{n-1}{n-k-1}(1-R^2).
$$

$\bar R^2$ penalises extra regressors; it can fall when a useless variable is added, and it can be negative.
:::

The residual-variance estimator that will feed standard errors is

$$
\hat\sigma^2 = \frac{\mathrm{SSE}}{n-k-1} = \frac{\hat{\mathbf{u}}\T\hat{\mathbf{u}}}{n-k-1}.
$$ {#eq-sigma2}

The divisor $n-k-1$ is the residual **degrees of freedom**: $k+1$ parameters were fitted. Under MLR.1–MLR.5, $\hat\sigma^2$ is unbiased for $\sigma^2$.

In [[#ex-wage-two]], $\mathrm{SSE} = 0.80$, $\mathrm{SST} = 41.2$, so $R^2 = 0.981$ and $\hat\sigma^2 = 0.80/(5-2-1) = 0.40$. The short regression on schooling alone has a lower $R^2$ and a different slope; comparing $R^2$ across models with *different dependent variables* (level versus log) is meaningless.

## The Gauss–Markov theorem

OLS is one linear estimator among many. A **linear estimator** of $\boldsymbol\beta$ is $\tilde{\boldsymbol\beta} = A\mathbf{y}$ for some $(k+1)\times n$ matrix $A$ that may depend on $X$ but not on $\mathbf{y}$. OLS has $A = (X\T X)^{-1}X\T$. **Unbiasedness** of a linear estimator, conditional on $X$, is $A X = I_{k+1}$, because $\E(A\mathbf{y}\mid X) = AX\boldsymbol\beta$ under MLR.4.

::: theorem Gauss–Markov {#thm-gm}
Assume MLR.1–MLR.5, and condition on $X$ (or take the $x_i$ as non-random). Among all linear unbiased estimators of $\boldsymbol\beta$, OLS has the smallest variance matrix: if $\tilde{\boldsymbol\beta}$ is any other linear unbiased estimator, then $\Var(\tilde{\boldsymbol\beta}\mid X) - \Var(\hat{\boldsymbol\beta}\mid X)$ is positive semi-definite. In particular, each $\hat\beta_j$ has smaller (conditional) variance than the corresponding coefficient from any other linear unbiased rule. OLS is **BLUE**: the best linear unbiased estimator.
:::

::: proof
Under MLR.4–MLR.5, $\Var(\mathbf{y}\mid X) = \sigma^2 I_n$, so $\Var(\hat{\boldsymbol\beta}\mid X) = \sigma^2 (X\T X)^{-1}$. Write a competing estimator as $\tilde{\boldsymbol\beta} = A\mathbf{y} = \bigl((X\T X)^{-1}X\T + C\bigr)\mathbf{y}$. Unbiasedness requires $AX = I$, hence $CX = 0$. Then

$$
\Var(\tilde{\boldsymbol\beta}\mid X) = \sigma^2 AA\T = \sigma^2\Bigl[(X\T X)^{-1} + CC\T\Bigr],
$$

because the cross term $(X\T X)^{-1}X\T C\T$ vanishes by $CX = 0$. The matrix $CC\T$ is positive semi-definite, and is zero if and only if $C = 0$. So $\Var(\tilde{\boldsymbol\beta}\mid X) - \Var(\hat{\boldsymbol\beta}\mid X) = \sigma^2 CC\T \ge 0$, with equality only for OLS.
:::

Four comments, each a common misunderstanding.

Gauss–Markov does **not** say that OLS is best among all estimators, only among linear unbiased ones. If $u$ is normal, the maximum-likelihood estimator coincides with OLS, so OLS is then best among *all* unbiased estimators (it attains the Cramér–Rao bound; [estimation](/a/maths/lesson.php?c=statistics&l=estimation)). If $u$ has a heavy-tailed distribution, a median regression can beat OLS.

Gauss–Markov **needs homoskedasticity**. If $\Var(u \mid X) = \sigma^2 \Omega$ with $\Omega \ne I$, the BLUE is generalised least squares, not OLS. OLS remains unbiased under MLR.1–MLR.4 alone; it is just no longer best, and $(X\T X)^{-1}\hat\sigma^2$ is no longer its variance ([[econometrics/heteroskedasticity]]).

Gauss–Markov is a **conditional-on-$X$** statement (or a fixed-$x$ statement). Unconditionally, with random $x$, the same ranking holds for the unconditional variance matrices provided the expectations exist.

**Best** means smallest variance, not "closest to the causal effect". If MLR.4 fails, OLS is biased and its small variance is a small variance around the wrong target.

::: quiz
Which assumption is *not* required for OLS to be unbiased?
- [ ] MLR.1 linearity in parameters
- [ ] MLR.3 no perfect collinearity
- [ ] MLR.4 zero conditional mean
- [x] MLR.5 homoskedasticity
::: solution
Unbiasedness uses MLR.1–MLR.4 ([[#thm-unbiased-mlr]] below). Homoskedasticity is used to compute $\Var(\hat{\boldsymbol\beta}\mid X) = \sigma^2(X\T X)^{-1}$ and to rank OLS among linear unbiased estimators. It is not used in the expectation.
:::
:::

::: proposition Unbiasedness of multiple OLS {#thm-unbiased-mlr}
Under MLR.1–MLR.4, $\E(\hat{\boldsymbol\beta}\mid X) = \boldsymbol\beta$, hence $\E(\hat{\boldsymbol\beta}) = \boldsymbol\beta$.
:::

::: proof
$\hat{\boldsymbol\beta} = (X\T X)^{-1}X\T(X\boldsymbol\beta + \mathbf{u}) = \boldsymbol\beta + (X\T X)^{-1}X\T\mathbf{u}$. MLR.4 says $\E(\mathbf{u}\mid X) = \mathbf{0}$, so the second term has conditional expectation zero.
:::

The variance matrix, under MLR.5 as well, is

$$
\Var(\hat{\boldsymbol\beta}\mid X) = \sigma^2 (X\T X)^{-1}.
$$ {#eq-varbeta}

The square root of the $j$th diagonal entry, with $\sigma^2$ replaced by $\hat\sigma^2$, is the **usual OLS standard error** of $\hat\beta_j$. Inference using that number is the next chapter.

::: application Returns to schooling, now with experience
Mincer's equation $\log w = \beta_0 + \beta_1 s + \beta_2 e + \beta_3 e^2 + u$ is a multiple regression. The schooling coefficient is a partial effect holding the quadratic in experience fixed. Card's 1999 survey of US estimates puts OLS $\hat\beta_1$ around $0.10$. That is no longer the simple-regression association of the previous chapter; it is closer to a ceteris paribus number, but only for the observables that have been included. Ability, school quality and family background remain in $u$, and the argument about the sign of the leftover bias is the argument of [[#thm-ovb]].
:::

::: history
**1934, Ragnar Frisch and Frederick Waugh; 1963, Michael Lovell.** Frisch and Waugh showed, in a time-series setting, that one can "detrend" both $y$ and $x$ and then regress residual on residual, obtaining the same slope as the regression that includes the trend. Lovell extended the result to arbitrary partitions of $X$. The theorem is older than its name: it is the algebra of block-inverting the normal equations. Andrey Markov (1900, 1912) restated Gauss's optimality result for linear unbiased estimators; the modern matrix proof above is the one used throughout econometrics.
:::

## Where this leads

We can estimate partial effects and we know when OLS is BLUE. [[econometrics/inference]] turns [[#eq-varbeta]] into $t$ tests, $F$ tests and confidence intervals. [[econometrics/specification]] puts logs, quadratics, interactions and dummy variables into $X$. [[econometrics/heteroskedasticity]] drops MLR.5 and repairs the standard errors. When MLR.4 fails even after a reasonable list of controls, [[econometrics/panel-data]] and [[econometrics/instrumental-variables]] offer other sources of variation.

::: summary
- Multiple regression estimates $y = \beta_0 + \beta_1 x_1 + \cdots + \beta_k x_k + u$ by $\hat{\boldsymbol\beta} = (X\T X)^{-1}X\T\mathbf{y}$. The slope $\beta_j$ is a partial effect.
- Frisch–Waugh–Lovell: $\hat\beta_1$ is the simple slope of $y$ residualised on the other regressors, on $x_1$ residualised on the other regressors.
- Omitting $x_2$ biases the slope on $x_1$ by $\beta_2\delta_1$. The sign is the product of the omitted coefficient and the correlation of the omitted variable with $x_1$.
- Under MLR.1–MLR.4, OLS is unbiased. Under MLR.1–MLR.5 it is BLUE (Gauss–Markov). Homoskedasticity is not needed for unbiasedness.
- Perfect collinearity makes OLS undefined; strong but imperfect collinearity inflates variances. $R^2$ never falls when a regressor is added; $\bar R^2$ can.
:::

## Exercises

::: exercise Read off a partial effect {level=1 check="1.433"}
In [[#ex-wage-two]] the estimated equation is $\hat y = -4.467 + 1.433 x_1 + 0.333 x_2$. Holding experience fixed, by how much does fitted wage change when schooling rises by one year? (Enter the change.)
::: solution
The partial effect of schooling is the coefficient $1.433$.
:::
:::

::: exercise Rank and collinearity {level=1}
A sample of $n = 40$ people includes an intercept, a dummy $m$ for male, and a dummy $f$ for female, with $m + f = 1$ for every person. Does MLR.3 hold? What would OLS return if you tried `np.linalg.inv(X.T @ X)`?
::: solution
MLR.3 fails: the intercept column equals $m + f$, so the three columns are linearly dependent and $X\T X$ is singular. `numpy` will raise `LinAlgError` (or, with `lstsq`, return one of the infinitely many least-squares solutions, typically the minimum-norm one, which is not the "male effect" anyone wanted). The standard fix is to drop one dummy: $\hat y = \hat\beta_0 + \hat\beta_1 m$, with $\hat\beta_1$ the male–female difference ([[econometrics/specification]]).
:::
:::

::: exercise $R^2$ and $\bar R^2$ {level=1 check="0.644"}
A regression with $n = 20$, $k = 3$ (plus intercept) has $R^2 = 0.70$. Compute $\bar R^2$ to three decimal places. (Enter $\bar R^2$.)
::: solution
$\bar R^2 = 1 - \dfrac{n-1}{n-k-1}(1-R^2) = 1 - \dfrac{19}{16}\times 0.30 = 1 - 0.35625 = 0.64375$, which rounds to $0.644$. The penalty for three extra slopes, with only $16$ residual degrees of freedom, is visible: $\bar R^2$ is well below $R^2$.
:::
:::

::: exercise The bias table {level=2}
The long model is $y = \beta_0 + \beta_1 x + \beta_2 z + u$ with $\beta_1 > 0$. For each case, state whether the short regression of $y$ on $x$ overstates, understates, or consistently estimates $\beta_1$.

(a) $z$ is a measure of ability, $\beta_2 > 0$, $\Corr(x,z) > 0$.

(b) $z$ is on-the-job training, $\beta_2 > 0$, $\Corr(x,z) = 0$.

(c) $z$ is a dummy for a poorer region, $\beta_2 < 0$, and $x$ (schooling) is lower in that region, $\Corr(x,z) < 0$.
::: solution
Bias $= \beta_2\delta_1$ with $\operatorname{sign}(\delta_1) = \operatorname{sign}(\Corr(x,z))$. (a) Positive times positive: the short slope overstates $\beta_1$. (b) $\delta_1 = 0$: no bias. (c) Negative times negative: the product is positive, so the short slope again overstates $\beta_1$. (Poorer regions have both less school and lower $y$; omitting the region dummy attributes the regional wage gap to schooling.)
:::
:::

::: exercise Reconstruct the short slope {level=2 check="1"}
In [[#ex-wage-two]] the long estimates are $\hat\beta_1 = 1.433$, $\hat\beta_2 = 0.333$ and the auxiliary slope of experience on schooling is $\hat\delta_1 = -1.3$. Using [[#thm-ovb]], compute the short-regression slope of wages on schooling. (Enter the short slope, which is an integer.)
::: solution
$\tilde\beta_1 = 1.433 + 0.333\times(-1.3) = 1.433 - 0.433 = 1.000$, matching the simple OLS reported in [[#ex-wage-two]].
:::
:::

::: exercise Variance of a slope {level=2}
Under MLR.1–MLR.5, $\Var(\hat\beta_j \mid X) = \sigma^2 / \mathrm{SST}_j^{\text{res}}$, where $\mathrm{SST}_j^{\text{res}}$ is the residual sum of squares from regressing $x_j$ on the other columns of $X$. Using FWL, explain why adding a regressor that is highly correlated with $x_j$ tends to raise $\operatorname{se}(\hat\beta_j)$.
::: solution
FWL writes $\hat\beta_j$ as the simple slope of residualised $y$ on residualised $x_j$, so $\Var(\hat\beta_j \mid X) = \sigma^2 / \sum_i \tilde r_{ij}^2$. A new regressor correlated with $x_j$ absorbs part of $x_j$'s variation and shrinks $\sum_i \tilde r_{ij}^2$. Unless it also shrinks $\sigma^2$ by enough, the variance of $\hat\beta_j$ rises. That is multicollinearity as a precision problem, not a bias problem.
:::
:::

::: exercise Prove a diagonal formula {level=3}
For simple regression ($k = 1$), show that $(X\T X)^{-1}$ equals $\dfrac{1}{n S_{xx}}\begin{pmatrix} \sum_i x_i^2 & -\sum_i x_i \\ -\sum_i x_i & n \end{pmatrix}$ and deduce $\Var(\hat\beta_1 \mid X) = \sigma^2 / S_{xx}$.
::: hint
$X\T X = \begin{pmatrix}n & \sum x_i \\ \sum x_i & \sum x_i^2\end{pmatrix}$ and $\det(X\T X) = n\sum x_i^2 - (\sum x_i)^2 = n S_{xx}$.
:::
::: solution
$X\T X = \begin{pmatrix}n & \sum x_i \\ \sum x_i & \sum x_i^2\end{pmatrix}$. The determinant is $n\sum x_i^2 - (\sum x_i)^2 = n\sum(x_i - \bar x)^2 = n S_{xx}$. The inverse is then $\frac{1}{n S_{xx}}\begin{pmatrix}\sum x_i^2 & -\sum x_i \\ -\sum x_i & n\end{pmatrix}$. The $(2,2)$ entry of $\sigma^2(X\T X)^{-1}$ is $\sigma^2 n / (n S_{xx}) = \sigma^2 / S_{xx}$, which is the simple-regression formula.
:::
:::

::: exercise A linear unbiased competitor {level=3}
In simple regression, consider the estimator that joins the first and last observations: $\tilde\beta_1 = (y_n - y_1)/(x_n - x_1)$, assuming $x_n \ne x_1$. Show that, with non-random $x_i$ and SLR.1 plus $\E(u_i) = 0$, $\tilde\beta_1$ is unbiased for $\beta_1$. Why does Gauss–Markov say OLS is still preferable?
::: hint
Write $y_n - y_1 = \beta_1(x_n - x_1) + (u_n - u_1)$. For the second part, $\tilde\beta_1$ uses only two observations.
:::
::: solution
$y_n - y_1 = \beta_1(x_n-x_1) + (u_n-u_1)$, so $\tilde\beta_1 = \beta_1 + (u_n-u_1)/(x_n-x_1)$ and $\E(\tilde\beta_1) = \beta_1$. The estimator is linear in $\mathbf{y}$ and unbiased, so it is in the Gauss–Markov class. Its variance is $2\sigma^2/(x_n-x_1)^2$ under SLR.5, which uses only two errors; OLS uses all $n$ observations and has variance $\sigma^2/S_{xx} \le 2\sigma^2/(x_n-x_1)^2$, with equality only if every other $x_i$ is $\bar x$ (no extra information). Gauss–Markov is the statement that no linear unbiased trick of this kind can beat OLS under MLR.1–MLR.5.
:::
:::
