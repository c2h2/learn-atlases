In 1968 Motoo Kimura made a calculation. From the rates at which amino acids had changed in haemoglobin, cytochrome c and other proteins, he extrapolated to the whole mammalian genome and estimated that a mammalian lineage had fixed roughly one nucleotide substitution every two years. If every one of those substitutions had been driven by natural selection, the population would have had to pay an impossibly high "cost of selection" in genetic deaths, by the reasoning J. B. S. Haldane had set out in 1957. Kimura concluded that most substitutions must be selectively neutral, fixed by drift. The argument from the cost of selection turned out to be weaker than it first seemed, but the hypothesis it supported — the **neutral theory of molecular evolution** — became the null model of molecular evolution, and the starting point of every test for selection in DNA.

The course on evolution gave the core results ([[evolution/mutation-drift-gene-flow]]): the rate of neutral substitution equals the mutation rate, $k = \mu$, which underlies the molecular clock; functionally constrained sites evolve more slowly; and $d_N/d_S > 1$ signals positive selection. This chapter builds the quantitative machinery behind those statements. We derive the rate of substitution of selected mutations and the nearly neutral theory; correct observed differences for multiple substitutions; estimate $d_N$ and $d_S$; examine the clock critically; and then meet the main tests that compare variation within species with divergence between them — Tajima's $D$, the HKA test and the McDonald–Kreitman test. We end with what the tests have shown and where the debate stands.

## The rate of substitution

A **substitution** is the fixation of a new mutation along a lineage ([[evolution/mutation-drift-gene-flow]]). In a diploid population of census size $N$, $2N\mu$ new mutations arise at a site (or in a gene) per generation, and each is fixed with probability $u$. The long-run rate of substitution is therefore

