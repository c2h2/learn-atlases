Mendel's factors were abstractions: things that came in pairs, separated at gamete formation and assorted independently. He had no idea where in the cell they were, and could not have had, because the behaviour of chromosomes in cell division was worked out only in the 1870s and 1880s. When Mendel's paper was rediscovered in 1900, cytologists already knew that every species has a characteristic number of chromosomes, that chromosomes come in pairs in body cells, and that a special division halves the number in the gametes. Within three years two of them, Walter Sutton and Theodor Boveri, had pointed out that chromosomes behave in meiosis exactly as Mendel's factors must. The **chromosome theory of inheritance** — genes are carried on chromosomes — was proved a decade later by the work on sex linkage described in [[genetics/sex-linkage-pedigrees]].

This chapter describes chromosomes as geneticists see them, follows them through meiosis and shows how meiosis produces both of Mendel's laws, and then turns to the most conspicuous chromosomal difference within a species: the chromosomes that determine sex. Mitosis and the cell cycle are described in [[cell-biology/cell-cycle]]; we take them as known and concentrate on what is different about meiosis.

## Chromosomes and ploidy

A **chromosome** is a single, very long DNA molecule together with the proteins (chiefly histones) that package it. During most of the cell cycle chromosomes are extended and cannot be seen individually; in mitosis and meiosis they condense into compact structures visible in the light microscope. After DNA replication each chromosome consists of two identical **sister chromatids** joined along their length by cohesin and attached at the **centromere**, the region where the kinetochore assembles. The ends of linear chromosomes are capped by **telomeres**.

