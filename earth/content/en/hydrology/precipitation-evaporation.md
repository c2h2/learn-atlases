Two numbers set the water balance of every catchment on Earth before any other consideration: how much water arrives, and how much energy is available to send it back. Precipitation is the supply, and it is a **stochastic**, **intermittent** and **spatially fractal** supply whose measurement error is one-signed and whose spatial variability defeats the sparsest observing network. Evapotranspiration is the demand, and it is set by the **radiation balance** first, the **vapour-pressure deficit** and the **wind** second, and the **stomata** of the vegetation third. Getting these two right is worth more than any refinement of the routing or the groundwater, because they are the two terms that every model must be forced with and that no model can invent.

## Precipitation over a catchment

::: definition The four ways rain falls, and the statistics of a wet day {#def-precip-types}
Precipitation reaches a catchment by four mechanisms whose **diurnal**, **seasonal** and **spatial** signatures are entirely different, and a hydrological model that does not distinguish them will get the **flood** right and the **erosion**, the **groundwater recharge** and the **water quality** wrong:
$$
\begin{array}{l|l|l|l}
\text{type} & \text{driver} & \text{duration} & \text{spatial character} \\ \hline
\textbf{stratiform} & \text{large-scale ascent, fronts} & 6\text{--}72\ \mathrm{h} & \text{smooth, areal, orographic} \\
\textbf{convective} & \text{instability, diurnal heating} & 0.25\text{--}6\ \mathrm{h} & \text{cellular, 1--20 km, intense} \\
\textbf{orographic} & \text{forced flow over relief} & \text{as long as the wind} & \text{gradient of } 100\text{--}1000\ \mathrm{mm\,km^{-1}} \\
\textbf{tropical cyclone} & \text{organized convection} & 12\text{--}72\ \mathrm{h} & \text{eyewall, 100--500 km, extreme}
\end{array}
$$
Daily rainfall over a wet season is well described by a **gamma** or **exponential** distribution with a **dry/wet** Markov chain, and the two parameters that matter are the **wet-day frequency** $\pi$ and the **mean wet-day depth** $\mu$, whose product is the annual total. The **dry-spell** distribution is approximately **geometric**, and its mean length sets the **antecedent condition** of every storm; the **wet-spell** distribution sets the **saturation** that produces the flood. Both are **non-stationary** at the decadal scale in the subtropics and the monsoon margins, and the **intensity** of the heaviest events has risen at about **7 per cent per kelvin** of warming — the **Clausius–Clapeyron** rate — while the **frequency** of wet days has risen more slowly, so the same annual total now arrives in **fewer, heavier** events.

The **orographic** enhancement is the largest spatial signal in the global precipitation field and the least measured. Precipitation increases with elevation to a **maximum** at the **cloud-base** or **condensation** level and decreases above it, so the **total** over a mountain catchment depends on where the crest falls relative to that level: in the western Scottish Highlands the maximum is at 600–800 m, in the Himalaya at 2000–2500 m, and in the Andes and the Ethiopian plateau the crest is **above** the maximum and the high plateau is a **rain shadow**. The **rainfall gradient** of 100–1000 mm km⁻¹ and the **critical elevation** are the two parameters of every mountain hydrological model, and both are estimated from a gauge network whose **mean elevation** is far below the catchment's — which is why the water resources of the world's mountains are systematically **underestimated**.
:::

::: definition Intensity–duration–frequency curves {#def-idf}
The design instrument of every urban drainage, culvert and road project is the **intensity–duration–frequency (IDF)** curve, which gives the **average intensity** $i$ of the storm of **return period** $T$ and **duration** $d$. Over most of the world the intensity decays with duration as a power law,
$$
i(d, T) = \frac{a(T)}{(d + b)^{n}},
$$
with $b$ of order 5–30 minutes and $n$ of order 0.5–0.8, and the **frequency** dependence enters through $a(T)$. The curves are built from **minutely** or **5-minute** gauge records, and their two systematic weaknesses are that the **shortest** durations are contaminated by the **tipping-bucket resolution** and by the **time-averaging** of the recording, and that the **longest** durations require a record longer than most networks have. The **convective** storms that dominate the short durations have a **spatial** extent of a few kilometres, so an IDF curve built from a **point** gauge overestimates the **areal** intensity that a catchment of 100 km² actually receives — the **areal reduction factor**, of order 0.7–0.9 for a 100-km² catchment at a 1-hour duration, is one of the most used and least justified numbers in engineering hydrology.
:::

::: definition Potential, reference and actual evapotranspiration {#def-et-definitions}
The **potential evapotranspiration** $E_p$ is the evaporation that a **freely evaporating surface** of water would sustain under the prevailing weather; the **reference evapotranspiration** $ET_0$ is the evaporation from a **hypothetical reference crop** — the FAO-56 definition is a 0.12-m grass at a fixed surface resistance of 70 s m⁻¹ and an albedo of 0.23, adequately watered — and the **actual evapotranspiration** $ET_a$ is what the real surface evaporates. The three are related by
$$
ET_{\mathrm{crop}} = K_{\mathrm{c}}\,ET_0 \qquad\text{(the crop coefficient)}, \qquad ET_{\mathrm{a}} \le \min(P,\ E_{\mathrm{p}}),
$$
and the distinction between the **energy-limited** and **water-limited** regimes is the whole of the difference between a **irrigated** field and a **dry-farmed** one. The **crop coefficient** $K_c$ is 0.3–0.4 for a bare or dormant soil, 1.0–1.2 for a closed crop at mid-season and 0.4–0.6 for a senescing one, and it is the empirical bridge between the physics of $ET_0$ and the agronomy of the actual crop.

Two subtleties govern the use of these quantities. **Transpiration is not evaporation**: over vegetated land the **plant** uptake is 60–90 per cent of the total, is controlled by **stomatal** conductance that responds to light, vapour-pressure deficit and soil water on timescales of minutes to days, and is **coupled** to the atmosphere through the canopy resistance — whereas soil evaporation is a **surface** process controlled by the energy and the surface moisture. And the **evaporation paradox**: measured **pan** evaporation declined by 10–20 per cent over the second half of the twentieth century across much of the Northern Hemisphere at the same time as the actual evaporation from a **warming**, **greening** planet must have **risen**. The resolution is the **Bouchet complementary relationship** — that a **reduced** actual evaporation **dries** and **warms** the boundary layer, which **raises** the **potential** evaporation — so the two move in **opposite** directions, and the pan, which measures something between the two, records the **decrease** while the land records the **increase**.
:::

::: example Saturation vapour pressure and its slope {#ex-vapour}
Compute the saturation vapour pressure and the slope of the saturation vapour-pressure curve at $25\ ^\circ\mathrm{C}$ and at $35\ ^\circ\mathrm{C}$, and explain why the ratio matters for the response of evaporation to warming.
::: solution
With the **Tetens** or **Magnus** expression $e_{\mathrm{s}}(T) = 0.6108\exp[17.27\,T/(T + 235.51)]$ in kPa,
$$
e_{\mathrm{s}}(25) = 3.20\ \mathrm{kPa}, \qquad e_{\mathrm{s}}(35) = 5.71\ \mathrm{kPa},
$$
and the slope, $\Delta = 4098\,e_{\mathrm{s}}/(T + 235.51)^{2}$, is
$$
\Delta(25) = 0.193\ \mathrm{kPa\,K^{-1}}, \qquad \Delta(35) = 0.320\ \mathrm{kPa\,K^{-1}} .
$$
The vapour pressure rises by **78 per cent** over the 10-K range and its slope by **66 per cent**, at the **Clausius–Clapeyron** rate of about **7 per cent per kelvin**.

The consequence is the reason evaporation is one of the most sensitive terms in the water balance. In the **Penman** equation the evaporation is the **weighted** average of an **energy** term and an **aerodynamic** term with weights $\Delta/(\Delta + \gamma)$ and $\gamma/(\Delta + \gamma)$, and because $\Delta$ grows **exponentially** with temperature while the **psychrometric constant** $\gamma = 0.0665\,p$ grows only with **pressure**, the **weight on the energy term** rises from $0.193/0.261 = 0.74$ at 25 °C to $0.320/0.388 = 0.83$ at 35 °C. A warm, humid surface therefore evaporates in near-**proportion** to the available energy, and a cold surface is far more controlled by the wind and the humidity.

Three practical consequences follow. The **vapour-pressure deficit** of the atmosphere has **risen** over most land since 2000 because the surface has warmed faster than the boundary layer has moistened, and this **"memory effect"** and **"trend"** of the VPD is a **direct** driver of the **increasing** severity of **flash droughts** and of the **increasing** transpiration demand that crops must meet. The **7 per cent per kelvin** is also the reason the **heaviest** daily rainfalls have intensified at close to the **Clausius–Clapeyron** rate over most of the world, and why the **convective** thresholds are being crossed more often. And it is the reason a **greenhouse** or a **growth chamber** at 35 °C has an evaporative demand 78 per cent higher than at 25 °C at the same **relative humidity** — which is the whole of the agronomic case for **humidification** in a warming world.
:::
:::

::: widget plot
f: 0.6108*exp(17.27*x/(x+235.51))
x: -20, 40
y: 0, 8
labels: e_\text{s}\ (\text{kPa})
caption: The **saturation vapour pressure** of water $e_{\mathrm{s}}(T) = 0.6108\exp[17.27\,T/(T+235.51)]$ in kPa. The curve's **exponential** form is the single most consequential fact in the hydrological cycle: it makes the atmosphere's water-holding capacity rise by about **7 per cent per kelvin**, it makes the **evaporative demand** rise faster than the temperature, and it makes the **hydrological cycle intensify** with warming faster than the **precipitation** mean does — which is why the modelled response of global precipitation to a doubling of CO₂ (about 2–3 per cent) is **much smaller** than the modelled response of the **variability**, the **intensity** of extreme rainfall, and the **aridity** of the subtropics. Note the **asymmetry** of the curve: at $-20\ ^\circ\mathrm{C}$ the saturation vapour pressure is $0.12\ \mathrm{kPa}$, a **twenty-sixth** of its value at $+25\ ^\circ\mathrm{C}$, which is why a cold-air outbreak over a lake produces **steam fog** and **lake-effect snow**, and why the **sublimation** from a snowpack in cold, dry, windy conditions can be a **large** fraction of its mass loss even though the energy available is small.
:::

::: example Reference evapotranspiration with Penman–Monteith {#ex-pm}
Compute the FAO-56 reference evapotranspiration for a day with a mean temperature of $25\ ^\circ\mathrm{C}$, a relative humidity of 50 per cent, a wind speed of $2\ \mathrm{m\,s^{-1}}$ at 2 m, a net radiation of $13.4\ \mathrm{MJ\,m^{-2}\,d^{-1}}$ and negligible soil heat flux. Then compute the **Priestley–Taylor** estimate and explain the difference.
::: solution
The FAO-56 equation is
$$
ET_0 = \frac{0.408\,\Delta\,(R_n - G) + \dfrac{900}{T + 234}\,\gamma\,u_2\,(e_{\mathrm{s}} - e_{\mathrm{a}})}{\Delta + \gamma\,(1 + 0.34\,u_2)} ,
$$
with $\Delta = 0.193\ \mathrm{kPa\,K^{-1}}$, $\gamma = 0.0675\ \mathrm{kPa\,K^{-1}}$, $e_{\mathrm{s}} = 3.20\ \mathrm{kPa}$ and $e_{\mathrm{a}} = 0.50\times3.20 = 1.60\ \mathrm{kPa}$:
$$
\text{radiation term} = 0.408\times0.193\times13.4 = 1.06, \qquad
\text{aerodynamic term} = \frac{900\times0.0675\times2\times1.60}{259} = 0.75,
$$
$$
ET_0 = \frac{1.06 + 0.75}{0.193 + 0.0675\times1.68} = \frac{1.81}{0.307} = 5.9\ \mathrm{mm\,d^{-1}} .
$$
The **Priestley–Taylor** form, $\lambda ET = 1.26\,\Delta(R_n - G)/(\Delta + \gamma)$, gives $1.26\times0.741\times13.4 = 12.5\ \mathrm{MJ\,m^{-2}\,d^{-1}} = 5.1\ \mathrm{mm\,d^{-1}}$, about **13 per cent lower**.

The difference is the **aerodynamic** term, which the Priestley–Taylor equation deliberately **discards** and replaces with the empirical coefficient 1.26. The two agree to within 10 per cent when the surface is **well watered**, **well coupled** to the atmosphere and **not** subject to **advected** energy — a grassed field in a maritime climate — and diverge when it is **dry**, **small**, **tall** or in a **desert**, where the **advected** energy can raise the actual evaporation to **two to five times** the radiation-only estimate. The **advection** correction is the reason the Priestley–Taylor equation fails for an **irrigated** field in Arizona and works for the **Amazon** and **temperate** grassland.

The **radiation term** contributes 58 per cent and the **aerodynamic** term 42 per cent of the numerator here, and that split is the reason $ET_0$ is so much better measured than the other terms of the water balance: the **radiation** comes from **satellite** (MODIS, CERES, SSEBop) and from a global network of **flux** towers, and the **aerodynamic** term from **reanalysis** wind and humidity. The **uncertainty** in a global $ET_0$ is 5–10 per cent, against 15–30 per cent for the **actual** evaporation, whose limiting factor is the **soil moisture** and the **stomata** that no satellite sees directly.
:::
:::

::: example Orographic precipitation and its error {#ex-orographic}
A catchment slopes from 200 m to 1600 m. The precipitation at 200 m is $600\ \mathrm{mm\,yr^{-1}}$ and increases with elevation at $450\ \mathrm{mm\,km^{-1}}$ up to a **maximum** at 1200 m, above which it decreases at $150\ \mathrm{mm\,km^{-1}}$. Find the precipitation at 1200 m and at 1600 m. If the single gauge serving the catchment stands at 250 m, estimate the error in the catchment mean assuming the catchment's area is distributed **uniformly** in elevation.
::: solution
At the maximum,
$$
P(1200) = 600 + 0.45\times(1200 - 200) = 600 + 450 = 1050\ \mathrm{mm\,yr^{-1}},
$$
and at the crest,
$$
P(1600) = 1050 - 0.15\times(1600 - 1200) = 1050 - 60 = 990\ \mathrm{mm\,yr^{-1}} .
$$
For an area uniform in elevation between 200 and 1600 m the mean is the average of the profile, which integrates to $P_{\mathrm{mean}} = 930\ \mathrm{mm\,yr^{-1}}$. The gauge at 250 m records $600 + 0.45\times50 = 623\ \mathrm{mm}$, so the catchment mean is **underestimated by 33 per cent**.

The error is not an artefact of the example but the **normal condition** of mountain hydrology. The world's gauge networks are sited in **valleys** — for access, for water supply, for agriculture — and the **mean elevation** of a mountain catchment's gauges is routinely 500–1000 m **below** the catchment's mean elevation. Because the gradient is **large** (450 mm km⁻¹ here, and 800–1000 mm km⁻¹ in the western Himalaya and the Andean foothills) and the **elevation distribution** of the area is broad, the bias is **one-signed** and **large**, and it propagates **directly** into the runoff, the snow water equivalent and the **projected** water supply.

The remedies, in order of effectiveness, are **elevation-corrected interpolation** (a regression of gauge depth on elevation, or co-kriging with a digital elevation model), **gauge-adjusted radar** with a **vertical profile** correction for the bright band and the melting layer, **satellite** products whose **orographic** skill is poor but whose **coverage** is complete, and **reanalysis** — whose precipitation over mountains is the least trustworthy product of all. All of them are **corrections to a network**, and none of them can create information where there is no gauge, which is why the **elevation distribution of the observing network** is now recognised as one of the largest unquantified uncertainties in global hydrology.
:::
:::

::: example An intensity–duration–frequency curve and a design storm {#ex-idf}
The annual maximum 1-hour rainfall intensities at a station are fitted by a **Gumbel** distribution with a mean of $20\ \mathrm{mm\,h^{-1}}$ and a standard deviation of $11\ \mathrm{mm\,h^{-1}}$. Find the 10-, 50- and 100-year intensities, and the probability that the 50-year storm is exceeded at least once in the 10-year design life of a culvert.
::: solution
For the Gumbel distribution the value of return period $T$ is
$$
x_T = \mu + \sigma\,K_T, \qquad K_T = \frac{\sqrt{6}}{\pi}\left[y_T - 0.5772\right], \qquad y_T = -\ln\!\left[-\ln\!\left(1 - \frac{1}{T}\right)\right],
$$
so
$$
\begin{array}{c|ccc}
T\ (\text{years}) & 10 & 50 & 100 \\ \hline
y_T & 2.250 & 3.902 & 4.600 \\
K_T & 1.305 & 2.592 & 3.137 \\
x_T\ (\mathrm{mm\,h^{-1}}) & 34.4 & 48.5 & 54.5
\end{array}
$$
and the probability of at least one exceedance of the 50-year storm in ten years is
$$
p = 1 - (1 - 0.02)^{10} = 18\ \text{per cent}.
$$
The **design** is therefore 82 per cent safe and 18 per cent failed, and the same arithmetic applied to a 100-year flood over a 50-year bridge gives $1 - 0.99^{50} = 39$ per cent — which is why the "100-year flood" is the most misunderstood number in public engineering.

Three cautions complete the reading. The **Gumbel** distribution is the **asymptotic** distribution of maxima and is a good fit for **convective** rainfall maxima, but the **annual-maximum** series is **not independent** — a wet year produces several large storms whose maxima are **autocorrelated** — and the **record length** matters more than the distribution: a 30-year record gives a 100-year estimate whose **95 per cent confidence interval** spans a factor of two, and the **standard error** of the 100-year value from a 30-year record is about 40 per cent. The **stationarity** assumption is now known to fail: the annual maximum intensity has risen at 5–15 per cent per decade over much of North America, Europe and East Asia, so a design storm fitted to the **whole** record is **too small** for the **future** and **too large** for the **past**, and the practice of **non-stationary** frequency analysis — with a covariate such as the global mean temperature — is becoming standard. And the **point** value must be **reduced** to an **areal** value before it is used for a catchment, which multiplies the uncertainty of the frequency analysis by the uncertainty of the areal reduction factor.

The **duration** dependence is the last and most-forgotten caution. A culvert is designed for the **concentration time** of its catchment, and if the concentration time is 12 minutes the design intensity is the **12-minute** value, which for the same return period is **two to four times** the 1-hour value. A designer who reads the 1-hour IDF column for a 10-minute urban catchment underestimates the peak by a factor of two or three, and this single error is responsible for a substantial fraction of the world's flooded underpasses.
:::
:::

::: warning The reference crop is a fiction, and using it as if it were a measurement is the commonest error in applied evaporation
Six mistakes recur. **Confusing $ET_0$ with $ET_a$**: the reference evapotranspiration is a **climatic** quantity computable anywhere from weather data, and the **actual** evaporation is what the land evaporates; over the world's drylands the ratio $ET_a/ET_0$ is 0.1–0.4, so a water balance closed with $ET_0$ instead of $ET_a$ overestimates the consumption by a factor of three and reports a **desiccated** catchment that does not exist. **Misusing the crop coefficient**: $K_c$ is calibrated for a **specific** cultivar, **specific** planting date and **non-stressed** soil, and applying the tabulated 1.20 of mid-season maize to a **water-stressed**, **nitrogen-limited** or **late-sown** crop overestimates the irrigation requirement and **wastes** the water the schedule was meant to save. **Ignoring advection**: over a **small** irrigated area, an **orchard**, a **vineyard** or a **desert** riparian woodland, the **advected** energy from the surrounding hot dry surface can raise the actual evaporation to **two to five times** the radiation-based estimate, and every one-dimensional equation in this chapter **underestimates** it. **Trusting the flux towers**: the eddy-covariance **energy-balance closure error** — the fraction of $R_n - G$ not accounted for by the measured turbulent fluxes — is 10–30 per cent globally, and the standard **energy-balance-closure** correction **inflates** the latent heat flux by an amount that depends on the **Bowen ratio**, so the FLUXNET $ET$ used to validate every remote-sensing product is itself **corrected** by an assumption. **Extrapolating the pan**: the Class-A pan coefficient of 0.6–0.8 is calibrated for a **specific** wind, humidity and pan size, and applying 0.7 to a **sheltered**, **humid** site or to a **reservoir** whose **surface temperature** differs from the equilibrium value gives errors of 30 per cent. **And assuming potential conditions where the atmosphere is the limit**: over **irrigated** intensive agriculture the **vapour-pressure deficit** can exceed the crop's capacity to supply water even at full soil moisture, so the **actual** evaporation is **below** the reference even with no water stress — the **"atmospheric demand"** limitation that has reduced the transpiration of the world's croplands since 2000 even where the irrigation has increased.
:::

::: history
**Dalton** (Dalton) published his evaporation formula in 1802, relating the rate to the vapour-pressure deficit and the wind, and **Humphreys** (Humphreys) and **Arlingham** (Arlingham) measured evaporation from lakes and pans in the 1890s and 1900s. **Penman** (Penman) derived the **combination equation** in 1948 by adding the energy and aerodynamic terms and showing that the sum reproduced both lysimeter and pan data; **Monteith** (Monteith) added the **canopy resistance** in 1965 after work on the transpiration of potatoes and wheat, **Priestley and Taylor** (Priestley) gave their **area-emphasis** simplification in 1972, **Hargreaves and the Utah school** (Hargreaves) produced the **temperature-only** method in 1966–1985 that remains the only option where radiation is not measured, and **Allen, Pereira, Raes and the FAO working group** (Allen) standardised the **Penman–Monteith** reference crop as FAO-56 in 1998. **Bouchet** (Bouchet) proposed the **complementary relationship** between actual and potential evaporation in 1963 and **Brutsaert and Stricker** (Brutsaert) turned it into a working equation in 1979. **Makkink** (Makkink) produced the radiation-only method for the Dutch polders in 1957, **Blaney and Criddle** (Blaney) their temperature-and-daylight method for California in 1950, and **Ritchie** (Ritchie) and **Doorenbos and Pruitt** (Doorenbos) codified the **crop coefficients** and the **pan coefficient** in 1977. **Bunt and the Rothamsted group** (Bunt) and **Gates** (Gates) established the **stomatal** control of transpiration, **Jarvis** (Jarvis) formalised the **canopy conductance** model in 1976, **Ball, Woodrow and Berry** (Berry) their **photosynthetic** stomatal model in 1987, and **running, Baldocchi, Schmid, and the FLUXNET community** (Running) built the **eddy-covariance** tower network from 1996. **Norman, Bastiaanssen, and the remote-sensing evaporation school** (Bastiaanssen) produced **SEBAL** in 1998, **Mu, Running and the MOD16 group** (Running) the **MOD16** global evaporation product in 2007, and **Senay, and the SSEBop group** (Senay) the operational **surface-energy-balance** product now used for operational drought and irrigation monitoring.
:::

## Where this leads

The meteorology of the four precipitation types is in [[meteorology/clouds-precipitation]], [[meteorology/fronts-cyclones]] and [[meteorology/stability]], the moisture supply in [[meteorology/moisture]] and [[climate-system/hydrological-cycle]], the snow that this chapter's precipitation stores is in [[hydrology/snow]], the soil moisture that limits the actual evaporation is in [[hydrology/soil-water]], the runoff that the excess becomes is in [[hydrology/runoff]], the extreme rainfall statistics in [[hydrology/floods-droughts]] and [[natural-hazards/floods]], the evaporation from ice in [[glaciology/mass-balance]], the energy terms in [[meteorology/radiation-temperature]] and [[climate-system/energy-budget]], the drought that a rising vapour-pressure deficit produces in [[hydrology/floods-droughts]] and [[natural-hazards/wildfire-drought-heat]], and the crop water requirement in [[earth-resources/groundwater-resources]].

::: quiz
Over a season, a rain-fed crop's actual evapotranspiration equals its potential evapotranspiration for the first two months and then falls steadily below it. What does that indicate?
- [ ] A rising water table.
- [x] The soil moisture has fallen below the level at which the roots can extract water fast enough.
- [ ] An increase in cloudiness.
- [ ] A decrease in the vapour-pressure deficit.
::: solution
$ET_a = ET_0$ requires the surface and the roots to deliver water as fast as the atmosphere demands it, which is true only while the soil is near field capacity. Once the soil dries past the “trough” the stomata close and $ET_a$ falls below $ET_0$ — the **water-limited** regime. Cloudiness or a falling VPD would reduce $ET_0$ itself, so the ratio would stay near one.
:::
:::

::: summary
- Precipitation arrives by four mechanisms with different space and time signatures, and a model that does not separate them gets the volume right and the timing, erosion and recharge wrong.
- The orographic gradient of 100–1000 mm km⁻¹, combined with valley-sited gauges, biases mountain precipitation low by tens of per cent — a one-signed error that no interpolation can fully remove.
- Saturation vapour pressure rises about 7 per cent per kelvin, so evaporative demand, extreme rainfall intensity and drought severity all respond to warming faster than the precipitation mean does.
- The Penman–Monteith reference crop is a defined fiction; the Priestley–Taylor simplification is 10–15 per cent lower and valid only for well-watered, well-coupled surfaces.
- Actual evapotranspiration is bounded by both water and energy supply, and the Bouchet complementary relationship explains why pan evaporation fell while the planet's actual evaporation rose.
- Intensity–duration–frequency curves are point statistics, and the areal reduction factor that converts them to a catchment design storm is among the least justified numbers in engineering.
:::

## Exercises

::: exercise Saturation vapour pressure {level=1 check="1.23"}
Find the saturation vapour pressure at $10\ ^\circ\mathrm{C}$ and the vapour pressure at a relative humidity of 60 per cent.
::: solution
$e_{\mathrm{s}} = 0.6108\exp(17.27\times10/245.51) = 1.23\ \mathrm{kPa}$, and $e_{\mathrm{a}} = 0.60\times1.23 = 0.74\ \mathrm{kPa}$, giving a **vapour-pressure deficit** of $0.49\ \mathrm{kPa}$. The same 60 per cent relative humidity at $30\ ^\circ\mathrm{C}$ gives a deficit of $0.40\times4.30 = 1.72\ \mathrm{kPa}$ — **3.5 times** the evaporative demand at the same humidity.
:::
:::

::: exercise The dew point {level=1 check="10"}
Air at $25\ ^\circ\mathrm{C}$ has a vapour pressure of $1.23\ \mathrm{kPa}$. Find the dew-point temperature.
::: solution
The dew point is the temperature at which the air would be saturated, so solve $1.23 = 0.6108\exp[17.27\,T_{\mathrm{d}}/(T_{\mathrm{d}} + 235.51)]$: $T_{\mathrm{d}} = 10\ ^\circ\mathrm{C}$. The dew point is the **conserved** variable of an unsaturated air parcel, and the **dew-point depression** $T - T_{\mathrm{d}} = 15\ \mathrm{K}$ is a better predictor of a day's **fire** behaviour and of a crop's **stomatal** closure than the relative humidity, because it does not change when the air warms diurnally.
:::
:::

::: exercise The crop coefficient {level=1 check="6"}
For a mid-season maize crop with $K_c = 1.2$, a reference evapotranspiration of $5.0\ \mathrm{mm\,d^{-1}}$, an effective rainfall of $1.5\ \mathrm{mm\,d^{-1}}$ and an application efficiency of 0.75, find the irrigation requirement.
::: solution
$ET_{\mathrm{crop}} = 1.2\times5.0 = 6.0\ \mathrm{mm\,d^{-1}}$, the deficit is $6.0 - 1.5 = 4.5\ \mathrm{mm\,d^{-1}}$, and the water that must be **applied** is $4.5/0.75 = 6.0\ \mathrm{mm\,d^{-1}}$. The **efficiency** doubles the water applied relative to the deficit, and the difference between a **surface** flood at 0.5 and a **drip** system at 0.9 is the difference between 9.0 and 5.0 mm d⁻¹ of abstraction — which is why irrigation **efficiency** improvements so often fail to save **water**: the water "saved" by a lined canal or a drip system was mostly returning to the same aquifer.
:::
:::

::: exercise The aerodynamic weight {level=2 check="37"}
At what temperature does the **energy** term carry a weight of 0.84 in the Penman equation, taking $\gamma = 0.0675\ \mathrm{kPa\,K^{-1}}$?
::: solution
The weight is $\Delta/(\Delta + \gamma) = 0.84$, so $\Delta = 0.84\gamma/0.16 = 0.354\ \mathrm{kPa\,K^{-1}}$, which occurs at about $37\ ^\circ\mathrm{C}$. The weight rises from 0.48 at $5\ ^\circ\mathrm{C}$ to 0.84 at $37\ ^\circ\mathrm{C}$, so a **cold** lake's evaporation is dominated by the **wind** and **humidity** and a **tropical** ocean's by the **radiation** — which is why the global mean evaporation is so sensitive to the **sea-surface temperature** and so insensitive to the **wind speed** in the models, and why the **cold** lakes of North America and Siberia are the evaporations most affected by a **calming** of the wind.
:::
:::

::: exercise Areal reduction {level=2 check="36"}
A 1-hour point rainfall intensity of $50\ \mathrm{mm\,h^{-1}}$ has a return period of 25 years. With an areal reduction factor of 0.72 for a 150-km² catchment, find the areal design intensity, and explain why the factor is smaller for a convective than for a stratiform storm.
::: solution
The areal intensity is $0.72\times50 = 36\ \mathrm{mm\,h^{-1}}$. The factor is smaller for a **convective** storm because its high-intensity core is only **1–5 km** across, so most of a 150-km² catchment receives a small fraction of the point maximum; for a **stratiform** or **tropical-cyclone** storm the high-intensity region is **50–500 km** across, the factor approaches 0.9–1.0, and the point value is nearly the areal one. Applying a single areal reduction factor to a **mixed** climate is a systematic error of 10–25 per cent in the design storm, and the modern remedy is to derive the factor from **radar** rather than from the point-statistics tables of the 1950s.
:::
:::

::: exercise The Priestley–Taylor coefficient {level=2 check="189"}
A wet surface has $R_n - G = 200\ \mathrm{W\,m^{-2}}$, $\Delta = 0.20\ \mathrm{kPa\,K^{-1}}$ and $\gamma = 0.067\ \mathrm{kPa\,K^{-1}}$. Find the Priestley–Taylor latent heat flux, the Bowen ratio, and what a coefficient of 0.7 rather than 1.26 would imply.
::: solution
$$
\lambda ET = 1.26\,\frac{\Delta}{\Delta + \gamma}(R_n - G) = 1.26\times\frac{0.20}{0.267}\times200 = 189\ \mathrm{W\,m^{-2}},
$$
so the sensible heat flux is $200 - 189 = 11\ \mathrm{W\,m^{-2}}$ and the **Bowen ratio** is $11/189 = 0.06$ — a surface that consumes almost all of its energy in evaporation. With $\alpha = 0.7$ the latent heat flux would be $105\ \mathrm{W\,m^{-2}}$ and the Bowen ratio 0.90, which is a **water-limited** or **stressed** surface.

A coefficient of **1.26** is Priestley and Taylor's original value, obtained for a **wet**, **well-coupled** surface where the **evaporating front** cools itself and the resulting **convective** instability supplies extra energy — the extra 26 per cent over the equilibrium value is that **advected** energy. A coefficient of **0.7** implies a **dry**, **un coupled** or **stressed** surface on which the actual evaporation is **below** the equilibrium value, and the coefficient is therefore used as a **diagnostic** of water stress in remote-sensing work. Values **above** 1.3 over a large area are physically suspect, because they require an energy supply that the radiation balance cannot provide.
:::
:::

::: exercise The energy-balance closure {level=3 check="17"}
An eddy-covariance tower measures a latent heat flux of $120\ \mathrm{W\,m^{-2}}$ and a sensible heat flux of $60\ \mathrm{W\,m^{-2}}$ under a net radiation of $220\ \mathrm{W\,m^{-2}}$ and a soil heat flux of $10\ \mathrm{W\,m^{-2}}$. Find the closure error, and, if it is corrected by the **Bowen-ratio** method, the corrected latent heat flux.
::: solution
The available energy is $R_n - G = 220 - 10 = 210\ \mathrm{W\,m^{-2}}$ and the measured turbulent sum is $120 + 60 = 180\ \mathrm{W\,m^{-2}}$, so the closure error is
$$
\frac{210 - 180}{210} = 14\ \text{per cent}.
$$
The **Bowen-ratio** correction forces the sum to the available energy **while preserving** the measured Bowen ratio $\beta = H/LE = 0.5$, giving
$$
LE = \frac{210}{1 + 0.5} = 140\ \mathrm{W\,m^{-2}},
$$
an increase of **17 per cent** in the latent heat flux and therefore in the derived evaporation.

The correction is standard, necessary and **unjustified**, and this is the scandal of the flux-tower method. The missing energy is not random noise but a **systematic** deficit, largest over **forests**, **irrigated** fields and **patchy** landscapes, and the candidate explanations — **inhomogeneous** surface heating driving **mesoscale** circulations that carry heat away from the tower's footprint, **horizontal** advection, **sub-diurnal** storage in the canopy, and **instrument** and **processing** error — are not mutually exclusive and are not measured at most sites. Because the correction **preserves the measured Bowen ratio**, it **inflates** the latent heat flux by an amount that is **largest** where the Bowen ratio is **smallest** — that is, over the **wettest** surfaces, where the evaporation is already the largest.

The consequence is that the FLUXNET data set used to **calibrate** and **validate** every remote-sensing and model estimate of global evaporation carries a **10–30 per cent** correction whose sign is known and whose magnitude is a **choice** of method. The **uncorrected** global land evaporation from the towers is about **8 per cent lower** than the corrected, and the difference is of the same size as the **trends** that the same data set is used to detect — which is why the reported global evaporation over the last forty years has been variously described as **increasing**, **constant** and **decreasing**, and why the question is still open.
:::
:::

::: exercise The evaporation paradox {level=3 check="1.4"}
A lake's water surface is $12\ ^\circ\mathrm{C}$ and the overlying air is $24\ ^\circ\mathrm{C}$ at a relative humidity of 40 per cent. Find the ratio of the vapour pressure at the surface to that of the air, and state the direction of the **sensible** heat flux.
::: solution
The surface is saturated at $12\ ^\circ\mathrm{C}$: $e_{\mathrm{s}}(12) = 1.38\ \mathrm{kPa}$. The air has $0.40\times e_{\mathrm{s}}(24) = 0.40\times2.99 = 1.20\ \mathrm{kPa}$. The ratio is $1.38/1.20 = 1.15$, so the **vapour-pressure gradient** is **outward** and the lake is **evaporating** — but only weakly, and the **sensible** heat flux is **toward** the water, because the air is **warmer** than the surface.

The **stability** is the point. Warm, dry air over a cold lake is **statically stable** at the surface, which **suppresses** the turbulence that carries the vapour away, so the evaporation is **less** than the wind and the deficit alone would predict. This is the **evaporative** analogue of the **lake-effect** problem in reverse: when the water is **warmer** than the air the stratification is **unstable**, the turbulence is vigorous, and the evaporation is **several times** the value computed from the same wind and deficit over a neutral surface. The **stability correction** to the aerodynamic term — the **Monin–Obukhov** similarity functions — changes the evaporation of a cold lake by a factor of two and of a warm tropical ocean by 10 per cent, and it is omitted from every one-dimensional crop-evaporation equation in this chapter.

The paradox resolves on the same physics. A **drying** land surface **warms** the boundary layer and **dries** it, which **raises** the **potential** evaporation of a pan while **lowering** the **actual** evaporation of the land — the **complementary** relationship — and the pan, whose own surface temperature is set by the same boundary layer, records the **first**. The measured **decline** of pan evaporation over the last half-century and the modelled **rise** of the land's actual evaporation are therefore **not** in conflict, and the same physics explains why the **aridity** of the subtropics is rising faster than any individual term of the balance would suggest.
:::
:::
