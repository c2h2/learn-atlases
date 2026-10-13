In 1841, the naturalist **Louis Agassiz** — not yet famous, already stubborn — had a hut of stone and mortar built on the Unteraar Glacier in the Bernese Alps, partly as a laboratory and partly to settle an argument. Within months the hut had split along its mortar lines; within two years its foundations had walked downstream far enough that the dispute was over: the ice moved, and moved as a body, faster in the middle and at the surface than at the margins and the bed, exactly as a viscous fluid would. Agassiz's hut is the founding experiment of glacier physics, and everything since has been the refinement of its lesson — that ice, a mineral harder than your knife at room temperature, flows like thick honey at glacier temperatures, and that the flow, not the melting, is what drains the ice ages into the sea. The quantitative law of that flow, measured in laboratories a century after the hut, is simple enough to write on a postcard and consequential enough to set the height of the Antarctic plateau, the speed of Jakobshavn, and the century-scale commitment locked inside every ice sheet on Earth.

## Ice as a material: Glen's flow law

::: proposition Glen's flow law {#prop-glen}
Glacier ice is a **non-Newtonian fluid** whose strain rate depends on stress by a power law. In the form used by every ice-sheet model since the 1960s (**Glen's flow law**, 1955),
$$
\dot{\epsilon} = A\,\tau^{n}, \qquad n \approx 3 ,
$$
relating the deviatoric strain rate $\dot\epsilon$ ($\mathrm{s^{-1}}$) to the deviatoric shear stress $\tau$ (Pa), with the flow parameter $A$ set by temperature through an Arrhenius factor — warm ice near the pressure-melting point flows roughly **ten times more easily** than ice at $-30\ ^\circ\mathrm{C}$, the single most important material fact in ice-sheet dynamics. The exponent $n = 3$ (measured in boreholes, in cores under test, and in the borehole-tilting records of Antarctic stations) makes ice **shear-thinning**: doubling the stress octuples the strain rate, so a small change in driving stress or temperature produces a large change in speed — the mathematical root of both the responsiveness of valley glaciers and the feared instability of ice streams. The law is a **creep** law, not a fracture law: in the top $30$–$50\ \mathrm{m}$ the ice is cold, unconfined and **brittle**, failing as crevasses rather than flowing, which is why the surface of a glacier is a broken raft floating on its own slow deformation, and why the strain-rate field of a glacier can be read from the pattern of its cracks.
:::

::: example How fast does ice deform? {#ex-strain}
Take $A = 2.4\times10^{-24}\ \mathrm{Pa^{-3}\,s^{-1}}$ and a driving shear stress of $100\ \mathrm{kPa}$ — typical of a valley glacier's upper half. Find the surface strain rate in $\mathrm{yr^{-1}}$, and the depth-averaged deformation velocity for $200\ \mathrm{m}$ of ice (for $n = 3$, the mean deformation speed is $2/(n+2) = 0.4$ times the surface speed).
::: solution
$$
\dot\epsilon = 2.4\times10^{-24}\times(10^{5})^{3} = 2.4\times10^{-9}\ \mathrm{s^{-1}} = 0.076\ \mathrm{yr^{-1}} .
$$
For a deformation profile with no sliding, the surface speed is $u_s = 2\dot\epsilon H/(n+1) = 0.5\times0.076\times200 = 7.6\ \mathrm{m\,yr^{-1}}$ and the depth-mean speed $2\dot\epsilon H/(n+2) = 6.1\ \mathrm{m\,yr^{-1}}$. Observed valley glaciers move tens of metres per year at the surface, so the excess over pure deformation — often half the total — is attributable to sliding (the next lesson). The exercise's real message is the **order of magnitude**: a stress of one-tenth of a megapascal — the weight of a modest ice column on a gentle slope — is enough to make "solid" rock flow at human-observable speed, given centuries.
:::
:::

## Driven by slope: the driving stress and the shape of ice sheets

::: definition The driving stress {#def-driving}
The engine of ice flow is gravity acting on the surface slope: the **driving stress**
$$
\tau_d = \rho\, g\, H \sin\alpha
$$
is the basal shear stress an ice column of thickness $H$ on slope $\alpha$ requires, and it is remarkably **uniform** — $50$–$150\ \mathrm{kPa}$ for virtually every glacier and ice sheet on Earth, because ice masses self-organise: where the slope (and so the stress) exceeds what the ice can carry, the ice thins by faster flow; where it falls short, the ice thickens and the slope is rebuilt. This "yield-stress" behaviour is why the great ice sheets are not cones but **shallow lenses** — slopes of $0.001$–$0.01$, thicknesses of kilometres — and why their steady shapes follow from Glen's law alone: the **flux-divergence (Vialov) profile** gives an ice-sheet surface rising as $\xi^{4/7}$ from the margin toward the divide (for $n = 3$), a blunt, flat-topped dome whose observed match to Antarctica and Greenland was, in the 1950s, the first proof that ice sheets are deformable bodies rather than rafted rafts on the bed. The corollary is the **shallow-ice approximation** that powers century-scale ice-sheet models: because slopes are tiny, vertical and horizontal stresses decouple, and the whole sheet can be advanced in time by balancing accumulation against the flux that $\tau_d$ drives — physics reduced, gloriously, to one stress law and bookkeeping.
:::

::: widget plot
f: 3000*(1-x)^0.57
x: 0, 1
y: 0, 3200
labels: h\ (\mathrm{m})
caption: The Vialov flux-divergence profile for $n = 3$ — surface height against distance from the divide, normalised — a blunt dome rising as $\xi^{4/7}$ from a zero-thickness margin. Real ice sheets are lumpy corrections to this shape (bed mountains, streaming outlets, marine beds), but the first-order match of the ideal profile to the observed profiles of Antarctica and Greenland is the founding success of theoretical glaciology: the shape of an ice sheet is Glen's law written in ice.
:::

## Where ice goes fast: deformation, sliding and the ice streams

::: definition The velocity budget {#def-velocity-budget}
A glacier's surface velocity is the sum of **internal deformation** (Glen's law integrated over the column, largest at the surface, zero at a frozen bed) and **basal sliding** (the whole column riding over its bed, discussed in [[glaciology/basal-sliding]]). The proportions define the glacier's character: cold-based Alpine glaciers are nearly pure deformation; temperate glaciers slide for a third to half of their speed; and the **ice streams** of Antarctica and Greenland — channels tens of kilometres wide, hundreds of metres thick, flowing $400$–$2000\ \mathrm{m\,yr^{-1}}$ ten to fifty times faster than the ice feeding them — are sliding-dominated to the point that their interiors deform little at all. Ice streams occupy **marine beds** of soft sediment, and their existence reorganised ice-sheet science: satellite velocity maps of the 1990s (the first InSAR-derived speed maps of the Antarctic drainage systems) revealed that 90 per cent of the Antarctic ice that reaches the sea does so through these few per cent of the coastline, channelled by warm-based, water-lubricated, sediment-veined corridors whose margins — the **shear margins**, metres of intense strain that raise kilometres-deep rifts and warm by the frictional heat they generate — are among the most spectacular strain features on the planet. The ice stream is the ice sheet's release valve: its speed is set by bed, water and shelf buttressing rather than by surface slope, and it is therefore the pathway along which ocean warming becomes ice-sheet mass loss without a single extra degree of air temperature at the surface.
:::

::: example Reading speed from cracks {#ex-crevasse}
A glacier's surface strain rate across the flow is measured from satellite image correlation as $\dot\epsilon_{xx} = 0.05\ \mathrm{yr^{-1}}$ in a stretching reach. Using Nye's crevasse-depth balance $d = 2\tau_t/(\rho_i g)$ with a crevasse tip at $30\ \mathrm{m}$, estimate the tensile stress $\tau_t$, and explain why a water-filled crevasse can run to the bed.
::: solution
Rearranging, $\tau_t = d\,\rho_i g/2 = 30\times917\times9.81/2 = 1.3\times10^{5}\ \mathrm{Pa} \approx 0.13\ \mathrm{MPa}$ — the order of ice's tensile strength, as the method requires. For the second part: a crevasse filled with water to depth $d_w$ adds a pressure $\rho_w g d_w$ at its tip, and since water is 12 per cent denser than ice, a **water-filled** crevasse propagates to a depth $12/9.17 \approx 1.3$ times deeper than a dry one of the same driving stress — and because surface meltwater is abundant on warming glaciers, crevasses now open to the bed on ice sheets that previously stayed dry, which is the mechanism of the **hydrofracture** that rips rifts through ice shelves (the 2002 Larsen B collapse began with exactly these water-filled rifts, mapped in visible and radar imagery).
:::
:::

## Shelves: ice afloat

::: definition Ice shelves and membrane stress {#def-shelf-stress}
Where a grounded ice sheet flows off a marine shelf into the sea, it floats, and the physics changes character: the driving slope stress vanishes (the surface slope of a shelf is set by flexure, not by drainage), and the stress field becomes one of **membrane forces** — depth-averaged horizontal stresses of order
$$
\bar\sigma_{xx} \sim \frac{\rho\, g\, H^{2}}{2}
$$
transmitted across the shelf like tension in a raft — the depth-mean stress at the grounding line scales as the overburden $\tfrac{1}{2}\rho g H$, several times the tiny slope stress of grounded ice — resisted at the sides by **shear margins** against the embayment walls and at the front by the **backstress** of the ice tongue itself. That backstress — the buttressing — is the shelf's gift to the interior: a shelf pressed against its embayment transmits a compressive force upstream that reduces the driving stress of the grounded ice behind it, throttling the discharge. Remove or thin the shelf (the mechanism is ocean melt from below and surface meltwater hydrofracture from above) and the throttle closes: the outlet glaciers accelerate within months, as did Pine Island and Thwaites glaciers after their shelf thinning, and the whole catchment reorganises toward a new, thinner equilibrium. The **isostatic readjustment** of shelves is also why they are poor sea-level meters — melting of floating ice raises no tides, Archimedes' guarantee — while making them the perfect amplifiers: no direct sea-level signal, but total command of the ice that has.
:::

::: example How shear margins stay warm {#ex-shearheat}
In an ice-stream shear margin $10\ \mathrm{km}$ wide, InSAR shows the velocity dropping by $400\ \mathrm{m\,yr^{-1}}$ across it. Estimate the strain rate, and the warming rate if the margin stress is $150\ \mathrm{kPa}$ ($\rho c_p = 3.7\times10^{6}\ \mathrm{J\,m^{-3}\,K^{-1}}$). Why does this matter for where the margin sits?
::: solution
The strain rate is $\dot\epsilon \approx \Delta u/w = 400/(10^{4}) = 0.04\ \mathrm{yr^{-1}} = 1.3\times10^{-9}\ \mathrm{s^{-1}}$, and frictional heating runs at
$$
\dot q = \tau\dot\epsilon = 1.5\times10^{5}\times1.3\times10^{-9} = 2\times10^{-4}\ \mathrm{W\,m^{-3}},
\qquad \frac{\partial T}{\partial t} = \frac{\dot q}{\rho c_p} = 1.6\times10^{-11}\ \mathrm{K\,s^{-1}} \approx 0.5\ \mathrm{K\,yr^{-1}} .
$$
Half a degree per year, sustained for centuries, is enough to drive the margin's ice to the pressure-melting point — and soft, melting ice flows more easily, which narrows the margin, which concentrates the strain, a positive feedback that explains why shear margins are observed to be **narrow, warm and deforming at their edges**, and why they are modelled as damage zones rather than as straight Glen ice. The margin is where an ice stream spends its energy: half a continent's frictional heat is produced in these few kilometres of slow, hot, ruined ice.
:::
:::

::: example The force of a shelf {#ex-backstress}
An ice shelf $300\ \mathrm{km}$ long and $40\ \mathrm{km}$ wide transmits its weight to the embayment walls by margin drag of $\tau_c = 50\ \mathrm{kPa}$. Show that the backstress it delivers to the grounding line scales as $\sigma_b \sim \tau_c L/P$, evaluate it, and compare with the depth-mean driving stress $\tfrac{1}{2}\rho g H$ of the $600\ \mathrm{m}$-thick glacier at its grounding line.
::: solution
The margin drag $\tau_c$ acting over the shelf's length $L$ supports its weight per unit width, so the depth-mean backstress returned to the grounding line is
$$
\sigma_b \sim \frac{\tau_c L}{P} = \frac{5\times10^{4}\times3\times10^{5}}{4\times10^{4}} = 3.8\times10^{5}\ \mathrm{Pa} = 0.38\ \mathrm{MPa},
$$
against a grounding-line driving stress of $\tfrac{1}{2}\rho g H = 2.7\ \mathrm{MPa}$ — the shelf cancels about one-seventh of the drive in this wide, weak geometry. Narrow, steep-walled fjord shelves, with $L/P$ an order of magnitude larger, cancel **most** of the driving stress, and detailed models confirm it: this is why Greenland's confined shelf tongues hold their glaciers in a headlock while Antarctica's vast, unconfined shelves throttle only modestly — and why the small, confining shelves (Larsen A, B, Wilkins, the Greenland 2002–2005 cases) have produced every dramatic acceleration on record when they broke up. The shelf is not a cork but a **brake**, and brakes are measured against the engine, not against the road. This is why the collapse of a shelf need not change the sea level by a centimetre and yet can double a continent's ice discharge within a decade: the shelf is not a cork but a **brake**, and brakes are measured against the engine, not against the road.
:::
:::

::: warning Ice is not "solid", the flow law is not a law of nature, and fast does not mean unstable
Five errors. **"Ice is solid" is true only on the timescale of a hammer blow**: over years, ice's effective viscosity at glacier stress is 10¹³ poise — pitch, not granite — and every statement about glaciers must specify its Deborah number implicitly. **Glen's exponent n = 3 is empirical and conditional**: it holds for the dislocation-creep regime of stresses 0.01–1 MPa; at low stress ice creeps linearly (n = 1), at high stress it fractures, and near the melting point or in very cold ice the parameter A varies by an order of magnitude — using a single A for a whole ice sheet is the oldest and most consequential fudge in the field. **Ice-stream speed is not instability**: most streams are steady, lubricated systems whose fast flow is in balance with their accumulation; the fear is not speed itself but the **marine-ice-sheet-instability geometry** (bed below sea level sloping inland) that converts speed into retreat without a climate trigger. **"Glaciers flow downhill" fails where it matters**: ice flows up the pressure gradient, and both the Laurentide ice sheet's flow over the Laurentian Highlands and present Antarctic flow over the Gamburtsev mountains are up-ice-slope, driven by thickness, not topography. **And Jakobshavn's speed-up is not proof of the future**: individual glacier changes are notorious red herrings — Greenland's total discharge rose 2000–2010 and then stabilised — and the honest reading of velocity data is catchment-scale flux divergence, not the highlight reel.
:::

::: history
The flow was proved by **Agassiz**'s Unteraar hut (1841), following the hut-drift observations of the Saussure and Charpentier circle on Mont Blanc glaciers in the 1780s–1830s; the quantitative material law came a century later from **Ewart S. Glen**'s laboratory creep tests and borehole-tilt measurements, published in 1952–1955 with the exponent that bears his name. **John F. Nye**'s 1951–1957 papers supplied the continuum mechanics — crevasse criteria, ice-shelf flow, and the channel theory that also made him a founder of karst physics; **V. V. Vialov**'s 1954 analytical ice-sheet profile and the Soviet deep-drilling programme at Mirny and Vostok (1957–59) tested the flow law in situ at $-50\ ^\circ\mathrm{C}$. **Johannes Weertman**'s sliding and fracture analyses (1957–1973) and **W. F. Paterson**'s *The Physics of Glaciers* (1981) set the textbook, and the satellite-velocity atlases of the 1990s–2000s — the InSAR speed maps of **Helmut Rott**, **Ian Joughin** and **Eric Rignot**'s groups — discovered the ice streams' dominance of continental drainage, and the Operation IceBridge and ICESat-2 campaigns now measure the deformation–sliding split directly.
:::

The bed and its water are the next lesson, [[glaciology/basal-sliding]]; the balance that sets the flux is in [[glaciology/mass-balance]]; the ice-sheet and shelf applications are in [[glaciology/ice-sheets]] and [[glaciology/ice-shelves]]; the power-law rheology's cousin — mantle rock creep — is in [[geophysics/flexure]]; the velocity measurements are in [[glaciology/observing-ice]] and [[remote-sensing/radar-lidar]]; and the ocean-driven melt that triggers acceleration is in [[glaciology/ice-shelves]] and [[climate-change/sea-level-rise]].

::: quiz
The driving stress of most glaciers and ice sheets, ρgH sin α, clusters near 50–150 kPa because:
- [ ] slopes are set by the bedrock.
- [x] ice masses self-organise: excess stress thins the ice by faster flow, deficit rebuilds the slope.
- [ ] the flow law's A is constant.
- [ ] crevasses release extra stress.
::: solution
Ice sheets behave like bodies with a **yield stress**: sustained stresses above the ~100 kPa carrying capacity accelerate flow and thin the ice until the slope — and so the stress — returns to the band the ice can carry. The uniformity of driving stress across the world's ice is the single most eloquent fact of ice-sheet mechanics, and the reason "the slope of the ice surface" is a better predictor of velocity than either thickness or climate.
:::
:::

::: summary
- Glacier ice deforms by Glen's flow law, ε̇ = Aτ³: shear-thinning, tenfold temperature-dependent, and valid outside the brittle surface layer and the low-stress linear regime.
- Gravity on a gentle slope supplies a remarkably uniform driving stress of 50–150 kPa; ice sheets self-organise to carry it, and their dome shape (∝ ξ^{4/7}) is Glen's law written in ice.
- Velocity = deformation + sliding; ice streams are sliding-dominated marine-bed corridors that carry 90 per cent of Antarctic discharge through a few per cent of the margin.
- Crevasses mark the brittle lid; water-filled crevasses cut ~30 per cent deeper and are the hydrofracture engine of ice-shelf breakup.
- Floating shelves lose the driving stress and gain membrane forces: they raise no sea level when they melt but throttle the ice that does, and their backstress can cancel half a glacier's drive.
- The discipline's history — Agassiz's hut, Glen's laboratory, Nye's mathematics, the satellite velocity atlases — is a case study in how a material property, once measured, becomes the control on planetary change.
:::

## Exercises

::: exercise Driving stress {level=1 check="180"}
Find the driving stress of a $200\ \mathrm{m}$-thick glacier on a slope $\sin\alpha = 0.1$, in kPa ($\rho = 917\ \mathrm{kg\,m^{-3}}$). (Enter to the nearest integer.)
::: solution
$\tau_d = 917\times9.81\times200\times0.1 = 1.8\times10^{5}\ \mathrm{Pa} = 180\ \mathrm{kPa}$ — above the global 50–150 kPa band, which is why such steep, thick configurations are rare and short-lived: they flow themselves away.
:::
:::

::: exercise Strain rate {level=1 check="0.076"}
With $A = 2.4\times10^{-24}\ \mathrm{Pa^{-3}\,s^{-1}}$ and $\tau = 100\ \mathrm{kPa}$, find the strain rate in $\mathrm{yr^{-1}}$ to three decimals.
::: solution
$\dot\epsilon = 2.4\times10^{-24}\times10^{15} = 2.4\times10^{-9}\ \mathrm{s^{-1}}\times3.16\times10^{7} = 0.076\ \mathrm{yr^{-1}}$. A parcel of ice under ordinary glacier stress doubles its strain in a little over a decade — and unlike a metal at room temperature, it never work-hardens toward arrest: the flow law has no fatigue term, which is why ice sheets do not "settle" into stability but keep responding until the climate lets them rest.
:::
:::

::: exercise Doubling stress {level=1 check="8"}
By what factor does the strain rate increase if stress doubles under Glen's law ($n = 3$)?
::: solution
$2^{3} = 8$. The shear-thinning exponent is why a 10 per cent thinning of a shear margin (raising its stress by ~10 per cent) speeds its deformation by 33 per cent, why laboratory calibrations of A scatter so violently, and why the response of ice streams to warming is so much larger than linear-response intuitions suggest.
:::
:::

::: exercise Temperature stiffening {level=2 check="10"}
Glen's $A$ follows an Arrhenius law with activation energy $Q = 60\ \mathrm{kJ\,mol^{-1}}$. Find the ratio $A(-10\,^\circ\mathrm{C})/A(-30\,^\circ\mathrm{C})$ to the nearest integer ($R = 8.31\ \mathrm{J\,mol^{-1}\,K^{-1}}$).
::: solution
$\exp\left[\frac{Q}{R}\left(\frac{1}{243}-\frac{1}{263}\right)\right] = \exp(7220\times3.13\times10^{-4}) = \exp(2.26) = 9.6 \approx 10$. Warm-based ice is an order of magnitude softer than cold-based ice at the same stress — which is why the **thermal structure** of an ice sheet, invisible beneath the surface, decides its speed, and why "the same ice sheet" can be stable cold and unstable warm with no change in the flow law's exponent.
:::
:::

::: exercise Crevasse depth {level=2 check="22"}
Using Nye's balance $d = 2\tau_t/(\rho_i g)$, find the depth a crevasse reaches under a tensile stress of $0.1\ \mathrm{MPa}$, in metres. (Enter to the nearest integer.)
::: solution
$d = 2\times10^{5}/(917\times9.81) = 22\ \mathrm{m}$. Water-filled, the same stress gives $22\times1025/917 = 25\ \mathrm{m}$, and a crevasse reaching the surface water table propagates spontaneously to the bed — the runaway that makes crevasse fields and ice-shelf rifts both products of meltwater, and both harbingers of the warming surface.
:::
:::

::: exercise Weertman sliding {level=2 check="8"}
Under the sliding law $u_b \propto \tau_b^{3}$, find the factor by which sliding speed rises if basal stress rises by 100 per cent.
::: solution
$2^{3} = 8$ again — the same cubic that governs deformation governs friction in Weertman's original law, so both terms of the velocity budget respond nonlinearly to the same perturbation, and their sum is why tidewater glacier speeds vary by an order of magnitude between years of similar climate. (Modern sliding laws for deforming-bed glaciers use lower or effective-stress-dependent exponents precisely to tame this runaway.)
:::
:::

::: exercise Ice-sheet scaling {level=3 check="1.35"}
The flux-divergence half-width of an $n = 3$ ice sheet scales as $L \propto a^{3/7}$ at fixed maximum thickness. Find the factor by which $L$ grows if accumulation $a$ doubles. (Enter to two decimals.)
::: solution
$2^{3/7} = 1.35$. Warmer climates build **narrower, steeper, faster-draining** ice sheets at fixed volume — the geometry of a warm-based, high-accumulation ice mass, with important consequences for how a future warmer Antarctica stores (and loses) its ice: mass and footprint are not proportional, and the margin retreats faster than volume alone implies.
:::
:::

::: exercise Shelf buttressing {level=3 check="18"}
A glacier's grounding-line driving stress is $45\ \mathrm{kPa}$ and its floating shelf's backstress cancels $60$ per cent of it. Find the effective driving stress in kPa, and state the velocity change if $u \propto \tau^{3}$. (Enter the effective stress.)
::: solution
Effective driving stress $= 45\times0.4 = 18\ \mathrm{kPa}$, and with the cubic law the velocity falls to $(0.4)^{3} = 6$ per cent of its unbuttressed value — equivalently, losing the shelf multiplies the discharge by about sixteen. The exercise is Pine Island Glacier in one line: a shelf thinned by warm water releases a brake worth an order of magnitude in speed, and the ocean warms the ice sheet without touching its surface.
:::
:::
