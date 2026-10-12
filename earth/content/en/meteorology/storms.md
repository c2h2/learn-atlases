A mature thunderstorm processes fifty thousand kilograms of air a second, releases of order $10^{12}\ \mathrm{W}$ of latent heat, carries a current of tens of thousands of amperes, and lasts forty minutes. A hurricane processes a million times as much, releases heat at a rate two hundred times the world's electrical generating capacity, and lasts a week. Both are made of the same three ingredients — warm moist air, a way to lift it, and a wind that does not change too much with height, or changes in exactly the right way — and both are understood, in their broad outlines, by the same thermodynamics you used to compute a cloud base. What makes them dangerous is not their complexity but their scale, and what makes them hard to forecast is that the difference between a thunderstorm and a supercell, or between a tropical storm and a category 5, is a few metres per second of shear and a degree of sea surface.

::: definition The thunderstorm's life cycle {#def-thunderstorm}
An ordinary air-mass thunderstorm has three stages and a life of half an hour to an hour. In the **cumulus stage** there is only updraught: a parcel rises from the boundary layer, condenses at the lifting condensation level, accelerates to a speed near $\sqrt{2\text{cape}}$, and the cloud grows at $10$–$20\ \mathrm{m\,s^{-1}}$ of vertical growth to a level where its buoyancy fails. In the **mature stage** precipitation reaches the level of the updraught and the storm has both: the rain and graupel drag air downward, and evaporation and melt cool it, so that a parcel becomes colder than its environment by several kelvin and falls as a **downdraught** of $5$–$15\ \mathrm{m\,s^{-1}}$. In the **dissipating stage** the downdraught has spread at the surface as a **cold pool** or **gust front**, has undercut the inflow, and the storm rains itself out from below. The cold pool is the storm's own executioner and, in a line, its means of reproduction: the density current it drives lifts the next parcel to its level of free convection, and the process repeats at $10$–$20\ \mathrm{m\,s^{-1}}$ ahead of the storm.

The electrification happens in the mixed-phase region between $-10$ and $-20\ ^\circ\mathrm{C}$, where graupel falling through supercooled droplets collides with small ice crystals. The sign of the charge transferred depends on the liquid water content and the temperature — positive to the graupel below $-10\ ^\circ\mathrm{C}$, negative above $-20$ — and because the light crystals are carried to the top by the updraught and the heavy graupel falls, the cloud ends with a main positive charge in its upper third, a main negative charge in its middle and often a small positive charge near its base. The field below the negative centre ionises the air in stepped leaders that descend toward the ground in $50\ \mathrm{m}$ jumps of a microsecond each; when one meets a streamer from the ground the circuit closes and the **return stroke** travels upward at a third of the speed of light, carrying a median current of $30\ \mathrm{kA}$ and heating the channel to $30{,}000\ \mathrm{K}$, which is the thunder.
:::

