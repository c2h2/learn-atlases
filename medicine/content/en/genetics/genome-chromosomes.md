Every cell in your body carries two copies of a 3.2-billion-letter text, split into 46 volumes of very unequal length, folded to fit a nucleus six micrometres across. Most of the folds are correct. The diseases in this course come from the ways the text and the volumes can be wrong: a letter substituted, a paragraph deleted, a whole volume gained or lost, a chapter swapped between volumes, or a volume copied twice in one line of descent and silenced because of which parent it came from.

This chapter is the map and the machinery: what the genome is made of, how it is packaged, how it is distributed when a cell divides and when a child is conceived, and why the errors are not randomly distributed but follow the geometry of chromosomes and the biology of eggs and sperm.

## The genome and its packaging

The human nuclear genome is about $3.2 \times 10^{9}$ base pairs, organised into 23 pairs of chromosomes: 22 pairs of autosomes and one pair of sex chromosomes. The haploid number is $n = 23$; the somatic cell is diploid, $2n = 46$. A typical diploid nucleus therefore contains some 6 metres of DNA in a sphere 6 µm across, compacted about ten thousand-fold.

::: definition Chromosome structure and banding {#def-chromosome}
A metaphase chromosome consists of two sister chromatids joined at the **centromere**, with the short arm labelled **p** (*petit*) and the long arm **q**. Bands are produced by staining (G-banding) and numbered outward from the centromere, so 11p15.5 is the fifth sub-band of band 15 in region 1 of the short arm of chromosome 11 — a precise address, and the way a cytogenetics report names a deletion. **Telomeres** cap the ends with TTAGGG repeats and shelterin proteins; **acrocentric** chromosomes (13, 14, 15, 21, 22) carry their satellites and the ribosomal RNA genes on short stalks and are the ones that can fuse with one another.
:::

Chromosome content is uneven. Gene density is highest in the gene-rich, GC-rich bands of chromosomes 19 and 17 and lowest on the large, AT-rich q arms of chromosome 4; the Y chromosome carries few genes, and the male-specific region contains testis-determining and spermatogenesis genes whose deletion causes infertility. Only about 1–2% of the genome codes for protein; the rest is regulatory sequence, structural sequence (centromeric satellites, telomeric repeats), and — in bulk — the **repetitive DNA** that matters more clinically than its name suggests:

- **Transposable elements**: LINE-1 and *Alu* sequences make up a large fraction of the genome. They are not inert. Insertion of a LINE-1 element caused haemophilia B in a boy whose mother was a carrier, and *Alu* insertions account for a handful of other diseases. Unequal crossing over *between* copies of these elements at different places in the genome is the mechanism of many recurrent microdeletions.
- **Copy-number variants (CNVs)**: deletions, duplications and insertions of segments from a kilobase to several megabases. Some are common and harmless; others are pathogenic. A report of a CNV of "uncertain significance" is a statement that the population data are insufficient, not that the finding is unimportant.
- **Segmental duplications**: near-identical blocks, often containing paralogue genes and pseudogenes. Wherever the genome carries two highly similar copies of the same sequence, pairing in meiosis can slip.

::: definition Genomic disorders and NAHR {#def-genomic}
A **genomic disorder** is a disease caused by a change in copy number of a chromosomal segment, typically arising from **non-allelic homologous recombination (NAHR)**: during meiosis the two chromosomes mis-pair at blocks of segmental duplication, and crossing-over in the mis-aligned configuration deletes a segment on one chromatid and duplicates it on the other. Two consequences follow. First, the same recurrent deletion arises again and again in unrelated families and always has the same size and breakpoints, which is why syndromes such as Williams, DiGeorge (22q11.2) and Prader-Willi/Angelman share their intervals. Second, a parent carrying the reciprocal duplication may transmit, or themselves show, a related but different phenotype.
:::

## Two ways to divide

::: definition Mitosis and meiosis {#def-division}
**Mitosis** produces two diploid daughter cells identical to each other and to the parent: one round of DNA replication, one round of segregation, with sister chromatids separating in anaphase.
**Meiosis** produces haploid gametes from one diploid cell through **two** divisions after **one** replication. In prophase I, homologous chromosomes pair along their length as a bivalent, a synaptonemal complex forms, and **crossing over** between non-sister chromatids creates chiasmata — visible evidence of reciprocal exchange and the physical basis of genetic recombination. In anaphase I *homologues* separate (sisters stay together); in meiosis II, sisters separate. The haploid gamete therefore carries one chromosome of each pair, each a mosaic of the two it came from.
:::

Recombination is not uniform. It is suppressed at the centromere and close to telomeres, elevated in "hotspots" defined largely by the binding site of a zinc-finger protein encoded by *PRDM9*, and differs between the sexes — female maps have fewer crossovers, more often near telomeres, and this contributes to the higher rate of maternal nondisjunction (see [[#thm-nondisjunction]]). The average is roughly one to two crossovers per bivalent, and about 35 genome-wide per meiosis, giving each of the $2^{23}$ possible gametes further variation.

A genetic map distance is defined by recombination: one centimorgan (cM) is the distance over which, on average, 1% recombination is observed. Because double crossovers restore the parental arrangement, observed recombination fraction $r$ underestimates true distance and saturates at 0.5 — the practical reason that unlinked loci and very distant linked loci both give $r = 0.5$.

::: widget plot
f: 50*(1-exp(-x/50)); 0.5*x
x: 0, 200
y: 0, 55
labels: \text{observed recombination}; \text{map distance (linear)}
caption: Recombination fraction $r$ (as a percentage) against true map distance in centimorgans. For small distances (straight line, $r \approx d/2$) linkage is measured almost directly; as distance grows, double crossovers and higher multiples hide exchange, and $r$ approaches 50% — indistinguishable from an unlinked locus. Both axes matter clinically: a marker 5 cM from a disease gene is wrong in about 2.5% of meioses, which is exactly the residual risk that has to be explained when linkage-based, rather than mutation-based, testing is used.
:::

::: theorem Nondisjunction and maternal age {#thm-nondisjunction}
The frequency of chromosome nondisjunction rises steeply with maternal age, chiefly because oocytes complete meiosis decades after it began; paternal age contributes little to aneuploidy but does contribute to new point mutations.
:::

::: proof
Primary oocytes enter meiosis, arrest in prophase I before birth, and are held there until ovulation — for a 40-year-old woman, some four decades. The cohesin that holds sister chromatid arms together is loaded during fetal replication and, in the arrest, is not replaced; its slow loss weakens the physical links that keep the bivalent correctly bioriented, and the chiasmata that resist premature separation of homologues are progressively resolved. The spindle assembly checkpoint in oocytes is also more permissive than in somatic cells, so a bivalent attached in the wrong orientation can still be accepted. Errors therefore rise with the duration of arrest, and they occur in meiosis I (giving gametes with both homologues) more often than in meiosis II. By contrast, spermatogonia divide throughout adult life; each division risks replication errors, and self-renewing stem cells with advantageous mutations expand clonally — which is why new dominant point-mutation disorders such as achondroplasia (*FGFR3*) and multiple endocrine neoplasia type 2B (*RET*) become more likely with advancing paternal age, while trisomy does not.
:::

When nondisjunction occurs at fertilisation, the zygote has three copies of a chromosome (**trisomy**) or none in that pair (**nullisomy**). Most such conceptions miscarry: trisomy is found in a large fraction of spontaneous abortions, yet liveborn trisomy is limited to a handful of chromosomes — 21, 18, 13 and the sex chromosomes — because larger chromosomes carry too many genes to be tolerated in three doses. If the error happens after fertilisation, in the first mitotic divisions, the result is **mosaicism**: two or more cell lines in one individual, whose proportion varies between tissues and therefore determines how mild or severe the phenotype is. A trisomic line can also be eliminated — "**trisomy rescue**" — and if the remaining two chromosomes happen to come from the same parent, the result is **uniparental disomy** (UPD), which is silent unless the chromosome is imprinted or the parent's two homologues carried the same recessive variant.

::: example Recurrent miscarriage and a healthy parent {#ex-translocation}
A couple have had four pregnancy losses and one healthy son. Karyotyping of products of conception shows an unbalanced complement, and the mother's karyotype is 46,XX,t(4;12)(q21;q23) — a balanced reciprocal translocation. Explain the losses, and say what the options are.
::: solution
In a translocation carrier, meiosis puts the two normal chromosomes and the two derivative chromosomes together as a **quadrivalent**. Segregation can be *alternate* — normal plus balanced translocation, both viable — or *adjacent*, giving gametes with partial trisomy for one segment and partial monosomy for another. Alternate segregation is the least common outcome, which is why most conceptions miscarry, and why the risk of a liveborn child with an unbalanced karyotype is nevertheless real (empirically, for a reciprocal translocation, on the order of a few per cent up to about 20% depending on the chromosomes and breakpoints involved, with some translocations carrying unusually high risk). Options to discuss: natural conception with early invasive testing (chorion or villus sampling at 11–13 weeks, or amniocentesis) and karyotype/microarray on the fetal sample; in-vitro fertilisation with preimplantation testing for structural rearrangements, which selects embryos with balanced (or normal) complement and reduces, without eliminating, the chance of a loss — noting that some results are "mosaic" and not fully informative; gamete donation; or adoption. Note also what the son's karyotype will tell you: he is either completely normal or a balanced carrier like his mother, and only the latter has reproductive risk. The genetics centre, not the laboratory report, decides who in the family should be offered testing.
:::
:::

::: example An extra chromosome that runs in the family {#ex-robertsonian}
A three-year-old with Down syndrome has 46 chromosomes, with one normal 21, one normal 14, and a chromosome consisting of 14q joined to 21q. His mother is well. What is the diagnosis, and what determines the recurrence risk?
::: solution
The child has **translocation Down syndrome** due to a Robertsonian (whole-arm) fusion of 14 and 21: he has three copies of the critical region of 21q, which is what causes the phenotype, but only 46 chromosomes. The decisive question is whether the fusion is *de novo* or inherited from a carrier parent. A maternal karyotype showing 45,XX,der(14;21) means she is a balanced Robertsonian carrier: every ovum she makes receives either the derivative or the normal 21 (and the normal or absent 14), and the theoretical risks are dominated by the fact that nullisomy 21 is not compatible with life, so the practical risk of a liveborn child with Down syndrome is roughly 10–15% for a maternal carrier (and lower, a few per cent, for a paternal carrier). If the mother's karyotype is normal, the fusion arose in a germ cell of one parent or in the early zygote, and the recurrence risk is low (about 1%, allowing for germ-line mosaicism). Two further points belong in the same consultation: 21q21 fusions (a 21;21 translocation) carry a 100% risk of an affected pregnancy, because all viable conceptions inherit the derivative, which is why a fetal karyotype is offered after a seemingly "normal" ultrasound and serum screening; and the option of prenatal diagnosis in future pregnancies is what makes the karyotype, not the clinical picture, urgent in a child with Down syndrome.
:::
:::

## Naming what is found

Genetic reports use a compact language, and misreading it causes real harm:

| Term | Meaning | Clinical pitfall |
|---|---|---|
| Locus, allele, variant | A position; one of the sequences found there; a specific sequence difference | A "variant" is a finding, not a diagnosis |
| Homozygous / compound heterozygous | Two copies of the same change / two different pathogenic changes in the same gene | A single heterozygous change does not explain a recessive condition unless the second allele is accounted for |
| Hemizygous | One copy only, as in a male's X-chromosome gene or a deletion | A "carrier" male for an X-linked recessive condition is usually mis-reported; he is hemizygous and affected |
| Mosaic | Two or more cell lines | A negative blood test can miss a mosaic variant present in the affected tissue |
| *De novo* | New in the proband, absent from both parents | Recurrence risk is low but not zero, because of germ-line mosaicism |
| Penetrance, expressivity | Whether the phenotype appears / how severely it appears | An "affected" parent may be a non-penetrant carrier; family history can be falsely reassuring |
| 46,XX and 46,XY | Karyotype formula, with additions such as 47,XX,+21 or del(5p) | A "normal" karyotype reports resolution, not absence of disease |

::: warning A normal karyotype does not exclude a genetic disease, and a normal microarray does not exclude a balanced rearrangement
Each test sees what its resolution allows. A G-banded karyotype detects changes of roughly 5–10 megabases and is the test of choice when a balanced translocation, a low-level mosaic or a sex-chromosome abnormality is suspected; it will miss a single-gene disorder entirely. A chromosomal microarray detects copy-number changes down to tens or hundreds of kilobases — and is the first-line test for unexplained developmental delay, autism and multiple congenital anomalies — but is blind to balanced rearrangements, to most single-gene and repeat-expansion disorders, and often to low-level mosaicism. Sequencing finds sequence variants but not, without specific analysis, copy number, methylation or repeat size. So the question to ask before ordering is not "is the result normal?" but "what has this test had the resolution to exclude, and what is the specific hypothesis?"
:::

::: example A recessive disease in a child of unrelated, well parents — with only one mutant allele found {#ex-upd}
A boy with beta-thalassaemia has an identifiable pathogenic *HBB* variant on testing. His mother carries it; his father does not. Sequence analysis of the whole gene finds no second variant, and his blood counts are otherwise unremarkable for the family history expected. Propose two explanations and how you would distinguish them.
::: solution
Both explanations involve losing the paternal allele rather than mutating it. (i) **Uniparental disomy of chromosome 11**: by trisomy rescue or a gamete-repair mechanism, the child inherited two copies of the maternal chromosome 11 (or of the 11p region), so a maternal recessive variant becomes functionally homozygous — this is the standard explanation for an apparently dominant-seeming recessive disease in a child of a single carrier parent. Test with parental marker or SNP-based copy-number/heterozygosity analysis: segmental or whole-chromosome absence of heterozygosity with normal copy number points to UPD, and methylation studies confirm it if the region is imprinted. (ii) **A deletion of the other allele**: a whole-gene or partial *HBB* deletion on the paternal chromosome would leave a single detectable variant, and is invisible to sequencing that assumes two copies; dosage analysis (MLPA or read-depth from the sequencing data) settles it. Also worth excluding: a variant in a deep intronic or regulatory region, and — rarely — a second, silent *HBB* allele that alters expression. The lesson generalises to every "recessive" disease with one mutation found: ask whether the second hit is a deletion, UPD, or a variant the assay cannot see.
:::
:::

## Where the errors come from, and why some are recurrent

Three mechanisms generate most structural disease, and knowing which one operated tells you about recurrence:

- **Meiotic unequal exchange (NAHR)** between misaligned repeats gives recurrent, identical rearrangements — and hence the possibility of testing a parent and finding a balanced carrier.
- **Errors of repair of double-strand breaks** — non-homologous end joining and its relatives — give breakpoints with no repeat homology, typically unique to the family, essentially never recurring, and often with small insertions or "scarring" at the junction.
- **Stalled replication forks and fork restart** can generate complex rearrangements with many breakpoints in one region (chromoanasynthesis and chromothripsis in tumours), which explains cases in which a child appears to have inherited a normal genome but has a locally shattered chromosome.

Genome-wide, mutation rate in the region of $1 \times 10^{-8}$ per base per generation means that a healthy newborn carries about 60–70 *de novo* single-nucleotide changes relative to its parents, of which one to two fall in coding sequence and a fraction of a per cent are predicted to affect protein function. Most are irrelevant; a minority cause dominant disease and represent new mutations rather than inherited risk.

::: example A count that changes counselling {#ex-hw}
Cystic fibrosis affects about 1 in 2500 live births in a population of northern European ancestry. Estimate the carrier frequency, the risk to a couple in that population in whom no family history is known, and the effect on that estimate if one partner has had a negative test that detects 88% of pathogenic *CFTR* variants.
::: solution
For a rare autosomal recessive condition, incidence $q^2 = 1/2500 = 0.0004$, so the allele frequency $q = 0.02$ and the carrier frequency is $2pq \approx 2q = 0.04$ — one in 25. Two unrelated people from that population therefore have a risk of an affected pregnancy of $1/25 \times 1/25 \times 1/4 \approx 1/2500$, the population incidence, as it must be. A negative test does not reduce the risk to zero: the residual risk is the probability that the person is a carrier whose variant is among the 12% the assay misses, which is $0.04 \times 0.12$ divided by the probability of a negative test (approximately $1 - 0.04 = 0.96$), i.e. about 1 in 200 rather than 1 in 25. Multiplying this through the couple's arithmetic changes the quoted risk by roughly a factor of twenty — which is why a screening result is reported as a residual risk and why screening panels in a population of different ancestry (where both the variant spectrum and the carrier frequency differ) perform worse and must be counselled differently.
:::
:::

::: quiz
A woman has a balanced reciprocal translocation. Her child has developmental delay and a microduplication/microdeletion pattern on microarray. Which mechanism best explains the child's findings?
- [ ] NAHR between segmental duplications.
- [x] Adjacent segregation of the quadrivalent at meiosis, giving a gamete with an unbalanced complement.
- [ ] Nondisjunction in meiosis II.
- [ ] Trisomy rescue.
::: solution
In a translocation carrier the quadrivalent can segregate in ways that put a normal copy of one chromosome and a derivative chromosome into the same gamete; after fertilisation the conceptus is partially trisomic and partially monosomic for the segments involved, which a microarray reports as a gain in one band and a loss in another. NAHR would be the mechanism for a *recurrent* microdeletion between repeats; nondisjunction changes whole chromosome number; trisomy rescue produces uniparental disomy rather than segmental imbalance.
:::
:::

::: history
The chromosome theory was settled early: Walter Sutton and Theodor Boveri argued independently in 1902–1903 that the behaviour of chromosomes at meiosis explains Mendel's laws, Thomas Hunt Morgan found the first X-linked mutation in 1910, and Alfred Sturtevant drew the first linkage map in 1913. Cytogenetics then had to wait for technique. In 1956 Joe Hin Tjio and Albert Levan established that humans have 46 chromosomes; in 1959 Jérôme Lejeune's group and, independently, Claire Jacobs and John Strong identified trisomy 21; in 1960 Peter Nowell and David Hungerford described an abnormally small chromosome in chronic myeloid leukaemia — the Philadelphia chromosome, shown by Janet Rowley in 1973 to be a translocation between chromosomes 9 and 22, and eventually the target of imatinib. Banding methods developed by Lennart Caspersson and Charlotte Zech in the early 1970s made each chromosome identifiable band by band, so that deletions, inversions and marker chromosomes could be diagnosed and, crucially, traced to a parent. Recognition in the 1980s of recurrent microdeletion syndromes led, with the development of fluorescence in-situ hybridisation, to tests that replaced clinical description with a molecular diagnosis; sequencing, available from 1977, moved into routine diagnostics in the 1990s; and from about 2010 single-cell and next-generation methods made it possible to test embryos for single-gene disorders, and to reach a diagnosis for many children whose chromosomes looked normal.
:::

## Where this leads

Chromosomal disorders and their clinical faces are in [[genetics/chromosomal-disorders]]; the patterns in pedigrees in [[genetics/mendelian-inheritance]]; the exceptions to those patterns in [[genetics/non-mendelian-inheritance]]; how a laboratory answers these questions in [[genetics/genetic-testing]]. The machinery of transcription and of variant classification is in [[cell-biochemistry/gene-expression]].

::: summary
- The genome is 3.2 Gb in 23 chromosome pairs; the p/q-arm and band nomenclature gives each finding an address, and gene density is very uneven.
- Repetitive sequence is not junk: segmental duplications and transposable elements are the substrates of NAHR and thus of the recurrent genomic disorders, and their presence determines whether a rearrangement will recur in a family.
- Mitosis makes copies; meiosis, with one replication and two divisions, makes mosaics of the parental chromosomes through crossing over, and halves the genome.
- Recombination fraction saturates at 50%, so map distance and observed recombination are not the same thing; a linked marker is never a perfect proxy for a mutation.
- Nondisjunction rises with maternal age because oocytes wait decades in prophase I; paternal age raises new point-mutation disorders rather than aneuploidy.
- Post-zygotic errors give mosaicism, and trisomy rescue can give uniparental disomy — the explanations for a "recessive" disease in a child of one carrier parent.
- Each test sees only what its resolution allows: karyotype, microarray and sequencing answer different questions, and the question must precede the test.
:::

## Exercises

::: exercise Reading a karyotype {level=1}
Give the karyotype notation for (a) a female trisomy 21; (b) a male monosomy X; (c) a female with a terminal deletion of the short arm of chromosome 5; (d) a male with Klinefelter syndrome.
::: solution
(a) 47,XX,+21. (b) 45,X. (c) 46,XX,del(5p) — in the "cri-du-chat" syndrome the deletion is usually *de novo*, detected at high resolution or by microarray. (d) 47,XXY. Note how the notation records count, sex chromosomes and then any rearrangement, and how much clinical detail is absent: 47,XX,+21 does not say whether the extra chromosome arose in meiosis I or II, or whether the case is a translocation.
:::
:::

::: exercise Two divisions {level=1}
State what separates in anaphase I and in anaphase II of meiosis, and why a meiosis I error in a carrier of a Robertsonian 14;21 translocation can give a gamete with no chromosome 21 material at all.
::: solution
In anaphase I homologous chromosomes (the bivalent) separate, held apart by dissolution of chiasmata; in anaphase II sister chromatids separate. In a 14;21 carrier the meiosis I segregation puts either the derivative chromosome or the normal 21 into each secondary oocyte; if the derivative goes to one pole and the normal 21 (with the normal 14) to the other, the gamete lacking the derivative carries 21 material, while a gamete receiving the derivative but no normal 21 carries two copies of 21q after fertilisation with a normal gamete — trisomy 21 — and a gamete receiving no 21 material at all gives monosomy 21 after fertilisation, which is not compatible with life. That asymmetry is what makes the empirical risk for a carrier mother far from the theoretical one in four.
:::
:::

::: exercise Recombination and map units {level=1 check="10"}
Two markers show a recombination fraction of 0.10 in a large pedigree. What is the map distance, and what does that imply for linkage testing?
::: solution
For small distances, 1% recombination is by definition 1 cM, so the markers are about 10 cM apart. In linkage testing, a marker 10 cM from a disease allele will recombine away from it in about 10% of informative meioses: a result based on that marker is wrong in about 1 in 10 transmissions, so the residual risk quoted to a family must be adjusted accordingly (for example, a 50% prior risk becomes about 45% or 55% depending on the phase and haplotype). This is why diagnostic laboratories prefer to identify the causal variant itself rather than track markers.
:::
:::

::: exercise Carrier arithmetic {level=1 check="0.025"}
In a population, an autosomal recessive disorder has an incidence of 1 in 6400 births. Estimate the carrier frequency, assuming Hardy–Weinberg equilibrium.
::: solution
$q^{2} = 1/6400 = 0.00015625$, so $q = 0.0125$ and the carrier frequency $2pq \approx 2q = 0.025$ — one in 40. Note the assumptions: random mating, no selection, no founder effect and no consanguinity. With consanguinity the risk is not $2pq$-limited at all, because the couple may share an allele identical by descent — hence the much higher rate of recessive disease in the offspring of first-cousin marriages, and the value of taking a proper family history rather than relying on population figures.
:::
:::

::: exercise Why this chromosome, not that one {level=2}
Trisomy 21 is the most common autosomal trisomy in liveborn children, whereas trisomy for most other autosomes is seen only in miscarried or stillborn pregnancies. Explain, and say what this implies for the sensitivity of prenatal screening.
::: solution
Extra genetic dosage is tolerated in proportion to the number and content of the genes carried: chromosome 21 is the smallest autosome and comparatively gene-poor, so trisomy 21 can develop to term, whereas trisomy 16 (the commonest trisomy in miscarriage) cannot. This has a direct effect on screening. Cell-free DNA testing measures placental DNA in maternal plasma, and the fraction of that signal derived from an aneuploid chromosome 21 is diluted when a confined placental mosaicism or a vanishing twin is present; and because trisomy 16 and 22 miscarry so often, their detection is neither needed nor achievable. Screening performance is therefore reported for the conditions it targets (21, 18, 13 and the sex chromosomes), and a low-risk result is not a statement that the fetus has no chromosome abnormality.
:::
:::

::: exercise Mosaic or not {level=2}
A 24-year-old woman has a 45,X cell line in 20% of counted cells in blood but normal stature and no features of Turner syndrome, investigated because of subfertility. Interpret, and say what else you would investigate before counselling her.
::: solution
This is mosaic monosomy X, which may be clinically silent in blood yet clinically relevant in the ovary: mosaic 45,X/46,XX is associated with premature ovarian insufficiency, and the proportion of the 45,X line in blood correlates poorly with gonadal phenotype. Before counselling: repeat or extend the study (a second tissue such as skin fibroblasts, or a higher cell count, since a low-level mosaic line in blood can be a culture artefact or reflect age-related loss of a sex chromosome in lymphocytes), and — critically — look for Y-chromosome material, because a 45,X line with hidden Y sequences (for example mos 45,X/46,XY or marker chromosomes) carries a risk of gonadoblastoma and changes management to gonadal imaging and possible gonadectomy. A fetal karyotype from a pregnancy conceived with assisted reproduction may also reveal confined placental mosaicism, so prenatal results need counselling about the difference between chorion, fetus and baby.
:::
:::

::: exercise Design the test {level=3}
A 9-year-old has global developmental delay, normal brain MRI, one seizure, and no dysmorphic features; parents are unrelated and the family history is uninformative. Outline a diagnostic strategy, in order, and justify each step by what it can and cannot find.
::: solution
First line: chromosomal microarray (with, in most services, Fragile X testing where the presentation and sex make it plausible), because copy-number change explains a meaningful minority of unexplained delay and the result changes recurrence risk (a *de novo* CNV: low; an inherited balanced or penetrance-variable CNV: potentially high) and may point to a surveillance-relevant syndrome. Second: if the microarray is negative, exome or genome sequencing with trio analysis, which raises diagnostic yield substantially; a negative exome does not exclude disease — repeat expansions, deep intronic and regulatory variants, methylation defects, mosaicism below detection, copy-number in regions the pipeline filters and genes of recent, unknown function are all still possible. Third: targeted testing guided by findings — methylation studies for an imprinting disorder if the phenotype suggests one, or a specific repeat assay. Throughout: re-analyse the negative result after a year or two, keep the raw data, and remember that a "variant of uncertain significance" is an ongoing conversation, not a result. And never let a molecular diagnosis displace the clinical one — the child's management plan is written from the phenotype, not from the report.
:::
:::

::: exercise Paternal age {level=3}
A man of 52 and his partner of 28 ask how his age affects their children's risk, having read that older fathers have "more mutations". Give the numbers you would use, and the corresponding counselling.
::: solution
Each year of paternal age adds roughly two cell divisions' worth of replication risk to the sperm, and the de novo single-nucleotide mutation load in offspring rises by about two mutations per year of paternal age, so a child of a 52-year-old man carries on the order of eighty more new point mutations than a child of a 20-year-old. For the small group of disorders caused by specific gain-of-function changes that give the spermatogonial stem cell a proliferative advantage — achondroplasia (*FGFR3*), Apert syndrome (*FGFR2*), thanatophoric dysplasia, MEN2B and neurofibromatosis type 1 (*RET*, *NF1*) — the risk rises several-fold across the paternal-age range, though the absolute risk for any one condition remains low (achondroplasia, for instance, rises from roughly 1 in 100,000 to a few per 100,000 with advancing paternal age). By contrast, the risk of trisomy is driven by maternal age, so their combined profile is dominated by her age-related aneuploidy risk and his mutation-related risk, and the answer to "should we test?" is that neither ultrasound nor sequencing reliably detects these dominant new mutations, whereas the aneuploidy question can be addressed by cell-free DNA testing or diagnostic sampling on the usual indications. Honest counselling also says what the effect size means: for most couples in this situation the absolute increase in risk of a serious condition is small, and paternal age is not, by itself, an indication for invasive testing.
:::
:::
