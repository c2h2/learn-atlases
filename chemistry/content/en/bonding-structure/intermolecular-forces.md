A covalent bond is strong: it takes about $350\ \mathrm{kJ\,mol^{-1}}$ to break a $\mathrm{C-C}$ bond and over $460\ \mathrm{kJ\,mol^{-1}}$ to break the $\mathrm{O-H}$ bond of water. Yet boiling ethanol takes only $39\ \mathrm{kJ\,mol^{-1}}$, and boiling water $41\ \mathrm{kJ\,mol^{-1}}$ — and neither process breaks any bond at all. Ethanol vapour is intact $\mathrm{C_2H_5OH}$ molecules; steam is intact $\mathrm{H_2O}$. What vaporisation overcomes is not the forces *within* molecules but the much weaker ones *between* them: typically one to ten per cent of a covalent bond's strength. That small number decides everything about the bulk world. It decides that at $298\ \mathrm{K}$ chlorine is a pale gas, bromine a volatile liquid and iodine a grey solid, although all three are non-polar diatomic molecules of the same family. It decides that water boils $160\ \mathrm{K}$ above hydrogen sulfide: the group-16 hydrides boil at $\mathrm{H_2S}$ $-60.3\ \mathrm{^\circ C}$, $\mathrm{H_2Se}$ $-41.3\ \mathrm{^\circ C}$, $\mathrm{H_2Te}$ $-2.2\ \mathrm{^\circ C}$ (standard tabulated data), and extrapolating that smooth trend back to the period-2 member predicts water at roughly $-80$ to $-90\ \mathrm{^\circ C}$ — a liquid at room temperature only because something extra is holding it together. And the same forces, multiplied across a billion contact points, let a gecko walk up glass on pads of hairs whose tips stick to the wall by nothing but electron-cloud fluctuations. This chapter is about those forces: what they are, why they have the size they do, and how to use them to rank boiling points, solubilities and viscosities.

## Intermolecular versus intramolecular

