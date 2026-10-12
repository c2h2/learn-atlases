The crust does not float locally. When a load is placed on the lithosphere — a volcano, an ice sheet, a mountain belt, a sediment prism — the plate **bends**, and the bending spreads the depression laterally for a hundred kilometres or more, raises a **peripheral bulge** beyond it, and stores in the plate a **bending moment** that tells you how strong the lithosphere is. Flexure is therefore the only method that measures the **strength** of the lithosphere rather than its structure, and its results — an elastic thickness of 5–15 km beneath young ocean and 20–40 km beneath old cratons, and a long-term strength far below the short-term one — are among the most consequential and most contested numbers in geodynamics.

## The elastic plate

::: definition The flexural equation and its length scale {#def-plate}
A thin elastic plate of **flexural rigidity** $D$ bending under a load $q(x)$ on a fluid of density contrast $\Delta\rho$ obeys
$$
D\frac{d^{4}w}{dx^{4}} + \Delta\rho\, g\, w = q(x), \qquad
D = \frac{E\,t_e^{3}}{12(1-\nu^{2})},
$$
where $w(x)$ is the deflection, $t_e$ the **elastic thickness** and $E$ and $\nu$ Young's modulus and Poisson's ratio. The equation has one intrinsic length, the **flexural parameter**
$$
\lambda = \alpha = \left(\frac{4D}{\Delta\rho\, g}\right)^{1/4} = 108\ \mathrm{km}\left(\frac{t_e}{30\ \mathrm{km}}\right)^{3/4}\left(\frac{500}{\Delta\rho}\right)^{1/4},
$$
and every flexural problem is scaled by it. For a **line load** $Q_0$ (N m⁻¹) applied at $x = 0$ the solution for $x \geq 0$ is the damped oscillation
$$
w(x) = \frac{2Q_0}{\Delta\rho\, g\, \lambda}\, e^{-x/\lambda}\left[\cos\left(\frac{x}{\lambda}\right) + \sin\left(\frac{x}{\lambda}\right)\right],
$$
whose **central depression** is $w_0 = 2Q_0/(\Delta\rho g\lambda)$, whose **first zero** is at $x = 3\pi\lambda/4 = 2.36\lambda$, and whose **peripheral bulge** crests at $x = \pi\lambda = 3.14\lambda$ with an amplitude of $0.043\,w_0$. The three features — the depression, the zero and the bulge — are what one looks for in a bathymetric, gravity or geoid profile, and the **wavelength** of the bulge determines $\lambda$ and therefore $D$ and $t_e$ **independently of the load**, which is what makes the method quantitative rather than merely suggestive.

The **load itself** is the subtlest part of every flexural calculation. The plate does not support the **present** topography, most of which is already balanced by its own Airy root; it supports the **ancestral** or **fossil** topography $h_a$ — the palaeoelevation of the load at the time of loading, computed from the **palaeobathymetry** of the foreland basin and from the **thermobarometry** of the exhumed orogen. Using the present topography instead overestimates the load by a factor of three to ten and the resulting $t_e$ by a corresponding amount, and the disagreement between published elastic thicknesses of the same orogen is largely a disagreement about the ancestral topography.
:::

::: widget plot
f: exp(-x)*(cos(x)+sin(x))
x: 0, 5
y: -0.15, 1.05
labels: w/w_0
caption: The flexural response $w/w_0 = e^{-u}(\cos u + \sin u)$ to a line load, plotted against distance in units of the flexural parameter $u = x/\lambda$. The deflection crosses zero at $u = 3\pi/4 = 2.36$ and reaches a **peripheral bulge** of $-0.043$ at $u = \pi = 3.14$ — a rise of only 4 per cent of the central depression, which is why the bulge is so often missed and why, when it **is** found, it is the most reliable constraint on $\lambda$. The same curve describes the **moat** around a seamount, the **foreland basin** of an orogen, the **uplift pattern** of a deglaciated ice sheet and the **hinge-line** of a rifted margin, and the fact that four such different phenomena share one dimensionless shape is the strongest single piece of evidence that the lithosphere really does behave as an elastic plate.
:::

## Three natural laboratories

::: definition Seamounts and the age dependence of $t_e$ {#def-seamount}
An isolated volcanic seamount loads the oceanic lithosphere by $10^{12}$–$10^{14}\ \mathrm{N}$ and produces a **moat** of subsided seafloor and a **peripheral bulge**, both buried under sediment whose thickness mirrors the deflection. Because the load is **axisymmetric** and stands **alone**, the geometry is clean, the load is known from the volcano's own volume, and the **infill** correction is tractable — which is why seamounts, and the **Hawaiian–Emperor** and **Abyssal** swells, are the type locality of marine flexure. The systematic result of thirty years of **geoid-and-bathymetry** and **free-air-anomaly** analysis is that the elastic thickness of the oceanic lithosphere **increases with its age** at loading, from about 5–10 km at 5 Myr to 20–40 km at 100 Myr, roughly following the **thickness of the thermal boundary layer** $t_e \propto \sqrt{\text{age}}$ — the observation that the **isotherms** of the cooling plate define the strength, and that the **1200 °C isotherm** at about 40 km depth is the base of the elastic layer.

Two complications remain. The **yield-strength-envelope** model predicts that $t_e$ should **saturate** at 20–30 km because the plate's base yields rather than bending elastically, and the data are consistent with saturation beyond 50 Myr. And the **loading rate** matters: a seamount loads over 1 Myr, which is short compared with the Maxwell time of the cold lithosphere but long compared with that of the hot asthenosphere, so the plate behaves **elastically** at its top and **viscously** below, and the "elastic thickness" is a **frequency-dependent** quantity — the same lithosphere that bends elastically under a seamount flows viscously under a 10-Myr sediment load.
:::

::: definition Orogens, foreland basins and the yield-strength envelope {#def-foreland}
A mountain belt loads the adjacent continental plate and creates a **foreland basin**: the Alpine foreland of Switzerland and Bavaria, the Appalachian foreland of Pennsylvania, the Sub-Himalayan foreland of the Ganges, the Andean foreland of Bolivia. The basin's **depth**, **width** and **sediment-fill** history are the classic flexural data, and the elastic thicknesses they yield — 20–40 km for the North American and European cratons, 10–20 km for younger margins — are the reason the foreland basin is called a **flexural** basin. Its **asymmetry** (the basin is deeper and steeper on the orogen side than the bulge side) records the **distribution** of the load rather than its total, and its **migration** through time records the **advance** of the orogen.

The **yield-strength envelope** (the "knee") reconciles flexure with rock mechanics. A lithosphere whose strength is set by **Byerlee friction** in its brittle upper part and by **power-law creep** in its ductile lower part has a strength profile whose **integral** — the yield **moment** $M_{yl} = \int \sigma(z)\,z\,dz$ — is $10^{16}$–$10^{17}\ \mathrm{N}$ for a 30-km-thick continental plate, corresponding to an **effective** elastic thickness of 10–20 km, **not** the 30–100 km required to support long-wavelength **geoid** and **free-air** anomalies. This is the **strength paradox**: the lithosphere bends as if it were weak ($t_e \sim 20$ km) at **short** wavelengths and sustained loads, and as if it were strong ($t_e \sim 100$ km) at **long** wavelengths and **transient** loads. The resolution is that the lithosphere is an **elastic core over a viscous or plastic substrate**, strong until it yields and weak afterwards, and that the **time since loading** determines which behaviour is seen.
:::

::: example The elastic thickness of a foreland {#ex-foreland}
A foreland basin's axis of maximum subsidence lies 120 km from the range front and its **peripheral bulge** crests at 380 km. Taking $\Delta\rho = 500\ \mathrm{kg\,m^{-3}}$, $E = 70\ \mathrm{GPa}$ and $\nu = 0.25$, find the flexural parameter and the elastic thickness.
::: solution
The bulge crest fixes the flexural parameter directly, because its position is independent of the load:
$$
\pi\lambda = 380\ \mathrm{km} \quad\Rightarrow\quad \lambda = 121\ \mathrm{km}.
$$
The first zero is then predicted at $2.36\lambda = 285\ \mathrm{km}$, and the observed **axis of maximum subsidence** at 120 km is a **load** effect rather than a plate effect — for a line load the maximum deflection is at the load, so a maximum at 120 km means the load is **distributed** over about 120 km of the range front, which is a **consistency check** on the load geometry rather than on $\lambda$. The rigidity follows:
$$
D = \frac{\Delta\rho\, g\, \lambda^{4}}{4}
   = \frac{500\times9.81\times(1.21\times10^{5})^{4}}{4} = 2.6\times10^{23}\ \mathrm{N\,m},
$$
$$
t_e = \left[\frac{12(1-\nu^2)D}{E}\right]^{1/3}
    = \left[\frac{11.25\times2.6\times10^{23}}{7.0\times10^{10}}\right]^{1/3} = 35\ \mathrm{km}.
$$
An elastic thickness of **35 km** is typical of a **Precambrian cratonic** foreland and is at the **upper** end of the range for orogens generally.

Three cautions determine whether the number means anything. **The bulge is rarely visible**: its amplitude is 4 per cent of the depression, and it is buried under the same sediment that fills the basin, so in most foreland basins the bulge is **inferred** from the **stratigraphy** — the onlap of shallow-water sediments onto a **hinge line** — rather than measured, and the resulting $\lambda$ is uncertain by 30 per cent and $t_e$ by 25 per cent. **The load is distributed, not linear**: a real orogen has a tapering wedge of crustal root, and the difference between a line load and a **prismatic** load of the same total is a 20–40 per cent change in the modelled shape. **And the $t_e$ is an **effective** value**: the same foreland analysed from its **gravity** anomaly, from its **geoid** anomaly and from its **stratigraphic backstrip** gives 20, 35 and 50 km, and the spread is a measure of the model's inadequacy rather than of the data's.

The reason the number is worth having is that $t_e$ controls **where** the basin goes and therefore **where** the petroleum system is: the source rock, the reservoir and the trap in the Alberta, the Michigan and the Appalachian basins are all arranged by the flexural wavelength of the orogen that loaded them.
:::
:::

::: example Bending stress at a trench and the strength of the plate {#ex-trench}
The oceanic plate entering a subduction zone subsides by 2.0 km over a flexural parameter of 100 km. Find the maximum bending stress at the surface of a plate of elastic thickness 30 km, and interpret it with the observed outer-rise faulting.
::: solution
For the line-load deflection the curvature at the load is $|d^2w/dx^2| = 2w_0/\lambda^2$, and the surface **bending stress** is
$$
\sigma_{\max} = E\,\frac{t_e}{2}\,\frac{2w_0}{\lambda^{2}} = \frac{E\,t_e\,w_0}{\lambda^{2}}
   = \frac{7.0\times10^{10}\times3.0\times10^{4}\times2.0\times10^{3}}{(1.0\times10^{5})^{2}} = 420\ \mathrm{MPa}.
$$
A bending stress of **420 MPa** added to the plate's own **ridge-push** or **slide-pull** stress of 100–300 MPa brings the surface of the plate to **failure**, and this is exactly what is observed: the **outer rise** seaward of every major trench is **horst-and-graben** terrain, faulted by extension 50–100 km before the plate turns down, and it generates large **normal-faulting** earthquakes — the 1933 Sanriku $M 8.5$, the 2006 $M 8.1$ Loailatek, the 2009 $M 8.1$ Macquarie and the 2021 $M 8.1$ Kermadec events — at depths of 20–40 km and with focal mechanisms **inconsistent** with subduction.

The interpretation is the **bending-moment** balance. The plate can sustain a **yield moment** $M_{yl}$ of about $10^{17}\ \mathrm{N}$ before it yields throughout, and the **elastic** bending moment required by the observed deflection is
$$
M_{el} = D\left|\frac{d^2w}{dx^2}\right| = D\frac{2w_0}{\lambda^2},
$$
which for $D = 5.25\times10^{22}\ \mathrm{N\,m}$ (the rigidity of a 30-km plate) is $2.1\times10^{17}\ \mathrm{N}$ — **twice** the yield moment. The plate therefore **cannot** be elastic throughout at this wavelength, and the outer rise is **broken**: the elastic thickness implied by the **wavelength** of the rise is 30 km and that implied by its **amplitude** is 15 km, and the discrepancy is the classic signature of a plate that is **elastic at its top and plastic at its base**.

The consequence for the subduction force budget is large. A **strong** (elastic) slab can transmit **slab pull** across the trench from the sinking limb to the surface plate, and the trench would be **rounded**; a **weak** slab cannot, and the trench is **linear** and the upper plate does most of the work. The observed correlation between the **curvature** of a trench and the **age and convergence rate** of the subducting plate — old, fast plates give rounded, steeply dipping slabs that pull; young, slow plates give linear trenches and shallow slabs — is the **geometric** test of the bending strength, and it supports the **weak-at-the-trench** view for most subduction zones.
:::
:::

::: definition Post-glacial rebound and the viscoelastic Earth {#def-gia}
An ice sheet loads the lithosphere over $10^3$–$10^4$ years, which is **long** compared with the lithosphere's elastic **Maxwell** time and **short** compared with the mantle's, so the response is **viscoelastic**: the plate flexes **elastically** under the ice and the mantle flows **viscously** underneath it, and when the ice melts the surface rebounds with a relaxation time
$$
\tau = \frac{\eta\, k}{\rho\, g}
$$
for a load of wavenumber $k = 2\pi/L$ — 6000 years for a 1000-km load and a mantle viscosity of $10^{21}\ \mathrm{Pa\,s}$. The observable pattern is the **uplift map** of a formerly glaciated region: a central **forebulge** of uplift of 8–10 mm yr⁻¹ over Fennoscandia and 8–12 mm yr⁻¹ over Hudson Bay, a **peripheral bulge** of uplift at 1000–1500 km, and a **forebulge collapse** that produces **submergence** at the margin of the former ice — the reason the Hudson Bay lowlands and the Baltic coasts have a Holocene **relative sea-level** record that rises and then falls. The same physics produces the **gravity** signal measured by GRACE, the **$J_2$** trend of the whole Earth, and the **true polar wander** of the planet, and it is the **correction** that must be applied to every tide gauge on a formerly glaciated margin before its record can be compared with the global mean.
:::

::: example The Hawaiian swell: how to recognise a load the plate cannot carry {#ex-hawaii}
The Hawaiian volcanic chain stands on a broad **swell** of elevated seafloor whose amplitude is 1400 m and whose half-width, measured from the ridge to the point where the depth returns to the normal 4500 m for 90-Myr crust, is 1200 km. Taking the swell's half-width as $2.36\lambda$, find the elastic thickness required by a flexural model, and interpret.
::: solution
$$
\lambda = \frac{1200}{2.36} = 508\ \mathrm{km}, \qquad
t_e = 30\left(\frac{508}{108}\right)^{4/3} = 30\times7.9 = 240\ \mathrm{km}.
$$
An elastic thickness of **240 km** is three to six times the thickness of the entire oceanic lithosphere at 90 Myr, which is about 80–100 km to the 1300 °C isotherm. The flexural model therefore **fails**, and the failure is the point: the swell is **too broad** to be carried by the lithosphere's elastic strength, and requires **dynamic support** — the upward viscous stress of a mantle plume — in addition to whatever flexural support the volcanoes themselves provide.

The **partition** between the two is the substance of the modern debate, and it is made by **wavelength**. The **short-wavelength** topography of the chain, at 100–300 km, is flexed by the lithosphere and gives an elastic thickness of 20–40 km, consistent with the age of the plate at loading. The **long-wavelength** swell, at 1000–2000 km, is not, and its amplitude and wavelength require a **dynamic** load of $10^{12}$–$10^{13}\ \mathrm{N\,m^{-1}}$ applied at the base of the lithosphere by a plume flux of a few Sverdrups. The two signals are separated by a **spectral** analysis of the geoid and bathymetry, in which the **admittance** between them is plotted against wavenumber: at high wavenumber the admittance follows the elastic-plate prediction and at low wavenumber it **departs** from it, and the wavenumber of the departure is the flexural parameter.

Three consequences generalise. **A flexural model fitted to a broad swell overestimates the elastic thickness systematically**, and the reported $t_e$ of the same lithosphere from a 100-km seamount and from a 1000-km swell differ by a factor of two to three for this reason. **The departure from elastic behaviour is itself a measurement**: the wavenumber at which the admittance falls below the elastic prediction constrains the **thickness of the elastic layer** independently of the amplitude, and is the basis of the **coherence** method of **Lowry, Watts, Pérez-Gussinyé and Sandwell** (Sandwell), which produces global maps of $t_e$ from the gravity and topography alone. **And the existence of a broad swell is evidence for a plume**: the **African**, **Eocene** and **Tasman** swells, whose wavelengths are 1000–2000 km and whose amplitudes are 500–1500 m, are the classic evidence for **mantle upwelling** beneath a plate, and their **age-progressive** appearance is one of the two or three arguments for the **plume** interpretation of hotspot tracks.
:::
:::

::: example The Fennoscandian forebulge and the limits of elasticity {#ex-forebulge}
The present uplift of Fennoscandia has a maximum of $9\ \mathrm{mm\,yr^{-1}}$ at the former ice-sheet centre and a secondary maximum — the **peripheral bulge** — at about 1200 km from it. Taking the bulge position as $\pi\lambda$, find the elastic thickness an elastic model would require, and explain why the elastic model is the wrong model.
::: solution
$$
\lambda = \frac{1200}{\pi} = 382\ \mathrm{km}, \qquad
t_e = 30\left(\frac{382}{108}\right)^{4/3} = 30\times5.4 = 162\ \mathrm{km}.
$$
An elastic thickness of **162 km** is again far greater than the lithosphere, and again the flexural model is not merely imprecise but **category-wrong**. The uplift of Fennoscandia is not the elastic bending of a plate; it is the **viscous relaxation** of the mantle beneath a load that was removed 10 000 years ago, and the "bulge" is the **collapse of the forebulge** that formed at the ice margin during glaciation, now subsiding while the centre rises.

The correct model is the **viscoelastic** one, in which the surface displacement is a sum of **normal modes** of the solid Earth with relaxation times of $10^2$ to $10^4$ years, and in which the **wavelength** of the deformation is set not by an elastic length but by the **viscous diffusion length** $\sqrt{\mu\lambda_{\mathrm{flow}} t/\eta}$ of the mantle flow, which **grows with time** as the relaxation proceeds. This is why the **pattern** of post-glacial uplift has **migrated** through the Holocene, why the present uplift maximum lies beneath the **Gulf of Bothnia** rather than beneath the centre of the last ice sheet, and why the **relative sea-level** curve of a site 1000 km from the ice centre rises and then falls within a single Holocene sequence.

The lesson generalises to every long-lived load. **An elastic model applied to a load whose duration exceeds the Maxwell time of the supporting layer gives an elastic thickness that is a measure of the model's failure, not of the rock's strength.** The Maxwell time of the upper mantle, $\tau_M = \eta/\mu = 10^{21}/7\times10^{10} = 1.4\times10^{10}\ \mathrm{s} = 450\ \mathrm{yr}$, is only a few centuries, so **any load applied over more than a millennium is borne viscously by the mantle** — which is why the flexural method works for a **seamount** loaded in 1 Myr of a cold plate and fails for an **ice sheet** and for a **1000-km swell**.
:::
:::

::: warning The elastic thickness is a fitted parameter, not a measurement of a thickness
Five properties of the flexural problem make $t_e$ one of the least comparable numbers in the earth sciences. **It is an equivalent thickness**: the real lithosphere has a **depth-varying** strength, and $t_e$ is the thickness of the **uniform elastic plate** that would bend as much, so a $t_e$ of 30 km does not mean 30 km of cold, strong rock. **It depends on the wavelength of the load**: a load of width $W$ samples the plate's strength over a depth of order $\sqrt{\lambda W}$, so a small seamount measures a **shallower, weaker** layer than a broad swell, and the reported $t_e$ of the same lithosphere can differ by a factor of two between a seamount study and a geoid study. **It depends on the load's age and duration**: a load applied over 1 Myr is borne elastically, the same load applied over 30 Myr relaxes viscously, and the "fossil" flexure recorded in the stratigraphy of an old basin reflects a strength that no longer exists. **It depends on the ancestral topography**, which is unknowable to better than a factor of two, and $t_e$ scales as the **four-thirds power** of the assumed load, so a 50 per cent error in the palaeoelevation is a 90 per cent error in the elastic thickness. **And the two classical methods disagree systematically**: the **geoid-and-bathymetry** method, which uses the **long-wavelength** part of the field, gives $t_e$ values 1.5 to 3 times those from the **free-air-anomaly** method, which uses the **short-wavelength** part, and the discrepancy is attributed to **mantle upwelling** beneath the swell (which adds a long-wavelength geoid signal that the elastic model absorbs as extra strength) and to the **finite strength** of the plate at long wavelengths. The discipline is to publish the **load model, the ancestral topography, the wavelength band used, the density structure and the infill correction** with every $t_e$, and to treat comparisons between studies that used different methods as **qualitative**.
:::

::: history
The bending of elastic plates is the mathematics of **Kirchhoff** (Kirchhoff) and **Love** (Love); its application to the Earth begins with **Barrell** (Barrell) in 1914, who argued that the crust must have **strength**, and with **Jeffreys** (Jeffreys) and **Vening Meinesz** (Meinesz), who in 1926–1941 developed the **rigid-lithosphere** alternative to Airy isostasy and predicted the peripheral bulge. **Daly** (Daly) proposed the **compensation by strength** of the ocean basins in 1940, **Vening Meinesz** (Meinesz) computed the first **grid** flexural models of the Atlantic in 1948. **Morgan** (Morgan) and **Cochran** (Cochran) established the **Hawaiian** flexural signature in 1971–1974, **Sandwell** (Sandwell) and **Schubert** made the **geoid-and-bathymetry** method routine in 1982, and **Wessel** (Wessel) built the global seamount database. **Walcott** (Walcott) published the **yield-strength envelope** in 1970, **Molnar and Lyon-Caen** (Molnar) and **Burov and Diament** (Burov) the **strength paradox** and the **knee** in 1988–1995, and **Watts** (Watts), **Burov** (Burov), **Lowry** (Lowry) and **Pérez-Gussinyé** (Pérez-Gussinyé) the global maps of $t_e$ from the **admittance** and **coherence** of the gravity and topography. **Cathles** (Cathles), **Wu and Peltier** (Peltier), **Nakada and Lambeck** (Lambeck) and **Mitrovica** (Mitrovica) built the **viscoelastic** post-glacial rebound models on which the mantle viscosity and the sea-level corrections rest, and **Nakada and Lambeck** (Lambeck) the global ice-history models. The **passive-margin flexural paradox** is the work of **Watts and Thirlaway** (Watts) in 1992 and and its proposed resolutions by **Pérez-Gussinyé** (Pérez-Gussinyé), **Welford and Watts** (Welford).
:::

## Where this leads

The isostatic framework within which flexure is the alternative to Airy compensation is in [[geophysics/gravity-isostasy]], the seismic structure and the thermal model that predict $t_e$ are in [[geophysics/seismic-structure]] and [[geophysics/heat-flow]], the foreland basins that flexure creates are in [[sedimentology/basins-sequences]] and [[structural-geology/orogens]], the rifted margins are in [[structural-geology/rifts]], the post-glacial rebound and its ice sheets are in [[glaciology/ice-sheets]] and [[geomorphology/glacial-landscapes]], the subduction forces are in [[physical-geology/plate-tectonics]], and the gravity and geoid data on which the whole method rests are in [[geophysics/gravity-isostasy]] and [[remote-sensing/radar-lidar]].

::: quiz
A seamount's moat and peripheral bulge are observed at 60 km and 200 km from the load. If you double the load, what happens to their positions?
- [ ] Both move outward by a factor of two.
- [x] They stay where they are.
- [ ] The moat moves out and the bulge moves in.
- [ ] Both move inward.
::: solution
The positions of the zero and of the bulge are set by the flexural parameter $\lambda$ alone, which depends only on the plate's rigidity and on the density contrast — not on the load. Doubling the load doubles the **amplitude** of the whole curve, including the bulge, but leaves its **wavelength** unchanged. This is exactly why the bulge position is the cleanest constraint on $t_e$ and why the amplitude is not: the amplitude requires knowing the load, which is the least well known quantity in the problem.
:::
:::

::: summary
- The lithosphere bends as an elastic plate with one length scale, the flexural parameter, which is 60–110 km for elastic thicknesses of 15–30 km.
- The peripheral bulge sits at $\pi\lambda$ and is only 4 per cent of the depression, but its position is independent of the load and therefore the best constraint on strength.
- The elastic thickness of the oceanic lithosphere grows with age, roughly as the thermal boundary layer, and saturates at 20–30 km.
- The bending stress at a trench reaches 400 MPa, which breaks the outer rise and produces large normal-faulting earthquakes before subduction.
- The yield-strength envelope reconciles the weak (20 km) and strong (100 km) elastic thicknesses: the lithosphere is elastic until it yields.
- Post-glacial rebound is the viscoelastic version of the same problem and is the source of the mantle's viscosity.
:::

## Exercises

::: exercise Flexural rigidity {level=1 check="5.25"}
Find the flexural rigidity of a plate with $t_e = 30\ \mathrm{km}$, $E = 70\ \mathrm{GPa}$ and $\nu = 0.25$.
::: solution
$D = E t_e^3/[12(1-\nu^2)] = 7\times10^{10}\times2.7\times10^{13}/11.25 = 5.25\times10^{22}\ \mathrm{N\,m}$. Because $D \propto t_e^3$, a 20 per cent error in the elastic thickness is a **73 per cent** error in the rigidity, which is why $t_e$ is quoted to two significant figures at most.
:::
:::

::: exercise Flexural parameter {level=1 check="86"}
Find the flexural parameter for $D = 2.0\times10^{22}\ \mathrm{N\,m}$ and $\Delta\rho = 600\ \mathrm{kg\,m^{-3}}$.
::: solution
$\lambda = (4D/\Delta\rho g)^{1/4} = (8.0\times10^{22}/5886)^{1/4} = (1.36\times10^{19})^{1/4} = 86\ \mathrm{km}$. On oceanic lithosphere the density contrast is near 600 and on continental near 500, so the same rigidity gives a 5 per cent larger $\lambda$ on the continents.
:::
:::

::: exercise Bulge position {level=1 check="251"}
For $\lambda = 80\ \mathrm{km}$, find the distance to the crest of the peripheral bulge.
::: solution
$x = \pi\lambda = 251\ \mathrm{km}$. The first zero is at $2.36\lambda = 189\ \mathrm{km}$, so the **moat** lies inside 190 km and the **bulge** beyond it — the geometry of every foreland basin and every volcanic swell.
:::
:::

::: exercise Central depression {level=2 check="204"}
A line load of $Q_0 = 5\times10^{11}\ \mathrm{N\,m^{-1}}$ is applied to a plate with $\lambda = 100\ \mathrm{km}$ and $\Delta\rho = 500\ \mathrm{kg\,m^{-3}}$. Find the central depression.
::: solution
$$
w_0 = \frac{2Q_0}{\Delta\rho\, g\, \lambda} = \frac{1.0\times10^{12}}{500\times9.81\times10^{5}} = 204\ \mathrm{m}.
$$
A 200-m depression for a line load of $5\times10^{11}\ \mathrm{N\,m^{-1}}$ — the weight of a 2-km-high, 20-km-wide mountain belt — shows how **stiff** a 30-km elastic plate is, and why a real foreland basin 2–3 km deep requires either a **much larger** load or a **much weaker** plate than the elastic model allows.
:::
:::

::: exercise Bending stress {level=2 check="210"}
Find the maximum bending stress for $w_0 = 1000\ \mathrm{m}$, $\lambda = 100\ \mathrm{km}$, $t_e = 30\ \mathrm{km}$ and $E = 70\ \mathrm{GPa}$.
::: solution
$\sigma = E t_e w_0/\lambda^2 = 7\times10^{10}\times3\times10^{4}\times10^{3}/10^{10} = 210\ \mathrm{MPa}$. This is **below** the yield strength of a cold lithosphere, so the plate bends elastically; doubling the deflection brings it to 420 MPa and the plate **breaks**, which is why the outer-rise faulting begins at a characteristic deflection of 1–2 km rather than gradually.
:::
:::

::: exercise Age dependence {level=2 check="28"}
The elastic thickness of the oceanic lithosphere follows $t_e = 3.6\sqrt{\text{age}}$ km with the age in Myr. Find $t_e$ at 60 Myr and at 120 Myr, and comment.
::: solution
$t_e = 3.6\sqrt{60} = 27.9$ km and $3.6\sqrt{120} = 39.4$ km. The **square-root** law is the prediction of a thermal model in which the elastic thickness is the depth to a fixed **isotherm** in a cooling half-space, and it fits the data to 40–60 Myr; beyond that the observations **saturate** at 30–40 km, which is the yield-strength envelope's prediction and one of the two or three cleanest pieces of evidence that the lithosphere's base **yields** rather than bending elastically.
:::
:::

::: exercise The strength paradox {level=3 check="8"}
A foreland basin's **wavelength** implies $t_e = 40\ \mathrm{km}$ and its **amplitude**, for the known load, implies $t_e = 20\ \mathrm{km}$. By what factor do the two models differ in rigidity, and give two physical reasons for the discrepancy.
::: solution
$D \propto t_e^{3}$, so the two models differ by $(40/20)^3 = 8$ in rigidity.

The two most-cited resolutions are both partly right. **Plastic yielding**: the plate bends **elastically** at the long wavelength of the geoid and the free-air anomaly, where the bending stress is small, but **yields** at the short wavelength of the basin's axis, where the stress is large, so the wavelength measurement sees the intact plate and the amplitude measurement sees the yielded one. **Mantle flow**: a **long-wavelength** geoid anomaly has a contribution from **mantle upwelling** and from **dynamic topography** that the elastic model absorbs as extra plate strength, so the wavelength-derived $t_e$ is biased **high**; this is the standard explanation of the systematic difference between the geoid-and-bathymetry and free-air-anomaly methods.

A third, less comfortable possibility is that the **load is wrong**: the ancestral topography enters the amplitude as $h_a^{4/3}$, so a 40 per cent underestimate of the palaeoelevation would reconcile the two without any physics. Because the palaeoelevation of an orogen is uncertain by at least that much, the strength paradox has never been cleanly demonstrated for a **single** foreland basin, only argued from the systematic difference between methods applied to **many**.
:::
:::

::: exercise The passive-margin paradox {level=3 check="100"}
The topography of a non-volcanic passive margin requires an elastic thickness of at least 100 km to be explained by flexure, yet the margin's heat flow and the depth of its seismicity imply a lithosphere no more than 20 km thick. Estimate the factor by which the required **flexural rigidity** exceeds the permitted one, and explain how the paradox is resolved.
::: solution
$D \propto t_e^{3}$, so the required rigidity exceeds the permitted one by $(100/20)^3 = 125$ — about **two orders of magnitude**.

The paradox is resolved by abandoning one of the two premises, and three resolutions are current. **The margin was strong when it was loaded and is weak now**: the flexure recorded in the margin's **stratigraphy** was produced in the first 10–20 Myr after rifting, before the sediment load had time to be compensated by the flow of the hot, newly thinned mantle beneath it, and the present-day heat flow measures a lithosphere that has since **weakened** by several tens of millions of years of relaxation. **The load is not what we think**: the margin's subsidence is driven partly by **small-scale convection** and **dynamic topography** rather than by the sediment load, and the "flexural" model is fitting the wrong process. **And the margin is stronger than its temperature suggests because it is dry**: the strength of the upper mantle is set by **water** in olivine, and a dehydrated cratonic root is 10–100 times stronger than the wet peridotite assumed in the flow laws, which raises the yield moment without changing the temperature.

The last resolution is the best supported, and it generalises: the **hydrogen content of olivine** controls the lithosphere's strength, and a lithosphere that is **dry** can carry a bending moment that its **temperature** would not permit. This is why the elastic thickness of the **old, cold, dry** cratons is 40–60 km and that of the **hot, hydrated** margins of the Aegean and the Basin and Range is 5–10 km, and why the strength of the lithosphere is ultimately a **geochemical** rather than a thermal property.
:::
:::
