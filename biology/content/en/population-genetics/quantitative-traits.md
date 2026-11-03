Height, milk yield, flowering time, beak depth, blood pressure: most traits that matter in agriculture, evolution and human biology do not fall into Mendelian classes. They vary continuously, run in families without simple ratios, and respond to the environment. In the early twentieth century this seemed to set the "biometricians", who measured resemblance between relatives statistically, against the Mendelians, who studied discrete characters. The conflict was resolved by showing that continuous variation is what many Mendelian loci of small effect, plus environmental variation, produce: Wilhelm Johannsen's pure lines of beans (1903) separated heritable from environmental variation, Herman Nilsson-Ehle (1909) explained graded kernel colour in wheat by several loci, Edward East (1916) did the same for flower length in tobacco, and R. A. Fisher's paper of 1918 showed mathematically that Mendelian inheritance at many loci predicts exactly the correlations between relatives that the biometricians had measured.

The genetic model for one locus was introduced in [[genetics/extensions-of-mendel]] and the breeder's equation in [[evolution/natural-selection]]. This chapter builds the theory that connects them, following the framework of Fisher and of D. S. Falconer's textbook. We define genotypic values; partition the genetic variance of a trait into additive and dominance components, which requires the concept of the average effect of an allele; derive the covariances between relatives; and use them to estimate heritability. We then examine what heritability means and does not mean, and see how modern genomic studies have confirmed Fisher's picture of highly polygenic traits. The use of this theory to predict evolution under selection is the subject of [[population-genetics/response-to-selection]].

## Phenotypic value and its components

