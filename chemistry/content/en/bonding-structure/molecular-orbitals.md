Pour liquid oxygen between the poles of a strong magnet and it does not fall: the pale blue liquid *hangs*, caught in the gap, held by a force that has nothing to do with gravity and everything to do with electrons. A magnet repels most liquids; oxygen is pulled *in*. Now consult the Lewis structure of $\mathrm{O_2}$, drawn in [[bonding-structure/covalent-lewis]] with a double bond and two lone pairs on each oxygen: every electron is paired, and a molecule with all electrons paired is *diamagnetic* — weakly repelled by magnets. The drawing predicts the opposite of what the beaker does. Two further facts bite just as hard. The helium dimer, $\mathrm{He_2}$, does not exist: helium is monatomic, and no amount of cooling makes $\mathrm{He_2}$ molecules in any ordinary sense. Yet $\mathrm{He_2^+}$ — the same two nuclei and one *fewer* electron — is a genuine, bound molecule, with a dissociation energy of $2.8\ \mathrm{eV}$ ($\approx 270\ \mathrm{kJ\,mol^{-1}}$, standard tabulated data). And $\mathrm{H_2^+}$ binds two protons with a *single* electron, something no electron-pair picture can even describe. Each of these failures has the same root: Lewis structures and the localised electron pairs of [[bonding-structure/valence-bond]] insist that electrons belong to *atoms* or to *bonds between two atoms*. **Molecular orbital theory** takes the opposite view: in a molecule, the one-electron states belong to the *whole molecule*, spread over all its nuclei at once. Developed in 1932 by Friedrich Hund and Robert S. Mulliken (Mulliken's Nobel Prize followed in 1966), the theory explains all three puzzles in a few lines of electron bookkeeping — and hands you the single most useful vocabulary in chemistry since the octet: the HOMO and the LUMO.

## Molecular orbitals: electrons that belong to the whole molecule

Start from the one thing you already trust: in an atom, electrons occupy orbitals — one-electron wavefunctions with definite energies, filled two by two according to Pauli's principle, exactly as in [[general-chemistry-1/quantum-atom]]. A molecule is not an atom, but it is also a set of electrons moving in the field of *several* nuclei, and the Schrödinger equation for $\mathrm{H_2^+}$ — one electron, two protons — can be solved to excellent accuracy without any new physics. Its solutions are orbitals of the whole molecule: the electron is not "on" either proton; its wavefunction surrounds both. The success of the exact $\mathrm{H_2^+}$ solution suggests a strategy for everything harder: give each electron an orbital of the entire molecule, and fill those orbitals by the rules you already know.

::: definition Molecular orbitals, LCAO, bonding and antibonding {#def-mo-lcao}
A **molecular orbital (MO)** is a one-electron wavefunction extending over an entire molecule; the electrons of the molecule occupy the MOs, two per orbital with opposite spins, exactly as atoms fill atomic orbitals. In the **LCAO** approximation (linear combination of atomic orbitals) each MO is built as a sum of atomic orbitals, $\psi = \sum_i c_i \phi_i$. When two atomic orbitals combine, they give exactly two molecular orbitals:

- a **bonding MO**, the *sum* $\psi_+ = \psi_\mathrm{A} + \psi_\mathrm{B}$: constructive interference *increases* electron density between the nuclei, and the orbital lies *below* the parent atomic orbitals in energy;
- an **antibonding MO**, the *difference* $\psi_- = \psi_\mathrm{A} - \psi_\mathrm{B}$, starred ($\sigma^*$, $\pi^*$): destructive interference creates a **nodal plane between the nuclei**, drains density from the bonding region, and the orbital lies *above* the parents in energy.

MOs are labelled by their symmetry about the bond axis: **$\sigma$** orbitals are cylindrically symmetric (made from s–s, s–p and head-on p–p overlap) and **$\pi$** orbitals have one nodal plane containing the axis (side-on p–p overlap); $\sigma$ overlap is stronger than $\pi$ overlap, so bonding $\sigma$ orbitals are lowered more than bonding $\pi$ orbitals, and antibonding $\sigma^*$ raised more than $\pi^*$. In *homonuclear* diatomics every MO is additionally labelled **g** (*gerade*, unchanged by inversion through the bond centre) or **u** (*ungerade*, changing sign): the names you will meet all lesson — $\sigma_\mathrm{g}(2s)$, $\sigma_\mathrm{u}^*(2s)$, $\pi_\mathrm{u}(2p)$, $\sigma_\mathrm{g}(2p)$, $\pi_\mathrm{g}^*(2p)$, $\sigma_\mathrm{u}^*(2p)$ — read off exactly this grammar.
:::

The pattern — two waves coupling to give one lower and one higher state — is not chemical at all; it is the same mathematics as two coupled pendulums or the particle-in-a-box solutions of [[quantum-chemistry/model-systems]]. Two atomic orbitals, two molecular orbitals: the number is conserved, and that bookkeeping fact is as load-bearing as anything that follows. The figure below shows the two combinations of two 1s-like orbitals sitting on nuclei $1.6$ units apart, with the probability densities that decide everything.

::: widget plot
f: (exp(-x^2)+exp(-(x-1.6)^2))*(exp(-x^2)+exp(-(x-1.6)^2)); (exp(-x^2)-exp(-(x-1.6)^2))*(exp(-x^2)-exp(-(x-1.6)^2))
x: -1.5, 3.1
labels: \text{bonding } \sigma_\mathrm{g} \text{ density } (\psi_\mathrm{A}+\psi_\mathrm{B})^2; \text{antibonding } \sigma_\mathrm{u}^{*} \text{ density } (\psi_\mathrm{A}-\psi_\mathrm{B})^2
caption: Probability densities of the bonding and antibonding combinations of two 1s-like orbitals centred at $x = 0$ and $x = 1.6$ (the nuclei). Look first at the *bonding* curve: between the nuclei it rises well above the two separated humps — the shared electron density sits in the region where both nuclei attract it, pulling the nuclei together. Now look at the *antibonding* curve: exactly halfway between the nuclei it is pinned to zero by a nodal plane, and the density has been pushed out to the outer faces, where it screens the nuclei from each other and lets them repel. One electron in the lower curve binds $\mathrm{H_2^+}$; one electron in the upper curve actively destabilises the pair. Everything else in this chapter is a consequence of these two shapes.
:::

How do we know the antibonding combination really costs energy, rather than merely looking different? The answer is a short calculation worth doing once in full, because it converts the pictures above into a theorem you can lean on.

::: proof Normalisation of the LCAO combinations, and why the node costs energy {#proof-lcao-normalisation}
Let $\psi_\mathrm{A}$ and $\psi_\mathrm{B}$ be normalised atomic orbitals on atoms A and B, and let $S = \int \psi_\mathrm{A}\psi_\mathrm{B}\,\mathrm{d}\tau > 0$ be their **overlap integral** ($S = 0$ far apart, $S \to 1$ as the atoms merge). Require $\int \psi_\pm^2\,\mathrm{d}\tau = 1$ with $\psi_\pm = N_\pm(\psi_\mathrm{A} \pm \psi_\mathrm{B})$:
$$
1 = N_\pm^2 \left( \int \psi_\mathrm{A}^2 + \int \psi_\mathrm{B}^2 \pm 2\int \psi_\mathrm{A}\psi_\mathrm{B} \right) = N_\pm^2\,(2 \pm 2S)
\qquad\Longrightarrow\qquad
\psi_\pm = \frac{\psi_\mathrm{A} \pm \psi_\mathrm{B}}{\sqrt{2(1 \pm S)}} .
$$
Note the asymmetry already: the bonding orbital is *diluted* by $1/\sqrt{2(1+S)}$, the antibonding one *concentrated* by $1/\sqrt{2(1-S)}$, because the difference wave cancels itself somewhere and must compensate elsewhere.

Now the energy. At the midpoint of the bond, $\psi_\mathrm{A} = \psi_\mathrm{B}$ by symmetry, so $\psi_- = 0$: the antibonding combination has a **nodal plane between the nuclei**, while $\psi_+$ has no node between them. A wavefunction forced through zero has large curvature, and curvature is kinetic energy ($\hat{T} = -\hbar^2 2m^{-1} \nabla^2$): confining an electron to a smaller region — which is what a node does — raises its kinetic energy, exactly as the particle-in-a-box levels rise with $n^2$. The potential energy agrees: $\psi_-$ drains electron density from the internuclear region, where an electron is attracted by *both* nuclei at once, and piles it on the outer faces, where it screens the nuclei from each other and leaves the nucleus–nucleus repulsion unscreened. Both terms move the same way, so $\psi_-$ lies above the atomic orbitals and $\psi_+$ below. Quantitatively, with the Coulomb integral $\alpha = \int \psi_\mathrm{A} \hat{H} \psi_\mathrm{A}\,\mathrm{d}\tau < 0$ and the resonance integral $\beta = \int \psi_\mathrm{A} \hat{H} \psi_\mathrm{B}\,\mathrm{d}\tau < 0$,
$$
E_\pm = \frac{\alpha \pm \beta}{1 \pm S},
$$
and because $\beta < 0$ and $S > 0$: $E_+ = (\alpha + \beta)/(1+S) < \alpha$, while $E_- = (\alpha - \beta)/(1-S) > \alpha$. The antibonding orbital is raised *more* than the bonding orbital is lowered — keep this, because it decides what happens when both are filled.
:::

With the pieces defined, the construction of any diagram is a fixed procedure.

::: proposition Rules for building molecular orbital diagrams {#prop-mo-rules}
To construct the MOs of a molecule:

1. **Energy match:** combine only atomic orbitals of similar energy. The $1s$ of one atom pairs with the $1s$ of its partner, not with a $2p$ three shells up.
2. **Symmetry match:** combine only orbitals that overlap net-positively. An s orbital and a p orbital pointing along the bond combine; an s orbital and a p orbital of the wrong orientation overlap equally in + and − regions and combine to *nothing* (zero net overlap).
3. **Conservation of orbitals:** $N$ atomic orbitals give exactly $N$ molecular orbitals — half bonding, half antibonding (for the two-orbital case: one and one).
4. **Filling:** occupy the MOs with the molecule's electrons by the aufbau principle (lowest first), Pauli's principle (two per orbital, opposite spins) and **Hund's rule** (degenerate orbitals — the $\pi_\mathrm{u}$ pair, the $\pi_\mathrm{g}^*$ pair — fill singly and parallel before pairing).
5. **Ordering:** within a set built from the same shell, the $\sigma$ combination is more strongly split than the $\pi$ combinations: $\sigma_\mathrm{g}$ lowest, $\sigma_\mathrm{u}^*$ highest. (The exception — when $\pi_\mathrm{u}(2p)$ falls below $\sigma_\mathrm{g}(2p)$ — is s–p mixing, below.)

For *heteronuclear* diatomics the rules stand, but the lower-energy atomic orbitals (the more electronegative atom) contribute more to the bonding MOs and the less electronegative atom to the antibonding ones — the origin of bond polarity in this language.
:::

## Bond order: counting electrons that bind against electrons that don't

::: proposition Bond order {#prop-bond-order}
The **bond order** of a diatomic molecule is
$$
\text{bond order} = \frac{1}{2}\left( N_\text{bonding} - N_\text{antibonding} \right),
$$
the number of electrons in bonding MOs minus the number in antibonding MOs, halved (each shared *pair* counts as one bond). Bond order measures the net electron glue: an electron in a bonding orbital lowers the energy, an electron in an antibonding orbital raises it, and the bond is what survives of the contest. The larger the bond order, the **shorter and stronger** the bond — verified by standard tabulated data: $\mathrm{N_2}$ has bond order $3$, length $110\ \mathrm{pm}$, dissociation energy $945\ \mathrm{kJ\,mol^{-1}}$, while an N–N *single* bond (as in hydrazine) is about $145\ \mathrm{pm}$ and only $\sim 160\ \mathrm{kJ\,mol^{-1}}$; $\mathrm{O_2}$ has bond order $2$, $121\ \mathrm{pm}$, $498\ \mathrm{kJ\,mol^{-1}}$, between $\mathrm{O_2}$'s values and an O–O single bond ($\sim 148\ \mathrm{pm}$, $\sim 146\ \mathrm{kJ\,mol^{-1}}$). Bond orders can be **fractional** — $\tfrac12$, $\tfrac12$, $1\!\tfrac12$, $2\!\tfrac12$ all occur — which no electron-pair picture allows.
:::

::: example $\mathrm{H_2}$, $\mathrm{H_2^+}$, $\mathrm{He_2^+}$, $\mathrm{He_2}$: existence from arithmetic {#ex-h2-he2-series}
Each of $\mathrm{H_2}$, $\mathrm{H_2^+}$, $\mathrm{He_2^+}$, $\mathrm{He_2}$ puts its electrons in the two MOs made from the two $1s$ orbitals, $\sigma_\mathrm{g}(1s)$ and $\sigma_\mathrm{u}^*(1s)$. Give the bond order and magnetic behaviour of each, and decide which exist.
::: solution
- $\mathrm{H_2}$: two electrons, both in $\sigma_\mathrm{g}$: configuration $(\sigma_\mathrm{g})^2$, bond order $\tfrac12(2-0) = 1$, all paired (diamagnetic). Exists, $436\ \mathrm{kJ\,mol^{-1}}$.
- $\mathrm{H_2^+}$: one electron: $(\sigma_\mathrm{g})^1$, bond order $\tfrac12(1-0) = \tfrac12$, one unpaired electron (paramagnetic). Exists, with $D_0 \approx 2.7\ \mathrm{eV} \approx 260\ \mathrm{kJ\,mol^{-1}}$ (standard tabulated data) — *one* electron in a bonding orbital is enough to bind two protons. Half the bond order, but more than half the bond energy of $\mathrm{H_2}$: the second electron partly cancels the first's binding by electron–electron repulsion.
- $\mathrm{He_2^+}$: three electrons: $(\sigma_\mathrm{g})^2(\sigma_\mathrm{u}^*)^1$, bond order $\tfrac12(2-1) = \tfrac12$, paramagnetic. **Exists** — $2.8\ \mathrm{eV} \approx 270\ \mathrm{kJ\,mol^{-1}}$, long known in mass spectrometers — even though it has *more* electrons than $\mathrm{H_2}$, because one of them sits in the antibonding orbital and cancels half the glue.
- $\mathrm{He_2}$: four electrons: $(\sigma_\mathrm{g})^2(\sigma_\mathrm{u}^*)^2$, bond order $\tfrac12(2-2) = 0$. **No chemical bond.** Because the antibonding orbital is raised more than the bonding one is lowered ([[#proof-lcao-normalisation]]), filling both leaves the pair slightly *above* the separated atoms: helium stays monatomic. (A very weak van der Waals dimer exists at millikelvin temperatures — a different, far feebler mechanism, [[bonding-structure/intermolecular-forces]].)

Two electrons added, one bond order lost, one molecule annihilated: the arithmetic of bonding minus antibonding electrons reproduces the periodic table's least forgiving fact.
:::
:::

## The period-2 homonuclear diatomics — and the s–p mixing switch

For Li$_2$ through $\mathrm{Ne_2}$ the valence shell offers eight atomic orbitals (one $2s$ and three $2p$ on each atom), giving sixteen MOs; only the eight made from the $2s$ and $2p_z$ (the $\sigma$ set) and the four from the $2p_x, 2p_y$ (two degenerate $\pi_\mathrm{u}$ bonding and two $\pi_\mathrm{g}^*$ antibonding) matter for the valence electrons. The naive ordering puts $\sigma_\mathrm{g}(2p)$ below $\pi_\mathrm{u}(2p)$, since $\sigma$ overlap is stronger. Reality splits the period in half, and the reason is a beautiful piece of quantum mechanics.

::: proposition The s–p mixing switch {#prop-sp-mixing}
The $\sigma_\mathrm{g}(2s)$ and $\sigma_\mathrm{g}(2p)$ orbitals have the *same symmetry*, so they are not allowed to coexist peacefully: like two levels of the same symmetry approaching, they **repel and push apart** (mixing between them is strongest when their energies are close). The $\sigma_\mathrm{g}(2p)$ is pushed up, the $\sigma_\mathrm{u}^*(2s)$ pushed down. Across period 2 the $2s$–$2p$ energy separation of the free atoms *increases* left to right (poorly screened $2p$ electrons are pulled in faster than $2s$):

- **$\mathrm{Li_2}$ to $\mathrm{N_2}$:** the $2s$–$2p$ gap is small, mixing is strong, and $\sigma_\mathrm{g}(2p)$ is pushed *above* $\pi_\mathrm{u}(2p)$. Ordering: $\sigma_\mathrm{g}(2s) < \sigma_\mathrm{u}^*(2s) < \pi_\mathrm{u}(2p) < \sigma_\mathrm{g}(2p) < \pi_\mathrm{g}^*(2p) < \sigma_\mathrm{u}^*(2p)$.
- **$\mathrm{O_2}$, $\mathrm{F_2}$:** the gap is large, mixing is weak, and the naive ordering survives: $\sigma_\mathrm{g}(2p) < \pi_\mathrm{u}(2p)$.

The switch is not a detail: it decides which of $\mathrm{B_2}$, $\mathrm{C_2}$, $\mathrm{N_2}$, $\mathrm{O_2}$, $\mathrm{F_2}$ are paramagnetic, and it is the single most common source of wrong electron configurations in this course.
:::

::: example $\mathrm{O_2}$: the triumph — why liquid oxygen hangs in a magnet {#ex-o2-magnetism}
Build the MO diagram of $\mathrm{O_2}$ (12 valence electrons) and predict its magnetic behaviour.
::: solution
Oxygen is on the right of the period, so use the *unmixed* ordering $\sigma_\mathrm{g}(2s) < \sigma_\mathrm{u}^*(2s) < \sigma_\mathrm{g}(2p) < \pi_\mathrm{u}(2p) < \pi_\mathrm{g}^*(2p) < \sigma_\mathrm{u}^*(2p)$. Fill 12 electrons: $(\sigma_\mathrm{g}2s)^2 (\sigma_\mathrm{u}^*2s)^2 (\sigma_\mathrm{g}2p)^2 (\pi_\mathrm{u}2p)^4$ uses 10; the last two go into the degenerate $\pi_\mathrm{g}^*$ pair, and **Hund's rule** puts them in *separate* orbitals with parallel spins: $(\pi_\mathrm{g}^*)^1 (\pi_\mathrm{g}^*)^1$.

Bond order $= \tfrac12(8 - 4) = 2$ — the double bond of Lewis, recovered. But the configuration ends in *two unpaired electrons*: $\mathrm{O_2}$ is **paramagnetic**, and a magnetic field pulls it in. Lewis structures could not have said this; the two-electron-pair picture of [[bonding-structure/valence-bond]] gives all-electrons-paired $\mathrm{O_2}$ and predicts diamagnetism — wrong. Molecular orbital theory *explained* the magnetism of oxygen — observed since 1845, when Faraday found oxygen gas to be strongly attracted into a magnetic field (and, once the gas could be liquefied, that the liquid hangs between the poles), and inexplicable by every electron-pair structure — and the ground state it names (a *triplet*, two parallel spins) is the reason ordinary $\mathrm{O_2}$ is also EPR-active ([[spectroscopy/epr]]) and why its direct reactions with all-paired molecules are spin-slowed. Liquid oxygen hanging between the magnet poles is MO theory's most photographed proof.
:::
:::

::: quiz
Which species is paramagnetic?
- [x] $\mathrm{O_2}$ — its two highest electrons occupy separate, degenerate $\pi_\mathrm{g}^*$ orbitals with parallel spins.
- [ ] $\mathrm{N_2}$ — because its triple bond contains unpaired $\pi$ electrons.
- [ ] Both, because every diatomic molecule has unpaired electrons.
- [ ] Neither; paramagnetism requires a metal atom.
::: solution
$\mathrm{O_2}$ is paramagnetic: filling its diagram leaves one electron in each of the two degenerate $\pi_\mathrm{g}^*$ orbitals, and Hund's rule makes them parallel ([[#ex-o2-magnetism]]). $\mathrm{N_2}$ ends $(\pi_\mathrm{u}2p)^4(\sigma_\mathrm{g}2p)^2$ — every orbital doubly occupied, diamagnetic (the $\pi$ *bonds* of its triple bond are pairs, not singles). Paramagnetism needs unpaired electrons, not metal atoms: $\mathrm{O_2}$, $\mathrm{B_2}$ and $\mathrm{NO}$ are all paramagnetic non-metals.
:::
:::

::: example $\mathrm{N_2}$ and CO: bond order three, and a lone pair with an opinion {#ex-n2-co}
Draw the MO configurations of $\mathrm{N_2}$ (10 valence electrons) and of CO, and interpret their bond lengths ($110$ and $113\ \mathrm{pm}$) and dissociation energies ($945$ and $1076\ \mathrm{kJ\,mol^{-1}}$, standard tabulated data). Why does carbon monoxide bind to the iron of haemoglobin through *carbon*?
::: solution
Nitrogen is on the mixed side: $\pi_\mathrm{u}(2p)$ below $\sigma_\mathrm{g}(2p)$. Ten electrons: $(\sigma_\mathrm{g}2s)^2 (\sigma_\mathrm{u}^*2s)^2 (\pi_\mathrm{u}2p)^4 (\sigma_\mathrm{g}2p)^2$. Bond order $= \tfrac12(8-2) = 3$: the triple bond — one $\sigma$ and two $\pi$ — with all electrons paired (diamagnetic), consistent with $110\ \mathrm{pm}$ and the ferocious $945\ \mathrm{kJ\,mol^{-1}}$ that makes dinitrogen inert.

CO has the same ten valence electrons and is **isoelectronic** with $\mathrm{N_2}$: bond order $3$, $113\ \mathrm{pm}$, and a dissociation energy even *higher* ($1076\ \mathrm{kJ\,mol^{-1}}$, the strongest bond of any common diatomic). The difference is asymmetry: oxygen's lower-energy orbitals dominate the bonding MOs, so the HOMO — the $\sigma$ orbital that Lewis would call carbon's lone pair — has its larger lobe **on carbon**. CO therefore donates that pair to Fe through carbon (with return donation from Fe into the empty $\pi^*$ orbitals, which is why CO binds haem some 200 times more strongly than $\mathrm{O_2}$ does — the same frontier orbitals that make CO a poison).
:::
:::

::: example $\mathrm{B_2}$: paramagnetism as evidence for the switch {#ex-b2-paramagnetism}
Predict the magnetic behaviour of $\mathrm{B_2}$ (6 valence electrons) from the mixed ordering, and explain why the result is evidence *for* s–p mixing.
::: solution
Boron sits at the far left of the switch, where mixing is strongest: $\pi_\mathrm{u}(2p)$ lies *below* $\sigma_\mathrm{g}(2p)$. Six electrons: $(\sigma_\mathrm{g}2s)^2 (\sigma_\mathrm{u}^*2s)^2$ leaves two for the degenerate $\pi_\mathrm{u}(2p)$ pair, and Hund's rule puts them one in each: $(\pi_\mathrm{u})^1(\pi_\mathrm{u})^1$. Bond order $\tfrac12(4-2) = 1$, and — the point — **two unpaired electrons: $\mathrm{B_2}$ is paramagnetic**. Had the naive ordering held, the last two electrons would have paired in $\sigma_\mathrm{g}(2p)$ and $\mathrm{B_2}$ would be diamagnetic. Molecular-beam experiments find the paramagnetic ground state: a six-electron molecule testifies to a two-orbital energy switch. (The same count makes $\mathrm{C_2}$, $(\pi_\mathrm{u})^4$, bond order $2$ and diamagnetic.)
:::
:::

::: example The oxygen series: bond orders $2\tfrac12$, 2, $1\tfrac12$, 1 {#ex-oxygen-series}
$\mathrm{O_2}$, $\mathrm{O_2^+}$, $\mathrm{O_2^-}$ (superoxide) and $\mathrm{O_2^{2-}}$ (peroxide) differ only in electrons added or removed from the frontier $\pi_\mathrm{g}^*$ orbitals. Predict their bond orders and compare with the measured bond lengths $112$, $121$, $128$ and $149\ \mathrm{pm}$ (standard tabulated data).
::: solution
Ionisation and reduction act on the HOMO, the $\pi_\mathrm{g}^*$ pair:

| species | $\pi_\mathrm{g}^*$ electrons | bond order | bond length / pm |
|---|---|---|---|
| $\mathrm{O_2^+}$ | 1 | $\tfrac12(8-3) = 2.5$ | $112$ |
| $\mathrm{O_2}$ | 2 | $\tfrac12(8-4) = 2$ | $121$ |
| $\mathrm{O_2^-}$ | 3 | $\tfrac12(8-5) = 1.5$ | $128$ |
| $\mathrm{O_2^{2-}}$ | 4 | $\tfrac12(8-6) = 1$ | $149$ |

Removing an *antibonding* electron strengthens and shortens the bond ($\mathrm{O_2^+}$: bond order $2.5$, and $D = 643\ \mathrm{kJ\,mol^{-1}}$ against $\mathrm{O_2}$'s $498$); adding antibonding electrons weakens and lengthens it, all the way to the peroxide single bond of $\mathrm{Na_2O_2}$ and the O–O link of $\mathrm{H_2O_2}$. Four species, one orbital, and bond lengths that march in step with a half-integer count — this is the quantitative agreement that made MO theory a theory and not a drawing convention.
:::
:::

::: widget plot
f: 173.7 - 24.7*x
x: 0.75, 2.75
y: 100, 160
points: 1,149; 1.5,128; 2,121; 2.5,112
labels: \text{linear guide}
caption: Bond length of the oxygen species against bond order: peroxide $1$, superoxide $1.5$, dioxygen $2$, dioxygenyl $2.5$ (marked points; the line is a linear guide, not a law). The monotone, near-linear contraction as antibonding electrons are removed is the direct, measurable consequence of [[#prop-bond-order]]: half an electron of glue matters, and it shows up in picometres.
:::

::: warning Three traps in one paragraph {#warn-sp-mixing}
First, the ordering switch: $\mathrm{B_2}$, $\mathrm{C_2}$ and $\mathrm{N_2}$ put $\pi_\mathrm{u}(2p)$ *below* $\sigma_\mathrm{g}(2p)$; $\mathrm{O_2}$ and $\mathrm{F_2}$ reverse it ([[#prop-sp-mixing]]). Exams are built on this seam — decide which side of the switch you are on *before* you fill a single arrow. Second, MO theory does not abolish the octet, it **re-derives** it: for $\mathrm{O_2}$, $\mathrm{N_2}$ and friends the bonding MOs of the valence shell number exactly four orbitals, and eight electrons fill them — Lewis's eight, promoted from bookkeeping to theorem (with the same honest exceptions: odd-electron molecules simply have an odd count). Third, "antibonding occupied" is not "bond broken": $\mathrm{He_2^+}$ has an antibonding electron and still exists, and $\mathrm{O_2}$ carries two. An antibonding electron *cancels half a bond*, nothing more — bond order counts the net, and only bond order $0$ means no bond.
:::

## HOMO and LUMO: where chemistry happens

::: definition Frontier orbitals: HOMO and LUMO {#def-homo-lumo}
The **highest occupied molecular orbital (HOMO)** is the orbital holding the molecule's most weakly bound electrons; the **lowest unoccupied molecular orbital (LUMO)** is the empty orbital closest to them. Together they are the **frontier orbitals**. The HOMO is where electrons leave from: the first ionisation energy is (to the approximation of Koopmans' theorem) minus the HOMO energy — which is why ionising $\mathrm{O_2}$ removes an antibonding $\pi_\mathrm{g}^*$ electron and *strengthens* the bond ([[#ex-oxygen-series]]). The LUMO is where electrons arrive when a molecule is reduced or attacked by a nucleophile, and the HOMO–LUMO gap is the energy of the molecule's first electronic absorption — the origin of colour, taken up in [[spectroscopy/electronic-spectroscopy]].
:::

The frontier vocabulary repays its small cost many times over. $\mathrm{N_2}$'s HOMO is a $\sigma_\mathrm{g}$ orbital held tightly between the two nitrogens, deep in energy and hard to donate, which is one reason dinitrogen is inert; CO's HOMO is the carbon-weighted $\sigma$ of [[#ex-n2-co]], which is one reason CO is not. The $\pi^*$ LUMOs of an alkene or a carbonyl are the targets nucleophiles aim at; the small HOMO–LUMO gap of iodine, $\mathrm{I_2}$, puts its first absorption in the visible and the vapour purple, while the huge gap of $\mathrm{N_2}$ pushes its absorptions into the far ultraviolet and the gas colourless. When you later meet the curved-arrow mechanisms of organic chemistry, you will be moving electrons between exactly these orbitals.

::: history
Walter Heitler and Fritz London opened the quantum theory of the bond in 1927 by treating $\mathrm{H_2}$ with electrons *shared between* the two atoms — the localised-pair picture that grew into valence bond theory. The molecular orbital alternative came five years later: in 1932 Friedrich Hund classified the states of electrons in molecules by their angular momentum about the internuclear axis, the $\Sigma$, $\Pi$, $\Delta$ labels underneath the $\sigma$/$\pi$ bookkeeping, and in the same year Robert S. Mulliken began the series of papers that built molecular orbitals from atomic orbitals, introduced the word *orbital* itself, and predicted fractional bond orders; Mulliken received the 1966 Nobel Prize in Chemistry for this work on molecular orbital theory. A third voice, J. E. Lennard-Jones, showed in 1929 that orbitals spread over a whole molecule could explain directed valence — the shapes VSEPR catalogues — before either rival was fully articulated. By the late 1930s the two rival pictures, localised pairs and delocalised orbitals, were recognised as complementary approximations to the same equation, a truce that still organises chemical language.
:::

## Where this leads

Let the molecule grow: a solid is a molecule of Avogadro's size, its MOs so densely spaced that they merge into bands — the entire content of [[bonding-structure/metallic-bonding]], and the reason this lesson's last chapter is about wires. The approximations made here (LCAO, one electron in the field of the rest) are examined properly in [[quantum-chemistry/chemical-bond-qm]], and the $\pi$-system version of the same ideas, applied to benzene and everything aromatic, is [[quantum-chemistry/huckel-theory]]. The g/u labels and the symmetry rules for which orbitals may mix are special cases of the group theory of [[quantum-chemistry/molecular-symmetry]]. HOMO–LUMO gaps as absorptions are [[spectroscopy/electronic-spectroscopy]], and unpaired electrons in $\pi^*$ orbitals are the subject of [[spectroscopy/epr]].

::: summary
- A molecular orbital belongs to the whole molecule; two atomic orbitals give two MOs — a bonding combination (density between the nuclei, lower energy) and an antibonding one (a nodal plane between the nuclei, higher energy), normalised with the overlap integral $S$.
- Build diagrams by matching energies and symmetries, conserve the number of orbitals, and fill by aufbau, Pauli and Hund.
- Bond order $= \tfrac12(N_\text{bonding} - N_\text{antibonding})$; higher bond order means shorter, stronger bonds, and fractional bond orders ($\mathrm{H_2^+}$, $\mathrm{He_2^+}$, $\mathrm{O_2^+}$) are real.
- $\mathrm{He_2}$ does not exist (bond order $0$) while $\mathrm{He_2^+}$ does ($\tfrac12$): antibonding electrons cancel bonds, they do not delete them.
- s–p mixing pushes $\sigma_\mathrm{g}(2p)$ above $\pi_\mathrm{u}(2p)$ in $\mathrm{B_2}$–$\mathrm{N_2}$ but not in $\mathrm{O_2}$, $\mathrm{F_2}$ — the switch that decides who is paramagnetic.
- $\mathrm{O_2}$'s two unpaired $\pi_\mathrm{g}^*$ electrons explain its paramagnetism — the prediction Lewis structures could not make — and the oxygen series $\mathrm{O_2^+}/\mathrm{O_2}/\mathrm{O_2^-}/\mathrm{O_2^{2-}}$ shows bond order read off in picometres.
- The HOMO and LUMO — frontier orbitals — control ionisation, reactivity and colour.
:::

## Exercises

::: exercise Bond orders and magnetism, four ways {level=1}
Give the valence MO configuration, bond order and magnetic behaviour of $\mathrm{F_2}$, $\mathrm{Ne_2}$, $\mathrm{C_2}$ and $\mathrm{NO}$ (treat NO with the $\mathrm{O_2}$-side ordering; it has 11 valence electrons).
::: solution
$\mathrm{F_2}$ (14 valence e⁻): $(\sigma_\mathrm{g}2s)^2(\sigma_\mathrm{u}^*2s)^2(\sigma_\mathrm{g}2p)^2(\pi_\mathrm{u}2p)^4(\pi_\mathrm{g}^*2p)^4$, bond order $\tfrac12(8-6) = 1$, diamagnetic — the single bond of $\mathrm{F}$–$\mathrm{F}$ ($141\ \mathrm{pm}$, $159\ \mathrm{kJ\,mol^{-1}}$). $\mathrm{Ne_2}$ (16): every valence MO filled, bond order $\tfrac12(8-8) = 0$ — does not exist. $\mathrm{C_2}$ (8, mixed ordering): $(\sigma_\mathrm{g}2s)^2(\sigma_\mathrm{u}^*2s)^2(\pi_\mathrm{u}2p)^4$, bond order $2$, diamagnetic. $\mathrm{NO}$ (11): ends $(\pi_\mathrm{g}^*)^1$ like a one-electron-shorter $\mathrm{O_2}$: bond order $\tfrac12(8-3) = 2.5$, **paramagnetic** — consistent with its slightly short, strong bond ($115\ \mathrm{pm}$, $631\ \mathrm{kJ\,mol^{-1}}$) between N=O and N≡O.
:::
:::

::: exercise Superoxide's bond order {level=1 check="1.5"}
Potassium superoxide, $\mathrm{KO_2}$, contains the $\mathrm{O_2^-}$ ion. Give the bond order of $\mathrm{O_2^-}$. (Enter the bond order as a decimal.)
::: solution
$\mathrm{O_2^-}$ has 13 valence electrons: one more than $\mathrm{O_2}$, entering the antibonding $\pi_\mathrm{g}^*$ set. Bond order $= \tfrac12(8 - 5) = 1.5$. The measured O–O length, $128\ \mathrm{pm}$, sits between $\mathrm{O_2}$ ($121\ \mathrm{pm}$) and peroxide ($149\ \mathrm{pm}$), exactly as a bond-and-a-half predicts.
:::
:::

::: exercise Nitrogen's cation {level=1 check="2.5"}
The first ionisation of $\mathrm{N_2}$ removes an electron from the $\sigma_\mathrm{g}(2p)$ HOMO. Give the bond order of $\mathrm{N_2^+}$. (Enter the bond order as a decimal.) Is it paramagnetic?
::: solution
Bond order $= \tfrac12(7-2) = 2.5$: an electron has been removed from a *bonding* orbital, so the bond weakens and lengthens relative to $\mathrm{N_2}$ ($110 \to 112\ \mathrm{pm}$) — the opposite of what happens to $\mathrm{O_2}$ on ionisation, where the electron leaves an *antibonding* orbital and the bond strengthens ([[#ex-oxygen-series]]). With one electron left in $\sigma_\mathrm{g}$, $\mathrm{N_2^+}$ is paramagnetic.
:::
:::

::: exercise Cyanide, isoelectronic family {level=2 check="3"}
$\mathrm{CN^-}$ has 10 valence electrons, like $\mathrm{N_2}$ and CO. Write its valence MO configuration, give its bond order, and predict whether its C–N distance is closer to a single ($\sim 147\ \mathrm{pm}$), double ($\sim 128\ \mathrm{pm}$) or triple bond ($\sim 116\ \mathrm{pm}$). (Enter the bond order.)
::: solution
Mixed ordering (carbon- and nitrogen-side, like $\mathrm{N_2}$): $(\sigma_\mathrm{g}2s)^2(\sigma_\mathrm{u}^*2s)^2(\pi_\mathrm{u}2p)^4(\sigma_\mathrm{g}2p)^2$. Bond order $= \tfrac12(8-2) = 3$: a triple bond, diamagnetic, all orbitals paired. The C–N distance should sit with the triple-bond family — measured near $115$–$116\ \mathrm{pm}$, essentially CO/N₂ territory. The HOMO is $\sigma$-weighted toward carbon, which is why cyanide, like CO, binds haem iron through carbon.
:::
:::

::: exercise NO against NO⁺ {level=2}
NO has 11 valence electrons; NO⁺ has 10. Predict which has the shorter, stronger N–O bond, and say what happens to the magnetism on ionisation. Measured values: $115\ \mathrm{pm}$, $631\ \mathrm{kJ\,mol^{-1}}$ and $106\ \mathrm{pm}$, $1025\ \mathrm{kJ\,mol^{-1}}$ (standard tabulated data).
::: solution
The eleventh electron of NO occupies an antibonding $\pi_\mathrm{g}^*$ orbital; removing it to form $\mathrm{NO^+}$ *raises* the bond order from $2.5$ to $3$ (isoelectronic with CO and $\mathrm{N_2}$). So $\mathrm{NO^+}$ must have the shorter, stronger bond — and the data agree ($106\ \mathrm{pm}$ against $115\ \mathrm{pm}$; $1025$ against $631\ \mathrm{kJ\,mol^{-1}}$). Magnetism: NO is paramagnetic (one unpaired electron); $\mathrm{NO^+}$ has all electrons paired and is diamagnetic. Note the contrast with $\mathrm{N_2} \to \mathrm{N_2^+}$, where ionisation removes a *bonding* electron and weakens the bond: the direction of the change tells you which kind of orbital the HOMO was.
:::
:::

::: exercise Where the switch bites {level=2}
Using the correct side of the s–p mixing switch for each, give the valence configurations and magnetic behaviour of $\mathrm{Be_2}$, $\mathrm{B_2^+}$ and $\mathrm{N_2^{2-}}$, and say which of them you expect to be bond-order-zero and unbound.
::: solution
$\mathrm{Be_2}$ (4 valence e⁻): $(\sigma_\mathrm{g}2s)^2(\sigma_\mathrm{u}^*2s)^2$, bond order $0$ — unbound, like $\mathrm{He_2}$; beryllium metal bonds another way ([[bonding-structure/metallic-bonding]]). $\mathrm{B_2^+}$ (5): $(\sigma_\mathrm{g}2s)^2(\sigma_\mathrm{u}^*2s)^2(\pi_\mathrm{u}2p)^1$ — bond order $\tfrac12(3-2) = 0.5$, paramagnetic (one $\pi$ electron; $\mathrm{B_2}$ itself has two). $\mathrm{N_2^{2-}}$ (12, mixed ordering): $(\sigma_\mathrm{g}2s)^2(\sigma_\mathrm{u}^*2s)^2(\pi_\mathrm{u}2p)^4(\sigma_\mathrm{g}2p)^2(\pi_\mathrm{g}^*2p)^2$ — bond order $\tfrac12(8-4) = 2$, and with two electrons in separate $\pi_\mathrm{g}^*$ orbitals, paramagnetic; it is isoelectronic with $\mathrm{O_2}$, whose magnetism it shares. Only $\mathrm{Be_2}$ has bond order zero.
:::
:::

::: exercise The asymmetry of bonding and antibonding {level=3}
Using $E_\pm = (\alpha \pm \beta)/(1 \pm S)$ of [[#proof-lcao-normalisation]], prove that the antibonding level is raised above $\alpha$ by *more* than the bonding level is lowered below it, and deduce from the inequality what happens to the energy of a two-electron bond when both orbitals are filled — the $\mathrm{He_2}$ case.
::: solution
The lowering is $\alpha - E_+ = \alpha - \frac{\alpha+\beta}{1+S} = \frac{-\alpha S - \beta}{1+S}$ and the raising is $E_- - \alpha = \frac{\alpha-\beta}{1-S} - \alpha = \frac{-\alpha S - \beta}{1-S}$. The numerators are identical and positive (with $\alpha < 0$, $\beta < 0$, $S > 0$), while $1-S < 1+S$, so the raising exceeds the lowering. Now fill both orbitals with one pair of electrons: the net shift is $E_+ + E_- - 2\alpha = (\text{raising}) - (\text{lowering}) > 0$. A doubly occupied bonding *plus* antibonding pair is therefore *above* the separated atoms — no bond, and even a slight destabilisation. This is the theorem behind $\mathrm{He_2}$ and $\mathrm{Ne_2}$: bond order zero is not merely "no glue" but a net loss, which is why filled-shell atoms are noble. (The residual attraction that does bind noble-gas pairs comes from fluctuation forces, not from these orbitals — [[bonding-structure/intermolecular-forces]].)
:::
:::

::: exercise Two theories, one beaker of oxygen {level=3}
Draw the Lewis structure of $\mathrm{O_2}$ and the valence-bond description with it, then the MO diagram. State precisely which observable distinguishes the two theories, what each predicts, and why the failure of the Lewis/VB picture is *structural* rather than a matter of poor parameters.
::: solution
Lewis: $\mathrm{O{=}O}$ with two lone pairs on each oxygen — four bonds, four lone pairs, sixteen electrons, every one paired. Valence bond theory in its basic form agrees: two $\sigma/\pi$ bonds formed by overlapping half-filled orbitals, all electrons paired. Both therefore predict $\mathrm{O_2}$ diamagnetic — weakly *repelled* by a magnet. MO theory fills $\pi_\mathrm{u}(2p)^4$ then places the last two electrons, by Hund's rule, one in each degenerate $\pi_\mathrm{g}^*$ with parallel spins: paramagnetic, and experiment (the hanging liquid, the magnetic susceptibility, the EPR spectrum) says paramagnetic, quantitatively two Bohr magnetons' worth of spin. The failure is structural because no rearrangement of *pairs between two atoms* can leave two unpaired electrons behind while keeping the observed bond order $2$ and bond length $121\ \mathrm{pm}$: the Lewis count itself forces pairing. The escape routes — promoting electrons to give a triplet diradical, or invoking four-centre bonding — cost far more energy than the pairing they recover. The lesson is not that Lewis structures are useless (they get the bond order, the length trend and the valence exactly right) but that they are a *bookkeeping of pairs*, and oxygen's ground state is not a pair arrangement. Where the two theories disagree, the numbers are the court of appeal — the standing lesson of this course.
:::
:::
