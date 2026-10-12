An air parcel rising two kilometres cools by twenty degrees without losing a joule, and that single fact — not radiation, not friction, not the Sun — decides whether a summer afternoon makes a thunderstorm or a blue sky, whether an airplane cruises at eleven kilometres or two, and whether the troposphere is six or sixty kilometres thick. Atmospheric dynamics begins with four lines of algebra about a gas that is mostly nitrogen, and ends with the weather.

## The state and the column

::: definition The equation of state, virtual temperature and hydrostatic balance {#def-state}
Dry air is an ideal gas to better than one part in $10^{4}$ over the whole range the atmosphere occupies:
$$
p = \rho R_d T, \qquad R_d = 287.05\ \mathrm{J\,kg^{-1}\,K^{-1}}, \qquad R_d = R^{*}/M_d,\ \ M_d = 0.02897\ \mathrm{kg\,mol^{-1}} .
$$
Moist air is lighter than dry air at the same pressure and temperature, because water vapour ($M = 18$) displaces nitrogen and oxygen ($M = 29$). The virtual temperature absorbs this,
$$
T_v = T\,(1 + 0.61\,r) \approx T\,(1 + 0.61\,q),
$$
where $r$ is the mixing ratio in $\mathrm{kg\,kg^{-1}}$. At $20\ \mathrm{^\circ C}$ with $r = 10\ \mathrm{g\,kg^{-1}}$ the virtual temperature exceeds the actual by $1.8\ \mathrm{K}$ — less than two per cent, and the entire buoyancy of a tropical cumulus cloud comes from that two per cent.

The column is in hydrostatic balance to one part in $10^{5}$ — the single most important approximation in meteorology:
$$
\frac{\partial p}{\partial z} = -\rho g \quad\Longrightarrow\quad p(z) = p_0\,e^{-z/H}, \qquad H = \frac{R_d T}{g} \approx 8.4\ \mathrm{km},
$$
so pressure falls by a factor of $e$ every $8.4\ \mathrm{km}$, is half at $5.5\ \mathrm{km}$, a quarter at $11\ \mathrm{km}$, and $3$ per cent at $30\ \mathrm{km}$. The atmosphere is exponentially thin: half its mass is below $5.5\ \mathrm{km}$, and the flying layer of every weather system on Earth is thinner relative to the planet's radius than the varnish on a globe.

Combining hydrostatics with the equation of state gives the hypsometric equation,
$$
\Delta z = \frac{R_d \overline{T_v}}{g}\ln\frac{p_1}{p_2},
$$
which says that the thickness of a layer is proportional to its mean temperature. This is why isobaric surfaces bulge over warm air, why the jet stream sits at the polar front, and why a 500-hPa chart is in fact a map of the mean temperature of the layer below it. Every upper-air forecast chart in operational use is the hypsometric equation read backwards.
:::

::: definition Adiabats, potential temperature and static stability {#def-adiabat}
The first law for a parcel $c_p\,dT = \alpha\,dp + dq_{\mathrm{heat}}$, with $\alpha = 1/\rho$, becomes for an adiabatic process ($dq_{\mathrm{heat}} = 0$)
$$
\frac{1}{T}\frac{dT}{dz} = -\frac{g}{c_p} = -\Gamma_d = -9.8\ \mathrm{K\,km^{-1}},
$$
the dry adiabatic lapse rate — the cooling rate of a rising parcel, set by the Earth's gravity and the heat capacity of nitrogen and nothing else. Integrating gives Poisson's relation and the conserved variable of the dry atmosphere:
$$
\theta = T\left(\frac{p_0}{p}\right)^{\kappa}, \qquad \kappa = R_d/c_p = 2/7, \qquad p_0 = 1000\ \mathrm{hPa},
$$
the potential temperature: the temperature a parcel would have if brought dry-adiabatically to $1000\ \mathrm{hPa}$. $\theta$ is conserved for adiabatic motion, is proportional to entropy, and is the right vertical coordinate for most of the atmosphere — a map of $\theta$ is a map of air masses, and a map of $T$ is a map of height.

Static stability follows by comparing the environmental lapse rate $\Gamma$ with $\Gamma_d$, or equivalently by the Brunt–Väisälä frequency
$$
N^{2} = \frac{g}{\theta_v}\frac{\partial \theta_v}{\partial z}, \qquad T_{\mathrm{parcel}} - T_{\mathrm{env}} = \frac{\theta_v'}{\theta_v}T \approx \frac{N^{2}}{g}\,T\,\zeta ,
$$
$$
\Gamma < \Gamma_d\ (N^2 > 0):\ \textbf{stable, oscillation with period } 2\pi/N \approx 5\text{ min}; \qquad
\Gamma > \Gamma_d\ (N^2 < 0):\ \textbf{unstable, convection}.
$$
Typical values: $N \approx 10^{-2}\ \mathrm{s^{-1}}$ in the stable lower stratosphere and $0.5$–$1\times10^{-2}\ \mathrm{s^{-1}}$ in the troposphere, giving buoyancy periods of five to ten minutes. That is the clock of the atmosphere: it sets the vertical group velocity of mountain waves, the maximum height of a convective cloud, the depth of the boundary layer, and the reason clear-air turbulence comes in layers a few hundred metres thick.
:::

::: example Pressure and the scale height {#ex-scaleheight}
Take a uniform $T = 288\ \mathrm{K}$ atmosphere with $p_0 = 1013\ \mathrm{hPa}$. Find the scale height and the pressure at $5500\ \mathrm{m}$, and the height of the $500$-hPa surface.
::: solution
$$
H = \frac{R_d T}{g} = \frac{287\times288}{9.81} = 8430\ \mathrm{m}, \qquad
p(5500) = 1013\,e^{-5500/8430} = 528\ \mathrm{hPa}.
$$
Inverting, $z = -H\ln(p/p_0) = -8430\ln(500/1013) = 5600\ \mathrm{m}$.

The isothermal atmosphere is a crude model and still gets the $500$-hPa surface to within $100\ \mathrm{m}$ of the standard atmosphere's $5570\ \mathrm{m}$, because the layer mean temperature of the real troposphere is close to $288\ \mathrm{K}$. That agreement is not luck: the tropical and mid-latitude troposphere is convectively and dynamically restrained to a lapse rate near $6.5\ \mathrm{K\,km^{-1}}$, which makes the column mean a near-constant fraction of the surface temperature.

The practical consequence is the hypsometric one. A $10$-K warming of the whole troposphere raises every pressure surface by
$$
\Delta z = \frac{R_d\,\Delta \overline{T}}{g}\ln\frac{p_1}{p_2} = \frac{287\times10}{9.81}\times0.693 = 203\ \mathrm{m},
$$
which is why the $500$-hPa surface rises in a heat wave, why the jet stream moves poleward and upward as the climate warms, and why aircraft cruise altitudes and wind-turbine blade clearances must be specified against pressure and not against metres.
:::
:::

::: example Potential temperature and lifting {#ex-theta}
Air at the surface has $T = 288\ \mathrm{K}$ and $p = 1000\ \mathrm{hPa}$. Find its potential temperature, and its temperature after being lifted dry-adiabatically to $700\ \mathrm{hPa}$.
::: solution
$\theta = 288\times(1000/1000)^{2/7} = 288\ \mathrm{K}$, and
$$
T = \theta\left(\frac{p}{p_0}\right)^{\kappa} = 288\times(0.700)^{2/7} = 288\times0.9146 = 263\ \mathrm{K} = -10\ \mathrm{^\circ C}.
$$
A $300$-hPa ascent — three kilometres — cools the parcel by $25\ \mathrm{K}$, and the cooling is not caused by anything touching it. The parcel does work pushing its neighbours aside, and because the ascent takes minutes while the radiative relaxation time of an air parcel is a week, there is no time for heat to flow. Adiabatic is not an assumption; it is a ratio of timescales, and it fails only in the radiatively active centimetre of air above a hot surface.

The conservation of $\theta$ is what makes the variable indispensable. Two parcels at different heights with the same $\theta$ are in the same air mass and will not resist being exchanged; two parcels with the same $T$ at different heights are in different air masses and will. Every skew-T logarithmic pressure diagram, every air-mass analysis, every potential-vorticity inversion and every chemical transport model in the stratosphere is built on $\theta$ rather than $T$ for this reason.
:::
:::

::: example Static stability and the Brunt–Väisälä frequency {#ex-bv}
The potential temperature increases by $3\ \mathrm{K\,km^{-1}}$ through a layer where $\theta_v = 300\ \mathrm{K}$. Find $N$, the buoyancy period, and the maximum vertical acceleration of a parcel displaced $200\ \mathrm{m}$ upward.
::: solution
$$
N^{2} = \frac{g}{\theta_v}\frac{\partial\theta_v}{\partial z} = \frac{9.81}{300}\times3\times10^{-3} = 9.8\times10^{-5}\ \mathrm{s^{-2}}, \qquad
N = 9.9\times10^{-3}\ \mathrm{s^{-1}},
$$
$$
\frac{2\pi}{N} = 635\ \mathrm{s} = 10.6\ \mathrm{min}.
$$
The maximum acceleration, at the point of release, is
$$
a = N^{2}\zeta = 9.8\times10^{-5}\times200 = 0.020\ \mathrm{m\,s^{-2}} = 0.002\,g .
$$
Two thousandths of gravity. A displaced parcel accelerates at two hundredths of a per cent of $g$, takes five minutes to reach its first maximum displacement, and would oscillate forever if the layer were not turbulent. This is why stable air is not still air: it is air in which vertical motion is a feeble oscillation rather than a flow, and why the nocturnal boundary layer, the polar cold pool and the cloud-top turbulence below a cirrus deck all come in layers whose thickness is set by $N$ and the shear.

The same number explains the stratosphere. At the tropopause $\theta$ jumps by $20\ \mathrm{K}$ across $1\ \mathrm{km}$, giving $N \approx 2.5\times10^{-2}\ \mathrm{s^{-1}}$ and a buoyancy period of four minutes — two and a half times the tropospheric value. Convection cannot penetrate it, which is why thunderstorms spread into anvils, why volcanic aerosol and water vapour are trapped for years once they cross it, and why ozone-depleting substances mixed into the stratosphere stay there long enough to do their damage.
:::
:::

::: definition Moist instability, condensation and convective available potential energy {#def-cape}
Once a parcel is saturated, condensation releases latent heat and the lapse rate falls to the saturated adiabatic value $\Gamma_m$, which is $4\ \mathrm{K\,km^{-1}}$ in warm tropical air and $9\ \mathrm{K\,km^{-1}}$ in cold polar air — because the moist adiabat depends on how much vapour there is to condense, and that depends exponentially on temperature through Clausius–Clapeyron. This is the origin of every asymmetry in the moist atmosphere: the tropics are convectively restrained to $\Gamma \approx \Gamma_m \approx 4\ \mathrm{K\,km^{-1}}$ while the poles approach $\Gamma_d$; the equatorial tropopause is at $17\ \mathrm{km}$ and the polar one at $9\ \mathrm{km}$; and a $1\ \mathrm{K}$ surface warming increases the moist static energy of the boundary layer by seven per cent.

Three levels describe a sounding. The lifted condensation level, where a surface parcel first saturates, follows from the fact that temperature falls at $9.8\ \mathrm{K\,km^{-1}}$ while the dewpoint falls at $\sim 1.8\ \mathrm{K\,km^{-1}}$:
$$
z_{\mathrm{LCL}} \approx 125\,(T - T_d)\ \mathrm{m},
$$
one hundred and twenty-five metres per degree of dewpoint depression — the reason cumulus bases are all at the same height across a whole continent on a summer afternoon, and the reason a single surface humidity measurement predicts cloud base to a hundred metres. The level of free convection is where the rising parcel becomes buoyant; the equilibrium level is where it becomes negatively buoyant again. Between them lies the convective available potential energy,
$$
\mathrm{CAPE} = g\int_{z_{\mathrm{LFC}}}^{z_{\mathrm{EL}}}\frac{T_{v,\mathrm{parcel}} - T_{v,\mathrm{env}}}{T_{v,\mathrm{env}}}\,\mathrm{d}z ,
$$
the area on the skew-T between the parcel's moist adiabat and the sounding, in joules per kilogram. Typical values: $500\ \mathrm{J\,kg^{-1}}$ gives discrete thunderstorms, $2000$ gives severe ones, $5000$ is extreme, and the world record updraft of $\sim 100\ \mathrm{m\,s^{-1}}$ observed by research aircraft in the 2016 Bauru, Brazil storm implies a CAPE near $5000\ \mathrm{J\,kg^{-1}}$. The maximum updraft is $w \approx \sqrt{2\,\mathrm{CAPE}}$ in the absence of entrainment and of the drag and liquid loading that make observed updrafts roughly half that.

Convective inhibition CIN — the negative area below the LFC, usually $10$–$100\ \mathrm{J\,kg^{-1}}$ — is a capping inversion in energy units, and the tension between large CAPE and large CIN is the reason severe weather is explosive rather than continuous. A cap that fails over a region that has been charging all day releases an entire afternoon's buoyancy in an hour, which is the thermodynamic basis of every tornado outbreak and every derecho.
:::

::: example A convective sounding {#ex-cape}
A parcel is buoyant over a **$5$-km** layer with a mean virtual-temperature excess of **$3\ \mathrm{K}$**, in an environment of mean $T_v = 285\ \mathrm{K}$. Find the CAPE and the maximum updraft. A neighbouring sounding has the same CAPE but a **$150\ \mathrm{J\,kg^{-1}}$** cap; describe what changes.
::: solution
$$
\mathrm{CAPE} = g\,\frac{\overline{\Delta T_v}}{\overline{T_v}}\,\Delta z = 9.81\times\frac{3}{285}\times5000 = 516\ \mathrm{J\,kg^{-1}}, \qquad
w = \sqrt{2\times516} = 32\ \mathrm{m\,s^{-1}} .
$$
Observed updrafts reach one half to two thirds of this because of entrainment, liquid water loading and pressure perturbation drag — so $15$–$20\ \mathrm{m\,s^{-1}}$, which is a strong storm and enough to keep a ten-centimetre hailstone aloft.

The cap changes nothing about the storm's intensity and everything about whether it occurs, when, and where. A $150\ \mathrm{J\,kg^{-1}}$ cap requires the surface parcel to be $150\ \mathrm{J\,kg^{-1}}$ warmer than ambient before it can rise, which takes an hour of surface heating or a mesoscale boundary to lift the layer mechanically. This is why severe storms initiate along drylines, gust fronts and sea-breeze convergences rather than in the warmest air mass, and why forecast skill for the timing of initiation is far worse than for the severity once initiation occurs — CAPE is predictable a day ahead, CIN failure is not.

The same arithmetic explains the diurnal cycle of rainfall over land: CAPE peaks in late afternoon when the surface has charged the boundary layer, and the nocturnal boundary layer collapse restores the cap. Over the ocean the cap is weaker and the peak shifts to the early morning, when cloud-top cooling destabilises the layer from above. Satellites see both peaks, and the phase reversal between land and ocean is one of the cleanest natural experiments in the subject.
:::
:::

::: widget plot
f: 1013*exp(-x/8.4)
x: 0, 30
y: 0, 1050
labels: p\ (\mathrm{hPa})
caption: Pressure against height in an isothermal atmosphere — the exponential that every meteorologist carries in their head. Half the mass of the atmosphere is below $5.5\ \mathrm{km}$, three-quarters below $11\ \mathrm{km}$, and ninety-seven per cent below $30\ \mathrm{km}$. The consequences are everywhere: a weather map at $850\ \mathrm{hPa}$ is looking at the lowest fifteen per cent of the column; the entire weather layer is thinner than the distance between London and Manchester; the stratosphere, containing only fifteen per cent of the mass, contains ninety per cent of the ozone; and the pressure broadening of spectral lines falls so fast with height that satellite sounding channels can be tuned to read the temperature at successive levels from the same oxygen band. Read the curve backwards to get the hypsometric equation: a layer that warms expands, its upper boundary rises faster than its lower one, and the resulting tilt of the isobaric surfaces is the thermal wind, the jet stream, and the steering flow of every surface low.
:::
::: history
Robert Boyle (Boyle) in 1662 and Edme Mariotte (Mariotte) in 1676 established the pressure–volume law; Jacques Charles (Charles) found the volume–temperature law in 1787, and Joseph Gay-Lussac (Gay-Lussac) published it in 1802 and then flew a balloon to $7\ \mathrm{km}$ in 1804 to measure the lapse rate that the theory predicted at $6.5\ \mathrm{K\,km^{-1}}$. Horace-Bénédict de Saussure (Saussure) had already carried thermometers up the Alps in the 1770s and established that temperature falls with height on a reproducible schedule, and his hair hygrometer made humidity a number. Émile Clapeyron (Clapeyron) wrote down the vapour-pressure relation in 1834 and Rudolf Clausius (Clausius) derived it from thermodynamics in 1850; that one equation, exponential in temperature, is the reason the tropics convect, the mid-latitudes have fronts, and a warmer world is a wetter one. Alfred Wegener (Wegener) — better known for continental drift — wrote *Thermodynamik der Atmosphäre* in 1911, invented the kite-borne sounding platform, and put the adiabat on a graph; Napier Shaw's tephigram of 1930 and the skew-T log-$p$ diagram that became standard in the 1950s are his descendants. Vilho Väisälä (Väisälä) derived the buoyancy frequency that carries his name in 1925, published it alongside the stability work of David Brunt's *Physical and Dynamical Meteorology* of 1934, and then invented the radiosonde in 1936 — so the instrument and the number that make stability measurable come from the same Finnish hand. The global radiosonde network, built between the 1940s and the 1960s and now launched from eight hundred sites twice a day, is the single most consequential observation in the history of meteorology, and its gradual loss of coverage since 1997 is one of the quietest degradations in environmental science. Modern convective thermodynamics — the separation of CAPE from convective inhibition, the parcel theory's correction for entrainment and the pressure field, and the use of equivalent potential temperature as a conservative variable for moist air — was worked out between the 1960s and the 1990s, and is now the daily working arithmetic of every severe weather forecast office on Earth.
:::

::: warning The parcel theory is wrong in six specific ways, and each one is a research literature
Air is not made of parcels. CAPE, the lifted index, the K index and every stability number on a skew-T assume that a kilometre-scale eddy can be treated as a thermodynamically isolated blob that never talks to its neighbours. Real updrafts entrain environmental air at $10^{-2}\ \mathrm{s^{-1}}$, so a cloud that rises $10\ \mathrm{km}$ at $10\ \mathrm{m\,s^{-1}}$ over a thousand seconds has mixed in its own volume ten times over, and its buoyancy is half the parcel value. Entrainment is not a correction; it is the reason observed updrafts are systematically weaker than parcel theory predicts. Condensate is not instantly removed. The standard liquid-water and ice-water assumptions span a factor of two in CAPE, because carrying ten grams of cloud water up a kilometre costs as much buoyancy as a degree of cooling. Pressure is not uniform around a thermal. A buoyant plume accelerates its own environment, which reduces its acceleration by an added-mass term of order a third. The environment is not the sounding. A radiosonde is a one-centimetre sample of a kilometre of air, taken once a day from one place, and the sub-cloud layer it samples is the part that decides whether anything rises. Moist air is not an ideal gas plus a latent heat. At the precision of modern radiosondes and satellite sounders the vapour non-ideality, the heat capacity of liquid water, the supercooled fraction and the freezing depression all matter, which is why the community has revised the reference formulations three times since 1980. And the lapse rate is not set by radiation or by convection alone. The observed tropical $6.5\ \mathrm{K\,km^{-1}}$ is a balance between convective restraint, radiative cooling, large-scale ascent, and the entrainment of dry air into every cloud, and the question of which term wins has been open for sixty years — it is the reason climate models disagree about how much the upper troposphere will warm, which is the single largest source of spread in climate sensitivity.
:::

## Where this leads

Moist thermodynamics, conditional instability and the psychrometric relations are [[atmospheric-dynamics/moist-thermodynamics]], the radiative heating that drives the lapse rate is [[atmospheric-dynamics/radiative-transfer]], the clouds that release the latent heat are [[atmospheric-dynamics/cloud-physics]], the equations that this chapter's hydrostatics approximates are [[atmospheric-dynamics/equations-of-motion]], the boundary layer that supplies the CAPE is [[atmospheric-dynamics/boundary-layer]], the general circulation that maintains the observed lapse rate is [[atmospheric-dynamics/general-circulation]], the energy budget is [[climate-system/energy-budget]] and [[climate-system/greenhouse-effect]], the moist static energy and the hydrological cycle are [[climate-system/hydrological-cycle]], the convective parameterisation problem is [[climate-modelling/parameterisation]], the storms that release the CAPE are [[meteorology/stability]], [[meteorology/storms]] and [[natural-hazards/storms]], and the observed change in stability and humidity is [[climate-change/observed-change]].

::: quiz
Why does a rising unsaturated air parcel cool at $9.8\ \mathrm{K\,km^{-1}}$?
- [ ] Because it radiates heat to space.
- [x] Because it expands against the lower pressure above and does work, and there is no time for heat to flow in.
- [ ] Because the surrounding air is colder.
- [ ] Because turbulence mixes it.
::: solution
The first law with $dq = 0$ gives $c_p\,dT = (1/\rho)\,dp$, so $dT/dz = -g/c_p$. The parcel is not losing heat to anything — radiative relaxation takes a week and the ascent takes minutes. It expends internal energy pushing its neighbours apart.
:::
:::

::: summary
- Dry air obeys $p = \rho R_d T$; water vapour makes air lighter, and the virtual temperature carries the whole buoyancy of a cloud.
- Hydrostatic balance makes pressure fall exponentially with an 8.4-km scale height, so half the atmosphere lies below 5.5 km.
- The hypsometric equation makes layer thickness a thermometer: warm columns bulge, and upper-air charts are temperature maps.
- An ascending parcel cools dry-adiabatically at $9.8\ \mathrm{K\,km^{-1}}$, and potential temperature is conserved.
- Stability is measured by the Brunt–Väisälä frequency, whose typical buoyancy period of five to ten minutes is the vertical clock of the atmosphere.
- Latent heat lowers the lapse rate to as little as $4\ \mathrm{K\,km^{-1}}$ in the tropics, which is why the tropopause is 8 km higher there.
- CAPE is the area between a parcel and the sounding; $w \approx \sqrt{2\,\mathrm{CAPE}}$, and a cap controls whether it is ever released.
:::

## Exercises

::: exercise Virtual temperature {level=1 check="295.7"}
Find the virtual temperature of air at $293\ \mathrm{K}$ with a mixing ratio of $15\ \mathrm{g\,kg^{-1}}$.
::: solution
$T_v = 293(1 + 0.61\times0.015) = 295.7\ \mathrm{K}$ — $2.7\ \mathrm{K}$ of apparent warming from humidity alone. That $2.7\ \mathrm{K}$ is the entire buoyancy of a marine trade-wind cumulus layer, and why a sounding reduced to dry air systematically understates tropical instability.
:::
:::

::: exercise Pressure at height {level=1 check="710"}
Find the pressure at **3000 m** in an isothermal $288\ \mathrm{K}$ atmosphere with $p_0 = 1013\ \mathrm{hPa}$.
::: solution
$p = 1013\,e^{-3000/8430} = 710\ \mathrm{hPa}$. Three kilometres and thirty per cent of the mass — which is why the $700$-hPa chart is a map of the middle of the weather layer and why a mountain observatory at $3\ \mathrm{km}$ sits above most of the planetary boundary layer on a calm night.
:::
:::

::: exercise Potential temperature {level=1 check="286"}
Find the potential temperature of air at $273\ \mathrm{K}$ and $850\ \mathrm{hPa}$.
::: solution
$\theta = 273\times(1000/850)^{2/7} = 286\ \mathrm{K}$. Thirteen kelvin of apparent warming from compression alone — which is why two air masses at the same temperature but different pressures are not in the same air mass, and why $\theta$ rather than $T$ defines an air mass in the first place.
:::
:::

::: exercise The Brunt–Väisälä frequency {level=2 check="8.3"}
Find the buoyancy period where $\theta_v = 310\ \mathrm{K}$ and $\partial\theta_v/\partial z = 5\ \mathrm{K\,km^{-1}}$.
::: solution
$N^{2} = (9.81/310)\times5\times10^{-3} = 1.58\times10^{-4}\ \mathrm{s^{-2}}$, $N = 1.26\times10^{-2}\ \mathrm{s^{-1}}$, $2\pi/N = 500\ \mathrm{s} = 8.3\ \mathrm{min}$. This is a strongly stable layer — a subsididence inversion, a nocturnal stable boundary layer, or the top of a cloud-topped boundary layer — and the same eight-minute clock sets the vertical wavelength of any mountain wave or clear-air turbulence layer that forms in it.
:::
:::

::: exercise Cloud base {level=2 check="1000"}
Surface air is $22\ \mathrm{^\circ C}$ with a dewpoint of $14\ \mathrm{^\circ C}$. Find the lifted condensation level.
::: solution
$z_{\mathrm{LCL}} = 125\times8 = 1000\ \mathrm{m}$. Cumulus bases at one kilometre, all at the same height for a hundred kilometres — the single most familiar confirmation of adiabatic thermodynamics in everyday life, and the reason a single surface dewpoint gives a forecast of cloud base better than most models.
:::
:::

::: exercise Convective available potential energy {level=2 check="271"}
A parcel is buoyant over a **4-km** layer with a mean virtual-temperature excess of $2\ \mathrm{K}$ in an environment of $\overline{T_v} = 290\ \mathrm{K}$. Find CAPE.
::: solution
$\mathrm{CAPE} = 9.81\times(2/290)\times4000 = 271\ \mathrm{J\,kg^{-1}}$, giving $w = \sqrt{2\times271} = 23\ \mathrm{m\,s^{-1}}$ before entrainment. This is an ordinary afternoon thunderstorm — the kind that produces gusts and small hail but rarely tornadoes, which need $1500\ \mathrm{J\,kg^{-1}}$ or more together with strong deep shear.
:::
:::

::: exercise The thickness of a layer {level=3 check="5780"}
Find the thickness of the **1000–500-hPa** layer when its mean virtual temperature is $285\ \mathrm{K}$.
::: solution
$\Delta z = (287/9.81)\times285\times\ln 2 = 5780\ \mathrm{m}$. A cold layer at $\overline{T_v} = 265\ \mathrm{K}$ gives $5375\ \mathrm{m}$ — four hundred metres less over the same pressure interval. That four hundred metres of thickness difference is the pressure gradient that drives the jet stream through the thermal wind, which is the precise sense in which the jet is a temperature contrast rather than a wind.
:::
:::

::: exercise A warming column {level=3 check="203"}
By how much does the **1000–500-hPa** thickness increase if the layer warms uniformly by $10\ \mathrm{K}$?
::: solution
$\Delta(\Delta z) = (R_d/g)\,\Delta\overline{T}\,\ln(p_1/p_2) = 29.3\times10\times0.693 = 203\ \mathrm{m}$. Two hundred metres of lift on the 500-hPa surface for a ten-degree warming of the whole troposphere — and the observed multidecadal rise of the pressure surfaces over the last sixty years is one of the most direct, least model-dependent confirmations that the troposphere is genuinely warmer, measured not by thermometers but by barometers.
:::
:::
