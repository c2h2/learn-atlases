The sea surface is a **two-millimetre membrane** across which the atmosphere delivers **all** the ocean's momentum, **all** its heat and **all** its freshwater, and takes back **most** of the water vapour that falls on land. Everything in physical oceanography — every current, every water mass, every carbon and oxygen budget — begins as a **flux** through this interface, and the whole subject rests on a handful of formulae so simple that a student can write them in one line and so badly determined that the same formulae disagree with each other by **30 per cent**.

## The bulk formulae

::: definition Momentum, heat and water: the three fluxes {#def-bulk}
Within a few tens of metres of the surface the atmosphere is a **near-neutral, logarithmic** boundary layer, and the fluxes are written as **bulk aerodynamic formulae** in the **10-m wind speed** $U$, the **sea–air differences** of temperature and humidity, and three **dimensionless exchange coefficients**:
$$
\boxed{\;\boldsymbol{\tau} = \rho_a\,C_D\,U\,\mathbf{U},\qquad
H = \rho_a\,c_p\,C_H\,U\,(T_s - T_a),\qquad
LE = \rho_a\,L_v\,C_E\,U\,(q_s - q_a)\;}
$$
with $\rho_a = 1.2\ \mathrm{kg\,m^{-3}}$, $c_p = 1004\ \mathrm{J\,kg^{-1}\,K^{-1}}$, $L_v = 2.45\times10^{6}\ \mathrm{J\,kg^{-1}}$, and, in **neutral** conditions at **moderate** wind, the **Reynolds analogy**
$$
C_D \approx C_H \approx C_E \approx 1.2\times10^{-3} .
$$
The drag coefficient is not constant: it rises from $0.8\times10^{-3}$ at $3\ \mathrm{m\,s^{-1}}$ to $2.5\times10^{-3}$ at $25\ \mathrm{m\,s^{-1}}$, because the form drag of short wind waves and then of spray and flow separation over breaking crests takes over from skin friction. The Charnock (1955) relation
$$
z_0 = \alpha\,\frac{u_*^{2}}{g}, \qquad \alpha \approx 0.018, \qquad u_* = \sqrt{\tau/\rho_a},
$$
ties the aerodynamic roughness to the friction velocity and is the reason the drag is wind-speed-squared rather than linear: the sea is rougher the faster it is blown. The coefficients carry stability corrections — a unstable (warm, windy) surface enhances all three fluxes and a stable one suppresses them — and the cool skin, the rain and the sea state make the effective $C_E$ at high wind a live research question, with published parameterisations disagreeing by 30–50 per cent in the hurricane regime where it matters most.

The **net surface heat flux** is the sum of four terms,
$$
Q_{\mathrm{net}} = \underbrace{F_{\mathrm{SW}}(1-\mathrm{Alb})}_{\text{shortwave in}} - \underbrace{F_{\mathrm{LW}}}_{\text{longwave out}} - \underbrace{LE}_{\text{latent}} - \underbrace{H}_{\text{sensible}} + \underbrace{Q_{\mathrm{net,\,adv}}}_{\text{negligible}},
$$
and its partition is the interesting part. Over the global ocean about 80 per cent of the heat the ocean loses goes by latent heat — evaporation — and only 20 per cent by sensible heat and net longwave together. The ocean is therefore first of all the planet's distillation apparatus: it evaporates $3.6\ \mathrm{mm\,d^{-1}}$ of water globally, $4.1\times10^{4}\ \mathrm{km^{3}\,yr^{-1}}$ more than it precipitates, and pays $2.45\times10^{6}\ \mathrm{J}$ for every kilogram.
:::

::: definition The pattern, and why the ocean is salty where it is dry {#def-pattern}
The **buoyancy** forcing — the part of the heat and freshwater flux that changes **density** — has a geometry that determines the whole circulation.

Heat. The ocean gains $+25$ to $+40\ \mathrm{W\,m^{-2}}$ in the tropics and loses $-40$ to $-120\ \mathrm{W\,m^{-2}}$ in the western boundary-current and subpolar regions, with the maximum loss under the Gulf Stream and Kuroshio in winter — $600\ \mathrm{W\,m^{-2}}$ in an air mass 20 °C colder than the sea — and a secondary maximum around Antarctica. The meridional gradient of $1\ \mathrm{W\,m^{-2}}$ per degree of latitude is why the ocean must carry heat poleward: the total northward heat transport across the equator is $0.4\ \mathrm{PW}$, the atmosphere carries $3.6\ \mathrm{PW}$ southward across the equator and $5\ \mathrm{PW}$ northward at $20\ \mathrm{^\circ N}$, and the ocean carries $1.3\ \mathrm{PW}$ northward in the Atlantic and $0.4\ \mathrm{PW}$ in the Pacific — the ocean's share being a quarter of the total and all of it in the Atlantic, because the Atlantic is the only ocean with a deep overturning cell that crosses the equator.

Freshwater. Evaporation minus precipitation is $+1.5$ to $+2\ \mathrm{m\,yr^{-1}}$ in the subtropical bands at 20–30 ° in both hemispheres and $-1$ to $-2\ \mathrm{m\,yr^{-1}}$ at the equator, in the equatorial convergence, in the subpolar North Atlantic and around Antarctica. Because salt is conserved, the sea-surface salinity is a lagged, smoothed image of $E-P$: the subtropical salinity maxima at 36–37 PSU sit directly under the evaporation maxima, the equatorial and subpolar minima under the rainfall, and the Atlantic is 3 PSU saltier than the Pacific because the Atlantic loses $0.35\ \mathrm{Sv}$ of freshwater to the atmosphere and the Pacific gains — the saltier, denser Atlantic being the reason the Atlantic has a deep overturning circulation and the Pacific does not.

Buoyancy. The two combine non-linearly, because cold salty water is dense and warm fresh water is light but cold fresh water is lighter than warm salty water at the same density. The freshwater flux is worth $0.78\ \mathrm{kg\,m^{-3}}$ per PSU and the heat flux $0.21\ \mathrm{kg\,m^{-3}}$ per °C, so 1 m yr⁻¹ of net evaporation (about 30 PSU in a 50-m mixed layer over a decade) outweighs a decade of 1 °C of cooling. In the subtropics the salt forcing dominates the stratification; in the subpolar and polar oceans the heat forcing dominates; and in the Southern Ocean and the subpolar North Atlantic the two compete, which is why those two regions are where every climate projection disagrees.
:::

::: example Wind stress and the Charnock roughness {#ex-stress}
Find the wind stress and the Charnock roughness length for a **10-m** wind of **10 m s⁻¹** and of **20 m s⁻¹** over the open ocean, taking $\rho_a = 1.2\ \mathrm{kg\,m^{-3}}$ and $C_D = 1.5\times10^{-3}$ at the lower wind and $C_D = 2.0\times10^{-3}$ at the higher.
::: solution
$$
\tau(10) = 1.2\times1.5\times10^{-3}\times10^{2} = 0.18\ \mathrm{N\,m^{-2}}, \qquad
\tau(20) = 1.2\times2.0\times10^{-3}\times20^{2} = 0.48\ \mathrm{N\,m^{-2}},
$$
with friction velocities $u_* = \sqrt{\tau/\rho_a} = 0.39$ and $0.63\ \mathrm{m\,s^{-1}}$, and roughness lengths
$$
z_0 = 0.018\,\frac{u_*^{2}}{g} = 0.28\ \mathrm{mm} \quad\text{and}\quad 0.73\ \mathrm{mm}.
$$
Doubling the wind quadruples the stress and multiplies the roughness length by 2.6, and it is the roughness itself that makes the drag super-linear.

The 0.18 N m⁻² is a small number — the weight of 18 grams on a square centimetre — and it is the only horizontal force the atmosphere applies to the whole ocean. Over the Pacific basin, an area of $1.6\times10^{14}\ \mathrm{m^{2}}$, a zonal-mean stress of 0.1 N m⁻² is a total force of $1.6\times10^{13}\ \mathrm{N}$, and the whole of the North Equatorial Current, the Kuroshio and the California Current are the ocean's response to it, balanced at last by bottom friction and by form drag on the mid-ocean ridge — the form drag on seamounts and ridges being 10–20 per cent of the total and almost entirely unresolved in kilometres-scale general circulation models.

The 0.73 mm roughness at 20 m s⁻¹ is the transition to the whitecap regime, above which the Charnock relation breaks down: the drag coefficient levels off or even decreases between 25 and 40 m s⁻¹ in the most careful measurements, because flow separation over the air cavity above a breaking crest shields the surface. That saturation is the single largest uncertainty in tropical-cyclone intensity forecasting, because the intensity of a hurricane is set by the enthalpy flux, which is set by $C_E$ at 50–70 m s⁻¹, and the published values of $C_E$ at that wind differ by a factor of two.
:::
:::

::: widget plot
f: 1.2*1.5e-3*1.2*x*x
x: 0, 30
y: 0, 2.0
labels: \tau\ (\mathrm{N\,m^{-2}})
caption: The wind stress $\tau = \rho_a C_D U^{2}$ for a constant drag coefficient of $1.5\times10^{-3}$, against the 10-m wind speed. The quadratic law is the whole of the energy argument — the power the wind delivers to the ocean is $\tau U \propto U^{3}$ — and it is why a doubling of the mean wind would octuple the energy input to the surface mixed layer and roughly triple the global internal-wave and near-inertial mixing. The real curve lies below this one at low wind, where the surface is hydrodynamically smooth and $C_D$ falls to $0.8\times10^{-3}$, and below it again above 25 m s⁻¹, where flow separation over breaking crests shields the surface and the drag saturates. Between those two regimes — the 5–20 m s⁻¹ range that covers most of the ocean most of the time — the quadratic law with $C_D = 1.5\times10^{-3}$ is accurate to 10 per cent, and that is the only reason the Ekman and Sverdrup theory of the next chapter works at all.
:::

::: definition Gas exchange, the cool skin and the barrier layer {#def-gas}
Gases cross the interface by turbulent renewal rather than by molecular diffusion alone, and the standard formulation is the two-layer or piston model,
$$
F = k\,\Delta C = k\,K_0\,\Delta p, \qquad
k = k_w\left(\frac{Sc}{660}\right)^{-1/2} + a\,e^{bU},
$$
where $k$ is the piston velocity in $\mathrm{m\,d^{-1}}$, $Sc = \nu/D$ is the Schmidt number — 660 for CO₂ at 20 °C, 600 for O₂, 20,000 for N₂O — $K_0$ is the Henry's-law solubility, and the two terms are the diffusive and bubble-mediated pathways. The wind dependence is steep: the classic Wanninkhof (1992) $k \propto U^{2}$ and the modern Wanninkhof (2014) and Nightingale (2000) parameterisations give $k_{660}$ of 1 m d⁻¹ at 4 m s⁻¹ and 12 m d⁻¹ at 14 m s⁻¹, and bubbles from whitecapping add a $U$-threshold term that dominates oxygen, nitrogen and helium at high wind while leaving CO₂ — which dissolves readily — largely unaffected. The global mean piston velocity for CO₂ is 5–6 m d⁻¹, corresponding to an equilibration time of a few weeks to a few months for the mixed layer: fast enough that the surface almost equilibrates with the atmosphere, slow enough that the residual 20-µatm disequilibrium carries the whole of the anthropogenic uptake.

Three near-surface structures control the fluxes and are invisible to buoys and satellites alike. The cool skin is the 0.1–0.3 K temperature drop across the top 0.1 mm, maintained by the net longwave loss of 60 W m⁻² through a laminar or diffusive-convectional sublayer; it makes the infrared satellite see a cooler sea than the microwave radiometer, the buoy or the ship's intake, and it reduces the ocean's CO₂ uptake by 5–10 per cent because it lowers the surface temperature that sets the solubility. The diurnal warm layer is its daytime opposite: 250 W m⁻² of solar radiation absorbed in the top few metres under light winds raises the top metre by 0.5–1.0 K above the mixed layer below, suppresses turbulence, and collapses after sunset. The barrier layer is a fresh lens, often 10–40 m thick and 0.2–1.0 PSU fresher than the water beneath, left by rain or ice melt in the tropics and the meltwater zones; because it stratifies on salinity rather than temperature it traps heat above the thermocline, deepens the warm-pool mixed layer without warming it, and is now recognised as a first-order control on El Niño and on tropical-cyclone intensification.
:::

::: example Latent, sensible and the ocean's heat budget {#ex-heat}
In the western tropical Pacific the sea surface is 29 °C, the air 26 °C, the 10-m wind 7 m s⁻¹ and the relative humidity 75 per cent. Take $q_s(29\ \mathrm{^\circ C}, S=35) = 0.0211\ \mathrm{kg\,kg^{-1}}$ and $q_a = 0.0160\ \mathrm{kg\,kg^{-1}}$. Find the latent, sensible and total non-radiative surface heat fluxes, and compare them with the net shortwave of 230 W m⁻² and net longwave loss of 90 W m⁻².
::: solution
$$
LE = 1.2\times2.45\times10^{6}\times1.2\times10^{-3}\times7\times(0.0211-0.0160) = 126\ \mathrm{W\,m^{-2}},
$$
$$
H = 1.2\times1004\times1.2\times10^{-3}\times7\times(29-26) = 30\ \mathrm{W\,m^{-2}},
$$
so the **net** heat flux into the sea is
$$
Q = 230 - 90 - 126 - 30 = -16\ \mathrm{W\,m^{-2}} .
$$
**Evaporation removes four times as much heat as sensible transfer**, and the warm pool is very nearly in **balance** — which is the sense in which the tropical ocean is a **thermostat**: the surface temperature **self-adjusts** until the **Clausius–Clapeyron** growth of $q_s$ — **7 per cent per °C** — turns the wind into enough evaporation to shut off the net gain.

The 7 per cent per °C is the most consequential number in the hydrological cycle. Because $q_s$ grows exponentially with temperature while the wind and the radiation grow at most linearly, a warmer atmosphere must evaporate more and precipitate more, and the global water cycle intensifies at roughly 7 per cent per °C — the Clausius–Clapeyron scaling — while the zonal-mean circulation intensifies less, giving the observed "wet gets wetter, dry gets drier, but the middle gets wetter" pattern and the salinity-amplification signal in the Argo and Aquarius/SMAP records.

The near-balance of −16 W m⁻² in a region that receives 230 W m⁻² of sunlight is the reason sea-surface temperature maps are so smooth in the warm pool and so steep in the mid-latitudes: the tropics dump their heat vertically, by evaporation, into the trade-wind and convective updrafts, and the mid-latitude ocean dumps it horizontally into the atmospheric western boundary currents, which is where the storm tracks and the climate of Western Europe come from.
:::
:::

::: example The Mediterranean: a basin run by evaporation {#ex-med}
The Mediterranean loses 0.8 m yr⁻¹ more water to evaporation than it gains from rain and rivers, covers $2.5\times10^{13}\ \mathrm{m^{2}}$, receives Atlantic water of salinity 36.2 and returns Mediterranean water of salinity 38.6 through the Strait of Gibraltar. Find the inflow and outflow in $\mathrm{m^{3}\,s^{-1}}$.
::: solution
The freshwater loss is
$$
R = 0.8\times2.5\times10^{13}/(3.16\times10^{7}) = 6.3\times10^{4}\ \mathrm{m^{3}\,s^{-1}},
$$
and the **salt** balance $Q_{\mathrm{in}}S_A = Q_{\mathrm{out}}S_M$ with $Q_{\mathrm{in}} = Q_{\mathrm{out}} + R$ gives
$$
Q_{\mathrm{out}} = \frac{R\,S_A}{S_M - S_A} = \frac{6.3\times10^{4}\times36.2}{2.4} = 9.5\times10^{5}\ \mathrm{m^{3}\,s^{-1}}, \qquad
Q_{\mathrm{in}} = 1.0\times10^{6}\ \mathrm{m^{3}\,s^{-1}} .
$$
The observed Gibraltar transport is $0.9$–$1.1\times10^{6}\ \mathrm{m^{3}\,s^{-1}}$ — the salt balance predicts it from meteorology alone.

The mechanism is a distillation engine: evaporation removes pure water, concentrates the remainder, and the resulting dense water must export the excess salt — which it does as a salty, warm, oxygen-poor outflow at 200–600 m that spreads through the eastern and then the whole basin on a 50-to-100-year timescale. The same arithmetic runs the Red Sea (40 PSU), the Persian Gulf (40–60 PSU), the Dead Sea (300 PSU) and, in reverse, the Baltic and the Black Sea, where net freshwater input makes the surface buoyant and the deep water stagnant.

The climate application is direct. Because the outflow salinity is set by the ratio $S_M/(S_M - S_A)$, a small change in the salinity contrast produces a large change in exchange: a 10 per cent freshening that took $S_M$ from 38.6 to 38.2 would raise the required outflow by 20 per cent, and a basin whose salinity contrast collapses stops exchanging altogether. This is the Messinian mechanism in reverse — a Mediterranean cut off from the Atlantic in 5.96 Myr evaporated to a salt floor two kilometres thick in perhaps a thousand years — and it is why the Pliocene and Pleistocene Mediterranean salinity-crisis cycles are astronomically paced.
:::
:::

::: example The air–sea CO₂ flux {#ex-co2}
Take a **sea–air** $p\mathrm{CO_2}$ difference of **20 µatm** (ocean higher), a piston velocity of **5 m d⁻¹** and a **CO₂** solubility of $3.4\times10^{-2}\ \mathrm{mol\,kg^{-1}\,atm^{-1}}$. Find the **air-to-sea** flux in $\mathrm{mol\,m^{-2}\,yr^{-1}}$ and in $\mathrm{Pg\ C\ yr^{-1}}$ globally, and explain why the observed uptake is **half** that.
::: solution
The **concentration** difference across the interface is
$$
\Delta C = 3.4\times10^{-2}\times20\times10^{-6} = 6.8\times10^{-7}\ \mathrm{mol\,kg^{-1}},
$$
and the flux is
$$
F = k\,\Delta C\,\rho = 5\times365\times6.8\times10^{-7}\times1025 = 1.3\ \mathrm{mol\,m^{-2}\,yr^{-1}},
$$
which over $3.61\times10^{14}\ \mathrm{m^{2}}$ is $4.6\times10^{14}\ \mathrm{mol\,yr^{-1}} = 5.5\ \mathrm{Pg\ C\ yr^{-1}}$. The **observed** uptake is **2.8 Pg C yr⁻¹**, about **half**.

The discrepancy is not an error in $k$ but in the arithmetic of averaging. The mean flux is the average of $k\,\Delta p$ and not the product of the mean $k$ and the mean $\Delta p$: the warm tropics, where the solubility is low, are a source of CO₂ to the atmosphere, the cold subpolar and Southern Ocean are sinks, and the two partially cancel — the gross two-way exchange is 90 Pg C yr⁻¹ and the residual is 2.8. Averaging the driving variable instead of the flux overestimates the sink by a factor of two, and this correlation error is the largest single structural uncertainty in every surface-flux and earth-system-model estimate of the ocean carbon sink.

The second lesson is the $\Delta p$ itself. The 20 µatm sea-to-air excess is entirely anthropogenic: before 1850 the ocean was within ±2 µatm of equilibrium and the natural flux was zero in the mean. The ocean's uptake is therefore proportional to the atmospheric rise and to the circulation's ability to bury the absorbed carbon — and the observed slowdown of the sink fraction from 28 per cent in the 1980s to 24 per cent in the 2010s is a decrease in the efficiency, not of the sink, whose absolute value has tripled.
:::
:::

::: warning The bulk formulae are a hundred years old, the coefficients are wrong by thirty per cent, and the fluxes are measured in the wrong place
Seven errors dominate the practice. The exchange coefficients are treated as constants. $C_D$, $C_H$ and $C_E$ vary with stability, sea state, wave age, spray, rain and wind direction, and the spread between the leading hurricane-regime parameterisations is a factor of two — which propagates directly into cyclone-intensity forecasts. The flux is computed from the mean and the mean of the product is not the product of the means. The diurnal,  gusty, frontal and mesoscale covariation of $U$, $\Delta T$ and $\Delta q$ biases the monthly-mean flux by 10–30 per cent, and the covariance term is systematically dropped in reanalyses. The fluxes are measured at 10 m and applied at 0 m. The cool skin, the diurnal warm layer and the rain lens mean the surface temperature used in the formula is 0.1–1.0 K different from the bulk value, and the skin correction is applied inconsistently across products. The rain is ignored. A single heavy rain event deposits a fresh lens that suppresses gas exchange by 50 per cent for a day, stratifies the mixed layer, and triggers convection — and no bulk formula contains a rain term. The bubbles are ignored for everything but oxygen. Rain, breaking and whitecapping inject bubble mediated fluxes of nitrogen, argon, helium, methane and nitrous oxide that are absent from the Schmidt-scaled diffusive term, and the apparent oxygen supersaturation used to compute community production is contaminated by them. The buoy is not the ocean. A moored buoy measures one point, one season, one weather; the flux field is eddy-modulated at 10–30 per cent at 100-km scales, and mooring records are biased toward accessible and temperate regions. And the net is assumed to be the whole story. The net surface heat flux over the global ocean is less than 1 W m⁻², while the individual terms are 100–300 W m⁻² — so a 0.5 per cent bias in any one of them is the climate signal, and the observed ocean heat content is now the only measurement accurate enough to close the budget.
:::
::: history
Edmond Halley (Halley) computed in 1687 that evaporation from the Mediterranean alone could supply all the rivers flowing into it, and Pierre Perrault (Perrault) and Edme Mariotte (Mariotte) settled the runoff side of the same budget in 1674–1679, founding the water-balance method that still closes the ocean's salt and freshwater budgets. Vilhelm Bjerknes (Bjerknes) and the Bergen school established in 1904–1911 that the atmosphere and ocean are one coupled system and that polar fronts are where the ocean surrenders its heat; Harald Sverdrup and B. Helland-Hansen measured the heat and salt budget of the Norwegian Sea in the 1916–1920 *Rapports* and showed that evaporation dominates its heat loss. Harold Jeffreys (Jeffreys) derived the wind generation of water waves in 1925, the first quantitative link between the stress and the surface it acts on, and Emanuel Charnock (Charnock) gave the roughness-length relation $z_0 = 0.018\,u_*^{2}/g$ in 1955, which is still the parameterisation inside every climate model. Klaus Kalle (Kalle) wrote the first systematic evaporation and salinity balance of the oceans in 1962, Gustaf Wüst (Wüst) the first heat and freshwater atlas in 1964, and Mikhail Budyko (Budyko) put the same budget into a planetary energy-balance framework in 1969. Karl Katsaros (Katsaros) and the University of Washington group made the first eddy-correlation measurements of momentum, heat and vapour over the open ocean through the 1970s and 1980s, and Chris Fairall (Fairall) and colleagues produced the COARE flux algorithms in 1996 that every tropical flux dataset is still reduced with. The cool skin was predicted by Hans Grassl (Grassl) in 1976, measured by Robert Saunders (Saunders) in 1967, and mapped systematically from aircraft and ships by Simon Hook (Hook) and Peter Minnett (Minnett) from 1998. The piston model of gas exchange is the work of Peter Liss (Liss) in the 1970s, the wind-speed parameterisations those of Liss and Luc Merlivat (Merlivat) in 1986, Rik Wanninkhof (Wanninkhof) in 1992 and 2014, and Peter Nightingale (Nightingale) in 2000, and the bubble-mediated term those of Neville Emerson (Emerson) and David Woolf (Woolf). Michael McPhaden (McPhaden) and the TAO/TRITON array, deployed across the equatorial Pacific from 1985, made the air–sea heat and freshwater flux a continuously observed quantity for the first time in history.
:::

## Where this leads

The stress computed here drives the Ekman and Sverdrup theory of [[oceanography/wind-driven]], the buoyancy flux drives the water-mass formation of [[oceanography/overturning]], the freshwater flux sets the salinity of [[oceanography/seawater]] and the steric term of [[oceanography/sea-level]], the gas flux is the boundary condition of [[oceanography/ocean-chemistry]] and [[oceanography/productivity]], the heat flux is the lower boundary of [[meteorology/radiation-temperature]] and [[atmospheric-dynamics/general-circulation]], the evaporation is the source of the precipitation of [[hydrology/precipitation-evaporation]], the El Niño coupling is [[climate-system/variability]], and the ocean heat uptake is the central uncertainty of [[climate-system/feedbacks-sensitivity]] and [[climate-change/sea-level-rise]].

::: quiz
Why does the ocean's net surface heat flux, which is nearly zero globally, still control the climate?
- [ ] Because it is measured inaccurately.
- [x] Because its meridional pattern forces the ocean and atmosphere to transport heat poleward.
- [ ] Because it is largest at the equator.
- [ ] Because it is entirely radiative.
::: solution
The global mean is nearly zero, but the pattern is not: the ocean gains 25–40 W m⁻² in the tropics and loses 40–120 W m⁻² at mid-latitudes. That meridional contrast is what the ocean and atmosphere must transport, and the transport is what makes Northwest Europe mild and the tropics not boil.
:::
:::

::: summary
- Three bulk formulae deliver all the ocean's momentum, heat and freshwater, and the Reynolds analogy makes the three exchange coefficients equal to about 1.2 × 10⁻³ in neutral conditions.
- The drag is quadratic because the sea's roughness grows with the wind — Charnock's law — and it saturates above about 25 m s⁻¹, which is the largest uncertainty in hurricane forecasting.
- Eighty per cent of the heat the ocean loses goes by evaporation, so the sea surface is a thermostat set by the 7-per-cent-per-°C growth of saturation humidity.
- Sea-surface salinity is a lagged image of evaporation minus precipitation, and the 3-PSU contrast between the Atlantic and the Pacific is why only the Atlantic has a deep overturning cell.
- Gas exchange follows a piston velocity that scales with wind speed and the inverse square root of the Schmidt number; the global mean for CO₂ is 5–6 m d⁻¹.
- The cool skin, the diurnal warm layer and the fresh barrier layer are millimetre-to-metre structures that alter the fluxes by tens of per cent and are invisible to every satellite.
- The net heat flux is under 1 W m⁻² while its terms are 100–300 W m⁻², so a half-per-cent bias in any one term is the climate signal.
:::

## Exercises

::: exercise Wind stress {level=1 check="0.46"}
Find the wind stress at a **10-m** wind of **15 m s⁻¹** with $C_D = 1.7\times10^{-3}$ and $\rho_a = 1.2\ \mathrm{kg\,m^{-3}}$.
::: solution
$\tau = 1.2\times1.7\times10^{-3}\times15^{2} = 0.46\ \mathrm{N\,m^{-2}}$. This is the **stress** under a **moderate** trade wind, and it is the **only** horizontal force acting on the entire **Pacific** — the whole of the **North Equatorial Current** and the **Kuroshio** are this number, integrated.
:::
:::

::: exercise The power input {level=1 check="9.6"}
Find the **mechanical power per unit area** delivered by a wind exerting a stress of $0.48\ \mathrm{N\,m^{-2}}$ at $20\ \mathrm{m\,s^{-1}}$.
::: solution
$P = \tau U = 0.48\times20 = 9.6\ \mathrm{W\,m^{-2}}$. Because $P \propto U^{3}$, a doubling of the wind multiplies the mechanical energy input by eight — which is why a projected ten-per-cent increase in storm wind speed implies a thirty-three-per-cent increase in the mixing energy the storms deliver to the mixed layer and the internal-wave field.
:::
:::

::: exercise Latent heat {level=1 check="282"}
Find the latent heat flux for $U = 10\ \mathrm{m\,s^{-1}}$, $q_s - q_a = 0.008\ \mathrm{kg\,kg^{-1}}$, $C_E = 1.2\times10^{-3}$, $\rho_a = 1.2\ \mathrm{kg\,m^{-3}}$ and $L_v = 2.45\times10^{6}\ \mathrm{J\,kg^{-1}}$.
::: solution
$LE = 1.2\times2.45\times10^{6}\times1.2\times10^{-3}\times10\times0.008 = 282\ \mathrm{W\,m^{-2}}$. That is a **large** flux — comparable to the **net** shortwave — and it is what a **cold, dry** polar outbreak over a **warm** current delivers, which is the **single** most intense heat-release process in the climate system and the fuel of **winter** storms over the **Gulf Stream** and **Kuroshio**.
:::
:::

::: exercise The net flux {level=2 check="-25"}
Find the net surface heat flux for a net shortwave of $+180\ \mathrm{W\,m^{-2}}$, a net longwave loss of $70\ \mathrm{W\,m^{-2}}$, a latent loss of $120\ \mathrm{W\,m^{-2}}$ and a sensible loss of $15\ \mathrm{W\,m^{-2}}$.
::: solution
$Q = 180 - 70 - 120 - 15 = -25\ \mathrm{W\,m^{-2}}$. The ocean is losing heat at 25 W m⁻² while absorbing 180 — a fourteen-fold amplification of the imbalance by the partition, and the reason a one-per-cent error in the shortwave is twice the whole climate signal.
:::
:::

::: exercise A saltier Mediterranean {level=2 check="8.1"}
If the Mediterranean outflow salinity rose to **39.0** while the inflow stayed at **36.2** and the freshwater loss stayed at $6.3\times10^{4}\ \mathrm{m^{3}\,s^{-1}}$, find the outflow in $10^{5}\ \mathrm{m^{3}\,s^{-1}}$.
::: solution
$Q_{\mathrm{out}} = RS_A/(S_M - S_A) = 6.3\times10^{4}\times36.2/2.8 = 8.1\times10^{5}\ \mathrm{m^{3}\,s^{-1}}$. A 0.4-PSU rise in the outflow salinity reduces the required exchange by 15 per cent — the inverse relation between salinity contrast and exchange is the reason a saltier basin flushes less often, and why the Messinian Mediterranean, once its salinity contrast with the Atlantic was broken, could not re-fill itself until the Zanclean flood.
:::
:::

::: exercise A doubled carbon dioxide difference {level=2 check="3.0"}
Find the air–sea CO₂ flux for a sea-to-air $p\mathrm{CO_2}$ difference of **40 µatm** and a piston velocity of **6 m d⁻¹**, taking the solubility as $3.4\times10^{-2}\ \mathrm{mol\,kg^{-1}\,atm^{-1}}$. Give the answer in $\mathrm{mol\,m^{-2}\,yr^{-1}}$.
::: solution
$\Delta C = 3.4\times10^{-2}\times40\times10^{-6} = 1.36\times10^{-6}\ \mathrm{mol\,kg^{-1}}$ and
$F = 6\times365\times1.36\times10^{-6}\times1025 = 3.0\ \mathrm{mol\,m^{-2}\,yr^{-1}}$. Doubling the driving difference doubles the flux only if $k$ is unchanged — and in the real ocean a warmer surface lowers the solubility, raises the $\Delta p$, stratifies the mixed layer and lowers $k$, so the feedback on the carbon sink is negative and its magnitude is one of the largest uncertainties in every earth-system model.
:::
:::

::: exercise The subtropical salinity {level=3 check="36.1"}
A **50-m** mixed layer in the **subtropical** gyre has a net evaporation of **1.5 m yr⁻¹** and no vertical mixing. Find its salinity after one year if it starts at **35.0**.
::: solution
Salt conservation in a shrinking column gives $S = S_0\,e^{e/h} = 35\times e^{0.03} = 36.1$. The observed subtropical salinity is 36–37 PSU, so a one-year one-dimensional calculation already reaches the climatological value — which is the proof that the real mixed layer must lose the excess salt, and it does so by subduction into the thermocline, by eddy export and by mixing downward. The salt budget of the subtropical gyre is therefore a circulation budget, and the salinity maximum is a dynamical rather than a meteorological feature.
:::
:::

::: exercise The equilibration time {level=3 check="150"}
Find the equilibration time, in days, of a 50-m mixed layer with a piston velocity of 5 m d⁻¹ for a passive gas, and then for CO₂ given a Revelle buffer factor of 15.
::: solution
For a passive gas $\tau = h/k = 50/5 = 10\ \mathrm{d}$; for CO₂ the **buffer** factor multiplies this, because the dissolved inorganic carbon reservoir must be **re-equilibrated** and not just the aqueous CO₂, giving $\tau = 150\ \mathrm{d}$ — about **five months**. That **five months** is why the surface ocean is **never** in equilibrium with the atmosphere, why the **seasonal** cycle of atmospheric CO₂ is **out of phase** with the **biological** cycle, and why the **anthropogenic** signal has penetrated only **a few hundred metres** in **two hundred and fifty years**: the **buffer factor** that makes the ocean such an enormous carbon sink is the same property that makes it take **a thousand years** to fill.
:::
:::
