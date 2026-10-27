Mix cyclopenta-1,3-diene with maleic anhydride at room temperature and, within minutes, a white solid crystallises: a bicyclic anhydride in which two new carbon–carbon bonds and a six-membered ring have formed at once, with no catalyst, no ions, no radicals, and with a single stereoisomer out of several possible. Heat (2*E*,4*Z*,6*E*)-octa-2,4,6-triene and it closes to *cis*-5,6-dimethylcyclohexa-1,3-diene, never the *trans* isomer; shine ultraviolet light on it and the *trans* isomer forms instead. These are **pericyclic reactions**: reactions in which bonds are made and broken in a single, concerted step through a cyclic array of interacting orbitals. They were once called "no-mechanism reactions", because they showed none of the intermediates that organic chemists used to describe mechanisms; their stereochemistry seemed capricious until Robert Burns Woodward and Roald Hoffmann explained it in 1965 by the conservation of orbital symmetry.

For a synthetic chemist pericyclic reactions are extraordinarily valuable. They form several bonds and up to four stereocentres in one step, with stereospecificity dictated by orbital symmetry, and with perfect atom economy. The Diels–Alder reaction is the most powerful ring-forming reaction in synthesis; the Claisen and Cope rearrangements transfer stereochemistry from one bond to another with predictable geometry. This chapter defines the classes of pericyclic reaction, develops the frontier-orbital and Woodward–Hoffmann analyses that predict whether a reaction is allowed and what its stereochemistry will be, and works through cycloadditions, electrocyclic reactions and sigmatropic rearrangements with their uses in synthesis. The π-orbital background is in [[organic-2/conjugation]] and, more formally, in [[quantum-chemistry/huckel-theory]].

## Classes of pericyclic reaction {#sec-classes}

