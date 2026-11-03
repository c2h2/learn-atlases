Any two people's genomes are about 99.9 % identical when compared base by base. The remaining 0.1 % is still a great deal: a typical genome differs from the human reference at four to five million sites, and carries thousands of larger differences — deletions, duplications, insertions and inversions — which together affect more base pairs than the single-nucleotide differences do. This variation records the history of our species: its origin in Africa, the dispersal of some populations across the rest of the world, interbreeding with Neanderthals and Denisovans, population bottlenecks and recent explosive growth, and natural selection on a few traits. It is also the raw material for the genetic contribution to differences in health and appearance, which [[genomics/association-studies]] sets out to map.

This chapter describes the kinds of variation, how frequent they are and why, how variants are organised into haplotypes, and how genetic variation is structured geographically. Throughout, the population-genetic theory of [[population-genetics/genetic-drift]], [[population-genetics/mutation-migration]] and [[population-genetics/linkage-disequilibrium]] is applied to human data, and we will see why human genetic variation, which is overwhelmingly shared and continuously distributed, does not divide humanity into discrete races.

## Kinds of variation

::: definition Classes of genetic variant {#def-variants}
- A **single-nucleotide variant** (SNV) is a difference at one base. One present in at least 1 % of chromosomes in some population is conventionally called a **single-nucleotide polymorphism** (SNP); the distinction is one of frequency, not of kind.
- An **indel** is a small insertion or deletion, conventionally under 50 bp.
- A **short tandem repeat** (STR, microsatellite) variant changes the number of units of a repeat such as `(CA)n` ([[genomics/genome-architecture]]).
- A **structural variant** (SV) is a change of 50 bp or more: deletions, duplications and other **copy-number variants** (CNVs), insertions (including those of mobile elements such as Alu and L1), inversions and translocations.
- A **reference** allele is the one in the reference genome; the alternative is the **alternative** allele. The **ancestral** allele is the one inferred, usually by comparison with chimpanzee and other apes, to have been present before the mutation; the other is **derived**.
:::

The 1000 Genomes Project, which sequenced 2,504 people from 26 populations on five continents (2015), found that a typical genome differs from the reference at 4.1–5.0 million sites, of which over 99.9 % are SNVs and short indels, together with about 2,100–2,500 structural variants that affect about 20 Mb of sequence. Long-read sequencing has since shown that short reads missed most structural variants in repetitive regions: long-read studies find of the order of 25,000 structural variants per genome. Each genome also carries about 100 variants predicted to inactivate a protein-coding gene (loss-of-function variants), some 20 of them homozygous (Daniel MacArthur and colleagues, 2012) — a reminder that most genes tolerate the loss of one copy, and many the loss of both.

### How fast do new variants arise?

Sequencing parents and children directly measures the rate at which mutations appear.

::: example New mutations per generation {#ex-denovo}
Family studies estimate the human germline mutation rate at about $1.2\times10^{-8}$ per base pair per generation. (a) How many new single-nucleotide mutations does a child carry, on average? (b) Most of them come from the father, and the number rises by about 1.5 for each additional year of the father's age at conception, and by about 0.4 per year of the mother's age (Hákon Jónsson, Kári Stefánsson and colleagues, 2017). Explain why the paternal effect is larger. (c) If a population of $10^9$ children is born in a generation, how many times does each possible SNV arise in that generation?
::: solution
(a) A child inherits a diploid genome of about $6.2\times10^9$ bp, so it carries about $6.2\times10^9\times1.2\times10^{-8} \approx 74$ new mutations, close to the 60–80 observed in family studies, depending on parental ages.

(b) Sperm are produced by continual mitotic divisions of spermatogonial stem cells throughout adult life, so the number of genome replications behind a sperm increases with the father's age; oocytes complete their mitotic divisions before the mother's birth. Replication errors accumulate with divisions. (The maternal age effect, smaller, is thought to reflect damage accumulating in oocytes, not replication.)

(c) There are $3\times3.1\times10^9 \approx 9\times10^9$ possible single-base changes in a haploid genome, and $10^9$ children carry about $7.4\times10^{10}$ new mutations, so on average each possible SNV arises about $7.4\times10^{10}/(9\times10^9) \approx 8$ times per generation in the whole human population. Every non-lethal point mutation is being made, somewhere, in every generation; the rarity of a variant in a population reflects its history, not the difficulty of creating it.
:::
:::

## How variation is distributed

### Diversity and effective size

The average proportion of sites that differ between two randomly chosen copies of the genome, the **nucleotide diversity** $\pi$, is about $10^{-3}$ in humans: roughly one difference per thousand bases. This is low compared with many other species. Chimpanzees, whose census population is a tiny fraction of ours, are about one and a half to two times as diverse, and many insects and marine invertebrates more than ten times more.

Under the neutral model with mutation rate $\mu$ per site per generation, the expected nucleotide diversity is $\pi \approx 4N_e\mu$ ([[population-genetics/genetic-drift]]). Solving for $N_e$ with $\pi = 10^{-3}$ and $\mu = 1.2\times10^{-8}$ gives $N_e \approx 10^{-3}/(4\times1.2\times10^{-8}) \approx 21{,}000$ — a long-term average over hundreds of thousands of years, dominated by periods when human populations were small. Today's census size of eight billion is far too recent to have affected diversity much, except at the rarest frequencies.

### The allele frequency spectrum

Most variants are rare. In a sample of $n$ chromosomes, the **site frequency spectrum** counts how many variable sites have the derived allele on $1, 2, \ldots, n - 1$ chromosomes.

::: proposition Neutral site frequency spectrum and Watterson's estimator {#prop-sfs}
For neutral variants in a population of constant effective size $N_e$, with $\theta = 4N_e\mu$ per site, the expected number of sites (per site) at which the derived allele is carried by exactly $i$ of $n$ sampled chromosomes is

$$
\E[\xi_i] = \frac{\theta}{i},\qquad i = 1, \ldots, n-1,
$$ {#eq-sfs-human}

so the expected number of segregating sites per site is $\E[S] = \theta a_n$ with $a_n = \sum_{i=1}^{n-1} 1/i$. **Watterson's estimator** of $\theta$ is $\hat\theta_W = S/a_n$.
:::

The derivation from the coalescent is in [[population-genetics/neutral-theory]]. Under this model about 19 % of the segregating sites in a sample of 100 chromosomes are singletons ($1/a_{100} = 1/5.18$). Real human samples have many more rare variants than this: in the largest data sets, of hundreds of thousands of people, most variants are seen only once. The excess of rare variants is the signature of the explosive growth of human populations over the last few thousand years, which has added many young mutations that have not had time to drift to higher frequency (Jacob Tennessen, Joshua Akey and colleagues, 2012; Alon Keinan and Andrew Clark, 2012). It means that each person carries many variants that are rare or unique to their family, and that most rare variants in a population are recent.

::: example Estimating θ from a sample {#ex-watterson}
In a 1-Mb region sequenced in 50 people (100 chromosomes), 5,200 sites are variable. (a) Estimate $\theta$ per base pair by Watterson's method. (b) Under the neutral model, how many of these 5,200 sites are expected to be singletons? (c) The observed number of singletons is 1,800. What does this suggest?
::: solution
(a) $a_{100} = \sum_{i=1}^{99}1/i = 5.18$, so $\hat\theta_W = 5200/5.18 = 1{,}004$ per Mb, or $1.0\times10^{-3}$ per base pair.

(b) Singletons are expected at $\theta/1$ per site, which is a fraction $1/a_n = 0.193$ of all segregating sites: about 1,000.

(c) 1,800 singletons is a large excess, which Tajima's $D$ ([[population-genetics/neutral-theory]]) would register as strongly negative. Since the excess is genome-wide in human data, the explanation is demographic — recent population growth — rather than selection at this locus. A local excess, beyond the genome-wide pattern, would point to a recent selective sweep.
:::
:::

::: widget plot
f: 1/x; c/x^b
x: 1, 50
y: 0, 1
sliders: c=1:0.5:2:0.05; b=1.3:1:2:0.05
labels: \text{neutral, constant size: } \theta/i; \text{with recent growth (illustrative)}
caption: The expected site frequency spectrum (number of sites, relative to the singleton class of the neutral model) against the number $i$ of chromosomes carrying the derived allele, in a sample of 50 chromosomes. The neutral model for a constant population gives $\theta/i$ ([[#eq-sfs-human]]). The second curve is an illustrative shape, not a fitted model: recent population growth adds young, rare variants, raising the left end and steepening the decline. Set $c = 1$ and $b = 1$ to recover the neutral curve. Whatever the demography, most variable sites are rare in a sample, and most of a person's variants are common ones shared with many others, because the few common sites are carried by many people.
:::

## Haplotypes and imputation

Variants near each other on a chromosome are inherited together, so their alleles are associated in populations: they are in **linkage disequilibrium** ([[population-genetics/linkage-disequilibrium]]). The combination of alleles along one chromosome is a **haplotype**. Because human populations went through bottlenecks and are young relative to the rate at which recombination breaks up associations, the human genome is a patchwork of segments, typically tens of kilobases long in Africa and longer elsewhere, within which a few common haplotypes account for most chromosomes. Recombination is concentrated in hotspots set by the protein PRDM9 ([[population-genetics/linkage-disequilibrium]]).

The International HapMap Project (2005–2010) catalogued common SNPs and their LD in samples from Africa, Europe and East Asia, and found that a few hundred thousand well-chosen **tag SNPs** capture most common variation. That made genotyping arrays effective: an array measuring about a million SNPs, combined with a **reference panel** of fully sequenced haplotypes, lets the genotypes of millions of untyped variants be predicted. This **imputation** works because a person's chromosomes are mosaics of haplotypes present in the reference panel: once the array identifies which reference haplotypes a chromosome segment resembles, the alleles at untyped sites are read from them. Imputation accuracy, measured by the squared correlation $r^2$ between imputed and true genotype dosage, is high for common variants and declines for rare ones and for populations poorly represented in the reference panel.

::: example What imputation accuracy costs {#ex-imputation}
In an association study of 10,000 people, a variant is imputed with $r^2 = 0.8$. To what number of directly genotyped people is this equivalent? If it were imputed with $r^2 = 0.3$, as is typical for rare variants in a population poorly represented in the reference panel?
::: solution
The power to detect an association with an imputed variant is approximately that of a study with $n r^2$ perfectly genotyped individuals: $10{,}000\times0.8 = 8{,}000$ people at $r^2 = 0.8$, but only 3,000 at $r^2 = 0.3$. Imputation is nearly as good as sequencing for common variants in well-represented populations; for rare variants, and for underrepresented populations, sequencing or larger and more diverse reference panels are needed.
:::
:::

## Geographic structure

### How variation is apportioned

In 1972 Richard Lewontin used blood-group and protein polymorphisms to ask how genetic variation is divided among individuals of the same population, among populations of the same continent, and among continents. He found that about 85 % of the variation was among individuals within populations, about 8 % among populations within continental groups and about 6 % among continental groups. Genome-wide data give similar answers: the fixation index ([[population-genetics/mutation-migration]]) among continental groups, averaged over SNPs, is around 0.1–0.15.

::: definition The fixation index for two populations {#def-fst-human}
For a biallelic site with allele frequencies $p_1$ and $p_2$ in two equally weighted populations, with mean $\bar p = (p_1 + p_2)/2$, the expected heterozygosity within populations is $H_S = [2p_1(1 - p_1) + 2p_2(1 - p_2)]/2$ and in the combined population $H_T = 2\bar p(1 - \bar p)$. The fixation index is

$$
F_{ST} = \frac{H_T - H_S}{H_T} = \frac{(p_1 - p_2)^2}{4\bar p(1 - \bar p)}.
$$ {#eq-fst-human}
:::

The last form follows by expanding: $H_T - H_S = p_1^2 + p_2^2 - 2\bar p^2 = (p_1 - p_2)^2/2$. Note the factor $(p_1 - p_2)^2$: even substantial differences in frequency give modest values of $F_{ST}$, and the measure is zero only when frequencies are identical.

::: example Computing F_ST {#ex-fst}
Calculate $F_{ST}$ for a site with allele frequencies (a) 0.2 and 0.6; (b) 0.45 and 0.55; (c) 0.05 and 0.95 in two populations.
::: solution
(a) $\bar p = 0.4$: $F_{ST} = 0.16/(4\times0.4\times0.6) = 0.16/0.96 = 0.167$.

(b) $\bar p = 0.5$: $F_{ST} = 0.01/1 = 0.010$.

(c) $\bar p = 0.5$: $F_{ST} = 0.81/1 = 0.81$.

Most human SNPs look like (a) or (b) between any two populations: the same alleles are present, at different frequencies. Sites like (c), with near-fixed differences, are very rare among human populations; the best-known examples, such as variants affecting skin pigmentation (*SLC24A5*) and lactase persistence, owe their large differences to natural selection.
:::
:::

::: widget plot
f: (p - x)^2/(4*((p + x)/2)*(1 - (p + x)/2))
x: 0, 1
y: 0, 1
sliders: p=0.3:0.01:0.99:0.01
labels: F_{ST}
caption: The fixation index [[#eq-fst-human]] between two equally weighted populations, for a fixed frequency $p$ (slider) in population 1 and a frequency $x$ (horizontal axis) in population 2. $F_{ST}$ is zero when $x = p$ and rises slowly at first: with $p = 0.3$, the second population must reach 0.55 before $F_{ST}$ exceeds 0.06, the typical value between human populations on the same continent. Large values need nearly fixed differences, which are rare in human data.
:::

### Clines and the serial founder effect

Genetic diversity is not equal everywhere. Heterozygosity is highest in sub-Saharan African populations and declines steadily with geographic distance from East Africa, measured along plausible routes of migration overland; the pattern is close to linear (Sohini Ramachandran, Marcus Feldman and colleagues, 2005; also Franz Manica and colleagues, 2007). This is predicted by a **serial founder effect**: as modern humans dispersed out of Africa, beginning perhaps 50,000–70,000 years ago, each new region was settled by a subset of the population of the previous one, losing some of its diversity by drift at each step. Within Africa itself, populations hold the deepest divergences of all, and some African populations are more different from each other than either is from populations outside Africa.

::: widget regression
points: 0,0.77; 4,0.73; 7,0.71; 10,0.69; 15,0.66; 20,0.63; 25,0.60
degree: 1
x: 0, 26
y: 0.55, 0.8
caption: An illustrative plot of expected heterozygosity of populations against their distance (in thousands of kilometres) from East Africa along overland routes, with the least-squares line, modelled on the pattern reported by Ramachandran and colleagues (2005) for microsatellite markers; the values are invented to resemble it, not the published data. The fit is close to linear, as a serial founder effect predicts. Drag the points to see how sensitive the slope is to the most distant populations (in the Americas, whose ancestors passed through north-east Asia).
:::

Most human genetic variation therefore changes gradually over geography — in **clines** — rather than abruptly at boundaries. Principal component analysis of genotypes of Europeans gives a map that closely resembles the map of Europe (John Novembre and colleagues, 2008), because people who live closer together share more recent ancestors. Model-based clustering programs such as STRUCTURE (Jonathan Pritchard, Matthew Stephens and Peter Donnelly, 2000) and ADMIXTURE describe each genome as a mixture of a chosen number $K$ of ancestral components.

::: warning Genetic clusters are not races
With enough markers, clustering algorithms can assign individuals to groups that correspond broadly to continents of origin, and this is sometimes taken to vindicate racial categories. It does not. The number of clusters $K$ is chosen by the analyst, and the results depend heavily on which populations were sampled: evenly sampled clinal variation produces clusters at whatever points are left unsampled. Clusters at any $K$ conceal the gradients within them, the deep diversity within Africa, and the many individuals and populations of mixed ancestry. Socially defined racial categories are poor proxies for genetic ancestry, which is continuous, multidimensional and individual. And knowing someone's ancestry tells us little about any particular trait they have: most variation lies within populations, and most variants are shared among all of them. In genetics, ancestry is described with explicit geographic and population labels and continuous measures, and race is treated as a social category.
:::

### Admixture, ancient and recent

Patterns of LD and of shared haplotypes reveal mixing between populations ([[population-genetics/linkage-disequilibrium]]). Most present-day populations are the products of repeated mixing. Further back, the genomes of archaic humans recovered from fossils — the Neanderthal genome from bones from Vindija Cave, Croatia (Richard Green, Svante Pääbo and colleagues, 2010), and the Denisovan genome from a finger bone from Denisova Cave in the Altai mountains of Siberia (David Reich, Pääbo and colleagues, 2010) — showed that modern humans interbred with both. Present-day people with ancestry from outside Africa carry about 2 % Neanderthal ancestry, and people from Papua New Guinea and Australia additionally several per cent Denisovan ancestry. Later work found smaller amounts of Neanderthal-derived DNA in African populations too, introduced by back-migration of people who carried it. Some archaic segments were favoured by selection: a Denisovan-derived haplotype of *EPAS1*, a gene in the response to low oxygen, is common in Tibetans and contributes to adaptation to high altitude (Emilia Huerta-Sánchez, Rasmus Nielsen and colleagues, 2014).

::: quiz
Two people are sampled from the same village in one country, and a third from a village on another continent. Which statement about their genomes is most likely to be true?
- [ ] The first two share all their variants, and the third differs at every one.
- [x] All three share most of their common variants; the first two share somewhat more, especially rare variants and long identical haplotypes, because of their more recent common ancestors.
- [ ] The third person has a different set of genes.
- [ ] The first two must be more similar to each other at every individual site.
::: solution
Most common variants are found worldwide, at different frequencies, so all three share most of them. People from the same place share more recent ancestors, which shows up most clearly in rare variants and in long segments inherited identically by descent. But at any single site, two people from the same village can differ while two people from different continents agree: population labels predict genotypes only statistically. Everyone has the same set of genes.
:::
:::

## Structural variation

Copy-number variants are common and can have large effects. The salivary amylase gene *AMY1* varies in diploid copy number from about 2 to over 15, and populations with high-starch diets have on average more copies (George Perry, Nathaniel Dominy, Anne Stone and colleagues, 2007). Deletions of the region containing *RHD* determine the RhD-negative blood group. Inversions of hundreds of kilobases to megabases, such as one of about 900 kb at 17q21.31, are polymorphic, suppress recombination over their length and so are inherited as long haplotypes. Recurrent CNVs arise by non-allelic homologous recombination between segmental duplications ([[genomics/genome-architecture]]), so the same deletion or duplication occurs independently in many people. Because the reference genome is a single haplotype, variants that insert sequence absent from it were systematically missed by short-read studies; the human pangenome reference (2023) represents many of them directly ([[genomics/sequencing-genomes]]).

## Interpreting variants

Which of the millions of variants in a genome matter? Several kinds of evidence are combined.

- **Predicted consequence.** A variant in a coding sequence can be synonymous, missense (changing an amino acid), nonsense (creating a stop codon), frameshifting, or disrupt a splice site; outside genes it may alter a regulatory element.
- **Population frequency.** Very large aggregations of sequence data — the Genome Aggregation Database (gnomAD; version 4, released in 2023, combines exome and genome data from about 800,000 people) — show which variants are common, and so unlikely to cause severe early-onset disease, and which genes have fewer loss-of-function variants than expected from the mutation rate.
- **Constraint.** Genes in which loss-of-function variants are strongly depleted — observed far below the number expected from mutation — are intolerant of losing one copy, because heterozygous carriers suffer reduced fitness. Such constraint scores are an estimate of the strength of selection against heterozygous loss of function, and have proved useful for prioritising genes.
- **Conservation** across species ([[genomics/comparative-genomics]]) and **experimental measurement** — saturation mutagenesis that tests every possible variant of a gene in cells for function — complete the picture.

Clinical interpretation of variants for individuals follows formal guidelines and belongs to [Medicine Atlas](/learn/medicine/).

::: application Representation, consent and privacy
As of 2019, about four-fifths of participants in genome-wide association studies had European ancestry (Giorgio Sirugo, Scott Williams and Sarah Tishkoff, 2019), although the greatest genetic diversity is in Africa. Because variant frequencies, LD and reference panels differ among populations, findings and tools transfer poorly to underrepresented groups, and large studies in Africa, Asia and the Americas are working to correct this. Human genetic data also raise questions of consent, data sharing and privacy: Melissa Gymrek, Yaniv Erlich and colleagues (2013) showed that the surnames of some research participants could be inferred from Y-chromosome STRs and public genealogy databases, and in 2018 genetic genealogy databases were used to identify suspects in criminal investigations through distant relatives. The communities whose genomes are studied increasingly take part in governing how the data are used — a matter of ethics as well as of science.
:::

::: history
Human genetic variation was first studied through blood groups (Karl Landsteiner, 1900) and protein electrophoresis (Harry Harris's survey of enzyme polymorphism, 1966), then through mitochondrial DNA: Rebecca Cann, Mark Stoneking and Allan Wilson's 1987 tree of human mtDNA, rooted in Africa, was the first genetic evidence for a recent African origin of modern humans. The Human Genome Diversity Project, proposed in 1991 and controversial for its approach to the communities sampled, led to the HGDP–CEPH cell line panel of 51 populations. The HapMap Project (2005) catalogued common variation, and the 1000 Genomes Project (2010–2015) sequenced it. The Neanderthal and Denisovan genomes of 2010 revealed archaic admixture, and Svante Pääbo was awarded the Nobel Prize in Physiology or Medicine in 2022 for founding palaeogenomics.
:::

::: summary
- Human variants include SNVs and short indels, STRs and structural variants ([[#def-variants]]); a genome differs from the reference at 4–5 million sites and carries thousands of SVs, about 100 loss-of-function variants and 60–80 new mutations.
- Nucleotide diversity is about 0.1 %, implying a long-term $N_e$ of the order of 20,000; most variants are rare, more so than the neutral constant-size spectrum predicts ([[#prop-sfs]]), because of recent population growth.
- Variants are organised into haplotypes in LD, which makes tag SNPs and imputation possible; imputation accuracy depends on frequency and on the reference panel.
- Most human genetic variation (about 85 %) is within populations; $F_{ST}$ among continental groups is about 0.1–0.15 ([[#def-fst-human]]). Diversity declines with distance from Africa, as a serial founder effect predicts, and variation is mostly clinal.
- Genetic clusters are artefacts of sampling and modelling choices and do not define races. Modern humans interbred with Neanderthals and Denisovans, and some archaic variants were adaptive.
- Interpreting variants combines predicted consequence, population frequency, constraint, conservation and experiment; human genetic data raise questions of representation, consent and privacy.
:::

## Exercises

::: exercise De novo mutations {level=1 check="62"}
If the germline mutation rate is $1.0\times10^{-8}$ per base pair per generation, how many new single-nucleotide mutations does a child carry in a diploid genome of $6.2\times10^9$ bp?
::: solution
$6.2\times10^9\times1.0\times10^{-8} = 62$.
:::
:::

::: exercise F_ST at one site {level=1 check="0.25"}
A SNP has allele frequencies 0.25 and 0.75 in two populations of equal size. What is $F_{ST}$?
::: solution
$\bar p = 0.5$, so $F_{ST} = (0.5)^2/(4\times0.25) = 0.25/1 = 0.25$.
:::
:::

::: exercise Watterson's estimator {level=1 check="0.0008"}
In a 500-kb region sequenced in 20 chromosomes, there are 1,410 segregating sites. Using $a_{20} = 3.55$, estimate $\theta$ per base pair (one significant figure).
::: solution
$\hat\theta_W = 1410/3.55/(5\times10^5) = 397/(5\times10^5) = 7.9\times10^{-4}$, about $8\times10^{-4}$.
:::
:::

::: exercise Effective size from diversity {level=2}
The nucleotide diversity of a chimpanzee population is $1.8\times10^{-3}$, and its mutation rate is assumed equal to that of humans, $1.2\times10^{-8}$ per site per generation. Estimate $N_e$ and compare it with humans. Why can a species of fewer than half a million individuals have a larger effective size than one of eight billion?
::: solution
$N_e = \pi/4\mu = 1.8\times10^{-3}/(4.8\times10^{-8}) = 37{,}500$, nearly twice the human value of about 21,000. Diversity reflects the long-term (harmonic mean) effective size over hundreds of thousands of years, not today's census size. Human populations were small for most of that time and passed through bottlenecks during dispersal; their enormous growth is only a few thousand years old — too recent to change $\pi$ much, which is dominated by old, common variants. (The two species' mutation rates and generation times also differ somewhat, which affects the comparison.)
:::
:::

::: exercise The rare-variant excess {level=2}
In a sample of 1,000 chromosomes, the neutral constant-size model predicts that about 38 % of segregating sites have a derived allele count below 10 (frequency below 1 %). Suppose that in a real human sample of this size, 60 % do (a value of the kind observed; the exact figure depends on the population). (a) Explain the discrepancy. (b) Why does it matter for association studies of rare variants? (c) Why does the excess not much affect $\pi$?
::: solution
(a) Rapid population growth over the last few thousand years has produced many new mutations in a huge population; they are young and so still rare. The neutral constant-size model, in which rare variants are balanced by drift, underestimates them.

(b) Most variants in a population are rare, often specific to a family or a region, so each is carried by few people; to detect their effects, studies must sequence (not impute) very large samples and aggregate rare variants within a gene to gain power.

(c) $\pi$ is the average number of pairwise differences, to which a variant at frequency $p$ contributes in proportion to $2p(1 - p)$; rare variants, however numerous, contribute little. $\pi$ is dominated by common, old variation, which reflects the long-term population size.
:::
:::

::: exercise Interpreting a PCA {level=2}
A principal component analysis of genotypes from 3,000 people sampled across one country shows a continuous gradient from north to south along the first principal component and a separate small cluster corresponding to a community that settled from abroad two centuries ago. (a) What does the gradient suggest about the population's history? (b) Why does the small cluster appear separate, and would it remain so in later generations? (c) Why should neither be described in terms of races?
::: solution
(a) Isolation by distance: people tend to have children with partners living nearby, so allele frequencies change gradually across space, and the principal component recovers geography.

(b) Two centuries of partly endogamous marriage after founding from a distinct source population keep its members genetically more similar to each other and to the source than to the surrounding population, so they form a cluster; with intermarriage, later generations would increasingly fall between the cluster and the main gradient. The separation also depends on sample size: a group sampled heavily stands out more.

(c) The gradient is continuous and the cluster reflects a specific, recent history of migration and marriage; neither is a fixed biological category. Describing them in terms of geography and documented ancestry is accurate; racial labels are not, and they imply discreteness and hierarchy that the data do not show.
:::
:::

::: exercise A selected allele {level=3}
A derived allele of a pigmentation gene has frequency 0.98 in one population and 0.02 in another, while the genome-wide average $F_{ST}$ between them is 0.12. (a) Compute $F_{ST}$ at this site. (b) Why is a value this extreme evidence of natural selection rather than drift? (c) What other genomic evidence would strengthen the case?
::: solution
(a) $\bar p = 0.5$: $F_{ST} = 0.96^2/1 = 0.92$.

(b) Drift acts on all loci alike, so the distribution of $F_{ST}$ across neutral SNPs — centred near 0.12 — describes what drift can do. A value of 0.92 lies in the far tail of that distribution. Local adaptation, which changes frequencies at the selected locus only, explains such outliers; but the tail must be calibrated with neutral demographic models, since a few extreme values are expected among millions of sites.

(c) A long, high-frequency haplotype around the derived allele in the population where it is common (extended haplotype homozygosity, [[population-genetics/linkage-disequilibrium]]); reduced diversity and an excess of high-frequency derived variants nearby; ancient DNA showing the allele rising in frequency over time; and functional evidence that the allele changes pigmentation in cells or in people.
:::
:::

::: exercise Archaic segments {level=3}
Neanderthal-derived segments in present-day non-African genomes are depleted near genes that are highly expressed in the testes and on the X chromosome, and are on average about 50 kb long. (a) Interbreeding is estimated to have occurred about 50,000 years ago. Using a generation time of 29 years and a recombination rate of about 1 cM per Mb, estimate the expected length of an archaic segment. (b) What could explain the depletion near some genes? (c) Why are long segments, rather than single shared alleles, needed to identify archaic ancestry?
::: solution
(a) $t = 50{,}000/29 \approx 1{,}700$ generations. Segment lengths after $t$ generations of recombination are roughly exponential with mean $1/t$ Morgans $= 100/1700$ cM $\approx 0.06$ cM, or about 60 kb at 1 cM per Mb — consistent with the observed average.

(b) Selection against archaic alleles in the hybrid genetic background: if Neanderthal variants in some genes reduced fertility in hybrids (as genes expressed in testes and on the X chromosome often do in hybrids between species), they would have been removed, together with linked DNA, after admixture. A smaller effective population size in Neanderthals, allowing them to accumulate slightly deleterious variants, would also cause selection against archaic DNA in a larger modern-human population.

(c) A single allele shared with a Neanderthal may simply be old variation present in the common ancestral population, retained by chance in some modern humans (incomplete lineage sorting). A long segment of many alleles that matches a Neanderthal haplotype, and is too long to have survived recombination since the populations split more than 500,000 years ago, must have entered recently — by admixture.
:::
:::
