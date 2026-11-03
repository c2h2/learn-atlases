For a century, the classification of bacteria was an exercise in frustration. Animals and plants could be arranged by their anatomy into a tree that reflected descent, but bacteria offered only a few shapes, a stain and a list of biochemical tests. In the 1960s the Dutch-American microbiologist Cornelis van Niel and his student Roger Stanier concluded that the natural relationships of bacteria might never be known. Twenty years later they were being read directly from the cells' own molecules — and the result overturned the basic picture of life. Ribosomal RNA sequences showed that the prokaryotes comprise two domains as different from each other as either is from eukaryotes; that most of their diversity had never been seen in culture; and, as whole genomes were sequenced, that genes move between microbial lineages so often that their evolution is as much a web as a tree.

This chapter is about how we know the evolutionary relationships of microbes and what they are. It explains why ribosomal RNA became the universal molecular chronometer, how sequence differences are turned into distances, what horizontal gene transfer is and how it is detected, how species are defined in organisms that do not reproduce sexually, and how metagenomics recovers genomes from organisms that have never been grown. The survey of named phyla is in [[diversity-of-life/bacteria-archaea]], the domains and the debate over the origin of eukaryotes in [[diversity-of-life/classifying-life]], the methods of tree building in [[evolution/phylogenetics]], and the mechanisms of gene transfer in [[genetics/microbial-genetics]].

## A universal chronometer

To compare organisms as different as a bacterium, a methanogen and a mushroom, one needs a character present in all of them, with the same function, changing slowly enough to be aligned across the whole of life but fast enough to distinguish close relatives. Emile Zuckerkandl and Linus Pauling (1965) had proposed that the sequences of proteins and nucleic acids are "documents of evolutionary history". Carl Woese chose the RNA of the small ribosomal subunit.

