A Lewis structure of $\mathrm{CH_4}$ is drawn flat: a carbon in the middle, four hydrogens at the points of a cross, two dots on every line. Molecules are not flat. Methane is a tetrahedron, ammonia a shallow pyramid, water a bent molecule with an angle of $104.5^\circ$, and sulfur hexafluoride an octahedron with six equivalent fluorines. These shapes were *measured* — by rotational spectroscopy, which fixes angles from moments of inertia, and by gas-phase electron and X-ray diffraction, which photographs the atomic skeleton directly — long before any theory explained them, and the puzzle they posed to Lewis's flat pictures was sharp: if the four bonds of methane really were drawn at $90^\circ$ to one another on the page, why do all four point instead to the corners of a regular tetrahedron, and why is $\mathrm{CH_2Cl_2}$ a single substance rather than the two isomers a square-planar carbon would give? Valence shell electron pair repulsion (VSEPR) theory answers with a single, almost embarrassingly simple idea: the electron pairs in the valence shell of an atom repel one another, and they arrange themselves as far apart as they can. From that one line, and a count of electrons, come the shapes of an enormous fraction of main-group chemistry.

## Electron domains

VSEPR does not count bonds; it counts *regions of electron density*.

::: definition Electron domain {#def-electron-domain}
An **electron domain** is a region around an atom within which a pair (or pairs) of valence electrons is likely to be found. Around a central atom there are two kinds: **bonding domains**, one for each bonded neighbour regardless of whether the bond is single, double or triple, and **nonbonding domains**, one for each lone pair. A single unpaired electron, as in $\mathrm{NO_2}$, also counts as one domain. The **electron-domain geometry** is the arrangement of all the domains; the **molecular shape** is the arrangement of the *atoms only*, i.e. of the nuclei, with the lone pairs invisible.
:::

The reason a double bond counts as one domain is that its electrons, however numerous, are confined to the corridor between the two nuclei — a $\pi$ bond adds density above and below that corridor but does not create a new direction in which density must be pushed away from the central atom. What the geometry responds to is *directions of electron density*, not amounts; the amounts enter only as a refinement, because a fatter domain repels a little more strongly than a thinner one.

::: proposition The postulates of VSEPR {#prop-vsepr-postulates}
1. The electron domains about a central atom adopt the arrangement that **maximises their mutual separation**, minimising their electrostatic repulsions.
2. The repulsions are not all equal. At the same angle, **lone pair–lone pair (lp–lp) > lone pair–bonding pair (lp–bp) > bonding pair–bonding pair (bp–bp)**. A bonding pair is held between two nuclei and pulled into a slim channel; a lone pair is attracted by only one nucleus and so spreads out more widely, occupying a larger solid angle and pushing its neighbours in.
3. A **multiple bond repels slightly more strongly than a single bond**, because it contains more electron density in its domain.
The theory is empirical and qualitative: it is summarised from structural data and predicts *trends* in angles, not angles to the degree.
:::

Postulate 2 is the workhorse. It explains why the mere presence of invisible lone pairs changes the angles between visible bonds: a lone pair is a fatter, greedier domain than a bonding pair, and the angles that survive between the bonds are the angles left over after the lone pairs have taken their extra room.

## The geometry ladder

With **two domains** the widest separation is a straight line: **linear, $180^\circ$** — $\mathrm{BeCl_2}$ vapour, and each carbon of $\mathrm{CO_2}$. With **three**, the domains lie in a plane $120^\circ$ apart: **trigonal planar** — $\mathrm{BF_3}$, $\mathrm{CO_3^{2-}}$. With **four**, the answer is not a square (adjacent domains at $90^\circ$) but a **tetrahedron**, whose angle of $109.47^\circ$ is the best compromise nature can find in three dimensions — $\mathrm{CH_4}$, $\mathrm{NH_4^{+}}$, $\mathrm{SO_4^{2-}}$. Already here is a lesson about the theory: it is three-dimensional from the start, and the shapes it predicts are not the shapes of the page.

Five domains give a **trigonal bipyramid**, and this arrangement deserves care because its positions are *not* equivalent. Three **equatorial** domains form a triangle ($120^\circ$ apart, and $90^\circ$ to each axial domain); two **axial** domains sit above and below the plane ($180^\circ$ apart). Count the close neighbours each position has at $90^\circ$: an axial domain has **three** (the three equatorial ones), an equatorial domain only **two** (the two axial ones). Since $90^\circ$ repulsions dominate the energy — repulsion is strongest at the smallest angles — the roomiest seats in the house are the equatorial ones, and **lone pairs take them**. That single counting argument generates the whole $\mathrm{AX_5E_{\mathit{n}}}$ family, as [[#ex-ax5e-series]] will show.

Six domains give an **octahedron**: all six positions equivalent, all angles $90^\circ$ or $180^\circ$. With one lone pair every choice is the same; with two, the second lone pair goes **trans** to the first (directly opposite), because a *cis* pair of lone pairs would sit at $90^\circ$ to each other — the worst possible arrangement under postulate 2. Hence $\mathrm{XeF_4}$ is square planar, not the distorted octahedron a random placement would give.

| Domains | Base arrangement | Ideal angles | Family → molecular shape | Examples |
|---|---|---|---|---|
| 2 | linear | $180^\circ$ | $\mathrm{AX_2}$ → linear | $\mathrm{CO_2}$, $\mathrm{BeCl_2(g)}$ |
| 3 | trigonal planar | $120^\circ$ | $\mathrm{AX_3}$ → trigonal planar; $\mathrm{AX_2E}$ → bent | $\mathrm{BF_3}$, $\mathrm{CO_3^{2-}}$; $\mathrm{SO_2}$ |
| 4 | tetrahedral | $109.47^\circ$ | $\mathrm{AX_4}$ → tetrahedral; $\mathrm{AX_3E}$ → trigonal pyramidal; $\mathrm{AX_2E_2}$ → bent | $\mathrm{CH_4}$; $\mathrm{NH_3}$; $\mathrm{H_2O}$ |
| 5 | trigonal bipyramidal | $90^\circ$, $120^\circ$, $180^\circ$ | $\mathrm{AX_5}$ → trig. bipyr.; $\mathrm{AX_4E}$ → seesaw; $\mathrm{AX_3E_2}$ → T-shaped; $\mathrm{AX_2E_3}$ → linear | $\mathrm{PF_5}$; $\mathrm{SF_4}$; $\mathrm{ClF_3}$; $\mathrm{XeF_2}$ |
| 6 | octahedral | $90^\circ$, $180^\circ$ | $\mathrm{AX_6}$ → octahedral; $\mathrm{AX_5E}$ → square pyramidal; $\mathrm{AX_4E_2}$ → square planar | $\mathrm{SF_6}$; $\mathrm{BrF_5}$; $\mathrm{XeF_4}$ |

In the table, $\mathrm{A}$ is the central atom, $\mathrm{X}$ the bonded neighbours and $\mathrm{E}$ the lone pairs. Read it as a two-step prediction: the domain *count* fixes the base arrangement, and the number of $\mathrm{E}$'s fixes which seats the lone pairs vacate.

::: algorithm Predicting a molecular shape with VSEPR {#alg-vsepr}
**Input:** the formula of a main-group molecule or ion. **Output:** its shape and a prediction of how its angles deviate from ideal.
1. Count the valence electrons and draw the Lewis structure ([[bonding-structure/covalent-lewis]]), choosing the central atom as the least electronegative element other than hydrogen.
2. Count the electron domains on the central atom: one per bonded neighbour (single, double or triple — it makes no difference to the count) plus one per lone pair.
3. Choose the base arrangement: 2 → linear, 3 → trigonal planar, 4 → tetrahedral, 5 → trigonal bipyramidal, 6 → octahedral.
4. Place the lone pairs: in a trigonal bipyramid they go **equatorial**; in an octahedron a second lone pair goes **trans** to the first; in the other arrangements all positions are equivalent.
5. Name the molecular shape from the positions of the *atoms* alone.
6. Predict deviations: lone pairs compress the angles between the bonds they touch; multiple bonds compress their neighbours slightly; electronegative substituents draw bonding domains away from the centre and let angles close.
:::

::: example The angle ladder: $\mathrm{CH_4}$, $\mathrm{NH_3}$, $\mathrm{H_2O}$ {#ex-angle-ladder}
All three molecules have four electron domains on the second-row central atom, yet their bond angles are $109.47^\circ$, $107^\circ$ and $104.5^\circ$ (standard structural data). Explain the ladder.
::: solution
Carbon in $\mathrm{CH_4}$ brings 4 valence electrons and forms 4 bonds: four bonding domains, no lone pairs, a perfect tetrahedron, and every $\mathrm{H–C–H}$ angle equal to the ideal $109.47^\circ$. Nitrogen brings 5: three $\mathrm{N–H}$ bonds and one lone pair, so the electron geometry is still tetrahedral but the *molecular* shape is trigonal pyramidal. The lone pair is a fatter domain than any $\mathrm{N–H}$ bond (postulate 2), presses the three bonds together, and the $\mathrm{H–N–H}$ angle falls from $109.47^\circ$ to about $107^\circ$. Oxygen brings 6: two bonds and *two* lone pairs. Now each bond is squeezed by two lp–bp repulsions and the two lone pairs themselves fight for room (the strongest repulsion of all, lp–lp), so the angle falls further, to $104.5^\circ$. The same tetrahedral electron geometry thus produces three different shapes and three different angles — the invisible lone pairs write the visible geometry. (The measured dipole moments tell the same story: $\mathrm{CH_4}$ is nonpolar, $\mathrm{NH_3}$ has $\mu = 1.47\ \mathrm{D}$ and $\mathrm{H_2O}$ $\mu = 1.85\ \mathrm{D}$; a flat $\mathrm{H_2O}$ at $180^\circ$ would have no dipole at all.)
:::
:::

::: example The $\mathrm{AX_5E_{\mathit{n}}}$ series: $\mathrm{SF_4}$, $\mathrm{ClF_3}$, $\mathrm{XeF_2}$ {#ex-ax5e-series}
Predict the shapes of $\mathrm{SF_4}$, $\mathrm{ClF_3}$ and $\mathrm{XeF_2}$, and say where the lone pairs sit.
::: solution
Count domains. Sulfur in $\mathrm{SF_4}$: 6 valence electrons, 4 used in $\mathrm{S–F}$ bonds, 1 lone pair left — 5 domains. Chlorine in $\mathrm{ClF_3}$: 7 valence electrons, 3 bonds, 2 lone pairs — 5 domains. Xenon in $\mathrm{XeF_2}$: 8 valence electrons, 2 bonds, 3 lone pairs — 5 domains. All three therefore start from the trigonal bipyramid, and all three questions reduce to *which seats the lone pairs take*. A lone pair placed **axial** would suffer three $90^\circ$ repulsions (with each equatorial domain); placed **equatorial**, only two (with the two axial domains). Equatorial is roomier, so every lone pair takes an equatorial seat:

- $\mathrm{SF_4}$, $\mathrm{AX_4E}$: one equatorial seat vacated, four bonds left (two axial, two equatorial) — the **seesaw** shape. The lone pair bends the axial bonds away (measured $\mathrm{F_{ax}–S–F_{ax}} \approx 173^\circ$) and squeezes the equatorial pair ($\mathrm{F_{eq}–S–F_{eq}} \approx 102^\circ$, standard diffraction data).
- $\mathrm{ClF_3}$, $\mathrm{AX_3E_2}$: both equatorial lone pairs adjacent to each other in the triangle, three bonds left — **T-shaped**, with $\mathrm{F–Cl–F} \approx 87.5^\circ$, the lp–lp repulsion pushing the bonds below $90^\circ$.
- $\mathrm{XeF_2}$, $\mathrm{AX_2E_3}$: the entire equatorial triangle is lone pairs; the two fluorines occupy the axial sites — **linear**, $\mathrm{F–Xe–F} = 180^\circ$, and nonpolar ($\mu = 0$).

Three xenon/halogen compounds, one electron count, three shapes — and the shapes are exactly what diffraction finds.
:::
:::

::: example The octahedral series: $\mathrm{BrF_5}$ and $\mathrm{SF_6}$ {#ex-brf5-sf6}
Predict the shapes of $\mathrm{SF_6}$ and $\mathrm{BrF_5}$ and their dipole moments.
::: solution
Sulfur in $\mathrm{SF_6}$: 6 bonds, no lone pairs, 6 domains — **octahedral**, all six fluorines equivalent, all angles exactly $90^\circ$. The six bond dipoles cancel by symmetry (each bond has an equal and opposite partner), so $\mu = 0$; $\mathrm{SF_6}$ is in fact so unreactive that its inertness is itself a consequence of the fluorines wrapping the sulfur completely. Bromine in $\mathrm{BrF_5}$: 7 valence electrons, 5 bonds, 1 lone pair — octahedral electron geometry, **square pyramidal** molecular shape. With a single lone pair all six seats are equivalent, so nothing can be chosen, but the lone pair still presses the five fluorines down: every $\mathrm{F–Br–F}$ angle is slightly below $90^\circ$ (about $85^\circ$, standard structural data), and the molecule is polar. The pair $\mathrm{SF_6}/\mathrm{BrF_5}$ makes the general point cleanly: removing one ligand and adding one lone pair keeps the electron geometry but destroys both the equivalence of the sites and the cancellation of the dipoles.
:::
:::

::: quiz
In $\mathrm{SF_4}$ (5 electron domains, one lone pair) the lone pair occupies an equatorial rather than an axial site of the trigonal bipyramid because
- [x] an equatorial domain has only two neighbours at $90^\circ$, while an axial domain would have three — the lone pair takes the roomier seat.
- [ ] equatorial sites are always closer to the central atom, and lone pairs are attracted to it.
- [ ] the axial sites are already filled by the sulfur lone pairs of neighbouring molecules.
- [ ] a lone pair must always lie in the plane of the most electronegative atoms.
::: solution
Repulsions are dominated by the closest neighbours, i.e. those at $90^\circ$. An axial domain meets three equatorial domains at $90^\circ$; an equatorial domain meets only two axial ones. A lone pair, being the fattest domain (postulate 2 of [[#prop-vsepr-postulates]]), minimises its cost by taking the equatorial seat with only two $90^\circ$ encounters. The remaining four bonds form the seesaw of [[#ex-ax5e-series]].
:::
:::

## Shape and dipole moment: adding bonds as vectors

A bond dipole is a vector, and a molecule's dipole moment is their vector sum — so shape converts the question "is it polar?" into arithmetic.

::: definition Molecular dipole moment {#def-molecular-dipole}
The **dipole moment** $\mu$ of a molecule is the magnitude of the resultant of all its charge separations, measured in debye ($1\ \mathrm{D} = 3.336\times10^{-30}\ \mathrm{C\,m}$). To excellent approximation it is the **vector sum of the bond dipoles**, each pointing along its bond toward the more electronegative atom. A molecule is nonpolar ($\mu = 0$) when symmetry makes the sum vanish, whatever the individual bonds do; measured dipole moments are therefore direct evidence about shape.
:::

::: proof The resultant of two bond dipoles {#proof-dipole-resultant}
Let two identical bonds, each of dipole $\mu_\mathrm{b}$, meet at an angle $\theta$. Take the bisector as the $x$-axis; the two bonds make angles $\pm\theta/2$ with it. The components perpendicular to the bisector are equal and opposite and cancel; the components along it add:
$$
\mu_\mathrm{res} = 2\,\mu_\mathrm{b}\cos\frac{\theta}{2}.
$$
Three readings. (i) At $\theta = 180^\circ$, $\cos 90^\circ = 0$ and $\mu_\mathrm{res} = 0$: two identical bonds pointing in opposite directions cancel exactly — this is why $\mathrm{CO_2}$ ($\mu = 0$) must be linear and not bent. (ii) At $\theta = 104.5^\circ$ with the $\mathrm{O–H}$ bond dipole $\mu_\mathrm{b} = 1.51\ \mathrm{D}$, $\mu_\mathrm{res} = 2 \times 1.51 \times \cos 52.25^\circ = 1.85\ \mathrm{D}$ — the measured dipole moment of water, to three figures. (iii) Near linearity write $\theta = 180^\circ - \delta$; then $\mu_\mathrm{res} = 2\mu_\mathrm{b}\sin(\delta/2) \approx \mu_\mathrm{b}\,\delta$ (with $\delta$ in radians), so the dipole turns on *linearly* with the bend: a molecule bent $10^\circ$ from linear already carries about one sixth of a bond dipole. Polarity thus measures the *departure from linearity*, not the mere fact of bending: a near-linear molecule is weakly polar, and a measured $\mu$ near zero is correspondingly strong evidence for a linear shape.

For symmetric arrangements the sum vanishes by symmetry, and one representative calculation covers a family. Four equal vectors to the corners of a tetrahedron sum to zero: taking the $z$-components, each bond makes the same angle $\alpha$ with any chosen axis, and the fourfold arrangement has as much density pointing up as down; formally, the resultant of four vectors related by the symmetry operations of the tetrahedral group must itself be invariant under those operations, and the only vector with that property is $\mathbf{0}$. Hence $\mathrm{CH_4}$, $\mathrm{CCl_4}$, $\mathrm{SO_4^{2-}}$: nonpolar. The same symmetry argument kills $\mathrm{BF_3}$ (three vectors at $120^\circ$ in a plane), $\mathrm{PF_5}$, $\mathrm{SF_6}$, $\mathrm{XeF_4}$ (four in-plane bonds at $90^\circ$ plus two opposite lone pairs) — and, crucially, it fails the moment the ligands are no longer all identical, as [[#ex-dipole-vectors]] shows.
:::

::: example Is it polar? $\mathrm{BF_3}$ and $\mathrm{CH_2Cl_2}$ {#ex-dipole-vectors}
Decide whether $\mathrm{BF_3}$ and $\mathrm{CH_2Cl_2}$ are polar, estimating the latter by vector addition with bond dipoles $\mu(\mathrm{C–Cl}) = 1.6\ \mathrm{D}$ and $\mu(\mathrm{C–H}) = 0.4\ \mathrm{D}$ at ideal tetrahedral angles.
::: solution
$\mathrm{BF_3}$: three identical $\mathrm{B–F}$ bonds at $120^\circ$ in a plane. Put one along the $x$-axis: the $x$-components are $\mu(1 + \cos 120^\circ + \cos 240^\circ) = \mu(1 - \tfrac12 - \tfrac12) = 0$, and the $y$-components are $\mu(0 + \sin 120^\circ + \sin 240^\circ) = 0$. The sum is exactly zero: $\mathrm{BF_3}$ is **nonpolar**, and indeed its measured dipole moment is $0\ \mathrm{D}$ — evidence that it really is trigonal planar, since a pyramidal $\mathrm{BF_3}$ would be polar.

$\mathrm{CH_2Cl_2}$: the four bonds are not all identical, so no symmetry can save the sum, and the molecule is **polar**. Estimating from the two dominant $\mathrm{C–Cl}$ bonds at the tetrahedral angle, with [[#proof-dipole-resultant]]:
$$
\mu_\mathrm{res} \approx 2 \times 1.6\ \mathrm{D} \times \cos 54.75^\circ = 1.85\ \mathrm{D}.
$$
The measured value is $1.60\ \mathrm{D}$ (standard tabulated data). The small $\mathrm{C–H}$ bond dipoles and the real angles (the $\mathrm{Cl–C–Cl}$ angle opens past $109.5^\circ$ at the expense of the $\mathrm{H–C–H}$ angle) account for most of the difference — bond-dipole addition is a transferability assumption, good to a few tenths of a debye, not an identity. The comparison that *is* exact is symmetry talk: $\mathrm{CCl_4}$ has the same bonds and $\mu = 0$; replacing two chlorines by hydrogens destroys the cancellation and gives $1.60\ \mathrm{D}$. Shape, not bond count, decides polarity.
:::
:::

::: widget plot
f: 2*mb*cos(x*pi/180)
x: 0, 180
y: 0, 3.2
sliders: mb=1.5:0.5:2.5:0.1
points: 104.5, 1.85
labels: \text{resultant } 2\mu_b\cos(\theta/2)
caption: The resultant of two identical bond dipoles of strength $\mu_\mathrm{b}$ (slider, in debye) as a function of the bond angle $\theta$ (in degrees). The marked point is water: $\mu_\mathrm{b} = 1.51\ \mathrm{D}$, $\theta = 104.5^\circ$, $\mu_\mathrm{res} = 1.85\ \mathrm{D}$. Slide $\mu_\mathrm{b}$ and watch the whole curve scale — the *shape* of the curve is fixed by geometry alone. The dipole vanishes only at $\theta = 180^\circ$ and grows roughly linearly as the molecule bends away from it, so a measured $\mu$ near zero pins the shape to linear, while a large $\mu$ signals a tight bend.
:::

::: warning VSEPR is a map, not the territory {#warn-vsepr-limits}
Three limits to keep in view. **First, the angles are trends, not measurements.** VSEPR says "below $109.5^\circ$, more for more lone pairs"; it does not deliver $104.5^\circ$ from first principles. **Second, the model fails where the domains are not localised or not dominant.** $\mathrm{H_2S}$ has two lone pairs and two bonds like water, but its $\mathrm{H–S–H}$ angle is $92.1^\circ$ — barely bent at all — because sulfur's bonds to hydrogen use orbitals with little hybrid mixing and the angle is set by orbital geometry rather than domain repulsion; the real explanation belongs to [[bonding-structure/valence-bond]]. Many heavier p-block and most transition-metal compounds behave this way or worse, since their shapes are governed by directional metal–ligand bonding that no domain count can see. **Third, "lone pairs compress" is a rule of thumb, not a law.** $\mathrm{NF_3}$ has one lone pair like $\mathrm{NH_3}$ but an angle of only about $102^\circ$ against $107^\circ$: the electronegative fluorines pull the bonding domains out toward themselves, thinning them near the central atom, whereupon the lone pair's pressure dominates even more and closes the bonds in. Substituent electronegativity moves angles too, and VSEPR only tells you which way to look.
:::

::: history
The shapes VSEPR predicts were being measured as the theory's ancestors appeared. In 1929 Wolfgang Wierl's first electron-diffraction photographs of gases revealed directly that $\mathrm{CO_2}$ is linear and $\mathrm{CCl_4}$ tetrahedral, and through the 1930s diffraction and rotational spectroscopy filled in a growing table of bond angles that Lewis structures could not read off. In 1940 Nevill Sidgwick and Helen Mair Powell, extending Sidgwick's earlier ideas about covalent radius and bond number, published an analysis of axial and equatorial linkages in inorganic molecules which placed lone pairs in the trigonal bipyramid by exactly the $90^\circ$-counting argument of [[#ex-ax5e-series]]. In 1957 Ronald Gillespie and Ronald Nyholm recast the whole correlation as a theory of electron-pair repulsion in the valence shell, in a Quarterly Reviews survey of inorganic stereochemistry that made the model systematic and predictive; Gillespie's book *Molecular Geometry*, published a few years later, carried it into every classroom under the name valence-shell electron-pair repulsion. By the 1960s the model was standard equipment: counting electron pairs had become a method, not a mnemonic.
:::

## Where this leads

VSEPR tells you *what* the angles are; it cannot tell you *why* four equivalent directions at $109.47^\circ$ exist at all. That question — why bonds point where they point — is answered by hybridisation and valence bond theory in [[bonding-structure/valence-bond]], and more deeply still by [[bonding-structure/molecular-orbitals]]. Shape is also the entrance fee to bulk properties: the dipole moments computed here become the forces that condense liquids, in [[bonding-structure/intermolecular-forces]], and the shapes of molecules reappear as the packing of crystals in [[bonding-structure/solid-structures]]. Finally, shape is not only predicted but *measured*: the number and activity of a molecule's vibrations is fixed by its symmetry, as [[spectroscopy/vibrational-spectroscopy]] develops — infra-red spectra were among the sharpest independent confirmations that VSEPR's shapes are real.

::: summary
- Electron domains — one per bonded neighbour (single or multiple) plus one per lone pair — repel and adopt the arrangement of maximum separation: linear, trigonal planar, tetrahedral, trigonal bipyramidal, octahedral.
- Molecular shape names the positions of the atoms only; lone pairs are invisible but not inactive.
- Lone pairs are fatter domains than bonding pairs (lp–lp > lp–bp > bp–bp repulsion), so they compress bond angles: $109.47^\circ \to 107^\circ \to 104.5^\circ$ from $\mathrm{CH_4}$ to $\mathrm{NH_3}$ to $\mathrm{H_2O}$.
- In a trigonal bipyramid lone pairs go equatorial (two $90^\circ$ neighbours, not three); in an octahedron a second lone pair goes trans — the seat-counting behind seesaw, T-shaped, linear, square pyramidal and square planar shapes.
- Dipole moments are vector sums: $\mu_\mathrm{res} = 2\mu_\mathrm{b}\cos(\theta/2)$ for two bonds, and exactly zero for symmetric arrangements ($\mathrm{CO_2}$, $\mathrm{BF_3}$, $\mathrm{CCl_4}$, $\mathrm{SF_6}$) — measured $\mu$ is evidence about shape.
- VSEPR is qualitative and empirical: it predicts trends, struggles with heavy p-block compounds ($\mathrm{H_2S}$, $92.1^\circ$) and transition-metal complexes, and is moved by substituent electronegativity as well as lone pairs.
:::

## Exercises

::: exercise Name the shapes {level=1}
Predict the molecular shape of each of: (a) $\mathrm{XeF_4}$; (b) $\mathrm{SO_2}$; (c) $\mathrm{ICl_4^{-}}$; (d) $\mathrm{NO_3^{-}}$.
::: solution
(a) Xe: 8 valence electrons, 4 bonds, 2 lone pairs — 6 domains, octahedral electron geometry, lone pairs trans: **square planar**. (b) S: 6 valence electrons; two $\mathrm{S–O}$ bonds (one double in the Lewis picture, one domain either way) and one lone pair — 3 domains, trigonal planar electron geometry: **bent** (angle near $120^\circ$; measured about $119^\circ$). (c) I: 7 valence electrons $+\,1$ from the charge $= 8$; 4 bonds, 2 lone pairs — 6 domains, trans lone pairs: **square planar**, like $\mathrm{XeF_4}$. (d) N: 5 valence electrons $+\,1 = 6$; three bonded neighbours, no lone pairs (the extra electron density is delocalised over the oxygens) — 3 domains: **trigonal planar**.
:::
:::

::: exercise The angles of the trigonal bipyramid {level=1 check="90"}
What is the *smallest* bond angle in $\mathrm{PF_5}$ (idealised)? (Enter the angle in degrees.)
::: solution
The trigonal bipyramid has equatorial–equatorial angles of $120^\circ$, axial–equatorial angles of $90^\circ$ and an axial–axial angle of $180^\circ$. The smallest is $\boxed{90^\circ}$ — and it is precisely the $90^\circ$ encounters that lone pairs avoid by sitting equatorial.
:::
:::

::: exercise Count the domains {level=1 check="6"}
How many electron domains does the central atom carry in $\mathrm{XeF_4}$? (Enter the number.)
::: solution
Xenon: 8 valence electrons; 4 are shared in $\mathrm{Xe–F}$ bonds and 4 remain as two lone pairs. Four bonded neighbours $+\,2$ lone pairs $= \boxed{6}$ domains — octahedral electron geometry, square planar shape.
:::
:::

::: exercise Why the angle ladder bends {level=2}
Explain, using the postulates of VSEPR, (a) why $\mathrm{H_2O}$ ($104.5^\circ$) is more compressed than $\mathrm{NH_3}$ ($107^\circ$) although both have tetrahedral electron geometry; (b) why $\mathrm{NF_3}$ (about $102^\circ$) is *less* than $\mathrm{NH_3}$ even though fluorine is much larger than hydrogen.
::: solution
(a) Both have four domains, but $\mathrm{NH_3}$ has one lone pair and $\mathrm{H_2O}$ two. Each bond angle is squeezed by the lone pairs touching it, and lp–lp repulsion — the strongest kind — forces the two lone pairs of water to claim extra room, so the bonds are pushed closer together: two lone pairs compress more than one. (b) The relevant variable is not size but electronegativity. Fluorine draws the $\mathrm{N–F}$ bonding domains out toward itself; near the nitrogen those domains are thin and repel each other weakly, while the lone pair, held by nitrogen alone, stays fat and close. The lp–bp pressure then overwhelms the bp–bp pressure and closes the $\mathrm{F–N–F}$ angle below the $\mathrm{H–N–H}$ value. VSEPR's postulates contain both effects: domain *charge* matters as much as domain *count*.
:::
:::

::: exercise The dipole of water, quantitatively {level=2 check="1.85"}
Take the $\mathrm{O–H}$ bond dipole as $1.51\ \mathrm{D}$ and the bond angle as $104.5^\circ$. Compute the dipole moment of water. (Enter it in debye.)
::: solution
Two equal bond dipoles at angle $\theta$ give $\mu_\mathrm{res} = 2\mu_\mathrm{b}\cos(\theta/2)$ ([[#proof-dipole-resultant]]):
$$
\mu_\mathrm{res} = 2 \times 1.51 \times \cos 52.25^\circ = 2 \times 1.51 \times 0.6122 = 1.85\ \mathrm{D},
$$
matching the measured $1.85\ \mathrm{D}$. The lone pairs contribute to the true charge distribution, but the bond-vector picture already lands on the answer.
:::
:::

::: exercise Seesaw but not square: polarity of the $\mathrm{AX_4E}$ family {level=2}
$\mathrm{SF_4}$ has $\mu = 0.63\ \mathrm{D}$; $\mathrm{XeF_4}$ has $\mu = 0$. Explain both from their shapes, and say why the seesaw shape cannot be replaced by a square-planar arrangement of the four fluorines with the lone pair "above".
::: solution
$\mathrm{XeF_4}$ is square planar with the two lone pairs trans: the four bond dipoles lie in a plane at $90^\circ$ and cancel pairwise, and the (invisible) lone-pair contributions also cancel because they point in opposite directions — $\mu = 0$. $\mathrm{SF_4}$'s seesaw has no such cancellation: the two axial $\mathrm{S–F}$ dipoles are bent together to one side of the lone pair and the two equatorial ones point the other way, leaving a resultant along the $C_{2v}$ axis — a small but nonzero $0.63\ \mathrm{D}$. A square-planar $\mathrm{SF_4}$ with the lone pair above the plane is *not* what VSEPR gives, because the fifth domain would then sit at $90^\circ$ to four neighbours at once; the trigonal-bipyramidal parent with an equatorial lone pair has only two such contacts, and the observed geometry (and dipole) follow from that arrangement.
:::
:::

::: exercise The three xenon fluorides {level=3}
Predict the shape, the idealised angles and the polarity of each of $\mathrm{XeF_2}$, $\mathrm{XeF_4}$ and $\mathrm{XeF_6}$, justifying the placement of every lone pair. ($\mathrm{XeF_6}$ is best described as a fluxionally distorted octahedron — say what the domain count predicts before the distortion.)
::: solution
$\mathrm{XeF_2}$: 2 bonds $+\,3$ lone pairs $= 5$ domains, trigonal bipyramid; all three lone pairs equatorial (each would suffer three $90^\circ$ contacts if axial, only two so) — **linear**, $180^\circ$, and nonpolar: the two bond dipoles are collinear and opposite. $\mathrm{XeF_4}$: 4 bonds $+\,2$ lone pairs $= 6$ domains, octahedral; the lone pairs go trans (a *cis* pair would sit at $90^\circ$ to each other — the single worst lp–lp contact available) — **square planar**, $90^\circ$, nonpolar by the pairwise cancellation of four in-plane bonds. $\mathrm{XeF_6}$: 6 bonds $+\,1$ lone pair $= 7$ domains; the simple domain count has no clean answer, and experiment gives a fluxionally distorted octahedron — the honest VSEPR statement is that a seventh, stereochemically active lone pair makes the ideal octahedron unstable, which is exactly the kind of case ([[#warn-vsepr-limits]]) where the model marks the boundary of its own validity rather than a failure to be defended. The pattern across the series is the lesson: domain counting predicts two of three perfectly and flags the third as trouble.
:::
:::

::: exercise Recover an angle from a dipole {level=3 check="107"}
The dipole moment of $\mathrm{NH_3}$ is $1.47\ \mathrm{D}$ and the $\mathrm{N–H}$ bond dipole is $1.34\ \mathrm{D}$. Assuming $C_{3v}$ symmetry (the three bonds equivalent, related by a threefold axis), compute the $\mathrm{H–N–H}$ bond angle. (Enter it in degrees, to the nearest degree.)
::: solution
Let each bond make an angle $\alpha$ with the threefold axis. Perpendicular components cancel by the threefold symmetry, so $\mu = 3\mu_\mathrm{b}\cos\alpha$, giving $\cos\alpha = 1.47/(3 \times 1.34) = 0.3659$, $\alpha = 68.5^\circ$. Two bonds at $\alpha$ from the axis and $120^\circ$ apart in azimuth satisfy (spherical trigonometry, or take the dot product of the two unit vectors)
$$
\cos(\mathrm{HNH}) = \cos^2\alpha + \sin^2\alpha\cos 120^\circ = \tfrac{3}{2}\cos^2\alpha - \tfrac12 = \tfrac{3}{2}(0.1339) - 0.5 = -0.300,
$$
so $\mathrm{H–N–H} = \arccos(-0.300) = 107^\circ$ — the observed angle, recovered from a dipole measurement alone. (Check against [[#ex-angle-ladder]]: the dipole and the geometry are two readings of the same molecule.)
:::
:::
