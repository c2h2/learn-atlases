If every microbe on Earth were to stop working tomorrow, the consequences would follow quickly. Dead plants and animals would pile up undecomposed; the nitrogen in them would never return to the soil as ammonium and nitrate, and crops would fail for want of it; the sulfide and methane produced in sediments would no longer be oxidised before reaching the water and the air; and the ocean, where microscopic phototrophs fix about as much carbon each year as all land plants, would lose half of the planet's primary production. Microbes are not a sideshow of ecology. They are its chemical engine, and most of the transformations of carbon, nitrogen and sulfur at the Earth's surface are catalysed by them.

This chapter is about microbes in their environments: how they live together in communities and in surface-attached biofilms, how they interact with each other and with larger organisms in symbioses, and how their combined metabolism drives the biogeochemical cycles of carbon, nitrogen and sulfur. The metabolic processes themselves were described in [[microbiology/microbial-metabolism]], and the identification of community members by sequencing in [[microbiology/microbial-diversity]]. General ecological principles — populations, competition, food webs, ecosystems — are in [[ecology]].

## Microbial habitats

Microbes experience their environment at the scale of micrometres, and at that scale even an apparently uniform habitat is a mosaic. A soil crumb a few millimetres across can be oxic on its surface and anoxic at its centre, because microbes consume O₂ faster than it diffuses in through water-filled pores; a marine snow particle is a hotspot of nutrients in a dilute ocean; the surface of a root, a sand grain or a tooth offers attachment and a stream of nutrients. The relevant habitat of a microbe is its **microenvironment**, and gradients of oxygen, nutrients, pH and redox potential over tens to hundreds of micrometres decide which organisms can live where.

