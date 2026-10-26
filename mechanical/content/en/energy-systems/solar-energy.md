The sun delivers to the top of the atmosphere about $1361\,\mathrm{W}$ on every square metre facing it, and something like a thousand watts per square metre reaches the ground on a clear day at noon. That is a large flux by the standards of everyday life — the heat of a small electric fire on every square metre — but it is diffuse compared with the furnace of a boiler, it switches off every night, and it changes with season, latitude and weather. Solar engineering is therefore three problems in sequence: *how much* radiation reaches a surface of given orientation at a given place and time (geometry and the atmosphere), *how to collect it as heat* (solar thermal collectors and concentrators, where the second law limits how hot a receiver can get), and *how to convert it directly to electricity* (photovoltaic cells, where the band gap of a semiconductor limits the fraction of sunlight that can be used).

This chapter treats each in turn. It uses the blackbody radiation laws and view-factor ideas of [[heat-transfer/radiation]], the energy units and capacity factors of [[energy-systems/energy-overview]], and it prepares the ground for storage ([[energy-systems/energy-storage]]) and cost ([[energy-systems/energy-economics-emissions]]), which decide how much solar energy is actually used.

## Sunlight above the atmosphere {#sec-extraterrestrial}

The sun radiates very nearly as a blackbody at an effective temperature of about $5772\,\mathrm{K}$, with its peak, by Wien's law $\lambda_{\max}T = 2898\,\mu\mathrm{m\,K}$, at about $0.50\,\mu\mathrm{m}$ — green light. Some $37\,\%$ of a $5772\,\mathrm{K}$ blackbody's emission falls in the visible band ($0.4$–$0.7\,\mu\mathrm{m}$), most of the rest in the near infrared. At the earth's mean distance, $1.496\times10^{11}\,\mathrm{m}$, the radiation has spread over a sphere so large that the sun subtends only a small disc of angular radius $\theta_s = 0.267^\circ$.

