Charles Darwin grew rows of self-fertilised and cross-fertilised plants of the same species side by side for eleven years and published the results in *The Effects of Cross and Self Fertilisation in the Vegetable Kingdom* (1876). In most of the 57 species he tested, the crossed plants were taller, more vigorous and more fertile. He had found **inbreeding depression**, and he suspected its importance for his own family: he had married his first cousin, Emma Wedgwood. The explanation had to wait for Mendelian genetics. Mating between relatives makes the two copies of a gene in an individual more likely to be copies of the same ancestral gene, so it produces homozygotes; homozygosity exposes recessive deleterious alleles; and fitness falls.

This chapter makes that argument quantitative. We define the inbreeding coefficient as a probability of identity by descent, show how it changes genotype frequencies, and calculate it from pedigrees and for regular mating systems such as self-fertilisation. We then distinguish inbreeding from assortative mating, which affects only the loci involved in mate choice, and derive the effect of inbreeding on the mean of a trait — the basis of inbreeding depression and its mirror image, heterosis. Finally we see how genomic data now measure inbreeding directly. Hardy–Weinberg proportions ([[population-genetics/hardy-weinberg]]) are the baseline throughout, and drift in a finite population ([[population-genetics/genetic-drift]]) turns out to be a form of inbreeding.

## Identity by descent

Two copies of a gene can be the same allele for two different reasons. They may be **identical in state**: the same DNA sequence, whatever their history. Or they may be **identical by descent** (IBD): both copies of one gene in a common ancestor, inherited without mutation. IBD implies identity in state (under the infinite-alleles view, ignoring mutation since the ancestor); the reverse is not true.

IBD always refers to a **base population**: we pretend the genes in some earlier generation are all unrelated, and ask about descent since then. Since every two genes in a species share an ancestor if we go back far enough ([[population-genetics/genetic-drift]]), "inbred" means "more related than a reference" — the reference being the base population.

