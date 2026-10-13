The atmosphere holds nine days of rain. That single number organises the entire hydrological cycle: because the atmospheric reservoir is so small relative to the fluxes through it, the global water cycle is a throughput system — a conveyor, not a reservoir — and its speed, $5\times10^{5}\ \mathrm{km^{3}}$ of water distilled and rained out every year, means that almost every molecule of water you drink has crossed an ocean, ridden a thermal, and fallen as rain within the last few weeks. Water is the climate system's working fluid: it moves half the sun's captured energy as latent heat, its clouds set the radiation budget, its ice defines the albedo, and its liquid form is the only substance that connects the atmosphere, the rocks and the biosphere in a single daily budget.

## The global budget

::: definition The global water cycle by the numbers {#def-budget}
The present-day cycle, in the consensus of the ocean-salinity, river-gauge and isotope budgets, runs as follows. Over the ice-free globe ($4.95\times10^{8}\ \mathrm{km^{2}}$) precipitation averages $1020\ \mathrm{mm\,yr^{-1}}$ ($505{,}000\ \mathrm{km^{3}\,yr^{-1}}$, $2.8\ \mathrm{mm\,d^{-1}}$); over the ocean $1155\ \mathrm{mm\,yr^{-1}}$ of rain against $1269\ \mathrm{mm\,yr^{-1}}$ of evaporation, the $114\ \mathrm{mm\,yr^{-1}}$ deficit delivered by the rivers; over the land $657\ \mathrm{mm\,yr^{-1}}$ of rain, of which $351$ returns by evapotranspiration and $306$ — one third — becomes river runoff. The reservoirs and their residence times tell the story of the cycle's inertia: the ocean holds $1.33\times10^{9}\ \mathrm{km^{3}}$ and turns over in $4000$ years, ice sheets $2.4\times10^{7}\ \mathrm{km^{3}}$ and millennia, groundwater $2.3\times10^{7}\ \mathrm{km^{3}}$ and centuries to hundreds of centuries, the atmosphere $12{,}900\ \mathrm{km^{3}}$ and nine days, rivers $2000\ \mathrm{km^{3}}$ and three weeks, soil moisture $16{,}500\ \mathrm{km^{3}}$ and two months. Two thirds of the rain that falls on land came from the ocean, and one third from the land's own evapotranspiration — the **recycling ratio** that makes deforestation and irrigation regional climate problems rather than local ones.
:::

::: example Residence times {#ex-residence}
Find the residence time of water in the rivers (storage $2000\ \mathrm{km^{3}}$, discharge $41{,}000\ \mathrm{km^{3}\,yr^{-1}}$) and in the atmosphere, and explain why the atmospheric number makes drought forecasting a problem of circulation rather than of storage.
::: solution
$$
\tau_{\mathrm{riv}} = \frac{2000}{41{,}000}\times365 = 18\ \mathrm{days}, \qquad \tau_{\mathrm{atm}} = \frac{12{,}900}{505{,}000}\times365 = 9\ \mathrm{days}.
$$
A river catchment empties its stored water in three weeks: there is no such thing as a multi-year drought caused by "last year's rain not yet arriving" in a river-fed system — a drought is a **persistent failure of the nine-day conveyor**, a circulation pattern that will not deliver storms, layered on top of whatever the soil and snowpack remembered. This is the physical basis of the distinction between meteorological drought (precipitation deficit), agricultural drought (soil moisture) and hydrological drought (river flow): three different reservoirs with residence times of weeks, months and months, each decoupling from the others on its own clock.
:::
:::

## Evaporation: the energy limit and the water limit

::: definition The combination equation and the Budyko framework {#def-evaporation}
Evaporation is the atmosphere's largest single use of surface energy — about a quarter of all absorbed sunlight, $88\ \mathrm{W\,m^{-2}}$ globally as latent heat against $24\ \mathrm{W\,m^{-2}}$ of sensible heat — and it is set by two independent demands. The **energy limit**: with unlimited water, evaporation rises to the rate at which net energy can be supplied, $\lambda E \approx \alpha\,(\Delta/(\Delta+\gamma))\,(R_n-G)$, the **Penman equation** (1948) combining the thermodynamic partition $\Delta/(\Delta+\gamma)$ with the aerodynamic removal of vapour; over well-watered surfaces the empirical **Priestley–Taylor** coefficient $\alpha = 1.26$ captures the extra evaporation that horizontal advection of dry air adds to the local energy budget. The **water limit**: as soil moisture falls below a critical value the stomata close and the surface dries, evaporation becomes supply-limited, and the Bowen ratio climbs from $0.3$ to $10$. The **Budyko framework** organises the whole: the long-term evaporation ratio $ET/P$ is a function of the aridity index $PET/P$ alone, rising from the energy-limited $ET \to PET$ in humid climates to the water-limited $ET \to P$ in deserts, with catchments around the world falling within a narrow band of the curve — one of the cleanest emergent laws in geography, and the reason the predicted hydrological response to climate change is bounded even where the models disagree.
:::

::: example From radiation to millimetres {#ex-et}
A wetland receives a net radiation of $480\ \mathrm{W\,m^{-2}}$, conducts $40\ \mathrm{W\,m^{-2}}$ into the ground, and is well supplied with water; take $\Delta/(\Delta+\gamma) = 0.80$ and use the Priestley–Taylor form with $\alpha = 1.26$. Find the evaporation in $\mathrm{mm\,d^{-1}}$ and the lake-level fall in a cloudless week.
::: solution
$$
\lambda E = 1.26\times0.80\times(480-40) = 443\ \mathrm{W\,m^{-2}} \;\Longrightarrow\; E = \frac{443}{2.45\times10^{6}}\times86{,}400\times10^{3} = 15.6\ \mathrm{mm\,d^{-1}} .
$$
A week of this falls the lake $11\ \mathrm{cm}$ — and this is the quiet crisis of reservoirs and terminal lakes in arid regions: a eutrophic, dark, warm water surface evaporates a centimetre a day, several times the pan-coefficient rule of thumb, and the design evaporation of a Sahel or Arizona reservoir is larger than its seepage and often larger than its managed losses. The same arithmetic inverted explains why irrigated deserts cool: the $443\ \mathrm{W\,m^{-2}}$ that a bare desert spends on heating the air, a rice paddy spends on the ocean's vapour.
:::
:::

::: widget plot
f: 1+x-exp(ln(1+exp(3.7*ln(x)))/3.7)
x: 0.2, 5
y: 0, 1.2
labels: ET/P
caption: The Budyko curve — long-term evaporation fraction $ET/P$ versus aridity index $PET/P$ (the form $\Phi = 1 + x - (1+x^{\omega})^{1/\omega}$ with $\omega = 3.7$). In humid climates ($x < 1$) evaporation follows the energy supply, $ET \to PET$; in arid climates ($x > 1$) it follows the water supply, $ET \to P$; the curve passes through $ET/P \approx 0.8$ at the pivot $x = 1$. Real catchments scatter around this line by a few per cent — an emergent law of the landscape-atmosphere system, and the reason predictions of how a basin's water yield changes with climate are tightly bounded even when precipitation projections are not.
:::

## Recycling, rivers of heaven, and the isotope microscope

::: definition Precipitation recycling and the isotopic tracers {#def-recycling}
Of the $88{,}000\ \mathrm{km^{3}}$ of rain that falls on land, roughly $29{,}000\ \mathrm{km^{3}}$ — one third — was evaporated by the land itself: the **recycling ratio** averages $0.3$ globally but reaches $0.5$–$0.6$ over the Amazon and the Congo, where the forests pump half their own rainfall and the dry-season rivers of vapour returning from the forest to the Andes supply the rain that keeps the forest alive. The cycle is legible because nature labels its water: the **stable isotopes** $^{18}\mathrm{O}$ and D fractionate at every phase change — evaporation prefers the light molecule, condensation removes the heavy one preferentially — so rain is progressively depleted downstream of its source, by roughly $0.5\permil$ in $\delta^{18}\mathrm{O}$ per $100\ \mathrm{m}$ of elevation (the **altitude effect**), by several permil per degree of condensation temperature (the **temperature effect** that calibrates the ice-core thermometers of [[palaeoclimate/ice-cores]]), and along the **global meteoric water line** $\delta D = 8\,\delta^{18}\mathrm{O} + 10$ whose intercept, the **deuterium excess**, fingerprints the humidity and sea-surface temperature of the source ocean. Isotopes turn the whole cycle into a traced experiment: where the moisture came from, how much rainout occurred before it fell, and what temperature it condensed at — the tools that let the hydrologist separate snowmelt from rain in a flood and the palaeoclimatologist read a monsoon from a speleothem.
:::

::: example Reading a moisture history {#ex-isotope}
Moisture arrives at a valley station with $\delta^{18}\mathrm{O} = -4\permil$. It is lifted $2000\ \mathrm{m}$ up a windward slope and rains out to $40$ per cent of its original vapour amount. Estimate the $\delta^{18}\mathrm{O}$ of the vapour remaining at the summit assuming a Rayleigh distillation with effective fractionation $\varepsilon^{*} = 10\permil$, and say what the residual deuterium excess would tell you.
::: solution
Rayleigh distillation gives $\delta = \delta_0 - \varepsilon^{*}\ln f$, with $f = 0.4$ the remaining fraction:
$$
\delta = -4 - 10\times\ln 0.4 = -4 + 9.2 = -13.2\permil .
$$
The rain collected along the way is heavier than the residual vapour at every instant, so the valley's storm-average rain sits near $-8$ to $-9\permil$ and the summit's near $-14$: the observed steepening of isotopic composition with elevation is the fingerprint of progressive rainout, and the arithmetic explains why the highest stations record the most extreme values. The **deuterium excess** of the vapour — the deviation from the slope-8 line — is set at evaporation and nearly conserved thereafter, so a summit rain with excess near $10\permil$ came from a normal oceanic source, while one with excess $18\permil$ was recycled from a cold, dry continental source: the isotope microscope reads the moisture's biography, not just its temperature.
:::
:::

## Humans in the cycle

::: definition Appropriation, green and blue water, and the engineered cycle {#def-humans}
Humanity diverts a large fraction of the land's accessible water: **green water** — the $351\ \mathrm{mm\,yr^{-1}}$ of precipitation evapotranspired from soils, which is all rain-fed agriculture and half the planet's food — and **blue water** — the runoff in rivers and shallow groundwater, of which roughly $2800\ \mathrm{km^{3}\,yr^{-1}}$ is withdrawn (two thirds for irrigation) out of a accessible flow of $9000$–$14{,}000\ \mathrm{km^{3}\,yr^{-1}}$, with **consumptive** use (evaporated and not returned) of some $2000\ \mathrm{km^{3}}$: a third to a half of accessible runoff is already spoken for, and in the Indus, North China, Colorado and Arabian basins the fraction exceeds one. The engineered cycle has three visible signatures: groundwater tables falling metres per year where fossil water is mined (the High Plains, the North China Plain, the Central Valley — a stored millennium spent in a generation), river flow exhausted before the sea (the Colorado, the Yellow, the Murray in low years), and terminal lakes shrinking (the Aral, the Urmia, the Dead Sea) — while the same cycle's extremes are amplified by warming at the Clausius–Clapeyron rate of $7\ \mathrm{per\ cent\ per\ kelvin}$ in precipitable water, which is why the heaviest daily rains are setting records worldwide even where annual totals fall. The hydrological cycle under climate change is not simply "wet gets wetter": precipitation itself rises only $2$–$3$ per cent per kelvin — the energy constraint of [[climate-change/responses]] — so the **efficiency** of the pump falls even as its bursts intensify, and the honest summary is a cycle that is more volatile, more extreme, and in the subtropics, drier.
:::

::: example Groundwater mining {#ex-fossil}
An aquifer under an irrigated plain holds $2000\ \mathrm{km^{3}}$ of recoverable fossil water at a water-table depth where pumping is economic, and irrigation consumes $10\ \mathrm{km^{3}\,yr^{-1}}$ against a natural recharge of $1.5\ \mathrm{km^{3}\,yr^{-1}}$. Find the mining lifetime, the drawdown rate for a $2000\ \mathrm{km^{2}}$ plain with specific yield $0.15$, and explain why the "peak water" of an aquifer is a harder problem than peak oil.
::: solution
The net mining rate is $8.5\ \mathrm{km^{3}\,yr^{-1}}$, so the resource lasts $2000/8.5 \approx 235$ years at constant rate — less in practice, because drawdown raises pumping cost and deep aquifers drain slowly. The water-table fall is
$$
\frac{8.5\ \mathrm{km^{3}\,yr^{-1}}}{2000\ \mathrm{km^{2}}\times0.15} = 0.028\ \mathrm{km\,yr^{-1}} \approx 2.8\ \mathrm{m\,yr^{-1}} .
$$
Two to three metres a year is the observed rate in the North China Plain and the High Plains: wells deepen, energy costs climb, land subsides by metres, and coastal aquifers intrude with salt. Aquifer depletion is harder than oil because it is invisible, because the subsidy is agricultural and therefore politically untouchable, and because the adjustment — ceasing irrigation — has no substitute: there is no renewable "biofuel" for food grown in an arid basin, which is why the map of fossil-aquifer mining is, in the long run, the map of the world's most fragile breadbaskets.
:::
:::

::: warning The water cycle is not the drinking-water cycle, "water shortage" is usually a governance statement, and 7 % per kelvin is not a 7 % rainfall increase
Five errors. **The cycle's numbers are fluxes, not resources**: the world turns over $500{,}000\ \mathrm{km^{3}}$ a year and uses a thousandth of it, yet "water shortage" is real because the flux falls where the people are not, arrives in the wrong season, or arrives as a flood — shortage is a mismatch in time, place and quality, and dams and institutions are the mismatch's repair kit. **Evapotranspiration dominates runoff**: two thirds of land precipitation returns to the air; judging a basin's health by river flow alone misses the food system, which lives on the evapotranspired two thirds (green water). **Clausius–Clapeyron is a statement about the atmosphere's capacity, not about rain**: precipitable water rises $7\ \mathrm{per\ cent\ per\ K}$ but precipitation only $2$–$3$ per cent, because the energy budget limits the mean updraught — the two facts together mean storms more intense at fixed dynamics, and the "wet gets wetter" slogan holds only in the deep tropics and not at all in the seasonally dry subtropics. **Groundwater is not a loan from the future but a one-time asset with a maintenance cost**: the drawdown arithmetic above shows the cost rising as the resource is used, and "unrenewable" is the honest word for fossil aquifers. **And recycled moisture matters at the scale of policy**: a third of continental rain is evaporated by the land itself, so large-scale deforestation or irrigation changes rainfall hundreds to thousands of kilometres downwind — the Amazon–Andes water pipeline being the canonical, and threatened, example.
:::

::: history
The quantitative cycle begins with **John Dalton**'s evaporation law of 1803 and the evaporation pans that followed it; **Howard L. Penman**'s 1948 combination equation unified the energy and aerodynamic views, and **W. R. (Bill) Priestley** and **R. J. (John) Taylor**'s 1972 coefficient distilled the wet-surface limit. **M. I. Budyko**'s 1956–1974 framework made the long-term water–energy balance of catchments a predictive law, and **the Turkestani and Australian catchment experiments** of the 1950s–70s supplied the evaporation measurements that still anchor the parameterisations. The isotope tracer era opened with **Harmon Craig**'s 1961 discovery of the global meteoric water line and **Césaire (Cec) Dansgaard**'s 1964 temperature effect in ice, the two papers that made water's own isotopes its thermometer and its source-tracer; the modern synthesis of the global budget is the satellite and gauge fusion of the **GSWP**, **ERA-Interim/Land** and **GRACE** gravimetry programmes from the 2000s, which first measured total water storage — ice, groundwater, soil and surface — from orbit.
:::

The condensation side of the cycle is in [[atmospheric-dynamics/cloud-physics]], the storms that deliver mid-latitude rain in [[meteorology/fronts-cyclones]] and [[meteorology/storms]], the evaporation physics at the surface in [[atmospheric-dynamics/boundary-layer]], the soil and runoff routing in [[hydrology/soil-water]] and [[hydrology/runoff]], the snowpack reservoir in [[hydrology/snow]], the groundwater mechanics in [[hydrology/groundwater-flow]] and [[hydrology/aquifers-wells]], the energy constraint on the future cycle in [[climate-change/responses]] and [[climate-change/projections]], the flood and drought extremes in [[natural-hazards/floods]], the isotope palaeothermometry in [[palaeoclimate/ice-cores]] and [[palaeoclimate/proxies]], and the ocean's salinity record of the cycle in [[oceanography/seawater]].

::: quiz
A river basin's long-term evapotranspiration is best estimated by
- [ ] its measured river discharge.
- [x] precipitation minus discharge, from the basin water balance.
- [ ] the pan evaporation over its lakes.
- [ ] its NDVI satellite index alone.
::: solution
On a multi-year basin with negligible storage change, $ET = P - R$: the residual method. Discharge is the third of precipitation that is **not** evapotranspired; pan evaporation overestimates a vegetated land surface (which transpires under stomatal control); and NDVI correlates with transpiration but does not close the budget. The residual estimate is the Budyko framework's observational anchor.
:::
:::

::: summary
- The global cycle is a throughput system: $505{,}000\ \mathrm{km^{3}\,yr^{-1}}$ of precipitation against an atmospheric reservoir of nine days — droughts are circulation failures, not storage failures.
- Land evapotranspiration returns two thirds of land rainfall to the air; the Budyko curve bounds the long-term $ET/P$ of every catchment as a function of aridity alone.
- Evaporation has an energy limit (Penman, Priestley–Taylor) and a water limit (stomata, soil); the aridity index says which one binds.
- One third of continental rain is land-recycled; isotopes ($\delta^{18}\mathrm{O}$, D, deuterium excess) trace moisture source, rainout history and condensation temperature — the hydrological and palaeoclimate microscope in one.
- Humanity already consumes a third to a half of accessible runoff; fossil groundwater is mined at metres per year and terminal lakes are the visible ledger of the overdraft.
- Warming accelerates the cycle's extremes at $7\ \mathrm{per\ cent\ per\ K}$ (capacity) but its mean precipitation only at $2$–$3\ \mathrm{per\ cent\ per\ K}$ (energy): more volatile, more extreme, subtropically drier.
:::

## Exercises

::: exercise Residence time in rivers {level=1 check="18"}
Find the residence time in days of river water (storage $2000\ \mathrm{km^{3}}$, discharge $41{,}000\ \mathrm{km^{3}\,yr^{-1}}$). (Enter the number.)
::: solution
$\tau = 2000/41{,}000\times365 = 18\ \mathrm{days}$. Three weeks: a river's water is the youngest of the cycle's reservoirs, which is why hydrological drought lags meteorological drought by the soil's two months, not by the river's weeks.
:::
:::

::: exercise Ocean deficit {level=1 check="114"}
The ocean evaporates $1269$ and receives $1155\ \mathrm{mm\,yr^{-1}}$. Find the required river input in $\mathrm{mm\,yr^{-1}}$ averaged over the ocean, and confirm it against $41{,}000\ \mathrm{km^{3}\,yr^{-1}}$ over $3.61\times10^{8}\ \mathrm{km^{2}}$. (Enter the mm figure.)
::: solution
$1269 - 1155 = 114\ \mathrm{mm\,yr^{-1}}$, and $41{,}000/3.61\times10^{8}\times10^{6} = 114\ \mathrm{mm\,yr^{-1}}$ — the budget closes. This closure, between the salinity-based evaporation estimate and the global river-gauge sum, is one of the triumphs of 20th-century physical geography.
:::
:::

::: exercise Energy-limited evaporation {level=1 check="14"}
Find the evaporation in $\mathrm{mm\,d^{-1}}$ of a free water surface with a net available energy of $400\ \mathrm{W\,m^{-2}}$. (Enter to the nearest integer.)
::: solution
$E = 400\times86{,}400/2.45\times10^{6} = 14\ \mathrm{mm\,d^{-1}}$. Fourteen millimetres a day — half an inch — is why open-water reservoirs in deserts are evaporative losses first and water stores second, and why the American Southwest's lakes lose more to the sky than to any tap.
:::
:::

::: exercise Priestley–Taylor {level=2 check="4.0"}
A grassland with $\Delta/(\Delta+\gamma) = 0.75$ and available energy $R_n - G = 120\ \mathrm{W\,m^{-2}}$ is well watered. Find $ET$ with $\alpha = 1.26$, in $\mathrm{mm\,d^{-1}}$. (Enter to one decimal.)
::: solution
$\lambda E = 1.26\times0.75\times120 = 113\ \mathrm{W\,m^{-2}}$, and $ET = 113\times86{,}400/2.45\times10^{6} = 4.0\ \mathrm{mm\,d^{-1}}$. A healthy temperate grassland transpires $3$–$4\ \mathrm{mm}$ a day in summer: the reason a week of clear weather after rain turns "field capacity" into "wilting point" for a metre of soil.
:::
:::

::: exercise Recycling ratio {level=2 check="29"}
A continent evaporates $47{,}000\ \mathrm{km^{3}\,yr^{-1}}$ and receives $88{,}000\ \mathrm{km^{3}\,yr^{-1}}$ of rain; $33$ per cent of the rain originated as continental evaporation. Find the recycled volume in units of $10^{3}\ \mathrm{km^{3}\,yr^{-1}}$, and the fraction of the continent's own evaporation that falls back on the continent. (Enter the volume.)
::: solution
Recycled rain $= 0.33\times88 = 29$ thousand $\mathrm{km^{3}\,yr^{-1}}$, which is $29/47 = 62$ per cent of the land's evaporation — the land keeps nearly two thirds of what it evaporates and exports the rest as the moisture that seeds downwind continents. The Amazon's recycling ratio of $\sim 0.5$ means half its rainfall is forest-made: the canonical demonstration that the forest is a rain machine, not a rain victim.
:::
:::

::: exercise Altitude effect {level=2 check="-12.5"}
Sea-level rain has $\delta^{18}\mathrm{O} = -2\permil$. Using the altitude effect of $-0.5\permil$ per $100\ \mathrm{m}$, find the expected $\delta^{18}\mathrm{O}$ of precipitation at $2100\ \mathrm{m}$. (Enter to one decimal.)
::: solution
$\delta = -2 - 0.5\times21 = -12.5\permil$. The observed scatter around this simple line is informative: stations wetter than their elevation predicts sit below the line (more rainout), and the departures map the orographic rainout history of the site — the isotope equivalent of a moisture trajectory.
:::
:::

::: exercise Rayleigh distillation {level=3 check="-16.5"}
Vapour with $\delta^{18}\mathrm{O} = -5\permil$ undergoes rainout to a remaining fraction $f = 0.35$ with effective fractionation $\varepsilon^{*} = 11\permil$. Using the Rayleigh relation $\delta = \delta_0 + \varepsilon^{*}\ln f$, find the $\delta^{18}\mathrm{O}$ of the residual vapour in permil. (Enter to one decimal.)
::: solution
$\delta = -5 + 11\times\ln 0.35 = -5 + 11\times(-1.05) = -16.5\permil$. The sign discipline is the whole physics: rainout removes the heavy isotope preferentially, so the residual vapour — and any rain formed late from it — becomes progressively lighter as $\ln f$; the instantaneous rain is heavier than its vapour by $\varepsilon^{*}$, and the accumulated rain sits between. Every isotope hydrograph and every ice-core interpretation rests on these three quantities.
:::
:::

::: exercise The energy-limited pump {level=3 check="0.96"}
Precipitable water rises $7\ \%$ per kelvin but global precipitation only $2.5\ \%$ per kelvin. Find the factor by which the ratio $P/(\rho q)$ — precipitation per unit atmospheric moisture — changes per kelvin, to two decimals.
::: solution
The ratio changes by $1.025/1.07 = 0.96$. The "pump efficiency" — precipitation per unit of atmospheric moisture — **falls** four per cent per kelvin, because the mean updraught is energy-limited while the moisture is thermodynamically supplied. This is the quantitative heart of the "more intense extremes, weaker mean cycle" paradox: the same warming that loads the gun (capacity $+7\ \mathrm{per\ cent}$) slows the steady drizzle (throughput $+2\ \mathrm{per\ cent}$), and the hydrological future is a distribution problem — the same water, more of it in the tails.
:::
:::
