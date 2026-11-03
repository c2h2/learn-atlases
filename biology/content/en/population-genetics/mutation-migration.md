Drift, left to itself, destroys variation: every closed population eventually becomes monomorphic. Yet natural populations are full of variation, and neighbouring populations of the same species usually resemble each other far more than drift alone would allow. Two forces explain this. **Mutation** creates new alleles within populations, and **migration** (gene flow) brings alleles in from other populations. This chapter treats both in balance with drift and with selection. We set out the standard models of mutation and find how much variation a population of given size holds at equilibrium; define the mutation load; and then turn to space. Real species are divided into local populations that exchange migrants, and we need tools to measure that structure: the Wahlund effect and Wright's F-statistics. We end with the island and stepping-stone models, which predict how much differentiation to expect for a given amount of gene flow, and with migration–selection balance.

The elementary results — mutation pressure alone, mutation–selection balance $\hat q \approx \mu/hs$ or $\sqrt{\mu/s}$, the island model $p_t - p_M = (1-m)^t(p_0 - p_M)$, and $F_\mathrm{ST} \approx 1/(1 + 4Nm)$ — are in [[evolution/mutation-drift-gene-flow]]. Here we derive and extend them.

## Models of mutation

What a mutation does to an allele's identity depends on what we can observe. Three idealisations cover most uses.

