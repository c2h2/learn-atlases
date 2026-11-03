For a single-gene disorder, a family pedigree and a few hundred genetic markers are enough to find the gene: the disease allele travels through the family with markers near it, and linkage analysis maps it ([[genetics/linkage-mapping]]). Most traits are not like that. Height, blood pressure, the risk of type 2 diabetes or of schizophrenia are influenced by thousands of variants, each with a tiny effect, together with the environment. No family is large enough to map them. In 1996 Neil Risch and Kathleen Merikangas pointed out that **association** in large samples of unrelated people would be far more powerful than linkage for such variants — if one could test the whole genome. A decade later, the HapMap catalogue of common variation and cheap genotyping arrays made that possible, and in 2007 the Wellcome Trust Case Control Consortium reported associations with seven common diseases in 17,000 people. As of 2026, genome-wide association studies (GWAS) have been reported for thousands of traits, with samples of millions.

This chapter explains how a GWAS is designed and analysed, why the significance threshold is so stringent and the samples so large, how confounding by ancestry is avoided, how a statistical association leads (sometimes) to a gene and a mechanism, and what polygenic scores built from the results can and cannot do. It builds on the genetics of continuous variation in [[population-genetics/quantitative-traits]] and on the structure of human variation in [[genomics/human-variation]].

## The association test

The basic test is simple. For each variant, we ask whether genotype is correlated with the trait, across many unrelated individuals.

