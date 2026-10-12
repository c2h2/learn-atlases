Seismology is the only direct probe of the Earth's interior, and it works because a solid resists being deformed in **two** independent ways. A fluid resists only compression, so it transmits only one kind of wave; a solid resists shear as well, so it transmits two, and the two travel at different speeds and arrive at different times. Every statement about the structure of the mantle and core — the depth of the Moho, the low-velocity zone, the core–mantle boundary, the inner core, the 660-km discontinuity, the presence of melt beneath a ridge — is an inference from the speeds, the paths, the reflections and the polarisations of elastic waves, and every one of those inferences rests on the four lines of algebra below.

## Elasticity and the two wave speeds

::: definition Hooke's law and the elastic moduli {#def-hooke}
For small deformations, stress is linearly proportional to strain, and for an **isotropic** solid the proportionality involves only two independent constants, the **Lamé parameters** $\lambda$ and $\mu$:
$$
\sigma_{ij} = \lambda\, e_{kk}\,\delta_{ij} + 2\mu\, e_{ij},
$$
where $\mu$ is the **rigidity** (the resistance to shear, which a fluid cannot supply, so that $\mu = 0$ in a fluid) and $\lambda$ has no independent physical meaning. The moduli in everyday use are the **bulk modulus** $K = \lambda + \tfrac{2}{3}\mu$, the **Poisson ratio** $\nu = \lambda/[2(\lambda+\mu)]$, and the **Young's modulus** $E = \mu(3\lambda+2\mu)/(\lambda+\mu)$. Given a density $\rho$ and the two wave speeds, all of them follow from
$$
V_P = \sqrt{\frac{\lambda+2\mu}{\rho}} = \sqrt{\frac{K+\tfrac{4}{3}\mu}{\rho}}, \qquad
V_S = \sqrt{\frac{\mu}{\rho}},
$$
$$
K = \rho\left(V_P^2 - \tfrac{4}{3}V_S^2\right), \qquad
\mu = \rho V_S^2, \qquad
\lambda = K - \tfrac{4}{3}\mu .
$$
The ratio $V_P/V_S$ depends on **nothing but the Poisson ratio**,
$$
\frac{V_P}{V_S} = \sqrt{\frac{2(1-\nu)}{1-2\nu}},
$$
and is therefore the cleanest **lithological and phase** diagnostic available, because it is independent of density, of pressure and of the absolute velocity. Its values are $1.414$ at $\nu = 0$, the **root-mean-square** $1.732$ at $\nu = 0.25$ typical of most dry rocks, $1.87$ at $\nu = 0.30$ typical of cracked or partially molten rock, and **infinity** in a fluid, where $V_S = 0$.
:::

