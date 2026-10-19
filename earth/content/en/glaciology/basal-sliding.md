On 30 September 1996, a volcanic fissure opened under Iceland's Vatnajökull ice cap and, within hours, was melting ice faster than any river in Europe. The meltwater pooled in a subglacial cavity eight kilometres wide, pressed against the ice roof until the ice began to float, and then — finding a path — discharged **five cubic kilometres** of water across the sandur plain below in little over a month, its peak flow twenty times the Rhine's mouth discharge, a wall of grey water that swept the new Ring Road bridge into the sea like a toy. The Grímsvötn jökulhlaup is the textbook demonstration of the fact this lesson is about: **glaciers ride on water**, and the pressure of that water — invisible, kilometre-deep, controlled by the balance between a summer's melt and a bed's drainage — is the throttle and brake of ice flow. Where sliding was once dismissed as a complication in Glen's neat deformation physics, it is now understood as the dominant term in the velocity of the world's fastest glaciers, the mechanism of their most dramatic changes, and the reason ocean warming and surface melting both reach the interior of ice sheets within months rather than millennia.

## Friction, water pressure and the sliding law

::: proposition Effective pressure and Weertman's sliding law {#prop-sliding}
Ice does not slide over rock the way a sled slides on snow; it slides over a bed whose strength is set by the **effective pressure**
$$
N = \rho_i\, g\, H - \rho_w\, g\, h_w ,
$$
the ice's weight minus the water pressure it traps — because glacier sliding is frictional **regelation**: ice presses against bedrock bumps, melts on the upstream face under high stress, and refreezes downstream, the water film being the lubricant and the phase change the transport mechanism. **Weertman's sliding law** (1957) for sliding over a bed of bumps of wavelength $\lambda$ follows:
$$
u_b \propto \frac{\tau_b^{\,3}}{N}, \qquad \tau_b = \rho_i g H\sin\alpha ,
$$
sliding fast when driving stress is high and water pressure high (small $N$), slowly when the bed is dry and the ice frozen to it. The law's two edges are the whole drama of glacier speed. As $N \to 0$ — water pressure approaching the ice overburden, the condition of **floating** — sliding and deformation both diverge, and in reality the bed fails first: the ice lifts, the bed deforms, or the drainage system reorganises to vent the pressure. As $N$ rises in winter, when meltwater supply stops and the subglacial system drains, glaciers **slow by factors of two to ten** — the seasonal velocity cycle first measured on Greenland's ice by radar in the 1990s and now resolved by GPS on glaciers from Alaska to Svalbard. The modern practical form, $u_b = C\tau^m N^{-l}$ with $m \approx 1$–$3$ and $l \approx 1$, is calibrated per glacier and per season, and its exponents are the field's most honest admission that we can measure sliding but not yet derive it everywhere.
:::

