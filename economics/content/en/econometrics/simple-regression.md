A small firm records its advertising spend $x$ (thousands of units of money) and its sales $y$ (also in thousands) in five months:

| Month | $1$ | $2$ | $3$ | $4$ | $5$ |
|---|---|---|---|---|---|
| Advertising $x$ | $2$ | $4$ | $6$ | $8$ | $10$ |
| Sales $y$ | $3$ | $5$ | $8$ | $9$ | $13$ |

Sales rise with advertising, roughly along a line. Which line? How much extra sales should we associate with one extra unit of advertising? And if next month's advertising is $7$, what sales should we predict? **Simple linear regression** answers those questions by fitting one line, $y = \beta_0 + \beta_1 x + u$, to the cloud of points. The method of **ordinary least squares** (OLS) chooses the line that minimises the sum of squared vertical gaps. This chapter derives that estimator, records the algebraic identities it always satisfies, interprets the coefficients, and introduces $R^2$. Statistical properties — unbiasedness, the Gauss–Markov theorem, standard errors — need assumptions, which we state here and use in [[econometrics/multiple-regression]] and [[econometrics/inference]].

The linear algebra of least squares is in the Maths Atlas ([least squares](/a/maths/lesson.php?c=linear-algebra&l=least-squares)); the statistical linear model is in [regression](/a/maths/lesson.php?c=statistics&l=regression). We keep Wooldridge's notation: $y = \beta_0 + \beta_1 x + u$, with error $u$ and residual $\hat u$.

## The population model

