By the early 1990s the Florida panther, the last population of puma (*Puma concolor*) in the eastern United States, numbered perhaps 20 to 30 adults confined to the swamps and forests of southern Florida. Its biologists were finding things that had nothing obvious to do with roads, hunting or habitat. Many panthers had a sharp kink at the end of the tail and a whorl of hair — a "cowlick" — in the middle of the back. Most males had at least one undescended testis and very poor-quality sperm, and a high proportion of animals had heart defects and suppressed immunity. Genetic surveys showed that the population had lost much of the variation present in other pumas. In 1995 managers took a step that was then controversial: they released eight female pumas from Texas, from a population that had once been connected to Florida's by continuous range. Five of them bred. Within a decade the kinked tails and cowlicks had become rare, the hybrid kittens survived better than the pure Florida kittens, heterozygosity had roughly doubled, and the population had grown to around a hundred animals (Warren Johnson and colleagues, 2010).

The panther story contains most of the subject of this chapter: the loss of genetic variation in small, isolated populations; the harm caused by inbreeding; the restoration of fitness by gene flow, called **genetic rescue**; and the genetic tools that conservation now uses routinely. The population-genetic theory behind it — drift, the decay of heterozygosity, effective population size, migration — was developed in [[evolution/mutation-drift-gene-flow]], and inbreeding and inbreeding depression in [[population-genetics/inbreeding]]; we use those results and concentrate on what they mean for threatened populations. The demographic threats to small populations, which act alongside the genetic ones, are in [[conservation-biology/small-populations]].

## Why genetic diversity matters

Genetic variation matters to conservation for three reasons.

- **Evolutionary potential.** A population can adapt to new conditions — a new disease, a warmer climate — only if it carries heritable variation in the relevant traits. By Fisher's fundamental theorem ([[evolution/natural-selection]]), the rate of adaptive change is proportional to the additive genetic variance in fitness. A population stripped of variation cannot respond.
- **Inbreeding depression.** In small populations relatives inevitably mate. Their offspring are more often homozygous for rare, partly recessive deleterious alleles, and suffer reduced survival and reproduction.
- **Population and species diversity as a portfolio.** Genetically distinct populations differ in timing, tolerance and life history; their diversity stabilises the species as a whole ([[conservation-biology/biodiversity]]).

Russell Lande (1988) argued that demographic and environmental chance would usually doom a small population before genetic problems could. The evidence gathered since has shown that genetic factors cannot be ignored. Derek Spielman, Barry Brook and Richard Frankham (2004) compared the heterozygosity of 170 threatened taxa with that of related non-threatened taxa and found it lower in the threatened taxon in 77 % of comparisons, by about 35 % on average; inbreeding depression has been documented in wild populations of many species; and genetic rescue, as in the panther, has repeatedly reversed declines. Genetics and demography are not alternatives: they interact, as in the extinction vortex of [[conservation-biology/small-populations]].

