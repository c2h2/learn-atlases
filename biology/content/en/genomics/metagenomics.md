Put a gram of soil under a microscope with a DNA stain, and you can count a billion or so bacterial cells. Spread the same soil on agar plates, and perhaps one in a hundred of them grows into a colony. This discrepancy, which James Staley and Allan Konopka called the **great plate count anomaly** in 1985, meant that for a century microbiology studied the minority of microbes that grow in the laboratory, while the majority — in soil, in the oceans, in sediments and in our own guts — remained invisible. Sequencing changed that. By reading DNA extracted directly from an environment, without culturing anything, we can ask which organisms are there, in what proportions, what genes they carry, and even reconstruct their genomes.

**Metagenomics** is the sequencing of the DNA of whole communities. This chapter covers its two main forms — sequencing of a marker gene amplified from the community, and shotgun sequencing of all its DNA — and the statistical problems they share: biased sampling, compositional data and the estimation of unseen diversity. It then describes genomes assembled from metagenomes, which have redrawn the tree of life, the microbiomes of animals including humans, and the use of **environmental DNA** to detect animals and plants from traces they leave in water and soil. Microbial ecology and diversity are in [[microbiology/microbial-ecology]] and [[microbiology/microbial-diversity]], and the indices of diversity (Shannon, Simpson) and rarefaction in [[diversity-of-life/bacteria-archaea]]; sequencing and assembly are in [[genomics/sequencing-genomes]].

## Two ways to read a community