::: definition Ploidy and homologous chromosomes {#def-ploidy}
A cell with one complete set of chromosomes is **haploid**; the number of chromosomes in the set is written $n$. A cell with two sets is **diploid** ($2n$), with three **triploid** ($3n$), and so on. In a diploid, the two members of each pair — one inherited from each parent — are **homologous chromosomes** (homologues): they carry the same loci in the same order, though not necessarily the same alleles. Chromosomes other than the sex chromosomes are **autosomes**. The **karyotype** is the complete chromosome complement of a cell, displayed as condensed chromosomes arranged in pairs by size and centromere position.
:::

Centromere position gives chromosomes characteristic shapes: **metacentric** (centromere near the middle, two arms of similar length), **submetacentric**, **acrocentric** (centromere near one end) and **telocentric** (at the end; not found in normal human chromosomes, but all mouse chromosomes are acrocentric to telocentric). The arms of human chromosomes are named *p* (short) and *q* (long), and staining with Giemsa after mild trypsin treatment (**G-banding**) gives each chromosome a reproducible pattern of light and dark bands that allows the bands to be numbered from the centromere outwards — 7q31, for example, is band 1 of region 3 on the long arm of chromosome 7.

Chromosome number varies widely and bears no simple relation to the complexity of an organism.

| Organism | $2n$ |
|---|---|
| Jack jumper ant *Myrmecia pilosula* | 2 (females; males are haploid with 1) |
| Fruit fly *Drosophila melanogaster* | 8 |
| Thale cress *Arabidopsis thaliana* | 10 |
| Nematode *Caenorhabditis elegans* | 12 (hermaphrodites; males have 11) |
| Garden pea *Pisum sativum* | 14 |
| Maize *Zea mays* | 20 |
| Baker's yeast *Saccharomyces cerevisiae* | 32 (diploid; haploid cells have 16) |
| House mouse *Mus musculus* | 40 |
| Human *Homo sapiens* | 46 |
| Dog *Canis familiaris* | 78 |

Two quantities change through the cell cycle and must be kept apart: the number of chromosomes (counted as centromeres) and the amount of DNA. The DNA content of an unreplicated haploid set is called **1C**; a diploid cell in G1 has $2C$, rising to $4C$ after S phase, while its chromosome number stays at $2n$ until anaphase.

## Meiosis

Sexual reproduction would double the chromosome number in every generation if gametes had as many chromosomes as body cells. **Meiosis** prevents this: one round of DNA replication is followed by two rounds of chromosome segregation, producing four haploid nuclei from one diploid nucleus.

::: definition Meiosis {#def-meiosis}
**Meiosis** is the pair of nuclear divisions by which a diploid cell gives rise to haploid products. In **meiosis I** (the **reductional division**) homologous chromosomes pair, exchange segments by crossing over, and then separate to opposite poles, while sister chromatids stay together. In **meiosis II** (the **equational division**) the sister chromatids separate, as in mitosis. Starting from one cell of DNA content $4C$ and $2n$ replicated chromosomes, meiosis produces four nuclei, each of content $1C$ with $n$ unreplicated chromosomes.
:::

The stages are named as in mitosis, but prophase I is long and elaborate — it can last days in yeast or plants, and in human females it begins in the foetal ovary and is arrested for years or decades before meiosis resumes at ovulation.

1. **Prophase I.** Chromosomes condense (**leptotene**). Homologues find each other and become aligned along their length (**synapsis**) by a protein scaffold, the **synaptonemal complex** (**zygotene**). Each synapsed pair, comprising four chromatids, is a **bivalent** (or tetrad). In **pachytene**, with synapsis complete, **crossing over** takes place: programmed double-strand breaks in DNA are repaired using a non-sister chromatid of the homologue as template, and some of these repair events exchange the flanking segments. In **diplotene** the synaptonemal complex disassembles and the homologues pull apart except where crossovers have occurred; these points of contact are visible as **chiasmata** (singular chiasma). In **diakinesis** the chromosomes condense further and the nuclear envelope breaks down.
2. **Metaphase I.** Bivalents line up on the spindle. The two sister kinetochores of each homologue attach to the *same* pole (**mono-orientation**), and the two homologues to opposite poles. The chiasmata, with cohesin along the arms distal to them, hold the homologues together against the pull of the spindle.
3. **Anaphase I.** Cohesin along the chromosome arms is cleaved, resolving the chiasmata, and the homologues move to opposite poles. Cohesin at the centromeres is protected (by the protein shugoshin and its associated phosphatase), so the sister chromatids stay together.
4. **Telophase I and cytokinesis** give two cells, each with $n$ replicated chromosomes ($2C$). There is no DNA replication before the next division.
5. **Meiosis II.** In each cell, sister kinetochores attach to opposite poles; centromeric cohesin is cleaved at anaphase II, and the sisters separate. The four products each contain $n$ chromosomes ($1C$).

::: warning "Crossing over happens between two chromosomes, after meiosis has begun"
Two details are often misremembered. First, crossing over occurs *after* DNA replication, at the four-chromatid stage, and each crossover involves only two of the four chromatids — one from each homologue. This is why a single crossover between two loci produces two recombinant and two non-recombinant chromatids, and why recombination frequencies never exceed 50 % ([[genetics/linkage-mapping]]). Second, the separation of homologues happens in anaphase I, not anaphase II; the second division separates sister chromatids, which differ only where crossing over has occurred.
:::

Crossing over is not only a source of variation. In most organisms at least one crossover per bivalent (the **obligate crossover**) is needed for accurate segregation, because the chiasma is what holds homologues together and lets them bi-orient on the spindle. Bivalents without a crossover are at increased risk of segregating incorrectly. *Drosophila* males, which have no meiotic crossing over at all, use a special pairing mechanism instead.

| | Mitosis | Meiosis |
|---|---|---|
| Rounds of division | 1 | 2 |
| Pairing of homologues | no | yes (prophase I) |
| Crossing over | rare | regular (at least one per bivalent, typically) |
| Sister kinetochores in first division | bi-oriented | mono-oriented |
| Products | 2 cells, $2n$, genetically identical | 4 cells, $n$, genetically different |
| Role | growth, repair, asexual reproduction | gamete or spore formation |

In animals the products of meiosis are gametes, but meiosis is unequal in females: in oogenesis the divisions are asymmetric, giving one large egg and small **polar bodies** that degenerate, whereas in spermatogenesis all four products become sperm. In plants and fungi the products of meiosis are spores, which grow into haploid organisms (the gametophytes of plants, the haploid cells or mycelia of fungi) that later produce gametes by mitosis.

::: example Counting chromosomes and DNA through meiosis {#ex-counting}
*Drosophila melanogaster* has $2n = 8$ and a haploid genome of about $1.8\times10^8$ base pairs (bp). For a cell entering meiosis from G1, give the chromosome number, the number of chromatids and the DNA content in bp (i) in G1, (ii) at metaphase I, (iii) in each cell at the end of meiosis I, and (iv) in each product of meiosis.
::: solution
Count chromosomes by centromeres.

| Stage | Chromosomes | Chromatids | DNA |
|---|---|---|---|
| G1 | 8 | 8 | $2C = 3.6\times10^8$ bp |
| Metaphase I | 8 (as 4 bivalents) | 16 | $4C = 7.2\times10^8$ bp |
| End of meiosis I (each cell) | 4 | 8 | $2C = 3.6\times10^8$ bp |
| Each product of meiosis II | 4 | 4 | $1C = 1.8\times10^8$ bp |

The chromosome number halves at meiosis I; the DNA content halves at each division. A cell at the end of meiosis I has a haploid number of chromosomes but a diploid amount of DNA.
:::
:::

## Meiosis explains Mendel

Sutton and Boveri's insight was that two features of meiosis correspond exactly to Mendel's two laws.

::: proposition Meiotic basis of Mendel's laws {#prop-meiotic-basis}
1. **Segregation.** The two alleles of a heterozygote *Aa* lie at the same locus on the two homologues of a pair. Because homologues separate at anaphase I, and the chromatids of each at anaphase II, each product of meiosis receives exactly one allele, and half the products receive *A*.
2. **Independent assortment.** For loci on different (non-homologous) chromosomes, the orientation of each bivalent on the metaphase I spindle — which homologue faces which pole — is random and independent of the orientation of other bivalents. A double heterozygote with *A* and *B* on different chromosomes therefore produces *AB*, *Ab*, *aB*, *ab* in equal proportions.
3. **Number of chromosome combinations.** An organism with $n$ pairs of homologues can produce $2^n$ different combinations of maternal and paternal homologues in its gametes, each with probability $(\tfrac12)^n$, before crossing over is taken into account.
:::

::: proof
(1) Every product of meiosis receives one chromatid of each pair of homologues. With *A* on one homologue and *a* on the other, two of the four chromatids at metaphase I carry *A* and two carry *a* (crossing over exchanges segments between chromatids but does not change how many copies of each allele there are), so each product receives *A* with probability $\tfrac12$. Correct segregation is ensured because the two products of each anaphase receive one partner each.

(2) If the bivalent carrying the A locus orients with the *A* homologue towards a given pole with probability $\tfrac12$, and the bivalent carrying B orients independently, the four combinations of homologues reaching that pole are equally likely, each $\tfrac12\cdot\tfrac12 = \tfrac14$.

(3) With $n$ bivalents oriented independently, each with two possible orientations, there are $2^n$ equally likely combinations at each pole.
:::

Part (2) explains why independent assortment holds for loci on *different* chromosomes; loci on the same chromosome travel together unless separated by crossing over, which is the subject of [[genetics/linkage-mapping]]. The proposition also assumes regular meiosis. Rare **meiotic drive** systems violate equal segregation: the *t*-haplotypes of the house mouse, for example, are transmitted by heterozygous males to well over 90 % of their offspring.

Direct cytological evidence came from Eleanor Carothers in 1913. In certain grasshoppers one pair of homologues is visibly **heteromorphic** — the two members differ in shape — and males have an unpaired X chromosome. Carothers counted how the heteromorphic pair segregated relative to the X in meiosis I and found the two orientations equally often: independent assortment of chromosomes, seen in the microscope.

::: example How many different gametes? {#ex-gamete-number}
(a) How many combinations of maternal and paternal chromosomes can a human ($n = 23$) produce in a gamete, ignoring crossing over? (b) What is the probability that a gamete contains only chromosomes inherited from the person's father? (c) How many genetically different zygotes could one couple produce on this count?
::: solution
(a) $2^{23} = 8\,388\,608$, about $8.4\times10^6$.

(b) $(\tfrac12)^{23} = 1.19\times10^{-7}$ (strictly the X and Y in a male segregate as a pair as well, so the count applies to both sexes).

(c) Each parent can produce $2^{23}$ combinations, so $2^{23}\times2^{23} = 2^{46} \approx 7.0\times10^{13}$ combinations of the two gamete types. Crossing over increases the real number enormously: there are about 50 crossovers in a human meiosis on average (more in female than in male meiosis), each of which can occur at many positions. Apart from identical twins, no two people have ever had the same genome.
:::
:::

::: widget distribution
dist: binomial
params: n=23, p=0.5
a: 9
b: 14
caption: The number of chromosomes inherited from one particular grandparent in a human gamete, ignoring crossing over: binomial with $n = 23$ and $p = 1/2$. The shaded bars, 9 to 14 chromosomes, cover about 79 % of gametes; mean 11.5, standard deviation 2.4. In reality crossing over splits most chromosomes between the two grandparents, so the grandparental share of a gamete's DNA varies much less than this figure suggests.
:::

### Seeing segregation in tetrads

In many fungi the four products of a single meiosis stay together in a sac, the **ascus**, and can be recovered and grown separately. This **tetrad analysis** gives a direct view of segregation. In the budding yeast *Saccharomyces cerevisiae*, a diploid heterozygous for a mutation produces asci in which two spores carry each allele — **2 : 2 segregation** — in essentially every tetrad, not merely on average. In the bread mould *Neurospora crassa*, studied by Carl Lindegren in the 1930s and later by Beadle and Tatum ([[genetics/genes-and-mutation]]), the products are arranged in a line in the order in which they were produced, so it is even possible to tell whether two alleles separated at the first or the second meiotic division — evidence used for mapping centromeres.

::: example Why tetrads prove segregation {#ex-tetrads}
A yeast diploid heterozygous *Aa* is induced to sporulate, and 100 asci are dissected. (a) If the four spores of an ascus were simply four independent draws from a large pool of *A* and *a* spores in equal numbers, what fraction of asci would show exactly two *A* and two *a* spores? (b) In fact about 100 of the 100 asci show $2:2$. What does this say about meiosis?
::: solution
(a) The number of *A* spores in an ascus would be binomial with $n = 4$, $p = \tfrac12$: $P(2) = \binom42(\tfrac12)^4 = \tfrac6{16} = 0.375$. The remaining asci would show $3:1$ or $1:3$ (together $\tfrac8{16}$) or $4:0$ or $0:4$ ($\tfrac2{16}$).

(b) Segregation is not merely a population-level frequency of $\tfrac12$; it is exact within each meiosis. One replicated homologue carries two copies of *A* and the other two of *a*; the two divisions distribute these four chromatids one to each product. Rare $3:1$ asci do occur, and are the signature of **gene conversion**, a non-reciprocal transfer of sequence during the repair of a double-strand break, discussed in [[molecular-biology]].
:::
:::

::: quiz
A diploid cell with $2n = 6$ undergoes meiosis. Which statement is true of each cell immediately after meiosis I?
- [ ] It has six chromosomes, each with one chromatid.
- [x] It has three chromosomes, each with two chromatids.
- [ ] It has three chromosomes, each with one chromatid.
- [ ] It has six chromosomes, each with two chromatids.
::: solution
Meiosis I separates homologues, so each daughter cell gets one member of each of the three pairs, still as two sister chromatids. The chromatids separate in meiosis II, giving four products with three single-chromatid chromosomes each.
:::
:::

## Sex chromosomes and sex determination

In 1905 Nettie Stevens, working on the mealworm beetle *Tenebrio molitor*, and Edmund Wilson, working on true bugs (Hemiptera), independently found that males and females can differ in their chromosomes. In *Tenebrio* the females have 20 large chromosomes, while males have 19 large chromosomes and one small one; half the sperm carry the small chromosome (now called Y) and half carry a large X. Sex was thus determined at fertilisation by the sperm — the first clear connection between a particular chromosome and a particular trait.

::: definition Sex-determination systems {#def-sex-systems}
- **XX/XY**: females have two X chromosomes and are the **homogametic** sex (all eggs carry X); males have X and Y and are **heterogametic**. Mammals, *Drosophila*, many plants (such as white campion, *Silene latifolia*).
- **XX/XO**: females XX, males have a single X and no Y. Many grasshoppers, and *C. elegans* (XX hermaphrodites, XO males).
- **ZZ/ZW**: the female is heterogametic (ZW) and the male homogametic (ZZ). Birds, butterflies and moths, many snakes.
- **Haplodiploidy**: males develop from unfertilised eggs and are haploid; females from fertilised eggs and are diploid. Ants, bees and wasps (Hymenoptera), and some mites and beetles.
- **Environmental sex determination**: sex is set by the environment during development, for example the incubation temperature of eggs in many turtles and all crocodilians.
:::

::: proposition The 1 : 1 sex ratio {#prop-sex-ratio}
In an XX/XY (or ZZ/ZW) system with regular segregation, equal fertilising ability of X- and Y-bearing sperm and equal survival of the sexes, offspring are male and female with probability $\tfrac12$ each, independently from one conception to the next.
:::

::: proof
The cross is XX × XY. The female produces only X eggs; the male produces X and Y sperm in equal proportions by segregation of the X–Y pair, which behaves as a pair of homologues in meiosis. Random union gives XX and XY with probability $\tfrac12$ each, exactly as for *aa* × *Aa*.
:::

The real sex ratio at birth departs slightly from $1:1$ — in humans about 105 boys to 100 girls — because the assumptions are not exactly met in development. Population-level forces that keep sex ratios near $1:1$ (Fisher's principle) are discussed in [[evolution]].

### How the X and Y determine sex

That a chromosome difference correlates with sex does not tell us *how* it determines sex, and the answer differs between groups.

In **mammals**, maleness is determined by the presence of a Y chromosome, whatever the number of X chromosomes: people with the chromosome constitution XXY develop as males and those with a single X and no Y (XO) as females ([[genetics/chromosome-mutations]]). The key gene on the Y is *SRY* (sex-determining region Y), identified by Andrew Sinclair, Peter Goodfellow, Robin Lovell-Badge and colleagues in 1990. In 1991 John Koopman and colleagues showed that XX mice carrying a transgene of the mouse *Sry* gene develop as males. *SRY* encodes a transcription factor that, acting in the supporting cells of the embryonic gonad, switches on the related gene *SOX9* and directs the gonad to develop as a testis; the testis then produces hormones that masculinise the rest of the body.

In ***Drosophila*** the Y chromosome is needed for male fertility but not for maleness: XO flies are sterile males, and XXY flies are fertile females. Calvin Bridges (1921) studied flies with unusual numbers of X chromosomes and sets of autosomes and concluded that sex depends on the ratio of X chromosomes to sets of autosomes (X : A): 1.0 or more gives a female, 0.5 or less a male, and intermediate ratios intersexes. At the molecular level, the dose of a few X-linked "numerator" genes is assessed in the early embryo; a double dose switches on the gene *Sex-lethal* (*Sxl*), whose protein controls a cascade of RNA splicing decisions leading to female development. Whether the autosomes contribute a measurable "denominator" has been questioned since the 2000s; the X dose is what clearly matters.

The **Z and W** chromosomes of birds are not related to the mammalian X and Y; they evolved from a different pair of autosomes. In chickens, sex appears to depend on the dose of the Z-linked gene *DMRT1* (two copies in males) rather than on a dominant female-determining W gene. Sex chromosomes have evolved independently many times, which is why their behaviour differs so much between groups.

::: example Families and haplodiploids {#ex-sex-families}
(a) In a species with XX/XY sex determination and a 1 : 1 sex ratio, what is the probability that a family of five children are all of the same sex? (b) A honeybee queen heterozygous *Aa* mates with a single drone carrying *A*. What genotypes do her daughters and sons have, and in what proportions?
::: solution
(a) $P(\text{all girls}) = P(\text{all boys}) = (\tfrac12)^5 = \tfrac1{32}$, so $P(\text{all one sex}) = \tfrac2{32} = \tfrac1{16} = 0.0625$.

(b) Daughters develop from fertilised eggs: each receives *A* from the haploid father (whose sperm are all identical, since a haploid male produces gametes without meiotic reduction) and *A* or *a* from the mother: *AA* : *Aa* = $1:1$. Sons develop from unfertilised eggs and receive only a maternal allele: *A* : *a* = $1:1$, and are hemizygous.
:::
:::

::: application Sexing and sex chromosomes in agriculture and conservation
Knowledge of sex-determination systems has practical uses. Because birds are ZZ/ZW, the sex of chicks of many species can be determined from DNA by detecting a W-linked sequence — important in conservation breeding of birds such as parrots and cranes, whose sexes look alike. In poultry, Z-linked colour and feather-growth genes are used to sex day-old chicks, a technique based on the sex-linked inheritance of [[genetics/sex-linkage-pedigrees]]. For turtles with temperature-dependent sex determination, nest temperatures matter for conservation: warming can produce strongly female-biased hatchling cohorts.
:::

::: history
Oscar Hertwig (1876) showed that fertilisation in sea urchins involves the fusion of egg and sperm nuclei, and Edouard Van Beneden (1883) found in the roundworm *Parascaris* (then *Ascaris*) that egg and sperm each contribute an equal, halved number of chromosomes; August Weismann argued in 1887 that a reduction division must occur in every generation. Theodor Boveri's experiments on sea-urchin eggs fertilised by two sperm (1902) showed that development requires a full set of chromosomes, each with different properties. Walter Sutton, a graduate student working on the grasshopper *Brachystola magna*, published *On the morphology of the chromosome group in* Brachystola magna (1902) and *The chromosomes in heredity* (1903), stating the parallel between chromosomes and Mendel's factors. Clarence McClung (1901–02) suggested that an "accessory chromosome" was involved in sex determination, and Nettie Stevens and Edmund Wilson established the XY and XO systems in 1905. Eleanor Carothers saw independent assortment of chromosomes in 1913. The synaptonemal complex was first described by Montrose Moses in 1956 in crayfish spermatocytes, and *SRY* was identified in 1990.
:::

::: summary
- Chromosomes carry genes; diploids have two homologous sets ($2n$), gametes one ($n$). Distinguish the number of chromosomes (centromeres) from the DNA content (C-value).
- Meiosis is one replication followed by two divisions. In meiosis I homologues pair (synaptonemal complex), cross over at the four-chromatid stage, mono-orient and separate; in meiosis II sister chromatids separate. Four haploid products result.
- Chiasmata hold homologues together until anaphase I; an obligate crossover per bivalent is needed for accurate segregation in most organisms.
- Segregation of homologues explains Mendel's first law; independent orientation of different bivalents explains independent assortment for loci on different chromosomes, giving $2^n$ chromosome combinations per gamete.
- Tetrad analysis in fungi shows $2:2$ segregation in each individual meiosis.
- Sex is determined by XX/XY, XX/XO, ZZ/ZW, haplodiploid or environmental systems. In mammals *SRY* on the Y triggers testis development; in *Drosophila* the X dose, read through *Sxl*, decides sex.
:::

## Exercises

::: exercise Gamete combinations {level=1 check="128"}
How many different combinations of parental chromosomes can a garden pea ($2n = 14$) produce in its gametes, ignoring crossing over?
::: solution
$n = 7$, so $2^7 = 128$.
:::
:::

::: exercise Chromatids at metaphase I {level=1 check="92"}
How many chromatids are present in a human primary spermatocyte at metaphase I?
::: solution
The cell has 46 chromosomes, each replicated into two chromatids: $46\times2 = 92$ chromatids, arranged in 23 bivalents (22 autosomal bivalents and the X–Y pair).
:::
:::

::: exercise Mitosis or meiosis? {level=1}
For each statement, say whether it applies to mitosis, meiosis I, meiosis II, or more than one of these: (a) sister chromatids separate; (b) homologues pair; (c) the products have the same chromosome number as the parent cell; (d) chiasmata are present.
::: solution
(a) Mitosis and meiosis II. (b) Meiosis I only. (c) Mitosis and meiosis II (meiosis II starts and ends with $n$ chromosomes; it separates chromatids, not homologues). (d) Meiosis I only (prophase I to metaphase I).
:::
:::

::: exercise A haploid count {level=2 check="1/16"}
An organism has $2n = 8$. Ignoring crossing over, what is the probability that one of its gametes contains only chromosomes it inherited from its mother?
::: solution
$n = 4$ bivalents, each orienting independently, so $(\tfrac12)^4 = \tfrac1{16}$.
:::
:::

::: exercise DNA content {level=2 check="4"}
A plant cell in G1 of the cell cycle has 8 pg of DNA. How much DNA (in pg) is in each product of meiosis II derived from it?
::: solution
A diploid cell in G1 has not yet replicated, so $2C = 8$ pg and $C = 4$ pg. After S phase it has $4C = 16$ pg; each cell after meiosis I has $2C = 8$ pg; each product of meiosis II has $1C = 4$ pg. (Students who take 8 pg to be the replicated amount, $4C$, get 2 pg: read the stage carefully, because G1 precedes replication.)
:::
:::

::: exercise Bee relatedness {level=2 check="3/4"}
In a honeybee colony headed by a queen that mated with a single drone, choose one of a worker's two alleles at a locus at random. What is the probability that her full sister carries a copy of that same allele inherited from the same parent (identical by descent)?
::: hint
Pick the paternal allele with probability $\tfrac12$ and the maternal allele with probability $\tfrac12$.
:::
::: solution
If the chosen allele is paternal (probability $\tfrac12$), the sister certainly has the same allele, because the haploid father gives the same genome to all his daughters. If it is maternal ($\tfrac12$), the sister received the same maternal allele with probability $\tfrac12$. Total: $\tfrac12\cdot1 + \tfrac12\cdot\tfrac12 = \tfrac34$, compared with $\tfrac12$ for full siblings in a diploid species. This high relatedness of sisters is part of the classical (and debated) explanation for the repeated evolution of worker castes in Hymenoptera, discussed in [[behaviour]].
:::
:::

::: exercise Chromosomes in a karyotype {level=2}
A cytologist examines a mitotic metaphase from a female of a new insect species and sees 13 chromosomes; a male shows 13 as well, but one pair in the male consists of two chromosomes of clearly different size, whereas in the female all chromosomes can be paired. (a) What is odd about this description? (b) Suggest which sex-determination system the species has and what further observations would confirm it.
::: solution
(a) A diploid with a pair for every chromosome must have an even number of chromosomes; 13 cannot all be paired in the female. Either a chromosome was missed or overlapping (common in squashes), or the species is not a simple diploid. The cytologist should examine more cells.

(b) If the true count is, say, 14 in both sexes with a heteromorphic pair in males only, the system is XX/XY with male heterogamety. Confirmation: in male meiosis the heteromorphic pair should form a bivalent and segregate, so half the secondary spermatocytes carry the large and half the small chromosome; females should show a homomorphic pair. If instead the heteromorphic pair occurred in females, the system would be ZZ/ZW.
:::
:::

::: exercise Carothers' test {level=3}
In male grasshoppers of the kind studied by Carothers, the single X chromosome (no Y) goes to one pole at anaphase I, and one pair of autosomes is heteromorphic (members *L* and *S*, which differ in shape). (a) If chromosomes assort independently, what fraction of secondary spermatocytes should contain X together with *L*? (b) Suppose 154 cells containing X were scored, of which 79 had *L* and 75 had *S*. Test the hypothesis of independent assortment. (c) Why was this experiment important, given that genetic crosses already showed independent assortment?
::: solution
(a) Half of the secondary spermatocytes contain X; of these, half contain *L* if orientation of the pair is independent of the X. So $\tfrac14$ of all secondary spermatocytes, or $\tfrac12$ of those with X.

(b) Among X-bearing cells, expect $77 : 77$. $X^2 = \dfrac{2^2}{77} + \dfrac{2^2}{77} = 0.104$, $\nu = 1$, $p = 0.75$. Consistent with independent assortment.

(c) Breeding experiments showed that *genes* assort independently; this experiment showed that *chromosomes* do so too, in the same proportions. It was direct physical evidence for the parallel claimed by Sutton and Boveri, and so a step towards the chromosome theory, which was clinched by the correlation of particular genes with particular chromosomes in sex linkage.
:::
:::

::: exercise Obligate crossovers and segregation {level=3}
In a yeast mutant that abolishes crossing over but still allows homologues to pair, many spores are inviable. (a) Explain why. (b) In the surviving spores, would you expect alleles of two genes on the same chromosome arm to recombine? (c) *Drosophila* males have no crossing over but segregate their chromosomes accurately. What must they have that the yeast mutant lacks?
::: solution
(a) Without crossovers there are no chiasmata, so homologues are not held together after the synaptonemal complex disassembles. The two homologues are then free to move to the same pole at anaphase I (non-disjunction), giving spores missing a chromosome; spores lacking an essential chromosome are inviable.

(b) No: in the surviving spores each chromosome is entirely of one parental type (except for rare non-crossover gene conversion events), so alleles on the same chromosome stay in their parental combination.

(c) An alternative, crossover-independent pairing mechanism that holds homologues together until anaphase I: in *Drosophila* males, specific proteins bind homologues to each other (and the X to the Y at repeated sequences in the rDNA region), substituting for chiasmata.
:::
:::
