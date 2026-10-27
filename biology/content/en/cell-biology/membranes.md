Every cell is bounded by a film about five nanometres thick — a thousandth of the width of the cell itself, and thinner than a soap bubble's wall — that keeps its contents in and the rest of the world out, yet lets through exactly what the cell needs. Eukaryotic cells use the same kind of film again and again inside: the membranes of the nucleus, the endoplasmic reticulum, the Golgi apparatus and the mitochondria together have many times the area of the plasma membrane. A membrane is not a wall. It is a two-dimensional fluid of lipids, crowded with proteins that pump, channel, catalyse, sense and anchor, and it reseals itself when torn.

This chapter explains what membranes are made of, why lipids assemble into bilayers on their own, how proteins sit in them, how fast everything moves, and how all this was worked out — from a calculation with red blood cells in 1925 to the fluid-mosaic model of 1972 and the more crowded, patchy picture we hold today. The next chapter, [[cell-biology/membrane-transport]], deals with how things cross.

## Membrane lipids

Membrane lipids are **amphipathic**: each molecule has a polar, water-loving (hydrophilic) head and one or two non-polar, water-avoiding (hydrophobic) tails. Three classes dominate. The chemistry of each is set out in [Chemistry Atlas: carbohydrates, lipids and membranes](/learn/chemistry/lesson.php?c=biochemistry&l=carbohydrates-lipids); here we need their shapes and roles.

- **Glycerophospholipids** (phosphoglycerides) have two fatty-acid chains esterified to glycerol, and a phosphate linked to a head group: choline in phosphatidylcholine (PC), ethanolamine in phosphatidylethanolamine (PE), serine in phosphatidylserine (PS), inositol in phosphatidylinositol (PI). PC and PE are the most abundant lipids in most animal membranes. Fatty-acid chains are usually 16–20 carbons long; a *cis* double bond puts a fixed kink of about 30° in a chain.
- **Sphingolipids** are built on sphingosine instead of glycerol. Sphingomyelin carries a phosphocholine head; glycosphingolipids carry sugars, and the complex ones (gangliosides) carry sialic acid. Their chains are usually long and saturated.
- **Sterols** — cholesterol in animals, ergosterol in fungi, phytosterols in plants — have a rigid four-ring skeleton, a short hydrocarbon tail and a single hydroxyl group as their only polar part. Cholesterol can make up 30–40 mol % of the lipid of an animal plasma membrane.

Bacteria use similar glycerophospholipids (*E. coli* membranes are about three-quarters PE), but usually no sterols. Archaea, as we saw in [[cell-biology/cells-and-microscopy]], build membranes from isoprenoid chains ether-linked to glycerol, and some make single molecules that span the whole membrane.

### Why bilayers form

A single fatty-acid chain in water forces the surrounding water molecules into a more ordered hydrogen-bonded cage. Bringing chains together releases that water and *increases* the entropy of the system: this is the **hydrophobic effect**, the main driving force of membrane assembly ([Chemistry Atlas: water and non-covalent interactions](/learn/chemistry/lesson.php?c=biochemistry&l=water-noncovalent)). Amphipathic molecules can satisfy it in several ways, and which one they choose depends on their shape.

- A molecule with one tail and a big head (a detergent, or a lysophospholipid) is cone-shaped and packs into spherical **micelles**.
- A molecule with two tails and a head of similar cross-section (PC) is roughly cylindrical and packs into flat **bilayers**.
- A molecule with a small head and bulky tails (PE, with its small head, and unsaturated chains) is an inverted cone; on its own it favours inverted, curved phases, and in a bilayer it stores curvature stress that helps membranes bend and fuse.

A bilayer exposes edges along its rim where tails would meet water. It removes them by closing on itself into a sealed compartment, a **vesicle** or liposome. This is why membranes are always closed surfaces with an inside and an outside, and why a small tear reseals spontaneously.

