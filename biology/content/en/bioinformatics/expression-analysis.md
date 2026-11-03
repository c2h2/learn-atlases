Treat cultured cells with a hormone and some of their genes are switched on or off within hours. Which ones? Before 2008 the answer came from microarrays, glass slides carrying probes for known genes. Since then it has come mostly from **RNA sequencing** (RNA-seq): extract RNA, convert it to cDNA, sequence tens of millions of fragments, and count how many come from each gene. The counts are a measurement of expression for every gene at once, including genes no one knew to look for. But the counts are not expression levels. They depend on how deeply each sample was sequenced, on gene length, on which other genes are highly expressed, and on biological variation between replicates that is much larger than the sampling noise of sequencing. And with twenty thousand genes tested at once, hundreds will look differentially expressed by chance.

This chapter covers the statistical pipeline that turns reads into a credible list of differentially expressed genes: quantification, normalisation, count models with overdispersion, generalised linear models and dispersion shrinkage, the control of false discovery rates, and the clustering, visualisation and enrichment analyses that help interpret the results. Read mapping is assumed from [[bioinformatics/assembly-variants]], and linear and generalised linear models, hypothesis tests and the Benjamini–Hochberg procedure from [[biostatistics/linear-models]] and [[biostatistics/hypothesis-testing]]. The experimental technologies themselves are described in [[genomics/functional-genomics]].

## From reads to counts

An RNA-seq experiment produces, for each sample, a file of reads ([[bioinformatics/sequences-databases]]). There are two ways to turn them into numbers per gene.

- **Align and count.** Map reads to the genome with a spliced aligner such as STAR or HISAT2, then count the reads overlapping each gene's exons (featureCounts, HTSeq). Reads that map to several places, or overlap two genes, are discarded or apportioned.
- **Pseudoalign.** Programs such as kallisto (Nicolas Bray, Harold Pimentel, Páll Melsted and Lior Pachter, 2016) and Salmon (Rob Patro and colleagues, 2017) skip base-level alignment. They determine, from its $k$-mers, which transcripts a read is compatible with, and estimate transcript abundances by an expectation–maximisation algorithm that shares ambiguous reads among the compatible transcripts in proportion to their estimated abundances. This is much faster, and it handles reads shared by alternative isoforms naturally.

Either way, the result for a gene-level analysis is a **count matrix**: one row per gene, one column per sample, each entry the number of reads (or estimated reads) assigned. Everything that follows starts from that matrix.

Before any statistics, the design matters more than the analysis. Biological replicates — independent cultures, animals or plants, not repeated sequencing of one library — are essential, because the variation that a test must exceed is biological variation, and it can only be estimated from replicates ([[biostatistics/experimental-design]]). Three replicates per condition is a common minimum; studies that measured power directly, such as Nicholas Schurch and colleagues' 48-replicate yeast experiment (2016), found that more replicates add more power than deeper sequencing.

## Normalisation

The raw count for a gene in a sample is roughly proportional to the gene's expression, times its length (longer transcripts yield more fragments), times the total amount of sequencing. Normalisation removes the factors that are not of interest.

