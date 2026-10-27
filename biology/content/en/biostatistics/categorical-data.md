Mendel did not measure his peas; he counted them. Round or wrinkled, yellow or green, purple or white flowers — each plant or seed fell into a category, and his evidence was a table of counts. Much biological data has this form: genotypes in a population sample, species in a trap, survivors and deaths in an experiment, infected and uninfected hosts in two habitats, the phenotypes of offspring from a cross. Means and standard deviations make no sense for such data. The questions are about **proportions**: do the counts fit the ratios predicted by a hypothesis, and are two classifications associated?

This chapter develops the tools: the **χ² goodness-of-fit test** of Karl Pearson (1900), applied to Mendelian ratios and to a fitted Poisson distribution; the **χ² test of independence** for contingency tables; **Fisher's exact test** for small samples; and the **odds ratio** and **relative risk** that measure the strength of an association. It ends with the paradox that awaits anyone who pools tables carelessly. The probability models behind it all — binomial, multinomial and hypergeometric — are in [[biostatistics/probability-distributions]]; the genetics is in [[genetics/mendelian-inheritance]].

## Goodness of fit {#goodness-of-fit}

Suppose a hypothesis predicts that a population divides into $k$ categories with probabilities $p_1, \dots, p_k$ (summing to 1) — 9 : 3 : 3 : 1 for a dihybrid cross, ¼ : ½ : ¼ for genotypes from *Aa* × *Aa*, Hardy–Weinberg proportions for a population sample. A sample of $n$ units gives observed counts $O_1, \dots, O_k$. If the hypothesis is true, the **expected counts** are $E_i = np_i$, and the observed counts differ from them only by sampling variation. Pearson's statistic measures the total discrepancy.

