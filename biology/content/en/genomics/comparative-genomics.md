A single genome is a long text in a language we only partly understand. Two genomes are more than twice as informative, because the differences and similarities between them carry the signature of evolution. Sequences that matter are conserved, because mutations in them have been removed by selection; sequences that do not matter drift apart at the neutral rate. Genes that have been duplicated, lost, rearranged or transferred between species leave traces that can be read from their arrangement and their divergence. The first comparison of the human and mouse genomes, in 2002, showed in one stroke that about 5 % of the human genome was conserved more than neutral sequence was expected to be — more than three times the fraction that codes for protein — and so must hold functional elements nobody had yet found.

This chapter develops the concepts of comparative genomics: homology and its kinds, gene families and the fates of duplicated genes, whole-genome duplication, the conservation of gene order, the detection of constrained and accelerated sequence, and the pangenomes of bacteria. The population genetics of substitution — the neutral theory, the molecular clock and $d_N/d_S$ — is in [[population-genetics/neutral-theory]]; tree building is in [[evolution/phylogenetics]].

## Homology: orthologues and paralogues

Two sequences are **homologous** if they descend from a common ancestral sequence. Homology is a hypothesis about history, inferred from similarity: aligned unrelated DNA sequences match at about 25 % of positions or more, and optimally aligned unrelated proteins often reach 15–20 % identity, so only identity well above these levels over a long alignment is evidence of common ancestry. How much higher, and how to quantify the evidence, is the business of alignment statistics.

