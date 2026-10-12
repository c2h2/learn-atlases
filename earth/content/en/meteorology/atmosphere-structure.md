The Kármán line, at $100\ \mathrm{km}$, is the convention by which the world agrees that space begins. It is $1.6\%$ of the Earth's radius. If the planet were a basketball, the atmosphere out to that line would be a film of varnish a fifth of a millimetre thick, and everything you have ever smelled, breathed, rained on, or been struck by lightning by happened in the bottom few kilometres of that film. Half the mass of the air is below $5.5\ \mathrm{km}$; the summit of Everest, at $8.8\ \mathrm{km}$, stands above two-thirds of it; and the airliner cruising at $11\ \mathrm{km}$ is in the top tenth by mass of the troposphere, in air at a quarter of sea-level pressure and $-55\ ^\circ\mathrm{C}$.

This chapter is about what that film is made of and how it is arranged — the chemistry, the fall of pressure with height, the layers defined by whether the temperature rises or falls, and the two or three equations that make all of it calculable. Everything later in this course — the cloud that forms at a computable height, the storm that draws its strength from a computable instability, the wind that blows along an isobar because the Earth turns — rests on the material here.

## What the air is

::: definition Composition {#def-composition}
Dry air below about $80\ \mathrm{km}$ is a mechanically mixed gas of constant proportions: nitrogen $78.08\%$, oxygen $20.95\%$, argon $0.93\%$, carbon dioxide $0.042\%$ ($420\ \mathrm{ppm}$ in the present atmosphere, and rising by about $2.5\ \mathrm{ppm}$ a year), neon, helium, methane, krypton, hydrogen and ozone at trace levels. Its mean molar mass is $28.97\ \mathrm{g\,mol^{-1}}$. Water vapour is the variable constituent, from $0.01\%$ in a cold Antarctic winter to $4\%$ in the tropics, and because water's molar mass is $18$, **moist air is lighter than dry air at the same pressure and temperature** — a fact with consequences for every wind and every cloud in this course. Above about $80\ \mathrm{km}$ mixing ceases and the **heterosphere** arranges itself by scale height, each gas with its own density profile, so that atomic oxygen dominates at $200\ \mathrm{km}$ and hydrogen at $1000\ \mathrm{km}$.
:::

::: example What is in a breath? {#ex-breath}
A tidal breath is $500\ \mathrm{cm^3}$ at $1013\ \mathrm{hPa}$ and $20\ ^\circ\mathrm{C}$. Find the number of molecules in it, the mass of carbon dioxide in it at $420\ \mathrm{ppm}$ by volume, and the mean free path of the molecules. Take the molecular diameter of air as $0.37\ \mathrm{nm}$.
::: solution
$$
n = \frac{PV}{RT} = \frac{101{,}325\times5\times10^{-4}}{8.314\times293} = 0.0208\ \mathrm{mol} \Longrightarrow 1.26\times10^{22}\ \text{molecules}.
$$
Of these, $420\times10^{-6}$ are carbon dioxide: $5.3\times10^{18}$ molecules, $3.9\times10^{-4}\ \mathrm{g}$. The mean free path is
$$
\lambda = \frac{kT}{\sqrt{2}\,\pi d^2 P} = \frac{1.38\times10^{-23}\times293}{1.414\times3.142\times(3.7\times10^{-10})^2\times101{,}325} = 6.6\times10^{-8}\ \mathrm{m},
$$
six hundredths of a micrometre, about two hundred molecular diameters. A molecule at the surface suffers some seven billion collisions a second. At $30\ \mathrm{km}$, where the pressure is $12\ \mathrm{hPa}$, the mean free path is $4\ \mu\mathrm{m}$; at $100\ \mathrm{km}$ it is a couple of centimetres, and at $500\ \mathrm{km}$ it is kilometres — which is where the whole idea of a continuous fluid, and therefore of weather, stops working.

The carbon dioxide number is worth holding on to. Every breath contains four hundred million million more carbon dioxide molecules than there are people on Earth, and the whole atmosphere contains $890\ \mathrm{Gt}$ of carbon as carbon dioxide — a quantity that human activity has increased by about $40\%$ since 1750, from $600$ to $890\ \mathrm{Gt\ C}$.
:::
:::

## Pressure, and why it falls exponentially

::: proposition Hydrostatic balance and the scale height {#prop-hydrostatic}
For a stationary atmosphere the vertical pressure force balances gravity,
$$
\frac{\mathrm{d}p}{\mathrm{d}z} = -\rho g,
$$
and with the ideal gas law $p = \rho R T$ this gives, for a constant temperature $T$,
$$
p = p_0\,e^{-z/H}, \qquad H = \frac{RT}{Mg} = \frac{R_d T}{g},
$$
where $H$ is the **scale height**, $8.4\ \mathrm{km}$ for $T = 288\ \mathrm{K}$. The real atmosphere is not isothermal, and the useful general form is the **hypsometric equation**,
$$
z_2 - z_1 = \frac{R_d \overline{T_\text{v}}}{g}\ln\frac{p_1}{p_2} = 67.4\,\overline{T_\text{v}}\log_{10}\frac{p_1}{p_2},
$$
with $\overline{T_\text{v}}$ the layer-mean virtual temperature in kelvin. The thickness of a pressure layer is therefore a direct measure of the temperature of the air in it, which is why upper-air charts are drawn as thickness maps.
:::

::: proof
Balance the forces on a slab of air of area $A$ and thickness $\mathrm{d}z$: the upward pressure force $pA$ at the base, the downward $(p + \mathrm{d}p)A$ at the top, and the weight $\rho g A\,\mathrm{d}z$. Setting the sum to zero gives $\mathrm{d}p = -\rho g\,\mathrm{d}z$. Substituting $\rho = p/(R_d T)$ and separating variables,
$$
\int_{p_0}^{p}\frac{\mathrm{d}p}{p} = -\frac{g}{R_d}\int_0^z\frac{\mathrm{d}z}{T},
$$
which for constant $T$ is the exponential, and in general is the hypsometric equation with $\overline{T}$ the layer mean of $1/T$ inverted. ∎

Two numbers follow and are used constantly. Pressure halves at about $5.5\ \mathrm{km}$, not at the scale height of $8.4\ \mathrm{km}$, because the temperature falls with height and the scale height is smaller in cold air. And the thickness of the $1000$–$500\ \mathrm{hPa}$ layer is $67.4\times\overline{T_\text{v}}\times0.301 = 20.3\,\overline{T_\text{v}}$ metres, so a layer mean of $0\ ^\circ\mathrm{C}$ gives $5540\ \mathrm{m}$ and of $+20\ ^\circ\mathrm{C}$ gives $6680\ \mathrm{m}$ — a difference of more than a kilometre between a cold and a warm column, and the reason the $500\ \mathrm{hPa}$ surface is lower over a cold air mass than over a warm one, which is the origin of the upper-air troughs and ridges that steer the surface weather.
:::

::: example The altimeter, and the temperature it assumes {#ex-altimeter}
A pilot sets the altimeter to read zero at a station where the pressure is $1013\ \mathrm{hPa}$ and the temperature $15\ ^\circ\mathrm{C}$, and climbs to a level where the pressure is $700\ \mathrm{hPa}$. The altimeter assumes the standard atmosphere, in which the $700\ \mathrm{hPa}$ level is at $3010\ \mathrm{m}$ and the mean layer temperature is $-6.5\ ^\circ\mathrm{C}$ per kilometre. If the actual layer is $25\ ^\circ\mathrm{C}$ warmer than standard, what is the true altitude?
::: solution
The altimeter reads the height corresponding to $700\ \mathrm{hPa}$ in the standard atmosphere: $3010\ \mathrm{m}$. The true thickness of the layer from the surface to $700\ \mathrm{hPa}$ is
$$
\Delta z = 67.4\,\overline{T_\text{v}}\log_{10}\frac{1013}{700} = 67.4\,\overline{T_\text{v}}\times0.1605 .
$$
The standard layer mean virtual temperature is $288 - 6.5\times1.5 = 278\ \mathrm{K}$, giving $3006\ \mathrm{m}$, consistent with the table. A layer $25\ \mathrm{K}$ warmer has $\overline{T_\text{v}} = 303\ \mathrm{K}$ and a thickness of $3277\ \mathrm{m}$.

The aircraft is therefore $270\ \mathrm{m}$ higher than the instrument says. The pilot's rule of thumb is "hot, look out below; cold, look out above" — in warm air the true altitude is greater than indicated, and in cold air the aircraft is lower than the dial, which is what crashed aircraft into high ground in cold-air outbreaks. The correction is $4\%$ of the height per $10\ ^\circ\mathrm{C}$ of departure from standard, and it is the reason cold-weather approaches at high-elevation airfields are flown with published corrections.
:::
:::

::: widget plot
f: 1013*exp(-x/(0.293*t))
x: 0, 30
y: 0, 1050
sliders: t=288:220:320
labels: pressure (hPa)
caption: Pressure against height for an isothermal atmosphere, with the layer temperature set by the slider in kelvin. The scale height is $H = R_d T/g$, so a cold column ($220\ \mathrm{K}$) is compressed — pressure falls to half by $4.5\ \mathrm{km}$ — and a warm one ($320\ \mathrm{K}$) is stretched, with the half-pressure level at $6.5\ \mathrm{km}$. This single dependence is why the $500\ \mathrm{hPa}$ chart has ridges over warm water and troughs over cold continents, why the tropopause is higher in the tropics than at the poles, and why an altimeter needs a temperature correction. The real curve is not exponential, because the temperature is not constant, but the shape and the sensitivity are right.
:::

::: example Density altitude, and why planes cannot get off the ground {#ex-density-altitude}
An airfield at $1600\ \mathrm{m}$ elevation has a pressure of $840\ \mathrm{hPa}$. Find the air density on a day at $35\ ^\circ\mathrm{C}$ and on a day at $5\ ^\circ\mathrm{C}$, the density altitude on the hot day, and the consequence for the take-off run.
::: solution
$$
\rho_\text{hot} = \frac{84{,}000}{287\times308} = 0.950\ \mathrm{kg\,m^{-3}}, \qquad
\rho_\text{cool} = \frac{84{,}000}{287\times278} = 1.052\ \mathrm{kg\,m^{-3}},
$$
a difference of $11\%$. The standard atmosphere at $1600\ \mathrm{m}$ has $1.044\ \mathrm{kg\,m^{-3}}$, so the hot day is $9\%$ less dense than standard. The pilot's rule — density altitude in feet equals pressure altitude in feet plus $120$ times the temperature departure from standard in $^\circ\mathrm{C}$ — gives, with $1600\ \mathrm{m} = 5250\ \mathrm{ft}$ and an ISA temperature of $4.6\ ^\circ\mathrm{C}$,
$$
5250 + 120\times(35-4.6) = 8900\ \mathrm{ft} = 2700\ \mathrm{m},
$$
and an isothermal calculation gives $2100\ \mathrm{m}$. Either way the aircraft must perform as though it were at $2100$–$2700\ \mathrm{m}$ rather than $1600\ \mathrm{m}$: the wing must fly $5$–$6\%$ faster for the same lift, the propeller gives $11\%$ less thrust, and the engine, on a naturally aspirated one, loses about $9\%$ of its power. The take-off run goes as the square of the lift-off speed, so it lengthens by $10$–$12\%$, and on a hot high day with a full load the runway may simply not be long enough.

The same physics explains the records at Mexico City ($2240\ \mathrm{m}$) and at Colorado Springs, the ball carrying further and the sprinter running faster in thin air because the drag is less, and the compensating loss of oxygen that makes the endurance event harder. Air density is a performance number in engineering and a physiological number in sport, and both follow from $\rho = p/RT$.
:::
:::

## The layers

::: definition The vertical structure {#def-layers}
The layers are defined by the sign of the temperature gradient. The **troposphere** runs from the surface to the **tropopause**, at $8\ \mathrm{km}$ over the poles and $16\ \mathrm{km}$ over the equator, with a mean lapse rate of $6.5\ \mathrm{K\,km^{-1}}$ and a tropopause temperature of $-57\ ^\circ\mathrm{C}$ in the tropics and $-45\ ^\circ\mathrm{C}$ at $60^\circ$ latitude; nearly all the water vapour and nearly all the weather are in it. The **stratosphere** warms with height, from ultraviolet absorption by ozone, to a **stratopause** at $50\ \mathrm{km}$ and about $270\ \mathrm{K}$; it is dry, stably stratified and cloud-free except for the polar stratospheric clouds of the winter polar vortex. The **mesosphere** cools again to a mesopause at $85\ \mathrm{km}$ and $-90\ ^\circ\mathrm{C}$, the coldest place in the atmosphere; the **thermosphere** warms to $1000$–$2000\ \mathrm{K}$ by the absorption of extreme ultraviolet radiation, and merges into the exosphere above $600\ \mathrm{km}$.
:::

::: svg
caption: The vertical structure of the atmosphere to the edge of space, drawn with a logarithmic pressure scale on the left. The temperature profile is the curve; the layers are named by its sign. The tropopause is the cold lid that caps the weather; the stratopause is the warm layer produced by ozone; the mesopause at 85 km is the coldest place on the planet, and the thermosphere's thousand-degree "temperature" is a statement about the energy of individual molecules in a gas so thin that a satellite in it would freeze, not melt. The right-hand marks are the heights of the features that live in it.
<svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vertical temperature profile of the atmosphere">
  <style>
    .ax { stroke: var(--ink-2); stroke-width: 1.2; fill: none; }
    .t { stroke: var(--series-1); stroke-width: 2.6; fill: none; }
    .grid { stroke: var(--rule); stroke-width: 1; }
    .band1 { fill: var(--accent-wash); }
    .band2 { fill: var(--info-wash); opacity: 0.6; }
    .band3 { fill: var(--warm-wash); opacity: 0.6; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
  </style>
  <rect class="band1" x="120" y="330" width="600" height="60"/>
  <rect class="band2" x="120" y="200" width="600" height="130"/>
  <rect class="band3" x="120" y="120" width="600" height="80"/>
  <line class="grid" x1="120" y1="330" x2="720" y2="330"/>
  <line class="grid" x1="120" y1="200" x2="720" y2="200"/>
  <line class="grid" x1="120" y1="120" x2="720" y2="120"/>
  <line class="ax" x1="120" y1="390" x2="720" y2="390"/>
  <line class="ax" x1="120" y1="30" x2="120" y2="390"/>
  <path class="t" d="M300,390 L240,330 L200,290 L215,250 L250,200 L290,160 L230,120 L200,90 L260,60 L340,40"/>
  <text class="sub" x="60" y="394">1013</text><text class="sub" x="70" y="334">200</text>
  <text class="sub" x="70" y="204">1</text><text class="sub" x="66" y="124">0.01</text><text class="sub" x="76" y="44">10⁻⁶</text>
  <text class="sub" x="124" y="408">height: 0, 11, 50, 85, 600 km (log pressure left)</text>
  <text class="lab" x="600" y="380">troposphere</text>
  <text class="sub" x="600" y="396">lapse rate 6.5 K/km</text>
  <text class="lab" x="600" y="250">stratosphere</text>
  <text class="sub" x="600" y="266">ozone heats the air</text>
  <text class="lab" x="600" y="160">mesosphere</text>
  <text class="sub" x="600" y="176">coldest place, -90 C</text>
  <text class="lab" x="600" y="70">thermosphere</text>
  <text class="sub" x="600" y="86">1000-2000 K, no heat</text>
  <text class="sub" x="130" y="322">tropopause 8-16 km</text>
  <text class="sub" x="130" y="192">stratopause 50 km, 270 K</text>
  <text class="sub" x="130" y="112">mesopause 85 km</text>
  <text class="sub" x="130" y="36">aurora 100-300 km · ISS 400 km · meteors 80-120 km</text>
  <text class="sub" x="130" y="52">ozone max 25 km · jets 9-12 km · clouds 0-15 km</text>
</svg>
:::

::: example The mass of the air, and of its water {#ex-mass}
The mean sea-level pressure is $1013.25\ \mathrm{hPa}$ and the Earth's radius $6371\ \mathrm{km}$. Find the mass of the atmosphere, the mass of its carbon dioxide at $420\ \mathrm{ppm}$ by volume, and the fraction of the planet's water that the atmosphere holds, given that the atmosphere contains $12{,}900\ \mathrm{km^3}$ of water and the oceans $1{,}338{,}000{,}000\ \mathrm{km^3}$.
::: solution
The weight of the column per unit area is the surface pressure, so
$$
M = \frac{p_\text{s}\times 4\pi R^2}{g} = \frac{101{,}325\times5.10\times10^{14}}{9.81} = 5.27\times10^{18}\ \mathrm{kg}.
$$
The carbon dioxide mass is that times the volume mixing ratio times the ratio of molar masses:
$$
5.27\times10^{18}\times4.2\times10^{-4}\times\frac{44}{28.97} = 3.4\times10^{15}\ \mathrm{kg} = 910\ \mathrm{Gt\ C}.
$$
The atmosphere holds $12{,}900/1.35\times10^{9} = 0.001\%$ of the planet's water — one part in a hundred thousand — and yet turns that whole inventory over about forty times a year, giving a residence time of nine days. That is the paradox of the atmospheric water cycle: the reservoir is negligible and the flux is enormous, which is why a three-day break in the rain matters to a farmer and why the atmosphere, not the ocean, is where the weather happens.
:::
:::

::: warning "Temperature in the thermosphere"
At $400\ \mathrm{km}$ the gas has a "temperature" of $1000\ \mathrm{K}$ and the International Space Station does not melt, because temperature is the mean kinetic energy per molecule and there are almost no molecules: $10^{11}$ per cubic centimetre against $10^{19}$ at the surface. An object there gains heat by absorbing solar radiation and loses it by radiating, and the balance gives it a temperature of tens of degrees, not a thousand. Conversely, the mesopause at $-90\ ^\circ\mathrm{C}$ is colder than anything on the surface but contains so little heat that a meteoroid passing through it is not cooled by it. In a rarefied gas, temperature and heat are different things, and the words are not interchangeable — which is also true, in a milder way, of the difference between air temperature and what you feel, which depends on humidity, wind and radiation.
:::

::: quiz
Two balloons of equal volume are filled, one with dry air and one with humid air, at the same pressure and temperature. Which is heavier?
- [ ] The humid one, because water adds mass
- [x] The dry one, because water vapour molecules are lighter than the nitrogen and oxygen they replace
- [ ] They are the same, by Avogadro's law
- [ ] It depends on the humidity
::: solution
At fixed pressure and temperature a given volume contains a fixed number of molecules, so replacing a molecule of mass $28$–$32$ with one of mass $18$ makes the parcel lighter. This is why moist air rises on its own, why the virtual temperature used in every stability calculation exceeds the actual temperature, and why a thunderstorm's inflow is buoyant before it has condensed anything.
:::
:::

::: history
The air became a physical object in 1643, when Torricelli's tube of mercury showed that we live at the bottom of an ocean of gas, and in 1648, when Pascal had Périer carry a barometer up the Puy-de-Dôme and found it reading lower at the top. Otto von Guericke's Magdeburg hemispheres of 1654 demonstrated the weight of the air to an audience, and Gay-Lussac's balloon ascents of 1804 carried a thermometer and a barometer to $7\ \mathrm{km}$ and established that temperature falls with height at a reproducible rate. In 1862 Coxwell and Glaisher rose to $11\ \mathrm{km}$ in a balloon without oxygen and lost consciousness at the top; three French aeronauts in 1875 died in the ascent, which is how the subject learned about anoxia. The ozone layer was inferred from the missing ultraviolet in the solar spectrum by Fabry and Buisson in 1913 and located by Chapman's photochemistry in 1930. The jet stream was discovered in the 1920s by Wasaburo Ochi, who tracked balloon-brown-paper balloons from Japan for two decades and found the westerlies at $10\ \mathrm{km}$, and independently by the pilots of the 1930s and the crews of B-29s in 1944; the radiosonde, flown operationally from 1929 by Molchanov in Moscow and by Muchlaidt in Germany, gave the sounding, and the V-2 rockets carried the first instruments above the stratopause. The $1950$ work of Charney and von Neumann, which turned the sounding into a forecast, is the subject of the last chapter.
:::

## Where this leads

The radiation that sets the temperature profile is in [[meteorology/radiation-temperature]] and in [[climate-system/energy-budget]]; the water vapour treated here as a trace gas is the whole subject of [[meteorology/moisture]]; the dynamics of the layers, the tropopause as a wave guide and the jet streams are in [[atmospheric-dynamics/general-circulation]] and [[atmospheric-dynamics/boundary-layer]]; the composition and the chemistry of ozone are in [[atmospheric-chemistry/stratospheric-ozone]]; and the long-term changes in composition in [[climate-system/forcing]].

::: summary Key takeaways
- The atmosphere is a well-mixed shell 100 km thick, 1.6% of the radius, with half its mass below 5.5 km and 99.9% below 30 km.
- Dry air is 78% nitrogen and 21% oxygen with a molar mass of 28.97 g/mol; water vapour at 18 g/mol makes moist air lighter, which is a driving term in convection.
- Pressure falls exponentially with a scale height of 8.4 km at 288 K, and the hypsometric equation makes the thickness of a pressure layer a thermometer.
- The layers are defined by the sign of the temperature gradient: the troposphere cools, the stratosphere warms on ozone, the mesosphere cools to the coldest place on Earth, and the thermosphere's high temperature is not heat.
- The atmosphere's mass is 5.3×10^18 kg, its carbon dioxide 910 Gt C, and its water 0.001% of the planet's — but turning over every nine days.
- Below 80 km the composition is fixed by mixing; above it, each gas has its own scale height.
- Altimeters, aircraft performance and the height of the 500 hPa surface all follow from the temperature dependence of the scale height.
:::

## Exercises

::: exercise Scale height {level=1 check="6.8"}
Find the scale height of an isothermal atmosphere at $-40\ ^\circ\mathrm{C}$, in km.
::: solution
$H = 287\times233/9.81 = 6810\ \mathrm{m}$, about $6.8\ \mathrm{km}$. Cold air is compressed, which is why the pressure surfaces are closer together in a cold air mass and why the altimeter reads high.
:::
:::

::: exercise Pressure at height {level=1 check="335"}
Using $H = 8.0\ \mathrm{km}$ appropriate to the cold air over Everest, find the pressure at $8849\ \mathrm{m}$ from a sea-level $1013\ \mathrm{hPa}$.
::: solution
$p = 1013\,e^{-8.849/8.0} = 1013\times0.331 = 335\ \mathrm{hPa}$, close to the observed $337\ \mathrm{hPa}$. The oxygen partial pressure is a third of sea level's, which is why the summit is beyond the limit of sustained human work without supplementary oxygen.
:::
:::

::: exercise Thickness {level=1 check="5540"}
Find the thickness of the $1000$–$500\ \mathrm{hPa}$ layer for a layer-mean virtual temperature of $0\ ^\circ\mathrm{C}$.
::: solution
$\Delta z = 67.4\times273\times\log_{10}2 = 67.4\times273\times0.301 = 5540\ \mathrm{m}$. A warm column with a mean of $+20\ ^\circ\mathrm{C}$ gives $5940\ \mathrm{m}$, four hundred metres thicker, and that difference in thickness is what appears on the upper-air chart as a ridge.
:::
:::

::: exercise Moist air {level=2 check="0.988"}
A parcel at $1000\ \mathrm{hPa}$ and $30\ ^\circ\mathrm{C}$ has a dew point of $25\ \mathrm{C}$. Estimate the vapour pressure as $32\ \mathrm{hPa}$ and find the ratio of the density of the moist air to that of dry air at the same pressure and temperature.
::: solution
The virtual temperature is $T_\text{v} = T(1 + 0.61q)$ with $q \approx 0.622\times32/1000 = 0.02$, so $T_\text{v} = 303\times1.012 = 306.6\ \mathrm{K}$ and the density ratio is $T/T_\text{v} = 0.988$. The moist parcel is $1.2\%$ lighter, which in a $2\ \mathrm{km}$-deep layer of moist air is worth about $25\ \mathrm{m}$ of buoyant height — enough to matter to a glider pilot and to a thunderstorm.
:::
:::

::: exercise Mean free path {level=2 check="4.4"}
Find the mean free path of an air molecule at $30\ \mathrm{km}$, where $p = 12\ \mathrm{hPa}$ and $T = 230\ \mathrm{K}$, in micrometres.
::: solution
$\lambda = 0.066\times(1013/12)\times(230/293) = 4.4\ \mu\mathrm{m}$. Cloud droplets are $10\ \mu\mathrm{m}$ in radius, so they are only a few mean free paths across — small enough that the drag on them is corrected by the Cunningham factor, which is why the terminal velocity formula of the precipitation chapter carries a slip correction.
:::
:::

::: exercise Altimetry {level=2 check="215"}
An aircraft at an indicated altitude of $3000\ \mathrm{m}$ flies through a layer $20\ ^\circ\mathrm{C}$ warmer than standard. Estimate the true altitude error, in metres.
::: solution
The thickness of a layer is proportional to its mean virtual temperature. The standard layer from the surface to $3000\ \mathrm{m}$ has a mean of $288 - 6.5\times1.5 = 278\ \mathrm{K}$; the warm layer has $298\ \mathrm{K}$. The true height is therefore
$$
3000\times\frac{298}{278} = 3215\ \mathrm{m},
$$
so the aircraft is $215\ \mathrm{m}$ higher than indicated. The rule of thumb of $4\%$ per $10\ ^\circ\mathrm{C}$ gives $240\ \mathrm{m}$, and the sign is what matters: in warm air the aircraft is higher than the dial, and in cold air it is lower, which is the accident.
:::
:::

::: exercise Deriving the hypsometric equation {level=3}
Derive the hypsometric equation from hydrostatic balance and the ideal gas law for a layer in which the temperature varies linearly with height, $T = T_1 - \gamma z$, and show that the layer-mean temperature to use is the logarithmic mean, not the arithmetic mean. How large is the error from using the arithmetic mean for a $1000$–$500\ \mathrm{hPa}$ layer with a surface temperature of $288\ \mathrm{K}$ and a lapse rate of $6.5\ \mathrm{K\,km^{-1}}$?
::: solution
With $T(z) = T_1 - \gamma z$,
$$
\ln\frac{p_1}{p_2} = \frac{g}{R_d}\int_0^{\Delta z}\frac{\mathrm{d}z}{T_1-\gamma z} = \frac{g}{R_d\gamma}\ln\frac{T_1}{T_1-\gamma\Delta z},
$$
so $\Delta z = (R_d/\gamma)(T_1 - T_2)$ — which is the same as the arithmetic-mean form, because for a linear profile the integral of $1/T$ is exactly $\Delta z$ divided by the logarithmic mean of the end temperatures. The arithmetic mean over-estimates the thickness when the profile is linear in $z$, because the layer spends more of its mass at the cold top.

For the numbers: $T_2 = 288 - 6.5\times5.5 = 252\ \mathrm{K}$, arithmetic mean $270\ \mathrm{K}$, logarithmic mean $(288-252)/\ln(288/252) = 36/0.1335 = 269.6\ \mathrm{K}$. The difference is $0.4\ \mathrm{K}$ in a mean of $270$, giving $8\ \mathrm{m}$ in $5500$ — negligible. The error matters only for very thick layers or strongly curved profiles, which is why operational practice uses the arithmetic mean of the layer and the difference is ignored.
:::
:::

::: exercise The edge of space {level=3}
The Kármán line is often defined as the height at which a vehicle would have to travel at orbital speed to generate enough lift to support itself. Take the density to fall exponentially with $H = 7\ \mathrm{km}$ from $\rho_0 = 1.225\ \mathrm{kg\,m^{-3}}$, the orbital speed at $100\ \mathrm{km}$ as $7.9\ \mathrm{km\,s^{-1}}$, and a wing loading $W/S = 1000\ \mathrm{N\,m^{-2}}$. Find the density at which lift equals weight at orbital speed, and the corresponding height, and discuss why the answer is a convention.
::: solution
Lift per unit area is $\tfrac{1}{2}\rho V^2 C_L$; with $C_L = 1$ and $W/S = 1000\ \mathrm{N\,m^{-2}}$,
$$
\rho = \frac{2(W/S)}{V^2} = \frac{2000}{(7900)^2} = 3.2\times10^{-5}\ \mathrm{kg\,m^{-3}},
$$
which is $2.6\times10^{-5}$ of sea-level density, at a height
$$
z = -H\ln(\rho/\rho_0) = 7\times\ln(3.8\times10^{4}) = 7\times10.5 = 74\ \mathrm{km}.
$$
The calculation gives $74\ \mathrm{km}$, not $100$; Theodore von Kármán's original figure was nearer $83\ \mathrm{km}$, and the $100\ \mathrm{km}$ line is the rounded number that the Fédération Aéronautique Internationale adopted because it was a round figure and convenient. The honest statement is that there is no edge: density falls smoothly, the mean free path grows from micrometres to kilometres, aeronautics gives way to astronautics gradually between $80$ and $120\ \mathrm{km}$, and the line that matters legally is the one that a government has decided to defend.
:::
:::

::: exercise A sounding {level=3}
A radiosonde reports: surface $1006\ \mathrm{hPa}$, $18\ ^\circ\mathrm{C}$; $850\ \mathrm{hPa}$, $12\ \mathrm{C}$; $700\ \mathrm{hPa}$, $4\ ^\circ\mathrm{C}$; $500\ \mathrm{hPa}$, $-14\ ^\circ\mathrm{C}$; $300\ \mathrm{hPa}$, $-44\ ^\circ\mathrm{C}$. Compute the mean lapse rate of each layer from the thicknesses, and identify the level at which the standard atmosphere and this sounding disagree most.
::: solution
Using $\Delta z = 67.4\,\overline{T_\text{v}}\log_{10}(p_1/p_2)$ with the layer-mean temperature from the reported values:
$1006$–$850$: $\overline{T} = 288\ \mathrm{K}$, $\Delta z = 1350\ \mathrm{m}$, lapse rate $(18-12)/1.35 = 4.4\ \mathrm{K\,km^{-1}}$.
$850$–$700$: $\overline{T} = 280.5$, $\Delta z = 1420$, rate $(12-4)/1.42 = 5.6$.
$700$–$500$: $\overline{T} = 267.5$, $\Delta z = 2170$, rate $(4+14)/2.17 = 8.3$.
$500$–$300$: $\overline{T} = 247.5$, $\Delta z = 3140$, rate $30/3.14 = 9.6$.

The layer from $700$ to $500\ \mathrm{hPa}$ at $8.3\ \mathrm{K\,km^{-1}}$ is close to the dry adiabatic rate of $9.8$ and well above the standard $6.5$, while the lowest layer at $4.4$ is stable. The sounding is therefore stable near the ground, conditionally unstable in the middle troposphere, and the standard atmosphere and this profile differ most in the lowest kilometre, where the real profile is sub-adiabatic and the standard is not.
:::
:::
