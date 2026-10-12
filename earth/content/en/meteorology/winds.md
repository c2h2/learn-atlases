In 1857 the Dutch meteorologist Christoph Buys Ballot published a rule that any sailor could use and no physicist could explain: in the Southern Hemisphere, stand with your back to the wind and the low pressure is on your left. The rule had been noticed by mariners for a century and by storm-warning offices since the telegraph, and it says something remarkable. The air does not move from high pressure to low. It moves *across* the pressure, and does so so accurately that a forecaster with a pressure map and no anemometer can tell you the wind to within twenty per cent. Understanding why took the tools of rotating-frame mechanics, and the story runs from Newton's Principia through Euler and Laplace to Coriolis in 1835, Ferrel in 1856 and V. Walfrid Ekman, who in 1905 solved for the drift of ice that Fridtjof Nansen had observed and could not explain.

::: proposition The horizontal forces and the geostrophic wind {#prop-geostrophic}
For horizontal motion on a rotating Earth the equation of motion is
$$
\frac{\mathrm{d}\mathbf{u}}{\mathrm{d}t} = -\frac{1}{\rho}\nabla_h p - f\,\mathbf{k}\times\mathbf{u} + \mathbf{F}, \qquad f = 2\Omega\sin\phi = 1.03\times10^{-4}\sin\phi\ \mathrm{s^{-1}},
$$
with $f$ the **Coriolis parameter**: $0.38\times10^{-4}$ at the equator, $1.03\times10^{-4}$ at $45^\circ$, $1.46\times10^{-4}$ at the pole. Away from the equator, above the boundary layer, and on scales larger than about $20\ \mathrm{km}$, the friction is negligible and the acceleration is small compared with the two leading terms, so
$$
v_g = -\frac{1}{\rho f}\frac{\partial p}{\partial x}, \qquad u_g = \frac{1}{\rho f}\frac{\partial p}{\partial y},
$$
the **geostrophic wind**: it blows parallel to the isobars, with low pressure to the left in the Northern Hemisphere, and its speed is proportional to the pressure gradient and inversely proportional to the latitude. The balance is accurate to a few per cent on synoptic scales, which is why the surface chart is a wind chart.
:::

::: proof
In a frame rotating with angular velocity $\boldsymbol\Omega$ the acceleration in the inertial frame is $\mathbf{a}_\text{in} = \mathbf{a}_\text{rot} + 2\boldsymbol\Omega\times\mathbf{u} + \boldsymbol\Omega\times(\boldsymbol\Omega\times\mathbf{r})$. The last term is absorbed into gravity, which is measured in the rotating frame and therefore already includes the centrifugal potential; the middle term is the Coriolis acceleration. Taking $\boldsymbol\Omega = \Omega(0,\cos\phi,\sin\phi)$ and $\mathbf{u} = (u,v,0)$, the horizontal components of $2\boldsymbol\Omega\times\mathbf{u}$ are $(-f v, f u)$ with $f = 2\Omega\sin\phi$, and the vertical component, which involves $2\Omega\cos\phi\,u$, is the smaller of the two by the ratio of the vertical to horizontal scales and is discarded in the hydrostatic, thin-shell approximation.

Setting the left-hand side and the friction to zero and writing $p_x, p_y$ for the gradients,
$$
0 = -p_x/\rho + f v, \qquad 0 = -p_y/\rho - f u,
$$
which gives the pair above. ∎

Two consequences are used daily. The first is that the geostrophic wind requires $f \ne 0$: within about $5^\circ$ of the equator the balance fails, which is why tropical cyclones do not form there and why the equatorial atmosphere is governed by a different set of approximations. The second is that the wind is proportional to the pressure-gradient force, so the isobar spacing on a surface chart is a wind chart: at $45^\circ$ latitude and $1000\ \mathrm{hPa}$, isobars at $5\ \mathrm{hPa}$ per $500\ \mathrm{km}$ give $10\ \mathrm{m\,s^{-1}}$, at $2.5\ \mathrm{hPa}$ per $500\ \mathrm{km}$, $5\ \mathrm{m\,s^{-1}}$, and closely packed isobars around a deep low give storm-force winds.
:::
::: example Reading the isobars {#ex-isobars}
On a surface chart at $50^\circ\mathrm{N}$ the isobars are drawn every $5\ \mathrm{hPa}$ and are $6\ \mathrm{mm}$ apart on a chart of scale $1:10\ \mathrm{million}$, with the pressure falling to the north. Estimate the surface wind speed and direction, and the geostrophic wind.
::: solution
The horizontal distance is $6\ \mathrm{mm}\times10^7 = 60\ \mathrm{km}$, so the gradient is $5\ \mathrm{hPa}$ per $60\ \mathrm{km} = 8.3\times10^{-3}\ \mathrm{Pa\,m^{-1}}$. With $\rho = 1.2\ \mathrm{kg\,m^{-3}}$ and $f = 1.0\times10^{-4}\ \mathrm{s^{-1}}$,
$$
v_g = \frac{8.3\times10^{-3}}{1.2\times1.0\times10^{-4}} = 69\ \mathrm{m\,s^{-1}}.
$$
That is a violent gradient — such spacings occur only in the fastest part of a deep cyclone — and the surface wind would be $60$–$70\%$ of it, $45$–$50\ \mathrm{m\,s^{-1}}$, backed about $30^\circ$ across the isobars toward low pressure, so a west to northwesterly wind. More typical isobars $30\ \mathrm{km}$ apart give $14\ \mathrm{m\,s^{-1}}$ geostrophic and $9\ \mathrm{m\,s^{-1}}$ at $10\ \mathrm{m}$.

The reduction near the ground is not a detail: friction slows the wind, which weakens the Coriolis force that depends on the speed, which lets the pressure-gradient force push the air across the isobars toward the low. The result is that surface lows fill unless they are dynamically maintained by the upper-level flow, that surface highs drain, and that the air converging into a low must go somewhere — upward, at a few millibars per hour, which is why a low pressure is a cloud and a high pressure is blue sky.
:::
:::

## What the balance is not

::: definition Ageostrophic motion, inertial oscillation and the boundary layer {#def-ageostrophic}
The departure from the balance, $\mathbf{F}_a = -f\mathbf{k}\times(\mathbf{u}-\mathbf{u}_g)$, is the **ageostrophic force**, and it does two things. Applied to a parcel with no pressure-gradient force at all, it gives the **inertial oscillation**: the parcel circles at the **inertial period** $2\pi/f = 11.97/\sin\phi$ hours — $12\ \mathrm{h}$ at the pole, $17\ \mathrm{h}$ at $45^\circ$, $48\ \mathrm{h}$ at $15^\circ$ — on an **inertial circle** of radius $V/f$, which for $10\ \mathrm{m\,s^{-1}}$ at $45^\circ$ is $100\ \mathrm{km}$. Near the ground, turbulent friction with a stress that decreases upward turns the wind across the isobars by $10$–$30^\circ$ over land and $5$–$10^\circ$ over the sea, and the **Ekman layer** of the free atmosphere does the same in a few hundred metres: the wind vector traces a **spiral** whose transport, integrated over the layer, is exactly at right angles to the geostrophic wind, to the right in the Northern Hemisphere. This transport is small — a centimetre per second — and it is the mechanism by which the atmosphere spins itself down, by which fronts sharpen, and by which the ocean's surface layer moves at forty-five degrees to the wind that drives it.
:::

::: example The inertial circle and Ekman's spiral {#ex-inertial}
A weather ship in the North Atlantic records a wind that veers steadily through $360^\circ$ in $17$ hours with nearly constant speed, after a storm has passed and the sky has cleared. Explain, and find the latitude and the radius of the parcel's path.
::: solution
The period identifies the latitude: $2\pi/f = 17\ \mathrm{h}$ gives $\sin\phi = 11.97/17 = 0.70$, $\phi = 45^\circ$. This is the classic post-frontal inertial oscillation, seen most clearly over the ocean at night when the surface layer decouples from the air above it; the wind at $10\ \mathrm{m}$ veers through the night and returns, and the low-level jet that forms $300\ \mathrm{m}$ above the nocturnal inversion is the same phenomenon in the boundary layer.

For a wind of $12\ \mathrm{m\,s^{-1}}$ the radius is
$$
R = \frac{V}{f} = \frac{12}{1.0\times10^{-4}} = 1.2\times10^5\ \mathrm{m} = 120\ \mathrm{km}.
$$
The Ekman transport associated with such a wind, in the surface layer, is $u_E = \tau_y/(\rho f)$; for a stress of $0.1\ \mathrm{N\,m^{-2}}$ this is $0.1/(1025\times1.0\times10^{-4}) = 1\ \mathrm{m\,s^{-1}}$ in the ocean's mixed layer and a few millimetres per second in the atmosphere's, because the atmospheric layer is a kilometre thick rather than a hundred metres. Nansen's ice drifted at $22^\circ$ to the wind and about $2\%$ of its speed, which Ekman's theory reproduced, and which he presented in a paper written as a wedding gift for Nansen's daughter.
:::
:::

::: widget plot
f: 10*sin(0.525*sin(lat)*x) ; -10*cos(0.525*sin(lat)*x)
x: 0, 120
y: -12, 12
sliders: lat=0.785:0.15:1.5
labels: wind component (m/s)
caption: The two horizontal components of a wind of $10\ \mathrm{m\,s^{-1}}$ set going with no pressure-gradient force and no friction, at a latitude set by the slider in radians. The wind rotates at the inertial frequency, tracing a circle in velocity space and an inertial circle of radius $V/f$ in the air: $12$ hours for a full turn at the pole, $17$ at $45^\circ$, $48$ near the equator. Real air does what this figure shows for a night or two after a front has passed and the friction has gone, and then the pressure field reasserts the balance; but the oscillation is a genuine free mode of the atmosphere, and its frequency sets the lowest frequency that the balanced flow of the mid-latitudes can support, which is why the large-scale atmosphere behaves like a rotating fluid and why weather systems are long-lived.
:::

## Wind with height: the thermal wind

::: proposition The thermal wind {#prop-thermal-wind}
In a **baroclinic** atmosphere, where density depends on temperature as well as pressure, the geostrophic wind changes with height. Taking the vertical derivative of the geostrophic relation and using the hypsometric equation,
$$
\frac{\partial u_g}{\partial z} = \frac{g}{f}\frac{\partial \ln T}{\partial y}, \qquad \frac{\partial v_g}{\partial z} = -\frac{g}{f}\frac{\partial \ln T}{\partial x},
$$
so the **thermal wind** — the vector difference between the geostrophic winds at two levels — is proportional to the horizontal temperature gradient and blows with the warm air to the left in the Northern Hemisphere. Applied to the layer between two pressure surfaces,
$$
\Delta V_g = \frac{g}{f\,\overline{T}}\left|\nabla_h \Delta z\right|,
$$
so the change of the geostrophic wind across a layer is found by reading the **thickness lines** of that layer as if they were isobars. Two practical rules follow: a wind that **veers** with height (turns clockwise) marks warm advection, and one that **backs** marks cold advection; and the isotherms of a surface chart, read as thickness lines, tell you where the jet is.
:::

::: proof
Differentiate $u_g = -(1/\rho f)\,\partial p/\partial y$ with respect to $z$, holding the height coordinate, and use $\rho = p/(R_d T)$:
$$
\frac{\partial u_g}{\partial z} = -\frac{1}{f}\frac{\partial}{\partial y}\left(\frac{1}{\rho}\frac{\partial p}{\partial z}\right) + \ldots = \frac{1}{f}\frac{\partial}{\partial y}\left(\frac{g}{\rho}\cdot\rho\right)\text{ terms in }T,
$$
and since $\partial p/\partial z = -\rho g$ the pressure terms cancel and only the derivative of $1/\rho = R_dT/p$ survives, giving $g\,\partial T/\partial y/(fT)$. ∎

The numbers are large. A temperature gradient of $1\ \mathrm{K}$ per $100\ \mathrm{km}$ — the value across a strong surface baroclinic zone — gives a shear of
$$
\frac{\partial u_g}{\partial z} = \frac{g}{f\overline{T}}\frac{\partial T}{\partial y} = \frac{9.81\times10^{-5}}{1.03\times10^{-4}\times280} = 3.4\times10^{-3}\ \mathrm{s^{-1}},
$$
that is $3.4\ \mathrm{m\,s^{-1}}$ per kilometre. Across the $10\ \mathrm{km}$ from the surface to the tropopause this is $34\ \mathrm{m\,s^{-1}}$, which is the origin of the jet stream: the polar-front jet sits over the zone where the horizontal temperature gradient in the lower troposphere is largest, and its core height is the level at which the gradient vanishes and the thermal wind stops adding. Warm-core subtropical jets, by contrast, exist because the tropopause is higher over the warm tropics, and they persist in the absence of any surface front.
:::

::: example From the thickness to the jet {#ex-jet}
On a $500\ \mathrm{hPa}$ chart the $1000$–$500\ \mathrm{hPa}$ thickness contours run west to east, decreasing northward at $60\ \mathrm{dam}$ per $2000\ \mathrm{km}$. Find the mean temperature gradient and the change in the geostrophic wind between the surface and $5.5\ \mathrm{km}$.
::: solution
Thickness is proportional to layer-mean temperature, $\Delta z = 67.4\,\overline{T}\log_{10}2 = 20.3\,\overline{T}$ metres, so $60\ \mathrm{dam} = 600\ \mathrm{m}$ per $2000\ \mathrm{km}$ corresponds to $29.6\ \mathrm{K}$ per $2000\ \mathrm{km}$, or $1.5\ \mathrm{K}$ per $100\ \mathrm{km}$ — a strong baroclinic zone, and the observed value across the Arctic front in winter.

The thermal wind is
$$
\Delta V_g = \frac{g\,\Delta T}{f\,\overline{T}\,\Delta y} = \frac{9.81\times1.48\times10^{-5}}{1.03\times10^{-4}\times260}\times5500 = 30\ \mathrm{m\,s^{-1}},
$$
directed west to east with the cold air to the north. Adding this to a surface geostrophic wind of $10\ \mathrm{m\,s^{-1}}$ gives a $500\ \mathrm{hPa}$ wind of about $30\ \mathrm{m\,s^{-1}}$, and continuing the calculation upward through the upper troposphere, where the temperature gradient is still large, gives the $50\ \mathrm{m\,s^{-1}}$ westerlies of the jet axis. This is why the surface chart and the $500\ \mathrm{hPa}$ chart look similar in pattern but not in amplitude, and why the surface low of a mature cyclone lies downstream and below the upper trough rather than directly beneath it.
:::
:::

## The general circulation

::: definition Three cells, three belts {#def-circulation}
The Hadley cell carries air upward in the **intertropical convergence zone**, outward aloft, and downward near $25$–$30^\circ$ latitude, and returns it as the **trade winds**: a direct thermal circulation, moist and rainy at its rising limb and dry at its sinking limb, which is why the world's deserts lie at $20$–$30^\circ$. The Ferrel cell is not a heat engine but an eddy-driven residual, forced by the breaking Rossby waves of the mid-latitudes, and it drags surface westerlies over the oceans. The polar cell rises at the polar front and sinks over the ice. Superimposed on this are the seasonal migrations: the ITCZ follows the Sun's declination by $5$–$10^\circ$ of latitude, and over the largest continents the summer heating replaces the trade winds with an onshore **monsoon**, so that the mean surface wind over India reverses between January and July. In the Southern Hemisphere the absence of continent leaves the circulation nearly zonal, and the **southern oceanic westerlies** of the forties and fifties blow unbroken round the planet, driving the Antarctic Circumpolar Current and giving the Southern Hemisphere a climate of storms, swells and no land.
:::

::: svg
caption: The mean meridional circulation and the surface wind belts, drawn for the equinox. The Hadley cell rises at the intertropical convergence zone and sinks in the subtropics; the Ferrel cell is a shallow counter-circulation driven by the eddies of the boundary between the warm and cold air masses; the polar cell is shallow and weak. The surface winds blow from the northeast and southeast trades into the convergence zone, from the west in the mid-latitude belt, and from the east near the poles. The dashed line is the intertropical convergence zone, which migrates by up to ten degrees of latitude with the season and whose failure to migrate is what makes a drought year over India or a flood year over Peru.
<svg viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="General circulation cells">
  <style>
    .ax { stroke: var(--ink-2); stroke-width: 1.2; fill: none; }
    .cell { stroke: var(--series-1); stroke-width: 2; fill: none; }
    .cold { stroke: var(--series-3); stroke-width: 2; fill: none; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
  </style>
  <line class="ax" x1="40" y1="270" x2="720" y2="270"/>
  <path class="cell" d="M120,268 C120,150 180,110 240,150 C280,180 280,240 240,266"/>
  <path class="cell" d="M240,266 C250,190 300,150 360,180 C400,200 400,240 380,266"/>
  <path class="cold" d="M380,266 C390,180 450,150 500,190 C530,215 520,250 500,266"/>
  <path class="cold" d="M500,266 C510,200 570,180 610,210 C630,228 620,255 600,266"/>
  <text class="sub" x="44" y="286">90 S</text><text class="sub" x="200" y="286">30 S</text><text class="sub" x="360" y="286">equator</text>
  <text class="sub" x="520" y="286">30 N</text><text class="sub" x="660" y="286">90 N</text>
  <text class="lab" x="150" y="140">polar cell</text>
  <text class="lab" x="290" y="150">Ferrel cell</text>
  <text class="lab" x="400" y="130">Hadley cell</text>
  <text class="lab" x="560" y="150">Ferrel</text>
  <text class="sub" x="440" y="256">ITCZ: rain, calm</text>
  <text class="sub" x="470" y="256">subtropical high: the deserts</text>
  <text class="sub" x="230" y="256">subtropical high</text>
  <text class="sub" x="120" y="310">surface: easterlies | westerlies | trades | trades | westerlies | easterlies</text>
  <text class="sub" x="400" y="60">the jets blow west to east above the fronts</text>
</svg>
:::

::: example The monsoon as a sea breeze {#ex-monsoon}
The Indian subcontinent warms in summer to surface temperatures $25\ \mathrm{K}$ above the surrounding ocean, and the land area is $3\times10^6\ \mathrm{km^2}$. Estimate the pressure fall implied by warming the lowest kilometre of air over the land, and the resulting mean pressure-gradient force, and compare the monsoon with a sea breeze.
::: solution
If the lowest kilometre of air over the land warms by $25\ \mathrm{K}$ from $300\ \mathrm{K}$, its column expands and the surface pressure falls by roughly
$$
\Delta p \approx p\,\frac{\Delta T}{T}\times\frac{1\ \mathrm{km}}{8\ \mathrm{km}} = 1013\times0.083\times0.125 = 10.5\ \mathrm{hPa},
$$
the factor being the fraction of the mass of the column affected. Across $1500\ \mathrm{km}$ from ocean to interior this is a gradient of $7\times10^{-4}\ \mathrm{Pa\,m^{-1}}$, which at $20^\circ$ latitude ($f = 5\times10^{-5}$) gives a geostrophic wind of $12\ \mathrm{m\,s^{-1}}$ — the observed strength of the low-level Somali jet and the Indian summer monsoon flow.

The mechanism is the same as the sea breeze's: a differential heating of the surface, a hydrostatic pressure change, and an onshore flow. The differences are scale and depth — the monsoon's flow is a few kilometres deep and a thousand kilometres wide, so the Earth's rotation matters, the geostrophic balance applies, and the flow is parallel to the coast rather than across it, which is why the East African coastal jet runs parallel to Somalia and why the rainfall falls on the windward Western Ghats and not along the coast. The Tibetan Plateau, whose surface in summer is $10\ \mathrm{K}$ warmer than the free air at the same height, adds a sensible-heat source that intensifies the upper-level anticyclone and the shear that organises the monsoon's rain belts into the narrow, persistent, thousand-kilometre-long cloud lines that give the subcontinent most of its water and most of its floods.
:::
:::

::: warning The Coriolis force and your bathwater
The Coriolis acceleration at $45^\circ$ latitude for a speed of $1\ \mathrm{m\,s^{-1}}$ is $10^{-4}\ \mathrm{m\,s^{-2}}$, and for the $0.1\ \mathrm{m\,s^{-1}}$ of a draining bath it is $10^{-5}\ \mathrm{m\,s^{-2}}$ — an acceleration that would deflect the stream by a fraction of a millimetre over the ten seconds of its drain. The direction of a bath's rotation is set by the shape of the basin and by the direction in which it was filled, and in a properly conducted laboratory experiment with a tank of three metres diameter, drained over hours and left to settle for a day, the Coriolis effect does become visible. The same arithmetic disposes of the claim that the Coriolis force affects the flight of a bullet or the trajectory of a golf ball, and it is worth doing rather than being told: the rule is that the Coriolis term matters when the time scale of the motion is long compared with $1/f$, about two hours at $45^\circ$. A thunderstorm, whose life span is half an hour, is nearly unaffected; a mid-latitude cyclone, whose is a day, is dominated by it; and the ocean's gyres, whose are decades, are set by it entirely.
:::

::: quiz
A weather balloon at $3\ \mathrm{km}$ reports the wind backing from $250^\circ$ at the surface to $200^\circ$ at $3\ \mathrm{km}$, with the speed increasing. This implies:
- [ ] Warm advection
- [x] Cold advection
- [ ] No temperature advection
- [ ] That the wind is geostrophic at all levels
::: solution
Backing with height — an anticlockwise turning in the Northern Hemisphere — means the thermal wind is directed such that cold air is being carried along; in the standard case, a northwesterly thermal wind across a west-to-east temperature gradient means northwesterly advection of cold air. Veering with height is the signature of warm advection and is the classic sign of an approaching warm sector; backing marks cold air following it, and the surface low that brings it.
:::
:::

::: history
Edmond Halley proposed in 1686 that the trade winds result from the Sun's heating of the tropics and the air flowing in to replace what is carried away; George Hadley gave the mechanism its correct form in 1735, in a paper published posthumously in the Philosophical Transactions, in which the rising air is deflected by the Earth's rotation and the return flow at the surface is the trade wind. The missing dynamics came from Gaspard-Gustave de Coriolis, who in 1835 set out the forces of a rotating frame for the problem of mill wheels, and from William Ferrel, a schoolteacher in Ohio who in 1856 saw that the same term explained the mid-latitude westerlies and proposed the second, counter-rotating cell that carries his name. Buys Ballot's law of 1857 was empirical and immediately useful; the theoretical understanding that the wind is geostrophic came only with the work of Margules, von Bezold and Helmholtz in the 1870s, and Vilhelm Bjerknes's 1904 programme made it the foundation of forecasting. The boundary layer waited until 1905 and Ekman's paper, commissioned because Nansen's Fram had drifted away from the wind; and the free atmosphere's waves came from Carl-Gustaf Rossby, who in 1939 explained the mid-latitude cyclone as an instability of the westerlies and, with the jet stream discovered in 1944 by the crews of high-flying B-29s and reported by the pilot who had first seen it on a transatlantic crossing, gave the weather map its three-dimensional shape.
:::

## Where this leads

The equations of this chapter are derived at length and used to build the balanced-flow hierarchy in [[atmospheric-dynamics/equations-of-motion]] and [[atmospheric-dynamics/balanced-flow]]; the boundary layer and its friction are in [[atmospheric-dynamics/boundary-layer]]; the waves that make the weather are in [[atmospheric-dynamics/vorticity]] and [[meteorology/fronts-cyclones]]; the tropical cyclone's gradient wind is in [[meteorology/storms]]; and the general circulation's response to greenhouse warming is in [[climate-system/heat-transport]].

::: summary Key takeaways
- The Coriolis parameter is 1.03×10^-4 sin phi, and away from the equator and above the boundary layer the wind is geostrophic: parallel to the isobars, with low pressure to the left.
- The isobar spacing is the wind: 5 hPa per 500 km at 45 degrees gives 10 m/s.
- Friction slows the wind and turns it across the isobars toward low pressure, which is why lows converge and rise, and highs diverge and sink.
- A parcel released from the balance circles inertially with a period of 23.9/sin phi hours and a radius of V/f; the post-frontal night is the best place to see it.
- The thermal wind is the change of the geostrophic wind with height, proportional to the horizontal temperature gradient: read the thickness lines as isobars, and the jet stream is what a 10-km-deep front implies.
- Veering with height means warm advection, backing means cold.
- The general circulation is a Hadley cell, an eddy-driven Ferrel residual and a polar cell, with surface belts that migrate with the Sun and reverse over the largest continents.
:::

## Exercises

::: exercise The Coriolis parameter {level=1 check="1.11"}
Find $f$, in units of $10^{-4}\ \mathrm{s^{-1}}$, at $50^\circ\mathrm{N}$.
::: solution
$f = 2\times7.29\times10^{-5}\times\sin 50^\circ = 1.11\times10^{-4}\ \mathrm{s^{-1}}$. (Enter to two decimals in units of $10^{-4}$: $1.11$.)
:::
:::

::: exercise Geostrophic wind {level=1 check="31"}
At $55^\circ\mathrm{N}$ the pressure falls by $6\ \mathrm{hPa}$ over $1400\ \mathrm{km}$ eastward. Find the geostrophic wind speed, in $\mathrm{m\,s^{-1}}$.
::: solution
$\partial p/\partial x = 600/1.4\times10^6 = 4.3\times10^{-4}\ \mathrm{Pa\,m^{-1}}$ and $f = 1.17\times10^{-4}\ \mathrm{s^{-1}}$, so
$$
v_g = \frac{4.3\times10^{-4}}{1.2\times1.17\times10^{-4}} = 31\ \mathrm{m\,s^{-1}},
$$
a storm-force geostrophic wind, blowing with the low to the north, that is from the west.
:::
:::

::: exercise Inertial period {level=1 check="17"}
Find the inertial period, in hours, at $45^\circ$.
::: solution
$2\pi/f = 2\pi/1.03\times10^{-4} = 6.1\times10^4\ \mathrm{s} = 17\ \mathrm{h}$. At the pole it is $12\ \mathrm{h}$, exactly half a sidereal day, which is the reason: at the pole the Earth turns beneath a parcel in a day and the parcel simply keeps its direction in space.
:::
:::

::: exercise Inertial radius {level=1 check="96"}
Find the radius of the inertial circle of a $12\ \mathrm{m\,s^{-1}}$ current at $60^\circ$, in km.
::: solution
$R = V/f = 12/(1.25\times10^{-4}) = 9.6\times10^4\ \mathrm{m} = 96\ \mathrm{km}$.
:::
:::

::: exercise Thermal wind {level=2 check="15"}
A layer $2\ \mathrm{km}$ deep has a temperature increasing northward by $6\ \mathrm{K}$ across $300\ \mathrm{km}$, at $50^\circ\mathrm{N}$. Find the change in the geostrophic wind across the layer, in $\mathrm{m\,s^{-1}}$.
::: solution
$\partial T/\partial y = 2\times10^{-5}\ \mathrm{K\,m^{-1}}$, so $\partial u_g/\partial z = 9.81\times2\times10^{-5}/(1.0\times10^{-4}\times270) = 7.3\times10^{-3}\ \mathrm{s^{-1}}$ and across $2\ \mathrm{km}$, $14.5\ \mathrm{m\,s^{-1}}$. (Enter to the nearest unit: $15$.)
:::
:::

::: exercise Gradient wind {level=2 check="25"}
Around a hurricane at $20^\circ\mathrm{N}$ the gradient wind balance is cyclostrophic, $v^2/r = (1/\rho)\partial p/\partial r$. Find the wind at the wall of an eye of radius $15\ \mathrm{km}$ where the pressure falls $60\ \mathrm{hPa}$ from the environment to the eye.
::: solution
Taking $\partial p/\partial r = 6000/1.5\times10^4 = 0.4\ \mathrm{Pa\,m^{-1}}$, $v = \sqrt{0.4\times1.5\times10^4/1.2} = 71\ \mathrm{m\,s^{-1}}$. (Enter to the nearest unit: $71$.) This is a Category 4 hurricane, and the calculation shows why the gradient wind, not the geostrophic, is the right balance in a vortex of this curvature: the Coriolis term contributes only $fvr = 10^{-4}\times70\times1.5\times10^4 = 105\ \mathrm{m^2\,s^{-2}}$ against the $5000$ of the centrifugal term.
:::
:::

::: exercise Ekman transport {level=2 check="1.42"}
A wind stress of $0.15\ \mathrm{N\,m^{-2}}$ acts on the ocean surface at $45^\circ$. Find the Ekman transport per unit width, in $\mathrm{m^2\,s^{-1}}$.
::: solution
$M = \tau/(\rho f) = 0.15/(1025\times1.03\times10^{-4}) = 1.42\ \mathrm{m^2\,s^{-1}}$, directed $90^\circ$ to the right of the wind. Spread over a $100\ \mathrm{m}$ mixed layer this is a current of $1.4\ \mathrm{cm\,s^{-1}}$, and it is the mechanism of coastal upwelling: a wind blowing parallel to a coast drives the surface water offshore, and the water must be replaced from below.
:::
:::

::: exercise Deriving the thermal wind {level=3}
Show from the hypsometric equation and geostrophy that the thermal wind between two pressure surfaces is $f\Delta\mathbf{V}_g = g\,\mathbf{k}\times\nabla_h\overline{T}/\overline{T}$, and use it to show that the geostrophic wind increases with height in a westerly jet whose core is at the level where the temperature gradient vanishes. Estimate the height of the polar-front jet given a surface temperature gradient of $1\ \mathrm{K}$ per $100\ \mathrm{km}$ decreasing linearly to zero at the tropopause.
::: solution
Writing the thickness $\Delta z = (R_d/g)\overline{T}\ln(p_1/p_2)$ and taking its horizontal gradient, the geostrophic wind difference between the two surfaces is $\Delta\mathbf{V}_g = (g/f)\mathbf{k}\times\nabla\Delta z = (R_d/f\ln(p_1/p_2))\mathbf{k}\times\nabla\overline{T}$, which is the thermal wind.

With a gradient of $10^{-5}\ \mathrm{K\,m^{-1}}$ at the surface falling linearly to zero at $10\ \mathrm{km}$, the shear falls linearly from $3.5\times10^{-3}\ \mathrm{s^{-1}}$ to zero, so the wind increases parabolically and reaches its maximum at the tropopause. The total increase is the area under the shear profile, the triangle $\tfrac12\times3.5\times10^{-3}\times10^4 = 17.5\ \mathrm{m\,s^{-1}}$. Adding a surface geostrophic wind of $15\ \mathrm{m\,s^{-1}}$ gives a jet core of $33\ \mathrm{m\,s^{-1}}$ at the tropopause, and doubling the surface gradient, as happens in the winter polar front, gives $50\ \mathrm{m\,s^{-1}}$ — the observed seasonal cycle of the jet stream, which is $50\%$ stronger in the Northern Hemisphere winter than in the summer because the temperature contrast is.
:::
:::

::: exercise The trade winds {level=3}
Air descends from $200\ \mathrm{hPa}$ and $200\ \mathrm{K}$ in the subtropical high to the surface, conserving its equivalent potential temperature and with a surface temperature of $300\ \mathrm{K}$. Estimate the relative humidity of the air on arrival at the surface, and explain why the subtropics are dry and why the trade-wind inversion exists.
::: solution
Descent from $200$ to $1000\ \mathrm{hPa}$ warms the air dry-adiabatically by
$$
\Delta T = \frac{g}{c_p}z \Longrightarrow T = 200\times(1000/200)^{0.286} = 200\times1.594 = 319\ \mathrm{K},
$$
so the arriving air is at $319\ \mathrm{K}$, far warmer than the $300\ \mathrm{K}$ surface, and its relative humidity, having been near saturation at $200\ \mathrm{hPa}$ and $200\ \mathrm{K}$, falls to a few per cent. On mixing with the boundary layer and cooling to the surface temperature it reaches a relative humidity of order $30\%$.

The subtropics are therefore dry for a thermodynamic reason and not merely a dynamic one: the air has been rained out at the ITCZ and then dried by $119\ \mathrm{K}$ of subsidence. The trade-wind inversion at $600$–$1500\ \mathrm{m}$ is the base of this subsiding air, and it is a genuine lid: the boundary layer below it is moist and convectively unstable, the air above is dry and stable, and the shallow cumulus that cover a third of the tropics at any moment are trapped against it. The height of the inversion sets the depth of the moisture reservoir, and hence the amount of rain the trade-wind cumulus can produce, which is why a $100\ \mathrm{m}$ change in the inversion height is a significant event for the rainfall of a tropical island.
:::
:::
