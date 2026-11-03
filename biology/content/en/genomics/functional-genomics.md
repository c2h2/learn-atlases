A genome sequence is a parts list without an instruction manual. It tells us where the genes are (roughly) and what proteins they could encode, but not which genes are used in a liver cell and which in a neuron, which respond to heat or infection, or which a cell cannot live without. **Functional genomics** answers such questions on the scale of the whole genome: instead of measuring the expression of one gene, it measures all of them at once; instead of mutating one gene and looking for a phenotype, it mutates every gene in parallel and asks which mutations matter.

This chapter covers the two pillars of the field. The first is measuring the **transcriptome** — with RNA sequencing of bulk tissue and of single cells — together with the statistics needed to turn read counts into reliable conclusions: normalisation, overdispersion and the control of false discoveries among tens of thousands of tests. The second is **genome-wide genetic screens**, from the yeast deletion collection to pooled CRISPR screens. Transcription and RNA processing are in [[molecular-biology/transcription]] and [[molecular-biology/rna-processing]]; the CRISPR–Cas9 mechanism in [[molecular-biology/molecular-tools]]; sequencing in [[genomics/sequencing-genomes]].

## The transcriptome

::: definition Transcriptome {#def-transcriptome}
The **transcriptome** of a cell or tissue is the complete set of RNA molecules it contains at a given time — mRNAs, non-coding RNAs, and their alternative isoforms — together with their abundances. Unlike the genome, it differs between cell types, developmental stages and conditions, and changes within minutes in response to signals.
:::

The first genome-wide measurements of expression used **DNA microarrays** (Mark Schena, Patrick Brown, Ronald Davis and colleagues, 1995): glass slides carrying thousands of spots of DNA, one per gene, to which fluorescently labelled cDNA from two samples was hybridised, so that the ratio of the two colours at each spot measured relative expression. Microarrays transformed biology in the late 1990s — Joseph DeRisi and colleagues followed the whole yeast transcriptome through the shift from fermentation to respiration in 1997 — but they measure only sequences printed on the array, saturate at high expression and are noisy at low expression. From 2008 (Ali Mortazavi, Barbara Wold and colleagues in mouse tissues; Ugrappa Nagalakshmi, Michael Snyder and colleagues in yeast), sequencing replaced them.

### RNA sequencing

In **RNA-seq**, RNA is extracted and enriched for the molecules of interest — usually by capturing poly(A) tails, or by depleting ribosomal RNA, which otherwise makes up most of the RNA in a cell. It is converted to cDNA, fragmented, joined to adapters and sequenced as short reads ([[genomics/sequencing-genomes]]). The reads are aligned to the genome with a **spliced aligner** that can split a read across an intron, or assigned to annotated transcripts directly by fast **pseudo-alignment** (kallisto, Nicolas Bray, Lior Pachter and colleagues, 2016) that finds compatible transcripts without computing base-by-base alignments. The output is a table of **counts**: for each gene (or transcript) in each sample, the number of reads assigned to it.

A count is not yet a measure of expression. It depends on how many reads were sequenced from the sample (the **library size**), on the length of the transcript (longer transcripts give more fragments), and on the composition of the rest of the library.

::: definition Normalised expression measures {#def-tpm}
For gene $i$ with count $n_i$ and effective transcript length $\ell_i$ (in kb) in a sample with total count $N = \sum_j n_j$:

- **counts per million**: $\mathrm{CPM}_i = 10^6\,n_i/N$ corrects for library size only;
- **transcripts per million**: first compute the length-normalised rate $\rho_i = n_i/\ell_i$, then

$$
\mathrm{TPM}_i = 10^6\,\frac{\rho_i}{\sum_j \rho_j}.
$$ {#eq-tpm}

TPM estimates the proportion of transcripts (molecules, not bases) in the sample that come from gene $i$, multiplied by $10^6$; the TPM values of a sample sum to $10^6$.
:::

::: example CPM and TPM {#ex-tpm}
A toy transcriptome has three genes. In one sample, gene A (1 kb) has 500 reads, gene B (4 kb) has 1,000 reads and gene C (2 kb) has 500 reads. Compute the CPM and TPM of each, and say which gene has the most transcripts.
::: solution
$N = 2{,}000$, so the CPMs are A 250,000, B 500,000 and C 250,000: by read share, B looks most highly expressed.

Length-normalised rates: $\rho_A = 500/1 = 500$, $\rho_B = 1000/4 = 250$, $\rho_C = 500/2 = 250$, summing to 1,000. TPMs: A 500,000, B 250,000, C 250,000. Gene A has twice as many transcripts as B or C; B received most reads only because each of its transcripts is four times as long and yields four times as many fragments. CPM is appropriate for comparing the *same* gene between samples; TPM for comparing *different* genes within a sample.
:::
:::

Neither CPM nor TPM solves a subtler problem. Sequencing samples a fixed number of reads from whatever RNA is there, so counts are **compositional**: if one gene is massively induced in sample 2, it takes up a larger share of the reads, and every other gene appears to fall, even if its absolute amount has not changed. Methods for comparing samples therefore estimate a **size factor** for each sample from genes assumed mostly unchanged.

::: algorithm Median-of-ratios size factors {#alg-sizefactor}
(Simon Anders and Wolfgang Huber, DESeq, 2010.) Given counts $n_{ij}$ for genes $i$ in samples $j$:

1. For each gene, compute the geometric mean of its counts across samples, $g_i = \bigl(\prod_j n_{ij}\bigr)^{1/m}$ (genes with a zero count are skipped).
2. For each sample $j$, compute the ratios $n_{ij}/g_i$ over all genes.
3. The size factor $s_j$ is the median of these ratios.
4. Normalised counts are $n_{ij}/s_j$.

Because the median ignores the extreme ratios of the few genes that really change, the size factors reflect the bulk of unchanged genes.
:::

::: example Composition bias {#ex-sizefactor}
Two samples have counts for four genes: sample 1: 100, 200, 50, 1,000; sample 2: 210, 380, 110, 6,000. Compare normalisation by total counts with median-of-ratios normalisation.
::: solution
Totals are 1,350 and 6,700, a ratio of 4.96. Dividing by totals would make genes 1–3 appear about 2.3-fold *lower* in sample 2 (for gene 1, $(210/6700)/(100/1350) = 0.42$).

Geometric means: 144.9, 275.7, 74.2, 2,449.5. Ratios for sample 1: 0.690, 0.725, 0.674, 0.408, median 0.682; for sample 2: 1.449, 1.378, 1.483, 2.449, median 1.466. The relative size factor is $1.466/0.682 = 2.15$. After normalisation the fold changes (sample 2 over sample 1) are 0.98, 0.88, 1.02 and 2.79: genes 1–3 are essentially unchanged and gene 4 is induced about 2.8-fold. Gene 4, which took most of the extra reads, was distorting the totals. (With only four genes this is a toy; real data use thousands.)
:::
:::

### Variation between replicates

How different must two normalised counts be before we believe a gene has changed? If reads were drawn at random from a fixed pool of RNA, the count of a gene would be Poisson, with variance equal to its mean. Repeated sequencing of the *same* library does give nearly Poisson counts. But biological replicates — different mice, different cultures — differ in their true expression, and that variation adds to the sampling noise.

::: proposition Overdispersion of RNA-seq counts {#prop-nb}
Suppose the true expression of a gene varies between biological replicates as a gamma-distributed quantity with mean $\mu$ and squared coefficient of variation $\alpha$, and that given the true expression the count is Poisson. Then the count is negative binomial with mean $\mu$ and variance

$$
\Var(n) = \mu + \alpha\mu^2.
$$ {#eq-nb}

The first term is sampling (shot) noise, the second biological variation; $\alpha$ is the **dispersion**, and $\sqrt\alpha$ is the biological coefficient of variation.
:::

::: proof
Let $\Lambda$ be the true expression, with $\E[\Lambda] = \mu$ and $\Var(\Lambda) = \alpha\mu^2$, and $n \mid \Lambda \sim \operatorname{Poisson}(\Lambda)$. By the laws of total expectation and total variance, $\E[n] = \E[\Lambda] = \mu$ and

$$
\Var(n) = \E[\Var(n\mid\Lambda)] + \Var(\E[n\mid\Lambda]) = \E[\Lambda] + \Var(\Lambda) = \mu + \alpha\mu^2.
$$

That the mixture of a Poisson over a gamma distribution is exactly negative binomial is a standard result ([[biostatistics/probability-distributions]]); the variance formula needs only the two moments.
:::

For a gene with $\mu = 100$ reads and a typical dispersion $\alpha = 0.1$ between mice, $\Var(n) = 100 + 1{,}000 = 1{,}100$, a standard deviation of 33 reads, against 10 for a Poisson. Biological variation dominates for all but weakly expressed genes, which is why **biological replicates** matter far more than sequencing depth for detecting differences. Programs such as DESeq2 and edgeR fit negative-binomial models to each gene, borrowing information across genes to estimate the dispersion from a few replicates, and test for differences between conditions.

::: widget plot
f: x; x + a*x^2
x: 0, 1000
sliders: a=0.1:0.01:0.5:0.01
labels: \text{Poisson: } \mu; \text{negative binomial: } \mu + \alpha\mu^2
caption: Variance of an RNA-seq count against its mean $\mu$ (reads), for pure sampling noise (Poisson, variance $=\mu$) and with biological variation of dispersion $\alpha$, by [[#eq-nb]]. At small $\mu$ the curves nearly coincide, because shot noise dominates; at large $\mu$ the quadratic term takes over. With $\alpha = 0.1$, at $\mu = 1000$ the variance is about 100 times the Poisson value. Lower $\alpha$ towards 0.01 — the dispersion typical of genetically identical cultured cells — and see how much longer the Poisson approximation holds.
:::

### Testing thousands of genes

A differential-expression analysis performs one test per gene — 20,000 or more. At a significance threshold of 0.05, about 1,000 genes would be declared significant even if *none* had changed. Two remedies exist. Controlling the **family-wise error rate** (Bonferroni: use $0.05/m$ for $m$ tests) guarantees that the probability of even one false positive is at most 0.05, but at $m = 20{,}000$ the threshold is $2.5\times10^{-6}$ and many real changes are missed. In discovery research it is usually more useful to control the expected *fraction* of false positives among the genes declared significant.

::: proposition The Benjamini–Hochberg procedure {#prop-bh}
Given $m$ independent tests with $P$-values sorted as $p_{(1)} \le p_{(2)} \le \cdots \le p_{(m)}$, let $k$ be the largest $i$ such that

$$
p_{(i)} \le \frac{i}{m}\,q,
$$ {#eq-bh}

and reject the hypotheses with the $k$ smallest $P$-values. Then the **false discovery rate** — the expected proportion of false rejections among all rejections (taken as 0 if there are none) — is at most $q\,m_0/m \le q$, where $m_0$ is the number of true null hypotheses. (Yoav Benjamini and Yosef Hochberg, 1995; the guarantee extends to positively correlated tests.)
:::

The proof is beyond this course (see [[biostatistics/hypothesis-testing]]). The **adjusted $P$-value** (or $q$-value) reported for each gene is the smallest $q$ at which it would be rejected.

::: example Applying Benjamini–Hochberg {#ex-bh}
Ten genes have $P$-values 0.0002, 0.0009, 0.004, 0.006, 0.011, 0.028, 0.04, 0.21, 0.47 and 0.86. Which are significant at an FDR of 5 %, and how does that compare with Bonferroni correction and with an unadjusted threshold of 0.05?
::: solution
The thresholds $iq/m = 0.005i$ are 0.005, 0.010, 0.015, 0.020, 0.025, 0.030, 0.035, 0.040, 0.045, 0.050. Compare: $p_{(1)} = 0.0002 \le 0.005$; $0.0009 \le 0.010$; $0.004 \le 0.015$; $0.006 \le 0.020$; $0.011 \le 0.025$; $0.028 \le 0.030$; $0.04 > 0.035$; and all later ones exceed their thresholds. The largest $i$ that passes is 6, so the six smallest are significant at 5 % FDR.

Bonferroni (threshold $0.05/10 = 0.005$) rejects only the first two. The unadjusted threshold rejects seven, including the gene with $P = 0.04$. In a real analysis of 20,000 genes the differences are far larger: the unadjusted threshold would let through hundreds of false positives.
:::
:::

::: warning A fold change is not a P-value, and neither is a mechanism
A gene can change tenfold and be insignificant (low counts, high variation) or change by 10 % and be overwhelmingly significant (high counts, many replicates). Report both, and read them together, as in a "volcano plot" of $-\log_{10}P$ against $\log_2$ fold change. And a change in mRNA is not a change in protein: mRNA and protein levels across genes correlate only moderately, because translation and protein degradation are regulated too ([[molecular-biology/translation]]). Most importantly, an expression difference between conditions shows that a gene *responds*, not that it *causes* the difference: genetic perturbations, later in this chapter, are needed for that.
:::

## Single-cell transcriptomics

A tissue is a mixture of cell types, and a bulk RNA-seq profile is an average over them. A gene that appears to double in expression may have doubled in every cell, or a cell type that expresses it may have doubled in number. Since the first single-cell RNA-seq experiment (Fuchou Tang, Azim Surani and colleagues, 2009, on individual mouse blastomeres), methods have scaled from tens of cells to millions per experiment.

The most widely used approach captures cells in **droplets**. A microfluidic device mixes a stream of cells with a stream of beads, each carrying millions of primers that share a **cell barcode** unique to that bead, and encloses them in nanolitre droplets of oil-separated buffer. In each droplet the cell is lysed and its mRNAs are captured and reverse-transcribed with the bead's barcode attached. Each primer also carries a random **unique molecular identifier** (UMI), so that PCR copies of one original molecule can be recognised and counted once. After sequencing, reads are grouped by cell barcode and counted by UMI, giving a matrix of genes by cells (Evan Macosko, Steven McCarroll and colleagues, Drop-seq; Allon Klein, Marc Kirschner and colleagues, inDrop; both 2015).

Cells are loaded at random, so the number of cells in a droplet is approximately Poisson.

::: proposition Droplet loading {#prop-doublet}
If cells are distributed among droplets as a Poisson process with mean $\lambda$ cells per droplet, the fraction of droplets containing at least one cell is $1 - e^{-\lambda}$, and among these the fraction containing two or more (**multiplets**) is

$$
\frac{1 - e^{-\lambda} - \lambda e^{-\lambda}}{1 - e^{-\lambda}} \approx \frac{\lambda}{2}\quad(\lambda \ll 1).
$$ {#eq-doublet}
:::

The derivation is immediate from the Poisson probabilities $P(0) = e^{-\lambda}$ and $P(1) = \lambda e^{-\lambda}$; the approximation follows from expanding the exponentials to second order. Experimenters therefore load cells dilutely, accepting that most droplets are empty, and use computational doublet detection to remove the rest.

::: example How many doublets? {#ex-doublet}
In a droplet experiment, cells are loaded at $\lambda = 0.05$ per droplet. (a) What fraction of droplets contain a cell? (b) What fraction of the cell-containing droplets are multiplets? (c) If the experimenter doubles the loading to recover more cells, what happens?
::: solution
(a) $1 - e^{-0.05} = 0.0488$: about 4.9 % of droplets.

(b) $(1 - e^{-0.05} - 0.05e^{-0.05})/0.0488 = 0.0012/0.0488 = 0.025$: about 2.5 % of "cells" are actually two or more cells sharing a barcode.

(c) At $\lambda = 0.1$, 9.5 % of droplets have cells (nearly twice as many) but the multiplet fraction also doubles, to 4.9 %. Doublets of two different cell types look like a cell expressing both programmes — a spurious intermediate state — so the trade-off between throughput and purity is a real constraint.
:::
:::

::: widget plot
f: (1 - exp(-x) - x*exp(-x))/(1 - exp(-x)); 1 - exp(-x)
x: 0.01, 1
y: 0, 0.7
labels: \text{multiplets among occupied droplets}; \text{droplets occupied}
caption: Droplet loading by [[#prop-doublet]], against the mean number of cells per droplet $\lambda$ (horizontal axis). The fraction of droplets that receive a cell (cell recovery) and the fraction of occupied droplets that hold two or more cells (multiplets) both rise roughly in proportion to $\lambda$ at low loading. At $\lambda = 0.5$, 39 % of droplets are occupied but 23 % of them hold multiplets. Hover to read off values: there is no loading that gives many cells and few doublets, which is why sample multiplexing with barcoded antibodies or genotypes, which lets doublets of different samples be detected, became common.
:::

Single-cell data are sparse: a typical cell yields a few thousand UMIs, and most genes are detected in only a fraction of the cells that express them. Analysis therefore aggregates: cells are normalised and projected onto a few dozen principal components; they are clustered by similarity; clusters are named as cell types by their marker genes; and continuous processes such as differentiation are ordered in **pseudotime**. The results have produced cell atlases of whole organisms — the mouse (Tabula Muris, 2018), *Drosophila* and *C. elegans*, and the ongoing Human Cell Atlas — and revealed previously unknown cell types, such as the pulmonary ionocyte, a rare airway cell that expresses most of the lung's *CFTR* transcripts (two groups, 2018). **Spatial transcriptomics** methods add the position of each measurement in a tissue section, by capturing RNA on barcoded arrays or by imaging individual molecules *in situ*.

::: warning What a two-dimensional map of cells does and does not show
Single-cell papers display cells as points in two dimensions, computed by t-SNE or UMAP. These maps preserve local neighbourhoods reasonably well, so nearby points are similar cells. But distances between clusters, the sizes of clusters and the apparent continuity of "trajectories" are largely set by the algorithm and its parameters, not by the biology. Do not read relationships between cell types off distances in such plots; test them in the high-dimensional data, and with lineage tracing where development is the question.
:::

## Beyond the transcriptome

RNA levels are one layer. Other genome-wide readouts use sequencing in the same way, as a counting device:

- **Ribosome profiling** (Nicholas Ingolia, Jonathan Weissman and colleagues, 2009, in yeast) sequences the ~30-nucleotide mRNA fragments protected by ribosomes from nuclease digestion, mapping translation genome-wide at codon resolution; it revealed widespread translation of short upstream open reading frames.
- **Chromatin and binding maps** — chromatin accessibility (ATAC-seq), protein–DNA binding (ChIP-seq, CUT&RUN), DNA methylation — map the regulatory landscape; they are the subject of [[genomics/epigenomics]].
- **Massively parallel reporter assays** test tens of thousands of candidate regulatory sequences at once, each placed upstream of a reporter carrying a sequence barcode; the RNA abundance of each barcode measures the activity of its sequence.
- **Mass-spectrometry proteomics** measures thousands of proteins (without sequencing) and their modifications ([[structural-biology]]).

Large consortia have compiled such data into reference maps: ENCODE (from 2003) for human and mouse regulatory elements, and GTEx (Genotype-Tissue Expression, from 2010), which measured expression in some 50 tissues from nearly a thousand deceased donors and mapped the genetic variants that influence it ([[genomics/association-studies]]).

::: quiz
In a bulk RNA-seq comparison of inflamed and healthy tissue, the gene for a protein expressed only by a type of immune cell appears 8-fold higher in inflamed tissue. Which conclusion is justified without further data?
- [ ] Each immune cell of that type expresses the gene 8 times more strongly during inflammation.
- [x] The gene's mRNA is more abundant in the inflamed tissue, which could reflect more of those cells, higher expression per cell, or both.
- [ ] The protein causes the inflammation.
- [ ] The protein is 8 times more abundant in inflamed tissue.
::: solution
Bulk RNA-seq measures the average over all cells. An increase can come from changes in cell composition (immune cells infiltrate inflamed tissue) or from changes in expression per cell; single-cell data or deconvolution with cell-type markers can tell them apart. mRNA does not determine protein abundance exactly, and an association with the inflamed state does not show causation.
:::
:::

## Genome-wide genetic screens

Expression tells us what a cell does; mutation tells us what it needs. A **forward genetic screen** starts from a phenotype and finds the genes responsible, classically by random mutagenesis followed by mapping ([[genetics/genes-and-mutation]]). A **reverse genetic screen** starts from the genes — all of them — and asks what happens when each is disrupted.

### Systematic collections

The model was set by the **yeast deletion collection** (Elizabeth Winzeler, Ronald Davis and colleagues, 1999; Guri Giaever and colleagues, 2002): a strain in which each of the roughly 6,000 genes of *S. cerevisiae* was replaced by a selectable marker flanked by two unique 20-nucleotide **molecular barcodes**. About 1,100 genes (roughly 18 %) proved essential for growth on rich medium. Because each strain carries barcodes, all can be grown together in a single pooled culture; the abundance of each barcode, measured on an array or by sequencing, then reports the fitness of each mutant under any condition. Most non-essential deletions had no visible phenotype in standard conditions, but nearly all showed a growth defect in some environment or in combination with another deletion — the beginning of genome-wide maps of genetic interactions.

In animals, **RNA interference** made comparable screens possible: in *C. elegans*, feeding worms bacteria that express double-stranded RNA against a gene silences it, and Andrew Fraser, Julie Ahringer and colleagues screened the genes of chromosome I in this way in 2000, and Ravi Kamath, Ahringer and colleagues most of the genome in 2003. RNAi in mammalian cells was less effective and prone to off-target effects, and the field was transformed by CRISPR.

### Pooled CRISPR screens

In a pooled **CRISPR knockout screen** (Ophir Shalem, Feng Zhang and colleagues; Tim Wang, Eric Lander, David Sabatini and colleagues; both 2014), a library of tens of thousands of single-guide RNAs (sgRNAs), typically four or more per gene, is introduced into a population of cells that express Cas9, at a dose low enough that most cells receive one guide. Each guide directs Cas9 to its target gene, where error-prone repair of the cut usually creates a frameshift that inactivates the gene ([[molecular-biology/molecular-tools]]). The guide sequence is integrated into the cell's genome, so it doubles as a barcode. The population is grown, or exposed to a drug, or sorted for a phenotype; guides are then counted by sequencing, before and after.

::: proposition Guide depletion and fitness {#prop-screen}
Suppose cells carrying a guide against gene $g$ divide at a rate $w$ times that of the bulk population ($w$ is the relative growth rate; $w = 1$ for a neutral guide), and the bulk population undergoes $D$ doublings during the screen. Then the change in the guide's share of the library, as a base-2 logarithm, is

$$
\log_2\mathrm{FC} = (w - 1)\,D.
$$ {#eq-screen}
:::

::: proof
After $D$ doublings of the bulk, a subpopulation dividing $w$ times as fast has undergone $wD$ doublings, so its abundance relative to the bulk has changed by a factor $2^{wD}/2^D = 2^{(w-1)D}$. Taking $\log_2$ gives [[#eq-screen]]. (This assumes exponential growth throughout and that the knockout takes effect at the start; in practice gene inactivation and protein turnover take several days, so early time points under-estimate the effect.)
:::

::: example Reading a fitness screen {#ex-screen}
In a screen lasting 14 population doublings, the four guides against gene $X$ are depleted on average to one-eighth of their initial share, while non-targeting control guides are unchanged. Estimate the relative growth rate of $X$-knockout cells. A guide against gene $Y$ is enriched 4-fold. What might that mean?
::: solution
$\log_2\mathrm{FC} = -3 = (w - 1)\times14$, so $w = 1 - 3/14 = 0.79$: knockout cells divide about 21 % more slowly, completing 11 doublings while the bulk completes 14. Gene $X$ is a **fitness gene** in this cell line, though not necessarily strictly essential (a fully essential gene would show stronger depletion as the knockout cells stop dividing).

Enrichment of $\log_2\mathrm{FC} = 2$ gives $w = 1 + 2/14 = 1.14$: losing $Y$ makes cells grow faster. $Y$ may restrain proliferation — a tumour-suppressor-like gene in the cell line studied, such as *TP53* in cells with intact p53 signalling. Before concluding, check that the guides agree with each other, that the effect is not due to the DNA damage caused by Cas9 cutting (a known confounder in amplified regions), and that it replicates.
:::
:::

::: widget plot
f: (w - 1)*x
x: 0, 20
y: -6, 3
sliders: w=0.8:0:1.3:0.01
labels: \log_2\mathrm{FC}
hlines: 0
caption: The expected log₂ fold change of a guide in a pooled fitness screen, by [[#eq-screen]], against the number of doublings of the bulk population $x$, for knockout cells with relative growth rate $w$. Guides against neutral genes stay on the line $\log_2\mathrm{FC} = 0$. At $w = 0.8$, depletion reaches $-3$ (eightfold) after 15 doublings; move $w$ towards 0.95 and the signal after 15 doublings shrinks to less than one unit, comparable with the noise between guides. Longer screens detect weaker effects, at the cost of time and of drift in guide representation.
:::

Variants of the design use a catalytically dead Cas9 fused to a repressor (**CRISPR interference**) or an activator (**CRISPR activation**) to lower or raise expression without cutting, which allows non-coding regulatory elements to be screened too; base editors introduce specific point mutations to test the effects of individual variants. **Perturb-seq** (Atray Dixit, Aviv Regev and colleagues; Britt Adamson, Jonathan Weissman and colleagues; 2016) reads out each cell's guide together with its whole transcriptome by single-cell RNA-seq, so that the consequences of thousands of perturbations can be measured in one experiment.

::: application Cancer dependency maps
Pooled CRISPR screens across many human cancer cell lines identify genes that some lines need and others do not. Since 2016 the Cancer Dependency Map project (DepMap, run by the Broad Institute and the Wellcome Sanger Institute among others) has screened more than a thousand cell lines. About 2,000 genes are needed by nearly all lines ("core fitness genes": ribosome, spliceosome, DNA replication). The more interesting ones are selective: for example, cancer cells with mutations that inactivate the chromatin regulator gene *ARID1A* depend on its paralogue *ARID1B*, and cells with microsatellite instability depend on the helicase WRN. Such dependencies are starting points for drug discovery; clinical questions belong to [Medicine Atlas](/learn/medicine/).
:::

::: history
Genome-wide expression analysis began almost as soon as genomes were sequenced: serial analysis of gene expression (SAGE), by Victor Velculescu, Kenneth Kinzler and Bert Vogelstein (1995), counted short sequence tags from transcripts, and the cDNA microarray of Mark Schena and colleagues appeared the same year. The yeast deletion collection (1999–2002) and genome-wide RNAi in *C. elegans* (2000–2003) established systematic reverse genetics. RNA-seq replaced arrays from 2008; single-cell transcriptomics began in 2009 and reached the scale of thousands of cells per experiment with droplet methods in 2015. Pooled CRISPR screens, reported in 2014, made genome-wide loss-of-function genetics routine in human cells.
:::

::: summary
- The transcriptome ([[#def-transcriptome]]) is measured by RNA-seq: reads are counted per gene. CPM corrects for library size, TPM also for transcript length ([[#def-tpm]]); comparisons between samples need size factors robust to compositional changes ([[#alg-sizefactor]]).
- Counts are overdispersed relative to the Poisson: $\Var(n) = \mu + \alpha\mu^2$ ([[#prop-nb]]), so biological replicates are essential.
- Thousands of tests require multiple-testing control; the Benjamini–Hochberg procedure ([[#prop-bh]]) controls the false discovery rate. Fold changes, significance and causation are different things.
- Single-cell RNA-seq uses cell barcodes and UMIs; droplet loading is Poisson, so throughput trades against multiplets ([[#prop-doublet]]). Low-dimensional maps show neighbourhoods, not distances between cell types.
- Genome-wide screens — barcoded deletion collections, RNAi, pooled CRISPR knockout, interference and activation screens — measure the fitness effect of every gene; guide depletion relates to relative growth rate by $\log_2\mathrm{FC} = (w - 1)D$ ([[#prop-screen]]).
:::

## Exercises

::: exercise TPM {level=1 check="2000000/7"}
A sample has three genes: gene A, 2 kb, 400 reads; gene B, 1 kb, 300 reads; gene C, 5 kb, 1,000 reads. What is the TPM of gene A?
::: solution
Length-normalised rates: $\rho_A = 400/2 = 200$, $\rho_B = 300/1 = 300$, $\rho_C = 1000/5 = 200$, summing to 700. $\mathrm{TPM}_A = 10^6\times200/700 = 2.857\times10^5$ (exactly $2\times10^6/7$). Gene C has the most reads but the same number of transcripts as A.
:::
:::

::: exercise Negative-binomial variance {level=1 check="2600"}
A gene has mean count 200 and dispersion 0.06 between biological replicates. What is the variance of its count?
::: solution
$\Var = 200 + 0.06\times200^2 = 200 + 2{,}400 = 2{,}600$ (standard deviation 51).
:::
:::

::: exercise Expected false positives {level=1 check="900"}
A study tests 18,000 genes at an unadjusted threshold of $P < 0.05$. If no gene is truly differentially expressed, how many are expected to be declared significant?
::: solution
$18{,}000\times0.05 = 900$.
:::
:::

::: exercise Benjamini–Hochberg by hand {level=2}
Eight $P$-values are 0.001, 0.008, 0.012, 0.019, 0.04, 0.045, 0.3, 0.7. Which are significant at FDR 10 %?
::: solution
Thresholds $i\times0.1/8 = 0.0125i$: 0.0125, 0.025, 0.0375, 0.050, 0.0625, 0.075, 0.0875, 0.100. Passes: 0.001 ≤ 0.0125; 0.008 ≤ 0.025; 0.012 ≤ 0.0375; 0.019 ≤ 0.050; 0.04 ≤ 0.0625; 0.045 ≤ 0.075; 0.3 > 0.0875; 0.7 > 0.1. The largest passing $i$ is 6, so the six smallest are significant.
:::
:::

::: exercise Loading cells {level=2 check="0.0967"}
What fraction of occupied droplets contain two or more cells when the loading is $\lambda = 0.2$ cells per droplet? Give three significant figures.
::: solution
$e^{-0.2} = 0.81873$ and $0.2e^{-0.2} = 0.16375$, so $P(\ge1) = 0.18127$ and $P(\ge2) = 1 - 0.81873 - 0.16375 = 0.01752$. The multiplet fraction is $0.01752/0.18127 = 0.0967$, close to the approximation $\lambda/2 = 0.1$.
:::
:::

::: exercise Replicates or depth? {level=2}
A researcher has budget for either (a) two biological replicates per condition at 60 million reads each, or (b) six replicates per condition at 20 million reads each. For a gene with mean 500 reads at 20 million reads and dispersion 0.05, compare the variance of a single replicate's normalised count in each design, and recommend a design.
::: solution
At 20 million reads, $\mu = 500$: variance $= 500 + 0.05\times500^2 = 500 + 12{,}500 = 13{,}000$; the coefficient of variation is $\sqrt{13{,}000}/500 = 0.23$. At 60 million reads, $\mu = 1{,}500$: variance $= 1{,}500 + 0.05\times1{,}500^2 = 1{,}500 + 112{,}500 = 114{,}000$, CV $= 337.6/1{,}500 = 0.225$. Tripling the depth barely reduces the CV, because biological variation dominates ($\sqrt{0.05} = 0.224$). The precision of the condition mean scales with the number of replicates: with six replicates its standard error is about $0.23/\sqrt6 = 0.094$ against $0.225/\sqrt2 = 0.16$. Design (b) is much better; and two replicates give a very poor estimate of the dispersion itself.
:::
:::

::: exercise A screen with a slow-acting knockout {level=2}
In a 12-doubling screen, guides against a gene encoding a very stable protein (half-life several days) show $\log_2\mathrm{FC} = -1$, whereas guides against a gene encoding an unstable protein that is equally essential show $\log_2\mathrm{FC} = -5$. Explain the difference, and how the screen design could reduce it.
::: solution
After the gene is disrupted, existing protein persists and is diluted only by cell division and degradation. For a very stable protein, cells keep dividing normally for several doublings, so the effective number of doublings with reduced growth is smaller than 12 and [[#eq-screen]] (which assumes the effect starts immediately) overestimates $w$. An unstable protein disappears quickly, so the phenotype starts early. Longer screens, measuring an early time point rather than the plasmid library as the baseline, and comparing late with intermediate time points reduce the bias; CRISPR knockouts are also delayed by the time needed for editing in every cell.
:::
:::

::: exercise Interpreting a single-cell experiment {level=3}
Single-cell RNA-seq of a developing organ yields 12 clusters. One small cluster expresses marker genes of two other clusters (an epithelial and an immune type) at about the sum of their usual levels, and its cells have about twice the median number of UMIs. A second small cluster expresses a combination of markers not seen together before, at normal UMI counts, and is found in all four biological replicates in similar proportions. (a) What is the most likely explanation of the first cluster? (b) What evidence supports the second being a real cell type? (c) What experiment would confirm it?
::: solution
(a) Doublets: droplets containing one epithelial and one immune cell, which show both expression programmes and about twice the RNA content. Doublet-detection software and removal of high-UMI outliers should remove them; if samples were multiplexed with genotypes or barcoded antibodies, inter-sample doublets can be identified directly.

(b) Normal UMI counts argue against doublets; reproducibility in all four replicates at similar proportions argues against a technical or sample-specific artefact; a coherent marker combination (not merely the union of two programmes) suggests a distinct state.

(c) Detect the combination of markers in intact tissue — by multiplexed RNA *in situ* hybridisation or immunostaining for two or three of the markers — to show that single cells co-express them and to locate the cells in the organ; then isolate the cells (by sorting on surface markers) to characterise their function, and use lineage tracing to establish where they come from. This is how the pulmonary ionocyte was confirmed.
:::
:::

::: exercise Interpreting a CRISPR screen {level=3}
A pooled knockout screen in a cell line treated with a drug compares guide abundances after 10 doublings with drug against 10 doublings without. Guides against gene $P$ are enriched 16-fold in the drug-treated population, while having no effect without the drug. Guides against gene $Q$ are depleted 4-fold in both conditions. (a) Interpret $P$ and $Q$. (b) Propose a molecular hypothesis for $P$. (c) Why are several independent guides per gene essential?
::: solution
(a) Losing $P$ makes cells resistant to the drug (with drug, $\log_2\mathrm{FC} = 4$, so knockout cells grow $w = 1 + 4/10 = 1.4$ times as fast as the bulk, which is inhibited by the drug), but has no effect on growth otherwise. $Q$ is a general fitness gene ($\log_2\mathrm{FC} = -2$ regardless of drug, $w = 0.8$) and tells us nothing about the drug specifically: the comparison between conditions removes it.

(b) $P$ may be required for the drug's action — for example, a transporter that brings the drug into the cell, an enzyme that converts a prodrug into its active form, or the drug's target itself, if the drug acts by poisoning the target (as topoisomerase poisons do) rather than by inhibiting it.

(c) Each guide can have off-target cuts elsewhere in the genome, variable editing efficiency, or effects caused by DNA damage at its target. Consistent effects of several guides with different sequences against the same gene make an on-target explanation far more likely; validation then uses individual knockouts and rescue with a guide-resistant copy of the gene.
:::
:::
