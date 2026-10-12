Exploration geophysics is the only branch of the subject that must answer a question of the form "what is at 1500 metres, and is it worth drilling?" — and it is therefore the branch in which the difference between a **physical property** and a **geological interpretation** is most brutally tested. Every method measures one or two **potential-field** or **wave** properties at the surface or in a borehole, every property is **non-unique** — the same anomaly can be produced by any of a dozen bodies — and the whole discipline is the disciplined use of **geology** to reduce that non-uniqueness, plus the arithmetic of **risk** that decides whether the reduction is worth the cost of a borehole.

## The methods and the properties they measure

::: definition The four physical properties and the methods that read them {#def-properties}
Every exploration method reads one of four properties of the rock, and the choice of method is a choice of which property discriminates between the **target** and its **host**:
$$
\begin{array}{l|c|c|l}
\text{property} & \text{typical range} & \text{contrast} & \text{method} \\ \hline
\text{density } \rho & 1800\text{–}3300\ \mathrm{kg\,m^{-3}}\ \text{(sediment)},\ 4500\text{–}5500\ \text{(sulphide)} & \text{low} & \text{gravity} \\
\text{susceptibility } \kappa & 10^{-4}\text{–}10^{-1}\ \text{SI},\ \text{magnetite } 0.1\text{–}3 & \text{very high} & \text{magnetics} \\
\text{seismic velocity } V & 1500\text{–}6500\ \mathrm{m\,s^{-1}} & \text{moderate} & \text{seismic refraction / reflection} \\
\text{elastic impedance } \rho V & \text{product of the two} & \text{high} & \text{reflection coefficient} \\
\text{resistivity } \rho_{\mathrm{e}} & 0.01\text{–}10^4\ \Omega\,\mathrm{m} & \text{very high} & \text{resistivity, EM, IP, logging} \\
\text{chargeability } m & 0.001\text{–}0.1\ \mathrm{V\,V^{-1}} & \text{very high for sulphides} & \text{induced polarisation}
\end{array}
$$
The **contrast**, not the absolute value, is what generates an anomaly, and the four properties are **independent** in a way that makes multi-method surveys powerful: a **massive sulphide** is dense, magnetic, conductive, chargeable and fast, whereas the **graphitic** or **clay-rich** host that mimics it in one property is unlike it in three others. The **contrast** also controls the **depth of investigation**, and the ranking of the methods by depth is roughly
$$
\text{magnetics} \sim 2\ \mathrm{km} > \text{gravity} \sim 5\ \mathrm{km} > \text{reflection seismic} \sim 10\ \mathrm{km} > \text{EM} \sim 1\ \mathrm{km} > \text{DC resistivity} \sim 0.5\ \mathrm{km},
$$
with the important qualification that **conductivity** destroys the depth of the electromagnetic methods: in a **graphitic** or **saline-shale** terrain a 10-kHz transmitter probes **30 m** where in resistive terrain it probes 300.
:::

::: definition Potential-field interpretation and its non-uniqueness {#def-potential}
Gravity and magnetic anomalies are **potential fields**, and their interpretation is governed by three facts that no amount of processing defeats. First, the **upward-continuation** and **downward-continuation** operators are **inverse** and **unstable**: downward continuation amplifies noise as $e^{kz}$, so a survey with 0.1-mGal noise cannot be continued down more than about half its **station spacing** in metres. Second, the **equivalent-layer** and **Parker** transformations show that an **infinite family** of source distributions reproduces any observed field exactly, so **no** potential-field data set can be inverted without **prior** geological information — a rule formalised in the **inverse-problem** literature as the **non-uniqueness theorem of potential-field theory**. Third, the anomaly of a body scales as
$$
\Delta g \propto \frac{\Delta\rho\, V}{r^{2}}, \qquad \Delta T \propto \frac{\Delta\kappa\, V}{r^{3}},
$$
so the **magnetic** method loses signal with the **cube** of depth while the **gravity** method loses it with the **square** — which is why magnetics is a **shallow, high-resolution** method and gravity a **deep, low-resolution** one, and why a 1-km-deep magnetic source must be **ten times** the size of a 100-m source to give the same anomaly.

The practical interpretation toolkit is correspondingly modest: the **residual anomaly** obtained by removing a **regional** field fitted as a polynomial or a wavelength filter, the **vertical gradient** and **horizontal gradient** which sharpen shallow sources, the **analytic signal** and **reduction to the pole** which place a magnetic anomaly over its source, and **forward modelling** in which a geological cross-section is **built** until its computed anomaly matches the observed one — and the match is then a **hypothesis**, not a **result**.
:::

::: definition The reflection method: acquisition, processing and the image {#def-seismic}
A reflection survey is a **filter** applied to the subsurface, and every choice in its design is a choice about what will be visible. **Acquisition**: the **shot interval**, **group interval** and **fold** determine the **spatial sampling**, which must satisfy the **spatial Nyquist** criterion that the **shortest** reflected wavelength be sampled at **two or more** stations, or **spatial aliasing** will fold the **ground-roll** into the signal; the **maximum offset** determines the **depth of velocity analysis** and the **angle range** available for AVO; and the **source frequency** must be matched to the **target depth**, because the earth's attenuation rises with frequency and a 10-Hz source is required at 8 km where 60 Hz suffices at 1 km. **Processing**: **deconvolution** compresses the wavelet and removes multiples, **velocity analysis** and **normal-moveout correction** align the events, **stacking** sums them to make the zero-offset section, and **migration** moves each event from its **apparent** surface position to its **true** subsurface position — a step that is a **no-op** over flat horizontal reflectors and **decisive** under **salt**, **thrusts**, **steep dips** and **faults**, where an unmigrated section places a **trap** hundreds of metres from where it is. **Interpretation**: **sequence stratigraphy** reads the **onlap**, **downlap** and **truncation** of the reflectors as **depositional** surfaces, **structural** interpretation maps the **horizons** and **faults**, and **inversion** converts the **amplitudes** to **impedance** and thence, by a statistical or **deterministic** rock-physics transform, to **lithology** and **fluid**.

The **resolution** limit is the reason all four steps are needed: the vertical resolution is about a **quarter** of the wavelength, so at 3000 m s⁻¹ and 50 Hz no bed thinner than **15 m** can be **resolved**, and a 5-m **reservoir** can be mapped only through its **amplitude**, its **AVO** response and its **inverted impedance** — that is, statistically rather than by imaging. This is the reason the modern workflow is **quantitative**: a **rock-physics** programme that measures the velocities and densities of **core** and **cuttings**, a **post-stack** or **pre-stack** **inversion** to impedance, and a **probabilistic** classification of the inverted volume against the rock-physics trends, with the **probability of net sand** and the **probability of hydrocarbons** reported as **volumes** rather than as **contours**.
:::

::: example Velocity analysis and depth conversion {#ex-velocity}
A common-midpoint gather gives a zero-offset two-way time of $t_0 = 1.000\ \mathrm{s}$ for a reflector and a moveout time of $t = 1.150\ \mathrm{s}$ at an offset of $x = 1500\ \mathrm{m}$. Find the stacking velocity, and the depth to the reflector. Then find the **depth error** if the true velocity is 10 per cent higher than the stacking velocity.
::: solution
For a **horizontal** reflector in a **constant-velocity** medium the moveout is hyperbolic,
$$
t^{2} = t_0^{2} + \frac{x^{2}}{V_{\mathrm{st}}^{2}} \quad\Longrightarrow\quad
V_{\mathrm{st}} = \frac{x}{\sqrt{t^{2}-t_0^{2}}} = \frac{1500}{\sqrt{1.3225-1.0000}} = \frac{1500}{0.5679} = 2641\ \mathrm{m\,s^{-1}},
$$
and the depth is $h = \tfrac{1}{2}V t_0 = 0.5\times2641\times1.000 = 1321\ \mathrm{m}$. If the true velocity is 10 per cent higher, the depth is **1453 m** and the depth error is **132 m**, or 10 per cent — the **same** fraction as the velocity error, because the depth is the **product** $Vt_0/2$ and the time is measured to 1 ms.

This is the central quantitative fact of **exploration** seismics: **the depth to a trap is known no better than the velocity**, and the velocity is measured by the moveout, which constrains the **root-mean-square** velocity through the section, not the **interval** velocity. The three remedies are **check-shot** and **vertical-seismic-profile** surveys from a borehole, which measure the interval velocity **directly** and are the only way to convert a prospect's depth to better than 3 per cent; **velocity analysis** of the **residual moveout** after migration, which constrains the velocity **gradient**; and **dip-moveout (DMO)** and **pre-stack depth migration**, which separate the velocity from the dip. A **prospect** whose depth is uncertain by 10 per cent at 1500 m has a **spill point** uncertain by 150 m, and if the **oil-water contact** is 100 m below the spill point the **contingent resource** is **zero or double** — which is why a **dry hole** is more often a **velocity** error than a **geological** one.
:::
:::

::: example Gravity exploration for a massive sulphide {#ex-gravity}
A volcanogenic massive sulphide lens of pyrite and chalcopyrite with $\rho = 4500\ \mathrm{kg\,m^{-3}}$ measures $200\ \mathrm{m} \times 50\ \mathrm{m} \times 300\ \mathrm{m}$ and lies with its centre at 400 m depth in sedimentary country rock of $\rho = 2700\ \mathrm{kg\,m^{-3}}$. Estimate the maximum Bouguer anomaly, and decide whether it is detectable and whether it is distinguishable from a **gabbro** intrusion of the same size.
::: solution
The excess mass is
$$
\Delta m = \Delta\rho\, V = 1800 \times (200\times50\times300) = 5.4\times10^{9}\ \mathrm{kg},
$$
and treating the lens as a point mass at 400 m gives
$$
\Delta g = \frac{G\,\Delta m}{r^{2}} = \frac{6.674\times10^{-11}\times5.4\times10^{9}}{400^{2}} = 2.25\times10^{-6}\ \mathrm{m\,s^{-2}} = 0.23\ \mathrm{mGal}.
$$
A modern **relative gravimeter** resolves $0.01\ \mathrm{mGal}$ and a **static** or **quantum** gravimeter $0.001\ \mathrm{mGal}$, so the anomaly is **easily** detectable — and the difficulty is entirely in the **regional**. A **Bouguer** anomaly map of a mining district is dominated by **sedimentary thickness**, **basement depth** and **faults**, whose anomalies are 10–50 mGal, and the **residual** of interest is 0.2 mGal: a **one-part-in-a-hundred** signal that survives only if the **topographic** correction is made with a **LiDAR** digital terrain model at 1-m resolution, the **tidal** and **pole-position** corrections are applied, and the **regional** is removed with a wavelength filter tuned to the **known** basement depth.

The **gabbro** is the real problem. A gabbro at $\rho = 3000\ \mathrm{kg\,m^{-3}}$ has $\Delta\rho = 300$ against the same country rock, one-sixth of the sulphide's, and would give 0.04 mGal — but a gabbro body **six times** the volume gives the **same** 0.23 mGal, and the **wavelength** of the anomaly, which is the only discriminator, is **degraded** by the depth and by the noise. The **density** of a massive sulphide (4300–5000) is far above any **intrusive** or **metasedimentary** rock, so a **borehole-density** or **downhole-gravity** measurement over the anomaly **does** discriminate — and this is the standard practice: the **surface** gravity survey **locates** the anomaly, and a **single** borehole **or** a **downhole** gravity gradient measurement **confirms** the density and hence the lithology.

The general rule this illustrates is that **potential-field methods do not identify rocks, they identify density and susceptibility contrasts**, and that the identification is made by the **borehole** or by the **other** three properties. A **gravity-high, magnetic-high, conductive, chargeable** anomaly is a massive sulphide with high probability; a **gravity-high, magnetic-low, conductive** anomaly is a **graphite** or **carbonaceous** schist; and a **gravity-high, magnetic-high, resistive** anomaly is a **gabbro** or an **amphibolite**.
:::
:::

::: widget plot
f: 5.03*sqrt(x)
x: 1, 10000
y: 4, 520
labels: delta\ (\text{m})
caption: The **skin depth** $\delta = \sqrt{2/\omega\mu\sigma} = 503\sqrt{\rho/f}$ metres of a time-harmonic electromagnetic field in a half-space of resistivity $\rho$ at $f = 10\ \mathrm{kHz}$, plotted against $\rho$ in $\Omega\,\mathrm{m}$. The **square-root** dependence on resistivity is the reason the electromagnetic methods work so well in **resistive** terrain and fail so completely in **conductive** terrain: at $\rho = 10{,}000\ \Omega\,\mathrm{m}$ (dry basalt, quartzite, permafrost) a 10-kHz transmitter probes **500 m**, while at $\rho = 1\ \Omega\,\mathrm{m}$ (saline clay, graphitic schist, marine mud) it probes **5 m**. The practical consequence is that the **exploration** EM methods — **VLF**, **time-domain** (TDEM, SIROTEM, ZTEM), **magnetotellurics** and **controlled-source** EM — are chosen by **frequency** to place the target inside the skin depth, and that the **magnetotelluric** method, which uses natural fields at 0.001–10 000 Hz, is the only EM method that reaches the **middle and lower crust** in conductive terrain. The same square-root law governs the **borehole** logging tools, the **through-casing** water-flow measurements, and the **deep** geoelectric sounding of fault zones for fluid.
:::

::: example Resistivity and induced polarisation {#ex-resistivity}
A Wenner four-electrode sounding with an electrode spacing $a = 10\ \mathrm{m}$ injects $I = 100\ \mathrm{mA}$ and measures $\Delta V = 25\ \mathrm{mV}$. Find the apparent resistivity. A second measurement on the same array, using the **induced-polarisation** protocol, gives a chargeability of $42\ \mathrm{mV\,V^{-1}}$. Interpret the pair, and state what the method cannot tell you.
::: solution
For a Wenner array the geometric factor is $k = 2\pi a$, so
$$
\rho_{\mathrm{a}} = \frac{2\pi a\,\Delta V}{I} = \frac{62.8\times0.025}{0.100} = 15.7\ \Omega\,\mathrm{m}.
$$
A resistivity of $16\ \Omega\,\mathrm{m}$ at 10-m depth is **low**, and the low values of nature are few: **saline** or **clay-rich** material, **graphite**, **sulphide** minerals, or **salt**. The **chargeability** of $42\ \mathrm{mV\,V^{-1}}$ discriminates: **clay** and **saline water** are **non-chargeable** (1–10 mV V⁻¹), whereas **disseminated** and **massive sulphides** charge strongly (30–300 mV V⁻¹), because the sulphide grains are **electronic** conductors polarising at their **electrolyte** interface. The pair therefore indicates **sulphide mineralisation** rather than clay or brine.

What the method **cannot** tell you is the **metal**, the **grade**, the **texture** or the **depth** without more work. Chargeability scales with the **surface area** of the sulphide, so 2 per cent **disseminated** chalcopyrite charges as strongly as 50 per cent **massive** chalcopyrite, and a **core** or **borehole** measurement is required to convert chargeability to **grade**. The **depth** of investigation of a single Wenner array is about $a$, so a **sounding** — a sequence of arrays with increasing $a$ — or a **tomography** line is required for a depth section, and the inverse problem of resistivity is **strongly** non-unique: a **thin** conductive layer at 10 m and a **thick** one at 30 m give indistinguishable soundings unless the survey is **laterally** dense.

The **failure mode** that has destroyed more exploration budgets than any other is the **graphitic** or **sulphidic** **shale** host. A carbonaceous or pyritic metasediment has a resistivity of 1–10 Ω m and a chargeability of 20–60 mV V⁻¹, and produces a **geophysical** signature **indistinguishable** from an ore body — which is why the **McArthur River**, **Mount Isa** and **Sullivan** districts required **decades** of drilling to learn which conductors are ore, and why the modern practice is to **map** the **stratigraphic** position of every conductor and to weight the **prospectivity** by the **geological** setting rather than by the anomaly's **amplitude**.
:::
:::

::: example AVO and the fluid factor {#ex-avo}
A sandstone reservoir at 2500 m has $V_{\mathrm{p}} = 3200\ \mathrm{m\,s^{-1}}$ and $\rho = 2400\ \mathrm{kg\,m^{-3}}$ when water-saturated and $V_{\mathrm{p}} = 1900\ \mathrm{m\,s^{-1}}$, $\rho = 2300\ \mathrm{kg\,m^{-3}}$ when gas-charged. The overlying shale has $V_{\mathrm{p}} = 3000\ \mathrm{m\,s^{-1}}$ and $\rho = 2450\ \mathrm{kg\,m^{-3}}$. Find the normal-incidence reflection coefficient for the two cases and the ratio of the amplitudes.
::: solution
The normal-incidence coefficient is the contrast in **acoustic impedance** $Z = \rho V$,
$$
R = \frac{Z_{\mathrm{res}} - Z_{\mathrm{sh}}}{Z_{\mathrm{res}} + Z_{\mathrm{sh}}}, \qquad
Z_{\mathrm{sh}} = 2450\times3000 = 7.35\times10^{6},
$$
$$
R_{\mathrm{water}} = \frac{7.68 - 7.35}{7.68 + 7.35} = +0.022, \qquad
R_{\mathrm{gas}} = \frac{4.37 - 7.35}{4.37 + 7.35} = -0.254 .
$$
The **polarity reverses** and the amplitude grows by a factor of **11.6** — the **bright spot** and the **flat spot**, the two observations on which the hydrocarbon direct-detection method rests.

The physics is that **gas destroys the bulk modulus but not the density**: a brine-saturated sand has the shear modulus of its frame and the bulk modulus of water, whereas a gas sand keeps the frame's shear modulus and loses almost all of its resistance to compression, so $V_{\mathrm{p}}$ collapses while $V_{\mathrm{s}}$ is **unchanged**. The **fluid factor** and the **Gassmann** equations exploit exactly this, and the **Poisson-ratio** and **shear-impedance** inversions of **pre-stack** data are now the standard way to separate a **gas sand** from a **lithology** anomaly.

And the failure modes are exactly as instructive. A **lithology** bright spot — a **low-density** or **overpressured** shale, a **coal**, a **chalk** or a **basalt** flow top — has the same **large negative** coefficient, and the **only** discriminator is the **amplitude variation with offset**, which a gas sand shows and a lithology bright spot does not. A **gas** sand that is **thin** relative to a quarter wavelength gives a **tuned** amplitude that is a function of **thickness** as well as of **saturation**, so a bright spot can be **gas** in a **thin** bed and **water** in a **thick** one at the same amplitude. A **gas cloud** — free gas in a **shallow** unconsolidated sand — masks everything beneath it and has cost the industry more dry holes than any other seismic artefact. And a **flat spot**, the horizontal **bright** event that marks a **hydrocarbon contact**, is a **direct detection** of hydrocarbons and still does not tell you the **permeability**, the **connectivity** or the **pressure** — which is why the flat spot that looked like the end of exploration in 1980 is, in a **tight** or **fault-compartmented** reservoir, only the beginning.
:::
:::

::: warning A geophysical anomaly is never a deposit, and the drilling decision is a calculation in conditional probability
Every exploration failure of the last fifty years follows one of five patterns. **The anomaly is real and the target is absent**: a **conductor** that is a **graphitic** schist, a **gravity high** that is a **gabbro**, a **magnetic low** that is a **skarn** with no sulphides, a **bright spot** that is a **gas-charged** sand with no seal, or a **low-velocity zone** that is a **gas cloud** rather than a **reservoir**. **The target is present and the method cannot see it**: a **sulphide** body below a **conductive** overburden that shields the EM method to 30 m, a **kimberlite** beneath 200 m of **sandstone** whose density and susceptibility contrast have decayed with the cube of depth, a **thin** coal seam below the **resolution limit** of $\lambda/4$, or a **sub-vertical** ore lens whose **regional** gravity gradient masks it. **The anomaly is an artefact**: a **terrain** error in gravity where the **topographic** correction was made on a 50-m rather than a 1-m digital elevation model, a **cultural** anomaly in magnetics from a **fence**, a **pipeline** or a **buried culvert**, a **static-shift** in resistivity from **seasonal** moisture, or a **demagnetised** zone in a **drill** core. **The geology is right and the timing is wrong**: a **trap** that formed **after** the hydrocarbons had already escaped, a **source rock** that matured **before** the reservoir was deposited, or a **seal** that has been **breached** by the faulting that made the trap. **And the risk is mispriced**: a prospect with a 20 per cent chance of success and a 100-million-dollar well is worth drilling only if the **expected** value of the discovery exceeds the cost, and the arithmetic of **exploration** — the **success-case** net present value times the **probability of success** times the **probability of sale** — is the reason that **geophysical** surveys are **cheap** and **wells** are **expensive**, and the reason that a **prospect generator** with a 15 per cent success rate is **profitable** while one with 5 per cent is not, whatever the quality of its data.
:::

::: history
**Eötvös** (Eötvös) invented the **torsion-balance** gravimeter in 1890 and put it to work on the geodesy and the ore deposits of Hungary; **Thiel** (Thiel) made the first **commercial** static-gravimeter survey in 1929, and **Lacoste** (Lacoste) the **recording** gravimeter in the 1930s, after which gravity became the standard method for locating **salt domes**. **Schmidt** (Schmidt) invented the **fluxgate** magnetometer in 1936, **Bloch** (Bloch) discovered **nuclear induction** in 1946, and **Packard and Varian** (Varian) turned it into the **proton-precession** magnetometer in 1952; the first systematic **airborne** magnetic surveys were flown over **Canada** in the late 1940s and created the **national** aeromagnetic maps on which most subsequent mineral exploration rests. **Conrad and Marcel Schlumberger** (Schlumberger) made the first **electrical resistivity** survey in 1912 and the first **borehole electrical log** in 1927; **Wait** (Wait) established the theory of **induced polarisation** in 1959 and **Hohmann** (Hohmann) its forward modelling in the 1970s. **Karcher** (Karcher) recorded the first **reflection seismogram** in 1921 and **Jonassen** (Jonassen) and the **Geophysical Research Corporation** located the first **salt dome** by reflection in 1926; **Koenig** (Koenig) and the **German** and **Soviet** groups developed the **multiple-cover** idea in the 1920s–1950s, **Mayne** (Mayne) invented the **common-midpoint** method in 1962, the **digital** implementation of **CDP** stacking followed, **Claerbout** (Claerbout) developed **wave-equation migration** in 1971–1985, and **Yilmaz** (Yilmaz) wrote the standard *Seismic Data Analysis* in 2001. **Vail, Mitchum and the Exxon school** (Vail) founded **seismic stratigraphy** in 1977, **Taner** (Taner) the **seismic attribute** method, **Zoeppritz** (Zoeppritz) wrote the equations of elastic reflection in 1919, and **Ostrander** (Ostrander) turned them into the **AVO** method in 1984. **Telford, Geldart and Sheriff** (Telford) wrote the standard *Applied Geophysics* in 1976.
:::
## Where this leads

The gravity method rests on the theory of [[geophysics/gravity-isostasy]] and the seismic method on [[geophysics/elastic-waves]], the magnetic method on [[geophysics/geomagnetism]] and [[geophysics/palaeomagnetism]], the geothermal method on [[geophysics/heat-flow]], the petroleum traps on [[earth-resources/petroleum-systems]] and [[earth-resources/hydrocarbons-coal]], the ore-body physics on [[earth-resources/magmatic-hydrothermal]] and [[earth-resources/sedimentary-ores]], the resource and reserve arithmetic on [[earth-resources/resources-reserves]], the groundwater and contaminant applications on [[hydrology/groundwater-flow]], [[hydrology/contaminant-transport]] and [[earth-resources/groundwater-resources]], the LiDAR and radar terrain data on [[remote-sensing/radar-lidar]] and [[remote-sensing/thermal-microwave]], the fault and fracture analysis on [[structural-geology/fractures-faults]], and the seismic-hazard site work on [[natural-hazards/earthquake-hazard]].

::: quiz
A subsurface body produces a strong gravity high, a strong magnetic high, a very low resistivity and a high chargeability. What is the most likely target?
- [ ] A salt dome.
- [x] A massive sulphide body.
- [ ] A gas-charged sandstone.
- [ ] A granite batholith.
::: solution
Only a body that is at once **dense**, **magnetic**, **conductive** and **chargeable** fits, and that combination is a **massive sulphide** — pyrrhotite and magnetite supply the susceptibility, chalcopyrite and pyrite the conductivity and the chargeability, and the whole the density. A salt dome is **low** in density, magnetic susceptibility and chargeability; a gas sand is **resistive** and **slow**; a granite is **resistive**, **non-chargeable** and **light**.
:::
:::

::: summary
- Exploration geophysics reads four properties — density, susceptibility, seismic impedance and electrical resistivity (with chargeability as a fifth) — and the target must contrast with its host in at least one.
- Potential-field anomalies are fundamentally non-unique; the geology, the borehole and the other properties do the identifying.
- Reflection seismics images the subsurface but converts to depth only through the velocity, so depth error equals velocity error and check-shot data are worth their cost.
- The electromagnetic methods are governed by the skin depth, which scales as the square root of resistivity, so conductive overburden is the dominant limitation.
- Induced polarisation distinguishes sulphides from clays and brines, but chargeability measures surface area, not grade.
- The drilling decision is a calculation in conditional probability, and the geophysics changes the probability, never the answer.
:::

## Exercises

::: exercise Two-way time {level=1 check="2625"}
A reflector gives a two-way travel time of $1.500\ \mathrm{s}$ in a formation whose interval velocity is $3500\ \mathrm{m\,s^{-1}}$. Find its depth.
::: solution
$h = Vt/2 = 3500\times1.500/2 = 2625\ \mathrm{m}$. The factor of two is the most common error in the method, because the recorded time is a **two-way** time and the depth is a **one-way** distance.
:::
:::

::: exercise Vertical resolution {level=1 check="15"}
Find the theoretical vertical resolution of a seismic survey with an effective frequency of $50\ \mathrm{Hz}$ in a formation of velocity $3000\ \mathrm{m\,s^{-1}}$.
::: solution
$\lambda = V/f = 60\ \mathrm{m}$, and the resolution limit is $\lambda/4 = 15\ \mathrm{m}$. A **tuning** effect makes a bed of $\lambda/4$ give the **maximum** amplitude, so a **thin** bed cannot be measured below about 15 m except by its **amplitude**, which is why a 5-MHz **borehole** tool with a 0.3-m resolution is used to calibrate a 50-Hz **surface** survey.
:::
:::

::: exercise Skin depth {level=1 check="50"}
Find the skin depth of a 10-kHz electromagnetic field in a half-space of resistivity $100\ \Omega\,\mathrm{m}$.
::: solution
$\delta = 503\sqrt{\rho/f} = 503\sqrt{100/10{,}000} = 50\ \mathrm{m}$. A target at 100 m depth is at **two** skin depths, where the signal is $e^{-2} = 14$ per cent of its surface value, and at 200 m it is 1.8 per cent — which is why the **deep** EM methods use **magnetotelluric** frequencies of 0.001–1 Hz rather than 10 kHz.
:::
:::

::: exercise Bouguer anomaly of a salt dome {level=2 check="-12.6"}
Estimate the Bouguer anomaly of a salt dome modelled as a horizontal slab of salt ($2200\ \mathrm{kg\,m^{-3}}$) $1000\ \mathrm{m}$ thick replacing sediment of $2500\ \mathrm{kg\,m^{-3}}$.
::: solution
$\Delta g = 2\pi G\,\Delta\rho\, h = 2\pi\times6.674\times10^{-11}\times(-300)\times1000 = -1.26\times10^{-4}\ \mathrm{m\,s^{-2}} = -12.6\ \mathrm{mGal}$. A **12-mGal** low is one of the largest anomalies in exploration, which is why **salt** has been found by gravity for a century — and why the **Gulf of Mexico**, the **North German** and **Dutch** basins and the **South Atlantic** pre-salt were mapped by it.
:::
:::

::: exercise Magnetic anomaly {level=2 check="995"}
A magnetite-rich lens of volume $2.5\times10^{5}\ \mathrm{m^{3}}$ and susceptibility $0.5$ SI lies with its centre at 100 m depth. Estimate the **vertical-field** anomaly directly above it in a field of $50\ \mu\mathrm{T}$.
::: solution
The induced magnetisation is $M = \kappa B_0/\mu_0 = 0.5\times50\times10^{-6}/(4\pi\times10^{-7}) = 19.9\ \mathrm{A\,m^{-1}}$, the dipole moment $m = MV = 4.97\times10^{6}\ \mathrm{A\,m^{2}}$, and the vertical anomaly of a dipole directly overhead is
$$
\Delta Z = \frac{\mu_0}{4\pi}\frac{2m}{z^{3}} = 10^{-7}\times\frac{2\times4.97\times10^{6}}{10^{6}} = 9.9\times10^{-7}\ \mathrm{T} = 995\ \mathrm{nT}.
$$
An anomaly of 1000 nT is **fifteen times** the noise of a proton magnetometer and is unmistakable — and the same lens at 500 m depth gives $995/125 = 8$ nT, which is at the limit of detection against the **regional** magnetic field.
:::
:::

::: exercise The cost of a dry hole {level=2 check="0"}
A prospect costs 60 million dollars to drill, has a 15 per cent chance of holding oil, and a discovery is worth 400 million dollars in net present value. Find the expected value of drilling, and state what a 3-D seismic survey that raises the chance of success to 25 per cent is worth.
::: solution
The expected value is $0.15\times400 - 60 = 60 - 60 = 0$ million dollars — the prospect is **marginally** economic. Raising the chance to 25 per cent gives $0.25\times400 - 60 = +40$ million, so the **information** is worth **40 million dollars**, and a 3-D seismic survey costing 10 million is a **tenfold** return.

This is the whole economics of exploration geophysics in one line: **a survey is worth what it changes in the probability of success, times the value of the discovery**. It explains why **3-D** seismic is drilled against, why **time-lapse** seismic is used for **production**, and why a survey that leaves the probability **unchanged** — because the target has no contrast in the property measured — is worth **nothing** however good its data.
:::
:::

::: exercise Velocity analysis and the spill point {level=3 check="33"}
A prospect's crest is at a two-way time of $1.200\ \mathrm{s}$ and its **spill point** 200 ms deeper, in a formation whose velocity is taken as $3300\ \mathrm{m\,s^{-1}}$. If the true velocity is 10 per cent higher, find the depth error at the crest and the error in the **closure** (the crest-to-spill depth difference).
::: solution
The crest depth is $3300\times1.200/2 = 1980\ \mathrm{m}$, and at the 10 per cent higher velocity it is $2178\ \mathrm{m}$ — an error of **198 m**. The **closure**, however, is
$$
\Delta h = \tfrac{1}{2}V\,\Delta t = 0.5\times3300\times0.200 = 330\ \mathrm{m},
$$
and at the higher velocity $363\ \mathrm{m}$ — an error of **33 m**, or 10 per cent.

The distinction is the most important in **prospect evaluation**. A **uniform** velocity error moves the **whole** structure **up or down** together and does **not** change the **closure**, so it does not change the **contingent resource** — unless the trap is **stratigraphic** or **tilted**, in which case the **spill point** moves **relative** to the crest. What a velocity error **does** change is the **depth** at which the well is drilled, and hence the **drilling cost**, the **pressure** prediction, and the **depth to the top** of the **source** and **reservoir** intervals — and a 200-m depth error at 2000 m is the difference between a **gas** window and an **oil** window in a **hot** basin.

The corollary is that **relative** depth conversion is far more robust than **absolute**, and that the correct way to state a prospect's depth is with its **uncertainty**: "the crest is at $2180 \pm 100\ \mathrm{m}$, the closure is $330 \pm 10\ \mathrm{m}$, and the resource is therefore insensitive to the velocity but the well plan is not."
:::
:::

::: exercise The non-uniqueness of a potential-field anomaly {level=3 check="6"}
A gravity high of 0.23 mGal is attributed to a massive sulphide lens of density contrast $1800\ \mathrm{kg\,m^{-3}}$. How much **gabbro**, of density contrast $300\ \mathrm{kg\,m^{-3}}$, would produce the same anomaly, and what **other** measurement settles the question?
::: solution
The anomaly is proportional to $\Delta\rho\, V$, so the gabbro must have a volume greater by the ratio of the contrasts,
$$
\frac{1800}{300} = 6 .
$$
Six times the volume — a body of the same **shape** but 1.8 times the linear dimensions — produces the **same** anomaly, and the **wavelength** difference that distinguishes them is degraded by depth and noise, so at 400 m depth the two are **not** separable from the surface.

The settling measurements, in order of decisiveness, are a **borehole density** or **downhole gravity** measurement, which measures $\rho$ **directly** and separates 4500 from 3000 kg m⁻³ immediately; a **borehole** or **surface** **magnetic** measurement, since a gabbro is **moderately** magnetic and a pyrite-rich sulphide is not unless it carries magnetite; a **magnetotelluric** or **controlled-source** EM measurement, since a massive sulphide is **ten to a hundred times** more conductive than any silicate rock; and **geochemistry** — a **soil**, **regolith** or **ground-water** geochemical anomaly over the conductor, which is the method that found most of the world's buried ore.

The general lesson is the **cube-and-square** rule of applied geophysics: the **volume** of a body that can be hidden at a given depth grows as the **cube** of its depth, so the **depth** of a survey's outermost ring of drill holes is the parameter that most controls the **risk** of a missed discovery — and the reason that **deep** drilling, not better **processing**, is what has found every **giant** deposit of the last thirty years.
:::
:::
