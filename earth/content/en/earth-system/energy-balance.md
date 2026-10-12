Satellites that measure the whole Earth's radiation budget — the Clouds and the Earth's Radiant Energy System (CERES) instruments, flying since 2000 on Terra and successive platforms — find that, averaged over the globe and the year, our planet sends back to space $238.5\ \mathrm{W\,m^{-2}}$. It also receives, on the same average, almost exactly that. The balance is not exact: instruments now measure that the Earth retains about $0.9\ \mathrm{W\,m^{-2}}$ more than it emits, and roughly $90\%$ of that surplus goes into the ocean. That fraction of one watt per square metre, against a throughput of $240$, is global warming — an imbalance of four parts in a thousand.

Everything in this chapter follows from counting radiation. The Sun is hot and small, so it shines in visible light; the Earth is cool and large, so it glows in the infrared. The atmosphere happens to be transparent to one and opaque to the other, and that single accident of molecular physics makes the surface tens of degrees warmer than it would otherwise be. We will write the balance as arithmetic, add the geometry of a sphere and the tilt of its axis, and then see how the balance shifts when something changes — which is the whole of climate physics in miniature.

## What arrives

::: definition Solar constant and insolation {#def-solar-constant}
The **solar constant** $S_0$ is the solar irradiance on a surface perpendicular to the Sun's rays at the mean Earth–Sun distance: $S_0 = 1361\ \mathrm{W\,m^{-2}}$ (as measured by the Total Irradiance Monitoring Experiment and its successors since 1991). **Insolation** is the irradiance actually received on a given surface, which depends on the Sun's elevation, the time of day, the season and the latitude.
:::

Because the Earth is a sphere, it intercepts sunlight over a disc of area $\pi R^2$ but spreads the energy over a surface $4\pi R^2$. The globally averaged, top-of-atmosphere value is therefore $S_0/4 = 340\ \mathrm{W\,m^{-2}}$. The Earth's orbit is slightly elliptical (eccentricity $e = 0.0167$), so the irradiance varies by $\pm 3.4\%$ through the year, reaching a maximum at perihelion on about 3 January: the ratio of perihelion to aphelion irradiance is $[(1+e)/(1-e)]^2 = 1.069$, or $7\%$. The 11-year solar cycle changes $S_0$ by about $1.3\ \mathrm{W\,m^{-2}}$, one part in a thousand.

The Sun behaves to a good approximation as a blackbody at $T_\odot = 5772\ \mathrm{K}$. Two consequences dominate everything that follows.

::: theorem Planck, Wien and Stefan–Boltzmann {#thm-radiation}
A blackbody at absolute temperature $T$ emits a spectral radiance

$$
B_\lambda(T) = \frac{2hc^2}{\lambda^5}\,\frac{1}{e^{hc/\lambda kT} - 1},
$$

whose peak obeys **Wien's displacement law** $\lambda_\text{max}T = 2898\ \mu\mathrm{m\,K}$, and whose total emitted flux obeys the **Stefan–Boltzmann law**

$$
F = \varepsilon\sigma T^4, \qquad \sigma = 5.6704\times10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}},
$$

with $\varepsilon \le 1$ the emissivity ($\varepsilon = 1$ for a blackbody).
:::

::: proof
Integrating $B_\lambda$ over all wavelengths and over the outward hemisphere gives $\sigma T^4$: substituting $x = hc/\lambda kT$,

$$
\int_0^\infty B_\lambda\,\mathrm{d}\lambda = \frac{2\pi (kT)^4}{h^3c^2}\int_0^\infty \frac{x^3}{e^x - 1}\,\mathrm{d}x = \frac{2\pi k^4}{h^3c^2}\cdot\frac{\pi^4}{45}\,T^4,
$$

using $\int_0^\infty x^3/(e^x-1)\,\mathrm{d}x = \pi^4/45$; the constant in front evaluates to $5.6704\times10^{-8}$. For the peak, differentiate the denominator's dominant factor: $\mathrm{d}B_\lambda/\mathrm{d}\lambda = 0$ gives $5(1 - e^{-x}) = x$ with $x = hc/\lambda kT$, whose solution is $x = 4.965$, hence $\lambda_\text{max}T = hc/4.965k = 2898\ \mu\mathrm{m\,K}$.
:::

At $5772\ \mathrm{K}$ the peak is at $0.50\ \mu\mathrm{m}$, in the green; about $43\%$ of solar energy is in the visible band $0.4$–$0.7\ \mu\mathrm{m}$, $49\%$ at longer wavelengths and $7\%$ in the ultraviolet. The Earth's own emission peaks at $2898/288 = 10.0\ \mu\mathrm{m}$. This separation is the reason the atmosphere can behave so differently towards the two beams: the strong vibrational transitions of $\mathrm{H_2O}$, $\mathrm{CO_2}$, $\mathrm{O_3}$, $\mathrm{N_2O}$, $\mathrm{CH_4}$ fall in the thermal infrared, while the main gases — $\mathrm{N_2}$ and $\mathrm{O_2}$, which have no dipole moment — are almost transparent to both.

