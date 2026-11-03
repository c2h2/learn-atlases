A modern sequencing instrument does not read a genome; it reads hundreds of millions of fragments of it, each a few hundred bases long (or, with long-read instruments, tens of thousands), in random positions and with errors. Two computational problems follow. If no genome sequence of the species exists, the fragments must be put back together into one — **assembly**. If a reference genome does exist, as it does for humans, each read can instead be placed on it — **read mapping** — and the places where the reads consistently disagree with the reference are the individual's variants — **variant calling**. Mapping and calling are among the most heavily used computations in biology; every clinical genome, every population study and most functional genomics experiments begin with them.

The sequencing technologies, coverage and the Lander–Waterman model, the basic idea of de Bruijn and overlap graphs, the role of repeats and measures of assembly quality such as N50 are covered in [[genomics/sequencing-genomes]]. This chapter is about the algorithms: why assembly from short reads became tractable when it was recast as finding an Eulerian path, how errors and repeats complicate the graph, how the Burrows–Wheeler transform lets a read be found in a 3-billion-base genome in microseconds, and how genotype likelihoods turn piles of reads into calls with quantified confidence. Alignment scoring is assumed from [[bioinformatics/pairwise-alignment]].

## Assembly as a graph problem

Suppose the reads are error-free and cover the genome many times. The natural formulation of assembly is through **overlaps**: build a graph with a vertex for each read and an edge from read $a$ to read $b$ when a suffix of $a$ matches a prefix of $b$, then find a path that visits every read once. That path spells the genome. Unfortunately, finding a path that visits every *vertex* exactly once — a Hamiltonian path — is NP-hard, and with hundreds of millions of reads even computing all overlaps is expensive. Overlap-based assemblers succeeded for Sanger reads with heuristics, but short reads needed a different idea.

The idea, from Pavel Pevzner, Haixu Tang and Michael Waterman (2001), building on Ramana Idury and Waterman (1995), is to cut the reads into $k$-mers and make the $k$-mers the **edges** of a graph.

