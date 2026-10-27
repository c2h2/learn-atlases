Most biological experiments end in a comparison: treated against control, mutant against wild type, one habitat against another, three diets, five genotypes. The question is always the same — are the differences between the groups larger than the differences within them? — and this chapter develops the main tools for answering it. We start with two independent groups and **Student's** and **Welch's t-tests**, move to several groups and the **analysis of variance** (ANOVA), deal with the follow-up question of *which* groups differ (post-hoc tests and planned contrasts), and finish with the **rank-based** tests that drop the assumption of normality.

The running example is the most famous data set in statistics. In 1936 Ronald Fisher used Edgar Anderson's measurements of 50 flowers from each of three species of *Iris* — *I. setosa*, *I. versicolor* and *I. virginica*, collected on the Gaspé Peninsula of Quebec — to introduce discriminant analysis. Here we use one of the four measurements, sepal length:

| species | $n$ | mean (cm) | standard deviation (cm) |
|---|---|---|---|
| *I. setosa* | 50 | 5.006 | 0.3525 |
| *I. versicolor* | 50 | 5.936 | 0.5162 |
| *I. virginica* | 50 | 6.588 | 0.6359 |

The one-sample and paired t-tests were introduced in [[biostatistics/hypothesis-testing]]; the theory of the two-sample test is in [Maths Atlas: hypothesis testing](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing).

## Two independent groups {#two-groups}

Paired data, like Darwin's maize, are compared through their differences. When the two groups are **independent** — different individuals with no natural pairing — we compare their means directly. If the groups have means $\bar x_1$, $\bar x_2$, standard deviations $s_1$, $s_2$ and sizes $n_1$, $n_2$, the difference $\bar x_1 - \bar x_2$ estimates $\mu_1 - \mu_2$, and because the two means are independent their variances add:
$$
\Var(\bar X_1 - \bar X_2) = \frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}.
$$
The two t-tests differ in how they estimate this.

