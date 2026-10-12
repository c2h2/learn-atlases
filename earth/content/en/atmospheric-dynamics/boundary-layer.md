Every number in your weather app — the temperature, the wind, the humidity, the pollution forecast — is a number from inside the **atmospheric boundary layer**, the kilometre-thick shell of air that feels the ground directly and turns over every particle of the lower atmosphere a dozen times a day. It is where solar heat enters the atmosphere, where the friction that spins down the great winds does its work, where clouds begin, and where nearly all human exposure to weather and air quality occurs. Its physics is a single struggle: turbulence, born of shear and buoyancy at the surface, tries to mix the layer from below while the Earth's rotation and the stratification try to suppress it, and the day/night cycle of that struggle is the most predictable rhythm in meteorology.

## The turbulence engine

::: definition Reynolds decomposition, turbulent fluxes and the friction velocity {#def-fluxes}
Every quantity in the boundary layer is split into a mean and a fluctuation, $w = \bar w + w'$, with the average taken over the turbulent timescale of minutes. The covariance of two fluctuations, $\overline{w'\phi'}$, is the **turbulent flux** of $\phi$ — the vertical transport by eddies, in units of $\phi$ per square metre per second — and it is the boundary layer's central object, because the mean flow cannot move heat, moisture or momentum vertically fast enough by molecular diffusion alone by a factor of a thousand. The vertical flux of horizontal momentum defines the **friction velocity**
$$
u_* = \sqrt{\frac{|\overline{u'w'}|}{\rho}}, \qquad \tau = \rho\,u_*^{2},
$$
a velocity scale ($0.1$–$0.5\ \mathrm{m\,s^{-1}}$ over land, up to $1\ \mathrm{m\,s^{-1}}$ in storms) that is not a wind but the square root of the stress: the velocity an eddy needs to carry the observed stress. A surface stress of $0.1\ \mathrm{N\,m^{-2}}$ at $\rho = 1.2\ \mathrm{kg\,m^{-3}}$ gives $u_* = 0.29\ \mathrm{m\,s^{-1}}$. Nearly every profile law below is written in terms of $u_*$ and its heat-flux siblings, because the fluxes, not the winds, are what the surface and the atmosphere trade.
:::

## The logarithmic profile

::: proposition The log law from mixing-length closure {#prop-loglaw}
Assume (i) the stress is constant with height through the surface layer — true to a few per cent over the lowest $50\ \mathrm{m}$ — and (ii) **Prandtl's mixing length**: an eddy travels a distance proportional to the distance from the wall before losing its identity, $\ell = \kappa z$, and mixes momentum across that distance, $\overline{u'w'} = -\ell^{2}|\partial U/\partial z|\,\partial U/\partial z$. With $\overline{u'w'} = -u_*^{2}$ these give, for neutral stratification,
$$
\frac{\partial U}{\partial z} = \frac{u_*}{\kappa z} \;\Longrightarrow\; U(z) = \frac{u_*}{\kappa}\,\ln\frac{z}{z_0}, \qquad \kappa = 0.40,
$$
the **logarithmic wind profile**: wind increases by $u_*/\kappa \approx 2.5\,u_*$ per $e$-fold of height, and $z_0$, the **roughness length** — a fraction of a millimetre over sea and ice, $1$–$5\ \mathrm{cm}$ over grass and snow, $10$–$20\ \mathrm{cm}$ over cropland, half a metre over scrub, and metres over forest and cities — is the height at which the extrapolated wind vanishes, an empirical fingerprint of the surface type. The log law is the most verified relation in the atmospheric sciences, holding over land, ice, fresh leads and the sea, and it is why a single anemometer reading can be corrected to any other height, why wind turbines are sited on tall towers, and why the wind "dies" at night over a smooth surface while a forest keeps its drag.
:::

::: example Reading the log law {#ex-loglaw}
Over cropland with $z_0 = 0.05\ \mathrm{m}$ the friction velocity is $u_* = 0.30\ \mathrm{m\,s^{-1}}$. Find the wind at $2\ \mathrm{m}$ (the screen height), $10\ \mathrm{m}$ (the standard mast) and $80\ \mathrm{m}$ (a turbine hub).
::: solution
$$
U(2) = \frac{0.30}{0.40}\ln\frac{2}{0.05} = 3.0\ \mathrm{m\,s^{-1}}, \quad
U(10) = 0.75\,\ln 200 = 4.0\ \mathrm{m\,s^{-1}}, \quad
U(80) = 0.75\,\ln 1600 = 5.5\ \mathrm{m\,s^{-1}} .
$$
The turbine sees 85 per cent more wind than the screen — and since turbine power goes as $U^{3}$, roughly twice the power of a hub-height misreading. The same arithmetic corrects every historical station record: a mast lowered from $25\ \mathrm{m}$ to $10\ \mathrm{m}$ in a network modernisation introduces a spurious wind "stilling" of about $0.8\ \mathrm{m\,s^{-1}}$ unless the log law is used to homogenise the series — a cautionary tale that climate trend analysts live with daily.
:::
:::

::: widget plot
f: 0.75*ln(x/0.05); 0.75*ln(x/0.5)
x: 0.5, 100
y: 0, 10
labels: U\ (\text{m/s}),\ z_0=5\ \text{cm};\ U,\ z_0=0.5\ \text{m}
caption: Neutral wind profiles for the same friction velocity over cropland ($z_0 = 5\ \mathrm{cm}$) and over scrub ($z_0 = 0.5\ \mathrm{m}$): both rise at $2.5\,u_*$ per $e$-fold of height, but the rough surface starts from a deeper "virtual origin", so at every height above the canopy the smooth-site wind is larger for the same stress. This is the **roughness effect** that makes wind farms wake-loss calculations and station-homogenisation corrections surface-specific — drag the surface, not the air.
:::

## Stability: Monin–Obukhov similarity

::: definition The Obukhov length and stability corrections {#def-obukhov}
Heating from below creates buoyant eddies that add to shear mixing; cooling from below destroys turbulence faster than shear makes it. The dimensionless balance is the **Obukhov length**
$$
L = -\frac{u_*^{3}}{\kappa\,\dfrac{g}{\theta_v}\,\overline{w'\theta_v'}}, \qquad \zeta = \frac{z}{L},
$$
the height at which buoyant production of turbulence equals shear production: $L < 0$ in daylight (unstable, heat flux upward), $L > 0$ at night (stable), $|L| \to \infty$ when the heat flux vanishes (neutral). **Monin–Obukhov similarity theory** (1954) — that the fluxes and gradients in the surface layer depend on height only through $\zeta$ — yields corrected profiles,
$$
U(z) = \frac{u_*}{\kappa}\left[\ln\frac{z}{z_0} - \psi_m(\zeta)\right], \qquad
\theta(z) - \theta_0 = \frac{\theta_*}{\kappa}\left[\ln\frac{z}{z_{0h}} - \psi_h(\zeta)\right], \qquad \theta_* = -\frac{\overline{w'\theta'}}{u_*},
$$
with empirical stability functions $\psi_m \approx -5\zeta$ for $\zeta > 0$ (stable: the wind turns over per metre of height much faster than the log law says) and $\psi_m \approx 2\zeta^{1/4}$ for $\zeta < 0$ (unstable: the profile flattens toward the convective mixed layer). The theory fails where its assumptions do — at night under strong stability, over canopies, over complex terrain — and those failures are the daily content of boundary-layer research and of every forecast's worst hours.
:::

::: example How shallow is the stable layer? {#ex-obukhov}
At dusk, $u_* = 0.30\ \mathrm{m\,s^{-1}}$, $\theta = 300\ \mathrm{K}$ and the upward heat flux collapses to $\overline{w'\theta_v'} = -0.02\ \mathrm{K\,m\,s^{-1}}$ (a weak downward flux, surface cooling the air). Find $L$ and the height where $\zeta = 1$; then explain why the nocturnal wind at $10\ \mathrm{m}$ can double while the surface cools by $5\ \mathrm{K}$.
::: solution
$$
L = -\frac{(0.30)^{3}\times 300}{0.4\times9.81\times(-0.02)} = +103\ \mathrm{m}, \qquad z = |L| = 103\ \mathrm{m}.
$$
Above $103\ \mathrm{m}$ the flow is "not stable" by this measure, but below it turbulence is being strangled: the night's heat flux is not merely small, it is **against the flux gradient** — cooling from below makes the profile denser-over-lighter for scalars and drains turbulence of energy at the rate $\overline{w'\theta'}/\theta < 0$ per unit mass. The observed doubling of the $10\ \mathrm{m}$ wind is not the log law working but the **nocturnal low-level jet**: as the night's stable layer decouples the surface from the air above, the Coriolis force, no longer opposed by friction, rotates the wind aloft toward the geostrophic and accelerates a shallow jet $1$–$3\ \mathrm{h}$ after sunset — the inertial oscillation of [[atmospheric-dynamics/equations-of-motion]] running free over a now-insulated surface.
:::
:::

## The surface energy balance

::: definition The partition of net radiation {#def-energy-balance}
The boundary layer is driven by one ledger, the **surface energy balance**,
$$
R_n = G + H + LE ,
$$
net radiation (absorbed solar minus emitted infrared, $50$–$700\ \mathrm{W\,m^{-2}}$ by day), ground heat conduction $G$ ($5$–$10$ per cent on vegetated land, larger on bare soil and water), sensible heat $H = \rho c_p\,\overline{w'\theta'}$ (turbulent warmth), and latent heat $LE = \rho L_v\,\overline{w'q'}$ (evapotranspiration, $L_v = 2.4\ \mathrm{MJ\,kg^{-1}}$). The **Bowen ratio** $\beta = H/LE$ is the partition key: $\beta \approx 0.2$–$0.5$ over oceans and well-watered crops, $\beta \approx 2$–$5$ over dry rangeland and deserts, where almost all the sun's work goes into heating the air instead of evaporating water. The control is biological and agricultural as much as physical: when a heat wave dries the root zone, $\beta$ jumps, the same radiation that once evaporated water now heats the screen temperature, and the land feeds the heat wave back to itself — the land-atmosphere coupling that makes the 2003 European and 2010 Russian events twice as deadly as the sea-surface temperature alone would predict.
:::

::: example Partitioning a summer noon {#ex-bowen}
At a wheat site at noon, $R_n = 520\ \mathrm{W\,m^{-2}}$, $G = 40\ \mathrm{W\,m^{-2}}$ and the crop is well watered with $\beta = 0.35$. Find $H$ and $LE$, and the evapotranspiration rate in $\mathrm{mm\,d^{-1}}$ if the noon values persist for a $14\ \mathrm{h}$ day.
::: solution
$H + LE = 480\ \mathrm{W\,m^{-2}}$ with $H = 0.35\,LE$ gives $LE = 480/1.35 = 356\ \mathrm{W\,m^{-2}}$, $H = 124\ \mathrm{W\,m^{-2}}$. The evaporation rate is
$$
E = \frac{356}{2.45\times10^{6}} = 1.45\times10^{-4}\ \mathrm{kg\,m^{-2}\,s^{-1}} = 0.52\ \mathrm{mm\,h^{-1}},
$$
so if the noon values persisted for a $14\ \mathrm{h}$ day the crop would transpire about $7\ \mathrm{mm}$. Seven millimetres of water per day — more than most rains — is what a healthy wheat field pumps in a heat-wave week, and it is why irrigation cools a landscape by several kelvin and why its failure is the first hidden step of an agricultural disaster. The same arithmetic on a dry soil with $\beta = 4$ gives $LE = 96\ \mathrm{W\,m^{-2}}$ and $H = 384$: the same sun, four times the sensible heat, one quarter the rain.
:::
:::

## The convective boundary layer

::: definition Structure and growth of the daytime CBL {#def-cbl}
Daytime heating makes the lowest kilometre-plus **adiabatic**: potential temperature nearly constant with height, static stability nil, and turbulence so vigorous that the layer behaves as a convection oven with three named parts — a thin **surface layer** (the log-law world, $\sim 5$–$10$ per cent of the depth), a **mixed layer** of well-mixed scalars and thermals, and the **entrainment zone**, $100$–$300\ \mathrm{m}$ of interleaved cloud-topped air that erodes the capping inversion from below. The velocity scale of the whole is the **convective velocity**
$$
w_* = \left(\frac{g}{\theta_v}\,\overline{w'\theta_v'}\,z_i\right)^{1/3} \approx 1.5\text{–}2.5\ \mathrm{m\,s^{-1}},
$$
and the depth grows by entraining the warm free atmosphere at a rate set by the surface flux against the inversion's resistance:
$$
\frac{\mathrm{d}z_i}{\mathrm{d}t} = \frac{1.1\left(1 + 5R_f\right)\overline{w'\theta_v'}_s}{\Delta\theta}, \qquad R_f \approx 0.2 ,
$$
with $\Delta\theta$ the inversion strength. A typical spring day with surface heat flux $0.12\ \mathrm{K\,m\,s^{-1}}$ and a $3\ \mathrm{K}$ cap grows $z_i$ at $9\ \mathrm{cm\,s^{-1}}$ — $2\ \mathrm{km}$ by mid-afternoon, which is why thermals that barely cumulate at 1000 m at 09:00 top out at 2500 m by 15:00, why the pollution forecast's mixing height is a sunrise-to-sunset parabola, and why the inversion that forms aloft overnight is the lid under which tomorrow's haze is born.
:::

::: example The oven fills {#ex-cbl-growth}
At 08:00 the mixed layer is $400\ \mathrm{m}$ deep with a $3\ \mathrm{K}$ capping inversion, and the surface heat flux rises linearly to $0.15\ \mathrm{K\,m\,s^{-1}}$ at 13:00 and back to zero at 18:00. Estimate the depth at 15:00 with $R_f = 0.2$, and the depth of the nocturnal residual layer.
::: solution
The growth rate at peak flux is $\mathrm{d}z_i/\mathrm{d}t = 1.1\times2\times0.15/3 = 0.11\ \mathrm{m\,s^{-1}}$; averaging the triangular flux window 08:00–15:00 gives a mean surface flux of $0.075\ \mathrm{K\,m\,s^{-1}}$, a mean growth rate of $0.055\ \mathrm{m\,s^{-1}}$, and a depth gain of $0.055\times7\times3600 \approx 1.4\ \mathrm{km}$, so $z_i(15{:}00) \approx 1.8\ \mathrm{km}$. After sunset the surface layer decouples and the mixed layer collapses to the **residual layer** — the neutrally-stratified relic of the day, a few hundred metres thick, capped by the new nocturnal inversion — which is where the next morning's first thermals find yesterday's dust, pollen and ozone, and where the evening's first kite and drone flights sample the day's memory.
:::
:::

::: warning The wind you measure is not the wind that drives the weather, "calm" is a flux statement, and the boundary layer is not the troposphere
Five confusions. **Screen-height wind is the slowest wind in the profile**: the weather-driving geostrophic wind lives above the boundary layer, typically $5$–$10\ \mathrm{m\,s^{-1}}$ faster and $20$–$40^{\circ}$ backed from the surface wind — every dispersion, wind-energy and spray calculation must correct for the difference. **"Calm" air still carries fluxes**: a $0.5\ \mathrm{m\,s^{-1}}$ breeze on a hot day can move more heat than a $10\ \mathrm{m\,s^{-1}}$ gale on a cold one, because fluxes depend on covariance, not wind speed — anemometers lie about the engine. **The surface layer is not the boundary layer**: the log law's $10\ \mathrm{m}$ world is $5$ per cent of the CBL's depth, and extrapolating its gradients upward overestimates the mixed layer's gradients by an order of magnitude — the classic error in early climate models' surface fluxes. **The boundary layer is not the troposphere**: the troposphere is $10\ \mathrm{km}$ deep and mostly not in contact with the ground; the boundary layer is the part that is, and confusing the two turns every cloud-base, inversion and capping statement inside out. **And the urban boundary layer is a different climate**: cities add roughness (drag tenfold), storage (walls release heat at night), and a heat flux from waste energy, lifting their mixed layer $300$–$500\ \mathrm{m}$ higher and their minimum temperature $3$–$8\ \mathrm{K}$ above the countryside — the urban heat island is a boundary-layer phenomenon in the textbook sense, and it is warming faster than the global mean.
:::

::: history
The mixing-length idea is **Ludwig Prandtl**'s of 1925, from the Göttingen school of turbulence; the similarity framework for the stable and unstable surface layer is **A. S. Monin** and **A. M. Obukhov**'s 1954 paper from the Moscow school of **Obukhov** and colleagues, with the stability functions measured over the following two decades at stations from the Aspendale tower programme of **C. H. B. Priestley** and **W. Swinbank** to the **Wangara** experiment of 1969, still the classic convective-layer dataset, and the large land-surface campaigns **FIFE** (1987–89) and **HAPEX-MOBILHY** (1987). The entrainment closure of the mixed-layer growth law came out of the mixed-layer modelling wave of the 1970s, and the land-surface coupling of heat waves to soil dryness was established by the **HAOPEX**, **EFEDA** and **EVA-Grafs** analyses of the 1990s.
:::

The turbulence kinetic energy budget that underlies the mixing-length closure follows from the momentum equations of [[atmospheric-dynamics/equations-of-motion]]; the stability that decides whether the layer mixes is in [[meteorology/stability]], the clouds the CBL tops in [[atmospheric-dynamics/cloud-physics]] and [[meteorology/clouds-precipitation]], the diurnal cycle's role in forecasting in [[meteorology/forecasting]], the nocturnal jet's storm-scale cousin in [[meteorology/storms]], the surface fluxes' climate role in [[climate-system/energy-budget]] and [[climate-system/hydrological-cycle]], the aerosols the mixed layer dilutes in [[atmospheric-chemistry/aerosols]] and [[atmospheric-chemistry/air-quality]], and the land-surface heat wave mechanism in [[climate-change/extremes]].

::: quiz
On a clear, calm night the $10\ \mathrm{m}$ wind often increases after sunset even as the surface cools. The main cause is
- [ ] the log law steepening as the air stabilises.
- [x] decoupling from surface friction letting the Coriolis force accelerate a low-level jet.
- [ ] thermal expansion of the air aloft.
- [ ] the sea-breeze front arriving.
::: solution
Stabilisation **suppresses** the turbulence that transfers momentum down, so the surface drag collapses; the wind above the stable layer, no longer braked, undergoes an inertial oscillation toward the geostrophic and produces the nocturnal low-level jet $1$–$3\ \mathrm{h}$ after sunset. The log law is precisely what stops applying — the night is the failure case of Monin–Obukhov similarity, and the jet is the reason wind turbines can produce their night-time power peaks.
:::
:::

::: summary
- The boundary layer is the frictionally-driven, kilometre-thick, daily-breathing shell where weather meets the surface; its currency is turbulent fluxes, not winds.
- Constant stress plus Prandtl's mixing length gives the log law, $U = u_*\kappa^{-1}\ln(z/z_0)$ — the most verified profile in the science and the basis of every height and roughness correction.
- Monin–Obukhov similarity adds stability through $L = -u_*^{3}\theta_v/(\kappa g\,\overline{w'\theta_v'})$; the theory organises the day but fails at night, over canopies and complex terrain.
- The surface energy balance $R_n = G + H + LE$ and its Bowen ratio decide whether the sun's work heats the air or evaporates water — the lever of irrigation cooling and heat-wave amplification.
- The daytime convective boundary layer is adiabatic, capped by an entrainment zone, scaled by $w_*$, and grows at centimetres per second against its inversion — the mixing-height parabola of every air-quality forecast.
- At night the layer decouples, the residual layer preserves the day's air, and the low-level jet runs the inertial oscillation over an insulated surface.
:::

## Exercises

::: exercise Friction velocity {level=1 check="0.35"}
Find $u_*$ in $\mathrm{m\,s^{-1}}$ for a surface stress of $0.15\ \mathrm{N\,m^{-2}}$ at $\rho = 1.2\ \mathrm{kg\,m^{-3}}$. (Enter to two decimals.)
::: solution
$u_* = \sqrt{0.15/1.2} = 0.35\ \mathrm{m\,s^{-1}}$. The friction velocity is the stress expressed as a velocity; $0.2$–$0.5$ is the ordinary range over land, and it is the velocity scale that appears in every profile law of this lesson.
:::
:::

::: exercise Screen-height wind {level=1 check="3.1"}
With $u_* = 0.30\ \mathrm{m\,s^{-1}}$ and $z_0 = 0.03\ \mathrm{m}$, find the neutral $2\ \mathrm{m}$ wind in $\mathrm{m\,s^{-1}}$. (Enter to one decimal.)
::: solution
$U(2) = (0.30/0.40)\ln(2/0.03) = 0.75\times4.2 = 3.1\ \mathrm{m\,s^{-1}}$. The screen-height wind is a small fraction of the profile's top — the same stress gives $4.4\ \mathrm{m\,s^{-1}}$ at $10\ \mathrm{m}$ — and this is the correction every wind-resource and evaporation calculation must make.
:::
:::

::: exercise Bowen partition {level=1 check="160"}
$R_n = 500\ \mathrm{W\,m^{-2}}$, $G = 20\ \mathrm{W\,m^{-2}}$, $\beta = 2$. Find $LE$ in $\mathrm{W\,m^{-2}}$. (Enter the number.)
::: solution
$LE = (R_n - G)/(1+\beta) = 480/3 = 160\ \mathrm{W\,m^{-2}}$, $H = 320$. A dry-land partition: two thirds of the available energy heats the air directly, which is the physical reason deserts run hot at the surface and rangeland heat waves intensify as the soil dries.
:::
:::

::: exercise Obukhov length {level=2 check="21"}
Find $|L|$ in metres for $u_* = 0.30\ \mathrm{m\,s^{-1}}$, $\theta_v = 300\ \mathrm{K}$, $\overline{w'\theta_v'} = 0.1\ \mathrm{K\,m\,s^{-1}}$ (daytime). (Enter to the nearest metre.)
::: solution
$L = -0.30^{3}\times300/(0.4\times9.81\times0.1) = -21\ \mathrm{m}$: on a heated day the surface layer is unstable throughout — $z/|L| > 1$ above $21\ \mathrm{m}$ — which is why daytime profiles flatten toward the mixed-layer form and the log law applies only in the first tens of metres.
:::
:::

::: exercise Convective velocity {level=2 check="1.7"}
Find $w_*$ for $\overline{w'\theta_v'} = 0.1\ \mathrm{K\,m\,s^{-1}}$, $\theta_v = 300\ \mathrm{K}$, $z_i = 1500\ \mathrm{m}$. (Enter to one decimal.)
::: solution
$w_* = (9.81\times0.1\times1500/300)^{1/3} = (4.9)^{1/3} = 1.7\ \mathrm{m\,s^{-1}}$. Thermals and light aircraft live in this scale: the typical thermal updraught is $1$–$2\,w_*$ at its core and the CBL's whole transport is organised by eddies of this speed and the depth of the layer.
:::
:::

::: exercise Profile ratio {level=2 check="1.5"}
For the neutral log law over $z_0 = 0.03\ \mathrm{m}$, find the ratio $U(20)/U(2)$ to one decimal.
::: solution
The ratio is $\ln(20/0.03)/\ln(2/0.03) = 6.5/4.2 = 1.5$. Tenfold height buys half again the wind — the $e$-fold rule ($2.5\,u_*$ per $e$-fold) in practice, and the reason hub-height extrapolation from screen data is so sensitive to the assumed roughness.
:::
:::

::: exercise Deriving the log law {level=3 check="0.75"}
From $\overline{u'w'} = -\ell^{2}|\partial U/\partial z|(\partial U/\partial z)$ with $\ell = \kappa z$ and constant stress $u_*^{2}$, derive $\partial U/\partial z = u_*/(\kappa z)$ and compute the wind-speed increase in $\mathrm{m\,s^{-1}}$ per $e$-fold of height for $u_* = 0.30\ \mathrm{m\,s^{-1}}$. (Enter to two decimals.)
::: solution
Setting $u_*^{2} = \kappa^{2}z^{2}(\partial U/\partial z)^{2}$ and taking the positive root, $\partial U/\partial z = u_*/(\kappa z)$; integrating gives $U = u_*\kappa^{-1}\ln(z/z_0)$, so the increase per $e$-fold of height is $u_*/\kappa = 0.30/0.40 = 0.75\ \mathrm{m\,s^{-1}}$ — equivalently $1.7\ \mathrm{m\,s^{-1}}$ per decade of height. The whole log law is one integration of one closure assumption; its universal agreement with observation is the empirical foundation of surface-layer meteorology.
:::
:::

::: exercise Mixed-layer growth {level=3 check="0.09"}
With surface heat flux $0.12\ \mathrm{K\,m\,s^{-1}}$, inversion strength $\Delta\theta = 3\ \mathrm{K}$ and $R_f = 0.2$, find $\mathrm{d}z_i/\mathrm{d}t$ in $\mathrm{m\,s^{-1}}$ from the slab entrainment formula. (Enter to two decimals.)
::: solution
$\mathrm{d}z_i/\mathrm{d}t = 1.1(1+5\times0.2)\times0.12/3 = 2.2\times0.12/3 = 0.088 \approx 0.09\ \mathrm{m\,s^{-1}}$. Held for six hours this deepens the mixed layer $1.9\ \mathrm{km}$ — the observed spring growth rate — and the formula's message is the trade-off that governs both pollution and convection: a strong surface flux deepens the layer (good for dilution, good for thermals), a strong cap suppresses it (bad for air quality, good for overnight haze), and the forecast day is decided by which one the sun picks.
:::
:::
