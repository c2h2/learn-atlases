Almost every cell in your body carries the same genome, yet a neuron, a hepatocyte and a keratinocyte use very different parts of it — and when they divide, their daughters remember which parts. A fibroblast divides into fibroblasts, not into neurons, although nothing in its DNA sequence has changed. Part of that memory lies in the transcription factors that each cell type expresses and that maintain their own expression; part lies in chemical marks on the DNA and on the histones around which it is wrapped, which can be copied when a cell divides. These marks, mapped across the genome, form the **epigenome**: a second layer of information, different in every cell type, layered over a genome that is the same in all of them.

This chapter is about that layer: what epigenetic information is, how DNA methylation and histone modifications are established, maintained and mapped, how they combine into chromatin states, and two classic cases of epigenetic control in mammals — genomic imprinting and X-chromosome inactivation. It ends with the question of whether epigenetic states can be inherited across generations, where the evidence differs sharply between plants, worms and mammals. The molecular machinery — DNA methyltransferases, the main histone marks, Polycomb and Trithorax — is introduced in [[molecular-biology/eukaryotic-gene-regulation]]; here we take a genome-wide view.

## What "epigenetic" means

The word has a history that explains its ambiguity. Conrad Waddington coined "epigenetics" in 1942 for the study of how genotypes give rise to phenotypes through development, and drew the famous **epigenetic landscape**: a ball rolling down a surface of branching valleys, representing a cell committing step by step to a fate from which it does not easily return. Molecular biology gave the word a narrower meaning.

