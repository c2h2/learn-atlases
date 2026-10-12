The hottest hour of a summer day is four in the afternoon and the coldest is half past four in the morning, and neither is when the Sun says so. The sky is blue and the sunset red for a reason that fits in one line of algebra. The Earth receives from the Sun enough energy every hour to run the world's civilisation for a year, and yet its average temperature has stayed within a couple of degrees for the whole of human history — until the last sixty years. All of these are the same subject: radiation, and what happens to it.

::: definition The two spectra {#def-spectra}
Every body radiates with a spectrum set only by its temperature. The wavelength of maximum emission is given by **Wien's displacement law**,
$$
\lambda_\text{max} = \frac{2898}{T}\ \mu\mathrm{m},
$$
and the total flux by the **Stefan–Boltzmann law**, $E = \sigma T^4$ with $\sigma = 5.67\times10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}}$. The Sun, at $5772\ \mathrm{K}$, peaks at $0.50\ \mu\mathrm{m}$ in the visible and emits $6.3\times10^{7}\ \mathrm{W\,m^{-2}}$ from its surface; the Earth, at $288\ \mathrm{K}$, peaks at $10.1\ \mu\mathrm{m}$ in the thermal infrared and emits $390\ \mathrm{W\,m^{-2}}$. The two spectra barely overlap, and that non-overlap is the whole of the greenhouse effect.
:::

