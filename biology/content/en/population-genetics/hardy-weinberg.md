Pick any two people, any two oak trees or any two fruit flies of the same species and read their genomes side by side. They will differ at millions of sites. That variation is the raw material of evolution, the signal used by breeders, forensic scientists and genetic epidemiologists, and the record from which population history is reconstructed. Population genetics begins by describing it: how much variation is there, how is it distributed among individuals, and how would it behave if nothing were acting on it?

The answer to the last question is the **Hardy–Weinberg principle**, which the course on evolution derived for one locus with two alleles ([[evolution/natural-selection]]). In this chapter we treat it as what it really is: a *null model*. We first set up the measures of variation used throughout the course — allele and genotype frequencies, heterozygosity, nucleotide diversity — and the sampling error with which we estimate them. We then extend Hardy–Weinberg to many alleles and to X-linked genes, show exactly how fast it is reached, and learn to test real samples against it. Every later chapter adds one process — selection, drift, mutation, migration, inbreeding — and asks how the population departs from this baseline.

## Describing genetic variation

### Loci, alleles and genotypes in a population

A **locus** may be a whole gene, a single nucleotide position, a microsatellite repeat or any other identifiable stretch of DNA. The alternative forms present at it in a population are its **alleles**: at a single-nucleotide polymorphism (SNP) the alleles are two bases, say `C` and `T`; at a microsatellite they are repeat lengths; at a gene they may be defined by whole sequences (**haplotypes**) or by the protein variants that electrophoresis can separate. In a diploid, each individual carries two copies, its **genotype**.

