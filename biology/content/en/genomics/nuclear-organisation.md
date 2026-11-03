The two metres of DNA in a human cell fit into a nucleus about ten micrometres across. That alone requires compaction by a factor of some hundred thousand ([[molecular-biology/dna-structure]]). But the genome in the nucleus is not a tangle of randomly packed spaghetti. Each chromosome occupies its own region; active and inactive parts of the genome segregate from each other; and the chromatin fibre is folded into loops and domains whose positions are similar from cell to cell. An enhancer that controls a gene from a distance of hundreds of kilobases must come into contact with it, and the folding of the chromosome determines which genes an enhancer can reach.

This chapter describes the three-dimensional genome at three scales — chromosome territories and nuclear compartments, the A and B compartments of active and inactive chromatin, and the topologically associating domains and loops formed by cohesin and CTCF — together with the methods that revealed them and the physical models that explain them. It ends with what is and is not known about how folding affects gene expression, a question on which the evidence is more mixed than early papers suggested. Chromatin marks are in [[genomics/epigenomics]]; enhancers and transcription factors in [[molecular-biology/eukaryotic-gene-regulation]].

## Chromosome territories and nuclear landmarks

::: example How crowded is the nucleus? {#ex-crowding}
A diploid human nucleus contains about $6.4\times10^9$ bp of DNA. Treat DNA as a cylinder 2 nm in diameter with 0.34 nm per base pair and the nucleus as a sphere 10 μm in diameter. (a) What is the total length of DNA? (b) What fraction of the nuclear volume does the DNA itself occupy? (c) Why does this not mean the nucleus is mostly empty?
::: solution
(a) $6.4\times10^9\times0.34\ \text{nm} = 2.18\times10^9\ \text{nm} = 2.2$ m.

(b) Volume of DNA $= \pi\times(1\ \text{nm})^2\times2.18\times10^9\ \text{nm} = 6.8\times10^9\ \text{nm}^3 = 6.8\ \mu\text{m}^3$. Nuclear volume $= \tfrac43\pi(5\ \mu\text{m})^3 = 524\ \mu\text{m}^3$. The DNA occupies about 1.3 %.

(c) DNA is wrapped around histone octamers, roughly doubling the mass and greatly increasing the volume of the fibre, and it is bound by many other proteins and RNAs; the nucleus also holds nucleoli, nuclear speckles and other bodies, and a concentrated solution of proteins. Chromatin occupies a substantial fraction of the nucleus, yet its density is low enough that proteins of the size of transcription factors can diffuse through most of it. The DNA is crowded, but it is not a solid.
:::
:::

In the 1980s, Thomas and Christoph Cremer used laser micro-irradiation of part of a nucleus, and later fluorescent "chromosome painting" with probes covering whole chromosomes, to show that each interphase chromosome occupies a compact **territory**, mixing with its neighbours only at the edges. Territories are not placed at random. In human lymphocytes and fibroblasts, gene-rich chromosome 19 lies towards the centre of the nucleus and gene-poor chromosome 18, of similar size, towards the periphery (Jeffrey Croft, Wendy Bickmore and colleagues, 1999). Within territories, active genes tend to lie at the edges, sometimes looping out.

The nucleus has landmarks that organise the chromatin around them:

- the **nuclear lamina**, a meshwork of lamin proteins under the inner nuclear membrane, which binds large stretches of inactive, gene-poor chromatin called **lamina-associated domains** (LADs). Mapped by DamID — tethering a bacterial adenine methyltransferase to lamin B and detecting the methylated DNA — in human fibroblasts, about 1,300 LADs of 0.1–10 Mb cover more than a third of the genome (Lars Guelen, Bas van Steensel and colleagues, 2008);
- the **nucleolus**, built around the rRNA gene clusters and bordered by other heterochromatin;
- **nuclear speckles**, bodies rich in splicing factors, near which many highly active genes lie.

## Chromosome conformation capture

Microscopy can show where a few loci lie in single cells; to map contacts genome-wide, biologists turned to a biochemical trick.

::: definition Chromosome conformation capture and Hi-C {#def-hic}
In **chromosome conformation capture** (3C; Job Dekker, Nancy Kleckner and colleagues, 2002, in yeast), cells are fixed with formaldehyde, which cross-links DNA segments that are close in space through the proteins between them. The chromatin is cut with a restriction enzyme and the cross-linked fragments are ligated to each other under conditions that favour joining of fragments held in the same complex. Each ligation junction records a contact between two genomic loci. **Hi-C** (Erez Lieberman Aiden, Job Dekker, Eric Lander and colleagues, 2009) marks the junctions with biotin, purifies them and sequences them in pairs, so that every contact in the genome can be counted. The result is a **contact matrix** $C_{ij}$: the number of read pairs linking genomic bins $i$ and $j$.
:::

A Hi-C map is an average over millions of cells, and a contact frequency is a probability of proximity, not a fixed structure. Interpreting the matrix needs models of what contact frequencies are expected by chance.

### How contact frequency falls with distance

The strongest feature of every Hi-C map is the diagonal: loci close together along the chromosome contact each other most. How fast the contact probability falls with genomic distance $s$ is set by the polymer physics of the fibre.

::: proposition Contact probability of an ideal polymer {#prop-scaling}
Model the chromatin fibre as an ideal polymer — a random walk in three dimensions — so that two loci separated by genomic distance $s$ have a Gaussian distribution of spatial separation with mean-square distance $\langle R^2\rangle = b^2 s$, with $b$ a constant. Then the probability that they lie within a small contact distance $a$ of each other is, for $s$ large enough that $a^2 \ll b^2 s$,

$$
P_c(s) \approx \left(\frac{3}{2\pi b^2 s}\right)^{3/2}\frac{4\pi a^3}{3} \;\propto\; s^{-3/2}.
$$ {#eq-scaling}

A polymer in a compact, unknotted **fractal globule** gives instead $P_c(s) \propto s^{-1}$.
:::

::: proof
For a three-dimensional Gaussian random walk, the separation vector $\mathbf R$ between two loci has density $p(\mathbf R) = (3/2\pi\langle R^2\rangle)^{3/2}\exp(-3R^2/2\langle R^2\rangle)$. The probability that $\lvert\mathbf R\rvert < a$ is the integral of $p$ over a ball of radius $a$. When $a^2 \ll \langle R^2\rangle$ the exponential is close to 1 throughout the ball, so the integral is approximately the density at the origin times the volume $4\pi a^3/3$. Substituting $\langle R^2\rangle = b^2s$ gives [[#eq-scaling]]. The fractal globule result is not derived here; it follows from the self-similar packing of a polymer that has collapsed without knotting, in which a segment of length $s$ fills a compact region of volume proportional to $s$ and so meets other segments with probability proportional to $1/s$ (Alexander Grosberg and colleagues, 1988).
:::

In human cells, Lieberman Aiden and colleagues found $P_c(s) \propto s^{-1.08}$ between about 0.5 and 7 Mb: close to the fractal globule, and inconsistent with an ideal chain at equilibrium. The exponent has been measured in many cell types since; it is near 1 in interphase but changes in mitosis and when cohesin is removed, and in the light of later work it is best explained by loop extrusion rather than by a fractal globule.

::: widget plot
f: (0.1/x)^a; (0.1/x)^1.5
x: 0.1, 5
y: 0, 1
sliders: a=1:0.5:2:0.05
labels: s^{-\alpha}; s^{-3/2}
caption: Contact probability against genomic distance $s$ in megabases, relative to its value at 0.1 Mb, for a power law $P_c(s) \propto s^{-\alpha}$ (with $\alpha$ set by the slider) and for an ideal polymer ($\alpha = 3/2$). With $\alpha = 1$, as observed in human interphase Hi-C, a locus 1 Mb away is contacted a tenth as often as one 100 kb away; for an ideal chain, about a thirtieth. A difference of half a unit in the exponent means a large difference in how often distant enhancers and promoters meet.
:::

::: example What the exponent means {#ex-scaling}
(a) For $P_c \propto s^{-1}$ and for $P_c \propto s^{-3/2}$, by what factor does contact frequency fall between 100 kb and 1 Mb? (b) An enhancer is 500 kb from its target promoter. If the contact frequency at 50 kb is 5 % of cells, what does each law predict at 500 kb? (c) Why are both estimates likely to be wrong for a real enhancer–promoter pair?
::: solution
(a) Tenfold for $\alpha = 1$; $10^{1.5} = 32$-fold for $\alpha = 1.5$.

(b) Tenfold distance: 0.5 % with $\alpha = 1$, $5/31.6 = 0.16$ % with $\alpha = 1.5$.

(c) The power laws describe the *average* over all pairs at a given distance. Specific pairs deviate strongly: loops anchored by CTCF and cohesin, contacts within a domain, and contacts between loci in the same compartment are enriched, while contacts across domain boundaries are depleted. Hi-C analyses therefore compare each contact with the expected value at its distance (the **observed/expected** matrix) to find these features.
:::
:::

## Compartments

When Hi-C contact frequencies are normalised by distance and correlated across the matrix, a checkerboard pattern appears: every locus belongs to one of two sets, and loci of the same set contact each other more than loci of different sets, even at distances of tens of megabases or on different chromosomes.

::: definition A and B compartments {#def-compartments}
Compute the observed/expected contact matrix, its correlation matrix (the correlation between the contact profiles of each pair of bins), and the first principal component (eigenvector) of the correlation matrix. Bins with one sign of the eigenvector form the **A compartment** and those with the other sign the **B compartment**; the sign is chosen so that A has the higher gene density. A is gene-rich, accessible, transcriptionally active and marked by active histone modifications; B is gene-poor, compact, rich in heterochromatin marks and in lamina-associated domains, and replicates late in S phase.
:::

Compartments are typically hundreds of kilobases to several megabases long and alternate along chromosomes. Finer analysis divides them into subcompartments (Suhas Rao, Erez Lieberman Aiden and colleagues, 2014, distinguished six). Compartments correlate with chromatin states rather than determining them: when a gene is activated during differentiation, the region around it often switches from B to A. The mechanism is thought to be **microphase separation**: chromatin regions with similar marks and bound proteins attract one another weakly, and over a long polymer these weak preferences produce segregation, much as oil and vinegar separate.

## Domains and loops

At higher resolution, Hi-C maps show squares along the diagonal: stretches within which loci contact each other frequently, separated by boundaries across which contacts are depleted.

::: definition Topologically associating domain {#def-tad}
A **topologically associating domain** (TAD) is a genomic region, typically hundreds of kilobases long in mammals, within which contact frequencies are elevated relative to contacts with neighbouring regions, bounded by sharp transitions in contact frequency. TADs were described in 2012 in human and mouse cells by Jesse Dixon, Bing Ren and colleagues, and in mouse cells by Elphège Nora, Edith Heard and colleagues. Many TAD boundaries are bound by the protein CTCF and the cohesin complex, and many TADs are visible as loops in high-resolution maps.
:::

Rao and colleagues' Hi-C map of 2014, at 1-kb resolution in human lymphoblastoid cells, found about 10,000 **loops**: point-like peaks of contact between two loci (the loop anchors), usually up to about 2 Mb apart. Most anchors were bound by CTCF and cohesin, and when both anchors contained a CTCF binding motif, the two motifs pointed towards each other — were **convergent** — in more than 90 % of loops.

::: example The CTCF orientation rule {#ex-convergent}
Each CTCF motif is asymmetric, so it can point either way along the chromosome. In a hypothetical high-resolution map, 400 loops have a single CTCF motif at each anchor, and 368 of these pairs are convergent. (a) What fraction would be convergent if orientations were independent and random? (b) Test the observed fraction against that expectation. (c) Why is this pattern hard to explain if loops form by random collisions between CTCF-bound sites?
::: solution
(a) Each anchor's motif points left or right with probability ½, so the four combinations (convergent, divergent, and two tandem orientations) are equally likely: 25 % convergent.

(b) Expected 100 convergent of 400, with binomial standard deviation $\sqrt{400\times0.25\times0.75} = 8.7$. Observed 368: $z = (368 - 100)/8.7 = 31$, a deviation with a vanishingly small probability under random orientation.

(c) If two CTCF-bound sites met by diffusion, the relative orientation of their motifs would not matter — a site 500 kb away could approach from either side. A strong orientation preference implies that the process forming loops reads the direction of the DNA *between* the anchors. That is exactly what the loop-extrusion model proposes.
:::
:::

### Loop extrusion

::: intuition Loop extrusion
Imagine a ring that lands on the chromatin fibre and begins to pull it through itself from both sides, so that a loop grows out of the ring. The ring keeps reeling in chromatin until it falls off, or until it meets an obstacle that stops it: a CTCF protein bound to its motif in the orientation that faces the approaching ring. A CTCF molecule bound the other way is passed. Where two convergent CTCF sites bracket a region, rings that load inside it get stuck at both ends, and the region spends much of its time as a loop with the two CTCF sites held together — a peak in Hi-C at the anchors and a square of enriched contacts within. Different cells, and the same cell at different times, have rings at different stages of extrusion, so the population average looks like a domain.
:::

The ring is **cohesin**, the same complex that holds sister chromatids together after replication. The model was developed for interphase chromosomes by Adrian Sanborn, Erez Lieberman Aiden and colleagues (2015) and by Geoffrey Fudenberg, Leonid Mirny and colleagues (2016); Kim Nasmyth had proposed loop extrusion by SMC complexes in 2001. The evidence for it is now strong:

- **Depletion**. Rapidly degrading cohesin (Suhas Rao and colleagues, 2017) or its loader eliminates loops and most TADs within hours, while compartments remain and even strengthen. Degrading CTCF (Elphège Nora and colleagues, 2017) abolishes most TAD boundaries, but not compartments. Compartments and loops are therefore made by different mechanisms.
- **Editing**. Inverting a single CTCF site at a loop anchor with CRISPR (Ya Guo, Tom Maniatis and colleagues, and Elzo de Wit, Wouter de Laat and colleagues, both 2015) abolishes or redirects the loop, as the orientation rule predicts.
- **Direct observation**. Purified condensin (Mahipal Ganji, Cees Dekker and colleagues, 2018, with yeast condensin) and cohesin (Iain Davidson, Jan-Michael Peters and colleagues, and Yoori Kim, Hongtao Yu and colleagues, 2019) extrude DNA loops in single-molecule experiments, powered by ATP hydrolysis, at rates of the order of a kilobase per second.

::: proposition Extrusion distance with random release {#prop-extrusion}
Suppose a loop-extruding complex reels in DNA at constant speed $v$ (in base pairs per second, summed over both sides) and is released from chromatin at a constant rate $1/\tau$, so its residence time is exponentially distributed with mean $\tau$. Then the length of loop it extrudes before release, in the absence of barriers, is exponentially distributed with mean (the **processivity**)

$$
\lambda = v\tau,
$$ {#eq-processivity}

and the probability that it extrudes at least a length $s$ — for example, enough to reach CTCF sites $s$ apart from a loading site midway between them — is $e^{-s/\lambda}$.
:::

The proof is a change of variable: extruded length is $v$ times the residence time, and a multiple of an exponential random variable is exponential with the mean scaled by the same factor.

::: example Can cohesin reach a distant boundary? {#ex-extrusion}
Single-molecule experiments suggest that cohesin extrudes at roughly 0.5–1 kb s⁻¹, and live-cell imaging gives a residence time on chromatin of about 20 minutes for the dynamically bound fraction. (a) What processivity do these numbers imply? (b) Fitting polymer simulations to Hi-C maps suggests an effective processivity of a few hundred kilobases in vivo. Using $\lambda = 200$ kb, what fraction of cohesin complexes loaded in the middle of a TAD 1 Mb long would extrude the whole TAD before being released? And for a 100-kb TAD? (c) Suggest why the in vivo processivity may be lower than in (a).
::: solution
(a) With $v = 0.75$ kb s⁻¹ and $\tau = 1{,}200$ s, $\lambda = 0.75\times1200 \approx 900$ kb, of the order of a megabase.

(b) To bring together the two boundaries 1 Mb apart, a complex must extrude $s = 1$ Mb: $e^{-1000/200} = e^{-5} = 0.0067$, under 1 %. For a 100-kb TAD, $e^{-0.5} = 0.61$. Large domains are rarely extruded fully, so in any one cell they are partly looped, and the loop anchors of large domains meet in only a small fraction of cells — consistent with imaging, which shows anchor contacts in a minority of cells at any moment.

(c) Extrusion in the cell is slowed or stalled by obstacles — nucleosomes, bound proteins, RNA polymerase, other cohesin complexes — and the effective speed may be lower than on naked DNA; residence times also vary between cohesin populations. The numbers in (a) are rough and illustrative.
:::
:::

::: widget plot
f: exp(-x/L)
x: 0, 1500
y: 0, 1
sliders: L=200:50:1000:10
labels: P(\text{extrude at least } s)
caption: The probability that a loop-extruding cohesin complex reels in at least $s$ kilobases (horizontal axis) before it is released, by [[#prop-extrusion]], for processivity $\lambda = L$ kb. At $\lambda = 200$ kb, two-thirds of complexes stop before 220 kb and fewer than 1 % reach 1 Mb. Raise $L$ — experimentally, depleting the cohesin-release factor WAPL does this — and long loops become common; Hi-C maps of WAPL-depleted cells indeed show loops between CTCF sites that are normally too far apart to meet, and the chromosomes condense into "vermicelli" visible under the microscope.
:::

## Folding and gene regulation

How much does this architecture matter for gene expression? Two lines of evidence pull in different directions.

**Evidence that domains matter.** Enhancers mostly act on genes within the same TAD, and the boundaries of TADs are conserved between mouse and human more than the rest of the genome. Disrupting a boundary can let an enhancer reach the wrong gene. In a celebrated study, Darío Lupiáñez, Stefan Mundlos and colleagues (2015) showed that human limb malformations caused by deletions, inversions and duplications at the *EPHA4* locus act by moving boundaries: limb enhancers of *EPHA4* came to activate the neighbouring genes *PAX3*, *WNT6* or *IHH*, and engineering the same rearrangements in mice reproduced the defects. In some cancers, deletion or methylation of a CTCF site at a domain boundary lets an enhancer activate an oncogene ("enhancer hijacking"). The *Igf2*–*H19* imprinting mechanism ([[genomics/epigenomics]]) works by an allele-specific CTCF-bound insulator.

**Evidence that domains matter less than expected.** When cohesin was degraded in human cells, and nearly all loops and TADs disappeared, relatively few genes changed expression markedly within the following hours (Rao and colleagues, 2017). In *Drosophila*, balancer chromosomes with many large inversions and rearrangements, which disrupt numerous TADs, change the expression of surprisingly few genes (Yad Ghavi-Helm, Eileen Furlong and colleagues, 2019). The famous long-range enhancer of the mouse *Sonic hedgehog* gene — the ZRS, which drives limb expression from about 1 Mb away inside an intron of another gene (Laura Lettice and colleagues, 2003) — remains functional when the CTCF sites around it are removed, though with reduced robustness. Imaging of single cells (Bogdan Bintu, Xiaowei Zhuang and colleagues, 2018) shows domain-like structures in individual cells even without cohesin, with boundaries that vary from cell to cell.

The emerging view is that loop extrusion increases the frequency of contact within domains and reduces it across boundaries, which matters most for long-range enhancer–promoter communication and for the precision and robustness of developmental gene expression, while many genes, regulated by nearby elements, are relatively insensitive to it. How an enhancer actually activates a promoter — by direct contact, by proximity within a cluster of transcription factors and coactivators, or by some combination — is still being worked out, and the role of **biomolecular condensates** (phase-separated droplets of transcription factors and co-activators that some studies observe at active genes) is debated.

::: warning A Hi-C map is not a picture of one nucleus
Hi-C matrices are averages over millions of cells. A loop seen as a strong peak may be present in only 5–20 % of cells at any moment; a TAD is a statistical tendency for contacts, not a fixed globule. Interpreting a peak as a stable structure, or concluding that two loci "touch" in every cell, is a common mistake. Single-cell Hi-C and multiplexed imaging show high cell-to-cell variability, and the order seen in averages arises from dynamic processes — extrusion, release, phase separation — acting differently in each cell.
:::

::: quiz
A CTCF site at a TAD boundary is deleted in mouse embryonic stem cells. Which outcome is most consistent with the loop-extrusion model?
- [ ] All genes in both neighbouring TADs are silenced.
- [ ] The A/B compartment pattern of the whole chromosome is lost.
- [x] The two neighbouring domains partially merge in Hi-C maps, and an enhancer in one domain may now contact, and sometimes activate, a gene in the other.
- [ ] Nothing changes, because CTCF has no role in folding.
::: solution
Without the barrier, cohesin extruding from one domain can continue into the next, so contacts between the two domains rise and the boundary weakens. This can bring an enhancer into more frequent contact with a gene it did not previously regulate, with effects that depend on the enhancer and the gene. Compartments are formed by a different mechanism and are not abolished by losing one CTCF site; and losing a boundary does not silence genes wholesale.
:::
:::

## Other genomes and other states

**Mitosis.** As cells enter mitosis, TADs and compartments disappear from Hi-C maps (Natalia Naumova, Job Dekker and colleagues, 2013) and are replaced by a uniform pattern consistent with chromosomes compacted into arrays of consecutive loops around a central axis, made by **condensin** — another loop extruder of the same SMC (structural maintenance of chromosomes) family as cohesin. Interphase organisation is re-established in each cell cycle.

**Bacteria.** Bacterial chromosomes are compacted by nucleoid-associated proteins and supercoiling ([[molecular-biology/dna-structure]]), and Hi-C of *Caulobacter crescentus* (Tung Le, Michael Laub and colleagues, 2013) revealed **chromosomal interaction domains** bounded by highly expressed genes, and an SMC complex loaded near the origin that aligns the two arms of the chromosome — loop extrusion in its simplest form.

**Other eukaryotes.** *Drosophila* has domains, but its boundaries are formed largely by other insulator proteins and coincide with transitions between active and inactive chromatin; CTCF-anchored loops of the mammalian kind are rare in flies. Plants have compartments and domain-like structures without CTCF, which they lack. TADs anchored by convergent CTCF sites appear to be a vertebrate elaboration of a more general tendency of chromatin to form domains.

::: application Reading genomes and diagnosing rearrangements with Hi-C
Because contact frequency falls steeply with distance along a chromosome, Hi-C reads are a powerful tool for genome assembly: contigs that contact each other frequently are neighbours, so their order and orientation along each chromosome can be inferred ([[genomics/sequencing-genomes]]). Most chromosome-scale assemblies produced since about 2017, including those of the Earth BioGenome Project, use it. The same property reveals structural rearrangements: a translocation appears in a Hi-C map as a block of strong contacts between two different chromosomes, and Hi-C has been used to detect balanced translocations and inversions in cancer genomes that short-read sequencing misses.
:::

::: history
Carl Rabl proposed in 1885, from salamander cells, that chromosomes keep their arrangement between divisions, and Theodor Boveri coined "chromosome territories" in 1909; the idea fell out of fashion until the experiments of the Cremer brothers and the advent of chromosome painting in the 1980s. Job Dekker's chromosome conformation capture (2002) turned the question into one of sequencing. Hi-C (2009) found compartments; TADs were reported in 2012; the loop map of 2014 revealed the CTCF orientation rule; the loop-extrusion model was formalised in 2015–2016; and degradation experiments in 2017 and single-molecule observation of extrusion in 2018–2019 established the role of cohesin and condensin as motors that fold the genome.
:::

::: summary
- Interphase chromosomes occupy territories; inactive chromatin associates with the nuclear lamina (LADs) and the nucleolus, active genes with the interior and with nuclear speckles.
- Hi-C ([[#def-hic]]) measures contact frequencies genome-wide as an average over cells. Contact probability falls as a power of genomic distance, $s^{-\alpha}$, with $\alpha \approx 1$ in human interphase, against $3/2$ for an ideal polymer ([[#prop-scaling]]).
- Chromatin segregates into A (active) and B (inactive) compartments ([[#def-compartments]]), probably by microphase separation; compartments persist without cohesin or CTCF.
- TADs and loops ([[#def-tad]]) are formed by cohesin-mediated loop extrusion, halted by CTCF bound in convergent orientation; extrusion length is limited by processivity $\lambda = v\tau$ ([[#prop-extrusion]]).
- Domains constrain enhancer–promoter communication and their disruption can cause disease, but removing loops genome-wide changes the expression of relatively few genes quickly: folding matters most for long-range and developmental regulation.
- Hi-C maps are population averages; individual nuclei vary. Hi-C is also used to scaffold genome assemblies and detect rearrangements.
:::

## Exercises

::: exercise Scaling exponent {level=1 check="1/8"}
If contact probability falls as $s^{-1.5}$, by what factor does it change when the genomic distance is multiplied by 4? Give an exact fraction.
::: solution
$4^{-1.5} = 1/8$.
:::
:::

::: exercise Estimating the exponent {level=1 check="1.1"}
In a Hi-C map, the mean contact frequency at 200 kb is 0.012 and at 2 Mb is 0.00095. Estimate the scaling exponent $\alpha$ to one decimal place.
::: solution
$\alpha = -\log_{10}(0.00095/0.012)/\log_{10}(10) = -\log_{10}(0.0792) = 1.10$.
:::
:::

::: exercise Processivity {level=1 check="0.1353"}
For a loop extruder with processivity $\lambda = 250$ kb, what is the probability that it extrudes at least 500 kb before release? Give four decimal places.
::: solution
$e^{-500/250} = e^{-2} = 0.1353$.
:::
:::

::: exercise Orientation of CTCF sites {level=2}
For each pair of CTCF motifs at the two anchors of a potential loop, written as arrows along the chromosome from left to right, predict whether loop extrusion would produce a stable loop: (a) → ←; (b) ← →; (c) → →; (d) ← ←.
::: solution
CTCF blocks a cohesin complex approaching from the side its motif "faces" (the motif's orientation points into the loop). (a) Convergent: both sites face inwards and stop extrusion from inside — stable loop. (b) Divergent: both face outwards; cohesin extruding from inside passes both — no stable loop between them (each may anchor loops to sites outside). (c) and (d) Tandem: one site blocks and the other does not; cohesin is stopped on one side only and continues on the other until it meets a different, suitably oriented site or is released — no loop between these two sites, though one may anchor a loop to a site beyond.
:::
:::

::: exercise Compartment switching {level=2}
During differentiation of embryonic stem cells into neurons, a 2-Mb region containing neuronal genes moves from the B to the A compartment. (a) What changes in its Hi-C contact pattern would reveal this? (b) What changes would you expect in its chromatin marks, replication timing and position in the nucleus? (c) Is the compartment switch the cause of activation?
::: solution
(a) Its contacts with other B regions decrease and contacts with A regions increase, so the sign of the first eigenvector of the correlation matrix changes for the bins in the region.

(b) Gain of active marks (H3K27ac, H3K4me3 at promoters, H3K36me3 over transcribed genes) and accessibility; loss of H3K9me2/3 or H3K27me3; earlier replication in S phase; detachment from the nuclear lamina and movement towards the nuclear interior.

(c) Not necessarily. Compartment identity tracks chromatin state, and the switch may follow activation by transcription factors rather than cause it; tethering experiments, which move a locus to the lamina artificially, show that position can contribute to silencing, but only for some genes. The order of events has to be determined by time-courses and perturbations.
:::
:::

::: exercise Cohesin degradation {level=2}
Six hours after cohesin is rapidly degraded in a human cell line, Hi-C shows loss of loops and of most TADs, and stronger compartmentalisation. RNA-seq shows a few hundred genes with significant changes in expression. (a) Why might compartments strengthen? (b) Give two reasons why so few genes change. (c) Which kinds of genes would you expect to be most affected?
::: solution
(a) Loop extrusion mixes chromatin along the fibre, bringing A and B regions within a domain into contact; without it, the phase-separation tendency of like chromatin dominates, and A–A and B–B contacts rise.

(b) Many genes are controlled by promoter-proximal elements that do not need long-range contacts; existing chromatin states and transcription-factor occupancy persist for some time after loss of folding; and cell populations may need longer, or cell divisions, before changes appear. The measurement at six hours captures only quick responses.

(c) Genes that depend on distal enhancers, especially those far away within large domains, and genes near boundaries whose insulation from enhancers in neighbouring domains is lost. Genes near clusters of strong enhancers (\"super-enhancers\") are good candidates.
:::
:::

::: exercise Reading a Hi-C map for a rearrangement {level=3}
In a Hi-C map of a tumour, contacts within chromosome 8 show the usual decay with distance except that a 5-Mb segment shows strong contacts with a 3-Mb segment of chromosome 14, decaying with distance from a point near one end of each segment. (a) What rearrangement does this suggest? (b) Why does the contact frequency decay from a point? (c) How could you confirm the breakpoint at base-pair resolution?
::: solution
(a) A translocation joining chromosome 8 to chromosome 14 (or an insertion of one segment into the other). The 8;14 translocation that places *MYC* next to the immunoglobulin heavy-chain locus in Burkitt lymphoma is a classic example of an oncogene activated by juxtaposition with strong enhancers.

(b) After the translocation, sequences on either side of the junction are physically linked on one chromosome. Contact frequency falls with linear distance along the new chromosome, so it is highest near the junction and decays away from it on both partners, as on a normal chromosome — producing the "butterfly" pattern pointing to the breakpoint.

(c) Sequence across the junction: long reads or targeted short reads spanning it, or PCR with primers on either side, will produce reads that contain both chromosome 8 and chromosome 14 sequence. The Hi-C reads themselves near the junction narrow down the breakpoint to the resolution of the restriction fragments.
:::
:::

::: exercise A boundary deletion in mice {level=3}
A 20-kb deletion removes a CTCF-bound boundary between a TAD containing strong limb enhancers and a TAD containing a gene not normally expressed in limbs. (a) Predict the effect on the Hi-C map and on expression in limb buds. (b) The mice develop normally, and expression of the second gene rises only twofold in limb buds. Give two explanations consistent with loop extrusion. (c) What additional experiment would test whether the boundary matters for robustness rather than for average expression?
::: solution
(a) The two TADs partly merge: contacts between them rise and insulation at the former boundary falls. The limb enhancers may contact and activate the second gene, leading to its ectopic expression in limb buds.

(b) Other CTCF sites nearby may provide partial insulation (boundaries are often clusters of sites); the second gene's promoter may be poorly compatible with these enhancers; the enhancers may still prefer their original target, which is closer or which competes successfully; or ectopic expression may be too low, or in too few cells, to affect development. A twofold rise in average expression may also reflect strong expression in a minority of cells.

(c) Test sensitised conditions: combine the deletion with a weakened allele of a gene in the pathway, or with environmental stress, or count variability of expression between individual cells and embryos (single-cell RNA-seq or quantitative imaging). If the boundary buffers against fluctuations, its loss should increase variability and the penetrance of defects under stress, even if average expression changes little.
:::
:::