::: definition Inbreeding coefficient and kinship coefficient {#def-f}
The **inbreeding coefficient** $F_X$ of an individual $X$ is the probability that the two gene copies at a randomly chosen autosomal locus in $X$ are identical by descent, relative to a base population. The **coefficient of kinship** (or coancestry) $f_{XY}$ of two individuals $X$ and $Y$ is the probability that a gene copy drawn at random from $X$ and one drawn at random from $Y$, at the same locus, are identical by descent. The inbreeding coefficient of an offspring equals the kinship of its parents: $F_O = f_{MP}$.
:::

The last statement holds because an offspring receives one random gene copy from each parent — exactly the pair whose identity defines $f_{MP}$ (Gustave Malécot formulated the theory in these probabilistic terms in 1948; Wright's original 1922 definition was a correlation between uniting gametes, which is equivalent).

::: proposition Genotype frequencies under inbreeding {#prop-genotypes-f}
In a population with allele frequency $p$ (and $q = 1 - p$) in which every individual has inbreeding coefficient $F$, and in which genes not IBD are drawn independently,

$$
f(A_1A_1) = p^2(1 - F) + pF = p^2 + Fpq,\qquad f(A_1A_2) = 2pq(1 - F),\qquad f(A_2A_2) = q^2 + Fpq.
$$ {#eq-genotypes-f}

The allele frequency is unchanged, and the heterozygosity is reduced by the factor $1 - F$.
:::

::: proof
With probability $F$ the two copies in an individual are IBD, hence the same allele: $A_1A_1$ with probability $p$ and $A_2A_2$ with probability $q$. With probability $1 - F$ they are independent draws: $A_1A_1$ with probability $p^2$, heterozygous with $2pq$, $A_2A_2$ with $q^2$. Adding, $f(A_1A_1) = Fp + (1 - F)p^2 = p^2 + Fpq$, and similarly for the others. The allele frequency is $p^2 + Fpq + \tfrac12\cdot2pq(1 - F) = p^2 + pq = p$.
:::

These are the proportions written with the fixation index in [[population-genetics/hardy-weinberg#def-fis]]: inbreeding is one cause of a positive $F_\mathrm{IS}$.

::: widget plot
f: p^2*(1 - x) + p*x; 2*p*(1 - p)*(1 - x); (1 - p)^2*(1 - x) + (1 - p)*x
x: 0, 1
y: 0, 1
sliders: p=0.1:0.01:0.99:0.01
labels: A_1A_1; A_1A_2; A_2A_2
caption: Genotype frequencies [[#eq-genotypes-f]] against the inbreeding coefficient $F$ (horizontal axis) for an allele frequency $p$ set by the slider. All three lines are straight: inbreeding moves a fraction $F$ of the population from Hardy–Weinberg proportions to complete homozygosity. With the default $p = 0.1$, notice how much faster the rare homozygote $A_1A_1$ increases in relative terms: from 0.01 at $F = 0$ to 0.0325 at $F = 1/4$, more than tripling, while the common homozygote rises only from 0.81 to 0.83.
:::

### Rare recessives and consanguinity

The relative increase in rare homozygotes is the crux of the matter. From [[#eq-genotypes-f]], the ratio of recessive homozygotes under inbreeding to their Hardy–Weinberg frequency is

$$
\frac{q^2 + Fpq}{q^2} = 1 + F\,\frac{p}{q},
$$ {#eq-ratio}

which is very large when $q$ is small. For an allele at $q = 0.01$ and the offspring of first cousins ($F = 1/16$, derived below), the ratio is $1 + 0.0625\times99 = 7.2$. The rarer the allele, the larger the proportion of affected homozygotes who are the children of related parents — an observation made by Archibald Garrod in 1902 for alkaptonuria, which helped him recognise it as a recessive Mendelian condition. This is population genetics; for clinical genetics and counselling see Medicine Atlas ([/learn/medicine/](/learn/medicine/)).

## Inbreeding from pedigrees

To calculate $F$ for an individual we trace the paths through which its two genes could descend from one ancestral gene.

::: proposition Path counting {#prop-paths}
Let $X$ have parents $M$ and $P$. For each common ancestor $A$ of $M$ and $P$, and each distinct path that runs from $M$ up to $A$ and down to $P$ without passing through any individual twice, let $n_1$ be the number of generations from $M$ to $A$ and $n_2$ from $P$ to $A$. Then

$$
F_X = \sum_{\text{paths}}\left(\tfrac12\right)^{n_1 + n_2 + 1}(1 + F_A).
$$ {#eq-paths}
:::

::: proof
Consider one path. The gene $X$ received from $M$ descends from $A$ through $n_1$ transmissions, each of which passes a specific one of the two parental genes with probability $\tfrac12$; similarly for $P$'s gene through $n_2$ transmissions. Fix one of $A$'s two genes; following this path, the probability that both genes reaching $X$ are copies of genes of $A$ is $(\tfrac12)^{n_1 + n_2}$. Given that, the two copies came from $A$'s two genes independently: they are copies of the same gene of $A$ with probability $\tfrac12$, and copies of $A$'s two different genes with probability $\tfrac12$, in which case they are still IBD with probability $F_A$. So the contribution is $(\tfrac12)^{n_1 + n_2}\cdot\tfrac12(1 + F_A)$. Distinct paths describe mutually exclusive routes of descent, so their probabilities add.
:::

::: example Common relationships {#ex-pedigree}
Calculate the inbreeding coefficient of the offspring of (a) half-siblings, (b) full siblings, (c) first cousins, (d) an uncle and his niece, assuming all ancestors are non-inbred.
::: solution
(a) Half-sibs share one parent $A$; $n_1 = n_2 = 1$, one path: $F = (\tfrac12)^3 = 1/8$.

(b) Full sibs share two parents, each giving a path with $n_1 = n_2 = 1$: $F = 2\times(\tfrac12)^3 = 1/4$.

(c) First cousins share two grandparents; each path has $n_1 = n_2 = 2$: $F = 2\times(\tfrac12)^5 = 1/16$.

(d) The uncle is a full sibling of the niece's parent, so the common ancestors are the uncle's two parents (the niece's grandparents). From the uncle, $n_1 = 1$; from the niece, $n_2 = 2$. Two paths: $F = 2\times(\tfrac12)^4 = 1/8$.

The coefficient of kinship of the parents in each case is the same number: half-sibs $1/8$, full sibs $1/4$, first cousins $1/16$, uncle–niece $1/8$. By the same rules, parent and offspring have kinship $1/4$, and an individual with itself has kinship $\tfrac12(1 + F)$.
:::
:::

For large pedigrees, path counting is replaced by the **tabular method**: list individuals in order of birth and fill a matrix of kinships using the recursion $f_{XY} = \tfrac12(f_{MY} + f_{PY})$, where $M$ and $P$ are the parents of $X$ and $Y$ is not a descendant of $X$. Twice this matrix is the **additive relationship matrix** used by animal breeders to predict breeding values ([[population-genetics/quantitative-traits]]) and by zoo managers to choose pairs ([[population-genetics/genetic-drift]]).

::: warning "Inbreeding means a population is small" and "relatives share half their genes"
Inbreeding in the pedigree sense is a property of individuals and can occur in a large population through mating among relatives; conversely, a small population becomes inbred even with random mating, because everyone becomes related ([[population-genetics/genetic-drift]]). And "siblings share half their genes" is shorthand for a probability of IBD, measured relative to a base population: at a given locus full siblings share 0, 1 or 2 IBD copies with probabilities $\tfrac14$, $\tfrac12$, $\tfrac14$, and two unrelated people are *identical in state* at most of their genome. The relevant quantities are kinship and relatedness ($2f_{XY}$), which are expectations around which the realised sharing varies.
:::

## Regular systems of inbreeding

### Self-fertilisation

Many plants (and some animals, such as the nematode *Caenorhabditis elegans* and the mangrove killifish *Kryptolebias marmoratus*) self-fertilise. A heterozygote that selfs produces $\tfrac14A_1A_1 : \tfrac12A_1A_2 : \tfrac14A_2A_2$, so half its offspring are homozygous; homozygotes produce only homozygotes. Heterozygosity is therefore halved each generation:

$$
1 - F_t = \left(\tfrac12\right)^t(1 - F_0).
$$ {#eq-selfing}

In terms of identity, an offspring of selfing receives two independent gene copies from one parent, so $F' = \tfrac12(1 + F)$, the parent's kinship with itself; iterating gives [[#eq-selfing]]. After seven generations of selfing, less than 1 % of the original heterozygosity remains — which is how inbred lines of crops and model organisms are made.

Most self-compatible plants self only part of the time.

::: proposition Equilibrium under partial selfing {#prop-partial}
In a large population in which a fraction $S$ of offspring are produced by self-fertilisation and the remainder by random outcrossing, the inbreeding coefficient satisfies $F' = \tfrac S2(1 + F)$ and approaches

$$
\hat F = \frac{S}{2 - S}.
$$ {#eq-partial}

Conversely, an observed equilibrium $F$ implies a selfing rate $\hat S = 2F/(1 + F)$.
:::

::: proof
Selfed offspring have inbreeding $\tfrac12(1 + F)$ where $F$ is the parents' value; outcrossed offspring have two genes from unrelated random parents (in a large population), inbreeding 0. Averaging, $F' = \tfrac S2(1 + F) + (1 - S)\cdot0$. At equilibrium $F = \tfrac S2(1 + F)$, so $F(1 - S/2) = S/2$ and $F = S/(2 - S)$. Solving for $S$ gives $S = 2F/(1 + F)$. The approach is geometric with ratio $S/2$, so equilibrium is reached within a few generations.
:::

::: example A partially selfing plant {#ex-selfing}
(a) A plant population self-fertilises 60 % of its seeds. What is the equilibrium inbreeding coefficient, and what fraction of individuals are heterozygous at a locus with $p = 0.5$? (b) In another population, $F_\mathrm{IS}$ averaged over many loci is 0.3. Estimate its selfing rate.
::: solution
(a) $\hat F = 0.6/1.4 = 0.43$, and heterozygotes are $2pq(1 - F) = 0.5\times0.571 = 0.29$ instead of 0.5.

(b) $\hat S = 2\times0.3/1.3 = 0.46$. This "indirect" estimate assumes inbreeding equilibrium and that all of $F_\mathrm{IS}$ is due to selfing (biparental inbreeding and Wahlund effects within the sample also contribute). Plant population geneticists compare it with direct estimates from progeny arrays, in which the genotypes of a mother's seeds reveal which were selfed. Values of $S$ in nature span the whole range from 0 (self-incompatible species) to nearly 1 (as in *Arabidopsis thaliana*, which is predominantly selfing).
:::
:::

### Sib mating and finite populations

If every individual mates with a full sibling, the recursion for $F$ involves two previous generations. The kinship of two sibs depends on their parents' kinship and on their parents' own inbreeding, and one finds ([[#exr-sibs]] asks for the derivation)

$$
F_t = \tfrac14\left(1 + 2F_{t-1} + F_{t-2}\right).
$$ {#eq-sibs}

From $F_0 = F_{-1} = 0$ this gives $F = 0.25, 0.375, 0.5, 0.594, 0.672, \ldots$ The heterozygosity $1 - F_t$ eventually declines by a factor $(1 + \sqrt5)/4 = 0.809$ per generation, so sib mating removes about 19 % of the remaining heterozygosity per generation, compared with 50 % for selfing. In a random-mating population of size $N$, inbreeding accumulates at rate $1/2N_e$ per generation, $F_t = 1 - (1 - 1/2N_e)^t$ ([[population-genetics/genetic-drift]]): in a population of 50, even with random mating, $F$ reaches $0.1$ in about 10 generations — the same as a single generation of mating between a parent and a grandchild.

::: widget plot
f: 0.5^x; 0.9472*0.809^x + 0.0528*0.309^x*cos(pi*x); (1 - 1/(2*N))^x
x: 0, 20
y: 0, 1
sliders: N=20:2:200:1
labels: \text{selfing}; \text{full-sib mating}; \text{random mating},\ N
caption: The fraction of heterozygosity remaining, $1 - F_t$, against generations of inbreeding under three mating systems: complete selfing [[#eq-selfing]], full-sib mating (the exact solution of [[#eq-sibs]], which is defined only at whole generations; the curve joins those values), and random mating in a population of $N$ diploid individuals. Notice that sib mating loses heterozygosity at about 19 % per generation, far slower than selfing but much faster than random mating in any population above a handful of individuals. Set $N = 2$: random union of gametes in a population of two individuals, which includes occasional self-fertilisation, loses heterozygosity at 25 % per generation, slightly faster than sib mating.
:::

## Assortative mating

Inbreeding is mating among relatives. **Assortative mating** is mating among phenotypically similar individuals, whether related or not; **disassortative mating** is mating among dissimilar individuals.

The distinction matters because inbreeding affects every locus in the genome equally (it is about genealogy), while assortative mating affects only the loci that influence the trait used to choose mates, and loci correlated with them. Consider complete assortative mating by genotype at one codominant locus: $A_1A_1$ mates only with $A_1A_1$, $A_1A_2$ with $A_1A_2$, $A_2A_2$ with $A_2A_2$. Homozygous matings produce homozygotes; heterozygous matings produce half heterozygotes. So the frequency of heterozygotes halves each generation — the same as selfing, but only at this locus. If one allele is dominant, so that $A_1A_1$ and $A_1A_2$ are indistinguishable and mate freely with each other, heterozygotes decline much more slowly. Allele frequencies are unchanged in either case, unless the mating pattern also causes some types to have fewer mates, in which case it becomes a form of sexual selection ([[evolution/sexual-selection]]).

For polygenic traits, positive assortative mating builds up correlations between the many loci affecting the trait, increasing the genetic variance of the trait in the population. Humans mate assortatively, to a modest degree, for traits such as height and educational attainment, which matters for how heritabilities and genetic correlations are estimated from population data ([[population-genetics/quantitative-traits]]).

Disassortative mating maintains variation. The self-incompatibility systems of flowering plants enforce it: pollen carrying an *S*-allele cannot fertilise a plant with the same allele, which favours rare alleles and maintains dozens of them in many species ([[population-genetics/selection-models]]). Whether mammals prefer mates with dissimilar MHC genotypes has been studied in mice and humans with mixed results.

::: quiz
Which observation would distinguish inbreeding from assortative mating as the cause of a heterozygote deficit in a population?
- [ ] The deficit increases the frequency of rare recessive phenotypes.
- [ ] Allele frequencies remain constant over generations.
- [x] The deficit is similar at all loci, including those unrelated to the traits by which mates are chosen.
- [ ] Heterozygotes are less frequent than Hardy–Weinberg predicts.
::: solution
Inbreeding makes relatives mate, which increases identity by descent at every locus of the genome alike. Assortative mating produces a deficit only at loci affecting the trait used in mate choice (and loci associated with them). Both produce heterozygote deficits and more rare recessive homozygotes, and neither changes allele frequencies by itself.
:::
:::

## Inbreeding depression and heterosis

### The effect of inbreeding on a trait mean

Consider a locus affecting a quantitative trait or a fitness component, with genotypic values $+a$ for $A_1A_1$, $d$ for $A_1A_2$ and $-a$ for $A_2A_2$ (measured from the midpoint of the two homozygotes; $d$ measures dominance, [[population-genetics/quantitative-traits]]).

::: proposition Inbreeding changes the mean linearly in F {#prop-depression}
With genotype frequencies [[#eq-genotypes-f]], the population mean of the trait is

$$
M_F = a(p - q) + 2pqd(1 - F) = M_0 - 2pqd\,F.
$$ {#eq-depression}

Over many loci acting additively on the trait, $M_F = M_0 - 2F\sum_i p_iq_id_i$: the mean declines linearly with $F$ if the dominance deviations $d_i$ are predominantly positive (directional dominance), and does not change at all if there is no dominance.
:::

::: proof
$M_F = a(p^2 + Fpq) + d\cdot2pq(1 - F) - a(q^2 + Fpq) = a(p^2 - q^2) + 2pqd(1 - F)$, and $p^2 - q^2 = (p - q)(p + q) = p - q$. At $F = 0$ this is $M_0 = a(p - q) + 2pqd$, so $M_F = M_0 - 2pqdF$. Summing over loci with additive (non-epistatic) effects gives the multi-locus form.
:::

Inbreeding depression therefore requires **dominance**, and specifically that heterozygotes are on average closer to the "better" homozygote. Two genetic mechanisms can produce it. Under the **partial-dominance hypothesis**, populations carry many partially recessive deleterious alleles at low frequency (by mutation–selection balance, [[population-genetics/mutation-migration]]), and inbreeding exposes them. Under the **overdominance hypothesis**, heterozygotes are fitter than both homozygotes at many loci, and inbreeding reduces heterozygosity itself. The two make different predictions: deleterious recessives can be **purged** by selection in inbred lines, whereas overdominance would make fitness decline without recovery; and crossing different inbred lines restores fitness under both. Most evidence — the recovery of fitness in some long-inbred lines, the properties of new mutations, and genomic studies — supports partially recessive deleterious mutations as the main cause, with a minor role for overdominance (Deborah Charlesworth and John Willis, 2009).

::: example Inbreeding depression from a recessive lethal {#ex-lethal}
A population carries a recessive lethal allele at frequency $q = 0.01$ at mutation–selection balance. What fraction of zygotes die from it at $F = 0$ and among the offspring of first cousins? If the genome contains 100 such loci, each with the same frequency, what is the expected survival of the offspring of first cousins relative to that of offspring of unrelated parents?
::: solution
At $F = 0$ the fraction of homozygotes is $q^2 = 10^{-4}$. At $F = 1/16$ it is $q^2 + Fpq = 10^{-4} + 0.0625\times0.0099 = 7.19\times10^{-4}$, a 7.2-fold increase. Across 100 independent loci, survival is $\prod(1 - f_i)$: at $F = 0$, $(1 - 10^{-4})^{100} = 0.990$; at $F = 1/16$, $(1 - 7.19\times10^{-4})^{100} = 0.931$. Relative survival is $0.931/0.990 = 0.940$, a 6 % reduction. Each locus adds a fraction $Fpq$ of extra deaths, and $\ln 0.940 = -0.062 \approx -100\times\tfrac{1}{16}\times0.0099$: the logarithm of survival falls linearly in $F$, with slope $\sum_i p_iq_i \approx \sum_i q_i = 0.99$ for these lethal loci. This linearity is the basis of the next section.
:::
:::

### Lethal equivalents

The linearity in [[#eq-depression]] suggested a practical measure. Newton Morton, James Crow and Hermann Muller (1956) wrote the survival of offspring with inbreeding coefficient $F$ as

$$
S_F = e^{-(A + BF)},\qquad \ln S_F = -A - BF,
$$ {#eq-lethal-eq}

where $A$ represents deaths unrelated to inbreeding and $B$ the number of **lethal equivalents** per gamete: a set of deleterious alleles whose combined effect in homozygotes would cause, on average, one death (one fully lethal allele, or two alleles each with a 50 % chance of causing death, and so on). Each locus contributes about $q_is_i$ to $B$, so $B = \sum_i q_is_i$, and $2B$ is the number of lethal equivalents per diploid individual. $B$ is estimated as the slope of $-\ln S$ against $F$ across families with different inbreeding coefficients.

::: example Estimating lethal equivalents {#ex-b}
In a captive population, juvenile survival is 0.90 for offspring of unrelated parents and 0.60 for offspring of full siblings. Estimate the number of lethal equivalents per gamete and per diploid genome, and predict the survival of offspring of first cousins.
::: solution
With $F = 0$: $\ln 0.90 = -A$, so $A = 0.105$. With $F = 0.25$: $\ln 0.60 = -0.511 = -A - 0.25B$, so $B = (0.511 - 0.105)/0.25 = 1.62$ lethal equivalents per gamete, about 3.2 per diploid genome. For $F = 1/16$: $S = \exp(-0.105 - 1.62/16) = \exp(-0.207) = 0.81$. Estimates from many species of captive mammals (Katherine Ralls, Jonathan Ballou and Alan Templeton, 1988) suggested a few lethal equivalents per diploid genome for juvenile survival; estimates that include all components of fitness over the whole life cycle, and those from wild populations, tend to be considerably higher.
:::
:::

::: widget plot
f: exp(-A - B*x)
x: 0, 0.5
y: 0, 1
sliders: A=0.105:0:1:0.005; B=1.62:0:10:0.05
labels: S_F
vlines: 0.0625; 0.125; 0.25
caption: Survival against the inbreeding coefficient $F$ under the lethal-equivalent model [[#eq-lethal-eq]], with background mortality $A$ and $B$ lethal equivalents per gamete; the defaults are the estimates of [[#ex-b]]. The marked lines are first cousins ($F = 1/16$), half-sibs or uncle–niece ($1/8$) and full sibs ($1/4$). On a logarithmic scale the curve would be a straight line with slope $-B$. Increase $B$ to 6 (12 lethal equivalents per diploid, the order estimated for some wild populations over the whole life cycle) and see that full-sib offspring then survive at little more than a fifth of the outbred rate.
:::

### Purging

Inbreeding exposes recessive deleterious alleles to selection in homozygotes, so a population that has been inbred for a long time may have lost many of them. This **purging** is efficient for lethal and severely harmful recessives, which are eliminated within a few generations of close inbreeding, but inefficient for mildly deleterious alleles, which drift to fixation in small populations as easily as they are removed. Experiments, including long-term inbreeding of *Drosophila* and many captive populations, show that purging occurs but usually removes only part of the inbreeding depression, and that small populations instead accumulate a **drift load** of fixed mildly deleterious alleles, which no amount of within-population selection can remove — only gene flow can.

### Heterosis

The reverse of inbreeding depression is **heterosis** or hybrid vigour: crosses between inbred lines are restored to, and often exceed, the vigour of the outbred population, because the dominant alleles of one line mask the recessive alleles of the other. George Shull and Edward East independently described this in maize in 1908, and Donald Jones proposed the double-cross method (1918) that made hybrid maize commercially practical in the United States from the 1930s. Most maize, and many vegetables, are now grown from F1 hybrid seed, which must be produced afresh each year because the F2 segregates and loses part of the heterosis.

::: application Inbreeding in endangered populations
The wolves of Isle Royale, in Lake Superior, were founded around 1949 by a very few animals crossing the ice from the mainland. Isolated thereafter, the population became highly inbred; vertebral malformations became common, and after further declines only two closely related wolves remained by 2016. Genome sequences showed long runs of homozygosity and an excess of homozygous strongly deleterious variants compared with mainland wolves (Jacqueline Robinson and colleagues, 2019). Wolves from the mainland were translocated to the island from 2018 onwards. The same study illustrates a subtlety: populations that have been small for a very long time, such as the island fox of the California Channel Islands, can be highly homozygous yet have purged many strongly deleterious alleles. Conservation programmes therefore monitor kinship and inbreeding directly, avoid matings between relatives, and use gene flow to relieve inbreeding depression ([[conservation-biology/conservation-genetics]]).
:::

## Measuring inbreeding with genomes

Pedigrees give the *expected* inbreeding coefficient. The actual fraction of the genome that is IBD varies around it, because recombination breaks chromosomes into segments of random length that are inherited together: two offspring of the same first-cousin marriage can differ substantially in how much of their genome is autozygous. Dense genotype or sequence data let us measure realised inbreeding directly.

::: definition Runs of homozygosity {#def-roh}
A **run of homozygosity** (ROH) is a long stretch of an individual's genome, typically more than 1 Mb, in which every variant site is homozygous. Long ROH arise when both copies of a chromosome segment descend from one recent common ancestor (autozygosity). The **genomic inbreeding coefficient** is $F_\mathrm{ROH} = L_\mathrm{ROH}/L$, the total length of ROH above a chosen minimum length divided by the length of the autosomal genome covered.
:::

The length of ROH reveals when the common ancestor lived. A segment shared through an ancestor $g$ generations back has been exposed to recombination in $2g$ meioses, so its expected length is about $100/(2g)$ cM: long runs (over 10 Mb) indicate recent inbreeding, such as parents who are cousins, while many short runs reflect older shared ancestry and small population size in the distant past. In human populations, the distribution of ROH lengths separates populations with recent consanguinity from those with ancient bottlenecks ([[genomics/human-variation]]); in livestock, $F_\mathrm{ROH}$ has replaced pedigree $F$ for managing inbreeding.

::: intuition Why inbreeding is not "bad genes"
Inbreeding does not create deleterious alleles and does not change allele frequencies. It changes how alleles are combined, putting more of them into homozygotes. Every outbred population carries a hidden load of rare recessive variants, almost all of them in heterozygotes where they do no harm. Inbreeding reveals this load; outbreeding hides it again. The genetic quality of a population is the same before and after one generation of inbreeding — only its phenotypes differ — until selection acts on the exposed homozygotes and changes the frequencies, which is purging.
:::

::: history
Darwin's experiments on self- and cross-fertilisation (1876) documented inbreeding depression in plants. After 1900, inbreeding was studied in guinea pigs by Sewall Wright at the US Department of Agriculture, where from 1915 he analysed lines inbred by brother–sister mating since 1906. His 1921 series "Systems of mating" in *Genetics* and his 1922 paper "Coefficients of inbreeding and relationship" defined $F$ and the path method used in this chapter. Gustave Malécot (1948) restated the theory as probabilities of identity by descent. Shull and East discovered heterosis in maize in 1908. Morton, Crow and Muller (1956) introduced lethal equivalents, using data on consanguineous marriages. The genomic era began when dense SNP arrays made it possible to see runs of homozygosity directly, from about 2006 onwards.
:::

::: summary
- $F$ is the probability that the two genes at a locus in an individual are identical by descent relative to a base population; an offspring's $F$ is its parents' kinship ([[#def-f]]).
- With inbreeding, genotype frequencies are $p^2 + Fpq$, $2pq(1 - F)$, $q^2 + Fpq$; allele frequencies do not change. Rare recessive homozygotes increase by the factor $1 + Fp/q$ ([[#prop-genotypes-f]]).
- Path counting: $F_X = \sum(\tfrac12)^{n_1 + n_2 + 1}(1 + F_A)$; half-sibs $1/8$, full sibs $1/4$, first cousins $1/16$ ([[#prop-paths]]).
- Selfing halves heterozygosity each generation; partial selfing at rate $S$ gives $\hat F = S/(2 - S)$ ([[#prop-partial]]); sib mating reduces heterozygosity by about 19 % per generation; finite populations by $1/2N_e$.
- Assortative mating affects only loci related to the trait; inbreeding affects the whole genome.
- Inbreeding changes a trait mean by $-2F\sum pqd$: depression requires directional dominance ([[#prop-depression]]). It is mainly due to partially recessive deleterious alleles; survival follows $\ln S = -A - BF$ with $B$ lethal equivalents per gamete.
- Purging removes strongly deleterious recessives but not mild ones; heterosis is the reversal of inbreeding depression in crosses.
- Runs of homozygosity measure realised inbreeding and, through their lengths, its timing ([[#def-roh]]).
:::

## Exercises

::: exercise Half-sibs {level=1 check="0.125"}
What is the inbreeding coefficient of an offspring of two half-siblings, assuming their common parent is not inbred?
::: solution
One common ancestor, $n_1 = n_2 = 1$: $F = (\tfrac12)^3 = 1/8$.
:::
:::

::: exercise Genotypes under inbreeding {level=1 check="0.42"}
In a population with $F = 0.25$ and allele frequency $q = 0.6$ for $A_2$, what is the frequency of $A_2A_2$?
::: solution
$q^2 + Fpq = 0.36 + 0.25\times0.4\times0.6 = 0.36 + 0.06 = 0.42$.
:::
:::

::: exercise Three generations of selfing {level=1 check="0.875"}
A population with $F = 0$ self-fertilises completely for three generations. What is $F$?
::: solution
$1 - F_3 = (\tfrac12)^3 = 0.125$, so $F_3 = 0.875$.
:::
:::

::: exercise An inbred common ancestor {level=2 check="17/128"}
Two half-siblings mate. Their common parent $A$ was itself the offspring of first cousins ($F_A = 1/16$). What is the inbreeding coefficient of their child?
::: solution
There is one path, through $A$, with $n_1 = n_2 = 1$. By [[#eq-paths]], $F = (\tfrac12)^3(1 + F_A) = \tfrac18\times\tfrac{17}{16} = 17/128 \approx 0.133$. The ancestor's own inbreeding raises the chance that the two genes it passed down are IBD even when they came from its two different genes.
:::
:::

::: exercise Selfing rate from F {level=2 check="2/3"}
A plant population at inbreeding equilibrium has $F = 0.5$. Estimate its selfing rate.
::: solution
$S = 2F/(1 + F) = 1/1.5 = 2/3$.
:::
:::

::: exercise Consanguinity and a rare allele {level=2 check="63.4375"}
A recessive allele has frequency $q = 0.001$. By what factor is the frequency of homozygotes among offspring of first cousins higher than among offspring of unrelated parents?
::: solution
By [[#eq-ratio]], $1 + Fp/q = 1 + 0.0625\times0.999/0.001 = 1 + 62.44 = 63.44$. For very rare recessive alleles, most homozygotes in a population with even a little consanguinity are offspring of related parents.
:::
:::

::: exercise Lethal equivalents from data {level=2}
In a zoo population of antelopes, juvenile survival by inbreeding coefficient was: $F = 0$, 0.85; $F = 0.125$, 0.72; $F = 0.25$, 0.62. (a) Estimate $A$ and $B$ by fitting a straight line to $\ln S$ against $F$. (b) Is the depression consistent with the model? (c) Why might a zoo with this population avoid even matings between first cousins?
::: solution
(a) $\ln S$: $-0.163$, $-0.329$, $-0.478$. The least-squares line through the three points ([[biostatistics/regression]]) has slope $-1.26$ and intercept $-0.165$. So $B \approx 1.26$ lethal equivalents per gamete (about 2.5 per diploid genome) and $A \approx 0.165$.

(b) Yes: $\ln S$ is linear in $F$ within sampling error, as [[#eq-lethal-eq]] predicts for independent loci.

(c) For first cousins, $F = 1/16$ reduces survival by a factor $e^{-1.26/16} = 0.92$, an 8 % loss in juvenile survival alone, and inbreeding depression usually affects fertility and adult survival too. Over many generations, avoiding close matings also slows the accumulation of inbreeding in a small population.
:::
:::

::: exercise Full-sib mating {#exr-sibs level=3}
(a) Show that the kinship of two full siblings $X$ and $Y$ whose parents $M$ and $P$ have kinship $f_{MP}$ and inbreeding coefficients $F_M$ and $F_P$ is $f_{XY} = \tfrac14\bigl[\tfrac12(1 + F_M) + \tfrac12(1 + F_P) + 2f_{MP}\bigr]$. (b) Hence derive [[#eq-sibs]] for a line maintained by full-sib mating in every generation. (c) Compute $F_4$ starting from $F_0 = F_{-1} = 0$.
::: solution
(a) A random gene from $X$ comes from $M$ or $P$ with probability $\tfrac12$ each, and likewise for $Y$. Both from $M$ (probability $\tfrac14$): they are random genes of $M$, IBD with probability equal to $M$'s kinship with itself, $\tfrac12(1 + F_M)$. Both from $P$: $\tfrac12(1 + F_P)$. One from each (probability $\tfrac12$): $f_{MP}$. Summing gives the formula.

(b) An individual of generation $t$ has inbreeding $F_t = f_{XY}$, where its parents $X$ and $Y$ (generation $t - 1$) are full sibs. Their parents $M$ and $P$ belong to generation $t - 2$, so $F_M = F_P = F_{t-2}$; and the kinship $f_{MP}$ of $M$ and $P$ equals the inbreeding coefficient of their offspring $X$ and $Y$, which is $F_{t-1}$. So $F_t = \tfrac14[\tfrac12(1 + F_{t-2})\cdot2 + 2F_{t-1}] = \tfrac14(1 + 2F_{t-1} + F_{t-2})$.

(c) $F_1 = \tfrac14$, $F_2 = \tfrac14(1 + \tfrac12) = 0.375$, $F_3 = \tfrac14(1 + 0.75 + 0.25) = 0.5$, $F_4 = \tfrac14(1 + 1 + 0.375) = 0.59375$.
:::
:::

::: exercise Purging or overdominance? {level=3}
A plant breeder maintains 50 lines of a normally outcrossing species by selfing for 10 generations. Fitness falls steeply in the first three generations; 20 lines go extinct; among the 30 survivors, mean fitness then recovers partly over the remaining generations. Crosses between surviving lines produce F1 offspring as fit as the original outbred population. (a) Which hypothesis for inbreeding depression do these results support, and why? (b) Why might the recovery be only partial? (c) Why would the experiment's conclusions be biased if the extinct lines were simply ignored?
::: solution
(a) The partial recovery of fitness within inbred lines indicates purging, which is possible only if inbreeding depression is due to (partially) recessive deleterious alleles that selection can remove once they are homozygous; under pure overdominance, fitness would continue to decline as heterozygosity fell, with no recovery. The restoration of fitness in F1 crosses is predicted by both hypotheses and does not discriminate.

(b) Mildly deleterious alleles are not efficiently purged and can drift to fixation within a line (drift load), and some overdominant loci may also contribute. Purging also takes several generations of selection.

(c) The extinct lines are those carrying the most deleterious alleles; the survivors are a selected subset. Ignoring them underestimates the inbreeding depression and makes purging look more effective than it is — a survivorship bias.
:::
:::
