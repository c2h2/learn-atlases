A linear equation $y = \beta_0 + \beta_1 x + u$ says that a one-unit change in $x$ is associated with a $\beta_1$-unit change in $y$, everywhere. Many economic relationships are not like that. The return to experience rises and then falls; the effect of a price on quantity is an elasticity, not a level; the wage gap between two groups may itself depend on schooling; and "region" is not a number. **Specification** is the choice of how $y$ and the $x$'s enter the equation — levels or logs, quadratics, interactions, dummy variables — and the tests that ask whether the choice left something systematic in the residuals. The estimator remains OLS: we still compute $\hat{\boldsymbol\beta} = (X\T X)^{-1}X\T\mathbf{y}$, but the columns of $X$ are functions of the raw data. Interpretation changes with the columns.

::: definition Elasticity and semi-elasticity {#def-elasticity}
In a log–log model $\log y = \beta_0 + \beta_1 \log x + u$, the parameter $\beta_1$ is an **elasticity**: $\mathrm{d}\log y / \mathrm{d}\log x = \beta_1$. In a log–level model $\log y = \beta_0 + \beta_1 x + u$, $\beta_1$ is a **semi-elasticity**: a one-unit change in $x$ is associated with a proportionate change $\beta_1$ in $y$, or $100\beta_1$ percent, approximately. Both remain linear in the parameters, so OLS applies unchanged.
:::

## Logarithms and elasticities

Three combinations of logs cover most applied work. They were previewed in [[econometrics/simple-regression]]; the multiple-regression versions are the same, with "holding other regressors fixed" understood.

| Form | Model | Meaning of $\beta_1$ (small changes) |
|---|---|---|
| Level–level | $y = \beta_0 + \beta_1 x + u$ | $\Delta y \approx \beta_1 \Delta x$ |
| Log–level | $\log y = \beta_0 + \beta_1 x + u$ | $\%\Delta y \approx 100\beta_1\,\Delta x$ |
| Level–log | $y = \beta_0 + \beta_1 \log x + u$ | $\Delta y \approx (\beta_1/100)\,\%\Delta x$ |
| Log–log | $\log y = \beta_0 + \beta_1 \log x + u$ | $\%\Delta y \approx \beta_1\,\%\Delta x$ |

In a log–log equation $\beta_1$ is an **elasticity**. In a log–level equation it is a **semi-elasticity**. The exact percentage change in $y$ associated with $\Delta x = 1$ in the log–level model is $100(e^{\beta_1}-1)$, which is close to $100\beta_1$ when $\beta_1$ is small. Logs also compress right-skewed variables (wages, sales, city size) and turn a multiplicative error into an additive one, which sits more comfortably with MLR.5.

A log is defined only for positive numbers. Zeros in $x$ (some firms have no advertising; some people have no unearned income) rule out $\log x$ without a further decision: a $\log(1+x)$ transform, a dummy for "zero" plus $\log x$ for the rest, or a level specification. There is no universally best patch; each one changes the interpretation.

::: example A production elasticity {#ex-loglog}
Five plants report labour input $L = (10, 20, 40, 80, 160)$ and output $Q = (12, 21, 38, 70, 125)$. Fit $\log Q = \beta_0 + \beta_1 \log L + u$ by OLS and interpret $\hat\beta_1$.
::: solution
The logs are $\log L \approx (2.303, 2.996, 3.689, 4.382, 5.075)$ and $\log Q \approx (2.485, 3.045, 3.638, 4.248, 4.828)$. Simple OLS gives $\hat\beta_0 = 0.514$ and $\hat\beta_1 = 0.850$. A $1\%$ increase in labour is associated with a $0.85\%$ increase in output — decreasing returns to labour, holding whatever is in $u$ fixed. The level–level slope of $Q$ on $L$ would have been a different number in different units, and would not have been an elasticity.
:::
:::

::: widget plot
f: 12*(x/10)^0.85; 0.85*12*(x/10)^(-0.15)
x: 5, 170
y: 0, 140
labels: Q=12(L/10)^{0.85}; \text{marginal product}
caption: The log–log fit of [[#ex-loglog]] in levels: $Q$ is a power function of $L$, and the marginal product falls as $L$ rises. Toggle mentally to a straight line through the five points: that level–level fit cannot capture diminishing returns. Logs are not a statistical flourish; they are a choice of what "linear in parameters" means.
:::

## Quadratics and turning points

::: proposition Partial effect of a quadratic {#prop-quadratic}
If $y = \beta_0 + \beta_1 x + \beta_2 x^2 + u$, the partial effect of $x$ is $\partial\E(y\mid x)/\partial x = \beta_1 + 2\beta_2 x$. When $\beta_2 \ne 0$ the unique turning point is $x^* = -\beta_1/(2\beta_2)$. The second derivative $2\beta_2$ tells whether that point is a maximum ($\beta_2 < 0$) or a minimum ($\beta_2 > 0$). The model is linear in $(\beta_0, \beta_1, \beta_2)$, so OLS is still the estimator of [[econometrics/multiple-regression#thm-ols-matrix]].
:::

::: proof
Differentiate the conditional mean, which is a quadratic polynomial, with respect to $x$. Setting the derivative to zero and solving is the usual calculus of a parabola. Linearity in parameters is by inspection: $x^2$ is a generated column of $X$, not a nonlinear parameter.
:::

A quadratic $y = \beta_0 + \beta_1 x + \beta_2 x^2 + u$ is still linear in the parameters, so OLS applies. The partial effect of $x$ is $\beta_1 + 2\beta_2 x$, which depends on $x$. If $\beta_2 < 0$ the parabola opens downward and the fitted $y$ is maximised at $x^* = -\beta_1/(2\beta_2)$, provided $x^*$ lies in the support of the data. Reporting only $\hat\beta_1$ from a quadratic is almost always a mistake: that number is the partial effect at $x = 0$, which may lie far from the data. Report $\hat\beta_1 + 2\hat\beta_2 x_0$ at a stated $x_0$ — the mean, or a round number inside the sample — and, if the turning point is of interest, report $x^*$ with a standard error from the delta method.

::: example A wage–experience profile {#ex-quadratic}
Experience $e = (0, 5, 10, 15, 20, 25, 30)$ and wages $w = (8, 12, 15, 17, 18, 17.5, 16)$. Fit $w = \beta_0 + \beta_1 e + \beta_2 e^2 + u$.
::: solution
OLS on the three columns $(1, e, e^2)$ gives $\hat\beta_0 = 7.917$, $\hat\beta_1 = 0.943$, $\hat\beta_2 = -0.0224$, with $R^2 = 0.999$ on these seven constructed points. The fitted profile peaks at $e^* = -0.943/(2\times -0.0224) \approx 21.1$ years. The partial effect of experience is $0.943 - 0.0448\, e$: about $0.94$ at the start of a career and about $0$ at the peak. A linear fit would have averaged those numbers into a single slope and missed the decline.
:::
:::

A test of $H_0$: $\beta_2 = 0$ is the $t$ test of the quadratic term, or the $F$ comparison of the quadratic with the linear model. In [[#ex-quadratic]] the linear SSE is much larger and the $F$ is enormous; with real wage data the quadratic term is usually significant and the peak is typically in the fifties, not at $21$ — these seven numbers are a sketch, not a labour-economics finding. Mincer's equation includes both $e$ and $e^2$ for this reason.

::: warning Do not drop the linear term
A regression of $y$ on $x^2$ alone, omitting $x$, forces the turning point to $x = 0$ (or makes the effect monotone on one side of zero, depending on the sign). Unless theory says the effect is symmetric about zero — a deviation from a target, perhaps — include both $x$ and $x^2$. The same warning applies to a cubic: include the lower-order terms.
:::

## Dummy variables

A **dummy variable** (or **indicator**) equals $1$ in one category and $0$ otherwise. It lets a qualitative factor — sex, region, industry, "after the reform" — enter a linear equation.

::: definition Dummy variable and dummy trap {#def-dummy}
For a binary category, the **dummy-variable regression** is $y = \beta_0 + \beta_1 d + u$ with $d \in \{0,1\}$. Then $\beta_0 = \E(y \mid d = 0)$ and $\beta_0 + \beta_1 = \E(y \mid d = 1)$, so $\beta_1$ is the difference in means. For $G$ groups, include $G-1$ dummies plus an intercept (or $G$ dummies and no intercept). Including $G$ dummies *and* an intercept makes $X$ singular: the **dummy-variable trap**, a failure of MLR.3.
:::

With other regressors, $y = \beta_0 + \beta_1 x + \delta d + u$, the dummy is an **intercept shift**: two parallel lines, a common slope $\beta_1$, and a difference $\delta$ in intercepts. That is a ceteris paribus group difference only if MLR.4 holds — if, holding $x$ fixed, group membership is uncorrelated with $u$. A gender dummy in a wage equation, with schooling and experience included, is the adjusted mean difference, not automatically the causal effect of gender.

::: example A parallel-line wage equation {#ex-dummy}
Eight workers, four men and four women, with matched schooling:

| $w$ | $14$ | $16$ | $15$ | $18$ | $12$ | $13$ | $11$ | $14$ |
|---|---|---|---|---|---|---|---|---|
| $s$ | $12$ | $14$ | $12$ | $16$ | $12$ | $14$ | $12$ | $16$ |
| female | $0$ | $0$ | $0$ | $0$ | $1$ | $1$ | $1$ | $1$ |

Fit $w = \beta_0 + \beta_1 s + \delta\,\mathrm{female} + u$.
::: solution
Mean schooling is $13.5$ in both groups (the design is balanced). OLS gives $\hat w = 5.625 + 0.75 s - 3.25\,\mathrm{female}$. Holding schooling fixed, women in this sample earn $3.25$ less. The male intercept is $5.625$; the female intercept is $5.625 - 3.25 = 2.375$. Both groups have the same schooling slope $0.75$. Mean wages are $15.75$ (men) and $12.50$ (women); the raw gap of $3.25$ equals $\hat\delta$ here because mean schooling is identical. In an unbalanced design the raw gap and $\hat\delta$ would differ.
:::
:::

## Interactions

If the slope as well as the intercept differs by group, interact the dummy with $x$:

$$
y = \beta_0 + \beta_1 x + \delta d + \gamma (d \cdot x) + u.
$$ {#eq-interact}

Then the intercept is $\beta_0$ for $d = 0$ and $\beta_0 + \delta$ for $d = 1$; the slope is $\beta_1$ for $d = 0$ and $\beta_1 + \gamma$ for $d = 1$. A $t$ test of $H_0$: $\gamma = 0$ asks whether the slopes differ. A **Chow test** of equal regressions across two groups is the $F$ test of $H_0$: $\delta = \gamma = 0$ (intercept and slope), or of all interactions if there are several $x$'s.

Two continuous regressors interact in the same way: $y = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \beta_3 x_1 x_2 + u$, and $\partial y/\partial x_1 = \beta_1 + \beta_3 x_2$. Always include the main effects $x_1$ and $x_2$ alongside the product; dropping them forces the interaction through the origin in a way that is rarely intended.

::: example Different returns to schooling {#ex-interact}
Using the eight workers of [[#ex-dummy]], fit the interacted model $w = \beta_0 + \beta_1 s + \delta\,\mathrm{female} + \gamma (\mathrm{female}\cdot s) + u$.
::: solution
OLS gives $\hat\beta_0 = 4.091$, $\hat\beta_1 = 0.864$, $\hat\delta = -0.182$, $\hat\gamma = -0.227$. The male schooling slope is $0.864$; the female slope is $0.864 - 0.227 = 0.637$. The intercept gap at $s = 0$ is not economically interesting (nobody has zero years of school). The gap *at the sample mean* $s = 13.5$ is $-0.182 - 0.227\times 13.5 \approx -3.25$, matching [[#ex-dummy]]: with these particular eight points the extra flexibility of a slope gap does not change the mean difference. In larger samples it usually does.
:::
:::

::: quiz
A regression includes $x$, a dummy $d$, and the product $d\cdot x$. The coefficient on $d$ is the effect of $d$ when
- [ ] $x$ is at its sample mean
- [x] $x = 0$
- [ ] $d = 1$
- [ ] all other variables are at their means, regardless of $x$
::: solution
In [[#eq-interact]] the coefficient $\delta$ is the intercept shift, which is the difference in $y$ associated with $d$ at $x = 0$. If $x = 0$ is not a meaningful point, report instead $\hat\delta + \hat\gamma x_0$ at a stated $x_0$ (the mean, or a round number in the data). Software that "centres" $x$ before interacting makes $\hat\delta$ the gap at the mean; that is a convenience, not a different model.
:::
:::

## Specification tests

No list of functional forms is complete. Two simple checks catch a surprising amount of trouble.

**RESET (Ramsey 1969).** After estimating the original model, add powers of the fitted values, $\hat y^2$ (and maybe $\hat y^3$), and test their joint significance with an $F$ test. Under the null that the original specification is correct, the extra powers should be insignificant. RESET is a general test against neglected nonlinearity; it does not say *which* function of $x$ was missed.

**Plot the residuals** against each $x_j$ and against $\hat y$. A curved scatter suggests a quadratic or a log; a fan suggests heteroskedasticity ([[econometrics/heteroskedasticity]]); a stray point suggests a look at that observation. Residuals plotted against $x_j$ cannot show a linear trend ([[econometrics/simple-regression#prop-algebra]]), so what you are looking for is everything *except* a straight line.

**Nested $F$ tests** of a simpler model against a richer one (linear versus quadratic, no interaction versus interaction) are specification tests of a more targeted kind. They need the models to be nested and the dependent variable to be the same.

::: proposition RESET as an $F$ test {#prop-reset}
Let $\mathrm{SSE}_{ur}$ come from the regression of $y$ on the original regressors plus $\hat y^2$ (and possibly $\hat y^3$), and let $\mathrm{SSE}_r$ come from the original regression. Under MLR.1–MLR.6 and the null that the original conditional mean is correct, the extra-sum-of-squares $F$ with $q$ extra powers has an $F_{q, n-k-1-q}$ distribution. Rejection is evidence against the original functional form, not a proof of any particular alternative.
:::

::: proof
Under the null, the extra regressors $\hat y^2, \hat y^3$ are functions of $X\hat{\boldsymbol\beta}$ and have true coefficients zero in the expanded equation. The usual $F$ of [[econometrics/inference#thm-f]] then applies. (There is a subtlety: $\hat y$ is estimated, so the extra regressors are stochastic. Under the null this does not change the asymptotic distribution; in small samples RESET is an approximation.)
:::

::: example Linear versus quadratic experience {#ex-reset-style}
For the seven wage–experience points of [[#ex-quadratic]], the linear regression of $w$ on $e$ has $\mathrm{SSE}_r = 26.36$ and the quadratic has $\mathrm{SSE}_{ur} = 0.060$. Test $H_0$: $\beta_2 = 0$ at $5\%$, using $F_{1,4,0.95} = 7.71$.
::: solution
$n = 7$, the unrestricted model has $k+1 = 3$ parameters, so $n-k-1 = 4$ and $q = 1$. Then

$$
F = \frac{(26.36 - 0.060)/1}{0.060/4} = 1753,
$$

far above $7.71$. The linear model is rejected: these seven points need the quadratic. (The $F$ is huge because the quadratic almost interpolates the data; in a real sample of several thousand workers one would see a much smaller, still typically significant, statistic.)
:::
:::

Choosing between **level and log** is not an $F$ comparison: the dependent variables differ, and SSE is not in the same units. Compare fits by plotting residuals, by RESET in each specification, or by a transformation test (Box–Cox), and by whether the interesting parameter is a derivative or an elasticity.

::: application Dummies for a policy and a Chow test
A dummy $d = 1$ after a reform, in a regression of an outcome on controls and $d$, is a before–after comparison. Adding group dummies and interactions of $d$ with group is a difference-in-differences specification, developed fully in [[causal-inference/difference-in-differences]]. A Chow test that the slope vector is the same before and after the reform is the $F$ test of all interactions of $d$ with the regressors. None of these is a substitute for a research design: a dummy can absorb a jump that would have happened anyway.
:::

::: history
**1969, James Ramsey.** Ramsey's RESET (*Journal of the Royal Statistical Society* B) proposed adding powers of fitted values as a general test of neglected nonlinearity. Dummy-variable regression is older: it is the analysis of variance written as a regression, a rewriting Fisher and Yates used in the 1930s, and it became standard in econometrics with the spread of computing in the 1960s. The log-wage Mincer equation (1974) made the log–level form the default in labour economics.
:::

## Where this leads

Logs, quadratics, dummies and interactions enlarge the class of models OLS can estimate without leaving the linear-in-parameters framework. Two failures of that framework occupy the next chapters: the variance of $u$ may depend on $x$ ([[econometrics/heteroskedasticity]]), and $y$ itself may be binary, so that a linear conditional mean is at best an approximation ([[econometrics/binary-outcomes]]). Panel data ([[econometrics/panel-data]]) can be seen as a dummy-variable regression with a dummy for every unit.

::: summary
- Log–log slopes are elasticities; log–level slopes are semi-elasticities, approximately $100\beta_1$ percent. Logs require positive data.
- A quadratic has partial effect $\beta_1 + 2\beta_2 x$ and turning point $-\beta_1/(2\beta_2)$. Keep the lower-order term.
- A dummy shifts the intercept; an interaction with $x$ also shifts the slope. $G$ groups need $G-1$ dummies plus an intercept, or the dummy trap (MLR.3) is sprung.
- The coefficient on a dummy in an interacted model is the group gap at $x = 0$; report the gap at a meaningful $x$ as well.
- RESET and residual plots are general checks on functional form. Nested $F$ tests compare nested models with the same $y$.
:::

## Exercises

::: exercise A semi-elasticity {level=1 check="8"}
A regression of $\log y$ on $x$ gives $\hat\beta_1 = 0.08$. Using the linear approximation, by about how many percent does $y$ change when $x$ increases by one? (Enter the approximate percentage, without the percent sign.)
::: solution
$100\times 0.08 = 8$. The exact figure is $100(e^{0.08}-1) \approx 8.3$.
:::
:::

::: exercise A turning point {level=1 check="21.1"}
In [[#ex-quadratic]], $\hat\beta_1 = 0.943$ and $\hat\beta_2 = -0.0224$. Compute the experience at which the fitted wage peaks, rounded to one decimal place. (Enter $e^*$.)
::: solution
$e^* = -0.943/(2\times -0.0224) = 0.943/0.0448 \approx 21.05$, which rounds to $21.1$.
:::
:::

::: exercise The dummy trap {level=1}
A sample of workers from three regions — North, South and West — is used to estimate a wage equation. Write two dummy specifications that satisfy MLR.3, and one that does not.
::: solution
Valid: intercept plus two region dummies (the omitted region is the baseline); or three region dummies and *no* intercept. Invalid: intercept plus all three region dummies, because those four columns sum in a linear dependence (each row of the three dummies adds to $1$, matching the intercept).
:::
:::

::: exercise An elasticity {level=2 check="8.5"}
In [[#ex-loglog]] the log–log slope is $0.850$. If labour input rises by $10\%$, by about how many percent does fitted output rise? (Enter the percentage, without the percent sign.)
::: solution
$0.850 \times 10 = 8.5$. A $10\%$ rise in $L$ is associated with about an $8.5\%$ rise in $Q$.
:::
:::

::: exercise Parallel lines {level=2 check="-3.25"}
In [[#ex-dummy]] the estimated dummy coefficient is $-3.25$. What is the difference in fitted wages between a woman and a man with the same schooling? (Enter the difference, woman minus man.)
::: solution
$-3.25$: the lines are parallel, so the gap is the dummy coefficient at every $s$.
:::
:::

::: exercise An interaction at a stated $x$ {level=2}
Using [[#ex-interact]], compute the fitted female–male wage gap at $s = 16$.
::: solution
The gap is $\hat\delta + \hat\gamma s = -0.182 - 0.227\times 16 = -0.182 - 3.632 = -3.814$. At $s = 12$ it would be $-0.182 - 0.227\times 12 = -2.906$. The gap widens with schooling because the female slope is shallower.
:::
:::

::: exercise A Chow-style $F$ {level=3}
For the eight workers, the parallel-line model of [[#ex-dummy]] has $\mathrm{SSE}_r = 1.375$ and the interacted model of [[#ex-interact]] has $\mathrm{SSE}_{ur} = 1.091$. Test $H_0$: $\gamma = 0$ at $5\%$, given $F_{1,4,0.95} = 7.71$.
::: hint
The interacted model has four parameters, so residual degrees of freedom are $8-4 = 4$.
:::
::: solution
$F = \dfrac{(1.375-1.091)/1}{1.091/4} = \dfrac{0.284}{0.273} = 1.04 < 7.71$. Do not reject: with eight points there is no evidence that the slopes differ, even though the point estimate of $\gamma$ is negative. Small-sample $F$ tests of interactions are often weak; the same $F$ in a sample of several hundred would be a different matter.
:::
:::

::: exercise Why RESET is not an alternative model {level=3}
A RESET test that adds $\hat y^2$ to a linear regression of $y$ on $x$ rejects at $1\%$. Explain why one should not then *use* the RESET regression (the one that includes $\hat y^2$) as the estimated model of interest, and name two constructive next steps.
::: solution
The extra regressor $\hat y^2$ is a generated function of *all* the original $x$'s; its coefficient has no ceteris paribus reading, and the original $\hat\beta_j$ in that expanded regression are no longer the partial effects in the model we set out to estimate. RESET is a *test*, not a specification. Next steps: look at residual plots against each $x_j$; try a log, a quadratic, or an interaction that economic reasoning suggests; and re-test. The aim is a model whose extra terms mean something.
:::
:::