$$
k = 2N\mu\,u.
$$ {#eq-k}

For neutral mutations $u = 1/2N$ and $k = \mu$. For mutations with selection coefficient $s$ (additive, with heterozygote fitness $1 + s$ and homozygote $1 + 2s$), Kimura's diffusion result ([[population-genetics/genetic-drift]]) gives $u = (1 - e^{-4N_es/2N})/(1 - e^{-4N_es})$.

::: proposition Substitution rate of selected mutations {#prop-k-selected}
If $N_e = N$ and $\lvert s\rvert$ is small, the rate of substitution of mutations with selection coefficient $s$, relative to the neutral rate, is

$$
\frac{k}{\mu} = \frac{4N_es}{1 - e^{-4N_es}} = \frac{S}{1 - e^{-S}},\qquad S = 4N_es.
$$ {#eq-k-ratio}

It is 1 for $S \to 0$, approximately $S$ for large positive $S$, and approximately $\lvert S\rvert e^{-\lvert S\rvert}$ for large negative $S$.
:::

::: proof
With $p = 1/2N$ and small $s$, $1 - e^{-2s} \approx 2s$, so $u \approx 2s/(1 - e^{-4Ns})$. Then $k/\mu = 2Nu = 4Ns/(1 - e^{-4Ns})$. As $S \to 0$, $1 - e^{-S} \approx S$ and the ratio tends to 1. For large positive $S$, $e^{-S} \to 0$ and the ratio is $\approx S$. For $S = -\lvert S\rvert$, $1 - e^{\lvert S\rvert} \approx -e^{\lvert S\rvert}$ and the ratio is $\approx \lvert S\rvert e^{-\lvert S\rvert}$.
:::

The scaled selection coefficient $S = 4N_es$ is what matters. A mutation with $s = -10^{-5}$ is effectively neutral in a population of $N_e = 10^4$ ($S = -0.4$, substitution rate 81 % of neutral) but strongly selected against in one of $10^6$ ($S = -40$, essentially never fixed). Favourable mutations fix much faster than neutral ones — but only a tiny fraction of mutations are favourable.

::: widget plot
f: x/(1 - exp(-x))
x: -10, 10
y: 0, 10
labels: k/\mu
hlines: 1
vlines: -1; 1
caption: The rate of substitution of mutations with scaled selection coefficient $S = 4N_es$, relative to the neutral rate, from [[#eq-k-ratio]]. The dashed line is the neutral rate. Between the two marked lines, $\lvert S\rvert < 1$, mutations are fixed at between 58 % and 158 % of the neutral rate: they are **nearly neutral**. Notice the asymmetry: slightly deleterious mutations with $S = -4$ still fix at 7.5 % of the neutral rate, while for $S < -10$ the rate is negligible. Because $S$ is proportional to $N_e$, the same mutation moves left along this curve (becoming more effectively deleterious) in a larger population.
:::

### The nearly neutral theory

Tomoko Ohta (1973) argued that a large class of mutations are neither strongly deleterious nor exactly neutral but *slightly* deleterious, with $\lvert S\rvert$ of order 1. Their fate depends on population size: in small populations they behave as neutral and fix; in large populations selection removes them. The **nearly neutral theory** predicts:

- **Faster protein evolution in small populations.** Lineages with smaller $N_e$ should fix more slightly deleterious amino-acid changes, raising $d_N/d_S$. Comparative genomics broadly supports this: $d_N/d_S$ tends to be higher in species with small long-term population sizes, such as large mammals, than in species with large populations such as rodents and *Drosophila*, though the effect is modest and confounded with other traits.
- **A weaker generation-time effect for proteins than for silent sites.** Species with short generations tend to have large populations; their faster mutation per year is partly offset by stronger purifying selection on slightly deleterious amino-acid changes, making the protein clock more regular per year than the silent-site clock.
- **Weak selection on synonymous sites.** In organisms with very large $N_e$, such as *E. coli*, yeast and *Drosophila*, preferred codons that match abundant tRNAs are used more often, especially in highly expressed genes — selection with $S$ of order 1 that is visible only in large populations (Michael Bulmer, 1991; Hiroshi Akashi, 1995; and others).

::: example Slightly deleterious mutations {#ex-nearly}
A class of amino-acid mutations has selection coefficient $s = -5\times10^{-5}$ in homozygous form ($s$ in the additive parametrisation of [[#prop-k-selected]]). Compare their substitution rate, relative to neutral mutations, in a mammal with $N_e = 10^4$ and in an insect with $N_e = 10^6$.
::: solution
Mammal: $S = 4\times10^4\times(-5\times10^{-5}) = -2$, so $k/\mu = -2/(1 - e^{2}) = -2/(-6.389) = 0.31$. Insect: $S = -200$, so $k/\mu \approx 200e^{-200} \approx 10^{-85}$, i.e. zero. The same mutations are fixed at a third of the neutral rate in the mammal and never in the insect. If a protein's mutations include many such slightly deleterious changes, the mammalian lineage will show a higher $d_N/d_S$ — not because selection favours change, but because it is too weak to prevent it.
:::
:::

## Measuring divergence

### Multiple hits and the Jukes–Cantor correction

When we align two homologous sequences and count the proportion $\hat p$ of sites at which they differ, we underestimate the number of substitutions that have occurred, because a site may have changed more than once (two changes, or a change and a reversal, can leave one difference or none). The simplest correction assumes that every base changes to each of the other three at the same rate.

::: proposition The Jukes–Cantor distance {#prop-jc}
Suppose substitutions occur at each site as a Poisson process, with each of the three possible changes equally likely, and let $d$ be the expected number of substitutions per site separating two sequences (summed along both lineages since their common ancestor). Then the probability that the two sequences differ at a site is

$$
p = \tfrac34\left(1 - e^{-4d/3}\right),
$$

and inverting gives the **Jukes–Cantor distance** (Thomas Jukes and Charles Cantor, 1969)

$$
\hat d = -\tfrac34\ln\left(1 - \tfrac43\hat p\right).
$$ {#eq-jc}
:::

::: proof
Follow one sequence along the path from the other sequence, through their ancestor, to itself; substitutions occur along this path at total rate such that $d$ are expected. Let $P(t)$ be the probability that the base at the end of a path of expected length $t$ equals the base at the start. A substitution event in a short interval $dt$ (probability $dt$) changes an identical site to a different base, and changes a different site back to the starting base with probability $\tfrac13$. So $dP/dt = -P + \tfrac13(1 - P) = \tfrac13 - \tfrac43P$, with $P(0) = 1$, giving $P(t) = \tfrac14 + \tfrac34e^{-4t/3}$. The probability of a difference is $p = 1 - P(d) = \tfrac34(1 - e^{-4d/3})$; solving for $d$ gives [[#eq-jc]].
:::

The correction is negligible for small $\hat p$ ($\hat d \approx \hat p$ when $\hat p < 0.05$), substantial at $\hat p = 0.3$ ($\hat d = 0.38$), and the distance becomes infinite as $\hat p$ approaches $\tfrac34$, the difference between random sequences: saturated sites carry no information about time. More realistic models allow transitions to be more frequent than transversions (Kimura's two-parameter model, 1980), unequal base composition and variation of rates among sites; they are treated in [[bioinformatics/phylogenetic-inference]] and [[evolution/phylogenetics]].

::: widget plot
f: -0.75*ln(1 - 4*x/3); x
x: 0, 0.74
y: 0, 2
labels: \hat d\ \text{(Jukes–Cantor)}; \hat p
vlines: 0.75
caption: The Jukes–Cantor distance [[#eq-jc]] (curve) against the observed proportion of differing sites $\hat p$, with the uncorrected distance $\hat d = \hat p$ (straight line) for comparison. Hover to read values. Up to about 10 % difference the correction is small; beyond 50 % it grows rapidly, and it diverges at $\hat p = 0.75$, where sequences have become random with respect to each other. Notice what this means for estimates from saturated sites: small errors in $\hat p$ produce huge errors in $\hat d$.
:::

### Synonymous and non-synonymous divergence

To compare rates at different kinds of site in a protein-coding gene, we need to know how many opportunities there were for each kind of change. In the method of Masatoshi Nei and Takashi Gojobori (1986), each codon is examined: of the three possible changes at each position, the fraction that would leave the amino acid unchanged counts towards the **synonymous sites** $L_S$ and the rest towards the **non-synonymous sites** $L_N$. (For example, the third position of a fourfold-degenerate codon such as `GCN`, alanine, contributes one full synonymous site.) Observed synonymous and non-synonymous differences $S_d$ and $N_d$ are counted similarly, and

$$
p_S = \frac{S_d}{L_S},\quad p_N = \frac{N_d}{L_N},\qquad d_S = -\tfrac34\ln\left(1 - \tfrac43p_S\right),\quad d_N = -\tfrac34\ln\left(1 - \tfrac43p_N\right),
$$

with the ratio $\omega = d_N/d_S$. Modern analyses estimate $\omega$ by maximum likelihood under codon substitution models (Nick Goldman and Ziheng Yang, 1994), which can let $\omega$ vary among sites and lineages.

::: example A d_N/d_S ratio {#ex-dnds}
Two aligned orthologous coding sequences of 1,000 nucleotides contain 750 non-synonymous and 250 synonymous sites. They differ by 15 non-synonymous and 25 synonymous changes. Calculate $d_N$, $d_S$ and $\omega$, and interpret.
::: solution
$p_N = 15/750 = 0.020$ and $p_S = 25/250 = 0.100$. Jukes–Cantor: $d_N = -0.75\ln(1 - 0.0267) = 0.0203$; $d_S = -0.75\ln(1 - 0.1333) = 0.1073$. So $\omega = 0.0203/0.1073 = 0.19$.

Non-synonymous changes have been fixed at about a fifth of the synonymous rate. If synonymous changes are close to neutral, about 80 % of amino-acid mutations in this gene were removed by purifying selection — the typical pattern. An $\omega$ averaged over a whole gene and its history is conservative: positive selection on a few sites or in a single lineage can be masked by strong constraint elsewhere, which is why site- and branch-specific models are used to find it. Classic cases where $\omega > 1$ was detected include the antigen-binding sites of MHC class I molecules (Austin Hughes and Masatoshi Nei, 1988), and the stomach lysozymes of cows and langurs, which convergently evolved to digest bacteria in the foregut (Caro-Beth Stewart, Allan Wilson and colleagues, 1987).
:::
:::

## The molecular clock, critically

The neutral theory predicts a clock that ticks at rate $\mu$ per generation for neutral sites, and at $f_0\mu$ for a class of sites of which a fraction $f_0$ of mutations are neutral. In practice the clock is irregular in three ways.

- **Lineage effects.** Mutation rates per year differ with generation time, metabolic rate and DNA repair; rodents have faster silent-site clocks per year than primates, and within primates the rate is slower in apes, especially humans, than in monkeys.
- **Overdispersion.** Even within a lineage, if substitutions were a Poisson process their variance would equal their mean. John Gillespie and others (from the 1970s and in *The Causes of Molecular Evolution*, 1991) found that for many proteins the **index of dispersion** — the variance of the number of substitutions among lineages divided by its mean — is well above 1. Episodic selection, fluctuating population sizes under the nearly neutral theory, and changing constraint can all produce this.
- **Calibration.** A clock gives times only if its rate is known, from fossils or other dated events or from measured mutation rates, and the two can disagree. Dating the human–chimpanzee split with pedigree-based mutation rates gave older dates than fossil-calibrated phylogenetic rates did, a discrepancy that took years to resolve with better estimates of generation times and of ancestral population sizes ([[evolution/human-evolution]]).

Modern phylogenetic methods therefore use **relaxed clocks**, letting the rate vary among branches within a statistical model ([[evolution/phylogenetics]]). The clock remains indispensable, but as a statistical tool, not a law.

## Testing neutrality with polymorphism data

The neutral theory makes predictions not only about divergence between species but about variation within them, and about how the two are related. Tests compare observed patterns with the predictions of the **standard neutral model**: neutral mutations under the infinite-sites model in a single random-mating population of constant size at equilibrium.

### The site frequency spectrum and Tajima's D

Under the standard neutral model the coalescent ([[population-genetics/genetic-drift]]) predicts not only the number of segregating sites but their frequencies. Among $n$ sequences, the expected number of sites at which the mutant (derived) allele appears in exactly $i$ copies is

$$
\E[\xi_i] = \frac{\theta}{i},\qquad i = 1, \ldots, n - 1,
$$ {#eq-sfs}

so singletons are the most common class, and each frequency class is rarer in inverse proportion to its count (Yun-Xin Fu, 1995). Summing over $i$ gives $\E[S] = \theta a_n$, as before. Different estimators of $\theta$ weight these classes differently: Watterson's $\theta_W = S/a_n$ counts all segregating sites equally, while $\pi$ gives most weight to sites at intermediate frequency (a site with $i$ derived copies contributes $i(n - i)$ to the number of pairwise differences). Under neutrality both have expectation $\theta$; departures in the frequency spectrum make them differ.

::: definition Tajima's D {#def-tajima}
For a sample of $n$ sequences with $S$ segregating sites and mean number of pairwise differences $\hat\pi$, **Tajima's $D$** (Fumio Tajima, 1989) is

$$
D = \frac{\hat\pi - S/a_n}{\sqrt{e_1S + e_2S(S - 1)}},
$$ {#eq-tajima}

where the denominator estimates the standard deviation of the numerator under the standard neutral model, with constants $a_1 = a_n = \sum_{i=1}^{n-1}1/i$, $a_2 = \sum_{i=1}^{n-1}1/i^2$, $b_1 = \frac{n+1}{3(n-1)}$, $b_2 = \frac{2(n^2 + n + 3)}{9n(n-1)}$, $c_1 = b_1 - \frac{1}{a_1}$, $c_2 = b_2 - \frac{n+2}{a_1n} + \frac{a_2}{a_1^2}$, $e_1 = c_1/a_1$ and $e_2 = c_2/(a_1^2 + a_2)$.
:::

$D$ is close to 0 under the standard neutral model. **Negative $D$** means an excess of rare variants: expected after a selective sweep (new mutations arise on the swept haplotype and are rare), under purifying selection against slightly deleterious variants (kept rare), or after a population expansion (a star-like genealogy with long external branches). **Positive $D$** means an excess of intermediate-frequency variants: expected under balancing selection (old alleles maintained at intermediate frequencies), after a population contraction, or when the sample pools differentiated subpopulations.

::: example Computing Tajima's D {#ex-tajima}
Ten sequences of a gene from one population contain $S = 16$ segregating sites, and the mean number of pairwise differences is $\hat\pi = 3.0$. A second gene, also with $n = 10$ and $S = 16$, has $\hat\pi = 8.5$. Compute $D$ for each and interpret.
::: solution
For $n = 10$: $a_1 = 2.829$, $a_2 = 1.540$, $b_1 = 11/27 = 0.4074$, $b_2 = 2\times113/810 = 0.2790$, $c_1 = 0.4074 - 0.3535 = 0.0539$, $c_2 = 0.2790 - 12/28.29 + 1.540/8.003 = 0.2790 - 0.4242 + 0.1924 = 0.0472$, $e_1 = 0.0191$, $e_2 = 0.0472/9.543 = 0.00494$. The denominator is $\sqrt{0.0191\times16 + 0.00494\times240} = \sqrt{0.305 + 1.186} = 1.221$, and $\theta_W = 16/2.829 = 5.66$.

Gene 1: $D = (3.0 - 5.66)/1.221 = -2.17$. Gene 2: $D = (8.5 - 5.66)/1.221 = +2.33$.

Gene 1 has many segregating sites but little pairwise diversity, so most of its variants are rare — consistent with a recent sweep, purifying selection, or population growth. Gene 2 has variants at intermediate frequencies — consistent with balancing selection, or a sample from a structured population. Values beyond about $\pm2$ are unusual under the standard neutral model, but significance should be judged by coalescent simulation under a realistic demographic history, and since demography affects all loci while selection affects particular ones, the strongest evidence comes from comparing a gene with the genome-wide distribution of $D$ in the same sample.
:::
:::

```python
import math

def tajimas_d(n, S, pi):
    """Tajima's D from sample size n, segregating sites S and mean pairwise differences pi."""
    a1 = sum(1 / i for i in range(1, n))
    a2 = sum(1 / i ** 2 for i in range(1, n))
    b1 = (n + 1) / (3 * (n - 1))
    b2 = 2 * (n * n + n + 3) / (9 * n * (n - 1))
    c1 = b1 - 1 / a1
    c2 = b2 - (n + 2) / (a1 * n) + a2 / a1 ** 2
    e1, e2 = c1 / a1, c2 / (a1 ** 2 + a2)
    return (pi - S / a1) / math.sqrt(e1 * S + e2 * S * (S - 1))

print(round(tajimas_d(10, 16, 3.0), 2), round(tajimas_d(10, 16, 8.5), 2))   # -2.17 2.33
```

::: widget plot
f: th/x; th/x*0 + th/(n - 1)
x: 1, 29
y: 0, 10
sliders: th=5:0.5:20:0.5; n=30:5:100:1
labels: \E[\xi_i] = \theta/i; \theta/(n-1)
caption: The expected neutral site frequency spectrum [[#eq-sfs]]: the number of segregating sites at which the derived allele is present in $i$ of $n$ sampled sequences, against $i$, for population mutation rate $\theta$. Read it at whole numbers $i = 1, 2, \ldots$ only. The flat line marks the expected count in the commonest-derived class, $i = n - 1$. Notice how dominant the rare classes are: with $\theta = 5$, five singletons are expected for every 0.17 sites in which all but one sequence carry the derived allele. A sweep or expansion adds to the left end of this curve; balancing selection and contraction add to the middle.
:::

### Comparing polymorphism with divergence

Neutral theory ties variation within species to divergence between them: both are proportional to the neutral mutation rate. Two tests exploit this.

The **HKA test** (Richard Hudson, Martin Kreitman and Montserrat Aguadé, 1987) compares several loci. Under neutrality, each locus's polymorphism within a species ($\propto 4N_e\mu_i$) and divergence between species ($\propto 2T\mu_i$) depend on the same locus-specific mutation rate $\mu_i$, so the ratio of polymorphism to divergence should be the same at every locus. A locus with too little polymorphism for its divergence suggests a recent sweep; one with too much suggests balancing selection.

The **McDonald–Kreitman test** applies the same logic to two classes of site within one gene, so that mutation rate, genealogy and demography are shared.

::: proposition The McDonald–Kreitman test {#prop-mk}
Classify the variable sites in a sample of sequences from two species as **polymorphic** (variable within a species) or **fixed** (differing between species, constant within each), and as **non-synonymous** (N, replacement) or **synonymous** (S). If non-synonymous mutations are either neutral or strongly deleterious (never fixed and never polymorphic at appreciable frequency), then

$$
\frac{D_N}{D_S} = \frac{P_N}{P_S}
$$

in expectation, where $D$ counts fixed differences and $P$ polymorphisms. An excess of fixed non-synonymous differences, $D_N/D_S > P_N/P_S$, indicates adaptive substitution. The **proportion of adaptive non-synonymous substitutions** is estimated as

$$
\alpha = 1 - \frac{D_SP_N}{D_NP_S}.
$$ {#eq-mk-alpha}
:::

::: proof
If a fraction $f$ of non-synonymous mutations are neutral and the rest strongly deleterious, then both fixed differences and polymorphisms at non-synonymous sites are produced only by the neutral fraction, at rates proportional to $fL_N\mu$, while synonymous sites (assumed neutral) produce both at rates proportional to $L_S\mu$. The genealogy and the time of divergence affect the two classes equally, so $D_N/D_S = P_N/P_S = fL_N/L_S$. Adaptive substitutions add to $D_N$ but contribute negligibly to $P_N$, because favoured mutations pass through the polymorphic phase quickly. If $D_N$ exceeds its neutral expectation $D_SP_N/P_S$, the excess fraction $1 - D_SP_N/(D_NP_S)$ estimates the proportion of non-synonymous substitutions that were adaptive.
:::

::: example The Adh gene of Drosophila {#ex-mk}
John McDonald and Martin Kreitman (1991) sequenced the alcohol dehydrogenase gene *Adh* from 12 *D. melanogaster*, 6 *D. simulans* and 12 *D. yakuba*. They found 7 fixed and 2 polymorphic replacement (non-synonymous) differences, and 17 fixed and 42 polymorphic synonymous differences. Test for departure from neutrality and estimate $\alpha$.
::: solution
The 2×2 table is:

| | fixed | polymorphic |
|---|---|---|
| replacement | 7 | 2 |
| synonymous | 17 | 42 |

Under neutrality the ratio of replacement to synonymous should be the same in both columns. It is $7/17 = 0.41$ among fixed differences but $2/42 = 0.048$ among polymorphisms. Fisher's exact test on the table ([[biostatistics/categorical-data]]) gives $P \approx 0.007$. By [[#eq-mk-alpha]], $\alpha = 1 - (17\times2)/(7\times42) = 1 - 34/294 = 0.88$: on this evidence, most of the amino-acid substitutions between these species at *Adh* were adaptive. (The **neutrality index** $(P_N/P_S)/(D_N/D_S) = 0.12$ expresses the same thing.) This result for a single gene started a programme of applying the test across genomes.
:::
:::

The MK test has its own pitfalls. Slightly deleterious non-synonymous mutations segregate as polymorphisms but rarely fix, inflating $P_N$ and biasing $\alpha$ downwards; excluding rare polymorphisms or modelling the distribution of fitness effects (Adam Eyre-Walker and Peter Keightley, and others) reduces the bias. Changes in population size between the time of divergence and the present can bias it in either direction under the nearly neutral theory.

::: quiz
In an MK table for a gene, $D_N = 10$, $D_S = 20$, $P_N = 15$, $P_S = 30$. What do you conclude?
- [ ] There is strong evidence of adaptive evolution, because $D_N = 10$ is large.
- [x] The data fit neutral expectations: the ratio N : S is the same (1 : 2) for fixed and polymorphic sites, and $\alpha = 0$.
- [ ] There is evidence of balancing selection, because $P_N > D_N$.
- [ ] Nothing, because the test needs equal numbers of synonymous and non-synonymous sites.
::: solution
$D_N/D_S = 0.5 = P_N/P_S$, so $\alpha = 1 - (20\times15)/(10\times30) = 0$. The absolute numbers depend on the numbers of sites and the divergence time; only the comparison of ratios is informative, and it does not require equal numbers of sites because the site counts cancel.
:::
:::

## What the tests have shown

Half a century of data have given a nuanced answer to the question Kimura posed.

- **Most new mutations in functional sequence are deleterious**, and most polymorphisms and substitutions in the large non-functional fraction of genomes such as ours are neutral or nearly so. Purifying selection is the dominant form of selection on proteins ($\omega \ll 1$ for most genes).
- **Adaptive substitution is common in some species.** MK-based estimates suggest that about half of the amino-acid substitutions between *Drosophila* species were adaptive (Nick Smith and Adam Eyre-Walker, 2002, and later studies), with similar or higher values in some other species with large populations, but much lower values in hominids — as the nearly neutral theory predicts for species with small effective sizes.
- **Linked selection shapes genome-wide diversity.** Diversity is lower in regions of low recombination and high gene density, owing to selective sweeps and background selection ([[population-genetics/linkage-disequilibrium]]). This helps to explain Lewontin's paradox — that diversity varies much less among species than population sizes do — because linked selection removes more diversity in species with larger populations (Russell Corbett-Detig, Daniel Hartl and Timothy Sackton, 2015), though it does not explain all of it.

Whether these findings mean that the neutral theory has been "overturned" or "vindicated" is still argued, partly over definitions: Andrew Kern and Matthew Hahn (2018) argued that selection, direct and linked, is pervasive and that neutral theory should no longer be the default explanation for genomic variation, while Jeffrey Jensen and colleagues (2019) replied that the neutral theory, with purifying selection and demography, remains the appropriate null model and that many claimed signatures of selection are confounded with demographic history. What is not in dispute is that the neutral theory provides the null hypothesis against which selection is detected, and that its predictions are quantitative enough to be tested.

::: warning "Neutral means unimportant" and "a significant test proves selection"
A neutral mutation is one whose effect on fitness is too small for selection to determine its fate in a population of a given size, $\lvert 4N_es\rvert \ll 1$ — not necessarily one with no effect on the phenotype, and a mutation neutral in a small population may not be neutral in a large one. Conversely, rejection of the standard neutral model is not proof of selection: population expansion, bottlenecks, structure and admixture all distort the frequency spectrum and LD, and mutation-rate variation affects polymorphism–divergence comparisons. Robust inference compares a candidate gene with the genome-wide distribution under the same demography, or uses tests such as MK that share the demography between the two classes being compared.
:::

::: application Neutral theory in medicine and conservation
The logic of constraint is used to interpret human variation: genes in which loss-of-function variants are much rarer than expected from the mutation rate ("constrained" genes, measured in large databases such as gnomAD) are likely to be essential, and new mutations in them are prioritised in the diagnosis of rare genetic conditions ([[genomics/human-variation]], and Medicine Atlas for clinical aspects). In pathogens, $d_N/d_S$ along branches of a phylogeny identifies proteins under immune-driven positive selection, guiding the choice of vaccine antigens, and molecular clocks calibrated by sampling dates trace the spread of epidemics. In conservation, neutral diversity measures $N_e$ and connectivity, while variation at adaptive loci guides decisions about which populations to protect or mix.
:::

::: history
Emile Zuckerkandl and Linus Pauling proposed the molecular clock in 1962–65; Kimura (1968, *Nature*) and Jack King and Thomas Jukes (1969, *Science*) proposed the neutral theory, and Jukes and Cantor published their distance in 1969. Ohta and Kimura discussed the constancy of the clock in 1971, and Ohta proposed the nearly neutral theory in 1973. The first tests using DNA polymorphism followed Kreitman's *Adh* sequences of 1983: the HKA test (1987), Tajima's $D$ (1989) and the McDonald–Kreitman test (1991). Kimura's book *The Neutral Theory of Molecular Evolution* (1983) and Gillespie's *The Causes of Molecular Evolution* (1991) stated the two sides of the debate. Since the 2000s, genome-scale data from many species have allowed these tests to be applied across thousands of genes at once, shifting the question from "is molecular evolution neutral?" to "what fraction of each kind of change is driven by each process?".
:::

::: summary
- The rate of substitution is $k = 2N\mu u$; for neutral mutations $k = \mu$, and with selection $k/\mu = S/(1 - e^{-S})$, $S = 4N_es$ ([[#prop-k-selected]]). Mutations with $\lvert S\rvert \lesssim 1$ are nearly neutral; their fate depends on $N_e$.
- The nearly neutral theory predicts faster protein evolution and higher $d_N/d_S$ in small populations, and weak selection on codon usage visible only in large populations.
- Observed differences are corrected for multiple hits: $\hat d = -\tfrac34\ln(1 - \tfrac43\hat p)$ (Jukes–Cantor, [[#prop-jc]]); $\omega = d_N/d_S$ uses counts of synonymous and non-synonymous sites.
- The molecular clock is overdispersed and lineage-dependent; relaxed clocks and careful calibration are needed.
- The neutral site frequency spectrum is $\E[\xi_i] = \theta/i$; Tajima's $D$ compares $\pi$ with $S/a_n$ ([[#def-tajima]]): negative after sweeps or expansion, positive under balancing selection or contraction.
- HKA compares polymorphism and divergence across loci; McDonald–Kreitman compares them across site classes within a gene, with $\alpha = 1 - D_SP_N/(D_NP_S)$ ([[#prop-mk]]).
- Purifying selection dominates; adaptive substitution is common in species with large $N_e$; linked selection shapes diversity. How far selection pervades genomes is still debated, but neutral theory is the null model.
:::

## Exercises

::: exercise A corrected distance {level=1 check="0.3831"}
Two sequences differ at 30 % of aligned sites. What is the Jukes–Cantor distance (four decimal places)?
::: solution
$\hat d = -0.75\ln(1 - 0.4) = -0.75\times(-0.5108) = 0.3831$ substitutions per site.
:::
:::

::: exercise Relative substitution rate {level=1 check="0.5820"}
What is the substitution rate, relative to neutral, of mutations with $4N_es = -1$ (four decimal places)?
::: solution
$k/\mu = -1/(1 - e^{1}) = -1/(-1.7183) = 0.5820$.
:::
:::

::: exercise Proportion of adaptive substitutions {level=1 check="0.6"}
An MK table has $D_N = 20$, $D_S = 40$, $P_N = 8$, $P_S = 40$. Estimate $\alpha$.
::: solution
$\alpha = 1 - (40\times8)/(20\times40) = 1 - 320/800 = 0.6$.
:::
:::

::: exercise Saturation {level=2}
(a) Show that the Jukes–Cantor distance is approximately $\hat p + \tfrac23\hat p^2$ for small $\hat p$. (b) For what observed $\hat p$ does the correction add 10 % to the uncorrected distance? (c) Why are synonymous sites of anciently diverged genes, such as those shared by mammals and fish, of little use for dating?
::: solution
(a) $-\ln(1 - x) = x + x^2/2 + \cdots$ with $x = \tfrac43\hat p$: $\hat d = \tfrac34(\tfrac43\hat p + \tfrac{16}{18}\hat p^2 + \cdots) = \hat p + \tfrac23\hat p^2 + \cdots$.

(b) $\tfrac23\hat p^2 \approx 0.1\hat p$ gives $\hat p \approx 0.15$; solving $\hat d = 1.1\hat p$ exactly gives $\hat p = 0.13$.

(c) Synonymous sites evolve fast; over hundreds of millions of years they have changed many times, so $\hat p$ approaches $\tfrac34$ (or less, given base-composition bias) and the distance estimate becomes extremely uncertain or infinite. Slowly evolving non-synonymous sites, or amino-acid sequences, retain information over such times.
:::
:::

::: exercise The nearly neutral boundary {level=2 check="0.000025"}
Below what magnitude of $s$ does a mutation behave as effectively neutral ($4N_e\lvert s\rvert < 1$) in a population of $N_e = 10^4$?
::: solution
$\lvert s\rvert < 1/(4\times10^4) = 2.5\times10^{-5}$.
:::
:::

::: exercise Interpreting Tajima's D across a genome {level=2}
In a survey of 5,000 genes in a human population, Tajima's $D$ is negative for most genes, with a genome-wide mean of about $-0.5$; a few genes have $D < -2.5$ and a few $D > 2$. (a) Why is a genome-wide shift towards negative values evidence for demography rather than for selection? (b) What would you conclude about the genes in the tails?
::: solution
(a) Selection acts on particular genes, whereas changes in population size alter the genealogies of all loci. A genome-wide excess of rare variants is the signature of population growth — consistent with the recent expansion of human populations.

(b) Against this background, the tails are candidates for selection: strongly negative $D$ for recent sweeps or purifying selection, strongly positive $D$ for balancing selection (the HLA genes are classic examples). Their significance should be judged against the empirical genome-wide distribution or against simulations under a demographic model fitted to the whole genome, and confirmed by other evidence (haplotype length, $F_\mathrm{ST}$, function).
:::
:::

::: exercise A d_N/d_S calculation {level=2}
A pair of sequences has 600 non-synonymous and 200 synonymous sites, with 24 non-synonymous and 16 synonymous differences. Calculate $\omega$ with and without the Jukes–Cantor correction, and say which interpretation is more appropriate.
::: solution
$p_N = 0.04$, $p_S = 0.08$. Uncorrected $\omega = 0.5$. Corrected: $d_N = -0.75\ln(1 - 0.0533) = 0.0411$, $d_S = -0.75\ln(1 - 0.1067) = 0.0846$, $\omega = 0.486$. The correction reduces $\omega$ slightly because the faster-evolving synonymous sites have had more multiple hits. Either way, $\omega \approx 0.5$ indicates moderate purifying selection on average, but cannot exclude positive selection at a subset of sites, which needs site-specific models.
:::
:::

::: exercise The MK test and slightly deleterious mutations {level=3}
Suppose that, in addition to neutral and strongly deleterious non-synonymous mutations, a class of slightly deleterious mutations contributes many polymorphisms (mostly rare) but almost no fixed differences. (a) In which direction does this bias the estimate of $\alpha$? (b) Explain why excluding polymorphisms below a frequency of, say, 10 % reduces the bias. (c) If the population has expanded greatly since the two species diverged, how might slightly deleterious mutations bias the test in the opposite direction?
::: solution
(a) It inflates $P_N$, so $D_SP_N/(D_NP_S)$ increases and $\alpha$ is underestimated (it can even become negative, suggesting a non-existent excess of polymorphism).

(b) Slightly deleterious variants are held at low frequency by selection, so they are over-represented among rare polymorphisms; neutral variants are spread over all frequencies. Excluding rare polymorphisms removes a disproportionate share of the slightly deleterious ones, bringing $P_N/P_S$ closer to the ratio for neutral mutations. (Methods that model the distribution of fitness effects do this more formally.)

(c) If the ancestral population was small, slightly deleterious mutations behaved as nearly neutral and some were fixed, inflating $D_N$; in the present large population, they are efficiently selected against and contribute few polymorphisms. $D_N/D_S$ is then raised relative to $P_N/P_S$ without any adaptive evolution, and $\alpha$ is overestimated.
:::
:::

::: exercise Is the clock overdispersed? {level=3}
A protein has accumulated 12, 20, 8, 25 and 15 amino-acid substitutions along five independent lineages of the same age. (a) Compute the index of dispersion (variance divided by mean). (b) What is its expected value if substitutions follow a Poisson process? (c) Suggest two reasons for a value well above this expectation.
::: solution
(a) Mean $= 80/5 = 16$. Sample variance $= [(-4)^2 + 4^2 + (-8)^2 + 9^2 + (-1)^2]/4 = (16 + 16 + 64 + 81 + 1)/4 = 178/4 = 44.5$. Index $= 44.5/16 = 2.8$.

(b) 1, since a Poisson variable's variance equals its mean. (With five lineages the estimate is noisy; under a Poisson model $4\times$ the index, $11.1$, would be approximately χ² with 4 df, giving $P \approx 0.025$.)

(c) Different lineages have different mutation rates per year (generation time, repair efficiency); episodes of positive selection in some lineages; or changes in population size, which under the nearly neutral theory change the fixation rate of slightly deleterious mutations along different lineages. Shared phylogeny would also violate the independence assumed here.
:::
:::
