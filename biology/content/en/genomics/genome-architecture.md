When the human genome sequence was published in 2001, one of the first surprises was how little of it codes for protein: about 1.5 %, in some 20,000 genes, scattered among long introns and much longer stretches between genes. Nearly half of the sequence turned out to be the remains of transposable elements, most of them dead for millions of years. A bacterium such as *Escherichia coli* is the opposite: almost 90 % of its chromosome is protein-coding sequence, with genes packed end to end. And among eukaryotes, genome size varies by a factor of more than a hundred thousand, with no simple relation to how complex the organism is: an onion has five times as much DNA as a human, and some lungfishes and a few plants more than ten times as much.

This chapter is a tour of what genomes contain and why they differ so much. We look first at size and its measurement, then at the parts — genes, the non-coding sequence around them, repeats and transposable elements, organelle genomes — and finally at the explanations for the variation, which turn out to involve population genetics as much as molecular biology. The physical structure of DNA and chromatin is in [[molecular-biology/dna-structure]]; the mechanisms of transposition in [[molecular-biology/dna-repair-recombination]]; how genomes are sequenced in [[genomics/sequencing-genomes]].

## Genome size

::: definition C-value and genome size {#def-cvalue}
The **C-value** of a eukaryote is the amount of DNA in an unreplicated haploid nucleus (a gamete), measured in picograms; the "C" originally stood for "constant", because it is characteristic of a species. **Genome size** is the corresponding number of base pairs. One picogram of double-stranded DNA is about $0.978\times10^9$ bp (Jaroslav Doležel and colleagues, 2003), so a C-value of 1 pg corresponds to roughly 1 Gb. In polyploids, the **1C-value** (one copy of the whole chromosome complement of a gamete) and the **1Cx-value** (one copy of a monoploid set of $x$ chromosomes) differ and must be distinguished.
:::

C-values are measured by staining nuclei with a DNA-binding fluorescent dye and comparing their fluorescence with that of nuclei of a standard of known size (flow cytometry), or, historically, by Feulgen densitometry of stained nuclei on slides. Sequencing estimates genome size from $k$-mer counts ([[genomics/sequencing-genomes]]). Assemblies of large genomes are usually somewhat smaller than the measured C-value, because repeats are collapsed or left out.

| organism | genome size | protein-coding genes (approx.) |
|---|---|---|
| *Candidatus* Carsonella ruddii (insect endosymbiont) | 0.16 Mb | 182 |
| *Mycoplasma genitalium* | 0.58 Mb | 480 |
| *Escherichia coli* K-12 MG1655 | 4.64 Mb | 4,300 |
| *Saccharomyces cerevisiae* (budding yeast) | 12 Mb | 6,000 |
| *Caenorhabditis elegans* (nematode) | 100 Mb | 20,000 |
| *Arabidopsis thaliana* (thale cress) | 135 Mb | 27,000 |
| *Drosophila melanogaster* (fruit fly) | 140–180 Mb | 14,000 |
| *Homo sapiens* | 3.1 Gb | 20,000 |
| *Zea mays* (maize) | 2.3 Gb | 40,000 |
| *Triticum aestivum* (bread wheat, hexaploid) | 16 Gb | 107,000 |
| *Ambystoma mexicanum* (axolotl) | 32 Gb | 23,000 |
| *Neoceratodus forsteri* (Australian lungfish) | 43 Gb | — |
| *Paris japonica* (a monocot flowering plant) | about 150 Gb | — |

Gene counts are from the published genome analyses and annotation databases and change with each release; treat them as orders of magnitude. The largest genome measured as of 2024 is that of the fern *Tmesipteris oblanceolata*, about 160 Gb (Jaume Pellicer, Ilia Leitch and colleagues), slightly larger than that of *Paris japonica* (Pellicer and colleagues, 2010); the largest assembled animal genome is that of the Australian lungfish (Axel Meyer and colleagues, 2021).

::: example C-values and base pairs {#ex-cvalue}
(a) The 1C-value of *Paris japonica* is about 152 pg. How many base pairs is that, and how many times the human genome? (b) A diploid human cell in G1 contains how many picograms of nuclear DNA? (c) Stretched out as B-DNA (0.34 nm per bp), how long would the haploid genome of *P. japonica* be?
::: solution
(a) $152\times0.978\times10^9 = 1.49\times10^{11}$ bp, about 149 Gb, which is $149/3.1 \approx 48$ times the human haploid genome.

(b) The human haploid genome is $3.1\times10^9$ bp, or $3.1/0.978 = 3.2$ pg. A G1 diploid cell (2C) has about 6.3 pg — strictly a little more in females, with two X chromosomes, than in males, with an X and a much smaller Y.

(c) $1.49\times10^{11}\times0.34\times10^{-9}\ \mathrm{m} = 51$ m of DNA in one haploid nucleus, and about 100 m in a diploid somatic cell.
:::
:::

### Genome size and gene number

In bacteria and archaea, gene number is almost proportional to genome size: there is roughly one protein-coding gene per kilobase, and 85–90 % of the sequence codes for protein. Small genomes belong to parasites and endosymbionts that have lost genes they no longer need (the aphid symbiont *Buchnera aphidicola*, 0.64 Mb; *Carsonella*, 0.16 Mb, with only 182 protein-coding genes); the largest, around 10–15 Mb, to soil bacteria with complex lifestyles, such as the myxobacteria and the antibiotic-producing *Streptomyces*.

::: widget regression
points: 0.58,0.482; 1.83,1.743; 4.64,4.288; 8.67,7.825; 13.03,9.367
degree: 1
x: 0, 14
y: 0, 11
caption: Protein-coding gene number (thousands) against genome size (Mb) for five bacteria with completely sequenced genomes: *Mycoplasma genitalium*, *Haemophilus influenzae* Rd, *E. coli* K-12, *Streptomyces coelicolor* A3(2) and *Sorangium cellulosum* So ce56 (gene counts from the original genome papers). The least-squares line has a slope of about 0.73 genes per kilobase and $R^2 \approx 0.97$; the largest genome lies below the line, partly because its genes are longer on average. Drag a point to see how strongly a single genome influences the fit. On these axes a human genome would sit 3,100 Mb to the right with only 20 thousand genes — far off any extension of the bacterial line.
:::

Eukaryotes break this rule. Between yeast and humans genome size increases 250-fold but gene number only about threefold; *C. elegans* and humans have about the same number of protein-coding genes; and among the largest genomes, those of the axolotl or lungfish, gene numbers are similar to those of other vertebrates. What grows is the sequence *between* and *within* genes.

::: definition The C-value paradox {#def-cparadox}
The **C-value paradox** (named by C. A. Thomas in 1971) is the observation that genome size in eukaryotes is not correlated with organismal complexity or with the number of genes, and varies greatly even among closely related species: within the genus *Allium* (onions and relatives), C-values differ several-fold between species. Once it was understood that most eukaryotic DNA is not genes, the paradox became the **C-value enigma** (T. Ryan Gregory's term): not why complexity and DNA content differ, but what the non-genic DNA is, how it accumulates and is lost, and whether its quantity has consequences.
:::

## Genes in genomes

### Prokaryotic genes

A bacterial chromosome is, to a first approximation, a string of open reading frames. Genes average about 950 bp (proteins of about 320 amino acids), are separated by intergenic regions of 100 bp or so holding promoters and terminators, and are often grouped into **operons** transcribed as single mRNAs ([[molecular-biology/bacterial-gene-regulation]]). Genes lie on both strands, but in many bacteria more of them are on the **leading strand** of replication, where head-on collisions between the replication fork and RNA polymerase are avoided; the composition of the two strands differs too (**GC skew**, a change in the sign of $(G - C)/(G + C)$ at the origin and terminus of replication). Many bacteria carry **plasmids** and integrated phages, and their genomes are divided into a **core genome** shared by all strains of a species and an **accessory genome** that varies between strains ([[genomics/comparative-genomics]]).

Finding genes in a bacterial genome is mostly a matter of finding long open reading frames, and the reason it works is statistical.

::: proposition Open reading frames in random sequence {#prop-orf}
In a random sequence with independent bases at frequencies $\pi_A = \pi_T = (1 - g)/2$ and $\pi_G = \pi_C = g/2$ (GC content $g$), the probability that a given codon is one of the stop codons `TAA`, `TAG`, `TGA` is

$$
p_\mathrm{stop} = \pi_T\pi_A\pi_A + \pi_T\pi_A\pi_G + \pi_T\pi_G\pi_A = \left(\frac{1-g}{2}\right)^2\left(\frac{1-g}{2} + g\right),
$$ {#eq-pstop}

which is $3/64$ for $g = \tfrac12$. The number of codons from any position to the next in-frame stop is geometric, and the probability that a stretch of $n$ consecutive codons contains no stop is

$$
P(\text{no stop in } n \text{ codons}) = (1 - p_\mathrm{stop})^n.
$$ {#eq-orf}

The mean distance between stops is $1/p_\mathrm{stop}$ codons: 21.3 codons at $g = \tfrac12$.
:::

::: proof
Under independence, the probability of the codon `TAA` is $\pi_T\pi_A\pi_A$, and similarly for the other two; their sum gives [[#eq-pstop]] after substituting $\pi_A = \pi_T = (1 - g)/2$ and $\pi_G = (g/2)$: two of the three stop codons have one G each, so $p_\mathrm{stop} = w^3 + 2w^2(g/2) = w^2(w + g)$ with $w = (1 - g)/2$. Successive codons in one frame are disjoint triplets of independent bases, so each is a stop independently with probability $p_\mathrm{stop}$, which gives [[#eq-orf]] and the geometric distribution of the run length.
:::

A real protein of 300 amino acids has an open reading frame of 300 codons; in random sequence of 50 % GC, a stop-free stretch that long has probability $(61/64)^{300} = 5.6\times10^{-7}$. Long ORFs are therefore evidence of selection against stop codons — of a gene. The argument weakens in GC-rich genomes, where stops (all A+T-rich) are rare: at $g = 0.7$, $p_\mathrm{stop} = 0.019$ and stop-free stretches of 100 codons occur with probability 0.14. Gene-finding programs therefore also use codon usage, ribosome-binding sites and comparison with known proteins ([[bioinformatics/gene-finding]]).

::: widget plot
f: (1 - ((1 - g)/2)^2*((1 - g)/2 + g))^x
x: 0, 300
y: 0, 1
sliders: g=0.5:0.2:0.8:0.01
labels: P(\text{no stop in } x \text{ codons})
caption: The probability that a run of $x$ codons of random sequence contains no stop codon, by [[#eq-orf]], for GC content $g$. At $g = 0.5$ the curve falls to 0.008 by 100 codons. Increase $g$ to 0.7 or 0.8 — the range of *Streptomyces* and other GC-rich bacteria — and long ORFs become common by chance, because the stop codons are A+T-rich; on the opposite strand of a real gene, the reverse complement often has long ORFs too. Lower $g$ to 0.3 and spurious ORFs almost disappear.
:::

::: example Spurious ORFs in a megabase {#ex-orfs}
How many stop-free stretches of 100 or more codons would you expect in 1 Mb of random sequence with 50 % GC, counting all six reading frames? Compare with the number of real genes expected in 1 Mb of a bacterial genome.
::: solution
Each strand has three frames of about $10^6/3 = 3.33\times10^5$ codons. In one frame, stops occur at rate $3/64$, so there are about $3.33\times10^5\times3/64 = 15{,}600$ stops, and the same number of stop-to-stop intervals. Each interval is at least 100 codons long with probability $(61/64)^{100} = 0.0082$, giving about 128 long ORFs per frame and about 770 in six frames.

A bacterial megabase holds about 900 real genes. A threshold of 100 codons alone would therefore give nearly as many false as true predictions. Raising the threshold to 300 codons reduces the false ones to about $6\times1.56\times10^4\times5.6\times10^{-7} \approx 0.05$ per megabase, but misses the many genes for proteins shorter than 300 amino acids — the reason gene finders combine length with other evidence.
:::
:::

### Eukaryotic genes

Eukaryotic genes are split. A typical human protein-coding gene in the 2001 analysis of the draft sequence had about nine exons and spanned about 27 kb of genomic DNA, of which only about 1.3 kb coded for protein; the rest was introns and untranslated regions. Introns vary enormously: yeast has introns in only about 5 % of its genes, while the human gene for dystrophin (*DMD*) spans about 2.2 Mb, almost all of it intronic, and takes some 16 hours to transcribe. Alternative splicing ([[molecular-biology/rna-processing]]) lets one gene make several proteins: most human multi-exon genes produce more than one transcript.

::: definition Elements of a eukaryotic genome {#def-elements}
- A **protein-coding gene** comprises a promoter, exons (coding sequence and 5′ and 3′ untranslated regions) and introns, together with the enhancers and other regulatory elements that control it, which may lie hundreds of kilobases away ([[molecular-biology/eukaryotic-gene-regulation]]).
- A **non-coding RNA gene** is transcribed into a functional RNA that is not translated: rRNA, tRNA, small nuclear and nucleolar RNAs, microRNAs, and many **long non-coding RNAs** (lncRNAs, more than 200 nucleotides), whose functions are known for only a minority.
- A **pseudogene** is a gene copy that has lost its function. **Unprocessed** pseudogenes arise by duplication of genomic DNA and keep their introns; **processed** pseudogenes arise when an mRNA is reverse-transcribed (by the L1 machinery in mammals) and inserted elsewhere, and so lack introns and promoters and often carry a remnant poly(A) tail.
- **Repetitive DNA**: interspersed repeats (mostly transposable elements), tandem repeats (micro- and minisatellites; satellite arrays at centromeres and elsewhere) and segmental duplications.
:::

As of 2026, the GENCODE annotation of the human genome contains roughly 20,000 protein-coding genes, a larger number of long non-coding RNA genes whose count depends strongly on the evidence demanded, and more than 10,000 pseudogenes. The protein-coding count has drifted *down* since 2001, as many predicted genes were shown to be pseudogenes or artefacts. Early estimates, before the sequence, ranged up to 100,000 or more.

::: warning Gene number does not measure complexity
It is tempting to expect that more complex organisms need more genes, and the discovery that humans have about as many protein-coding genes as a 1-mm nematode, and fewer than rice or wheat, was received as a shock. But complexity in the sense of cell types and developmental programmes depends on *how* genes are used — regulatory sequences, alternative splicing, combinatorial control by transcription factors — more than on how many there are. Large gene numbers in plants such as wheat mostly reflect polyploidy and gene duplication ([[genomics/comparative-genomics]]). Neither gene number nor genome size is a measure of evolutionary "advancement".
:::

## Repetitive DNA and transposable elements

### What the human genome is made of

The initial analysis of the human genome sequence (International Human Genome Sequencing Consortium, 2001) classified its sequence roughly as follows; the complete T2T-CHM13 sequence of 2022, which includes the satellite arrays left out in 2001, raised the repeat fraction to a little over half.

| component | share of the genome (2001 draft) |
|---|---|
| LINEs (mostly L1) | 20 % |
| SINEs (mostly Alu) | 13 % |
| LTR retrotransposons and endogenous retroviruses | 8 % |
| DNA transposons | 3 % |
| segmental duplications | about 5 % |
| simple sequence repeats and satellites | about 3 % |
| protein-coding exons | about 1.5 % |
| introns | about 25 % |

The categories overlap (introns contain transposons, for example), so the shares are not meant to add up to 100 %. Recognising old transposon copies depends on how much they have diverged; very old copies are no longer recognisable, so the transposon-derived fraction is an underestimate.

### Transposable elements

The classes of transposable element and their mechanisms — DNA transposons that cut and paste, LTR retrotransposons related to retroviruses, LINEs that reverse-transcribe their RNA directly into the target site, and non-autonomous SINEs such as Alu that borrow the LINE machinery — are described in [[molecular-biology/dna-repair-recombination]]. From the genome's point of view, three properties matter.

First, **copy-and-paste elements accumulate**. A retrotransposon leaves its original copy in place, so each successful round increases the copy number. Genomes are not overwhelmed because most new copies are defective (L1 insertions are usually truncated at the 5′ end), because host defences — DNA methylation, repressive histone marks, small RNAs such as the piRNAs of animal germ lines ([[genomics/epigenomics]]) — silence active elements, because insertions that disrupt genes are removed by selection, and because DNA is lost by deletion.

Second, **transposons have a life history**. A family enters a genome (sometimes by horizontal transfer from another species), expands in a burst, is silenced, and decays by mutation. The copies of a family can be dated by how much they have diverged from the reconstructed consensus of the family, which approximates the sequence of the original active element.

::: example Dating a transposon burst {#ex-te-age}
The copies of a human L1 subfamily differ on average from their consensus sequence at 6.6 % of sites. (a) Correct this for multiple substitutions with the Jukes–Cantor formula ([[population-genetics/neutral-theory]]). (b) If neutral substitutions accumulate at $2.2\times10^{-9}$ per site per year in this lineage, when was the subfamily active?
::: solution
(a) The copies have evolved independently since insertion, each along its own branch, while the consensus represents the source element. The corrected divergence is

$$
K = -\tfrac34\ln\!\left(1 - \tfrac43\times0.066\right) = -0.75\ln(0.912) = 0.069.
$$

(b) Since only one branch separates each copy from the ancestral element, $K = \mu t$ and $t = 0.069/(2.2\times10^{-9}) \approx 3.1\times10^7$ years: the subfamily was active about 31 million years ago, around the time of the common ancestor of Old World monkeys and apes. The numbers here are illustrative; real estimates must allow for faster substitution at CpG sites, variation in rate along the genome, and uncertainty in the rate itself.
:::
:::

Third, **transposons are a source of genetic novelty**. Their insertions create mutations: in humans, new Alu and L1 insertions cause a small fraction of inherited disease mutations. Their sequences, which carry promoters, splice sites and binding sites for transcription factors, are recruited ("exapted" or "domesticated") as regulatory elements for host genes. Whole genes derive from them: the RAG1 recombinase that cuts and joins the antibody and T-cell receptor genes of jawed vertebrates descends from a DNA transposon of the *Transib* family, and the *syncytin* genes needed for the formation of the placenta in several mammal lineages were captured, independently, from the envelope genes of endogenous retroviruses.

::: application Transposons and crops
The wrinkled peas of Mendel's experiments carry an 800-bp transposon-like insertion in the gene for starch-branching enzyme I (*SBEI*), shown by Madan Bhattacharyya and colleagues in 1990. The insertion of a transposon (*Hopscotch*) upstream of the maize gene *teosinte branched1* (*tb1*) acts as an enhancer that increases its expression and contributes to the suppression of side branches that distinguishes maize from its wild ancestor teosinte; it predates domestication and was selected from standing variation (Studer and colleagues, 2011). The red colour of blood oranges is caused by a retrotransposon inserted near a regulatory gene for anthocyanin production, *Ruby*, which makes it respond to cold. Breeders have long selected transposon insertions without knowing it.
:::

### Tandem repeats

**Microsatellites** (short tandem repeats, 1–6 bp units such as `(CA)n`) are scattered throughout eukaryotic genomes. They mutate rapidly by slippage of DNA polymerase during replication, changing by one repeat unit at rates of the order of $10^{-4}$–$10^{-3}$ per locus per generation in humans, which makes them highly polymorphic markers for parentage and forensic identification. Expansions of some trinucleotide repeats cause disease (as in Huntington's disease; see [Medicine Atlas](/learn/medicine/)). **Satellite DNA** — long arrays of repeat units of tens to thousands of base pairs — fills centromeres and some heterochromatic regions; the human centromeres consist of arrays of a 171-bp α-satellite unit organised into higher-order repeats, a few hundred kilobases to several megabases per chromosome. Telomeres are short tandem repeats (`TTAGGG` in vertebrates) added by telomerase ([[molecular-biology/dna-replication]]).

### Segmental duplications

**Segmental duplications** are copies of 1 kb or more with more than 90 % identity, often interspersed on several chromosomes. They make up about 5–7 % of the human genome (the higher figure from the complete sequence) and are concentrated near centromeres and telomeres. Recombination between copies — non-allelic homologous recombination — deletes or duplicates the intervening DNA, which makes these regions hotspots of copy-number variation ([[genomics/human-variation]]). Segmental duplications are also the raw material of new gene families, such as the human-specific duplicates of *SRGAP2* that are implicated in the development of the cerebral cortex.

## Organelle genomes

Mitochondria and plastids carry the remnants of the genomes of the bacteria from which they descend ([[cell-biology]]). The human mitochondrial genome is a 16,569-bp circle with 37 genes: 13 for subunits of the respiratory chain, 22 tRNAs and 2 rRNAs, with almost no intergenic sequence; each cell holds hundreds to thousands of copies. Plant mitochondrial genomes are much larger (200 kb to over 10 Mb), mostly non-coding, and recombine into several forms. Plastid genomes are typically 120–160 kb with about 100–120 genes and two large inverted repeats. Most genes of the ancestral endosymbionts have been transferred to the nucleus, and the transfer continues: nuclear genomes contain many fragments of organelle DNA (nuclear mitochondrial segments, NUMTs), which can be mistaken for real mitochondrial sequence in genomic data.

::: quiz
Which observation best explains why the genome of a lily is many times larger than that of *Arabidopsis*, although they have similar numbers of genes?
- [ ] The lily has many more genes, each with longer exons.
- [ ] Lily cells contain more chromosomes per nucleus because they are polyploid, and polyploidy always multiplies genome size by a large factor.
- [x] Most of the extra DNA consists of transposable elements and other repeats that have accumulated in the lily lineage and not been removed.
- [ ] Large genomes are needed for the complex development of flowering plants.
::: solution
Gene numbers of flowering plants are similar, so the extra DNA is not genes; *Arabidopsis* is itself a flowering plant, so the last option cannot explain the difference. Polyploidy can double or triple genome size, but it does not account for differences of tens of times in species of similar ploidy. The large genomes of lilies, onions, many conifers, salamanders and lungfishes consist mainly of retrotransposons and other repeats.
:::
:::

## Why genomes differ in size

The proximate answer to the C-value enigma is clear: genomes grow by **transposon proliferation** and **polyploidy** ([[genomics/comparative-genomics]]), and shrink by **deletion** — small deletions during replication and repair, and larger ones by recombination between repeats, such as unequal crossing over or the recombination between the two long terminal repeats of an LTR element that leaves a single **solo LTR** behind. Species differ in the balance: insertions outpace deletions in salamanders and lilies, while in *Arabidopsis thaliana* and in birds deletion is efficient. The ultimate question is why the balance differs. Three kinds of explanation have been proposed, and they are not mutually exclusive.

**Adaptive (nucleotypic) explanations.** Genome size correlates with nucleus and cell size, with the duration of mitosis and meiosis, and with developmental rate. Across species, birds and bats, which fly and have high metabolic rates, have small genomes for vertebrates; salamanders with large genomes develop slowly and have large cells; annual plants of short growing seasons tend to have smaller genomes than perennials. On this view genome size is selected for its bulk effects, whatever the sequence.

**Selfish DNA.** In 1980 Leslie Orgel and Francis Crick, and independently W. Ford Doolittle and Carmen Sapienza, argued that transposable elements spread because they replicate themselves, not because they benefit the organism. Their accumulation needs no adaptive explanation, only that the cost to the host is small enough for selection not to stop them.

**Drift and population size.** Michael Lynch and John Conery (2003) pointed out that whether a slightly costly piece of DNA is removed by selection depends on the effective population size.

::: proposition Effective neutrality of slightly deleterious insertions {#prop-drift-barrier}
Consider a new mutation (for example an insertion) with a small selective disadvantage $s$ in heterozygotes, arising as a single copy in a diploid population of effective size $N_e$ (and census size $N = N_e$). By Kimura's diffusion approximation, its probability of fixation relative to that of a neutral mutation ($1/2N$) is

$$
\frac{u(-s)}{u(0)} = \frac{S}{e^{S} - 1},\qquad S = 4N_es.
$$ {#eq-drift-barrier}

If $S \ll 1$ the mutation behaves almost as if neutral; if $S \gg 1$ its fixation probability is negligible. The transition, $S \approx 1$, is the **drift barrier**.
:::

The formula is the deleterious case of the fixation probability used in the nearly neutral theory ([[population-genetics/neutral-theory]]). Its consequence is that the same molecular cost of extra DNA has opposite fates in species with different $N_e$.

::: example One intron, two populations {#ex-intron}
Suppose an intron imposes a small cost — through the chance that mutations in it disrupt splicing — of $s = 10^{-5}$. Compare its relative probability of fixation in a vertebrate with $N_e = 10^4$ and in a bacterium with $N_e = 10^8$.
::: solution
For the vertebrate, $S = 4\times10^4\times10^{-5} = 0.4$ and $S/(e^S - 1) = 0.4/0.492 = 0.81$: the intron is fixed 81 % as often as a neutral mutation. For the bacterium, $S = 4000$ and the ratio is about $4000e^{-4000}$, effectively zero. The intron spreads by drift in the small population and is reliably excluded from the large one. Lynch's argument is that much of the elaboration of eukaryotic genomes — introns, transposons, long intergenic regions, complex regulation — arose not because it was useful but because the small effective sizes of multicellular eukaryotes made selection too weak to prevent it. The value of $s$ here is illustrative, and real costs are hard to measure.
:::
:::

::: widget plot
f: x/(exp(x) - 1)
x: 0.01, 10
y: 0, 1
labels: u(-s)/u(0)
vlines: 1
caption: The probability of fixation of a mildly deleterious mutation relative to a neutral one, $S/(e^S - 1)$, against $S = 4N_es$, from [[#eq-drift-barrier]]. Below $S \approx 1$ (dashed line) the mutation is fixed nearly as often as a neutral one; by $S = 10$ its chance is less than 0.05 % of the neutral value. Since $S$ is a product, a tenfold larger population has the same effect as a tenfold larger cost: species with large populations (most bacteria, many insects) purge slightly costly DNA that species with small ones (large animals, many plants) cannot.
:::

The drift-barrier hypothesis predicts that genome size should be larger in lineages with small $N_e$, and the broad pattern — compact prokaryotic genomes, larger unicellular eukaryotic ones, the largest in multicellular organisms with small populations — fits it. But the correlation across eukaryotes is weak once phylogeny is taken into account, and $N_e$ is hard to estimate for many species, so the hypothesis remains debated. The sensible view is that genome size results from the rates of insertion and deletion (mechanism), the costs of DNA (which may be nucleotypic), and the efficiency of selection (population size), in different proportions in different lineages.

::: warning "Non-coding" does not mean "junk", and "junk" does not mean "useless to know about"
Non-coding DNA includes regulatory elements, non-coding RNA genes, centromeres and telomeres, all essential. But the fact that a sequence is transcribed or bound by a protein somewhere does not show that it has a function in the sense of being maintained by selection: the ENCODE consortium's 2012 claim that 80 % of the human genome had "biochemical function" was criticised on exactly this point. Comparative genomics gives the most direct evidence: only a minority of the human genome — of the order of 10 % — appears to be under purifying selection ([[genomics/comparative-genomics]]). The rest may still matter, through bulk effects or as raw material for evolution, without its specific sequence being constrained.
:::

::: history
The constancy of DNA per haploid nucleus within a species was established around 1950 (André Boivin, Roger Vendrely and Colette Vendrely, 1948; Hewson Swift, 1950), and was taken as evidence that DNA was the genetic material. Measurements over the next two decades revealed the huge and seemingly arbitrary variation among species, and C. A. Thomas named the C-value paradox in 1971. Roy Britten and David Kohne's DNA reassociation experiments (1968) showed that eukaryotic genomes contain sequences repeated thousands to millions of times, long before anything was known of their nature. Barbara McClintock had discovered mobile genetic elements, *Ac* and *Ds* in maize, in the late 1940s and published her account in 1950; her work was recognised with the Nobel Prize in Physiology or Medicine in 1983, after transposons had been isolated in bacteria and *Drosophila*. Susumu Ohno popularised the term "junk DNA" in 1972.
:::

::: summary
- Genome size (C-value, [[#def-cvalue]]) varies about a thousandfold among bacteria and archaea and more than a hundred-thousandfold among eukaryotes; 1 pg ≈ 0.98 Gb.
- In prokaryotes gene number is roughly proportional to genome size (about one gene per kb, 85–90 % coding); long ORFs are rare by chance ([[#prop-orf]]), so they mark genes, less reliably in GC-rich genomes.
- Eukaryotic genes are split, with long introns; humans have about 20,000 protein-coding genes, with coding sequence about 1.5 % of the genome. Gene number is not a measure of complexity.
- About half the human genome is transposon-derived; there are also tandem repeats (microsatellites, satellites, telomeres) and segmental duplications, which generate copy-number variation and new genes. Transposon families can be dated by divergence from their consensus.
- The C-value paradox ([[#def-cparadox]]) is explained proximately by the balance of transposon proliferation and polyploidy against deletion. Adaptive (nucleotypic), selfish-DNA and drift-barrier ([[#prop-drift-barrier]]) explanations address why that balance differs among lineages.
:::

## Exercises

::: exercise Converting C-values {level=1 check="0.1956"}
A beetle has a 1C-value of 0.20 pg. What is its genome size in gigabases (to four significant figures, using 0.978 Gb per pg)?
::: solution
$0.20\times0.978 = 0.1956$ Gb, about 196 Mb.
:::
:::

::: exercise Stop codons in an AT-rich genome {level=1 check="0.0796"}
Using [[#eq-pstop]], what is the probability that a random codon is a stop codon in a genome with 30 % GC? Give three significant figures.
::: solution
$w = (1 - 0.3)/2 = 0.35$, so $p_\mathrm{stop} = 0.35^2\times(0.35 + 0.3) = 0.1225\times0.65 = 0.0796$. The mean distance between stops is $1/0.0796 = 12.6$ codons.
:::
:::

::: exercise Coding density {level=1}
*Saccharomyces cerevisiae* has a genome of 12.1 Mb with about 6,000 protein-coding genes averaging about 1.45 kb of coding sequence. Estimate the fraction of the genome that codes for protein, and compare it with *E. coli* and humans.
::: solution
$6000\times1.45\ \text{kb} = 8.7$ Mb, so about $8.7/12.1 = 72$ %. *E. coli*: about 88 %; humans: about 1.5 %. Yeast is compact, with few introns and short intergenic regions, but less dense than a bacterium.
:::
:::

::: exercise Processed or unprocessed? {level=2}
A sequence on human chromosome 12 is 92 % identical to the coding sequence of a functional gene on chromosome 3, but lacks all six of that gene's introns, has an A-rich tract at its 3′ end, is flanked by a 14-bp direct repeat, and contains two premature stop codons. (a) What is it, and how did it arise? (b) What does each feature tell you? (c) How would you estimate when it arose?
::: solution
(a) A processed pseudogene: an mRNA of the chromosome 3 gene was reverse-transcribed, probably by L1-encoded reverse transcriptase, and the cDNA was inserted on chromosome 12.

(b) Missing introns: it was copied from spliced mRNA. A-rich 3′ tract: the remnant of the poly(A) tail. Flanking direct repeat: a target-site duplication created by the staggered nick of L1 insertion. Premature stops: it has accumulated disabling mutations since insertion, because without a promoter it was probably never expressed and is not under selection.

(c) Assuming it has evolved neutrally since insertion while the parent gene evolved under constraint, its divergence from the reconstructed ancestral sequence (or, approximately, the divergence at synonymous sites between pseudogene and parent) dated with a neutral substitution rate gives its age; alternatively, check which primate species share it at the same site — an insertion present in humans and chimpanzees but absent in macaques arose between those splits.
:::
:::

::: exercise ORFs on the wrong strand {level=2}
In a *Streptomyces* genome with 72 % GC, many genes have a long ORF on the opposite strand as well, overlapping the real gene. Explain why, and suggest how a gene-finding program can tell which strand holds the real gene.
::: solution
In GC-rich sequence, stop codons (TAA, TAG, TGA) are rare in any frame, and the third positions of codons in real genes are very GC-rich, so the reverse complement of a gene contains few stops by chance; long "shadow" ORFs are common. Real genes can be distinguished by codon usage (the strong GC bias at third codon positions, characteristic frame-specific composition), by a ribosome-binding site at the proper distance upstream of the start codon, by similarity of the translated sequence to known proteins, and by conservation in related genomes, which affects the real reading frame in a codon-structured way (more change at third positions).
:::
:::

::: exercise Drift barrier {level=2 check="0.58"}
A slightly deleterious insertion has $s = 2.5\times10^{-5}$ in a population with $N_e = 10^4$. What is its probability of fixation relative to a neutral mutation, from [[#eq-drift-barrier]]? Give two decimal places.
::: solution
$S = 4\times10^4\times2.5\times10^{-5} = 1$, so the ratio is $1/(e - 1) = 0.58$.
:::
:::

::: exercise Interpreting a repeat landscape {level=3}
A genome paper for a salamander shows the distribution of divergence from consensus for its LTR retrotransposons: one broad peak at 15–25 % divergence, and almost no copies below 5 %. For a bird, the same plot shows a small peak at 10–20 % and a total LTR content one-twentieth of the salamander's. (a) What does the absence of low-divergence copies in the salamander suggest about its transposon activity? (b) The salamander genome is 15 times larger than the bird's. Give two hypotheses for why the salamander kept so much old transposon DNA, and one observation that would distinguish them. (c) Why might the bird plot underestimate the past activity of LTR elements?
::: solution
(a) Few young copies means little recent transposition: the elements are now largely inactive (silenced or degraded). The large genome reflects ancient accumulation.

(b) Hypothesis 1: low rates of DNA deletion — the salamander lineage removes DNA slowly, for example because it makes few small deletions or little recombination between LTRs (few solo LTRs). Hypothesis 2: weak selection against extra DNA because of small $N_e$, or selection *for* large genomes (large cells, slow development). Measuring the rate of small deletions from indels in pseudogenes or old transposon copies (as done for *Drosophila* and crickets), or the ratio of solo LTRs to full-length elements, tests hypothesis 1; comparing genome size with estimated $N_e$ or with cell size and developmental rate across salamander species tests hypothesis 2.

(c) Efficient deletion removes old copies, so in a genome that loses DNA quickly, the copies from past bursts have been deleted or have decayed beyond recognition. A small peak of old copies may be what is left of much greater past activity.
:::
:::

::: exercise A bacterial genome report {level=3}
A new bacterial genome is 2.1 Mb with 1,150 predicted protein-coding genes, 52 % of the sequence coding, and hundreds of genes with premature stop codons. Its closest free-living relatives have genomes of about 4.5 Mb with about 4,100 genes. (a) Compare its gene density with the bacterial norm. (b) Propose a lifestyle and explain the features. (c) What do you expect for the future evolution of this genome?
::: solution
(a) About 0.55 genes per kb and 52 % coding, against about 0.9 genes per kb and 85–90 % coding in typical bacteria: unusually sparse.

(b) It is probably a recently host-restricted bacterium — an intracellular pathogen or a newly established symbiont. In a host, many genes (for biosynthesis of nutrients the host provides, for responses to varied environments) become unnecessary; small, clonal populations with frequent bottlenecks at transmission experience strong drift; inactivated genes become pseudogenes that have not yet been deleted. *Mycobacterium leprae* (with about half its genome non-functional) and *Sodalis*-like insect symbionts show this stage.

(c) Continued deletion of pseudogenes and non-coding DNA, giving a smaller, again gene-dense genome, as in long-established symbionts such as *Buchnera* (0.64 Mb) or *Carsonella* (0.16 Mb); increasing AT bias and accelerated protein evolution; and possible dependence on the host, or on a co-symbiont, for functions it loses.
:::
:::
