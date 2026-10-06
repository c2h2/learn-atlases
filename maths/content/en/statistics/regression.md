Ten students recorded how many hours they spent revising for an exam and the mark they obtained:

| hours $x$ | 2 | 3 | 5 | 6 | 8 | 9 | 10 | 12 | 13 | 15 |
|---|---|---|---|---|---|---|---|---|---|---|
| mark $y$ | 52 | 55 | 61 | 58 | 70 | 68 | 75 | 79 | 77 | 88 |

The marks clearly rise with revision time, roughly along a straight line. Which line fits best? How much does one extra hour of revision add to the mark, and how sure can we be? What mark would we predict for a student who revises for seven hours, and how far off might that prediction be? And — the question people really want answered — does revising *cause* the higher marks?

**Regression** studies how a response variable $y$ depends on an explanatory variable $x$. This chapter develops **simple linear regression**: fitting a straight line by **least squares**, the statistical model behind it, inference for the slope, confidence and prediction intervals, the decomposition of variability that defines $R^2$, the use of residuals to check the model, and the phenomenon that gave regression its name, **regression to the mean**. We finish with the matrix formulation, which extends everything to several explanatory variables and connects with [[linear-algebra/least-squares]].

## The least squares line {#least-squares}

Given data points $(x_1,y_1),\ldots,(x_n,y_n)$, a line $y = b_0 + b_1x$ predicts $b_0 + b_1x_i$ at $x_i$, with **residual** $y_i - b_0 - b_1x_i$. The method of least squares chooses the line that makes the sum of squared residuals as small as possible. Throughout we use the notation

$$
S_{xx} = \sum_i(x_i-\bar x)^2,\qquad S_{xy} = \sum_i(x_i-\bar x)(y_i-\bar y),\qquad S_{yy} = \sum_i(y_i-\bar y)^2 .
$$

