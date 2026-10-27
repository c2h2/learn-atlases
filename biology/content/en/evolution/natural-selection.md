Darwin's great insight was that a process without foresight can produce organisms that look designed. The eye of an eagle, the streamlining of a tuna and the timing of a plant's flowering fit their functions so well that for centuries they were taken as evidence of a designer. Natural selection explains the fit as the accumulated result of a simple statistical bias: in each generation, individuals carrying variants that happen to improve survival or reproduction in their environment leave more offspring, so those variants become more common. Repeated over thousands of generations, small biases build complex adaptations.

This chapter turns that verbal argument into quantitative predictions. We first set out the conditions for selection, then build the tools of population genetics needed to follow genes in a population: genotype and allele frequencies and the Hardy–Weinberg principle, which describes a population on which nothing acts. We add selection to a haploid and then a diploid population, and find how dominance, heterozygote advantage and the strength of selection determine its course. We then turn to continuous traits — beak depth, body size — where the breeder's equation predicts the response to selection from heritability. We end with what selection cannot do. Mendelian genetics is assumed from [[genetics]]; the deeper theory is developed in [[population-genetics]].

## Darwin's argument

The argument of the *Origin* can be put as three observations and a conclusion.

1. **Variation.** Individuals in a population differ in their traits.
2. **Inheritance.** Some of the variation is heritable: offspring resemble their parents more than they resemble unrelated individuals.
3. **Differential reproduction.** More offspring are produced than can survive and reproduce, and individuals with some variants survive or reproduce better than others in the environment they live in.

**Conclusion:** the heritable variants associated with greater reproductive success increase in frequency from generation to generation, and the population changes. If the environment stays the same, the population becomes better suited to it — it **adapts**.

All three conditions are necessary. Without variation there is nothing to choose among; without inheritance, the survivors' advantage is not passed on (a population of mules can be selected but cannot evolve); and without differential success, frequencies change only by chance. Notice also what the argument does *not* require: it does not need the variation to arise in response to need. Mutations arise without regard to whether they would be useful, as Salvador Luria and Max Delbrück showed for bacterial resistance to a bacteriophage in 1943 ([[genetics]]). Selection is the non-random part of the process; variation is the random part.

