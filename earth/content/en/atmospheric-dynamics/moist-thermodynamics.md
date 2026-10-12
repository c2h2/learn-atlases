Water vapour makes up less than four per cent of the atmosphere by mass and does more than any other constituent to decide what the weather will be. Its saturation vapour pressure doubles every ten degrees, so a world two degrees warmer holds fourteen per cent more vapour and dumps fourteen per cent more rain per storm. Its condensation releases two and a half megajoules per kilogram, which is why a single large thunderstorm liberates more power than a nuclear power station, and why the engine of every tropical cyclone, every monsoon and every mid-latitude storm track is not the Sun directly but the latent heat the Sun pumped into the sea months earlier.

## Humidity

::: definition Saturation vapour pressure and the humidity variables {#def-humidity}
The saturation vapour pressure over a plane water surface follows the Clausius–Clapeyron relation
$$
\frac{\mathrm{d}\ln e_s}{\mathrm{d}T} = \frac{L_v}{R_v T^{2}}, \qquad L_v = 2.50\times10^{6}\ \mathrm{J\,kg^{-1}}, \quad R_v = 461.5\ \mathrm{J\,kg^{-1}\,K^{-1}},
$$
which at ordinary temperatures gives $6$–$7$ per cent per kelvin — an exponential with no analogue in the rest of meteorology. The operational form is the Magnus fit
$$
e_s(T) = 6.112\,\exp\!\left(\frac{17.67\,T}{T + 243.5}\right)\ \mathrm{hPa}, \qquad T\ \text{in } ^\circ\mathrm{C},
$$
giving $0.51\ \mathrm{hPa}$ at $-30\ \mathrm{^\circ C}$, $6.11$ at $0$, $23.4$ at $20$ and $74.0\ \mathrm{hPa}$ at $40\ \mathrm{^\circ C}$: a factor of one hundred and forty across the temperature range of the liveable Earth.

Four variables describe how much water there is, and confusing them is the most common error in the subject:
$$
e = \text{vapour partial pressure}, \qquad
\mathrm{RH} = 100\,\frac{e}{e_s}, \qquad
r = 0.622\,\frac{e}{p-e}, \qquad
q = \frac{r}{1+r},
$$
together with the **dewpoint** $T_d$, defined by $e = e_s(T_d)$, and the **wet-bulb** **temperature** $T_w$, the temperature reached by evaporating water into the air adiabatically:
$$
e = e_s(T_w) - \gamma\,p\,(T - T_w), \qquad \gamma \approx 6.6\times10^{-4}\ \mathrm{K^{-1}} .
$$
Relative humidity is not a measure of water content: air at $90$ per cent in a polar winter holds $0.5\ \mathrm{g\,kg^{-1}}$ and air at $40$ per cent in a monsoon holds $15$. Potential temperature tells you about air masses; mixing ratio and dewpoint tell you about water; relative humidity tells you about clouds.

Because $e_s$ is an exponential, the dewpoint is a logarithm of the vapour pressure,
$$
T_d = \frac{243.5\,\ln(e/6.112)}{17.67 - \ln(e/6.112)},
$$
and a factor-of-two change in water vapour moves the dewpoint by only $11\ \mathrm{K}$. This is why dewpoint feels like a good measure of humidity and why it is the variable used in every human heat-stress index: sweat evaporates only if the vapour pressure at the skin exceeds that of the air, so what kills in a heat wave is the dewpoint, not the temperature, and a dewpoint of $35\ \mathrm{^\circ C}$ is the theoretical limit of human survival regardless of air temperature.
:::

::: definition Conditional instability, equivalent potential temperature and moist static energy {#def-conditional}
A saturated parcel rising releases latent heat, so its lapse rate $\Gamma_m$ is less than $\Gamma_d$, and because the vapour available depends on temperature, $\Gamma_m$ is $4\ \mathrm{K\,km^{-1}}$ in warm saturated air and $9\ \mathrm{K\,km^{-1}}$ in cold. This produces the central stability category of the real atmosphere:
$$
\Gamma < \Gamma_m < \Gamma_d:\quad \textbf{conditionally unstable}
$$
— stable to unsaturated displacement, unstable to saturated displacement. Nearly the whole moist troposphere is conditionally unstable, which is why it is full of clouds that need a trigger and why the atmosphere is not convectively neutral everywhere: the cap, the front, the wave, the mountain and the outflow boundary are what convert conditional instability into rain.

The conserved variable for moist adiabatic processes is the equivalent potential temperature, the temperature a parcel would have if all its water were condensed out, the latent heat expended lifting it, and it were then brought dry-adiabatically to $1000\ \mathrm{hPa}$:
$$
\theta_e \approx \theta\,\exp\!\left(\frac{L_v\,r}{c_p\,T_L}\right),
$$
where $T_L$ is the lifted condensation temperature. Typical values are $300\ \mathrm{K}$ in polar air, $330$–$340\ \mathrm{K}$ in the trade-wind boundary layer and $350$–$360\ \mathrm{K}$ in a tropical cyclone's inflow. $\theta_e$ is conserved by dry and moist adiabatic processes alike, so it is the right tracer of convection, of the trade-wind boundary layer, and of the hot tower; and its vertical gradient is the criterion for the weakest form of instability, conditional instability of the second kind, which is what organises the Madden–Julian oscillation, the African easterly wave, and the diurnal cycle of tropical rainfall.

The energy variable that makes the whole subject one budget is moist static energy,
$$
h = c_p T + L_v q + g z ,
$$
sensible plus latent plus potential. It is conserved by an air parcel that rises, condenses, and lets the condensate fall out, and it is approximately uniform through the well-mixed trade-wind boundary layer and decreasing above it. Two consequences dominate tropical meteorology. First, because $L_v q \approx 3.5\ \mathrm{MJ\,kg^{-1}}$ at sea and $c_p T \approx 0.3$, the latent term is ten times the sensible one, so the tropical atmosphere is run by evaporation and not by surface heating. Second, because $h$ is approximately conserved while $q$ is not, the moist static energy of the subcloud layer sets the buoyancy of everything above it — which is the content of the wave–conditional-instability mechanism and of every theory of tropical organisation.
:::

::: example Saturation vapour pressure, relative humidity and dewpoint {#ex-es}
Air at $20\ \mathrm{^\circ C}$ has a vapour pressure of $10\ \mathrm{hPa}$. Find the **relative** **humidity**, the **mixing** **ratio** at $1000\ \mathrm{hPa}$, and the **dewpoint**. If the air is heated to $30\ \mathrm{^\circ C}$ at constant pressure and water vapour, what does the relative humidity become?
::: solution
$e_s(20) = 6.112\exp(17.67\times20/263.5) = 23.4\ \mathrm{hPa}$, so
$$
\mathrm{RH} = 100\times\frac{10}{23.4} = 43\%, \qquad
r = 0.622\times\frac{10}{1000-10} = 6.3\ \mathrm{g\,kg^{-1}} .
$$
For the dewpoint, $\ln(10/6.112) = 0.492$, so $T_d = 243.5\times0.492/(17.67 - 0.492) = 7.0\ \mathrm{^\circ C}$.
At $30\ \mathrm{^\circ C}$, $e_s = 42.4\ \mathrm{hPa}$ and $\mathrm{RH} = 100\times10/42.4 = 24\%$.

The air gained no water and its relative humidity fell by nineteen points. This is the whole of indoor winter dryness, of the afternoon fire danger, and of the diurnal cycle of cloud cover: relative humidity is a ratio, and the denominator is an exponential of temperature. A room heated from $0$ to $20\ \mathrm{^\circ C}$ with no added moisture drops from eighty to five per cent relative humidity, which is why the same outside air feels arctic-dry in a heated building and why the influenza season is a humidity season.

The dewpoint of $7\ \mathrm{^\circ C}$ is the number that matters to the atmosphere: it is the temperature to which the air must be cooled, at constant pressure and vapour, to saturate, and therefore the temperature a rising parcel reaches at the cloud base. Radiation fog forms when the surface can cool the air to $T_d$ in one night, which requires a clear sky, a light wind and a small dewpoint depression — and is why fog is an autumnal, calm, low-lying phenomenon rather than a stormy one.
:::
:::

::: example Equivalent potential temperature {#ex-thetae}
Air at the surface has $\theta = 300\ \mathrm{K}$, $r = 15\ \mathrm{g\,kg^{-1}}$ and a lifted condensation temperature of $T_L = 280\ \mathrm{K}$. Find $\theta_e$. Air above it has $\theta = 305\ \mathrm{K}$ and $r = 5\ \mathrm{g\,kg^{-1}}$ at the same $T_L$. Is the layer stable to deep moist convection?
::: solution
$$
\theta_e = 300\,\exp\!\left(\frac{2.50\times10^{6}\times0.015}{1004.6\times280}\right) = 300\,e^{0.133} = 343\ \mathrm{K}
$$
and for the upper air $\theta_e = 305\,\exp(2.5\times10^{6}\times0.005/281{,}288) = 305\,e^{0.0445} = 319\ \mathrm{K}$.
Since $\theta_e$ decreases with height by $24\ \mathrm{K}$, the layer is unstable to deep moist convection.

The contrast between the two layers is the point. On a dry-$\theta$ basis the layer is stably stratified — $305\ \mathrm{K}$ over $300\ \mathrm{K}$ — and a dry parcel displaced upward returns. On a $\theta_e$ basis it is strongly unstable, because the lower air carries three times the water vapour and would release enough latent heat to leave it twenty-four kelvin warmer than its environment at every level. This is conditional instability in its most useful form, and it is why a sounding that looks stable on a $\theta$ plot can produce a supercell.

The number $343\ \mathrm{K}$ is a typical tropical marine boundary-layer value, and $\theta_e$ is approximately conserved by the trade-wind cumulus that mix the layer from the surface to the inversion. In a tropical cyclone, the surface $\theta_e$ over a $30\ \mathrm{^\circ C}$ sea reaches $360\ \mathrm{K}$, and the storm's maximum possible intensity is set by the difference between that value and the $\theta_e$ the air would have if it were saturated at the outflow temperature near the tropopause. A one-degree warmer sea surface raises the inflow $\theta_e$ by about $6\ \mathrm{K}$, which is the thermodynamic basis of every projection of increasing cyclone intensity.
:::
:::

::: example Precipitable water and moisture recycling {#ex-pw}
A **2-km**-deep layer has an air density of $1.0\ \mathrm{kg\,m^{-3}}$ and a mean mixing ratio of $10\ \mathrm{g\,kg^{-1}}$. Find the **precipitable** **water**. If a region precipitates $2000\ \mathrm{mm\,yr^{-1}}$ and imports a net $800\ \mathrm{mm\,yr^{-1}}$ of moisture, find its **recycling** **ratio**.
::: solution
$$
\mathrm{PW} = \rho_{\mathrm{air}}\,r\,\Delta z = 1.0\times0.010\times2000 = 20\ \mathrm{kg\,m^{-2}} = 20\ \mathrm{mm}.
$$
The recycling ratio is $(2000 - 800)/2000 = 60\%$.

Twenty millimetres is a thin, dry column — the global mean precipitable water is about $25\ \mathrm{mm}$, a tropical rain event occurs over $50$–$60\ \mathrm{mm}$, and an atmospheric river off California carries $40$–$50\ \mathrm{mm}$ in a band a few hundred kilometres wide. The whole atmosphere's water is equivalent to about $25\ \mathrm{mm}$ of rain, and the global precipitation rate is about $1000\ \mathrm{mm\,yr^{-1}}$, so the atmospheric water reservoir turns over every nine days. That nine-day residence time is why weather forecasting is possible at all and why drought is a land-surface and circulation phenomenon rather than a lack of clouds.

The sixty-per-cent recycling ratio is the Amazon's own figure, and it is the reason deforestation is a hydrological as much as a carbon problem: the forest transpires three-quarters of its own rainfall, so removing it does not merely release carbon but reduces downwind precipitation by an amount comparable to the rainfall loss projected from greenhouse warming alone. The same arithmetic applies to the Congo, to the Southeast Asian land surface, and to the US Corn Belt, where about half the summer rain is recycled by evapotranspiration from the field itself.
:::
:::

::: definition Ice, the moisture budget, and what humidity does to the atmosphere {#def-ice}
Over supercooled liquid water the saturation vapour pressure is higher than over ice at the same temperature — by twenty to twenty-five per cent between $-10$ and $-20\ \mathrm{^\circ C}$, with the largest relative difference near $-12\ \mathrm{^\circ C}$. The consequence, found independently by Wegener, Bergeron and Findeisen in 1933–1935, is the Bergeron–Findeisen process: in a mixed-phase cloud the vapour pressure is driven toward the ice value, which is below saturation with respect to water, so droplets evaporate and ice crystals grow at their expense. A crystal in a cloud with ten times more droplets than crystals can therefore grow to precipitation size in minutes, while the droplets alone would take hours. Most rain from mid-latitude clouds begins as ice, and cloud seeding, glaciogenic or otherwise, is an attempt to exploit a thermodynamic inequality discovered before the Second World War.

The column moisture budget is one line of accounting:
$$
P = E + C, \qquad C = -\frac{1}{g}\int \nabla\cdot(\mathbf{v}q)\,dp ,
$$
precipitation equals evaporation plus moisture convergence. Over the ocean $P < E$ and the atmosphere imports moisture; over the land $P > E$ and it imports the remainder; globally $P = E$ and the net import to land, about $40{,}000\ \mathrm{km^{3}\,yr^{-1}}$, is the entire freshwater resource of the planet, renewed nine times a year. Because $q$ scales exponentially with temperature while the circulation $\mathbf{v}$ changes only weakly, the moisture convergence term is a thermodynamic quantity to first order — which is the physical basis of the "wet gets wetter" projection and of the observed intensification of the hydrological cycle.

Three large-scale effects follow from the same chemistry. Water vapour is the dominant greenhouse gas, responsible for roughly half of the natural greenhouse effect and, because its concentration is set by temperature rather than by emissions, the strongest positive feedback in the climate system — approximately doubling the warming from carbon dioxide alone. Latent heat release is the main energy source of the general circulation, supplying the tropical heating that drives the Hadley cell, the jet streams and the stratospheric Brewer–Dobson circulation. And the stratospheric water vapour loading, controlled by the cold trap temperature at the tropical tropopause, is small in amount and large in consequence: a $1\ \mathrm{^\circ C}$ warming of the trap would increase stratospheric water vapour by about ten per cent, cool the stratosphere, and accelerate polar ozone loss through the chemistry of polar stratospheric clouds.
:::

::: example The humidity feedback on warming {#ex-humid}
The global mean surface temperature is $15\ \mathrm{^\circ C}$. Find the percentage increase in surface saturation vapour pressure for $2\ \mathrm{K}$ of warming. If global mean precipitation is $1000\ \mathrm{mm\,yr^{-1}}$ and rose at the same relative rate, what would it become — and why do climate models project only $2$–$3$ per cent per kelvin?
::: solution
$$
\frac{e_s(17\ \mathrm{^\circ C})}{e_s(15\ \mathrm{^\circ C})} = \frac{19.4}{17.0} = 1.14 \quad (+14\%),
$$
which would give $1140\ \mathrm{mm\,yr^{-1}}$ of precipitation, or **$7$ per cent per kelvin**.

Models project two to three per cent per kelvin because precipitation is not set by humidity but by the energy budget of the atmosphere. Precipitation removes latent heat from the column, and that release must be balanced by radiative cooling to space plus a small import from the surface. Radiative cooling is itself only weakly sensitive to surface warming — the atmosphere radiates at an emissivity-weighted temperature set largely by the lapse rate, not by the surface — so the whole hydrological cycle can accelerate only as fast as the atmosphere can get rid of energy. This is the "slow hydrological cycle" result, and it is one of the few model results that follows from thermodynamics alone and is therefore robust across every scenario.

The resolution of the apparent contradiction is where the weather lives. Mean precipitation is energy-limited and rises slowly; the water available to each storm is moisture-limited and rises at seven per cent per kelvin. The atmosphere reconciles the two by precipitating less often and more intensely: dry spell length increases, heavy precipitation events increase in intensity at close to seven per cent per kelvin in the observations, and the flood and drought statistics move in opposite directions under a warming that changes the global mean rainfall barely at all.
:::
:::

::: widget plot
f: 6.112*exp(17.67*x/(x+243.5))
x: -30, 40
y: 0, 80
labels: e_s\ (\mathrm{hPa})
caption: Saturation vapour pressure over water against temperature — the most consequential exponential in geophysics. Read the slope, not the value: at $0\ \mathrm{^\circ C}$ a degree buys $0.4\ \mathrm{hPa}$, at $20\ \mathrm{^\circ C}$ it buys $1.5$, at $35\ \mathrm{^\circ C}$ it buys $5$. Everything about the moist atmosphere follows from that curvature. Tropical air can be ten times wetter than polar air at the same relative humidity, so the tropics export latent heat to the poles and the planet's energy transport is mostly a water transport. A two-kelvin warming buys fourteen per cent more vapour, which is the largest single feedback in the climate system and the reason heavy rainfall events are already measurably more intense. And the curve flattens toward zero in the cold direction, which is why the polar atmosphere holds almost no water, why polar deserts are deserts, why the stratosphere is dry, and why the cold-trap temperature at the tropical tropopause controls how much water reaches the ozone layer.
:::
::: history
Horace-Bénédict de Saussure (Saussure) invented the hair hygrometer and published *Essais sur l'hygrométrie* in 1783, turning humidity from a sensation into a measurement. Émile Clapeyron (Clapeyron) wrote the vapour-pressure relation in 1834 and Rudolf Clausius (Clausius) derived it from the second law in 1850; the exponential that follows was therefore available eighty years before anyone used it to explain rainfall. Alfred Wegener (Wegener) noted in 1911 that ice crystals grow at the expense of supercooled droplets because the saturation vapour pressure over ice is lower; Tor Bergeron (Bergeron) generalised this in 1933 and Walter Findeisen (Findeisen) in 1938 into the cold-point process that explains why most mid-latitude rain begins as ice — a prediction made from one line of thermodynamics and confirmed fifteen years later by the first aircraft penetrations of glaciated clouds. Tor Bergeron and the Bergen school built the air-mass and front analysis around potential temperature and humidity in the 1910s and 1920s, and Napier Shaw's tephigram of 1930 put both adiabats and moist adiabats on one sheet of paper, which remained the operational tool of forecasting until the 1990s. Herbert Riehl (Riehl) and Joanne Simpson (Simpson) established between 1954 and 1958 that the tropical atmosphere is heated by a few deep "hot towers" rather than by widespread shallow cloud, that the trade-wind boundary layer is approximately moist-static-energy mixed, and that sea surface temperature sets tropical convective intensity — the thermodynamic core of every modern hurricane intensity model. The global moisture budget was closed repeatedly through the twentieth century and is now maintained from satellites and reanalysis by Kevin Trenberth (Trenberth) and colleagues, who showed that the ocean evaporates about $410{,}000\ \mathrm{km^{3}}$ of water a year, imports none, and exports to the land the whole of the world's freshwater. The prediction that heavy precipitation should scale with the Clausius–Clapeyron seven per cent per kelvin while mean precipitation scales at two to three per cent is now one of the few quantitative climate predictions that the observational record has confirmed directly, and it rests on nothing but the curve above.
:::

::: warning Parcel theory is worst exactly where moisture matters most
Six failures, all active research. The parcel ignores its own pressure field. A buoyant plume accelerates the air around it, which reduces its acceleration by an added-mass factor of roughly one third, and the lateral pressure perturbation in a narrow updraft can cancel most of the parcel buoyancy entirely. Entrainment is not small. Cumulus parameterisations that mix environmental air into the cloud at observed rates produce clouds so dilute that they never precipitate, which is why every operational scheme uses an artificially small entrainment rate tuned to the observed climate rather than to the observed physics. Condensate loading is routinely ignored. Carrying $10\ \mathrm{g\,kg^{-1}}$ of cloud water costs as much buoyancy as a degree of cooling, and the liquid- versus ice-water assumption changes CAPE by a factor of two in cold clouds. $\theta_e$ is conserved only if the condensate falls out and nothing is exchanged with the environment — two assumptions that fail together, so $\theta_e$ is a useful tracer and not an exact invariant. Relative humidity in the free troposphere is not what the thermodynamics says it should be: sounding profiles show a nearly constant forty per cent rather than the saturation that large-scale ascent would imply, because small-scale turbulence and cloud edges evaporate the water away, and no general circulation model reproduces the observed distribution without a sub-grid cloud scheme. And the ice physics is where the uncertainty lives. The fraction of cloud water that freezes, the ratio of riming to aggregation, the breakup efficiency of colliding crystals and the resulting snow and graupel size distributions are all parameterised, and they control the precipitation efficiency, the anvil cirrus amount, the cloud albedo, and therefore the climate sensitivity itself. The single largest source of spread among climate models is cloud feedback, and the single largest source of spread in cloud feedback is ice.
:::

## Where this leads

Dry thermodynamics, potential temperature and static stability are in [[atmospheric-dynamics/thermodynamics]], the radiation that water vapour controls is [[atmospheric-dynamics/radiative-transfer]] and [[climate-system/greenhouse-effect]], the cloud microphysics of the Bergeron process is [[atmospheric-dynamics/cloud-physics]], the convective triggering and organisation are [[meteorology/stability]] and [[meteorology/clouds-precipitation]], the moist entropy and the hot tower are the engine of [[atmospheric-dynamics/general-circulation]] and [[meteorology/fronts-cyclones]], the tropical cyclone energy source is [[natural-hazards/storms]], the water cycle and its intensification are [[climate-system/hydrological-cycle]] and [[earth-system/water-cycle]], the observed humidity and precipitation trends are [[climate-change/observed-change]] and [[climate-change/extremes]], the evapotranspiration and the land surface are [[hydrology/precipitation-evaporation]] and [[geomorphology/soils]], and the water-vapour isotopes that trace it all are [[geochemistry/isotopes-water-carbon]] and [[palaeoclimate/proxies]].

::: quiz
Air at $25\ \mathrm{^\circ C}$ has a relative humidity of 50 per cent. It is cooled to $15\ \mathrm{^\circ C}$ at constant pressure. What happens to the relative humidity?
- [ ] It stays at 50 per cent, because no water is removed.
- [x] It rises to about 99 per cent, because the saturation vapour pressure falls exponentially.
- [ ] It falls, because cold air holds less.
- [ ] It rises to exactly 100 per cent and condensation begins immediately.
::: solution
$\mathrm{RH} = 0.50\times e_s(25)/e_s(15) = 0.50\times31.7/17.0 = 0.93$ — about ninety-three per cent. The vapour pressure is unchanged; the denominator fell by forty-six per cent. That is radiation fog, dew, and the reason the coldest part of a day is the wettest.
:::
:::

::: summary
- Saturation vapour pressure rises six to seven per cent per kelvin; that exponential is the origin of the hydrological cycle's sensitivity.
- Relative humidity is a ratio, not a water content. Use mixing ratio and dewpoint for water, potential temperature for air masses, relative humidity for clouds.
- A saturated parcel cools at 4–9 K km⁻¹ depending on temperature, which makes nearly the whole troposphere conditionally unstable.
- Equivalent potential temperature is conserved by dry and moist adiabatics and is the right stability criterion for deep convection.
- Moist static energy — sensible plus latent plus potential — is the single budget that links surface evaporation to upper-tropospheric heating.
- Ice has a lower saturation vapour pressure than water, and that inequality grows most of the rain in mid-latitude clouds.
- Precipitation is energy-limited and rises two to three per cent per kelvin; the water available to each storm is moisture-limited and rises seven.
:::

## Exercises

::: exercise Saturation vapour pressure {level=1 check="42.5"}
Find $e_s$ at $30\ \mathrm{^\circ C}$.
::: solution
$e_s = 6.112\exp(17.67\times30/273.5) = 42.5\ \mathrm{hPa}$. Forty-two millibars of the total pressure could in principle be water — four per cent of the atmosphere by mass, against $0.4\ \mathrm{hPa}$ at $-20\ \mathrm{^\circ C}$. That factor of one hundred is the reason the tropics can run a hurricane and the poles cannot.
:::
:::

::: exercise Relative humidity {level=1 check="47"}
Find the relative humidity when $e = 15\ \mathrm{hPa}$ and $T = 25\ \mathrm{^\circ C}$.
::: solution
$\mathrm{RH} = 100\times15/31.7 = 47\%$. The same fifteen millibars at $5\ \mathrm{^\circ C}$ would be one hundred and forty per cent — supersaturated, foggy, and raining. Relative humidity without temperature is not a measure of anything.
:::
:::

::: exercise Mixing ratio {level=1 check="14.1"}
Find the mixing ratio at $p = 900\ \mathrm{hPa}$ and $e = 20\ \mathrm{hPa}$.
::: solution
$r = 0.622\times20/(900-20) = 14.1\ \mathrm{g\,kg^{-1}}$. The factor $0.622 = M_w/M_d$ is why moist air is light: a kilogram of water vapour displaces only $0.622\ \mathrm{kg}$ of dry air, so the parcel becomes lighter as it takes up moisture at constant pressure and temperature. That is the first term of the virtual temperature, and the reason a moist boundary layer is buoyant before it is warm.
:::
:::

::: exercise Dewpoint {level=2 check="17.5"}
Find the dewpoint for $e = 20\ \mathrm{hPa}$.
::: solution
$\ln(20/6.112) = 1.185$, so $T_d = 243.5\times1.185/(17.67 - 1.185) = 17.5\ \mathrm{^\circ C}$. A dewpoint of $17.5\ \mathrm{^\circ C}$ is the threshold of tropical mugginess and of significant nocturnal thunderstorm risk; above $22\ \mathrm{^\circ C}$ the atmosphere holds enough fuel for extreme rainfall, and above $26\ \mathrm{^\circ C}$ the combination with high temperature approaches the limit of human thermoregulation.
:::
:::

::: exercise Equivalent potential temperature {level=2 check="372"}
Find $\theta_e$ for $\theta = 310\ \mathrm{K}$, $r = 20\ \mathrm{g\,kg^{-1}}$, $T_L = 275\ \mathrm{K}$.
::: solution
$\theta_e = 310\exp(2.5\times10^{6}\times0.020/(1004.6\times275)) = 310\,e^{0.181} = 372\ \mathrm{K}$. This is an extraordinarily high value — the kind measured in the inflow of a major tropical cyclone over a $30\ \mathrm{^\circ C}$ sea. The maximum potential intensity theory compares this with the $\theta_e$ the air would have if saturated at the outflow temperature, and the difference, of order $20\ \mathrm{K}$, is the Carnot efficiency times the heat engine's temperature ratio.
:::
:::

::: exercise Precipitable water {level=2 check="26.4"}
Find the precipitable water in a **3-km** layer with $\rho = 1.1\ \mathrm{kg\,m^{-3}}$ and $r = 8\ \mathrm{g\,kg^{-1}}$.
::: solution
$\mathrm{PW} = 1.1\times0.008\times3000 = 26.4\ \mathrm{mm}$. A near-average column. Since the global mean precipitation is about $1000\ \mathrm{mm\,yr^{-1}}$, the atmospheric water turns over about thirty-eight times a year — a nine-day residence time, and the reason a three-day forecast is a quarter of a residence time and a two-week outlook is not a forecast of rain at all.
:::
:::

::: exercise Moisture recycling {level=3 check="38"}
A basin precipitates $800\ \mathrm{mm\,yr^{-1}}$ and imports a net $500\ \mathrm{mm\,yr^{-1}}$. Find the recycling ratio, and say what happens to downwind rainfall if its forest is cleared.
::: solution
$(800-500)/800 = 38\%$. Clearing the forest removes the evapotranspiration that supplies those $300\ \mathrm{mm}$, so local rainfall falls and the moisture that would have been recycled downwind is not there either. Observations and models of Amazonian deforestation give a ten-to-twenty-per-cent regional rainfall reduction, and the dry-season lengthening extends hundreds of kilometres beyond the cleared area — a hydrological consequence of land use that is independent of its carbon consequence and similar in size.
:::
:::

::: exercise The humidity feedback {level=3 check="22"}
Find the percentage increase in surface saturation vapour pressure for a warming from $12$ to $15\ \mathrm{^\circ C}$, and explain why global mean precipitation rises by only about a third as much.
::: solution
$e_s(15)/e_s(12) = 17.04/13.99 = 1.22$, a twenty-two-per-cent increase. Precipitation rises only seven per cent per three kelvin because it is set by how fast the atmosphere can radiate away the latent heat it releases, not by how much water is available. The atmosphere resolves the conflict by precipitating less often and harder — longer dry spells, more intense rain, and a global mean that barely moves. This is the single most important thing to understand about climate change and water.
:::
:::