::: definition Intermolecular forces and the van der Waals family {#def-intermolecular}
An **intramolecular** force is a chemical bond: it holds the atoms of one molecule together, and breaking it changes the substance's identity. An **intermolecular force** acts *between* molecules, between a molecule and an ion, or between a molecule and a surface; it changes how molecules arrange and move relative to one another but never their identity. All intermolecular attractions have a **potential energy minimum**: two non-bonded partners far apart neither attract nor repel, at moderate separation a weak attraction lowers the energy, and at close separation the overlap of electron shells produces steep repulsion. The separation at the minimum is a *contact distance* — roughly the sum of two van der Waals radii — and the depth of the minimum, typically $0.1$–$40\ \mathrm{kJ\,mol^{-1}}$, is the strength of the interaction. The **van der Waals forces** are the three electrostatic interactions between neutral, non-bonded species: the **Keesom** (orientation) force between two permanent dipoles, the **Debye** (induction) force between a permanent dipole and the dipole it induces in a neighbour, and the **London** (dispersion) force between instantaneous, correlated dipoles. Hydrogen bonding and ion–dipole attraction are added to the family as distinct, stronger interactions.
:::

Two features of the definition repay attention. First, the energy minimum is shallow, so intermolecular forces are constantly being broken and reformed by thermal motion: at $\mathrm{298\ K}$ the thermal energy is $k_\mathrm{B}T = 2.48\ \mathrm{kJ\,mol^{-1}}$ per particle, comparable to most of them. That is why liquids flow and gases exist at all. Second, unlike a covalent bond an intermolecular force is **not saturable in the electron-counting sense** — a molecule can be attracted by every neighbour it touches — but it is **short-ranged**: all three van der Waals terms fall off as $r^{-6}$, so doubling the separation cuts the attraction sixty-four-fold. Compare the Coulomb interaction between ions, which falls as $r^{-1}$ and reaches across the whole crystal; that difference in range is why ionic solids melt at $800\ \mathrm{^\circ C}$ and molecular solids at $100\ \mathrm{^\circ C}$.

::: widget plot
f: 4*a*((1/x)^12-(1/x)^6)
sliders: a=0.3:0.1:2
x: 0.85, 3
y: -2.5, 2
labels: \text{Lennard-Jones pair potential}
caption: The Lennard-Jones pair potential $U(x) = 4a\left[(1/x)^{12} - (1/x)^{6}\right]$, a standard model of a van der Waals contact: $x$ is the separation measured in units of the molecular diameter $\sigma$, and the slider $a$ (in $\mathrm{kJ\,mol^{-1}}$) is the well depth $\varepsilon$. Slide $a$ and the well deepens without moving: the *position* of the minimum is fixed by the geometry, at $x = 2^{1/6} \approx 1.12$, where the depth is exactly $a$. Note the steep wall below $x = 1$ (shell overlap) and the gentle $r^{-6}$ tail beyond — contrast the $r^{-1}$ Coulomb well of [[bonding-structure/ionic-bonding]], which has no minimum without a repulsive partner and reaches ten times further out. A well of $a \approx 2\ \mathrm{kJ\,mol^{-1}}$ is barely deeper than $k_\mathrm{B}T$ at room temperature: such contacts break constantly, which is why these substances are gases and liquids.
:::

## London dispersion: the universal attraction

::: proposition London dispersion forces {#prop-london}
Every molecule — polar or not — possesses an **instantaneous dipole**: at any instant the electrons are not symmetrically distributed, and the time-averaged spherical charge cloud conceals a fluctuating one. This instantaneous dipole distorts the electron cloud of a neighbour, inducing a dipole in it, and the two fluctuate *in step*: the correlation makes the interaction attractive at every instant. Second-order quantum-mechanical perturbation theory gives, for two identical spherical partners at separation $r$,
$$
U_\mathrm{disp} \approx -\frac{3}{4}\cdot\frac{\alpha^{2} I}{(4\pi\varepsilon_0)^{2}\, r^{6}},
$$
where $\alpha$ is the polarisability (how easily the cloud distorts) and $I$ the ionisation energy (how tightly it is held); for different partners $\alpha^2 I$ is replaced by a combination of order $\alpha_1 \alpha_2 I$. Dispersion is **always present**, and for non-polar species it is the *only* intermolecular force. It grows with the number of electrons and their polarisability, and because every atom of one molecule attracts every atom of the other, it is **additive over the contact area** between molecules.
:::

The polarisability $\alpha$ is the quantity to develop an intuition for: it measures how far the electron cloud's centre can be pushed from the nucleus by an electric field, and it grows steeply down a group (the outer electrons are further out and more screened — see [[general-chemistry-1/periodicity]]) and from right to left across a period. Expressed as a polarisability volume $\alpha/(4\pi\varepsilon_0)$, helium's is $0.2\times10^{-30}\ \mathrm{m^{3}}$ and xenon's about twenty times larger; the same trend runs through the halogens and the chalcogens. Because dispersion is additive over contacts, *shape matters as much as size*: a long molecule can lie flat against its neighbours, while a compact one touches few.

::: example The halogen boiling-point ladder {#ex-halogen-ladder}
The halogens boil at $\mathrm{F_2}$ $-188\ \mathrm{^\circ C}$, $\mathrm{Cl_2}$ $-34\ \mathrm{^\circ C}$, $\mathrm{Br_2}$ $59\ \mathrm{^\circ C}$ and $\mathrm{I_2}$ $184\ \mathrm{^\circ C}$ (standard tabulated data). Explain the ladder, and what it says about the state of each element at $\mathrm{298\ K}$.
::: solution
All four molecules are non-polar, so the *only* force holding the liquid together is dispersion. Down the group the electron count rises from $18$ ($\mathrm{F_2}$) to $106$ ($\mathrm{I_2}$), the clouds become far more polarisable, and the dispersion well deepens by hundreds of $\mathrm{J\,mol^{-1}}$ per added shell — boiling points climb by $154$, $93$ and $125\ \mathrm{K}$ per step. At $\mathrm{298\ K}$ the thermal energy $k_\mathrm{B}T$ comfortably defeats the wells of $\mathrm{F_2}$ and $\mathrm{Cl_2}$ (both gases), roughly matches $\mathrm{Br_2}$ (a liquid that fumes — its well is deep enough to hold a liquid but not a bench-top bottle), and clearly defeats neither $\mathrm{I_2}$ (a solid, though one with a violet vapour pressure, since the surface molecules at the crystal's edge still escape). One interaction, one variable — polarisability — spans all three states of matter.
:::
:::

The shape argument in action is the pentane isomers. n-Pentane, $\mathrm{CH_3CH_2CH_2CH_2CH_3}$, boils at $36.1\ \mathrm{^\circ C}$; isopentane (2-methylbutane) at $27.8\ \mathrm{^\circ C}$; neopentane (2,2-dimethylpropane) at $9.5\ \mathrm{^\circ C}$ (standard tabulated data). Same formula, same molar mass, same dispersion per atom-pair — but the roughly spherical neopentane can only touch its neighbours at a point, while the rod-like n-pentane lies along them with a large contact area, and the number of attractive atom–atom contacts is what counts.

## Orientation and induction: forces between polar molecules

::: proposition Orientation (Keesom) and induction (Debye) forces {#prop-orientation-induction}
Two permanent dipoles $\mu_1$ and $\mu_2$ at separation $r$ interact with an energy
$$
U_\mathrm{dipole} = \frac{\mu_1 \mu_2}{4\pi\varepsilon_0\, r^{3}}\, f(\theta_1, \theta_2, \phi),
$$
where $f$ is an angular factor of order unity: head-to-tail the pair attracts, side-by-side it repels. In a fluid the molecules rotate, and the *first-order* angular average of $f$ is exactly zero — which is why polar molecules do not simply electrostatically lock. But the interaction biases the rotation: a little more time is spent in attracting orientations than repelling ones, and the residual, thermally averaged **Keesom** energy is
$$
U_\mathrm{Keesom} = -\frac{2}{3}\cdot\frac{\mu_1^{2}\mu_2^{2}}{(4\pi\varepsilon_0)^{2}\, k_\mathrm{B}T\, r^{6}},
$$
attractive, proportional to $r^{-6}$, and — uniquely — *inversely proportional to temperature*, because rotation works against the ordering. A dipole $\mu$ also polarises a neutral neighbour of polarisability $\alpha$, and the induced dipole is attracted to its cause: the **Debye induction** energy is
$$
U_\mathrm{Debye} = -\frac{\alpha\, \mu^{2}}{(4\pi\varepsilon_0)^{2}\, r^{6}}.
$$
Typical magnitudes in ordinary fluids: Keesom $0.5$–$2\ \mathrm{kJ\,mol^{-1}}$, Debye smaller still, dispersion $0.1$ to several tens of $\mathrm{kJ\,mol^{-1}}$.
:::

::: proof The Keesom average {#proof-keeesom}
Write $U = \dfrac{\mu_1\mu_2}{4\pi\varepsilon_0 r^{3}}\, f$ with $f = \cos\gamma - 3\cos\theta_1\cos\theta_2$, where $\theta_i$ are the angles each dipole makes with the separation axis and $\gamma$ is the angle between the dipoles. Averaging over all independent orientations (subscript $0$): $\langle f \rangle_0 = 0$ because each cosine averages to zero, so the first-order interaction vanishes — the naive "average of the energy" is zero. Expand the Boltzmann factor to second order. The interaction free energy of the pair is $A = -k_\mathrm{B}T \ln \langle e^{-U/k_\mathrm{B}T}\rangle_0$; with $\langle U \rangle_0 = 0$,
$$
A \approx -k_\mathrm{B}T \ln\left(1 + \frac{\langle U^{2}\rangle_0}{2 (k_\mathrm{B}T)^{2}}\right) \approx -\frac{\langle U^{2}\rangle_0}{2 k_\mathrm{B}T}.
$$
The second moment does not vanish: using $\langle\cos^{2}\gamma\rangle_0 = \tfrac13$, $\langle\cos^{2}\theta_1\cos^{2}\theta_2\rangle_0 = \tfrac19$ and $\langle\cos\gamma\cos\theta_1\cos\theta_2\rangle_0 = \tfrac19$, one finds $\langle f^{2}\rangle_0 = \tfrac13 + 9\cdot\tfrac19 - 6\cdot\tfrac19 = \tfrac43$. Hence
$$
A = -\frac{1}{2 k_\mathrm{B}T}\left(\frac{\mu_1\mu_2}{4\pi\varepsilon_0 r^{3}}\right)^{2}\cdot\frac{4}{3} = -\frac{2}{3}\cdot\frac{\mu_1^{2}\mu_2^{2}}{(4\pi\varepsilon_0)^{2} k_\mathrm{B}T\, r^{6}}.
$$
Three lessons in one line. The force is *always attractive* (a second-order effect cannot change sign); it is $r^{-6}$, the same range as dispersion, because squaring the dipole field's $r^{-3}$ is what produced the power; and it carries $1/k_\mathrm{B}T$ in the denominator — heat the fluid and the orientation force weakens, because rotation erases the bias. For two $\mathrm{HCl}$ molecules ($\mu = 1.08\ \mathrm{D}$) at $350\ \mathrm{pm}$ and $\mathrm{298\ K}$ the formula gives $0.7\ \mathrm{kJ\,mol^{-1}}$: real, but well below $k_\mathrm{B}T$ and below the dispersion force in the same molecule. Orientation forces matter most between strongly polar molecules in cold, dense fluids.
:::

::: example Three molecules of mass 46 {#ex-mass-46}
Ethanol boils at $78.4\ \mathrm{^\circ C}$, dimethyl ether at $-24.8\ \mathrm{^\circ C}$ and propane at $-42\ \mathrm{^\circ C}$ (standard tabulated data). The first two have identical molar mass ($46.07\ \mathrm{g\,mol^{-1}}$); propane's is only $44.10\ \mathrm{g\,mol^{-1}}$. Account for the $100\ \mathrm{K}$ spread.
::: solution
Count what each molecule can do. Propane has no dipole and no hydrogen on an electronegative atom: dispersion only, and its boiling point is the baseline. Dimethyl ether, $\mathrm{CH_3OCH_3}$, is bent and polar (dipole–dipole and induction act, plus dispersion) and its oxygen carries lone pairs — but it has no $\mathrm{O-H}$ bond, so it cannot *donate* a hydrogen bond to itself; a $30\ \mathrm{K}$ rise over propane is what the polar terms buy. Ethanol has the same polar skeleton *plus* an $\mathrm{O-H}$ bond: it donates and accepts hydrogen bonds, and molecules in liquid ethanol are chained into a transient network. Hydrogen bonding — the subject of the next section — supplies the remaining $70\ \mathrm{K}$. Identical mass, identical dispersion budget, three boiling points: the difference is entirely in what the molecules present to each other's surfaces.
:::
:::

## Hydrogen bonding

::: proposition The hydrogen bond {#prop-hydrogen-bonding}
A **hydrogen bond** is the attraction $\mathrm{X-H\cdots Y}$ in which a hydrogen covalently bonded to a small, strongly electronegative atom $\mathrm{X}$ (in practice N, O or F) is attracted to a lone pair on a second electronegative atom $\mathrm{Y}$. Energies run $10$–$40\ \mathrm{kJ\,mol^{-1}}$ — far above the van der Waals forces, far below covalent bonds — and the interaction is strongly **directional**: it is strongest when $\mathrm{X-H\cdots Y}$ are collinear. The requirements are severe because the proton must be small (so the positive charge is concentrated and can approach $\mathrm{Y}$ closely) and $\mathrm{X}$ electronegative (so the $\mathrm{H}$ carries a large partial positive charge). Fluorine satisfies both best: $\mathrm{F-H\cdots F}$ is the strongest common hydrogen bond.
:::

The evidence is the hydride trend lines. Down each group the binary hydrides boil higher as dispersion grows — except for the period-2 members, which sit absurdly above the line: $\mathrm{HF}$ boils at $19.5\ \mathrm{^\circ C}$ where the $\mathrm{HCl}$ ($-85\ \mathrm{^\circ C}$) → $\mathrm{HBr}$ ($-66\ \mathrm{^\circ C}$) → $\mathrm{HI}$ ($-35\ \mathrm{^\circ C}$) trend extrapolates to near $-110\ \mathrm{^\circ C}$; $\mathrm{NH_3}$ ($-33\ \mathrm{^\circ C}$) stands $54\ \mathrm{K}$ above $\mathrm{PH_3}$ ($-88\ \mathrm{^\circ C}$); and water, as the introduction showed, is $160\ \mathrm{K}$ above its own trend. In each case the molecule has H on N, O or F — and can therefore hydrogen-bond to itself.

Water is the paradigm. Each $\mathrm{H_2O}$ has two donor $\mathrm{O-H}$ bonds and two lone-pair acceptors, so in the liquid and in ice every molecule forms, on average, **two donated and two accepted hydrogen bonds** — a tetrahedrally connected, open, three-dimensional network. The network's geometry is the reason ice is *less dense than liquid water*: in ice Ih each molecule's four neighbours sit at the corners of a tetrahedron held at hydrogen-bonding distance, an open framework of hexagonal channels with density $0.917\ \mathrm{g\,cm^{-3}}$, while in the liquid at $0\ \mathrm{^\circ C}$ some bonds are broken and collapsed and the density rises to $0.9998\ \mathrm{g\,cm^{-3}}$ (standard tabulated data) — a nine per cent expansion on freezing, which is why ice floats and lakes freeze from the top down. No other common substance's solid floats on its liquid for this reason.

One paragraph on biology's debt to a $20\ \mathrm{kJ\,mol^{-1}}$ interaction: the two strands of the DNA double helix are held together by hydrogen bonds between complementary bases — two between adenine and thymine, three between guanine and cytosine — whose *directionality* is what makes the pairing specific, while the stacking of the bases on each other is largely dispersion between polarisable aromatic rings. Because individual hydrogen bonds are weak, the double helix can be unzipped by heating a few tens of degrees; because there are billions of them, the intact molecule is stable. Specificity from directionality, reversibility from weakness: the design runs through all of molecular recognition.

::: quiz
Which has the higher boiling point, and why?
- [x] $\mathrm{HF}$: it hydrogen-bonds between molecules, while $\mathrm{HCl}$ relies on dispersion and dipole–dipole forces — the anomaly outweighs $\mathrm{HCl}$'s greater polarisability.
- [ ] $\mathrm{HCl}$: chlorine is more polarisable than fluorine, and dispersion always wins.
- [ ] $\mathrm{HCl}$: its larger dipole moment dominates.
- [ ] They are nearly equal, because $\mathrm{HF}$'s hydrogen bonds are offset by $\mathrm{HCl}$'s stronger dispersion.
::: solution
$\mathrm{HF}$ boils at $19.5\ \mathrm{^\circ C}$ and $\mathrm{HCl}$ at $-85\ \mathrm{^\circ C}$ — a $105\ \mathrm{K}$ gap in the "wrong" direction for a dispersion argument. Within the series $\mathrm{HCl < HBr < HI}$ dispersion does control the order, exactly as polarisability predicts; $\mathrm{HF}$ breaks the pattern because its molecules associate into chains and rings through $\mathrm{F-H\cdots F}$ hydrogen bonds. Dispersion is not "the weak one" in general (see below), but here the hydrogen bond is several times larger than the dispersion difference between the two molecules, and it wins.
:::
:::

## Forces in competition: boiling points, solubility, viscosity

::: example When dispersion beats the dipole {#ex-chloromethanes}
The chloromethanes boil at $\mathrm{CH_3Cl}$ $-24\ \mathrm{^\circ C}$ ($\mu = 1.9\ \mathrm{D}$), $\mathrm{CH_2Cl_2}$ $40\ \mathrm{^\circ C}$ ($\mu = 1.6\ \mathrm{D}$), $\mathrm{CHCl_3}$ $61\ \mathrm{^\circ C}$ ($\mu = 1.0\ \mathrm{D}$) and $\mathrm{CCl_4}$ $76.7\ \mathrm{^\circ C}$ ($\mu = 0$) (standard tabulated data). Boiling point rises smoothly as the dipole moment *falls*. How?
::: solution
Each substitution of H by Cl removes a little molecular polarity but adds ten electrons and a large, polarisable chlorine to the molecular surface. The Keesom term is a small, temperature-diluted correction (a fraction of $k_\mathrm{B}T$), whereas dispersion is additive over every contact and grows with every electron: from $\mathrm{CH_3Cl}$ to $\mathrm{CCl_4}$ the dispersion well deepens by far more than the orientation well empties. The lesson generalises: "polar molecules boil higher" is a rule for *nearby* molecules of similar size and shape; once polarisability differs, dispersion overrules the dipole. Tetrachloromethane — perfectly non-polar — out-boils chloromethane by a hundred kelvin.
:::
:::

::: example Why ethanol mixes with water but hexan-1-ol barely does {#ex-solubility-water}
Ethanol is miscible with water in all proportions; hexan-1-ol, $\mathrm{CH_3(CH_2)_5CH_2OH}$, dissolves only about $5.9\ \mathrm{g}$ per litre of water at $20\ \mathrm{^\circ C}$ (standard tabulated data). And sodium chloride dissolves in water but not in hexane. Analyse both observations in terms of intermolecular forces.
::: solution
Dissolving means replacing solute–solvent attractions for the solute–solute and solvent–solvent attractions being broken. Ethanol's $\mathrm{O-H}$ group donates and accepts hydrogen bonds with water, and its two-carbon tail costs little; the exchange is nearly even, and the entropy of mixing drives the process to full miscibility. Hexan-1-ol has the same head but a six-carbon tail: to accommodate it, water must break hydrogen bonds along the tail's length and rebuild them as a cage around it, while the tail gives back only weak dispersion. The solubility limit — $5.9\ \mathrm{g\,L^{-1}}$ divided by $102.17\ \mathrm{g\,mol^{-1}}$ is $0.058\ \mathrm{mol\,L^{-1}}$, about one hexanol molecule per thousand waters — is where the hydrogen-bond accounting stops paying. Every added $\mathrm{CH_2}$ cuts the solubility roughly three- to four-fold: the hydrophobic effect is not a new force but an unpaid hydrogen-bond bill. Sodium chloride is the same ledger with bigger numbers: water's ion–dipole attraction (tens to hundreds of $\mathrm{kJ\,mol^{-1}}$ per water in the first shell) pays the lattice enthalpy almost exactly — hydration of $\mathrm{Na^+}$ and $\mathrm{Cl^-}$ together releases about $780\ \mathrm{kJ\,mol^{-1}}$ against a lattice enthalpy of $+787\ \mathrm{kJ\,mol^{-1}}$, leaving a small $+3.9\ \mathrm{kJ\,mol^{-1}}$ that the entropy of dissolution covers (standard tabulated data; see [[bonding-structure/ionic-bonding]] for the cycle). Hexane offers only dispersion: nothing can pay the lattice bill at all, and the salt sits at the bottom, undissolved.
:::
:::

::: example Surface tension and viscosity: the same network, felt two ways {#ex-surface-tension}
Water's surface tension is $72.8\ \mathrm{mN\,m^{-1}}$ at $20\ \mathrm{^\circ C}$ and hexane's about $18\ \mathrm{mN\,m^{-1}}$; water's viscosity is $1.00\ \mathrm{mPa\,s}$ and hexane's $0.30\ \mathrm{mPa\,s}$, while glycerol, $\mathrm{HOCH_2CH(OH)CH_2OH}$, reaches about $1.4\ \mathrm{Pa\,s}$ (standard tabulated data). Explain.
::: solution
Surface tension is the energy cost of moving a molecule from the bulk to the surface, where it loses roughly half its neighbours; viscosity is the drag on molecules sliding past one another. Both scale with the depth and connectivity of the intermolecular potential wells. Hexane molecules are held only by dispersion, so both numbers are small. Water's hydrogen-bond network must be broken locally to create surface or to let flow occur, raising both by factors of four to three. Glycerol carries three $\mathrm{O-H}$ groups per molecule: it donates and accepts a dense, three-dimensional hydrogen-bond network, and the resulting drag is some fourteen hundred times water's — a syrup. The pattern is general: viscosity and surface tension are bulk readings on the same molecular-scale instrument this chapter has been calibrating.
:::
:::

::: warning Three misconceptions about "weak" forces {#warn-dispersion-weak}
**Hydrogen bonds are not covalent bonds.** They are ten to twenty times weaker, they do not count toward valence, and they do not change which molecule is which — though they are not purely electrostatic either, having a small partial-covalent (charge-transfer) component. Call one a "bond" and students start drawing $\mathrm{O-H}$ bonds to the wrong atom; the honest name is a strong, directional intermolecular *interaction*. **Dispersion is not "the weak one".** It is the only force in non-polar species, it is additive over contact area, and for large polarisable systems it dominates everything else: it is dispersion that holds a paraffin wax crystal together, that lets a gecko's setae grip glass through a billion point contacts, and that stacks DNA bases. The Keesom and Debye terms are usually the small ones. **"Polar means higher boiling point" fails when dispersion differs.** The chloromethanes of [[#ex-chloromethanes]] boil higher as their dipoles shrink; always compare molecules of comparable size and polarisability before crediting the dipole.
:::

::: history
Johannes Diderik van der Waals gave the first quantitative expression of "molecules take up room and attract each other" in his 1873 doctoral thesis, adding the pressure correction $a$ and volume correction $b$ to the ideal gas law — the equation of state that still carries his name and that earned him the 1910 Nobel Prize in Physics. The individual forces waited on the dipole concept: Willem Keesom derived the orientation force between rotating dipoles in 1912, and Peter Debye — whose work on polar molecules and dipole moments in 1912–1920 established induction and gave the polar molecule its modern meaning — the induction force in 1920. The last and most universal member arrived by quantum mechanics: in 1930 Fritz London showed that the correlated fluctuations of two closed-shell electron clouds attract with an energy proportional to the polarisabilities and to the ionisation energy, and inversely to $r^{6}$ — explaining why helium condenses at all, and giving dispersion its name and its formula. The full family now hangs together as one electrostatic story, told in four papers across fifty-seven years.
:::

## Where this leads

The hydrogen-bonded network described here is exactly what freezes into the open lattice of ice, one of the **molecular crystals** counted in [[bonding-structure/solid-structures]]; that chapter also shows why dispersion makes solid iodine and dry ice soft and volatile. Vapour pressure, evaporation and the thermodynamics of mixing follow quantitatively in [[general-chemistry-2/liquids-solutions]]. The molecular dipoles invoked throughout rest on molecular shape and bond polarity — the vector addition of bond dipoles is developed in [[bonding-structure/vsepr]], and the electronegativity differences behind partial charges in [[general-chemistry-1/periodicity]]. The ion–dipole-versus-lattice-enthalpy argument for solubility closes against the Born–Haber bookkeeping of [[bonding-structure/ionic-bonding]].

::: summary
- Intermolecular forces act between molecules and are 1–10 % of covalent bond strengths; they set melting and boiling points, states of matter, solubilities, viscosities and surface tensions.
- London dispersion — instantaneous correlated dipoles, $U \propto -\alpha_1\alpha_2 I/r^{6}$ — is universal, always attractive, grows with polarisability and electron number, and is additive over contact area, so molecular shape matters.
- Keesom orientation forces between permanent dipoles average to nearly zero and leave a residual $\propto -\mu_1^2\mu_2^2/(k_\mathrm{B}T r^{6})$; Debye induction forces act between a dipole and an induced dipole. Both are typically under $2\ \mathrm{kJ\,mol^{-1}}$.
- Hydrogen bonding ($\mathrm{X-H\cdots Y}$, X = N, O, F; 10–40 $\mathrm{kJ\,mol^{-1}}$, directional) lifts $\mathrm{H_2O}$, $\mathrm{HF}$ and $\mathrm{NH_3}$ far above their hydride trends, makes ice float, and encodes base pairing in DNA.
- Ion–dipole forces are the strongest of the non-covalent set and explain why water, not hexane, dissolves salts.
- Rank boiling points by counting forces: dispersion (size, shape, contact area), then dipole terms, then hydrogen-bond donors and acceptors — and check that dispersion is comparable before crediting a dipole.
:::

## Exercises

::: exercise The noble-gas ladder {level=1}
The noble gases boil at He $-268.9\ \mathrm{^\circ C}$, Ne $-246.0\ \mathrm{^\circ C}$, Ar $-185.8\ \mathrm{^\circ C}$, Kr $-153.2\ \mathrm{^\circ C}$, Xe $-108.1\ \mathrm{^\circ C}$, Rn $-61.6\ \mathrm{^\circ C}$ (standard tabulated data). They rise monotonically down the group. What is the only intermolecular force available to these atoms, and why does it grow?
::: solution
Dispersion, and nothing else: noble-gas atoms are spherical, non-polar and closed-shell, so there is no dipole and no hydrogen bond. Down the group the atoms gain electrons and the outer shell sits further from the nucleus and more screened, so the polarisability $\alpha$ climbs steeply; since $U_\mathrm{disp} \propto -\alpha^{2}I/r^{6}$, each step deepens the well and raises the boiling point. Helium's well is so shallow that it boils only $4\ \mathrm{K}$ above absolute zero — two atoms of helium barely hold each other at all.
:::
:::

::: exercise The hydrogen halides {level=1}
Arrange $\mathrm{HCl}$, $\mathrm{HBr}$, $\mathrm{HI}$ and $\mathrm{HF}$ in order of increasing boiling point, and explain both the order of the first three and the position of the fourth.
::: solution
Increasing: $\mathrm{HCl}$ ($-85\ \mathrm{^\circ C}$) $<$ $\mathrm{HBr}$ ($-66\ \mathrm{^\circ C}$) $<$ $\mathrm{HI}$ ($-35\ \mathrm{^\circ C}$) $<$ $\mathrm{HF}$ ($19.5\ \mathrm{^\circ C}$). All four are polar, but within $\mathrm{HCl}$–$\mathrm{HBr}$–$\mathrm{HI}$ the dipole moments are similar and the polarisability rises with the halide, so dispersion orders them. $\mathrm{HF}$ should be the *lowest* of the four on dispersion alone; it is the highest because $\mathrm{F-H\cdots F}$ hydrogen bonds associate the liquid into chains. One outlier on a trend line is a fingerprint of hydrogen bonding — the same signature as $\mathrm{H_2O}$ and $\mathrm{NH_3}$.
:::
:::

::: exercise Name the dominant force {level=1}
For each pair, name the dominant intermolecular force: (a) two $\mathrm{CH_4}$ molecules; (b) two $\mathrm{CH_3Cl}$ molecules; (c) two $\mathrm{HF}$ molecules; (d) a $\mathrm{Na^+}$ ion in water; (e) dimethyl ether dissolved in water.
::: solution
(a) Dispersion — methane is non-polar. (b) Dipole–dipole (Keesom), with dispersion always present underneath. (c) Hydrogen bonding, $\mathrm{F-H\cdots F}$. (d) Ion–dipole — the strongest of the non-covalent interactions, and the reason hydration enthalpies are hundreds of $\mathrm{kJ\,mol^{-1}}$. (e) Hydrogen bonding: water donates, the ether's oxygen lone pairs accept — dimethyl ether cannot donate to itself, but it can be a guest in water's network, which is why it is quite soluble.
:::
:::

::: exercise The neopentane paradox {level=2}
Neopentane (2,2-dimethylpropane) boils $27\ \mathrm{K}$ *below* n-pentane but melts at $-16.5\ \mathrm{^\circ C}$, some $113\ \mathrm{K}$ *above* n-pentane ($-129.7\ \mathrm{^\circ C}$) (standard tabulated data). Reconcile the two facts.
::: solution
Boiling and melting measure different things. Boiling only requires escaping the liquid, where attraction is set by contact area — and the compact, roughly spherical neopentane touches its neighbours weakly, so it boils low. Melting requires *fitting into a crystal*: the lattice enthalpy of the solid depends on how efficiently the molecules pack, and neopentane's near-spherical symmetry lets it rotate almost freely in its lattice sites while packing with remarkable efficiency (it forms a plastic crystal). Symmetric tops pay an unusually small entropy of fusion and build unusually stable crystals. Contact area governs boiling; packing governs melting; neopentane is the textbook case of the two disagreeing.
:::
:::

::: exercise Two anomalies, one paragraph each {level=2}
Explain quantitatively what breaks the trend in each case: (a) $\mathrm{HF}$ boils $105\ \mathrm{K}$ above $\mathrm{HCl}$ although $\mathrm{HCl}$ is the more polarisable molecule; (b) $\mathrm{CCl_4}$ ($\mu = 0$) boils $101\ \mathrm{K}$ above $\mathrm{CH_3Cl}$ ($\mu = 1.9\ \mathrm{D}$).
::: solution
(a) $\mathrm{HF}$ molecules associate through $\mathrm{F-H\cdots F}$ hydrogen bonds of order $20$–$40\ \mathrm{kJ\,mol^{-1}}$; $\mathrm{HCl}$'s extra dispersion (34 more electrons) is worth only a few $\mathrm{kJ\,mol^{-1}}$, so the hydrogen bond dominates and $\mathrm{HF}$ boils at $19.5\ \mathrm{^\circ C}$ against $\mathrm{HCl}$'s $-85\ \mathrm{^\circ C}$. (b) The dipole difference is a Keesom term well under $k_\mathrm{B}T$, but replacing three H by Cl adds thirty electrons and three large polarisable chlorine surfaces: dispersion, additive over contacts, grows far more than the orientation term shrinks. In (a) a specific strong interaction beats dispersion; in (b) dispersion beats a specific weak interaction. The pair of examples is the whole ranking method in miniature: enumerate the forces, estimate their sizes, and let the largest term decide.
:::
:::

::: exercise Reading the Lennard-Jones well {level=2 check="1.12"}
The pair potential $U(r) = 4\varepsilon\left[(\sigma/r)^{12} - (\sigma/r)^{6}\right]$ has its minimum at $r = r_\mathrm{m}$. Find the ratio $r_\mathrm{m}/\sigma$, and state the well depth at $r_\mathrm{m}$. (Enter $r_\mathrm{m}/\sigma$ to two decimal places.)
::: solution
Set $\mathrm{d}U/\mathrm{d}r = 4\varepsilon\left[-12\sigma^{12}r^{-13} + 6\sigma^{6}r^{-7}\right] = 0$, so $2\sigma^{6} = r^{6}$ and $r_\mathrm{m} = 2^{1/6}\sigma = 1.12\,\sigma$. At the minimum $U(r_\mathrm{m}) = 4\varepsilon\left(\tfrac14 - \tfrac12\right) = -\varepsilon$: the well depth is exactly $\varepsilon$, while $\sigma$ itself is the *zero* of the potential, not the contact distance. The contact distance is $12\ \%$ larger than $\sigma$ — a $6^{\mathrm{th}}$-root effect, which is why the two definitions are worth keeping straight when reading figures.
:::
:::

::: exercise How strong is a hydrogen bond? {level=3}
Water's enthalpy of vaporisation is $40.7\ \mathrm{kJ\,mol^{-1}}$ at $\mathrm{373\ K}$, and its enthalpy of fusion is $6.01\ \mathrm{kJ\,mol^{-1}}$ at $\mathrm{273\ K}$ (standard tabulated data). Using the structural facts that liquid water has on average about two hydrogen bonds per molecule and that vaporisation at constant pressure also performs $pV$ work against the atmosphere, estimate the average hydrogen-bond energy two ways and compare.
::: solution
Route one: vaporisation breaks essentially all hydrogen bonds. At constant pressure part of $\Delta_\mathrm{vap}H$ is $pV$ work, $\Delta n_\mathrm{gas}RT \approx RT = 3.1\ \mathrm{kJ\,mol^{-1}}$ for one mole of liquid becoming one mole of vapour, leaving about $37.6\ \mathrm{kJ\,mol^{-1}}$ of internal-energy cost. With two bonds per molecule broken, that is $37.6/2 \approx 19\ \mathrm{kJ\,mol^{-1}}$ per bond. Route two: melting ice breaks only a fraction of the network — calorimetry and diffraction agree that roughly $15\ \%$ of hydrogen bonds are lost on melting — so $6.01\ \mathrm{kJ\,mol^{-1}} \approx 0.15 \times 2 \times E_\mathrm{HB}$, giving $E_\mathrm{HB} \approx 20\ \mathrm{kJ\,mol^{-1}}$. The two independent routes agree to within $5\ \%$, which is the honest justification for quoting "about $20\ \mathrm{kJ\,mol^{-1}}$" per water hydrogen bond. Note what the estimate assumes — that fusion breaks a small, known fraction of bonds and that vapour is essentially unbonded — and that both assumptions are independently checked by spectroscopy and diffraction.
:::
:::

::: exercise Rank the $\mathrm{C_4H_{10}O}$ isomers {level=3}
The isomers of $\mathrm{C_4H_{10}O}$ boil at: butan-1-ol $117.7\ \mathrm{^\circ C}$; 2-methylpropan-1-ol $108\ \mathrm{^\circ C}$; butan-2-ol $99.5\ \mathrm{^\circ C}$; 2-methylpropan-2-ol $82.2\ \mathrm{^\circ C}$; ethoxyethane (diethyl ether) $34.6\ \mathrm{^\circ C}$ (standard tabulated data). Explain the order completely.
::: solution
All five have the same molar mass, so dispersion differs only through shape, and the ordering is a hydrogen-bond and contact-area story. The four alcohols all donate and accept hydrogen bonds; the ether has no $\mathrm{O-H}$ and can only accept, so it falls out of the network and boils $48\ \mathrm{K}$ below the lowest alcohol — the dimethyl-ether lesson again. Within the alcohols, two effects run together. Branching makes the molecule compact, cutting the contact area for dispersion: butan-1-ol (straight chain) $>$ 2-methylpropan-1-ol (branched). And a *crowded* $\mathrm{O-H}$ donates less well: burying the hydroxyl at a tertiary carbon (2-methylpropan-2-ol) shields it from approaching acceptors, and secondary butan-2-ol sits between. The observed order — straight-chain primary, branched primary, straight-chain secondary, branched tertiary — is exactly the ranking those two effects predict, with hydrogen bonding setting the scale and contact area and steric access setting the fine structure.
:::
:::
