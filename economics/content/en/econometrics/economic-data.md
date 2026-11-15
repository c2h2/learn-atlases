Does an extra year of school raise a worker's wage, and by how much? Jacob Mincer posed a version of that question in the 1950s and answered it with a regression of the logarithm of earnings on years of schooling and a quadratic in experience (Mincer, *Schooling, Experience, and Earnings*, 1974). Across many countries the slope on schooling is typically around $0.08$ to $0.12$: each extra year is associated with roughly $8$–$12\%$ higher wages (Psacharopoulos and Patrinos, *Education Economics* 26, 2018, compiling studies for more than $100$ countries). That number is a **statistical association**. Whether it is the causal effect of school — the amount by which a given person's wage would rise if they were assigned one more year — is a different, harder question. Ability, family background, the quality of schools and the state of the labour market all move with schooling, and none of them is randomly assigned.

**Econometrics** is the craft of taking questions of that kind to data: writing down a model of how the data were generated, estimating the unknown parameters, and saying how precise the estimates are. This chapter sets the scene. It classifies the data economists use, draws the line between correlation and causation, and reviews the probability that the rest of the course relies on. The full treatments of [random variables and expectation](/a/maths/lesson.php?c=probability&l=expectation), [covariance](/a/maths/lesson.php?c=probability&l=joint-distributions), the [law of large numbers and the central limit theorem](/a/maths/lesson.php?c=probability&l=limit-theorems), and [sampling distributions](/a/maths/lesson.php?c=statistics&l=sampling) live in the Maths Atlas; we use them freely.

## What econometrics is for

Economic theory — consumer choice, firm behaviour, labour supply, growth — delivers qualitative predictions and, in special cases, formulae. It rarely delivers a number. To ask how large a slope is, whether a restriction holds, or how well a model fits, we need observations and a statistical framework that connects those observations to the theory.