::: definition The χ² goodness-of-fit statistic {#def-chisq}
$$
X^2 = \sum_{i=1}^k \frac{(O_i - E_i)^2}{E_i}.
$$ {#eq-chisq}
Under the null hypothesis, and when the expected counts are not too small, $X^2$ approximately follows the **χ² distribution** with $\nu = k - 1 - m$ degrees of freedom, where $m$ is the number of parameters estimated from the data to compute the $E_i$. Large values of $X^2$ are evidence against the hypothesis; the P-value is $\Prob(\chi^2_\nu \ge X^2)$.
:::

Why divide by $E_i$? A count with expectation $E_i$ has, roughly, a Poisson-like variance close to $E_i$ (exactly $np_i(1 - p_i)$ under the multinomial), so $(O_i - E_i)/\sqrt{E_i}$ is approximately a standardised deviation, and $X^2$ is approximately a sum of squared standard normal deviations. The squares are not independent, because the counts must add to $n$; this constraint removes one degree of freedom, and each parameter estimated from the data removes another. The derivation is in [Maths Atlas: hypothesis testing](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing).

The χ² approximation needs adequate expected counts. William Cochran's (1954) widely used rule asks that no expected count be below 1 and no more than 20 % be below 5. When the rule fails, merge adjacent categories (if that makes biological sense), or use an exact test.

::: example Mendel's dihybrid cross {#ex-dihybrid}
Mendel crossed plants grown from round yellow seeds that were heterozygous at both loci (*RrYy* × *RrYy*, self-fertilised) and counted 556 seeds: 315 round yellow, 108 round green, 101 wrinkled yellow and 32 wrinkled green. Test the fit to the 9 : 3 : 3 : 1 ratio of independent assortment.
::: solution
The expected counts are $556\times(9, 3, 3, 1)/16 = 312.75$, 104.25, 104.25 and 34.75. Then
$$
X^2 = \frac{(315 - 312.75)^2}{312.75} + \frac{(108 - 104.25)^2}{104.25} + \frac{(101 - 104.25)^2}{104.25} + \frac{(32 - 34.75)^2}{34.75} = 0.0162 + 0.1349 + 0.1013 + 0.2176 = 0.470.
$$
No parameters were estimated (the ratio came from theory), so $\nu = 4 - 1 = 3$. The 5 % critical value of $\chi^2_3$ is 7.815, and $\Prob(\chi^2_3 \ge 0.470) = 0.93$. The data fit 9 : 3 : 3 : 1 very well: deviations as large as these would occur by chance in 93 % of such experiments.

Note what the test does *not* show. A non-significant result means the data are consistent with 9 : 3 : 3 : 1; other ratios close to it would also fit. Failure to reject is not proof.
:::
:::

::: widget distribution
dist: chisq
params: k=3
a: 7.815
b: 20
caption: The χ² distribution with $k = 3$ degrees of freedom, the null distribution of $X^2$ for a four-class ratio such as 9 : 3 : 3 : 1. The shaded right tail beyond 7.815 has area 0.05: values of $X^2$ larger than this reject the hypothesis at the 5 % level. Mendel's dihybrid result, $X^2 = 0.47$, lies far to the left, in the bulk of the distribution. The mean of a χ² distribution equals its degrees of freedom; change $k$ to 1 (a 3 : 1 ratio) and the critical value becomes 3.841, or to 10 and it becomes 18.3.
:::

::: warning "Use percentages, not counts, in a χ² test"
The χ² statistic must be computed from the actual counts. Using percentages (or any rescaled numbers) changes $X^2$ in proportion to the scaling: 315, 108, 101, 32 converted to percentages gives $X^2 = 0.085$, and the same proportions from 5560 seeds would give $X^2 = 4.70$. The evidence depends on how many units were counted. For the same reason, $X^2$ cannot be applied to measurements such as masses or concentrations, nor to counts that are not independent units (several seeds counted twice, or many cells from one animal).
:::

### Fitting a distribution: parameters cost degrees of freedom

::: example Do horse kicks follow a Poisson distribution? {#ex-poisson-fit}
For Bortkiewicz's data ([[biostatistics/probability-distributions#ex-horse-poisson]]) the expected frequencies under a Poisson distribution with $\lambda = 0.61$, estimated from the data, were 108.67, 66.29, 20.22, 4.11 and 0.71 for 0, 1, 2, 3 and ≥ 4 deaths. Test the fit.
::: solution
Two expected counts are below 5, so merge the classes 2, 3 and ≥ 4: observed $22 + 3 + 1 = 26$, expected $20.22 + 4.11 + 0.71 = 25.04$. Then
$$
X^2 = \frac{(109 - 108.67)^2}{108.67} + \frac{(65 - 66.29)^2}{66.29} + \frac{(26 - 25.04)^2}{25.04} = 0.0010 + 0.0251 + 0.0367 = 0.063.
$$
There are $k = 3$ classes, and one parameter ($\lambda$) was estimated from the data, so $\nu = 3 - 1 - 1 = 1$, and $P = 0.80$. The Poisson distribution fits well. Had we forgotten to subtract the degree of freedom for $\lambda$, the test would have been too lenient, because fitting a parameter to the data makes the expected counts closer to the observed ones than a true hypothesis would.
:::
:::

### When a fit is too good

The goodness-of-fit test is usually one-sided: only large $X^2$ count against the hypothesis. But a value of $X^2$ that is far *too small* is suspicious too, because it means the data agree with the hypothesis better than sampling variation allows. In 1936 Fisher combined the χ² values from Mendel's experiments and obtained a total of about 41.6 on 84 degrees of freedom: so close a fit would be expected less than once in 10,000 repetitions. He suggested that the data had been adjusted, perhaps by an assistant who knew what Mendel expected. The debate has continued ever since: later analyses (collected by Allan Franklin and colleagues in *Ending the Mendel–Fisher Controversy*, 2008) suggest that unconscious biases in classifying ambiguous seeds, in deciding when to stop counting, or in selecting which experiments to report could account for the pattern without deliberate fraud, and that some of Fisher's assumptions about Mendel's procedure were themselves questionable. The episode is a lesson in the value of reporting all data and all experiments.

## Contingency tables: testing independence {#independence}

Often each unit is classified by two categorical variables at once, and the question is whether they are associated: is the frequency of infection different in two habitats? does survival depend on treatment? are seed shape and seed colour independent? The data form an $r \times c$ **contingency table** of counts $O_{ij}$, with row totals $R_i$, column totals $C_j$ and grand total $N$.

::: proposition The χ² test of independence {#prop-independence}
If the row and column classifications are independent, the expected count in cell $(i, j)$, given the margins, is
$$
E_{ij} = \frac{R_i\,C_j}{N},
$$ {#eq-expected}
and the statistic $X^2 = \sum_{i,j}(O_{ij} - E_{ij})^2/E_{ij}$ approximately follows $\chi^2$ with $(r - 1)(c - 1)$ degrees of freedom. For a $2\times2$ table with cells $a, b$ (first row) and $c, d$ (second row), this simplifies to
$$
X^2 = \frac{N(ad - bc)^2}{(a + b)(c + d)(a + c)(b + d)}.
$$ {#eq-chisq-2x2}
:::

::: proof Expected counts and degrees of freedom
Under independence, $\Prob(\text{row } i \text{ and column } j) = \Prob(\text{row } i)\Prob(\text{column } j)$. Estimating these marginal probabilities by $R_i/N$ and $C_j/N$ and multiplying by $N$ gives [[#eq-expected]]. The table has $rc$ cells, hence $rc - 1$ free proportions given $N$; the independence model is specified by $(r - 1) + (c - 1)$ free marginal proportions. The difference is $rc - 1 - (r-1) - (c-1) = (r-1)(c-1)$.
:::

The degrees of freedom have a concrete meaning: once the margins are fixed, a $2\times2$ table has only one free cell, since the other three follow by subtraction.

::: example Independent assortment as a contingency table {#ex-mendel-independence}
Rearrange Mendel's dihybrid counts as a $2\times2$ table of shape against colour, and test whether the two characters are independent, without assuming the 3 : 1 ratio for either.
::: solution

| | yellow | green | total |
|---|---|---|---|
| round | 315 | 108 | 423 |
| wrinkled | 101 | 32 | 133 |
| total | 416 | 140 | 556 |

Expected counts from [[#eq-expected]]: round yellow $423\times416/556 = 316.49$, round green 106.51, wrinkled yellow 99.51, wrinkled green 33.49. Then $X^2 = 0.116$ on $(2-1)(2-1) = 1$ degree of freedom, $P = 0.73$ (the same from [[#eq-chisq-2x2]]: $556(315\times32 - 108\times101)^2/(423\times133\times416\times140) = 0.116$).

This test asks a different, narrower question from [[#ex-dihybrid]]. The goodness-of-fit test checked three things at once: the 3 : 1 ratio for shape, the 3 : 1 ratio for colour, and their independence. The contingency test checks only independence — that the proportion of yellow seeds is the same among round seeds (315/423 = 0.745) as among wrinkled ones (101/133 = 0.759). Here both tests agree; but if, say, wrinkled seeds survived less well, the goodness-of-fit test could fail while independence held, and the contingency test would locate the problem.
:::
:::

For a $2\times2$ table, Frank Yates (1934) proposed a **continuity correction**, replacing $\lvert ad - bc\rvert$ by $\lvert ad - bc\rvert - N/2$, to compensate for the discreteness of counts. It makes the test conservative (P-values too large), and with modern computers the better course for small tables is Fisher's exact test. A close relative of $X^2$ is the **G-test** (likelihood-ratio test), $G = 2\sum O\ln(O/E)$, which has the same approximate χ² distribution and is favoured by some biologists (Sokal and Rohlf) because $G$ values add up across nested hypotheses; for Mendel's dihybrid data $G = 0.475$, almost identical to $X^2 = 0.470$.

## Fisher's exact test {#fisher-exact}

When the expected counts are small, the χ² approximation is unreliable. Fisher showed how to compute the P-value exactly by conditioning on the margins of the table.

::: proposition Fisher's exact test {#prop-fisher-exact}
In a $2\times2$ table with fixed row totals $R_1, R_2$ and column totals $C_1, C_2$ (grand total $N$), if rows and columns are independent the count $a$ in the top-left cell follows the **hypergeometric distribution**
$$
\Prob(a) = \frac{\binom{R_1}{a}\binom{R_2}{C_1 - a}}{\binom{N}{C_1}}.
$$ {#eq-hypergeometric}
The two-sided P-value is the sum of the probabilities of all tables (with the same margins) that are no more probable than the observed one.
:::

The logic is that of the randomisation test of [[biostatistics/hypothesis-testing#ex-fisher-perm]]: if the treatment had no effect, the $C_1$ "successes" would be the same units whichever group they were in, and the random assignment of units to groups would distribute them like balls drawn from an urn.

::: example The lady tasting tea {#ex-tea}
In *The Design of Experiments*, Fisher described a lady (the algologist Muriel Bristol, at Rothamsted) who claimed she could tell whether milk or tea had been poured into the cup first. He proposed an experiment: eight cups, four of each kind, presented in random order, the lady being told that there are four of each. If she has no ability, what is the probability that she identifies all four milk-first cups correctly? That she gets at least three right?
::: solution
She must choose 4 cups of 8; with no ability, all $\binom84 = 70$ choices are equally likely, and exactly one is entirely correct: $P = 1/70 = 0.014$. The number of milk-first cups among her four choices is hypergeometric, [[#eq-hypergeometric]] with $R_1 = R_2 = C_1 = 4$: $\Prob(3) = \binom43\binom41/70 = 16/70$, so $\Prob(\ge 3) = 17/70 = 0.243$.

A perfect score is significant at the 5 % level; three right out of four is not evidence of anything. Fisher used the example to show how the design — the number of cups, the randomisation, telling her the 4 : 4 split — determines in advance what a result can prove. With six cups (3 + 3) even a perfect score would give only $P = 1/20 = 0.05$. (According to an account by the statistician H. Fairfield Smith, retold by David Salsburg in *The Lady Tasting Tea*, 2001, she identified all eight correctly; Fisher's book does not report the outcome.)
:::
:::

::: example Fisher's test for a small experiment {#ex-fisher-small}
Twenty tadpoles are randomly divided into two groups of 10. One group is exposed to an antifungal treatment, and both groups are then exposed to a chytrid fungus. One treated and seven control tadpoles become infected (hypothetical data). Compare the χ² test and Fisher's exact test.
::: solution

| | infected | not infected | total |
|---|---|---|---|
| treated | 1 | 9 | 10 |
| control | 7 | 3 | 10 |
| total | 8 | 12 | 20 |

Expected counts are 4 and 6 in each row; two of four are below 5, breaking Cochran's rule. The uncorrected χ² from [[#eq-chisq-2x2]] is $20(1\times3 - 9\times7)^2/(10\times10\times8\times12) = 7.50$, $P = 0.0062$; with Yates's correction, $X^2 = 5.21$, $P = 0.022$.

Fisher's exact test: with margins 10, 10, 8, 12, the probabilities of $a = 0, 1, \dots, 8$ infected treated tadpoles are hypergeometric. The observed table ($a = 1$) has probability $\binom{10}{1}\binom{10}{7}/\binom{20}{8} = 10\times120/125\,970 = 0.0095$; adding the equally or less probable tables ($a = 0$, $a = 7$, $a = 8$) gives the two-sided $P = 0.020$.

The uncorrected χ² overstated the evidence threefold. The exact test is the one to report: there is fairly strong evidence that the treatment reduced infection.
:::
:::

## Measuring the strength of association {#effect-sizes}

A P-value says whether an association could be chance; it does not say how strong it is. For a $2\times2$ table of a binary outcome in two groups, there are two standard measures.

::: definition Relative risk and odds ratio {#def-or}
Let $p_1 = a/(a + b)$ and $p_2 = c/(c + d)$ be the proportions with the outcome in groups 1 and 2. The **relative risk** (risk ratio) is $\mathrm{RR} = p_1/p_2$. The **odds** of the outcome in group 1 are $p_1/(1 - p_1) = a/b$, and the **odds ratio** is
$$
\mathrm{OR} = \frac{a/b}{c/d} = \frac{ad}{bc}.
$$ {#eq-or}
Both equal 1 under independence. An approximate 95 % confidence interval for the odds ratio is $\exp\!\left(\ln\mathrm{OR} \pm 1.96\sqrt{1/a + 1/b + 1/c + 1/d}\right)$ (Woolf, 1955).
:::

The relative risk is easier to interpret ("treated tadpoles were infected one-seventh as often"), but the odds ratio has two technical advantages: it is the same whether one compares the outcome between groups or the groups between outcomes, so it can be estimated from **case–control** samples in which the outcome frequencies are fixed by design; and it is the natural parameter of logistic regression ([[biostatistics/linear-models]]). When the outcome is rare, the two are nearly equal. For the tadpoles, $\mathrm{RR} = 0.1/0.7 = 0.14$ and $\mathrm{OR} = (1\times3)/(9\times7) = 0.048$, with 95 % interval 0.004 to 0.56 — very imprecise, as twenty animals must be. Risk differences, numbers needed to treat and the use of these measures in clinical studies are treated in [Medicine Atlas: measuring disease](/learn/medicine/lesson.php?c=epidemiology-ebm&l=measuring-disease).

::: quiz
In a field survey, 30 of 120 frogs from ponds with fish carry a parasite, compared with 10 of 80 frogs from ponds without fish. Which statement is correct?
- [ ] The odds ratio is 2.0, the same as the relative risk.
- [x] The relative risk is 2.0 (0.25 against 0.125), and the odds ratio is 2.33.
- [ ] Because the frogs were not randomised, no χ² test can be done.
- [ ] The χ² test needs the counts converted to percentages first.
::: solution
$p_1 = 30/120 = 0.25$, $p_2 = 10/80 = 0.125$, so $\mathrm{RR} = 2.0$; the odds are $30/90 = 0.333$ and $10/70 = 0.143$, so $\mathrm{OR} = 2.33$. The odds ratio is further from 1 than the relative risk whenever the outcome is common. A χ² test of association is valid for survey data, but an association in an observational survey does not show that fish cause parasitism; ponds with fish may differ in many other ways ([[biostatistics/experimental-design]]).
:::
:::

### Paired categorical data

Before-and-after classifications of the same units — whether each of 50 plants is infested before and after a biological-control release, or whether each of a set of matched pairs survives — are not independent samples. **McNemar's test** (Quinn McNemar, 1947) uses only the discordant pairs: if $b$ units changed one way and $c$ the other, then under $H_0$ each discordant pair is equally likely to go either way, and $(b - c)^2/(b + c)$ is approximately $\chi^2_1$ (or $b$ can be referred exactly to $\Bin(b + c, \tfrac12)$). It is the categorical counterpart of the paired t-test.

## Pooling tables: Simpson's paradox {#simpson}

::: example Seedling survival at two sites {#ex-simpson}
A forester tests a seed coating on two sites, a good one and a poor one (hypothetical data). Survival of seedlings:

| site | coated | uncoated |
|---|---|---|
| good | 45 / 50 (90 %) | 170 / 200 (85 %) |
| poor | 120 / 200 (60 %) | 25 / 50 (50 %) |
| both sites pooled | 165 / 250 (66 %) | 195 / 250 (78 %) |

Is the coating beneficial?
::: solution
At each site the coated seedlings survive *better* (90 against 85 %, and 60 against 50 %). Pooled, they survive *worse* (66 against 78 %). The reversal arises because most coated seeds were planted on the poor site and most uncoated seeds on the good one: site affects survival and is associated with treatment, so pooling mixes the effect of the coating with the effect of the site. The site-specific comparisons are the relevant ones; the coating appears beneficial. A combined test that respects the strata, such as the Cochran–Mantel–Haenszel test or a logistic regression with site as a factor ([[biostatistics/linear-models]]), would be the right analysis — and the right design would have allocated coated and uncoated seeds in equal proportions at each site, at random ([[biostatistics/experimental-design]]).
:::
:::

This is **Simpson's paradox** (described by Edward Simpson in 1951, and earlier by Udny Yule in 1903): an association in every subgroup can vanish or reverse when the subgroups are combined. It is the categorical face of **confounding**, which is treated for clinical data in [Medicine Atlas: bias and confounding](/learn/medicine/lesson.php?c=epidemiology-ebm&l=bias-confounding).

::: warning "A significant χ² shows that one variable affects the other"
A test of independence detects association, not causation, and it does not say which variable depends on which. Seed shape and colour could be associated because the genes are linked, because one phenotype affects the scoring of the other, or because seeds from different plants were pooled. In observational tables, a third variable (site, age, season, observer) can create, hide or reverse an association, as in Simpson's paradox. Causal conclusions require randomised experiments or careful causal reasoning about confounders.
:::

::: application Hardy–Weinberg tests in population genetics
For a gene with two alleles, a sample of genotypes $n_{AA}$, $n_{Aa}$, $n_{aa}$ is compared with the Hardy–Weinberg proportions $p^2 : 2pq : q^2$, where $p$ is estimated from the sample as $(2n_{AA} + n_{Aa})/2n$. Three classes, minus one, minus one estimated parameter, leaves one degree of freedom. A deficit of heterozygotes can indicate inbreeding, population subdivision (the Wahlund effect) or, very commonly in modern genotyping, technical failures such as null alleles; genome-wide data sets routinely use departures from Hardy–Weinberg as a quality filter. Because genotype counts at rare variants are small, the exact test of Wigginton, Cutler and Abecasis (2005), the analogue of Fisher's exact test, has replaced the χ² approximation. The theory is developed in [[population-genetics/hardy-weinberg]].
:::

::: history
Karl Pearson introduced the χ² goodness-of-fit test in a 1900 paper in the *Philosophical Magazine*, one of the founding documents of modern statistics; his examples included Walter Weldon's records of thousands of throws of dice. He applied the same statistic to contingency tables, but with the wrong degrees of freedom, and Ronald Fisher's correction (1922, 1924) — that estimated parameters reduce the degrees of freedom — began their long feud. Frank Yates proposed his continuity correction in 1934. Fisher's exact test appeared in the 1934 edition of *Statistical Methods for Research Workers*, with the tea-tasting experiment in *The Design of Experiments* (1935); Joseph Irwin and Frank Yates derived the same test independently around the same time. Fisher's critique of Mendel's data was published in 1936. Barnet Woolf gave the confidence interval for the odds ratio in 1955, and Nathan Mantel and William Haenszel their stratified test in 1959.
:::

::: summary
- Goodness of fit: $X^2 = \sum(O - E)^2/E$ with $\nu = k - 1 - (\text{parameters estimated})$; compute it from counts, never percentages.
- Mendel's dihybrid cross (315, 108, 101, 32): $X^2 = 0.470$, $\nu = 3$, $P = 0.93$ for 9 : 3 : 3 : 1.
- Horse kicks against a fitted Poisson: $X^2 = 0.063$, $\nu = 1$, $P = 0.80$; each estimated parameter costs a degree of freedom.
- Independence in an $r\times c$ table: $E_{ij} = R_iC_j/N$, $\nu = (r-1)(c-1)$.
- With small expected counts (Cochran: none < 1, at most 20 % < 5) use Fisher's exact (hypergeometric) test; the lady tasting tea needs all four right ($P = 1/70$).
- Report the strength of association: relative risk $p_1/p_2$ and odds ratio $ad/bc$, with confidence intervals.
- Paired categorical data: McNemar's test on the discordant pairs.
- Pooling strata can reverse associations (Simpson's paradox); association is not causation.
:::

## Exercises

::: exercise A monohybrid ratio {level=1 check="0.263"}
Mendel counted 5474 round and 1850 wrinkled seeds. Calculate $X^2$ for the 3 : 1 hypothesis to three significant figures.
::: solution
$E = 5493$ and 1831. $X^2 = 19^2/5493 + 19^2/1831 = 0.0657 + 0.1972 = 0.263$, on 1 degree of freedom ($P = 0.61$).
:::
:::

::: exercise An expected count {level=1 check="24"}
In a $2\times3$ table with $N = 200$, the first row totals 80 and the second column totals 60. What is the expected count in cell (1, 2) under independence?
::: solution
$E_{12} = 80\times60/200 = 24$.
:::
:::

::: exercise Degrees of freedom {level=1 check="6"}
A survey classifies 400 beetles by species (4 species) and by habitat (3 habitats). How many degrees of freedom does the χ² test of independence have?
::: solution
$(4 - 1)(3 - 1) = 6$.
:::
:::

::: exercise An odds ratio {level=2 check="2.33"}
Calculate the odds ratio for the frog survey of the quick check (30 of 120 parasitised with fish, 10 of 80 without) to three significant figures.
::: solution
$\mathrm{OR} = (30\times70)/(90\times10) = 2100/900 = 2.33$.
:::
:::

::: exercise A binomial test of a sex ratio {level=2 check="0.115"}
A clutch of 20 turtle eggs incubated at a single temperature produces 14 females and 6 males. Calculate the exact two-sided binomial P-value for $H_0\colon$ sex ratio 1 : 1, to three significant figures.
::: solution
Under $H_0$, $X \sim \Bin(20, \tfrac12)$. $\Prob(X \ge 14) = \sum_{k=14}^{20}\binom{20}{k}/2^{20} = 60\,460/1\,048\,576 = 0.0577$, and by symmetry the two-sided $P = 0.115$. (Moreover, eggs in one clutch share a mother and a nest, so they are not fully independent; the test is about this clutch.)
:::
:::

::: exercise A Hardy–Weinberg test {level=2}
A sample of 200 plants contains 88 *AA*, 80 *Aa* and 32 *aa*. Estimate the allele frequency $p$ of *A*, compute the expected Hardy–Weinberg counts, and test the fit.
::: answer
$p = 0.64$; expected 81.92, 92.16, 25.92; $X^2 = 3.48$ on 1 df, $P = 0.062$.
:::
::: solution
$p = (2\times88 + 80)/400 = 256/400 = 0.64$, $q = 0.36$. Expected: $200p^2 = 81.92$, $200\times2pq = 92.16$, $200q^2 = 25.92$. $X^2 = 6.08^2/81.92 + 12.16^2/92.16 + 6.08^2/25.92 = 0.451 + 1.604 + 1.426 = 3.48$. With $3 - 1 - 1 = 1$ degree of freedom, $P = 0.062$: a heterozygote deficit that is suggestive but not significant at 5 %. One would check the genotyping and the possibility of population structure before interpreting it.
:::
:::

::: exercise Too few cups {level=3}
(a) In Fisher's tea experiment with $2m$ cups ($m$ of each kind), what is the probability of a perfect score by guessing? (b) What is the smallest $m$ for which a perfect score is significant at the 1 % level? (c) Fisher's design told the lady there were four cups of each kind. Suppose instead each of 8 cups were independently milk-first or tea-first with probability ½ and she had to classify each. What is the probability of a perfect score by guessing, and what is gained and lost by this design?
::: solution
(a) $1/\binom{2m}{m}$.
(b) $\binom63 = 20$ ($P = 0.05$), $\binom84 = 70$ ($P = 0.014$), $\binom{10}{5} = 252$ ($P = 0.0040$). So $m = 5$, ten cups.
(c) $(1/2)^8 = 1/256 = 0.0039$: more cups' worth of information, because each judgement is a separate binary trial. The gain is a smaller P-value for a perfect score; the loss is that the numbers of each kind are random (it could happen that 7 of 8 are milk-first, making the test feel unbalanced), and the test no longer controls for a lady who is biased towards saying "milk first". Fisher's design makes the analysis depend only on her ability to rank cups, and its margins are fixed by the experimenter.
:::
:::

::: exercise Detecting linkage {level=3}
A testcross *AaBb* × *aabb* gives 200 offspring: 62 *AB*, 38 *Ab*, 41 *aB* and 59 *ab* (phenotypic classes). (a) Test the fit to the 1 : 1 : 1 : 1 ratio expected for unlinked genes. (b) Test independence of the two loci in a $2\times2$ table. (c) Estimate the recombination fraction and explain why the two tests can differ in what they detect.
::: solution
(a) $E = 50$ for each; $X^2 = (144 + 144 + 81 + 81)/50 = 9.00$ on 3 df, $P = 0.029$.
(b) Table: rows *A*/*a* (100, 100), columns *B*/*b* (103, 97). Expected: 51.5, 48.5, 51.5, 48.5. From [[#eq-chisq-2x2]], $X^2 = 200(62\times59 - 38\times41)^2/(100\times100\times103\times97) = 200(3658 - 1558)^2/99\,910\,000 = 200\times4\,410\,000/99\,910\,000 = 8.83$ on 1 df, $P = 0.003$.
(c) Recombinants are *Ab* and *aB*: $(38 + 41)/200 = 0.395$, below 0.5, so the loci appear linked at about 40 map units ([[genetics/linkage-mapping]]). The four-class goodness-of-fit test spreads the linkage signal over 3 degrees of freedom together with any segregation distortion at each locus; the $2\times2$ test concentrates on the one thing linkage changes, the association between loci, and is therefore more powerful for detecting it. Both give evidence of linkage here, but the targeted test is far stronger.
:::
:::