::: definition Simple linear regression {#def-slr}
The **simple linear regression model** for a population is

$$
y = \beta_0 + \beta_1 x + u,
$$ {#eq-slr}

where $y$ is the **dependent** variable, $x$ is the **explanatory** variable, $u$ is the **error** (or **disturbance**), $\beta_0$ is the **intercept** and $\beta_1$ is the **slope**. The slope is the ceteris paribus change in $y$ associated with a one-unit change in $x$: if $u$ is held fixed, $\Delta y = \beta_1 \Delta x$.
:::

The error $u$ stands for everything else that moves $y$: omitted variables, measurement error in $y$, and genuine randomness. It is not a residual; residuals appear only after we have estimates. Two interpretations of [[#eq-slr]] sit side by side. As a **linear approximation** to $\E(y \mid x)$, the equation is a descriptive curve through the scatter. As a **causal model**, $\beta_1$ is the effect of an intervention that changes $x$ and nothing in $u$. The algebra of OLS is the same in both readings; the assumptions that make $\hat\beta_1$ a good estimator of a causal $\beta_1$ are stronger, as [[econometrics/economic-data]] emphasised.

To talk about estimation we need a sample of $n$ pairs $(x_i, y_i)$ and a list of assumptions. Following Wooldridge, the simple-regression list is SLR.1–SLR.5.

::: definition Assumptions SLR.1–SLR.4 {#def-slr-assumptions}
**SLR.1 (linearity).** The population is [[#eq-slr]].

**SLR.2 (random sampling).** The sample $\{(x_i, y_i)\}_{i=1}^n$ is independently and identically distributed from the population.

**SLR.3 (variation in $x$).** $S_{xx} = \sum_{i=1}^n (x_i - \bar x)^2 > 0$: the explanatory variable is not constant in the sample.

**SLR.4 (zero conditional mean).** $\E(u \mid x) = 0$. Equivalently, $\E(y \mid x) = \beta_0 + \beta_1 x$.

A weaker, and sometimes more convenient, version of SLR.4 is $\E(u) = 0$ together with $\Cov(x, u) = 0$. SLR.4 implies the weaker pair; the converse is not true.
:::

SLR.4 is the substantive economic assumption. It says that, once $x$ is known, the remaining determinants of $y$ have mean zero — no systematic tendency for $u$ to be positive when $x$ is large. Random assignment of $x$ delivers SLR.4 by design. In observational data it is a claim about the world, and it is often false: that is the omitted-variable, reverse-causality and simultaneity problem of the previous chapter.

A fifth assumption, **SLR.5 (homoskedasticity)**: $\Var(u \mid x) = \sigma^2$, a constant, is not needed for unbiasedness of OLS. It is needed for the usual variance formula and for Gauss–Markov. We state it when we use it.

::: remark Fixed versus random $x$
Some treatments take the $x_i$ as non-random (fixed in repeated samples), as in a designed experiment with chosen doses. Then SLR.2 is replaced by independence of the $u_i$ and SLR.4 by $\E(u_i) = 0$. The OLS formulae do not change, and the algebra below is written so that it applies to both readings. With observational data it is more natural to treat $(x, y)$ as jointly random, which is the convention we follow.
:::

## Ordinary least squares

Given a sample, each candidate pair $(b_0, b_1)$ produces fitted values $b_0 + b_1 x_i$ and residuals $y_i - b_0 - b_1 x_i$. Least squares chooses the pair that minimises the sum of squared residuals.

::: theorem OLS estimators in simple regression {#thm-ols-simple}
Assume SLR.3. The unique minimisers of $Q(b_0, b_1) = \sum_{i=1}^n (y_i - b_0 - b_1 x_i)^2$ are

$$
\hat\beta_1 = \frac{S_{xy}}{S_{xx}} = \frac{\sum_i (x_i - \bar x)(y_i - \bar y)}{\sum_i (x_i - \bar x)^2}, \qquad \hat\beta_0 = \bar y - \hat\beta_1 \bar x,
$$ {#eq-ols}

where $\bar x = n^{-1}\sum_i x_i$ and $\bar y = n^{-1}\sum_i y_i$. Equivalently, $\hat\beta_1 = s_{xy}/s_x^2$, the ratio of the sample covariance to the sample variance of $x$.
:::

::: proof
This is an unconstrained minimisation in two variables ([[mathematical-economics/unconstrained-optimisation]]). The partial derivatives (the **normal equations**) are

$$
\frac{\partial Q}{\partial b_0} = -2\sum_i (y_i - b_0 - b_1 x_i) = 0, \qquad \frac{\partial Q}{\partial b_1} = -2\sum_i x_i (y_i - b_0 - b_1 x_i) = 0.
$$

The first equation says $\bar y = b_0 + b_1 \bar x$, so $b_0 = \bar y - b_1 \bar x$. Substitute into the second: $\sum_i x_i \bigl(y_i - \bar y - b_1 (x_i - \bar x)\bigr) = 0$. Using $\sum_i (x_i - \bar x) = 0$ this rearranges to $S_{xy} - b_1 S_{xx} = 0$. SLR.3 gives $S_{xx} > 0$, so $b_1 = S_{xy}/S_{xx}$. The Hessian of $Q$ is positive definite (its leading minor is $2n > 0$ and its determinant is $4n S_{xx} > 0$), so the critical point is the unique minimum. The same conclusion follows from completing the square, as in [the Maths Atlas derivation](/a/maths/lesson.php?c=statistics&l=regression).
:::

The fitted values and residuals are then

$$
\hat y_i = \hat\beta_0 + \hat\beta_1 x_i, \qquad \hat u_i = y_i - \hat y_i.
$$

OLS can be computed by hand from the four summaries $\bar x, \bar y, S_{xx}, S_{xy}$, or in one matrix step. With $X$ the $n \times 2$ matrix whose first column is ones and whose second column is the $x_i$, and $\mathbf{y}$ the vector of $y_i$,

$$
\hat{\boldsymbol\beta} = (X\T X)^{-1} X\T \mathbf{y},
$$ {#eq-ols-matrix}

which is the formula we will live with from [[econometrics/multiple-regression]] onward. For one regressor it is exactly [[#eq-ols]]. In `numpy`, with no statistical package required:

```python
import numpy as np
X = np.column_stack([np.ones(n), x])
beta_hat = np.linalg.inv(X.T @ X) @ X.T @ y
```

(The numerically stabler `np.linalg.lstsq(X, y, rcond=None)` solves the same least-squares problem without forming $X\T X$. For the small $n$ of this course the two agree to many decimals.)

::: example Advertising and sales, by hand {#ex-advertising}
Fit OLS to the five months in the introduction.
::: solution
$n = 5$, $\bar x = 6$, $\bar y = 7.6$. The deviations of $x$ are $-4,-2,0,2,4$ and of $y$ are $-4.6,-2.6,0.4,1.4,5.4$, so

$$
S_{xx} = 16+4+0+4+16 = 40, \qquad S_{xy} = 18.4 + 5.2 + 0 + 2.8 + 21.6 = 48.
$$

Hence $\hat\beta_1 = 48/40 = 1.2$ and $\hat\beta_0 = 7.6 - 1.2\times 6 = 0.4$. The fitted line is $\hat y = 0.4 + 1.2 x$. One extra unit of advertising is associated with $1.2$ extra units of sales in this sample. The fitted values are $2.8, 5.2, 7.6, 10.0, 12.4$ and the residuals are $0.2, -0.2, 0.4, -1.0, 0.6$, which sum to zero. At $x = 7$, the predicted sales are $0.4 + 1.2\times 7 = 8.8$.
:::
:::

::: widget regression
points: 2,3; 4,5; 6,8; 8,9; 10,13
degree: 1
x: 0, 12
y: 0, 16
caption: The advertising data and the OLS line $\hat y = 0.4 + 1.2x$. Display the residuals: OLS minimises the sum of the areas of those squares. Drag the point at $x = 10$ up or down — it has more **leverage** than a point near $\bar x = 6$, because $(x_i - \bar x)^2$ is larger — and watch the slope swing.
:::

::: example Five workers, wages on schooling {#ex-five-wages}
For five workers, schooling $x = (8, 10, 12, 14, 16)$ and wages $y = (9, 11, 14, 16, 20)$. Compute $\hat\beta_0$, $\hat\beta_1$ and the residual at $x = 14$.
::: solution
$\bar x = 12$, $\bar y = 14$, $S_{xx} = 40$, $S_{xy} = 54$, so $\hat\beta_1 = 54/40 = 1.35$ and $\hat\beta_0 = 14 - 1.35\times 12 = -2.2$. The line is $\hat y = -2.2 + 1.35 x$. At $x = 14$, $\hat y = 16.7$ and the residual is $16 - 16.7 = -0.7$. The intercept $-2.2$ is the fitted wage at zero years of school, far outside the sample; it is a by-product of the linear fit, not a prediction we would use.
:::
:::

::: warning Do not treat the intercept as a prediction outside the data
$\hat\beta_0$ is the fitted value at $x = 0$. If $x = 0$ is far from the observed $x_i$ — years of school, a price that never hits zero, a test score centred at $500$ — the intercept is an extrapolation. It is needed algebraically (the line has to cross the $y$-axis somewhere) and it is needed for the residuals to have mean zero, but it is not, by itself, an interesting economic number. The slope is usually the object of interest.
:::

## Algebraic properties of OLS

Whatever the data, provided SLR.3 holds so that the fit exists, the OLS residuals and fitted values satisfy a short list of identities. They are accounting, not statistics: they do not need SLR.4.

::: proposition Algebraic properties of simple OLS {#prop-algebra}
For a simple OLS fit with an intercept:

1. The residuals sum to zero: $\sum_i \hat u_i = 0$, so $\overline{\hat u} = 0$ and $\bar y = \overline{\hat y}$.
2. The residuals are orthogonal to $x$ and to the fitted values: $\sum_i x_i \hat u_i = 0$ and $\sum_i \hat y_i \hat u_i = 0$.
3. The fitted line passes through the point of means $(\bar x, \bar y)$.
4. The sample correlation of $\hat u$ and $x$ is zero.
:::

::: proof
(1) is the first normal equation. (3) is $\hat\beta_0 = \bar y - \hat\beta_1 \bar x$ rewritten. (2): $\sum_i x_i \hat u_i = 0$ is the second normal equation; then $\sum_i \hat y_i \hat u_i = \hat\beta_0 \sum_i \hat u_i + \hat\beta_1 \sum_i x_i \hat u_i = 0$. (4) follows from (1) and (2), because the sample covariance of $x$ and $\hat u$ is a multiple of $\sum_i (x_i - \bar x)\hat u_i = \sum_i x_i \hat u_i - \bar x \sum_i \hat u_i = 0$.
:::

Property (4) is why a residual-versus-$x$ plot can never show a *linear* trend: OLS has already taken that trend out. What the plot *can* show is curvature, a fan of changing spread, or a stray point — all of which are reasons to distrust the simple linear fit.

A useful rewriting of the slope will serve us constantly:

$$
\hat\beta_1 = \sum_{i=1}^n w_i y_i, \qquad w_i = \frac{x_i - \bar x}{S_{xx}}.
$$ {#eq-linear-combo}

OLS is a **linear estimator**: a weighted sum of the $y_i$, with weights that depend on $x$ but not on $y$. The weights sum to zero and $\sum_i w_i x_i = 1$, which is why $\hat\beta_1$ is unbiased for $\beta_1$ under SLR.1–SLR.4 (the next section). Observations far from $\bar x$ receive larger $\lvert w_i\rvert$: they have more **leverage**.

## Goodness of fit

How much of the variation in $y$ has the line captured? Decompose the total sum of squares from the mean into a part explained by the fit and a leftover.

::: definition SST, SSE, SSR and $R^2$ {#def-r2}
Write $\mathrm{SST} = \sum_i (y_i - \bar y)^2$, $\mathrm{SSE} = \sum_i \hat u_i^2$ (the **sum of squared residuals**, also called SSR in some texts — we keep SSE for "error") and $\mathrm{SSR} = \sum_i (\hat y_i - \bar y)^2$ (the **regression** or **explained** sum of squares). For a regression with an intercept,

$$
\mathrm{SST} = \mathrm{SSR} + \mathrm{SSE}, \qquad R^2 = \frac{\mathrm{SSR}}{\mathrm{SST}} = 1 - \frac{\mathrm{SSE}}{\mathrm{SST}}.
$$ {#eq-r2}

$R^2$ is the **coefficient of determination**, the fraction of the sample variation in $y$ that the fitted line accounts for. In simple regression, $R^2 = r_{xy}^2$.
:::

The decomposition SST $=$ SSR $+$ SSE uses $\sum_i \hat u_i(\hat y_i - \bar y) = 0$, which is [[#prop-algebra]]. $R^2$ always lies in $[0, 1]$ for a regression with an intercept. $R^2 = 1$ means every point is on the line; $R^2 = 0$ means $\hat\beta_1 = 0$ and the "fit" is the horizontal line $y = \bar y$. A high $R^2$ is neither necessary nor sufficient for a causal interpretation of $\hat\beta_1$, and it is not a test of SLR.4. It is a descriptive number about this sample.

::: example $R^2$ for advertising {#ex-r2-advertising}
For the data of [[#ex-advertising]], compute SST, SSR, SSE and $R^2$.
::: solution
$S_{yy} = \mathrm{SST} = 59.2$. Because $\mathrm{SSR} = \hat\beta_1 S_{xy} = 1.2 \times 48 = 57.6$ and $\mathrm{SSE} = \sum_i \hat u_i^2 = 0.04+0.04+0.16+1+0.36 = 1.6$, we have $59.2 = 57.6 + 1.6$ and $R^2 = 57.6/59.2 \approx 0.973$. About $97\%$ of the sample variation in sales is accounted for by the linear fit to advertising. With five points and a tight scatter that is unsurprising; it is not evidence that advertising *causes* sales, and it will fall as soon as the sample includes months in which other things moved.
:::
:::

::: quiz
A simple regression of $y$ on $x$ has $R^2 = 0.09$. Which statement is correct?
- [ ] $\hat\beta_1$ must be insignificant.
- [ ] The linear model is misspecified.
- [x] The fitted line accounts for $9\%$ of the sample variation in $y$; that is compatible with a well-estimated, even causal, slope if $n$ is large and SLR.4 holds.
- [ ] $r_{xy} = 0.09$.
::: solution
$R^2 = r_{xy}^2$, so $r_{xy} = \pm 0.3$, not $0.09$. A small $R^2$ is the usual state of affairs in cross-section micro data (individual wages, firm investment): most of $y$ is other things. It does not by itself say that $\hat\beta_1$ is noisy — that depends on $n$ and on $\Var(x)$ — nor that SLR.4 fails.
:::
:::

## Interpretation, units and functional form

If $y$ is in thousands of units of money and $x$ is in years, $\hat\beta_1$ is thousands of units of money per year. Rescaling $x$ by a factor $a$ (years to months: $a = 1/12$) divides $\hat\beta_1$ by $a$; rescaling $y$ by $c$ multiplies $\hat\beta_1$ by $c$. Fitted values, residuals and $R^2$ are invariant to rescaling $x$; they scale with $y$ in the obvious way. Always state the units.

Three functional forms will recur. They are still *simple* regression: one slope, estimated by [[#eq-ols]], applied to a transformation of $y$ or $x$.

- **Level–level.** $y = \beta_0 + \beta_1 x + u$. A one-unit change in $x$ is associated with a $\beta_1$-unit change in $y$.
- **Log–level.** $\log y = \beta_0 + \beta_1 x + u$. A one-unit change in $x$ is associated with a $100\beta_1$ *percent* change in $y$, approximately, for small $\beta_1$. (The exact figure is $100(e^{\beta_1} - 1)$ percent.) This is the Mincer equation's slope on schooling: $\hat\beta_1 = 0.10$ means about $10.5\%$ higher wages per extra year, or "$10\%$" as a linear approximation.
- **Log–log.** $\log y = \beta_0 + \beta_1 \log x + u$. $\beta_1$ is an **elasticity**: a $1\%$ change in $x$ is associated with a $\beta_1\%$ change in $y$. Demand curves are often written this way.

Quadratics, interactions and dummy variables need more than one regressor and belong to [[econometrics/specification]]. The choice of form is an economic choice (is the interesting number a derivative, a semi-elasticity, or an elasticity?) as much as a statistical one. Plot $y$ against $x$ and $\log y$ against $x$ before committing.

::: example A log-wage slope {#ex-log-wage}
A regression of $\log w$ on years of school, in a large sample, gives $\hat\beta_1 = 0.080$. Interpret the slope, and compute the exact percentage change associated with one extra year.
::: solution
The linear approximation says an extra year of school is associated with $8\%$ higher wages. The exact figure from the log model is $100(e^{0.080} - 1) = 8.33\%$. For a slope of $0.08$ the two are close; for a slope of $0.40$ (a large discrete change) one should report the exact transformation. Neither number is a causal effect unless SLR.4 holds for this $u$.
:::
:::

## Unbiasedness of OLS

Algebraic properties hold in every sample. **Unbiasedness** is a statement about the sampling distribution: if we drew many samples from the same population and computed $\hat\beta_1$ each time, the average of those $\hat\beta_1$ would be $\beta_1$.

::: theorem Unbiasedness of simple OLS {#thm-unbiased}
Under SLR.1–SLR.4, $\E(\hat\beta_0) = \beta_0$ and $\E(\hat\beta_1) = \beta_1$. The expectation may be read as conditional on the realised $x_1, \dots, x_n$, or unconditionally; both hold.
:::

::: proof
From [[#eq-linear-combo]] and SLR.1, $y_i = \beta_0 + \beta_1 x_i + u_i$, so

$$
\hat\beta_1 = \sum_i w_i (\beta_0 + \beta_1 x_i + u_i) = \beta_1 \sum_i w_i x_i + \sum_i w_i u_i = \beta_1 + \sum_i w_i u_i,
$$

because $\sum_i w_i = 0$ and $\sum_i w_i x_i = 1$. Conditioning on $x_1, \dots, x_n$ (which fixes the $w_i$) and using SLR.4, $\E(u_i \mid x_1, \dots, x_n) = 0$, we obtain $\E(\hat\beta_1 \mid x_1, \dots, x_n) = \beta_1$. The law of iterated expectations gives $\E(\hat\beta_1) = \beta_1$. The intercept then follows from $\hat\beta_0 = \bar y - \hat\beta_1 \bar x$ and $\E(\bar y \mid x_1, \dots, x_n) = \beta_0 + \beta_1 \bar x$.
:::

If SLR.4 fails, $\E(\sum_i w_i u_i \mid x) \ne 0$ and OLS is biased. That is omitted-variable bias in one line. SLR.5 is not used: OLS is unbiased under heteroskedasticity, though it is then no longer the best linear unbiased estimator, and the usual standard errors are wrong ([[econometrics/heteroskedasticity]]).

::: example A Monte Carlo check {#ex-montecarlo-ols}
Fix $x_i = 1, 1.47, \ldots, 10$ equally spaced, $n = 20$, and generate $y_i = 4 + 1.5 x_i + u_i$ with $u_i \iid \Normal(0, 2^2)$, using `numpy.random.default_rng(42)`, $1{,}000$ times. The mean of the $1{,}000$ slope estimates is $1.499$ and the mean of the intercept estimates is $4.018$. The standard deviation of the slope estimates is $0.076$, against the theoretical $\sigma / \sqrt{S_{xx}} = 2 / \sqrt{693.16} \approx 0.076$.
::: solution
The Monte Carlo mean of $\hat\beta_1$ matches $\beta_1 = 1.5$ to three decimals, as [[#thm-unbiased]] predicts. The scatter of $\hat\beta_1$ across repeats *is* the sampling distribution; its standard deviation is the standard error we will estimate from a *single* sample in [[econometrics/inference]]. The generator and the seed are recorded so that the numbers can be reproduced.
:::
:::

::: widget plot
f: 4+1.5*x; 4+1.5*x + 2; 4+1.5*x - 2
x: 0, 11
y: 0, 22
labels: \E(y\mid x); \E(y\mid x)+2\sigma; \E(y\mid x)-2\sigma
caption: The population regression function $\E(y \mid x) = 4 + 1.5x$ of [[#ex-montecarlo-ols]], with a two-standard-deviation band. Each sample of $20$ points is a random cloud around this line; OLS estimates the line, not any one cloud. Homoskedasticity (SLR.5) is the statement that the vertical spread is the same at every $x$.
:::

::: quiz
Under SLR.1–SLR.4, which of the following is guaranteed?
- [ ] $R^2$ is close to $1$.
- [x] $\E(\hat\beta_1) = \beta_1$.
- [ ] $\hat\beta_1 = \beta_1$ in every sample.
- [ ] The residuals $\hat u_i$ are independent of $x_i$.
::: solution
Unbiasedness says the *average* of $\hat\beta_1$ over samples is $\beta_1$, not that any one sample hits $\beta_1$, and it says nothing about $R^2$. The residuals are orthogonal to $x$ in every sample ([[#prop-algebra]]), which is a numerical identity, not the independence of the unobserved errors $u_i$ from $x_i$.
:::
:::

## Where this leads

We have a formula, a set of identities, an interpretation, and unbiasedness. Two things are missing. First, **several** explanatory variables: almost every applied regression has them, and the omitted-variable formula of the previous chapter is a statement about a short regression versus a long one. That is [[econometrics/multiple-regression]], where the Gauss–Markov theorem is proved in matrix form. Second, **precision**: a standard error for $\hat\beta_1$, a $t$ test of $H_0$: $\beta_1 = 0$, a confidence interval. Those need SLR.5 (or a robust substitute) and are the subject of [[econometrics/inference]]. Functional form — logs we have previewed, quadratics, dummies — is [[econometrics/specification]].

::: history
**1805, Adrien-Marie Legendre; 1809, Carl Friedrich Gauss.** Legendre published the method of least squares in an appendix to *Nouvelles méthodes pour la détermination des orbites des comètes*, as a rule for reconciling inconsistent astronomical observations. Gauss, in *Theoria motus corporum coelestium* (1809), gave a probabilistic justification by assuming normally distributed errors and claimed to have used the method since 1795. The name **regression** is later: Francis Galton, studying the heights of parents and adult children in 1886, described "regression towards mediocrity" — the slope of the least-squares line, in standardised units, is the correlation, which is less than one in absolute value whenever the scatter is imperfect. The phenomenon is algebraic, not biological: it is $R^2 < 1$ in other words.
:::

::: summary
- The simple model is $y = \beta_0 + \beta_1 x + u$. OLS minimises $\sum_i (y_i - b_0 - b_1 x_i)^2$ and yields $\hat\beta_1 = S_{xy}/S_{xx}$, $\hat\beta_0 = \bar y - \hat\beta_1 \bar x$, or $\hat{\boldsymbol\beta} = (X\T X)^{-1}X\T\mathbf{y}$.
- Residuals sum to zero, are orthogonal to $x$ and to $\hat y$, and the line passes through $(\bar x, \bar y)$.
- $R^2 = \mathrm{SSR}/\mathrm{SST} = r_{xy}^2$ is the fraction of sample variation in $y$ accounted for by the fit; it is not a test of causality.
- Under SLR.1–SLR.4, OLS is unbiased. SLR.4, $\E(u \mid x) = 0$, is the economic assumption and the one most often false.
- Units and logs change the meaning of $\beta_1$: a derivative, a semi-elasticity, or an elasticity. The intercept is often an extrapolation.
:::

## Exercises

::: exercise A slope by hand {level=1 check="1.1"}
For the points $(1, 2)$, $(2, 2)$, $(3, 4)$, $(4, 5)$, compute $\hat\beta_1$ and $\hat\beta_0$. Enter the slope.
::: solution
$\bar x = 2.5$, $\bar y = 3.25$. Deviations of $x$: $-1.5,-0.5,0.5,1.5$; of $y$: $-1.25,-1.25,0.75,1.75$. Then $S_{xx} = 5$ and $S_{xy} = 1.875 + 0.625 + 0.375 + 2.625 = 5.5$, so $\hat\beta_1 = 5.5/5 = 1.1$ and $\hat\beta_0 = 3.25 - 1.1\times 2.5 = 0.5$. The line is $\hat y = 0.5 + 1.1 x$.
:::
:::

::: exercise Fitted value {level=1 check="8.8"}
Using the advertising fit $\hat y = 0.4 + 1.2 x$ of [[#ex-advertising]], predict sales when advertising equals $7$. (Enter the fitted value.)
::: solution
$0.4 + 1.2\times 7 = 8.8$.
:::
:::

::: exercise Residuals sum to zero {level=1 check="0"}
In [[#ex-advertising]] the residuals are $0.2, -0.2, 0.4, -1.0, 0.6$. Report their sum. (Enter the sum.)
::: solution
$0.2 - 0.2 + 0.4 - 1.0 + 0.6 = 0$, as [[#prop-algebra]] requires of any OLS fit with an intercept.
:::
:::

::: exercise $R^2$ from SSE and SST {level=2 check="0.973"}
In [[#ex-r2-advertising]], $\mathrm{SST} = 59.2$ and $\mathrm{SSE} = 1.6$. Compute $R^2$ to three decimal places. (Enter $R^2$.)
::: solution
$R^2 = 1 - 1.6/59.2 = 57.6/59.2 = 0.97297\ldots$, which rounds to $0.973$.
:::
:::

::: exercise Changing the units of $x$ {level=2 check="12"}
Suppose, in [[#ex-advertising]], advertising had been measured in tens of units rather than in units, so each $x$ is replaced by $x/10$ (the new values are $0.2, 0.4, 0.6, 0.8, 1.0$). What is the new slope? (Enter the new $\hat\beta_1$.)
::: solution
If $x^* = x/10$, then $S_{x^*x^*} = S_{xx}/100$ and $S_{x^*y} = S_{xy}/10$, so $\hat\beta_1^* = (S_{xy}/10)/(S_{xx}/100) = 10\hat\beta_1 = 12$. One extra *ten*-unit of advertising is associated with $12$ extra units of sales, which is the same relationship as a slope of $1.2$ per unit. Fitted values, residuals and $R^2$ are unchanged.
:::
:::

::: exercise A log–level interpretation {level=2 check="10.5"}
A regression of $\log y$ on $x$ gives $\hat\beta_1 = 0.10$. By how many percent does $y$ change, exactly, when $x$ increases by one? Use $100(e^{0.10}-1)$ and round to one decimal place. (Enter the percentage, without the percent sign.)
::: solution
$e^{0.10} - 1 \approx 0.10517$, so $10.5\%$. The linear approximation $100\hat\beta_1 = 10$ is the figure usually quoted; the exact transformation is a little larger.
:::
:::

::: exercise OLS as a weighted sum {level=3}
Using [[#eq-linear-combo]], show that $\sum_i w_i = 0$ and $\sum_i w_i x_i = 1$. Deduce that if $y_i = \beta_0 + \beta_1 x_i$ exactly (no error), then $\hat\beta_1 = \beta_1$ in every sample.
::: hint
Write $w_i = (x_i - \bar x)/S_{xx}$ and use $\sum_i (x_i - \bar x) = 0$ and $\sum_i (x_i - \bar x)x_i = S_{xx}$.
:::
::: solution
$\sum_i w_i = S_{xx}^{-1}\sum_i (x_i - \bar x) = 0$. Next, $\sum_i w_i x_i = S_{xx}^{-1}\sum_i (x_i - \bar x)x_i = S_{xx}^{-1}\sum_i (x_i - \bar x)\bigl((x_i - \bar x) + \bar x\bigr) = S_{xx}^{-1}(S_{xx} + \bar x \cdot 0) = 1$. If $y_i = \beta_0 + \beta_1 x_i$, then $\hat\beta_1 = \sum_i w_i(\beta_0 + \beta_1 x_i) = \beta_0\cdot 0 + \beta_1\cdot 1 = \beta_1$. Unbiasedness is the same calculation with an extra $\sum_i w_i u_i$ whose conditional expectation is zero under SLR.4.
:::
:::

::: exercise Through the origin {level=3}
Suppose we omit the intercept and minimise $\sum_i (y_i - b_1 x_i)^2$. Show that $\tilde\beta_1 = \bigl(\sum_i x_i y_i\bigr)/\bigl(\sum_i x_i^2\bigr)$. Give a reason why, in economic data, one should not drop the intercept merely because a theory says $y = 0$ when $x = 0$.
::: hint
Differentiate with respect to $b_1$ and set the derivative to zero. For the second part, think about whether $x = 0$ is in the sample and about misspecification.
:::
::: solution
$\frac{d}{db_1}\sum_i (y_i - b_1 x_i)^2 = -2\sum_i x_i(y_i - b_1 x_i) = 0$ gives $\tilde\beta_1 = \sum_i x_i y_i / \sum_i x_i^2$. Residuals from this fit need not sum to zero, $R^2$ computed from [[#eq-r2]] can fall outside $[0,1]$, and the unbiasedness argument needs $\E(u_i) = 0$ at *every* $x_i$, including values far from the origin. A theory that $y = 0$ at $x = 0$ is a statement about a point that may lie well outside the data; forcing the line through that point can tilt the slope badly over the observed range. A better check is to estimate with an intercept and test $H_0$: $\beta_0 = 0$ ([[econometrics/inference]]).
:::
:::
