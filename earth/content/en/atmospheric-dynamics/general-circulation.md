Satellite movies of the Earth resolve the atmosphere into a small number of structures that never move far: a bright band of cloud near the equator that breathes north and south with the seasons, comma-shaped storms that march west to east across the middle latitudes, and a whiter cap around each pole. Between them lie clear desert belts near $30^{\circ}$ where almost it never rains — the belts on which the Sahara, the Sonoran, the Outback and the Kalahari sit. The three-band appearance is the visible signature of the general circulation: the Hadley, Ferrel and polar cells, the jet streams, and the storm tracks, and understanding why the atmosphere organises itself this way — and why the deserts are at $30^{\circ}$ and not at the equator — is the capstone of synoptic dynamics.

## Why three cells, and what each one carries

::: definition The overturning cells {#def-cells}
Radiative balance heats the tropics more than the poles by tens of watts per square metre, and a stationary atmosphere could not carry the resulting heat poleward by eddies alone without violating its own stability. The meridional circulation closes the loop: the **Hadley cell** rises in the deep tropics, diverges aloft toward the poles, descends near $25$–$30^{\circ}$ and returns as the trade-wind easterlies — a direct thermal circulation roughly $10\ \mathrm{km}$ deep, $3000\ \mathrm{km}$ wide, carrying the bulk of the tropical angular momentum and setting the subtropical deserts under its dry subsidence. The **polar cell** is its shallow, weak cousin, rising near $60^{\circ}$ and sinking over the ice. Between them lies the **Ferrel cell**, which is not a heat engine at all but a **counter-cell driven by the eddies**: the mid-latitude storms, moving poleward heat and equatorward angular momentum, force a residual circulation that rises in $60^{\circ}$-latitude and sinks in $30^{\circ}$-latitude — an indirect circulation, like a refrigerator bolted to the side of the engine that powers it. The observed heat transport of the middle latitudes, $\sim 5\ \mathrm{PW}$ across $35\ ^\circ\mathrm{N}$ (atmosphere plus ocean), is carried mainly by the eddies, not by the Ferrel cell itself; the cell is the exhaust plume, not the engine.
:::

::: proposition Angular momentum and the subtropical jet {#prop-mj}
The angular momentum per unit mass about the Earth's axis is $M = (\Omega a\cos\phi + u)\,a\cos\phi$. Air that leaves the equatorial boundary layer, where $u \approx 0$, and moves poleward aloft in the Hadley cell conserves $M$ to first order, so at latitude $\phi$ it carries
$$
u(\phi) = \Omega a\,\frac{\sin^{2}\phi}{\cos\phi} = 465\,\frac{\sin^{2}\phi}{\cos\phi}\ \ \mathrm{m\,s^{-1}},
$$
reaching $58\ \mathrm{m\,s^{-1}}$ at $20^{\circ}$, $134\ \mathrm{m\,s^{-1}}$ at $30^{\circ}$, and $251\ \mathrm{m\,s^{-1}}$ at $40^{\circ}$. The observed subtropical jet is $30$–$50\ \mathrm{m\,s^{-1}}$ — a factor of three less than the conservation law allows. The difference is the **eddy torque**: mid-latitude Rossby waves radiating energy and momentum out of the storm tracks deposit a westward force that removes roughly a fifth of the angular momentum a parcel would otherwise hold by $30^{\circ}$, and it is this removal, not the conservation, that sets the real wind. The subtropical jet is thus a balance between Hadley-cell angular-momentum supply and eddy drain, and the **polar-front jet** is its thermal-wind twin, sitting over the surface polar front where the cross-front temperature contrast of the previous lesson drives $7$–$8\ \mathrm{m\,s^{-1}}$ of shear per kilometre through the troposphere.
:::

::: example How much angular momentum do the eddies steal? {#ex-mj}
Air reaches $30\ ^\circ\mathrm{N}$ aloft with the observed zonal wind $u = 40\ \mathrm{m\,s^{-1}}$. Compare its angular momentum with the value it would have if $M$ had been conserved from rest at the equator, and interpret the difference.
::: solution
With $a = 6.37\times10^{6}\ \mathrm{m}$ and $\Omega a = 465\ \mathrm{m\,s^{-1}}$, the equatorial value is $M_0 = \Omega a\cdot a = 2.96\times10^{9}\ \mathrm{m^{2}\,s^{-1}}$, while the arriving air has
$$
M = \Omega a^{2}\cos^{2}30^{\circ} + u\,a\cos30^{\circ} = 2.22\times10^{9} + 0.22\times10^{9} = 2.44\times10^{9}\ \mathrm{m^{2}\,s^{-1}} ,
$$
or $82$ per cent of $M_0$. The missing $18$ per cent was removed by the westward momentum flux of breaking Rossby waves — the same eddy stirring that makes the storm tracks. The number explains the observed structure of the upper-tropospheric charts: the subtropical jet sits **equward of** the Hadley-cell edge, where the residual angular-momentum flux vanishes, and the westerlies weaken toward the pole because the eddies keep taking the momentum back out.
:::
:::

::: widget plot
f: 465*sin(x*pi/180)*sin(x*pi/180)/cos(x*pi/180)
x: 0, 35
y: 0, 150
hlines: 45
caption: The zonal wind that **angular-momentum conservation** would produce for air leaving the equator at rest: $u = \Omega a\,\sin^{2}\phi/\cos\phi$ rises steeply and would reach hurricane speeds by $30^{\circ}$ (the horizontal line marks the observed subtropical-jet speed of $\sim 45\ \mathrm{m\,s^{-1}}$). The gap between curve and line is the integrated **eddy torque** — the momentum that Rossby waves carry back out of the flow. The divergence between the two curves with latitude is the quantitative statement that the mid-latitude atmosphere is not a Hadley circulation with eddies added, but an eddy-dominated system with a Hadley cell bolted on at the equator.
:::

## The atmosphere as a heat engine

::: definition The Lorenz energy cycle {#def-energy-cycle}
The general circulation is a heat engine of very low efficiency. Radiative heating aloft in the tropics and cooling at the surface in the cold regions maintain a reservoir of **available potential energy** — the part of the potential energy that can be released by rearranging the mass field — with a global inventory of $\sim 1.5\times10^{5}\ \mathrm{J\,m^{-2}}$, of which the large-scale temperature contrast holds only a few per cent of the total potential energy. The engine converts this at $\sim 1.5\ \mathrm{W\,m^{-2}}$ into eddy kinetic energy, which cascades and is dissipated by friction at $\sim 2\ \mathrm{W\,m^{-2}}$; the mean-flow kinetic energy is fed by the same conversion and drained by the same friction. The Carnot limit between the surface ($300\ \mathrm{K}$) and the radiating level ($250\ \mathrm{K}$) is $17$ per cent; the real atmosphere runs at well under one per cent of the absorbed sunlight, which makes it one of the most inefficient engines ever studied — and the reason its behaviour is set by the **statistics** of many small conversions (storms) rather than by one grand design. The **adjustment time** of the reservoir, $A/C \approx 1.5\times10^{5}/1.5 \approx 10^{5}\ \mathrm{s} \approx 1.2\ \mathrm{days}$, is the atmosphere's own clock: available potential energy is created and destroyed in a day and a half, which is why the storm-track eddies live for a week at most and why the general circulation must be **continuously refuelled** by the sun.
:::

::: example The engine's books {#ex-engine}
The atmosphere dissipates $2.2\ \mathrm{W\,m^{-2}}$ of kinetic energy by friction and converts available potential energy to kinetic at $1.6\ \mathrm{W\,m^{-2}}$, while the surface absorbs $240\ \mathrm{W\,m^{-2}}$ of sunlight and $160\ \mathrm{W\,m^{-2}}$ passes through the hydrological cycle as latent heat. Find the engine's efficiency against the absorbed light and against the latent-heat throughput, and the fraction of the Carnot limit it achieves.
::: solution
The gross mechanical power is the dissipation, $2.2\ \mathrm{W\,m^{-2}}$: efficiency $= 2.2/240 = 0.9$ per cent against absorbed sunlight, and $2.2/160 = 1.4$ per cent against the latent-heat throughput that is the engine's actual working fluid. The Carnot limit between $300$ and $250\ \mathrm{K}$ is $17$ per cent, so the atmosphere achieves about $5$ per cent of the ideal. The comparison explains two facts at once: why weather prediction is a problem of statistics rather than of energy — the engine's power is tiny and wildly intermittent — and why the hydrological cycle, not the wind, is the atmosphere's dominant energy pipeline: $160$ of $400\ \mathrm{W\,m^{-2}}$ of surface energy leaves the ground as latent heat, and every millimetre of rain is the exhaust of $2.45\ \mathrm{MJ}$ of engine work.
:::
:::

::: example The mass flux of the Hadley cell {#ex-hadley-mass}
The trade-wind inflow of the Hadley cell returns equatorward in a boundary layer $1.5\ \mathrm{km}$ deep with a mean speed of $8\ \mathrm{m\,s^{-1}}$ across the latitude circle at $15\ ^\circ\mathrm{N}$ ($\rho = 1.0\ \mathrm{kg\,m^{-3}}$). Estimate the mass flux of the cell and compare it with the Amazon.
::: solution
$$
\Psi = \rho\, u\, H\, 2\pi a\cos\phi = 1.0\times8\times1500\times2\pi\times6.37\times10^{6}\times0.97 \approx 5\times10^{11}\ \mathrm{kg\,s^{-1}} ,
$$
tens to hundreds of millions of cubic metres per second — of the same order as the observed maximum of the cell's mass streamfunction, $10^{10}$–$10^{11}\ \mathrm{kg\,s^{-1}}$ in reanalyses once the compensating outflow aloft is accounted for. For scale, the Amazon, the largest river on Earth, carries $6\times10^{4}\ \mathrm{m^{3}\,s^{-1}}$: the returning limb of the Hadley cell moves nearly ten thousand times the Amazon's mass, every second, and it is this circulation — not any local wind — that sets the rainfall of the ITCZ, the trades' dust transatlantic crossings, and the upwelling that feeds the fisheries of the eastern tropical oceans. The estimate also shows why the cell is the atmosphere's single largest coherent motion: no storm track eddy carries more than a few per cent of this flux.
:::
:::

## Annular modes, seasons, and the breathing planet

::: definition Annular modes and the seasonal circulation {#def-annular}
The dominant pattern of extratropical variability is not a place but a **seesaw of pressure between the pole and the mid-latitudes**: the North Atlantic Oscillation (NAO), the Arctic Oscillation (AO) and their southern cousin, the Southern Annular Mode (SAM), are phases of a single structure — the **annular mode** — in which a stronger polar vortex and tighter circum-polar jet (positive phase) shut the mid-latitudes off from Arctic air, while a weak, displaced vortex (negative phase) lets cold air and storm tracks spill equatorward. The annular mode is the natural free oscillation of a baroclinically unstable zonal flow: the eddies that the jet generates feed back on the jet, and the coupled system rings at periods of weeks to seasons. Superposed on this internal music is the seasonal cycle: the Hadley cell and the ITCZ migrate $10$–$20^{\circ}$ of latitude with the thermal equator, the Asian monsoon is a continental-scale sea breeze driven by the summer land-seast temperature contrast and the Himalaya's blocking of the flow, and the jets shift and weaken in each hemisphere's summer. The observed poleward widening and strengthening of the Hadley circulation and the poleward shift of the storm tracks over the last four decades — the latter by roughly one degree of latitude per decade in the Southern Hemisphere — are among the most robust circulation changes of the anthropogenic warming of the ocean and land, and they are the mechanism behind the observed drying of subtropical Australia, the Mediterranean and the western United States.
:::

::: example The atmosphere tugs on the Earth {#ex-lod}
Seasonal exchange of angular momentum between the atmosphere and the solid Earth changes the atmospheric angular momentum by $\Delta\mathrm{AAM} = 3\times10^{25}\ \mathrm{kg\,m^{2}\,s^{-1}}$ between summer and winter. With the solid Earth's angular momentum $I\Omega = 5.8\times10^{33}\ \mathrm{kg\,m^{2}\,s^{-1}}$ and a day of $86{,}400\ \mathrm{s}$, find the resulting seasonal change in the length of day.
::: solution
Conservation of total angular momentum gives
$$
\frac{\Delta\mathrm{LOD}}{\mathrm{LOD}} = \frac{\Delta\mathrm{AAM}}{I\Omega} \;\Longrightarrow\; \Delta\mathrm{LOD} = 86{,}400\times\frac{3\times10^{25}}{5.8\times10^{33}} = 4.5\times10^{-4}\ \mathrm{s} = 0.45\ \mathrm{ms}.
$$
The atmosphere, a shell of gas less than one per cent of the Earth's mass, measurably speeds up and slows down the rotation of the entire planet by half a millisecond every season — and on shorter timescales, great earthquakes and the wind stress of the Southern Ocean produce changes of the same order that atomic clocks now record daily. The same angular-momentum bookkeeping underlies the **atmospheric angular momentum (AAM)** index, which leads the monsoon onset by weeks and is used operationally in seasonal forecasting.
:::
:::

::: warning The Ferrel cell is not an engine, the ITCZ is not at the equator, and the ozone hole is not a hole
Five confusions. **The Ferrel cell does no transport of merit**: it is a statistically-defined residual, driven by the eddies, and attributing the heat transport to it is like crediting the exhaust pipe for the engine's work. **The ITCZ is a belt, not a line, and it is never exactly on the equator**: it sits $5$–$10^{\circ}$N over the Atlantic in northern summer and crosses to the southern hemisphere in the south Pacific — its mean position is set by the cross-equatorial energy transport, and climate models that misplace it by a few degrees misplace every monsoon in their forecast. **The jet streams are not rivers of air racing around the world**: they are meandering, sometimes double, sometimes broken, and their "position" is a monthly-mean construct — individual flights exploit their filaments, not their charts. **The polar vortex is not the Arctic**: it is the stratospheric circulation that forms each polar night, and when it warms and breaks down in a **sudden stratospheric warming**, the surface weather a week later turns cold in mid-latitudes — the clearest example of the top-down coupling that the annular-mode language describes. **And the ozone hole is a chemical thinning over Antarctica in spring, not a puncture, and it is not the cause of global warming** — though the two problems are linked through the same gases and the same stratospheric circulation.
:::

::: history
**George Hadley** proposed the single tropical cell in 1735 to explain the trade winds; **William Ferrel** supplied the mid-latitude counter-cell in 1856, arguing correctly that the deflection of moving air, not a thermal direct circulation, explained the westerlies. **G. I. Taylor** showed in 1918 that the mid-latitude eddies transport heat poleward, and **V. W. Ekman** and the Bergen school quantified the eddy fluxes; **C.-G. Rossby**'s 1941 identification of the jet streams closed the kinematic picture. **E. N. Lorenz**'s 1955 thesis and 1967 paper defined the available potential energy and the energy cycle of this lesson — the same 1963 paper that founded chaos theory grew out of the same general-circulation programme. The angular-momentum budget was established observationally from upper-air networks through the 1930s–1950s, and the annular-mode synthesis of the NAO, AO and SAM came from the empirical-orthogonal-function analyses of **J. M. Wallace** and **D. S. Gutzler** in 1981 and of **D. W. J. Thompson** and **J. M. Wallace** in the late 1990s.
:::

The thermal wind that the jets embody is derived in [[atmospheric-dynamics/balanced-flow]], the Rossby waves and their momentum fluxes in [[atmospheric-dynamics/vorticity]], the boundary-layer friction that anchors the trades in [[atmospheric-dynamics/boundary-layer]], the Hadley-cell clouds and rain belts in [[atmospheric-dynamics/cloud-physics]] and [[meteorology/clouds-precipitation]], the cyclones of the storm tracks in [[meteorology/fronts-cyclones]], the monsoon in [[climate-system/variability]] and [[climate-change/observed-change]], the stratospheric vortex and its chemistry in [[atmospheric-chemistry/stratospheric-ozone]], and the oceanic overturning that shares the heat transport with the atmosphere in [[oceanography/overturning]].

::: quiz
The subtropical deserts of the world sit near $30^{\circ}$ latitude because
- [ ] the Coriolis force is too weak there for rain-bearing storms.
- [x] the Hadley circulation subsides there, and the subsiding air is dry and stable.
- [ ] the oceans are farthest from those latitudes.
- [ ] the jet streams block all clouds from them.
::: solution
Air that rose in the tropics loses its moisture as rain and spreads poleward aloft, descending near $25$–$30^{\circ}$: subsidence warms the air adiabatically, evaporates cloud, and caps the boundary layer with a strong inversion — the dry, clear, subsidence-capped atmosphere of the Sahara, the Sonoran and the Outback. The deserts are the Hadley cell's downdraft, which is also why their predicted poleward expansion is a cornerstone of subtropical drying projections.
:::
:::

::: summary
- The general circulation is three cells and two jet systems: a tropical Hadley engine that sets the rain belts and deserts, an eddy-driven Ferrel counter-cell, and a polar cell, with the subtropical and polar-front jets as their angular-momentum and thermal-wind expressions.
- Angular-momentum conservation from the equator would give $134\ \mathrm{m\,s^{-1}}$ at $30^{\circ}$; the observed $40\ \mathrm{m\,s^{-1}}$ measures the eddy torque that makes the mid-latitudes an eddy-dominated system.
- The atmosphere is a heat engine of under 1 per cent efficiency running on the latent-heat pipeline; its available potential energy turns over in about a day, setting the timescale of the storm tracks.
- Mid-latitude heat transport is carried by Rossby-wave eddies, not by the Ferrel cell; the cell is the exhaust, not the engine.
- The annular modes (NAO/AO/SAM) are the free ringing of the eddy-jet system; sudden stratospheric warmings couple the polar vortex downward to surface cold outbreaks.
- The circulation is warming and shifting: the Hadley cell is widening, the storm tracks are moving poleward by about a degree per decade in the south, and the subtropical drying follows the circulation, not the weather.
:::

## Exercises

::: exercise Angular-momentum wind {level=1 check="58"}
Using $u = \Omega a\,\sin^{2}\phi/\cos\phi$ with $\Omega a = 465\ \mathrm{m\,s^{-1}}$, find the wind at $20^{\circ}$ that conservation from rest at the equator would give. (Enter to the nearest $\mathrm{m\,s^{-1}}$.)
::: solution
$u = 465\times\sin^{2}20^{\circ}/\cos20^{\circ} = 465\times0.117/0.940 = 58\ \mathrm{m\,s^{-1}}$. Even at $20^{\circ}$ the conservation law overshoots the observed trade-side flow by an order of magnitude — the eddy drain is already at work in the subtropics.
:::
:::

::: exercise Engine efficiency {level=1 check="1"}
An atmosphere dissipating $2.4\ \mathrm{W\,m^{-2}}$ against $240\ \mathrm{W\,m^{-2}}$ of absorbed sunlight: find the efficiency in per cent. (Enter the number.)
::: solution
$\eta = 2.4/240 = 1$ per cent. The number is the reason the atmosphere's climate, not its power, is what matters: a one-per-cent engine running on a quarter of a kilowatt per square metre still moves a hundred times more water than every river on Earth.
:::
:::

::: exercise Adjustment time {level=1 check="1.2"}
With available potential energy $A = 1.5\times10^{5}\ \mathrm{J\,m^{-2}}$ and conversion rate $C = 1.4\ \mathrm{W\,m^{-2}}$, find the adjustment time $A/C$ in days. (Enter to one decimal.)
::: solution
$A/C = 1.5\times10^{5}/1.4 = 1.07\times10^{5}\ \mathrm{s} = 1.2\ \mathrm{days}$. The reservoir of storm fuel turns over in a little over a day — the physical reason the predictability of individual storms is days and of the circulation's seasonal state is months.
:::
:::

::: exercise Angular-momentum loss {level=2 check="82"}
Air at $30\ ^\circ\mathrm{N}$ with $u = 40\ \mathrm{m\,s^{-1}}$: compute $M/M_0$ in per cent, where $M_0$ is the value conserved from rest at the equator ($a = 6.37\times10^{6}\ \mathrm{m}$, $\Omega a = 465\ \mathrm{m\,s^{-1}}$). (Enter the percentage.)
::: solution
$M_0 = 2.96\times10^{9}\ \mathrm{m^{2}\,s^{-1}}$; $M = 2.96\times10^{9}\times0.75 + 40\times6.37\times10^{6}\times0.866 = 2.22\times10^{9} + 0.22\times10^{9} = 2.44\times10^{9}$, so $M/M_0 = 82$ per cent. The missing 18 per cent is the time-integrated westward eddy torque — the momentum that built the westerlies by being taken away.
:::
:::

::: exercise Length of day {level=2 check="0.45"}
If the atmospheric angular momentum decreases by $3\times10^{25}\ \mathrm{kg\,m^{2}\,s^{-1}}$ during a strong sudden stratospheric warming, find the change in the length of day in milliseconds ($I\Omega = 5.8\times10^{33}\ \mathrm{kg\,m^{2}\,s^{-1}}$). (Enter to two decimals.)
::: solution
When the polar vortex weakens, the westerlies aloft slow and the atmosphere gives angular momentum back to the planet: total conservation gives
$$
\Delta\mathrm{LOD} = -\,86{,}400\times\frac{3\times10^{25}}{5.8\times10^{33}} = -4.5\times10^{-4}\ \mathrm{s},
$$
a shortening of $0.45\ \mathrm{ms}$ — small, but routinely measured by atomic time, which keeps the books that the stratosphere writes.
:::
:::

::: exercise Heat transport {level=2 check="90"}
The atmosphere and ocean together transport $5\ \mathrm{PW}$ across $35\ ^\circ\mathrm{N}$, of which the atmosphere carries two thirds. If the atmospheric share were spread uniformly over the zonal band between $30^{\circ}$ and $40^{\circ}$ (area $2\pi a^{2}(\sin40^{\circ}-\sin30^{\circ})$), find the mean flux in $\mathrm{W\,m^{-2}}$. (Enter to the nearest integer.)
::: solution
Band area $= 2\pi\times(6.37\times10^{6})^{2}\times(0.643-0.500) = 3.7\times10^{13}\ \mathrm{m^{2}}$; atmospheric transport $= \tfrac{2}{3}\times5\times10^{15} = 3.3\times10^{15}\ \mathrm{W}$; mean flux $= 3.3\times10^{15}/3.7\times10^{13} = 90\ \mathrm{W\,m^{-2}}$. That is an order of magnitude more than the engine's dissipation, because the transport is the engine's **throughput**, not its work: the contrast between the $5\ \mathrm{PW}$ of heat crossing $35^{\circ}\mathrm{N}$ and the $2\ \mathrm{W\,m^{-2}}$ of frictional dissipation is the difference between what the engine moves and what it spends.
:::
:::

::: exercise Deriving the conservation-law wind {level=3 check="134"}
Derive $u(\phi) = \Omega a\,\sin^{2}\phi/\cos\phi$ from $M$ conservation for air starting at rest at the equator, and evaluate it at $30^{\circ}$ in $\mathrm{m\,s^{-1}}$. (Enter to the nearest integer.)
::: solution
$M = (\Omega a\cos\phi + u)a\cos\phi$ and $M_0 = \Omega a\cdot a$: setting equal and dividing by $a\cos\phi$, $\Omega a\cos\phi + u = \Omega a/\cos\phi$, so
$$
u = \Omega a\,\frac{1 - \cos^{2}\phi}{\cos\phi} = \Omega a\,\frac{\sin^{2}\phi}{\cos\phi} = 465\times\frac{0.25}{0.866} = 134\ \mathrm{m\,s^{-1}} .
$$
Three times the observed jet: the discrepancy is the integrated eddy torque, and the derivation is the cleanest demonstration that the mid-latitude atmosphere is dynamically dominated by its waves. The same formula, run in reverse, is why equatorial easterly jets on other planets (and the Earth's own equatorial stratosphere) require a different mechanism — there is no planetary angular momentum gradient to exploit where $\Omega a\to 0$ in the beta-plane sense.
:::
:::

::: exercise Carnot and the real engine {level=3 check="9"}
The atmosphere's engine works between a surface at $300\ \mathrm{K}$ and a radiating level at $250\ \mathrm{K}$, and dissipates $2.4\ \mathrm{W\,m^{-2}}$ against $160\ \mathrm{W\,m^{-2}}$ of latent-heat throughput. Find the fraction of the Carnot limit the engine achieves, in per cent. (Enter to the nearest integer.)
::: solution
Carnot: $\eta_C = (300-250)/300 = 16.7$ per cent; actual: $2.4/160 = 1.5$ per cent; ratio $= 1.5/16.7 = 9$ per cent of the ideal — within the usual textbook range of $5$–$10$ per cent depending on which flux is taken as the input. The deeper point is Lorenz's: the engine's efficiency is not what limits weather — its **intermittency** is. The conversion of available potential energy is concentrated in a few storms a month in each storm track, and the statistics of that intermittency, not the mean efficiency, are what climate change alters and what forecast models must get right.
:::
:::
