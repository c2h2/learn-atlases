A large tree on a summer day moves hundreds of litres of water from the soil to its leaves, lifting it tens of metres against gravity, through pipes narrower than a hair, without any pump. Almost all of that water — well over 95 % — evaporates from the leaves into the air. To a first approximation, a plant is a wick connecting moist soil to dry air, with leaves as the wet end where the evaporating water is exchanged for carbon dioxide. Meanwhile a second, smaller and slower stream runs in the opposite direction through the phloem, carrying sugar from the leaves to the roots, fruits and growing tips under positive pressure.

This chapter explains both streams. We begin with **water potential**, the single quantity that tells us which way water will move, and apply it to cells, soil and air. We then follow water from the soil into the root, up the xylem and out through the stomata, and examine the remarkable claim at the heart of the **cohesion–tension theory**: that the water in the xylem is under negative pressure, stretched like a rope, and that the plant's main hydraulic risk is that the rope snaps. Finally we turn to the phloem and the **pressure-flow** mechanism that drives sugar from sources to sinks. The cells involved — tracheids, vessel elements, sieve elements and companion cells — were introduced in [[plant-biology/plant-cells-tissues]], and the anatomy of roots and leaves in [[plant-biology/plant-form]].

## Water potential

Water moves by bulk flow when pushed by a pressure difference, and by diffusion and osmosis when its concentration — more precisely its chemical potential — differs between two places. Plant physiologists combine all of these into one measure, the chemical potential of water expressed per unit volume, which has the units of pressure.