::: definition Albedo {#def-albedo}
The **albedo** $\alpha$ of a surface or planet is the fraction of the incident radiation it reflects. The **planetary** (Bond) albedo is the wavelength-integrated, hemispheric value for the whole planet: for Earth, $\alpha = 0.294 \pm 0.004$ (CERES-derived, Stephens et al., 2012). **Surface** albedos are much lower over ocean ($0.06$), higher over forest ($0.12$–$0.15$), snow ($0.7$–$0.9$) and fresh sea ice ($0.6$).
:::

Roughly two thirds of the planetary albedo comes from clouds and atmospheric scattering, one third from the surface, and clouds alone account for about half of the total. Multiplying out: of the $340\ \mathrm{W\,m^{-2}}$ arriving at the top of the atmosphere, $100$ is reflected and $240$ is absorbed — $78\ \mathrm{W\,m^{-2}}$ in the atmosphere and clouds (mostly by water vapour and ozone) and $162$ at the surface (Trenberth, Fasullo & Kiehl, 2009).

## The zero-dimensional energy balance

::: proposition The equilibrium temperature of a planet {#prop-ebm}
A rapidly rotating planet at distance $d$ from a star of luminosity $L$, with Bond albedo $\alpha$ and emissivity $\varepsilon$, has an equilibrium **effective radiating temperature**

$$
T_e = \left(\frac{L(1-\alpha)}{16\pi\sigma\varepsilon\, d^2}\right)^{1/4} = \left(\frac{S_0(1-\alpha)}{4\sigma\varepsilon}\right)^{1/4}.
$$
:::

::: proof
Power absorbed = (irradiance at the orbit) $\times$ (cross-sectional area) $\times$ (fraction not reflected) $= \frac{L}{4\pi d^2}\pi R^2(1-\alpha)$. Power emitted $= \varepsilon\sigma T^4 \times 4\pi R^2$, the whole surface, provided the surface is warm everywhere — a good assumption if the rotation is fast enough for the day side to cool towards the night side value, and a bad one for a slow, airless body. Equating and cancelling $\pi R^2$ gives the result, with $S_0 = L/4\pi d^2$.
:::

::: example The Earth's radiating temperature {#ex-te}
Compute the Earth's effective radiating temperature with $S_0 = 1361\ \mathrm{W\,m^{-2}}$ and $\alpha = 0.294$, and compare it with the observed surface temperature.
::: solution
$$
T_e = \left(\frac{1361\times 0.706}{4\times 5.6704\times10^{-8}}\right)^{1/4} = \left(\frac{960.9}{2.268\times10^{-7}}\right)^{1/4} = (4.237\times10^{9})^{1/4} = 255.1\ \mathrm{K}.
$$

The surface averages about $288\ \mathrm{K}$ (the 1991–2020 mean is $287.5\ \mathrm{K}$, and 2023 was roughly $0.5\ \mathrm{K}$ warmer still; Berkeley Earth, Copernicus), so the surface is about $32\ \mathrm{K}$ — conventionally quoted as $33\ \mathrm{K}$ — warmer than the level from which the planet radiates to space. That $33\ \mathrm{K}$ is the conventional size of the natural greenhouse effect. Note what the calculation is and is not: it is a statement about the *radiation*, and $255\ \mathrm{K}$ is the temperature of the air near $5\ \mathrm{km}$ height, from which most outgoing infrared escapes, not the temperature the surface would have with no atmosphere at all (see the warning below).
:::
:::

::: warning "$-18\ ^\circ\mathrm{C}$: the Earth without the greenhouse effect" is not a prediction
The $255\ \mathrm{K}$ figure is often served up as "the temperature the Earth would have without an atmosphere, so without life". It is not. It is the temperature of the surface *required to radiate the absorbed sunlight if the surface were the only emitter and were black in the infrared*. Remove the atmosphere and you also remove water vapour and clouds, which are themselves the dominant greenhouse gases: the planetary albedo would fall from $0.294$ to about $0.15$, and the loss of water vapour would leave a far weaker greenhouse effect than the one you intended to switch off. The best estimate for a dry, $\mathrm{CO_2}$-only Earth at today's solar output is closer to $230\ \mathrm{K}$, and Mars — smaller, further out, with $1\%$ of our atmosphere — sits at $210\ \mathrm{K}$. The $33\ \mathrm{K}$ is a useful book-keeping number, not a counterfactual.
:::

::: widget plot
f: (1361*(1-x)/(4*5.6704e-8))^(1/4)
x: 0, 0.9
y: 200, 340
hlines: 255
vlines: 0.294
caption: Effective radiating temperature against planetary albedo. The curve is $T_e \propto (1-\alpha)^{1/4}$, so the sensitivity is largest where $\alpha$ is small: near the present $0.294$ (dashed lines) a change of $0.01$ in albedo moves $T_e$ by $0.9\ \mathrm{K}$, while at $\alpha = 0.6$ the same change moves it by only $0.4\ \mathrm{K}$. Read off the albedo that would be needed for $T_e = 288\ \mathrm{K}$: it is $-0.15$, which is impossible. No amount of unreflected sunlight can lift a planet to $288\ \mathrm{K}$; that is the greenhouse layer's job.
:::

## Why the balance is not enough: the greenhouse effect

::: proposition The one-layer greenhouse {#prop-greenhouse}
Let the atmosphere be perfectly transparent to solar radiation and perfectly absorbing and emitting in the infrared, characterised by a single isothermal layer of temperature $T_a$. Then

$$
T_a = T_e, \qquad T_s = 2^{1/4}T_e = 1.19\,T_e,
$$

so with $T_e = 255\ \mathrm{K}$ the surface is $303\ \mathrm{K}$.
:::

::: proof
Top of the atmosphere: the only radiation leaving is the layer's upward emission, so $\varepsilon\sigma T_a^4 = (1-\alpha)S_0/4 = \sigma T_e^4$, giving $T_a = T_e$. Surface: it absorbs the solar beam $(1-\alpha)S_0/4$ *and* the layer's downward emission $\sigma T_a^4$, and emits $\sigma T_s^4$, so
$$
\sigma T_s^4 = \sigma T_e^4 + \sigma T_a^4 = 2\sigma T_e^4 .
$$
The factor $2^{1/4} = 1.189$ comes entirely from the fact that the atmosphere radiates *downwards* as well as upwards. With $n$ such layers the same argument gives $T_s = (n+1)^{1/4}T_e$.
:::

One idealised layer overshoots ($303\ \mathrm{K}$ against $288\ \mathrm{K}$), because the real atmosphere is neither transparent to sunlight nor black in every infrared band. The standard grey-atmosphere result replaces the integer $n$ by a continuous **infrared optical depth** $\tau$: using the Eddington approximation for a grey, plane-parallel, radiative-transfer atmosphere,

$$
T_s^4 = \left(1 + \tfrac{3}{4}\tau\right)T_e^4,
$$

so the present climate corresponds to $\tau \approx 0.84$. The physically important point is not the number but the structure: the surface is warmer than the emission level *because* it must emit enough to supply both the loss to space and the atmosphere's own absorption, and the amount warmer is set by how opaque the column is.

::: example How opaque is the atmosphere? {#ex-tau}
Find the infrared optical depth that gives $T_s = 288\ \mathrm{K}$ with $T_e = 255\ \mathrm{K}$, and the extra optical depth needed for $1\ \mathrm{K}$ of warming with no other change.
::: solution
$$
1 + \tfrac34\tau = \left(\frac{288}{255}\right)^4 = 1.626 \quad\Longrightarrow\quad \tau = 0.835 .
$$

Differentiating $T_s^4 = (1 + \tfrac34\tau)T_e^4$ at fixed $T_e$ gives $4T_s^3\,\mathrm{d}T_s = \tfrac34 T_e^4\,\mathrm{d}\tau$, so

$$
\mathrm{d}\tau = \frac{4T_s^3}{\tfrac34 T_e^4}\,\mathrm{d}T_s = \frac{4\times288^3}{0.75\times255^4}\times 1 = 0.115 .
$$

A $13\%$ increase in the atmosphere's infrared opacity buys $1\ \mathrm{K}$ of surface warming. Carbon dioxide doubling raises the opacity by an amount equivalent to a forcing of $3.12\ \mathrm{W\,m^{-2}}$ (IPCC AR6, 2021, Chapter 7), which is a few per cent of the $240\ \mathrm{W\,m^{-2}}$ flowing through the system — a reminder of how sensitive the surface temperature is to small changes in a filter that is already nearly opaque in its strongest bands. (That is also why the bands are *not* saturated: adding $\mathrm{CO_2}$ widens the wings of the absorption lines and raises the level from which radiation escapes.)
:::
:::

::: definition Radiative forcing and climate sensitivity {#def-forcing}
A **radiative forcing** $\Delta F$ is the change in the net (absorbed minus emitted) irradiance at the tropopause, in $\mathrm{W\,m^{-2}}$, after allowing the stratosphere to adjust but with the surface and troposphere held fixed. **Effective radiative forcing** (ERF) relaxes the stratospheric-adjustment condition and is the quantity used in current assessments. The response is

$$
\Delta T = \frac{\Delta F}{\lambda}, \qquad \lambda = \lambda_0 + \sum_i \lambda_i ,
$$

where $\lambda$ is the **climate feedback parameter** ($\mathrm{W\,m^{-2}\,K^{-1}}$; negative means stable) and $\lambda_0 \approx -3.2\ \mathrm{W\,m^{-2}\,K^{-1}}$ is the Planck response. The **equilibrium climate sensitivity** (ECS) is the warming for a doubling of $\mathrm{CO_2}$: $\mathrm{ECS} = 3.12/|\lambda|$.
:::

::: example From forcing to warming {#ex-ecs}
Given the AR6 best estimate $\mathrm{ECS} = 3.0\ ^\circ\mathrm{C}$ and the $\mathrm{CO_2}$-doubling ERF of $3.12\ \mathrm{W\,m^{-2}}$, find the net feedback parameter. Then find the warming expected from the total anthropogenic ERF of $2.72\ \mathrm{W\,m^{-2}}$ for 1850–1900 to 2019, and compare it with the observed $1.1\ ^\circ\mathrm{C}$.
::: solution
$$
|\lambda| = \frac{3.12}{3.0} = 1.04\ \mathrm{W\,m^{-2}\,K^{-1}} .
$$

The Planck response alone is $3.2$, so the sum of the other feedbacks must be about $+2.2\ \mathrm{W\,m^{-2}\,K^{-1}}$ — net *destabilising*, and dominated by water vapour and clouds. The equilibrium warming for $2.72\ \mathrm{W\,m^{-2}}$ would be $2.72/1.04 = 2.6\ ^\circ\mathrm{C}$, but the observed warming so far is $1.1\ ^\circ\mathrm{C}$ for 2011–2020 relative to 1850–1900 (IPCC AR6, 2021). The gap is thermal inertia: the ocean has absorbed over $90\%$ of the extra energy, and the surface has not yet reached the temperature its forcing implies. The warming still "in the pipeline" is the reason climate continues to rise even if emissions stop, and it is quantified in [[climate-change/projections]].
:::
:::

::: quiz
The Earth's effective radiating temperature is $255\ \mathrm{K}$ but the surface is $288\ \mathrm{K}$. Which single statement best explains the difference?
- [ ] The Earth is closer to the Sun than the blackbody calculation assumes.
- [ ] The surface has a lower albedo than the planet.
- [x] The atmosphere is largely transparent to incoming visible light but absorbs and re-emits most of the outgoing infrared.
- [ ] The Earth is still cooling from its formation, and that heat warms the surface.
::: solution
The atmosphere passes the solar beam down to the surface and then impedes the infrared the surface emits, so the surface must be warmer than the level from which radiation finally escapes. Albedo and distance are already in the $255\ \mathrm{K}$ figure, and internal heat is $1/2800$ of the solar flux ([[earth-system/planet-earth]]).
:::
:::

## The geometry of seasons and the latitudinal gradient

Radiation is not evenly distributed, and the pattern is set by geometry alone. The daily-mean insolation on a horizontal surface at the top of the atmosphere is

$$
\bar Q = \frac{S_0}{\pi}(1 + d)\left(H_0\sin\phi\sin\delta + \cos\phi\cos\delta\sin H_0\right),
\qquad \cos H_0 = -\tan\phi\tan\delta,
$$

where $\phi$ is latitude, $\delta$ the solar declination (between $\pm 23.44^\circ$, set by the obliquity of the ecliptic), $H_0$ the half-length of the day in radians and $d$ the small eccentricity correction. When $|\tan\phi\tan\delta| > 1$ the Sun does not set (take $H_0 = \pi/2$) or does not rise ($\bar Q = 0$).

::: example Insolation by latitude {#ex-insolation}
Compute the daily-mean insolation at the top of the atmosphere at the equinox at the equator, at $45^\circ\mathrm{N}$ at the June solstice, at $65^\circ\mathrm{N}$ at the June and December solstices, and the annual means at $0^\circ$, $65^\circ\mathrm{N}$ and $90^\circ\mathrm{N}$.
::: solution
At the equinox at the equator, $\delta = 0$, $H_0 = \pi/2$, so $\bar Q = S_0/\pi = 433\ \mathrm{W\,m^{-2}}$. At $45^\circ\mathrm{N}$ on 21 June, $\delta = 23.44^\circ$, $H_0 = 2.019\ \mathrm{rad}$ (a $15.4$-hour day), giving $\bar Q = 491\ \mathrm{W\,m^{-2}}$. At $65^\circ\mathrm{N}$: June, $H_0 = 2.764\ \mathrm{rad}$ (a $21.1$-hour day) and $\bar Q = 486\ \mathrm{W\,m^{-2}}$; December, the Sun barely rises and $\bar Q \approx 3\ \mathrm{W\,m^{-2}}$. Annual means: $415\ \mathrm{W\,m^{-2}}$ at the equator, $212$ at $65^\circ\mathrm{N}$ and $172$ at the North Pole.

Two facts matter. The seasonal contrast at high latitude is enormous — $486$ against $3\ \mathrm{W\,m^{-2}}$ — because it is the *tilt*, not the distance, that moves the Sun. But the **annual mean** gradient from equator to pole is only $415 - 172 = 243\ \mathrm{W\,m^{-2}}$, about $1.5\ \mathrm{W\,m^{-2}}$ per degree of latitude. That modest, permanent imbalance is what drives the general circulation ([[earth-system/circulation]]), the oceans and the storms, and it is the ultimate source of the energy in the weather.
:::
:::

::: widget plot
f: (1361/pi)*(1+0.0167*cos(2*pi*(x-3)/365))*(sin(phi*pi/180)*sin(23.44*pi/180*sin(2*pi*(x-80)/365)) + cos(phi*pi/180)*cos(23.44*pi/180*sin(2*pi*(x-80)/365))*sin(acos(clamp(-tan(phi*pi/180)*tan(23.44*pi/180*sin(2*pi*(x-80)/365)),-1,1))))
x: 1, 365
y: 0, 560
sliders: phi=65:0:90:1
labels: \text{daily-mean insolation}
caption: Daily-mean insolation at the top of the atmosphere against day of the year, for the latitude given by the slider (in degrees). Drag from $0$ to $90$: at the equator the curve is nearly flat with equinoxal peaks; at $65^\circ\mathrm{N}$ it swings from zero in winter to $486\ \mathrm{W\,m^{-2}}$ in June; at the pole it is a single six-month hump whose peak exceeds the equator's. Note that the curve is slightly asymmetric — the Earth is nearest the Sun on 3 January, which is why southern summers are marginally more intense.
:::

::: warning Seasons are not caused by the Earth's distance from the Sun
The Earth is nearest the Sun in early January — the middle of northern winter. If distance drove the seasons, both hemispheres would warm together, and they do not. The cause is the $23.44^\circ$ tilt of the rotation axis, which changes the Sun's elevation and the length of the day. Distance does modulate the amplitude slightly: the $7\%$ extra irradiance at perihelion makes southern-hemisphere summers about $1.7\%$ more intense than northern ones, and this asymmetry, not the total, is what paces the ice ages over $23$- and $19$-kyr cycles ([[palaeoclimate/orbital-cycles]]).
:::

::: quiz
Which single change would most reduce the annual-mean temperature contrast between the equator and the poles?
- [ ] Making the Earth's orbit more eccentric.
- [x] Reducing the tilt of the rotation axis towards zero.
- [ ] Making the Earth rotate faster.
- [ ] Increasing the planetary albedo uniformly.
::: solution
The latitudinal contrast in annual-mean insolation is set by the tilt: with zero obliquity the Sun would always be overhead at the equator, insolation would fall smoothly towards the poles and seasons would vanish, so the equator–pole energy difference driving the general circulation would shrink (and, with it, the ice that keeps the poles cold). Eccentricity changes both hemispheres together and, at fixed semi-major axis, barely changes the annual global mean; rotation rate changes how the atmosphere and ocean transport the energy, not how much arrives; a uniform albedo change shifts the whole planet's temperature, not the contrast.
:::
:::

## Ice, albedo and the shape of the response

::: example A local change with a global price {#ex-albedo-change}
Suppose $1\%$ of the globe's surface is converted from forest (albedo $0.12$) to snow-covered clear-cut (albedo $0.35$). Find the global mean radiative forcing and, with $\lambda = -1.04\ \mathrm{W\,m^{-2}\,K^{-1}}$, the equilibrium global temperature change.
::: solution
The local change in absorbed solar radiation is $\Delta\alpha \times \bar S$ where $\bar S = S_0/4 = 340\ \mathrm{W\,m^{-2}}$ is the globally averaged insolation:

$$
\Delta F_\text{local} = -(0.35 - 0.12)\times340 = -78\ \mathrm{W\,m^{-2}} .
$$

Spread over $1\%$ of the planet, the global mean forcing is $-0.78\ \mathrm{W\,m^{-2}}$ — comparable with the entire present-day forcing from methane. The equilibrium response is

$$
\Delta T = \frac{-0.78}{-1.04} = -0.75\ ^\circ\mathrm{C}.
$$

Two cautions. The calculation ignores the ice–albedo feedback, which would amplify the local cooling; and it ignores that deforestation also removes carbon, changes evapotranspiration and alters clouds, all of which matter more than the albedo in most real cases. The point of the arithmetic is the scale: a change confined to $1\%$ of the surface can produce a forcing of the same size as a century of methane emissions.
:::
:::

::: proposition Linear feedbacks and the runaway condition {#prop-runaway}
With a linearised outgoing longwave response $\lambda_0 = -4\sigma T_e^3$ and feedbacks of total strength $\lambda_f = \sum_i\lambda_i > 0$, the equilibrium response to a forcing is

$$
\Delta T = \frac{\Delta F}{-(\lambda_0 + \lambda_f)},
$$

which is finite only while $\lambda_f < |\lambda_0|$. The amplification factor relative to the no-feedback response is $|\lambda_0|/|\lambda_0 + \lambda_f|$.
:::

::: proof
The perturbed energy balance is $C\,\mathrm{d}\Delta T/\mathrm{d}t = \Delta F + \lambda_f\Delta T + \lambda_0\Delta T$, where $C$ is the effective heat capacity per unit area. Setting the left-hand side to zero gives the stated equilibrium. The no-feedback response is $\Delta F/|\lambda_0|$, so the ratio is as claimed. Equilibrium requires the denominator to be positive, i.e. $\lambda_f < |\lambda_0| = 3.2\ \mathrm{W\,m^{-2}\,K^{-1}}$. If feedbacks reached that value, the Planck response would no longer be able to radiate away the perturbation and the surface temperature would rise without limit — the mathematical content of "runaway greenhouse". The assessed value of $\lambda_f$ is about $+2.2$, so the Earth is stable but, in the assessed language of IPCC AR6, the margin is not large.
:::

::: example How much does the Sun's 11-year cycle matter? {#ex-solar-cycle}
Total solar irradiance varies by about $1.3\ \mathrm{W\,m^{-2}}$ between solar minimum and maximum. Find the corresponding forcing and the global mean temperature change implied by $\lambda = -1.04\ \mathrm{W\,m^{-2}\,K^{-1}}$, and compare it with the $2.72\ \mathrm{W\,m^{-2}}$ of anthropogenic ERF.
::: solution
$$
\Delta F = \frac{1.3\times(1 - 0.294)}{4} = 0.23\ \mathrm{W\,m^{-2}}, \qquad
\Delta T = \frac{0.23}{1.04} = 0.22\ ^\circ\mathrm{C}.
$$

That is the equilibrium response to a full swing of the solar cycle, and the observed response is smaller (about $0.05$–$0.1\ ^\circ\mathrm{C}$, with the ocean's inertia damping the 11-year signal) — the same reason the daily temperature range at the surface is only about $10\ \mathrm{K}$ although the insolation swings between $0$ and $340\ \mathrm{W\,m^{-2}}$. The anthropogenic forcing is twelve times the solar cycle's, and the solar constant has trended slightly *downwards* since 2008 while global temperatures rose. Attributing recent warming to the Sun requires the forcing and the response to move in opposite directions, which is examined in [[climate-change/attribution]].
:::
:::

::: history
Joseph Fourier (Fourier) posed the problem in 1824 and again in 1827, comparing the Earth to a box covered with glass and concluding that the atmosphere retains heat "by a mechanism analogous to that of M. de Saussure's hot-air box". John Tyndall (Tyndall) supplied the mechanism in 1861 with the canister-and-pile experiments that showed water vapour and carbon dioxide absorb the heat radiated by the Earth. Samuel Langley (Langley) built the bolometer in 1878 and from Mount Whitney in 1881 measured the solar constant to within a few per cent, and measured the fraction of terrestrial radiation absorbed by the atmosphere. Then, in 1900, Knut Ångström (Ångström) made the influential error of the century: from laboratory tubes he argued that the $\mathrm{CO_2}$ absorption bands were already saturated, so more carbon dioxide could make no difference. The flaw was that the tubes were at one temperature and one pressure. In 1938 Guy Callendar (Callendar) compiled a century of station temperatures and old analyses of atmospheric carbon dioxide and argued that both were rising; in 1950 Fritz Möller (Möller) showed that pressure broadening and the overlapping water vapour bands leave carbon dioxide's bands far from saturated. The modern calculation begins with Syukuro Manabe and Richard Wetherald (Manabe, Wetherald) in 1967, who put a carbon dioxide band model into a one-dimensional radiative–convective column and obtained $2.9\ ^\circ\mathrm{C}$ for a doubling — the first modern estimate of climate sensitivity. Since 2000 the CERES instruments have measured the whole radiation budget from space, and the imbalance it reports is now one of the best-determined numbers in climate science.
:::

## Where this leads

The energy balance is the entry ticket to the climate courses. [[climate-system/energy-budget]] develops the global budget and its components in the detail the satellite record now allows; [[climate-system/greenhouse-effect]] treats absorption, the logarithmic dependence on carbon dioxide and the emission-level argument properly; [[climate-system/feedbacks-sensitivity]] turns the feedback parameter into an evidence question about models and observations; and [[earth-system/circulation]] takes the latitudinal imbalance computed in [[#ex-insolation]] and asks how the atmosphere and ocean carry it. The same four lines of algebra reappear, unchanged, in [[planetary-science/atmospheres]] when we ask what makes a planet habitable.

::: summary
- The Sun delivers $S_0/4 = 340\ \mathrm{W\,m^{-2}}$ on average; $100$ is reflected ($\alpha = 0.294$) and $240$ absorbed. Satellites measure an outgoing $238.5\ \mathrm{W\,m^{-2}}$ and a retained imbalance of about $0.9\ \mathrm{W\,m^{-2}}$.
- Balance gives $T_e = [S_0(1-\alpha)/4\sigma]^{1/4} = 255\ \mathrm{K}$; Wien's law puts the Sun's peak at $0.50\ \mu\mathrm{m}$ and the Earth's at $10\ \mu\mathrm{m}$, and that separation is the greenhouse effect's precondition.
- The $33\ \mathrm{K}$ difference between $288\ \mathrm{K}$ and $255\ \mathrm{K}$ is a statement about radiation levels, not a prediction for an airless Earth.
- A grey atmosphere with infrared optical depth $\tau$ gives $T_s^4 = (1 + \tfrac34\tau)T_e^4$; today $\tau \approx 0.84$, and $1\ \mathrm{K}$ costs a $13\%$ increase in opacity.
- $\Delta T = \Delta F/\lambda$ with $\lambda = \lambda_0 + \sum\lambda_i$; the assessed $|\lambda| \approx 1.0\ \mathrm{W\,m^{-2}\,K^{-1}}$ against a Planck response of $3.2$, so feedbacks are strongly net positive but the system remains stable.
- Insolation is set by geometry: $486\ \mathrm{W\,m^{-2}}$ at $65^\circ\mathrm{N}$ in June against $3$ in December, but an annual-mean equator-to-pole contrast of only $243\ \mathrm{W\,m^{-2}}$.
- Seasons come from the $23.44^\circ$ tilt, not from the Earth–Sun distance.
:::

## Exercises

::: exercise Irradiance at other planets {level=1 check="586"}
Mars orbits at $1.524\ \mathrm{AU}$. What is the solar constant there, in $\mathrm{W\,m^{-2}}$?
::: solution
$S = S_0/\text{AU}^2 = 1361/1.524^2 = 1361/2.323 = 586\ \mathrm{W\,m^{-2}}$.
:::
:::

::: exercise Wien's law {level=1 check="10.1"}
At what wavelength does the Earth emit most strongly, taking $T = 288\ \mathrm{K}$? Give your answer in $\mu\mathrm{m}$.
::: solution
$\lambda_\text{max} = 2898/288 = 10.1\ \mu\mathrm{m}$, in the thermal infrared — the region where $\mathrm{H_2O}$, $\mathrm{CO_2}$, $\mathrm{O_3}$ and $\mathrm{CH_4}$ absorb.
:::
:::

::: exercise Radiating temperature of Venus {level=1 check="229"}
Venus has $S_0 = 2613\ \mathrm{W\,m^{-2}}$ and Bond albedo $0.76$. Find its effective radiating temperature in kelvin.
::: solution
$T_e = [2613\times(1-0.76)/(4\times5.6704\times10^{-8})]^{1/4} = [627.1/2.268\times10^{-7}]^{1/4} = 229\ \mathrm{K}$. Its surface is $735\ \mathrm{K}$: the greenhouse effect there is $506\ \mathrm{K}$.
:::
:::

::: exercise Albedo of a darkened ice sheet {level=2 check="0.9"}
By how many kelvin does $T_e$ change if the planetary albedo falls from $0.294$ to $0.284$? Give the magnitude to one decimal place.
::: solution
$T_e(0.284) = [1361\times0.716/(4\sigma)]^{1/4} = 256.0\ \mathrm{K}$ against $T_e(0.294) = 255.1\ \mathrm{K}$: a change of $0.9\ \mathrm{K}$. The derivative estimate agrees: $\mathrm{d}T/T = \mathrm{d}\alpha/[4(1-\alpha)]$, so $\mathrm{d}T = 255.1\times0.01/2.824 = 0.9\ \mathrm{K}$. Note how large this is — a $0.01$ change of planetary albedo is worth about the same as a doubling of atmospheric carbon dioxide in the no-feedback response.
:::
:::

::: exercise The one-layer model with $n$ layers {level=2 check="361"}
Using $T_s = (n+1)^{1/4}T_e$ with $T_e = 255\ \mathrm{K}$, find the surface temperature for $n = 3$ layers.
::: solution
$T_s = 4^{1/4}\times255 = 1.414\times255 = 361\ \mathrm{K}$. The strong dependence on a small integer shows why the real atmosphere, which is only partly absorbing, must be treated with a continuous optical depth rather than whole layers.
:::
:::

::: exercise Insolation at the solstice {level=2}
Compute the daily-mean insolation at $30^\circ\mathrm{N}$ on 21 June and on 21 December, and the ratio.
::: solution
With $\delta = \pm 23.44^\circ$: in June, $\cos H_0 = -\tan30^\circ\tan23.44^\circ = -0.250$, $H_0 = 1.824\ \mathrm{rad}$ (a $13.9$-hour day), and
$$
\bar Q = \frac{1361}{\pi}\times0.984\times(1.824\times0.5\times0.398 + 0.866\times0.918\times0.969) = 426\times(0.363 + 0.770) = 482\ \mathrm{W\,m^{-2}}.
$$
In December, $\delta = -23.44^\circ$, $H_0 = 1.318\ \mathrm{rad}$ (a $10.1$-hour day) and the bracket becomes $-0.262 + 0.770 = 0.508$; with the Earth near perihelion the prefactor is $1361\times1.017/\pi = 441$, giving $\bar Q = 441\times0.508 = 223\ \mathrm{W\,m^{-2}}$. The ratio is $2.2$. At $30^\circ\mathrm{N}$ the Sun is high in both seasons, so the contrast is much smaller than at $65^\circ\mathrm{N}$, where the same calculation gives $486$ against $3$ (see [[#ex-insolation]]).
:::
:::

::: exercise Forcing from a change in solar output {level=2 check="0.35"}
Suppose the solar constant increased by $2\ \mathrm{W\,m^{-2}}$. Find the radiative forcing with $\alpha = 0.294$, in $\mathrm{W\,m^{-2}}$.
::: solution
$\Delta F = \Delta S(1-\alpha)/4 = 2\times0.706/4 = 0.35\ \mathrm{W\,m^{-2}}$. With $|\lambda| = 3.2$ (no feedbacks) this gives $0.11\ \mathrm{K}$; with $|\lambda| = 1.04$, $0.34\ \mathrm{K}$.
:::
:::

::: exercise The emission level {level=3}
Temperature in the troposphere falls at the environmental lapse rate $\Gamma = 6.5\ \mathrm{K\,km^{-1}}$. If the effective radiating level is at $5\ \mathrm{km}$ and the surface is at $288\ \mathrm{K}$, find the temperature at $5\ \mathrm{km}$. If doubling $\mathrm{CO_2}$ raises the effective emission level by $400\ \mathrm{m}$, estimate the resulting change in outgoing longwave radiation and the forcing, and compare with the assessed $3.12\ \mathrm{W\,m^{-2}}$.
::: solution
$T(5\ \mathrm{km}) = 288 - 6.5\times5 = 255.5\ \mathrm{K}$ — the effective radiating temperature sits near $5\ \mathrm{km}$, as the energy balance requires. Raising the emission level by $0.4\ \mathrm{km}$ lowers the emitting temperature by $2.6\ \mathrm{K}$, so
$$
\Delta F = \sigma\left[T_e^4 - (T_e - 2.6)^4\right] \approx 4\sigma T_e^3\times2.6 = 4\times5.67\times10^{-8}\times255.5^3\times2.6 = 9.8\ \mathrm{W\,m^{-2}}.
$$
That is three times the assessed value, so the real response must be weaker: the emission level rises only about $130\ \mathrm{m}$ in the bands that matter, and the stratosphere cools in the process, which offsets part of the forcing. The exercise is worth doing precisely because the naive number is wrong — it shows that "adding greenhouse gas raises the level from which the Earth radiates" is the right *picture* but a poor *calculator*.
:::
:::

::: exercise The pipeline {level=3}
The ocean mixed layer ($70\ \mathrm{m}$, $\rho = 1025\ \mathrm{kg\,m^{-3}}$, $c_p = 3990\ \mathrm{J\,kg^{-1}\,K^{-1}}$) has an areal heat capacity $C$. With a forcing of $2.72\ \mathrm{W\,m^{-2}}$ and no feedbacks or ocean uptake below the mixed layer, how long to warm $1\ ^\circ\mathrm{C}$? Why does the real ocean make the answer much longer?
::: solution
$C = 70\times1025\times3990 = 2.87\times10^{8}\ \mathrm{J\,m^{-2}\,K^{-1}}$. Then
$$
\Delta t = \frac{C\,\Delta T}{\Delta F} = \frac{2.87\times10^{8}}{2.72} = 1.06\times10^{8}\ \mathrm{s} = 3.3\ \mathrm{yr}.
$$
With feedbacks included ($|\lambda| = 1.04$) the equilibrium warming is larger and the timescale is $C|\lambda|/\Delta F$-limited at about a decade. The real ocean is not a $70\ \mathrm{m}$ skin: the wind-mixed and thermocline layers, and ultimately the whole $3700\ \mathrm{m}$, take up most of the excess heat, and the effective response time is set by the rate at which the interior is ventilated — decades to centuries. That is why the transient response ($1.1\ ^\circ\mathrm{C}$ so far) is well below the equilibrium one, and why the depth of the ocean is the single biggest reason humanity has more time than a mixed-layer calculation suggests, and less than the total heat capacity of the ocean would promise ([[climate-system/heat-transport]]).
:::
:::

::: exercise A planet with no rotation {level=3}
An airless planet in the same orbit as the Earth, with albedo $0.10$, rotates very slowly so that the surface is in local radiative balance (no horizontal or vertical heat transport). (a) Find the temperature at the sub-solar point. (b) Find the globally averaged emitted flux if the surface is a blackbody. (c) What does this say about the assumption used in [[#prop-ebm]]?
::: solution
(a) Balance at the sub-solar point: $\sigma T^4 = S_0(1-\alpha) = 1361\times0.90 = 1225\ \mathrm{W\,m^{-2}}$, so $T = (1225/\sigma)^{1/4} = 383\ \mathrm{K}$.
(b) Averaging $\sigma T^4$ over the sunlit hemisphere with $T(\theta) = T_\text{ss}\cos^{1/4}\theta$ gives $\overline{\sigma T^4} = \tfrac12\sigma T_\text{ss}^4 = 612\ \mathrm{W\,m^{-2}}$, equivalent to a uniform blackbody at $322\ \mathrm{K}$ — but the *mean temperature* is lower than that, because averaging $T \propto \cos^{1/4}\theta$ weights the cold night side heavily.
(c) The factor of $4$ in [[#prop-ebm]] assumes the emitted flux, not the temperature, is uniform. Real fast-rotating planets with atmospheres are close to that limit; slow, airless ones are not. The Moon's surface ranges from $390\ \mathrm{K}$ in sunlight to $100\ \mathrm{K}$ at night, and its globally averaged emitted flux still equals the absorbed one.
:::
:::
