For roughly the first two billion years of life's history there were no organisms but bacteria and archaea, and they remain the most abundant, the most widespread and the most metabolically versatile forms of life. Estimates of the number of prokaryotic cells on Earth range from about $10^{30}$ (Hans-Curt Flemming and Stefan Wuertz, 2019) to $4$–$6\times10^{30}$ (William Whitman, David Coleman and William Wiebe, 1998), most of them in soils, sediments and the deep subsurface. Their combined biomass is second only to that of plants: in Yinon Bar-On, Rob Phillips and Ron Milo's census (2018), of roughly 550 gigatonnes of carbon in all living things, plants hold about 450, bacteria about 70 and archaea about 7 — against about 12 for fungi, 4 for protists and 2 for all animals. Bacteria and archaea fix nitrogen, make — as free-living cyanobacteria and as the plastids of algae and plants, which are captured cyanobacteria — essentially all of the world's oxygen, drive the cycles of carbon, nitrogen and sulfur, and live in every environment where liquid water exists, from boiling springs to the pores of rocks kilometres below the surface.

This chapter surveys the two prokaryotic domains defined in [[diversity-of-life/classifying-life#def-domains]]: their cell structure, their extraordinary range of metabolism, and their major lineages, with the current names of their phyla. It then introduces the quantitative tools used to describe microbial communities that are known mainly from DNA sequences: diversity indices and rarefaction. Cell structure in detail is in [[cell-biology/cells-and-microscopy]], gene transfer in [[genetics/microbial-genetics]], and growth, physiology and pathogens in [[microbiology]].

## The prokaryotic cell

::: definition Prokaryote {#def-prokaryote}
A **prokaryote** is a cell without a nucleus: its chromosome, usually a single circular DNA molecule, lies in the cytoplasm in a region called the **nucleoid**, and it lacks membrane-bounded organelles such as mitochondria and an endomembrane system. Transcription and translation are coupled in the cytoplasm. Both Bacteria and Archaea are prokaryotes, but "prokaryote" names a grade of cellular organisation, not a clade: on any rooting of the tree of life, the group excludes eukaryotes, which share a common ancestor with it.
:::

Most prokaryotic cells are 0.5–5 µm across, but the range is wide. Members of the candidate phyla radiation (Patescibacteria) and some marine bacteria are a few tenths of a micrometre across, close to the minimum volume that can hold a genome and ribosomes. At the other extreme, the sulfur bacterium *Thiomargarita namibiensis* has cells up to 0.75 mm across, most of the volume being a vacuole of nitrate (Heide Schulz and colleagues, 1999), and '*Candidatus* Thiomargarita magnifica', from Caribbean mangroves, forms single cells about a centimetre long, with its many genome copies held in membrane-bounded compartments (Jean-Marie Volland and colleagues, 2022). Size is limited because a cell relies on diffusion and on transport across its surface, and the ratio of surface to volume falls as $3/r$ for a sphere of radius $r$ ([[cell-biology/cells-and-microscopy#prop-sv]]); the giants escape the limit with vacuoles that push the cytoplasm into a thin layer, or with many genome copies distributed through the cell.

::: example Why most bacteria are small {#ex-size}
Treat a cell as a sphere. (a) Compare the surface-to-volume ratio of a coccus of radius 0.5 µm with that of a *Thiomargarita namibiensis* cell of radius 375 µm. (b) A small molecule diffuses with $D \approx 10^{-9}$ m² s⁻¹ in water; using the one-dimensional diffusion time $t \approx x^2/2D$, estimate how long it takes to travel from the surface to the centre of each cell. (c) In *Thiomargarita* the cytoplasm is a shell about 2 µm thick around a central vacuole. What is the diffusion time across it?
::: solution
(a) $S/V = 3/r$: $3/0.5 = 6$ µm⁻¹ for the coccus, $3/375 = 0.008$ µm⁻¹ for *Thiomargarita* — 750 times less membrane per unit volume.

(b) Coccus: $(0.5\times10^{-6})^2/(2\times10^{-9}) = 1.25\times10^{-4}$ s, about a tenth of a millisecond. *Thiomargarita*: $(3.75\times10^{-4})^2/(2\times10^{-9}) = 70$ s. A solid cell of that size could not supply its centre by diffusion fast enough to sustain bacterial metabolic rates.

(c) $(2\times10^{-6})^2/(2\times10^{-9}) = 2\times10^{-3}$ s. The vacuole (which stores nitrate as an electron acceptor) makes the giant cell, metabolically, a thin sheet of ordinary bacterial dimensions wrapped around a balloon.
:::
:::

Genome sizes range from about 0.11–0.16 million base pairs in insect endosymbionts that have lost most of their genes (such as '*Candidatus* Carsonella ruddii', Atsushi Nakabachi and colleagues, 2006) to more than 14 million in some soil myxobacteria; free-living species typically have 2–6 Mb and about one gene per kilobase.

### Cell envelopes

The Danish physician Hans Christian Gram devised a staining method in 1884 that still divides bacteria into two classes. Crystal violet dye is fixed with iodine; washing with alcohol removes it from **Gram-negative** cells but not from **Gram-positive** ones, which stay purple.

::: definition Bacterial and archaeal cell envelopes {#def-envelope}
The **Gram-positive** envelope consists of the plasma membrane surrounded by a thick wall (20–80 nm) of **peptidoglycan** (murein) — glycan chains of alternating *N*-acetylglucosamine and *N*-acetylmuramic acid cross-linked by short peptides — threaded with teichoic acids. The **Gram-negative** envelope has a thin peptidoglycan layer in a periplasmic space, and outside it an **outer membrane** whose outer leaflet is **lipopolysaccharide** (LPS). Archaea never have peptidoglycan; most have a **surface layer** (S-layer) of protein or glycoprotein subunits in a crystalline array, and some methanogens have **pseudomurein**, built from different sugars and amino acids. Archaeal membranes are made of **isoprenoid chains ether-linked to glycerol-1-phosphate**, and in many species of single membrane-spanning tetraether lipids, whereas bacterial (and eukaryotic) membranes use **fatty acids ester-linked to glycerol-3-phosphate** — the "lipid divide".
:::

The envelope matters for ecology and medicine. The outer membrane makes Gram-negative bacteria resistant to many antibiotics and detergents; peptidoglycan is the target of penicillins and of lysozyme; mycobacteria have a waxy outer layer of mycolic acids and stain poorly. Ether-linked, often membrane-spanning archaeal lipids are more stable to heat and less permeable to protons than ester lipids, one reason archaea thrive in hot and acidic habitats. The mirror-image glycerol backbones of the two domains are a puzzle for the origin of cells: either LUCA had a membrane of mixed or simple lipids, or one domain replaced its lipids later.

Many prokaryotes swim with **flagella**, but those of the two domains are not homologous. The bacterial flagellum is a rotary motor driven by protons (or sodium ions) flowing into the cell, turning a helical filament at more than 100 revolutions per second; the archaeal **archaellum** is driven by ATP hydrolysis and is related to type IV pili. Some Bacillota form **endospores**, dormant cells with a thick protein coat and a dehydrated core that survive boiling, drying and radiation for decades or longer — which is why sterilisation uses pressurised steam at 121 °C rather than boiling.

::: warning "Bacteria are germs" and "archaea are extremophiles"
Only a tiny fraction of bacterial species cause disease; the great majority are free-living or harmless or beneficial symbionts, and life as we know it depends on them. Archaea were first found in extreme habitats — hot springs, salt lakes, anoxic sediments — and the label "extremophiles" stuck, but ammonia-oxidising archaea (Nitrososphaerota) are among the most abundant cells in the ocean and in soils (Edward DeLong, 1992, and Jed Fuhrman and colleagues, 1992, found them in sea water), and methanogens live in the guts of cattle and humans. No archaeon is known to be a pathogen of animals or plants. Nor are archaea "primitive" or ancestral to bacteria: the name, meaning "ancient", reflects a 1970s guess, and both domains have had equally long to evolve.
:::

## Metabolic diversity

Eukaryotes have essentially two ways of life — aerobic respiration of organic molecules, and oxygenic photosynthesis (borrowed from cyanobacteria). Prokaryotes have dozens. They are classified by three questions: where does the energy come from, where do the electrons come from, and where does the carbon come from?

::: definition Nutritional categories {#def-trophic}
By energy source, an organism is a **phototroph** (light) or a **chemotroph** (chemical reactions). By electron donor, it is an **organotroph** (organic compounds) or a **lithotroph** (inorganic compounds such as H₂, H₂S, Fe²⁺, NH₃ or H₂O). By carbon source, it is a **heterotroph** (organic carbon) or an **autotroph** (CO₂). The terms combine: humans and *E. coli* are chemoorganoheterotrophs, plants and cyanobacteria photolithoautotrophs (with water as electron donor), the iron-oxidising *Acidithiobacillus ferrooxidans* a chemolithoautotroph, and purple non-sulfur bacteria such as *Rhodobacter* photoorganoheterotrophs when they grow in the light on organic acids.
:::

Several processes of global importance are carried out only by prokaryotes:

| process | reaction (simplified) | organisms |
|---|---|---|
| nitrogen fixation | N₂ + 8 H⁺ + 8 e⁻ + 16 ATP → 2 NH₃ + H₂ + 16 ADP + 16 Pᵢ | diverse bacteria and some methanogens, free-living or in symbioses (rhizobia in legume nodules, *Frankia*, cyanobacteria) |
| nitrification | NH₃ → NO₂⁻ → NO₃⁻ | ammonia-oxidising bacteria and archaea, nitrite oxidisers; complete ammonia oxidisers ("comammox") in *Nitrospira* (Holger Daims and colleagues, and Maartje van Kessel and colleagues, 2015) |
| anammox | NH₄⁺ + NO₂⁻ → N₂ + 2 H₂O | Planctomycetota such as '*Candidatus* Brocadia' (Marc Strous and colleagues, 1999) |
| methanogenesis | CO₂ + 4 H₂ → CH₄ + 2 H₂O, or acetate → CH₄ + CO₂ | Archaea only (several lineages) |
| anaerobic methane oxidation | CH₄ + SO₄²⁻ → HCO₃⁻ + HS⁻ + H₂O | consortia of ANME archaea and sulfate-reducing bacteria (Antje Boetius and colleagues, 2000) |
| anoxygenic photosynthesis | CO₂ + 2 H₂S → (CH₂O) + 2 S + H₂O | purple and green sulfur bacteria, Chloroflexota, heliobacteria and others |
| oxygenic photosynthesis | CO₂ + H₂O → (CH₂O) + O₂ | Cyanobacteriota (and the plastids derived from them) |

Light is also harvested without chlorophyll. Haloarchaea such as *Halobacterium salinarum* use **bacteriorhodopsin**, a light-driven proton pump with a retinal chromophore (Dieter Oesterhelt and Walther Stoeckenius, 1971), and related **proteorhodopsins** are encoded by a large fraction of marine bacteria (Oded Béjà and colleagues, 2000).

Chemotrophs gain energy only from reactions that are **exergonic** under the conditions in which they live, and the energy available may be very small. Sergei Winogradsky's discovery in 1887 that the sulfur bacterium *Beggiatoa* oxidises H₂S for energy introduced chemolithotrophy; today we know organisms that live on reactions yielding only a few tens of kilojoules per mole.

::: proposition The energy available from a reaction {#prop-gibbs}
For a reaction $aA + bB \to cC + dD$, the Gibbs free energy change under actual conditions is

$$
\Delta G = \Delta G^{\circ\prime} + RT\ln\frac{[C]^c[D]^d}{[A]^a[B]^b},
$$ {#eq-gibbs}

where $\Delta G^{\circ\prime}$ is the standard change (1 mol L⁻¹ solutes, 1 bar gases, pH 7), $R = 8.314$ J mol⁻¹ K⁻¹, $T$ is the absolute temperature, and activities are approximated by concentrations (or partial pressures in bar). The reaction can supply energy only if $\Delta G < 0$. Synthesising ATP in a growing cell requires roughly +60 to +70 kJ mol⁻¹, but because energy is conserved as an ion gradient, in steps of one ion translocated (about −15 to −20 kJ mol⁻¹ each), a cell can use reactions yielding a fraction of an ATP. Bernhard Schink (1997) proposed about −20 kJ mol⁻¹ as the minimum quantum usable by most organisms; some are thought to live closer still to equilibrium.
:::

This is the same relation used for metabolic pathways in [Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=bioenergetics).

::: example How much energy does a methanogen get? {#ex-methanogen}
For hydrogenotrophic methanogenesis, CO₂ + 4 H₂ → CH₄ + 2 H₂O, $\Delta G^{\circ\prime} = -131$ kJ mol⁻¹ (Rudolf Thauer and colleagues, 1977). In a freshwater sediment at 25 °C, CO₂ and CH₄ are at roughly equal partial pressures, and fermenting bacteria keep H₂ at about $10^{-4}$ bar. What is $\Delta G$? How many ATP could be made per CH₄?
::: solution
Water is the solvent (activity 1), and with $p_{\mathrm{CH_4}} = p_{\mathrm{CO_2}}$ the quotient is $1/p_{\mathrm{H_2}}^4 = 10^{16}$. With $RT = 8.314\times10^{-3}\times298.15 = 2.479$ kJ mol⁻¹:

$$
\Delta G = -131 + 2.479\ln 10^{16} = -131 + 2.479\times36.84 = -131 + 91.3 = -39.7\ \text{kJ mol}^{-1}.
$$

Less than one ATP (about +60 kJ mol⁻¹) per methane — in reality about 0.5. Lowering $p_{\mathrm{H_2}}$ tenfold, to $10^{-5}$ bar, adds $4\times2.479\times\ln 10 = 22.8$ kJ mol⁻¹, leaving only −16.8 kJ mol⁻¹, near the limit for life. Hydrogen partial pressure is the key variable: the fourth power in the quotient makes the reaction exquisitely sensitive to it.
:::
:::

The same sensitivity explains **syntrophy**. Fermenting bacteria that oxidise compounds such as butyrate or propionate to acetate and H₂ face a reaction that is endergonic at standard conditions; it becomes exergonic only if the H₂ is removed as fast as it is made. Methanogens do exactly that. Neither partner can grow alone on the substrate; together they can — an "obligate mutualism" on a thermodynamic knife-edge. The first cultured Asgard archaeon is such a syntroph ([[diversity-of-life/classifying-life]]).

::: quiz
A bacterium oxidises H₂S to sulfate, fixes CO₂, and gets energy from the oxidation. How is it classified?
- [ ] Photolithoautotroph
- [x] Chemolithoautotroph
- [ ] Chemoorganoheterotroph
- [ ] Photoorganoheterotroph
::: solution
The energy comes from a chemical reaction (chemo-), the electron donor is inorganic H₂S (litho-) and the carbon source is CO₂ (auto-). Many sulfur-oxidising bacteria at hydrothermal vents, including symbionts of tubeworms, live this way.
:::
:::

## The major lineages of Bacteria

Bacterial phyla were for a long time named informally. Since 2021 the International Code of Nomenclature of Prokaryotes regulates names at the rank of phylum, with the ending *-ota* attached to the stem of a type genus, and many familiar names have changed (Aharon Oren and George Garrity, 2021). Both sets of names will be met in the literature.

| phylum (old name) | features and examples |
|---|---|
| **Pseudomonadota** (Proteobacteria) | the largest phylum of described species; Gram-negative; enormous metabolic range. *Escherichia coli*, *Pseudomonas*, *Vibrio*, nitrogen-fixing *Rhizobium*, the plant pathogen *Agrobacterium*, intracellular *Rickettsia*; the alphaproteobacteria include the ancestors of mitochondria. Classes Alpha-, Beta- (now within Gamma- in GTDB) and Gammaproteobacteria; the former delta group has been split into separate phyla such as Myxococcota. |
| **Bacillota** (Firmicutes) | mostly Gram-positive, low G+C content; endospore-formers (*Bacillus*, *Clostridium*), lactic acid bacteria (*Lactobacillus* in the broad sense, *Streptococcus*), *Staphylococcus*; mycoplasmas, which lack a wall, belong here. |
| **Actinomycetota** (Actinobacteria) | Gram-positive, high G+C; filamentous soil *Streptomyces*, source of most clinically used antibiotics; *Mycobacterium*; *Bifidobacterium*. |
| **Cyanobacteriota** (Cyanobacteria) | oxygenic photosynthesis with chlorophyll *a* and two photosystems; unicellular (*Prochlorococcus*, *Synechococcus*) and filamentous forms, some with nitrogen-fixing **heterocysts** (*Anabaena*, *Nostoc*). |
| **Bacteroidota** (Bacteroidetes) | Gram-negative; degraders of complex polysaccharides in guts and oceans (*Bacteroides*, *Flavobacterium*). |
| **Spirochaetota**, **Chlamydiota**, **Planctomycetota**, **Verrucomicrobiota** | helical cells with internal flagella; obligate intracellular parasites; anammox and unusual membrane systems; abundant soil and gut bacteria — the last three grouped as the PVC superphylum. |
| **Chloroflexota**, **Deinococcota**, **Thermotogota**, **Aquificota** | green non-sulfur photosynthesisers and many uncultured relatives; radiation-resistant *Deinococcus radiodurans* and *Thermus aquaticus* (source of *Taq* polymerase); hyperthermophilic *Thermotoga* and *Aquifex*. |
| **Patescibacteria** (candidate phyla radiation, CPR) | known almost entirely from metagenomes; very small cells and genomes (often under 1 Mb) lacking many biosynthetic pathways, probably living attached to other microbes (Christopher Brown and colleagues, 2015). |

Most bacterial diversity has never been grown in the laboratory. Microscopic counts of cells in natural samples exceed plate counts by factors of 100 or more ("the great plate count anomaly", James Staley and Allan Konopka, 1985), and the fraction of cells belonging to lineages without cultured representatives is large, though it varies widely between environments and depends on how it is measured. Norman Pace's group pioneered the alternative in the 1980s: extract DNA from the environment and sequence 16S rRNA genes, which revealed whole phyla known only as sequences. Assembling genomes directly from environmental DNA (**metagenomics**; for example Gene Tyson and colleagues, 2004, from acid mine drainage) made it possible to infer their metabolism as well. In Laura Hug and colleagues' tree of 2016, based on metagenomic and genomic data, the CPR formed a large fraction of bacterial branches, although how many phyla it represents depends on how ranks are calibrated.

## The major lineages of Archaea

Archaea are divided in current classifications (GTDB and the ICNP) into a few large groups, again with new names:

- **Methanobacteriota** and relatives (formerly much of Euryarchaeota): most methanogens (*Methanobrevibacter smithii* in the human gut, *Methanococcus*, *Methanosarcina*); the extreme halophiles (Halobacteria), which grow in saturated brine and turn salt ponds red with carotenoids and bacteriorhodopsin; hyperthermophilic *Pyrococcus furiosus*, which grows best at 100 °C (Gerhard Fiala and Karl Stetter, 1986); and the wall-less acidophile *Picrophilus*, which grows at pH 0.7 (Christa Schleper and colleagues, 1995).
- **Thermoproteota** (formerly Crenarchaeota and Thaumarchaeota): thermoacidophiles such as *Sulfolobus* (isolated from Yellowstone by Thomas Brock and colleagues, 1972), and the ammonia-oxidising **Nitrososphaeria**, such as *Nitrosopumilus maritimus*, the first cultured marine archaeon (Martin Könneke and colleagues, 2005). Ammonia oxidisers make up a substantial fraction (up to about 20–40 % in deep water) of the prokaryotic plankton of the ocean.
- **DPANN** archaea: tiny cells with very small genomes, many of them symbionts of other archaea. *Nanoarchaeum equitans*, which lives attached to *Ignicoccus hospitalis*, has a genome of 0.49 Mb (Harald Huber and colleagues, 2002; Elizabeth Waters and colleagues, 2003).
- **Asgard archaea** (Asgardarchaeota, or Promethearchaeota): the closest prokaryotic relatives of eukaryotes ([[diversity-of-life/classifying-life#prop-two-domains]]).

The upper temperature limit for life is held by archaea: *Methanopyrus kandleri* strain 116 grew at 122 °C under high pressure (Ken Takai and colleagues, 2008). Archaea also share with eukaryotes features of their information-processing machinery: RNA polymerases with many subunits, the TATA-binding protein and transcription factor B (homologous to eukaryotic TFIIB), histones that wrap DNA in many lineages, and DNA replication proteins related to eukaryotic ones.

## Measuring microbial diversity

Most microbial communities are studied by sequencing a marker gene — usually part of the 16S rRNA gene — from a sample and grouping the reads into **operational taxonomic units** (OTUs) or exact **amplicon sequence variants** (ASVs) ([[diversity-of-life/classifying-life]]). The result is a table of counts: so many reads of type 1, so many of type 2, and so on. How should we summarise the diversity of such a community? The number of types, **richness** $S$, is the simplest measure, but it ignores how evenly individuals are spread among types. A community of 99 % one species and 1 % spread over 99 others has richness 100, like one with 100 equally common species, but most of the time you would meet only one species. Two classical indices take abundance into account.

::: definition Shannon and Simpson indices {#def-indices}
Let $p_i$ be the proportion of individuals (or reads) of type $i$, $i = 1, \dots, S$. The **Shannon index** is

$$
H' = -\sum_{i=1}^S p_i\ln p_i,
$$ {#eq-shannon}

the entropy of the abundance distribution (Claude Shannon's measure of information, 1948). **Simpson's index** is

$$
D = \sum_{i=1}^S p_i^2,
$$ {#eq-simpson}

the probability that two individuals drawn at random (with replacement) belong to the same type (Edward Simpson, 1949); diversity is expressed as $1 - D$ (the probability that they differ) or $1/D$. **Pielou's evenness** is $J = H'/\ln S$. The **effective number of types** (a Hill number) of order 1 is $e^{H'}$, and of order 2 is $1/D$: the number of equally common types that would give the same index.
:::

::: proposition Bounds on the Shannon index {#prop-shannon-max}
For a community of $S$ types, $0 \le H' \le \ln S$, with $H' = \ln S$ if and only if all types are equally common ($p_i = 1/S$), and $H' = 0$ if and only if one type makes up the whole community. Similarly $1/S \le D \le 1$, with $D = 1/S$ exactly when all are equally common.
:::

::: proof
Each term $-p_i\ln p_i \ge 0$ for $0 < p_i \le 1$, with equality only at $p_i = 1$, so $H' \ge 0$ with equality only when one $p_i = 1$. For the upper bound, $\ln$ is concave, so by Jensen's inequality, with weights $p_i$,

$$
H' = \sum_i p_i\ln\frac{1}{p_i} \le \ln\Big(\sum_i p_i\cdot\frac{1}{p_i}\Big) = \ln S,
$$

with equality only if all $1/p_i$ are equal. For Simpson's index, by the Cauchy–Schwarz inequality $1 = (\sum_i p_i)^2 \le S\sum_i p_i^2 = SD$, so $D \ge 1/S$, with equality when all $p_i$ are equal; and $D \le \sum_i p_i = 1$ since $p_i^2 \le p_i$.
:::

::: example Diversity of a 16S sample {#ex-indices}
A sample yields 100 reads in five ASVs with counts 50, 25, 12, 8 and 5. Calculate $H'$, $J$, $e^{H'}$, $D$ and $1/D$, and compare with a community of five equally common ASVs.
::: solution
The proportions are 0.50, 0.25, 0.12, 0.08, 0.05. Then

$$
H' = -(0.5\ln0.5 + 0.25\ln0.25 + 0.12\ln0.12 + 0.08\ln0.08 + 0.05\ln0.05) = 0.3466 + 0.3466 + 0.2544 + 0.2021 + 0.1498 = 1.299.
$$

$J = 1.299/\ln 5 = 1.299/1.609 = 0.807$; $e^{H'} = 3.67$. $D = 0.25 + 0.0625 + 0.0144 + 0.0064 + 0.0025 = 0.336$, so $1 - D = 0.664$ and $1/D = 2.98$.

For five equally common ASVs, $H' = \ln 5 = 1.609$, $J = 1$, $e^{H'} = 1/D = 5$. The uneven community has the richness of five but the effective diversity of about three ($e^{H'}$) or two to three ($1/D$, which weights common types more heavily). Different indices answer different questions; report several, or the Hill numbers as a profile.
:::
:::

::: widget plot
f: -(x*ln(x) + (1 - x)*ln(1 - x)); 1 - x^2 - (1 - x)^2; exp(-(x*ln(x) + (1 - x)*ln(1 - x)))
x: 0.001, 0.999
y: 0, 2.1
labels: H'; 1 - D; e^{H'}
hlines: 0.6931
caption: Diversity of a community of two types as a function of the proportion $p$ of the first: Shannon's $H'$, Simpson's $1 - D$, and the effective number of types $e^{H'}$. All are maximal at $p = 0.5$, where $H' = \ln 2 = 0.693$ (dashed line), $1 - D = 0.5$ and $e^{H'} = 2$. Hover near $p = 0.9$: $H'$ has fallen to 0.33 and $e^{H'}$ to 1.38 — a community 90:10 behaves like 1.4 equally common species. Simpson's index changes less near the extremes than Shannon's, because it is dominated by the commonest type.
:::

### Rarefaction

Diversity indices and richness depend on sample size: sequence more reads, find more rare types. To compare samples of unequal size fairly, ecologists **rarefy** them to a common size — they ask how many types would be expected in a random subsample of $n$ individuals.

::: proposition Expected richness under rarefaction {#prop-rarefaction}
A sample of $N$ individuals contains $S$ types, type $i$ represented by $N_i$ individuals. If a subsample of $n \le N$ individuals is drawn at random without replacement, the expected number of types it contains is

$$
\E[S_n] = \sum_{i=1}^{S}\left[1 - \frac{\binom{N - N_i}{n}}{\binom{N}{n}}\right].
$$ {#eq-rarefaction}

(Howard Sanders, 1968; corrected to this form by Stuart Hurlbert, 1971.)
:::

::: proof
Let $X_i = 1$ if type $i$ appears in the subsample and 0 otherwise, so that $S_n = \sum_i X_i$ and, by linearity of expectation, $\E[S_n] = \sum_i \Prob(X_i = 1)$. Type $i$ is absent when all $n$ individuals are drawn from the $N - N_i$ individuals of other types. All $\binom{N}{n}$ subsamples are equally likely, and $\binom{N - N_i}{n}$ of them avoid type $i$, so $\Prob(X_i = 0) = \binom{N - N_i}{n}/\binom{N}{n}$ (the hypergeometric probability of zero successes). Substituting gives [[#eq-rarefaction]].
:::

::: example Rarefying a small sample {#ex-rarefaction}
A sample of 10 individuals contains three species with 6, 3 and 1 individuals. What is the expected number of species in a random subsample of 3?
::: solution
$\binom{10}{3} = 120$. Species 1: $\binom{4}{3} = 4$, so it is present with probability $1 - 4/120 = 0.967$. Species 2: $\binom{7}{3} = 35$, so $1 - 35/120 = 0.708$. Species 3: $\binom{9}{3} = 84$, so $1 - 84/120 = 0.300$. Summing, $\E[S_3] = 0.967 + 0.708 + 0.300 = 1.975$ species. The rare species is found in a subsample of three only 30 % of the time.
:::
:::

::: widget plot
f: 5 - binom(50, x)/binom(100, x) - binom(75, x)/binom(100, x) - binom(88, x)/binom(100, x) - binom(92, x)/binom(100, x) - binom(95, x)/binom(100, x); 5 - 5*binom(80, x)/binom(100, x)
x: 0, 50
y: 0, 5.5
labels: \text{uneven (50, 25, 12, 8, 5)}; \text{even (20 each)}
hlines: 5
caption: Rarefaction curves from [[#eq-rarefaction]] for two samples of 100 reads, each with five ASVs: the uneven community of [[#ex-indices]] and a perfectly even one. Both reach five types eventually (dashed line), but the even community gets there much sooner; at a subsample of 10 reads, the even community shows about 4.5 types and the uneven one about 3.7. The slope of a rarefaction curve at the full sample size measures how much a little more sequencing would add — steep curves mean that richness is still badly undersampled.
:::

Rarefying throws data away, and statisticians have argued against it for some purposes (Paul McMurdie and Susan Holmes, 2014), recommending instead methods that model the sampling process directly, or comparing samples at equal **coverage** (the estimated proportion of the community's individuals belonging to types already observed) rather than equal size (Anne Chao and Lou Jost, 2012). The underlying lesson is general: a count of species means nothing without the sampling effort behind it.

::: application Microbes that feed the world and heal it
Biological nitrogen fixation adds on the order of 100–200 million tonnes of nitrogen a year to terrestrial and marine ecosystems, comparable with industrial fixation by the Haber–Bosch process, and legume crops depend on rhizobia in their root nodules. Actinomycetota, especially *Streptomyces*, are the source of most antibiotics in clinical use, starting with streptomycin (Albert Schatz, Elizabeth Bugie and Selman Waksman, 1944), and genome sequencing has shown that each *Streptomyces* genome encodes dozens of biosynthetic gene clusters, most of them silent in the laboratory. Thermostable enzymes from thermophiles, such as *Taq* DNA polymerase from *Thermus aquaticus* (isolated by Thomas Brock and Hudson Freeze in 1969), made PCR practical, and CRISPR–Cas systems, the adaptive immune systems of bacteria and archaea, are now the basis of genome editing ([[biotechnology]]). For bacteria as agents of disease, see [Medicine Atlas](/learn/medicine/course.php?c=microbiology).
:::

::: history
Antonie van Leeuwenhoek described "animalcules", including bacteria, scraped from his teeth in letters to the Royal Society from 1676 and 1683. Ferdinand Cohn classified bacteria by shape (1872) and discovered endospores (1876); Hans Christian Gram introduced his stain in 1884. Sergei Winogradsky discovered chemolithotrophy (1887) and Martinus Beijerinck isolated the root-nodule bacteria that fix nitrogen (1888), founding microbial ecology. Edouard Chatton (1925, 1938) and Roger Stanier and Cornelis van Niel (1962) defined the prokaryote. Carl Woese and George Fox's discovery of the archaea (1977) and Norman Pace's sequencing of 16S rRNA genes directly from the environment (from the mid-1980s) revealed how much diversity had been missed by culture, and metagenomics — from acid mine drainage (2004) to the candidate phyla radiation (2015) and the Asgard archaea (2015–2017) — has since mapped much of the rest.
:::

::: summary
- Prokaryotes (Bacteria and Archaea, a grade, not a clade) number about $10^{30}$ cells and hold nearly 80 Gt of carbon, several times more than all animals and fungi combined.
- Cells are mostly 0.5–5 µm, limited by surface-to-volume ratios; giants such as *Thiomargarita* use vacuoles and many genome copies. Genomes range from about 0.1 Mb (endosymbionts) to over 14 Mb.
- Gram-positive envelopes have thick peptidoglycan; Gram-negative ones thin peptidoglycan and an LPS outer membrane. Archaea lack peptidoglycan and have ether-linked isoprenoid lipids on glycerol-1-phosphate.
- Metabolism is classified by energy (photo/chemo), electron donor (litho/organo) and carbon (auto/hetero) sources; nitrogen fixation, nitrification, anammox, methanogenesis and anoxygenic photosynthesis are prokaryotic. $\Delta G = \Delta G^{\circ\prime} + RT\ln Q$ sets the energy available — about −40 kJ mol⁻¹ for a methanogen at $10^{-4}$ bar H₂.
- Major bacterial phyla: Pseudomonadota, Bacillota, Actinomycetota, Cyanobacteriota, Bacteroidota and the CPR; archaeal groups: Methanobacteriota, Thermoproteota (with ammonia oxidisers), DPANN and Asgard.
- Diversity indices: Shannon $H' = -\sum p_i\ln p_i \le \ln S$; Simpson $D = \sum p_i^2$; effective numbers $e^{H'}$ and $1/D$. Rarefaction, $\E[S_n] = \sum_i[1 - \binom{N - N_i}{n}/\binom{N}{n}]$, compares richness at equal sample size.
:::

## Exercises

::: exercise Shannon index {level=1 check="0.898"}
A community has three species with proportions 0.6, 0.3 and 0.1. Calculate $H'$ to three decimal places.
::: solution
$H' = -(0.6\ln0.6 + 0.3\ln0.3 + 0.1\ln0.1) = 0.3065 + 0.3612 + 0.2303 = 0.898$.
:::
:::

::: exercise Inverse Simpson {level=1 check="2.17"}
For the community of the previous exercise, calculate $1/D$ to two decimal places.
::: solution
$D = 0.36 + 0.09 + 0.01 = 0.46$; $1/D = 2.17$ effectively equal species.
:::
:::

::: exercise Naming a way of life {level=1}
Classify each organism by its nutritional category: (a) *Nitrosomonas*, which oxidises ammonia and fixes CO₂; (b) *Chlorobium*, a green sulfur bacterium that uses light, H₂S and CO₂; (c) *Bacillus subtilis*, growing on glucose in air; (d) a haloarchaeon making ATP with bacteriorhodopsin while taking up amino acids as its carbon source.
::: solution
(a) Chemolithoautotroph. (b) Photolithoautotroph (anoxygenic). (c) Chemoorganoheterotroph. (d) Photoorganoheterotroph — energy from light, carbon (and electrons) from organic molecules.
:::
:::

::: exercise Rarefaction by hand {level=2 check="1.975"}
Verify the result of [[#ex-rarefaction]] by computing the probability that each species is missed, and give $\E[S_3]$ to three decimal places.
::: solution
Missed with probabilities $4/120 = 0.0333$, $35/120 = 0.2917$ and $84/120 = 0.7$. $\E[S_3] = 3 - (0.0333 + 0.2917 + 0.7) = 3 - 1.025 = 1.975$.
:::
:::

::: exercise Starved of hydrogen {level=2 check="-16.8"}
Recalculate [[#ex-methanogen]] with $p_{\mathrm{H_2}} = 10^{-5}$ bar, other conditions unchanged. What is $\Delta G$ in kJ mol⁻¹, to one decimal place?
::: solution
$Q = 10^{20}$; $RT\ln Q = 2.479\times46.05 = 114.2$ kJ mol⁻¹; $\Delta G = -131 + 114.2 = -16.8$ kJ mol⁻¹.
:::
:::

::: exercise Biomass shares {level=2 check="12.7"}
Using Bar-On and colleagues' estimates of about 70 Gt C in bacteria out of 550 Gt C in all life, what percentage of the world's biomass carbon is bacterial (one decimal place)? Why is this estimate much less certain than that for plants?
::: solution
$70/550 = 12.7\,\%$. Most bacterial biomass is in the deep subsurface and in soils, where cell numbers are estimated from a few cores and extrapolated, and the carbon content per cell is uncertain for slow-growing, small subsurface cells; plant biomass is measured from inventories and remote sensing. Indeed estimates of subsurface biomass have been revised downward several-fold since 1998.
:::
:::

::: exercise Gram stains and archaea {level=2}
(a) Explain why a Gram-negative cell loses crystal violet during the alcohol wash but a Gram-positive cell does not. (b) Archaea can stain Gram-positive or Gram-negative. Why is the Gram reaction of an archaeon not evidence about its relationships? (c) Which two features of an archaeon's membrane would you test to confirm that it is not a bacterium?
::: solution
(a) The alcohol dehydrates the thick, highly cross-linked peptidoglycan of Gram-positive cells, shrinking its pores and trapping the dye–iodine complex; in Gram-negative cells, alcohol dissolves the outer membrane and the thin peptidoglycan cannot retain the complex. (b) The reaction depends on wall thickness and structure, not ancestry; archaea with thick pseudomurein stain positive, those with only an S-layer negative, and these states are homoplastic with bacterial ones. (c) Ether-linked isoprenoid lipids and their glycerol-1-phosphate backbone (and, if present, membrane-spanning tetraethers); the absence of peptidoglycan; and 16S rRNA or genome sequence.
:::
:::

::: exercise The maximum of diversity {level=3}
(a) Prove that for $S = 2$, $H'(p) = -p\ln p - (1 - p)\ln(1 - p)$ is maximal at $p = 1/2$ by differentiation. (b) Show that the effective number $e^{H'}$ of a community made of two equal halves, one with $S_1$ equally common species and the other with $S_2$ (each half holding half the individuals), equals $2\sqrt{S_1S_2}$. (c) Interpret: when $S_1 = 1$ and $S_2 = 100$, how many effective species are there?
::: solution
(a) $dH'/dp = -\ln p - 1 + \ln(1 - p) + 1 = \ln\big((1 - p)/p\big)$, which is zero at $p = 1/2$, positive below and negative above; so $p = 1/2$ is the maximum, $H' = \ln 2$.

(b) Each species in the first half has proportion $1/(2S_1)$, in the second $1/(2S_2)$. Then $H' = S_1\cdot\frac{1}{2S_1}\ln(2S_1) + S_2\cdot\frac{1}{2S_2}\ln(2S_2) = \tfrac12\ln(2S_1) + \tfrac12\ln(2S_2) = \ln\sqrt{4S_1S_2}$, so $e^{H'} = 2\sqrt{S_1S_2}$.

(c) $2\sqrt{100} = 20$ effective species. Half the community is a single dominant species; the 100 rare species contribute much less than their number to effective diversity — the effective number is the geometric mean of the halves' "spaces" doubled, not their sum (101).
:::
:::

::: exercise Interpreting rarefaction curves {level=3}
Two soil samples were sequenced to 10,000 and 50,000 reads. The first shows 900 ASVs, the second 2,100. Rarefied to 10,000 reads, the second has 1,200 ASVs. At 10,000 reads, the rarefaction curve of the first sample is still rising steeply, that of the second is flattening. (a) Which soil is richer, as far as these data show? (b) Which sample's richness is more severely underestimated? (c) Suggest two further analyses before concluding that the soils differ.
::: solution
(a) At equal sample size (10,000 reads) the second soil has more ASVs (1,200 against 900), so it appears richer; the raw comparison (900 against 2,100) mostly reflects sequencing depth. (b) The first sample: its curve is steep at the full sample size, so many ASVs remain undetected; the second's flattening curve suggests better coverage, though rarefied to 10,000 it too would be rising. (c) Compare samples at equal coverage rather than equal size; compute richness estimators such as Chao1 ([[diversity-of-life/classifying-life#prop-chao1]]) with confidence intervals; sequence replicate samples from each soil to estimate within-site variation; check that DNA extraction, PCR and sequencing were done identically, since methodological differences can masquerade as biological ones.
:::
:::
