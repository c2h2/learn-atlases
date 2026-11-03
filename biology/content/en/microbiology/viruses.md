A litre of sea water from near the surface contains about ten billion virus particles, roughly ten for every bacterium. Viruses are the most abundant biological entities on Earth — estimates of their total number are of order $10^{31}$ — and they infect every kind of cellular organism, from bacteria and archaea to whales and trees. In the oceans they are thought to kill a substantial fraction of the bacterial population every day, releasing nutrients and steering the cycles of carbon and nitrogen. In the laboratory, bacterial viruses were the organisms with which molecular biology was founded: the nature of the gene, the genetic code, messenger RNA and gene regulation were all worked out with them. And viruses carry a large share of the world's genetic diversity — most of the genes found in viral genomes have no known relatives elsewhere.

Yet a virus is not a cell. It has no metabolism, makes no ATP and has no ribosomes; outside a host it is inert. This chapter describes what viruses are and how they are built, how they are classified, counted and grown, and how they replicate — first bacteriophages, then the viruses of animals and plants. It also describes the defences that cells mount against viruses, and the place of viruses in ecology and evolution. The genetics of phages is covered in [[genetics/microbial-genetics]], the λ switch in [[molecular-biology/bacterial-gene-regulation]], and viruses as agents of human disease in [Medicine Atlas: Viruses](/learn/medicine/lesson.php?c=microbiology&l=viruses).

## What is a virus?