::: definition Genome-wide association study {#def-gwas}
In a **genome-wide association study**, individuals are genotyped (by array plus imputation, or by sequencing) at millions of variants across the genome, and each variant is tested separately for association with a trait. For a **quantitative trait** $y$, the usual model is the linear regression

$$
y_i = \beta_0 + \beta g_i + \boldsymbol\gamma\T\mathbf c_i + \varepsilon_i,
$$ {#eq-gwas}

where $g_i \in \{0, 1, 2\}$ counts copies of the tested allele in individual $i$ (or its imputed expected value, the **dosage**), $\mathbf c_i$ are covariates such as age, sex and principal components of ancestry, and $\beta$ is the **effect size** per allele. For a **binary trait** (cases and controls), logistic regression is used, and the effect is reported as an **odds ratio** per allele.
:::

The effect $\beta$ estimated in this way is a statistical association in the population sampled, not necessarily the effect of the variant itself: as we shall see, the tested variant is usually a proxy for a causal variant nearby, and the association can be inflated by confounding.

::: example An allelic case–control test {#ex-allelic}
In 2,000 cases and 3,000 controls, the risk allele of a SNP is carried on 1,320 of the 4,000 case chromosomes and 1,800 of the 6,000 control chromosomes. Estimate the allelic odds ratio and its 95 % confidence interval, and test for association.
::: solution
Allele frequencies: 0.33 in cases, 0.30 in controls. The 2 × 2 table of allele counts is

| | risk allele | other allele |
|---|---|---|
| cases | 1,320 | 2,680 |
| controls | 1,800 | 4,200 |

$\mathrm{OR} = (1320\times4200)/(2680\times1800) = 1.149$. The standard error of $\ln\mathrm{OR}$ is $\sqrt{1/1320 + 1/2680 + 1/1800 + 1/4200} = 0.0441$, so the 95 % interval for the OR is $\exp(0.139 \pm 1.96\times0.0441) = (1.05, 1.25)$.

The χ² statistic for the table ([[biostatistics/categorical-data]]) is

$$
\chi^2 = \frac{n(ad - bc)^2}{(a + c)(b + d)(a + b)(c + d)} = \frac{10^4\,(1320\times4200 - 2680\times1800)^2}{3120\times6880\times4000\times6000} = 10.1,
$$

with 1 degree of freedom: $P = 0.0015$. In a study of one candidate SNP this would be called significant. In a genome-wide study it is not remotely significant — about 1,500 of a million null SNPs would give a $P$-value this small by chance.
:::
:::

### Why 5 × 10⁻⁸?

Testing millions of variants requires a correction for multiple testing ([[genomics/functional-genomics]]). The variants are not independent, because of linkage disequilibrium, so a full Bonferroni correction for every variant tested would be too strict. Estimates of the effective number of independent tests of common variants in genomes of European ancestry, from the patterns of LD, came to about a million (Itsik Pe'er, Mark Daly and colleagues, 2008), and the convention became

$$
P < \frac{0.05}{10^6} = 5\times10^{-8},
$$ {#eq-gws}

**genome-wide significance**. It corresponds to a two-sided $z$ of 5.45, or a 1-df χ² of 29.7. Populations with shorter-range LD (such as many African populations) and studies of rare variants involve more independent tests, and stricter thresholds have been suggested for them.

::: widget distribution
dist: chisq
params: k=1
a: 29.7
b: 40
caption: The null distribution of the association χ² statistic with one degree of freedom. The shaded tail beyond 29.7 has probability $5\times10^{-8}$ — invisible on this scale. The statistic of [[#ex-allelic]], 10.1, lies far to the left of the threshold. Almost all of the million or so independent tests in a GWAS give statistics below 10; associations are declared only far out in the tail. Hover over the curve to read off the density.
:::

### Power and sample size

Why do GWAS need hundreds of thousands of participants? Because the effects are small.

::: proposition Power of a quantitative-trait association test {#prop-power}
Suppose a variant with allele frequency $p$ and additive effect $\beta$ (in units of the phenotypic standard deviation) explains a fraction $q^2 = 2p(1 - p)\beta^2$ of the variance of a trait. In a sample of $n$ unrelated individuals, the association test statistic is approximately normal with mean $\sqrt{\mathrm{NCP}}$ and variance 1, where the **non-centrality parameter** is

$$
\mathrm{NCP} \approx \frac{nq^2}{1 - q^2} \approx nq^2.
$$ {#eq-ncp}

The power to reach a two-sided threshold $z_\alpha$ is approximately $\Phi\!\left(\sqrt{\mathrm{NCP}} - z_\alpha\right)$, with $z_\alpha = 5.45$ for genome-wide significance.
:::

::: proof
In simple regression of $y$ on $g$ with $n$ observations, the test statistic for $\beta = 0$ is $t = \hat\beta/\mathrm{SE}(\hat\beta)$, and $t^2 = (n - 2)R^2/(1 - R^2)$, where $R^2$ is the squared sample correlation. For large $n$, $R^2 \approx q^2$, the population fraction of variance explained, which with genotype variance $2p(1-p)$ (Hardy–Weinberg) and phenotypic variance 1 is $2p(1 - p)\beta^2$. So $t^2 \approx nq^2/(1 - q^2)$, and since the sampling variance of $t$ is about 1, $t$ is approximately $\Normal(\sqrt{\mathrm{NCP}}, 1)$. The probability that $\lvert t\rvert$ exceeds $z_\alpha$ is dominated by the upper tail, $1 - \Phi(z_\alpha - \sqrt{\mathrm{NCP}}) = \Phi(\sqrt{\mathrm{NCP}} - z_\alpha)$.
:::

::: example How many people are needed? {#ex-power}
A common variant ($p = 0.3$) changes height by 0.035 standard deviations per allele — about 2.5 mm. (a) What fraction of the variance does it explain? (b) What is the power to detect it at genome-wide significance in 20,000, 100,000 and 500,000 people?
::: solution
(a) $q^2 = 2\times0.3\times0.7\times0.035^2 = 5.1\times10^{-4}$: about 0.05 % of the variance.

(b) With $q^2 \approx 5\times10^{-4}$, NCP $\approx 10$, 50 and 250. Power $= \Phi(\sqrt{\mathrm{NCP}} - 5.45)$:

- $n = 20{,}000$: $\Phi(3.16 - 5.45) = \Phi(-2.29) = 0.011$;
- $n = 100{,}000$: $\Phi(7.07 - 5.45) = \Phi(1.62) = 0.95$;
- $n = 500{,}000$: $\Phi(15.8 - 5.45) \approx 1$.

A variant that is essentially undetectable in 20,000 people is detected almost always in 100,000. Since most trait-associated variants have effects of this size or smaller, the number of discoveries rises steeply with sample size, which is why biobanks such as UK Biobank (500,000 participants) and consortia combining many studies by meta-analysis transformed the field.
:::
:::

::: widget plot
f: 0.5*(1 + erf((sqrt(10*q*x) - 5.45)/sqrt(2)))
x: 0, 300
y: 0, 1
sliders: q=0.05:0.01:0.5:0.01
labels: \text{power at } P < 5\times10^{-8}
caption: The power of a GWAS to detect a variant explaining $q$ % of the trait variance (slider), against the sample size in thousands (horizontal axis), by [[#prop-power]]. For $q = 0.05$ % the power rises from almost nothing at 20,000 to 95 % at 100,000. Halve $q$ and the sample needed doubles. Power curves this steep explain why studies of the same trait found a handful of loci with tens of thousands of people and thousands of loci with millions.
:::

## Confounding by ancestry

An association between genotype and trait can arise without any causal connection if both vary with ancestry. Suppose a sample contains people from two ancestral backgrounds that differ in the frequency of an allele and, for non-genetic reasons (diet, environment, how the trait was measured), in the trait. Every allele that differs in frequency between the backgrounds will then appear associated with the trait. William Knowler and colleagues (1988) found that in an American Indian community in Arizona, an immunoglobulin haplotype appeared to protect against type 2 diabetes; the association disappeared when the degree of European ancestry, which was correlated with both the haplotype and diabetes risk, was taken into account.

GWAS address this **population stratification** in several ways:

- by including the top **principal components** of the genotype data as covariates in [[#eq-gwas]], which absorb broad ancestry differences (Alkes Price and colleagues, 2006);
- by **linear mixed models**, which include a random effect whose covariance between individuals is their genome-wide genetic relatedness, accounting for structure and relatedness at all scales;
- by **family-based designs**, which compare siblings: the alleles a sibling receives from heterozygous parents are randomised by meiosis, so within-family associations cannot be confounded by ancestry or family environment.

A useful diagnostic is the inflation of the test statistics. Under the null hypothesis, the median of a 1-df χ² is 0.455.

::: definition Genomic inflation factor {#def-lambda}
The **genomic inflation factor** is $\lambda_\mathrm{GC} = \operatorname{median}(\chi^2_\text{obs})/0.455$, where the median is taken over all tested variants (Bernie Devlin and Kathryn Roeder, 1999). Under the null hypothesis for all variants, $\lambda_\mathrm{GC} \approx 1$. Uncorrected stratification raises all statistics and gives $\lambda_\mathrm{GC} > 1$.
:::

But $\lambda_\mathrm{GC} > 1$ does not necessarily mean confounding. For a highly polygenic trait, thousands of causal variants and the many variants in LD with them all have slightly elevated statistics, and in very large samples this raises the median. Brendan Bulik-Sullivan and colleagues (2015) distinguished the two with **LD score regression**: variants in high-LD regions tag more causal variants and so have higher statistics if the trait is polygenic, while stratification inflates all variants regardless of their LD. The intercept of a regression of χ² on LD score measures confounding; the slope measures polygenic signal and gives an estimate of SNP heritability.

::: example Interpreting inflation {#ex-lambda}
In a GWAS of 300,000 people, the median χ² across 8 million variants is 0.50. (a) Calculate $\lambda_\mathrm{GC}$. (b) LD score regression gives an intercept of 1.01. What do you conclude? (c) What would an intercept of 1.10 mean?
::: solution
(a) $\lambda_\mathrm{GC} = 0.50/0.455 = 1.10$.

(b) An intercept close to 1 means that little of the inflation is due to confounding; most of it reflects true polygenic signal, spread over many variants in LD with causal ones. This is typical of large GWAS of highly polygenic traits.

(c) An intercept of 1.10 would mean that most of the inflation is uniform across variants regardless of LD, the pattern of stratification or cryptic relatedness; the analysis would need better control of ancestry (more principal components, a mixed model), and the reported associations would be suspect.
:::
:::

## What GWAS have found

GWAS results are displayed as a **Manhattan plot**: $-\log_{10}P$ for every variant against its position along the genome, with genome-wide significant loci rising like skyscrapers above the $-\log_{10}(5\times10^{-8}) = 7.3$ line. Some general findings have emerged.

- **Most complex traits are highly polygenic.** In the largest study of height (Loïc Yengo, Peter Visscher, Joel Hirschhorn and colleagues, 2022, with 5.4 million people), 12,111 independent associated variants were found, clustered in about a fifth of the genome; together they account for about 40 % of the variance of height in people of European ancestry, close to the total contribution of common variants, and much less in other ancestries.
- **Most associated variants are non-coding.** The great majority lie outside protein-coding sequence, and they are enriched in enhancers and other regulatory elements active in tissues relevant to the trait ([[genomics/epigenomics]]): immune-cell enhancers for autoimmune diseases, liver enhancers for cholesterol levels, brain enhancers for psychiatric traits. GWAS variants are mostly regulatory variants with small effects on the expression of nearby genes.
- **Effect sizes are small.** For common diseases, typical odds ratios per allele are 1.05–1.2. Larger effects are found for rarer variants, as expected if selection keeps variants with large effects on fitness-related traits at low frequency.
- **Heritability is spread thinly.** The variance explained by genome-wide significant variants is much less than the heritability estimated from twins and families — the "missing heritability" problem. Jian Yang, Peter Visscher and colleagues (2010) showed that much of it is hidden in variants too weak to reach significance: estimating the variance explained by all common SNPs together (**SNP heritability**), from the genetic similarity of unrelated people, recovered about half of the heritability of height. Rare variants, poorly tagged by arrays, account for much of the rest, and family-based estimates may themselves be inflated by shared environment.

::: quiz
A GWAS of 400,000 people finds that a variant near gene *G* is associated with a trait at $P = 10^{-30}$, with an effect of 0.02 standard deviations per allele. Which statement is correct?
- [ ] The variant explains a large share of the trait's variance, because the $P$-value is so small.
- [ ] Gene *G* is proven to be the causal gene.
- [x] The association is very reliable statistically, but the effect is small, and the causal variant and gene must be established by further work.
- [ ] The variant is useful by itself for predicting the trait in individuals.
::: solution
A small $P$-value in a huge sample means that the association is unlikely to be due to chance, not that its effect is large; 0.02 SD per allele explains a tiny fraction of variance. The tested variant may be a proxy for a causal variant in LD with it, and the nearest gene is often not the gene it acts on. A single variant with such a small effect is useless for individual prediction.
:::
:::

## From association to mechanism

A significant locus is usually a region of tens to hundreds of kilobases containing many correlated variants, all associated because they are in LD with one or more causal variants. Three questions follow: which variant, which gene, and what mechanism?

### Fine-mapping

Statistical **fine-mapping** asks which variant in a region is most probably causal. Under the simplifying assumption that the region contains exactly one causal variant, with equal prior probability for each variant, the posterior probability that variant $j$ is causal is proportional to the Bayes factor for its association. For large samples and a diffuse prior on the effect size, the Bayes factor is approximately proportional to $e^{z_j^2/2}$, where $z_j$ is the test statistic, so

$$
\mathrm{PIP}_j \approx \frac{e^{z_j^2/2}}{\sum_k e^{z_k^2/2}},
$$ {#eq-pip}

the **posterior inclusion probability**. The smallest set of variants whose PIPs add to 95 % is a **95 % credible set**.

::: example A credible set {#ex-finemap}
Four SNPs in a locus have association statistics $z = 8.0$, 7.6, 7.0 and 5.0. Compute their posterior inclusion probabilities under [[#eq-pip]] and the 95 % credible set. How sensitive is the answer?
::: solution
$z^2/2 = 32.0$, 28.88, 24.5, 12.5. Relative to the largest, the weights are $1$, $e^{-3.12} = 0.044$, $e^{-7.5} = 5.5\times10^{-4}$ and $e^{-19.5} \approx 3\times10^{-9}$. Normalising, the PIPs are 0.957, 0.042, 0.0005 and essentially 0. The first SNP alone has PIP 0.957, so the 95 % credible set contains only that SNP.

The answer is very sensitive to small differences in $z$: if the first two SNPs had $z = 8.0$ and 7.9 (as happens for SNPs in near-perfect LD), the PIPs would be 0.55 and 0.45. Fine-mapping resolution depends on LD: in tightly linked SNPs no statistical method can separate them, and combining data from populations with different LD patterns (such as African and European ancestry) narrows credible sets. Real methods also allow several causal variants per locus and use functional annotations to set priors.
:::
:::

### Genes and mechanisms

The nearest gene to an associated variant is often not the gene it affects, because enhancers act over long distances ([[genomics/nuclear-organisation]]). The best-known example is the locus most strongly associated with obesity in Europeans, in an intron of *FTO*. Its variants turned out to lie in an enhancer whose targets are *IRX3* and *IRX5*, hundreds of kilobases away (Scott Smemo, Marcelo Nóbrega and colleagues, 2014; Melina Claussnitzer, Manolis Kellis and colleagues, 2015), with effects on the development of fat-storing versus heat-producing adipocytes. Evidence for target genes comes from **expression quantitative trait loci** (eQTLs), variants associated with expression of a gene in a tissue, mapped by the GTEx project and others; **colocalisation** tests ask whether a trait association and an eQTL share the same causal variant. Chromatin contact maps, CRISPR perturbation of the candidate enhancer, and the convergence of many loci on genes in the same pathway complete the case.

### Mendelian randomisation

Because alleles are assigned at random at meiosis, a variant that affects an exposure (such as LDL cholesterol level) acts like a randomised treatment for that exposure, and its association with an outcome (such as coronary disease) tests the exposure's causal effect — **Mendelian randomisation** (George Davey Smith and Shah Ebrahim, 2003). If the variant changes the exposure by $\beta_X$ and the outcome by $\beta_Y$, the **Wald ratio** $\beta_Y/\beta_X$ estimates the causal effect of the exposure on the outcome, provided the variant affects the outcome *only* through the exposure (no pleiotropy) and is not associated with confounders. For instance, if a variant raises an exposure by 0.10 SD and the outcome by 0.03 SD, the estimated causal effect is 0.3 SD of outcome per SD of exposure. Mendelian randomisation studies supported a causal role of LDL cholesterol in coronary disease and argued against one for HDL cholesterol, in line with the failure of drugs that raise HDL. Its assumptions are strong, and pleiotropy is common, so methods using many variants with different pleiotropic profiles are now standard.

## Polygenic scores

If thousands of variants each have small effects, their combined effect might be useful even when none is individually.

::: definition Polygenic score {#def-pgs}
A **polygenic score** (PGS, or polygenic risk score for a disease) for individual $i$ is

$$
\mathrm{PGS}_i = \sum_{j=1}^{M} \hat\beta_j\,g_{ij},
$$ {#eq-pgs}

the sum, over $M$ variants, of the individual's allele counts weighted by effect sizes estimated in an independent GWAS. Its **accuracy** is the squared correlation $r^2$ between score and trait in a new sample.
:::

::: proposition Expected accuracy of a polygenic score {#prop-daetwyler}
Suppose a trait has SNP heritability $h^2$, its genetic basis can be represented by $M$ independent effective loci of equal variance, and effects are estimated by GWAS in $N$ individuals from the same population in which the score is used. Then the expected accuracy of the score is approximately

$$
r^2 \approx \frac{h^2}{1 + M/(Nh^2)}.
$$ {#eq-daetwyler}

(Hans Daetwyler, Michael Goddard and colleagues, 2008, in the context of animal breeding.) As $N \to \infty$, $r^2 \to h^2$.
:::

The formula is an idealisation, but it captures the key point: accuracy depends on $N/M$. For a highly polygenic trait ($M$ of tens of thousands), samples of hundreds of thousands are needed before a score approaches its ceiling.

::: example The ceiling of prediction {#ex-pgs}
For a trait with $h^2 = 0.5$ and $M = 60{,}000$ effective loci, compute the expected accuracy of a polygenic score with $N = 100{,}000$, 500,000 and $10^6$ in the discovery GWAS.
::: solution
$M/(Nh^2) = 60{,}000/(0.5N)$: 1.2, 0.24 and 0.12. So $r^2 = 0.5/2.2 = 0.23$, $0.5/1.24 = 0.40$ and $0.5/1.12 = 0.45$. Accuracy rises quickly at first and then approaches the ceiling of 0.5 slowly. In practice accuracies are lower than this idealised prediction, because the genetic architecture is not uniform, estimated effects include noise and LD, and the target sample differs from the discovery sample.
:::
:::

::: widget plot
f: h/(1 + 60/(x*h)); h
x: 0, 2000
y: 0, 1
sliders: h=0.5:0.05:0.9:0.05
labels: r^2\ (M = 60{,}000); h^2\ (\text{ceiling})
caption: The expected accuracy of a polygenic score by [[#eq-daetwyler]] against the size of the discovery GWAS in thousands, for $M = 60{,}000$ effective loci and SNP heritability $h^2$ (slider). The score approaches its ceiling $h^2$ (the horizontal line) only slowly; for a trait with lower heritability the curve is lower and slower. This is an upper bound for a score applied in the same population as the GWAS: applied in a population with different LD and allele frequencies, accuracy is lower still.
:::

Polygenic scores have real uses in research — as covariates, as summaries of genetic liability, in Mendelian randomisation and in agricultural breeding, where genomic selection of cattle using such scores has roughly doubled the rate of genetic gain in dairy herds — and their potential for stratifying screening in medicine is being studied (see [Medicine Atlas](/learn/medicine/)). Their limits are equally important.

- **Individual prediction is weak.** Even an accurate score explains a minority of variance; most people with high scores do not develop a disease, and most people who do develop it do not have high scores.
- **Portability.** Scores derived from GWAS of European-ancestry samples are several times less accurate in people of African ancestry (Alicia Martin and colleagues, 2019), because of differences in allele frequencies and LD and because most discovery samples are European. Scores built from diverse samples narrow the gap.
- **Direct and indirect effects.** Population GWAS estimates mix the direct effect of an individual's alleles with effects of the parents' genotypes on the environment they provide ("genetic nurture", Augustine Kong and colleagues, 2018) and with residual stratification. For educational attainment, within-family estimates of effects are about half the population estimates; for height, they are nearly the same.

::: warning What GWAS and polygenic scores cannot tell us
A GWAS hit is not "the gene for" a trait: it is one of thousands of loci, each with a tiny effect, mostly acting through gene regulation in ways still to be worked out. A high heritability does not mean that a trait is fixed or unresponsive to the environment ([[population-genetics/quantitative-traits]]). And differences in average polygenic scores between populations do not show that differences in the trait between them are genetic: the scores are less accurate outside the population of discovery, they absorb environmental confounding, and they are affected by differences in LD and allele frequency unrelated to the trait. Using polygenic scores to rank human groups is scientifically invalid.
:::

::: history
The first genome-wide association study with a striking result was Robert Klein, Josephine Hoh and colleagues' study of age-related macular degeneration in 2005: with only 96 cases and 50 controls, it found a common variant in the complement factor H gene (*CFH*) with a large effect, because the effect happened to be unusually strong. The Wellcome Trust Case Control Consortium of 2007 (2,000 cases each of seven diseases and 3,000 shared controls) established the design and standards of the field, including the genome-wide threshold. Mendelian randomisation was formalised in 2003, SNP heritability estimation in 2010, and LD score regression in 2015. UK Biobank, which recruited 500,000 people from 2006 to 2010 and released genome-wide genotypes for all of them in 2017, became the largest single resource for GWAS; national biobanks in Finland, Japan, the United States and elsewhere followed.
:::

::: summary
- A GWAS ([[#def-gwas]]) tests millions of variants for association with a trait in unrelated individuals; genome-wide significance is $P < 5\times10^{-8}$ ([[#eq-gws]]), a correction for about a million independent common variants.
- Power depends on the variance explained by a variant and the sample size through $\mathrm{NCP} \approx nq^2$ ([[#prop-power]]); because effects are small, studies need hundreds of thousands to millions of participants.
- Population stratification can create false associations; principal components, mixed models and family designs control it. Inflation of test statistics ($\lambda_\mathrm{GC}$, [[#def-lambda]]) can reflect confounding or polygenicity; LD score regression separates them.
- Complex traits are highly polygenic, with associated variants mostly non-coding and regulatory; SNP heritability explains part of the "missing heritability".
- Fine-mapping assigns posterior probabilities to candidate causal variants ([[#eq-pip]]), limited by LD; target genes are found through eQTLs, chromatin contacts and perturbation, and are often not the nearest gene. Mendelian randomisation uses variants as instruments for causal inference, under strong assumptions.
- Polygenic scores ([[#def-pgs]]) have accuracy bounded by SNP heritability and dependent on $N/M$ ([[#prop-daetwyler]]); they transfer poorly across ancestries, mix direct and indirect effects, and say nothing about the causes of differences between groups.
:::

## Exercises

::: exercise Genome-wide significance {level=1 check="7.3"}
What is $-\log_{10}$ of the genome-wide significance threshold $5\times10^{-8}$, to one decimal place?
::: solution
$-\log_{10}(5\times10^{-8}) = 8 - \log_{10}5 = 8 - 0.699 = 7.3$.
:::
:::

::: exercise Variance explained {level=1 check="0.0008"}
A variant with allele frequency 0.5 has an effect of 0.04 phenotypic standard deviations per allele. What fraction of the trait variance does it explain?
::: solution
$q^2 = 2\times0.5\times0.5\times0.04^2 = 0.5\times0.0016 = 0.0008$, or 0.08 %.
:::
:::

::: exercise Genomic control {level=1 check="1.2"}
The median association χ² in a GWAS is 0.546. What is $\lambda_\mathrm{GC}$?
::: solution
$\lambda_\mathrm{GC} = 0.546/0.455 = 1.20$.
:::
:::

::: exercise Sample size for 80 % power {level=2}
How many individuals are needed for 80 % power to detect, at $P < 5\times10^{-8}$, a variant that explains 0.1 % of the variance of a trait? (The 80th percentile of the standard normal is 0.84.)
::: solution
We need $\sqrt{\mathrm{NCP}} - 5.45 = 0.84$, so $\sqrt{\mathrm{NCP}} = 6.29$ and $\mathrm{NCP} = 39.6$. With $\mathrm{NCP} = nq^2$ and $q^2 = 0.001$, $n = 39{,}600$: about 40,000 people.
:::
:::

::: exercise A Wald ratio {level=2 check="0.25"}
A variant raises circulating levels of a protein by 0.20 standard deviations and raises the risk of a disease by 0.05 on the log-odds scale. Assuming the conditions for Mendelian randomisation hold, what is the estimated causal effect of one SD of the protein on the log-odds of disease?
::: solution
$0.05/0.20 = 0.25$ log-odds per SD, an odds ratio of $e^{0.25} = 1.28$ per SD increase in the protein.
:::
:::

::: exercise Stratification in a sample {level=2}
A study of a skin trait recruits cases mostly from one region and controls mostly from another, which differ in ancestry. The GWAS finds hundreds of significant associations across the genome, with $\lambda_\mathrm{GC} = 1.6$ and an LD score regression intercept of 1.5. (a) What has gone wrong? (b) How could the analysis be corrected? (c) Which of the hits, if any, might still be real?
::: solution
(a) Cases and controls differ systematically in ancestry, so every variant that differs in frequency between the regions appears associated with case status: population stratification. The LD score intercept of 1.5 confirms that the inflation is mostly confounding, not polygenicity.

(b) Include principal components of ancestry, or use a linear mixed model; better, recruit cases and controls from the same populations, or use a family-based design. Matching cases and controls on ancestry is part of good design, not something to fix later.

(c) Loci that remain significant after correction, replicate in an independent, well-matched sample, and have plausible functional links to skin biology — for instance, known pigmentation genes — may be real. But many pigmentation variants also differ in frequency between regions because of past selection, so they need especially careful testing in matched samples.
:::
:::

::: exercise Credible sets {level=2}
Three SNPs in perfect LD ($r^2 = 1$) with each other show identical association statistics, $z = 9.0$. (a) What are their posterior inclusion probabilities under [[#eq-pip]]? (b) Can any statistical analysis in this population distinguish them? (c) Suggest two ways to identify the causal variant.
::: solution
(a) Equal weights, so each has PIP 1/3 and the 95 % credible set contains all three.

(b) No: if their genotypes are identical in every individual, no association analysis can tell them apart.

(c) Study a population in which the three SNPs are not in perfect LD (often a population of African ancestry, with shorter LD), so their associations can diverge; or test each variant experimentally — for example, in a massively parallel reporter assay or by editing each allele in a relevant cell type and measuring the effect on the expression of candidate target genes. Overlap with an enhancer or a disrupted transcription-factor motif provides supporting, but not decisive, evidence.
:::
:::

::: exercise A polygenic score across populations {level=3}
A polygenic score for a trait, derived from a GWAS of 1 million European-ancestry participants, explains 25 % of the variance in a European-ancestry test sample but only 6 % in an African-ancestry sample, although the trait's heritability is similar in both. (a) Give three reasons for the drop. (b) A commentator argues that because the mean score is lower in the second population, its members are genetically predisposed to lower values of the trait. Explain why this conclusion is unjustified. (c) What would improve the score's accuracy in the second population?
::: solution
(a) LD differs: the variants in the score are tags for causal variants in European-ancestry LD, and in African-ancestry genomes, with shorter-range LD, they tag the causal variants less well. Allele frequencies differ: some causal variants are rarer or more common, or present only in one population, so the estimated effects and the variance they explain differ. Effect estimates include residual stratification and indirect effects specific to the discovery sample, which do not transfer; and effects may interact with environments that differ.

(b) The mean of a score depends on the allele frequencies of the variants in it, which differ between populations for reasons that have nothing to do with the trait (drift, the serial founder effect, LD with different causal variants). A score that is poorly calibrated in the second population — as the low accuracy shows — cannot be used to compare means. And differences in the trait between populations can be environmental even if the trait is highly heritable within each population ([[population-genetics/quantitative-traits]]).

(c) GWAS in large samples of African ancestry; multi-ancestry methods that model differences in LD and share information across populations; and fine-mapping to identify causal variants, whose effects transfer far better than those of tag SNPs.
:::
:::

::: exercise From locus to gene {level=3}
A GWAS of a blood-lipid trait finds a locus whose lead variant lies in an intergenic region 150 kb from gene *A* and 400 kb from gene *B*. The variant is in an enhancer active in liver. An eQTL study finds that the same variant is associated with *B* expression in liver but not with *A*. (a) Which gene is the better candidate, and why is proximity not enough? (b) What does colocalisation analysis add? (c) Describe an experiment that would test the causal chain from variant to gene to trait.
::: solution
(a) *B*: the variant's effect on *B* expression in the relevant tissue links it to that gene. Enhancers often act over hundreds of kilobases and skip nearer genes, so proximity is weak evidence.

(b) A trait association and an eQTL at the same locus could be driven by different causal variants that happen to be in LD. Colocalisation tests whether both signals are best explained by a single shared variant, which strengthens the link.

(c) In a liver cell line or hepatocyte-like cells, delete the enhancer or edit the variant from one allele to the other with CRISPR, and measure *A* and *B* expression; then perturb *B* directly (knockdown or overexpression) and measure lipid handling (uptake or secretion of lipoproteins). Consistent effects — variant changes *B*, *B* changes lipid handling in the direction predicted by the GWAS — make the case; a mouse model or the effects of rare coding variants in *B* on the same trait in humans provide independent support.
:::
:::