::: definition Econometrics {#def-econometrics}
**Econometrics** uses statistical methods to estimate economic relationships, to test economic theories, and to evaluate policies, from non-experimental data as well as from experiments. A typical exercise specifies a **population model** for a random variable $y$ (the **dependent** or **explained** variable) in terms of one or more **explanatory** (or **independent**, or **regressor**) variables $x$, together with an unobserved **error** $u$:

$$
y = \beta_0 + \beta_1 x + u.
$$ {#eq-pop}

The numbers $\beta_0$ and $\beta_1$ are **parameters**. Data are used to form **estimators** $\hat\beta_0$ and $\hat\beta_1$, whose sampling properties are studied under stated assumptions on $u$ and on how the sample was drawn.
:::

Three remarks on language will save confusion later. First, "independent variable" does not mean that $x$ is statistically independent of $u$; it is a traditional name for a regressor, and we will usually say **explanatory variable** instead. Second, the error $u$ is not a residual. The error is the unobserved gap between $y$ and $\beta_0 + \beta_1 x$ in the population; the **residual** $\hat u = y - \hat\beta_0 - \hat\beta_1 x$ is the gap left by a fitted equation in a sample, and is computed only after $\hat\beta_0$ and $\hat\beta_1$ are in hand ([[econometrics/simple-regression]]). Third, [[#eq-pop]] is a **model**, not an identity. It is useful only if the assumptions we place on $u$ are a reasonable description of the data we have.

The aims of an econometric study are usually some mix of the following.

- **Description.** Summarise how $y$ and $x$ move together in a sample: a slope, a partial correlation, a difference in means between two groups.
- **Testing.** Ask whether a restriction implied by theory is compatible with the data — for example, whether a price elasticity is $-1$, or whether a policy dummy has coefficient zero.
- **Prediction.** Form $\hat y$ for values of $x$ that may not have been observed. Prediction can be valuable even when $\hat\beta_1$ is not a causal effect.
- **Causal inference.** Estimate the **ceteris paribus** effect of $x$ on $y$: the change in $y$ that would follow from changing $x$ while holding the other determinants of $y$ fixed. This is the most demanding of the four, and the one that policy questions usually require.

This course develops the linear regression toolkit that serves all four aims. Causal claims need extra assumptions — random assignment, selection on observables, a valid instrument, a parallel trend — which later chapters and the sequel [[causal-inference/potential-outcomes]] make explicit. Until those assumptions are stated and defended, a slope is a slope, not an effect.

::: intuition Parameters, estimators, estimates
A **parameter** such as $\beta_1$ is a feature of the population; it is a fixed unknown number (in the frequentist framework used throughout this course). An **estimator** $\hat\beta_1$ is a rule, a function of the sample. An **estimate** is the number that rule produces in a particular sample. We study estimators because we want to know, before the sample is drawn, how close $\hat\beta_1$ is likely to be to $\beta_1$. Unbiasedness, consistency and efficiency are properties of the rule, not of any one number it happens to produce.
:::

## Types of economic data

The structure of the data set determines which estimators are available and which assumptions are plausible. Three structures dominate applied work.

::: definition Cross-section, time-series and panel data {#def-data-types}
A **cross-section** is a sample of units (people, firms, households, countries) observed at a given point in time, or without regard to the order of observation. A **time series** is a sequence of observations on one unit, or on an aggregate, indexed by time. A **panel** (or **longitudinal**) data set follows the same units over several periods, combining the two dimensions. A **pooled cross-section** stacks independent cross-sections drawn at different dates; the units need not be the same.
:::

A labour-force survey that interviews a fresh sample of households each year is a sequence of cross-sections. The same survey, if it tracks the same people, is a panel. Quarterly GDP for one country is a time series; GDP for many countries over many years is a panel. The distinction is not merely administrative. In a cross-section the natural thought experiment is a comparison across units: workers with $13$ years of school versus workers with $12$. In a time series it is a comparison across dates: this year's interest rate versus last year's. In a panel we can do both, and — the feature that makes panels so valuable — we can compare the *same* unit with itself over time, sweeping out any unobserved characteristic that does not change ([[econometrics/panel-data]]).

Two further classifications cut across those three.

**Experimental versus observational data.** In a randomised experiment the analyst assigns $x$ (a treatment, a price, a class size) by a known random rule. In observational data, $x$ is whatever the world assigned. Randomised experiments in economics exist — the Oregon Health Insurance Experiment, many development-economics field experiments, laboratory markets — but the great bulk of published empirical work uses observational data. The methods in this course apply to both; the assumptions they need are easier to believe when assignment is random.

**Micro versus aggregate data.** Household surveys, firm accounts and administrative records are **micro** data: the unit is a decision-maker. National accounts, price indices and unemployment rates are **aggregates**. Aggregation can create its own problems (the ecological fallacy: a slope estimated from city-level averages need not equal the slope at the individual level), and time-series aggregates typically display persistence that cross-sections do not ([[time-series/stationarity]]).

Data also come with a **sampling scheme**. A simple random sample from a well-defined population is the default assumption of [[econometrics/simple-regression]] through [[econometrics/inference]]. Many economic samples are not simple: they are stratified, clustered by village or school, truncated (we observe wages only for people who work), or selected (we observe test scores only for students who sit the exam). Those features change the sampling distribution of OLS and, in the truncated and selected cases, can bias it. We flag them when they matter; a systematic treatment of selection is part of [[econometrics/binary-outcomes]] and of later courses.

::: example Six workers {#ex-six-workers}
A tiny cross-section of six workers records years of schooling and an hourly wage, in units of money per hour:

| Worker | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ |
|---|---|---|---|---|---|---|
| Schooling $x$ | $8$ | $10$ | $12$ | $12$ | $14$ | $16$ |
| Wage $y$ | $8$ | $10$ | $13$ | $12$ | $16$ | $18$ |

Compute the sample mean, sample variance and sample covariance of $x$ and $y$, and their sample correlation.
::: solution
There are $n = 6$ observations. The sample means are $\bar x = 12$ and $\bar y = 77/6 \approx 12.833$. The sums of squares and products of deviations are

$$
\begin{aligned}
S_{xx} &= \sum_i (x_i - \bar x)^2 = 40,\\
S_{yy} &= \sum_i (y_i - \bar y)^2 = 68.833,\\
S_{xy} &= \sum_i (x_i - \bar x)(y_i - \bar y) = 52.
\end{aligned}
$$

The **sample variances** and **sample covariance**, with the usual $n-1$ denominator, are $s_x^2 = 40/5 = 8$, $s_y^2 = 13.767$ and $s_{xy} = 10.4$. The **sample correlation** is

$$
r_{xy} = \frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}} = \frac{52}{\sqrt{40\times 68.833}} = 0.991.
$$

Schooling and wages move together almost on a straight line in this toy sample. That is a description of these six people, not yet a claim about what would happen if one of them stayed in school an extra year.
:::
:::

::: widget regression
points: 8,8; 10,10; 12,13; 12,12; 14,16; 16,18
degree: 1
x: 6, 18
y: 6, 20
caption: The six workers of [[#ex-six-workers]] and the least-squares line (derived in the next chapter). Drag a point — especially one at the edge of the schooling range — and watch the slope and $R^2$ move. A single unusual observation can dominate a small sample; that is a reason to want more data, and a reason to look at plots.
:::

The same six numbers could be a time series (one person's schooling and wage at six dates) or a panel (two people, three dates). Without a description of how they were obtained, the plot cannot tell us. Always ask: what is the unit, what is the period, and how did these units come to be in the sample?

## Correlation is not causation

The sample correlation in [[#ex-six-workers]] is $0.99$. It is still not a reason to conclude that schooling *causes* higher wages. Three diagrams, each compatible with a positive association, make the point.

::: definition Association, confounding and reverse causality {#def-causation}
Two variables $y$ and $x$ are **associated** (or **correlated**, when the association is linear) if they move together in the population. A **causal effect** of $x$ on $y$ is the change in $y$ that would follow from an intervention that changes $x$ and nothing else. **Reverse causality** means that $y$ (also) causes $x$. A **confounder** $z$ is a third variable that causes both $x$ and $y$, inducing association even if $x$ has no causal effect on $y$. **Selection** induces association when the sample is more likely to include units for which $x$ and $y$ happen to line up.
:::

The three diagrams in words:

- **Causation.** Schooling raises productivity, and the labour market pays for productivity. Then $\beta_1 > 0$ in [[#eq-pop]] has a causal reading, provided $u$ contains no other cause of wages that is correlated with schooling.
- **Reverse causality.** People who expect high wages (because they are already in a high-wage occupation, or because they are healthier) choose more school. Then wages, or the determinants of wages, cause schooling.
- **Omitted confounding.** Ability, parental income, or the quality of local schools causes both more schooling and higher wages. The association between $x$ and $y$ then mixes the effect of school with the effect of the confounder. [[#prop-ovb-preview]] records the direction of the resulting bias; the full algebra is in [[econometrics/multiple-regression]].

A fourth mechanism, **simultaneity**, appears when $x$ and $y$ are determined together: price and quantity in a market, wage and employment at a firm, money growth and inflation in a macro model. The observed scatter is the cloud of *equilibria*, not a picture of either the demand curve or the supply curve. That is the oldest identification problem in econometrics, and the reason for the instrumental-variables methods of [[econometrics/instrumental-variables]].

::: warning A significant correlation is not an effect
A $t$ test of $H_0$: $\rho_{xy} = 0$ (or of $H_0$: $\beta_1 = 0$ in a regression) asks only whether the association in the population is zero. Rejecting that null says nothing about *why* $x$ and $y$ move together. The test does not know whether the diagram is causation, reverse causation, confounding or selection. Statistical significance is a statement about sampling noise, not about causal structure. The same warning applies to a large $R^2$.
:::

::: example Ice cream and drowning {#ex-ice-cream}
In a coastal city, monthly ice-cream sales $x$ and monthly drowning deaths $y$ have correlation $0.7$ over several years. A regression of $y$ on $x$ produces a positive, statistically significant slope. Should the city close the ice-cream stalls?
::: solution
No. Temperature (and the tourist season) is a confounder: hot months raise both ice-cream sales and swimming, and swimming raises drowning. Closing the stalls would not change the weather or the number of people in the water. The slope describes a seasonal association; it is not the effect of an intervention on ice-cream supply. A regression of drownings on ice-cream *and* temperature (and a swimming-activity measure) would typically drive the ice-cream coefficient toward zero — the pattern that [[econometrics/multiple-regression]] calls omitted-variable bias, running in reverse: once the confounder is included, the spurious slope disappears.
:::
:::

The ice-cream example is cartoonish on purpose. The same logic is the daily business of applied work. Cross-country regressions of growth on inequality, of crime on police, of health on health spending, of inflation on money, all face some mix of reverse causality, confounding and simultaneity. The honest response is not to give up on observational data; it is to say which diagram one has in mind, which variation in $x$ is being used, and what would have to be true of $u$ for the slope to be a causal effect.

::: proposition A preview of omitted-variable bias {#prop-ovb-preview}
Suppose the population model is $y = \beta_0 + \beta_1 x + \beta_2 z + u$ with $\E(u \mid x, z) = 0$, but the regression that is estimated omits $z$. The slope on $x$ in the short regression has probability limit $\beta_1 + \beta_2 \delta_1$, where $\delta_1$ is the slope from the population regression of $z$ on $x$. The **bias** $\beta_2 \delta_1$ is zero if $\beta_2 = 0$ (the omitted variable does not belong) or $\delta_1 = 0$ ($z$ is uncorrelated with $x$). Otherwise its sign is the product of the signs of $\beta_2$ and $\delta_1$.
:::

::: proof
The argument is given in full as [[econometrics/multiple-regression#thm-ovb]]. The short version: the omitted $z$ is equal to $\delta_0 + \delta_1 x +$ (an error uncorrelated with $x$). Substitute that into the long model and collect the coefficient on $x$. What remains of $z$ after projecting it onto $x$ is absorbed into the new error; what is correlated with $x$ contaminates $\beta_1$.
:::

Ability is the textbook confounder for schooling and wages: it raises wages ($\beta_2 > 0$) and is positively correlated with schooling ($\delta_1 > 0$), so the short regression overstates the return to school. Experience, in a sample of a given age, goes the other way: older-looking experience is negatively correlated with schooling, so omitting it understates the return. Neither conclusion is available from the correlation alone; each needs a sign restriction on the omitted piece.

::: quiz
A researcher finds that countries with more doctors per capita have higher life expectancy, and the slope is significant at $1\%$. Which conclusion is justified?
- [ ] An extra doctor causes a rise in life expectancy equal to the slope.
- [ ] The correlation cannot be causal, because the data are observational.
- [x] The data show a positive association; a causal reading needs an argument that other determinants of longevity are not driving both variables.
- [ ] The $1\%$ significance level means there is only a $1\%$ chance that the slope is not causal.
::: solution
Significance is about sampling noise, not about causal structure. Observational data *can* support causal claims, but only with extra assumptions (a natural experiment, a convincing set of controls, a panel strategy). The justified statement is the modest one: there is a positive association, and a causal interpretation is a further claim.
:::
:::

## A probability model for the data

Every estimator in this course is a function of a sample, and every claim about that estimator — unbiased, consistent, asymptotically normal — is a claim about its **sampling distribution**: the distribution of the estimator across repeated samples drawn in the same way. That idea is developed in the Maths Atlas ([sampling](/a/maths/lesson.php?c=statistics&l=sampling), [estimation](/a/maths/lesson.php?c=statistics&l=estimation)). Here we fix notation and record the facts we will use constantly.

Let $W$ be a random variable with [expectation](/a/maths/lesson.php?c=probability&l=expectation) $\E(W)$ and [variance](/a/maths/lesson.php?c=probability&l=expectation) $\Var(W) = \E\bigl(W - \E(W)\bigr)^2$. For a pair $(W, V)$,

$$
\Cov(W, V) = \E\bigl[(W - \E W)(V - \E V)\bigr], \qquad \Corr(W, V) = \frac{\Cov(W,V)}{\sqrt{\Var(W)\Var(V)}}.
$$

Linearity of expectation, $\E(aW + bV) = a\E(W) + b\E(V)$, does not require independence. Variance and covariance do need a little more care: $\Var(aW + bV) = a^2\Var(W) + b^2\Var(V) + 2ab\Cov(W,V)$, and $\Cov(W,V) = 0$ if $W$ and $V$ are independent, but zero covariance does not imply independence.

**Conditional expectation.** The object $\E(y \mid x)$ is the mean of $y$ among units with a given value of $x$. It is a function of $x$. The assumption $\E(u \mid x) = 0$, which will be the key exogeneity condition of [[econometrics/simple-regression]], is exactly the statement that $\E(y \mid x) = \beta_0 + \beta_1 x$: once $x$ is known, the remaining variation in $y$ has mean zero. A weaker version, $\E(u) = 0$ and $\Cov(x, u) = 0$, is enough for OLS to be consistent (though not, by itself, for the usual standard errors to be right). Both are assumptions about the **population**, not about a sample.

**iid sampling.** The default sampling scheme is that the pairs $(x_i, y_i)$, $i = 1, \dots, n$, are **independent and identically distributed** (iid) draws from the joint population distribution of $(x, y)$. Independence across $i$ is implausible for time series and for clustered samples (children in the same school, firms in the same industry); identical distributions are implausible if the population is a mix of groups with different slopes. When either fails we will say so and change the variance estimator ([[econometrics/heteroskedasticity]]).

::: definition Unbiasedness and consistency {#def-unbiased-consistent}
An estimator $\hat\theta_n$ of a parameter $\theta$, computed from a sample of size $n$, is **unbiased** if $\E(\hat\theta_n) = \theta$ for every $n$ (the expectation being over the sampling distribution). It is **consistent** if $\hat\theta_n \to_p \theta$ as $n \to \infty$: for every $\eps > 0$, $\Prob\bigl(\lvert\hat\theta_n - \theta\rvert > \eps\bigr) \to 0$. Unbiasedness is a finite-sample property; consistency is an asymptotic one. An estimator can be consistent without being unbiased (the sample standard deviation, or two-stage least squares), and unbiased without being consistent (an estimator that uses only the first observation).
:::

The [law of large numbers](/a/maths/lesson.php?c=probability&l=limit-theorems) is why averages work: if $W_1, \dots, W_n$ are iid with finite mean $\mu$, then $\bar W_n \to_p \mu$. Ordinary least squares is a ratio of averages of products, and the same law will give us consistency once we have a law of large numbers for those products. The [central limit theorem](/a/maths/lesson.php?c=probability&l=limit-theorems) is why we can form confidence intervals in large samples without knowing the distribution of $u$: a properly scaled average is approximately [normal](/a/maths/lesson.php?c=probability&l=continuous-random-variables), and so is a properly scaled OLS estimator.

::: example A finite-population mean {#ex-pop-mean}
A village has $N = 5$ households with food expenditure (units of money) $20, 24, 28, 30, 38$. Compute the population mean and the population variance (divisor $N$). If we could draw every simple random sample of size $n = 2$ without replacement, what would the average of the sample means be?
::: solution
The population mean is $\mu = (20+24+28+30+38)/5 = 28$. The population variance is $N^{-1}\sum_i (w_i - \mu)^2 = (64+16+0+4+100)/5 = 36.8$. Every simple random sample of size $2$ is equally likely, and the average of $\bar w$ across those $\binom{5}{2} = 10$ samples is exactly $28$. That is unbiasedness of the sample mean in a finite population: $\E(\bar W) = \mu$, before any sample is drawn. Econometrics asks the same question of more complicated estimators.
:::
:::

::: example Sampling variation of a mean {#ex-sampling-mean}
A population of $10{,}000$ wages is drawn once from a normal distribution with mean $12$ and standard deviation $3$, using the generator `numpy.random.default_rng(42)`. Five independent simple random samples of size $n = 30$ are then drawn (without replacement, from that finite population). The five sample means are $12.09$, $12.98$, $12.87$, $10.94$ and $12.99$. What do these numbers illustrate, and what standard error should we attach to a single sample mean?
::: solution
The population mean is $12$ (the finite-population mean of the $10{,}000$ draws is $11.97$, sampling noise in the artificial population itself). Each sample mean is a different random number, scattered around $12$. That scatter *is* the sampling distribution. The theoretical standard error for an iid sample of size $30$ from a population with $\sigma = 3$ is $\sigma/\sqrt{n} = 3/\sqrt{30} \approx 0.55$. The five means range from $10.94$ to $12.99$, a spread of about two standard errors, which is what the central limit theorem leads one to expect. A single applied paper reports one of these numbers; the standard error is the attempt to tell the reader about the other four thousand that were not drawn.
:::
:::

::: widget clt
dist: exponential
n: 10
samples: 2000
caption: Sample means of $n$ draws from a skewed (exponential) population. Raise $n$ from $2$ toward $30$: the histogram of means becomes bell-shaped and tightens at rate $1/\sqrt{n}$, which is the central limit theorem at work. OLS estimators are weighted averages of the $y_i$, so the same picture applies to $\hat\beta_1$ in large samples.
:::

Two practical morals follow. First, a point estimate without a standard error is an unfinished sentence. Second, "significant at $5\%$" means "a sample of this size would produce a statistic at least this large in fewer than $5\%$ of repeats *if the null were true*"; it does not mean "the probability that the null is true is less than $5\%$" ([hypothesis tests](/a/maths/lesson.php?c=statistics&l=hypothesis-testing)). We will return to that distinction in [[econometrics/inference]].

::: remark Finite populations and the $n-1$ divisor
When the sample is a non-negligible fraction of a finite population, the variance of $\bar y$ is smaller than $\sigma^2/n$ by a finite-population correction $(N-n)/(N-1)$. Economic samples are usually a tiny fraction of the population (a few thousand people from tens of millions), so the correction is ignored. The $n-1$ divisor in the sample variance is a different issue: it makes $s^2$ unbiased for $\sigma^2$ in iid sampling, and we will meet its regression analogue, the residual-variance estimator with $n-k-1$ in the denominator.
:::

## Experiments, observational data and identification

Write $y(1)$ for the wage a person would earn with an extra year of school and $y(0)$ for the wage they would earn without it. The **causal effect** for that person is $y(1) - y(0)$. We observe only one of the two **potential outcomes**. This is the setup of [[causal-inference/potential-outcomes]]; we need only one consequence of it here.

If extra school is **randomly assigned**, the two groups — treated and untreated — are comparable, and the difference in mean observed wages estimates the average causal effect. Randomisation does the econometric work: it makes $x$ independent of $u$ in [[#eq-pop]], so $\E(u \mid x) = 0$ holds by design.

If extra school is **chosen**, the two groups differ in whatever drove the choice. The difference in mean wages then mixes the causal effect with selection. Controlling for observed confounders (multiple regression), comparing the same person over time (panel data), or using a variable that shifts schooling without shifting wages except through schooling (instrumental variables) are three ways of reconstructing a comparison that randomisation would have given us. Each way needs an assumption that is not free, and each way is a later chapter.

**Identification** is the question: if we had the whole population, could we recover $\beta_1$ from the joint distribution of the observables? Estimation is the question: given a sample, how do we approximate that population quantity and how wrong are we likely to be? A parameter can be identified and still hard to estimate (a weak instrument); it can fail to be identified no matter how large the sample (supply and demand observed only as a scatter of equilibria, with no shifter). No amount of computing repairs a failure of identification.

::: application Returns to schooling, as a running example
Mincer's log-wage equation $\log w = \beta_0 + \beta_1 s + \beta_2 e + \beta_3 e^2 + u$, with $s$ years of school and $e$ years of experience, is the most estimated equation in labour economics. OLS estimates of $\beta_1$ for the United States in the late twentieth century cluster around $0.10$ (Card, "The Causal Effect of Education on Earnings", *Handbook of Labor Economics*, 1999). Instrumental-variables estimates that use compulsory-schooling laws or quarter of birth as shifters of $s$ are often a little higher, not lower — the opposite of the naive ability-bias prediction — which has several readings (Card 1999; Angrist and Krueger, *QJE* 1991): measurement error in $s$ biases OLS down, the instruments recover effects for people whose schooling is changed by the law (a local effect, not the population average), or ability bias is smaller than it is usually painted. None of these readings is settled by staring at a correlation. They require the apparatus of the rest of this course.
:::

::: history
**1944, Trygve Haavelmo.** Haavelmo's monograph "The Probability Approach in Econometrics", published as a supplement to *Econometrica*, argued that economic observations should be treated as realisations of a probability model, not as exact solutions of deterministic equations disturbed by an afterthought residual. The Cowles Commission, founded in 1933, developed that programme into the simultaneous-equations methods of the 1940s and 1950s. Randomised field experiments in economics became common only much later; the identification problems Haavelmo posed for observational data remain the subject of [[econometrics/instrumental-variables]] and of [[causal-inference/potential-outcomes]].
:::

## Evidence

A few well-known associations, with sources, will keep the correlation–causation distinction from remaining abstract.

- **Schooling and wages.** Private returns to an extra year of school, estimated from Mincer equations, average about $9\%$ across $139$ countries in the compilation of Psacharopoulos and Patrinos (*Education Economics* 26, 2018). The figure is an OLS association, not an experiment.
- **Class size and test scores.** The Tennessee STAR experiment (1985–89) randomly assigned children to small or regular classes and found gains of about $0.2$ standard deviations in small classes (Krueger, *QJE* 1999). Non-experimental comparisons of class size and scores are mixed in sign, a reminder that parents and schools choose class size.
- **Minimum wages and employment.** Card and Krueger's comparison of fast-food employment in New Jersey and Pennsylvania around New Jersey's $1992$ rise in the minimum wage found no fall in employment (*AER* 1994). Other designs and other episodes find small negative effects. The dispute is about identification and about which labour market is being studied, not about whether employment and wages are correlated.
- **Income and life expectancy.** Across countries, GDP per capita and life expectancy are strongly positively associated (the Preston curve; Preston, *Population Studies* 1975). The curve has shifted up over time at given income, so income is not the only driver; within-country panel evidence on the causal effect of income on mortality is smaller and more fragile.

In each case the raw association is easy to compute and easy to over-interpret. The work is in saying what, if anything, in the association is an effect.

## Where this leads

The next chapter, [[econometrics/simple-regression]], takes [[#eq-pop]] as the object of estimation, derives ordinary least squares, and studies its algebraic properties. [[econometrics/multiple-regression]] adds regressors, states the Gauss–Markov theorem, and gives the omitted-variable formula of [[#prop-ovb-preview]] in full. [[econometrics/inference]] attaches standard errors, tests and confidence intervals. The later chapters treat the failures of the basic assumptions that economic data typically exhibit. Two sequels go further: [[causal-inference/potential-outcomes]] on research designs for causal effects, and [[time-series/stationarity]] on data with a time order. The labour-economics course returns to schooling, experience and wages in [[labour-economics/human-capital]].

::: summary
- Econometrics estimates economic relationships, tests theories and evaluates policies, from a stated population model $y = \beta_0 + \beta_1 x + u$.
- Cross-sections compare units, time series compare dates, and panels can compare the same unit with itself; the structure of the data constrains the estimators.
- Association is not causation. Reverse causality, confounding, selection and simultaneity all produce correlations. A significant slope is a statement about sampling noise, not about causal structure.
- Estimators are random variables. Unbiasedness is a finite-sample property of the sampling distribution; consistency is an asymptotic one. Both need assumptions.
- Random assignment makes $\E(u \mid x) = 0$ hold by design. Observational data need a credible substitute: controls, a panel comparison, or an instrument.
- Identification (could we recover $\beta_1$ from the population?) is prior to estimation (how well do we approximate it in a sample?).
:::

## Exercises

::: exercise The mean schooling {level=1 check="12"}
In [[#ex-six-workers]] the schooling values are $8, 10, 12, 12, 14, 16$. Compute the sample mean $\bar x$. (Enter $\bar x$.)
::: solution
$\bar x = (8+10+12+12+14+16)/6 = 72/6 = 12$.
:::
:::

::: exercise A sample covariance {level=1 check="2.25"}
For $x = (1, 2, 3, 4, 5)$ and $y = (2, 1, 4, 2, 6)$, compute the sample covariance $s_{xy} = S_{xy}/(n-1)$. (Enter the sample covariance.)
::: solution
$\bar x = 3$ and $\bar y = 3$. The deviations of $x$ are $-2,-1,0,1,2$ and of $y$ are $-1,-2,1,-1,3$, so

$$
S_{xy} = (-2)(-1) + (-1)(-2) + 0\cdot 1 + 1\cdot(-1) + 2\cdot 3 = 2+2+0-1+6 = 9.
$$

Then $s_{xy} = 9/4 = 2.25$.
:::
:::

::: exercise Classify the data {level=1}
For each of the following, say whether the data are a cross-section, a time series, a pooled cross-section or a panel, and name the unit of observation.

(a) Annual real GDP per capita for Kenya from 1960 to 2020.

(b) Wages of $4{,}000$ Brazilian workers interviewed once in 2019.

(c) The same $4{,}000$ workers, interviewed again in 2021 and 2023.

(d) Independent samples of $3{,}000$ Indian households drawn in 2005, 2012 and 2019 (the people are not the same).
::: solution
(a) Time series; the unit is the country-year (one country, many years). (b) Cross-section; the unit is the worker. (c) Panel; the unit is the worker-year, with the same workers followed. (d) Pooled cross-section; the unit is the household, but a fresh sample is drawn each year.
:::
:::

::: exercise A correlation by hand {level=2 check="0.99"}
For $x = (1, 2, 3, 4)$ and $y = (2, 3, 5, 6)$, compute the sample correlation $r_{xy} = S_{xy}/\sqrt{S_{xx}S_{yy}}$. Enter the value rounded to two decimal places.
::: solution
$\bar x = 2.5$, $\bar y = 4$. Deviations of $x$: $-1.5,-0.5,0.5,1.5$; of $y$: $-2,-1,1,2$. Then $S_{xx} = 2.25+0.25+0.25+2.25 = 5$, $S_{yy} = 4+1+1+4 = 10$ and $S_{xy} = 3+0.5+0.5+3 = 7$, so $r_{xy} = 7/\sqrt{50} = 0.9899\ldots$, which rounds to $0.99$.
:::
:::

::: exercise The standard error of a mean {level=2 check="1"}
A simple random sample of $n = 64$ households is drawn from a large population of household food expenditure with $\sigma = 8$ (units of money). What is the standard error of the sample mean? (Enter $\sigma/\sqrt{n}$.)
::: solution
$\sigma/\sqrt{n} = 8/8 = 1$. A sample mean computed from $64$ iid draws with $\sigma = 8$ has sampling standard deviation $1$; that is the number that belongs next to the reported average.
:::
:::

::: exercise The sign of omitted-variable bias {level=2}
In the population, wages depend on schooling $x$ and ability $z$ as in [[#prop-ovb-preview]], with $\beta_1 > 0$ and $\beta_2 > 0$. Ability is not observed. In each case, state whether the short regression of wages on schooling overstates, understates, or (approximately) gets right the causal effect of schooling.

(a) Ability and schooling are positively correlated.

(b) Ability and schooling are uncorrelated (for example, because a lottery assigned extra school).

(c) A scholarship is given to the lowest-ability students, so ability and schooling are negatively correlated.
::: solution
The bias is $\beta_2\delta_1$, with $\beta_2 > 0$. (a) $\delta_1 > 0$, so the short slope is too large (classical ability bias). (b) $\delta_1 = 0$, so the short slope is unbiased for $\beta_1$. (c) $\delta_1 < 0$, so the short slope is too small: the scholarship puts low-ability people into high schooling, which pulls the observed wage–schooling line down.
:::
:::

::: exercise Correlation is invariant to units {level=3}
Let $x_i^* = a + b x_i$ and $y_i^* = c + d y_i$ with $b > 0$ and $d > 0$. Show that the sample correlation of $(x^*, y^*)$ equals the sample correlation of $(x, y)$. What happens if $b < 0$?
::: hint
Write the deviations $x_i^* - \bar x^* = b(x_i - \bar x)$ and likewise for $y$, and substitute into $S_{x^*x^*}$, $S_{y^*y^*}$ and $S_{x^*y^*}$.
:::
::: solution
$\bar x^* = a + b\bar x$, so $x_i^* - \bar x^* = b(x_i - \bar x)$, and $y_i^* - \bar y^* = d(y_i - \bar y)$. Therefore $S_{x^*x^*} = b^2 S_{xx}$, $S_{y^*y^*} = d^2 S_{yy}$ and $S_{x^*y^*} = bd\, S_{xy}$. The correlation is

$$
r_{x^*y^*} = \frac{bd\, S_{xy}}{\sqrt{b^2 S_{xx}\cdot d^2 S_{yy}}} = \frac{bd}{\lvert b\rvert\,\lvert d\rvert}\, r_{xy}.
$$

If $b > 0$ and $d > 0$ this equals $r_{xy}$. If $b < 0$ and $d > 0$ the correlation changes sign: reversing the scale of $x$ reverses the association. Adding constants $a$ and $c$ never matters, which is why measuring wages in rupees or in thousands of rupees, or schooling in years or in months, does not change $r$.
:::
:::

::: exercise Selection on the dependent variable {level=3}
A population of four people has $(x, y) = (1, 2),\ (2, 3),\ (3, 5),\ (4, 8)$. The population slope from the OLS formula $\beta_1 = S_{xy}/S_{xx}$ (using population means, and dividing by $N$ rather than $N-1$, which cancels in the ratio) is the same as the four-point least-squares slope.

(a) Compute that slope.

(b) A survey interviews only people with $y \ge 5$, so the observed sample is the last two points. Compute the least-squares slope in the selected sample.

(c) In one sentence, say what selecting on $y$ has done to the slope.
::: hint
For two points the least-squares slope is just the rise over the run.
:::
::: solution
(a) $\bar x = 2.5$, $\bar y = 4.5$. Deviations of $x$: $-1.5,-0.5,0.5,1.5$; of $y$: $-2.5,-1.5,0.5,3.5$. Then $S_{xx} = 5$ and $S_{xy} = 3.75 + 0.75 + 0.25 + 5.25 = 10$, so the slope is $10/5 = 2$.

(b) The two selected points are $(3,5)$ and $(4,8)$. The slope is $(8-5)/(4-3) = 3$.

(c) Selecting on large $y$ has steepened the observed line: the low-$x$, low-$y$ people who would have flattened it are missing. Selecting on the *dependent* variable generally biases the slope; selecting on an exogenous $x$ does not.
:::
:::
