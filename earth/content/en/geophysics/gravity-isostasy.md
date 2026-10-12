Gravity is the oldest geophysical method and still the most direct: a gravimeter measures the local acceleration of free fall, and every deviation of that measurement from the value expected for a smooth, rotating, homogeneous Earth is a statement about the distribution of mass beneath the instrument. Two ideas organise the whole subject. The first is that the Earth's figure — its flattening, its geoid, its gravity field — is a **hydrostatic** consequence of rotation and internal structure, so that gravity data measure the planet's **shape and density** at the same time. The second, and the one that made geophysics a science of the crust rather than of the planet, is **isostasy**: that topography is not carried by the strength of the rock but **floated** on the dense mantle below, so that a mountain has a root and the free-air anomaly over it is nearly zero.

## The figure of the Earth and its gravity field

::: definition The geoid, the ellipsoid and normal gravity {#def-geoid}
The Earth's surface is approximated by an **oblate spheroid** (the **reference ellipsoid**) with equatorial radius $a = 6{,}378.137\ \mathrm{km}$, polar radius $b = 6{,}356.752\ \mathrm{km}$ and **flattening**
$$
f = \frac{a-b}{a} = \frac{1}{298.257} .
$$
The **geoid** is the equipotential surface of the real gravity field that coincides with the mean sea surface extended through the continents; it departs from the ellipsoid by $-106$ to $+85\ \mathrm{m}$, a relief of only 19 cm on a 12 742-km globe, which is the origin of the (misleading) saying that the Earth is "smoother than a billiard ball" — it is smoother than a billiard ball **at the scale of the billiard ball's own imperfections**, and rougher at the scale relevant to a geodesist.

The **normal gravity** on the ellipsoid, in milligals, is given by the International Gravity Formula
$$
g(\varphi) = 978{,}032.7\left(1 + 0.0053024\sin^2\varphi - 0.0000059\sin^2 2\varphi\right),
$$
which rises by 5 138 mGal from the equator to the poles for two reasons: the poles are 21 km **closer** to the centre of mass, and the **centrifugal** acceleration vanishes there. The two effects are related by **Clairaut's theorem**, which for a fluid in hydrostatic equilibrium gives the **zonal harmonic**
$$
J_2 = \tfrac{2}{3}f - \tfrac{1}{3}m, \qquad m = \frac{\omega^2 a^3}{GM} = 0.003461 ,
$$
and predicts $J_2 = 0.001082$ against the observed $0.0010826$ — an agreement to 0.1 per cent that establishes that the Earth is, to first order, in **hydrostatic equilibrium**, and that the **non-hydrostatic** part of $J_2$ (about 1 per cent of it) is the fossil figure of the **mantle's** convection and of the last ice age.
:::

::: definition Anomalies and their corrections {#def-anomaly}
A gravity **anomaly** is the observed value minus the normal value at the same latitude, after a series of corrections that each remove a known geometric effect:
$$
\begin{array}{l|l|l}
\text{correction} & \text{magnitude} & \text{removes} \\ \hline
\text{drift and tide} & \text{varies} & \text{instrumental drift, Earth and ocean tides} \\
\text{free-air (FA)} & +0.3086\ \mathrm{mGal\,m^{-1}} & \text{height above the datum } (\partial g/\partial r = -2g/R) \\
\text{Bouguer (BC)} & -0.1119\,\rho\ \mathrm{mGal\,m^{-1}} & \text{the slab of rock between station and datum } (2\pi G\rho h) \\
\text{terrain (TC)} & \text{up to } \pm 50\ \mathrm{mGal} & \text{nearby topographic masses (Hammer zones, digital elevation models)} \\
\text{air (AC)} & -0.0001\ \mathrm{mGal\,m^{-1}} & \text{the atmospheric column above the station}
\end{array}
$$
The **free-air anomaly** $\Delta g_{\mathrm{FA}}$ retains the mass of the topography and is therefore the anomaly that tests **isostasy**: it is near zero over a compensated mountain and strongly positive over an uncompensated one. The **Bouguer anomaly** $\Delta g_{\mathrm{B}} = \Delta g_{\mathrm{FA}} - 2\pi G\rho h$ removes the crustal layer as well and is therefore the anomaly that images **deep structure**: a negative Bouguer anomaly means a **thick crust or a shallow mantle**, a positive one a **dense body or a thin crust**. The two together are the fundamental data set of regional tectonics, and their joint interpretation is the **isostatic anomaly** and the **Moho depth estimate**.
:::

::: example A gravity station and its anomalies {#ex-anomaly}
A gravimeter on a plateau at 1800 m reads $g = 979{,}654.2\ \mathrm{mGal}$; the normal gravity at that latitude is $979{,}956.8\ \mathrm{mGal}$. Take the crustal density as $2670\ \mathrm{kg\,m^{-3}}$ and the terrain correction as $+3.1\ \mathrm{mGal}$. Find the free-air and Bouguer anomalies, and interpret.
::: solution
The raw difference is
$$
\Delta g_{\mathrm{obs}} = 979{,}654.2 - 979{,}956.8 = -302.6\ \mathrm{mGal}.
$$
Adding the free-air correction for the 1800 m of elevation,
$$
\Delta g_{\mathrm{FA}} = -302.6 + 0.3086\times1800 + 3.1 = -302.6 + 555.5 + 3.1 = +256.0\ \mathrm{mGal},
$$
and the Bouguer correction for the slab of crust between the station and sea level,
$$
\text{BC} = 0.1119\times1800 = 201.4\ \mathrm{mGal}, \qquad
\Delta g_{\mathrm{B}} = 256.0 - 201.4 = +54.6\ \mathrm{mGal}.
$$
The coefficient $0.1119\ \mathrm{mGal\,m^{-1}}$ already contains the density $2.67\ \mathrm{g\,cm^{-3}}$, so no further density factor is applied; for a crust of $2500\ \mathrm{kg\,m^{-3}}$ the coefficient is $0.1048$ and the correction $188.6\ \mathrm{mGal}$.
Both anomalies are **positive**, and that is diagnostic. A high-standing region in **local Airy isostasy** has a free-air anomaly near **zero** and a strongly **negative** Bouguer anomaly, because the root replaces mantle with crust. Here the free-air anomaly is $+256$ mGal, which means the mass of the plateau is **not** compensated by a root of the Airy type, and the Bouguer anomaly is **positive**, which means there is **no** deep crustal root at all.

The interpretation is that the plateau is supported by the **flexural strength** of a thick, cold lithosphere and by **dynamic** support from mantle flow, not by local isostasy — the signature of the **Altiplano**, the **Dinaric** plateau and the **Erta Ale** swell, and the opposite of the Tibetan signature. The alternative reading, that the station sits on a **dense intrusive body** at shallow depth, is excluded by the **regional** extent of the anomaly and by the absence of a corresponding magnetic anomaly, and confirmed by the **seismic** constraint that the Moho is at normal depth.

The arithmetic trap in this example is the one that catches every student: the free-air correction is **added** and the Bouguer correction **subtracted**, and the free-air correction is $+0.3086$ per metre of **elevation** whether the station is on a mountain or in a mine. A sign error produces a Bouguer anomaly in error by twice the Bouguer term, which for 1800 m is 400 mGal — larger than any anomaly the method can detect.
:::
:::

::: definition Airy, Pratt and the pressure at depth {#def-isostasy}
**Isostasy** is the hypothesis that the vertical stress (the **pressure**) at a deep **compensation depth** is the same beneath a mountain and beneath a plain, so that no lateral stress gradient and no long-term flow is required to hold the topography up. The two classical realisations differ in **where** the low-density mass is placed:
$$
\begin{array}{ll}
\textbf{Airy (1855)}: & \text{crust of constant density and variable thickness, } r = h\,\dfrac{\rho_c}{\rho_m-\rho_c} \\[8pt]
\textbf{Pratt (1855)}: & \text{crust of constant depth and laterally varying density, } \rho_1(h_1+d) = \rho_2(h_2+d)
\end{array}
$$
For $h = 5\ \mathrm{km}$, $\rho_c = 2800$ and $\rho_m = 3300\ \mathrm{kg\,m^{-3}}$, the Airy root is $5\times2800/500 = 28\ \mathrm{km}$, giving a total crustal thickness of about $70\ \mathrm{km}$ — the observed depth of the Moho beneath Tibet and the Andes, and the single most successful quantitative prediction in the history of the subject. The **observed** free-air anomaly over a region in perfect local isostasy is **exactly zero**, and the departure of the observed free-air anomaly from zero measures the **fraction of the load supported by something other than local isostasy** — by flexure, by dynamic flow, or by the buoyancy of a thermal anomaly.

The **Bouguer** correction density is itself an isostatic parameter, and the choice is not free: **Vening Meinesz** showed that the density that makes the Bouguer anomaly of a region vanish is the **isostatic reduction density**, empirically $2600$–$2900\ \mathrm{kg\,m^{-3}}$ for the continents and empirically $2600$ to $2900\ \mathrm{kg\,m^{-3}}$, which is the density of the **average** crust rather than of any particular rock. A reduction density of $1600\ \mathrm{kg\,m^{-3}}$ that makes the anomaly vanish over a sedimentary basin is therefore a statement about the **compensation** of the basin, not about the density of its fill.
:::

::: widget plot
f: 5.6*x
x: 0, 6
y: 0, 35
labels: \text{root}
caption: The Airy root $r = h\,\rho_c/(\rho_m-\rho_c)$ for $\rho_c = 2800$ and $\rho_m = 3300\ \mathrm{kg\,m^{-3}}$, giving a root-to-elevation ratio of **5.6**. The ratio is a **strongly nonlinear function of the density contrast**, and a mantle 50 kg m⁻³ denser (3350) lowers it to 4.9 and a crust 100 kg m⁻³ less dense (2700, a granitic or hydrothermally altered crust) lowers it to 5.4 — so a Moho depth estimated from an elevation is uncertain by several kilometres even when the elevation is known exactly. The line is used in both directions: an **elevation** predicts a Moho depth, and a **seismic** Moho depth predicts the elevation at which the region would be in isostatic equilibrium, whose difference from the observed elevation is the **dynamic topography** — the quantity that mantle-convection models actually predict and that is now the standard comparison between geodynamics and observation.
:::

## Flexure and the strength of the lithosphere

::: definition The elastic plate and the flexural parameter {#def-flexure}
A real lithosphere does not flow locally: it **bends**. Loading a two-dimensional elastic plate of **flexural rigidity**
$$
D = \frac{E\,t_e^{3}}{12(1-\nu^2)}
$$
by a load $\Delta\rho\, g\, h$ on a fluid of density $\Delta\rho$ gives a deflection $w(x)$ obeying
$$
D\frac{d^4 w}{dx^4} + \Delta\rho\, g\, w = q(x),
$$
whose solution for a point load is a **damped oscillation** with the **flexural parameter**
$$
\alpha = \left(\frac{4D}{\Delta\rho\, g}\right)^{1/4},
$$
the distance over which the plate's response decays by $1/e$. For $t_e = 30\ \mathrm{km}$, $E = 70\ \mathrm{GPa}$, $\nu = 0.25$ and $\Delta\rho = 500\ \mathrm{kg\,m^{-3}}$, $D = 1.68\times10^{23}\ \mathrm{N\,m}$ and $\alpha = 108\ \mathrm{km}$; for $t_e = 15\ \mathrm{km}$, $\alpha = 64\ \mathrm{km}$. The **observed** shape of the geoid and free-air anomaly over a **seamount** or a **subduction trench** therefore determines $t_e$ — the **elastic thickness of the lithosphere** — and the values, 5–15 km at young oceanic plates and 20–40 km at old, cold, Precambrian cratons, are among the most important and most misunderstood numbers in geodynamics.

The **misunderstanding** is that $t_e$ is a **thickness**. It is not: it is the thickness of an **equivalent** plate that would bend as much as the real one, and the real lithosphere **yields** when the basal stress exceeds about 100–300 MPa, so its long-term behaviour is that of an **elastic plate over a plastic core** — the **yield-strength envelope** or "**knee**" of **Watts, Bunge, and the "strength of the lithosphere" school** (Watts). The short-term strength (from the **envelope of yield moments** and from post-glacial rebound) is much greater than the long-term strength (from the **bathymetry of the deep-sea trenches** and from **subduction** bending), and the discrepancy of a factor of ten is one of the outstanding problems of the field.
:::

::: example The elastic thickness from a seamount {#ex-te}
A volcanic seamount 1200 m high and 40 km wide stands on oceanic lithosphere 30 Myr old, and the gravity and bathymetry data require a flexural parameter of $\alpha = 70\ \mathrm{km}$. Find the flexural rigidity and the elastic thickness, taking $\Delta\rho = 600\ \mathrm{kg\,m^{-3}}$, $E = 70\ \mathrm{GPa}$ and $\nu = 0.25$.
::: solution
Inverting the flexural parameter,
$$
D = \frac{\Delta\rho\, g\, \alpha^{4}}{4}
   = \frac{600\times9.81\times(7.0\times10^{4})^{4}}{4}
   = \frac{5886\times2.401\times10^{19}}{4} = 3.54\times10^{22}\ \mathrm{N\,m},
$$
and inverting the rigidity,
$$
t_e = \left[\frac{12(1-\nu^2)D}{E}\right]^{1/3}
    = \left[\frac{12\times0.9375\times3.54\times10^{22}}{7.0\times10^{10}}\right]^{1/3}
    = \left(5.68\times10^{12}\right)^{1/3} = 17.8\ \mathrm{km}.
$$
An elastic thickness of **18 km** at 30 Myr is at the **low** end of the observed range, and the interpretation depends on which of the two competing models of oceanic flexure is accepted. The **elastic plate** model gives a $t_e$ that **increases** with the age of the plate as the thermal boundary layer thickens, roughly $t_e \propto \sqrt{\text{age}}$, and predicts 10 km at 5 Myr and 30 km at 100 Myr. The **yield-strength-envelope** model gives a $t_e$ that **saturates** at 20–30 km because the plate **yields** at its base, and predicts a nearly constant value. The observations support the **envelope** model for old plates and the **elastic** model for young ones, and the 18 km here is consistent with either.

Three systematic errors dominate. **The load is not a point**: a 40-km-wide seamount loads a region comparable to $\alpha$ itself, and the point-load solution overestimates $t_e$ by 20–30 per cent. **Infill**: the sediment-filled **moat** around the seamount adds mass that was not in the original load and that partly fills the depression, and if it is ignored the modelled deflection is too shallow and $t_e$ too large. **And the "oceanic" $\Delta\rho$ is not 600**: the density contrast between the load, the crust and the mantle varies with the age and the thermal state, and a 20 per cent error in $\Delta\rho$ is a 5 per cent error in $t_e$ because $t_e \propto \Delta\rho^{1/3}$.

The reason the number matters is that $t_e$ controls the **geoid** and the **gravity** signature of subduction zones, the **stress** field that drives intraplate deformation, and the **rate** at which a loaded lithosphere relaxes. A $t_e$ of 40 km beneath a continental interior means that a mountain belt loads its **foreland** across hundreds of kilometres and that the **foreland basin** is a flexural feature; a $t_e$ of 10 km means the load is compensated locally and the basin is narrow.
:::
:::

::: example Post-glacial rebound and the mantle's viscosity {#ex-gia}
Fennoscandia was deglaciated 10 000 years ago, leaving a former ice-load centre of about 1000-km half-wavelength. The present uplift rate at the centre is $9\ \mathrm{mm\,yr^{-1}}$. Taking a mantle viscosity of $10^{21}\ \mathrm{Pa\,s}$, a density of $3300\ \mathrm{kg\,m^{-3}}$ and $g = 9.81\ \mathrm{m\,s^{-2}}$, find the relaxation time, the uplift rate immediately after deglaciation, and the uplift still to come.
::: solution
For a sinusoidal load of wavenumber $k = 2\pi/L$ with $L = 1000\ \mathrm{km}$, the **Maxwell** relaxation time of the mantle is
$$
\tau = \frac{\eta k}{\rho g} = \frac{10^{21}\times6.283\times10^{-6}}{3300\times9.81}
    = \frac{6.283\times10^{15}}{3.237\times10^{4}} = 1.94\times10^{11}\ \mathrm{s} = 6{,}150\ \mathrm{yr}.
$$
The uplift decays exponentially, so the rate immediately after deglaciation was
$$
u_0 = u(t)\,e^{t/\tau} = 9\times e^{10000/6150} = 9\times5.06 = 46\ \mathrm{mm\,yr^{-1}},
$$
and the uplift **still to come** is the integral of the remaining decay,
$$
\Delta z_{\mathrm{remaining}} = u(t)\,\tau = 0.009\times6150 = 55\ \mathrm{m}.
$$
The **total** post-glacial uplift is $u_0\tau = 46\times6150 = 280\ \mathrm{m}$, against the 250–300 m recorded by the raised shorelines of northern Sweden and Finland, and the remaining 55 m against the 30–40 m predicted by the modern glacial-isostatic-adjustment models.

The agreement is good enough that the calculation is the **classical determination of the mantle's viscosity**, and the three caveats are the reason the modern number is quoted as a **range** of $0.5$–$5\times10^{21}\ \mathrm{Pa\,s}$ rather than a value. The load is **not** sinusoidal, and the real ice history — its thickness, its margins and its timing — is itself an unknown that trades off against viscosity. The mantle is **not** a half-space of uniform viscosity: the **670-km discontinuity** is a viscosity increase of one to two orders of magnitude, and a model with $10^{21}$ above and $10^{22}$ below fits the **relative sea-level curves** far better than a uniform model, which is the origin of the "two-layer" viscosity model. And the **lithosphere** has a finite thickness of 100–120 km that **delays** the early response and is the reason the **Fennoscandian** uplift pattern has a **peripheral bulge** that migrated through the Holocene.

The number matters far beyond Scandinavia. The same viscosity controls the **eustatic** correction to the tide-gauge record of modern sea level — the **glacial isostatic adjustment** correction that must be applied to every tide gauge on a formerly glaciated margin, and which turns a measured $+1.5\ \mathrm{mm\,yr^{-1}}$ in Stockholm into a global-eustatic $+3.2\ \mathrm{mm\,yr^{-1}}$ — the **gravity-field** change $J_2$ trend measured by satellite, the **true polar wander** of the whole planet, and the **relative sea-level** record from which the ice-sheet history is reconstructed in the first place. The circularity — viscosity from ice history, ice history from sea level, sea level from viscosity — is broken by the **space-borne** measurements of the present-day gravity change from GRACE, which measure the mass change directly and independently.
:::
:::

::: example Is the load compensated? {#ex-compensated}
A volcanic seamount rises 1200 m above the surrounding oceanic crust and has a mean density of $2600\ \mathrm{kg\,m^{-3}}$. Find the free-air anomaly it would produce if it were (a) completely uncompensated, and (b) compensated by a flexural depression of the lithosphere, and state what is observed.
::: solution
**(a)** An uncompensated load is a slab of excess mass $\rho h$, and its attraction is
$$
\Delta g = 2\pi G\rho h = \frac{4.193\times10^{-10}\times2600\times1200}{10^{-5}} = 131\ \mathrm{mGal}.
$$
**(b)** A load supported by **flexure** pushes the lithosphere down by $w$, replacing rock of density $\rho_m - \rho_{\mathrm{sw}} \approx 3200\ \mathrm{kg\,m^{-3}}$ by water and sediment, so the compensation is **partial** and distributed over a width of order the flexural parameter $\alpha$. For a load on a plate with $\alpha = 70\ \mathrm{km}$ and a load width of 40 km, the central deflection is a substantial fraction of the load height and the **net** free-air anomaly over the summit falls to a few tens of mGal, while a **positive ring** appears at a distance of about $\alpha$ where the **peripheral bulge** raises the seafloor.

The **observed** free-air anomaly over a mature Pacific seamount is a central value of $+10$ to $+40\ \mathrm{mGal}$ with a ring of $+30$ to $+60\ \mathrm{mGal}$ at 60–120 km — a factor of three to ten less than the uncompensated value, and the classic demonstration that the oceanic lithosphere supports **most** of its topography by **flexure** rather than by local isostasy or by strength.

Three consequences make the observation quantitative. The **ratio** of the observed to the uncompensated anomaly is a direct estimate of the **compensation fraction**, and hence, with the bathymetry, of $\alpha$ and $t_e$. The **wavelength** of the peripheral bulge is a **direct** measurement of $\alpha$ independent of the amplitude, and is the reason the gravity-and-bathymetry method works: the bulge's wavelength is set by the flexural parameter alone and is insensitive to the load's shape and to the density. And the **geoid** step across the trench or seamount, of order a few tens of centimetres, is measurable by satellite altimetry to 1 cm and is how the **global** map of the lithosphere's elastic thickness was made from **satellite gravity** alone, without a single ship track.
:::
:::

::: warning A gravity anomaly is an integral, and integrals do not have unique answers
Gravity is the most **non-unique** of all geophysical methods, and the fact is worth stating before any interpretation. **The fundamental non-uniqueness**: any mass distribution can be replaced by another that produces the same external field, so a 20-mGal Bouguer low can be a 5-km-thick sedimentary basin at 2 km depth, a 20-km-thick one at 20 km, a low-density mantle, or the edge of a **dense** body — and the **upward-continuation** and **wavelength** of the anomaly constrain its **depth** but not its **nature**. **The density problem**: the Bouguer correction requires a density, and the density of the crust varies from 2500 to 3000 kg m⁻³, so a Bouguer anomaly map computed with a single density contains a **spurious** long-wavelength anomaly of up to 40 mGal over any region where the crustal density changes by 100 kg m⁻³ — which is more than most of the signal being interpreted. **The terrain problem**: a single 100-m cliff 2 km from a station produces a 20-mGal terrain effect, and a gravity map made from a coarse digital elevation model contains **artefacts** at every escarpment. **And the isostasy problem**: the free-air anomaly is near zero over a compensated region **whatever the compensation mechanism**, so a "zero free-air anomaly" is **not** evidence for Airy isostasy, and the discrimination between Airy, Pratt, flexure and dynamic support requires the **wavelength** of the anomaly, the **geoid**, and independent constraints on the Moho and the mantle density. The discipline is to publish the **density assumed, the terrain model and its resolution, the tidal and drift corrections, and the reduction density**, and to present a gravity interpretation as a **set of models consistent with the data** with their misfits, never as a single cross-section.
:::

::: history
The **plumb-line** deflections that first revealed isostasy are the work of the **Great Trigonometrical Survey of India** under **Lambton** (Lambton) and **Everest** (Everest), whose 1852 measurement of the deviation of the vertical near the Himalaya could not be explained by any crustal model then available; **Airy** (Airy) proposed the root in 1855 and **Pratt** (Pratt) the density variant in the same year, and **Clarke and Airy** (Clarke) computed the first **reduction tables**. **Bouguer** (Bouguer) carried the first pendulum gravity measurements to the Andes in 1737 and the method is named for him; **Laplace**, **Clairaut** (Clairaut) and **Stokes** (Stokes) established the figure-of-the-Earth theory in 1743–1849, and **Stokes'** (Stokes) 1849 integral remains the basis of physical geodesy. **Vening Meinesz** (Meinesz) invented the **zenith-angle** method of measuring the vertical deflections of the plumb line from a submarine in the 1920s, discovered the large free-air anomalies over the mid-ocean ridges, and formulated the **flexure** theory of the lithosphere in 1941. **Heiskanen and Vening Meinesz** (Heiskanen) wrote the standard *The Earth and Its Gravity Field* in 1958, **Worzel** (Worzel) established the **regional isostasy** of the continents, and **Oldenburg** (Oldenburg) and **Turcotte and Sandwell** (Sandwell) developed the **gravity-and-geoid** method for the oceanic lithosphere's elastic thickness. **Walcott** (Walcott) established the **yield-strength envelope** in 1970, **Molnar and Lyon-Caen** (Molnar) and **Burov and Diament** (Burov) the **knee** and the **strength paradox**, and **Watts** (Watts) wrote *Isostasy and Flexure of the Lithosphere* in 2001. Satellite gravimetry is the work of **Tapley and the GRACE consortium** (Tapley), of **Drinkwater and the GOCE mission** (Drinkwater), and of **Pavlis, Holmes and the EGM2008 and XGM2019 teams** (Pavlis).
:::

## Where this leads

The flexure of the lithosphere under loads is developed in [[geophysics/flexure]], the seismic structure that the Moho depths are calibrated against is in [[geophysics/seismic-structure]], the isostatic response to ice loading and the mantle viscosity are in [[glaciology/ice-sheets]] and [[geomorphology/landscape-evolution]], the Earth's figure, rotation and moment of inertia are in [[planetary-science/interiors]] and [[planetary-science/formation]], the gravity method in exploration is in [[geophysics/exploration]], the sea-surface topography measured by altimetry is in [[oceanography/sea-level]] and [[remote-sensing/radar-lidar]], and the dynamic topography of mantle convection is in [[geophysics/heat-flow]].

::: quiz
A plateau 2 km high has a free-air anomaly of about zero and a Bouguer anomaly of −250 mGal. What does this show?
- [ ] A dense mantle beneath the plateau.
- [x] Local isostatic compensation by a crustal root.
- [ ] A mantle plume.
- [ ] A thick sedimentary cover.
::: solution
A free-air anomaly of zero over elevated terrain is the definition of isostatic compensation: the mass of the plateau is balanced by a low-density root, so the total column has the same weight as the reference column. The strongly negative Bouguer anomaly then follows automatically, because the Bouguer correction removes the topography but not the root. A dense mantle or a plume would give a **positive** free-air and Bouguer anomaly, and a thick sedimentary cover a **negative** Bouguer anomaly with a **non-zero** free-air anomaly.
:::
:::

::: summary
- Normal gravity rises 5138 mGal from equator to pole, and Clairaut's theorem links the flattening, the rotation and the zonal harmonic — which proves the Earth is nearly in hydrostatic equilibrium.
- The free-air anomaly tests isostasy; the Bouguer anomaly images deep structure; the two together constrain the Moho.
- Airy compensation puts the low-density mass in a root of 5.6 times the elevation; Pratt puts it in a laterally varying density.
- Real lithosphere bends rather than flows locally, and the flexural parameter — 60–110 km for elastic thicknesses of 15–30 km — measures its strength.
- The elastic thickness is an equivalent thickness, not a real one, and the yield-strength envelope reconciles it with the weakness implied by subduction.
- Gravity interpretation is non-unique, and every anomaly map must be published with its densities, its terrain model and its family of admissible models.
:::

## Exercises

::: exercise Normal gravity {level=1 check="981919"}
Find the normal gravity at latitude $60^\circ$ in mGal using $g = 978{,}032.7(1 + 0.0053024\sin^2\varphi - 0.0000059\sin^2 2\varphi)$.
::: solution
$\sin^2 60^\circ = 0.75$ and $\sin^2 120^\circ = 0.75$, so the bracket is $1 + 0.003977 - 0.0000044 = 1.003973$ and
$$
g = 978{,}032.7\times1.003973 = 981{,}919\ \mathrm{mGal} \approx 981.9\ \mathrm{Gal}.
$$
The 39-Gal difference from the equator is the combined effect of the smaller radius and the absent centrifugal acceleration.
:::
:::

::: exercise Free-air correction {level=1 check="154"}
Find the free-air correction for a station at 500 m.
::: solution
$0.3086\times500 = 154\ \mathrm{mGal}$. The correction is **added** to the observed-minus-normal difference, because gravity decreases with height and a station above the datum reads low. Forgoing it on a 500-m plateau produces an error of 154 mGal, which is larger than the whole isostatic signal.
:::
:::

::: exercise Bouguer slab {level=1 check="201"}
Find the Bouguer correction for 1800 m of crust at $\rho = 2670\ \mathrm{kg\,m^{-3}}$.
::: solution
$2\pi G\rho h = 0.1119\times1800 = 201\ \mathrm{mGal}$. The coefficient $0.1119\ \mathrm{mGal\,m^{-1}}$ is for $\rho = 2.67\ \mathrm{g\,cm^{-3}}$; for a sedimentary basin at $\rho = 2300$ it is $0.0965$, and using the wrong density is a 14 per cent error in the Bouguer anomaly of any elevated region.
:::
:::

::: exercise Airy root {level=2 check="16.8"}
Find the Airy root beneath a 3-km plateau with $\rho_c = 2800$ and $\rho_m = 3300\ \mathrm{kg\,m^{-3}}$, and the resulting Moho depth if the reference Moho is at 35 km.
::: solution
$r = 3\times2800/500 = 16.8\ \mathrm{km}$, so the Moho lies at $35 + 16.8 = 52\ \mathrm{km}$. The **total** crustal thickness is 52 km and the **root** is 16.8 km; confusing the two is a common error, and the seismic Moho beneath the Altiplano at 55–65 km is consistent with a somewhat denser or thicker crust than assumed here.
:::
:::

::: exercise Pratt compensation {level=2 check="2.6"}
Two columns of crust stand at 0 and 2 km with a common compensation depth 30 km below sea level. If the higher column has $\rho = 2600\ \mathrm{kg\,m^{-3}}$, find the density of the lower one.
::: solution
Equal mass per unit area: $\rho_1(2+30) = \rho_2(0+30)$, so $\rho_2 = 2600\times32/30 = 2773\ \mathrm{kg\,m^{-3}}$ — about $2.8\ \mathrm{Mg\,m^{-3}}$. A 2-km elevation difference in Pratt's scheme requires a 170 kg m⁻³ density contrast, which is a **large** fraction of the crustal density and is not observed; this is why Pratt compensation is restricted to **young, hot, oceanic** lithosphere and to **sedimentary** margins, where the density really does vary with the thermal state.
:::
:::

::: exercise Flexural rigidity {level=2 check="108"}
Find the flexural parameter for $D = 1.68\times10^{23}\ \mathrm{N\,m}$ and $\Delta\rho = 500\ \mathrm{kg\,m^{-3}}$.
::: solution
$\alpha = (4D/\Delta\rho g)^{1/4} = (6.72\times10^{23}/4905)^{1/4} = (1.37\times10^{20})^{1/4} = 108\ \mathrm{km}$. Because $\alpha \propto t_e^{3/4}$, a factor-of-two error in $t_e$ is a factor of 1.7 in $\alpha$, and a factor-of-two error in $\Delta\rho$ is only 19 per cent — which is why the elastic thickness is well determined and the load's density is not.
:::
:::

::: exercise Clairaut and the figure {level=3 check="0.00108"}
Using $f = 1/298.257$ and $m = \omega^2 a^3/GM = 0.003461$, compute the hydrostatic $J_2$ and compare with the observed 0.0010826.
::: solution
$$
J_2 = \tfrac{2}{3}f - \tfrac{1}{3}m = 0.0022352 - 0.0011538 = 0.0010814 ,
$$
against the observed 0.0010826 — an agreement to **0.1 per cent**. The implication is one of the most important in planetary science: the Earth's gravity field is **hydrostatic**, so its figure records its **rotation and density distribution** and not its tectonic history, and the **non-hydrostatic** residual of 1 part in 100 is the whole of the signal from mantle convection, glacial isostatic adjustment and lateral density structure.

The same calculation on **Jupiter** gives a hydrostatic $J_2$ that agrees with observation to 1 per cent and on **Titan** to better than 1 per cent, which is why Titan is taken to have a **global subsurface ocean** — a body that has relaxed to hydrostatic equilibrium — and why the **non-hydrostatic** $J_2$ of **Enceladus** and **Iapetus** is taken to mean they are **not** in hydrostatic equilibrium and preserve a **fossil** figure from a warmer past. The test costs two numbers and is one of the most powerful in comparative planetology.
:::
:::

::: exercise Dynamic topography {level=3 check="141"}
A region stands 1.0 km above the elevation predicted by Airy isostasy for its Moho depth and crustal thickness. Estimate the **dynamic topography** it requires, taking $\rho_c = 2800$, $\rho_m = 3300\ \mathrm{kg\,m^{-3}}$ and a compensation depth of 200 km, and state what physical mechanism could supply it.
::: solution
The isostatic balance says that an excess elevation $\delta h$ must be balanced by a **deficit** of mass in the column below it. The mass of the excess topography is $\rho_c\,\delta h = 2.8\times10^{6}\ \mathrm{kg\,m^{-2}}$, and the density anomaly $\delta\rho$ spread over a compensation depth $H = 200\ \mathrm{km}$ must satisfy
$$
\delta\rho\, H = \rho_c\,\delta h \quad\Rightarrow\quad
\delta\rho = \frac{2.8\times10^{6}}{2\times10^{5}} = 14\ \mathrm{kg\,m^{-3}} .
$$
A density deficit of 14 kg m⁻³ in the upper 200 km of the mantle is equivalent, with a thermal expansion coefficient of $3\times10^{-5}\ \mathrm{K^{-1}}$ and a mantle density of 3300 kg m⁻³, to a temperature anomaly of
$$
\Delta T = \frac{14}{3300\times3\times10^{-5}} = 141\ \mathrm{K}.
$$
A **140-K thermal anomaly in the top 200 km of the mantle** is the dynamic support of 1 km of extra elevation, and it is supplied by **mantle upwelling** — a plume head, an edge-convection cell, or the return flow beneath a rift. The alternative mechanisms are a **compositionally** lighter mantle (melt-depleted harzburgite is about 2 per cent less dense than fertile peridotite, which is far too much and would give 10 km of elevation) and the **dynamic pressure** of a convecting flow, $\eta U/\ell$, which for a mantle viscosity of $10^{21}\ \mathrm{Pa\,s}$, a velocity of $5\ \mathrm{cm\,yr^{-1}}$ and a length of 1000 km is only $0.8\ \mathrm{MPa}$ and supports tens of metres rather than kilometres.

The number is the reason the **dynamic topography** of the Earth is estimated at only $\pm 500$ to $\pm1000\ \mathrm{m}$ from isostatic residuals, and why the whole of the **African** and **Icelandic** swells and the **East African** plateau are attributed to mantle flow rather than to crustal processes.
:::
:::
