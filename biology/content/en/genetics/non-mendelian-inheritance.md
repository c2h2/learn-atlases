Mendel's laws rest on three assumptions about the genes of a diploid: they are in the nucleus, they are present in two copies (one from each parent) that are transmitted equally, and an offspring's phenotype depends on its own genotype. Each assumption has exceptions. Some genes are in mitochondria and chloroplasts and are usually transmitted by only one parent. Some offspring phenotypes are set by the genotype of the mother rather than their own. Some genes are expressed from only one of the two parental copies, depending on which parent it came from. And some genetic elements cheat on fair segregation, or move about the genome. None of these phenomena overturns Mendelian genetics; each was recognised precisely because it gave results that Mendel's rules could not explain, and each tells us something about how inheritance works at the level of cells and molecules.

This chapter examines the main kinds of non-Mendelian inheritance: maternal effect, inheritance of organelle genomes, genomic imprinting, and a set of other departures — meiotic drive, transposable elements, cytoplasmic symbionts, prions and paramutation. A recurring theme is diagnosis: given a set of crosses, how do we tell which mechanism is at work? The key tools are reciprocal crosses ([[genetics/mendelian-inheritance#def-generations]]), the behaviour of the trait over several generations, and, increasingly, DNA sequence. Human examples are given at the level of mechanism; clinical aspects belong to [Medicine Atlas](/learn/medicine/lesson.php?c=genetics&l=non-mendelian-inheritance).

## Maternal effect

The pond snail *Lymnaea peregra* (now often placed in the genus *Radix*) has a shell that coils either to the right (dextral, the common form) or to the left (sinistral). In 1923 Arthur Boycott and Cyril Diver reported crosses showing that coiling direction is inherited in an unusual way, and in the same year Alfred Sturtevant explained them: coiling is controlled by a single nuclear gene with a dominant allele *D* for dextral and a recessive *d* for sinistral, but the direction of an individual's shell is determined by the genotype of its *mother*, not its own.

::: definition Maternal effect {#def-maternal-effect}
A **maternal effect** is an influence of the mother's genotype (or phenotype) on the phenotype of her offspring, independent of the offspring's own genotype. In a **maternal-effect gene**, the mother's nuclear genotype determines products — messenger RNAs or proteins — that she deposits in the egg and that act in early development. The gene itself is nuclear and segregates in Mendelian fashion; only its phenotypic expression is shifted by one generation.
:::

In *Lymnaea*, the orientation of the spiral is set at the third cleavage division of the embryo, long before the embryo's own genes are expressed, by gene products laid down in the egg during oogenesis. In 2016 two groups identified the gene as one encoding a formin (an actin-organising protein), *Lsdia1* in the related *Lymnaea stagnalis*; sinistral snails carry a frameshift allele.

::: example Snail coiling over three generations {#ex-snail}
A sinistral female of genotype *dd* is mated with a dextral male *DD*. The F1 are self-fertilised (the snails are hermaphrodites), and each F2 snail is then self-fertilised to produce an F3 family. What are the coiling phenotypes in the F1, the F2 and the F3?
::: solution
**F1**: all *Dd*, but their mother is *dd*, so all F1 are **sinistral** despite carrying the dominant allele.

**F2**: genotypes $DD : Dd : dd = 1:2:1$ by segregation. Their mother (an F1 snail) is *Dd*, so all F2 are **dextral**, including the *dd* quarter.

**F3**: each F2 snail produces a family whose phenotype is set by that F2 snail's genotype: families from *DD* and *Dd* parents ($\tfrac34$ of F2 snails) are entirely dextral, and families from *dd* parents ($\tfrac14$) are entirely sinistral. The Mendelian $3:1$ ratio appears — but among *families* in the F3, not among individuals in the F2.

Note the reciprocal cross: *DD* female × *dd* male gives all dextral F1, because the mother is *DD*. Reciprocal crosses differ in the F1, as they do for sex-linked and cytoplasmic traits, but the subsequent generations reveal a nuclear gene.
:::
:::

Maternal-effect genes are central to the early development of many animals. In *Drosophila*, the mother's *bicoid* gene supplies mRNA localised at the anterior pole of the egg; its protein forms a gradient that specifies the head-to-tail axis of the embryo. Embryos from *bicoid*$^-$/*bicoid*$^-$ mothers lack heads and thoraces, whatever their own genotype. Christiane Nüsslein-Volhard and Eric Wieschaus found such genes in large mutant screens in the late 1970s and 1980s ([[developmental-biology]]).

## Organelle inheritance

Mitochondria and chloroplasts contain their own small, usually circular genomes, relics of their origin as endosymbiotic bacteria ([[cell-biology/organelles]]). Each cell contains many copies — hundreds to thousands of mitochondrial DNA (mtDNA) molecules in a typical animal cell — and organelles are distributed to daughter cells when the cytoplasm divides, not by the mitotic spindle.

::: definition Organelle (cytoplasmic) inheritance {#def-organelle}
**Organelle inheritance** (cytoplasmic or extranuclear inheritance) is the transmission of genes located in mitochondrial or plastid genomes. It typically shows **uniparental inheritance**, most often **maternal inheritance** through the egg, because the female gamete contributes most of the zygote's cytoplasm and paternal organelles are often excluded or destroyed. A cell or organism containing a mixture of two or more organelle genotypes is **heteroplasmic**; one with a single type is **homoplasmic**. Mixed cells can give rise to homoplasmic daughter cells by random partitioning, a process called **vegetative** (or cytoplasmic) **segregation**.
:::

The first examples were found in 1909, just after the rediscovery of Mendel, by Carl Correns in the four-o'clock plant *Mirabilis jalapa* and by Erwin Baur in the geranium *Pelargonium*. *Mirabilis* plants with variegated leaves have some branches that are entirely green, some entirely white (lacking chlorophyll) and some variegated. Correns found that the phenotype of the seeds depended only on the branch that bore the flower (the female parent), not on the branch that supplied the pollen: flowers on white branches gave white seedlings (which die), flowers on green branches gave green seedlings, and flowers on variegated branches gave green, white or variegated seedlings, whatever the pollen. Inheritance was purely maternal. The defect lies in the plastid genome, and variegated tissue is heteroplasmic, sorting out by vegetative segregation into green and white sectors. In *Pelargonium*, by contrast, Baur found that plastids come from both parents — biparental inheritance is not uncommon in plants.

::: example Telling nuclear from cytoplasmic inheritance in yeast {#ex-petite}
In 1949 Boris Ephrussi found that some colonies of the yeast *Saccharomyces cerevisiae* grow slowly as tiny "petite" colonies because they cannot respire. Some petites are due to nuclear mutations ("segregational" petites), others to loss or damage of mtDNA ("neutral" petites). A haploid petite is crossed with a wild-type haploid of the opposite mating type, the diploid is sporulated and tetrads are dissected. Predict the tetrad patterns for each kind of petite.
::: solution
**Segregational (nuclear)** petite: the diploid is heterozygous *pet*$^-$/*pet*$^+$ and has wild-type mitochondria from the wild-type parent, so it respires normally. At meiosis the nuclear alleles segregate $2:2$ ([[genetics/chromosomes-meiosis#ex-tetrads]]): each tetrad has two petite and two wild-type spores.

**Neutral (cytoplasmic)** petite: the diploid receives normal mitochondria from the wild-type parent (yeast zygotes inherit mitochondria from both parents), and the defective mtDNA is lost or outcompeted. All four spores receive normal mitochondria: $0:4$ petite : wild type. In "suppressive" petites, the defective mtDNA instead takes over, and many diploids and their spores are petite: $4:0$ tetrads. Non-$2:2$ segregation in tetrads is a hallmark of non-nuclear inheritance.
:::
:::

Mary and Hershel Mitchell (1952) found a similar cytoplasmically inherited slow-growing mutant, *poky*, in *Neurospora crassa*, transmitted only through the female (protoperithecial) parent. Mitochondrial DNA itself was discovered in 1963 by Margit and Sylvan Nass, who saw DNA fibres inside chick-embryo mitochondria by electron microscopy.

### Human mitochondrial DNA

Human mtDNA is a circle of 16,569 bp, sequenced by Fred Sanger's group in Cambridge in 1981. It carries 37 genes: 13 encoding proteins of the respiratory chain and ATP synthase, 22 transfer RNAs and 2 ribosomal RNAs. All the other mitochondrial proteins, more than a thousand, are encoded in the nucleus and imported. mtDNA is inherited maternally: the sperm's mitochondria enter the egg at fertilisation but are actively eliminated in the early embryo.

Mitochondrial mutations follow three rules that distinguish them from nuclear ones.

1. **Maternal transmission.** An affected woman can pass the mutation to all her children; an affected man passes it to none.
2. **Heteroplasmy.** A mother may carry both mutant and normal mtDNA, in proportions that vary between her children and between tissues.
3. **Threshold.** A tissue is affected only when the fraction of mutant mtDNA exceeds a threshold, often 60–90 %, which is highest in tissues with a high demand for respiratory energy (brain, muscle, heart).

The first pathogenic mtDNA mutation was identified by Douglas Wallace and colleagues in 1988, in families with Leber hereditary optic neuropathy, a condition causing loss of central vision; it is a missense mutation in the gene for subunit ND4 of complex I, usually homoplasmic.

::: intuition The mitochondrial bottleneck
A human egg contains a few hundred thousand mtDNA molecules, yet the heteroplasmy level of a mother's children can differ enormously from hers and from each other's — one child nearly free of a mutation, a sibling with most of its mtDNA mutant. The explanation is a **bottleneck** in the female germ line: the number of mtDNA molecules (or of segregating units, groups of molecules inherited together) drops to a small number in primordial germ cells and then expands again. A random sample of a small number of units from a mixed population can have a very different composition from the population, by chance alone — the same sampling process that drives genetic drift in small populations ([[population-genetics/genetic-drift]]).
:::

::: proposition Heteroplasmy after a bottleneck {#prop-bottleneck}
Suppose a mother's germ-line cells have a fraction $p$ of mutant mtDNA, and each egg's mtDNA population descends from a random sample of $n$ segregating units, drawn with replacement and then amplified without further change. Then the number $K$ of mutant units in an egg is binomial($n$, $p$), the egg's heteroplasmy level $h = K/n$ has

$$
\E[h] = p, \qquad \Var(h) = \frac{p(1-p)}{n},
$$ {#eq-bottleneck}

and the probability that an egg exceeds a threshold $\theta$ is $P(K \ge \lceil n\theta \rceil)$. If the bottleneck is repeated in each of $t$ generations of a maternal lineage, the variance of $h$ after $t$ generations is $p(1-p)\left[1 - (1 - 1/n)^t\right]$, which tends to $p(1-p)$: eventually lineages become homoplasmic, mutant with probability $p$.
:::

::: proof
Each of the $n$ units is mutant with probability $p$ independently, so $K$ is binomial; $\E[K] = np$ and $\Var(K) = np(1-p)$, so $\E[h] = p$ and $\Var(h) = p(1-p)/n$. For repeated bottlenecks, let $H_t = \E[h_t(1-h_t)]$. Given $h_{t}$, the next generation's $h_{t+1}$ has mean $h_t$ and variance $h_t(1-h_t)/n$, so $\E[h_{t+1}(1-h_{t+1}) \mid h_t] = h_t - (h_t^2 + h_t(1-h_t)/n) = h_t(1-h_t)(1 - 1/n)$. Hence $H_t = p(1-p)(1-1/n)^t$. Since $\E[h_t] = p$ for all $t$, $\Var(h_t) = \E[h_t^2] - p^2 = p - H_t - p^2 = p(1-p)\left[1 - (1-1/n)^t\right]$.
:::

::: example Children above the threshold {#ex-threshold}
A woman has 40 % mutant mtDNA in her germ line. Assume a bottleneck of $n = 20$ segregating units and a threshold of 60 % for a phenotype. (a) What are the mean and standard deviation of heteroplasmy in her eggs? (b) What fraction of her eggs exceed the threshold?
::: solution
(a) $\E[h] = 0.40$ and $\mathrm{SD}(h) = \sqrt{0.4\times0.6/20} = \sqrt{0.012} = 0.110$.

(b) The threshold requires $K \ge 12$ of 20 units mutant. $P(K \ge 12) = \sum_{k=12}^{20}\binom{20}{k}0.4^k0.6^{20-k} = 0.057$. So in this model about 6 % of eggs would be above the threshold, although the mother herself is below it. The model is a simplification — real bottleneck sizes are estimated from data and differ between mutations, and selection can act on mutant mtDNA — but it captures why risks for mtDNA conditions are hard to predict for individual families. Reproductive and clinical questions are matters for clinical genetics services, not for this calculation.
:::
:::

::: widget distribution
dist: binomial
params: n=20, p=0.4
a: 12
b: 20
caption: The number of mutant segregating units among $n$ passing through the germ-line bottleneck, for a mother with mutant fraction $p$ ([[#prop-bottleneck]]); divide by $n$ to read the heteroplasmy of an egg. With $n = 20$ and $p = 0.4$ the shaded bars, 12 or more units (at least 60 % mutant), have total probability about 0.057. Make $n$ smaller to see the spread widen and more eggs cross the threshold; make it larger and the eggs cluster around their mother's level.
:::

::: widget plot
f: p*(1 - p)*(1 - (1 - 1/n)^x)
x: 0, 40
y: 0, 0.26
sliders: p=0.4:0.05:0.95:0.05; n=20:2:100:1
caption: The variance of heteroplasmy among descendants of a heteroplasmic woman after $x$ generations of the germ-line bottleneck, for mutant fraction $p$ and bottleneck size $n$ ([[#prop-bottleneck]]). The variance rises towards its ceiling $p(1-p)$, reached when every maternal lineage has become homoplasmic. Small bottlenecks reach the ceiling within a few generations.
:::

::: quiz
A trait passes from an affected man to none of his children, but from an affected woman to all of hers, in varying severity. Which mechanism fits best?
- [ ] An X-linked dominant allele
- [ ] A maternal-effect nuclear gene
- [x] A mitochondrial mutation
- [ ] A paternally expressed imprinted gene
::: solution
Transmission by mothers to all children and by fathers to none, with variable severity, is the signature of mtDNA inheritance with heteroplasmy. An X-linked dominant allele would pass from an affected man to all his daughters; a maternal-effect gene would be transmitted by fathers to grandchildren; a paternally expressed imprinted allele would show its effect when transmitted by the man, not the woman.
:::
:::

Because mtDNA is inherited maternally without recombination and mutates faster than most nuclear DNA, it records maternal lineages and has been widely used in evolutionary studies. Rebecca Cann, Mark Stoneking and Allan Wilson (1987) used it to infer that all present-day human mtDNA lineages descend from a common ancestral molecule that existed in Africa some 200,000 years ago, a conclusion since refined by whole-genome data ([[evolution]]). Such a common ancestor of one DNA segment is not the only ancestor of the population: everyone alive at the time contributed to other parts of the genome.

::: warning "Maternal inheritance and maternal effect are the same thing"
Both make reciprocal crosses differ, but the mechanisms and later generations differ completely. A **maternal-effect** trait is controlled by a nuclear gene; it is delayed by one generation but eventually shows Mendelian ratios among families, and fathers transmit the alleles to grandchildren. A **maternally inherited** (organelle) trait is controlled by organelle genes; it never shows Mendelian ratios, does not depend on any nuclear allele of the father, and is transmitted through females in every generation. In a pedigree, the distinguishing observation is whether an affected *grandchild* can trace the trait to its *paternal grandfather* (possible for a nuclear gene, impossible for mtDNA).
:::

## Genomic imprinting

In 1984 two groups — James McGrath and Davor Solter, and Azim Surani, Sheila Barton and Michael Norris — transplanted pronuclei between fertilised mouse eggs to make embryos whose two genomes both came from the mother (**gynogenetic**) or both from the father (**androgenetic**). Both kinds failed. Gynogenetic embryos developed a relatively normal embryo but very little placenta; androgenetic embryos developed placental tissues but a poor embryo. Mammals need one maternal and one paternal genome. Some genes, therefore, must behave differently according to the parent from which they were inherited.

::: definition Genomic imprinting {#def-imprinting}
**Genomic imprinting** is the expression of a gene from only one of the two parental alleles, determined by the sex of the parent that transmitted it. A **maternally expressed** gene is expressed only from the allele inherited from the mother (the paternal allele is silenced, or *imprinted*); a **paternally expressed** gene the reverse. The imprint is an epigenetic mark — chiefly DNA methylation at an **imprinting control region** — established in the germ line of each sex, maintained through the somatic divisions of the offspring, and erased and reset in the offspring's own germ line according to its sex.
:::

About 100–200 imprinted genes are known in mice and humans, many in clusters; imprinting is found in placental mammals and marsupials and, independently, in the endosperm of flowering plants. The first mouse examples were found in 1991. Thomas DeChiara, Elizabeth Robertson and Argiris Efstratiadis found that a mutant allele of *Igf2*, encoding insulin-like growth factor 2, gave small offspring when inherited from the father but had no effect when inherited from the mother: *Igf2* is paternally expressed. Denise Barlow and colleagues found that *Igf2r*, encoding a receptor that removes IGF2 from circulation, is maternally expressed.

::: proposition Transmission of an imprinted allele {#prop-imprinted}
Let a loss-of-function allele $a$ be in a gene that is expressed only from the paternal allele, with $a$ having no effect when maternally inherited. Then an offspring shows the mutant phenotype if and only if it inherits $a$ from its father. A heterozygous father transmits it, and the phenotype, to half his children; a heterozygous mother transmits $a$ to half her children, none of whom show the phenotype, but her sons can then pass it to affected grandchildren. For a maternally expressed gene, exchange "father" and "mother".
:::

::: proof
In the offspring only the paternal copy is active. If the paternal copy is $a$, the gene has no functional expressed copy (the maternal copy is silent regardless of its allele), so the phenotype is mutant; if the paternal copy is $A$, it is normal whatever the maternal copy. A heterozygous parent transmits $a$ with probability $\tfrac12$ by segregation, and the imprint is reset in the parent's germ line according to the parent's sex, so a woman's alleles are always transmitted with a maternal imprint and a man's with a paternal one, regardless of how they were imprinted in the parent.
:::

::: example An imprinting pedigree {#ex-imprinting-pedigree}
A man who is heterozygous for a loss-of-function allele of a paternally expressed gene but phenotypically normal (because he inherited the allele from his mother) has four children with an unrelated woman. (a) What is the probability that a given child shows the phenotype? (b) His daughter inherits the allele. What is the probability that her child shows the phenotype? (c) What pattern would a long pedigree show?
::: solution
(a) The father now transmits his alleles with a paternal imprint, so a child receiving $a$ from him (probability $\tfrac12$) has no active copy and shows the phenotype: $\tfrac12$.

(b) The daughter has the phenotype herself (she got $a$ from her father), but she transmits it with a maternal imprint: her children who inherit $a$ (probability $\tfrac12$) have a silent maternal $a$ and an active paternal allele from their father, so they are normal. Probability 0.

(c) The trait appears in about half the children of carrier men and in none of the children of carrier women, so it can skip generations when passed through women and reappear when passed through men — a parent-of-origin effect that mimics incomplete penetrance unless the sex of the transmitting parent is noticed.
:::
:::

In humans, a region of chromosome 15 (15q11–q13) contains both paternally and maternally expressed genes. Loss of the paternal contribution — by a deletion on the paternally derived chromosome, or by **uniparental disomy** (inheriting both copies of chromosome 15 from the mother, as Robert Nicholls and colleagues showed in 1989) — causes Prader–Willi syndrome; loss of the maternal contribution, in particular of the maternally expressed gene *UBE3A*, causes Angelman syndrome. The same deletion thus produces two different conditions depending on the parent who transmitted it.

Why imprinting evolved is debated. The most influential hypothesis, the **parental conflict** (kinship) theory of David Haig and Mark Westoby (1989), notes that in species where a mother may have offspring by several fathers, paternally inherited genes gain by extracting more maternal resources for their carrier, while maternally inherited genes gain by restraining demand in favour of the mother's other offspring. It predicts that paternally expressed genes tend to promote growth (like *Igf2*) and maternally expressed genes to restrain it (like *Igf2r*), as is often observed, though not every imprinted gene fits. Imprinting also makes mammals unable to reproduce by parthenogenesis.

## Other departures from Mendelian transmission

Several further phenomena break the rules of fair, nuclear, two-copy inheritance.

- **Meiotic drive.** Some alleles or chromosomes are transmitted to more than half of the gametes of a heterozygote, violating equal segregation. Examples are the *t*-haplotypes of the house mouse ([[genetics/chromosomes-meiosis]]) and *Segregation Distorter* in *Drosophila melanogaster*, which kill or disable sperm carrying the rival homologue, and female meiotic drive by "selfish" centromeres that preferentially go to the egg rather than the polar body. Drive can spread an allele even if it reduces fitness, a theme taken up in [[evolution]].
- **Transposable elements.** In the 1940s Barbara McClintock found in maize that the element *Dissociation* (*Ds*) causes chromosome breakage at its own position and moves from place to place, under the control of a second element, *Activator* (*Ac*), producing unstable mutations and variegated kernels; she described the system in 1950–51. Transposable elements were later found in all organisms; they make up about 45 % of the human genome. In *Drosophila*, the *P* element causes **hybrid dysgenesis** — sterility and high mutation rates in the offspring of males carrying *P* elements and females lacking them — a non-reciprocal effect that depends on the mother's cytoplasm, because the repressing small RNAs (piRNAs) that keep elements in check are inherited maternally.
- **Cytoplasmic symbionts.** Bacteria living inside cells can be inherited maternally like organelles. *Wolbachia*, found in a large fraction of insect species, manipulates reproduction for its own transmission: in **cytoplasmic incompatibility**, embryos from infected males and uninfected females die, so infected females have an advantage. Release of *Wolbachia*-infected mosquitoes is being used to suppress the transmission of dengue virus ([[ecology]]). Tracy Sonneborn's "kappa" particles in *Paramecium* (1940s) were an early example of a cytoplasmically inherited trait later found to be a bacterial symbiont.
- **Prions.** In yeast, some proteins can adopt a self-propagating aggregated conformation that converts normal copies of the protein to the same form. Reed Wickner proposed in 1994 that the non-Mendelian traits [PSI$^+$] and [URE3] are prion forms of the proteins Sup35 and Ure2. Such traits are transmitted through the cytoplasm and give $4:0$ tetrads in crosses with normal strains.
- **Paramutation.** In maize, Alexander Brink described in 1956 an interaction in which one allele of the *r1* gene heritably changes the expression of another allele in the same plant, so that the changed allele does not regain its original expression after segregating away — a heritable epigenetic change that violates the principle that alleles emerge unchanged from a heterozygote.

::: application Mitochondrial replacement and organelle engineering
Because mtDNA disease is transmitted through the egg cytoplasm, techniques have been developed in which the nuclear genome of an affected woman's egg or zygote is transferred into an enucleated donor egg with normal mitochondria. The United Kingdom permitted such **mitochondrial donation** under licence from 2015, after extensive public consultation and review; the first reports of children born after the procedure in the UK appeared in 2025. The technique raises scientific questions (carry-over of a small fraction of mutant mtDNA, which can increase through the bottleneck) and ethical ones, and is tightly regulated. In plants, maternal inheritance of chloroplasts is exploited in agriculture: **cytoplasmic male sterility**, caused by mitochondrial genes, is used to produce hybrid seed without hand emasculation, and transgenes placed in the chloroplast genome are rarely transmitted through pollen.
:::

::: history
Carl Correns described maternal inheritance of leaf variegation in *Mirabilis jalapa* and Erwin Baur biparental plastid inheritance in *Pelargonium* in 1909. Arthur Boycott and Cyril Diver reported the inheritance of shell coiling in *Lymnaea* in 1923, and Alfred Sturtevant explained it as a maternal effect in the same year. Boris Ephrussi described yeast petites in 1949, Mary and Hershel Mitchell *poky* in *Neurospora* in 1952, and Margit and Sylvan Nass found DNA in mitochondria in 1963. Barbara McClintock described *Ac*/*Ds* transposition in maize in 1950–51 (Nobel Prize 1983). The human mitochondrial genome was sequenced by Stephen Anderson and colleagues in Fred Sanger's laboratory in 1981, and Douglas Wallace's group found the first pathogenic mtDNA mutation in 1988. James McGrath and Davor Solter, and Azim Surani's group, demonstrated the non-equivalence of parental genomes in mice in 1984, and the first imprinted genes were identified in 1991.
:::

::: summary
- Reciprocal crosses that differ point to sex linkage, maternal effect or organelle inheritance; later generations distinguish them.
- **Maternal effect**: the mother's nuclear genotype sets the offspring phenotype through egg-deposited products (snail coiling, *bicoid*). The gene segregates normally; Mendelian ratios appear one generation late, among families.
- **Organelle inheritance**: mitochondrial and plastid genes are usually transmitted uniparentally (maternally in animals and many plants), show no Mendelian ratios, and segregate vegetatively from heteroplasmic cells. Yeast cytoplasmic petites give non-$2:2$ tetrads.
- Human mtDNA (16,569 bp, 37 genes) is maternally inherited; heteroplasmy, the germ-line bottleneck and thresholds make transmission variable. With $n$ segregating units, egg heteroplasmy has mean $p$ and variance $p(1-p)/n$.
- **Genomic imprinting**: parent-of-origin-specific expression set by germ-line DNA methylation and reset each generation (*Igf2* paternal, *Igf2r* maternal; 15q11–q13). An imprinted allele shows its effect only when transmitted by one sex.
- Meiotic drive, transposable elements, cytoplasmic symbionts (*Wolbachia*), prions and paramutation are further departures from fair, nuclear, Mendelian transmission.
:::

## Exercises

::: exercise A sinistral snail {level=1}
A dextral snail produces only sinistral offspring. What is the genotype of this snail, and what can you say about the genotype of its mother?
::: solution
The snail must be *dd*, since only *dd* mothers produce sinistral offspring. Being dextral itself, it had a mother carrying at least one *D* (*DD* or *Dd*); since it is *dd*, the mother must have been *Dd* (and the father carried *d*).
:::
:::

::: exercise A variegated branch {level=1}
On a variegated *Mirabilis* plant, a flower on a green branch is pollinated with pollen from a white branch. What seedlings are expected? What if the cross is reversed?
::: solution
Inheritance is maternal: a flower on a green branch gives green seedlings whatever the pollen. In the reverse cross, a flower on a white branch gives white seedlings (which die for lack of chlorophyll), whatever the pollen.
:::
:::

::: exercise Heteroplasmy spread {level=1 check="0.1"}
A woman has 50 % mutant mtDNA. With a bottleneck of $n = 25$ segregating units, what is the standard deviation of the heteroplasmy level of her eggs?
::: solution
$\sqrt{0.5\times0.5/25} = \sqrt{0.01} = 0.1$ by [[#eq-bottleneck]].
:::
:::

::: exercise F3 families {level=2 check="1/4"}
In the snail cross of [[#ex-snail]], what fraction of F3 families consist entirely of sinistral snails?
::: solution
F3 families from *dd* F2 parents are sinistral: $\tfrac14$ of the F2 are *dd*, so $\tfrac14$ of the families.
:::
:::

::: exercise An imprinted grandchild {level=2 check="1/4"}
A woman's father carries a loss-of-function allele in a paternally expressed gene (he inherited it from his mother and is unaffected). The woman's partner does not carry the allele. What is the probability that the woman's son inherits the allele? Would such a son be affected?
::: solution
The woman's father transmits the allele to her with probability $\tfrac12$ (and if so she is affected, having received it from her father). She transmits it to her son with probability $\tfrac12$, so the son carries it with probability $\tfrac12\times\tfrac12 = \tfrac14$. But a son who inherits it receives it with a maternal imprint: the silent copy is the mutant one, and his paternal copy, from a non-carrier father, is active. He is unaffected. His own children who inherit the allele from him, however, would be affected ([[#prop-imprinted]]).
:::
:::

::: exercise A threshold probability {level=2 check="0.172"}
A woman has 50 % mutant mtDNA, and the bottleneck is $n = 10$ segregating units. What fraction of her eggs have at least 70 % mutant mtDNA (three decimal places)?
::: solution
At least 70 % means $K \ge 7$ of 10. $P(K \ge 7) = [\binom{10}{7} + \binom{10}{8} + \binom{10}{9} + \binom{10}{10}]/2^{10} = (120 + 45 + 10 + 1)/1024 = 176/1024 = 0.172$.
:::
:::

::: exercise Diagnosing a pattern {level=2}
A trait in a plant shows the following: reciprocal crosses between a mutant and a wild-type line give F1 resembling the female parent; F1 plants of both reciprocal types, self-fertilised, give F2 all resembling their F1 mother; and backcrossing an F1 as female to the wild type, for six generations, does not change the phenotype. (a) What kind of inheritance is this? (b) How would you rule out a maternal effect?
::: solution
(a) Maternal (cytoplasmic) inheritance, presumably of a plastid or mitochondrial gene: the phenotype follows the female line indefinitely and never segregates, even after repeated backcrossing has replaced almost the entire nuclear genome with that of the wild type (the classical "nuclear substitution" test).

(b) A maternal-effect nuclear gene would show Mendelian segregation one generation later: F2 plants would differ among themselves in the phenotypes of *their* offspring, in a $3:1$ (or similar) ratio among F3 families. Repeated backcrossing to the wild type as male would also eventually make the mother heterozygous or wild type, changing the offspring phenotype. Neither happens here.
:::
:::

::: exercise Predicting imprinting phenotypes {level=3}
In mice, *Igf2* is paternally expressed and *Igf2r* (whose product degrades IGF2 and so restrains growth) is maternally expressed. A null allele of each is available. Predict the size of offspring (small, normal or large) from: (a) a heterozygous *Igf2*$^{+/-}$ male × wild-type female, for offspring inheriting the null; (b) a wild-type male × heterozygous *Igf2*$^{+/-}$ female, for offspring inheriting the null; (c) a heterozygous *Igf2r*$^{+/-}$ female × wild-type male, for offspring inheriting the null. (d) How do these results fit the parental conflict hypothesis?
::: solution
(a) The null is paternal, so the only expressed *Igf2* copy is non-functional: **small** offspring (as DeChiara and colleagues found).

(b) The null is maternal and silent anyway; the paternal copy is active: **normal**.

(c) The null *Igf2r* is maternal, and the maternal copy is the expressed one, so there is no functional receptor to degrade IGF2: **large** offspring (with excess IGF2 activity; in mice this overgrowth is often lethal before birth).

(d) The paternally expressed gene promotes growth and the maternally expressed one restrains it, as predicted if paternally inherited genes favour extracting more maternal resources and maternally inherited genes favour holding back. The theory makes this qualitative prediction for each imprinted gene; many but not all imprinted genes fit, and alternative hypotheses exist.
:::
:::

::: exercise Interpreting a mitochondrial pedigree {level=3}
In a family affected by a rare mitochondrial condition, an affected woman has five children, of whom two are severely affected, two mildly affected and one unaffected; her affected brother has four children, none affected. (a) Explain both observations. (b) Using [[#prop-bottleneck]], explain why the woman's children differ in severity. (c) Why is it difficult to give a precise risk for her daughters' future children?
::: solution
(a) mtDNA is inherited maternally, so the brother transmits none of his mtDNA to his children; the woman transmits hers to all of them.

(b) The woman is presumably heteroplasmic. Her eggs received different random samples of mtDNA through the germ-line bottleneck, so her children have different proportions of mutant mtDNA, and their tissues may lie above or below the threshold to differing degrees. Variation among tissues within each child (from later vegetative segregation) adds to the differences.

(c) Each daughter's germ-line heteroplasmy level is not known exactly (blood or other accessible tissues may differ from the germ line), the effective bottleneck size varies between mutations and individuals, selection may favour or disfavour the mutant mtDNA, and the threshold is not sharp. The binomial model gives a distribution of possible outcomes, not a definite prediction. Such families are advised by clinical genetics services, not by calculations of this kind.
:::
:::
