Water vapour is between one and four parts in a hundred of the atmosphere by volume, and it is responsible for perhaps nine-tenths of what the word "weather" means. It is the only constituent of the air that changes phase at the temperatures and pressures found at the surface, and that single peculiarity makes it the fuel of thunderstorms, the source of all rain and snow, the reason the wet-bulb temperature is the number that can kill you, and the reason a cloud has a base at a height you can calculate from a thermometer reading. The two thermometers of a sling psychrometer, swung for a minute in the shade, give you more of the atmosphere's story than most instruments of comparable price.

::: definition Saturation vapour pressure {#def-es}
The **vapour pressure** $e$ is the partial pressure of the water vapour in the air, and by Dalton's law the total pressure is the sum of the partial pressures, $p = p_d + e$. Over a flat water surface at temperature $T$ the vapour in equilibrium with it has the **saturation vapour pressure** $e_s(T)$, given by the Magnus formula
$$
e_s = 6.112\,\exp\left(\frac{17.62\,T}{243.12 + T}\right)\ \mathrm{hPa}, \qquad T\ \text{in}\ ^\circ\mathrm{C},
$$
with $2.87\ \mathrm{hPa}$ at $-10\ ^\circ\mathrm{C}$, $6.11$ at $0$, $23.4$ at $20$, $31.6$ at $25$, $42.3$ at $30$ and $73.8$ at $40\ ^\circ\mathrm{C}$. Over ice the corresponding constants are $22.46$ and $272.62$, giving a lower $e_s$ at every sub-zero temperature — the difference that drives the Bergeron process of the next chapter. The essential feature is that $e_s$ rises by about $7\%$ per kelvin: warm air can hold, in the loose sense used below, far more water than cold, and the atmosphere's water content therefore scales with the temperature of the ocean it came from.
:::

::: proposition Clausius–Clapeyron {#prop-clausius}
The slope of the saturation curve follows from the equality of chemical potentials, or equivalently from the Clausius–Clapeyron equation,
$$
\frac{\mathrm{d}e_s}{\mathrm{d}T} = \frac{L_v\,e_s}{R_v T^2}, \qquad L_v = 2.5\times10^6\ \mathrm{J\,kg^{-1}},\ R_v = 461.5\ \mathrm{J\,kg^{-1}\,K^{-1}},
$$
which integrates to an exponential in $-L_v/R_vT$. Since $L_v/R_vT \approx 19$ at $288\ \mathrm{K}$, the e-folding scale is $T/19$, or about $15\ \mathrm{K}$ — a $7\%$ per kelvin increase. For the sublimation curve over ice, $L_s = 2.83\ \mathrm{MJ\,kg^{-1}}$ gives a steeper curve, $8.3\%$ per kelvin, so the two curves diverge below $0\ ^\circ\mathrm{C}$.
:::

::: proof
Consider one kilogram of vapour and one of liquid in equilibrium across a movable, heat-conducting boundary at $T$ and $p$. The condition that the Gibbs free energy be stationary for the transfer of mass gives $\mathrm{d}\mu_v = \mathrm{d}\mu_l$, that is $v_v\,\mathrm{d}e = v_l\,\mathrm{d}p$ at fixed $T$; carrying the temperature dependence through with $v_v = R_vT/e$ and neglecting $v_l$ against $v_v$ yields $\mathrm{d}\ln e_s/\mathrm{d}T = L_v/(R_vT^2)$. Integrating between two states with $L_v$ constant,
$$
e_s(T) = e_s(T_0)\exp\left[-\frac{L_v}{R_v}\left(\frac{1}{T}-\frac{1}{T_0}\right)\right],
$$
which at $T_0 = 273.16\ \mathrm{K}$, $e_s = 6.112\ \mathrm{hPa}$ reproduces the Magnus formula to better than $0.4\%$ between $-20$ and $+40\ ^\circ\mathrm{C}$. ∎

The proof has a consequence that is easy to miss and important to the climate: the saturation vapour pressure is set by temperature alone, and is quite independent of the pressure or of what other gases are present. A world with a different atmospheric pressure and the same temperature has the same $e_s$; and a warming world has a moister atmosphere in direct proportion, about $7\%$ more water vapour per kelvin, which is the strongest and best-measured feedback in the climate system.
:::

::: example The measures of humidity {#ex-measures}
Air at $1006\ \mathrm{hPa}$ has a dry-bulb temperature of $25\ ^\circ\mathrm{C}$ and a dew point of $18\ ^\circ\mathrm{C}$. Find the vapour pressure, the mixing ratio, the relative humidity, the potential temperature and the virtual temperature.
::: solution
The vapour pressure is the saturation pressure at the dew point: $e = e_s(18) = 20.6\ \mathrm{hPa}$. The mixing ratio is
$$
w = 0.622\,\frac{e}{p-e} = 0.622\times\frac{20.6}{985.4} = 0.0130 = 13.0\ \mathrm{g\,kg^{-1}}.
$$
The saturation vapour pressure at $25\ ^\circ\mathrm{C}$ is $31.6\ \mathrm{hPa}$, so the relative humidity is $20.6/31.6 = 65\%$. The potential temperature to the $1000\ \mathrm{hPa}$ level is
$$
\theta = T\left(\frac{1000}{p}\right)^{0.286} = 298.2\times(1000/1006)^{0.286} = 296.7\ \mathrm{K}.
$$
The virtual temperature, the temperature at which dry air would have the same density, is $T_\text{v} = T(1+0.61w) = 298.2\times1.0079 = 300.6\ \mathrm{K}$, nearly a kelvin warmer than the thermometer.

The wet-bulb temperature, the reading of the thermometer in the wet sock, is about $20.2\ ^\circ\mathrm{C}$: it is the temperature reached by evaporating water into the air at the expense of its own sensible heat, and it lies between the dew point and the dry-bulb temperature. The equivalent potential temperature, the temperature the parcel would have if all its vapour were condensed out and the latent heat returned to it at the surface pressure, is about $335\ \mathrm{K}$, and it is the best single number for the energy available to convection.
:::
:::

::: widget plot
f: 100*exp(17.62*td/(243.12+td))/exp(17.62*x/(243.12+x))
x: 5, 40
y: 0, 100
sliders: td=18:-5:28
labels: relative humidity (%)
caption: Relative humidity against air temperature for air whose dew point is fixed by the slider. The dew point does not change when the air is heated or cooled without adding or removing water, so the whole afternoon cycle of relative humidity — from ninety per cent at dawn to thirty per cent at four in the afternoon over a dry continental interior — is this curve traversed from left to right and back, with no water exchanged at all. This is why the relative humidity is a poor measure of how much water the air contains and why forecasters, agronomists and fire officers use the dew point. The curve also shows why a $40\ ^\circ\mathrm{C}$ desert afternoon with a dew point of $10\ ^\circ\mathrm{C}$ is a comfortable twelve per cent, while a $30\ ^\circ\mathrm{C}$ coastal afternoon with a dew point of $25\ ^\circ\mathrm{C}$ is eighty per cent and miserable.
:::

## The measures, and what each is for

::: definition Humidity, and its conserved quantities {#def-humidity}
Six numbers describe the water in the air, and each has its use. The **vapour pressure** $e$ (hPa) is the partial pressure. The **mixing ratio** $w = 0.622\,e/(p-e)$ and the **specific humidity** $q = 0.622\,e/p$ are in $\mathrm{kg\,kg^{-1}}$ and are conserved when no water is added or removed, which makes them the right variables for a moving parcel. The **relative humidity** $f = e/e_s = q/q_s$ is the ratio to saturation, and is what a hygrometer reads and what a person feels, but it changes when the air is heated, so it is conserved by nothing. The **dew point** $T_d$ is the temperature to which air must be cooled at constant pressure to saturate, and is a direct measure of $e$: $T_d$ is the honest humidity number. The **wet-bulb temperature** $T_w$ is the temperature reached by evaporative cooling to equilibrium, and is the temperature the human body can attain. The **virtual temperature** $T_\text{v} = T(1+0.61w-0.61\lambda q_l)$ is the temperature that makes the ideal gas law work for moist air, and the **equivalent potential temperature** $\theta_e$ is conserved by moist ascent and is therefore the variable that tracks an air mass through a cyclone.
:::

::: example Dew point and comfort {#ex-comfort}
Two places have the same air temperature of $32\ ^\circ\mathrm{C}$: one has a dew point of $12\ ^\circ\mathrm{C}$, the other $24\ ^\circ\mathrm{C}$. Find the relative humidity and the wet-bulb temperature of each, and explain the difference in danger.
::: solution
At $12\ ^\circ\mathrm{C}$ the vapour pressure is $14.0\ \mathrm{hPa}$ and the relative humidity $30\%$; at $27\ ^\circ\mathrm{C}$ it is $35.6\ \mathrm{hPa}$ and $75\%$. The wet-bulb temperatures, from the psychrometric relation $e = e_s(T_w) - 0.66\,p\,(T-T_w)$, are $19.2\ ^\circ\mathrm{C}$ and $28.2\ ^\circ\mathrm{C}$.

The first is a hot dry day, in which the body evaporates sweat at perhaps $200\ \mathrm{W\,m^{-2}}$ and stays cool with a skin temperature of $34\ ^\circ\mathrm{C}$. The second allows only slow evaporation: the skin must approach $33\ ^\circ\mathrm{C}$ to lose heat at all, and a wet-bulb temperature of $28\ ^\circ\mathrm{C}$ is already the threshold at which the emergency departments of a tropical city begin to fill. The theoretical limit of sustained human thermoregulation is a wet-bulb temperature of about $35\ ^\circ\mathrm{C}$, set by the requirement that metabolically produced heat be lost by evaporation at a sustainable sweat rate; wet-bulb temperatures of $35\ ^\circ\mathrm{C}$ and above have now been recorded, briefly, at a dozen coastal stations around the Persian Gulf and the Indus. The practical consequence is that the dew point, not the temperature, is the number on which heat warnings should be based, and that a heatwave in a humid climate kills far more people than a hotter one in a dry climate.
:::
:::

::: example The cloud base {#ex-lcl}
Surface air is at $27\ ^\circ\mathrm{C}$ with a dew point of $15\ ^\circ\mathrm{C}$. It is lifted over a low ridge. Estimate the height of the cloud base, and the temperature in the cloud at that level. Find the surface dew point that would give a cloud base at $300\ \mathrm{m}$.
::: solution
Unsaturated air rises and cools at the dry adiabatic rate of $9.8\ \mathrm{K\,km^{-1}}$, while its dew point falls at about $1.8\ \mathrm{K\,km^{-1}}$ as the pressure drops, so the two converge at $8.0\ \mathrm{K\,km^{-1}}$. The initial gap is $12\ \mathrm{K}$, so
$$
z_\text{LCL} = \frac{12}{8.0}\ \mathrm{km} = 1.5\ \mathrm{km},
$$
which is the familiar rule of $125\ \mathrm{m}$ per kelvin of dew-point depression. The temperature there is $27 - 9.8\times1.5 = 12.3\ ^\circ\mathrm{C}$, and the cloud, if it forms, will be a cumulus with a flat base at that level — flat because the surface temperature and dew point are laterally uniform, and because every parcel that rises from the same conditions saturates at the same height.

For a cloud base at $300\ \mathrm{m}$ the dew-point depression must be $0.3/0.125 = 2.4\ \mathrm{K}$, so a dew point of $24.6\ ^\circ\mathrm{C}$. This is why a high dew point means low cloud and a low one means a blue sky, why the trade-wind cumulus over the ocean have bases at $600$–$700\ \mathrm{m}$ with a sea-surface-controlled dew point, and why the valley fog of a windless night has a base at the height to which the nocturnal inversion has cooled the air.
:::
:::

::: example Mixing to saturation: the steam fog {#ex-mixing}
Cold air at $-15\ ^\circ\mathrm{C}$, with a vapour pressure at saturation over water, flows over a lake at $10\ ^\circ\mathrm{C}$. The saturated air in contact with the water mixes with the cold air above in the ratio one of warm to three of cold by mass. Find the temperature, the vapour pressure and the relative humidity of the mixture, and decide whether fog forms.
::: solution
Mixing conserves both sensible heat and vapour, so
$$
T = \tfrac14(-15) + \tfrac34(10) = 3.8\ ^\circ\mathrm{C}, \qquad
e = \tfrac14(1.63) + \tfrac34(12.3) = 9.6\ \mathrm{hPa}.
$$
The saturation pressure at $3.8\ ^\circ\mathrm{C}$ is $8.0\ \mathrm{hPa}$, so the relative humidity is $120\%$ and the mixture is supersaturated: fog forms. It forms because the saturation curve is **convex**, so the straight line joining two states on the $(T,e)$ diagram lies above it, and any mixture of two nearly saturated airs at different temperatures is supersaturated.

This is the mechanism of **steam fog** or **arctic sea smoke**, seen over a lake in autumn and over the sea in a cold-air outbreak, when the water is far warmer than the air and the plumes of evaporation are made visible as they mix; of the plume from a cooling tower, which is the same process on a small scale; and of the exhaust contrail, in which the mixing is of hot saturated combustion gas with air at $-50\ ^\circ\mathrm{C}$. It is also why a chimney plume that disperses into clear air can leave a visible trail, and why the fog of a cold-air outbreak over a warm current is shallow, lumpy and full of rising cells — the "smoke stacks" convection of the mariner's vocabulary, with the latent heat of the condensed water feeding the cells that make them.
:::
:::

::: svg
caption: Four ways of reaching saturation, drawn on a diagram of vapour pressure against temperature. The curve is the saturation vapour pressure; a state is a point, and condensation begins when the point reaches the curve. Radiative cooling at night moves a state horizontally left (constant vapour pressure, falling temperature) to give dew and radiation fog; mixing with saturated cold air moves it left and down; contact with a cold surface gives sea fog; and adiabatic ascent moves it left and slightly down along a line of constant mixing ratio to give the cloud base at the lifting condensation level. Only the last is a process that makes clouds on a large scale, and only the last conserves the mixing ratio exactly.
<svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ways of reaching saturation">
  <style>
    .ax { stroke: var(--ink-2); stroke-width: 1.2; fill: none; }
    .curve { stroke: var(--series-1); stroke-width: 2.6; fill: none; }
    .path { stroke: var(--series-3); stroke-width: 1.8; fill: none; stroke-dasharray: 5 4; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
  </style>
  <line class="ax" x1="80" y1="270" x2="720" y2="270"/>
  <line class="ax" x1="80" y1="30" x2="80" y2="270"/>
  <path class="curve" d="M80,268 C240,262 400,236 520,180 C600,138 660,90 700,44"/>
  <path class="path" d="M470,250 L300,250"/>
  <path class="path" d="M470,250 L330,206"/>
  <path class="path" d="M470,250 L360,232"/>
  <path class="path" d="M470,250 L470,150"/>
  <circle cx="470" cy="250" r="4.5" fill="currentColor"/>
  <text class="lab" x="480" y="266">unsaturated air, 25 C, 40%</text>
  <text class="sub" x="150" y="244">radiative cooling: dew, fog</text>
  <text class="sub" x="330" y="196">mixing with cold air</text>
  <text class="sub" x="368" y="222">cold surface: sea fog</text>
  <text class="sub" x="482" y="146">ascent: cloud base (LCL)</text>
  <text class="lab" x="600" y="70">saturation curve</text>
  <text class="sub" x="600" y="86">es(T), 7% per kelvin</text>
  <text class="sub" x="84" y="286">-20</text><text class="sub" x="380" y="286">10</text><text class="sub" x="690" y="286">40 C</text>
  <text class="sub" x="86" y="42">vapour pressure</text>
</svg>
:::

::: warning What relative humidity does not tell you
A cubic metre of saturated air at $0\ ^\circ\mathrm{C}$ holds $4.8\ \mathrm{g}$ of water; a cubic metre at $30\ ^\circ\mathrm{C}$ at forty per cent holds $12.8\ \mathrm{g}$ — two and a half times as much, at less than half the relative humidity. Relative humidity is a ratio, and the denominator moves by a factor of a hundred between a winter night and a summer afternoon. It is the right number for whether paint will dry, whether hay will barn, and whether a fungus will infect a leaf, because all of those depend on the gradient of vapour pressure between the surface and the air. It is the wrong number for asking how much water is in the air, how much rain a system can produce, or how much latent heat a thunderstorm will release — and it is the number that misleads almost every public discussion of humidity, including the claim that "the humidity is one hundred per cent and it is thirty degrees", which describes not a steam bath but a fog.
:::

::: quiz
On a day with a constant dew point of $18\ ^\circ\mathrm{C}$, the temperature rises from $18\ ^\circ\mathrm{C}$ at dawn to $30\ ^\circ\mathrm{C}$ in the afternoon. What happens to the relative humidity, and how much water vapour is in the air?
- [ ] The relative humidity stays the same and the water vapour increases
- [x] The relative humidity falls from about one hundred to about forty-five per cent, and the water vapour is unchanged
- [ ] The relative humidity rises because warm air holds more water
- [ ] The dew point rises with the temperature
::: solution
The vapour pressure is set by the dew point and stays at $20.6\ \mathrm{hPa}$; the saturation pressure rises from $20.6$ to $42.4\ \mathrm{hPa}$, so the relative humidity falls from $100\%$ to $49\%$. The dew point is unchanged, because the amount of vapour is unchanged. This is the whole daily cycle of relative humidity in a continental summer, and it happens with no moisture flux at all.
:::
:::

::: history
The first quantitative humidity instrument was the hair hygrometer, made by Horace-Bénédict de Saussure in 1783 from a strand of human hair whose length changes with the water it absorbs, and which is still the basis of the cheap hygrometer. John Dalton, in the same decade in Manchester, separated the vapour pressure from the total pressure by weighing the water a known volume of air gave up on cooling, and stated the law of partial pressures that carries his name in 1802; Henri Regnault's measurements of the 1840s of the latent heat and of the saturation pressure, made with a precision that was not improved on for fifty years, are the numbers still printed in the tables. Gustav Assmann's aspirating psychrometer of 1887 — two thermometers sucked dry by clockwork, read to a fiftieth of a degree — gave the first reliable wet-bulb temperatures and with them the first reliable humidity soundings, and the ventilated aspirator is still what a good weather station uses. The chilled-mirror hygrometer, which cools a mirror until a photodetector sees the first flash of dew and reads the temperature of the mirror, became the standard against which all others are calibrated, and remains the most accurate humidity sensor ever made. The radiosonde's humidity sensor — a strand of human hair until the 1960s, then a capacitive polymer film that drifts and freezes — has been the weakest link in the upper-air observation ever since, and the reason reanalyses disagree about the water vapour of the free troposphere, which is the most important and least observed of the greenhouse gases.
:::

## Where this leads

The stability consequences of these equations, the lifted parcel and the sounding, are in [[meteorology/stability]]; the condensation itself is in [[meteorology/clouds-precipitation]]; the moist static energy and the equivalent potential temperature are used again in [[atmospheric-dynamics/moist-thermodynamics]] and in [[meteorology/storms]]; evaporation from the surface is in [[hydrology/precipitation-evaporation]]; and the water-vapour feedback of $7\%$ per kelvin is quantified in [[climate-system/feedbacks-sensitivity]].

::: summary Key takeaways
- The saturation vapour pressure depends on temperature alone and rises about 7% per kelvin, by Clausius-Clapeyron; over ice it is lower, which matters for clouds.
- The dew point is the honest measure of water vapour, because it does not change when the air is heated; the relative humidity is a ratio whose denominator moves by two orders of magnitude.
- The mixing ratio and specific humidity are conserved by condensation and evaporation only, and are the variables for moving air; the equivalent potential temperature is conserved by moist ascent.
- Condensation needs a process: radiative cooling gives dew and fog, contact gives sea fog, mixing gives the stratus of entrainment, and adiabatic ascent gives the cloud base at 125 m per kelvin of dew-point depression.
- Moist air is lighter: the virtual temperature exceeds the actual by 0.61 times the mixing ratio, about 1 K in humid air, and that is the buoyancy of a thunderstorm's inflow.
- The wet-bulb temperature, not the dry-bulb, sets the limit of human survival, and the limit is about 35 C.
- Water vapour is the most important greenhouse gas and its abundance is set by the temperature, which makes it the strongest feedback in the climate.
:::

## Exercises

::: exercise Saturation pressure {level=1 check="23.4"}
Find the saturation vapour pressure at $20\ ^\circ\mathrm{C}$, in hPa.
::: solution
$e_s = 6.112\exp(17.62\times20/263.12) = 6.112\times3.82 = 23.4\ \mathrm{hPa}$.
:::
:::

::: exercise Relative humidity {level=1 check="49"}
Air at $30\ ^\circ\mathrm{C}$ has a dew point of $18\ ^\circ\mathrm{C}$. Find the relative humidity, in per cent.
::: solution
$e = e_s(18) = 20.6\ \mathrm{hPa}$, $e_s(30) = 42.4\ \mathrm{hPa}$, so $f = 49\%$.
:::
:::

::: exercise Mixing ratio {level=1 check="27.5"}
Find the mixing ratio, in $\mathrm{g\,kg^{-1}}$, of saturated air at $30\ ^\circ\mathrm{C}$ and $1000\ \mathrm{hPa}$.
::: solution
$w = 0.622\times42.3/(1000-42.3) = 27.5\ \mathrm{g\,kg^{-1}}$. Saturated tropical air at the sea is two and a half times moister in mixing-ratio terms than saturated air at $10\ ^\circ\mathrm{C}$, which is the reason the tropics can produce the rainfall they do.
:::
:::

::: exercise Cloud base {level=1 check="1000"}
Surface air at $22\ ^\circ\mathrm{C}$ has a dew point of $14\ ^\circ\mathrm{C}$. Estimate the cumulus base, in metres.
::: solution
$z = 125\times(22-14) = 1000\ \mathrm{m}$. Fair-weather cumulus over a temperate lowland on a summer afternoon have bases at $800$–$1500\ \mathrm{m}$, and their height is a direct reading of the surface dew point.
:::
:::

::: exercise Virtual temperature {level=2 check="302.4"}
Find the virtual temperature of air at $30\ ^\circ\mathrm{C}$ with a mixing ratio of $22\ \mathrm{g\,kg^{-1}}$.
::: solution
$T_\text{v} = 303.2\times(1 + 0.61\times0.022) = 303.2\times1.0134 = 307.3\ \mathrm{K}$, that is $34.1\ ^\circ\mathrm{C}$. In a moist tropical boundary layer the virtual temperature effect is worth $3$–$4\ \mathrm{K}$ of buoyancy, more than the typical cape of a weakly sheared storm, and it is why the depth of the trade-wind boundary layer is set by the sea-surface temperature.
:::
:::

::: exercise Cooling to saturation {level=2 check="7.3"}
Air at $15\ ^\circ\mathrm{C}$ with a relative humidity of $60\%$ is cooled at constant pressure. To what temperature, in $^\circ\mathrm{C}$, must it be cooled to saturate?
::: solution
$e = 0.6\times17.0 = 10.2\ \mathrm{hPa}$, and the dew point is the temperature at which $e_s = 10.2$: $T_d = 243.12\ln(10.2/6.112)/(17.62 - \ln(10.2/6.112)) = 243.12\times0.512/17.11 = 7.3\ ^\circ\mathrm{C}$. So it must be cooled by $7.7\ \mathrm{K}$ to $7.3\ ^\circ\mathrm{C}$.
:::
:::

::: exercise Precipitable water {level=2 check="33"}
The vapour pressure at the surface is $20.6\ \mathrm{hPa}$ at $25\ ^\circ\mathrm{C}$ and the vapour density decreases with a scale height of $2.2\ \mathrm{km}$. Find the precipitable water, in mm.
::: solution
The surface vapour density is $\rho_v = e/(R_vT) = 2058/(461.5\times298) = 0.0150\ \mathrm{kg\,m^{-3}}$. Integrating the exponential gives a column of $0.0150\times2200 = 33\ \mathrm{kg\,m^{-2}}$, that is $33\ \mathrm{mm}$ of precipitable water. A mid-latitude air mass typically holds $15$–$25\ \mathrm{mm}$ and a tropical one $40$–$55\ \mathrm{mm}$; a heavy rainstorm rains out a third of its column in a few hours, which is only possible because the wind replaces the vapour continuously.
:::
:::

::: exercise Deriving the LCL rule {level=3}
Starting from the dry adiabatic lapse rate and the Magnus formula, show that the dew point of a rising parcel falls at about $1.8\ \mathrm{K\,km^{-1}}$, and derive the $125\ \mathrm{m\,K^{-1}}$ rule. How much does the rule err at $0\ ^\circ\mathrm{C}$ and at $35\ ^\circ\mathrm{C}$?
::: solution
For a parcel rising dry-adibatically, $\mathrm{d}T/\mathrm{d}z = -\Gamma_d = -9.8\ \mathrm{K\,km^{-1}}$ and $w$ is constant, so $e$ falls in proportion to the pressure. Along a mixing line,
$$
\frac{\mathrm{d}\ln e}{\mathrm{d}z} = \frac{\mathrm{d}\ln p}{\mathrm{d}z} = -\frac{1}{8000}\ \mathrm{m^{-1}},
$$
while the dew point follows $\mathrm{d}\ln e_s/\mathrm{d}T = 17.62\times243.12/(243.12+T)^2$, which at $15\ ^\circ\mathrm{C}$ is $0.0629\ \mathrm{K^{-1}}$. Hence $\mathrm{d}T_d/\mathrm{d}z = (1/8000)/0.0629 = 1.99\ \mathrm{K\,km^{-1}}$, and the closure rate is $9.8-1.99 = 7.8\ \mathrm{K\,km^{-1}}$, giving $128\ \mathrm{m\,K^{-1}}$.

At $35\ ^\circ\mathrm{C}$ the derivative is $0.0525\ \mathrm{K^{-1}}$, the dew point falls at $2.4\ \mathrm{K\,km^{-1}}$ and the rule becomes $137\ \mathrm{m\,K^{-1}}$; at $0\ ^\circ\mathrm{C}$ it is $0.0749$, the rate $1.67$, and the rule $1/(9.8-1.67) = 123\ \mathrm{m\,K^{-1}}$. The rule is good to about $10\%$ over the whole range, which is why it survives in every forecasting office in the world, and why it fails only in very dry air, where the assumption of constant $w$ and the neglect of the temperature dependence of $L_v$ add up.
:::
:::

::: exercise The wet-bulb limit {level=3}
A person at rest produces $100\ \mathrm{W}$ of metabolic heat and has a skin area of $1.7\ \mathrm{m^2}$. Show that at a wet-bulb temperature of $35\ ^\circ\mathrm{C}$ the required evaporation rate is about $0.6\ \mathrm{litre}$ per hour, and discuss why this is the limit.
::: solution
At a wet-bulb temperature equal to the skin temperature there is no sensible heat loss and no radiative loss to the surroundings, so all $100\ \mathrm{W}$ must leave as latent heat:
$$
\dot m = \frac{100}{2.45\times10^6} = 4.1\times10^{-5}\ \mathrm{kg\,s^{-1}} = 0.15\ \mathrm{kg\,h^{-1}},
$$
which for a whole body at work, producing $400\ \mathrm{W}$, is $0.6\ \mathrm{litre\,h^{-1}}$. That is within the range of human sweat rates, but only just, and only in the shade and only for the young and fit; the maximum sustained sweat rate is about $1.5\ \mathrm{litre\,h^{-1}}$ and it cannot be maintained for hours without loss of salt and circulation. The limit is therefore not a hard thermodynamic wall but a physiological one, and the observed threshold for a rise in mortality is a wet-bulb temperature of $31$–$33\ ^\circ\mathrm{C}$, not $35$.

The significance for climate is that the wet-bulb temperature rises at about $0.5\ \mathrm{K}$ per kelvin of surface warming in the humid tropics, so a $2\ \mathrm{K}$ warming moves a $31\ ^\circ\mathrm{C}$ wet-bulb afternoon to the survivability limit. The Indus and Ganges plains, the Persian Gulf and the North China Plain hold several hundred million people for whom this is not a hypothetical.
:::
:::
