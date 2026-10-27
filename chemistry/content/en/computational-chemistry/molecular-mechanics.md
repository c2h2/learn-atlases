A small protein with its surrounding water contains some $50\,000$ atoms. Computing its energy from the Schrödinger equation, even with the cheapest density functional, would take hours for a single geometry; a molecular-dynamics simulation needs millions of geometries. Yet the questions asked of such systems — which conformation does the protein adopt, how does a drug sit in its pocket, how fast does water diffuse — rarely involve breaking bonds. **Molecular mechanics** exploits this. It discards the electrons altogether and writes the potential energy surface of [[computational-chemistry/potential-energy-surfaces]] as a sum of simple classical terms: springs for bonds and angles, periodic functions for torsions, and pairwise van der Waals and Coulomb interactions between atoms. The resulting **force field** costs microseconds per energy evaluation instead of hours. The price is that every term must be parameterised, that the parameters are valid only for the kinds of molecule they were fitted to, and that chemistry — bonds forming and breaking — is outside its scope. This lesson builds a force field term by term, shows where the parameters come from, and explains how the many minima of a flexible molecule are searched.

## The force-field energy

The guiding idea is **transferability**: a C–C single bond in hexane behaves very much like one in a protein side chain, so one set of parameters should describe both. Atoms are therefore classified into **atom types** — not just by element, but by hybridisation and environment (an $sp^{3}$ carbon, an aromatic carbon, a carbonyl oxygen, an amide nitrogen) — and every parameter is attached to a combination of types.