::: definition Solar constant and extraterrestrial irradiance {#def-solar-constant}
**Irradiance** $G$ is radiant power per unit area ($\mathrm{W/m^2}$); **irradiation** $H$ is its time integral over a period, usually a day or a year ($\mathrm{MJ/m^2}$ or $\mathrm{kWh/m^2}$). The **solar constant** $G_{sc}$ is the irradiance on a surface normal to the sun's rays outside the atmosphere at the mean sun–earth distance. Satellite radiometry gives $G_{sc} = 1360.8 \pm 0.5\,\mathrm{W/m^2}$ at solar minimum (Kopp and Lean, 2011), and $1361\,\mathrm{W/m^2}$ is used here. Because the orbit is slightly elliptical, the extraterrestrial normal irradiance on day $n$ of the year is approximately
$$
G_{on} = G_{sc}\left[1 + 0.033\cos\left(\frac{360^\circ\,n}{365}\right)\right],
$$ {#eq-gon}
about $3.3\,\%$ above the mean in early January (perihelion) and below it in early July.
:::

::: example The solar constant from the sun's temperature {#ex-blackbody}
Treat the sun as a blackbody of radius $R_s = 6.957\times10^{8}\,\mathrm{m}$ and temperature $5772\,\mathrm{K}$ at distance $d = 1.496\times10^{11}\,\mathrm{m}$. Find (a) the emissive power at the sun's surface; (b) the irradiance at the earth's orbit; (c) the fraction of the sun's energy at wavelengths shorter than $1.107\,\mu\mathrm{m}$, the absorption edge of silicon.
::: solution
(a) Stefan–Boltzmann: $E_b = \sigma T^4 = 5.670\times10^{-8} \times 5772^4 = 6.29\times10^{7}\,\mathrm{W/m^2}$, i.e. $63\,\mathrm{MW/m^2}$.

(b) The total power $4\pi R_s^2 E_b$ is spread over a sphere of radius $d$, so
$$
G_{sc} = \sigma T^4\left(\frac{R_s}{d}\right)^2 = 6.29\times10^{7} \times \left(\frac{6.957\times10^{8}}{1.496\times10^{11}}\right)^2 = 6.29\times10^{7} \times 2.163\times10^{-5} = 1361\,\mathrm{W/m^2}.
$$
(c) Integrating Planck's distribution numerically from $\lambda = 0$ to $1.107\,\mu\mathrm{m}$ (equivalently $\lambda T = 6390\,\mu\mathrm{m\,K}$ in the tables of the blackbody fraction function in [[heat-transfer/radiation]]) gives $F_{0-\lambda T} = 0.77$.

Sanity check: the agreement with the measured $1361\,\mathrm{W/m^2}$ is no accident — the sun's "effective temperature" is *defined* by it. Part (c) says that $23\,\%$ of sunlight has too little photon energy to be absorbed by silicon at all, the first of the losses that bound photovoltaic efficiency.
:::
:::

## Through the atmosphere {#sec-atmosphere}

On its way to the ground, sunlight is absorbed (by ozone in the ultraviolet, by water vapour and carbon dioxide in infrared bands) and scattered (by molecules, which scatter blue light preferentially, and by aerosols and cloud droplets). What arrives at the surface is the **beam** (direct) radiation, coming straight from the sun's disc, plus **diffuse** radiation scattered towards the surface from the whole sky. Their sum on a horizontal surface is the **global horizontal irradiance**. On a clear day with the sun high, beam radiation dominates and the global irradiance approaches $1000\,\mathrm{W/m^2}$; under overcast skies the radiation is almost all diffuse and may be $100\,\mathrm{W/m^2}$ or less.

The path length through the atmosphere is measured by the **air mass**, the ratio of the actual path to the path with the sun overhead. For a plane-parallel atmosphere and zenith angle $\theta_z$,
$$
AM = \frac{1}{\cos\theta_z},
$$ {#eq-airmass}
adequate up to $\theta_z \approx 70^\circ$ (beyond that the earth's curvature matters). AM0 denotes outside the atmosphere. **Standard test conditions** (STC) for photovoltaic modules, defined in IEC 60904, are an irradiance of $1000\,\mathrm{W/m^2}$ with the AM1.5 global spectrum ($\theta_z = 48.2^\circ$) and a cell temperature of $25\,^\circ\mathrm{C}$. The "peak" rating of a module ($\mathrm{W_p}$) is its power at STC.

Over a day or a month, the ratio of the irradiation measured on a horizontal surface, $H$, to the extraterrestrial value $H_0$ on a horizontal surface is the **clearness index** $K_T = H/H_0$. It ranges from about $0.7$–$0.75$ in clear desert climates to $0.3$ or less in cloudy winter months, and correlations in terms of $K_T$ (for example those collected by Duffie, Beckman and Blair) split the global irradiation into its beam and diffuse parts. As rough orders of magnitude, annual global horizontal irradiation is about $900$–$1200\,\mathrm{kWh/m^2}$ in north-west Europe and $2000$–$2500\,\mathrm{kWh/m^2}$ in the sunniest deserts — a factor of about two and a half, much smaller than the variation of wind power between sites.

## The geometry of the sun's position {#sec-geometry}

To predict the radiation on a collector we need the angle between the sun's rays and the collector's normal. Three angles fix the sun's direction from a point on the earth: the **latitude** $\phi$ (north positive), the **declination** $\delta$ — the latitude at which the sun is overhead at solar noon, varying between $\pm 23.45^\circ$ over the year — and the **hour angle** $\omega$, the angle through which the earth has turned since solar noon, $15^\circ$ per hour, negative in the morning and positive in the afternoon. Solar time differs from clock time by the longitude offset from the time-zone meridian and by the equation of time (up to about $16$ minutes).

The declination is given closely enough for engineering by Cooper's formula (1969),
$$
\delta = 23.45^\circ \sin\left(360^\circ\,\frac{284 + n}{365}\right),
$$ {#eq-cooper}
where $n$ is the day of the year ($n = 1$ on 1 January).

::: proposition Zenith angle, sunset hour angle and incidence on a tilted surface {#prop-zenith}
At latitude $\phi$, declination $\delta$ and hour angle $\omega$, the solar zenith angle $\theta_z$ (between the sun's rays and the vertical) satisfies
$$
\cos\theta_z = \sin\phi\sin\delta + \cos\phi\cos\delta\cos\omega ,
$$ {#eq-zenith}
the solar altitude is $\alpha_s = 90^\circ - \theta_z$, and the sun sets at the hour angle $\omega_s$ with
$$
\cos\omega_s = -\tan\phi\tan\delta ,
$$ {#eq-sunset}
so the day length is $2\omega_s/15^\circ$ hours. For a surface in the northern hemisphere facing due south and tilted at $\beta$ to the horizontal, the angle of incidence $\theta$ of the beam satisfies
$$
\cos\theta = \sin(\phi - \beta)\sin\delta + \cos(\phi - \beta)\cos\delta\cos\omega .
$$ {#eq-tilt}
:::

::: proof
Use an earth-centred frame with the $z$-axis along the polar axis, and the $x$-axis in the plane of the local meridian of the site at the instant considered. Neglect the earth's size compared with the sun's distance, so the rays are parallel everywhere. The unit vector to the sun has polar elevation $\delta$ (by definition of declination) and is rotated from the local meridian by the hour angle $\omega$:
$$
\mathbf{s} = (\cos\delta\cos\omega,\ \cos\delta\sin\omega,\ \sin\delta).
$$
The local vertical at latitude $\phi$ lies in the meridian plane: $\mathbf{n} = (\cos\phi,\ 0,\ \sin\phi)$. Then $\cos\theta_z = \mathbf{n}\cdot\mathbf{s}$, which is [[#eq-zenith]]. Sunset is $\theta_z = 90^\circ$, i.e. $\cos\theta_z = 0$, giving $\cos\omega_s = -\sin\phi\sin\delta/(\cos\phi\cos\delta) = -\tan\phi\tan\delta$ (if the right-hand side is below $-1$ the sun never sets; above $1$ it never rises). For the tilted surface: tilting a south-facing plane by $\beta$ towards the equator makes its normal point along the vertical of a site on the same meridian at latitude $\phi - \beta$. The normal is therefore $(\cos(\phi-\beta), 0, \sin(\phi-\beta))$, and the same dot product gives [[#eq-tilt]].
:::

::: proposition Daily extraterrestrial irradiation on a horizontal surface {#prop-h0}
Neglecting the change of declination during one day, the extraterrestrial irradiation on a horizontal surface from sunrise to sunset is
$$
H_0 = \frac{24 \times 3600\,\mathrm{s}}{\pi}\,G_{on}\left(\cos\phi\cos\delta\sin\omega_s + \omega_s\sin\phi\sin\delta\right),
$$ {#eq-h0}
with $\omega_s$ in radians.
:::

::: proof
The irradiance on a horizontal plane outside the atmosphere is $G_{on}\cos\theta_z$ while the sun is up. The hour angle advances uniformly at $2\pi$ radians per $86\,400\,\mathrm{s}$, so $dt = (86\,400/2\pi)\,d\omega$. Integrating [[#eq-zenith]] from $-\omega_s$ to $\omega_s$ with $\phi$, $\delta$ and $G_{on}$ held constant,
$$
H_0 = \frac{86\,400}{2\pi}G_{on}\int_{-\omega_s}^{\omega_s}\left(\sin\phi\sin\delta + \cos\phi\cos\delta\cos\omega\right)d\omega = \frac{86\,400}{2\pi}G_{on}\left(2\omega_s\sin\phi\sin\delta + 2\cos\phi\cos\delta\sin\omega_s\right),
$$
which is [[#eq-h0]]. Limiting check: at the equator at an equinox, $\phi = \delta = 0$ and $\omega_s = \pi/2$, so $H_0 = (86\,400/\pi)G_{on} = 37.4\,\mathrm{MJ/m^2}$ for $G_{on} = 1361\,\mathrm{W/m^2}$ — the full-sun value multiplied by an effective $1/\pi$ of the day, as expected from averaging $\cos\omega$ over the daylit half.
:::

::: widget plot
f: 24*3600/pi*1361*(1+0.033*cos(2*pi*x/365))*(cos(L*pi/180)*cos(0.40928*sin(2*pi*(284+x)/365))*sin(acos(clamp(-tan(L*pi/180)*tan(0.40928*sin(2*pi*(284+x)/365)),-1,1)))+acos(clamp(-tan(L*pi/180)*tan(0.40928*sin(2*pi*(284+x)/365)),-1,1))*sin(L*pi/180)*sin(0.40928*sin(2*pi*(284+x)/365)))/1000000
x: 1, 365
y: 0, 48
sliders: L=40:0:89:1
labels: H_0\ (\mathrm{MJ/m^2\ per\ day})
caption: Daily extraterrestrial irradiation on a horizontal surface, from [[#eq-h0]] with Cooper's declination, against day of the year, for latitude $L$ (degrees north). At $L = 0$ the curve is nearly flat with two shallow peaks at the equinoxes. Move to $40^\circ$: summer days receive three times as much as winter days. At $52^\circ$ (London, Berlin) the ratio is nearly seven. Beyond the Arctic Circle ($66.6^\circ$) the winter value drops to zero (polar night), while near the June solstice the high latitudes receive *more* than the equator, because the sun never sets. The atmosphere then removes a further 25–70 % depending on the weather.
:::

::: example Sun position and daily irradiation at 40° N {#ex-sun-position}
For a site at latitude $40^\circ\,\mathrm{N}$ on 21 June ($n = 172$), find (a) the declination; (b) the solar zenith angle and altitude at 10:00 solar time; (c) the angle of incidence at that time on a south-facing panel tilted at $30^\circ$; (d) the day length and the extraterrestrial daily irradiation $H_0$.
::: solution
(a) Cooper: $\delta = 23.45\sin(360 \times 456/365) = 23.45^\circ$ (the solstice).

(b) At 10:00 solar time $\omega = -30^\circ$. By [[#eq-zenith]],
$$
\cos\theta_z = \sin 40^\circ\sin 23.45^\circ + \cos 40^\circ\cos 23.45^\circ\cos 30^\circ = 0.2559 + 0.6085 = 0.8644,
$$
so $\theta_z = 30.2^\circ$ and the altitude is $59.8^\circ$.

(c) With $\phi - \beta = 10^\circ$ in [[#eq-tilt]]: $\cos\theta = \sin 10^\circ\sin 23.45^\circ + \cos 10^\circ\cos 23.45^\circ\cos 30^\circ = 0.0691 + 0.7824 = 0.8515$, so $\theta = 31.6^\circ$. In midsummer a $30^\circ$ tilt is slightly worse than horizontal at this hour; the tilt pays off in spring, autumn and winter.

(d) $\cos\omega_s = -\tan 40^\circ\tan 23.45^\circ = -0.3640$, so $\omega_s = 111.3^\circ = 1.943\,\mathrm{rad}$; day length $2 \times 111.3/15 = 14.8\,\mathrm{h}$. With $G_{on} = 1361[1 + 0.033\cos(360 \times 172/365)] = 1316\,\mathrm{W/m^2}$,
$$
H_0 = \frac{86\,400}{\pi} \times 1316 \times \left(0.7660 \times 0.9174 \times 0.9315 + 1.943 \times 0.6428 \times 0.3979\right) = 41.7\,\mathrm{MJ/m^2} = 11.6\,\mathrm{kWh/m^2}.
$$
Sanity check: a clear June day at this latitude delivers about $8$–$9\,\mathrm{kWh/m^2}$ on the ground, i.e. $K_T \approx 0.7$ — consistent. Note that $G_{on}$ is $3\,\%$ *below* $G_{sc}$ in June because the earth is near aphelion; the northern summer is warm because of the sun's altitude and the day length, not distance.
:::
:::

::: warning Irradiance, irradiation and peak power
Three quantities are routinely confused. **Irradiance** ($\mathrm{W/m^2}$) is a rate; **irradiation** ($\mathrm{kWh/m^2}$ per day or year) is an amount; a module's **peak power** ($\mathrm{W_p}$ or $\mathrm{kW_p}$) is its rating at $1000\,\mathrm{W/m^2}$, not what it produces on average. A "$5\,\mathrm{kW}$" rooftop system in central Europe averages about $0.5\,\mathrm{kW}$ over the year. Two further traps: angles in [[#eq-zenith]] and [[#eq-h0]] are in degrees inside the trigonometric functions but $\omega_s$ multiplying $\sin\phi\sin\delta$ must be in **radians**; and the hour angle is **solar** time, not clock time — using clock time in summer (daylight saving) shifts solar noon by an hour or more.
:::

## Solar thermal collectors {#sec-collectors}

A **flat-plate collector** is a black absorber plate, usually copper or aluminium with a spectrally selective coating (high absorptance for sunlight, low emittance in the infrared), bonded to tubes carrying water or an antifreeze mixture, under one or two glass covers in an insulated box. Sunlight passes through the glass and is absorbed; the glass, opaque to the long-wave infrared emitted by the warm plate, and the still air gap reduce the losses. **Evacuated-tube** collectors remove the air altogether, cutting convection losses so that they work well at higher temperatures or in cold weather.

The steady energy balance of the absorber is simple: absorbed solar radiation in, heat losses to the surroundings out, the difference carried away by the fluid. Per unit collector area $A_c$, the absorbed radiation is $S = (\tau\alpha)G_T$, where $G_T$ is the irradiance in the collector plane and $(\tau\alpha)$ the transmittance–absorptance product of cover and plate (about $0.8$ for good glazed collectors at near-normal incidence). The losses through the top, back and edges are lumped into an overall loss coefficient $U_L$ ($\mathrm{W/m^2K}$) multiplying the difference between the mean plate temperature and the ambient temperature. The awkward part is that the plate temperature is not known; the inlet fluid temperature is. The Hottel–Whillier–Bliss equation solves that.

::: proposition The Hottel–Whillier–Bliss equation {#prop-hwb}
A collector of area $A_c$, absorbed radiation $S$ per unit area, loss coefficient $U_L$ and collector efficiency factor $F'$ heats fluid of mass flow $\dot m$ and specific heat $c_p$ entering at $T_i$, with ambient temperature $T_a$. The useful heat gain is
$$
\dot Q_u = A_c F_R\left[S - U_L(T_i - T_a)\right],
\qquad
F_R = \frac{\dot m c_p}{A_c U_L}\left[1 - \exp\left(-\frac{A_c U_L F'}{\dot m c_p}\right)\right],
$$ {#eq-hwb}
where $F_R$ ($< F' < 1$) is the **heat removal factor**. The instantaneous efficiency $\eta = \dot Q_u/(A_c G_T)$ is linear in $(T_i - T_a)/G_T$:
$$
\eta = F_R(\tau\alpha) - F_R U_L\,\frac{T_i - T_a}{G_T}.
$$ {#eq-collector-eff}
:::

::: proof
Assumptions: steady state; $U_L$, $S$ and $F'$ uniform over the collector; properties constant; flow along the tubes in the $y$ direction over a length $L$, with total width $W$ so that $A_c = WL$. The factor $F'$, derived from the fin analysis of the plate between tubes and the bond and tube-wall resistances (Duffie, Beckman and Blair, ch. 6), is the ratio of the actual gain to the gain if the whole plate were at the local fluid temperature $T_f$; so the heat gained per unit length of flow path is $W F'[S - U_L(T_f - T_a)]$.

An energy balance on the fluid between $y$ and $y + dy$ gives
$$
\dot m c_p\,\frac{dT_f}{dy} = W F'\left[S - U_L(T_f - T_a)\right].
$$
Let $\theta = T_f - T_a - S/U_L$; then $d\theta/dy = -(W F' U_L/\dot m c_p)\,\theta$, so $\theta$ decays exponentially and at the outlet
$$
\frac{\theta_o}{\theta_i} = \exp\left(-\frac{A_c U_L F'}{\dot m c_p}\right).
$$
The useful gain is $\dot Q_u = \dot m c_p(T_o - T_i) = \dot m c_p(\theta_o - \theta_i) = -\dot m c_p\theta_i\left[1 - \exp(-A_cU_LF'/\dot m c_p)\right]$. Since $-\theta_i = [S - U_L(T_i - T_a)]/U_L$, this is [[#eq-hwb]]. Dividing by $A_c G_T$ and using $S = (\tau\alpha)G_T$ gives [[#eq-collector-eff]].

Limiting cases: as $\dot m \to \infty$ the exponential expands to $1 - A_cU_LF'/\dot mc_p$ and $F_R \to F'$ (the fluid barely warms, so the whole plate is near $T_i$); as $\dot m \to 0$, $F_R \to 0$ (the fluid leaves at the stagnation temperature and carries little heat).
:::

The efficiency line [[#eq-collector-eff]] is how collectors are tested and compared (the standard test, ISO 9806, fits it — usually with an added quadratic term — to measured points). Its intercept $F_R(\tau\alpha)$ is the optical efficiency, reached when the fluid enters at ambient temperature; its slope $F_RU_L$ measures the losses. The line meets zero at the **stagnation** condition $T_i - T_a = S/U_L$, the temperature an empty collector reaches in full sun — well above $100\,^\circ\mathrm{C}$ for good glazed collectors, which is why systems need protection against boiling.

::: widget plot
f: max(a - b*x, 0); max(0.90 - 15*x, 0); max(0.65 - 1.5*x, 0)
x: 0, 0.2
y: 0, 1
sliders: a=0.75:0.5:0.9:0.01; b=4.5:1:20:0.5
labels: \text{glazed flat plate (sliders)}; \text{unglazed (illustrative)}; \text{evacuated tube (illustrative)}
caption: Collector efficiency against the reduced temperature $(T_i - T_a)/G_T$ in $\mathrm{m^2K/W}$, from [[#eq-collector-eff]]; the slider curve has intercept $a = F_R(\tau\alpha)$ and slope $b = F_RU_L$ (W/m²K), and the two fixed curves use illustrative values typical of an unglazed swimming-pool absorber and an evacuated-tube collector. With the default sliders the unglazed absorber is best below about $0.014$ (pool heating in summer), the glazed flat plate between about $0.014$ and $0.033$ (domestic hot water in mild weather), and the evacuated tube above that; at $0.1$ and beyond (process heat, winter) only the evacuated tube still collects useful heat. The right choice depends on the operating temperature, not on the peak efficiency.
:::

::: example Output of a domestic hot-water collector {#ex-collector}
A glazed collector of area $2.0\,\mathrm{m^2}$ has $(\tau\alpha) = 0.80$, $U_L = 5.0\,\mathrm{W/m^2K}$ and $F' = 0.92$. Water ($c_p = 4180\,\mathrm{J/kg\,K}$) flows at $0.030\,\mathrm{kg/s}$ and enters at $40\,^\circ\mathrm{C}$; the ambient temperature is $20\,^\circ\mathrm{C}$ and the plane-of-collector irradiance $800\,\mathrm{W/m^2}$. Find $F_R$, the useful gain, the efficiency and the outlet temperature.
::: solution
Absorbed radiation $S = 0.80 \times 800 = 640\,\mathrm{W/m^2}$. Capacity rate $\dot mc_p = 0.030 \times 4180 = 125.4\,\mathrm{W/K}$; $A_cU_LF'/\dot mc_p = 2.0 \times 5.0 \times 0.92/125.4 = 0.0734$. By [[#eq-hwb]],
$$
F_R = \frac{125.4}{2.0 \times 5.0}\left(1 - e^{-0.0734}\right) = 12.54 \times 0.0707 = 0.887 .
$$
Useful gain: $\dot Q_u = 2.0 \times 0.887 \times [640 - 5.0 \times (40 - 20)] = 2.0 \times 0.887 \times 540 = 958\,\mathrm{W}$.

Efficiency: $\eta = 958/(2.0 \times 800) = 0.599$. Outlet: $T_o = 40 + 958/125.4 = 47.6\,^\circ\mathrm{C}$.

Sanity check: from [[#eq-collector-eff]], $F_R(\tau\alpha) = 0.710$ and $F_RU_L = 4.44\,\mathrm{W/m^2K}$, so $\eta = 0.710 - 4.44 \times 20/800 = 0.599$ — the same. The stagnation temperature excess is $S/U_L = 128\,\mathrm{K}$, i.e. about $148\,^\circ\mathrm{C}$ with no flow.
:::
:::

### Concentrating collectors

To run a heat engine at a useful temperature — the steam turbines of [[energy-systems/steam-power-plants]] need several hundred degrees — the losses of a flat plate are far too large: at $400\,^\circ\mathrm{C}$ its loss $U_L\Delta T$ would exceed the whole solar input. The answer is to collect sunlight over a large **aperture** $A_a$ with mirrors or lenses and focus it on a small **receiver** $A_r$, so that the losses, which scale with $A_r$, are small compared with the gain, which scales with $A_a$. The **concentration ratio** is $C = A_a/A_r$. Parabolic troughs (line focus, $C$ of order $50$–$100$) and solar towers with heliostat fields (point focus, $C$ in the hundreds to over a thousand) are the commercial forms of concentrating solar power.

::: proposition Thermodynamic limit of concentration {#prop-concentration}
For radiation from a source of angular radius $\theta_s$ concentrated in air (refractive index $1$), the concentration ratio cannot exceed
$$
C_{\max,3D} = \frac{1}{\sin^2\theta_s} \quad\text{(point focus)}, \qquad C_{\max,2D} = \frac{1}{\sin\theta_s} \quad\text{(line focus)}.
$$
For the sun, $\theta_s = 0.267^\circ$, so $C_{\max,3D} \approx 46\,000$ and $C_{\max,2D} \approx 215$. Diffuse radiation, which arrives from the whole hemisphere ($\theta_s = 90^\circ$), cannot be concentrated at all.
:::

::: proof
Assume the sun is a black disc at temperature $T_s$, the optics are lossless and the receiver is black. The power reaching the aperture is $A_a G = A_a\sigma T_s^4 (R_s/d)^2 = A_a\sigma T_s^4\sin^2\theta_s$ (the result of [[#ex-blackbody]], with $\sin\theta_s = R_s/d$). Ideal optics deliver all of it to the receiver: absorbed power $C A_r\sigma T_s^4\sin^2\theta_s$. Now suppose the receiver were at $T_s$. It emits $A_r\sigma T_s^4$ in total, and at most all of that can return to the sun. The second law forbids net heat flow from the sun to a receiver at the same temperature, so the absorbed power must not exceed the power the receiver can send back:
$$
C A_r\sigma T_s^4\sin^2\theta_s \le A_r\sigma T_s^4 \quad\Longrightarrow\quad C \le \frac{1}{\sin^2\theta_s}.
$$
If $C$ were larger, the receiver would heat above $T_s$ with nothing but radiation from the sun — a perpetual motion of the second kind. The line-focus case repeats the argument per unit length, with the sun's angular width $2\theta_s$ in one plane only, giving $1/\sin\theta_s$. For diffuse light the "source" fills the hemisphere, $\sin\theta_s = 1$ and $C \le 1$. (The general statement is conservation of étendue; see Duffie, Beckman and Blair.)
:::

The consequence for engineering is that concentrators collect only the **beam** component and must track the sun, so they are built only where direct normal irradiance is high and reliable — deserts, typically with $2000\,\mathrm{kWh/m^2}$ or more of direct normal irradiation a year. Flat plates and photovoltaic panels, which use diffuse light as well, work in cloudier climates.

## Photovoltaic conversion {#sec-pv}

A photovoltaic cell is a semiconductor junction. A photon with energy above the **band gap** $E_g$ (1.12 eV for silicon) lifts an electron from the valence band to the conduction band, leaving a hole. The built-in electric field of the p–n junction separates electrons and holes before they recombine, driving a current through an external circuit. Two losses follow directly from the band gap. Photons with energy below $E_g$ pass through unabsorbed (the $23\,\%$ of [[#ex-blackbody]] for silicon); photons with energy above $E_g$ are absorbed, but the excess energy is lost as heat within picoseconds as the carriers relax to the band edges (**thermalisation**). A low gap wastes the blue end of the spectrum, a high gap the red end, and the best single gap is a compromise.

Electrically, an illuminated cell behaves as a current source in parallel with a diode.

::: definition Single-diode model, short-circuit current, open-circuit voltage and fill factor {#def-pv}
In the ideal single-diode model the terminal current $I$ at voltage $V$ is
$$
I = I_L - I_0\left[\exp\left(\frac{V}{nV_T}\right) - 1\right],
$$ {#eq-diode}
where $I_L$ is the light-generated current (proportional to irradiance), $I_0$ the diode saturation current (strongly temperature dependent), $n$ the ideality factor ($1$–$2$) and $V_T = k_BT/q$ the thermal voltage ($25.69\,\mathrm{mV}$ at $25\,^\circ\mathrm{C}$). The **short-circuit current** is $I_{sc} = I_L$; the **open-circuit voltage** (at $I = 0$) is
$$
V_{oc} = nV_T\ln\left(\frac{I_L}{I_0} + 1\right).
$$
The **maximum power point** $(V_m, I_m)$ maximises $P = VI$; the **fill factor** is $FF = V_mI_m/(V_{oc}I_{sc})$, and the cell efficiency is $\eta = V_mI_m/(GA)$ for irradiance $G$ on cell area $A$. Real cells add a series resistance and a shunt resistance, which lower the fill factor.
:::

::: proposition Maximum power point of the ideal cell {#prop-mpp}
For the cell of [[#eq-diode]], let $x = V_m/(nV_T)$. Then $x$ is the root of
$$
(1 + x)\,e^{x} = 1 + \frac{I_L}{I_0},
$$ {#eq-mpp}
and $I_m = (I_L + I_0)\,x/(1 + x) \approx I_L\,x/(1+x)$.
:::

::: proof
$P(V) = VI(V)$, so at the maximum $dP/dV = I + V\,dI/dV = 0$. From [[#eq-diode]], $dI/dV = -(I_0/nV_T)e^{V/nV_T}$. Substituting $V = xnV_T$:
$$
I_L - I_0(e^{x} - 1) - x I_0 e^{x} = 0 \quad\Longrightarrow\quad (1 + x)e^{x} = 1 + \frac{I_L}{I_0}.
$$
The left side increases monotonically from $1$ at $x = 0$, so there is exactly one root, and $d^2P/dV^2 = 2\,dI/dV + V\,d^2I/dV^2 < 0$ (both terms negative for $V > 0$) confirms a maximum. Then $I_m = I_L + I_0 - I_0e^{x} = I_0 x e^{x}$, and using the root equation $I_0 e^{x} = (I_L + I_0)/(1 + x)$ gives $I_m = (I_L + I_0)x/(1 + x)$. Since $I_L/I_0$ is of order $10^{10}$–$10^{13}$, $x$ is about $20$–$30$, so $V_m$ sits a few $nV_T$ below $V_{oc}$ and $I_m$ a few per cent below $I_{sc}$ — which is why ideal fill factors exceed $0.8$.
:::

::: widget plot
f: S*10 - 1e-11*((T+273.15)/298.15)^3*exp(12997*(1/298.15-1/(T+273.15)))*(exp(x/(0.00008617*(T+273.15)))-1); x*(S*10 - 1e-11*((T+273.15)/298.15)^3*exp(12997*(1/298.15-1/(T+273.15)))*(exp(x/(0.00008617*(T+273.15)))-1))
x: 0, 0.8
y: 0, 13
sliders: S=1:0.1:1.2:0.05; T=25:0:80:1
labels: I\ (\mathrm{A}); P = VI\ (\mathrm{W})
caption: Current–voltage and power–voltage curves of an ideal silicon cell ($I_{sc} = 10\,\mathrm{A}$ at one sun, $I_0 = 10^{-11}\,\mathrm{A}$ at $25\,^\circ\mathrm{C}$, $n = 1$, $I_0 \propto T^3 e^{-E_g/k_BT}$ with $E_g = 1.12\,\mathrm{eV}$) against voltage (V), for irradiance $S$ in suns and cell temperature $T$ in °C. The power curve peaks at the knee of the $I$–$V$ curve, at about $0.63\,\mathrm{V}$ and $6.0\,\mathrm{W}$ at STC. Lower $S$: the current falls in proportion but the voltage only logarithmically, so efficiency holds up well in weak light. Raise $T$ to $60\,^\circ\mathrm{C}$: $V_{oc}$ falls by about $58\,\mathrm{mV}$ ($-1.65\,\mathrm{mV/K}$) and the maximum power by about $11\,\%$ — roughly $-0.3\,\%/\mathrm{K}$, the temperature coefficient printed on module data sheets.
:::

::: example Maximum power point of a cell {#ex-mpp}
A cell has $I_L = 10.0\,\mathrm{A}$, $I_0 = 1.0\times10^{-11}\,\mathrm{A}$ and $n = 1$ at $25\,^\circ\mathrm{C}$. Find $V_{oc}$, the maximum power point, the fill factor and the efficiency if the cell area is $0.0243\,\mathrm{m^2}$ (a $156\,\mathrm{mm}$ square cell) at $1000\,\mathrm{W/m^2}$.
::: solution
$V_T = 1.381\times10^{-23} \times 298.15/1.602\times10^{-19} = 0.02569\,\mathrm{V}$. Then $V_{oc} = 0.02569\ln(10^{12} + 1) = 0.02569 \times 27.63 = 0.710\,\mathrm{V}$.

Maximum power point from [[#eq-mpp]]: solve $x + \ln(1 + x) = \ln(10^{12} + 1) = 27.631$ by Newton's method or iteration: $x = 27.631 - \ln(1 + x)$; starting from $x = 24$, $x = 27.631 - \ln 25 = 24.412$, then $27.631 - \ln 25.412 = 24.396$, converged at $x = 24.396$. So
$$
V_m = 24.396 \times 0.02569 = 0.627\,\mathrm{V}, \qquad I_m = 10.0 \times \frac{24.396}{25.396} = 9.61\,\mathrm{A}, \qquad P_m = 6.02\,\mathrm{W}.
$$
Fill factor $FF = 6.02/(0.710 \times 10.0) = 0.848$. Efficiency $\eta = 6.02/(1000 \times 0.0243) = 0.248$.

Sanity check: commercial silicon cells have $V_{oc}$ of about $0.70$–$0.74\,\mathrm{V}$ and fill factors of $0.80$–$0.85$, so the ideal model with these parameters is close to a good modern cell; real cells lose a little more to series resistance.
:::
:::

### Limits and records

Combining the spectrum, the band gap and the unavoidable radiative recombination required by detailed balance, Shockley and Queisser (1961) showed that a single-junction cell has a maximum efficiency that depends only on its band gap and the incident spectrum. Recalculated for the AM1.5 global spectrum, the limit peaks at about $33.7\,\%$ for a gap near $1.34\,\mathrm{eV}$ (Rühle, 2016); for silicon, including Auger recombination, which is intrinsic to its indirect gap, the limit is about $29.4\,\%$ (Richter and co-workers, 2013). Laboratory silicon cells are now close: in April 2025 LONGi reported a back-contact silicon cell certified by ISFH at $27.81\,\%$. Commercial modules are less efficient than their best cells because of gaps between cells, glass reflection and wiring, typically around $20$–$23\,\%$ for mainstream silicon modules in the mid-2020s. Multi-junction cells, which stack gaps so that each absorbs part of the spectrum, escape the single-junction limit and exceed $40\,\%$ under concentration, but at a cost that confines them to space and concentrator use.

### Modules in the field

Cells are connected in series in a **module** to raise the voltage, modules in series **strings**, and strings feed an **inverter** that tracks the maximum power point and converts to alternating current. In the field, three things lower the output below the STC rating: irradiance is usually below $1000\,\mathrm{W/m^2}$; the cells run hotter than $25\,^\circ\mathrm{C}$; and there are losses in wiring, inverters, soiling, shading and mismatch between modules. Cell temperature is estimated from the **nominal operating cell temperature** (NOCT, the cell temperature measured at $800\,\mathrm{W/m^2}$, $20\,^\circ\mathrm{C}$ ambient and $1\,\mathrm{m/s}$ wind, typically $42$–$48\,^\circ\mathrm{C}$):
$$
T_c \approx T_a + \frac{\mathrm{NOCT} - 20\,^\circ\mathrm{C}}{800\,\mathrm{W/m^2}}\,G_T ,
$$ {#eq-noct}
and the power is corrected linearly with the temperature coefficient $\gamma$ (about $-0.3$ to $-0.4\,\%/\mathrm{K}$ for crystalline silicon):
$$
P \approx P_\text{STC}\,\frac{G_T}{1000\,\mathrm{W/m^2}}\left[1 + \gamma(T_c - 25\,^\circ\mathrm{C})\right].
$$ {#eq-pv-temp}
These are approximations from module data sheets, adequate for estimates; detailed simulation tools use fuller models.

::: algorithm Estimating the annual energy of a PV system {#alg-pv-yield}
1. Find the annual irradiation in the plane of the array, $H_T$ ($\mathrm{kWh/m^2}$ per year), from a solar atlas or a typical-meteorological-year dataset for the site, with the chosen tilt and orientation (a tilt near the latitude roughly maximises it for fixed arrays; trackers add more).
2. Divide by the STC irradiance $1\,\mathrm{kW/m^2}$: $H_T/(1\,\mathrm{kW/m^2})$ is the number of **peak-sun hours** per year.
3. Choose a **performance ratio** $PR$ — the ratio of actual energy to the energy the array would produce if it always converted at its STC efficiency — accounting for temperature, low-light, wiring, inverter, soiling and availability losses; well-designed systems achieve about $0.75$–$0.85$.
4. Annual energy $E = P_\text{STC} \times (H_T/1\,\mathrm{kW/m^2}) \times PR$. The **specific yield** $E/P_\text{STC}$ (kWh per kWp) compares sites and systems; the capacity factor is $E/(P_\text{STC} \times 8760\,\mathrm{h})$.
:::

::: example A module on a hot day and a rooftop's annual energy {#ex-pv-system}
(a) A $400\,\mathrm{W_p}$ module has NOCT $45\,^\circ\mathrm{C}$ and $\gamma = -0.35\,\%/\mathrm{K}$. Estimate its output at $1000\,\mathrm{W/m^2}$ with an ambient temperature of $35\,^\circ\mathrm{C}$. (b) A $5.0\,\mathrm{kW_p}$ rooftop array of $21\,\%$-efficient modules receives $1200\,\mathrm{kWh/m^2}$ a year in its plane. With $PR = 0.80$, estimate the annual energy, the specific yield, the capacity factor and the module area.
::: solution
(a) By [[#eq-noct]], $T_c = 35 + (45 - 20)/800 \times 1000 = 66.3\,^\circ\mathrm{C}$. By [[#eq-pv-temp]], $P = 400 \times 1.0 \times [1 - 0.0035 \times 41.25] = 400 \times 0.856 = 342\,\mathrm{W}$ — $14\,\%$ below the rating even in full sun.

(b) Peak-sun hours $= 1200\,\mathrm{h}$. Annual energy $E = 5.0 \times 1200 \times 0.80 = 4800\,\mathrm{kWh}$. Specific yield $= 960\,\mathrm{kWh/kW_p}$. Capacity factor $= 4800/(5.0 \times 8760) = 0.110$. Module area $= 5.0\,\mathrm{kW}/(0.21 \times 1\,\mathrm{kW/m^2}) = 23.8\,\mathrm{m^2}$.

Sanity check: $4800\,\mathrm{kWh}$ a year is about the electricity use of a typical European household ([[energy-systems/energy-overview]]), but most of it arrives in summer middays, when the household uses least — the case for storage in [[energy-systems/energy-storage]]. A capacity factor of $0.11$ is typical of fixed rooftop PV in central Europe.
:::
:::

::: quiz
A solar tower designer wants a receiver at $1000\,^\circ\mathrm{C}$ and asks whether a site with a high global irradiance but frequent thin cloud is suitable. What is the key consideration?
- [ ] Concentrators can use any light that reaches the ground, so global irradiance is what matters.
- [x] Concentrators can only focus the beam (direct) component; diffuse light cannot be concentrated, so the direct normal irradiance must be high.
- [ ] Concentration is unlimited, so thin cloud can be compensated by more mirrors.
- [ ] The receiver temperature depends only on the mirror area, not on the type of radiation.
::: solution
By [[#prop-concentration]], light arriving from a wide range of directions cannot be concentrated; diffuse radiation from a hazy sky passes the mirrors but misses the receiver. Concentrating plants are sited by direct normal irradiance. Concentration is bounded by $1/\sin^2\theta_s$, and the receiver temperature depends on the concentrated flux, which only beam radiation provides.
:::
:::

::: history
In 1839 the nineteen-year-old Edmond **Becquerel**, working in his father's laboratory in Paris, observed that light falling on an electrode in an electrolyte produced a current — the first observation of the photovoltaic effect. The first practical cell came from Bell Telephone Laboratories, where Daryl **Chapin**, Calvin **Fuller** and Gerald **Pearson** demonstrated a silicon p–n junction cell in April 1954 with an efficiency of about $6\,\%$, intended to power remote telephone equipment. In March 1958 *Vanguard 1* became the first satellite powered by solar cells, and space, where cost mattered less than mass and reliability, sustained the technology for two decades. In 1961 William **Shockley** and Hans-Joachim **Queisser** published the detailed-balance limit of single-junction efficiency in the *Journal of Applied Physics*. On the thermal side, Hoyt **Hottel** and Austin **Whillier** at MIT published their analysis of flat-plate collector performance in 1958, and Raymond **Bliss** extended it with plate-efficiency factors in *Solar Energy* in 1959, giving the equation that bears their three names and is still the basis of collector testing.
:::

::: summary
- The solar constant is about $1361\,\mathrm{W/m^2}$ (the sun as a $5772\,\mathrm{K}$ blackbody); on the ground clear-sky irradiance approaches $1000\,\mathrm{W/m^2}$, made up of beam and diffuse parts.
- Air mass $1/\cos\theta_z$ measures the atmospheric path; PV ratings are at STC: $1000\,\mathrm{W/m^2}$, AM1.5, $25\,^\circ\mathrm{C}$.
- $\cos\theta_z = \sin\phi\sin\delta + \cos\phi\cos\delta\cos\omega$; replacing $\phi$ by $\phi - \beta$ gives incidence on an equator-facing tilt; $\cos\omega_s = -\tan\phi\tan\delta$ fixes day length; integrating gives the daily extraterrestrial irradiation $H_0$.
- Flat-plate collectors follow the Hottel–Whillier–Bliss equation $\dot Q_u = A_cF_R[S - U_L(T_i - T_a)]$: efficiency falls linearly with $(T_i - T_a)/G_T$, so collector type is chosen by operating temperature.
- Concentration is limited by the second law to $1/\sin^2\theta_s \approx 46\,000$ for the sun, and only beam radiation can be concentrated.
- A PV cell is a current source with a diode; $V_{oc}$ grows logarithmically with light, the maximum power point solves $(1+x)e^x = 1 + I_L/I_0$, and the fill factor is about $0.8$–$0.85$.
- Single-junction efficiency is bounded at about $33.7\,\%$ (Shockley–Queisser), about $29.4\,\%$ for silicon; heat costs about $0.3$–$0.4\,\%$ per kelvin.
- Annual PV energy $= P_\text{STC} \times$ peak-sun hours $\times PR$.
:::

## Exercises {#sec-exercises}

::: exercise Air mass {#exr-airmass level=1 check="2.92"}
Find the air mass when the sun is $70^\circ$ from the zenith, using the plane-parallel approximation. (Enter the air mass to three significant figures.)
::: solution
By [[#eq-airmass]], $AM = 1/\cos 70^\circ = 1/0.3420 = 2.924$, i.e. $2.92$. At this zenith angle the plane-parallel formula is at the edge of its validity; a curved-atmosphere formula gives a slightly lower value.
:::
:::

::: exercise Declination in mid-February {#exr-declination level=1 check="-13.3"}
Use Cooper's formula to find the solar declination on 15 February ($n = 46$). (Enter the declination in degrees to one decimal place, negative for south.)
::: solution
$\delta = 23.45\sin(360 \times (284 + 46)/365) = 23.45\sin(325.5^\circ) = 23.45 \times (-0.5667) = -13.29^\circ$, i.e. $-13.3^\circ$: the sun is overhead at $13.3^\circ\,\mathrm{S}$ at solar noon.
:::
:::

::: exercise Annual energy of a small array {#exr-yield level=1 check="3608"}
A $4.0\,\mathrm{kW_p}$ array receives $1100\,\mathrm{kWh/m^2}$ a year in its plane and has a performance ratio of $0.82$. Use [[#alg-pv-yield]] to find its annual energy. (Enter the energy in kWh as a whole number.)
::: solution
$E = 4.0 \times 1100 \times 0.82 = 3608\,\mathrm{kWh}$; specific yield $902\,\mathrm{kWh/kW_p}$, capacity factor $0.103$.
:::
:::

::: exercise Winter noon altitude {#exr-noon level=2 check="14.6"}
Show from [[#eq-zenith]] that at solar noon $\theta_z = \lvert\phi - \delta\rvert$, and find the solar altitude at noon at $52^\circ\,\mathrm{N}$ when $\delta = -23.4^\circ$. (Enter the altitude in degrees to one decimal place.)
::: solution
At noon $\omega = 0$, so $\cos\theta_z = \sin\phi\sin\delta + \cos\phi\cos\delta = \cos(\phi - \delta)$, hence $\theta_z = \lvert\phi - \delta\rvert$. Here $\theta_z = 52 + 23.4 = 75.4^\circ$ and the altitude is $90 - 75.4 = 14.6^\circ$. The air mass is $1/\cos 75.4^\circ \approx 4$, so winter sunlight in northern Europe is both oblique and strongly attenuated.
:::
:::

::: exercise Midsummer day length {#exr-daylength level=2 check="16.5"}
Find the day length (sunrise to sunset, ignoring refraction and the size of the sun's disc) at $52^\circ\,\mathrm{N}$ when $\delta = 23.45^\circ$. (Enter the day length in hours to one decimal place.)
::: solution
By [[#eq-sunset]], $\cos\omega_s = -\tan 52^\circ\tan 23.45^\circ = -1.2799 \times 0.4337 = -0.5551$, so $\omega_s = 123.72^\circ$. Day length $= 2 \times 123.72/15 = 16.50\,\mathrm{h}$, i.e. $16.5\,\mathrm{h}$. Observed day length is a few minutes longer because of refraction and because sunrise is defined by the upper edge of the disc.
:::
:::

::: exercise Collector efficiency from the test line {#exr-hwb level=2 check="0.55"}
A collector's test gives $F_R(\tau\alpha) = 0.75$ and $F_RU_L = 4.5\,\mathrm{W/m^2K}$. Find its efficiency when water enters at $50\,^\circ\mathrm{C}$, the ambient is $10\,^\circ\mathrm{C}$ and $G_T = 900\,\mathrm{W/m^2}$, and the useful gain of a $3.0\,\mathrm{m^2}$ array. (Enter the efficiency as a decimal to two decimal places.)
::: solution
By [[#eq-collector-eff]], $\eta = 0.75 - 4.5 \times 40/900 = 0.75 - 0.20 = 0.55$. Useful gain $= 0.55 \times 3.0 \times 900 = 1485\,\mathrm{W}$.
:::
:::

::: exercise A module on a summer afternoon {#exr-noct level=2 check="281"}
A $350\,\mathrm{W_p}$ module has NOCT $44\,^\circ\mathrm{C}$ and a power temperature coefficient of $-0.34\,\%/\mathrm{K}$. Estimate its output at $G_T = 900\,\mathrm{W/m^2}$ and ambient $30\,^\circ\mathrm{C}$ with [[#eq-noct]] and [[#eq-pv-temp]]. (Enter the power in W, rounded to the nearest watt.)
::: solution
$T_c = 30 + (44 - 20)/800 \times 900 = 30 + 27 = 57\,^\circ\mathrm{C}$. $P = 350 \times 0.9 \times [1 - 0.0034 \times 32] = 315 \times 0.8912 = 280.7\,\mathrm{W}$, i.e. $281\,\mathrm{W}$.
:::
:::

::: exercise Line-focus concentration limit {#exr-trough level=2 check="215"}
The sun's angular radius satisfies $\sin\theta_s = R_s/d = 4.65\times10^{-3}$. Find the maximum possible concentration ratio of a line-focus (trough) concentrator by [[#prop-concentration]], and explain why practical troughs operate far below it. (Enter the maximum concentration ratio, rounded to the nearest whole number.)
::: solution
$C_{\max,2D} = 1/\sin\theta_s = 1/(4.65\times10^{-3}) = 215.05$, i.e. $215$. Practical troughs work at $C$ of order $50$–$100$ because mirror slope errors, tracking errors and the finite receiver tube enlarge the effective acceptance angle, and a margin is needed so the focal line stays on the receiver.
:::
:::

::: exercise Derivation: the maximum power voltage {#exr-mpp-derive level=3 check="627"}
(a) Starting from [[#eq-diode]], derive [[#eq-mpp]]. (b) Show that $V_{oc} - V_m = nV_T\ln(1 + x)$ to an excellent approximation. (c) For $I_L/I_0 = 10^{12}$, $n = 1$ and $V_T = 25.69\,\mathrm{mV}$, find $V_m$. (Enter $V_m$ in mV, rounded to the nearest millivolt.)
::: solution
(a) See the proof of [[#prop-mpp]]: $dP/dV = I + V\,dI/dV = 0$ with $dI/dV = -(I_0/nV_T)e^{V/nV_T}$ gives $(1 + x)e^x = 1 + I_L/I_0$.

(b) Taking logarithms, $x + \ln(1 + x) = \ln(1 + I_L/I_0) = V_{oc}/nV_T$, so $V_{oc} - V_m = nV_T\ln(1 + x)$ exactly within the ideal model.

(c) Iterating $x = 27.631 - \ln(1 + x)$ gives $x = 24.396$, so $V_m = 24.396 \times 25.69 = 626.8\,\mathrm{mV}$, i.e. $627\,\mathrm{mV}$. Check with (b): $V_{oc} = 709.8\,\mathrm{mV}$ and $nV_T\ln(25.396) = 83.1\,\mathrm{mV}$; $709.8 - 83.1 = 626.7\,\mathrm{mV}$, the same within rounding.
:::
:::

::: exercise Optimum temperature of a solar receiver {#exr-receiver level=3 check="1083"}
A black receiver at temperature $T$ under concentrated beam radiation (concentration $C$, direct irradiance $G_b$) loses heat only by radiation, so its efficiency is $\eta_r = 1 - \sigma T^4/(CG_b)$; it drives a Carnot engine rejecting heat at $T_a$. (a) Write the overall efficiency $\eta(T)$ and the equation for its maximum. (b) For $C = 1000$, $G_b = 900\,\mathrm{W/m^2}$, $\sigma = 5.67\times10^{-8}\,\mathrm{W/m^2K^4}$ and $T_a = 298\,\mathrm{K}$, find the optimum receiver temperature and the maximum efficiency. (c) What is the stagnation temperature? (Enter the optimum receiver temperature in K, rounded to the nearest kelvin.)
::: solution
(a) $\eta = \left(1 - \dfrac{\sigma T^4}{CG_b}\right)\left(1 - \dfrac{T_a}{T}\right)$. Setting $d\eta/dT = 0$:
$$
-\frac{4\sigma T^3}{CG_b}\left(1 - \frac{T_a}{T}\right) + \left(1 - \frac{\sigma T^4}{CG_b}\right)\frac{T_a}{T^2} = 0 .
$$
A hotter receiver gains Carnot efficiency but loses more by radiation; the optimum balances the two.

(b) Solving numerically (bisection or Newton) gives $T = 1083\,\mathrm{K}$. There $\eta_r = 1 - 5.67\times10^{-8} \times 1083^4/(9.0\times10^{5}) = 0.913$, $\eta_\text{Carnot} = 1 - 298/1083 = 0.725$, and $\eta = 0.662$.

(c) Stagnation ($\eta_r = 0$): $T = (CG_b/\sigma)^{1/4} = (9.0\times10^{5}/5.67\times10^{-8})^{1/4} = 1996\,\mathrm{K}$. Real receivers also lose by convection and reflection and power cycles are far from Carnot, so actual solar-to-electric efficiencies of tower plants are a third or less of this ideal figure; the exercise shows why towers (high $C$) can run hotter cycles than troughs.
:::
:::

::: exercise Design: solar supply for a house {#exr-design level=3}
A house at $45^\circ\,\mathrm{N}$ uses $4000\,\mathrm{kWh}$ of electricity and $3000\,\mathrm{kWh}$ of heat for hot water a year. Its south-facing roof (tilt $35^\circ$) has $30\,\mathrm{m^2}$ of usable area and receives about $1400\,\mathrm{kWh/m^2}$ a year in its plane. Compare (i) covering the roof with PV modules and heating water with an electric heat pump of seasonal COP $3$, (ii) $4\,\mathrm{m^2}$ of solar thermal collectors for hot water with the rest PV, and (iii) any combination you prefer. Estimate annual energies with [[#alg-pv-yield]] and an assumed annual collector efficiency, and discuss the seasonal mismatch, storage and what you would choose. There is no single answer.
::: solution
An indicative analysis. (i) $30\,\mathrm{m^2}$ of $21\,\%$ modules is $6.3\,\mathrm{kW_p}$; with $PR = 0.8$, $E = 6.3 \times 1400 \times 0.8 = 7060\,\mathrm{kWh}$. Hot water by heat pump needs $3000/3 = 1000\,\mathrm{kWh}$ of electricity, so total demand is $5000\,\mathrm{kWh}$, below the annual PV output — but a large share of the PV arrives at summer middays and must be exported or stored; self-consumption without a battery might be $30$–$40\,\%$. (ii) $4\,\mathrm{m^2}$ of collectors at an annual system efficiency of about $40\,\%$ deliver $4 \times 1400 \times 0.40 = 2240\,\mathrm{kWh}$ of heat — about $75\,\%$ of the hot water, with a $200$–$300\,\mathrm{L}$ tank as daily storage; the remaining $26\,\mathrm{m^2}$ of PV give about $6100\,\mathrm{kWh}$. Per square metre, thermal collectors deliver about twice the energy of PV, but heat that is worth less and cannot be exported; PV with a heat pump delivers $0.21 \times 0.8 \times 3 \approx 0.5$ units of heat per unit of sunlight and is more flexible. Winter output is several times smaller than summer output at $45^\circ$ (see the $H_0$ widget), so neither option covers winter alone. A good answer states assumptions, compares delivered and avoided energy, and considers cost and simplicity ([[energy-systems/energy-economics-emissions]]).
:::
:::
