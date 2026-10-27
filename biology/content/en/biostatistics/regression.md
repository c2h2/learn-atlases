In 1886 Francis Galton published the heights of 928 adult children and their parents. Tall parents had tall children and short parents short ones — but not as tall or as short as themselves. The children of parents three inches above average were, on average, only about two inches above average. Galton called this "regression towards mediocrity", and the straight line he drew through his data gave its name to the most used tool in quantitative biology. Regression and correlation describe how two numerical variables vary together: how metabolic rate scales with body mass, how development time falls with temperature, how offspring resemble their parents, how enzyme activity depends on substrate.

This chapter covers the **correlation coefficient** and its test; the **least-squares regression line**, its interpretation and inference; the assumptions of the linear model and how to check them with **residuals**, illustrated by Anscombe's famous quartet; **transformations**, especially the log–log plots of **allometric scaling**; and the trap of **regression to the mean**. The theory is in [Maths Atlas: regression](/learn/maths/lesson.php?c=statistics&l=regression); several predictors at once, and non-normal responses, come in [[biostatistics/linear-models]].

Our running example is again from the iris data: sepal length and sepal width in the 50 flowers of *Iris setosa* measured by Edgar Anderson and published by Fisher (1936), as distributed with the R software. Sepal length has mean 5.006 cm and sepal width 3.428 cm.

## Scatter plots and correlation {#correlation}

The first step is always a **scatter plot**, with one variable on each axis and a point for each unit. It shows the direction of any relationship (positive or negative), its form (straight or curved), its strength (how tightly the points cluster) and any unusual points.

