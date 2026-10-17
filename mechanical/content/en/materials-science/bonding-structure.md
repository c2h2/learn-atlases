Every property of every engineering material is a consequence of one thing: the shape of the curve of energy against the separation of its atoms. How deep the well is decides the melting point and the heat of vaporisation. How steeply it curves at the bottom decides the elastic modulus, and nothing else does — not the alloying, not the heat treatment, not the work hardening, which is why a hundred billion pounds of steelmaking cannot make iron stiffer than iron. How asymmetric the well is decides how much the material expands when heated, and a material with a symmetric well would have zero thermal expansion and would be worth a fortune to the maker of telescope mirrors. And how the well behaves when the atoms are pulled past their neighbours decides whether the material yields or shatters.

This lesson puts numbers on that argument for the two families of facts that follow from it: the four kinds of atomic bond and their strengths, and the ways atoms stack into crystals. Everything after this — the defects of [[materials-science/defects-diffusion]], the dislocations of [[materials-science/dislocations-strengthening]], the phase diagrams of [[materials-science/phase-diagrams]] — is a story about how the ideal stacking shown here is imperfect, and how much good that imperfection does.

::: warning Stiffness is the one property you cannot improve
The elastic modulus is $\left. r_0 \, \mathrm{d}^{2} U / \mathrm{d} r^{2} \right|_{r_0}$, a property of the bond alone. No heat treatment, no alloying addition, no amount of cold work, no fibre orientation in a properly designed laminate and no manufacturing process changes it by more than a few per cent, because all of them act on the defects and none of them acts on the bond. Steel is $200\ \mathrm{GPa}$; the strongest maraging steel ever made is $195$; the cheapest mild steel is $207$. The corollaries are worth stating plainly, because students keep hoping otherwise. **A stiffer part is made with more material or a better shape, never with a better metal** — within a family. And **a stronger part is made with a worse crystal**: every strengthening mechanism in [[materials-science/dislocations-strengthening]] works by obstructing dislocation motion, which means by introducing defects, which means by making the metal more brittle, less fatigue-resistant at a crack tip, and further from the equilibrium its phase diagram predicts. Stiffness is a bond property and is fixed; strength is a defect property and is negotiable. The whole of materials selection is the negotiation.
:::

## Bonding

