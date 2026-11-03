Open any entry in the Protein Data Bank and you find a list of atoms, each with three coordinates in ångströms. Myoglobin is about 1,200 non-hydrogen atoms; a ribosome is more than 200,000. A list of numbers on that scale is useless until we learn to see the patterns in it. Fortunately there are patterns, and remarkably few of them. Almost every protein is built from the same two regular backbone conformations, the α-helix and the β-strand, joined by turns and loops. These pack into a limited set of recurring arrangements, the **folds**, many of which turn up again and again in proteins of unrelated function. Learning to read a structure means learning this vocabulary: from the geometry of a single peptide unit to the classification of whole domains.

This chapter assumes the basics from [[biochemistry/amino-acids-proteins]]: the twenty amino acids, the four levels of protein structure, domains and homology. The chemistry of the planar peptide bond and the origin of the Ramachandran plot are worked out in Chemistry Atlas ([Amino acids and protein structure](/learn/chemistry/lesson.php?c=biochemistry&l=amino-acids-proteins)). Here we look more closely at the geometry, then build up from secondary structure through motifs and packing to folds, domain classification, membrane proteins and symmetric assemblies. Distances are given in ångströms (1 Å = 0.1 nm), the unit of structural biology.

## The backbone and its two degrees of freedom

A polypeptide backbone is a repeating sequence of three atoms, N–Cα–C, per residue. The peptide bond between the carbonyl carbon C of one residue and the nitrogen N of the next has about 40 % double-bond character, so the six atoms Cα–C(=O)–N(–H)–Cα lie in a plane, the **peptide plane**, and the torsion angle ω about the C–N bond is close to 180° (*trans*). The exception is the bond preceding proline, where the *cis* form (ω ≈ 0°) is found in about 5 % of cases, compared with roughly 0.03 % for other residues. Bond lengths and angles are almost fixed: N–Cα 1.46 Å, Cα–C 1.52 Å, C–N 1.33 Å. The chain is therefore a string of rigid plates hinged at each α-carbon, and its conformation is described almost entirely by two angles per residue.