::: definition Force field {#def-force-field}
A (class I) **force field** expresses the potential energy of a molecular system as
$$
\begin{aligned}
E_\mathrm{FF} ={}& \sum_\mathrm{bonds} k_b (r - r_0)^{2} + \sum_\mathrm{angles} k_\theta (\theta - \theta_0)^{2} + \sum_\mathrm{torsions} \sum_n \frac{V_n}{2}\left[1 + \cos(n\phi - \delta_n)\right] \\
&+ \sum_{i<j}^{\text{non-bonded}} \left\{ 4\varepsilon_{ij}\left[\left(\frac{\sigma_{ij}}{r_{ij}}\right)^{12} - \left(\frac{\sigma_{ij}}{r_{ij}}\right)^{6}\right] + \frac{q_i q_j}{4\pi\varepsilon_0 r_{ij}} \right\},
\end{aligned}
$$
where the parameters $k_b, r_0, k_\theta, \theta_0, V_n, \delta_n, \varepsilon_{ij}, \sigma_{ij}$ and the fixed **partial charges** $q_i$ depend on atom types. The non-bonded sum runs over pairs separated by three or more bonds; pairs separated by exactly three bonds ("1–4 pairs") are usually scaled down. The bonded terms are called **valence** terms and the rest **non-bonded** terms.
:::

Three features of this expression deserve comment before we take it apart. First, it is a *model* of the Born–Oppenheimer surface, not an approximation to it in any systematic sense: there is no small parameter, and no way to improve it except by refitting. Second, the zero of energy has no physical meaning. A force-field "energy" is a **steric energy** relative to a hypothetical strain-free molecule, so you can compare the energies of two conformers of one molecule, but not the energies of two different molecules, unless the force field has been specially parameterised for heats of formation (as MM3 was). Third, the total cost is dominated by the non-bonded sum, which has $N(N - 1)/2$ terms; everything else is linear in $N$.

| force field | first published | typical use |
|---|---|---|
| MM2, MM3, MM4 (Allinger) | 1977, 1989, 1996 | small organic molecules, conformations, heats of formation |
| AMBER (Kollman, Case and co-workers) | 1984 onwards | proteins and nucleic acids |
| CHARMM (Karplus and co-workers) | 1983 onwards | proteins, lipids, nucleic acids |
| OPLS (Jorgensen) | 1984 onwards | liquids, organic molecules, drug-like ligands |
| GAFF (General AMBER force field) | 2004 | drug-like organic molecules with AMBER biomolecules |
| UFF (Rappé and co-workers) | 1992 | whole periodic table, rough geometries |

## Bonded terms

### Bonds and angles

A harmonic spring is the second-order Taylor expansion of the true bond potential about its minimum. It is adequate for the small excursions ($\pm 0.05\ \mathrm{\AA}$) of bonds at room temperature, but it never dissociates and grows without limit — so it cannot describe bond breaking even in principle. MM3 adds cubic and quartic terms to mimic anharmonicity; a Morse function is the natural choice if bonds are to stretch far, but it is rarely used because it is more expensive and because nothing in a non-reactive force field needs it.

::: warning The factor of one-half {#warn-half}
Force fields differ in whether they write a bond term as $k_b(r - r_0)^{2}$ (AMBER, CHARMM, OPLS) or $\tfrac{1}{2}k(r - r_0)^{2}$ (GROMOS, many textbooks). An AMBER force constant is therefore *half* the spectroscopic force constant $k = \mathrm{d}^{2}E/\mathrm{d}r^{2}$. Mixing parameters from different sources without checking this convention doubles or halves every vibrational frequency's square. The same trap exists for angles and, in another form, for torsions (barrier $V_n$ in some fields, $V_n/2$ in others), and for Lennard-Jones parameters, quoted as $(\varepsilon, \sigma)$, as $(\varepsilon, r_\mathrm{min}/2)$ (CHARMM) or as $(A, B)$ coefficients of $A/r^{12} - B/r^{6}$. Always read the functional form before the numbers.
:::

::: example A C–C bond in AMBER {#ex-amber-bond}
The AMBER parameters for a bond between two $sp^{3}$ carbons (type CT–CT) are $k_b = 310.0\ \mathrm{kcal\,mol^{-1}\,\AA^{-2}}$ and $r_0 = 1.526\ \mathrm{\AA}$, with $E = k_b(r - r_0)^{2}$. Find the energy cost of stretching the bond by $0.050\ \mathrm{\AA}$, the spectroscopic force constant in $\mathrm{N\,m^{-1}}$, and the harmonic wavenumber of an isolated C–C oscillator ($\mu = 6.00\ \mathrm{u}$).
::: solution
The stretch energy is $310.0 \times (0.050)^{2} = 0.775\ \mathrm{kcal\,mol^{-1}} = 3.24\ \mathrm{kJ\,mol^{-1}}$, a little more than $RT$ at $298\ \mathrm{K}$ ($2.48\ \mathrm{kJ\,mol^{-1}}$): such stretches occur thermally. The spectroscopic constant is $k = \mathrm{d}^{2}E/\mathrm{d}r^{2} = 2k_b = 620.0\ \mathrm{kcal\,mol^{-1}\,\AA^{-2}}$; per molecule, in SI units,
$$
k = \frac{620.0 \times 4184\ \mathrm{J\,mol^{-1}}}{6.02214\times10^{23}\ \mathrm{mol^{-1}} \times 10^{-20}\ \mathrm{m^{2}}} = 431\ \mathrm{N\,m^{-1}} .
$$
With $\mu = 6.00 \times 1.66054\times10^{-27}\ \mathrm{kg} = 9.963\times10^{-27}\ \mathrm{kg}$, $\tilde\nu = \sqrt{k/\mu}/2\pi c = 1.10\times10^{3}\ \mathrm{cm^{-1}}$, in the region where C–C stretches of alkanes appear (about $800$–$1200\ \mathrm{cm^{-1}}$; they are strongly mixed with other modes, so no single band is "the" C–C stretch).
:::
:::

Angle bending is treated in the same way, with force constants typically a tenth of those for bonds per radian squared: angles are much softer than bonds. Some force fields add **Urey–Bradley** terms (a spring between the 1,3 atoms) or **cross terms** that couple, for example, a bond stretch to an adjacent angle bend (class II force fields such as MM3 and CFF); these improve vibrational frequencies considerably.

### Torsions

Rotation about a single bond is where the conformational chemistry lives. A torsion potential must be periodic in the dihedral angle $\phi$, so it is written as a short Fourier series, $\sum_n \tfrac{1}{2}V_n[1 + \cos(n\phi - \delta_n)]$. The threefold term $n = 3$ describes the staggered–eclipsed alternation about an $sp^{3}$–$sp^{3}$ bond; $n = 2$ describes the preference for planarity about a partial double bond such as an amide C–N; $n = 1$ distinguishes *anti* from *syn* arrangements, carrying the effects of dipole alignment.

::: definition Torsional potential of butane (Ryckaert–Bellemans form) {#def-rb}
In a united-atom model of $n$-butane, where each $\mathrm{CH_2}$ or $\mathrm{CH_3}$ group is a single site, the whole torsional energy about the central bond can be written as a polynomial in $\cos\psi$, where $\psi = \phi - 180^\circ$ is measured from the *anti* conformation:
$$
V(\psi) = \sum_{n=0}^{5} C_n \cos^{n}\psi ,
$$
with $C_0 = 9.28$, $C_1 = 12.16$, $C_2 = -13.12$, $C_3 = -3.06$, $C_4 = 26.24$, $C_5 = -31.5\ \mathrm{kJ\,mol^{-1}}$ (Ryckaert and Bellemans, 1975). Any Fourier series in $\phi$ up to $\cos 5\phi$ can be rewritten in this form and vice versa.
:::

::: example Conformers of butane {#ex-butane}
Using the Ryckaert–Bellemans potential, find the energies of the *anti* ($\phi = 180^\circ$) and *gauche* ($\phi = \pm 60^\circ$) minima, the *anti*–*gauche* barrier at $\phi = 120^\circ$ and the fully eclipsed ($\phi = 0^\circ$) barrier. Estimate the fraction of molecules in the *anti* conformer at $298\ \mathrm{K}$.
::: solution
At *anti*, $\psi = 0$ and $\cos\psi = 1$: $V = \sum C_n = 9.28 + 12.16 - 13.12 - 3.06 + 26.24 - 31.50 = 0.00\ \mathrm{kJ\,mol^{-1}}$ (the constants were chosen to put the zero there). At *gauche*, $\phi = 60^\circ$, $\psi = -120^\circ$ and $\cos\psi = -\tfrac{1}{2}$:
$$
V = 9.28 - 6.08 - 3.28 + 0.3825 + 1.64 + 0.984 = 2.93\ \mathrm{kJ\,mol^{-1}} .
$$
At $\phi = 120^\circ$, $\cos\psi = \tfrac{1}{2}$, giving $V = 9.28 + 6.08 - 3.28 - 0.3825 + 1.64 - 0.984 = 12.35\ \mathrm{kJ\,mol^{-1}}$; at $\phi = 0^\circ$, $\cos\psi = -1$, giving $V = 9.28 - 12.16 - 13.12 + 3.06 + 26.24 + 31.50 = 44.8\ \mathrm{kJ\,mol^{-1}}$. Treating each well as a single state, with two *gauche* wells,
$$
x_\mathrm{anti} = \frac{1}{1 + 2e^{-2930/(8.314 \times 298.15)}} = \frac{1}{1 + 2 \times 0.307} = 0.620 .
$$
Integrating the Boltzmann factor over the whole torsional range instead gives $0.65$, because the *anti* well is slightly wider. Experiment puts the gas-phase *gauche*–*anti* enthalpy difference near $2.8$–$3.8\ \mathrm{kJ\,mol^{-1}}$, so roughly two-thirds *anti* at room temperature.
:::
:::

::: widget plot
f: 9.28 + 12.16*cos(pi*(x-180)/180) - 13.12*cos(pi*(x-180)/180)^2 - 3.06*cos(pi*(x-180)/180)^3 + 26.24*cos(pi*(x-180)/180)^4 - 31.5*cos(pi*(x-180)/180)^5
x: 0, 360
y: -2, 48
vlines: 60; 180; 300
labels: V(\phi)/\mathrm{kJ\,mol^{-1}}
caption: The Ryckaert–Bellemans torsional potential of butane against the C–C–C–C dihedral angle $\phi$ in degrees. The *anti* minimum at $180^\circ$ is the global minimum; the two *gauche* minima at $60^\circ$ and $300^\circ$ lie $2.93\ \mathrm{kJ\,mol^{-1}}$ higher; the barriers between them are $12.35\ \mathrm{kJ\,mol^{-1}}$ (at $120^\circ$ and $240^\circ$) and $44.8\ \mathrm{kJ\,mol^{-1}}$ (fully eclipsed, $0^\circ$). Drag along the curve with the tangent to see that every minimum and maximum has zero slope, as [[computational-chemistry/potential-energy-surfaces#prop-stationary]] requires.
:::

In all-atom force fields the barrier about a C–C bond is shared between *all* torsions about it — nine H–C–C–H, C–C–C–H and C–C–C–C terms in butane — and the 1–4 non-bonded interactions between the end atoms also contribute. The torsion parameters are therefore fitted *last*, to reproduce quantum-chemical scans of the energy against $\phi$ after the non-bonded terms are fixed. Torsional parameters are the least transferable part of any force field, and the most common reason for adding new parameters for a new molecule.

**Improper torsions** (or out-of-plane terms) keep planar centres planar — an aromatic carbon, a carbonyl carbon, an amide nitrogen — by penalising pyramidalisation. Without them a $sp^{2}$ carbon held only by angle terms could flip out of plane at little cost.

## Non-bonded terms

### Van der Waals: the Lennard-Jones potential

Two neutral, closed-shell atoms attract weakly at long range — the London dispersion interaction, which falls off as $r^{-6}$ — and repel strongly when their electron clouds overlap. The exchange repulsion really decays exponentially, but the computationally convenient $r^{-12}$ (the square of $r^{-6}$) is almost universally used instead.

::: proposition The Lennard-Jones 12–6 potential {#prop-lj}
The potential
$$
V_\mathrm{LJ}(r) = 4\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^{6}\right]
$$
vanishes at $r = \sigma$, has its single minimum at $r_\mathrm{min} = 2^{1/6}\sigma \approx 1.122\,\sigma$ with depth $V(r_\mathrm{min}) = -\varepsilon$, and has curvature $V''(r_\mathrm{min}) = 72\varepsilon/(2^{1/3}\sigma^{2})$ there. Equivalently $V_\mathrm{LJ} = \varepsilon\left[(r_\mathrm{min}/r)^{12} - 2(r_\mathrm{min}/r)^{6}\right]$.
:::

::: proof
$V(\sigma) = 4\varepsilon(1 - 1) = 0$. Differentiating,
$$
V'(r) = 4\varepsilon\left[-\frac{12\sigma^{12}}{r^{13}} + \frac{6\sigma^{6}}{r^{7}}\right] = \frac{24\varepsilon}{r}\left[\left(\frac{\sigma}{r}\right)^{6} - 2\left(\frac{\sigma}{r}\right)^{12}\right],
$$
which vanishes when $(\sigma/r)^{6} = \tfrac{1}{2}$, i.e. $r_\mathrm{min} = 2^{1/6}\sigma$. Substituting $(\sigma/r_\mathrm{min})^{6} = \tfrac{1}{2}$ gives $V = 4\varepsilon\left(\tfrac{1}{4} - \tfrac{1}{2}\right) = -\varepsilon$. The second derivative is $V'' = 4\varepsilon\left[156\sigma^{12}/r^{14} - 42\sigma^{6}/r^{8}\right]$; at $r_\mathrm{min}$, $\sigma^{12}/r^{12} = \tfrac{1}{4}$ and $\sigma^{6}/r^{6} = \tfrac{1}{2}$, so $V'' = (4\varepsilon/r_\mathrm{min}^{2})(39 - 21) = 72\varepsilon/r_\mathrm{min}^{2} = 72\varepsilon/(2^{1/3}\sigma^{2})$. Since $V'' > 0$ and $V \to 0$ from below as $r \to \infty$, the minimum is the only stationary point. Writing $\sigma^{6} = r_\mathrm{min}^{6}/2$ gives the alternative form.
:::

::: example Argon {#ex-argon}
Lennard-Jones parameters fitted to the properties of liquid argon are $\varepsilon/k_\mathrm{B} = 119.8\ \mathrm{K}$ and $\sigma = 3.405\ \mathrm{\AA}$. Express the well depth in $\mathrm{kJ\,mol^{-1}}$, find the position of the minimum, and compare the depth with $RT$ at the normal boiling point, $87.3\ \mathrm{K}$.
::: solution
Per mole, $\varepsilon = R \times 119.8\ \mathrm{K} = 8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}} \times 119.8\ \mathrm{K} = 0.996\ \mathrm{kJ\,mol^{-1}}$. The minimum lies at $r_\mathrm{min} = 2^{1/6} \times 3.405\ \mathrm{\AA} = 3.822\ \mathrm{\AA}$, close to the nearest-neighbour distance in solid argon ($3.76\ \mathrm{\AA}$ at low temperature). At the boiling point $RT = 0.726\ \mathrm{kJ\,mol^{-1}}$, so $\varepsilon/RT = 1.37$: each pair is barely bound relative to thermal energy, but each atom in the liquid has about twelve neighbours, and the many weak attractions together hold the liquid together. Note that the parameters are *effective*: fitted to condensed-phase data, they include averaged three-body effects, and the depth differs from the true gas-phase pair potential (about $1.18\ \mathrm{kJ\,mol^{-1}}$ at $3.76\ \mathrm{\AA}$).
:::
:::

::: widget plot
f: 4*e*((s/x)^12 - (s/x)^6); -4*e*(s/x)^6
x: 2.8, 9
y: -1.5, 1.5
sliders: e=0.996:0.1:2:0.01; s=3.405:2.5:4.5:0.005
labels: V_\mathrm{LJ}(r); \text{dispersion } -4\varepsilon(\sigma/r)^6
hlines: 0
caption: The Lennard-Jones potential (energies in $\mathrm{kJ\,mol^{-1}}$, $r$ in ångström), starting with the argon parameters of [[#ex-argon]], and its attractive $r^{-6}$ part alone. Move $\sigma$ and the whole curve slides sideways; move $\varepsilon$ and it deepens. The repulsive wall is so steep that the potential crosses zero at $r = \sigma$ and has risen to $+\varepsilon$ only $0.1\,\sigma$ further in — which is why atoms in force fields behave almost like hard spheres of diameter $\sigma$.
:::

For a pair of different atom types the parameters are not fitted separately — there would be far too many pairs. Instead they are generated from the single-type parameters by **combining rules**.

::: definition Lorentz–Berthelot combining rules {#def-lorentz-berthelot}
For atoms of types $i$ and $j$,
$$
\sigma_{ij} = \tfrac{1}{2}(\sigma_{ii} + \sigma_{jj}), \qquad \varepsilon_{ij} = \sqrt{\varepsilon_{ii}\,\varepsilon_{jj}} .
$$
The arithmetic mean for $\sigma$ treats atoms as hard spheres in contact (Lorentz); the geometric mean for $\varepsilon$ is motivated by the London formula for dispersion between unlike atoms (Berthelot). Both are **empirical** rules; OPLS uses a geometric mean for $\sigma$ as well, and accurate work on rare-gas mixtures shows deviations of several per cent in $\varepsilon_{ij}$.
:::

### Electrostatics: partial charges

The Coulomb term between partial charges carries hydrogen bonding, ion pairing and solvation. In convenient molecular units,
$$
E_\mathrm{C} = \frac{q_i q_j e^{2} N_\mathrm{A}}{4\pi\varepsilon_0 r_{ij}} = 1389.35\ \mathrm{kJ\,mol^{-1}\,\AA}\times\frac{q_i q_j}{r_{ij}/\mathrm{\AA}},
$$
with $q$ in units of the elementary charge. Two charges of $\pm 0.40\,e$ at $3.0\ \mathrm{\AA}$ attract by $-74\ \mathrm{kJ\,mol^{-1}}$ — far more than any van der Waals contact — and the interaction falls off only as $1/r$, so it remains significant at $10$–$20\ \mathrm{\AA}$. Long-range electrostatics are the main technical problem of simulation, treated with Ewald summation in [[computational-chemistry/molecular-dynamics]].

Partial charges are not observables; there is no unique way to divide a molecule's electron density among its atoms. Modern force fields obtain them by fitting point charges to reproduce the **electrostatic potential** computed quantum-mechanically on a grid of points around the molecule. AMBER's RESP procedure (restrained electrostatic potential fitting) adds a restraint pulling charges on buried atoms towards zero, which makes the charges more stable from one conformation to another; OPLS charges were instead adjusted to reproduce the densities and heats of vaporisation of liquids.

::: example The TIP3P water dimer {#ex-tip3p}
The TIP3P water model is rigid, with $r_\mathrm{OH} = 0.9572\ \mathrm{\AA}$, $\angle\mathrm{HOH} = 104.52^\circ$, charges $q_\mathrm{O} = -0.834\,e$ and $q_\mathrm{H} = +0.417\,e$, and a single Lennard-Jones site on oxygen ($\sigma = 3.1506\ \mathrm{\AA}$, $\varepsilon = 0.6364\ \mathrm{kJ\,mol^{-1}}$). Minimising the dimer energy over the six intermolecular coordinates gives $E = -27.4\ \mathrm{kJ\,mol^{-1}}$ at $R_\mathrm{OO} = 2.75\ \mathrm{\AA}$, with a hydrogen bond $\mathrm{H\cdots O} = 1.79\ \mathrm{\AA}$. Decompose the energy and compare with the best quantum-chemical value, $D_e = 21.0\ \mathrm{kJ\,mol^{-1}}$ at $R_\mathrm{OO} = 2.91\ \mathrm{\AA}$.
::: solution
Summing the nine charge–charge terms at the optimum gives $-34.8\ \mathrm{kJ\,mol^{-1}}$; the single O–O Lennard-Jones term is $+7.4\ \mathrm{kJ\,mol^{-1}}$ (at $2.75\ \mathrm{\AA}$ the two oxygens are inside $\sigma$, on the repulsive wall). The hydrogen bond in this model is thus electrostatics held off by repulsion. TIP3P overbinds the isolated dimer by about $30\ \%$ and makes it too short. This is deliberate: the model was fitted to the *liquid*, where each molecule is polarised by its neighbours and has a dipole moment of about $2.6$–$3\ \mathrm{D}$ rather than the gas-phase $1.85\ \mathrm{D}$. TIP3P's fixed charges give a dipole of $2.35\ \mathrm{D}$, building in an average polarisation, and therefore cannot be right both in the gas phase and in the liquid. This is the defining limitation of **effective pair potentials**.
:::
:::

**Polarisable force fields** (AMOEBA, CHARMM Drude models) attach inducible dipoles or charges on springs to atoms so that the charge distribution responds to its environment. They are more transferable between phases at roughly three to ten times the cost.

### Exclusions and scaling

Atoms joined by one or two bonds (1–2 and 1–3 pairs) are excluded from the non-bonded sum, since their interaction is already contained in the bond and angle terms. The 1–4 pairs (the end atoms of a torsion) are included but scaled — by $1/1.2$ for electrostatics and $1/2$ for Lennard-Jones in AMBER, by $1/2$ for both in OPLS. These choices are interlocked with the torsion parameters fitted afterwards, which is one more reason why parameters cannot be moved from one force field to another.

::: quiz
A student takes the torsional parameters for a drug-like molecule from GAFF, the partial charges from an OPLS paper and the Lennard-Jones parameters from CHARMM, and finds that the computed conformational energies disagree badly with quantum-chemical scans. What is the most likely reason?
- [ ] One of the three sources contains a typographical error.
- [x] Force-field terms are fitted together: torsions are fitted after charges, Lennard-Jones parameters and 1–4 scaling are fixed, so terms from different force fields are not compatible.
- [ ] Molecular mechanics cannot describe conformational energies at all.
- [ ] Drug-like molecules need polarisable force fields.
::: solution
The torsional terms absorb whatever the non-bonded terms leave out along a torsional scan, and each force field uses its own charge scheme, combining rules, functional forms and 1–4 scaling factors. A force field is a self-consistent whole, and its parameters cannot be mixed piecemeal.
:::
:::

## Parameterisation

Where do thousands of parameters come from? A typical modern protocol is hierarchical:

1. **Equilibrium values** $r_0, \theta_0$ from experimental structures (microwave spectra, crystal structures) or from quantum-chemical optimisations.
2. **Force constants** $k_b, k_\theta$ from vibrational frequencies or quantum-chemical Hessians ([[computational-chemistry/potential-energy-surfaces#prop-normal-modes]]).
3. **Charges** from fits to quantum-chemical electrostatic potentials (RESP) or to liquid properties.
4. **Lennard-Jones parameters** by fitting densities and heats of vaporisation of liquids in simulations, and hydration free energies ([[computational-chemistry/free-energy-sampling]]). These are the most expensive to fit because each test requires a simulation.
5. **Torsions** last, as the difference between a quantum-chemical torsional scan and the force-field energy with all other terms included.

The fitting is a least-squares problem — minimise the weighted sum of squared deviations between force-field and reference properties — but a badly conditioned one: many parameters are correlated (a larger $\sigma$ can be compensated by a smaller $\varepsilon$ for some properties but not others), and the reference data are themselves uncertain. Recent force fields (OpenFF, for example) automate the process and fit to large quantum-chemical data sets. **Machine-learned potentials** go further, fitting a flexible function of the atomic environment to quantum energies and forces; they can describe bond breaking but are only as good as their training data.

## Conformational searching

A geometry optimisation finds the minimum of the basin it starts in ([[computational-chemistry/potential-energy-surfaces#alg-newton]]). A flexible molecule has a great many basins: if each of $n$ rotatable bonds has three staggered minima, there are up to $3^{n}$ conformers — $243$ for $n = 5$, $59\,049$ for $n = 10$. Finding the lowest, or the set of low-lying conformers that is populated at room temperature, is a global optimisation problem.

::: algorithm Conformational search {#alg-conformer-search}
1. **Generate** candidate structures, by one of: a *systematic* grid over all rotatable torsions (feasible up to about six to eight torsions); *stochastic* searches that randomly perturb torsions or Cartesian coordinates of a known conformer (Monte Carlo multiple-minimum); or *molecular dynamics at high temperature* followed by periodic quenching (simulated annealing).
2. **Minimise** each candidate with the force field.
3. **Remove duplicates** by comparing structures after optimal superposition (root-mean-square deviation below a threshold, typically $0.1$–$0.5\ \mathrm{\AA}$), taking care with symmetry-equivalent atoms.
4. **Repeat** until new low-energy conformers stop appearing (for stochastic methods, until every conformer within a chosen window, say $10\ \mathrm{kJ\,mol^{-1}}$, has been found several times).
5. **Re-rank** the low-energy set with a better method (DFT with dispersion corrections, in solvent if relevant), because force-field energy differences of a few $\mathrm{kJ\,mol^{-1}}$ are within force-field error.
:::

The cost of the systematic route grows exponentially with $n$, but the problem is smaller than $3^{n}$ suggests because many combinations clash sterically. In pentane, for instance, the *gauche*⁺–*gauche*⁻ combination brings the two terminal methyl groups into contact (the "syn-pentane" interaction), so that conformer lies far higher than the sum of two independent *gauche* penalties. The figure below shows a schematic version of this coupling.

::: widget contour
f: 9.28 + 12.16*cos(pi*(x-180)/180) - 13.12*cos(pi*(x-180)/180)^2 - 3.06*cos(pi*(x-180)/180)^3 + 26.24*cos(pi*(x-180)/180)^4 - 31.5*cos(pi*(x-180)/180)^5 + 9.28 + 12.16*cos(pi*(y-180)/180) - 13.12*cos(pi*(y-180)/180)^2 - 3.06*cos(pi*(y-180)/180)^3 + 26.24*cos(pi*(y-180)/180)^4 - 31.5*cos(pi*(y-180)/180)^5 + 13*exp(-((x-60)^2 + (y-300)^2)/800) + 13*exp(-((x-300)^2 + (y-60)^2)/800)
x: 0, 360
y: 0, 360
levels: 20
point: 180, 180
caption: A schematic conformational map of pentane: the Ryckaert–Bellemans potential for each of the two internal torsions ($\phi_1$ along $x$, $\phi_2$ along $y$, in degrees), plus a Gaussian penalty of $13\ \mathrm{kJ\,mol^{-1}}$ representing the syn-pentane clash at $(60^\circ, 300^\circ)$ and $(300^\circ, 60^\circ)$. Without the penalty the map would have $3 \times 3 = 9$ minima with energies equal to sums of single-torsion energies; with it, the $g^{+}g^{-}$ minima are destabilised and shifted. Drag the point to find the *anti–anti* global minimum at $(180^\circ, 180^\circ)$ and the saddle points between basins.
:::

## What force fields can and cannot do

Force fields are excellent for conformations and packing of molecules similar to their training set, for the structure and dynamics of liquids and biomolecules, and for relative free energies such as binding and solvation. With fixed connectivity they cannot describe reactions, and with fixed charges they describe charge transfer and strong polarisation (metal ions, $\pi$–cation interactions) poorly. Transition-metal centres, with their variable coordination and spin states, are especially difficult. Reactive force fields (ReaxFF) let bond orders vary with distance and can follow bond breaking at the cost of many more parameters, and QM/MM methods ([[computational-chemistry/solvation-qmmm]]) treat the reacting region quantum-mechanically and the rest with a force field.

## Where this leads

The force-field energy and its analytic gradient (every term is easy to differentiate) are the engine of molecular dynamics ([[computational-chemistry/molecular-dynamics]]) and Monte Carlo ([[computational-chemistry/free-energy-sampling]]), where they are evaluated millions of times. The quantum-chemical reference data used to parameterise force fields come from the methods of [[computational-chemistry/hartree-fock]] to [[computational-chemistry/density-functional-theory]], and the Lennard-Jones potential reappears in the theory of real gases and the radial distribution function of liquids in [[statistical-thermodynamics/real-gases-liquids]].

::: history
Molecular mechanics grew out of attempts to understand strain in organic molecules. Frank Westheimer and Joseph Mayer computed the energies of strained biphenyls with classical bond and van der Waals terms in 1946, and James Hendrickson made the first computer calculations of cycloalkane conformations in 1961. Norman Allinger's MM2 force field (1977) made the method a standard tool of organic chemistry. Shneior Lifson's consistent force field (1968) and the work of Arieh Warshel and Michael Levitt laid the foundations for treating proteins, and the AMBER and CHARMM programs (both early 1980s) and William Jorgensen's OPLS parameters (from 1984) brought biomolecular simulation into routine use. Jean-Paul Ryckaert and André Bellemans published their alkane torsion potential in 1975, and Jorgensen's TIP3P water model in 1983. The 2013 Nobel Prize in Chemistry to Martin Karplus, Michael Levitt and Arieh Warshel recognised the development of multiscale models built on these force fields.
:::

::: summary
- A force field writes the potential energy as harmonic bonds and angles, periodic torsions and pairwise Lennard-Jones and Coulomb terms, with parameters attached to atom types and fitted for transferability.
- Force-field energies are steric energies: meaningful for comparing conformations of one molecule, not for comparing different molecules.
- The Lennard-Jones potential has its minimum $-\varepsilon$ at $r = 2^{1/6}\sigma$; unlike pairs use empirical combining rules such as Lorentz–Berthelot.
- Partial charges are model quantities, fitted to electrostatic potentials or liquid properties; fixed-charge water models build in average liquid polarisation and overbind the gas-phase dimer.
- Torsions are fitted last, to quantum-chemical scans, and are the least transferable parameters; force fields cannot be mixed term by term, and conventions such as the factor of one-half must be checked.
- Conformational searching is global optimisation over up to $3^{n}$ minima, followed by re-ranking with a better method.
- Force fields cannot break bonds; reactive force fields, machine-learned potentials and QM/MM extend their reach.
:::

## Exercises

::: exercise Where is the minimum? {level=1 check="3.82"}
For argon, $\sigma = 3.405\ \mathrm{\AA}$. Where is the minimum of the Lennard-Jones potential? (Enter $r_\mathrm{min}$ in ångström.)
::: solution
$r_\mathrm{min} = 2^{1/6}\sigma = 1.12246 \times 3.405\ \mathrm{\AA} = 3.82\ \mathrm{\AA}$ ([[#prop-lj]]).
:::
:::

::: exercise A charge–charge interaction {level=1 check="-74.1"}
Compute the Coulomb energy between partial charges of $+0.40\,e$ and $-0.40\,e$ separated by $3.00\ \mathrm{\AA}$ in vacuum. (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$E = 1389.35\ \mathrm{kJ\,mol^{-1}\,\AA} \times (0.40)(-0.40)/3.00\ \mathrm{\AA} = -74.1\ \mathrm{kJ\,mol^{-1}}$. In water ($\varepsilon_\mathrm{r} \approx 78$) the screened interaction would be only about $-0.95\ \mathrm{kJ\,mol^{-1}}$, less than $RT$; but using a dielectric constant inside a force field is a crude substitute for explicit solvent or a continuum model ([[computational-chemistry/solvation-qmmm]]).
:::
:::

::: exercise Stretching a bond {level=1 check="3.24"}
With AMBER CT–CT parameters, $E = k_b(r - r_0)^{2}$ with $k_b = 310.0\ \mathrm{kcal\,mol^{-1}\,\AA^{-2}}$, what is the energy of a C–C bond stretched from $1.526$ to $1.576\ \mathrm{\AA}$? (Enter it in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$E = 310.0 \times (0.050)^{2} = 0.775\ \mathrm{kcal\,mol^{-1}} \times 4.184 = 3.24\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise A mixed pair {level=2 check="163"}
Xenon has $\varepsilon/k_\mathrm{B} = 221\ \mathrm{K}$ and $\sigma = 4.10\ \mathrm{\AA}$; argon has $119.8\ \mathrm{K}$ and $3.405\ \mathrm{\AA}$. Use the Lorentz–Berthelot rules to estimate the Ar–Xe parameters. (Enter $\varepsilon_{\mathrm{ArXe}}/k_\mathrm{B}$ in kelvin to three significant figures.)
::: solution
$\varepsilon_{ij}/k_\mathrm{B} = \sqrt{119.8 \times 221}\ \mathrm{K} = 163\ \mathrm{K}$ and $\sigma_{ij} = \tfrac{1}{2}(3.405 + 4.10)\ \mathrm{\AA} = 3.75\ \mathrm{\AA}$. Fits to Ar–Xe mixture data give a somewhat smaller well depth — the geometric mean tends to overestimate $\varepsilon$ for atoms of very different size, one reason why modern work prefers other rules (e.g. Waldman–Hagler) for such pairs.
:::
:::

::: exercise Butane populations {level=2 check="0.620"}
Treating each torsional well of butane as a single state, with the *gauche* conformers $2.93\ \mathrm{kJ\,mol^{-1}}$ above *anti*, compute the mole fraction of *anti* butane at $298.15\ \mathrm{K}$. (Enter the fraction to three significant figures.)
::: solution
$e^{-2930/(8.31446 \times 298.15)} = e^{-1.182} = 0.3067$, and there are two *gauche* wells, so $x_\mathrm{anti} = 1/(1 + 2 \times 0.3067) = 0.620$. The degeneracy factor of $2$ matters as much as the energy: at high temperature the fraction tends to $1/3$, not $1/2$.
:::
:::

::: exercise Sharing an ethane barrier {level=2 check="1.33"}
The experimental barrier to internal rotation of ethane is about $12.0\ \mathrm{kJ\,mol^{-1}}$. In an all-atom force field each of the nine H–C–C–H torsions carries a term $\tfrac{1}{2}V_3(1 + \cos 3\phi)$. Ignoring the 1–4 non-bonded contribution, what value of $V_3$ reproduces the barrier? (Enter $V_3$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
In the eclipsed conformation all nine dihedrals are $0^\circ$, $\pm120^\circ$ — each term at its maximum $V_3$; in the staggered conformation they are $60^\circ$, $180^\circ$, $300^\circ$ — each at zero. The barrier is therefore $9V_3$, so $V_3 = 12.0/9 = 1.33\ \mathrm{kJ\,mol^{-1}}$. In practice the H$\cdots$H 1–4 Lennard-Jones and Coulomb terms also vary with $\phi$, and the torsional parameter is fitted to the *remainder* of the barrier, which is why it differs between force fields.
:::
:::

::: exercise How much does a cutoff save? {level=3 check="11.9"}
A solvated protein has $5000$ atoms at an atom number density of $0.100\ \mathrm{\AA^{-3}}$. Compare the number of pairs in the full non-bonded sum with the number within a $10.0\ \mathrm{\AA}$ cutoff (ignore edge effects). By what factor does the cutoff reduce the work? (Enter the factor.)
::: hint
Each atom has about $\tfrac{4}{3}\pi r_\mathrm{c}^{3}\rho$ neighbours within the cutoff, and each pair is counted twice if you multiply by $N$.
:::
::: solution
All pairs: $N(N - 1)/2 = 5000 \times 4999/2 = 1.25\times10^{7}$. Neighbours per atom: $\tfrac{4}{3}\pi(10.0)^{3}(0.100) = 419$, so pairs within the cutoff number $5000 \times 419/2 = 1.05\times10^{6}$. The ratio is $1.250\times10^{7}/1.047\times10^{6} = 11.9$. The saving grows linearly with $N$: for a million-atom system it is a factor of about $2400$, which is why neighbour lists and cutoffs (with Ewald methods for the long-range Coulomb part) make large simulations possible.
:::
:::

::: exercise Derive the curvature of the Lennard-Jones well {level=3 check="26.3"}
Show that the curvature at the bottom of the Lennard-Jones well is $V'' = 72\varepsilon/r_\mathrm{min}^{2}$, and hence find the harmonic vibrational wavenumber of an argon dimer ($\varepsilon = 0.996\ \mathrm{kJ\,mol^{-1}}$, $r_\mathrm{min} = 3.822\ \mathrm{\AA}$, $\mu = 19.97\ \mathrm{u}$) in this model. (Enter $\tilde\nu$ in $\mathrm{cm^{-1}}$.)
::: solution
The derivation is the proof of [[#prop-lj]]. Per molecule $\varepsilon = 996/6.02214\times10^{23}\ \mathrm{J} = 1.654\times10^{-21}\ \mathrm{J}$, so $k = 72 \times 1.654\times10^{-21}\ \mathrm{J}/(3.822\times10^{-10}\ \mathrm{m})^{2} = 0.8152\ \mathrm{N\,m^{-1}}$ — about six hundred times weaker than the HCl bond. With $\mu = 19.97 \times 1.66054\times10^{-27}\ \mathrm{kg} = 3.316\times10^{-26}\ \mathrm{kg}$,
$$
\tilde\nu = \frac{1}{2\pi c}\sqrt{\frac{k}{\mu}} = \frac{4.958\times10^{12}\ \mathrm{s^{-1}}}{2\pi \times 2.99792\times10^{10}\ \mathrm{cm\,s^{-1}}} = 26.3\ \mathrm{cm^{-1}} .
$$
The zero-point energy, $13\ \mathrm{cm^{-1}}$, is a sixth of the well depth ($83\ \mathrm{cm^{-1}}$), and the real argon dimer has only a handful of bound vibrational levels: the harmonic picture is poor for such weakly bound systems.
:::
:::

::: exercise Fit a torsional term {level=3 check="10.1"}
A quantum-chemical scan about a C–C bond gives relative energies $0.0$ ($\phi = 180^\circ$), $11.5$ ($\phi = 120^\circ$) and $2.6\ \mathrm{kJ\,mol^{-1}}$ ($\phi = 60^\circ$). With all other force-field terms included, the force field *without* a torsion term gives $0.0$, $1.0$ and $1.5\ \mathrm{kJ\,mol^{-1}}$ at the same angles. Fit a torsion $\tfrac{1}{2}V_1(1 + \cos\phi) + \tfrac{1}{2}V_3(1 + \cos 3\phi)$ to the residuals, after shifting so that the residual at $180^\circ$ is the reference. (Enter $V_3$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
The residuals to be reproduced are $\Delta(180^\circ) = 0$, $\Delta(120^\circ) = 10.5$, $\Delta(60^\circ) = 1.1\ \mathrm{kJ\,mol^{-1}}$. The torsion function $T(\phi)$ has $T(180^\circ) = \tfrac{1}{2}V_1(0) + \tfrac{1}{2}V_3(1 - 1) = 0$; $T(120^\circ) = \tfrac{1}{2}V_1(1 - \tfrac{1}{2}) + \tfrac{1}{2}V_3(1 + 1) = \tfrac{1}{4}V_1 + V_3$; $T(60^\circ) = \tfrac{1}{2}V_1(1 + \tfrac{1}{2}) + \tfrac{1}{2}V_3(1 - 1) = \tfrac{3}{4}V_1$. Hence $V_1 = \tfrac{4}{3} \times 1.1 = 1.47\ \mathrm{kJ\,mol^{-1}}$ and $V_3 = 10.5 - \tfrac{1}{4} \times 1.47 = 10.1\ \mathrm{kJ\,mol^{-1}}$.
:::
:::
