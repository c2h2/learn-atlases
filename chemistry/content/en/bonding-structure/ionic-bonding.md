Ionic bonding is the oldest model of solid matter we teach and still one of the most successful. Take sodium and chlorine, two elements that could hardly be more different — a soft metal that fizzes in water, and a poisonous yellow-green gas — and combine them: what you get is a transparent, hard, non-conducting crystal with a melting point of $801\ \mathrm{^\circ C}$, stable in air, essential to life. The ionic model explains that transformation quantitatively, and it does so with nothing more than Coulomb's law, the periodic table, and a book of thermochemical data. In this lesson we build the model from those parts: we decide when atoms transfer electrons, count the electrostatic energy of the crystal that results, and measure the whole bookkeeping against experiment with the Born–Haber cycle. Equally important, we learn where the model quietly fails — because knowing the limits of the ionic picture is what makes the rest of this course, and the covalent bond of [[bonding-structure/covalent-lewis]], necessary rather than optional.

## Why atoms become ions

An isolated sodium atom holds its outer electron loosely: the first ionisation energy is only $494\ \mathrm{kJ\,mol^{-1}}$, because that electron is in the third shell, far from the nucleus and screened by ten inner electrons. Chlorine is the opposite: a high effective nuclear charge on a compact $n = 3$ shell makes its first ionisation energy $1251\ \mathrm{kJ\,mol^{-1}}$, and its electron affinity — the energy released when it captures an electron — is $349\ \mathrm{kJ\,mol^{-1}}$. The periodic trends that govern these numbers are developed in [[general-chemistry-1/periodicity]]; what matters here is the arithmetic of transfer. Moving an electron from a gaseous Na atom to a gaseous Cl atom costs $494 - 349 = 145\ \mathrm{kJ\,mol^{-1}}$: as isolated gas-phase atoms, ions are *not* free. What makes the transfer pay is the Coulomb attraction between the ions once they form — and in a crystal, every ion attracts dozens of neighbours at once, so the payoff is enormous compared with even the tightest gas-phase ion pair.

