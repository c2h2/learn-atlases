So far we have followed one locus at a time. But genes sit on chromosomes, and a chromosome is inherited as a block, cut only by the few crossovers of each meiosis ([[genetics/linkage-mapping]]). The alleles at two nearby loci are therefore not shuffled independently in each generation, and in a population particular combinations — **haplotypes** — can be more or less common than the product of the allele frequencies would predict. This non-random association is called **linkage disequilibrium** (LD), and it is everywhere in genomes: around a recent mutation, near a gene that has just been swept to high frequency by selection, after two populations mix, and simply as a result of drift in a finite population.

LD matters in three ways. It is a record of history, from which recombination rates, selective sweeps, population sizes and admixture dates can be read. It is a tool: genome-wide association studies work because genotyped markers are in LD with the causal variants they did not genotype. And it complicates other analyses, because loci in LD are not independent. This chapter defines the measures of LD, shows how recombination breaks it down, explains how it arises, and shows how it is used.

## Haplotypes and the measure D

Consider two loci, with alleles $A$, $a$ at the first and $B$, $b$ at the second. A gamete (or a haplotype — one chromosome's alleles) carries one of four combinations: $AB$, $Ab$, $aB$, $ab$. Let their frequencies be $x_{AB}$, $x_{Ab}$, $x_{aB}$, $x_{ab}$, and the allele frequencies $p_A = x_{AB} + x_{Ab}$, $p_B = x_{AB} + x_{aB}$, with $p_a = 1 - p_A$ and $p_b = 1 - p_B$.

If the alleles at the two loci were combined independently, we would have $x_{AB} = p_Ap_B$ and so on. The departure from independence is measured by a single number.

::: definition The coefficient of linkage disequilibrium {#def-d}
The **linkage disequilibrium** between loci $A$ and $B$ is

$$
D = x_{AB} - p_Ap_B = x_{AB}x_{ab} - x_{Ab}x_{aB}.
$$ {#eq-d}

Then $x_{AB} = p_Ap_B + D$, $x_{ab} = p_ap_b + D$, $x_{Ab} = p_Ap_b - D$ and $x_{aB} = p_ap_B - D$. The loci are in **linkage equilibrium** if $D = 0$.
:::

The two expressions for $D$ are equal: substituting the four haplotype frequencies in terms of $D$, $x_{AB}x_{ab} - x_{Ab}x_{aB} = (p_Ap_B + D)(p_ap_b + D) - (p_Ap_b - D)(p_ap_B - D) = D(p_Ap_B + p_ap_b + p_Ap_b + p_ap_B) = D$. The name is unfortunate: linkage disequilibrium can exist between unlinked loci (on different chromosomes), and linked loci can be in linkage equilibrium. "Gametic phase disequilibrium" is more accurate but rarely used.

The sign of $D$ depends on which alleles we label $A$ and $B$, and its possible range depends on the allele frequencies, which makes raw values hard to compare. Two standardised measures are used.

::: definition D′ and r² {#def-dprime}
**Lewontin's $D'$** (Richard Lewontin, 1964) scales $D$ by its maximum possible magnitude given the allele frequencies:

$$
D' = \frac{D}{D_\mathrm{max}},\qquad D_\mathrm{max} = \begin{cases}\min(p_Ap_b,\ p_ap_B) & D > 0,\\ \min(p_Ap_B,\ p_ap_b) & D < 0.\end{cases}
$$ {#eq-dprime}

$\lvert D'\rvert = 1$ means that at least one of the four haplotypes is absent. The **squared correlation** between the allelic states of the two loci on the same haplotype (coding each allele as 0 or 1) is

$$
r^2 = \frac{D^2}{p_Ap_ap_Bp_b}.
$$ {#eq-r2}

$r^2 = 1$ means only two haplotypes are present, so the allele at one locus predicts the allele at the other perfectly.
:::

The two measures answer different questions. $D'$ asks whether recombination (or recurrent mutation) has occurred between the loci since the alleles arose: a new mutation arises on one haplotype, and until a crossover moves it to another background, one haplotype is missing and $\lvert D'\rvert = 1$, whatever the allele frequencies. $r^2$ asks how well one locus predicts the other, which is what matters for association studies; it can be small even when $\lvert D'\rvert = 1$ if the allele frequencies differ.

::: example Measuring LD from haplotype counts {#ex-measures}
In a sample of 200 phased chromosomes, the haplotype counts at two SNPs are $AB$ 90, $Ab$ 30, $aB$ 20, $ab$ 60. Calculate $D$, $D'$ and $r^2$, and test whether the loci are in linkage equilibrium.
::: solution
Haplotype frequencies: $x_{AB} = 0.45$, $x_{Ab} = 0.15$, $x_{aB} = 0.10$, $x_{ab} = 0.30$. Allele frequencies: $p_A = 0.60$, $p_B = 0.55$.

$D = 0.45 - 0.60\times0.55 = 0.12$; check: $0.45\times0.30 - 0.15\times0.10 = 0.135 - 0.015 = 0.12$.

Since $D > 0$, $D_\mathrm{max} = \min(0.60\times0.45,\ 0.40\times0.55) = \min(0.27, 0.22) = 0.22$, so $D' = 0.12/0.22 = 0.55$.

$r^2 = 0.12^2/(0.60\times0.40\times0.55\times0.45) = 0.0144/0.0594 = 0.242$.

For a 2×2 table of $n$ haplotypes, the χ² statistic for independence equals $nr^2$ ([[biostatistics/categorical-data]]): $\chi^2 = 200\times0.242 = 48.5$ with 1 degree of freedom, $P < 10^{-10}$. The loci are in strong LD, with $AB$ and $ab$ in excess. Yet $D' = 0.55$ shows that all four haplotypes are present at appreciable frequency, so recombination or recurrent mutation has occurred between them, and $r^2 = 0.24$ means that one SNP explains only about a quarter of the variation at the other.
:::
:::

## Recombination breaks down LD

Hardy–Weinberg proportions are restored by a single generation of random mating ([[population-genetics/hardy-weinberg]]). Linkage equilibrium is not, because the two alleles on a chromosome travel together unless a crossover separates them.

::: proposition Decay of linkage disequilibrium {#prop-decay}
In a large random-mating population without selection, mutation or migration, if the recombination fraction between the loci is $c$ (with $0 \le c \le \tfrac12$), then

$$
D_{t+1} = (1 - c)D_t,\qquad D_t = (1 - c)^tD_0 \approx D_0e^{-ct}.
$$ {#eq-decay}

Allele frequencies are unchanged, and $D \to 0$.
:::

::: proof
A gamete produced in generation $t$ is either non-recombinant (probability $1 - c$), in which case it is a copy of one of the parent's two haplotypes and so is $AB$ with probability $x_{AB}(t)$; or recombinant (probability $c$), in which case its $A$-locus allele and $B$-locus allele come from the two different haplotypes of the parent. With random mating, those two haplotypes are independent random draws from the population, so a recombinant gamete is $AB$ with probability $p_Ap_B$. Hence

$$
x_{AB}(t + 1) = (1 - c)\,x_{AB}(t) + c\,p_Ap_B.
$$

Subtracting $p_Ap_B$ (which does not change) from both sides gives $D_{t+1} = (1 - c)D_t$.
:::

For unlinked loci, $c = \tfrac12$ and $D$ halves every generation: LD between loci on different chromosomes is erased within a few generations. For tightly linked loci it persists. With $c = 0.01$ (about 1 cM, or roughly a megabase in humans) the half-life is $\ln 2/c \approx 69$ generations; with $c = 10^{-4}$ (about 10 kb) it is about 7,000 generations — roughly 200,000 years of human history.

::: widget plot
f: D0*(1 - c)^x; D0*0.5^x
x: 0, 100
y: 0, 0.25
sliders: D0=0.12:0:0.25:0.01; c=0.05:0.001:0.5:0.001
labels: D_t,\ c; D_t,\ c = 1/2
caption: The decay of linkage disequilibrium [[#eq-decay]] from an initial $D_0$ (default 0.12, the value in [[#ex-measures]]) for recombination fraction $c$, compared with unlinked loci ($c = \tfrac12$), whose disequilibrium is gone in a few generations. Reduce $c$ to 0.005 (half a centimorgan) and see that after 100 generations 60 % of the initial disequilibrium remains. Allele frequencies do not change at all during this decay: only the way alleles are combined on chromosomes changes.
:::

::: intuition Why one generation is enough for Hardy–Weinberg but not for linkage equilibrium
Random mating pairs gametes at random, so it immediately randomises which two *haplotypes* an individual carries. But it does nothing to the composition of the haplotypes themselves. Only recombination, inside the meioses of double heterozygotes, makes new haplotypes from old ones — and only a fraction $c$ of gametes are recombinant. Equilibrium at one locus concerns genotypes, built afresh every generation; equilibrium between loci concerns haplotypes, which are inherited.
:::

### Haplotypes from genotypes

Laboratory genotyping usually reports each individual's genotype at each locus, not which alleles lie on the same chromosome. For individuals homozygous at one or both loci the phase is known. The ambiguous case is the **double heterozygote** $AaBb$, which may carry $AB/ab$ (coupling) or $Ab/aB$ (repulsion). Haplotype frequencies can still be estimated by maximum likelihood, with the **expectation–maximisation (EM) algorithm** (Laurent Excoffier and Montgomery Slatkin, 1995, and others): guess the haplotype frequencies; use them to compute the probability that each double heterozygote is in coupling, $x_{AB}x_{ab}/(x_{AB}x_{ab} + x_{Ab}x_{aB})$ (E-step, assuming Hardy–Weinberg proportions for haplotype pairs); recount haplotypes using these expected numbers (M-step); and iterate.

```python
INDEX = {'AB': 0, 'Ab': 1, 'aB': 2, 'ab': 3}

def em_haplotypes(counts, iters=50):
    """counts[(gA, gB)]: number of individuals carrying gA copies of A and gB of B.
    Returns estimated frequencies of haplotypes [AB, Ab, aB, ab]."""
    x = [0.25] * 4                                  # starting guess
    for _ in range(iters):
        n_hap = [0.0] * 4                           # expected haplotype counts
        for (gA, gB), n in counts.items():
            if gA == 1 and gB == 1:                 # double heterozygote: AB/ab or Ab/aB?
                cis, trans = x[0] * x[3], x[1] * x[2]
                f = cis / (cis + trans)             # E-step: P(phase AB/ab | genotype)
                for h, w in ((0, f), (3, f), (1, 1 - f), (2, 1 - f)):
                    n_hap[h] += n * w
            else:                                   # at most one heterozygous locus: phase known
                alleles_A = 'A' * gA + 'a' * (2 - gA)
                alleles_B = 'B' * gB + 'b' * (2 - gB)
                for a, b in zip(alleles_A, alleles_B):
                    n_hap[INDEX[a + b]] += n
        x = [h / sum(n_hap) for h in n_hap]         # M-step
    return x

counts = {(2, 2): 202, (2, 1): 135, (2, 0): 22,
          (1, 2): 90,  (1, 1): 300, (1, 0): 90,
          (0, 2): 10,  (0, 1): 60,  (0, 0): 90}
print([round(v, 3) for v in em_haplotypes(counts)])   # [0.45, 0.15, 0.1, 0.3]
```

The genotype counts of 999 individuals in this listing were generated from haplotype frequencies $0.45, 0.15, 0.10, 0.30$, and the algorithm recovers them although 300 individuals — almost a third — are double heterozygotes of unknown phase. Modern phasing programs extend the idea to thousands of linked SNPs at once, using the fact that haplotypes in a population are mosaics of a limited number of ancestral haplotypes.

## Where LD comes from

If recombination always erodes LD, why is there any? Several processes generate it continually.

**Mutation.** A new mutation arises on one chromosome, so it is initially associated completely with the alleles at all other loci on that chromosome: $\lvert D'\rvert = 1$ with every linked polymorphism. The association decays only as recombination moves the new allele onto other backgrounds. Young alleles are therefore surrounded by long haplotypes; old alleles by short ones.

**Drift.** In a finite population, haplotype frequencies drift just as allele frequencies do, so random associations arise even between neutral loci. At equilibrium between drift creating LD and recombination destroying it, John Sved (1971) showed that

$$
\E[r^2] \approx \frac{1}{1 + 4N_ec},
$$ {#eq-sved}

so the typical strength of LD between neutral loci depends on the product $4N_ec$, the **population recombination rate** $\rho$. (In a sample of $n$ chromosomes, sampling error adds roughly $1/n$ to the expected $r^2$, which matters for small samples.) William Hill and Alan Robertson had analysed the dynamics of drift-generated LD in 1968.

::: example LD in a population of 10,000 {#ex-sved}
In a species with $N_e = 10^4$ and a recombination rate of 1 cM per megabase ($c \approx 10^{-8}$ per base pair), what is the expected $r^2$ between SNPs 10 kb apart, and 100 kb apart? What would it be if $N_e$ were $10^6$?
::: solution
At 10 kb, $c = 10^4\times10^{-8} = 10^{-4}$ and $4N_ec = 4$, so $\E[r^2] \approx 1/5 = 0.20$. At 100 kb, $c = 10^{-3}$ and $4N_ec = 40$, so $\E[r^2] \approx 1/41 = 0.024$. With $N_e = 10^6$, $4N_ec$ is 100 times larger and $\E[r^2]$ is about $0.0025$ at 10 kb: LD decays over a few hundred base pairs. This is why association studies in humans, with $N_e$ of order $10^4$, can use a few hundred thousand to a few million markers, whereas in species with very large populations, such as *Drosophila* or many outcrossing plants, LD is too short-range for that approach — and why, conversely, domesticated animals and selfing plants, with small effective sizes or little effective recombination, show LD over megabases.
:::
:::

::: widget plot
f: 1/(1 + 4*N*x*1e-5); 1/(1 + 4*M*x*1e-5)
x: 0, 200
y: 0, 1
sliders: N=10000:1000:100000:1000; M=1000:100:100000:100
labels: N_e = N; N_e = M
caption: Expected $r^2$ between two neutral SNPs against the distance between them in kilobases, from Sved's approximation [[#eq-sved]], assuming 1 cM per megabase ($c = 10^{-5}$ per kb), for two effective sizes $N$ and $M$. The default $N = 10{,}000$ is of the order of the human long-term $N_e$; $M = 1000$ represents a population with a much smaller effective size, such as a domestic breed. Notice that a tenfold smaller $N_e$ stretches the decay over a tenfold greater distance: LD is long-range in small populations. The approximation ignores sampling error and recent changes in population size.
:::

**Admixture and population structure.** When two populations with different allele frequencies mix, LD appears between every pair of loci that differ in frequency between them, linked or not, because individuals of one ancestry carry the alleles typical of that ancestry at both loci.

::: proposition LD created by admixture {#prop-admixture}
If a population is formed by mixing fractions $c_1$ and $c_2 = 1 - c_1$ of two source populations, each in linkage equilibrium, with allele frequencies $p_{A,i}$ and $p_{B,i}$ ($i = 1, 2$), then immediately after mixing

$$
D = c_1c_2\,(p_{A,1} - p_{A,2})(p_{B,1} - p_{B,2}).
$$ {#eq-admixture}

After the populations interbreed at random, $D$ decays at rate $c$ per generation by [[#prop-decay]].
:::

::: proof
In the mixture $x_{AB} = c_1p_{A,1}p_{B,1} + c_2p_{A,2}p_{B,2}$, while $p_A = c_1p_{A,1} + c_2p_{A,2}$ and similarly for $p_B$. Expanding $x_{AB} - p_Ap_B$ and using $c_1 - c_1^2 = c_2 - c_2^2 = c_1c_2$:

$$
D = c_1c_2\,(p_{A,1}p_{B,1} + p_{A,2}p_{B,2} - p_{A,1}p_{B,2} - p_{A,2}p_{B,1}) = c_1c_2(p_{A,1} - p_{A,2})(p_{B,1} - p_{B,2}).
$$
:::

Because admixture LD decays at a rate set by $c$, its extent over genetic distance dates the admixture. Between unlinked loci it vanishes almost at once; between loci a genetic distance $d$ Morgans apart it decays roughly as $e^{-dt}$ after $t$ generations. Fitting this decay across the genome estimates $t$ — the principle behind methods that date admixture events in human history from a few generations to a few thousand years ago (Po-Ru Loh and colleagues, 2013, among others). The lengths of chromosome segments inherited from Neanderthals in present-day non-Africans, which shrink with each generation of recombination, have been used in the same way to date that admixture to tens of thousands of years ago (Sriram Sankararaman and colleagues, 2012; [[evolution/human-evolution]]).

::: example LD from mixing two populations {#ex-admix}
Two populations have allele frequencies $p_A = 0.9$, $p_B = 0.8$ (population 1) and $p_A = 0.1$, $p_B = 0.2$ (population 2), and each is in linkage equilibrium. They merge in equal numbers and then mate at random. What is $D$ immediately after mixing, and after 10 generations if the loci are 10 cM apart ($c = 0.1$)? If they were unlinked?
::: solution
By [[#eq-admixture]], $D = 0.5\times0.5\times(0.9 - 0.1)(0.8 - 0.2) = 0.25\times0.8\times0.6 = 0.12$. Since $p_A = p_B = 0.5$ in the mixture, $D_\mathrm{max} = 0.25$ and $D' = 0.48$. After 10 generations with $c = 0.1$, $D = 0.12\times0.9^{10} = 0.042$. For unlinked loci, $D = 0.12\times0.5^{10} = 1.2\times10^{-4}$, essentially zero. LD between unlinked loci is a signature of very recent mixing, or of continuing structure in the sample (the "Wahlund effect" for pairs of loci).
:::
:::

::: example Dating an admixture event {#ex-date}
In an admixed population, the average admixture-induced LD between pairs of markers is measured as a function of their genetic distance $d$. For pairs about 1 cM apart ($d = 0.01$ M) it is 3.3 times larger than for pairs about 5 cM apart ($d = 0.05$ M). Assuming a single pulse of admixture followed by random mating, estimate when it happened, taking 29 years per generation.
::: solution
After $t$ generations, the LD at distance $d$ (in Morgans) is proportional to $(1 - c)^t \approx e^{-dt}$ for small $d$, with the same constant of proportionality — set by [[#eq-admixture]] — at all distances. The ratio of the LD at $0.05$ M to that at $0.01$ M is therefore $e^{-0.04t} = 1/3.3 = 0.30$, so

$$
t = \frac{-\ln 0.30}{0.04} = \frac{1.20}{0.04} = 30\ \text{generations},
$$

about 870 years. Taking a ratio cancels the unknown amplitude, which depends on the mixing proportions and allele-frequency differences. Real methods fit the whole decay curve across many distances and many thousands of marker pairs, and a curve that is not a single exponential reveals several pulses or continuous gene flow.
:::
:::

**Selection.** Selection generates LD in two ways. If fitness depends on the combination of alleles at two loci (**epistasis**), favoured combinations become associated; this maintains LD between tightly linked loci, as in the supergenes that control mimicry morphs in butterflies or heterostyly in primroses, which are held together by inversions or very low recombination. And selection at one locus drags linked neutral variants along with it — the most important case, which we now consider.

## Hitchhiking and selective sweeps

When a new favourable mutation arises and spreads to fixation, the chromosome segment on which it arose spreads with it. Neutral alleles that happened to be on that original haplotype rise in frequency too — they **hitchhike** — and variation in the region is wiped out. John Maynard Smith and John Haigh described this in 1974.

How large is the affected region? A sweep of an additive allele with selection coefficient $s$ (homozygote advantage) from a single copy to fixation lasts about $(4/s)\ln(2N_es)$ generations, by the sweep time in [[population-genetics/selection-models]] with $p_0 \approx 1/2N$ and the slow early phase in which drift dominates. A neutral site at recombination fraction $c$ escapes the sweep if a crossover moves it off the favoured haplotype while that haplotype is still rare. Heuristically, sites with $c$ much smaller than $s/\ln(2N_es)$ are dragged along and lose their variation, and sites with $c$ much larger are almost unaffected. For $s = 0.01$ and $N_e = 10^4$, $\ln(2N_es) = \ln 200 = 5.3$, so the region of strongly reduced diversity has $c$ of order $0.002$, a few hundred kilobases in humans. A sweep leaves a characteristic signature:

1. **Reduced diversity** around the selected site, recovering with distance.
2. **An excess of rare variants** as new mutations accumulate on the swept haplotype, and of high-frequency derived alleles at the edges of the region, detected by statistics such as Tajima's $D$ ([[population-genetics/neutral-theory]]).
3. **A long, high-frequency haplotype** while the sweep is recent or incomplete, because there has been too little time for recombination to break it down. Pardis Sabeti and colleagues (2002) turned this into the **extended haplotype homozygosity** test: an allele at high frequency with an unusually long haplotype must be young, and if it is young and common, it rose quickly — faster than drift allows.

Across the genome, the cumulative effect of repeated sweeps (and of **background selection**, the removal of linked neutral variation along with deleterious mutations) is a positive correlation between nucleotide diversity and the local recombination rate, first shown for *D. melanogaster* by David Begun and Charles Aquadro (1992). Mutation rates did not explain the pattern, but linked selection did: regions with little recombination are more strongly affected by selection at linked sites.

::: application Lactase persistence and the signature of selection
Most mammals lose the ability to digest lactose after weaning, because expression of the lactase gene *LCT* declines. In many people of European, African and Middle Eastern ancestry, expression continues into adulthood (lactase persistence), caused by several different variants in an enhancer upstream of *LCT*, within the neighbouring gene *MCM6*. The commonest European variant, a `C`→`T` change 13,910 bp upstream of *LCT*, lies on a haplotype that extends unbroken for more than a megabase at high frequency in northern Europe (Todd Bersaglieri and colleagues, 2004) — far longer than expected for an allele of that frequency, and one of the strongest signals of recent positive selection in the human genome. Ancient DNA shows that the variant was rare in Europe's early farmers and rose mainly within the last few thousand years. Different variants with similar effects spread independently in pastoralist populations of East Africa (Sarah Tishkoff and colleagues, 2007): convergent evolution by selection on the same regulatory region.
:::

## LD in genome analysis

**Association studies.** A genome-wide association study (GWAS) tests markers for association with a trait across many individuals ([[genomics/association-studies]]). The causal variant is usually not among the markers genotyped; it is detected through a nearby marker in LD with it. If the causal variant has effect $\beta$ and the marker is correlated with it with $r^2$, the association signal at the marker is diluted: to detect it with the same power requires about $1/r^2$ times as many individuals (Jonathan Pritchard and Molly Przeworski, 2001). This motivated the International HapMap Project (2005) and the choice of **tag SNPs** that capture common variation. The same LD makes it hard to identify which of many correlated variants in an associated region is causal — the problem of **fine mapping** — and explains why associations found in one population often replicate imperfectly in others with different LD patterns.

**Recombination maps.** Because the decay of LD with distance depends on $4N_ec$, patterns of LD in a sample can be used to estimate fine-scale recombination rates. Such LD-based maps, together with direct measurements in sperm (Alec Jeffreys and colleagues, 2001), showed that human recombination is concentrated in **hotspots** 1–2 kb wide, separated by long regions of little recombination, which creates a block-like pattern of LD. In 2010 three groups showed that the protein PRDM9, which binds a specific DNA motif, determines the location of most hotspots in humans and mice.

**History.** LD patterns record population history. LD extends over longer distances in populations that went through bottlenecks, such as those that left Africa, than in African populations, consistent with the larger long-term effective size of the latter. The level of LD between loci at different distances can even be used to estimate how $N_e$ has changed over time, because LD between distant loci reflects recent $N_e$ and LD between close loci reflects more ancient $N_e$.

::: warning "Linkage disequilibrium means the loci are linked" and "LD means the variants interact"
LD is a statistical association in a population. It can be created between unlinked loci by admixture, by population structure in the sample, or by selection, and it can be absent between tightly linked loci. Nor does LD imply that the variants interact functionally or that either one affects a trait: in an association study, a marker in strong LD with a causal variant shows the association without doing anything itself. And linkage — physical proximity on a chromosome, measured in a family by co-segregation ([[genetics/linkage-mapping]]) — is a property of the genome, the same in every population, whereas LD differs from population to population.
:::

::: quiz
A SNP associated with a disease in a GWAS has $r^2 = 0.2$ with the true causal variant. Compared with genotyping the causal variant itself, roughly how many times as many individuals are needed to detect the association with the same power?
- [ ] 0.2 times
- [ ] 2 times
- [x] 5 times
- [ ] 25 times
::: solution
The association test statistic at the marker is reduced by the factor $r^2$ relative to that at the causal variant, so the sample size needed for the same power scales as $1/r^2 = 5$. Imperfect tagging is one reason why studies of rare variants, which are often poorly correlated with common marker SNPs, need sequencing rather than arrays.
:::
:::

::: history
Herbert Jennings (1917) and Robert Robbins (1918) showed, for model mating systems, that associations between linked loci decay at a rate set by recombination. Richard Lewontin and Ken-ichi Kojima (1960) introduced the coefficient $D$ in a study of two-locus selection, and Lewontin defined $D'$ in 1964; William Hill and Alan Robertson (1968) analysed LD generated by drift and introduced $r^2$ in this context, and John Sved (1971) related its expectation to $N_ec$. Maynard Smith and Haigh's hitchhiking paper (1974) and Kaplan, Hudson and Langley's coalescent treatment of sweeps (1989) founded the genomic search for selection. The discovery of haplotype blocks and recombination hotspots in the human genome (Mark Daly and colleagues, and Alec Jeffreys and colleagues, 2001), the HapMap Project (2005) and the first genome-wide association studies (from 2005 onwards) made LD a central tool of human genetics.
:::

::: summary
- Linkage disequilibrium $D = x_{AB} - p_Ap_B = x_{AB}x_{ab} - x_{Ab}x_{aB}$ measures the association of alleles on haplotypes ([[#def-d]]); $D'$ scales it to its maximum, and $r^2 = D^2/(p_Ap_ap_Bp_b)$ is the squared correlation ([[#def-dprime]]). For $n$ haplotypes, $\chi^2 = nr^2$ tests $D = 0$.
- Random mating does not remove LD in one generation; recombination does, at rate $c$: $D_t = (1 - c)^tD_0$ ([[#prop-decay]]).
- Haplotype frequencies can be estimated from unphased genotypes by the EM algorithm.
- LD is generated by new mutations ($\lvert D'\rvert = 1$ initially), by drift ($\E[r^2] \approx 1/(1 + 4N_ec)$), by admixture ($D = c_1c_2\Delta p_A\Delta p_B$, [[#prop-admixture]]), by epistatic selection, and by hitchhiking.
- A selective sweep reduces diversity over a region of $c$ of order $s/\ln(2N_es)$ and leaves long high-frequency haplotypes; linked selection makes diversity correlate with recombination rate.
- LD makes association studies possible (power scales with $r^2$), reveals recombination hotspots, and records bottlenecks and admixture dates.
:::

## Exercises

::: exercise Computing D {level=1 check="0.05"}
Haplotype frequencies at two loci are $x_{AB} = 0.35$, $x_{Ab} = 0.15$, $x_{aB} = 0.25$, $x_{ab} = 0.25$. Calculate $D$.
::: solution
$p_A = 0.5$, $p_B = 0.6$, so $D = 0.35 - 0.30 = 0.05$. Check: $0.35\times0.25 - 0.15\times0.25 = 0.0875 - 0.0375 = 0.05$.
:::
:::

::: exercise Decay of LD {level=1 check="0.0625"}
Two unlinked loci ($c = \tfrac12$) with $p_A = p_B = 0.5$ start at the maximum possible disequilibrium, $D_0 = 0.25$ (only $AB$ and $ab$ haplotypes present). What is $D$ after two generations of random mating?
::: solution
$D_2 = 0.25\times0.5^2 = 0.0625$.
:::
:::

::: exercise Half-life {level=1 check="693"}
How many generations does it take for LD between loci with $c = 0.001$ to halve (to the nearest generation, using $\ln 2/c$)?
::: solution
$\ln 2/0.001 = 693$ generations (the exact $\ln 0.5/\ln 0.999 = 692.8$).
:::
:::

::: exercise D′ and r² {level=2}
For the haplotype frequencies of the first exercise, calculate $D'$ and $r^2$, and test for LD in a sample of 400 haplotypes.
::: solution
$D > 0$, so $D_\mathrm{max} = \min(p_Ap_b, p_ap_B) = \min(0.5\times0.4, 0.5\times0.6) = 0.20$ and $D' = 0.25$. $r^2 = 0.0025/(0.5\times0.5\times0.6\times0.4) = 0.0025/0.06 = 0.0417$. In 400 haplotypes, $\chi^2 = 400\times0.0417 = 16.7$, 1 df, $P \approx 4\times10^{-5}$: significant LD, but weak.
:::
:::

::: exercise Expected r² {level=2 check="1/11"}
In a population with $N_e = 5000$, what is the expected $r^2$ between neutral loci with $c = 5\times10^{-4}$, by Sved's formula?
::: solution
$4N_ec = 4\times5000\times5\times10^{-4} = 10$, so $\E[r^2] \approx 1/11 = 0.091$.
:::
:::

::: exercise Admixture LD {level=2 check="0.0256"}
A population forms from 80 % of population 1 ($p_A = 0.7$, $p_B = 0.6$) and 20 % of population 2 ($p_A = 0.3$, $p_B = 0.2$), each in linkage equilibrium. What is $D$ immediately after mixing?
::: solution
By [[#eq-admixture]], $c_1c_2 = 0.8\times0.2 = 0.16$ and $(0.7 - 0.3)(0.6 - 0.2) = 0.16$, so $D = 0.16\times0.16 = 0.0256$. Unequal mixing proportions reduce the disequilibrium: the maximum of $c_1c_2$ is $\tfrac14$, at equal proportions.
:::
:::

::: exercise A sweep in the data {level=2}
In a sample of 100 chromosomes from one population, a 300-kb region contains 5 segregating sites, while the genome-wide average for 300-kb windows with similar recombination rates is 120. At the centre of the region, a derived allele at frequency 0.9 sits on a haplotype that is identical in all its carriers over 250 kb. (a) What hypothesis does this suggest? (b) What alternative explanations should be ruled out? (c) How would you test whether the haplotype is unusually long for its frequency?
::: solution
(a) A recent, nearly complete selective sweep: a favoured allele rose quickly to 90 %, carrying its original haplotype with it and removing linked variation.

(b) Low mutation rate in the region; strong background selection (if the region is gene-dense with low recombination); a genotyping or alignment artefact (for example, low coverage in a repetitive region); a recent bottleneck — though a bottleneck would affect the whole genome, not one region. A locally low recombination rate would also produce longer haplotypes.

(c) Compare its extended haplotype homozygosity with that of other alleles at the same frequency across the genome (or with neutral simulations matched for recombination rate and demography). An allele with much longer haplotypes than others of the same frequency is unusually young for its frequency, which indicates rapid rise — the logic of Sabeti's test.
:::
:::

::: exercise LD from structure in the sample {level=3}
A biologist samples equal numbers of individuals from two subpopulations that differ at two unlinked loci: in subpopulation 1, $p_A = 0.8$, $p_B = 0.7$; in subpopulation 2, $p_A = 0.2$, $p_B = 0.3$. Each subpopulation is in linkage equilibrium. (a) What LD is found in the pooled sample? (b) Why does it not decay in successive samples of the same kind? (c) What does this imply for association studies, and how is the problem handled?
::: solution
(a) Pooling is equivalent to admixture without interbreeding: $D = 0.25\times0.6\times0.4 = 0.06$, with $r^2 = 0.06^2/(0.5\times0.5\times0.5\times0.5) = 0.058$.

(b) The subpopulations do not interbreed, so recombination never mixes the two ancestries; the association is recreated in every sample by pooling. It disappears if the analysis is stratified by subpopulation.

(c) In an association study, a trait that differs in mean between subpopulations (for environmental or genetic reasons) will appear associated with every allele that differs in frequency between them — a false positive caused by population stratification. Studies correct for this with principal components of genome-wide genotypes, mixed models that include genomic relatedness, or family-based designs ([[genomics/association-studies]]).
:::
:::

::: exercise A new mutation's haplotype {level=3}
A new mutation $A$ arises once on a chromosome carrying allele $B$ at a linked locus with $c = 0.01$; $p_B = 0.4$. The mutation drifts to frequency $p_A = 0.1$ after 50 generations. (a) Immediately after it arises, what are $D'$ and $r^2$ between $A$ and $B$ (in terms of the allele frequencies)? (b) Explain why $D'$ after 50 generations should be about $(1 - c)^{50} \approx 0.6$, even though $p_A$ has changed. (c) Why is $r^2$ low even when $D' = 1$?
::: solution
(a) Initially only haplotypes $AB$ (one copy), $aB$ and $ab$ exist, so $x_{Ab} = 0$ and $D = p_A - p_Ap_B = p_A(1 - p_B) = p_Ap_b$, which equals $D_\mathrm{max} = \min(p_Ap_b, p_ap_B)$ when $p_A$ is small: $D' = 1$. $r^2 = D^2/(p_Ap_ap_Bp_b) = p_Ap_b/(p_ap_B) = (p_A/p_a)(0.6/0.4)$, tiny when $p_A$ is tiny.

(b) Consider the fraction of $A$-bearing chromosomes that carry $B$. It starts at 1 and, in each generation, recombination moves a fraction $c$ of $A$ chromosomes to a random background, which carries $B$ with probability $p_B$. So the excess of $B$ on $A$ chromosomes, relative to $p_B$, decays by $(1 - c)$ per generation regardless of how $p_A$ drifts (drift changes the number of $A$ copies but samples them without regard to background). The excess is $D/p_A$, and its maximum value is $p_b$; their ratio, $D'$, decays to about $0.99^{50} = 0.61$.

(c) $r^2$ measures how well one locus predicts the other. With $p_A = 0.1$ and $p_B = 0.4$, even complete association ($D' = 1$) leaves most $B$ chromosomes without $A$, so knowing that a chromosome carries $B$ says little about whether it carries $A$. Rare variants generally have low $r^2$ with common markers, whatever their history.
:::
:::