::: example Lightning, and its arithmetic {#ex-lightning}
You count six seconds between a flash and the thunder. How far away is the storm, and how long before its leading edge reaches you if it moves at $50\ \mathrm{km\,h^{-1}}$? A return stroke carries $30\ \mathrm{kA}$ at a peak potential of $100\ \mathrm{MV}$ for $100\ \mu\mathrm{s}$. Find its energy and compare it with a household's daily use.
::: solution
Sound travels at $343\ \mathrm{m\,s^{-1}}$, so six seconds is $2.1\ \mathrm{km}$ — the "three seconds to the mile" rule, or its metric cousin of three seconds per kilometre. At $50\ \mathrm{km\,h^{-1}}$ the storm arrives in two and a half minutes, which is why the rule for safety is not the flash-to-bang distance but the maxim "when the thunder roars, go indoors": lightning can strike ten kilometres from the rain, and the front of a storm is dangerous before its rain is.

The energy of the stroke is $\tfrac12\int IV\,\mathrm{d}t \approx \tfrac12\times3\times10^4\times10^8\times10^{-4} = 1.5\times10^8\ \mathrm{J}$, one hundred and fifty megajoules, about forty kilowatt-hours — a domestic day's electricity, delivered in a tenth of a millisecond, and mostly lost as light, heat and sound in the first few metres of the channel. This is why lightning is not a usable energy source and why it kills by the side flash and the ground current rather than by the direct stroke: of the hundred or so deaths a year in the United States and Europe, most are from a stroke to a tree or a pole near the victim, and the current that reaches the heart is a fraction of the total but enough.

The puzzle of lightning is not the discharge but the charging. The field at which dry air breaks down is $3\ \mathrm{MV\,m^{-1}}$, and at the small water contents of a cloud drop the local enhancement brings the effective threshold near $1\ \mathrm{MV\,m^{-1}}$, yet balloons and rockets measure maximum fields inside growing clouds of only $0.1$–$0.3\ \mathrm{MV\,m^{-1}}$. How a cloud gets from $0.2$ to $1$ remains a live question, with candidates including the field near the tips of hydrometeors, the runaway breakdown of cosmic-ray secondaries, and the geometry of the charge regions — one of the few large unsolved problems in classical physics.
:::
:::

::: proposition Shear, supercells and the organised storm {#prop-shear}
The **deep-layer shear** $\mathbf{S} = \mathbf{V}(6\ \mathrm{km}) - \mathbf{V}(100\ \mathrm{m})$ and the **storm-relative helicity** $\text{SRH} = \int(\mathbf{v}-\mathbf{c})\times(\partial\mathbf{v}/\partial z)\,\mathrm{d}z$ over the lowest $3\ \mathrm{km}$ organise convection. In no shear the storm's own cold pool cuts it off in half an hour. With $10$–$20\ \mathrm{m\,s^{-1}}$ of shear the updraught tilts, the downdraught falls behind the updraught, and the storm survives for hours as a **multicell**, producing a line. With more than $20\ \mathrm{m\,s^{-1}}$ of shear and $\text{SRH} > 150\ \mathrm{m^2\,s^{-2}}$ the updraught itself rotates: horizontal vorticity $\boldsymbol\omega = -\partial u/\partial z$ generated by the shear is tilted into the vertical by the updraught, and the storm becomes a **supercell** with a single rotating updraught (a **mesocyclone**) $3$–$10\ \mathrm{km}$ across, a lifetime of hours, and a precipitation-free inflow region on its south-east flank. The rear-flank downdraught wraps around the mesocyclone, the reflectivity takes the shape of a **hook echo**, and where the updraught, the rear-flank downdraught and the forward-flank downdraught meet, on the storm's south-west, is where a tornado forms if one forms at all.

A **squall line** is a different animal: a line of convection, hundreds of kilometres long, riding on the leading edge of its own cold pool. The **Rotunno–Klemp–Miller** criterion says the line is self-sustaining when the cold pool's density deficit and the shear balance, so that the leading edge of the gust front is lifted rather than pushed down — quantitatively, when
$$
\frac{c^2}{2\,\Delta\theta/\theta_0\,g\,h} \approx 1 ,
$$
with $c$ the propagation speed, $\Delta\theta$ the pool's potential-temperature deficit and $h$ its depth. Lines that satisfy this last for many hours, produce a kilometre-wide bow echo with a damaging wind at its crest, and are the source of most of the wind damage attributed to thunderstorms in the mid-latitudes.
:::

::: example Hail and the updraught {#ex-hail}
A hailstone grows by accreting supercooled water at $1\ \mathrm{g\,m^{-3}}$ with an efficiency of $0.6$ in an updraught of $25\ \mathrm{m\,s^{-1}}$. Find its equilibrium radius, taking the stone's density as $800\ \mathrm{kg\,m^{-3}}$ and the drag coefficient as $0.6$, and estimate the time taken to reach it.
::: solution
At equilibrium the stone is suspended, so its weight equals the drag:
$$
\frac{4}{3}\pi r^3\rho_i g = \frac{1}{2}C_D\rho_a\pi r^2 v^2 \Longrightarrow r = \frac{3C_D\rho_a v^2}{8\rho_i g} = \frac{3\times0.6\times1.2\times625}{8\times800\times9.81} = 0.022\ \mathrm{m}.
$$
A stone of $2.2\ \mathrm{cm}$ radius — a cricket ball — is suspended by a $25\ \mathrm{m\,s^{-1}}$ updraught, which is a strong but ordinary supercell. Its growth rate at that radius is
$$
\frac{\mathrm{d}r}{\mathrm{d}t} = \frac{E\,w_L\,v}{4\rho_i} = \frac{0.6\times1\times25}{4\times800} = 4.7\times10^{-3}\ \mathrm{m\,s^{-1}},
$$
so it reaches $2.2\ \mathrm{cm}$ in eighty minutes if it stays in the growth zone, which it does not: the circulation carries stones up and down through the storm several times, and the growth rings cut across a hailstone — the alternating clear and milky layers of a stone broken open — are the record of those passages, the clear layers formed in the wet regime where the accreted water runs and freezes slowly, the milky ones where it freezes in place around trapped air.

The largest hailstones require the strongest and steadiest updraughts: the record stone, $20\ \mathrm{cm}$ long and falling in Inner Mongolia in 2020, implies an updraught near $60\ \mathrm{m\,s^{-1}}$, among the strongest measured on Earth. Hail is a hazard of the continental interiors in the warm season — the belt from Alberta to Berlin, the Pampas, northern India's Brahmaputra valley in the pre-monsoon — because it needs both a strong updraught and a freezing level low enough for the stone to melt before it lands, and it is the most expensive per-event natural hazard in Europe and the Canadian prairies.
:::
:::

## The hurricane

::: proposition The hurricane as a Carnot engine {#prop-hurricane}
A tropical cyclone is a heat engine running between a warm ocean surface and a cold outflow at the tropopause, with the boundary layer as its working fluid and the eyewall as its chimney. Air spiralling inward in the boundary layer picks up enthalpy at a rate $C_k\rho V(k^*_\text{s}-k)$, where $k^*_\text{s}$ is the saturation entropy at the sea-surface temperature and $k$ the entropy of the inflowing air; the engine's efficiency is the Carnot value $\eta = (T_\text{s}-T_\text{o})/T_\text{s}$; and the work is dissipated at the surface at $C_D\rho V^3$. Equating gives the **potential intensity**
$$
V_\text{max} = \left[\eta\,\frac{C_k}{C_D}\,\left(k^*_\text{s}-k\right)\right]^{1/2},
$$
which for $C_k/C_D = 1.2$, an outflow at $200\ \mathrm{K}$ and a sea surface at $303\ \mathrm{K}$ gives $90$–$110\ \mathrm{m\,s^{-1}}$. The observed maximum sustained wind on Earth, $85\ \mathrm{m\,s^{-1}}$ at the peak of Patricia in 2015 and of several others, is close to this ceiling, which is why the theory is taken seriously. The practical consequences are the two conditions every forecaster checks: a sea surface above $26.5\ ^\circ\mathrm{C}$ through a layer $50\ \mathrm{m}$ deep, so that the storm's own upwelling does not cut off its fuel, and a deep layer of moist air in the middle troposphere, so that the downdraughts do not ventilate the core. Between them these two explain why tropical cyclones are confined to the summer and early-autumn oceans, why the western Pacific is twice as active as the Atlantic, and why none forms within five degrees of the equator, where $f$ is too small to organize the inflow.
:::

::: example Tornado alley, and why it is there {#ex-tornado-alley}
The United States reports about $1200$ tornadoes a year, roughly four times the total of the rest of the world combined, with a maximum in the spring over the Great Plains from Texas to Nebraska. Explain the geography quantitatively, using the ingredients of the previous proposition.
::: solution
A tornado needs four things at once, and the plains are the only place on Earth where all four are routinely present. The first is **moisture**: the Gulf of Mexico supplies air with a dew point of $18$–$22\ ^\circ\mathrm{C}$, which the dry continental interior to the west and north does not. The second is **instability**: the same interior supplies a capping lid of dry, elevated air at $700\ \mathrm{hPa}$ and surface heating that builds cape of $2000$–$4000\ \mathrm{J\,kg^{-1}}$ by afternoon. The third is **shear**: the jet stream at $10\ \mathrm{km}$ lies directly over the surface baroclinic zone created where the moist Gulf air meets the dry, and gives $25\ \mathrm{m\,s^{-1}}$ of deep-layer shear with strong directional turning. The fourth is a **trigger**: the dryline, the frontal boundary, or the elevated mixed layer's erosion.

The dryline is the specific gift of the Rockies. Air descending $2\ \mathrm{km}$ from the mountains warms dry-adiabatically by $10\ \mathrm{K}$ and its dew point falls by $2\ \mathrm{K}$ per kilometre of descent, so a $2\ \mathrm{km}$ descent gives air $20\ \mathrm{K}$ warmer and $4\ \mathrm{K}$ drier than the air at the same height over the plains — a virtual-wall boundary with a horizontal temperature contrast of $5\ \mathrm{K}$ across a few kilometres, along which the moist air is forced upward. No other continent has a north–south mountain range of that height with a warm ocean on its eastern side and a cold one on its western, which is why Europe gets thirty tornadoes a year instead of twelve hundred, why Bangladesh gets the deadliest ones rather than the most, and why the observed shift of the tornado-climate maximum eastward into Tennessee and Mississippi since 1950 is a shift of the low-level jet and of the moisture, not of the cape.
:::
:::

::: widget plot
f: sqrt(e*8000*(x-26.5))
x: 26.5, 32
y: 0, 120
sliders: e=0.36:0.15:0.6
labels: wind speed (m/s)
caption: The theoretical maximum sustained wind against sea-surface temperature, from the Carnot expression above, with the product of efficiency and entropy deficit set by the slider. The curve is zero below $26.5\ ^\circ\mathrm{C}$, rises as the square root of the temperature anomaly, and reaches $100\ \mathrm{m\,s^{-1}}$ at $30\ ^\circ\mathrm{C}$ — which is why the strongest storms on Earth are found over the pools of the western Pacific and the Gulf of Mexico in late summer, why the Atlantic's contribution to the total global number has not risen while the proportion of major hurricanes has, and why the poleward expansion of the region with more than $20\ \mathrm{m\,s^{-1}}$ of potential intensity is one of the more robust model projections for a warming world. The observed record is $85\ \mathrm{m\,s^{-1}}$, and no storm has ever come close to the theoretical ceiling, which is the theory's honest limitation: real storms are limited by shear, by their own upwelling, and by the time available.
:::

::: svg
caption: The structure of a mature tropical cyclone in vertical section. Air flows inward in the boundary layer, gains enthalpy over the warm sea, and rises in the eyewall, where the release of latent heat drives the wind; at the tropopause it flows outward, and a small fraction of it subsides in the eye, warming adiabatically and producing the cloud-free, light-wind, sometimes hot core that gives the storm its name. The strongest winds are in the eyewall at the radius of maximum wind, tens of kilometres from the centre; the rainbands spiral outward and produce tornadoes, flooding rain and the outer surge. The storm's total heat release is of order 10^15 W, and only a few per cent of it becomes wind.
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hurricane structure in section">
  <style>
    .ax { stroke: var(--ink-2); stroke-width: 1.2; fill: none; }
    .sea { fill: var(--info-wash); }
    .flow { stroke: var(--series-1); stroke-width: 1.8; fill: none; }
    .wall { fill: var(--series-3); opacity: 0.28; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
  </style>
  <rect class="sea" x="40" y="270" width="680" height="40"/>
  <path class="wall" d="M300,270 C300,180 320,110 360,70 L400,70 C440,110 460,180 460,270 Z"/>
  <path class="wall" d="M150,270 C170,220 200,200 230,210 C250,216 260,240 262,270 Z" opacity="0.6"/>
  <path class="wall" d="M500,270 C505,240 520,215 545,210 C575,205 600,225 615,270 Z" opacity="0.6"/>
  <line class="ax" x1="40" y1="270" x2="720" y2="270"/>
  <path class="flow" d="M90,258 C180,252 250,248 300,240 C320,200 330,140 350,90"/>
  <path class="flow" d="M670,258 C580,252 510,248 460,240 C440,200 430,140 410,90"/>
  <path class="flow" d="M350,90 C300,70 220,64 130,72"/>
  <path class="flow" d="M410,90 C460,70 540,64 630,72"/>
  <path class="flow" d="M380,80 L380,250" stroke-dasharray="5 4"/>
  <text class="sub" x="390" y="180">subsidence: the warm, calm eye</text>
  <text class="lab" x="470" y="120">eyewall: the strongest wind</text>
  <text class="sub" x="120" y="60">the outflow layer at the tropopause</text>
  <text class="sub" x="90" y="248">inflow, gaining heat and moisture</text>
  <text class="sub" x="150" y="300">rainband</text><text class="sub" x="560" y="300">rainband</text>
  <text class="sub" x="40" y="322">radius of maximum wind 30-60 km; outer bands 100-300 km; diameter of the storm 200-1000 km</text>
</svg>
:::

::: example The surge, and the water {#ex-surge}
A category 3 hurricane with a central pressure of $946\ \mathrm{hPa}$ and a maximum wind of $55\ \mathrm{m\,s^{-1}}$ approaches a coast whose shelf is $40\ \mathrm{km}$ wide and $30\ \mathrm{m}$ deep. Estimate the surge, and explain why the water, not the wind, is what kills.
::: solution
The **inverse barometer** response lifts the sea by $1\ \mathrm{cm}$ per hectopascal of pressure deficit: $(1013-946)\times0.01 = 0.67\ \mathrm{m}$. The wind stress piles water up against the coast; and the wind stress must be carried by the water column. On a shelf of depth $D$ the depth-limited balance $\rho_w g D\,\partial\eta/\partial x = \tau$ gives
$$
\eta = \frac{\rho_a C_D V^2 L}{\rho_w g D} = \frac{1.2\times1.5\times10^{-3}\times3025\times4\times10^4}{1025\times9.81\times30} = 0.72\ \mathrm{m},
$$
with $L = 40\ \mathrm{km}$ the shelf width. That is the frictional setup alone; the true surge also contains the pile-up at the shelf break, where the same stress acts on a deeper and faster-moving layer, the along-shelf funneling of the water by the coast's shape, the wave setup of half a metre or more in breaking seas, and the tide. Observed totals for a storm of this size are $3$–$4\ \mathrm{m}$ above normal — and where the coast is low and the shelf wide, as in the Bengal delta, the Gulf of Cochin, the Dutch coast of 1953 and the Louisiana of 2005, five to eight metres.

Of the 11,500 deaths from United States landfalling tropical cyclones between 1963 and 2012, half were from freshwater inland flooding and a further quarter from storm surge; of the ten deadliest cyclones in recorded history, all without exception — Bhola 1970 with $300{,}000$–$500{,}000$ dead, the Galveston of 1900 with $6000$–$12{,}000$, Nargis 2008 with $138{,}000$, Mitch 1998 with $11{,}000$ in the Honduras and Nicaragua highlands — the killer was water. The wind destroys property and the water destroys people, and the reason the ratio has improved in rich countries and not in poor ones is not forecasting skill but concrete.
:::
:::

::: warning Three things the pictures get wrong
**The eye is not safe.** It is calm and sunny, and it is the most dangerous place to be: the eyewall wind returns from the other side within minutes, often stronger than before, and the surge arrives with it. **A tornado is not a small hurricane.** It has no thermal engine of its own, draws its rotation from the parent storm's shear, and its wind is measured not by anemometer but by the damage it does; the Enhanced Fujita scale's top category, $>90\ \mathrm{m\,s^{-1}}$, is an estimate from the failure of reinforced concrete, and the "speed-up" of the wind around a building that concentrates damage is not the same as the wind in the open. And **the hurricane's forecast track is far better than its intensity forecast**: the average five-day track error in the Atlantic is now under $200\ \mathrm{km}$, comparable to the one-day error of 1990, while the intensity error has barely improved in twenty years, because the physics that decides whether a storm becomes a category 4 — the eyewall's replacement cycles, the dust and dry air it ingests, the cold wake it leaves behind — happens on scales of a few hundred metres that no operational model resolves.
:::

::: quiz
A supercell differs from an ordinary multicell thunderstorm mainly because:
- [ ] It has more cape
- [x] Its updraught rotates, because environmental shear supplies horizontal vorticity that the updraught tilts upward
- [ ] It forms over water
- [ ] It has a stronger cold pool
::: solution
Strong deep-layer shear tilts the updraught and, more importantly, supplies horizontal vorticity $\omega = -\partial u/\partial z$ which the rising motion tilts into the vertical, producing a rotating updraught — the mesocyclone. The rotation lets the updraught and the downdraught coexist for hours instead of minutes, which is why supercells produce most large hail, most significant tornadoes and a disproportionate share of the wind damage.
:::
:::

::: history
Benjamin Franklin inferred the circulation of a nor'easter in 1743 from the fact that a storm that brought snow to Boston left the fields of New York clear and the wind in Boston from the south-west, and concluded that the storm travelled north-eastward faster than the wind — the first correct statement of a mid-latitude cyclone's motion. The electricity of storms was made quantitative by the kite-and-sentinel experiments of 1752, and the physics of the discharge by Étienne Loomis's estimates of the flash's velocity and energy in the 1850s. The tornado was a medical and theological problem until the American Midwest began photographing it: the first reliable photographs are of 1884, and the classification that made the subject statistical is Tetsuya Theodore Fujita's of 1971, a scale of damage rather than wind, revised in 2007 as the Enhanced Fujita scale after engineers showed that the original wind assignments were too high at the top end. Fujita also identified the **downburst** and **microburst** in 1976 and, with Ted Fujita's student-led JAWS project in 1982–85, proved that a string of airliner crashes including Eastern 66 at Kennedy in 1975 had been caused by a microburst's wind shear; the Doppler radar network and the on-board windshear warning system that followed have prevented the death of a single scheduled airliner passenger from a microburst since 1985. The theory of the hurricane began with the hand calculations of Keith Davidson Miller in 1958 and the thermodynamic theory of Kerry Emanuel from 1986, and its observational history is one of aircraft: the Hurricane Hunters have flown into the eyewall since 1943, when a B-17 crew first reported the eye from inside a storm off Florida, and the dropsonde, the stepped-frequency microwave radiometer and the Hurricane Hunter's tail Doppler radar are what make the intensity forecast as good as it is — which is not good enough.
:::

## Where this leads

The cape and the shear that feed these storms are computed in [[meteorology/stability]]; the microphysics of hail and electrification is in [[meteorology/clouds-precipitation]] and [[atmospheric-dynamics/cloud-physics]]; the steering flow and the shear are in [[meteorology/winds]] and [[atmospheric-dynamics/general-circulation]]; the surge and the waves that ride it are treated in [[oceanography/waves-tides]]; the hazard, the warning and the evacuation are in [[natural-hazards/storms]] and [[natural-hazards/risk-reduction]]; and the question of whether the storms are getting worse is in [[climate-change/extremes]].

::: summary Key takeaways
- A thunderstorm is a three-stage engine lasting under an hour: updraught, then updraught and downdraught, then downdraught, and its own cold pool both kills it and propagates it.
- Charge separation on colliding ice and graupel between -10 and -20 C builds a dipole; the breakdown field is reached by mechanisms still debated.
- Shear organises: none gives a half-hour storm, moderate shear a long-lived multicell or line, and strong shear with helicity a rotating supercell, which is where the large hail and the strong tornadoes are.
- Hail size is set by the updraught: a 25 m/s updraught suspends a cricket ball, and the growth rings record the stone's passages through the storm.
- A hurricane is a Carnot engine between the sea and the tropopause with a theoretical ceiling near 100 m/s, needing 26.5 C through 50 m of ocean and a moist mid-troposphere.
- Half of tropical-cyclone deaths in the modern record are from inland freshwater and a quarter from surge; the wind is the least lethal part of a hurricane.
- Track forecasts have improved by a day per decade; intensity forecasts have not.
:::

## Exercises

::: exercise Distance to a storm {level=1 check="1.7"}
You count five seconds between a flash and its thunder. How far away, in km, is the lightning?
::: solution
$5\times343 = 1.7\ \mathrm{km}$. The rule of three seconds per kilometre is accurate to five per cent at sea level and $20\ ^\circ\mathrm{C}$.
:::
:::

::: exercise Updraught from cape {level=1 check="40"}
Find the uncompensated updraught speed for a cape of $800\ \mathrm{J\,kg^{-1}}$, in $\mathrm{m\,s^{-1}}$.
::: solution
$w = \sqrt{2\times800} = 40\ \mathrm{m\,s^{-1}}$, and about $25\ \mathrm{m\,s^{-1}}$ after entrainment and pressure drag.
:::
:::

::: exercise Cold pool {level=1 check="12.8"}
A cold pool is $5\ \mathrm{K}$ colder than the environment at $300\ \mathrm{K}$ and $2\ \mathrm{km}$ deep. Estimate its density-current speed, in $\mathrm{m\,s^{-1}}$, using $c \approx \sqrt{g'h/2}$ with $g' = g\Delta\theta/\theta$.
::: solution
$g' = 9.81\times5/300 = 0.163\ \mathrm{m\,s^{-2}}$, so
$$
c = \sqrt{\tfrac12 g'h} = \sqrt{\tfrac12\times0.163\times2000} = 12.8\ \mathrm{m\,s^{-1}}.
$$
This is the speed at which a gust front advances and, roughly, the speed at which a squall line moves: observed values are $10$–$25\ \mathrm{m\,s^{-1}}$, and the difference between the line's speed and the mean steering flow is the signature of how much of its motion is its own density current.
:::
:::

::: exercise Sea surface and intensity {level=1 check="66"}
Using the widget's curve with $e = 0.36$, find the potential intensity for a sea surface of $28\ ^\circ\mathrm{C}$, in $\mathrm{m\,s^{-1}}$.
::: solution
$V = \sqrt{0.36\times8000\times1.5} = 66\ \mathrm{m\,s^{-1}}$, a category 3–4 hurricane. At $27\ ^\circ\mathrm{C}$ the same formula gives $38\ \mathrm{m\,s^{-1}}$, a tropical storm, which is the sensitivity that makes a half-degree of ocean temperature a matter of categories.
:::
:::

::: exercise Inverse barometer {level=1 check="0.7"}
Find the sea-surface rise, in metres, from the inverse barometer effect alone for a cyclone with a central pressure of $943\ \mathrm{hPa}$.
::: solution
$(1013-943)\times0.01 = 0.70\ \mathrm{m}$. This is the smallest and most reliable part of the surge; the wind-driven component is typically three to five times larger.
:::
:::

::: exercise Hail {level=2 check="3.1"}
Find the radius, in cm, of a hailstone suspended by a $30\ \mathrm{m\,s^{-1}}$ updraught, with the constants of the worked example.
::: solution
$r = 3C_D\rho_a v^2/(8\rho_i g) = 3\times0.6\times1.2\times900/(8\times800\times9.81) = 1944/62{,}784 = 31\ \mathrm{mm}$, that is $3.1\ \mathrm{cm}$. Doubling the updraught to $60\ \mathrm{m\,s^{-1}}$ quadruples the radius to $12\ \mathrm{cm}$, which is the arithmetic behind the record stones and behind the fact that the largest hail has only ever fallen from the most violent storms.
:::
:::

::: exercise Helicity {level=2 check="180"}
The wind is $10\ \mathrm{m\,s^{-1}}$ from $200^\circ$ at $1\ \mathrm{km}$ and $25\ \mathrm{m\,s^{-1}}$ from $250^\circ$ at $3\ \mathrm{km}$, and the storm moves with the mean flow. Estimate the storm-relative helicity over that layer, in $\mathrm{m^2\,s^{-2}}$.
::: solution
The storm-relative inflow changes by roughly $\Delta\mathbf{v}\times$ the mean storm-relative speed: with a $16\ \mathrm{m\,s^{-1}}$ change in the vector and a mean storm-relative speed of $12\ \mathrm{m\,s^{-1}}$ over $2\ \mathrm{km}$, $\text{SRH} \approx 12\times16\times\sin(\text{turning}) \approx 180\ \mathrm{m^2\,s^{-2}}$, above the $150$ threshold used operationally for supercells and near the $250$ threshold for tornadic ones.
:::
:::

::: exercise The storm's power {level=3}
A hurricane's eyewall has a radius of $35\ \mathrm{km}$, a depth of $12\ \mathrm{km}$, and an average radial inflow of $25\ \mathrm{m\,s^{-1}}$ in the lowest $2\ \mathrm{km}$ carrying air with an enthalpy deficit of $25\ \mathrm{kJ\,kg^{-1}}$. Estimate the rate of heat input and the mechanical power dissipated at the surface within the radius of maximum wind, taking $C_D = 1.5\times10^{-3}$ and $V = 70\ \mathrm{m\,s^{-1}}$.
::: solution
The inflow of mass through the eyewall's cylindrical surface is $2\pi r h \rho V = 2\pi\times3.5\times10^4\times2000\times1.2\times25 = 1.3\times10^{10}\ \mathrm{kg\,s^{-1}}$, and with $25\ \mathrm{kJ\,kg^{-1}}$ the heat input is $3.3\times10^{14}\ \mathrm{W}$. The dissipation over the disc of radius $35\ \mathrm{km}$ is
$$
C_D\rho V^3\times\pi r^2 = 1.5\times10^{-3}\times1.2\times343{,}000\times3.8\times10^9 = 2.4\times10^{12}\ \mathrm{W}.
$$
The ratio is $0.7\%$, and the Carnot efficiency of the engine is $30$–$40\%$, so most of the work is dissipated outside the eyewall and in the outer bands, and the storm's total heat release — including the rainbands and the anvil, and computed from the condensation rate rather than the inflow — is of order $5\times10^{14}\ \mathrm{W}$, two hundred times the world's electricity generation. The engine is inefficient and enormous, which is the whole reason a hurricane can persist for a week over water and no thunderstorm can persist for an hour over land.
:::
:::

::: exercise Tornado winds and damage {level=3}
The Enhanced Fujita scale assigns EF3 to winds of $61$–$70\ \mathrm{m\,s^{-1}}$ and EF5 to more than $90\ \mathrm{m\,s^{-1}}$. Find the ratio of the dynamic pressure at $90\ \mathrm{m\,s^{-1}}$ to that at $65\ \mathrm{m\,s^{-1}}$, and explain why the scale is a scale of damage and not of wind, and why the pressure differences involved are smaller than you might expect.
::: solution
The dynamic pressure is $\tfrac12\rho V^2$, so the ratio is $(90/65)^2 = 1.9$. A category EF5 wind carries twice the dynamic pressure of an EF3, and the observed damage — houses swept from their foundations, a car driven into a concrete wall — is roughly what a doubling of an already overwhelming load implies.

The pressure difference is nonetheless modest: $\tfrac12\times1.2\times90^2 = 4.9\ \mathrm{kPa}$, five per cent of atmospheric pressure, and less than the $7\ \mathrm{kPa}$ of suction that a strong tornado produces at its core. A house does not "explode" from the pressure drop, as is often said; it fails because $5\ \mathrm{kPa}$ over a roof of $100\ \mathrm{m^2}$ is fifty tonnes of uplift, because the wind loads are applied in directions the structure was never designed for, and because once the roof or a window fails, the internal pressure rises and the loads roughly double. This is why the whole of tornado mitigation reduces to two measures: strapping the roof to the walls and keeping the wind out of the building, and why the safest place is not the bathtub of an interior room on the ground floor of a well-built house but a purpose-built shelter with an independent foundation.
:::
:::
