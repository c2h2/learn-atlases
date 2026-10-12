At 07:50 on 8 May 1902 the town of Saint-Pierre, Martinique — 28,000 people, the "Paris of the Caribbean", the commercial capital of the French Antilles — was destroyed in under two minutes by a cloud of hot gas and rock that moved down the mountainside at more than $100\ \mathrm{km\,h^{-1}}$. Perhaps thirty people survived. Three days earlier, on the other side of the world, the summit of Kilauea in Hawaii had been fountaining lava for a fortnight: a curtain of incandescent rock $100\ \mathrm{m}$ high, gentle enough that a photographer walked up to the vent, and the only damage was to a few houses that were, in the event, cheerfully photographed as they burned.

Same planet, same kind of magma source, opposite behaviour. The difference is not which volcano, but what the magma is made of, how much gas it holds, how fast it rises, and whether it has time to lose that gas on the way up. This chapter is about those four things, and about the landforms, the products, the hazards and the climate effects that follow from them.

## Why some eruptions explode

::: definition Viscosity, volatiles, fragmentation {#def-eruption}
**Viscosity** $\eta$ is a melt's resistance to flow, and it spans ten or more orders of magnitude in nature: about $10$–$10^{3}\ \mathrm{Pa\,s}$ for a hot basalt, $10^{4}$–$10^{6}$ for an andesite, $10^{10}$–$10^{13}$ for a dry rhyolite near $800\ ^\circ\mathrm{C}$. It is controlled by polymerisation (the framework structure of [[physical-geology/minerals]]), by temperature, by dissolved water — which breaks Si–O–Si bonds and can lower $\eta$ by five orders of magnitude — and by crystal and bubble content. **Volatiles** are the dissolved gases, overwhelmingly $\mathrm{H_2O}$ and $\mathrm{CO_2}$, with $\mathrm{S}$, $\mathrm{Cl}$ and $\mathrm{F}$ minor but important. **Fragmentation** is the transition, at a critical bubble fraction of order $0.7$ by volume, from a bubbly liquid to a froth of gas carrying droplets of melt: the point at which an eruption becomes explosive.
:::

::: proposition Water keeps a magma dissolved until it is nearly at the surface, and then it does not {#prop-exsolve}
The solubility of water in a silicate melt scales roughly with the square root of the water partial pressure, so a rhyolitic melt holding $4\%$ water by weight can hold it at $100\ \mathrm{MPa}$ (about $3.5\ \mathrm{km}$ depth) and cannot hold it above a few tens of megapascals. Once exsolution begins, the gas volume grows as $1/P$ while the melt can only expand by flowing: if the conduit is narrow and the melt viscous, the gas cannot escape, the froth reaches $75\%$ bubbles, and the column shatters.
:::

::: example How much gas does a magma carry? {#ex-gas}
Take $1\ \mathrm{kg}$ of rhyolitic melt ($\rho = 2500\ \mathrm{kg\,m^{-3}}$) containing $1.0\%$ dissolved $\mathrm{H_2O}$. Find the volume of gas it can exsolve at $1200\ ^\circ\mathrm{C}$ (a) at $100\ \mathrm{MPa}$, (b) at $0.1\ \mathrm{MPa}$, and compare each with the volume of the melt.
::: solution
$10\ \mathrm{g}$ of water is $0.555\ \mathrm{mol}$, and the melt occupies $1/2500 = 4\times10^{-4}\ \mathrm{m^3}$. Treating the gas as ideal,
$$
V = \frac{nRT}{P} = \frac{0.555\times8.314\times1473}{P},
$$
giving $V = 6.8\times10^{-5}\ \mathrm{m^3}$ at $100\ \mathrm{MPa}$ — $17\%$ of the melt volume, comfortably accommodated — and $V = 6.8\times10^{-2}\ \mathrm{m^3}$ at $0.1\ \mathrm{MPa}$, which is **170 times** the volume of the melt itself.

One per cent water is therefore enough to inflate the magma to a hundred and seventy times its volume if the gas cannot escape, and only a few tens of per cent of that gas is needed to reach the fragmentation threshold. This is the whole of explosivity in one line of arithmetic: an eruption is explosive when the melt is too viscous, or the conduit too tight, or the ascent too fast, for the gas to diffuse out. It also explains why a basalt with the same water content erupts as a fountain — the gas *does* escape, because the melt cannot hold a bubble foam together — and why a rhyolite with less water can level a city.
:::
:::

::: warning "Explosive eruptions are hotter than effusive ones"
They are usually cooler. Basaltic lava is erupted at $1100$–$1200\ ^\circ\mathrm{C}$; the most explosive andesitic and dacitic eruptions run at $800$–$950\ ^\circ\mathrm{C}$; and the driving variable is not temperature at all but viscosity and gas content, which move in the opposite direction to temperature. The misconception is dangerous in the field, because it makes a dull-red $850\ ^\circ\mathrm{C}$ pyroclastic-density current look "cooler and therefore safer" than a bright orange lava flow. A $900\ ^\circ\mathrm{C}$ ash cloud kills by heat, by asphyxiation and by impact; a $1150\ ^\circ\mathrm{C}$ lava flow kills by being in the way, and usually gives warning.
:::

## The shapes volcanoes make

::: svg
caption: Four end-member volcano forms at the same vertical scale. A shield is built from very fluid basalt erupted at high effusion rate, and its slope is only a few degrees; a stratovolcano is built from alternating lava, ash and debris and is steep because its magmas are viscous and explosive; a cinder (scoria) cone is a pile of ballistic fragments around a vent, with slopes near the angle of repose and a volume a millionth of the shield's; a caldera is not built at all but collapses into the void left by an emptied magma chamber, and its rim is a fault scarp, not a summit.
<svg viewBox="0 0 760 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cross-sections of shield volcano, stratovolcano, cinder cone and caldera">
  <style>
    .rock { fill: var(--deemph); stroke: var(--rule-2); stroke-width: 1; }
    .basalt { fill: var(--series-2); opacity: 0.85; }
    .ash { fill: var(--ink-3); opacity: 0.6; }
    .air { fill: var(--info-wash); }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
    .bed { stroke: var(--sheet); stroke-width: 1.2; fill: none; }
  </style>
  <rect class="air" x="0" y="0" width="760" height="180"/>
  <line x1="0" y1="180" x2="760" y2="180" stroke="var(--rule-2)"/>
  <!-- shield -->
  <path class="rock" d="M10,180 Q100,120 190,180 Z"/>
  <path class="basalt" d="M96,124 L104,124 L108,180 L92,180 Z"/>
  <text class="lab" x="30" y="200">shield</text>
  <text class="sub" x="30" y="216">slope 2–6°, 10⁵ km³</text>
  <!-- stratovolcano -->
  <path class="rock" d="M215,180 L275,80 L290,80 L350,180 Z"/>
  <path class="bed" d="M232,155 L333,155 M245,130 L320,130 M258,108 L307,108"/>
  <path class="basalt" d="M278,84 L287,84 L292,180 L273,180 Z"/>
  <text class="lab" x="222" y="200">stratovolcano</text>
  <text class="sub" x="222" y="216">slope 15–35°, layered</text>
  <!-- cinder cone -->
  <path class="rock" d="M380,180 L410,140 L418,140 L448,180 Z"/>
  <text class="lab" x="378" y="200">cinder cone</text>
  <text class="sub" x="378" y="216">slope ~32°, < 1 km³</text>
  <!-- caldera -->
  <path class="rock" d="M480,180 L480,120 L520,120 L520,150 L600,150 L600,120 L650,120 L650,180 Z"/>
  <path class="basalt" d="M545,150 L575,150 L575,180 L545,180 Z"/>
  <text class="lab" x="492" y="200">caldera</text>
  <text class="sub" x="492" y="216">collapse 2–50 km across</text>
  <text class="sub" x="10" y="240">vertical scale exaggerated about 3×; all four at the same horizontal scale</text>
</svg>
:::

The form follows from the four variables of the first section, and it is diagnostic: given the shape of an edifice, an experienced volcanologist can tell you the magma type, the effusion rate and the style of eruption, which is how the history of an extinct volcano with no written record is reconstructed.

::: example How fast must a shield be fed? {#ex-shield}
Mauna Loa is roughly a cone $110\ \mathrm{km}$ across and $7.5\ \mathrm{km}$ tall measured from the sea floor, and its subaerial part is less than $0.7\ \mathrm{Myr}$ old. Estimate the mean effusion rate required, and compare it with the historical record.
::: solution
Cone volume $V = \tfrac{1}{3}\pi r^2 h = \tfrac{1}{3}\pi(5.5\times10^{4})^2(7.5\times10^{3}) = 2.4\times10^{13}\ \mathrm{m^3}$, about $24{,}000\ \mathrm{km^3}$. Spread over $0.7\ \mathrm{Myr} = 2.2\times10^{13}\ \mathrm{s}$, the mean rate is $1.1\ \mathrm{m^3\,s^{-1}}$.

The historical record brackets this neatly. The 1950 eruption of Mauna Loa produced $0.044\ \mathrm{km^3}$ in 23 days, a rate of $22\ \mathrm{m^3\,s^{-1}}$; Kilauea's East Rift Zone eruption of 1983–2018 averaged about $3\ \mathrm{m^3\,s^{-1}}$ for thirty-five years; and single fountaining episodes reach $50$–$100\ \mathrm{m^3\,s^{-1}}$. So the long-term average is a few times *below* the observed average of the last century, which means either that the edifice is older than its subaerial surface dates suggest (it is: the volcano grows by subsidence and rebuilding, and the deep borehole record is older), or that the present decade is an unusually productive one. Both are true, and the arithmetic is the way you find out which matters.

The same calculation for a flood basalt is what makes large igneous provinces alarming: the Deccan Traps hold about $1.5\times10^{6}\ \mathrm{km^3}$, and the best-dated pulses require effusion rates of $10^{3}$–$10^{4}\ \mathrm{m^3\,s^{-1}}$ sustained for decades — a thousand times Mauna Loa, erupted onto a continental margin at the same time as the largest extinction of the last $66\ \mathrm{Myr}$ ([[earth-history/mass-extinctions]]).
:::
:::

::: definition Volcano types {#def-types}
A **shield volcano** is a broad, low-angle edifice ($2$–$6^\circ$) built by repeated fluid basalt flows, tens of kilometres across and up to $100{,}000\ \mathrm{km^3}$ in volume. A **stratovolcano** (composite cone) is a steep ($15$–$35^\circ$), kilometre-scale cone of interbedded lava, ash and debris built over $10^4$–$10^5$ years by alternating effusive and explosive activity. A **cinder (scoria) cone** is a pile of ballistic fragments around a single vent, rarely more than a few hundred metres across, with slopes at the angle of repose. A **lava dome** is an extrusion too viscous to flow far. A **caldera** is a collapse depression $2$–$50\ \mathrm{km}$ across formed when a magma chamber is emptied, and a **fissure vent** is a line of vents along a dyke swarm, the source of flood basalts and of the great Icelandic eruptions.
:::

::: theorem Column height scales weakly with mass flux {#thm-column}
For a sustained eruption column of buoyancy flux $B$ (in $\mathrm{m^4\,s^{-3}}$) in a still atmosphere, the height $H$ above the vent scales as
$$
H \propto B^{1/4},
$$
so a factor of $10^4$ in mass flux raises the column by only a factor of ten.
:::

::: proof
A plume of density deficit $g'$ and velocity $w$ rising through height $z$ conserves its buoyancy flux $B \sim g' w z^2$ and its kinetic energy, so $w \sim (B^2 z)^{1/5}$ and $g' \sim B^{3/5} z^{-1/5}$ in the self-similar regime of Morton, Taylor and Turner (1956). The column stops where its density matches the atmosphere, that is where the accumulated entrainment of ambient air has diluted the source to neutral buoyancy; dimensional analysis of the same conserved fluxes gives $H \propto B^{1/4} N^{-1/4}$, with $N$ the buoyancy frequency of the atmosphere. ∎

The practical content is a warning about reading eruptions from photographs. Column height is the easiest thing to measure and one of the worst estimators of magnitude, because the exponent is $1/4$: doubling the height means a factor of $2^4 = 16$ in mass flux, and a strong wind shear can strip $10\ \mathrm{km}$ off a column that is erupting at a constant rate. This is why the Volcanic Explosivity Index, which is built partly on column height, is a logarithmic and much-criticised scale, and why modern forecasts use mass flux measured from satellites instead.
:::

## What comes out

**Lava.** *Pahoehoe* is smooth, ropy and fed as a slow, hot, degassed flow with a thin skin that folds; *aa* is a rubble-covered clinker flow, faster, cooler and more viscous, whose surface is jagged clasts over a still-moving core; *block lava* is the andesitic and dacitic analogue; *pillow lava* is what basalt makes when quenched under water, and it is the most abundant volcanic rock on Earth, forming the upper metres of the entire oceanic crust. Lava tubes carry molten rock kilometres from a vent with little heat loss, which is why Hawaiian flows reach the sea from vents $20\ \mathrm{km}$ away.

**Pyroclasts** are named by size: ash ($<2\ \mathrm{mm}$), lapilli ($2$–$64\ \mathrm{mm}$), bombs and blocks ($>64\ \mathrm{mm}$). A pumice or scoria is a pyroclast frozen while frothy.

::: example Why pumice floats, and why that matters {#ex-pumice}
Volcanic glass has $\rho = 2400\ \mathrm{kg\,m^{-3}}$. What porosity does a pumice need in order to float on water, and what does floating imply for the distance over which pumice rafts can be found?
::: solution
For a bulk density below $1000\ \mathrm{kg\,m^{-3}}$ with negligible solid density change,
$$
\rho_\text{bulk} = \rho_\text{glass}(1-\phi) < 1000 \Longrightarrow \phi > 1 - \frac{1000}{2400} = 0.58 .
$$
So a pumice needs more than about $58\%$ void space, and typical pumice has $60$–$80\%$. The consequence is a mode of transport no other rock has: pumice rafts from a submarine eruption have been sailed on, tracked by satellite and found $2500\ \mathrm{km}$ from the vent that made them, and they carry corals, molluscs and microbes across ocean basins in weeks. Reading a pumice layer in a deep-sea core therefore gives you a wind- or current-driven dispersal path, and a very precise age if the eruption is dated.
:::
:::

::: widget plot
f: s^2*sin(2*x)/9.81
x: 0, 1.57
y: 0, 2400
sliders: s=100:20:160:5
labels: range of a ballistic bomb
caption: Ground range of a volcanic bomb launched at speed $s$ in $\mathrm{m\,s^{-1}}$ against launch angle $x$ in radians, ignoring air drag. The maximum is at $45^\circ$, and a $100\ \mathrm{m\,s^{-1}}$ bomb would fly $1.0\ \mathrm{km}$. Real bombs fall much shorter, because a metre-scale clast in hot gas is decelerated within a few hundred metres: observed ballistic fields extend a few hundred metres to about $1\ \mathrm{km}$ from a vent, and the discrepancy between the drag-free curve and the observed limit is itself used to estimate the density and velocity of the ejecting mixture. Ballistic range is also a practical hazard boundary — it is the innermost zone of any eruption forecast.
:::

**Pyroclastic density currents** are the deadliest products of explosive volcanism and the least intuitive. A column that collapses — because it becomes too dense, too gas-poor, or is laterally blasted — turns into a ground-hugging mixture of hot ash, pumice and air that travels tens to hundreds of kilometres per hour, at $200$–$700\ ^\circ\mathrm{C}$, and it is not a cloud you can outrun, outdrive or shelter from. Saint-Pierre was one. The 2019 Whakaari/White Island and the 1902 and 1991 events all show the same thing: the fatal product arrives within minutes, without the visual warning of an advancing lava front.

**Lahars** are debris flows of volcanic sediment and water, and they are the most frequent killer at ice-capped volcanoes. Nevado del Ruiz, Colombia, 13 November 1985: a relatively small eruption melted enough of the summit glacier to send lahars down three valleys; the town of Armero, $47\ \mathrm{km}$ away, was struck some eight hours later and about 23,000 of its 29,000 people died. The hazard map for that volcano had been published weeks earlier and had placed Armero in a red zone.

::: example Lahar speed and warning time {#ex-lahar}
Ruiz lahars reached Armero, $47\ \mathrm{km}$ from the summit, about $8$ hours after the 23:06 eruption. Find the mean speed, and say what it implies about evacuation.
::: solution
$v = 47/8 = 5.9\ \mathrm{km\,h^{-1}}$ — a fast walk, and slower than any vehicle. The eruption was detected seismically within minutes, and the warning that would have saved Armero was a matter of hours, not seconds.

That is the general rule for lahar hazard: the flows are slow, they follow valleys, and they are predictable from topography, so the problem is never the physics and almost always the communication — knowing which valleys are the flow paths, having a siren, and having rehearsed what to do when it sounds. Modern lahar monitoring uses geophones and acoustic-flow monitors in the channels themselves, which give minutes of warning for secondary flows from a dammed lake or a rainstorm on fresh tephra ([[natural-hazards/volcanic-hazards]]).
:::
:::

::: svg
caption: A stratovolcano and its hazard zonation. The ballistic field and pyroclastic flows are confined to the edifice and the valleys within a few kilometres; lava flows follow local topography and are slow; tephra fall extends hundreds of kilometres downwind and is the hazard that becomes an aviation and agriculture problem rather than a local one; lahars run down valleys, over tens of kilometres, and can be triggered by rain on fresh tephra months or years after an eruption. The dashed lines are the boundaries used in real hazard maps, which are drawn as a probability of being reached, not as a single line.
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Volcano hazard zonation schematic">
  <style>
    .cone { fill: var(--deemph); stroke: var(--rule-2); stroke-width: 1; }
    .valley { fill: var(--sheet); stroke: var(--rule-2); stroke-width: 1; }
    .pdc { fill: var(--series-2); opacity: 0.5; }
    .lahar { fill: var(--series-1); opacity: 0.45; }
    .lava { fill: var(--series-3); opacity: 0.6; }
    .plume { fill: var(--ink-3); opacity: 0.35; }
    .lab { fill: var(--ink); font-size: 12px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
    .town { fill: var(--ink); }
  </style>
  <path class="valley" d="M0,300 L760,300 L760,330 L0,330 Z"/>
  <path class="cone" d="M250,300 L370,90 L390,90 L510,300 Z"/>
  <path class="plume" d="M368,90 Q340,20 420,10 Q520,4 560,40 Q470,50 400,88 Z"/>
  <path class="pdc" d="M300,300 L372,110 L388,110 L470,300 Z"/>
  <path class="lava" d="M388,140 Q430,200 470,240 L500,300 L470,300 Q430,235 380,160 Z"/>
  <path class="lahar" d="M300,300 Q250,250 200,240 L120,250 L60,290 L0,300 L0,320 L240,318 L300,312 Z"/>
  <path class="lahar" d="M470,300 Q560,290 640,300 L760,318 L760,330 L470,330 Z"/>
  <circle class="town" cx="120" cy="286" r="4"/>
  <circle class="town" cx="640" cy="308" r="4"/>
  <text class="lab" x="430" y="30">tephra fall: 100s of km downwind</text>
  <text class="lab" x="300" y="250">pyroclastic flows</text>
  <text class="lab" x="500" y="230">lava</text>
  <text class="lab" x="60" y="270">lahar down valley</text>
  <text class="sub" x="96" y="300">town in a lahar path</text>
  <text class="sub" x="560" y="330">lahar path</text>
  <text class="sub" x="300" y="80">ballistic field: < 1 km</text>
</svg>
:::

## Monitoring, and what it can and cannot tell you

Volcanoes announce themselves. Almost every eruption in the last forty years that was monitored was preceded by measurable changes, and the three signals that matter are:

- **Seismicity.** Magma movement breaks rock and moves fluid: swarms of shallow earthquakes, often with a distinctive long-period "drumbeat" signal, are the most reliable precursor. The 1989–1995 activity of Unzen, the 2018 Kilauea eruption and the 1991 Pinatubo eruption were all forecast from seismicity and seismicity alone would have been nearly enough.
- **Deformation.** A filling chamber inflates the ground by centimetres to metres, measured by levelling, GPS and InSAR interferometry. Long-period inflation at Rabaul, Campi Flegrei and Uturuncu is measurable over decades.
- **Gas.** The $\mathrm{SO_2}$ flux, and above all the $\mathrm{CO_2}/\mathrm{SO_2}$ ratio, which rises when fresh, deep magma arrives, because $\mathrm{CO_2}$ exsolves at much greater depth than water.

What monitoring cannot do is give a certain date, or handle the volcano that has never erupted in historical time, or the one whose unrest looks like its own background. And it cannot make the warning effective: the difference between Pinatubo in June 1991, where 600 deaths followed the evacuation of 60,000–80,000 people, and Armero six years earlier, where 23,000 died with a hazard map in hand, was not instrumentation.

::: application Volcanic gas, and the difference between a hazard and a nuisance {#app-gas}
$\mathrm{CO_2}$ is heavier than air and accumulates in hollows, cellars and valley floors; at $5$–$10\%$ by volume it is lethal within minutes, and permanent degassing from volcanic terrain kills cattle and, repeatedly, people who go into a pit or a cellar. $\mathrm{SO_2}$ at parts-per-billion levels irritates airways, and at volcanic plume concentrations causes acid rain and, in the 1783 Laki fissure eruption in Iceland, a haze over Europe that was blamed for several thousand deaths in Britain and France and for the worst famine in Iceland's history. $\mathrm{HF}$ adsorbed on ash is the reason that tephra fall, which looks merely untidy, poisons livestock and contaminates water supplies for weeks. None of these are spectacular, and all of them are the reason that a volcano's post-eruption hazard map is larger and longer-lived than its eruption map.
:::

## Volcanoes and climate

Sulfate aerosol in the stratosphere reflects sunlight, and because the stratosphere is wet-free and stable, the aerosol persists for one to three years. The modern benchmark is Pinatubo, June 1991: it injected roughly $20\ \mathrm{Mt}$ of sulfur as some $40\ \mathrm{Mt}$ of $\mathrm{SO_2}$ into the tropical stratosphere, produced a global aerosol layer with an optical depth near $0.15$, and cooled the globe by about $0.5\ ^\circ\mathrm{C}$ over 1992–93 ([[climate-system/forcing]]).

::: example From cooling to forcing to sulfur {#ex-climate}
Pinatubo cooled the globe by about $0.5\ \mathrm{K}$. Using a climate feedback parameter $\lambda = 0.8\ \mathrm{K\,(W\,m^{-2})^{-1}}$ ([[climate-system/feedbacks-sensitivity]]), find the mean radiative forcing, and the implied forcing per megatonne of $\mathrm{SO_2}$. Then explain why a tropical eruption is more effective per tonne than a high-latitude one.
::: solution
$\Delta F = \Delta T/\lambda = -0.5/0.8 = -0.63\ \mathrm{W\,m^{-2}}$, averaged over the globe and the two years. Per megatonne of $\mathrm{SO_2}$ that is $-0.63/40 = -0.016\ \mathrm{W\,m^{-2}\,Mt^{-1}}$.

The tropical advantage is a matter of residence and distribution: the Brewer–Dobson circulation and the tropical pipe spread a tropical injection into a global, near-continuous sulfate layer that lasts years, whereas a high-latitude injection stays in one hemisphere, sediments faster, and produces a smaller global mean forcing for the same mass. This is why the two largest cooling events of the last two centuries — Tambora 1815 and Krakatoa 1883, both tropical — are the ones that appear in the temperature reconstructions and in the historical record of harvest failures, and why a hypothetical eruption of the same size into the tropical stratosphere is a global and not a local event. It is also the physical basis of the stratospheric-aerosol proposals discussed, with many caveats and large uncertainties, under solar radiation management ([[climate-change/responses]]).
:::
:::

Over geological time the balance reverses. Volcanism is the main long-term source of $\mathrm{CO_2}$ to the surface system, and large igneous provinces are associated with the major extinctions of the last half-billion years — the Siberian Traps with the end-Permian, the Central Atlantic and Karoo–Ferrar provinces with the end-Triassic, the Deccan with the end-Cretaceous — through a combination of $\mathrm{CO_2}$ warming, sulfur cooling, ocean acidification and, where the lava burns coal or evaporite, catastrophic release of halogens and more sulfur. The mid-ocean ridge system, which no one has ever watched erupt from the air, is by volume the largest volcanic system on the planet, and it emits its lava quietly, under $2500\ \mathrm{m}$ of water, at about $20\ \mathrm{km^3\,yr^{-1}}$ against perhaps $1\ \mathrm{km^3\,yr^{-1}}$ from all subaerial volcanoes combined.

::: quiz
A volcano that has been quiet for 5000 years shows a swarm of 200 shallow earthquakes in three days, $20\ \mathrm{cm}$ of summit inflation, and a $\mathrm{CO_2}/\mathrm{SO_2}$ ratio that has risen from 2 to 12. What is the best interpretation?
- [ ] Instrumental drift; nothing is happening.
- [x] Magma is moving into the shallow system; an eruption is possible within days to months, and the area should be cleared.
- [ ] Hydrothermal circulation changed; harmless.
- [ ] The volcano is entering a dormant phase.
::: solution
All three signals point the same way, and their combination is the classic unrest pattern: earthquakes from fracturing, inflation from pressurisation, and a rising deep-gas ratio from fresh magma. The honest forecast is probabilistic — most such episodes do not erupt, and the timescale is days to months, not hours — but the correct action is to raise the alert level and reduce exposure, because the cost of a false alarm is small and the cost of a false all-clear is Armero. Hydrothermal changes can mimic some of this, which is why observatories use several independent signals.
:::
:::

::: history
The word "volcano" comes from Vulcano, the Aeolian island whose eruptions the ancients attributed to the forge of Vulcan; the study of them began as natural history and became physics in the twentieth century. The 1883 Krakatoa eruption was the first global geophysical event: its pressure wave was recorded on barographs around the world for five days, its aerosols produced red sunsets recorded in paintings and in the first synoptic climate analyses, and its acoustic signal was heard $4800\ \mathrm{km}$ away. The 1902 Pelée and La Soufrière eruptions produced the two competing interpretations of the decade — the "nuée ardente" cloud of Louis-Ferdinand Croix-Fulton and Annie Lacroix's pyroclastic-flow interpretation versus the "steam explosion" theory of Frank Perret, who had watched Soufrière — and the argument was not settled until the 1970s, when Spence and others showed that the deposits of 1902 could only have been made by a hot, dense, ground-hugging current. Haroun Tazieff's reports from Nyiragongo in the 1950s, and the establishment of the Hawaiian Volcano Observatory by Thomas Jaggar in 1912, made volcanology an instrumented science; the successful 1991 Pinatubo forecast, using seismicity, deformation and gas, is its most celebrated result.
:::

## Where this leads

Eruption style is a consequence of magma composition, which is the subject of [[physical-geology/igneous-rocks]] and of [[mineralogy-petrology/igneous-settings]]; the hazard arithmetic is carried much further in [[natural-hazards/volcanic-hazards]], and the monitoring techniques in [[remote-sensing/radar-lidar]] (InSAR for deformation) and [[remote-sensing/thermal-microwave]] (satellite thermal alerts, which detect almost every eruption on Earth within hours). The climate section generalises to [[climate-system/forcing]] and [[climate-system/energy-budget]], and the deep-time role of large igneous provinces to [[earth-history/mass-extinctions]], and the role of volcanic degassing in building the atmosphere and ocean to [[earth-history/early-earth]].

::: summary Key takeaways
- Explosivity is set by viscosity, gas content, ascent speed and conduit geometry, not by temperature: one per cent dissolved water can expand to 170 times the melt volume at the surface.
- Fragmentation, at roughly 70–75 % bubbles by volume, is the physical transition from lava fountain to eruption column, and it is why the same volcano can do both.
- Edifice shape is a diagnostic: shields from high effusion rate and low viscosity, stratovolcanoes from alternating explosive and effusive activity, cinder cones from ballistic accumulation, calderas from collapse.
- The deadliest products are the fast and the slow ones: pyroclastic density currents within minutes, lahars within hours and often long after the eruption, and both follow topography.
- Ballistic range, lava flow paths and lahar paths are all predictable from geometry; tephra fall is predictable from wind fields; none of it is a reason to stay.
- Monitoring works: seismicity, deformation and gas ratios preceded essentially every well-observed eruption of the last forty years. Failures are failures of warning, not of measurement.
- Volcanic sulfur cools the planet and volcanic carbon dioxide warms it; Pinatubo's 40 Mt of $\mathrm{SO_2}$ gave about $-0.6\ \mathrm{W\,m^{-2}}$ and $-0.5\ \mathrm{K}$, and the largest volcanic systems on Earth are submarine.
- Volcanic hazards are educational material: follow your national volcano observatory and civil-protection agency, and treat their alerts as the authority, not this chapter.
:::

## Exercises

::: exercise Gas volume at depth {level=1 check="12"}
A basaltic melt contains $0.3\%$ dissolved $\mathrm{H_2O}$ by weight. What fraction of the melt volume (density $2900\ \mathrm{kg\,m^{-3}}$) would exsolved gas occupy at $1200\ ^\circ\mathrm{C}$ and $50\ \mathrm{MPa}$?
::: solution
Per kg: $3\ \mathrm{g}$ of water $= 0.167\ \mathrm{mol}$; $V = 0.167\times8.314\times1473/5\times10^{7} = 4.1\times10^{-5}\ \mathrm{m^3}$. Melt volume $= 1/2900 = 3.45\times10^{-4}\ \mathrm{m^3}$. Ratio $= 0.12$, i.e. $12\%$ of the melt volume. Well below the fragmentation threshold, which is why basalt degasses quietly at these depths; the same melt at $0.1\ \mathrm{MPa}$ would reach a gas volume $60$ times the melt volume.
:::
:::

::: exercise Edifice geometry {level=1 check="35"}
A cinder cone is $120\ \mathrm{m}$ high and $340\ \mathrm{m}$ across at its base. Compute its mean slope angle.
::: solution
$\tan\theta = 120/170 = 0.706$, so $\theta = 35^\circ$ — using the radius, not the diameter, which is the mistake this question is built to catch. Slopes of $30$–$35^\circ$ are the angle of repose of loose scoria, which is why cinder cones are so uniform in shape and why they fail so readily when a lava flow breaches them.
:::
:::

::: exercise Tephra loading {level=1 check="0.98"}
A tephra fall of $10\ \mathrm{cm}$ of dry ash ($\rho = 1000\ \mathrm{kg\,m^{-3}}$) lands on a roof. Find the load in $\mathrm{kN\,m^{-2}}$, and compare it with a typical design snow load of $1\ \mathrm{kN\,m^{-2}}$.
::: solution
Load $= \rho g h = 1000\times9.81\times0.10 = 981\ \mathrm{N\,m^{-2}} = 0.98\ \mathrm{kN\,m^{-2}}$ — already equal to a design snow load, from a deposit you could shovel in an afternoon. Ash is therefore a structural hazard out of all proportion to its appearance, and wet ash is worse: it gains water mass and loses shear strength, which is why most tephra-related deaths in the 1991 Pinatubo and 2010 Eyjafjallajökull events were from roof collapse days or weeks after the eruption.
:::
:::

::: exercise Viscosity and flow {level=2 check="1.78"}
A lava flow $5\ \mathrm{m}$ thick moves down a slope of $5^\circ$. For a Newtonian fluid the mean velocity is $u = \rho g h^2 \sin\alpha/(3\eta)$. Take $\rho = 2500\ \mathrm{kg\,m^{-3}}$ and $\eta = 10^{4}\ \mathrm{Pa\,s}$. Find $u$ in $\mathrm{m\,s^{-1}}$ (enter $u$), and the viscosity that would make the same flow move $1\ \mathrm{m\,h^{-1}}$.
::: solution
$u = 2500\times9.81\times25\times\sin 5^\circ/(3\times10^{4}) = 2500\times9.81\times25\times0.0872/3\times10^{4} = 1.78\ \mathrm{m\,s^{-1}}$.

For $u = 2.8\times10^{-4}\ \mathrm{m\,s^{-1}}$ the required viscosity is $10^{4}\times(1.78/2.8\times10^{-4}) = 6.4\times10^{7}\ \mathrm{Pa\,s}$. Real aa flows move at metres per minute, not metres per second, so the Newtonian formula over-predicts by an order of magnitude or more: natural lavas are Bingham-like, with a yield strength of $10^2$–$10^4\ \mathrm{Pa}$ that must be overcome before they move at all. The exercise's real point is the $h^2$ dependence — doubling the thickness makes a flow four times faster, which is why thick channelised flows are so much more dangerous than thin ones.
:::
:::

::: exercise Column height and mass flux {level=2 check="4.0"}
The 1991 Pinatubo eruption column reached $34\ \mathrm{km}$ above sea level. Using $u = \sqrt{2gh}$ as a crude estimate of the exit velocity, find the exit velocity and the mass flux if the vent is $25\ \mathrm{m}$ across and the mixture density is $100\ \mathrm{kg\,m^{-3}}$. (Enter the mass flux in $\mathrm{kg\,s^{-1}}$, divided by $10^{7}$.)
::: solution
$u = \sqrt{2\times9.81\times34{,}000} = 817\ \mathrm{m\,s^{-1}}$ — an upper bound, since it ignores entrainment, drag and the buoyancy that actually drives columns. Mass flux $\dot M = \rho u A = 100\times817\times\pi\times12.5^2 = 4.0\times10^{7}\ \mathrm{kg\,s^{-1}}$, and the observed mass flux of the largest Plinian columns is $10^{6}$–$10^{8}\ \mathrm{kg\,s^{-1}}$, so the estimate is the right order.

The honest version uses the buoyancy flux: a column's height scales as $B^{1/4}$ with $B$ the buoyancy flux, which is why column height is such a poor estimator of eruption magnitude — a factor of $10^4$ in mass flux changes the height by only a factor of ten, and wind shear can remove as much height as a halving of the flux.
:::
:::

::: exercise Sulfur and cooling {level=2 check="0.016"}
An eruption injects $60\ \mathrm{Mt}$ of $\mathrm{SO_2}$ into the tropical stratosphere. Using the Pinatubo scaling of [[#ex-climate]], estimate the mean radiative forcing and the cooling for $\lambda = 0.8\ \mathrm{K\,(W\,m^{-2})^{-1}}$.
::: solution
$\Delta F = -0.016\times60 = -0.96\ \mathrm{W\,m^{-2}}$, and $\Delta T = \lambda\Delta F = -0.77\ \mathrm{K}$. (Enter the forcing per megatonne: $-0.016\ \mathrm{W\,m^{-2}\,Mt^{-1}}$.) The estimate is linear in mass, which is generous: the aerosol grows, coagulates and sediments faster at high loading, so the response saturates. It also ignores that the forcing is largest in the tropics and that the ocean's heat uptake delays and damps the surface response, both of which make the first-year cooling smaller than the equilibrium value.
:::
:::

::: exercise Deriving the fragmentation condition {level=3}
Fragmentation is usually taken to occur when the bubble volume fraction reaches $\phi_b \approx 0.75$. Show that for a magma with initial dissolved water $w$ (weight fraction) exsolving completely at pressure $P$ and temperature $T$, the fragmentation pressure is
$$
P_f \approx \frac{w\,R\,T\,\rho_m}{3\,\mu_\mathrm{w}},
$$
where $\mu_\mathrm{w}=0.018\ \mathrm{kg\,mol^{-1}}$ is the molar mass of water, and evaluate it for $w = 0.02$, $T = 1100\ \mathrm{K}$, $\rho_m = 2400\ \mathrm{kg\,m^{-3}}$.
::: solution
At fragmentation the gas volume is $\phi_b/(1-\phi_b) = 3$ times the melt volume. Per kilogram of magma, $V_g = (w/0.018)RT/P$ and $V_m = 1/\rho_m$, so
$$
\frac{wRT}{0.018\,P} = \frac{3}{\rho_m} \Longrightarrow P_f = \frac{wRT\rho_m}{0.054} = \frac{wRT\rho_m}{3\times0.018}.
$$
Numerically: $P_f = 0.02\times8.314\times1100\times2400/(3\times0.018) = 8.1\times10^{6}\ \mathrm{Pa} \approx 8\ \mathrm{MPa}$, corresponding to roughly $300\ \mathrm{m}$ of depth in the conduit.

So a rhyolite with $2\%$ water fragments at a few megapascals, that is, within a few hundred metres of the surface, and the whole explosive phase of the eruption happens in the top few hundred metres of the conduit. That is why the vent is destroyed, why the deposit is a few per cent of the magma volume, and why most of the magma of a large explosive eruption is never erupted at all but stays behind to cool. It is also why the criterion is a *threshold*: a magma with $1\%$ water fragments at half the pressure, and one that degasses openly on the way up — a lava lake, an open-vent andesite — does not fragment however much water it started with.
:::
:::

::: exercise A hazard map from a digital elevation model {level=3}
A lahar from a summit crater is modelled as flowing down-valley with a runout that decays as $L = k\,V^{1/3}$, where $V$ is the mobilised volume. Observed events give $L = 60\ \mathrm{km}$ for $V = 5\times10^{6}\ \mathrm{m^3}$. Find $k$, and the runout for a $10^{8}\ \mathrm{m^3}$ event. What does the scaling imply for hazard mapping?
::: solution
$k = 60{,}000/(5\times10^{6})^{1/3} = 60{,}000/171 = 351$. For $V = 10^{8}\ \mathrm{m^3}$, $L = 351\times464 = 1.63\times10^{5}\ \mathrm{m} = 163\ \mathrm{km}$.

A twenty-fold increase in volume gives a 2.7-fold increase in runout, so the far end of the hazard zone is controlled by the largest credible event rather than by the average one — and because the relation is a power law fitted to a handful of events, the uncertainty at the far end is enormous. This is why real lahar hazard maps are drawn as inundation envelopes from numerical flow models run over a digital elevation model for a range of volumes, and why they are expressed as probabilities of inundation rather than as a single line: the topography is known to a metre, and the physics of a $10^{8}\ \mathrm{m^3}$ debris flow is not known to a factor of two ([[natural-hazards/volcanic-hazards]], [[remote-sensing/gis-data]]).
:::
:::

::: exercise Reading an eruption record {level=3}
A lake sediment core $40\ \mathrm{km}$ downwind of a volcano contains, in varved (annually layered) sediment, a tephra layer $12\ \mathrm{mm}$ thick at varve 1450, $3\ \mathrm{mm}$ at $120\ \mathrm{km}$ downwind, and $0.5\ \mathrm{mm}$ at $400\ \mathrm{km}$. Grain-size analysis shows maximum clast diameter falling from $30\ \mathrm{mm}$ to $4\ \mathrm{mm}$ to $0.5\ \mathrm{mm}$. Estimate the eruption magnitude and say what you cannot determine from these data.
::: solution
Thickness and clast size both decay roughly exponentially with distance downwind, so extrapolating the thickness decay back to the vent gives an estimate of the vent thickness, and integrating the thickness-over-distance curve over the deposit area gives the tephra volume and hence a magnitude class. With three distances you can fit the decay constant but not the area, because you have no map of the deposit's extent — the essential fourth measurement.

What you cannot determine from the core alone: whether the eruption was one event or three within a year (varves can hide that), the column height (which needs maximum clast size *at the vent* and wind direction), the volume of magma withdrawn from the chamber (which may be far larger than the volume erupted), and the date in calendar years unless the varve chronology is tied to a known horizon. What you can determine is the recurrence interval of tephra layers of a given thickness at that site, which is the number that actually goes into a hazard assessment — and which is why the longest records are read from lake and sea beds rather than from historical documents.
:::
:::