::: definition Genotype and allele frequencies {#def-frequencies}
Consider a locus with alleles $A_1, \ldots, A_k$ in a diploid population of $N$ individuals, of which $N_{ij}$ have genotype $A_iA_j$ (with $N_{ij}$ counted once for $i \le j$). The **genotype frequencies** are $P_{ij} = N_{ij}/N$. The **allele frequency** of $A_i$ is the proportion of the $2N$ gene copies that are $A_i$:

$$
p_i = \frac{2N_{ii} + \sum_{j\neq i} N_{ij}}{2N} = P_{ii} + \tfrac12\sum_{j\neq i}P_{ij},
$$ {#eq-allele-count}

since a homozygote carries two copies of its allele and a heterozygote one. The allele frequencies sum to 1. With two alleles we write $p = p_1$ and $q = p_2 = 1 - p$.
:::

Allele frequencies can always be computed from genotype frequencies, but not the reverse: a population of 50 % $A_1A_1$ and 50 % $A_2A_2$ and a population of 100 % $A_1A_2$ both have $p = 0.5$. The genotype frequencies carry extra information about *how* the alleles are packaged into individuals, and that packaging is exactly what Hardy–Weinberg predicts.

### How much variation is there?

Before the 1960s nobody knew whether a typical gene had one common allele and a few rare mutants, or many alleles at intermediate frequencies. The question was settled by protein **gel electrophoresis**, which separates enzyme variants that differ in charge. In 1966 Richard Lewontin and John Hubby surveyed 18 loci in *Drosophila pseudoobscura* and found about 30 % polymorphic, with an average individual heterozygous at about 12 % of loci; in the same year Harry Harris found comparable levels in humans. Electrophoresis sees only amino-acid changes that alter charge, so these were underestimates. In 1983 Martin Kreitman sequenced 11 copies of the alcohol dehydrogenase gene *Adh* of *Drosophila melanogaster* and found 43 polymorphic nucleotide sites, only one of which changed the protein. Sequencing has since made it routine to measure variation directly.

::: definition Measures of genetic variation {#def-variation}
For a sample of gene copies from a population:

- A locus is **polymorphic** if its commonest allele has frequency below an agreed cut-off, usually 0.99 or 0.95. The **proportion of polymorphic loci** is a crude summary.
- The **expected heterozygosity** or **gene diversity** at a locus is the probability that two gene copies drawn at random are different alleles:

$$
H = 1 - \sum_{i=1}^{k}p_i^2.
$$ {#eq-heterozygosity}

  From a sample of $n$ gene copies, the unbiased estimate is $\hat H = \frac{n}{n - 1}\bigl(1 - \sum \hat p_i^2\bigr)$. The **observed heterozygosity** $H_\mathrm{obs}$ is the fraction of individuals that are heterozygous.
- For DNA sequences of length $L$, the **nucleotide diversity** $\pi$ is the average number of differences per site between two sequences drawn at random (Masatoshi Nei and Wen-Hsiung Li, 1979). The **number of segregating sites** $S$ is the number of positions that are variable in the sample.
:::

$H$ is defined from allele frequencies alone, so it can be computed for haploids and for loci where genotypes are unknown; it equals the heterozygosity a random-mating population would have. Nucleotide diversity is the per-site version, averaged over all pairs.

The two summaries of a sequence sample, $\pi$ and $S$, are related by theory that we develop in [[population-genetics/genetic-drift]] and [[population-genetics/neutral-theory]]. For now note one useful fact: in a sample of $n$ sequences, the number of segregating sites grows with $n$ (more sequences, more chances to catch rare variants), while $\pi$ does not. To compare them, Geoffrey Watterson (1975) divided $S$ by the constant $a_n = \sum_{i=1}^{n-1} 1/i$; the resulting $\theta_W = S/a_n$ estimates the same quantity as $\pi$ when the population is at neutral equilibrium.

::: example Nucleotide diversity of a small sample {#ex-pi}
Five 30-base-pair sequences of a gene were obtained from five individuals (one copy each):

```
seq1  ATGCTAGCATTACGGATCCAGTTACGCATG
seq2  ATGCTAGCGTTACGGATCCAGTTACGCATG
seq3  ATGCTAGCATTACGAATCCAGTTACGCATG
seq4  ATGCCAGCGTTACGGATCCAGTTACGTATG
seq5  ATGCTAGCATTACGGATCCAGTTACGCATG
```

Find $S$, $\pi$ per sequence and per site, and Watterson's $\theta_W$ per site.
::: solution
The variable positions are 5 (`T`/`C`), 9 (`A`/`G`), 15 (`G`/`A`) and 27 (`C`/`T`), so $S = 4$.

There are $\binom52 = 10$ pairs. Counting differences: seq1–seq2 1, seq1–seq3 1, seq1–seq4 3, seq1–seq5 0, seq2–seq3 2, seq2–seq4 2, seq2–seq5 1, seq3–seq4 4, seq3–seq5 1, seq4–seq5 3. The total is 18, so the mean number of pairwise differences is $18/10 = 1.8$ and

$$
\pi = \frac{1.8}{30} = 0.060\ \text{per site}.
$$

With $n = 5$, $a_5 = 1 + \tfrac12 + \tfrac13 + \tfrac14 = 2.083$, so $\theta_W = 4/2.083 = 1.92$ per sequence, or $0.064$ per site. The two estimates are close. (A sample this small is only an illustration: real estimates use thousands of sites. Human nucleotide diversity is about $0.001$ — two copies of the genome differ at roughly one site in a thousand — and that of *D. melanogaster* is several times higher.)
:::
:::

### Estimating frequencies, and how precise the estimates are

Real frequencies are estimated from samples. If $n$ diploid individuals are genotyped, the natural estimate of $p_i$ is the **allele-counting** (gene-counting) estimate: count the copies of $A_i$ among the $2n$ sampled genes and divide by $2n$. This is also the maximum-likelihood estimate when genotypes are observed directly ([[biostatistics/estimation]]).

::: proposition Sampling variance of an allele frequency {#prop-se}
If the $2n$ gene copies in a sample of $n$ diploid individuals are independent draws from a population in which allele $A$ has frequency $p$ — which is true when the population is in Hardy–Weinberg proportions — then the allele-counting estimate $\hat p$ is unbiased with

$$
\Var(\hat p) = \frac{p(1 - p)}{2n},\qquad \mathrm{SE}(\hat p) \approx \sqrt{\frac{\hat p(1 - \hat p)}{2n}}.
$$ {#eq-se}
:::

::: proof
The count $X$ of $A$ copies is then binomial with $2n$ trials and success probability $p$, so $\E[X] = 2np$ and $\Var(X) = 2np(1 - p)$. Dividing by $2n$ gives $\E[\hat p] = p$ and $\Var(\hat p) = p(1 - p)/2n$. Replacing $p$ by $\hat p$ gives the estimated standard error.
:::

The independence assumption matters. If the population has an excess of homozygotes (as with inbreeding, [[population-genetics/inbreeding]]), the two copies in an individual are positively correlated and the true variance is larger, $p(1 - p)(1 + F)/2n$, where $F$ measures the correlation.

::: example A SNP in a sample of 250 people {#ex-se}
A SNP with alleles `C` and `T` is genotyped in 250 people: 90 `CC`, 110 `CT` and 50 `TT`. Estimate the frequency of `C` with an approximate 95 % confidence interval.
::: solution
Copies of `C`: $2\times90 + 110 = 290$ out of $500$, so $\hat p = 0.580$. By [[#eq-se]],

$$
\mathrm{SE} = \sqrt{\frac{0.58\times0.42}{500}} = 0.0221,
$$

and an approximate 95 % interval is $0.580 \pm 1.96\times0.0221 = 0.580 \pm 0.043$, i.e. $(0.537, 0.623)$. To halve the width we would need four times as many people. The standard error depends on the number of *gene copies* sampled, not on the size of the population, provided the population is large compared with the sample.
:::
:::

::: widget distribution
dist: binomial
params: n=100, p=0.3
a: 24
b: 36
normal: true
caption: The sampling distribution of the number of copies of an allele with true frequency $p$ among $n$ sampled gene copies (here $n = 100$, i.e. 50 diploid individuals). The shaded bars, 24 to 36 copies, are estimates within about $\pm 0.06$ of the true $p = 0.3$ — roughly the 95 % range predicted by [[#eq-se]], since $\sqrt{0.3\times0.7/100} = 0.046$. Increase $n$ and watch the distribution narrow in proportion to $1/\sqrt n$; the normal curve becomes an excellent approximation once $np$ and $n(1-p)$ both exceed about 10.
:::

## The Hardy–Weinberg principle

### The two-allele case, briefly

The derivation for two alleles is in [[evolution/natural-selection]]: under random mating the zygotes of the next generation are formed by drawing two gametes independently from a pool in which $A_1$ has frequency $p$, so genotypes occur in the proportions $p^2 : 2pq : q^2$, and the allele frequency is unchanged. Two points from that argument carry over to everything in this chapter.

1. **Random mating is equivalent to random union of gametes** at a single locus. Whether individuals choose partners at random or gametes meet at random in the water, the genotype of a zygote is a pair of independent draws from the gamete pool. (This equivalence holds for one locus; for two loci it fails until linkage equilibrium is reached — [[population-genetics/linkage-disequilibrium]].)
2. **Mendelian segregation preserves allele frequency.** Heterozygotes transmit their two alleles equally, so the gamete pool has the same allele frequencies as the parents. Anything that breaks this — selection, meiotic drive, mutation, migration, sampling — is an evolutionary force.

### Many alleles

Most loci have more than two alleles when sequenced: the HLA genes of the human major histocompatibility complex have thousands, and a microsatellite may have twenty repeat-length alleles in one population.

::: proposition Hardy–Weinberg proportions for multiple alleles {#prop-hw-multi}
Suppose an autosomal locus has alleles $A_1, \ldots, A_k$ with frequencies $p_1, \ldots, p_k$, identical in the two sexes, and the population is very large, mates at random, and experiences no selection, mutation or migration. Then after one generation of random mating

$$
f(A_iA_i) = p_i^2,\qquad f(A_iA_j) = 2p_ip_j\quad(i \neq j),
$$ {#eq-hw-multi}

and the allele frequencies remain $p_1, \ldots, p_k$ in all later generations. The fraction of heterozygotes is $1 - \sum_i p_i^2 = H$, and there are $k$ homozygous and $k(k-1)/2$ heterozygous genotypes.
:::

::: proof
A zygote receives two gametes drawn independently, each carrying $A_i$ with probability $p_i$. It is $A_iA_i$ if both are $A_i$, probability $p_i^2$. It is the unordered genotype $A_iA_j$ if the first is $A_i$ and the second $A_j$ or vice versa, probability $2p_ip_j$. These probabilities sum to $(\sum_ip_i)^2 = 1$. The frequency of $A_i$ among the offspring is, by [[#eq-allele-count]], $p_i^2 + \tfrac12\sum_{j\neq i}2p_ip_j = p_i\sum_j p_j = p_i$, so the next round of random mating gives the same proportions.
:::

With many alleles, heterozygosity can approach 1: with $k$ equally common alleles, $H = 1 - k(1/k)^2 = 1 - 1/k$, so ten equally common alleles make 90 % of individuals heterozygous. This is why forensic laboratories and paternity tests use highly polymorphic microsatellites: each one is likely to distinguish two people.

::: example ABO blood groups {#ex-abo}
The ABO locus has three alleles: $I^A$ and $I^B$ are codominant with each other and dominant over $i$ (blood group O). Phenotype frequencies in a large sample were O 0.45, A 0.40, B 0.11, AB 0.04. Assuming Hardy–Weinberg proportions, estimate the three allele frequencies $p$ ($I^A$), $q$ ($I^B$) and $r$ ($i$).
::: solution
By [[#eq-hw-multi]] the phenotypes have expected frequencies O $r^2$, A $p^2 + 2pr$, B $q^2 + 2qr$, AB $2pq$. Because phenotypes A and O are not distinguished at the genotype level, we cannot count alleles directly; instead we use the structure of the proportions (Felix Bernstein's method, 1925).

- O: $r^2 = 0.45$, so $r = \sqrt{0.45} = 0.6708$.
- O and A together: $p^2 + 2pr + r^2 = (p + r)^2 = 0.45 + 0.40 = 0.85$, so $p = \sqrt{0.85} - r = 0.9220 - 0.6708 = 0.2511$.
- O and B together: $(q + r)^2 = 0.56$, so $q = \sqrt{0.56} - r = 0.7483 - 0.6708 = 0.0775$.

The three estimates sum to $0.9995$, close to 1, and the predicted AB frequency $2pq = 0.039$ agrees with the observed 0.04: the data fit Hardy–Weinberg well. (In practice the small discrepancy is removed by a correction or, better, by maximum likelihood with the EM algorithm; the gene-counting idea behind EM was used for ABO by Cedric Smith in 1957.) Bernstein's analysis of ABO data in 1924–25 was historically important: it showed that the blood groups were determined by three alleles at one locus rather than two loci, which had been the competing hypothesis.
:::
:::

### How fast is equilibrium reached?

The two-allele statement "after one generation" assumes that the allele frequencies are the same in males and females. If they are not — for example when a population is founded by males from one source and females from another — one generation equalises them and a second produces Hardy–Weinberg proportions. If males contribute gametes with frequency $p_m$ and females $p_f$, the offspring are $A_1A_1$ with frequency $p_mp_f$, $A_2A_2$ with $q_mq_f$ and heterozygous with $p_mq_f + q_mp_f$, and the allele frequency in both sexes of the offspring is $(p_m + p_f)/2$. Random mating among them then gives Hardy–Weinberg proportions at that frequency.

For genes on the X chromosome the approach is slower, because the sexes inherit differently. In mammals and *Drosophila*, a male receives his only X from his mother, while a female receives one X from each parent (sex-linked inheritance: [[genetics/sex-linkage-pedigrees]]).

::: proposition Equilibrium at an X-linked locus {#prop-xlinked}
Let $q_m$ and $q_f$ be the frequencies of an X-linked allele $a$ in males and females, with random mating and no other forces. Then

$$
q_m' = q_f,\qquad q_f' = \tfrac12(q_m + q_f).
$$ {#eq-xlinked}

The weighted average $\bar q = \tfrac13 q_m + \tfrac23 q_f$ is constant (females carry two-thirds of all X chromosomes), and the difference $d = q_f - q_m$ satisfies $d' = -\tfrac12 d$, so it halves and changes sign each generation:

$$
q_f(t) = \bar q + \tfrac13 d_0\left(-\tfrac12\right)^t,\qquad q_m(t) = \bar q - \tfrac23 d_0\left(-\tfrac12\right)^t.
$$ {#eq-xlinked-sol}

At equilibrium $q_m = q_f = \bar q$, females have Hardy–Weinberg proportions $\bar p^2 : 2\bar p\bar q : \bar q^2$, and the frequency of affected (hemizygous $a$) males is $\bar q$.
:::

::: proof
A son's X comes from his mother, which carries $a$ with probability $q_f$. A daughter has one X from her father (probability $q_m$ of $a$) and one from her mother (probability $q_f$); her expected number of $a$ copies is $q_m + q_f$ out of two. This gives [[#eq-xlinked]]. Then $\bar q' = \tfrac13q_f + \tfrac23\cdot\tfrac12(q_m + q_f) = \tfrac13 q_m + \tfrac23 q_f = \bar q$, and $d' = \tfrac12(q_m + q_f) - q_f = -\tfrac12(q_f - q_m)$. Solving $q_f - q_m = d$ and $\tfrac13q_m + \tfrac23 q_f = \bar q$ for $q_f$ and $q_m$ gives [[#eq-xlinked-sol]].
:::

::: widget plot
f: (qm + 2*qf)/3 + (qf - qm)/3*cos(pi*x)*0.5^x; (qm + 2*qf)/3 - 2*(qf - qm)/3*cos(pi*x)*0.5^x
x: 0, 10
y: 0, 1
sliders: qm=1:0:1:0.01; qf=0:0:1:0.01
labels: q_f\ \text{(females)}; q_m\ \text{(males)}
caption: Allele frequencies at an X-linked locus in females and males from [[#eq-xlinked-sol]], starting from frequencies $q_f$ and $q_m$ set by the sliders. The model is defined only at whole generations $t = 0, 1, 2, \ldots$; the smooth curve (which uses $\cos(\pi t)$ in place of $(-1)^t$) joins those values to make the zigzag visible. Notice that the male curve at generation $t+1$ equals the female curve at $t$, that the two oscillate on opposite sides of the constant average $\bar q = (q_m + 2q_f)/3$, and that the gap halves each generation, so after about seven generations the sexes differ by less than 1 % of the starting gap.
:::

::: example A population founded by two sources {#ex-xlinked}
A population is founded by females who all carry the allele $A$ at an X-linked locus and males who all carry $a$ ($q_f = 0$, $q_m = 1$). Follow the frequency of $a$ in each sex for four generations, and give the equilibrium.
::: solution
By [[#eq-xlinked]]: generation 1, $q_m = 0$, $q_f = 0.5$; generation 2, $q_m = 0.5$, $q_f = 0.25$; generation 3, $q_m = 0.25$, $q_f = 0.375$; generation 4, $q_m = 0.375$, $q_f = 0.3125$. The difference $q_f - q_m$ runs $-1, 0.5, -0.25, 0.125, -0.0625$. The equilibrium is $\bar q = \tfrac13\times1 + \tfrac23\times0 = \tfrac13$: one-third of males will express the $a$ phenotype, and females will be $a/a$ with frequency $\tfrac19$.
:::
:::

For a rare recessive X-linked allele, $\bar q$ affected males against $\bar q^2$ affected females means that affected males are far more common: if one male in 12 is affected ($\bar q \approx 0.08$), about one female in 160 is. This is the population-level counterpart of the pedigree patterns of X-linked traits. (Clinical aspects of such conditions are covered in Medicine Atlas, [/learn/medicine/](/learn/medicine/).)

::: quiz
At an autosomal locus, males in a newly mixed population have allele frequency $p_m = 0.8$ and females $p_f = 0.4$. Which statement is correct about their offspring?
- [ ] The offspring are in Hardy–Weinberg proportions for $p = 0.6$.
- [x] The offspring have allele frequency 0.6 in both sexes but more heterozygotes than Hardy–Weinberg predicts; the next generation will be in Hardy–Weinberg proportions.
- [ ] Allele frequencies will oscillate between the sexes for several generations.
- [ ] The offspring have allele frequency 0.8 in sons and 0.4 in daughters.
::: solution
Offspring genotypes are $A_1A_1$: $0.8\times0.4 = 0.32$; $A_2A_2$: $0.2\times0.6 = 0.12$; heterozygotes $0.56$. Hardy–Weinberg for $p = 0.6$ would give $0.36, 0.48, 0.16$, so there is an excess of heterozygotes. The allele frequency is $0.32 + 0.28 = 0.6$ in both sons and daughters, since autosomes are inherited the same way by both sexes, and one more generation of random mating gives Hardy–Weinberg proportions. Oscillation between the sexes is the X-linked case.
:::
:::

## Hardy–Weinberg as a null model

The principle lists the conditions under which nothing happens: infinite population, random mating, no selection, no mutation, no migration, Mendelian segregation, equal frequencies in the sexes. None holds exactly in any real population. Its value lies in two uses: predicting genotype frequencies from allele frequencies when the departures are small, and detecting departures when they are large.

### Testing a sample

To test whether a sample is in Hardy–Weinberg proportions we estimate $p$ from the sample, compute the expected genotype counts, and compare them with the observed counts by a χ² goodness-of-fit test, as in [[genetics/mendelian-inheritance]] and [[evolution/natural-selection]]. With $k$ alleles there are $k(k+1)/2$ genotype classes and $k - 1$ independently estimated allele frequencies, so the test has

$$
\mathrm{df} = \frac{k(k+1)}{2} - 1 - (k - 1) = \frac{k(k-1)}{2}
$$

degrees of freedom — one for two alleles, three for three. When expected counts are small (rare alleles, small samples), the χ² approximation is poor and an **exact test** is used instead, which enumerates all genotype tables with the observed allele counts (Janis Wigginton, David Cutler and Gonçalo Abecasis gave a fast algorithm in 2005).

It is useful to summarise a departure by a single number.

::: definition The fixation index {#def-fis}
For a sample with observed heterozygosity $H_\mathrm{obs}$ and Hardy–Weinberg expected heterozygosity $H_\mathrm{exp} = 1 - \sum\hat p_i^2$, the **fixation index** is

$$
F = 1 - \frac{H_\mathrm{obs}}{H_\mathrm{exp}}.
$$ {#eq-fis}

$F > 0$ means a deficit of heterozygotes, $F < 0$ an excess. For two alleles the genotype frequencies can always be written $p^2 + Fpq$, $2pq(1 - F)$, $q^2 + Fpq$.
:::

When the sample comes from a single population, $F$ is written $F_\mathrm{IS}$ and is the departure due to non-random mating within it ([[population-genetics/inbreeding]]); when samples from several subpopulations are pooled, part of the deficit is due to the pooling itself ([[population-genetics/mutation-migration]]). For two alleles there is a neat connection with the χ² statistic: $\chi^2 = n\hat F^2$, where $n$ is the number of individuals sampled.

::: example A heterozygote deficit {#ex-hwtest}
A sample of 200 snails from one site has 60 $A_1A_1$, 70 $A_1A_2$ and 70 $A_2A_2$. Test for Hardy–Weinberg proportions and calculate $F$.
::: solution
$\hat p = (2\times60 + 70)/400 = 0.475$, $\hat q = 0.525$. Expected counts: $200\hat p^2 = 45.125$, $200\times2\hat p\hat q = 99.75$, $200\hat q^2 = 55.125$. Then

$$
\chi^2 = \frac{(60 - 45.125)^2}{45.125} + \frac{(70 - 99.75)^2}{99.75} + \frac{(70 - 55.125)^2}{55.125} = 4.904 + 8.873 + 4.014 = 17.79,
$$

with 1 degree of freedom: $P \approx 2.5\times10^{-5}$, far beyond the 5 % critical value of 3.84. The fixation index is $F = 1 - 70/99.75 = 0.298$, and indeed $n F^2 = 200\times0.298^2 = 17.79$. There is a strong deficit of heterozygotes.

What could cause it? Self-fertilisation or mating among relatives (snails include many selfing hermaphrodites); a sample that unknowingly mixes two populations with different allele frequencies (the Wahlund effect, [[population-genetics/mutation-migration]]); selection against heterozygotes before sampling; or a technical artefact — a "null allele" that fails to amplify, so that heterozygotes for it are scored as homozygotes. The test tells us that something departs from the null model, not what.
:::
:::

::: warning "A sample in Hardy–Weinberg proportions shows that the assumptions hold"
Agreement with Hardy–Weinberg proportions is weak evidence. Random mating restores the proportions in every generation, so selection, drift, mutation and migration can all change allele frequencies while genotype proportions in each generation's zygotes remain close to $p^2 : 2pq : q^2$. Selection that acts on adults only produces departures among the survivors, and these are often small: survival of 0.9, 1.0 and 0.9 for the three genotypes at $p = 0.5$ changes heterozygote frequency among survivors only from 0.50 to about 0.53, which a sample of a few hundred cannot detect. Conversely, failing the test does not identify which assumption failed. Hardy–Weinberg is a null model to test against, not a description of populations.
:::

::: warning "Equilibrium means a 1 : 2 : 1 ratio"
The 1 : 2 : 1 ratio is the outcome of a cross between two heterozygotes ([[genetics/mendelian-inheritance]]). Hardy–Weinberg proportions are $p^2 : 2pq : q^2$, which equal 1 : 2 : 1 only when $p = 0.5$. A population with $p = 0.9$ in equilibrium has 81 % $A_1A_1$, 18 % heterozygotes and 1 % $A_2A_2$; nothing pushes it towards 0.5.
:::

### Uses of the null model

**Genotype frequencies from allele frequencies, and vice versa.** For an autosomal recessive phenotype, only homozygotes are recognisable, but if the population is near Hardy–Weinberg we can estimate $q = \sqrt{f(aa)}$ and from it the frequency of heterozygous carriers.

::: example Carriers of a recessive allele {#ex-carriers}
An autosomal recessive condition affects 1 in 2,500 births in a population (an incidence of the order reported for cystic fibrosis in some populations of northern European ancestry). Estimate the allele frequency, the carrier frequency, and the fraction of recessive alleles that are in carriers.
::: solution
$q^2 = 1/2500$, so $q = 0.02$ and $p = 0.98$. The carrier (heterozygote) frequency is $2pq = 2\times0.98\times0.02 = 0.0392$, about 1 in 25. Copies of $a$ are in heterozygotes and homozygotes in the ratio $2pq : 2q^2 = p : q$, so a fraction $p = 0.98$ of all $a$ alleles are in carriers who do not express the condition. One person in 25 carries an allele expressed in one in 2,500.

The calculation assumes Hardy–Weinberg proportions. Consanguineous marriage raises the frequency of homozygotes above $q^2$ ([[population-genetics/inbreeding]]), and a single "condition" often involves many different alleles of the gene, which the population model lumps together as $a$. Estimates of this kind are used in population screening policy, but individual risk assessment belongs to clinical genetics (Medicine Atlas).
:::
:::

::: widget plot
f: x^2 + F*x*(1-x); 2*x*(1-x)*(1-F); (1-x)^2 + F*x*(1-x)
x: 0, 1
y: 0, 1
sliders: F=0:0:1:0.01
labels: A_1A_1; A_1A_2; A_2A_2
caption: Genotype frequencies against the allele frequency $p$ of $A_1$, written with the fixation index $F$ of [[#def-fis]]. At $F = 0$ these are the Hardy–Weinberg parabolas $p^2$, $2pq$, $q^2$; hover to read values. Increase $F$ and the heterozygote curve sinks to $2pq(1-F)$ while each homozygote gains $Fpq$; at $F = 1$ the population consists of homozygotes only, in proportions $p$ and $q$. Notice that the allele frequency is the same at every $F$ — departures from Hardy–Weinberg proportions repackage alleles into genotypes without changing their frequencies.
:::

**Quality control of genotype data.** In large genotyping studies, a SNP whose genotype counts depart wildly from Hardy–Weinberg in a sample from one population usually signals a technical problem: a probe that fails for one allele, or a duplicated region in which two loci are scored as one. Testing every SNP and setting aside those with extreme departures is a routine filtering step before association studies ([[genomics/association-studies]]).

::: application Forensic DNA profiles
A forensic DNA profile records the genotype of a person at a set of highly polymorphic microsatellite (short tandem repeat) loci. The probability that a randomly chosen unrelated person would share a profile is computed by applying [[#eq-hw-multi]] within each locus — $p_i^2$ for a homozygote, $2p_ip_j$ for a heterozygote — and multiplying across loci, which assumes the loci are independent (linkage equilibrium). With 20 loci the product is typically astronomically small. Because real populations are subdivided and relatives share alleles, the US National Research Council's 1996 report recommended modifying the single-locus formulas with a correction for population structure (the parameter $\theta$, essentially $F_\mathrm{ST}$, [[population-genetics/mutation-migration]]), which makes the estimates conservative. The numbers are only as good as the null model and the allele-frequency database behind them, a point argued at length in court in the 1990s.
:::

::: example How many genotypes, and how many heterozygotes? {#ex-count}
A microsatellite has six alleles with frequencies 0.30, 0.25, 0.20, 0.10, 0.10 and 0.05. How many genotypes are possible? What fraction of a random-mating population is heterozygous, and what is the commonest single genotype?
::: solution
There are $6$ homozygous and $6\times5/2 = 15$ heterozygous genotypes, 21 in all. $\sum p_i^2 = 0.09 + 0.0625 + 0.04 + 0.01 + 0.01 + 0.0025 = 0.215$, so $H = 0.785$: almost four people in five are heterozygous. The largest single genotype frequency is the heterozygote of the two commonest alleles, $2\times0.30\times0.25 = 0.15$, larger than the commonest homozygote, $0.30^2 = 0.09$. With many alleles, heterozygotes dominate.
:::
:::

### The computations in code

The following program, in standard-library Python, does the two routine calculations of this chapter: a Hardy–Weinberg χ² test for genotype counts, and $\pi$, $S$ and $\theta_W$ for a set of aligned sequences.

```python
import math
from itertools import combinations

def hw_test(n11, n12, n22):
    """Chi-squared test of Hardy-Weinberg proportions, two alleles (1 df)."""
    n = n11 + n12 + n22
    p = (2 * n11 + n12) / (2 * n)
    q = 1 - p
    expected = [n * p * p, n * 2 * p * q, n * q * q]
    chi2 = sum((o - e) ** 2 / e for o, e in zip((n11, n12, n22), expected))
    F = 1 - n12 / expected[1]
    pval = math.erfc(math.sqrt(chi2 / 2))        # upper tail of chi-squared with 1 df
    return p, chi2, pval, F

def diversity(seqs):
    """Segregating sites, pi per site, Watterson's theta per site."""
    L, n = len(seqs[0]), len(seqs)
    S = sum(len(set(col)) > 1 for col in zip(*seqs))
    pairs = list(combinations(seqs, 2))
    pi = sum(sum(a != b for a, b in zip(x, y)) for x, y in pairs) / len(pairs) / L
    a_n = sum(1 / i for i in range(1, n))
    return S, pi, S / a_n / L

print(hw_test(60, 70, 70))     # (0.475, 17.79, 2.5e-05, 0.298)
```

Running `hw_test` on the snail data of [[#ex-hwtest]] reproduces $\hat p = 0.475$, $\chi^2 = 17.79$, $P = 2.5\times10^{-5}$ and $F = 0.298$, and `diversity` on the sequences of [[#ex-pi]] gives $S = 4$, $\pi = 0.060$ and $\theta_W = 0.064$.

::: intuition Why one generation is enough
Genotype frequencies are a property of how alleles are paired; allele frequencies are a property of the gene pool. Random mating throws away the old pairing completely and draws new pairs at random from the pool, so whatever the parents' genotype proportions, the offspring's proportions depend only on the pool. Since Mendelian segregation leaves the pool unchanged, one round of random mating is enough. Two loci are different: there the *combinations* of alleles on the same chromosome are inherited intact except when recombination breaks them, so random mating does not immediately randomise them, and the approach to equilibrium is gradual ([[population-genetics/linkage-disequilibrium]]).
:::

## Variation in humans

Human genetic variation illustrates the measures of this chapter at genome scale. The 1000 Genomes Project's 2015 analysis of 2,504 people from 26 populations found that a typical genome differs from the reference sequence at 4.1 to 5.0 million sites, the great majority of them SNPs, and that most variants in the whole sample are rare, while most of the differences between any two individuals are due to common variants. Nucleotide diversity is low, about one difference per thousand base pairs between two copies, which is small compared with many other species including chimpanzees — a sign of a small long-term effective population size ([[population-genetics/genetic-drift]]). Larger sequencing efforts have since catalogued hundreds of millions of variant sites; such counts grow every year with sample size (as of 2026, see the current releases of gnomAD and similar databases, [[genomics/human-variation]]).

The way this variation is distributed among populations is a question of structure, treated in [[population-genetics/mutation-migration]]. The key finding, first reported by Richard Lewontin in 1972 from protein data and confirmed by genome sequences, is that most human genetic variation — of the order of 85–90 % — is found within any local population, with only a small fraction distinguishing populations from different continents. Allele frequencies change gradually across geography, and human population genetics is described in terms of populations, ancestry and geography, not "races".

::: history
In 1902 the statistician George Udny Yule objected that if brachydactyly were a Mendelian dominant, it ought to rise until three-quarters of people showed it. William Castle showed in 1903 that frequencies under random mating stay constant in a special case, and Karl Pearson in 1904 found the equilibrium for an initial population of pure lines. The general solution was found twice in 1908. Reginald Punnett, who could not answer Yule's argument, put it to his cricketing companion the mathematician G. H. Hardy, whose short letter "Mendelian proportions in a mixed population" appeared in *Science* in July 1908, with the remark that it was "a very simple point". Six months earlier, on 13 January 1908, the Stuttgart physician Wilhelm Weinberg had presented the same result in a lecture on human inheritance; it went largely unnoticed outside Germany until Curt Stern drew attention to it in 1943, after which the principle carried both names. Weinberg also derived the X-linked case and the effect of multiple alleles, and pioneered methods for studying inheritance in human families and twins. The measurement of how much variation exists — electrophoresis in 1966, the first gene sequences sampled from a population in 1983 — turned the principle from a theoretical baseline into the starting point of empirical population genetics.
:::

::: summary
- Variation is described by allele and genotype frequencies ([[#def-frequencies]]), expected heterozygosity $H = 1 - \sum p_i^2$, and, for sequences, nucleotide diversity $\pi$, segregating sites $S$ and Watterson's $\theta_W = S/a_n$ ([[#def-variation]]).
- The allele-counting estimate $\hat p$ has variance $p(1-p)/2n$ for $n$ diploid individuals under Hardy–Weinberg; precision depends on the number of gene copies sampled.
- With random mating and no evolutionary forces, genotypes reach $p_i^2$ and $2p_ip_j$ after one generation (two if allele frequencies differ between the sexes), and allele frequencies stay constant ([[#prop-hw-multi]]).
- At X-linked loci the sexes' frequencies oscillate, the difference halving each generation, around the constant $\bar q = \tfrac13 q_m + \tfrac23 q_f$ ([[#prop-xlinked]]).
- Departures are tested by χ² (with $k(k-1)/2$ df) or exact tests and summarised by $F = 1 - H_\mathrm{obs}/H_\mathrm{exp}$; for two alleles $\chi^2 = nF^2$.
- Agreement with Hardy–Weinberg proportions does not show that the assumptions hold; departure does not say which failed. The principle is a null model, used for predicting genotype frequencies (carriers of recessives, forensic match probabilities) and for flagging non-random mating, structure and genotyping error.
:::

## Exercises

::: exercise Counting alleles {level=1 check="0.6"}
A sample of 100 plants contains 36 $A_1A_1$, 48 $A_1A_2$ and 16 $A_2A_2$. What is the frequency of $A_1$?
::: solution
$\hat p = (2\times36 + 48)/200 = 120/200 = 0.6$. (These counts are exactly the Hardy–Weinberg proportions $0.36 : 0.48 : 0.16$ for $p = 0.6$.)
:::
:::

::: exercise Gene diversity with three alleles {level=1 check="0.62"}
A locus has three alleles at frequencies 0.5, 0.3 and 0.2. What is the expected heterozygosity under random mating?
::: solution
$H = 1 - (0.25 + 0.09 + 0.04) = 1 - 0.38 = 0.62$.
:::
:::

::: exercise Carrier frequency {level=1 check="0.0198"}
An autosomal recessive phenotype occurs in 1 in 10,000 individuals of a random-mating population. Estimate the frequency of heterozygous carriers (four decimal places).
::: solution
$q = \sqrt{10^{-4}} = 0.01$, $p = 0.99$, so $2pq = 0.0198$ — about 1 in 50.
:::
:::

::: exercise A χ² test {level=2}
In a sample of 400 people typed for a codominant blood-group system with alleles $M$ and $N$, there are 100 $MM$, 220 $MN$ and 80 $NN$. Test for Hardy–Weinberg proportions at the 5 % level and calculate $F$.
::: solution
$\hat p_M = (200 + 220)/800 = 0.525$. Expected: $400\times0.525^2 = 110.25$, $400\times2\times0.525\times0.475 = 199.5$, $400\times0.475^2 = 90.25$. Then

$$
\chi^2 = \frac{10.25^2}{110.25} + \frac{20.5^2}{199.5} + \frac{10.25^2}{90.25} = 0.953 + 2.107 + 1.164 = 4.22,
$$

with 1 df. This exceeds 3.84, so at the 5 % level we reject Hardy–Weinberg proportions ($P \approx 0.04$). $F = 1 - 220/199.5 = -0.103$: an *excess* of heterozygotes, and $nF^2 = 400\times0.0106 = 4.22$ as expected. A heterozygote excess can arise from unequal allele frequencies in the two sexes of the parents, from selection favouring heterozygotes before sampling, or from mating between rather than within groups; with $P \approx 0.04$ and many tests carried out in a typical study, chance is also plausible.
:::
:::

::: exercise An X-linked trait {level=2 check="0.0064"}
A recessive X-linked colour-vision variant is expressed by 8 % of males in a random-mating population at equilibrium. What fraction of females is expected to express it?
::: solution
At equilibrium affected males have frequency $\bar q = 0.08$, and affected females $\bar q^2 = 0.0064$, about 1 in 156. (Real colour-vision deficiencies involve several alleles at two linked genes, *OPN1LW* and *OPN1MW*, so observed female frequencies differ somewhat from this one-allele calculation.)
:::
:::

::: exercise Genotypes with many alleles {level=2 check="55"}
How many different genotypes are possible at an autosomal locus with 10 alleles? How many of them are heterozygous, and how many degrees of freedom does a χ² test of Hardy–Weinberg proportions have?
::: solution
$10\times11/2 = 55$ genotypes, of which $10\times9/2 = 45$ are heterozygous. The test has $k(k-1)/2 = 45$ degrees of freedom: 54 independent classes minus 9 estimated allele frequencies. With so many classes, most expected counts are small, and an exact test is preferred.
:::
:::

::: exercise Planning a sample {level=2 check="1050"}
How many diploid individuals must be genotyped to estimate an allele frequency near 0.3 with a standard error of 0.01, assuming Hardy–Weinberg proportions?
::: solution
From [[#eq-se]], $pq/2n = 0.01^2$, so $n = 0.3\times0.7/(2\times10^{-4}) = 1050$ individuals (2,100 gene copies).
:::
:::

::: exercise Pooling two ponds {level=3}
A biologist samples equal numbers of frogs from two ponds and analyses them as one sample. In pond 1 the frequency of allele $A$ is 0.9 and in pond 2 it is 0.3; each pond is in Hardy–Weinberg proportions. (a) What are the genotype frequencies in the pooled sample? (b) What heterozygosity would Hardy–Weinberg predict from the pooled allele frequency? (c) Calculate $F$ for the pooled sample and show that it equals $\Var(p)/(\bar p\bar q)$, where $\Var(p)$ is the variance of $p$ between ponds.
::: solution
(a) Pond 1: $AA$ 0.81, $Aa$ 0.18, $aa$ 0.01. Pond 2: 0.09, 0.42, 0.49. Pooled (average): $AA$ 0.45, $Aa$ 0.30, $aa$ 0.25.

(b) Pooled $\bar p = 0.45 + 0.15 = 0.6$, so Hardy–Weinberg predicts $2\bar p\bar q = 0.48$ heterozygotes.

(c) $F = 1 - 0.30/0.48 = 0.375$. The variance of $p$ between ponds is $\tfrac12[(0.9 - 0.6)^2 + (0.3 - 0.6)^2] = 0.09$, and $0.09/(0.6\times0.4) = 0.375$. The heterozygote deficit is created entirely by pooling — there is no inbreeding in either pond. This is the Wahlund effect, the basis of $F_\mathrm{ST}$ in [[population-genetics/mutation-migration]].
:::
:::

::: exercise Different frequencies in the two sexes {level=3}
An autosomal locus has allele frequency $p_m = 0.8$ in the males and $p_f = 0.4$ in the females of a founding population. (a) Give the genotype frequencies in the first generation of offspring and compare them with Hardy–Weinberg proportions at the same allele frequency. (b) Show that, in general, the first-generation heterozygote frequency exceeds $2\bar p\bar q$ by $\tfrac12(p_m - p_f)^2$, where $\bar p = (p_m + p_f)/2$.
::: solution
(a) $A_1A_1$: $0.8\times0.4 = 0.32$; $A_2A_2$: $0.2\times0.6 = 0.12$; $A_1A_2$: $0.8\times0.6 + 0.2\times0.4 = 0.56$. Allele frequency $0.32 + 0.28 = 0.6$; Hardy–Weinberg would give $0.36, 0.48, 0.16$. There are 8 % too many heterozygotes, and $\tfrac12(0.4)^2 = 0.08$.

(b) Write $p_m = \bar p + \delta$, $p_f = \bar p - \delta$ with $\delta = (p_m - p_f)/2$. The heterozygote frequency is $p_m(1 - p_f) + p_f(1 - p_m) = p_m + p_f - 2p_mp_f = 2\bar p - 2(\bar p^2 - \delta^2) = 2\bar p\bar q + 2\delta^2$, and $2\delta^2 = \tfrac12(p_m - p_f)^2$. The excess vanishes in the next generation, when both sexes have frequency $\bar p$.
:::
:::

::: exercise Interpreting a genotype survey {level=3}
A study genotypes 1,000 people from one city at 500,000 SNPs and tests each SNP for Hardy–Weinberg proportions at the 5 % level. (a) If every SNP were truly in Hardy–Weinberg proportions, how many would be expected to fail? (b) A few hundred SNPs fail with $P < 10^{-10}$, nearly all showing a strong deficit of heterozygotes. Why is genotyping error a more likely explanation than inbreeding or population structure? (c) A few others show a strong *excess* of heterozygotes, with almost no homozygotes for the rarer allele. Suggest an explanation.
::: solution
(a) About 5 % of 500,000, i.e. 25,000 SNPs, by chance alone. A 5 % threshold is useless for quality control on this scale; studies use thresholds such as $10^{-6}$.

(b) Inbreeding and population structure affect all loci of the genome roughly equally, producing a small, genome-wide heterozygote deficit, not extreme departures at a few loci. A huge deficit at a single SNP points to a locus-specific artefact: for example, a variant under a probe that prevents one allele from being detected, so that heterozygotes are miscalled as homozygotes.

(c) Apparent "heterozygotes" in nearly everyone can arise when the probe matches two different places in the genome — a duplicated segment or a paralogous gene — that differ at this position, so every person shows both bases. Such SNPs are flagged and removed. (A real heterozygote excess this extreme would require very strong overdominant selection, which is rare.)
:::
:::
