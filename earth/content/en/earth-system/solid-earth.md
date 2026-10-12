In May 1906 a seismograph in India recorded a tremor that made no sense. The waves from a great earthquake had arrived at distances where, on any model of a uniform Earth, no waves should have been — and had arrived *too early*. Richard Oldham (Oldham) recognised what this meant: the interior of the Earth must contain a region through which waves travel faster, bent around a core. Twenty years later Harold Jeffreys (Jeffreys) showed that the same geometry required the core to be liquid, because shear waves would not cross it. In 1936 a young Danish seismologist, Inge Lehmann (Lehmann), found that the waves reflected from deep inside that liquid were slightly early again, and announced a solid ball inside the liquid one.

Everything we know of the deep Earth comes from that chain of timing measurements, refined over a century into a model — the Preliminary Reference Earth Model, PREM — in which velocity and density are tabulated every $100\ \mathrm{km}$ from the surface to the centre. This chapter is about what the solid Earth is made of, how we know, and how a body that is, on seismic timescales, rigid rock and metal nevertheless grinds its way through a full reorganisation of its surface every few hundred million years.

## Reading the interior with waves

::: definition Seismic velocities and elastic moduli {#def-moduli}
In a solid that transmits no heat-flow or fluid flow on the timescale of a wavelet, elastic waves travel at speeds set by two moduli and the density:
$$
V_P = \sqrt{\frac{K + \tfrac{4}{3}\mu}{\rho}}, \qquad V_S = \sqrt{\frac{\mu}{\rho}},
$$
where $K$ is the incompressibility (bulk modulus) and $\mu$ the rigidity. $V_P$ is the speed of the compressional (P) wave, $V_S$ that of the shear (S) wave. Their ratio gives Poisson's ratio: $V_P/V_S = \sqrt{K/\mu + 4/3}$.
:::

::: proposition The outer core is liquid {#prop-liquidcore}
Across the core–mantle boundary $V_S$ falls from $7.34\ \mathrm{km\,s^{-1}}$ to zero, while the incompressibility is essentially unchanged: $K = 647\ \mathrm{GPa}$ just above, $643\ \mathrm{GPa}$ just below. Since $V_S = 0$ requires $\mu = 0$, and only a fluid (on the period of the wave) has zero rigidity, the outer core is liquid. The continuity of $K$ shows that the boundary is not a phase change in one substance but a change of substance.
:::

::: proof
$V_S = \sqrt{\mu/\rho}$ is zero only if $\mu = 0$; a material of zero rigidity cannot support a shear stress, which is the definition of a fluid. Compute $K$ on either side from $K = \rho(V_P^2 - \tfrac{4}{3}V_S^2)$: above, $\rho = 5570\ \mathrm{kg\,m^{-3}}$, $V_P = 13.71$, $V_S = 7.34\ \mathrm{km\,s^{-1}}$ gives $K = 647\ \mathrm{GPa}$; below, $\rho = 9900\ \mathrm{kg\,m^{-3}}$, $V_P = 8.06$, $V_S = 0$ gives $K = 643\ \mathrm{GPa}$. The density, by contrast, jumps from $5.57$ to $9.90\ \mathrm{g\,cm^{-3}}$. A phase transition in the same mineral would change $\rho$ and $V_P$ together and would leave some rigidity; a metal/silicate interface can leave $K$ nearly continuous while doubling the density. That is the seismic signature of the great chemical division of the Earth, the event that made the planet zoned ([[earth-system/planet-earth]]).
:::

| Depth | Layer | $V_P$ $\mathrm{km\,s^{-1}}$ | $V_S$ $\mathrm{km\,s^{-1}}$ | $\rho$ $\mathrm{g\,cm^{-3}}$ |
|---|---|---|---|---|
| 0–35 | Oceanic/continental crust | 5.9–6.8 | 3.4–3.9 | 2.7–3.0 |
| 35–410 | Upper mantle (olivine) | 8.08 | 4.48 | 3.32 |
| 410–660 | Transition zone (wadsleyite, ringwoodite) | 9.0–10.2 | 4.9–5.6 | 3.5–4.0 |
| 660–2891 | Lower mantle (bridgmanite + ferropericlase) | 10.2–13.7 | 5.6–7.3 | 4.0–5.6 |
| 2891–5150 | Outer core (Fe–Ni–light element) | 8.06–10.3 | 0 | 9.9–12.2 |
| 5150–6371 | Inner core (Fe–Ni) | 11.0 | 3.5 | 12.8–13.1 |

(PREM endpoint values; the velocities and densities rise continuously within each layer because of compression.)

::: definition Discontinuities: phase versus composition {#def-discontinuities}
The **Mohorovičić discontinuity** (the Moho, 5–70 km) is a compositional boundary between crustal rocks and peridotite, discovered in 1909 when P waves from a Balkan earthquake arrived in two trains. The **410-km** and **660-km** discontinuities are phase boundaries in the same rock: olivine collapses first to wadsleyite (density rises about $8\%$), then to ringwoodite, then at 660 km to bridgmanite plus ferropericlase. The **core–mantle boundary** (2891 km) and the **inner-core boundary** (5150 km) are compositional and metal/solid boundaries respectively.
:::

The distinction is not cosmetic. A compositional boundary is flat and permanent; a phase boundary moves with temperature, because the two phases have different entropies and volumes. Their slope is given by the Clapeyron relation, and the sign of that slope lets seismologists *see* cold slabs sinking into the transition zone.

::: widget plot
f: sqrt(x + 4/3)
x: 0.3, 6
y: 1.3, 2.7
caption: The velocity ratio $V_P/V_S = \sqrt{K/\mu + 4/3}$ as a function of the rigidity ratio $K/\mu$. Ordinary crustal rocks sit at $K/\mu \approx 1.5$–$2$, giving $V_P/V_S \approx 1.7$–$1.8$; the lower mantle, at $K/\mu = 2.2$, gives $1.87$. Add melt and $\mu$ collapses towards zero, so $K/\mu$ and $V_P/V_S$ blow up: a rock with $1\%$ partial melt shows a few per cent drop in $V_S$ and a rise in $V_P/V_S$ of several tenths. This single ratio is the most useful rock-physics number in the exploration for magma bodies, hydrothermal systems and reservoirs, and it is why $V_S$ sections, not $V_P$ sections, find melt.
:::

::: example Where do the discontinuities bend? {#ex-clapeyron}
The 410-km discontinuity has Clapeyron slope $\gamma = \mathrm{d}P/\mathrm{d}T \approx +3\ \mathrm{MPa\,K^{-1}}$; the 660-km discontinuity has $\gamma \approx -2.5\ \mathrm{MPa\,K^{-1}}$. By how much does each move in a slab $200\ \mathrm{K}$ colder than its surroundings ($\rho g \approx 3.5\times10^{4}\ \mathrm{Pa\,m^{-1}}$)?
::: solution
A temperature anomaly $\Delta T$ shifts the boundary by a pressure $\Delta P = \gamma\Delta T$, which corresponds to a depth change
$$
\Delta z = \frac{\gamma\,\Delta T}{\rho g}.
$$
For the 410 with $\Delta T = -200\ \mathrm{K}$: $\Delta P = -0.60\ \mathrm{GPa}$, so $\Delta z = -0.60\times10^{9}/3.5\times10^{4} = -17\ \mathrm{km}$: the boundary moves to *lower* pressure, i.e. it rises. For the 660, $\gamma\Delta T = (-2.5\times10^{6})\times(-200) = +0.50\ \mathrm{GPa}$, so $\Delta z = +14\ \mathrm{km}$: the boundary moves to *higher* pressure, i.e. it deepens. Because the Clapeyron slopes have opposite signs, the same cold anomaly pushes the two boundaries apart, and the transition zone is observed to thicken by $20$–$30\ \mathrm{km}$ above cold downwellings and to thin above hot upwellings.

The deeper consequence is one of the most important observations in modern geodynamics: beneath several subduction zones the 660 flattens or breaks, which means the sinking slab encounters a density and viscosity contrast there. Whether slabs pile up above 660 km and then avalanche through, or penetrate directly, is the core of the debate over whether mantle convection is layered or whole-depth ([[physical-geology/plate-tectonics]]).
:::
:::

## What the whole Earth says: modes and moments

::: definition Free oscillations {#def-modes}
A very large earthquake leaves the whole Earth ringing. The normal modes are standing waves of the self-gravitating sphere: the **fundamental spheroidal (breathing) mode** $ {}_0S_0$ has a period of $20.5\ \mathrm{min}$ and measures the mean incompressibility; the football-shaped $ {}_0S_2$ has a period of $53.9\ \mathrm{min}$. Torsional modes twist the shells past one another and are the cleanest probe of lateral velocity changes with depth.
:::

::: proposition The Earth cannot be two-layered {#prop-twolayer}
Take an Earth of a dense core of density $\rho_c$ and a mantle of density $\rho_m$, with the observed mass and radius. Matching the measured moment of inertia factor $I/Ma^2 = 0.3308$ with $\rho_c = 11{,}000$ and $\rho_m = 4400\ \mathrm{kg\,m^{-3}}$ requires a core radius of $4400$–$4570\ \mathrm{km}$ — far larger than the seismological $3480\ \mathrm{km}$. A radially *graded* mantle is required.
:::

::: proof
For two uniform shells, $I = \frac{8\pi}{15}\rho_c x^5 a^5 + \frac{8\pi}{15}\rho_m(1 - x^5)a^5$ and $M = \frac{4\pi}{3}[\rho_c x^3 + \rho_m(1 - x^3)]a^3$ with $x$ the core radius fraction. Eliminating the scale gives $I/Ma^2$ as a function of $x$ alone; it has a minimum of $0.3307$ at $x = 0.70$ and never falls below the observed value. So the two-layer model can match the observation only in a knife-edge way, and only with a core much bigger than the one seismology sees. Adding the observed compression of the mantle — density rising from $3.3$ to $5.6\ \mathrm{g\,cm^{-3}}$ through it — lowers the factor to the measured value with the correct core. This is the same argument used in [[earth-system/planet-earth]], now turned around to constrain structure rather than to prove differentiation.
:::

::: example The Earth rings like a bell {#ex-modes}
The longest-period modes of the Earth have periods of about an hour. Compute the dynamical timescale $\sqrt{a^3/GM}$ of the planet and compare it with the $53.9\ \mathrm{min}$ of $ {}_0S_2$.
::: solution
$$
\sqrt{\frac{a^3}{GM}} = \sqrt{\frac{(6.371\times10^{6})^3}{3.986\times10^{14}}} = 805\ \mathrm{s} = 13.4\ \mathrm{min},
$$
and $2\pi$ times this is $84\ \mathrm{min}$. The observed $54\ \mathrm{min}$ is $0.64$ of that — the right order, as it must be, since self-gravity is the restoring force and elasticity only modifies it.

The practical importance is that modes measure what rays cannot: rays give path averages and are blind to the very longest wavelengths, whereas a mode is a whole-Earth measurement with a known sensitivity kernel. The 1960 Valdivia (Chile) earthquake of $M_\text{w}\ 9.5$ — the largest ever recorded — made the free oscillations measurable on surface seismographs for the first time, and the resulting mode splitting by rotation and by lateral heterogeneity gave the first one-dimensional velocity profile good enough to build PREM from (Dziewonski and Anderson, 1981).
:::
:::

::: example Sizing an earthquake {#ex-moment}
The 26 December 2004 Sumatra earthquake ruptured a fault about $1300\ \mathrm{km}$ long and $200\ \mathrm{km}$ down-dip, with a mean slip of $12\ \mathrm{m}$. Take $\mu = 30\ \mathrm{GPa}$. Find the seismic moment and the moment magnitude.
::: solution
$$
M_0 = \mu A D = 3\times10^{10}\times2.6\times10^{11}\times12 = 9.4\times10^{22}\ \mathrm{N\,m},
$$
$$
M_\text{w} = \tfrac{2}{3}\left(\log_{10} M_0 - 9.1\right) = \tfrac{2}{3}(22.97 - 9.1) = 9.2 .
$$

Published estimates are $M_\text{w}\ 9.1$–$9.3$ with $M_0 = (0.6$–$1.3)\times10^{23}\ \mathrm{N\,m}$, so the arithmetic is right. Two consequences worth carrying around: magnitude is logarithmic in moment, so $M_\text{w}\ 9.2$ releases about twice the moment of the 2011 Tōhoku earthquake ($M_\text{w}\ 9.0$, $M_0 = 4.5\times10^{22}\ \mathrm{N\,m}$) and some seven hundred times that of the 2010 Haiti earthquake ($M_\text{w}\ 7.0$, $M_0 \approx 1.4\times10^{20}\ \mathrm{N\,m}$); and the moment budget of a region must balance — the sum of the moments of the earthquakes plus the moment of any creeping (aseismic) slip must equal the moment accumulated by plate motion, which is how seismic hazard is estimated in places where the big one is overdue ([[natural-hazards/earthquake-hazard]], [[geophysics/earthquake-sources]]).
:::
:::

## The temperature of the deep Earth

::: definition The geotherm and the melting curve {#def-geotherm}
The **geotherm** is the profile of temperature with depth. In the convecting mantle it is nearly adiabatic,
$$
\frac{\mathrm{d}\ln T}{\mathrm{d}P} = \frac{\gamma_G}{c_P},
$$
where $\gamma_G$ is the Grüneisen parameter and $c_P$ the specific heat, giving a rise of only $0.3$–$0.5\ \mathrm{K\,GPa^{-1}}$; extrapolated to the surface, the mantle's potential temperature is $T_P \approx 1350\ ^\circ\mathrm{C}$. The **melting curve** of the relevant material lies below the geotherm where the Earth is molten and above it where it is solid.
:::

::: example Why the inner core is solid and the outer core liquid {#ex-melting}
Model the melting curve of iron by $T_m(P) = T_\text{ICB}(P/P_\text{ICB})^{0.55}$ anchored at $T_\text{ICB} = 5200\ \mathrm{K}$, $P_\text{ICB} = 330\ \mathrm{GPa}$, and the core's adiabatic geotherm by $T_\text{ad}(P) = 5200 - 0.5(330 - P)\ \mathrm{K}$. Evaluate both at the core–mantle boundary ($P = 135\ \mathrm{GPa}$) and interpret.
::: solution
At $135\ \mathrm{GPa}$: $T_m = 5200\times0.409^{0.55} = 3180\ \mathrm{K}$ and $T_\text{ad} = 5100\ \mathrm{K}$. The core is $1900\ \mathrm{K}$ *hotter* than iron's melting point there, so it is liquid. At the inner-core boundary the two curves meet by construction, and below it the adiabat falls below the melting curve, so the inner core is solid.

The reason the inner core exists at all is a competition of slopes: the melting curve of iron rises steeply with pressure ($\sim 10\ \mathrm{K\,GPa^{-1}}$ near the ICB) while a convecting adiabat rises by only $\sim 0.5\ \mathrm{K\,GPa^{-1}}$. As the Earth cools, the adiabat shifts down everywhere and crosses the melting curve first at the *top* of the core, so the inner core grows outward. The number that matters — the difference between the core adiabat and the melting curve at the core–mantle boundary, the "core superheat" — is uncertain by more than $1000\ \mathrm{K}$, and it sets how fast the core can cool, hence the age of the inner core (estimates range from $0.5$ to $1.5\ \mathrm{Gyr}$) and the length of time the geodynamo has run ([[geophysics/geomagnetism]]).
:::
:::

::: widget plot
f: 5200*(x/330)^0.55 - (5200 - 0.5*(330-x))
x: 135, 330
y: -2200, 0
caption: The melting temperature of iron minus the core's adiabatic geotherm, as a function of pressure from the core–mantle boundary ($135\ \mathrm{GPa}$) to the inner-core boundary ($330\ \mathrm{GPa}$). The curve is negative throughout the outer core — the metal is hotter than its own melting point, hence liquid — and reaches zero only at the inner-core boundary, where solid and liquid coexist. The vertical scale is the uncertainty as much as the signal: the exponent $0.55$ and the anchor $5200\ \mathrm{K}$ are drawn from diamond-anvil-cell experiments and first-principles calculations that disagree with each other by hundreds of kelvin, and the whole question of when the inner core began to freeze turns on that disagreement.
:::

::: warning The mantle is not molten, and the core is not "liquid rock"
Two inversions of intuition cause most public confusion about the deep Earth. First, the mantle transmits shear waves, so it has rigidity, so it is a solid — a solid that flows at a few centimetres per year because its viscosity is $10^{21}$–$10^{22}\ \mathrm{Pa\,s}$ and its strength is finite. The asthenosphere is not a sea of melt; it is peridotite that may contain a fraction of a per cent of melt and that deforms by crystal creep. Second, the inner core is probably $5000$–$6000\ \mathrm{K}$, as hot as the surface of the Sun, and yet solid, because the pressure there is $330\ \mathrm{GPa}$, three and a half million atmospheres. Melting is a competition between temperature and pressure, and the deep Earth is a place where the pressure usually wins.
:::

::: warning Tomograms are not photographs
Seismic tomography maps variations in wave speed, typically $0.5$–$3\%$ in the mantle, and the pictures are always shown as colour maps of "temperature" after assuming that velocity varies with temperature alone. The two huge slow-velocity provinces beneath Africa and the central Pacific — the large low-shear-velocity provinces, LLSVPs — are $2$–$3\%$ slow in shear waves and rise thousands of kilometres above the core–mantle boundary. Whether they are thermal (hot, buoyant, perhaps piles of subducted slab debris), compositional (iron-enriched, perhaps remnants of a magma ocean), or something in between is genuinely unresolved, and the answer changes what one infers from the same picture. Read a tomogram for what it measures: relative wave speed, with an interpretation attached ([[geophysics/seismic-structure]]).
:::

::: quiz
Why does the density double across the core–mantle boundary while the incompressibility barely changes?
- [ ] Because the density measurement is less reliable than the velocity measurement.
- [x] Because the boundary separates two chemically different materials of similar incompressibility, not one material in two phases.
- [ ] Because the core is under much higher pressure.
- [ ] Because seismic waves slow down in metal.
::: solution
A phase change in one substance changes density and stiffness together, and would leave the material rigid. Here the rigidity goes to zero and the density doubles while $K$ stays at $\sim 645\ \mathrm{GPa}$ — the signature of a metal/silicate chemical division. Pressure is not the explanation either: the pressure is *continuous* across any boundary, and it is the density that jumps.
:::
:::

::: quiz
A tomographic map shows a region $2\%$ slow in shear waves at $250\ \mathrm{km}$ depth beneath a continent. Which interpretation requires the fewest extra assumptions?
- [ ] It is a pocket of melt.
- [x] Nothing follows without more information: $2\%$ slow shear velocity can be produced by a few tens of kelvin of temperature, by a fraction of a per cent of melt, by anisotropy or by composition.
- [ ] It is a mantle plume.
- [ ] It is subducted oceanic crust.
::: solution
Velocity is one number and the causes are at least four, so the map alone is not evidence of anything. This is why modern studies use *ratios* (the shear-to-compressional anomaly ratio $\delta\ln V_S/\delta\ln V_P$, which is very different for melt and for temperature), anisotropy, attenuation $Q$, and independent constraints from petrology and geoid. See [[geophysics/seismic-structure]].
:::
:::

::: history
The deep Earth was built in about thirty years of timing measurements. Oldham (Oldham) identified the core in 1906 from the early arrival of waves that had crossed it. Andrija Mohorovičić (Mohorovičić) in 1909 read two sets of P arrivals from the October 1909 Krbava earthquake, recorded by the Croatian network, and inferred a boundary at about $54\ \mathrm{km}$ at which velocity jumps from $6$ to $8\ \mathrm{km\,s^{-1}}$ — the Moho, the first of the interfaces in the table above. Beno Gutenberg (Gutenberg) fixed the core's depth at $2900\ \mathrm{km}$ in 1912 and, in 1926, inferred a weak layer at $100$–$200\ \mathrm{km}$ — the asthenosphere — from the paths of surface waves. Harold Jeffreys (Jeffreys) in 1926 used the P-wave shadow zone to prove the outer core liquid. Inge Lehmann (Lehmann) in 1936 found the inner core in the small early arrivals of a 1934 earthquake, an inference so bold that Jeffreys himself resisted it for a decade. Francis Birch (Birch) in 1952 did the decisive synthesis: having measured the velocities of rocks at high pressure in the laboratory, he showed that a mantle of olivine-rich rock compressed to the observed densities reproduces the observed velocities, and that the core's density deficit relative to pure iron–nickel requires about $10\%$ of light elements — the field of mineral physics was founded, together with "Birch's law" relating velocity to density in rock. Edward Bullen (Bullen) mapped the thin, strange layer above the core that still carries his letter: D$''$. Free oscillations, whose possibility had been worked out for self-gravitating spheres by Horace Lamb (Lamb) and his successors in the 1880s, became data after the 1960 Chile earthquake, and the 1981 PREM of Dziewonski (Dziewonski) and Don Anderson (Anderson) remains the standard reference Earth model. The Nuclear-Test-Ban Treaty of 1963, which required a global network of seismographs to detect underground explosions, delivered the earthquake catalogue that finally confirmed plate tectonics.
:::

## Where this leads

The solid Earth is the reservoir that sets the pace of everything else: it returns carbon to the atmosphere by volcanism and takes it up by silicate weathering ([[earth-system/carbon-cycle]]), it builds the topography that drives erosion and weathering ([[geomorphology/landscape-evolution]]), and its magnetic field, generated in the outer core, shields the atmosphere from the solar wind ([[geophysics/geomagnetism]], [[planetary-science/atmospheres]]). The waves themselves are developed in [[geophysics/elastic-waves]] and [[geophysics/seismic-structure]], earthquakes in [[geophysics/earthquake-sources]] and [[natural-hazards/earthquake-hazard]], the minerals in [[mineralogy-petrology/silicates]] and [[mineralogy-petrology/phase-diagrams]], and the flow in [[structural-geology/rheology]].

::: summary
- Two numbers read the interior: $V_P = \sqrt{(K + 4\mu/3)/\rho}$ and $V_S = \sqrt{\mu/\rho}$. Where $V_S = 0$ the material is fluid.
- Across the core–mantle boundary the density doubles, $V_S$ vanishes, and $K$ is unchanged at $\sim 645\ \mathrm{GPa}$: a chemical boundary, not a phase change.
- The 410- and 660-km discontinuities are phase transitions in the same rock, with Clapeyron slopes of opposite sign, so they bend around cold and hot anomalies in predictable, opposite directions.
- A two-layer Earth cannot match $I/Ma^2 = 0.3308$ with the observed core: the mantle must be compressed, exactly as mineral physics predicts.
- Free oscillations measure whole-Earth properties that rays miss; the 1960 Chile earthquake opened that field, and PREM (1981) is its monument.
- The inner core is solid because iron's melting curve rises faster with pressure than the core's adiabat; the difference at the core–mantle boundary is uncertain by $>1000\ \mathrm{K}$ and controls the core's thermal history.
- Earthquakes are sized by $M_0 = \mu A D$; magnitude is logarithmic, and regional moment budgets must balance the plate-rate moment.
:::

## Exercises

::: exercise Velocities from moduli {level=1 check="4.5"}
For upper-mantle peridotite with $K = 130\ \mathrm{GPa}$, $\mu = 67\ \mathrm{GPa}$ and $\rho = 3330\ \mathrm{kg\,m^{-3}}$, find $V_S$.
::: solution
$V_S = \sqrt{6.7\times10^{10}/3330} = \sqrt{2.012\times10^{7}} = 4.49\ \mathrm{km\,s^{-1}}$, close to the PREM value of $4.48$.
:::
:::

::: exercise Poisson ratio {level=1 check="1.83"}
A rock has $K/\mu = 2.0$. Find $V_P/V_S$.
::: solution
$V_P/V_S = \sqrt{K/\mu + 4/3} = \sqrt{3.333} = 1.83$. The corresponding Poisson's ratio is $\sigma = (V_P^2/2V_S^2 - 1)/(V_P^2/V_S^2 - 1) = 0.27$.
:::
:::

::: exercise The P-wave shadow {level=1}
P waves are not observed between $103^\circ$ and $142^\circ$ from an epicentre, and S waves are not observed beyond about $103^\circ$. What does each shadow tell you?
::: solution
The S shadow is the direct evidence for a liquid outer core: no shear wave can cross it, so no S arrives in the geometric shadow. The P shadow is evidence for a *drop* in $V_P$ at the core–mantle boundary (from $13.7$ to $8.1\ \mathrm{km\,s^{-1}}$), which refracts the waves towards the normal on entering the core and leaves a gap that is filled only beyond $142^\circ$ by waves that have traversed the core (PKP). Note the logic: the core is detected by a *combination* of a velocity drop and a rigidity drop.
:::
:::

::: exercise Incompressibility across the CMB {level=2 check="643"}
Just below the core–mantle boundary $V_P = 8.06\ \mathrm{km\,s^{-1}}$, $V_S = 0$, $\rho = 9900\ \mathrm{kg\,m^{-3}}$. Find $K$.
::: solution
$K = \rho V_P^2 = 9900\times(8060)^2 = 6.43\times10^{11}\ \mathrm{Pa} = 643\ \mathrm{GPa}$, essentially the same as the $647\ \mathrm{GPa}$ of the rock above. The incompressibility is continuous while the rigidity and the density are not.
:::
:::

::: exercise Clapeyron slope {level=2 check="17"}
Using $\gamma = +3\ \mathrm{MPa\,K^{-1}}$ for the 410-km discontinuity, find the depth shift produced by a $200\ \mathrm{K}$ *hot* anomaly ($\rho g = 3.5\times10^{4}\ \mathrm{Pa\,m^{-1}}$).
::: solution
$\Delta z = \gamma\Delta T/\rho g = 3\times10^{6}\times200/3.5\times10^{4} = 1.7\times10^{4}\ \mathrm{m} = 17\ \mathrm{km}$ deeper. Hot mantle therefore pushes the 410 down, which is observed beneath mid-ocean ridges and hot upwellings.
:::
:::

::: exercise Moment magnitude {level=2 check="7.7"}
An earthquake ruptures $200\ \mathrm{km}\times20\ \mathrm{km}$ with $4\ \mathrm{m}$ of slip and $\mu = 30\ \mathrm{GPa}$. Find $M_\text{w}$.
::: solution
$M_0 = 3\times10^{10}\times4\times10^{9}\times4 = 4.8\times10^{20}\ \mathrm{N\,m}$, so
$$
M_\text{w} = \tfrac{2}{3}(\log_{10}4.8\times10^{20} - 9.1) = \tfrac{2}{3}(20.68 - 9.1) = 7.7 .
$$
A magnitude of $8.0$ would require $1.3\times10^{21}\ \mathrm{N\,m}$, that is about $11\ \mathrm{m}$ of slip on the same area — which is why, for great earthquakes, the *area* and the *slip* matter more than any single measured displacement.
:::
:::

::: exercise Two-layer Earth {level=3}
For a two-layer Earth with $\rho_c = 11{,}000$ and $\rho_m = 4400\ \mathrm{kg\,m^{-3}}$, evaluate $I/Ma^2$ for a core radius fraction $x = 0.55$ and compare with the observed $0.3308$.
::: solution
$$
\frac{I}{Ma^2} = \frac{2}{5}\cdot\frac{11000\times0.55^5 + 4400(1 - 0.55^5)}{11000\times0.55^3 + 4400(1 - 0.55^3)} = \frac{2}{5}\cdot\frac{4400 + 6600\times0.0503}{4400 + 6600\times0.1664} = \frac{2}{5}\times\frac{4732}{5498} = 0.344 .
$$

Too high by $4\%$: with too small a core, the mass is not concentrated enough at the centre. The model can only reach $0.3308$ with $x \approx 0.70$, which is $4460\ \mathrm{km}$ — $1000\ \mathrm{km}$ more core than the Earth has. The missing concentration is supplied by the density gradient inside the mantle.
:::
:::

::: exercise The core's superheat {level=3}
Using the curves of [[#ex-melting]], find the pressure at which the melting curve and the adiabat differ by $1000\ \mathrm{K}$, and state what would happen to the inner core if the whole core cooled by $1000\ \mathrm{K}$ (take pressure to vary linearly with radius between $330\ \mathrm{GPa}$ at $1221\ \mathrm{km}$ and $135\ \mathrm{GPa}$ at $3480\ \mathrm{km}$).
::: solution
Solve $5200(P/330)^{0.55} = 5200 - 0.5(330 - P) - 1000$. Trying $P = 200$: left $3948$, right $4135$; $P = 170$: left $3630$, right $3985$; $P = 250$: left $4464$, right $4160$. The difference passes through $1000\ \mathrm{K}$ near $P \approx 215\ \mathrm{GPa}$, i.e. about $1000\ \mathrm{km}$ above the present inner-core boundary.

If the whole core cooled by $1000\ \mathrm{K}$, the adiabat would fall below the melting curve down to that pressure, and the inner core would grow outward to a radius of
$$
r = 1221 + \frac{330 - 219}{330 - 135}\times(3480 - 1221) = 2500\ \mathrm{km},
$$
more than twice its present $1221\ \mathrm{km}$. This is the mechanism of the inner core's growth, and it is why the inner core's age is a cooling-rate problem rather than a compositional one.
:::
:::

::: exercise Attenuation {level=3}
A shear wave of period $T = 20\ \mathrm{s}$ crosses $1000\ \mathrm{km}$ of the uppermost mantle where the quality factor is $Q_S = 100$. By what factor is its amplitude reduced?
::: solution
The amplitude decays as $\exp(-\pi f r/V_S Q_S)$. With $f = 0.05\ \mathrm{Hz}$, $r = 10^{6}\ \mathrm{m}$, $V_S = 4.5\times10^{3}\ \mathrm{m\,s^{-1}}$, $Q_S = 100$:
$$
\frac{\pi f r}{V_S Q_S} = \frac{\pi\times0.05\times10^{6}}{4.5\times10^{3}\times100} = 0.35 \quad\Longrightarrow\quad \text{factor} = e^{-0.35} = 0.70 .
$$

A $30\%$ loss of amplitude over $1000\ \mathrm{km}$ — and the effect is strongest where the mantle is hot and partially molten, which is why $Q$ maps (attenuation tomography) image melt better than velocity maps do. $Q$ is also the reason high-frequency energy from distant earthquakes disappears: a global network records teleseisms at $1\ \mathrm{Hz}$ but not at $10\ \mathrm{Hz}$.
:::
:::

::: exercise Anisotropy and flow {level=3}
Seismic waves travelling horizontally through the uppermost mantle along the direction of plate motion are $2$–$4\%$ faster than waves travelling across it. Explain the observation and state what it measures.
::: solution
Olivine is strongly anisotropic: its fastest $P$ direction, $[100]$, is about $25\%$ faster than its slowest. In the asthenosphere, dislocation creep aligns the crystals' fast axes with the flow, so the aggregate becomes transversely isotropic with the fast axis horizontal and parallel to motion. The observation therefore measures **lattice-preferred orientation**, and with it the present-day flow direction of the mantle beneath the plate — the closest thing geodynamics has to a direct measurement of mantle flow. The complication is that the lithosphere is also anisotropic (fossil fabric from past motion), so the two must be separated, usually by splitting measurements on shear waves at different periods ([[structural-geology/rheology]], [[geophysics/seismic-structure]]).
:::
:::
