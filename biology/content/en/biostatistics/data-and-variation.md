No two maize plants grow to the same height, no two mice have the same body mass, and no two replicate plates grow the same number of colonies. Variation is not a nuisance laid on top of biology: it is one of the things biology is about. Natural selection acts on variation between individuals, genetics explains part of it, ecology measures how it changes across space and time, and every experiment has to separate the effect it is looking for from the variation that would have been there anyway. Statistics is the discipline that makes that separation honest.

In 1876 Charles Darwin published *The Effects of Cross and Self Fertilisation in the Vegetable Kingdom*, the result of eleven years of experiments. For maize (*Zea mays*) he raised fifteen pairs of plants, one cross-fertilised and one self-fertilised in each pair, grown in the same pot, and measured their heights. He asked his cousin Francis Galton whether the difference between the two kinds of plant was real, and Galton, after some struggle, could not give a satisfactory answer. Fifty-nine years later Ronald Fisher used the same fifteen pairs as the worked example in *The Design of Experiments* (1935). We shall meet Darwin's maize again and again in this course; in this first chapter we use it simply to learn how to describe a set of numbers.

This chapter covers the kinds of data biologists collect, the summary statistics of location and spread, frequency distributions and their shapes, transformations, and how to draw graphs that show the data rather than hide them. The underlying probability theory is developed in Maths Atlas ([Probability](/learn/maths/course.php?c=probability) and [Statistics](/learn/maths/course.php?c=statistics)); here we concentrate on using it on biological data.

## Variables and data {#variables}

A study measures one or more **variables** on each of a number of **units** — individual organisms, plots of land, cultures, cells, families, sampling sites. The first decision in any analysis is what kind of variable each measurement is, because it fixes which summaries, graphs and tests make sense.

