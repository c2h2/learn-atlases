A bacterium such as *Escherichia coli* is a cylinder about a micrometre across and two long, with a volume of roughly a femtolitre. Into that volume it packs a genome of 4.6 million base pairs, tens of thousands of ribosomes and some three million protein molecules, and it holds them together against an internal osmotic pressure that would burst an unprotected membrane in a fraction of a second. It swims by spinning helical propellers with a rotary motor, steers towards food by comparing concentrations over time, and in some species can turn itself into a spore that survives boiling. Every one of these abilities depends on structures that differ from those of eukaryotic cells.

This chapter describes the structure of bacterial and archaeal cells from the outside in: shape, the cytoplasmic membrane, the cell wall and the layers outside it, the appendages used for movement and attachment, the contents of the cytoplasm, and the endospore. It ends with the ways in which archaeal cells differ. The general plan of prokaryotic and eukaryotic cells is in [[cell-biology/cells-and-microscopy]], membranes in [[cell-biology/membranes]], and an overview of the envelopes of the two prokaryotic domains in [[diversity-of-life/bacteria-archaea#def-envelope]]; here we go into the detail that explains how these cells work and how antibiotics and the immune system attack them.

## Shape and size

Most bacteria are **cocci** (spheres), **rods** (bacilli) or **spirals**. Cocci may stay together after division in pairs (diplococci), chains (streptococci, dividing in one plane) or grape-like clusters (staphylococci, dividing in several planes). Curved rods are called vibrios, rigid helical cells spirilla, and flexible helical cells with internal flagella spirochaetes. Other shapes include stalked and budding cells (*Caulobacter*, *Hyphomicrobium*), branching filaments (*Streptomyces*) and the square, flat cells of the haloarchaeon *Haloquadratum walsbyi*.

Shape is not a passive consequence of turgor, which would make every cell spherical. It is built and maintained by proteins that direct where new wall material is inserted. In rod-shaped bacteria, filaments of **MreB**, a homologue of actin, move around the cell circumference beneath the membrane and guide the enzymes that insert peptidoglycan into the side wall; cells lacking MreB become round. The tubulin homologue **FtsZ** forms a ring at mid-cell that recruits the machinery for division, and in *Caulobacter crescentus* the intermediate-filament-like protein crescentin produces the crescent shape (Nora Ausmees, Jeffrey Kuhn and Christine Jacobs-Wagner, 2003). The bacterial cytoskeleton is described further in [[cell-biology/cytoskeleton]].

Why should shape matter? A cell takes up nutrients through its surface and uses them throughout its volume, so the ratio of surface to volume limits how fast it can grow ([[cell-biology/cells-and-microscopy#prop-sv]]). Elongated shapes also affect swimming, attachment and how easily a cell is eaten by protists.

::: example Rods versus spheres {#ex-rod}
Model an *E. coli* cell as a cylinder of radius $r = 0.5$ µm capped by two hemispheres, with a total length of 2 µm. Calculate its volume, its surface area and its surface-to-volume ratio, and compare with a sphere of the same volume.
::: solution
The cylindrical part has length $2 - 2r = 1$ µm. Volume: $\pi r^2 \times 1 + \tfrac43\pi r^3 = 0.785 + 0.524 = 1.309$ µm³, about 1.3 fL. Surface: $2\pi r\times 1 + 4\pi r^2 = 3.142 + 3.142 = 6.283$ µm². So $S/V = 4.80$ µm⁻¹. A sphere with the same volume has radius $(3V/4\pi)^{1/3} = 0.679$ µm and $S/V = 3/0.679 = 4.42$ µm⁻¹. The rod has about 9 % more surface per unit volume, and as it grows by elongation at constant width its $S/V$ falls only slowly, approaching the value for an infinite cylinder, $2/r = 4$ µm⁻¹, whereas a growing sphere's $S/V$ falls as $3/r$.
:::
:::

## The cytoplasmic membrane

The cytoplasmic membrane is a phospholipid bilayer about 8 nm thick, crowded with proteins (proteins make up more than half its mass). Bacterial membranes are built from fatty acids ester-linked to glycerol-3-phosphate, like those of eukaryotes, but most bacteria lack sterols; many contain **hopanoids**, pentacyclic molecules that are thought to play a similar part in ordering and stabilising the bilayer. The membrane is the cell's permeability barrier ([[cell-biology/membranes]]) and, since prokaryotes have no mitochondria or chloroplasts, it is also where respiration and photosynthesis generate the **proton-motive force** ([[biochemistry/oxidative-phosphorylation#prop-pmf]]) that drives ATP synthesis, transport and the flagellar motor.

Bacteria take up nutrients at concentrations as low as nanomolar, and their transport systems are correspondingly diverse:

- **Secondary transporters** use an existing ion gradient: symporters such as the lactose permease LacY couple uptake of a solute to the inward movement of a proton ([[cell-biology/membrane-transport#def-transporters]]).
- **ABC transporters** hydrolyse ATP. In Gram-negative bacteria many have a periplasmic binding protein that captures the substrate with high affinity and delivers it to the membrane complex.
- **Group translocation** modifies the substrate as it enters. In the **phosphotransferase system** (PTS; Werner Kundig, Sudhamoy Ghosh and Saul Roseman, 1964), a phosphate group from phosphoenolpyruvate is passed along a chain of proteins and attached to a sugar such as glucose as it crosses the membrane, so that the cell takes up glucose 6-phosphate, which cannot leak out again. The PTS also signals the presence of glucose to the regulatory network that causes catabolite repression ([[molecular-biology/bacterial-gene-regulation#def-cap]]).

## The cell wall

### Peptidoglycan

Almost all bacteria are surrounded by a wall of **peptidoglycan** (murein), a single, enormous, bag-shaped molecule that encloses the whole cell — Wolfhard Weidel and Helmut Pelzer (1964) called it a "bag-shaped macromolecule".

::: definition Peptidoglycan {#def-peptidoglycan}
**Peptidoglycan** is a polymer of glycan strands of alternating *N*-acetylglucosamine (NAG) and *N*-acetylmuramic acid (NAM), joined by β-1,4 glycosidic bonds, with a short peptide attached to the lactyl group of each NAM. In *E. coli* the peptide is L-alanine–D-glutamate–*meso*-diaminopimelate–D-alanine (a tetrapeptide in the mature wall); in *Staphylococcus aureus* and many other Gram-positive bacteria L-lysine replaces diaminopimelate. Peptides on neighbouring strands are **cross-linked**, usually from the D-alanine at position 4 of one peptide to the diamino acid at position 3 of another, either directly (*E. coli*) or through a bridge of amino acids (five glycines in *S. aureus*). The D-amino acids and diaminopimelate are found almost nowhere else in nature.
:::

The cross-links make the wall a covalent net that resists stretching in every direction. Its synthesis runs across the membrane. In the cytoplasm, NAM is attached to the lipid carrier undecaprenyl (bactoprenol) phosphate, the pentapeptide is added (ending in D-Ala–D-Ala), then NAG, forming **lipid II**. A flippase moves lipid II across the membrane, where **glycosyltransferases** add its disaccharide to a growing glycan strand and **transpeptidases** form cross-links: the transpeptidase cleaves the terminal D-alanine of a pentapeptide and joins the penultimate D-alanine to the amino group of a neighbouring peptide. Because the energy for the new peptide bond comes from the bond that is broken, cross-linking can happen outside the cell without ATP.

Many antibiotics act on this pathway ([[microbiology/antimicrobials]]). β-Lactams such as penicillin mimic the D-Ala–D-Ala end of the peptide and acylate the active-site serine of the transpeptidases, which are therefore called **penicillin-binding proteins** (PBPs). Vancomycin binds the D-Ala–D-Ala end itself and blocks both reactions. Peptidoglycan is also attacked by the host: **lysozyme**, in tears, saliva and egg white, hydrolyses the β-1,4 bond between NAM and NAG.

### Holding back the pressure

A bacterium's cytoplasm is far more concentrated than most of the environments it lives in, so water tends to flow in. The wall resists the resulting **turgor pressure**. Two pieces of physics tell us how large the pressure is and how much stress it puts on the wall.

::: proposition Osmotic pressure and wall stress {#prop-turgor}
(a) For dilute solutions, the osmotic pressure difference across a membrane permeable to water but not to solutes is given by van 't Hoff's law,

$$
\Delta\Pi = \Delta c\,RT,
$$ {#eq-vanthoff}

where $\Delta c$ is the difference in total concentration of osmotically active particles (osmolarity, in mol m⁻³), $R = 8.314$ J mol⁻¹ K⁻¹ and $T$ is the absolute temperature. At equilibrium the turgor pressure $P$ equals $\Delta\Pi$.

(b) A thin-walled cylinder of radius $r$ and wall thickness $t \ll r$ with internal excess pressure $P$ carries a circumferential (hoop) stress and an axial stress

$$
\sigma_\theta = \frac{Pr}{t}, \qquad \sigma_z = \frac{Pr}{2t};
$$ {#eq-laplace}

a sphere carries $\sigma = Pr/(2t)$ in every direction. These are the Laplace relations of thin-shell mechanics.
:::

::: proof
(b) Cut a cylinder of length $L$ along a plane through its axis. The pressure pushes the two halves apart with a force equal to $P$ times the projected area, $P\times 2rL$; the wall resists it across two cut edges of total area $2tL$, so $\sigma_\theta\cdot 2tL = 2rLP$, giving $\sigma_\theta = Pr/t$. Cutting across the axis instead, the force on the end is $P\pi r^2$ and the wall area resisting it is $2\pi rt$, so $\sigma_z = Pr/(2t)$. For a sphere every plane through the centre is like the second cut. ((a) follows from equating the chemical potential of water on the two sides; see [Chemistry Atlas](/learn/chemistry/) for the derivation.)
:::

::: example How strong must the wall be? {#ex-turgor}
Suppose the cytoplasm of a rod-shaped bacterium exceeds its medium by 0.1 osmol L⁻¹ at 37 °C. (a) What is the turgor pressure, in pascals and atmospheres? (b) What hoop stress does the peptidoglycan carry if the cell radius is 0.5 µm and the load-bearing layer is 4 nm thick, as in a Gram-negative cell? (c) And if it is 30 nm thick, as in a Gram-positive cell?
::: solution
(a) $\Delta c = 0.1$ osmol L⁻¹ $= 100$ mol m⁻³. $P = 100\times8.314\times310 = 2.58\times10^{5}$ Pa, about 2.5 atm (1 atm = $1.013\times10^5$ Pa).

(b) $\sigma_\theta = Pr/t = 2.58\times10^5\times0.5\times10^{-6}/(4\times10^{-9}) = 3.2\times10^{7}$ Pa, about 32 MPa.

(c) With $t = 30$ nm, $\sigma_\theta = 4.3$ MPa.

The thin Gram-negative wall carries a stress comparable to that in a taut rubber band, which is why Gram-negative bacteria cannot tolerate as high a turgor as Gram-positive ones. Measured turgor pressures vary with the method and the conditions: estimates for *E. coli* range from about 0.3 atm (by atomic force microscopy; Yi Deng, Mingzhai Sun and Joshua Shaevitz, 2011) to a few atmospheres, and classical estimates for Gram-positive bacteria are an order of magnitude higher.
:::
:::

::: widget plot
f: 0.101325*P*1000*r/x
x: 2, 40
y: 0, 80
sliders: P=2.5:0.5:20:0.5; r=0.5:0.2:1.5:0.05
labels: \sigma_\theta\ \text{(MPa)}
caption: Hoop stress in the wall, $\sigma_\theta = Pr/t$, against the thickness $t$ of the load-bearing peptidoglycan (nm, horizontal axis), for turgor $P$ in atmospheres and cell radius $r$ in µm. With $P = 2.5$ atm and $r = 0.5$ µm, a 4 nm wall carries about 32 MPa. Raise $P$ to 20 atm, as estimated for some Gram-positive bacteria, and notice that only a thick wall keeps the stress moderate; widen the cell and the stress rises in proportion.
:::

The pressure also explains why antibiotics and enzymes that damage the wall kill growing cells. If lysozyme removes the wall from cells in a medium of the same osmolarity as the cytoplasm (for example 0.5 mol L⁻¹ sucrose), the cells survive as spherical **protoplasts** (Gram-positive) or **spheroplasts** (Gram-negative, which keep the outer membrane); in dilute medium they swell and burst (**osmotic lysis**). Bacteria also sense and adjust turgor: they import K⁺ and accumulate "compatible solutes" such as glycine betaine, proline and trehalose in salty media, and open **mechanosensitive channels** (MscL, MscS) to release solutes when diluted suddenly.

### Gram-positive and Gram-negative envelopes

The Gram stain ([[diversity-of-life/bacteria-archaea]]) divides most bacteria by the architecture of their envelopes.

::: definition Gram-positive and Gram-negative envelopes {#def-gram}
A **Gram-positive** envelope has a cytoplasmic membrane and a thick, multilayered peptidoglycan wall (roughly 20–80 nm) interwoven with **teichoic acids** — polymers of glycerol phosphate or ribitol phosphate, either attached to NAM (wall teichoic acids) or anchored in the membrane by a lipid (lipoteichoic acids). They give the wall a strong negative charge and bind cations. A **Gram-negative** envelope has a thin peptidoglycan layer, a few nanometres thick, in the **periplasm**, an aqueous compartment between the cytoplasmic membrane and an **outer membrane**. The outer membrane's inner leaflet is phospholipid and its outer leaflet **lipopolysaccharide** (LPS); it is anchored to the peptidoglycan by Braun's lipoprotein, one of the most abundant proteins in *E. coli*.
:::

LPS has three parts: **lipid A**, a disaccharide of glucosamine carrying six or so fatty acids, which anchors it in the membrane; a **core oligosaccharide**; and the **O-antigen**, a long, highly variable chain of repeating sugar units. Lipid A is the "endotoxin" that triggers a strong innate immune response in animals when bacteria are lysed; the variable O-antigen is the basis of the serotypes used to distinguish strains such as *E. coli* O157. Divalent cations bridge the negatively charged LPS molecules, and chelating them with EDTA makes the outer membrane leaky.

The outer membrane is a second permeability barrier. Small hydrophilic molecules, below about 600 daltons, cross it through water-filled channels formed by **porins** (OmpF and OmpC in *E. coli*); larger molecules such as vitamin B₁₂ and iron–siderophore complexes need specific outer-membrane transporters energised from the cytoplasmic membrane through the TonB protein. The periplasm contains binding proteins for transport, enzymes that degrade nutrients and detoxify antibiotics (β-lactamases), and the machinery that folds and exports envelope proteins. The outer membrane is why many antibiotics that kill Gram-positive bacteria, such as vancomycin, are ineffective against Gram-negative ones: they cannot reach their targets.

Two further types of envelope deserve mention. **Mycobacteria** (and relatives in the Actinomycetota) have a peptidoglycan layer linked to the polysaccharide arabinogalactan, which in turn carries **mycolic acids**, very long (C₆₀–C₉₀) branched fatty acids that form a waxy outer membrane-like layer (the mycomembrane). The envelope is extremely impermeable, which helps make *Mycobacterium tuberculosis* slow-growing and resistant to many drugs and disinfectants; mycobacteria stain poorly by Gram's method and are identified by the **acid-fast** stain, which they retain even when washed with acidified alcohol. **Mycoplasmas** have no wall at all; they are small, pleomorphic, osmotically fragile, usually live in osmotically protected host environments, and are naturally resistant to β-lactams.

::: quiz
Lysozyme is added to a suspension of *E. coli* and of *Bacillus subtilis*, both in dilute buffer. *B. subtilis* lyses quickly; *E. coli* lyses only if EDTA is also added. Why?
- [ ] *E. coli* has no peptidoglycan.
- [ ] *E. coli* peptidoglycan contains L-lysine, which lysozyme cannot cleave.
- [x] The outer membrane of *E. coli* keeps lysozyme from reaching the peptidoglycan; EDTA removes the divalent cations that hold the LPS together.
- [ ] EDTA activates lysozyme.
::: solution
Lysozyme cleaves the NAM–NAG bond in both kinds of peptidoglycan, but it is a protein of about 14 kDa, far too large to pass through porins. The Gram-positive wall is exposed on the surface; the Gram-negative wall is behind the outer membrane. EDTA chelates the Mg²⁺ and Ca²⁺ that bridge LPS molecules, releasing some LPS and letting lysozyme through. Without the wall, the cells burst in dilute buffer.
:::
:::

## Outside the wall

Many prokaryotes secrete layers outside the wall. A **capsule** is a well-defined, firmly attached layer, usually of polysaccharide (but of poly-D-glutamate in *B. anthracis*); a **slime layer** is looser. Capsules hold water and protect against drying, help cells stick to surfaces, and in pathogens help them evade phagocytosis — Frederick Griffith's experiment of 1928, in which encapsulated, virulent *Streptococcus pneumoniae* transformed non-encapsulated ones, turned on exactly this property ([[genetics/microbial-genetics]]). In communities attached to surfaces, cells are embedded in an **extracellular polymeric substance** (EPS) of polysaccharides, proteins and DNA that forms the matrix of a **biofilm** ([[microbiology/microbial-ecology]]).

**S-layers** are two-dimensional crystalline arrays of a single protein or glycoprotein that cover the cell like a coat of tiles, with pores a few nanometres across. They are found in many bacteria and in nearly all archaea, where they often are the only wall.

## Appendages: flagella, pili and movement

### The bacterial flagellum

Many bacteria swim. The **flagellum** is a helical filament, 20 nm thick and up to 10–15 µm long, made of thousands of copies of the protein flagellin, connected by a flexible **hook** to a **basal body** embedded in the envelope. It does not beat like a eukaryotic flagellum; it rotates.

::: definition The flagellar motor {#def-motor}
The **flagellar motor** is a rotary machine in the cytoplasmic membrane. A **rotor** (the MS ring with the C ring, or switch complex, on its cytoplasmic face) turns inside a ring of up to about a dozen **stator** units (MotA₅MotB₂ in *E. coli*), each a channel through which protons flow down the proton-motive force; the flow drives rotation. In Gram-negative bacteria the rod passes through the peptidoglycan and outer membrane in bushings, the P and L rings. Some bacteria, such as *Vibrio* species, use Na⁺ instead of H⁺ for their polar flagella. Rotation can be counter-clockwise (CCW) or clockwise (CW), as seen from outside the cell, and the direction is switched by a signalling protein binding to the C ring.
:::

That flagella rotate was shown by Howard Berg and Robert Anderson (1973) from the structure, and directly by Michael Silverman and Melvin Simon (1974), who tethered *E. coli* cells to a glass slide by a single flagellum and watched the cell bodies spin. The motor of *E. coli* turns at up to about 300 revolutions per second at low load, and on the order of a thousand protons pass through it per revolution; Na⁺-driven motors of *Vibrio* have been measured at well over 1,000 revolutions per second. The flagellum is assembled from the base outwards: its subunits are exported through a central channel by a specialised secretion system that is homologous to the injectisome (type III secretion system) used by some pathogens to inject proteins into host cells ([[microbiology/microbes-and-hosts]]).

Flagella are arranged in characteristic ways: a single polar flagellum (**monotrichous**, as in *Vibrio cholerae*), a tuft at one or both poles (**lophotrichous**), or many distributed over the surface (**peritrichous**, as in *E. coli*). In spirochaetes the flagella lie in the periplasm and their rotation makes the whole cell body undulate or rotate like a corkscrew, which lets them move through viscous media such as mucus.

### Life at low Reynolds number

Swimming at the scale of a bacterium is unlike anything in our experience. The ratio of inertial to viscous forces is measured by the **Reynolds number**

$$
\mathrm{Re} = \frac{\rho v L}{\eta},
$$

where $\rho$ is the density of the fluid, $v$ the speed, $L$ the size of the swimmer and $\eta$ the viscosity. For a person swimming, Re is about $10^6$; for a bacterium it is about $10^{-5}$–$10^{-4}$. Inertia is negligible. Edward Purcell, in a famous lecture (1977), pointed out that if a bacterium stops its motor it coasts for less than the diameter of an atom, and that reciprocal motion — a scallop opening and closing its shell — produces no net movement at all at low Re. A rotating helix is not reciprocal, which is why it works.

::: example Swimming numbers {#ex-reynolds}
*E. coli* swims at about 30 µm s⁻¹ and is about 2 µm long. (a) Calculate its Reynolds number in water ($\rho = 1000$ kg m⁻³, $\eta = 10^{-3}$ Pa s). (b) A small nutrient molecule has diffusion coefficient $D = 10^{-9}$ m² s⁻¹ (1000 µm² s⁻¹). Over what distance does the bacterium, swimming in a straight line, move faster than the molecule spreads by diffusion? Use the one-dimensional diffusion time $t \approx x^2/2D$. (c) How long do the two take to cover 1 mm?
::: solution
(a) $\mathrm{Re} = 1000\times30\times10^{-6}\times2\times10^{-6}/10^{-3} = 6\times10^{-5}$.

(b) Swimming time $x/v$ equals diffusion time $x^2/2D$ when $x = 2D/v = 2\times1000/30 = 67$ µm. Over shorter distances diffusion is faster: a bacterium cannot "outswim" the molecules in its immediate surroundings, so swimming does not increase the supply of nutrients to its surface by stirring.

(c) Diffusion: $(10^{-3})^2/(2\times10^{-9}) = 500$ s. Swimming: $10^{-3}/(30\times10^{-6}) = 33$ s. Over long distances swimming wins easily, so the value of motility is to move to *places* where food is more abundant — which requires the cell to know where they are.
:::
:::

::: widget plot
f: x^2/(2*D); x/v
x: 0, 200
y: 0, 8
sliders: D=1000:100:2000:50; v=30:5:100:1
labels: \text{diffusion } x^2/2D; \text{swimming } x/v
caption: Time (s) to cover a distance $x$ (µm) by diffusion and by swimming, for a molecule with diffusion coefficient $D$ (µm² s⁻¹) and a bacterium swimming at $v$ (µm s⁻¹). The curves cross at $x = 2D/v$, 67 µm with the starting values. Increase $v$ to 100 µm s⁻¹ (a fast marine bacterium) and the crossing moves to 20 µm; at distances below it diffusion is always faster.
:::

### Chemotaxis: a biased random walk

A swimming *E. coli* cannot measure a concentration gradient along its 2 µm body — the difference would be lost in noise. Instead it compares concentrations over time. Howard Berg and Douglas Brown (1972), following single cells with a tracking microscope, showed that *E. coli* alternates **runs**, about a second long, in which the flagella turn CCW and form a bundle that pushes the cell forward, with **tumbles**, about a tenth of a second, in which one or more motors switch to CW, the bundle flies apart and the cell reorients at random (by about 68° on average). When a cell happens to swim up a gradient of attractant, tumbles are suppressed and runs lengthen; when it swims down, runs are not lengthened. The result is a random walk biased towards the attractant.

The signalling pathway is one of the best understood in biology. Transmembrane **chemoreceptors** (methyl-accepting chemotaxis proteins, MCPs), clustered at the cell pole, control the histidine kinase **CheA** through the adaptor CheW. When attractant binds, CheA activity falls. CheA phosphorylates the response regulator **CheY**; CheY-P binds the switch protein FliM on the motor and promotes CW rotation, that is, tumbling. **CheZ** dephosphorylates CheY-P, keeping the signal brief. So attractant → less CheA activity → less CheY-P → fewer tumbles → longer runs. **Adaptation**, the "memory" that makes temporal comparison possible, comes from methylation of the receptors by **CheR** and demethylation by **CheB** (itself activated by CheA): over seconds, methylation resets receptor activity to its baseline in the new concentration, so the cell responds to changes, not to absolute levels, over a range of concentrations spanning about five orders of magnitude. This is a two-component system ([[molecular-biology/bacterial-gene-regulation]]) acting on a motor rather than on a promoter.

::: intuition Why compare over time?
A run of one second covers about 20–30 µm, ten or more body lengths, so comparing the concentration "now" with that "a second ago" is like comparing two points that far apart — a much larger baseline than the cell itself. The cell's memory is chemical: the methylation level of its receptors records the average concentration over the last few seconds, and the instantaneous occupancy of the receptors records the present. The difference between them drives the motor.
:::

::: example Space or time? {#ex-gradient}
An attractant is present at 1 µmol L⁻¹ and its concentration rises by 10 % per millimetre. (a) What is the relative difference in concentration between the two ends of a 2 µm cell, and between the start and end of a 25 µm run? (b) Howard Berg and Edward Purcell (1977) showed that a cell of size $a$ that counts molecules for a time $T$ can measure a concentration $c$ with relative precision of roughly $1/\sqrt{Dac T}$, up to a factor of order one. Estimate it for $D = 1000$ µm² s⁻¹, $a = 1$ µm, $T = 1$ s (1 µmol L⁻¹ is about 600 molecules per µm³). Which comparison can the cell make reliably?
::: solution
(a) The relative gradient is $0.1$ per mm $= 10^{-4}$ per µm. Across the body: $2\times10^{-4}$, or 0.02 %. Over a run: $25\times10^{-4} = 0.25\,\%$.

(b) $Dac T = 1000\times1\times600\times1 = 6\times10^5$, so the precision is about $1/\sqrt{6\times10^5} = 1.3\times10^{-3}$, or 0.13 %. A difference of 0.02 % across the body is buried in this noise; a difference of 0.25 % over a run is about twice the noise and can be detected, especially by averaging over several seconds. Temporal comparison along runs is not a quirk of *E. coli* but a consequence of physics for any cell this small.
:::
:::

### Pili and other ways of moving

**Pili** (singular pilus; also called fimbriae) are thin protein filaments, usually shorter and more numerous than flagella. Many carry **adhesins** at their tips that bind specific molecules on host cells or surfaces. **Conjugative pili** connect donor and recipient cells during conjugation ([[genetics/microbial-genetics#def-f-factor]]). **Type IV pili** can be extended and retracted by ATP-driven motors; repeated cycles of extension, attachment and retraction pull cells across surfaces in jerky **twitching motility** (*Pseudomonas aeruginosa*, *Neisseria*), and type IV pili also take up DNA in natural transformation. Other bacteria glide smoothly over surfaces without flagella or pili, using motors in the envelope (*Myxococcus*, *Flavobacterium*).

## Inside the cell

The cytoplasm of a bacterium is extremely crowded, with macromolecules at 300–400 mg mL⁻¹. Its main components are:

- **The nucleoid.** The chromosome — 4.6 Mb of DNA, a circle 1.5 mm long in *E. coli* — is compacted about a thousandfold into an irregular region without a membrane, by supercoiling and by nucleoid-associated proteins such as HU, H-NS and Fis. Many bacteria also carry **plasmids**, small circular (sometimes linear) DNA molecules that replicate independently and often carry genes for antibiotic resistance, toxins or unusual metabolism ([[microbiology/microbial-diversity]]). Some bacteria have linear chromosomes (*Borrelia*, *Streptomyces*) or more than one chromosome (*Vibrio cholerae* has two).
- **Ribosomes.** Prokaryotic 70S ribosomes (30S and 50S subunits, with 16S, 23S and 5S rRNAs) differ enough from eukaryotic 80S ribosomes to be selective targets for antibiotics such as streptomycin, tetracycline and erythromycin ([[molecular-biology/translation]]). A fast-growing *E. coli* cell may contain tens of thousands of them.
- **Storage inclusions.** Granules of **poly-β-hydroxybutyrate** (PHB) and other polyhydroxyalkanoates store carbon and are the basis of biodegradable bioplastics; glycogen stores glucose; **polyphosphate** (volutin) stores phosphate and energy; sulfur globules are stored by sulfide oxidisers such as *Beggiatoa*.
- **Gas vesicles**, hollow protein cylinders permeable to gases but not water, give buoyancy to aquatic cyanobacteria and haloarchaea, letting them regulate their depth in the water column.
- **Magnetosomes**, membrane-bounded crystals of magnetite (Fe₃O₄) or greigite (Fe₃S₄) aligned in a chain, make **magnetotactic bacteria** behave like compass needles (Richard Blakemore, 1975). The Earth's field is inclined, so swimming along it takes them up or down, towards the low-oxygen zone where they grow best.
- **Bacterial microcompartments**, polyhedral protein shells that enclose enzymes. **Carboxysomes** of cyanobacteria and many chemolithoautotrophs concentrate CO₂ around the enzyme RuBisCO, increasing the efficiency of carbon fixation.

Prokaryotic cells are not bags of enzymes. Many proteins localise to particular places — chemoreceptors and some division proteins to the poles, FtsZ to the middle — and some bacteria have elaborate internal membranes: the thylakoids of cyanobacteria, the stacked membranes of nitrifiers and methanotrophs, and the compartment in which anammox bacteria carry out their reactions.

## Endospores

When nutrients run out, *Bacillus*, *Clostridium* and some related members of the Bacillota form **endospores** — dormant cells built inside a mother cell. Endospores are the most resistant living structures known. They survive boiling for hours, drying, ultraviolet and ionising radiation and many disinfectants, and they can remain viable for decades or centuries. (Claims of revival after tens or hundreds of millions of years in amber or salt crystals remain controversial because contamination is so hard to exclude.)

::: definition Endospore {#def-endospore}
An **endospore** is a dormant, non-reproductive cell formed inside a vegetative cell by asymmetric division. From the inside out it consists of a **core** containing the chromosome, ribosomes and enzymes, in a partly dehydrated state with a large amount of **calcium dipicolinate** (about 10 % of the spore's dry weight); an inner membrane; a **cortex** of loosely cross-linked peptidoglycan; a multilayered protein **coat**; and in some species an outer **exosporium**. Small acid-soluble proteins (SASPs) bind and protect the DNA. Under favourable conditions a spore **germinates** and grows out into a vegetative cell.
:::

Sporulation in *B. subtilis* is a classic example of a developmental programme. The cell divides near one pole instead of at the middle, producing a small **forespore** and a large **mother cell**, which then **engulfs** the forespore so that it lies, surrounded by two membranes, in the mother cell's cytoplasm. The two compartments express different genes, controlled by a cascade of alternative sigma factors of RNA polymerase, each activated in turn by signals from the other compartment: σ^F^ in the forespore, then σ^E^ in the mother cell, then σ^G^ in the forespore and σ^K^ in the mother cell (work led by Richard Losick and others from the 1970s onwards). The mother cell builds the cortex and coat, the forespore core dehydrates and takes up dipicolinate, and finally the mother cell lyses, releasing the mature spore. The whole process takes about eight hours.

Spore resistance has several sources: the low water content of the core immobilises proteins and protects them from heat denaturation; SASPs change the conformation of DNA so that ultraviolet light produces less harmful lesions; the coat excludes enzymes and many chemicals; and DNA repair during germination fixes damage accumulated during dormancy. Endospores are why heat sterilisation must use steam under pressure at 121 °C ([[microbiology/antimicrobials]]), and why spore-forming bacteria are a concern in food canning.

::: warning Endospores are not reproduction
A sporulating bacterium produces one spore, which germinates into one cell: there is no increase in number. Endospores are a strategy for surviving, not multiplying — unlike the spores of fungi and of *Streptomyces*, which are produced in large numbers and disperse the organism. Note also that "spore-forming" is not the same as "Gram-positive": most Gram-positive bacteria (staphylococci, streptococci, lactic acid bacteria) do not form endospores.
:::

## How archaeal cells differ

Archaea look like bacteria under the light microscope, and they share the prokaryotic plan: no nucleus, a single circular chromosome in most species, coupled transcription and translation, 70S ribosomes. But in molecular detail their envelopes and appendages are different, and their machinery for handling information resembles that of eukaryotes.

| feature | Bacteria | Archaea |
|---|---|---|
| membrane lipids | fatty acids ester-linked to glycerol-3-phosphate; bilayer | isoprenoid chains ether-linked to glycerol-1-phosphate; bilayer of diethers or monolayer of membrane-spanning tetraethers |
| wall | peptidoglycan (except mycoplasmas and a few others) | never peptidoglycan; usually an S-layer; pseudomurein in some methanogens; other polysaccharide walls |
| motility | flagellum, rotated by an ion flux | archaellum, rotated by ATP hydrolysis, related to type IV pili |
| cell division | FtsZ-based in nearly all | FtsZ in many; ESCRT-III-related Cdv proteins in *Sulfolobus* and relatives |
| DNA packaging | nucleoid-associated proteins | histones in many lineages, or other small DNA-binding proteins |
| transcription | one RNA polymerase with a few subunits, sigma factors | one RNA polymerase with many subunits, TATA-binding protein and TFB, like eukaryotic RNA polymerase II |
| sensitivity to antibiotics | many target wall and ribosome | resistant to β-lactams and many ribosome-targeting drugs |

**Pseudomurein**, found in methanogens such as *Methanobacterium* and *Methanothermobacter*, superficially resembles peptidoglycan but is built from NAG and *N*-acetyltalosaminuronic acid joined by β-1,3 rather than β-1,4 bonds, with L- rather than D-amino acids in its peptides; it is therefore immune to lysozyme and to penicillin, and evolved independently. The membrane-spanning tetraether lipids of many thermophilic and acidophilic archaea form a monolayer that cannot peel apart into two leaflets, and the ether bonds resist hydrolysis; together these make the membrane stable and impermeable to protons at high temperatures and low pH. The division machinery of *Sulfolobus*, based on homologues of the eukaryotic ESCRT-III proteins that pinch off membranes (Ann-Christin Lindås and colleagues, and Rachel Samson and colleagues, both 2008), is one of several features linking archaea to eukaryotes ([[diversity-of-life/classifying-life#prop-two-domains]]).

::: application Targets in the envelope
The bacterial envelope is the target of more antibiotics than any other structure: β-lactams and glycopeptides act on peptidoglycan synthesis, polymyxins on the outer membrane, daptomycin on the Gram-positive membrane ([[microbiology/antimicrobials]]). It is also the first thing the innate immune system recognises: receptors in animals and plants detect LPS, peptidoglycan fragments, lipoproteins and flagellin — molecules that are essential to bacteria and absent from the host. Envelope differences explain the "spectrum" of antibiotics (penicillin G against Gram-positives, polymyxins against Gram-negatives) and why mycobacteria, with their mycolic acid layer, require their own drugs. Vaccines against several bacteria are made from capsular polysaccharides conjugated to proteins. For the clinical side, see [Medicine Atlas: Microbiology](/learn/medicine/lesson.php?c=microbiology&l=bacteria).
:::

::: history
Ferdinand Cohn described the shapes of bacteria (1872) and endospores (1876), and Hans Christian Gram introduced his stain in 1884. The chemistry of the wall was worked out in the 1950s and 1960s: Milton Salton showed that walls could be isolated and analysed, James Park found the nucleotide precursor of peptidoglycan accumulating in penicillin-treated staphylococci (1949–1952), and Jack Strominger and Donald Tipper proposed in 1965 that penicillin mimics D-Ala–D-Ala and blocks transpeptidation. Weidel and Pelzer described the wall as a single bag-shaped molecule in 1964. Berg and Anderson (1973) and Silverman and Simon (1974) showed that flagella rotate, and Berg and Brown (1972) described the run-and-tumble behaviour of chemotaxis. Blakemore discovered magnetotactic bacteria in 1975. Electron cryotomography, from the 2000s, has shown the envelope and motors in near-native state inside intact cells.
:::

::: summary
- Bacteria are mostly cocci, rods and spirals; shape is maintained by cytoskeletal proteins (MreB, FtsZ, crescentin) that direct wall synthesis.
- The cytoplasmic membrane is the permeability barrier and the site of energy conservation; transport uses ion gradients, ATP (ABC transporters) or group translocation (the PTS).
- Peptidoglycan is a single cross-linked net of NAG–NAM strands and peptides with D-amino acids, synthesised via lipid II by glycosyltransferases and transpeptidases (the PBPs targeted by β-lactams). It resists turgor: $P = \Delta c RT$ and hoop stress $\sigma_\theta = Pr/t$.
- Gram-positive envelopes have thick peptidoglycan with teichoic acids; Gram-negative ones have thin peptidoglycan in a periplasm and an LPS outer membrane with porins. Mycobacteria have mycolic acids; mycoplasmas no wall.
- Capsules, slime and S-layers lie outside the wall. Flagella are rotary motors driven by H⁺ or Na⁺; chemotaxis biases a run-and-tumble random walk through receptors, CheA, CheY and methylation-based adaptation. Bacteria swim at Reynolds numbers of about $10^{-4}$.
- Pili mediate attachment, conjugation and twitching motility. The cytoplasm contains the nucleoid, plasmids, 70S ribosomes, storage granules, gas vesicles, magnetosomes and microcompartments.
- Endospores are dormant, extraordinarily resistant cells with a dehydrated core rich in calcium dipicolinate, formed by a sigma-factor cascade; they are for survival, not reproduction.
- Archaea have ether-linked isoprenoid lipids on glycerol-1-phosphate, no peptidoglycan, ATP-driven archaella and eukaryote-like information machinery.
:::

## Exercises

::: exercise Arrangements {level=1}
What can you infer about the planes of cell division from (a) a chain of cocci, (b) a grape-like cluster of cocci, (c) a packet of eight cocci in a cube?
::: solution
(a) Division always in parallel planes, with cells remaining attached (streptococci). (b) Division in several random planes (staphylococci). (c) Division in three mutually perpendicular planes in turn (as in *Sarcina*).
:::
:::

::: exercise Osmotic pressure {level=1 check="3.87"}
The cytoplasm of a bacterium exceeds the osmolarity of its medium by 0.15 osmol L⁻¹ at 37 °C (take $T = 310$ K). What is the turgor pressure in units of $10^5$ Pa (two decimal places)?
::: solution
$\Delta c = 150$ mol m⁻³, so $P = 150\times8.314\times310 = 3.87\times10^5$ Pa, about 3.8 atm.
:::
:::

::: exercise Protoplasts and spheroplasts {level=1}
Predict the result of treating each of the following with lysozyme in 0.5 mol L⁻¹ sucrose and then diluting into water: (a) *Bacillus subtilis*; (b) *E. coli* pretreated with EDTA; (c) *Mycoplasma*; (d) *Methanothermobacter*.
::: solution
(a) Spherical protoplasts in sucrose, which burst on dilution. (b) Spheroplasts (still with some outer membrane) in sucrose, which burst on dilution. (c) No effect of lysozyme, since there is no wall; but mycoplasmas are osmotically fragile and may lyse on dilution into water anyway. (d) No effect: pseudomurein has β-1,3 bonds and is not cleaved by lysozyme, so the cells survive dilution.
:::
:::

::: exercise Chemotaxis mutants {level=2}
Predict the swimming behaviour (smooth swimming, normal run-and-tumble, or constant tumbling) and the chemotactic response of *E. coli* mutants lacking (a) CheY, (b) CheZ, (c) CheR, (d) CheB. Explain each in terms of CheY-P levels.
::: solution
(a) No CheY-P: motors always CCW, cells swim smoothly and never tumble; non-chemotactic. (b) CheY-P is not dephosphorylated and accumulates: motors spend much time CW, cells tumble constantly; non-chemotactic. (c) Without the methyltransferase, receptors stay undermethylated, a state with low CheA activity: little CheY-P, smooth swimming, and no adaptation. (d) Without the methylesterase, receptors become overmethylated, a state of high CheA activity: much CheY-P and tumbly behaviour, again without proper adaptation. In (c) and (d) the cells respond to a sudden change but cannot reset, so they fail to climb gradients efficiently.
:::
:::

::: exercise Wall stress in a sphere and a rod {level=2 check="2"}
A coccus and a rod have the same radius, wall thickness and turgor pressure. By what factor is the largest wall stress in the rod greater than that in the coccus? Where in a rod would you expect the wall to fail first, and in what direction?
::: solution
The sphere has $\sigma = Pr/(2t)$ in every direction; the cylindrical part of the rod has $\sigma_\theta = Pr/t$, twice as large. The rod's side wall should fail first, by tearing along the axis (the hoop stress opens a longitudinal slit). This anisotropy may be why rod-shaped bacteria orient their glycan strands roughly circumferentially, where they bear the larger stress.
:::
:::

::: exercise Proton budget of a motor {level=2 check="1.2e5"}
If about 1,200 protons pass through a flagellar motor per revolution and it turns at 100 revolutions per second, how many protons per second does the motor consume? If the proton-motive force is 150 mV, what power (in watts) does the motor draw? (Each proton crossing the membrane releases energy $e\,\Delta p$, with $e = 1.6\times10^{-19}$ C.)
::: solution
$1200\times100 = 1.2\times10^{5}$ protons per second per motor. Power: $1.2\times10^5\times1.6\times10^{-19}\times0.15 = 2.9\times10^{-15}$ W, about 3 femtowatts. A cell with several flagella spends a modest but real fraction of its energy budget on swimming, plus the larger cost of making the flagella in the first place; cells in rich, well-mixed media often reduce flagellar synthesis, and the flagellar genes are tightly regulated.
:::
:::

::: exercise A biased random walk {level=2}
In a random walk with runs of speed $v$ and mean duration $\tau$, each followed by a complete randomisation of direction, the effective diffusion coefficient in three dimensions is $D_\mathrm{eff} = v^2\tau/3$. (a) Calculate $D_\mathrm{eff}$ for $v = 20$ µm s⁻¹ and $\tau = 1$ s, and compare it with $D$ for a small molecule (1000 µm² s⁻¹) and for a protein (about 100 µm² s⁻¹ in water). (b) *E. coli* tumbles do not fully randomise direction: the mean cosine of the turning angle is about 0.33. The formula becomes $D_\mathrm{eff} = v^2\tau/[3(1 - \alpha)]$ with $\alpha$ the mean cosine. Recalculate. (c) Why does a chemotactic cell need runs of a second or more, rather than 0.01 s?
::: solution
(a) $D_\mathrm{eff} = 400\times1/3 = 133$ µm² s⁻¹, similar to a protein and an order of magnitude below a small molecule. (b) $133/0.67 = 199$ µm² s⁻¹, about 200. (c) The cell must compare concentrations at points separated by more than the noise in its measurement allows; very short runs would cover only a fraction of a micrometre, over which concentration differences in natural gradients are tiny compared with the random fluctuations in the number of molecules bound to receptors. Berg and Edward Purcell (1977) showed that the precision of chemoreception improves with the time over which molecules are counted, so runs must last long enough for both counting and displacement.
:::
:::

::: exercise Why is *Mycobacterium* hard to kill? {level=2}
List three features of the mycobacterial envelope and explain how each contributes to resistance to disinfectants and antibiotics and to slow growth.
::: solution
(1) Mycolic acids form a waxy, highly hydrophobic outer layer (the mycomembrane) that impedes the entry of hydrophilic drugs and disinfectants. (2) The few porins are narrow and sparse, limiting uptake of small hydrophilic molecules — including nutrients, which contributes to slow growth. (3) The peptidoglycan–arabinogalactan–mycolic acid complex is a thick, covalently linked barrier; synthesising it is costly. Drugs used against mycobacteria often target the synthesis of these unique components (mycolic acids, arabinogalactan), which also explains why they do not act on other bacteria.
:::
:::

::: exercise Spores and canning {level=3}
A food canner heats cans to kill spores of *Clostridium botulinum*. Explain, from the structure of the endospore, (a) why boiling at 100 °C is insufficient and steam under pressure at 121 °C is used; (b) why acidic foods (pH below about 4.6) can be processed at lower temperatures; (c) why sporulation would not help a population grow in a food that already supports growth.
::: solution
(a) The partly dehydrated core, stabilised by calcium dipicolinate, protects proteins from denaturation; killing spores requires higher temperatures or much longer times, and the rate of killing rises steeply with temperature, so 121 °C kills in minutes what 100 °C does in hours (the kinetics are treated in [[microbiology/antimicrobials]]). (b) Spores that survive in acidic food cannot germinate and grow to produce toxin below about pH 4.6, so the process only needs to kill vegetative cells and spores of acid-tolerant organisms. (c) Sporulation converts one vegetative cell into one spore: it does not increase numbers, and it stops growth. It pays only when conditions are about to become unfavourable.
:::
:::

::: exercise Interpreting a lipid analysis {level=3}
A new isolate from a hot spring at pH 2.5 and 80 °C has membrane lipids that, after hydrolysis, release no fatty acids but yield C₄₀ isoprenoid diols linked to two glycerol molecules. Its 16S rRNA gene is 78 % identical to that of *E. coli*. It is resistant to penicillin and lysozyme. (a) To which domain does it belong? (b) What is the structure of its membrane, and why is this advantageous in its habitat? (c) What wall would you expect it to have?
::: solution
(a) Archaea: no fatty acids, isoprenoid ether lipids, a 16S rRNA sequence far from bacterial ones, and resistance to wall-active drugs. (b) C₄₀ chains joined to glycerol at both ends are membrane-spanning tetraethers, forming a monolayer. Ether bonds resist acid hydrolysis and heat, and the monolayer is less permeable to protons — vital for a cell keeping its cytoplasm near neutral pH against an external pH of 2.5 — and cannot separate into leaflets at high temperature. (c) Probably an S-layer of glycoprotein as its only wall, as in *Sulfolobus*; certainly not peptidoglycan.
:::
:::