::: definition Fitness and selection coefficient {#def-fitness}
The **absolute fitness** $W$ of a genotype is the expected number of offspring an individual of that genotype contributes to the next generation (survival to reproductive age multiplied by fecundity). The **relative fitness** $w$ is the absolute fitness divided by that of a reference genotype, usually the fittest, so the reference has $w = 1$. The **selection coefficient** $s$ of a genotype with relative fitness $w = 1 - s$ measures the proportional reduction in its fitness (or, written $w = 1 + s$, its advantage). **Natural selection** is the differential survival and reproduction of individuals caused by differences in their heritable phenotypes.
:::

Only relative fitness matters for changes in frequency: if every genotype's absolute fitness is halved, the population shrinks but its composition does not change. And fitness is a property of a genotype *in an environment*: the dark peppered moth was fitter on soot-blackened bark and less fit on lichen-covered bark.

::: example Relative fitness from a field census {#ex-fitness}
In a population of beetles, 80 % of green individuals survive to breed and lay on average 50 eggs, while 60 % of brown individuals survive and lay 60 eggs. Calculate the absolute and relative fitnesses and the selection coefficient.
::: solution
Absolute fitness (eggs per newborn individual): green $0.80\times50 = 40$, brown $0.60\times60 = 36$. Relative to green, brown has $w = 36/40 = 0.90$, so $s = 0.10$ against brown. Brown survives worse but lays more eggs; the trade-off partly compensates, and fitness has to combine both components. Measuring only survival would have suggested a much larger disadvantage, $1 - 0.60/0.80 = 0.25$.
:::
:::

## A population on which nothing acts: Hardy–Weinberg

Before we can say what selection does, we need to know what happens without it. Early Mendelians wondered why dominant traits did not take over populations; the answer was given independently in 1908 by the mathematician G. H. Hardy and the physician Wilhelm Weinberg.

Consider one autosomal locus with two alleles $A_1$ and $A_2$ in a diploid, sexually reproducing population. Let $P$, $H$ and $Q$ be the frequencies of genotypes $A_1A_1$, $A_1A_2$ and $A_2A_2$ ($P + H + Q = 1$). The frequency of allele $A_1$ is

$$
p = P + \tfrac12 H,
$$ {#eq-allele-freq}

since each homozygote carries two copies and each heterozygote one, out of two per individual; and $q = 1 - p = Q + \tfrac12 H$.

::: proposition The Hardy–Weinberg principle {#prop-hw}
In a population with an infinite (very large) number of individuals, random mating, discrete non-overlapping generations, no mutation, no migration, no selection, and equal allele frequencies in the two sexes, then after a single generation of random mating the genotype frequencies are

$$
f(A_1A_1) = p^2,\qquad f(A_1A_2) = 2pq,\qquad f(A_2A_2) = q^2,
$$ {#eq-hw}

whatever the genotype frequencies of the parents, and the allele frequencies $p$ and $q$ remain constant from generation to generation.
:::

::: proof
With random mating, forming a zygote is equivalent to drawing two gametes independently from the gamete pool. Each parent of genotype $A_1A_1$ produces only $A_1$ gametes, each heterozygote produces $A_1$ and $A_2$ in equal proportions (Mendel's first law), so the frequency of $A_1$ among gametes is $P + \tfrac12H = p$. Two independent draws give $A_1A_1$ with probability $p^2$, $A_2A_2$ with probability $q^2$, and a heterozygote with probability $pq + qp = 2pq$ (either gamete can be the $A_1$). In the offspring, by [[#eq-allele-freq]], the frequency of $A_1$ is $p^2 + \tfrac12(2pq) = p(p + q) = p$: unchanged. Since the new allele frequency is $p$ again, the next generation's genotypes are again $p^2, 2pq, q^2$.
:::

Hardy–Weinberg is to evolution what Newton's first law is to motion: it says that allele frequencies stay constant unless something acts on them, and identifies the "forces" that do — selection, mutation, migration, drift (finite population size) and non-random mating. Its practical uses are two. It lets us calculate genotype frequencies from allele frequencies (and the reverse, for a recessive trait, from the frequency of homozygotes); and departures from it reveal that one of its assumptions fails.

::: widget plot
f: x^2; 2*x*(1-x); (1-x)^2
x: 0, 1
y: 0, 1
labels: A_1A_1:\ p^2; A_1A_2:\ 2pq; A_2A_2:\ q^2
vlines: 0.5
caption: Hardy–Weinberg genotype frequencies against the allele frequency $p$ of $A_1$. Hover to read values. Notice that the heterozygote frequency $2pq$ peaks at 0.5 when $p = 0.5$, and that when an allele is rare almost all its copies are in heterozygotes: at $p = 0.05$, heterozygotes ($0.095$) outnumber $A_1A_1$ homozygotes ($0.0025$) by nearly 40 to 1. This is why selection acting only on homozygotes for a rare recessive allele is so weak.
:::

::: example Testing for Hardy–Weinberg proportions {#ex-hwtest}
In a sample of 1000 individuals typed at a locus with two codominant alleles, there are 298 $A_1A_1$, 489 $A_1A_2$ and 213 $A_2A_2$. Are the genotype frequencies consistent with Hardy–Weinberg proportions?
::: solution
Allele frequency: $p = (2\times298 + 489)/2000 = 1085/2000 = 0.5425$, $q = 0.4575$.

Expected counts: $A_1A_1$: $1000p^2 = 294.3$; $A_1A_2$: $1000\times2pq = 496.4$; $A_2A_2$: $1000q^2 = 209.3$.

$$
\chi^2 = \frac{(298 - 294.3)^2}{294.3} + \frac{(489 - 496.4)^2}{496.4} + \frac{(213 - 209.3)^2}{209.3} = 0.047 + 0.110 + 0.065 = 0.22.
$$

There are three classes, minus one because the counts total 1000, minus one more because $p$ was estimated from the data: 1 degree of freedom. The 5 % critical value of $\chi^2_1$ is 3.84, so the data are entirely consistent with Hardy–Weinberg proportions ($P \approx 0.64$). Note that agreement does not prove that the assumptions hold: selection acting on adults, for example, can leave genotype proportions close to Hardy–Weinberg while changing allele frequencies. The χ² test itself is treated in [[biostatistics]].
:::
:::

::: warning "Dominant alleles become common"
Dominance describes how alleles interact in the heterozygote's phenotype, not how frequent they are. By [[#prop-hw]] a dominant allele that does not affect fitness stays at whatever frequency it has. Many dominant alleles are rare (the allele for the condition achondroplasia, for example) and many recessive ones common (the allele for blood group O). Only selection, drift, mutation or migration change frequencies.
:::

## Selection in a haploid population

The simplest model of selection follows a haploid organism — a bacterium, or the gametes of any organism — with two types, $A$ and $a$, in discrete generations.

::: proposition Haploid selection {#prop-haploid}
Let types $A$ and $a$ have relative fitnesses $1 + s$ and $1$, and let $p_t$ be the frequency of $A$ in generation $t$ (with no mutation, migration or drift). Then

$$
p_{t+1} = \frac{p_t(1 + s)}{1 + sp_t}, \qquad \Delta p = p_{t+1} - p_t = \frac{s\,p_t(1 - p_t)}{1 + sp_t},
$$ {#eq-haploid}

and the ratio of the two types grows geometrically:

$$
\frac{p_t}{1 - p_t} = \frac{p_0}{1 - p_0}(1 + s)^t.
$$ {#eq-haploid-ratio}
:::

::: proof
After selection the two types are present in proportion $p_t(1 + s) : (1 - p_t)$, and the total is $\bar w = p_t(1 + s) + (1 - p_t) = 1 + sp_t$, the **mean fitness** of the population. Dividing gives the first formula; subtracting $p_t$ gives $\Delta p = [p_t(1 + s) - p_t(1 + sp_t)]/\bar w = sp_t(1 - p_t)/\bar w$. For the ratio, $p_{t+1}/(1 - p_{t+1}) = (1 + s)\,p_t/(1 - p_t)$; iterate.
:::

Three features of [[#eq-haploid]] recur throughout population genetics. The change is proportional to $s$, the strength of selection. It is proportional to $p(1 - p)$, which is the variance of a 0/1 indicator of carrying $A$: *selection needs variation*, and acts slowly when either type is rare. And because of the geometric growth of the ratio, a favourable type increases along a logistic (S-shaped) curve.

Taking logarithms of [[#eq-haploid-ratio]], the number of generations to go from frequency $p_0$ to $p_t$ is

$$
t = \frac{1}{\ln(1 + s)}\ln\!\left[\frac{p_t(1 - p_0)}{p_0(1 - p_t)}\right] \approx \frac{1}{s}\ln\!\left[\frac{p_t(1 - p_0)}{p_0(1 - p_t)}\right]\quad (s \ll 1).
$$ {#eq-haploid-time}

::: example How fast does a resistance mutation spread? {#ex-resistance}
In a bacterial population under low-dose antibiotic exposure, a resistant mutant has a relative fitness of 1.1 compared with sensitive cells. Starting from one cell in a million, how many generations does it take to make up half the population? How long would a variant with $s = 0.01$ take to rise from 1 % to 99 %?
::: solution
By [[#eq-haploid-time]] with $s = 0.1$, $p_0 = 10^{-6}$, $p_t = 0.5$:

$$
t = \frac{\ln[0.5\times(1 - 10^{-6})/(10^{-6}\times0.5)]}{\ln 1.1} = \frac{\ln(999{,}999)}{0.09531} = \frac{13.82}{0.09531} = 145\ \text{generations}.
$$

For bacteria dividing every hour, that is about six days. For $s = 0.01$ from 0.01 to 0.99: $t = \ln(99\times99)/\ln(1.01) = 9.190/0.009950 = 924$ generations (the approximation $1/s$ gives 919). Even a 1 % advantage — far too small to see in any single generation — carries a variant almost to fixation in under a thousand generations, a blink of geological time.
:::
:::

::: widget plot
f: p*(1+s)^x/(1 - p + p*(1+s)^x)
x: 0, 300
y: 0, 1
sliders: s=0.05:0.001:0.3:0.001; p=0.01:0.001:0.5:0.001
labels: p_t
caption: The frequency of a favoured haploid type over 300 generations, from [[#eq-haploid-ratio]], for selection coefficient $s$ and starting frequency $p$. Notice the S-shaped curve: slow while the type is rare, fastest at $p = 0.5$, slow again near fixation. Halving $s$ roughly doubles the time for the whole sweep; making the type ten times rarer at the start adds a fixed delay of about $(\ln 10)/s$ generations rather than multiplying the time.
:::

## Selection in a diploid population

In a diploid, selection acts on genotypes, and what happens to an allele depends on how it behaves in heterozygotes. We assume random mating, so that zygotes are in Hardy–Weinberg proportions, and let selection act by differential survival to adulthood.

::: proposition Diploid selection at one locus {#prop-diploid}
Let genotypes $A_1A_1$, $A_1A_2$ and $A_2A_2$ have relative fitnesses $w_{11}$, $w_{12}$ and $w_{22}$, and let $p$ be the frequency of $A_1$ among zygotes, which are in Hardy–Weinberg proportions. Then the frequency of $A_1$ in the next generation is

$$
p' = \frac{p^2w_{11} + pq\,w_{12}}{\bar w}, \qquad \bar w = p^2w_{11} + 2pq\,w_{12} + q^2w_{22},
$$ {#eq-diploid}

and the change per generation is

$$
\Delta p = \frac{pq\,[\,p(w_{11} - w_{12}) + q(w_{12} - w_{22})\,]}{\bar w} = \frac{pq}{2\bar w}\,\frac{d\bar w}{dp}.
$$ {#eq-diploid-dp}
:::

::: proof
After selection, the genotypes are in proportions $p^2w_{11} : 2pq\,w_{12} : q^2w_{22}$, which sum to $\bar w$. The frequency of $A_1$ among the survivors is (by [[#eq-allele-freq]]) the $A_1A_1$ share plus half the heterozygote share, $(p^2w_{11} + pq\,w_{12})/\bar w$. Random mating among survivors then restores Hardy–Weinberg proportions at this new allele frequency. Subtracting $p = p\bar w/\bar w$:

$$
\Delta p = \frac{p^2w_{11} + pq\,w_{12} - p(p^2w_{11} + 2pq\,w_{12} + q^2w_{22})}{\bar w}.
$$

Using $1 - p = q$, the numerator is $p^2w_{11}q + pq\,w_{12}(1 - 2p) - pq^2w_{22} = pq[pw_{11} + (q - p)w_{12} - qw_{22}]$, which rearranges to the first form. For the second, differentiate $\bar w$ treating $q = 1 - p$: $d\bar w/dp = 2pw_{11} + 2(1 - 2p)w_{12} - 2qw_{22} = 2[p(w_{11} - w_{12}) + q(w_{12} - w_{22})]$.
:::

The second form of [[#eq-diploid-dp]] says that the allele frequency moves in the direction that increases mean fitness $\bar w$, at a rate proportional to $pq$. Sewall Wright pictured this in 1932 as a population climbing an **adaptive landscape**, a surface of mean fitness over allele frequencies; R. A. Fisher's **fundamental theorem of natural selection** (1930) makes a related statement, that the rate of increase in mean fitness due to selection equals the additive genetic variance in fitness. Both pictures hold exactly only under simplifying assumptions (constant fitnesses, random mating, one locus), and real landscapes change as environments and other loci change.

### Dominance and directional selection

It is convenient to write the fitnesses as

$$
w_{11} = 1 + s,\qquad w_{12} = 1 + hs,\qquad w_{22} = 1,
$$

where $s$ is the advantage of the $A_1A_1$ homozygote and $h$ the **dominance coefficient**: $h = 0$ if $A_1$ is recessive (for fitness), $h = 1$ if it is dominant, $h = \tfrac12$ if the effects are additive. Substituting into [[#eq-diploid-dp]],

$$
\Delta p = \frac{s\,pq\,[\,h + p(1 - 2h)\,]}{1 + s(p^2 + 2pqh)}.
$$ {#eq-dominance}

When $A_1$ is rare ($p \to 0$), $\Delta p \approx s\,h\,p$: the allele's fate depends on its effect in heterozygotes, because nearly all copies are in heterozygotes. A favoured *recessive* allele ($h = 0$) has $\Delta p \approx sp^2$ when rare, and increases extremely slowly at first. When $A_1$ is common ($q \to 0$), $\Delta p \approx s(1 - h)q$, proportional to $q$ — or to $q^2$ if $h = 1$: a favoured dominant allele has trouble eliminating the last recessive copies, which hide in heterozygotes.

::: widget plot
f: s*x*(1-x)*(h + x*(1-2*h))/(1 + s*(x^2 + 2*x*(1-x)*h))
x: 0, 1
sliders: s=0.1:0.01:0.5:0.01; h=0.5:0:1:0.05
labels: \Delta p
hlines: 0
caption: The change in allele frequency per generation, [[#eq-dominance]], against the frequency $p$ of the favoured allele $A_1$, for advantage $s$ and dominance $h$. With $h = 0.5$ (additive) the curve is nearly symmetric. Slide $h$ to 0 (recessive) and see that $\Delta p$ is almost zero for small $p$; slide it to 1 (dominant) and the curve collapses near $p = 1$. Push $h$ above 1 (not allowed here) and the heterozygote would be fittest — the case treated next.
:::

::: example Dominant, additive and recessive alleles compared {#ex-dominance}
A new allele confers a 5 % advantage in homozygotes ($s = 0.05$). Iterating [[#eq-diploid]] numerically from $p = 0.01$ to $p = 0.99$ gives: additive ($h = 0.5$) 193 generations; dominant ($h = 1$) 2265 generations; recessive ($h = 0$) 2171 generations. Explain the pattern.
::: solution
An additive allele always has a heterozygote advantage of $s/2$ and moves steadily, like the haploid case with $s = 0.025$: from [[#eq-haploid-ratio]], $\ln(99^2)/\ln 1.025 \approx 372$ generations — but the diploid allele gains in both heterozygotes and homozygotes and goes about twice as fast.

The dominant allele rises fast while rare (heterozygotes already have the full advantage), but near fixation the remaining $A_2$ alleles are almost all in heterozygotes, which have the same fitness as $A_1A_1$; selection sees only the rare $A_2A_2$ homozygotes, with frequency $q^2$, and the last stage takes most of the time.

The recessive allele has the opposite problem: when rare it is almost always in heterozygotes, which do not express its advantage. Most of its 2171 generations are spent at low frequency; once common, it fixes fast. J. B. S. Haldane noted in 1927 that this makes favourable recessive mutations unlikely to contribute to adaptation in outbreeding populations ("Haldane's sieve").
:::
:::

### Selection against a recessive lethal

When $A_2$ is a recessive lethal ($w_{22} = 0$, $w_{11} = w_{12} = 1$), [[#eq-diploid]] for $q$ becomes $q' = (pq)/(1 - q^2) = q/(1 + q)$. Taking reciprocals, $1/q' = 1/q + 1$, so

$$
q_t = \frac{q_0}{1 + tq_0}, \qquad t = \frac{1}{q_t} - \frac{1}{q_0}.
$$ {#eq-lethal}

To reduce a lethal allele from $q = 0.1$ to $0.01$ takes $100 - 10 = 90$ generations, and from $0.01$ to $0.001$ another 900. Rare recessives are almost invisible to selection. This is why eugenic proposals to eliminate recessive conditions by preventing homozygotes from reproducing were biologically futile as well as ethically indefensible, as R. C. Punnett pointed out in 1917.

### Heterozygote advantage and underdominance

If the heterozygote is the fittest genotype (**overdominance**, or heterozygote advantage), neither allele can fix: whichever becomes rare is mostly in the advantaged heterozygotes and is favoured.

::: proposition Equilibrium under heterozygote advantage {#prop-overdominance}
Let $w_{11} = 1 - s$, $w_{12} = 1$ and $w_{22} = 1 - t$, with $0 < s, t \le 1$. Then the allele frequency has an interior equilibrium

$$
\hat p = \frac{t}{s + t},\qquad \hat q = \frac{s}{s + t},
$$ {#eq-overdominance}

which is stable: from any starting frequency strictly between 0 and 1, $p$ converges to $\hat p$. The mean fitness at equilibrium is $\bar w = 1 - st/(s + t)$.
:::

::: proof
By [[#eq-diploid-dp]], $\Delta p = pq[p(w_{11} - w_{12}) + q(w_{12} - w_{22})]/\bar w = pq(-sp + tq)/\bar w$. This is zero inside $(0, 1)$ when $sp = tq = t(1 - p)$, i.e. $p = t/(s + t)$. For $p < \hat p$, $tq - sp > 0$ and $p$ increases; for $p > \hat p$ it decreases: the equilibrium is stable. At $\hat p$, $\bar w = 1 - s\hat p^2 - t\hat q^2 = 1 - (st^2 + ts^2)/(s + t)^2 = 1 - st/(s + t)$.
:::

The textbook case is the sickle-cell allele $HbS$ of the β-globin gene in regions with *Plasmodium falciparum* malaria. Anthony Allison showed in 1954 that heterozygotes (*HbA/HbS*) are partly protected against severe malaria, while *HbS/HbS* homozygotes have sickle-cell disease and, without medical care, greatly reduced fitness. The allele's high frequency in historically malarial regions of Africa, the Mediterranean, the Middle East and India, and its low frequency elsewhere, fit the model.

::: example An overdominant equilibrium {#ex-sickle}
Take illustrative fitnesses $w_{AA} = 0.88$ (reduced by malaria), $w_{AS} = 1$, $w_{SS} = 0.20$. What is the equilibrium frequency of $S$, the frequency of heterozygotes at birth, and the mean fitness?
::: solution
In the notation of [[#prop-overdominance]] with $A_1 = A$: $s = 0.12$, $t = 0.80$. Then $\hat q_S = s/(s + t) = 0.12/0.92 = 0.130$ and $\hat p_A = 0.870$. Heterozygotes at birth: $2\hat p\hat q = 2\times0.870\times0.130 = 0.227$, nearly a quarter of the population. Mean fitness: $1 - st/(s + t) = 1 - 0.096/0.92 = 0.896$. Iterating [[#eq-diploid]] from $q_S = 0.01$ for 200 generations reaches $0.1304$, confirming stability. The population carries a cost: about 10 % of potential offspring are lost to the two homozygotes each generation. Heterozygote advantage maintains variation, but does not make the population as fit as a population of heterozygotes would be — it cannot, since heterozygotes do not breed true.
:::
:::

If instead the heterozygote is the *least* fit (**underdominance**, $w_{12}$ below both homozygotes), the interior equilibrium exists but is unstable, and the population goes to fixation of whichever allele is in excess of the threshold. Underdominance arises for some chromosomal rearrangements, whose heterozygotes produce unbalanced gametes; it makes such rearrangements hard to establish, and plays a role in speciation ([[evolution/speciation]]).

Other forms of selection that maintain variation include **negative frequency-dependent selection**, in which a type's fitness rises as it becomes rarer (rare self-incompatibility alleles in plants, rare host resistance types against parasites adapted to common hosts — [[evolution/coevolution]]), and selection that varies in space or time.

::: quiz
A recessive allele that reduces fitness by 10 % in homozygotes has frequency 0.01. Approximately what fraction of its copies are in homozygotes, where selection can act on them?
- [ ] About 50 %
- [ ] About 10 %
- [x] About 1 %
- [ ] About 0.01 %
::: solution
Copies in homozygotes: $2q^2$ out of $2q^2 + 2pq = 2q$ copies, a fraction $q = 0.01$, i.e. about 1 %. The other 99 % hide in heterozygotes, where (if it is fully recessive) selection does not see them. This is why selection against rare recessives is so slow.
:::
:::

## Selection on continuous traits

Most traits that matter for adaptation — size, shape, timing, physiology — vary continuously and are influenced by many genes and the environment ([[population-genetics]]). We describe selection on them by what it does to the distribution of the trait.

::: definition Modes of phenotypic selection {#def-modes}
**Directional selection** favours individuals at one extreme of the distribution and shifts the mean. **Stabilising selection** favours intermediate values and reduces the variance (human birth weight was a classic example in the mid-twentieth century, when both very light and very heavy babies had lower survival). **Disruptive selection** favours both extremes over the middle and increases the variance (the African seed-cracker finch *Pyrenestes ostrinus*, in which large- and small-billed birds specialise on hard and soft seeds, as studied by Thomas Smith in the 1990s). The **selection differential** $S$ is the difference between the mean trait value of the individuals that reproduce and the mean of the whole population before selection.
:::

How much of the selection differential appears in the next generation depends on how much of the variation is inherited.

::: proposition The breeder's equation {#prop-breeder}
For a trait influenced by many genes of small effect, with selection differential $S$ in the parental generation, the **response to selection** $R$ — the change in the mean of the offspring generation — is

$$
R = h^2 S,
$$ {#eq-breeder}

where $h^2$ is the **narrow-sense heritability**, the fraction of the phenotypic variance $V_P$ due to additive genetic effects $V_A$: $h^2 = V_A/V_P$. Assumptions: the offspring–parent regression is linear, with slope $h^2$ for the regression on the mid-parent value; the environment is the same in both generations; and selection acts within one generation (no overlapping generations or carry-over effects).
:::

The idea behind [[#eq-breeder]] is that $h^2$ is the slope of the regression of offspring on mid-parent values. Selected parents deviate from the mean by $S$; their offspring are expected to deviate by the slope times $S$. Heritability is estimated in exactly this way, from offspring–parent resemblance (or from relatives, or from the response itself, as the **realised heritability** $R/S$). The full derivation is part of quantitative genetics in [[population-genetics]].

The Grants' finches supply the best-known natural example. During the drought of 1977 on Daphne Major, the seeds left were mostly large and hard; the population of medium ground finches fell by about 85 %, and the survivors had deeper beaks on average than the population before the drought. Offspring–parent regressions had shown beak depth to be highly heritable (Peter Boag, 1983), and the offspring of the survivors had deeper beaks, as [[#eq-breeder]] predicts (Peter Boag and Peter Grant, 1981). In a later drought, in 2004–2005, after a larger competitor, *Geospiza magnirostris*, had become established on the island, selection went the other way and favoured *smaller* beaks (Peter and Rosemary Grant, 2006).

::: example Predicting the response to selection {#ex-breeder}
Use illustrative values of the order measured for *Geospiza fortis*: before a drought the mean beak depth is 9.4 mm; the survivors average 9.9 mm; the heritability of beak depth is 0.79. Predict the mean beak depth of the next generation. What would it have been if $h^2 = 0.2$?
::: solution
$S = 9.9 - 9.4 = 0.5$ mm. By [[#eq-breeder]], $R = 0.79\times0.5 = 0.395$ mm, so the predicted offspring mean is $9.4 + 0.4 = 9.8$ mm, a rise of about 4 %. With $h^2 = 0.2$ the response would be only 0.1 mm. Strong selection on a trait with low heritability produces little evolution; the same selection on a highly heritable trait produces a lot. (For the measured values, see Grant and Grant, *40 Years of Evolution*, 2014.)
:::
:::

::: warning "Heritability measures how genetic a trait is"
Heritability is a property of a particular population in a particular environment, a ratio of variances — not a statement about how much of a trait in an individual is "caused by genes". The number of fingers is almost entirely genetically specified, yet its heritability is close to zero, because nearly all the variation that exists (accidents) is environmental. And a high heritability within each of two groups says nothing about the cause of a difference *between* the groups. In the breeder's equation, $h^2$ is used for exactly what it measures: how far offspring resemble selected parents.
:::

## The peppered moth

Few examples combine the elements of this chapter as well as the peppered moth *Biston betularia*. In the typical form, wings are pale and speckled; the melanic *carbonaria* form is almost black and is controlled by a dominant allele. *Carbonaria* was first recorded near Manchester in 1848; by 1895 about 98 % of moths there were black. J. B. S. Haldane calculated in 1924 that a rise this fast required the black form to have a fitness advantage of roughly 50 % — at the time an astonishingly large value, since many biologists assumed natural selection was too weak to observe. In the 1950s Bernard Kettlewell showed by mark–release–recapture that the typical form survived better in unpolluted woods and *carbonaria* in polluted ones, and that birds took the conspicuous form more often. Some of his methods were criticised, but Michael Majerus's seven-year experiment near Cambridge (published posthumously by Laurence Cook and colleagues in 2012) confirmed differential bird predation. After clean-air laws, *carbonaria* declined throughout Britain. In 2016 Arjen van't Hof and colleagues identified the mutation: a transposable element inserted into an intron of the gene *cortex*, with the haplotype dated to about 1819.

::: application Selection in breeding and resistance management
The breeder's equation was born in agriculture: livestock and crop breeders select parents with high trait values and predict the gain from $h^2$. The long-term Illinois maize selection experiment, begun in 1896, has changed the oil and protein contents of kernels by many times the original standard deviation without exhausting the response. The same quantitative reasoning predicts how quickly pests evolve resistance: refuges of non-Bt crops slow the spread of resistance to Bt toxins because resistance is usually recessive, so with plenty of susceptible insects from the refuge, rare resistance alleles stay in heterozygotes, which the toxin kills — [[#eq-dominance]] with $h \approx 0$.
:::

## What natural selection can and cannot do

**Adaptation** is a trait, or the process producing it, that increases fitness because it was favoured by natural selection for its current function. Not every useful trait is an adaptation in this strict sense, and selection is constrained in many ways.

- **It acts only on existing variation.** Selection cannot anticipate future needs or produce a variant that has not arisen. Lineages without the right mutations cannot respond, which is one reason why species go extinct when environments change fast.
- **It is myopic.** Each step must be favoured in the current environment. A population cannot cross a valley of lower fitness to reach a higher peak by selection alone (Wright's shifting-balance theory proposed that drift in small subpopulations helps; its importance is debated).
- **It is constrained by history.** Structures are modifications of what came before. The recurrent laryngeal nerve in mammals runs from the brain down into the chest, loops around a major artery and returns to the larynx — a detour of several metres in a giraffe — because in fish ancestors it passed behind a gill arch, and the arch's artery moved into the chest as the neck evolved.
- **It faces trade-offs and genetic correlations.** Resources spent on reproduction now are unavailable for survival later; alleles affecting several traits (**pleiotropy**) cannot be selected for one effect alone.
- **It can be opposed by other forces.** Gene flow from other environments and drift in small populations both oppose local adaptation ([[evolution/mutation-drift-gene-flow]]).
- **It lags behind changing environments.** A population is adapted to the conditions its ancestors met.

Stephen Jay Gould and Richard Lewontin warned in 1979 against the "adaptationist programme" of assuming every trait is an optimal adaptation and inventing a story for it. Some traits are by-products of others (they called them **spandrels**, after the triangular spaces between arches that are a consequence of the arches, not designed for themselves); some are **exaptations**, features co-opted for a function they did not originally serve (feathers, which evolved before flight). The scientific response is to test adaptive hypotheses: by comparing species with a phylogeny ([[evolution/phylogenetics]]), by measuring selection in the field, and by experiment.

::: warning "Evolution has a goal" and "selection acts for the good of the species"
Natural selection has no foresight and no direction other than the current environment's: it increases the frequency of variants that leave more descendants now. There is no tendency towards greater complexity or towards humans; parasites often become simpler. And selection among individuals does not generally produce traits that help the species at the individual's expense: a gene that makes its carrier restrain its reproduction "for the good of the group" is outcompeted by one that does not, unless the benefit goes preferentially to relatives that share the gene. W. D. Hamilton (1964) showed that altruism can evolve in that case when $rB > C$, where $r$ is relatedness, $B$ the benefit to the recipient and $C$ the cost to the actor (**kin selection**). Explanations in terms of group benefit need this kind of explicit justification.
:::

::: history
Darwin and Wallace proposed natural selection in 1858, but its acceptance was slow: blending inheritance, then thought to be how traits were transmitted, would halve variation each generation and leave selection nothing to act on. Mendel's work (1866, rediscovered in 1900) solved that problem, but early Mendelians such as Hugo de Vries and William Bateson stressed large mutations and doubted selection on small variations. Hardy and Weinberg (1908) laid the foundation for population genetics. The reconciliation came from three mathematical theorists: R. A. Fisher (*The Genetical Theory of Natural Selection*, 1930), who showed that continuous variation follows from many Mendelian genes (1918) and that selection on small differences is effective; J. B. S. Haldane (*The Causes of Evolution*, 1932, and a series of papers from 1924), who calculated rates of change under selection; and Sewall Wright (1931, 1932), who emphasised drift, population structure and adaptive landscapes. Theodosius Dobzhansky's *Genetics and the Origin of Species* (1937), Ernst Mayr's *Systematics and the Origin of Species* (1942), Julian Huxley's *Evolution: The Modern Synthesis* (1942) and George Gaylord Simpson's *Tempo and Mode in Evolution* (1944) brought genetics together with natural history, systematics and palaeontology in the **Modern Synthesis**.
:::

::: summary
- Natural selection needs heritable variation in traits that affect survival or reproduction; variation arises at random, selection is the non-random part.
- Fitness is expected offspring number; relative fitness $w$ and selection coefficient $s$ determine changes in frequency.
- Hardy–Weinberg: with random mating and no evolutionary forces, genotype frequencies are $p^2$, $2pq$, $q^2$ after one generation and allele frequencies are constant.
- Haploid selection: $\Delta p = sp(1 - p)/(1 + sp)$, the ratio $p/(1-p)$ grows by $1 + s$ each generation, and a sweep takes about $(1/s)\ln[\ldots]$ generations.
- Diploid selection: $\Delta p = (pq/2\bar w)\,d\bar w/dp$; dominance governs speed — rare recessives (favoured or harmful) are nearly invisible to selection, and a recessive lethal falls only as $q_0/(1 + tq_0)$.
- Heterozygote advantage maintains a stable polymorphism at $\hat q = s/(s+t)$; underdominance gives an unstable one.
- For continuous traits, the response to selection is $R = h^2S$.
- Selection is myopic, works with existing variation and history, faces trade-offs, and does not act for the good of the species.
:::

## Exercises

::: exercise Carriers of a recessive allele {level=1 check="0.0392"}
A recessive trait appears in 1 in 2500 individuals of a population assumed to be in Hardy–Weinberg proportions. What fraction of the population is heterozygous for the allele?
::: solution
$q^2 = 1/2500$, so $q = 0.02$ and $p = 0.98$. Heterozygotes: $2pq = 2\times0.98\times0.02 = 0.0392$, about 1 in 26 — some 98 times as common as homozygotes.
:::
:::

::: exercise A selection coefficient {level=1 check="0.25"}
Genotype $A_1A_1$ has a survival probability of 0.8 and $A_2A_2$ of 0.6, with equal fecundity. What is the selection coefficient against $A_2A_2$, relative to $A_1A_1$?
::: solution
$w = 0.6/0.8 = 0.75$, so $s = 1 - w = 0.25$.
:::
:::

::: exercise One generation of haploid selection {level=1 check="0.118"}
A haploid type with relative fitness 1.2 has frequency 0.1. What is its frequency after one generation (three decimal places)?
::: solution
By [[#eq-haploid]], $p' = 0.1\times1.2/(1 + 0.2\times0.1) = 0.12/1.02 = 0.118$.
:::
:::

::: exercise A selective sweep from rarity {level=2 check="145"}
Using [[#eq-haploid-time]] without the approximation, how many generations does a haploid variant with $s = 0.1$ take to rise from $10^{-6}$ to $0.5$? Round to the nearest generation.
::: solution
$t = \ln(999{,}999)/\ln 1.1 = 13.8155/0.09531 = 145$ generations (as in [[#ex-resistance]]).
:::
:::

::: exercise Purging a recessive lethal {level=2 check="80"}
A recessive lethal allele has frequency 0.05. How many generations of selection does it take to reduce it to 0.01, in the absence of mutation and drift?
::: solution
By [[#eq-lethal]], $t = 1/0.01 - 1/0.05 = 100 - 20 = 80$ generations.
:::
:::

::: exercise Heterozygote advantage {level=2 check="0.6"}
Genotypes $A_1A_1$, $A_1A_2$ and $A_2A_2$ have relative fitnesses 0.8, 1 and 0.7. What is the equilibrium frequency of $A_1$? (Take care over which coefficient is which.)
::: solution
In [[#prop-overdominance]], $s = 0.2$ is the coefficient against $A_1A_1$ and $t = 0.3$ that against $A_2A_2$. Then $\hat p = t/(s + t) = 0.3/0.5 = 0.6$ for $A_1$ and $\hat q = 0.4$ for $A_2$. Check: $\Delta p \propto -sp + tq = -0.2(0.6) + 0.3(0.4) = 0$. As it should be, the allele whose homozygote is fitter ($A_1A_1$, 0.8 against 0.7) is the more common one at equilibrium.
:::
:::

::: exercise Realised heritability {level=2 check="0.3"}
Breeders select mice whose mean body mass is 2.0 g above the population mean of 30 g. The offspring average 30.6 g in the same environment. What is the realised heritability? What response would a selection differential of 1.0 g produce?
::: solution
$R = 30.6 - 30 = 0.6$ g and $S = 2.0$ g, so the realised heritability is $h^2 = R/S = 0.3$. With $S = 1.0$ g the predicted response is $0.3\times1.0 = 0.3$ g.
:::
:::

::: exercise Underdominance {level=3}
Let $w_{11} = 1 + s$, $w_{12} = 1$, $w_{22} = 1 + t$ with $s, t > 0$ (the heterozygote is least fit). (a) Use [[#eq-diploid-dp]] to find the interior equilibrium and show it is unstable. (b) A new chromosomal rearrangement appears as a single copy in a large population. Explain why it is almost always lost, even if homozygotes for it are fitter, and how it could nevertheless become fixed in a small population.
::: solution
(a) $\Delta p = pq[p(w_{11} - w_{12}) + q(w_{12} - w_{22})]/\bar w = pq(sp - tq)/\bar w$. It vanishes at $\hat p = t/(s + t)$. For $p > \hat p$, $sp - tq > 0$ and $p$ increases further; for $p < \hat p$ it decreases: departures grow, so the equilibrium is unstable, and the population fixes $A_1$ if it starts above $\hat p$, $A_2$ if below.
(b) A new rearrangement starts near $p = 0$, far below $\hat p$, and almost all its copies are in heterozygotes, which are less fit, so selection removes it. In a small population, random drift ([[evolution/mutation-drift-gene-flow]]) can carry it above $\hat p$ by chance, after which selection fixes it. This is one way chromosomal differences between species could arise, and why such differences can contribute to reproductive isolation ([[evolution/speciation]]).
:::
:::

::: exercise Interpreting melanism data {level=3}
In a peppered-moth population, the frequency of the black phenotype (caused by a dominant allele $C$) rose from 0.01 to 0.98 in about 50 generations. (a) Under Hardy–Weinberg proportions, what were the frequencies of the $C$ allele at the start and end? (b) Use the haploid formula [[#eq-haploid-time]] as a rough guide to estimate the selection coefficient needed for an allele to rise between these frequencies in 50 generations. (c) Why would a full diploid treatment with complete dominance give a somewhat different answer, and in which direction?
::: solution
(a) The non-black (typical) phenotype is $cc$ with frequency $q^2$. At the start $q^2 = 0.99$, $q = 0.99499$, so $p_C = 0.00501$. At the end $q^2 = 0.02$, $q = 0.1414$, $p_C = 0.8586$.
(b) The log-odds change is $\ln[(0.8586/0.1414)/(0.00501/0.99499)] = \ln(6.072/0.005036) = \ln 1206 = 7.10$. Over 50 generations, $\ln(1 + s) = 0.142$, so $s \approx 0.15$ per allele copy.
(c) With complete dominance, heterozygotes have the full advantage, so a rare $C$ allele rises faster than in an additive model with the same homozygote advantage, but its progress slows near the top, where selection sees only $cc$ homozygotes. Since the end frequency here is not extreme, the dominant model needs a phenotypic advantage of the black form of roughly twice the per-allele value, about 30 % — in line with Haldane's 1924 conclusion that the advantage had to be large. (Iterating [[#eq-dominance]] with $h = 1$ confirms this order of magnitude.)
:::
:::
