In 2019 a consortium of polar remote-sensing laboratories published the most audacious dataset in the history of glaciology: the **MEaSURE**-lineage velocity mosaic — the ITS_EXCHANGE compilation — 200 million ice-flow speed measurements covering every glacier and ice stream of the Arctic and sub-Antarctic, every one of them derived from satellite image pairs, most from a single 30-m sensor, all of it assembled by an international team that had spent a decade making their individual maps compatible. Two decades earlier, the same information would have filled a career's field seasons and a national programme's budget; a generation before that, the flow of most of the world's ice was simply unknown. Observation transformed glaciology twice in fifty years — first from a science of stakes and ablation rods to one of satellites, now from satellites to **continuous, calibrated, multi-mission measurement systems** whose products (mass, thickness, velocity, bed, front position) arrive within weeks and are ingested directly into the projection models that policy reads. This lesson is the toolkit: how you weigh something the size of France, measure something moving a metre a day from 500 km up, and see the mountains beneath three kilometres of ice.

## Weighing: gravimetry and altimetry

::: definition Gravimetry and altimetry {#def-weighing}
**GRACE** (2002–17) and **GRACE-FO** (2018–) fly in formation, exchanging microwave ranging signals at micrometre precision, and feel the Earth's mass move: a Greenland that has lost a hundred gigatonnes of ice pulls slightly less on the lower satellite, and the monthly gravity-field solution reports the change at ~300 km resolution, equivalent to **centimetres of water spread over an ice sheet** — blind to individual glaciers, unrivalled for whole systems, and the backbone of the IMBIE mass budgets. **Radar altimetry** (ERS, Envisat, **CryoSat-2** since 2010 with its interferometric SAR mode that finally resolved the steep margins where conventional altimeters lost the surface) and **laser altimetry** (**ICESat** 2003–09, **ICESat-2** since 2018 with its photon-counting lidar that maps the seasonal snowline and the melt ponds of sea ice as well as the elevation of glaciers) measure the **surface height**, whose change times area density gives mass: the geodetic method, now the most complete long record, extending back to 1978 by chaining the radar missions. The conversion from measured **freeboard** to sea-ice **thickness** is the atlas's most-used inversion — Archimedes with a snow load, $H = \rho_w f/(\rho_w-\rho_i)$ corrected for the snow that depresses the floe — and its weakest link is not the laser but the **snow density**, a modelled number whose 2018 revision cut the estimated Arctic sea-ice volume by a tenth in a single paper: the permanent lesson that in remote sensing, the physics is rarely the uncertainty; the **auxiliary parameter** is.
:::

::: example From freeboard to floe {#ex-freeboard}
CryoSat-2 measures a winter freeboard of $1.2\ \mathrm{m}$ in the central Arctic. Find the ice thickness ignoring snow, then with $0.3\ \mathrm{m}$ of snow at $300\ \mathrm{kg\,m^{-3}}$ (which depresses the floe), using $\rho_i = 917$, $\rho_w = 1025\ \mathrm{kg\,m^{-3}}$.
::: solution
Without snow, $H = \rho_w f/(\rho_w - \rho_i) = 1025\times1.2/108 = 11.4\ \mathrm{m}$. With snow, the load correction adds the snow's own depression: the floe rides lower by $\rho_s d_s/(\rho_w-\rho_i) = 300\times0.3/108 = 0.83\ \mathrm{m}$ of freeboard that is **not** ice, so the ice thickness is $1025\times(1.2-0.83)/108 = 3.5\ \mathrm{m}$ plus the snow-ice term — a factor-of-three swing on a number that drives the volume, the habitat, and the shipping forecasts. This is why the snow-density debate mattered so much, and why the laser (ICESat-2, which **sees** the snow surface) and the radar (which sees the snow–ice interface through C-band scattering) are now flown as a pair: the two together measure the snow depth directly, turning the atlas's largest auxiliary error into a measured quantity.
:::
:::

::: widget plot
f: 9.5*x
x: 0, 3
y: 0, 30
labels: H\ (\mathrm{m})
caption: Ice thickness against freeboard for floating ice in water — the Archimedean line whose slope ($\rho_w/(\rho_w-\rho_i) \approx 9.5$) turns a centimetre-accurate height measurement into a metre-scale thickness product. Every assumption the sentence hides — density profiles, snow load, sea level, tide — is a published correction paper, and the whole sea-ice thickness enterprise is this line plus the humility to correct it.
:::

## Measuring flow: interferometry and feature tracking

::: definition Velocity from orbit {#def-velocity}
Ice velocity is measured two ways from space. **Feature tracking** cross-correlates repeated images (Landsat since 1972 — the accidental 50-year archive from which the pre-satellite-era speeds of Jakobshavn and Pine Island were reconstructed after the fact; MODIS daily; Sentinel-2 at 10 m) looking for the displacement of crevasse patterns, melt ponds and rock outcrops between passes: robust, all-weather-independent, and now producing daily-to-weekly speed maps of every glacier on Earth. **Synthetic aperture radar interferometry (InSAR)** goes further: two radar images taken days apart are combined as a complex **interferogram** whose fringe pattern encodes displacement along the line of sight at centimetre precision (C-band Sentinel-1, free and continuous since 2014, gives repeat times of 6–12 days; the ALOS and TanDEM-X missions add longer wavelengths that stay coherent over snow-free margins), and **Doppler** or **offset-tracking** modes extend the method even to the decorrelating melt zones. The products changed the science's questions: the **speed maps** of the 1990s (InSAR's first Antarctic campaign) revealed that 90 per cent of Antarctic discharge runs through a few per cent of the margin; the **change maps** of the 2010s caught Thwaites accelerating, the Kamb Ice Stream stalled, and a hundred Greenland outlet glaciers responding to a thinning mélange within a season. Velocity plus thickness plus width is **flux**, and flux across a grounding line or front is the discharge term of every mass budget — which is why the velocity record, not the photograph, is the sea-level early-warning system.
:::

::: example Speed from a matching pair {#ex-trackspeed}
A crevasse field on Helheim Glacier appears at pixel column 12 400 in a 10-m Sentinel-2 image on 1 June and at column 12 517 in the image of 21 June. Find the along-flow speed in $\mathrm{m\,day^{-1}}$ and $\mathrm{m\,yr^{-1}}$, and name the two assumptions.
::: solution
Displacement $= 117\times10 = 1170\ \mathrm{m}$ in 20 days: $58.5\ \mathrm{m\,day^{-1}}$, $2.1\times10^{4}\ \mathrm{m\,yr^{-1}}$ — Helheim's summer speed, among the fastest measured for a non-tidewater surge. The assumptions: that the image geometry (orthorectification, the 10-m pixel scale, and the sub-pixel correlation peak) is right to the few-pixel level, and that the tracked feature is **ice**, not a cloud, a melt-pond pattern or a repeating noise texture — the failure mode that makes feature-tracking products require manual and geometric (velocity-continuity) screening, and why the community's velocity mosaics are annotated with confidence masks as carefully as weather maps carry probability.
:::
:::

## Seeing through ice: radar, sound and the bed

::: definition Ice-penetrating radar and the bed {#def-radar-bed}
Radio waves at 100–1000 MHz pass through cold ice nearly unattenuated and reflect strongly off the **bed** (rock–ice impedance contrast) and off **internal layers** (ancient surfaces, tephra, and — the cryosphatologist's treasure — frozen melt surfaces): **radio-echo sounding**, flown on aircraft since the 1960s and now on drones and uncrewed aircraft, measures thickness from two-way travel time ($H = c\,\Delta t/2\sqrt{\varepsilon_r}$, $\varepsilon_r \approx 3.17$ for ice) and images the stratigraphy that dates the ice. The compendium products — **Bedmap2/3** for Antarctica, **BedMachine Greenland** (2022) — assemble millions of radar lines, gravity and magnetic ship tracks, and seismic soundings into the sub-ice topography, and they are not background maps but **forecast inputs**: the marine-instability risk of an ice sheet is read directly off the bed's slope below sea level, and the depth-to-bed controls everything from basalt weathering to subglacial lakes. The last unglaciated frontier — the **cavities beneath floating shelves** — is now probed by autonomous under-ice vehicles (the AUV *Ran* under Peter Glacier? — no: under Petermann Glacier, 2012), underwater gliders released through hot-water boreholes beneath Pine Island's shelf (2019), and **seabed landers** that record the temperature of the water that is eating Thwaites. The pattern is the century's methodological moral: the parameters that decide the ice sheet's future — bed geometry, cavity temperature, grounding-line position — are **below the ice**, and the field's frontier is instrumentation that operates where no human can.
:::

::: example Radar depth sounding {#ex-radardepth}
An ice-penetrating radar pulse returns the bed echo $23.7\ \mu\mathrm{s}$ after the surface echo. Find the ice thickness ($\varepsilon_r = 3.17$, $c = 3\times10^{8}\ \mathrm{m\,s^{-1}}$), and state whether the bed at that site is grounded above or below sea level if the surface stands at $1850\ \mathrm{m}$.
::: solution
The wave speed in ice is $c/\sqrt{\varepsilon_r} = 1.69\times10^{8}\ \mathrm{m\,s^{-1}}$, so
$$
H = \frac{v\,\Delta t}{2} = \frac{1.69\times10^{8}\times23.7\times10^{-6}}{2} = 2000\ \mathrm{m}.
$$
The bed lies at $1850 - 2000 = -150\ \mathrm{m}$ — **below sea level**, marine-terminating territory: flotation would occur at $H = 1.12\times150 = 168\ \mathrm{m}$, so the ice there is grounded by 300 m of excess thickness, and the radar line has just measured the margin between stability and the marine instability of [[glaciology/ice-sheets]]. A single radar trace, correctly read, is a sentence about the future of the glacier above it — which is why the bed maps are treated as strategic data.
:::
:::

## Synthesis: the mass budget

::: definition The three methods and IMBIE {#def-synthesis}
The mass balance of an ice body is measured three independent ways — the **glaciological** (stakes and pits), the **geodetic** (altimetry differencing), and the **flux-discharge** (velocity × width × thickness across a boundary, minus calving and melt) — and their agreement, demonstrated region by region through the 2000s–2010s, is the quiet triumph that makes the global numbers credible. **IMBIE** (Ice Sheet Mass Balance Inter-comparison Exercise) formalised the agreement: for each ice sheet and period, every published method is harmonised to common definitions and combined by inverse-variance weighting, producing the single numbers the IPCC quotes (Greenland $-200\ \mathrm{Gt\,yr^{-1}}$ in the 2010s, Antarctica $-120$, glaciers $-270$). The synthesis is also a **diagnostic**: when methods disagree, the disagreement localises the missing physics — the geodetic–glaciological gap in High Asia exposed the debris-cover and snow-density problems; the flux–gravimetry tension on Antarctic Peninsula inlet glaciers drove the bathymetry campaigns (multibeam from sail drones, the BatMap surveys) that found the troughs deeper than assumed, hence the higher possible discharge. And the newest synthesis is **assimilation**: systems that feed velocity, elevation and gravity data directly into ice-flow models to produce operational one-year forecasts of Jakobshavn's speed and the Amundsen Sea's discharge — the first true **predictions** in glaciology, young, modest in skill, and the field's clearest statement of intent: from measuring the retreat to forecasting it.
:::

::: example The budget closes (almost) {#ex-budgetclose}
For a Greenland catchment, accumulation is $400\ \mathrm{Gt\,yr^{-1}}$, surface melt runoff $550$, and iceberg calving $350$. Find the mass balance by the flux method, and reconcile it with a GRACE estimate of $-90 \pm 40\ \mathrm{Gt\,yr^{-1}}$ and an altimetry estimate of $-160 \pm 50$.
::: solution
Flux method: runoff and calving remove $900\ \mathrm{Gt\,yr^{-1}}$ against $400$ of accumulation, giving $-500\ \mathrm{Gt\,yr^{-1}}$ — absurd for a single catchment, and that is the point. The three estimates ($-500$, $-90 \pm 40$, $-160 \pm 50$) cannot all be right, and the failure mode of the flux method is **geometry**, not arithmetic: a misplaced drainage divide double-counts a neighbour's calving, offshore basal melt is invisible to front-position maps, and the accumulation is a model mean with 20 per cent error. The IMBIE-style response is to audit the boundaries — redraw the divide, re-measure the front thickness — not to average the disagreement away. When the numbers close within errors — as they now do for most of Greenland and Antarctica — the closure is the result of the field, not its starting assumption.
:::
:::

::: warning The satellite does not measure what the press release says, resolution is not accuracy, and open data is not the same as understood data
Five errors. **"GRACE measures melting"**: it measures total water-column gravity change — ice, snow, liquid water, and the **rebounding crust** (post-glacial rebound is the largest systematic in every Greenland and Antarctic gravity solution, and different rebound models move the trend by a third). **"ICESat-2 measures ice thickness"**: it measures surface height to centimetres; thickness needs the bed (airborne radar, years later) or flotation physics (sea ice only) — the headline "thickness from space" is usually a **product chain** with three model inputs. **"A 30-m map means 30-m knowledge"**: resolution without error characterization is marketing — velocity mosaics carry correlation-confidence masks, altimetry carries slope-dependent error bars, and the mass-balance literature's hard-won lesson is that **correlated errors** (the same model used for firn correction in two "independent" methods) fake agreement more often than they fake disagreement. **"Radar sees the bed everywhere"**: beneath temperate, water-rich ice and beneath saline Arctic glaciers the radar signal attenuates or scatters, and whole sectors of the best maps are **interpolated** — the BedMachine products' own documentation flags them, and the marine-instability maps inherit that uncertainty directly. **And open, near-real-time data has a sociology**: the ITS_EXCHANGE velocity maps are free and superb, and they have also produced a citation ecosystem of "glacier sped up" papers on features whose speed-ups are measurement geometry — the discipline's new literacy is reading the **confidence layer**, not the colour map.
:::

::: history
Airborne **radio-echo sounding** began with the trans-polar flights of the 1950s–60s — the British Antarctic Survey's Antarctic programme and the Technical University of Denmark's decades-long Greenland effort — and matured into the continental bed atlases of the 2000s–2020s (**Bedmap2** 2001 and its successors, **BedMachine Greenland** 2022, the latter compiled by **Mathieu Morlighem** and colleagues from four decades of merged soundings). Satellite altimetry opened with **SEASAT** (1978) and matured through ERS-1/2 and Envisat to **CryoSat-2** (2010); radar interferometry was demonstrated by **David Goldstein** (1991) and turned into ice-sheet velocity atlases by **Helmut Rott**'s group and **Ian Bindschadler**'s NASA team through the 1990s, the first of them mapping the Antarctic ice streams that the gravimetric era (GRACE 2002) would later weigh. **ICESat** (2003) opened precise polar altimetry; **Operation IceBridge** (2009–19) bridged the two laser missions and, in its 2012 Wilkins campaign, produced the first near-real-time airborne assessment of a shelf in crisis; **Sentinel-1** (2014), **ICESat-2** (2018), **GRACE-FO** (2018) and the **MEaSUREs/ITS_EXCHANGE** mosaics (2019) define the present system, and the **IMBIE** exercises (2012–) its synthesis. The sub-ice frontier: the AUV *Ran* beneath Petermann Glacier (2012, **Peter Davis** and colleagues), the hot-water-deployed glider beneath Pine Island's shelf (2019, **Keith Nicholls**'s British–US programme), and the seabed thermistor arrays on the Thwaites shelf (2021–).
:::


The quantities these instruments measure are interpreted in [[glaciology/mass-balance]] (the budget), [[glaciology/ice-flow]] and [[glaciology/ice-sheets]] (the dynamics), [[glaciology/sea-ice]] (the freeboard inversion), and [[glaciology/basal-sliding]] (the bed); the remote-sensing physics is in [[remote-sensing/radar-lidar]], [[remote-sensing/sensors-orbits]] and [[remote-sensing/thermal-microwave]]; the sea-level products feed [[oceanography/sea-level]] and [[climate-change/sea-level-rise]]; the ice-core sampling that began as observation and became climate science is in [[palaeoclimate/ice-cores]].

::: quiz
GRACE is able to weigh an ice sheet because:
- [ ] its radar penetrates to the bed.
- [x] loss of ice mass reduces the local gravitational attraction between the two satellites, changing their separation.
- [ ] it counts the ice's thermal emission.
- [ ] it tracks surface height twice.
::: solution
The twin satellites track each other's separation to micrometres; mass redistribution on the ground — melting ice, moving water, rebounding rock — changes the geopotential and the separation, monthly, at ~300 km resolution. That is all it does, which is why the technique is blind to individual glaciers and why post-glacial rebound (also mass moving) is its largest correction.
:::
:::

::: summary
- Mass is measured three ways — stakes, altimetry differencing, and flux gates — and their demonstrated agreement (IMBIE) is the credibility foundation of every sea-level number.
- Gravimetry (GRACE/GRACE-FO) weighs whole systems monthly but coarsely; altimetry (CryoSat-2, ICESat-2) maps elevation change finely and needs density and firn corrections.
- Velocity comes from feature tracking (50-year Landsat archive to daily Sentinel) and InSAR; velocity × geometry = discharge, the sea-level early-warning product.
- Ice-penetrating radar measures thickness, stratigraphy and the bed — the bed whose geometry below sea level decides marine-instability risk; the last frontier is instrumenting the cavities with autonomous vehicles.
- Freeboard-to-thickness inversions and all product chains are only as good as their auxiliary parameters (snow density, rebound models, bed maps) — the physics is rarely the error.
- The field is moving from measuring to forecasting: data assimilation now produces one-year ice-flow predictions, the first genuine forecasts in glaciology.
:::

## Exercises

::: exercise Sea-ice thickness {level=1 check="11.4"}
Find the sea-ice thickness (m, to one decimal) for a freeboard of $1.2\ \mathrm{m}$, snow neglected ($H = \rho_w f/(\rho_w - \rho_i)$).
::: solution
$1025\times1.2/108 = 11.4\ \mathrm{m}$ — and the honest first-year student's relief lasts exactly until the snow correction (next lesson's exercise style) cuts it by two-thirds: freeboard work is 10 per cent Archimedes and 90 per cent snow physics.
:::
:::

::: exercise GRACE equivalent thickness {level=1 check="8.8"}
Greenland ($1.7\times10^{6}\ \mathrm{km^{2}}$) loses $150\ \mathrm{Gt}$ in a year. Find the equivalent water thickness change in cm to one decimal.
::: solution
$1.5\times10^{14}\ \mathrm{kg}/(1.7\times10^{12}\ \mathrm{m^{2}}\times1000) = 0.088\ \mathrm{m} = 8.8\ \mathrm{cm}$ — a number GRACE detects comfortably (its monthly noise is a few cm over this scale), which is precisely why the technique's limit is not precision but the **systematics** (rebound, leakage from adjacent mass) that dominate the published trends.
:::
:::

::: exercise Feature-tracking speed {level=1 check="94"}
A crevasse pattern shifts 50 pixels between Landsat images 16 days apart (pixel size 30 m). Find the speed in $\mathrm{m\,day^{-1}}$ to the nearest integer. (Enter the number.)
::: solution
$50\times30/16 = 94\ \mathrm{m\,day^{-1}}$ — a fast tidewater glacier's pace, recovered from two snapshots of a static-looking landscape. The discipline's unit discipline matters here: multiplying out gives $3.4\times10^{4}\ \mathrm{m\,yr^{-1}}$, and the misquoting of daily as annual is one of the most persistent errors in popular accounts of "glaciers racing to the sea."
:::
:::

::: exercise Radar two-way time {level=2 check="23.7"}
Find the two-way travel-time difference (µs, to one decimal) between surface and bed echoes for $2000\ \mathrm{m}$ of ice ($\varepsilon_r = 3.17$).
::: solution
$v = c/\sqrt{3.17} = 1.69\times10^{8}\ \mathrm{m\,s^{-1}}$; $\Delta t = 2H/v = 4000/1.69\times10^{8} = 23.7\ \mu\mathrm{s}$. The measurement is made to nanoseconds — a few tens of centimetres in thickness — which is why radar, not drilling, is the reason we know the bed of a continent.
:::
:::

::: exercise Flotation from the bed {level=2 check="168"}
The bed lies $150\ \mathrm{m}$ below sea level. Find the ice thickness at flotation ($H = 1.12\,b$), in metres to the nearest metre.
::: solution
$H = 1.12\times150 = 168\ \mathrm{m}$. Any radar line that finds more than 168 m of ice over that bed has found grounded ice — and the difference between the measured 2000 m and this flotation threshold is the safety margin of the marine-instability argument, measured in metres of ice rather than in opinion.
:::
:::

::: exercise Inverse-variance combination {level=2 check="22"}
Three methods estimate a mass balance with uncertainties $60$, $40$ and $30\ \mathrm{Gt\,yr^{-1}}$. Find the uncertainty of the inverse-variance-weighted mean, to the nearest integer.
::: solution
$1/\sigma^{2} = 1/3600 + 1/1600 + 1/900 = 2.01\times10^{-3}$, $\sigma = 22\ \mathrm{Gt\,yr^{-1}}$ — better than any single method, as optimal combination requires. The caveat that fills IMBIE's methods section: the formula assumes **independent** errors, and the whole discipline's honesty about shared firn models, shared velocity products and shared rebound corrections is the attempt to keep the promise the formula makes.
:::
:::

::: exercise The flux method, honestly {level=3 check="-500"}
A catchment gains $400\ \mathrm{Gt\,yr^{-1}}$ of accumulation and loses $550$ to runoff and $350$ to calving. Find the flux-method mass balance in $\mathrm{Gt\,yr^{-1}}$.
::: solution
$400 - 550 - 350 = -500\ \mathrm{Gt\,yr^{-1}}$. That the number is implausible for any real catchment is the exercise's teaching: flux budgets fail through **geometry** (wrong divide, missed offshore melt, double-counted neighbours) far more than through arithmetic, and the working rule of budget science is that when methods disagree by hundreds of gigatonnes, you audit the **boundaries** before you publish the mean.
:::
:::

::: exercise Snow-density leverage {level=3 check="27"}
Arctic sea-ice volume estimates fell by about 10 per cent when the snow-density model was revised. If the old density was $320\ \mathrm{kg\,m^{-3}}$ and thickness scales as $H \propto (f - \rho_s d_s/(\rho_w-\rho_i))$ with $f = 1.2\ \mathrm{m}$, $d_s = 0.3\ \mathrm{m}$, find the fractional change in $H$ implied by a $30\ \mathrm{kg\,m^{-3}}$ density reduction. (Enter the percentage to the nearest integer.)
::: solution
The depression term changes from $320\times0.3/108 = 0.889$ to $290\times0.3/108 = 0.806\ \mathrm{m}$; $H$ goes from $(1.2-0.889) = 0.311$ to $0.394$ in the bracketed units — a $27$ per cent increase for a 9 per cent density change. The leverage is the lesson: near the flotation limit, small auxiliary-parameter errors become large product errors, which is why the sea-ice community's most-cited papers of the 2010s are about **snow**, not lasers.
:::
:::
