The t-test, the analysis of variance and simple regression look like three different tools, and the previous chapters treated them so. They are in fact one tool. Each models a response as a sum of effects plus normally distributed noise, and each is fitted by least squares. Seeing them as special cases of the **general linear model** pays off at once: it lets us include several explanatory variables at the same time, mix numerical and categorical ones, test interactions, and adjust a comparison for a confounding variable. Generalising one step further, to **generalised linear models** (GLMs), extends the same machinery to responses that are not normal at all — survival or death, presence or absence, counts of eggs, species or mutations.

This chapter introduces the linear model in matrix form and shows how t-tests and ANOVA fit inside it; treats **multiple regression**, **analysis of covariance** and **interactions**; sketches **mixed models** for data with grouping; develops **logistic regression** on Chester Bliss's classic insecticide data (1935) and **Poisson regression** on simulated species counts; and ends with **model selection**. The matrix algebra is in [Maths Atlas: regression](/learn/maths/lesson.php?c=statistics&l=regression) and [linear algebra](/learn/maths/course.php?c=linear-algebra). Modern software (R's `lm` and `glm`, Python's `statsmodels`) does the computation; the aim here is to understand what is being fitted and how to read the output.

## The general linear model {#general-linear-model}

::: definition The general linear model {#def-glm-normal}
A **linear model** for $n$ observations of a response $y$ with $p$ coefficients is
$$
y_i = \beta_0 + \beta_1x_{i1} + \beta_2x_{i2} + \dots + \beta_{p-1}x_{i,p-1} + \varepsilon_i, \qquad \varepsilon_i \sim \Normal(0, \sigma^2) \text{ independently},
$$
or in matrix form $\mathbf y = X\boldsymbol\beta + \boldsymbol\varepsilon$, where the **design matrix** $X$ ($n \times p$) has a first column of ones and one column for each explanatory variable. "Linear" means linear in the coefficients $\beta_j$: the columns of $X$ may be powers, logarithms or products of measured variables, or **indicator (dummy) variables** coding categories.
:::

::: proposition Least squares for the linear model {#prop-ls-matrix}
If $X$ has full column rank, the coefficients minimising $\lVert \mathbf y - X\mathbf b\rVert^2$ are
$$
\hat{\boldsymbol\beta} = (X\T X)^{-1}X\T\mathbf y,
$$ {#eq-normal-equations}
with covariance matrix $\sigma^2(X\T X)^{-1}$. The residual variance $s^2 = \mathrm{SS_{res}}/(n - p)$ estimates $\sigma^2$; each coefficient divided by its standard error follows $t_{n-p}$ under $H_0\colon\beta_j = 0$; and two **nested** models (one obtained from the other by setting $q$ coefficients to zero) are compared by
$$
F = \frac{(\mathrm{SS_{res,reduced}} - \mathrm{SS_{res,full}})/q}{\mathrm{SS_{res,full}}/(n - p)},
$$ {#eq-nested-f}
which follows $F_{q,\,n-p}$ when the reduced model is true.
:::

::: proof Derivation of the normal equations
$\lVert \mathbf y - X\mathbf b\rVert^2 = \mathbf y\T\mathbf y - 2\mathbf b\T X\T\mathbf y + \mathbf b\T X\T X\mathbf b$. Its gradient with respect to $\mathbf b$ is $-2X\T\mathbf y + 2X\T X\mathbf b$; setting it to zero gives $X\T X\mathbf b = X\T\mathbf y$, and full rank makes $X\T X$ invertible. The covariance follows from $\Var(A\mathbf y) = A\Var(\mathbf y)A\T$ with $A = (X\T X)^{-1}X\T$ and $\Var(\mathbf y) = \sigma^2 I$.
:::

**Categories as columns.** A factor with $k$ levels enters the model as $k - 1$ indicator columns. With **treatment coding** (the default in R), one level is the reference; each indicator is 1 for its level and 0 otherwise, so its coefficient is the difference between that level's mean and the reference mean. A two-sample t-test is then a regression on one indicator, $y = \beta_0 + \beta_1 g + \varepsilon$ with $g = 0$ or 1: $\hat\beta_0$ is the mean of group 0, $\hat\beta_1$ the difference in means, and its t-test is exactly Student's pooled test ([[biostatistics/comparing-groups#prop-student]]). One-way ANOVA is a regression on $k - 1$ indicators, and its F-test is [[#eq-nested-f]] comparing the model with the indicators to the model with the intercept alone. Everything in [[biostatistics/comparing-groups]] and [[biostatistics/regression]] is a linear model.

## Several explanatory variables {#multiple-regression}

In **multiple regression** each coefficient $\beta_j$ is a **partial** effect: the expected change in $y$ for a one-unit increase in $x_j$ *holding the other variables in the model constant*. It can be very different from the simple regression slope of $y$ on $x_j$ alone, and even of opposite sign, when the explanatory variables are correlated with each other.

That sensitivity is both the power and the danger of multiple regression. It lets us adjust for confounders — estimating the effect of one variable among units that are alike in others — and it means that coefficients change whenever variables are added or removed. When explanatory variables are strongly correlated (**collinearity**), their separate effects are hard to disentangle: standard errors become large and estimates unstable, even though the model as a whole may predict well. The **variance inflation factor** $\mathrm{VIF}_j = 1/(1 - R_j^2)$, where $R_j^2$ is from regressing $x_j$ on the other explanatory variables, says by how much collinearity inflates the variance of $\hat\beta_j$; values above about 5 to 10 signal trouble.

### Analysis of covariance

When one explanatory variable is categorical (a treatment or population) and another numerical (a covariate such as body size), the linear model is called **analysis of covariance** (ANCOVA). Its classic use is to compare groups after adjusting for a covariate that differs between them.

::: example Body mass of lizards from two populations {#ex-ancova}
Snout–vent length (SVL, mm) and body mass (g) of 12 lizards from each of two island populations are **simulated** (Python, `random.seed(21)`; SVL uniform on 52–72 mm in population A and 42–62 mm in B; mass $= -2 + 0.12\,\mathrm{SVL}$ in A and $0.8$ g more in B, plus normal noise with SD 0.45 g):

A: (55.3, 4.41), (65.8, 5.90), (64.7, 6.18), (61.6, 5.26), (56.3, 5.22), (67.9, 6.83), (68.2, 6.91), (62.2, 6.19), (62.1, 4.91), (56.7, 4.97), (52.1, 3.97), (59.4, 5.56)

B: (53.7, 5.29), (43.4, 4.12), (57.9, 5.97), (46.6, 4.15), (46.7, 4.46), (42.8, 3.63), (62.0, 7.18), (56.8, 5.43), (59.5, 5.96), (54.3, 4.55), (42.7, 3.29), (48.6, 4.28)

Do the populations differ in body mass (a) ignoring size, (b) at the same SVL? (c) Are the slopes the same?
::: solution
(a) Mean masses are 5.53 g (A) and 4.86 g (B); Welch's test gives $t = -1.59$, $\nu = 21.1$, $P = 0.13$. Population B looks, if anything, lighter.

(b) Fit $\text{mass} = \beta_0 + \beta_1\,\mathrm{SVL} + \beta_2\,g_B + \varepsilon$, where $g_B = 1$ for population B. Least squares gives
$$
\widehat{\text{mass}} = -3.97 + 0.156\,\mathrm{SVL} + 0.854\,g_B,
$$
with $\mathrm{SE}(\hat\beta_2) = 0.207$, $t = 4.12$ on 21 degrees of freedom, $P = 0.0005$, and a 95 % interval for the population difference of 0.42 to 1.28 g. At the same body length, lizards from B are about 0.85 g *heavier*. The raw comparison misled because B lizards are shorter on average (mean SVL 51.3 against 61.0 mm), and length is strongly related to mass: SVL was a confounder. The model explains $R^2 = 0.88$ of the variation in mass, against 0.10 for population alone.

(c) Adding the interaction term $\beta_3\,(\mathrm{SVL}\times g_B)$, which allows the slope to differ between populations, reduces $\mathrm{SS_{res}}$ only from 3.182 to 3.171; by [[#eq-nested-f]], $F_{1,20} = 0.065$, $P = 0.80$. There is no evidence that the slopes differ, so the parallel-lines model in (b) is adequate. (The simulated slope was 0.12; the estimate 0.156 ± 0.014 is somewhat high, a reminder that a single simulated sample varies.)
:::
:::

ANCOVA's adjustment is only as good as the model: it assumes the relation with the covariate is linear and (unless an interaction is included) parallel, and it compares groups at covariate values that may lie outside the range of one of them — here, few B lizards are as long as the average A lizard. And adjustment is no substitute for randomisation: it removes the confounding due to the covariate measured, not due to anything else that differs between the islands ([[biostatistics/experimental-design#experiments]]).

### Interactions in factorial experiments

An **interaction** between two factors means that the effect of one depends on the level of the other. In a linear model it is represented by product terms; in a two-way ANOVA it has its own sum of squares.

::: example Water and fertiliser {#ex-two-way}
A $2\times2$ factorial greenhouse experiment (hypothetical data) has four pots per combination of water (low, high) and fertiliser (none, added). The cell means of dry mass (g) are: low water 10 (no fertiliser) and 12 (fertiliser); high water 14 and 22. The residual mean square is 4.0 on 12 degrees of freedom. Construct the two-way ANOVA and interpret it.
::: solution
The grand mean is 14.5; the water means are 11 (low) and 18 (high); the fertiliser means are 12 (none) and 17 (added). With 8 pots per level of each factor:

- $\mathrm{SS_{water}} = 8[(11 - 14.5)^2 + (18 - 14.5)^2] = 196$;
- $\mathrm{SS_{fert}} = 8[(12 - 14.5)^2 + (17 - 14.5)^2] = 100$;
- the interaction effect in each cell is (cell mean − water mean − fertiliser mean + grand mean) $= \pm1.5$, so $\mathrm{SS_{interaction}} = 4\times4\times1.5^2 = 36$.

| source | SS | df | MS | $F$ | $P$ |
|---|---|---|---|---|---|
| water | 196 | 1 | 196 | 49.0 | $1.4\times10^{-5}$ |
| fertiliser | 100 | 1 | 100 | 25.0 | 0.0003 |
| water × fertiliser | 36 | 1 | 36 | 9.0 | 0.011 |
| residual | 48 | 12 | 4.0 | | |

The interaction is significant: fertiliser adds 2 g under low water but 8 g under high water. The "main effect" of fertiliser, 5 g, is an average over two quite different situations and on its own would mislead. When an interaction is present, interpret the effects of each factor at each level of the other — draw the interaction plot, with one line per level of water — rather than the main effects alone. A one-factor-at-a-time experiment run at low water would have concluded that fertiliser barely matters.
:::
:::

### Random effects and mixed models

When observations come in groups — fish in tanks, plants in plots, repeated measurements on individuals, samples processed in batches — the groups are often a random sample of possible groups, and the interest is in the variation they introduce rather than in each one. A **mixed model** includes them as **random effects**, for example
$$
y_{ij} = \beta_0 + \beta_1x_{ij} + u_j + \varepsilon_{ij}, \qquad u_j \sim \Normal(0, \sigma_u^2), \quad \varepsilon_{ij} \sim \Normal(0, \sigma^2),
$$
where $u_j$ is the effect of tank $j$. The model estimates the between-tank variance $\sigma_u^2$ and the within-tank variance $\sigma^2$ (their ratio gives the intraclass correlation of [[biostatistics/experimental-design#eq-design-effect]]), and tests treatments applied to tanks against the variation between tanks, with the correct degrees of freedom. Mixed models are the principled solution to pseudoreplication, to repeated measures and to unbalanced hierarchical data; they are fitted by restricted maximum likelihood (REML), for example with the R package `lme4` (Douglas Bates and colleagues, 2015). Their details belong to a second course.

## Generalised linear models {#glm}

Linear models assume a normal response with constant variance. Many biological responses violate this fundamentally: a proportion surviving lies between 0 and 1 and its variance is largest at 0.5; a count is a non-negative integer whose variance grows with its mean. Transforming the response (the arcsine or log of $y + 1$) was the old remedy. John Nelder and Robert Wedderburn (1972) unified a better one.

::: definition Generalised linear model {#def-glm}
A **generalised linear model** has three components:

1. a **random component**: the response $y_i$ has a distribution from the exponential family — normal, binomial, Poisson, gamma and others — with mean $\mu_i$;
2. a **linear predictor** $\eta_i = \beta_0 + \beta_1x_{i1} + \dots + \beta_{p-1}x_{i,p-1}$;
3. a **link function** $g$ connecting them: $g(\mu_i) = \eta_i$.

The coefficients are estimated by maximum likelihood, in practice by iteratively reweighted least squares. Model fit is measured by the **deviance**, $D = 2(\ell_\text{saturated} - \ell_\text{model})$, twice the gap in log-likelihood between a model that fits every observation exactly and the fitted model; nested models are compared by the drop in deviance, which is approximately $\chi^2_q$ for $q$ extra parameters (a **likelihood-ratio test**).
:::

The normal linear model is the GLM with a normal distribution and the identity link. The two most important others in biology are logistic and Poisson regression.

### Logistic regression

For a binary response — dead or alive, present or absent, infected or not — or a count of successes out of $m$ trials, the binomial distribution with the **logit link** gives
$$
\ln\frac{p}{1 - p} = \beta_0 + \beta_1x, \qquad\text{equivalently}\qquad p = \frac{1}{1 + e^{-(\beta_0 + \beta_1x)}}.
$$ {#eq-logistic}
The left side is the log-odds. The fitted probabilities trace an S-shaped curve between 0 and 1, and $e^{\beta_1}$ is the **odds ratio** for a one-unit increase in $x$ ([[biostatistics/categorical-data#def-or]]). For a dose–response curve, the dose killing half the population, the **LD₅₀** (median lethal dose), is where $\eta = 0$: $x_{50} = -\beta_0/\beta_1$.

::: example Bliss's beetle mortality data {#ex-bliss}
Chester Bliss (1935) exposed adult flour beetles (*Tribolium confusum*) to gaseous carbon disulfide for five hours at eight concentrations and counted the deaths:

| $\log_{10}$ dose (mg L⁻¹) | 1.6907 | 1.7242 | 1.7552 | 1.7842 | 1.8113 | 1.8369 | 1.8610 | 1.8839 |
|---|---|---|---|---|---|---|---|---|
| beetles | 59 | 60 | 62 | 56 | 63 | 59 | 62 | 60 |
| killed | 6 | 13 | 18 | 28 | 52 | 53 | 61 | 60 |

Fit a logistic regression of mortality on log dose, estimate the LD₅₀, and assess the fit.
::: solution
Maximum likelihood (iteratively reweighted least squares, computed for this lesson and agreeing with published analyses of these data, e.g. in Dobson's *An Introduction to Generalized Linear Models*) gives
$$
\operatorname{logit} \hat p = -60.72 + 34.27\,x,
$$
with standard errors 5.18 and 2.91. The slope's z-statistic is $34.27/2.91 = 11.8$, and the likelihood-ratio test against the intercept-only model is overwhelming (deviance falls from 284.2 to 11.23, a drop of 273.0 on 1 degree of freedom).

**Interpretation.** An increase of 0.01 in $\log_{10}$ dose (a 2.3 % increase in concentration) multiplies the odds of death by $e^{0.3427} = 1.41$. The LD₅₀ is at $\log_{10}$ dose $= 60.72/34.27 = 1.7717$, i.e. $10^{1.7717} = 59.1$ mg L⁻¹; a delta-method standard error of 0.0039 on the log scale gives a 95 % interval of 1.764 to 1.779, or 58.1 to 60.1 mg L⁻¹.

**Fit.** The residual deviance is 11.23 on $8 - 2 = 6$ degrees of freedom ($P = 0.08$). The fitted numbers killed are 3.5, 9.8, 22.5, 33.9, 50.1, 53.3, 59.2 and 58.7: too many deaths at low doses are observed compared with the fit, and too few in the middle — a hint that the logistic curve is slightly too symmetric. Bliss himself used the **probit** link (the inverse normal CDF); an asymmetric link such as the complementary log–log fits these data noticeably better. With few dose groups, judge the shape by plotting the observed proportions against the fitted curve.
:::
:::

::: widget plot
f: 1/(1 + exp(-(-60.717 + 34.270*x))); 0.5
x: 1.66, 1.91
y: 0, 1.05
points: 1.6907,0.1017; 1.7242,0.2167; 1.7552,0.2903; 1.7842,0.5; 1.8113,0.8254; 1.8369,0.8983; 1.8610,0.9839; 1.8839,1
vlines: 1.7717
labels: \text{fitted } \hat p; 0.5
caption: Bliss's beetle data: observed proportion killed at each $\log_{10}$ dose (points) and the fitted logistic curve $\hat p = 1/(1 + e^{-(-60.72 + 34.27x)})$. The vertical line marks the LD₅₀ at $\log_{10}$ dose 1.7717 (59.1 mg L⁻¹), where the curve crosses 0.5. Notice that the observed points at the two lowest doses lie above the curve and the middle point at 1.7842 lies below it — the pattern behind the moderately large residual deviance.
:::

::: warning "A logistic slope is a change in probability"
A logistic coefficient is a change in the *log-odds* per unit of $x$, and $e^{\beta}$ is an odds ratio. The change in *probability* per unit of $x$ is not constant: it is largest, $\beta p(1-p) = \beta/4$, at $p = 0.5$ and tiny near 0 or 1. For Bliss's beetles, an increase of 0.01 in log dose raises mortality by about 8.6 percentage points near the LD₅₀ but by less than 1 point near 2 % or 98 % mortality. Report odds ratios and, for interpretation, predicted probabilities at relevant values of $x$.
:::

### Poisson regression

For counts — eggs per clutch, species per island, parasites per host, mutations per gene, reads per transcript — the Poisson distribution with the **log link** gives
$$
\ln\mu = \beta_0 + \beta_1x, \qquad \mu = e^{\beta_0}e^{\beta_1x}.
$$ {#eq-poisson-reg}
Effects are multiplicative: each unit increase in $x$ multiplies the expected count by the **rate ratio** $e^{\beta_1}$. When counts are collected over different efforts (trap-nights, sequencing depths, areas), the logarithm of effort enters as an **offset**, a term with coefficient fixed at 1, so that the model describes rates.

::: example Species richness and island area {#ex-poisson}
Counts of land-bird species $S$ on 16 islands of varying area $A$ (km²) were **simulated** (Python, `random.seed(3)`; $\log_{10}A$ uniform on 0–4; $S$ Poisson with mean $\exp(1.2 + 0.55\log_{10}A)$). The pairs $(\log_{10}A, S)$ are:

(0.95, 8), (2.18, 13), (1.48, 9), (2.42, 19), (2.50, 13), (0.26, 3), (0.05, 0), (3.35, 25), (1.04, 4), (0.94, 5), (3.98, 26), (1.88, 11), (3.35, 20), (1.91, 14), (2.56, 13), (0.60, 6).

Fit a Poisson regression of $S$ on $\log_{10}A$, interpret the slope, and check for overdispersion.
::: solution
Maximum likelihood gives $\ln\hat\mu = 1.288 + 0.541\log_{10}A$, with standard errors 0.184 and 0.067; $z = 0.541/0.067 = 8.1$, and the deviance falls from 83.55 (intercept only) to 15.12 on 14 degrees of freedom, a drop of 68.4 on 1 degree of freedom.

**Interpretation.** Each tenfold increase in island area multiplies the expected number of species by $e^{0.541} = 1.72$ (95 % interval $e^{0.541 \pm 1.96\times0.067}$ = 1.51 to 1.96). Equivalently, $\mu = e^{1.288}A^{0.541/\ln10} = 3.63A^{0.235}$: the model is the classical **species–area power law** $S = cA^z$, with $z = 0.235$, close to the values of 0.2–0.35 typical of islands ([[ecology]]). An island of 100 km² is expected to hold $e^{1.288 + 2\times0.541} = 10.7$ species.

**Overdispersion.** A Poisson model assumes the variance equals the mean. The residual deviance (15.1) and the Pearson statistic (11.7) are both close to their 14 degrees of freedom, giving a dispersion estimate of $11.7/14 = 0.83$ — no evidence of overdispersion, as expected for data simulated from a Poisson distribution.
:::
:::

Real counts are often **overdispersed**: the variance exceeds the mean because of unmeasured heterogeneity or clustering (aggregated parasites, patchy habitats; compare [[biostatistics/probability-distributions#poisson]]). Ignoring overdispersion makes standard errors too small and P-values too optimistic — a statistical relative of pseudoreplication. A dispersion estimate (Pearson χ² / residual df) well above 1 signals the problem; remedies are the **quasi-Poisson** model, which inflates standard errors by the square root of the dispersion, or the **negative binomial** GLM, standard for RNA-sequencing counts (as in the DESeq2 and edgeR packages). Excess zeros may call for zero-inflated or hurdle models.

::: application GLMs across biology
Logistic regression models survival of nestlings against hatching date, presence of a species against habitat variables (species distribution models), the probability of germination against temperature, and, in genetics, case–control association at each variant in a genome-wide association study. Dose–response analysis with probit or logit links is standard in toxicology, pesticide testing and pharmacology (whose clinical use belongs to [Medicine Atlas: pharmacology](/learn/medicine/course.php?c=pharmacology)). Poisson and negative binomial regression model counts of offspring, of species, of mutations in fluctuation tests and of reads in sequencing experiments. Survival times are analysed with related models — the Cox proportional-hazards model of 1972 — treated in [Medicine Atlas: statistics for clinicians](/learn/medicine/lesson.php?c=epidemiology-ebm&l=statistics-for-clinicians).
:::

## Model selection {#model-selection}

With several candidate explanatory variables, interactions and curved terms, which model should we report? Two broad philosophies coexist.

**Hypothesis testing of nested models.** Compare a model with a simpler one by an F-test ([[#eq-nested-f]]) or a likelihood-ratio test, keeping a term only if the data demand it. This is appropriate when the models correspond to specific scientific hypotheses (is there an interaction? does the covariate matter?), specified in advance.

**Information criteria.** Compare any set of models fitted to the same data by a criterion that rewards fit and penalises complexity.

::: definition Akaike's information criterion {#def-aic}
For a model with maximised log-likelihood $\hat\ell$ and $k$ estimated parameters,
$$
\mathrm{AIC} = -2\hat\ell + 2k.
$$ {#eq-aic}
Among candidate models fitted to the same data, the one with the smallest AIC is estimated to make the best predictions for new data from the same process (Hirotugu Akaike, 1973). Differences $\Delta$AIC below about 2 indicate models with similar support. For small samples the corrected $\mathrm{AIC_c} = \mathrm{AIC} + 2k(k+1)/(n - k - 1)$ is preferred; the Bayesian information criterion $\mathrm{BIC} = -2\hat\ell + k\ln n$ penalises complexity more heavily.
:::

For the island data of [[#ex-poisson]], the intercept-only model has AIC 148.7 and the model with $\log_{10}A$ has AIC 82.3 — overwhelmingly better. Adding a quadratic term in $\log_{10}A$ lowers AIC further to 79.7 ($\Delta = 2.6$), and the likelihood-ratio test of the quadratic term gives $\chi^2_1 = 4.63$, $P = 0.031$. Yet the data were simulated from the linear model. With 16 points, a chance wiggle was enough to favour a more complex model; a biologist who reported "a significant curvilinear species–area relationship" would be reporting noise. Model selection is itself subject to sampling error, and its results should be treated as provisional.

::: warning "Stepwise selection finds the important variables"
Automated stepwise procedures that add or drop variables by P-value or AIC, one at a time, are widely used and widely criticised. The selected model depends on the order of steps and on small changes in the data; its coefficients are biased away from zero; its standard errors and P-values ignore the selection and are too small; and with many candidate variables it will reliably "discover" predictors that are pure noise (Mark Whittingham and colleagues, *Journal of Animal Ecology*, 2006). Prefer a small number of models chosen in advance from biological reasoning, report all of them, consider model averaging, and validate predictions on independent data.
:::

::: quiz
A logistic regression of nest predation (yes/no) on distance to forest edge (m) gives a slope of −0.02 per metre. What does this mean?
- [ ] Each extra metre from the edge reduces the probability of predation by 0.02.
- [x] Each extra metre from the edge multiplies the odds of predation by $e^{-0.02} = 0.98$; 100 m multiplies them by $e^{-2} = 0.14$.
- [ ] Predation is 2 % less likely per metre at every distance.
- [ ] The slope cannot be interpreted without a P-value.
::: solution
Logistic coefficients act on the log-odds. Per metre the odds fall by about 2 %; over 100 m they fall to 14 % of their former value. The change in probability depends on where on the curve one starts: largest near $p = 0.5$, small near 0 or 1.
:::
:::

::: history
Least squares for many unknowns goes back to Adrien-Marie Legendre (1805) and Carl Friedrich Gauss (1809), and George Udny Yule developed multiple regression and partial correlation for social and biological data in the 1890s and 1900s. Ronald Fisher's analysis of variance and covariance (1920s–1930s) was recognised as a form of regression on indicator variables, a view systematised in the 1960s. Chester Bliss introduced probit analysis of dose–mortality data in 1934–1935, and Joseph Berkson advocated the logit in 1944. John Nelder and Robert Wedderburn unified normal, binomial, Poisson and other models as generalised linear models in 1972, and Peter McCullagh and Nelder's *Generalized Linear Models* (1983, 2nd ed. 1989) became the standard text. Hirotugu Akaike proposed his information criterion in 1973, and Nan Laird and James Ware's 1982 paper made random-effects models practical for repeated measures. Kenneth Burnham and David Anderson's *Model Selection and Multimodel Inference* (2nd ed., 2002) popularised information-theoretic methods among ecologists.
:::

::: summary
- The general linear model $\mathbf y = X\boldsymbol\beta + \boldsymbol\varepsilon$ contains t-tests, ANOVA and regression; $\hat{\boldsymbol\beta} = (X\T X)^{-1}X\T\mathbf y$; nested models are compared by F-tests.
- Factors enter as indicator variables; coefficients are differences from a reference level.
- Multiple-regression coefficients are partial effects; collinearity inflates their variances (VIF).
- ANCOVA compares groups at equal covariate values: simulated lizards differ by 0.85 g at equal SVL although raw means suggest the opposite.
- Interactions mean the effect of one factor depends on another; interpret simple effects when they are present.
- Mixed models with random effects handle grouped data and pseudoreplication.
- GLMs: distribution + linear predictor + link, fitted by maximum likelihood; deviance replaces sums of squares.
- Logistic regression (logit link): $e^\beta$ is an odds ratio; Bliss's beetles, LD₅₀ = 59.1 mg L⁻¹. Poisson regression (log link): $e^\beta$ is a rate ratio; check overdispersion.
- Choose among few, biologically motivated models; AIC $= -2\hat\ell + 2k$; distrust stepwise selection.
:::

## Exercises

::: exercise A logit {level=1 check="ln(4)"}
What is the log-odds (natural logarithm) corresponding to a probability of 0.8?
::: solution
$\ln(0.8/0.2) = \ln 4 = 1.386$.
:::
:::

::: exercise A rate ratio {level=1 check="1.72"}
In the island model of [[#ex-poisson]], the slope on $\log_{10}A$ is 0.5409. By what factor does the expected number of species change for a tenfold increase in area? Give three significant figures.
::: solution
$e^{0.5409} = 1.72$.
:::
:::

::: exercise Counting parameters {level=1 check="12"}
How many coefficients (including the intercept) does a two-way ANOVA model with interaction have for a factor with 3 levels crossed with a factor with 4 levels?
::: solution
Intercept 1, first factor $3 - 1 = 2$, second factor $4 - 1 = 3$, interaction $2\times3 = 6$: total 12, one per cell mean.
:::
:::

::: exercise A predicted probability {level=2 check="0.725"}
Using Bliss's fitted model $\operatorname{logit}\hat p = -60.717 + 34.270x$, what proportion of beetles is expected to die at $\log_{10}$ dose $x = 1.80$? Give three decimal places.
::: solution
$\eta = -60.717 + 34.270\times1.80 = 0.969$; $\hat p = 1/(1 + e^{-0.969}) = 0.725$.
:::
:::

::: exercise Comparing AIC {level=2 check="86"}
A model with 3 parameters has maximised log-likelihood −40.0; a model with 5 parameters fitted to the same data has −38.5. Calculate the AIC of the first model, and decide which is preferred.
::: solution
AIC₁ $= 80 + 6 = 86$; AIC₂ $= 77 + 10 = 87$. The simpler model has the lower AIC, by 1 — the two have similar support, and the extra two parameters are not justified by an improvement of 1.5 in log-likelihood.
:::
:::

::: exercise A t-test as regression {level=2}
Two groups of three plants have heights 4, 5, 6 (group 0) and 7, 8, 9 (group 1). Write the design matrix for $y = \beta_0 + \beta_1g + \varepsilon$, compute $\hat\beta_0$, $\hat\beta_1$ and the residual variance, and show that the t statistic for $\beta_1$ equals Student's pooled t.
::: answer
$\hat\beta_0 = 5$, $\hat\beta_1 = 3$, $s^2 = 1$, $t = 3.67$.
:::
::: solution
$X$ has rows $(1, 0)$ three times and $(1, 1)$ three times. The normal equations give $\hat\beta_0 = \bar y_0 = 5$ and $\hat\beta_1 = \bar y_1 - \bar y_0 = 3$. Residuals are $-1, 0, 1, -1, 0, 1$, so $\mathrm{SS_{res}} = 4$ and $s^2 = 4/(6 - 2) = 1$. $(X\T X)^{-1}$ has $(2,2)$ element $1/3 + 1/3 = 2/3$, so $\mathrm{SE}(\hat\beta_1) = \sqrt{2/3} = 0.816$ and $t = 3/0.816 = 3.67$ on 4 df. Student's test: $s_p^2 = (2\times1 + 2\times1)/4 = 1$, $\mathrm{SE} = \sqrt{1\times(1/3 + 1/3)} = 0.816$, $t = 3.67$ — identical.
:::
:::

::: exercise Overdispersed counts {level=3}
A Poisson regression of the number of ticks on 60 voles against vole body mass gives a residual deviance of 174 on 58 degrees of freedom and a Pearson χ² of 180. (a) Estimate the dispersion. (b) If the reported standard error of the mass coefficient is 0.010 and the coefficient is 0.025, what are the z-statistic under the Poisson model and the corrected statistic under a quasi-Poisson model? (c) Give two biological reasons why tick counts might be overdispersed, and a better model.
::: solution
(a) $180/58 = 3.10$: the variance is about three times what the Poisson model assumes.
(b) Poisson: $z = 0.025/0.010 = 2.5$ ($P = 0.012$). Quasi-Poisson: the standard error is multiplied by $\sqrt{3.10} = 1.76$, to 0.0176, giving $t = 1.42$ on 58 df ($P \approx 0.16$). The apparent effect of mass was largely an artefact of underestimated variance.
(c) Ticks are aggregated: voles differ in behaviour, home range, immunity and microhabitat, unmeasured variables that make some voles heavily infested; and ticks attach in clusters (larvae hatching from one egg mass). A negative binomial GLM, which models the extra variance explicitly, or a mixed model with a random effect per vole or per trapping site, is more appropriate.
:::
:::

::: exercise Interpreting an interaction {level=3}
In a study of the effect of a pesticide on bee foraging, a two-way ANOVA of flowers visited per hour against pesticide (absent, present) and temperature (cool, warm) gives a significant interaction. The cell means are: cool, no pesticide 30; cool, pesticide 28; warm, no pesticide 50; warm, pesticide 32. (a) Calculate the effect of the pesticide at each temperature and the interaction contrast. (b) A press release says "the pesticide reduced foraging by 20 % on average". Is this a fair summary? (c) Suggest a biological explanation and a follow-up experiment.
::: solution
(a) Pesticide effect: −2 visits h⁻¹ when cool and −18 when warm. The interaction contrast, the difference between these effects, is $-18 - (-2) = -16$.
(b) The average effect is $-10$ visits per hour against an average untreated rate of 40, i.e. 25 % — but averaging hides the main finding: almost no effect in cool conditions and a 36 % reduction in warm conditions. The summary should report the conditional effects.
(c) Warm conditions might increase foraging activity, flight metabolism or pesticide uptake, so that a sublethal neurotoxic effect becomes limiting only when bees are most active. A follow-up could test several temperatures (to model the dependence as a curve), measure pesticide residues and bee body temperature, and use colonies (not individual bees) as the experimental units, randomly assigned to treatments within temperature blocks.
:::
:::
