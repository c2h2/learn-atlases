Put your hands side by side: they are built from the same parts, arranged in the same order, and no rotation of one will ever make it coincide with the other. Molecules can be like that too, and for carbon compounds the consequences run through the whole of chemistry. Carvone is a single compound by every counting rule you have used so far — one formula, one connectivity — and yet bottle one sample to spearmint and its mirror image to caraway, because the proteins in your nose are themselves chiral and grip the two forms differently. This chapter is about the third dimension of organic structure: what makes a molecule chiral, how we name its three-dimensional arrangements unambiguously, how many such arrangements a given connectivity admits, and how we tell them apart in the laboratory with nothing but a beam of polarised light. Every later chapter of this course — substitution, elimination, addition — is in part a story about stereochemistry, and the medicine cabinet is a standing proof that the two mirror images of a molecule are two compounds, not one drawn twice.

## Stereoisomers: same atoms, different arrangements in space

::: definition Constitutional isomers and stereoisomers {#def-stereoisomers}
**Constitutional isomers** (structural isomers) have the same molecular formula but different connectivity — different atoms are bonded to each other, as in butan-1-ol and butan-2-ol. **Stereoisomers** have the same molecular formula *and* the same connectivity but differ in the arrangement of their atoms in space. Stereoisomers divide again: **conformers** interconvert by rotation about single bonds and (for acyclic molecules at room temperature) cannot normally be isolated, while **configurational isomers** — the subject of this chapter — interconvert only by breaking bonds, and are separable, isolable, bottleable compounds.
:::

The distinction is one of barrier, not of kind: the staggered conformers of ethane are "different arrangements in space" in a real sense, but the $12\ \mathrm{kJ\,mol^{-1}}$ barrier means a bottle of ethane flips between them trillions of times a second, while configurational isomers sit behind bond-breaking barriers of hundreds of $\mathrm{kJ\,mol^{-1}}$ — each with its own label on the shelf.

::: example Sorting isomer pairs {#ex-isomer-pairs}
Classify each pair as constitutional isomers or stereoisomers, and for the stereoisomer pairs say (as previewed by later sections of this chapter) whether they are mirror-image or non-mirror-image stereoisomers: (a) butan-1-ol and butan-2-ol; (b) the two configurations of but-2-ene, $\mathrm{CH_3CH{=}CHCH_3}$; (c) the two arrangements of the atoms of butan-2-ol, $\mathrm{CH_3CH(OH)CH_2CH_3}$, at C2; (d) cyclohexane's chair and twist-boat forms.
::: solution
(a) The OH sits on a different carbon: different connectivity, so **constitutional isomers**. (b) Same connectivity, different arrangement across a double bond that cannot rotate without breaking a $\pi$ bond: **stereoisomers**, and the two are not mirror images — a distinction that will matter enormously; we will call such pairs *diastereomers*. (c) Same connectivity, but the four groups on C2 can be arranged two ways that are mirror images of each other: **stereoisomers**, mirror-image pair — *enantiomers*. (d) Same connectivity, interconverting by bond rotation (puckering): **conformers**, a special time-averaged case of stereoisomers that we treat in [[organic-1/conformations]].
:::
:::

## Chirality and the symmetry criterion

::: definition Chirality {#def-chirality}
A molecule (or any object) is **chiral** if it is not superimposable on its mirror image, and **achiral** if its mirror image is superimposable onto it. The two mirror-image forms of a chiral molecule are called **enantiomers**. Chirality is a property of the whole molecule, judged exactly as you would judge hands: try to superimpose the molecule on its mirror image, and ask whether *some* rigid motion (rotation, never bond-breaking) makes all atoms coincide.
:::

::: definition Stereocentre {#def-stereocentre}
A **stereocentre** (stereogenic centre, chiral centre when it is a carbon bearing four different groups) is an atom bearing a set of ligands arranged in space such that swapping two of them produces a different stereoisomer. A tetrahedral carbon bonded to four different groups is the commonest stereocentre in organic chemistry, and the one we analyse first.
:::

The two definitions point in different directions and must not be confused: the stereocentre is a local label on one atom, chirality a global verdict on the whole molecule. The rigorous global test is symmetry. A molecule is achiral if and only if it possesses an **improper rotation axis** $S_n$ — a rotation by $360^\circ/n$ followed by reflection in the perpendicular mirror plane leaves it unchanged. Ordinary rotation axes $C_n$ are harmless: a molecule can have a $C_2$ axis and still be chiral. The two symmetry elements that catch almost every beginner's case are $S_1$, an ordinary mirror plane $\sigma$, and $S_2$, a centre of inversion $i$: if your molecule has a mirror plane or an inversion centre, it is superimposable on its mirror image, and no number of stereocentres can save it.

::: example Finding stereocentres {#ex-stereocentres}
Which of these molecules has a stereocentre, and where? (a) pentan-2-ol $\mathrm{CH_3CH(OH)CH_2CH_2CH_3}$; (b) 3-methylpentane $\mathrm{(CH_3CH_2)_2CHCH_3}$; (c) 1,2-dibromocyclopentane.
::: solution
(a) C2 carries H, OH, $\mathrm{CH_3}$ and $\mathrm{CH_2CH_2CH_3}$: four different groups, so **C2 is a stereocentre** and the molecule is chiral. (b) C3 carries H, $\mathrm{CH_3}$ and *two identical* ethyl groups: not a stereocentre; C2 of each ethyl carries two hydrogens; **no stereocentre exists** and the molecule is achiral — the trap is counting the two arms as different because they are drawn apart. (c) C1 carries Br, H and the two ring arms; C2 likewise. Walking each arm from C1, one reaches C2 (which bears Br) and the other reaches C5 (which does not), so the arms differ: **C1 and C2 are both stereocentres**. Ring carbons are fair game — always compare the two paths around the ring before declaring two arms identical.
:::
:::

::: quiz
Which one of the following is chiral?
- [x] pentan-2-ol
- [ ] pentan-3-ol
- [ ] 2,2-dimethylpropane
- [ ] propan-2-ol
::: solution
Pentan-2-ol has one stereocentre (C2: H, OH, methyl, propyl) and no mirror plane, so it is chiral. Pentan-3-ol's central carbon carries H, OH and *two identical ethyl groups*; 2,2-dimethylpropane's central carbon carries four methyls; propan-2-ol's carbinol carbon carries two methyls. Each has a mirror plane through the odd substituents and is achiral.
:::
:::

::: warning Stereocentres and chirality come apart {#warn-stereocentres-not-chirality}
Three failure modes of the "four different groups means chiral" reflex. **(1)** A molecule with stereocentres can be achiral: if an internal mirror plane divides it into two mirror-image halves, the whole molecule superimposes on its mirror image. Such a compound is called **meso**, and we will take meso-tartaric acid apart in detail below. **(2)** A molecule with *no* stereocentres can be chiral: allenes, twisted alkenes such as *(Z)*-cyclooctene and hindered biaryls owe their handedness to an axis or a helix rather than to an asymmetric carbon. **(3)** The count of stereocentres is not even stable under your choice of drawing: rotate a molecule, and the stereocentres do not move, but a careless glance at a flat formula invents and loses them. When in doubt, run the symmetry test, not the counting test.
:::

## Assigning configuration: the Cahn–Ingold–Prelog rules

Describing a tetrahedral centre as "the mirror-image form of the usual one" is useless; we need a name. The Cahn–Ingold–Prelog (CIP) system assigns each stereocentre a descriptor, *R* or *S*, by a purely mechanical ranking of its four groups.

::: algorithm The CIP rules for a tetrahedral centre {#alg-cip}
**(1)** Rank the four ligands on the stereocentre 1 > 2 > 3 > 4 by the **atomic number** of the atom attached directly: $\mathrm{Br} > \mathrm{Cl} > \mathrm{O} > \mathrm{N} > \mathrm{C} > \mathrm{H}$; a lone pair ranks below hydrogen. **(2)** Isotopes of the same element rank by **mass number**: $\mathrm{T} > \mathrm{D} > \mathrm{H}$. **(3)** Ties are broken **sphere by sphere, outward**: compare the three substituents (excluding the atom you came from) of each tied atom, listed in decreasing rank, and compare the lists atom by atom — the first point of difference decides; never sum. Continue outward only if whole spheres tie. **(4)** Multiple bonds are expanded with **duplicate atoms**: $\mathrm{C{=}O}$ counts as C bonded to (O, O, H-equivalents) and O bonded to (C, C); a ring is traversed as if it opened into a tree, with duplicate atoms at the ring closures. **(5)** View the centre with ligand 4 pointing **away** from you and read 1 → 2 → 3: clockwise is ***R*** (*rectus*), anticlockwise is ***S*** (*sinister*). If the lowest ligand points towards you instead, read the apparent direction and reverse it.
:::

The descriptors are written in italics inside parentheses before the name: (*R*)-butan-2-ol. Nothing in the procedure mentions rotation, taste or origin — *R* and *S* are bookkeeping, and their connection to experiment comes only through measurements like the ones further below.

::: example (*R*)- and (*S*)-butan-2-ol {#ex-rs-butanol}
Assign the configuration of the stereocentre of butan-2-ol drawn with H on a dash (pointing away from you), OH at the top, the ethyl group to the lower right and the methyl group to the lower left.
::: solution
Priorities at C2: OH (O, $Z = 8$) is 1 and H is 4; between the carbon ligands, $\mathrm{CH_2CH_3}$ (C attached to C,H,H) beats $\mathrm{CH_3}$ (C attached to H,H,H) at the first sphere, so ethyl is 2 and methyl is 3. With H already pointing away, read $\mathrm{OH} \rightarrow \mathrm{C_2H_5} \rightarrow \mathrm{CH_3}$: top → lower right → lower left is clockwise, so the drawing is (*R*)-butan-2-ol. Its mirror image — the same drawing with ethyl and methyl exchanged — is (*S*)-butan-2-ol. The two are enantiomers: same name, opposite descriptor, different compounds.
:::
:::

::: example Isotopes break ties: CHBrClD {#ex-rs-isotope}
Bromochloro(deuterio)methane, $\mathrm{CHBrClD}$, has a stereocentre even though only three *elements* appear in the formula. Assign priorities and state what makes the last one.
::: solution
By atomic number, Br (1) > Cl (2). The remaining two ligands are D and H — the same element, so rule (2) applies: deuterium (mass number 2) outranks protium (mass number 1). Priorities: $\mathrm{Br} > \mathrm{Cl} > \mathrm{D} > \mathrm{H}$. Isotopes never create a stereocentre on their own against a different-element tie, but they break ties the atomic number cannot: a C centre bearing H and D, or a $\mathrm{CH_3}$ versus a $\mathrm{CDH_2}$ group (compared sphere by sphere, (D,H,H) beats (H,H,H)), are genuine "four different groups".
:::
:::

::: example Rings and double bonds: 3-bromocyclohexene {#ex-rs-ring}
C3 of 3-bromocyclohexene is a stereocentre. Rank its four ligands, explaining how the two ring arms are compared, and assign the configuration drawn with H on a dash, Br at the top, and the $=\mathrm{CH}{-}$ arm to the right.
::: solution
Br is 1 and H is 4. The two arms both start with carbon, so rule (3) sends us outward. The right arm's first atom is the double-bonded C2: rule (4) expands $\mathrm{C{=}C}$ so that C2 counts as bonded to (C1, C1-duplicate, H) — the list (C, C, H). The left arm's first atom is the $\mathrm{CH_2}$ at C4, bonded to (C5, H, H). Comparing lists in decreasing order, (C, C, H) beats (C, H, H) at the second entry: the unsaturated arm wins, so right arm is 2 and left arm is 3. With H pointing away, $\mathrm{Br} \rightarrow \text{right} \rightarrow \text{left}$ runs clockwise: the drawing is (*R*)-3-bromocyclohexene. Note that the double bond wins not because double bonds are "stronger" but because duplication adds a phantom carbon to the list.
:::
:::

## Fischer projections

Before optical rotation we need one more drawing tool, because chain molecules are conventionally written in a flat projection that carries full stereochemical information.

::: algorithm Manipulating Fischer projections {#alg-fischer}
A **Fischer projection** draws the carbon chain vertically, numbered from the top, with the convention that **vertical bonds point away** from the viewer (dashes) and **horizontal bonds point towards** the viewer (wedges). Rules of manipulation: **(1)** rotating the projection by $180^\circ$ in the plane of the page is allowed (it is a rigid rotation of the molecule); **(2)** rotating by $90^\circ$ is forbidden — it converts every centre to its opposite; **(3)** exchanging any two groups at one centre inverts that centre; an even number of exchanges retains it; **(4)** to assign *R*/*S*: rank as usual, and if the lowest-priority ligand is on a horizontal bond, read the apparent 1 → 2 → 3 direction and **reverse** it (because horizontal means "towards you").
:::

::: example Glyceraldehyde from a Fischer projection {#ex-fischer-glyceraldehyde}
(+)-Glyceraldehyde, $\mathrm{CHO{-}CH(OH){-}CH_2OH}$ (2,3-dihydroxypropanal), is drawn in the standard Fischer projection: CHO at the top, $\mathrm{CH_2OH}$ at the bottom, OH on the right, H on the left. Assign its configuration.
::: solution
Priorities at C2: OH is 1; CHO's carbon counts as (O, O, H) by duplication and beats $\mathrm{CH_2OH}$'s (O, H, H), so CHO is 2 and $\mathrm{CH_2OH}$ is 3; H is 4. Reading $\mathrm{OH} \rightarrow \mathrm{CHO} \rightarrow \mathrm{CH_2OH}$ on the page (right → top → bottom) runs anticlockwise — but H is on a *horizontal* bond, pointing at you, so rule (4) reverses the apparent answer: the centre is ***R***. (+)-Glyceraldehyde is (*R*)-2,3-dihydroxypropanal, the compound whose configuration Fischer in 1891 chose as the reference point of the entire D/L sugar system — as it turned out, correctly (see the historical note below).
:::
:::

::: example Same molecule or mirror image? {#ex-fischer-identity}
Projection A of 2,3-dibromobutane has Br on the right at both C2 and C3; projection B has Br on the left at both centres; projection C has Br right at C2 and left at C3. Relate A to B and A to C.
::: solution
B is A turned through $180^\circ$ in the plane of the page — top and bottom swap, left and right swap — which is a rigid rotation, so **A and B are the same molecule**. Working the descriptors (at each centre $\mathrm{Br} > $ the other $\mathrm{CHBrCH_3}$-bearing arm $> \mathrm{CH_3} > \mathrm{H}$, reversing for horizontal H) gives A = (2*S*,3*R*), and B the same: A is the **meso** compound, achiral, identical to its mirror image. C has one centre inverted relative to A and the other retained: it is (2*R*,3*R*) — renumbering from the other end gives the same descriptor pair, check it — a stereoisomer that is *not* A's mirror image, so **A and C are diastereomers**. One pair of exchanged groups at one centre: that single exchange is the difference between an achiral meso compound and a resolvable chiral one.
:::
:::

## More than one stereocentre

::: proposition The $2^n$ maximum {#prop-2n}
A molecule with $n$ stereocentres has **at most** $2^n$ stereoisomers, since each centre can be independently *R* or *S*. The bound is attained when no two centres are equivalent; it is reduced by internal symmetry, which makes some of the $2^n$ configurations identical to others (as in meso compounds). Enumerating stereoisomers means listing configurations, then quotienting by the molecule's symmetry.
:::

::: definition Enantiomers and diastereomers {#def-diastereomers}
**Enantiomers** are stereoisomers that are non-superimposable mirror images of each other: *every* stereocentre is inverted. **Diastereomers** are stereoisomers that are not mirror images: *some but not all* stereocentres are inverted (or the difference is *E*/*Z* geometry). Enantiomers come in pairs; diastereomers are a relationship between any two non-mirror-image configurational isomers.
:::

::: example Four stereoisomers of 2,3-dibromopentane {#ex-dibromopentane}
2,3-Dibromopentane, $\mathrm{CH_3CHBrCHBrCH_2CH_3}$, has stereocentres at C2 and C3. How many stereoisomers are there, and what are their relationships?
::: solution
The two centres are *not* equivalent (C2 ends in a methyl, C3 in an ethyl), so no internal mirror plane is available and the $2^2 = 4$ configurations are all distinct: (2*R*,3*R*), (2*S*,3*S*), (2*R*,3*S*) and (2*S*,3*R*). The mirror image inverts both centres, so the enantiomer pairs are (2*R*,3*R*)/(2*S*,3*S*) and (2*R*,3*S*)/(2*S*,3*R*); any other pairing — say (2*R*,3*R*) with (2*R*,3*S*) — inverts one centre but not the other and is a **diastereomeric** pair. Four stereoisomers, two enantiomer pairs, and every cross-pair diastereomeric: this is the generic pattern when the $2^n$ bound is attained.
:::
:::

::: definition Meso compound {#def-meso}
A **meso compound** contains stereocentres yet is achiral, because an internal mirror plane maps one half of the molecule onto the other. A meso form is always identical to its own mirror image, so it "eats" two entries of the $2^n$ list: in a symmetric molecule with two equivalent stereocentres the configurations (*R*,*S*) and (*S*,*R*) name one and the same compound.
:::

::: example Meso-tartaric acid, worked {#ex-meso-tartaric}
Tartaric acid is 2,3-dihydroxybutanedioic acid, $\mathrm{HOOC{-}CH(OH){-}CH(OH){-}COOH}$: two equivalent stereocentres. Enumerate its stereoisomers and analyse the symmetry of each.
::: solution
The $2^2 = 4$ configurations collapse to **three stereoisomers**. (2*R*,3*R*) and (2*S*,3*S*) are non-superimposable mirror images — an enantiomer pair; the natural, wine-derived material is (2*R*,3*R*), and the two forms rotate plane-polarised light equally and oppositely. The (2*R*,3*S*) configuration is special: draw the carbon chain as a Fischer projection with both OH groups on the same side, and a horizontal mirror plane between C2 and C3 reflects the top half exactly onto the bottom half. The molecule is superimposable on its mirror image — it is the **meso** form, achiral, optically inactive not because of a mixture but because each molecule's rotation is cancelled within itself by its own other half. (Counting check: (2*R*,3*S*) and (2*S*,3*R*) are the same compound, so $4 - 1 = 3$.) Tartaric acid is thus one connectivity with three shelf-stable compounds: two enantiomers and one meso diastereomer of each.
:::
:::

## Optical activity: reading configuration with light

::: definition Optical rotation {#def-optical}
Plane-polarised light has its electric field oscillating in one plane. A **chiral** substance rotates that plane: the angle $\alpha$ through which the analyser must be turned to restore darkness is the **observed rotation**, measured on a polarimeter with the sodium D line ($\lambda = 589\ \mathrm{nm}$). A substance rotating the plane clockwise (to the right, as the light leaves the sample) is dextrorotatory, written $(+)$; anticlockwise is levorotatory, $(-)$. Achiral substances show no rotation.
:::

::: proposition Specific rotation {#prop-rotation}
Observed rotation grows with path length and with how much material the light crosses, so we divide it out:
$$
[\alpha]_\mathrm{D}^{\mathrm{T}} = \frac{\alpha}{l\,c},
\qquad l \text{ in } \mathrm{dm},\quad c \text{ in } \mathrm{g\,mL^{-1}},
$$
the **specific rotation** at temperature $T$ with the D line. It is a physical constant of the compound, like a boiling point, but conditional: literature values are cited with their conditions, e.g. $[\alpha]_\mathrm{D} = +12.0$ (c 20, $\mathrm{H_2O}$) for the natural form of tartaric acid — the "c 20" means a solution of $20\ \mathrm{g}$ per $100\ \mathrm{mL}$, i.e. $c = 0.20\ \mathrm{g\,mL^{-1}}$. Units of $[\alpha]$ are $\mathrm{deg\,mL\,g^{-1}\,dm^{-1}}$, usually left implicit.
:::

::: example Observed rotation of natural tartaric acid {#ex-tartaric-rotation}
Natural tartaric acid has $[\alpha]_\mathrm{D} = +12.0$ (c 20, $\mathrm{H_2O}$, as tabulated). A $2.00\ \mathrm{dm}$ tube is filled with the same solution the citation describes ($20\ \mathrm{g}$ per $100\ \mathrm{mL}$, water). What rotation does the polarimeter read?
::: solution
Rearranging $[\alpha] = \alpha/(lc)$:
$$
\alpha = [\alpha]\, l\, c = (+12.0) \times 2.00 \times 0.20 = +4.8^{\circ}.
$$
Two significant figures, set by the tabulated $+12.0$ and the concentration. The same tube filled with the synthetic (2*S*,3*S*) enantiomer reads $-4.8^{\circ}$, and a tube of the meso form — or of any 1:1 mixture of the two enantiomers — reads $0.0^{\circ}$.
:::
:::

::: definition Enantiomeric excess {#def-ee}
A mixture of enantiomers is described by its **enantiomeric excess**
$$
ee = \frac{|c_1 - c_2|}{c_1 + c_2} \times 100\,\%,
$$
the percentage by which one enantiomer exceeds the other: a 90:10 mixture of (*S*) and (*R*) has $ee = 80\,\%$. A pure enantiomer has $ee = 100\,\%$; a **racemate** (equimolar mixture, written $(\pm)$) has $ee = 0$.
:::

::: proposition Rotation measures enantiomeric excess {#prop-ee}
Because rotation is additive over the species in the beam (Biot's law of superposition), the two enantiomers' contributions cancel in proportion to the racemic part of the mixture, and
$$
\frac{\alpha_{\text{obs}}}{\alpha_{\text{pure}}} = ee,
\qquad\text{equivalently}\qquad
x_{\text{major}} = \frac{1 + ee}{2},\quad x_{\text{minor}} = \frac{1 - ee}{2},
$$
where $x$ is mole fraction and $\alpha_{\text{pure}}$ is the rotation of the pure major enantiomer at the same $l$, $c$ and conditions. A single rotation reading therefore determines the composition of an enantiomer mixture — which is why polarimetry survived a century of modern instrumentation as a routine assay of optical purity.
:::

::: example Enantiomeric excess of an ibuprofen sample {#ex-ibuprofen-ee}
The analgesic ibuprofen acts through its (S)-enantiomer; ($S$)-ibuprofen has $[\alpha]_\mathrm{D} = +61$ (c 2, ether, as tabulated). A synthesis yields a sample whose $[\alpha]_\mathrm{D}$, measured under the same conditions, is $+55$. Find the ee and the percentage composition.
::: solution
$$
ee = \frac{+55}{+61} \times 100\,\% = 90.2\,\%.
$$
Then $x_{(S)} = (1 + 0.902)/2 = 0.951$ and $x_{(R)} = 0.049$: the sample is $95.1\,\%$ ($S$) and $4.9\,\%$ ($R$). The arithmetic runs the other way just as easily: a target of 95% ee fixes the rotation you must see, which is how quality control checks a chiral synthesis without a chiral chromatography column.
:::
:::

::: widget plot
f: 2*x - 1
x: 0, 1
y: -1.05, 1.05
labels: \alpha_{\text{obs}}/\alpha_{\text{pure}}
caption: Observed rotation of a mixture of two enantiomers, as a fraction of the pure enantiomer's rotation, plotted against the mole fraction $x$ of the $(+)$-form. The line $\alpha_{\text{obs}}/\alpha_{\text{pure}} = 2x - 1$ is exactly the statement that rotations superpose: it crosses zero at $x = 0.5$ (the racemate, optically dead) and reaches $\pm 1$ at the pure ends. The slope is why polarimetry is so much more sensitive to *enrichment* than to *identity* — near the racemate a tiny change in $x$ swings the reading, while near optical purity the reading barely moves, and a sample at 99% ee looks much like a sample at 100%.
:::

::: widget newton
f: 61*(2*x - 1) - 55
x0: 0.9
x: 0, 1
caption: Newton's method solving the ibuprofen example backwards: find the mole fraction $x$ of ($S$)-ibuprofen whose mixture rotation $[\alpha] = 61\,(2x-1)$ equals the observed $+55$. The root is $x = 0.951$, the 95.1% of the worked example. Here the equation is linear and could be done in your head, but replace "rotation" by any observable of a mixture in equilibrium — the same root-finding loop is how compositions are extracted from data when no closed form exists.
:::

::: warning What rotation can and cannot tell you {#warn-rotation-sign}
**(1)** $R$ does not mean $(+)$ and $S$ does not mean $(-)$. The descriptor is bookkeeping from atomic numbers; the sign of rotation is an experimental fact. Natural tartaric acid is (2*R*,3*R*) and $(+)$; its enantiomer is (2*S*,3*S*) and $(-)$; but (*S*)-ibuprofen is $(+)$, and for many compounds the two descriptors of a pair share one sign with no pattern across compounds. You can never predict a sign from *R*/*S*, and you can never assign a configuration from a sign. **(2)** Enantiomers have identical physical properties — melting point, boiling point, densities, NMR spectra in $\mathrm{CDCl_3}$ — *only in achiral environments*. In a chiral world they differ: (+)- and (−)-carvone smell of spearmint and caraway because olfactory receptors are chiral; enantiomers elute separately from a chiral chromatography column; and in the body one enantiomer meets enzymes built of L-amino acids while the other meets the same enzymes as a stranger. A racemate is not "half the dose": it is a different substance with its own pharmacology. **(3)** Zero rotation does not prove achirality: it may be a racemate, or a meso compound, or a sample that racemised on the shelf. The polarimeter reports a number; the interpretation is yours.
:::

::: history
Optical activity was discovered in 1815 by Jean-Baptiste **Biot** (Biot), who found that quartz and solutions of sugar, tartaric acid and camphor rotate polarised light, and — astonishingly for his day — that the rotation is proportional to concentration, i.e. that the effect is molecular. In 1848 the young Louis **Pasteur** (Pasteur), studying the sodium ammonium salt of "paratartaric acid" (racemic acid, which Pasteur's mentor Balard had obtained from wine by a route that destroyed the crystals' memory), noticed under the microscope two kinds of hemihedral crystals, picked them apart with tweezers, dissolved each kind, and found equal and opposite rotations: the first **resolution** of a racemate into enantiomers, and the birth of molecular asymmetry. In 1874 Jacobus **van 't Hoff** (van 't Hoff), aged twenty-two, and Joseph **Le Bel** (Le Bel) independently proposed the tetrahedral carbon, making the asymmetry of the carbon atom the structural basis of optical activity in a single stroke. In 1891 Emil **Fischer** (Fischer) drew the two glyceraldehydes as mirror-image Fischer projections, arbitrarily labelled one D and the other L, and anchored the whole sugar and amino-acid naming system to his guess; in 1949 J. M. **Bijvoet** (Bijvoet), using X-ray anomalous dispersion by rubidium in a tartrate salt, showed that Fischer's guess had — by luck, a fifty-eight-year fifty-fifty chance — been right, establishing **absolute configuration** experimentally.
:::

## E/Z isomerism: stereoisomerism in alkenes

::: definition E and Z descriptors {#def-ez}
A $\mathrm{C{=}C}$ double bond cannot rotate without breaking a $\pi$ bond ($\approx 266\ \mathrm{kJ\,mol^{-1}}$), so each alkene carbon's two substituents are locked in place. Apply the CIP ranking to the two groups on *each* alkene carbon separately: if the two higher-ranked groups lie on the **same side** of the double bond the configuration is ***Z*** (zusammen, together); on **opposite sides**, ***E*** (entgegen, opposite). *E* and *Z* are configurational descriptors: interconverting them is a reaction, not a rotation.
:::

The older *cis*/*trans* language compares identical groups or the chain, and fails the moment an alkene carries three or four different substituents: for $\mathrm{BrHC{=}CHCl}$ "cis to what?" has no answer, and for a trisubstituted alkene there may be no pair of identical groups to compare at all. The CIP machinery never runs out of answers, because it never asks for identical groups.

::: example Assigning E and Z {#ex-ez-assign}
Assign the configuration: (a) 3-methylpent-2-ene drawn with the C2 methyl and the C3 ethyl on the same side; (b) 1-bromo-2-chloro-1-fluoroethene drawn with Br and Cl on the same side.
::: solution
(a) At C2 the ligands are $\mathrm{CH_3}$ (C: H,H,H) and H, so methyl wins. At C3 the ligands are $\mathrm{CH_2CH_3}$ (C: C,H,H) and $\mathrm{CH_3}$ (C: H,H,H): ethyl wins at the first sphere. The two winners — C2 methyl and C3 ethyl — are on the same side by construction: the compound is (*Z*)-3-methylpent-2-ene. Note that *cis*/*trans* had nothing to work with: no two of the four substituents are identical. (b) At C1, Br (1) > F; at C2, Cl (1) > H. Br and Cl are on the same side, so the higher-ranked groups are together: (*Z*)-1-bromo-2-chloro-1-fluoroethene. One caution: *Z* does not mean "the two bulkiest groups together" — it means the two *CIP winners* together, and priority is atomic number, not size.
:::
:::

Alkenes tie the two halves of this chapter together in a neat corner case: *(Z)*-cyclooctene is achiral, but ***trans*-cyclooctene** cannot pucker into its mirror image — the ring is too small to cross — and has been resolved into stable enantiomers, a chiral molecule whose chirality lives in a twisted double bond and a ring, with no stereocentre anywhere.

## Chirality without stereocentres

An allene $\mathrm{R^1R^2C{=}C{=}CR^3R^4}$ has perpendicular $\pi$ systems, so the two end carbons carry their substituents in perpendicular planes; with two *different* groups on each end the molecule has no mirror plane and exists as enantiomers. Hindered rotation about a single bond does the same: in 2,2′-disubstituted biaryls such as BINOL the bulky ortho groups block rotation between the two rings, and the resulting **atropisomers** are isolable compounds — an axis or a helix, not an asymmetric carbon, carries the handedness.

::: example Which allenes are chiral? {#ex-allene}
Decide whether penta-2,3-diene $\mathrm{CH_3CH{=}C{=}CHCH_3}$ and buta-1,2-diene $\mathrm{CH_2{=}C{=}CHCH_3}$ are chiral.
::: solution
Penta-2,3-diene has H and $\mathrm{CH_3}$ on each terminal carbon, in perpendicular planes. No mirror plane exists: any plane containing the C{=}C{=}C axis reflects one end's substituents into the *other* end's perpendicular plane, missing them. The molecule and its mirror image are non-superimposable — **chiral**, resolvable in principle, with no stereocentre. Buta-1,2-diene has two H's on C1; the plane containing the axis and C4's H and $\mathrm{CH_3}$ is a mirror plane: it leaves C4's substituents fixed and swaps C1's two identical hydrogens onto each other. **Achiral**. The rule for allenes: two different groups on *each* end, and the symmetry does the rest.
:::
:::

## Stereospecific and stereoselective

::: definition Stereoselective and stereospecific reactions {#def-stereoselective}
A reaction is **stereoselective** if one stereoisomeric product forms preferentially from a given substrate (the product ratio favours one); it is **stereospecific** if different stereoisomeric *reactants* give different stereoisomeric *products* — the mechanism reads the starting configuration. Stereospecificity is a statement about mechanism; stereoselectivity about preference. The SN2 reaction of [[organic-1/nucleophilic-substitution]] is the prototype of both at once: it inverts the stereocentre it attacks (stereospecific), and a well-chosen substrate gives essentially one product (stereoselective).
:::

Keep the pair as vocabulary for the rest of the course: sentences like "the addition of $\mathrm{Br_2}$ is *anti*-selective" are why you must be able to name a three-dimensional product before you can predict it.

## Where this leads

Configuration is the standing character of every mechanism to come. The backside attack of [[organic-1/nucleophilic-substitution]] inverts (*R*) into (*S*) in a single step — Walden inversion, the reaction that first proved the tetrahedral carbon — while its carbocation chemistry explains why some substitutions instead racemise. The additions of [[organic-1/alkenes-alkynes]] — *anti* bromination through a halonium ion, *syn* hydroboration, hydration through a planar cation — are stereochemistry exercises wearing reaction arrows, and [[organic-1/elimination]] turns on the *anti*-periplanar geometry of E2. [[organic-2/carbonyl-addition]] shows a planar carbonyl giving racemic product until a chiral reagent or catalyst breaks the tie, and the sugars and amino acids of [[biochemistry/carbohydrates-lipids]] are stereochemistry at industrial scale: one letter — D or L — decides whether a polymer is digestible at all.

::: summary
- Stereoisomers share connectivity and differ in 3-D arrangement; configurational isomers need bond-breaking to interconvert and are separable compounds, conformers are not.
- Chirality is a whole-molecule property tested by mirror-image superimposability; the practical symmetry test is "no mirror plane, no inversion centre". A stereocentre is local; the two come apart in meso compounds (stereocentres, achiral) and in allenes and atropisomers (chiral, no stereocentres).
- The CIP algorithm ranks ligands by atomic number, mass number for isotopes, sphere-by-sphere outward, with duplicate atoms for multiple bonds and ring traversals; *R*/*S* and *E*/*Z* name the two arrangements of each stereogenic element.
- Fischer projections encode 3-D structure flat: vertical bonds point away, horizontal towards; $180^\circ$ rotation is allowed, $90^\circ$ is not, and a horizontal lowest-priority ligand means reversing the apparent answer.
- $n$ stereocentres give at most $2^n$ stereoisomers; internal symmetry reduces the count, and the (*R*,*S*) form of a symmetric molecule is a meso compound — achiral and identical to its mirror image, as in tartaric acid's three stereoisomers.
- Specific rotation $[\alpha] = \alpha/(lc)$ is a conditional physical constant; rotation is additive, so $[\alpha]_{\text{obs}}/[\alpha]_{\text{pure}} = ee$ and one polarimeter reading gives the composition of an enantiomer mixture. Racemates rotate nothing.
- *E*/*Z* replaces *cis*/*trans* wherever the older pair runs out of identical groups to compare; double-bond geometry is configuration, locked behind the $\pi$ bond.
- Sign of rotation and *R*/*S* are unrelated; enantiomers differ in properties only in chiral environments — which is exactly why biology tells them apart.
:::

## Exercises

::: exercise Counting stereoisomers {level=1 check="3"}
How many stereoisomers does 2,3-dibromobutane have, counting the meso form once? (Enter the number.)
::: solution
Three: (2*R*,3*R*), (2*S*,3*S*) and the meso (2*R*,3*S*) ≡ (2*S*,3*R*). The two equivalent stereocentres make one mirror-image pair collapse into a single achiral compound, so the $2^2 = 4$ count drops by one.
:::
:::

::: exercise Observed rotation of glucose {level=1 check="5.27"}
D-Glucose has $[\alpha]_\mathrm{D} = +52.7$ (water, equilibrium mixture, as tabulated). A solution is made by dissolving $10.0\ \mathrm{g}$ to a final volume of $100.0\ \mathrm{mL}$. What rotation is observed in a $1.00\ \mathrm{dm}$ tube? (Enter $\alpha$ in degrees.)
::: solution
$c = 10.0/100.0 = 0.100\ \mathrm{g\,mL^{-1}}$, so $\alpha = [\alpha]\, l\, c = 52.7 \times 1.00 \times 0.100 = +5.27^{\circ}$. Three significant figures, set by the tabulated rotation.
:::
:::

::: exercise Enantiomeric excess from one reading {level=1 check="50"}
A sample of mandelic acid has $[\alpha]_\mathrm{D} = +30.5$; pure ($R$)-mandelic acid has $[\alpha]_\mathrm{D} = +61.0$ under the same conditions. What is the ee of the sample? (Enter the % ee.)
::: solution
$ee = 30.5/61.0 \times 100\,\% = 50\,\%$. The sample is ($R$)-enriched (same sign as pure $R$) and contains $(1+0.50)/2 = 75\,\%$ ($R$) and $25\,\%$ ($S$).
:::
:::

::: exercise Assigning R and S {level=2}
Assign the configuration (with priorities shown) at the stereocentre of: (a) butan-2-ol; (b) 2-chlorobutane; (c) $\mathrm{CHBrClD}$; (d) 3-bromocyclohexene.
::: solution
(a) $\mathrm{OH} > \mathrm{C_2H_5} > \mathrm{CH_3} > \mathrm{H}$; with H away, OH → Et → Me clockwise gives (*R*) for the drawing described in example [[#ex-rs-butanol]]. (b) 2-Chlorobutane: $\mathrm{Cl} > \mathrm{C_2H_5} > \mathrm{CH_3} > \mathrm{H}$ (ethyl's CH₂ carries (C,H,H), methyl's (H,H,H)); the two drawings with H on a dash and Cl → Et → Me clockwise/anticlockwise are (*R*)/(*S*)-2-chlorobutane. (c) $\mathrm{Br} > \mathrm{Cl} > \mathrm{D} > \mathrm{H}$ — isotopes by mass number. (d) $\mathrm{Br} > \mathrm{C2}$ (the $=\!\mathrm{CH}{-}$ arm, duplicated (C,C,H)) $> \mathrm{C4}$ arm (C,H,H) $> \mathrm{H}$; see example [[#ex-rs-ring]].
:::
:::

::: exercise Relationships {level=2}
State whether each pair are enantiomers, diastereomers, or the same compound: (a) (2*R*,3*R*)- and (2*S*,3*S*)-2,3-dibromopentane; (b) (2*R*,3*R*)- and (2*R*,3*S*)-2,3-dibromopentane; (c) meso-2,3-dibromobutane and its mirror image; (d) (2*R*,3*S*)- and (2*S*,3*R*)-2,3-dibromobutane.
::: solution
(a) Both centres inverted, non-superimposable mirror images: **enantiomers**. (b) One centre inverted, one retained: **diastereomers**. (c) The meso compound is superimposable on its mirror image: **the same compound** — that is the definition of meso. (d) Same as (c): (2*R*,3*S*) and (2*S*,3*R*) are two names for the one meso form, so **the same compound**. Pairs (c) and (d) are the counting trap of proposition [[#prop-2n]] in miniature: the $2^n$ list double-counts the meso entry.
:::
:::

::: exercise Composition from ee {level=2 check="90"}
A chiral synthesis of (S)-fluoxetine claims 80% ee of the (S)-enantiomer. What percentage of the sample is (S)-fluoxetine? (Enter the % of the (S)-enantiomer.)
::: solution
$x_{(S)} = (1 + ee)/2 = (1 + 0.80)/2 = 0.90$: the sample is $90\,\%$ ($S$) and $10\,\%$ ($R$). A quick sanity check: the excess over the racemate is $90 - 50 = 40$ points each way, and $90 - 10 = 80$ — the ee.
:::
:::

::: exercise A partially racemised bottle {level=3 check="25"}
A bottle labelled "(S)-ibuprofen, $[\alpha]_\mathrm{D} = +61$ (c 2, ether)" has partly racemised on the shelf. A $1.00\ \mathrm{g}$ sample is dissolved to $50.0\ \mathrm{mL}$ and read in a $2.00\ \mathrm{dm}$ tube: $\alpha = +0.61^{\circ}$. What is the ee of the contents? (Enter the % ee.)
::: solution
$c = 1.00/50.0 = 0.0200\ \mathrm{g\,mL^{-1}}$, so $[\alpha]_{\text{obs}} = 0.61/(2.00 \times 0.0200) = +15.25$. Then $ee = 15.25/61 = 0.25 = 25\,\%$. Following through: $x_{(S)} = (1+0.25)/2 = 0.625$, so the $1.00\ \mathrm{g}$ sample contains $0.625\ \mathrm{g}$ of ($S$) and $0.375\ \mathrm{g}$ of ($R$) — the bottle has lost a third of its optical purity, and the polarimeter caught it with one reading.
:::
:::

::: exercise Symmetry and the count {level=3}
2,4-Dibromopentane, $\mathrm{CH_3CHBrCH_2CHBrCH_3}$, has two stereocentres and a symmetric skeleton. Enumerate its stereoisomers, identify any meso form by its symmetry element, and explain why 2,3-dibromopentane (also two stereocentres) has a different count.
::: solution
Configurations: (2*R*,4*R*), (2*S*,4*S*) and (2*R*,4*S*). The first two are mirror images — an enantiomer pair. In (2*R*,4*S*) the molecule has a mirror plane through C3 perpendicular to the chain: C3 carries two identical arms (each $\mathrm{CHBrCH_3}$ with the same configuration seen from either side), so the plane reflects the top half onto the bottom half — this is the **meso** form, and (2*R*,4*S*) ≡ (2*S*,4*R*). Total: **three** stereoisomers, like tartaric acid. 2,3-Dibromopentane has no such plane available — its two centres carry different carbon chains (methyl/ethyl vs ethyl/H-arms), so no configuration can be its own mirror image and all four survive. The lesson: the $2^n$ bound is attained or reduced by *symmetry of the connectivity*, not by the number of stereocentres alone.
:::
:::