::: definition Types of variable {#def-variable-types}
A **categorical** variable places each unit in one of a set of classes.

- It is **nominal** if the classes have no natural order: species, genotype (*AA*, *Aa*, *aa*), blood group, sex, flower colour.
- It is **ordinal** if the classes are ordered but the gaps between them are not measured: a disease score from 0 to 4, larval instar, a dominance rank.

A **numerical** variable records a quantity.

- It is **discrete** if it takes separated values, usually counts: the number of eggs in a clutch, of bristles on a fly, of colonies on a plate.
- It is **continuous** if it can in principle take any value in an interval: body mass, enzyme activity, wing length, the concentration of a metabolite.

A numerical variable is on a **ratio scale** if zero means "none" and ratios are meaningful (a 4 g mouse is twice as heavy as a 2 g one), and on an **interval scale** if only differences are meaningful (temperature in °C, calendar date).
:::

The boundaries are blurred in practice. Continuous quantities are always recorded to a finite precision, so in the end they are discrete; Darwin recorded heights to the nearest eighth of an inch. Large counts behave almost like continuous variables, and ordinal scores are often analysed as if they were numbers, which is defensible only when the steps are roughly equal. What matters is to know which choice you have made and why.

It is just as important to distinguish the roles that variables play. In an experiment the **explanatory variable** (also called the treatment, factor or predictor) is the one the investigator sets or the one whose effect is being studied: cross- versus self-fertilisation, fertiliser dose, genotype. The **response variable** is the one measured to see the effect: height, yield, survival. In an observational study neither is set by the investigator, and the labels describe the question rather than a causal arrow (see [[biostatistics/experimental-design]]).

::: definition Population, sample and statistic {#def-population}
The **population** is the whole set of units (or of possible measurements) about which we want to draw conclusions: all maize plants that could be raised under Darwin's conditions, all adult females of a species in a lake. A **sample** is the subset actually measured. A **parameter** is a number describing the population (its mean $\mu$, its standard deviation $\sigma$); a **statistic** is a number calculated from the sample (its mean $\bar x$, its standard deviation $s$), used to estimate the corresponding parameter.
:::

The population is often hypothetical — the plants that *would* grow if we repeated the experiment indefinitely — and it is always defined by how the sample was obtained. A sample of fish caught by a net with a 2 cm mesh says nothing about fish smaller than 2 cm. The rest of this course is about how far, and with what confidence, we can reason from statistics to parameters; this chapter is about the statistics themselves.

## Frequency distributions {#distributions}

A list of fifteen heights is hard to take in. The first thing to do with any data set is to look at its **frequency distribution**: how many units take each value, or fall in each range of values.

For a categorical or discrete variable we simply count. In 1898 Ladislaus von Bortkiewicz tabulated the number of soldiers killed by kicks from horses in fourteen Prussian army corps over twenty years. His famous subset of ten corps gives 200 corps-years:

| deaths in a corps-year | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| number of corps-years | 109 | 65 | 22 | 3 | 1 |

This is a frequency table of a discrete variable. In [[biostatistics/probability-distributions]] we shall see that it follows the Poisson distribution closely — the classic example of rare, independent events, like mutations in a stretch of DNA or seedlings in a quadrat.

For a continuous variable we divide the range into intervals (**bins**) and count the units in each; the resulting bar chart with touching bars is a **histogram**. The area of each bar is proportional to the count, so if bins have unequal widths the heights must be counts divided by width. The choice of bin width changes the picture: too wide and the shape is lost, too narrow and the histogram is mostly noise. For small samples a **dot plot** or **strip chart**, which shows every observation as a point, is better than a histogram.

The shape of a distribution is described in a few words:

- **Symmetric** or **skewed**. A distribution with a long tail to the right (a few large values) is **right-skewed** or positively skewed. Most biological quantities that cannot be negative and vary over a wide range are right-skewed: body masses across species, gene-expression levels, the abundance of species in a community, the number of offspring per individual.
- **Unimodal** or **bimodal**. Two peaks often mean two kinds of unit mixed together: males and females, two species, infected and uninfected hosts, cells in G1 and G2 phase of the cell cycle ([[cell-biology/cell-cycle]]).
- **Outliers**: values far from the rest. An outlier may be an error of measurement or transcription, or a real and interesting individual. It should be checked, never silently deleted.

::: widget distribution
dist: lognormal
params: mu=0, sigma=0.5
caption: The log-normal distribution, a common model for right-skewed biological measurements: if $\ln X$ is normal with mean $\mu$ and standard deviation $\sigma$, then $X$ is log-normal. The figure draws the probability density of $X$ with its mean ± one standard deviation. Drag $\sigma$ upwards and watch the long right tail grow and the mean move away from the peak; with $\sigma$ near 0.1 the curve is almost symmetric and almost normal. For $\mu = 0$ the median of $X$ is always 1, while the mean is $e^{\sigma^2/2}$, which exceeds the median more and more as the skew increases.
:::

## Measures of location {#location}

A **measure of location** (or central tendency) is a single number saying where the values lie.

::: definition Mean, median and mode {#def-location}
For observations $x_1, x_2, \dots, x_n$:

- the **sample mean** is $\bar x = \dfrac{1}{n}\sum_{i=1}^n x_i$;
- the **median** is the middle value of the ordered observations: the $\tfrac{n+1}{2}$-th value if $n$ is odd, and the average of the $\tfrac n2$-th and $(\tfrac n2+1)$-th values if $n$ is even;
- the **mode** is the most frequent value (for continuous data, the peak of the histogram).
:::

The mean and the median answer different questions, and the difference between them is informative.

::: proposition Optimality of the mean and the median {#prop-mean-median}
For any data set, the sum of squared deviations $\sum_i (x_i - c)^2$ is smallest when $c = \bar x$, and the sum of absolute deviations $\sum_i \lvert x_i - c\rvert$ is smallest when $c$ is a median. In addition, the deviations from the mean always sum to zero: $\sum_i (x_i - \bar x) = 0$.
:::

::: proof
$\sum (x_i - \bar x) = \sum x_i - n\bar x = 0$ by the definition of $\bar x$. For any $c$,
$$
\sum_i (x_i - c)^2 = \sum_i (x_i - \bar x)^2 + 2(\bar x - c)\sum_i (x_i - \bar x) + n(\bar x - c)^2 = \sum_i (x_i - \bar x)^2 + n(\bar x - c)^2,
$$
which is smallest when $c = \bar x$. For absolute deviations, moving $c$ to the right by a small amount increases the distance to every observation on its left and decreases it for every observation on its right; the total therefore decreases while more observations lie to the right than to the left, and increases once more lie to the left. It is minimised where the numbers on each side balance, which is at the median.
:::

The mean is the balance point of the data: it uses every value and is the basis of most of the theory in later chapters. Its weakness is that a single extreme value can drag it a long way. The median uses only the order of the values, so it is **resistant**: half the observations could be made arbitrarily large without moving it beyond the largest remaining value. For a symmetric distribution the two coincide; for a right-skewed distribution the mean exceeds the median, because the long tail pulls the mean along.

::: example Darwin's maize: location {#ex-darwin-location}
Fisher (1935) gives the heights of Darwin's fifteen pairs of maize plants in eighths of an inch:

| pair | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| crossed | 188 | 96 | 168 | 176 | 153 | 172 | 177 | 163 | 146 | 173 | 186 | 168 | 177 | 184 | 96 |
| selfed | 139 | 163 | 160 | 160 | 147 | 149 | 149 | 122 | 132 | 144 | 130 | 144 | 102 | 124 | 144 |

Pairs 1–3 grew in pot I, 4–6 in pot II, 7–11 in pot III and 12–15 in pot IV. Calculate the mean and median height of each group, and comment.
::: solution
The crossed plants sum to 2423, so $\bar x_\mathrm{C} = 2423/15 = 161.53$ eighths of an inch (20.19 inches). Ordered, they are 96, 96, 146, 153, 163, 168, 168, **172**, 173, 176, 177, 177, 184, 186, 188, so the median (the eighth value) is 172.

The selfed plants sum to 2109, so $\bar x_\mathrm{S} = 140.60$ (17.58 inches). Ordered: 102, 122, 124, 130, 132, 139, 144, **144**, 144, 147, 149, 149, 160, 160, 163; the median is 144.

For the selfed plants mean and median are close, as in a roughly symmetric sample. For the crossed plants the mean is ten units below the median, because two very short plants (96 and 96) pull it down: the crossed sample is skewed to the left. Either way the crossed plants are taller on average, by about 21 eighths of an inch (mean) or 28 (median). Whether a difference of this size could easily have arisen by chance is the question of [[biostatistics/hypothesis-testing]].
:::
:::

Two further measures of location are useful for biological data. The **geometric mean**, $\left(\prod x_i\right)^{1/n} = \exp\left(\frac1n\sum \ln x_i\right)$, is the back-transformed mean of the logarithms; it is the natural centre for quantities that multiply, such as growth factors, and for right-skewed positive data. The **trimmed mean** discards a fixed fraction of the smallest and largest values before averaging, a compromise between mean and median.

## Measures of spread {#spread}

Two samples can have the same mean and be utterly different. A **measure of spread** (dispersion) says how far the values typically lie from their centre.

::: definition Variance, standard deviation and coefficient of variation {#def-spread}
The **sample variance** is
$$
s^2 = \frac{1}{n-1}\sum_{i=1}^n (x_i - \bar x)^2,
$$ {#eq-variance}
and the **sample standard deviation** is $s = \sqrt{s^2}$, in the same units as the data. The **coefficient of variation** of a ratio-scale variable is $\mathrm{CV} = s/\bar x$, often quoted as a percentage. A convenient computing form is $\sum (x_i - \bar x)^2 = \sum x_i^2 - n\bar x^2$, although it loses precision on a computer when the mean is large compared with the spread.
:::

Why divide by $n - 1$ rather than $n$? The deviations are measured from $\bar x$, which was itself fitted to the same data and, by [[#prop-mean-median]], makes the sum of squares as small as possible. Measured from the true mean $\mu$ the sum would be larger on average. Dividing by $n-1$ exactly corrects for this, making $s^2$ an unbiased estimator of the population variance $\sigma^2$; the proof is in [Maths Atlas: estimation](/learn/maths/lesson.php?c=statistics&l=estimation). Another way to say it: once $\bar x$ is fixed, only $n-1$ of the deviations are free to vary, since they must sum to zero. The number $n - 1$ is the **degrees of freedom** of the variance, a phrase we shall meet with every test in this course.

The variance has squared units (g², mm²), which is why we usually report the standard deviation. For roughly bell-shaped data about two-thirds of the observations lie within one standard deviation of the mean and about 95 % within two ([[biostatistics/probability-distributions]]); for skewed data this rule of thumb fails.

The coefficient of variation is dimensionless, so it compares variability between quantities with different units or very different means. For Fisher's iris data (Edgar Anderson's measurements of 50 flowers of each of three species, *Iris setosa*, *I. versicolor* and *I. virginica*), the sepal lengths have means 5.006, 5.936 and 6.588 cm and standard deviations 0.352, 0.516 and 0.636 cm: CVs of 7.0 %, 8.7 % and 9.7 %. Morphological measurements within a species typically have CVs of a few per cent to perhaps 15 %; counts and concentrations often vary far more.

::: proposition Effect of a change of units {#prop-linear}
If every observation is transformed as $y_i = a + b x_i$, then $\bar y = a + b\bar x$, $s_y = \lvert b\rvert\, s_x$ and $s_y^2 = b^2 s_x^2$. Adding a constant moves the mean but leaves the spread unchanged; multiplying by $b$ multiplies both by $b$ (the standard deviation by $\lvert b\rvert$). The coefficient of variation is unchanged by a change of units ($a = 0$), but it is not meaningful on an interval scale, where the zero is arbitrary.
:::

::: proof
$\bar y = \frac1n\sum(a + bx_i) = a + b\bar x$, so $y_i - \bar y = b(x_i - \bar x)$; squaring, summing and dividing by $n-1$ gives $s_y^2 = b^2 s_x^2$.
:::

### Quantiles and the five-number summary

The resistant counterpart of the standard deviation is based on quantiles. The **$p$-quantile** of a sample is a value with a fraction $p$ of the observations below it; the **quartiles** $Q_1$ and $Q_3$ are the 0.25- and 0.75-quantiles, and the median is $Q_2$. The **interquartile range** $\mathrm{IQR} = Q_3 - Q_1$ is the width of the middle half of the data.

For small samples there is no unique definition of a quantile, and software packages differ. In this course we use the common linear-interpolation rule (the default of R and of Python's `statistics.quantiles(..., method='inclusive')`): sort the data, and place the $p$-quantile at position $1 + p(n - 1)$, interpolating between neighbouring values. For $n = 15$, $Q_1$ sits at position 4.5 and $Q_3$ at position 11.5. Other rules give slightly different answers; with large samples the differences vanish.

::: definition Five-number summary and box plot {#def-boxplot}
The **five-number summary** is the minimum, $Q_1$, median, $Q_3$ and maximum. A **box plot** (John Tukey, 1977) draws a box from $Q_1$ to $Q_3$ with a line at the median, and whiskers out to the most extreme observations lying within the **fences** $Q_1 - 1.5\,\mathrm{IQR}$ and $Q_3 + 1.5\,\mathrm{IQR}$. Observations beyond the fences are plotted individually as possible outliers.
:::

::: example Darwin's maize: spread and outliers {#ex-darwin-spread}
Calculate the standard deviation, coefficient of variation, quartiles and box-plot fences for the crossed and selfed heights of [[#ex-darwin-location]], and identify any possible outliers.
::: solution
**Crossed.** The deviations from 161.53 have squares summing to 11,721.7, so $s^2 = 11\,721.7/14 = 837.3$ and $s_\mathrm{C} = 28.94$ eighths of an inch (3.62 inches); $\mathrm{CV} = 28.94/161.53 = 17.9\,\%$. The quartiles are at positions 4.5 and 11.5 of the ordered list: $Q_1 = (153 + 163)/2 = 158$ and $Q_3 = (177 + 177)/2 = 177$, so $\mathrm{IQR} = 19$. The fences are $158 - 28.5 = 129.5$ and $177 + 28.5 = 205.5$. Both plants of height 96 lie below the lower fence and would be drawn as outliers.

**Selfed.** $s^2 = 3771.6/14 = 269.4$, $s_\mathrm{S} = 16.41$, $\mathrm{CV} = 11.7\,\%$. $Q_1 = (130 + 132)/2 = 131$, $Q_3 = 149$, $\mathrm{IQR} = 18$, fences 104 and 176. The shortest selfed plant, 102, lies just below the lower fence.

The crossed group is the more variable, almost entirely because of its two short plants. Fisher discussed these values: they are real plants, and nothing in Darwin's notes justifies discarding them. They are precisely the kind of observation that makes the median and the mean disagree and that a careful analysis must report rather than hide.
:::
:::

::: warning "Outliers should be removed"
A value is not wrong because it is unusual. Removing observations because they lie beyond a fence, or because they spoil a hoped-for result, biases every estimate and test that follows and is a form of the selective reporting discussed in [[biostatistics/hypothesis-testing]]. Check outliers against the original records, correct genuine errors (a mass of 250 g entered as 2500 g), and otherwise keep them. If an analysis is sensitive to a few points, say so and report it both ways, or use a resistant method ([[biostatistics/comparing-groups]]). Any exclusion rule should be decided before the data are seen and stated in the methods.
:::

::: example Mean and variance from a frequency table {#ex-horse-kicks}
Calculate the mean and variance of the number of deaths per corps-year in Bortkiewicz's table above.
::: solution
With frequencies $f_k$, $n = \sum f_k = 200$ and $\bar x = \sum k f_k / n = (0\cdot109 + 1\cdot65 + 2\cdot22 + 3\cdot3 + 4\cdot1)/200 = 122/200 = 0.610$.

The sum of squares is $\sum f_k(k - \bar x)^2 = 109(0.3721) + 65(0.1521) + 22(1.9321) + 3(5.7121) + 1(11.4921) = 121.58$, so $s^2 = 121.58/199 = 0.611$.

The mean and the variance are almost equal. For counts of independent random events this is exactly what the Poisson distribution predicts ([[biostatistics/probability-distributions]]); if the variance were much larger than the mean we would suspect clustering, as when deaths came in groups.
:::
:::

## Transformations {#transformations}

Many statistical methods work best when data are roughly symmetric and when the spread does not change with the mean. Biological data often violate both: masses, concentrations and counts tend to be right-skewed, and their standard deviation tends to grow in proportion to the mean (a constant CV). A **transformation** applies the same function to every observation to put the data on a scale where these properties hold.

- The **logarithm** turns multiplicative variation into additive variation. If a quantity varies by a constant percentage, its logarithm varies by a constant amount, so log-transformation makes the spread independent of the mean and often makes right-skewed data symmetric. It is the standard scale for body size, concentrations, gene expression ("log fold change"), population size and allometric relationships ([[biostatistics/regression]]). It requires positive values; for counts with zeros, $\ln(x + 1)$ is a common if somewhat arbitrary fix.
- The **square root** suits counts that are roughly Poisson, since it makes the variance approximately constant.
- The **arcsine square root** was once standard for proportions; it has largely been replaced by logistic regression ([[biostatistics/linear-models]]).

Means and standard deviations computed on a transformed scale are back-transformed with care. The mean of the logarithms back-transforms to the *geometric* mean, not the arithmetic mean, and $\bar\ell \pm s_\ell$ on the log scale becomes an asymmetric range "geometric mean ×/÷ a factor" on the original scale.

::: example Colony counts on a log scale {#ex-log}
The following twelve colony counts are simulated from a log-normal distribution (Python, `random.seed(2026)`, then `round(random.lognormvariate(math.log(200), 1.0))` twelve times), as a stand-in for counts from replicate cultures that differ multiplicatively:

54, 231, 83, 296, 586, 1101, 567, 63, 125, 539, 103, 205.

Summarise them on the raw scale and on a $\log_{10}$ scale.
::: solution
**Raw scale.** $\bar x = 3953/12 = 329.4$, median $= (205 + 231)/2 = 218$, $s = 314.6$. The mean is far above the median and the standard deviation is nearly as large as the mean (CV 95 %); "329 ± 315" would suggest that negative counts are plausible, which is nonsense.

**Log scale.** The $\log_{10}$ values have mean $\bar\ell = 2.334$ and standard deviation $s_\ell = 0.429$. Back-transforming, the geometric mean is $10^{2.334} = 216$ — close to the median — and one standard deviation either side corresponds to $10^{2.334 \pm 0.429}$, i.e. from 80 to 579: the geometric mean ×/÷ $10^{0.429} = 2.68$. This asymmetric range describes the data well. (The values were generated with median 200 and $\sigma = 1$ on the natural-log scale, i.e. $0.434$ on the $\log_{10}$ scale; the sample recovers both closely.)
:::
:::

## Graphs that show the data {#graphs}

A good graph is the most powerful summary of all, and a bad one can mislead more effectively than any number. Francis Anscombe made the point in 1973 with four small data sets that share the same means, variances, correlation and fitted regression line but look completely different when plotted ([[biostatistics/regression]]). Always plot your data before summarising them, and choose a graph suited to the kind of variable:

| data | good graphs |
|---|---|
| one categorical variable | bar chart of counts or proportions |
| one numerical variable | histogram, dot plot, box plot |
| numerical response, categorical explanatory | dot plots or box plots side by side, with every point shown when $n$ is small |
| two numerical variables | scatter plot |
| two categorical variables | grouped bar chart, mosaic plot |
| paired measurements | the differences, or lines joining each pair |

Several habits recur in published biology that hide data. Tracey Weissgerber and colleagues (*PLOS Biology*, 2015) surveyed physiology papers and found that most showed continuous data from small samples as bar charts of means with error bars; very different distributions — symmetric, skewed, bimodal, or with an outlier — can give identical bar charts. For small samples, show the points.

::: warning "Error bars are all the same"
An error bar can show the standard deviation (spread of the data), the standard error of the mean (precision of the mean, $s/\sqrt n$, [[biostatistics/estimation]]), or a 95 % confidence interval, which is roughly two standard errors wide on each side. These differ by large factors: with $n = 10$, the standard error is about a third of the standard deviation. A graph or table that does not say which it shows cannot be interpreted, and overlap or non-overlap of standard-error bars is not a test of anything. Say what the bars are, and state $n$.
:::

Other rules for honest graphs:

- Bar charts encode values as lengths, so their axis must start at zero. Dot plots and scatter plots need not.
- Use a logarithmic axis for data spanning several orders of magnitude, and label it in original units (1, 10, 100) rather than in logarithms.
- For paired data, such as Darwin's pairs in the same pot, plot the pairing: draw a line from each selfed plant to its crossed partner, or plot the fifteen differences. Plotting the two groups as unrelated clouds throws away the design.
- Do not use three-dimensional effects, dual $y$-axes with arbitrary scales, or colour scales that are not readable by colour-blind readers.

::: quiz
A paper reports that a sample of 40 lizards had mean body mass 12.4 g with "SE = 0.8 g". What is the standard deviation of body mass in the sample, approximately?
- [ ] 0.8 g
- [ ] 0.13 g
- [x] 5.1 g
- [ ] 32 g
::: solution
The standard error is $s/\sqrt n$, so $s = \mathrm{SE}\times\sqrt n = 0.8\times\sqrt{40} = 0.8\times6.32 = 5.1$ g. The standard deviation describes how much individual lizards differ, which is much more than the uncertainty of the mean. Confusing the two makes populations look far more uniform than they are.
:::
:::

::: application Reference ranges and the normal range
Field guides, breeding programmes and veterinary laboratories describe "normal" values of a trait — the wing length of a bird species, the haematocrit of a captive population, the yield of a crop variety — as a range containing most healthy individuals, often the central 95 %. For a roughly normal trait this is about $\bar x \pm 2s$; for a skewed trait it is better taken from the 2.5th and 97.5th percentiles of a large sample, or computed on a log scale. Such ranges describe a population and are built from the standard deviation, never the standard error. Clinical reference intervals follow the same logic and are treated in [Medicine Atlas: epidemiology and evidence-based medicine](/learn/medicine/course.php?c=epidemiology-ebm).
:::

::: history
The arithmetic mean as a way to combine repeated astronomical observations spread in the eighteenth century, and Adolphe Quetelet applied it to people in the 1830s and 1840s, describing the chest girths of 5,738 Scottish soldiers by a bell-shaped curve. Francis Galton, Darwin's cousin, made the measurement of biological variation a science: he introduced the median and quartiles into biometry in the 1870s and 1880s, built his "quincunx" to show how a bell curve arises, and set up an anthropometric laboratory in London in 1884. Karl Pearson named the standard deviation in 1894, and with Walter Weldon and Galton founded the journal *Biometrika* in 1901 to apply statistics to evolution and heredity. Darwin's maize experiment of 1876 reached its modern analysis in Fisher's *The Design of Experiments* (1935). Exploratory data analysis, with the box plot and the five-number summary, was codified by John Tukey in 1977.
:::

::: summary
- Classify each variable before analysing it: categorical (nominal or ordinal) or numerical (discrete or continuous), and explanatory or response.
- A statistic summarises a sample and estimates a parameter of the population the sample was drawn from; that population is defined by how the sample was obtained.
- The mean minimises squared deviations and is sensitive to extreme values; the median minimises absolute deviations and is resistant. Mean > median signals right skew.
- The sample variance divides by $n - 1$, its degrees of freedom; the standard deviation is in the units of the data, and the coefficient of variation $s/\bar x$ is unit-free.
- Quartiles, the IQR and the box plot give a resistant summary; points beyond $1.5\,\mathrm{IQR}$ from the box are flagged, checked and normally kept.
- Logarithms turn multiplicative variation into additive variation; the back-transformed mean of logs is the geometric mean.
- Plot the raw data, show the design (pairing, blocks), and always say whether error bars are SD, SE or confidence intervals.
:::

## Exercises

::: exercise Mean of wing lengths {level=1 check="4.2"}
Five fruit flies have wing lengths (mm) 4.1, 4.4, 3.9, 4.6 and 4.0. Calculate the mean.
::: solution
$\bar x = (4.1 + 4.4 + 3.9 + 4.6 + 4.0)/5 = 21.0/5 = 4.2$ mm.
:::
:::

::: exercise Standard deviation of wing lengths {level=1 check="0.292"}
Calculate the sample standard deviation of the wing lengths in the previous exercise, to three significant figures.
::: solution
Deviations from 4.2: $-0.1, 0.2, -0.3, 0.4, -0.2$; squares $0.01, 0.04, 0.09, 0.16, 0.04$, summing to $0.34$. Then $s^2 = 0.34/4 = 0.085$ and $s = \sqrt{0.085} = 0.292$ mm.
:::
:::

::: exercise A median with an even number of values {level=1 check="10"}
Six clutches contain 12, 7, 9, 15, 8 and 11 eggs. What is the median clutch size?
::: solution
Ordered: 7, 8, 9, 11, 12, 15. With $n = 6$ the median is the average of the third and fourth values, $(9 + 11)/2 = 10$ eggs. (The mean is 10.33.)
:::
:::

::: exercise Changing units {level=2 check="51.3"}
The crossed maize plants of [[#ex-darwin-location]] have mean 161.53 and standard deviation 28.94 in eighths of an inch. Convert the mean to centimetres (1 inch = 2.54 cm), to three significant figures, and say what happens to the standard deviation and to the coefficient of variation.
::: solution
One eighth of an inch is $2.54/8 = 0.3175$ cm, so by [[#prop-linear]] the mean is $161.53\times0.3175 = 51.3$ cm and the standard deviation $28.94\times0.3175 = 9.19$ cm. The coefficient of variation, $9.19/51.3 = 17.9\,\%$, is unchanged, as it must be for a change of units.
:::
:::

::: exercise An upper fence {level=2 check="12"}
The numbers of parasites found on ten fish are 2, 3, 3, 4, 5, 5, 6, 7, 8 and 31. Using the quartile rule of this chapter (position $1 + p(n-1)$), find $Q_1$, $Q_3$ and the upper box-plot fence. Is 31 flagged? Compare the mean and the median.
::: solution
Positions $1 + 0.25\times9 = 3.25$ and $1 + 0.75\times9 = 7.75$. $Q_1 = 3 + 0.25(4 - 3) = 3.25$; $Q_3 = 6 + 0.75(7 - 6) = 6.75$; $\mathrm{IQR} = 3.5$. Upper fence $= 6.75 + 1.5\times3.5 = 12$. The value 31 is far beyond it and is flagged. The mean is 7.4 and the median 5: one heavily infected fish raises the mean by half. Parasite loads are typically aggregated like this — most hosts carry few parasites and a few carry many — so the "outlier" is probably biology, not error.
:::
:::

::: exercise Variance from a frequency table {level=2}
A geneticist counts the number of mutant offspring in 50 broods of equal size: 20 broods have none, 18 have one, 9 have two and 3 have three. Calculate the mean and the variance of the number per brood, and say whether the variance is close to the mean.
::: answer
Mean 0.90; variance 0.827.
:::
::: solution
$n = 50$; $\sum kf_k = 0 + 18 + 18 + 9 = 45$, so $\bar x = 0.90$. $\sum f_k(k - 0.9)^2 = 20(0.81) + 18(0.01) + 9(1.21) + 3(4.41) = 16.2 + 0.18 + 10.89 + 13.23 = 40.5$, so $s^2 = 40.5/49 = 0.827$. The variance is slightly below the mean, consistent with Poisson-like counts (which would have them equal) given sampling variation.
:::
:::

::: exercise The geometric mean of growth factors {level=2 check="100"}
A bacterial culture increases in density by factors of 10, 100 and 1000 in three successive (very different) periods. Calculate the geometric mean factor and explain why it, not the arithmetic mean (370), is the right "average" factor per period.
::: solution
$(10\times100\times1000)^{1/3} = (10^6)^{1/3} = 100$. Growth multiplies: applying a factor of 100 three times gives $10^6$, the same total as the observed sequence, whereas $370^3 = 5.1\times10^7$ overstates the total fiftyfold. The geometric mean is the arithmetic mean on the log scale ($\log_{10}$ factors 1, 2, 3, mean 2).
:::
:::

::: exercise Reading a bar chart {level=3}
A paper compares the expression of a gene in wild-type and knockout mice with a bar chart of means and error bars "± SEM", $n = 4$ per group. The wild-type bar is 1.0 (bar 0.1) and the knockout bar 1.6 (bar 0.5). (a) What are the standard deviations? (b) Give two quite different sets of four knockout values consistent with this bar. (c) What would you ask the authors to show instead, and why?
::: solution
(a) $s = \mathrm{SEM}\times\sqrt4 = 2\times\mathrm{SEM}$: 0.2 for wild type, 1.0 for knockout.
(b) The knockout mean 1.6 and SD 1.0 fit, for example, 0.6, 1.0, 2.0, 2.8 (fairly evenly spread; mean 1.6, SD 0.99) or 1.1, 1.1, 1.1, 3.1 (three animals like wild type and one extreme animal; mean 1.6, SD 1.0). The second set tells a different biological story — perhaps one animal with a different background or a technical failure.
(c) Ask for the individual points (a dot plot with the mean or median marked), the exact $n$ and a statement of what the bars show. With $n = 4$ a bar chart conceals the distribution, and the reader cannot judge whether one animal drives the effect (Weissgerber et al., 2015).
:::
:::

::: exercise Robustness of the median {level=3}
(a) Show that changing a single observation can move the mean of $n$ values by any amount, but can move the median of an odd number $n \ge 3$ of values by at most the distance to the next observation on either side of the middle. (b) The **breakdown point** of a statistic is the smallest fraction of observations that, made arbitrarily large, can make the statistic arbitrarily large. What are the breakdown points of the mean and of the median for large $n$? (c) Why might a biologist nonetheless prefer the mean?
::: solution
(a) Replacing $x_j$ by $x_j + \Delta$ changes $\bar x$ by $\Delta/n$, which is unbounded as $\Delta$ grows. For the median of an odd sample, the middle value $x_{(m)}$ with $m = (n+1)/2$ can only be replaced by its neighbour $x_{(m-1)}$ or $x_{(m+1)}$ when one observation crosses over it, because at most one value changes side; so the median stays within $[x_{(m-1)}, x_{(m+1)}]$.
(b) For the mean, one observation suffices: breakdown point $1/n \to 0$. For the median, the majority of values must be moved, so its breakdown point approaches $1/2$, the largest possible.
(c) The mean uses the size of every observation and is more precise than the median when the data are close to normal (for large normal samples the median's variance is $\pi/2 \approx 1.57$ times larger). It also adds up: total biomass is $n$ times mean mass, which no median gives. The choice depends on the question and the distribution, and both can be reported.
:::
:::