::: example The throttle: water pressure as a control knob {#ex-throttle}
A Greenland outlet glacier slides with $u_b \propto \tau^{3}N^{-1}$. In summer, basal water pressure rises so that $N$ falls from $300$ to $100\ \mathrm{kPa}$ while driving stress is unchanged. Find the sliding speed-up factor, and explain why the speed-up then **saturates** after a few weeks even though the melt continues.
::: solution
$u_b$ scales as $1/N$: the factor is $300/100 = 3$. The saturation is drainage: distributed water films that lift the ice are unstable — they organise into channels, and channels **dissipate pressure** (a channel flowing full at the hydraulic potential of its inlet has low water pressure along most of its length), so $N$ recovers as the channelised system matures in mid-summer. The observed pattern — a spring speed-up of two- to fivefold within days of melt onset, a partial slowdown as channels develop, and an autumn collapse to the winter rate — is the glacier's hydrological year, and it is why the Greenland Ice Sheet's summer velocity signal, first detected by **Humphrey and Anandakrishnan** in 1994, is now the calibration target for every surface-melt contribution to sea-level projections.
:::
:::

::: widget plot
f: 80*(x/200)^3
x: 0, 200
y: 0, 90
labels: u_b\ (\mathrm{m\,yr^{-1}})
caption: Sliding speed against basal shear stress under Weertman's cubic law, normalised to $80\ \mathrm{m\,yr^{-1}}$ at $200\ \mathrm{kPa}$ — the shape, not the scale, is the message: the cubic makes sliding a **threshold-like** function of driving stress, so a glacier approaching the stress band where its bed can no longer grip behaves smoothly until it doesn't. Add the $1/N$ factor and the threshold moves with water — which is why tidewater and marine-terminating glaciers, whose stress is set by their own thickness and whose water is free, are the sliding-dominated systems that dominate the news.
:::

## Till: when the bed flows too

::: definition Deforming beds {#def-till}
In the mid-20th century, glaciologists who drove stakes through a glacier to its bed made an awkward discovery: in many places the **bed itself was moving** — decimetres to tens of metres per year — a saturated mud of ground rock and crushed sediment called **till** shearing at strain rates of $1$–$100\ \mathrm{yr^{-1}}$ in a layer tens of centimetres to metres thick. The mechanics is soil mechanics: till strength follows a critical-state law, $\tau_f = c' + \sigma'_n\tan\phi'$ with effective normal stress $\sigma'_n$ set by the same water pressure that controls sliding, so a **water-rich till fails at a few tens of kilopascals** — less than the driving stress of almost any warm-based glacier — and the glacier's basal motion is then partitioned between sliding at the ice–till interface and **bed deformation** within the till, in proportions that change season by season. Deformation dominates where the bed is soft and the interface is lubricated (most of Antarctica's ice streams ride on deforming till a metre or two thick), sliding dominates on hard beds; and the work of deformation leaves its own deposits — the streamlined **drumlins**, the stacked till fabrics used to reconstruct flow directions, the rip-up clasts of frozen till rafted into the ice. The concept did more than complicate the sliding law: it made the bed a **geological body** with memory, hydrology and failure criteria, and it explained why the same glacier can surge, stall and surge again as its till builds up pore pressure over decades and vents it in a season.
:::

::: example Partitioning the motion {#ex-partition}
A glacier's basal velocity is $50\ \mathrm{m\,yr^{-1}}$: $15\ \mathrm{m\,yr^{-1}}$ of interface sliding plus $35\ \mathrm{m\,yr^{-1}}$ of till deformation across a $1.5\ \mathrm{m}$-thick till layer. Find the till's strain rate, and explain why till deformation **self-limits** while sliding does not obviously.
::: solution
$\dot\gamma = 35/1.5 = 23\ \mathrm{yr^{-1}}$ — the till in a fast-flowing glacier margin deforms at a rate comparable to the fastest laboratory soils tests, which is why subglacial sediment mechanics is measured in situ with borehole ram probes rather than in the lab. Till deformation self-limits because shearing a saturated till **dilates** it (grains ride over one another, volume increases, water is drawn in or pressure drops), raising strength and shutting down the deformation — a negative feedback that stabilises most beds; sliding over a hard bed has no such built-in brake, which is why the fastest observed glacier flows (Jakobshavn's $17\ \mathrm{km\,yr^{-1}}$ surface speed at the terminus) combine hard-bed sliding with a floating tongue rather than soft-bed deformation. The feedbacks that do exist for sliding — channelisation, effective-pressure recovery — are hydrological, and they fail when the water supply is unlimited: the ocean.
:::
:::

## Water: the hidden engineer

::: definition Subglacial drainage, lakes and floods {#def-drainage}
Meltwater generated on the surface reaches the bed through **moulins** — shafts that melt open each spring and carry rivers underground — and then organises into one of two drainage styles with opposite mechanical effects. **Distributed drainage** — thin films and linked cavities at the ice–bed interface — carries little water but at **high pressure**, maximising sliding; **channelised drainage** (**Nye channels** melted into the ice from above and **Rothlisberger channels** melted into the bed from below, the classic eponyms of flowing-water conduits) carries much water at **low pressure**, stabilising the glacier. The seasonal war between the two styles is the glacier's hydrological year, and its extreme event is the **jökulhlaup**: a subglacial lake — Antarctica holds several hundred, the largest (Vostok, $250\ \mathrm{km}$ long under $3.7\ \mathrm{km}$ of ice) holding well over a thousand cubic kilometres of liquid freshwater — drains when the ice above it lifts to flotation or a fissure opens, and the flood, initially a few tens of $\mathrm{m^{3}\,s^{-1}}$, grows as flowing water melts its own roof, reaching $10^{4}$–$10^{5}\ \mathrm{m^{3}\,s^{-1}}$ before the reservoir empties or the inlet refreezes. **Shreve's theory** of jökulhlaups (1972) — the flood wave as a melting conduit with a frictional heat balance — reproduced the observed Grímsvötn hydrographs to within tens of per cent, one of the most precise successes in geological prediction. The floods are hazards (Iceland's road-destroying, bridge-sweeping events; the catastrophic Missoula and Channeled Scablands floods of glacial Lake Missoula at $10^{6}\ \mathrm{m^{3}\,s^{-1}}$), agents of erosion (the tunnel valleys drilled tens of metres into rock beneath past ice sheets are next-generation oil-field aquifers and tunnelling hazards), and — because each lake drains on a decadal cycle — a repeating experiment on how fast a glacier can be lifted off its bed.
:::

::: example Grímsvötn by the numbers {#ex-grims}
The 1996 Grímsvötn jökulhlaup released $3\ \mathrm{km^{3}}$ of water over $30$ days. Find the mean discharge, and, given a peak of $5\times10^{4}\ \mathrm{m^{3}\,s^{-1}}$, the peak-to-mean ratio. Why does the flood grow at all — what makes a leak of a few $\mathrm{m^{3}\,s^{-1}}$ into a continental-scale event?
::: solution
Mean discharge $= 3\times10^{9}/(30\times86{,}400) = 1160\ \mathrm{m^{3}\,s^{-1}}$, a peak-to-mean ratio of $43$ — the flood is violently unsteady because the conduit's growth is its own engine: discharge melts the conduit roof at a rate proportional to $Q$, which raises capacity and drives more discharge, a runaway that ends only when the lake empties or the conduit's upstream end refreezes or uncovers. This **positive feedback with a finite reservoir** is why jökulhlaup hydrographs are sawtooths and why their forecasts (Iceland's Met Office now issues them within hours of onset, from river gauges and satellite altimetry of the lowering lake) are exercises in Shreve's heat balance rather than in rainfall-runoff models.
:::
:::

## Speed-ups, stalls and surges: the episodic ice

::: definition Instabilities on glacier time {#def-episodic}
Basal hydrology gives glaciers a repertoire of **episodic behaviour** that smooth flow laws cannot produce. **Surges**: mass-transfer and thermal-cycle instabilities (the **thermal-regime sliding cycle** analysed by **Huws Clarke** and colleagues, alongside the mass-transfer cycle of the classical surgers) load a reservoir area for decades, then transfer metres of ice to the tongue in months — Columbia Glacier's post-1980 collapse (documented in **Meier and Post**'s classic studies of its 1950s–70s advance and its abrupt 1982 retreat) and the 20-year surges of Karakoram and Pamir glaciers, whose "stability anomaly" under warming is itself a basal-hydrology puzzle. **Stalls**: in 1994, West Antarctica's **Kamb Ice Stream** — flowing $500\ \mathrm{m\,yr^{-1}}$ — stopped within a few years, its water pressure apparently lost to a till that had dewatered; the neighbouring B and C streams trade flow on century timescales, meaning the Antarctic sea-level budget is set by **which streams are on**, a state variable that changes within decades and is absent from every smooth model. **Seasonal speed-ups** of 10–100 per cent across Greenland's melt-affected margin, **tidal modulation** of sliding at $10\ \mathrm{cm}$-per-hour amplitudes on tidewater glaciers (the cleanest natural experiment in sliding laws, since the tide is a known forcing at $N$), and **sticky spots** — patches of high basal drag that pin a glacier's terminus until they release — complete the picture: the bed is not a boundary condition but the glacier's **nervous system**, and the ice sheet's future is partly a hydrological forecast.
:::

::: example The tide as a laboratory {#ex-tide}
A tidewater glacier's sliding velocity varies by 20 per cent over the 12.4-hour tidal cycle, with peak speed at **high** tide. Given that terminus water pressure swings change the effective pressure $N$ at the grounding zone by $\pm 30$ per cent, estimate the sliding-law exponent $l$ in $u_b \propto N^{-l}$, and explain the phase.
::: solution
At high tide the ocean presses against the floating terminus, raising water pressure along the grounding zone and **lowering** $N$; sliding peaks when $N$ is minimum, exactly as observed. Balancing the amplitudes, $1.2 = (1.3)^{l}$ gives
$$
l = \frac{\ln 1.2}{\ln 1.3} = 0.7 ,
$$
and this is the field's proudest measurement: a **known forcing**, the tide, inverted for the sliding law's exponent on real glaciers — tidal analyses across Greenland and Antarctica consistently find $l$ between 0.5 and 1.5 and the stress exponent $m$ between 1 and 3, the closest thing to a laboratory verification of sliding physics that the planet provides.
:::
:::

::: warning Sliding is not melting, water at the bed is not a lubricant like oil, and a stalled ice stream is not a healthy one
Five errors. **"Sliding melts ice" inverts the mechanism**: regelation sliding works because pressure-melting and refreezing **transport** ice past bumps; the film is nanometres thick and refreezes the moment pressure drops — which is why frozen beds freeze fast and why "a thin water layer lubricates everything" misses the cubic stress dependence that does the real work. **Subglacial water is not oil**: its pressure is set by the ice's own weight and the drainage geometry, so it cannot be arbitrarily high — the system self-limits at flotation, and the interesting question is always the drainage topology, not the water "amount." **Jökulhlaup forecasts are not flood forecasts**: the hazard curve depends on the conduit's melt-growth, not on rainfall, and the flood can begin **hours after** volcanic or seismic triggering with no surface warning — Iceland's bridges are now built to be sacrificed. **Kamb Ice Stream's stall is a warning, not a reassurance**: a stream can switch off, but it can also switch **on** — the same till system that dewatered in 1994 is recharging, and models show reactivation within a century would move metres of sea-level budget between catchments. **And "the glacier is advancing" is not always good news**: surge-type glaciers advance while **losing** mass (the transfer is internal), and Karakoram-type anomalous advances are basal and calving-dynamics phenomena, not evidence of a cooling or moistening range — the ledger of [[glaciology/mass-balance]], not the snout, keeps the score.
:::

::: history
The sliding problem was formulated quantitatively by **Johannes Weertman** (1957), whose regelation law over bed bumps stood for three decades as the field's default; **Geoffrey Boulton**'s till-mechanics papers of the 1970s–80s made the deforming bed a first-order process, and the Columbia Glacier programme of **Bob Kamb** (borehole measurements through the 1990s) settled the famous question of that glacier's fast flow — its bed was sliding over hard rock after its 1982 retreat began, in the transition documented in **Meier and Post**'s classic studies. **Robert H. Shreve**'s 1972 melting-conduit theory of jökulhlaups was developed and tested by the Icelandic glaciological school of **Helgi Björnsson** on Grímsvötn's repeated outbursts, and **Humphrey and Anandakrishnan**'s 1994 detection of Greenland's seasonal speed-up opened the era of sliding as a climate process; **Anandakrishnan**, **Ian Joughin** and colleagues' tidal-modulation inversions of the 2000s turned the tide into the sliding law's laboratory, and satellite gravimetry and altimetry now track the bed's episodes — the 1994 stall of Kamb Ice Stream among them — in near-real time.
:::

The flow law this lesson rides under is in [[glaciology/ice-flow]], the water sources in [[glaciology/mass-balance]] and [[glaciology/observing-ice]], the ice streams and their stalls in [[glaciology/ice-sheets]], the shelf-controlled terminus in [[glaciology/ice-shelves]], the floods' hazards in [[natural-hazards/floods]] and [[natural-hazards/risk-reduction]], and the tunnel-valley aquifers in [[earth-resources/groundwater-resources]]; how we see all of this — boreholes, radar and satellites — is in [[glaciology/observing-ice]].

::: quiz
A glacier whose subglacial water pressure rises toward the ice overburden:
- [ ] freezes to its bed.
- [x] slides faster, until the bed fails, the ice floats, or drainage reorganises.
- [ ] always surges within a year.
- [ ] thickens.
::: solution
High water pressure lowers effective pressure and with it the bed's grip, so sliding accelerates — but the divergence is cut off by physics: flotation lifts the ice, till fails at its strength, and channels form and vent the pressure. Those three limiters are why glaciers speed up dramatically but do not run away on hydrology alone; runaway requires the geometry of [[glaciology/ice-sheets]] (marine ice-sheet instability), not just water.
:::
:::

::: summary
- Glacier sliding is regelation friction controlled by effective pressure N = ice overburden − water pressure; Weertman's law u ∝ τ³/N makes speed a cubic in stress and hyperbolic in water.
- The seasonal hydrological year — spring speed-up, channelisation slowdown, autumn stall — is measured across Greenland and is the mechanism linking surface melt to ice discharge.
- Many beds are soft: till deformation takes much of the motion where sediment is water-rich, self-limiting by dilation; hard-bed sliding dominates the fastest glaciers.
- Subglacial drainage switches between high-pressure distributed films (fast ice) and low-pressure channels (stable ice); its failures are jökulhlaups, predicted by Shreve's melting-conduit theory.
- The bed gives glaciers episodes: surges, the 1994 Kamb Ice Stream stall and its kin, seasonal speed-ups, tidal modulation — the cleanest natural experiments in sliding physics.
- Water at the bed is the glacier's nervous system: the future of the fastest ice is, substantially, a forecast of its hydrology.
:::

## Exercises

::: exercise Effective pressure {level=1 check="83"}
Ice $400\ \mathrm{m}$ thick rests on water whose head is $350\ \mathrm{m}$ above the bed. Find $N$ in kPa ($\rho_i = 917$, $\rho_w = 1025\ \mathrm{kg\,m^{-3}}$). (Enter to the nearest integer.)
::: solution
$N = 917\times9.81\times400 - 1025\times9.81\times350 = 3.60\times10^{6} - 3.52\times10^{6} = 83\ \mathrm{kPa}$ — a tenth of the dry-bed value. The glacier is near its floating threshold, gripping by a margin smaller than a single bedrock bump's stress concentration: this is the state of most fast-flowing marine-terminating glaciers, most of the time.
:::
:::

::: exercise Winter slowdown {level=1 check="4"}
With $u_b \propto N^{-1}$, find the speed-up factor from winter ($N = 400\ \mathrm{kPa}$) to peak summer ($N = 100\ \mathrm{kPa}$).
::: solution
$400/100 = 4$. Observed seasonal amplitudes of two- to fivefold across Greenland's margin are this arithmetic; the reason the annual **mean** matters for sea level is the cubic in $\tau$ and the nonlinearity in $N$ — a glacier that spends one month per year at four times its winter speed contributes a disproportionate share of its yearly discharge, so melt-season length is a first-order control, not a detail.
:::
:::

::: exercise Jökulhlaup mean discharge {level=1 check="1160"}
$3\ \mathrm{km^{3}}$ drains in $30$ days. Find the mean discharge in $\mathrm{m^{3}\,s^{-1}}$ to the nearest ten.
::: solution
$3\times10^{9}/2.59\times10^{6} = 1160\ \mathrm{m^{3}\,s^{-1}}$ — a Rhine-scale river sustained for a month, delivered through a conduit a few metres wide at first. The mean is the least interesting number: jökulhlaup peaks run 20–50 times the mean, and it is the peak that moves boulders, bridges and hazard maps.
:::
:::

::: exercise Flotation threshold {level=2 check="358"}
For the $400\ \mathrm{m}$-thick glacier above, find the water head (m, to the nearest metre) at which the ice floats ($N = 0$).
::: solution
$h_w = \rho_i H/\rho_w = 917\times400/1025 = 358\ \mathrm{m}$. Eight metres of extra head — centimetres of surface melt per day over the catchment — switches the bed from "gripping" to "afloat," which is why the flotation criterion, not any friction law, is the hard limit of sliding physics and why grounding-zone pinning points (where the ice touches down on a ridge) are the load-bearing structures of the Antarctic margin.
:::
:::

::: exercise Till strain rate {level=2 check="40"}
A $1\ \mathrm{m}$-thick till layer carries $40\ \mathrm{m\,yr^{-1}}$ of deformation. Find the mean strain rate in $\mathrm{yr^{-1}}$. (Enter to the nearest integer.)
::: solution
$\dot\gamma = 40/1 = 40\ \mathrm{yr^{-1}}$. Subglacial tills under fast ice are sheared at rates no laboratory can sustain continuously — which is why their strength is measured in situ with borehole probes and why "soil mechanics at glacier speed" remains an experimental frontier.
:::
:::

::: exercise Tidal exponent {level=2 check="0.7"}
Sliding speed varies 20 per cent while effective pressure varies 30 per cent over a tide. Estimate the sliding-law exponent $l$ in $u \propto N^{-l}$. (Enter to one decimal.)
::: solution
$l = \ln(1.2)/\ln(1.3) = 0.18/0.26 = 0.7$. Tidal modulation analyses across Greenland and Antarctica consistently give $l \sim 0.5$–$1.5$ and $m \sim 1$–$3$: the tide is the only **known, periodic, continent-scale forcing** of basal sliding, and these inversions are the closest thing the sliding law has to a laboratory verification in the field.
:::
:::

::: exercise The sliding law's roughness term {level=3 check="16"}
In Weertman's standard regelation sliding law, $u_b = E\,\tau^{3}\lambda^{4}/N$ with $E$ the ice softness and $\lambda$ the bed-bump wavelength. If a glacier's bed coarsens from bumps of $\lambda = 0.2\ \mathrm{m}$ to $\lambda = 0.4\ \mathrm{m}$ at the same stress and water pressure, by what factor does sliding change? (Enter to the nearest integer.)
::: solution
$u_b \propto \lambda^{4}$: the factor is $2^{4} = 16$. The wavelength dependence is the law's least tested and most consequential term — it says sliding is controlled by the **largest** bumps the regelation machinery can negotiate, which is why till-covered beds (no hard bumps) slide by deformation instead, why roche-moutonnée fields set glacier speed, and why the law's exponents scatter when applied across beds of different roughness spectra.
:::
:::

::: exercise The Kamb stall {level=3 check="50"}
Kamb Ice Stream flowed at $500\ \mathrm{m\,yr^{-1}}$ before stalling in 1994; its catchment's accumulation now thickens the stagnant reach at $0.8\ \mathrm{m\,yr^{-1}}$ over $100\ \mathrm{km}$ length. Estimate the time to rebuild a $40\ \mathrm{m}$ of thickness surplus needed to restart fast flow, in years, and explain why the answer is uncertain by a factor of ten.
::: solution
$40/0.8 = 50$ years of thickening at the observed rate. The uncertainty is a factor of ten because the restart criterion is not thickness but **basal water pressure**: reactivation requires the till to re-saturate, which depends on where the meltwater that used to feed the stream now goes (it has been observed to leak slowly into neighbouring catchments), and on whether the dewatered till will re-soften or has consolidated irreversibly. The stall is the field's standing lesson in state variables: a 5 per cent change in which Antarctic streams are "on" moves the sea-level budget by more than a decade of surface melt, and no smooth model contains the switch.
:::
:::