::: definition Measures of genetic diversity {#def-gendiv}
- **Expected heterozygosity** (gene diversity) at a locus, $H = 1 - \sum_i p_i^2$, the probability that two alleles drawn at random from the population differ; usually averaged over loci. **Observed heterozygosity** $H_o$ is the proportion of individuals that are heterozygous.
- **Allelic richness**: the number of alleles per locus, usually standardised to a common sample size by rarefaction. It is lost faster than heterozygosity in a bottleneck, because rare alleles contribute little to $H$ but count fully here.
- **Nucleotide diversity** $\pi$: the average proportion of sites that differ between two sequences, measured from genome sequences.
- **Runs of homozygosity** (ROH): long stretches of the genome that are homozygous because both copies descend from a recent common ancestor; the fraction of the genome in ROH, $F_\mathrm{ROH}$, estimates an individual's inbreeding coefficient ([[population-genetics/inbreeding]]).
:::

## Loss of variation by drift

In a population of effective size $N_e$, random sampling of gametes each generation causes expected heterozygosity to decline by a fraction $1/2N_e$ per generation ([[evolution/mutation-drift-gene-flow]]):

$$
H_t = H_0\left(1 - \frac{1}{2N_e}\right)^t \approx H_0\,e^{-t/2N_e}.
$$ {#eq-hloss}

Two consequences are central to conservation. First, losses accumulate over **generations**, not years: a tortoise with a generation time of 40 years loses variation slowly in calendar time even in a small population, while an insect with ten generations a year loses it fast. Second, the relevant size is the **effective** size, which in most real populations is much smaller than the census number.

::: proposition Time to lose a given fraction of heterozygosity {#prop-hloss}
Under [[#eq-hloss]], the number of generations needed for heterozygosity to fall to a fraction $f$ of its initial value is

$$
t = \frac{\ln f}{\ln(1 - 1/2N_e)} \approx 2N_e\ln\frac{1}{f}.
$$ {#eq-tloss}

In particular, heterozygosity halves in about $2N_e\ln2 \approx 1.39N_e$ generations, and 10 % is lost in about $0.21N_e$ generations. New mutation restores variation only slowly: at mutation–drift equilibrium, expected heterozygosity at a neutral locus with mutation rate $\mu$ per generation is about $\theta/(1 + \theta)$ with $\theta = 4N_e\mu$, so variation lost in a bottleneck takes of the order of $N_e$ to $1/\mu$ generations to recover.
:::

::: proof
Set $H_t/H_0 = f$ in [[#eq-hloss]] — that is, $(1 - 1/2N_e)^t = f$ — and take logarithms: $t\ln(1 - 1/2N_e) = \ln f$. For large $N_e$, $\ln(1 - 1/2N_e) \approx -1/2N_e$, which gives $t \approx 2N_e\ln(1/f)$. With $f = 1/2$, $t \approx 2N_e\ln2 = 1.386N_e$; with $f = 0.9$, $t \approx 2N_e\times0.105 = 0.21N_e$.
:::

::: widget plot
f: (1 - 1/(2*Ne))^x; (1 - 1/(2*500))^x
x: 0, 200
y: 0, 1
sliders: Ne=50:5:1000:5
labels: H_t/H_0 \text{ for chosen } N_e; N_e = 500
caption: Expected heterozygosity remaining, $H_t/H_0$, against time in generations, from [[#eq-hloss]]. The second curve is for $N_e = 500$, Franklin's long-term benchmark. Drag $N_e$ down to 50 and see that about two-thirds of the variation is gone in 100 generations; at $N_e = 500$, 90 % remains after 100 generations.
:::

### Effective population size

The **effective population size** $N_e$ is the size of an idealised Wright–Fisher population that would lose heterozygosity (or show random changes in allele frequency) at the same rate as the population of interest ([[evolution/mutation-drift-gene-flow]]). Three features of real populations make it smaller than the census size $N$.

::: proposition Effective size: three standard corrections {#prop-ne}
1. **Unequal numbers of breeding males $N_m$ and females $N_f$**:
$$
N_e = \frac{4N_mN_f}{N_m + N_f}.
$$ {#eq-ne-sex}
2. **Fluctuating size** over $t$ generations with sizes $N_1, \dots, N_t$: $N_e$ is approximately the **harmonic mean**,
$$
\frac{1}{N_e} = \frac1t\sum_{i=1}^{t}\frac{1}{N_i},
$$ {#eq-ne-harm}
which is dominated by the smallest values.
3. **Variance in family size** $V_k$ among parents in a population of constant size $N$:
$$
N_e = \frac{4N - 2}{V_k + 2},
$$ {#eq-ne-vk}
which equals $N$ when family sizes are Poisson ($V_k = 2$) and approaches $2N$ if every parent leaves exactly two offspring ($V_k = 0$).
:::

These formulas, due to Sewall Wright, are derived in [[population-genetics/genetic-drift]]. In wild populations all three effects act together, and Richard Frankham (1995), reviewing estimates across many species, found that $N_e/N$ averaged only about 0.1. A population of 1000 animals may therefore lose variation as fast as an ideal population of about 100.

::: example A harem and a bottleneck {#ex-ne}
(a) In a population of elephant seals, 10 males hold harems and father all the pups of 200 breeding females. What is the effective size of the breeding population? (b) A population of 1000 breeding adults per generation is reduced by a disease outbreak to 20 for one generation, then returns to 1000 for three more. What is its effective size over the five generations? (c) How much heterozygosity is lost in the bottleneck generation, compared with a normal generation?
::: solution
(a) From [[#eq-ne-sex]], $N_e = 4\times10\times200/(10 + 200) = 8000/210 = 38$, compared with 210 breeders. The scarcity of breeding males dominates.

(b) From [[#eq-ne-harm]], $1/N_e = \tfrac15(4/1000 + 1/20) = \tfrac15(0.004 + 0.05) = 0.0108$, so $N_e = 93$ — less than a tenth of the arithmetic mean size, 804. A single generation of small size is felt for the whole period.

(c) In the bottleneck generation a fraction $1/40 = 2.5$ % of heterozygosity is lost, compared with $1/2000 = 0.05$ % in a normal generation: one bad generation does fifty generations' worth of damage. The northern elephant seal (*Mirounga angustirostris*) illustrates this on a large scale. Hunting for oil reduced it to perhaps a few tens to a hundred animals in the 1890s; with protection it has recovered to well over 100 000, but it retains very little genetic variation compared with the southern elephant seal, which was never so reduced. Numbers recover far faster than variation.
:::
:::

::: warning "If the population has recovered, so has its genetic diversity"
Census size can recover in decades; neutral genetic variation, once lost, returns only through mutation over thousands of generations or through immigration. A species that has passed through a bottleneck may be numerous but genetically depauperate, like the northern elephant seal or the cheetah (whose individuals, Stephen O'Brien and colleagues found in 1985, accepted skin grafts from unrelated animals, as if they were close relatives). Such species may be vulnerable to new diseases or environmental change even though they are no longer rare.
:::

## Inbreeding and inbreeding depression

In a closed population of effective size $N_e$, the average inbreeding coefficient $F$ — the probability that the two alleles at a locus in an individual are identical by descent — rises by $1/2N_e$ per generation, mirroring the loss of heterozygosity: $1 - F_t = (1 - 1/2N_e)^t$. Small populations become inbred even when individuals avoid mating with close relatives, simply because after a few generations everyone is related.

**Inbreeding depression** is the reduction in fitness of inbred individuals relative to outbred ones. Its main genetic cause is the expression of rare, partly recessive deleterious alleles in homozygotes (the **partial dominance** hypothesis); a smaller contribution may come from loci where heterozygotes are fittest (**overdominance**). As shown in [[population-genetics/inbreeding]], a trait's mean declines linearly with $F$ if loci act additively, which motivates the standard way of measuring it for survival.

::: definition Lethal equivalents {#def-lethal}
Following Newton Morton, James Crow and Hermann Muller (1956), the probability of survival $S$ of individuals with inbreeding coefficient $F$ is modelled as

$$
S = e^{-(A + BF)}, \qquad\text{that is}\qquad \ln S = -A - BF,
$$ {#eq-lethal}

where $A$ measures mortality in outbred individuals and $B$ is the number of **lethal equivalents per gamete** — a group of deleterious alleles that would, if dispersed among individuals, cause on average one death in the homozygous state. The number per diploid individual is $2B$. $B$ is estimated as the slope of $-\ln S$ against $F$.
:::

::: example Estimating lethal equivalents {#ex-lethal}
In a zoo population, 70 % of offspring of unrelated parents ($F = 0$) survive to one year, but only 40 % of offspring of full-sib matings ($F = 0.25$). (a) Estimate $B$ and $2B$. (b) Predict the survival of offspring of first cousins ($F = 0.0625$) and of half-sibs ($F = 0.125$).
::: solution
(a) From [[#eq-lethal]], $\ln(0.7) - \ln(0.4) = 0.25B$, so $B = \ln(1.75)/0.25 = 0.560/0.25 = 2.24$ lethal equivalents per gamete, or $2B = 4.5$ per diploid individual.

(b) $S = 0.7\,e^{-2.24F}$: for $F = 0.0625$, $S = 0.7e^{-0.14} = 0.61$; for $F = 0.125$, $S = 0.7e^{-0.28} = 0.53$.

Katherine Ralls, Jonathan Ballou and Alan Templeton (1988) estimated a median of about three diploid lethal equivalents for juvenile survival across captive mammal populations; Julian O'Grady and colleagues (2006), considering effects across the whole life cycle in wild populations, put the total at about 12. Values from captivity, where food and veterinary care buffer the environment, understate the effect in the wild.
:::
:::

Inbreeding depression in the wild is often worse in harsh conditions. On Mandarte Island in British Columbia, a population of song sparrows (*Melospiza melodia*) studied since 1975 crashed in a severe winter in 1989; Lukas Keller and colleagues (1994) found that the survivors were significantly less inbred than those that died. In a metapopulation of the Glanville fritillary butterfly in the Åland Islands, Ilik Saccheri and colleagues (1998) found that local populations with lower heterozygosity were more likely to go extinct, independently of ecological factors — direct evidence that inbreeding can contribute to extinction in nature ([[conservation-biology/fragmentation]]).

Can a population "purge" its deleterious alleles by inbreeding, exposing them to selection? To some extent: highly deleterious recessives are expressed and removed in inbred lineages. But purging is unreliable — it removes mostly the lethal alleles and much less the many mildly deleterious ones, and it works only when the population is not driven extinct in the process. Reviews of experiments (Peter Crnokrak and Spencer Barrett, 2002) found that purging typically reduced inbreeding depression only modestly. Deliberate inbreeding to purge a threatened population is not a recommended strategy.

## Gene flow, population structure and genetic rescue

Migration counteracts drift. In Sewall Wright's island model ([[evolution/mutation-drift-gene-flow]]), with $m$ the fraction of each population that are immigrants each generation, differentiation among populations settles at

$$
F_{ST} \approx \frac{1}{1 + 4N_em},
$$ {#eq-fst}

which depends only on the **number** of migrants per generation, $N_em$, not on population size or migration rate separately. One effective migrant per generation gives $F_{ST} = 0.2$; ten give about 0.02. From this result came the **one-migrant-per-generation rule**: L. Scott Mills and Fred Allendorf (1996) concluded that a minimum of one, and preferably up to ten, migrants per generation would prevent substantial loss of variation within subpopulations while allowing some local adaptation. Because real migrants differ from the idealised ones, the rule is a guide to the order of magnitude.

::: example How many migrants? {#ex-migrants}
Two isolated populations of a rare frog have effective sizes of 40. (a) Without migration, what fraction of heterozygosity does each lose in 20 generations? (b) Managers plan to move frogs between the ponds. What value of $F_{ST}$ would be expected at equilibrium if they moved, on average, 0.5, 1 and 5 effective migrants per generation? (c) Which would you recommend?
::: solution
(a) $H_{20}/H_0 = (1 - 1/80)^{20} = 0.777$, so about 22 % of the heterozygosity is lost in 20 generations.

(b) From [[#eq-fst]]: $N_em = 0.5$ gives $F_{ST} = 1/3 = 0.33$; $N_em = 1$ gives $0.20$; $N_em = 5$ gives $1/21 = 0.048$.

(c) At least one effective migrant per generation, preferably a few. Since breeding success of translocated frogs is uncertain, moving several animals per generation to achieve one to five *effective* migrants is prudent. Moving many more would homogenise the populations, which matters if they are locally adapted to different conditions.
:::
:::

::: widget plot
f: 1/(1 + 4*x)
x: 0, 10
y: 0, 1
hlines: 0.2
labels: F_{ST} = 1/(1 + 4N_e m)
caption: Equilibrium differentiation $F_{ST}$ in Wright's island model [[#eq-fst]] against the number of effective migrants per generation $N_em$. The horizontal line marks one migrant per generation ($F_{ST} = 0.2$). Notice how steeply $F_{ST}$ falls over the first few migrants and how little additional migrants change it after about ten — a small amount of gene flow goes a long way.
:::

::: definition Genetic rescue and outbreeding depression {#def-rescue}
**Genetic rescue** is an increase in population fitness (growth rate) caused by gene flow into a small, inbred population, beyond what is attributable to the demographic contribution of the immigrants. It works because the immigrants carry different deleterious recessives, so their offspring with residents are heterozygous at loci where residents were homozygous, masking the deleterious alleles (heterosis). **Outbreeding depression** is the opposite risk: reduced fitness of crosses between populations, caused by the disruption of local adaptation or of co-adapted gene complexes, or by chromosomal differences between the populations.
:::

Fears of outbreeding depression long made managers reluctant to move animals between populations. Richard Frankham and colleagues (2011) reviewed the evidence and concluded that the risk is usually low and predictable: it is likely to be serious only if the populations have fixed chromosomal differences, have been isolated for more than about 500 years, or live in substantially different environments. A later meta-analysis by Frankham (2015) found that gene flow into inbred populations improved fitness in the great majority (over 90 %) of the cases examined, often substantially, and that the benefits persisted beyond the first generation in most cases studied.

::: application Rescues that worked, and one that did not last
- **Greater prairie chicken, Illinois.** By 1993 fewer than 50 birds remained, and the fraction of eggs that hatched had fallen from over 90 % to under 40 %. After birds from Kansas, Minnesota and Nebraska were translocated in 1992–1996, hatching success returned to over 90 % (Ronald Westemeier and colleagues, 1998).
- **Adders, Sweden.** An isolated population of adders (*Vipera berus*) at Smygehuk had declined and produced many stillborn young. Twenty males from another population were introduced in 1992; after they were removed four years later, the population, now carrying their genes, grew rapidly and the proportion of malformed offspring fell (Thomas Madsen and colleagues, 1999).
- **Wolves of Isle Royale.** Wolves colonised this island in Lake Superior across an ice bridge around 1949 and remained isolated and increasingly inbred. A single male immigrant arrived in 1997 and became so successful that, within a few generations, more than half the population's ancestry traced to him; but with no further immigration, inbreeding returned, and skeletal deformities became common. By 2016–2018 only two closely related wolves remained, and the National Park Service relocated wolves from the mainland in 2018–2019. Genetic rescue is not a one-off treatment: an isolated population needs continuing gene flow.
:::

::: quiz
A small, isolated population is suffering inbreeding depression. A nearby population of the same species lives in a similar habitat, was connected to it by continuous habitat until about 150 years ago, and has the same chromosome number. What does the evidence on genetic rescue suggest?
- [ ] Translocating individuals carries a high risk of outbreeding depression and should be avoided.
- [x] Translocating individuals is likely to improve fitness, with a low risk of outbreeding depression.
- [ ] The population should be allowed to purge its deleterious alleles first.
- [ ] Only captive breeding can help, because wild individuals would carry new diseases.
::: solution
All three of Frankham's risk factors are absent: the populations share the same karyotype, were isolated for well under 500 years and live in similar environments. Gene flow is likely to mask deleterious recessives and raise fitness. (Screening translocated animals for diseases is still standard practice, but disease risk is a reason for care, not for inaction.)
:::
:::

## Units of conservation

Genetic data also help to decide **what** to conserve. Below the species level, populations may differ enough to deserve separate management. Oliver Ryder (1986) introduced the **evolutionarily significant unit** (ESU) for a population or group of populations representing significant adaptive variation; Robin Waples (1991) made it a legal category for Pacific salmon under the US Endangered Species Act, requiring reproductive isolation from other conspecific units and an important contribution to the evolutionary legacy of the species. Craig Moritz (1994) proposed genetic criteria: ESUs should be reciprocally monophyletic for mitochondrial DNA and differ significantly in nuclear allele frequencies, while **management units** (MUs) are populations with significantly different allele frequencies, demographically independent and to be monitored and managed separately. Genomic data now allow units to be defined by both neutral divergence and adaptive variation at loci associated with the environment.

Genetics can also reveal threats invisible to field biologists. **Hybridisation** with introduced or domestic relatives can swamp the genome of a rare species: the Scottish wildcat (*Felis silvestris*) has hybridised so extensively with domestic cats that few wild animals of pure ancestry are thought to remain, and conservation now relies partly on captive breeding of the least admixed animals for release.

## DNA tools for conservation

Molecular methods have become an everyday part of conservation practice.

- **DNA barcoding**: a short standard gene region — usually a 648-base-pair segment of the mitochondrial cytochrome *c* oxidase subunit I gene (COI) in animals, proposed by Paul Hebert and colleagues in 2003, and chloroplast and nuclear markers in plants and fungi — identifies species from fragments, larvae or processed products.
- **Environmental DNA** (eDNA): DNA shed into water, soil or air identifies the species present without seeing them. Gentile Francesco Ficetola and colleagues (2008) showed that the invasive American bullfrog could be detected in French ponds from water samples. **Metabarcoding** of eDNA — sequencing a barcode region from all the DNA in a sample — can survey whole communities of fishes, amphibians or invertebrates and is now used to detect rare species and early invasions.
- **Non-invasive genetic sampling**: DNA from hair, faeces, feathers or shed skin identifies individuals, their sex and their relatives without capturing them, allowing populations of elusive animals to be counted by genetic mark–recapture. Katherine Kendall and colleagues (2009) estimated 765 grizzly bears in the Northern Continental Divide Ecosystem of Montana from genotyped hair snagged on barbed wire and on trees where bears rub.
- **Wildlife forensics**: genotypes identify the species and geographic origin of seized products. Scott Baker and Stephen Palumbi (1994) found meat of protected whale species on sale in Japan; Samuel Wasser and colleagues (2015) assigned large seizures of ivory to their regions of origin using genotypes from reference samples of elephant dung across Africa, showing that most savanna-elephant ivory came from a few hotspots, mainly in Tanzania and northern Mozambique, and guiding enforcement there.
- **Genomics**: whole-genome sequencing estimates inbreeding from runs of homozygosity, reconstructs histories of population size, identifies the deleterious alleles carried by individuals and loci involved in local adaptation, and guides pairing decisions in captive breeding, as in the kākāpō ([[conservation-biology/small-populations]]).

::: example Counting bears by their DNA {#ex-capture}
In a genetic survey, hair samples collected in the first season yielded 40 distinct genotypes (individuals). In the second season, 35 individuals were genotyped, of which 14 had been identified in the first season. Estimate the population size with the Lincoln–Petersen estimator $\hat N = n_1n_2/m$ and with Chapman's less biased version $\hat N = (n_1 + 1)(n_2 + 1)/(m + 1) - 1$. State the main assumptions.
::: solution
Lincoln–Petersen: $\hat N = 40\times35/14 = 100$ bears. Chapman: $\hat N = 41\times36/15 - 1 = 97.4$, about 97 bears.

The reasoning: if the population is $N$, the fraction marked (genotyped) in season 1 is $40/N$, and the 35 individuals of season 2 should contain about $35\times40/N$ marked ones; setting this equal to 14 gives $N = 100$. The assumptions are that the population is **closed** between the seasons (no births, deaths or movements in or out), that every individual has the **same probability of being sampled** in each season (bears that avoid hair snares would bias the estimate low or high), and that genotypes are **identified without error** — a real concern with degraded DNA from hair, where allelic dropout can create false "new" individuals and inflate $\hat N$. Genotyping each sample at several loci more than once guards against this.
:::
:::

::: intuition Genetic variation as a savings account
Think of a population's genetic variation as capital in a bank account that earns interest only very slowly (new mutations, at about $\mu$ per generation) but on which a tax of $1/2N_e$ is levied every generation. A large population pays a negligible tax and its capital is effectively permanent. A small one pays heavily and, once the capital is spent, cannot rebuild it by saving; only a transfer from another account — gene flow — can restore it quickly. Genetic rescue is that transfer.
:::

### Captive populations

Many species survive only in captivity or depend on captive breeding for reintroduction ([[conservation-biology/restoration]]). Captive populations are managed with **studbooks** that record every individual's pedigree. The standard strategy is to minimise **mean kinship** — to breed preferentially the individuals least related to the rest of the population — which retains founder diversity and slows the rise of inbreeding. A goal often adopted by zoo programmes is to retain 90 % of the original heterozygosity for 100 years. Captivity also brings a different genetic hazard: **adaptation to captivity**. Selection in captivity favours tameness and tolerance of crowding and artificial food, and these traits are often harmful after release. Hitoshi Araki and colleagues (2007) found that in steelhead trout (*Oncorhynchus mykiss*) the reproductive success of hatchery-reared fish in the wild declined by roughly 40 % for each generation spent in captivity. Captive breeding should therefore be as short as possible, with wild-like conditions and, where possible, periodic gene flow from wild populations.

::: application Genetic diversity in global policy
The Kunming–Montreal Global Biodiversity Framework (2022) is the first global biodiversity agreement to set an explicit goal for genetic diversity within species: its Goal A and Target 4 call for the genetic diversity of wild and domesticated species to be maintained, and one of its headline indicators is the proportion of populations within species with an effective size greater than 500, drawing directly on Franklin's rule. Because direct estimates of $N_e$ are rare, the indicator can be approximated from census sizes using a conservative ratio $N_e/N \approx 0.1$, so that a population of at least about 5000 adults is assumed to meet it ([[conservation-biology/people-and-policy]]).
:::

::: history
Conservation genetics grew from the meeting of population genetics with zoo management. Katherine Ralls and Jonathan Ballou's analyses of juvenile mortality in captive mammals (1979, 1983) showed that inbreeding depression was widespread in zoos. Otto Frankel and Michael Soulé's *Conservation and Evolution* (1981) and Franklin's "50/500" rule (1980) set out the genetic goals of conservation. Allozyme surveys of the 1970s and 1980s documented low variation in bottlenecked species, including the cheetah (O'Brien and colleagues, 1983, 1985); microsatellites in the 1990s made it possible to estimate relatedness, migration and population size in the wild; and the Florida panther (1995), the Illinois prairie chicken and the Swedish adders became the classic cases of genetic rescue. Since about 2010, whole-genome sequencing has turned conservation genetics into conservation genomics.
:::

## Where this leads

Genetic and demographic problems both stem from small, isolated populations, and isolation is mostly the result of habitat being broken into fragments. The next chapter, [[conservation-biology/fragmentation]], analyses how fragmentation affects populations and how connectivity — the landscape-scale version of gene flow — can be restored.

::: summary
- Genetic diversity provides **evolutionary potential**, its loss causes **inbreeding depression**, and population diversity stabilises species. Threatened taxa typically have lower heterozygosity than their non-threatened relatives.
- Heterozygosity decays as $H_t = H_0(1 - 1/2N_e)^t$; halving takes about $1.39N_e$ generations ([[#prop-hloss]]). Variation lost in a bottleneck recovers only by mutation or gene flow.
- **Effective size** is reduced by unequal sex ratios ($4N_mN_f/(N_m + N_f)$), fluctuations (harmonic mean) and variance in family size ([[#prop-ne]]); $N_e/N$ averages about 0.1.
- Inbreeding depression is measured in **lethal equivalents** from $\ln S = -A - BF$ ([[#def-lethal]]); it is stronger in the wild than in captivity, and purging is unreliable.
- Gene flow limits differentiation, $F_{ST} \approx 1/(1 + 4N_em)$; one to ten migrants per generation is a common guideline. **Genetic rescue** ([[#def-rescue]]) is usually beneficial, and outbreeding depression is a predictable, usually low risk.
- Genetics defines **ESUs and management units**, and DNA tools — barcoding, eDNA, non-invasive sampling, forensics and genomics — are now routine in conservation.
:::

## Exercises

::: exercise Heterozygosity after a bottleneck {level=1 check="(1 - 1/20)^5"}
A population is kept at an effective size of 10 for 5 generations. What fraction of its initial heterozygosity remains?
::: solution
$(1 - 1/20)^5 = 0.95^5 = 0.774$: about 23 % of the heterozygosity is lost in five generations.
:::
:::

::: exercise Sex ratio {level=1 check="4*5*45/50"}
A herd of 50 breeding deer contains 5 breeding stags and 45 breeding hinds. What is its effective size?
::: solution
$N_e = 4\times5\times45/(5 + 45) = 900/50 = 18$.
:::
:::

::: exercise Halving time {level=1}
How many generations does it take a population with $N_e = 200$ to lose half its heterozygosity? If its generation time is 8 years, how many years is that?
::: solution
$t \approx 1.386\times200 = 277$ generations (exactly, $\ln0.5/\ln(1 - 1/400) = 277$), or about 2200 years. Drift is slow at this effective size; it is catastrophic only at small $N_e$ or over long times.
:::
:::

::: exercise Harmonic mean {level=2 check="4/(1/500 + 1/50 + 1/500 + 1/500)"}
A population has effective sizes of 500, 50, 500 and 500 in four successive generations. What is its effective size over the four generations? Compare it with the arithmetic mean.
::: solution
$1/N_e = \tfrac14(0.002 + 0.02 + 0.002 + 0.002) = 0.0065$, so $N_e = 154$, compared with an arithmetic mean of 387.5.
:::
:::

::: exercise Interpreting inbreeding data {level=2}
In a wild population of a bird, the survival of chicks to independence was 0.62 for $F = 0$, 0.55 for $F = 0.0625$, 0.46 for $F = 0.125$ and 0.32 for $F = 0.25$. (a) Estimate the number of lethal equivalents per diploid individual from the extreme values. (b) Is the relationship of $\ln S$ with $F$ roughly linear? (c) Give two reasons why this estimate might differ from one obtained in captivity.
::: solution
(a) $B = [\ln0.62 - \ln0.32]/0.25 = \ln(1.9375)/0.25 = 0.661/0.25 = 2.65$; $2B = 5.3$ diploid lethal equivalents (for chick survival only).

(b) $-\ln S$ is $0.478$, $0.598$, $0.777$, $1.139$ for $F = 0, 0.0625, 0.125, 0.25$; the successive slopes are $1.92$, $2.86$ and $2.90$ per unit $F$, so the decline is roughly linear, a little steeper at higher $F$ — data of this size cannot distinguish the slight curvature from noise.

(c) Wild conditions (cold, food shortage, predators, parasites) usually make inbreeding depression stronger than in captivity, where they are buffered; and the wild estimate may be confounded with other differences (inbred chicks may come from poorer territories or younger parents), whereas captive matings can be planned. Sample sizes and how $F$ is measured (pedigree versus genomic) also matter.
:::
:::

::: exercise Planning a translocation {level=2}
A population of 30 lizards on an island has $N_e \approx 15$. (a) What is the expected increase in mean $F$ per generation? (b) How many effective migrants per generation would keep $F_{ST}$ with the mainland at or below 0.1? (c) List the questions you would ask before choosing the source population.
::: solution
(a) $\Delta F = 1/2N_e = 1/30 = 0.033$ per generation, very fast inbreeding.

(b) $1/(1 + 4N_em) \le 0.1$ requires $4N_em \ge 9$, so $N_em \ge 2.25$: at least two or three effective migrants per generation.

(c) Is the source population genetically diverse and not itself inbred? Is it the same species and karyotype, and how long ago were the populations connected (under 500 years is low risk)? Does it live in a similar environment (to avoid disrupting local adaptation)? Is it free of diseases and parasites not present on the island? Can it spare individuals without harm to itself? Is the translocation legal and acceptable to stakeholders?
:::
:::

::: exercise Mark–recapture by DNA {level=2 check="60*48/16"}
Faecal samples from a population of otters gave 60 distinct genotypes in one survey and 48 in a second, of which 16 matched genotypes from the first survey. Estimate the population size with the Lincoln–Petersen estimator. In which direction would undetected genotyping errors that create false new genotypes bias the estimate?
::: solution
$\hat N = 60\times48/16 = 180$ otters. False new genotypes reduce the number of apparent recaptures $m$ (a recaptured otter is mistaken for a new one), which **inflates** $\hat N$.
:::
:::

::: exercise Is genetic rescue worth the risk? {level=3}
A plant species persists in two isolated populations, A (40 plants, highly inbred, seed set 20 % of normal) and B (2000 plants, 300 km away, on a different soil type, isolated for an estimated 10 000 years since the last glaciation; chromosome number not known). Managers propose pollinating A with pollen from B. (a) Assess the risk of outbreeding depression using the criteria of Frankham and colleagues. (b) Design a staged approach that would detect outbreeding depression before committing the whole population. (c) Why might doing nothing be the riskiest option?
::: solution
(a) Two risk factors are present: isolation for much longer than 500 years and different environments (soils), and a third (chromosomal differences) is unknown. The risk of outbreeding depression is therefore not negligible.

(b) First determine the chromosome numbers of both populations. Then make experimental crosses (A × A, A × B, B × B) in a common garden or greenhouse, and grow them to the F2 and backcross generations, since outbreeding depression often appears only in the F2 when co-adapted gene complexes are broken up by recombination. Grow the offspring on soils from A's site. If the crosses outperform A × A through the F2, introduce pollen or plants from B into part of A and monitor; if not, consider other sources or crossing within A from seed banks.

(c) With 40 plants, very low seed set and severe inbreeding, population A is probably in an extinction vortex; its expected fitness is already very low, and it may disappear before a long experimental programme is complete. The risk of outbreeding depression must be weighed against the near-certain cost of continued inbreeding. The experimental crosses in (b) can be run in parallel with emergency measures such as seed banking.
:::
:::

::: exercise Founders of a captive population {level=3}
A captive population is founded with 8 unrelated, non-inbred individuals and kept at an effective size of 25. (a) The expected heterozygosity retained from a sample of $N_0$ founders is $1 - 1/(2N_0)$ of the source population's. What fraction is retained at founding? (b) How many generations can pass before the population falls below 90 % of the source population's heterozygosity? (c) The programme's goal is 90 % for 100 years, and the generation time is 5 years. Is it achievable, and if not, what would you change?
::: solution
(a) $1 - 1/16 = 0.9375$: 93.75 % of the source heterozygosity at founding.

(b) We need $0.9375(1 - 1/50)^t \ge 0.9$, that is $0.98^t \ge 0.96$, giving $t \le \ln0.96/\ln0.98 = 2.02$ generations — about two generations.

(c) 100 years is 20 generations, so the goal is far out of reach: after 20 generations, $0.9375\times0.98^{20} = 0.626$. To meet it would require more founders (to start near 100 %), a much larger effective size (with a starting value near 1, keeping 90 % for 20 generations needs $(1 - 1/2N_e)^{20} \ge 0.9$, that is $N_e \ge 96$), management that maximises $N_e$ (equalising family sizes, minimising mean kinship), longer generation times (delaying breeding), or periodic addition of new founders from the wild.
:::
:::