::: definition Virus {#def-virus}
A **virus** is an infectious agent that replicates only inside living host cells, using the host's ribosomes, energy and precursors. Its extracellular form, the **virion**, consists of a genome of DNA *or* RNA (single- or double-stranded, linear or circular, in one or several segments) enclosed in a protein shell, the **capsid**; the genome and capsid together are the **nucleocapsid**. Many viruses of animals, and a few of other hosts, also have an **envelope**, a lipid membrane derived from a host membrane and studded with viral glycoproteins. A virion does not grow or divide: new virions are assembled from components made separately in the infected cell.
:::

Viruses range from circoviruses, with a single-stranded DNA genome of under 2,000 nucleotides encoding two proteins, to "giant viruses" of amoebae such as Mimivirus, with a 1.2 Mb genome encoding about a thousand proteins, including some translation factors and tRNAs (Didier Raoult and colleagues, 2004), and pandoraviruses, with genomes of up to about 2.5 Mb (Nadège Philippe and colleagues, 2013) — larger than those of some bacteria. Giant viruses can themselves be parasitised by smaller "virophages" such as Sputnik, which replicates only in amoebae co-infected by a giant virus (Bernard La Scola and colleagues, 2008).

Even simpler infectious agents exist. **Viroids**, discovered by Theodor Diener in 1971 as the cause of potato spindle tuber disease, are naked circular RNAs of about 250–400 nucleotides that encode no protein and are replicated by host enzymes. **Satellite** viruses and nucleic acids depend on a helper virus. **Prions**, which cause transmissible spongiform encephalopathies, contain no nucleic acid at all: they are misfolded forms of a host protein that template the misfolding of normal copies.

::: warning Are viruses alive?
The question has no factual answer; it depends on the definition of life ([[diversity-of-life/origin-of-life#def-life]]). Viruses evolve by natural selection, have genes and are made of the same molecules as cells; but they have no metabolism, and outside a cell they are as inert as a crystal (Wendell Stanley crystallised tobacco mosaic virus in 1935). A more useful view is that the infected cell — a "virocell" — is the living form of the virus, and the virion is its means of transmission, as a seed is for a plant. Two misconceptions are worth avoiding: antibiotics do not act on viruses, which have none of the targets of antibacterial drugs ([[microbiology/antimicrobials]]); and most viruses are not pathogens of humans — the great majority infect bacteria and archaea.
:::

## How virions are built

A small genome cannot encode many proteins, so Francis Crick and James Watson (1956) argued that capsids must be built from many copies of one or a few proteins, arranged symmetrically. Two kinds of symmetry are found.

In **helical** capsids, identical subunits are arranged in a helix around the genome, forming a rod (tobacco mosaic virus, about 300 nm long, with 2,130 copies of its coat protein) or a flexible filament (filamentous phages such as M13; the nucleocapsids of influenza and measles viruses inside their envelopes). The length of the capsid is set by the length of the genome.

In **icosahedral** capsids, subunits are arranged on the surface of an icosahedron, the regular solid with 20 triangular faces, 12 vertices and five-, three- and two-fold axes of symmetry. An icosahedron can be built from 60 identical subunits, three to a face, each in an identical environment. Larger capsids use more subunits, which can no longer all be in identical positions.

::: proposition Quasi-equivalence and triangulation number {#prop-tnumber}
In the theory of Donald Caspar and Aaron Klug (1962), an icosahedral capsid is built from $60T$ protein subunits in slightly different ("quasi-equivalent") environments, arranged as 12 **pentamers** at the vertices and $10(T - 1)$ **hexamers** elsewhere. The **triangulation number** takes only the values

$$
T = h^2 + hk + k^2, \qquad h, k = 0, 1, 2, \dots,
$$ {#eq-tnumber}

that is $T = 1, 3, 4, 7, 9, 12, 13, \dots$, where $(h, k)$ are the steps on a hexagonal lattice from one five-fold vertex to the next.
:::

::: proof
Imagine the capsid drawn on a flat hexagonal lattice of capsomer positions, then folded into a closed shell. Euler's formula for a closed polyhedron, $V - E + F = 2$, shows that a closed shell tiled by hexagons and pentagons needs exactly 12 pentagons, however many hexagons it has, and icosahedral symmetry puts them at the 12 vertices. Each triangular face of the icosahedron joins three vertices, which must lie on lattice points, so an edge of the face is a lattice vector $h\mathbf a + k\mathbf b$, where $\mathbf a$ and $\mathbf b$ are unit vectors at 60° joining neighbouring lattice points. Its squared length is $h^2 + 2hk\,(\mathbf a\cdot\mathbf b) + k^2 = h^2 + hk + k^2 = T$, and the area of an equilateral face is proportional to the square of its edge. The smallest shell ($h = 1$, $k = 0$, $T = 1$) has three subunits per face, so a face $T$ times larger holds $3T$, and the 20 faces hold $60T$. The 12 pentamers account for 60 subunits, and the remaining $60(T - 1)$ form $10(T - 1)$ hexamers.
:::

::: example Counting capsid proteins {#ex-capsid}
(a) How many subunits and hexamers make up capsids with $(h, k) = (1, 1)$ and $(2, 1)$? (b) The head of phage HK97 has $T = 7$, but one of its vertices is occupied by a portal (through which the DNA is packaged) instead of a pentamer. How many major capsid protein subunits does it contain? (c) Why would a virus use a $T = 3$ capsid of 180 subunits rather than a $T = 1$ capsid of 60 larger subunits?
::: solution
(a) $(1, 1)$: $T = 3$, 180 subunits as 12 pentamers and 20 hexamers. $(2, 1)$: $T = 7$, 420 subunits as 12 pentamers and 60 hexamers.

(b) $420 - 5 = 415$ subunits: 11 pentamers and 60 hexamers.

(c) A shell of given size built from more, smaller subunits needs a smaller gene for the capsid protein, leaving more of the genome for other functions; a single small gene repeated many times is the most economical use of limited coding capacity, which was Crick and Watson's original argument. Assembly from many identical subunits is also self-correcting: misfolded subunits are excluded.
:::
:::

Many bacteriophages, including T4 and λ, combine an icosahedral (or elongated icosahedral) **head** with a helical **tail**, often with a contractile sheath, a baseplate and tail fibres that recognise the host. The double-stranded DNA of these tailed phages is packed into a preformed head by an ATP-driven motor at the portal, against an internal pressure measured in tens of atmospheres (Douglas Smith, Carlos Bustamante and colleagues, 2001, with phage φ29). The DNA in a phage head is close to the density of a crystal.

::: example How tightly is DNA packed? {#ex-packing}
Phage λ packages a 48.5 kb double-stranded DNA genome into a head with an internal radius of about 27 nm. Taking 650 Da per base pair, estimate the concentration of DNA inside the head in mg mL⁻¹, and compare with the DNA concentration in an *E. coli* nucleoid (roughly 10–20 mg mL⁻¹).
::: solution
Mass of DNA: $48{,}502\times650 = 3.15\times10^7$ Da, which is $3.15\times10^7/6.022\times10^{23} = 5.2\times10^{-17}$ g. Volume of a sphere of radius 27 nm: $\tfrac43\pi(27\times10^{-7}\ \mathrm{cm})^3 = 8.2\times10^{-17}$ cm³ (mL). Concentration: $5.2\times10^{-17}/8.2\times10^{-17} \approx 0.63$ g mL⁻¹ $= 630$ mg mL⁻¹ — some 30–60 times denser than in the nucleoid, and approaching the packing of DNA in a liquid crystal. The stored energy helps eject the DNA into the host at infection.
:::
:::

Envelopes are acquired as the nucleocapsid buds through a host membrane — the plasma membrane for influenza virus and HIV, internal membranes for herpesviruses and coronaviruses. The envelope glycoproteins bind receptors on new host cells and mediate fusion of the viral and cellular membranes. Envelopes are fragile: detergents, alcohol and drying inactivate enveloped viruses much more readily than naked ones.

## Classifying viruses

Viruses do not share any gene that could be used, like 16S rRNA, to place all of them on one tree, and they almost certainly have several independent origins. They have been classified in two complementary ways.

David Baltimore (1971) grouped viruses by the nature of their genome and the route by which it gives rise to messenger RNA, the one molecule every virus must make to be translated by host ribosomes:

| class | genome | route to mRNA | examples |
|---|---|---|---|
| I | double-stranded DNA | transcription by host or viral RNA polymerase | phages T4 and λ, herpesviruses, poxviruses, giant viruses |
| II | single-stranded DNA | converted to dsDNA, then transcribed | phage φX174, M13, parvoviruses, circoviruses |
| III | double-stranded RNA | transcribed by a viral RNA-dependent RNA polymerase inside the capsid | rotaviruses, phage φ6 |
| IV | single-stranded RNA, positive sense | the genome *is* mRNA, translated directly | poliovirus, coronaviruses, tobacco mosaic virus, phage MS2 |
| V | single-stranded RNA, negative sense | transcribed by a viral RdRp carried in the virion | influenza, measles and rabies viruses |
| VI | single-stranded RNA, reverse-transcribing | reverse-transcribed to DNA, integrated, transcribed | retroviruses such as HIV |
| VII | double-stranded DNA, reverse-transcribing | transcribed; replicated through an RNA intermediate | hepatitis B virus, cauliflower mosaic virus |

The Baltimore class determines what a virus must bring with it. A positive-sense RNA genome is infectious on its own when introduced into a cell, because ribosomes can translate it immediately; a negative-sense or double-stranded RNA genome is not, because the cell has no enzyme to transcribe it, so these viruses package their own RNA-dependent RNA polymerase in the virion.

The International Committee on Taxonomy of Viruses (ICTV) maintains a formal taxonomy with ranks from **realm** down to species, and since 2021 has been converting species to binomial names (such as *Tobamovirus tabaci* for tobacco mosaic virus). Realms group viruses that share a "hallmark" gene inferred to descend from a common ancestor: *Riboviria*, for example, contains RNA viruses with an RNA-dependent RNA polymerase (and retroviruses with their reverse transcriptase), *Duplodnaviria* the tailed phages and herpesviruses, whose major capsid proteins share the "HK97 fold", and *Varidnaviria* viruses with a "double jelly-roll" capsid protein, from adenoviruses to giant viruses. The deep relationships these imply — herpesviruses of animals related to tailed phages of bacteria — were discovered from protein structures, which are conserved long after sequence similarity has vanished.

## Counting and growing viruses

Viruses are grown in host cells: phages in bacterial cultures, animal viruses in cultured animal cells, plant viruses in plants or plant cells. Félix d'Herelle (1917) introduced the **plaque assay**, still the standard method of counting infectious phages: a dilution of phage is mixed with an excess of host bacteria in soft agar and poured over a plate. Each infectious particle infects a cell, its progeny infect neighbours, and after incubation each original particle has produced a clear zone, a **plaque**, in the opaque lawn of bacteria. Counts are expressed as **plaque-forming units** (PFU) and calculated exactly as plate counts are ([[microbiology/microbial-world#prop-plate-count]]). Animal viruses that kill cultured cells are counted by plaque assays on cell monolayers.

Not every particle forms a plaque. Comparing particle counts (by electron microscopy or flow cytometry) with PFU gives a **particle-to-PFU ratio**, near 1 for many phages but often 100 or more for animal viruses, because many particles are defective or fail to complete infection.

When phages are mixed with bacteria, which cells get how many phages is a matter of chance.

::: proposition Multiplicity of infection {#prop-moi}
If phages are added to bacteria at a **multiplicity of infection** $m$ (the ratio of infectious particles to cells) and adsorb independently and at random, the number of phages adsorbed by a given cell is Poisson-distributed with mean $m$. The fractions of cells infected by none, exactly one, and more than one phage are

$$
P_0 = e^{-m}, \qquad P_1 = me^{-m}, \qquad P_{\ge 2} = 1 - e^{-m} - me^{-m}.
$$ {#eq-moi}
:::

This is the same Poisson reasoning as for cells in wells ([[microbiology/microbial-world#prop-mpn]]); the analogy is exact, because each phage "chooses" one of a very large number of cells independently.

::: widget plot
f: exp(-x); x*exp(-x); 1 - exp(-x) - x*exp(-x)
x: 0, 6
y: 0, 1
labels: P_0\ \text{uninfected}; P_1\ \text{singly infected}; P_{\ge2}\ \text{multiply infected}
vlines: 1
caption: Fractions of uninfected, singly and multiply infected cells against the multiplicity of infection $m$, from the Poisson distribution. At $m = 1$ (vertical line) 37 % of cells escape infection, 37 % receive one phage and 26 % two or more. The singly infected fraction is greatest at $m = 1$; to infect 99 % of cells you need $m = \ln 100 = 4.6$, and then almost all infected cells carry several phages.
:::

### The one-step growth curve

Emory Ellis and Max Delbrück (1939) devised the experiment that defined the phage life cycle. Bacteria are infected at low multiplicity for a few minutes, unadsorbed phages are removed or the culture is diluted so much that progeny cannot readily infect new cells, and samples are plated over time. For a period, the **latent period**, the PFU count stays constant — each infected cell gives one plaque. Then it rises abruptly, in one step, as the cells lyse and release their progeny, and levels off. The ratio of the final to the initial count is the average **burst size**. If cells are artificially broken open at intervals (with chloroform), no infectious phages are found at all for the first part of the latent period — the **eclipse**, when the infecting virion has been taken apart and its progeny not yet assembled.

::: example A one-step growth experiment {#ex-burst}
*E. coli* at $2\times10^8$ cells mL⁻¹ is infected with phage T4 at $m = 0.05$. After adsorption the culture is diluted $10^{-4}$ into fresh medium at 37 °C. Samples plated before 25 min give $1.0\times10^3$ PFU mL⁻¹; samples after 35 min give $2.0\times10^5$ PFU mL⁻¹. (a) How many cells were infected, and how many by more than one phage? (b) What is the burst size? (c) Why was the culture infected at low multiplicity and then diluted?
::: solution
(a) $P_0 = e^{-0.05} = 0.951$, so $4.9\,\%$ of cells are infected: $0.049\times2\times10^8 = 9.8\times10^6$ infected cells mL⁻¹ before dilution, or $\approx 10^3$ mL⁻¹ after, matching the plateau count of infective centres. The fraction infected by two or more is $1 - 0.951 - 0.05\times0.951 = 0.0012$, about 2.5 % of infected cells.

(b) Burst size $= 2.0\times10^5/1.0\times10^3 = 200$ phages per infected cell.

(c) Low multiplicity ensures that most infected cells received one phage, so the experiment measures the output of single infections. Dilution ensures that released progeny rarely meet uninfected cells during the experiment, so a second round of infection does not blur the single step.
:::
:::

## Bacteriophage replication

### The lytic cycle

The **lytic cycle** of a virulent phage such as T4 has five stages:

1. **Adsorption.** Tail fibres bind specific receptors on the cell surface — lipopolysaccharide or the outer membrane protein OmpC for T4, the maltose porin LamB for λ, the F pilus for MS2 and M13. The receptor determines the host range of the phage.
2. **Penetration.** The tail sheath of T4 contracts, driving the inner tube through the envelope, and the DNA is injected; the capsid stays outside. That only the DNA enters was the point of Alfred Hershey and Martha Chase's experiment of 1952, with ³²P-labelled DNA and ³⁵S-labelled protein ([[genetics/genes-and-mutation]]).
3. **Synthesis.** "Early" phage genes, transcribed by the host RNA polymerase, take over the cell: in T4 they degrade the host chromosome, modify the polymerase, and encode enzymes for phage DNA replication. "Middle" and "late" genes encode capsid proteins and lysis proteins. T4 DNA contains hydroxymethylcytosine instead of cytosine, glucosylated, which protects it from the phage's own nucleases and from many host restriction enzymes.
4. **Assembly.** Heads, tails and fibres are assembled separately and joined; DNA is packaged into heads by the portal motor.
5. **Release.** At a programmed time, **holins** form holes in the cytoplasmic membrane, letting **endolysins** reach and degrade the peptidoglycan; in Gram-negative hosts, **spanins** then fuse the inner and outer membranes, and the cell bursts.

For T4 at 37 °C the latent period is about 25 minutes and the burst size about 100–200. Small RNA and single-stranded DNA phages lyse their hosts with a single protein that inhibits peptidoglycan synthesis. Filamentous phages such as M13 do not kill their hosts at all: progeny are extruded through the envelope continuously, and the infected cells keep growing, more slowly — a **chronic** infection.

### Lysogeny

**Temperate** phages can choose. After infection, phage λ may enter the lytic cycle or establish **lysogeny**: its genome is integrated into the host chromosome, at a specific site between the *gal* and *bio* operons, by site-specific recombination catalysed by the phage integrase, and is replicated as part of it, as a **prophage**. The repressor CI keeps the lytic genes off, and also makes the lysogen immune to superinfection by λ. The decision between lysis and lysogeny, and its maintenance, are controlled by the genetic switch described in [[molecular-biology/bacterial-gene-regulation]]: high multiplicity of infection and poor growth conditions favour lysogeny. When the host's DNA is damaged, RecA activated in the SOS response stimulates self-cleavage of CI, and the prophage is **induced**: it excises and enters the lytic cycle, abandoning a doomed host.

André Lwoff and Antoinette Gutmann (1950) proved that lysogeny is a stable heritable state by following single cells of *Bacillus megaterium* through many divisions in microdrops, and showed that lysogens could be induced by ultraviolet light. Prophages are common: many bacterial genomes contain several, intact or decayed, and they often carry genes that change the host's phenotype, a phenomenon called **lysogenic conversion**. Some of the most important bacterial toxins are encoded by prophages: diphtheria toxin (on corynephage β; Victor Freeman, 1951), cholera toxin (on the filamentous phage CTXφ) and the Shiga toxins of enterohaemorrhagic *E. coli*. Prophages can also mediate generalised and specialised transduction ([[genetics/microbial-genetics#def-transduction]]).

::: quiz
A culture of *E. coli* lysogenic for λ is exposed to ultraviolet light. An hour later the culture has cleared and contains free λ phages. A non-lysogenic culture treated the same way does not clear. Which explanation is correct?
- [ ] Ultraviolet light kills the bacteria directly, releasing phages that were in the medium.
- [x] DNA damage triggers the SOS response; activated RecA stimulates cleavage of the CI repressor, and the prophage is induced into the lytic cycle.
- [ ] Ultraviolet light mutates the prophage into a virulent form.
- [ ] Lysogens are more sensitive to ultraviolet light because the prophage absorbs it.
::: solution
The non-lysogenic control shows that the clearing is not due to direct killing at this dose. Induction of the prophage by DNA damage, through RecA-stimulated autocleavage of CI, is the normal response: the prophage leaves a host that may not survive. This is why many prophages are induced by antibiotics that damage DNA.
:::
:::

## Defence and counter-defence

Bacteria and archaea are under constant attack by viruses, and their genomes devote considerable space to defence:

- **Receptor changes.** Mutations that alter or mask the receptor give resistance, often at a cost (if the receptor is a nutrient transporter); capsules can hide receptors.
- **Restriction–modification.** Restriction enzymes cut DNA at specific sequences unless they are methylated by the cell's own methyltransferase, so incoming phage DNA is often cut before it can be expressed ([[molecular-biology/molecular-tools#def-restriction]]).
- **Abortive infection.** Infected cells commit suicide before the phage can complete its cycle, protecting their clonal relatives.
- **CRISPR–Cas adaptive immunity.** Short fragments ("spacers") of invading DNA are inserted between the repeats of a CRISPR array in the host chromosome by the Cas1–Cas2 integrase. The array is transcribed and processed into short CRISPR RNAs, each of which guides a Cas nuclease to cut DNA (or RNA) carrying the matching sequence. A cell that survives infection thus records a memory of it, inherited by its descendants. That the spacers match phage sequences was noticed in 2005 (Francisco Mojica and colleagues; Christine Pourcel and colleagues; Alexander Bolotin and colleagues), and Rodolphe Barrangou, Philippe Horvath and colleagues (2007) showed, with *Streptococcus thermophilus* used in yoghurt starter cultures, that acquiring a spacer confers resistance and losing it removes resistance. CRISPR systems are found in a majority of archaeal genomes and a substantial minority of bacterial ones. Cas9 and other CRISPR nucleases became genome-editing tools ([[molecular-biology/molecular-tools#def-cas9]]).

Systematic searches since 2018 (Shany Doron, Rotem Sorek and colleagues, among others) have found dozens of further defence systems, many clustered in "defence islands", some with components evolutionarily related to animal innate immune proteins. Phages counter each defence: they mutate their receptor-binding proteins, modify their DNA bases, and carry **anti-CRISPR** proteins that inhibit Cas proteins (Joe Bondy-Denomy, Alan Davidson and colleagues, 2013). The arms race between phages and hosts is one of the main drivers of the diversity of both.

## Viruses of animals and plants

Animal viruses go through the same stages as phages — attachment, entry, uncoating, synthesis, assembly, release — but in eukaryotic cells, with nuclei, membranes and an endomembrane system that they exploit.

**Attachment** depends on specific receptors, which determine which cells and species a virus can infect. HIV binds CD4 and a chemokine receptor (CCR5 or CXCR4) on certain immune cells; SARS-CoV-2 binds the enzyme ACE2. **Entry** of enveloped viruses is by fusion of the viral envelope with the plasma membrane, or with the membrane of an endosome after endocytosis, triggered by receptor binding or by the low pH of the endosome. Naked viruses enter by endocytosis and penetrate or disrupt the endosomal membrane. **Uncoating** releases the genome.

**Synthesis** depends on the Baltimore class. Most DNA viruses replicate in the nucleus, using host RNA polymerase II for transcription; poxviruses, which replicate in the cytoplasm, carry their own transcription machinery. Positive-sense RNA viruses such as poliovirus are translated into a large polyprotein that is cut by viral proteases into mature proteins, including the RNA-dependent RNA polymerase, which copies the genome via a negative-sense intermediate on remodelled membranes in the cytoplasm. Negative-sense RNA viruses bring their polymerase with them. **Retroviruses** carry **reverse transcriptase** (discovered by Howard Temin and Satoshi Mizutani and by David Baltimore in 1970), which copies their RNA into double-stranded DNA; the viral integrase inserts this DNA into a host chromosome as a **provirus**, which is then transcribed by the host polymerase like a cellular gene. Retroviruses that infected the germ line of our ancestors have left about 8 % of the human genome as endogenous retroviral sequences.

**Release** of enveloped viruses is by budding, which need not kill the cell; naked viruses are usually released when the cell dies and lyses. Some viruses establish **latent** infections — herpesviruses persist as episomes in neurons or lymphocytes for the life of the host, with occasional reactivation — and some, by integrating or by expressing proteins that override cell-cycle controls, can contribute to cancer.

**Plant viruses** face the plant cell wall. They enter through wounds, often made by feeding insects, nematodes or fungi that transmit them, and move from cell to cell through plasmodesmata with the help of viral **movement proteins**, then through the phloem to the rest of the plant. Most are positive-sense RNA viruses. Plants defend themselves against them largely by RNA silencing, which degrades double-stranded viral RNA, and viruses carry suppressors of silencing.

### Error-prone replication

RNA-dependent RNA polymerases and reverse transcriptases lack proofreading, and RNA viruses have mutation rates of roughly $10^{-6}$ to $10^{-4}$ per nucleotide per cell infection (Rafael Sanjuán and colleagues, 2010), many orders of magnitude higher than those of cellular DNA genomes ([[genetics/genes-and-mutation#def-mutation-rate]]). Combined with large populations and short generation times, this makes RNA viruses extraordinarily fast-evolving, which is why vaccines against influenza must be updated and why drugs against HIV are given in combination ([[microbiology/antimicrobials]]).

::: proposition Mutations per genome {#prop-genome-mutation}
If a genome of length $L$ is copied with a probability $\mu$ of error at each site, independently, the number of new mutations per genome copy is approximately Poisson with mean $U = \mu L$, and the probability that a copy carries no new mutation is

$$
P(\text{no mutation}) = (1 - \mu)^L \approx e^{-U}.
$$ {#eq-genome-mutation}
:::

::: example How faithful is an RNA virus? {#ex-mutation}
(a) A positive-sense RNA virus with a 10 kb genome has $\mu = 10^{-4}$ per nucleotide per replication. What fraction of progeny genomes carries at least one new mutation? (b) A coronavirus has a 30 kb genome, but its polymerase complex includes a proofreading exonuclease that lowers the error rate to about $10^{-6}$. What is $U$? (c) Explain why proofreading may have been a precondition for the evolution of such large RNA genomes.
::: solution
(a) $U = 10^{-4}\times10^4 = 1$, so $1 - e^{-1} = 63\,\%$ of progeny carry at least one new mutation.

(b) $U = 10^{-6}\times3\times10^4 = 0.03$; 97 % of progeny are mutation-free.

(c) Since most mutations in compact viral genomes are harmful, a genome with $U$ well above 1 produces mostly defective progeny, and there is a maximum genome size, inversely proportional to the error rate, beyond which selection cannot maintain the genetic information — Manfred Eigen's **error threshold** ([[diversity-of-life/origin-of-life#prop-error-threshold]]). Without proofreading, a 30 kb genome would have $U \approx 3$ at $\mu = 10^{-4}$ and only about 5 % of progeny would be mutation-free; the coronavirus exonuclease, unique among RNA viruses, is thought to be what allowed their unusually long genomes.
:::
:::

::: widget plot
f: exp(-u*x); 1 - exp(-u*x)
x: 0, 50
y: 0, 1
sliders: u=0.1:0.001:1:0.001
labels: e^{-\mu L}\ \text{(no new mutation)}; \text{at least one}
caption: Fraction of progeny genomes with no new mutation, $e^{-\mu L}$, against genome length $L$ in kilobases, for a per-site error rate $\mu$ set by the slider in units of $10^{-3}$ per nucleotide (so the slider value 0.1 means $10^{-4}$). At $10^{-4}$ a 10 kb genome copies itself perfectly only 37 % of the time and a 30 kb genome only 5 %; slide down towards $10^{-6}$ (0.001) and long genomes become copyable — the advantage of proofreading.
:::

## Viruses in ecology and evolution

In the sea, viruses lyse bacteria and phytoplankton on a vast scale; by releasing the contents of cells as dissolved organic matter that other bacteria consume, they divert carbon and nutrients from larger organisms — the **viral shunt** ([[microbiology/microbial-ecology]]). Because a phage spreads fastest when its host is abundant, viral lysis tends to cut back whichever host is most successful ("kill the winner"), which may help maintain microbial diversity. Viruses also move genes: transduction and lysogenic conversion are important routes of horizontal transfer ([[microbiology/microbial-diversity#def-hgt]]), and cyanophages carry genes for photosynthetic proteins that keep their hosts' photosystems working during infection.

The origin of viruses is unresolved. Three classical hypotheses — that viruses descend from pre-cellular replicators (virus first), from fragments of cellular genomes that became infectious (escape), or from parasitic cells that lost most of their genes (reduction) — are not mutually exclusive, and different virus groups may have arisen in different ways. The sharing of hallmark proteins such as capsid folds across viruses of all three domains of life suggests that some virus lineages are very ancient, perhaps as old as cells themselves.

::: application Viruses as tools and treatments
Phages were used to treat bacterial infections soon after their discovery (d'Herelle, 1919), and phage therapy remained in use in parts of Eastern Europe; with the rise of antibiotic resistance it is being re-examined in regulated clinical studies ([Medicine Atlas: Antimicrobials](/learn/medicine/lesson.php?c=microbiology&l=antimicrobials)). Phage display (George Smith, 1985) evolves antibodies and peptides by displaying them on phage surfaces. Modified, replication-defective viruses deliver genes in gene therapy and vaccines, and the enzymes of viruses — reverse transcriptase, T7 RNA polymerase, phage recombinases and integrases — are standard reagents in molecular biology ([[molecular-biology/molecular-tools]], [[biotechnology]]). All such work is regulated: research that could increase the transmissibility or virulence of an agent is subject to special oversight, and work with human pathogens is done only in appropriately contained laboratories.
:::

::: history
Dmitri Ivanovsky (1892) and Martinus Beijerinck (1898) showed that the agent of tobacco mosaic disease passes through filters that retain bacteria, and Friedrich Loeffler and Paul Frosch (1898) did the same for foot-and-mouth disease of cattle, the first animal virus. Frederick Twort (1915) and Félix d'Herelle (1917) discovered bacteriophages. Wendell Stanley crystallised tobacco mosaic virus (1935), Frederick Bawden and Norman Pirie showed that it contains RNA (1937), and Helmut Ruska and colleagues imaged it in the electron microscope (1939). Ellis and Delbrück's one-step growth curve (1939) launched the "phage group", and Hershey and Chase (1952) showed that phage DNA carries the genetic information. Lwoff described lysogeny (1950), Caspar and Klug the principles of capsid structure (1962), and Temin and Baltimore discovered reverse transcriptase (1970). Walter Fiers's group sequenced the genome of RNA phage MS2 (1976), and Frederick Sanger's group that of the DNA phage φX174 (1977) — the first complete genomes of any kind.
:::

::: summary
- A virus replicates only inside host cells; the virion is a DNA or RNA genome in a protein capsid, sometimes with a host-derived envelope. Genomes range from under 2 kb to about 2.5 Mb; viroids, satellites and prions are simpler still.
- Capsids are helical or icosahedral; icosahedral capsids contain $60T$ subunits as 12 pentamers and $10(T - 1)$ hexamers, $T = h^2 + hk + k^2$. Tailed phages pack DNA to near-crystalline density.
- The Baltimore classes (I–VII) are defined by genome type and the route to mRNA; ICTV realms group viruses by hallmark genes and protein folds.
- Phages are counted as plaque-forming units; infection is Poisson with mean $m$ (the multiplicity). One-step growth curves reveal the latent period, eclipse and burst size.
- The lytic cycle runs through adsorption, injection, synthesis, assembly and lysis by holins, endolysins and spanins; temperate phages such as λ integrate as prophages, are induced by DNA damage, and can convert their hosts (toxin genes).
- Hosts defend with receptor changes, restriction–modification, abortive infection, CRISPR–Cas and many other systems; phages counter with modifications and anti-CRISPRs.
- Animal viruses attach to specific receptors, enter by fusion or endocytosis, and replicate according to their class; retroviruses integrate as proviruses. RNA viruses have mutation rates of $10^{-6}$–$10^{-4}$, giving $U = \mu L$ mutations per genome copy and an error threshold on genome size.
- Viruses shape microbial ecology (viral shunt, kill the winner) and evolution (gene transfer); their origins are multiple and unresolved.
:::

## Exercises

::: exercise A titre {level=1 check="3.4e9"}
0.1 mL of a $10^{-7}$ dilution of a phage lysate gives 34 plaques. What is the titre of the lysate in PFU per mL?
::: solution
$34/(0.1\times10^{-7}) = 3.4\times10^{9}$ PFU mL⁻¹.
:::
:::

::: exercise Triangulation numbers {level=1}
Which of the following are possible triangulation numbers: 2, 3, 4, 5, 7, 13, 16? For each possible value, give $(h, k)$ and the number of subunits.
::: solution
$T = h^2 + hk + k^2$: 3 = (1, 1), 180 subunits; 4 = (2, 0), 240; 7 = (2, 1), 420; 13 = (3, 1), 780; 16 = (4, 0), 960. The values 2 and 5 cannot be written in this form, so they are impossible.
:::
:::

::: exercise Baltimore classes {level=1}
Assign each virus to its Baltimore class and say what enzyme, if any, must be packaged in the virion: (a) a virus whose purified RNA genome, injected into a cell, starts an infection; (b) a virus with a negative-sense RNA genome; (c) a virus with a single-stranded RNA genome and a virion-associated DNA polymerase activity; (d) a virus with a circular single-stranded DNA genome.
::: solution
(a) Class IV (positive-sense RNA): no enzyme needed, the genome is mRNA. (b) Class V: an RNA-dependent RNA polymerase (transcriptase) must be packaged, since the cell has none. (c) Class VI (retrovirus): reverse transcriptase, with integrase. (d) Class II: no enzyme needed; host DNA polymerase makes the complementary strand.
:::
:::

::: exercise Multiplicity {level=2 check="2.3"}
What multiplicity of infection is needed to infect 90 % of cells (one decimal place)? What fraction of the infected cells then carries two or more phages?
::: solution
$1 - e^{-m} = 0.9$, so $m = \ln 10 = 2.3$. $P_1 = 2.3\times0.1 = 0.23$, so $P_{\ge2} = 0.9 - 0.23 = 0.67$; among infected cells, $0.67/0.9 = 74\,\%$ are multiply infected.
:::
:::

::: exercise A burst {level=2 check="150"}
Bacteria are infected at low multiplicity, diluted, and sampled. Before lysis, plating gives 400 PFU per 0.1 mL; after lysis, a $10^{-2}$ dilution gives 600 PFU per 0.1 mL. What is the burst size?
::: solution
Before: $4\times10^3$ PFU mL⁻¹ (infected centres). After: $600/(0.1\times10^{-2}) = 6\times10^5$ PFU mL⁻¹. Burst size $= 6\times10^5/4\times10^3 = 150$.
:::
:::

::: exercise Mutation-free progeny {level=2 check="0.74"}
A virus has a genome of 15 kb and a per-site error rate of $2\times10^{-5}$ per replication. What fraction of progeny genomes carries no new mutation (two decimal places)?
::: solution
$U = 2\times10^{-5}\times1.5\times10^4 = 0.3$, and $e^{-0.3} = 0.74$.
:::
:::

::: exercise Lysis or lysogeny {level=2}
Predict whether λ will tend towards lysis or lysogeny, and why, in each case: (a) infection of well-fed cells at a multiplicity of 0.1; (b) infection of starved cells at a multiplicity of 10; (c) a lysogen treated with a DNA-damaging antibiotic; (d) infection by a λ mutant lacking the *cI* gene.
::: solution
(a) Lysis is favoured: well-fed cells have active proteases that degrade CII, the activator of *cI* transcription, and a single phage genome gives less CII. (b) Lysogeny: starvation reduces protease activity (via cAMP signalling), and many phage genomes per cell produce more CII. Biologically, when hosts are scarce relative to phages, lying low in a host is better than releasing progeny that find no new cells. (c) Induction: RecA activated by DNA damage stimulates CI cleavage and the prophage enters the lytic cycle. (d) Lysis always: without CI the phage cannot establish or maintain repression; such mutants make clear plaques instead of the turbid plaques of wild-type λ.
:::
:::

::: exercise CRISPR records {level=2}
A strain of *Streptococcus thermophilus* is challenged with phage, and resistant survivors are isolated. Sequencing shows that each has acquired one new spacer at the leader end of its CRISPR array, and each spacer matches a different part of the phage genome. (a) Explain why the new spacers are at the leader end. (b) Predict the effect of deleting the new spacer from one resistant strain. (c) Phage mutants that escape the resistant strain are found to have point mutations. Where would you expect them to be?
::: solution
(a) New spacers are inserted next to the leader sequence, which contains the promoter, so arrays are chronological records, with the most recent spacer first. (b) The strain would become sensitive to the phage again (as in Barrangou and colleagues' experiment), showing that the spacer causes the resistance. (c) In the protospacer matched by the spacer, or in the short protospacer-adjacent motif (PAM) next to it, which the Cas nuclease requires; mismatches there prevent cleavage.
:::
:::

::: exercise Interpreting a one-step curve {level=3}
In a one-step growth experiment with phage T4 at 37 °C, the infective-centre count is constant at $5\times10^3$ PFU mL⁻¹ up to 22 min and rises to $5.5\times10^5$ PFU mL⁻¹ by 32 min. Parallel samples treated with chloroform (which lyses cells) show no infectious phages until 12 min, then a rise to $5.5\times10^5$ by 30 min. (a) What are the latent period, the eclipse period and the burst size? (b) Why does the chloroform-treated count fall below the untreated count at early times? (c) How would the curve change at 30 °C, and why?
::: solution
(a) Latent period about 22 min (time to the first rise without chloroform); eclipse about 12 min (time until the first infectious progeny appear inside cells); burst size $5.5\times10^5/5\times10^3 = 110$. (b) Without chloroform, each intact infected cell forms one plaque whatever is inside it; with chloroform, cells are broken open, and in the eclipse there is no infectious phage inside them — the infecting particle has been disassembled — so the count is near zero. (c) Both periods would lengthen and the burst size might change, because every step of phage replication depends on host metabolism, which slows at lower temperature (roughly halving in rate for each 10 °C, [[microbiology/microbial-growth]]).
:::
:::

::: exercise Virus and host abundance {level=3}
In a coastal sample, flow cytometry gives $1.2\times10^7$ virus-like particles and $1.5\times10^6$ bacterial cells per mL. Over 24 h, in incubations from which new viruses are removed, viral numbers recover to $0.9\times10^7$ per mL after an initial reduction to $0.3\times10^7$. (a) What is the virus-to-bacterium ratio? (b) Estimate the viral production rate. (c) If the average burst size is 30, how many bacteria are lysed per mL per day, and what fraction of the bacterial standing stock is this? (d) What uncertainties affect this estimate?
::: solution
(a) $1.2\times10^7/1.5\times10^6 = 8$. (b) $(0.9 - 0.3)\times10^7 = 6\times10^6$ viruses mL⁻¹ d⁻¹. (c) $6\times10^6/30 = 2\times10^5$ bacteria lysed mL⁻¹ d⁻¹, which is $2\times10^5/1.5\times10^6 = 13\,\%$ of the standing stock per day. (d) The burst size in nature is uncertain and varies widely between hosts; flow cytometry counts virus-like particles, including some that are not infectious and some that are not viruses (membrane vesicles, gene transfer agents); manipulating the sample may stimulate or suppress infection and induce prophages; and the production of viruses that infect eukaryotic phytoplankton is included in the count.
:::
:::
