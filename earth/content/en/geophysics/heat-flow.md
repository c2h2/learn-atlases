The Earth loses heat to space at a rate of $4.6$–$4.7\times10^{13}\ \mathrm{W}$ — about one-tenth of the solar energy the planet receives, and the whole of the engine that drives plate tectonics, volcanism, metamorphism and the geodynamo. Heat-flow measurement is the only direct measurement of that loss, and heat-flow maps, together with the radiogenic heat production of the crust, are the only data that constrain the **temperature** of the Earth's interior — the one property that every other geophysical method measures only through its effect on velocity, density or strength.

## Heat flow and its measurement

::: definition Heat flow, the gradient and the conductivity {#def-heatflow}
In the upper few kilometres of the crust, where the temperatures are below the stability field of water and no fluid moves fast enough to advect heat, the heat flow is **conductive** and obeys Fourier's law
$$
q = -k\frac{dT}{dz} \quad [\mathrm{W\,m^{-2}}],
$$
with the thermal conductivity $k$ of the common rocks falling in a narrow range — 2.1 for wet shale, 2.5 for wet sandstone, 3.0 for granite, 3.3 for basalt, 3.5–4.0 for quartzite and limestone, and 4.0–4.5 for peridotite, all in $\mathrm{W\,m^{-1}\,K^{-1}}$. A measurement therefore needs two numbers: the **vertical temperature gradient**, from a borehole temperature log corrected for **bottom-hole** disturbance and for **transient** drilling effects, and the **thermal conductivity** of the cuttings or core, measured by the **optical scanning** or **divided-bar** method on **saturated** samples at in-situ temperature. The global means are
$$
\begin{array}{l|c|c|c}
\text{province} & q\ (\mathrm{mW\,m^{-2}}) & \text{area}\ (10^{14}\ \mathrm{m^2}) & Q\ (\mathrm{TW}) \\ \hline
\text{continental crust} & 65\pm2 & 1.5 & 9.8 \\
\text{oceanic crust} & 101\pm1 & 3.6 & 37 \\
\text{whole Earth} & 87 & 5.1 & 47
\end{array}
$$
and the **oceanic** figure includes the **hydrothermal** flux through ridge-flank aquifers, which is not captured by the conductive probe measurements and which is now measured by the **heat-flux** and **radium-isotope** method.
:::

::: definition Radioactivity and the Birch diagram {#def-radio}
Three isotopes supply essentially all of the crust's heat — $^{238}\mathrm{U}$, $^{232}\mathrm{Th}$ and $^{40}\mathrm{K}$ — and the **heat production** of a rock in $\mu\mathrm{W\,m^{-3}}$ is
$$
A = \rho\left(9.52\times10^{-5}\,C_{\mathrm{U}} + 2.56\times10^{-5}\,C_{\mathrm{Th}} + 3.48\times10^{-9}\,C_{\mathrm{K}}\right),
$$
with $\rho$ in $\mathrm{kg\,m^{-3}}$, $C_{\mathrm{U}}$ and $C_{\mathrm{Th}}$ in ppm and $C_{\mathrm{K}}$ in ppm (so 1 per cent K = 10 000 ppm). A granite with 3 ppm U, 12 ppm Th and 3.5 per cent K produces $1.9\ \mu\mathrm{W\,m^{-3}}$ and the **average** upper continental crust $1.3\ \mu\mathrm{W\,m^{-3}}$, while the lower crust produces $0.2$–$0.4$ and the mantle $0.001$–$0.01$. Because the upper crust is **enriched** in the heat-producing elements by a factor of 10–50 over the lower crust and the mantle, the heat production **decays** roughly exponentially with depth, $A(z) = A_0 e^{-z/D}$, and integrating gives the **crustal radiogenic heat flow** $A_0 D$. Plotting the measured surface heat flow against the near-surface heat production for a **province** gives a straight line, the **Birch diagram**,
$$
q = q_{\mathrm{r}} + D\,A_0 ,
$$
whose **slope** is the **depth scale** $D$ of the radioactivity profile, typically 6–12 km, and whose **intercept** is the **reduced heat flow** $q_{\mathrm{r}}$ — the flux from the lower crust and mantle, typically 30–50 $\mathrm{mW\,m^{-2}}$. The Birch diagram is the oldest and still the most robust way to separate the **crustal** from the **mantle** contribution to the terrestrial heat flow, and its message is that **40–50 per cent** of the continental heat flow is radiogenic and the rest is primordial and mantle-derived.
:::

::: example A borehole heat-flow measurement {#ex-borehole}
A 1200-m borehole gives a mean temperature difference of $34.8\ ^\circ\mathrm{C}$ between its 200-m and 1200-m depths. Core measurements give a conductivity of $2.9\ \mathrm{W\,m^{-1}\,K^{-1}}$ for the upper 600 m and $3.4\ \mathrm{W\,m^{-1}\,K^{-1}}$ for the lower 600 m. Find the heat flow, and state the two corrections that must be applied.
::: solution
The gradient is $34.8/1000 = 34.8\ \mathrm{K\,km^{-1}}$. Because the heat flow is **steady** and there is no internal source in the interval, $q$ is **constant** and the **gradient** adjusts to the conductivity, so the mean conductivity must be computed as the **harmonic** mean over the interval of equal thickness,
$$
\bar{k} = \frac{2}{1/2.9 + 1/3.4} = \frac{2}{0.3448+0.2941} = 3.14\ \mathrm{W\,m^{-1}\,K^{-1}},
$$
and
$$
q = \bar{k}\,\frac{dT}{dz} = 3.14\times0.0348 = 0.109\ \mathrm{W\,m^{-2}} = 109\ \mathrm{mW\,m^{-2}} .
$$
A heat flow of 109 mW m⁻² is **high** — twice the continental mean — and indicates either a **granitic** batholith with high radioactivity, a **magmatic** or **hydrothermal** system, or an **artefact**.

The two corrections that decide the answer are the **temperature-dependence of conductivity** and the **transient** disturbance. Conductivity **decreases** with temperature, $k(T) = k_{25}(1 - c\,\Delta T)$ with $c \approx 1.5$–$2.5\times10^{-3}\ \mathrm{K^{-1}}$ for silicates, so over a 35-K interval the mean conductivity is 5 per cent below the laboratory value measured at 25 °C and the heat flow is **overestimated** by 5 per cent unless the correction is applied — and over a 300-K interval, as in a geothermal borehole, the error reaches 30 per cent. The **transient** correction removes the drilling disturbance: circulating drilling mud **cools** or **heats** the wall rock, and the borehole temperature recovers over **days to weeks**, so a log run too soon after drilling gives a **distorted** gradient, and the diagnostic is a **repeat** log.

Two further effects bias the answer at the provincial scale. **Topography** refracts the isotherms, so a borehole in a valley reads a **low** gradient and one on a ridge a **high** one, and the correction is 10–20 per cent in mountainous terrain — which is why heat-flow maps of the Alps, the Himalaya and the Basin and Range were revised repeatedly as the correction was properly applied. **And quartz content**: the conductivity of a rock depends more on its **quartz** and **porosity** than on anything else, and a conductivity measured on **dry** cuttings is 15–25 per cent **higher** than on **saturated** ones, so a heat flow computed from dry laboratory values is systematically **too high** — a bias that affected a substantial fraction of the pre-1990 global data set.
:::
:::

::: widget plot
f: 448/sqrt(x)
x: 1, 200
y: 25, 460
labels: q\ (\text{mW/m}^2)
caption: The **half-space cooling model**'s prediction for the heat flow of young oceanic lithosphere, $q = k\,T_{\mathrm{m}}/\sqrt{\pi\kappa t}$ with $k = 3.3\ \mathrm{W\,m^{-1}\,K^{-1}}$, $T_{\mathrm{m}} = 1350\ ^\circ\mathrm{C}$ and $\kappa = 10^{-6}\ \mathrm{m^2\,s^{-1}}$, plotted against the age of the seafloor in Myr. The **inverse-square-root** law fits the observed heat flow of crust older than about 20 Myr to within 10 per cent and is the single most successful quantitative prediction in marine geophysics, because it is derived from **one** parameter — the thermal diffusivity — and confirmed by the **independent** observations of the **depth–age** relation and the **Bouguer gravity anomaly**, both of which require the same $\sqrt{t}$ thickening. At ages **younger than 20 Myr** the observed heat flow falls **far below** the curve, and the deficit is the **hydrothermal** flux carried by seawater circulating through the young, fractured crust — the "missing heat" of young ocean, which amounts to a **third** of the oceanic heat loss and which is measured by the **heat-flux** and **radium** method rather than by a probe.
:::

## Cooling, convection and the thermal state of the interior

::: definition The half-space model and the thermal structure of the oceans {#def-halfspace}
Cooling of a hot half-space from the surface gives a **thermal boundary layer** whose thickness grows as the square root of time,
$$
\delta(t) = 2\sqrt{\kappa t} = 112\ \mathrm{km}\left(\frac{t}{100\ \mathrm{Myr}}\right)^{1/2},
$$
and a surface heat flow $q = k\,T_{\mathrm{m}}/\sqrt{\pi\kappa t}$. The same $\sqrt{t}$ appears in the **bathymetry**, because the thickening cold layer is **denser** and floats lower:
$$
d(t) = d_0 + 350\ \mathrm{m}\left(\frac{t}{100\ \mathrm{Myr}}\right)^{1/2},
$$
and in the **Bouguer anomaly**, which rises by about 7 mGal over the same interval. The **three** observations — heat flow, depth and gravity — are fitted by **one** thermal model with **one** free parameter, the diffusivity, and this triple agreement is the strongest evidence in the subject that the oceanic lithosphere really is a **cooling conductive boundary layer** on a convecting interior. The model fails at ages **greater than about 70 Myr**, where the bathymetry **flattens** and the heat flow falls **below** the curve, and the two leading explanations — a **plate model** with a finite-thickness conducting lid, and **small-scale convection** at the base of the lithosphere — remain unresolved.
:::

::: definition Rayleigh number and the strength of mantle convection {#def-rayleigh}
Whether a fluid layer convects is decided by the **Rayleigh number**
$$
Ra = \frac{\rho\,\alpha\,\Delta T\, g\, d^{3}}{\eta\,\kappa},
$$
which compares **buoyancy** to the opposing effects of **viscosity** and **thermal diffusion**. Convection begins at $Ra_{\mathrm{c}} = 1708$ for a layer with rigid boundaries and 657 for free-slip boundaries, and for the whole mantle, with $\rho = 3300\ \mathrm{kg\,m^{-3}}$, $\alpha = 3\times10^{-5}\ \mathrm{K^{-1}}$, $\Delta T = 1500\ \mathrm{K}$, $d = 2900\ \mathrm{km}$, $\eta = 10^{21}\ \mathrm{Pa\,s}$ and $\kappa = 5\times10^{-7}\ \mathrm{m^2\,s^{-1}}$,
$$
Ra = \frac{3300\times3\times10^{-5}\times1500\times9.8\times(2.9\times10^{6})^3}{10^{21}\times5\times10^{-7}} = 7\times10^{7}.
$$
The mantle is therefore **super-critical by four orders of magnitude**, and its convection is **turbulent** in the sense that the flow organises into **plates**, **plumes** and **slabs** rather than into a regular pattern of rolls. The **Nusselt number**, the ratio of convective to conductive heat transport, follows a power law $Nu \propto (Ra/Ra_c)^{\beta}$ with $\beta \approx 0.3$, and for the mantle $Nu \approx 30$–$50$ — which is why the Earth's surface heat flow of $87\ \mathrm{mW\,m^{-2}}$ is **fifty times** the $1.7\ \mathrm{mW\,m^{-2}}$ that pure conduction across a stagnant mantle would carry.

The consequence is the **stagnant lid**: because the surface is cold, its viscosity is $10^{24}$–$10^{26}\ \mathrm{Pa\,s}$ and it does not convect, so the mantle convects **beneath** a rigid, plate-like lid whose thickness is the **thermal boundary layer** $\delta = k\,\Delta T/q$. For $k = 3.3$, $\Delta T = 1600\ \mathrm{K}$ and $q = 90\ \mathrm{mW\,m^{-2}}$, $\delta = 59\ \mathrm{km}$ — the observed thickness of the oceanic **thermal** lithosphere — and the whole of plate tectonics is the consequence of the fact that this lid **breaks** into plates rather than remaining continuous.
:::

::: example The Birch diagram and the crustal heat production {#ex-birch}
In a Precambrian province the surface heat flow and near-surface heat production of 40 sites define the line $q = 36 + 8.5\,A_0$ with $q$ in $\mathrm{mW\,m^{-2}}$, $A_0$ in $\mu\mathrm{W\,m^{-3}}$ and the slope in km. A granite at the surface produces $4.0\ \mu\mathrm{W\,m^{-3}}$. Find the crustal radiogenic heat flow, the mantle heat flow, and the total heat flow at a site standing on that granite.
::: solution
The slope is the **depth scale** of the radioactivity profile, $D = 8.5\ \mathrm{km}$, and the intercept is the **reduced heat flow**, $q_{\mathrm{r}} = 36\ \mathrm{mW\,m^{-2}}$. At $A_0 = 4.0$:
$$
q_{\mathrm{crust}} = A_0 D = 4.0\times8.5 = 34\ \mathrm{mW\,m^{-2}}, \qquad
q_{\mathrm{surface}} = 36 + 34 = 70\ \mathrm{mW\,m^{-2}} .
$$
The crust therefore supplies **49 per cent** of the surface heat flow and the mantle and lower crust the remaining 36 mW m⁻².

The interpretation and its limits are worth stating precisely. The **slope** $D$ is a **depth scale**, not a depth: it is the $1/e$ decay length of the fitted exponential, and a real province has a **layered** radioactivity profile whose equivalent exponential is a **fit**. The **intercept** $q_{\mathrm{r}}$ is **not** the mantle heat flow, because it includes the radiogenic contribution of the **lower crust**, which is 0.2–0.4 μW m⁻³ and, over a 25-km lower crust, contributes 5–10 mW m⁻² — so the **mantle** heat flow is 26–31 mW m⁻², and the total heat flow from the **sub-continental mantle** is $26\text{–}31\times10^{-3}\times1.5\times10^{14} = 4\text{–}5\ \mathrm{TW}$, about **10 per cent** of the Earth's total. The **correlation** between $q$ and $A_0$ is **not proof** of the exponential profile: a province whose heat flow varies because of **variable mantle flux** and whose $A_0$ varies **independently** will show a **scatter**, not a line, and the fact that provinces **do** show lines with slopes of 6–12 km is the evidence for the exponential.

The **high heat-flow anomaly** this predicts over a granite batholith — 70 against a provincial mean of 55 mW m⁻² — is the reason the **geothermal** resource maps of Cornwall, Brittany, the Rhine graben and the Australian Cooper Basin target granites, and the reason the **nuclear-waste** repository programmes of Finland, Sweden and France must characterise the **thermal** output of their host rock: a repository in granite at 70 mW m⁻² runs 15 °C hotter than one in granite at 55, and the **canister** temperature is the design limit.
:::
:::

::: example The missing heat of young ocean {#ex-missing}
The half-space model predicts a heat flow of $142\ \mathrm{mW\,m^{-2}}$ at 10 Myr and $58\ \mathrm{mW\,m^{-2}}$ at 60 Myr. Probe measurements on 10-Myr crust give $60\ \mathrm{mW\,m^{-2}}$ and on 60-Myr crust $55\ \mathrm{mW\,m^{-2}}$. Find the **deficit** at each age, and explain where the missing heat goes and why it was missed for thirty years.
::: solution
The deficits are $142 - 60 = 82\ \mathrm{mW\,m^{-2}}$ at 10 Myr and $58 - 55 = 3\ \mathrm{mW\,m^{-2}}$ at 60 Myr. Integrating the 10-Myr deficit over the area of crust younger than 20 Myr — about $1.1\times10^{13}\ \mathrm{m^2}$ — gives
$$
82\times10^{-3}\times1.1\times10^{13} = 0.9\ \mathrm{TW},
$$
and extending the calculation over the whole young-ocean domain, with the deficit falling as the crust ages, gives a **total hydrothermal heat loss of 2–3 TW**, about 5 per cent of the Earth's total and a **third** of the oceanic heat flow from crust younger than 20 Myr.

The heat is carried by **seawater** that enters the sediment-covered basalt at a **recharge** outcrop, circulates laterally for tens to hundreds of kilometres through the highly permeable upper oceanic crust, is heated by the still-hot rock, and discharges at a **discharge** outcrop as a **low-temperature** (10–60 °C) **ridge-flank** vent. Because the circulation is **lateral** rather than vertical, the **vertical** conductive gradient measured by a probe is **depressed** over the whole recharge region, and the probe reads a heat flow far below the true **total**. It was missed for thirty years because the **probe** method measures only **conduction**, because the discharge is **diffuse** rather than focused and leaves no visible plume, and because the **geochemical** evidence — the enormous **manganese**, **strontium**, **lithium** and **radium** fluxes from the ridge flanks, and the **⁸⁷Sr/⁸⁶Sr** and **²²⁸Ra/²²⁶Ra** anomalies of deep ocean water — had been known since the 1970s but was attributed to **sediment pore-water** rather than to **basaltic** circulation.

The consequences reach beyond heat. The **ridge-flank** hydrothermal system is a **major** global reactor: it **cools** the young lithosphere by an amount comparable to its conductive loss, **alters** the upper kilometre of oceanic crust on a **global** scale, **acidifies** and **reduces** the deep ocean, and supplies a flux of **silica**, **calcium**, **manganese** and **hydrogen** to the ocean that rivals or exceeds the **mid-ocean-ridge** hot-spring flux measured at the axes. And it means that the **age–heat-flow** curve, the founding relation of marine geophysics, is a **conductive** curve only for crust older than 20 Myr, and that the **total** heat loss of young ocean must be measured by **heat-flux** probes driven into the sediment and by **geochemical** tracers rather than by a **piston** corer and a **thermistor**.
:::
:::

::: example Temperature at a repository depth {#ex-repository}
A candidate site for a deep geological repository stands on granite with a surface heat flow of $65\ \mathrm{mW\,m^{-2}}$, a conductivity of $3.0\ \mathrm{W\,m^{-1}\,K^{-1}}$ and a heat production $A(z) = A_0 e^{-z/D}$ with $A_0 = 3.5\ \mu\mathrm{W\,m^{-3}}$ and $D = 8\ \mathrm{km}$. The surface temperature is $10\ ^\circ\mathrm{C}$. Find the gradient and temperature at 1 km and at 2 km, and the depth at which the temperature reaches 100 °C.
::: solution
The heat flow **decreases** with depth as the radiogenic contribution is used up,
$$
q(z) = q_{\mathrm{s}} - A_0 D\left(1 - e^{-z/D}\right), \qquad A_0 D = 3.5\times8 = 28\ \mathrm{mW\,m^{-2}},
$$
and the temperature is the integral of the gradient,
$$
T(z) = T_0 + \frac{1}{k}\left[q_{\mathrm{s}} z - A_0 D\left\{z + D\left(e^{-z/D} - 1\right)\right\}\right].
$$
Evaluating:
$$
\begin{array}{c|c|c|c}
z\ (\mathrm{km}) & q\ (\mathrm{mW\,m^{-2}}) & \text{gradient}\ (\mathrm{K\,km^{-1}}) & T\ (^\circ\mathrm{C}) \\ \hline
0 & 65.0 & 21.7 & 10 \\
1 & 61.7 & 20.6 & 31 \\
2 & 58.8 & 19.6 & 51 \\
3 & 56.2 & 18.7 & 70 \\
5 & 52.0 & 17.3 & 106
\end{array}
$$
so the temperature reaches **100 °C at about 4.8 km**.

The result is the reason the **thermal** criterion is one of the two binding constraints on a repository — the other being the groundwater — and why the canister-spacing design of the Finnish, Swedish and French repositories is a **heat-flow** calculation. The **buffer** temperature must stay below about 80–100 °C to avoid accelerating the **corrosion** of the copper canister and the **microbial** activity in the bentonite, and every 10 mW m⁻² of extra heat flow pushes the repository **shallower** and forces the tunnels **farther apart**, which is why the site-selection programme measures the heat flow on **tens** of boreholes rather than on the three or four of a conventional geothermal survey.

Note also the **concavity** of the temperature–depth profile: the gradient falls from 21.7 to 17.3 K km⁻² over 5 km because the rock between the surface and the depth produces heat. A repository design that assumes a **linear** geotherm from the surface gradient overestimates the temperature at 2 km by $21.7\times2 - 51 + 10 = 3$ °C and at 5 km by **12 °C** — an error that is small for a repository and **decisive** for a **geothermal** resource assessment, where the recoverable energy is an integral of the temperature.
:::
:::

::: warning A heat-flow number is only as good as its conductivity and its geology
Heat flow is the **product** of two measurements, and its errors are **multiplicative** and **systematic** rather than random. **The conductivity bias**: $k$ measured on **dry** cuttings is 15–25 per cent higher than on **saturated** ones, and $k$ measured at **25 °C** is 5–30 per cent higher than at **in-situ** temperature, so a heat flow computed from dry, room-temperature conductivities is biased **high** by up to 40 per cent — a bias that affected much of the pre-1990 global data set and that was corrected only when **Jaeger** (Jaeger), **Beckwith** (Beckwith) and later **Fuchs, Balling and the European and Australian surveys** (Balling) insisted on **saturated, in-situ-temperature** measurement. **The gradient bias**: a borehole log run before the drilling disturbance has decayed, a log **not** corrected for the **non-linear** temperature–depth profile caused by **advection** in a permeable formation, or a **deviated** borehole whose depth is taken as its vertical depth, each biases the gradient. **The topography bias**: 10–20 per cent in mountainous terrain, and it is **systematic** — valleys read low and ridges high — so a heat-flow map made without the correction maps the **topography**. **The "heat-flow province" fallacy**: the Birch line is fitted **within** a province, and a line fitted across **two** provinces with different crustal composition gives a **spurious** slope and a **spurious** reduced heat flow, which is why the global heat-flow data set must be **partitioned** by province before any of it is interpreted. **And the steady-state assumption**: the whole method assumes **thermal equilibrium**, which fails near **intrusions** younger than about 5 Myr, beneath **glacier**-loaded terrain deglaciated in the last 20 kyr, in **overpressured** sedimentary basins where **compaction-driven** flow advects heat, and in **fault zones** where meteoric water circulates kilometres — and in each of these the measured heat flow is a **transient**, not a **property**. The discipline is to publish the **conductivity method, its saturation and temperature, the number of gradient determinations, the topographic correction, the borehole history and the provincial assignment** with every heat-flow value, and to treat a heat-flow map as a **hypothesis about the subsurface temperature** until a borehole has tested it.
:::

::: history
**Fourier** (Fourier) published the theory of heat conduction in 1822; **Thomson** (Thomson, later Lord Kelvin) computed the Earth's age from conductive cooling in 1862–1868 and debated it with **Perry** (Perry) for a decade — an argument that **Rutherford** (Rutherford) and **Soddy** (Soddy) closed in 1904 by identifying **radioactive heating** inside the Earth. **Curie** (Curie) and **Rutherford** (Rutherford) established the heat-producing isotopes, **Birch, Schairer and LeConte** (Birch) measured the first **heat production** of rocks in 1942, and **Birch** (Birch), **Roy, Parry and Blackwell** (Blackwell) established the **heat-flow–heat-production diagram** in 1950–1968, with **Rybach and Burchart** (Rybach) giving the exponential radioactivity profile in 1960. **Bullard** (Bullard) made the first **marine** heat-flow measurements in the 1930s and 1940s, **Revelle, Maxwell and the Scripps group** (Revelle) and **Ewing and the Lamont group** (Ewing) made the first systematic oceanic surveys in the 1950s, and **Sclater, Hunter and Beck** (Sclater), **Anderson H. N.** (Anderson) and **Parsons and Spector** (Parsons) established the **age–heat-flow** and **depth–age** relations of the seafloor in 1969–1979. The **half-space** and **plate** models of the cooling lithosphere are the work of **McKenzie** (McKenzie), **Le Pichon and Harris** (Le Pichon) and **Davis and Lister** (Lister) in 1971–1974. **Rayleigh** (Rayleigh) established the convection criterion in 1916; **Howard** (Howard) and **Roberts** (Roberts) applied it to the mantle in 1967, **Turcotte and Schubert** (Turcotte) wrote the standard *Geodynamics* treatment, and **Christensen** (Christensen), **Davies and Davies** (Davies) calibrated the **Nusselt–Rayleigh** scaling and the **global heat-flow** database. **Lister** (Lister), **Davis** (Davis), **Villinger** (Villinger), **Hutcheon** (Hutcheon) and **Fisher** (Fisher) established the **ridge-flank hydrothermal** heat flux and its correction to the young-ocean heat-flow curve in 1990–2003.
:::
## Where this leads

The thermal structure of the lithosphere that heat flow measures is used in [[geophysics/flexure]] and [[geophysics/seismic-structure]], the mantle convection it constrains is the subject of [[physical-geology/plate-tectonics]] and [[planetary-science/interiors]], the core's heat loss and the geodynamo are in [[geophysics/geomagnetism]], the geothermal resource and the subsurface storage of carbon dioxide are in [[earth-resources/geothermal-storage]], the temperature of metamorphism is in [[mineralogy-petrology/metamorphic-reactions]] and [[mineralogy-petrology/pt-paths]], the borehole methods are in [[geophysics/exploration]], and the cooling of the early Earth is in [[earth-history/early-earth]] and [[planetary-science/interiors]].

::: quiz
A province's Birch diagram has a slope of 9 km and an intercept of 40 mW m$^{-2}$. What does the slope measure?
- [ ] The thickness of the crust.
- [x] The depth scale over which the radioactivity decays.
- [ ] The depth to the Moho.
- [ ] The thickness of the thermal boundary layer.
::: solution
The slope of the Birch line is the **1/e depth scale** of the assumed exponential radioactivity profile, typically 6–12 km, and the intercept is the **reduced heat flow** from the lower crust and mantle. Neither is the Moho depth or the lithospheric thickness, though both are often mistaken for them.
:::
:::

::: summary
- The Earth loses 47 TW; the continental mean heat flow is 65 and the oceanic 101 mW m⁻².
- A heat-flow measurement is a conductivity times a gradient, and both are systematically biased unless the saturation, temperature, topography and drilling history are corrected.
- Forty to fifty per cent of the continental heat flow is radiogenic, and the Birch diagram separates it from the mantle contribution.
- The half-space model predicts the oceanic heat flow, bathymetry and gravity from one parameter, the thermal diffusivity, and fails only at young ages where hydrothermal circulation takes over.
- The mantle's Rayleigh number is of order 10⁷, four orders above the onset of convection, and its Nusselt number of 30–50 explains why the surface heat flow is fifty times the conductive value.
- The thermal boundary layer thickness implied by the heat flow, about 60 km, is the oceanic lithosphere, and its breaking into plates is plate tectonics.
:::

## Exercises

::: exercise Conductive gradient {level=1 check="30"}
Find the heat flow for a gradient of $25\ \mathrm{K\,km^{-1}}$ and a conductivity of $3.0\ \mathrm{W\,m^{-1}\,K^{-1}}$.
::: solution
$q = 3.0\times0.025 = 0.075\ \mathrm{W\,m^{-2}} = 75\ \mathrm{mW\,m^{-2}}$. A gradient of 25 K km⁻¹ is close to the **continental** mean, and a gradient of 60–80 K km⁻¹ beneath a **shield** granite is the signature of high radioactivity.
:::
:::

::: exercise Heat production {level=1 check="1.9"}
Find the heat production of a granite with $\rho = 2700\ \mathrm{kg\,m^{-3}}$, 3 ppm U, 12 ppm Th and 3.5 per cent K.
::: solution
$A = 2700\times(9.52\times10^{-5}\times3 + 2.56\times10^{-5}\times12 + 3.48\times10^{-9}\times35{,}000) = 2700\times7.15\times10^{-4} = 1.9\ \mu\mathrm{W\,m^{-3}}$. Note that **potassium** contributes 17 per cent of the total despite its tiny coefficient, because its abundance is four orders of magnitude greater.
:::
:::

::: exercise Oceanic heat flow {level=1 check="142"}
Using $q = kT_m/\sqrt{\pi\kappa t}$ with $k = 3.3$, $T_m = 1350\ ^\circ\mathrm{C}$ and $\kappa = 10^{-6}\ \mathrm{m^2\,s^{-1}}$, find the heat flow at 10 Myr.
::: solution
$\sqrt{\pi\kappa t} = \sqrt{3.1416\times10^{-6}\times3.15\times10^{14}} = 3.15\times10^{4}\ \mathrm{m}$, so
$q = 3.3\times1350/3.15\times10^{4} = 0.141\ \mathrm{W\,m^{-2}} = 141\ \mathrm{mW\,m^{-2}}$. The observed value at 10 Myr is **less than half** this, and the difference is the hydrothermal flux.
:::
:::

::: exercise Thermal lithosphere {level=2 check="59"}
Find the thickness of the thermal boundary layer implied by a mantle heat flow of $90\ \mathrm{mW\,m^{-2}}$, $k = 3.3\ \mathrm{W\,m^{-1}\,K^{-1}}$ and a potential temperature of 1600 K.
::: solution
$\delta = k\,\Delta T/q = 3.3\times1600/0.090 = 5.9\times10^{4}\ \mathrm{m} = 59\ \mathrm{km}$. This is the **conductive** thickness of the oceanic thermal lithosphere and agrees with the depth to the 1300 °C isotherm in the half-space model at about 60–80 Myr, and with the **thermal** lithosphere thickness from surface-wave tomography.
:::
:::

::: exercise Rayleigh number {level=2 check="4.6"}
Compute the Rayleigh number for the mantle with $\rho = 3300$, $\alpha = 3\times10^{-5}$, $\Delta T = 1500$, $g = 9.8$, $d = 2900\ \mathrm{km}$, $\eta = 10^{21}\ \mathrm{Pa\,s}$ and $\kappa = 5\times10^{-7}\ \mathrm{m^2\,s^{-1}}$, and find how many orders of magnitude it lies above the critical value of 1708.
::: solution
$Ra = 3300\times3\times10^{-5}\times1500\times9.8\times(2.9\times10^{6})^3/(10^{21}\times5\times10^{-7}) = 7\times10^{7}$, and $\log_{10}(7\times10^{7}/1708) = 4.6$ orders of magnitude. Note the **cube** of the layer thickness: if the mantle's effective depth were halved, $Ra$ would fall by a factor of eight and the style of convection would change qualitatively, which is why **small planets** such as Mars and the Moon froze early and lost their tectonics.
:::
:::

::: exercise The Birch line {level=2 check="36"}
A province's Birch line is $q = 36 + 8.5 A_0$. Find the surface heat flow where $A_0 = 2.0\ \mu\mathrm{W\,m^{-3}}$ and the fraction that is radiogenic.
::: solution
$q = 36 + 17 = 53\ \mathrm{mW\,m^{-2}}$, of which 17 (32 per cent) is radiogenic. The **radiogenic fraction falls with decreasing $A_0$**, so a province standing on **mafic** or **subducted** crust has a heat flow that is almost entirely **mantle-derived**, and its heat-flow map is a map of the **mantle**, which is why the heat flow of the Black Sea, the Caribbean and the oceanic margins is so directly a **geodynamic** measurement.
:::
:::

::: exercise The Nusselt number {level=3 check="52"}
The observed surface heat flow of the mantle is $90\ \mathrm{mW\,m^{-2}}$. Find the Nusselt number relative to pure conduction across a stagnant 2900-km mantle with $k = 3.3\ \mathrm{W\,m^{-1}\,K^{-1}}$ and $\Delta T = 1500\ \mathrm{K}$.
::: solution
The conductive heat flow is
$$
q_{\mathrm{cond}} = \frac{k\,\Delta T}{d} = \frac{3.3\times1500}{2.9\times10^{6}} = 1.74\times10^{-3}\ \mathrm{W\,m^{-2}} = 1.74\ \mathrm{mW\,m^{-2}},
$$
so $Nu = 90/1.74 = 52$. The $Nu$–$Ra$ scaling $Nu = (Ra/Ra_c)^{1/3}$ with $Ra = 7\times10^{7}$ predicts $Nu = 35$, and with the exponent 0.3 it predicts 24 — so the mantle transports heat **more efficiently** than the simplest scaling allows, which is the signature of **internal heating**, of a **temperature-dependent viscosity**, and of a **mobile** rather than stagnant lid.

The number is the single most important constraint in **thermal** geodynamics, because it links the **present** heat loss to the **Rayleigh number**, and hence to the mantle's viscosity and temperature, and because the **cooling rate** of the Earth follows from its derivative. A Nusselt number of 50 with a **temperature-dependent** viscosity implies that the Earth's heat flow was **two to three times** higher in the Archaean, which the **komatiite** and **barrel-petrology** records confirm, and that the mantle has cooled by only 100–300 K since then — a cooling so small that it has taken thirty years of argument to establish.
:::
:::

::: exercise The Archaean Earth {level=3 check="1.19"}
Using the boundary-layer relation $q = k\Delta T/\delta$, find the ratio of Archaean to present surface heat flow if the mantle potential temperature was 300 K higher (1900 against 1600 K) and the thermal boundary-layer thickness $\delta$ were unchanged.
::: solution
With $\delta$ unchanged, $q \propto \Delta T$, so
$$
\frac{q_{\mathrm{arch}}}{q_0} = \frac{1900}{1600} = 1.19 .
$$
That is far **less** than the komatiite record requires, and the reason is that the boundary layer is **not** the same: a hotter mantle is **less viscous**, convects more vigorously, and thins its own boundary layer. With the **Nusselt–Rayleigh** scaling $Nu \propto Ra^{1/3}$ and $\eta \propto e^{E^*/RT}$, a 300-K increase in temperature with an activation energy of $400\ \mathrm{kJ\,mol^{-1}}$ lowers the viscosity by a factor of $10^{3}$–$10^{4}$, raises $Ra$ by the same factor, and raises $Nu$ by $10$–$20$ per cent — giving a heat-flow ratio of **1.3–1.5**.

The komatiite record, which requires mantle melting at 1900–2000 K against today's 1550–1650 K, and the **barrel-petrology** and **greenstone** records both point to a heat flow **two to three times** the present value, and the discrepancy with the simple scaling is one of the outstanding problems of thermal geodynamics. The proposed resolutions are a **much lower** Archaean **crustal** contribution — the Archaean crust was **mafic** and produced little radiogenic heat, so a large fraction of the surface heat flow was **mantle-derived** — a **different** style of convection with **smaller, more numerous** plates and **more** boundary-layer area, and a **wet**, weaker lithosphere that recycled more rapidly.

The general lesson is that the Earth's heat flow is **not** a simple function of its internal temperature, because the **viscosity** that controls the transport is itself an **exponential** function of temperature, and that the **feedback** between temperature, viscosity and heat loss is what makes the Earth's thermal evolution **self-regulating** — and what makes the simple "cooling-plate" extrapolation into the Archaean unreliable by a factor of two.
:::
:::