::: definition Covariance and the correlation coefficient {#def-correlation}
For $n$ pairs $(x_i, y_i)$, write
$$
S_{xx} = \sum (x_i - \bar x)^2, \qquad S_{yy} = \sum (y_i - \bar y)^2, \qquad S_{xy} = \sum (x_i - \bar x)(y_i - \bar y).
$$
The sample **covariance** is $S_{xy}/(n-1)$, and **Pearson's correlation coefficient** is
$$
r = \frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}.
$$ {#eq-r}
It lies between −1 and +1, equals ±1 only when the points lie exactly on a straight line, and is unchanged by changing the units or origin of either variable (apart from a change of sign if one is reversed).
:::

The correlation measures the strength of the *linear* association. A value near zero does not mean there is no relationship: a perfect U-shaped relation has $r = 0$. A value near ±1 does not mean that the relation is causal, or that it is linear outside the range of the data. And $r$ is sensitive to outliers and to the range of $x$ sampled: restricting the range of body masses studied lowers the correlation of metabolic rate with mass, though the underlying relation has not changed.

::: proposition Testing and estimating a correlation {#prop-r-test}
If the pairs are a random sample from a bivariate normal population with correlation $\rho$, then under $H_0\colon\rho = 0$,
$$
t = \frac{r\sqrt{n - 2}}{\sqrt{1 - r^2}}
$$ {#eq-r-test}
follows $t_{n-2}$. For a confidence interval, use **Fisher's z-transformation** $z = \tfrac12\ln\frac{1+r}{1-r} = \operatorname{artanh} r$, which is approximately normal with standard error $1/\sqrt{n - 3}$; transform the interval $z \pm 1.96/\sqrt{n-3}$ back with $\tanh$.
:::

::: example Sepal length and width in *Iris setosa* {#ex-iris-r}
For the 50 *setosa* flowers, $S_{xx} = 6.0882$ (length), $S_{yy} = 7.0408$ (width) and $S_{xy} = 4.8616$ (cm²). Calculate $r$, test $\rho = 0$ and give a 95 % confidence interval.
::: solution
$r = 4.8616/\sqrt{6.0882\times7.0408} = 4.8616/6.5472 = 0.7425$. Then $t = 0.7425\sqrt{48}/\sqrt{1 - 0.5514} = 5.144/0.6698 = 7.68$ on 48 degrees of freedom, $P = 6.7\times10^{-10}$.

For the interval, $z = \operatorname{artanh}(0.7425) = 0.9563$, with standard error $1/\sqrt{47} = 0.1459$; $z \pm 1.96\times0.1459$ gives 0.6704 to 1.2422, and back-transforming gives **0.585 to 0.846**. The interval is asymmetric about $r$, as it must be for a quantity bounded by 1. Flowers with longer sepals have wider ones, and length and width share about $r^2 = 55\,\%$ of their variance.
:::
:::

When the data are far from bivariate normal, contain outliers, or are ranks, **Spearman's rank correlation** $r_s$ (Charles Spearman, 1904) — Pearson's $r$ computed on the ranks of $x$ and of $y$ — measures how consistently $y$ increases (or decreases) with $x$, whether or not the relation is linear. Kendall's $\tau$ is a related measure based on concordant and discordant pairs.

## The least-squares line {#least-squares}

Correlation treats the two variables symmetrically. **Regression** does not: it models a **response** $y$ as a function of an **explanatory variable** $x$, to describe how $y$ changes with $x$ or to predict $y$ from $x$.

::: definition The simple linear regression model {#def-regression}
The **simple linear regression model** is
$$
y_i = \beta_0 + \beta_1 x_i + \varepsilon_i, \qquad \varepsilon_i \sim \Normal(0, \sigma^2) \text{ independently},
$$ {#eq-model}
where $\beta_0$ is the **intercept** (the mean of $y$ when $x = 0$), $\beta_1$ is the **slope** (the change in the mean of $y$ per unit increase in $x$), and $\varepsilon_i$ is the deviation of unit $i$ from the line. The $x_i$ are treated as fixed and known without error.
:::

::: proposition Least-squares estimates {#prop-ls}
The line $\hat y = b_0 + b_1 x$ that minimises the **residual sum of squares** $\mathrm{SS_{res}} = \sum (y_i - b_0 - b_1x_i)^2$ has
$$
b_1 = \frac{S_{xy}}{S_{xx}} = r\,\frac{s_y}{s_x}, \qquad b_0 = \bar y - b_1\bar x.
$$ {#eq-ls}
The line passes through $(\bar x, \bar y)$, the **residuals** $e_i = y_i - \hat y_i$ sum to zero, and the total variation splits as $S_{yy} = \mathrm{SS_{reg}} + \mathrm{SS_{res}}$, with $\mathrm{SS_{reg}}/S_{yy} = r^2$. The residual variance $s^2 = \mathrm{SS_{res}}/(n - 2)$ estimates $\sigma^2$.
:::

::: proof
Setting the partial derivatives of $\mathrm{SS_{res}}$ to zero gives $\sum (y_i - b_0 - b_1x_i) = 0$ and $\sum x_i(y_i - b_0 - b_1x_i) = 0$. The first says the residuals sum to zero, so $\bar y = b_0 + b_1\bar x$; substituting $b_0$ into the second and subtracting $\bar x$ times the first gives $\sum(x_i - \bar x)(y_i - \bar y) = b_1\sum(x_i - \bar x)^2$, i.e. $b_1 = S_{xy}/S_{xx}$. Writing $y_i - \bar y = (\hat y_i - \bar y) + e_i$ and noting that the cross-product sum vanishes by the two normal equations gives the partition, with $\mathrm{SS_{reg}} = b_1^2S_{xx} = S_{xy}^2/S_{xx} = r^2S_{yy}$.
:::

The quantity $R^2 = \mathrm{SS_{reg}}/S_{yy}$, the **coefficient of determination**, is the fraction of the variance of $y$ "explained" by the linear relation with $x$; in simple regression it equals $r^2$. The word "explained" is statistical, not causal.

::: proposition Inference for the slope and for predictions {#prop-slope-inference}
Under the model [[#eq-model]], the slope estimate has standard error $\mathrm{SE}(b_1) = s/\sqrt{S_{xx}}$, and $t = (b_1 - \beta_1)/\mathrm{SE}(b_1)$ follows $t_{n-2}$. The test of $H_0\colon\beta_1 = 0$ is identical to the test of $\rho = 0$ in [[#eq-r-test]]. At a value $x_0$, the confidence interval for the **mean response** and the **prediction interval** for a new individual are
$$
\hat y_0 \pm t^*\,s\sqrt{\frac1n + \frac{(x_0 - \bar x)^2}{S_{xx}}}, \qquad \hat y_0 \pm t^*\,s\sqrt{1 + \frac1n + \frac{(x_0 - \bar x)^2}{S_{xx}}},
$$ {#eq-pred}
with $t^* = t_{0.975,\,n-2}$ for 95 %.
:::

The precision of the slope depends on $S_{xx}$: spreading the $x$ values widely gives a much better estimate of the slope than clustering them, which is a design decision. Both intervals in [[#eq-pred]] are narrowest at $\bar x$ and widen away from it; the prediction interval is always much wider, because it includes the scatter $\sigma$ of individuals about the line.

::: example Regression of sepal width on length {#ex-iris-regression}
Using the *setosa* sums of [[#ex-iris-r]] and the means 5.006 and 3.428 cm, find the regression line of width on length, test the slope, and give the 95 % confidence and prediction intervals at a length of 5.5 cm.
::: solution
$b_1 = 4.8616/6.0882 = 0.7985$ and $b_0 = 3.428 - 0.7985\times5.006 = -0.569$, so
$$
\widehat{\text{width}} = -0.569 + 0.799\times\text{length}.
$$
Each extra centimetre of sepal length goes with 0.80 cm of extra width, on average. The intercept, the predicted width of a sepal of length zero, is meaningless biologically: $x = 0$ is far outside the data.

$\mathrm{SS_{res}} = S_{yy} - b_1S_{xy} = 7.0408 - 0.7985\times4.8616 = 3.1587$, $s^2 = 3.1587/48 = 0.06581$, $s = 0.2565$ cm. $\mathrm{SE}(b_1) = 0.2565/\sqrt{6.0882} = 0.1040$, so $t = 7.68$, exactly as for $r$, and the 95 % confidence interval for the slope is $0.7985 \pm 2.011\times0.1040 =$ **0.589 to 1.008**.

At $x_0 = 5.5$, $\hat y_0 = -0.5694 + 0.7985\times5.5 = 3.822$ cm. With $(x_0 - \bar x)^2/S_{xx} = 0.2440/6.0882 = 0.0401$: the confidence interval for the mean width of all 5.5-cm sepals is $3.822 \pm 2.011\times0.2565\sqrt{0.02 + 0.0401}$, i.e. **3.70 to 3.95 cm**; the prediction interval for a single new flower is $3.822 \pm 2.011\times0.2565\sqrt{1.0601}$, i.e. **3.29 to 4.35 cm**, four times as wide. These figures agree with standard software output for this subset of the iris data.
:::
:::

::: warning "Regressing y on x and x on y give the same line"
They do not. The regression of $y$ on $x$ minimises vertical deviations and has slope $rs_y/s_x$; the regression of $x$ on $y$ minimises horizontal deviations and, drawn on the same axes, has slope $s_y/(rs_x)$. The two coincide only when $\lvert r\rvert = 1$. For *setosa*, width on length has slope 0.80; length on width has slope $4.8616/7.0408 = 0.69$, which on the width-against-length plot is a line of slope $1/0.69 = 1.45$. The choice depends on the question: which variable is to be predicted, or which is the response. When neither is a response and both are measured with error, as in many allometric studies, a symmetric line such as the standardised major axis (slope $\pm s_y/s_x$) may be more appropriate (David Warton and colleagues, 2006).
:::

## Assumptions and diagnostics {#diagnostics}

The inferences of [[#prop-slope-inference]] rest on four assumptions, conveniently remembered as LINE:

- **L**inearity: the mean of $y$ is a straight-line function of $x$ over the range studied.
- **I**ndependence: the residuals are independent of each other (no repeated measures of one individual, no spatial or temporal autocorrelation, no shared phylogeny without allowance for it).
- **N**ormality: the residuals are normally distributed (needed for exact small-sample inference; less important for large $n$).
- **E**qual variance: the residual variance is the same at all values of $x$ (homoscedasticity).

None of them can be judged from $r$, $R^2$ or the P-value. They are judged from plots of the residuals.

::: definition Residual plots, leverage and influence {#def-diagnostics}
A **residual plot** shows the residuals $e_i$ against the fitted values $\hat y_i$ (or against $x_i$); if the model is adequate it is a structureless horizontal band. A curve indicates non-linearity; a funnel indicates unequal variance; isolated points far from zero are **outliers** in $y$. The **leverage** of observation $i$, $h_i = 1/n + (x_i - \bar x)^2/S_{xx}$, measures how far its $x$ value is from the others, and hence how strongly it can pull the line. An observation is **influential** if removing it changes the fitted line substantially; **Cook's distance** $D_i = \dfrac{e_i^2}{2s^2}\dfrac{h_i}{(1-h_i)^2}$ combines residual size and leverage, and values approaching 1 deserve scrutiny.
:::

::: example Anscombe's quartet {#ex-anscombe}
In 1973 Francis Anscombe constructed four data sets of 11 points each. In all four, $\bar x = 9$, $\bar y = 7.50$, $s_y^2 = 4.12$, the least-squares line is $\hat y = 3.00 + 0.500x$, $r = 0.816$, $R^2 = 0.67$, and the slope test gives $t = 4.24$, $P = 0.002$. Describe what the residual plots would reveal.
::: solution
Computing the regression for each set confirms the identical summaries (to two or three decimal places). The plots differ completely:

- **I.** A noisy straight-line relation; residuals form a structureless band. The linear model is appropriate.
- **II.** A smooth curve (an inverted parabola) with almost no scatter; the residuals are positive in the middle and negative at both ends. The relation is non-linear, and a quadratic fits almost perfectly.
- **III.** Ten points on an almost exact straight line ($\hat y = 4.01 + 0.345x$, $r = 1.000$) and one outlier at $x = 13$, $y = 12.74$ that tilts the fitted line. Its residual stands far from the rest.
- **IV.** Ten points at $x = 8$ and one at $x = 19$. The slope is determined entirely by the single high-leverage point ($h = 1$); without it, the slope cannot be estimated at all.

Only in data set I does the regression summary mean what it seems to. Anscombe's message — plot the data — is the most important rule of regression.
:::
:::

::: widget regression
points: 10,7.46; 8,6.77; 13,12.74; 9,7.11; 11,7.81; 14,8.84; 6,6.08; 4,5.39; 12,8.15; 7,6.42; 5,5.73
degree: 1
residuals: true
x: 2, 16
y: 4, 14
caption: Anscombe's data set III with its least-squares line ($\hat y = 3.00 + 0.500x$) and residuals. The point at $x = 13$, $y = 12.74$ has by far the largest residual and drags the line upwards. Drag it down to about $y = 8.5$, onto the line through the other ten points, and watch the slope fall to about 0.35 and $R^2$ rise to nearly 1. Then drag one of the end points (at $x = 4$ or 14) up or down: points far from $\bar x = 9$ have high leverage and move the line more than central points.
:::

In the *setosa* data the residual plot is reasonably even, but one flower (number 42 in the data set, length 4.5 cm, width 2.3 cm) has a residual of −0.72 cm, 2.8 residual standard deviations below the line, and the largest Cook's distance (0.28) — notable but not dominating. It is a real flower; reporting the analysis with and without it would show that the conclusions do not depend on it.

What to do when the assumptions fail depends on how: transform $y$ (or both variables) when the spread grows with the mean or the relation is multiplicative; add a curved term or fit a non-linear model when the relation bends; use a generalised linear model for counts and proportions ([[biostatistics/linear-models]]); use mixed models or time-series methods for non-independent data; and for comparative data across species, account for shared ancestry by **phylogenetic comparative methods** (Joseph Felsenstein's independent contrasts, 1985, and phylogenetic generalised least squares), since related species are not independent data points.

## Transformations and allometry {#allometry}

Many biological relationships are not straight lines but **power laws**: $y = a x^b$. Organ masses, metabolic rates, lifespans, home-range areas and many other traits scale with body mass in this way across species, a pattern called **allometry** (Julian Huxley, 1932). Taking logarithms turns a power law into a straight line:
$$
\log y = \log a + b\log x.
$$
The slope $b$ is the **scaling exponent**. If $b = 1$, $y$ is proportional to $x$ (**isometry**); $b < 1$ is negative allometry, $b > 1$ positive allometry. Logarithms have a second advantage: biological variation is usually multiplicative, so on the log scale the scatter about the line is roughly constant, satisfying the equal-variance assumption.

::: proposition Allometric scaling of metabolic rate (an empirical regularity) {#prop-kleiber}
Across species of mammals (and many other groups), basal metabolic rate $B$ scales with body mass $M$ approximately as
$$
B = aM^b, \qquad b \approx 0.75,
$$ {#eq-kleiber}
**Kleiber's law** (Max Kleiber, 1932). This is an observation, not a theorem. The exponent estimated depends on the species, the data set and the fitting method: estimates for mammals range from about 0.67 to 0.75, with evidence that the exponent differs between groups and size ranges, and theories explaining a universal value of 3/4 (for example West, Brown and Enquist's 1997 model of branching supply networks) remain debated.
:::

::: example Fitting an allometric exponent {#ex-allometry}
The following 20 pairs of $(\log_{10} M, \log_{10} B)$, with $M$ in grams and $B$ in watts, are **simulated** (Python, `random.seed(7)`; $\log_{10}M$ uniform on 1 to 6; $\log_{10}B = -1.6 + 0.72\log_{10}M$ plus normal noise with standard deviation 0.12) to resemble a mammalian data set:

(2.62, 0.32), (1.75, −0.35), (4.25, 1.52), (1.36, −0.70), (3.68, 1.09), (2.83, 0.48), (1.29, −0.75), (3.54, 1.15), (1.19, −0.68), (3.17, 0.83), (1.35, −0.70), (1.45, −0.64), (3.12, 0.61), (5.13, 2.08), (1.62, −0.36), (2.12, −0.04), (4.14, 1.33), (5.74, 2.42), (3.89, 1.14), (2.98, 0.69).

Estimate the scaling exponent with a 95 % confidence interval, and test whether it differs from 3/4 and from 2/3.
::: solution
On the log scale, $S_{xx} = 34.539$, $S_{xy} = 24.941$, so $b = 24.941/34.539 = 0.722$ and $\log_{10}a = 0.472 - 0.722\times2.861 = -1.594$, i.e. $B = 0.0255\,M^{0.722}$ (W, with $M$ in g). The residual standard deviation is $s = 0.0895$ and $\mathrm{SE}(b) = 0.0895/\sqrt{34.539} = 0.0152$. With $t_{0.975,18} = 2.101$ the 95 % interval for the exponent is **0.690 to 0.754**.

Against $b = 0.75$: $t = (0.722 - 0.75)/0.0152 = -1.83$, $P = 0.084$. Against $b = 2/3$: $t = 3.64$, $P = 0.0019$. These data are consistent with 3/4 but not with 2/3. The fit recovers the simulated exponent 0.72 well, and $R^2 = 0.992$ — typical of allometry over five orders of magnitude, where the huge range of $x$ makes $R^2$ large even with considerable scatter. The standardised major axis slope, $b/r = 0.725$, is almost the same because the correlation is so high.
:::
:::

::: widget regression
points: 2.62,0.32; 1.75,-0.35; 4.25,1.52; 1.36,-0.7; 3.68,1.09; 2.83,0.48; 1.29,-0.75; 3.54,1.15; 1.19,-0.68; 3.17,0.83; 1.35,-0.7; 1.45,-0.64; 3.12,0.61; 5.13,2.08; 1.62,-0.36; 2.12,-0.04; 4.14,1.33; 5.74,2.42; 3.89,1.14; 2.98,0.69
degree: 1
residuals: true
x: 0.5, 6.5
y: -1.2, 2.8
caption: The simulated allometric data of [[#ex-allometry]] on log–log axes: $\log_{10}$ body mass (g) horizontally, $\log_{10}$ basal metabolic rate (W) vertically, with the least-squares line of slope about 0.72. On these axes a power law is a straight line and the scatter is even across five orders of magnitude of mass. Drag the heaviest species (top right) downwards and see how much a single high-leverage point can change the estimated exponent.
:::

Back-transformation needs care. The fitted line on the log scale predicts the mean of $\log B$, which back-transforms to the geometric mean (approximately the median) of $B$, not its arithmetic mean ([[biostatistics/data-and-variation#transformations]]). And the exponent says how a trait changes *across* species; within a species, or during growth, the scaling can be quite different.

## Regression to the mean {#regression-to-mean}

Galton's observation has a purely statistical explanation, and it catches biologists, doctors and managers every day.

::: proposition Regression to the mean {#prop-rtm}
If two measurements $X$ and $Y$ have the same mean $\mu$ and standard deviation and correlation $\rho < 1$, then the expected value of $Y$ for units with $X = x$ is
$$
\E[Y \mid X = x] = \mu + \rho(x - \mu)
$$
(for bivariate normal variables, or as the best linear prediction in general). Units selected for an extreme first measurement will on average be less extreme on the second, by the factor $\rho$, even if nothing has changed.
:::

The reason is that any measurement is part signal and part noise (measurement error, day-to-day fluctuation, the luck of the environment). Units selected for extreme values were, on average, both truly extreme and lucky; on remeasurement the luck is not repeated. Galton's tall parents were partly tall because of genes they passed on and partly because of non-transmitted environmental and genetic effects, so their children regressed towards the mean by a factor related to the heritability of height ([[population-genetics/quantitative-traits]]).

::: example A spurious treatment effect {#ex-rtm}
An ecologist measures nest predation on 100 plots, selects the 10 plots with the highest predation for a predator-deterrent treatment, and a year later finds that predation on those plots has fallen by a third. The year-to-year correlation of predation rate between plots is 0.5. Is the deterrent effective?
::: solution
Not on this evidence. With a year-to-year correlation of 0.5, plots selected for extreme predation would be expected to move halfway back to the overall mean the next year even without treatment ([[#prop-rtm]]). If the selected plots were, say, 30 percentage points above the mean, they would be expected to be only 15 points above it the next year — a large apparent fall. The design needs a control: select the high-predation plots as before, then randomise half of them to receive the deterrent and half not, and compare the changes ([[biostatistics/experimental-design]]). Regression to the mean affects both groups equally and cancels.
:::
:::

::: quiz
A study of 40 lakes finds a strong correlation ($r = 0.85$) between the density of an invasive mussel and water clarity. Which conclusion is justified?
- [ ] Mussels increase water clarity by 85 %.
- [ ] Removing mussels would reduce clarity, because the correlation is significant.
- [x] Mussel density and clarity are strongly linearly associated across these lakes, explaining about 72 % of each other's variance; causation requires further evidence, for example from experiments.
- [ ] The relation must be linear because $r$ is close to 1.
::: solution
$r^2 = 0.72$. A correlation in observational data does not show which variable affects which (clear lakes might favour mussels, or mussels might clear lakes by filter feeding — which is in fact a known mechanism, but this study cannot show it), nor exclude a common cause such as low nutrient levels. A high $r$ can arise from a curved relation, and $r$ is not a percentage effect.
:::
:::

::: application Calibration curves and standard curves
Every laboratory that measures protein by the Bradford assay, DNA by fluorescence or a metabolite by spectrophotometry uses regression: a **standard curve** of signal (absorbance, fluorescence) against known concentrations is fitted, and unknown samples are read off it — **inverse prediction**, estimating $x$ from a new $y$. The precision of the estimate is governed by [[#eq-pred]] in reverse: it is best near the centre of the standards and deteriorates rapidly outside their range, so samples should be diluted to fall within the standards, never extrapolated. Many assays are linear only over a limited range (absorbance saturates, enzyme reactions follow Michaelis–Menten kinetics), and residual plots of the standards are the way to see where linearity ends. In quantitative PCR, the slope of the regression of threshold cycle on $\log_{10}$ template amount gives the amplification efficiency: a slope of −3.32 corresponds to perfect doubling each cycle.
:::

::: history
Francis Galton introduced regression in his studies of the inheritance of seed size in sweet peas (*Lathyrus odoratus*) in 1877 and of human stature in 1886, and the correlation coefficient in 1888. Karl Pearson gave the product-moment formula for $r$ in 1896, and his collaborator Walter Weldon applied correlation to the measurements of shrimps and crabs to study natural selection. Least squares itself is older: Adrien-Marie Legendre published it in 1805 and Carl Friedrich Gauss claimed it from 1795, both for astronomy. Charles Spearman's rank correlation appeared in 1904; Ronald Fisher derived the exact sampling distribution of $r$ in 1915 and the z-transformation in 1921; and Julian Huxley's *Problems of Relative Growth* in 1932, the same year as Max Kleiber's paper on body size and metabolism. Francis Anscombe's quartet was published in *The American Statistician* in 1973, and Joseph Felsenstein's phylogenetic independent contrasts, which made regression across species respectable, in 1985.
:::

::: summary
- Always plot the data first. Pearson's $r = S_{xy}/\sqrt{S_{xx}S_{yy}}$ measures linear association; test with $t = r\sqrt{n-2}/\sqrt{1-r^2}$, give intervals via Fisher's z. Use Spearman's $r_s$ for monotone or ranked data.
- Least squares: $b_1 = S_{xy}/S_{xx}$, $b_0 = \bar y - b_1\bar x$; $R^2 = r^2$; $\mathrm{SE}(b_1) = s/\sqrt{S_{xx}}$ on $n - 2$ df.
- *Iris setosa*: width $= -0.569 + 0.799\times$length, $r = 0.743$, slope 95 % CI 0.59 to 1.01.
- Prediction intervals for individuals are much wider than confidence intervals for the mean; both widen away from $\bar x$; never extrapolate.
- Assumptions (linearity, independence, normality, equal variance) are checked with residual plots, leverage and Cook's distance — Anscombe's quartet shows why.
- Power laws $y = ax^b$ become straight lines on log–log axes; Kleiber's exponent near 3/4 for metabolic rate is an empirical regularity, not a law of physics.
- Regression to the mean makes extreme units less extreme on remeasurement; only a randomised control separates it from a real effect.
:::

## Exercises

::: exercise A slope from sums of squares {level=1 check="2"}
For a set of points, $S_{xy} = 24$ and $S_{xx} = 12$. What is the least-squares slope?
::: solution
$b_1 = 24/12 = 2$.
:::
:::

::: exercise From R² to r {level=1 check="0.8"}
A regression of wing length on body mass has $R^2 = 0.64$ and a positive slope. What is the correlation coefficient?
::: solution
$r = +\sqrt{0.64} = 0.8$, taking the sign of the slope.
:::
:::

::: exercise A predicted value {level=1 check="3.42"}
Using the *setosa* regression of [[#ex-iris-regression]] ($b_0 = -0.5694$, $b_1 = 0.7985$), predict the mean sepal width for a sepal length of 5.0 cm, to three significant figures.
::: solution
$-0.5694 + 0.7985\times5.0 = 3.42$ cm.
:::
:::

::: exercise Testing a correlation {level=2 check="2.89"}
In 27 lizards, sprint speed and hind-limb length have $r = 0.50$. Calculate the t statistic for $H_0\colon\rho = 0$ to three significant figures.
::: solution
$t = 0.50\sqrt{25}/\sqrt{1 - 0.25} = 2.5/0.866 = 2.89$ on 25 degrees of freedom, $P = 0.008$.
:::
:::

::: exercise Scaling up {level=2 check="5.62"}
If metabolic rate scales as $M^{0.75}$, by what factor does it increase when body mass increases tenfold? Give three significant figures, and say what happens to metabolic rate per gram.
::: solution
$10^{0.75} = 5.62$. Metabolic rate per gram scales as $M^{-0.25}$ and falls by the factor $10^{-0.25} = 0.56$: a gram of mouse burns energy far faster than a gram of elephant.
:::
:::

::: exercise A confidence interval for a correlation {level=2}
For $r = 0.60$ from $n = 30$ pairs, compute the 95 % confidence interval for $\rho$ with Fisher's z-transformation.
::: answer
0.31 to 0.79.
:::
::: solution
$z = \operatorname{artanh}(0.60) = 0.6931$, $\mathrm{SE} = 1/\sqrt{27} = 0.1925$, so $z \pm 1.96\times0.1925 = 0.3159$ to $1.0704$. Back-transforming: $\tanh(0.3159) = 0.306$ and $\tanh(1.0704) = 0.790$. With 30 pairs, a moderately strong sample correlation is compatible with population correlations from weak to strong.
:::
:::

::: exercise Reading residual plots {level=3}
Describe what each residual-against-fitted plot suggests and what you would do: (a) residuals spread more widely as fitted values increase, forming a funnel; (b) residuals positive at low and high fitted values and negative in the middle; (c) residuals that, when plotted in the order of measurement, show long runs of positive and then negative values; (d) an even band with one point five residual standard deviations from zero.
::: solution
(a) Variance increases with the mean — typical of multiplicative variation, counts or concentrations. Log-transform $y$ (or both variables for a power law), or use a model with a suitable variance function (a GLM, [[biostatistics/linear-models]]); weighted least squares is another option.
(b) Curvature: the straight line is inadequate. Add a quadratic term, transform $x$ or $y$, or fit a non-linear model suggested by the biology (for example Michaelis–Menten).
(c) Non-independence in time — drift of the instrument, temperature, a learning observer or genuine temporal autocorrelation. Check the measurement protocol, randomise the order of measurement in future, and use a model with correlated errors or include time as a covariate.
(d) A possible outlier. Check the records; if it is genuine, keep it, report its influence (leverage and Cook's distance), and check whether conclusions change without it.
:::
:::

::: exercise Regression to the mean in selection {level=3}
A plant breeder measures the yield of 500 lines, selects the top 5 % (mean 2.0 standard deviations above the population mean) and replants them in a second year. The year-to-year correlation of a line's yield is 0.4. (a) How far above the population mean, in standard deviations, do you expect the selected lines to be in the second year? (b) Explain why this does not mean the breeder's selection has failed, and relate the correlation to the heritability of yield. (c) How could the breeder estimate the "true" superiority of the selected lines more accurately before selection?
::: solution
(a) By [[#prop-rtm]], $0.4\times2.0 = 0.8$ standard deviations above the mean.
(b) The selected lines remain better than average: 0.8 SD is real, repeatable superiority. The other 1.2 SD of their first-year advantage was non-repeatable — that year's weather on their plots, measurement error, luck. The year-to-year correlation is the **repeatability** of yield; in quantitative genetics the analogous quantity for parents and offspring leads to the breeder's equation, $R = h^2S$, in which only the heritable fraction of the selection differential $S$ is transmitted ([[population-genetics/response-to-selection]]).
(c) Replicate: grow each line in several plots and locations (and years) before selecting, so that the mean of many measurements has a higher correlation with the true value. With $k$ independent replicate plots, the reliability of the mean rises from $\rho$ to $k\rho/(1 + (k-1)\rho)$, the same mathematics as the design effect of [[biostatistics/experimental-design]].
:::
:::
