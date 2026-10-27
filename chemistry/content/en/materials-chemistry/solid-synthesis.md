In solution chemistry, mixing two reagents brings their molecules into contact within microseconds. In solid-state chemistry, mixing two powders brings into contact only the points where grains touch, and the atoms of each reactant must then travel through the growing layer of product to meet. A reaction such as $\mathrm{MgO} + \mathrm{Al_2O_3} \rightarrow \mathrm{MgAl_2O_4}$, which is thermodynamically downhill at all temperatures, proceeds at a useful rate only above about $1200\,^\circ\mathrm{C}$ and may still need days and several regrindings to go to completion. Much of the craft of making inorganic solids consists of finding ways round this diffusion bottleneck: mixing the elements on an atomic scale before the solid forms, using a solvent or a gas to carry atoms, or building the solid layer by layer from a vapour.

This chapter surveys the main routes. It begins with the traditional **ceramic method** and the kinetics that make it slow, then turns to **solution-based precursors** and the **sol–gel** process, to **hydrothermal and solvothermal** synthesis, which uses superheated solvents in sealed vessels, and to **chemical vapour deposition** and atomic layer deposition, which make thin films and coatings. Throughout, the questions are the same: what controls the rate, what controls the product's phase, composition and oxidation state, and what controls the size and shape of its particles. The products are identified with the powder diffraction methods of [[materials-chemistry/diffraction]].