::: example The planetary budget {#ex-budget}
The solar constant is $S_0 = 1361\ \mathrm{W\,m^{-2}}$ and the planetary albedo $0.30$. Find the globally and annually averaged absorbed solar flux, the effective radiating temperature of the Earth, and the size of the greenhouse effect.
::: solution
The Earth intercepts sunlight over a disc of area $\pi R^2$ and radiates over a sphere of area $4\pi R^2$, so the mean absorbed flux is
$$
\overline{F} = \frac{S_0(1-\alpha)}{4} = \frac{1361\times0.70}{4} = 238\ \mathrm{W\,m^{-2}}.
$$
Setting this equal to the emitted flux gives the **effective radiating temperature**, the temperature of the level from which the planet radiates to space:
$$
T_e = \left(\frac{238}{5.67\times10^{-8}}\right)^{1/4} = 255\ \mathrm{K}.
$$
The surface is $288\ \mathrm{K}$, so the greenhouse effect is $33\ \mathrm{K}$. Of the $340\ \mathrm{W\,m^{-2}}$ of sunlight reaching the top of the atmosphere, $100$ is reflected — $77$ by clouds and aerosol, $23$ by the surface — $78$ is absorbed in the atmosphere, mostly by water vapour and ozone and a little by cloud and aerosol, and $160$ is absorbed at the surface. The surface loses $396\ \mathrm{W\,m^{-2}}$ by radiation upward and gains $342$ back from the atmosphere, a net longwave loss of only $54$, plus $80$ of latent heat and $24$ of sensible heat. The atmosphere, in turn, gains that $160$ of net longwave, the $78$ of solar and the $104$ of turbulent heat, and loses $342$ downward and $196$ to space.

The number to remember is that the surface receives and returns about five times as much radiation as it exchanges by turbulence, and that the atmosphere returns to the surface nearly twice the energy the surface receives from the Sun.
:::
:::

## What the air lets through

::: proposition Selective absorption and the greenhouse {#prop-greenhouse}
Nitrogen and oxygen, being homonuclear, have no dipole moment and are transparent through the whole of the terrestrial range. The greenhouse gases — water vapour, carbon dioxide, ozone, methane, nitrous oxide, CFCs — absorb in bands: water vapour by rotation below $20\ \mu\mathrm{m}$ and at $6.3$ and $12\ \mu\mathrm{m}$, carbon dioxide at $15$ and $4.3\ \mu\mathrm{m}$, ozone at $9.6$, methane at $7.7$, nitrous oxide at $7.8$ and $17$. Between $8$ and $13\ \mu\mathrm{m}$ lies the **atmospheric window**, through which the surface sees space directly and through which the planet cools most efficiently. For a grey atmosphere in radiative equilibrium the temperature profile is the Eddington form
$$
T^4 = \tfrac{1}{2}T_e^4\left(1 + \tfrac{3}{4}\tau\right),
$$
where $\tau$ is the infrared optical depth measured from the top. The surface, at $\tau = \tau_s$, is warmer than the emitting level by the factor $\left[\tfrac{1}{2}(1+\tfrac{3}{4}\tau_s)\right]^{1/4}$, and the Earth's $\tau_s$ is $1.5$.
:::

::: proof
Radiative equilibrium means that at every level the upward and downward fluxes are each constant, so the net flux $F$ is independent of height. In the two-stream (Eddington) approximation the upward flux at optical depth $\tau$ is $F = \sigma T^4(\tau)\left[\tfrac{1}{2} + \tfrac{\sqrt{3}}{4}\right] + \tfrac{\sqrt{3}}{4}\sigma T^4(\tau)$ balanced against the diffuse incoming, and the standard manipulation gives $T^4(\tau) = \tfrac{1}{2}T_e^4(1 + \tfrac{3}{4}\tau)$, subject to $T^4 = T_e^4$ at $\tau = \tfrac{2}{3}$, the level from which the radiation escapes.

At the top, $\tau = 0$, the skin temperature is $214\ \mathrm{K}$ — the temperature of a black plate in space, and the temperature of the lunar surface at the subsolar point's equilibrium. At the surface, $\tau_s = 1.5$ gives $T_s = 255\times(1.625)^{1/4} = 287\ \mathrm{K}$, which is the observed value, obtained from one parameter.

The proof also answers the oldest objection to the greenhouse theory, that the carbon dioxide bands are already "saturated" so that more carbon dioxide can absorb no more. In the grey model the surface temperature depends on the total optical depth, not on whether a particular band absorbs more of the surface's radiation; adding carbon dioxide raises $\tau$, and the level from which the planet radiates, which is at $\tau \approx \tfrac{2}{3}$, moves upward into colder air. Since that level must still emit $238\ \mathrm{W\,m^{-2}}$, and it is now colder, the column below it must warm until the emission is restored. The measured forcing of a doubling of carbon dioxide is $3.7\ \mathrm{W\,m^{-2}}$, and the $3.3\ \mathrm{W\,m^{-2}}$ imbalance now observed at the top of the atmosphere is the fingerprint of the increase so far. ∎
:::

::: widget plot
f: 255*(0.5*(1+1.5*t))^0.25
x: 0, 4
y: 200, 340
sliders: t=1.5:0:4
labels: surface temperature (K)
caption: The surface temperature of a grey atmosphere as a function of its infrared optical depth, from the Eddington form above. The Earth sits at $\tau = 1.5$ and $287\ \mathrm{K}$; a bare rock with no atmosphere is at $214\ \mathrm{K}$, the temperature of the Moon's subsolar point. The sensitivity is largest where the curve is steepest, at low optical depth, and falls off as $\tau^{1/4}$ — which is why the greenhouse effect is a diminishing-returns phenomenon in this simplest of models, and why the feedbacks, not the carbon dioxide itself, decide how much the planet warms.
:::

::: example Why the sky is blue and the sunset red {#ex-blue}
Rayleigh scattering by molecules has an optical depth proportional to $\lambda^{-4}$. Find the ratio of the scattering of violet light at $0.42\ \mu\mathrm{m}$ to that of red at $0.65\ \mu\mathrm{m}$, and explain why the sky is not violet.
::: solution
The ratio is $(0.65/0.42)^4 = 3.5$. Sunlight crossing the whole atmosphere at the horizon is attenuated in the blue by a factor of order $e^{-\tau_\text{blue}}$ with $\tau_\text{blue}\approx 0.1\times(0.55/0.42)^4\times$(air mass); at an air mass of $38$ (the horizon) the blue optical depth is about $9$ and the red about $1.5$, so the direct beam loses nearly all its blue and reaches the eye orange or red.

The sky is not violet for three reasons: the Sun emits less violet than blue, the eye is far less sensitive at $0.42\ \mu\mathrm{m}$ than at $0.47$, and the upper atmosphere's ozone absorbs in the Chappuis bands. The scattered light we see is a blue the eye reads as blue. The same $\lambda^{-4}$ law explains why the twilight after a volcanic eruption lasts for days and why the sky over a polluted city is white: aerosols are comparable in size to the wavelength, and their scattering (Mie, or geometric) is nearly independent of wavelength, which is why clouds are white and their bases grey.
:::
:::

::: svg
caption: The two spectra and the window. The smooth curves are the Planck distributions of the Sun at 5772 K and the Earth at 288 K, drawn on the same scale of relative intensity; the shaded columns are where the atmosphere absorbs. The Sun's energy arrives in a range the atmosphere is largely transparent to, and the Earth's tries to leave in a range it is not, except in the 8-13 micrometre window. The labels mark the main bands: water vapour at 6.3 and beyond 20 micrometres, carbon dioxide at 15, ozone at 9.6, methane at 7.7.
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Solar and terrestrial spectra with absorption bands">
  <style>
    .ax { stroke: var(--ink-2); stroke-width: 1.2; fill: none; }
    .sun { stroke: var(--series-2); stroke-width: 2.4; fill: none; }
    .ear { stroke: var(--series-1); stroke-width: 2.4; fill: none; }
    .band { fill: var(--series-3); opacity: 0.22; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 10.5px; }
  </style>
  <rect class="band" x="150" y="40" width="34" height="210"/>
  <rect class="band" x="252" y="40" width="26" height="210"/>
  <rect class="band" x="330" y="40" width="40" height="210"/>
  <rect class="band" x="470" y="40" width="120" height="210"/>
  <line class="ax" x1="70" y1="250" x2="720" y2="250"/>
  <line class="ax" x1="70" y1="40" x2="70" y2="250"/>
  <path class="sun" d="M70,246 C110,120 140,48 175,52 C215,58 260,120 320,180 C390,238 480,248 720,250"/>
  <path class="ear" d="M70,250 C220,249 330,244 400,214 C440,192 470,178 500,182 C540,190 590,214 660,232 C690,240 710,246 720,248"/>
  <text class="sub" x="150" y="34">water vapour 6.3</text>
  <text class="sub" x="240" y="34">methane 7.7</text>
  <text class="sub" x="322" y="34">ozone 9.6</text>
  <text class="sub" x="486" y="34">carbon dioxide 15 micrometres</text>
  <text class="sub" x="392" y="270">8-13 micrometre window</text>
  <text class="lab" x="120" y="80">Sun, 5772 K</text>
  <text class="lab" x="520" y="170">Earth, 288 K</text>
  <text class="sub" x="74" y="264">0.2</text><text class="sub" x="390" y="264">10</text><text class="sub" x="648" y="264">100 micrometres</text>
</svg>
:::

## The surface energy budget

::: definition The budget {#def-surface-budget}
The surface obeys conservation of energy:
$$
R_n = H + LE + G,
$$
where $R_n$ is the net radiation (net shortwave plus net longwave), $H$ the sensible heat flux to the air, $LE$ the latent heat flux of evaporation or sublimation ($L = 2.45\ \mathrm{MJ\,kg^{-1}}$ for water), and $G$ the conductive flux into the ground. The **Bowen ratio** $\beta = H/LE$ measures how the surface divides its available energy between heating the air and evaporating water: $0.1$ over an irrigated field or a lake, $0.6$ over grass, $3$ over dry bare soil, $5$ or more over a desert or a city, and $-1$ to $0$ over a freezing surface. The **evaporative fraction** $LE/(H+LE)$ is its complement, and it is the single number that distinguishes a humid climate from an arid one with the same radiation.
:::

::: example Closing the budget {#ex-close-budget}
At a grass site the net radiation is $480\ \mathrm{W\,m^{-2}}$, the soil heat flux $40\ \mathrm{W\,m^{-2}}$, and the latent heat flux $300\ \mathrm{W\,m^{-2}}$. Find the sensible heat flux, the Bowen ratio, and the rate of evaporation in $\mathrm{mm\,day^{-1}}$.
::: solution
$H = 480 - 40 - 300 = 140\ \mathrm{W\,m^{-2}}$, and $\beta = 140/300 = 0.47$. The evaporation rate is
$$
E = \frac{LE}{L\rho_w} = \frac{300}{2.45\times10^6\times1000}\ \mathrm{m\,s^{-1}} = 1.22\times10^{-7}\ \mathrm{m\,s^{-1}} = 10.6\ \mathrm{mm\,day^{-1}}.
$$
That is a high but attainable rate for a well-watered grass or crop in full sun. The same $300\ \mathrm{W\,m^{-2}}$ over a desert, where $LE$ might be $40\ \mathrm{W\,m^{-2}}$ and $H$ $400$, would evaporate $1.4\ \mathrm{mm\,day^{-1}}$ and heat the air instead — which is why the isotherms on a weather map bulge over arid continents in summer, and why irrigation cools a valley: the energy that would have made a hot afternoon is spent evaporating water instead. The estimated $0.5$–$1\ ^\circ\mathrm{C}$ of cooling from irrigation in the Central Valley of California and the Punjab is a real, if local, offset to greenhouse warming.
:::
:::

::: warning Heat, temperature, and the two things called "the greenhouse"
Three confusions do a great deal of work in this subject. **Heat is not temperature**: a bath at $40\ ^\circ\mathrm{C}$ contains a million times the heat of a spark at $1000\ ^\circ\mathrm{C}$, and the thermosphere's thousand degrees is not warmth. **The greenhouse effect is not the reason the sky is blue**: scattering changes the direction of light, absorption and re-emission change its wavelength and its residence time, and the two have nothing to do with each other. And **the glass greenhouse is not a greenhouse**: glass stops rain and blocks the exchange of air with the outside, and a pane of glass that let the air circulate would stay nearly as warm, because the warming of a greenhouse is mostly the suppression of convection, not the trapping of radiation. The atmosphere has no glass and no lid; it slows the loss of energy by radiating back downward from cold air, and the argument for it must be made in the terms of the proposition above, not by analogy with a garden structure.
:::

## The daily and seasonal cycles

::: proposition The temperature wave and its lag {#prop-lag}
Both the surface and the air respond to a periodic forcing with a damped wave. For the soil, with a thermal diffusivity $\kappa \approx 5\times10^{-7}\ \mathrm{m^2\,s^{-1}}$, the solution of the heat equation for a sinusoidal surface temperature of period $P$ is
$$
T(z,t) = \overline{T} + A\,e^{-z/D}\cos\left(\frac{2\pi t}{P} - \frac{z}{D}\right), \qquad D = \sqrt{\frac{\kappa P}{\pi}},
$$
with a **damping depth** $D$ of $13\ \mathrm{cm}$ for the daily wave and $2.2\ \mathrm{m}$ for the annual one, and a phase lag of $z/D$ radians. Below about $10\ \mathrm{m}$ the annual wave is damped to a few per cent and the ground sits at the mean annual air temperature, which is why a cellar is cool in summer and warm in winter, why a wine cellar's temperature is the local climate averaged, and why the geothermal gradient can be measured at all only below the reach of the seasons.
:::

::: example The lag of the seasons {#ex-seasonal-lag}
The solstice is on 21 June and the warmest part of the year in the Northern Hemisphere is the last week of July. Explain quantitatively, and account for the difference between hemispheres.
::: solution
The surface has a heat capacity that must be filled as well as filled again, so its temperature lags its forcing by about a quarter of the forcing period when the damping is strong — for the annual wave, roughly six weeks, which is exactly the observed lag of late July behind the solstice. The same lag appears in the soil wave: at the depth $z = D$ the phase lag is one radian, $P/2\pi = 2$ months, and the amplitude is down to $37\%$; at $2.2\ \mathrm{m}$ the warmest month is January, six months out of step with the air above.

The two hemispheres are not symmetric. The Northern Hemisphere is $39\%$ ocean and the Southern $81\%$, and the ocean's mixed layer has a heat capacity per unit area about a thousand times that of the air above it and mixes downward, so the Southern Hemisphere's annual temperature range at the surface is $5.7\ ^\circ\mathrm{C}$ against the Northern $11.6\ ^\circ\mathrm{C}$, its warmest month is January–February with a longer lag, and its climate is, in every sense, more maritime. The same effect on a smaller scale gives the coast its cool summers and mild winters, and gives a large city, whose walls and roads are metres of thermal mass with a diffusivity like the soil's, a lag of its own and a heat island of $2$–$5\ ^\circ\mathrm{C}$ at night.
:::
:::

::: example Forecasting the minimum {#ex-minimum}
On a clear, calm night the surface loses $70\ \mathrm{W\,m^{-2}}$ of net longwave. The air is at $8\ ^\circ\mathrm{C}$ with a dew point of $2\ ^\circ\mathrm{C}$. Will there be a radiation fog, and will there be a ground frost?
::: solution
The air must be cooled to its dew point, $6\ \mathrm{K}$, for fog to form. Cooling the lowest $50\ \mathrm{m}$ of air by $6\ \mathrm{K}$ requires removing
$$
\rho c_p\,\Delta z\,\Delta T = 1.2\times1005\times50\times6 = 3.6\times10^5\ \mathrm{J\,m^{-2}},
$$
which at $70\ \mathrm{W\,m^{-2}}$ takes $1.4$ hours of pure radiative cooling of a still layer — but the layer deepens as it cools and the cooling rate at the surface is $1$–$2\ \mathrm{K}$ per hour in the first hours after sunset, so the practical rule is that fog needs several hours of clear calm and a dew-point depression of less than about $5\ \mathrm{K}$. With $6\ \mathrm{K}$ of depression and a light wind, fog is likely near a river by dawn.

Frost is a different matter: it needs the *surface*, not the air, to fall below $0\ ^\circ\mathrm{C}$. A radiating grass blade decouples from the air above the inversion and can be $5$–$8\ ^\circ\mathrm{C}$ colder than the screen temperature measured $1.25\ \mathrm{m}$ up, so a frost is forecast when the screen temperature is expected to fall to within a few degrees of freezing. This is why a still, clear night with a screen minimum of $3\ ^\circ\mathrm{C}$ kills the beans in the valley and spares the vines on the slope, and why orchards run wind machines and helicopters at $2\ \mathrm{a.m.}$ to bring down the air $200\ \mathrm{m}$ above the inversion, which may be $10\ \mathrm{K}$ warmer.
:::
:::

::: quiz
The Earth is closest to the Sun in early January. Why is it winter in the Northern Hemisphere then?
- [ ] Because the atmosphere is thicker in winter and reflects more sunlight
- [x] Because the seasons are set by the tilt of the axis, not the distance, and the northern winter coincides with perihelion
- [ ] Because the Moon's gravity alters the orbit
- [ ] It is a coincidence with no effect on climate
::: solution
The distance varies by $3.4\%$ over the year, changing the insolation by $7\%$, and the effect is global and opposite in the two hemispheres, so it cannot produce the seasons. The tilt of $23.4^\circ$ controls both the height of the Sun and the length of the day, and the daily-mean insolation curve in the widget above shows the result: at the June solstice the Arctic receives more energy per day than the equator. The residual effect of the orbital eccentricity is that the Southern Hemisphere's seasons are slightly more extreme than the Northern, and that the Northern Hemisphere receives $6\%$ more insolation in January than the Southern does in July — a fact that, combined with the distribution of land and sea, is central to the theory of the ice ages in [[palaeoclimate/orbital-cycles]].
:::
:::

::: widget plot
f: (1361/pi)*(acos(clamp(-tan(x)*tan(d),-1,1))*sin(x)*sin(d)+cos(x)*cos(d)*sin(acos(clamp(-tan(x)*tan(d),-1,1))))
x: -1.57, 1.57
y: 0, 600
sliders: d=0.409:-0.409:0.409
labels: insolation (W/m2)
caption: The daily-mean insolation at the top of the atmosphere against latitude, with the solar declination set by the slider in radians ($0.409$ is the June solstice, $0$ the equinox, $-0.409$ the December solstice). The striking feature is that in June the Arctic receives $540\ \mathrm{W\,m^{-2}}$ as a daily mean and the equator only $397$: the midnight Sun delivers more energy in a day than the tropics do, because twenty-four hours of a low Sun beat twelve hours of a high one. The seasons exist because of the $23.4^\circ$ tilt, not the distance from the Sun — the Earth is nearest the Sun on 3 January, in the northern winter — and the whole of the annual march of the pressure belts, the monsoon and the storm tracks is the atmosphere's response to this curve and its migration with the slider.
:::

::: history
Horace-Bénédict de Saussure built stacked glass boxes in the Alps in the 1760s and reached $88\ ^\circ\mathrm{C}$ in one, and wondered what kept the Earth warm. Joseph Fourier supplied the answer in 1824 in a memoir to the Académie des Sciences: the globe is "like an enclosure in which the rays of light penetrate with difficulty and in which the heat finds more and more resistance to its escape", and he noted that the calculated temperature of a bare Earth was far below the observed one. John Tyndall, in a series of lectures and papers of 1861–1864, measured the absorption of the gases with a thermopile and a rock-salt column, showed that water vapour and carbon dioxide do it and nitrogen and oxygen do not, and named water vapour "our blanket". Svante Arrhenius, motivated by the ice ages and working with the crude monthly data of the 1890s, computed that halving the carbon dioxide would cool the globe by $4$–$5\ ^\circ\mathrm{C}$ and that doubling it would warm it by $5$–$6$ — a number that has survived every refinement since. The blue sky was explained by Lord Rayleigh in 1871 against an older theory of suspended water droplets, and the argument was settled in part by Einstein's 1910 theory of critical opalescence, which showed how density fluctuations scatter light. The consequence of the invisible gases was written in the fog: the December 1952 London fog killed some $12{,}000$ people over five days and produced the Clean Air Act of 1956, the first law in the world that regulated the air on the strength of chemistry.
:::

## Where this leads

The radiative transfer treated here in grey approximation is done properly in [[atmospheric-dynamics/radiative-transfer]]; the same budget at the surface, with turbulence and the boundary layer, is in [[atmospheric-dynamics/boundary-layer]] and [[hydrology/precipitation-evaporation]]; the global average of this chapter's arithmetic is [[climate-system/energy-budget]] and [[climate-system/greenhouse-effect]]; the scattering aerosols are in [[atmospheric-chemistry/aerosols]]; and the orbital geometry behind the insolation widget is the subject of [[palaeoclimate/orbital-cycles]].

::: summary Key takeaways
- The Sun radiates at 5772 K and peaks at 0.5 micrometres; the Earth at 288 K and peaks at 10.1. The non-overlap of the two spectra is the greenhouse effect.
- The planet absorbs 238 W/m2, radiates at an effective temperature of 255 K, and keeps its surface 33 K warmer by returning 342 W/m2 downward from cold air.
- Only gases with a dipole absorb in the infrared; the 8-13 micrometre window is how the Earth cools, and the greenhouse gases work by closing it.
- "Saturation" is not a refutation: adding carbon dioxide raises the emitting level into colder air, and the column warms until the outgoing flux is restored.
- The surface splits its net radiation between sensible heat, latent heat and the ground, and the Bowen ratio tells you whether you are standing in a desert, a field or a city.
- Temperature lags radiation: four in the afternoon, late July, and 71 cm down in the soil, because heat capacity must be filled before it can be felt.
- Rayleigh scattering goes as the fourth power of the inverse wavelength, and gives the blue sky, the red sunset and the long twilight; aerosol scattering is grey and gives the white cloud and the hazy horizon.
:::

## Exercises

::: exercise Wien and Stefan-Boltzmann {level=1 check="9.7"}
Find the wavelength of peak emission, in micrometres, of a surface at $300\ \mathrm{K}$.
::: solution
$\lambda_\text{max} = 2898/300 = 9.7\ \mu\mathrm{m}$, in the atmospheric window, which is why a thermal camera works and why a thermometer can read a forehead from a distance.
:::
:::

::: exercise Emitted flux {level=1 check="459"}
Find the flux emitted by a surface at $300\ \mathrm{K}$, in $\mathrm{W\,m^{-2}}$.
::: solution
$E = 5.67\times10^{-8}\times300^4 = 459\ \mathrm{W\,m^{-2}}$ for a black body; with an emissivity of $0.97$ for water or vegetation, $445\ \mathrm{W\,m^{-2}}$. A $10\ \mathrm{K}$ error in temperature is $13\%$ in flux, which is why thermal remote sensing is delicate.
:::
:::

::: exercise Albedo {level=1 check="255"}
If the planetary albedo rose from $0.30$ to $0.35$, find the new effective radiating temperature, in kelvin.
::: solution
$\overline{F} = 1361\times0.65/4 = 221\ \mathrm{W\,m^{-2}}$, and $T_e = (221/5.67\times10^{-8})^{1/4} = 250\ \mathrm{K}$. A five-point albedo change is $5\ \mathrm{K}$ of cooling, which is why the growth of sea ice and of snow cover is a feedback of the first importance, and why the loss of Arctic summer ice is estimated to have added $0.2$–$0.3\ \mathrm{W\,m^{-2}}$ of forcing since 1980.
:::
:::

::: exercise Scattering {level=1 check="3.5"}
Find the ratio of the Rayleigh scattering of $0.42\ \mu\mathrm{m}$ light to that of $0.65\ \mu\mathrm{m}$ light.
::: solution
$(0.65/0.42)^4 = 3.5$. The eye's sensitivity partly compensates, which is why the sky looks blue rather than violet.
:::
:::

::: exercise Evaporation {level=2 check="10.6"}
Find the evaporation rate, in $\mathrm{mm\,day^{-1}}$, equivalent to a latent heat flux of $300\ \mathrm{W\,m^{-2}}$.
::: solution
$300/(2.45\times10^6) = 1.22\times10^{-4}\ \mathrm{kg\,m^{-2}\,s^{-1}} = 1.22\times10^{-7}\ \mathrm{m\,s^{-1}}$, which is $10.6\ \mathrm{mm\,day^{-1}}$. A useful equivalence: $1\ \mathrm{mm\,day^{-1}}$ of evaporation is $11.6\ \mathrm{W\,m^{-2}}$, and $50\ \mathrm{W\,m^{-2}}$ of latent heat is a fourth of a millimetre a day.
:::
:::

::: exercise Soil wave {level=2 check="2.24"}
Find the damping depth of the annual temperature wave in soil with $\kappa = 5\times10^{-7}\ \mathrm{m^2\,s^{-1}}$, in metres, and the depth at which the warmest month is January.
::: solution
$$
D = \sqrt{\frac{\kappa P}{\pi}} = \sqrt{\frac{5\times10^{-7}\times3.16\times10^{7}}{\pi}} = \sqrt{5.02} = 2.24\ \mathrm{m}.
$$
The phase lag is $z/D$ radians, so a lag of $\pi$ — half a year — occurs at $z = \pi D = 7.0\ \mathrm{m}$, where the amplitude is $e^{-\pi} = 4\%$ of the surface value. The daily wave in the same soil has $D = 12.6\ \mathrm{cm}$, which is why a thermometer at $30\ \mathrm{cm}$ reads a steady afternoon value and one at $1\ \mathrm{m}$ reads only the season.
:::
:::

::: exercise The grey atmosphere {level=2 check="291"}
Using the Eddington grey model, find the surface temperature for an infrared optical depth of $2.0$ and $T_e = 255\ \mathrm{K}$.
::: solution
$T_s = 255\times\left[\tfrac12(1+1.5\times2.0)\right]^{1/4} = 255\times(2.0)^{1/4} = 255\times1.189 = 303\ \mathrm{K}$. A $33\%$ increase in the atmosphere's infrared opacity would warm the surface by $16\ \mathrm{K}$ in this model, which has no feedbacks; the real climate's water-vapour and ice feedbacks roughly triple the response to a forcing, and the planck and lapse-rate feedbacks are why the estimate is not $16\ \mathrm{K}$ for a carbon dioxide doubling.
:::
:::

::: exercise Deriving the daily lag {level=3}
Model the surface temperature of the day as $C\,\mathrm{d}T/\mathrm{d}t = a - b\cos(2\pi t/P) - cT$, where $a - b\cos$ is the net radiation and $cT$ the loss to the air. Show that the temperature is a sinusoid with a phase lag $\phi = \arctan(2\pi C/(cP))$, and estimate the lag for a $10\ \mathrm{m}$ layer of air with $C = \rho c_p \times 10$ and $c = 10\ \mathrm{W\,m^{-2}\,K^{-1}}$.
::: solution
The particular solution of the equation is $T = (a/c) + A\cos(2\pi t/P - \phi)$ with $\tan\phi = 2\pi C/(cP)$. With $C = 1.2\times1005\times10 = 1.2\times10^4\ \mathrm{J\,m^{-2}\,K^{-1}}$ and $P = 86400\ \mathrm{s}$,
$$
\tan\phi = \frac{2\pi\times1.2\times10^4}{10\times86400} = 0.087 \Longrightarrow \phi = 0.087\ \mathrm{rad},
$$
a lag of $0.087\times P/2\pi = 20$ minutes — far too small. The observed lag of three to four hours requires an effective $C$ two orders of magnitude larger, which is what the surface layer of soil, water, buildings and vegetation supplies: the air itself has almost no heat capacity and responds in minutes, and the lag we feel belongs to the ground. This is the reason the daily range is larger over dry, rocky or urban surfaces than over water or vegetation, and why the "feels like" temperature of a beach at nine in the evening is a property of sand, not of air.
:::
:::

::: exercise The urban heat island {level=3}
A city of $20\ \mathrm{km}$ radius has a daytime net radiation of $260\ \mathrm{W\,m^{-2}}$ against $160$ in the surrounding farmland, an evaporative fraction of $0.15$ against $0.65$, and a nocturnal release of stored heat of $60\ \mathrm{W\,m^{-2}}$. Estimate the difference in the daytime sensible heat flux and explain why the heat island is largest at night and in wind of less than $5\ \mathrm{m\,s^{-1}}$.
::: solution
Assuming the soil flux is $10\%$ of the net radiation in both cases, the city has $H = 0.9\times260\times0.85 = 199\ \mathrm{W\,m^{-2}}$ and the farmland $H = 0.9\times160\times0.35 = 50\ \mathrm{W\,m^{-2}}$ — four times as much heat put into the air per square metre. The city's air must therefore be several kelvin warmer to carry it away, and the observed difference of $2$–$5\ \mathrm{K}$ in screen temperature is consistent with this.

At night the farmland cools radiatively to its normal minimum while the city's walls and roads, having stored heat all day with a damping depth of tens of centimetres, release it at $50$–$100\ \mathrm{W\,m^{-2}}$, so the difference is largest in the hours before dawn, when it can reach $8$–$10\ \mathrm{K}$ in a calm clear anticyclone. Wind destroys the island by advecting the warm air away: the island's intensity scales roughly as the inverse of the wind speed, and the record heat islands are all from calm, clear, snow-covered surroundings, where the contrast of a $0\ ^\circ\mathrm{C}$ rural surface and a $10\ ^\circ\mathrm{C}$ city is visible on satellite imagery as an island of warmth in a white field.
:::
:::
