Look at an electron micrograph of a liver cell and the first impression is of membranes everywhere: stacks of flattened sacs studded with ribosomes, a nucleus wrapped in a double envelope, hundreds of mitochondria with folded inner membranes, small dense vesicles, and a tangle of tubules. The plasma membrane, the one membrane every cell has, is a small part of the total. In a hepatocyte it is about 2 % of the cell's membrane area; the rest bounds internal compartments (Alberts, *Molecular Biology of the Cell*, 7th ed., Table 12-2).

Why divide a cell into compartments? [[cell-biology/cells-and-microscopy]] gave one answer: a large cell cannot rely on diffusion and a single surface. Compartments give more. They let incompatible chemistries coexist — the acid digestion of a lysosome a few hundred nanometres from the neutral cytosol, oxidising reactions that make hydrogen peroxide sealed away in peroxisomes, a proton gradient across the inner mitochondrial membrane that drives ATP synthesis. They concentrate enzymes with their substrates. And they create surfaces on which processes can be organised. This chapter tours the organelles of a eukaryotic cell, puts numbers on them, and tells the story of how two of them — mitochondria and chloroplasts — began as free-living bacteria.

## Compartments and the endomembrane system

::: definition Organelle; topologically equivalent compartments {#def-organelle}
An **organelle** is a structurally distinct, functionally specialised part of a cell. Most are **membrane-bounded compartments** whose **lumen** (interior) is separated from the cytosol by one or more membranes. Two spaces are **topologically equivalent** if material can pass between them by membrane budding and fusion without crossing a membrane: the lumens of the endoplasmic reticulum, the Golgi apparatus, endosomes, lysosomes and secretory vesicles are equivalent to one another and to the outside of the cell, while the cytosol is equivalent to the nucleoplasm (connected through nuclear pores).
:::

The compartments that exchange material by vesicles — the nuclear envelope, endoplasmic reticulum (ER), Golgi apparatus, endosomes, lysosomes and the plasma membrane — form the **endomembrane system**. Mitochondria, chloroplasts and peroxisomes are not part of it: they import most of their proteins directly from the cytosol, and mitochondria and chloroplasts grow and divide on their own.

The table, for a rat hepatocyte, shows how a cell divides up its volume (Alberts, 7th ed., Table 12-1; representative values from morphometric studies).

| compartment | % of cell volume |
|---|---|
| cytosol | 54 |
| mitochondria | 22 |
| rough ER | 9 |
| smooth ER plus Golgi cisternae | 6 |
| nucleus | 6 |
| peroxisomes | 1 |
| lysosomes | 1 |
| endosomes | 1 |

Even the "cytosol" is not a featureless soup. It contains the cytoskeleton ([[cell-biology/cytoskeleton]]), dense granules of glycogen and ribosomes, and a growing list of **biomolecular condensates** — membraneless assemblies such as stress granules and P bodies (and, in the nucleus, nucleoli and nuclear speckles) that concentrate particular proteins and RNAs. Clifford Brangwynne, Anthony Hyman and colleagues showed in 2009 that the germline P granules of *Caenorhabditis elegans* behave as liquid droplets that fuse and drip; many condensates are thought to form by liquid–liquid phase separation, although how far phase separation explains their function in living cells is still actively debated.

::: example How many mitochondria in a liver cell? {#ex-mito-count}
Take a hepatocyte of volume 5000 µm³ (a representative value), with mitochondria occupying 22 % of it. Model each mitochondrion as a cylinder 0.5 µm in diameter and 2 µm long. Estimate the number of mitochondria.
::: solution
One mitochondrion has volume $\pi(0.25\ \mathrm{\mu m})^2(2\ \mathrm{\mu m}) = 0.39\ \mathrm{\mu m^3}$. The total mitochondrial volume is $0.22\times5000 = 1100\ \mathrm{\mu m^3}$, so

$$
N \approx \frac{1100}{0.39} \approx 2800.
$$

Counts in electron micrographs give about 1000–2000 mitochondria per hepatocyte; the estimate is of the right order, and too high mainly because many mitochondria are larger than the model, and many are joined into networks. Indeed, in many cells "the number of mitochondria" is ill-defined: they continually **fuse** and divide (**fission**), forming a dynamic reticulum.
:::
:::

## The nucleus

The nucleus holds the genome and is where DNA is replicated and transcribed and where RNA is processed. It is bounded by the **nuclear envelope**, two concentric membranes separated by a perinuclear space that is continuous with the ER lumen; the outer nuclear membrane is continuous with the ER and carries ribosomes. Underneath the inner membrane lies the **nuclear lamina**, a meshwork of intermediate-filament proteins called lamins that supports the envelope and anchors chromatin. In mitosis, phosphorylation of lamins disassembles the lamina and the envelope breaks down ([[cell-biology/cell-cycle]]).

Inside, chromosomes are not tangled at random: each occupies its own **chromosome territory**, with gene-rich, active regions tending towards the interior and inactive heterochromatin near the lamina. The most conspicuous internal structure is the **nucleolus**, a condensate formed around the clusters of ribosomal RNA genes, where rRNA is transcribed, processed and assembled with ribosomal proteins (imported from the cytoplasm) into ribosomal subunits, which are then exported.

### Nuclear pores

Traffic between nucleus and cytoplasm passes through **nuclear pore complexes** (NPCs), among the largest protein assemblies in the cell: about 110–125 MDa in vertebrates, built from multiple copies of some 30 different proteins (nucleoporins) arranged with eightfold symmetry around a central channel. A HeLa nucleus has a few thousand of them. The channel is filled with a meshwork of disordered protein segments rich in phenylalanine–glycine repeats (FG repeats). Small molecules and proteins below roughly 40 kDa diffuse through freely; larger ones are excluded unless bound to **nuclear transport receptors** (importins and exportins), which interact with the FG repeats and carry their cargoes through. The direction of transport is set by the small GTPase Ran, as [[cell-biology/protein-sorting]] explains.

::: example Histone traffic through nuclear pores {#ex-histones}
In S phase a human cell duplicates its diploid genome of $6.4\times10^9$ base pairs. Each nucleosome holds about 200 bp (including linker DNA) and contains eight histone proteins, all made in the cytoplasm. If S phase lasts 8 h and the nucleus has 3000 NPCs, how many histones must each pore import per second?
::: solution
Nucleosomes: $6.4\times10^9/200 = 3.2\times10^7$. Histones: $8\times3.2\times10^7 = 2.6\times10^8$. Per pore per second:

$$
\frac{2.6\times10^8}{(8\times3600\ \mathrm{s})\times3000} \approx 3\ \mathrm{s^{-1}}.
$$

That is modest: single NPCs have been measured to carry of the order of a thousand receptor–cargo complexes per second (Katharina Ribbeck and Dirk Görlich, 2001). The NPCs' load is dominated not by histones but by the many other proteins and RNAs going in and out, including whole ribosomal subunits on their way out of the nucleus.
:::
:::

## The endoplasmic reticulum and the Golgi apparatus

The **endoplasmic reticulum** is a single continuous network of tubules and flattened sacs (cisternae) whose lumen extends throughout the cytoplasm. Its membrane is often more than half of a cell's total. Two regions are distinguished. The **rough ER** is studded with ribosomes that are translating proteins destined for the ER, Golgi, lysosomes, plasma membrane or secretion; the proteins enter the ER as they are made, fold there with the help of chaperones, and receive N-linked sugar chains and disulfide bonds. The **smooth ER** lacks ribosomes and is where lipids and steroids are made, where (in liver) many drugs and toxins are modified by cytochrome P450 enzymes, and where Ca²⁺ is stored — the ER lumen holds free Ca²⁺ at hundreds of micromolar, a thousand times the cytosolic level, ready to be released in signalling. Muscle cells have a specialised smooth ER, the sarcoplasmic reticulum, that releases the Ca²⁺ that triggers contraction.

The **Golgi apparatus**, described by Camillo Golgi in 1898 in nerve cells stained with his silver method and long dismissed as an artefact, is a stack of four to eight flattened cisternae. Proteins and lipids from the ER enter at its *cis* face, pass through the *medial* cisternae, and leave from the *trans* face and the **trans-Golgi network**, where they are sorted into vesicles bound for different destinations. On the way, sugar chains are trimmed and rebuilt — the Golgi's enzymes are arranged in the order they act — and proteins are sulfated, phosphorylated and proteolytically processed. In mammals the stacks are linked into a ribbon near the nucleus; in plants and many protists, hundreds of separate stacks move about the cytoplasm.

## Endosomes, lysosomes and vacuoles

**Lysosomes** are the cell's digestive compartments. They contain some 60 hydrolytic enzymes — proteases, nucleases, lipases, glycosidases, phosphatases — that work best at acid pH, and their lumen is held at about pH 4.5–5.0 by **V-type ATPases**, rotary proton pumps in their membranes. Material reaches them by three routes: from outside by endocytosis, through a series of increasingly acidic **endosomes**; from inside by **autophagy**, in which a double membrane engulfs a region of cytoplasm or a worn-out organelle and fuses with a lysosome (Yoshinori Ohsumi's genetic dissection of autophagy in yeast earned the 2016 Nobel Prize in Physiology or Medicine); and, in specialised cells such as macrophages, by phagocytosis of large particles and microbes. Christian de Duve discovered lysosomes in 1955 while fractionating rat liver, as described in the application box below.

The acid interior is a safety device as well as an optimum: an enzyme that leaks into the cytosol at pH 7.2 is largely inactive. The lysosomal membrane proteins are heavily glycosylated on their lumenal side, which protects them from digestion.

Plant and fungal cells have a large **vacuole** that combines lysosomal digestion with storage of ions, sugars, pigments and defensive compounds, and with the generation of turgor pressure ([[cell-biology/membrane-transport]]). In a mature plant cell it can fill 90 % of the volume.

### Pumping protons into a compartment

::: proposition Free energy of transferring a proton into an acidic compartment {#prop-proton}
Moving one mole of H⁺ from the cytosol (c) into a lumen (L) at potential $\Delta\psi = \psi_\mathrm{L} - \psi_\mathrm{c}$ requires

$$
\Delta G = 2.303\,RT\,(\mathrm{pH_c} - \mathrm{pH_L}) + F\,\Delta\psi.
$$ {#eq-proton}

This is [[cell-biology/membrane-transport#eq-dg-ion]] with $z = +1$ and $\ln([\mathrm{H^+}]_\mathrm{L}/[\mathrm{H^+}]_\mathrm{c}) = 2.303(\mathrm{pH_c} - \mathrm{pH_L})$. At 37 °C, $2.303RT = 5.94\ \mathrm{kJ\,mol^{-1}}$ per pH unit. Assumptions: as for [[cell-biology/membrane-transport#def-electrochemical]], with pH measuring proton activity.
:::

::: example The cost of an acid lysosome {#ex-lysosome-energy}
A lysosome is at pH 4.7 and the cytosol at pH 7.2. (a) What is the free energy of pumping one more mole of H⁺ in, if the lumen is 20 mV positive? (b) How many *free* protons are there in a spherical lysosome 0.5 µm in diameter?
::: solution
(a) $\Delta G = 5.94\times(7.2 - 4.7) + 96.49\times0.020 = 14.8 + 1.9 = 16.8\ \mathrm{kJ\,mol^{-1}}$. ATP hydrolysis in the cell provides about 50–60 kJ mol⁻¹, so the V-ATPase, which moves roughly three protons per ATP, can maintain this gradient. The positive lumenal potential that would build up as protons are pumped in is limited by counter-ion movements — Cl⁻ entering through channels and transporters — without which acidification stalls.

(b) $V = \tfrac{\pi}{6}(0.5\ \mathrm{\mu m})^3 = 0.065\ \mathrm{fL} = 6.5\times10^{-17}\ \mathrm{L}$. At pH 4.7, $[\mathrm{H^+}] = 2.0\times10^{-5}\ \mathrm{mol\,L^{-1}}$, so

$$
n = (2.0\times10^{-5})(6.5\times10^{-17})(6.022\times10^{23}) \approx 790.
$$

Fewer than a thousand free protons! "pH" in a small organelle is an average over a small number of ions. Almost all the protons pumped in are bound to buffering groups on lumenal proteins and other molecules; the number pumped is thousands of times larger than the number free ([[#exr-buffer]]).
:::
:::

::: widget plot
f: 5.94*(7.2 - x) + 96.49*p
x: 4, 7.5
y: -10, 25
sliders: p=0.02:-0.05:0.05:0.005
labels: \Delta G\ (\mathrm{kJ\,mol^{-1}})
hlines: 0
vlines: 4.7
caption: The free energy [[#eq-proton]] of pumping one mole of protons from cytosol at pH 7.2 into a compartment, against the lumenal pH (horizontal axis). The slider sets the membrane potential $\Delta\psi$ (lumen relative to cytosol) in volts. The vertical line marks a typical lysosomal pH of 4.7. Each pH unit costs 5.94 kJ mol⁻¹, and each 10 mV of positive lumenal potential costs a further 0.96 kJ mol⁻¹; a negative lumenal potential (slider below zero) would make acidification cheaper.
:::

The second figure turns pH into a count of free protons for a spherical compartment of adjustable size.

::: widget plot
f: 602214000*0.5236*d^3*10^(-x)
x: 4, 7.5
y: 0, 3000
sliders: d=0.5:0.1:1.5:0.05
labels: \text{free H}^+\ \text{ions}
vlines: 4.7; 7.2
caption: The number of free protons $n = [\mathrm{H^+}]\,V N_\mathrm{A}$ in a spherical compartment of diameter $d$ (slider, µm) against its pH. The vertical lines mark a lysosome (pH 4.7) and the cytosol (pH 7.2). Notice that a 0.5 µm lysosome holds about 790 free protons at pH 4.7, and the same volume of cytosol only two or three — each pH unit is a factor of ten.
:::

## Peroxisomes

**Peroxisomes** are small single-membrane organelles, typically 0.1–1 µm across, defined by their content of oxidases that transfer hydrogen from substrates to O₂, producing hydrogen peroxide, and of **catalase**, which destroys it ($\mathrm{2H_2O_2 \rightarrow 2H_2O + O_2}$). Their tasks vary with the organism and tissue: β-oxidation of very-long-chain and branched fatty acids (in yeast and plants, all fatty-acid β-oxidation), the first steps in making plasmalogens (ether phospholipids abundant in myelin), the detoxification of ethanol and other compounds in liver and kidney, and in germinating oil-rich seeds the **glyoxylate cycle** that converts stored fat to sugar (in "glyoxysomes"). Christian de Duve and Pierre Baudhuin named them in 1966.

Peroxisomes import their matrix proteins fully folded from the cytosol, using targeting signals such as the C-terminal tripeptide Ser-Lys-Leu (SKL), and can either divide or form anew from the ER. Inherited disorders that disrupt peroxisome formation are severe; their clinical description belongs to [Medicine Atlas](/learn/medicine/course.php?c=genetics).

## Mitochondria

**Mitochondria** are the sites of aerobic ATP production. Each is bounded by two membranes. The **outer membrane** is made permeable to molecules up to about 5 kDa by abundant β-barrel channels (porins, or VDAC). The **inner membrane** is impermeable to most small molecules and ions, folds into **cristae** that greatly increase its area, contains the unusual lipid cardiolipin, and carries the respiratory chain and the ATP synthase. Between the two lies the **intermembrane space**; inside the inner membrane is the **matrix**, which contains the enzymes of the citric acid cycle and of fatty-acid β-oxidation, and the organelle's own DNA and ribosomes.

The respiratory chain pumps protons from the matrix into the intermembrane space, creating an electrochemical proton gradient — the **proton-motive force** — of about 180–220 mV, mostly as a membrane potential of 150–180 mV (matrix negative) and partly as a pH difference (the matrix is about 0.5–0.8 units more alkaline than the cytosol). The ATP synthase lets protons flow back and uses the energy to make ATP. This is Peter Mitchell's **chemiosmotic coupling** (1961). The biochemistry of the respiratory chain, ATP synthase and the ATP yield per glucose are treated in [Chemistry Atlas: oxidative phosphorylation and photosynthesis](/learn/chemistry/lesson.php?c=biochemistry&l=oxidative-phosphorylation) and are not repeated here.

Mitochondria do much besides make ATP. They make iron–sulfur clusters (the task that makes mitochondria, or their reduced remnants, indispensable to almost every eukaryote), haem, and some amino acids and lipids; they buffer cytosolic Ca²⁺; they generate reactive oxygen species that act as signals and as damaging agents; and they release cytochrome *c* to trigger apoptosis ([[cell-biology/tissues-and-cell-death]]).

### The mitochondrial genome

Human mitochondrial DNA is a circular molecule of 16,569 bp (Stephen Anderson and colleagues in Fred Sanger's laboratory, 1981), present in hundreds to thousands of copies per cell. It encodes 37 genes: 13 proteins, all subunits of the respiratory complexes and ATP synthase; 22 transfer RNAs; and 2 ribosomal RNAs. Mitochondria use a slightly different genetic code (in human mitochondria UGA codes for tryptophan, not stop). In most animals mitochondria are inherited through the mother.

::: example How much of a mitochondrion does its genome make? {#ex-mito-proteome}
Curated inventories of the human mitochondrial proteome list about 1100 proteins (MitoCarta3.0, 2021). What fraction is encoded by mitochondrial DNA?
::: solution
$13/1100 \approx 1.2\ \%$. About 99 % of mitochondrial proteins are encoded in the nucleus, made on cytosolic ribosomes and imported — through the TOM and TIM complexes of [[cell-biology/protein-sorting]]. The organelle is semi-autonomous: it divides on its own and has its own genome, but it depends on the nucleus for almost everything.
:::
:::

## Plastids and chloroplasts

**Plastids** are a family of organelles in plants and algae that develop from small proplastids: **chloroplasts** for photosynthesis, **amyloplasts** that store starch (and, in root caps, sense gravity), and **chromoplasts** that hold the carotenoid pigments of fruits and flowers. A chloroplast has three membrane systems: an outer and an inner envelope membrane, and an internal system of **thylakoid** membranes, flattened sacs stacked into grana, which contain the light-harvesting pigments, photosystems and ATP synthase. Light-driven electron transport pumps protons into the thylakoid lumen, and the ATP synthase makes ATP in the surrounding **stroma**, where CO₂ is fixed by Rubisco. Photosynthesis is covered in [Chemistry Atlas: oxidative phosphorylation and photosynthesis](/learn/chemistry/lesson.php?c=biochemistry&l=oxidative-phosphorylation) and in [[plant-biology]].

Chloroplast genomes are circular, typically 120–160 kb — the *Arabidopsis thaliana* plastid genome is about 154 kb — and encode some 100–130 genes, including the large subunit of Rubisco; the small subunit is encoded in the nucleus.

## The endosymbiotic origin of mitochondria and plastids

::: definition The endosymbiont theory {#def-endosymbiosis}
The **endosymbiont theory** holds that mitochondria descend from an α-proteobacterium, and plastids from a cyanobacterium, that were engulfed by a host cell and became permanent, intracellular partners; over time most of their genes were lost or transferred to the host nucleus, and the host evolved machinery to import proteins back into them.
:::

The idea was proposed for chloroplasts by Konstantin Mereschkowski in 1905 and for mitochondria by Ivan Wallin in the 1920s, but was widely dismissed until Lynn Margulis (then Lynn Sagan) assembled the cytological and biochemical evidence in her 1967 paper "On the origin of mitosing cells" in the *Journal of Theoretical Biology*. The evidence that convinced biologists is now overwhelming:

1. Mitochondria and plastids have their own circular genomes, replicated independently of the nuclear genome.
2. Their ribosomes are bacterial in size and sequence, and are inhibited by antibiotics that block bacterial translation (such as chloramphenicol), not by cycloheximide, which blocks cytosolic ribosomes.
3. They divide by fission; plastids (and some mitochondria) use FtsZ, the bacterial division protein.
4. Their outer membranes contain β-barrel proteins found otherwise only in the outer membranes of Gram-negative bacteria, inserted by a machine homologous to the bacterial one.
5. Gene sequences place mitochondrial genes within the α-proteobacteria and plastid genes within the cyanobacteria (the first decisive molecular phylogenies came from ribosomal RNA in the late 1970s and 1980s).

**Endosymbiotic gene transfer** explains why the organelle genomes are so small: free-living α-proteobacteria have thousands of genes, and over a billion or more years nearly all have either been lost or moved to the nucleus, where their copies now carry targeting sequences. Pieces of organelle DNA still enter the nucleus today (as "NUMTs" in the human genome). Why any genes remain in organelles is debated; one prominent hypothesis (John Allen's co-location for redox regulation) is that the cell needs to control the expression of key respiratory and photosynthetic subunits locally, and another is that some very hydrophobic proteins are hard to import.

Two further twists show that endosymbiosis happened more than once. Many algae — diatoms, brown algae, the malaria parasite's relatives — acquired plastids by **secondary endosymbiosis**, engulfing a eukaryotic alga that already had one; in cryptophytes and chlorarachniophytes a tiny remnant of the engulfed alga's nucleus, the **nucleomorph**, survives between the plastid membranes. And some eukaryotes living without oxygen have reduced their mitochondria to hydrogenosomes or mitosomes, and the gut protist *Monocercomonoides* (Anna Karnkowska and colleagues, 2016) has lost them entirely — after acquiring its iron–sulfur cluster pathway from bacteria by horizontal gene transfer.

::: warning "The endosymbiont theory says mitochondria are bacteria living inside us"
Mitochondria *descend* from bacteria; they are not bacteria now. They cannot live outside a cell, they have lost almost all their genes, they depend on some thousand nucleus-encoded proteins, and their division, inheritance and turnover are controlled by the host. A better analogy is an organ that evolved from a once-independent organism. Note also that the theory does not imply that the host was a "primitive eukaryote": current evidence (from Asgard archaea, see [[cell-biology/cells-and-microscopy]]) suggests that the host was an archaeon, and the acquisition of the mitochondrion may have been the event that made complex eukaryotic cells possible.
:::

::: quiz
A cell-free system translates mRNAs on ribosomes isolated from (i) the cytosol and (ii) mitochondria. Chloramphenicol is added. Which prediction follows from the endosymbiont theory?
- [ ] Both translation systems are inhibited equally.
- [ ] Only cytosolic translation is inhibited.
- [x] Mitochondrial translation is inhibited, but cytosolic translation continues.
- [ ] Neither is inhibited, because chloramphenicol acts only on bacterial cell walls.
::: solution
Chloramphenicol blocks the peptidyl transferase centre of bacterial (70S-type) ribosomes. Mitochondrial ribosomes descend from bacterial ones and are sensitive; cytosolic 80S ribosomes are not. The reverse holds for cycloheximide. Such differential sensitivity is one line of evidence for the theory — and the reason that some antibiotics aimed at bacteria can have side effects on mitochondria.
:::
:::

::: application How de Duve found the lysosome
In the early 1950s Christian de Duve was studying a liver enzyme, glucose-6-phosphatase, by separating homogenised rat liver into fractions by centrifugation. As a control he measured acid phosphatase, and noticed that a freshly prepared fraction showed much lower activity than the same fraction after a few days in the refrigerator. Activity also rose when the fractions were frozen and thawed, or treated with detergent. He reasoned that the enzyme was sealed inside membrane-bounded particles that did not admit the substrate until damaged — a property called **latency** — and that the particles also contained other acid hydrolases that sedimented with it. In 1955 he named them lysosomes, and Alex Novikoff's electron micrographs soon showed them. De Duve, with Albert Claude, who developed cell fractionation, and George Palade, shared the 1974 Nobel Prize in Physiology or Medicine. Defects in individual lysosomal enzymes cause dozens of inherited **lysosomal storage diseases**, the subject of [Medicine Atlas: genetics](/learn/medicine/course.php?c=genetics).
:::

::: history
Robert Brown named the nucleus in 1831. Richard Altmann described "bioblasts" — mitochondria — in 1890 and believed they were elementary organisms; Carl Benda named them mitochondria ("thread granules") in 1898, the year Camillo Golgi described his internal reticular apparatus. Andreas Schimper suggested in 1883 that chloroplasts arise only from pre-existing chloroplasts and resemble cyanobacteria, an idea Konstantin Mereschkowski developed into the theory of symbiogenesis in 1905. Cell fractionation by differential centrifugation, developed by Albert Claude in the 1930s and 1940s, allowed George Hogeboom, Walter Schneider and George Palade to show in 1948 that isolated mitochondria carry out oxidative reactions, and Eugene Kennedy and Albert Lehninger to localise the citric acid cycle and fatty-acid oxidation to them in 1949. Electron microscopy of thin sections in the 1950s, by Palade and Fritiof Sjöstrand, revealed the cristae, the ER and ribosomes. Margit and Sylvan Nass found DNA fibres in mitochondria in 1963. Lynn Margulis's synthesis of the endosymbiont theory appeared in 1967, and the complete human mitochondrial genome was sequenced in 1981.
:::

::: summary
- Eukaryotic cells are divided into membrane-bounded compartments; lumens connected by vesicle traffic (ER, Golgi, endosomes, lysosomes) are topologically equivalent to the cell exterior. The plasma membrane is only about 2 % of a hepatocyte's membrane.
- The nucleus is bounded by a double envelope continuous with the ER, supported by the lamina, and connected to the cytosol by a few thousand nuclear pore complexes of about 120 MDa; the nucleolus makes ribosomes.
- The rough ER takes in and folds secretory and membrane proteins; the smooth ER makes lipids, detoxifies and stores Ca²⁺; the Golgi modifies and sorts proteins from *cis* to *trans*.
- Lysosomes digest material at pH 4.5–5 maintained by V-ATPases; pumping a proton against a 2.5-unit pH difference costs about 15 kJ mol⁻¹ plus $F\Delta\psi$. A small lysosome contains fewer than a thousand free protons.
- Peroxisomes carry out H₂O₂-producing oxidations, very-long-chain fatty-acid oxidation and plasmalogen synthesis.
- Mitochondria have outer and inner membranes, a proton-motive force of about 200 mV, and a 16.6 kb genome (in humans) encoding 37 genes; about 99 % of their proteins are imported.
- Chloroplasts have envelope and thylakoid membranes and genomes of 120–160 kb.
- Mitochondria and plastids descend from α-proteobacteria and cyanobacteria by endosymbiosis (Margulis, 1967); evidence includes their genomes, bacterial-type ribosomes, fission machinery, β-barrel outer-membrane proteins and molecular phylogeny.
:::

## Exercises

::: exercise The human mitochondrial genome {level=1 check="37"}
Human mtDNA encodes 13 proteins, 22 tRNAs and 2 rRNAs. How many genes is that in total?
::: solution
$13 + 22 + 2 = 37$.
:::
:::

::: exercise Free protons in a larger lysosome {level=1 check="3150"}
How many free protons are there in a spherical lysosome of diameter 1.0 µm at pH 5.0? Give three significant figures.
::: solution
$V = \tfrac{\pi}{6}(1.0)^3 = 0.524\ \mathrm{fL} = 5.24\times10^{-16}\ \mathrm{L}$, so $n = 10^{-5}\times5.24\times10^{-16}\times6.022\times10^{23} = 3150$.
:::
:::

::: exercise The chemical part of the proton gradient {level=1 check="13.1"}
Calculate the concentration term $2.303RT\,\Delta\mathrm{pH}$ in kJ mol⁻¹, at 37 °C, for pumping protons from cytosol at pH 7.2 into a late endosome at pH 5.0.
::: solution
$5.938\times(7.2 - 5.0) = 5.938\times2.2 = 13.1\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise Mitochondria in a smaller cell {level=2 check="1000"}
A cultured cell of volume 2000 µm³ has 20 % of its volume in mitochondria, and the average mitochondrion has a volume of 0.40 µm³. Estimate the number of mitochondria.
::: solution
$0.20\times2000/0.40 = 1000$. As [[#ex-mito-count]] notes, in cells with fused mitochondrial networks this is better read as "the equivalent of 1000 average mitochondria".
:::
:::

::: exercise Reading a fractionation experiment {level=2}
In a de Duve-style experiment, a liver homogenate is centrifuged into four fractions: nuclear (N), heavy mitochondrial (M), light mitochondrial (L) and microsomal plus supernatant (P). Four marker enzymes are measured, and the percentage of each enzyme's total activity found in each fraction is:

| enzyme | N | M | L | P |
|---|---|---|---|---|
| cytochrome oxidase | 10 | 75 | 12 | 3 |
| acid phosphatase | 8 | 20 | 55 | 17 |
| catalase | 6 | 22 | 50 | 22 |
| glucose-6-phosphatase | 12 | 8 | 10 | 70 |

(a) Which organelle does each enzyme mark? (b) Acid phosphatase and catalase sediment together. How could you show they are in *different* organelles? (c) Why is some of each enzyme found in every fraction?
::: solution
(a) Cytochrome oxidase marks mitochondria (heavy mitochondrial fraction); acid phosphatase marks lysosomes; catalase marks peroxisomes; glucose-6-phosphatase marks the ER, which breaks into small vesicles ("microsomes") on homogenisation.
(b) Separate the L fraction further by density-gradient centrifugation (de Duve and colleagues used sucrose gradients): lysosomes and peroxisomes have different densities and separate into different bands. Alternatively, show that a detergent releases acid phosphatase latency at a different concentration, or label one organelle with a density-shifting agent (de Duve used the detergent Triton WR-1339, which accumulates in and lightens lysosomes) and see whether the other enzyme moves too.
(c) Fractionation is imperfect: some organelles are broken and their contents released, some cells are not homogenised and sediment with the nuclei, and organelles vary in size so their sedimentation overlaps. This is why fractionation results are expressed as distributions, and why markers are measured in every fraction.
:::
:::

::: exercise Predicting with antibiotics {level=2}
Yeast cells are grown on glycerol (which can only be used through respiration) or on glucose (which can be fermented without mitochondrial respiration). (a) Predict the effect of chloramphenicol on growth in each medium. (b) Mutants (*rho⁰*) that have lost all their mtDNA can be isolated. On which medium can they grow, and what does that tell you about which mitochondrial functions depend on mtDNA? (c) *rho⁰* mutants still contain mitochondria. Explain how.
::: solution
(a) Chloramphenicol inhibits mitochondrial translation, so the mtDNA-encoded subunits of the respiratory chain and ATP synthase are not made. Growth on glycerol, which requires respiration, stops; growth on glucose continues by fermentation.
(b) They grow on glucose but not on glycerol. Respiration depends on mtDNA (which encodes key subunits), but cell viability does not.
(c) The ~99 % of mitochondrial proteins encoded in the nucleus are still made and imported, so the organelle still forms and divides; it still makes iron–sulfur clusters, which is why even *rho⁰* yeast need mitochondria. A membrane potential is maintained across their inner membrane by other means (in yeast, by reversal of the remaining parts of the ATP synthase and by exchange of ATP for ADP), which is needed for protein import.
:::
:::

::: exercise Buffering a lysosome {#exr-buffer level=3 check="4.93"}
The lumen of a newly formed lysosome, spherical with diameter 0.5 µm (volume $6.545\times10^{-17}$ L), is acidified from pH 7.2 to pH 4.7. If its buffering capacity is constant at $\beta = 50\ \mathrm{mmol\,L^{-1}}$ per pH unit (an illustrative value), how many protons must be pumped in? Give the answer in millions, to three significant figures, and compare it with the number of free protons found in [[#ex-lysosome-energy]].
::: hint
Buffering capacity is defined as the amount of acid, per litre, needed to lower the pH by one unit.
:::
::: solution
Protons pumped $= \beta\,\Delta\mathrm{pH}\,V N_\mathrm{A} = 0.050\times2.5\times6.545\times10^{-17}\times6.022\times10^{23} = 4.93\times10^6$ — 4.93 million. Only about 790 remain free: over 99.98 % are bound to buffers. Each V-ATPase moves of the order of hundreds of protons per second, so a lysosome with tens of pumps would take minutes to acidify, matching the time scale observed in endosome maturation.
:::
:::

::: exercise Evaluating the evidence for endosymbiosis {level=3}
For each of the following observations, state whether it supports the endosymbiont theory, is neutral, or would count against it, and explain briefly. (a) Mitochondrial DNA is circular. (b) Mitochondrial ribosomes are smaller than cytosolic ones. (c) Most mitochondrial proteins are encoded in the nucleus. (d) Nuclear genes for mitochondrial proteins group with α-proteobacterial genes in phylogenetic trees. (e) Some eukaryotes have no mitochondria at all. (f) The outer mitochondrial membrane contains β-barrel proteins inserted by a machine homologous to the bacterial BAM complex.
::: solution
(a) Weak support: bacterial genomes are usually circular, but circularity is common and some mitochondrial genomes are linear. (b) Support, more strongly when combined with the sequence similarity and antibiotic sensitivity of their rRNAs. (c) Neutral at first sight, apparently against; but endosymbiotic gene transfer predicts exactly this, and (d) confirms it — the nuclear genes are of bacterial origin, so (c) and (d) together are strong support. (e) Neutral: in every case studied (such as *Monocercomonoides*) the organism descends from ancestors that had mitochondria and has lost them, as shown by remnant genes of mitochondrial origin; an amitochondriate eukaryote that branched before the acquisition would have counted against the view that the mitochondrion was present in the last common eukaryotic ancestor, but none has been found. (f) Strong support: such β-barrels and their insertion machinery are otherwise unique to Gram-negative bacteria, chloroplasts and mitochondria.
:::
:::
