One gram of a good metal–organic framework has an internal surface area of several thousand square metres, more than a football pitch, folded into crystals you could hold on a fingertip. One gram of zeolite A, the aluminosilicate added to many laundry detergents, can remove about a hundred milligrams of calcium from hard water. The petrol in a car's tank has very probably passed over a zeolite catalyst in a refinery, which cracked heavy oil into smaller molecules inside pores barely wider than the molecules themselves. In all these materials the useful part of the solid is the part that is not there: the regular empty space between the atoms.

This chapter is about such **porous solids**. It begins with the classification of pores and the structural chemistry of **zeolites**, the crystalline aluminosilicates whose frameworks are built from corner-sharing tetrahedra, and explains their ion exchange, molecular sieving and acid catalysis. It then turns to **metal–organic frameworks** (MOFs), built from metal clusters and organic linkers by the design strategy called reticular chemistry, and to ordered mesoporous solids. The second half develops the physical chemistry needed to characterise and use porosity: the Langmuir and BET adsorption isotherms, the determination of surface area, and capillary condensation in mesopores described by the Kelvin equation.

## Pores and how they are classified

::: definition Porosity and pore sizes {#def-pores}
A porous solid contains cavities, channels or interstices that are accessible to molecules from outside. IUPAC classifies pores by their width $w$ (the diameter of a cylindrical pore or the separation of the walls of a slit):
- **micropores**, $w < 2\ \mathrm{nm}$ (zeolites, most MOFs, activated carbons);
- **mesopores**, $2\ \mathrm{nm} \le w \le 50\ \mathrm{nm}$ (MCM-41 and SBA-15 silicas, many gels and catalyst supports);
- **macropores**, $w > 50\ \mathrm{nm}$.

The **specific surface area** $a_\mathrm{s}$ is the accessible surface area per unit mass, in $\mathrm{m^2\,g^{-1}}$; the **specific pore volume** is the pore volume per unit mass, in $\mathrm{cm^3\,g^{-1}}$; the **porosity** is the fraction of the total volume that is pore.
:::

The boundaries are not arbitrary. In a micropore the walls on both sides are close enough that their attractive potentials overlap, so adsorption is strongly enhanced and the pores fill at very low pressure. In a mesopore the adsorbed film on the walls is distinct from the vapour, and the pore fills by capillary condensation at a pressure that depends on its size. Macropores behave almost like open surfaces.

## Zeolites

::: definition Zeolite composition and Löwenstein's rule {#def-zeolite}
A **zeolite** is a crystalline aluminosilicate whose framework consists of $\mathrm{SiO_4}$ and $\mathrm{AlO_4}$ tetrahedra ("T atoms") linked through every corner, enclosing cavities and channels of molecular dimensions. Its general formula is
$$
\mathrm{M}^{n+}_{x/n}\left[(\mathrm{AlO_2})_x(\mathrm{SiO_2})_y\right]\cdot z\,\mathrm{H_2O},
$$
where the square brackets enclose the framework. Each $\mathrm{AlO_4}$ tetrahedron carries a charge of $-1$, compensated by the extra-framework cations $\mathrm{M^{n+}}$, which sit in the pores with the water and can be exchanged. **Löwenstein's rule** (1954, empirical) states that Al–O–Al linkages are avoided, so that every $\mathrm{AlO_4}$ is surrounded by four $\mathrm{SiO_4}$; consequently $y/x = \mathrm{Si/Al} \ge 1$.
:::

The rule follows from Pauling's electrostatic valence principle ([[materials-chemistry/crystal-structures#def-bond-valence]]): an oxide bridging two Al would receive only $2 \times \tfrac34 = 1.5$ valence units, against $2$ for Si–O–Si and $1.75$ for Si–O–Al, leaving a large local negative charge. The silicon-to-aluminium ratio is the most important chemical variable of a zeolite. Low Si/Al (1–1.5, zeolites A and X) means many cations, strong ion exchange and hydrophilic pores; high Si/Al (ZSM-5 at 10 to more than 1000; purely siliceous silicalite) means few cations, greater thermal and acid stability, and hydrophobic pores.

The frameworks can be built from a few **secondary building units**. The **sodalite cage** (β-cage), a truncated octahedron of 24 T atoms with square and hexagonal faces, is the key unit of three important structures. Joining sodalite cages through their square faces via small cubes (double four-rings) gives **zeolite A** (framework code LTA), with large α-cages about $1.1\ \mathrm{nm}$ across connected by eight-ring windows about $0.41\ \mathrm{nm}$ wide. Joining them tetrahedrally through hexagonal prisms (double six-rings), like the carbon atoms of diamond, gives **faujasite** (FAU, zeolites X and Y), with supercages $1.3\ \mathrm{nm}$ across and twelve-ring windows of $0.74\ \mathrm{nm}$. **ZSM-5** (MFI) is built differently, from five-rings, and has intersecting straight and zigzag ten-ring channels about $0.55\ \mathrm{nm}$ wide. The International Zeolite Association recognises, as of 2026, more than 250 distinct framework types, each with a three-letter code.

A useful measure of openness is the **framework density**, the number of T atoms per $1000\ \text{Å}^3$: dense silica polymorphs such as quartz have about 27, faujasite about 13. Ring size determines access: eight-ring windows admit linear molecules such as n-alkanes but not branched ones; ten-rings admit benzene and p-xylene but discriminate against the bulkier o- and m-xylenes; twelve-rings admit most small aromatic and branched molecules.

::: example Ion exchange in zeolite A {#ex-zeolite-a}
Hydrated sodium zeolite A has the composition $\mathrm{Na_{12}[(AlO_2)_{12}(SiO_2)_{12}]\cdot27H_2O}$ per pseudo-cell. (a) Check that the framework charge is balanced. (b) Calculate its ion-exchange capacity in milliequivalents per gram. (c) What mass of calcium can $1.00\ \mathrm{g}$ of it remove from hard water by full exchange, $2\,\mathrm{Na^+} \rightarrow \mathrm{Ca^{2+}}$?
::: solution
(a) Twelve $\mathrm{AlO_2^-}$ units give a framework charge of $-12$, balanced by twelve $\mathrm{Na^+}$; Si/Al $= 1$, the minimum Löwenstein's rule allows, so Si and Al strictly alternate. (b) $M = 12(22.990) + 12(26.982) + 12(28.085) + 48(15.999) + 27(18.015) = 2191.0\ \mathrm{g\,mol^{-1}}$. Twelve equivalents of exchangeable charge per mole gives $12/2191.0 = 5.48\times10^{-3}\ \mathrm{eq\,g^{-1}} = 5.48\ \mathrm{meq\,g^{-1}}$ (about $7.0$ for the dehydrated solid). (c) Full exchange takes up $6\ \mathrm{Ca^{2+}}$ per formula unit: $6 \times 40.078/2191.0 = 0.110\ \mathrm{g}$, that is $110\ \mathrm{mg}$ of calcium per gram. In practice exchange in a detergent wash is incomplete and fast kinetics matter more than capacity. Replacing phosphate builders with zeolite A from the 1970s onwards removed a major cause of the eutrophication of lakes.
:::
:::

### Zeolites as sieves and catalysts

Exchanging the cations changes the effective window size of zeolite A: with $\mathrm{K^+}$ (zeolite 3A) the windows admit water but not ethanol or nitrogen, which is how ethanol and refrigerants are dried; with $\mathrm{Na^+}$ (4A) they are about $0.4\ \mathrm{nm}$; with $\mathrm{Ca^{2+}}$ (5A), which needs only half as many cations and leaves some windows unblocked, they admit linear but not branched alkanes, the basis of separating n-paraffins from petroleum fractions. Larger-pore zeolites separate nitrogen from oxygen in air by their different interactions with the cations: $\mathrm{N_2}$ has a larger quadrupole moment and binds more strongly, so pressure-swing adsorption over Li-exchanged X zeolites produces oxygen-enriched air for medical oxygen concentrators.

Exchanging the cations for ammonium and heating drives off ammonia and leaves a proton on the oxygen bridging Si and Al: a **Brønsted acid site** $\equiv\mathrm{Si{-}O(H){-}Al}\equiv$, comparable in strength to concentrated sulfuric acid but fixed in a pore of defined shape. Such acid zeolites are the largest-volume catalysts in the chemical industry. Zeolite Y, stabilised by dealumination ("ultrastable Y"), is the active component of fluid catalytic cracking catalysts that convert heavy petroleum fractions to petrol. ZSM-5 converts methanol to hydrocarbons and isomerises xylenes, and here **shape selectivity** appears: p-xylene diffuses through ten-ring channels orders of magnitude faster than o- and m-xylene, so the p-isomer, needed for terephthalic acid and hence polyester, emerges preferentially even though the equilibrium in the channels favours the others. Selectivity can also arise because only transition states that fit the pores can form.

::: warning Bigger pores are not always better {#warn-pores}
It is tempting to rank porous materials by surface area or pore size, as if more empty space always means a better material. For separations and selective catalysis the opposite is often true: the selectivity of 5A for linear alkanes and of ZSM-5 for p-xylene comes precisely from pores barely larger than the molecules. For gas storage, very large pores waste volume, because molecules in the centre of a wide pore are hardly more concentrated than in the bulk gas; optimal pores for methane storage are about two molecular diameters wide. And large surface areas are usually accompanied by low framework densities and poorer mechanical, thermal and chemical stability. Choose porosity for the job.
:::

## Metal–organic frameworks

A **metal–organic framework** is a crystalline solid built from metal ions or clusters (nodes, often called secondary building units) linked by multitopic organic ligands (linkers) into an extended, potentially porous network. Richard Robson showed in 1989 that frameworks with predictable topologies could be designed by combining metal centres of known geometry with rigid bridging ligands, as in the diamond-like copper(I) network of a tetranitrile ligand. Susumu Kitagawa demonstrated reversible gas sorption in a coordination framework in 1997 and later developed flexible frameworks that breathe as guests enter; Omar Yaghi introduced robust carboxylate-based MOFs with permanent porosity and the strategy of reticular synthesis. The three shared the 2025 Nobel Prize in Chemistry.

The archetype is **MOF-5**, $\mathrm{Zn_4O(BDC)_3}$ (BDC = benzene-1,4-dicarboxylate), reported by Yaghi and co-workers in 1999. Its node is an oxide-centred $\mathrm{Zn_4O}$ tetrahedron capped by six carboxylates, which point to the six vertices of an octahedron; linking such nodes by linear BDC rods generates a simple cubic network with cavities about $1.2$–$1.5\ \mathrm{nm}$ across and a BET surface area of the order of $3000$–$4000\ \mathrm{m^2\,g^{-1}}$. Because the geometry is set by the node, replacing BDC by longer linear dicarboxylates gives an **isoreticular** series of frameworks with the same topology and larger pores: this is **reticular chemistry**, designing a structure as a net and then choosing building blocks to realise it. Other landmark frameworks include **HKUST-1**, $\mathrm{Cu_3(BTC)_2}$ (BTC = benzene-1,3,5-tricarboxylate), built from copper "paddlewheel" dimers like those of copper acetate ([[coordination-chemistry/magnetism]]), whose axial water ligands can be removed to leave open metal sites; **UiO-66**, $\mathrm{Zr_6O_4(OH)_4(BDC)_6}$, unusually stable to water and acids because of its strong Zr–carboxylate bonds and twelve-connected nodes; and the **zeolitic imidazolate frameworks** such as ZIF-8, $\mathrm{Zn(mim)_2}$, in which tetrahedral $\mathrm{Zn^{2+}}$ ions bridged by imidazolates at an angle close to the Si–O–Si angle adopt zeolite topologies (here sodalite).

MOFs combine features no zeolite offers: surface areas up to more than $7000\ \mathrm{m^2\,g^{-1}}$, pore chemistry that can be tuned by functionalising the linker (amines for $\mathrm{CO_2}$ capture, chiral groups for enantioselective separation), flexibility, and the possibility of modifying the framework after synthesis. Their weaknesses are thermal stability (usually below $400\,^\circ\mathrm{C}$, against $700$–$1000\,^\circ\mathrm{C}$ for zeolites), sensitivity of many frameworks to water, and cost. Applications under development or in use as of 2026 include storage of toxic gases for the electronics industry, $\mathrm{CO_2}$ capture from flue gas, harvesting water from desert air, and separation of hydrocarbons. **Covalent organic frameworks** (COFs) are the all-organic analogue, linked by B–O, C=N or C–C bonds.

::: example Counting the formula of MOF-5 {#ex-mof5}
In MOF-5 each $\mathrm{Zn_4O}$ node is connected to six BDC linkers, and each linker connects two nodes. (a) Show that the formula is $\mathrm{Zn_4O(BDC)_3}$ and that it is neutral. (b) Calculate its molar mass and the mass fraction of zinc. (c) The crystal density of the evacuated framework is about $0.59\ \mathrm{g\,cm^{-3}}$, while a dense zinc carboxylate is near $2\ \mathrm{g\,cm^{-3}}$. Estimate the void fraction.
::: solution
(a) Each node bears six linker ends, and each linker is shared by two nodes, so there are $6/2 = 3$ linkers per node: $\mathrm{Zn_4O(BDC)_3}$. Charges: $4(+2) + (-2) + 3(-2) = 0$. (b) BDC is $\mathrm{C_8H_4O_4^{2-}}$, $M = 8(12.011) + 4(1.008) + 4(15.999) = 164.12\ \mathrm{g\,mol^{-1}}$. $M = 4(65.38) + 15.999 + 3(164.12) = 769.9\ \mathrm{g\,mol^{-1}}$. Zinc mass fraction $= 261.52/769.9 = 34.0\ \%$. (c) If the framework walls have the density of a dense zinc carboxylate, the fraction of volume they occupy is roughly $0.59/2 \approx 0.3$, leaving a void fraction of about $0.7$: some 70 % of a MOF-5 crystal is empty. (Calculations from the crystal structure, probing with a small spherical molecule, give about $0.8$.)
:::
:::

### Ordered mesoporous solids

In 1992 researchers at Mobil described **MCM-41**, a silica with a hexagonal array of uniform cylindrical mesopores, $2$–$10\ \mathrm{nm}$ wide, made by condensing silicate around the rod-shaped micelles of a cationic surfactant such as cetyltrimethylammonium bromide and then burning the surfactant out. **SBA-15** (1998) uses block-copolymer surfactants to give thicker walls and pores up to about $30\ \mathrm{nm}$. These materials have amorphous walls, so they lack the strong acidity and shape selectivity of zeolites, but their large, uniform pores accommodate bulky molecules, enzymes and nanoparticles, and serve as hard templates ("nanocasting") for mesoporous carbons and oxides. Activated carbons, by contrast, are disordered microporous and mesoporous solids made by pyrolysis and activation of coconut shells, coal or polymers; cheap and robust, they dominate water treatment and gas purification.

## Adsorption isotherms

Porosity is characterised, and porous materials are used, through **adsorption**: the accumulation of molecules from a gas or liquid at a surface. The **adsorption isotherm** is the amount adsorbed $n$ (mol per gram of solid) as a function of pressure $p$, or of relative pressure $p/p^\circ$ below the saturated vapour pressure $p^\circ$, at fixed temperature. Physical adsorption (physisorption) involves van der Waals forces, with enthalpies of $-5$ to $-40\ \mathrm{kJ\,mol^{-1}}$, and is reversible; chemisorption forms chemical bonds and is the subject of [[kinetics/surface-kinetics]].

::: proposition The Langmuir isotherm {#prop-langmuir}
For adsorption on a surface of identical, independent sites, each holding at most one molecule, the fractional coverage at pressure $p$ is
$$
\theta = \frac{n}{n_\mathrm{m}} = \frac{Kp}{1 + Kp},
$$ {#eq-langmuir}
where $n_\mathrm{m}$ is the monolayer capacity and $K = k_\mathrm{a}/k_\mathrm{d}$ is an equilibrium constant that falls with temperature as $K \propto \exp(-\Delta_\mathrm{ads}H/RT)$ ($\Delta_\mathrm{ads}H < 0$). The assumptions (a monolayer at most, equivalent sites, no interactions between adsorbed molecules) are best satisfied by chemisorption and by micropore filling in uniform frameworks; for multilayer physisorption on open surfaces they fail.
:::

::: proof
The rate of adsorption is proportional to the pressure (the collision rate with the surface) and to the fraction of empty sites: $k_\mathrm{a}p(1 - \theta)$. The rate of desorption is proportional to the fraction of occupied sites: $k_\mathrm{d}\theta$. At equilibrium these are equal: $k_\mathrm{a}p(1 - \theta) = k_\mathrm{d}\theta$, so $\theta(k_\mathrm{d} + k_\mathrm{a}p) = k_\mathrm{a}p$, and with $K = k_\mathrm{a}/k_\mathrm{d}$, $\theta = Kp/(1 + Kp)$. At low pressure $\theta \approx Kp$ (Henry's law region); at high pressure $\theta \to 1$. The same result follows from statistical thermodynamics by treating the sites as a lattice gas in equilibrium with the vapour ([[statistical-thermodynamics/equilibrium-from-molecules]]).
:::

The Langmuir form describes **type I** isotherms, the shape given by microporous solids: a steep rise at very low $p/p^\circ$ as the micropores fill, then a plateau when they are full, the plateau measuring the micropore volume rather than a monolayer on a surface. Non-porous and macroporous solids give **type II** isotherms, in which a monolayer forms and then multilayers build up without limit as $p \to p^\circ$. Mesoporous solids give **type IV** isotherms, like type II at low pressure but with a step and a plateau where the mesopores fill by capillary condensation, usually with a **hysteresis loop** between adsorption and desorption branches.

::: proposition The BET isotherm {#prop-bet}
If molecules adsorb in multilayers, the first layer with adsorption enthalpy $\Delta H_1$ and all higher layers with the enthalpy of liquefaction $\Delta H_\mathrm{L}$, and each layer obeys Langmuir-type kinetics on the layer below, then with $x = p/p^\circ$
$$
\frac{n}{n_\mathrm{m}} = \frac{Cx}{(1 - x)(1 - x + Cx)}, \qquad \frac{x}{n(1 - x)} = \frac{1}{n_\mathrm{m}C} + \frac{C - 1}{n_\mathrm{m}C}\,x,
$$ {#eq-bet}
where $C \approx \exp[(\Delta H_\mathrm{L} - \Delta H_1)/RT]$ measures how much more strongly the first layer is held. The linear form is used to extract $n_\mathrm{m}$ and $C$, normally over $0.05 < x < 0.30$ for type II isotherms, where the model's assumptions are least wrong.
:::

::: proof
Let $s_i$ be the fraction of the surface covered by exactly $i$ layers. At equilibrium, condensation onto the $i$-layer patches equals evaporation from the $(i+1)$-layer patches. For the first layer, $a_1ps_0 = b_1s_1e^{\Delta H_1/RT}$ (written with the enthalpy explicitly, so $b_1$ is a pre-exponential factor; $\Delta H_1 < 0$ makes desorption slower); for higher layers, $a ps_{i} = bs_{i+1}e^{\Delta H_\mathrm{L}/RT}$. Hence $s_1 = ys_0$ with $y = (a_1/b_1)pe^{-\Delta H_1/RT}$, and $s_{i+1} = xs_i$ for $i \ge 1$, where $x = (a/b)pe^{-\Delta H_\mathrm{L}/RT}$; since the higher layers are like liquid, $x$ equals $p/p^\circ$ (as $p \to p^\circ$ infinite layers form). So $s_i = Cx^is_0$ with $C = y/x$. The total amount is $n = n_\mathrm{m}\sum_i is_i$ and the surface is $\sum_i s_i = 1$:
$$
\frac{n}{n_\mathrm{m}} = \frac{\sum_{i\ge1} iCx^is_0}{s_0 + \sum_{i\ge1}Cx^is_0} = \frac{Cx/(1 - x)^2}{1 + Cx/(1 - x)} = \frac{Cx}{(1 - x)(1 - x + Cx)},
$$
using $\sum ix^i = x/(1 - x)^2$ and $\sum x^i = x/(1 - x)$. Rearranging gives the linear form: $x/[n(1 - x)] = (1 - x + Cx)/(n_\mathrm{m}C) = 1/(n_\mathrm{m}C) + (C - 1)x/(n_\mathrm{m}C)$. If the first-layer and liquefaction enthalpies are taken with the same pre-exponential ratios, $C = y/x = \exp[(\Delta H_\mathrm{L} - \Delta H_1)/RT]$.
:::

::: widget plot
f: k*x/(1 + k*x); c*x/((1 - x)*(1 - x + c*x))
x: 0, 0.95
y: 0, 4
sliders: k=50:1:500:1; c=100:2:300:1
labels: \text{Langmuir (type I)},\ n/n_\mathrm{m}; \text{BET (type II)},\ n/n_\mathrm{m}
caption: Model isotherms against relative pressure $x = p/p^\circ$: a Langmuir isotherm [[#eq-langmuir]] with $Kp^\circ = k$ (slider), typical of a microporous solid, which saturates at $n/n_\mathrm{m} = 1$; and a BET isotherm [[#eq-bet]] with constant $c$ (slider), typical of a non-porous surface, which shows the "knee" of monolayer completion near $x \approx 0.05$–$0.1$ and then rises without limit as multilayers build up towards condensation at $x = 1$. The sharper the knee (larger $C$), the more reliably $n_\mathrm{m}$ can be read from it. A mesoporous solid would follow the BET curve at first and then show a step where its pores fill.
:::

The **BET surface area** is obtained from the monolayer capacity: $a_\mathrm{s} = n_\mathrm{m}N_\mathrm{A}\sigma$, where $\sigma$ is the area occupied by one adsorbed molecule, $0.162\ \mathrm{nm^2}$ for nitrogen at $77\ \mathrm{K}$, the standard adsorptive. For microporous solids the "BET area" is formally meaningless, because the micropores fill rather than coating with a monolayer, but it remains a useful, reproducible comparison if computed by agreed criteria (choosing a pressure range in which $n(1 - x)$ increases with $x$ and $C$ is positive).

::: example A BET analysis {#ex-bet}
Nitrogen adsorption at $77\ \mathrm{K}$ on a mesoporous oxide gives the following amounts adsorbed (illustrative data generated from the BET equation):

| $x = p/p^\circ$ | $0.05$ | $0.10$ | $0.15$ | $0.20$ | $0.25$ | $0.30$ |
|---|---|---|---|---|---|---|
| $n\ /\ \mathrm{mmol\,g^{-1}}$ | $7.27$ | $8.27$ | $8.99$ | $9.68$ | $10.41$ | $11.21$ |

Find $n_\mathrm{m}$, $C$ and the BET surface area.
::: solution
Compute $y = x/[n(1 - x)]$: $0.05/(7.27 \times 0.95) = 0.00724$, then $0.01343$, $0.01963$, $0.02583$, $0.03203$, $0.03823\ \mathrm{g\,mmol^{-1}}$. A least-squares line through these points (try it in the figure below) has slope $s = 0.1239\ \mathrm{g\,mmol^{-1}}$ and intercept $i = 0.00104\ \mathrm{g\,mmol^{-1}}$. From [[#eq-bet]], $n_\mathrm{m} = 1/(s + i) = 1/0.1250 = 8.00\ \mathrm{mmol\,g^{-1}}$ and $C = s/i + 1 = 120$. The surface area is
$$
a_\mathrm{s} = 8.00\times10^{-3}\ \mathrm{mol\,g^{-1}} \times 6.022\times10^{23}\ \mathrm{mol^{-1}} \times 0.162\times10^{-18}\ \mathrm{m^2} = 780\ \mathrm{m^2\,g^{-1}}.
$$
The intercept is small and poorly determined (a $10\ \%$ error in it changes $C$ by $10\ \%$ but $n_\mathrm{m}$ by less than $1\ \%$), which is why BET areas are robust but BET $C$ values are not. With real data, quote the area to two or three significant figures and state the pressure range used.
:::
:::

::: widget regression
points: 0.05,0.00724; 0.10,0.01343; 0.15,0.01963; 0.20,0.02583; 0.25,0.03203; 0.30,0.03823
degree: 1
residuals: true
x: 0, 0.35
y: 0, 0.045
caption: The BET plot of [[#ex-bet]]: $x/[n(1 - x)]$ (in $\mathrm{g\,mmol^{-1}}$) against $x = p/p^\circ$. The least-squares line gives slope $(C - 1)/n_\mathrm{m}C$ and intercept $1/n_\mathrm{m}C$. Drag a point to see how sensitive the intercept (and hence $C$) is to a single measurement, while $n_\mathrm{m} = 1/(\text{slope} + \text{intercept})$ barely changes. Data from a microporous solid would curve downwards over this range, the sign that the BET model does not apply there.
:::

### Capillary condensation and the Kelvin equation

::: proposition The Kelvin equation {#prop-kelvin}
A liquid confined in a cylindrical pore with a hemispherical meniscus of radius $r$ (contact angle zero) is in equilibrium with its vapour at a pressure $p$ below the normal vapour pressure $p^\circ$:
$$
\ln\frac{p}{p^\circ} = -\frac{2\gamma V_\mathrm{m}}{rRT},
$$ {#eq-kelvin}
where $\gamma$ is the surface tension and $V_\mathrm{m}$ the molar volume of the liquid. Pores of radius smaller than $r$ are filled by condensed liquid at relative pressure $p/p^\circ$. The equation treats the condensate as a bulk liquid with a macroscopic interface and becomes unreliable below about $2\ \mathrm{nm}$.
:::

::: proof
Across a curved interface of radius $r$ the pressure on the concave side exceeds that on the convex side by $2\gamma/r$ (Laplace). In the pore the liquid is on the convex side of the meniscus (it is concave towards the vapour), so the liquid is at a pressure lower than the vapour by $2\gamma/r$. Changing the pressure on a liquid by $\Delta P$ changes its chemical potential by $V_\mathrm{m}\Delta P$, so $\mu_\mathrm{l} = \mu_\mathrm{l}^\circ - 2\gamma V_\mathrm{m}/r$, where $\mu_\mathrm{l}^\circ$ is the chemical potential of bulk liquid at its vapour pressure. Equilibrium with ideal vapour requires $\mu_\mathrm{l} = \mu_\mathrm{g}^\circ + RT\ln(p/p^\circ)$, and since $\mu_\mathrm{l}^\circ = \mu_\mathrm{g}^\circ$ (bulk liquid and vapour coexist at $p^\circ$), $RT\ln(p/p^\circ) = -2\gamma V_\mathrm{m}/r$, which is [[#eq-kelvin]] ([[thermodynamics/phase-equilibria]]).
:::

For nitrogen at $77\ \mathrm{K}$ ($\gamma = 8.85\ \mathrm{mN\,m^{-1}}$, $V_\mathrm{m} = 34.7\ \mathrm{cm^3\,mol^{-1}}$), condensation at $p/p^\circ = 0.5$ corresponds to a Kelvin radius $r = 2\gamma V_\mathrm{m}/[RT\ln(p^\circ/p)] = 1.38\ \mathrm{nm}$. The actual pore radius is larger by the thickness of the adsorbed film on the walls before condensation (about $0.6\ \mathrm{nm}$ at that pressure). Analysing the condensation step of a type IV isotherm in this way (the Barrett–Joyner–Halenda method) gives a pore size distribution; modern practice uses density functional theory of the confined fluid, which works into the micropore range.

::: quiz
A nitrogen isotherm at $77\ \mathrm{K}$ rises almost vertically below $p/p^\circ = 0.01$ and is then flat up to $p/p^\circ = 0.95$. What does this indicate?
- [x] A microporous solid (type I isotherm) whose pores are full at low pressure
- [ ] A non-porous solid with weak adsorption
- [ ] A mesoporous solid undergoing capillary condensation
- [ ] Multilayer adsorption on a large external surface
::: solution
Filling at very low relative pressure means a very strong interaction potential, which arises when walls are close on both sides: micropores. The flat plateau shows no further uptake, so there is little external surface or mesoporosity. A non-porous solid gives a type II curve rising towards $p^\circ$; mesopores give a step at intermediate pressure, often with hysteresis.
:::
:::

::: example Methane storage at moderate pressure {#ex-storage}
A MOF with crystal density $0.59\ \mathrm{g\,cm^{-3}}$ adsorbs $0.20\ \mathrm{g}$ of methane per gram at $35\ \mathrm{bar}$ and $298\ \mathrm{K}$ (an illustrative value of the right magnitude for the best materials). Express its storage capacity as the volume of gas at $0\,^\circ\mathrm{C}$ and $1\ \mathrm{atm}$ (STP, molar volume $22.41\ \mathrm{dm^3\,mol^{-1}}$) per volume of crystal, and compare with an empty tank at the same pressure.
::: solution
Per cubic centimetre of crystal: $0.20 \times 0.59 = 0.118\ \mathrm{g}$ of methane, that is $0.118/16.04 = 7.36\ \mathrm{mmol}$, occupying $7.36\times10^{-3} \times 22\,410 = 165\ \mathrm{cm^3}$ at STP: $165\ \mathrm{v/v}$. An empty tank holds $n/V = p/RT = 35\times10^5/(8.314 \times 298) = 1413\ \mathrm{mol\,m^{-3}} = 1.41\ \mathrm{mmol\,cm^{-3}}$, which is $31.7\ \mathrm{v/v}$ at STP (ideal-gas estimate). The adsorbent stores about five times as much at this pressure. Two caveats: a real tank packs crystals with voids, which lowers the bed density, and only the gas released down to the minimum delivery pressure (about $5\ \mathrm{bar}$) is usable. The "deliverable capacity" is the figure of merit.
:::
:::

## Where this leads

Porous solids connect with many other parts of the course and the curriculum. Their syntheses are the hydrothermal and solvothermal methods of [[materials-chemistry/solid-synthesis]]; their structures are solved by [[materials-chemistry/diffraction]]; their catalytic chemistry continues in [[organometallics-catalysis/heterogeneous-catalysis]] and [[kinetics/surface-kinetics]]; their use in carbon capture and hydrogen storage appears in [[materials-chemistry/energy-materials]] and [[green-chemistry/carbon-hydrogen]]. Confining nanoparticles in pores is one of the strategies of [[materials-chemistry/nanomaterials]].

::: history
Axel Fredrik Cronstedt named zeolites in 1756 ("boiling stones") after the water they release on heating. Irving Langmuir derived his isotherm in 1916–18 (Nobel Prize 1932), and Stephen Brunauer, Paul Emmett and Edward Teller published the BET theory in 1938. Richard Barrer began systematic hydrothermal synthesis of zeolites in the 1940s, and Robert Milton and Donald Breck at Union Carbide synthesised zeolites A and X around 1949–54; Walter Löwenstein formulated his rule in 1954. Zeolite catalysts entered petroleum cracking in the early 1960s, and Mobil patented ZSM-5 in 1972. Mobil scientists (Charles Kresge, Jeffrey Beck and colleagues) reported MCM-41 in 1992. Bernard Hoskins and Richard Robson described designed coordination frameworks in 1989; Susumu Kitagawa reported gas sorption in a porous coordination polymer in 1997; and Omar Yaghi's group reported MOF-5 in 1999, the year HKUST-1 was also published by Ian Williams's group in Hong Kong. Kitagawa, Robson and Yaghi received the Nobel Prize in Chemistry in 2025.
:::

::: summary
- Pores are classified as micropores ($< 2\ \mathrm{nm}$), mesopores ($2$–$50\ \mathrm{nm}$) and macropores ($> 50\ \mathrm{nm}$); the class determines how they fill.
- Zeolites are frameworks of corner-sharing $\mathrm{SiO_4}$ and $\mathrm{AlO_4}$ tetrahedra; each Al brings a $-1$ charge balanced by exchangeable cations, and Löwenstein's rule gives Si/Al $\ge 1$.
- Sodalite cages build zeolite A and faujasite; ring size (8, 10, 12) sets the window and hence molecular sieving and shape-selective catalysis (ZSM-5, p-xylene); protonated zeolites are strong solid acids.
- MOFs link metal-cluster nodes by organic linkers; reticular chemistry designs isoreticular series (MOF-5), and stability depends on node–linker bond strength (UiO-66, ZIFs).
- The Langmuir isotherm $\theta = Kp/(1 + Kp)$ describes monolayer adsorption and micropore filling (type I); the BET isotherm describes multilayers (type II) and gives $n_\mathrm{m}$, hence surface area $a_\mathrm{s} = n_\mathrm{m}N_\mathrm{A}\sigma$ with $\sigma(\mathrm{N_2}) = 0.162\ \mathrm{nm^2}$.
- Mesopores fill by capillary condensation at $\ln(p/p^\circ) = -2\gamma V_\mathrm{m}/rRT$ (Kelvin), giving type IV isotherms with hysteresis and pore-size distributions.
- For storage and separation the relevant measures are volumetric and deliverable capacities and selectivities, not surface area alone.
:::

## Exercises

::: exercise Which kind of pore? {level=1}
Classify these pores and predict the isotherm type for nitrogen at $77\ \mathrm{K}$: (a) the $0.74\ \mathrm{nm}$ windows and $1.3\ \mathrm{nm}$ supercages of zeolite Y; (b) the $8\ \mathrm{nm}$ channels of SBA-15; (c) the spaces between $1\ \mathrm{\mu m}$ particles of a non-porous powder.
::: solution
(a) Micropores: type I. (b) Mesopores: type IV with a condensation step and hysteresis near $p/p^\circ \approx 0.7$–$0.8$. (c) Macropores between non-porous particles: essentially type II (the voids fill only very close to $p^\circ$).
:::
:::

::: exercise Aluminium in faujasite {level=1 check="54.9"}
The faujasite unit cell contains 192 T atoms. How many Al atoms, and how many monovalent cations, does a cell of zeolite Y with Si/Al $= 2.5$ contain? (Enter the number of Al atoms per cell, to three significant figures.)
::: solution
Al $= 192/(1 + 2.5) = 54.9$, so about 55 Al and 55 monovalent cations per cell (Si $\approx 137$). Zeolite X, with Si/Al $\approx 1.2$, has about 87 Al per cell.
:::
:::

::: exercise A BET area {level=1 check="995"}
A sample adsorbs a monolayer of $10.2\ \mathrm{mmol\,g^{-1}}$ of nitrogen. Calculate its BET surface area. (Enter the area in $\mathrm{m^2\,g^{-1}}$, to three significant figures.)
::: solution
$a_\mathrm{s} = 10.2\times10^{-3} \times 6.022\times10^{23} \times 0.162\times10^{-18} = 995\ \mathrm{m^2\,g^{-1}}$.
:::
:::

::: exercise Langmuir coverage {level=2 check="9"}
For an adsorbent obeying the Langmuir isotherm, the coverage is $0.50$ at $2.0\ \mathrm{bar}$. (a) Find $K$. (b) At what multiple of this pressure is the coverage $0.90$? (Enter the multiple.)
::: solution
(a) $\theta = 0.5$ when $Kp = 1$, so $K = 0.50\ \mathrm{bar^{-1}}$. (b) $\theta = 0.9$ requires $Kp/(1 + Kp) = 0.9$, $Kp = 9$, so $p = 18\ \mathrm{bar}$: nine times the half-coverage pressure. Approaching saturation is expensive in pressure, which is why pressure-swing processes work between moderate pressures where the isotherm is steep.
:::
:::

::: exercise A Kelvin radius {level=2 check="2.68"}
Calculate the Kelvin radius for nitrogen at $77.35\ \mathrm{K}$ ($\gamma = 8.85\ \mathrm{mN\,m^{-1}}$, $V_\mathrm{m} = 34.7\ \mathrm{cm^3\,mol^{-1}}$) for condensation at $p/p^\circ = 0.70$. (Enter $r$ in nm, to three significant figures.)
::: solution
$r = 2\gamma V_\mathrm{m}/[RT\ln(p^\circ/p)] = 2 \times 8.85\times10^{-3} \times 34.7\times10^{-6}/(8.314 \times 77.35 \times 0.3567) = 6.142\times10^{-7}/229.4 = 2.68\times10^{-9}\ \mathrm{m} = 2.68\ \mathrm{nm}$. Adding a film thickness of about $0.7\ \mathrm{nm}$ gives a pore radius near $3.4\ \mathrm{nm}$, a diameter of about $7\ \mathrm{nm}$, typical of SBA-15.
:::
:::

::: exercise Exchange capacity {level=2 check="5.48"}
Calculate the cation-exchange capacity of hydrated zeolite NaA, $\mathrm{Na_{12}[(AlO_2)_{12}(SiO_2)_{12}]\cdot27H_2O}$, in $\mathrm{meq\,g^{-1}}$. What would it be for a zeolite Y of composition $\mathrm{Na_{56}[(AlO_2)_{56}(SiO_2)_{136}]\cdot250H_2O}$? (Enter the value for NaA, to three significant figures.)
::: solution
NaA: $12/2191.0\ \mathrm{eq\,g^{-1}} = 5.48\ \mathrm{meq\,g^{-1}}$ (as in [[#ex-zeolite-a]]). Zeolite Y: $M = 56(22.990) + 56(26.982 + 2 \times 15.999) + 136(28.085 + 2 \times 15.999) + 250(18.015) = 1287.4 + 3302.9 + 8171.3 + 4503.8 = 17\,265\ \mathrm{g\,mol^{-1}}$, capacity $56/17\,265 = 3.24\ \mathrm{meq\,g^{-1}}$. The higher Si/Al ratio lowers the capacity but increases stability.
:::
:::

::: exercise Dissociative adsorption {level=3 check="0.667"}
Hydrogen adsorbs dissociatively on a metal, $\mathrm{H_2(g)} + 2\,{*} \rightleftharpoons 2\,\mathrm{H}{*}$, where ${*}$ is a surface site. (a) Show that $\theta = (Kp)^{1/2}/[1 + (Kp)^{1/2}]$. (b) Evaluate $\theta$ at $Kp = 4$. (c) How would you test experimentally whether adsorption is dissociative? (Enter $\theta$ at $Kp = 4$, to three significant figures.)
::: solution
(a) Adsorption needs two adjacent empty sites, rate $k_\mathrm{a}p(1 - \theta)^2$; desorption needs two adjacent H atoms, rate $k_\mathrm{d}\theta^2$. At equilibrium $\theta^2/(1 - \theta)^2 = Kp$, so $\theta/(1 - \theta) = (Kp)^{1/2}$ and $\theta = (Kp)^{1/2}/[1 + (Kp)^{1/2}]$. (b) $(Kp)^{1/2} = 2$, $\theta = 2/3 = 0.667$. (c) At low coverage $\theta \propto p^{1/2}$ rather than $p$; a plot of $1/n$ against $1/p^{1/2}$ is linear for dissociative adsorption, whereas $1/n$ against $1/p$ is linear for molecular adsorption.
:::
:::

::: exercise A BET fit from two points {level=3 check="8.0"}
Using only the points at $x = 0.10$ ($n = 8.27\ \mathrm{mmol\,g^{-1}}$) and $x = 0.25$ ($n = 10.41\ \mathrm{mmol\,g^{-1}}$) from [[#ex-bet]], determine $n_\mathrm{m}$ and $C$ from the linear BET equation. Comment on the reliability of each. (Enter $n_\mathrm{m}$ in $\mathrm{mmol\,g^{-1}}$, two significant figures.)
::: hint
Compute $y = x/[n(1 - x)]$ at both points, then the slope and intercept of the line through them.
:::
::: solution
$y_1 = 0.10/(8.27 \times 0.90) = 0.013436$, $y_2 = 0.25/(10.41 \times 0.75) = 0.032020\ \mathrm{g\,mmol^{-1}}$. Slope $s = (0.032020 - 0.013436)/0.15 = 0.12389$; intercept $i = 0.013436 - 0.10s = 0.001045$. Then $n_\mathrm{m} = 1/(s + i) = 1/0.12494 = 8.0\ \mathrm{mmol\,g^{-1}}$ and $C = s/i + 1 = 120$. The monolayer capacity agrees with the six-point fit to better than 1 %, but $C$ depends on a small intercept obtained by extrapolation: rounding $n$ to three figures changes the intercept by several per cent. Report $n_\mathrm{m}$ (and the area) with confidence; treat $C$ as qualitative.
:::
:::

::: exercise Volumetric capacity {level=2 check="165"}
Repeat the calculation of [[#ex-storage]] and give the methane storage capacity in $\mathrm{cm^3}$ (STP) per $\mathrm{cm^3}$ of crystal. If the crystals are packed into a tank with 30 % voids between them, and the voids hold compressed gas at $31.7\ \mathrm{v/v}$, what is the overall capacity? (Enter the capacity of the crystal alone, to three significant figures.)
::: solution
Crystal: $165\ \mathrm{v/v}$, as in the example. Packed bed: $0.70 \times 165 + 0.30 \times 31.7 = 115.5 + 9.5 = 125\ \mathrm{v/v}$. Packing losses are a major reason why gravimetric and crystallographic capacities overstate what a real tank achieves, and why monolithic and densified MOFs are being developed.
:::
:::
