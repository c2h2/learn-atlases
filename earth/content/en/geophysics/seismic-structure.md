Everything that is known about the Earth's interior below the deepest borehole — all of it — comes from measuring the times, amplitudes and polarisations of elastic waves and inverting them for the velocities and densities that would produce them. The inversion is exact only in a spherically symmetric Earth and is otherwise ill-posed, so the discipline of seismic structure is the discipline of knowing what the data can and cannot constrain: which velocities, at which depths, to which resolution, under which reference model.

## Rays in layered and graded media

::: definition Fermat, Snell and the ray parameter {#def-ray}
Seismic rays follow paths that make the travel time stationary (**Fermat's principle**), which in a medium of piecewise-constant velocity gives **Snell's law** and in a medium whose velocity varies continuously gives the ray-equivalent of it. Because the Earth is to first order **spherically symmetric**, the quantity conserved along a ray is not the horizontal slowness but the **ray parameter** (the **Bullen** angle function)
$$
p = \frac{r\sin j}{V(r)} ,
$$
where $r$ is the radius, $j$ the angle between the ray and the local **radial** direction, and $V$ the velocity. A ray penetrates to the radius at which $\sin j = 1$, the **turning point**, where
$$
p = \frac{r_t}{V(r_t)} .
$$
This one equation is the whole of seismic sounding: **a ray with ray parameter $p$ turns where the velocity-to-radius ratio equals $1/p$, so the observed distribution of turning points is a direct measurement of $V(r)$**. Two consequences structure the subject. A **low-velocity zone** — a layer in which $V$ decreases with depth — makes $r/V$ **decrease** with depth, so no ray can turn inside it and rays are **excluded**: the zone casts a **shadow**, and a shadow, not a velocity measurement, is the primary evidence for a low-velocity layer. And a **velocity decrease with depth** at a discontinuity refracts rays **away** from the normal and produces a **shadow zone** on the far side, exactly as at the core–mantle boundary.
:::

::: definition Reflection, refraction and the two-layer travel-time curve {#def-refraction}
For a horizontal layer of velocity $V_1$ and thickness $h$ over a half-space of velocity $V_2 > V_1$, three branches appear on a record section. The **direct wave** travels at $t = x/V_1$. A **reflected** wave travels at $t = \sqrt{x^2 + 4h^2}/V_1$. And a **head wave**, critically refracted along the interface at the angle $\sin\theta_c = V_1/V_2$, travels at
$$
t = \frac{x}{V_2} + \frac{2h\cos\theta_c}{V_1} = \frac{x}{V_2} + t_i ,
$$
where $t_i$ is the **intercept time**. The head wave exists only beyond the **critical distance** $x_c^{*} = 2h\tan\theta_c$ and becomes the **first arrival** only beyond the **crossover distance**
$$
x_c = \frac{t_i}{V_1^{-1} - V_2^{-1}} = 2h\sqrt{\frac{V_2+V_1}{V_2-V_1}} .
$$
The method of **seismic refraction** is therefore the measurement of $V_1$, $V_2$ and $t_i$ from the slopes and intercept of the two first-arrival branches, and the depth $h = t_i V_1/(2\cos\theta_c)$ follows. Its two classical failure modes are permanent: a **blind zone** — a layer too thin to appear as a first arrival — and a **hidden layer** — one whose velocity is **lower** than both its neighbours and which never becomes a first arrival at all. Both mean that a refraction model is a **lower bound** on the number of layers, never an upper bound, and that a refraction depth is an **interpretation** unless confirmed by a borehole or by a reversed profile.
:::

::: example A refraction profile and its ambiguity {#ex-refraction}
A spread profile over a valley fill gives a first-arrival slope of $0.500\ \mathrm{s\,km^{-1}}$ at short offsets and $0.200\ \mathrm{s\,km^{-1}}$ at long offsets, with the second branch intercepting the time axis at $92\ \mathrm{ms}$. Find the two velocities, the critical angle, the depth to the interface and the crossover distance.
::: solution
The slopes are slownesses, so $V_1 = 1/0.500 = 2.0\ \mathrm{km\,s^{-1}}$ and $V_2 = 1/0.200 = 5.0\ \mathrm{km\,s^{-1}}$. The critical angle is
$$
\theta_c = \arcsin\left(\frac{2.0}{5.0}\right) = 23.6^\circ, \qquad \cos\theta_c = 0.917 ,
$$
and the depth follows from the intercept time:
$$
h = \frac{t_i V_1}{2\cos\theta_c} = \frac{0.092\times2.0}{2\times0.917} = 0.100\ \mathrm{km} = 100\ \mathrm{m}.
$$
The crossover distance is
$$
x_c = \frac{t_i}{V_1^{-1}-V_2^{-1}} = \frac{0.092}{0.500-0.200} = 0.31\ \mathrm{km},
$$
and the critical distance beyond which the head wave exists at all is $2h\tan\theta_c = 82$ m.

The **ambiguity** is the substance of the exercise. The same pair of first-arrival branches is produced by **100 m of fill over basement** and by **any vertically equivalent section** — 80 m of fill at $1.9\ \mathrm{km\,s^{-1}}$ over the same basement, or 130 m at $2.1$, or a **gradient** from 1.8 to 2.3 with no interface at all. The intercept time constrains the product $h\cos\theta_c/V_1$, and $\theta_c$ itself depends on $V_1$, so a 10 per cent error in $V_1$ propagates into both the depth and the angle. Three tests resolve the ambiguity in practice. A **reversed profile** (shooting from both ends) removes the effect of **dip** and of **lateral velocity variation**, which a single-end spread cannot distinguish from a deepening interface. **Reciprocal timing** and a **delayed-time** analysis give the depth to each geophone independently. And **turn-back** or **wide-angle reflections** from the interface itself, recorded at offsets beyond the crossover, give the depth **directly** and independently of the intercept-time assumption.

The second and more serious ambiguity is the **hidden layer**. If the valley fill contains a 5-m lens of gravel at $2.5\ \mathrm{km\,s^{-1}}$ between two units at $2.0$ and $5.0$, the lens never becomes a first arrival and the model reports a **single** 100-m layer. Conversely, if a 200-m layer at $1.5\ \mathrm{km\,s^{-1}}$ lies beneath the 2.0 unit, it is **blind** — the head wave from the basement overtakes it before it can emerge as a first arrival. Both failures bias the depth **shallow**, which is why a refraction site investigation is confirmed by a **borehole** and why engineering practice requires at least one borehole per spread.
:::
:::

::: widget plot
f: x/5 + 91.7
x: 250, 1200
y: 140, 340
labels: t\ (\text{ms})
caption: The head-wave branch $t = x/V_2 + t_i$ for the two-layer profile of the worked example, with $V_2 = 5.0\ \mathrm{km\,s^{-1}}$ and $t_i = 92\ \mathrm{ms}$, plotted against offset in metres. The **slope** gives the refractor velocity and the **intercept** gives the depth, and the branch exists only beyond the critical distance of 82 m and is only the **first** arrival beyond the crossover of 306 m — which is why a refraction survey must be spread long enough (typically to five times the target depth) to record the crossover and several points on the second branch. A survey that stops short of the crossover reports the **wrong** depth with complete confidence, and a large proportion of published shallow refraction sections do exactly that.
:::

## The spherical Earth

::: definition The reference Earth model {#def-prem}
The **Jeffreys–Bullen** tables and their modern descendants, ending with **PREM** (Dziewonski and Anderson) and its successors AK135, SAW24P and the tomographic reference models, give a **spherically symmetric** velocity and density profile fitted to thousands of travel times, free-oscillation frequencies and surface-wave dispersion curves. Its principal features, and the mineral transitions that cause them, are
$$
\begin{array}{l|ccc|l}
\text{depth}\ (\mathrm{km}) & V_P & V_S & \rho\ (\mathrm{Mg\,m^{-3}}) & \text{feature} \\ \hline
0\text{--}7\ (5\text{--}70) & 5.8\ (6.8) & 3.4\ (3.9) & 2.9 & \text{oceanic (continental) crust}\\
35\text{--}70 & 8.0 & 4.5 & 3.36 & \text{Moho, the crust--mantle boundary}\\
220 & 8.4 & 4.6 & 3.4 & \text{low-velocity zone, the LAB at 100--250 km}\\
410 & 9.0\to9.4 & 4.9\to5.1 & 3.7 & \text{olivine} \to \text{wadsleyite}\\
520 & 9.8 & 5.3 & 3.9 & \text{wadsleyite} \to \text{ringwoodite}\\
660 & 10.2\to10.8 & 5.5\to5.6 & 4.0\to4.4 & \text{ringwoodite} \to \text{perovskite} + \text{ferropericlase}\\
2700 & 13.7 & 7.3 & 5.6 & \text{D^{\prime\prime}, the lowermost mantle layer}\\
2891\ (\text{CMB}) & 13.7 \to 8.0 & 7.3 \to 0 & 5.6 \to 9.9 & \text{core--mantle boundary, a first-order discontinuity}\\
5150\ (\text{ICB}) & 10.4 \to 11.0 & 3.5 \to 3.7 & 12.2 \to 12.8 & \text{inner-core boundary, solidification}\\
6371 & 11.3 & 3.7 & 13.1 & \text{centre}
\end{array}
$$
Four features dominate the interpretation. The **velocity jumps at 410, 520 and 660 km** are **phase transitions** in olivine and its polymorphs, not changes in composition, and their **topography** — the 410 rises and the 660 sinks in a thermal anomaly according to their **Clapeyron slopes** of $+2.5$ to $+3.5$ and $-2$ to $-3\ \mathrm{MPa\,K^{-1}}$ — is a **thermometer** for the transition zone. The **core–mantle boundary** is the Earth's strongest discontinuity, at which $V_P$ **falls** from 13.7 to 8.0 and $V_S$ to **zero**, which is the proof that the outer core is **liquid** and therefore that it **convects** and generates the magnetic field. The **D″ layer** immediately above it is a complex, anisotropic, partially molten and possibly layered region whose 2–3 per cent velocity reductions are the strongest evidence for **primitive** or **reacted** material at the base of the mantle. And the **inner core** is **solid**, is elastically **anisotropic** with its fast axis near the rotation axis, and grows at a rate of about 1 mm yr⁻¹ that sets the **age of the geodynamo**.
:::

::: example A low-velocity zone and the shadow it casts {#ex-lvz}
A low-velocity zone at 100–250 km depth has $V_S$ falling from $4.6$ to $4.5\ \mathrm{km\,s^{-1}}$ and $V_P$ from $8.1$ to $8.0\ \mathrm{km\,s^{-1}}$. Show that no ray can turn inside it, and explain how the zone is nevertheless detected.
::: solution
A ray turns at the radius where $p = r/V(r)$. In a spherically symmetric Earth the function $r/V$ **increases** with depth wherever $V$ increases faster than $r$ decreases — which is everywhere in the mantle — so a ray has a well-defined turning point. Inside a layer in which $V$ **decreases** with depth, $r/V$ **decreases** with depth, so a ray that enters the layer finds $r/V$ **below** its own ray parameter at every depth in the layer and therefore **never** satisfies the turning condition: it passes straight through, refracted toward the horizontal, and a **shadow** is cast for the ray parameters that would have turned there.

Quantitatively, at 100 km the value of $r/V_S$ is $6271/4.6 = 1363\ \mathrm{s}$ and at 250 km it is $6121/4.5 = 1360\ \mathrm{s}$ — the function **falls** by 3 s across the zone, whereas in the surrounding mantle it rises by about 1 s per 10 km. A ray with $1360 < p < 1363\ \mathrm{s}$ would have turned inside the zone if the zone were not there and instead traverses it, so the **travel-time curve has a gap and a cusp** in the corresponding distance range of a few degrees.

The zone is detected by **four** independent observations, and the history of the low-velocity zone is the history of all four. **Travel times**: Gutenberg's 1926 identification of a **lag** in the surface-wave and short-period body-wave arrivals at 100°–110°. **Surface-wave dispersion**: the zone is required to fit the **higher-mode** Rayleigh and Love dispersion, which are sensitive to the shear velocity at depth and which cannot be fitted by any monotonic profile. **Surface-wave amplitudes**: the zone **focuses** and **defocuses** surface waves, producing amplitude anomalies of 10–20 per cent that are far more sensitive to a thin low-velocity layer than the phase velocities are. **And the **uppermost** low-velocity zone beneath the oceans**, which is 1–3 per cent in $V_S$, correlates with the **age of the seafloor** and with the **conductivity** derived from magnetotelluric sounding, and is now interpreted as **a few tenths of a per cent of melt** — a detection that no single method could have made.

The general lesson is that a **shadow is a measurement**: the existence of a low-velocity zone is among the most secure inferences in the subject, because it does not depend on the amplitude calibration, on the source, or on the reference model, but only on the **absence** of energy where energy should be. The **interpretation** — melt, water, temperature, fabric or a compositional layer — is a different matter, and requires the amplitude, the **attenuation** $Q$, the **anisotropy** and the **conductivity** in combination.
:::
:::

::: definition Shadow zones and the discovery of the core {#def-shadow}
Because $V_P$ **drops** at the core–mantle boundary, the deepest mantle rays are refracted **toward** the radial direction on entering the core and the P-wave travel-time curve has a **gap**: no P ray emerges at angular distances between **103° and 142°**, the **P-wave shadow zone**. Beyond 142° the ray that has traversed the core, **PKP**, reappears and is strongly **focused**, and at about 143° the branch that has crossed the **inner** core, **PKIKP**, is observed. The **S-wave** shadow is simpler and more decisive: shear waves do not propagate in a liquid, so **no S of any kind is observed beyond 103°**, and the boundary of the S shadow is a direct measurement of the **core's radius** once the mantle velocity profile is known. The naming convention records the path — **P** and **S** for the phase, **c** for reflection off the core–mantle boundary, **i** for the inner core, **K** for the core (from the German *kern), **PcP**, **PKPab**, **PKPdf** for a **diffracted** core phase, **ScS**, **S660S**, **P410P** — and a seismogram's **phase list** is a compact statement of which discontinuities the ray has seen.
:::

::: example The core radius from the shadow zone {#ex-core}
The S-wave shadow begins at an angular distance of $103^\circ$. Estimate the core radius (a) for a constant-velocity mantle and (b) explain why the true value is much smaller, and what it is.
::: solution
**(a)** In a constant-velocity mantle the ray that grazes the core is a **straight line**, and the geometry of a chord tangent to an inner sphere gives
$$
\sin\frac{\Delta}{2} = \frac{r_c}{R} \quad\Rightarrow\quad r_c = 6371\sin 51.5^\circ = 4986\ \mathrm{km}.
$$
**(b)** The true core radius is **3480 km**, and the constant-velocity estimate is 43 per cent too large. The reason is that the mantle's velocity **increases** with depth by a factor of 1.7 from the Moho to the core–mantle boundary, so the rays are continuously **refracted toward the horizontal** and follow **convex-upward** arcs; a ray that reaches the core has been bent downward and therefore emerges at a **larger** angular distance than a straight ray would, so the observed 103° corresponds to a **deeper** boundary than the straight-ray geometry implies.

The correction is the whole of the difference between **Oldham's** 1906 estimate of a core radius of about $0.45$–$0.5\,R$ and **Gutenberg's** 1914 estimate of a core-mantle boundary at 2900 km depth, which is within 100 km of the modern value. Gutenberg's advance was to use the **travel-time curve** rather than the shadow boundary alone, and to invert for a velocity profile consistent with **all** the observed branches simultaneously — the first **inverse problem** in solid-Earth geophysics.

The general lesson is the one that governs every reading of a seismic discontinuity: **the geometry of a shadow or a branch constrains the structure only jointly with the velocity above it**, and a discontinuity depth quoted without its velocity model is not a measurement. The modern depth of the core–mantle boundary, $2891\ \mathrm{km}$, is determined to about 1 km from the **differential** travel times of PKP and PcP, which cancel most of the source and mantle terms, and the **topography** of the boundary — plus 60 km beneath the Pacific and minus 40 km beneath Africa, from ScS and PKP precursors — is measured to a few kilometres by the same method.
:::
:::

::: definition Tomography and the resolution problem {#def-tomo}
Seismic **tomography** solves for the three-dimensional velocity perturbation $\delta V/V$ from the observed perturbations in travel time, $\delta t$, by writing the forward problem as a **line-integral** of the perturbation along each ray,
$$
\delta t = -\int_{\mathrm{ray}} \frac{\delta V/V}{V}\,ds ,
$$
discretising the Earth into blocks or spherical-harmonic coefficients, and solving the resulting large, sparse, **rank-deficient** system by least squares with damping or by conjugate gradients. Because the ray geometry is **never** adequate — the surface-wave and body-wave coverage of the deep mantle is dominated by a **few** source–receiver paths — the solution must be judged by its **resolution**: the **averaging kernel** (the "smoothing matrix") that expresses each model parameter as a weighted average of the **true** Earth, whose width is the **resolution length** and whose side-lobes are the **smearing**. Three artefacts account for most of the disagreement between models. **Smearing** of a sharp structure into a broad one, so that a 100-km slab appears as a 400-km anomaly. **Colouring**, in which unmodelled structure **above** or **below** the region of interest appears inside it, so that a mantle anomaly is partly a **crustal** correction error. And **parameter trade-off**, in which velocity, density, attenuation and anisotropy cannot be separated from travel times alone, so that a "slow" anomaly may be **hot, molten, volatile-rich, anisotropic or attenuating**, and the four are separated only by **independent** data. Global models have progressed from the 16-degree **SH16M** of the early 1980s through **S362WMANH**, **S20RTS**, **SAW24** and **GLS2** to the current generation of full anisotropic, attenuating, **adjoint**-inverted models with resolution lengths of 200–400 km in the lower mantle and 50–100 km in the upper mantle.
:::

::: example The Clapeyron thermometer of the 660-km discontinuity {#ex-clapeyron}
The 660-km discontinuity has a Clapeyron slope of $-2.5\ \mathrm{MPa\,K^{-1}}$. Find the depth change of the discontinuity beneath (a) a subducting slab $500\ \mathrm{K}$ colder than average and (b) a plume $300\ \mathrm{K}$ hotter, taking a density of $4000\ \mathrm{kg\,m^{-3}}$ and $g = 9.8\ \mathrm{m\,s^{-2}}$.
::: solution
Along a phase boundary $dP/dT = \gamma$, so a temperature anomaly $\Delta T$ moves the boundary in pressure by $\Delta P = \gamma\,\Delta T$ and in depth by $\Delta z = \Delta P/(\rho g)$:
$$
\text{(a)}\quad \Delta P = (-2.5)(-500) = +1250\ \mathrm{MPa}, \qquad
\Delta z = \frac{1.25\times10^{9}}{4000\times9.8} = +32\ \mathrm{km},
$$
$$
\text{(b)}\quad \Delta P = (-2.5)(+300) = -750\ \mathrm{MPa}, \qquad
\Delta z = \frac{-7.5\times10^{8}}{4000\times9.8} = -19\ \mathrm{km}.
$$
The discontinuity is therefore **depressed by 32 km** beneath a cold slab and **elevated by 19 km** beneath a hot plume, and both signs are observed: the 660 is depressed by 20–30 km beneath Tonga, Japan and Central America, and elevated by 10–20 km beneath some hotspots.

The geological consequence is one of the central arguments about mantle dynamics. A **depressed** 660 beneath a slab means the slab encounters the transition at a **higher** pressure than the surrounding mantle, and since the ringwoodite → perovskite + ferropericlase reaction is **endothermic** and its density increase is large, the cold slab is **buoyantly supported** on the depressed boundary and **stagnates** in the transition zone. This is observed directly in the **double-seismically-active zones** beneath the western Pacific, where the deep earthquakes define a **flat** segment at 400–600 km depth before the slab re-steepens below 660 km, and in the tomographic images in which the slabs **pile up** horizontally at 660 km. A **penetrating** slab, as beneath the Tonga–Kermadec region below 660 km, requires either a **steeper** slab that overcomes the buoyancy, a **older, denser** slab whose negative buoyancy dominates, or a **weaker** Clapeyron slope than the experimental value.

The **410-km** discontinuity provides the cautionary counterpart. The olivine → wadsleyite transition has a **positive** Clapeyron slope of $+2.5$ to $+3.5\ \mathrm{MPa\,K^{-1}}$, so a 500-K cold anomaly should **elevate** the boundary by about 40 km — yet the 410 is commonly observed to be **depressed** by 10–20 km beneath cold slabs. This is the "**410 discontinuity paradox**", and the accepted resolution is that in cold, garnet-rich regions the **garnet → majorite** transition, which has a **negative** slope, contributes to the seismic signal near 410 km and reverses the net topography. The paradox is a reminder that a seismic discontinuity is a **velocity contrast**, and a velocity contrast is a **mineral assemblage**, and the mineral assemblage depends on the **composition** as well as the temperature.
:::
:::

::: warning A travel-time model is not a picture of the Earth
Four properties of the inverse problem make every seismic image a **model** rather than a photograph. **Non-uniqueness**: infinitely many velocity distributions fit the observed times within their errors, and the reported model is the **smoothest** or **damped** member of that set — which is why tomography systematically **underestimates** the amplitude of real anomalies by a factor of 1.5 to 3, and why a "2 per cent slow anomaly" may be a 5 per cent anomaly that the inversion could not resolve. **Limited geometry**: the deep mantle is sampled by a **sparse and clustered** network of paths concentrated in the circum-Pacific and the mid-ocean ridges, so an anomaly beneath Africa or the central Pacific is partly a **geometry** artefact, and the difference between two published models of the same region is usually a difference of **parameterisation** rather than of data. **Trade-off**: travel times constrain **velocity**, not temperature, composition, melt, water or fabric, and the conversion from a velocity anomaly to a **physical** one requires laboratory data on $\partial V/\partial T$, $\partial V/\partial X$ and $\partial V/\partial f_{\mathrm{melt}}$ that are uncertain by factors of two and that differ in **sign** between $V_P$ and $V_S$ — a melt that lowers $V_S$ by 5 per cent may lower $V_P$ by 2 per cent or **raise** it. **And the reference model is an assumption**: every tomographic anomaly is a perturbation from a **one-dimensional** model that is itself a fit to the same data, so the **long-wavelength** part of the mantle is poorly constrained and the "degree-2 heterogeneity" of the lower mantle — the two great slow provinces beneath Africa and the Pacific — is the **least** well-determined and the **most** geologically interesting feature in the model. The discipline is to publish the **resolution kernel**, the **amplitude recovery**, the **data coverage** and the **conversion factor** with every image, and to state the anomaly in **velocity** units until an independent measurement has converted it to a physical one.
:::

::: history
**Fermat's** principle was applied to elastic waves by **Green** (Green) and **Rayleigh** (Rayleigh); **Oldham** (Oldham) identified the core from the P-wave shadow and the long-period surface waves in 1906, **Mohorovičić** (Mohorovicic) the crust in 1909, **Gutenberg** (Gutenberg) the core–mantle boundary depth and the low-velocity layer in 1914–1926, **Jeffreys** (Jeffreys) produced the first rigorous travel-time tables, the **Bullen** (Bullen) gradient of 1937 formalised the inverse problem, and **Lehmann** (Lehmann) discovered the inner core in 1936 from the weak PKIKP arrivals inside the PKP shadow. **Birch** (Birch) established the mineral–velocity correlations in 1952 and thereby the **petrological** interpretation of the discontinuities; **Bullen** (Bullen) and **Hales** (Hales) computed the first **generalised** inverse (the "Backus–Gilbert" approach) and **Backus** (Backus) and **Gilbert** (Gilbert) formalised the resolution problem in 1967–1970. **Aki and Lee** (Aki) produced the first two-dimensional body-wave tomograms in 1976, **Dziewonski** (Dziewonski) the first global surface-wave maps in 1984, and **Dziewonski and Anderson** (Dziewonski) **PREM** in 1981, which remains the reference model. **Kennett** (Kennett) developed the **reflector** and **slice** geometry and the **S362** series, **VanDecar, Jordan, Masters, Nolet, Trampert and Boschi** (Nolet) built the modern global models, and **Fichtner and Trampert** (Fichtner) brought full waveform and adjoint methods to bear in the 2010s. The **410 and 660 discontinuities** were identified by **Bolt** (Bolt) in 1962 and 1964 and their mineral origins established by **Ringwood, Irifune and Yagi** (Ringwood); the **Clapeyron slopes** are the work of **Bina and Woodhouse** (Bina), **Flanagan and Shearer** (Shearer) and **Deuss** (Deuss). The **D″ layer** is the work of **Lees, Lay, Garnero and Helmberger** (Lay) and the **ultra-low-velocity zones** of **Garnero and Helmberger** (Garnero).
:::

## Where this leads

The wave physics behind every ray in this lesson is in [[geophysics/elastic-waves]], the sources of the waves and their moment tensors are in [[geophysics/earthquake-sources]], the mineral transitions behind the discontinuities are in [[mineralogy-petrology/phase-diagrams]] and [[physical-geology/earth-interior]], the mantle convection they imply is in [[geophysics/heat-flow]], the deep structure beneath orogens is in [[structural-geology/orogens]] and [[geophysics/flexure]], the reflection methods at exploration scale are in [[geophysics/exploration]], and the tomographic images of slabs and plumes are used in [[physical-geology/plate-tectonics]] and [[geophysics/geomagnetism]].

::: quiz
A travel-time curve shows a clear gap: no P arrivals between 103° and 142°. What does the gap prove?
- [ ] A low-velocity zone in the lower mantle.
- [x] A sharp decrease in P velocity somewhere deep in the Earth.
- [ ] Anelastic attenuation of core phases.
- [ ] Anisotropy of the outer core.
::: solution
A shadow zone of this kind requires a **velocity decrease with depth** at a discontinuity deep enough that the refracted rays are bent toward the radial direction — which is what the liquid outer core does to P. A low-velocity **zone** (a gradual decrease) also excludes rays, but it produces a **weaker, narrower** shadow with a **precursor** rather than a clean 39-degree gap, and attenuation and anisotropy cannot open a travel-time gap at all because they do not change the ray geometry.
:::
:::

::: summary
- The ray parameter $p = r\sin j/V$ is conserved, and a ray turns where $p = r_t/V(r_t)$; the turning points are a direct measurement of $V(r)$.
- Refraction gives $V_1$, $V_2$ and the intercept time, and therefore the depth — but blind and hidden layers make a refraction model a lower bound on layering.
- The Earth's principal discontinuities are the Moho, the 410, 520 and 660 phase transitions, D″, the core–mantle boundary and the inner-core boundary.
- The P shadow from 103° to 142° and the total S shadow beyond 103° are the evidence for a liquid core, and their geometry requires the real velocity profile to interpret.
- Tomography images are limited by resolution length, smearing, colouring and parameter trade-off, and their amplitudes are systematically underestimated.
- The Clapeyron topography of the 410 and 660 converts a discontinuity depth into a temperature, and is the basis of the slab-stagnation debate.
:::

## Exercises

::: exercise Slowness {level=1 check="0.15"}
A wave arrives with an apparent velocity of $6.7\ \mathrm{km\,s^{-1}}$ on a vertical geophone array. Find the horizontal slowness in s km⁻¹ and in s/degree.
::: solution
$p = 1/6.7 = 0.149\ \mathrm{s\,km^{-1}} \approx 0.15$. In angular units, $p_\Delta = p \times 111.2\ \mathrm{km\,deg^{-1}} = 16.6\ \mathrm{s\,deg^{-1}}$. Apparent velocities **below** the true velocity mean the wave is **tilted**, and the true velocity is recovered from the **curvature** of the travel-time curve at large distance, not from a single slope.
:::
:::

::: exercise Critical angle {level=1 check="30"}
Find the critical angle for $V_1 = 3.5$ and $V_2 = 7.0\ \mathrm{km\,s^{-1}}$.
::: solution
$\theta_c = \arcsin(3.5/7.0) = \arcsin 0.5 = 30^\circ$. The critical angle is **always** measured from the **normal** to the interface, and the head wave exists only for incidence **beyond** it — a fact that reverses in a dipping interface, where the critical distance is asymmetric about the downdip direction.
:::
:::

::: exercise Crossover distance {level=1 check="273"}
For $V_1 = 1.8$, $V_2 = 6.0\ \mathrm{km\,s^{-1}}$ and $h = 100$ m, find the crossover distance.
::: solution
$x_c = 2h\sqrt{(V_2+V_1)/(V_2-V_1)} = 200\sqrt{7.8/4.2} = 200\times1.363 = 273$ m, or **2.7 times the depth**. A spread that stops at 200 m would not see the refracted branch at all, which is the standard reason shallow refraction surveys fail: the spread length must be **at least** three to five times the target depth.
:::
:::

::: exercise Intercept time {level=2 check="113"}
Find the intercept time for $V_1 = 2.0$, $V_2 = 6.0\ \mathrm{km\,s^{-1}}$ and $h = 120$ m.
::: solution
$\theta_c = \arcsin(1/3) = 19.5^\circ$, $\cos\theta_c = 0.943$, and
$$
t_i = \frac{2h\cos\theta_c}{V_1} = \frac{2\times0.120\times0.943}{2.0} = 0.113\ \mathrm{s} = 113\ \mathrm{ms}.
$$
The intercept time is **not** the two-way reflection time $2h/V_1 = 120$ ms; the two differ by the factor $\cos\theta_c$, and confusing them is the commonest single error in refraction interpretation.
:::
:::

::: exercise The ray parameter {level=2 check="4.4"}
Find the ray parameter of the deepest-mantle P ray, which turns at the core–mantle boundary where $V_P = 13.71\ \mathrm{km\,s^{-1}}$ and $r = 3480\ \mathrm{km}$. Give it in s rad⁻¹ and s deg⁻¹.
::: solution
$p = r_t/V = 3480/13.71 = 254\ \mathrm{s\,rad^{-1}} = 254\times\pi/180 = 4.43\ \mathrm{s\,deg^{-1}}$. This is the **largest** ray parameter that reaches the core, and it corresponds to an epicentral distance of about 103° — the near edge of the shadow zone. Any observed P arrival at a distance **shorter** than 103° with a ray parameter **larger** than 4.43 s deg⁻¹ has been **diffracted** or **scattered** at the core–mantle boundary rather than refracted through it.
:::
:::

::: exercise A hidden layer {level=2}
A refraction survey over a three-layer sequence gives first arrivals consistent with a two-layer model. What can you say about the middle layer?
::: solution
Its velocity must lie **between** the two others in a way that prevents it from ever being a first arrival — either **below** the top layer's velocity (a **blind** or **low-velocity** layer, which is never a first arrival and cannot be detected by refraction at all) or **between** the two with a thickness below the **critical thickness** (a **thin high-velocity** layer, which is a first arrival only over a short offset range that the geophone spacing misses). In either case the reported depth to the deepest interface is **too shallow**, because the model has assigned the middle layer's travel time to the top layer. The diagnostic is a **curvature** in the first branch, or a **travel-time residual** pattern in a reversed profile, and the only reliable remedy is a **borehole**, a **cross-hole** survey or a **downhole** geophone.
:::
:::

::: exercise Discontinuity topography {level=3 check="25"}
The 410-km discontinuity has a Clapeyron slope of $+3.0\ \mathrm{MPa\,K^{-1}}$. Find the depth change beneath a mantle $300\ \mathrm{K}$ hotter than average, taking $\rho = 3700\ \mathrm{kg\,m^{-3}}$.
::: solution
With a **positive** slope a **hot** anomaly moves the boundary to **higher** pressure, $\Delta P = 3.0\times300 = +900\ \mathrm{MPa}$, so
$$
\Delta z = \frac{9.0\times10^{8}}{3700\times9.8} = +25\ \mathrm{km}.
$$
The 410 should be **depressed** by about 25 km beneath a hot upwelling. The observation beneath most hotspots is a **rise** of 10–20 km, and the discrepancy is the same "410 paradox" seen from the other side; it is resolved by the fact that the **seismic** 410 in a hot, hot-olivine-rich region is dominated by the wadsleyite transition, whose slope is positive, whereas in a **cold, garnet-rich** region the garnet transition contributes with the opposite sign. The magnitude of the observed topography, 10–30 km, is however a good match to the predicted 20–40 km, and the 410 and 660 together remain the best **thermometer** of the transition zone.
:::
:::

::: exercise Tomographic resolution {level=3 check="400"}
A global tomographic model has a resolution length of 400 km in the lower mantle and recovers a spherical anomaly of true radius 150 km and true amplitude $+5$ per cent. Estimate the **apparent** radius and amplitude, and explain the direction of each error.
::: solution
Smearing convolves the true anomaly with the resolution kernel, so the **apparent radius** is set by the kernel, not the object: about **400 km**. The amplitude is reduced in proportion to the **volume ratio** of the object to the resolving cell,
$$
\frac{\delta V_{\mathrm{apparent}}}{\delta V_{\mathrm{true}}} \approx \left(\frac{150}{400}\right)^{3} = 0.053 ,
$$
so the model reports a few tenths of a per cent rather than 5 per cent — a **two-order-of-magnitude** underestimate. In practice the recovery is better than this crude estimate because the kernel has a sharp central peak, and published **recovery tests** (a synthetic anomaly of known amplitude and size inserted into the model, then re-inverted) report amplitude recovery factors of 0.3–0.6 for objects at the resolution length and 0.05–0.1 for objects at a third of it.

The two errors are **always in the same direction** — anomalies are made **bigger and weaker** — and this is why tomographic images of **slabs** (thin, fast, strongly curved) systematically understate the velocity contrast and overstate the thickness, and why the **great low-velocity provinces** beneath Africa and the Pacific, which are **large**, are better recovered in amplitude than the slabs that feed them. It is also why the correct comparison between a tomographic model and a **mineral-physics** or **geodynamic** prediction is made by **forward-modelling the prediction through the same resolution kernel**, not by comparing the images directly.
:::
:::
