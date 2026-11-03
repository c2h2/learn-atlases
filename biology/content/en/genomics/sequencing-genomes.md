In 1977 Frederick Sanger's group read the complete genome of the bacteriophage φX174: 5,386 nucleotides, the work of several years. In 1995 a team at The Institute for Genomic Research in Maryland assembled the 1.83-megabase genome of the bacterium *Haemophilus influenzae*, the first genome of a free-living organism. The public Human Genome Project took thirteen years and some US\$3 billion to produce a human sequence that was still missing about 8 % of the genome when it was declared finished in 2004. As of 2026, a single instrument can sequence dozens of human genomes in a day, and the gaps left in 2004 have been closed.

This chapter explains how that happened. It is not mainly a story about faster machines, although the machines matter. It is about an idea — **shotgun sequencing**: break the genome into random fragments, read a short stretch of each, and let a computer reconstruct the whole from the overlaps — and about the two things that limit it: errors in the reads, and repeats in the genome. We start with what a read is and how good it is, then work out how many reads are needed, how they are assembled into a genome, and how the quality of an assembly is judged. The chemistry of chain-termination sequencing, PCR and library cloning is in [[molecular-biology/molecular-tools]]; here we build on it.

## Reads and their quality

Every sequencing technology produces **reads**: strings of bases, each read from one DNA fragment (or from a cluster of identical copies of one fragment), with a confidence attached to each base. Technologies differ in three properties that determine what they are good for:

- **read length**, from about a hundred bases to a megabase or more;
- **accuracy**, and above all the *kind* of errors — random substitutions are easy to correct by reading the same base many times, while systematic errors that recur in every read of a given sequence are not;
- **throughput and cost** per base.

Accuracy is reported on a logarithmic scale introduced with the base-calling program *phred* by Brent Ewing and Phil Green in 1998, for Sanger reads of the Human Genome Project.