::: proposition Expected number of chance alignments (Karlin–Altschul) {#prop-evalue}
For local alignments of a query of length $m$ against a database of total length $n$, with a scoring system whose expected score per aligned pair is negative, the expected number of distinct local alignments with score at least $S$ that arise by chance between unrelated sequences is approximately

$$
E = K\,m\,n\,e^{-\lambda S},
$$ {#eq-evalue}

where $\lambda$ and $K$ are constants determined by the scoring matrix, gap penalties and residue frequencies. $E$ is the **E-value** of a hit with score $S$. Equivalently, the **bit score** $S' = (\lambda S - \ln K)/\ln 2$ gives $E = mn\,2^{-S'}$.
:::

The result was derived by Samuel Karlin and Stephen Altschul (1990) for ungapped alignments, where the maximum score follows an extreme-value distribution; for gapped alignments, $\lambda$ and $K$ are estimated by simulation, and BLAST ([[bioinformatics/database-search]]) reports E-values computed this way.

::: example How significant is a hit? {#ex-evalue}
A protein query of 300 residues is searched against a database of $10^9$ residues with the BLOSUM62 matrix and gap penalties of 11 to open and 1 to extend a gap, for which $\lambda \approx 0.267$ and $K \approx 0.041$. What are the E-values of hits with raw scores 60, 80 and 100? Which would you accept as evidence of homology?
::: solution
$Kmn = 0.041\times300\times10^9 = 1.23\times10^{10}$.

- $S = 60$: $E = 1.23\times10^{10}\times e^{-16.0} = 1.4\times10^3$. More than a thousand such hits are expected by chance: no evidence at all.
- $S = 80$: $E = 1.23\times10^{10}\times e^{-21.4} = 6.5$. Still expected several times by chance.
- $S = 100$: $E = 1.23\times10^{10}\times e^{-26.7} = 0.031$. About one search in thirty would produce such a hit between unrelated sequences: suggestive, and conventionally significant at $E < 0.05$, but not overwhelming. Hits between genuinely related proteins usually have E-values many orders of magnitude smaller.

Notice how steep the dependence on $S$ is — each extra point of score divides $E$ by $e^{0.267} = 1.31$ — and that $E$ grows in proportion to the database. The same alignment becomes less significant as databases grow, and a weak hit against a database of $10^{12}$ residues would be a thousand times less impressive. (The bit score of the hit with $S = 100$ is $(26.7 - \ln 0.041)/\ln 2 = 43$ bits.)
:::
:::

Homologous genes in different species fall into two kinds, distinguished by the event that separated them.

::: definition Orthologues, paralogues and xenologues {#def-orthologue}
Walter Fitch (1970) defined two genes as **orthologues** if they diverged at a **speciation** event — their common ancestor was a single gene in the ancestral species — and as **paralogues** if they diverged at a **duplication** event. Genes acquired by horizontal transfer from another lineage are **xenologues**. Paralogues created by a duplication after a given speciation are **in-paralogues** relative to that speciation (both are co-orthologous to the single gene in the other species); those from a duplication before it are **out-paralogues**. Paralogues created by whole-genome duplication are called **ohnologues**, after Susumu Ohno.
:::

The human α- and β-globin genes are paralogues: they arose by a duplication about 450 million years ago, in an early jawed vertebrate. Human β-globin and mouse β-globin (more precisely, the adult β-like genes) are orthologues. The definitions refer to history, not to function or similarity: orthologues can diverge in function and paralogues can remain interchangeable.

In practice, orthologues are identified either by building a **gene tree** for a family and reconciling it with the **species tree** — each node of the gene tree is a speciation or a duplication — or, more crudely, as **reciprocal best hits**: gene $a$ in species A and gene $b$ in species B are each other's best match in the other genome. Reciprocal best hits fail when genes have been lost differentially: if A kept one paralogue of a duplicated pair and B kept the other, the best hits are reciprocal but the genes are paralogues ("hidden paralogy").

::: warning Similarity is a measurement; homology is a yes-or-no statement about history
It is common to read that two sequences are "60 % homologous". Two genes either share a common ancestor or do not; what can be 60 % is their *identity* or *similarity*. A related mistake is to assume that orthologues have the same function and paralogues different ones. The "orthologue conjecture" is a statistical tendency at best: large analyses of functional annotations disagree on how strong it is, and individual orthologues can change function considerably. Transfer of annotation by homology is a hypothesis to be tested, not a result.
:::

## Gene families and the fates of duplicate genes

Most genes belong to families of paralogues, from pairs to families of hundreds (the olfactory receptor genes number about 400 functional genes in humans and more than 1,000 in mice). Families grow by duplication and shrink by deletion and pseudogenisation, a turnover called **birth-and-death evolution** (Masatoshi Nei and colleagues). Duplications arise by unequal crossing over, by retrotransposition of an mRNA (giving an intronless copy, the counterpart of a processed pseudogene in [[genomics/genome-architecture]]), by segmental duplication, and by duplication of whole genomes.

A new duplicate is usually redundant: one copy suffices, so mutations that inactivate the other are nearly neutral. Three outcomes are possible.

1. **Non-functionalisation**: one copy accumulates a null mutation and decays into a pseudogene. This is the commonest fate. Michael Lynch and John Conery (2000) estimated from the age distribution of duplicates in several eukaryotic genomes that new duplicates arise at about 0.01 per gene per million years and that most are lost within a few million years.
2. **Neofunctionalisation** (Ohno, 1970): one copy keeps the ancestral function while the other acquires a new one by mutations that would have been harmful in a single-copy gene.
3. **Subfunctionalisation**: each copy loses a different part of the ancestral function — for example, expression in different tissues, controlled by different enhancers — so that both are now needed. In the **duplication–degeneration–complementation** model (Allan Force, Michael Lynch and colleagues, 1999) this happens by degenerative, nearly neutral mutations alone, and it explains why duplicates are retained more often than neofunctionalisation predicts.

A fourth consideration is **dosage balance**: genes whose products form complexes or regulatory networks are sensitive to their copy number relative to their partners. Duplicating one of them alone upsets the balance and is selected against, but after a whole-genome duplication every partner is duplicated together, and losing one copy is what upsets the balance. Such genes (transcription factors, kinases, ribosomal proteins) are therefore under-represented among small-scale duplicates and over-represented among retained ohnologues, as Birchler and Veitia, among others, argued.

::: proposition Age distribution of duplicate genes {#prop-ks}
Suppose duplicate pairs are created at a constant rate $B$ per unit time and each pair, once created, loses one copy at a constant rate $\delta$. Then the expected number of surviving pairs whose duplication occurred a time $t$ ago is proportional to

$$
n(t) = B\,e^{-\delta t}.
$$ {#eq-ks}

If synonymous substitutions accumulate at rate $\mu$ per site in each copy, a pair of age $t$ has an expected synonymous divergence $K_s \approx 2\mu t$, so the distribution of $K_s$ among duplicate pairs decreases exponentially. A whole-genome duplication at time $t_0$ adds a cohort of pairs all of the same age, which appears as a peak around $K_s \approx 2\mu t_0$.
:::

::: proof
Pairs born in a short interval $[t, t + dt]$ before the present number $B\,dt$ on average; each survives to the present with probability $e^{-\delta t}$ under a constant loss rate, so the expected number is $Be^{-\delta t}\,dt$. Each copy accumulates synonymous substitutions independently along its own lineage since duplication, so their divergence is the sum over two lineages, $2\mu t$, in expectation. Changing variables from $t$ to $K_s = 2\mu t$ preserves the exponential form, with rate $\delta/2\mu$. A cohort of $N_0$ pairs created at $t_0$ contributes $N_0e^{-\delta' t_0}$ survivors (with its own loss rate $\delta'$), all of age $t_0$; random variation in the number of substitutions spreads them into a peak around $2\mu t_0$.
:::

::: widget plot
f: exp(-x/0.15) + W*exp(-(x - m)^2/0.03)
x: 0, 2
y: 0, 1.5
sliders: W=0.4:0:1:0.05; m=0.8:0.2:1.8:0.05
labels: \text{density of duplicate pairs}
caption: An illustrative age distribution of duplicate gene pairs, measured by synonymous divergence $K_s$ (horizontal axis). Continual small-scale duplication followed by rapid loss gives the exponential "L-shape" of [[#eq-ks]]; a whole-genome duplication adds a peak of ohnologues at $K_s \approx 2\mu t_0$, of height $W$. Move the peak to the right (an older duplication) and imagine it flattening: older cohorts have lost more copies, and real $K_s$ values above about 1–1.5 are unreliable, because synonymous sites become saturated with multiple substitutions. This is why ancient duplications, such as the two rounds at the base of vertebrates, are detected from gene order rather than from $K_s$.
:::

::: example Dating a duplication from Ks {#ex-wgd-age}
In a plant genome, the $K_s$ distribution of paralogous pairs shows a peak at $K_s = 0.75$. If synonymous sites evolve at $1.5\times10^{-8}$ substitutions per site per year in this lineage, when did the duplication occur? Why is the estimate uncertain?
::: solution
$K_s \approx 2\mu t$, so $t = 0.75/(2\times1.5\times10^{-8}) = 2.5\times10^7$ years: about 25 million years ago. The numbers are illustrative but typical of such analyses. The estimate is uncertain because synonymous rates differ among lineages and with generation time; at $K_s$ near 1, multiple substitutions are frequent and corrections for them are model-dependent; synonymous sites are not entirely neutral (codon bias, splicing signals); and gene conversion between paralogues makes some pairs look younger than they are. Dates of genome duplications are therefore usually calibrated by placing the duplication on a dated species tree: a duplication shared by two species but absent in a third that branched earlier lies between the two speciations.
:::
:::

## Whole-genome duplication

Susumu Ohno argued in *Evolution by Gene Duplication* (1970) that two rounds of whole-genome duplication early in vertebrate history supplied the raw material for vertebrate complexity. For decades the hypothesis was hard to test, because most duplicate genes are lost and the survivors have been rearranged. The decisive evidence came from yeast.

::: example The yeast genome duplication {#ex-yeast-wgd}
Kenneth Wolfe and Denis Shields (1997) noticed that the genome of *Saccharomyces cerevisiae* contains 55 large duplicated blocks, in which several pairs of paralogues lie in the same order and orientation on two chromosomes. In 2004 Manolis Kellis, Bruce Birren and Eric Lander sequenced *Kluyveromyces waltii* (now *Lachancea waltii*), a yeast that diverged before the duplication. They found that almost every region of *K. waltii* corresponds to *two* regions of *S. cerevisiae*, but that in most of these, only one of the two *S. cerevisiae* regions retains a given gene. Explain why the two-to-one correspondence is the decisive evidence, and why the duplicated blocks within *S. cerevisiae* alone were not.
::: solution
Within *S. cerevisiae*, after massive gene loss, the two copies of a duplicated region share only a minority of their genes: about 90 % of duplicate pairs lost one copy, and the losses alternate between the two regions. A block of shared paralogues is then short and could have arisen by many independent segmental duplications. The outgroup reveals the pattern: an ordered series of genes in *K. waltii*, $a\,b\,c\,d\,e\,f$, maps to two *S. cerevisiae* regions as $a\,\_\,c\,\_\,\_\,f$ and $\_\,b\,c\,d\,e\,\_$, which interleave to reconstruct the ancestral order. When this "doubly conserved synteny" covers essentially the whole genome, a single event that duplicated everything at once is the economical explanation; independent segmental duplications would not produce a genome-wide 2:1 correspondence. About 500 ohnologue pairs survive in *S. cerevisiae*, from an ancestral gene set of about 5,000.
:::
:::

Comparable evidence has since established genome duplications across eukaryotes:

- **Vertebrates**: two rounds ("2R") of genome duplication before the radiation of jawed vertebrates, more than 450 million years ago. The four *Hox* clusters of mammals (one in amphioxus) are the best-known product; the timing of the second round relative to the split of jawless and jawed fishes is still debated.
- **Teleost fishes**: a third round ("3R") about 300–350 million years ago, so zebrafish often have two copies (*a* and *b*) of genes that are single in mammals. Salmonids and some carps have duplicated again.
- **Flowering plants**: every angiosperm genome analysed carries evidence of one or more ancient duplications, and many lineages have had several since. *Arabidopsis thaliana* has a compact 135-Mb genome yet records at least three rounds. Many crops are recent polyploids: bread wheat is an **allohexaploid** combining three diploid genomes (A, B, D) from two hybridisations within roughly the last million years, the second of them under cultivation about 10,000 years ago.

Two kinds of polyploid are distinguished. An **autopolyploid** doubles its own genome; an **allopolyploid** combines the genomes of two species after hybridisation, which can restore fertility to an otherwise sterile hybrid by giving every chromosome a pairing partner ([[evolution/speciation]]). Polyploidy is common in plants and rare in animals, perhaps because sex determination by sex chromosomes is disrupted by doubling.

## Synteny and rearrangement

Genes stay in the same neighbourhood over long periods of evolution: **synteny** in the modern sense means conservation of gene content on corresponding chromosomes, and **collinearity** conservation of gene order. Comparing gene order between genomes reveals rearrangements — inversions, translocations, fusions and fissions.

Human chromosome 2 is the classic case. Chimpanzees, gorillas and orangutans have 24 chromosome pairs, humans 23, and the two ape chromosomes now called 2A and 2B correspond, end to end, to human chromosome 2. At the fusion point the human chromosome carries head-to-head arrays of the telomeric repeat `TTAGGG`/`CCCTAA` (Jeffrey IJdo and colleagues, 1991), and a degenerate second centromere marks the position of the centromere of the other ancestral chromosome.

How many rearrangements separate two gene orders? For inversions of a series of conserved blocks, this is a combinatorial problem.

::: definition Breakpoints of a gene order {#def-breakpoint}
Number the conserved blocks of one genome $1, 2, \ldots, n$, write their order in the other genome as a permutation $\pi = (\pi_1, \ldots, \pi_n)$, and add the framing elements $\pi_0 = 0$ and $\pi_{n+1} = n + 1$. An adjacent pair $(\pi_i, \pi_{i+1})$ is a **breakpoint** if $\lvert\pi_{i+1} - \pi_i\rvert \ne 1$. The identity order $(1, 2, \ldots, n)$ has no breakpoints.
:::

::: proposition A lower bound on inversion distance {#prop-reversal}
Let $b(\pi)$ be the number of breakpoints of $\pi$. Any series of inversions (reversals of a contiguous segment) that transforms $\pi$ into the identity has at least $b(\pi)/2$ inversions.
:::

::: proof
An inversion of the segment $\pi_i, \ldots, \pi_j$ changes only the two adjacencies at its ends, $(\pi_{i-1}, \pi_i)$ and $(\pi_j, \pi_{j+1})$; adjacencies inside the segment are reversed but keep the same pairs of neighbours. So one inversion removes at most two breakpoints. The identity has none, so at least $b(\pi)/2$ inversions are needed.
:::

::: example Counting inversions {#ex-reversal}
Four conserved blocks appear in the order $(2, 4, 3, 1)$ in one species relative to another. Find the breakpoints, the lower bound on the number of inversions, and a series that achieves it.
::: solution
With framing: $0, 2, 4, 3, 1, 5$. Adjacencies: $(0,2)$ breakpoint, $(2,4)$ breakpoint, $(4,3)$ not, $(3,1)$ breakpoint, $(1,5)$ breakpoint. So $b = 4$ and at least 2 inversions are needed. Inverting the segment $4, 3, 1$ gives $(2, 1, 3, 4)$; inverting $2, 1$ gives $(1, 2, 3, 4)$. Two inversions suffice, so the distance is 2. (For unsigned permutations, finding the minimum is NP-hard in general; for **signed** permutations, which record the orientation of each block — the realistic case for genomes — Sridhar Hannenhalli and Pavel Pevzner gave a polynomial-time algorithm in 1995.)
:::
:::

Rates of rearrangement differ widely. Bird and turtle genomes are remarkably stable, with many chromosomes conserved for over 100 million years; rodent genomes are rearranged much faster than primate ones. Breakpoints are often at segmental duplications and other repeats, where non-allelic recombination can occur.

## Finding function through conservation

Functional sequence is conserved because mutations in it are usually harmful and are removed by purifying selection. Comparing many species therefore identifies functional elements without knowing what they do.

::: intuition Phylogenetic shadowing
Under neutrality, each site accumulates substitutions at a rate set by the mutation rate, so the number of substitutions expected at a site over a phylogeny is proportional to the total branch length of the tree (in substitutions per neutral site). Two closely related species share most sites by descent and give little power, but many species spread over a tree together provide a large total branch length. A site that has seen no change across a tree of total neutral length 4 — where four substitutions per site would be expected — is strong evidence of constraint; a 10-bp stretch of such sites, overwhelming evidence.
:::

::: example Counting rejected substitutions {#ex-gerp}
A 100-bp segment is aligned across 50 mammals. From the divergence of nearby neutral sites (such as ancestral transposon copies), the total neutral branch length of the tree is 4.0 substitutions per site. Across the segment, the reconstructed history contains 60 substitutions. (a) How many were expected under neutrality? (b) How many substitutions were "rejected" by selection? (c) Is the deficit significant?
::: solution
(a) $100\times4.0 = 400$ substitutions.

(b) $400 - 60 = 340$: in the terminology of the program GERP (Gregory Cooper and colleagues, 2005), the segment has 340 **rejected substitutions**, or 3.4 per site.

(c) If substitutions were Poisson with mean 400, the probability of 60 or fewer is about $4\times10^{-100}$ (computed by summing the Poisson probabilities). The segment is strongly constrained. Real methods also model the different rates of transitions and transversions, uncertainty in the alignment, and the variation of the neutral rate along the genome, and they correct for the very large number of segments tested.
:::
:::

What has comparative genomics found?

- **Constrained sequence.** The Zoonomia consortium's alignment of 240 placental mammals (Matthew Christmas and colleagues, 2023) identified about 3.3 % of the bases of the human genome as significantly constrained across mammals, and estimated that at least 10 % is under purifying selection; protein-coding sequence accounts for only a minority of the constrained bases. Most constrained non-coding sequence overlaps enhancers, promoters and other regulatory elements ([[genomics/functional-genomics]]).
- **Ultraconserved elements.** Gill Bejerano, David Haussler and colleagues (2004) found 481 segments of more than 200 bp identical between human, mouse and rat — far more conservation than even proteins usually show. Many lie near developmental regulatory genes; puzzlingly, deleting some of them in mice gave viable, fertile animals with no obvious phenotype in the laboratory, a reminder that strong constraint in nature can reflect fitness effects too subtle to see in the laboratory.
- **Accelerated regions.** The converse signal — sequence conserved across mammals but changed rapidly in one lineage — points to lineage-specific innovation. Katherine Pollard and colleagues (2006) identified **human accelerated regions** (HARs); the fastest, *HAR1*, lies in a non-coding RNA gene expressed in the developing cerebral cortex. Many HARs act as developmental enhancers. Regions conserved in other mammals but *deleted* in humans have also been catalogued.
- **Gene gain and loss.** Repeated, independent loss of the same gene in lineages with a shared trait links the gene to the trait. The enzyme for the final step of vitamin C synthesis (*GULO*) has been lost independently in haplorhine primates, guinea pigs, some bats and many passerine birds — all of which obtain vitamin C from their diet.

::: quiz
A non-coding element is identical in sequence across 30 mammals spanning 100 million years of evolution, but in humans it differs from the mammalian consensus at 12 of 150 positions. What does this pattern suggest?
- [ ] The element is non-functional in mammals, because it is non-coding.
- [ ] The human sequence is ancestral and other mammals have changed.
- [x] The element is under strong constraint in mammals, and something — positive selection, relaxed constraint or a mutational process such as GC-biased gene conversion — has changed it rapidly on the human lineage.
- [ ] The human differences must be sequencing errors.
::: solution
Identity across 30 species over 100 million years is far beyond what neutral evolution allows, so the element is constrained. Twelve differences confined to the human lineage is a human accelerated region. The cause has to be investigated: positive selection for a new function, loss of constraint, or GC-biased gene conversion (a non-adaptive process that favours G and C at sites of recombination, and which explains part of the HAR signal). Sequencing errors would not be shared by all human genomes, which can be checked.
:::
:::

## Bacterial pangenomes and horizontal transfer

Two strains of *Escherichia coli* can differ in a quarter or more of their genes. Herve Tettelin and colleagues (2005) introduced the **pangenome** to describe such species: the **core genome** of genes present in all strains, plus the **accessory genome** of genes present in some, including **strain-specific** genes.

::: definition Open and closed pangenomes {#def-pangenome}
If $P(N)$ is the expected number of distinct gene families found in $N$ sequenced genomes of a species, the pangenome is **open** if $P(N)$ continues to increase without limit as more genomes are added, and **closed** if it approaches a plateau. Empirically $P(N)$ is often fitted by **Heaps' law**, $P(N) \approx \kappa N^{\gamma}$: $\gamma > 0$ indicates an open pangenome and $\gamma$ close to 0 a closed one.
:::

Heaps' law is an empirical description, not a derivation from a model. Species with large populations exposed to many environments and frequent horizontal transfer, such as *E. coli*, have open pangenomes; obligate intracellular bacteria such as *Chlamydia* or *Buchnera*, with little access to foreign DNA, have nearly closed ones. As of 2026, the *E. coli* pangenome assembled from thousands of genomes runs to many tens of thousands of gene families, while any single strain carries about 4,500–5,500 genes; the exact figures depend on how gene families are clustered.

::: widget plot
f: 4800*x^g
x: 1, 200
sliders: g=0.3:0:0.7:0.01
labels: P(N)
hlines: 4800
caption: Pangenome size $P(N) = \kappa N^\gamma$ against the number of sequenced genomes $N$, with $\kappa = 4{,}800$ genes (a typical single *E. coli* genome, dashed line) and $\gamma$ set by the slider; the parameters are illustrative. With $\gamma = 0.3$, 200 genomes contain about 23,500 distinct gene families. Set $\gamma$ to 0 for a closed pangenome: every new genome brings nothing new. Increase it towards 0.7, and each genome keeps adding hundreds of genes — the signature of a species exchanging genes with a vast external pool.
:::

Accessory genes arrive by **horizontal gene transfer**: transformation, transduction by phages, and conjugation of plasmids and integrative elements ([[genetics/microbial-genetics]]). Horizontally acquired regions are recognised by sequence composition that differs from the rest of the genome (GC content, codon usage), by flanking tRNA genes and integrase genes typical of **genomic islands**, by patchy presence among close relatives, and most reliably by gene trees that conflict with the species tree. Genes for antibiotic resistance, toxin production and the use of unusual nutrients often travel this way ([[microbiology/microbial-diversity]]). Horizontal transfer also occurs, much less often, into eukaryotes: bdelloid rotifers and many insects carry bacterial and fungal genes, and plants have taken up genes from their parasites and vice versa.

::: application Orthology and model organisms
The case for studying yeast, flies, worms, zebrafish and mice rests on comparative genomics. About 80 % of mouse protein-coding genes have a single identifiable orthologue in the human genome (Mouse Genome Sequencing Consortium, 2002), and many human disease genes have orthologues in *Drosophila* and in yeast. Orthology tables — maintained by resources such as Ensembl Compara and OrthoDB — tell an experimenter which gene to study in which model, and when a duplication in one lineage (as in zebrafish) means that two genes must be inactivated to remove a function. They are also the starting point for finding the genes behind traits of non-model species, such as the loss of limbs in snakes or the tolerance of extreme cold in Antarctic fishes, whose antifreeze glycoprotein gene evolved in part from non-coding DNA.
:::

::: history
Walter Fitch distinguished orthology and paralogy in 1970, the same year Susumu Ohno published *Evolution by Gene Duplication*. Comparative mapping of mouse and human chromosomes began with genetic linkage maps in the 1970s and 1980s, and Joseph Nadeau and Benjamin Taylor estimated in 1984, from the number of conserved linkage groups, that about 180 rearrangements separated the two genomes — a figure later sequence comparisons broadly confirmed. Kenneth Wolfe and Denis Shields proposed the yeast whole-genome duplication in 1997 and Manolis Kellis and colleagues proved it in 2004 with the genome of a pre-duplication yeast. The human–mouse comparison of 2002 and the multi-species alignments that followed, culminating in the Zoonomia alignment of 240 mammals in 2023, made conservation the principal guide to non-coding function.
:::

::: summary
- Homology means common ancestry, inferred from similarity whose statistical significance is measured by E-values, $E = Kmne^{-\lambda S}$ ([[#prop-evalue]]).
- Orthologues diverged by speciation, paralogues by duplication, xenologues by horizontal transfer ([[#def-orthologue]]); orthology is inferred by reconciling gene trees with species trees, or approximately by reciprocal best hits.
- Most duplicates are lost; survivors are retained by neofunctionalisation, subfunctionalisation or dosage balance. Duplicate ages decay exponentially, with whole-genome duplications appearing as peaks in the $K_s$ distribution ([[#prop-ks]]).
- Whole-genome duplications are recognised by doubly conserved synteny against an outgroup; they occurred in yeast, at the base of vertebrates (2R), in teleosts and repeatedly in plants.
- Gene order is conserved over long periods; rearrangements are counted with breakpoint and inversion distances ([[#prop-reversal]]).
- Conservation across many species identifies functional sequence: about 3 % of the human genome is significantly constrained across mammals and at least 10 % is estimated to be under selection, most of it non-coding; accelerated regions mark lineage-specific change.
- Bacterial species have pangenomes of core and accessory genes ([[#def-pangenome]]), shaped by horizontal gene transfer.
:::

## Exercises

::: exercise E-values and database size {level=1 check="0.31"}
A hit has an E-value of 0.031 against a database of $10^9$ residues. What would its E-value be, with the same score, against a database of $10^{10}$ residues?
::: solution
$E$ is proportional to $n$, so it becomes $0.031\times10 = 0.31$: no longer significant.
:::
:::

::: exercise Orthologue or paralogue? {level=1}
A gene $X$ duplicated into $X1$ and $X2$ in the ancestor of all mammals. Classify each pair: (a) human *X1* and mouse *X1*; (b) human *X1* and human *X2*; (c) human *X1* and mouse *X2*; (d) human *X1* and the single *X* gene of a frog.
::: solution
(a) Orthologues (separated by the human–mouse speciation). (b) Paralogues. (c) Paralogues (their last common ancestor is the duplication, not a speciation). (d) Orthologues — more precisely human *X1* and *X2* are co-orthologues of frog *X*, because the duplication happened after the mammal–amphibian split; *X1* and *X2* are in-paralogues relative to that speciation.
:::
:::

::: exercise Breakpoints {level=1 check="3"}
Find the lower bound on the number of inversions needed to sort the gene order $(4, 2, 5, 3, 1)$, using [[#prop-reversal]].
::: solution
Framed: $0, 4, 2, 5, 3, 1, 6$. Every one of the six adjacencies is a breakpoint ($\lvert4-0\rvert$, $\lvert2-4\rvert$, $\lvert5-2\rvert$, $\lvert3-5\rvert$, $\lvert1-3\rvert$, $\lvert6-1\rvert$ are all different from 1), so $b = 6$ and at least 3 inversions are needed. (A search of all possibilities shows that 3 suffice.)
:::
:::

::: exercise A Ks peak {level=2}
In a fish genome, ohnologue pairs from the teleost genome duplication have $K_s$ values that are mostly above 2, whereas a second, younger set of paralogues has a peak at $K_s = 0.2$. With a synonymous rate of $3\times10^{-9}$ per site per year, date the younger duplication. Why can the older duplication not be dated from its $K_s$?
::: solution
$t = 0.2/(2\times3\times10^{-9}) = 3.3\times10^7$ years, about 33 million years ago. The older duplication's $K_s$ values are saturated: when the expected number of substitutions per synonymous site exceeds about 1–1.5, many sites have changed several times, observed differences approach the maximum for random sequences, and corrections become unreliable. Such duplications are dated by their position on the species tree (which lineages share them) and by conserved synteny.
:::
:::

::: exercise Hidden paralogy {level=2}
After a whole-genome duplication in the ancestor of species A and B, gene $g$ became $g'$ and $g''$. Species A later lost $g''$, and species B lost $g'$. (a) What will a reciprocal-best-hit search between A and B report? (b) Why is the report misleading? (c) How could you detect the problem?
::: solution
(a) A's $g'$ and B's $g''$ will be each other's best hits, since each species has only one copy, and they will be reported as orthologues.

(b) They are paralogues: their common ancestor is the duplication, not the A–B speciation. Their divergence includes the time between the duplication and the speciation, and they may have diverged in function as ohnologues often do.

(c) Build the gene tree with an outgroup species that diverged before the duplication and with other species that kept both copies; the A and B genes will fall into different ohnologue clades. Gene order also helps: $g'$ and $g''$ lie in different ohnologous blocks, so the neighbours of the A and B genes will match different duplicated regions.
:::
:::

::: exercise Constraint {level=2}
A 50-bp element shows 35 substitutions across a tree whose neutral branch length is 3.0 substitutions per site. (a) How many substitutions are rejected per site? (b) A nearby 50-bp segment shows 160 substitutions. What would you conclude about it?
::: solution
(a) Expected $50\times3.0 = 150$; rejected $150 - 35 = 115$, or 2.3 per site: strongly constrained.

(b) 160 is close to the neutral expectation of 150 (Poisson standard deviation about 12), so there is no evidence of constraint — and no strong evidence of acceleration either. The segment is evolving at roughly the neutral rate.
:::
:::

::: exercise A pangenome curve {level=2 check="0.27"}
For 10 genomes of a bacterial species, the pangenome contains 9,000 gene families; for 100 genomes, 16,800. Assuming Heaps' law $P(N) = \kappa N^\gamma$, estimate $\gamma$ to two decimal places. Is the pangenome open?
::: solution
$16{,}800/9{,}000 = 10^\gamma$, so $\gamma = \log_{10}(1.867) = 0.27$. Since $\gamma > 0$, the pangenome is open: new genomes continue to bring new gene families.
:::
:::

::: exercise Interpreting gene loss {level=3}
In a (hypothetical) survey of 120 mammal genomes, a gene involved in the production of a skin enzyme is intact in all terrestrial species but carries frameshifts or premature stop codons in all cetaceans (whales and dolphins), all sirenians (manatees and dugongs) and the hippopotamus. (a) What hypothesis does this pattern suggest? (b) Why is the result more convincing than finding the gene inactivated in a single species? (c) What alternative explanations should be considered, and how would you date the losses?
::: solution
(a) That the gene's function was lost or became unnecessary with a transition to aquatic or semi-aquatic life — for example, if the enzyme is part of a skin barrier suited to air.

(b) Cetaceans and sirenians became aquatic independently, and hippopotamuses are semi-aquatic. Repeated, independent loss correlated with the same ecological shift is a natural experiment; a single loss could be due to chance or to any of the many traits of one lineage.

(c) Sequencing or assembly errors (check that the disabling mutations are supported by reads and shared among related species); a functional paralogue that compensates; the gene's real function being something else correlated with aquatic life; and the hippopotamus result being related to cetaceans (hippos are the closest living relatives of whales, so a loss in their common ancestor would be one event, not two — check whether the inactivating mutations are shared). Losses are dated from shared versus unshared inactivating mutations on the species tree, and from the time since the gene became neutral, estimated from the increase of $d_N/d_S$ to about 1 on the branch after inactivation.
:::
:::

::: exercise Duplicate fates {level=3}
After a whole-genome duplication in a yeast lineage, ribosomal-protein genes and transcription factors are retained in two copies far more often than genes for metabolic enzymes. Small-scale duplications show the opposite tendency. (a) Explain both patterns with the dosage-balance hypothesis. (b) Why does the duplication–degeneration–complementation model also predict higher retention of genes with complex regulation? (c) Suggest an observation that would distinguish neofunctionalisation from subfunctionalisation for one retained pair.
::: solution
(a) Ribosomal proteins and transcription factors work in complexes and networks with fixed stoichiometry. Duplicating one alone (small-scale duplication) unbalances its complex and is selected against, so such genes rarely survive small-scale duplication. After a whole-genome duplication all partners are doubled, so balance is kept — and losing one copy of one partner now unbalances the system, so both copies tend to be retained. Metabolic enzymes act more independently, so loss of one copy after WGD is tolerated, while a small-scale duplicate can be favoured when more enzyme is useful.

(b) A gene with many independent regulatory elements (for different tissues or conditions) offers many ways for complementary degenerative mutations to occur, each copy losing a different element. Genes with simple regulation have fewer such opportunities and are more often non-functionalised.

(c) Compare both copies with the single-copy orthologue in an outgroup. Subfunctionalisation: the union of the two copies' expression patterns and activities equals that of the ancestral gene, with each copy doing part. Neofunctionalisation: one copy matches the ancestor, while the other has a new expression domain or biochemical activity absent from the outgroup, often with an elevated $d_N/d_S$ after duplication.
:::
:::
