A slope of $1.2$ from five months of advertising data is a number. Is it distinguishable from zero? From one? How wide a range of slopes is compatible with the sample? **Inference** answers those questions by treating $\hat{\boldsymbol\beta}$ as a random variable and using its sampling distribution. Under the Gauss–Markov assumptions plus normality of $u$, exact $t$ and $F$ tests are available. In large samples the same procedures are approximately valid without normality, by the central limit theorem. This chapter derives the sampling variance of OLS, constructs $t$ tests and confidence intervals, develops the $F$ test of several restrictions, and records what does and does not change when we rely on asymptotics. The statistical background is [hypothesis tests](/a/maths/lesson.php?c=statistics&l=hypothesis-testing), [confidence intervals](/a/maths/lesson.php?c=statistics&l=confidence-intervals) and [sampling distributions](/a/maths/lesson.php?c=statistics&l=sampling).

## The sampling distribution of OLS

Under MLR.1–MLR.5, $\hat{\boldsymbol\beta} = \boldsymbol\beta + (X\T X)^{-1}X\T\mathbf{u}$ and $\Var(\hat{\boldsymbol\beta}\mid X) = \sigma^2 (X\T X)^{-1}$. The usual estimator of that matrix replaces $\sigma^2$ by $\hat\sigma^2 = \mathrm{SSE}/(n-k-1)$:

$$
\widehat{\Var}(\hat{\boldsymbol\beta}) = \hat\sigma^2 (X\T X)^{-1}.
$$ {#eq-vhat}

The **standard error** of $\hat\beta_j$ is the square root of the corresponding diagonal entry, $\operatorname{se}(\hat\beta_j)$. For simple regression this is the familiar

$$
\operatorname{se}(\hat\beta_1) = \frac{\hat\sigma}{\sqrt{S_{xx}}}, \qquad \operatorname{se}(\hat\beta_0) = \hat\sigma\sqrt{\frac{1}{n} + \frac{\bar x^2}{S_{xx}}}.
$$

Standard errors fall when $n$ grows, when $x_j$ has more residual variation, and when $\sigma$ is smaller. They are not a statement about bias: a precise estimate of the wrong number is still wrong.

To turn $\operatorname{se}(\hat\beta_j)$ into a test we need a distribution. Add:

::: definition Assumption MLR.6 {#def-mlr6}
**MLR.6 (normality).** $u \mid X \sim \Normal(0, \sigma^2 I_n)$. Equivalently, $y \mid X \sim \Normal(X\boldsymbol\beta, \sigma^2 I_n)$.
:::

::: theorem Exact distribution of OLS {#thm-exact}
Under MLR.1–MLR.6, conditional on $X$,

$$
\hat{\boldsymbol\beta} \sim \Normal\bigl(\boldsymbol\beta,\ \sigma^2(X\T X)^{-1}\bigr), \qquad \frac{\mathrm{SSE}}{\sigma^2} \sim \chi^2_{n-k-1},
$$

and SSE is independent of $\hat{\boldsymbol\beta}$. Consequently

$$
t_j = \frac{\hat\beta_j - \beta_j}{\operatorname{se}(\hat\beta_j)} \sim t_{n-k-1}.
$$ {#eq-t}
:::

::: proof
A linear image of a normal vector is normal, so $\hat{\boldsymbol\beta}\mid X$ is normal with the mean and variance already computed. The $\chi^2$ claim and the independence of SSE and $\hat{\boldsymbol\beta}$ are the standard facts about the residual sum of squares in the normal linear model ([regression](/a/maths/lesson.php?c=statistics&l=regression)): $\mathrm{SSE}/\sigma^2 = \mathbf{u}\T M\mathbf{u}/\sigma^2$ with $M$ idempotent of rank $n-k-1$. Then $(\hat\beta_j - \beta_j)/(\sigma\sqrt{(X\T X)^{-1}_{jj}})$ is standard normal, $\hat\sigma/\sigma$ is the square root of an independent $\chi^2_{n-k-1}$ divided by its degrees of freedom, and their ratio is $t_{n-k-1}$.
:::

Without MLR.6 the $t$ ratio is not exactly $t$-distributed, but under MLR.1–MLR.5 and a few moment conditions it is approximately $\Normal(0,1)$ in large samples. That is the asymptotic justification for doing "$t$ tests" on micro data that are not normal.

## $t$ tests

::: definition The $t$ test of a single restriction {#def-t-test}
To test $H_0$: $\beta_j = a$ against $H_1$: $\beta_j \ne a$ at level $\alpha$, compute $t = (\hat\beta_j - a)/\operatorname{se}(\hat\beta_j)$ and reject if $\lvert t\rvert > t_{n-k-1,\,1-\alpha/2}$, the two-sided critical value of the $t$ distribution with $n-k-1$ degrees of freedom. The **$p$-value** is $2\Prob(T > \lvert t\rvert)$ where $T \sim t_{n-k-1}$. A one-sided alternative uses one tail and the corresponding critical value.
:::

The default report in applied work is the test of $H_0$: $\beta_j = 0$ — "is there a partial association with $x_j$ once the other regressors are included?" — together with the two-sided $p$-value. Rejection at $5\%$ is a convention, not a scientific law. A tiny $p$-value from a huge sample can attach to an economically negligible slope; a large $p$-value from a small sample can attach to a slope that would matter if it were estimated more precisely. Always read $\hat\beta_j$ in its units, not just the stars next to it. The same $t$ statistic that tests zero also builds the confidence interval, so a complete report is the point estimate, the interval (or the standard error), and a sentence about units and the comparison of interest. Stars without those three are not a result.

::: example Advertising, a $t$ test {#ex-t-advertising}
For the five advertising months of [[econometrics/simple-regression#ex-advertising]], $\hat\beta_1 = 1.2$, $\mathrm{SSE} = 1.6$, $n-k-1 = 3$, $S_{xx} = 40$. Test $H_0$: $\beta_1 = 0$ against the two-sided alternative at $5\%$. The $5\%$ two-sided critical value of $t_3$ is $3.182$.
::: solution
$\hat\sigma^2 = 1.6/3 = 0.5333$, $\hat\sigma = 0.730$, $\operatorname{se}(\hat\beta_1) = 0.730/\sqrt{40} = 0.1155$. Then $t = 1.2/0.1155 = 10.39$. This exceeds $3.182$ (the two-sided $p$-value is about $0.0019$), so $H_0$ is rejected at $5\%$. With five points the $t$ distribution has a thick tail, and we still reject because the scatter around the line is tight. The test assumes MLR.6, which is a lot to ask of five observations; treat the $p$-value as a description of this sample's signal-to-noise ratio, not as a probability that advertising does not matter.
:::
:::

::: example Simulated simple regression, seed 7 {#ex-t-sim}
Draw $n = 40$ from $y = 2 + 0.8 x + u$ with $x \sim \Normal(10, 2^2)$ and $u \sim \Normal(0, 1.5^2)$, using `numpy.random.default_rng(7)`. The OLS fit is $\hat y = 3.062 + 0.692 x$, with $\hat\sigma = 1.376$, $\operatorname{se}(\hat\beta_0) = 1.256$ and $\operatorname{se}(\hat\beta_1) = 0.134$. Test $H_0$: $\beta_1 = 0$ and $H_0$: $\beta_1 = 0.8$.
::: solution
Degrees of freedom $n-2 = 38$; $t_{38, 0.975} = 2.024$. For $H_0$: $\beta_1 = 0$, $t = 0.692/0.134 = 5.15$, $p \approx 8\times 10^{-6}$: rejected. For $H_0$: $\beta_1 = 0.8$, $t = (0.692-0.8)/0.134 = -0.81$, which is well inside $(-2.024, 2.024)$: not rejected. The sample is compatible with the true slope and incompatible with a zero slope, which is what a well-behaved test should do.
:::
:::

::: widget hypothesis
test: t
tail: two
alpha: 0.05
effect: 0.5
n: 40
observed: 5.15
caption: Null $t_{38}$ density (and an alternative shifted by Cohen's $d$). The two-sided $5\%$ rejection region is the tails beyond $\pm 2.024$. The observed $t = 5.15$ of [[#ex-t-sim]] sits far in the right tail: the $p$-value is the two-tail area beyond $5.15$, essentially zero. Raise $n$ and watch power increase; raise $\alpha$ and watch the rejection region grow.
:::

::: warning Statistical significance is not economic significance
With $n = 100{,}000$, a wage-on-schooling slope of $0.002$ (two-tenths of one percent per year) can have $t = 4$ and three stars. It is still a tiny number. Conversely, a slope of $0.12$ with $t = 1.6$ in a sample of $80$ is insignificant at $5\%$ and may still be the most interesting number in the paper. Report the coefficient, the standard error (or a confidence interval), and the units; do not let the $p$-value do the talking.
:::

## Confidence intervals

A two-sided $t$ test of $H_0$: $\beta_j = a$ at level $\alpha$ is not rejected if and only if $a$ lies in

$$
\hat\beta_j \pm t_{n-k-1,\,1-\alpha/2}\,\operatorname{se}(\hat\beta_j).
$$ {#eq-ci}

That interval is a **$1-\alpha$ confidence interval** for $\beta_j$. The frequentist reading is about the *procedure*: in repeated samples, $95\%$ of such intervals cover the true $\beta_j$. It is not the probability that this particular interval, once computed, contains $\beta_j$ — that probability is $0$ or $1$. The distinction is discussed at length in the Maths Atlas ([confidence intervals](/a/maths/lesson.php?c=statistics&l=confidence-intervals)).

::: example A $95\%$ interval for the advertising slope {#ex-ci-advertising}
Using [[#ex-t-advertising]], report a $95\%$ confidence interval for $\beta_1$.
::: solution
$1.2 \pm 3.182 \times 0.1155 = 1.2 \pm 0.368$, that is $[0.832,\ 1.567]$. The interval excludes $0$, consistently with the test, and it is wide: five points do not pin down the slope to a tenth. The true slope, whatever it is, either lies in this interval or it does not; the $95\%$ describes the method.
:::
:::

::: widget confidence
dist: normal
n: 20
level: 0.95
intervals: 50
method: t
caption: Fifty simulated $95\%$ $t$ intervals for a mean, samples of size $20$ from a normal population. About $95\%$ of them cover the true value (the vertical line); the others miss, which is the $5\%$ the method spends. Click through a few draws: coverage is a property of the ensemble, not of the interval you happen to be looking at.
:::

::: quiz
A $95\%$ confidence interval for a slope is $[0.4, 1.2]$. Which statement is correct?
- [ ] $\Prob(0.4 \le \beta_1 \le 1.2) = 0.95$.
- [x] The procedure that produced this interval covers the true slope in $95\%$ of samples; this particular interval either covers it or not.
- [ ] $H_0$: $\beta_1 = 0$ is not rejected at $5\%$.
- [ ] The slope is significant at $5\%$.
::: solution
The interval excludes $0$, so $H_0$: $\beta_1 = 0$ *is* rejected at $5\%$ and the slope is significant at that level. The probability statement $\Prob(0.4 \le \beta_1 \le 1.2) = 0.95$ treats $\beta_1$ as random; in the frequentist framework $\beta_1$ is fixed and the interval is random. The correct reading is the coverage of the procedure.
:::
:::

## The $F$ test

A $t$ test handles one restriction. Several restrictions at once — "these three industry dummies are jointly insignificant", "$\beta_2 = \beta_3 = 0$", "the slopes are the same in two groups" — need an $F$ test.

::: theorem $F$ test of $q$ restrictions {#thm-f}
Consider $H_0$: $R\boldsymbol\beta = \mathbf{r}$, a set of $q$ independent linear restrictions, against the unrestricted alternative. Let $\mathrm{SSE}_r$ be the sum of squared residuals from the **restricted** OLS estimator (the minimiser of SSE subject to $R\boldsymbol\beta = \mathbf{r}$) and $\mathrm{SSE}_{ur}$ the unrestricted SSE. Under MLR.1–MLR.6 and $H_0$,

$$
F = \frac{(\mathrm{SSE}_r - \mathrm{SSE}_{ur})/q}{\mathrm{SSE}_{ur}/(n-k-1)} \sim F_{q,\,n-k-1}.
$$ {#eq-f}

Reject at level $\alpha$ if $F > F_{q,\,n-k-1}(1-\alpha)$. Equivalently, $F = \dfrac{\hat{\boldsymbol\beta}\T R\T \bigl(R\,\widehat{\Var}(\hat{\boldsymbol\beta})\, R\T\bigr)^{-1} R\hat{\boldsymbol\beta} - \text{(terms in $\mathbf{r}$)}}{q}$ when $\mathbf{r} \ne \mathbf{0}$, with the obvious simplification when $\mathbf{r} = \mathbf{0}$.
:::

::: proof
Under $H_0$ the extra sum of squares $\mathrm{SSE}_r - \mathrm{SSE}_{ur}$ is $\sigma^2$ times a $\chi^2_q$, independent of $\mathrm{SSE}_{ur} \sim \sigma^2\chi^2_{n-k-1}$. The ratio of the two mean squares is $F_{q, n-k-1}$. (This is the extra-sum-of-squares theorem of the normal linear model.) The Wald form with $\widehat{\Var}(\hat{\boldsymbol\beta})$ is algebraically identical for linear restrictions in the homoskedastic Gaussian model.
:::

The most common case is $H_0$: $\beta_{k-q+1} = \cdots = \beta_k = 0$, "the last $q$ regressors can be dropped". Then the restricted model simply omits those regressors, and [[#eq-f]] is a comparison of two nested fits. The **overall $F$ test** of $H_0$: $\beta_1 = \cdots = \beta_k = 0$ (no explanatory variable matters) is the special case $q = k$, and can be rewritten $F = \dfrac{R^2/k}{(1-R^2)/(n-k-1)}$.

A single restriction, $q = 1$, gives $F = t^2$: the $F$ test and the two-sided $t$ test agree.

::: example Joint insignificance in a simulated sample {#ex-f-sim}
Draw $n = 50$ from $y = 1 + 2 x_1 + 0.3 x_2 + 0.1 x_3 + u$ with independent $\Normal(0,1)$ regressors and $u$, using `numpy.random.default_rng(13)`. The unrestricted fit has $\mathrm{SSE}_{ur} = 83.61$. The regression on $x_1$ alone has $\mathrm{SSE}_r = 85.51$. Test $H_0$: $\beta_2 = \beta_3 = 0$ at $5\%$. $F_{2, 46, 0.95} = 3.20$.
::: solution
$k = 3$, $n-k-1 = 46$, $q = 2$. Then

$$
F = \frac{(85.51 - 83.61)/2}{83.61/46} = 0.52,
$$

well below $3.20$ (the $p$-value is about $0.60$). We do not reject: in this sample $x_2$ and $x_3$ do not jointly improve the fit enough to stand out from noise, even though their true coefficients are not zero. The test is correctly sized but, with $n = 50$ and small slopes, it has limited **power**. Failure to reject is not a proof that $\beta_2 = \beta_3 = 0$.
:::
:::

::: remark Nested versus non-nested models
The $F$ test compares **nested** models: the restricted model is the unrestricted one plus constraints. It does not compare a regression of $y$ on $x$ with a regression of $\log y$ on $x$, nor two regressions with different, non-overlapping regressors. Those are non-nested comparisons (Vuong's test, $J$ tests, or simply out-of-sample fit); they are not $F$ tests. Changing the dependent variable also makes $R^2$ incomparable.
:::

A confidence interval and a test are two readings of the same arithmetic. If a policy claim is "$\beta_1$ is at least $0.08$", the honest report is whether $0.08$ lies in the interval, not only whether $0$ is excluded. Power — the probability of rejecting a false null — rises with $n$, with the residual variation of $x_j$, and with the gap between the true $\beta_j$ and the null value. A "null result" in a small sample is often a statement about power, not about $\beta_j$ being zero.

## Large-sample inference

MLR.6 is convenient and rarely true. Wages are skewed, binary outcomes are not normal, and residuals in a cross-section of firms have heavy tails. Two asymptotic results repair the gap.

Under MLR.1–MLR.4, finite second moments, and a bit of regularity (the average of $x_i x_i\T$ converges to a positive definite matrix), OLS is **consistent**: $\hat{\boldsymbol\beta} \to_p \boldsymbol\beta$. Under the same conditions plus MLR.5, a central limit theorem gives

$$
\sqrt{n}\,(\hat{\boldsymbol\beta} - \boldsymbol\beta) \ \to_d \ \Normal\bigl(\mathbf{0},\ \sigma^2 Q^{-1}\bigr), \qquad Q = \operatorname{plim} n^{-1} X\T X.
$$

So $t_j$ is approximately $\Normal(0,1)$ in large samples, and the usual confidence interval with $1.96$ in place of $t_{n-k-1, 0.975}$ is approximately $95\%$. Using the $t$ critical value rather than $1.96$ is harmless and slightly conservative; most software reports $t$ $p$-values either way.

If MLR.5 fails, the asymptotic variance is not $\sigma^2 Q^{-1}$, and the usual standard errors are inconsistent. **Heteroskedasticity-robust** (White) standard errors, derived in [[econometrics/heteroskedasticity]], restore the CLT-based $t$ and $F$ (or Wald) tests without requiring MLR.5. In modern applied cross-section work they are the default.

::: intuition Why $n$ has to be large
The central limit theorem acts on $\hat{\boldsymbol\beta}$ as a weighted average of the $u_i$. If a few observations have huge leverage, or if $u$ is badly skewed, the approximation at $n = 40$ can be poor. A histogram of residuals, a Monte Carlo calibrated to the sample, or a bootstrap is then more informative than a $p$-value quoted to three decimals. Asymptotic justification is a licence to use the $t$ table, not a certificate that the table is exact.
:::

::: application $t$ ratios in published wage equations
Card's 1999 survey of US schooling-return estimates reports OLS slopes around $0.10$ with standard errors typically $0.01$ or smaller in large Census and CPS samples: $t$ ratios of $10$ or more. The statistical question "is the association zero?" is not in doubt. The live questions are whether $0.10$ is close to a causal effect, whether it is constant across people, and whether a log-linear form is the right one — none of which a $t$ test of $H_0$: $\beta_1 = 0$ addresses. Inference and identification are different jobs.
:::

::: history
**1908, William Sealy Gosset; 1925, Ronald Fisher.** Gosset, publishing as "Student" while at Guinness, derived the $t$ distribution for the mean of a normal sample. Fisher extended it to regression coefficients and introduced the $F$ distribution (named for him by George Snedecor) as the sampling distribution of a ratio of mean squares in the *Statistical Methods for Research Workers* (1925) and in his work on analysis of variance. The large-sample, non-normal theory of OLS that applied econometrics actually uses is later: it is the central limit theorem applied to the score $X\T\mathbf{u}$, put into textbook form by the 1960s and 1970s.
:::

## Where this leads

Usual $t$ and $F$ tests assume homoskedasticity and, for exactness, normality. [[econometrics/heteroskedasticity]] drops the first and provides robust and clustered standard errors. [[econometrics/specification]] uses the same tests on dummy variables, interactions and RESET-type restrictions. When the regressor is endogenous, the $t$ ratio using OLS standard errors is a test of a population association, not of a causal effect; [[econometrics/instrumental-variables]] builds the corresponding IV tests.

::: summary
- Under MLR.1–MLR.5, $\Var(\hat{\boldsymbol\beta}\mid X) = \sigma^2(X\T X)^{-1}$, estimated by $\hat\sigma^2(X\T X)^{-1}$ with $\hat\sigma^2 = \mathrm{SSE}/(n-k-1)$.
- MLR.6 (normal errors) gives exact $t_{n-k-1}$ and $F_{q, n-k-1}$ tests. Without it, the same statistics are approximately $N(0,1)$ and $\chi^2_q/q$ in large samples.
- A $95\%$ confidence interval is the set of $a$ not rejected by a $5\%$ two-sided $t$ test. Coverage is a property of the procedure.
- The $F$ test compares nested models through $(\mathrm{SSE}_r - \mathrm{SSE}_{ur})/q$ over $\hat\sigma^2$. For one restriction, $F = t^2$.
- Statistical significance is not economic significance. Report coefficients, units and standard errors, not only stars.
:::

## Exercises

::: exercise A $t$ statistic {level=1 check="2.5"}
A regression with $n = 30$ and $k = 2$ (plus intercept) gives $\hat\beta_2 = 1.5$ and $\operatorname{se}(\hat\beta_2) = 0.6$. Compute the $t$ statistic for $H_0$: $\beta_2 = 0$. (Enter $t$.)
::: solution
$t = 1.5/0.6 = 2.5$. With $n-k-1 = 27$ degrees of freedom, $t_{27, 0.975} \approx 2.052$, so $H_0$ is rejected at $5\%$ two-sided.
:::
:::

::: exercise Reading a confidence interval {level=1 check="1"}
A $95\%$ interval for $\beta_1$ is $[0.2, 1.4]$. Is $H_0$: $\beta_1 = 0$ rejected at the $5\%$ two-sided level? Enter $1$ if yes and $0$ if no.
::: solution
Zero lies outside $[0.2, 1.4]$, so the two-sided $5\%$ test rejects. Enter $1$.
:::
:::

::: exercise A critical value {level=1 check="3.182"}
In [[#ex-t-advertising]] the residual degrees of freedom are $3$. Using the chapter's critical value, what is $t_{3, 0.975}$? (Enter the critical value as given.)
::: solution
The text uses $t_{3, 0.975} = 3.182$. (From a $t$ table or `scipy.stats.t.ppf(0.975, 3)`.)
:::
:::

::: exercise The overall $F$ {level=2 check="26.53"}
In [[#ex-t-sim]], $n = 40$, $k = 1$, $R^2 = 0.4111$. Compute the overall $F$ statistic for $H_0$: $\beta_1 = 0$ to two decimal places. (Enter $F$.)
::: solution
$F = \dfrac{R^2/k}{(1-R^2)/(n-k-1)} = \dfrac{0.4111}{0.5889/38} = 26.53$. This equals $t^2 = 5.1505^2$, as it must for $q = 1$. $F_{1,38,0.95} = 4.10$, so $H_0$ is rejected.
:::
:::

::: exercise An interval from a $t$ {level=2 check="0.42"}
Using [[#ex-t-sim]], $\hat\beta_1 = 0.692$, $\operatorname{se}(\hat\beta_1) = 0.134$, $t_{38,0.975} = 2.024$. Compute the lower end of the $95\%$ interval for $\beta_1$, rounded to two decimal places. (Enter the lower end.)
::: solution
$0.692 - 2.024\times 0.134 = 0.692 - 0.271 = 0.421$, which rounds to $0.42$. The interval is $[0.42, 0.96]$ and contains the true value $0.8$.
:::
:::

::: exercise Restricted and unrestricted SSE {level=2}
A long regression ($k = 4$, plus intercept, $n = 60$) has $\mathrm{SSE}_{ur} = 120$. Dropping two regressors raises SSE to $150$. Test the joint restriction at $5\%$, given $F_{2, 55, 0.95} \approx 3.17$.
::: solution
$q = 2$, $n-k-1 = 55$, $F = \dfrac{(150-120)/2}{120/55} = \dfrac{15}{2.182} = 6.87 > 3.17$. Reject $H_0$: the two omitted regressors are jointly significant at $5\%$.
:::
:::

::: exercise Why $F = t^2$ {level=3}
For a single restriction $H_0$: $\beta_j = 0$, show that the extra-sum-of-squares $F$ statistic equals the square of the $t$ statistic for $\beta_j$. (You may use FWL.)
::: hint
The restricted model drops $x_j$. FWL writes the unrestricted $\hat\beta_j$ as a simple slope of residualised $y$ on residualised $x_j$, whose $t$ ratio squares to the extra-sum-of-squares $F$ of that simple regression.
:::
::: solution
By FWL, $\hat\beta_j = \sum_i \tilde r_i \tilde y_i / \sum_i \tilde r_i^2$ with residual SSE equal to $\mathrm{SSE}_{ur}$. The restricted model forces $\beta_j = 0$, so $\mathrm{SSE}_r - \mathrm{SSE}_{ur} = \hat\beta_j^2 \sum_i \tilde r_i^2$ (the explained sum of squares of the residual-on-residual fit). Then

$$
F = \frac{\hat\beta_j^2 \sum_i \tilde r_i^2}{\mathrm{SSE}_{ur}/(n-k-1)} = \left(\frac{\hat\beta_j}{\operatorname{se}(\hat\beta_j)}\right)^2 = t_j^2,
$$

because $\operatorname{se}(\hat\beta_j) = \hat\sigma / \sqrt{\sum_i \tilde r_i^2}$.
:::
:::

::: exercise A one-sided test {level=3}
In [[#ex-t-sim]], test $H_0$: $\beta_1 \le 0.5$ against $H_1$: $\beta_1 > 0.5$ at $5\%$. The one-sided $5\%$ critical value of $t_{38}$ is $1.686$. State the $t$ statistic, the decision, and why a one-sided test needs an economic argument for the direction.
::: solution
$t = (0.692 - 0.5)/0.134 = 1.43$, which is less than $1.686$: do not reject at $5\%$. (The one-sided $p$-value is about $0.08$.) A one-sided test is more powerful against the named alternative, but it is valid only if the other tail is truly uninteresting *before seeing the data*. Choosing the side after looking at $\hat\beta_1$ invalidates the $p$-value. For a return to schooling the interesting alternative is usually $\beta_1 > 0$, which can be stated in advance; for an advertising slope whose sign is not given by theory, two-sided is the honest default.
:::
:::
