Take a balloon of air, push it upward a hundred metres, and let go. Whether it returns, stays, or accelerates away is the whole of atmospheric stability, and from the answer follows whether the afternoon is clear, whether the wheat lodges under hail, and whether the air over the city clears of its pollution by noon or keeps it until Thursday. The atmosphere is nearly always stable to a small displacement and often unstable to a large one, which is why the question "is it stable today?" has no answer until you say how far you propose to lift the air.

::: proposition Dry stability and the buoyancy frequency {#prop-dry-stability}
A parcel displaced vertically fast enough to exchange no heat with its surroundings obeys Poisson's equation, so its temperature changes at the **dry adiabatic lapse rate**
$$
\Gamma_d = \frac{g}{c_p} = 9.8\ \mathrm{K\,km^{-1}},
$$
and its **potential temperature** $\theta = T(1000/p)^{0.286}$ is conserved. Its buoyancy is $B = g(T_p - T_\text{env})/T_\text{env} \approx -g\,\Delta z\,(\Gamma_\text{env} - \Gamma_d)/T$, so the equation of motion is
$$
\frac{\mathrm{d}^2\Delta z}{\mathrm{d}t^2} = -N^2\,\Delta z, \qquad N^2 = \frac{g}{\theta}\frac{\mathrm{d}\theta}{\mathrm{d}z},
$$
where $N$ is the **buoyancy frequency**. Air is absolutely unstable if $\Gamma_\text{env} > \Gamma_d$, neutral if equal, and stable if less; equivalently, stable if $\theta$ increases with height. For a typical $N = 0.01\ \mathrm{s^{-1}}$ the parcel oscillates with a period of $2\pi/N = 10$ minutes, and these are the oscillations that make a wave cloud and that a glider pilot feels as smooth rising and sinking air with no thermal turbulence at all.
:::

::: proof
Take two neighbouring levels separated by $\Delta z$, with environmental temperatures $T_e(z)$ and $T_e(z+\Delta z)$, so that $T_e(z+\Delta z) = T_e(z) - \Gamma_\text{env}\Delta z$. A parcel lifted from $z$ arrives at $z + \Delta z$ with $T_p = T_e(z) - \Gamma_d\Delta z$. Its acceleration is
$$
a = g\frac{T_p - T_e(z+\Delta z)}{T_e} = g\frac{(\Gamma_\text{env}-\Gamma_d)\Delta z}{T_e},
$$
which is a restoring force when $\Gamma_\text{env} < \Gamma_d$. Writing the same in terms of $\theta$, since $\mathrm{d}\ln\theta/\mathrm{d}z = (1/T)\mathrm{d}T/\mathrm{d}z + g/T = (1/T)(g - c_p\Gamma)$, an environmental profile with $\mathrm{d}\theta/\mathrm{d}z > 0$ gives $N^2 > 0$ and simple harmonic motion with $\omega = N$. ∎

The numbers are worth memorising. In the standard atmosphere the environmental lapse rate is $6.5\ \mathrm{K\,km^{-1}}$ and $N \approx 0.012\ \mathrm{s^{-1}}$; in a strong inversion $N$ reaches $0.03\ \mathrm{s^{-1}}$ and the layer is so stable that the turbulence of the surface layer breaks into discrete, intermittent billows, visible at night as the flickering of stars through a thin cloud; and in a sunny convective boundary layer $N$ falls to nearly zero, which is what "well mixed" means.
:::

::: definition The levels of a sounding {#def-levels}
Four heights summarise a sounding for the convective forecaster. The **lifting condensation level** (LCL) is where a lifted parcel saturates, at $125\ \mathrm{m}$ per kelvin of dew-point depression, and is the base of the fair-weather cumulus. The **level of free convection** (LFC) is where the parcel becomes buoyant; it lies at or above the LCL, and the negative area between the surface and the LFC is the convective inhibition. The **equilibrium level** (EL) is where the parcel ceases to be buoyant and is the level of the anvil; the **maximum parcel level** a little above it, reached on momentum, is the top. The **freezing level**, where the environmental temperature passes $0\ ^\circ\mathrm{C}$, is not a parcel level but decides the phase of the precipitation and the height of the hail-growth zone. A fifth level matters in the tropics and in cold outbreaks: the **mixed-layer top**, at which the well-mixed potential temperature of the boundary layer gives way to the free air, and above which the air is by construction more stable than anything below.
:::

::: example The buoyancy period {#ex-buoyancy}
A sounding gives $12\ ^\circ\mathrm{C}$ and $940\ \mathrm{hPa}$ at $600\ \mathrm{m}$ and $4\ ^\circ\mathrm{C}$ and $890\ \mathrm{hPa}$ at $1100\ \mathrm{m}$. Find the potential temperatures, the stability, and the buoyancy period.
::: solution
$\theta_1 = 285.2\times(1000/940)^{0.286} = 285.2\times1.0183 = 290.4\ \mathrm{K}$ and $\theta_2 = 277.2\times(1000/890)^{0.286} = 277.2\times1.0353 = 287.0\ \mathrm{K}$. The potential temperature **decreases** with height by $3.4\ \mathrm{K}$ over $500\ \mathrm{m}$, so the layer is absolutely unstable — this is a daytime mixed layer, and the environmental lapse rate of $8.0\ \mathrm{K\,km^{-1}}$ is close to $\Gamma_d$, as it should be in a well-mixed layer.

For a stable case take the same layer with $\theta$ increasing by $3.4\ \mathrm{K}$ instead:
$$
N^2 = \frac{g}{\bar\theta}\frac{\Delta\theta}{\Delta z} = \frac{9.81}{288.7}\times\frac{3.4}{500} = 2.31\times10^{-4}\ \mathrm{s^{-2}}, \qquad N = 0.0152\ \mathrm{s^{-1}},
$$
and the period is $2\pi/N = 413\ \mathrm{s}$, seven minutes. A parcel displaced $200\ \mathrm{m}$ upward in this layer accelerates back at $0.03\ \mathrm{m\,s^{-2}}$ and overshoots by a comparable amount, so it settles into an oscillation of a few minutes' period — the reason a thin layer of layered cloud, once started, can persist for hours with no wind and no rain.
:::
:::

## Moist stability: the conditional kind

::: proposition The saturated adiabat and conditional instability {#prop-conditional}
A saturated parcel is warmer than a dry one as it rises, because condensation returns latent heat, and its lapse rate is
$$
\Gamma_s = \Gamma_d\,\frac{1 + L_v w/(R_d T)}{1 + L_v^2 w/(R_v c_p T^2)},
$$
which is $3.5\ \mathrm{K\,km^{-1}}$ in saturated air at $30\ ^\circ\mathrm{C}$, $4.7$ at $15$, $6.0$ at $0$ and $8.6$ at $-20\ ^\circ\mathrm{C}$: the colder the air, the less water it carries and the more nearly it follows the dry rate. Since $\Gamma_s < \Gamma_d$ always, there is a range of environmental profiles,
$$
\Gamma_s < \Gamma_\text{env} < \Gamma_d ,
$$
in which air is **stable if unsaturated and unstable if saturated**: this is **conditional instability**, and it describes most of the troposphere, most of the time. Its practical measure is not the lapse rate but the **convective available potential energy**,
$$
\text{cape} = g\int_\text{LFC}^\text{EL}\frac{T_p - T_\text{env}}{T_\text{env}}\,\mathrm{d}z \quad \left[\mathrm{J\,kg^{-1}}\right],
$$
integrated over the layer in which the parcel is warmer, and the **convective inhibition** $\text{cin}$, the negative area below the level of free convection.
:::

::: widget plot
f: 303-9.8*min(x,1)-6*max(x-1,0) ; 303-g*x
x: 0, 10
y: 190, 310
sliders: g=7:3:10
labels: temperature (K)
caption: A parcel of air at $30\ ^\circ\mathrm{C}$ with a lifting condensation level at $1\ \mathrm{km}$, lifted dry-adiabatically below it and moist-adiabatically above it at $6\ \mathrm{K\,km^{-1}}$ (upper curve), against an environment whose lapse rate is set by the slider (lower curve). Where the parcel curve lies to the warm side of the environment the area is cape; where it lies to the cold side, cin. At the slider's low values the parcel is always cooler and nothing happens; at the middle values it is cooler for the first kilometre and warmer above — the "loaded gun" sounding, in which a lid must be broken before explosive convection follows; at high values the air is unstable from the surface upward and the storms come with the morning heating. The whole difference between a hot still day and a day of hail is the horizontal position of one line.
:::

::: example cape and the updraught {#ex-cape}
A parcel is $3\ \mathrm{K}$ warmer than its environment between $2$ and $4\ \mathrm{km}$, $6\ \mathrm{K}$ warmer between $4$ and $7\ \mathrm{km}$, and $2\ \mathrm{K}$ warmer between $7$ and $10\ \mathrm{km}$, with environmental mean temperatures of $290$, $270$ and $240\ \mathrm{K}$ in the three layers. Find the cape and the maximum updraught. Below the $2\ \mathrm{km}$ level the parcel is $2\ \mathrm{K}$ cooler in a layer whose mean temperature is $295\ \mathrm{K}$: find the cin.
::: solution
$$
\text{cape} = 9.81\left[\frac{3\times2000}{290} + \frac{6\times3000}{270} + \frac{2\times3000}{240}\right] = 9.81\left[20.7 + 66.7 + 25.0\right] = 1100\ \mathrm{J\,kg^{-1}},
$$
and
$$
\text{cin} = 9.81\times\frac{2\times1000}{295} = 66\ \mathrm{J\,kg^{-1}}.
$$
If all the cape went into vertical velocity the updraught would reach $w = \sqrt{2\times1100} = 47\ \mathrm{m\,s^{-1}}$. Observed updraughts are half to two-thirds of this, because entrainment of environmental air makes the parcel heavier and cooler and because the pressure perturbation set up by the accelerating parcel opposes its own acceleration; a third of the cape is also spent on the kinetic energy of the compensating downdraught and of the cold pool it drives. A cape of $1100\ \mathrm{J\,kg^{-1}}$ with $66\ \mathrm{J\,kg^{-1}}$ of inhibition is an ordinary severe-weather day: enough for a storm with a $25\ \mathrm{m\,s^{-1}}$ updraught, hail if the $-10\ ^\circ\mathrm{C}$ level is not too high, and a gust front, but not for a supercell unless the wind shear is large as well.

The inhibition is the more interesting number. Sixty joules per kilogram is not much energy, but it is enough to stop a parcel rising until the surface has warmed by a couple of degrees or until a convergence line provides vertical velocity of a metre per second; and it is why the worst hail and the strongest gusts come from storms that were inhibited until late afternoon, since the cape accumulated all day beneath the lid and was released at once.
:::
:::

::: example The mixed layer, and why the cloud base rises all day {#ex-mixed-layer}
At ten in the morning the boundary layer is $1.2\ \mathrm{km}$ deep, well mixed with a potential temperature of $292\ \mathrm{K}$ and a mixing ratio of $10\ \mathrm{g\,kg^{-1}}$, and is capped by an inversion above which the free air has $\theta = 300\ \mathrm{K}$ and $w = 2\ \mathrm{g\,kg^{-1}}$. By four in the afternoon the layer has entrained $0.6\ \mathrm{km}$ of the free air. Find the new surface temperature, dew point and cloud-base height.
::: solution
Mixing conserves the mass-weighted mean of a conserved quantity, so
$$
\bar\theta = \frac{292\times1.2 + 300\times0.6}{1.8} = 294.7\ \mathrm{K}, \qquad
\bar w = \frac{10\times1.2 + 2\times0.6}{1.8} = 7.3\ \mathrm{g\,kg^{-1}}.
$$
At a surface pressure of $1000\ \mathrm{hPa}$ the temperature is $294.7\ \mathrm{K}$, or $21.5\ ^\circ\mathrm{C}$, and a mixing ratio of $7.3\ \mathrm{g\,kg^{-1}}$ corresponds to a vapour pressure of $11.7\ \mathrm{hPa}$ and a dew point of $9.2\ ^\circ\mathrm{C}$. The lifting condensation level is therefore $125\times(21.5-9.2) = 1540\ \mathrm{m}$, above the mixed-layer top at $1.8\ \mathrm{km}$ only marginally: the morning's cumulus, whose bases were at $1.2\ \mathrm{km}$, have risen to $1.5\ \mathrm{km}$ and thinned to a few shreds.

This is the diurnal history of a clear summer day in a continental interior, and it explains three things at once. The cloud base rises through the afternoon because the layer deepens and dries, not because anything has lost moisture. The relative humidity at the surface falls from ninety per cent in the morning to forty by evening with no change in the weather. And in a desert the same process runs away: the mixed layer entrains air so dry that the lifting condensation level is never reached, the sky stays clear, the surface heats further, and the layer grows to three or four kilometres — the deep, bone-dry convective layer from which the dust storms of the Sahara and the Arabian Peninsula are launched.
:::
:::

::: svg
caption: The sounding and the parcel. The heavy line is the environmental temperature measured by a radiosonde, the light line the path of a surface parcel lifted dry-adiabatically to the lifting condensation level and then moist-adiabatically. Where the parcel is warmer than the environment the atmosphere is buoyant and the area is cape; the shaded region below the level of free convection is the inhibition that must be overcome first. The levels named on the right are the ones a forecaster reads off every chart: the cloud base, the level at which the parcel becomes free, the equilibrium level at the top, and the freezing level that decides whether the rain is rain.
<svg viewBox="0 0 760 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sounding with cape and cin shaded">
  <style>
    .ax { stroke: var(--ink-2); stroke-width: 1.2; fill: none; }
    .env { stroke: var(--series-1); stroke-width: 2.6; fill: none; }
    .par { stroke: var(--series-2); stroke-width: 2.2; fill: none; stroke-dasharray: 6 4; }
    .cape { fill: var(--good-wash); }
    .cin { fill: var(--warn-wash); }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
  </style>
  <path class="cin" d="M180,330 L240,330 L252,290 L192,290 Z"/>
  <path class="cape" d="M192,290 L252,290 L300,150 L340,60 L250,60 L215,150 Z"/>
  <line class="ax" x1="120" y1="340" x2="700" y2="340"/>
  <line class="ax" x1="120" y1="30" x2="120" y2="340"/>
  <path class="env" d="M180,330 C200,300 210,270 214,240 C222,190 236,140 250,100 C262,66 268,48 272,36"/>
  <path class="par" d="M180,330 L192,290 L215,150 L250,60"/>
  <text class="lab" x="286" y="330">environment</text>
  <text class="lab" x="330" y="120">parcel</text>
  <text class="sub" x="196" y="316">cin 66 J/kg</text>
  <text class="sub" x="262" y="200">cape 1100 J/kg</text>
  <text class="sub" x="126" y="356">height: 0 to 12 km</text>
  <text class="sub" x="126" y="46">temperature</text>
  <text class="sub" x="560" y="332">surface: 30 C, dew point 22 C</text>
  <text class="sub" x="560" y="292">LCL 1 km: the cloud base</text>
  <text class="sub" x="560" y="252">LFC 2 km: free convection</text>
  <text class="sub" x="560" y="160">EL 10 km: the anvil</text>
  <text class="sub" x="560" y="120">freezing level 4 km</text>
</svg>
:::

::: example Reading a sounding {#ex-sounding}
A sounding reports: surface $28\ ^\circ\mathrm{C}$, dew point $20\ ^\circ\mathrm{C}$; $850\ \mathrm{hPa}$ $22/18$; $700\ \mathrm{hPa}$ $14/4$; $500\ \mathrm{hPa}$ $-2/-20$; $400\ \mathrm{hPa}$ $-12/-34$; and a temperature of $-8\ ^\circ\mathrm{C}$ at $450\ \mathrm{hPa}$ where the dew point is $-30\ ^\circ\mathrm{C}$. Identify the layers, and say whether the profile supports deep convection.
::: solution
The surface layer is moist, with a dew-point depression of $8\ \mathrm{K}$ and a lifting condensation level at $125\times8 = 1000\ \mathrm{m}$. Between $850$ and $700\ \mathrm{hPa}$ the temperature falls $8\ \mathrm{K}$ over the $1.5\ \mathrm{km}$ between those surfaces, a lapse rate of $5.3\ \mathrm{K\,km^{-1}}$ — stable, and with the dew point depression growing, this is a layer of entrainment or of dry air above a moist boundary layer. Between $700$ and $500\ \mathrm{hPa}$ the lapse rate is $16\ \mathrm{K}$ over $2.1\ \mathrm{km} = 7.6\ \mathrm{K\,km^{-1}}$, close to the moist adiabat and conditionally unstable. Between $500$ and $400\ \mathrm{hPa}$ it is $10\ \mathrm{K}$ over $1.6\ \mathrm{km} = 6.3\ \mathrm{K\,km^{-1}}$, again near-moist-neutral.

The important feature is the layer centred on $450\ \mathrm{hPa}$, where the temperature rises from $-2$ to $-8$ and then back to $-12$: an inversion with very dry air ($-30\ ^\circ\mathrm{C}$ dew point) inside it. This is the classic **elevated mixed layer** or **dry slot** advected from the desert to the west, and it has two effects. Evaporating precipitation into that dry air cools the column and can produce a strong cold pool and a damaging windstorm; and the inversion itself is a lid, so that a surface parcel may be inhibited even though the air above $500\ \mathrm{hPa}$ is conditionally unstable. The forecast is therefore not "cape of $2000\ \mathrm{J\,kg^{-1}}$ and hail at four o'clock" but "storms likely to be wind-driven rather than hail-bearing, and only where the boundary layer moistens enough to break the cap".
:::
:::

::: warning Three sentences that are said and are wrong
**"Warm air rises."** Warm air does not rise because it is warm; it rises because it is *warmer than the air at the same height*, and a parcel at $30\ ^\circ\mathrm{C}$ in an environment at $35\ ^\circ\mathrm{C}$ sinks. Buoyancy is a difference, not a temperature, which is why the tropics with their $30\ ^\circ\mathrm{C}$ surface air are often less unstable than a cold-frontal cloud with $15\ ^\circ\mathrm{C}$ surface air over a $-5\ ^\circ\mathrm{C}$ environment. **"There is a lot of instability today, so there will be storms."** Conditional instability is present in the mid-latitude troposphere on almost every summer day; what makes storms is a trigger, a supply of moist static energy, and an inhibition small enough to be overcome, and forecasters lose more forecasts by ignoring the last of these than by any other error. **"The cloud stops growing when it runs out of moisture."** A cumulus stops because it becomes denser than its environment — usually because it has entrained dry air and evaporated some of its water, or because it has reached a stable layer — and the strongest storms on Earth penetrate their own equilibrium level by kilometres on the strength of their updraught.
:::

::: quiz
The environmental lapse rate is $7\ \mathrm{K\,km^{-1}}$ and the parcel is unsaturated. It is:
- [ ] Absolutely unstable, and convection will develop
- [x] Stable to a small displacement, but possibly unstable if lifted to saturation
- [ ] Neutral, because it is close to the dry adiabatic rate
- [ ] Stable to any displacement whatever
::: solution
$7\ \mathrm{K\,km^{-1}}$ is less than $\Gamma_d = 9.8$, so an unsaturated parcel is restored: the air is stable to small displacements. But the saturated lapse rate in warm air is $4$–$6\ \mathrm{K\,km^{-1}}$, less than $7$, so a parcel lifted to saturation becomes warmer than its environment and rises freely. This is conditional instability, and it is the state of most of the summer troposphere: stable until something lifts it.
:::
:::

::: history
The idea that rising air cools by expanding came from the study of sound. Laplace noticed in 1816 that Newton's calculation of the speed of sound gave a value forty per cent too small, and fixed it by arguing that the compressions and rarefactions of a sound wave are too fast to conduct heat, so that the relevant elasticity is the adiabatic one — the first use of the adiabatic exponent in the atmosphere. Poisson wrote the equation $p^\gamma/\rho^\gamma = \text{constant}$ in 1808, and it is his name that is on the potential temperature in older British texts. The saturated adiabat was worked out by Rankine in 1855 in a diagram of the steam engine and independently by Zeuner, and the tephigram on which forecasters still draw it was devised by Napier Shaw in 1930 after a quarter-century of advocacy; Shaw, who had been a telegraph clerk, also proposed that weather prediction was a problem of energy rather than of force, and founded the school that made the air parcel the unit of the subject. The lifting condensation level was measured in the field by von Bezold's cloud-base observations in the 1890s and explained in the same decade by Hildebrandsson and Assmann's soundings. The skew-T log-P diagram, on which every operational sounding is now plotted, is Robert Mock's adaptation of the 1940s. The concept of cape entered meteorology through Louis Moncrieff and Harold Miller's 1976 theory of the tropical squall line, and the use of the sounding to forecast severe storms is the work of the American and British storm-prediction groups of the 1980s and 1990s, especially the hail and wind indices of the US National Severe Storms Laboratory.
:::

## Where this leads

The parcel theory of this chapter is used on the sounding in [[meteorology/clouds-precipitation]] and on the storm in [[meteorology/storms]]; the boundary layer within which the surface parcel acquires its temperature and moisture is in [[atmospheric-dynamics/boundary-layer]]; the moist static energy and $\theta_e$ are formalised in [[atmospheric-dynamics/moist-thermodynamics]]; and the mean state of the troposphere, whose lapse rate is set by radiative-convective equilibrium rather than by any single parcel, is in [[atmospheric-dynamics/thermodynamics]] and [[climate-system/greenhouse-effect]].

::: summary Key takeaways
- A displaced parcel moves dry-adiabatically at 9.8 K/km and conserves potential temperature; the atmosphere is stable when potential temperature increases with height.
- The buoyancy frequency N measures the stability, and a displaced parcel oscillates with a period of 2 pi / N, about ten minutes in a typical stable layer.
- The saturated lapse rate is 3.5 K/km in hot moist air and 8.6 in cold air, always below the dry rate, so most of the troposphere is conditionally unstable: stable until lifted.
- Cape is the positive area on the sounding and gives an updraught of about sqrt(2 cape), reduced by half for entrainment and pressure drag; cin is the lid that must be broken first.
- A sounding is read for its layers, not its numbers: the capping inversion, the dry slot, the moist boundary layer and the near-moist-neutral mid-troposphere each imply a different kind of storm.
- Buoyancy is a difference of temperature, not a temperature; instability without a trigger produces nothing.
:::

## Exercises

::: exercise Potential temperature {level=1 check="302.3"}
Find the potential temperature of air at $20\ ^\circ\mathrm{C}$ and $900\ \mathrm{hPa}$.
::: solution
$\theta = 293.2\times(1000/900)^{0.286} = 293.2\times1.0310 = 302.3\ \mathrm{K}$. (Enter to one decimal in kelvin: $302.3$.)
:::
:::

::: exercise Stability from potential temperature {level=1 check="0.014"}
The potential temperature rises from $292\ \mathrm{K}$ at $800\ \mathrm{m}$ to $295\ \mathrm{K}$ at $1300\ \mathrm{m}$. Find the buoyancy frequency, in $\mathrm{s^{-1}}$.
::: solution
$N^2 = (9.81/293.5)\times(3/500) = 2.0\times10^{-4}$, so $N = 0.0141\ \mathrm{s^{-1}}$ and the period is $7.4$ minutes.
:::
:::

::: exercise The saturated lapse rate {level=1 check="8.6"}
Saturated air at $-20\ ^\circ\mathrm{C}$ has a mixing ratio of $0.8\ \mathrm{g\,kg^{-1}}$. Estimate $\Gamma_s$ using the expression in the proposition.
::: solution
The numerator factor is $1 + 2.5\times10^6\times8\times10^{-4}/(287\times253) = 1.027$ and the denominator $1 + (2.5\times10^6)^2\times8\times10^{-4}/(461.5\times1005\times253^2) = 1.164$, so $\Gamma_s = 9.8\times1.027/1.164 = 8.6\ \mathrm{K\,km^{-1}}$. Cold air is nearly dry, and cold-air convection is nearly neutral: this is why polar seas in a cold outbreak are covered in shallow cumulus and never in thunderstorms.
:::
:::

::: exercise cape {level=1 check="944"}
A parcel is $5\ \mathrm{K}$ warmer than its environment through a $5\ \mathrm{km}$ layer whose mean temperature is $260\ \mathrm{K}$. Find the cape, in $\mathrm{J\,kg^{-1}}$.
::: solution
$\text{cape} = 9.81\times5\times5000/260 = 944\ \mathrm{J\,kg^{-1}}$. (Enter to the nearest unit: $944$.)
:::
:::

::: exercise Updraught {level=2 check="45"}
Find the theoretical maximum updraught for a cape of $1000\ \mathrm{J\,kg^{-1}}$, in $\mathrm{m\,s^{-1}}$.
::: solution
$w = \sqrt{2\times1000} = 45\ \mathrm{m\,s^{-1}}$; observed updraughts are typically two-thirds of this, $30\ \mathrm{m\,s^{-1}}$. Hail that survives a $30\ \mathrm{m\,s^{-1}}$ updraught can grow to $5\ \mathrm{cm}$ in radius before the stream breaks.
:::
:::

::: exercise The capping inversion {level=2 check="153"}
A parcel is $3\ \mathrm{K}$ cooler than its environment through a $1.5\ \mathrm{km}$-deep inversion of mean temperature $288\ \mathrm{K}$. Find the cin, in $\mathrm{J\,kg^{-1}}$.
::: solution
$\text{cin} = 9.81\times3\times1500/288 = 153\ \mathrm{J\,kg^{-1}}$. A lid of this strength requires either several degrees of surface heating or a mesoscale convergence line with a vertical velocity of $0.5\ \mathrm{m\,s^{-1}}$ acting for half an hour, and it is why the storms of a capped day come suddenly, all at once, and late.
:::
:::

::: exercise Entrainment {level=2 check="0.33"}
A parcel of $1\ \mathrm{km^3}$ entrains environmental air at $2\ \mathrm{kg}$ per kilogram of its own mass as it rises. By what factor does its excess entropy (its $T_p - T_e$) decrease, to first order?
::: solution
Mixing a parcel with twice its mass of environment brings its temperature to within a third of the environment's, so the buoyancy falls to a factor of $1/(1+2) = 0.33$. Entrainment is the main reason real cape is half the cape of the sounding, and it is why a storm with a strong, coherent updraught (a supercell, which entrains little because its updraught is separated from the environment by the rear-flank downdraught) outperforms one with the same sounding but no shear.
:::
:::

::: exercise Deriving the dry lapse rate {level=3}
Derive $\Gamma_d = g/c_p$ from the first law and hydrostatic balance, and compute its value for carbon dioxide at the surface of Mars ($c_p = 850\ \mathrm{J\,kg^{-1}\,K^{-1}}$, $g = 3.72\ \mathrm{m\,s^{-2}}$) and for hydrogen on Jupiter ($c_p = 14{,}300$, $g = 24.8$). Explain the consequence for the lapse rates of the two planets.
::: solution
The first law for a reversible adiabatic displacement gives $c_p\,\mathrm{d}T = v\,\mathrm{d}p = \mathrm{d}p/\rho$, and hydrostatic balance gives $\mathrm{d}p = -\rho g\,\mathrm{d}z$, so $\mathrm{d}T/\mathrm{d}z = -g/c_p$. For Mars, $\Gamma_d = 3.72/850 = 4.4\ \mathrm{K\,km^{-1}}$; for Jupiter, $24.8/14300 = 1.7\ \mathrm{K\,km^{-1}}$.

The dry adiabat is therefore steep on Mars and nearly flat on Jupiter, and this is why the observed environmental lapse rates differ so much: the Martian boundary layer runs at $4$–$5\ \mathrm{K\,km^{-1}}$ near the surface in the afternoon, essentially adiabatic and convective, while Jupiter's visible cloud tops sit near a radiative profile close to the hydrogen adiabat. On Earth the presence of water vapour breaks the tie between the two: the moist adiabat is much less than $\Gamma_d$, and convection pins the tropical troposphere near $6.5\ \mathrm{K\,km^{-1}}$ — which is why the tropical tropopause is a cold trap and why the water-vapour content of the stratosphere is set by the temperature of the cold equatorial tropopause rather than by the amount of rain.
:::
:::

::: exercise The loaded gun {level=3}
A day's soundings at the same station give, at 06:00, a surface temperature of $24\ ^\circ\mathrm{C}$, a dew point of $21\ ^\circ\mathrm{C}$, and an inversion at $900\ \mathrm{hPa}$ across which the temperature rises $4\ \mathrm{K}$; by 15:00 the boundary layer has mixed to $600\ \mathrm{m}$ with a surface temperature of $31\ ^\circ\mathrm{C}$ and a dew point of $20\ ^\circ\mathrm{C}$. Estimate the change in cape and in cin, and explain why the storms of such a day come at five in the afternoon and not at noon.
::: solution
Mixing the layer to $600\ \mathrm{m}$ brings the surface air's temperature to the average of the layer it mixed with and its dew point down, so the mixed layer's potential temperature rises while its moisture is roughly conserved. The lifting condensation level rises from $125\times3 = 375\ \mathrm{m}$ to $125\times11 = 1375\ \mathrm{m}$, and the parcel starts from a warmer, drier, higher base.

The cin falls because the mixed layer erodes the base of the inversion: the $4\ \mathrm{K}$ of inhibition at 06:00, spread over the $300\ \mathrm{m}$ between the surface and the mixed-layer top, is reduced as the mixed layer eats into the lid, and by mid-afternoon the parcel reaches the inversion with enough buoyancy to break through. The cape rises because the same mixing has put a deep layer of warm, conditionally unstable air near the surface while the mid-troposphere is unchanged. The result is a day on which the morning is clear, the noon is hot and still, the first cumulus appears at two, and at five the whole sky develops at once into a line of storms with the accumulated cape of ten hours of heating behind them. This is the diurnal cycle of severe convection in the continental mid-latitudes, and it is the reason the warning systems of the world are built around the afternoon.
:::
:::