::: definition Mutation models {#def-mutation-models}
- **Infinite-alleles model** (Motoo Kimura and James Crow, 1964): each mutation creates an allele never seen before. Appropriate when alleles are distinguished by long sequences, so that two independent mutations essentially never produce the same allele.
- **Infinite-sites model** (Kimura, 1969): each mutation occurs at a nucleotide site that has not mutated before in the history of the sample. Appropriate for DNA sequences when $\theta$ per site is small, so that multiple hits at one site are rare.
- **Stepwise mutation model** (Tomoko Ohta and Kimura, 1973): alleles are integers (the number of repeat units of a microsatellite) and each mutation adds or removes one unit. Different lineages can therefore arrive at the same allele by different routes (**homoplasy**).
- **$k$-allele and finite-sites models**: a fixed set of alleles or bases, with mutation among them, so back-mutation and parallel mutation are possible.
:::

The choice matters for prediction. Mutation rates also differ greatly between kinds of locus: about $10^{-8}$ per base pair per generation for point mutations in humans, about $10^{-5}$–$10^{-6}$ per generation for loss-of-function mutations in a typical gene (summing over all its sites), and of order $10^{-3}$–$10^{-4}$ per generation for many microsatellites, whose repeats are prone to slippage during replication.

## Mutation and drift: how much variation?

Drift removes heterozygosity at rate $1/2N_e$ per generation; mutation creates it. With the infinite-alleles model the balance is simple to derive, using the probability of identity.

Let $F$ be the probability that two gene copies drawn at random from the population are **identical in state** (the same allele). Going back one generation, the two copies are copies of the same parental gene with probability $1/2N_e$, and otherwise copies of two distinct genes, which are identical with probability $F$. Under the infinite-alleles model they remain identical only if neither has mutated in that generation, probability $(1 - \mu)^2$; any mutation makes them different for ever.

::: proposition Mutation–drift equilibrium, infinite alleles {#prop-iam}
Under the infinite-alleles model with mutation rate $\mu$ per gene per generation,

$$
F' = \left[\frac{1}{2N_e} + \left(1 - \frac{1}{2N_e}\right)F\right](1 - \mu)^2,
$$ {#eq-iam-rec}

and at equilibrium, for small $\mu$ and large $N_e$,

$$
\hat F \approx \frac{1}{1 + 4N_e\mu} = \frac{1}{1 + \theta},\qquad \hat H = 1 - \hat F \approx \frac{\theta}{1 + \theta}.
$$ {#eq-iam}
:::

::: proof
The recurrence follows from the argument above. Setting $F' = F = \hat F$ and solving: $\hat F[1 - (1 - 1/2N_e)(1 - \mu)^2] = (1 - \mu)^2/2N_e$. Keeping first-order terms in $\mu$ and $1/N_e$ (and neglecting their product), $1 - (1 - 1/2N_e)(1 - \mu)^2 \approx 2\mu + 1/2N_e$ and $(1 - \mu)^2 \approx 1$, so $\hat F \approx (1/2N_e)/(2\mu + 1/2N_e) = 1/(1 + 4N_e\mu)$.
:::

The equilibrium depends on $N_e$ and $\mu$ only through their product $\theta = 4N_e\mu$, the same population mutation rate that governs $\pi$ under the coalescent ([[population-genetics/genetic-drift]]). This is a general feature of neutral theory: the amount of variation in a population at equilibrium measures $\theta$, not $N_e$ or $\mu$ separately.

For microsatellites the stepwise model is more realistic. Ohta and Kimura (1973) showed that the equilibrium heterozygosity is then

$$
\hat H_\mathrm{SMM} = 1 - \frac{1}{\sqrt{1 + 2\theta}},
$$ {#eq-smm}

always less than the infinite-alleles value, because mutations can recreate existing alleles.

::: widget plot
f: x/(1 + x); 1 - 1/sqrt(1 + 2*x)
x: 0, 20
y: 0, 1
labels: \text{infinite alleles}; \text{stepwise}
caption: Equilibrium heterozygosity against the population mutation rate $\theta = 4N_e\mu$ for the infinite-alleles model [[#eq-iam]] and the stepwise mutation model [[#eq-smm]]. Hover to read values. For small $\theta$ both are close to $\theta$ itself; for large $\theta$ the infinite-alleles curve approaches 1 much faster. A microsatellite with $\theta = 20$ has $H \approx 0.95$ under infinite alleles but only 0.84 under the stepwise model, because repeat lengths that differ by one unit are easily recreated. Notice how slowly the stepwise curve approaches 1: even enormous populations do not make every individual heterozygous.
:::

::: example Heterozygosity at two kinds of locus {#ex-mutdrift}
A species has $N_e = 10^4$. (a) What equilibrium heterozygosity is expected at a protein locus with neutral mutation rate $10^{-5}$ per generation? (b) At a microsatellite with $\mu = 5\times10^{-4}$, under each mutation model? (c) How long does it take to approach equilibrium?
::: solution
(a) $\theta = 4\times10^4\times10^{-5} = 0.4$; $\hat H = 0.4/1.4 = 0.29$.

(b) $\theta = 20$. Infinite alleles: $20/21 = 0.95$. Stepwise: $1 - 1/\sqrt{41} = 1 - 0.156 = 0.84$. Microsatellites are far more variable than proteins in the same genome because their mutation rate is fifty times higher, which is why they were the markers of choice for paternity and population studies before cheap sequencing.

(c) From [[#eq-iam-rec]] the deviation from equilibrium shrinks by a factor of about $1 - 2\mu - 1/2N_e$ per generation, so the time scale is $1/(2\mu + 1/2N_e)$: for the protein locus $1/(2\times10^{-5} + 5\times10^{-5}) \approx 14{,}000$ generations, for the microsatellite about 1,000. Equilibrium is reached on a time scale set by whichever is faster, drift or mutation — but for the protein locus that is still of order $N_e$ generations, and populations whose size has changed within that time are not at equilibrium.
:::
:::

### How many alleles in a sample?

Under the infinite-alleles model, Warren Ewens (1972) found the distribution of the number and frequencies of alleles in a sample of $n$ genes (the **Ewens sampling formula**). Its most-used consequence is the expected number of distinct alleles,

$$
\E[K] = \sum_{i=0}^{n-1}\frac{\theta}{\theta + i}.
$$ {#eq-ewens}

The logic is genealogical: tracing the sample back, each event is either a coalescence or a mutation, and the $(i+1)$th gene, going forward, is a new allele with probability $\theta/(\theta + i)$. With $\theta = 2$ and $n = 50$, $\E[K] = 7.0$; doubling the sample adds only about 1.4 more alleles. Ewens also showed that, given $K$, the allele *frequencies* carry no further information about $\theta$ under neutrality — the basis of the Ewens–Watterson test, which asks whether a sample's frequencies are too even (suggesting balancing selection) or too skewed for its number of alleles.

## Mutation and selection: the mutation load

Deleterious mutations are removed by selection at the rate they arise, settling at the balance $\hat q \approx \mu/(hs)$, or $\sqrt{\mu/s}$ for a recessive ([[evolution/mutation-drift-gene-flow]]). What do they cost the population?

::: definition Genetic load {#def-load}
The **genetic load** of a population is the proportional reduction of its mean fitness relative to the fittest genotype: $L = (w_\mathrm{max} - \bar w)/w_\mathrm{max}$. The **mutation load** is the load caused by recurrent deleterious mutation at mutation–selection balance.
:::

::: proposition The Haldane–Muller principle {#prop-load}
At mutation–selection balance at a single locus, with mutation rate $\mu$ to a deleterious allele with fitnesses $1$, $1 - hs$, $1 - s$, the mutation load is

$$
L \approx 2\mu\quad(h \text{ not close to } 0),\qquad L \approx \mu\quad(h = 0),
$$ {#eq-load}

independent of $s$. Summed over many loci with a total deleterious mutation rate $U$ per diploid genome per generation, and assuming loci act multiplicatively on fitness, mean fitness is about $e^{-U}$ for partially dominant mutations.
:::

::: proof
For $h > 0$: $\bar w \approx 1 - 2pq\,hs \approx 1 - 2\hat q\,hs$ (homozygotes are negligible). With $\hat q = \mu/(hs)$, $L = 2\hat q\,hs = 2\mu$. For $h = 0$: $\bar w = 1 - s\hat q^2$ and $\hat q^2 = \mu/s$, so $L = \mu$. With many loci each with load $2\mu_i$ acting multiplicatively, $\bar w \approx \prod_i(1 - 2\mu_i) \approx e^{-\sum 2\mu_i} = e^{-U}$, where $U = \sum_i 2\mu_i$ counts new mutations per diploid zygote.
:::

The result, which Haldane derived in 1937 and Hermann Muller discussed in 1950 under the heading "our load of mutations", is counter-intuitive: a severely harmful mutation causes no more load than a mildly harmful one. The severe mutation is rarer at equilibrium, but each copy does more damage; the two effects cancel, because at equilibrium each new mutant copy must eventually cause one "genetic death" (one individual failing to reproduce) to be removed. Mild mutations persist longer, spread over more individuals, and may be harder to purge. Estimates of $U$ are uncertain; for *Drosophila* and humans they are thought to be of the order of one deleterious mutation per zygote or more, which would mean a substantial load. How species tolerate this — through soft selection, synergistic epistasis among mutations, or sexual recombination — is a long-standing question in evolutionary genetics.

## Population structure

### The Wahlund effect

Most species are not single random-mating populations. Suppose a sample is drawn from several subpopulations, each in Hardy–Weinberg proportions but with different allele frequencies. The pooled sample will have fewer heterozygotes than Hardy–Weinberg predicts from its pooled allele frequency. Sten Wahlund described this effect in 1928.

::: proposition The Wahlund effect {#prop-wahlund}
Let a population consist of subpopulations with weights $c_i$ ($\sum c_i = 1$) and allele frequencies $p_i$, each in Hardy–Weinberg proportions, and let $\bar p = \sum c_ip_i$ and $\sigma_p^2 = \sum c_i(p_i - \bar p)^2$. Then in the pooled population

$$
f(A_1A_1) = \bar p^2 + \sigma_p^2,\qquad f(A_1A_2) = 2\bar p\bar q - 2\sigma_p^2,\qquad f(A_2A_2) = \bar q^2 + \sigma_p^2.
$$ {#eq-wahlund}
:::

::: proof
$f(A_1A_1) = \sum c_ip_i^2 = \bar p^2 + \sigma_p^2$, since the mean of $p_i^2$ is the square of the mean plus the variance. Similarly $f(A_2A_2) = \sum c_iq_i^2 = \bar q^2 + \sigma_p^2$ (the variance of $q_i = 1 - p_i$ equals that of $p_i$). The heterozygote frequency is the remainder, $1 - \bar p^2 - \bar q^2 - 2\sigma_p^2 = 2\bar p\bar q - 2\sigma_p^2$.
:::

The deficit of heterozygotes is $2\sigma_p^2$, so in the notation of [[population-genetics/hardy-weinberg#def-fis]] the pooled sample has $F = \sigma_p^2/(\bar p\bar q)$. This is no artefact to be dismissed: it has real consequences. If two isolated populations each with a rare recessive condition merge and mate at random, the frequency of affected homozygotes *falls*, from $\bar q^2 + \sigma_p^2$ to $\bar q^2$.

### F-statistics

Sewall Wright (1951) partitioned the departure from Hardy–Weinberg proportions in a structured population into a part due to non-random mating within subpopulations and a part due to differences between them.

::: definition Wright's F-statistics {#def-fstats}
In a population divided into subpopulations, let $H_I$ be the mean observed heterozygosity of individuals within subpopulations, $H_S$ the mean Hardy–Weinberg expected heterozygosity within subpopulations ($2p_iq_i$ averaged), and $H_T = 2\bar p\bar q$ the expected heterozygosity of the total population if it mated at random. Then

$$
F_\mathrm{IS} = 1 - \frac{H_I}{H_S},\qquad F_\mathrm{ST} = 1 - \frac{H_S}{H_T},\qquad F_\mathrm{IT} = 1 - \frac{H_I}{H_T},
$$ {#eq-fstats}

and they satisfy

$$
1 - F_\mathrm{IT} = (1 - F_\mathrm{IS})(1 - F_\mathrm{ST}).
$$ {#eq-fprod}

$F_\mathrm{IS}$ measures non-random mating within subpopulations (inbreeding, self-fertilisation), $F_\mathrm{ST}$ the differentiation between subpopulations, and $F_\mathrm{IT}$ the overall departure of individuals from random mating in the whole population.
:::

The product rule [[#eq-fprod]] is immediate: $\frac{H_I}{H_T} = \frac{H_I}{H_S}\cdot\frac{H_S}{H_T}$. And by the Wahlund argument, for two alleles

$$
F_\mathrm{ST} = \frac{H_T - H_S}{H_T} = \frac{\sigma_p^2}{\bar p\bar q},
$$ {#eq-fst-var}

the variance of allele frequency between subpopulations, scaled by its maximum possible value $\bar p\bar q$ (reached when each subpopulation is fixed). $F_\mathrm{ST}$ runs from 0 (identical frequencies) to 1 (each subpopulation fixed for one allele). In practice these quantities are estimated with corrections for finite numbers of subpopulations and individuals sampled; the estimator of Bruce Weir and Clark Cockerham (1984) is the standard. For multi-allelic loci, Nei's $G_\mathrm{ST}$ is the analogous ratio of heterozygosities; with highly variable loci it cannot approach 1 even for completely isolated populations, because $H_S$ itself is close to 1, a limitation that matters when comparing studies.

::: example Three subpopulations {#ex-fstats}
Three equal-sized subpopulations of a plant have allele frequencies 0.2, 0.5 and 0.8, and observed heterozygosities 0.24, 0.42 and 0.28. Calculate $F_\mathrm{IS}$, $F_\mathrm{ST}$ and $F_\mathrm{IT}$, check the product rule, and interpret.
::: solution
Expected heterozygosities within subpopulations: $2\times0.2\times0.8 = 0.32$, $0.50$ and $0.32$, so $H_S = 0.38$. Observed: $H_I = (0.24 + 0.42 + 0.28)/3 = 0.3133$. Pooled: $\bar p = 0.5$, $H_T = 0.5$. Then

$$
F_\mathrm{IS} = 1 - \frac{0.3133}{0.38} = 0.175,\qquad F_\mathrm{ST} = 1 - \frac{0.38}{0.50} = 0.24,\qquad F_\mathrm{IT} = 1 - \frac{0.3133}{0.50} = 0.373.
$$

Check: $(1 - 0.175)(1 - 0.24) = 0.825\times0.76 = 0.627 = 1 - 0.373$. And by [[#eq-fst-var]], $\sigma_p^2 = (0.09 + 0 + 0.09)/3 = 0.06$ and $0.06/(0.5\times0.5) = 0.24$, as it should be.

Interpretation: there is substantial inbreeding within subpopulations ($F_\mathrm{IS} = 0.175$, as from partial self-fertilisation, [[population-genetics/inbreeding]]) and strong differentiation among them ($F_\mathrm{ST} = 0.24$); the overall heterozygote deficit relative to a single random-mating population is 37 %. A single locus is a noisy estimate; real studies average over many loci, and loci with outlying $F_\mathrm{ST}$ are candidates for local selection.
:::
:::

## Migration and drift

### The island model at equilibrium

Wright's **island model** considers an infinite number of subpopulations ("islands"), each of size $N$, which each generation receive a fraction $m$ of their genes as migrants drawn from the whole collection (whose frequency $\bar p$ therefore stays constant). Drift makes islands diverge; migration pulls them back together.

::: proposition Migration–drift equilibrium {#prop-island}
In the infinite island model with neutral alleles and no mutation, the probability $F$ that two genes drawn from the same island are identical by descent satisfies

$$
F' = \left[\frac{1}{2N} + \left(1 - \frac{1}{2N}\right)F\right](1 - m)^2,
$$ {#eq-island-rec}

and at equilibrium, for small $m$,

$$
\hat F_\mathrm{ST} \approx \frac{1}{1 + 4Nm}.
$$ {#eq-island}
:::

::: proof
Two genes on an island in the next generation are both of local origin with probability $(1 - m)^2$; if either is a migrant, it comes from the infinite collection and is unrelated to the other (identity probability 0 relative to the total population). Given both are local, they are copies of the same parental gene with probability $1/2N$, and otherwise identical with probability $F$. This gives [[#eq-island-rec]], which has the same form as [[#eq-iam-rec]] with $m$ in place of $\mu$: migration, like mutation, introduces genes not identical by descent. The equilibrium follows as before.
:::

The recursion makes the dynamics explicit: $F_\mathrm{ST}$ approaches equilibrium at rate about $2m + 1/2N$ per generation. Migration plays the role mutation played in [[#prop-iam]], but it is usually a much stronger force: $m$ is often $10^{-3}$ or more, while $\mu$ is $10^{-5}$ or less per locus.

::: widget cobweb
g: (1/(2*N) + (1 - 1/(2*N))*x)*(1 - m)^2
x0: 0
steps: 40
sliders: N=50:5:500:5; m=0.01:0.001:0.1:0.001
x: 0, 1
y: 0, 1
caption: The recurrence [[#eq-island-rec]] for $F_\mathrm{ST}$ in the island model as a cobweb, starting from $F = 0$ (islands just separated). Each step is one generation. With the defaults $N = 50$ and $m = 0.01$ ($Nm = 0.5$) the orbit climbs to an equilibrium near $1/(1 + 4Nm) = 0.33$. Change $N$ and $m$ keeping $Nm$ fixed: the equilibrium stays nearly the same, but the number of generations to reach it changes, because the approach rate is about $2m + 1/2N$.
:::

::: example One migrant per generation {#ex-nm}
(a) Islands each of 50 individuals exchange 1 % of their genes by migration each generation. What is the equilibrium $F_\mathrm{ST}$, and how close is the population after 100 generations? (b) A survey of a species finds $F_\mathrm{ST} = 0.05$ at neutral markers. If the island model applied, how many migrants per generation would that imply?
::: solution
(a) $4Nm = 2$, so $\hat F_\mathrm{ST} \approx 1/3$. Iterating [[#eq-island-rec]] from 0 gives the exact equilibrium 0.330, with $F = 0.086$ after 10 generations, 0.257 after 50, and 0.314 after 100 — 95 % of the way there. The approach rate $2m + 1/2N = 0.03$ predicts a time constant of about 33 generations, consistent with this.

(b) Solving $0.05 = 1/(1 + 4Nm)$: $Nm = (1/0.05 - 1)/4 = 4.75$ migrants per generation. Such indirect estimates should be treated with great caution (Michael Whitlock and David McCauley, 1999): they assume equilibrium, equal island sizes, migration from a common pool, neutrality and no mutation, none of which holds well in nature. $F_\mathrm{ST}$ is best regarded as a description of differentiation; $Nm$ derived from it is an "effective number of migrants" under a model.
:::
:::

::: widget plot
f: 1/(1 + 4*x)
x: 0, 10
y: 0, 1
labels: F_\mathrm{ST}
vlines: 1
caption: Equilibrium $F_\mathrm{ST}$ in the island model against the number of migrants per generation, $Nm$ ([[#eq-island]]). The marked line at $Nm = 1$ gives $F_\mathrm{ST} = 0.2$. Notice how steep the curve is near zero: going from 0.1 to 1 migrant per generation reduces $F_\mathrm{ST}$ from 0.71 to 0.2, while going from 1 to 10 reduces it only to 0.024. Small amounts of gene flow prevent populations from fixing different neutral alleles; large amounts make little further difference.
:::

### Isolation by distance

Real migration is local: neighbouring populations exchange more migrants than distant ones. In the **stepping-stone model** (Motoo Kimura and George Weiss, 1964), demes on a line or a grid exchange migrants only with their neighbours. Then $F_\mathrm{ST}$ between two demes increases with the distance between them, a pattern called **isolation by distance** (Wright, 1943). In a continuous population, Wright's **neighbourhood size** $N_b = 4\pi D\sigma^2$, where $D$ is the density of individuals and $\sigma^2$ the variance of the distance between parent and offspring along one axis, plays the role of $Nm$. François Rousset (1997) showed that in two dimensions the quantity $F_\mathrm{ST}/(1 - F_\mathrm{ST})$ between pairs of samples should increase approximately linearly with the logarithm of the distance between them, with slope $1/(4\pi D\sigma^2)$ — a relation that lets a dispersal parameter be estimated from genetic data alone.

Human genetic variation fits isolation by distance closely. Genetic differentiation among human populations increases gradually with geographic distance, and heterozygosity decreases with distance from East Africa along likely routes of ancient migration, consistent with a series of founder events as humans spread across the world (Sohini Ramachandran and colleagues, 2005). Differentiation among human populations is low by the standards of other mammals: most estimates of $F_\mathrm{ST}$ between continental groups are of the order of 0.05–0.15, and most genetic variation is found within local populations. Neither the data nor the theory support dividing humans into discrete "races"; variation is described in terms of geography, ancestry and populations ([[genomics/human-variation]]).

::: warning "F_ST measures the rate of gene flow"
$F_\mathrm{ST}$ is a summary of how allele frequencies differ now. It is shaped by migration, but also by drift, which depends on $N_e$; by the time since the populations split, since equilibrium can take thousands of generations; by mutation at highly variable loci; and by selection. Two populations that separated recently with no gene flow since can have a low $F_\mathrm{ST}$, and two connected by substantial gene flow can have a high one if they are very small. Converting $F_\mathrm{ST}$ into a migration rate needs a model, and models in which populations split and diverge (estimated, for example, with coalescent methods) often fit better than equilibrium island models.
:::

## Migration and selection

Gene flow opposes local adaptation. Consider an island on which allele $a$ is disfavoured, with selection coefficient $s$ against it (haploid, for simplicity), but which receives a fraction $m$ of its genes each generation from a mainland fixed for $a$. If $m$ is small compared with $s$, the frequency of $a$ on the island settles where its arrival by migration balances its removal by selection:

$$
\hat q \approx \frac ms\qquad (m < s).
$$ {#eq-migsel}

If $m$ exceeds $s$, migration **swamps** selection and $a$ takes over the island. The same balance in continuous space produces a **cline**, a gradient of allele frequency across an environmental boundary; J. B. S. Haldane (1948) and Montgomery Slatkin (1973) showed that its width is of order $\sigma/\sqrt s$, where $\sigma$ is the dispersal distance per generation. Narrow clines therefore indicate strong selection relative to dispersal.

::: example Water snakes on islands {#ex-snakes}
On islands in western Lake Erie, many northern water snakes *Nerodia sipedon* are unbanded, which is thought to make them less conspicuous on limestone shores, while on the mainland nearly all are banded; banding is partly controlled by a single locus (studied by Richard King and Robert Lawson in the 1990s). (a) If snakes on an island experience selection $s = 0.05$ per generation against the banded allele (in a haploid approximation), and 1 % of the island's genes come from the mainland each generation, what is the equilibrium frequency of the banded allele? (b) What would happen if migration were 10 % per generation?
::: solution
(a) By [[#eq-migsel]], $\hat q \approx 0.01/0.05 = 0.2$. (Iterating the exact model, with migration followed by haploid selection, gives 0.19.) Selection keeps the banded allele rare but cannot eliminate it, so banded snakes persist on the islands — as observed.

(b) With $m = 0.1 > s = 0.05$, migration swamps selection and the banded allele would approach high frequency, eliminating local adaptation. The observed persistence of unbanded snakes implies that selection on the islands is strong relative to gene flow. Field estimates of both supported this.
:::
:::

::: application Conservation: gene flow, rescue and outbreeding
Fragmentation turns one population into many small ones, each losing variation by drift and becoming inbred ([[conservation-biology/fragmentation]]). The island model suggests that even modest gene flow — the often-cited rule of thumb is one migrant per generation, more in practice — prevents isolated fragments from fixing different alleles. Deliberate translocation of individuals can restore variation and fitness ("genetic rescue"), as in the Florida panther ([[evolution/mutation-drift-gene-flow]]). The risk on the other side is **outbreeding depression**, if immigrants carry alleles adapted to other conditions or incompatible gene combinations; it is usually small when populations have been separated for only a few hundred generations and live in similar environments (Richard Frankham and colleagues, 2011).
:::

::: quiz
A biologist pools samples of beetles from five isolated ponds and finds a strong deficit of heterozygotes at every locus, but within each pond the genotypes fit Hardy–Weinberg proportions. Which statement is correct?
- [ ] The beetles are inbred.
- [x] $F_\mathrm{IS} \approx 0$ but $F_\mathrm{ST} > 0$; the deficit is a Wahlund effect from pooling differentiated ponds.
- [ ] Selection must be acting against heterozygotes in every pond.
- [ ] The test is invalid because the ponds should have been analysed together.
::: solution
Within ponds the genotypes are in Hardy–Weinberg proportions, so there is no inbreeding ($F_\mathrm{IS} \approx 0$). The pooled deficit arises because the ponds have different allele frequencies: by [[#prop-wahlund]] the deficit is $2\sigma_p^2$, and it appears at every locus because all loci share the same population structure. Selection would affect specific loci, not all of them.
:::
:::

::: history
Population structure entered population genetics with Sten Wahlund's 1928 analysis of pooled samples. Sewall Wright developed the island model (1931), isolation by distance (1943) and the F-statistics (1951, "The genetical structure of populations"), driven partly by his "shifting balance" theory, which held that subdivided populations explore adaptive landscapes better than undivided ones. Gustave Malécot independently developed the probability-of-identity approach in France in the 1940s. On the mutation side, Haldane (1935) estimated the human mutation rate for haemophilia from mutation–selection balance — the first human mutation rate — and introduced the idea of the mutation load (1937), which Muller made famous in 1950. Kimura and Crow's infinite-alleles model (1964), Kimura and Weiss's stepping-stone model (1964), Ohta and Kimura's stepwise mutation model (1973) and Ewens's sampling formula (1972) completed the classical neutral theory of variation within and between populations.
:::

::: summary
- Mutation models: infinite alleles, infinite sites, stepwise (microsatellites), finite alleles or sites ([[#def-mutation-models]]).
- Mutation–drift equilibrium: $\hat H \approx \theta/(1+\theta)$ for infinite alleles, $1 - 1/\sqrt{1 + 2\theta}$ for stepwise mutation, $\theta = 4N_e\mu$ ([[#prop-iam]]). The expected number of alleles in a sample is $\sum_{i=0}^{n-1}\theta/(\theta + i)$.
- The mutation load at a locus is about $2\mu$ (or $\mu$ for recessives), independent of $s$ (Haldane–Muller, [[#prop-load]]); over the genome $\bar w \approx e^{-U}$.
- Pooling differentiated subpopulations creates a heterozygote deficit of $2\sigma_p^2$ (Wahlund, [[#prop-wahlund]]).
- $F_\mathrm{IS}$, $F_\mathrm{ST}$ and $F_\mathrm{IT}$ partition departures from random mating; $1 - F_\mathrm{IT} = (1 - F_\mathrm{IS})(1 - F_\mathrm{ST})$ and $F_\mathrm{ST} = \sigma_p^2/(\bar p\bar q)$ ([[#def-fstats]]).
- In the island model $F_\mathrm{ST} \approx 1/(1 + 4Nm)$, approached at rate $2m + 1/2N$; isolation by distance makes differentiation grow with distance.
- Migration–selection balance gives $\hat q \approx m/s$; gene flow swamps local selection when $m > s$, and clines have width of order $\sigma/\sqrt s$.
:::

## Exercises

::: exercise Mutation–drift heterozygosity {level=1 check="0.5"}
At a locus following the infinite-alleles model, $N_e = 5000$ and $\mu = 5\times10^{-5}$. What is the equilibrium heterozygosity?
::: solution
$\theta = 4\times5000\times5\times10^{-5} = 1$, so $\hat H = 1/2 = 0.5$.
:::
:::

::: exercise Migrants from F_ST {level=1 check="1"}
Under the island model, what number of migrants per generation $Nm$ corresponds to $F_\mathrm{ST} = 0.2$?
::: solution
$1 + 4Nm = 5$, so $Nm = 1$.
:::
:::

::: exercise The product rule {level=1 check="0.28"}
In a structured population, $F_\mathrm{IS} = 0.1$ and $F_\mathrm{ST} = 0.2$. What is $F_\mathrm{IT}$?
::: solution
$1 - F_\mathrm{IT} = 0.9\times0.8 = 0.72$, so $F_\mathrm{IT} = 0.28$.
:::
:::

::: exercise F_ST from allele frequencies {level=2 check="0.16"}
Two equal-sized populations have frequencies 0.3 and 0.7 of an allele. What is $F_\mathrm{ST}$?
::: solution
$\bar p = 0.5$, $\sigma_p^2 = \tfrac12(0.04 + 0.04) = 0.04$, so $F_\mathrm{ST} = 0.04/0.25 = 0.16$. Equivalently $H_S = 2\times0.3\times0.7 = 0.42$, $H_T = 0.5$, $1 - 0.42/0.5 = 0.16$.
:::
:::

::: exercise Mutation load {level=2}
(a) A locus mutates to a partially dominant deleterious allele at rate $2\times10^{-6}$ per generation. What is the mutation load at this locus, and how does it change if the allele's homozygous effect $s$ doubles? (b) If a genome has 20,000 such loci, each with this rate, what is the mean fitness relative to a mutation-free genotype?
::: solution
(a) $L \approx 2\mu = 4\times10^{-6}$, unchanged when $s$ doubles: the allele becomes half as frequent, but each copy costs twice as much.

(b) $U = 20{,}000\times2\times(2\times10^{-6}) = 0.08$ new mutations per diploid zygote, so $\bar w \approx e^{-0.08} = 0.92$, an 8 % load.
:::
:::

::: exercise Counting alleles {level=2 check="7.04"}
Use [[#eq-ewens]] to find the expected number of alleles in a sample of 50 genes when $\theta = 2$ (two decimal places).
::: solution
$\E[K] = \sum_{i=0}^{49}2/(2 + i) = 2\left(\tfrac12 + \tfrac13 + \cdots + \tfrac{1}{51}\right) = 2(H_{51} - 1) = 2\times(4.5188 - 1) = 7.04$, where $H_{51} = \sum_{j=1}^{51}1/j$ is the harmonic number.
:::
:::

::: exercise Migration against selection {level=2}
An allele that is advantageous on the mainland is deleterious on an island, with $s = 0.02$ against it there (haploid approximation). The island receives 0.5 % of its genes from the mainland, which is fixed for the allele. (a) Predict its equilibrium frequency on the island. (b) What migration rate would swamp local adaptation?
::: solution
(a) $\hat q \approx m/s = 0.005/0.02 = 0.25$.

(b) Migration above about $m = s = 0.02$ (2 % per generation) would swamp selection, and the allele would approach fixation on the island.
:::
:::

::: exercise A survey interpreted {level=3}
Microsatellite and SNP data are collected from eight populations of a salamander along a 200 km river valley. Pairwise $F_\mathrm{ST}$ estimated from microsatellites is consistently lower than from SNPs for the same pairs, and both increase steadily with river distance between populations. (a) Why might microsatellites give lower $F_\mathrm{ST}$? (b) What does the increase with distance indicate? (c) Why would it be unwise to convert each pairwise $F_\mathrm{ST}$ to a number of migrants with [[#eq-island]]?
::: solution
(a) Microsatellites are highly variable ($H_S$ close to 1) because of their high mutation rate, and differentiation measures based on heterozygosity ratios cannot approach 1 when within-population diversity is high: $F_\mathrm{ST} \le 1 - H_S$ roughly. Mutation also contributes to the identity calculation when $\mu$ is not small compared with $m$. SNPs, with low $H_S$, are not limited in this way.

(b) Isolation by distance: gene flow is mostly between neighbouring populations, so genetic differentiation accumulates with distance, as in the stepping-stone model.

(c) The island model assumes migration from a common pool, not between neighbours; equilibrium; equal sizes; neutrality; and negligible mutation. With isolation by distance the appropriate analysis is a regression of $F_\mathrm{ST}/(1 - F_\mathrm{ST})$ on distance (Rousset's method), which estimates a neighbourhood size, not a migration rate for each pair.
:::
:::

::: exercise Merging two populations {level=3}
Two isolated populations of equal size have frequencies $q_1 = 0.02$ and $q_2 = 0.18$ of a recessive allele, and each is in Hardy–Weinberg proportions. (a) What is the frequency of recessive homozygotes in the two populations combined, before any interbreeding? (b) If they merge into one random-mating population, what does it become? (c) Explain the result in terms of the Wahlund effect.
::: solution
(a) $\tfrac12(0.02^2 + 0.18^2) = \tfrac12(0.0004 + 0.0324) = 0.0164$.

(b) $\bar q = 0.10$, so after random mating $\bar q^2 = 0.0100$.

(c) The difference, $0.0064$, equals $\sigma_q^2 = \tfrac12(0.08^2 + 0.08^2) = 0.0064$, as [[#eq-wahlund]] predicts. Subdivision raises homozygote frequencies above those of a random-mating population with the same allele frequency; merging the populations removes the excess, so recessive phenotypes become less common, although no allele frequency has changed.
:::
:::