::: definition Backbone torsion angles {#def-torsion}
For residue $i$, the torsion angle **φ** (phi) is the dihedral angle about the N–Cα bond, defined by the four atoms C$_{i-1}$–N$_i$–Cα$_i$–C$_i$; **ψ** (psi) is the dihedral about the Cα–C bond, defined by N$_i$–Cα$_i$–C$_i$–N$_{i+1}$; and **ω** is the dihedral about the peptide bond, Cα$_i$–C$_i$–N$_{i+1}$–Cα$_{i+1}$. A dihedral angle A–B–C–D is the angle between the plane ABC and the plane BCD, taken as positive if, looking along B→C, the bond A–B must be turned clockwise to eclipse C–D. Angles run from −180° to +180°.
:::

Side-chain conformations are described in the same way by torsion angles χ₁, χ₂, …, and side chains spend most of their time near a few staggered positions called **rotamers**. Given φ, ψ, ω and the χ angles of every residue, together with the standard bond geometry, the coordinates of all atoms follow.

::: example Measuring φ from coordinates {#ex-phi}
In a model, the carbonyl carbon of residue $i-1$ is at $(-0.70, 1.13, 0.00)$, the amide nitrogen of residue $i$ at $(0, 0, 0)$, its α-carbon at $(1.46, 0, 0)$ and its carbonyl carbon at $(2.00, 0.71, -1.23)$, all in Å. Find φ for residue $i$.
::: solution
Form the three bond vectors $\mathbf b_1 = \mathrm{N} - \mathrm{C}_{i-1} = (0.70, -1.13, 0)$, $\mathbf b_2 = \mathrm{C\alpha} - \mathrm N = (1.46, 0, 0)$ and $\mathbf b_3 = \mathrm C - \mathrm{C\alpha} = (0.54, 0.71, -1.23)$. The normals to the two planes are

$$
\mathbf n_1 = \mathbf b_1\times\mathbf b_2 = (0,\ 0,\ 1.650), \qquad \mathbf n_2 = \mathbf b_2\times\mathbf b_3 = (0,\ 1.796,\ 1.037).
$$

The angle between them satisfies $\cos\varphi = \mathbf n_1\cdot\mathbf n_2/(\lvert\mathbf n_1\rvert\lvert\mathbf n_2\rvert) = 1.711/(1.650\times2.074) = 0.500$, so $\lvert\varphi\rvert = 60°$. The sign is the sign of $\mathbf b_1\cdot\mathbf n_2 = -1.13\times1.796 = -2.03$, which is negative, so $\varphi = -60°$. This residue sits in the α-helical region of the Ramachandran plot. (Check of the geometry: the N–Cα distance is 1.46 Å and the Cα–C distance $\lvert\mathbf b_3\rvert = 1.52$ Å, as they should be.)
:::
:::

The same calculation, written as code, is the core of every program that analyses structures:

```python
import math

def sub(a, b):   return [a[k] - b[k] for k in range(3)]
def dot(a, b):   return sum(a[k] * b[k] for k in range(3))
def cross(a, b): return [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]]

def dihedral(p0, p1, p2, p3):
    """IUPAC dihedral angle p0-p1-p2-p3 in degrees; points are (x, y, z) in Å."""
    b1, b2, b3 = sub(p1, p0), sub(p2, p1), sub(p3, p2)
    n1, n2 = cross(b1, b2), cross(b2, b3)
    y = math.sqrt(dot(b2, b2)) * dot(b1, n2)
    x = dot(n1, n2)
    return math.degrees(math.atan2(y, x))

print(dihedral((-0.70, 1.13, 0), (0, 0, 0), (1.46, 0, 0), (2.00, 0.71, -1.23)))  # about -60.0
```

### The Ramachandran plot

Most combinations of φ and ψ are forbidden because they would push atoms of neighbouring peptide planes, or of the side chain's β-carbon, into each other. In 1963 G. N. Ramachandran, C. Ramakrishnan and V. Sasisekharan mapped the allowed combinations using hard-sphere atoms, and the resulting **Ramachandran plot** remains the first thing a structural biologist checks in a new model. In high-resolution structures more than 98 % of non-glycine residues fall into a few favoured regions:

| region | typical φ, ψ | conformation |
|---|---|---|
| right-handed α (lower left quadrant) | −63°, −43° | α-helix, also isolated residues in loops |
| β (upper left quadrant) | −120° to −140°, +115° to +135° | extended strands of β-sheets |
| polyproline II (PPII) | −75°, +145° | left-handed extended helix; collagen; common in loops and unfolded chains |
| left-handed αL (upper right) | +60°, +45° | rare except for glycine, and for Asn and Asp in turns |

Glycine, with only a hydrogen as side chain, can visit regions forbidden to all other residues, and it is often found where a chain needs an unusual turn. Proline, whose side chain loops back to its own nitrogen, is locked near φ = −65°; it lacks an amide hydrogen, so it cannot donate a hydrogen bond, which is why it breaks helices except in their first turn.

::: warning A residue outside the favoured regions is not automatically an error
Validation programs flag "Ramachandran outliers", and in a low-resolution model most outliers are mistakes. But a few strained conformations are real: they are often found at functional sites, where the strain is paid for by binding or catalysis, and they are conserved across homologues. An outlier in a well-defined region of a high-resolution map, supported by clear density, is a feature to explain, not an error to remove.
:::

## Secondary structure

**Secondary structure** is the local conformation of the backbone that repeats along the chain and is held together by hydrogen bonds between backbone C=O and N–H groups. Burying a polar backbone inside a protein costs free energy unless its hydrogen-bonding partners are satisfied, and the helix and sheet are the two ways of doing that within the chain itself.

### Helices

::: definition The α-helix {#def-alpha-helix}
The **α-helix** is a right-handed helix in which every residue has φ ≈ −63° and ψ ≈ −43°. The carbonyl oxygen of residue $i$ accepts a hydrogen bond from the amide N–H of residue $i+4$, so that each hydrogen bond closes a ring of 13 atoms. The helix has **3.6 residues per turn**, a **rise of 1.5 Å per residue** along the axis and a **pitch of 5.4 Å**; successive residues are rotated by 100° about the axis. All N–H groups point towards the N-terminus and all C=O groups towards the C-terminus; side chains project outwards and slightly back towards the N-terminus.
:::

Two related helices occur in proteins. The **3₁₀-helix** has hydrogen bonds from $i$ to $i+3$, 3.0 residues per turn and a rise of 2.0 Å; it is tighter and longer per residue, and is usually found as a single turn at the end of an α-helix. The **π-helix** has hydrogen bonds from $i$ to $i+5$ and about 4.4 residues per turn; long π-helices are rare, but single π-turns, or "α-bulges", created by inserting one residue into an α-helix, occur in about 15 % of proteins and are often at functional sites.

Helices in globular proteins average about 10–12 residues (three turns), but range from four to many tens. Their ends are special. The first four N–H groups and the last four C=O groups have no partner within the helix, and residues at the N-terminal end — the **N-cap** — are often Ser, Thr, Asp or Asn, whose side chains accept hydrogen bonds from the free N–H groups. Because all the peptide dipoles point the same way, the helix has a net **macrodipole**, often described as roughly half a positive charge at the N-terminus and half a negative charge at the C-terminus (W. G. J. Hol and colleagues, 1978). Phosphate groups of bound nucleotides and the negatively charged side chains of Asp and Glu are frequently found at helix N-termini.

::: example Faces of a helix {#ex-helix-face}
In an α-helix, which of residues $i+1$, $i+2$, $i+3$, $i+4$ and $i+7$ lie on the same face as residue $i$? A segment has Leu at positions 1, 4, 5, 8, 11, 12 and 15 and charged or polar residues elsewhere. What kind of helix is it, and how long is it?
::: solution
Each residue is rotated 100° from the previous one. Relative to residue $i$, residue $i+1$ is at 100°, $i+2$ at 200° (i.e. −160°), $i+3$ at 300° (−60°), $i+4$ at 400° (+40°) and $i+7$ at 700° (−20°). So $i+3$, $i+4$ and $i+7$ lie within 60° of residue $i$, on the same face, while $i+1$ and $i+2$ do not. The pattern of Leu at 1, 4, 5, 8, 11, 12, 15 is spaced 3, 1, 3, 3, 1, 3 — exactly this $i, i+3, i+4, i+7$ pattern — so all the leucines form a stripe down one side: an **amphipathic helix**, with a non-polar face that can pack against another helix or lie on a membrane, and a polar face exposed to water. Fifteen residues span $15\times1.5 = 22.5$ Å, a little over four turns.
:::
:::

The figure draws the positions of 18 successive residues projected onto a plane perpendicular to the helix axis, the **helical wheel** first used by M. Schiffer and A. B. Edmundson in 1967.

::: widget plot
f: sqrt(1 - x^2); -sqrt(1 - x^2)
x: -1.6, 1.6
y: -1.2, 1.2
equal: true
points: 1.000, 0.000; -0.174, 0.985; -0.940, -0.342; 0.500, -0.866; 0.766, 0.643; -0.766, 0.643; -0.500, -0.866; 0.940, -0.342; 0.174, 0.985; -1.000, 0.000; 0.174, -0.985; 0.940, 0.342; -0.500, 0.866; -0.766, -0.643; 0.766, -0.643; 0.500, 0.866; -0.940, 0.342; -0.174, -0.985
caption: Helical wheel: the positions of residues 1–18 of an ideal α-helix seen down its axis, each placed 100° further round the circle than the last (residue 1 at the right, angles increasing anticlockwise). Hover over the points to read their positions. Eighteen residues make exactly five turns, so residue 19 would land on residue 1 again; notice how residues 1, 4, 5, 8, 11, 12 and 15 cluster on the right-hand side of the wheel, the stripe that makes a helix amphipathic.
:::

### β-Strands and β-sheets

::: definition β-Sheet {#def-beta-sheet}
A **β-strand** is a segment of chain in an extended conformation (φ ≈ −120°, ψ ≈ +130°), with a rise of about **3.3 Å per residue** and side chains pointing alternately to opposite sides. A **β-sheet** is formed when two or more strands lie side by side and are linked by backbone hydrogen bonds between neighbouring strands, about 4.8 Å apart. In an **antiparallel** sheet, adjacent strands run in opposite directions; in a **parallel** sheet, in the same direction; **mixed** sheets have both. Strands are typically 5–10 residues long.
:::

Because side chains alternate, one face of a strand is formed by residues $i, i+2, i+4, \dots$ and the other by $i+1, i+3, \dots$; a strand at the edge of a sandwich, with one face buried and one exposed, therefore shows an alternating pattern of hydrophobic and polar residues, the β counterpart of the amphipathic helix. Sheets are almost never flat. Viewed along the strands, they have a **right-handed twist** of roughly −20° per residue between adjacent strands (a consequence of the chirality of L-amino acids), so that large sheets curl into saddles, propellers and barrels. The edge strands of a sheet have unpaired N–H and C=O groups that could pair with any other strand; natural proteins protect them by bulges, prolines, charged residues and loops, because exposed edges are a route to the intermolecular β-sheets of amyloid ([[structural-biology/protein-folding]]).

::: quiz
A 9-residue segment has the sequence Val-Lys-Ile-Thr-Val-Glu-Phe-Ser-Leu. In which secondary structure is it most likely to be found, and with what environment?
- [ ] An α-helix fully buried in the protein core
- [x] An edge β-strand with one face against the core and one face exposed to water
- [ ] An amphipathic α-helix lying on a membrane
- [ ] A loop, because it contains charged residues
::: solution
The hydrophobic residues (Val, Ile, Val, Phe, Leu) are at positions 1, 3, 5, 7 and 9 and the polar ones (Lys, Thr, Glu, Ser) at 2, 4, 6, 8: strict alternation with period 2. In a β-strand alternate side chains point to opposite faces, so this is the signature of a strand with one buried and one exposed face. An amphipathic helix would show the $i, i+3, i+4, i+7$ pattern of period about 3.6.
:::
:::

### Turns and loops

Helices and strands are connected by **turns** and **loops**, which make up roughly a third to a half of a typical globular protein. The commonest, the **β-turn**, involves four residues $i$ to $i+3$ with a hydrogen bond from C=O of $i$ to N–H of $i+3$, reversing the direction of the chain within about 7 Å; it comes in several types defined by the φ, ψ of residues $i+1$ and $i+2$, with Pro favoured at $i+1$ and Gly at $i+2$ of some types. Two antiparallel strands joined by a short turn form a **β-hairpin**. Loops are where most insertions and deletions accumulate during evolution and where most binding sites and catalytic residues lie, precisely because they are not constrained by regular hydrogen bonding.

## Supersecondary structure and motifs

A few combinations of secondary structures are so common that they have names. These **supersecondary structures** or **motifs** are larger than a helix and smaller than a domain.

- **β-hairpin** and **β-meander**: antiparallel strands connected by short turns, each strand next to its neighbour in sequence.
- **Greek key**: four antiparallel strands in which the connection between strands 3 and 4 folds back over the end of the hairpin, named by J. Richardson after a pattern on Greek pottery.
- **β–α–β unit**: two parallel strands in the same sheet, joined by a helix that packs against the sheet. Parallel strands cannot be joined by a short hairpin, because the chain must return to the start of the sheet; the crossover connection is almost always **right-handed** (J. Richardson, 1976; M. J. E. Sternberg and J. M. Thornton, 1976), a rule obeyed in more than 98 % of known cases and an important constraint in modelling.
- **Helix–turn–helix**: two helices at an angle of about 120°, joined by a tight turn, which places the second, "recognition" helix into the major groove of DNA ([[structural-biology/nucleic-acid-structure]]).
- **EF-hand**: a helix–loop–helix in which the 12-residue loop binds a calcium ion, found in calmodulin and other Ca²⁺ sensors (R. H. Kretsinger, parvalbumin from carp muscle, 1973).
- **Zinc finger** (Cys₂His₂): a β-hairpin and an α-helix of about 30 residues held together by a zinc ion coordinated by two cysteines and two histidines; too small to fold without the metal.

### Helix packing and coiled coils

Helices pack against each other in a few preferred ways, determined by how the ridges of side chains on one helix fit into the grooves of another. In 1953 Francis Crick predicted that two α-helices could wind round each other with side chains interlocking as **knobs into holes**, and he explained the 5.1 Å meridional reflection of α-keratin by such a supercoil.

::: definition Coiled coil and heptad repeat {#def-coiled-coil}
A **coiled coil** consists of two or more α-helices wound around each other into a left-handed supercoil. Its sequence shows a **heptad repeat** $(abcdefg)_n$, in which positions $a$ and $d$ are usually hydrophobic (often Leu, Ile or Val) and form the interface between helices, while $e$ and $g$ are often charged residues that form salt bridges across the interface and $b$, $c$ and $f$ are exposed. Because 7 residues make almost exactly two turns (3.5 residues per turn rather than 3.6), the hydrophobic stripe winds slowly round each helix and the helices must coil around one another to keep it buried.
:::

The leucine zipper of the yeast transcription factor GCN4, a two-stranded coiled coil with Leu at every $d$ position, was solved by E. K. O'Shea, J. D. Klemm, P. S. Kim and T. Alber in 1991. Changing the residues at $a$ and $d$ switches the same peptide between dimers, trimers and tetramers (P. B. Harbury and colleagues, 1993), an early demonstration that simple sequence rules can specify a structure — one of the foundations of protein design ([[structural-biology/dynamics-and-design]]).

::: example A coiled-coil domain {#ex-coiled-coil}
The rod of a muscle myosin heavy chain is a two-stranded coiled coil about 1,100 residues long. Estimate its length, taking a rise of 1.48 Å per residue along the coiled-coil axis, and the number of heptads.
::: solution
Length $\approx 1100\times1.48\ \text{Å} = 1628\ \text{Å} \approx 160$ nm, and the number of heptads is $1100/7 \approx 157$. Electron micrographs of the myosin tail show a rod of about 150–160 nm, consistent with an almost uninterrupted coiled coil. The same principle builds the long rods of keratins, of the spectrin-associated proteins and of the stalks of kinesin and dynein ([[structural-biology/molecular-machines]]).
:::
:::

## Tertiary structure: cores, surfaces and size

How do secondary structures assemble into a compact domain? The organising force is the **hydrophobic effect** ([Chemistry Atlas: water and noncovalent interactions](/learn/chemistry/lesson.php?c=biochemistry&l=water-noncovalent)): non-polar side chains are removed from water and packed into a core, while polar and charged groups remain on the surface. F. M. Richards showed in 1974 that protein interiors are packed as densely as organic crystals, with a packing density (the fraction of volume occupied by atoms) of about 0.75, close to the 0.74 of close-packed spheres. Proteins are compact, but not spheres: their surfaces are rough, with grooves and pockets.

::: proposition Size scaling of folded and unfolded chains (empirical) {#prop-scaling}
For a single-domain globular protein of $N$ residues, the radius of gyration $R_g$ (the root-mean-square distance of atoms from the centre of mass) is approximately

$$
R_g^\mathrm{folded} \approx 2.2\,N^{0.38}\ \text{Å},
$$ {#eq-rg-folded}

close to the $N^{1/3}$ of a compact object (J. Skolnick and colleagues, 1997). For the same chain unfolded in concentrated denaturant,

$$
R_g^\mathrm{unfolded} \approx 1.93\,N^{0.60}\ \text{Å},
$$ {#eq-rg-unfolded}

the scaling of a random coil with excluded volume (J. E. Kohn and colleagues, 2004, from small-angle X-ray scattering). The **solvent-accessible surface area** of a monomeric folded protein of mass $M$ (Da) is approximately

$$
A_s \approx 6.3\,M^{0.73}\ \text{Å}^2
$$ {#eq-asa}

(S. Miller, J. Janin, A. Lesk and C. Chothia, 1987). All three are empirical fits to sets of proteins, and individual proteins deviate by 10–20 %; elongated and multidomain proteins deviate more.
:::

The exponents carry the physics. For a compact object, volume grows like $N$ and so linear size like $N^{1/3}$; for a self-avoiding random coil, Flory's theory gives $N^{3/5}$. The surface-area exponent 0.73 is larger than the 2/3 of a smooth sphere because bigger proteins have rougher surfaces.

::: example How much does unfolding swell a protein? {#ex-rg}
Estimate $R_g$ for a 150-residue protein in its folded and fully unfolded states. Compare the folded surface area of a 17 kDa protein with that of a smooth sphere of the same volume, taking a protein volume of 1.21 Å³ per dalton.
::: solution
From [[#eq-rg-folded]], $R_g^\mathrm{folded} \approx 2.2\times150^{0.38} = 14.8$ Å; from [[#eq-rg-unfolded]], $R_g^\mathrm{unfolded} \approx 1.93\times150^{0.60} = 38.6$ Å, about 2.6 times larger, so the unfolded chain occupies roughly $2.6^3 \approx 18$ times the volume. For 17 kDa, [[#eq-asa]] gives $A_s \approx 6.3\times17\,000^{0.73} \approx 7\,700$ Å². The volume is $1.21\times17\,000 = 20\,600$ Å³, the volume of a sphere of radius $r = (3V/4\pi)^{1/3} = 17.0$ Å and surface $4\pi r^2 \approx 3\,630$ Å². The accessible surface is about twice that of the smooth sphere — partly because it is traced by the centre of a probe of water's radius, partly because of the roughness. (A uniform sphere of radius 17 Å would have $R_g = \sqrt{3/5}\,r = 13.2$ Å, close to the value from [[#eq-rg-folded]].)
:::
:::

::: widget plot
f: 2.2*x^0.38; 1.93*x^0.6
x: 20, 500
y: 0, 80
labels: R_g\ \text{folded}; R_g\ \text{unfolded}
caption: Radius of gyration (Å) against chain length $N$ (residues) for compact folded proteins and for chains unfolded in denaturant, from [[#prop-scaling]]. The gap widens with length: a 50-residue chain roughly doubles in size on unfolding, a 500-residue chain more than triples. Hover to read off values; small-angle X-ray scattering measures exactly this quantity and is used to tell folded from unfolded or disordered states.
:::

Proteins larger than about 200–250 residues are usually made of several domains rather than one large one, perhaps because large single domains fold slowly and are prone to misfolding. Domains are connected by linkers and pack against each other through interfaces similar to those between subunits.

## Folds and their classification

Comparing structures shows that the arrangement of secondary-structure elements in a domain — which elements, in what order and how they are connected in space — recurs among proteins that share no detectable sequence similarity.

::: definition Fold and structural class {#def-fold}
Two domains have the same **fold** if they have the same major secondary-structure elements in the same arrangement and with the same connections (topology), allowing differences in the lengths of loops and in peripheral elements. Domains are grouped into four main **structural classes**: **all-α** (mostly helices), **all-β** (mostly sheets), **α/β** (helices and mainly parallel strands alternating along the chain, as in β–α–β units) and **α+β** (helices and mainly antiparallel strands in separate parts of the chain).
:::

A handful of folds are found in huge numbers of proteins:

- The **TIM barrel**: eight parallel β-strands forming a closed barrel, surrounded by eight α-helices, as eight β–α units. Named after triose phosphate isomerase from chicken muscle (D. W. Banner and colleagues, 1975), it is found in about 10 % of enzymes of known structure, with the active site always at the same end of the barrel (the C-terminal ends of the strands) although the reactions catalysed are very diverse.
- The **Rossmann fold**: a parallel sheet with the strand order 321456, flanked by helices, which binds the dinucleotides NAD⁺ and FAD through a glycine-rich loop at the first β–α junction (M. G. Rossmann and colleagues, 1974).
- The **immunoglobulin fold**: a sandwich of two antiparallel sheets with Greek-key connections, found in antibodies, cell-adhesion molecules, receptors and muscle proteins such as titin.
- The **four-helix bundle**, the **globin fold**, the **β-propeller**, the **jelly roll** (common in virus capsid proteins) and the **P-loop NTPase** fold of kinases and G proteins.

::: definition Structure classification hierarchies {#def-scop-cath}
**SCOP** (Structural Classification of Proteins; A. G. Murzin, S. E. Brenner, T. Hubbard and C. Chothia, 1995) groups domains by **class**, **fold**, **superfamily** (probable common ancestry, inferred from structure and function even when sequence similarity is low) and **family** (clear sequence similarity). **CATH** (C. A. Orengo, J. M. Thornton and colleagues, 1997) uses **Class**, **Architecture** (the overall shape and orientation of secondary structures, regardless of connections), **Topology** (fold) and **Homologous superfamily**. SCOP was originally curated largely by hand, CATH with more automatic structure comparison; both now combine the two.
:::

The databases agree that the number of distinct folds is small compared with the number of proteins: of the order of a thousand to fifteen hundred folds in the classifications of the 2020s, and a few thousand superfamilies, while new experimental structures and predicted models have revealed few genuinely new folds in recent years. Why the repertoire is so limited is still debated. Part of the answer is physical: only certain packings of helices and sheets are compatible with the twist of sheets, the right-handedness of crossovers and a well-packed core. Part is historical: folds that arose early were inherited and diversified, and divergent evolution from common ancestors (homology) is hard to distinguish from convergence on a favoured arrangement (analogy) once sequences have drifted far apart.

::: intuition Structure is conserved longer than sequence
Picture a protein whose sequence accumulates mutations over hundreds of millions of years. Each surviving mutation must keep the core packed, so the core changes slowly, by compensating substitutions, while loops change faster and the overall fold persists. Structural similarity therefore decays slowly as sequence identity falls, and two proteins with only 20 % identity — barely better than random alignment — can still be superimposed closely. Comparing structures, not sequences, is the way to detect very distant relationships.
:::

::: proposition Structural divergence and sequence identity (empirical) {#prop-chothia-lesk}
For pairs of homologous proteins, the root-mean-square deviation $\Delta$ of the main-chain atoms of their common core after optimal superposition increases with the fraction $H$ of residues that differ in the core:

$$
\Delta \approx 0.40\,e^{1.87H}\ \text{Å}
$$ {#eq-chothia-lesk}

(C. Chothia and A. M. Lesk, 1986, from 32 pairs in eight families). Identical sequences ($H=0$) still differ by about 0.4 Å, the noise between independent structure determinations and crystal forms. The fit is empirical, applies to the conserved core (which itself shrinks as sequences diverge), and has wide scatter.
:::

::: example How different are distant homologues? {#ex-chothia}
Using [[#eq-chothia-lesk]], estimate the core RMSD for homologues with 50 % and 30 % sequence identity.
::: solution
At 50 % identity $H = 0.5$, so $\Delta \approx 0.40\,e^{0.935} = 1.0$ Å. At 30 % identity $H = 0.7$ and $\Delta \approx 0.40\,e^{1.309} = 1.5$ Å. Even at 30 % identity the cores superimpose within 1.5 Å — about the length of a single bond — which is why a known structure can serve as a template for modelling a homologue ([[structural-biology/structure-prediction]]). What diverges more are the loops outside the core, and the fraction of the structure that remains "core".
:::
:::

::: widget plot
f: 0.40*exp(1.87*(1 - x/100))
x: 15, 100
y: 0, 3
labels: \Delta\ (\text{Å})
vlines: 30; 50
caption: The Chothia–Lesk relation [[#eq-chothia-lesk]] plotted against percentage sequence identity $100(1-H)$: core RMSD in Å between homologues. Read off the values at 30 % and 50 % identity (vertical lines) used in [[#ex-chothia]]. Below about 25 % identity the curve continues to rise slowly, but in practice the alignment itself becomes unreliable there — the "twilight zone" of sequence comparison.
:::

## Membrane proteins

Integral membrane proteins, roughly a quarter of the proteins encoded by a typical genome, face a different environment: a slab about 30 Å thick of hydrocarbon in the middle, with polar head groups and water on either side. Inside the membrane the backbone's N–H and C=O groups have no water to bond to, so they must be satisfied internally, and only the helix and the closed barrel can do that.

- **α-helical bundles**. Most membrane proteins, in the plasma membrane, endoplasmic reticulum and inner membranes of mitochondria and bacteria, cross the bilayer as helices of about 20 hydrophobic residues ([[cell-biology/membranes]]). Bacteriorhodopsin, the first of them seen in three dimensions (R. Henderson and P. N. T. Unwin, 1975), has seven; the G-protein-coupled receptors share the same seven-helix topology.
- **β-barrels**. The outer membranes of Gram-negative bacteria, mitochondria and chloroplasts contain barrels of 8 to 26 (or more) antiparallel strands, in which the hydrogen bonds close around the barrel. Their strands are short (9–11 residues), and lipid-facing positions alternate with inward-facing ones, which line a pore.

Membrane proteins share recognisable surface features: a band of aliphatic residues in contact with the hydrocarbon core, flanked by "belts" of aromatic Trp and Tyr at the interfaces with the head groups; and an excess of positively charged Lys and Arg in the loops on the cytoplasmic side, the **positive-inside rule** (G. von Heijne, 1986), which helps set the orientation in which the protein is inserted.

## Quaternary structure and symmetry

Many proteins function as assemblies of several chains. Because their subunits are chiral, the only symmetry operations available are **rotations** — no mirror planes or inversion centres — and this restricts the possible arrangements of identical subunits to a short list:

- **cyclic** symmetry $C_n$: $n$ subunits around a single $n$-fold axis, as in rings (the heptameric channel of α-haemolysin is $C_7$);
- **dihedral** symmetry $D_n$: $2n$ subunits with an $n$-fold axis and $n$ perpendicular twofold axes, as in haemoglobin (approximately $D_2$, treating α and β as equivalent) and many tetrameric enzymes;
- **cubic** symmetries: tetrahedral $T$ (12 subunits), octahedral $O$ (24, as in ferritin) and icosahedral $I$ (60), the last used by many virus capsids.

::: definition Interfaces {#def-interface}
An **interface** is the surface by which two subunits or two proteins contact each other. Its size is measured by the **buried surface area**, the solvent-accessible surface lost on complex formation (the sum of the areas lost by both partners). Stable protein–protein interfaces typically bury 1,200–2,000 Å² in total, with a core of hydrophobic and aromatic residues surrounded by a rim of polar ones; small, transient interfaces bury less, and obligate subunit interfaces of large complexes often much more.
:::

Icosahedral viruses show how symmetry builds large structures from small genomes. A capsid of 60 identical subunits encloses only a small volume; to make larger shells, D. L. D. Caspar and A. Klug (1962) showed that $60T$ chemically identical subunits can occupy *quasi-equivalent* positions, with slightly different contacts, for triangulation numbers $T = 1, 3, 4, 7, \dots$ ($T = h^2 + hk + k^2$ for non-negative integers $h$ and $k$). Tomato bushy stunt virus, a $T = 3$ capsid of 180 copies of one protein, was the first virus solved at atomic resolution (S. C. Harrison and colleagues, 1978).

::: application Reading a structure file
Every structure in the Protein Data Bank comes with metadata worth reading before the coordinates. The **method** (X-ray, NMR, electron microscopy) and **resolution** say how much to trust atomic details ([[structural-biology/x-ray-crystallography]]); each atom's **B-factor** (or displacement parameter) says how mobile or poorly defined it is, and its **occupancy** whether it was modelled in more than one position. Since 2014 the archive's standard format has been PDBx/mmCIF, which replaced the fixed-column PDB format partly because large complexes such as ribosomes exceeded its limits of 99,999 atoms and 62 chains. The PDB held more than 230,000 experimentally determined structures as of 2026 (rcsb.org), and the AlphaFold Protein Structure Database more than 200 million predicted models ([[structural-biology/structure-prediction]]); both are freely available, and a structure viewer such as Mol*, PyMOL or ChimeraX is the essential companion to this course.
:::

::: history
Before 1950, many chemists thought proteins might be built from regular repeating units, as fibre diagrams of wool and silk suggested. William Astbury's X-ray photographs of the 1930s distinguished α- and β-keratin, and in 1951 Linus Pauling, Robert Corey and Herman Branson deduced the α-helix and the pleated sheets from first principles, insisting — against prevailing models — on the planar peptide and on a non-integral number of residues per turn. When John Kendrew's sperm-whale myoglobin appeared in 1958, the helices were there, but the overall fold looked irregular, "more complicated than has been predicted by any theory", as Kendrew wrote. Comparing the growing number of structures in the 1970s, Michael Levitt and Cyrus Chothia (1976) proposed the four structural classes, and Jane Richardson's hand-drawn ribbon diagrams of 1981 gave the field the cartoon representation used ever since. The classification databases SCOP (1995) and CATH (1997) turned these observations into hierarchies that now organise hundreds of thousands of domains.
:::

## Where this leads

Knowing what a fold is raises the question of how a chain finds it, and why it sometimes does not: that is [[structural-biology/protein-folding]]. Nucleic acids have an architecture of their own, and proteins recognise them through the motifs met here ([[structural-biology/nucleic-acid-structure]]). The structures themselves come from the methods of [[structural-biology/x-ray-crystallography]], [[structural-biology/nmr-spectroscopy]] and [[structural-biology/cryo-em]], and increasingly from prediction ([[structural-biology/structure-prediction]]), which relies on exactly the conservation of folds described here.

::: summary
- The backbone is a chain of planar peptide units; its conformation is given by φ and ψ per residue (ω ≈ 180°), and the Ramachandran plot shows that only the α, β, PPII and (for Gly) αL regions are favourable.
- The α-helix has 3.6 residues per turn, 1.5 Å rise, $i\to i+4$ hydrogen bonds and a macrodipole; amphipathic helices show the $i, i+3, i+4, i+7$ pattern. β-Strands rise 3.3 Å per residue, alternate their side chains and form twisted parallel or antiparallel sheets.
- Motifs (β–α–β with right-handed crossover, Greek key, helix–turn–helix, EF-hand, zinc finger, coiled coils with heptad repeats) recur across proteins.
- Folded proteins are densely packed, with $R_g \approx 2.2N^{0.38}$ Å; unfolded chains swell to $R_g \approx 1.93N^{0.60}$ Å (empirical).
- Domains fall into four classes and of the order of a thousand folds, classified by SCOP and CATH; structure diverges slowly with sequence ($\Delta \approx 0.40e^{1.87H}$ Å, empirical).
- Membrane proteins are helical bundles or β-barrels; assemblies of chiral subunits have only rotational symmetry ($C_n$, $D_n$, $T$, $O$, $I$).
:::

## Exercises

::: exercise Helix or strand length {level=1 check="3.9"}
A transmembrane segment has 26 residues. How long is it, in nm, as an ideal α-helix?
::: solution
$26\times0.15\ \text{nm} = 3.9$ nm. This is longer than the 3 nm hydrocarbon core, so the helix either tilts in the bilayer or its ends extend into the head-group region.
:::
:::

::: exercise Around the wheel {level=1 check="20"}
On a helical wheel, residue 1 is at 0°. At what angle (between 0° and 360°) is residue 12? Find its point in the helical-wheel figure.
::: solution
Residue 12 is $11\times100° = 1100°$ round, and $1100 - 3\times360 = 20°$. Its point is $(\cos20°, \sin20°) = (0.940, 0.342)$, the twelfth in the figure's list, just above residue 1: residues $i$ and $i+11$ lie on nearly the same face, which is why the stripe of an amphipathic helix repeats every 18 residues with sub-stripes at 3, 4, 7 and 11.
:::
:::

::: exercise Capsid subunits {level=1 check="420"}
How many copies of the capsid protein form an icosahedral shell with triangulation number $T = 7$?
::: solution
$60T = 60\times7 = 420$. ($T = 7$ corresponds to $h = 2$, $k = 1$: $4 + 2 + 1 = 7$.) Bacteriophage HK97 is an example of a $T = 7$ capsid.
:::
:::

::: exercise Heptads of a leucine zipper {level=2}
The sequence `RMKQLEDKVEELLSKNYHLENEVARLKKLVGER` is the leucine-zipper region of GCN4 (33 residues, one-letter code). Assign heptad positions so that the leucines fall at $d$, and say which residues are at $a$. Why are the zipper helices described as forming a "parallel" dimer?
::: hint
Find the leucines and check that they are seven apart.
:::
::: solution
The leucines are at positions 5, 12, 19, 26 (and also at 13 and 29), so 5, 12, 19 and 26 — spaced exactly seven — are the $d$ positions. The $a$ positions are three residues before each $d$: positions 2 (Met), 9 (Val), 16 (Asn), 23 (Val) and 30 (Val). So the $a$ positions are mostly Val with a buried Asn at 16 — the polar Asn pairs with the Asn of the partner helix and is known to favour the dimer over trimers. The two helices run in the same N→C direction, side by side, and so form a parallel coiled coil; this is required for the DNA-binding basic regions at their N-termini to sit next to each other on a DNA site.
:::
:::

::: exercise A dihedral from coordinates {level=2 check="60"}
Keep the first three atoms of [[#ex-phi]] but move the carbonyl carbon to $(2.00, 0.71, +1.23)$. What is φ now (in degrees, with sign)? In which region of the Ramachandran plot does the residue lie, and which amino acid is most likely?
::: solution
Only $\mathbf b_3$ changes, to $(0.54, 0.71, 1.23)$. Then $\mathbf n_2 = \mathbf b_2\times\mathbf b_3 = (0, -1.796, 1.037)$, so $\mathbf n_1\cdot\mathbf n_2$ is still $1.711$ and $\lvert\varphi\rvert = 60°$, but $\mathbf b_1\cdot\mathbf n_2 = (-1.13)(-1.796) = +2.03$, so $\varphi = +60°$: a mirror image of the first conformation. Positive φ is in the left-handed (αL) region, strongly disfavoured for L-amino acids with a β-carbon; the residue is most likely glycine (or occasionally Asn or Asp in a turn).
:::
:::

::: exercise Swelling on unfolding {level=2 check="2.4"}
By what factor does $R_g$ increase when a 100-residue protein unfolds, according to [[#prop-scaling]]? Give two significant figures.
::: solution
Folded: $2.2\times100^{0.38} = 12.7$ Å. Unfolded: $1.93\times100^{0.60} = 30.6$ Å. The ratio is $30.6/12.7 = 2.4$. In general the ratio is $(1.93/2.2)N^{0.22}$, which grows slowly with length.
:::
:::

::: exercise Recognising a fold {level=2}
A domain of 250 residues has the secondary-structure order β α β α β α β α β α β α β α β α, all eight strands parallel, and the eight strands form a closed barrel. (a) Name the fold and its class. (b) Where would you look for the active site? (c) Two such enzymes, one from glycolysis and one from tryptophan biosynthesis, have 12 % sequence identity. Are they homologous? What evidence would help decide?
::: solution
(a) It is a TIM (β/α)₈ barrel, in the α/β class. (b) At the C-terminal ends of the β-strands and the following β→α loops, where the active sites of all TIM-barrel enzymes lie. (c) 12 % identity is no evidence either way: unrelated sequences align at about this level. Common ancestry is supported if the two share features not required by the fold itself — catalytic residues at equivalent positions, similar chemistry (for example a common phosphate-binding site at the same loops), conserved unusual structural details, or a chain of intermediate sequences linking them with significant similarity. Several TIM-barrel enzyme families are now thought to be homologous on such grounds, but convergence on this very stable fold cannot be excluded for all of them.
:::
:::

::: exercise Interpreting a hydropathy pattern {level=3}
A bacterial outer-membrane protein of 170 residues (after removal of its signal peptide) has no stretch of more than 12 consecutive hydrophobic residues, yet it is firmly embedded in the membrane. Its sequence contains eight segments of 9–11 residues in which every second residue is hydrophobic, separated by loops that alternate between long and short. (a) Explain how it crosses the membrane. (b) Which residues of each segment face the lipid? (c) Why does a hydropathy plot of the kind used for helical membrane proteins fail to detect it?
::: solution
(a) It is an eight-stranded β-barrel, like OmpA of *E. coli*: each segment is a transmembrane β-strand, tilted to the membrane normal, and neighbouring strands are hydrogen bonded into a closed barrel, so all backbone groups are satisfied without water. The long loops are on the extracellular side and the short turns face the periplasm, as in many such barrels. (b) The alternate hydrophobic residues point outwards into the lipid, the others into the interior of the barrel (which in small barrels like OmpA is filled by side chains rather than an open pore). (c) A hydropathy plot averages hydrophobicity over windows of about 19 residues to find helices; a strand of 10 residues with alternating polar and non-polar side chains averages out as only moderately hydrophobic. β-Barrel strands are detected instead by the period-2 alternation and, today, by structure prediction.
:::
:::

::: exercise Symmetry of an assembly {level=3}
Glutamine synthetase from *E. coli* has 12 identical subunits arranged as two hexameric rings stacked face to face. (a) What is its point-group symmetry? (b) How many distinct kinds of subunit–subunit interface does each subunit make, at minimum? (c) Could an assembly of identical chiral subunits have a mirror plane? Explain.
::: solution
(a) Two stacked rings of six, related by twofold axes in the plane between the rings, have dihedral symmetry $D_6$ (one sixfold axis and six perpendicular twofold axes; $2\times6 = 12$ subunits). (b) Each subunit contacts its two neighbours within the ring through one type of interface (the two contacts are related by the sixfold axis and use complementary surfaces, so they count as one interface type, made "head to tail"), and at least one subunit in the other ring across a twofold axis: at minimum two kinds, one isologous (across a twofold, using the same surface on both partners) and one heterologous (around the ring). (c) No. A mirror operation converts a chiral object into its enantiomer, which for a protein would be built from D-amino acids. Identical L-protein subunits can be related only by proper rotations, so biological assemblies of identical chains belong to the cyclic, dihedral or cubic rotation groups.
:::
:::