::: definition Small-subunit ribosomal RNA {#def-ssu}
The **small-subunit ribosomal RNA** (SSU rRNA) — **16S rRNA** in Bacteria and Archaea (about 1,500 nucleotides) and **18S rRNA** in eukaryotes (about 1,800 nucleotides) — is the RNA backbone of the ribosome's small subunit and forms its decoding centre. It is present in every cellular organism, has the same function in all, and is a mosaic of universally conserved regions, which allow sequences from distant organisms to be aligned and serve as sites for universal PCR primers, and of nine **variable regions** (V1–V9), which differ between close relatives. Genes encoding it are rarely transferred between lineages, because the rRNA must interact with dozens of ribosomal proteins.
:::

Woese and George Fox (1977) compared the RNase T1 fingerprints of 16S rRNA from a range of bacteria and found that the methanogens were as distinct from other bacteria as from eukaryotes; they called them archaebacteria, and Woese, Otto Kandler and Mark Wheelis (1990) proposed the three domains Bacteria, Archaea and Eucarya ([[diversity-of-life/classifying-life#def-domains]]). Sequencing of 16S genes became routine in the 1980s, and today hundreds of millions of 16S sequences, most from organisms that have never been cultured, are held in curated databases such as SILVA.

### From differences to distances

Two aligned sequences that differ at a fraction $p$ of their sites have diverged by more than $p$ substitutions per site, because some sites have changed more than once and some changes have reverted. The simplest correction assumes that every site changes at the same rate and that each base is equally likely to be replaced by any other.

::: proposition The Jukes–Cantor distance {#prop-jc-micro}
Under the Jukes–Cantor model, the expected number of substitutions per site separating two sequences that differ at a proportion $p$ of aligned sites is

$$
d = -\frac{3}{4}\ln\left(1 - \frac{4}{3}p\right),
$$ {#eq-jc-micro}

which is close to $p$ when $p$ is small and grows without bound as $p$ approaches the saturation value $3/4$, at which two random sequences would agree by chance at a quarter of sites. The derivation is in [[evolution/phylogenetics#prop-jc]]; more realistic models allow unequal base frequencies, different rates of transitions and transversions, and variation of rate among sites (a gamma distribution), which matters greatly for rRNA, whose conserved and variable regions change at rates differing by orders of magnitude.
:::

::: example Two 16S sequences {#ex-jc}
An alignment of the 16S rRNA genes of two bacterial isolates has 1,400 positions, of which 42 differ. (a) Calculate the identity, $p$ and the Jukes–Cantor distance. (b) For a pair of sequences from different phyla, $p = 0.25$. What is $d$? (c) Why is the correction negligible in (a) but substantial in (b)?
::: solution
(a) Identity is $1 - 42/1400 = 97.0\,\%$, so $p = 0.030$ and $d = -0.75\ln(1 - 0.04) = -0.75\times(-0.0408) = 0.0306$ substitutions per site, almost the same as $p$.

(b) $d = -0.75\ln(1 - 0.3333) = -0.75\times(-0.405) = 0.304$, about 20 % more than $p$.

(c) When few sites have changed, the chance that any one has changed twice is small. As divergence increases, multiple changes at the same site accumulate and the observed differences increasingly underestimate the substitutions — and once $p$ approaches 0.75 the sequences carry almost no information about their distance. Deep branches of the tree of life are therefore estimated mostly from the conserved regions of rRNA, or from conserved proteins, whose amino-acid alphabet of twenty saturates more slowly.
:::
:::

::: widget plot
f: -0.75*ln(1 - 4*x/3); x
x: 0, 0.7
y: 0, 2
labels: d\ \text{(Jukes–Cantor)}; d = p
vlines: 0.75
caption: The Jukes–Cantor distance $d$ against the observed proportion of differing sites $p$, compared with the uncorrected line $d = p$. The two agree for close relatives, but the corrected distance climbs steeply as $p$ approaches the saturation value $3/4$ (vertical line): at $p = 0.6$, $d$ is already 1.2 substitutions per site. Hover to see how a small error in $p$ near saturation becomes a large error in $d$.
:::

### Rooting the tree of life

A tree built from SSU rRNA alone is unrooted: it shows which groups are closest but not where the common ancestor lies. Two groups (Naoyuki Iwabe and colleagues, and Peter Gogarten and colleagues, both 1989) solved this with genes that were duplicated before the last universal common ancestor (LUCA) — the translation elongation factors EF-Tu and EF-G, and the catalytic and regulatory subunits of the proton-pumping ATPases. Each copy of a duplicated pair can root the tree of the other. Both analyses placed the root between Bacteria on one side and Archaea plus eukaryotes on the other, a placement still supported by most analyses, although whether eukaryotes arose from *within* the Archaea (the two-domain tree) is a separate question ([[diversity-of-life/classifying-life#prop-two-domains]]).

::: warning A 97 % identity does not make a species
For two decades, sequences that were at least 97 % identical in their 16S rRNA genes were grouped into "operational taxonomic units" taken to approximate species (Erko Stackebrandt and Bernhard Goebel, 1994). But the 16S gene evolves so slowly that organisms with very different genomes and ways of life can share nearly identical 16S sequences: *E. coli* and *Shigella* species differ at only a few positions, and many species in *Bacillus* and *Streptococcus* cannot be separated by 16S at all. Conversely, a single genome may carry several copies of the gene that differ by a per cent or so. A threshold of about 98.7 % is now used as the point *below* which two strains are almost certainly different species (Pablo Yarza and colleagues, 2014), not as a definition; species are delimited by whole-genome comparisons.
:::

## Horizontal gene transfer

In eukaryotes genes pass almost entirely from parent to offspring — **vertical** inheritance. In prokaryotes they also pass between unrelated cells, by **transformation** (uptake of free DNA), **transduction** (carriage by a phage) and **conjugation** (transfer through a cell-to-cell channel), whose mechanisms and use in mapping are described in [[genetics/microbial-genetics#def-transfer]]. Some alphaproteobacteria, such as *Rhodobacter capsulatus*, also release **gene transfer agents**, phage-like particles that package random fragments of the host genome (Barry Marrs, 1974).

::: definition Horizontal gene transfer and mobile genetic elements {#def-hgt}
**Horizontal (lateral) gene transfer** (HGT) is the acquisition of genetic material from an organism other than a parent. It is mediated largely by **mobile genetic elements**: **plasmids**, which replicate independently and many of which are conjugative; **transposons** and **insertion sequences**, which move within and between DNA molecules; **integrative and conjugative elements** (ICEs), which integrate into the chromosome but can excise and transfer by conjugation; **prophages** (integrated phage genomes); and **integrons**, which capture promoterless gene cassettes at a specific site and express them from their own promoter (Ruth Stokes and Ruth Hall, 1989). Large regions acquired horizontally and carrying genes for a common function are called **genomic islands** — pathogenicity islands, symbiosis islands, resistance islands, metabolic islands.
:::

For a transferred gene to persist, the DNA must enter the cell, escape destruction and be maintained. Cells defend themselves against foreign DNA with **restriction–modification systems**, which cut DNA lacking the host's methylation pattern, and with **CRISPR–Cas** adaptive immunity, which records fragments of past invaders and destroys DNA matching them ([[microbiology/viruses]]). Incoming linear DNA must be integrated by homologous recombination, which requires stretches of near-identical sequence; the rate of recombination falls roughly exponentially with sequence divergence (Ivan Matic, Miroslav Radman and colleagues, 1990s, with *E. coli* and *Salmonella*; Jacek Majewski and Frederick Cohan, 2000, with *Bacillus*), partly because the mismatch repair system rejects mismatched heteroduplexes. So genes move most freely between close relatives, while transfer between distant lineages depends mostly on elements that integrate without homology (transposons, phages, integrons).

### Detecting transferred genes

Several signatures reveal that a gene was acquired horizontally:

- **Patchy distribution**: present in a few strains of a species but absent from its close relatives, or present in a distant lineage but in no relative of the organism.
- **Phylogenetic incongruence**: a gene tree that conflicts strongly with the tree of the organisms that carry it — a gene in an archaeon that groups with bacterial homologues, for instance.
- **Atypical composition**: G+C content, codon usage or oligonucleotide frequencies differing from the rest of the genome, reflecting the donor's mutational biases. Transferred DNA gradually **ameliorates** towards the composition of its new host, so this signal fades with time.
- **Flanking signatures**: insertion next to tRNA genes (common integration sites), direct repeats, remnants of integrase or transposase genes.

::: example A genomic island by composition {#ex-gc}
A bacterial genome has an overall G+C content of 51 %. A 10 kb window contains 3,800 G or C bases. (a) If bases were drawn independently with $P(\mathrm{G\ or\ C}) = 0.51$, what would be the standard deviation of the G+C fraction in a 10 kb window, and how many standard deviations from the mean is the observed window? (b) Why does this calculation overstate the evidence for horizontal transfer? (c) What further evidence would you look for?
::: solution
(a) For a binomial proportion, $\mathrm{sd} = \sqrt{p(1 - p)/n} = \sqrt{0.51\times0.49/10{,}000} = 0.0050$. The window has G+C fraction 0.38, so it lies $(0.51 - 0.38)/0.005 = 26$ standard deviations below the mean.

(b) Real genomes are far more heterogeneous than independent draws: G+C varies with gene function, codon position, protein composition, strand and position on the chromosome, so the true spread of windows is several times larger than the binomial value. A better null distribution comes from the observed spread of windows across the genome itself. Even so, a deviation of 13 percentage points in a 51 % genome is unusual and worth investigating.

(c) Whether the genes in the window are present in close relatives; whether their phylogenies group with distant organisms; whether the window is flanked by a tRNA gene and direct repeats and contains integrase or transposase genes; and whether its codon usage differs from that of highly expressed genes in the genome.
:::
:::

### How much transfer?

Genome sequencing has shown that HGT is pervasive. *E. coli* K-12 and the enterohaemorrhagic strain O157:H7 share a common backbone of about 4.1 Mb, but O157:H7 EDL933 carries about 1.34 Mb of DNA in "O-islands" absent from K-12, including the genes for Shiga toxin (on a prophage) and for the type III secretion system with which it attaches to intestinal cells (Nicole Perna and colleagues, 2001). The hyperthermophilic bacterium *Thermotoga maritima* has about a quarter of its genes most similar to archaeal ones (Karen Nelson and colleagues, 1999), consistent with extensive transfer between organisms sharing a hot environment. Antibiotic resistance genes spread across species and genera on plasmids and integrons within years of a drug's introduction ([[microbiology/antimicrobials]]), and the cholera toxin genes of *Vibrio cholerae* are carried by a filamentous phage, CTXφ (Matthew Waldor and John Mekalanos, 1996).

The result is that strains of one species may differ greatly in gene content. Hervé Tettelin and colleagues (2005), comparing eight genomes of *Streptococcus agalactiae*, introduced the **pangenome**: the **core genome** of genes shared by all strains, and the **accessory genome** of genes present in some. They found that each newly sequenced genome added dozens of genes never seen before, with no sign of the total levelling off.

::: proposition Heaps' law for the pangenome {#prop-heaps}
In many species, the number of distinct gene families $P(N)$ found among $N$ sequenced genomes grows approximately as a power law,

$$
P(N) \approx \kappa N^\gamma,
$$ {#eq-heaps}

with $\kappa$ and $\gamma$ fitted to data (Tettelin and colleagues, 2008, writing the number of new genes per added genome as $\propto N^{-\alpha}$, so $\gamma = 1 - \alpha$). If $0 < \gamma < 1$ the pangenome is **open** — every new genome adds new genes, at a decreasing rate; if $\gamma \le 0$ ($\alpha \ge 1$) it is **closed** and approaches a finite size. This is an **empirical** regularity, borrowed from the analysis of vocabulary growth in texts; its parameters depend on how genomes are sampled and how genes are clustered into families.
:::

::: example Fitting a pangenome {#ex-heaps}
Clustering the genes of 10 genomes of a species gives 9,000 gene families; adding 90 more genomes (100 in all) raises the total to 18,000. (a) Fit [[#eq-heaps]] to these two points. (b) Is the pangenome open? (c) Predict the number of families among 1,000 genomes, and say why the prediction is uncertain.
::: solution
(a) Taking the ratio, $18{,}000/9{,}000 = (100/10)^\gamma$, so $\gamma = \log_{10}2 = 0.301$, and $\kappa = 9{,}000/10^{0.301} = 4{,}500$.

(b) Yes: $\gamma > 0$, so new genomes keep adding new families; the number added by the $N$th genome falls as $\gamma\kappa N^{\gamma - 1}$, about 54 families per genome near $N = 100$.

(c) $P(1000) = 4{,}500\times1000^{0.301} = 36{,}000$. The extrapolation assumes the power law holds far beyond the data and that the next 900 genomes are sampled like the first 100; in practice sequenced genomes are biased towards clinical or laboratory strains, and the clustering threshold for "the same family" changes the fitted $\gamma$.
:::
:::

::: widget plot
f: 4000*x^g; 4000 + 0*x
x: 1, 500
y: 0, 60000
sliders: g=0.35:0:0.8:0.01
labels: \text{pangenome } \kappa N^\gamma; \text{one genome}
caption: The growth of a pangenome by Heaps' law, $P(N) = \kappa N^\gamma$ with $\kappa = 4{,}000$ gene families (about the size of one genome), against the number of genomes sequenced $N$. With $\gamma = 0.35$ the pangenome of 500 genomes has about 35,000 families, nine times a single genome. Set $\gamma$ to 0 for a closed pangenome, in which all strains have the same genes; raise it towards 0.8 for species, such as *E. coli*, that sample genes from a vast pool shared with other bacteria and phages.
:::

Open pangenomes are typical of species that live in varied environments and exchange genes freely, such as *E. coli* and *Pseudomonas aeruginosa*; closed pangenomes of specialists in isolated niches, such as the obligate intracellular *Chlamydia trachomatis*. Why bacteria carry so many accessory genes is debated: some are adaptive in particular niches, some are selfish elements spreading at the host's expense, and some may be neutral passengers.

::: intuition A tree with a web woven through it
If genes move between lineages, is there still a "tree of life" for microbes? There are two answers. For any one gene there is a tree, but different genes give different trees, and no single tree describes the history of a whole genome. Yet a core of genes — those for translation, transcription and replication, which interact with many partners and work only in a coordinated machine — is rarely transferred (the "complexity hypothesis" of Ravi Jain, Maria Rivera and James Lake, 1999), and trees built from them agree broadly with the rRNA tree. So the tree of microbes is best pictured as a tree of the cell lineages that carry these core genes, through which a web of transfers runs, densest between close relatives and in shared environments.
:::

## What is a bacterial species?

The biological species concept defines species as groups of interbreeding natural populations reproductively isolated from others ([[evolution/speciation]]). Prokaryotes reproduce asexually, and recombination between them is occasional and not confined within species, so this concept does not apply directly. In practice, species are defined operationally:

- **DNA–DNA hybridisation** (DDH): strains whose genomic DNA re-associates to at least 70 % were long treated as one species (Lawrence Wayne and colleagues, 1987).
- **Average nucleotide identity** (ANI) of the genes shared between two genomes now replaces DDH: about 95–96 % ANI corresponds to 70 % DDH, and genome comparisons across thousands of genomes show a gap in the distribution of ANI values near this threshold, suggesting that it reflects a real discontinuity (Chirag Jain and colleagues, 2018).
- **Ecological and evolutionary concepts** treat species as clusters of strains that share a niche and are held together by periodic selection or by recombination; Frederick Cohan's "ecotypes" are populations within which adaptive mutations sweep, purging diversity.

Names follow the International Code of Nomenclature of Prokaryotes, which requires a type strain deposited in two culture collections. Because most organisms are known only from genomes, the **SeqCode** (Brian Hedlund and colleagues, 2022) allows names to be validly published with a genome sequence as the type; before it, uncultured organisms received provisional '*Candidatus*' names. The **Genome Taxonomy Database** (GTDB; Donovan Parks and colleagues, 2018) builds a standardised classification from a tree of 120 conserved bacterial (or 53 archaeal) proteins, assigning ranks by relative evolutionary divergence; its classification has led to many of the name changes of recent years, and its releases are updated as genomes accumulate (its 2024 release, R220, recognised more than 100,000 species clusters, most of them without validly published names).

::: quiz
Two strains of *Bacillus* have identical 16S rRNA genes but share only 85 % average nucleotide identity across their genomes. Which statement is best supported?
- [ ] They are the same species, because their 16S sequences are identical.
- [x] They are different species; the 16S gene changes too slowly to separate them.
- [ ] One of the genome sequences must be contaminated, since ANI and 16S always agree.
- [ ] They are the same species, because ANI does not measure relatedness.
::: solution
An ANI of 85 % is far below the species boundary of about 95 %, so the genomes as a whole have diverged substantially. The 16S rRNA gene is among the most slowly evolving genes in the genome and often fails to separate species within a genus; identical 16S sequences are consistent with millions of years of divergence elsewhere in the genome.
:::
:::

## Genomes from the environment

Culture-independent studies began with 16S rRNA genes ([[microbiology/microbial-world]]): Norman Pace and colleagues, from 1985, cloned and sequenced them directly from natural samples, and Stephen Giovannoni and colleagues (1990) found in sea water a lineage of sequences, SAR11, that turned out to be one of the most abundant groups of organisms on Earth — and that was cultured only twelve years later. Today **amplicon sequencing** of a PCR-amplified fragment of the 16S gene (often the V4 region) from thousands of samples is the standard survey method ([[diversity-of-life/bacteria-archaea]]).

**Shotgun metagenomics** sequences all the DNA in a sample. Craig Venter and colleagues (2004) sequenced DNA from the Sargasso Sea and recovered more than a million previously unknown genes; Gene Tyson, Jillian Banfield and colleagues (2004) assembled near-complete genomes of the few organisms dominating an acid mine drainage biofilm. Assembling a complex community is harder: short reads from thousands of species are assembled into fragments (**contigs**), which must then be grouped into genomes (**binning**).

::: definition Metagenome-assembled genome {#def-mag}
A **metagenome-assembled genome** (MAG) is a set of contigs, assembled from a metagenome, that are inferred to come from one population, usually because they share sequence composition (tetranucleotide frequencies) and **coverage** (the depth of sequencing, which is the same for all parts of one genome in a sample and varies in the same way across samples). A MAG represents the consensus of a population of closely related cells, not a single cell. Its quality is estimated from a set of single-copy marker genes expected in every genome of its lineage: **completeness** is the fraction present, **contamination** the excess of duplicated markers (for example with CheckM; Parks and colleagues, 2015). A "high-quality draft" MAG is more than 90 % complete with less than 5 % contamination and contains rRNA and tRNA genes (Robert Bowers and colleagues, 2017).
:::

Coverage carries quantitative information about the community.

::: proposition Coverage and abundance {#prop-coverage}
Suppose a metagenome contains $R$ reads of length $L$, and the community contains $a_i$ cells of organism $i$, each with one copy of a genome of size $G_i$. If reads are sampled in proportion to DNA mass, the expected number of reads from organism $i$ is $R\,a_iG_i/\sum_ja_jG_j$, and the expected **coverage** of its genome is

$$
c_i = \frac{n_iL}{G_i} = \frac{RL\,a_i}{\sum_j a_jG_j}.
$$ {#eq-coverage}

Hence coverage is proportional to the number of cells, $c_i/c_j = a_i/a_j$, while the fraction of reads is proportional to $a_iG_i$ and overstates the abundance of organisms with large genomes.
:::

::: example Cells or reads? {#ex-coverage}
Three MAGs from a lake sample have the following genome sizes and mean coverages: A, 4.0 Mb at 30×; B, 2.0 Mb at 10×; C, 1.3 Mb at 60×. (a) What is the relative abundance of each organism as a fraction of cells (among these three)? (b) What fraction of the reads assigned to them comes from each? (c) Which would a naive reads-based count call the most abundant?
::: solution
(a) By [[#prop-coverage]], cells are in the ratio $30 : 10 : 60$, so A is 30 %, B 10 % and C 60 % of the cells.

(b) Reads (times read length) are proportional to coverage × genome size: A $30\times4.0 = 120$, B $10\times2.0 = 20$, C $60\times1.3 = 78$ (units of Mb of sequence). The total is 218, so A has 55 %, B 9 % and C 36 % of the reads.

(c) Counting reads, A appears most abundant; counting cells, C — a small-genome organism such as a streamlined oligotroph — is twice as abundant as A. Genome size (and 16S copy number, in amplicon surveys) must be taken into account before comparing abundances.
:::
:::

Coverage also measures growth. In a population of replicating cells, DNA near the origin of replication is more abundant than DNA near the terminus by the factor $2^{C/\tau}$ ([[microbiology/microbial-growth#prop-cooper]]), so the slope of coverage along a genome — the **peak-to-trough ratio** (Tal Korem and colleagues, 2015) — reveals how fast an organism was growing in a sample, without culturing it.

```python
# Relative abundance from MAG coverage, and growth from peak-to-trough ratio (plain Python)
import math

mags = {"A": (4.0e6, 30.0), "B": (2.0e6, 10.0), "C": (1.3e6, 60.0)}   # (genome size bp, mean coverage)

total_cov = sum(c for g, c in mags.values())
total_seq = sum(g * c for g, c in mags.values())
for name, (g, c) in mags.items():
    print(name, "cells %.0f %%" % (100 * c / total_cov), "reads %.0f %%" % (100 * g * c / total_seq))

ptr = 1.6                     # coverage at origin / coverage at terminus
print("C/tau =", round(math.log2(ptr), 2))   # 0.68: replication time is about 2/3 of a doubling time
```

**Single-cell genomics** takes the opposite route: one cell is isolated (by flow cytometry or microfluidics), its DNA amplified and sequenced. The genomes are usually incomplete, but they belong unambiguously to one cell. Combined with metagenomics, these methods have revealed whole branches of the tree: the candidate phyla radiation (Patescibacteria) and the DPANN archaea, with tiny cells and genomes that suggest a dependence on other organisms; the Asgard archaea, first assembled from deep-sea sediment (Anja Spang, Thijs Ettema and colleagues, 2015) and later cultured as '*Candidatus* Prometheoarchaeum syntrophicum' (Hiroyuki Imachi and colleagues, 2020); and thousands of MAGs in single studies — about 8,000 from public metagenomes in Parks and colleagues' survey of 2017 alone. Laura Hug and colleagues' tree of 2016 ([[diversity-of-life/bacteria-archaea]]) was drawn largely from such genomes.

## The shape of microbial evolution

Several themes recur when microbial genomes are compared.

**Endosymbiosis.** Mitochondria descend from an alphaproteobacterium and plastids from a cyanobacterium; both have transferred most of their genes to the host nucleus ([[cell-biology/organelles]]). The 16S-like rRNAs of mitochondria and plastids fall among those of bacteria, which was among the clinching evidence for their origin.

**Genome reduction.** Bacteria living inside host cells lose genes they no longer need. The aphid symbiont *Buchnera aphidicola* has a genome of about 0.64 Mb (Shuji Shigenobu and colleagues, 2000), and the psyllid symbiont '*Candidatus* Carsonella ruddii' one of about 0.16 Mb. Small populations transmitted through narrow bottlenecks from mother to offspring, without recombination, accumulate slightly harmful mutations (Muller's ratchet; [[evolution/mutation-drift-gene-flow]]), and their genomes become AT-rich and their proteins less stable. Free-living oligotrophs such as *Pelagibacter ubique* (1.3 Mb) also have small genomes, but for a different reason — **streamlining** by selection in huge populations, which removes any DNA whose cost outweighs its benefit (Stephen Giovannoni and colleagues, 2005).

**Ancient metabolism.** The oldest evidence of life — isotopically light carbon in rocks about 3.7 billion years old and putative stromatolites of about 3.5 billion years — is microbial and contested. Gene trees calibrated with geological events suggest that methanogenesis, anoxygenic photosynthesis and nitrogen fixation are ancient, and that oxygenic photosynthesis arose before the Great Oxidation Event of about 2.4 billion years ago ([[diversity-of-life/origin-of-life]]). Inferences about LUCA from genes shared across the bacterial–archaeal divide suggest an anaerobic organism using H₂ and CO₂ (William Martin and colleagues, 2016), though the reconstruction depends heavily on how transferred genes are treated.

::: application Tracking microbes by their genomes
The methods of this chapter are now everyday tools. Hospitals sequence the genomes of bacterial isolates to trace transmission: strains differing by only a handful of single-nucleotide variants are likely to be part of the same outbreak, while unrelated strains differ by hundreds. Public-health laboratories use whole-genome sequencing to link cases of foodborne illness to their source, and wastewater metagenomics to monitor antimicrobial resistance genes in whole cities. In ecology, MAGs reveal which organisms carry out which steps of the nitrogen and carbon cycles ([[microbiology/microbial-ecology]]); in biotechnology, metagenomes are mined for new enzymes and antibiotic biosynthetic gene clusters ([[biotechnology]]).
:::

::: history
Zuckerkandl and Pauling proposed molecular phylogeny in 1965. Woese and Fox discovered the archaea by 16S rRNA cataloguing in 1977, and Woese's review "Bacterial evolution" (1987) set out the rRNA tree. Iwabe and colleagues and Gogarten and colleagues rooted it with paralogous genes in 1989; Woese, Kandler and Wheelis named the three domains in 1990. Pace's group began sequencing rRNA genes from the environment in 1985, and Giovannoni and colleagues found SAR11 in 1990. The first bacterial genome, of *Haemophilus influenzae*, was sequenced by Robert Fleischmann, Venter and colleagues in 1995, and comparisons of genomes in the late 1990s and early 2000s revealed the scale of horizontal transfer. The pangenome was defined in 2005. Environmental genome assembly began in 2004 and, with long reads and better binning, now recovers tens of thousands of genomes from a single large survey.
:::

::: summary
- SSU rRNA (16S, 18S) is universal, functionally constant, a mosaic of conserved and variable regions, and rarely transferred, which made it the chronometer that revealed the three domains.
- Observed differences $p$ are corrected for multiple substitutions, most simply by the Jukes–Cantor distance $d = -\tfrac34\ln(1 - \tfrac43p)$; saturation limits deep phylogenies. The tree of life is rooted with genes duplicated before LUCA.
- Horizontal gene transfer by transformation, transduction, conjugation and gene transfer agents, carried by plasmids, transposons, ICEs, prophages and integrons, is limited by restriction–modification, CRISPR and the need for homology. It is detected by patchy distribution, incongruent phylogenies, atypical composition and flanking signatures.
- Strains of one species can differ greatly in gene content: a core genome plus an accessory genome, with pangenome size growing as $\kappa N^\gamma$ (open if $\gamma > 0$; empirical).
- Prokaryotic species are delimited operationally, now mainly by genome comparisons (ANI about 95–96 %); 16S identity of 98.7 % is a lower bound, not a definition. GTDB and the SeqCode classify and name genomes, including uncultured ones.
- Metagenomics recovers MAGs by binning contigs on composition and coverage; coverage is proportional to cell abundance, and its slope along a genome reveals growth rate.
- Genome evolution features endosymbiosis, genome reduction (by drift in symbionts, by streamlining in oligotrophs) and a deep, still-contested record of ancient metabolism.
:::

## Exercises

::: exercise Identity and distance {level=1 check="0.0571"}
Two 16S sequences differ at 77 of 1,400 aligned positions. Calculate the Jukes–Cantor distance (four decimal places).
::: solution
$p = 77/1400 = 0.0550$. $d = -0.75\ln(1 - 4\times0.055/3) = -0.75\ln(0.92667) = -0.75\times(-0.07616) = 0.0571$ substitutions per site.
:::
:::

::: exercise Signatures of transfer {level=1}
For each observation, say whether it suggests horizontal transfer and why: (a) a gene for mercury resistance found on a plasmid in three genera of soil bacteria; (b) a ribosomal protein gene whose tree matches the 16S tree; (c) a 40 kb region with G+C 35 % in a 65 % genome, flanked by a tRNA gene and carrying an integrase; (d) a gene present in all 200 sequenced strains of a species.
::: solution
(a) Yes: a mobile element (plasmid) and a patchy distribution across genera. (b) No: congruence with the organismal tree is what vertical inheritance predicts. (c) Yes: atypical composition, a typical integration site and integrase gene mark a genomic island. (d) No evidence of transfer within the species — it is a core gene — though it might have been acquired by the species' ancestor.
:::
:::

::: exercise Abundance from coverage {level=1 check="0.25"}
Two organisms in a gut metagenome have genome sizes of 6 Mb and 2 Mb and mean coverages of 5× and 15×. What fraction of the cells of these two organisms belongs to the first?
::: solution
Cells are proportional to coverage: $5/(5 + 15) = 0.25$. (It contributes $5\times6/(5\times6 + 15\times2) = 30/60 = 50\,\%$ of their reads.)
:::
:::

::: exercise Saturation {level=2}
(a) What value of $p$ gives a Jukes–Cantor distance of 1.0 substitution per site? (b) Two sequences have $p = 0.70 \pm 0.02$. Calculate $d$ for $p = 0.68$ and $0.72$, and comment on what this means for estimating the divergence of domains.
::: solution
(a) $1 = -0.75\ln(1 - 4p/3)$ gives $1 - 4p/3 = e^{-4/3} = 0.2636$, so $p = 0.75\times0.7364 = 0.552$. (b) $p = 0.68$: $d = -0.75\ln(1 - 0.9067) = -0.75\ln 0.0933 = 1.78$. $p = 0.72$: $d = -0.75\ln(0.04) = 2.41$. A 6 % uncertainty in $p$ produces a 35 % uncertainty in $d$; near saturation, sequence differences carry little information about how long ago lineages diverged, and the model (rate variation among sites, base composition) dominates the estimate. Deep divergences are therefore estimated from slowly evolving sites and conserved proteins, with careful models.
:::
:::

::: exercise An open pangenome {level=2 check="1.2e4"}
A species' pangenome follows $P(N) = 4{,}500\,N^{0.30}$. Estimate the number of gene families among 26 genomes (two significant figures). How many new families does the 26th genome add, approximately?
::: solution
$P(26) = 4500\times26^{0.30} = 4500\times2.658 = 11{,}960 \approx 1.2\times10^4$. The derivative $dP/dN = 0.30\times4500\times N^{-0.70} = 1350\times26^{-0.70} = 1350\times0.1022 = 138$ new families for the 26th genome (the exact difference $P(26) - P(25)$ is about 140).
:::
:::

::: exercise MAG quality {level=2}
A bin from a soil metagenome contains 98 of 104 expected single-copy marker genes, and 9 of them are present in two copies. (a) Estimate completeness and contamination. (b) Does it meet the "high-quality draft" standard? (c) What could explain the duplicated markers?
::: solution
(a) Completeness $98/104 = 94\,\%$; contamination about $9/104 = 8.7\,\%$. (b) No: contamination exceeds 5 % (and rRNA and tRNA genes would also need to be present). (c) Contigs from a closely related population (strain heterogeneity) or from an unrelated organism with similar composition and coverage were binned together; or the organism genuinely has duplicated some of these genes. Splitting the bin using coverage across several samples, or checking the phylogeny of the duplicated markers, can distinguish these.
:::
:::

::: exercise Species boundaries {level=2}
Three isolates are compared. A and B: 16S identity 99.9 %, ANI 97.5 %. A and C: 16S identity 99.2 %, ANI 88 %. B and C: 16S identity 99.1 %, ANI 88.3 %. (a) How many species are there? (b) Would a 97 % OTU approach have told you this? (c) What evidence would support describing C as a new species?
::: solution
(a) Two: A and B are one species (ANI above 95–96 %), C another (ANI near 88 %). (b) No: all three are above 97 % (and above 98.7 %) 16S identity and would fall in one OTU. (c) Consistent ANI below the threshold to all members of described species in the genus (and digital DDH below 70 %), a placement in a genome tree as a distinct lineage, phenotypic or ecological differences, and a type strain deposited in two culture collections (for the ICNP) or a high-quality genome as type (for the SeqCode).
:::
:::

::: exercise Growth in the gut {level=3}
In a faecal metagenome, a *Bacteroides* MAG has coverage of 24× near its origin of replication and 16× near its terminus. (a) Calculate the peak-to-trough ratio and $C/\tau$. (b) If $C$ is 60 minutes, what doubling time does this imply? (c) What assumptions does the calculation make, and why might faecal samples underestimate growth in the colon?
::: solution
(a) PTR $= 24/16 = 1.5$; $C/\tau = \log_2 1.5 = 0.585$. (b) $\tau = 60/0.585 = 103$ min, about 1.7 h. (c) It assumes balanced exponential growth, a constant replication time $C$ independent of growth rate, and that the population is homogeneous; that the coverage pattern is not distorted by GC bias in sequencing or by deletions. Faecal bacteria have left the region of active growth in the proximal colon; their DNA reflects in part cells that stopped replicating in transit, so faecal PTRs underestimate growth rates nearer the site of colonisation. In any case $C$ is not known for most gut bacteria in vivo, so PTRs are usually compared between conditions rather than converted into doubling times.
:::
:::

::: exercise Interpreting a gene tree {level=3}
A tree of the enzyme glutamine synthetase includes sequences from 40 bacteria and 20 archaea. Most bacterial sequences form one clade and most archaeal sequences another, but sequences from three species of *Thermotoga* (bacteria) sit within the archaeal clade, close to *Pyrococcus*, and those from two methanogens sit within a bacterial subclade of Bacillota. (a) Give two explanations for the misplaced sequences. (b) How would you distinguish between them? (c) What does the result imply for using such genes to build a species tree?
::: solution
(a) Horizontal transfer — from pyrococci to an ancestor of *Thermotoga*, and from a bacterium to the methanogens — or phylogenetic artefact: long-branch attraction, compositional bias shared by thermophiles (high G+C in rRNA, particular amino acids), or hidden paralogy (comparing different copies of a duplicated gene). (b) Check whether the placement is strongly supported and robust to better models and removal of fast sites; look for paralogues in the genomes; examine the genomic context (is the gene in an island, near mobile element genes, with atypical composition?); and check whether other genes from the same region show the same pattern. (c) Genes prone to transfer should be excluded from, or down-weighted in, species phylogenies, which should instead be built from many concatenated core genes whose trees agree with one another.
:::
:::
