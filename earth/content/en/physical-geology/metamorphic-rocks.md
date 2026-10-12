In 1795 the Edinburgh physician and chemist Daniel Rutherford — the man who had discovered nitrogen — put a block of limestone into a furnace and held it at high temperature for twelve hours. What came out was hard, sugary and interlocking: he had made a marble, and had done in a afternoon what Nature was supposed to have done in deep time. Rutherford's experiment is the founding demonstration of metamorphism, because it separated the two things that the subject exists to distinguish: the *material* of a rock, which was already limestone, and its *texture and mineralogy*, which the furnace had changed.

Metamorphic rocks are the ones that were changed while still solid, somewhere between the diagenetic oven of the burial environment and the melting point. They make up much of the visible continental crust — the cores of mountain belts, the shields, the roots of extinct arcs — and they are the only direct samples we have of the deep crust, which we cannot drill into. A schist on a hillside is a specimen from $20\ \mathrm{km}$ depth, brought to you by erosion, and it carries in its minerals a record of the pressure and temperature it experienced and, if you are careful, of how long it was there and which way it moved.

## What metamorphism is, and is not

::: definition Metamorphism, protolith, grade {#def-metamorphism}
**Metamorphism** is the mineralogical and textural re-equilibration of a solid rock to conditions of temperature, pressure and chemical environment different from those at which it formed. The original rock is the **protolith**; the intensity of re-equilibration is the **grade**, low to high. The process is bounded below by **diagenesis** (the low-temperature, often irreversible, physical and chemical changes of burial, roughly $<100$–$150\ ^\circ\mathrm{C}$) and above by **metamorphism proper**, which ends where the rock begins to melt — the **solidus** of the wet or dry system, whichever applies ([[physical-geology/igneous-rocks#prop-threeways]]). Between those limits the rock stays essentially solid, and yet everything readable in it changes.
:::

Three consequences of "still solid" are worth stating, because they are what makes metamorphic rocks readable:

- **Diffusion, not flow, does the work.** Ions migrate a few millimetres through grains and along grain boundaries, so layers a centimetre apart can react with each other but layers a kilometre apart cannot. Metamorphic rocks are therefore local equilibrium systems, and a hand specimen is often a complete equilibrium assemblage.
- **Structure is inherited and overprinted.** A gneiss derived from a sandstone may still show bedding; a marble derived from a limestone may still show fossils (before recrystallisation erases them). Where two fabrics survive, the older one is preserved as inclusions, as relict layering, or as an angle between two sets of aligned minerals.
- **The rock keeps a memory of cooling.** Many metamorphic minerals stop exchanging at a characteristic temperature (their *closure temperature*), so a metamorphic age is usually a cooling age, and different mineral systems give different ages from the same rock — the basis of [[geochemistry/geochronology]].

## The agents

::: definition Confining and differential stress {#def-stress}
**Confining (lithostatic) pressure** is the mean stress, $P \approx \rho g z$, which for typical crustal rock increases by about $27\ \mathrm{MPa}$ per kilometre of depth; it favours dense minerals and is what geobarometry measures. **Differential stress** is the departure from the mean, and it is what makes minerals grow perpendicular to the greatest shortening — that is, what makes a rock foliated. A rock can be high-pressure and low-stress (the floor of a subduction channel) or high-temperature and low-pressure (the roof of a shallow granite), and the two combinations produce completely different rocks.
:::

Four agents supply the changes, and they combine:

1. **Heat.** Burial at a typical continental geotherm of $25$–$30\ ^\circ\mathrm{C}\,\mathrm{km^{-1}}$ gives $600\ ^\circ\mathrm{C}$ at $20\ \mathrm{km}$. Intruding magma supplies far more, locally: a basalt at $1200\ ^\circ\mathrm{C}$ against country rock at $200\ ^\circ\mathrm{C}$ drives a conductive aureole outward at a rate set by thermal diffusion.
2. **Pressure.** Burial and, in collision zones, the thickening of a crust that then heats up slowly.
3. **Differential stress**, from convergence or extension, which produces foliation and lineation and concentrates deformation into shear zones.
4. **Fluids**, chiefly water, which transport ions orders of magnitude faster than solid-state diffusion, hydrate minerals, and can change bulk chemistry (metasomatism). A dry rock in an aureole may change mineralogy but not composition; a wet one can be chemically rewritten.

::: example How wide is a contact aureole? {#ex-aureole}
A sheeted granite at $1200\ ^\circ\mathrm{C}$ is emplaced into country rock at $200\ ^\circ\mathrm{C}$. With thermal diffusivity $\kappa = 10^{-6}\ \mathrm{m^2\,s^{-1}}$, how far does the thermal anomaly penetrate in $10^3$, $10^4$ and $10^5$ years, taking the penetration length as $x = 2\sqrt{\kappa t/\pi}$?
::: solution
$$
x = 2\sqrt{\frac{\kappa t}{\pi}} = \{200,\ 630,\ 2000\}\ \mathrm{m}.
$$
Observed contact aureoles around granitic plutons are typically a few hundred metres to a couple of kilometres wide, which says something more interesting than a width: it says the intrusion was hot for $10^4$–$10^5$ years, not for a decade, and that the aureole records a *duration* as much as a temperature. It also explains why aureoles around dykes are centimetres across and why a large layered intrusion can bake its roof for a million years.

The same arithmetic inverted explains the absence of metamorphism in most of the sedimentary basin: at $25\ ^\circ\mathrm{C}\,\mathrm{km^{-1}}$ a $5\ \mathrm{km}$ burial gives $145\ ^\circ\mathrm{C}$, which is anchizone at best. Burial metamorphism needs more than burial; it needs a hot gradient, an intrusion, or both.
:::
:::

::: widget plot
f: 200 + 1000*(1 - erf(x/(2*sqrt(31.5*t))))
x: 0, 8000
y: 0, 1300
sliders: t=10:1:300:1
labels: temperature
caption: Temperature against distance from the margin of a hot intrusion, after $t$ thousand years, for $\kappa = 10^{-6}\ \mathrm{m^2\,s^{-1}}$. The curve is the error-function solution of the heat equation ([Maths Atlas](/learn/maths/)), and the slider is time. At $10\ \mathrm{kyr}$ the $600\ ^\circ\mathrm{C}$ isotherm — the usual base of the hornfels facies — sits about $700\ \mathrm{m}$ from the contact; at $300\ \mathrm{kyr}$ it sits past $3.5\ \mathrm{km}$. Drag the slider and watch the curve flatten rather than stretch: conductive heating spreads as $\sqrt{t}$, so making an aureole twice as wide takes four times as long.
:::

## Facies: naming the pressure–temperature box

::: definition Metamorphic facies {#def-facies}
A **metamorphic facies** is the set of rock compositions that share one equilibrium mineral assemblage over a range of pressure and temperature. A pelite (mudstone) of the simple $\mathrm{K_2O\text{-}FeO\text{-}MgO\text{-}Al_2O_3\text{-}SiO_2\text{-}H_2O}$ system, for example, carries chlorite + muscovite + quartz in the greenschist facies, and biotite + garnet + staurolite + kyanite at higher grade. The classic facies, in increasing temperature at moderate pressure, are **zeolite**, **prehnite–pumpellyite**, **greenschist**, **amphibolite** and **granulite**; a high-pressure, low-temperature facies series, **blueschist** and **eclogite**, defines subduction; and the very low-pressure, high-temperature **hornfels** facies defines contact aureoles.
:::

::: proposition A rock has as many minerals as the phase rule allows, and no more {#prop-mincount}
For a rock whose chemistry can be described by $C$ components, the number of phases that can coexist at a given pressure and temperature is at most $C$. A simple pelite with $C = 6$ (KFMASH) can therefore hold at most six minerals in equilibrium; a rock with eight phases present is not in equilibrium.
:::

::: proof
By the Gibbs phase rule, $F = C - P + 2$ ([[physical-geology/minerals#thm-phaserule]]). Metamorphic petrologists work at fixed pressure and temperature — that is what a $P$–$T$ diagram assumes — which removes two degrees of freedom, leaving $F = C - P$. Equilibrium can be maintained only while $F \ge 0$, so $P \le C$. ∎
:::

This is not book-keeping for its own sake. It is the reason a thin section is a quantitative diagram: with six phases in a KFMASH pelite the assemblage is *invariant*, and the composition of each mineral is fixed by bulk composition alone, so measuring them tests the assumption of equilibrium. It is also why finding eight minerals in one rock is a finding: it means the rock records a *path*, with earlier generations surviving inside later ones, and paths can be turned into the history of a mountain belt ([[mineralogy-petrology/pt-paths]]).

::: svg
caption: The pressure–temperature plane with the principal facies and three geotherms. A subduction geotherm of $8\ \mathrm{^\circ C\,km^{-1}}$ (left) takes a rock through blueschist and then eclogite facies at depths of $30$–$50\ \mathrm{km}$ but temperatures of only $300$–$500\ ^\circ\mathrm{C}$: this is how cold subduction channels preserve aragonite and lawsonite. A Barrovian (collisional) gradient of $28\ \mathrm{^\circ C\,km^{-1}}$ (middle) produces the greenschist–amphibolite–granulite sequence at $15$–$35\ \mathrm{km}$. A contact aureole (right) reaches $600\ ^\circ\mathrm{C}$ at $2$–$3\ \mathrm{km}$, in the hornfels facies. The dashed curve is the wet granitic solidus, above which the rock begins to melt and metamorphism ends.
<svg viewBox="0 0 760 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pressure-temperature diagram with metamorphic facies and three geotherms">
  <style>
    .ax { stroke: var(--ink-2); stroke-width: 1.4; }
    .gr { stroke: var(--grid); stroke-width: 1; }
    .fld { fill: var(--accent-wash); stroke: var(--rule-2); stroke-width: 1; }
    .fld2 { fill: var(--info-wash); stroke: var(--rule-2); stroke-width: 1; }
    .fld3 { fill: var(--warm-wash); stroke: var(--rule-2); stroke-width: 1; }
    .geo { fill: none; stroke-width: 2.4; }
    .sol { fill: none; stroke: var(--bad); stroke-width: 2; stroke-dasharray: 7 4; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11.5px; }
    .tick { fill: var(--ink-3); font-size: 11px; }
  </style>
  <!-- axes: x = T (0-1000 C), y = P (0-16 kbar) -->
  <line class="ax" x1="70" y1="340" x2="720" y2="340"/>
  <line class="ax" x1="70" y1="340" x2="70" y2="30"/>
  <text class="tick" x="66" y="356">0</text>
  <text class="tick" x="192" y="356">250</text>
  <text class="tick" x="316" y="356">500</text>
  <text class="tick" x="440" y="356">750</text>
  <text class="tick" x="558" y="356">1000 °C</text>
  <text class="tick" x="30" y="344">0</text>
  <text class="tick" x="18" y="266">4</text>
  <text class="tick" x="18" y="188">8</text>
  <text class="tick" x="14" y="110">12</text>
  <text class="tick" x="14" y="34">16 kbar</text>
  <!-- facies fields -->
  <polygon class="fld2" points="70,340 200,340 150,190 70,190"/>
  <polygon class="fld2" points="200,340 300,340 240,120 150,190"/>
  <polygon class="fld" points="300,340 470,340 400,190 240,190"/>
  <polygon class="fld" points="470,340 700,340 700,190 400,190"/>
  <polygon class="fld3" points="70,190 240,190 240,120 150,120"/>
  <polygon class="fld3" points="400,190 700,190 700,60 400,60"/>
  <text class="sub" x="86" y="300">zeolite</text>
  <text class="sub" x="176" y="250">greenschist</text>
  <text class="sub" x="180" y="160">blueschist</text>
  <text class="sub" x="196" y="100">eclogite</text>
  <text class="sub" x="420" y="270">amphibolite</text>
  <text class="sub" x="520" y="130">granulite</text>
  <text class="sub" x="470" y="90">hornfels</text>
  <!-- geotherms -->
  <path class="geo" style="stroke: var(--series-1)" d="M70,340 L150,190 L190,110"/>
  <path class="geo" style="stroke: var(--series-3)" d="M70,340 L316,190 L470,90"/>
  <path class="geo" style="stroke: var(--series-2)" d="M70,340 L240,60"/>
  <text class="lab" x="150" y="205" style="fill: var(--series-1)">subduction 8 °C/km</text>
  <text class="lab" x="330" y="175" style="fill: var(--series-3)">Barrovian 28 °C/km</text>
  <text class="lab" x="250" y="70" style="fill: var(--series-2)">contact aureole</text>
  <path class="sol" d="M300,340 L330,240 L400,150 L520,80"/>
  <text class="sub" x="530" y="70" style="fill: var(--bad)">wet granitic solidus</text>
  <text class="tick" x="380" y="382">temperature</text>
  <text class="tick" x="8" y="200" transform="rotate(-90 12,200)">pressure</text>
</svg>
:::

### The Barrovian sequence

In pelitic rocks — mudstones, chemically the most responsive of all protoliths — grade increases produce a predictable ladder of *index minerals*, each appearing at a characteristic reaction and each defining an **isograd**, the line of its first appearance on a map. In order:

$$
\text{chlorite} \to \text{biotite} \to \text{garnet} \to \text{staurolite} \to \text{kyanite} \to \text{sillimanite},
$$

the classic Barrovian zonation of the Scottish Highlands, established by George Barrow in 1893 from nothing but hand specimens and maps. The same ladder in the field is a transect through the crust: chlorite at a few kilometres, sillimanite at $25$–$30\ \mathrm{km}$ and $600\ ^\circ\mathrm{C}$ and more.

::: example From index minerals to depth and heat flow {#ex-kyanite}
A pelite contains kyanite, staurolite, garnet and muscovite. Kyanite requires roughly $0.6\ \mathrm{GPa}$ at $550\ ^\circ\mathrm{C}$. Estimate the depth of metamorphism, and the heat flow implied if the surface gradient was steady.
::: solution
Depth from lithostatic pressure:
$$
z = \frac{P}{\rho g} = \frac{6\times10^{8}}{2800\times9.81} = 22\ \mathrm{km}.
$$
With a surface temperature of $20\ ^\circ\mathrm{C}$, the gradient is $(550-20)/22 = 24\ ^\circ\mathrm{C}\,\mathrm{km^{-1}}$, and the conductive heat flow
$$
q = k\,\frac{\mathrm{d}T}{\mathrm{d}z} = 2.5\times24\times10^{-3} = 60\ \mathrm{mW\,m^{-2}} .
$$
That is close to the modern global mean for continental heat flow, which is a useful sanity check: Barrovian metamorphism typically needs a gradient somewhat above today's continental average, and it is found where the crust was thickened and heated, or intruded, or both. Note also that the answer is a *range*, not a point: a fluid overpressure reduces the lithostatic estimate, and a kyanite that grew during burial and survived decompression may record the maximum, not the mean.
:::
:::

## Thermometers and barometers

::: proposition Exchange reactions are thermometers {#prop-thermometer}
For a cation-exchange reaction such as
$$
\mathrm{Fe^{2+}_{(grt)} + Mg_{(bi)} \rightleftharpoons Mg_{(grt)} + Fe^{2+}_{(bi)}},
$$
equilibrium requires $\Delta G^\circ = -RT\ln K_d$ with $K_d$ the distribution coefficient of the two cations between the two minerals. Writing $\Delta G^\circ = \Delta H^\circ - T\Delta S^\circ$ and taking the enthalpy and entropy changes as independent of temperature over the metamorphic range gives
$$
T = \frac{-\Delta H^\circ / R}{\ln K_d - \Delta S^\circ/R},
$$
so a measurement of $K_d$ is a measurement of temperature.
:::

::: proof
At equilibrium the chemical potentials of the exchange components are equal in both phases, so $\Delta G = \Delta G^\circ + RT\ln Q = 0$; at equilibrium $Q = K_d$, hence $\ln K_d = -\Delta G^\circ/RT = -\Delta H^\circ/RT + \Delta S^\circ/R$. Solving for $T$ gives the expression. The whole method rests on one assumption — that the two minerals actually equilibrated, which is tested by checking that they touch, that they are not zoned, and that other mineral pairs in the same rock give the same answer. ∎
:::

::: example Garnet–biotite thermometry {#ex-gbtherm}
For the Fe–Mg exchange between garnet and biotite, take $\Delta H^\circ = -29.9\ \mathrm{kJ\,mol^{-1}}$ and $\Delta S^\circ = -24.0\ \mathrm{J\,mol^{-1}\,K^{-1}}$. A schist has $(\mathrm{Fe}/\mathrm{Mg})_\text{grt} = 0.35$ and $(\mathrm{Fe}/\mathrm{Mg})_\text{bi} = 0.07$. Find the metamorphic temperature, and the effect of a $10\%$ error in $K_d$.
::: solution
$K_d = 0.35/0.07 = 5.0$, so
$$
T = \frac{29\,900/8.314}{\ln 5.0 + 24.0/8.314} = \frac{3596}{1.609 + 2.887} = 800\ \mathrm{K} = 527\ ^\circ\mathrm{C},
$$
solidly in the amphibolite facies. For the sensitivity, differentiate: $\mathrm{d}T/\mathrm{d}\ln K_d = -T^2/(\Delta H^\circ/R)\approx -T^2/3596$, which at $800\ \mathrm{K}$ is $-178\ \mathrm{K}$ per unit of $\ln K_d$. A $10\%$ error in $K_d$ is $0.1$ in $\ln K_d$, so about $18\ \mathrm{K}$.

That is the honest error budget of a good thermometric determination: $\pm 20$–$50\ ^\circ\mathrm{C}$, dominated not by the microprobe (which measures $\mathrm{Fe}/\mathrm{Mg}$ to a per cent) but by the calibration, by whether the ferric/ferrous split was right, and above all by whether the pair really equilibrated. The same structure of argument — measure a ratio, assume equilibrium, propagate the sensitivity — underlies every geothermometer and geobarometer in the subject, including the isotopic ones ([[geochemistry/isotopes-water-carbon]]).
:::
:::

## Textures: how a rock shows what squeezed it

::: definition Foliation, lineation, porphyroblast {#def-fabric}
A **foliation** is a planar fabric produced by the parallel alignment of platy or elongate minerals, or by alternating light and dark layers (banding in a gneiss). It forms with the $ab$ planes of micas and chlorite perpendicular to the greatest shortening, so a foliation is a record of the stress field, not of bedding — although in folded terrain the two are often subparallel and the distinction must be proved. A **lineation** is the linear analogue: aligned amphibole prisms, stretched grains, or mineral fibres. A **porphyroblast** is a large porphyry-like crystal (garnet, staurolite, kyanite) grown in a finer matrix; its inclusions and its overgrowths record the deformation that happened before and after it grew.
:::

The textural ladder of a pelite with increasing grade is a good illustration of how much a name carries: **slate** (fine, slaty cleavage, no visible minerals), **phyllite** (shiny, micas visible with a lens, crenulation), **schist** (visible micas, strongly foliated, porphyroblasts common), **gneiss** (compositional banding, micas segregated into dark layers, feldspar and quartz in light layers), and at the top **migmatite**, where partial melting has begun and the rock is part igneous, part metamorphic.

Two textures deserve special attention. **Mylonite** is the fine-grained, strongly foliated rock of ductile shear zones, and it is how the deep crust accommodates displacement; its kinematic indicators tell you which way the fault moved, kilometres below anything you can see. **Hornfels** is the fine, massive, non-foliated rock of a contact aureole — the product of heat without stress, and Rutherford's marble is one.

::: example Why eclogite sinks {#ex-eclogite}
Basalt of density $2900\ \mathrm{kg\,m^{-3}}$ transforms at high pressure to eclogite (garnet + omphacite) of density $3500\ \mathrm{kg\,m^{-3}}$, in surrounding mantle of $3300\ \mathrm{kg\,m^{-3}}$. Find the buoyancy force per square metre of a $30\ \mathrm{km}$-thick eclogitic slab, and explain the geological consequence.
::: solution
The excess density over the mantle is $200\ \mathrm{kg\,m^{-3}}$, giving a downward force per unit area
$$
\Delta\rho\, g\, h = 200\times9.81\times3\times10^{4} = 59\ \mathrm{MPa}.
$$
(Compared with the mantle; against normal crustal rock of $2700\ \mathrm{kg\,m^{-3}}$ the driving contrast is $800\ \mathrm{kg\,m^{-3}}$, or $235\ \mathrm{MPa}$.) A few tens of MPa of body force is comparable to the strength of the crust and to the friction on a subduction interface, so the transformation of the lower part of a subducting oceanic crust to eclogite is a plausible trigger for self-sustaining subduction — the slab begins to pull itself down.

The same number explains a puzzle in the other direction: ultrahigh-pressure rocks — ones that carried crustal minerals stable only at $3$–$6\ \mathrm{GPa}$, i.e. $100$–$180\ \mathrm{km}$ — are found at the surface, in narrow belts and with structural thicknesses of metres. Dense rock has been pushed up from mantle depth inside thin slivers, which means subducted crust is partly exhumed, and the mechanism (buoyancy of less-dated, hydrous, fine-grained material, channel flow, or being dragged by the overriding plate) is still debated ([[structural-geology/orogens]], [[geophysics/flexure]]).
:::
:::

::: warning "Metamorphic rocks are harder, so they are stronger"
Recrystallisation usually makes a rock harder to scratch and tougher to break up mechanically, and that is why a slate roof lasts and a mudbrick does not. But metamorphic rocks are frequently *weaker* than their protoliths in the ways that matter to engineering and to hazard: slaty cleavage and schistosity are planes of weakness along which slopes fail, mica-rich gneiss shears readily, and mylonite and fault gouge are exactly the materials that localise strain in active faults. The great landslides of folded and foliated terrain — and the instability of many cuttings in schist — follow the foliation, not the rock type ([[geomorphology/hillslopes]], [[natural-hazards/landslides]]).
:::

::: quiz
Two rocks of identical bulk composition, one a shale buried to $25\ \mathrm{km}$ beneath a collisional plateau and one a basalt carried to $90\ \mathrm{km}$ depth beneath a subduction zone, both end up at $500\ ^\circ\mathrm{C}$. What is different about them?
- [ ] Nothing: same temperature, so same minerals.
- [x] The pressures are very different, so the assemblages are different — the shale records a high-temperature, moderate-pressure facies, the basalt a high-pressure, low-temperature one.
- [ ] The basalt will have melted, the shale will not.
- [ ] Only the age differs.
::: solution
Temperature alone does not determine an assemblage; $P$ and $T$ together do. At $25\ \mathrm{km}$ the pressure is about $0.7\ \mathrm{GPa}$ and the rock sits in the amphibolite facies; at $90\ \mathrm{km}$ it is near $2.6\ \mathrm{GPa}$ and, at $500\ ^\circ\mathrm{C}$, in the eclogite facies — dense, and characterised by garnet and omphacite rather than plagioclase and amphibole. Neither has necessarily melted, because the subduction geotherm is cold: this is exactly the point of the facies concept, and the reason eclogites exist at all.
:::
:::

::: history
George Barrow was a surveyor for the Geological Survey of Scotland working in the Grampian Highlands in the 1880s, and by mapping which index mineral first appeared where — chlorite, biotite, garnet, staurolite, kyanite, and sillimanite further north — he defined the zonation of a collisional orogen without any thermodynamics at all, since the phase rule was published only in 1876 and the concept of facies had just been introduced by the Finnish petrologist Jaakko Sederholm. His 1893 paper is a model of field-based inference: the zones are isograds, they do not follow the bedding, and they therefore record something that happened *after* the rocks were laid down. The quantitative apparatus came later and from elsewhere: Percy Bridgman's high-pressure experiments (Nobel Prize, 1946) made it possible to run metamorphic reactions in the laboratory; Eskola and then Fyfe, Turner and Verhoogen turned facies into a $P$–$T$ grid; and from the 1960s onward, the discovery of coesite and diamond in crustal rocks demonstrated that the laboratory grid was real — that some rocks really had been to $100\ \mathrm{km}$ and back.
:::

## Where this leads

Facies and $P$–$T$ paths are the language of [[mineralogy-petrology/metamorphic-reactions]] and [[mineralogy-petrology/pt-paths]], where the phase rule of [[#prop-mincount]] is used to compute assemblages rather than to count them. The deformation that makes foliations is the subject of [[structural-geology/strain]] and [[structural-geology/shear-zones]]; the heat that drives regional metamorphism is quantified in [[geophysics/heat-flow]]; and the use of metamorphic minerals as clocks is taken up in [[geochemistry/geochronology]].

::: summary Key takeaways
- Metamorphism is re-equilibration in the solid state, bounded below by diagenesis and above by the solidus; the protolith's chemistry is largely retained, its minerals and texture are not.
- Confining pressure records depth, differential stress records tectonic force, and fluids control how fast and how far the changes go.
- A facies is a box in $P$–$T$ space: the same bulk composition gives different minerals in different boxes, which is why one rock type can record two very different settings.
- The phase rule at fixed $P$ and $T$ caps the number of coexisting minerals at $C$; more phases than that means a path, not an equilibrium.
- The Barrovian index-mineral ladder — chlorite, biotite, garnet, staurolite, kyanite, sillimanite — is a transect through the crust, and isograds are its map lines.
- Geothermometers are equilibrium constants in disguise: measure a cation ratio, assume equilibration, and propagate the sensitivity ($\pm 20$–$50\ ^\circ\mathrm{C}$ for a good pair).
- Contact aureoles grow as $\sqrt{t}$, so their width is a duration as much as a temperature; eclogite's density is a body force of tens of MPa, which is enough to move a slab.
- Metamorphic rocks are hard and often weak: foliations are the planes along which real slopes and real faults fail.
:::

## Exercises

::: exercise Depth from pressure {level=1 check="14"}
A rock shows an assemblage stable at $0.4\ \mathrm{GPa}$. Taking $\rho = 2850\ \mathrm{kg\,m^{-3}}$, estimate the depth of metamorphism in km.
::: solution
$z = P/\rho g = 4\times10^{8}/(2850\times9.81) = 14\ \mathrm{km}$. If the rock was instead carrying $30\%$ of the load as fluid pressure, the lithostatic estimate would be an over-read of the same fraction, giving $11\ \mathrm{km}$: the difference between two facies interpretations in a belt where fluid pressure is contested.
:::
:::

::: exercise Facies reading {level=1 check="2"}
Name the facies of (a) a glaucophane–lawsonite–epidote schist, (b) a garnet–hornblende rock with no plagioclase, (c) a massive fine-grained rock next to a dolerite sill, (d) a sillimanite–K-feldspar gneiss. How many distinct $P$–$T$ regimes are represented?
::: solution
(a) Blueschist — high pressure, low temperature, subduction. (b) Eclogite — high pressure, higher temperature. (c) Hornfels — contact metamorphism, low pressure, high temperature. (d) Granulite or high-amphibolite facies — regional, high temperature. Four regimes, and the point of the question is that a single hand-specimen name is a statement about $P$ and $T$, not about protolith.
:::
:::

::: exercise Phase-rule bookkeeping {level=1 check="6"}
A pelite is described in the six-component system KFMASH. At fixed pressure and temperature, what is the maximum number of equilibrium minerals? A thin section of such a rock shows quartz, muscovite, biotite, garnet, staurolite, kyanite and chlorite. What does that mean?
::: solution
$P \le C = 6$. Seven phases means the rock is not in equilibrium: the chlorite is almost certainly a later, lower-grade overprint on kyanite, or an inclusion assemblage preserved inside garnet. The correct reading is a decompression path, not a mistake in the count.
:::
:::

::: exercise Thermometry {level=2 check="724"}
Using the calibration of [[#ex-gbtherm]], find the temperature for $(\mathrm{Fe}/\mathrm{Mg})_\text{grt} = 0.42$ and $(\mathrm{Fe}/\mathrm{Mg})_\text{bi} = 0.0525$.
::: solution
$K_d = 0.42/0.0525 = 8.0$, so $T = 3596/(\ln 8.0 + 2.887) = 3596/(2.079+2.887) = 724\ \mathrm{K} = 451\ ^\circ\mathrm{C}$. The lower temperature for a larger $K_d$ is the expected behaviour: at lower temperature the two minerals fractionate Fe and Mg more strongly. If the same rock gives $800\ \mathrm{K}$ from a different garnet core, you have a cooling path, and the two numbers are the beginning of a $T$–$t$ history.
:::
:::

::: exercise Heat flow of a Barrovian terrain {level=2 check="55"}
A terrain reached $650\ ^\circ\mathrm{C}$ at $25\ \mathrm{km}$ depth. Compute the gradient and the conductive heat flow for $k = 2.2\ \mathrm{W\,m^{-1}\,K^{-1}}$, and compare with the modern continental mean of $65\ \mathrm{mW\,m^{-2}}$.
::: solution
Gradient $= (650-20)/25 = 25.2\ ^\circ\mathrm{C}\,\mathrm{km^{-1}}$; $q = 2.2\times25.2\times10^{-3} = 55\ \mathrm{mW\,m^{-2}}$. Either way the answer is within a factor of 1.5 of today's continental mean, which is the standard argument that Barrovian metamorphism does *not* require exotic heat sources — thickening alone, with a normal gradient sustained for tens of millions of years, is enough. Where the gradient was higher, the diagnostic evidence is a paired high-temperature, low-pressure assemblage or a swarm of syn-tectonic intrusions.
:::
:::

::: exercise Aureole width {level=2 check="2"}
Using the scaling of [[#ex-aureole]], how wide an aureole (one-sided, to the $600\ ^\circ\mathrm{C}$ isotherm) forms around a pluton that stays hot for $10^5$ years? Take $\kappa = 10^{-6}\ \mathrm{m^2\,s^{-1}}$.
::: solution
$x = 2\sqrt{\kappa t/\pi} = 2\sqrt{10^{-6}\times3.15\times10^{12}/\pi} = 2.0\times10^{3}\ \mathrm{m} = 2\ \mathrm{km}$. Doubling the duration to $4\times10^5$ years doubles the width, since $x \propto \sqrt{t}$; quadrupling the duration doubles it again. This is why aureoles around large, long-lived plutons are a few kilometres wide and why the same is not true of a $2\ \mathrm{m}$ dyke, which is thermally dead within a year.
:::
:::

::: exercise Deriving the geometer {level=3}
Derive the exchange-reaction thermometer of [[#prop-thermometer]] from the equality of chemical potentials, and show that the sensitivity of the resulting temperature to an error in $K_d$ is $\mathrm{d}T/\mathrm{d}\ln K_d = -T^2 R/\Delta H^\circ$. Why do exchange thermometers fail in very low-grade rocks?
::: solution
Equality of the chemical potentials of the exchange component in both phases gives $\Delta G^\circ = -RT\ln K_d$; substituting $\Delta G^\circ = \Delta H^\circ - T\Delta S^\circ$ and rearranging gives $T = (-\Delta H^\circ/R)/(\ln K_d - \Delta S^\circ/R)$. Differentiating with respect to $\ln K_d$ at fixed $\Delta H^\circ$ gives
$$
\frac{\mathrm{d}T}{\mathrm{d}\ln K_d} = \frac{\Delta H^\circ/R}{(\ln K_d - \Delta S^\circ/R)^2} = \frac{T^2 R}{\Delta H^\circ},
$$
which for $\Delta H^\circ < 0$ is negative, as observed: a larger $K_d$ means a lower temperature.

Exchange thermometers fail at low grade for two reasons visible in the equation. First, as $T$ falls the sensitivity $T^2R/\Delta H^\circ$ shrinks, so the thermometer becomes *more* precise in principle — but second, diffusion slows exponentially, so the minerals stop exchanging and the measured $K_d$ records whatever temperature they last equilibrated at, not the peak. In practice the failure mode is not the calibration but the assumption of equilibrium: at low grade, and in rocks that cooled through the closure temperature of the pair, the answer is a cooling age masquerading as a peak temperature.
:::
:::

::: exercise A metamorphic mass balance {level=3}
A pelite of $1\ \mathrm{m^3}$ (density $2700\ \mathrm{kg\,m^{-3}}$) contains $60\%$ muscovite by volume. During prograde metamorphism all the muscovite reacts with quartz,
$$
\mathrm{KAl_3Si_3O_{10}(OH)_2} + \mathrm{SiO_2} \longrightarrow \mathrm{KAlSi_3O_8} + \mathrm{Al_2SiO_5} + \mathrm{H_2O},
$$
releasing its structural water. Estimate the mass of water released per cubic metre, and say where it went and what it did.
::: solution
Muscovite $\mathrm{KAl_2(AlSi_3O_{10})(OH)_2}$ has molar mass $396.3\ \mathrm{g\,mol^{-1}}$ and contains one $\mathrm{OH}$ per formula unit, so water is $18/396.3 = 4.5\%$ by mass. The rock holds $0.60\times2700 = 1620\ \mathrm{kg}$ of muscovite, so the reaction releases about $74\ \mathrm{kg}$ of $\mathrm{H_2O}$ per cubic metre.

That is a small mass and a large effect. A few per cent of water by mass is enough to make the rock's fluid percolate, and in a prograde orogen the whole metamorphic column releases water in a narrow temperature window, which is why metamorphic cores are associated with overpressured fluids, with quartz veins, with the lowering of solidus temperatures and hence with melting, and — since water carries dissolved silica, alkali and metals — with vein-type ore deposits. It also lowers the effective stress on the foliation planes by an amount that can be a large fraction of the lithostatic load, which is one way a metamorphic core becomes a detachment fault ([[structural-geology/shear-zones]], [[earth-resources/magmatic-hydrothermal]]).
:::
:::

::: exercise A $P$–$T$ path from a thin section {level=3}
A garnet porphyroblast contains quartz inclusions. The quartz is under measurable residual pressure, and the host garnet is elastically stiffer than quartz. Explain why the inclusion pressure exceeds the pressure at which the garnet grew, and describe what a path from the core to the rim of the garnet can tell you.
::: solution
When the rock is exhumed, the garnet unloads elastically but the quartz inclusion, being trapped in a stiff host, cannot expand as much as it would like: it stays "overpressured", like a balloon inside a rigid box. The residual pressure measured by Raman spectroscopy or X-ray diffraction is therefore a fossil of the entrapment pressure, corrected by an elastic model, and it is one of the few direct mechanical records of deep-crustal pressure.

Because garnet grows in zones, the core, mantle and rim record successive $P$ and $T$: core inclusion pressures are higher than rim ones in a rock that was buried and then exhumed, and the trace of inclusion pressures through the crystal is a $P$–$T$ path. Combined with thermometry on the same zones, this gives the clockwise or anticlockwise loop that distinguishes burial-then-exhumation in a collisional orogen from the heating-then-cooling of a contact aureole — the difference between a mountain belt and a pluton, read from a single crystal ([[mineralogy-petrology/pt-paths]]).
:::
:::