::: definition Lipid bilayer {#def-bilayer}
A **lipid bilayer** is a sheet two molecules thick in which amphipathic lipids are arranged in two **leaflets**, with their hydrophobic tails facing each other in the interior and their polar heads facing the water on either side. A typical bilayer is about 5 nm thick from head to head, of which about 3 nm is the hydrocarbon core; each lipid occupies 0.6–0.7 nm² of the surface. The bilayer is held together by the hydrophobic effect, not by covalent bonds between lipids.
:::

The 3 nm hydrocarbon core is an almost impassable barrier to ions and polar molecules, which is the property on which all of [[cell-biology/membrane-transport]] depends.

::: example How many lipids in a bacterium? {#ex-lipid-count}
Take the *E. coli* surface area of 6.3 µm² from [[cell-biology/cells-and-microscopy#ex-ecoli-volume]] and an area per lipid of 0.65 nm². How many lipid molecules are there in the inner (plasma) membrane?
::: solution
The membrane has two leaflets, each with the full area. Converting, $6.3\ \mathrm{\mu m^2} = 6.3\times10^6\ \mathrm{nm^2}$, so

$$
N = \frac{2 \times 6.3\times10^{6}\ \mathrm{nm^2}}{0.65\ \mathrm{nm^2}} \approx 1.9\times10^7.
$$

About twenty million lipids, in line with the estimate of $\approx2\times10^7$ in Milo and Phillips (2015). The outer membrane of this Gram-negative bacterium adds a comparable number, with lipopolysaccharide in place of phospholipid in its outer leaflet. Since a cell doubles every 20–60 minutes in good conditions, it must make thousands of lipid molecules per second.
:::
:::

::: example Gorter and Grendel's experiment {#ex-gorter}
In 1925 Evert Gorter and François Grendel extracted the lipids from a known number of red blood cells, spread them as a monolayer on water in a trough and compressed it to measure its area. Suppose lipids from $10^9$ cells cover $0.28\ \mathrm{m^2}$ as a monolayer, and each cell has a surface area of $140\ \mathrm{\mu m^2}$. (The numbers are illustrative but of the right size.) What do you conclude?
::: solution
The total cell surface is $10^9\times140\times10^{-12}\ \mathrm{m^2} = 0.14\ \mathrm{m^2}$. The ratio of monolayer area to cell area is $0.28/0.14 = 2.0$: there is enough lipid to cover each cell twice — a layer two molecules thick. Gorter and Grendel concluded that the plasma membrane is a lipid bilayer, the first experimental evidence for it.

Their conclusion was right, but it rested on two errors that happened to cancel. Their acetone extraction recovered only part of the lipid, and they estimated cell area from dried smears, which underestimates it. Mammalian erythrocytes, which lack nuclei and internal membranes, were the ideal choice: all their lipid is in the plasma membrane.
:::
:::

### The two leaflets differ

The lipid compositions of the two leaflets are not the same. In the plasma membrane of animal cells, PC, sphingomyelin and glycolipids are mostly in the outer (exoplasmic) leaflet, while PE, PS and the phosphoinositides are mostly in the inner (cytosolic) leaflet. Because PS is negatively charged, the cytosolic face carries a net negative charge, which attracts positively charged patches on peripheral proteins.

Asymmetry persists because a phospholipid's polar head group must cross the hydrophobic core to move between leaflets, and that **flip-flop** is extremely slow — with half-times of hours to days in pure lipid vesicles (Roger Kornberg and Harden McConnell measured about 6.5 hours for a spin-labelled PC in 1971). Cells create and maintain the asymmetry with enzymes: ATP-driven **flippases** move PS and PE inward, **floppases** move lipids outward, and calcium-activated **scramblases** randomise the leaflets. The asymmetry carries information. When a cell undergoes apoptosis, scrambling exposes PS on the outer surface, where it acts as an "eat me" signal to phagocytes ([[cell-biology/tissues-and-cell-death]]). Cholesterol, with only a hydroxyl head, flips in seconds or less.

Phosphoinositides deserve a special mention. Although they are a few per cent of the lipid, the inositol ring can be phosphorylated on positions 3, 4 and 5 in seven combinations, and different combinations mark different membranes: PI(4,5)P₂ the plasma membrane, PI(4)P the Golgi, PI(3)P early endosomes. Proteins with domains that recognise particular phosphoinositides are recruited to the right membrane, and PI(4,5)P₂ is the source of two second messengers in [[cell-biology/cell-signalling]].

## Fluidity

A bilayer at body temperature is a two-dimensional liquid. Individual lipids exchange places with their neighbours about $10^7$ times per second, rotate about their long axes, and diffuse laterally with a diffusion coefficient of about $1\ \mathrm{\mu m^2\,s^{-1}}$. By the two-dimensional version of [[cell-biology/cells-and-microscopy#prop-diffusion]], $\langle r^2\rangle = 4Dt$, a lipid moves about 2 µm in a second — the length of a bacterium.

Fluidity depends on composition and temperature. Cooled sufficiently, a bilayer of a single lipid freezes at a sharp **transition temperature** $T_\mathrm{m}$ from a fluid, liquid-disordered phase into an ordered gel in which the chains are straight and tightly packed. $T_\mathrm{m}$ rises with chain length and falls with unsaturation, because *cis* kinks prevent tight packing: dimyristoyl-PC (two saturated 14-carbon chains) melts at about 24 °C, dipalmitoyl-PC (16-carbon) at about 41 °C, but dioleoyl-PC, with one *cis* double bond in each 18-carbon chain, at about −17 °C.

Cholesterol acts as a fluidity buffer. Its flat, rigid rings sit alongside the first carbons of neighbouring chains and restrict their motion, making a fluid membrane less fluid and less permeable; but it also prevents chains from packing into a gel. Mixtures of cholesterol and saturated lipids form a distinctive **liquid-ordered** phase: fluid in the sense that molecules diffuse, but with straightened, ordered chains.

::: application Homeoviscous adaptation
Organisms whose temperature follows their surroundings adjust their membranes to keep fluidity roughly constant. Michael Sinensky showed in 1974 that *E. coli* grown at lower temperature makes more unsaturated fatty acids, so that the viscosity of its membranes, measured at the growth temperature, stays nearly the same between about 15 and 43 °C; he called this **homeoviscous adaptation**. Fish, plants and yeast do the same with desaturase enzymes induced by cold. The phenomenon matters in agriculture: the chilling sensitivity of tropical crops such as cucumber or banana correlates with membrane lipids that order at temperatures a little above freezing.
:::

### Measuring lateral motion

Two experiments made membrane fluidity visible. In 1970 Larry Frye and Michael Edidin fused mouse and human cells in culture and stained the two species' surface proteins with antibodies carrying different fluorescent dyes. Immediately after fusion each half of the hybrid cell had its own colour; within about 40 minutes at 37 °C the two had intermixed completely. Mixing was blocked at low temperature but not by inhibitors of ATP synthesis or protein synthesis, so it was passive diffusion in a fluid membrane, not active redistribution or new synthesis.

The modern quantitative version is **fluorescence recovery after photobleaching** (FRAP): a laser destroys the fluorescence in a small spot, and unbleached molecules diffusing in from around it restore the signal.

::: proposition Diffusion coefficient from FRAP {#prop-frap}
If fluorescent molecules diffuse freely in a membrane, and a uniform circular spot of radius $w$ is bleached instantaneously, the fluorescence recovers with a half-time $t_{1/2}$ related to the lateral diffusion coefficient by

$$
D \approx \frac{0.224\,w^2}{t_{1/2}}.
$$ {#eq-frap}

The numerical factor comes from solving the two-dimensional diffusion equation for this geometry (D. M. Soumpasis, 1983; following Daniel Axelrod and colleagues, 1976). Assumptions: a single, freely diffusing population; bleaching much faster than recovery; a spot small compared with the membrane, so the reservoir of unbleached molecules is effectively infinite; no flow. If recovery is incomplete, the fraction that does recover is the **mobile fraction**.
:::

Dimensionally the result is just [[cell-biology/cells-and-microscopy#eq-tdiff]] again: the recovery time grows as the square of the spot size.

::: example A FRAP measurement {#ex-frap}
A GFP-tagged plasma-membrane protein is bleached in a spot of radius 1 µm. Fluorescence recovers to half its final level in 2.0 s and levels off at 70 % of its pre-bleach value. Estimate $D$ and the mobile fraction. How does this compare with a lipid?
::: solution
By [[#eq-frap]], $D \approx 0.224\times(1\ \mathrm{\mu m})^2/2.0\ \mathrm{s} = 0.11\ \mathrm{\mu m^2\,s^{-1}}$. Ignoring the small loss of total fluorescence caused by the bleach itself, the mobile fraction is about 70 %; the other 30 % stays put on the time scale of the experiment, for instance because it is tethered to the cytoskeleton or the extracellular matrix. The protein diffuses roughly ten times more slowly than a typical lipid ($\approx1\ \mathrm{\mu m^2\,s^{-1}}$), which is common for membrane proteins in living cells.
:::
:::

The figure shows a single-exponential recovery curve of the kind fitted to FRAP data; adjust the half-time and the mobile fraction.

::: widget plot
f: M*(1 - exp(-ln(2)*x/T)); M
x: 0, 20
y: 0, 1.05
sliders: T=2:0.2:10:0.1; M=0.7:0.1:1:0.01
labels: \text{fluorescence (fraction of pre-bleach)}; \text{mobile fraction}
caption: A simplified FRAP recovery curve, $F(t) = M\,(1 - e^{-t\ln 2/t_{1/2}})$, against time in seconds; the slider $T$ sets the half-time $t_{1/2}$ and $M$ the mobile fraction (the horizontal line). Real recovery from a uniform circular bleach is not exactly exponential, but single-exponential fits are widely used to read off $t_{1/2}$ and the mobile fraction. With a 1 µm bleach radius, $D \approx 0.224/t_{1/2}$ in µm² s⁻¹.
:::

## Membrane proteins

Lipids make the barrier; proteins do almost everything else. By mass, proteins are about 50 % of a typical plasma membrane, about 25 % of the myelin that insulates nerve axons (mostly lipid, a good insulator), and about 75 % of the inner mitochondrial membrane, which is packed with respiratory complexes. Some 20–30 % of the genes in sequenced genomes encode integral membrane proteins (Anders Krogh and colleagues, 2001), and membrane proteins are the targets of more than half of approved drugs.

::: definition Classes of membrane protein {#def-membrane-proteins}
- **Integral (intrinsic) membrane proteins** have one or more segments embedded in the hydrophobic core. **Transmembrane proteins** span it, with domains on both sides. They can be removed only by detergents or organic solvents that disrupt the bilayer.
- **Lipid-anchored proteins** are attached covalently to a lipid inserted in one leaflet: a myristoyl, palmitoyl or prenyl group on the cytosolic side, or a glycosylphosphatidylinositol (GPI) anchor on the outer side.
- **Peripheral (extrinsic) membrane proteins** bind to the polar surface of the membrane, or to other membrane proteins, by non-covalent interactions, and can be released by changes of salt concentration or pH without disrupting the bilayer.
:::

### Crossing the core: α-helices and β-barrels

The backbone of a polypeptide is polar: every peptide bond carries an N–H donor and a C=O acceptor. Inside the hydrocarbon core there is no water to hydrogen-bond them, so a membrane-spanning segment must satisfy its own backbone hydrogen bonds. Two structures do it.

The **α-helix** bonds each C=O to the N–H four residues along, so all backbone hydrogen bonds are internal; the side chains point outwards, where hydrophobic residues contact the lipid tails. Each residue advances the helix by 0.15 nm along its axis.

The **β-barrel** rolls a β-sheet into a cylinder so that every strand hydrogen-bonds to its neighbours on both sides, and the first strand closes onto the last. Alternate residues of each strand point outwards (hydrophobic, towards the lipid) and inwards (often polar, lining a water-filled channel). β-barrels are found in the outer membranes of Gram-negative bacteria, mitochondria and chloroplasts — a family resemblance that reflects the bacterial ancestry of the organelles ([[cell-biology/organelles]]).

::: example How long is a transmembrane helix? {#ex-tm-helix}
(a) How many residues does an α-helix need to span a 3.0 nm hydrocarbon core at right angles? (b) The single transmembrane segment of human glycophorin A, a red-cell protein, contains the sequence `ITLIIFGVMAGVIGTILLI` (19 residues, one-letter code). Calculate its average hydropathy on the Kyte–Doolittle scale (I 4.5, V 4.2, L 3.8, F 2.8, M 1.9, A 1.8, G −0.4, T −0.7).
::: solution
(a) $3.0\ \mathrm{nm}/0.15\ \mathrm{nm} = 20$ residues. A stretch of roughly 20 hydrophobic residues is the signature of a transmembrane helix (helices that cross at an angle need a few more).

(b) The segment contains I ×6, T ×2, L ×3, F ×1, G ×3, V ×2, M ×1, A ×1. The sum is

$$
6(4.5) + 2(-0.7) + 3(3.8) + 2.8 + 3(-0.4) + 2(4.2) + 1.9 + 1.8 = 50.7,
$$

and the average over 19 residues is $50.7/19 = 2.67$. That is well above the threshold of about 1.6 that Jack Kyte and Russell Doolittle (1982) found to separate membrane-spanning segments from soluble regions with a window of 19 residues. Glycophorin A's helices pair into dimers through the motif GxxxG (glycines 79 and 83) visible in this sequence, which lets two helices pack closely.
:::
:::

Scanning a window along a sequence and plotting average hydropathy gives a **hydropathy plot**: peaks above the threshold predict transmembrane helices. The method is old and crude — modern predictors use machine learning on known structures — but it shows the principle in a few lines.

```python
# Kyte-Doolittle hydropathy profile; plain Python
KD = {'I': 4.5, 'V': 4.2, 'L': 3.8, 'F': 2.8, 'C': 2.5, 'M': 1.9, 'A': 1.8,
      'G': -0.4, 'T': -0.7, 'S': -0.8, 'W': -0.9, 'Y': -1.3, 'P': -1.6, 'H': -3.2,
      'E': -3.5, 'Q': -3.5, 'D': -3.5, 'N': -3.5, 'K': -3.9, 'R': -4.5}

def hydropathy(seq, window=19):
    """Average hydropathy of each window; returns len(seq) - window + 1 values."""
    return [sum(KD[a] for a in seq[i:i + window]) / window
            for i in range(len(seq) - window + 1)]

gpa = "EPEITLIIFGVMAGVIGTILLISYGIRRLIKK"   # glycophorin A, around its membrane segment
print([round(h, 2) for h in hydropathy(gpa)])   # peaks at 2.67 for ITLIIFGVMAGVIGTILLI
```

Notice the run of positively charged residues (RR, KK) just after the hydrophobic stretch. Basic residues are enriched on the *cytosolic* side of transmembrane segments in almost all membrane proteins — the **positive-inside rule** of Gunnar von Heijne (1986) — and they help decide which way round a protein is inserted, a theme of [[cell-biology/protein-sorting]].

::: warning "Integral proteins are fixed in place"
Integral membrane proteins are *in* the membrane but not necessarily anchored in it: in a pure bilayer they diffuse freely. In cells many are slowed or confined — by binding to the cortical actin network under the membrane, by "fences" of cytoskeletal filaments that create corrals tens to hundreds of nanometres across, by tight junctions in epithelia that stop proteins moving between the apical and basolateral surfaces, or by binding to the extracellular matrix. Equally, "peripheral" does not mean unimportant or loosely bound: spectrin, the peripheral protein network under the red-cell membrane, gives the cell its shape and resilience.
:::

### How fast do proteins move? The Saffman–Delbrück result

A protein in a membrane is a cylinder moving through a thin sheet of viscous fluid bounded on both sides by much less viscous water. Philip Saffman and Max Delbrück worked out the hydrodynamics in 1975.

::: proposition Saffman–Delbrück diffusion coefficient {#prop-saffman}
A cylindrical inclusion of radius $a$ spanning a membrane of thickness $h$ and viscosity $\mu_\mathrm{m}$, surrounded by aqueous fluid of viscosity $\mu$, has a lateral diffusion coefficient

$$
D = \frac{k_\mathrm{B}T}{4\pi\mu_\mathrm{m}h}\left[\ln\!\left(\frac{\mu_\mathrm{m}h}{\mu a}\right) - \gamma\right],
$$ {#eq-saffman}

where $\gamma = 0.5772$ is Euler's constant and $k_\mathrm{B}T = 4.28\times10^{-21}\ \mathrm{J}$ at 37 °C. Assumptions: $a$ is small compared with the length $\mu_\mathrm{m}h/\mu$ (typically about a micrometre), the membrane is a continuous fluid, and the protein does not interact with anything else.
:::

The striking feature is the *logarithm*: in three dimensions, the Stokes–Einstein law makes $D$ inversely proportional to the radius, but in a membrane $D$ depends on $a$ only weakly. Most of the drag is set by the membrane's viscosity.

::: example A protein in a bilayer {#ex-saffman}
Estimate $D$ for a transmembrane protein of radius $a = 2\ \mathrm{nm}$ in a bilayer of thickness $h = 4\ \mathrm{nm}$ and viscosity $\mu_\mathrm{m} = 0.1\ \mathrm{Pa\,s}$, with water ($\mu = 10^{-3}\ \mathrm{Pa\,s}$) on both sides, at 37 °C. Compare with the measured value of [[#ex-frap]].
::: solution
The membrane surface viscosity is $\mu_\mathrm{m}h = 4\times10^{-10}\ \mathrm{Pa\,s\,m}$, and $\mu a = 2\times10^{-12}\ \mathrm{Pa\,s\,m}$, so the logarithm is $\ln 200 = 5.30$ and the bracket $5.30 - 0.58 = 4.72$. The prefactor is

$$
\frac{4.28\times10^{-21}}{4\pi(0.1)(4\times10^{-9})} = 8.5\times10^{-13}\ \mathrm{m^2\,s^{-1}},
$$

so $D = 4.0\times10^{-12}\ \mathrm{m^2\,s^{-1}} = 4.0\ \mathrm{\mu m^2\,s^{-1}}$. Measurements of proteins reconstituted in pure lipid vesicles are of this order (the membrane viscosity is uncertain by a factor of a few). The value of $0.1\ \mathrm{\mu m^2\,s^{-1}}$ measured in a living cell is some forty times smaller — a quantitative sign that cell membranes are not the simple fluids the model assumes, because proteins are crowded, corralled and bound.
:::
:::

::: widget plot
f: 0.0851/m*(ln(4000*m/x) - 0.5772)
x: 0.5, 10
y: 0, 8
sliders: m=0.1:0.05:1:0.01
labels: D\ (\mathrm{\mu m^2\,s^{-1}})
caption: The Saffman–Delbrück diffusion coefficient [[#eq-saffman]] in µm² s⁻¹ against the radius $a$ of a membrane protein in nanometres, for a 4 nm thick membrane in water at 37 °C. The slider sets the membrane viscosity $\mu_\mathrm{m}$ in Pa s. Notice how little $D$ changes as $a$ grows twentyfold (it is only logarithmic in $a$), and how strongly it depends on the viscosity.
:::

## The fluid-mosaic model and after

In 1972 S. Jonathan Singer and Garth Nicolson drew these strands together in the **fluid-mosaic model**: a lipid bilayer that behaves as a two-dimensional fluid, in which globular integral proteins are embedded like icebergs in a sea, free to diffuse laterally unless restrained. It replaced the earlier "unit membrane" model of J. David Robertson, which — following Hugh Davson and James Danielli's proposal of 1935 — imagined protein spread in sheets over both lipid surfaces. The decisive evidence came from freeze-fracture electron microscopy, which split membranes between their leaflets and revealed particles (proteins) in the hydrophobic interior; from the Frye–Edidin experiment; and from the thermodynamic argument that hydrophobic segments of proteins should be buried in the core.

::: definition The fluid-mosaic model {#def-fluid-mosaic}
A biological membrane is a fluid **lipid bilayer** in which **integral proteins** are inserted and **peripheral proteins** are bound at the surfaces. Lipids and proteins diffuse laterally within each leaflet; movement between leaflets is slow and enzyme-controlled; the two leaflets and the two faces of each protein are different, so the membrane is asymmetric.
:::

Half a century later the model's core stands, but the picture has become more crowded and more structured.

- **Crowding.** Proteins occupy perhaps a quarter to a third of the area of many membranes, and lipids near a protein are perturbed by it. The "sea" is closer to a dense mosaic with narrow channels of lipid.
- **Compartmentalisation.** Single-particle tracking, notably by Akihiro Kusumi's group, shows molecules hopping between corrals defined by the actin cortex beneath the membrane.
- **Domains.** In model membranes, mixtures of cholesterol, sphingolipids and unsaturated lipids separate into coexisting liquid-ordered and liquid-disordered phases. Kai Simons and Elina Ikonen proposed in 1997 that cell membranes contain **lipid rafts** — small, cholesterol- and sphingolipid-rich domains that gather particular proteins. The idea has been controversial for decades: early evidence relied on detergent extraction that can create domains artificially, and in living cells any such domains appear to be very small (nanometres to tens of nanometres) and short-lived. The current consensus is that membranes have nanoscale heterogeneity driven by lipid–lipid and lipid–protein interactions, but how far "rafts" are discrete, stable structures remains debated.
- **Shape.** Proteins bend membranes. BAR-domain proteins form curved scaffolds, others insert wedge-shaped helices into one leaflet, and coats such as clathrin pull membranes into buds ([[cell-biology/protein-sorting]]).

::: quiz
A mutant yeast cannot make ergosterol and instead accumulates sterol precursors with different shapes. Which consequence is most likely?
- [ ] The cell membrane will be replaced by a protein layer.
- [x] Membrane fluidity and permeability will be altered, and the cell may become more sensitive to temperature and stress.
- [ ] Lipids will begin to flip between leaflets in microseconds.
- [ ] Integral proteins will no longer be able to insert into the membrane.
::: solution
Sterols order the acyl chains of neighbouring lipids, reducing permeability and buffering fluidity against temperature changes; precursors with a different shape do this less well. Such mutants are viable but sensitive to stress. (The antifungal drugs of the azole class act by blocking ergosterol synthesis, and amphotericin B binds ergosterol — the biological reason fungal membranes are drug targets distinct from ours.) The bilayer itself still forms; flip-flop of phospholipids remains slow, and protein insertion is unaffected.
:::
:::

::: intuition A membrane as a two-dimensional liquid crystal
Picture the bilayer as a field of tall grass: each blade (a lipid) is anchored upright at its head, sways and wiggles all the time, and slides past its neighbours — but cannot easily turn upside down. Unsaturated chains are blades with a kink that keeps the field loose; cholesterol is a stiff stake pushed in among them that stops the top blades flopping about. The field is fluid in the plane and ordered across it: a liquid crystal, not an ordinary liquid.
:::

::: history
Charles Ernest Overton noticed in the 1890s that substances enter cells roughly in proportion to their solubility in oil, and inferred a lipid-like boundary. Irving Langmuir's trough for spreading monolayers (around 1917) made it possible for Evert Gorter and François Grendel, in Leiden in 1925, to argue from red-cell lipid that the boundary is a bilayer. Hugh Davson and James Danielli proposed in 1935 that the bilayer is coated on both sides by protein, and J. David Robertson's electron micrographs of the 1950s, showing a three-layer "railway track" about 7.5 nm thick around every membrane, led him to the unit-membrane hypothesis. Alec Bangham showed in 1965 that phospholipids dispersed in water form closed vesicles (liposomes) that retain ions. Larry Frye and Michael Edidin's cell-fusion experiment appeared in 1970, and S. Jonathan Singer and Garth Nicolson's fluid-mosaic model in *Science* in 1972. In 1975 Richard Henderson and Nigel Unwin's electron-diffraction structure of bacteriorhodopsin from *Halobacterium salinarum* showed seven α-helices crossing the membrane, the first direct view of a membrane protein's structure; in 1985 Hartmut Michel, Johann Deisenhofer and Robert Huber reported the first atomic structure of a membrane protein, the photosynthetic reaction centre of *Rhodopseudomonas viridis* (Nobel Prize in Chemistry, 1988).
:::

::: summary
- Membrane lipids are amphipathic: glycerophospholipids, sphingolipids and sterols in eukaryotes; ether-linked isoprenoids in archaea.
- The hydrophobic effect drives amphipathic lipids into bilayers (or micelles, depending on shape); bilayers seal into closed compartments. A bilayer is about 5 nm thick with a 3 nm hydrocarbon core, and each lipid occupies about 0.65 nm²; *E. coli* has about $2\times10^7$ lipids in its plasma membrane.
- The two leaflets differ; flip-flop of phospholipids is slow and controlled by flippases, floppases and scramblases. PS exposure signals apoptosis, and phosphoinositides label membrane identity.
- Membranes are two-dimensional fluids: lipids diffuse at about $1\ \mathrm{\mu m^2\,s^{-1}}$. Fluidity rises with unsaturation and temperature; cholesterol buffers it; cells adapt their lipids to temperature.
- FRAP measures lateral diffusion: $D \approx 0.224\,w^2/t_{1/2}$. The Saffman–Delbrück law makes $D$ depend only logarithmically on protein radius; real cell membranes slow proteins further by crowding and corralling.
- Integral proteins cross the core as α-helices (about 20 hydrophobic residues each) or β-barrels; others are lipid-anchored or peripheral. Positive residues mark the cytosolic side.
- The fluid-mosaic model (Singer and Nicolson, 1972) remains the framework, refined by crowding, corrals, nanoscale domains and curvature.
:::

## Exercises

::: exercise Residues to span a membrane {level=1 check="20"}
How many residues of an α-helix (0.15 nm per residue) are needed to span a hydrocarbon core 3.0 nm thick at right angles to the membrane?
::: solution
$3.0/0.15 = 20$ residues.
:::
:::

::: exercise Lipid diffusion in ten seconds {level=1 check="6.3"}
A lipid diffuses in a membrane with $D = 1\ \mathrm{\mu m^2\,s^{-1}}$. In two dimensions $\langle r^2\rangle = 4Dt$. What is the root-mean-square distance it travels in 10 s, in µm?
::: solution
$r_\text{rms} = \sqrt{4Dt} = \sqrt{4\times1\times10} = \sqrt{40} = 6.3\ \mathrm{\mu m}$.
:::
:::

::: exercise Lipids in a plasma membrane {level=1 check="3.1"}
An animal cell has a plasma membrane area of 1000 µm². With 0.65 nm² per lipid, how many lipid molecules does its plasma membrane contain? Give the answer in units of $10^9$.
::: solution
$N = 2\times(1000\times10^6\ \mathrm{nm^2})/0.65\ \mathrm{nm^2} = 3.1\times10^9$. (Remember the factor 2 for the two leaflets; the true number is somewhat lower because proteins occupy part of the area.)
:::
:::

::: exercise A FRAP experiment {level=2 check="0.224"}
A fluorescent lipid analogue is bleached in a circular spot of radius 2 µm, and its fluorescence recovers with a half-time of 4.0 s. Estimate its diffusion coefficient in µm² s⁻¹ using [[#eq-frap]].
::: solution
$D \approx 0.224\times(2)^2/4.0 = 0.224\ \mathrm{\mu m^2\,s^{-1}}$. That is a few times slower than a lipid in a pure bilayer, plausibly because of the crowding of a cell membrane.
:::
:::

::: exercise Size hardly matters {level=2 check="1.34"}
Using [[#eq-saffman]] with $\mu_\mathrm{m}h = 4\times10^{-10}\ \mathrm{Pa\,s\,m}$ and $\mu = 10^{-3}\ \mathrm{Pa\,s}$, calculate the ratio of the diffusion coefficients of two proteins of radius 1 nm and 4 nm, $D(1\ \mathrm{nm})/D(4\ \mathrm{nm})$, to three significant figures. What ratio would the three-dimensional Stokes–Einstein law, $D \propto 1/a$, predict?
::: solution
The prefactor cancels, so the ratio is

$$
\frac{\ln(400) - 0.5772}{\ln(100) - 0.5772} = \frac{5.991 - 0.577}{4.605 - 0.577} = \frac{5.414}{4.028} = 1.34.
$$

Stokes–Einstein would give a ratio of 4. In a membrane a fourfold larger protein diffuses only about 25 % more slowly. Conversely, measuring a large difference in $D$ between two similar-sized proteins in a cell suggests that one is interacting with something.
:::
:::

::: exercise Interpreting the Frye–Edidin experiment {level=2}
In the mouse–human cell fusion experiment, the two sets of surface proteins intermixed within about 40 minutes at 37 °C. Explain what each of the following results shows: (a) at 15 °C intermixing was greatly slowed; (b) inhibitors of ATP production did not prevent it; (c) inhibitors of protein synthesis did not prevent it. (d) Suppose a later study found that 20 % of the labelled proteins never intermixed. Suggest an explanation consistent with the fluid-mosaic model.
::: solution
(a) Lowering the temperature reduces membrane fluidity (and, if below the transition of some lipids, makes parts of the membrane gel-like), slowing diffusion — consistent with movement through a fluid lipid phase.
(b) Intermixing does not need metabolic energy, so it is passive diffusion rather than active transport of proteins by the cytoskeleton.
(c) New proteins are not being made and inserted uniformly; the existing proteins are moving.
(d) An immobile fraction, as in [[#ex-frap]]: some proteins are tethered to the cytoskeleton or extracellular matrix, or confined in corrals, while remaining in a fluid bilayer. The fluid-mosaic model allows lateral movement; it does not require it of every protein.
:::
:::

::: exercise Is it a transmembrane helix? {level=2 check="1.55"}
Calculate the average Kyte–Doolittle hydropathy of the 19-residue segment `LLKVAAILGLFVSLAWGSN` (values: L 3.8, K −3.9, V 4.2, A 1.8, I 4.5, G −0.4, F 2.8, S −0.8, W −0.9, N −3.5), to three significant figures. Is it likely to be a transmembrane helix by the threshold of 1.6? What other information would you want?
::: solution
Counts: L ×5, K ×1, V ×2, A ×3, I ×1, G ×2, F ×1, S ×2, W ×1, N ×1. Sum $= 19.0 - 3.9 + 8.4 + 5.4 + 4.5 - 0.8 + 2.8 - 1.6 - 0.9 - 3.5 = 29.4$; average $29.4/19 = 1.55$.

It falls just below the threshold, so the hydropathy plot alone cannot decide. The window includes a lysine near one end and a polar tail (S, N), and shifting the window by a few residues could raise the score above 1.6. You would want to scan neighbouring windows, look for flanking positive charges (the positive-inside rule), compare with homologous proteins, and ideally test topology experimentally — for instance by checking which side of the membrane a tag or glycosylation site ends up on. Some signal sequences (see [[cell-biology/protein-sorting]]) also have hydrophobic cores of about this hydropathy but are cleaved rather than remaining as anchors.
:::
:::

::: exercise Homeoviscous adaptation in data {level=3}
*E. coli* grown at 37 °C and at 17 °C has membrane phospholipids whose fatty acids are, respectively, about 45 % and 30 % saturated (illustrative values; the direction of change is well established). (a) Explain how this change helps the cell. (b) When cells grown at 37 °C are shifted to 17 °C, the fatty-acid composition changes within minutes even before new enzyme can be made. Suggest how. (c) A membrane biologist argues that cells regulate "fluidity" itself; another argues that they regulate the phase behaviour (keeping the membrane above a gel transition). Which measurements would distinguish these views?
::: solution
(a) More *cis*-unsaturated chains lower the transition temperature and keep the membrane fluid at 17 °C, so transporters, enzymes and membrane-bound processes such as cell division keep working; at 37 °C the more saturated chains prevent the membrane becoming too fluid and leaky.
(b) In *E. coli* a pre-existing enzyme (FabF, a β-ketoacyl-ACP synthase) is intrinsically more active at low temperature and elongates the unsaturated C16 chain to C18, shifting composition without new protein synthesis. (Students without this specific fact should propose that existing enzymes' activities are temperature-dependent.)
(c) Measure viscosity (for example by fluorescence anisotropy or FRAP) at each growth temperature to see whether it is held constant, and measure the gel–fluid transition (by calorimetry) to see whether the growth temperature is held a fixed distance above it. Modern work suggests both properties are regulated and that maintaining fluid, phase-separation-free membranes matters for function, so the answer need not be either-or.
:::
:::

::: exercise Why are leaflets asymmetric? {level=3}
A biologist labels the amino group of PE and PS with a reagent that cannot cross membranes. On intact red cells about 20 % of the PE and almost none of the PS is labelled; on cells broken open (so the reagent reaches both faces) all of both is labelled. (a) What does this show about the leaflets? (b) After raising cytosolic Ca²⁺ in intact cells, PS labelling rises to about 40 % within minutes. Explain. (c) Why is it essential that the reagent cannot cross the membrane, and what control would show that it does not?
::: solution
(a) About 80 % of PE and essentially all PS are in the inner (cytosolic) leaflet; the rest of the PE faces outwards.
(b) Calcium activates scramblases (in platelets, the scramblase TMEM16F), which move lipids between leaflets in both directions and so randomise their distribution, bringing PS to the outer leaflet. In platelets this exposed PS helps assemble blood-clotting enzymes; in apoptotic cells it signals phagocytes.
(c) If the reagent could cross, it would label inner-leaflet lipids in intact cells and the asymmetry would be underestimated. A control is to show that a cytosolic molecule (for example haemoglobin's reactive groups, or an internal marker) is not labelled in intact cells, or that an impermeant probe of known behaviour gives the same result.
:::
:::
