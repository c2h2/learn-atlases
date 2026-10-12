Pick up a handful of granite on a hillside and you are holding something with a density of about $2700\ \mathrm{kg\,m^{-3}}$. Now weigh the whole planet: $5.97\times 10^{24}\ \mathrm{kg}$ spread over a sphere of radius $6371\ \mathrm{km}$ gives a mean density of $5515\ \mathrm{kg\,m^{-3}}$, more than twice as dense. Rocks at the surface cannot explain the Earth. Whatever lies below must be far denser, and almost nothing of it is visible. The whole of our knowledge of the deep Earth — that it is hot, layered, mostly iron in its centre, solid and liquid at once — has been inferred from that arithmetic, from the speeds of seismic waves, from the planet's wobble, its magnetic field and its heat.

This chapter is the frame for everything else in the atlas: what kind of object the Earth is, how big and what shape, what it is made of from centre to surface, why it is still warm inside, and what is unusual about it among the planets. Two ideas recur throughout. The first is that the Earth is **layered**, because dense material sank and light material rose while the planet was molten. The second is that the Earth is a **heat engine**: it gained energy as it formed, it keeps generating more by radioactive decay, and the way that heat escapes drives earthquakes, volcanoes, mountains and, in a much weaker sense, the weather.

## Earth as an accreted planet

The Sun and planets formed from a collapsing cloud of gas and dust about 4.6 billion years ago. Dust grains stuck into pebbles, pebbles into **planetesimals** of tens of kilometres, and planetesimals collided into the planets. Nothing about this is guesswork: the evidence is preserved in meteorites, which are the leftover building blocks, and in the ages we can measure on them.

The oldest meteorites — **chondrites**, which never melted — give a lead–lead (Pb–Pb) isochron age of $4.567$ billion years (Ga), and the oldest Moon rocks and the oldest Earth minerals (zircons from Jack Hills, Australia, up to 4.40 Ga) are younger. The age we quote for the Earth itself, **4.54 Ga**, is the age at which accretion and core formation were essentially complete, taken from that same meteorite chronology, because no intact Earth rock from that time survives. The final large collision, at roughly 4.5 Ga, is thought to have formed the Moon and to have re-melted the young Earth.

Melting is the key event. A body that melts can **differentiate**: iron and nickel, being dense and (when molten) mobile, sink through lighter silicate liquid towards the centre, releasing gravitational energy as they go.