::: definition Epigenetic inheritance {#def-epigenetic}
An **epigenetic** state is a heritable state of gene activity — transmitted through mitosis, and sometimes through meiosis — that does not depend on a difference in DNA sequence. Its molecular carriers include DNA methylation, histone modifications and variants, chromatin structure, non-coding RNAs, and self-sustaining feedback loops of transcription factors. The **epigenome** of a cell is the genome-wide distribution of these marks.
:::

In current usage "epigenetic" is often stretched to mean any chromatin mark, whether or not it is heritable, or any effect of the environment on gene expression. The distinction matters. A histone acetylation that appears when a gene is switched on and disappears when the activator leaves is a feature of chromatin, but not a memory. The test of an epigenetic mark is whether it persists, and influences gene activity, after the signal that set it has gone.

## DNA methylation

In mammals, DNA methylation means almost exclusively the addition of a methyl group to carbon 5 of cytosines in the dinucleotide CpG (a C followed by a G on the same strand, written CpG to distinguish it from a C–G base pair). Because CpG is its own reverse complement, a methylated site is methylated on both strands, and that symmetry is the key to its inheritance ([[molecular-biology/eukaryotic-gene-regulation]]): after replication each site is **hemimethylated**, and the maintenance methyltransferase DNMT1, guided by its partner UHRF1, methylates the new strand opposite a methylated parental cytosine. The de novo methyltransferases DNMT3A and DNMT3B set new patterns, and TET dioxygenases oxidise 5-methylcytosine to 5-hydroxymethylcytosine and further, a route to active demethylation discovered in 2009 (Mamta Tahiliani, Anjana Rao and colleagues).

Other organisms differ greatly. Plants methylate cytosines in CG, CHG and CHH contexts (H = A, C or T), with separate enzymes for each. Many insects methylate only gene bodies, sparsely; *Drosophila melanogaster*, *Caenorhabditis elegans* and the budding yeast have essentially no 5-methylcytosine at all — a reminder that complex development does not require it.

### CpG depletion and CpG islands

Mammalian genomes contain far fewer CpGs than their base composition predicts. The reason is mutational: 5-methylcytosine deaminates spontaneously to thymine, producing a T·G mismatch that is not always repaired correctly, so methylated CpGs mutate to TpG (and CpA on the other strand) roughly ten times faster than other sites. Over evolutionary time, the CpGs of methylated DNA have been worn away. The exceptions are **CpG islands**: stretches of a few hundred to a few thousand base pairs, found at the promoters of about 60–70 % of human genes, that are kept unmethylated in most cells and so retain their CpGs.

::: definition CpG observed/expected ratio and CpG islands {#def-cpg}
In a sequence of length $L$ containing $n_C$ cytosines, $n_G$ guanines and $n_{CG}$ CpG dinucleotides, the **observed/expected CpG ratio** is

$$
\frac{\text{obs}}{\text{exp}} = \frac{n_{CG}}{n_C\,n_G/L},
$$ {#eq-cpg}

the number of CpGs divided by the number expected if C and G were placed independently. A widely used operational definition (Margaret Gardiner-Garden and Marianne Frommer, 1987) calls a region a **CpG island** if it is at least 200 bp long, has a G+C content above 50 % and an observed/expected CpG ratio above 0.6.
:::

::: example Is it a CpG island? {#ex-cpg}
(a) A 500-bp region upstream of a gene contains 140 C, 135 G and 32 CpG dinucleotides. (b) A 500-bp region in an intergenic stretch contains 105 C, 100 G and 5 CpGs. Calculate the G+C content and observed/expected ratio of each and classify them. (c) The human genome is about 41 % G+C, and CpG makes up about 1 % of its dinucleotides. What is its genome-wide observed/expected ratio?
::: solution
(a) G+C $= 275/500 = 55$ %. Expected CpGs $= 140\times135/500 = 37.8$, so obs/exp $= 32/37.8 = 0.85$. Both criteria are met: a CpG island.

(b) G+C $= 205/500 = 41$ %; expected CpGs $= 105\times100/500 = 21$; obs/exp $= 5/21 = 0.24$. Not an island: typical bulk DNA.

(c) With C and G each at about 20.5 %, the expected frequency of the dinucleotide CpG is $0.205^2 = 0.042$; observed 0.01, so obs/exp $\approx 0.24$. The bulk of the genome has lost about three-quarters of its expected CpGs, the signature of long-term methylation and deamination.
:::
:::

### Where methylation is, and what it does

A human somatic cell has about 28 million CpG sites per haploid genome, of which typically 70–80 % are methylated. The pattern is strikingly bimodal: most CpGs in bulk DNA, gene bodies and transposons are methylated; most CpG islands are not. Methylation of a CpG-island promoter is associated with stable silencing — of genes on the inactive X, of imprinted alleles, of germline-specific genes in somatic cells, and of tumour-suppressor genes in many cancers. Methylation of transposable elements keeps them silent; mice lacking DNMT1 die as embryos with massive activation of retrotransposons. Gene-body methylation, by contrast, is higher in *active* genes, and its function is unclear.

Is methylation a cause of silencing or a consequence? Both. Methyl-CpG-binding proteins recruit histone deacetylases and other repressors, and methylated CpGs block the binding of some transcription factors; but in many cases a promoter is first silenced by other means and then methylated, which "locks" the silent state. Methylation is best thought of as a stabiliser of decisions taken by other means.

### How stable is a methylation pattern?

Maintenance is efficient but not perfect, and de novo methylation is not confined to development. A simple model shows how a stable level arises from these imperfect processes.

::: proposition A two-rate model of methylation inheritance {#prop-maintenance}
Consider a CpG site in a population of dividing cells. Suppose that at each division a methylated site remains methylated with probability $m$ (maintenance efficiency) and an unmethylated site becomes methylated with probability $d$ (de novo rate), independently. If $x_n$ is the fraction of cells in which the site is methylated after $n$ divisions, then

$$
x_{n+1} = m\,x_n + d\,(1 - x_n),\qquad x_n = x^\ast + (x_0 - x^\ast)(m - d)^n,\qquad x^\ast = \frac{d}{1 - m + d}.
$$ {#eq-maintenance}

The methylation level converges geometrically to $x^\ast$ at rate $m - d$ per division.
:::

::: proof
A site methylated after division was either methylated before and maintained (probability $x_nm$) or unmethylated and methylated de novo (probability $(1 - x_n)d$), which gives the recurrence. Its fixed point satisfies $x^\ast = mx^\ast + d(1 - x^\ast)$, so $x^\ast(1 - m + d) = d$. Subtracting the fixed-point equation from the recurrence gives $x_{n+1} - x^\ast = (m - d)(x_n - x^\ast)$, whose solution is the stated geometric approach, provided $\lvert m - d\rvert < 1$.
:::

The model is crude — it treats sites as independent and ignores the cooperativity by which methylated neighbours promote methylation, which is needed to explain the bimodal pattern — but it makes two points. First, without de novo activity ($d = 0$), even 99 % maintenance erodes methylation to $0.99^{100} = 37$ % after 100 divisions; a stable pattern needs ongoing correction. Second, the steady state is set by the *ratio* of the rates, so modest changes in DNMT activity shift methylation levels genome-wide, as happens in ageing and in cancer.

::: example Inhibiting maintenance {#ex-dnmt1}
In a cell line, a CpG site is methylated in 90 % of cells, consistent with $m = 0.995$ and $d = 0.045$. A drug that partially inhibits DNMT1 lowers maintenance efficiency to $m = 0.90$ without affecting $d$. (a) What is the new steady state? (b) How many divisions does it take for the distance from the new steady state to halve? (c) What is the methylation level after 10 divisions?
::: solution
(a) Before: $x^\ast = 0.045/(0.005 + 0.045) = 0.90$. After: $x^\ast = 0.045/(0.10 + 0.045) = 0.31$.

(b) The distance shrinks by the factor $m - d = 0.855$ per division, so it halves in $\ln 0.5/\ln 0.855 = 4.4$ divisions.

(c) $x_{10} = 0.31 + (0.90 - 0.31)\times0.855^{10} = 0.31 + 0.59\times0.209 = 0.43$. Demethylation by inhibiting maintenance is passive: it requires cell division, and non-dividing cells keep their methylation. This is how the nucleoside analogues used to inhibit DNA methylation in research and in some cancer treatments act — only on cells that replicate their DNA.
:::
:::

::: widget plot
f: d/(1 - m + d) + (1 - d/(1 - m + d))*(m - d)^x
x: 0, 100
y: 0, 1
sliders: m=0.97:0.8:1:0.005; d=0.03:0:0.2:0.005
labels: x_n
caption: The fraction of cells methylated at a CpG site after $x$ cell divisions, starting fully methylated, by [[#eq-maintenance]], with maintenance efficiency $m$ and de novo rate $d$ (illustrative values). With $m = 0.97$ and $d = 0.03$ the level settles at 50 %. Set $d$ to 0 and methylation decays steadily towards zero, however high $m$ is; raise $d$ and the steady state rises. The steady state depends only on the balance $d/(1 - m + d)$, so at a site where measurements in a cell population show 50 % methylation, individual cells are switching in both directions.
:::

### Mapping methylation

The standard method converts the epigenetic difference into a sequence difference.

::: definition Bisulfite sequencing {#def-bisulfite}
Treating denatured DNA with sodium bisulfite deaminates unmethylated cytosine to uracil, while 5-methylcytosine reacts much more slowly and remains cytosine (Marianne Frommer and colleagues, 1992). After PCR, uracil is read as thymine. Comparing reads with the reference, a C that remains C at a CpG was methylated, and a C read as T was not. **Whole-genome bisulfite sequencing** applies this to the whole genome; the **methylation level** at a site is the fraction of reads covering it that report C.
:::

Bisulfite treatment does not distinguish 5-methylcytosine from 5-hydroxymethylcytosine; variants of the method do. It also damages DNA, and enzymatic conversion methods that avoid this are increasingly used. Single-molecule long-read sequencing reads 5-methylcytosine directly from the native DNA ([[genomics/sequencing-genomes]]), and methylation arrays measure several hundred thousand selected CpGs per sample cheaply, which made them the workhorse of large population studies.

::: example Estimating a methylation level {#ex-bisulfite}
At a CpG site, 24 bisulfite reads cover the C: 18 report C and 6 report T. (a) Estimate the methylation level with an approximate 95 % confidence interval. (b) Bisulfite conversion of unmethylated cytosines is 99.5 % efficient in this experiment. Correct the estimate. (c) What does a level of 75 % mean biologically?
::: solution
(a) $\hat\beta = 18/24 = 0.75$. The binomial standard error is $\sqrt{0.75\times0.25/24} = 0.088$, so the interval is about $0.75 \pm 1.96\times0.088 = (0.58, 0.92)$. With 24 reads, a methylation level is only roughly determined.

(b) A read reports C if the site was methylated (probability $\beta$) or if it was unmethylated but failed to convert (probability $(1 - \beta)(1 - c)$, with conversion efficiency $c$). So $0.75 = \beta + (1 - \beta)\times0.005$, giving $\beta = (0.75 - 0.005)/0.995 = 0.749$. The correction matters little here, but it matters for sites with low methylation, such as CpG islands, where non-conversion can be mistaken for methylation.

(c) Each DNA molecule is either methylated or not at this site (on both strands, usually). A level of 75 % means that about three-quarters of the molecules sampled carried the methyl group — perhaps all the cells of one type and none of another in a mixed tissue, or a mixture within one cell type, or one allele fully methylated in most cells and the other partly. Methylation levels from tissues are averages over cells, just like bulk RNA-seq ([[genomics/functional-genomics]]).
:::
:::

::: widget distribution
dist: binomial
params: n=24, p=0.75
a: 15
b: 21
caption: The number of reads reporting C at a CpG site whose true methylation level is $p$, among $n$ bisulfite reads: binomial. With $n = 24$ and $p = 0.75$, 15 to 21 reads (shaded) cover about 91 % of the probability, so observed levels from about 63 % to 88 % are all consistent with the same true value. Increase $n$ to 100 and the distribution tightens: differences between samples of a few percentage points, typical of studies of the environment's effect on methylation, need deep coverage or many samples to detect.
:::

::: application Epigenetic clocks
In 2013 Steve Horvath, and separately Gregory Hannum and colleagues, showed that the methylation levels of a few hundred CpGs, combined by penalised regression, predict the chronological age of a tissue donor to within a few years across many tissues. Such **epigenetic clocks** are used in research on ageing, in forensic science, and in ecology to estimate the ages of wild animals (whales, bats, birds) that cannot otherwise be aged. The difference between predicted and actual age ("age acceleration") is correlated with mortality in human cohorts, but what the clock CpGs measure mechanistically is not settled, and commercial tests that claim to measure "biological age" go well beyond the evidence.
:::

## Histone modifications and chromatin states

The nucleosome core particle carries histone tails that are acetylated, methylated, phosphorylated and ubiquitylated at specific residues ([[molecular-biology/dna-structure]] for the nucleosome, [[molecular-biology/eukaryotic-gene-regulation]] for the marks). Each mark is written by specific enzymes, read by proteins with specific binding domains, and erased by others. Mapped genome-wide, a few marks have proved especially informative:

| mark | typical location | association |
|---|---|---|
| H3K4me3 | promoters, around the transcription start site | active or poised promoters |
| H3K4me1 | enhancers | enhancers, active or primed |
| H3K27ac | active promoters and enhancers | activity |
| H3K36me3 | bodies of transcribed genes | ongoing elongation |
| H3K27me3 | broad domains over developmental genes | Polycomb repression |
| H3K9me3 | pericentromeric regions, transposons, zinc-finger gene clusters | constitutive heterochromatin |

(Here H3K27ac means acetylation of lysine 27 of histone H3, and me1, me3 mono- and trimethylation.)

### Mapping chromatin

**Chromatin immunoprecipitation followed by sequencing** (ChIP-seq, 2007: Artem Barski, Keji Zhao and colleagues; David Johnson, Richard Myers and colleagues; Tarjei Mikkelsen, Bradley Bernstein and colleagues) cross-links proteins to DNA in cells, fragments the chromatin, and uses an antibody against a histone mark or a DNA-binding protein to pull down the fragments that carry it; the fragments are sequenced and mapped, and regions where they pile up are the sites of the mark. Newer methods tether a nuclease (CUT&RUN, Peter Skene and Steven Henikoff, 2017) or a transposase (CUT&Tag, 2019) to the antibody in intact nuclei, cutting out only the bound regions and needing far fewer cells. **Chromatin accessibility** is mapped by the preference of DNase I, or of a hyperactive Tn5 transposase loaded with sequencing adapters (ATAC-seq, Jason Buenrostro, William Greenleaf and colleagues, 2013), for nucleosome-free DNA: accessible regions are promoters, enhancers and insulators bound by transcription factors.

Every one of these methods produces a pile-up of reads that must be distinguished from background. The usual statistical approach models the background count in a window as Poisson.

::: example Is this a peak? {#ex-peak}
In a ChIP-seq experiment, the background (estimated from an input-DNA control, scaled to the same depth) predicts 2 reads per 200-bp window. One window contains 15 reads. (a) What is the probability of 15 or more reads in a window by chance? (b) The genome has about $1.55\times10^7$ such windows. How many windows would reach 15 reads by chance? (c) Why do peak callers use a *local* background estimate rather than a genome-wide one?
::: solution
(a) With a Poisson background of mean 2, $P(X \ge 15) = 1 - \sum_{k=0}^{14}e^{-2}2^k/k! = 3.9\times10^{-9}$.

(b) $1.55\times10^7\times3.9\times10^{-9} = 0.06$: almost certainly none, so this window is a real enrichment at any sensible threshold. A threshold of 8 reads ($P = 1.1\times10^{-3}$) would, by contrast, produce about 17,000 false windows.

(c) Background varies along the genome: open chromatin fragments more easily, copy-number gains and repeats raise read depth, and GC content affects amplification. A peak caller such as MACS (Yong Zhang, Xiaole Shirley Liu and colleagues, 2008) estimates $\lambda$ from the control over the surrounding 1–10 kb and takes the largest of several estimates, so that locally inflated background is not called as signal.
:::
:::

::: widget distribution
dist: poisson
params: lambda=2
a: 8
b: 30
caption: The number of reads falling in a 200-bp window of a ChIP-seq experiment by chance, when the background predicts a mean of $\lambda$ reads per window. The shaded tail, 8 or more reads, has probability about 0.001 at $\lambda = 2$ — small for one window, but there are some fifteen million windows in a human genome. Raise $\lambda$ to 4, as in a region of locally elevated background, and the same tail grows about fiftyfold, to 0.05: the importance of estimating background locally.
:::

### Chromatin states

Marks are combinatorial. A promoter with H3K4me3 and H3K27ac is active; one with H3K4me3 and H3K27me3 together is **bivalent**, a state found at developmental genes in embryonic stem cells (Bradley Bernstein and colleagues, 2006) that is thought to keep them silent but ready for activation. Rather than interpret each mark separately, methods such as ChromHMM (Jason Ernst and Manolis Kellis, 2010) segment the genome into a small number of **chromatin states**, learned as the hidden states of a hidden Markov model whose emissions are the presence or absence of each mark in 200-bp bins.

::: definition Chromatin state {#def-chromatin-state}
A **chromatin state** is a recurring combination of chromatin marks (histone modifications, accessibility, sometimes DNA methylation and bound proteins) that characterises a class of genomic elements, such as active promoters, strong enhancers, transcribed regions, Polycomb-repressed regions or heterochromatin. States are defined statistically from the data and named after the fact by their association with genes and expression.
:::

The Roadmap Epigenomics Consortium (2015) mapped such states across 111 human reference epigenomes from tissues and cell types. Two results stand out. First, the states that change most between cell types are at enhancers, not promoters: promoters of housekeeping genes look similar everywhere, while the enhancer repertoire is what defines a cell type. Second, the genetic variants associated with complex diseases are enriched in enhancers active in the relevant tissues — immune-cell enhancers for autoimmune diseases, for example — a link developed in [[genomics/association-studies]].

::: warning A mark that correlates with activity is not necessarily its cause
H3K4me3 at promoters and H3K27ac at enhancers are excellent *markers* of activity, but correlation across the genome does not show that the mark causes transcription. Several marks are deposited as a consequence of transcription (H3K36me3 by an enzyme that travels with elongating RNA polymerase II), and experiments in which the modified lysine is replaced by another amino acid — possible in *Drosophila*, where the histone genes can be replaced by engineered arrays — show that some marks thought essential have surprisingly mild effects, while others (H3K27, the Polycomb target) are indispensable. Causality has to be tested by perturbing the mark, not inferred from maps.
:::

### Can histone marks be inherited?

DNA methylation has a clear copying mechanism. Histone marks face a problem: at replication, the parental histones are distributed between the two daughter DNA molecules, and new, unmodified histones fill the gaps, so each mark is diluted by half. A mark can be restored only if its writer is recruited by the mark itself — a **read–write feedback**. Polycomb repressive complex 2 (PRC2) is the best-understood case: its subunit EED binds H3K27me3, which stimulates the complex's methyltransferase activity on neighbouring nucleosomes (Raphael Margueron, Danny Reinberg and colleagues, 2009). In experiments in which the sequence elements that initially recruit Polycomb are removed, H3K27me3 domains can persist through some cell divisions but are gradually lost (for example, in *Drosophila*, Laprell and colleagues, and Coleman and Struhl, both 2017), suggesting that histone-based memory needs reinforcement from DNA sequence. The same is true of heterochromatin in fission yeast, where an H3K9me3 domain established artificially can be propagated for many generations only if the demethylase that erases it is removed.

## Genomic imprinting

In 1984, two laboratories — James McGrath and Davor Solter, and Azim Surani, Sheila Barton and Michael Norris — made mouse embryos with two maternal or two paternal genomes by transplanting pronuclei. Neither kind developed to term: embryos with two maternal genomes made a relatively normal embryo but poor extra-embryonic tissues, and those with two paternal genomes the reverse. The two parental genomes are not equivalent.

::: definition Genomic imprinting {#def-imprinting}
A gene is **imprinted** if its expression depends on the parent from which it was inherited: one allele (maternal or paternal, depending on the gene) is expressed and the other is silent in some or all tissues. The parental identity is marked by differential DNA methylation at **imprinting control regions** (ICRs), established in the germ line of one sex, maintained in the embryo through the genome-wide demethylation that follows fertilisation, and erased and re-established in the primordial germ cells of the next generation.
:::

About 150–200 genes are imprinted in mice and humans, many of them clustered and many affecting growth of the embryo and placenta. The *Igf2*–*H19* locus is the best-understood example. *Igf2* (a growth factor) is expressed from the paternal allele and the non-coding *H19* from the maternal allele; between them lies an ICR that is methylated only on the paternal chromosome. On the maternal chromosome the unmethylated ICR binds the insulator protein CTCF, which blocks the shared enhancers downstream of *H19* from reaching *Igf2*, so they activate *H19* instead. On the paternal chromosome, methylation prevents CTCF from binding, the enhancers reach *Igf2*, and the methylation spreads to silence *H19* (Adam Bell and Gary Felsenfeld; Amy Hark, Shirley Tilghman and colleagues; both 2000). The mechanism depends on the folding of the chromosome into loops, the subject of [[genomics/nuclear-organisation]].

Why should imprinting exist, when it exposes the organism to the effects of a single active allele? The best-supported explanation is the **kinship (conflict) theory** of David Haig and colleagues. In species where a mother may carry offspring by different fathers, paternally inherited genes in an embryo gain from extracting more maternal resources than is optimal for the mother, whose genes are equally represented in all her offspring; maternally inherited genes gain from restraint. The theory predicts that paternally expressed imprinted genes tend to promote growth and maternally expressed ones to restrain it — as *Igf2* (paternal, growth-promoting) and *Igf2r* (maternal, which encodes a receptor that removes IGF2) do — and that imprinting should be found where offspring draw resources from the mother after fertilisation: in placental mammals and in the endosperm of flowering plants, both of which have it.

Imprinting disorders in humans — such as Prader–Willi and Angelman syndromes, caused by the loss of paternal or of maternal expression in the same region of chromosome 15 — show the consequences of losing the expressed allele; their clinical features belong to [Medicine Atlas](/learn/medicine/).

::: quiz
A mouse carries a deletion of the *Igf2* gene. When the deletion is inherited from the father, the pups are small; when it is inherited from the mother, they are normal-sized. What explains this?
- [ ] The deletion is dominant when inherited from the father and recessive when inherited from the mother.
- [x] *Igf2* is expressed only from the paternal allele, so a paternal deletion removes all expression and a maternal deletion removes only a silent copy.
- [ ] Maternal *Igf2* compensates through higher expression.
- [ ] Mitochondrial inheritance makes maternal alleles irrelevant.
::: solution
Because the maternal allele of *Igf2* is silenced by imprinting, the paternal allele provides all of the gene's expression. Losing the paternal allele removes it; losing the maternal one changes nothing. This was the experiment (Thomas DeChiara, Elizabeth Robertson and Argiris Efstratiadis, 1991) that first identified an imprinted gene in mice by its pattern of inheritance.
:::
:::

## X-chromosome inactivation

Female mammals have two X chromosomes and males one; dosage is equalised by silencing one X in each female cell, as Mary Lyon proposed in 1961 from the mosaic coat colours of female mice heterozygous for X-linked coat-colour genes. (The tortoiseshell and calico coats of female cats are the familiar example.) In the early embryo of eutherian mammals, each cell chooses at random which X to inactivate, and its descendants keep the same choice, so a female is a mosaic of clones. Inactivation is initiated by the long non-coding RNA *XIST* (mouse *Xist*), transcribed from the X that will be silenced and coating it in *cis*; it recruits silencing complexes, followed by Polycomb marks, histone deacetylation and finally methylation of the CpG-island promoters along the chromosome, which locks the silent state. The inactive X condenses into the Barr body. In marsupials, and in the extra-embryonic tissues of mice, the paternal X is inactivated preferentially, an imprinted form of the process. X inactivation is the clearest example of a whole chromosome's epigenetic state being set in one cell and inherited by millions of descendants.

## Reprogramming and transgenerational inheritance

In mammals, two waves of genome-wide reprogramming erase most methylation. After fertilisation, the paternal genome is actively demethylated (by TET3) and the maternal genome passively, by dilution through cell divisions, before new patterns are laid down around implantation; imprinting control regions are protected. In the primordial germ cells, methylation — including that of imprints — is erased almost completely and re-established according to the sex of the embryo. Reprogramming is why a fertilised egg can become every cell type, and also why epigenetic states rarely pass from parent to offspring in mammals.

Other organisms are different.

- **Plants** have no segregated germ line set aside early in development and reprogram less completely. Heritable **epialleles** — alleles that differ in methylation, not sequence — are well documented. In 1999 Pilar Cubas, Coral Vincent and Enrico Coen showed that the radially symmetrical "peloric" mutant of toadflax (*Linaria vulgaris*) described by Linnaeus carries a heavily methylated, silenced *Lcyc* gene with an unchanged sequence, and occasional reversion to the normal flower form occurs by loss of methylation. In *Arabidopsis*, epialleles generated in methylation-deficient lines can be stable for many generations.
- **Nematodes**: in *C. elegans*, small RNAs that silence a gene can be inherited for several generations, maintained by RNA-dependent RNA polymerases.
- **Mammals**: robust cases are few. In mice carrying the *agouti viable yellow* (*A^vy^*) allele, a retrotransposon inserted upstream of the *agouti* gene is variably methylated, and the coat colour of offspring is influenced by that of the mother (Hugh Morgan, Emma Whitelaw and colleagues, 1999) — but the effect depends on a transposon and is not representative of most genes. Claims that the experiences of human ancestors (such as famine) are transmitted to descendants through epigenetic marks are based on correlations in small cohorts and are confounded by shared environment, intrauterine exposure and genetics; no mechanism of transmission through the human germ line has been demonstrated.

::: warning Epigenetics does not overturn genetics
Popular accounts often present epigenetics as proof that "genes are not destiny" or as a revival of the inheritance of acquired characteristics. Neither follows. Epigenetic marks are themselves written by enzymes encoded in the genome, guided largely by DNA sequence (CpG islands, transcription-factor binding sites, transposons); many differences in methylation between people are explained by nearby genetic variants. Mitotic epigenetic memory is fundamental to development, but transgenerational epigenetic inheritance in mammals is rare and usually lasts a generation or two. Environmental influences on chromatin are real, but most are reversible responses rather than heritable memories.
:::

::: history
Conrad Waddington introduced "epigenetics" in 1942 and the epigenetic landscape in 1957. In 1975 Robin Holliday and John Pugh, and independently Arthur Riggs, proposed that the methylation of CpG could be copied by a maintenance enzyme recognising hemimethylated sites, providing a mechanism for the inheritance of gene activity states; DNMT1 was cloned by Timothy Bestor and colleagues in 1988. Mary Lyon proposed X inactivation in 1961, and the pronuclear transplantation experiments of 1984 demonstrated genomic imprinting. Bisulfite sequencing (1992) made methylation readable at single-base resolution, and the first single-base-resolution methylomes of whole genomes were published for *Arabidopsis* in 2008 and for human cells in 2009 (Ryan Lister, Joseph Ecker and colleagues). The ENCODE (2012) and Roadmap Epigenomics (2015) consortia mapped the human epigenome across cell types.
:::

::: summary
- An epigenetic state ([[#def-epigenetic]]) is a heritable state of gene activity not due to sequence; not every chromatin mark is epigenetic in this sense.
- In mammals, DNA methylation occurs at CpG; deamination of 5-methylcytosine has depleted CpGs genome-wide, except in mostly unmethylated CpG islands ([[#def-cpg]]). Methylation stabilises silencing of transposons, imprinted and X-linked genes and some promoters.
- Methylation patterns persist through a balance of maintenance and de novo methylation ([[#prop-maintenance]]); they are mapped by bisulfite sequencing ([[#def-bisulfite]]), arrays and long reads, with binomial sampling error.
- Histone marks are mapped by ChIP-seq, CUT&RUN and CUT&Tag, accessibility by ATAC-seq; peaks are called against a local Poisson background. Combinations of marks define chromatin states ([[#def-chromatin-state]]), which vary between cell types mainly at enhancers. Correlation of a mark with activity does not establish causation.
- Genomic imprinting ([[#def-imprinting]]) silences one parental allele through germline-specific methylation of imprinting control regions; the kinship theory explains its distribution. X inactivation silences one X in female mammals via *XIST*.
- Mammals reprogram methylation in the early embryo and germ line, so transgenerational epigenetic inheritance is rare; it is well documented in plants and nematodes.
:::

## Exercises

::: exercise Observed/expected CpG {level=1 check="0.7"}
A 1,000-bp region has 280 C, 250 G and 49 CpG dinucleotides. What is its observed/expected CpG ratio?
::: solution
Expected $= 280\times250/1000 = 70$; obs/exp $= 49/70 = 0.70$. With G+C $= 53$ % and length ≥ 200 bp, it meets the Gardiner-Garden–Frommer criteria for a CpG island.
:::
:::

::: exercise Steady-state methylation {level=1 check="0.8"}
In the model of [[#prop-maintenance]], what is the steady-state methylation level when $m = 0.99$ and $d = 0.04$?
::: solution
$x^\ast = 0.04/(1 - 0.99 + 0.04) = 0.04/0.05 = 0.8$.
:::
:::

::: exercise Reading bisulfite reads {level=1}
Three bisulfite-converted reads cover the sequence `5'-ACGTTCGA-3'` (reference). Read 1: `ATGTTTGA`; read 2: `ACGTTCGA`; read 3: `ACGTTTGA`. Assuming complete conversion, give the methylation status of the two CpGs on each read.
::: solution
The CpGs are at positions 2–3 and 6–7. Read 1: both Cs read as T — both CpGs unmethylated. Read 2: both Cs remain C — both methylated. Read 3: the first C remains C (methylated), the second reads as T (unmethylated). Each CpG is methylated on 2 of 3 reads, but the reads show that the molecules differ in their pattern: methylation levels at individual sites hide the patterns on individual molecules.
:::
:::

::: exercise Loss without de novo activity {level=2 check="0.366"}
If de novo methylation stopped ($d = 0$) and maintenance efficiency were 0.99 per division, what fraction of the initially methylated sites would remain methylated after 100 divisions? Give three significant figures.
::: solution
$x_{100} = 0.99^{100} = 0.366$. Even very efficient maintenance cannot preserve a pattern indefinitely without correction; stable patterns over many divisions imply continuing de novo activity or cooperative maintenance.
:::
:::

::: exercise Imprinting crosses {level=2}
A gene is expressed only from the maternal allele. A female heterozygous for a null allele ($+/-$) is crossed with a wild-type male. (a) What fraction of the offspring lack expression? (b) The same cross is done with a heterozygous male and a wild-type female. What fraction now lack expression? (c) A $-/+$ offspring of cross (b), with the null allele from the father, has children by a wild-type partner. If it is a daughter, what fraction of her children lack expression?
::: solution
(a) Half the offspring inherit the null allele from the mother; their only expressed allele is null, so half lack expression.

(b) The null allele comes from the father and is silent anyway; all offspring express the gene from their maternal wild-type allele. None lack expression.

(c) The imprint is reset in the germ line according to the sex of the parent. A daughter passes on her alleles with a maternal imprint, so the null allele, inherited by half her children, is now the expressed allele: half lack expression. The phenotype "skips" generations according to the sex of the transmitting parent — the pedigree signature of imprinting.
:::
:::

::: exercise Peak calling with a local background {level=2}
A window has 12 reads. The genome-wide background is 2 reads per window, but the local background estimated from the control in the surrounding 10 kb is 6 reads per window, because the region is amplified in the cell line. Calculate $P(X \ge 12)$ under each background, and decide whether this is a peak.
::: solution
With $\lambda = 2$: $P(X \ge 12) = 1.3\times10^{-6}$ — strongly significant for one window, and only about 20 such windows expected genome-wide. With $\lambda = 6$: $P(X \ge 12) = 0.020$ — across $10^7$ windows, hundreds of thousands would reach 12 reads in regions of equal background. Using the local background, there is no convincing evidence of a peak: the excess of reads is explained by the copy-number gain.
:::
:::

::: exercise Testing the kinship theory {level=3}
(a) Explain why the kinship theory predicts no imprinting in a strictly monogamous species. (b) The theory predicts that paternally expressed imprinted genes promote growth of the embryo and placenta. How does the reciprocal phenotype of *Igf2* and *Igf2r* knockouts fit this? (c) Suggest a comparison across species that could test the theory.
::: solution
(a) If all of a mother's offspring share the same father, the paternal genes in one embryo are equally represented in its siblings, and the interests of paternal and maternal genes in maternal resources coincide; there is no conflict to drive opposite allele-specific expression.

(b) Paternal *Igf2* knockouts are small (loss of a growth promoter expressed paternally); maternal *Igf2r* knockouts are large (loss of a maternally expressed restraint, which normally removes IGF2). The two parental genomes push in opposite directions on the same pathway, as the theory predicts.

(c) Compare imprinting at orthologous genes across species that differ in mating system and in the degree of post-fertilisation maternal investment — for example, monogamous and promiscuous species of *Peromyscus* mice, whose hybrids show growth effects consistent with conflict, or plants that self-fertilise versus outcross (selfing removes the conflict in the endosperm). The theory predicts weaker imprinting, or imprinting of fewer genes, in monogamous or selfing lineages. The absence of imprinting in egg-laying monotremes and in birds, where the mother provisions the egg before fertilisation, is consistent with it.
:::
:::

::: exercise Interpreting an epigenome-wide association {level=3}
A study measures methylation at 450,000 CpGs in blood from 500 smokers and 500 non-smokers and finds a CpG in the gene *AHRR* methylated at 72 % in non-smokers and 64 % in smokers, with $P = 10^{-40}$ (illustrative numbers). (a) Is the difference large or small, and why is it so significant? (b) Blood is a mixture of cell types whose proportions change with smoking. Why is this a problem, and how is it handled? (c) Can such data show that the methylation change causes any of the harmful effects of smoking? What would be needed?
::: solution
(a) The difference is 8 percentage points — moderate per site — but with 1,000 samples and a small variance between people of the same group it is estimated very precisely; even after Bonferroni correction for 450,000 tests ($P < 1.1\times10^{-7}$) it is overwhelmingly significant. (Lower methylation of *AHRR* in smokers is one of the most consistently replicated findings of such studies.)

(b) Each cell type has its own methylation pattern, so a shift in the proportions of white-cell types changes the average methylation of blood without any change within cells. Studies estimate cell-type proportions from methylation itself, using reference profiles of sorted cell types, and include them as covariates; or they sort cells before measuring.

(c) No. The association can be a consequence of smoking without mediating its harm — *AHRR* is a target of the aryl hydrocarbon receptor pathway that responds to compounds in smoke, so its methylation may simply report exposure. Evidence for causation would need intervention (altering methylation at the site, for instance by targeted epigenome editing in cells, and measuring downstream effects), genetic approaches (variants that alter methylation at the site, used as instruments), and a plausible mechanism linking the gene's expression to an outcome.
:::
:::