::: warning Practical work on solids needs supervision and a risk assessment {#warn-safety}
The calculations in this chapter are paper exercises. Real syntheses of solids involve hazards that must be assessed before any work: furnaces at $1000\,^\circ\mathrm{C}$ and above (burns, and fire if combustible material is nearby); fine powders that can be inhaled, some of them toxic (soluble barium compounds, nickel and cobalt oxides, which are classed as carcinogens or sensitisers, and lead compounds); sealed autoclaves, which can fail violently if overfilled or overheated; flammable alcohols and moisture-sensitive alkoxides in sol–gel work; and in vapour deposition, toxic, pyrophoric or corrosive precursor gases such as silane, arsine and hydrogen chloride, which are handled only in purpose-built, monitored systems. Practical work must be done under supervision, with the appropriate protective equipment, fume extraction and safety data sheets.
:::

## The ceramic method

The classic way to make a complex oxide is to grind together stoichiometric amounts of binary oxides, carbonates or nitrates, press the powder into a pellet, and heat it, usually in air, at a temperature well below the melting point of any component. The carbonates and nitrates decompose on heating to reactive oxides ("calcination"), releasing $\mathrm{CO_2}$ or $\mathrm{NO_x}$. Because the reaction stops when product layers separate the reactants, the pellet is cooled, reground and reheated, several times, and the progress of the reaction is followed by powder diffraction until the lines of the starting materials disappear.

::: algorithm Planning a ceramic synthesis {#alg-ceramic}
1. **Choose precursors** that decompose cleanly to the oxides (carbonates, oxalates, nitrates, hydroxides) and are stable to weigh (not hygroscopic, or dried before weighing).
2. **Calculate the masses** from the balanced equation, including gases lost (for example $\mathrm{CO_2}$) and gained (for example $\mathrm{O_2}$ from the atmosphere when a metal is oxidised).
3. **Mix intimately**: grind in an agate mortar or ball mill, often with a volatile liquid such as acetone to help mixing; finer particles mean shorter diffusion distances.
4. **Calcine** at a moderate temperature to decompose the precursors, then **press** a pellet to increase the contact area between grains.
5. **Fire** at a temperature above about two-thirds of the absolute melting point of the least refractory reactant (the empirical Tammann rule), in an atmosphere that sets the desired oxidation state (air, oxygen, argon, $\mathrm{H_2/Ar}$, or a sealed tube).
6. **Regrind and refire** until powder diffraction shows a single phase; then measure the composition (oxygen content by thermogravimetric analysis or titration) as well as the structure.
:::

::: example Making the high-temperature superconductor YBa₂Cu₃O₇ {#ex-ybco}
$\mathrm{YBa_2Cu_3O_7}$ is made from $\mathrm{Y_2O_3}$, $\mathrm{BaCO_3}$ and $\mathrm{CuO}$, fired in air and finally annealed in oxygen. (a) Write a balanced equation and calculate the masses of the three precursors needed for $10.0\ \mathrm{g}$ of product. (b) What mass of $\mathrm{CO_2}$ is lost, and what mass of $\mathrm{O_2}$ is taken up?
::: solution
(a) The oxides supply $\tfrac12\mathrm{Y_2O_3} + 2\mathrm{BaO} + 3\mathrm{CuO} = \mathrm{YBa_2Cu_3O_{6.5}}$, so half an O atom per formula must come from the gas:
$$
\tfrac12\,\mathrm{Y_2O_3} + 2\,\mathrm{BaCO_3} + 3\,\mathrm{CuO} + \tfrac14\,\mathrm{O_2} \rightarrow \mathrm{YBa_2Cu_3O_7} + 2\,\mathrm{CO_2}.
$$
$M(\mathrm{YBa_2Cu_3O_7}) = 88.906 + 2(137.327) + 3(63.546) + 7(15.999) = 666.19\ \mathrm{g\,mol^{-1}}$, so $10.0\ \mathrm{g}$ is $0.015011\ \mathrm{mol}$. Then $\mathrm{Y_2O_3}$: $\tfrac12 \times 0.015011 \times 225.81 = 1.695\ \mathrm{g}$; $\mathrm{BaCO_3}$: $2 \times 0.015011 \times 197.33 = 5.924\ \mathrm{g}$; $\mathrm{CuO}$: $3 \times 0.015011 \times 79.545 = 3.582\ \mathrm{g}$. (b) $\mathrm{CO_2}$: $2 \times 0.015011 \times 44.009 = 1.321\ \mathrm{g}$; $\mathrm{O_2}$: $\tfrac14 \times 0.015011 \times 31.998 = 0.120\ \mathrm{g}$. Check: $1.695 + 5.924 + 3.582 + 0.120 - 1.321 = 10.000\ \mathrm{g}$.

The oxygen content is the subtle part. At the firing temperature (about $930\,^\circ\mathrm{C}$) the equilibrium product is close to $\mathrm{YBa_2Cu_3O_{6.3}}$, tetragonal and not superconducting; slow cooling or annealing in oxygen near $450\,^\circ\mathrm{C}$ fills the oxygen sites in the Cu–O chains to give orthorhombic $\mathrm{YBa_2Cu_3O_{7-\delta}}$ ($\delta \approx 0.05$), which superconducts below $92\ \mathrm{K}$. This is the defect equilibrium of [[materials-chemistry/defects#prop-brouwer]] used as a synthetic tool. (Barium carbonate is harmful if swallowed; the work needs a risk assessment as above.)
:::
:::

### Why solid-state reactions are slow

::: proposition Parabolic growth of a product layer {#prop-parabolic}
When a planar product layer separates two reactants and its growth is limited by diffusion of ions through the layer, its thickness $x$ grows with time as
$$
x^2 = 2k_\mathrm{p}t,
$$ {#eq-parabolic}
where the **parabolic rate constant** $k_\mathrm{p}$ is proportional to the diffusion coefficient of the slowest necessary species across the layer, and therefore obeys an Arrhenius law $k_\mathrm{p} = k_0\exp(-E_\mathrm{a}/RT)$. The law assumes local equilibrium at both interfaces (so the concentrations there are fixed), a constant diffusion coefficient, and planar geometry; for spherical particles being consumed, corrections such as the Jander or Ginstling–Brounshtein equations apply.
:::

::: proof
With fixed concentrations $c_1$ and $c_2$ at the two interfaces, the concentration gradient across a layer of thickness $x$ is $(c_1 - c_2)/x$ in a quasi-steady state, and by Fick's first law the flux through it is $J = D(c_1 - c_2)/x$. Every ion that crosses reacts at the far interface and adds a fixed volume $\Omega$ of product per ion, so $dx/dt = \Omega J = \Omega D(c_1 - c_2)/x$. Writing $k_\mathrm{p} = \Omega D(c_1 - c_2)$, we have $x\,dx/dt = k_\mathrm{p}$, and integrating from $x = 0$ at $t = 0$, $\tfrac12x^2 = k_\mathrm{p}t$. The rate slows as the layer thickens because the gradient that drives diffusion falls as $1/x$. Since $D$ is activated ([[materials-chemistry/defects#prop-nernst-einstein]]), so is $k_\mathrm{p}$.
:::

Two practical rules follow. Halving the particle size quarters the time needed for complete reaction, which is why fine grinding and repeated regrinding (which also breaks product layers and exposes fresh reactant) matter so much. And temperature acts exponentially: with $E_\mathrm{a} = 300\ \mathrm{kJ\,mol^{-1}}$, typical of cation diffusion in oxides, raising the temperature from $1200$ to $1300\,^\circ\mathrm{C}$ increases $k_\mathrm{p}$ by a factor of about 4.7.

The mechanism of spinel formation, worked out by Carl Wagner in the 1930s, shows how the reaction is shared between the two interfaces. Oxide ions are almost immobile; instead $\mathrm{Mg^{2+}}$ and $\mathrm{Al^{3+}}$ diffuse in opposite directions through the spinel layer, three $\mathrm{Mg^{2+}}$ for every two $\mathrm{Al^{3+}}$ to keep the layer neutral. At the MgO/spinel interface, $2\mathrm{Al^{3+}} + 4\mathrm{MgO} \rightarrow \mathrm{MgAl_2O_4} + 3\mathrm{Mg^{2+}}$; at the spinel/$\mathrm{Al_2O_3}$ interface, $3\mathrm{Mg^{2+}} + 4\mathrm{Al_2O_3} \rightarrow 3\mathrm{MgAl_2O_4} + 2\mathrm{Al^{3+}}$. Three times as much spinel grows on the alumina side as on the magnesia side, a prediction confirmed by marker experiments.

::: widget plot
f: sqrt(2*k*x); k*x/2
x: 0, 100
y: 0, 30
sliders: k=2:0.2:10:0.1
labels: \text{parabolic, } x = \sqrt{2k_\mathrm{p}t}; \text{linear, for comparison}
caption: Thickness of a product layer (μm) against time $x$ (hours) for diffusion-limited parabolic growth, [[#eq-parabolic]], with rate constant $k_\mathrm{p} = k\ \mathrm{\mu m^2\,h^{-1}}$ (slider), compared with a hypothetical linear law of the same initial order of magnitude. Parabolic growth is fast at first and then slows: the time to grow a layer scales as its thickness squared. For reactant grains $20\ \mathrm{\mu m}$ across, with $k = 2$, consuming the grain takes days; for $1\ \mathrm{\mu m}$ grains it takes minutes. That scaling is the central argument for every "soft" synthesis route below.
:::

::: example How much longer? {#ex-parabolic}
In a reaction between pellets of NiO and $\mathrm{Al_2O_3}$ at $1300\,^\circ\mathrm{C}$, a spinel layer $5.0\ \mathrm{\mu m}$ thick forms in $10\ \mathrm{h}$. (a) How long would a $20\ \mathrm{\mu m}$ layer take? (b) If the activation energy is $300\ \mathrm{kJ\,mol^{-1}}$, how long would the $5.0\ \mathrm{\mu m}$ layer take at $1200\,^\circ\mathrm{C}$?
::: solution
(a) $t \propto x^2$, so $t = 10\ \mathrm{h} \times (20/5.0)^2 = 160\ \mathrm{h}$, nearly a week. (b) $k_\mathrm{p}(1473\ \mathrm{K})/k_\mathrm{p}(1573\ \mathrm{K}) = \exp[-(300\,000/8.314)(1/1473 - 1/1573)] = \exp(-1.557) = 0.211$, so the time becomes $10/0.211 = 47\ \mathrm{h}$. A $100\ \mathrm{K}$ drop in temperature costs almost a factor of five, which is why ceramic syntheses are run as hot as the volatility and stability of the product allow.
:::
:::

### Controlling the oxidation state

The atmosphere during firing sets the oxygen chemical potential and hence the oxidation state of a variable-valence metal. Firing in air ($p_{\mathrm{O_2}} = 0.21\ \mathrm{bar}$) gives $\mathrm{Fe^{3+}}$, $\mathrm{Mn^{3+}/Mn^{4+}}$ and $\mathrm{Co^{2+}/Co^{3+}}$ mixtures; firing in flowing $\mathrm{H_2/Ar}$, $\mathrm{CO/CO_2}$ or $\mathrm{H_2/H_2O}$ mixtures, whose equilibria fix $p_{\mathrm{O_2}}$ at chosen values down to $10^{-20}\ \mathrm{bar}$ or below, stabilises lower states. The required $p_{\mathrm{O_2}}$ is read from the Gibbs energies of the competing oxides, as on an Ellingham diagram ([[main-group/inorganic-redox]]). Compounds containing reduced metals, such as $\mathrm{LiFePO_4}$ for batteries or $\mathrm{Eu^{2+}}$-doped phosphors, must be made under reducing gas or in sealed evacuated silica tubes; compounds of unusually high oxidation states, such as $\mathrm{La_2NiO_4}$ with excess oxygen or ferrates(IV), need high oxygen pressures or electrochemical oxidation.

## Soft chemistry: mixing on the atomic scale

If the reactants are mixed at the atomic level before the solid forms, diffusion distances fall from micrometres to nanometres, reaction temperatures drop by hundreds of degrees, and products can be obtained as fine, homogeneous powders, often in metastable phases that the ceramic method cannot reach. French chemists call this approach *chimie douce*, soft chemistry.

**Coprecipitation** precipitates all the cations together, as hydroxides, oxalates or carbonates, from a solution of their salts; heating the precipitate gives the oxide. Ferrites and the yttrium aluminium garnet of phosphors are made this way. Its weakness is that different cations precipitate at different pH, so the precipitate may not be homogeneous. The **Pechini** or citrate method avoids this by chelating the cations with citric acid and polymerising the solution with ethylene glycol into a resin, in which the cations are trapped in fixed proportions; burning off the organic material leaves a fine mixed oxide. **Topotactic** reactions modify an existing solid while preserving its framework: ion exchange in layered oxides, intercalation of lithium into $\mathrm{TiS_2}$ or graphite, or deintercalation that gives otherwise inaccessible phases such as $\mathrm{Li_{0.5}CoO_2}$ ([[materials-chemistry/energy-materials]]).

### The sol–gel process

::: definition Sol–gel processing {#def-sol-gel}
In the **sol–gel** process a molecular precursor, usually a metal alkoxide $\mathrm{M(OR)}_n$ such as tetraethyl orthosilicate (TEOS, $\mathrm{Si(OC_2H_5)_4}$), is converted into an oxide network by two reactions in solution:
$$
\begin{aligned}
&\text{hydrolysis:} && \equiv\mathrm{Si{-}OR} + \mathrm{H_2O} \rightarrow \equiv\mathrm{Si{-}OH} + \mathrm{ROH},\\
&\text{condensation:} && \equiv\mathrm{Si{-}OH} + \mathrm{HO{-}Si}\equiv \rightarrow \equiv\mathrm{Si{-}O{-}Si}\equiv + \mathrm{H_2O} \quad (\text{or} + \mathrm{ROH}).
\end{aligned}
$$
Condensation first gives colloidal particles or branched oligomers suspended in the liquid (a **sol**); continued linking produces a network that spans the whole vessel (a **gel**), at the **gel point**, where the viscosity diverges. Drying the gel gives a **xerogel** (with shrinkage and often cracking) or, if the liquid is removed supercritically so that no liquid–vapour meniscus forms, an **aerogel** of very low density. Heating converts either to a dense glass or ceramic. The overall reaction for TEOS is $\mathrm{Si(OC_2H_5)_4} + 2\,\mathrm{H_2O} \rightarrow \mathrm{SiO_2} + 4\,\mathrm{C_2H_5OH}$.
:::

Both steps are catalysed by acid or base, and the catalyst decides the texture. Under acid catalysis hydrolysis is fast and condensation slow and favoured at the ends of chains, giving weakly branched, polymer-like networks and fine-pored, dense gels. Under base catalysis condensation is faster at the more acidic, more highly condensed silicon centres, so particles grow by adding monomers to existing clusters, giving dense colloidal spheres (the basis of Werner Stöber's 1968 method for monodisperse silica spheres) and more porous gels. The ratio $R = [\mathrm{H_2O}]/[\mathrm{Si}]$ also matters: $R = 2$ is the stoichiometric minimum, and larger $R$ favours complete hydrolysis before condensation. Transition-metal alkoxides (of Ti, Zr, Al) hydrolyse far faster than silicon alkoxides, because the metal is more electropositive and can increase its coordination number, so they are moderated with chelating ligands such as acetylacetone or acetic acid.

Sol–gel chemistry makes optical coatings and anti-reflective films, silica aerogel insulation (densities down to a few $\mathrm{mg\,cm^{-3}}$), porous catalyst supports, bioactive glasses, and the precursors to many ceramic fibres. Its advantages are low temperatures, high purity and the ability to cast films, fibres and monoliths; its drawbacks are cost, shrinkage on drying and residual hydroxyl or carbon.

::: example How much silica from TEOS? {#ex-teos}
A sol is made from $10.0\ \mathrm{cm^3}$ of TEOS (density $0.933\ \mathrm{g\,cm^{-3}}$). (a) What mass of $\mathrm{SiO_2}$ results after complete conversion? (b) What volume of water is needed at $R = 4$, and why is ethanol added as a co-solvent?
::: solution
(a) $M(\mathrm{TEOS}) = 28.085 + 4(2 \times 12.011 + 5 \times 1.008 + 15.999) = 208.33\ \mathrm{g\,mol^{-1}}$. The mass taken is $9.33\ \mathrm{g}$, that is $0.04478\ \mathrm{mol}$, giving $0.04478 \times 60.08 = 2.69\ \mathrm{g}$ of $\mathrm{SiO_2}$, only 29 % of the precursor's mass: the large mass loss and the matching volume shrinkage are intrinsic to sol–gel processing. (b) $R = 4$ means $0.179\ \mathrm{mol}$ of water, $3.23\ \mathrm{g}$ or $3.2\ \mathrm{cm^3}$. TEOS and water are immiscible; ethanol, which is also a product, makes the mixture homogeneous so that hydrolysis begins throughout the liquid rather than only at an interface.
:::
:::

## Hydrothermal and solvothermal synthesis

Many oxides, silicates and other solids that are insoluble in water at room temperature dissolve appreciably in water above $100\,^\circ\mathrm{C}$ under pressure, particularly in the presence of a **mineraliser** (hydroxide, fluoride or carbonate) that forms soluble complexes. In **hydrothermal** synthesis the reactants and water are sealed in an autoclave, a steel vessel usually lined with PTFE (below about $250\,^\circ\mathrm{C}$) or with noble metal, and heated. Material dissolves where it is more soluble and crystallises where it is less, often as well-formed crystals; with other solvents (alcohols, amines, ionic liquids) the method is called **solvothermal**. Natural minerals such as quartz, many zeolites and gem crystals form this way in the Earth's crust, and industry grows tonnes of synthetic quartz crystals for oscillators each year in large autoclaves.

Water's properties change dramatically with temperature. Its relative permittivity falls from $78$ at $25\,^\circ\mathrm{C}$ to about $35$ at $200\,^\circ\mathrm{C}$ and below $10$ near the critical point ($374\,^\circ\mathrm{C}$, $22.1\ \mathrm{MPa}$), so it becomes a much better solvent for covalent species; its ionic product rises to about $10^{-11}$ near $250\,^\circ\mathrm{C}$, making it more strongly acidic and basic at once; and its viscosity falls, speeding transport. In a sealed vessel the pressure is the vapour pressure of the liquid at the reaction temperature, as long as liquid remains; if the vessel is overfilled, the liquid expands to fill it and the pressure rises extremely steeply. That is why autoclaves are filled to no more than about two-thirds and are never heated above their rated temperature.

::: example Pressure in a hydrothermal autoclave {#ex-autoclave}
Estimate the pressure in a correctly filled autoclave held at $200\,^\circ\mathrm{C}$ using the Clausius–Clapeyron equation with $\Delta_\mathrm{vap}H = 40.7\ \mathrm{kJ\,mol^{-1}}$ (its value at the normal boiling point), and compare with the measured vapour pressure of water at that temperature, $1.55\ \mathrm{MPa}$.
::: solution
From the normal boiling point ($p_1 = 1.013\ \mathrm{bar}$ at $T_1 = 373.15\ \mathrm{K}$),
$$
\ln\frac{p_2}{p_1} = -\frac{\Delta_\mathrm{vap}H}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right) = -\frac{40\,700}{8.314}\left(\frac{1}{473.15} - \frac{1}{373.15}\right) = 2.773,
$$
so $p_2 = 1.013 \times e^{2.773} = 16.2\ \mathrm{bar} = 1.6\ \mathrm{MPa}$, close to the measured $1.55\ \mathrm{MPa}$. The agreement is partly fortuitous: $\Delta_\mathrm{vap}H$ falls with temperature (to $34.9\ \mathrm{kJ\,mol^{-1}}$ at $200\,^\circ\mathrm{C}$), and the vapour is non-ideal. At $250\,^\circ\mathrm{C}$ the same estimate gives $4.4\ \mathrm{MPa}$ against a measured $4.0\ \mathrm{MPa}$, and the error grows towards the critical point, where the equation fails entirely ([[thermodynamics/phase-equilibria]]).
:::
:::

Hydrothermal chemistry is the route to **zeolites**, the microporous aluminosilicates of [[materials-chemistry/porous-materials]], which crystallise from alkaline aluminosilicate gels at $80$–$200\,^\circ\mathrm{C}$ around organic or inorganic cations that act as templates for the pores; to most **metal–organic frameworks**, made solvothermally in dimethylformamide or alcohols; and to oxide nanocrystals of controlled shape, such as $\mathrm{TiO_2}$, ZnO and $\mathrm{BaTiO_3}$, whose crystallisation can be steered with additives that bind to particular faces ([[materials-chemistry/nanomaterials]]). Because the products form below the temperatures at which they would rearrange, hydrothermal synthesis often yields **metastable** phases: the product is the one that nucleates fastest, not necessarily the most stable (Ostwald's rule of stages).

::: quiz
Which changes would be expected to speed up the solid-state reaction between two oxide powders that forms a diffusion-limited product layer?
- [x] Grinding the reactants to a smaller particle size
- [x] Raising the reaction temperature
- [ ] Pressing the pellet less firmly
- [x] Regrinding the partly reacted mixture
- [ ] Doubling the mass of each reactant at the same particle size
::: solution
Parabolic kinetics make the time to consume a grain proportional to the square of the diffusion distance, so smaller particles help a lot; temperature increases the diffusion coefficient exponentially; regrinding breaks up product layers and creates fresh contacts. Pressing less firmly reduces the contact area between grains and slows the reaction. Scaling up the batch at the same particle size changes neither the diffusion distances nor the rate per grain.
:::
:::

## Vapour-phase methods

### Chemical vapour deposition

In **chemical vapour deposition** (CVD) volatile precursors react on a heated substrate to deposit a solid film, and the gaseous by-products are pumped away. Examples are silicon from silane or trichlorosilane ($\mathrm{SiHCl_3} + \mathrm{H_2} \rightarrow \mathrm{Si} + 3\,\mathrm{HCl}$, the Siemens process for polysilicon), silicon nitride and silicon dioxide films for microelectronics, the hard coatings of TiN and TiC on cutting tools, diamond films from methane in hydrogen activated by a plasma, and the III–V semiconductor layers of LEDs grown from organometallics (metal–organic CVD, for example $\mathrm{Ga(CH_3)_3} + \mathrm{NH_3} \rightarrow \mathrm{GaN} + 3\,\mathrm{CH_4}$). Many of these precursors are toxic, pyrophoric or corrosive, and industrial CVD equipment is engineered with gas detection, scrubbing and interlocks.

::: proposition Surface-reaction and transport limits in CVD {#prop-grove}
If precursor reaches the surface through a gas boundary layer with mass-transfer coefficient $h_\mathrm{g}$ and reacts there with first-order rate constant $k_\mathrm{s}$, the steady-state deposition flux for a gas-phase precursor concentration $c_\mathrm{g}$ is
$$
J = \frac{k_\mathrm{s}h_\mathrm{g}}{k_\mathrm{s} + h_\mathrm{g}}\,c_\mathrm{g}, \qquad \frac{1}{J} = \frac{1}{c_\mathrm{g}}\left(\frac{1}{k_\mathrm{s}} + \frac{1}{h_\mathrm{g}}\right).
$$ {#eq-grove}
At low temperature, $k_\mathrm{s} \ll h_\mathrm{g}$ and $J \approx k_\mathrm{s}c_\mathrm{g}$: the growth is **surface-reaction limited**, strongly temperature dependent (Arrhenius, $k_\mathrm{s} = A e^{-E_\mathrm{a}/RT}$) and uniform over a substrate. At high temperature, $k_\mathrm{s} \gg h_\mathrm{g}$ and $J \approx h_\mathrm{g}c_\mathrm{g}$: the growth is **mass-transport limited**, nearly independent of temperature but sensitive to gas flow and reactor geometry. (This is the Grove model; it assumes first-order surface kinetics and no gas-phase reaction.)
:::

::: proof
In steady state the flux through the boundary layer, $h_\mathrm{g}(c_\mathrm{g} - c_\mathrm{s})$, where $c_\mathrm{s}$ is the concentration at the surface, equals the rate of surface reaction, $k_\mathrm{s}c_\mathrm{s}$. Solving, $c_\mathrm{s} = h_\mathrm{g}c_\mathrm{g}/(k_\mathrm{s} + h_\mathrm{g})$, and $J = k_\mathrm{s}c_\mathrm{s} = k_\mathrm{s}h_\mathrm{g}c_\mathrm{g}/(k_\mathrm{s} + h_\mathrm{g})$. The two steps act like resistances in series, $1/k_\mathrm{s}$ and $1/h_\mathrm{g}$, and the larger resistance controls the rate. The limits follow by dropping the smaller term.
:::

::: widget plot
f: log(1e9*exp(-18.04*x)*h/(1e9*exp(-18.04*x) + h))/log(10); log(1e9*exp(-18.04*x))/log(10)
x: 0.6, 1.6
y: -4, 3
sliders: h=5:0.5:50:0.5
labels: \log_{10}(J/c_\mathrm{g})\ \text{(Grove model)}; \log_{10}k_\mathrm{s}
caption: Deposition rate constant $J/c_\mathrm{g}$ (in $\mathrm{cm\,s^{-1}}$) from [[#eq-grove]] against $x = 1000\ \mathrm{K}/T$, for illustrative values $k_\mathrm{s} = 10^9\exp(-E_\mathrm{a}/RT)\ \mathrm{cm\,s^{-1}}$ with $E_\mathrm{a} = 150\ \mathrm{kJ\,mol^{-1}}$ (so the exponent is $-18.04x$) and a mass-transfer coefficient $h_\mathrm{g}$ (slider, $\mathrm{cm\,s^{-1}}$). At large $x$ (low $T$) the curve follows the steep Arrhenius line of the surface reaction; at small $x$ it flattens at $h_\mathrm{g}$. Increasing the gas flow (larger $h_\mathrm{g}$) raises the plateau and moves the crossover to higher temperature. Semiconductor manufacturers usually work in the surface-limited regime, where many wafers stacked close together are coated uniformly.
:::

### Atomic layer deposition

**Atomic layer deposition** (ALD) splits a CVD reaction into two half-reactions separated in time. For aluminium oxide, a pulse of trimethylaluminium reacts with surface hydroxyl groups until they are used up, $\equiv\mathrm{OH} + \mathrm{Al(CH_3)_3} \rightarrow \equiv\mathrm{O{-}Al(CH_3)_2} + \mathrm{CH_4}$; the excess is purged; a pulse of water then converts the methyl groups to hydroxyls, $\equiv\mathrm{Al{-}CH_3} + \mathrm{H_2O} \rightarrow \equiv\mathrm{Al{-}OH} + \mathrm{CH_4}$; and the cycle repeats. Because each half-reaction is **self-limiting**, stopping when the surface sites are saturated, every cycle deposits the same amount (about $0.1\ \mathrm{nm}$ of $\mathrm{Al_2O_3}$, less than a monolayer), independent of precursor dose and of the shape of the surface. ALD coats deep trenches and porous solids conformally with thickness control to a fraction of a nanometre, which is why it is used for the high-permittivity gate dielectrics ($\mathrm{HfO_2}$) of modern transistors. Its drawback is speed: films more than about $100\ \mathrm{nm}$ thick take a long time. Tuomo Suntola developed the method in Finland in the 1970s (as "atomic layer epitaxy"), and independent Soviet work on "molecular layering" dates from the 1960s.

Other vapour methods use no chemical reaction: **physical vapour deposition** by evaporation or sputtering, **molecular-beam epitaxy**, which grows semiconductor layers one atomic plane at a time in ultra-high vacuum, and **chemical vapour transport**, in which a transporting agent such as iodine carries a solid from one end of a sealed tube to the other along a temperature gradient by a reversible reaction, growing single crystals (for example $\mathrm{ZrS_2}$ or $\mathrm{Fe_3O_4}$).

## Growing single crystals

Physical measurements and single-crystal diffraction need crystals, and devices need very large, very perfect ones. **Czochralski growth** pulls a rotating seed crystal slowly from a melt; nearly all silicon for chips is grown this way, as cylinders up to $300\ \mathrm{mm}$ in diameter and two metres long, with impurity levels below one part per billion after zone refining of the feedstock. **Flux growth** dissolves the components in a molten salt or oxide (PbO, $\mathrm{B_2O_3}$, alkali halides) and crystallises them by slow cooling, below the melting point of the product. **Floating-zone** furnaces melt a small zone of a polycrystalline rod with focused light and move it along the rod, avoiding any crucible. The **Verneuil** flame-fusion method, introduced in 1902, made synthetic ruby and sapphire the first commercially synthesised gemstones.

## Where this leads

The routes of this chapter recur throughout the course. The porous solids of [[materials-chemistry/porous-materials]] are made almost entirely by hydrothermal and solvothermal routes; the quantum dots and metal nanoparticles of [[materials-chemistry/nanomaterials]] by solution nucleation and growth, and graphene and nanotubes by CVD; and battery cathodes, solid electrolytes and solar absorbers of [[materials-chemistry/energy-materials]] by ceramic, sol–gel and vapour routes. The polymer analogues of sol–gel network formation are treated in [[polymer-chemistry/step-growth]], and the greener choices of solvent and energy input in [[green-chemistry/safer-solvents]].

::: history
Solid-state reactions were studied systematically by Gustav Tammann in Göttingen in the 1920s, and Carl Wagner's analysis of reaction kinetics through product layers dates from 1933–36. W. Jander proposed his model for powder reactions in 1927. Robert Bunsen and later Karl Emil von Schafhäutl (1845) made the first hydrothermal syntheses, and Giorgio Spezia grew quartz hydrothermally in 1905; Richard Barrer's hydrothermal syntheses of zeolites began in the 1940s. Jacques-Joseph Ebelmen prepared silica gels from silicon alkoxides in 1845–46, and Samuel Kistler made the first aerogels in 1931; the Stöber method for monodisperse silica spheres was published by Werner Stöber, Arthur Fink and Ernst Bohn in 1968. Jan Czochralski described his crystal-pulling method in 1918, and Auguste Verneuil his flame-fusion method in 1902. Tuomo Suntola patented atomic layer epitaxy in 1974.
:::

::: summary
- The ceramic method heats intimately mixed precursors well below their melting points; reaction requires ions to diffuse through product layers, so it is slow, and needs fine grinding, pelletising, high temperatures and repeated regrinding.
- Diffusion-limited layers grow parabolically, $x^2 = 2k_\mathrm{p}t$, with an Arrhenius $k_\mathrm{p}$; the time to react scales as the square of the particle size.
- The firing atmosphere fixes the oxygen chemical potential and hence the oxidation states and oxygen content (YBa₂Cu₃O₇ needs an oxygen anneal).
- Soft-chemistry routes (coprecipitation, citrate/Pechini, topotactic reactions, sol–gel) mix components on the atomic scale, lowering temperatures and giving fine or metastable products.
- Sol–gel chemistry proceeds by acid- or base-catalysed hydrolysis and condensation of alkoxides to a sol and then a gel, dried to xerogels or aerogels.
- Hydrothermal and solvothermal syntheses use solvents above their boiling points in sealed autoclaves, where solubility and transport increase; they give zeolites, MOFs, quartz and nanocrystals, often metastable.
- CVD grows films from reacting vapours, surface-limited at low $T$ and transport-limited at high $T$ (Grove model); ALD uses self-limiting half-reactions for conformal films with sub-nanometre control.
:::

## Exercises

::: exercise The Tammann temperature {level=1 check="1563"}
Alumina melts at $2345\ \mathrm{K}$. Estimate the lowest temperature at which it reacts at a useful rate in a solid-state reaction, using the empirical Tammann rule. (Enter the temperature in K.)
::: solution
$T \approx \tfrac23 \times 2345 = 1563\ \mathrm{K}$ (about $1290\,^\circ\mathrm{C}$). The rule is a rough guide: it reflects the temperature at which lattice ions become mobile enough for bulk diffusion, and reactions can begin lower if a more mobile reactant, a liquid flux or a gas-phase species is present.
:::
:::

::: exercise Weighing out strontium titanate {level=1 check="4.023"}
What masses of $\mathrm{SrCO_3}$ and $\mathrm{TiO_2}$ are needed to make $5.00\ \mathrm{g}$ of $\mathrm{SrTiO_3}$? (Enter the mass of $\mathrm{SrCO_3}$ in g, to four significant figures.)
::: solution
$\mathrm{SrCO_3} + \mathrm{TiO_2} \rightarrow \mathrm{SrTiO_3} + \mathrm{CO_2}$. $M(\mathrm{SrTiO_3}) = 183.48\ \mathrm{g\,mol^{-1}}$, so $n = 5.00/183.48 = 0.02725\ \mathrm{mol}$. $\mathrm{SrCO_3}$: $0.02725 \times 147.63 = 4.023\ \mathrm{g}$; $\mathrm{TiO_2}$: $0.02725 \times 79.87 = 2.176\ \mathrm{g}$.
:::
:::

::: exercise Mass loss on firing {level=1 check="1.199"}
For the mixture in the previous exercise, what mass of $\mathrm{CO_2}$ is lost on complete reaction, and what percentage of the initial mass is this? (Enter the mass of $\mathrm{CO_2}$ in g, to four significant figures.)
::: solution
$0.02725 \times 44.009 = 1.199\ \mathrm{g}$, which is $1.199/(4.023 + 2.176) = 19.3\ \%$ of the initial mass. Weighing the pellet before and after firing is a simple check that the carbonate has fully decomposed.
:::
:::

::: exercise Wagner's ratio {level=2 check="3"}
In the formation of $\mathrm{MgAl_2O_4}$ by counter-diffusion of $\mathrm{Mg^{2+}}$ and $\mathrm{Al^{3+}}$ with immobile oxide ions, show that the ratio of spinel formed at the spinel/$\mathrm{Al_2O_3}$ interface to that formed at the MgO/spinel interface is 3. (Enter the ratio.)
::: solution
Charge neutrality of the flux requires $3\mathrm{Mg^{2+}}$ to move one way for every $2\mathrm{Al^{3+}}$ moving the other ($+6$ each way). At the MgO side the arriving $2\mathrm{Al^{3+}}$ react: $2\mathrm{Al^{3+}} + 4\mathrm{MgO} \rightarrow \mathrm{MgAl_2O_4} + 3\mathrm{Mg^{2+}}$, one formula unit. At the $\mathrm{Al_2O_3}$ side the arriving $3\mathrm{Mg^{2+}}$ react: $3\mathrm{Mg^{2+}} + 4\mathrm{Al_2O_3} \rightarrow 3\mathrm{MgAl_2O_4} + 2\mathrm{Al^{3+}}$, three formula units. The ratio is 3 : 1, and the original interface (marked, for example, with inert platinum wires) ends up a quarter of the way across the spinel layer from the MgO side.
:::
:::

::: exercise ALD cycles {level=2 check="182"}
An ALD process deposits $0.11\ \mathrm{nm}$ of $\mathrm{Al_2O_3}$ per cycle. How many cycles are needed for a $20\ \mathrm{nm}$ film, and how long does it take if one cycle (two pulses and two purges) lasts $4.0\ \mathrm{s}$? (Enter the number of cycles, rounded up to a whole number.)
::: solution
$20/0.11 = 181.8$, so $182$ cycles; time $182 \times 4.0\ \mathrm{s} = 728\ \mathrm{s}$, about $12\ \mathrm{min}$. A $1\ \mathrm{\mu m}$ film would need about $9100$ cycles, ten hours, which is why ALD is reserved for very thin, conformal layers.
:::
:::

::: exercise Water for a sol–gel {level=2 check="1.61"}
For the complete conversion of $0.0448\ \mathrm{mol}$ of TEOS to $\mathrm{SiO_2}$, what is the net mass of water consumed? Explain why the hydrolysis step alone needs twice this amount. (Enter the net mass of water in g, to three significant figures.)
::: solution
Net: $\mathrm{Si(OEt)_4} + 2\mathrm{H_2O} \rightarrow \mathrm{SiO_2} + 4\mathrm{EtOH}$, so $2 \times 0.0448 \times 18.015 = 1.61\ \mathrm{g}$. Full hydrolysis, $\mathrm{Si(OEt)_4} + 4\mathrm{H_2O} \rightarrow \mathrm{Si(OH)_4} + 4\mathrm{EtOH}$, uses four water molecules, but condensation of $\mathrm{Si(OH)_4}$ to $\mathrm{SiO_2}$ gives two back. That is why $R = 2$ is the stoichiometric minimum and why sols with $R < 4$ retain unhydrolysed alkoxide groups until late in the process.
:::
:::

::: exercise Where does transport take over? {level=3 check="944"}
In a CVD reactor the surface rate constant is $k_\mathrm{s} = 2.0\times10^8\exp(-E_\mathrm{a}/RT)\ \mathrm{cm\,s^{-1}}$ with $E_\mathrm{a} = 150\ \mathrm{kJ\,mol^{-1}}$, and the mass-transfer coefficient is $h_\mathrm{g} = 1.0\ \mathrm{cm\,s^{-1}}$ (illustrative values). (a) At what temperature are the two equal? (b) By what factor does the deposition rate change between $900$ and $1000\ \mathrm{K}$? (Enter the temperature in (a), in K, to three significant figures.)
::: hint
Set $k_\mathrm{s} = h_\mathrm{g}$ and solve for $T$; for (b) evaluate [[#eq-grove]] at both temperatures.
:::
::: solution
(a) $2.0\times10^8 e^{-E_\mathrm{a}/RT} = 1.0$ gives $E_\mathrm{a}/RT = \ln(2.0\times10^8) = 19.11$, so $T = 150\,000/(8.314 \times 19.11) = 944\ \mathrm{K}$. (b) At $900\ \mathrm{K}$: $k_\mathrm{s} = 2.0\times10^8 e^{-20.05} = 0.393\ \mathrm{cm\,s^{-1}}$, and $k_\mathrm{s}h_\mathrm{g}/(k_\mathrm{s} + h_\mathrm{g}) = 0.393/1.393 = 0.282$. At $1000\ \mathrm{K}$: $k_\mathrm{s} = 2.0\times10^8e^{-18.04} = 2.92$, and $2.92/3.92 = 0.745$. The rate rises by a factor $2.6$, whereas the surface rate constant alone rises by $7.4$: near the crossover, transport already damps the temperature dependence.
:::
:::

::: exercise A hotter autoclave {level=3 check="4.4"}
(a) Use the Clausius–Clapeyron equation with $\Delta_\mathrm{vap}H = 40.7\ \mathrm{kJ\,mol^{-1}}$ to estimate the vapour pressure of water at $250\,^\circ\mathrm{C}$. (b) The measured value is $3.98\ \mathrm{MPa}$. Explain the sign of the error. (c) Why must the autoclave not be filled completely with liquid? (Enter the estimate in MPa, two significant figures.)
::: solution
(a) $\ln(p/1.013\ \mathrm{bar}) = -(40\,700/8.314)(1/523.15 - 1/373.15) = 3.762$, $p = 1.013 \times 43.0 = 43.6\ \mathrm{bar} = 4.4\ \mathrm{MPa}$. (b) The estimate is too high because $\Delta_\mathrm{vap}H$ decreases with temperature (to about $34\ \mathrm{kJ\,mol^{-1}}$ at $250\,^\circ\mathrm{C}$); using the boiling-point value overstates how fast $\ln p$ rises. (c) Liquid water expands on heating (its density falls from $1.00$ to $0.80\ \mathrm{g\,cm^{-3}}$ between $25$ and $250\,^\circ\mathrm{C}$). If it fills the vessel, there is no vapour space and the pressure is set by compressing the liquid, rising by many megapascals per kelvin until the vessel fails. Autoclaves are therefore filled to well below the volume the liquid would occupy at the working temperature.
:::
:::

::: exercise Halving the grain size {level=2 check="0.25"}
A solid-state reaction between powders of mean grain radius $10\ \mathrm{\mu m}$ is complete in $40\ \mathrm{h}$. Assuming parabolic kinetics and that completion requires the product layer to grow to the grain radius, what fraction of this time would grains of radius $5\ \mathrm{\mu m}$ need? (Enter the fraction.)
::: solution
$t \propto x^2$, so $t(5\ \mathrm{\mu m})/t(10\ \mathrm{\mu m}) = (5/10)^2 = 0.25$, that is $10\ \mathrm{h}$. Going to $0.1\ \mathrm{\mu m}$ (as in a sol–gel or coprecipitated precursor) would cut the time by $10^4$, to about $15\ \mathrm{s}$ at the same temperature, or allow a much lower temperature.
:::
:::