::: definition Within-sample expression measures {#def-tpm}
For gene $i$ in a sample with count $c_i$ and effective transcript length $\ell_i$ (in kilobases):

- **counts per million**: $\mathrm{CPM}_i = 10^6\,c_i/\sum_jc_j$;
- **reads per kilobase per million** (RPKM, or FPKM for fragments): $\mathrm{RPKM}_i = 10^6\,c_i/(\ell_i\sum_jc_j)$;
- **transcripts per million**: $\mathrm{TPM}_i = 10^6\,\dfrac{c_i/\ell_i}{\sum_jc_j/\ell_j}$.

TPMs sum to $10^6$ in every sample and estimate the proportion of transcripts (molecules, not bases) that come from each gene; RPKMs have no fixed sum.
:::

TPM was proposed by Bo Li and Colin Dewey (2010–11) and its advantages over RPKM explained by Günter Wagner, Koryu Kin and Vincent Lynch (2012): because TPMs always sum to the same total, a TPM is a proportion, and the proportions of the same gene can be compared between samples, which is not true of RPKM. Both are suitable for comparing genes *within* a sample, adjusting for length. Neither is suitable as the input to a differential-expression test, for two reasons: they discard the information about precision that the raw count carries (100 reads give a much more precise estimate than 10, even if both are scaled to the same TPM), and they inherit a problem with the denominator that we turn to now.

::: example TPM from counts {#ex-tpm}
A sample contains three genes of lengths 1, 2 and 4 kb with counts 100, 200 and 400. A second sample has counts 300, 200 and 200. Compute the TPMs and interpret.
::: solution
Sample 1: reads per kb are $100/1 = 100$, $200/2 = 100$ and $400/4 = 100$, so the three genes are expressed at equal molar levels: TPM $= 333{,}333$ each. The longest gene has four times the reads of the shortest only because it is four times longer.

Sample 2: reads per kb are 300, 100 and 50, total 450, so TPMs are $666{,}667$, $222{,}222$ and $111{,}111$. Gene 2 has the same count in both samples (200) but its TPM fell from 333,333 to 222,222, because gene 1 now makes up a larger share of the transcripts. Whether gene 2's absolute expression changed cannot be decided from proportions alone — the problem of composition.
:::
:::

### Composition and robust size factors

Suppose that in a treated sample a few genes are switched on very strongly. They take up a larger share of the sequencing reads, so every other gene receives a smaller share, even if its expression is unchanged. Normalising by the total count (CPM) would make all those unchanged genes appear down-regulated. The remedy is to estimate the scaling between samples from the genes that do *not* change, assuming that most genes do not.

::: definition Median-of-ratios size factors {#def-sizefactor}
For a count matrix with entries $c_{ij}$ (gene $i$, sample $j$), form a pseudo-reference sample from the geometric mean of each gene across samples, $m_i = \left(\prod_jc_{ij}\right)^{1/n}$, using only genes with no zero counts. The **size factor** of sample $j$ is

$$
s_j = \operatorname*{median}_i\ \frac{c_{ij}}{m_i},
$$ {#eq-sizefactor}

and normalised counts are $c_{ij}/s_j$. (Simon Anders and Wolfgang Huber, 2010, in DESeq.)
:::

The median makes the estimate robust: a minority of strongly changing genes, however extreme, does not move it. The trimmed mean of M-values (TMM) of Mark Robinson and Alicia Oshlack (2010), used in edgeR, achieves the same by trimming genes with extreme log ratios. Both assume that most genes are not differentially expressed, or that up- and down-regulation are balanced; when a treatment changes the expression of most genes in one direction (for example a global shutdown of transcription), no normalisation based on internal genes can work, and spike-in RNAs of known amount are needed.

::: example Size factors and composition {#ex-sizefactors}
Six genes are counted in two untreated (A1, A2) and two treated (B1, B2) samples (illustrative data):

| gene | A1 | A2 | B1 | B2 |
|---|---|---|---|---|
| g1 | 500 | 620 | 1,010 | 1,190 |
| g2 | 100 | 130 | 105 | 120 |
| g3 | 20 | 25 | 18 | 22 |
| g4 | 3,000 | 3,600 | 3,100 | 3,500 |
| g5 | 800 | 1,000 | 790 | 910 |
| g6 | 60 | 75 | 250 | 310 |

Compute the size factors by [[#eq-sizefactor]] and compare with library-size normalisation.
::: solution
The library sizes (column totals) are 4,480, 5,450, 5,273 and 6,052. The size factors from the median of ratios (computed with the listing below) are 0.898, 1.121, 0.935 and 1.062. The two methods disagree for B1: its library is 18 % larger than A1's, but its size factor only 4 % larger, because part of its extra sequencing went to the induced genes g1 and g6.

After dividing by the size factors, g4 has normalised counts of about 3,340, 3,210, 3,320 and 3,300 — unchanged, as its raw counts suggest. With CPM it would instead appear to fall from about 670 per thousand reads in A1 to 588 in B1, a spurious 12 % decrease. The genes with real changes stand out: g1 roughly doubles ($\log_2$ fold change 0.99) and g6 quadruples (2.06).
:::
:::

The computation, together with the Benjamini–Hochberg adjustment used later in the chapter, in standard-library Python:

```python
import math, statistics

# illustrative counts: 6 genes x 4 samples (A1, A2 untreated; B1, B2 treated)
genes = ["g1", "g2", "g3", "g4", "g5", "g6"]
counts = [[ 500,  620, 1010, 1190],
          [ 100,  130,  105,  120],
          [  20,   25,   18,   22],
          [3000, 3600, 3100, 3500],
          [ 800, 1000,  790,  910],
          [  60,   75,  250,  310]]

def size_factors(counts):
    """DESeq median-of-ratios: compare each sample with the geometric-mean pseudo-sample."""
    logs = [[math.log(c) for c in row] for row in counts if all(c > 0 for c in row)]
    ref = [sum(r) / len(r) for r in logs]                    # log geometric mean per gene
    n = len(counts[0])
    return [math.exp(statistics.median(r[j] - m for r, m in zip(logs, ref))) for j in range(n)]

def benjamini_hochberg(p):
    """BH-adjusted p-values (q-values in the sense of the BH procedure)."""
    m = len(p)
    order = sorted(range(m), key=lambda i: p[i])
    q, running = [0.0] * m, 1.0
    for rank in range(m, 0, -1):                             # from the largest p downwards
        i = order[rank - 1]
        running = min(running, p[i] * m / rank)
        q[i] = running
    return q

s = size_factors(counts)
print("size factors", [round(x, 3) for x in s])
print("library sizes", [sum(row[j] for row in counts) for j in range(4)])
for g, row in zip(genes, counts):
    norm = [c / sj for c, sj in zip(row, s)]
    lfc = math.log2((norm[2] + norm[3]) / (norm[0] + norm[1]))
    print(g, [round(x) for x in norm], "log2FC", round(lfc, 2))

p = [0.0001, 0.0004, 0.0019, 0.0095, 0.0201, 0.0278, 0.0298, 0.0344, 0.0459, 0.3240]
print([round(x, 4) for x in benjamini_hochberg(p)])
```

```
size factors [0.898, 1.121, 0.935, 1.062]
library sizes [4480, 5450, 5273, 6052]
g1 [557, 553, 1080, 1120] log2FC 0.99
g2 [111, 116, 112, 113] log2FC -0.01
g3 [22, 22, 19, 21] log2FC -0.16
g4 [3342, 3212, 3315, 3295] log2FC 0.01
g5 [891, 892, 845, 857] log2FC -0.07
g6 [67, 67, 267, 292] log2FC 2.06
[0.001, 0.002, 0.0063, 0.0238, 0.0402, 0.0426, 0.0426, 0.043, 0.051, 0.324]
```

## Modelling counts

How variable is a gene's count between replicates? If a library of $N$ reads were sampled from a fixed pool of RNA in which the gene makes up a fraction $q$, its count would be binomial, and for small $q$ approximately Poisson with mean and variance $Nq$. Technical replicates — the same library sequenced twice — do behave like this. Biological replicates do not: the fraction $q$ itself varies from one culture or animal to the next, and the variance of counts is larger than the mean, often by orders of magnitude for highly expressed genes. This is **overdispersion**.

::: proposition The negative binomial as a gamma–Poisson mixture {#prop-nb}
Suppose that, given the true expression $\lambda$ in a replicate, a gene's count is Poisson with mean $\lambda$, and that $\lambda$ varies between replicates according to a gamma distribution with mean $\mu$ and variance $\alpha\mu^2$. Then the count $K$ has a **negative binomial** distribution with

$$
\E[K] = \mu,\qquad \Var(K) = \mu + \alpha\mu^2.
$$ {#eq-nbvar}

The parameter $\alpha$ is the **dispersion**; $\sqrt\alpha$ is the biological coefficient of variation of expression between replicates.
:::

::: proof
By the laws of total expectation and total variance ([expectation](/learn/maths/lesson.php?c=probability&l=expectation) in Maths Atlas), $\E[K] = \E[\E[K\mid\lambda]] = \E[\lambda] = \mu$ and $\Var(K) = \E[\Var(K\mid\lambda)] + \Var(\E[K\mid\lambda]) = \E[\lambda] + \Var(\lambda) = \mu + \alpha\mu^2$. That the mixture is exactly negative binomial follows by integrating the Poisson probability against the gamma density: with shape $r = 1/\alpha$ the result is $\Prob(K = k) = \binom{k + r - 1}{k}p^r(1 - p)^k$ with $p = r/(r + \mu)$.
:::

The two terms of [[#eq-nbvar]] have a natural reading. The first, $\mu$, is the Poisson "shot noise" of counting, which dominates for weakly expressed genes. The second, $\alpha\mu^2$, is biological variation, which grows with the square of the mean and dominates for highly expressed genes. However deep the sequencing, the second term remains: more reads cannot substitute for more replicates.

::: widget plot
f: sqrt(1/x + a); sqrt(1/x)
x: 1, 1000
y: 0, 1
sliders: a=0.05:0.01:0.5:0.01
labels: \text{negative binomial CV}; \text{Poisson CV}
hlines: 0.2236
caption: The coefficient of variation of a gene's count across biological replicates, $\sqrt{\Var}/\mu = \sqrt{1/\mu + \alpha}$, against the mean count $\mu$, for dispersion $\alpha$ (slider a), with the Poisson value $1/\sqrt\mu$ for comparison. At low counts both curves fall as counting noise shrinks; beyond about 100 reads the negative binomial curve flattens at the biological floor $\sqrt\alpha$ (the dashed line marks $\sqrt{0.05} = 0.22$). Increase $\alpha$, as for genetically diverse samples such as human tissues, and notice that the floor is reached at even lower depth.
:::

::: example Poisson or negative binomial? {#ex-nb}
A gene has a mean of 100 reads across biological replicates, and its dispersion is $\alpha = 0.1$ (a biological coefficient of variation of about 32 %, typical of independent animals). Compare the standard deviations of counts under the Poisson and negative binomial models, and the probability of a count between 70 and 130 under each.
::: solution
Poisson: variance 100, standard deviation 10. Negative binomial: variance $100 + 0.1\times100^2 = 1{,}100$, standard deviation 33. Under the Poisson model the probability that a replicate falls between 70 and 130 is 0.998; under the negative binomial it is 0.65 (see the figure). A Poisson-based test would treat an ordinary replicate-to-replicate difference — 100 reads in one sample, 140 in another — as overwhelming evidence of a change, and would declare thousands of genes "significant".
:::
:::

::: widget distribution
dist: negbinomial
params: r=10, p=0.0909, failures=1
a: 70
b: 130
caption: The negative binomial distribution of a gene's count across biological replicates with mean $\mu = 100$ and dispersion $\alpha = 1/r = 0.1$ (here $r = 10$ and $p = r/(r + \mu) = 0.0909$), counting failures from 0. The shaded probability of a count between 70 and 130 is about 0.65, against 0.998 for a Poisson distribution with the same mean. Raise $r$ (lower dispersion): the distribution narrows towards the Poisson. Notice the right skew: overdispersed counts have long upper tails.
:::

### Generalised linear models and shrinkage

DESeq2 (Michael Love, Wolfgang Huber and Simon Anders, 2014) and edgeR (Mark Robinson, Davis McCarthy and Gordon Smyth, 2010) fit, for each gene, a **generalised linear model** with a negative binomial response and a log link ([[biostatistics/linear-models]]):

$$
K_{ij}\sim\mathrm{NB}(\mu_{ij}, \alpha_i),\qquad \log\mu_{ij} = \log s_j + \mathbf x_j^\top\boldsymbol\beta_i,
$$ {#eq-nbglm}

where $s_j$ is the size factor of sample $j$ (entering as an **offset**, a term with a fixed coefficient of 1), $\mathbf x_j$ describes the sample's condition and any other factors (batch, sex, time), and $\boldsymbol\beta_i$ contains the gene's log-scale effects. The coefficient for treatment, divided by $\ln 2$, is the $\log_2$ fold change. Because the model is a GLM, any design — several factors, interactions, paired samples, a time course — is handled the same way, and hypotheses are tested by Wald tests of single coefficients or likelihood-ratio tests of nested models.

The difficulty is the dispersion. With three replicates per condition, $\alpha_i$ is estimated very poorly from one gene's data alone: by chance some genes will appear to have tiny dispersion and get tiny P-values. The solution is to **borrow strength** across genes. Dispersion varies smoothly with mean expression, so the programs fit a trend of dispersion against mean across all genes and then shrink each gene's estimate towards the trend, by an amount that depends on how much information the gene itself provides — an empirical Bayes procedure. DESeq2 also shrinks the fold changes of weakly expressed genes towards zero, so that large fold changes estimated from a handful of reads do not dominate a ranked list. A related approach, limma-voom (Charity Law, Smyth and colleagues, 2014), transforms counts to log CPM with precision weights and applies linear models with moderated $t$-statistics.

::: example A Wald test {#ex-wald}
For one gene, the fitted $\log_2$ fold change for treatment is $\hat\beta = 1.2$ with standard error 0.4. Test the null hypothesis of no change.
::: solution
The Wald statistic is $z = 1.2/0.4 = 3.0$, which under the null hypothesis is approximately standard normal. The two-sided P-value is $2\times(1 - \Phi(3.0)) = 0.0027$. The estimated change is $2^{1.2} = 2.3$-fold, with an approximate 95 % confidence interval for the $\log_2$ fold change of $1.2 \pm 1.96\times0.4 = (0.42, 1.98)$, i.e. between 1.3- and 3.9-fold. Whether 0.0027 is "significant" depends on how many genes were tested, which is the next question.
:::
:::

## Twenty thousand tests

Testing every gene means testing about 20,000 hypotheses. At a per-test threshold of 0.05, about a thousand null genes would be called significant by chance. Controlling the family-wise error rate (the probability of any false positive) with Bonferroni's correction would require $P < 2.5\times10^{-6}$, which sacrifices most real effects. Genomics has instead adopted the **false discovery rate** (FDR), the expected proportion of false positives among the genes called significant, controlled by the Benjamini–Hochberg (BH) procedure ([[biostatistics/hypothesis-testing]]): order the P-values $p_{(1)} \le \cdots \le p_{(m)}$, find the largest $k$ with $p_{(k)} \le kq/m$, and call the $k$ smallest significant. Equivalently, compute adjusted P-values $\min_{j\ge i}\,p_{(j)}m/j$ and call those below $q$. A list called at FDR 0.05 is expected to contain about 5 % false discoveries.

::: example Ten P-values {#ex-bh}
Ten genes have P-values 0.0001, 0.0004, 0.0019, 0.0095, 0.0201, 0.0278, 0.0298, 0.0344, 0.0459 and 0.3240. Which are significant at a false discovery rate of 0.05? Compare with Bonferroni.
::: solution
The BH-adjusted values (from the listing) are 0.001, 0.002, 0.0063, 0.0238, 0.0402, 0.0426, 0.0426, 0.043, 0.051 and 0.324. Eight are below 0.05, so eight genes are called at FDR 0.05. (Check the largest: $p_{(8)} = 0.0344 \le 8\times0.05/10 = 0.04$, while $p_{(9)} = 0.0459 > 0.045$.) Bonferroni requires $P < 0.005$ and calls only three. Notice that the 0.0459 gene, nominally significant at 0.05, is not called: in a family of tests, a P-value's meaning depends on the others.
:::
:::

Under the null hypothesis a P-value is uniformly distributed on $[0, 1]$, so the histogram of all P-values in an experiment is a mixture of a flat part, from the null genes, and a spike near zero, from the genes with real effects. This gives a simple estimate of the proportion of true nulls: if $W$ of $m$ P-values exceed a threshold $\lambda$ (say 0.5), almost all of them are nulls, so

$$
\hat\pi_0 = \frac{W}{m(1 - \lambda)}.
$$ {#eq-pi0}

John Storey and Robert Tibshirani (2003) used $\hat\pi_0$ to sharpen the BH procedure, defining the **q-value** of a gene as the smallest FDR at which it would be called. A P-value histogram that is not flat to the right — rising towards 1, or with bumps — signals a problem with the model, such as wrongly estimated dispersions, and should always be looked at before the list of genes.

::: quiz
An RNA-seq study reports 1,800 genes differentially expressed at FDR 0.10. Which statement is correct?
- [ ] Each of the 1,800 genes has a 10 % probability of being a false positive.
- [x] About 180 of the 1,800 genes are expected to be false positives, though which ones is unknown.
- [ ] Genes not on the list are not differentially expressed.
- [ ] The probability that the list contains any false positive is 0.10.
::: solution
The FDR is the expected *proportion* of false discoveries in the list, so about 10 % of 1,800, or 180, are expected to be null genes. It is not a per-gene probability (genes with the smallest P-values are much less likely to be false than those near the threshold), and not the family-wise error rate. Genes not called may still change — they may simply lack power, especially weakly expressed genes or those with small effects.
:::
:::

::: warning Absence of evidence and the meaning of a fold change
A gene that does not reach significance has not been shown to be unchanged: in a typical three-replicate study, many genes with real two-fold changes are missed, particularly at low expression. Comparing lists ("gene X is significant in tissue A but not in tissue B, so the effect is tissue-specific") is a classic error; the difference between tissues must be tested directly, with an interaction term in the GLM. Conversely, a statistically significant change can be biologically trivial: with many replicates a 5 % change can reach $P < 10^{-10}$. Report fold changes with confidence intervals, and consider a threshold on the size of effect that matters (DESeq2 and limma can test against a minimum fold change rather than zero).
:::

## Seeing the data

Lists of genes are only part of an analysis. Plots catch problems that tests cannot.

- **Principal component analysis** of the samples (after a variance-stabilising transformation of the counts, such as $\log$ of normalised counts with a pseudocount) shows whether replicates cluster by condition, whether one sample is an outlier, and whether some other factor — the day of library preparation, the sequencing lane — separates samples more strongly than the treatment. PCA itself is developed in [[bioinformatics/machine-learning]].
- **MA plots** show the $\log_2$ fold change (M) against mean expression (A) for every gene; the cloud should be centred on zero, and the spread is wider at low expression.
- **Volcano plots** show $-\log_{10}P$ against $\log_2$ fold change, combining effect size and significance.

**Batch effects** — systematic differences between samples processed at different times or places — are ubiquitous in high-throughput biology (Jeffrey Leek and colleagues, 2010). If batches are balanced across conditions, they can be included as a factor in the GLM. If condition and batch are **confounded** — all treated samples processed on Monday, all controls on Tuesday — no analysis can separate them, and the experiment cannot answer its question.

### Clustering and enrichment

Genes with similar expression profiles across conditions or time points are often co-regulated or functionally related, an observation made famous by Michael Eisen, Paul Spellman, Patrick Brown and David Botstein's clustered heat maps of yeast expression (1998). Clustering needs a measure of dissimilarity between profiles — commonly $1 - r$, with $r$ the correlation coefficient, so that genes rising and falling together are close regardless of their absolute levels — and an algorithm.

- **Hierarchical clustering** repeatedly merges the two closest clusters, producing a tree (dendrogram); the distance between clusters is defined by a **linkage** rule, such as average linkage (the mean of all pairwise distances, UPGMA, [[evolution/phylogenetics]]) or complete linkage (the largest).
- **$k$-means** chooses $k$ centres, assigns each gene to the nearest, moves each centre to the mean of its genes, and repeats until the assignments stop changing; it minimises the within-cluster sum of squares, but only to a local optimum, and $k$ must be chosen.

Clusters are descriptions, not discoveries: any data, including random noise, can be clustered, and the number and stability of clusters must be assessed (for example by resampling). The usual next step is to ask what the genes in a list or cluster have in common, by testing for **enrichment** of functional categories such as Gene Ontology terms or pathways.

::: example A GO enrichment test {#ex-enrichment}
Of 20,000 genes tested, 500 are differentially expressed. A Gene Ontology term annotates 100 of the 20,000 genes, and 15 of these are among the 500. Is the term enriched?
::: solution
If the 500 genes were a random sample of the 20,000, the number annotated with the term would follow a **hypergeometric** distribution with expectation $500\times100/20{,}000 = 2.5$. Observing 15 is six times the expectation. The probability of 15 or more under the hypergeometric distribution is

$$
\Prob(X \ge 15) = \sum_{x=15}^{100}\frac{\binom{100}{x}\binom{19{,}900}{500 - x}}{\binom{20{,}000}{500}} = 2.7\times10^{-8},
$$

equivalent to a one-sided Fisher exact test ([[biostatistics/categorical-data]]). Thousands of GO terms are usually tested, so the P-values must themselves be corrected (BH again), and the "universe" must be the genes that could have been detected — the expressed genes, not the whole genome — or the test is biased towards terms for highly expressed genes. Gene set enrichment analysis (GSEA, Aravind Subramanian and colleagues, 2005) avoids an arbitrary significance cut-off by asking whether a set's genes are concentrated near the top or bottom of the full ranked list.
:::
:::

::: application Single cells
Bulk RNA-seq measures an average over millions of cells. Single-cell RNA-seq, which became widespread after droplet-based methods appeared in 2015, counts transcripts in each of thousands to millions of individual cells, tagging each molecule with a unique molecular identifier (UMI) so that PCR copies are counted once. The data are sparse — most genes have zero counts in most cells — and the analysis proceeds by normalisation, selection of variable genes, PCA, a nearest-neighbour graph of cells, graph-based clustering into putative cell types, and two-dimensional embeddings for display ([[bioinformatics/machine-learning]]). The statistical lessons of this chapter carry over with a twist: cells from the same individual are not independent replicates, so comparisons between conditions should aggregate cells into "pseudo-bulk" samples per individual, or the analysis will treat thousands of cells as thousands of replicates and grossly overstate significance.
:::

::: history
Patrick Brown's laboratory introduced spotted cDNA microarrays in 1995 (Mark Schena and colleagues), and Affymetrix oligonucleotide arrays appeared at the same time; clustering and the first large expression atlases followed. Yoav Benjamini and Yosef Hochberg published the false discovery rate in 1995, and it was adopted for microarrays within a few years; Gordon Smyth's limma (2004) introduced empirical Bayes moderated statistics. RNA-seq was introduced in 2008 by several groups, including Ali Mortazavi, Barbara Wold and colleagues, who defined RPKM, and Ugrappa Nagalakshmi, Michael Snyder and colleagues in yeast. Negative binomial methods followed in edgeR (2010) and DESeq (2010), and DESeq2 in 2014; pseudoalignment arrived with kallisto in 2016.
:::

::: summary
- RNA-seq reads are counted per gene by alignment or quantified by pseudoalignment and EM; the count matrix is the starting point, and biological replicates are essential.
- CPM, RPKM and TPM compare genes within a sample ([[#def-tpm]]); differential expression uses raw counts with size factors. Median-of-ratios size factors ([[#def-sizefactor]]) and TMM correct for composition, assuming most genes do not change.
- Counts across biological replicates are overdispersed: the negative binomial, a gamma–Poisson mixture, has $\Var = \mu + \alpha\mu^2$ ([[#prop-nb]]); biological variation does not shrink with sequencing depth.
- Each gene is fitted with a negative binomial GLM with size factors as offsets ([[#eq-nbglm]]); dispersions (and fold changes) are shrunk across genes by empirical Bayes; Wald and likelihood-ratio tests give P-values.
- The Benjamini–Hochberg procedure controls the FDR; P-value histograms estimate $\pi_0$ and diagnose model problems. Non-significance is not evidence of no change, and differences between lists must be tested directly.
- PCA, MA and volcano plots, attention to batch and confounding, clustering by correlation, and enrichment tests with an appropriate universe complete the analysis.
:::

## Exercises

::: exercise Counts per million {level=1 check="20"}
A gene has 250 reads in a library of 12.5 million reads. What is its CPM?
::: solution
$250/12.5\times10^6\times10^6 = 20$.
:::
:::

::: exercise TPM {level=1 check="500000"}
A sample has two genes: gene 1 (2 kb) with 400 reads and gene 2 (0.5 kb) with 100 reads. What is the TPM of gene 1?
::: solution
Reads per kb: $400/2 = 200$ and $100/0.5 = 200$. Each is half the total, so both have TPM $= 500{,}000$: equal molar abundance despite a four-fold difference in counts.
:::
:::

::: exercise Negative binomial variance {level=1 check="550"}
A gene has mean count 50 and dispersion $\alpha = 0.2$. What is the variance of its count across replicates?
::: solution
$\mu + \alpha\mu^2 = 50 + 0.2\times2{,}500 = 550$, against 50 for a Poisson distribution.
:::
:::

::: exercise Estimating the null proportion {level=2 check="0.72"}
In an experiment testing 10,000 genes, 3,600 P-values exceed 0.5. Estimate $\pi_0$, the proportion of genes that are not differentially expressed.
::: solution
By [[#eq-pi0]] with $\lambda = 0.5$: $\hat\pi_0 = 3{,}600/(10{,}000\times0.5) = 0.72$. About 28 % of genes, some 2,800, appear to have some change, though many changes may be too small to detect individually.
:::
:::

::: exercise Why more depth does not help {level=2}
With dispersion $\alpha = 0.05$, compute the coefficient of variation ($\sqrt{\Var}/\mu$) of a gene's count across replicates at means of 10, 100 and 10,000 reads. What does this imply for the design of an experiment with a fixed budget?
::: solution
$\mathrm{CV} = \sqrt{1/\mu + \alpha}$: at $\mu = 10$, $\sqrt{0.1 + 0.05} = 0.39$; at 100, $\sqrt{0.01 + 0.05} = 0.24$; at 10,000, $\sqrt{0.0001 + 0.05} = 0.22$. Beyond a moderate depth, the CV approaches the biological floor $\sqrt\alpha = 0.22$ and more reads hardly help. Precision of a group mean improves with the number of replicates $n$ as $1/\sqrt n$, so for a fixed budget it is usually better to sequence more replicates at moderate depth (tens of millions of reads for a mammalian transcriptome, or fewer) than a few replicates very deeply.
:::
:::

::: exercise Benjamini–Hochberg by hand {level=2}
Five genes have P-values 0.001, 0.012, 0.014, 0.030 and 0.20. Which are called at FDR 0.05?
::: solution
With $m = 5$ the thresholds $kq/m$ are 0.01, 0.02, 0.03, 0.04 and 0.05. Comparing in order: $0.001 \le 0.01$, $0.012 \le 0.02$, $0.014 \le 0.03$, $0.030 \le 0.04$, $0.20 > 0.05$. The largest $k$ satisfying the condition is 4, so the first four genes are called.
:::
:::

::: exercise A confounded design {level=3}
A laboratory sequences three control and three knockout mouse livers. The controls were collected and processed in March, the knockouts in June, with a new batch of library-preparation kit. The analysis finds 4,000 differentially expressed genes, and PCA separates the groups cleanly. (a) What can and cannot be concluded? (b) How should the experiment have been designed? (c) Could including "batch" in the model rescue the analysis?
::: solution
(a) The groups differ, but genotype, season, processing date and kit batch are perfectly confounded; any of them could cause the differences. The experiment cannot attribute them to the knockout.

(b) Collect and process controls and knockouts together, balanced across batches — for example one of each per day, with randomised processing order — so that batch is not aligned with genotype ([[biostatistics/experimental-design]]). Batch can then be included as a factor.

(c) No. With batch and genotype perfectly confounded, their columns in the design matrix are identical, so the model cannot estimate both effects. Batch-correction methods would remove the genotype effect along with the batch effect. The only remedy is new samples processed in a balanced design.
:::
:::

::: exercise Composition {level=3}
In a treated sample, a single highly expressed gene increases about twenty-fold and comes to account for 40 % of all reads, against 3 % in controls. All other genes are unchanged in absolute expression. (a) By what factor does the CPM of an unchanged gene fall? (b) Would median-of-ratios size factors be affected, and why? (c) Would TPM be affected?
::: solution
(a) In controls, the other genes take 97 % of the reads; in the treated sample, 60 %. The CPM of any unchanged gene therefore falls by a factor of $0.60/0.97 = 0.62$, an apparent 38 % decrease of every other gene.

(b) Hardly: the size factor is the median of ratios over all genes, and one gene's huge ratio does not move the median. The unchanged genes, which are the majority, give ratios that reflect the true sequencing depth for the rest of the transcriptome, so they are normalised correctly.

(c) Yes, in the same way as CPM: TPM is a proportion of all transcripts and must fall for every other gene when one gene's share rises. TPM correctly says that the *proportion* of transcripts from each other gene fell; it cannot say whether their absolute expression changed.
:::
:::