::: definition Water potential {#def-psi}
The **water potential** $\Psi$ of water in a system is its chemical potential $\mu_w$ relative to that of pure, free water at atmospheric pressure, at the same temperature and a reference height, divided by the partial molar volume of water $\bar V_w$ ($18.0\times10^{-6}$ m³ mol⁻¹):

$$
\Psi = \frac{\mu_w - \mu_w^{\circ}}{\bar V_w}.
$$

It is measured in pascals (usually megapascals, MPa). Pure water at atmospheric pressure has $\Psi = 0$. **At constant temperature, water moves spontaneously from regions of higher to lower water potential**, whether by diffusion, osmosis or bulk flow.
:::

The water potential of a solution in a plant can be split into terms that each represent one way of changing the chemical potential of water.

::: proposition Components of water potential {#prop-psi}
For water in a plant cell, the xylem or soil,

$$
\Psi = \Psi_s + \Psi_p + \Psi_g \;(+\,\Psi_m),
$$ {#eq-psi}

where

- the **solute (osmotic) potential** $\Psi_s = -cRT$ for a dilute solution of total osmolality $c$ (van 't Hoff's relation; [[biochemistry/water-and-bonds]]), always zero or negative;
- the **pressure potential** $\Psi_p$ is the hydrostatic pressure above atmospheric — positive in turgid cells (turgor) and in the phloem, negative (tension) in the xylem of a transpiring plant;
- the **gravitational potential** $\Psi_g = \rho_w g h$, about $+0.0098$ MPa for each metre of height above the reference level;
- the **matric potential** $\Psi_m$ (used mainly for soils and cell walls) accounts for the binding of water to surfaces and capillaries, and is negative.
:::

The solute term is negative because dissolved solutes dilute the water and lower its chemical potential; the pressure term can be either sign. A turgid cell is a balance between the two: its solute potential pulls water in, its wall pushes back, and at equilibrium with pure water $\Psi_p = -\Psi_s$.

::: example Which way will water move? {#ex-psi-cell}
A potato tuber cell at 20 °C has sap of osmolality 0.30 osmol kg⁻¹ and a turgor of 0.50 MPa. (a) Find its water potential. (b) A slice of tuber is placed in pure water, and another in 0.20 mol kg⁻¹ sucrose. In which direction does water move in each case?
::: solution
(a) $\Psi_s = -cRT = -300\ \text{mol m}^{-3}\times8.314\times293.15\ \text{J mol}^{-1} = -7.31\times10^5$ Pa $= -0.731$ MPa. With $\Psi_p = +0.50$ MPa, $\Psi = -0.731 + 0.50 = -0.23$ MPa.

(b) Pure water has $\Psi = 0 > -0.23$ MPa, so water enters the cells; they swell slightly until their turgor rises to about 0.73 MPa, when $\Psi$ inside reaches zero. Sucrose at 0.20 mol kg⁻¹ has $\Psi = \Psi_s = -0.487$ MPa $< -0.23$ MPa, so water leaves the cells: the slice loses mass and becomes flaccid, and if the turgor falls to zero before equilibrium is reached, the cells plasmolyse. Weighing tissue slices in a series of solutions, and finding the concentration in which their mass does not change, is the classic way to measure tissue water potential.
:::
:::

Water potentials found in and around a plant span an enormous range:

| system | typical $\Psi$ (MPa) |
|---|---|
| pure water at atmospheric pressure | 0 |
| moist soil at field capacity | about −0.01 to −0.03 |
| soil at the conventional permanent wilting point | −1.5 |
| leaf of a well-watered crop at midday | −0.5 to −1.5 |
| leaf of a desert shrub in drought | −4 to below −8 |
| seawater | about −2.5 |
| air at 98 % relative humidity, 20 °C | −2.7 |
| air at 50 % relative humidity, 20 °C | −94 |

The last two rows come from the water potential of water vapour, which follows from the chemical potential of an ideal gas.

::: proposition Water potential of air {#prop-psi-air}
Air whose water vapour has partial pressure $e$, at a temperature where the saturation vapour pressure is $e_s$, has relative humidity $h = e/e_s$ and water potential

$$
\Psi_\text{air} = \frac{RT}{\bar V_w}\ln h .
$$ {#eq-psi-air}

At 20 °C, $RT/\bar V_w \approx 135$ MPa.
:::

::: proof
For water vapour treated as an ideal gas, $\mu_w = \mu_w^\circ + RT\ln(e/e_s)$, where $\mu_w^\circ$ is the chemical potential of vapour in equilibrium with pure liquid water at the same temperature, which by definition corresponds to $\Psi = 0$. Dividing by $\bar V_w$ gives [[#eq-psi-air]]. With $R = 8.314$ J mol⁻¹ K⁻¹, $T = 293.15$ K and $\bar V_w = 18.05\times10^{-6}$ m³ mol⁻¹, $RT/\bar V_w = 1.350\times10^8$ Pa.
:::

The logarithm makes the air an overwhelming sink. At 50 % relative humidity, $\Psi_\text{air} = 135\ln 0.5 = -94$ MPa, a hundred times more negative than a leaf. Even nearly saturated air, at 99 %, has $\Psi = -1.36$ MPa. The steep fall in water potential from leaf to air, not any work done by the plant, is what drives transpiration.

::: widget plot
f: 8.314*(T + 273.15)/18.05*ln(x)
x: 0.3, 1
y: -170, 0
sliders: T=20:0:40:1
points: 0.5, -93.6; 0.98, -2.73
labels: \Psi_\text{air} = (RT/\bar V_w)\ln h
caption: Water potential of air (MPa, vertical) against relative humidity $h$ (horizontal, as a fraction), from [[#eq-psi-air]], at the temperature $T$ (°C) set by the slider. The marked points are 50 % and 98 % humidity at 20 °C. Only in the last couple of per cent before saturation does the air's water potential become comparable with that of a leaf (−0.5 to −2 MPa); everywhere else the air is an enormous sink. Temperature changes the curve only slightly, through $T$ in $RT/\bar V_w$ — the strong effect of temperature on transpiration comes instead through the saturation vapour pressure, which sets the humidity for a given amount of water in the air.
:::

::: warning "Water flows from dilute to concentrated solutions"
Osmosis is often taught as water moving towards higher solute concentration. That is true only when pressures and heights are equal. Water moves down a gradient of total water potential, and pressure can outweigh solutes. A turgid cell in a dilute solution can lose water to it if its turgor is high enough; water in the xylem moves upwards from roots to leaves although the xylem sap is almost pure water at both ends, because the tension is greater above; and sugar solution in the phloem flows towards sinks by bulk flow, carrying its solutes with it. Always add up all the terms of [[#eq-psi]] before deciding which way water will go.
:::

## From soil to root

Soil water is held in pores between particles and in films on their surfaces, at a matric potential that becomes more negative as the soil dries and the remaining water retreats into smaller pores. As a root takes up water, the soil around it dries, and water flows towards it from farther away; root hairs, by extending the absorbing surface into the soil, shorten this path.

Inside the root, water can travel to the xylem by three routes: through the cell walls (**apoplastic** path), from cell to cell through plasmodesmata (**symplastic** path), or across membranes from one cell to the next (**transcellular** path). At the endodermis the Casparian strip blocks the apoplastic path, so all water and solutes must at some point cross a plasma membrane ([[plant-biology/plant-cells-tissues]]). Water crosses membranes mostly through **aquaporins**, channel proteins that conduct water in single file while excluding ions and protons. Aquaporins were discovered by Peter Agre and colleagues in 1992, in human red blood cells; Christophe Maurel, Maarten Chrispeels and colleagues showed in 1993 that a tonoplast protein of *Arabidopsis* is one. *Arabidopsis* has 35 aquaporin genes, in plasma-membrane (PIP) and tonoplast (TIP) families among others, and plants regulate root hydraulic conductance by gating them: anoxia, which acidifies the cytosol, closes PIPs by protonating a histidine, one reason why waterlogged plants wilt.

Because the endodermis forces solutes to cross membranes, the root can accumulate ions in the xylem. When transpiration is low — at night, in humid air — ions pumped into the xylem lower its water potential, water follows osmotically, and a positive **root pressure** builds up, usually a few tenths of a megapascal at most. Root pressure is responsible for **guttation**, the beads of xylem sap exuded from leaf margins on humid mornings, and for the "bleeding" of cut vines that Stephen Hales measured in 1727. It may help refill embolised vessels in some species. But it is far too small, and absent in many species including most conifers, to lift water to the top of a tree.

## Up the xylem: cohesion and tension

### The cohesion–tension theory

How does water reach the leaves of a 100 m tree? The answer proposed by Henry Dixon and John Joly in 1894, and now overwhelmingly supported, is that it is pulled. Water evaporates from the wet walls of mesophyll cells into the leaf's air spaces. As it does, the air–water interfaces retreat into the fine pores of the cell walls, where they curve; the surface tension of these curved menisci holds the water in place and puts the water behind them under negative pressure. The tension is transmitted through the continuous water columns of the xylem to the roots and soil. The columns do not break because water molecules attract one another by hydrogen bonds ([[biochemistry/water-and-bonds]]): pure water free of dissolved gas and nucleation sites has a tensile strength of tens of megapascals or more.

::: definition Transpiration and the soil–plant–atmosphere continuum {#def-spac}
**Transpiration** is the evaporation of water from a plant, mostly from the internal surfaces of leaves through the stomata. The water path from soil through root, xylem and leaf to the air is called the **soil–plant–atmosphere continuum**. In the steady state, the same flux passes through each segment, and the water potential falls along the path in proportion to the resistance of each segment, like a current through resistors in series.
:::

Three lines of evidence support the theory. First, the water in the xylem of transpiring plants is under tension: a cut stem draws in water or dye, and the **pressure chamber** of Per Scholander and colleagues (1965) measures it directly. A cut leafy shoot is sealed in a chamber with its cut end protruding; the chamber is pressurised until sap just appears at the cut surface. The balancing pressure equals the tension that existed in the xylem, typically 0.5–2 MPa in crops and much more in drought-adapted shrubs. Second, stems shrink measurably in diameter during the day as tension rises, and swell again at night. Third, flow starts at the top: on a sunny morning, sap flow begins in twigs before it begins at the base of the trunk.

How large are the tensions needed? The water must be lifted against gravity — 0.0098 MPa per metre — and pulled through the resistance of the xylem.

### Flow through a pipe

::: proposition Hagen–Poiseuille law {#prop-poiseuille}
For steady, laminar flow of a liquid of viscosity $\eta$ through a cylindrical tube of radius $r$ and length $L$ under a pressure difference $\Delta P$, the volume flow rate and mean velocity are

$$
Q = \frac{\pi r^4}{8\eta}\,\frac{\Delta P}{L}, \qquad \bar v = \frac{Q}{\pi r^2} = \frac{r^2}{8\eta}\,\frac{\Delta P}{L}.
$$ {#eq-poiseuille}

The assumptions are laminar flow (true at the low Reynolds numbers of plant conduits), a rigid tube of circular cross-section, a Newtonian liquid and no slip at the wall.
:::

::: proof
Consider a coaxial cylinder of fluid of radius $s$ in the tube. In steady flow the pressure force on its ends, $\pi s^2\Delta P$, balances the viscous drag on its curved surface, $-2\pi sL\,\eta\,\dd u/\dd s$, where $u(s)$ is the velocity at radius $s$. So $\dd u/\dd s = -s\Delta P/(2\eta L)$, and with $u(r) = 0$ at the wall, $u(s) = \frac{\Delta P}{4\eta L}(r^2 - s^2)$, a parabolic profile. Integrating, $Q = \int_0^r 2\pi s\,u(s)\,\dd s = \frac{\pi\Delta P}{2\eta L}\left[\frac{r^2 s^2}{2} - \frac{s^4}{4}\right]_0^r = \frac{\pi r^4\Delta P}{8\eta L}$.
:::

The fourth power of the radius is the key fact of xylem design. A vessel twice as wide carries sixteen times as much water under the same gradient. Wide vessels are what make the wood of oaks, vines and lianas so conductive — and also, as we shall see, what makes it vulnerable.

::: example Vessels and tracheids {#ex-poiseuille}
(a) A vessel of radius 50 µm and a tracheid of radius 10 µm experience the same pressure gradient. How much more water does the vessel carry, per conduit and per unit area of lumen? (b) Water at 20 °C ($\eta = 1.0\times10^{-3}$ Pa s) flows through a vessel of radius 40 µm under a pressure gradient of 0.02 MPa m⁻¹ beyond that needed to balance gravity. Estimate the mean velocity, in metres per hour.
::: solution
(a) Per conduit the ratio is $(50/10)^4 = 625$. Per unit lumen area, divide by the area ratio $(50/10)^2 = 25$: the vessel conducts $25$ times more water per unit area. Conifer wood, built of tracheids typically 10–20 µm in radius, is far less conductive per unit area than vessel-bearing wood. (Tracheids are also closed at their ends, so water must pass through pits from one to the next, which adds resistance; we have ignored this.)

(b) By [[#eq-poiseuille]], $\bar v = \dfrac{(40\times10^{-6})^2}{8\times1.0\times10^{-3}}\times2\times10^{4} = 4.0\times10^{-3}$ m s⁻¹ $= 14$ m h⁻¹. Measured peak sap velocities are of this order in species with wide vessels, and a metre per hour or less in conifers.
:::
:::

### Breaking the rope: cavitation and embolism

Water under tension is metastable. If a bubble of gas enters a conduit, the water in that conduit snaps back from the walls, the conduit fills with water vapour and air, and it stops conducting: it is **embolised**. Bubbles usually enter by **air-seeding** through the pit membranes that separate an embolised conduit from a functional one. A pit membrane is a porous sheet of primary wall; an air–water meniscus spanning one of its pores can resist a pressure difference set by surface tension.

::: proposition Air-entry pressure of a pore {#prop-laplace}
A hemispherical meniscus of an air–water interface in a circular pore of radius $r$ can sustain a pressure difference

$$
\Delta P = \frac{2\gamma}{r},
$$ {#eq-laplace}

where $\gamma \approx 0.072$ N m⁻¹ is the surface tension of water at 25 °C. If the pressure difference across the pore exceeds this, air is pulled through (Young–Laplace equation; assumes a perfectly wetting wall, contact angle zero).
:::

::: example How fine must the pores be? {#ex-laplace}
(a) Pit membranes in a species' xylem have their largest pores about 50 nm in radius. At what xylem tension will air from an embolised neighbour be pulled through? (b) In leaves, the menisci at the evaporating surfaces lie in pores of the cell-wall matrix only about 5 nm in radius. What tension can they support?
::: solution
(a) $\Delta P = 2\times0.072/(50\times10^{-9}) = 2.9\times10^6$ Pa $= 2.9$ MPa. Air seeding is set by the *largest* pore in the pit membranes between two conduits, and there are thousands of pits per vessel, so the rare large pore matters most. This is why embolism resistance correlates with pit-membrane structure.
(b) $2\times0.072/(5\times10^{-9}) = 2.9\times10^7$ Pa $\approx 29$ MPa. The wall matrix of mesophyll cells can hold water against tensions far larger than any found in leaves; this is how evaporation can generate tension without letting air into the leaf's xylem.
:::
:::

Plants differ greatly in how much tension their xylem can stand. The standard measure is a **vulnerability curve**: the percentage loss of hydraulic conductivity (PLC) of stems exposed to increasing tension, measured by centrifugation, air injection, X-ray microtomography or optical methods. The tension at which half the conductivity is lost, $P_{50}$, ranges from about −1 MPa in some tropical and riverside trees to below −10 MPa in some desert shrubs and conifers. A widely used empirical description is a sigmoid function of the xylem pressure $\Psi_x$:

$$
\text{PLC} = \frac{100}{1 + \exp\bigl(a(\Psi_x - P_{50})\bigr)},
$$ {#eq-vc}

with $a$ setting the steepness (Norman Pammenter and Caroline Vander Willigen, 1998).

::: widget plot
f: 100/(1 + exp(s*(x - p)))
x: -10, 0
y: 0, 100
sliders: p=-2.5:-9:-0.5:0.1; s=2:0.5:6:0.1
labels: \text{PLC}(\Psi_x)
hlines: 50
caption: A xylem vulnerability curve, [[#eq-vc]]: percentage loss of conductivity (vertical) against xylem pressure (MPa, horizontal; more negative to the left). The slider $p$ sets $P_{50}$, where the curve crosses the 50 % line; $s$ sets how steeply conductivity collapses. Move $p$ from −2.5 (a typical temperate broadleaf tree) to −8 (a drought-adapted shrub) and notice how far the tolerable range of tension extends. A plant's **safety margin** is the distance between the most negative pressure it normally experiences and its $P_{50}$ (or $P_{88}$, at 88 % loss, for many conifers).
:::

A survey of 226 woody species by Brendan Choat and colleagues (2012) found that most species, in wet and dry biomes alike, operate with narrow safety margins of under 1 MPa: trees build xylem just safe enough for the droughts they usually meet. This explains why drought kills trees across many forests: when a drought pushes tensions beyond $P_{50}$ and towards $P_{88}$, runaway embolism cuts the water supply to the canopy, a process called hydraulic failure. There is a trade-off between efficiency and safety, but it is weak: wide vessels conduct well but tend to have more pit area and so more chances of a leaky pore, and they are also more prone to embolism by freezing and thawing, because gas dissolved in the sap forms larger bubbles in wider conduits as it freezes.

## Out through the stomata

Water vapour leaves the leaf by diffusion through the stomata. The flux depends on the difference in vapour concentration between the saturated air spaces of the leaf and the surrounding air, and on the stomatal conductance, a measure of how wide and how numerous the open pores are.

::: proposition Transpiration rate {#prop-transpiration}
The transpiration rate per unit leaf area, $E$ (mol m⁻² s⁻¹), is

$$
E = g_s\,\frac{e_s(T_\text{leaf}) - e_a}{P_\text{atm}},
$$ {#eq-transpiration}

where $g_s$ is the total conductance to water vapour of the stomata and boundary layer (mol m⁻² s⁻¹), $e_s(T_\text{leaf})$ is the saturation vapour pressure at leaf temperature (the leaf's air spaces are assumed saturated), $e_a$ is the vapour pressure of the air, and $P_\text{atm}$ is atmospheric pressure. The numerator is the **leaf-to-air vapour pressure deficit** (VPD). This is Fick's law ([[cell-biology/membrane-transport#prop-fick]]) written with mole fractions.
:::

::: example A tree's daily water loss {#ex-transpiration}
A leaf has a stomatal conductance of 0.30 mol m⁻² s⁻¹, at an air pressure of 101.3 kPa and a leaf-to-air vapour pressure deficit of 2.0 kPa. (a) What is its transpiration rate? (b) If this rate holds for an average of 10 hours a day, how much water does a tree with 200 m² of leaf area transpire per day?
::: solution
(a) By [[#eq-transpiration]], $E = 0.30\times2.0/101.3 = 5.9\times10^{-3}$ mol m⁻² s⁻¹, or 5.9 mmol m⁻² s⁻¹.

(b) Per square metre per day: $5.9\times10^{-3}\times18\ \text{g mol}^{-1}\times36{,}000\ \text{s} = 3.8$ kg. For 200 m², about 770 kg — some 770 litres. Real trees lose less on average (stomata partly close during the hottest hours, and shaded leaves transpire less), but daily water use of a few hundred litres by a large tree is realistic. The water-use efficiency of this exchange — how many molecules of water are lost per CO₂ fixed — is calculated in [[diversity-of-life/land-plants]].
:::
:::

Stomata are the plant's control valves. Each pore is flanked by two **guard cells** whose turgor determines its aperture. To open, guard cells pump protons out through plasma-membrane H⁺-ATPases, activated by blue light acting through phototropin photoreceptors; the resulting hyperpolarisation opens inward-rectifying K⁺ channels, and K⁺ enters together with Cl⁻ and with malate made inside the cell. Water follows, turgor rises to several megapascals, and the guard cells bow apart. Closure reverses this: the hormone abscisic acid, made in response to water deficit, activates anion channels (SLOW ANION CHANNEL-ASSOCIATED 1, SLAC1), depolarising the membrane, and K⁺ leaves through outward-rectifying channels ([[plant-biology/plant-hormones]]). Stomata also respond to CO₂ (closing when intercellular CO₂ rises), to humidity, and to a circadian clock. Through them a plant trades water for carbon minute by minute.

::: intuition Why tiny pores leak so much
Open stomata occupy only about 1–3 % of the leaf surface, yet a leaf with open stomata can transpire at a substantial fraction of the rate of a free water surface of the same area. Horace Brown and Fergusson Escombe (1900) explained why: diffusion out of a small pore is not proportional to the pore's area but, to a good approximation, to its diameter, because molecules spread out in a hemispherical shell around each pore. Many small, well-spaced pores are therefore almost as effective as one large opening — and they can be closed independently.
:::

::: quiz
On a hot afternoon, a sunflower's leaves wilt although the soil is moist. Which is the most likely explanation?
- [ ] Root pressure has failed
- [ ] The air's water potential has risen above that of the leaf
- [x] Transpiration is faster than water can be supplied through the roots and xylem, so leaf water potential and turgor fall
- [ ] Water is moving from the leaves back to the roots by osmosis
::: solution
When the evaporative demand is high, the flux through the soil–plant–atmosphere continuum requires a large drop in water potential across the resistances of the root and xylem. The leaf water potential falls until turgor in the leaf cells is lost and they wilt, even though there is plenty of water in the soil; leaves often recover in the evening. Root pressure plays no role in transpiring plants, and air is always far more negative in water potential than the leaf except at saturation.
:::
:::

## The phloem: pressure flow from source to sink

Sugars made in mature leaves (**sources**) travel to roots, growing shoots, developing seeds, fruits and storage organs (**sinks**). They travel dissolved in the sap of sieve tubes, mainly as sucrose (in some families as raffinose-family oligosaccharides or sugar alcohols), at concentrations of several hundred millimoles per litre, together with amino acids, ions, hormones, proteins and RNAs. A leaf that is a sink when young becomes a source as it matures and its plasmodesmata change ([[plant-biology/plant-cells-tissues]]).

The difficulty in studying phloem is that sieve tubes are under high pressure and react to wounding within seconds by sealing their sieve plates with proteins and callose, so cutting into them disturbs what one wants to measure. An elegant way round this was found by John Kennedy and Tom Mittler (1953): aphids feed by inserting their stylets into a single sieve element; if an anaesthetised aphid is cut away from its stylet, sap continues to exude from the stylet for hours, driven by the sieve tube's own pressure, and can be collected and analysed.

::: definition The pressure-flow (Münch) hypothesis {#def-munch}
In the **pressure-flow hypothesis** proposed by Ernst Münch in 1930, sugar is loaded into sieve elements at the source, lowering their solute potential; water enters from the surrounding xylem and tissues by osmosis, building a high turgor. At the sink, sugar is removed, water leaves and turgor falls. The resulting **pressure gradient** drives bulk flow of the sap — water and solutes together — through the sieve tubes from source to sink. Sieve tubes are the conduits; the energy is spent on the membrane transport of sugar at the two ends.
:::

The direction of phloem flow is therefore set by where sugar is loaded and unloaded, not by gravity: it can be upward or downward and changes over the season. Velocities measured with tracers are typically 0.3–1.5 m h⁻¹.

::: example The pressure gradient needed in a sieve tube {#ex-munch}
A sieve tube has a radius of 10 µm; its sap, with about 0.5 mol L⁻¹ sucrose, has a viscosity of about $1.7\times10^{-3}$ Pa s. (a) What pressure gradient will drive a mean velocity of 0.5 m h⁻¹, ignoring sieve plates? (b) What is the mass flux of sucrose per unit area of sieve tube lumen, in g cm⁻² h⁻¹? (c) What is the osmotic pressure of the sap at 20 °C?
::: solution
(a) Rearranging [[#eq-poiseuille]], $\Delta P/L = 8\eta\bar v/r^2 = 8\times1.7\times10^{-3}\times(0.5/3600)/(10^{-5})^2 = 1.9\times10^4$ Pa m⁻¹ $= 0.019$ MPa m⁻¹. Sieve plates roughly double the resistance, so about 0.04 MPa m⁻¹ — 0.4 MPa over 10 m.

(b) The sucrose concentration is $0.5\times342\ \text{g L}^{-1} = 171$ g L⁻¹ $= 0.171$ g cm⁻³; at 50 cm h⁻¹ the flux is $0.171\times50 = 8.6$ g cm⁻² h⁻¹. Measured "specific mass transfer" rates in many plants are of this order.

(c) $\Pi = cRT = 500\times8.314\times293 = 1.2$ MPa (more if other solutes are included). Sieve-tube turgor of around 1 MPa at the source, falling towards the sink, is ample to drive flow over a few metres — consistent with Münch's mechanism. Whether it is ample in the tallest trees, over 100 m of phloem, has been questioned; measurements suggest that trees compensate partly with wider sieve tubes and more porous sieve plates lower down.
:::
:::

### Loading and unloading

How sugar enters the sieve elements at the source differs among plants, and three strategies are recognised.

1. **Apoplastic loading.** Sucrose made in mesophyll cells moves symplastically towards the veins, then is exported into the cell wall space by **SWEET** transporters (uniporters that let sucrose move down its concentration gradient), discovered by Li-Qing Chen, Wolf Frommer and colleagues (2012). From the apoplast it is taken up into companion cells and sieve elements against a steep gradient by **sucrose–H⁺ symporters** (SUC/SUT), powered by the proton gradient of the plasma-membrane H⁺-ATPase ([[cell-biology/membrane-transport]]). *Arabidopsis*, sugar beet and many crops load this way; mutants lacking the companion-cell symporter SUC2 are stunted and accumulate sugar in their leaves.
2. **Symplastic loading by polymer trapping.** In cucurbits and *Coleus*, sucrose diffuses through plasmodesmata into specialised companion cells (intermediary cells), where it is converted to the larger sugars raffinose and stachyose. These are too large to diffuse back through the narrow plasmodesmata to the mesophyll but small enough to pass through the wider ones into the sieve elements: they are trapped in the phloem.
3. **Passive symplastic loading.** In many trees, sugar concentrations in the mesophyll are high enough for sucrose to diffuse down its gradient into the phloem through abundant plasmodesmata, without active steps.

At sinks, sucrose is unloaded symplastically into growing tissues, or apoplastically where the sink is isolated (as in developing seeds, whose embryo has no plasmodesmatal connection to the mother plant). Sink cells often split sucrose into hexoses with invertase or sucrose synthase, maintaining the gradient.

::: application Drought, irrigation and dying forests
Agriculture uses about 70 % of the fresh water withdrawn by people worldwide (FAO AQUASTAT), almost all of it for transpiration by crops. The physics of this chapter is therefore the physics of food production: crop yield under water limitation is roughly proportional to transpiration times water-use efficiency, and breeders seek varieties that use water more efficiently, close their stomata at the right moment, or root deeper. In forests, the same physics explains drought mortality. Severe droughts in the 2000s and 2010s killed hundreds of millions of trees in places such as the south-western United States, California and central Europe, and hydraulic failure — embolism pushing conductivity loss past a point of no return — is the most consistent physiological signature of these die-offs. Measurements of $P_{50}$ and safety margins are now used to forecast which species and regions are at most risk as droughts intensify.
:::

::: history
Stephen Hales's *Vegetable Staticks* (1727) measured transpiration by weighing potted plants and root pressure with manometers attached to cut vines. Henry Dixon and John Joly proposed the cohesion theory in 1894; Eugen Askenasy reached similar conclusions in Germany the following year. Horace Brown and Fergusson Escombe analysed diffusion through small pores in 1900. Ernst Münch proposed pressure flow in the phloem in *Die Stoffbewegungen in der Pflanze* (1930). Kennedy and Mittler introduced the aphid stylet technique in 1953, and Per Scholander's pressure chamber (1965) made xylem tensions routinely measurable. John Milburn and Robert Johnson (1966) heard cavitation as clicks with a microphone attached to wilting leaves. The claim that the xylem is under tension was challenged in the 1990s by Ulrich Zimmermann's direct pressure-probe measurements, which seemed to show only small tensions; the ensuing debate, resolved largely in favour of the cohesion–tension theory by centrifuge and pressure-chamber experiments, sharpened the methods of the field. Aquaporins were discovered in 1992 and found in plants in 1993; Peter Agre shared the 2003 Nobel Prize in Chemistry for them.
:::

## Summary

::: summary
- **Water potential** $\Psi = \Psi_s + \Psi_p + \Psi_g\,(+\Psi_m)$, with $\Psi_s = -cRT$ and $\Psi_g \approx 0.0098$ MPa m⁻¹; water moves from higher to lower $\Psi$.
- Air has $\Psi = (RT/\bar V_w)\ln h$, about −94 MPa at 50 % humidity: the dry air drives transpiration.
- Water enters roots by apoplastic, symplastic and transcellular paths; the Casparian strip forces it across membranes, mostly through aquaporins. Root pressure (a few tenths of a MPa) causes guttation but cannot lift water up trees.
- **Cohesion–tension**: evaporation from menisci in leaf cell walls puts xylem water under tension (measured with the pressure chamber), transmitted through continuous water columns. Flow obeys Hagen–Poiseuille, $Q \propto r^4$: wide vessels conduct far better than tracheids.
- Xylem fails by **embolism**, usually by air-seeding through pit-membrane pores at $\Delta P = 2\gamma/r$. Vulnerability curves give $P_{50}$; most trees operate with narrow safety margins, and drought kills by hydraulic failure.
- Transpiration $E = g_s\,\text{VPD}/P_\text{atm}$; guard cells control $g_s$ by K⁺ and anion fluxes, opening in blue light and closing in response to ABA, high CO₂ and dry air.
- **Phloem** transport is pressure flow (Münch): loading sugar at sources and unloading at sinks creates the pressure gradient. Loading is apoplastic (SWEET efflux, SUC/SUT symport), symplastic by polymer trapping, or passive.
:::

Water carries more than itself: dissolved in it, mineral nutrients move from soil to root to shoot. How plants obtain them is the subject of [[plant-biology/mineral-nutrition]].

## Exercises

::: exercise A cell's water potential {level=1 check="-0.34"}
A cell at 25 °C has sap of osmolality 0.30 osmol kg⁻¹ and turgor 0.40 MPa. Find its water potential, in MPa to two decimal places.
::: solution
$\Psi_s = -300\times8.314\times298.15 = -7.44\times10^5$ Pa $= -0.744$ MPa; $\Psi = -0.744 + 0.40 = -0.34$ MPa.
:::
:::

::: exercise Humid air {level=1 check="-69"}
What is the water potential of air at 60 % relative humidity and 20 °C, to the nearest MPa?
::: solution
$\Psi = 135.0\times\ln 0.6 = 135.0\times(-0.511) = -69$ MPa.
:::
:::

::: exercise The fourth power {level=1 check="16"}
By what factor does the volume flow through a xylem conduit increase if its radius doubles, at the same pressure gradient?
::: solution
$Q \propto r^4$, so $2^4 = 16$.
:::
:::

::: exercise Transpiration rate {level=1 check="5.2"}
A leaf at 30 °C (saturation vapour pressure 4.24 kPa) is in air at the same temperature and 50 % relative humidity, at 101.3 kPa. Its conductance is 0.25 mol m⁻² s⁻¹. Find $E$ in mmol m⁻² s⁻¹, to one decimal place.
::: solution
VPD $= 4.24 - 0.5\times4.24 = 2.12$ kPa. $E = 0.25\times2.12/101.3 = 5.2\times10^{-3}$ mol m⁻² s⁻¹ $= 5.2$ mmol m⁻² s⁻¹.
:::
:::

::: exercise Pit pores {level=2 check="7.2"}
A conifer's pit membranes (bordered pits with a torus and margo) seal at the torus when the pressure difference across them is large; the seal fails when air is pulled through a gap of radius 20 nm. At what pressure difference does this happen, in MPa to one decimal place?
::: solution
$\Delta P = 2\gamma/r = 2\times0.072/(20\times10^{-9}) = 7.2\times10^6$ Pa $= 7.2$ MPa.
:::
:::

::: exercise Reading a pressure chamber {level=2}
A grape grower measures leaf water potential with a pressure chamber. Before dawn, leaves read −0.2 MPa; at 2 pm, −1.4 MPa. A week later, after no rain, the readings are −0.8 MPa before dawn and −1.6 MPa at 2 pm. (a) Why is the pre-dawn reading a good estimate of soil water potential in the root zone? (b) Interpret the change over the week. (c) The midday reading changed less than the pre-dawn reading. Suggest why.
::: solution
(a) Before dawn stomata are closed and transpiration is near zero, so there is almost no flow and the plant's water potential comes into equilibrium with the wettest soil its roots reach (minus a small gravitational term).
(b) The soil has dried: the root-zone water potential fell from about −0.2 to −0.8 MPa. 
(c) The vine has closed its stomata partly in response to the drier soil (isohydric behaviour, typical of some grape varieties), so transpiration and therefore the potential drop along the plant decreased: the drop from soil to leaf at midday fell from 1.2 to 0.8 MPa. By regulating stomata, the vine kept its midday leaf water potential — and its xylem tension — from falling much further, protecting its xylem from embolism at the cost of reduced photosynthesis.
:::
:::

::: exercise A vulnerability curve {level=2}
A species' vulnerability curve follows [[#eq-vc]] with $P_{50} = -3.0$ MPa and $a = 2.0$ MPa⁻¹. (a) What percentage of conductivity is lost at −2.0 MPa and at −4.0 MPa? (b) In a normal summer the minimum xylem pressure is −2.2 MPa. What is the safety margin with respect to $P_{50}$? (c) Why is a narrow safety margin risky in a changing climate, and why might natural selection nevertheless favour it?
::: solution
(a) At −2.0: $100/(1 + e^{2(−2.0+3.0)}) = 100/(1 + e^{2}) = 100/8.39 = 11.9\,\%$. At −4.0: $100/(1 + e^{-2}) = 100/1.135 = 88.1\,\%$.
(b) $-2.2 - (-3.0) = 0.8$ MPa.
(c) A drought only a little more severe than usual pushes tension past $P_{50}$, where embolism accelerates (the curve is steepest there), so hydraulic failure can follow quickly. Xylem that is safer usually costs more — denser wood, smaller vessels, thicker pit membranes — and conducts less, reducing growth; in competition for light, the faster-growing, less safe design wins in normal years. Selection tunes safety to the historical drought regime, which climate change is shifting.
:::
:::

::: exercise Aphids and girdles {level=2}
(a) Sap is collected from aphid stylets on a willow stem above and below a ring where the bark has been removed. What do you expect to find in the sugar concentration and exudation rate above and below the ring, a few days later? (b) Why is it important that the stylet technique does not involve cutting the sieve tube? (c) How do aphid-stylet measurements support the pressure-flow hypothesis rather than a mechanism in which sieve tubes actively pump sap along their length?
::: solution
(a) Above the girdle sugar accumulates, so concentration and turgor are high and exudation is vigorous; below it, the supply from the leaves is cut, sugars are consumed, and exudation slows or stops.
(b) Cutting triggers rapid sealing by phloem proteins and callose and a surge of flow towards the cut; the stylet penetrates one sieve element without triggering these responses and samples it at its natural pressure.
(c) Sap continues to flow out of a severed stylet for hours, driven only by the sieve tube's internal turgor: the contents are under positive pressure, as Münch predicted, and the exudation rate matches the expected pressure-driven flow. Pressure (measured directly by attaching a pressure transducer to stylets) is higher towards sources and lower towards sinks, as the hypothesis requires.
:::
:::

::: exercise A water budget {level=3}
On a sunny afternoon a 30 m tree has: soil water potential −0.1 MPa; leaf water potential at the top of the crown −1.8 MPa; transpiration 3 L h⁻¹. (a) What part of the water potential drop is needed just to support the water column against gravity? (b) Treating the path as a single resistance, estimate the tree's hydraulic conductance (in L h⁻¹ MPa⁻¹), excluding the gravitational component. (c) If drought lowers soil water potential to −1.0 MPa while the tree must keep its leaves above −2.0 MPa to avoid embolism, what is the maximum transpiration it can sustain, assuming conductance does not change? (d) Why will conductance in fact also fall?
::: solution
(a) $0.0098\times30 = 0.29$ MPa.
(b) The total drop is $1.7$ MPa; the frictional drop is $1.7 - 0.29 = 1.41$ MPa. Conductance $K = 3/1.41 = 2.1$ L h⁻¹ MPa⁻¹.
(c) Allowed frictional drop $= (-1.0) - (-2.0) - 0.29 = 0.71$ MPa; maximum transpiration $= 2.1\times0.71 = 1.5$ L h⁻¹, about half the original — the stomata must close partly.
(d) As the soil dries its conductivity falls steeply (water retreats into small pores and roots lose contact), and xylem tension near the threshold causes some embolism; both reduce $K$ further, so the safe transpiration rate is even lower.
:::
:::

::: exercise Phloem in tall trees {level=3}
(a) Using the results of [[#ex-munch]], estimate the pressure difference needed to move phloem sap through 100 m of sieve tube of radius 10 µm with sieve plates doubling the resistance. (b) The osmotic pressure of the source sap is about 1.5 MPa, and the sink end has turgor of perhaps 0.3 MPa. Is pressure flow plausible over this distance? (c) Suggest two ways a tall tree could reduce the required pressure gradient, and say how each could be tested.
::: solution
(a) At about 0.04 MPa per metre (0.019 MPa m⁻¹ doubled), 100 m require about 4 MPa.
(b) The available difference between source and sink turgor is only about 1.2 MPa — and source turgor is in practice lower than the sap's osmotic pressure, because the sieve tube is in contact with xylem water at negative potential. With these dimensions pressure flow would be too slow, by a factor of three or more, to deliver the required velocity.
(c) Wider sieve tubes: resistance falls as $r^{-2}$ per unit area (velocity $\propto r^2$), so doubling the radius cuts the needed gradient by four. Test by measuring sieve-tube radii along the stem; studies of tall trees have found that sieve tubes widen and sieve plates become more porous from the crown downwards. Lower velocity with more conducting area: carry the same mass flux at a lower velocity through more sieve tubes. Test by measuring phloem cross-sectional area and transport velocity (with tracers such as ¹¹C) at different heights. (A third possibility, relays in which sugar is unloaded and reloaded along the path, has been proposed and is harder to test.)
:::
:::