::: definition Phenotypic, genotypic and environmental values {#def-pge}
The **phenotypic value** $P$ of an individual (its measured trait value) is written as the sum of a **genotypic value** $G$, the mean phenotype of individuals of that genotype over the environments of the population, and an **environmental deviation** $E$, with mean zero:

$$
P = G + E,\qquad V_P = V_G + V_E + 2\Cov(G, E).
$$ {#eq-pge}

If genotypes are distributed at random over environments, $\Cov(G, E) = 0$. If the effect of the environment differs between genotypes, an additional **genotype–environment interaction** variance $V_{G\times E}$ appears.
:::

The decomposition is a statistical one, defined relative to a population and a set of environments. It does not say that a trait is "made of" a genetic part and an environmental part in each individual — a point we return to.

### One locus: genotypic values

Consider one locus with alleles $A_1$ (frequency $p$) and $A_2$ (frequency $q$) in Hardy–Weinberg proportions. Measure genotypic values from the midpoint between the two homozygotes:

| genotype | $A_1A_1$ | $A_1A_2$ | $A_2A_2$ |
|---|---|---|---|
| frequency | $p^2$ | $2pq$ | $q^2$ |
| genotypic value | $+a$ | $d$ | $-a$ |

Here $a$ is half the difference between the homozygotes and $d$ the **dominance deviation** of the heterozygote: $d = 0$ means additive (no dominance), $d = a$ complete dominance of $A_1$, $\lvert d\rvert > a$ overdominance. The population mean is

$$
M = a(p^2 - q^2) + 2pqd = a(p - q) + 2pqd.
$$ {#eq-mean}

The first term is the contribution of the homozygotes, the second of the heterozygotes. We met this formula in [[population-genetics/inbreeding]], where inbreeding reduced the heterozygote term to $2pqd(1 - F)$.

## Average effects and breeding values

Parents pass on alleles, not genotypes: an offspring receives one allele from each parent, and the other comes from its other parent. To predict offspring from parents, we need the **average effect** of an allele — how much, on average, carrying it changes the phenotype in the population.

::: definition Average effect, breeding value and dominance deviation {#def-alpha}
The **average effect of the gene substitution** is the slope $\alpha$ of the least-squares regression of genotypic value on the number of $A_1$ alleles (0, 1 or 2) in the population. Its value is

$$
\alpha = a + d(q - p).
$$ {#eq-alpha}

The **breeding value** (additive genetic value) $A$ of a genotype is the value predicted by this regression, measured from the population mean: $A_{11} = 2q\alpha$, $A_{12} = (q - p)\alpha$, $A_{22} = -2p\alpha$. The **dominance deviation** $D$ is the residual, $G - M - A$.
:::

::: proposition Additive and dominance variance at one locus {#prop-va}
With random mating, the genotypic variance at one locus splits into uncorrelated additive and dominance parts:

$$
V_G = V_A + V_D,\qquad V_A = 2pq\,\alpha^2 = 2pq\,[a + d(q - p)]^2,\qquad V_D = (2pqd)^2.
$$ {#eq-va}
:::

::: proof
Let $X \in \{0, 1, 2\}$ be the number of $A_1$ alleles; under Hardy–Weinberg proportions $X$ is binomial with 2 trials and probability $p$, so $\E[X] = 2p$ and $\Var(X) = 2pq$. The covariance of $G$ with $X$ is

$$
\Cov(G, X) = p^2\cdot a\cdot2 + 2pq\cdot d\cdot1 + q^2\cdot(-a)\cdot0 - M\cdot2p.
$$

Using $M = a(p - q) + 2pqd$: $2p^2a + 2pqd - 2pa(p - q) - 4p^2qd = 2pqa + 2pqd(1 - 2p) = 2pq[a + d(q - p)]$. The regression slope is $\alpha = \Cov(G, X)/\Var(X) = a + d(q - p)$, which is [[#eq-alpha]]. The variance explained by the regression is $\alpha^2\Var(X) = 2pq\alpha^2 = V_A$, and least-squares residuals are uncorrelated with the predictor, so $V_G = V_A + V_D$ with $V_D$ the variance of the residuals. Computing it directly: the residual for $A_1A_2$ is $d - M - (q - p)\alpha$, and similarly for the homozygotes; the algebra simplifies to $D_{11} = -2q^2d$, $D_{12} = 2pqd$, $D_{22} = -2p^2d$, whose variance is $p^2\cdot4q^4d^2 + 2pq\cdot4p^2q^2d^2 + q^2\cdot4p^4d^2 = 4p^2q^2d^2(q^2 + 2pq + p^2) = (2pqd)^2$.
:::

Under random mating, the average effect also equals the average excess of [[population-genetics/selection-models]]: the difference between the mean phenotype of carriers of $A_1$ and of $A_2$, counting each allele copy. Two features of [[#eq-va]] matter for everything that follows.

- **Dominance contributes to the additive variance.** Even a completely dominant allele has $\alpha \neq 0$ unless $p = 0$ or $1$; its effect on the population mean when substituted is what an offspring inherits. Additive variance is not "the variance due to additive genes".
- **Variance components depend on allele frequencies.** The same locus, with the same $a$ and $d$, contributes very different $V_A$ and $V_D$ in populations with different $p$. A recessive allele that is rare contributes almost nothing to either; heritability is therefore a property of a population, not of a trait.

::: example Variance components at one locus {#ex-va}
A locus affects body weight in mice: $A_1A_1$ averages 20 g, $A_1A_2$ 18 g and $A_2A_2$ 10 g. The frequency of $A_1$ is 0.4. Find $a$, $d$, the mean, the average effect, $V_A$ and $V_D$, and check that they sum to $V_G$.
::: solution
The midpoint is 15 g, so $a = 5$ g and $d = 3$ g ($A_1$ is partially dominant). By [[#eq-mean]], $M = 5(0.4 - 0.6) + 2\times0.24\times3 = -1 + 1.44 = 0.44$ g above the midpoint, i.e. 15.44 g. By [[#eq-alpha]], $\alpha = 5 + 3\times(0.6 - 0.4) = 5.6$ g. Then $V_A = 2\times0.4\times0.6\times5.6^2 = 0.48\times31.36 = 15.05$ g² and $V_D = (0.48\times3)^2 = 2.07$ g².

Directly: $V_G = 0.16(20 - 15.44)^2 + 0.48(18 - 15.44)^2 + 0.36(10 - 15.44)^2 = 0.16\times20.79 + 0.48\times6.55 + 0.36\times29.59 = 3.33 + 3.15 + 10.65 = 17.13$ g², equal to $15.05 + 2.07$. Most of the genetic variance (88 %) is additive, even though the locus shows substantial dominance.
:::
:::

::: widget plot
f: 2*x*(1 - x)*(a + d*(1 - 2*x))^2; (2*x*(1 - x)*d)^2
x: 0, 1
sliders: a=1:0:2:0.05; d=0:-2:2:0.05
labels: V_A; V_D
caption: Additive variance $V_A = 2pq[a + d(q - p)]^2$ and dominance variance $V_D = (2pqd)^2$ at one locus against the frequency $p$ of $A_1$, for homozygote effect $a$ and dominance deviation $d$. With $d = 0$ all the genetic variance is additive and peaks at $p = 0.5$. Set $d = a = 1$ (complete dominance of $A_1$): $V_A$ peaks when the recessive allele $A_2$ is at intermediate-to-high frequency, falls to zero at $p = 1$, and $V_D$ is largest at $p = 0.5$. Set $d$ larger than $a$ (overdominance) and $V_A$ drops to zero at an intermediate frequency where $\alpha = 0$: the locus then contributes genetic variance but no resemblance between parents and offspring.
:::

### Many loci

For a trait affected by many loci, the additive and dominance variances add over loci, provided the loci are in linkage equilibrium and do not interact. Interactions between loci (**epistasis**) add **interaction variance** $V_I$, itself partitioned into additive × additive, additive × dominance and higher terms:

$$
V_G = V_A + V_D + V_I.
$$ {#eq-vg}

A remarkable empirical regularity is that, even when gene action involves strong dominance and epistasis at the level of individual loci, most of the genetic variance in a population is usually *additive*, because rare and common alleles contribute mainly through their average effects (William Hill, Michael Goddard and Peter Visscher, 2008). This is one reason the additive model works so well in breeding.

## Resemblance between relatives

Relatives resemble each other because they share alleles identical by descent ([[population-genetics/inbreeding]]). The covariance between relatives' phenotypes is the tool for estimating the variance components.

::: proposition Genetic covariances between relatives {#prop-cov}
In a non-inbred, random-mating population, with no epistasis and no shared environment between relatives, the covariance of the phenotypes of two relatives $X$ and $Y$ is

$$
\Cov(P_X, P_Y) = 2f_{XY}\,V_A + \Delta_{XY}\,V_D,
$$ {#eq-cov}

where $f_{XY}$ is their coefficient of kinship and $\Delta_{XY}$ the probability that they share both alleles at a locus IBD. In particular:

| relationship | $2f_{XY}$ | $\Delta_{XY}$ | covariance |
|---|---|---|---|
| parent–offspring | $\tfrac12$ | 0 | $\tfrac12V_A$ |
| half-sibs | $\tfrac14$ | 0 | $\tfrac14V_A$ |
| full sibs | $\tfrac12$ | $\tfrac14$ | $\tfrac12V_A + \tfrac14V_D$ |
| monozygotic twins | 1 | 1 | $V_A + V_D$ |
| offspring and mid-parent | — | — | $\tfrac12V_A$ |
:::

::: proof
We prove the parent–offspring case, which is the key one; the others follow similarly from the IBD probabilities. Consider one locus. An offspring's genotypic value is $G_O = A_O + D_O$, and its breeding value is the sum of the average effects of the two alleles it received, one from each parent. The allele received from parent $X$ is a random one of $X$'s two alleles, so its expected average effect, given $X$, is half of $X$'s breeding value: $\E[A_O \mid X] = \tfrac12A_X + \tfrac12\E[A_\text{other parent}] = \tfrac12A_X$. Dominance deviations depend on the combination of two alleles, and the offspring's combination is new (one allele is from the other parent, unrelated to $X$), so $D_O$ is uncorrelated with $X$'s genotype. Hence $\Cov(G_X, G_O) = \Cov(A_X + D_X, \tfrac12A_X) = \tfrac12V_A$, using $\Cov(A, D) = 0$. Environmental deviations are uncorrelated by assumption. For full sibs, the probability that they share both alleles IBD is $\tfrac14$ (each parent gave both the same allele), in which case they share the dominance deviation, contributing $\tfrac14V_D$. For the mid-parent $\bar P = \tfrac12(P_M + P_F)$, $\Cov(\bar P, P_O) = \tfrac12(\tfrac12V_A + \tfrac12V_A) = \tfrac12V_A$.
:::

### Heritability

::: definition Heritability {#def-h2}
The **broad-sense heritability** is $H^2 = V_G/V_P$, the proportion of phenotypic variance due to all genetic differences. The **narrow-sense heritability** is

$$
h^2 = \frac{V_A}{V_P},
$$ {#eq-h2}

the proportion due to additive genetic variance. It determines the resemblance between parents and offspring and the response to selection, and is what "heritability" means unless stated otherwise. (Jay Lush introduced the terms in 1937.)
:::

Since the variance of the mid-parent value is $\tfrac12V_P$ (with random mating and parents uncorrelated), the regression of offspring on mid-parent has slope

$$
b_{O\bar P} = \frac{\Cov(\bar P, P_O)}{\Var(\bar P)} = \frac{\tfrac12V_A}{\tfrac12V_P} = h^2,
$$ {#eq-regression}

and the regression of offspring on a single parent has slope $\tfrac12h^2$. This is the most direct way to estimate heritability, and it is how Francis Galton, without any genetic theory, first quantified "regression towards the mean" in human height in 1886: offspring of tall parents are tall, but less extreme than their parents by the factor $h^2$.

::: example Heritability from a parent–offspring regression {#ex-po}
In a population of song sparrows (illustrative values), the variance of mid-parent tarsus length is 0.31 mm² and the covariance between mid-parent and offspring tarsus length (offspring raised in the same area as parents) is 0.22 mm². Estimate $h^2$. What would the slope of offspring on the father alone be expected to be? What could bias the estimate?
::: solution
$h^2 = 0.22/0.31 = 0.71$. The regression on one parent should have slope about $0.35$.

Biases: shared environment between parents and offspring (territory quality, food provided by the parents) inflates the covariance; **extra-pair paternity**, common in songbirds, means some social fathers are not the genetic fathers and reduces the father–offspring covariance (the mother–offspring regression is unaffected); maternal effects (egg size, provisioning) inflate the mother–offspring covariance. Cross-fostering experiments, in which eggs are swapped between nests, separate genetic from rearing effects, and pedigree-based "animal models" use all relationships at once.
:::
:::

The following program checks [[#eq-regression]] by simulating an additive trait determined by 100 loci with random effects, Mendelian transmission and environmental noise set to give $h^2 = 0.5$, and regressing offspring on mid-parent in 2,000 families.

```python
import random, statistics as st

def simulate(n_fam=2000, loci=100, h2=0.5, seed=1):
    """Additive polygenic trait; returns slope of offspring on mid-parent."""
    rng = random.Random(seed)
    p = [rng.uniform(0.1, 0.9) for _ in range(loci)]
    effect = [rng.gauss(0, 1) for _ in range(loci)]
    def genome():                                   # two allele indicators per locus
        return [(rng.random() < pi, rng.random() < pi) for pi in p]
    def g_value(gen):
        return sum(e * (a + b) for e, (a, b) in zip(effect, gen))
    VA = sum(2 * pi * (1 - pi) * e * e for pi, e in zip(p, effect))   # additive variance
    sd_e = (VA * (1 - h2) / h2) ** 0.5                                # environmental SD
    mid, kid = [], []
    for _ in range(n_fam):
        mum, dad = genome(), genome()
        child = [(rng.choice(m), rng.choice(d)) for m, d in zip(mum, dad)]   # Mendelian transmission
        P = [g_value(x) + rng.gauss(0, sd_e) for x in (mum, dad, child)]
        mid.append((P[0] + P[1]) / 2)
        kid.append(P[2])
    return st.covariance(mid, kid) / st.variance(mid)

print(round(simulate(), 3))    # 0.536
```

The estimated slope, 0.54, agrees with the true $h^2 = 0.5$ within its standard error of about 0.03.

::: widget regression
points: 9.2,9.5; 9.6,9.4; 9.9,10.1; 10.1,9.8; 10.3,10.4; 10.5,10.2; 10.8,10.7; 11.0,10.5; 9.4,9.9; 10.0,10.3; 10.6,10.0; 11.2,10.9
degree: 1
residuals: true
caption: A small set of mid-parent (horizontal) and offspring (vertical) trait values, in arbitrary units, with the least-squares line. By [[#eq-regression]] its slope estimates the narrow-sense heritability $h^2$; here it is about 0.6. Drag points to see how strongly a dozen families' slope depends on single families, and how an outlying family with extreme parents pulls the line. Real heritability estimates use hundreds of families, and the slope's standard error falls roughly as $1/\sqrt{\text{number of families}}$.
:::

### Twins and other designs

In humans, experiments are impossible and environments are shared within families, so heritability is estimated by comparing relatives of different degrees in the same environments. The **classical twin design** compares monozygotic (MZ) twins, who share all their genes, with dizygotic (DZ) twins, who share half on average; both pairs share their family environment. If $c^2$ is the fraction of variance due to the shared family environment and dominance is ignored, the correlations are $r_\mathrm{MZ} = h^2 + c^2$ and $r_\mathrm{DZ} = \tfrac12h^2 + c^2$, so

$$
h^2 \approx 2(r_\mathrm{MZ} - r_\mathrm{DZ}),\qquad c^2 \approx 2r_\mathrm{DZ} - r_\mathrm{MZ},\qquad e^2 = 1 - r_\mathrm{MZ}
$$ {#eq-twins}

(**Falconer's formula**). Here $h^2$ includes any dominance and epistasis, because MZ twins share those too. The design assumes that the shared environment is equally similar for MZ and DZ pairs, that there is no assortative mating (which raises $r_\mathrm{DZ}$) and no gene–environment interaction; these assumptions are its main weakness, and estimates are checked against other designs such as adoption studies and, now, genomic methods.

::: example A twin study {#ex-twins}
For a trait, the correlation between MZ twins is 0.80 and between DZ twins 0.45. Estimate $h^2$, $c^2$ and $e^2$. What would $r_\mathrm{DZ} > \tfrac12r_\mathrm{MZ}$ and $r_\mathrm{DZ} < \tfrac12r_\mathrm{MZ}$ each suggest?
::: solution
$h^2 = 2(0.80 - 0.45) = 0.70$, $c^2 = 0.90 - 0.80 = 0.10$, $e^2 = 0.20$. Since $r_\mathrm{DZ} = 0.45 > 0.40 = \tfrac12r_\mathrm{MZ}$, a shared family environment is suggested. If instead $r_\mathrm{DZ}$ were below $\tfrac12r_\mathrm{MZ}$, Falconer's formula would give $c^2 < 0$, which is impossible; the usual interpretation is non-additive genetic variance (dominance or epistasis), which MZ twins share fully but DZ twins only partly ($\tfrac14V_D$). Note that $e^2$ includes measurement error, which is often substantial.
:::
:::

### Experimental partitioning with inbred lines

In plants and laboratory animals, the environmental variance can be measured directly. Individuals of a highly inbred line are genetically identical, so their phenotypic variance is $V_E$; so is that of the F1 between two inbred lines, all of which have the same heterozygous genotype. The F2 segregates and has variance $V_G + V_E$. This is the logic Johannsen used with his bean lines.

::: example Inbred lines and their cross {#ex-lines}
Two inbred lines of a plant have mean heights 20 cm and 8 cm, each with variance 2.0 cm²; their F1 has variance 2.1 cm²; the F2 has variance 6.0 cm². Estimate the genetic variance and broad-sense heritability in the F2. If all loci act additively, are unlinked and each has the same effect, with all "+" alleles in the tall line, estimate the number of loci.
::: solution
$V_E \approx (2.0 + 2.0 + 2.1)/3 = 2.03$ cm², so $V_G(\mathrm{F2}) = 6.0 - 2.03 = 3.97$ cm² and $H^2 = 3.97/6.0 = 0.66$.

For $n$ equal additive loci with the lines differing by $2a$ at each, the parental difference is $2na = 12$ cm and the F2 genetic variance is $n\cdot\tfrac12a^2$ (each locus contributes $2pq\alpha^2$ with $p = \tfrac12$, $\alpha = a$). Then $(2na)^2/(8\,V_G) = 4n^2a^2/(4na^2) = n$, the **Castle–Wright estimator**: $n = 12^2/(8\times3.97) = 144/31.8 = 4.5$. Because unequal effects, linkage and dispersion of "+" alleles between the lines all make the estimate too small, it is a *minimum* number of effective loci. Modern QTL mapping and genomic studies usually find many more loci than such estimates suggest.
:::
:::

## What heritability does and does not mean

::: warning Heritability is not "how genetic a trait is"
- **It is a ratio of variances in a particular population and environment.** Change the environment — reduce its variability, or change the allele frequencies — and $h^2$ changes. A trait can have high heritability in a uniform environment and low heritability in a variable one.
- **It says nothing about individuals.** "A heritability of 0.8" does not mean that 80 % of a person's height is due to genes; the decomposition [[#eq-pge]] is defined only for variation among individuals.
- **High heritability does not mean a trait cannot be changed.** Human height is highly heritable within populations, yet average height in many countries rose by about 10 cm or more during the twentieth century as nutrition and health improved — an environmental change acting on every genotype.
- **Heritability within groups says nothing about differences between groups.** Richard Lewontin's (1970) illustration: plant a genetically variable seed mix in two fields, one with rich soil and one with poor. Within each field, height differences may be largely genetic, but the difference in average height *between* the fields is entirely environmental.
:::

::: quiz
In a herd of cattle all fed the same diet, the heritability of milk yield is 0.3. The farmer switches to a better feed, raising every cow's yield by 15 %. What happens to the heritability, approximately?
- [ ] It rises, because the cows now express more of their genetic potential.
- [ ] It falls to zero, because the change was environmental.
- [x] It stays about the same if the feed raised all genotypes proportionally and environmental variability is unchanged.
- [ ] It cannot be defined after an environmental change.
::: solution
Heritability depends on the variances, not the mean. A uniform improvement shifts every value without changing the relative contributions of genetic and environmental variation (a proportional increase scales $V_A$ and $V_E$ by the same factor). If the new feed interacted with genotype — helping some cows more than others — $V_A$ or $V_{G\times E}$ could change, and so would $h^2$.
:::
:::

### Genotype–environment interaction and norms of reaction

When genotypes respond differently to environments, the effect of a genotype cannot be summarised by one number. The **norm of reaction** of a genotype is its phenotype as a function of the environment. Jens Clausen, David Keck and William Hiesey (1940s) grew clones of yarrow, *Achillea*, collected at different altitudes in California, in gardens at sea level, mid-elevation and alpine sites; the ranking of clones by height often changed between gardens. When norms of reaction cross, $V_{G\times E}$ is large and the "best" genotype depends on the environment — central to plant breeding, where varieties are tested across many sites.

### Threshold traits

Some traits are discrete — present or absent — but inherited like quantitative traits: the number of digits in guinea pigs, studied by Sewall Wright (1934), twinning in cattle, and susceptibility to many common conditions. The **liability-threshold model** (developed by Falconer in 1965) assumes an underlying continuous, normally distributed **liability**, influenced by many genes and environmental factors, with the trait appearing when liability exceeds a threshold. The proportion affected then fixes the threshold's position, and the increased frequency among relatives of affected individuals measures the heritability of liability.

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: 2.326
b: 5
caption: The liability-threshold model. Liability is normally distributed (standardised to mean 0, standard deviation 1), and individuals with liability above the threshold, here at 2.326 standard deviations, show the trait: the shaded area is 1 % of the population. Relatives of affected individuals have liability shifted upwards by an amount proportional to the heritability of liability and their relatedness, so a larger fraction of them lies beyond the same threshold. Move the threshold $a$ to see how incidence depends on its position: a shift of only half a standard deviation in mean liability raises the incidence beyond 2.326 from 1 % to about 3 %.
:::

## Finding the genes: from QTL to GWAS

Fisher's 1918 model assumed "a great number" of loci, but for most of the twentieth century the genes behind quantitative traits were unknown. **QTL mapping** in crosses between inbred lines (from the 1980s, with molecular markers) located regions of the genome with substantial effects, and some were identified at the level of single genes: for example, the gene *tb1* (*teosinte branched1*), whose regulatory change contributed to the reduced branching of maize compared with its ancestor teosinte (John Doebley and colleagues, 1997). But crosses detect only loci that differ between the parental lines and have large enough effects.

In outbred populations, **genome-wide association studies** test hundreds of thousands to millions of SNPs in large samples ([[genomics/association-studies]]). They have shown that most quantitative traits are extraordinarily **polygenic**. Human height is the best-studied example: twin and family studies estimate its heritability at about 0.8; a study of 5.4 million people published in 2022 (Loïc Yengo and colleagues) identified about 12,000 independent associated SNPs, which together explained about 40–45 % of the phenotypic variance in people of European ancestry, and less in other ancestries. Much of the gap between family-based and SNP-based heritability (the "missing heritability") is attributed to many variants of small effect not yet detected, rare variants poorly captured by arrays, and imperfect LD between markers and causal variants; part may reflect biases in family-based estimates.

::: application Genomic prediction in breeding
Breeders have always estimated breeding values from relatives' phenotypes using the additive relationship matrix derived from pedigrees ([[population-genetics/inbreeding]]). Since Theo Meuwissen, Ben Hayes and Michael Goddard's 2001 proposal, they increasingly use **genomic prediction**: the effects of tens of thousands of markers are estimated jointly in a reference population with phenotypes, and the breeding value of a young animal or seedling is predicted from its genotype alone. In dairy cattle, where it was adopted from about 2009, this greatly shortened the generation interval, because bulls no longer had to wait years for their daughters' milk records — and, as the breeder's equation in [[population-genetics/response-to-selection]] shows, a shorter generation interval directly speeds the response to selection per year.
:::

::: history
Francis Galton's *Natural Inheritance* (1889) and Karl Pearson's correlation methods founded the biometrical study of inheritance; Galton described regression towards the mean in 1886. Johannsen (1903), Nilsson-Ehle (1909) and East (1916) showed experimentally that continuous variation has a Mendelian basis. Fisher's "The correlation between relatives on the supposition of Mendelian inheritance" (1918) introduced the partition of variance and the average effect, and Wright's path analysis (1921) gave a parallel treatment. Jay Lush's *Animal Breeding Plans* (1937) brought heritability into breeding. Oscar Kempthorne and C. Clark Cockerham generalised the covariance between relatives to include epistasis in the 1950s. Falconer's *Introduction to Quantitative Genetics* (1960) became the standard text. Since 2007, GWAS and genomic estimates of heritability from unrelated individuals (Jian Yang, Peter Visscher and colleagues, 2010) have tested the infinitesimal model directly and largely confirmed Fisher's view.
:::

::: summary
- Phenotype $P = G + E$, $V_P = V_G + V_E$ (+ covariance and interaction terms) ([[#def-pge]]).
- At one locus with values $a$, $d$, $-a$: mean $M = a(p - q) + 2pqd$; average effect $\alpha = a + d(q - p)$ ([[#def-alpha]]); $V_A = 2pq\alpha^2$ and $V_D = (2pqd)^2$ ([[#prop-va]]). Dominance contributes to $V_A$, and both depend on allele frequencies.
- Over loci, $V_G = V_A + V_D + V_I$; in practice most genetic variance is additive.
- Relatives covary by $2f_{XY}V_A + \Delta_{XY}V_D$: parent–offspring $\tfrac12V_A$, full sibs $\tfrac12V_A + \tfrac14V_D$, MZ twins $V_A + V_D$ ([[#prop-cov]]).
- $h^2 = V_A/V_P$ is the slope of offspring on mid-parent ([[#def-h2]]); twins give $h^2 \approx 2(r_\mathrm{MZ} - r_\mathrm{DZ})$ under strong assumptions; inbred lines and F1 measure $V_E$.
- Heritability is a population- and environment-specific ratio of variances: not a property of individuals, not a measure of changeability, and silent about differences between groups.
- Norms of reaction describe genotype–environment interaction; threshold traits are modelled by a normal liability.
- GWAS show that quantitative traits are highly polygenic; known SNPs explain part of the heritability.
:::

## Exercises

::: exercise Genotypic values {level=1 check="-0.4"}
At a locus, $A_1A_1 = 12$, $A_1A_2 = 10$, $A_2A_2 = 8$ (no dominance) and $p = 0.4$. What is the population mean measured from the midpoint?
::: solution
The midpoint is 10, so $a = 2$ and $d = 0$. By [[#eq-mean]], $M = a(p - q) = 2\times(0.4 - 0.6) = -0.4$: the population mean is 9.6. Check directly: $0.16\times12 + 0.48\times10 + 0.36\times8 = 1.92 + 4.80 + 2.88 = 9.60$.
:::
:::

::: exercise Additive variance {level=1 check="1.92"}
For the locus of the previous exercise, calculate $V_A$.
::: solution
$\alpha = a = 2$, so $V_A = 2\times0.4\times0.6\times4 = 1.92$. With no dominance, $V_G = V_A$.
:::
:::

::: exercise Heritability from twins {level=1 check="0.5"}
For a trait, $r_\mathrm{MZ} = 0.6$ and $r_\mathrm{DZ} = 0.35$. Estimate $h^2$ by Falconer's formula.
::: solution
$h^2 = 2(0.6 - 0.35) = 0.5$; $c^2 = 0.7 - 0.6 = 0.1$; $e^2 = 0.4$.
:::
:::

::: exercise A recessive allele's contribution {level=2}
At a locus with complete dominance ($a = d = 1$), compute $V_A$ and $V_D$ for $p = 0.9$, $0.5$ and $0.1$, where $p$ is the frequency of the dominant allele. Which allele frequency maximises $V_A$, and what fraction of $V_G$ is additive there?
::: solution
$\alpha = 1 + (q - p) = 2q$, so $V_A = 2pq(2q)^2 = 8pq^3$ and $V_D = 4p^2q^2$.
- $p = 0.9$: $V_A = 8\times0.9\times0.001 = 0.0072$, $V_D = 4\times0.81\times0.01 = 0.0324$.
- $p = 0.5$: $V_A = 8\times0.5\times0.125 = 0.5$, $V_D = 0.25$.
- $p = 0.1$: $V_A = 8\times0.1\times0.729 = 0.583$, $V_D = 0.0324$.

$V_A = 8pq^3$ is maximised where $d/dq[(1 - q)q^3] = 3q^2 - 4q^3 = 0$, i.e. $q = 0.75$, $p = 0.25$: $V_A = 8\times0.25\times0.4219 = 0.844$, $V_D = 4\times0.0625\times0.5625 = 0.141$, so 86 % of $V_G$ is additive. When the recessive allele is rare ($p = 0.9$), most of the little genetic variance is dominance variance.
:::
:::

::: exercise Half-sib design {level=2 check="0.4"}
In a forestry trial, trees are grown in families of half-sibs (same mother, different unknown fathers). The variance among family means corresponds to a covariance between half-sibs of 2.5 m², and the phenotypic variance of height is 25 m². Estimate $h^2$.
::: solution
$\Cov_\mathrm{HS} = \tfrac14V_A$, so $V_A = 10$ m² and $h^2 = 10/25 = 0.4$. Half-sib designs are attractive because dominance does not contribute to the covariance; maternal effects, however, do.
:::
:::

::: exercise Castle–Wright {level=2 check="8"}
Two inbred lines differ in mean by 16 units. The genetic variance of their F2 is 4 units². Estimate the minimum number of loci by the Castle–Wright estimator.
::: solution
$n = (\mu_1 - \mu_2)^2/(8V_G) = 256/32 = 8$.
:::
:::

::: exercise Interpreting a heritability change {level=2}
The heritability of body weight in a population of fish is 0.4 in hatchery conditions and 0.15 in the wild. Give two non-exclusive explanations.
::: solution
(1) The environmental variance is larger in the wild (variable food, temperature, density), so $V_E$ is larger and $h^2 = V_A/V_P$ smaller even if $V_A$ is unchanged. (2) Genotype–environment interaction: genotypes that grow well in uniform hatchery conditions may not be the same as those that grow well in the wild, changing $V_A$ and adding $V_{G\times E}$. Different allele frequencies (if the hatchery stock has been selected or has drifted) would also change $V_A$. The comparison illustrates that heritability is not a fixed property of a trait.
:::
:::

::: exercise Covariance of full sibs {level=3}
(a) Explain why full sibs share both alleles IBD at a locus with probability $\tfrac14$, one with probability $\tfrac12$, and none with probability $\tfrac14$. (b) Derive the full-sib covariance $\tfrac12V_A + \tfrac14V_D$ from [[#eq-cov]]. (c) In a study, the full-sib correlation is 0.35 and the parent–offspring correlation 0.25. What do they suggest about $V_D$ or shared environment?
::: solution
(a) Each parent passes one of its two alleles to each sib; the sibs received the same allele from the mother with probability $\tfrac12$ and from the father with probability $\tfrac12$, independently. Both: $\tfrac14$; exactly one: $\tfrac12$; neither: $\tfrac14$.

(b) The kinship $f_{XY}$ is the probability that one allele drawn at random from each sib is IBD. If they share both alleles IBD (probability $\tfrac14$), two random draws are IBD with probability $\tfrac12$ (when both draws pick the copy from the same parent); if they share one (probability $\tfrac12$), the draws must both pick the shared copies, probability $\tfrac14$; if none, 0. So $f_{XY} = \tfrac14\cdot\tfrac12 + \tfrac12\cdot\tfrac14 = \tfrac14$, the value found by path counting in [[population-genetics/inbreeding]]. So $2f_{XY} = \tfrac12$ and $\Delta_{XY} = \tfrac14$, and [[#eq-cov]] gives $\Cov = \tfrac12V_A + \tfrac14V_D$.

(c) The parent–offspring correlation gives $\tfrac12h^2 = 0.25$, $h^2 = 0.5$. If only additive variance acted, the full-sib correlation would also be 0.25. The excess, 0.10, equals $\tfrac14V_D/V_P + c^2$, where $c^2$ is the variance due to environment shared by sibs (same mother, same nest or litter). If $c^2 = 0$, $V_D/V_P = 0.4$, which would be unusually large; a shared environment is the more likely explanation, and the two can only be separated with more types of relatives.
:::
:::

::: exercise A threshold calculation {level=3}
A congenital condition affects 1 % of a population. Under the liability-threshold model with liability standardised to variance 1, the threshold lies 2.326 standard deviations above the mean. (a) If the mean liability of a group of relatives is 0.5 standard deviations higher than the population mean (with the same variance), what proportion of them are affected? (b) Explain qualitatively why, for a given heritability, the ratio of incidence in relatives to incidence in the population is larger for rarer conditions.
::: solution
(a) The threshold is now $2.326 - 0.5 = 1.826$ standard deviations above the relatives' mean, so the proportion affected is $1 - \Phi(1.826) = 0.034$: 3.4 %, more than three times the population incidence. (In reality the variance among relatives is also slightly reduced, a refinement in Falconer's method.)

(b) The normal density falls steeply in the tail. A given upward shift in mean liability moves a proportionally larger share of the distribution across a threshold far out in the tail than across one near the middle: shifting by 0.5 raises incidence from 1 % to 3.4 % (3.4-fold) but from 16 % to 31 % (about 2-fold) for a threshold at 1 standard deviation. Rare threshold traits therefore show strong familial clustering even with moderate heritability of liability.
:::
:::
