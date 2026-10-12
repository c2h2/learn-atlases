About half the land surface of the Northern Hemisphere is covered by snow at the winter maximum, and in the mountains the snowpack is the reservoir that supplies the rivers of the Indus, the Ganges, the Amu Darya, the Colorado, the Columbia, the Murray and the Rhône through the dry summer. A snowpack is a **cold, porous, metamorphosing** body of water stored as ice, and its hydrology is governed by three facts that no other hydrological reservoir shares: it **stores** water for months and releases it over weeks, it **cannot release any of it** until it has first been warmed to $0\ ^\circ\mathrm{C}$ and then filled to its water-holding capacity, and its release is driven by an **energy** supply that varies by an order of magnitude with the **albedo**, which is itself the fastest-changing surface property in nature.

## The snowpack as a reservoir

::: definition Snow water equivalent, density and the cold content {#def-swe}
A snowpack is described by its **snow water equivalent** — the depth of water that the snow would yield if melted —
$$
\mathrm{SWE} = \sum_{i} \frac{\rho_{i}\,d_{i}}{\rho_{\mathrm{w}}},
$$
summed over the layers of density $\rho_i$ and thickness $d_i$ measured in a **snowpit** or with a **density tube**. Fresh snowfall at $-10\ ^\circ\mathrm{C}$ has a density of 50–100 kg m⁻³, so **10 mm of water lies under 100–200 mm of snow** — the "ten-to-one" rule that every forecaster knows and every hydrologist distrusts, because the density of the **seasonal** snowpack at the end of winter is 200–400 kg m⁻³ and its **stratigraphy** records every melt-freeze cycle since it fell. A mid-latitude mountain snowpack at the 1 April maximum has a SWE of 150–400 mm, the Sierra Nevada and the Alps 300–600 mm, and the coastal mountains of Alaska and Norway over 1000 mm.

The pack's **cold content** is the energy required to bring it to $0\ ^\circ\mathrm{C}$, expressed as a depth of melt,
$$
\mathrm{CC} = \frac{\mathrm{SWE}\,c_{\mathrm{i}}\,(0 - T)}{L_{\mathrm{f}}},
$$
with $c_{\mathrm{i}} = 2106\ \mathrm{J\,kg^{-1}\,K^{-1}}$ and $L_{\mathrm{f}} = 334{,}000\ \mathrm{J\,kg^{-1}}$. A 200-mm pack at $-8\ ^\circ\mathrm{C}$ has a cold content of **10 mm**, and a 200-mm pack at $-25\ ^\circ\mathrm{C}$ one of **32 mm** — a quantity of melt energy that must be spent before a single drop reaches the ground, and which in a continental interior is the reason the spring melt begins **days to weeks** later than the temperature record alone suggests.

The **metamorphism** of the snow is what makes the reservoir behave as it does. **Destructive** metamorphism, driven by a small **temperature gradient** and by melt, rounds the grains and **settles** the pack into dense, small-grained **wet** or **melt-freeze** snow with a high **field capacity** for liquid water. **Constructive** (temperature-gradient) metamorphism, driven by a **large** gradient in a cold, dry pack, grows **faceted** grains and **depth hoar** — a coarse, low-density, high-strength-poor layer that is the weak layer of most **slab avalanches** and that, once formed, **persists** through the season. The gradient is set by the **air temperature** and the **base** temperature, so a **thin** pack over **warm** ground in a **cold** air mass is the recipe for depth hoar, and the same is true of a pack that has been **buried** by a cold snap.
:::

::: definition The energy balance and the albedo feedback {#def-snow-energy}
The melt rate of a snowpack follows from its surface energy balance,
$$
\rho_{\mathrm{w}} L_{\mathrm{f}} \frac{\mathrm{d}\mathrm{SWE}}{\mathrm{d}t} = (1-\alpha)S_{\downarrow} + (L_{\downarrow} - L_{\uparrow}) + H + \lambda E + G + \rho_{\mathrm{w}} c_{\mathrm{p}}(T_{\mathrm{r}} - 0)\,\dot{r},
$$
in which the **net shortwave** term dominates in mid-latitudes and supplies 60–90 per cent of the melt energy, the **net longwave** is small and often **negative** on clear nights, the **turbulent** fluxes $H$ and $\lambda E$ are **positive** in wind and in warm dry air and **negative** when the air is colder or more humid than the surface, the **ground heat flux** $G$ is small and positive in spring, and the **rain** term is disproportionately important because each millimetre of $6\ ^\circ\mathrm{C}$ rain delivers enough heat to melt **0.075 mm** of snow in addition to the millimetre it adds.

The **albedo** is the term that changes fastest and matters most: $0.80$–$0.90$ for fresh snow, $0.55$–$0.70$ for old snow, $0.45$–$0.55$ for melting snow, $0.20$–$0.40$ for **dirty**, **dust**- or **black-carbon**-laden snow, and $0.10$–$0.20$ for the ground beneath. Because the melt is proportional to $(1 - \alpha)$, the transition from fresh to old snow **doubles** the absorbed shortwave radiation, and the deposition of **dust** or **black carbon** that lowers the albedo from 0.60 to 0.45 **increases** the melt by **38 per cent** for the same radiation. This is the **snow-albedo feedback**, and it is the reason the observed **advance** of the spring melt date by 2–5 days per decade over the Northern Hemisphere is **larger** than the temperature trend alone predicts, and the reason the **dust** on the snows of the Colorado and the Ganges contributes a **third** of the melt in a dusty year.
:::

::: example A snowpit and the snow water equivalent {#ex-pit}
A snowpit in a 1-m pack gives five layers, each 200 mm thick, with densities of 80, 120, 180, 250 and 320 kg m⁻³ from top to bottom. Find the SWE and the mean density. A second pit 200 m away, dug because the first looked "typical", gives a SWE 45 per cent lower. Explain.
::: solution
$$
\mathrm{SWE} = \frac{0.200\times(80 + 120 + 180 + 250 + 320)}{1000} = \frac{190}{1000} = 0.190\ \mathrm{m} = 190\ \mathrm{mm},
$$
and the mean density is $190/1000 = 190\ \mathrm{kg\,m^{-3}}$.

The 45-per-cent discrepancy is not an error but the **central measurement problem** of snow hydrology. The **spatial variability** of SWE in a mountain catchment is described by a **coefficient of variation** of 30–60 per cent over distances of tens of metres, because the snow is **redistributed** by **wind** into **drifts**, **gullies** and **lee slopes** and **scoured** from **ridges**, **crops** and **trees**, and because the **depth to the ground surface** — which is what the snow fills — is itself variable. The consequence is that a **single** pit is a **sample** with a standard error equal to the coefficient of variation, and that a **catchment** SWE needs **twenty to fifty** pits, or a **transect**, or a **ground-penetrating-radar** or **snow-laboratory** traverse, or an **averaging** basin-scale **snow pillow** of tens of thousands of square metres.

The **observation network** reflects this. A **snow pillow** measures the **weight** of the pack over 10 m² and is the standard in the western United States, but it is **biased** by **drifting**, by **crust** bridging and by **melting** under the pillow in summer. A **snow course** is a set of occupied sites whose **representativeness** decays as the network is cut back for budget — the US SNOTEL network of 600 **snow sensors** and the Canadian, European and Central Asian equivalents all report a **point** that is meant to stand for a **mountain range**. **Passive microwave** satellites (SSM/I, AMSR-E, AMSR2, GPM) retrieve SWE from the **scattering** of the 19- and 37-GHz channels, and work over **flat**, **dry**, **cold** terrain at a 25-km resolution but **saturate** above about 300 mm, are **blind** above the treeline and in **forest**, and are **useless** in mountains. **Radar** (**Sentinel-1**, **NISAR**) measures the **interferometric** phase delay through the pack and retrieves SWE **without** the saturation limit, and is the most promising of the satellite methods. And **LiDAR** and **structure-from-motion** measure the **snow-surface depth** against a snow-free **benchmark** DEM, which is the most accurate method available over complex terrain and the one now used operationally in the Alps and the Rockies.

The **practical** consequence is that the **volume** of water in the world's snowpacks — the number on which the irrigation allocations of a billion people rest — is known to **20–40 per cent** at the catchment scale, and that the **trend** in that volume, which the **GRACE** satellites cannot resolve at the scale of a mountain range, is inferred from the **snowline elevation** and from **model** hindcasts rather than from measurement.
:::
:::

::: widget plot
f: 77.6*(1-x)
x: 0.3, 0.9
y: 7, 56
labels: M\ (\text{mm/day})
caption: The **shortwave** contribution to the melt rate of a snowpack as a function of the surface albedo, for an incoming shortwave flux of $300\ \mathrm{W\,m^{-2}}$ — the summer mean at a mid-latitude mountain site. The melt is $M = (1-\alpha)S_{\downarrow}/(L_{\mathrm{f}}\rho_{\mathrm{w}}) \times 86{,}400$, which gives $77.6\,(1 - \alpha)\ \mathrm{mm\,d^{-1}}$: **54 mm d⁻¹** on dirty snow at an albedo of 0.30 and **8 mm d⁻¹** on fresh snow at 0.90. The curve's **linearity** in $(1-\alpha)$ is the reason the snow-albedo feedback is so strong and so hard to model: a **0.05** change in albedo — the difference between a clean and a lightly dusted pack, or the difference between one **black-carbon** deposition event and none — changes the summer melt by **8 per cent**, and the **sub-grid** variability of the albedo, which no model resolves, is larger than that. The same linearity explains why the **melt** of a **glacier** is so sensitive to **volcanic ash**, **wildfire soot** and **algal** growth (*Chlamydomonas nivalis*, the "watermelon snow" that lowers the albedo to 0.3), and why the **Arctic** sea-ice melt responds to **soot** deposition from boreal forest fires.
:::

::: example Cold content and a rain-on-snow event {#ex-ros}
A snowpack with $150\ \mathrm{mm}$ SWE at a uniform $-10\ ^\circ\mathrm{C}$ receives $100\ \mathrm{mm}$ of rain at $6\ ^\circ\mathrm{C}$ in 24 hours. Find the cold content, the melt contributed by the rain, and the runoff, neglecting the turbulent and radiative fluxes and any infiltration loss. Then explain why this is the most dangerous hydrological event in the cold regions.
::: solution
The cold content, expressed as a depth of melt, is
$$
\mathrm{CC} = \frac{150\times2106\times10}{334{,}000} = 9.5\ \mathrm{mm}.
$$
Each millimetre of $6\ ^\circ\mathrm{C}$ rain releases $c_{\mathrm{p}}\Delta T = 4.186\times6 = 25.1\ \mathrm{J\,g^{-1}}$, which melts $25.1/334 = 0.075\ \mathrm{mm}$ of snow, so $100\ \mathrm{mm}$ of rain melts
$$
100\times0.075 = 7.5\ \mathrm{mm}.
$$
The rain's heat is not enough to remove the cold content, so 9.5 mm of the delivered water **refreezes** inside the pack and the pack's own liquid storage is filled to capacity; the remainder of the rain's 100 mm runs off, together with the 7.5 mm of snow that the rain's heat melted, giving
$$
100 - 9.5 + 7.5 \approx 98\ \mathrm{mm}\ \text{in 24 hours},
$$
a peak discharge an order of magnitude above the winter baseflow.

The event is dangerous for four reasons that act together. The **rain-on-snow** flood has a **higher** peak than the same rainfall on a **bare** catchment, because the rain's heat **melts** the stored snow in addition to delivering its own water, so the **runoff coefficient** can exceed **unity** — a catchment with 150 mm of SWE can deliver more water than the rain that fell on it. The **timing** is the worst: the event occurs in **winter**, when the ground is **frozen** and cannot infiltrate, when the **channels** are ice-covered and their capacity is halved, and when the **population** is indoors and the **warning** systems are least exercised. The **forecast** is the hardest in hydrology, because it requires the **rain–snow transition** to be placed correctly in **elevation** — a $2\ ^\circ\mathrm{C}$ error in the model's freezing level moves the rain line tens of kilometres and doubles or halves the forecast peak — and because the **cold content**, which is the pack's only defence, is **not measured**. And the **frequency** is rising: the number of rain-on-snow events in the western United States, the European Alps and the Canadian Rockies has increased by 30–100 per cent since 1950 as the winter temperature has crossed the freezing threshold, while the **snow water equivalent** available to melt has fallen — a combination that makes the **largest** winter floods **more** frequent and the **spring** floods **less** so.
:::
:::

## Melt, routing and the snowmelt hydrograph

::: definition Degree-day and energy-balance melt models {#def-ddm}
The **degree-day** model is the oldest and still the most widely used melt estimator,
$$
M = \mathrm{DDF}\sum_{i}\max(T_i - T_{\mathrm{b}},\,0),
$$
with the **degree-day factor** DDF typically $2$–$8\ \mathrm{mm\,^{\circ}C^{-1}\,d^{-1}}$ for snow and $5$–$12$ for **ice**, and the base temperature $T_{\mathrm{b}} = 0\ ^\circ\mathrm{C}$. Its success is that the **turbulent** heat flux, which it does not compute, is roughly **proportional** to the air temperature; its failure is that it attributes melt to temperature even when the **radiation** is absent, so it **overestimates** melt on **cold, clear, windy** days and **underestimates** it on **warm, overcast, calm** ones, and its DDF must be **recalibrated** for every site, every season and every **albedo** regime. The **energy-balance** form replaces the DDF with the explicit fluxes and requires **radiation**, **humidity** and **wind**, which are measured at a fraction of the snow stations.

The **routing** of the meltwater through the pack is as important as its production. Meltwater percolates as **matrix flow** through the pore space and as **preferential flow** through **pipes** and **fingers**, is **retained** by the grains up to a **field capacity** of 5–15 per cent by mass, is **refrozen** where it meets a cold layer to form **ice lenses** and **impermeable crusts**, and emerges at the base with a **lag** of hours to **weeks** and an **attenuation** that turns a diurnal melt **pulse** into a smooth baseflow. The **ripeness** — the ratio of the liquid water held to the field capacity — is the state variable that decides whether the next melt increment appears in the river today or in ten days, and a pack is **ripe** only after its cold content is gone **and** its capacity is full, which is why the **onset** of the snowmelt hydrograph is so abrupt and so predictable and its **recession** so long.
:::

::: definition Snow, climate and the timing of water {#def-snow-climate}
The snowpack is the **clearest** and most **consequential** of the observed climate-change signals in the hydrological cycle, and five changes are documented across the Northern Hemisphere: the **spring snowline** has risen and the **snow-covered area** in April has declined by 5–15 per cent since 1970; the **melt onset** has advanced by 2–5 days per decade; the **maximum SWE** has declined by 5–20 per cent over the western United States and central Europe; the **fraction** of winter precipitation falling as **rain** has risen, so that the **cold-season** runoff has increased and the **spring** peak has been **lowered** and **advanced**; and the **rain-on-snow** events have become more frequent. The consequences are **non-linear** in the water resources of snow-fed basins: the **annual** runoff may change little while the **seasonal** distribution changes by 30–50 per cent, and the **reservoir** that the snowpack provided free of charge is replaced by a **requirement** for storage that most basins do not have.

For **glacier-fed** rivers the transient is the **"peak water"** phenomenon: as a glacier wastes, its melt **increases** at first because the ice that was below the equilibrium line is exposed to ablation, reaches a **maximum** after decades, and then **declines** irreversibly as the reservoir disappears. The Indus, the Amu Darya, the Helmand and the creeks of the Andean altiplano are on the **rising** limb; parts of the European Alps, the Caucasus and the North Cascades have **passed** the peak; and the timing of the peak is the single most important unquantified number in the water-resources assessment of High Asia.
:::

::: example Degree-day melt and the melt season {#ex-ddm}
A snowpack with $320\ \mathrm{mm}$ SWE on 1 April has a cold content of $14\ \mathrm{mm}$ and a field capacity of $18\ \mathrm{mm}$. The degree-day factor is $4.5\ \mathrm{mm\,^{\circ}C^{-1}\,d^{-1}}$ and the melt season accumulates $180\ ^\circ\mathrm{C}$-days of positive temperature. Find the total melt, the date at which the pack first contributes runoff (assuming the degree-days accumulate uniformly over 120 days), and the depth of snow that survives.
::: solution
The total melt is
$$
M = 4.5\times180 = 810\ \mathrm{mm},
$$
far more than the 320 mm available, so the pack is **entirely consumed** and the melt is **limited by the supply**, not by the energy. The energy required to bring the pack to the point of contributing runoff is
$$
14 + 18 = 32\ \mathrm{mm},
$$
which at a rate of $4.5\times(180/120) = 6.75\ \mathrm{mm\,d^{-1}}$ takes $32/6.75 = 4.7$ days, and the pack itself is exhausted after
$$
\frac{320 + 32}{6.75} = 52\ \text{days}, \quad \text{that is, about 22 May}.
$$
The remaining $120 - 52 = 68$ days of melt season deliver **rain**, not snowmelt.

Three features of the arithmetic are the whole of snowmelt hydrology. The **cold content and the field capacity together** (32 mm here) are a **threshold** that must be spent before any water appears, so the **first** melt of the season produces **no** runoff and the **observed** rise of the hydrograph is **later** than the first warm spell by days to weeks. The **melt is supply-limited** for most of the season: the energy available (810 mm) is two to three times the snow available (320 mm), so the melt **rate** is set by the **snow line**, which **retreats upslope**, and not by the weather — which is why a snowmelt hydrograph's **recession** is so smooth and so nearly independent of the rainfall. And the **runoff volume** is insensitive to the melt **rate**: doubling the DDF changes the **timing** of the hydrograph by a factor of two and its **volume** not at all, which is why the **water resources** of a snow-fed basin are far more robust to a **melt-model** error than to a **precipitation** or a **snowline** error.

The corollary is the **elevation** effect that dominates the climate response. Above the **elevated snowline** the pack survives the summer and the basin contributes **nothing**; below it the pack is gone by June and the basin contributes its **whole** SWE in **April and May**. A warming that raises the snowline by 200 m therefore **removes** the high catchment from the spring contribution and **adds** it to the winter rain contribution, and the **annual** volume may be unchanged while the **July** flow — the one the irrigation and the ecosystems depend on — falls by half.
:::
:::

::: example The albedo transition and the melt season length {#ex-albedo}
A snowpack with an albedo of 0.85 is exposed to a mean summer shortwave flux of $300\ \mathrm{W\,m^{-2}}$. After a melt-freeze cycle the albedo falls to 0.55, and after a dust layer is deposited to 0.42. Find the shortwave-driven melt rate in each case, and the ratio of the length of the melt season required to consume a 300-mm pack in the first and last states.
::: solution
With $M = (1-\alpha)S_{\downarrow}\times86{,}400/L_{\mathrm{f}}\rho_{\mathrm{w}}$,
$$
M(0.85) = 77.6\times0.15 = 11.6\ \mathrm{mm\,d^{-1}}, \quad
M(0.55) = 77.6\times0.45 = 34.9\ \mathrm{mm\,d^{-1}}, \quad
M(0.42) = 77.6\times0.58 = 45.0\ \mathrm{mm\,d^{-1}} .
$$
The 300-mm pack would be consumed in $300/11.6 = 26$ days at the first albedo and $300/45.0 = 6.7$ days at the last, a ratio of **3.9**.

The calculation is of course a **thought experiment**, because a pack melting at 45 mm d⁻¹ does not stay at 0.42 — it **ages**, **wet** snow **clumps** and its albedo falls further, then the **bare ground** appears and the albedo collapses to 0.15. But the **amplification** is real and it is the mechanism of every **accelerated** melt season on record. A **dust** layer that lowers the albedo from 0.55 to 0.42 shortens the melt season by **29 per cent** for the same radiation, and the **same** dust layer in a **cloudy** year, where the shortwave flux is 180 rather than 300 W m⁻², has **half** the effect — which is why the dust forcing of snowmelt is **strongest** in the **sunniest** basins, the Colorado and the Great Basin, and weakest in the maritime ranges.

The **black-carbon** version of the same arithmetic is the more consequential. The deposition of **30 ng g⁻¹** of black carbon on snow lowers the albedo by about **0.03**, which in the Sierra Nevada and the Colorado Rockies advances the melt onset by **5–15 days** and reduces the summer SWE by **5–10 per cent** — an effect comparable to a century of CO₂ forcing in those basins, and one that is **reversible** on the timescale of an emissions policy because black carbon has an atmospheric lifetime of **days**. The **dust** version is not reversible, because the dust supply is set by the **drought** and the **land use** of the source desert, and the observed **increase** of dust deposition in the Colorado over the last century is one of the least-appreciated climate-change signals in hydrology.
:::
:::

::: warning A snow measurement is a point, a snow model is a guess, and a snowline is the only honest number
Seven errors dominate. **The point-to-catchment error**: a single snow course or SNOTEL site has a **coefficient of variation** of 30–60 per cent against the catchment mean, and the error is **not reduced** by measuring more often at the same site — only by measuring at more **places**, which no network does. **The elevation bias**: the network sits in the **valleys**, so the **mean elevation** of the sites is 300–800 m below the catchment mean, and the extrapolation of a **lapse-rate** SWE to the unmeasured high country is a **model**, not a measurement. **The forest**: throughfall, canopy interception, canopy-sublimation of 10–30 per cent of the snowfall, and the **shading** and **longwave** emission of the canopy all make a **forested** snowpack a different animal, and every satellite retrieval is **blind** beneath more than about 40 per cent canopy cover. **The albedo parameterisation**: every snow model must **guess** the albedo from the **age**, the **density** and the **melt** of the pack, and the guesses differ by 0.05–0.15 — an order of magnitude more than the black-carbon effect the same models are asked to resolve. **The cold content**: it is **never measured**, and models initialise it from an **air temperature** that is uncorrelated with the pack's own temperature at depth, so the **timing** of the melt onset — the single most important forecast variable — is a **model artefact** in most systems. **The rain–snow transition**: a $2\ ^\circ\mathrm{C}$ error in the modelled **freezing level** moves the rain line by tens of kilometres and changes the forecast peak by a factor of two, and the **wet-bulb** and **melting-layer** physics that decide it are at the limit of what a reanalysis provides. **And the assumption that the snowline is the SWE**: the **snow-covered area** is the one snow variable that satellites measure **well** and that correlates with the seasonal water supply, which is why it is used for **forecasting** — but the correlation is **strong** in a **dry** year and **weak** in a **wet** year, because a small snow-covered area can hide a very deep pack in the high catchments, and the best forecasts use the **area** and the **SWE at a reference elevation** together.
:::

::: history
The **United States Soil Conservation Service** began the first institutional **snow survey** in 1935, and the **Snow Survey and Water Supply Forecasting** programme that grew from it, together with the equivalent networks of the **Soviet Union**, **Japan** and the **European** alpine states, remains the world's largest operational source of snow water. **Martz** (Martz) published the first **degree-day** melt computations from Canadian records in 1929, and the **Swiss** water-resources school of **Aschwanden** (Aschwanden) built the first **conceptual snowmelt-runoff** model in the 1930s; **Bergström** (Bergström) gave the **HBV** model its snow routine in 1976. **Benson** (Benson) built the **Alaskan** snow-science programme and the snow, water and atmosphere observation framework in the 1950s and 1960s, and the **Cold Regions Research and Engineering Laboratory** the physical snow science of the same decades. **Mellor** (Mellor) published the **SRM** snowmelt model in 1977, **Armstrong and Brun** (Armstrong) the *Snow Handbook* and the **SN37** energy-balance model in 1995, **Jordan** (Jordan) the **SNTHERM** physical snow model in 1991, **Bartelt and Lehning** (Lehning) **SNOWPACK** in 2002, and **Sturm, Holmgren and Liston** (Sturm) the **field guide to the study of snow** and its six-layer **classification** in 1995. **Rango and the NASA group** (Rango) founded **passive-microwave** retrieval of snow water equivalent in the 1970s, **Dozier** (Dozier) the **spectral** snow-cover methods in 1980, **Hall, Riggs and the MODIS group** (Hall) the **MODIS** and **IMS** snow-cover records in 1996-2001, and **Warren and Brandt** (Warren) and **Briegleb, Wiscombe and the SNICAR group** (Briegleb) the **radiative transfer** of light-absorbing impurities. **Clarke and Noone** (Clarke) established the physics of **light absorption by black carbon** in snow in 1985, **Malm and the Colorado dust programme** (Malm) the **dust** melt attribution, and **Painter and Dozier** (Painter) the **Sierra Nevada** black-carbon attribution in 2007. **Marks, Fassnacht, Cline and the Colorado energy-balance school** (Marks) made the reference **snow energy-balance** measurements of the 1990s, **Liston and Sturm** (Liston) the **distributed** snow models, **Mote** (Mote) documented the **decline** of Western US snow in 2003-2006, **Barnett, Adam and Lettenmaier** (Barnett) the **twenty-first-century** water implications in 2005, **Immerzeel, van Beek and Bierkens** (Immerzeel) the **peak water** of glacier-fed rivers in 2010, and **Musselman** (Musselman) the **accelerating** melt onset and the increase of **rain-on-snow** floods in 2017-2018.
:::

The physics of the snow grain and the firn is in [[glaciology/snow-firn]] and the mass balance of the pack in [[glaciology/mass-balance]], the precipitation that forms the pack in [[hydrology/precipitation-evaporation]] and [[meteorology/clouds-precipitation]], the fronts that deliver it in [[meteorology/fronts-cyclones]] and its thermodynamics in [[meteorology/stability]], the meltwater hydrograph in [[hydrology/runoff]], the winter floods in [[hydrology/floods-droughts]] and [[natural-hazards/floods]], the recharge of the aquifers in [[hydrology/groundwater-flow]], the ice-sheet mass balance in [[glaciology/ice-sheets]], the observation methods in [[remote-sensing/radar-lidar]] and [[remote-sensing/thermal-microwave]], the glacial landforms the meltwater builds in [[geomorphology/glacial-landscapes]], the water resource in [[earth-resources/groundwater-resources]], and the Holocene snowline record in [[palaeoclimate/holocene]].

::: quiz
A snowpack's cold content is 12 mm and its field capacity is 15 mm. Ten millimetres of melt occurs in a day. What reaches the stream?
- [ ] 10 mm.
- [x] Nothing, because the cold content has not been used up.
- [ ] 0.5 mm.
- [ ] Depends only on the rainfall that day.
::: solution
The melt water first refreezes until the pack is isothermal at $0\ ^\circ\mathrm{C}$, and only then begins to fill the pore space. With 12 mm of cold content still to spend, 10 mm of melt is entirely **refrozen** and nothing reaches the stream. Only after both thresholds — 27 mm in all — has been satisfied does the eleventh millimetre appear.
:::
:::

::: summary
- A snowpack is a cold reservoir described by its SWE, its cold content and its ripeness; none of the three can release water until the previous one is spent.
- The shortwave term supplies most of the melt energy and is proportional to $1-\alpha$, so the albedo — which changes from 0.9 to 0.4 in a week — dominates the melt season.
- Spatial variability of SWE is 30–60 per cent over tens of metres, so the world's snow water is known far less well than its rainfall.
- Degree-day melt works because the turbulent flux is roughly proportional to temperature, and fails on cold windy and warm calm days; the melt is supply-limited for most of the season, so the volume is robust and the timing is not.
- Rain-on-snow is the most dangerous cold-region flood because the runoff coefficient can exceed one and the event falls when the ground is frozen and the channels are iced.
- The snowline is rising and the melt is starting earlier; for glacier-fed rivers this first raises and then destroys the summer flow — the "peak water" transient.
:::

## Exercises

::: exercise Snow ratio {level=1 check="12"}
Find the snow water equivalent of 150 mm of fresh snow at a density of $80\ \mathrm{kg\,m^{-3}}$.
::: solution
$\mathrm{SWE} = 150\times80/1000 = 12\ \mathrm{mm}$. The **twelve-to-one** ratio is the reason a 150-mm snowfall — a headline event — adds only 12 mm to a reservoir, and why the **density**, not the depth, is what the water manager needs.
:::
:::

::: exercise Cold content {level=1 check="6.3"}
Find the cold content, in millimetres of melt, of a 250-mm SWE pack at a uniform $-5\ ^\circ\mathrm{C}$.
::: solution
$\mathrm{CC} = 250\times2106\times5/334{,}000 = 6.3\ \mathrm{mm}$. A cold, **deep** pack has a larger cold content than a warm, **shallow** one, and the cold content is the reason a **continental** snowpack melts later than a **maritime** one of the same SWE.
:::
:::

::: exercise Melt energy {level=1 check="23"}
Find the melt rate in mm d⁻¹ supplied by a net energy flux of $90\ \mathrm{W\,m^{-2}}$.
::: solution
$M = 90\times86{,}400/334{,}000 = 23\ \mathrm{mm\,d^{-1}}$. A useful rule of thumb: **$10\ \mathrm{W\,m^{-2}}$ melts about $2.6\ \mathrm{mm}$ a day**, so the whole of a mid-latitude snowmelt season is contained in a handful of tens of watts per square metre.
:::
:::

::: exercise Degree-day melt {level=2 check="315"}
With a degree-day factor of $3.5\ \mathrm{mm\,^{\circ}C^{-1}\,d^{-1}}$ and a melt season of $90\ ^\circ\mathrm{C}$-days, find the melt, and the fraction of a 250-mm SWE pack that it consumes.
::: solution
$M = 3.5\times90 = 315\ \mathrm{mm}$, which is **126 per cent** of the pack — the melt is **supply-limited**, the pack is gone by midsummer, and the extra energy goes into melting the **snow at higher elevation** as the snowline retreats. In a **cold** year the same energy might consume only half the pack, and the **residual** becomes the **accumulation area** of a glacier.
:::
:::

::: exercise Albedo and dust {level=2 check="1.38"}
A snowpack's albedo falls from 0.60 to 0.44 after a dust deposition. Find the factor by which the absorbed shortwave radiation, and hence the shortwave melt, increases.
::: solution
$(1 - 0.44)/(1 - 0.60) = 0.56/0.40 = 1.38$, a **38 per cent** increase. The same 0.16 change in albedo at a **high** starting albedo (0.90 to 0.74) increases the melt by **160 per cent**, which is why a single dust or black-carbon event on **fresh** snow matters far more than the same event on **old** snow — and why the **timing** of the deposition, not only its amount, decides the effect on the seasonal melt.
:::
:::

::: exercise Rain on snow {level=2 check="0.15"}
How much snow does each millimetre of $12\ ^\circ\mathrm{C}$ rain melt, in millimetres?
::: solution
$4.186\times12/334 = 0.15\ \mathrm{mm}$. A warm rain is therefore a **melt amplifier**: $100\ \mathrm{mm}$ of $12\ ^\circ\mathrm{C}$ rain delivers $100\ \mathrm{mm}$ of water **plus** $15\ \mathrm{mm}$ of melt, and if the pack's cold content is less than 15 mm the runoff coefficient exceeds **1.15**.
:::
:::

::: exercise The snowline and the water supply {level=3 check="0.33"}
A catchment of 2000 m to 3500 m has a linearly distributed area and a snowline that on 1 July stands at 2500 m in an average year and at 3000 m in a dry year. Find the fraction of the catchment that still holds snow in each year, and the fraction of the **snowmelt-contributing** area lost in the dry year.
::: solution
With the area uniform in elevation between 2000 and 3500 m, the fraction **below** the snowline — the part that has already contributed its melt — is $(z_{\mathrm{s}} - 2000)/1500$, so the fraction still holding snow is
$$
f(2500) = \frac{3500 - 2500}{1500} = 0.67, \qquad f(3000) = \frac{3500 - 3000}{1500} = 0.33 .
$$
The dry year has **half** the snow-covered area, and the area that has already contributed its melt has risen from 33 to 67 per cent — a **doubling** of the melt volume delivered by 1 July.

The arithmetic is the reason the **snowline elevation** on a single date is such a good **forecast** variable and such a poor **volume** estimate. It is a good forecast variable because the melt is **supply-limited**, so the area that has melted is very nearly the area that **will** melt, and the **volume** already delivered is nearly proportional to the area. It is a poor volume estimate because the **SWE per unit area** varies by a factor of three with **aspect**, **elevation** and **exposure**, so two years with the same snowline can hold volumes that differ by 50 per cent — and the operational forecasts of the western United States, which combine the **snow-covered area** with a **SWE at a reference elevation**, are built on exactly this complementarity.

The **climate** consequence follows directly. A 300-m rise of the summer snowline removes the **upper third** of the catchment from the melt contribution and converts its winter precipitation from **snow** to **rain**, so the **annual** volume may be unchanged while the **July** flow — the water that the irrigation and the fish depend on — is halved. This is the mechanism behind every projection of a **30–50 per cent** decline in late-summer flow for the Colorado, the Columbia, the Indus and the Murray, and it is a **timing** effect that no **desalination**, **efficiency** or **storage** policy can address except by **storing** the winter water.
:::
:::

::: exercise Peak water {level=3 check="2.5"}
A glacier's melt is modelled as $M = kA_0\,(0.5 + 0.10\,\Delta T)(1 - 0.10\,\Delta T)$, where the first factor is the **fraction of the original glacier area that lies below the equilibrium line** and the second is the **fraction of the original area that still carries ice**, both changing linearly with the warming $\Delta T$. Find the warming at which the melt is a maximum and the melt at that point relative to the present.
::: solution
Expanding,
$$
\frac{M}{kA_0} = 0.5 + 0.05\,\Delta T - 0.01\,\Delta T^{2}, \qquad
\frac{\mathrm{d}}{\mathrm{d}\Delta T} = 0.05 - 0.02\,\Delta T = 0 \;\Longrightarrow\; \Delta T = 2.5\ \mathrm{K},
$$
and $M(2.5)/M(0) = 0.75\times0.75/0.5 = 1.13$ — the melt rises by only **13 per cent** before it turns over.

The mechanism is the competition between two effects with opposite signs. Warming raises the **equilibrium line**, which puts a **larger fraction** of the remaining ice into the ablation zone and warms each metre of it, and it **shrinks** the glacier, which removes ice from the system. Early in the warming the first effect wins and the melt rises; once the glacier has lost enough area the second wins and the melt falls. The **amplitude** of the "peak water" hump is set by the ratio of the two coefficients, and for the parameters above the hump is only 13 per cent — which is the honest answer for most basins and a **far smaller** number than the public and the policy debate usually assume.

The **timing** of the peak depends on the glacier's **topography** far more than on the emissions pathway: a glacier spread over a **narrow** elevation band exhausts its ablation-area gain **early** and declines **fast**, and one spread over **2500 m** peaks **late** and **higher**. For the large glaciers of High Asia the projections put the peak between **2040 and 2060** under moderate warming, and for the small glaciers of the European Alps, the North Cascades and the tropical Andes it has **already passed** — which is why the water problem of the Indus is a problem of **2050** and the water problem of the Rhône and the Vilcanota is a problem of **today**.
:::
:::