::: definition De Bruijn graph of a set of k-mers {#def-dbg}
Given the set of $k$-mers occurring in the reads, the **de Bruijn graph** has a vertex for each distinct $(k-1)$-mer and, for each $k$-mer $w$, a directed edge from its prefix $w_1\cdots w_{k-1}$ to its suffix $w_2\cdots w_k$. A genome whose $k$-mers are exactly these (each used once) corresponds to a path that traverses every **edge** exactly once — an **Eulerian path**.
:::

Visiting every edge once is a very different problem from visiting every vertex once.

::: proposition Euler's theorem for directed graphs {#prop-euler}
A connected directed graph has an Eulerian circuit (a closed walk using every edge exactly once) if and only if every vertex has in-degree equal to out-degree. It has an Eulerian path from $s$ to $t \ne s$ if and only if $s$ has out-degree one more than its in-degree, $t$ has in-degree one more than its out-degree, and every other vertex is balanced. Such a path can be found in time linear in the number of edges.
:::

::: proof
Necessity: each time a walk passes through a vertex it uses one incoming and one outgoing edge, so all vertices except the ends of an open walk must be balanced; the start uses one extra outgoing edge and the end one extra incoming edge. Sufficiency (for a circuit): start anywhere and walk along unused edges. Because every vertex is balanced, the walk can only get stuck at its starting point, closing a cycle. If unused edges remain, some vertex on the cycle has one (by connectivity); start a new cycle there and splice it into the first. Repeating until no edges remain gives a circuit, using each edge once (Hierholzer's algorithm, 1873). For a path, add an edge from $t$ to $s$, find a circuit, and remove the added edge. Graph search in general is treated in [graph search](/learn/cs/lesson.php?c=algorithms&l=graph-search) in Computer Science Atlas.
:::

Leonhard Euler solved the undirected version for the bridges of Königsberg in 1736. That an efficient algorithm exists is what makes de Bruijn graphs attractive: the graph is built in one pass over the reads, its size depends on the genome rather than on the number of reads (each distinct $k$-mer appears once however many reads contain it), and paths through it can be found quickly.

::: example A small de Bruijn graph {#ex-dbg}
Reads from the sequence `ATGGCGTGCA` provide all of its 3-mers: `ATG`, `TGG`, `GGC`, `GCG`, `CGT`, `GTG`, `TGC`, `GCA`. Build the de Bruijn graph with $k = 3$ and find its Eulerian paths.
::: solution
The vertices are the 2-mers `AT`, `TG`, `GG`, `GC`, `CG`, `GT` and `CA`, and each 3-mer is an edge: `AT`→`TG`, `TG`→`GG`, `GG`→`GC`, `GC`→`CG`, `CG`→`GT`, `GT`→`TG`, `TG`→`GC`, `GC`→`CA`. `AT` has out-degree 1 and in-degree 0, `CA` in-degree 1 and out-degree 0, and the others are balanced (`TG` and `GC` each have two edges in and two out), so by [[#prop-euler]] there is an Eulerian path from `AT` to `CA`.

There are two. Taking `TG`→`GG` first gives `AT TG GG GC CG GT TG GC CA`, which spells `ATGGCGTGCA`, the true sequence. Taking `TG`→`GC` first gives `AT TG GC CG GT TG GG GC CA`, which spells `ATGCGTGGCA` — a different sequence with exactly the same set of 3-mers. The 2-mers `TG` and `GC` occur twice in the genome: they are **repeats** at this scale, and the reads, cut into 3-mers, cannot tell which way the genome passes through them. With $k = 4$ the ambiguity disappears, because no 3-mer is repeated.
:::
:::

::: widget graph
nodes: AT@0,0; TG@1,0; GG@2,1; GC@3,0; CA@4,0; CG@2.5,-1.2; GT@1.5,-1.2
edges: AT>TG; TG>GG; GG>GC; GC>CG; CG>GT; GT>TG; TG>GC; GC>CA
algorithm: euler
start: AT
caption: The de Bruijn graph of [[#ex-dbg]] for $k = 3$: vertices are 2-mers and each edge is one 3-mer of the reads. Step through Hierholzer's algorithm: the vertex labels show in- and out-degrees, `AT` and `CA` are the only unbalanced vertices, and the trail found uses every edge once. Read the genome off the trail by taking the first vertex and then the last letter of each vertex visited. Because `TG` and `GC` each have two ways out, a different choice at `TG` gives a second valid trail — the repeat ambiguity that real assemblers face at every repeat longer than $k$.
:::

### Errors, coverage and the choice of k

Real reads contain errors, and each error creates up to $k$ erroneous $k$-mers that occur nowhere in the genome. With an error rate $\varepsilon$ per base, a $k$-mer is error-free with probability $(1 - \varepsilon)^k$: for $\varepsilon = 0.01$ that is 0.81 for $k = 21$ and 0.73 for $k = 31$, so a quarter or more of the $k$-mers from a 1 %-error read are wrong. They are, however, rare: a true $k$-mer in a genome sequenced to 30-fold coverage appears in many reads, while a particular error $k$-mer appears in one or two. A histogram of $k$-mer counts (the **$k$-mer spectrum**) therefore has a peak of erroneous $k$-mers at count 1 and a peak of genuine ones near the $k$-mer coverage, and the valley between them gives a threshold for discarding errors. The position of the genuine peak also estimates genome size ([[genomics/sequencing-genomes]]).

Errors that survive produce characteristic structures in the graph: **tips** (short dead-end branches, from errors near the end of a read) and **bubbles** (two short parallel paths that rejoin, from an error in the middle of a read — or from a heterozygous variant in a diploid genome). Assemblers such as Velvet (Daniel Zerbino and Ewan Birney, 2008) and SPAdes (Anton Bankevich and colleagues, 2012) remove tips, pop bubbles, and then output the unambiguous paths between branch points as **contigs**.

The choice of $k$ is a trade-off. A larger $k$ resolves more repeats, since a repeat shorter than $k - 1$ creates no branching, but needs longer error-free stretches and higher coverage, since each read of length $L$ contributes only $L - k + 1$ $k$-mers. A smaller $k$ is robust to errors and low coverage but collapses more repeats. Many assemblers combine several values of $k$.

Short-read assemblies of large genomes are therefore fragmented at every repeat longer than the reads. **Long reads** changed this. PacBio HiFi reads, 15–25 kb long with accuracy above 99.9 %, and Oxford Nanopore reads, which can exceed 100 kb, span most repeats, and assemblers designed for them — returning to overlap graphs in the form of **string graphs** (Eugene Myers, 2005), with fast overlap detection by minimizers — produce chromosome-scale contigs. The Telomere-to-Telomere consortium's complete human genome (Sergey Nurk and colleagues, 2022) used HiFi and ultra-long Nanopore reads to close every gap in GRCh38, including centromeres and the short arms of the acrocentric chromosomes; hifiasm (Haoyu Cheng, Heng Li and colleagues, 2021) and Verkko (Mikko Rautiainen and colleagues, 2023) assemble both haplotypes of a diploid genome separately.

::: quiz
In a $k$-mer spectrum of reads from a diploid genome at 40-fold coverage, there is a large peak at count 1, a peak at about 18 and a larger peak at about 36. What is the peak at 18?
- [ ] Sequencing errors.
- [x] $k$-mers present in only one of the two haplotypes — those overlapping heterozygous sites — which are covered at half the depth.
- [ ] Repeats present in two copies.
- [ ] $k$-mers from contaminating bacteria.
::: solution
Errors give the peak at 1. $k$-mers shared by both haplotypes are sampled from both chromosomes and form the main peak (at about 36, slightly below the read coverage because each read contributes only $L - k + 1$ $k$-mers). $k$-mers that include a heterozygous variant occur on only one haplotype and are sampled at half that rate. Repeats present twice in the haploid genome produce a peak at twice the main one (about 72). The relative size of the half-depth peak is used to estimate heterozygosity.
:::
:::

## Mapping reads to a reference

When a reference genome exists, the problem changes. Each read must be placed at its position of origin, allowing for sequencing errors and genuine differences, and the computation must be fast: a 30-fold human genome is about 600 million reads of 150 bases. Comparing each read with every position of the genome by dynamic programming is out of the question. Mappers instead **index** the reference once, use the index to find short exact matches (seeds) between each read and the genome, and then align the read by dynamic programming only near those seeds ([[bioinformatics/pairwise-alignment]]).

Early mappers indexed $k$-mers in hash tables. The breakthrough of 2009, in Bowtie (Ben Langmead and colleagues) and BWA (Heng Li and Richard Durbin), was to index the genome with the **Burrows–Wheeler transform**, a permutation of a text devised by Michael Burrows and David Wheeler (1994) for data compression.

::: definition Burrows–Wheeler transform and suffix array {#def-bwt}
Append to a text $T$ of length $n - 1$ a terminator `$` that is lexicographically smaller than every other symbol. Sort the $n$ cyclic rotations of $T\$$ into lexicographic order, forming an $n\times n$ matrix. The **Burrows–Wheeler transform** $\mathrm{BWT}(T)$ is the last column of this matrix. The **suffix array** $\mathrm{SA}$ lists, for each row $i$, the position in $T$ at which that rotation (equivalently, that suffix) starts.
:::

For $T = $ `ACAACG`, the sorted rotations of `ACAACG$` are

```
$ACAACG
AACG$AC
ACAACG$
ACG$ACA
CAACG$A
CG$ACAA
G$ACAAC
```

so $\mathrm{BWT} = $ `GC$AAAC`, and $\mathrm{SA} = (6, 2, 0, 3, 1, 4, 5)$ in zero-based positions. The BWT is a permutation of the text, and it is invertible. It tends to group identical characters together (because rotations beginning with the same context are adjacent and are preceded by similar characters), which is why it compresses well. For searching, its key property is that it links each row to the row of the rotation one character to the left.

::: proposition The last-to-first mapping {#prop-lf}
The $j$-th occurrence of a character $c$ in the last column of the sorted rotation matrix corresponds to the same character of the text as the $j$-th occurrence of $c$ in the first column. Consequently, if $C[c]$ is the number of characters in the text smaller than $c$ and $\mathrm{Occ}(c, i)$ is the number of occurrences of $c$ in $\mathrm{BWT}[0..i-1]$, the rows whose rotations begin with $c$ followed by any string $P$ form the interval

$$
\bigl[\,C[c] + \mathrm{Occ}(c, \ell),\ C[c] + \mathrm{Occ}(c, h)\,\bigr)
$$ {#eq-lf}

if the rows beginning with $P$ form the interval $[\ell, h)$.
:::

::: proof
Take the rows whose rotations end in $c$, in their sorted order. Rotating each of them right by one position moves the final $c$ to the front. The rotated strings all begin with $c$, and their order among themselves is determined by what follows the $c$, which is the original rotation — so they appear in the same relative order as before. Hence the ranks of the $c$s are preserved between the last and first columns. Rows beginning with $c$ occupy positions $C[c]$ onwards in the first column. Among the rows $[\ell, h)$ beginning with $P$, those ending in $c$ correspond, after rotation, exactly to the rows beginning with $cP$; their ranks among the $c$s of the last column run from $\mathrm{Occ}(c, \ell)$ to $\mathrm{Occ}(c, h) - 1$, which gives [[#eq-lf]].
:::

::: algorithm Backward search with an FM-index {#alg-backward}
To find all occurrences of a pattern $P = p_1\cdots p_m$, given $C$, a table of $\mathrm{Occ}$ and the suffix array:

1. Set $\ell = 0$ and $h = n$ (all rows).
2. For $i = m, m - 1, \ldots, 1$: set $\ell \leftarrow C[p_i] + \mathrm{Occ}(p_i, \ell)$ and $h \leftarrow C[p_i] + \mathrm{Occ}(p_i, h)$. If $\ell \ge h$, stop: $P$ does not occur.
3. The pattern occurs $h - \ell$ times, at the text positions $\mathrm{SA}[\ell], \ldots, \mathrm{SA}[h-1]$.

Each step takes constant time with a precomputed $\mathrm{Occ}$ table, so counting the occurrences takes $O(m)$ time — independent of the length of the genome.
:::

Paolo Ferragina and Giovanni Manzini (2000) showed that $C$, a sampled $\mathrm{Occ}$ table and a sampled suffix array — together the **FM-index** — take little more space than the compressed text itself. For the human genome, the index fits in a few gigabytes, and a read's seeds can be located in microseconds.

::: example Searching with the BWT {#ex-backward}
Using $\mathrm{BWT} = $ `GC$AAAC` for `ACAACG$`, find the occurrences of `AAC` by backward search.
::: solution
Counting characters: one `$`, three `A`, two `C`, one `G`, so $C[\$] = 0$, $C[\mathtt A] = 1$, $C[\mathtt C] = 4$, $C[\mathtt G] = 6$. Start with $[\ell, h) = [0, 7)$.

Last character, `C`: $\ell = 4 + \mathrm{Occ}(\mathtt C, 0) = 4$, $h = 4 + \mathrm{Occ}(\mathtt C, 7) = 4 + 2 = 6$. Rows 4–5 (`CAACG$A`, `CG$ACAA`) begin with `C`.

Next, `A`: $\ell = 1 + \mathrm{Occ}(\mathtt A, 4) = 1 + 1 = 2$ (one `A` among `GC$A`), $h = 1 + \mathrm{Occ}(\mathtt A, 6) = 1 + 3 = 4$. Rows 2–3 (`ACAACG$`, `ACG$ACA`) begin with `AC`.

First, `A`: $\ell = 1 + \mathrm{Occ}(\mathtt A, 2) = 1$, $h = 1 + \mathrm{Occ}(\mathtt A, 4) = 2$. One row, row 1 (`AACG$AC`), begins with `AAC`, and $\mathrm{SA}[1] = 2$: the pattern occurs once, at zero-based position 2 of `ACAACG`. Three steps, one per character of the pattern, whatever the length of the text.
:::
:::

The same in Python:

```python
def bwt(text):
    """Burrows-Wheeler transform via sorted rotations (text must end with '$')."""
    rotations = sorted(text[i:] + text[:i] for i in range(len(text)))
    return "".join(r[-1] for r in rotations), rotations

def fm_index(b):
    """C[c]: number of characters smaller than c; occ[c][i]: count of c in b[:i]."""
    C, total = {}, 0
    for c in sorted(set(b)):
        C[c] = total
        total += b.count(c)
    occ = {c: [0] for c in C}
    for ch in b:
        for c in C:
            occ[c].append(occ[c][-1] + (ch == c))
    return C, occ

def backward_search(pattern, C, occ, n):
    """Return the range [lo, hi) of sorted rotations that begin with pattern."""
    lo, hi = 0, n
    for c in reversed(pattern):
        if c not in C:
            return 0, 0
        lo, hi = C[c] + occ[c][lo], C[c] + occ[c][hi]
        if lo >= hi:
            return lo, lo
    return lo, hi

text = "ACAACG$"
b, rots = bwt(text)
print("BWT:", b)
C, occ = fm_index(b)
sa = sorted(range(len(text)), key=lambda i: text[i:])      # suffix array
for p in ["AC", "AAC", "CG", "GA"]:
    lo, hi = backward_search(p, C, occ, len(b))
    print(p, hi - lo, "occurrence(s) at", sorted(sa[i] for i in range(lo, hi)))
```

```
BWT: GC$AAAC
AC 2 occurrence(s) at [0, 3]
AAC 1 occurrence(s) at [2]
CG 1 occurrence(s) at [4]
GA 0 occurrence(s) at []
```

(Sorting all rotations, as this listing does, takes $O(n^2\log n)$ time and is only for illustration; real indexers build the suffix array of a genome in linear or near-linear time.)

### From seeds to alignments

Exact search finds exact matches, but reads differ from the reference. BWA-MEM (Li, 2013) finds **maximal exact matches** between the read and the genome as seeds, clusters seeds that are consistent with one placement, and extends them by banded Smith–Waterman alignment with clipping at the ends; minimap2 (Li, 2018) does the equivalent for long and noisy reads using minimizer seeds. RNA-sequencing reads span introns and need **spliced** alignment, which allows long gaps bounded by splice signals (STAR, Alexander Dobin and colleagues, 2013; HISAT2). The output, in SAM or BAM format ([[bioinformatics/sequences-databases]]), records each read's position, its alignment as a CIGAR string, and a confidence in the placement.

::: definition Mapping quality {#def-mapq}
The **mapping quality** of a read is the Phred-scaled probability that its reported position is wrong:

$$
\mathrm{MAPQ} = -10\log_{10}\Prob(\text{mapped position is incorrect}).
$$

A read that aligns equally well to two places has $\Prob = \tfrac12$ and $\mathrm{MAPQ} \approx 3$; mappers usually report 0 for reads with several equally good placements. A unique, well-matched placement may receive 60.
:::

Mappers estimate the probability from the alignment scores of the best and second-best placements: if the best is much better than any alternative, the read is confidently placed. Reads from repeats — transposable elements, segmental duplications, paralogous genes — get low mapping qualities, and variant callers ignore or downweight them, which is why variants in such regions are hard to detect with short reads ([[genomics/genome-architecture]]).

## Calling variants

After mapping, each position of the reference is covered by a **pileup** of read bases. At most positions they all agree with the reference; at a heterozygous site in a diploid individual, about half carry another base; at a homozygous variant, nearly all do. Sequencing errors scatter occasional disagreements everywhere. A **variant caller** decides, at each position, which genotype the individual most probably has.

::: proposition Genotype likelihoods {#prop-gl}
At a site with reference allele $R$ and candidate alternative allele $A$, suppose $n$ reads cover the site, $j$ of them showing $A$ and $n - j$ showing $R$, each read base independently wrong with probability $\varepsilon$ (and an error produces the other allele). For a diploid individual the likelihoods of the three genotypes are

$$
\begin{aligned}
L(RR) &= (1 - \varepsilon)^{n-j}\varepsilon^{j},\\
L(RA) &= \left(\tfrac12\right)^{n},\\
L(AA) &= \varepsilon^{n-j}(1 - \varepsilon)^{j},
\end{aligned}
$$ {#eq-gl}

up to the binomial coefficient $\binom nj$, which is common to all three and cancels. With prior probabilities $\Prob(G)$, the posterior is $\Prob(G\mid\text{reads}) = L(G)\Prob(G)/\sum_{G'}L(G')\Prob(G')$.
:::

::: proof
Under genotype $RR$, each read samples a chromosome carrying $R$ and reports $A$ only by error, with probability $\varepsilon$, independently. Under $AA$ the roles are reversed. Under $RA$, each read samples either chromosome with probability $\tfrac12$ and reports its allele correctly with probability $1 - \varepsilon$ or the other one with probability $\varepsilon$, so it shows $A$ with probability $\tfrac12(1 - \varepsilon) + \tfrac12\varepsilon = \tfrac12$. Multiplying over independent reads and applying Bayes' theorem ([[biostatistics/probability-distributions]]) gives the result.
:::

Real callers use each base's own error probability from its Phred quality, combined with the read's mapping quality, rather than a single $\varepsilon$. The prior encodes how common variants are: in humans, two randomly chosen chromosomes differ at about one site in a thousand, so a typical prior is $\Prob(RA) \approx 10^{-3}$, $\Prob(AA) \approx 5\times10^{-4}$, and $\Prob(RR)$ the rest.

::: example Is this site heterozygous? {#ex-genotype}
At a site covered by 10 reads, 3 show the alternative allele. Take $\varepsilon = 0.01$ and priors $\Prob(RR) = 0.9985$, $\Prob(RA) = 0.001$, $\Prob(AA) = 0.0005$. Compute the posterior probabilities of the three genotypes. Then repeat for 6 alternative reads out of 20.
::: solution
By [[#eq-gl]] the likelihoods are $L(RR) = 0.99^7\times0.01^3 = 9.32\times10^{-7}$, $L(RA) = 0.5^{10} = 9.77\times10^{-4}$ and $L(AA) = 0.01^7\times0.99^3 = 9.7\times10^{-15}$. The data favour $RA$ over $RR$ by a factor of about 1,050. Multiplying by the priors: $RR$: $9.32\times10^{-7}\times0.9985 = 9.31\times10^{-7}$; $RA$: $9.77\times10^{-4}\times0.001 = 9.77\times10^{-7}$; $AA$: negligible. Normalising gives $\Prob(RR\mid\text{reads}) = 0.49$ and $\Prob(RA\mid\text{reads}) = 0.51$.

Three alternative reads out of ten are not enough to overcome a prior that makes any given site a thousand times more likely to be homozygous reference. The **genotype quality**, the Phred-scaled probability that the called genotype is wrong, is $-10\log_{10}(1 - 0.51) = 3$ — essentially no confidence.

With 6 of 20 reads, $L(RR) = 0.99^{14}\times0.01^6 = 8.7\times10^{-13}$ and $L(RA) = 0.5^{20} = 9.5\times10^{-7}$, a likelihood ratio of about $10^6$, and $\Prob(RA\mid\text{reads}) = 0.9991$, a genotype quality of 30. Depth matters: the evidence grows exponentially with the number of reads.
:::
:::

::: widget distribution
dist: binomial
params: n=20, p=0.5
a: 0
b: 3
caption: The number of reads carrying the alternative allele at a heterozygous site covered by 20 reads, binomial with $n = 20$ and $p = \tfrac12$, ignoring errors. The shaded probability of 3 or fewer alternative reads is 0.0013, so a true heterozygote rarely looks like a homozygote at this depth. Reduce $n$ to 6 and notice that a heterozygote shows no alternative read at all with probability $1/64 \approx 0.016$ — why low-coverage regions produce missed heterozygous calls.
:::

### What goes wrong

The model of [[#prop-gl]] assumes independent errors and correctly placed reads. Most practical difficulties are violations of these assumptions.

- **PCR duplicates** — copies of the same original molecule — are not independent evidence; they are marked by their identical start positions and counted once.
- **Systematic errors** recur in the same sequence context, for example after homopolymers or in GC-rich regions; base-quality recalibration and filters for **strand bias** (an alternative allele seen only on reads from one strand) catch some of them.
- **Mismapped reads** from paralogous regions produce apparent heterozygous sites at high density; low mapping quality, excess depth and clusters of variants are warning signs.
- **Indels** misalign: a read ending near an insertion may be aligned with mismatches instead of a gap. Modern callers such as GATK HaplotypeCaller (Ryan Poplin, Mark DePristo and colleagues; described in 2018) reassemble the reads locally into candidate haplotypes before computing likelihoods, and DeepVariant (Poplin and colleagues, 2018) treats calling as image classification with a convolutional network trained on samples whose genotypes are known ([[bioinformatics/machine-learning]]).

Calls are benchmarked against reference samples characterised by many technologies, such as the Genome in a Bottle Consortium's samples (Justin Zook and colleagues, from 2014). Simple summary statistics also catch problems: the ratio of transitions to transversions among single-nucleotide variants is about 2.0–2.1 across a human genome and near 3 in coding exons, while errors have a ratio nearer 0.5 (two transversions are possible for every transition), so a low ratio indicates many false calls.

::: example How many false calls? {#ex-false}
A caller makes a false single-nucleotide variant call at a rate of $10^{-6}$ per reference position. How many false calls does it make in a human genome of $3\times10^9$ positions, and how does this compare with the number of true variants?
::: solution
$3\times10^9\times10^{-6} = 3{,}000$ false calls. A typical human genome differs from the reference at about 4–5 million sites (the 1000 Genomes Project, 2015), so false calls are well under 0.1 % of the total. But in a search for the one causal variant in a patient, which is filtered down to a few hundred rare, protein-altering candidates, 3,000 genome-wide errors — concentrated in difficult regions and genes — can be a large fraction of the candidates. Error rates per site that look tiny are not tiny when multiplied by a genome.
:::
:::

::: warning "The reference genome is the normal sequence"
A reference genome is a single, largely haploid representation assembled from a few individuals; it is not a healthy or ancestral genome, and at hundreds of thousands of positions it carries the minor allele. "Variant" means "differs from the reference", not "abnormal" or "harmful". Mapping to one reference also biases results: reads carrying alleles that differ from it map less well ("reference bias"), and sequence absent from the reference cannot be found at all. **Pangenome** references, such as the Human Pangenome Reference Consortium's graph of 47 phased diploid assemblies (Wen-Wei Liao and colleagues, 2023), represent many haplotypes at once, and mapping reads to such graphs reduces these biases ([[genomics/human-variation]]).
:::

::: application Somatic variants in cancer
Tumour genomes carry somatic mutations absent from the patient's normal cells. Calling them compares tumour with normal reads from the same person, and the statistics differ from germline calling: a tumour sample is a mixture of cancer and normal cells, and the cancer is itself a mixture of subclones, so a somatic mutation may be present in only 5–10 % of the reads at a site rather than near 50 %. Callers model this variable allele fraction explicitly and need high depth. Which mutations matter clinically, and how they guide treatment, is described in Medicine Atlas ([cancer biology](/learn/medicine/lesson.php?c=pathology&l=cancer-biology)).
:::

::: history
Rodger Staden's programs assembled Sanger reads in the late 1970s; Phil Green's phrap (1990s) and Gene Myers's Celera assembler (2000) assembled the *Drosophila* and human genomes from overlaps. Idury and Waterman (1995) proposed sequencing-by-hybridisation assembly with $k$-mer graphs, and Pevzner, Tang and Waterman's Eulerian assembler (2001) established the de Bruijn approach that Velvet, ABySS, SOAPdenovo and SPAdes used for short reads from 2008. Burrows and Wheeler published their transform as a technical report at the Digital Equipment Corporation in 1994; Ferragina and Manzini's FM-index (2000) made it searchable; Bowtie and BWA (2009) applied it to read mapping. Bayesian genotype likelihoods were introduced in callers such as MAQ (Li, Ruan and Durbin, 2008), SAMtools (2009) and GATK (Aaron McKenna, DePristo and colleagues, 2010).
:::

::: summary
- Overlap graphs make assembly a Hamiltonian-path problem; de Bruijn graphs, with $(k-1)$-mers as vertices and $k$-mers as edges ([[#def-dbg]]), make it an Eulerian-path problem, solvable in linear time when degrees balance ([[#prop-euler]]). Repeats longer than $k$ give several Eulerian paths; assemblers output unambiguous contigs.
- Errors create rare $k$-mers, tips and bubbles; the $k$-mer spectrum separates them from genuine $k$-mers. Larger $k$ resolves more repeats but needs more accurate reads and higher coverage. Long reads and string graphs now give chromosome-scale and telomere-to-telomere assemblies.
- The Burrows–Wheeler transform ([[#def-bwt]]) and its last-to-first mapping ([[#prop-lf]]) allow backward search for a pattern in $O(m)$ time independent of genome size ([[#alg-backward]]); the FM-index stores it compactly. Mappers seed with exact matches and extend by banded alignment; MAPQ is the Phred-scaled probability of a wrong placement ([[#def-mapq]]).
- Genotype likelihoods $L(RR) = (1-\varepsilon)^{n-j}\varepsilon^j$, $L(RA) = 2^{-n}$, $L(AA) = \varepsilon^{n-j}(1-\varepsilon)^j$ combine with priors to give posteriors and genotype qualities ([[#prop-gl]]); depth matters exponentially.
- Duplicates, systematic errors, mismapping and indels violate the model; local reassembly, machine-learning callers, benchmarks and summary statistics such as Ti/Tv guard against false calls. The reference is not "normal", and pangenome graphs reduce reference bias.
:::

## Exercises

::: exercise Counting k-mers {level=1 check="141"}
How many $k$-mers (with $k = 10$) does a read of 150 bases contain?
::: solution
$L - k + 1 = 150 - 10 + 1 = 141$.
:::
:::

::: exercise Error-free k-mers {level=1 check="0.7323"}
With a per-base error rate of 1 %, what is the probability that a 31-mer contains no error (four decimal places)?
::: solution
$0.99^{31} = 0.7323$.
:::
:::

::: exercise Mapping quality {level=1 check="20"}
A mapper estimates that a read's reported position is wrong with probability 0.01. What MAPQ does it report?
::: solution
$-10\log_{10}0.01 = 20$.
:::
:::

::: exercise A Burrows–Wheeler transform {level=2}
Compute the BWT of `GATTA$` and use backward search to count the occurrences of `TA`.
::: solution
The sorted rotations of `GATTA$` are `$GATTA`, `A$GATT`, `ATTA$G`, `GATTA$`, `TA$GAT`, `TTA$GA`, so $\mathrm{BWT} = $ `ATG$TA`. Counts: `$` 1, `A` 2, `G` 1, `T` 2, so $C[\$] = 0$, $C[\mathtt A] = 1$, $C[\mathtt G] = 3$, $C[\mathtt T] = 4$.

Search `TA` from the right. `A`: $[\ell, h) = [1 + \mathrm{Occ}(\mathtt A, 0), 1 + \mathrm{Occ}(\mathtt A, 6)) = [1, 3)$, the rows `A$GATT` and `ATTA$G`. `T`: $\mathrm{Occ}(\mathtt T, 1) = 0$ (`A` contains no `T`) and $\mathrm{Occ}(\mathtt T, 3) = 1$ (`ATG` contains one), so $[\ell, h) = [4, 5)$: one row, `TA$GAT`. `TA` occurs once, at zero-based position 3 of `GATTA`.
:::
:::

::: exercise A de Bruijn graph with a repeat {level=2}
(a) Build the de Bruijn graph with $k = 3$ for the sequence `CAGTCAGA`, keeping track of how many times each 3-mer occurs, and determine whether its Eulerian path is unique. (b) What is the smallest $k$ for which no vertex of the graph has more than one outgoing edge?
::: solution
(a) The 3-mers are `CAG`, `AGT`, `GTC`, `TCA`, `CAG`, `AGA`, so the edges are `CA`→`AG` (twice), `AG`→`GT`, `GT`→`TC`, `TC`→`CA` and `AG`→`GA`. `CA` has out-degree 2 and in-degree 1, `GA` in-degree 1 and out-degree 0, and `AG` (in 2, out 2), `GT` and `TC` are balanced, so an Eulerian path runs from `CA` to `GA`. At `AG` it can continue to `GT` or to `GA`; going to `GA` first would end the walk with edges unused, so the path is forced: `CA AG GT TC CA AG GA`, spelling `CAGTCAGA`. Here the repeat `CAG` is a loop that can be traversed in only one order, but the assembler has to know that `CAG` occurs twice — if multiplicities were discarded, the loop would be lost.

(b) Branching arises when a $(k-1)$-mer occurs twice with different successors. The repeated substring is `CAG` (length 3), so for $k - 1 \le 3$ there is a branch (at `AG` for $k = 3$, at `CAG` for $k = 4$). For $k = 5$ the vertices `CAGT`, `AGTC`, `GTCA`, `TCAG` and `CAGA` are all distinct, and the graph is a single unbranched path. In general, a repeat of length $r$ is resolved once $k - 1 > r$.
:::
:::

::: exercise Genotype posterior at low depth {level=2}
At a site covered by 4 reads, all showing the alternative allele, compute the likelihoods of the three genotypes with $\varepsilon = 0.01$ and the posterior with the priors of [[#ex-genotype]]. Which genotype is called, and how confident should we be?
::: solution
$L(RR) = 0.01^4 = 10^{-8}$; $L(RA) = 0.5^4 = 0.0625$; $L(AA) = 0.99^4 = 0.961$. Multiplying by priors: $RR$ $10^{-8}$; $RA$ $6.25\times10^{-5}$; $AA$ $4.80\times10^{-4}$. Normalising: $\Prob(AA) = 4.80/(4.80 + 0.625) = 0.885$, $\Prob(RA) = 0.115$. The call is $AA$ with genotype quality $-10\log_{10}0.115 = 9.4$: a heterozygote would show four alternative reads out of four with probability $1/16$, so the possibility cannot be excluded at this depth.
:::
:::

::: exercise Reading a Ti/Tv ratio {level=3}
Two variant call sets from the same human genome have transition/transversion ratios of 2.05 (set A, 4.6 million SNVs) and 1.80 (set B, 5.2 million SNVs). Assume that true SNVs have Ti/Tv $= 2.05$ and false calls have Ti/Tv $= 0.5$. Estimate how many false calls set B contains beyond those in set A.
::: solution
Let set B contain $T$ true and $F$ false calls with $T + F = 5.2\times10^6$. True calls are transitions with probability $2.05/3.05 = 0.672$; false calls with probability $0.5/1.5 = 0.333$. B's overall fraction of transitions is $1.80/2.80 = 0.643$. So $0.672T + 0.333F = 0.643\times5.2\times10^6$, with $T = 5.2\times10^6 - F$: $0.672\times5.2\times10^6 - 0.339F = 3.343\times10^6$, giving $3.495\times10^6 - 0.339F = 3.343\times10^6$ and $F \approx 4.5\times10^5$. Set A, at the true ratio, contains few false calls by this measure, so B has roughly 450,000 additional false calls — consistent with its 600,000 extra SNVs, most of which are probably errors. (Real call sets differ in regions as well, and coding regions have a different Ti/Tv, so this is an approximate check.)
:::
:::

::: exercise Choosing k {level=3}
You assemble a 50 Mb fungal genome from 150-base reads at 40-fold coverage with error rate 0.5 %. (a) For $k = 31$ and $k = 101$, what is the expected number of times each genomic $k$-mer is seen? (b) What fraction of $k$-mers are error-free in each case? (c) Which $k$ resolves more repeats, and what is the risk of the larger value?
::: solution
(a) Each read contributes $150 - k + 1$ $k$-mers, so $k$-mer coverage is $40\times(150 - k + 1)/150$: $40\times120/150 = 32$ for $k = 31$ and $40\times50/150 = 13.3$ for $k = 101$.

(b) $0.995^{31} = 0.856$ and $0.995^{101} = 0.603$. So the effective coverage by error-free $k$-mers is about $32\times0.856 = 27$ and $13.3\times0.603 = 8.0$.

(c) $k = 101$ resolves repeats up to about 100 bases, which $k = 31$ collapses. But at an effective coverage of 8, some genomic $k$-mers will be missed entirely (Poisson probability $e^{-8} \approx 3\times10^{-4}$ per $k$-mer, so thousands across 50 Mb), breaking contigs, and the error and true peaks of the $k$-mer spectrum overlap more. Multi-$k$ assemblers use small $k$ to connect the graph in low-coverage regions and large $k$ to resolve repeats.
:::
:::
