Every glacier is a machine for turning snowflakes into mountains of ice and then back into rivers, and the strangest fact about the transformation is that it happens **slowly at the top and quickly at the bottom of the snowpack's life**: a snowflake that falls on a accumulation-zone slope may spend a thousand years as snow, five hundred as firn, and then only a few decades becoming ice — while the ice it becomes will flow downhill in a human lifetime. Glaciology, the physics of that transformation and of the ice's subsequent life, is the study of the largest freshwater reservoirs on land (30 million km³ of ice, 68 per cent of the world's fresh water), of the seas-level knob that has swung six to 120 metres over the ice age cycles, and of the only archive of **ancient air** — the bubbles in glacier ice are the atmosphere itself, fossilised by snow.

## From snowfall to ice

::: definition The three ages of snow {#def-snow-firn}
Fresh snow falls at $50$–$100\ \mathrm{kg\,m^{-3}}$ — nine-tenths air — as delicate dendritic crystals of vapour-grown ice. Its burial begins a three-stage densification. **Stage one, settling**: the weight of new snow crushes the delicate arms and the pack sinks as a whole, grains bonding at their contact points (sintering), reaching $\sim 250$–$400\ \mathrm{kg\,m^{-3}}$ within a season or a year; this stage is nearly independent of climate and nearly complete when the snow is a year old. **Stage two, firn densification**: now gravity-driven creep of the ice grain boundaries does the work, at a rate set by temperature and accumulation — cold, dry Antarctic firn densifies sluggishly and takes millennia to reach the next stage, while maritime glaciers close their pores in a few years. **Stage three, close-off and ice**: at a critical density of $\mathbf{830\ \mathrm{kg\,m^{-3}}}$ the remaining pore space — 9.5 per cent by volume — pinches shut into isolated bubbles, and the firn has become **glacier ice** ($917\ \mathrm{kg\,m^{-3}}$ when pure). From close-off onward the only change is elastic: the trapped air compresses, the bubbles elongate and, below about $650\ \mathrm{m}$ where the overburden pressure passes $\sim 6\ \mathrm{MPa}$, the gases dissolve and recrystallise into **clathrate hydrates** — cage-shaped molecules of ice with air locked inside — which is why the deepest ice cores must be drilled from cold sites where the ice is still young enough not to have melted at depth.
:::

::: example Porosity and the close-off {#ex-porosity}
Find the porosity (air volume fraction) of fresh snow at $100\ \mathrm{kg\,m^{-3}}$, of firn at close-off ($830\ \mathrm{kg\,m^{-3}}$), and the volume of air (at surface pressure) trapped in one cubic metre of ice at close-off.
::: solution
Porosity is $\phi = 1 - \rho/917$: fresh snow $\phi = 1 - 100/917 = 0.89$; close-off $\phi = 1 - 830/917 = 0.095$. One cubic metre of close-off firn therefore holds $0.095\ \mathrm{m^{3}}$ of air, and since the pores are still at atmospheric pressure at the moment of sealing, that is $95$ litres of **past atmosphere per cubic metre** — which, spread over the $3\ \mathrm{km}$ of the East Antarctic ice sheet, is why Antarctica alone stores an air inventory comparable to a tenth of the modern atmosphere's, one sampleable with a drill and a clean trench.
:::
:::

::: widget plot
f: 917-817*exp(-x/25)
x: 0, 120
y: 50, 950
labels: \rho\ (\mathrm{kg\,m^{-3}})
caption: A schematic firn-densification profile — exponential approach to ice density with a scale depth of $25\ \mathrm{m}$, representative of a mid-latitude glacier with $\sim 1\ \mathrm{m}$ of annual accumulation. The curve's real shape is set by the competition of burial (which deepens the layer) and creep (which densifies it), so cold dry sites stretch the curve to $100\ \mathrm{m}$ and more while maritime glaciers reach $830\ \mathrm{kg\,m^{-3}}$ within metres — the reason the gas record of warm, wet climates is compressed and poorly resolved, and why the best ice cores come from cold, high sites.
:::

## Firn: the archive's filter

::: proposition What firn costs a record {#prop-firn-filter}
Firn is not merely a stage but a **filter** on everything the ice will record. **Diffusion**: water-vapour isotopes ($\delta\mathrm{D}$, $\delta^{18}\mathrm{O}$) equilibrate through the interconnected pore air, smoothing the seasonal signal with a length scale $\sigma = \sqrt{2Dt}$ that grows as the square root of age — by close-off, the annual oscillation of isotope ratio is typically damped to a tenth of its surface amplitude, which is why isotope stratigraphy works in young temperate glaciers but only layer counting and dating models serve in old polar ice. **Dispersion and mixing of trace gases**: the same open pores let atmospheric signals diffuse, so a firn core's air record is a smoothed version of the true atmospheric history, and reconstructing rapid events (the methane jump at 8.2 ka, the industrial lead curve) requires correcting for the firn's diffusive transfer function. **The gas–ice age difference**: air at depth is **younger** than the ice around it — the ice closed over its pores centuries to millennia after the snow fell — so the bubbles of a core record the atmosphere of the year of close-off while the ice records the year of snowfall, and the offset, the $\Delta\mathrm{age}$, runs from decades on temperate glaciers to $\sim 2000$ years on the East Antarctic plateau and must be removed before any comparison of CO₂ and temperature. **And melt**: where summer melting occurs, meltwater percolates, refreezes into ice lenses and aquifers, and destroys the stratigraphy — which is why the Greenland summit's record is continuous and the lower-elevation ones are not, and why the recent appearance of **percolating melt over half the Greenland ice sheet's area** in extreme years is a direct, stratigraphic indicator of climate change written into the firn itself.
:::

::: example Pressure at the close of the pores {#ex-clathrate}
Compute the overburden pressure at $650\ \mathrm{m}$ depth in ice of mean density $917\ \mathrm{kg\,m^{-3}}$, and compare it with the $\sim 6\ \mathrm{MPa}$ threshold at which air bubbles convert to clathrate hydrate. Why do clathrates appear **below** the last-decades-old ice rather than at the very bottom of every core?
::: solution
$$
P = \rho g h = 917\times9.81\times650 = 5.8\times10^{6}\ \mathrm{Pa} \approx 58\ \mathrm{atm}.
$$
The conversion is a kinetic as well as a thermodynamic process — bubbles need nucleation sites and time — so clathrate appears as a **transition zone** of a hundred metres or so, complete by the depth where pressure exceeds the threshold by a margin, and its depth therefore records the ice sheet's **accumulation history** (how fast ice reached the threshold pressure) as much as its physics. The deepest ice of many Antarctic cores is clathrated, which complicates gas extraction (the gas must be released by crushing, not melting) and is one reason the oldest continuous ice record — 800 000 years from Dome C — stops above its base: below the clathrate zone the ice is also deformed and the layers no longer simple.
:::
:::

## The anatomy of a glacier

::: definition Accumulation zone, ablation zone, equilibrium line {#def-glacier-anatomy}
A glacier is distinguished from a snowpatch by **flow**: once the ice exceeds $\sim 50\ \mathrm{m}$ thickness its own weight drives it downhill (see [[glaciology/ice-flow]]), and flow builds the characteristic anatomy. The **accumulation zone** — where annual snowfall survives the summer — occupies the head; the **ablation zone**, where melting, calving and sublimation remove ice, the tongue; between them the **equilibrium line (ELA)** marks zero annual balance, visible as the boundary between snow-covered and bare ice at the end of the melt season, and its elevation is the single most sensitive indicator of glacier climate (the ELA rose hundreds of metres during the 20th-century warm periods and its long-term position set the extent of every ice age). Flow stretches the ice where the bed steepens: the **crevasse field** above an icefall, the transverse crevasses of a stretching tongue, the marginal **bergschrund** where ice pulls away from the headwall; compressive flow closes them downstream, and where an icefall meets a flat reach the crevassed bands are refrozen as the paired **ogives** — annual stripes of the Nanga Parbat and Nanda Devi glaciers whose periodicity first proved that glaciers flow like viscous fluid. Meltwater runs on the surface in channels and down **moulins** to the bed, where it emerges as the milky, braided rivers of every glacial foreland — and it is this water, freezing and thawing in the winter firn, that sets the pack's strength: the faceted, sugary **depth hoar** that forms beneath temperature-gradient-rich snow is the weak layer on which most slab avalanches fail, glaciology's most immediate hazard to humans.
:::

::: example The energy cost of melting {#ex-melt-energy}
A clean-glacier surface absorbs a net radiant energy of $100\ \mathrm{W\,m^{-2}}$ through the summer. Find the melt rate in mm of water equivalent per day, and explain why dirty ice melts faster than clean ice at the same latitude.
::: solution
Melting $1\ \mathrm{m^{3}}$ of ice requires $\rho L = 917\times334{,}000 = 3.06\times10^{8}\ \mathrm{J}$, so
$$
\dot m = \frac{100}{3.06\times10^{8}} = 3.3\times10^{-7}\ \mathrm{m\,s^{-1}} = 28\ \mathrm{mm\,water\,equivalent\ per\ day}.
$$
Fresh snow reflects 85–90 per cent of sunlight, bare ice 40–60, dirty ice 20–30: the same $100\ \mathrm{W\,m^{-2}}$ absorbed figure would be three times larger on dirty ice at the same insolation, because absorption is $(1-\alpha)I$. This is the **ice–albedo feedback** in miniature and it is why dust, black carbon and the dark "glacier moss" communities accelerate melt — and why the Greenland melt season now begins weeks earlier than in the 1980s record: the surface darkens, absorbs, melts, exposes more ice, and darkens further.
:::
:::

::: example How much ice the poles hold {#ex-sealevel}
The Antarctic ice sheet contains $26.5\times10^{6}\ \mathrm{km^{3}}$ of ice, Greenland $2.7\times10^{6}\ \mathrm{km^{3}}$. Convert these to sea-level equivalent using the ocean's area $3.61\times10^{8}\ \mathrm{km^{2}}$, and explain why the two numbers carry such different risk.
::: solution
Meltwater volume is $V\times917/1000$: Antarctica $24.3\times10^{6}\ \mathrm{km^{3}}$, Greenland $2.5\times10^{6}\ \mathrm{km^{3}}$. Dividing by the ocean area,
$$
\Delta h = \frac{24.3\times10^{6}}{3.61\times10^{8}} = 67\ \mathrm{m}, \qquad \frac{2.5\times10^{6}}{3.61\times10^{8}} = 6.8\ \mathrm{m},
$$
(the accepted figures, after isostasy and thermal expansion corrections, are about 58 m and 7.4 m). The risk asymmetry is geological: Greenland's ice sits on bedrock mostly **above** sea level and is melting at the surface, while much of West Antarctica's ice — a third of the total, some 3–4 m of sea level — rests hundreds of metres **below** sea level on beds that slope downward inland, so its retreat is self-deepening and ocean-attack-driven rather than sun-driven. When the media say "the West Antarctic ice sheet is the climate problem's sleeper," this geometry, not the volume, is what they mean.
:::
:::

::: warning Firn is not "old snow"
, the ELA is not the snowline, and cold does not mean frozen
Five errors. **Firn is a distinct material** with its own mechanics and hydrology — and its own economics: firn aquifers of liquid water, first mapped in Greenland in 2013, store tens of cubic kilometres of melt that will reach the ocean over decades. **The equilibrium line is not the seasonal snowline**: the ELA is a balance concept that survives the year; the August snowline on a glacier with a massive winter snowfall can sit far below the ELA, and confusing the two misreads every historical glacier photograph. **"Glacier ice is frozen water" inverts the material**: ice is a **rock** that happens to melt — polycrystalline, foliated, deforming by crystal creep like hot metals — and the metaphor of "flowing like water" is quantitatively wrong by ten orders of magnitude in viscosity. **Cold does not mean frozen**: temperate glaciers at the pressure-melting point exist at $0\ ^\circ\mathrm{C}$ with liquid water at every grain boundary, and cold-based ice at $-30\ ^\circ\mathrm{C}$ can still slide on a film of pressure-melted water; the hot/cold classification of glaciers is about **water at the bed**, not about air temperature. **And a glacier's mass is not its volume**: mass balance is measured in water equivalent per square metre per year, and a glacier can lose half its thickness while its area barely changes — the retreat of the world's glaciers this century is mostly **thinning**, invisible to maps that only track snout positions.
:::

::: history
**Alfred Wegener** — eleven years before his continental-drift paper — wrote his 1912 doctoral work on the mechanics of polar ice, calculating the density of firn from the freeboard of ice shelves, a determination of the polar ice budget that anticipated glaciology by half a century; **Auguste Piccard**'s 1930s soundings and the Swiss **Institute for Snow and Avalanche Research** (founded 1936, where **Hans Ulrich Bader** explained depth hoar and the physics of the slab avalanche) built the snow-physics base. The **International Geophysical Year 1957–58** opened the deep drilling era — the Camp Century and Byrd ice cores of the 1960s, the first isotope records by **Cesare Emiliani**'s successors and **Willie Dansgaard**'s Greenland profiles — and **Herron and Langway**'s 1977 firn-densification model gave the field its workhorse equation. **GRIP** (Greenland, 1992) and **EPICA/Dome C** (European Project for Ice Coring in Antarctica, reaching 800 000 years in 2004) proved the air-bubble method at continental scale, and satellite radar and laser altimetry (ICESat, CryoSat) now weigh the ice sheets annually.
:::

The mechanics of the flow this anatomy implies are in [[glaciology/ice-flow]] and [[glaciology/basal-sliding]], the balance terms in [[glaciology/mass-balance]], the ice-sheet scale in [[glaciology/ice-sheets]], the snowpack physics and meltwater hydrology in [[hydrology/snow]] and [[glaciology/mass-balance]], the permafrost counterpart of cold ice in [[glaciology/permafrost]], the isotope palaeothermometry the firn filter degrades in [[palaeoclimate/ice-cores]] and [[palaeoclimate/proxies]], and the mass observations in [[glaciology/observing-ice]].

::: quiz
The density that marks the firn–ice transition (about $830\ \mathrm{kg\,m^{-3}}$) is defined by:
- [x] the closure of the last interconnected pores, isolating the air.
- [ ] the melting point of the grains.
- [ ] the weight of the overlying snow.
- [ ] the onset of crystal deformation.
::: solution
The transition is defined by **pore close-off**: below 830 kg m⁻³ the air passages are open and the firn breathes with the atmosphere; above it the bubbles are sealed and the air record begins. Everything the bubbles are good for — palaeo-atmosphere science — and everything that makes them troublesome — brittle ice in deep drilling — follows from that single sealing event.
:::
:::

::: summary
- Snow densifies in three stages — settling to ~350 kg m⁻³, gravity-driven firn creep, and pore close-off at 830 kg m⁻³ — with timescales from years (maritime) to millennia (cold plateau).
- One cubic metre of close-off firn seals ~95 litres of past atmosphere; below ~650 m the bubbles convert to clathrate hydrates.
- Firn filters the record: diffusion damps the isotope signal, gases disperse, and the gas age lags the ice age by decades to ~2000 years (Δage).
- A glacier's anatomy — accumulation zone, ELA, ablation zone, crevasses, ogives, meltwater drainage — is flow made visible; the ELA is the climate's most sensitive glacier indicator.
- Melt is energy-limited: 100 W m⁻² melts 28 mm w.e. day⁻¹, and the albedo difference between snow, ice and dirty ice triples that at the same sun — the ice–albedo feedback.
- Ice is a rock that melts: a polycrystalline, creeping solid, and its mass balance is a water-equivalent budget, not a map outline.
:::

## Exercises

::: exercise Snow water equivalent {level=1 check="120"}
A snowpitt reveals $1.5\ \mathrm{m}$ of snow of mean density $80\ \mathrm{kg\,m^{-3}}$. Find its water equivalent in mm. (Enter the number.)
::: solution
$1.5\times80 = 120\ \mathrm{kg\,m^{-2}} = 120\ \mathrm{mm}$ water equivalent. The snowpitt — a marked tube, a scale and a balance — remains the global standard for accumulation measurement, and its units (water equivalent) are the currency in which all accumulation, melt and mass balance are quoted.
:::
:::

::: exercise Porosity of firn {level=1 check="62"}
Find the porosity (air volume fraction, in per cent) of firn at $350\ \mathrm{kg\,m^{-3}}$. (Enter the number.)
::: solution
$\phi = 1 - 350/917 = 0.62$, i.e. 62 per cent. Firn at this stage is still two-thirds air — which is why it is soft to drill, transparent to radar, and why the seismic "ice velocity" of a firn aquifer region is a mixture of ice, water and gas that must be modelled as three phases.
:::
:::

::: exercise Ice freeboard {level=1 check="11"}
Find the freeboard fraction of floating glacier ice ($917\ \mathrm{kg\,m^{-3}}$) in seawater ($1025\ \mathrm{kg\,m^{-3}}$), in per cent to the nearest integer.
::: solution
$1 - 917/1025 = 0.105 \approx 11$ per cent. The same arithmetic underlies every satellite measurement of ice **thickness** from freeboard (ICESat and CryoSat), and its inversion — sea-ice thickness from freeboard — is one of the most remarkable remote-sensing products in glaciology, accurate to tens of centimetres only because the snow on the ice must be weighed too.
:::
:::

::: exercise Close-off depth {level=2 check="56"}
In the exponential densification profile $\rho(z) = 917 - 817\,e^{-z/25}$ (metres), find the depth at which close-off density $830\ \mathrm{kg\,m^{-3}}$ is reached, to the nearest metre.
::: solution
$830 = 917 - 817e^{-z/25} \Rightarrow e^{-z/25} = 87/817$, so $z = 25\ln(9.39) = 56\ \mathrm{m}$. The point of the exercise is the **sensitivity**: doubling the scale depth (a colder, drier site) doubles the close-off depth, and the model's exponential is a stand-in for the creep law that makes cold-site firn the deepest archive and the hardest drill.
:::
:::

::: exercise Diffusive damping {level=2 check="0.37"}
A seasonal isotope signal in firn damps as $A = A_0 e^{-z/L}$ with damping length $L = 15\ \mathrm{m}$. Find the amplitude ratio at $15\ \mathrm{m}$ depth (give the decimal to two places).
::: solution
$A/A_0 = e^{-1} = 0.37$. One damping length leaves a third of the signal — which is why shallow firn cores can still be layer-counted by isotopes for a few decades, why the seasonal signal is gone by close-off at typical sites, and why the "annual resolution" claimed for deep ice-core records is a property of the dating model, not of the measured isotope profile.
:::
:::

::: exercise Melt from a warm air mass {level=2 check="14"}
Warm rain at $2\ ^\circ\mathrm{C}$ falls on a glacier at $50\ \mathrm{mm\,day^{-1}}$. Find the additional melt it causes in mm w.e. day⁻¹ beyond its own (zero) heat content, given sensible+latent turbulent fluxes equivalent to $50\ \mathrm{W\,m^{-2}}$ (use $\rho L = 3.06\times10^{8}\ \mathrm{J\,m^{-3}}$). (Enter to the nearest integer.)
::: solution
$50\ \mathrm{W\,m^{-2}} = 4.32\times10^{6}\ \mathrm{J\,m^{-2}\,day^{-1}}$, melting $4.32\times10^{6}/3.06\times10^{8} = 14\ \mathrm{mm}$ of ice per day. Turbulent heat from warm, cloudy, rainy weather — not sunlight — dominates melt on maritime glaciers, which is why the great melt events of Greenland and the European Alps occur under **cloudy** conditions, and why melt forecasts are humidity forecasts as much as temperature forecasts.
:::
:::

::: exercise Air per cubic metre {level=3 check="95"}
Using the close-off porosity of 9.5 per cent, find the volume of air (in litres) sealed in $1\ \mathrm{m^{3}}$ of ice, and the total air sampled by a $200\ \mathrm{m}$ core of $10\ \mathrm{cm}$ diameter. (Enter the litres per cubic metre.)
::: solution
$95\ \mathrm{L}$ per cubic metre; the core volume is $\pi\times0.05^{2}\times200 = 1.57\ \mathrm{m^{3}}$, yielding $\sim150\ \mathrm{L}$ of ancient air — enough for dozens of CO₂, methane and isotope analyses, and the reason ice-core programs are designed around **sample volume** first and depth second. The 200 m core here spans perhaps two centuries of accumulation at a mid-latitude site: the entire industrial-era gas record in a barrel of bubbles.
:::
:::

::: exercise The Δage correction {level=3 check="1000"}
On a cold Antarctic plateau site, accumulation is $60\ \mathrm{mm\,w.e.\,yr^{-1}}$ and close-off occurs at $120\ \mathrm{m}$. Estimate the mean age of the ice at close-off, taking a mean firn density of $500\ \mathrm{kg\,m^{-3}}$ and ignoring thinning, in years. (Enter the number.)
::: solution
$60\ \mathrm{mm\,w.e.\,yr^{-1}} = 60\ \mathrm{kg\,m^{-2}\,yr^{-1}}$, which at $500\ \mathrm{kg\,m^{-3}}$ gives an annual layer thickness of $0.12\ \mathrm{m\,yr^{-1}}$, so the ice at $120\ \mathrm{m}$ fell $120/0.12 = 1000$ years ago. The gas sealed with it is younger still — by roughly **half** the burial time, about 500 years, because the air that seals at depth entered the pores over the whole interval since the snow fell — giving a gas age near 1500 years where the ice records the year 1000 before present. Every ice-core statement "CO₂ was $X$ when temperature was $Y$" is made after subtracting this offset, and the 800-year phase-lag question of the last glacial cycle — does CO₂ lead or lag temperature? — was only answerable once Δage was modelled to within a century.
:::
:::