::: definition Ions, cations and anions {#def-ions}
An **ion** is an atom or molecule with a net electric charge. A **cation** is a positively charged ion, formed when a neutral atom loses electrons; an **anion** is negatively charged, formed by gaining electrons. Main-group monatomic ions form so that the resulting species has the electron configuration of a noble gas: $\mathrm{Na^+}$ is isoelectronic with Ne, $\mathrm{Cl^-}$ with Ar, $\mathrm{Mg^{2+}}$ with Ne and $\mathrm{O^{2-}}$ with Ne. The **first ionisation energy** $\Delta_\mathrm{i}H$ is the enthalpy change for $\mathrm{M(g) \to M^+(g) + e^-(g)}$ (always positive); the **electron affinity** expressed as an enthalpy $\Delta_\mathrm{ea}H$ is the enthalpy change for $\mathrm{X(g) + e^- \to X^-(g)}$, negative (exothermic) for most non-metals near the right of the periodic table.
:::

The phrase "ions form so as to achieve a noble-gas configuration" is a bookkeeping rule, not a causal story: no atom plans ahead. The real argument is energetic, and every term in it is measurable — ionisation energies, electron affinities, and the lattice enthalpy we are about to compute.

::: example Counting the cost of making gaseous ions {#ex-ion-cost}
Using $\Delta_\mathrm{sub}H(\mathrm{Na}) = +108\ \mathrm{kJ\,mol^{-1}}$, $IE_1(\mathrm{Na}) = +494\ \mathrm{kJ\,mol^{-1}}$, $\tfrac{1}{2} D(\mathrm{Cl_2}) = +122\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{ea}H(\mathrm{Cl}) = -349\ \mathrm{kJ\,mol^{-1}}$ (standard tabulated data), find the enthalpy change for $\mathrm{Na(s)} + \tfrac{1}{2}\mathrm{Cl_2(g)} \to \mathrm{Na^+(g)} + \mathrm{Cl^-(g)}$.
::: solution
Sum the steps of the path — sublime the metal, dissociate half a mole of chlorine molecules, ionise the sodium, attach the electron to the chlorine:
$$
108 + 122 + 494 - 349 = +375\ \mathrm{kJ\,mol^{-1}}.
$$
Making the separated gaseous ions from the elements is strongly endothermic. The reaction of sodium with chlorine is nevertheless vigorously exothermic, because the ions then come together into a crystal and release the lattice enthalpy, about $-787\ \mathrm{kJ\,mol^{-1}}$; the overall enthalpy of formation of $\mathrm{NaCl(s)}$ is $-411\ \mathrm{kJ\,mol^{-1}}$. The lattice pays for the expensive step more than twice over.
:::
:::

Even a *single* ion pair binds: at the $\mathrm{NaCl}$ molecule's separation of $236\ \mathrm{pm}$, the point-charge Coulomb energy is $-1.389\times10^{5}/236 = -589\ \mathrm{kJ\,mol^{-1}}$, which more than covers the $+145\ \mathrm{kJ\,mol^{-1}}$ gas-phase transfer cost. The crystal, where each $\mathrm{Na^+}$ is attracted to six $\mathrm{Cl^-}$ and repelled by six $\mathrm{Na^+}$ at once, releases still more — and counting that release correctly is the subject of the next two sections.

## The lattice enthalpy

::: definition Lattice enthalpy {#def-lattice-enthalpy}
The **lattice enthalpy** of an ionic solid is the enthalpy change for either of the two interconvertible processes
$$
\mathrm{MX(s) \to M^+(g) + X^-(g)} \qquad \Delta_\mathrm{latt}H > 0 \ \text{(dissociation convention)},
$$
$$
\mathrm{M^+(g) + X^-(g) \to MX(s)} \qquad \Delta_\mathrm{latt}H < 0 \ \text{(formation convention)}.
$$
It is the enthalpy change for one **formula unit** of the solid, not for a molecule: $\mathrm{NaCl}$ in the solid is not a molecule but a three-dimensional array, and $\mathrm{NaCl}$ is simply the simplest ratio of ions. Typical magnitudes run from about $700\ \mathrm{kJ\,mol^{-1}}$ for a large singly charged halide to nearly $4000\ \mathrm{kJ\,mol^{-1}}$ for a small doubly charged oxide.
:::

::: warning Sign conventions and units {#warn-signs}
Lattice enthalpies are quoted positive (energy needed to separate the solid) in some tables and negative (energy released when the solid forms) in others; a table of $\mathrm{NaCl}$ values may read $+787$ or $-787\ \mathrm{kJ\,mol^{-1}}$ depending on the convention, and mixing the two inside one Born–Haber cycle is the most common way to lose a sign and gain a wrong answer. Check the convention *before* you quote a number, and write the defining equation next to it. In the equations below, distances must be in picometres and energies in $\mathrm{kJ\,mol^{-1}}$ for the constants to work; a factor-of-ten error in $r_0$ is a factor-of-ten error in the answer.
:::

Because the electrostatic force has no direction of preference and no saturation limit, the ionic bond binds every ion to every neighbour of opposite charge. That is why ionic compounds are crystalline solids at room temperature rather than discrete molecules, why they cleave along flat planes, and why their properties depend on the whole lattice rather than on any single bond.

## Counting the Coulomb energy: the Born–Landé equation

The lattice enthalpy cannot be measured directly — no experiment takes a crystal and produces only free gaseous ions — but it can be *calculated*, because the interaction is simply Coulomb's law summed over the crystal. Every ion sits in the field of every other ion, and the sum converges (slowly, but it converges) to a pure number fixed by the geometry.

::: proposition The Born–Landé equation {#prop-bornlande}
The lattice energy of an ionic crystal of nearest-neighbour distance $r_0$, treated as an array of point charges with a short-range repulsive term, is
$$
U_\mathrm{BL} = \frac{N_\mathrm{A} M z_+ z_- e^2}{4 \pi \varepsilon_0 r_0} \left(1 - \frac{1}{n}\right),
$$
where $z_+ e$ and $z_- e$ are the ion charges, $M$ is the **Madelung constant** — a pure number fixed by the geometry of the lattice: $1.7476$ for the rock-salt structure, $1.7627$ for caesium chloride, $1.6381$ for zinc blende, $1.6414$ for wurtzite, $2.5194$ for fluorite ($\mathrm{CaF_2}$) — and $n$ is the **Born exponent** describing the short-range repulsion between closed electron shells ($n \approx 5$ for helium-like pairs, $7$ for neon-like pairs, $9$ for argon- and krypton-like pairs, $10$–$12$ for ions with 18 electrons).
:::

::: proof The $(1 - 1/n)$ factor {#proof-bornlande}
The electrostatic potential energy of one mole of ion pairs, with all separations scaled by the nearest-neighbour distance $r$, is
$$
U(r) = -\frac{N_\mathrm{A} M z_+ z_- e^2}{4 \pi \varepsilon_0 r} + \frac{N_\mathrm{A} B}{r^n},
$$
where the Madelung constant $M$ has absorbed the alternating sum over the whole lattice (attractive contributions from opposite charges, repulsive from like charges; for an infinite line of alternating charges the sum can be done in closed form and gives $M = 2\ln 2 = 1.386$) and $B/r^n$ represents the steep repulsion between closed shells that prevents collapse. At equilibrium the derivative with respect to $r$ vanishes at $r = r_0$:
$$
\frac{\mathrm{d}U}{\mathrm{d}r} = \frac{N_\mathrm{A} M z_+ z_- e^2}{4 \pi \varepsilon_0 r^2} - \frac{n N_\mathrm{A} B}{r^{n+1}} = 0
\qquad\Longrightarrow\qquad
B = \frac{M z_+ z_- e^2\, r_0^{\,n-1}}{4 \pi \varepsilon_0\, n}.
$$
Substituting this $B$ back into $U(r_0)$, the repulsive term becomes exactly $1/n$ of the magnitude of the attractive term, so
$$
U(r_0) = -\frac{N_\mathrm{A} M z_+ z_- e^2}{4 \pi \varepsilon_0 r_0} + \frac{1}{n}\cdot\frac{N_\mathrm{A} M z_+ z_- e^2}{4 \pi \varepsilon_0 r_0}
= -\frac{N_\mathrm{A} M z_+ z_- e^2}{4 \pi \varepsilon_0 r_0}\left(1 - \frac{1}{n}\right).
$$
The physics of the factor is simple: at the equilibrium separation the repulsive wall is already doing $1/n$ of the bookkeeping, so the net binding is $(1 - 1/n)$ of the pure Coulomb attraction. With $n = 9$ the correction is only $11\ \%$ — the lattice energy is overwhelmingly Coulombic, which is why a model of point charges works at all.
:::

::: widget plot
f: -1/x + b/x^8
sliders: b=0.02:0.005:0.06:0.005
x: 0.4, 2.5
y: -1.5, 0.5
labels: \text{pair potential } U(r)
caption: The model pair potential $U(x) = -1/x + b/x^8$ — Coulomb attraction plus an $r^{-8}$ repulsive wall — in arbitrary units, with the repulsion strength $b$ on the slider. Slide $b$ and watch the minimum: a softer wall (small $b$) gives a deeper well at a shorter separation, a harder wall pushes the ions apart and shallows the well. The equilibrium distance $r_0$ is *set by the balance* of the two terms, not by either alone — which is why $r_0$ is an observable (from diffraction) that then fixes the lattice energy through the Born–Landé equation. The well depth here plays the role of the $(1-1/n)$ factor: the net binding is the Coulomb attraction reduced by the fraction of it spent holding the ions at $r_0$ against the repulsion.
:::

The constant in front is worth memorising once: $N_\mathrm{A} e^2 / (4 \pi \varepsilon_0) = 1.389\times10^{5}\ \mathrm{kJ\,pm\,mol^{-1}}$, so that with $r_0$ in picometres the Born–Landé lattice energy (dissociation, positive) is $1.389\times10^{5}\, M z_+ z_- (1 - 1/n)/r_0$.

::: example Born–Landé and Kapustinskii estimates for NaCl, MgO and CaF$_2$ {#ex-lattice-numbers}
For $\mathrm{NaCl}$, $M = 1.7476$, $r_0 = 283\ \mathrm{pm}$, $n = 8$; for $\mathrm{MgO}$ (also rock-salt), $r_0 = 212\ \mathrm{pm}$, $n = 7$. Estimate both lattice enthalpies with the Born–Landé equation, then estimate $\mathrm{CaF_2}$ ($M = 2.5194$, $r_0 = 233\ \mathrm{pm}$, $n = 8$) with the Kapustinskii equation below.
::: solution
$\mathrm{NaCl}$:
$$
\frac{1.389\times10^{5} \times 1.7476 \times 1}{283} \times \frac{7}{8} = 750\ \mathrm{kJ\,mol^{-1}} \quad (\text{experimental } 787).
$$
$\mathrm{MgO}$:
$$
\frac{1.389\times10^{5} \times 1.7476 \times 4}{212} \times \frac{6}{7} = 3926\ \mathrm{kJ\,mol^{-1}} \quad (\text{experimental } \approx 3795\text{–}3850).
$$
$\mathrm{CaF_2}$ by Kapustinskii ($\nu = 3$, $z_+ z_- = 2$):
$$
\frac{1.202\times10^{5} \times 3 \times 2}{233} \times \left(1 - \frac{34.5}{233}\right) = 2637\ \mathrm{kJ\,mol^{-1}} \quad (\text{experimental } 2644).
$$
All three land within a few per cent of experiment — for a model that treats ions as featureless point charges, that is remarkable agreement, and it is the strongest single piece of evidence that the bonding in these crystals really is electrostatic.
:::
:::

When the crystal structure (and hence $M$) is unknown, the **Kapustinskii equation** replaces the structure-dependent factor by an empirical one that depends only on the number of ions per formula unit.

::: proposition The Kapustinskii equation {#prop-kapustinskii}
The lattice enthalpy (dissociation) of an ionic solid may be estimated without knowledge of its structure by
$$
\Delta_\mathrm{latt}H \approx \frac{1.202\times10^{5}\ \mathrm{kJ\,pm\,mol^{-1}} \times \nu\, z_+ z_-}{r_+ + r_-} \left(1 - \frac{34.5\ \mathrm{pm}}{r_+ + r_-}\right),
$$
where $\nu$ is the number of ions per formula unit ($2$ for $\mathrm{NaCl}$, $3$ for $\mathrm{CaF_2}$ or $\mathrm{Na_2SO_4}$), $z_+ z_-$ is the product of the ion charge numbers, and $r_+ + r_-$ is the sum of the ionic radii in picometres. The equation works because the Born–Landé factor $M(1 - 1/n)$ is remarkably insensitive to structure: $1.53$ for rock salt, $2.24$ for fluorite, against Kapustinskii's $0.88\,\nu = 1.76$ and $2.64$ — a systematic overestimate of about $10\ \%$ that the $34.5\ \mathrm{pm}$ correction largely cancels.
:::

::: widget plot
f: 120200*nu*zz/x*(1-34.5/x)
sliders: nu=2:2:4:1; zz=1:1:4:1
x: 200, 400
y: 0, 5000
labels: \text{Kapustinskii lattice enthalpy}
caption: The Kapustinskii lattice enthalpy as a function of the ion-separation distance $x = r_+ + r_-$ in picometres, with the number of ions per formula unit $\nu$ and the charge product $z_+ z_-$ on sliders. Set $\nu = 2$, $z_+z_- = 1$ and read the curve at $x = 283\ \mathrm{pm}$: about $746\ \mathrm{kJ\,mol^{-1}}$, the $\mathrm{NaCl}$ estimate. Now set $z_+ z_- = 4$ and $x = 212\ \mathrm{pm}$: the curve jumps to nearly $3800\ \mathrm{kJ\,mol^{-1}}$ for $\mathrm{MgO}$. Doubling the charges quadruples the lattice enthalpy while the shorter distance multiplies it again — charge dominates size, and that single sentence explains the melting points of oxides versus halides.
:::

## The Born–Haber cycle

Calculation gives one estimate of the lattice enthalpy; experiment gives another, through a thermochemical cycle that is a model application of Hess's law (see [[general-chemistry-1/thermochemistry]]).

::: proposition The Born–Haber cycle {#prop-bornhaber}
Because enthalpy is a state function, the enthalpy of formation of an ionic solid equals the sum of the enthalpy changes of *any* path from elements to solid. Choosing the path through gaseous ions,
$$
\Delta_\mathrm{f}H^\circ = \Delta_\mathrm{sub}H + \sum \Delta_\mathrm{atom}H + \sum IE + \sum \Delta_\mathrm{ea}H + \Delta_\mathrm{latt}H,
$$
where $\Delta_\mathrm{latt}H$ here carries the formation (negative) convention. Every other term is measurable — sublimation enthalpies, bond dissociation enthalpies, successive ionisation energies, electron affinities — so the cycle extracts the lattice enthalpy, which is not directly measurable, from measurements that are. Conversely, with a calculated lattice enthalpy the cycle can extract an unknown ionisation energy or electron affinity: cycles of this kind established many of the numbers in the data tables.
:::

::: example The Born–Haber cycle for NaCl {#ex-nacl-cycle}
Extract the lattice enthalpy of $\mathrm{NaCl}$ from $\Delta_\mathrm{sub}H(\mathrm{Na}) = +108$, $\tfrac{1}{2}D(\mathrm{Cl_2}) = +122$, $IE_1(\mathrm{Na}) = +494$, $\Delta_\mathrm{ea}H(\mathrm{Cl}) = -349$ and $\Delta_\mathrm{f}H^\circ(\mathrm{NaCl, s}) = -411\ \mathrm{kJ\,mol^{-1}}$ (standard tabulated data).
::: solution
Write the cycle as a table of steps from $\mathrm{Na(s)} + \tfrac{1}{2}\mathrm{Cl_2(g)}$ to $\mathrm{NaCl(s)}$ through $\mathrm{Na^+(g)} + \mathrm{Cl^-(g)}$:

| Step | $\Delta H / \mathrm{kJ\,mol^{-1}}$ |
|---|---|
| $\mathrm{Na(s) \to Na(g)}$ | $+108$ |
| $\tfrac{1}{2}\mathrm{Cl_2(g) \to Cl(g)}$ | $+122$ |
| $\mathrm{Na(g) \to Na^+(g) + e^-}$ | $+494$ |
| $\mathrm{Cl(g) + e^- \to Cl^-(g)}$ | $-349$ |
| $\mathrm{Na^+(g) + Cl^-(g) \to NaCl(s)}$ | $\Delta_\mathrm{latt}H$ |
| **Sum $= \Delta_\mathrm{f}H^\circ$** | $-411$ |

The gaseous-ion step costs $108 + 122 + 494 - 349 = +375\ \mathrm{kJ\,mol^{-1}}$, so
$$
\Delta_\mathrm{latt}H = -411 - 375 = -786\ \mathrm{kJ\,mol^{-1}},
$$
or $+786\ \mathrm{kJ\,mol^{-1}}$ on the dissociation convention (tabulated $787$; the last digit depends on the data set). Compare with the Born–Landé calculation of $750\ \mathrm{kJ\,mol^{-1}}$: theory and thermochemistry agree to $5\ \%$ for a crystal of two elements whose neutral atoms share almost nothing. The agreement *is* the evidence for the ionic model.
:::
:::

::: example The Born–Haber cycle for MgO, and why $\mathrm{O^{2-}}$ exists {#ex-mgo-cycle}
Find the lattice enthalpy of $\mathrm{MgO}$ from $\Delta_\mathrm{sub}H(\mathrm{Mg}) = +148$, $\tfrac{1}{2}D(\mathrm{O_2}) = +249$, $IE_1(\mathrm{Mg}) = +738$, $IE_2(\mathrm{Mg}) = +1451$, $\Delta_\mathrm{ea}H_1(\mathrm{O}) = -141$, $\Delta_\mathrm{ea}H_2(\mathrm{O}) = +844$ and $\Delta_\mathrm{f}H^\circ(\mathrm{MgO, s}) = -602\ \mathrm{kJ\,mol^{-1}}$ (standard tabulated data).
::: solution

| Step | $\Delta H / \mathrm{kJ\,mol^{-1}}$ |
|---|---|
| $\mathrm{Mg(s) \to Mg(g)}$ | $+148$ |
| $\tfrac{1}{2}\mathrm{O_2(g) \to O(g)}$ | $+249$ |
| $\mathrm{Mg(g) \to Mg^+(g) + e^-}$ | $+738$ |
| $\mathrm{Mg^+(g) \to Mg^{2+}(g) + e^-}$ | $+1451$ |
| $\mathrm{O(g) + e^- \to O^-(g)}$ | $-141$ |
| $\mathrm{O^-(g) + e^- \to O^{2-}(g)}$ | $+844$ |
| $\mathrm{Mg^{2+}(g) + O^{2-}(g) \to MgO(s)}$ | $\Delta_\mathrm{latt}H$ |
| **Sum $= \Delta_\mathrm{f}H^\circ$** | $-602$ |

The cost of the gaseous ions is $148 + 249 + 738 + 1451 - 141 + 844 = +3289\ \mathrm{kJ\,mol^{-1}}$, so
$$
\Delta_\mathrm{latt}H = -602 - 3289 = -3891 \approx -3890\ \mathrm{kJ\,mol^{-1}},
$$
or $+3890\ \mathrm{kJ\,mol^{-1}}$ for dissociation; tabulated values span $3795$–$3925\ \mathrm{kJ\,mol^{-1}}$ depending on the data set and reference states used.

The instructive term is the second electron affinity of oxygen, $+844\ \mathrm{kJ\,mol^{-1}}$: forcing an electron onto the negative ion $\mathrm{O^-}$ is strongly **endothermic**, because you are pushing charge onto charge. An isolated $\mathrm{O^{2-}}$ ion does not exist — gas-phase experiments confirm it is unstable by hundreds of kilojoules. What makes $\mathrm{O^{2-}}$ real is the lattice: the $z_+z_- = 4$ Coulomb attraction in $\mathrm{MgO}$ releases roughly $3900\ \mathrm{kJ\,mol^{-1}}$, and the extra $844$ is a small fraction of that. Oxide ions exist in crystals, not in space — the environment pays the bill that the free ion cannot afford.
:::
:::

::: quiz
Why is $\mathrm{MgCl_2}$ a stable ionic solid while $\mathrm{MgCl}$ (containing $\mathrm{Mg^+}$) is not isolable?
- [x] The second ionisation energy of Mg is repaid by the much larger lattice enthalpy of the $2{:}\,1$ compound, so $\mathrm{MgCl_2}$ is far lower in enthalpy; $\mathrm{MgCl}$ disproportionates.
- [ ] Chlorine cannot accept more than one electron.
- [ ] $\mathrm{Mg^+}$ is radioactive.
- [ ] $\mathrm{MgCl}$ decomposes only above $800\ \mathrm{^\circ C}$.
::: solution
Disproportionation $2\,\mathrm{MgCl(s)} \to \mathrm{Mg(s)} + \mathrm{MgCl_2(s)}$ is exothermic because the lattice enthalpy scales roughly with $z_+ z_-$: going from $\mathrm{Mg^+Cl^-}$ to $\mathrm{Mg^{2+}2Cl^-}$ more than doubles the lattice enthalpy, overwhelming the extra $+738\ \mathrm{kJ\,mol^{-1}}$ of the second ionisation energy (the first is $738$, the second $1451$; the lattice gain is of order $+2000$). This is why the highest accessible oxidation state dominates for electropositive metals, and why a Born–Haber cycle is the standard way to *prove* that a proposed oxidation state is thermodynamically inaccessible.
:::
:::

## Periodic trends and the limits of the ionic model

The Born–Landé and Kapustinskii equations make the trends transparent. The lattice enthalpy rises with the product of the charges and falls with the ion separation, so $\mathrm{MgO} \gg \mathrm{NaCl} > \mathrm{KCl} > \mathrm{RbBr}$, and $\mathrm{Al_2O_3} \gg \mathrm{MgO}$. Charge matters more than size: quadrupling $z_+z_-$ outweighs a $25\ \%$ change in distance, which is why refractory oxides melt near $3000\ \mathrm{^\circ C}$ and halides near $800\ \mathrm{^\circ C}$. The same electrostatics explains the hardness and low solubility of small, highly charged oxides, and the opposite behaviour of large, singly charged halides.

::: warning The ionic model breaks down when the cation polarises the anion {#warn-fajans}
$\mathrm{AgCl}$, $\mathrm{AgBr}$ and $\mathrm{AgI}$ are far less soluble and far less "ionic" than NaCl-like electrostatics predicts, and their lattice enthalpies from Born–Haber cycles run well *above* the Born–Landé values — extra stability that pure ionic counting cannot see. The reason is **polarisation**: a small, highly charged cation (high charge density, high polarising power) distorts the electron cloud of a large, easily distorted (polarisable) anion, and the distorted, shared cloud is by definition partial covalent bonding. **Fajans' rules** summarise the trend: covalent character increases with cation charge, with small cation radius, with anion size and polarisability, and with a non-noble-gas cation shell ($d^{10}$ cations like $\mathrm{Ag^+}$ polarise strongly). The ionic model is a limiting case; real crystals lie between the ionic and covalent limits, and the more polarised the crystal, the more the purely ionic prediction fails.
:::

## The properties of ionic compounds

A model earns its place by explaining properties, not just energies. Four families of behaviour follow directly from the lattice picture.

**Melting points and hardness.** Melting an ionic solid means breaking up the lattice — not into ions (the melt is still ionic) but into mobile, disordered ones. The energy cost tracks the lattice enthalpy: $\mathrm{NaCl}$ melts at $801\ \mathrm{^\circ C}$, $\mathrm{MgO}$ at $2852\ \mathrm{^\circ C}$, in proportion to $787$ and $3890\ \mathrm{kJ\,mol^{-1}}$. Hardness and high density follow from the same non-directional, all-pervading attraction.

**Brittleness.** Ionic crystals are hard but brittle. A shear force that slides one plane of ions half a spacing along the lattice brings like charges opposite like; the lattice then *repels itself apart* along the plane. This is why $\mathrm{NaCl}$ cleaves along flat $\{100\}$ faces rather than bending — the same electrostatics that binds the crystal destroys it under shear.

**Conduction.** In the solid, the ions are locked at lattice sites and only the electrons can move — and those are locked in closed shells $800\ \mathrm{kJ\,mol^{-1}}$ or more above the highest occupied level, so solid salts are insulators. Melt the salt or dissolve it, and the ions themselves become mobile charge carriers: molten $\mathrm{NaCl}$ conducts, and so does brine. Electrolysing molten $\mathrm{NaCl}$ to sodium metal is simply this conduction made to go to extremes. (Dissolving is *not* creating ions — the ions were already there; solution replaces the lattice with ion–water attractions.)

**Solubility: the lattice–hydration competition.** Dissolving an ionic solid trades the lattice enthalpy (endothermic to break) for the hydration enthalpies of the separated ions (exothermic to form):
$$
\Delta_\mathrm{sol}H = \Delta_\mathrm{latt}H + \Delta_\mathrm{hyd}H(\mathrm{M^+}) + \Delta_\mathrm{hyd}H(\mathrm{X^-}).
$$
Whether a salt dissolves is a tug of war between the two large terms, decided by their difference and by the entropy of mixing — the subject taken up properly in [[general-chemistry-2/liquids-solutions]].

::: example Why LiF is sparingly soluble and LiI very soluble {#ex-solubility-lif-lii}
Estimate $\Delta_\mathrm{sol}H$ for $\mathrm{LiF}$ and $\mathrm{LiI}$ from $\Delta_\mathrm{latt}H(\mathrm{LiF}) = +1037$, $\Delta_\mathrm{latt}H(\mathrm{LiI}) = +753$, $\Delta_\mathrm{hyd}H(\mathrm{Li^+}) = -520$, $\Delta_\mathrm{hyd}H(\mathrm{F^-}) = -515$ and $\Delta_\mathrm{hyd}H(\mathrm{I^-}) = -305\ \mathrm{kJ\,mol^{-1}}$ (standard tabulated data), and interpret the result against the observations: $\mathrm{LiF}$ dissolves to only about $0.04\ \mathrm{mol\,dm^{-3}}$, while $\mathrm{LiI}$ dissolves to over $10\ \mathrm{mol\,dm^{-3}}$.
::: solution
$$
\Delta_\mathrm{sol}H(\mathrm{LiF}) = 1037 - 520 - 515 = +2\ \mathrm{kJ\,mol^{-1}},
$$
$$
\Delta_\mathrm{sol}H(\mathrm{LiI}) = 753 - 520 - 305 = -72\ \mathrm{kJ\,mol^{-1}}.
$$
For $\mathrm{LiF}$ the two enormous terms cancel almost exactly: going down the halide group from F to I, the lattice enthalpy falls by $284\ \mathrm{kJ\,mol^{-1}}$ as the anion grows, but the hydration enthalpy of the anion becomes less favourable by only $210\ \mathrm{kJ\,mol^{-1}}$ — the lattice term wins the difference. With $\Delta_\mathrm{sol}H$ near zero for $\mathrm{LiF}$, solubility hangs on the small entropy and enthalpy details (hydration of the tiny $\mathrm{F^-}$ orders surrounding water, an unfavourable entropy), and the salt is sparingly soluble; with $-72\ \mathrm{kJ\,mol^{-1}}$ driving $\mathrm{LiI}$, it is extremely soluble. The general rule the numbers teach: for salts of a small, hard cation like $\mathrm{Li^+}$, solubility *increases* down the halide group because the lattice enthalpy falls faster than the hydration enthalpy.
:::
:::

::: history
The lattice-energy problem was attacked in the 1910s by two routes that still define the subject. Max Born, working with Klaus Landé in 1918, summed the Coulomb series over the crystal and obtained the Madelung constants, turning the lattice energy into a calculable quantity; Born's textbook *Vorlesungen über die Struktur der Atome* later carried the method to a generation of physicists. Fritz Haber, in his 1919 treatise on technical electrochemistry, used thermochemical cycles to extract lattice energies from experiment — the Born–Haber cycle — and used the resulting numbers to argue, against the prevailing electrochemical theory of alloys, that brass is a true solid solution. Kapustinskii's structure-free simplification came in 1956, making estimates available for any formula from ionic radii alone. The systematic disagreement between calculated and experimental lattice enthalpies for the silver halides was one of the earliest and clearest signs that the purely ionic picture was incomplete, pointing the way to polarisation and partial covalency.
:::

## Where this leads

Lattice energy is the first half of this course; the second half is the covalent bond, begun in [[bonding-structure/covalent-lewis]]. The periodic trends used here — ionisation energy, electron affinity, ionic radius — are developed in [[general-chemistry-1/periodicity]], and the thermochemical bookkeeping of the Born–Haber cycle is Hess's law from [[general-chemistry-1/thermochemistry]] applied to a specific path. The packing of ions into unit cells, coordination numbers and radius-ratio rules returns in [[bonding-structure/solid-structures]], and the quantitative crystallography in [[materials-chemistry/crystal-structures]]. The hydration–lattice competition behind solubility is taken up in [[general-chemistry-2/liquids-solutions]] and the sparingly-soluble case in [[general-chemistry-2/solubility-equilibria]]. Where the electrons themselves are treated quantum-mechanically, and the point-charge approximation can be examined from first principles, is [[quantum-chemistry/chemical-bond-qm]].

::: summary
- Ionic bonding is electrostatic attraction between closed-shell ions; it is non-directional and non-saturating, which is why ionic compounds are crystalline solids, not molecules.
- Lattice enthalpy scales as $z_+ z_- / r_0$: charge matters more than size, and doubly charged oxides have lattice enthalpies several times those of singly charged halides.
- The Born–Landé equation computes lattice enthalpies from structure (Madelung constant, Born exponent, the $(1-1/n)$ factor from minimising the pair potential); the Kapustinskii equation estimates them from formula alone to a few per cent.
- The Born–Haber cycle turns measurable enthalpies — sublimation, dissociation, ionisation, electron affinity, formation — into the lattice enthalpy that cannot be measured directly.
- The second electron affinity of oxygen is endothermic: $\mathrm{O^{2-}}$ exists only because the lattice pays for it.
- Melting points, brittleness, conduction when molten or dissolved, and solubility all follow from the lattice picture; solubility is the competition between lattice and hydration enthalpies.
- Large, polarisable ions give partial covalency (Fajans' rules); the ionic model is a limit, not a law.
:::

## Exercises

::: exercise Ionic radii and coordination {level=1}
Why are ionic radii tabulated by coordination number, and why is $\mathrm{Na^+}$ ($102\ \mathrm{pm}$) smaller than $\mathrm{Na}$ ($186\ \mathrm{pm}$)?
::: solution
Removing the valence shell collapses the ion to a noble-gas configuration with a higher effective nuclear charge per remaining electron, so cations are much smaller than their parent atoms; anions are larger because added electron–electron repulsion expands the shell. Radii depend on coordination number because more neighbouring ions push electron clouds apart, inflating the apparent radius — a radius is a fitted partition of an ion–ion distance, not an observable.
:::
:::

::: exercise Kapustinskii for KBr {level=1 check="654"}
Estimate the lattice enthalpy of $\mathrm{KBr}$ with the Kapustinskii equation ($\nu = 2$, $z_+ z_- = 1$, $r_0 = r(\mathrm{K^+}) + r(\mathrm{Br^-}) \approx 329\ \mathrm{pm}$). (Enter the lattice enthalpy in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$$
\frac{1.202\times10^{5} \times 2 \times 1}{329} \times \left(1 - \frac{34.5}{329}\right) = 730.7 \times 0.895 = 654\ \mathrm{kJ\,mol^{-1}};
$$
the experimental value is about $670\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise Charge dominates {level=1 check="5"}
By roughly what factor is the lattice enthalpy of $\mathrm{MgO}$ larger than that of $\mathrm{NaCl}$? (Enter the factor.)
::: solution
About $5$: $\mathrm{MgO}$ has $z_+z_- = 4$ against $1$, partly offset by the shorter distance, giving $3890/787 \approx 4.9$. Charge dominates size — the reason oxides are refractory and halides are not.
:::
:::

::: exercise Born–Haber for LiF {level=2 check="1042"}
Use $\Delta_\mathrm{sub}H(\mathrm{Li}) = 161$, $IE_1(\mathrm{Li}) = 520$, $\tfrac{1}{2}D(\mathrm{F_2}) = 79$, $\Delta_\mathrm{ea}H(\mathrm{F}) = -328$ and $\Delta_\mathrm{f}H^\circ(\mathrm{LiF}) = -610\ \mathrm{kJ\,mol^{-1}}$ to find the lattice enthalpy of $\mathrm{LiF}$ on the dissociation convention. (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
The gaseous-ion cost is $161 + 79 + 520 - 328 = +432\ \mathrm{kJ\,mol^{-1}}$, so $\Delta_\mathrm{latt}H(\text{formation}) = -610 - 432 = -1042$, i.e. $+1042\ \mathrm{kJ\,mol^{-1}}$ for dissociation; tabulated values are $1030$–$1040\ \mathrm{kJ\,mol^{-1}}$. Note the unusually small dissociation enthalpy of $\mathrm{F_2}$ ($D = 158\ \mathrm{kJ\,mol^{-1}}$), a consequence of lone-pair repulsion across the short F–F bond.
:::
:::

::: exercise Madelung and geometry {level=2}
The Madelung constants of NaCl-type and CsCl-type lattices are $1.7476$ and $1.7627$. Explain why the difference is small even though the structures are quite different, and why the zinc blende structure ($M = 1.638$) gives a slightly less stable lattice at the same $r_0$.
::: solution
The Madelung constant sums alternating attractive and repulsive contributions that nearly cancel at long range; only the near neighbours matter much, and both structures have similar nearest-neighbour environments (six and eight alternating charges). Geometry matters, but weakly compared with charge and distance. Zinc blende's smaller $M$ means a slightly lower Coulomb binding at equal $r_0$ — the structure a compound adopts is the one that minimises the *total* energy including repulsion and ion sizes, which is why radius ratios, not $M$ alone, decide the structure.
:::
:::

::: exercise Kapustinskii for an unknown {level=2 check="2640"}
A divalent metal fluoride $\mathrm{MF_2}$ has $r(\mathrm{M^{2+}}) \approx 100\ \mathrm{pm}$ and $r(\mathrm{F^-}) = 133\ \mathrm{pm}$. Estimate its lattice enthalpy with Kapustinskii. (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\nu = 3$, $z_+ z_- = 2$, $r_0 = 233\ \mathrm{pm}$:
$$
\frac{1.202\times10^{5} \times 3 \times 2}{233} \times \left(1 - \frac{34.5}{233}\right) = 3096 \times 0.852 = 2640\ \mathrm{kJ\,mol^{-1}}.
$$
(The metal is close to $\mathrm{Fe^{2+}}$ or $\mathrm{Co^{2+}}$; $\mathrm{MgF_2}$ itself, with $r_0 = 91 + 133 = 224\ \mathrm{pm}$, estimates at $2790\ \mathrm{kJ\,mol^{-1}}$.)
:::
:::

::: exercise Deriving the Kapustinskii approximation {level=3}
Starting from Born–Landé, show that replacing $M(1 - 1/n)$ by $0.88\,\nu$ reproduces the rock-salt and fluorite factors to within about $10\ \%$, and explain why the Kapustinskii equation nevertheless estimates lattice enthalpies to a few per cent.
::: solution
For rock salt with $n = 8$: $M(1-1/n) = 1.7476 \times 0.875 = 1.529$ against $0.88 \times 2 = 1.76$; for fluorite with $n = 8$: $2.5194 \times 0.875 = 2.20$ against $0.88 \times 3 = 2.64$. The replacement overestimates the Coulomb factor by $15\ \%$ and $20\ \%$ respectively — acceptable for prediction, and the reason Kapustinskii is used for estimates and Born–Landé for precise work. The error is tamed in practice because the same substitution is paired with the empirical $(1 - d/r_0)$ correction ($d = 34.5\ \mathrm{pm}$), which shrinks the estimate as ions get closer, and because $\nu$ tracks the number of ion pairs in the formula unit: the two empirical choices were fitted together against experimental lattice enthalpies, so their errors partly cancel.
:::
:::

::: exercise Fajans in practice {level=3}
$\mathrm{AgCl}$ melts at $455\ \mathrm{^\circ C}$ while $\mathrm{NaCl}$ melts at $801\ \mathrm{^\circ C}$, despite $\mathrm{Ag^+}$ ($115\ \mathrm{pm}$) and $\mathrm{Na^+}$ ($102\ \mathrm{pm}$) having similar ionic radii. Explain. Then predict, with reasoning, how the solubility of $\mathrm{AgI}$ compares with that of $\mathrm{AgCl}$, and what a Born–Haber lattice enthalpy for $\mathrm{AgCl}$ will show when compared with its Born–Landé value.
::: solution
$\mathrm{Ag^+}$ carries a $4d^{10}$ shell whose electrons screen the nuclear charge poorly, so at similar radius it polarises an anion far more strongly than the noble-gas $\mathrm{Na^+}$ can. The bonding acquires covalent character, the lattice is softer and melts lower. The Born–Haber lattice enthalpy of $\mathrm{AgCl}$ exceeds the Born–Landé prediction — extra stability that ionic counting cannot see, the classic signature of partial covalency. For solubility, apply the same argument: $\mathrm{I^-}$ is larger and far more polarisable than $\mathrm{Cl^-}$, so $\mathrm{AgI}$ is the more covalent solid and the less soluble — it dissolves some $3\times10^{6}$ times more sparingly than $\mathrm{AgCl}$ (photographic fixer works because thiosulfate, a stronger ligand, pulls the stubborn $\mathrm{Ag^+}$ into a complex). Polarisation, not ionic radius, is the variable that controls the chemistry down the group of silver halides.
:::
:::