::: theorem Least squares estimates {#thm-least-squares}
Suppose the $x_i$ are not all equal. The sum of squares $Q(b_0,b_1) = \sum_i(y_i - b_0 - b_1x_i)^2$ is minimised uniquely by

$$
\hat\beta_1 = \frac{S_{xy}}{S_{xx}},\qquad\hat\beta_0 = \bar y - \hat\beta_1\bar x .
$$ {#eq-ls}
:::

::: proof
Setting the partial derivatives to zero ([[multivariable/extrema]]) gives the **normal equations**

$$
\frac{\partial Q}{\partial b_0} = -2\sum_i(y_i - b_0 - b_1x_i) = 0,\qquad\frac{\partial Q}{\partial b_1} = -2\sum_ix_i(y_i - b_0 - b_1x_i) = 0 .
$$

The first says $\bar y = b_0 + b_1\bar x$, so $b_0 = \bar y - b_1\bar x$. Substituting into the second and using $\sum_ix_i(y_i - \bar y) = S_{xy}$ and $\sum_ix_i(x_i-\bar x) = S_{xx}$ gives $S_{xy} - b_1S_{xx} = 0$, so $b_1 = S_{xy}/S_{xx}$ (and $S_{xx}>0$ because the $x_i$ are not all equal). To see that this critical point is the unique minimum, write $u_i = x_i - \bar x$ and $y_i - b_0 - b_1x_i = (y_i - \bar y - b_1u_i) + (\bar y - b_0 - b_1\bar x)$. Since $\sum_iu_i = 0$, the cross term vanishes when we sum the squares:

$$
Q(b_0,b_1) = \sum_i(y_i-\bar y - b_1u_i)^2 + n(\bar y - b_0 - b_1\bar x)^2 = S_{yy} - 2b_1S_{xy} + b_1^2S_{xx} + n(\bar y - b_0 - b_1\bar x)^2 .
$$

The first three terms form a quadratic in $b_1$ with positive leading coefficient, minimised only at $b_1 = S_{xy}/S_{xx}$, and the last term is zero only when $b_0 = \bar y - b_1\bar x$.
:::

The first normal equation shows that the fitted line passes through the point of means $(\bar x,\bar y)$ and that the **residuals** $e_i = y_i - \hat y_i$, where $\hat y_i = \hat\beta_0 + \hat\beta_1x_i$ are the **fitted values**, sum to zero; the second shows that $\sum_ix_ie_i = 0$ as well.

::: example Revision and exam marks {#ex-revision}
Fit the least squares line to the revision data above.
::: solution
From the data, $\bar x = 8.3$, $\bar y = 68.3$, $S_{xx} = 168.1$, $S_{xy} = 444.1$ and $S_{yy} = 1228.1$. Hence

$$
\hat\beta_1 = \frac{444.1}{168.1} = 2.642,\qquad\hat\beta_0 = 68.3 - 2.642\times8.3 = 46.37,
$$

and the fitted line is $\hat y = 46.37 + 2.642x$. Each extra hour of revision is associated with about $2.6$ more marks, and a student who revised for seven hours is predicted to score $46.37 + 2.642\times7 = 64.9$. The intercept, $46.4$, is the predicted mark with no revision at all — an extrapolation slightly outside the data (the smallest $x$ is $2$), to be treated with caution.
:::
:::

::: widget regression
points: 2,52; 3,55; 5,61; 6,58; 8,70; 9,68; 10,75; 12,79; 13,77; 15,88
degree: 1
x: 0, 16
y: 40, 95
caption: The revision data with the least squares line and residuals. Switch on the squares: least squares minimises their total area. Drag a point and watch the line, $R^2$ and $r$ respond; a point far from $\bar x = 8.3$ swings the line much more than one near the middle, because it has more **leverage**.
:::

## The linear model {#model}

To say how reliable the fitted line is, we need a model for how the data were generated.

::: definition Simple linear regression model {#def-linear-model}
The **simple linear regression model** states that

$$
Y_i = \beta_0 + \beta_1x_i + \eps_i,\qquad i = 1,\ldots,n,
$$ {#eq-model}

where the $x_i$ are fixed (non-random) numbers, not all equal, $\beta_0$, $\beta_1$ are unknown parameters, and the **errors** $\eps_i$ are uncorrelated random variables with mean $0$ and common variance $\sigma^2$. In the **normal linear model** the errors are, in addition, independent and $\Normal(0,\sigma^2)$.
:::

The model says that the mean of $Y$ at $x$ is the straight line $\beta_0 + \beta_1x$, and that scatter about the line has the same size everywhere (**homoscedasticity**). The least squares estimators are linear combinations of the $Y_i$: since $\sum_i(x_i - \bar x) = 0$,

$$
\hat\beta_1 = \frac{\sum_i(x_i-\bar x)Y_i}{S_{xx}} = \sum_ic_iY_i,\qquad c_i = \frac{x_i-\bar x}{S_{xx}},
$$ {#eq-slope-linear}

and the weights satisfy $\sum_ic_i = 0$, $\sum_ic_ix_i = 1$ and $\sum_ic_i^2 = 1/S_{xx}$.

::: theorem Mean and variance of the slope estimator {#thm-slope}
Under the linear model, $\hat\beta_1$ is unbiased and $\Var\hat\beta_1 = \dfrac{\sigma^2}{S_{xx}}$. Also $\hat\beta_0$ is unbiased, with $\Var\hat\beta_0 = \sigma^2\Bigl(\dfrac1n + \dfrac{\bar x^2}{S_{xx}}\Bigr)$.
:::

::: proof
By [[#eq-slope-linear]] and linearity, $\E\hat\beta_1 = \sum_ic_i(\beta_0 + \beta_1x_i) = \beta_0\sum_ic_i + \beta_1\sum_ic_ix_i = \beta_1$. Since the $Y_i$ are uncorrelated with variance $\sigma^2$, $\Var\hat\beta_1 = \sum_ic_i^2\sigma^2 = \sigma^2/S_{xx}$. For the intercept, $\E\hat\beta_0 = \E\bar Y - \bar x\E\hat\beta_1 = (\beta_0 + \beta_1\bar x) - \bar x\beta_1 = \beta_0$, and since $\Cov(\bar Y,\hat\beta_1) = \frac{\sigma^2}{n}\sum_ic_i = 0$,

$$
\Var\hat\beta_0 = \Var\bar Y + \bar x^2\Var\hat\beta_1 = \frac{\sigma^2}{n} + \frac{\bar x^2\sigma^2}{S_{xx}}.
$$
:::

The slope is estimated more precisely when $S_{xx}$ is large, that is, when the $x$-values are spread out: to measure a slope well, take observations far apart. Among all estimators of this kind, least squares is the best.

::: theorem Gauss–Markov theorem (for the slope) {#thm-gauss-markov}
Under the linear model, every linear unbiased estimator $\tilde\beta_1 = \sum_ia_iY_i$ of $\beta_1$ satisfies $\Var\tilde\beta_1\ge\Var\hat\beta_1$. Least squares is the **best linear unbiased estimator** (BLUE).
:::

::: proof
For $\sum_ia_iY_i$ to be unbiased for every $\beta_0$ and $\beta_1$ we need $\sum_ia_i(\beta_0 + \beta_1x_i) = \beta_1$ identically, that is $\sum_ia_i = 0$ and $\sum_ia_ix_i = 1$. Write $a_i = c_i + d_i$. Then $\sum_id_i = 0$ and $\sum_id_ix_i = 0$, and since $c_i$ is a linear combination of $1$ and $x_i$, also $\sum_ic_id_i = 0$. Hence

$$
\Var\tilde\beta_1 = \sigma^2\sum_ia_i^2 = \sigma^2\Bigl(\sum_ic_i^2 + 2\sum_ic_id_i + \sum_id_i^2\Bigr) = \Var\hat\beta_1 + \sigma^2\sum_id_i^2\ge\Var\hat\beta_1 .
$$

Equality holds only if all $d_i = 0$, that is, $\tilde\beta_1 = \hat\beta_1$.
:::

The error variance $\sigma^2$ is estimated from the residuals. The **residual sum of squares** is $\mathrm{SSE} = \sum_ie_i^2$, and

$$
S^2 = \frac{\mathrm{SSE}}{n-2}
$$ {#eq-residual-variance}

is unbiased for $\sigma^2$: two degrees of freedom are used up in estimating $\beta_0$ and $\beta_1$, just as one was used up by $\bar X$ in the sample variance. For the revision data, $\mathrm{SSE} = 54.84$, so $s^2 = 54.84/8 = 6.86$ and $s = 2.62$ marks: the typical scatter of a mark about the line.

## Inference for the slope and predictions {#inference}

For the normal linear model the sampling distributions are exact. The following theorem is the regression analogue of [[statistics/sampling#thm-normal-sample]], and is proved in the same way, by an orthogonal change of variables (see Rice, Chapter 14).

::: theorem Sampling distributions in the normal linear model {#thm-regression-t}
In the normal linear model, $\hat\beta_1\sim\Normal(\beta_1,\sigma^2/S_{xx})$, $(n-2)S^2/\sigma^2\sim\chi^2_{n-2}$, and the two are independent. Consequently

$$
T = \frac{\hat\beta_1 - \beta_1}{S/\sqrt{S_{xx}}}\sim t_{n-2} .
$$ {#eq-slope-t}
:::

The quantity $\operatorname{se}(\hat\beta_1) = s/\sqrt{S_{xx}}$ is the **standard error of the slope**. As in [[statistics/confidence-intervals]], the pivot [[#eq-slope-t]] gives the confidence interval $\hat\beta_1\pm t_{n-2,\alpha/2}\operatorname{se}(\hat\beta_1)$, and the test of $H_0$: $\beta_1 = 0$ ("$x$ has no linear effect on $y$") uses $t = \hat\beta_1/\operatorname{se}(\hat\beta_1)$.

::: example Is revision associated with higher marks? {#ex-slope-test}
For the revision data, find a $95\%$ confidence interval for the slope and test $H_0$: $\beta_1 = 0$.
::: solution
$\operatorname{se}(\hat\beta_1) = 2.618/\sqrt{168.1} = 0.202$. With $t_{8,0.025} = 2.306$, the $95\%$ interval is

$$
2.642\pm2.306\times0.202 = 2.642\pm0.466,\qquad\text{that is }[2.18,\ 3.11]\text{ marks per hour}.
$$

The test statistic is $t = 2.642/0.202 = 13.1$ with $8$ degrees of freedom, giving $p\approx1\times10^{-6}$. The association is overwhelming. Whether it is causal is a separate question (see the warning below).
:::
:::

At a new value $x_0$ there are two different questions. The **mean response** $\mu_0 = \beta_0 + \beta_1x_0$ is estimated by $\hat y_0 = \hat\beta_0 + \hat\beta_1x_0 = \bar Y + \hat\beta_1(x_0-\bar x)$, whose variance is $\sigma^2\bigl(\frac1n + \frac{(x_0-\bar x)^2}{S_{xx}}\bigr)$, because $\bar Y$ and $\hat\beta_1$ are uncorrelated. A **new observation** $Y_0 = \mu_0 + \eps_0$ has an additional independent error, so $Y_0 - \hat y_0$ has variance $\sigma^2\bigl(1 + \frac1n + \frac{(x_0-\bar x)^2}{S_{xx}}\bigr)$. This gives

$$
\begin{aligned}
\text{confidence interval for }\mu_0&:\quad\hat y_0\pm t_{n-2,\alpha/2}\,s\sqrt{\tfrac1n + \tfrac{(x_0-\bar x)^2}{S_{xx}}},\\
\text{prediction interval for }Y_0&:\quad\hat y_0\pm t_{n-2,\alpha/2}\,s\sqrt{1 + \tfrac1n + \tfrac{(x_0-\bar x)^2}{S_{xx}}}.
\end{aligned}
$$ {#eq-intervals}

::: example Predicting a mark {#ex-prediction}
For a student who revises for $7$ hours, find a $95\%$ confidence interval for the mean mark of all such students and a $95\%$ prediction interval for this student's mark.
::: solution
$\hat y_0 = 64.87$, and $(x_0 - \bar x)^2/S_{xx} = 1.69/168.1 = 0.010$. The confidence interval is $64.87\pm2.306\times2.618\sqrt{0.110}$, that is $64.87\pm2.00 = [62.9, 66.9]$. The prediction interval is $64.87\pm2.306\times2.618\sqrt{1.110}$, that is $64.87\pm6.36 = [58.5, 71.2]$. The average mark of seven-hour students is pinned down to within about two marks, but an individual student's mark is uncertain by more than six, because individuals scatter about the line. Collecting more data would shrink the first interval towards zero width, but not the second.
:::
:::

::: widget plot
f: 46.372 + 2.6419*x + 6.0377*sqrt(0.1 + (x - 8.3)^2/168.1); 46.372 + 2.6419*x - 6.0377*sqrt(0.1 + (x - 8.3)^2/168.1); 46.372 + 2.6419*x + 6.0377*sqrt(1.1 + (x - 8.3)^2/168.1); 46.372 + 2.6419*x - 6.0377*sqrt(1.1 + (x - 8.3)^2/168.1)
x: -8, 26
y: 10, 130
shade: -8, 26
between: true
points: 2,52; 3,55; 5,61; 6,58; 8,70; 9,68; 10,75; 12,79; 13,77; 15,88
labels: \text{mean response, upper}; \text{mean response, lower}; \text{new observation, upper}; \text{new observation, lower}
caption: The shaded region is the $95\%$ confidence band for the mean response $\beta_0+\beta_1x$, centred on the fitted line; the outer curves are the $95\%$ prediction band for a new observation. Both are narrowest at $\bar x = 8.3$ and flare out away from the data — at $x = 25$ the confidence band is four times as wide as at $\bar x$ — which is the quantitative reason why extrapolation is risky. Notice that most data points lie inside the prediction band but many lie outside the confidence band, as they should.
:::

::: quiz
Why is a prediction interval for a new observation always wider than the confidence interval for the mean response at the same $x_0$?
- [ ] Because it uses a larger t critical value.
- [x] Because a new observation varies about the true line by $\eps_0$, in addition to the uncertainty in the estimated line.
- [ ] Because the prediction interval has a higher confidence level.
- [ ] It is not always wider; at $x_0 = \bar x$ they coincide.
::: solution
Both use the same critical value and level. The prediction interval has the extra $1$ under the square root, coming from the variance $\sigma^2$ of the new observation's own error. Even if the line were known exactly, an individual observation would scatter about it, so the prediction interval never shrinks below about $\pm t\,\sigma$.
:::
:::

## Correlation and R² {#r-squared}

How much of the variation in $y$ does the line explain? The total variability $\mathrm{SST} = S_{yy}$ splits into an explained part $\mathrm{SSR} = \sum_i(\hat y_i - \bar y)^2$ and the residual part $\mathrm{SSE}$.

::: theorem Decomposition of the sum of squares {#thm-anova}
For the least squares fit,

$$
\sum_i(y_i-\bar y)^2 = \sum_i(\hat y_i-\bar y)^2 + \sum_i(y_i-\hat y_i)^2,\qquad\text{that is}\qquad\mathrm{SST} = \mathrm{SSR} + \mathrm{SSE} .
$$

Moreover the **coefficient of determination** $R^2 = \mathrm{SSR}/\mathrm{SST}$ equals $r^2$, the square of the sample correlation $r = S_{xy}/\sqrt{S_{xx}S_{yy}}$.
:::

::: proof
Write $y_i - \bar y = (\hat y_i - \bar y) + e_i$. Squaring and summing, the cross term is $2\sum_i(\hat y_i - \bar y)e_i = 2\sum_i\bigl(\hat\beta_0 - \bar y + \hat\beta_1x_i\bigr)e_i = 0$, because $\sum_ie_i = 0$ and $\sum_ix_ie_i = 0$ by the normal equations. This gives the decomposition. Next, $\hat y_i - \bar y = \hat\beta_1(x_i - \bar x)$, so

$$
\mathrm{SSR} = \hat\beta_1^2S_{xx} = \frac{S_{xy}^2}{S_{xx}},\qquad R^2 = \frac{S_{xy}^2}{S_{xx}S_{yy}} = r^2 .
$$
:::

$R^2$ lies between $0$ and $1$ and is the fraction of the variance of $y$ "explained" by its linear relationship with $x$. For the revision data, $\mathrm{SSR} = 444.1^2/168.1 = 1173.3$, so $R^2 = 1173.3/1228.1 = 0.955$ and $r = 0.977$: revision time accounts for $95.5\%$ of the variation in marks *in this sample*. The sample correlation $r$ is the data analogue of the correlation coefficient of [[probability/joint-distributions#def-covariance]], and like it, it measures only linear association.

::: quiz
A regression of adult weight on height (with a positive slope) has $R^2 = 0.49$. Which statement is correct?
- [ ] $49\%$ of the people in the sample lie on the fitted line.
- [x] The sample correlation is $0.7$, and the line accounts for $49\%$ of the variance in weight.
- [ ] Height causes $49\%$ of a person's weight.
- [ ] The slope of the line is $0.49$.
::: solution
$R^2 = r^2$, so $r = \sqrt{0.49} = 0.7$ (positive, because the slope is positive), and $R^2$ is the fraction of $S_{yy}$ accounted for by the line. It says nothing about how many points lie on the line, nothing about causation, and nothing directly about the slope, which depends on the units of measurement.
:::
:::

::: warning Correlation is not causation
A strong association between $x$ and $y$ does not show that changing $x$ would change $y$. The revision data are observational: students who revise more may also be more motivated, attend more lectures, or be stronger to begin with, and any of these **confounding** variables could produce the association. Ice-cream sales and drownings are correlated because both rise in hot weather. Only a randomised experiment, in which $x$ is assigned by chance, breaks the link with confounders and licenses a causal conclusion. Two further cautions: **extrapolation** beyond the range of the data assumes the line continues, which nothing in the data supports; and a high $R^2$ does not mean the model is right — a curved relationship can have a high $R^2$ for a straight line while every residual tells a different story.
:::

::: remark Anscombe's quartet
In 1973 Francis Anscombe constructed four small data sets with essentially the same means, variances, correlation ($r = 0.816$) and least squares line ($\hat y = 3.00 + 0.500x$). Plotted, they could hardly be more different: one is a reasonable linear scatter, one a smooth curve, one a perfect line with a single outlier, and one a vertical stack of points with one far-away point that alone determines the slope. The lesson: always plot the data and the residuals; summary statistics are not enough.
:::

## Checking the model with residuals {#residuals}

The inference above rests on assumptions: a straight-line mean, constant variance, independence, and (for exact t-intervals) normal errors. The residuals $e_i$ are our window on the unobservable errors $\eps_i$, and plotting them against $x$ (or against the fitted values) is the main diagnostic tool.

- **Curvature**: a systematic U-shaped or arched pattern means the straight-line mean is wrong; try a transformation (such as $\ln y$) or add an $x^2$ term.
- **Funnel shapes**: residuals that spread out as $x$ grows indicate non-constant variance; a log transformation of $y$ often helps.
- **Outliers and influential points**: a point with a large residual, or a point at an extreme $x$ (high **leverage**) that pulls the line towards itself, deserves investigation; refit without it to see how much the conclusions depend on it.
- **Dependence**: for data collected over time, residuals that drift in runs suggest autocorrelation, which invalidates the standard errors.

::: example Residuals for the revision data {#ex-residuals}
Compute the residuals of the revision data from the fitted line $\hat y = 46.37 + 2.642x$ and comment on them.
::: solution
The residuals $e_i = y_i - \hat y_i$, in order of increasing $x$, are approximately

$$
0.34,\ 0.70,\ 1.42,\ -4.22,\ 2.49,\ -2.15,\ 2.21,\ 0.93,\ -3.72,\ 2.00 .
$$

They sum to zero (up to rounding), as they must. Positive and negative values are interspersed with no systematic trend or curvature, and their spread does not change noticeably with $x$. The largest in size, $-4.22$ for the student who revised $6$ hours and scored $58$, is $1.6$ times $s = 2.62$ — unremarkable among ten observations. So the straight-line model with constant variance looks reasonable, although with only ten points the check is not very sensitive.
:::
:::

::: widget regression
points: 0,1.2; 1,2.1; 2,4.9; 3,9.6; 4,15.8; 5,25.4; 6,35.9; 7,49.1
degree: 1
residuals: true
x: -0.5, 7.5
y: -5, 55
caption: A straight line fitted to data that follow a curve. $R^2$ is high (about $0.92$), yet the residuals are positive at both ends and negative in the middle: a systematic pattern that the line cannot capture. Raise the degree to $2$ and the pattern disappears, leaving small, structureless residuals. A good fit is judged by the residuals, not by $R^2$ alone.
:::

## Regression to the mean {#regression-to-the-mean}

Why "regression"? Francis Galton noticed that the children of very tall parents are on average tall, but less extremely so; and the children of very short parents are short, but closer to average. He called this "regression towards mediocrity". It is a consequence of imperfect correlation, not of any biological force. If $x$ and $y$ are both standardised (mean $0$, standard deviation $1$), the least squares line is $\hat y = r\,x$, since $\hat\beta_1 = S_{xy}/S_{xx} = r\sqrt{S_{yy}/S_{xx}} = r$. With $\lvert r\rvert<1$, the predicted $y$ is always closer to the mean, in standard units, than $x$ is — as we saw for the bivariate normal in [[probability/joint-distributions#prop-bivariate-normal]].

::: example The "improvement" of the worst performers {#ex-regression-mean}
A class takes two tests of equal difficulty, and the scores on the two tests, in standard units, have correlation $0.6$. The students who scored $2$ standard deviations below the mean on the first test receive extra tutoring. On the second test their average is $1.2$ standard deviations below the mean. Does this show that the tutoring helped?
::: solution
No — or at least, not by itself. Without any tutoring, the regression line $\hat y = 0.6x$ predicts that students $2$ standard deviations below the mean on test 1 score on average $0.6\times(-2) = -1.2$ standard deviations on test 2. Their low first scores were partly bad luck, which is not repeated. The observed "improvement" is exactly what regression to the mean predicts. A fair evaluation needs a **control group**: comparable low scorers chosen at random to receive no tutoring. Regression to the mean misleads in many settings — patients enrolled in trials when symptoms are at their worst, speed cameras installed after a bad year for accidents, a sports team's form after its best season.
:::
:::

## Matrix form and multiple regression {#matrix-form}

With several explanatory variables, $Y_i = \beta_0 + \beta_1x_{i1} + \dots + \beta_px_{ip} + \eps_i$, it is convenient to write the model as

$$
\mathbf Y = X\boldsymbol\beta + \boldsymbol\eps,
$$

where $\mathbf Y\in\R^n$, $X$ is the $n\times(p+1)$ **design matrix** whose $i$-th row is $(1, x_{i1},\ldots,x_{ip})$, and $\boldsymbol\beta = (\beta_0,\ldots,\beta_p)\T$. Least squares minimises $\lVert\mathbf Y - X\mathbf b\rVert^2$, and by [[linear-algebra/least-squares]] the minimiser solves the normal equations $X\T X\mathbf b = X\T\mathbf Y$. If $X$ has full column rank,

$$
\hat{\boldsymbol\beta} = (X\T X)^{-1}X\T\mathbf Y .
$$ {#eq-normal-equations}

Geometrically, the vector of fitted values $X\hat{\boldsymbol\beta}$ is the orthogonal projection of $\mathbf Y$ onto the column space of $X$, and the residual vector is orthogonal to that space — which is the matrix form of the normal equations and of the decomposition $\mathrm{SST} = \mathrm{SSR} + \mathrm{SSE}$ (Pythagoras). The covariance matrix of $\hat{\boldsymbol\beta}$ is $\sigma^2(X\T X)^{-1}$, $\sigma^2$ is estimated by $\mathrm{SSE}/(n-p-1)$, and each coefficient has a t-test with $n-p-1$ degrees of freedom. The Gauss–Markov theorem holds in the same form. Multiple regression allows the effect of one variable to be estimated while *adjusting* for others — although adjustment only removes confounding by variables that have been measured.

::: quiz
A flight instructor notices that trainees who are praised after an unusually smooth landing usually do worse on the next one, while those who are criticised after an unusually rough landing usually improve. What is the most likely explanation?
- [ ] Praise makes trainees complacent and criticism makes them try harder.
- [x] Regression to the mean: an unusually good or bad landing is partly luck, and the next landing is likely to be closer to the trainee's average.
- [ ] Landings are independent, so there should be no pattern; the instructor is misremembering.
- [ ] The trainees are getting tired.
::: solution
Landing quality on successive attempts is positively but imperfectly correlated, so extreme performances are followed, on average, by less extreme ones — whatever the instructor says. Praise and criticism may have effects, but this pattern cannot reveal them; a comparison with trainees who receive no feedback would be needed.
:::
:::

::: history
The method of least squares was published by Adrien-Marie Legendre in 1805, in an appendix to a work on the orbits of comets. Carl Friedrich Gauss published it in 1809, claiming to have used it since 1795, and justified it by assuming normally distributed errors; in the 1820s he proved its optimality among linear unbiased estimators, the result later restated by Andrey Markov and now called the Gauss–Markov theorem. The word "regression" comes from Francis Galton's 1886 study of the heights of $928$ adult children and their parents. Karl Pearson developed the mathematics of correlation, and George Udny Yule extended regression to several variables in 1897. Ronald Fisher derived the exact sampling distributions of regression coefficients and introduced the analysis of variance in the 1920s.
:::

## Where this leads {#where-next}

Regression is the gateway to most of applied statistics. The analysis of variance compares several group means within the same linear-model framework; **generalised linear models** (logistic regression for binary outcomes, Poisson regression for counts) extend it to non-normal responses by maximum likelihood ([[statistics/estimation]]); and regularised methods such as ridge regression and the lasso deliberately trade bias for variance, as in [[statistics/estimation#thm-mse]], when there are many explanatory variables. A Bayesian treatment of the linear model, with a prior on $\boldsymbol\beta$, is a direct extension of [[statistics/bayesian]]. Numerically, least squares problems are solved not by inverting $X\T X$ but with the QR or singular value decomposition ([[linear-algebra/svd]]).

::: summary
- Least squares minimises $\sum(y_i - b_0 - b_1x_i)^2$: $\hat\beta_1 = S_{xy}/S_{xx}$, $\hat\beta_0 = \bar y - \hat\beta_1\bar x$; residuals sum to zero and the line passes through $(\bar x,\bar y)$.
- Under $Y_i = \beta_0 + \beta_1x_i + \eps_i$ with uncorrelated errors of variance $\sigma^2$, $\hat\beta_1$ is unbiased with variance $\sigma^2/S_{xx}$, and it is the best linear unbiased estimator (Gauss–Markov).
- $s^2 = \mathrm{SSE}/(n-2)$ estimates $\sigma^2$; with normal errors $(\hat\beta_1-\beta_1)/(s/\sqrt{S_{xx}})\sim t_{n-2}$, giving intervals and tests for the slope.
- Confidence intervals for the mean response are much narrower than prediction intervals for new observations; both widen away from $\bar x$.
- $\mathrm{SST} = \mathrm{SSR} + \mathrm{SSE}$ and $R^2 = r^2$ is the fraction of variation explained by the line.
- Check assumptions with residual plots; beware outliers, high-leverage points, curvature and non-constant variance.
- Correlation is not causation, extrapolation is risky, and regression to the mean can masquerade as a treatment effect.
:::

## Exercises

::: exercise A slope by hand {level=1 check="1.9"}
For the points $(1,3)$, $(2,5)$, $(3,6)$, $(4,9)$, compute $\hat\beta_1$ and $\hat\beta_0$. Enter the slope.
::: solution
$\bar x = 2.5$ and $\bar y = 5.75$. The deviations $x_i - \bar x$ are $-1.5, -0.5, 0.5, 1.5$ and $y_i - \bar y$ are $-2.75, -0.75, 0.25, 3.25$, so $S_{xx} = 2.25 + 0.25 + 0.25 + 2.25 = 5$ and $S_{xy} = 4.125 + 0.375 + 0.125 + 4.875 = 9.5$. Hence $\hat\beta_1 = 9.5/5 = 1.9$ and $\hat\beta_0 = 5.75 - 1.9\times2.5 = 1$: the line is $\hat y = 1 + 1.9x$.
:::
:::

::: exercise R² from correlation {level=1 check="0.64"}
The correlation between two variables is $r = -0.8$. What proportion of the variance of $y$ is explained by the least squares line?
::: solution
$R^2 = r^2 = 0.64$: $64\%$, whatever the sign of $r$.
:::
:::

::: exercise Units of the slope {level=1 check="2.642/60"}
In [[#ex-revision]] the slope is $2.642$ marks per hour. What would the slope be if revision time were measured in minutes?
::: solution
One minute is $1/60$ of an hour, so the slope becomes $2.642/60\approx0.044$ marks per minute. In general, rescaling $x$ by a factor $a$ divides the slope by $a$; the fitted values, residuals and $R^2$ do not change.
:::
:::

::: exercise A test for the slope {level=2}
A regression on $n = 20$ observations gives $\hat\beta_1 = 1.5$ with standard error $0.6$. Test $H_0$: $\beta_1 = 0$ at the $5\%$ level ($t_{18,0.025} = 2.101$) and give a $95\%$ confidence interval for $\beta_1$.
::: solution
$t = 1.5/0.6 = 2.5>2.101$, so $H_0$ is rejected (the two-sided p-value is about $0.022$). The interval is $1.5\pm2.101\times0.6 = [0.24, 2.76]$, which excludes $0$, consistently with the test.
:::
:::

::: exercise Reading off a regression {level=2 check="56"}
For pairs of measurements, $\bar x = 20$, $\bar y = 50$, $s_x = 4$, $s_y = 10$ and $r = 0.6$. Find the least squares line for predicting $y$ from $x$, and the predicted $y$ when $x = 24$.
::: solution
$\hat\beta_1 = S_{xy}/S_{xx} = r\,s_y/s_x = 0.6\times10/4 = 1.5$ and $\hat\beta_0 = 50 - 1.5\times20 = 20$, so $\hat y = 20 + 1.5x$. At $x = 24$ (one standard deviation above $\bar x$), $\hat y = 56$, which is $0.6$ standard deviations above $\bar y$: regression to the mean in action.
:::
:::

::: exercise Regressing x on y {level=2}
Show that the least squares line for predicting $x$ from $y$ is not, in general, the same line as the one for predicting $y$ from $x$: in standard units the two slopes are $r$ and $1/r$ when both lines are drawn in the $(x, y)$ plane. When do they coincide?
::: solution
In standard units, the line for $y$ on $x$ is $\hat y = rx$. By symmetry the line for $x$ on $y$ is $\hat x = ry$, which drawn in the $(x,y)$ plane is $y = x/r$, with slope $1/r$. The two lines coincide only if $r = 1/r$, that is $r = \pm1$, when all points lie exactly on a line. Otherwise both lines pass through the point of means, and the $y$-on-$x$ line is less steep: each line regresses towards the mean of the variable being predicted.
:::
:::

::: exercise Residuals are uncorrelated with x {level=3}
Prove that for a least squares fit with an intercept, the residuals satisfy $\sum_ie_i = 0$ and $\sum_i(x_i - \bar x)e_i = 0$, so their sample correlation with $x$ is zero. Explain why this means that a residual plot can reveal curvature but never a linear trend.
::: solution
The normal equations from [[#thm-least-squares]] state $\sum_ie_i = 0$ and $\sum_ix_ie_i = 0$. Then $\sum_i(x_i-\bar x)e_i = \sum_ix_ie_i - \bar x\sum_ie_i = 0$, so the sample covariance, hence the correlation, of $x$ and $e$ is zero. Any linear trend in the data has been absorbed into the fitted line, so the residuals have no linear trend in $x$ by construction; what remains visible in a residual plot are *non-linear* patterns (curvature), changes in spread, and isolated outliers.
:::
:::

::: exercise The variance of a fitted value {level=3}
Under the linear model, show that $\Var(\hat\beta_0 + \hat\beta_1x_0) = \sigma^2\Bigl(\dfrac1n + \dfrac{(x_0-\bar x)^2}{S_{xx}}\Bigr)$, and deduce that the mean response is estimated most precisely at $x_0 = \bar x$.
::: solution
$\hat\beta_0 + \hat\beta_1x_0 = \bar Y + \hat\beta_1(x_0-\bar x)$. By [[#eq-slope-linear]], $\Cov(\bar Y,\hat\beta_1) = \sum_i\frac1nc_i\sigma^2 = \frac{\sigma^2}{n}\sum_ic_i = 0$. Hence

$$
\Var\bigl(\bar Y + \hat\beta_1(x_0-\bar x)\bigr) = \frac{\sigma^2}{n} + (x_0-\bar x)^2\frac{\sigma^2}{S_{xx}},
$$

which is smallest, equal to $\sigma^2/n$, when $x_0 = \bar x$, and grows quadratically as $x_0$ moves away from the centre of the data.
:::
:::