::: proposition Student's two-sample t-test {#prop-student}
If both populations are normal with the **same** variance $\sigma^2$, estimate it by the **pooled variance**
$$
s_p^2 = \frac{(n_1 - 1)s_1^2 + (n_2 - 1)s_2^2}{n_1 + n_2 - 2},
$$
and use
$$
t = \frac{\bar x_1 - \bar x_2}{s_p\sqrt{\dfrac{1}{n_1} + \dfrac{1}{n_2}}},
$$ {#eq-student}
which follows $t_{n_1 + n_2 - 2}$ under $H_0\colon\mu_1 = \mu_2$.
:::

::: proposition Welch's t-test {#prop-welch}
Without assuming equal variances, use
$$
t = \frac{\bar x_1 - \bar x_2}{\sqrt{\dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2}}},
$$ {#eq-welch}
which under $H_0$ approximately follows a t distribution with the **Welch–Satterthwaite** degrees of freedom
$$
\nu = \frac{\left(s_1^2/n_1 + s_2^2/n_2\right)^2}{\dfrac{(s_1^2/n_1)^2}{n_1 - 1} + \dfrac{(s_2^2/n_2)^2}{n_2 - 1}},
$$ {#eq-welch-df}
generally not a whole number. A $1 - \alpha$ confidence interval for $\mu_1 - \mu_2$ is $(\bar x_1 - \bar x_2) \pm t_{1-\alpha/2,\,\nu}\sqrt{s_1^2/n_1 + s_2^2/n_2}$.
:::

Welch's degrees of freedom lie between $\min(n_1, n_2) - 1$ and $n_1 + n_2 - 2$, reaching the upper value when the two variance terms are equal. When sample sizes are equal the two t statistics are identical, and only the degrees of freedom differ. When sizes *and* variances differ, Student's test can be badly wrong: if the smaller sample comes from the more variable population, its type I error rate can be several times the nominal $\alpha$. Welch's test (Bernard Welch, 1947) loses almost nothing when variances are equal, so many statisticians, and Graeme Ruxton in a widely cited note in *Behavioral Ecology* (2006), recommend it as the default. Testing for equal variances first and then choosing a test is not recommended: the preliminary test is unreliable and the two-stage procedure has poorly controlled error rates.

::: example Versicolor against virginica {#ex-iris-t}
Do *I. versicolor* and *I. virginica* differ in mean sepal length? Carry out Student's and Welch's tests and give the 95 % confidence interval for the difference.
::: solution
The difference is $6.588 - 5.936 = 0.652$ cm.

**Student.** $s_p^2 = (49\times0.5162^2 + 49\times0.6359^2)/98 = (0.2664 + 0.4043)/2 = 0.3354$, so $s_p = 0.5791$ and the standard error is $0.5791\sqrt{2/50} = 0.1158$. Then $t = 0.652/0.1158 = 5.63$ on 98 degrees of freedom, $P = 1.7\times10^{-7}$.

**Welch.** The standard error is $\sqrt{0.5162^2/50 + 0.6359^2/50} = 0.1158$ — identical, because $n_1 = n_2$ — so $t = 5.63$ again, but now with $\nu = 94.0$ from [[#eq-welch-df]], giving $P = 1.9\times10^{-7}$.

The 95 % interval (Welch) is $0.652 \pm 1.986\times0.1158$, i.e. **0.42 to 0.88 cm**. *Virginica* sepals are on average about half a centimetre longer, and the difference is estimated to within about ±0.23 cm. With 50 flowers per species, even this modest difference (about one within-species standard deviation) is detected decisively.
:::
:::

How much do two groups with a "significant" difference actually overlap? If two normal populations with the same standard deviation differ by $d$ standard deviations, the probability that a randomly chosen individual from the higher one exceeds a random individual from the lower one is $\Phi(d/\sqrt2)$: 0.64 for $d = 0.5$, 0.76 for $d = 1$, 0.92 for $d = 2$.

::: widget plot
f: exp(-x^2/2)/sqrt(2*pi); exp(-(x-d)^2/2)/sqrt(2*pi)
x: -4, 7
y: 0, 0.45
sliders: d=1:0:4:0.05
labels: \text{group 1}; \text{group 2}
caption: Two normal populations with equal standard deviation (1) whose means differ by $d$ standard deviations, the standardised effect size. At $d = 1$, about the difference between *I. versicolor* and *I. virginica* in sepal length, the curves overlap heavily: a random *virginica* flower is longer than a random *versicolor* one only about 76 % of the time ($\Phi(d/\sqrt2)$). Drag $d$ to 2.1, the separation of *setosa* and *versicolor*, and the overlap becomes small. A test can detect a difference with great confidence even when the populations overlap this much; significance says nothing about separation of individuals.
:::

::: warning "Use the two-sample test because there are two columns of numbers"
The design, not the layout of the spreadsheet, decides the test. Measurements before and after treatment on the same animals, left and right sides of the same leaf, or treated and control plants sharing a pot are *paired*, and must be analysed through their differences ([[biostatistics/hypothesis-testing#prop-t-test]]) or with a model that includes the pairing. Conversely, two unrelated groups of equal size are not paired merely because they can be written side by side. Analysing paired data as independent usually throws away precision; analysing independent data as paired is simply wrong.
:::

## Several groups: the analysis of variance {#anova}

With three species there are three pairwise comparisons, and with ten groups there are 45. Testing each pair at $\alpha = 0.05$ inflates the chance of a false positive ([[biostatistics/hypothesis-testing#multiple-testing]]). The **analysis of variance** asks a single question first: is there any difference among the group means at all?

::: definition One-way ANOVA model and sums of squares {#def-anova}
Suppose there are $k$ groups, group $j$ having $n_j$ observations $x_{ij}$ with mean $\bar x_j$, and $N = \sum n_j$ observations in all with grand mean $\bar x$. The **one-way ANOVA model** is
$$
x_{ij} = \mu_j + \varepsilon_{ij}, \qquad \varepsilon_{ij} \sim \Normal(0, \sigma^2) \text{ independently},
$$
with the null hypothesis $H_0\colon \mu_1 = \mu_2 = \dots = \mu_k$. Define the **total**, **between-group** and **within-group** (error, residual) sums of squares
$$
\mathrm{SS_T} = \sum_{j}\sum_{i}(x_{ij} - \bar x)^2, \quad \mathrm{SS_B} = \sum_j n_j(\bar x_j - \bar x)^2, \quad \mathrm{SS_W} = \sum_j\sum_i (x_{ij} - \bar x_j)^2 = \sum_j (n_j - 1)s_j^2,
$$
with $N - 1$, $k - 1$ and $N - k$ degrees of freedom. The **mean squares** are $\mathrm{MS_B} = \mathrm{SS_B}/(k-1)$ and $\mathrm{MS_W} = \mathrm{SS_W}/(N-k)$.
:::

::: proposition The ANOVA identity and the F-test {#prop-anova}
The sums of squares partition exactly: $\mathrm{SS_T} = \mathrm{SS_B} + \mathrm{SS_W}$, and so do their degrees of freedom. Under the model, $\mathrm{MS_W}$ is an unbiased estimate of $\sigma^2$ whether or not $H_0$ is true, while $\E[\mathrm{MS_B}] = \sigma^2 + \sum_j n_j(\mu_j - \bar\mu)^2/(k-1)$, where $\bar\mu$ is the weighted mean of the $\mu_j$. Under $H_0$ the ratio
$$
F = \frac{\mathrm{MS_B}}{\mathrm{MS_W}}
$$ {#eq-anova-f}
follows the **F distribution** with $k - 1$ and $N - k$ degrees of freedom, and $H_0$ is rejected for large $F$.
:::

::: proof The partition of sums of squares
Write $x_{ij} - \bar x = (x_{ij} - \bar x_j) + (\bar x_j - \bar x)$ and square:
$$
\sum_j\sum_i (x_{ij} - \bar x)^2 = \sum_j\sum_i (x_{ij} - \bar x_j)^2 + \sum_j n_j(\bar x_j - \bar x)^2 + 2\sum_j(\bar x_j - \bar x)\sum_i (x_{ij} - \bar x_j).
$$
The inner sum in the last term is zero for every group, because deviations from a group's own mean sum to zero ([[biostatistics/data-and-variation#prop-mean-median]]). The distributional statements, which rest on Cochran's theorem for quadratic forms in normal variables, are proved in [Maths Atlas: regression](/learn/maths/lesson.php?c=statistics&l=regression).
:::

The logic is that of the name: we analyse the *variance* to learn about the *means*. Variation within groups measures the noise. Variation between group means contains the same noise (scaled by the group sizes) plus any real differences. If the null hypothesis is true the two mean squares estimate the same thing and $F$ is near 1; real differences inflate the numerator.

::: example ANOVA of iris sepal length {#ex-iris-anova}
Do the three *Iris* species differ in mean sepal length? Construct the ANOVA table from the summary statistics.
::: solution
The grand mean is $(5.006 + 5.936 + 6.588)/3 = 5.8433$ (equal $n$). Then
$$
\mathrm{SS_B} = 50\left[(5.006 - 5.8433)^2 + (5.936 - 5.8433)^2 + (6.588 - 5.8433)^2\right] = 50(0.70112 + 0.00860 + 0.55452) = 63.21,
$$
$$
\mathrm{SS_W} = 49(0.3525^2 + 0.5162^2 + 0.6359^2) = 49(0.12425 + 0.26643 + 0.40434) = 38.96.
$$

| source | SS | df | MS | $F$ | $P$ |
|---|---|---|---|---|---|
| species | 63.21 | 2 | 31.606 | 119.3 | $1.7\times10^{-31}$ |
| residual | 38.96 | 147 | 0.2650 | | |
| total | 102.17 | 149 | | | |

The 5 % critical value of $F_{2,147}$ is 3.06, so the species differ overwhelmingly. The fraction of the total variation explained by species, $\mathrm{SS_B}/\mathrm{SS_T} = 63.21/102.17 = 0.62$, is the $R^2$ of the model (also called $\eta^2$): 62 % of the variation in sepal length among these 150 flowers is between species, 38 % within them. (These values agree with standard analyses of the full data set, in which $F = 119.26$.)
:::
:::

::: widget distribution
dist: f
params: d1=2, d2=12
a: 3.885
b: 20
caption: The F distribution with $d_1 = 2$ and $d_2 = 12$ degrees of freedom: the null distribution of the ANOVA F statistic for three groups of five observations. The shaded area beyond $F = 3.885$ is 0.05, so 3.885 is the 5 % critical value. Under the null hypothesis F is usually near 1 (its mean is $d_2/(d_2 - 2) = 1.2$) and only rarely large. Increase $d_2$ to 60 and the critical value falls towards 3.15: more replicates make the error variance better estimated, so smaller ratios become convincing.
:::

### Assumptions and robustness

The F-test assumes independent observations, normal residuals and equal variances in all groups (**homoscedasticity**). Independence is the critical one and cannot be repaired by any test; it is a matter of design ([[biostatistics/experimental-design]]). Normality matters little for moderate group sizes, by the central limit theorem. Unequal variances matter most when group sizes are also unequal; a useful rule of thumb is to worry when the largest group standard deviation exceeds about twice the smallest. Check the assumptions by plotting the residuals $x_{ij} - \bar x_j$: a box plot per group, and a Q–Q plot ([[biostatistics/probability-distributions#normal]]). If spread increases with the mean, a log transformation often fixes both problems ([[biostatistics/data-and-variation#transformations]]); otherwise **Welch's ANOVA**, the generalisation of [[#prop-welch]], does not assume equal variances. In the iris data the standard deviations range from 0.35 to 0.64, a ratio of 1.8, with equal $n$ — acceptable.

## Which groups differ? {#post-hoc}

A significant F says that the means are not all equal; it does not say which differ. Two strategies exist, and the choice between them should be made before the data are seen.

**Planned comparisons (contrasts).** If the design was built to answer specific questions — each treatment against the control, or the average of two related species against a third — test those comparisons directly. A **contrast** is a combination $L = \sum c_j\mu_j$ with $\sum c_j = 0$, estimated by $\hat L = \sum c_j\bar x_j$ with standard error $\sqrt{\mathrm{MS_W}\sum c_j^2/n_j}$ and tested with $t$ on $N - k$ degrees of freedom. A small number of planned contrasts needs at most a mild correction for multiplicity (for instance Holm's, [[biostatistics/hypothesis-testing#prop-multiple]]).

**Post-hoc comparisons.** If the question is open — which of these groups differ from which? — all pairs are compared, and the procedure must control the family-wise error rate over all of them.

::: proposition Tukey's honestly significant difference {#prop-tukey}
For $k$ groups of equal size $n$ with residual mean square $\mathrm{MS_W}$ on $\nu = N - k$ degrees of freedom, the simultaneous $1 - \alpha$ confidence intervals for all pairwise differences are
$$
(\bar x_i - \bar x_j) \pm q_{1-\alpha;\,k,\,\nu}\sqrt{\frac{\mathrm{MS_W}}{n}},
$$ {#eq-tukey}
where $q_{1-\alpha;\,k,\,\nu}$ is the upper $\alpha$ point of the **studentised range distribution** — the distribution of (largest mean − smallest mean)/(standard error) among $k$ means when all population means are equal. Two means differ significantly if their difference exceeds the **honestly significant difference** $\mathrm{HSD} = q\sqrt{\mathrm{MS_W}/n}$. The family-wise error rate is exactly $\alpha$ for equal $n$; for unequal $n$ the Tukey–Kramer version replaces $\sqrt{\mathrm{MS_W}/n}$ by $\sqrt{\mathrm{MS_W}(1/n_i + 1/n_j)/2}$ and is slightly conservative.
:::

The logic of using the range: if all $k$ means are equal, every pairwise difference is no larger than the largest minus the smallest, so bounding the range bounds every pair at once.

::: example Tukey's test for the three iris species {#ex-tukey}
Using $\mathrm{MS_W} = 0.2650$ from [[#ex-iris-anova]], carry out Tukey's procedure for the three pairwise differences.
::: solution
For $k = 3$ and $\nu = 147$, $q_{0.95;\,3,\,147} = 3.348$ (computed by numerical integration of the studentised range distribution; tables give 3.36 for $\nu = 120$ and 3.31 for $\nu = \infty$). The standard error is $\sqrt{0.2650/50} = 0.07280$, so $\mathrm{HSD} = 3.348\times0.07280 = 0.244$ cm.

| comparison | difference (cm) | 95 % simultaneous interval |
|---|---|---|
| *versicolor* − *setosa* | 0.930 | 0.686 to 1.174 |
| *virginica* − *setosa* | 1.582 | 1.338 to 1.826 |
| *virginica* − *versicolor* | 0.652 | 0.408 to 0.896 |

All three differences exceed 0.244, so every pair of species differs. The interval for *virginica* − *versicolor* is slightly wider than the single-comparison Welch interval of [[#ex-iris-t]] (0.42 to 0.88): that width is the price of covering all three comparisons simultaneously at 95 %.
:::
:::

Other post-hoc procedures exist for other purposes: **Dunnett's test** compares each treatment with a single control and is more powerful than Tukey's for that purpose; Holm-corrected pairwise t-tests are a general-purpose alternative; Fisher's "least significant difference" (unadjusted t-tests after a significant F) controls the error rate properly only for three groups. Avoid procedures whose error rates are poorly defined, and never choose among them after seeing which gives the most significant results.

::: quiz
A study compares five fertiliser treatments with ten pots each, finds $F_{4,45} = 1.8$, $P = 0.15$, and then reports that "treatment C differed significantly from treatment A (t-test, $P = 0.03$)". What is wrong?
- [ ] Nothing: the t-test is more sensitive than ANOVA.
- [x] Picking the most extreme of ten possible pairs after seeing the data and testing it without correction inflates the false-positive rate well above 5 %.
- [ ] The t-test should have used 45 degrees of freedom, which would make it significant.
- [ ] ANOVA cannot be used with five groups.
::: solution
With five groups there are ten pairs; the largest difference among ten is likely to give a small unadjusted P-value even when all means are equal. The overall F-test found no evidence of differences, and a post-hoc comparison chosen because it looks largest must be judged against the distribution of the *largest* difference — which is what Tukey's procedure does. Reporting only the selected comparison is the garden of forking paths ([[biostatistics/hypothesis-testing#asa]]).
:::
:::

Many experiments have more than one factor — diet *and* temperature, genotype *and* sex. **Factorial ANOVA** partitions the variation into main effects of each factor and their **interaction** (whether the effect of one factor depends on the level of the other), and blocking factors and repeated measures add further terms. These are all special cases of the linear model of [[biostatistics/linear-models]], and the designs that produce them are in [[biostatistics/experimental-design]].

## Rank-based (non-parametric) tests {#nonparametric}

When samples are small and the data clearly skewed, or contain outliers that cannot be dismissed, or are ordinal scores, tests based on **ranks** avoid the normality assumption. Replace each observation by its rank in the combined data (average ranks for ties) and compute the test on the ranks. An extreme value then counts only as "the largest", however large it is.

::: definition Wilcoxon signed-rank and Mann–Whitney tests {#def-rank-tests}
**Wilcoxon signed-rank test** (Frank Wilcoxon, 1945), for paired data or one sample: rank the absolute differences $\lvert d_i\rvert$ from 1 to $n$ (dropping zeros), and let $W_+$ and $W_-$ be the sums of the ranks of the positive and negative differences ($W_+ + W_- = n(n+1)/2$). Under $H_0$ (differences symmetric about zero) each rank is equally likely to carry either sign, so $W_-$ has mean $n(n+1)/4$ and variance $n(n+1)(2n+1)/24$.

**Mann–Whitney U test** (Henry Mann and Donald Whitney, 1947; equivalent to Wilcoxon's rank-sum test), for two independent samples of sizes $n_1$ and $n_2$: rank all $n_1 + n_2$ observations together, let $R_1$ be the sum of the ranks in sample 1, and compute $U_1 = R_1 - n_1(n_1 + 1)/2$, which counts the pairs (one from each sample) in which the sample-1 value is larger. Under $H_0$ (both samples from the same distribution) all $\binom{n_1+n_2}{n_1}$ allocations of the ranks are equally likely, $U_1$ has mean $n_1n_2/2$, and exact P-values come from enumerating them.
:::

::: example The signed-rank test on Darwin's maize {#ex-wilcoxon}
Apply the Wilcoxon signed-rank test to Darwin's fifteen differences.
::: solution
Ordered by absolute value, the differences are 6, 8, 14, 16, 23, 24, 28, 29, 41, **−48**, 49, 56, 60, **−67**, 75, with ranks 1 to 15. The negative differences have ranks 10 and 14, so $W_- = 24$ and $W_+ = 120 - 24 = 96$.

Under $H_0$, each of the $2^{15}$ sign patterns is equally likely; enumerating them, 676 give $W_- \le 24$, so the two-sided P-value is $2\times676/32\,768 = 0.041$. The normal approximation, with mean $15\times16/4 = 60$ and standard deviation $\sqrt{15\times16\times31/24} = 17.61$, gives $z = (24 - 60)/17.61 = -2.04$ and $P = 0.041$ as well. Compared with the t-test ($P = 0.050$) and Fisher's randomisation test on the raw differences ($P = 0.053$), the rank test gives slightly stronger evidence, because the two large negative differences count only by their ranks.
:::
:::

::: example Ants finding bait, with an outlier {#ex-mann-whitney}
The times (s) for ants to discover a bait were recorded at 6 forest and 7 grassland stations (hypothetical data): forest 12, 19, 25, 31, 44, 210; grassland 48, 55, 63, 70, 92, 130, 185. Compare the habitats with Welch's t-test and the Mann–Whitney test.
::: solution
**Welch.** Means 56.8 and 91.9 s, standard deviations 75.8 and 49.5 s; $t = 0.97$, $\nu = 8.4$, $P = 0.36$. The single slow forest station (210 s) inflates the forest mean and, even more, its standard deviation.

**Mann–Whitney.** Ranking all 13 times, the forest stations have ranks 1, 2, 3, 4, 5 and 13, so $R_1 = 28$ and $U_1 = 28 - 21 = 7$: only 7 of the $6\times7 = 42$ forest–grassland pairs have the forest time longer. Of the $\binom{13}{6} = 1716$ equally likely allocations of ranks, 44 give $U_1 \le 7$, so the two-sided exact P-value is $2\times44/1716 = 0.051$.

The rank test gives much stronger evidence (though still borderline at 0.05) that forest ants find bait faster, because five of the six forest stations were faster than every grassland station. A Welch test on log-transformed times gives $P = 0.089$, in between. With data like these the analysis should be chosen in advance on grounds of the expected distribution — times to an event are usually right-skewed — not by trying all three and reporting the smallest $P$.
:::
:::

The rank-based analogue of one-way ANOVA is the **Kruskal–Wallis test** (William Kruskal and Allen Wallis, 1952): with $N$ observations in $k$ groups and rank sums $R_j$,
$$
H = \frac{12}{N(N+1)}\sum_j\frac{R_j^2}{n_j} - 3(N+1),
$$ {#eq-kruskal}
which is approximately $\chi^2_{k-1}$ under $H_0$ for moderate group sizes. The **Friedman test** does the same for randomised blocks.

::: warning "Non-parametric tests compare medians and make no assumptions"
Rank tests make fewer assumptions, not none. They still require independent observations. The Mann–Whitney test detects whether values in one group tend to be larger than in the other ($\Prob(X > Y) \ne \tfrac12$); it is a test of medians only if the two distributions have the same shape and differ by a shift, and it can reject when two groups have equal medians but different spreads or skews. The signed-rank test assumes differences symmetric about their centre. And rank tests give P-values more readily than effect sizes; report an estimate as well, such as the Hodges–Lehmann shift or simply the medians and their confidence intervals.
:::

How much power do rank tests lose? Surprisingly little. When the data really are normal, the Mann–Whitney and signed-rank tests have an asymptotic relative efficiency of $3/\pi = 0.955$ compared with the t-test — they need about 5 % more observations for the same power — and for heavy-tailed distributions they can be far more powerful. Their weakness is with very small samples, where the number of possible rank arrangements is small: with three observations per group, the smallest possible two-sided exact P-value of the Mann–Whitney test is $2/\binom63 = 0.10$, so it can *never* be significant at 0.05. A **permutation test** on the raw values, like Fisher's for Darwin's data ([[biostatistics/hypothesis-testing#ex-fisher-perm]]), is another assumption-light option that keeps the original scale.

::: application Choosing a test in practice
A common workflow in laboratory biology — test each group for normality, then pick a t-test or a rank test — is not recommended: normality tests have little power in small samples, where the choice matters, and the two-stage procedure has unknown error rates. Better practice is to decide the analysis before the data are collected, from knowledge of the measurement (counts, times and concentrations are usually skewed; lengths are usually close to normal), to plot the data, to prefer Welch's test to Student's, to log-transform multiplicative data, and to use rank or permutation tests when the sample is small and the shape unknown. For counts and proportions, models of [[biostatistics/categorical-data]] and [[biostatistics/linear-models]] respect the nature of the data better than either.
:::

::: history
Student's 1908 paper gave the one-sample test; Fisher derived the two-sample test with pooled variance in the 1920s, and Bernard Welch's unequal-variance solution appeared in 1947 (with Franklin Satterthwaite's degrees-of-freedom approximation of 1946). Fisher invented the analysis of variance at Rothamsted to analyse agricultural field trials; it appears in a 1923 paper with Winifred Mackenzie on potato varieties and manures and was popularised by *Statistical Methods for Research Workers* (1925); the F distribution was tabulated and named in Fisher's honour by George Snedecor in 1934. John Tukey proposed his honestly significant difference in 1949–1953 and Charles Dunnett his many-to-one comparisons in 1955. Frank Wilcoxon, a chemist working on insecticides and fungicides, introduced the signed-rank and rank-sum tests in a four-page paper in 1945; Henry Mann and Donald Whitney gave the U statistic and its distribution in 1947; William Kruskal and Allen Wallis published their test in 1952. Fisher's 1936 paper on the iris data, published in the *Annals of Eugenics*, is now read for its statistics; the journal's name reflects views of its time that the modern field rejects.
:::

::: summary
- Independent groups: Student's t-test pools the variances; Welch's test does not, and should be the default. With equal $n$ the statistics coincide and only the degrees of freedom differ.
- *I. versicolor* vs *I. virginica* sepal length: difference 0.652 cm, $t = 5.63$, 95 % CI 0.42 to 0.88 cm.
- One-way ANOVA partitions $\mathrm{SS_T} = \mathrm{SS_B} + \mathrm{SS_W}$; $F = \mathrm{MS_B}/\mathrm{MS_W}$ on $(k-1, N-k)$ degrees of freedom. Iris species: $F_{2,147} = 119.3$, $R^2 = 0.62$.
- Plan contrasts in advance; for all pairwise comparisons use Tukey's HSD (iris: HSD = 0.244 cm, all pairs differ), for many-to-one use Dunnett's test.
- Assumptions: independence (critical), normal residuals (robust for moderate $n$), equal variances (matters with unequal $n$); check with residual plots.
- Rank tests — Wilcoxon signed-rank, Mann–Whitney, Kruskal–Wallis — resist outliers and skew, lose little power on normal data, but still assume independence and are not simply tests of medians.
:::

## Exercises

::: exercise A pooled t statistic {level=1 check="1.70"}
Two independent groups of 8 seedlings have mean heights 20.0 and 23.0 cm with standard deviations 3.0 and 4.0 cm. Calculate Student's pooled t statistic to three significant figures.
::: solution
$s_p^2 = (7\times9 + 7\times16)/14 = 12.5$; $\mathrm{SE} = \sqrt{12.5(1/8 + 1/8)} = 1.768$; $t = 3.0/1.768 = 1.70$ on 14 degrees of freedom ($P = 0.11$).
:::
:::

::: exercise Welch's degrees of freedom {level=1 check="13.0"}
For the seedlings of the previous exercise, calculate the Welch–Satterthwaite degrees of freedom to three significant figures.
::: solution
$s_1^2/n_1 = 9/8 = 1.125$, $s_2^2/n_2 = 16/8 = 2.0$. Then $\nu = 3.125^2/(1.125^2/7 + 2.0^2/7) = 9.766/(0.1808 + 0.5714) = 12.98$, i.e. 13.0. With equal $n$ and only modestly different variances, Welch loses one degree of freedom out of 14.
:::
:::

::: exercise An F ratio from summary statistics {level=1 check="5"}
Three groups of five beetles have mean masses 10, 12 and 14 mg, each with standard deviation 2 mg. Calculate the ANOVA F statistic.
::: solution
Grand mean 12; $\mathrm{SS_B} = 5(4 + 0 + 4) = 40$, $\mathrm{MS_B} = 20$; $\mathrm{SS_W} = 3\times4\times4 = 48$, $\mathrm{MS_W} = 48/12 = 4$; $F = 20/4 = 5.0$ on (2, 12) degrees of freedom, $P = 0.026$ — just beyond the critical value 3.885 shown in the figure.
:::
:::

::: exercise A Kruskal–Wallis statistic {level=2 check="7.2"}
Three groups of three plants have no overlap at all: the ranks of the combined nine observations are 1, 2, 3 in group A, 4, 5, 6 in group B and 7, 8, 9 in group C. Calculate $H$ from [[#eq-kruskal]].
::: solution
$R_A = 6$, $R_B = 15$, $R_C = 24$; $\sum R_j^2/n_j = (36 + 225 + 576)/3 = 279$. $H = \frac{12}{9\times10}\times279 - 30 = 37.2 - 30 = 7.2$. The χ²₂ approximation gives $P = 0.027$, but with three per group it is poor; the exact permutation P-value (6 of the 1680 distinct allocations of ranks to groups are this extreme) is $6/1680 = 0.0036$.
:::
:::

::: exercise The smallest possible P-value {level=2 check="0.1"}
For a Mann–Whitney test with three observations in each group, what is the smallest possible two-sided exact P-value?
::: solution
There are $\binom63 = 20$ equally likely allocations of ranks; the most extreme (all three of one group below all of the other) occurs once in each direction, so $P_{\min} = 2/20 = 0.10$. No result can be significant at 0.05 — a fact worth knowing before planning an experiment with $n = 3$.
:::
:::

::: exercise Tukey with fewer flowers {level=2}
Suppose only 10 flowers of each *Iris* species had been measured, with the same means and standard deviations. (a) Recalculate $\mathrm{MS_W}$, $F$ and its degrees of freedom. (b) With $q_{0.95;\,3,\,27} = 3.506$, calculate the HSD and decide which pairs differ.
::: answer
(a) $\mathrm{MS_W} = 0.2650$, $F = 23.9$ on (2, 27); (b) HSD = 0.571 cm; all three pairs differ.
:::
::: solution
(a) $\mathrm{MS_W}$ is the average of the three variances, 0.2650, whatever $n$ is. $\mathrm{SS_B}$ scales with $n$: $10\times1.26424 = 12.642$, so $\mathrm{MS_B} = 6.321$ and $F = 6.321/0.2650 = 23.9$ on 2 and 27 degrees of freedom — still overwhelming.
(b) $\mathrm{HSD} = 3.506\sqrt{0.2650/10} = 3.506\times0.1628 = 0.571$ cm. The differences 0.930, 1.582 and 0.652 all exceed it, though *virginica* − *versicolor* (0.652) only narrowly. With fewer flowers the smallest difference would be the first to become non-significant.
:::
:::

::: exercise Pseudo-pairs {level=3}
A researcher measures the photosynthetic rate of 12 leaves from a sun-exposed branch and 12 leaves from a shaded branch of the same tree, and writes the results in two columns of a spreadsheet, row by row. (a) A colleague runs a paired t-test on the rows. Why is this wrong? (b) Another runs a two-sample Welch test. What population does that test make inferences about, and why does it not answer the question "do sun and shade leaves differ in this species?" (c) What design would answer that question?
::: solution
(a) The rows are not pairs: leaf 3 of the sun branch has no special relationship with leaf 3 of the shade branch. Pairing arbitrary rows produces a meaningless test whose result depends on the order of entry.
(b) The Welch test compares the two *branches* of this one tree; its 24 leaves are subsamples, and any difference could be due to that branch's age, height, damage or vascular supply rather than to light. It supports inference about these two branches only. Using leaves as replicates for a claim about light is pseudoreplication ([[biostatistics/experimental-design]]).
(c) Sample several trees (say 10 to 15), and on each measure leaves on a sun-exposed and a shaded branch; average the leaves within each branch, and compare sun with shade across trees with a paired test (trees are the pairs). Better still, include more than one branch of each kind per tree, or experimentally shade randomly chosen branches.
:::
:::

::: exercise Why not three t-tests? {level=3}
(a) If all three iris species had equal means, and the three pairwise t-tests were independent (they are not quite), what would be the probability of at least one false positive at $\alpha = 0.05$? (b) For an experiment with $k = 6$ groups, how many pairwise comparisons are there, and what would the same calculation give? (c) Explain in words why the actual error rate of unadjusted pairwise tests is somewhat lower than (b) suggests, but still far above 0.05, and how Tukey's procedure deals with this.
::: solution
(a) $1 - 0.95^3 = 0.143$.
(b) $\binom62 = 15$ comparisons; $1 - 0.95^{15} = 0.54$.
(c) The pairwise tests share data (each mean appears in $k - 1$ comparisons) and share the same estimate of $\sigma$, so they are positively correlated, and the chance of at least one false positive is less than the independent-case figure — for six equal groups, simulations (ten per group, pooled variance) give roughly 0.35. But it is still about seven times the nominal rate. Tukey's procedure works with the exact distribution of the *largest* standardised difference among the $k$ means (the studentised range), so that the probability that *any* pairwise difference exceeds the HSD is exactly $\alpha$ when all means are equal.
:::
:::