::: definition Phred quality score {#def-phred}
If the probability that a base call is wrong is $P_e$, its **Phred quality** is

$$
Q = -10\log_{10}P_e, \qquad P_e = 10^{-Q/10}.
$$ {#eq-phred}

Q10 means a 1-in-10 chance of error, Q20 1 in 100, Q30 1 in 1,000 and Q40 1 in 10,000. The same scale is used for the accuracy of a whole assembly (the **consensus quality**, QV).
:::

Quality scores are estimates, calibrated by the instrument's software from features of the raw signal, and they are only as good as that calibration. They are stored with every read in the FASTQ format, one ASCII character per base.

::: example What a quality score means for a read {#ex-phred}
A short read of 150 bases has quality Q30 at every position. (a) What is the expected number of errors in the read? (b) What is the probability that it is error-free? (c) A long read of 20,000 bases has a mean quality of Q20, with independent errors. How many errors does it contain on average?
::: solution
(a) $P_e = 10^{-3}$ per base, so the expected number of errors is $150\times10^{-3} = 0.15$.

(b) If errors are independent, $P(\text{no error}) = (1 - 10^{-3})^{150} = 0.861$: about one read in seven contains at least one error.

(c) $P_e = 10^{-2}$, so about $20{,}000\times0.01 = 200$ errors per read. Such a read is still extremely useful for assembly, because 200 errors scattered along 20 kb do not prevent it from being matched to other reads; but they must be corrected before the sequence is trusted base by base.
:::
:::

## Sequencing technologies

### Sanger sequencing

Chain-termination sequencing ([[molecular-biology/molecular-tools]]) produces one read of 600–1,000 bases per reaction, at Q20 or better over most of its length. It powered every genome project until the mid-2000s, including the reference human genome, and it remains in use for checking individual clones and PCR products. Its limitation is throughput: each read needs its own reaction and its own capillary, so a human genome at several-fold coverage required tens of millions of reactions.

### Short reads: massively parallel sequencing by synthesis

The step change came when millions of fragments could be read at once on a surface. The first commercial platform (454 pyrosequencing, Marcel Margulies and colleagues, 2005) amplified fragments on beads in picolitre wells and detected the light released when a nucleotide was incorporated. The approach that came to dominate, developed by Shankar Balasubramanian and David Klenerman at Cambridge and commercialised by Solexa and then Illumina, works as follows.

1. **Library preparation.** Genomic DNA is broken into fragments of a few hundred base pairs, and short synthetic **adapters** are joined to both ends. The adapters carry the sequences that bind the fragments to the flow cell and prime the sequencing reactions, and often a short **index** ("barcode") that identifies the sample, so that hundreds of samples can be pooled in one run.
2. **Clonal amplification.** Single fragments bind to oligonucleotides on a glass flow cell and are copied in place into clusters of about a thousand identical molecules, so that each cluster gives a signal strong enough to see.
3. **Cyclic sequencing.** In each cycle, a polymerase adds one nucleotide to each growing strand. The nucleotides carry a fluorescent dye (a different colour, or combination of channels, for each base) and a reversible block on the 3′-OH, so only one base is added. The flow cell is imaged, the dye and the block are cleaved off, and the next cycle begins. One cycle reads one base in every cluster simultaneously.
4. **Paired ends.** After reading one end of the fragment, the instrument can read the other end, giving a **read pair** whose separation (the insert size, a few hundred base pairs) is roughly known.

Read length is limited by **phasing**: in each cycle a small fraction of the strands in a cluster fail to extend, or extend twice, and fall out of step with the rest. The signal becomes a blur of neighbouring positions.

::: proposition Signal decay by dephasing {#prop-phasing}
If in each cycle a fraction $p$ of the strands in a cluster falls out of step, independently between cycles, the fraction still in phase after $n$ cycles is

$$
f_n = (1 - p)^n \approx e^{-pn}.
$$ {#eq-phasing}

The read becomes unreliable when $f_n$ falls below some threshold $f^\ast$, at $n^\ast \approx -\ln f^\ast/p$ cycles.
:::

With $p = 0.2$ % per cycle, 74 % of the strands are in phase after 150 cycles and 55 % after 300. As of 2026, Illumina instruments routinely produce paired reads of 2 × 150 bases (up to 2 × 300 on smaller instruments), with substitution error rates of roughly 0.1–1 % and very few insertion or deletion errors; other short-read platforms (from Element Biosciences, MGI/Complete Genomics, Ultima Genomics and others) use different chemistries with broadly similar outputs. A single high-end flow cell yields terabases of sequence.

::: widget plot
f: 100*(1 - p)^x
x: 0, 600
y: 0, 100
sliders: p=0.002:0.0005:0.01:0.0005
labels: \%\ \text{of strands in phase}
hlines: 50
caption: The percentage of strands in a cluster that are still in phase after $x$ sequencing cycles, by [[#eq-phasing]], when a fraction $p$ of strands drops out of step each cycle. At the default $p = 0.002$ half the strands are out of step after about 350 cycles (the dashed line marks 50 %). Move $p$ to 0.01 and the halfway point falls to about 70 cycles. Small improvements in chemistry per cycle produce large gains in read length, which is why short-read lengths crept up from 25 bases in 2006 to 150–300 bases a decade later.
:::

### Long reads: single molecules

Short reads cannot span the long repeats that make up much of eukaryotic genomes. Two technologies read single molecules, without amplification, over tens of kilobases or more.

**Single-molecule real-time (SMRT) sequencing** (Pacific Biosciences; John Eid and colleagues, 2009) watches one DNA polymerase at the bottom of a tiny well, a *zero-mode waveguide*, so small that only the volume around the polymerase is illuminated. Each fluorescently labelled nucleotide glows briefly while it is held in the active site; the sequence of flashes is the sequence of the strand being copied. A single pass has an error rate of roughly 10 %, mostly insertions and deletions, but they are largely random. If the template is a circle (a double-stranded fragment closed by hairpin adapters at both ends), the polymerase goes round it repeatedly, and the **circular consensus** of many passes is far more accurate: these **HiFi reads** are typically 15–20 kb long with accuracy above Q30 (as of 2026).

**Nanopore sequencing** (Oxford Nanopore Technologies, first sold in 2014) threads a single strand of DNA through a protein pore in a membrane, driven by a voltage. The ionic current through the pore depends on the few bases inside it at any moment, and a neural-network base caller translates the current trace into sequence. There is no limit to read length other than the length of the DNA: reads of tens to hundreds of kilobases are routine, and reads of more than a megabase have been reported from carefully extracted DNA. Accuracy has improved steadily, to about Q20 for single reads with the chemistry available in 2024–2026; the remaining errors cluster in homopolymers (runs of one base), whose length is hard to judge from a current that does not change while the run passes. Because the signal comes from the native molecule, both long-read methods can also detect modified bases such as 5-methylcytosine ([[genomics/epigenomics]]), and nanopores can read RNA directly.

::: example Circular consensus {#ex-ccs}
A single pass of a polymerase around a circular template has an error rate of 10 % per base, and suppose (as an illustrative simplification) that errors are independent between passes and that the consensus at a base is wrong only when at least half the passes are wrong there. What is the consensus error rate, and the Phred quality, for 5 passes and for 15 passes?
::: solution
The number of erroneous passes at a base is binomial with $n$ passes and $p = 0.1$.

For $n = 5$, the consensus is wrong if 3 or more passes err:
$\sum_{j=3}^{5}\binom{5}{j}0.1^j0.9^{5-j} = 0.0081 + 0.00045 + 0.00001 = 0.0086$, so $Q = -10\log_{10}0.0086 = 20.7$.

For $n = 15$, it is wrong if 8 or more err: the sum is $3.4\times10^{-5}$, $Q \approx 45$.

The point is the rapid improvement with passes: random errors are removed by repetition. (This treatment is pessimistic, because two erroneous passes rarely make the *same* error and so do not outvote the correct base; real circular-consensus accuracy depends on the error model of the polymerase and on the sequence context.) For example, a 15-kb insert copied by a polymerase that synthesises about 100 kb is read in about 6–7 passes, which is why HiFi reads are usually 15–20 kb: longer inserts give fewer passes and lower accuracy.
:::
:::

| technology | typical read length (as of 2026) | single-read accuracy | main error type | main uses |
|---|---|---|---|---|
| Sanger (capillary) | 600–1,000 b | Q20–Q30+ | low-quality ends | checking clones and PCR products |
| short-read sequencing by synthesis | 2 × 100–300 b | Q30 for most bases | substitutions | resequencing, RNA-seq, counting assays |
| PacBio HiFi | 15–20 kb | above Q30 | indels in homopolymers | de novo assembly, structural variants, phasing |
| Oxford Nanopore | 10–100 kb, ultra-long > 100 kb | about Q20 | indels in homopolymers | assembly, structural variants, field sequencing, native RNA and modifications |

::: warning More coverage does not cure every error
Reading a base 30 times outvotes *random* errors, so a consensus of short reads is very accurate. It does nothing against *systematic* errors that every read makes in the same place — homopolymer length in nanopore reads, a polymerase that stalls on a particular motif, or a GC-rich region that amplifies poorly and is under-represented in every library. Systematic errors need a different technology, a better base caller or a corrected chemistry, not more of the same reads. This is why the best assemblies combine data types.
:::

As for cost: the US National Human Genome Research Institute (NHGRI) has tracked the cost of sequencing a human genome since 2001. By its estimates it fell from about US\$100 million in 2001 to around US\$1,000 by the mid-2010s and to a few hundred dollars in the early 2020s; Illumina announced a reagent cost of about US\$200 for a 30× genome in 2022. Such figures depend on what is counted (instruments, labour, analysis, storage) and should always be quoted with their source and year.

## Coverage: how much sequencing is enough?

A shotgun experiment samples fragments at random positions. How many reads do we need to cover the genome, and into how many pieces will the result fall? The answer, given by Eric Lander and Michael Waterman in 1988 for the clone-mapping projects of the time, is still the starting point for designing any sequencing project.

::: definition Coverage {#def-coverage}
If $N$ reads of length $L$ are sequenced from a genome of length $G$, the **coverage** (or **depth**) is

$$
c = \frac{NL}{G},
$$ {#eq-coverage}

the average number of reads overlapping a base. It is written as a multiple: "30× coverage".
:::

If reads start at independent, uniformly random positions, the number of reads covering a given base is approximately Poisson with mean $c$. The fraction of the genome not covered at all is therefore $e^{-c}$: 37 % at 1×, 0.7 % at 5× and effectively none at 30× (an example in [[molecular-biology/molecular-tools]] works these numbers out). But covering every base is not enough for assembly. Two reads can be joined only if they overlap by at least some minimum length $T$ (otherwise the overlap could have arisen by chance), and the reads between gaps form a **contig**, a contiguous assembled sequence.

::: widget distribution
dist: poisson
params: lambda=8
a: 0
b: 2
caption: The number of reads covering one base of the genome, if reads fall at random: Poisson with mean equal to the coverage $c$ (the slider). The shaded bars, 0 to 2 reads, are positions with too little depth to call a base confidently, let alone a heterozygous genotype, which needs reads from both chromosomes. At 8× about 1.4 % of positions have two or fewer reads; raise the coverage to 30 and the shaded probability becomes about $4.5\times10^{-11}$. Real coverage is more variable than this, because fragmentation, amplification and sequencing all favour some sequences over others.
:::

::: proposition The Lander–Waterman model {#prop-lw}
Suppose $N$ reads of length $L$ start at independent uniformly random positions on a genome of length $G \gg L$, and two reads are joined when they overlap by at least $T$ bases. Write $c = NL/G$ and $\sigma = 1 - T/L$. Then the expected number of contigs is

$$
\E[\text{number of contigs}] = N\,e^{-c\sigma},
$$ {#eq-lw}

and the expected number of reads per contig is $e^{c\sigma}$.
:::

::: proof
Read start positions form, to a good approximation, a Poisson process along the genome with rate $\alpha = N/G$ per base. Consider one read starting at position $x$. It is the *last* read of its contig if no other read starts in the window $(x, x + L - T]$, because any read starting there would overlap it by at least $T$ bases and extend the contig. The window has length $L - T = L\sigma$, so the probability that it contains no start is $e^{-\alpha L\sigma} = e^{-c\sigma}$. Every contig has exactly one last read, so the expected number of contigs is the expected number of reads that are last, $Ne^{-c\sigma}$. The $N$ reads are divided among these contigs, so the mean number of reads per contig is $N/(Ne^{-c\sigma}) = e^{c\sigma}$.
:::

The expected number of contigs first *rises* with coverage — at low coverage most reads are isolated, and each new read is a new contig — peaks at $c = 1/\sigma$, and then falls exponentially as gaps are filled.

::: example Planning a bacterial genome {#ex-lw}
A bacterial genome of 5 Mb is sequenced with reads of 150 bases, and the assembler needs an overlap of $T = 30$ bases. How many reads are needed, and how many contigs are expected, at 1×, 5×, 10× and 20× coverage?
::: solution
Here $\sigma = 1 - 30/150 = 0.8$ and $N = cG/L = c\times5\times10^6/150 = 33{,}333\,c$.

| coverage $c$ | reads $N$ | expected contigs $Ne^{-0.8c}$ |
|---|---|---|
| 1× | 33,333 | 14,978 |
| 5× | 166,667 | 3,053 |
| 10× | 333,333 | 112 |
| 20× | 666,667 | 0.1 |

Under the model, 20× short-read coverage should give the whole genome in one piece. Real short-read assemblies of bacteria at 20× or more typically end up in tens to a hundred or more contigs. The model is right about random sampling; the extra breaks are caused by repeats — rRNA operons, insertion sequences, duplicated genes — longer than the reads, which no amount of coverage resolves. Long reads of 10–20 kb, longer than nearly all bacterial repeats, routinely give complete circular chromosomes.
:::
:::

::: widget plot
f: (1000000*G/L)*x*exp(-x*(1 - T/L))
x: 0, 20
sliders: G=5:1:100:1; L=150:50:2000:50; T=30:10:500:10
labels: \text{expected contigs}
caption: The Lander–Waterman prediction [[#eq-lw]] of the number of contigs against coverage $c$ (horizontal axis), for a genome of $G$ megabases, reads of $L$ bases and a minimum overlap of $T$ bases. The curve peaks at $c = 1/\sigma$ and then falls exponentially. Increase $L$ with $G$ fixed and the peak drops, because the same coverage is made of fewer, longer reads; increase $T$ and the decline is delayed, because more overlap is demanded. The model ignores repeats, which in real genomes set a floor under the number of contigs that more coverage cannot remove.
:::

## Assembly

**De novo assembly** reconstructs a genome from reads alone, without a reference. Two families of algorithms do this, and the choice between them follows from the reads.

### Overlap graphs

The natural approach is **overlap–layout–consensus** (OLC): compare every read with every other to find overlaps; build a graph in which each read is a node and each sufficient overlap an edge; find a path through the graph that visits each read (the layout); and compute the consensus base at each position from the aligned reads. This was how the Sanger-era genomes, including Celera's human assembly, were built, and it is again how long reads are assembled, because a long read can be compared with others despite its errors. Gene Myers showed in 2005 that removing redundant ("transitive") edges turns the overlap graph into a simpler **string graph**. Modern long-read assemblers such as Canu (Sergey Koren and colleagues, 2017) and hifiasm (Haoyu Cheng and colleagues, 2021) belong to this family.

### De Bruijn graphs

All-against-all comparison is impractical for a billion short reads. Short-read assemblers instead break the reads into overlapping words of length $k$ (**k-mers**) and build a graph of them, an idea brought to sequence assembly by Pavel Pevzner, Haixu Tang and Michael Waterman (2001) and made practical for short reads by assemblers such as Velvet (Daniel Zerbino and Ewan Birney, 2008).

::: definition De Bruijn graph of reads {#def-dbg}
For a chosen word length $k$, the **de Bruijn graph** of a set of reads has a node for each distinct $(k-1)$-mer and a directed edge for each distinct $k$-mer occurring in the reads, from the node of its first $k-1$ bases (its prefix) to the node of its last $k-1$ bases (its suffix). Each read is a walk in the graph, and the genome — if every $k$-mer of it was sampled — is a walk that uses every edge: an **Eulerian path**.
:::

The trick is that finding a path that uses every *edge* once (an Eulerian path) is easy — it takes time proportional to the number of edges, by an algorithm of Carl Hierholzer from 1873 (see [graph algorithms](/learn/maths/lesson.php?c=discrete&l=graph-algorithms) in Maths Atlas) — whereas finding a path that visits every *node* once, as the overlap formulation requires, is in general a hard problem. In practice assemblers do not search for a single Eulerian path: they simplify the graph and report the unbranched stretches ("unitigs") as contigs.

```python
from collections import defaultdict

def de_bruijn(reads, k):
    """Nodes are (k-1)-mers; each distinct k-mer in the reads is an edge prefix -> suffix."""
    kmers = {r[i:i + k] for r in reads for i in range(len(r) - k + 1)}
    graph = defaultdict(list)
    for km in sorted(kmers):
        graph[km[:-1]].append(km[1:])
    return graph

def eulerian_path(graph):
    """Hierholzer's algorithm: a walk that uses every edge exactly once."""
    out_deg = {u: len(v) for u, v in graph.items()}
    in_deg = defaultdict(int)
    for vs in graph.values():
        for v in vs:
            in_deg[v] += 1
    # start at a node with one more outgoing than incoming edge, if there is one
    start = next((u for u in graph if out_deg[u] - in_deg[u] == 1), next(iter(graph)))
    edges = {u: list(vs) for u, vs in graph.items()}
    stack, path = [start], []
    while stack:
        u = stack[-1]
        if edges.get(u):
            stack.append(edges[u].pop())
        else:
            path.append(stack.pop())
    path.reverse()
    return path[0] + ''.join(node[-1] for node in path[1:])

genome = 'ATGGCGTGCAATCCGTTAGC'                          # 20 bp, made up
reads = [genome[i:i + 8] for i in range(0, 13, 3)]       # five overlapping 8-base reads
g = de_bruijn(reads, k=5)
print(len(g), 'nodes;', sum(map(len, g.values())), 'edges')   # 16 nodes; 16 edges
print(eulerian_path(g) == genome)                              # True
```

Real reads complicate the picture. A sequencing error creates up to $k$ false $k$-mers, seen once or twice, which form short dead-end "tips" and "bubbles" in the graph; assemblers remove $k$-mers whose count is too low. A heterozygous site in a diploid creates a bubble too, with two paths of similar depth. And reads come from both strands, so each $k$-mer is merged with its reverse complement.

### Repeats are the fundamental problem

::: intuition Why repeats break assemblies
Suppose a sequence $R$ occurs twice in the genome: $\ldots X R Y \ldots U R V\ldots$. If $R$ is longer than a read (or, in a de Bruijn graph, longer than $k$), no read connects $X$ to $Y$ through $R$: every read either lies inside $R$ or touches only one of its flanks. The graph has two paths into $R$ and two out of it, and the data are equally consistent with the order $XRY\ldots URV$ and with $XRV\ldots URY$. Coverage cannot help; only a read, or a read pair, or some other long-range link that spans $R$ can. The longest repeats a technology can span set the limit of what it can assemble.
:::

This is why the choice of $k$ is a compromise: a larger $k$ resolves more repeats, but needs more reads to cover every $k$-mer and is more sensitive to errors. It is also why human genome assemblies remained incomplete until long reads: the human genome contains hundreds of thousands of copies of *Alu* (about 300 bp) and L1 (up to about 6 kb) elements, segmental duplications of tens to hundreds of kilobases that are more than 95 % identical, and centromeric satellite arrays megabases long ([[genomics/genome-architecture]]).

### Scaffolding and phasing

Contigs are ordered, oriented and joined into **scaffolds** with long-range information: read pairs with known separation, optical maps of restriction sites on single long molecules, and above all **Hi-C** contact maps ([[genomics/nuclear-organisation]]), in which the frequency of contacts between two contigs falls with their distance along the chromosome. Gaps of estimated size are filled with runs of `N`. A chromosome-scale scaffold may still contain many gaps.

In a diploid genome, the two copies of each chromosome differ at about one site per thousand in humans and at far more in many other species. A **haplotype-resolved** (phased) assembly reconstructs both copies separately. Long reads link nearby heterozygous sites; Hi-C, ultra-long reads or sequencing of both parents (**trio binning**, Sergey Koren and colleagues, 2018) link distant ones.

### Estimating genome size from k-mers

The count spectrum of $k$-mers in the reads tells us about a genome before it is assembled. If $k$ is large enough that most $k$-mers occur once in the genome (for a mammal, $k \ge 21$ or so), each is seen a Poisson-distributed number of times, with mean equal to the **k-mer coverage** $c_k = c\,(L - k + 1)/L$. A histogram of $k$-mer counts therefore shows a peak at $c_k$, a spike near 1 to 2 from sequencing errors, and in a heterozygous diploid a second peak at $c_k/2$ from $k$-mers unique to one haplotype.

::: example Genome size from a k-mer histogram {#ex-kmer}
A plant is sequenced with $8\times10^8$ reads of 150 bases. Counting 21-mers, the main peak of the histogram is at 26. After discarding error $k$-mers, estimate the genome size and the base coverage.
::: solution
Each read contains $L - k + 1 = 130$ 21-mers, so the total number of $k$-mers is $8\times10^8\times130 = 1.04\times10^{11}$. (Discarding error $k$-mers, a small fraction, changes this little; we neglect it.) If a typical genomic $k$-mer is seen 26 times, the number of distinct genomic positions is

$$
G \approx \frac{1.04\times10^{11}}{26} = 4.0\times10^{9}\ \text{bp}.
$$

The base coverage is $c = c_kL/(L - k + 1) = 26\times150/130 = 30$, and indeed $8\times10^8\times150/(4\times10^9) = 30$. The method was used for the giant panda in 2010 (Ruiqiang Li and colleagues) and is now standard. It underestimates genome size where repeats collapse into high-count $k$-mers, unless those are counted at their multiplicity.
:::
:::

## Judging an assembly

Three questions are asked of every assembly: is it **contiguous**, is it **complete**, and is it **correct**?

::: definition N50 {#def-n50}
Sort the contigs (or scaffolds) of an assembly from longest to shortest and add up their lengths. The **N50** is the length of the contig at which the running total first reaches half of the total assembly length: half of the assembly lies in contigs of this length or longer. N90 and similar statistics are defined in the same way. The **NG50** uses half of the estimated genome size instead of the assembly length, so that assemblies of different total size can be compared.
:::

::: example Computing N50 {#ex-n50}
An assembly of a 5-Mb genome has 16 contigs of lengths (in kb) 1,200, 900, 600, 500, 400, 300, 250, 200, 150, 100, 100, 100, 50, 50, 50, 50. Find the N50 and N90, and the mean contig length.
::: solution
The total is 5,000 kb, half is 2,500 kb. Running sums: 1,200, 2,100, 2,700 — the total passes 2,500 kb at the third contig, so N50 = 600 kb. For N90 we need 4,500 kb: running on, 3,200, 3,600, 3,900, 4,150, 4,350, 4,500, so N90 = 150 kb. The mean contig length is $5{,}000/16 = 312.5$ kb. The mean is pulled down by many small contigs; the N50 describes where most of the sequence is. Neither says anything about whether the contigs are *correct*: joining unrelated contigs raises the N50.
:::
:::

**Completeness** is assessed by looking for genes expected to be present. BUSCO (Felipe Simão and colleagues, 2015) searches an assembly for a set of genes that occur in a single copy in almost all species of a lineage (a few hundred for all eukaryotes, several thousand for vertebrates) and reports the percentage found complete, duplicated, fragmented or missing. **Correctness** is assessed by consistency with independent data: whether the reads map back evenly; the consensus quality estimated from $k$-mers present in the assembly but absent from accurate short reads (the approach of the program Merqury, Arang Rhie and colleagues, 2020); and agreement with genetic or Hi-C maps, which reveals misjoins and inversions.

::: quiz
Assembly A has an N50 of 2 Mb and BUSCO completeness of 85 %; assembly B of the same genome has an N50 of 400 kb and BUSCO completeness of 98 %. Which statement is best supported?
- [ ] A is better, because a larger N50 means a more accurate assembly.
- [x] A is more contiguous, but B contains more of the expected genes; neither statistic shows which has fewer misassemblies.
- [ ] B is better, because BUSCO measures base-level accuracy.
- [ ] The two must be wrong, because a more contiguous assembly is always more complete.
::: solution
N50 measures contiguity, not correctness; an aggressive assembler can raise it by joining contigs wrongly. BUSCO measures gene content (completeness and duplication), not base accuracy. B has fewer breaks in genes but more contigs; A may have lost or collapsed some gene-containing regions. To compare correctness you need independent evidence: mapped reads, $k$-mer consensus quality, and genetic or Hi-C maps.
:::
:::

## Reference genomes and resequencing

Once a good assembly exists for a species, most later sequencing is **resequencing**: reads from another individual are aligned to the **reference genome**, and the differences are called as variants. Aligning a billion short reads to a 3-Gb reference is itself an algorithmic achievement, made practical by compressed indexes of the reference based on the Burrows–Wheeler transform (programs such as BWA, Heng Li and Richard Durbin, 2009) and, for long reads, by fast seed-and-chain methods (minimap2, Li, 2018); see [[bioinformatics/assembly-variants]]. Variant calling then weighs the reads at each site, with their base and mapping qualities, to decide the genotype ([[genomics/human-variation]]).

The human reference has a history of its own. The Human Genome Project used a hierarchical strategy: the genome was first cloned in about 150-kb bacterial artificial chromosomes (BACs), the clones were mapped, and each was shotgun-sequenced and assembled separately, so repeats only had to be resolved within a clone. Celera Genomics, led by J. Craig Venter, applied whole-genome shotgun sequencing directly. Both drafts were published in February 2001. The current reference assembly, GRCh38, was released in 2013 and is a mosaic of the DNA of a few dozen donors, most of it from one individual. In 2022 the Telomere-to-Telomere Consortium (Sergey Nurk and colleagues) published T2T-CHM13, the first gap-free sequence of all 22 autosomes and the X chromosome, assembled from long reads of a cell line (CHM13) that is almost entirely homozygous, which removes the problem of separating two haplotypes. It added about 200 Mb of sequence, mainly centromeric satellites, segmental duplications and the short arms of the acrocentric chromosomes. A complete Y chromosome followed in 2023.

::: warning A reference genome is not *the* genome of a species
A reference is one haploid sequence, usually from one or a few individuals, chosen for convenience. Every other individual differs from it at millions of sites, and carries sequence the reference lacks. Reads from such sequence fail to map or map to the wrong place, and variants in it are missed — a **reference bias** that is strongest for individuals most distantly related to the reference donor. **Pangenome** references address this by representing the sequences of many individuals as a graph: the draft human pangenome of 2023 (Wen-Wei Liao and colleagues) combined phased assemblies of 47 people and added about 119 Mb of euchromatic sequence that varies between people and is not represented in GRCh38.
:::

::: application Sequencing all of eukaryotic life
The Earth BioGenome Project, launched in 2018, aims to produce reference genomes for all of the roughly 1.5–2 million described species of eukaryotes, through national and taxonomic projects such as the Darwin Tree of Life (for the species of Britain and Ireland) and the Vertebrate Genomes Project, with minimum standards for contiguity, completeness and consensus quality. As of 2026, chromosome-scale assemblies exist for several thousand eukaryotic species — a small fraction of the goal. They are used in conservation to measure inbreeding and genetic load in endangered species ([[population-genetics/inbreeding]]) and in comparative genomics ([[genomics/comparative-genomics]]).
:::

::: history
The first nucleic-acid sequence was an RNA: Robert Holley's group sequenced the 77 nucleotides of a yeast alanine tRNA in 1965, after years of partial digestion and analysis of fragments. DNA sequencing became practical in 1977 with Allan Maxam and Walter Gilbert's chemical method and the chain-termination method of Frederick Sanger, Steve Nicklen and Alan Coulson. Sanger's group introduced random shotgun sequencing with the 48.5-kb genome of bacteriophage λ in 1982. Applying the shotgun to a whole bacterial genome was thought too ambitious until Robert Fleischmann, J. Craig Venter, Hamilton Smith and colleagues assembled *H. influenzae* Rd in 1995; the yeast (1996), *Caenorhabditis elegans* (1998) and *Drosophila melanogaster* (2000) genomes followed before the human drafts of 2001.
:::

::: summary
- Sequencing produces reads whose value depends on length, accuracy and the kind of error; base accuracy is measured on the Phred scale, $Q = -10\log_{10}P_e$ ([[#def-phred]]).
- Short-read sequencing by synthesis reads clusters of amplified fragments one base per cycle; dephasing limits read length to a few hundred bases ([[#prop-phasing]]). Long-read methods (PacBio HiFi, nanopores) read single molecules over tens of kilobases; repeated passes or better base calling remove random errors, but not systematic ones.
- Coverage $c = NL/G$; the fraction uncovered is $e^{-c}$ and the expected number of contigs $Ne^{-c\sigma}$ ([[#prop-lw]]). Beyond modest coverage, repeats longer than the reads, not sampling, limit assembly.
- Overlap (string) graphs suit long reads; de Bruijn graphs of $k$-mers suit short reads ([[#def-dbg]]). Scaffolding uses read pairs, optical maps and Hi-C; phasing separates the haplotypes of a diploid.
- Assemblies are judged by contiguity (N50, [[#def-n50]]), completeness (BUSCO) and correctness (read mapping, $k$-mer consensus quality, maps); none of these measures implies the others.
- Resequencing aligns reads to a reference; references are single haploid sequences, and pangenome graphs reduce the resulting bias. The first complete human genome sequence was published in 2022.
:::

## Exercises

::: exercise Phred scores {level=1 check="0.0005"}
A base is called with quality Q33. What is the probability that it is wrong? Give the answer to one significant figure.
::: solution
$P_e = 10^{-33/10} = 10^{-3.3} = 5.0\times10^{-4}$.
:::
:::

::: exercise Reads needed {level=1 check="600000000"}
How many 150-base reads are needed for 30× coverage of a 3.0-Gb genome?
::: solution
$N = cG/L = 30\times3.0\times10^9/150 = 6.0\times10^8$ reads (or $3\times10^8$ read pairs of 2 × 150 bases).
:::
:::

::: exercise The peak of the contig curve {level=2}
Show from [[#eq-lw]] that the expected number of contigs is greatest at $c = 1/\sigma$, and find its value there in terms of $G$, $L$ and $\sigma$. For $G = 5$ Mb, $L = 150$ and $\sigma = 0.8$, what is the maximum?
::: hint
Write $N = cG/L$ and differentiate $c\,e^{-c\sigma}$ with respect to $c$.
:::
::: solution
$\E[\text{contigs}] = (G/L)\,c\,e^{-c\sigma}$. Its derivative with respect to $c$ is $(G/L)e^{-c\sigma}(1 - c\sigma)$, zero at $c = 1/\sigma$, where the second derivative is negative. The maximum is $(G/L)(1/\sigma)e^{-1} = G/(e\,L\sigma)$. For the numbers given: $5\times10^6/(2.718\times150\times0.8) = 15{,}300$ contigs, at $c = 1.25$.
:::
:::

::: exercise A de Bruijn graph by hand {level=2}
Draw the de Bruijn graph with $k = 3$ (nodes are 2-mers) for the sequence `ATGCATGT`, assuming every 3-mer is sampled and each distinct 3-mer is recorded once, as in the listing above. Find an Eulerian path and the sequence it spells. Why is it not the original sequence, and what extra information would recover it?
::: solution
The 3-mers of the sequence are `ATG`, `TGC`, `GCA`, `CAT`, `ATG`, `TGT`; the distinct ones are `ATG`, `TGC`, `GCA`, `CAT`, `TGT`, giving five edges: AT→TG, TG→GC, GC→CA, CA→AT, TG→GT. Node TG has two outgoing edges and one incoming, so an Eulerian path must start there and end at GT (one incoming, none outgoing): TG→GC→CA→AT→TG→GT, spelling `TGCATGT`.

The original has the 3-mer `ATG` twice, and a set of distinct $k$-mers keeps it once, so one copy of the repeat — and with it the first base — is lost: the repeat has collapsed. Recording the **multiplicity** of each $k$-mer (from its count in the reads) gives the edge AT→TG twice; the only path that uses every edge the right number of times is AT→TG→GC→CA→AT→TG→GT, which spells `ATGCATGT`. Real assemblers use counts in this way, but counts are noisy, and for long repeats the order of what lies between the copies remains ambiguous.
:::
:::

::: exercise Choosing a technology {level=2}
For each project, say which sequencing technology (or combination) you would use and why: (a) a reference genome for a lizard with an estimated genome of 2 Gb rich in transposable elements; (b) genotypes of 5,000 cattle at known sites for genomic selection; (c) detecting large inversions and insertions in 200 human genomes; (d) identifying pathogens in the field at a remote site with no laboratory.
::: solution
(a) Long reads (PacBio HiFi for accuracy, possibly with ultra-long nanopore reads to span the longest repeats) to build contigs, Hi-C to scaffold them into chromosomes, and possibly short reads to polish or assess consensus quality. Short reads alone would leave the repeats unassembled.

(b) Short reads at low coverage with imputation, or a genotyping array: the sites are known, the reference exists, and cost per sample dominates.

(c) Long reads, which span the breakpoints and the inserted sequence of structural variants; short reads detect many structural variants indirectly (from read-pair distances and split reads) but miss most insertions and variants in repeats.

(d) A portable nanopore device, which needs little equipment and gives results in hours; its lower single-read accuracy matters less when the task is to identify organisms by matching reads to reference databases.
:::
:::

::: exercise A k-mer histogram {level=2}
A $k$-mer histogram ($k = 21$) from 150-base reads of a diploid insect has a peak at 25 and a second, slightly lower peak at 50. (a) Which peak corresponds to $k$-mers present on both haplotypes? (b) Estimate the base coverage per haploid genome. (c) What does a strong first peak suggest about the species?
::: solution
(a) $k$-mers shared by both homologues are sampled from both copies, so they appear twice as often: the peak at 50 is homozygous sequence, and the peak at 25 is $k$-mers unique to one haplotype (overlapping heterozygous sites).

(b) The $k$-mer coverage of the diploid genome is 50 (both copies); per haploid copy it is 25. Base coverage per haploid copy is $25\times150/130 = 28.8$, so about 58× in total.

(c) A heterozygous peak nearly as high as the homozygous peak means that a large fraction of 21-mers overlap a heterozygous site — high heterozygosity, of the order of 1 % or more per base. That is typical of species with large effective population sizes, many insects among them, and it makes assembly harder: the assembler may separate the two haplotypes into duplicated contigs. Phasing or trio data, or sequencing an inbred individual, helps.
:::
:::

::: exercise Interpreting an assembly report {level=3}
Two assemblies of the same 1.2-Gb bird genome are reported:

| | assembly 1 (short reads) | assembly 2 (long reads + Hi-C) |
|---|---|---|
| total length | 1.05 Gb | 1.19 Gb |
| contig N50 | 45 kb | 18 Mb |
| scaffold N50 | 12 Mb | 85 Mb |
| BUSCO complete (single / duplicated) | 92 % / 1 % | 96 % / 4 % |

(a) What explains the difference in total length? (b) Why might assembly 1 have a large scaffold N50 but a small contig N50, and what does that imply for the sequence it contains? (c) Assembly 2 has more duplicated BUSCO genes. Give two possible explanations and say how you would distinguish them.
::: solution
(a) Assembly 1 is shorter than the genome mainly because repeats longer than short reads collapse into single copies or are left out, and because GC-rich regions — bird microchromosomes are notably GC-rich — are under-represented in short-read libraries. Long reads recover both.

(b) Scaffolding with read pairs or long-range data joins contigs into large scaffolds across gaps filled with `N`s. A contig N50 of 45 kb means the scaffolds are broken by many gaps; much of the sequence near repeats is missing, even though the order of contigs is known.

(c) Either the genes are truly duplicated in this species (or in this lineage), or the assembler has kept both haplotypes of a heterozygous region as separate contigs ("haplotypic duplication"), which inflates assembly size. To distinguish them: check read depth over the duplicated copies (half depth for each copy of a haplotypic duplicate, full depth for a true paralogue); check $k$-mer spectra (Merqury reports $k$-mers from one copy appearing twice); compare the two copies' sequence divergence with typical heterozygosity; and check with a second, phased assembly or with parental data.
:::
:::

::: exercise Why short reads failed the centromeres {level=3}
Human centromeres consist of tandem arrays of a 171-bp α-satellite monomer organised into higher-order repeat units of several kilobases that are themselves repeated hundreds to thousands of times, with copies of the higher-order unit more than 98 % identical. (a) Using the argument of the intuition box on repeats, explain why short reads cannot assemble such an array, whatever the coverage. (b) Why do even 20-kb reads not trivially solve the problem? (c) What feature of the arrays did the T2T project exploit?
::: solution
(a) Every short read falls inside the array and matches many places in it equally well. In the assembly graph the array collapses into a small cycle (one higher-order unit) of very high depth; the number of times the cycle is traversed, and the order of variant copies, cannot be recovered from reads shorter than the unit.

(b) A 20-kb read spans only a few higher-order units. If the copies were identical, any read inside the array would be consistent with many positions, and arrays of megabases could not be ordered. Long reads help only if the units differ.

(c) The rare differences between copies — single-base and small structural variants scattered through the array — act as markers. Accurate HiFi reads detect these differences reliably, so reads can be overlapped using only those sites that distinguish copies; ultra-long nanopore reads of 100 kb or more then link the resulting pieces across the stretches where copies are identical. Because CHM13 is almost entirely homozygous, there was no need to distinguish two haplotypes at the same time.
:::
:::