::: definition Population, community, guild {#def-community}
A **population** is a group of cells of one species in a habitat; a **community** is all the populations of different species living together there; a **guild** is a group of populations that carry out the same function, such as the ammonia oxidisers or the sulfate reducers of a sediment, whatever their phylogeny. **Functional redundancy** — the presence of several taxa in the same guild — means that community function can be stable while composition fluctuates.
:::

Microbial abundances in some common habitats give a sense of scale: about $10^5$–$10^6$ prokaryotic cells per mL of surface sea water, $10^8$–$10^{10}$ per gram of agricultural soil, and $10^{11}$ per gram of the contents of the human colon. Diversity is correspondingly large: a gram of soil may contain thousands to tens of thousands of species-level taxa (the estimate depends heavily on method and definition; [[diversity-of-life/bacteria-archaea]]).

## Biofilms

In nature most microbes do not swim freely in liquid but live attached to surfaces, embedded in a matrix of their own making. Bill Costerton and colleagues argued from the late 1970s that this sessile, surface-attached mode of life is the predominant one.

::: definition Biofilm {#def-biofilm}
A **biofilm** is a structured community of microbial cells attached to a surface or to each other and embedded in a self-produced matrix of **extracellular polymeric substances** (EPS) — polysaccharides, proteins (including amyloid fibres), extracellular DNA and lipids. Biofilms form on rocks in streams, on teeth (dental plaque), in pipes and on medical devices; floating aggregates and mats are their relatives.
:::

Biofilm development follows a broadly similar course in many species: reversible attachment of single cells, often by flagella and pili; irreversible attachment as cells produce adhesins and matrix; growth into microcolonies; maturation into a three-dimensional structure, which in *Pseudomonas aeruginosa* grown in flow cells can take the form of mushroom-like towers separated by water channels; and dispersal, in which some cells leave to colonise new surfaces. Many of these transitions are controlled by the intracellular second messenger **cyclic di-GMP**: high levels promote matrix production and a sessile life, low levels motility.

### Living in a gradient

The matrix slows the movement of large molecules but not small ones, and in thick biofilms the main barrier to supply is simply the consumption of substrates by cells near the surface. Diffusion combined with consumption sets up gradients that make the interior of a biofilm a different environment from its surface.

::: proposition Penetration depth of a substrate {#prop-penetration}
Consider a flat biofilm with a substrate (such as O₂) supplied at concentration $C_0$ at its surface, $x = 0$, diffusing with diffusion coefficient $D$ and consumed at a constant volumetric rate $q$ wherever it is present (zero-order kinetics, appropriate when the consumers' half-saturation constant is much smaller than $C_0$). At steady state the concentration profile is

$$
C(x) = C_0\left(1 - \frac{x}{\delta}\right)^2 \quad (0 \le x \le \delta), \qquad \delta = \sqrt{\frac{2DC_0}{q}},
$$ {#eq-penetration}

and $C = 0$ beyond the **penetration depth** $\delta$.
:::

::: proof
At steady state, diffusion into a thin slice balances consumption in it: $D\,d^2C/dx^2 = q$ where $C > 0$. Integrating twice, $C(x) = \frac{q}{2D}x^2 + Ax + B$. At the surface $C(0) = C_0$, so $B = C_0$. At the penetration depth both the concentration and its flux vanish, $C(\delta) = 0$ and $C'(\delta) = 0$ (no substrate flows past the point where it runs out). The second condition gives $A = -q\delta/D$, and the first then gives $\frac{q}{2D}\delta^2 - \frac{q}{D}\delta^2 + C_0 = 0$, so $\delta^2 = 2DC_0/q$. Substituting, $C(x) = \frac{q}{2D}(x^2 - 2\delta x + \delta^2) = \frac{q}{2D}(\delta - x)^2 = C_0(1 - x/\delta)^2$.
:::

::: example How deep does oxygen reach? {#ex-penetration}
A biofilm in air-saturated water at 25 °C has O₂ at about 250 µmol L⁻¹ (0.25 mol m⁻³) at its surface. The diffusion coefficient of O₂ in the biofilm is $2\times10^{-9}$ m² s⁻¹, and the cells consume O₂ at 0.05 mol m⁻³ s⁻¹. (a) Calculate the penetration depth. (b) What is the O₂ concentration halfway to it? (c) If the biofilm is 500 µm thick, what is the environment of its deeper layers, and what organisms might live there?
::: solution
(a) $\delta = \sqrt{2\times2\times10^{-9}\times0.25/0.05} = \sqrt{2\times10^{-8}} = 1.41\times10^{-4}$ m, about 140 µm.

(b) At $x = \delta/2$, $C = C_0(1/2)^2 = 63$ µmol L⁻¹, a quarter of the surface value.

(c) Below about 140 µm the biofilm is anoxic. Facultative anaerobes there ferment or respire nitrate; obligate anaerobes such as sulfate reducers and methanogens can live in the deepest layers. Measurements with oxygen microelectrodes (pioneered by Niels Peter Revsbech from the 1980s) show penetration depths of tens to a few hundred micrometres in active biofilms and sediments, consistent with this estimate. The same gradients mean that cells deep in a biofilm grow slowly or not at all, which helps make biofilms tolerant of antibiotics that kill only growing cells ([[microbiology/antimicrobials]]).
:::
:::

::: widget plot
f: c*(1 - x/sqrt(2*d*c/q))^2*heaviside(sqrt(2*d*c/q) - x)
x: 0, 400
y: 0, 300
sliders: c=250:50:300:10; q=50:5:200:5; d=2000:500:2500:100
labels: C(x)\ \text{(µmol L}^{-1}\text{)}
caption: Oxygen concentration against depth $x$ (µm) in a biofilm, from [[#eq-penetration]], with surface concentration $c$ (µmol L⁻¹), consumption rate $q$ (µmol L⁻¹ s⁻¹) and diffusion coefficient $d$ (µm² s⁻¹). With the starting values oxygen runs out at about 140 µm. Double the consumption rate and the penetration depth falls only by a factor of $\sqrt2$, to 100 µm; lower the surface concentration, as in a poorly aerated stream, and the oxic layer thins in the same square-root way.
:::

### Talking in a crowd

Many bacteria regulate genes according to their population density by **quorum sensing**: each cell secretes a small signal molecule, an **autoinducer**, at a low rate, and when the signal accumulates above a threshold — which happens only when many cells are present in a confined space — it switches on a set of genes. The mechanism was discovered in the bioluminescent *Vibrio fischeri* (Kenneth Nealson, Terry Platt and Woodland Hastings, 1970) and is described in [[molecular-biology/bacterial-gene-regulation]]. Gram-negative bacteria typically use acyl-homoserine lactones made by LuxI-type enzymes and detected by LuxR-type receptors; Gram-positive bacteria use short peptides detected by two-component systems; and many bacteria of both kinds make the furanone-derived **autoinducer-2**, discovered by Bonnie Bassler's group, which may permit communication between species. Quorum sensing controls group activities that pay only when many cells act together — light production, secretion of extracellular enzymes and toxins, biofilm formation and dispersal.

Whether quorum sensing measures density or something else is debated: since the signal accumulates whenever its diffusion away from the cells is restricted, it may serve equally as "diffusion sensing" or "efficiency sensing" — a test of whether secreted products will stay near the cells that made them.

## Interactions between microbes

Microbes interact in all the ways that larger organisms do.

| interaction | effect on A, B | microbial examples |
|---|---|---|
| mutualism | +, + | syntrophic fermenters and methanogens; cross-feeding of amino acids and vitamins |
| commensalism | +, 0 | aerobes that remove O₂ and so allow anaerobes to grow; degraders of polymers whose products feed others |
| competition | −, − | for limiting substrates in a chemostat or a sediment ([[microbiology/microbial-growth]]) |
| amensalism and antagonism | 0 or +, − | antibiotic and bacteriocin production; acidification by lactic acid bacteria |
| predation and parasitism | +, − | protists grazing bacteria; *Bdellovibrio* invading other bacteria; phages ([[microbiology/viruses]]) |

**Cross-feeding** is common: in many communities, organisms excrete amino acids, vitamins or fermentation products that others need, and whole groups of organisms (such as the Patescibacteria and DPANN archaea with their tiny genomes; [[microbiology/microbial-diversity]]) seem to depend on partners. **Syntrophy** is the extreme case, in which the partners together carry out a reaction neither can perform alone because one keeps the product of the other (often H₂ or formate) at a concentration low enough to make the overall reaction exergonic ([[diversity-of-life/bacteria-archaea]]).

Many microbial products are **public goods**: secreted enzymes, siderophores that scavenge iron, surfactants that help a swarm move. A cell that makes them pays the cost, while any nearby cell benefits, so "cheaters" that stop making them can spread. Ashleigh Griffin, Stuart West and Angus Buckling (2004) showed, with *Pseudomonas aeruginosa* and its siderophore pyoverdine, that cooperators do best when relatedness is high — when neighbours are likely to be clonemates, as they are in a biofilm grown from few founders — in agreement with kin selection theory ([[behaviour]]). Spatial structure, by keeping relatives together, is one reason why cooperation persists in biofilms.

**Predation** by protists is a major cause of bacterial mortality in water and soil, comparable to viral lysis in the sea. Grazers prefer cells of certain sizes, and bacteria escape by forming filaments, aggregates or biofilms, by becoming very small, or by producing toxins.

## Symbioses with plants and animals

Symbiosis means "living together"; it includes mutualism, commensalism and parasitism, though it is often used for close, long-lasting mutualisms. A few examples show the range.

**Legumes and rhizobia.** Rhizobia such as *Rhizobium*, *Sinorhizobium* and *Bradyrhizobium* fix nitrogen inside root nodules of legumes. The partnership begins with a molecular dialogue: the plant root secretes flavonoids, which induce the bacterial *nod* genes; the bacteria produce **Nod factors**, lipochitooligosaccharides whose structure determines which legumes they can nodulate (Patrice Lerouge and colleagues, 1990); root hairs curl around the bacteria, which enter through an **infection thread** grown by the plant; and cells of the root cortex divide to form the nodule, in which the bacteria are released into plant cells, surrounded by a plant membrane, and differentiate into nitrogen-fixing **bacteroids**. The plant supplies dicarboxylic acids and low-oxygen conditions (with leghaemoglobin; [[microbiology/microbial-metabolism#def-nitrogenase]]); the bacteroids return ammonium. Plants also "sanction" nodules that fix little nitrogen by reducing their oxygen supply.

**Mycorrhizae**, partnerships between roots and fungi, are found in most land plants; they are described in [[diversity-of-life/fungi]] and [[plant-biology]].

**Chemosynthetic symbioses.** At deep-sea hydrothermal vents, the giant tubeworm *Riftia pachyptila* has no mouth or gut. Its body houses a trophosome packed with sulfide-oxidising bacteria, which fix CO₂ using the energy of sulfide oxidation (Colleen Cavanaugh and colleagues, 1981); the worm's haemoglobin carries both O₂ and sulfide to them. Similar symbioses occur in clams, mussels and nematodes in sulfide-rich sediments.

**Insects and their endosymbionts.** About half of insect species harbour bacteria inside specialised cells. Aphids depend on *Buchnera aphidicola*, which synthesises essential amino acids missing from the plant sap they eat, and is transmitted from mother to offspring; such symbionts have tiny, degenerate genomes ([[microbiology/microbial-diversity]]).

**Light organs.** The Hawaiian bobtail squid *Euprymna scolopes* acquires *Vibrio fischeri* from sea water into a light organ, where the bacteria produce light by quorum sensing; the light, emitted downwards, removes the squid's shadow on moonlit nights. Each morning the squid expels most of the bacteria, and the remainder regrow — a model system for how animals select their symbionts (studied by Margaret McFall-Ngai and Edward Ruby).

**Coral reefs** depend on photosynthetic dinoflagellates (family Symbiodiniaceae) inside coral cells, which supply most of the coral's energy; when stressed by heat, corals expel them and "bleach". **Lichens** are partnerships of fungi with algae or cyanobacteria.

The microbiomes of animals, including humans, and the ways in which microbes cause disease are the subject of [[microbiology/microbes-and-hosts]].

## The carbon cycle

Carbon cycles between CO₂ in the atmosphere and oceans and organic matter in living things, soils and sediments. Microbes take part in every step.

**Primary production.** Photosynthetic microbes in the sea — cyanobacteria and eukaryotic algae — fix roughly half of the global net primary production of about 105 Pg (10¹⁵ g) of carbon a year (Christopher Field and colleagues, 1998, from satellite measurements). The tiny cyanobacterium *Prochlorococcus*, discovered by Sallie Chisholm, Robert Olson and colleagues only in 1988, by flow cytometry, is the most abundant photosynthetic organism on Earth.

**The microbial loop.** Much of what phytoplankton fix is released as dissolved organic matter (DOM), by leakage, grazing and viral lysis — far too dilute to be eaten by animals. Heterotrophic bacteria take it up, and are in turn eaten by protists, which are eaten by zooplankton. Farooq Azam and colleagues (1983) called this the **microbial loop**: it returns dissolved carbon to the food web, but each step respires part of it to CO₂. Viral lysis short-circuits it, releasing the contents of bacteria back to the DOM pool (the **viral shunt**; [[microbiology/viruses]]).

**The biological pump.** A fraction of the organic matter sinks out of the surface ocean as dead cells, faecal pellets and aggregates ("marine snow"), most of it to be decomposed by bacteria on the way down; the small part that reaches the deep sea or the sediment removes carbon from contact with the atmosphere for centuries or longer.

How efficiently heterotrophic bacteria convert the carbon they take up into new cells determines how much organic carbon is passed up the food web and how much is respired.

::: definition Bacterial growth efficiency {#def-bge}
The **bacterial carbon demand** (BCD) is the rate at which bacteria take up organic carbon, the sum of **bacterial production** (BP, carbon incorporated into biomass) and **bacterial respiration** (BR, carbon released as CO₂). The **bacterial growth efficiency** is $\mathrm{BGE} = \mathrm{BP}/\mathrm{BCD} = \mathrm{BP}/(\mathrm{BP} + \mathrm{BR})$. In natural waters it is typically low, about 0.1–0.3 in the open ocean and higher in productive coastal waters (Paul del Giorgio and Jonathan Cole, 1998).
:::

::: example Where does the carbon go? {#ex-bge}
In a coastal water sample, bacterial production, measured by the incorporation of radiolabelled leucine into protein, is 2 µg C L⁻¹ d⁻¹, and the growth efficiency is estimated at 0.2. Primary production by phytoplankton is 40 µg C L⁻¹ d⁻¹. (a) What are the bacterial carbon demand and respiration? (b) What fraction of the primary production passes through bacteria? (c) If protists graze the bacterial production with a growth efficiency of 0.3, how much carbon reaches the protists' biomass?
::: solution
(a) $\mathrm{BCD} = \mathrm{BP}/\mathrm{BGE} = 2/0.2 = 10$ µg C L⁻¹ d⁻¹; $\mathrm{BR} = 10 - 2 = 8$ µg C L⁻¹ d⁻¹.

(b) $10/40 = 25\,\%$ of primary production is processed by bacteria (assuming the dissolved carbon they use comes from the local phytoplankton).

(c) $0.3\times2 = 0.6$ µg C L⁻¹ d⁻¹, only 1.5 % of the primary production, after two steps. Most of the carbon entering the microbial loop is respired to CO₂ — the loop is more a "sink" than a "link" to higher trophic levels, a question long debated in marine ecology.
:::
:::

**Decomposition** on land is carried out by bacteria and fungi. Cellulose is degraded by both, aerobically and anaerobically; lignin, the second most abundant biopolymer, is degraded efficiently mainly by white-rot fungi, aerobically, which is one reason why waterlogged peat accumulates. Soil organic matter holds about two to three times as much carbon as the atmosphere, and the balance between its formation and its microbial decomposition, which accelerates with warming, is a major uncertainty in predictions of climate change.

**The methane cycle.** In anoxic environments where sulfate and other acceptors are scarce — wetlands, rice paddies, landfills, freshwater sediments and the rumen — the end product of decomposition is methane, made by methanogenic archaea from H₂ + CO₂, acetate and methyl compounds supplied by fermenters ([[microbiology/microbial-metabolism]]). Methane is a greenhouse gas many times more potent than CO₂ per molecule, and microbial methanogenesis in natural wetlands, agriculture (ruminants and rice) and waste is the source of most methane emissions. But much of the methane produced never reaches the atmosphere: it is consumed by aerobic **methanotrophs** (such as *Methylococcus*) at oxic–anoxic boundaries and by anaerobic methane-oxidising archaea, in consortia with sulfate reducers, in marine sediments ([[diversity-of-life/bacteria-archaea]]). In ocean sediments these anaerobic oxidisers are thought to consume most of the methane produced below them.

## The nitrogen cycle

Nitrogen exists in nature in oxidation states from −3 (NH₃, organic nitrogen) to +5 (nitrate), and microbes move it between them.

| process | transformation | conditions | organisms |
|---|---|---|---|
| nitrogen fixation | N₂ → NH₃ | energy-rich, low O₂ around nitrogenase | diazotrophs: rhizobia, cyanobacteria, *Azotobacter*, clostridia, some methanogens |
| assimilation | NH₄⁺, NO₃⁻ → organic N | anywhere | plants, microbes |
| ammonification (mineralisation) | organic N → NH₄⁺ | anywhere | decomposers |
| nitrification | NH₄⁺ → NO₂⁻ → NO₃⁻ | oxic | ammonia-oxidising bacteria and archaea, nitrite oxidisers, comammox *Nitrospira* |
| denitrification | NO₃⁻ → NO₂⁻ → NO → N₂O → N₂ | anoxic, with organic or inorganic donors | many facultative bacteria |
| dissimilatory nitrate reduction to ammonium (DNRA) | NO₃⁻ → NH₄⁺ | anoxic, high ratio of organic carbon to nitrate | many bacteria |
| anammox | NH₄⁺ + NO₂⁻ → N₂ | anoxic | Brocadiales (Planctomycetota) |

Fixation and the two N₂-producing processes, denitrification and anammox, connect the biosphere with the atmospheric pool; the others cycle nitrogen within ecosystems. Anammox, predicted on thermodynamic grounds by Engelbert Broda in 1977 and discovered in a wastewater reactor in the 1990s, is now thought to account for a large part of the N₂ produced in some marine oxygen minimum zones and sediments, its share relative to denitrification varying widely between sites.

Humans have roughly doubled the rate at which fixed nitrogen enters the land surface, mainly through the Haber–Bosch process and the cultivation of legumes. Much of the excess is nitrified and leached as nitrate, polluting ground water and causing **eutrophication** of lakes and coastal seas, or denitrified with release of N₂O.

::: example Nitrification acidifies soil {#ex-nitrification-acid}
The overall reaction of nitrification is NH₄⁺ + 2 O₂ → NO₃⁻ + 2 H⁺ + H₂O. A farmer applies 100 kg of nitrogen per hectare as an ammonium fertiliser, all of which is nitrified (and none taken up as ammonium by plants). (a) How many moles of H⁺ are produced per hectare? (b) How much calcium carbonate (CaCO₃, 100 g mol⁻¹, which neutralises two H⁺ per formula unit) would be needed to neutralise them?
::: solution
(a) 100 kg N is $100{,}000/14 = 7{,}140$ mol; two H⁺ per N gives $14{,}300$ mol H⁺ per hectare.

(b) $14{,}300/2 = 7{,}140$ mol CaCO₃, which is $7{,}140\times100$ g $= 714$ kg of limestone. (Uptake of nitrate by plants consumes some of the acid, so the real requirement is lower, but the calculation shows why soils under ammonium fertilisers acidify and are limed.)
:::
:::

::: example Feeding denitrifiers in a treatment plant {#ex-denitrification}
A wastewater plant removes nitrate by denitrification, adding acetate as electron donor: 5 CH₃COO⁻ + 8 NO₃⁻ + 3 H⁺ → 10 HCO₃⁻ + 4 N₂ + 4 H₂O. (a) Check the electron balance (acetate carbon goes from oxidation state 0 to +4; nitrate nitrogen from +5 to 0). (b) What mass of acetate (59 g mol⁻¹) is needed to remove 1 kg of nitrate-nitrogen, ignoring the acetate used for cell growth? (c) Express this as chemical oxygen demand (COD; one mole of acetate needs 2 mol O₂ for complete oxidation).
::: solution
(a) Each acetate (2 C, average oxidation state 0) releases 8 electrons on oxidation to 2 HCO₃⁻: $5\times8 = 40$ electrons. Each nitrate accepts 5 electrons in going to ½ N₂: $8\times5 = 40$. Balanced.

(b) 1 kg N is 71.4 mol nitrate; acetate needed $= 71.4\times5/8 = 44.6$ mol, or $44.6\times59 = 2.6$ kg.

(c) $44.6\times2 = 89.3$ mol O₂ $= 89.3\times32$ g $= 2.86$ kg COD per kg N — the standard theoretical figure used in designing such plants, before allowing for growth. Anammox, which needs no organic donor at all, saves this cost, which is one reason it is used in modern treatment of nitrogen-rich wastewater.
:::
:::

## The sulfur cycle

Sulfur cycles between sulfate (+6), the abundant form in sea water (about 28 mmol L⁻¹), elemental sulfur (0), and sulfide (−2). **Sulfate reduction** in anoxic sediments produces H₂S, and in marine sediments it is one of the main pathways by which organic matter is mineralised ([[microbiology/microbial-metabolism]]). Sulfide diffusing upwards is oxidised, chemically or by **sulfide oxidisers** — chemolithotrophs such as *Beggiatoa* and *Thiobacillus* at oxic boundaries, or anoxygenic phototrophs (purple and green sulfur bacteria) where light reaches anoxic water. Some bacteria **disproportionate** intermediate compounds such as thiosulfate or elemental sulfur into sulfate and sulfide.

In marine sediments, filamentous **cable bacteria** of the family Desulfobulbaceae, centimetres long, couple sulfide oxidation at depth to oxygen reduction at the surface by conducting electrons along their length (Christian Pfeffer, Lars Peter Nielsen and colleagues, 2012) — a form of metabolism, electrical rather than chemical, that was unknown until recently.

Sulfur also enters the atmosphere through microbes. Many marine algae make dimethylsulfoniopropionate (DMSP) as an osmolyte; bacteria degrade it, partly to **dimethyl sulfide** (DMS), the main natural source of sulfur to the atmosphere. Robert Charlson, James Lovelock and colleagues (1987) proposed that DMS, by forming aerosols that seed clouds, could act in a climate feedback loop (the "CLAW hypothesis"); later work has found the feedback, if it exists, to be weaker and more complicated than first thought.

::: quiz
Which pair of processes, operating together, would lead to the net loss of fixed nitrogen from a soil to the atmosphere?
- [ ] Nitrogen fixation and ammonification
- [x] Nitrification followed by denitrification
- [ ] Ammonification followed by assimilation
- [ ] Nitrification followed by assimilation
::: solution
Nitrification converts ammonium to nitrate in oxic zones; denitrification reduces nitrate to N₂ (and some N₂O) in anoxic microsites, which escapes to the atmosphere. The two are often coupled in soils and sediments across oxic–anoxic boundaries. Fixation adds nitrogen; ammonification and assimilation keep it in the system.
:::
:::

::: warning "Everything is everywhere" has limits
Baas Becking's dictum ([[microbiology/microbial-world#def-enrichment]]) captures something true: microbes disperse widely, and the environment strongly selects which ones grow. But sequencing has shown that many microbes do have biogeographic patterns, with communities differing by distance as well as by environment, endemic lineages in isolated hot springs (*Sulfolobus* populations from different continents are genetically distinct; Rachel Whitaker and colleagues, 2003), and dispersal limitation for organisms that cannot survive transport. Equally, the fact that a gene for a process is present in a metagenome does not show that the process is happening: genes must be expressed, enzymes active and conditions suitable. Measuring rates directly, with isotopes, remains essential.
:::

## How microbial ecologists measure processes

Microbial ecology combines the identification of organisms with the measurement of what they do:

- **Microsensors** for O₂, H₂S, pH, N₂O and other species, with tips a few micrometres across, measure profiles in biofilms, sediments and mats at the scale of the organisms.
- **Isotope tracers** measure rates: ¹⁵N-labelled nitrate or ammonium distinguish denitrification from anammox; ¹⁴C or ¹³C bicarbonate measure CO₂ fixation; ³⁵S sulfate measures sulfate reduction.
- **Stable isotope probing** (SIP) links function to identity: a community is fed a ¹³C-labelled substrate, and DNA or RNA from the organisms that incorporated it is separated by its higher density and sequenced (Stefan Radajewski, J. Colin Murrell and colleagues, 2000, with methanol-using bacteria).
- **Single-cell methods** such as NanoSIMS, an ion microprobe that maps isotopes at sub-micrometre resolution, combined with FISH, show which individual cells took up a labelled substrate.
- **Metatranscriptomics** and **metaproteomics** show which genes are being expressed in a community.

::: intuition A planet-sized redox battery
The cycles of carbon, nitrogen and sulfur are coupled through electrons. Photosynthesis uses light to separate them, putting reduced carbon (organic matter) in one place and oxidised compounds (O₂, and through it nitrate and sulfate) in another. Every other microbial process is a way of letting electrons flow back from the reduced to the oxidised pool, extracting energy as they go — fermenters, respirers and chemolithotrophs each taking one step. The layering of a sediment or a stratified lake, the coupling of nitrification and denitrification, and the consortia of methane oxidisers and sulfate reducers are all expressions of that single flow, organised in space by diffusion.
:::

::: application Microbial ecology at work
Wastewater treatment is applied microbial ecology: activated sludge, biofilm reactors, nitrifying and denitrifying stages and anaerobic digesters are communities assembled and managed for particular functions, and anammox reactors now remove nitrogen with less energy and no added carbon. **Bioremediation** uses microbial communities to degrade pollutants: oil spills are degraded by hydrocarbon-oxidising bacteria such as *Alcanivorax*, whose growth can be stimulated by adding nitrogen and phosphorus, and chlorinated solvents in ground water are dechlorinated by *Dehalococcoides* in anoxic aquifers. In agriculture, inoculation of legumes with effective rhizobia, and inhibitors of nitrification that reduce nitrate leaching and N₂O emission, depend on the same knowledge.
:::

::: history
Winogradsky and Beijerinck founded microbial ecology with enrichment cultures and the discovery of chemolithotrophs and nitrogen fixers (1880s–1900s). Thomas Brock's studies of Yellowstone hot springs from the 1960s brought ecological thinking to microbes in their natural habitats. Hobbie's epifluorescence counts (1977) revealed the true abundance of bacteria in water, Azam described the microbial loop (1983), and Chisholm and colleagues discovered *Prochlorococcus* (1988). Microelectrodes (from the 1980s), 16S rRNA sequencing from the environment (from 1985), stable isotope probing (2000) and metagenomics (2004) gave the field its modern tools. Discoveries of anammox (1995–1999), anaerobic methane oxidation consortia (2000), comammox (2015) and cable bacteria (2012) show that major processes of the elemental cycles were unknown until recently.
:::

::: summary
- Microbes live in microenvironments structured by gradients over micrometres; communities contain guilds with functional redundancy.
- Most microbes in nature live in biofilms, embedded in EPS; development runs from attachment to maturation and dispersal, controlled in part by cyclic di-GMP and quorum sensing.
- A substrate consumed at rate $q$ penetrates a biofilm to depth $\delta = \sqrt{2DC_0/q}$, with profile $C_0(1 - x/\delta)^2$; O₂ typically reaches tens to a few hundred micrometres, leaving anoxic, slow-growing interiors.
- Microbes interact by mutualism (syntrophy, cross-feeding), commensalism, competition, antagonism and predation; public goods invite cheaters, and cooperation is favoured by relatedness in structured populations.
- Symbioses include legume–rhizobium nodules (flavonoids, Nod factors, bacteroids), chemosynthetic symbionts of vent animals, insect endosymbionts, the squid–*Vibrio* light organ, corals and lichens.
- Carbon: marine microbes fix about half of global primary production; the microbial loop, viral shunt and biological pump route it; bacterial growth efficiency $\mathrm{BP}/(\mathrm{BP} + \mathrm{BR})$ is often 0.1–0.3. Methanogens make, and methanotrophs consume, much of the methane.
- Nitrogen: fixation, assimilation, ammonification, nitrification, denitrification, DNRA and anammox; humans have roughly doubled inputs of fixed nitrogen.
- Sulfur: sulfate reduction, sulfide oxidation (chemolithotrophic and phototrophic), disproportionation, cable bacteria, and DMS production.
- Rates are measured with microsensors, isotope tracers, SIP and NanoSIMS; gene presence alone does not demonstrate activity.
:::

## Exercises

::: exercise Penetration depth {level=1 check="100"}
Using [[#eq-penetration]], calculate the O₂ penetration depth in µm for $C_0 = 250$ µmol L⁻¹, $D = 2000$ µm² s⁻¹ and $q = 100$ µmol L⁻¹ s⁻¹.
::: solution
$\delta = \sqrt{2\times2000\times250/100} = \sqrt{10{,}000} = 100$ µm.
:::
:::

::: exercise Growth efficiency {level=1 check="0.25"}
Bacteria in a lake take up 12 µg C L⁻¹ d⁻¹ of dissolved organic carbon and respire 9 µg C L⁻¹ d⁻¹. What is their growth efficiency?
::: solution
$\mathrm{BP} = 12 - 9 = 3$ µg C L⁻¹ d⁻¹, so $\mathrm{BGE} = 3/12 = 0.25$.
:::
:::

::: exercise Naming the process {level=1}
Name the nitrogen-cycle process: (a) ammonium appears when proteins decompose; (b) nitrate disappears in a waterlogged soil and N₂O and N₂ are released; (c) ammonium and nitrite disappear together in an anoxic reactor, producing N₂; (d) ammonium is converted to nitrate in a well-aerated soil; (e) nitrate is converted to ammonium in an organic-rich anoxic sediment.
::: solution
(a) Ammonification. (b) Denitrification. (c) Anammox. (d) Nitrification. (e) Dissimilatory nitrate reduction to ammonium (DNRA).
:::
:::

::: exercise Square-root scaling {level=2}
(a) Using [[#prop-penetration]], by what factor does the penetration depth change if the surface O₂ concentration is halved? (b) If the biofilm's cells double their respiration rate? (c) A biofilm in a pipe is 1 mm thick and fully oxic. What does this suggest about its activity?
::: solution
(a) $\delta \propto \sqrt{C_0}$: it falls by $\sqrt2$, to 71 % of its former value. (b) $\delta \propto 1/\sqrt q$: it also falls to 71 %. (c) With $C_0 = 250$ µmol L⁻¹ and $D = 2000$ µm² s⁻¹, full penetration to 1,000 µm requires $q \le 2DC_0/\delta^2 = 2\times2000\times250/10^6 = 1$ µmol L⁻¹ s⁻¹ — fifty times lower than in the active biofilm of [[#ex-penetration]]. The biofilm must be largely inactive (or the O₂ supply must be by advection through channels rather than by diffusion alone).
:::
:::

::: exercise Cheaters in a biofilm {level=2}
A *Pseudomonas aeruginosa* mutant that does not make the siderophore pyoverdine grows faster than the wild type when the two are mixed in iron-limited liquid culture, but slower than the wild type when grown alone. (a) Explain both results. (b) Predict what happens in a biofilm founded by single cells, in which clones grow as separate patches. (c) How does this illustrate the role of relatedness?
::: solution
(a) Alone, the mutant cannot obtain iron and grows poorly. Mixed, it uses the pyoverdine made by the wild type without paying the cost of making it, so it outgrows the producers: a cheater exploiting a public good. (b) In separate clonal patches, pyoverdine stays mostly near its producers, so wild-type patches benefit from their own siderophore and mutant patches suffer; the wild type should increase in frequency. (c) Cooperation (producing a shared good) is favoured when the beneficiaries are likely to share the cooperator's genes — high relatedness, here produced by spatial structure — as kin selection theory predicts.
:::
:::

::: exercise Methane budget {level=2 check="0.1"}
In a rice paddy, methanogens produce 50 mg CH₄ m⁻² d⁻¹, but methanotrophs in the oxic surface layer and the oxic zone around the roots oxidise 45 mg CH₄ m⁻² d⁻¹ of it. (a) What fraction of the methane produced escapes to the atmosphere? (b) Draining the paddy in mid-season reduces production to 20 mg CH₄ m⁻² d⁻¹ while oxidation removes 18. What is the emission now, and what other gas might be emitted more after drainage?
::: solution
(a) $(50 - 45)/50 = 0.1$, so 10 % escapes. (b) $20 - 18 = 2$ mg CH₄ m⁻² d⁻¹, a 60 % reduction in emission. Drainage brings oxygen into the soil, stimulating nitrification; when the soil is re-flooded, or in anoxic microsites, denitrification of the accumulated nitrate can release more N₂O, a trade-off in managing paddy emissions.
:::
:::

::: exercise Nitrogen removal costs {level=2 check="1.90"}
Using the stoichiometry 6 NO₃⁻ + 5 CH₃OH → 3 N₂ + 5 CO₂ + 7 H₂O + 6 OH⁻, calculate the mass of methanol (32 g mol⁻¹) in kg needed to denitrify 1 kg of nitrate-nitrogen, ignoring the methanol used for growth (two decimal places). Check the electron balance first (methanol carbon goes from −2 to +4).
::: solution
Electrons: $5\times6 = 30$ from methanol, $6\times5 = 30$ accepted by nitrate. 1 kg N is 71.4 mol nitrate. Methanol needed: $71.4\times5/6 = 59.5$ mol, $59.5\times32 = 1{,}905$ g $= 1.90$ kg. In practice more is needed, because part of the methanol is assimilated into new cells and part is respired with any oxygen present.
:::
:::

::: exercise Reading a microbial mat {level=3}
A laminated microbial mat in a hypersaline lagoon has, from the top down: a green layer 1–2 mm thick; a purple layer; a black layer smelling of sulfide. Microsensor profiles in daylight show O₂ rising to three times air saturation at 1 mm depth and falling to zero at 3 mm, with sulfide appearing just below; at night, O₂ penetrates only 0.5 mm and sulfide rises almost to the surface. (a) Identify the likely organisms in each layer. (b) Explain the day–night changes. (c) Why might such mats resemble the earliest ecosystems on Earth, and what fossil structures are thought to record them?
::: solution
(a) Green: oxygenic cyanobacteria (with diatoms); purple: anoxygenic purple sulfur bacteria using light that passes through the green layer and sulfide diffusing up; black: sulfate reducers producing H₂S, with iron sulfides giving the colour. (b) In the light, cyanobacterial photosynthesis produces O₂ faster than it is consumed, supersaturating the top layer and pushing the oxic–anoxic boundary down, where sulfide is oxidised by chemolithotrophs and phototrophs. At night, photosynthesis stops, respiration consumes O₂ near the surface, and sulfide diffuses upwards — the mat switches between largely oxic and largely anoxic in a daily cycle, and many of its organisms switch metabolism accordingly. (c) Before animals evolved to graze them, microbial mats probably covered shallow sea floors; layered, mineralised mats form stromatolites, which are found in rocks up to about 3.5 billion years old (with debate over the oldest) and are among the earliest evidence of life ([[diversity-of-life/origin-of-life]]).
:::
:::

::: exercise Isotopes distinguish pathways {level=3}
Sediment from an oxygen minimum zone is incubated anoxically with ¹⁵NH₄⁺ plus unlabelled ¹⁴NO₂⁻. After 24 h, labelled N₂ is found almost entirely as ²⁹N₂ (¹⁴N¹⁵N), with little ³⁰N₂. In a second incubation with ¹⁵NO₃⁻ only, labelled N₂ is mostly ³⁰N₂. (a) Which process produced the ²⁹N₂ in the first incubation, and why? (b) Which produced the ³⁰N₂ in the second? (c) Why is it important to distinguish them for the nitrogen budget of the ocean?
::: solution
(a) Anammox: it combines one N atom from ammonium with one from nitrite, so ¹⁵NH₄⁺ plus ¹⁴NO₂⁻ gives ¹⁴N¹⁵N. Denitrification does not use ammonium, so it cannot put ¹⁵N from ammonium into N₂. (b) Denitrification of ¹⁵NO₃⁻ pairs two labelled atoms from the nitrate pool, giving ³⁰N₂ (anammox with labelled nitrate-derived nitrite and unlabelled ammonium would give ²⁹N₂). (c) Both remove fixed nitrogen, but they have different controls — denitrification needs organic matter, anammox ammonium and nitrite — and different by-products (denitrification can release N₂O). Predicting how nitrogen loss will respond to changes in productivity or expanding oxygen minimum zones requires knowing which process dominates.
:::
:::