::: definition Pericyclic reactions and their classes {#def-pericyclic}
A **pericyclic reaction** is a concerted reaction in which all bond making and breaking occurs in one step through a cyclic transition state of continuously overlapping orbitals. The main classes are:

- **Cycloadditions** — two π systems combine to form a ring with two new σ bonds; written $[m + n]$ with $m$, $n$ the numbers of electrons (or atoms) of each component: the Diels–Alder reaction is a $[4 + 2]$ cycloaddition. The reverse is a **cycloreversion**.
- **Electrocyclic reactions** — a conjugated polyene closes to a ring with one new σ bond between its termini, or the reverse (ring opening).
- **Sigmatropic rearrangements** — a σ bond migrates across a π system to a new position; written $[i, j]$, the numbers of atoms in each fragment between the old and the new σ bond: the Cope and Claisen rearrangements are $[3,3]$ shifts, the migration of hydrogen around a cyclopentadiene a $[1,5]$ shift.
- **Group transfers** (ene reactions) and **cheletropic reactions** (two σ bonds made or broken at a single atom, as in the addition of a carbene or $\mathrm{SO_2}$).

A component reacts **suprafacially** (s) if its new bonds form (or old bonds break) on the same face, and **antarafacially** (a) if on opposite faces.
:::

In curly-arrow terms, a pericyclic reaction is drawn with arrows that go round a ring: for the Diels–Alder reaction of buta-1,3-diene with ethene, the π electrons of the ethene C=C move to form a σ bond to C1 of the diene; the C1=C2 π electrons move to form the new C2=C3 π bond; and the C3=C4 π electrons move to form a σ bond from C4 back to the other ethene carbon. Six electrons circulate, and all three movements happen at once. The direction of the arrows (clockwise or anticlockwise) is arbitrary; that ambiguity is itself a sign that no electron pair is "the nucleophile" — the reaction is controlled by orbital overlap, not by charge.

## Frontier orbitals of polyenes {#sec-fmo}

The π orbitals of a linear conjugated polyene with $n$ carbons are given by Hückel theory. They have a simple, general form.

::: proposition Hückel orbitals of a linear polyene {#prop-huckel}
For a linear conjugated chain of $n$ $sp^2$ carbon atoms in the Hückel approximation (Coulomb integral $\alpha$, resonance integral $\beta < 0$ between neighbours, overlap neglected), the π molecular orbitals $\psi_k = \sum_j c_{jk}\phi_j$, $k = 1, \ldots, n$, have energies and coefficients
$$
E_k = \alpha + 2\beta\cos\frac{k\pi}{n+1}, \qquad c_{jk} = \sqrt{\frac{2}{n+1}}\,\sin\frac{jk\pi}{n+1}.
$$ {#eq-huckel}
Orbital $\psi_k$ has $k - 1$ nodes between atoms. Its terminal coefficients $c_{1k}$ and $c_{nk}$ have the same sign when $k$ is odd and opposite signs when $k$ is even.
:::

::: proof
The secular equations are $(\alpha - E)c_j + \beta(c_{j-1} + c_{j+1}) = 0$ for $j = 1, \ldots, n$, with $c_0 = c_{n+1} = 0$ (the chain ends). Try $c_j = \sin(j\theta)$: using $\sin((j-1)\theta) + \sin((j+1)\theta) = 2\sin(j\theta)\cos\theta$, the equation becomes $(\alpha - E + 2\beta\cos\theta)\sin(j\theta) = 0$, so $E = \alpha + 2\beta\cos\theta$. The boundary condition $c_{n+1} = \sin((n+1)\theta) = 0$ requires $\theta = k\pi/(n+1)$, $k = 1, \ldots, n$, giving [[#eq-huckel]]; the factor $\sqrt{2/(n+1)}$ normalises the orbital, since $\sum_{j=1}^n \sin^2(jk\pi/(n+1)) = (n+1)/2$. The function $\sin(jk\pi/(n+1))$ changes sign $k - 1$ times between $j = 1$ and $j = n$, which gives the nodes. Finally $c_{nk} = \sin(nk\pi/(n+1)) = \sin(k\pi - k\pi/(n+1)) = (-1)^{k+1}\sin(k\pi/(n+1)) = (-1)^{k+1}c_{1k}$: the termini have the same sign for odd $k$, opposite signs for even $k$. $\blacksquare$
:::

The last statement is the key to pericyclic selectivity. For **ethene** ($n = 2$): HOMO $\psi_1$ (termini in phase), LUMO $\psi_2$ (out of phase). For **butadiene** ($n = 4$, energies $\alpha \pm 1.618\beta$, $\alpha \pm 0.618\beta$): HOMO $\psi_2$ (termini out of phase), LUMO $\psi_3$ (in phase). For **hexatriene** ($n = 6$, $\alpha \pm 1.802\beta$, $\pm 1.247\beta$, $\pm 0.445\beta$): HOMO $\psi_3$ (in phase), LUMO $\psi_4$ (out of phase). The pattern alternates with the number of electron pairs.

::: widget plot
f: sin(k*pi*x/(n + 1)); 0
x: 0, 9
y: -1.2, 1.2
sliders: n=4:2:8:2; k=2:1:8:1
labels: \sin(jk\pi/(n+1)); \text{axis}
vlines: 1; 2; 3; 4; 5; 6; 7; 8
caption: The Hückel coefficients of [[#eq-huckel]] (without the normalising factor) are the values of $\sin(k\pi x/(n+1))$ at the atom positions $x = 1, 2, \ldots, n$ (vertical lines; ignore those beyond $n$). Choose the chain length $n$ and the orbital number $k$ ($k \leq n$). For butadiene ($n = 4$), $k = 2$ is the HOMO: the values at atoms 1 and 4 have opposite signs. Set $k = 3$ (the LUMO) and the termini are in phase. For hexatriene ($n = 6$) the HOMO is $k = 3$, in phase at the termini. The curve crosses zero $k - 1$ times between the atoms — the nodes — and the end atoms of the HOMO alternate between in phase and out of phase as $n/2$ goes from odd to even: the origin of the $4q + 2$ versus $4q$ alternation in the Woodward–Hoffmann rules.
:::

**Frontier molecular orbital (FMO) theory** (Kenichi Fukui, from 1952) says that the dominant interaction in a reaction between two molecules is between the HOMO of one and the LUMO of the other; it is stronger the smaller their energy separation and the larger the overlap of the orbital lobes where the new bonds form. A concerted cycloaddition needs **bonding overlap at both new bonds at once**. For a $[4s + 2s]$ Diels–Alder reaction, the butadiene HOMO ($\psi_2$, termini out of phase) meets the ethene LUMO ($\psi_2^*$, termini out of phase): the signs match at both ends, so both bonds can form on the same faces of both components. The other pairing — ethene HOMO (in phase) with butadiene LUMO (in phase) — also matches. A thermal $[2s + 2s]$ cycloaddition of two ethenes pairs an in-phase HOMO with an out-of-phase LUMO: one end bonding, the other antibonding. It is **symmetry-forbidden** thermally, and indeed alkenes do not dimerise on heating. Under ultraviolet light one ethene is excited, an electron is promoted to $\psi_2^*$, which becomes its new HOMO; this now matches the other ethene's LUMO, and **photochemical [2+2] cycloadditions are allowed**.

::: example Symmetry analysis of cycloadditions {#ex-fmo}
Use the terminal-phase rule of [[#prop-huckel]] to decide whether each thermal, all-suprafacial cycloaddition is allowed: (a) $[4s + 2s]$ (butadiene + ethene); (b) $[2s + 2s]$; (c) $[4s + 4s]$ (two butadienes); (d) $[6s + 4s]$ (hexatriene + butadiene).
::: solution
A suprafacial–suprafacial cycloaddition is allowed if the HOMO of one component and the LUMO of the other have the **same** terminal phase relationship (both in phase or both out of phase), so that both termini overlap in a bonding way. From [[#prop-huckel]], the HOMO of a polyene with $N$ π electrons ($k = N/2$) has termini in phase when $N/2$ is odd and out of phase when $N/2$ is even; the LUMO ($k = N/2 + 1$) is the opposite.

(a) Butadiene HOMO ($k = 2$, out of phase), ethene LUMO ($k = 2$, out of phase): match. **Allowed** (6 electrons).

(b) Ethene HOMO ($k = 1$, in phase), ethene LUMO ($k = 2$, out of phase): mismatch. **Forbidden** (4 electrons).

(c) Butadiene HOMO ($k = 2$, out of phase), butadiene LUMO ($k = 3$, in phase): mismatch. **Forbidden** (8 electrons).

(d) Hexatriene HOMO ($k = 3$, in phase), butadiene LUMO ($k = 3$, in phase): match. **Allowed** (10 electrons).

The pattern — suprafacial cycloadditions allowed for $4q + 2$ electrons (6, 10, …), forbidden for $4q$ (4, 8, …) — is the cycloaddition case of the general rule [[#prop-wh]].
:::
:::

## The Diels–Alder reaction {#sec-diels-alder}

The Diels–Alder reaction joins a conjugated **diene** (four π electrons) and a **dienophile** (an alkene or alkyne, two π electrons) to form a cyclohexene. In synthesis its power lies in its predictability.

- **The diene must be s-*cis*.** The two double bonds must lie on the same side of the central single bond so that C1 and C4 can both reach the dienophile. Cyclic dienes locked s-*cis*, such as cyclopentadiene, are especially reactive (cyclopentadiene dimerises by a Diels–Alder reaction with itself at room temperature and is "cracked" back to the monomer by heating before use). Dienes with a large (*Z*)-1-substituent cannot easily adopt the s-*cis* conformation and react sluggishly.
- **Electron demand.** In the "normal" Diels–Alder reaction an electron-rich diene (donor substituents, OMe, alkyl, $\mathrm{OSiMe_3}$, raise its HOMO) reacts with an electron-poor dienophile (acceptor substituents, CHO, COR, $\mathrm{CO_2R}$, CN, lower its LUMO). Narrowing the HOMO–LUMO gap accelerates the reaction: butadiene and ethene react only at high temperature and pressure, whereas cyclopentadiene and maleic anhydride react at room temperature. Lewis acids accelerate further, by binding to the dienophile's carbonyl oxygen and lowering its LUMO.
- **Stereospecificity.** Both components react suprafacially, so the relative configuration of the dienophile's substituents is retained in the product (*cis* stays *cis*, *trans* stays *trans*), and the "outside" substituents at C1 and C4 of the diene end up *cis* to each other.
- **The endo rule (empirical, Alder 1937).** When the dienophile has an unsaturated substituent (C=O, CN), the kinetic product usually has that substituent **endo** — oriented towards the newly forming π bond of the diene, under the diene in the transition state — even though the exo product is often more stable. The preference is attributed to favourable **secondary orbital interactions** between the substituent's π orbital and the diene's C2 and C3, together with electrostatic and solvent effects; it is a kinetic preference, typically worth a few kilojoules per mole.
- **Regioselectivity (the "*ortho*–*para*" rule, empirical).** A 1-substituted diene and a monosubstituted dienophile give mainly the "*ortho*" (1,2-disubstituted) cyclohexene; a 2-substituted diene gives mainly the "*para*" (1,4) product. FMO theory explains this: the atoms with the largest HOMO and LUMO coefficients bond preferentially, and a donor at C1 of the diene enlarges the HOMO coefficient at C4, while an acceptor on the dienophile enlarges the LUMO coefficient at its β-carbon.

::: example Cyclopentadiene and maleic anhydride {#ex-endo}
Describe the Diels–Alder reaction of cyclopenta-1,3-diene with maleic anhydride (furan-2,5-dione): the electron movements, the stereochemistry of the product, and why the endo adduct is formed.
::: solution
**Electron movement.** In one concerted step: the C=C π electrons of maleic anhydride form a σ bond to C1 of cyclopentadiene; the C1=C2 π electrons of the diene shift to form a C2=C3 π bond; and the C3=C4 π electrons form a σ bond from C4 to the other alkene carbon of the anhydride. The cyclopentadiene's $\mathrm{CH_2}$ (C5) becomes a one-carbon bridge.

**Product.** *cis*-5-Norbornene-2,3-dicarboxylic anhydride (3a,4,7,7a-tetrahydro-4,7-methano-2-benzofuran-1,3-dione). The two carbonyl groups were *cis* on the dienophile and remain *cis* (suprafacial addition). They can point either towards the two-carbon C=C bridge of the product (endo — under the diene in the transition state) or towards the one-carbon $\mathrm{CH_2}$ bridge (exo). The reaction gives essentially only the **endo** adduct at room temperature.

**Why endo.** In the endo transition state the anhydride's C=O π orbitals lie beneath C2 and C3 of the diene, where the diene HOMO has substantial coefficients; these secondary interactions (no new bonds are formed there) lower the endo transition state. The exo adduct is thermodynamically slightly more stable, and on prolonged heating — when the reaction becomes reversible (retro-Diels–Alder) — the proportion of exo product increases: a textbook case of kinetic versus thermodynamic control ([[organic-synthesis/carbon-carbon-bonds#prop-control]]). The atom economy is $100\,\%$. Cyclopentadiene is flammable and maleic anhydride is corrosive and a respiratory sensitiser, so the experiment, a common teaching preparation, is done in a fume cupboard under supervision.
:::
:::

::: widget plot
f: 100/(1 + exp(-1000*g/(8.314*x)))
x: 150, 450
y: 50, 100
sliders: g=4:0.5:12:0.1
labels: \text{endo product (\%)}
vlines: 195; 298
caption: Percentage of endo adduct under kinetic control against temperature (K), for an endo preference $\Delta\Delta G^\ddagger = g$ (in $\mathrm{kJ\,mol^{-1}}$), from $[\mathrm{endo}]/[\mathrm{exo}] = \exp(\Delta\Delta G^\ddagger/RT)$. With $g = 4$ the endo adduct is $83\,\%$ at $298\ \mathrm{K}$ and $92\,\%$ at $195\ \mathrm{K}$ (the vertical lines). Lewis-acid catalysis typically raises $g$ and allows the reaction to be run cold — the two reasons catalysed Diels–Alder reactions are so selective. At high temperature the curve is no longer the whole story: the retro-Diels–Alder reaction sets in and the mixture drifts towards the thermodynamic (usually exo) ratio.
:::

::: example Regio- and stereochemistry together {#ex-regio}
Predict the major product of (*E*)-1-methoxybuta-1,3-diene with propenal (acrolein).
::: solution
**Regiochemistry.** The methoxy donor at C1 of the diene raises its HOMO and makes the coefficient at C4 the largest. The aldehyde acceptor lowers the dienophile LUMO and makes its largest coefficient the terminal $\mathrm{CH_2}$ (the β-carbon). The large–large interaction joins diene C4 to the dienophile $\mathrm{CH_2}$, so the other new bond joins diene C1 (bearing OMe) to the carbon bearing CHO: the "*ortho*" product, **2-methoxycyclohex-3-ene-1-carbaldehyde**, with OMe and CHO on adjacent carbons.

**Stereochemistry.** The (*E*)-methoxy group is an "outside" substituent on the diene; endo approach of the aldehyde places the CHO group on the same side as the outside substituent at C1, so the major product is the ***cis*** isomer (racemic, since both reactants are achiral). Lewis-acid catalysis increases both regio- and endo-selectivity. Asymmetric versions use chiral Lewis acids or organocatalysts ([[organic-synthesis/stereoselective-synthesis]]).
:::
:::

Variants extend the reaction widely: **Danishefsky's diene** (1-methoxy-3-trimethylsilyloxybuta-1,3-diene, 1974) gives cyclohexenones after hydrolysis; **hetero-Diels–Alder** reactions with carbonyl or imine dienophiles make dihydropyrans and tetrahydropyridines; **intramolecular** Diels–Alder reactions build two rings at once; and **inverse electron demand** reactions pair electron-poor dienes (1,2,4,5-tetrazines) with electron-rich or strained dienophiles, a reaction now used for labelling biomolecules. The closely related **1,3-dipolar cycloadditions** (Rolf Huisgen, 1960s) of azides, nitrile oxides, nitrones and diazo compounds with alkenes and alkynes give five-membered heterocycles; the copper(I)-catalysed azide–alkyne cycloaddition (Valery Fokin and K. Barry Sharpless; Morten Meldal, 2002) is the prototype of "click chemistry" (Nobel Prize 2022, with Carolyn Bertozzi). Low-molecular-mass organic azides are potentially explosive and are handled only in small amounts, in solution, with a risk assessment.

## The Woodward–Hoffmann rules {#sec-wh}

The FMO argument can be stated as one rule covering all pericyclic reactions.

::: proposition The generalised Woodward–Hoffmann rule {#prop-wh}
Decompose the reacting system into components (π bonds, σ bonds, lone pairs), each reacting suprafacially or antarafacially. A **thermal** pericyclic reaction is symmetry-allowed if the total number of $(4q + 2)_\mathrm{s}$ and $(4r)_\mathrm{a}$ components is **odd**; a **photochemical** reaction (first excited state) is allowed if this number is **even**. Here $q, r = 0, 1, 2, \ldots$ and the subscript counts electrons in the component. Allowed means that the reaction can proceed through a concerted transition state without a symmetry-imposed barrier; it does not mean the reaction is fast.
:::

::: proof Justification via aromatic transition states
An equivalent formulation (Howard Zimmerman and Michael Dewar, 1966) treats the cyclic array of orbitals in the transition state as a ring. If the basis orbitals can be chosen with an even number of phase inversions (sign changes) between neighbours round the ring — a **Hückel** array — the array is stabilised ("aromatic") when it contains $4q + 2$ electrons; if the number of phase inversions is odd — a **Möbius** array — it is stabilised with $4q$ electrons, by the Hückel-type calculation for a ring with one negative resonance integral. An antarafacial component introduces one phase inversion into the array (its two ends bond on opposite faces of the orbital), a suprafacial one none. A thermal reaction is allowed when its transition state is aromatic in the ground state. Counting cases: an all-suprafacial array (Hückel) of $N$ electrons is aromatic if $N = 4q + 2$, i.e. if the number of $(4q+2)_\mathrm{s}$ components is odd (a sum of components is $4q + 2$ precisely when the number of $(4q+2)$ components among $(4q)$ and $(4q+2)$ ones is odd). Each antarafacial component switches Hückel ↔ Möbius and so swaps the role of $4q$ and $4q + 2$; counting $(4r)_\mathrm{a}$ components together with $(4q+2)_\mathrm{s}$ components keeps the parity criterion intact. In the first excited state, the stabilisation pattern is reversed (one electron occupies the former LUMO), so the parity condition flips. $\blacksquare$
:::

### Electrocyclic reactions

In an electrocyclic ring closure the termini of a polyene rotate to bring their p orbitals end-on. They can rotate in the same sense (**conrotatory**, one component in the WH analysis antarafacial) or in opposite senses (**disrotatory**, suprafacial). The rule [[#prop-wh]] gives:

| π electrons | thermal | photochemical |
|---|---|---|
| $4q$ (4, 8 …) | conrotatory | disrotatory |
| $4q + 2$ (2, 6 …) | disrotatory | conrotatory |

The FMO picture is direct: the termini of the HOMO must rotate so that lobes of the same sign meet. For hexatriene (HOMO $\psi_3$, termini in phase), disrotation brings like lobes together; for butadiene (HOMO $\psi_2$, termini out of phase), conrotation does. Photoexcitation makes $\psi_{k+1}$ the HOMO, reversing the phase relationship and the mode.

::: example Electrocyclic stereochemistry {#ex-electrocyclic}
Predict the product of (a) heating (2*E*,4*Z*,6*E*)-octa-2,4,6-triene; (b) irradiating it; (c) heating *cis*-3,4-dimethylcyclobut-1-ene.
::: solution
(a) Six π electrons, thermal: **disrotatory**. The two terminal methyl groups are both "outside" (*E*); disrotation turns them both up (or both down), so they end up on the same face: ***cis*-5,6-dimethylcyclohexa-1,3-diene**.

(b) Photochemical, six electrons: **conrotatory**. One terminus turns clockwise, the other also clockwise; one methyl goes up, the other down: ***trans*-5,6-dimethylcyclohexa-1,3-diene**.

(c) Cyclobutene ring opening is the reverse of a four-electron closure: thermal, **conrotatory**. In the *cis* isomer both methyls are on the same face; conrotation turns one outward and one inward, giving **(2*E*,4*Z*)-hexa-2,4-diene** — and never the (*E*,*E*) or (*Z*,*Z*) isomers, which would require disrotation. *trans*-3,4-Dimethylcyclobutene opens to the (*E*,*E*)-diene, with both methyls rotating outward (an inward rotation would cause severe steric clash, a refinement called torquoselectivity).
:::
:::

The **Nazarov cyclisation** (a divinyl ketone, activated by a Lewis or Brønsted acid, closes to a cyclopentenone) is a four-electron conrotatory electrocyclisation of a pentadienyl cation. A beautiful natural example is the formation of **vitamin D₃** in the skin: ultraviolet light opens the B ring of 7-dehydrocholesterol by a photochemical six-electron conrotatory ring opening, giving previtamin D₃, which then undergoes a thermal $[1,7]$-hydrogen shift to vitamin D₃.

### Sigmatropic rearrangements

In a sigmatropic $[i, j]$ shift a σ bond flanked by π systems moves to a new position. Applying [[#prop-wh]]:

- **$[1,5]$-Hydrogen shifts** (six electrons) are thermally allowed suprafacially — the hydrogen moves across one face of the π system — and are observed in cyclopentadienes, whose substituents "walk" around the ring at room temperature. $[1,3]$- and $[1,7]$-hydrogen shifts would have to be antarafacial: impossible geometrically for $[1,3]$, possible for the flexible $[1,7]$ (as in vitamin D formation).
- **$[3,3]$ Shifts** (six electrons, suprafacial on both allyl fragments) are thermally allowed. The **Cope rearrangement** converts a hexa-1,5-diene into an isomeric hexa-1,5-diene; the **Claisen rearrangement** converts an allyl vinyl ether into a γ,δ-unsaturated carbonyl compound (the formation of the C=O bond makes it essentially irreversible), and an allyl aryl ether into a 2-allylphenol.

The $[3,3]$ shift usually proceeds through a **chair-like** transition state, like cyclohexane, which allows the geometry of the starting alkenes to be translated predictably into the configuration of the new stereocentres. Variants of great synthetic value include the **oxy-Cope** rearrangement of 1,5-dien-3-ols, accelerated by factors of $10^{10}$–$10^{17}$ when the alcohol is deprotonated with potassium hydride and 18-crown-6 (the **anionic oxy-Cope**, David Evans and Andrew Golob, 1975), the **Johnson–Claisen** (allylic alcohol + triethyl orthoacetate) and the **Ireland–Claisen** (silyl ketene acetal of an allylic ester) rearrangements.

::: example The aromatic Claisen rearrangement {#ex-claisen}
Describe the conversion of allyl phenyl ether into 2-allylphenol on heating, naming each electron movement, and explain why the allyl group is attached through its former terminal carbon.
::: solution
**Step 1: $[3,3]$ shift.** In a single concerted step through a six-membered (chair-like or boat-like) transition state containing O, the allyl group's three carbons and two ring carbons: the π electrons of the allyl C=C (between the central carbon and the terminal $\mathrm{CH_2}$) form a new σ bond from that terminal carbon to the *ortho* ring carbon; the ring π electrons between the *ortho* carbon and the oxygen-bearing ring carbon move to form a C=O π bond; and the electrons of the O–$\mathrm{CH_2}$ σ bond move to form a new C=C π bond between the former O–$\mathrm{CH_2}$ carbon and the central allyl carbon. The product is 6-allylcyclohexa-2,4-dien-1-one, a non-aromatic dienone.

**Step 2: tautomerisation.** The *ortho* C–H (on the $sp^3$ carbon that now carries the allyl group) is lost as a proton, its electrons forming a ring C=C; the C=O π electrons move onto oxygen, which is protonated. Aromaticity is restored, giving 2-allylphenol.

**Allylic inversion.** Because the new C–C bond forms at the allyl terminus remote from oxygen (C3 of the allyl group), a label on that carbon ends up bonded to the ring — exactly the evidence, together with the absence of crossover products, that established the concerted mechanism ([[organic-synthesis/mechanism-determination]]). If both *ortho* positions are blocked, the dienone undergoes a second (Cope) $[3,3]$ shift to the *para* position.
:::
:::

::: algorithm Applying the Woodward–Hoffmann rules {#alg-wh}
1. **Classify** the reaction (cycloaddition, electrocyclic, sigmatropic, ene) and **count** the electrons in each component.
2. **Choose the geometry** you want to test (suprafacial or antarafacial for each component; conrotatory or disrotatory for an electrocyclic reaction).
3. **Count** the $(4q + 2)_\mathrm{s}$ and $(4r)_\mathrm{a}$ components. Odd: thermally allowed; even: photochemically allowed ([[#prop-wh]]). Equivalently, check the terminal phases of the frontier orbitals ([[#prop-huckel]]).
4. **Check that the allowed geometry is achievable**: antarafacial bonding across short π systems (a $[1,3]$-H shift, a $[2s + 2a]$ alkene dimerisation) is usually too strained, and the allowed path is then inaccessible.
5. **Predict the stereochemistry** from the allowed geometry (endo/exo, con/dis, chair/boat), and refine with steric arguments.
:::

::: quiz
Which of these pericyclic reactions are thermally allowed in the geometry stated?
- [x] Disrotatory ring closure of a hexatriene
- [x] A suprafacial $[1,5]$-hydrogen shift
- [ ] A suprafacial–suprafacial $[2+2]$ cycloaddition of two alkenes
- [ ] Disrotatory ring opening of a cyclobutene
::: solution
Hexatriene (6 electrons, one $(4q+2)_\mathrm{s}$ component when disrotatory): odd, allowed. $[1,5]$-H suprafacial: 6 electrons in the π component plus the σ bond, analysed as $[\sigma 2_\mathrm{s} + \pi 4_\mathrm{s}]$: one $(4q+2)_\mathrm{s}$ component, allowed. $[2_\mathrm{s} + 2_\mathrm{s}]$: two $(4q+2)_\mathrm{s}$ components, even — photochemical only. Cyclobutene opening is a 4-electron electrocyclic reaction, thermally conrotatory, so disrotatory is forbidden.
:::
:::

::: warning "Forbidden" is not "impossible", and "allowed" is not "fast" {#warn-forbidden}
The Woodward–Hoffmann rules concern **concerted** pathways. A "forbidden" product can still form by a stepwise route: ketenes and electron-poor alkenes undergo thermal [2+2] cycloadditions through a twisted, antarafacial-on-ketene geometry or via zwitterions; tetrafluoroethene dimerises via a diradical; and transition metals catalyse formally forbidden reactions (alkene metathesis proceeds via metallacyclobutanes, [[organometallics-catalysis/metathesis-polymerisation]]). Conversely, an "allowed" reaction may be slow because of a large barrier from strain, steric hindrance or poor orbital energy match — butadiene and ethene need $165\ ^\circ\mathrm{C}$ and high pressure. The rules predict the stereochemistry of concerted reactions superbly; they do not predict rates. And the endo rule is a kinetic tendency, not a law: many Diels–Alder reactions, especially intramolecular ones, are exo-selective.
:::

::: history
Otto Diels and Kurt Alder described the diene synthesis in 1928 (Nobel Prize 1950), and Alder formulated the endo rule in 1937. Ludwig Claisen reported the rearrangement of allyl vinyl and allyl aryl ethers in 1912, and Arthur Cope the all-carbon version in 1940. Kenichi Fukui introduced frontier-orbital reactivity indices in 1952. Woodward's work on the stereochemistry of electrocyclic steps in the synthesis of vitamin B₁₂ led to his collaboration with Roald Hoffmann, who calculated the orbital correlations; their first paper, "Stereochemistry of electrocyclic reactions", appeared in the *Journal of the American Chemical Society* in 1965, and their review *The Conservation of Orbital Symmetry* in 1969–70. Howard Zimmerman and Michael Dewar independently proposed the Hückel–Möbius aromatic transition-state formulation in 1966. Fukui and Hoffmann shared the 1981 Nobel Prize in Chemistry; Woodward had died in 1979.
:::

## Where this leads

Asymmetric Diels–Alder reactions and Claisen rearrangements controlled by chiral auxiliaries and catalysts are part of [[organic-synthesis/stereoselective-synthesis]], and Diels–Alder steps and $[3,3]$ shifts appear as key bond-forming events in many syntheses in [[organic-synthesis/total-synthesis]] — including Woodward's own. The Diels–Alder retron (a cyclohexene) and the reconnection of 1,6-dicarbonyl compounds were introduced in [[organic-synthesis/retrosynthesis]]. The orbital theory behind the rules is developed in [[quantum-chemistry/huckel-theory]], and photochemical pericyclic reactions in [[kinetics/photochemistry]].

::: summary
- Pericyclic reactions are concerted, with a cyclic transition state; classes: cycloadditions $[m+n]$, electrocyclic reactions, sigmatropic shifts $[i,j]$, ene and cheletropic reactions.
- Hückel orbitals of a linear polyene: $E_k = \alpha + 2\beta\cos(k\pi/(n+1))$, $c_{jk} \propto \sin(jk\pi/(n+1))$; HOMO termini alternate between in phase and out of phase with the number of electron pairs.
- Woodward–Hoffmann: thermal reactions are allowed when the number of $(4q+2)_\mathrm{s}$ plus $(4r)_\mathrm{a}$ components is odd, photochemical when even; thermal electrocyclic reactions are conrotatory for $4q$ and disrotatory for $4q+2$ electrons.
- The Diels–Alder reaction ($[4s+2s]$) needs an s-*cis* diene, is fastest with an electron-rich diene and electron-poor dienophile, is stereospecific (suprafacial), usually endo-selective (kinetic, empirical) and "*ortho*/*para*" regioselective.
- $[3,3]$ shifts (Cope, Claisen, oxy-Cope, Ireland–Claisen) go through chair-like transition states and transfer stereochemistry predictably; suprafacial $[1,5]$-H shifts are thermally allowed.
- "Allowed" refers to concerted pathways; it predicts stereochemistry, not rate.
:::

## Exercises

::: exercise The hexatriene HOMO {level=1 check="0.445"}
Using [[#eq-huckel]], the HOMO of hexa-1,3,5-triene has energy $\alpha + x\beta$. Find $x$. (Enter $x$ to three significant figures.)
::: solution
$n = 6$, six π electrons fill $k = 1, 2, 3$; the HOMO is $k = 3$: $x = 2\cos(3\pi/7) = 2 \times 0.2225 = 0.445$.
:::
:::

::: exercise Classify the reaction {level=1}
Classify each as a cycloaddition, electrocyclic reaction or sigmatropic rearrangement, with its $[m+n]$ or $[i,j]$ label where appropriate: (a) furan + maleimide → oxanorbornene adduct; (b) cyclohexa-1,3-diene ⇌ (*Z*)-hexa-1,3,5-triene; (c) allyl vinyl ether → pent-4-enal; (d) 5-methylcyclopenta-1,3-diene → 1-methylcyclopenta-1,3-diene.
::: solution
(a) $[4+2]$ cycloaddition (Diels–Alder). (b) Six-electron electrocyclic ring opening/closure. (c) $[3,3]$ sigmatropic rearrangement (Claisen). (d) $[1,5]$ sigmatropic hydrogen shift (suprafacial).
:::
:::

::: exercise Stereospecificity {level=1}
Predict the relative configuration of the ester groups in the Diels–Alder adducts of buta-1,3-diene with (a) dimethyl maleate and (b) dimethyl fumarate.
::: solution
Suprafacial addition retains the dienophile configuration. (a) Maleate (*cis*) gives dimethyl ***cis***-cyclohex-4-ene-1,2-dicarboxylate (*meso*). (b) Fumarate (*trans*) gives the ***trans*** diester (racemic).
:::
:::

::: exercise Electrocyclic predictions {level=2}
Predict the product of (a) irradiating (2*E*,4*Z*)-hexa-2,4-diene to form a cyclobutene; (b) heating *trans*-3,4-dimethylcyclobut-1-ene; (c) heating (2*E*,4*Z*,6*Z*)-octa-2,4,6-triene.
::: solution
(a) Four electrons, photochemical: disrotatory. Disrotation carries the two "outside" positions to the same face of the new ring (and the two "inside" positions to the other face). Here one methyl is outside (*E*) and one inside (*Z*), so they end up on opposite faces: ***trans*-3,4-dimethylcyclobutene**. (Check: the thermal, conrotatory closure of the same diene would give the *cis* isomer, the reverse of [[#ex-electrocyclic]](c).) (b) Thermal 4-electron opening: conrotatory; both methyls rotate outward: **(2*E*,4*E*)-hexa-2,4-diene**. (c) Six electrons, thermal: disrotatory; one methyl outside, one inside; disrotation puts them on opposite faces: ***trans*-5,6-dimethylcyclohexa-1,3-diene**.
:::
:::

::: exercise Counting components {level=2}
Use [[#prop-wh]] to decide whether each is thermally allowed: (a) $[\pi 4_\mathrm{s} + \pi 2_\mathrm{s}]$; (b) $[\pi 2_\mathrm{s} + \pi 2_\mathrm{a}]$; (c) $[\sigma 2_\mathrm{s} + \pi 2_\mathrm{s}]$ for a suprafacial $[1,3]$-H shift; (d) $[\pi 6_\mathrm{s} + \pi 4_\mathrm{s}]$.
::: solution
(a) One $(4q+2)_\mathrm{s}$ (the $2_\mathrm{s}$; $4_\mathrm{s}$ does not count): odd → allowed. (b) $2_\mathrm{s}$ counts, $2_\mathrm{a}$ does not (it is $(4q+2)_\mathrm{a}$): one → allowed in principle, but geometrically very difficult for alkenes (it is how ketenes react). (c) Two $(4q+2)_\mathrm{s}$: even → forbidden; the allowed antarafacial version is geometrically impossible, so thermal $[1,3]$-H shifts are not observed. (d) $6_\mathrm{s}$ counts, $4_\mathrm{s}$ does not: one → allowed (observed, for example, between tropone and cyclopentadiene).
:::
:::

::: exercise Endo:exo ratio {level=2 check="5.0"}
In a Diels–Alder reaction the endo transition state is $4.0\ \mathrm{kJ\,mol^{-1}}$ lower in Gibbs energy than the exo transition state. What endo:exo ratio is expected at $298.15\ \mathrm{K}$ under kinetic control? (Enter $x$ in $x$:1, to two significant figures.)
::: solution
Ratio $= \exp(\Delta\Delta G^\ddagger/RT) = \exp(4000/(8.314 \times 298.15)) = \exp(1.614) = 5.0$ ([[organic-synthesis/carbon-carbon-bonds#prop-control]]). A Lewis-acid catalyst that enhances the secondary orbital interactions can raise this to 20:1 or more, and running the reaction colder increases it further.
:::
:::

::: exercise Hückel orbitals of butadiene {level=3}
Write the secular determinant for buta-1,3-diene in the Hückel approximation and solve it to obtain the four energies. Find the coefficients of the HOMO and show that its terminal coefficients have opposite signs. Use the result to explain why the thermal ring closure of butadiene to cyclobutene must be conrotatory.
::: hint
Put $x = (\alpha - E)/\beta$; the determinant is a quartic in $x$ that factorises as a quadratic in $x^2$.
:::
::: solution
With $x = (\alpha - E)/\beta$, the determinant of the tridiagonal matrix with $x$ on the diagonal and $1$ for neighbours is $x^4 - 3x^2 + 1 = 0$, so $x^2 = (3 \pm \sqrt5)/2$ and $x = \pm 1.618, \pm 0.618$. Since $E = \alpha - x\beta$ and $\beta < 0$, the energies in increasing order are $\alpha + 1.618\beta$, $\alpha + 0.618\beta$, $\alpha - 0.618\beta$, $\alpha - 1.618\beta$, as [[#eq-huckel]] gives. For the HOMO ($E = \alpha + 0.618\beta$, $x = -0.618$): the equations $xc_1 + c_2 = 0$ and $c_1 + xc_2 + c_3 = 0$ give $c_2 = 0.618c_1$, $c_3 = -c_1 - xc_2 = -c_1 + 0.382c_1 = -0.618c_1$, and by symmetry $c_4 = -c_1$. Normalising: $c = (0.602, 0.372, -0.372, -0.602)$. The terminal coefficients have opposite signs. To form a σ bond between C1 and C4, lobes of the same sign must overlap; since the top lobe at C1 is positive and the top lobe at C4 negative, the termini must rotate in the same sense (conrotation), bringing the positive top lobe of C1 to meet the positive bottom lobe of C4. Disrotation would bring lobes of opposite sign together (antibonding), so it is thermally forbidden.
:::
:::

::: exercise An anionic oxy-Cope rearrangement {level=3}
3-Methylhexa-1,5-dien-3-ol is treated with potassium hydride and 18-crown-6 in THF, and the mixture is worked up with aqueous ammonium chloride. Identify the product, describe each electron movement, and explain the role of the crown ether.
::: hint
Number the diene C1 to C6, with OH and methyl on C3. Which bond breaks, and which forms?
:::
::: solution
**Deprotonation.** Hydride removes the O–H proton ($\mathrm{H_2}$ is evolved), giving the potassium alkoxide; 18-crown-6 binds $\mathrm{K^+}$ tightly, leaving a "naked", highly electron-rich alkoxide. **$[3,3]$ Shift.** In a chair-like six-membered transition state, three electron pairs move at once: the C1=C2 π electrons form the new C1–C6 σ bond; the C5=C6 π electrons shift to form a new C4=C5 π bond; and the C3–C4 σ bond breaks, its electrons forming a C2=C3 π bond. Because C3 carries $\mathrm{O^-}$, the C2=C3 bond is part of an **enolate**. The alkoxide oxygen's electron donation weakens the C3–C4 bond in the transition state, which is the origin of the enormous ($10^{10}$–$10^{17}$) rate acceleration; tightly ion-paired potassium (no crown) reduces it. **Work-up.** Protonation of the enolate on carbon (C2) gives the ketone. The product is $\mathrm{CH_3CO{-}CH_2CH_2CH_2{-}CH{=}CH_2}$: **hept-6-en-2-one**. The reaction converts a readily made tertiary allylic alcohol (from addition of allylmagnesium bromide to but-3-en-2-one) into a δ,ε-unsaturated ketone with a new C–C bond, and is irreversible because the enolate is much more stable than the alkoxide.
:::
:::
