Draw a molecule of ethane and you draw two tetrahedral carbons joined by a line; draw it flat on the page and you have implicitly chosen *one* of infinitely many arrangements obtained by spinning the two $\mathrm{CH_3}$ groups about that line. Those arrangements are not drawings you chose badly — they are real structures the molecule visits thousands of millions of times a second, and they are not all equal in energy. The study of how energy varies with rotation about single bonds, and of how rings constrain that rotation, is **conformational analysis**, and it is the first place in organic chemistry where the three-dimensional picture stops being a drawing convention and starts doing arithmetic: it explains why butane boils the way it does, why cyclohexane is a chair, why one isomer of a disubstituted ring can be a thousand times more abundant than another, and — long before you meet them — why elimination reactions demand *anti* geometry and why enzymes care which face of a ring a drug presents. This lesson builds the whole subject from one idea: a molecule adopts the shapes that keep its atoms comfortably apart, and energy bookkeeping tells you which shapes those are.

## Rotation about σ bonds and the torsion angle

::: definition Conformers and the torsion angle {#def-conformer}
**Conformations** (conformers, conformational isomers) are the arrangements of a molecule's atoms that differ only by rotation about single ($\sigma$) bonds. A **torsion angle** (dihedral angle) $\phi$ is the angle, measured in a Newman projection, between a bond on the front atom and a bond on the back atom of a chosen $\mathrm{C{-}C}$ bond: $\phi = 0^\circ$ means the two bonds eclipse one another, $\phi = 60^\circ$ that they are staggered $60^\circ$ apart. A **dihedral angle** between two bonds further apart in the chain (for example the $\mathrm{H{-}C}$ bonds of the two terminal methyls of butane) is defined the same way and is the quantity a mechanism actually cares about.
:::

Two drawing conventions let you watch these rotations on paper. In a **Newman projection** you look straight down the chosen $\mathrm{C{-}C}$ bond: the front carbon is a point, the back carbon a circle, and the six substituents are spokes — three from the point, three from the circle's rim. In a **sawhorse projection** you view the bond obliquely, so it appears as a slanted line with its substituents, closer to how the molecule actually sits but harder to read angles from. Use Newman projections to measure torsion angles and compare conformers; use sawhorse drawings when you need to see the whole carbon skeleton at once.

Because rotation about a $\sigma$ bond is a motion, not a reaction, conformers interconvert without breaking anything. For ethane the barrier to rotation is $12.6\ \mathrm{kJ\,mol^{-1}}$ (a tabulated value), which at room temperature ($\mathrm{298\ K}$) corresponds — via an Eyring-type estimate $k \approx (k_\mathrm{B}T/h)\,e^{-\Delta G^{\ddagger}/RT}$ — to roughly $4\times10^{10}$ interconversions per second per molecule. This is why you can bottle "ethane" and never its conformers: they are not separable substances but states of one substance, visited too fast to isolate.

::: definition Torsional strain {#def-torsional}
**Torsional strain** is the part of a conformation's energy that rises when bonds on adjacent atoms are *eclipsed* rather than *staggered*. Its physical origin is the destabilising interaction between the bonding electron pairs of neighbouring $\sigma$ bonds when these are forced parallel, reinforced by the crowding of the eclipsed hydrogen atoms themselves. Every molecule pays torsional strain in its highest-energy rotational states; ethane pays $3 \times 4.2 = 12.6\ \mathrm{kJ\,mol^{-1}}$, three identical $\mathrm{H{-}H}$ eclipsing interactions of $4.2\ \mathrm{kJ\,mol^{-1}}$ each.
:::

::: example Ethane: what the barrier buys {#ex-ethane}
Ethane's rotational barrier is $12.6\ \mathrm{kJ\,mol^{-1}}$ above the staggered minimum. If the barrier were thermal energy itself ($RT = 2.48\ \mathrm{kJ\,mol^{-1}}$ at $\mathrm{298\ K}$) rather than five times it, roughly what fraction of ethane molecules would sit at or above the eclipsed top, and what would that imply for the concept of a molecular shape?
::: solution
The Boltzmann factor at the real barrier is $e^{-12600/2478.8} = 6.2\times10^{-3}$: under normal conditions only about one molecule in a hundred and sixty has enough energy to be crossing the top at any instant, so the molecule spends most of its time near staggered geometries and "staggered ethane" is a meaningful statement. If the barrier were only $RT$, the factor would be $e^{-1} = 0.37$ — every geometry would be nearly as populated as every other, rotation would be free on all timescales, and talking about *the* shape of a molecule would be pointless. The existence of a barrier of several $RT$ is exactly what makes conformational analysis possible at all.
:::
:::

## Butane: torsional strain meets steric strain

::: definition Steric (van der Waals) strain {#def-steric}
**Steric strain** is the energy cost of forcing two atoms, not bonded to each other, closer than the sum of their van der Waals radii — the quantum-mechanical repulsion of overlapping closed electron shells. Unlike torsional strain it does not care about eclipsing per se; it cares about *distance*. Its prototype in acyclic chemistry is the **gauche butane interaction**: in *gauche* butane ($\phi = 60^\circ$ between the two methyl groups) the methyl carbons are close enough to repel, and this single interaction costs $3.8\ \mathrm{kJ\,mol^{-1}}$ (tabulated).
:::

Butane, $\mathrm{CH_3CH_2CH_2CH_3}$, viewed down the central $\mathrm{C2{-}C3}$ bond, is the smallest molecule in which torsional and steric strain compete, and its energy profile $E(\phi)$ is the template for all later ones. Take the *anti* conformer ($\phi = 180^\circ$, methyls opposite) as zero. Rotating to $\phi = 60^\circ$ gives *gauche* butane, $+3.8\ \mathrm{kJ\,mol^{-1}}$: staggered, so torsionally comfortable, but carrying one methyl–methyl *gauche* interaction. Continue to $\phi = 120^\circ$: an *eclipsed* maximum with two $\mathrm{CH_3{-}H}$ eclipses and one $\mathrm{H{-}H}$ eclipse, $2(5.9) + 4.2 = 16.0\ \mathrm{kJ\,mol^{-1}}$. At $\phi = 0^\circ$ the two methyls eclipse each other: the **totally eclipsed** conformer, one $\mathrm{CH_3{-}CH_3}$ eclipse plus two $\mathrm{H{-}H}$ eclipses, $10.6 + 2(4.2) = 19.0\ \mathrm{kJ\,mol^{-1}}$. The $\phi = 360^\circ$ cycle then repeats through the mirror-image *gauche* at $300^\circ$ and *anti* at $180^\circ$.

::: example Energy bookkeeping for butane {#ex-butane-profile}
Using the interaction values above ($\mathrm{H{-}H}$ eclipse $4.2$, $\mathrm{CH_3{-}H}$ eclipse $5.9$, $\mathrm{CH_3{-}CH_3}$ eclipse $10.6$, *gauche* $\mathrm{CH_3 \cdots CH_3}$ $3.8\ \mathrm{kJ\,mol^{-1}}$), list every stationary point of butane's $E(\phi)$ over $0$–$360^\circ$ with its energy, and check that the count of maxima and minima is consistent with the symmetry of the molecule.
::: solution
Minima: *anti* at $\phi = 180^\circ$ ($0\ \mathrm{kJ\,mol^{-1}}$) and two equivalent *gauche* conformers at $\phi = 60^\circ$ and $300^\circ$ ($+3.8\ \mathrm{kJ\,mol^{-1}}$ each). Maxima: two equivalent *eclipsed* forms at $\phi = 120^\circ$ and $240^\circ$ ($+16.0\ \mathrm{kJ\,mol^{-1}}$) and one **totally eclipsed** form at $\phi = 0^\circ$ ($=360^\circ$, $+19.0\ \mathrm{kJ\,mol^{-1}}$). Three minima and three maxima per full turn, with the two *gauche* minima and the two mixed eclipses related as mirror images — the profile must repeat with period $180^\circ$ in its *shape* only through the molecule's internal symmetry, and the single deep well at $180^\circ$ is why *anti* dominates. The decomposition is not independent evidence for the numbers — it is a consistency check that the interaction values, calibrated on ethane and butane themselves, reproduce butane.
:::
:::

::: widget plot
f: A*(1 + cos(x*pi/180)) + B*(1 + cos(3*x*pi/180))
x: 0, 360
y: -1, 21
sliders: A=2.5:0:5:0.1; B=7:0:12:0.1
points: 0,19; 60,3.8; 120,16; 180,0
labels: E(\phi)
caption: The butane torsional profile $E(\phi)$ in $\mathrm{kJ\,mol^{-1}}$ against the methyl–methyl torsion angle $\phi$ in degrees, modelled as $A(1+\cos\phi) + B(1+\cos 3\phi)$; the marked points are the tabulated *totally eclipsed* ($19.0$), *gauche* ($3.8$), *eclipsed* ($16.0$) and *anti* ($0$) geometries. The $\cos 3\phi$ term alone would give three identical maxima and minima (that is ethane); the $\cos\phi$ term breaks the symmetry so that the methyl–methyl eclipse at $\phi = 0^\circ$ sits above the methyl–hydrogen eclipses. Slide $A$ to zero and watch the profile lose its discrimination between the two kinds of maximum — steric strain is precisely what the $A$ term encodes.
:::

::: example How much *gauche* butane is there? {#ex-gauche-pop}
Estimate the fraction of butane molecules in *gauche* conformations at $\mathrm{298\ K}$, taking $\Delta G^\circ = 3.8\ \mathrm{kJ\,mol^{-1}}$ for *anti* $\rightarrow$ *gauche* and ignoring the eclipsed maxima (they are transition states, not populations).
::: solution
There are *two* equivalent *gauche* conformers ($\phi = 60^\circ$ and $300^\circ$) for every one *anti*, so the *gauche* fraction is
$$
f_{\mathrm{g}} = \frac{2\,e^{-3800/2478.8}}{1 + 2\,e^{-3800/2478.8}} = \frac{2 \times 0.216}{1 + 2 \times 0.216} = 0.30 .
$$
About $30\,\%$ of butane molecules are *gauche* at room temperature — a third of the sample, not a trace — even though each *gauche* conformer is $3.8\ \mathrm{kJ\,mol^{-1}}$ worse than *anti*. Degeneracy (the factor of two) and the smallness of $3.8\ \mathrm{kJ\,mol^{-1}}$ relative to $RT = 2.48\ \mathrm{kJ\,mol^{-1}}$ both push the same way. This is the first lesson in statistical conformational analysis: an unfavoured conformer is not absent, and populations, not existence, are what energy decides.
:::
:::

## Ring strain: Baeyer's insight and the puckered ring

::: definition Ring strain {#def-ring-strain}
**Ring strain** is the excess energy of a cyclic molecule over an acyclic molecule of the same bond make-up, and it is the sum of **angle strain** (bond angles forced away from their preferred values, about $109.5^\circ$ at $sp^3$ carbon), **torsional strain** (bonds the ring cannot help but eclipse), and **steric strain** (transannular and *gauche*-type contacts across the ring). The **strain energy** of a cycloalkane is measured directly by calorimetry: from heats of combustion, tabulated per $\mathrm{CH_2}$ group.
:::

In 1885 Adolf von Baeyer argued that if rings are *planar* polygons, cyclopropane must have internal angles of $60^\circ$ and cyclobutane $90^\circ$ — far from $109.5^\circ$ — while cyclopentane at $108^\circ$ should be nearly strain-free and cyclohexane, at $120^\circ$, strained again. Combustion data test the prediction. The heat of combustion per $\mathrm{CH_2}$ in a long, unstrained chain is $658.6\ \mathrm{kJ\,mol^{-1}}$; any excess is strain, shared equally over the ring's carbons to a good approximation:

| ring | $\Delta_\mathrm{c}H$ per $\mathrm{CH_2}$ / $\mathrm{kJ\,mol^{-1}}$ | strain per $\mathrm{CH_2}$ / $\mathrm{kJ\,mol^{-1}}$ | total strain / $\mathrm{kJ\,mol^{-1}}$ |
|---|---|---|---|
| cyclopropane | 697.0 | 38.4 | 115 |
| cyclobutane | 686.1 | 27.5 | 110 |
| cyclopentane | 663.8 | 5.2 | 26 |
| cyclohexane | 658.6 | 0 | $\approx 0$ |
| cycloheptane | 662.3 | 3.7 | 26 |
| cyclooctane | 663.6 | 5.0 | 40 |

::: proposition Strain energy from combustion data {#prop-combustion}
For a cycloalkane $\mathrm{(CH_2)_{\mathit{n}}}$ with measured heat of combustion $\Delta_\mathrm{c}H_\mathrm{m}$, the total strain energy is
$$
E_\mathrm{strain} = \Delta_\mathrm{c}H_\mathrm{m} - n \times \left(658.6\ \mathrm{kJ\,mol^{-1}}\right),
$$
using the unstrained per-$\mathrm{CH_2}$ increment of long-chain alkanes as the reference. The method assumes each $\mathrm{CH_2}$ contributes equally to the heat of combustion in an unstrained environment — excellent for chains, and the source of the tabulated strain values quoted throughout this lesson.
:::

::: example Cyclopropane's 115, and where Baeyer went wrong {#ex-ring-strain}
Cyclopropane burns with $\Delta_\mathrm{c}H$ per $\mathrm{CH_2}$ of $697.0\ \mathrm{kJ\,mol^{-1}}$. Find its total strain energy, and compare the strain trend across $\mathrm{C_3}$–$\mathrm{C_8}$ with Baeyer's planar-ring prediction.
::: solution
$E_\mathrm{strain} = 3 \times (697.0 - 658.6) = 3 \times 38.4 = 115\ \mathrm{kJ\,mol^{-1}}$ — enormous, comparable to a fifth of a $\mathrm{C{-}C}$ bond, and the reason cyclopropane adds bromine like an alkane more than it substitutes like an alkane. Baeyer was right that small rings are strained, but his table ends wrong: he predicted cyclohexane (planar, $120^\circ$) to be strained and cyclopentane to be the least strained ring. The data show the opposite — cyclohexane is *strain-free* and cyclopentane carries $26\ \mathrm{kJ\,mol^{-1}}$. The flaw was the word "planar": rings with five or more carbons **pucker** out of plane, trading a little angle strain for the elimination of torsional strain, until cyclohexane finds a geometry — the chair — with neither.
:::
:::

## The chair: cyclohexane solves every problem at once

::: definition The chair conformation, axial and equatorial bonds {#def-chair}
The **chair** conformation of cyclohexane, $\mathrm{C_6H_{12}}$, is the puckered ring in which all six $\mathrm{C{-}C{-}C}$ angles are $111.6^\circ$ (within a degree of $109.5^\circ$) and every adjacent $\mathrm{C{-}H}$ bond is staggered: angle strain and torsional strain are both zero, consistent with its zero strain energy. Its twelve $\mathrm{C{-}H}$ bonds fall into two classes: six **axial** bonds, parallel to the ring's threefold axis and alternating up–down around the ring, and six **equatorial** bonds, fanning out near the ring's equator. Each carbon carries exactly one of each, and neighbouring axial bonds point to opposite faces.
:::

Read the chair in a Newman sense and its stability becomes arithmetic: viewed down any ring $\mathrm{C{-}C}$ bond, cyclohexane is *anti* everywhere — every $\mathrm{H{-}C{-}C{-}H}$ torsion is $\pm 60^\circ$ or $180^\circ$, never $0^\circ$. The alternatives pay for their geometry. The **boat** conformation has two *eclipsed* $\mathrm{C{-}C}$ bonds and two hydrogen atoms on the "prow" and "stern" carbons jammed $0.18\ \mathrm{nm}$ apart across the ring; it lies $25$–$30\ \mathrm{kJ\,mol^{-1}}$ above the chair. Twisting the boat slightly relieves the flagpole clash and gives the **twist-boat**, about $21\ \mathrm{kJ\,mol^{-1}}$ up — a minimum, not a maximum, and the way station through which two chairs interconvert.

Substituted cyclohexanes add the decisive question. An **axial** substituent points along the axis into the ring's interior and meets, head-on, the two axial hydrogens on carbons three bonds away — the **1,3-diaxial interaction**, geometrically identical to one *gauche* butane interaction. An **equatorial** substituent points outward into open space and pays nothing. That is the whole theory of monosubstituted cyclohexanes:

::: proposition A-values and the equatorial preference {#prop-avalues}
For a monosubstituted cyclohexane $\mathrm{C_6H_{11}{-}R}$, the standard free energy $\Delta G^\circ$ of the equilibrium *axial* $\rightleftharpoons$ *equatorial* is called the substituent's **A-value** (tabulated: $\mathrm{CH_3}$, $7.6$; $\mathrm{CH(CH_3)_2}$, $9.3$; $\mathrm{C(CH_3)_3}$, $23\ \mathrm{kJ\,mol^{-1}}$). The axial methyl in methylcyclohexane makes two 1,3-diaxial $\mathrm{CH_3 \cdots H}$ contacts, each equal to one $3.8\ \mathrm{kJ\,mol^{-1}}$ butane-*gauche* interaction: $2 \times 3.8 = 7.6$, the methyl A-value exactly. Populations follow the Boltzmann factor,
$$
\frac{[\mathrm{eq}]}{[\mathrm{ax}]} = e^{-\Delta G^\circ / RT}, \qquad \Delta G^\circ = -RT \ln K .
$$
:::

::: proof From A-value to population ratio {#proof-boltzmann}
The two chair forms of $\mathrm{C_6H_{11}R}$ are linked by a first-order equilibrium with no barrier other than the ring-flip path itself, so at temperature $T$ their numbers obey the Boltzmann distribution over their free-energy difference $\Delta G^\circ = G_\mathrm{ax} - G_\mathrm{eq}$:
$$
\frac{N_\mathrm{ax}}{N_\mathrm{eq}} = e^{-\left(G_\mathrm{ax} - G_\mathrm{eq}\right)/RT} = e^{-\Delta G^\circ/RT}.
$$
Identifying $K = [\mathrm{eq}]/[\mathrm{ax}] = N_\mathrm{eq}/N_\mathrm{ax}$ gives $\Delta G^\circ = -RT \ln K$, the general isotherm relation specialised to an isomerisation, in which the standard states cancel because both are pure-conformer states of one molecule. For methylcyclohexane at $\mathrm{298\ K}$: $\Delta G^\circ/RT = 7600/2478.8 = 3.07$, so $K = e^{3.07} = 21.5$. Nothing in the proof is specific to methyl: the same exponential converts any A-value into a ratio, which is why a table of A-values is a table of populations.
:::

::: example Methylcyclohexane: 21 to 1 {#ex-methylcyclohexane}
Methylcyclohexane has A-value $7.6\ \mathrm{kJ\,mol^{-1}}$. Compute the equatorial:axial ratio at $\mathrm{298\ K}$, and the fraction of molecules with the methyl equatorial.
::: solution
$$
\frac{[\mathrm{eq}]}{[\mathrm{ax}]} = e^{7600/(8.314 \times 298)} = e^{3.07} = 21.5 ,
$$
so about $21$ molecules in $22$ — $95.5\,\%$ — carry an equatorial methyl at any instant, and the axial chair is a $4.5\,\%$ minority. The number $21.5$ is not a curiosity: it is $e^{2 \times 3.8 / RT}$, two butane-*gauche* interactions exponentiated, and it reproduces the microwave and NMR spectra. Note also how the exponential punishes size: isopropyl ($9.3$) gives $42.6$, and *tert*-butyl ($23$) gives $1.07\times10^{4}$ — a *tert*-butyl group is, for most purposes, a ring locked into one chair.
:::
:::

::: widget newton
f: exp(-7600/(8.314*x)) - 1/9
x0: 400
x: 250, 600
caption: Newton's method solving for the temperature at which methylcyclohexane is only $90\,\%$ equatorial: the equation $e^{-7600/(8.314\,T)} = 1/9$ says the axial fraction reaches $0.10$ at $T = 416\ \mathrm{K}$. Heating a $95.5\,\%$ equatorial sample to $143\ \mathrm{^\circ C}$ buys only five more percentage points of the axial form — the A-value itself barely moves with temperature — which is why conformational preferences are fought over substituent size, not over the thermometer.
:::

::: warning Ring flips break nothing — and equatorial is not a law of nature {#warn-flip}
Two misconceptions, both worth killing early. **(1)** A **ring flip** is not a reaction: no bond breaks, no substituent detaches; the ring passes through twist-boat forms, axial becomes equatorial and up stays up — a substituent that was "up-axial" becomes "up-equatorial", so *cis*/*trans* relationships (configurations) survive the flip untouched, while axial/equatorial (conformations) do not. Confusing the two makes every disubstituted-ring problem unsolvable. **(2)** "Equatorial is favoured" holds for a *single* substituent in an *unstrained* chair. A *tert*-butyl group ($23\ \mathrm{kJ\,mol^{-1}}$) locks the ring so hard that a second, smaller group is often *forced* axial — and in rings with 1,3-diaxial alkyl–alkyl contacts, or with heteroatoms whose lone pairs prefer axial (the anomeric effect, organic-2 territory), the equatorial preference can shrink or reverse. A-values are data, not commandments.
:::

::: quiz
At room temperature a cyclohexane ring flips about $10^{5}$ times per second (an Eyring estimate from the $\approx 45\ \mathrm{kJ\,mol^{-1}}$ twist-boat barrier; NMR resolves the two chairs only when the sample is cooled far below room temperature). What does a single flip of methylcyclohexane accomplish?
- [ ] It converts the *cis* isomer into the *trans* isomer, because the methyl changes sides of the ring.
- [x] It turns the up-axial methyl into an up-equatorial methyl: axial/equatorial changes, up/down (configuration) does not, so no new compound is made.
- [ ] It breaks and reforms one $\mathrm{C{-}C}$ bond of the ring, which is why the flip has an activation barrier.
- [ ] It converts most of the sample into the *gauche* conformer, because the ring passes through boat forms.
::: solution
The second option is correct. A flip is a conformational change: every substituent keeps its face (up stays up) while swapping axial for equatorial, so *cis*/*trans* configurations are untouched (options 1 and 3 fail — no bond breaks, which is exactly why the barrier, about $45\ \mathrm{kJ\,mol^{-1}}$, is so much lower than a bond energy). The *gauche* language of option 4 belongs to butane's open-chain rotation, not to the ring flip of a chair.
:::
:::

::: history
The chair was not obvious; it was won twice. In 1885 Baeyer built his strain theory on planar rings and, ironically, his most successful prediction (cyclopentane, strain-free) was wrong for exactly that reason. In 1921 Hermann Sachse proposed the puckered chair and boat, but his papers went unread until Ernst Mohr published them in 1922 with X-ray evidence from hexamethylbenzene derivatives. Odd **Hassel** proved the chair directly by gas-phase electron diffraction in 1936 — the first precise structure of a saturated ring — and Derek **Barton**, in a pair of 1950 papers, turned the chair into chemistry: axial and equatorial substituents, 1,3-diaxial interactions, and A-values explained reactivity and stability across the steroids, founding modern **conformational analysis**. Hassel shared the 1969 Nobel Prize in Chemistry with Barton "for their contributions to the idea of conformational analysis and its application".
:::

## Ring flip and the two-chair game

Flipping a chair interconverts the two equivalent chairs of cyclohexane itself, but for a substituted ring the two chairs are *not* equivalent — one puts the substituent axial, the other equatorial — and their free-energy difference is the A-value. The flip is fast (the twist-boat barrier is about $45\ \mathrm{kJ\,mol^{-1}}$ for methylcyclohexane, so both chairs are visible only to NMR at low temperature), but the *ratio* is fixed by thermodynamics. Ranking the two chairs of any molecule is then bookkeeping: write both, count 1,3-diaxial contacts, exponentiate.

::: example Which chair wins when a *tert*-butyl group referees {#ex-two-chairs}
Consider *cis*-1-*tert*-butyl-4-methylcyclohexane. In one chair the *tert*-butyl group is equatorial and the methyl axial; in the other (after the flip) *tert*-butyl is axial and methyl equatorial. Which dominates, and by how much?
::: solution
Chair A costs one axial methyl: $7.6\ \mathrm{kJ\,mol^{-1}}$. Chair B costs one axial *tert*-butyl: $23\ \mathrm{kJ\,mol^{-1}}$. The difference is $23 - 7.6 = 15.4\ \mathrm{kJ\,mol^{-1}}$, so
$$
\frac{[\mathrm{A}]}{[\mathrm{B}]} = e^{15400/2478.8} = e^{6.21} \approx 500 .
$$
Five hundred to one in favour of the chair with the *methyl* axial — the molecule accepts a methyl 1,3-diaxial penalty rather than a *tert*-butyl one, because the *tert*-butyl group's two extra methyls multiply the diaxial contacts. This is the standard trick of conformational chemistry: a bulky "anchor" substituent freezes the ring so that the position of a second group can be studied, or used, at leisure.
:::
:::

## Disubstituted cyclohexanes: cis and trans

With two substituents, configuration (*cis*/*trans*) and conformation (which chair) become a two-level problem, and the analysis is a table, not a mystery. For **1,2-** and **1,4-**disubstituted rings, the *trans* isomer can be diequatorial (e,e) and the *cis* isomer is forced to (ax,eq); for **1,3-**disubstituted rings the roles reverse — *cis*-1,3 is (e,e) and *trans*-1,3 is (ax,ax). The flip of a (e,e) chair is an (ax,ax) chair, $2 \times 7.6 = 15.2\ \mathrm{kJ\,mol^{-1}}$ up for two methyls; the flip of an (ax,eq) chair is an (eq,ax) chair, degenerate for identical groups.

::: example Ranking the chairs of dimethylcyclohexane {#ex-dimethyl}
For each of *trans*-1,2-, *cis*-1,3- and *cis*-1,4-dimethylcyclohexane, write the two chair forms in (ax,eq) notation, give the strain difference between them, and say which isomer of the 1,4-pair is more stable.
::: solution
*trans*-1,2: (e,e) $\rightleftharpoons$ (ax,ax), difference $15.2\ \mathrm{kJ\,mol^{-1}}$, overwhelmingly (e,e). *cis*-1,3: (e,e) $\rightleftharpoons$ (ax,ax), again $15.2\ \mathrm{kJ\,mol^{-1}}$ — the *cis* isomer of a 1,3-pair is the comfortable one. *cis*-1,4: (ax,eq) $\rightleftharpoons$ (eq,ax), degenerate, mean strain $7.6\ \mathrm{kJ\,mol^{-1}}$; *trans*-1,4: (e,e) $\rightleftharpoons$ (ax,ax), best chair strain $0$. So *trans*-1,4 beats *cis*-1,4 by $7.6\ \mathrm{kJ\,mol^{-1}}$ (ratio $e^{7600/2478.8} = 21.5$ between the best chairs of the two configurations), and *cis*-1,3 beats *trans*-1,3 by $15.2\ \mathrm{kJ\,mol^{-1}}$ — a factor of $460$. The pattern to internalise: 1,3-*cis* and 1,2/1,4-*trans* are the "diequatorial-able" relationships; the ring flip never changes which of these a molecule is.
:::
:::

## Medium rings and the limits of the chair

Rings of seven to thirteen carbons — the **medium rings** — can pucker, but they cannot escape everything: transannular hydrogen–hydrogen contacts across the ring interior reintroduce steric strain, and *trans* double bonds or *trans* fused rings in this size range are severely strained. Cycloheptane ($26\ \mathrm{kJ\,mol^{-1}}$) puckers into a twist-chair that keeps torsional strain low; cyclooctane ($40\ \mathrm{kJ\,mol^{-1}}$) is worse still because its crown-like ideal form is fully *eclipsed*, so it adopts a boat–boat ("tub") shape instead, and its conformational behaviour — several interconverting forms of similar energy — anticipates the conformational chemistry of steroids, sugars and foldamers. From about twelve carbons up, the rings are large enough to be essentially strain-free chains joined at the ends: the strain table bottoms out and the chair's lessons carry over unchanged.

## Where this leads

Conformational analysis is the machinery underneath three later chapters. The counting of what survives a ring flip — configuration fixed, conformation fluid — is the doorway to [[organic-1/stereochemistry]], where *cis*/*trans* and *R*/*S* become the central currency. The demand that orbitals align along the breaking bond, first felt here as the preference for *anti* torsions, returns as the stereoelectronic requirement of elimination — E2 reactions need an *anti*-periplanar $\mathrm{H}$ and leaving group, which is a chair problem in disguise ([[organic-1/elimination]]). The 1,3-diaxial interaction reappears as the steric term in carbocation and radical stability ([[organic-1/radical-reactions]]), and A-values themselves return when substituent effects on reactivity are quantified in [[organic-1/nucleophilic-substitution]]. The bond-energy and hybridisation ideas assumed throughout are developed in [[bonding-structure/valence-bond]], and the statistical factor of two in *gauche* populations is the same Boltzmann bookkeeping used in [[kinetics/collision-theory]].

::: summary
- Conformers differ only by rotation about $\sigma$ bonds and interconvert without breaking bonds; the torsion angle $\phi$ measures that rotation in a Newman projection.
- Torsional strain (eclipsing, $4.2\ \mathrm{kJ\,mol^{-1}}$ per $\mathrm{H{-}H}$ eclipse) and steric strain (atoms closer than their van der Waals radii allow, $3.8\ \mathrm{kJ\,mol^{-1}}$ per butane *gauche* interaction) are different energies that add.
- Butane's profile: *anti* $0$, *gauche* $3.8$, *eclipsed* $16.0$, totally eclipsed $19.0\ \mathrm{kJ\,mol^{-1}}$; about $30\,\%$ of molecules are *gauche* at $298\ \mathrm{K}$ because two degenerate minima exist.
- Ring strain = angle + torsional + steric strain, measured by combustion: cyclopropane $115$, cyclobutane $110$, cyclopentane $26$, cyclohexane $\approx 0\ \mathrm{kJ\,mol^{-1}}$; rings of five or more atoms pucker, defeating Baeyer's planar model.
- The chair has zero angle and torsional strain; substituents pay $2 \times 3.8\ \mathrm{kJ\,mol^{-1}}$ per 1,3-diaxial contact when axial, which is exactly the methyl A-value.
- Populations follow $[\mathrm{eq}]/[\mathrm{ax}] = e^{-\Delta G^\circ/RT}$: methyl $21.5$, isopropyl $42.6$, *tert*-butyl $1.07\times10^{4}$ to 1 at $298\ \mathrm{K}$.
- A ring flip swaps axial $\rightleftharpoons$ equatorial but preserves up/down, so configurations survive flips; *cis*/*trans* ranking of dimethylcyclohexanes is a table of (e,e), (ax,eq), (ax,ax) bookkeeping.
:::

## Exercises

::: exercise Axial and equatorial bookkeeping {level=1 check="6"}
How many axial hydrogen atoms does one chair conformation of cyclohexane carry? (Enter the number.)
::: solution
Six. Each of the six carbons carries one axial and one equatorial $\mathrm{C{-}H}$, and neighbouring axial bonds alternate up and down around the ring.
:::
:::

::: exercise A-value to ratio {level=1 check="42.6"}
Isopropylcyclohexane has A-value $9.3\ \mathrm{kJ\,mol^{-1}}$. Compute the equatorial:axial population ratio at $\mathrm{298\ K}$. (Enter the ratio as a number.)
::: solution
$[\mathrm{eq}]/[\mathrm{ax}] = e^{9300/(8.314 \times 298)} = e^{3.75} = 42.6$. The isopropyl group is twice as demanding as methyl in population terms, though only $1.7\ \mathrm{kJ\,mol^{-1}}$ worse in energy — the exponential amplifies.
:::
:::

::: exercise Strain from combustion {level=1 check="115.2"}
Cyclopropane's heat of combustion is $697.0\ \mathrm{kJ\,mol^{-1}}$ per $\mathrm{CH_2}$, against $658.6\ \mathrm{kJ\,mol^{-1}}$ for an unstrained chain $\mathrm{CH_2}$. Find cyclopropane's total strain energy. (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$(697.0 - 658.6) \times 3 = 38.4 \times 3 = 115.2\ \mathrm{kJ\,mol^{-1}}$. Three carbons share the strain equally only because all three positions are equivalent; in substituted small rings the strain is not so evenly divided.
:::
:::

::: exercise The *tert*-butyl anchor {level=2 check="10700"}
Compute the equilibrium ratio of the two chair forms of *tert*-butylcyclohexane (equatorial *tert*-butyl : axial *tert*-butyl) at $\mathrm{298\ K}$, taking the A-value as $23\ \mathrm{kJ\,mol^{-1}}$. (Enter the ratio as a number.)
::: solution
$e^{23000/2478.8} = e^{9.28} = 1.07\times10^{4}$, about $10\,700$ to $1$. With a population ratio like this, the axial *tert*-butyl chair is essentially unobservable, which is why *tert*-butyl groups are used as conformational anchors.
:::
:::

::: exercise Configurations, not conformations {level=2 check="460"}
Best-chair strain of *cis*-1,3-dimethylcyclohexane is $0$ (e,e); best-chair strain of *trans*-1,3-dimethylcyclohexane is $15.2\ \mathrm{kJ\,mol^{-1}}$ (ax,ax). Compute the equilibrium constant for the isomerisation *trans* $\rightarrow$ *cis* at $\mathrm{298\ K}$. (Enter $K = [\textit{cis}]/[\textit{trans}]$ as a number.)
::: solution
$K = e^{15200/2478.8} = e^{6.13} = 460$. Note what this is and is not: an equilibrium between two *configurations* (interconverting them needs bond-breaking), computed entirely from conformational strain energies. A ring flip changes the chair but never the answer.
:::
:::

::: exercise Heating a conformational equilibrium {level=2 check="416"}
At what temperature does methylcyclohexane (A-value $7.6\ \mathrm{kJ\,mol^{-1}}$, treated as temperature-independent) sit at $90\,\%$ equatorial? (Enter $T$ in kelvin.)
::: solution
$90\,\%$ equatorial means $[\mathrm{eq}]/[\mathrm{ax}] = 9$, so $7600 = RT \ln 9$ and $T = 7600/(8.314 \times 2.197) = 416\ \mathrm{K}$. Even at $143\ \mathrm{^\circ C}$ the axial form is only $10\,\%$ — conformational preferences are stubborn against heat.
:::
:::

::: exercise The degeneracy factor {level=3}
Derive the *gauche* fraction of butane, $f_{\mathrm{g}} = 2e^{-\Delta G/RT}/(1 + 2e^{-\Delta G/RT})$, from the Boltzmann distribution, explaining every factor, and evaluate it at $\mathrm{298\ K}$ and $\mathrm{500\ K}$ with $\Delta G = 3.8\ \mathrm{kJ\,mol^{-1}}$. Why does $f_{\mathrm{g}}$ rise with temperature towards $2/3$ and not towards $1/2$?
::: solution
The partition sum over minima is $Z = 1 + 2e^{-\Delta G/RT}$: one *anti* state of energy $0$ and *two* degenerate *gauche* states of energy $\Delta G$ (the $\phi = 60^\circ$ and $300^\circ$ mirror images). The *gauche* fraction is the sum of the two *gauche* Boltzmann weights divided by $Z$, giving the stated formula. At $298\ \mathrm{K}$: $2(0.216)/(1+0.432) = 0.30$; at $500\ \mathrm{K}$: $2e^{-3800/4157}/(1+2e^{-3800/4157}) = 2(0.400)/1.800 = 0.44$. As $T \rightarrow \infty$ every exponential goes to $1$ and populations become pure counting: $f_{\mathrm{g}} \rightarrow 2/3$, because two of the three minima are *gauche*. Energy decides who wins at low temperature; degeneracy decides at high temperature — the same competition that runs through statistical thermodynamics.
:::
:::

::: exercise Why the chair, from angles {level=3}
The interior angle of a regular planar $n$-gon is $(n-2)\times 180^\circ/n$. Compute this for $n = 3, 4, 5, 6$ and the deviation from $109.5^\circ$, and use the results to explain why Baeyer's planar model predicted cyclohexane to be strained while the measured strain energy is zero. What two geometric facts about the chair resolve the paradox?
::: solution
Planar angles: $60^\circ$ ($n=3$, deviation $49.5^\circ$), $90^\circ$ ($n=4$, $19.5^\circ$), $108^\circ$ ($n=5$, $1.5^\circ$), $120^\circ$ ($n=6$, $10.5^\circ$). Baeyer's logic — strain grows with angular deviation — then ranks the rings $3 > 6 > 4 > 5$, predicting a strained cyclohexane and a nearly perfect cyclopentane. The measured order is $3 > 4 > 5 \approx 7 > 8 \gg 6$. The resolution: only $\mathrm{C_3}$ (and roughly $\mathrm{C_4}$) is confined to its plane, because three (or four) points define a plane; larger rings pucker. The chair then has (i) $\mathrm{C{-}C{-}C}$ angles of $111.6^\circ$, within $2^\circ$ of tetrahedral, killing angle strain, and (ii) every ring torsion angle staggered, killing torsional strain — while a planar cyclohexane would have had *both* $120^\circ$ angles and six *eclipsed* $\mathrm{C{-}H}$ bonds. Zero strain is not luck; it is the unique geometry that satisfies both conditions at once, and it is why six-membered rings dominate the chemistry of saturated rings.
:::
:::