::: definition The wave equation, and the waves it allows {#def-wave-eq}
Combining Newton's second law with Hooke's law and decomposing the displacement field into a dilatational and a rotational part (the **Helmholtz decomposition**) gives two uncoupled wave equations,
$$
\frac{\partial^2 \boldsymbol{\varphi}}{\partial t^2} = V_P^2\,\nabla^2\boldsymbol{\varphi}, \qquad
\frac{\partial^2 \boldsymbol{\psi}}{\partial t^2} = V_S^2\,\nabla^2\boldsymbol{\psi},
$$
describing a **primary** (compressional, dilatational, particle motion parallel to propagation) wave and a **secondary** (shear, distortional, particle motion perpendicular to propagation) wave. Because $V_P > V_S$ always, with $V_P/V_S \geq \sqrt{3}$ for any material with $\nu \geq 0$, the P wave always arrives first — hence the names. Four further families of waves exist only because the Earth has **surfaces, layers and gradients**:
$$
\begin{array}{l|l|l}
\text{wave} & \text{existence requires} & \text{particle motion / speed} \\ \hline
\text{Rayleigh (R)} & \text{a free surface} & \text{retrograde ellipse}, \ V_R \approx 0.92\,V_S \\
\text{Love (G)} & \text{a low-velocity layer on a half-space} & \text{transverse horizontal}, \ V_S < V_G < V_S' \\
\text{Stoneley} & \text{a welded interface} & \text{trapped to the interface} \\
\text{normal modes} & \text{a finite body} & \text{standing waves, periods } 20\text{--}60\ \mathrm{min}
\end{array}
$$
The **Rayleigh wave** is a coupled P–SV interference that decays exponentially with depth over about one wavelength, carries its energy at 92 per cent of the local shear velocity, and rolls a particle through a **retrograde** ellipse; the **Love wave** is a shear wave trapped by total internal reflection in a surface layer and is **dispersive**, so that its different frequencies arrive at different times and a surface-wave record is a **dispersion curve** from which the shear-velocity profile is inverted. The **free oscillations** of the whole Earth, excited by the largest earthquakes, are the standing-wave limit of the same physics, and the period of the gravest spheroidal mode $_0S_2$ — 20.53 minutes — is a measurement of the Earth's **whole-body** shear stiffness that no travelling wave can provide.
:::

::: example The elastic moduli of a rock from its velocities {#ex-moduli}
A laboratory sample of granite has $\rho = 2700\ \mathrm{kg\,m^{-3}}$, $V_P = 5.50\ \mathrm{km\,s^{-1}}$ and $V_S = 3.20\ \mathrm{km\,s^{-1}}$. Find $\mu$, $K$, $\lambda$ and $\nu$, and predict the velocities of water and of molten iron.
::: solution
$$
\mu = \rho V_S^2 = 2700\times(3200)^2 = 2.76\times10^{10} = 27.6\ \mathrm{GPa},
$$
$$
K = \rho\left(V_P^2 - \tfrac{4}{3}V_S^2\right) = 2700\left(3.025\times10^{7} - 1.365\times10^{7}\right) = 44.8\ \mathrm{GPa},
$$
$$
\lambda = K - \tfrac{2}{3}\mu = 44.8 - 18.4 = 26.4\ \mathrm{GPa}, \qquad
\nu = \frac{\lambda}{2(\lambda+\mu)} = \frac{26.4}{2\times54.0} = 0.24 .
$$
The check is the velocity ratio, which must give the same answer: $V_P/V_S = 5.50/3.20 = 1.72$ and $\sqrt{2(1-0.24)/(1-0.48)} = 1.75$. The three-tenths-of-a-kilometre discrepancy is the rounding of the quoted velocities, and it is a useful reminder that a velocity quoted to two significant figures supports a Poisson ratio to two decimal places at most.

For **water**, $\mu = 0$ and $V_S = 0$, so $K = \rho V_P^2 = 1000\times(1500)^2 = 2.25\ \mathrm{GPa}$ — a bulk modulus 20 times smaller than granite's, which is why water is called "incompressible" only in comparison with air. For **molten iron**, $\mu = 0$ and $V_P = 8.0\ \mathrm{km\,s^{-1}}$ at the core–mantle boundary requires $K = \rho V_P^2 = 11{,}000\times64\times10^{6} = 700\ \mathrm{GPa}$, which is **fifteen times** the bulk modulus of granite and is the reason the core, though liquid, is the stiffest part of the Earth in compression.

The general point is the one that makes seismic velocities a **mineral** diagnostic rather than a rock diagnostic: $V_P$ is controlled by $K + \tfrac{4}{3}\mu$, in which $K$ usually dominates, and $K$ is a **thermodynamic** property set by the atomic packing; $V_S$ is controlled by $\mu$ alone, and $\mu$ is far more sensitive to temperature, to anelasticity and to the presence of a little melt or fluid. That is why $V_S$ images of the mantle show **plumes and melt** and $V_P$ images of the same region show **nothing**, and why the ratio $V_P/V_S$, which cancels the density, is the discriminant.
:::
:::

::: widget plot
f: sqrt(2*(1-x)/(1-2*x))
x: 0, 0.45
y: 1.4, 3.4
labels: V_P/V_S
caption: The velocity ratio $V_P/V_S = \sqrt{2(1-\nu)/(1-2\nu)}$ as a function of Poisson's ratio. The curve is **flat near $\nu = 0.25$ and vertical at $\nu = 0.5$**, so the ratio is a sensitive detector of a **rising** Poisson ratio — the signature of fluids, cracks or melt — and an insensitive one of a falling ratio. Dry mantle peridotite has $V_P/V_S \approx 1.73$; a 1 per cent melt fraction aligned as thin films raises it to 1.85 and a 5 per cent fraction to over 2.0; water-saturated sandstone reaches 2.4; and a fluid gives infinity. This single ratio, measured from the arrival-time **ratio** rather than the absolute times, is the basis of hydrocarbon exploration by "bright spots" and "flat spots", of the detection of melt beneath mid-ocean ridges, and of the identification of the outer core.
:::

## Interfaces, impedance and the reading of a section

::: definition Acoustic impedance and the partition of energy {#def-impedance}
At a **plane interface** at normal incidence the continuity of displacement and traction gives the reflection and transmission coefficients
$$
R = \frac{Z_2 - Z_1}{Z_2 + Z_1}, \qquad T = \frac{2Z_1}{Z_2 + Z_1}, \qquad Z = \rho V ,
$$
where $Z$ is the **acoustic impedance**. The **reflected energy** is $R^2$ and the **transmitted** energy is $(Z_2/Z_1)T^2$, and the two sum to unity, as they must. Three consequences organise reflection seismology and the interpretation of the Earth's major discontinuities. First, a reflector requires an **impedance contrast**, not a velocity contrast: a thin layer of the same impedance as its surroundings is **invisible**, however different its lithology. Second, the **sign** of $R$ tells you whether the impedance increases or decreases with depth, and the convention that a positive reflection coefficient (a "peak" or a "trough", depending on the processing centre) marks an increase is what makes a seismic section a **lithological** map. Third, the largest impedance contrasts on the planet are not geological at all: the **air–water** and **air–rock** boundaries reflect 99.9 per cent of the incident energy, which is why an on-land seismic source must be coupled to the ground and why a marine survey uses a tuned airgun array at 8 m depth, where the **bubble oscillation** and the **surface-mirror** radiation combine to give a source wavelet an order of magnitude larger than either alone.
:::

::: example Reflection at the Moho and at a lava flow {#ex-impedance}
Find the normal-incidence reflection coefficient and the reflected energy at (a) the Moho, where the crust has $\rho = 2900\ \mathrm{kg\,m^{-3}}$, $V_P = 6.8\ \mathrm{km\,s^{-1}}$ and the mantle $3300$ and $8.1$, and (b) a basalt–sediment interface with $\rho = 2900$, $V_P = 5.5$ over $\rho = 2200$, $V_P = 3.0$. Why is the basalt a **hazard** to the imaging of what lies beneath it?
::: solution
**(a)** $Z_1 = 2900\times6800 = 1.97\times10^{7}$ and $Z_2 = 3300\times8100 = 2.67\times10^{7}\ \mathrm{kg\,m^{-2}\,s^{-1}}$, so
$$
R = \frac{2.67-1.97}{2.67+1.97} = 0.151, \qquad R^2 = 0.023 .
$$
**(b)** $Z_1 = 1.60\times10^{7}$, $Z_2 = 0.66\times10^{7}$, so
$$
R = \frac{0.66-1.60}{0.66+1.60} = -0.415, \qquad R^2 = 0.17 .
$$
The Moho reflects only **2.3 per cent** of the energy and transmits 98 per cent, which is why the whole Earth can be sounded from a single earthquake and why the Moho is nevertheless visible on a good section — the reflector is **sharp** (a few tens of metres against a 30-m wavelength) and **laterally continuous**, so the 2 per cent arrives coherently and sums over thousands of sources.

The basalt reflects **17 per cent** of the energy with a **negative** coefficient, and the consequences are severe. Seventeen per cent of the down-going energy is returned at the top of the flow, and the same fraction of the energy that has travelled **through** the flow is returned **again** at its base, so the section is dominated by a pair of strong, closely spaced reflectors and by their **multiples** — reverberations that bounce between the two interfaces and arrive at the times of deeper, real, reflectors. Worse, the basalt's velocity of 5.5 km s⁻¹ against the sediments' 3.0 means that rays are **refracted** steeply downward on entering the flow and **defocused**, so the illumination beneath it is poor; and the flow's **rough top** scatters energy laterally. The result is the classic "**basalt veil**" of the Rockall, the Deccan and the Faroe margins, where the sub-basalt structure is unknown after fifty years of surveying.

The remedies are all aimed at the same three problems. **Wide-azimuth and long-offset acquisition** improves the illumination and separates the multiples by their different moveout. **Multiple attenuation** by surface-wave decomposition, by inverse scattering and by **reverse-time migration** removes the reverberations. And **joint inversion** of the amplitude-versus-angle information with the velocity analysis distinguishes a basalt from a hydrocarbon-charged sandstone, both of which can produce a strong negative reflection.
:::
:::

::: example The P–S conversion at a discontinuity {#ex-converted}
A teleseismic P wave travelling at $8.1\ \mathrm{km\,s^{-1}}$ in the mantle strikes the base of 35-km-thick crust ($V_P = 6.8$, $V_S = 3.9\ \mathrm{km\,s^{-1}}$) at an incidence of $30^\circ$ from the vertical; take the mantle shear velocity as $4.7\ \mathrm{km\,s^{-1}}$. Find the take-off angles of the reflected and transmitted P and S phases, and explain why the **converted** Ps phase is used to map the Moho beneath a continent.
::: solution
Snell's law conserves the horizontal slowness $p = \sin i/V$, so
$$
p = \frac{\sin 30^\circ}{8.1} = 0.0617\ \mathrm{s\,km^{-1}} .
$$
In the crust the P converts at $\sin i_P = p\times6.8 = 0.420$, $i_P = 24.8^\circ$, and the S at $\sin i_S = p\times3.9 = 0.241$, $i_S = 13.9^\circ$. The **reflected** phases return into the mantle at the angles that conserve the same $p$: $i_{PP} = 30^\circ$ and, for the reflected converted phase, $\sin i_{PS} = p\times 4.7 = 0.290$, $i_{PS} = 16.9^\circ$.

The **Ps conversion** at the Moho is the basis of the most powerful method for imaging the deep structure beneath a seismically quiet continent. A P wave ascending from a distant earthquake is partly converted to an S wave at any impedance contrast, and because the S wave is **slower**, the Ps arrival is **delayed** relative to the direct P by an amount that for a flat layer of thickness $h$ is
$$
T_{Ps} = h\left[\sqrt{\frac{1}{V_S^2} - p^2} \;-\; \sqrt{\frac{1}{V_P^2} - p^2}\right],
$$
evaluated at the crustal $V_P$ and $V_S$ and at the incident slowness $p$. With $p = 0.0617\ \mathrm{s\,km^{-1}}$,
$$
T_{Ps} = 35\left[\sqrt{0.06575-0.00381} - \sqrt{0.02163-0.00381}\right]
       = 35(0.2489 - 0.1335) = 4.0\ \mathrm{s},
$$
and at vertical incidence, where $p=0$, the simpler $T_{Ps} = h(V_S^{-1}-V_P^{-1}) = 35(0.2564-0.1471) = 3.8$ s. A delay of 4 s is measurable to a few hundredths of a second, and therefore a Moho depth to a few hundred metres.

Three properties make the method decisive where reflection seismology cannot reach. The conversion occurs at **any** impedance contrast, so a **gradual** Moho that gives no reflection still gives a conversion, and the **shape** of the receiver function records the gradient. The method uses **teleseismic** energy, so it needs no source and works beneath a continent's interior. And the **converted** wave is uniquely identified by its **particle motion** — the Ps arrives on the **vertical** component while the direct P is mostly radial — so the signal is extracted by deconvolving the vertical from the radial component and the noise is the seismic noise rather than the site.

The weakness is a **multiplicity of interpretations**: a delay of 3.8 s can be 35 km of crust with a sharp Moho, or 30 km of crust with a **low-velocity zone** at its base, or 40 km of crust with a **gradient** rather than a step, and the three are separated only by the **angle dependence** of the delay and by the **multiple** conversions that reverberate between the Moho and the surface. This is why a modern receiver-function study uses hundreds of stations, several periods, and a forward model constrained by the surface-wave dispersion and the refraction velocity.
:::
:::

::: definition Anisotropy and shear-wave splitting {#def-aniso}
Real rocks are not isotropic. A crystal is elastically anisotropic because its bonds differ with direction — olivine's $V_P$ varies by 25 per cent between its three axes — and a **rock** is anisotropic because its grains are **preferred-oriented** by deformation or because it contains aligned cracks, bedding or layers. The observable consequences are three. **Velocity anisotropy**: a surface-wave or refraction velocity measured along a profile is not the velocity across it, and the difference can be 4 per cent in the oceanic upper mantle, where the lattice-preferred orientation of olivine produced by dislocation creep aligns the fast axis with the flow. **Radial anisotropy**: in a layered or foliated medium with a vertical symmetry axis the vertically polarised shear wave is **slower** than the horizontally polarised one, $V_{SV} < V_{SH}$, and the difference is diagnostic of layering versus fabric. **Shear-wave splitting**: a shear wave entering an anisotropic medium resolves into a fast and a slow polarised wave that separate in time by
$$
\delta t = d\left(\frac{1}{V_{\mathrm{slow}}} - \frac{1}{V_{\mathrm{fast}}}\right),
$$
and the **polarisation** of the fast wave and the **delay time** together give the **orientation** and the **strength** of the anisotropy and hence the **flow direction** and the **melt fraction** of the rock that produced it. Shear-wave splitting is the only measurement that images the **fabric** of the deforming mantle, and its delay times of 0.5–1.5 s for oceanic paths and near-zero values for old, cold continental cratons are the strongest single piece of evidence that the oceanic upper mantle is **sheared by plate motion**.
:::

::: example Shear-wave splitting beneath an oceanic plate {#ex-splitting}
A teleseismic shear wave crossing 100 km of oceanic upper mantle with a mean shear velocity of $4.5\ \mathrm{km\,s^{-1}}$ splits into two polarisations differing in velocity by 4 per cent. Find the delay time, and interpret a measured delay time of 0.9 s whose fast polarisation is parallel to the plate's absolute motion.
::: solution
The fast and slow velocities are $4.50$ and $4.32\ \mathrm{km\,s^{-1}}$, so
$$
\delta t = 100\left(\frac{1}{4.32} - \frac{1}{4.50}\right) = 100(0.2315 - 0.2222) = 0.93\ \mathrm{s}.
$$
The measured 0.9 s therefore requires **the whole 100 km of the plate** to be anisotropic with a 4 per cent velocity difference, and the alignment of the fast polarisation with the **absolute** (hotspot-reference-frame) plate motion identifies the cause as **fossil lattice-preferred orientation** of olivine acquired by dislocation creep in the upwelling and shearing flow beneath the ridge and the spreading axis.

The interpretation is not unique, and the two alternatives are separated by the **frequency dependence** and by the **back-azimuthal variation** of the splitting. **Aligned melt inclusions** in the asthenosphere also produce splitting with the fast axis parallel to flow, but they are expected only where there is melt, they produce a **larger** anisotropy, and they should vary with the distance from the ridge. **Layering** — the alternating sequence of dykes, gabbro and peridotite in the lower oceanic crust — produces splitting with the fast axis **parallel to the layering** and hence to the **spreading direction**, which is distinguishable from the absolute-motion direction wherever the plate has changed its motion; the classic test is the **Hawaiian** and **Pacific** records, where the fast polarisation follows the **changed** Pacific plate motion after 47 Ma in the deeper part of the profile and the **current** direction in the shallow part, which is direct evidence for **vertical coherence** of mantle flow within the plate and for **decoupling** at its base.

The quantitative content is the **percentage anisotropy** $\Delta V/V = \delta t\, V/d$, which for these numbers is $0.93\times4.5/100 = 4.2$ per cent. Global syntheses find 1–2 per cent for the **whole** oceanic upper mantle and 4 per cent for the **lithospheric** part, and the difference is the reason the anisotropy is attributed to the **frozen-in lithosphere** rather than to the present-day asthenosphere.
:::
:::

::: warning A seismic velocity is not a rock property
Four confusions account for most misreadings of a seismic section or a tomographic model. **Velocity is not lithology**: a $V_P$ of 6.0 km s⁻¹ is consistent with a gabbro, an amphibolite, a quartz diorite, a highly compacted sandstone at 8 km depth, or a basalt at 200 °C, and the only way to choose is the **ratio** $V_P/V_S$, the **density** from gravity, and the **geology**. **Anomaly is not temperature**: in tomographic models the conversion from velocity perturbation to temperature perturbation uses $\partial\ln V/\partial\ln T$, which is $-0.5$ to $-1.5\times10^{-3}\ \mathrm{K^{-1}}$ for $V_S$ in the upper mantle and **positive** for $V_P$ in a melt-bearing region, so a **slow** $V_S$ anomaly can be hot, melt-bearing, volatile-rich or simply a **artefact of the parameterisation** — and the "slow" mid-ocean-ridge signature in $V_P$ is commonly **faster**, not slower, than average. **Resolution is not depth**: a tomographic model's resolving kernel is hundreds of kilometres wide in the deep mantle and the apparent "structure" at 2500 km may be a **smearing** of the core–mantle boundary; the honest statement is the **resolution length**, not the image. **And a reflection is not a layer**: a seismic reflector is an **impedance contrast** at a scale finer than the tuning thickness (one quarter of the wavelength, about 15 m at 25 Hz), and a "layer" on a section may be a **single interface**, a **sequence boundary** with a porosity change, a **fluid contact**, a **lithology change**, or a **processing artefact** — a multiple, a pull-up, a migration smile or a footprint. The discipline is to state the **frequency, the resolution length, the parameterisation, the reference model and the conversion assumed** for every velocity statement, and to treat a velocity anomaly as a **hypothesis about rock or temperature** that requires an independent test.
:::

::: history
The wave equation was applied to elastic solids by **Poisson** (Poisson), **Green** (Green) and **Stokes** (Stokes) in the 1820s–1840s; **Rayleigh** (Rayleigh) predicted the surface wave in 1885 and **Love** (Love) the transverse horizontal surface wave in 1911, and **Lamb** (Lamb) solved most of classical seismology in a series of papers from 1882, including the surface wave that bears no one's name and the free oscillations of an elastic sphere. **Oldham** (Oldham) identified the P-wave shadow and hence the core in 1906, **Mohorovičić** (Mohorovicic) the crust–mantle boundary in 1909, **Gutenberg** (Gutenberg) the core–mantle boundary depth in 1914 and the low-velocity zone in 1926, **Jeffreys** (Jeffreys) computed the first travel-time tables in 1926–1939, and **Lehmann** (Lehmann) discovered the inner core in 1936 from the weak P arrivals inside the shadow zone. **Birch** (Birch) established the mineral–velocity correlations in 1952 and thereby the **petrological** interpretation of seismic velocities; **Bullen** (Bullen) formalised the adiabatic and seismic gradients in 1937–1963; **Jeffreys** (Jeffreys) wrote *The Earth* and **Bullen** (Bullen) *An Introduction to the Theory of Seismology*. The free oscillations were predicted by **Lamb** (Lamb) in 1882, observed after the 1960 Chile earthquake, and placed on a rigorous footing by **Gilbert, Gutenberg, Birch, Bullen, Dziewonski, Anderson, Masters, Woodhouse and Jordan** (Gilbert). **Aki and Richards** (Aki) wrote *Quantitative Seismology* in 1980, **Kanamori** (Kanamori) introduced the moment magnitude in 1977 and **Richter** (Richter) the local magnitude in 1935; **Aki and Richards** (Aki) established the spectral method for source parameters. Seismic **anisotropy** was predicted for the upper mantle by **Christie, Nicolas, Christensen, Mainprice and Ben Ismail** (Nicolas), and its observational programme — **Crampin and Jones** (Crampin) and **Fouch and Fischer** (Fouch) — established the oceanic splitting database. **Anelasticity and attenuation** are the work of **Knopoff** (Knopoff), **Kjartansson** (Kjartansson) and **Faul and Jackson** (Faul). **Global tomography** is the work of **Dziewonski and Anderson** (Dziewonski), **Woodhouse and Dziewonski** (Woodhouse), **VanDecar, Jordan, Masters, Nolet, Kennett, Trampert, and the Amsterdam and Cambridge schools** (Nolet).
:::

## Where this leads

The interpretation of travel times and the layered Earth model are in [[geophysics/seismic-structure]], the sources of the waves and the moment tensor are in [[geophysics/earthquake-sources]], the mineral physics behind the velocity jumps are in [[mineralogy-petrology/phase-diagrams]] and [[geochemistry/elements-earth]], the anisotropy and flow fabric are in [[structural-geology/rheology]] and [[geophysics/heat-flow]], the reflection methods and their processing are in [[geophysics/exploration]] and [[earth-resources/petroleum-systems]], the seismic hazard applications are in [[natural-hazards/earthquake-hazard]] and [[natural-hazards/tsunamis]], and the interior structure they reveal is in [[physical-geology/earth-interior]] and [[geophysics/seismic-structure]].

::: quiz
A rock has $V_P = 6.0$ km s⁻¹ and $V_S = 3.0$ km s⁻¹. What is the most notable feature of this rock?
- [ ] It is very dense.
- [x] Its Poisson ratio is unusually high, which suggests cracks, fluids or melt.
- [ ] It is a fluid.
- [ ] It is unusually stiff.
::: solution
$V_P/V_S = 2.0$, which corresponds to a Poisson ratio of about 0.37 — far above the 0.25 of a dry, uncracked rock. A high ratio means that the rigidity is low relative to the bulk modulus, which is what a little melt, a little fluid, or a population of aligned cracks does to a rock. The density and the absolute stiffness are **not** constrained by the ratio at all, which is why the ratio is quoted alongside, not instead of, the velocities.
:::
:::

::: summary
- A solid transmits two body waves because it has a rigidity; a fluid transmits only one, and $V_S = 0$ is the definition of a fluid.
- $V_P$ is set mainly by the bulk modulus and $V_S$ entirely by the rigidity, so $V_S$ images melt and temperature and $V_P$ does not.
- $V_P/V_S$ depends only on Poisson's ratio and is the cleanest lithology and phase diagnostic available.
- A reflector is an impedance contrast, not a velocity contrast, and the reflected energy is $R^2$, which is 2 per cent at the Moho and 17 per cent at a basalt.
- Anisotropy splits a shear wave into two polarisations, and the delay time and polarisation image the fabric and the flow of the rock.
- Every velocity statement must be accompanied by its frequency, its resolution length and its conversion assumption.
:::

## Exercises

::: exercise Wave speeds from moduli {level=1 check="4.0"}
Find $V_S$ for a rock with $\mu = 54\ \mathrm{GPa}$ and $\rho = 3400\ \mathrm{kg\,m^{-3}}$.
::: solution
$V_S = \sqrt{\mu/\rho} = \sqrt{5.4\times10^{10}/3400} = \sqrt{1.588\times10^{7}} = 3985\ \mathrm{m\,s^{-1}} \approx 4.0\ \mathrm{km\,s^{-1}}$ — a typical upper-mantle shear velocity. Note that a 10 per cent increase in density with **no** change in rigidity would **lower** the velocity by 5 per cent, which is why the velocity increase with depth in the mantle requires the moduli to rise faster than the density.
:::
:::

::: exercise Velocity ratio {level=1 check="1.73"}
Find $V_P/V_S$ for $\nu = 0.25$.
::: solution
$V_P/V_S = \sqrt{2(1-0.25)/(1-0.5)} = \sqrt{3} = 1.73$. This is the value assumed in every textbook conversion from one velocity to the other, and the fact that real rocks range from 1.6 to 2.5 is the reason those conversions are only good to 10 per cent.
:::
:::

::: exercise A fluid's velocity {level=1 check="2.25"}
Water has $\rho = 1000\ \mathrm{kg\,m^{-3}}$ and $V_P = 1.5\ \mathrm{km\,s^{-1}}$. Find its bulk modulus.
::: solution
With $\mu = 0$, $K = \rho V_P^2 = 1000\times(1500)^2 = 2.25\times10^{9} = 2.25\ \mathrm{GPa}$. Water is about twenty times more compressible than a silicate mineral, which is why the porosity of a rock controls its velocity so strongly: replacing 15 per cent of a 70-GPa framework with 2-GPa water drops the effective bulk modulus by a factor of five.
:::
:::

::: exercise Impedance {level=1 check="0.3"}
Find the normal-incidence reflection coefficient where the impedance doubles across an interface.
::: solution
$R = (2Z - Z)/(2Z + Z) = 1/3 = 0.30$, and the reflected energy is $R^2 = 0.09$, or 9 per cent. A doubling of impedance is a **strong** reflector by exploration standards, where 0.05 is a "bright spot".
:::
:::

::: exercise Rayleigh waves {level=2 check="3.7"}
Find the Rayleigh-wave velocity where the shear velocity is $4.0\ \mathrm{km\,s^{-1}}$.
::: solution
$V_R \approx 0.92\,V_S = 3.7\ \mathrm{km\,s^{-1}}$. The ratio 0.92 varies only between 0.862 and 0.955 over the whole physical range of Poisson's ratio, which is why the Rayleigh velocity is such a robust estimate of the near-surface shear velocity — and why the **microtremor** and **multichannel analysis of surface waves** methods are the standard site-response techniques in engineering seismology.
:::
:::

::: exercise Elastic moduli of the upper mantle {level=2 check="129"}
For upper-mantle peridotite with $\rho = 3350\ \mathrm{kg\,m^{-3}}$, $V_P = 8.1$ and $V_S = 4.5\ \mathrm{km\,s^{-1}}$, find $K$.
::: solution
$K = \rho(V_P^2 - \tfrac{4}{3}V_S^2) = 3350(6.56\times10^{7} - 2.70\times10^{7}) = 3350\times3.86\times10^{7} = 1.29\times10^{11} = 129\ \mathrm{GPa}$. The corresponding rigidity is $\mu = 68\ \mathrm{GPa}$ and the Poisson ratio is 0.28 — the value that makes the mantle's $V_P/V_S$ of 1.80 slightly higher than a dry laboratory peridotite's 1.73, an inconsistency that has never been fully resolved and that has been attributed to anelasticity, to a small melt fraction, and to a systematic error in the laboratory-to-mantle extrapolation.
:::
:::

::: exercise Shear-wave splitting {level=2 check="3.6"}
Find the percentage anisotropy for a delay time of 1.2 s through 150 km of mantle with a mean shear velocity of $4.5\ \mathrm{km\,s^{-1}}$.
::: solution
$\Delta V/V = \delta t\, V/d = 1.2\times4.5/150 = 0.036$, or 3.6 per cent — about 4 per cent. A delay time of 1.2 s is at the high end for oceanic paths and typical of **continental** lithosphere beneath a craton or an orogen, where the anisotropy is frozen into the deformed minerals rather than maintained by present-day flow.
:::
:::

::: exercise The invisible layer {level=3 check="0"}
A 20-m-thick sandstone with $\rho = 2400\ \mathrm{kg\,m^{-3}}$ and $V_P = 3.6\ \mathrm{km\,s^{-1}}$ is embedded in a shale with $\rho = 2300\ \mathrm{kg\,m^{-3}}$ and $V_P = 3.76\ \mathrm{km\,s^{-1}}$. Find the reflection coefficient at each interface and explain what the seismic section shows.
::: solution
$Z_{\mathrm{sand}} = 2400\times3600 = 0.864\times10^{7}$ and $Z_{\mathrm{shale}} = 2300\times3760 = 0.865\times10^{7}$, so
$$
R = \frac{0.864 - 0.865}{0.864 + 0.865} \approx 0 .
$$
The sandstone is **seismically invisible**. Its lithology, its porosity, its hydrocarbon saturation and its reservoir quality are all invisible too, because the reflection coefficient depends on the **product** $\rho V$ and the two vary in **opposite** directions — the sand is less dense and faster, and the product is unchanged.

The consequences are the substance of **direct hydrocarbon detection** and its limits. A reservoir is visible only if the fluid changes the impedance, which requires the **rock** framework to be already close to the shale's and the fluid to lower the velocity and the density — the classic "bright spot" of a gas sand. Where the impedance contrast is absent, the reservoir must be predicted from **sequence stratigraphy, from amplitude-versus-angle analysis, from spectral decomposition, or from a well tie**, and the seismic section will show nothing.

The second consequence is **tuning**. At 25 Hz the wavelength in the sand is $3600/25 = 144$ m, so a 20-m bed is far below the **tuning thickness** of $\lambda/4 = 36$ m, and even if the impedance contrast were large the top and base reflections would **interfere** and appear as a single, anomalously bright event at the wrong depth. The resolution limit is not the sampling interval but the **wavelength**, and no amount of processing recovers a bed thinner than about one hundredth of the seismic wavelength — which is why the reservoir geologist uses the well, not the section, below 2 km.
:::
:::

::: exercise The whole-Earth constraint {level=3 check="16.3"}
The gravest spheroidal normal mode of the Earth, $_0S_2$, has a period of 20.53 min. Estimate the shear velocity of a uniform sphere of the Earth's radius (6371 km) that would have this period, taking the mode wavelength to be the circumference divided by 2 and the period to be the travel time of a shear wave around half the circumference.
::: solution
The wavelength is $2\pi R/2 = 20{,}015$ km and the travel time for one period at that wavelength is 20.53 min = 1232 s, so
$$
V_S \approx \frac{20{,}015}{1232} = 16.3\ \mathrm{km\,s^{-1}} \quad\text{(wavelength/period)}.
$$
The estimate is a factor of four too high, and the reason is instructive: the $_0S_2$ mode is not a travelling wave and its energy samples the **whole** radius, with the period set by the **integral** of $1/V_S$ over the mantle weighted by the mode's kinetic and potential energy. The correct relation for the gravest toroidal and spheroidal modes is a **whole-Earth average**, and the observed 20.53 min constrains the **mass-averaged shear velocity** of the mantle to about $4.5\ \mathrm{km\,s^{-1}}$ — which is exactly what the mode was used for before digital inversion, and which is why the free oscillations remain the **only** measurement of the Earth's shear stiffness that is independent of the assumption of a laterally homogeneous reference model.

The practical importance is that the free oscillations give the **density and gravity** normalisation of the whole Earth, and hence the **pressure** at the core–mantle boundary, without any assumption about composition. Every mineral-physics prediction of the core's density is compared against that number, and the 5–10 per cent light-element deficit of the core that it implies is one of the two or three most important facts in the geochemistry of the Earth.
:::
:::