::: definition Amplicon and shotgun metagenomics {#def-metagenomics}
In **amplicon sequencing** (metabarcoding), a marker gene — for bacteria and archaea usually part of the 16S rRNA gene; for fungi the internal transcribed spacer (ITS) of the rRNA operon; for animals a mitochondrial gene such as cytochrome oxidase I (COI) or 12S rRNA — is amplified by PCR from community DNA with primers that match conserved regions, and the amplicons are sequenced. In **shotgun metagenomics**, all the DNA in the sample is fragmented and sequenced without amplification of a particular gene. The **metagenome** is the collective genome of the community (a term introduced by Jo Handelsman and colleagues in 1998).
:::

The two approaches answer different questions at different costs. Amplicon sequencing is cheap, sensitive and standardised, and identifies *who* is present, at a taxonomic resolution limited by the marker; it says nothing directly about genes or functions. Shotgun sequencing gives access to every gene of every abundant organism — viruses and eukaryotes as well as bacteria — and allows genomes to be assembled, but needs much deeper sequencing and is dominated by the most abundant organisms (or, in samples from a host, by host DNA).

### Amplicon sequencing and its biases

The 16S rRNA gene, which Carl Woese used to discover the archaea ([[microbiology/microbial-diversity]]), has conserved regions that allow universal primers and nine variable regions (V1–V9) that distinguish taxa. Short-read studies sequence one or two variable regions (such as V4, about 250 bp); long reads now allow the whole gene. Reads were traditionally clustered into **operational taxonomic units** (OTUs) at 97 % identity, roughly the level of a bacterial species; since about 2016, denoising algorithms (such as DADA2, Benjamin Callahan, Susan Holmes and colleagues, 2016) resolve exact **amplicon sequence variants** (ASVs), distinguishing true single-base differences from sequencing errors.

Amplicon data are not a faithful census. Primers match some taxa better than others; PCR amplifies some templates more efficiently; chimeric molecules form when an incompletely extended product primes on a different template in the next cycle; and genomes carry different numbers of copies of the marker.

::: example Correcting for 16S copy number {#ex-copy}
In a community sample, 1,000 16S reads are assigned to three taxa: 600 to taxon A, 300 to taxon B and 100 to taxon C. Their genomes carry 7, 1 and 2 copies of the 16S gene respectively. Assuming no other bias, what are the relative abundances of the three taxa's cells?
::: solution
Cells are proportional to reads divided by copy number: A $600/7 = 85.7$, B $300/1 = 300$, C $100/2 = 50$, total 435.7. Relative abundances: A 19.7 %, B 68.9 %, C 11.5 %. Taxon A dominates the reads but is a minority of the cells; taxon B, with a single copy, is the most abundant. 16S copy numbers range from 1 to about 15 (a few genomes have more) among bacteria; they are known for sequenced genomes but must be inferred for uncultured taxa, which adds uncertainty to any correction.
:::
:::

### Shotgun metagenomics

Shotgun reads can be classified taxonomically by matching their $k$-mers or translated sequences to reference genomes, and functionally by matching them to databases of protein families; the result is a profile of the taxa and gene families in a community, weighted by abundance. They can also be assembled. But the depth needed depends on the abundance of the organisms one wants to see.

::: proposition Coverage of a genome in a metagenome {#prop-metacoverage}
If a metagenome contains $N$ reads of length $L$, and organism $j$ with genome length $G_j$ makes up a fraction $a_j$ of the DNA in the sample, its expected coverage is

$$
c_j = \frac{N L a_j}{G_j},
$$ {#eq-metacoverage}

and, if reads from it fall at random, the expected fraction of its genome covered by at least one read is $1 - e^{-c_j}$.
:::

This is the coverage of [[genomics/sequencing-genomes]] applied to each member of the community: the reads are shared out in proportion to DNA abundance.

::: example Sequencing a rare member {#ex-rare}
A soil metagenome is sequenced with $2\times10^7$ reads of 150 bases. (a) What coverage does a bacterium with a 4-Mb genome receive if it makes up 0.1 % of the DNA, and what fraction of its genome is covered? (b) How many reads would be needed for 10× coverage of it, enough for a reasonable assembly? (c) What does this imply for the rare members of a soil community?
::: solution
(a) $c = 2\times10^7\times150\times0.001/(4\times10^6) = 0.75$: less than one-fold. The fraction covered is $1 - e^{-0.75} = 0.53$, and that in fragments far too sparse to assemble.

(b) $N = cG/(aL) = 10\times4\times10^6/(0.001\times150) = 2.7\times10^8$ reads — more than 13 times as many.

(c) Soil communities contain thousands of taxa, most of them far rarer than 0.1 %, so even very deep sequencing assembles genomes only of the more abundant members. Rare organisms are detected in reads but not reconstructed, unless the sample is enriched for them (by cell sorting, size fractionation or culture) or many related samples are combined.
:::
:::

::: widget plot
f: 1 - exp(-R*150*(x/100)/G)
x: 0, 1
y: 0, 1
sliders: R=20:1:500:1; G=4:0.5:12:0.5
labels: \text{fraction of genome covered}
caption: The fraction of a genome covered by at least one read in a shotgun metagenome, by [[#prop-metacoverage]], against the organism's share of the community DNA in per cent (horizontal axis), for $R$ million reads of 150 bases and a genome of $G$ Mb. With 20 million reads and a 4-Mb genome, an organism at 0.1 % is only half covered; at 1 % it is covered almost completely. Increase $R$ to 500 million and organisms down to about 0.01 % are well covered. Halving the abundance always needs twice the reads, so the rare tail of a diverse community is out of reach of assembly.
:::

## The statistics of community data

### Unseen diversity

No sample captures every taxon in a community: rare ones are missed. How many taxa are there in total? Information about the unseen is contained in the rarest observed classes. If many taxa are seen only once, many more probably remain unseen; if almost every taxon has been seen several times, few remain.

::: proposition The Chao1 estimator of richness {#prop-chao}
Let $S_\mathrm{obs}$ be the number of taxa observed in a sample, $F_1$ the number seen exactly once (singletons) and $F_2$ the number seen exactly twice (doubletons). A lower-bound estimator of the total number of taxa in the community is

$$
\hat S_\mathrm{Chao1} = S_\mathrm{obs} + \frac{F_1^2}{2F_2}
$$ {#eq-chao}

(Anne Chao, 1984). The proportion of individuals in the community that belong to taxa already observed is estimated by **Good's coverage**, $\hat C = 1 - F_1/n$, where $n$ is the number of individuals (reads) sampled (I. J. Good and Alan Turing's work on code-breaking, published by Good in 1953).
:::

The derivation (not given here) uses the fact that under random sampling the expected numbers of taxa seen once and twice depend on the abundances of the rarest taxa in a way that bounds the number seen zero times. Chao1 is a lower bound: it is accurate when the unseen taxa are about as abundant as the singletons, and underestimates when there is a long tail of much rarer taxa.

::: example Estimating total richness {#ex-chao}
A 16S sample of 2,000 reads contains 120 ASVs, of which 30 are singletons and 12 doubletons. Estimate the total richness and the coverage of the sample.
::: solution
$\hat S_\mathrm{Chao1} = 120 + 30^2/(2\times12) = 120 + 37.5 = 157.5$: at least about 158 ASVs are present, so roughly a quarter of them were missed. Good's coverage is $1 - 30/2000 = 0.985$: the observed ASVs account for about 98.5 % of the individuals in the community. Most of the community's *individuals* belong to observed taxa, while a substantial fraction of its *taxa* remain unobserved — the usual situation in a community with a long tail of rare members. Sequencing errors that survive denoising inflate the singleton count and therefore the estimate, so data quality matters here more than anywhere.
:::
:::

### Comparing communities

**Beta diversity** measures how different communities are. A widely used measure is the **Bray–Curtis dissimilarity** between samples with abundances $x_i$ and $y_i$ of taxon $i$:

$$
\mathrm{BC} = 1 - \frac{2\sum_i \min(x_i, y_i)}{\sum_i x_i + \sum_i y_i},
$$ {#eq-bc}

which is 0 for identical samples and 1 for samples with no taxa in common. For two samples with abundances (40, 30, 20, 10, 0) and (10, 20, 20, 0, 50) of five taxa, the shared minima are 10 + 20 + 20 + 0 + 0 = 50, the totals are 100 each, and BC $= 1 - 100/200 = 0.5$. A matrix of such dissimilarities among many samples is visualised by ordination, such as principal coordinates analysis, and differences between groups are tested by permutation.

::: warning Relative abundances are not absolute abundances
Sequencing yields *proportions*. If one taxon doubles in absolute number while all others stay the same, the proportions of all the others fall. A taxon can therefore appear to "decrease" in relative abundance when nothing has happened to it — the compositional problem met in RNA-seq ([[genomics/functional-genomics]]), but more severe, because microbial loads differ between samples by orders of magnitude. Doug Vandeputte, Jeroen Raes and colleagues (2017) showed that when the total microbial load of faecal samples, measured by flow cytometry, was used to convert proportions into cell counts, several reported associations with health status changed or disappeared. Absolute quantification — by flow cytometry, quantitative PCR of the marker gene, or spike-in DNA of known amount — and statistical methods designed for compositional data are needed before saying that a taxon increased or decreased.
:::

## Genomes from metagenomes

Assembling a metagenome produces contigs from many organisms mixed together. Sorting them into genomes is **binning**. Two properties distinguish the contigs of one genome from those of others: their **composition** (each genome has a characteristic GC content and frequency of short words, such as the 256 tetranucleotides), and their **coverage**, which is the same along one genome but different between organisms of different abundance — and, across a series of related samples, covaries in the same way for all contigs of one genome.

::: definition Metagenome-assembled genome {#def-mag}
A **metagenome-assembled genome** (MAG) is a set of contigs binned together as the genome of one population. Its **completeness** and **contamination** are estimated from a set of marker genes expected in a single copy in its lineage: the fraction of markers found, and the fraction found in more than one copy. A **high-quality draft** MAG, by the community standard of 2017 (Robert Bowers and colleagues), is more than 90 % complete with less than 5 % contamination and contains the 23S, 16S and 5S rRNA genes and at least 18 tRNA genes; a **medium-quality** MAG is at least 50 % complete with less than 10 % contamination.
:::

A MAG is a consensus of a population, not the genome of one cell: strains that differ in their accessory genes ([[genomics/comparative-genomics]]) are merged, and genes in mobile elements and multicopy regions are often missing. Long-read metagenomics increasingly produces complete, circular genomes directly from communities. A complementary approach sorts single cells and amplifies their genomes (**single-cell genomics**), at the cost of uneven amplification.

The first nearly complete genomes reconstructed from an environment came from a biofilm in acid mine drainage at Iron Mountain, California, dominated by a few species (Gene Tyson, Jillian Banfield and colleagues, 2004). Since then MAGs have transformed the tree of life. Thousands of genomes from groundwater revealed the **candidate phyla radiation** of bacteria (now classified as the phylum Patescibacteria; Christopher Brown, Banfield and colleagues, 2015), with tiny cells and genomes that lack many biosynthetic pathways and probably live attached to other microbes. Laura Hug, Banfield and colleagues' tree of 2016, built from ribosomal proteins of more than 3,000 genomes, showed that most bacterial diversity lies in lineages with no cultured members. Archaeal MAGs from marine sediments near a hydrothermal vent field ("Loki's Castle") revealed the **Asgard archaea** (Anja Spang, Thijs Ettema and colleagues, 2015), which encode many proteins previously thought specific to eukaryotes and are now considered the closest archaeal relatives of eukaryotes ([[diversity-of-life/origin-of-life]]); an Asgard archaeon was later grown in culture after twelve years of effort (Hiroyuki Imachi and colleagues, 2020).

## Microbiomes

::: application The human gut microbiome
The human colon holds the densest microbial community known, about $10^{11}$ bacterial cells per gram of contents. A widely quoted claim that bacteria outnumber human cells by ten to one was traced to a rough estimate of 1972; Ron Sender, Shai Fuchs and Ron Milo (2016) re-estimated the numbers as about $3.8\times10^{13}$ bacteria and $3.0\times10^{13}$ human cells in a reference adult — roughly equal. The gene content is far less equal: the MetaHIT catalogue from the faeces of 124 Europeans contained 3.3 million non-redundant microbial genes (Junjie Qin, Jun Wang and colleagues, 2010), about 150 times the number of human genes, and catalogues from larger samples are bigger still. Gut microbes digest dietary fibre into short-chain fatty acids, synthesise vitamins, modify bile acids and drugs, and educate the immune system. Germ-free mice raised without microbes differ in gut development, metabolism and immunity, and transplanting microbiota into them is the main experimental test of whether a community causes a host trait — as Peter Turnbaugh, Jeffrey Gordon and colleagues (2006) showed for the greater energy harvest of the microbiota of obese mice. Many reported associations between microbiomes and human disease have not been shown to be causal, and the clinical use of microbiome data belongs to [Medicine Atlas](/learn/medicine/).
:::

Microbiomes of other hosts are studied in the same way: the bacteria that supply essential amino acids to aphids and other sap-feeding insects, with tiny genomes ([[genomics/genome-architecture]]); the symbionts of corals and their loss in bleaching; the rumen communities that ferment cellulose (and produce methane) in cattle; the root microbiomes of plants, which affect nutrient uptake and disease resistance.

**Ocean metagenomics** began with Craig Venter and colleagues' shotgun sequencing of water from the Sargasso Sea (2004), which yielded over a million previously unknown genes, and continued with the Tara Oceans expedition (2009–2013), whose catalogue from 243 samples contained about 40 million genes, most of them new (Shinichi Sunagawa and colleagues, 2015). An earlier discovery from cloned environmental DNA had already shown what such data can reveal: Oded Béjà, Edward DeLong and colleagues (2000) found a light-driven proton pump, **proteorhodopsin**, in an uncultured marine bacterium; it is now known to be among the most widespread phototrophic systems in the sunlit ocean.

**Viruses** are the most abundant biological entities in the oceans, and metagenomes of virus particles (viromes) have identified hundreds of thousands of viral populations. Hosts are linked to their phages by **CRISPR spacers** — fragments of phage DNA stored in bacterial genomes as immune memory — and by shared sequence features. The most abundant virus in the human gut, crAssphage, was discovered in 2014 by assembling metagenomic data (Bas Dutilh and colleagues), and its host, a *Bacteroides* species, was identified from those links before the phage was cultured.

::: quiz
A study reports that the relative abundance of a gut bacterial genus is twice as high in people with a condition as in people without it. Which conclusion is justified?
- [ ] The genus causes the condition.
- [ ] People with the condition have twice as many cells of this genus.
- [x] The genus makes up a larger share of the sequenced community in people with the condition; whether its absolute abundance differs, and whether it has any causal role, needs further evidence.
- [ ] The genus should be removed to treat the condition.
::: solution
Relative abundances can rise because other taxa fell or because the total microbial load differs, so the absolute abundance may not have changed. Even an absolute difference is an association, which could be a consequence of the condition (or of its treatment, or of diet) rather than a cause. Causation needs experiments such as transplantation into germ-free animals, or longitudinal and interventional studies. And no treatment conclusion follows from an association.
:::
:::

## Environmental DNA

Animals and plants shed DNA into their surroundings — in skin cells, mucus, faeces, gametes and decaying tissue. This **environmental DNA** (eDNA) can be collected by filtering water or sampling soil or air, and identified by metabarcoding with markers such as 12S rRNA for fishes (the MiFish primers, Masaki Miya and colleagues, 2015) or COI for invertebrates. Gentile Ficetola and colleagues (2008) showed that the invasive American bullfrog could be detected in French ponds from the DNA in a few water samples, and eDNA surveys are now used to monitor rare and endangered species, detect invasive ones early, and survey whole fish communities of rivers and coasts.

eDNA detection is probabilistic. DNA is patchily distributed and degrades within days in warm water; a sample may miss a species that is present.

::: proposition Detection with replicate samples {#prop-detection}
If a species is present at a site and each independent eDNA sample detects it with probability $p$, the probability that at least one of $k$ samples detects it is

$$
P_\mathrm{detect} = 1 - (1 - p)^k,
$$ {#eq-detection}

and the number of samples needed for detection probability at least $P^\ast$ is $k \ge \ln(1 - P^\ast)/\ln(1 - p)$.
:::

The formula assumes independence and a constant $p$; **occupancy models** estimate $p$ and the probability that the species is present at all from the pattern of detections across replicate samples at many sites, borrowed from the ecology of field surveys.

::: example How many water samples? {#ex-edna}
A rare amphibian, when present in a pond, is detected in a single water sample with probability 0.3. (a) What is the probability of detecting it with 3 samples? (b) How many samples are needed for 95 % confidence of detecting it, if present? (c) A survey takes 9 samples from a pond and detects nothing. What can be concluded?
::: solution
(a) $1 - 0.7^3 = 1 - 0.343 = 0.657$.

(b) $k \ge \ln 0.05/\ln 0.7 = (-3.00)/(-0.357) = 8.4$, so 9 samples. Then $1 - 0.7^9 = 0.96$.

(c) If present, the species would have been missed with probability $0.7^9 = 0.04$. Absence is likely but not certain: whether it is "probably absent" depends also on how likely presence was beforehand (by Bayes' theorem, [[biostatistics/probability-distributions]]). A non-detection from a single sample, which misses a present species 70 % of the time, would say almost nothing.
:::
:::

::: widget plot
f: 1 - (1 - p)^x
x: 0, 20
y: 0, 1
sliders: p=0.3:0.05:0.9:0.05
labels: P_\mathrm{detect}
hlines: 0.95
caption: The probability of detecting a species present at a site with $x$ independent eDNA samples, each detecting it with probability $p$, by [[#eq-detection]]. With $p = 0.3$ the 95 % line (dashed) is crossed at 9 samples. Lower $p$ to 0.1 — a very rare species, or a sampling season when little DNA is shed — and 29 samples would be needed, off the right of the plot. Survey design depends on estimating $p$ in pilot studies, and replicate PCRs of each sample are often run to separate sampling from laboratory failures.
:::

::: widget distribution
dist: binomial
params: n=9, p=0.3
a: 0
b: 0
caption: The number of positive samples out of $n = 9$ when a species is present and each sample detects it with probability $p = 0.3$. The shaded bar at zero is the probability of missing the species entirely, $0.7^9 = 0.04$. Most of the probability lies at 1 to 5 positives, so a site with one positive out of nine is consistent with presence. A single positive in a site where the species should be absent raises the opposite question: whether it is contamination or DNA carried in from elsewhere, which is why field and laboratory negative controls are part of every eDNA survey.
:::

eDNA also reaches back in time. DNA bound to sediments survives far longer than in water: **sedimentary ancient DNA** from permafrost and lake sediments has reconstructed Arctic plant and animal communities of the last ice age, and Kurt Kjær, Eske Willerslev and colleagues (2022) recovered DNA about two million years old from sediments of the Kap København Formation in northern Greenland, revealing a forest ecosystem with mastodons, reindeer and geese.

::: history
In 1977 Carl Woese and George Fox used ribosomal RNA to define the archaea. Norman Pace and colleagues proposed in the mid-1980s that rRNA genes cloned directly from environmental samples could reveal uncultured microbes, and in the 1990s such surveys found deep lineages of bacteria and archaea known from nothing but their rRNA sequences. Jo Handelsman and colleagues coined "metagenome" in 1998 while cloning large fragments of soil DNA to search for new antibiotics. Shotgun metagenomics began in 2004 with the acid mine drainage biofilm and the Sargasso Sea. The NIH Human Microbiome Project (2008–2012) and MetaHIT characterised the human microbiome, Tara Oceans the ocean's plankton, and the reconstruction of thousands of genomes from metagenomes from 2015 onwards revealed the candidate phyla radiation and the Asgard archaea, and showed that most of life's diversity is microbial and uncultured.
:::

::: summary
- Metagenomics ([[#def-metagenomics]]) reads community DNA without culture: amplicon sequencing of marker genes (16S, ITS, COI, 12S) identifies taxa cheaply; shotgun sequencing gives genes, functions and genomes.
- Amplicon data are biased by primers, PCR, chimeras and marker copy number; correcting for copy number can reverse apparent dominance.
- Coverage of each organism in a shotgun metagenome is $NLa_j/G_j$ ([[#prop-metacoverage]]); rare members are detected but not assembled.
- Unseen richness is estimated from singletons and doubletons (Chao1, [[#prop-chao]]); communities are compared with dissimilarities such as Bray–Curtis. Sequencing gives relative abundances, which must not be read as absolute changes.
- Metagenome-assembled genomes ([[#def-mag]]), binned by composition and coverage and judged by marker-gene completeness and contamination, revealed the candidate phyla radiation and the Asgard archaea.
- Microbiome studies link communities to host biology; causation requires experiments such as germ-free transplantation.
- Environmental DNA detects animals and plants from water, soil and sediment; detection is probabilistic, $1 - (1 - p)^k$ ([[#prop-detection]]), and sedimentary DNA reconstructs ecosystems up to two million years old.
:::

## Exercises

::: exercise Copy-number correction {level=1 check="0.75"}
A sample yields 500 16S reads of taxon X (4 copies per genome) and 500 of taxon Y (12 copies per genome). What fraction of the cells belong to taxon X?
::: solution
Cells: X $500/4 = 125$, Y $500/12 = 41.7$. Fraction X $= 125/166.7 = 0.75$.
:::
:::

::: exercise Chao1 {level=1 check="250"}
A sample contains 200 taxa, of which 40 are singletons and 16 doubletons. What is the Chao1 estimate of richness?
::: solution
$200 + 40^2/(2\times16) = 200 + 1600/32 = 200 + 50 = 250$.
:::
:::

::: exercise Bray–Curtis {level=1 check="0.2"}
Two samples have abundances (50, 30, 20) and (30, 30, 40) of three taxa. Calculate the Bray–Curtis dissimilarity.
::: solution
Shared minima: $30 + 30 + 20 = 80$; totals 100 and 100. BC $= 1 - 2\times80/200 = 0.2$.
:::
:::

::: exercise Reads for a target genome {level=2}
In a gut metagenome, a bacterium of interest has a 3-Mb genome and makes up 0.5 % of the microbial DNA, and 60 % of the reads come from the host. How many 150-base reads are needed for 20× coverage of the bacterium?
::: solution
Microbial reads needed: $N_\mathrm{mic} = cG/(aL) = 20\times3\times10^6/(0.005\times150) = 8.0\times10^7$. Since only 40 % of reads are microbial, the total is $8.0\times10^7/0.4 = 2.0\times10^8$ reads. Depleting host DNA before sequencing, or sequencing faeces (in which host DNA is a small fraction) rather than tissue biopsies, reduces the cost greatly.
:::
:::

::: exercise Binning by coverage {level=2}
An assembly from five related samples yields three groups of contigs. Group 1 has GC content 38 % and coverage (12, 30, 5, 22, 18) across the five samples; group 2 has GC 38 % and coverage (40, 8, 35, 2, 60); group 3 has GC 62 % and coverage (12, 31, 5, 21, 19). Which groups probably belong to the same genome, and why is composition alone insufficient?
::: solution
Groups 1 and 3 have the same coverage profile across samples (their coverage rises and falls together), so they probably come from one population — despite their different GC content, which could reflect a horizontally acquired region (a genomic island or plasmid) with atypical composition, or a mistake. Groups 1 and 2 share GC content but have quite different coverage profiles, so they come from different organisms. Composition alone cannot separate organisms with similar GC and word frequencies, and it misplaces horizontally transferred regions; differential coverage across samples is the more powerful signal. (Whether group 3 is really part of the same genome, or a plasmid or phage that co-varies with it, would be checked by linkage in long reads or by assembly graph connections.)
:::
:::

::: exercise eDNA survey design {level=2 check="14"}
A fish species is detected in a single river sample with probability 0.2 when present. How many samples are needed for a 95 % probability of detecting it if present?
::: solution
$k \ge \ln 0.05/\ln 0.8 = -2.996/-0.2231 = 13.4$, so 14 samples ($1 - 0.8^{14} = 0.956$).
:::
:::

::: exercise A compositional trap {level=3}
Before and after a course of an antibiotic, a person's gut community is sequenced. Taxon A rises from 10 % to 40 % of reads, taxon B falls from 50 % to 30 %, and the others fall from 40 % to 30 %. Flow cytometry shows that total bacterial load fell tenfold. (a) Compute the absolute abundances of A, B and the others after treatment, relative to before. (b) Which taxa were most affected by the antibiotic? (c) What does this imply about relative-abundance studies?
::: solution
(a) Taking the initial load as 1 (arbitrary units): before, A = 0.10, B = 0.50, others = 0.40. After, total = 0.1, so A = 0.04, B = 0.03, others = 0.03. Relative to before: A fell to 40 % of its initial abundance, B to 6 %, the others to 7.5 %.

(b) All taxa decreased in absolute terms; B and the others were reduced most severely (about 15-fold), A least (2.5-fold). A was relatively resistant, not favoured. The relative data, which show A quadrupling, give the wrong picture of what happened to it.

(c) Relative abundances alone cannot tell whether a taxon increased or whether others decreased, and when total load changes, as it does with antibiotics, diet or disease, conclusions can be reversed. Absolute quantification or analyses of ratios between taxa, which do not depend on the total, are needed.
:::
:::

::: exercise Assessing a MAG {level=3}
A MAG of 2.1 Mb from a groundwater sample contains 85 of 104 bacterial single-copy marker genes, 8 of them in two copies; no 16S rRNA gene was assembled; its closest relatives belong to the candidate phyla radiation, whose genomes are typically about 1 Mb. (a) Estimate its completeness and contamination and classify its quality. (b) What do the genome size and the duplicated markers together suggest? (c) Why might the 16S gene be missing, and what problem does that create for linking the MAG to amplicon surveys?
::: solution
(a) Completeness $85/104 = 82$ %; contamination about $8/104 = 7.7$ %. By the 2017 standard this is a medium-quality draft: more than 50 % complete, less than 10 % contaminated, but short of high quality (which needs > 90 % completeness, < 5 % contamination and rRNA genes). Note that CPR genomes naturally lack some markers that other bacteria have, so lineage-specific marker sets give better estimates.

(b) A 2.1-Mb bin is about twice the typical size of its relatives' genomes, and duplicated markers indicate that contigs from a second, related population have been binned with it. It is probably a composite of two closely related organisms, which should be separated (for example by coverage across more samples or by long reads), and its gene content should not be interpreted as that of one organism.

(c) rRNA operons are often present in several near-identical copies, which collapse in assembly and fragment the contigs, and their composition and coverage differ from the rest of the genome, so binning often leaves them out. Without its 16S gene, the MAG cannot be matched directly to the ASVs of amplicon studies, so the organism's abundance and distribution in other environments cannot be read from the many existing 16S surveys; phylogenies are then built from conserved proteins instead.
:::
:::