::: definition The four bonds and their numbers {#def-bonds}
**Ionic** — electron transfer, non-directional, Coulomb attraction $U \propto - q_1 q_2 / \left( 4 \pi \epsilon_0 r \right)$ between closed-shell ions. Large band gap, transparent to visible light, brittle, insulating, high melting point. Typical: $\mathrm{NaCl}$, $\mathrm{MgO}$, $\mathrm{Al_2 O_3}$.
**Covalent (network)** — electron sharing, **directional**, governed by orbital hybridisation. Hardest and stiffest of all, lowest thermal expansion, semiconducting or insulating, and — because directionality forbids dislocation glide — brittle at every temperature. Typical: diamond, $\mathrm{Si}$, $\mathrm{SiC}$, $\mathrm{Si_3 N_4}$, quartz.
**Metallic** — a delocalised electron gas in a lattice of positive cores; non-directional, close-packed, ductile, conducting in electricity and heat, opaque. Typical: all metals and their alloys.
**Molecular (secondary)** — discrete molecules held together by dipole-dipole, hydrogen or van der Waals (dispersion) forces one to two orders of magnitude weaker than the primary bonds. Polymers derive their strength from the covalent backbone and their **softness and low glass transition from the secondary bonds between chains**, which is why polyethylene creeps at room temperature and diamond does not.
Bond energies run $600\text{–}1000\ \mathrm{kJ / mol}$ for covalent and ionic, $100\text{–}400$ for metallic, $1\text{–}40$ for hydrogen and $0.1\text{–}5$ for van der Waals, and the melting points track them: carbon sublimes at $3640\ {}^{\circ}\mathrm{C}$, tungsten melts at $3422$, iron at $1538$, aluminium at $660$, sodium at $98$, argon at $- 189\ {}^{\circ}\mathrm{C}$.
:::

::: definition The bonding-energy curve and what it decides {#def-curve}
The pair potential is written in the Lennard-Jones form
$$
U (r ) = - \frac{A}{r^{m}} + \frac{B}{r^{n}}, \qquad m = 1 \ \text{or} \ 6, \quad n = 9 \ \text{to} \ 12,
$$
with a minimum at $r = r_0$ of depth $E_0$. Three properties follow by differentiation:
$$
E_{\mathrm{melt}} \propto E_0 , \qquad
\alpha_{\mathrm{thermal}} \propto \frac{1}{\mathrm{d}^{3} U / \mathrm{d} r^{3}} \ \text{(asymmetry)}, \qquad
E_{\mathrm{modulus}} = \frac{1}{r_0} \left. \frac{\mathrm{d}^{2} U}{\mathrm{d} r^{2}} \right|_{r_0} .
$$
The modulus is a **curvature**, the melting point a **depth**, and the expansion coefficient an **asymmetry** — which is why they correlate loosely and can be decoupled deliberately. Invar $\mathrm{Fe} - 36\ \%\mathrm{Ni}$ has a normal bond and a near-zero expansion because a magnetic ordering transition supplies a contraction that cancels the lattice's own; a few engineering alloys reach $\alpha \approx 0$ and cost a fortune per kilogram.
:::

::: widget plot
f: pow(1/x,12) - 2*pow(1/x,6); pow(1-exp(-6*(x-1)),2) - 1
x: 0.85, 1.75
y: -1.4, 2.5
labels: Lennard-Jones; Morse
caption: Two pair potentials normalised to the same well depth and the same minimum at $r / r_0 = 1$. Both are strongly asymmetric — the repulsive wall is steep and the attractive tail shallow — and the asymmetry is thermal expansion. The Morse form, which is closer to reality for a directional bond, is more asymmetric still and its dissociation is gradual. The curvature at the bottom of either well is the elastic modulus, and it is a local property of a small region of the curve, which is why a property measured at $10^{- 3}$ strain knows nothing about the tail that governs fracture.
:::

::: example Modulus, melting point and the asymmetry {#ex-curve-numbers}
Diamond, iron, aluminium and polyethylene have moduli of $1050$, $207$, $69$ and $0.8\ \mathrm{GPa}$ and melting or softening points of $3550$, $1538$, $660$ and $130\ {}^{\circ}\mathrm{C}$. Show that the two properties track the bond type and not the density or the atomic mass.
::: solution
**The ranking is the bond.** Diamond is network covalent with an enthalpy of atomisation of $717\ \mathrm{kJ}$ per mole of atoms — twice the $346\ \mathrm{kJ / mol}$ carbon-carbon bond energy, because each atom owns four half-bonds; iron is metallic with a partially filled $3d$ band and $416\ \mathrm{kJ / mol}$; aluminium is metallic with a free-electron bond of $326\ \mathrm{kJ / mol}$; polyethylene has a $346\ \mathrm{kJ / mol}$ carbon-carbon backbone but softens by **interchain van der Waals** forces of $5\ \mathrm{kJ / mol}$, which is why it softens at $130\ {}^{\circ}\mathrm{C}$ and not at $4000$.
**Density is not the cause.** Lead is denser than aluminium and has a modulus a fifth of aluminium's; magnesium is lighter than steel and stiffer per kilogram than steel is. The correct comparison is modulus **per unit density**, which for a covalent solid is unbeatable:
$$
\frac{E}{\rho}: \quad \text{diamond} \ 299, \quad \mathrm{B_4 C} \ 179, \quad \mathrm{Be} \ 155, \quad \mathrm{SiC} \ 132, \quad \text{steel, Al, Ti} \ 26\ \left[ \mathrm{GN\, m\, kg^{- 1}} \right] .
$$
**The asymmetry shows up as expansion.** $\alpha$ at room temperature is $1 \times 10^{- 6}\ \mathrm{K^{- 1}}$ for diamond, $12$ for iron, $23$ for aluminium, $29$ for lead and $200$ for polyethylene, in $10^{- 6}\ \mathrm{K^{- 1}}$ — a two-hundred-fold range that tracks the well's asymmetry and the well depth together, and that has made diamond the substrate of choice for high-power electronics where the heat has to go somewhere and the part must not move.

*Check.* A useful scaling: $E \approx 6 E_0 / \left( \pi N_A r_0 a^{2} \right)$ with $a$ the interatomic spacing, which for diamond with $r_0 = 0.154\ \mathrm{nm}$ gives an order-of-magnitude $10^{3}\ \mathrm{GPa}$ and for polyethylene's interchain spacing of $0.4\ \mathrm{nm}$ and $5\ \mathrm{kJ / mol}$ gives $10^{0}\ \mathrm{GPa}$ $\checkmark$

*Sanity.* The one place this argument is routinely misapplied is the hope that a new alloy will be stiffer than an old one. The largest modulus change achievable by alloying a metal is about ten per cent — tungsten in iron raises the modulus of some steels from $200$ to $210\ \mathrm{GPa}$, and the same tungsten costs thirty times what the iron does. Where stiffness is the constraint the answer is geometry, a different crystal family, or a fibre composite in which the stiff phase carries the load along the fibres and the polymer matrix does nothing but hold them apart.
:::
:::

## Crystal structures

::: definition The three common metals and their bookkeeping {#def-structures}
Cubic cells of edge $a$ containing atoms of radius $R$ in contact along the closest direction:

| Structure | Contact direction | $a$ in $R$ | Atoms per cell | Coordination | Atomic packing factor |
|---|---|---|---|---|---|
| Simple cubic | $\left\langle 100\right\rangle$ | $2 R$ | $1$ | $6$ | $0.52$ |
| Body-centred cubic, BCC | $\left\langle 111\right\rangle$ | $4 R / \sqrt{3}$ | $2$ | $8$ | $0.68$ |
| Face-centred cubic, FCC | $\left\langle 110\right\rangle$ | $2 \sqrt{2} R$ | $4$ | $12$ | $0.74$ |
| Hexagonal close-packed, HCP | $\left\langle 11\bar{2} 0\right\rangle$ | $a = 2 R,\ c / a = 1.633$ | $6$ | $12$ | $0.74$ |

The density follows from
$$
\rho = \frac{n A}{N_A V_c},
$$
with $n$ atoms of molar mass $A$ in a cell of volume $V_c$. The **theoretical density** so computed exceeds the measured density of a real polycrystal by the porosity, typically less than one per cent in a wrought metal and ten per cent in a sintered one — a difference that is itself a non-destructive measure of porosity.
:::

::: definition Allotropy, polymorphism and the structures that go with them {#def-allotropy}
Most engineering elements and all ceramics adopt different structures at different temperatures and pressures, and the transformation is a first-order phase change with latent heat, hysteresis and a volume change.
**Iron**: BCC $\alpha$ to $912\ {}^{\circ}\mathrm{C}$, FCC $\gamma$ to $1394$, BCC $\delta$ to the melt. The $\alpha \rightarrow \gamma$ transformation on heating **contracts** the metal by about one per cent, because the packing factor rises from $0.68$ to $0.74$; on cooling it expands, and every heat-treatment distortion and quench crack in the steel industry descends from that one per cent.
**Titanium**: HCP $\alpha$ to $882\ {}^{\circ}\mathrm{C}$, then BCC $\beta$. The $\beta$ phase is the one that can be solution-treated and aged, which is why every titanium alloy is named for the phase it retains at room temperature.
**Carbon**: graphite at ambient pressure, $\rho = 2.26$; diamond at high pressure, $\rho = 3.51$. The fifty per cent density difference is why a diamond anvil cell reaches a megabar and why a graphite inclusion in cast iron makes the casting expand as it solidifies and therefore cast to close tolerance.
**Zirconia**: monoclinic to tetragonal at $1170\ {}^{\circ}\mathrm{C}$ with a four per cent volume change that cracks a pure-zirconia refractory to powder; the addition of eight per cent yttria retains the cubic structure to room temperature and gives the transformation-toughened ceramic of dental crowns and thermal-barrier coatings.
:::

::: example Theoretical density of copper and of iron's two phases {#ex-density}
Copper is FCC with $a = 0.3615\ \mathrm{nm}$ and $A = 63.546$. Iron is BCC with $a = 0.2866\ \mathrm{nm}$ at room temperature and FCC with $a = 0.3663\ \mathrm{nm}$ at $912\ {}^{\circ}\mathrm{C}$; $A = 55.845$. Compute the densities and the volume per atom of each.
::: solution
**Copper.** Four atoms per cell:
$$
\rho_\mathrm{Cu} = \frac{4 \times 63.546}{6.022 \times 10^{23} \times \left( 3.615 \times 10^{- 8} \right)^{3}}
= \frac{254.2}{28.45} = 8.93\ \mathrm{g / cm^{3}} .
$$
**$\alpha$-iron.** Two atoms per cell:
$$
\rho_\alpha = \frac{2 \times 55.845}{6.022 \times 10^{23} \times \left( 2.866 \times 10^{- 8} \right)^{3}} = 7.88\ \mathrm{g / cm^{3}} .
$$
**$\gamma$-iron.** Four atoms per cell:
$$
\rho_\gamma = 7.55\ \mathrm{g / cm^{3}} \quad \text{at} \ 912\ {}^{\circ}\mathrm{C} .
$$
**Volume per atom.** $V_\alpha = a^{3} / 2 = 0.01177\ \mathrm{nm^{3}}$ and $V_\gamma = a^{3} / 4 = 0.01229\ \mathrm{nm^{3}}$, a difference of $4.4\ \%$ — but the $\gamma$ value is measured at $912\ {}^{\circ}\mathrm{C}$ and includes about $4\ \%$ of thermal expansion, so the two structures at the transformation temperature occupy very nearly the same volume and the true transformation strain is the residual one per cent.

*Check.* The atomic radius implied by each structure: copper $R = a / \left( 2 \sqrt{2} \right) = 0.1278\ \mathrm{nm}$, $\alpha$-iron $R = a \sqrt{3} / 4 = 0.1241\ \mathrm{nm}$, $\gamma$-iron $R = a / \left( 2 \sqrt{2} \right) = 0.1295\ \mathrm{nm}$. The radius is not a constant — it is $4\ \%$ larger in the more closely packed structure, which is the coordination-radius correction every table of ionic radii carries and which a first-year calculation of this kind ignores. $\checkmark$

*Sanity.* The measured density of electrolytic copper is $8.89$ against the theoretical $8.93$, a $0.5\ \%$ deficit that is grain-boundary volume and quench vacancies. In a sintered part the same calculation gives the relative density directly, and a sintered bearing advertised at "ninety per cent theoretical density" has ten per cent porosity that will hold oil — which is the point of making it that way.
:::
:::

## Direction, planes and diffraction

::: definition Miller indices, planar density and slip systems {#def-miller}
A plane is indexed by the reciprocals of its intercepts with the cell edges, cleared of fractions and written $\left( hkl \right)$; a direction is a vector in lattice coordinates written $\left[ uvw \right]$, and a family is $\left\{ hkl \right\}$ or $\left\langle uvw \right\rangle$. For a cubic cell the interplanar spacing is
$$
d_{hkl} = \frac{a}{\sqrt{h^{2} + k^{2} + l^{2}}} ,
$$
and the direction $\left[ uvw \right]$ is normal to the plane $\left( uvw \right)$ **only in the cubic system** — in hexagonal indices the four-index Miller-Bravais scheme $\left( hkil \right)$ with $i = - \left( h + k \right)$ is used precisely because the three-index scheme hides the symmetry.
**Plastic slip occurs on the closest-packed plane in the closest-packed direction**, because that combination has the widest dislocation core and the lowest Peierls stress. The count of slip systems decides ductility:
$$
\begin{array}{l l l l}
\text{FCC} & \left\{ 111 \right\} \left\langle 110\right\rangle & 4 \times 3 & = 12 \ \text{systems, very ductile} \
\text{BCC} & \left\{ 110 \right\} \left\langle 111\right\rangle + \left\{ 112 \right\} + \left\{ 123 \right\} & \text{many} & \text{ductile but strongly temperature-dependent} \
\text{HCP} & \left\{ 0001 \right\} \left\langle 11\bar{2} 0\right\rangle & 1 \times 3 & = 3 \ \text{systems, brittle unless } c / a \ne 1.633
\end{array}
$$
The **von Mises criterion** requires five independent slip systems for arbitrary plastic strain in a polycrystal without opening grain boundaries; FCC and BCC have twelve or more, HCP has three at best, and this single number is why magnesium and zinc polycrystals are brittle at room temperature, why titanium with its prismatic and pyramidal systems is not, and why a hexagonal texture in a rolled sheet gives anisotropic drawing behaviour.
:::

::: definition Diffraction and the extinction rules {#def-diffraction}
Bragg's law,
$$
n \lambda = 2 d_{hkl} \sin \theta ,
$$
with $\lambda_{\mathrm{Cu}\, K \alpha} = 0.15406\ \mathrm{nm}$, gives the diffractometer's peak positions, and the **structure factor** decides which reflections are present:
$$
\begin{array}{l l}
\text{FCC} & hkl \ \text{all odd or all even} \
\text{BCC} & h + k + l \ \text{even} \
\text{HCP} & - h + k + l \ \text{even for the first two-index families} .
\end{array}
$$
The consequence is that the first three peaks of an FCC pattern come from $\left( 111 \right), \left( 200 \right), \left( 220 \right)$ and the first three of a BCC pattern from $\left( 110 \right), \left( 200 \right), \left( 211 \right)$, and the **ratio of the squared sines** of the half-angles identifies the structure without knowing the lattice parameter:
$$
\frac{\sin^{2} \theta_2}{\sin^{2} \theta_1} = \frac{h_2^{2} + k_2^{2} + l_2^{2}}{h_1^{2} + k_1^{2} + l_1^{2}} .
$$
For FCC the sequence of $h^2 + k^2 + l^2$ is $3, 4, 8, 11, 12, 16, \ldots$, for BCC it is $2, 4, 6, 8, 10, 12, \ldots$ and for the primitive cubic cell $1, 2, 3, 4, 5, 6, 8, \ldots$ The three sequences are disjoint at their first term and the indexing is unique after three peaks. No cubic lattice gives a $7$ or a $15$, because no sum of three integer squares equals a number of the form $4^{m} \left( 8 n + 7 \right)$, and a peak that will not index is a second phase, not a mistake in the rule.
:::

::: example Identifying a structure from a diffraction pattern {#ex-diffraction}
An unknown metal gives X-ray peaks at $2 \theta = 43.32^{\circ}$, $50.45^{\circ}$, $74.13^{\circ}$, $89.94^{\circ}$ and $95.15^{\circ}$ with copper radiation. Identify the structure, the lattice parameter and the element.
::: solution
**The ratio test.** With $\sin^{2} \theta$ proportional to $h^2 + k^2 + l^2$:
$$
\begin{array}{c c c c c}
2 \theta & 43.32 & 50.45 & 74.13 & 89.99 \
\sin^{2} \theta & 0.1362 & 0.1816 & 0.3632 & 0.4995 \
\text{ratio} & 1.000 & 1.333 & 2.667 & 3.667 \
\times 3 & 3 & 4 & 8 & 11
\end{array}
$$
The sequence $3, 4, 8, 12$ — with no $5$, $6$ or $7$ — is the FCC sequence $\left( 111 \right), \left( 200 \right), \left( 220 \right), \left( 311 \right)$ $\checkmark$
**The lattice parameter.** From $\left( 111 \right)$, $d = \lambda / \left( 2 \sin \theta \right) = 0.15406 / 0.7382 = 0.2087\ \mathrm{nm}$ and $a = d \sqrt{3} = 0.3615\ \mathrm{nm}$.
**The element.** FCC with $a = 0.3615\ \mathrm{nm}$ is copper, whose tabulated value is $0.36150\ \mathrm{nm}$; the atomic radius follows as $a / \left( 2 \sqrt{2} \right) = 0.1278\ \mathrm{nm}$ and the theoretical density as $8.93\ \mathrm{g / cm^{3}}$.

*Check.* The $\left( 200 \right)$ reflection predicts $\sin^{2} \theta = \left( 0.15406 / \left( 2 \times 0.3615 / 2 \right) \right)^{2} = 0.1817$ against the measured $0.1817$ $\checkmark$

*Sanity.* The peak positions were computed from the same lattice parameter used to identify the metal, so this example is a closed loop; the real procedure is the reverse and the real difficulty is not the indexing but the **preferred orientation**. A rolled sheet of copper has its $\left( 111 \right)$ planes parallel to the surface, and a powder-scan of that sheet gives a $\left( 111 \right)$ peak five times too strong and a $\left( 220 \right)$ peak half as strong as the tables say. The fix is to grind the surface, rotate the sample, or use a diffractometer with the sample spinning about two axes — and the fact that the texture is measurable at all is the reason a rolling mill can make a transformer core a thousand times better in one direction than in the other.
:::
:::

::: example Single-crystal anisotropy and polycrystalline averaging {#ex-anisotropy}
Iron has $E_{100} = 132\ \mathrm{GPa}$ and $E_{111} = 283\ \mathrm{GPa}$ along the cube edge and the body diagonal. Compute the ratio, explain its sign, and estimate the polycrystalline modulus.
::: solution
**The ratio is $2.14$.** The anisotropy is quantified by Zener's ratio
$$
A = \frac{2 C_{44}}{C_{11} - C_{12}} ,
$$
which is unity for an elastically isotropic cubic crystal. For iron $C_{11} = 231.4$, $C_{12} = 134.6$, $C_{44} = 116.0\ \mathrm{GPa}$, giving $A = 232 / 96.8 = 2.40$ — one of the most anisotropic common metals. For aluminium $A = 1.20$ and for tungsten $A = 1.01$, both nearly isotropic; for copper $A = 3.21$, the most anisotropic of the common FCC metals.
**The sign.** The $\left\langle 111\right\rangle$ direction in a BCC lattice is the close-packed direction, with nearest neighbours at $a \sqrt{3} / 2 = 0.248\ \mathrm{nm}$ against $a = 0.287\ \mathrm{nm}$ along $\left\langle 100\right\rangle$, and the compliance combination that governs $\left\langle 111\right\rangle$ loading draws on $C_{44}$ least and on $C_{11} - C_{12}$ most. Loading along the closer direction stretches more bonds per unit strain and stiffer bonds at once.
**The polycrystal.** With $K = \left( C_{11} + 2 C_{12} \right) / 3 = 167\ \mathrm{GPa}$ and the Voigt and Reuss shear averages
$$
G_V = \frac{C_{11} - C_{12} + 3 C_{44}}{5} = 89.0 , \qquad
G_R = \frac{5 C_{44} \left( C_{11} - C_{12} \right)}{4 C_{44} + 3 \left( C_{11} - C_{12} \right)} = 74.4\ \mathrm{GPa},
$$
the Hill approximation takes $G = 81.7\ \mathrm{GPa}$ and
$$
E_{\mathrm{Hill}} = \frac{9 K G}{3 K + G} = 211\ \mathrm{GPa} ,
$$
against the measured $207$ for a random polycrystal. A **textured** sheet departs from this by tens of per cent between directions, which is the whole of the difference between a steel that deep-draws a car door and one that ears at the corners.

*Check.* The Voigt and Reuss moduli for iron are $227$ and $194\ \mathrm{GPa}$, a spread of $17\ \%$ that scales with the anisotropy; for aluminium the two are $71.5$ and $71.3$, a spread of $0.3\ \%$, and an aluminium sheet is isotropic whatever the mill does to it. $\checkmark$

*Sanity.* Two technologies live on this anisotropy and one dies by it. Silicon for microelectromechanical systems is cut on $\left\langle 111\right\rangle$-oriented wafers because $E_{111} / E_{100} = 1.45$ changes the deflection of a diaphragm by half. Transformer steel is rolled into a Goss texture $\left\{ 110 \right\} \left\langle 001\right\rangle$ because iron's magnetic easy axis is $\left\langle 100\right\rangle$, and the texture roughly halves the core loss in the rolling direction at the cost of making the transverse direction much worse. And a single-crystal turbine blade, grown without grain boundaries at all and oriented with $\left\langle 001\right\rangle$ along the stress, deliberately uses the **softest** direction of a nickel superalloy — the one chosen for creep and thermal-fatigue life rather than for stiffness, because the $\gamma^{\prime}$ precipitates shear more easily on that orientation and the blade tolerates the resulting strain by having no grain boundary at which cavities could nucleate.
:::
:::

::: example Design {#ex-design-structure}
Select the crystal structure and processing route for a component that must combine low density, high specific stiffness and the ability to be formed into a complex shape at modest temperature.
::: solution
**Screen on specific stiffness.** The candidates and their $E / \rho$ in $\mathrm{GN\, m\, kg^{- 1}}$:
$$
\begin{array}{l c c c}
\text{Material} & E\ \left[ \mathrm{GPa} \right] & \rho\ \left[ \mathrm{g / cm^{3}} \right] & E / \rho \
\text{Magnesium AZ31, HCP} & 45 & 1.77 & 25 \
\text{Aluminium 6061, FCC} & 69 & 2.70 & 26 \
\text{Titanium Ti-6Al-4V, HCP} & 114 & 4.43 & 26 \
\text{Steel, BCC} & 207 & 7.85 & 26 \
\text{CFRP, unidirectional T800} & 163 & 1.58 & 103 \
\text{Beryllium, HCP} & 287 & 1.85 & 155
\end{array}
$$
**The first result is a shock and is exactly right.** Every isotropic metal has the same specific stiffness to within ten per cent, because $E / \rho$ is set by the bond energy, the atomic mass and the atomic volume, and those three scale together across the whole periodic table. There is no metal that is both light and stiff, and the search for one is the shortest dead end in materials engineering.
**The second result is the design.** Specific stiffness can be raised only by (i) putting the stiffness where the load goes, with a fibre, which is why CFRP reaches $103$ along the fibres, or (ii) using a stiff **shape**, for which the relevant index is $E^{1 / 3} / \rho$ for a stiff panel and $E^{1 / 2} / \rho$ for a stiff beam.
**Formability at modest temperature.** Magnesium's three basal slip systems make it hard to form cold and it is warm-formed at $200$ to $300\ {}^{\circ}\mathrm{C}$; aluminium's twelve FCC systems make it the easiest engineering metal to form; titanium's HCP $\alpha$ needs $500\ {}^{\circ}\mathrm{C}$ and an argon atmosphere.
**Choice.** For a formed, complex, light, moderately stiff part the answer is aluminium, and the reason is not its modulus but its twelve slip systems, its $400\ {}^{\circ}\mathrm{C}$ recrystallisation and its price. Where the stiffness index dominates, the answer is CFRP or beryllium, and the forming question becomes a lay-up question or a machining question, because beryllium is made by powder metallurgy and its dust is a chronic lung hazard that has ended more than one laboratory.

*Design comment.* The lesson of the table is the single most useful idea in materials selection and it is worth stating as a rule: **for stiffness-limited, weight-limited design, all metals are the same material.** The corollary is that the choice among metals is never made on stiffness — it is made on strength, cost, corrosion, formability, conductivity, toughness, temperature capability or fatigue, in that order of how often it decides. The choice of metal **matrix** for a composite is made on the matrix's own properties, which are then almost irrelevant, because the fibre carries the load and the matrix only distributes it; and the choice of **fibre** is made on $E / \rho$, where carbon at $103$ beats steel at $26$ and glass-epoxy at $23$ does not beat steel at all — the reason glass fibre is chosen for strength, stiffness-per-pound-of-cost and damage tolerance, and never for stiffness alone.
:::
:::

::: history
The idea that atoms sit on a lattice is **René Just Haüy**'s, who in 1784 dropped a crystal of calcite in a fireplace, noticed that every fragment was a rhombohedron, and inferred a structure of identical building blocks; his *Traité de minéralogie* of 1801 stated the law of rational indices that still carries his name. **William Hyde Wollaston** proposed the cubic, face-centred and body-centred cubic lattices in 1813 by counting the angles of real crystals. The eleven lattice types of two dimensions and the fourteen of three were proved independently by **Evgraf Fedorov** in 1885 and **Arthur Morley Schoenflies** in 1891; **William Lawrence Bragg** derived his law at twenty-two in 1912, in a sentence written on a scrap of paper for his father **William Henry Bragg**, and the two shared the 1915 Nobel Prize. **Max von Laue**, **Paul Knipping** and **Walter Friedrich**'s 1912 diffraction photograph of copper sulphate proved the lattice and the wavelength at once. The close-packed structures and their stacking sequences were worked out by **Peter Debye and Paul Scherrer** in 1918 and by **William Lawrence Bragg** in 1913, and the identification of FCC and HCP as the two stackings $ABCABC$ and $ABAB$ is in Bragg's 1913 paper. **William Hume-Rothery**'s rules of 1926-1934 on solubility, from a career begun as a schoolmaster without a degree, connected the structures to the electron concentration and the atomic size. The Goss texture of transformer steel is **George Goss**'s 1935 paper, and the single-crystal turbine blade was **Pratt & Whitney**'s alloy PWA 1480, developed through the 1970s for the F100 engine, which replaced the directionally solidified MarM-247 blades whose grain boundaries had limited the turbine-entry temperature by two hundred degrees.
:::

## Where this leads

The bond-energy curve reappears as the activation energy of [[materials-science/defects-diffusion]], the packing factor decides which interstitial sites are big enough to hold carbon in [[materials-science/phase-diagrams]], the slip-system count is the whole of the strengthening argument of [[materials-science/dislocations-strengthening]], and the elastic anisotropy of Example 6 is the reason [[materials-science/material-families]] composites behave nothing like metals.

::: summary
- The bonding-energy curve's depth gives the melting point, its curvature gives the elastic modulus and its asymmetry gives the thermal expansion coefficient; the four bond types span four decades in each.
- The modulus is a bond property and cannot be improved by alloying, heat treatment or work hardening; strength is a defect property and can be improved by a factor of a thousand.
- For stiffness-limited lightweight design all metals have the same specific stiffness to ten per cent; only fibres and shapes break the rule.
- FCC, BCC and HCP differ in packing factor, coordination and — decisively — in the number of slip systems, which is why FCC metals are ductile, BCC metals are temperature-sensitive and HCP metals are brittle.
- Density follows from the cell contents, and the gap between theoretical and measured density measures porosity.
- Diffraction identifies structure from the ratios of $\sin^2 \theta$ alone, and the extinction rules of FCC and BCC make the identification unambiguous; texture is the practical complication and sometimes the product.
:::

::: quiz
A designer asks for a magnesium alloy with a twenty per cent higher modulus than AZ31. What is the honest answer?
- [x] Not achievable — the modulus is set by the bond and no alloying or processing changes it by more than a few per cent
- [ ] Achievable by ageing to peak hardness
- [ ] Achievable by rolling a strong basal texture
- [ ] Achievable by adding scandium in solid solution
::: solution
Solid-solution, precipitate and texture changes move a metal's modulus by a few per cent at most; a twenty per cent increase would require a different bond. What **is** achievable is a twenty per cent increase in the modulus **measured along a rolled direction** in a textured sheet, which is a shape effect in disguise and disappears when the part is machined from the plate.
:::
:::

## Exercises

::: exercise Coordination {level=1 check="12"}
What is the coordination number of the face-centred cubic structure?
::: solution
Twelve — six in the plane, three above and three below.
:::
:::

::: exercise Atoms per cell {level=1 check="2"}
How many atoms belong to a body-centred cubic unit cell?
::: solution
Two — eight corners at one eighth each plus one centre.
:::
:::

::: exercise APF {level=1 check="0.68"}
Compute the atomic packing factor of BCC with $a = 4R/\sqrt{3}$.
::: solution
$2 \times \frac{4}{3} \pi R^{3} / a^{3} = 0.68$.
:::
:::

::: exercise Slip systems {level=1 check="5"}
How many independent slip systems does the von Mises criterion require for general polycrystalline plastic strain?
::: solution
Five.
:::
:::

::: exercise Extinction {level=1 check="2"}
Which value of $h + k + l$ is allowed for a body-centred cubic reflection?
::: solution
Even only — the first reflection is $\left( 110 \right)$ with $h + k + l = 2$.
:::
:::

::: exercise Radius {level=2}
Silver is FCC with $a = 0.4086\ \mathrm{nm}$ and $A = 107.87$. Give the atomic radius and the theoretical density.
::: solution
$R = a / \left( 2 \sqrt{2} \right) = 0.1445\ \mathrm{nm}$ and
$$
\rho = \frac{4 \times 107.87}{6.022 \times 10^{23} \times \left( 4.086 \times 10^{- 8} \right)^{3}} = 10.51\ \mathrm{g / cm^{3}} .
$$
*Sanity.* The measured density of silver is $10.49$, a $0.2\ \%$ deficit; silver is one of the few metals whose theoretical and measured densities agree to better than a third of a per cent, because it is normally made and annealed free of both porosity and dissolved gas.
:::
:::

::: exercise Planar density {level=2}
Give the planar densities of the $\left( 111 \right)$ and $\left( 100 \right)$ planes of copper with $a = 0.3615\ \mathrm{nm}$ and take their ratio.
::: solution
$$
\rho_{111} = \frac{4}{\sqrt{3} a^{2}} = 17.67\ \mathrm{nm^{- 2}}, \qquad
\rho_{100} = \frac{2}{a^{2}} = 15.30\ \mathrm{nm^{- 2}},
$$
a ratio of $1.155$.
*Sanity.* The $\left( 111 \right)$ plane covers $90.7\ \%$ of its area with atomic circles, which is the densest possible packing of equal circles in a plane and the reason slip goes there; the $15\ \%$ difference in planar density is also the $15\ \%$ difference in the surface energy of the two faces, which is why an annealed copper crystal etches with $\left( 111 \right)$ facets and why a silicon solar cell textured in alkaline solution becomes a pyramid of $\left\{ 111 \right\}$ faces that traps light.
:::
:::

::: exercise Bragg {level=2}
Tungsten is BCC with $a = 0.3165\ \mathrm{nm}$. At what $2\theta$ does its second diffraction peak fall with copper radiation?
::: solution
The BCC sequence gives $\left( 110 \right)$ then $\left( 200 \right)$; $d_{200} = 0.3165 / 2 = 0.1583\ \mathrm{nm}$ and
$$
\sin \theta = \frac{0.15406}{2 \times 0.1583} = 0.4867, \qquad \theta = 29.12^{\circ}, \qquad 2 \theta = 58.24^{\circ} .
$$
*Sanity.* The $\left( 200 \right)$ peak of tungsten at $58.2^{\circ}$ sits close to the $\left( 111 \right)$ peak of iron at $44.7^{\circ}$ and the $\left( 200 \right)$ of iron at $65.0^{\circ}$, which is why a tungsten filament in a high-temperature diffractometer produces its own peaks beside the specimen's and why the pattern must be taken with the filament off, or the peaks indexed out.
:::
:::

::: exercise Derivation {level=3}
Derive the atomic packing factor of the hexagonal close-packed structure and show that the ideal $c / a$ ratio is $1.633$.
::: solution
**The geometry.** Six atoms lie in a basal plane around a seventh, and an eighth sits in the triangular hollow above the plane's centre. Taking nearest-neighbour distance $a = 2 R$, the upper atom is horizontally displaced by $a / \sqrt{3}$ from a basal atom, so
$$
\left( \frac{c}{2} \right)^{2} + \left( \frac{a}{\sqrt{3}} \right)^{2} = a^{2}
\quad\Longrightarrow\quad
\frac{c}{2} = a \sqrt{ \frac{2}{3} }
\quad\Longrightarrow\quad
\frac{c}{a} = \sqrt{ \frac{8}{3} } = 1.633 .
$$
**The packing.** The cell contains six atoms and has volume $\frac{3 \sqrt{3}}{2} a^{2} c$, so
$$
\mathrm{APF} = \frac{6 \times \frac{4}{3} \pi R^{3}}{\frac{3 \sqrt{3}}{2} a^{2} c}
= \frac{8 \pi \left( a / 2 \right)^{3}}{\frac{3 \sqrt{3}}{2} a^{2} \cdot a \sqrt{8 / 3}}
= \frac{\pi a^{3}}{4.2426\, a^{3}} = 0.7405 ,
$$
identical to the face-centred cubic value, as it must be since both are close packings of the same spheres and differ only in stacking sequence. $\checkmark$
*Sanity.* Real HCP metals depart from the ideal ratio because the bond is not a sphere: magnesium has $c / a = 1.624$, zinc $1.856$ and cadmium $1.886$. The large ratios of zinc and cadmium mean the basal planes are further apart than hard spheres require, which is why their interlayer bonding is weak, why they cleave along the basal plane, and why a block of zinc can be split with a knife — a property no FCC or BCC metal shares. Titanium's ratio of $1.587$ is **below** ideal, which pushes atoms into the basal plane, activates non-basal slip at modest temperatures, and makes titanium, with zirconium, formable into sheet at temperatures where magnesium, zinc and cadmium cannot be.
:::
:::

::: exercise Design {level=3}
A space mechanism needs a structural member of $500\ \mathrm{mm}$ length that must not change length by more than $10\ \mu\mathrm{m}$ over the temperature range $- 40$ to $+ 60\ {}^{\circ}\mathrm{C}$, and must weigh less than $200\ \mathrm{g}$. Screen aluminium, steel, Invar and carbon-fibre composite.
::: solution
**Thermal.** The allowance is $10 / 500{,}000 = 20\ \mu\varepsilon$ over $100\ \mathrm{K}$, so $\alpha \le 0.2 \times 10^{- 6}\ \mathrm{K^{- 1}}$.
$$
\begin{array}{l c c}
\text{Material} & \alpha\ \left[ 10^{- 6}\ \mathrm{K^{- 1}} \right] & \Delta L\ \left[ \mu\mathrm{m} \right] \
\text{Aluminium} & 23 & 1150 \
\text{Steel} & 12 & 600 \
\text{Invar} & 1.2 & 60 \
\text{CFRP, unidirectional along fibres} & - 0.9 & - 45 \
\text{CFRP, quasi-isotropic} & 5 & 250
\end{array}
$$
**No isotropic metal passes**, and Invar fails by a factor of six.
**The composite.** A carbon fibre has a **negative** axial expansion coefficient of $- 0.9 \times 10^{- 6}\ \mathrm{K^{- 1}}$ and a large positive transverse one of $+ 28$, so a laminate's expansion is a lay-up variable. A $\left[ 0 / \pm 60 \right]$ laminate of intermediate-modulus fibre reaches $\alpha \approx 0$ and can be tuned to within $\pm 0.5 \times 10^{- 6}$ by adjusting the angle.
**Mass.** A $200\ \mathrm{g}$ tube of $500\ \mathrm{mm}$ length and $20\ \mathrm{mm}$ diameter has a mean circumference of $62.8\ \mathrm{mm}$, so the available wall is $200 / \left( 500 \times 62.8 \rho \right)$: $4.0\ \mathrm{mm}$ in CFRP and $0.79\ \mathrm{mm}$ in Invar. Mass is not the binding constraint for either; the thermal allowance is, and only the composite meets it.
**Choice.** CFRP with a tuned lay-up, and the design constraint is not the expansion but the **joint**: bonding CFRP to an aluminium fitting gives a bimetallic couple that both corrodes and, at $- 40\ {}^{\circ}\mathrm{C}$, shears the adhesive because aluminium shrinks $\left( 23 - 0 \right) \times 10^{- 6} \times 140 = 3200\ \mu\varepsilon$ more than the tube.

*Sanity.* This is the actual design problem of an optical bench, and the real answer is CFRP with a controlled cure-induced residual strain, because the **cure** shrinkage of the resin, which produces part-level strains of the order of a thousand microstrains, dwarfs the thermal allowance and must be measured on a witness panel and compensated in the tool geometry. The second real answer is silicon carbide or a glass-ceramic such as Zerodur for a mirror, where the requirement is not low expansion alone but low expansion **and** isotropy **and** polishability, and where CFRP cannot be made smooth enough to figure.
:::
:::
