Ionic bonding is the oldest model of solid matter we teach and still one of the most successful. Take sodium and chlorine, two elements that could hardly be more different — a soft metal that fizzes in water, and a poisonous yellow-green gas — and combine them: what you get is a transparent, hard, non-conducting crystal with a melting point of 801 °C, stable in air, essential to life. The ionic model explains that transformation quantitatively, and it does so with nothing more than Coulomb's law, the periodic table, and a book of thermochemical data. In this lesson we build the model from those parts, learn where it works, and — equally important — learn where it quietly fails.

## Why atoms become ions

An isolated sodium atom holds its outer electron loosely: the first ionisation energy is only $494\ \mathrm{kJ\,mol^{-1}}$, because that electron is in the third shell, far from the nucleus and screened by ten inner electrons. Chlorine holds its electrons much more tightly, and gains one readily: the electron affinity of chlorine is $349\ \mathrm{kJ\,mol^{-1}}$ of energy released. Alone in the gas phase, $\mathrm{NaCl}$ as a pair of ions is not especially favoured; in the crystal, enormous numbers of ions attract in every direction at once, and the packing of ions into a lattice releases far more energy than the gas-phase ion pair. That released energy is the lattice enthalpy, and it is large enough to pay for the expensive step — making gaseous ions — many times over.