::: definition Differentiation {#def-differentiation}
A planet is **differentiated** when its components have separated by density into layers, so that mean density increases towards the centre. The Earth's silicate mantle, dense iron-rich core and light granitic crust are the product of differentiation early in its history.
:::

The Moon-forming impact, the last of a series, is why the Earth has an unusually large satellite: the Moon's mass is $1.2\%$ of the Earth's, whereas Mars' two asteroids are $\sim10^{-7}$ of its mass and even the giant planets' biggest satellites are far smaller fractions. That large Moon stabilises the tilt of the spin axis against chaotic changes, which matters for climate over tens of millions of years ([[palaeoclimate/orbital-cycles]]).

## Size, shape and gravity

The Earth is very nearly a sphere, but not exactly: rotation makes it an **oblate spheroid**, flattened at the poles.

::: definition Flattening {#def-flattening}
For an ellipsoid with equatorial (semi-major) radius $a$ and polar (semi-minor) radius $b$, the **flattening** is

$$
f = \frac{a - b}{a}.
$$
:::

| Quantity | Symbol | Value |
|---|---|---|
| Equatorial radius | $a$ | $6378.137\ \mathrm{km}$ |
| Polar radius | $b$ | $6356.752\ \mathrm{km}$ |
| Mean radius | $R = 6371.00\ \mathrm{km}$ | — |
| Flattening | $f$ | $1/298.257 = 3.353\times10^{-3}$ |
| Surface area | $4\pi R^2$ | $5.101\times 10^{8}\ \mathrm{km^2}$ |
| Volume | $\tfrac43\pi R^3$ | $1.083\times 10^{12}\ \mathrm{km^3}$ |
| Mass | $M$ | $5.9722\times 10^{24}\ \mathrm{kg}$ |
| Mean density | $\bar\rho$ | $5515\ \mathrm{kg\,m^{-3}}$ |
| Surface gravity | $g$ | $9.82\ \mathrm{m\,s^{-2}}$ (equator $9.78$, poles $9.83$) |
| Escape velocity | $v_\text{esc}$ | $11.2\ \mathrm{km\,s^{-1}}$ |
| Rotation rate | $\Omega$ | $7.292\times 10^{-5}\ \mathrm{rad\,s^{-1}}$ |

::: example The mean density of the Earth {#ex-density}
Compute the Earth's mean density from its mass and mean radius, and compare it with the density of surface rock.
::: solution
$$
\bar\rho = \frac{M}{\frac43\pi R^3}
= \frac{5.9722\times10^{24}\ \mathrm{kg}}{\frac43\pi\left(6.371\times10^{6}\ \mathrm{m}\right)^{3}}
= \frac{5.9722\times10^{24}}{1.0832\times10^{21}}
= 5513\ \mathrm{kg\,m^{-3}},
$$

usually quoted as $5515\ \mathrm{kg\,m^{-3}}$. Continental crust averages $2700\ \mathrm{kg\,m^{-3}}$ and even the densest surface rocks reach only about $3000\ \mathrm{kg\,m^{-3}}$. Compression raises density, but silicate rock at any pressure found in the Earth stays well below $5500\ \mathrm{kg\,m^{-3}}$; the mean density of the whole mantle is about $4500\ \mathrm{kg\,m^{-3}}$. The deficit can only be made up by material that is intrinsically dense — an iron–nickel core. This single number, obtainable since Cavendish measured $G$ in 1798 and since Eratosthenes measured $R$ around 240 BC, is the oldest and simplest argument for a metallic core.
:::
:::

::: example How much flatter is the equator? {#ex-flatten}
Find the difference between the equatorial and polar radii, and explain why $g$ is smaller at the equator.
::: solution
$$
a - b = af = 6378.137\ \mathrm{km}\times 3.3528\times10^{-3} = 21.4\ \mathrm{km}.
$$

Two effects make $g$ smaller at the equator ($9.78\ \mathrm{m\,s^{-2}}$) than at the poles ($9.83\ \mathrm{m\,s^{-2}}$). First, you are $21.4\ \mathrm{km}$ further from the centre, worth a factor $(a/R)^2 \approx 0.2\%$. Second, and larger, part of gravity is used to provide the centripetal acceleration of rotation: at the equator $\Omega^2 a = (7.292\times10^{-5})^2\times6.378\times10^{6} = 0.034\ \mathrm{m\,s^{-2}}$, about $0.35\%$ of $g$. The measured difference of $0.52\%$ is close to the sum of the two, and the flattening itself is what makes the shape that gravity has to be consistent with — an **equipotential surface**, the *geoid*, discussed in [[geophysics/gravity-isostasy]].
:::
:::

Escape velocity matters for a very practical reason: it decides which gases a planet can keep.

::: proposition Retaining an atmosphere {#prop-retention}
A planet of escape velocity $v_\text{esc}$ retains over the age of the Solar System a gas of molecular mass $m$ at exospheric temperature $T$ only if

$$
v_\text{esc} \gtrsim 6\,v_\text{rms}, \qquad v_\text{rms} = \sqrt{\frac{3kT}{m}},
$$

where $k$ is Boltzmann's constant. The factor 6 is empirical: the high-speed tail of the Maxwell–Boltzmann distribution leaks away over billions of years even when the typical speed is much lower.
:::

::: proof
The Maxwell–Boltzmann distribution gives the number of molecules with speeds above $v$ as proportional to $\left(1 + \frac{mv^2}{2kT}\right)e^{-mv^2/2kT}$ integrated upwards. Setting $v = v_\text{esc}$, the fraction of molecules able to escape in a single pass of the exobase falls off as $e^{-x^2}$ with $x = v_\text{esc}/v_\text{mp}$, where $v_\text{mp} = \sqrt{2kT/m}$. For $x < 5$ the loss over $4.5$ Gyr is large; for $x > 6$ the atmosphere survives. Writing the criterion in terms of $v_\text{rms} = \sqrt{3kT/m}$ gives the rule above. It is a rule of thumb, not a theorem: non-thermal escape (sputtering, charge exchange, polar wind) can strip even heavier species from a planet with no magnetic field, as the Sun has done to Mars.
:::

::: example Which gases can the Earth keep? {#ex-gases}
Compute $v_\text{rms}$ at $288\ \mathrm{K}$ for $\mathrm{H_2}$, He, $\mathrm{H_2O}$, $\mathrm{N_2}$ and $\mathrm{CO_2}$, and decide which the Earth can hold on to.
::: solution
With $v_\text{rms} = \sqrt{3kT/m}$ and $m = \mu m_\text{u}$ ($m_\text{u} = 1.6605\times10^{-27}\ \mathrm{kg}$):

| Gas | $\mu$ | $v_\text{rms}$ at $288\ \mathrm{K}$ | $6v_\text{rms}$ | kept? |
|---|---|---|---|---|
| $\mathrm{H_2}$ | 2 | $1895\ \mathrm{m\,s^{-1}}$ | $11.4\ \mathrm{km\,s^{-1}}$ | marginal, lost |
| He | 4 | $1340\ \mathrm{m\,s^{-1}}$ | $8.0\ \mathrm{km\,s^{-1}}$ | lost slowly |
| $\mathrm{H_2O}$ | 18 | $632\ \mathrm{m\,s^{-1}}$ | $3.8\ \mathrm{km\,s^{-1}}$ | yes |
| $\mathrm{N_2}$ | 28 | $507\ \mathrm{m\,s^{-1}}$ | $3.0\ \mathrm{km\,s^{-1}}$ | yes |
| $\mathrm{CO_2}$ | 44 | $404\ \mathrm{m\,s^{-1}}$ | $2.4\ \mathrm{km\,s^{-1}}$ | yes |

The comparison is with $v_\text{esc} = 11.2\ \mathrm{km\,s^{-1}}$, and note that the relevant temperature is that of the **exosphere** (above 100 km, where temperatures reach $1000\ \mathrm{K}$ and ultraviolet light splits water), not the surface. Hydrogen at $1000\ \mathrm{K}$ has $v_\text{rms} = 3.5\ \mathrm{km\,s^{-1}}$, so $6v_\text{rms} = 21\ \mathrm{km\,s^{-1}} > v_\text{esc}$: the Earth has been leaking hydrogen, and therefore water, ever since it formed. Nitrogen and carbon dioxide are safe by large margins. This is why the Earth's atmosphere is nitrogen and not hydrogen, while Jupiter and Saturn, with escape velocities of $60$ and $35\ \mathrm{km\,s^{-1}}$, kept the hydrogen and helium of the solar nebula.
:::
:::

::: widget plot
f: sqrt(3*1.381e-23*T/(x*1.6605e-27))
x: 1, 44
y: 0, 6000
sliders: T=288:200:1500:1
hlines: 1864
labels: v_\text{rms}
caption: Root-mean-square speed of a gas molecule against molecular mass $\mu$ (in atomic mass units). The dashed line is $v_\text{esc}/6 = 1.86\ \mathrm{km\,s^{-1}}$: anything to the left of where the curve crosses it escapes. Drag the temperature slider to exospheric values near $1000\ \mathrm{K}$ and notice how much of the light-gas region moves above the line — that is why hot, high air loses hydrogen.
:::

## A layered interior

We cannot drill deeper than about $12\ \mathrm{km}$, and the deepest borehole (the Kola Superdeep Borehole, Russia, $12.265\ \mathrm{km}$, completed 1989) reached $180\ ^\circ\mathrm{C}$, far shallower than expected. Everything below the drill hole comes from seismic waves, whose speeds change with the material they cross. Because waves refract and reflect at surfaces where speed changes abruptly, seismograms map the interior in cross-section.

| Layer | Depth range | Density | State |
|---|---|---|---|
| Ocean | 0–11 km | 1028 | liquid |
| Continental crust | 0–70 km (mean 35) | 2700 | solid |
| Oceanic crust | 6–12 km | 2900–3000 | solid |
| Upper mantle | to 410 km | 3300–3900 | solid |
| Transition zone | 410–660 km | 3900–4400 | solid |
| Lower mantle | to 2891 km | 4400–5500 | solid |
| Outer core | 2891–5150 km | 9900–12200 | liquid |
| Inner core | 5150–6371 km | 12700–13000 | solid |

The names and depths of the main boundaries: the **Moho** (crust/mantle, 5–70 km, found by Andrija Mohorovičić in 1909 from P-wave arrival times in the Balkans); the 410 km and 660 km discontinuities (mineral phase changes in olivine, not compositional changes); the **core–mantle boundary** at 2891 km (Oldham 1906, depth from Gutenberg 1914); and the **inner-core boundary** at 5150 km (Inge Lehmann 1936). S-waves do not travel through the outer core, which is therefore liquid; the P-wave shadow zone between $104^\circ$ and $140^\circ$ from an earthquake is the classic evidence.

::: definition Seismic discontinuity {#def-discontinuity}
A **seismic discontinuity** is a surface across which seismic wave speed changes abruptly, by more than can be attributed to a smooth gradient. Discontinuities mark either a change of composition (the Moho, the core–mantle boundary) or a change of crystal structure at nearly constant composition (the 410 km and 660 km discontinuities).
:::

Two independent facts confirm that density rises steeply inwards. First, the **moment of inertia**.

::: proposition Moment of inertia and central concentration {#prop-moi}
A uniform sphere has moment of inertia $I = \frac{2}{5}MR^2$. For any sphere whose density increases towards the centre, $I < \frac{2}{5}MR^2$. The ratio

$$
\frac{I}{MR^2}
$$

is called the **normalised moment of inertia**; it measures how strongly mass is concentrated towards the centre. The Earth's value is $0.3307$.
:::

::: proof
For a spherically symmetric body, $I = \int_0^R \frac{2}{3}\pi\rho(r) r^4\,\mathrm{d}r$ (each shell of radius $r$ and mass $\mathrm{d}m$ contributes $\tfrac23 r^2\mathrm{d}m$) and $M = \int_0^R 4\pi\rho(r) r^2\,\mathrm{d}r$. If $\rho$ is constant, $I = \frac{2}{3}\pi\rho R^5/5$ and $M = \frac{4}{3}\pi\rho R^3$, so $I/MR^2 = \frac{2}{5}$. Moving a small mass $\delta m$ from radius $r_2$ to a smaller radius $r_1$ reduces $I$ by $\tfrac23\delta m (r_2^2 - r_1^2) > 0$ while leaving $M$ unchanged. Hence any inward concentration of mass drives the ratio below $0.4$, and the further below $0.4$ it lies, the more concentrated the body.
:::

::: example A three-layer Earth {#ex-moi}
Take a crude model: inner core $\rho = 13000\ \mathrm{kg\,m^{-3}}$ to $1220\ \mathrm{km}$, outer core $\rho = 11000\ \mathrm{kg\,m^{-3}}$ to $3480\ \mathrm{km}$, mantle $\rho = 4500\ \mathrm{kg\,m^{-3}}$ to $6371\ \mathrm{km}$. Find its mass and normalised moment of inertia.
::: solution
Masses of the shells, $m = \frac43\pi\rho(r_1^3 - r_0^3)$:

$$
m_\text{ic} = 1.00\times10^{23},\quad m_\text{oc} = 1.85\times10^{24},\quad m_\text{man} = 4.08\times10^{24}\ \mathrm{kg},
$$

totalling $M = 6.04\times10^{24}\ \mathrm{kg}$, within $1\%$ of the true value. For a shell, $I = \frac{8}{15}\pi\rho(r_1^5 - r_0^5)$, so

$$
I = \frac{8}{15}\pi\left[13000(1.22\times10^{6})^5 + 11000\left((3.48\times10^{6})^5 - (1.22\times10^{6})^5\right) + 4500\left((6.371\times10^{6})^5 - (3.48\times10^{6})^5\right)\right],
$$

giving $I = 8.47\times10^{37}\ \mathrm{kg\,m^2}$ and

$$
\frac{I}{MR^2} = \frac{8.47\times10^{37}}{6.04\times10^{24}\times(6.371\times10^{6})^2} = 0.346 .
$$

The observed value is $0.3307$, from the planet's precession and the orbital torques of the Sun and Moon on its equatorial bulge. Our three-layer model is slightly too strongly concentrated; a real Earth has a density that rises smoothly with depth by compression, so the mantle is denser at its base than at its top. Either way, $0.33 \ll 0.40$ says plainly that the Earth is not uniform: it has a heavy centre. For comparison, the Moon's value is $0.393$ (barely differentiated), Mars' $0.366$, and Mercury's $0.346$ for a body only $55\%$ the Earth's radius — Mercury is mostly iron core.
:::
:::

Second, pressure. Deep in a planet, the weight of overlying rock must be supported.

::: proposition The hydrostatic equation {#prop-hydrostatic}
In a body at rest under its own gravity, pressure increases with depth at the rate

$$
\frac{\mathrm{d}P}{\mathrm{d}z} = \rho g,
$$

where $z$ is depth, $\rho$ density and $g$ gravitational acceleration.
:::

::: proof
Consider a slab of rock of horizontal area $A$ and thickness $\delta z$ at depth $z$. Its weight is $\rho g A\,\delta z$. The slab is supported by a pressure $P + \delta P$ on its base and pressed on by $P$ at its top, so the net upward force is $\delta P A$. Setting force balance, $\delta P A = \rho g A\,\delta z$, and letting $\delta z \to 0$ gives the result. The assumption is that the material has no strength over these scales — true for the whole Earth over geological time, and false only for the thin elastic layer that carries the weight of topography ([[geophysics/gravity-isostasy]]).
:::

::: example Pressure at the bottom of the mantle {#ex-pressure}
Estimate the pressure at the core–mantle boundary and at the centre of the Earth with the three-layer model of [[#ex-moi]].
::: solution
From the surface to the core–mantle boundary the column is $2891\ \mathrm{km}$ of mantle at $\rho = 4500\ \mathrm{kg\,m^{-3}}$, and $g$ varies only between $9.9$ and $10.8\ \mathrm{m\,s^{-2}}$ across it, so

$$
P_\text{CMB} \approx \rho g \Delta z = 4500 \times 10.2 \times 2.891\times10^{6} = 1.3\times10^{11}\ \mathrm{Pa} = 130\ \mathrm{GPa}.
$$

Integrating properly, $\int\rho g\,\mathrm{d}z$ with $g(r) = Gm(r)/r^2$, gives $126\ \mathrm{GPa}$; the reference seismic model PREM gives $136\ \mathrm{GPa}$. Continuing to the centre, where $g$ falls to zero (there is no mass below you), the same integration gives $347\ \mathrm{GPa}$ against PREM's $360\ \mathrm{GPa}$. At the centre of the Earth the pressure is therefore about $3.6$ million times the surface atmospheric pressure, and the temperature is estimated at $5700$–$6000\ \mathrm{K}$, comparable to the Sun's surface — yet the inner core is solid, because that pressure raises iron's melting point above the local temperature.
:::
:::

::: widget plot
f: if(x<1220, 13000, if(x<3480, 11000, if(x<6371, 4500, if(x<6400, 2800, 0))))
x: 0, 6400
y: 0, 14000
vlines: 1220; 3480; 6371
caption: Density against distance from the Earth's centre in a simple layered model (PREM's smooth profile is close to it). The jump from about $5500$ to about $10000\ \mathrm{kg\,m^{-3}}$ at $3480\ \mathrm{km}$ is the core–mantle boundary: a density doubling across a surface that is, in planetary terms, razor-thin. The thin spike at the right-hand end is the crust, $0.5\%$ of the radius.
:::

## Why the Earth is still hot

The interior is hot for two reasons. It was born hot — energy released by accretion, by core formation and by the Moon-forming impact — and it is kept warm by the radioactive decay of potassium-40, uranium-238, uranium-235 and thorium-232, mostly in the crust and mantle. The Earth now loses heat to space at a measurable rate.

::: definition Heat flow {#def-heatflow}
The **geothermal gradient** is the rate at which temperature increases with depth, typically $25$–$30\ \mathrm{K\,km^{-1}}$ in the continental crust. The surface **heat flow** is the conductive heat flux

$$
q = -k\frac{\mathrm{d}T}{\mathrm{d}z},
$$

with $k$ the thermal conductivity ($2.5$–$3.0\ \mathrm{W\,m^{-1}\,K^{-1}}$ for crustal rock). Global mean $q \approx 87\ \mathrm{mW\,m^{-2}}$, totalling $47 \pm 2\ \mathrm{TW}$ ($1\ \mathrm{TW} = 10^{12}\ \mathrm{W}$; Davies & Davies, 2010).
:::

::: proposition Conductive heat flow through a slab {#prop-slab}
If heat moves only by conduction through a layer of thickness $D$ with a temperature difference $\Delta T$ across it, the heat flow is $q = k\,\Delta T/D$, and the total heat loss of the planet is $4\pi R^2 k\Delta T/D$.
:::

::: proof
In steady state the heat flux is the same through every surface of the layer, so Fourier's law $q = -k\,\mathrm{d}T/\mathrm{d}z$ with constant $k$ integrates to a linear temperature profile between the boundary temperatures $T_1$ and $T_2$: $\mathrm{d}T/\mathrm{d}z = (T_2 - T_1)/D$. Taking magnitudes gives $q = k\Delta T/D$. Multiplying by the surface area of the Earth gives the total. The assumptions are steady state, no internal heat production in the layer, and no transport of heat by melting or by moving fluid; where mantle convection carries heat, the effective flux through a given thickness is larger than conduction alone would allow, and the geothermal gradient in the deep mantle is much smaller than in the lithosphere.
:::

::: example The Earth's heat budget {#ex-heatflow}
Estimate the conductive heat flow through the base of a $100\ \mathrm{km}$-thick continental lithosphere with $\Delta T = 1300\ \mathrm{K}$, and the whole-planet heat loss. Compare it with sunlight.
::: solution
With $k = 3.0\ \mathrm{W\,m^{-1}\,K^{-1}}$, $D = 1.0\times10^{5}\ \mathrm{m}$ and $\Delta T = 1300\ \mathrm{K}$,

$$
q = \frac{3.0 \times 1300}{1.0\times10^{5}} = 3.9\times10^{-2}\ \mathrm{W\,m^{-2}} = 39\ \mathrm{mW\,m^{-2}} .
$$

Measured continental heat flow averages about $65\ \mathrm{mW\,m^{-2}}$ (oceanic basins about $54\ \mathrm{mW\,m^{-2}}$, higher near ridges), so a single conductive lid underestimates the loss — convection in the asthenosphere and heat production in the crust make up the difference. For the whole planet,

$$
4\pi R^2 q = 5.10\times10^{14}\ \mathrm{m^2}\times 87\times10^{-3}\ \mathrm{W\,m^{-2}} = 4.4\times10^{13}\ \mathrm{W} = 44\ \mathrm{TW},
$$

close to the assessed $47\ \mathrm{TW}$. Roughly half comes from radioactive decay and half from primordial heat cooling. Now compare the average solar power absorbed at the surface, about $240\ \mathrm{W\,m^{-2}}$ ([[earth-system/energy-balance]]), with the internal heat flux $0.087\ \mathrm{W\,m^{-2}}$: sunlight delivers about $2800$ times more energy than the Earth's interior. Volcanism and plate tectonics are driven by that tiny fraction; weather is not. Geothermal energy is, in this sense, a genuinely renewable flux for human use, but a diffuse one.
:::
:::

::: warning The middle of the Earth is not hot because of the Sun
Internal heat and surface heat are almost separate budgets. The geothermal gradient exists because the interior is cooling, and it is unaffected by what happens in the atmosphere: a $1\ \mathrm{K}$ change of surface temperature propagates downwards by diffusion only about $100\ \mathrm{m}$ over a thousand years ([[geophysics/heat-flow]]). Conversely, the $47\ \mathrm{TW}$ escaping from the interior is $1/2800$ of the solar energy the surface receives and cannot warm the climate. Claims that "volcanoes emit more heat than the Sun" or that global warming is "just geothermal" confuse the two budgets by about three orders of magnitude.
:::

## What makes the Earth habitable

::: definition Habitable zone {#def-hz}
The **habitable zone** of a star is the range of orbital distances at which a planet with a substantial atmosphere can hold liquid water at its surface. For the present Sun this is roughly $0.95$–$1.67\ \mathrm{AU}$ (Kopparapu et al., 2013); the Earth orbits at $1.00\ \mathrm{AU}$.
:::

The Earth is not merely "the right distance from the Sun". Several things have to hold together, and each of them is a research field of its own in this atlas.

- **Liquid water.** Surface pressure and temperature put water's triple point ($0.01\ ^\circ\mathrm{C}$, $611\ \mathrm{Pa}$) below the surface conditions, so water is stable as a liquid, solid and vapour at once. That coexistence drives the water cycle ([[earth-system/water-cycle]]) and gives the planet its enormous heat capacity.
- **A carbon dioxide thermostat.** Volcanoes supply $\mathrm{CO_2}$; silicate weathering and carbonate burial remove it, and weathering speeds up when it is warm. The result is a negative feedback that has kept the climate habitable despite the Sun brightening by about $30\%$ since the oceans formed — the "faint young Sun" problem, resolved by higher greenhouse gas levels early in Earth history ([[earth-system/carbon-cycle]], [[palaeoclimate/deep-time]]).
- **Plate tectonics**, which recycles crust, drives the long-term carbon cycle and builds the topographic contrast between rock and ocean.
- **A magnetic field** generated by convection in the liquid outer core (the geodynamo, [[geophysics/palaeomagnetism]]) which deflects the solar wind. Mars lost its field about 4 billion years ago and has been losing atmosphere since.
- **A large Moon** stabilising the axial tilt, and a **giant outer planet** (Jupiter) whose role in delivering or deflecting impactors is still debated.

::: example Three planets, three fates {#ex-venus-mars}
Venus receives $2613\ \mathrm{W\,m^{-2}}$ of solar radiation at the top of its atmosphere against the Earth's $1362\ \mathrm{W\,m^{-2}}$, yet its surface is about $735\ \mathrm{K}$ while the Earth's mean is $288\ \mathrm{K}$. Mars receives $590\ \mathrm{W\,m^{-2}}$ and has a mean surface temperature near $210\ \mathrm{K}$. Estimate the Earth's temperature without an atmosphere and see what the difference tells you.
::: solution
With albedo $\alpha = 0.30$ and no atmosphere, the balance $\frac{S_0}{4}(1 - \alpha) = \sigma T^4$ gives

$$
T = \left(\frac{1362\times0.70}{4\times5.67\times10^{-8}}\right)^{1/4} = 255\ \mathrm{K},
$$

$33\ \mathrm{K}$ colder than the observed $288\ \mathrm{K}$ — that gap is the present natural greenhouse effect ([[earth-system/energy-balance]]). Venus at the same albedo would be $328\ \mathrm{K}$; it is really $735\ \mathrm{K}$, so its runaway greenhouse added some $400\ \mathrm{K}$ under an atmosphere $92$ times heavier than ours, made almost entirely of $\mathrm{CO_2}$. Mars, with $1\%$ of our atmospheric mass, has almost no greenhouse effect and a mean temperature barely above its own no-atmosphere value of about $215\ \mathrm{K}$. The lesson is that distance from the Sun sets the energy available, but the atmosphere sets the temperature — and that an atmosphere can move a planet a *hundreds* of kelvin away from where insolation alone would put it. This is the physical background to every climate lesson in this atlas.
:::
:::

::: quiz
The Earth's mean density is $5515\ \mathrm{kg\,m^{-3}}$ but surface rocks average $2700\ \mathrm{kg\,m^{-3}}$. What does this tell us?
- [ ] The Earth must be mostly water.
- [x] The deep interior must contain much denser material than surface rock.
- [ ] Surface rocks must be compressed versions of deep rock.
- [ ] The mean density must be wrong, because density cannot increase with depth.
::: solution
Compression raises density, but no silicate rock reaches $5500\ \mathrm{kg\,m^{-3}}$ at any pressure in the Earth, and the mean mantle density is only about $4500\ \mathrm{kg\,m^{-3}}$. The balance has to come from intrinsically dense material — an iron-rich core, whose existence is confirmed independently by the moment of inertia, by S-waves failing to cross the outer core, and by the density of iron meteorites.
:::
:::

::: quiz
Why is the inner core solid despite being hotter than the surface of the Sun?
- [ ] Because it is made of rock rather than metal.
- [ ] Because it is too small to conduct heat away.
- [x] Because pressure at $360\ \mathrm{GPa}$ raises iron's melting point above the local temperature.
- [ ] Because it is still cooling from the Moon-forming impact and has not reached equilibrium.
::: solution
Melting depends on both temperature and pressure. Iron's melting curve rises steeply with pressure; at inner-core pressures the equilibrium melting temperature is above the actual temperature, so iron is solid there and liquid in the lower-pressure outer core just outside it. Seismology shows both: an S-wave-free outer core and a solid inner core that reflects and transmits S-waves.
:::
:::

::: warning The crust is not a shell holding up the surface
The crust is thin: $5$–$10\ \mathrm{km}$ under oceans, $30$–$70\ \mathrm{km}$ under continents — about as thick, relative to the Earth's radius, as a sheet of paper relative to a football. Continents do not "float on the crust"; they float on the *mantle*, whose density is higher, and the whole lithosphere (crust plus the cold rigid top of the mantle) is what bends and floats ([[geophysics/gravity-isostasy]]). And the mantle is not a sea of liquid rock: it transmits S-waves, so it is solid, and it flows only slowly, by creep, over millions of years.
:::

::: history
The shape of the Earth was argued before its interior. In 1671 Jean Picard measured one degree of latitude precisely; Isaac Newton predicted in the *Principia* (1687) that rotation should make the Earth oblate, while the Cassini family in Paris measured it as prolate. Pierre-Louis Maupertuis led an expedition to Lapland (1736–37) and another to Peru, and found the degree longer near the pole: Newton was right, and the flattening is $1/298$. George Airy's pendulum measurements at a Scottish mountain (1854) showed that mountains have deep low-density roots, the first evidence for isostasy. Then, in 1909, Mohorovičić found that seismic waves below the Balkans arrived in two groups, implying a jump in velocity at about $54\ \mathrm{km}$; Richard Oldham had already recognised a core shadow zone in 1906, Beno Gutenberg fixed its depth at $2891\ \mathrm{km}$ in 1914, and Inge Lehmann detected the inner core in 1936 from small P-wave arrivals in the shadow zone. Francis Birch's 1952 paper "Elasticity and constitution of the Earth's interior" put numbers on the core's composition and remains the foundation of every model used today.
:::

## Where this leads

Every other course in the atlas unpacks one part of this frame. The layering described here becomes [[physical-geology]] and [[mineralogy-petrology]] (what the rocks are) and [[geophysics]] (how we know). The heat that escapes drives [[structural-geology]], [[natural-hazards]] and [[earth-resources]]. The energy budget touched on in [[#ex-venus-mars]] is the subject of [[earth-system/energy-balance]], and the atmosphere that makes Venus and Mars so different from us is developed in [[meteorology]], [[atmospheric-dynamics]] and [[climate-system]]. The next chapter, [[earth-system/reservoirs-fluxes]], gives the bookkeeping language — reservoirs, fluxes, residence times and feedbacks — used in all of them.

::: summary
- The Earth formed by accretion and is $4.54\ \mathrm{Ga}$ old; the oldest minerals are $4.40\ \mathrm{Ga}$ and meteorites give $4.567\ \mathrm{Ga}$. Melting let dense metal sink: the planet is **differentiated**.
- Shape and size: $a = 6378.1\ \mathrm{km}$, $b = 6356.8\ \mathrm{km}$, flattening $1/298.26$; mass $5.972\times10^{24}\ \mathrm{kg}$; mean density $5515\ \mathrm{kg\,m^{-3}}$; $v_\text{esc} = 11.2\ \mathrm{km\,s^{-1}}$.
- Mean density and the moment of inertia factor $I/MR^2 = 0.3307$ (a uniform sphere would be $0.4$) both demand a dense, centrally concentrated interior.
- Structure: crust ($2700\ \mathrm{kg\,m^{-3}}$), solid mantle to $2891\ \mathrm{km}$, liquid outer core, solid inner core at $5150\ \mathrm{km}$; pressure $136\ \mathrm{GPa}$ at the core–mantle boundary and $360\ \mathrm{GPa}$ at the centre.
- Pressure increases with depth as $\mathrm{d}P/\mathrm{d}z = \rho g$; heat escapes as $q = k\,\Delta T/D$, giving $47\ \mathrm{TW}$ in total — $1/2800$ of the solar energy the surface absorbs.
- Habitability needs liquid water, a $\mathrm{CO_2}$ thermostat, plate tectonics, a magnetic field and a stable axial tilt, not merely the right distance from the Sun.
- Escape velocity versus molecular speed decides which gases a planet keeps: the Earth holds $\mathrm{N_2}$ and $\mathrm{CO_2}$ but leaks hydrogen.
:::

## Exercises

::: exercise Mean density of another world {level=1 check="3346"}
The Moon has mass $7.35\times10^{22}\ \mathrm{kg}$ and radius $1737.4\ \mathrm{km}$. Compute its mean density in $\mathrm{kg\,m^{-3}}$, and say what it implies about the Moon's core.
::: solution
$$
\bar\rho = \frac{M}{\frac43\pi R^3} = \frac{7.35\times10^{22}}{\frac43\pi\left(1.7374\times10^{6}\right)^{3}} = \frac{7.35\times10^{22}}{2.197\times10^{19}} = 3346\ \mathrm{kg\,m^{-3}} .
$$
That is barely above the density of the lunar anorthosite crust ($2900\ \mathrm{kg\,m^{-3}}$) and far below the Earth's $5515\ \mathrm{kg\,m^{-3}}$. The Moon cannot hold much iron: its core is at most a few per cent of its mass, against the Earth's $32\%$. Combined with its moment of inertia factor of $0.393$, this is why the Moon is described as *barely* differentiated — and why its small, partly molten core generates no dynamo field today.
:::
:::

::: exercise Flattening of a rotating planet {level=1 check="0.00669"}
A planet has equatorial radius $6600\ \mathrm{km}$ and polar radius $6556\ \mathrm{km}$. Find its flattening.
::: solution
$f = (a - b)/a = (6600 - 6556)/6600 = 44/6600 = 6.69\times10^{-3}$, about twice the Earth's.
:::
:::

::: exercise Heat flow from a gradient {level=1 check="75"}
In a borehole the temperature rises $30\ \mathrm{K}$ per kilometre. Take $k = 2.5\ \mathrm{W\,m^{-1}\,K^{-1}}$. What is the heat flow in $\mathrm{mW\,m^{-2}}$?
::: solution
$q = k\,\mathrm{d}T/\mathrm{d}z = 2.5 \times 30/1000 = 0.075\ \mathrm{W\,m^{-2}} = 75\ \mathrm{mW\,m^{-2}}$.
:::
:::

::: exercise Escape speed at altitude {level=2 check="10.5"}
Find the escape velocity from $800\ \mathrm{km}$ above the Earth's surface in $\mathrm{km\,s^{-1}}$ (use $GM = 3.986\times10^{14}\ \mathrm{m^3\,s^{-2}}$).
::: solution
$v_\text{esc} = \sqrt{2GM/r}$ with $r = 6371 + 800 = 7171\ \mathrm{km}$:
$$
v_\text{esc} = \sqrt{\frac{2\times3.986\times10^{14}}{7.171\times10^{6}}} = 10\,540\ \mathrm{m\,s^{-1}} \approx 10.5\ \mathrm{km\,s^{-1}} .
$$
:::
:::

::: exercise Which gas escapes? {level=2}
At the exobase the temperature reaches $1000\ \mathrm{K}$. Using the $6v_\text{rms} < v_\text{esc}$ rule, decide whether atomic hydrogen (H) and atomic oxygen (O) can be retained by the Earth.
::: solution
$v_\text{rms} = \sqrt{3kT/m}$ with $v_\text{esc} = 11.2\ \mathrm{km\,s^{-1}}$, so retention needs $v_\text{rms} < 1.87\ \mathrm{km\,s^{-1}}$, i.e. $m > 3kT/(1.87\times10^{3})^2 = 3\times1.381\times10^{-23}\times1000/3.50\times10^{6} = 1.18\times10^{-26}\ \mathrm{kg} = 7.1\ m_\text{u}$. Atomic hydrogen ($1\ m_\text{u}$) fails badly and escapes; atomic oxygen ($16\ m_\text{u}$) has $v_\text{rms} = 1.29\ \mathrm{km\,s^{-1}}$ and is retained by this criterion. In practice oxygen is also lost from the tops of the atmosphere by non-thermal processes, and the oxygen in the archaeological record of Mars' water is largely lost this way.
:::
:::

::: exercise Moment of inertia of a two-layer planet {level=2}
A planet of radius $R$ has a core of radius $0.5R$ and density $8000\ \mathrm{kg\,m^{-3}}$ inside a mantle of density $3500\ \mathrm{kg\,m^{-3}}$. Find its mean density and normalised moment of inertia. Is it more or less centrally concentrated than the Earth?
::: solution
$M = \frac43\pi R^3\left[8000(0.5)^3 + 3500(1 - 0.125)\right] = \frac43\pi R^3(1000 + 3063)$, so $\bar\rho = 4063\ \mathrm{kg\,m^{-3}}$. Using $I = \frac{8}{15}\pi\rho(r_1^5 - r_0^5)$ per shell,
$$
\frac{I}{MR^2} = \frac{0.4\left[8000(0.5)^5 + 3500(1 - 0.03125)\right]}{4063} = \frac{0.4(250 + 3391)}{4063} = 0.358 .
$$
This is closer to $0.4$ than the Earth's $0.3307$, so the model planet is *less* centrally concentrated than the Earth despite its dense core: the Earth's core is both denser and proportionally larger (radius $0.546R$).
:::
:::

::: exercise Pressure at the base of the oceanic crust {level=2 check="0.23"}
Estimate the pressure at $10\ \mathrm{km}$ depth beneath the seafloor, taking $3\ \mathrm{km}$ of seawater ($\rho = 1028\ \mathrm{kg\,m^{-3}}$) over $7\ \mathrm{km}$ of basaltic crust ($\rho = 2900\ \mathrm{kg\,m^{-3}}$), with $g = 9.8\ \mathrm{m\,s^{-2}}$. Give your answer in $\mathrm{GPa}$.
::: solution
Integrating $\mathrm{d}P/\mathrm{d}z = \rho g$ through the two layers, with $g$ taken constant,

$$
P = g\sum_i \rho_i z_i = 9.8\left(1028\times3000 + 2900\times7000\right) = 9.8\left(3.08\times10^{6} + 2.03\times10^{7}\right) = 2.29\times10^{8}\ \mathrm{Pa} = 0.23\ \mathrm{GPa}.
$$

The base of the oceanic crust is therefore at only about two tenths of a gigapascal — a reminder of how thin the crust is. At $100\ \mathrm{km}$ depth in the mantle the pressure is already $3\ \mathrm{GPa}$, and at the base of the mantle $136\ \mathrm{GPa}$.
:::
:::

::: exercise The faint young Sun {level=3}
Solar output has increased by about $30\%$ since 3.8 Ga ago. If the Earth's albedo and atmosphere had been unchanged, by how much would surface temperature have fallen, using the $255\ \mathrm{K}$ radiating level as a baseline? What does this imply about the early atmosphere?
::: solution
$T \propto S^{1/4}$, so $T(3.8\ \mathrm{Ga}) = 255\times(1/1.30)^{1/4} = 255\times0.9346 = 238\ \mathrm{K}$, i.e. $17\ \mathrm{K}$ colder. With a greenhouse increment of $33\ \mathrm{K}$ held fixed, the surface would have been near $271\ \mathrm{K}$, at or below freezing — yet geological evidence (liquid water, no glacial deposits of that age except later ones) shows a habitable surface. The resolution is that the greenhouse increment was larger: $\mathrm{CO_2}$ at perhaps $10$–$100\times$ pre-industrial levels, plus methane, which is the standard solution to the faint young Sun problem. Note that the $T \propto S^{1/4}$ scaling is a zero-dimensional estimate; see [[earth-system/energy-balance]].
:::
:::

::: exercise Radioactive heat production {level=3}
Granite contains about $3.5\ \mathrm{ppm}$ U, $12\ \mathrm{ppm}$ Th and $4\%$ K by mass. The decay chains of $^{238}\mathrm{U}$, $^{232}\mathrm{Th}$ and $^{40}\mathrm{K}$ release heat at about $1.0\times10^{-4}$, $2.8\times10^{-5}$ and $5.0\times10^{-9}\ \mathrm{W}$ per kilogram of the element respectively. Find the heat production per unit volume for granite of density $2700\ \mathrm{kg\,m^{-3}}$, and the heat flow that a $15\ \mathrm{km}$-thick layer of it would supply.
::: solution
Per kilogram of rock,
$$
A = 3.5\times10^{-6}\times1.0\times10^{-4} + 1.2\times10^{-5}\times2.8\times10^{-5} + 0.04\times5.0\times10^{-9}
= (3.5 + 3.4 + 2.0)\times10^{-10} = 8.9\times10^{-10}\ \mathrm{W\,kg^{-1}} .
$$

Per cubic metre, $A_\text{v} = 8.9\times10^{-10}\times2700 = 2.4\times10^{-6}\ \mathrm{W\,m^{-3}} = 2.4\ \mu\mathrm{W\,m^{-3}}$, the standard value for granites ($1$–$4\ \mu\mathrm{W\,m^{-3}}$). A $15\ \mathrm{km}$ layer would supply

$$
q = A_\text{v} D = 2.4\times10^{-6}\times1.5\times10^{4} = 3.6\times10^{-2}\ \mathrm{W\,m^{-2}} = 36\ \mathrm{mW\,m^{-2}},
$$

more than half the global mean heat flow. But granite is not spread uniformly through the crust: average upper continental crust produces only about $1\ \mu\mathrm{W\,m^{-3}}$, giving $\sim15\ \mathrm{mW\,m^{-2}}$ over $15\ \mathrm{km}$, and heat-producing elements are concentrated in the top few kilometres. The remaining two thirds of the $87\ \mathrm{mW\,m^{-2}}$ average must come from the mantle, which is the standard argument for a vigorously convecting interior.
:::
:::

::: exercise A diffusive surface skin {level=3}
Heat diffuses into rock with thermal diffusivity $\kappa \approx 1\times10^{-6}\ \mathrm{m^2\,s^{-1}}$. The depth to which a surface temperature change of duration $t$ penetrates is roughly $d \approx \sqrt{\kappa t}$. How deep does a $1\ \mathrm{K}$ change penetrate in (a) 1 year, (b) 1000 years, (c) 100 million years? What does (c) say about the role of surface temperature in setting the Earth's internal heat?
::: solution
(a) $t = 3.16\times10^{7}\ \mathrm{s}$: $d = \sqrt{10^{-6}\times3.16\times10^{7}} = 5.6\ \mathrm{m}$.
(b) $t = 3.16\times10^{10}\ \mathrm{s}$: $d = 178\ \mathrm{m}$.
(c) $t = 3.16\times10^{15}\ \mathrm{s}$: $d = 56\ \mathrm{km}$.
Surface conditions therefore influence only the upper few hundred metres on human timescales, and only the outermost tens of kilometres even over an entire geological era — a thin skin on a $6371\ \mathrm{km}$ planet. The internal heat budget is set by accretion, core formation and radioactivity, not by climate; and conversely, palaeoclimate models must treat the deep crust and mantle as fixed boundaries.
:::
:::
