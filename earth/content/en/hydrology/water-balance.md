In 1674 a Parisian counsellor named **Pierre Perrault** spent three years measuring the rain that fell on the hills above the Seine, computed the runoff of the Cote d'Or from the river's gauged flow, and published *Des sources des fontaines* to show that the rainfall exceeded the river's discharge several times over — so that springs could come from rain, percolating through the ground, and not from some subterranean ocean. That single argument, which was ridiculed and then accepted within a generation, is the founding act of hydrology, and it established the method the subject has never abandoned: **write a balance, measure the terms, and let the arithmetic decide**.

## Catchments and the balance

::: definition The catchment and its water balance {#def-balance}
A **catchment** (or drainage basin) is the land area from which all water — surface and subsurface — drains to a common outlet, bounded by the **topographic divide**. The definition is exact on the surface and **approximate underground**, because the groundwater divide and the surface divide coincide only where the geology is uniform, and because **karst**, **perched aquifers** and **interbasin** groundwater transfers make a substantial fraction of the world's catchments **leaky** — the classic case being the alpine catchments whose springs on one side of a divide are recharged from the other.

Over any chosen period the balance is the identity
$$
P = ET + Q + \Delta S \pm \Delta G \pm Q_{\mathrm{adv}},
$$
with $P$ the precipitation, $ET$ the evapotranspiration, $Q$ the stream discharge at the outlet, $\Delta S$ the change in **terrestrial water storage** (soil moisture, snow, groundwater, surface water, biomass), $\Delta G$ the **net** groundwater exchange across the divide, and $Q_{\mathrm{adv}}$ the **atmospheric** moisture advection, which is negligible only over large areas and long periods. Every hydrological method in this course is a way of measuring, estimating or closing one of these terms, and the **closure problem** — that the terms are measured by independent instruments with independent errors, so that the balance never closes exactly — is the subject's permanent condition.

On the **global** scale the balance closes on the observed numbers
$$
\begin{array}{l|c|c|c}
& \text{ocean} & \text{land} & \text{global} \\ \hline
\text{area}\ (10^{6}\ \mathrm{km^{2}}) & 361 & 149 & 510 \\
\text{precipitation}\ (\mathrm{mm\,yr^{-1}}) & 1273 & 715 & 996 \\
\text{evaporation}\ (\mathrm{mm\,yr^{-1}}) & 1598 & 443 & 864 \\
\text{runoff}\ (\mathrm{mm\,yr^{-1}}) & - & 272 & 79 \\
\text{storage}\ (10^{3}\ \mathrm{km^{3}}) & 1.338\times10^{6} & 24.2\times10^{3}\ \text{(ice)} & 1.386\times10^{6}
\end{array}
$$
so that the ocean **evaporates** more than it receives and the land **runs off** the difference — $272\ \mathrm{mm\,yr^{-1}} \times 149\times10^{6}\ \mathrm{km^{2}} = 40{,}500\ \mathrm{km^{3}\,yr^{-1}}$ — and the atmosphere's entire stock of $12{,}900\ \mathrm{km^{3}}$ turns over in $12{,}900/505{,}000 = 9.3$ days.
:::

::: definition Residence time and the memory of the system {#def-residence}
For any reservoir the **residence time** is the stock divided by the throughflow, $\tau = V/F$, and the sequence of residence times is what gives the hydrological system its **memory** and its **lag**:
$$
\begin{array}{l|c|c}
\text{reservoir} & \text{stock}\ (10^{3}\ \mathrm{km^{3}}) & \tau \\ \hline
\text{atmospheric water vapour} & 12.9 & 9\ \text{days} \\
\text{rivers} & 2.1 & 19\ \text{days} \\
\text{soil moisture} & 16.5 & 1\text{--}3\ \text{months} \\
\text{lakes (fresh)} & 21.3 & 10\text{--}17\ \text{years} \\
\text{human use (in use at once)} & 5 & \text{hours to days} \\
\text{groundwater (fresh)} & 10{,}600 & 10^{2}\text{--}10^{6}\ \text{years, mean } \sim 10^{3} \\
\text{glaciers and ice caps} & 24{,}060 & 1.5\times10^{3}\text{--}2\times10^{4}\ \text{years} \\
\text{ocean} & 1.338\times10^{6} & 3.1\times10^{3}\ \text{years}
\end{array}
$$
The **consequence** is the central practical fact of hydrology: a catchment's streamflow at any moment is the **sum** of water that entered it over a range of times spanning **days to millennia**, and the **fast** flowpaths (overland, pipe, and shallow subsurface stormflow) and the **slow** ones (matrix groundwater) are **hydrologically distinct**, have **different chemistry**, and **respond to different forcings**. A flood is the fast system; a summer baseflow is the slow one; and the whole of **runoff prediction** is the partitioning of rain between them.
:::

::: example Closing a catchment water balance {#ex-balance}
A 1250-km² catchment has a mean annual precipitation of 800 mm and a mean annual discharge at its outlet of $10.2\ \mathrm{m^{3}\,s^{-1}}$. Over the same year the groundwater table fell by 1.2 m in a zone with a specific yield of 0.09, and the snow water equivalent at the end of the year was 40 mm less than at the start. Find the evapotranspiration, the runoff coefficient, and the **ET/P** ratio, and compare it with the global land mean.
::: solution
Convert everything to depth over the catchment. The runoff is
$$
Q = 10.2\ \mathrm{m^{3}\,s^{-1}} \times 3.156\times10^{7}\ \mathrm{s\,yr^{-1}} = 3.22\times10^{8}\ \mathrm{m^{3}\,yr^{-1}},
$$
and over $1250\times10^{6}\ \mathrm{m^{2}}$ this is $0.258\ \mathrm{m} = 258\ \mathrm{mm}$. The storage change is
$$
\Delta S = \underbrace{(-1.2\times0.09)}_{\text{groundwater} = -108\ \mathrm{mm}} + \underbrace{(-40)}_{\text{snow}} = -148\ \mathrm{mm},
$$
so
$$
ET = P - Q - \Delta S = 800 - 258 + 148 = 690\ \mathrm{mm\,yr^{-1}} .
$$
The **runoff coefficient** is $258/800 = 0.32$ and the **ET/P** ratio is $690/800 = 0.86$, against a global land mean of $443/715 = 0.62$.

An ET/P of 0.86 is **high** and diagnostic. The global land mean of 0.62 is set by the fact that much of the land is **energy-limited** (high latitudes, where the potential evaporation is small) or **water-limited in a way that leaves runoff** (the wet tropics and the temperate rainforests, where the surplus runs off before it can evaporate). A value of 0.86 says the catchment is **water-limited and vegetated** — a **semi-arid** rangeland, a **Mediterranean** basin, or a **irrigated** agricultural catchment — and it is the number that the **Budyko** framework predicts from the aridity index $Ep/P$ alone.

The **error budget** is the part that decides whether the number means anything. Precipitation over a mountainous catchment carries an error of 10–20 per cent from **gauge undercatch** and **interpolation**; discharge an error of 3–8 per cent from the **rating-curve extrapolation**; storage change an error of 20–50 per cent, because the specific yield is known from a handful of boreholes; and ET is then the **residual**, carrying all three errors **added**. A residual ET of 690 mm with an uncertainty of $\pm 130$ mm cannot distinguish a catchment that is water-limited from one that is energy-limited — which is why the discipline has spent thirty years trying to measure ET **directly**, by **eddy covariance** and by **remote sensing**, rather than to infer it.
:::
:::

::: widget plot
f: 996.6*exp(-x/715)
x: 0, 2000
y: 5, 1010
labels: P\ (\text{mm/yr})
caption: A schematic of the **Budyko** relationship between precipitation and evaporation, drawn here as the exponential approach of actual evaporation to its **water-limited** ceiling. The real Budyko curve is a function of the **aridity index** $Ep/P$ and of a single catchment parameter $\omega$ that encodes the vegetation, the soil and the seasonality — the **Fu**, **Milly**, **Gao** and **Zhang** parameterisations all fit within a few per cent of one another over the world's 1500 largest catchments. The curve's message is that **the landscape self-organises its partitioning**: over a wide range of climates the long-mean evaporation is set by the water supply where the climate is dry and by the energy supply where it is wet, and the **runoff coefficient** is therefore predictable from climate alone to within about 15 per cent. The **residual** scatter is the signal of **geology**, **vegetation**, **soil depth** and **human withdrawal**, and it is largest in the **seasonally dry** tropics and in **irrigated** basins, where the assumption of a **long-term steady state** fails.
:::

## Measuring the terms

::: definition Precipitation and its measurement {#def-precip-measure}
Precipitation is the **least** well measured of the balance's inputs, and its errors are **systematic** and **one-signed**. A **tipping-bucket** gauge records the **depth** of water in a 200-cm² or 500-cm² orifice, and its standard errors are a **resolution** of 0.1–0.2 mm per tip, a **under-catch** of 2–10 per cent from **wind** and **wetted surfaces**, and a **loss** of the first 0.2 mm of every event to the wetted bucket. A **weighing** gauge removes the resolution problem and records the **liquid equivalent of snow**, and a **tipping-bucket with a wind shield** and an **anti-wetting coating** recovers a few per cent more.

The **wind-induced undercatch** is the dominant error and grows with the **wind speed** at the orifice and with the **density** of the precipitation: an unshielded gauge at 5 m s⁻¹ loses 5 per cent of **rain** and 20–50 per cent of **snow**, and the correction, which is a function of the wind speed, the snowfall **categorisation** and the gauge's **shape**, is applied by the **Goodison** and **Sevostyanov** transfer functions and is the reason the global land precipitation estimate rose by 10 per cent when the correction was finally made in the 1990s and again in 2010.

**Radar** measures the **reflectivity** $Z$ (in $\mathrm{mm^{6}\,m^{-6}}$) and converts it to a rainfall rate $R$ by the **power law**
$$
Z = aR^{b}, \qquad a = 200,\ b = 1.6\ \text{(stratiform)}, \qquad a = 420,\ b = 1.6\ \text{(convective)} .
$$
Because $Z$ is proportional to the **sixth power** of drop diameter and to the drop **concentration**, a 10 per cent error in $a$ gives a 6 per cent error in $R$, and the errors of **bright band**, **beam blocking**, **ground clutter**, **vertical profile** and **attenuation** are typically 20–40 per cent — better than a sparse gauge network for **areal** rainfall and worse than a gauge for a **point**. **Satellite** estimates (**GPM**, **TRMM**, **IMERG**, **CMORPH**) combine microwave and infrared sounders with a gauge analysis and are the only global source, with an error of 10–20 per cent over land and larger in the mountains and the polar regions.
:::

::: definition Areal precipitation, evaporation and discharge {#def-areal}
A catchment needs an **areal** precipitation, and the three classical estimators differ in what they assume: the **Thiessen polygon** method assigns every point to the nearest gauge and is exact for a **uniform** field with **random** gauge placement; the **isohyetal** method draws the depth contours and integrates between them, and is better in **mountainous** terrain where the orographic gradient is known; and **kriging** and **co-kriging** with **elevation** as a covariate are the statistical optimum when the gauge network is sparse and the orographic signal strong. All three are dominated by the **network density**, and the **WMO** guideline of one gauge per 25 km² in flat terrain and one per 10 km² in mountains is met by almost no country on Earth.

**Evaporation** is measured by the **Class A pan** (whose evaporation must be multiplied by a **pan coefficient** of 0.6–0.8 to represent a lake), by **lysimeters** (which weigh a monolith of soil and vegetation), and by **eddy covariance** (which correlates the vertical wind fluctuation with the humidity fluctuation over a 100-m footprint and gives the **latent heat flux** directly). The **eddy-covariance** community's FLUXNET network of 500 towers is the global ground truth for actual evapotranspiration, and its systematic **energy-balance closure error** of 10–30 per cent — the missing turbulent flux — is one of the largest unresolved problems in the subject.

**Discharge** is never measured; it is **inferred** from the stage $h$ by a **rating curve**
$$
Q = a\,(h - h_0)^{b},
$$
fitted at a handful of gaugings, with $b$ typically 1.3–1.8 for a channel of regular section and 2.0–2.5 for one whose width grows with stage. The curve **drifts** with **scour**, **backwater**, **aquatic growth** and **ice**, and the extrapolation **above** the highest gauging is the dominant source of error in every flood-frequency study — a 0.1-m error in a stage extrapolated to a 100-year flood routinely gives a **6 per cent** error in the discharge, and the confidence interval of a 100-year flood estimated from a 30-year record is a factor of two.
:::

::: example Areal precipitation by Thiessen polygons {#ex-thiessen}
A storm is recorded by three gauges in a catchment whose Thiessen weights are 0.30, 0.50 and 0.20, with storm depths of 40, 62 and 28 mm. Find the areal precipitation, and the total volume. Then explain why the answer may be wrong by 30 per cent.
::: solution
$$
\bar{P} = 0.30\times40 + 0.50\times62 + 0.20\times28 = 12.0 + 31.0 + 5.6 = 48.6\ \mathrm{mm},
$$
and over a 1250-km² catchment the volume is $48.6\times10^{-3}\times1.25\times10^{9} = 6.1\times10^{7}\ \mathrm{m^{3}}$, or 61 million cubic metres — enough to fill 24 000 Olympic swimming pools.

The answer may be wrong by 30 per cent for four reasons, and none of them is the arithmetic. **The Thiessen method assumes a linear field between gauges**, which fails wherever the precipitation has a strong **orographic** gradient: a gauge at 200 m and one at 2000 m in a westerly storm may receive 40 and 200 mm, and the polygon method assigns the intervening area the **nearer** value, with errors of 50 per cent. **Three gauges cannot resolve a convective cell**: a summer thunderstorm with a 2-km core of 80 mm may fall entirely between the gauges, and the areal error of a sparse network in **convective** rain is 20–50 per cent, against 5–10 per cent in **stratiform** rain. **Gauge undercatch** removes 5–10 per cent of a summer rain and 20–50 per cent of a winter snowfall. **And the Thiessen weights are wrong for the storm that matters**: the weights are computed for the **whole** catchment, but the **effective** area contributing to a flood is the **saturated** or **near-channel** fraction, which is not the polygon area — which is why the modern practice is to weight the gauges by the **rainfall-runoff** sensitivity rather than by the area.

The remedy is **gauge-adjusted radar**, which uses the radar's **spatial** pattern and the gauges' **magnitudes**, and which has become the operational standard across most of the developed world; and, for the ungauged half of the planet's mountains, the **satellite** products, whose errors in the Himalaya, the Andes and the Ethiopian highlands are large enough that the **global water balance** is still open at the 10 per cent level.
:::
:::

::: example A rating curve and its extrapolation {#ex-rating}
A gauging station's rating is $Q = 50\,(h - 0.5)^{1.6}$ with $Q$ in m³ s⁻¹ and $h$ in m, fitted on gaugings between $h = 1.0$ and $3.0$ m. Find the discharge at $h = 3.2$ m and at $h = 5.0$ m, and the discharge error if the true stage during a flood was 0.1 m **below** the recorded value.
::: solution
At $h = 3.2$: $Q = 50\times2.7^{1.6} = 245\ \mathrm{m^{3}\,s^{-1}}$. At $h = 5.0$: $Q = 50\times4.5^{1.6} = 50\times11.06 = 553\ \mathrm{m^{3}\,s^{-1}}$. If the true stage was 4.9 rather than 5.0 m,
$$
\frac{Q_{\mathrm{true}}}{Q_{\mathrm{recorded}}} = \left(\frac{4.4}{4.5}\right)^{1.6} = 0.965,
$$
so the discharge is overestimated by **3.6 per cent** — and the same 0.1-m error at $h = 1.1$ m gives a **15 per cent** error, because the **relative** error is $b\,\delta h/(h - h_0)$, which grows as the stage approaches the **zero** of the rating.

The **extrapolation** from the highest gauging at 3.0 m to the flood stage of 5.0 m is the serious problem. The rating curve is a **hydraulic** relation whose exponent reflects the channel's **shape**, and a real river's rating **breaks** at the point where the flow reaches the **floodplain**, because the width — and hence the exponent $b$ — increases abruptly. A curve fitted below the banks and extrapolated above them **underestimates** the flood discharge, because it does not know that the flow has spread into a much wider, much rougher channel whose velocity is **lower** at the same stage. The errors reported in the literature for **unverified** extrapolations are 20–50 per cent, and the standard for a **design-flood** study is now to **survey** the high-water **marks**, apply a **step-backwater** hydraulic model, and report the extrapolated discharge with an explicit confidence interval.

The **consequence** propagates into everything downstream. A flood-frequency analysis fitted to a record whose largest floods are extrapolated 2 m above the highest gauging produces a **100-year flood** that may be wrong by 30 per cent, and the **design** of a bridge, a levee or a spillway is then wrong by that much — which is why the failure investigations of the floods of 1993 (Mississippi), 2002 (Elbe and Vltava), 2010 (Pakistan) and 2021 (Ahr and Belgium) all begin with the question of how the peak discharge was obtained.
:::
:::

::: example A GRACE water balance and a mining aquifer {#ex-grace}
The GRACE twin satellites measure a linear decline in **total water storage** of $2.4\ \mathrm{cm\,yr^{-1}}$ over a sedimentary basin of $3.2\times10^{5}\ \mathrm{km^{2}}$. The basin's precipitation is $550\ \mathrm{mm\,yr^{-1}}$, its runoff $90\ \mathrm{mm\,yr^{-1}}$ and its evapotranspiration is estimated at $400\ \mathrm{mm\,yr^{-1}}$. Find the volume loss per year, the apparent imbalance in the balance, and the lifetime of the aquifer if it is 60 m thick with a specific yield of 0.12.
::: solution
The volume loss is
$$
\dot{V} = 0.024\ \mathrm{m\,yr^{-1}} \times 3.2\times10^{11}\ \mathrm{m^{2}} = 7.7\times10^{9}\ \mathrm{m^{3}\,yr^{-1}} = 7.7\ \mathrm{km^{3}\,yr^{-1}} .
$$
The balance's residual is
$$
P - ET - Q = 550 - 400 - 90 = +60\ \mathrm{mm\,yr^{-1}},
$$
which is a **gain** of storage, whereas GRACE measures a **loss** of $24\ \mathrm{mm\,yr^{-1}}$. The discrepancy of $84\ \mathrm{mm\,yr^{-1}}$ is the **groundwater pumping**: water is extracted from the aquifer, applied to the land, and **evaporated**, so the pumping appears in the balance as an **extra** evaporation term that the estimate of ET has missed. The pumped volume implied by the GRACE trend is $24\ \mathrm{mm} \times 3.2\times10^{5}\ \mathrm{km^{2}} = 7.7\ \mathrm{km^{3}}$, which is **14 per cent** of the precipitation — a plausible irrigation withdrawal.

The aquifer holds
$$
V_{\mathrm{s}} = 3.2\times10^{11}\times60\times0.12 = 2.3\times10^{12}\ \mathrm{m^{3}} = 2300\ \mathrm{km^{3}},
$$
and at the observed rate it is exhausted in
$$
\tau = \frac{2300}{7.7} = 300\ \mathrm{years}.
$$
GRACE's precision is about $1\ \mathrm{cm}$ of water equivalent over a $2\times10^{5}$-km² cell for an annual solution, so a $2.4$-cm-per-year trend measured over fifteen years is significant at many standard deviations — and the **trend**, not the **absolute storage**, is what the mission measures, because the **static** gravity field is removed and the **time-variable** field, which is almost entirely water, is what remains.

Three cautions complete the reading. The **spatial leakage** of the spherical-harmonic solution smears a signal from neighbouring mass anomalies — the Himalaya, the monsoon, the post-glacial rebound — into the basin, and the correction is a matter of **filtering** choice rather than of measurement. The **specific yield** is a property of the **draining** material and is 0.02–0.05 in a fine-grained basin and 0.15–0.30 in a clean sand and gravel, so the 300-year lifetime is uncertain by a factor of five. And the **lifetime** calculation assumes a **constant** rate, whereas the real system **slows** as the water table falls below the reach of the pumps and as the **subsidence** and **salinisation** that follow make the land worthless — which is what has happened in parts of the Central Valley, the North China Plain and the Murray, where the aquifer is not so much **exhausted** as **abandoned**.
:::
:::

::: warning A water balance is an accounting identity, not a measurement
The identity $P = ET + Q + \Delta S$ is **always** true and its terms are **never** known well enough to be useful without care. **The residual inherits every error**: if $P$ is uncertain by 10 per cent, $Q$ by 5 and $\Delta S$ by 50, then a residual $ET$ over a catchment where $Q$ is 30 per cent of $P$ carries an uncertainty of $\pm 0.10P + 0.05\times0.3P + 0.5\,\Delta S$ — which for a semi-arid catchment with a large storage change can exceed the ET itself. **Storage change is the least measured term**: the groundwater component needs a **specific yield** that is a property of the **unsaturated** zone and is measured on a handful of boreholes, the snow component needs a **snow course** or a **SWE** network that no country maintains at better than 10 per cent, and the soil-moisture component needs **in-situ** probes or **satellite** microwave, whose error over vegetated and mountainous terrain is 20–30 mm per metre of soil water. **The steady-state assumption is a hidden hypothesis**: over a decade a catchment's $\Delta S$ is often assumed zero, and this is defensible only if the **groundwater** is not being **mined** and the **snowline** is not **retreating** — both of which are false over much of the irrigated world and the mountain west, where the assumption of steady state biases the inferred **ET** by 10–30 per cent. **The scale is not the catchment**: eddy-covariance towers sample a **100–1000-m** footprint of one **vegetation type**, lysimeters a few square metres, and stream gauges the whole catchment, and the **scaling** between them is an unsolved problem, not a solved one. **GRACE does not close the balance**: the satellites measure **total water storage** change to 1–2 cm of water over a 200 000-km² cell, which is a **gift** for the $\Delta S$ term at the scale of the Amazon or the Ogallala and **useless** at the scale of a 1000-km² catchment. And **human withdrawals break the natural balance**: over the North China Plain, the Central Valley of California, the Punjab and the Murray–Darling the **irrigation**, **diversion** and **groundwater pumping** terms exceed the natural variability, so a "natural" water balance fitted to the gauge record is a **fiction** — and the honest statement is that the balance is now a **socio-hydrological** identity in which the managed terms must be inventoried, not assumed.
:::

::: history
**Perrault** (Perrault) closed the first water balance in *Des sources des fontaines* in 1674; **Halley** (Halley) measured the evaporation from the Mediterranean in 1686 and showed it balanced the rivers' inflow; **Mariotte** (Mariotte) measured river discharge by float and by cross-section, and together they buried the subterranean-ocean theory of springs. **Chézy** (Chézy) and **du Buat** (du Buat) put open-channel flow on a hydraulic footing in the eighteenth century, **Darcy** (Darcy) gave the law of flow through sand in *Les Fontaines publiques de Dijon* in 1856, and **Dupuit** (Dupuit) and **Forchheimer** (Forchheimer) built the theory of groundwater flow between 1863 and 1901. **Fuller** (Fuller) fitted the first **flood-frequency** curve in 1914, **Sherman** (Sherman) invented the **unit hydrograph** in 1932, **Horton** (Horton) established the theory of **infiltration** and **overland flow** in 1933–1945, and **Gumbel** (Gumbel) introduced the **extreme-value** statistics of floods in 1941. **Penman** (Penman) derived the **combination equation** for evaporation in 1948, **Monteith** (Monteith) added the **canopy resistance** in 1965, **Priestley and Taylor** (Priestley) gave their simplification in 1972, and **Allen and the FAO working group** (Allen) standardised the **Penman–Monteith** in 1998. **Budyko** (Budyko) published *Climate and Life* in 1961, and **Dooge**, **Milly**, **Gao** and **Zhang** put the **Budyko curve** on its modern footing between 1963 and 2014. **Theis** (Theis) solved the **transient** pumping-test problem in 1935, **Cooper and Jacob** (Jacob) gave the straight-line method in 1946, **Bear** (Bear) wrote *Dynamics of Fluids in Porous Media* in 1972, and **Freeze and Cherry** (Freeze) wrote *Groundwater* in 1979. **Strahler** (Strahler) founded **quantitative** basin morphometry in 1952, **Kirkby** (Kirkby) and **Beven** (Beven) the **variable-source-area** theory of runoff and the **topmodel** in 1977–1982, **Tapley** (Tapley) and **Watkins** (Watkins) led the **GRACE** mission from 2002, and **Rodell and the global water-balance school** (Rodell) closed the first **satellite** water balances of the great river basins in 2010–2018.
:::
## Where this leads

The precipitation and evaporation terms of the balance are the subject of [[hydrology/precipitation-evaporation]] and their meteorology is in [[meteorology/moisture]] and [[meteorology/clouds-precipitation]], the snow term in [[hydrology/snow]] and [[glaciology/mass-balance]], the soil and infiltration terms in [[hydrology/soil-water]], the runoff term in [[hydrology/runoff]] and [[geomorphology/rivers]], the extremes in [[hydrology/floods-droughts]] and [[natural-hazards/floods]], the groundwater terms in [[hydrology/groundwater-flow]], [[hydrology/aquifers-wells]] and [[earth-resources/groundwater-resources]], the solute terms in [[hydrology/contaminant-transport]], the basin shape that sets the routing in [[geomorphology/drainage-basins]], the global cycle in [[earth-system/water-cycle]] and [[climate-system/hydrological-cycle]], and the human appropriation of it in [[earth-resources/extraction-impacts]].

::: quiz
A catchment's water balance is closed over ten years by assuming $\Delta S = 0$. Under which condition is that assumption most seriously wrong?
- [ ] The catchment is covered by temperate rainforest.
- [x] The catchment is being irrigated by pumped groundwater.
- [ ] The catchment is underlain by karst.
- [ ] The catchment has no weather radar.
::: solution
A decade of groundwater **mining** for irrigation is a systematic, one-signed change in storage that can be tens of per cent of the annual precipitation, so assuming $\Delta S = 0$ puts all of it into the residual — and reports it as evapotranspiration. Karst breaks the **divide** assumption rather than the steady-state one, and rainforest, karst and the absence of radar do not by themselves make $\Delta S$ nonzero over ten years.
:::
:::

::: summary
- The catchment water balance is an identity, and every hydrological method is a way of measuring or closing one of its terms.
- Residence times span nine days in the atmosphere to a thousand years in groundwater, so streamflow is a mixture of waters of many ages and of two distinct flowpath systems.
- Precipitation is measured with one-signed systematic error, of which wind-induced undercatch — 5 per cent of rain, up to 50 per cent of snow — is the largest.
- Areal precipitation from a sparse gauge network is uncertain by 10 per cent in stratiform rain and 50 per cent in convective rain.
- Discharge is inferred from stage through a rating curve, and the extrapolation above the highest gauging is the dominant error in every flood study.
- The Budyko framework predicts the long-mean runoff coefficient from climate alone to about 15 per cent, and the residual is geology, vegetation and people.
:::

## Exercises

::: exercise Runoff coefficient {level=1 check="0.30"}
A catchment receives 620 mm of precipitation in a year and its mean discharge at the outlet is 185 mm. Find the runoff coefficient, and the evapotranspiration if the storage change is negligible.
::: solution
The runoff coefficient is $185/620 = 0.30$, and $ET = 620 - 185 = 435\ \mathrm{mm}$. A runoff coefficient of 0.30 with an ET/P of 0.70 is a **temperate** or **Mediterranean** catchment; values above 0.6 indicate **mountainous**, **basitic** or **urbanised** terrain, and values below 0.15 indicate **arid** or **irrigated** land.
:::
:::

::: exercise Residence time {level=1 check="19"}
Rivers hold $2100\ \mathrm{km^{3}}$ of water and carry $40{,}000\ \mathrm{km^{3}\,yr^{-1}}$ to the sea. Find the mean residence time.
::: solution
$\tau = 2100/40{,}000 = 0.0525\ \mathrm{yr} = 19\ \text{days}$. The short residence is why a river's **chemistry** records the **weathering** of the last three weeks and why a river cannot buffer a **drought** — a lake with a 10-year residence can, and a groundwater-dominated baseflow with a 100-year residence can buffer a century.
:::
:::

::: exercise Radar rainfall {level=1 check="4.2"}
A weather radar measures a reflectivity of $2000\ \mathrm{mm^{6}\,m^{-6}}$. Find the rainfall rate using the stratiform $Z$–$R$ relation $Z = 200R^{1.6}$.
::: solution
$R = (2000/200)^{1/1.6} = 10^{0.625} = 4.2\ \mathrm{mm\,h^{-1}}$. If the rain is in fact **convective** and the correct coefficient is $a = 420$, the rate is $(2000/420)^{1/1.6} = 2.6\ \mathrm{mm\,h^{-1}}$ — a **38 per cent** error from the choice of $a$ alone, which is why operational radars measure the **drop-size distribution** with a **disdrometer** and adjust $a$ and $b$ in real time.
:::
:::

::: exercise Pan evaporation {level=1 check="4.9"}
A Class A pan records 7.0 mm of evaporation on a day. Estimate the evaporation from a shallow lake and from a deep, well-watered grass surface.
::: solution
With a pan coefficient of 0.7 the lake evaporates $0.7\times7.0 = 4.9\ \mathrm{mm}$. A well-watered **grass** surface (the **reference crop**) evaporates about 0.7–0.75 of the pan, so also about **5 mm**; a **stressed** crop or a **bare** dry soil evaporates far less, and the whole of **irrigation scheduling** is the ratio of the actual to the reference rate.
:::
:::

::: exercise Global precipitation {level=2 check="40500"}
The land receives $715\ \mathrm{mm\,yr^{-1}}$ and evaporates $443\ \mathrm{mm\,yr^{-1}}$. Find the global runoff to the ocean in km³ yr⁻¹ over a land area of $149\times10^{6}\ \mathrm{km^{2}}$.
::: solution
The runoff depth is $715 - 443 = 272\ \mathrm{mm\,yr^{-1}}$, and the volume is $0.272 \times 149\times10^{6} = 4.05\times10^{4}\ \mathrm{km^{3}\,yr^{-1}}$. Human **withdrawal** is about $4000\ \mathrm{km^{3}\,yr^{-1}}$ and **consumption** about $2000$ — so humanity diverts **5 per cent** of the global runoff and **consumes** 2.5 per cent, and in the **arid** world the fraction of the **available** runoff consumed exceeds 60 per cent, which is the definition of a water-scarce region.
:::
:::

::: exercise Areal precipitation {level=2 check="58"}
Four gauges with Thiessen weights 0.20, 0.35, 0.25 and 0.20 record 45, 71, 58 and 48 mm. Find the areal precipitation.
::: solution
$\bar{P} = 0.20\times45 + 0.35\times71 + 0.25\times58 + 0.20\times48 = 9.0 + 24.85 + 14.5 + 9.6 = 58.0\ \mathrm{mm}$. The arithmetic mean of the four gauges is $(45+71+58+48)/4 = 55.5\ \mathrm{mm}$, and the weighted mean is **higher** because the wettest gauge carries the largest weight. The two differ by 4 per cent here, and by 30 per cent or more when the wet gauge sits in the mountains and the large polygons lie in the rain shadow.
:::
:::

::: exercise The error budget of a balance {level=3 check="68"}
A catchment's precipitation is known to $\pm8$ per cent, its runoff to $\pm5$ per cent and its storage change to $\pm40$ per cent. With $P = 800$, $Q = 250$ and $\Delta S = -50$ mm, find the uncertainty in the residual $ET$ if the errors are independent and combine in **quadrature**, and express it as a percentage of $ET$.
::: solution
The individual absolute errors are
$$
\delta P = 0.08\times800 = 64, \qquad \delta Q = 0.05\times250 = 12.5, \qquad \delta(\Delta S) = 0.40\times50 = 20\ \mathrm{mm},
$$
and since $ET = P - Q - \Delta S$ the errors combine in quadrature,
$$
\delta ET = \sqrt{64^{2} + 12.5^{2} + 20^{2}} = \sqrt{4652} = 68\ \mathrm{mm},
$$
which against an $ET$ of $590$ mm is **11.6 per cent** — tolerable. But if the storage change were $-250$ mm rather than $-50$, its absolute error would be 100 mm, the quadrature total would rise to 120 mm, and the residual ET would be uncertain by **20 per cent**; and if the errors are **correlated** rather than independent — as they are when the same sparse gauge network sets both $P$ and the interpolation of $\Delta S$ — the quadrature sum is an **underestimate** and the true error is nearer the **arithmetic** sum of 97 mm.

The lesson is that the **precision of a water balance is set by its least-measured term**, and that in most catchments that term is neither the rain nor the flow but the **change in storage** — which is why the last twenty years of hydrological science has been an attempt to measure $\Delta S$ from **space**, by **gravimetry**, **InSAR** and dense **groundwater** monitoring, and why the **GRACE** and **GRACE-FO** missions were greeted as the most important hydrological instrumentation since the stream gauge.
:::
:::

::: exercise Budyko and the aridity limit {level=3 check="0.83"}
Evaluate the **Fu** form of the Budyko curve,
$$
\frac{ET}{P} = 1 + \frac{Ep}{P} - \left[1 + \left(\frac{Ep}{P}\right)^{\omega}\right]^{1/\omega},
$$
for an aridity index $Ep/P = 1.6$ and the world-average catchment parameter $\omega = 2.6$.
::: solution
$$
(1.6)^{2.6} = 3.54, \qquad (4.54)^{1/2.6} = 4.54^{0.3846} = 1.77,
$$
$$
\frac{ET}{P} = 1 + 1.6 - 1.77 = 0.83 .
$$
The form is **constructed** to satisfy $ET \le \min(P, Ep)$: as $Ep/P \to \infty$ it gives $ET/P \to 1$ and as $Ep/P \to 0$ it gives $ET/P \to Ep/P$, so it cannot demand an evaporation greater than the water supply or greater than the energy supply — which the naive hyperbolic forms can and do.

The observed **global land** value is $443/715 = 0.62$ against an aridity index of about 1.4, for which the same form with $\omega = 2.6$ gives $0.80$. The **discrepancy** is the whole of the current debate, and the candidate explanations are the **seasonality** of precipitation (a wet winter and a dry summer stores water that cannot be evaporated in the dormant season and runs off), the **human depletion** of runoff by irrigation and reservoir evaporation, the **runoff** that occurs in the wet tropics before the soil can dry, and a **$\omega$ that varies systematically** with the vegetation and the soil depth rather than being a global constant.

The general lesson is that the Budyko framework is a **closure**, not a **prediction**: it says that a **long-mean**, **undisturbed** catchment partitions water and energy in a way predictable from climate alone, and its **residuals** are the signal of everything the framework leaves out — vegetation, soil depth, seasonality, geology and irrigation. Thirty years of argument have produced a literature in which the same 1500 catchments are fitted with twenty different curves that agree with one another to a few per cent, and in which the **residual** scatter is larger than the **difference** between them.
:::
:::