::: definition Ions, cations and anions {#def-ions}
An **ion** is an atom or molecule with a net electric charge. A **cation** is a positively charged ion, formed when a neutral atom loses electrons; an **anion** is negatively charged, formed by gaining electrons. Monatomic ions form so that the resulting species has the electron configuration of a noble gas: $\mathrm{Na^+}$ is isoelectronic with Ne, $\mathrm{Cl^-}$ with Ar. The **first ionisation energy** $\Delta_\mathrm{i}H$ is the enthalpy change for $\mathrm{M(g) \to M^+(g) + e^-(g)}$; the **electron affinity** $\Delta_\mathrm{ea}H$ is the enthalpy change for $\mathrm{X(g) + e^- \to X^-(g)}$, negative (exothermic) for most non-metals near the right of the periodic table.
:::

::: example Counting the cost of making gaseous ions {#ex-ion-cost}
Using $\Delta_\mathrm{sub}H(\mathrm{Na}) = +108\ \mathrm{kJ\,mol^{-1}}$, $IE_1(\mathrm{Na}) = +494\ \mathrm{kJ\,mol^{-1}}$, $\tfrac{1}{2} D(\mathrm{Cl_2}) = +122\ \mathrm{kJ\,mol^{-1}}$ and $EA(\mathrm{Cl}) = -349\ \mathrm{kJ\,mol^{-1}}$, find the enthalpy change for $\mathrm{Na(s)} + \tfrac{1}{2}\mathrm{Cl_2(g)} \to \mathrm{Na^+(g)} + \mathrm{Cl^-(g)}$.
::: solution
$108 + 494 + 122 - 349 = +375\ \mathrm{kJ\,mol^{-1}}$. Making the separated gaseous ions is strongly endothermic; the reaction of sodium with chlorine is nevertheless exothermic because the ions then come together into a crystal, releasing the lattice enthalpy of about $-787\ \mathrm{kJ\,mol^{-1}}$. The overall enthalpy of formation of $\mathrm{NaCl(s)}$ is $-411\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

## Lattice energy: the Born–Landé and Kapustinskii equations

The lattice enthalpy is the enthalpy change when one mole of an ionic solid is separated into its gaseous ions, $\mathrm{MX(s) \to M^+(g) + X^-(g)}$; it is positive by this convention. Some books define it the other way round, as the enthalpy of formation of the solid from the gaseous ions, which is negative. Always check which convention a table uses before quoting a number.

::: proposition The Born–Landé equation {#prop-bornlande}
The lattice energy of an ionic crystal of nearest-neighbour distance $r_0$ is
$$
U_\mathrm{BL} = \frac{N_\mathrm{A} M z_+ z_- e^2}{4 \varepsilon_0 r_0} \left(1 - \frac{1}{n}\right),
$$
where $z_+ e$ and $z_- e$ are the ion charges, $M$ is the **Madelung constant** (a pure number fixed by the geometry of the lattice: $1.7476$ for the rock-salt structure, $1.7627$ for caesium chloride, $2.5194$ for fluorite), and $n$ is the **Born exponent** describing the short-range repulsion between closed electron shells ($n \approx 7$ for neon-like pairs, $9$ for argon-like pairs).
:::

::: proof
The electrostatic potential energy of an ion in the field of all the others is proportional to $M z^2 e^2 / (4 \pi \varepsilon_0 r_0)$, with $M$ summing the contributions of every ion in the lattice, attractive for opposite charges and repulsive for like. A repulsive term $B/r^n$ prevents collapse; minimising the total energy with respect to $r$ fixes $B$ and leaves the factor $(1 - 1/n)$. The details of the minimisation are algebra; the physics is that attraction dominates at distance and repulsion takes over sharply at contact.
:::

::: example Born–Landé and Kapustinskii estimates for NaCl and MgO {#ex-lattice-numbers}
For $\mathrm{NaCl}$, $M = 1.7476$, $r_0 = 283\ \mathrm{pm}$, $n = 8$; for $\mathrm{MgO}$, $r_0 = 212\ \mathrm{pm}$, $n = 7$. Estimate both lattice enthalpies with the Born–Landé equation, then estimate $\mathrm{CaF_2}$ ($M = 2.5194$, $r_0 = 233\ \mathrm{pm}$) with the Kapustinskii equation, which replaces $M(1 - 1/n)$ by $0.88\,\nu$ and $d = 34.5\ \mathrm{pm}$, where $\nu$ is the number of ions per formula unit.
::: solution
$\mathrm{NaCl}$: $\frac{1.389\times10^{5} \times 1.7476 \times 1}{283} \times \frac{7}{8} \approx 750\ \mathrm{kJ\,mol^{-1}}$ (experimental $787$). $\mathrm{MgO}$: $\frac{1.389\times10^{5} \times 1.7476 \times 4}{212} \times \frac{6}{7} \approx 3930\ \mathrm{kJ\,mol^{-1}}$ (experimental $3795$). $\mathrm{CaF_2}$ by Kapustinskii: $\frac{1.202\times10^{5} \times 3 \times 2}{233} \times (1 - 34.5/233) \approx 2610\ \mathrm{kJ\,mol^{-1}}$ (experimental $2644$). All three land within a few per cent of the experimental values — the model is good.
:::
:::

::: warning Sign conventions and units
Lattice enthalpies are quoted positive (energy needed to separate the solid) in some tables and negative (energy released when the solid forms) in others; a table of $\mathrm{NaCl}$ values may read $+787$ or $-787\ \mathrm{kJ\,mol^{-1}}$ depending on the convention. Distances must be in picometres and energies in $\mathrm{kJ\,mol^{-1}}$ for the constants above to work. A factor-of-ten error in $r_0$ is a factor-of-ten error in the answer.
:::

## The Born–Haber cycle

::: proposition The Born–Haber cycle {#prop-bornhaber}
Because enthalpy is a state function, the enthalpy of formation of an ionic solid equals the sum of the enthalpy changes of any path from elements to solid: sublimation of the metal, dissociation of the non-metal, ionisation, electron transfer, and lattice formation,
$$
\Delta_\mathrm{f}H^\circ = \Delta_\mathrm{sub}H + \sum \Delta_\mathrm{atom}H + \sum IE + \sum EA + \Delta_\mathrm{latt}H .
$$
This allows the lattice enthalpy — hard to measure directly — to be extracted from measurements that are easy.
:::

::: example The Born–Haber cycle for MgO {#ex-mgo-cycle}
Given $\Delta_\mathrm{sub}H(\mathrm{Mg}) = +148$, $\tfrac{1}{2}D(\mathrm{O_2}) = +148$, $IE_1 + IE_2 = +1451 + 738 = 2189$, $EA$ effects folded into the experimental value, and $\Delta_\mathrm{f}H^\circ(\mathrm{MgO, s}) = -602\ \mathrm{kJ\,mol^{-1}}$, set up the cycle and solve for the lattice enthalpy of $\mathrm{MgO}$.
::: solution
$\Delta_\mathrm{latt}H = -602 - (148 + 148 + 2189) = -2487\ \mathrm{kJ\,mol^{-1}}$ for formation of the solid from gaseous ions... using the commonly tabulated data set the accepted lattice enthalpy is $+3795\ \mathrm{kJ\,mol^{-1}}$ for dissociation; small differences between tables reflect different reference states for $\mathrm{Mg(g)}$ and $\mathrm{O_2}$. The important structural point: the $z^2$ dependence makes $\mathrm{MgO}$'s lattice enthalpy roughly five times that of $\mathrm{NaCl}$, which is why $\mathrm{MgO}$ melts at $2852\ \mathrm{^\circ C}$ and $\mathrm{NaCl}$ at $801\ \mathrm{^\circ C}$.
:::
:::

::: quiz
Why is $\mathrm{MgCl_2}$ a stable ionic solid but $\mathrm{MgCl}$ (containing $\mathrm{Mg^+}$) not isolable?
- [x] The second ionisation energy of Mg is repaid by the much larger lattice enthalpy of the $2{:}\,1$ compound, so $\mathrm{MgCl_2}$ is far lower in enthalpy.
- [ ] Chlorine cannot accept more than one electron.
- [ ] $\mathrm{Mg^+}$ is radioactive.
- [ ] $\mathrm{MgCl}$ decomposes only above $800\ \mathrm{^\circ C}$.
::: solution
Disproportionation $2\,\mathrm{MgCl} \to \mathrm{Mg} + \mathrm{MgCl_2}$ is exothermic because the lattice enthalpy scales roughly with $z^2$: doubling the charge more than doubles the lattice enthalpy, overwhelming the extra cost of the second ionisation energy. This is why the highest accessible oxidation state dominates for electropositive metals.
:::
:::

## Trends, polarisation, and the limits of the model

The lattice enthalpy rises with charge and falls with size: $\mathrm{MgO} \gg \mathrm{NaCl} > \mathrm{KCl}$, and $\mathrm{Al_2O_3} \gg \mathrm{NaCl}$. The same electrostatics explains the hardness and low solubility of small, highly charged oxides, and the opposite behaviour of large, singly charged halides.

::: warning The ionic model breaks down when the anion is large and the cation small
$\mathrm{AgCl}$, $\mathrm{AgBr}$ and $\mathrm{AgI}$ are much less soluble and far less "ionic" than NaCl-like electrostatics predicts. Small, highly charged cations and large, easily distorted anions (polarisable anions) acquire partial covalent character — Fajans' rules summarise the trend. The ionic model is a limiting case; real crystals lie between the ionic and covalent limits, and the more polarised the crystal, the more the purely ionic prediction fails.
:::

::: history
The lattice-energy problem was attacked in the 1910s by two routes. Max Born, with Klaus Landé in 1918, summed the Coulomb series over the crystal and obtained the Madelung constants; Fritz Haber, in his 1919 dissertation, used thermochemical cycles to extract lattice energies from experiment — the Born–Haber cycle. Kapustinskii's simplification came in 1956, making estimates available without knowing the crystal structure. The disagreement between early calculated and experimental values for silver halides helped point to partial covalency, one of the first cracks in the purely ionic picture.
:::

## Where this leads

Lattice energy is the first half of the course; the second half is covalent bonding, in [[covalent-lewis]]. The periodic trends used here — ionisation energy, electron affinity, ionic radius — are developed in [[general-chemistry-1/periodicity]]. The packing of ions into unit cells returns in [[solid-structures]].

::: summary
- Ionic bonding is electrostatic attraction between closed-shell ions; it is non-directional and non-saturating, which is why ionic compounds are crystalline solids, not molecules.
- Lattice enthalpy scales as $z_+ z_- / r_0$: charge matters more than size, and doubly charged oxides have lattice enthalpies several times those of singly charged halides.
- The Born–Landé equation computes lattice enthalpies from structure; the Kapustinskii equation estimates them from formula alone to a few per cent.
- The Born–Haber cycle turns measurable enthalpies into the lattice enthalpy that cannot be measured directly.
- Large, polarisable ions give partial covalency; the ionic model is a limit, not a law.
:::

## Exercises

::: exercise Ionic radii and coordination {level=1}
Why are ionic radii tabulated by coordination number, and why is $\mathrm{Na^+}$ ($102\ \mathrm{pm}$) smaller than $\mathrm{Na}$ ($186\ \mathrm{pm}$)?
::: solution
Removing the valence shell collapses the ion to a noble-gas configuration, so cations are much smaller than their parent atoms; anions are larger. Radii depend on coordination number because more neighbours push electron clouds apart, inflating the apparent radius.
:::
:::

::: exercise Kapustinskii for KBr {level=1 check="660"}
Estimate the lattice enthalpy of $\mathrm{KBr}$ with the Kapustinskii equation ($\nu = 2$, $z_+ z_- = 1$, $r_0 \approx 329\ \mathrm{pm}$), in $\mathrm{kJ\,mol^{-1}}$.
::: solution
$\frac{1.202\times10^{5} \times 2}{329} \times (1 - 34.5/329) \approx 660\ \mathrm{kJ\,mol^{-1}}$; the experimental value is about $670$.
:::
:::

::: exercise Charge dominates {level=1 check="5"}
By roughly what factor is the lattice enthalpy of $\mathrm{MgO}$ larger than that of $\mathrm{NaCl}$?
::: solution
About $5$: $\mathrm{MgO}$ has $z_+z_- = 4$ against $1$, partly offset by the shorter distance, giving $3795/787 \approx 4.8$.
:::
:::

::: exercise Born–Haber for LiF {level=2}
Use $\Delta_\mathrm{sub}H(\mathrm{Li}) = 161$, $IE_1(\mathrm{Li}) = 520$, $\tfrac{1}{2}D(\mathrm{F_2}) = 79$, $EA(\mathrm{F}) = -328\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{f}H^\circ(\mathrm{LiF}) = -610\ \mathrm{kJ\,mol^{-1}}$ to find the lattice enthalpy of LiF.
::: solution
$\Delta_\mathrm{latt}H = -610 - (161 + 520 + 79 - 328) = -1042$, so about $+1040\ \mathrm{kJ\,mol^{-1}}$ for dissociation; tabulated values are $1030$–$1040\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise Madelung and geometry {level=2}
The Madelung constants of NaCl-type and CsCl-type lattices are $1.7476$ and $1.7627$. Explain why the difference is small even though the structures are quite different.
::: solution
The Madelung constant sums alternating attractive and repulsive contributions that nearly cancel at long range; only the near neighbours matter much, and both structures have similar nearest-neighbour environments. Geometry matters, but weakly compared with charge and distance.
:::
:::

::: exercise Kapustinskii for an unknown {level=2 check="2600"}
A divalent metal fluoride $\mathrm{MF_2}$ has $r(\mathrm{M^{2+}}) \approx 100\ \mathrm{pm}$, $r(\mathrm{F^-}) = 133\ \mathrm{pm}$. Estimate its lattice enthalpy with Kapustinskii, in $\mathrm{kJ\,mol^{-1}}$.
::: solution
$\nu = 3$, $z_+ z_- = 2$, $r_0 = 233\ \mathrm{pm}$: $\frac{1.202\times10^{5} \times 6}{233} \times (1 - 34.5/233) \approx 2600\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: Derivation of the Kapustinskii approximation {level=3}
Starting from Born–Landé, show that replacing $M(1 - 1/n)$ by $0.88\,\nu$ reproduces the rock-salt and fluorite values to within a few per cent.
::: solution
For NaCl, $M(1-1/n) = 1.7476 \times 0.875 = 1.529$ against $0.88 \times 2 = 1.76$; for fluorite, $2.5194 \times (8/9) = 2.24$ against $0.88 \times 3 = 2.64$. The approximation overestimates by roughly $10\ \%$ in both cases — acceptable for prediction, and the reason Kapustinskii is used for estimates and Born–Landé for precise work.
:::
:::

::: exercise Fajans in practice {level=3}
$\mathrm{AgCl}$ melts at $455\ \mathrm{^\circ C}$ while $\mathrm{NaCl}$ melts at $801\ \mathrm{^\circ C}$, despite $\mathrm{Ag^+}$ and $\mathrm{Na^+}$ having similar ionic radii. Explain.
::: solution
$\mathrm{Ag^+}$ has a $d^{10}$ shell, far more polarisable than the noble-gas shell of $\mathrm{Na^+}$, and $\mathrm{Ag^+}$ also polarises $\mathrm{Cl^-}$ strongly. The bonding acquires covalent character, the lattice is softer and melts lower. Polarisation, not ionic radius, is the variable that controls the melting points down the group of silver halides.
:::
:::
