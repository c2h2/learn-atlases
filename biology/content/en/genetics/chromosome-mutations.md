Most genetic variation is invisible under the microscope: a change of one base pair in three billion leaves the chromosomes looking exactly the same. But some mutations are large enough to see. A whole chromosome may be gained or lost, a whole set of chromosomes may be doubled, or a chromosome may break and rejoin in a new arrangement, losing, duplicating, inverting or moving a segment. These **chromosome mutations** were the first mutations whose physical nature was understood, decades before DNA was known to be the genetic material, and their genetic consequences — unusual ratios, sterility, suppressed recombination, apparent dominance of recessive alleles — were among the strongest early evidence that genes lie in a fixed linear order on chromosomes.

They also matter enormously in their own right. Changes in chromosome number are the most common cause of human pregnancy loss and of several well-known conditions; polyploidy has shaped the evolution of flowering plants and produced many of our crops, including wheat, cotton, potatoes and bananas; and rearrangements drive both cancer and the divergence of species. This chapter classifies chromosome mutations, explains how each one arises in meiosis or by chromosome breakage, and shows how each affects segregation and recombination. It builds on [[genetics/chromosomes-meiosis]] and [[genetics/linkage-mapping]].

## Changes in chromosome number

::: definition Euploidy and aneuploidy {#def-aneuploidy}
Let $x$ be the number of chromosomes in one basic set of a species (the **monoploid** number) and $n$ the number in its gametes (for a diploid, $n = x$). A cell or organism is **euploid** if it has a whole number of complete sets: monoploid ($x$), diploid ($2x$), triploid ($3x$), tetraploid ($4x$) and so on; more than two sets is **polyploidy**. It is **aneuploid** if it has a number of chromosomes that is not an exact multiple of $x$, because one or a few chromosomes are missing or extra. For a diploid, the aneuploid types are **nullisomic** ($2n - 2$, both copies of one chromosome missing), **monosomic** ($2n - 1$), **trisomic** ($2n + 1$) and **tetrasomic** ($2n + 2$, two extra copies of one chromosome).
:::

### Non-disjunction

Aneuploidy usually arises from **non-disjunction**, the failure of homologues (in meiosis I) or of sister chromatids (in meiosis II) to separate, as Bridges showed in *Drosophila* ([[genetics/sex-linkage-pedigrees]]). A related cause, now known to be common in human oocytes, is **premature separation of sister chromatids** in meiosis I, which gives similar products. Fertilisation of a gamete with an extra chromosome ($n + 1$) by a normal one gives a trisomic zygote; fertilisation of a gamete lacking it ($n - 1$) gives a monosomic.

::: proposition Gametes from non-disjunction {#prop-nondisjunction}
Consider one pair of homologues in a single meiosis, all other chromosomes segregating normally.
1. If the homologues fail to separate at **meiosis I**, all four products are abnormal: two are $n + 1$, each carrying one chromatid of *both* homologues (so heterozygous if the parent is, at loci near the centromere), and two are $n - 1$.
2. If the sister chromatids of one homologue fail to separate at **meiosis II**, two products are normal ($n$), one is $n + 1$ carrying two copies of the same homologue (homozygous at loci near the centromere), and one is $n - 1$.
:::

::: proof
(1) After meiosis I non-disjunction, one secondary cell receives both replicated homologues and the other neither. In meiosis II the first divides its four chromatids two and two, giving two products each with one chromatid of each homologue; the second gives two products with no copy. (2) Meiosis I is normal, so each secondary cell has one replicated homologue. In the cell where meiosis II fails, both sister chromatids go to one product and none to the other; the other secondary cell divides normally, giving two normal products. Sister chromatids are identical except distal to a crossover, so the $n+1$ product carries two copies of the same centromere-proximal alleles.
:::

The genetic difference between the two cases — heterozygosity or homozygosity near the centromere of the extra chromosome — is used with DNA markers to determine in which parent and at which division a particular non-disjunction happened.

::: example Non-disjunction of the sex chromosomes in a man {#ex-nd-xy}
What sperm are produced if the X and Y fail to separate at meiosis I in a man, and what if the Y chromatids fail to separate at meiosis II? Assuming fertilisation of a normal (X) egg, what zygotes result?
::: solution
Meiosis I: two sperm carry both X and Y (XY) and two carry neither (O). Fertilising X eggs gives XXY and XO zygotes. Meiosis II non-disjunction of the Y: the secondary spermatocyte with the X divides normally, giving two X sperm; the one with the Y gives a YY sperm and an O sperm. Zygotes: XX (normal), XYY and XO. So XYY can only arise in the father, at meiosis II; XXY can arise from the father at meiosis I or from the mother at either division (an XX egg fertilised by a Y sperm).
:::
:::

### Aneuploidy in humans

Aneuploidy is surprisingly frequent in human reproduction. A large fraction of human eggs, and of early embryos produced by in vitro fertilisation, are aneuploid, the proportion rising steeply with maternal age; most aneuploid embryos fail to implant or are lost early, and about half of recognised first-trimester miscarriages carry a chromosome abnormality. Most of these errors arise in maternal meiosis I. A plausible reason is that human oocytes stay arrested in prophase I from before birth until ovulation, up to five decades later, and the cohesin holding bivalents together is not replaced during that time.

Only a few aneuploidies are compatible with survival to birth: trisomies of the small chromosomes 21, 18 and 13, which carry relatively few genes, and changes in the number of sex chromosomes, which are tolerated because extra X chromosomes are inactivated ([[genetics/sex-linkage-pedigrees#def-dosage]]) and the Y carries few genes.

| Constitution | Name | Approximate frequency at birth |
|---|---|---|
| 47,XX,+21 or 47,XY,+21 | trisomy 21 (Down syndrome) | about 1 in 700–1000 |
| 47,+18 | trisomy 18 | about 1 in 5000 |
| 47,+13 | trisomy 13 | about 1 in 10,000 |
| 47,XXY | Klinefelter syndrome | about 1 in 600 male births |
| 47,XYY | — | about 1 in 1000 male births |
| 47,XXX | trisomy X | about 1 in 1000 female births |
| 45,X | Turner syndrome | about 1 in 2500 female births |

These frequencies vary with the maternal-age profile of a population and with screening practice, and should be read as orders of magnitude. The notation gives the total chromosome number, the sex chromosomes and any change. Down syndrome was shown to result from an extra chromosome 21 by Jérôme Lejeune, Marthe Gautier and Raymond Turpin in 1959, three years after Joe Hin Tjio and Albert Levan had established that the normal human number is 46. Clinical aspects are treated in [Medicine Atlas](/learn/medicine/lesson.php?c=genetics&l=chromosomal-disorders); here we are concerned with mechanism.

::: intuition Why an extra chromosome matters when an extra allele does not
A trisomy does not introduce any new gene: it adds a third copy of every gene on one chromosome. The trouble is **dosage imbalance**. Many proteins work in complexes or pathways whose components must be made in proportion; raising the dose of several hundred genes by 50 % relative to the rest of the genome disturbs many of these balances at once. That is why trisomy for a gene-poor chromosome is less severe than for a gene-rich one, why monosomy (a 50 % reduction) is usually more harmful than trisomy, and why polyploidy, which keeps all doses in proportion, is often tolerated where aneuploidy is not.
:::

### Segregation in trisomics

Aneuploids are useful tools in plant genetics. In the 1920s Albert Blakeslee and John Belling found all twelve possible primary trisomics of the jimsonweed *Datura stramonium* ($2n = 24$), each with a recognisable seed-capsule shape. A gene can be assigned to a chromosome by showing that it gives abnormal ratios in crosses with the trisomic for that chromosome.

::: proposition Gametes of a trisomic {#prop-trisomic}
A trisomic of genotype *AAa* in which the three homologues segregate at random two to one pole and one to the other, and the locus is close enough to the centromere that crossing over can be ignored, produces gametes

$$
AA : Aa : A : a = 1 : 2 : 2 : 1 .
$$ {#eq-trisomic}

If $n+1$ and $n$ gametes function equally, a test cross to *aa* gives dominant : recessive $= 5 : 1$.
:::

::: proof
Label the chromosomes $A_1$, $A_2$, $a$. There are three equally likely ways to divide them into a pair and a single: $\{A_1A_2 \mid a\}$, $\{A_1a \mid A_2\}$, $\{A_2a \mid A_1\}$. Each gives one disomic and one monosomic gamete, so the six gametes $A_1A_2$, $a$, $A_1a$, $A_2$, $A_2a$, $A_1$ are equally likely, i.e. $AA : Aa : A : a = 1:2:2:1$. In a test cross, only the $a$ gamete ($\tfrac16$) gives a recessive offspring.
:::

In practice $n+1$ pollen often competes poorly with $n$ pollen, so ratios depend on which parent is the trisomic; this is itself a useful diagnostic.

## Polyploidy

::: definition Autopolyploids and allopolyploids {#def-polyploid}
An **autopolyploid** has multiple sets of chromosomes from the same species (for example an autotetraploid *AAAA*, where each letter is now a whole genome). An **allopolyploid** has sets from two or more different species, typically after hybridisation followed by chromosome doubling; an allotetraploid with two sets from each of two species is also called an **amphidiploid**. Doubling can occur spontaneously, through unreduced ($2n$) gametes, or be induced by colchicine, which blocks spindle formation and so prevents chromosome separation.
:::

**Odd-numbered polyploids** are usually sterile, because chromosomes with three copies cannot be divided evenly at meiosis. In a triploid, each of the $x$ chromosome types forms a trivalent (or a bivalent and a univalent) that sends two copies to one pole and one to the other, at random and independently of the others.

::: example Balanced gametes from a triploid {#ex-triploid}
Cultivated bananas are triploid, $2n = 3x = 33$ ($x = 11$). Assuming each chromosome type sends two copies to one pole and one to the other at random and independently, what fraction of gametes are balanced (euploid, with $x$ or $2x$ chromosomes)?
::: solution
A gamete is balanced only if it receives the single copy of *every* chromosome type (giving $x$) or the double copy of every type (giving $2x$). Each type independently gives the single copy with probability $\tfrac12$, so

$$
P(\text{balanced}) = \left(\tfrac12\right)^{11} + \left(\tfrac12\right)^{11} = 2^{-10} = \frac{1}{1024} \approx 0.001 .
$$

Almost all gametes are aneuploid and inviable, which is why bananas set essentially no seed and must be propagated vegetatively — and why the crop is genetically uniform and vulnerable to disease. Seedless watermelons are triploids produced by crossing a tetraploid with a diploid, for the same reason.
:::
:::

::: widget distribution
dist: binomial
params: n=11, p=0.5
a: 0
b: 0
caption: In a triploid with $x = 11$ chromosome types (such as banana), the number of types for which a gamete receives the extra (second) copy is binomial with $n = 11$, $p = 1/2$. Only the two end bars, 0 (a gamete with $x$ chromosomes) and 11 (one with $2x$), are balanced; the shaded bar at 0 has probability $1/2048$. Change $n$ to see how quickly fertility collapses as the chromosome number grows: with $x = 3$ a quarter of gametes are balanced.
:::

**Autotetraploids** are often fertile, but segregation in them follows different rules from diploids. With four homologues of each chromosome, alleles at a locus can be present in five dosages — *AAAA* (quadruplex), *AAAa*, *AAaa* (duplex), *Aaaa*, *aaaa* (nulliplex).

::: proposition Segregation in an autotetraploid {#prop-tetraploid}
In an autotetraploid of genotype *AAaa*, with random pairing of the four homologues into two bivalents (or a quadrivalent segregating two by two) and a locus close to the centromere, the diploid gametes are

$$
AA : Aa : aa = 1 : 4 : 1 .
$$

Self-fertilisation then gives a fraction $\tfrac1{36}$ of *aaaa* offspring — a $35 : 1$ ratio of dominant to recessive phenotype if a single *A* is dominant — and a test cross to *aaaa* gives $5:1$.
:::

::: proof
The gamete receives two of the four chromosomes, chosen at random: $\binom42 = 6$ equally likely pairs. One pair is $AA$, one is $aa$, and the four pairs with one $A$ and one $a$ give $Aa$. So $AA : Aa : aa = 1 : 4 : 1$. A zygote is *aaaa* only if both gametes are $aa$: $(\tfrac16)^2 = \tfrac1{36}$. In a test cross, only the $aa$ gamete gives *aaaa*: $\tfrac16$.
:::

::: example Selfing a duplex potato {#ex-duplex}
A tetraploid potato plant is duplex (*AAaa*) for an allele *a* that causes a recessive tuber trait. Under the assumptions of [[#prop-tetraploid]], give the distribution of the five possible genotypes among its selfed offspring.
::: solution
Each gamete carries 2, 1 or 0 copies of *A* with probabilities $\tfrac16$, $\tfrac46$, $\tfrac16$. The number of *A* copies in a zygote is the sum from two independent gametes:

| Genotype | *AAAA* | *AAAa* | *AAaa* | *Aaaa* | *aaaa* |
|---|---|---|---|---|---|
| Ways | $1\cdot1$ | $1\cdot4 + 4\cdot1$ | $1\cdot1 + 4\cdot4 + 1\cdot1$ | $4\cdot1 + 1\cdot4$ | $1\cdot1$ |
| Probability | $\tfrac1{36}$ | $\tfrac8{36}$ | $\tfrac{18}{36}$ | $\tfrac8{36}$ | $\tfrac1{36}$ |

The ratio is $1:8:18:8:1$. Half of the offspring are duplex again, and only one in 36 shows the recessive trait — a breeder looking for it needs to grow well over a hundred seedlings to be reasonably sure of finding several.
:::
:::

Recessive phenotypes are much rarer in a tetraploid F2 ($\tfrac1{36}$) than in a diploid F2 ($\tfrac14$), which is one reason why breeding autotetraploid crops such as potato and alfalfa is slow.

**Allopolyploidy** has been a major route to new plant species. In 1928 Georgii Karpechenko crossed radish (*Raphanus sativus*, $2n = 18$) with cabbage (*Brassica oleracea*, $2n = 18$). The F1 hybrid had 18 chromosomes, 9 from each parent, which had no homologues to pair with, and it was almost completely sterile. Among its rare offspring were fertile plants with 36 chromosomes, produced by unreduced gametes: each radish chromosome now had a radish partner and each cabbage chromosome a cabbage partner, so meiosis was regular. The new plant, *Raphanobrassica*, was a new species, unable to produce fertile offspring with either parent. (Unfortunately it had the root of a cabbage and the leaves of a radish.)

Bread wheat, *Triticum aestivum*, is an allohexaploid, $2n = 6x = 42$, with genomes designated AABBDD. It arose about 10,000 years ago in cultivation when a tetraploid wheat (AABB, itself an allotetraploid) hybridised with the wild goat grass *Aegilops tauschii* (DD). Cotton, oilseed rape (canola), coffee and tobacco are also allopolyploids. Genome sequencing has shown that all flowering plants descend from ancestors that underwent whole-genome duplication, some more than once, and the vertebrate lineage underwent two rounds early in its history. In animals, polyploidy is rarer, probably because it disrupts chromosomal sex determination, but it occurs in some fish, amphibians (the frog *Xenopus laevis* is allotetraploid) and many parthenogenetic invertebrates.

::: application Polyploid crops
Breeders exploit polyploidy for size, vigour and seedlessness. Autotetraploid forms of many ornamental plants have larger flowers; triploid sugar beet, watermelon and some apple and citrus varieties are seedless or high-yielding; and the synthetic allopolyploid triticale (wheat × rye) combines the grain quality of wheat with the hardiness of rye. Colchicine treatment of seedlings or shoot tips is the classic way to double the chromosome number.
:::

## Changes in chromosome structure

Structural rearrangements begin with breaks in chromosomes — from ionising radiation, from errors in replication or repair, or from recombination between repeated sequences at different sites. If broken ends rejoin in the wrong way, the result is a **deletion**, **duplication**, **inversion** or **translocation**.

::: definition Structural chromosome mutations {#def-structural}
- A **deletion** (deficiency) is the loss of a chromosome segment; it may be **terminal** or **interstitial**.
- A **duplication** is the presence of a segment twice; a **tandem** duplication lies next to the original copy.
- An **inversion** is a segment reversed in orientation. It is **paracentric** if it does not include the centromere and **pericentric** if it does.
- A **translocation** is the movement of a segment to a non-homologous chromosome. In a **reciprocal translocation** two non-homologous chromosomes exchange segments; in a **Robertsonian translocation** (centric fusion) two acrocentric chromosomes join at or near their centromeres, losing their short arms.

A rearrangement is **balanced** if no genetic material is gained or lost (inversions and reciprocal translocations) and **unbalanced** otherwise.
:::

### Deletions and duplications

A heterozygote for a deletion has only one copy of the genes in the deleted region. If one of those genes carries a recessive allele on the normal homologue, the recessive phenotype appears — **pseudodominance**. Sets of overlapping deletions can therefore be used to locate genes physically: a recessive mutation is uncovered by every deletion that removes its locus and by no other. In *Drosophila*, where the giant **polytene chromosomes** of larval salivary glands show a reproducible pattern of about 5000 bands, deletion heterozygotes form a visible **deletion loop** where the normal homologue has no partner to pair with, and this "deletion mapping" placed thousands of genes on the cytological map. Large deletions are usually lethal when homozygous, and even in heterozygotes they can be harmful through haploinsufficiency; the human condition cri-du-chat syndrome results from deletion of part of the short arm of chromosome 5 (5p−).

Duplications are important in evolution, because a duplicated gene can accumulate mutations in one copy while the other keeps the original function, and so acquire a new function. The globin genes of vertebrates, the opsins of colour vision ([[genetics/sex-linkage-pedigrees]]) and the *Hox* gene clusters arose by successive duplications, an idea developed by Susumu Ohno in *Evolution by Gene Duplication* (1970).

::: example Bar eye and unequal crossing over {#ex-bar}
The *Drosophila* mutation *Bar* reduces the eye to a narrow bar. In 1925 Sturtevant found that homozygous *Bar* stocks occasionally produce flies with normal eyes or with an even smaller "double Bar" eye, and that these changes are accompanied by recombination of flanking markers. In 1936 Bridges and Muller independently saw in polytene chromosomes that *Bar* is a tandem duplication of a short region (band 16A) of the X. Explain the origin of normal and double-*Bar* flies, and why a *B*/*B* fly (two copies of the duplication) and a *BB*/+ fly (double Bar over normal) both carry four copies of 16A yet differ in phenotype.
::: solution
In a *Bar*/*Bar* female, the two tandem copies of 16A on one chromosome can pair out of register with those on the homologue — the first copy of one with the second copy of the other. A crossover within the mispaired region (**unequal crossing over**) gives one chromosome with three copies (double *Bar*) and one with a single copy (normal, wild type), each recombinant for markers on either side, exactly as observed.

*B*/*B* has two copies on each X, *BB*/+ three on one and one on the other: four copies in both. Sturtevant found that *BB*/+ has the smaller eye. The phenotype depends not only on the number of copies but on their arrangement — a **position effect**, the first described. Position effects show that a gene's expression can depend on its chromosomal neighbourhood, an idea developed in [[genomics]].
:::
:::

### Inversions

An inversion heterozygote has a normal chromosome and one with a reversed segment. To pair along their length in meiosis, the two homologues must form an **inversion loop**, in which one chromosome twists back on itself. Crossing over within the loop has serious consequences.

::: proposition Crossing over in an inversion heterozygote {#prop-inversion}
In a heterozygote for a **paracentric** inversion, a single crossover within the inversion loop produces one **dicentric** chromatid (with two centromeres), which forms a bridge at anaphase I and breaks, and one **acentric** fragment, which is lost; both carry deletions. In a **pericentric** inversion, a single crossover in the loop produces two chromatids each carrying a duplication of one end and a deletion of the other. In both cases the two non-crossover chromatids are normal and inversion-carrying, and the recombinant products are unbalanced and usually inviable as gametes or zygotes. Recombinants between loci within the inversion are therefore not recovered: inversions act as **crossover suppressors**.
:::

The proposition follows from tracing the two chromatids involved in a crossover around the loop; textbook diagrams make it vivid, and [[#exr-inversion]] asks you to draw one. In *Drosophila*, where female meiosis directs dicentric chromatids into the polar bodies, paracentric inversions cause little loss of fertility, but recombinant products are still absent from the progeny.

Crossover suppression makes inversions powerful tools. *Drosophila* geneticists maintain recessive lethal mutations in **balancer chromosomes**, which carry multiple overlapping inversions (so that no recombinant survives), a recessive lethal of their own (so that balancer homozygotes die) and a dominant visible marker (so that balancer carriers can be recognised). A stock of genotype *lethal*/*balancer* then breeds true without selection. In nature, inversions keep combinations of alleles together: Theodosius Dobzhansky's studies of inversion polymorphisms in *Drosophila pseudoobscura*, from the 1930s, showed that their frequencies change with altitude and season, and modern genomics has found inversions holding together "supergenes" for complex traits such as the mimicry wing patterns of *Heliconius* butterflies and the social organisation of fire-ant colonies.

### Translocations

A heterozygote for a reciprocal translocation has two normal chromosomes, N1 and N2, and two translocated chromosomes, T1 and T2, each carrying part of N1 and part of N2. In meiosis I the four chromosomes pair as a cross-shaped **quadrivalent**, which can segregate in several ways.

::: definition Translocation segregation {#def-translocation-seg}
- **Alternate segregation**: N1 and N2 go to one pole, T1 and T2 to the other. Both products are balanced: one normal, one carrying the balanced translocation.
- **Adjacent-1 segregation**: each pole receives one normal and one translocated chromosome with non-homologous centromeres (N1 + T2 and N2 + T1). Both products are unbalanced, carrying a duplication and a deficiency.
- **Adjacent-2 segregation**: homologous centromeres go to the same pole. Both products are unbalanced. This is usually the rarest pattern.
:::

If alternate and adjacent-1 segregation are roughly equally frequent, about half the gametes are unbalanced, and translocation heterozygotes are **semisterile**: in plants, about half the pollen is aborted and half the ovules fail to develop. Translocations also cause **pseudolinkage**: genes near the breakpoints on the two non-homologous chromosomes behave as though linked, because in viable (alternate) products N1 always travels with N2 and T1 with T2.

**Robertsonian translocations** fuse two acrocentric chromosomes; the lost short arms carry only repeated ribosomal RNA genes present on other chromosomes too, so the carrier is phenotypically normal with 45 chromosomes. In humans, Robertsonian translocations involving chromosome 21, most often rob(14;21), account for a few per cent of cases of trisomy 21: a carrier can produce a gamete with the fused 14;21 chromosome *and* a normal 21. Chromosome numbers in mammals evolve partly by Robertsonian fusions — the house mouse, with 40 acrocentric chromosomes in its standard karyotype, has populations on islands and in the Alps with as few as 22 chromosomes through repeated fusions.

::: warning "Balanced rearrangements are harmless"
A balanced inversion or translocation carrier has a full set of genes and is usually phenotypically normal, but the rearrangement is not without consequence. Carriers can produce unbalanced gametes at high frequency, reducing fertility and leading to unbalanced offspring; a breakpoint can also disrupt a gene or separate it from its regulatory elements. Conversely, an unbalanced rearrangement need not be visible: many small deletions and duplications (copy-number variants) are found only with genomic methods, and many are common and apparently harmless.
:::

Rearrangements are also central to cancer. In 1960 Peter Nowell and David Hungerford found a small chromosome — the **Philadelphia chromosome** — in the cells of patients with chronic myeloid leukaemia. Janet Rowley showed in 1973 that it is the product of a reciprocal translocation between chromosomes 9 and 22, t(9;22), and in the 1980s the breakpoint was found to fuse the genes *BCR* and *ABL1*, producing a fusion protein with a constantly active tyrosine kinase that drives cell proliferation. The fusion protein became one of the first targets of a designed cancer drug. Barbara McClintock's earlier studies of broken chromosomes in maize (1938–41) had shown that broken ends tend to fuse, forming dicentric chromosomes that break again at the next division — the **breakage–fusion–bridge cycle**, which generates further rearrangements and is now recognised as one source of genome instability in tumours.

::: quiz
A plant is heterozygous for a reciprocal translocation, and about half of its pollen grains are shrivelled and inviable. Which segregation patterns produce the viable pollen?
- [x] Alternate segregation only
- [ ] Adjacent-1 segregation only
- [ ] Alternate and adjacent-1 segregation
- [ ] All patterns, because the pollen is a haploid product
::: solution
Only alternate segregation gives balanced products (N1 + N2 or T1 + T2). Adjacent-1 and adjacent-2 products carry a duplication of one segment and a deficiency of another, and pollen with a deficiency usually aborts. Half viable pollen implies that alternate and adjacent segregation are about equally frequent.
:::
:::

::: history
Calvin Bridges described a deficiency in 1917 and a duplication in 1919; Sturtevant found the first inversion in 1921 (by comparing gene order in *D. melanogaster* and *D. simulans*) and explained *Bar* by unequal crossing over in 1925; Bridges and Muller showed in 1936 that *Bar* is a duplication visible in polytene chromosomes, whose usefulness for cytogenetics Theophilus Painter had shown in 1933. Albert Blakeslee, John Belling and colleagues described trisomics of *Datura* from 1920 and Georgii Karpechenko produced *Raphanobrassica* in 1928. Barbara McClintock described the breakage–fusion–bridge cycle in maize in 1938–41. Joe Hin Tjio and Albert Levan established the human chromosome number as 46 in 1956; in 1959 Jérôme Lejeune, Marthe Gautier and Raymond Turpin found trisomy 21 in Down syndrome, Charles Ford and colleagues the 45,X constitution in Turner syndrome, and Patricia Jacobs and John Strong the 47,XXY constitution in Klinefelter syndrome. Peter Nowell and David Hungerford described the Philadelphia chromosome in 1960 and Janet Rowley identified it as t(9;22) in 1973.
:::

::: summary
- Euploids have whole sets of chromosomes; aneuploids have one or a few extra or missing (monosomy $2n-1$, trisomy $2n+1$). Aneuploidy arises mainly from non-disjunction: at meiosis I all four products are abnormal, at meiosis II half are.
- Aneuploidy is harmful through dosage imbalance; in humans it is common in eggs (rising with maternal age) but few aneuploidies survive to birth (trisomies 21, 18, 13 and sex-chromosome aneuploidies).
- A trisomic *AAa* gives gametes $AA:Aa:A:a = 1:2:2:1$ and a $5:1$ test-cross ratio; an autotetraploid *AAaa* gives $AA:Aa:aa = 1:4:1$ and a $35:1$ F2.
- Odd polyploids are nearly sterile: a triploid with $x$ chromosome types makes balanced gametes with probability $2^{1-x}$. Allopolyploidy (hybridisation plus doubling) creates new species, such as *Raphanobrassica* and bread wheat (AABBDD).
- Deletions uncover recessive alleles (pseudodominance) and map genes; duplications supply raw material for new genes and can arise by unequal crossing over (*Bar*).
- Crossovers within an inversion loop give unbalanced products, so inversion heterozygotes suppress recombination (balancer chromosomes, supergenes).
- Reciprocal translocation heterozygotes are semisterile, since only alternate segregation gives balanced gametes; Robertsonian fusions change chromosome number; translocations such as t(9;22) can drive cancer.
:::

## Exercises

::: exercise Counting chromosomes {level=1 check="47"}
A diploid species has $2n = 46$. How many chromosomes does a trisomic have?
::: solution
$2n + 1 = 47$.
:::
:::

::: exercise Products of non-disjunction {level=1 check="1/2"}
If one pair of sister chromatids fails to separate at meiosis II in one of the two secondary cells, what fraction of the four products of that meiosis are chromosomally normal?
::: solution
Two of the four, from the secondary cell that divides normally: $\tfrac12$ ([[#prop-nondisjunction]]).
:::
:::

::: exercise Naming changes {level=1}
Classify each of the following: (a) $2n - 1$; (b) $3x$; (c) a chromosome whose gene order is ABCFEDGH instead of ABCDEFGH, with the centromere between A and B; (d) a chromosome with the order ABCDEFEFGH; (e) two acrocentric chromosomes fused at their centromeres.
::: solution
(a) Monosomy (aneuploid). (b) Triploidy (euploid polyploid). (c) An inversion of DEF; the centromere lies outside the inverted segment, so it is paracentric. (d) A tandem duplication of EF. (e) A Robertsonian translocation.
:::
:::

::: exercise A tetraploid test cross {level=2 check="5/6"}
An autotetraploid *AAaa* (chromosome segregation, no crossing over between locus and centromere) is crossed with *aaaa*. What fraction of the offspring show the dominant phenotype, if one *A* is enough for it?
::: solution
Gametes from *AAaa* are $AA:Aa:aa = 1:4:1$ ([[#prop-tetraploid]]); only $aa$ ($\tfrac16$) gives *aaaa*. The dominant fraction is $\tfrac56$.
:::
:::

::: exercise A trisomic cross {level=2 check="1/36"}
A trisomic *AAa* plant is self-fertilised. Assume that $n$ and $n+1$ gametes function equally through both eggs and pollen, and that all zygotes survive. What fraction of the offspring have the recessive phenotype?
::: solution
The recessive phenotype requires no *A* at all; among the gametes of [[#eq-trisomic]], only the monosomic $a$ gamete ($\tfrac16$) carries no *A*. Both gametes must be $a$: $(\tfrac16)^2 = \tfrac1{36}$. (In real plants $n+1$ pollen is often at a disadvantage, which increases the recessive fraction.)
:::
:::

::: exercise A triploid with seven chromosome types {level=2 check="1/64"}
A triploid has $x = 7$. Under the assumptions of [[#ex-triploid]], what fraction of its gametes are balanced?
::: solution
$2\times(\tfrac12)^7 = \tfrac1{64}$.
:::
:::

::: exercise Pseudodominance mapping {level=2}
Five overlapping deletions of a *Drosophila* chromosome region are tested against four recessive mutations *a*–*d*. A "+" means the deletion heterozygote shows the wild-type phenotype, "−" means it shows the mutant phenotype.

| | *a* | *b* | *c* | *d* |
|---|---|---|---|---|
| Df1 | − | + | − | + |
| Df2 | + | + | − | − |
| Df3 | − | − | + | + |
| Df4 | + | − | + | + |
| Df5 | − | + | + | + |

Determine the order of the four genes.
::: solution
A "−" means the deletion removes the gene. Df4 removes only *b*, Df5 only *a*, Df3 *a* and *b*, Df1 *a* and *c*, Df2 *c* and *d*. Since deletions remove continuous segments, *a* must be adjacent to both *b* (Df3) and *c* (Df1), so *a* lies between them: *b*–*a*–*c*. Df2 removes *c* and *d* but not *a*, so *d* lies beyond *c*: the order is *b*–*a*–*c*–*d*.
:::
:::

::: exercise Recombination in an inversion heterozygote {#exr-inversion level=3}
A *Drosophila* female is heterozygous for a paracentric inversion covering loci B, C and D on a chromosome with gene order A–B–C–D–E and the centromere to the left of A; the normal homologue carries recessive alleles *a b c d e*, and the inversion chromosome is wild type (A–D–C–B–E). (a) Draw the inversion loop and show the products of a single crossover between C and D. (b) Which of these products can be recovered in her offspring? (c) In a test cross, what do you predict for the recombination frequency between A and E compared with a normal female, and between B and D?
::: solution
(a) In the loop, the normal chromosome runs centromere–A–B–C–D–E, and the inverted one (centromere–A–D–C–B–E) turns back on itself so that its B, C and D lie alongside those of the normal homologue. Follow the two chromatids in the crossover between C and D. One product starts at the normal centromere, runs A–B–C to the crossover, then continues along the inverted chromatid through D and A back to *its* centromere: centromere–A–B–C–D–A–centromere, a **dicentric** chromatid that lacks E. The other product joins the remaining parts, E–B–C–D–E with no centromere: an **acentric** fragment. The two chromatids not involved in the crossover are the intact normal and inverted chromosomes.

(b) Only the non-crossover chromatids. The acentric fragment is lost, and in *Drosophila* females the dicentric bridge holds the two inner chromatids at the centre of the linear set of meiotic products, so that they are not included in the egg nucleus — which receives one of the outer, non-recombinant chromatids. Fertility is therefore hardly reduced.

(c) Recombinants for any pair of loci separated by a crossover within the inversion are not recovered, so recombination between B and D is essentially zero, and recombination between A and E is reduced by the amount that used to occur within B–D (crossovers outside the inversion, between A and B or between D and E, still give recombinants). Double crossovers within the loop involving the same two chromatids can give balanced products, so a little recombination within the inversion can occur.
:::
:::

::: exercise Interpreting semisterility {level=3}
In maize, a plant with about 50 % aborted pollen is crossed as female to a normal plant. Half of its offspring are semisterile and half fully fertile. A recessive mutation *y* (yellow seedlings, on chromosome 6) and a recessive *gl* (glossy leaves, on chromosome 7) show 50 % recombination with each other in normal plants but, in a test cross of a plant that is semisterile and heterozygous for both, almost no recombinants. (a) What is the most likely explanation of the semisterility? (b) Explain the apparent linkage between *y* and *gl*. (c) Why are half the offspring semisterile?
::: solution
(a) The plant is heterozygous for a reciprocal translocation between chromosomes 6 and 7; adjacent segregation gives unbalanced gametes, half of which (or more) abort.

(b) This is pseudolinkage. Only alternate segregation gives viable gametes, so the two normal chromosomes (6 and 7) travel together, as do the two translocated ones. If *y* and *gl* are both on the normal chromosomes (and the translocated ones carry the dominant alleles), and the loci lie near the breakpoints so that crossing over between them and the breakpoint is rare, the viable gametes are almost all *y gl* or + +.

(c) The viable gametes from alternate segregation are either N6 + N7 (normal) or T6 + T7 (balanced translocation), in equal proportions. Fertilised by normal pollen, half the offspring are normal homozygotes and fully fertile, and half are translocation heterozygotes and semisterile.
:::
:::
