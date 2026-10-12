Every compass on Earth points along a field that is generated in a sphere of liquid iron 3480 km below the surface, and the field is the only direct evidence we have that the outer core is **convecting**. It is also the only geophysical field that reverses its own sign, that wanders by a degree a year, that has decayed by 5 per cent a century, and that leaves a 4-billion-year written record in the magnetic minerals of lava, sediment and clay. Geomagnetism is at once the most practical of the geophysical sciences — no navigation, no aviation, no mineral exploration, no smartphone map works without its models — and one of the least understood, because the **geodynamo** has never been reproduced in a laboratory and its governing equations cannot be solved at the Earth's parameters.

## The field and its description

::: definition The main field and the spherical harmonic expansion {#def-mainfield}
Outside the core the magnetic field is **potential**, so it is expanded in **spherical harmonics** as
$$
V(r,\theta,\phi) = a\sum_{n=1}^{N}\sum_{m=0}^{n}\left(\frac{a}{r}\right)^{n+1}\left[g_n^m\cos m\phi + h_n^m\sin m\phi\right]P_n^m(\cos\theta),
$$
with $a$ the reference radius, the **Gauss coefficients** $g_n^m$, $h_n^m$ determined from satellite and observatory data every five years by the **International Geomagnetic Reference Field**, and the degree $n$ separating the spatial scales: $n = 1$ is the **axial dipole**, $n = 2$–$3$ the **non-dipole** and **quadrupole** field, and $n > 14$ the **crustal** field. At the core–mantle boundary the spectrum is dominated by the dipole, whose coefficient is $g_1^0 = -29.6\ \mu\mathrm{T}$, and the dipole accounts for about **80 per cent** of the field's variance; the field is therefore, to first order, a **tilted geocentric dipole** whose axis is $9.6^\circ$ from the rotation axis and whose **magnetic moment** is
$$
m = \frac{4\pi a^3}{2\mu_0}\,|g_1^0| = 7.8\times10^{22}\ \mathrm{A\,m^2}.
$$
The **intensity** at the surface follows from the dipole geometry,
$$
F = F_{\mathrm{eq}}\sqrt{1+3\sin^2\lambda}, \qquad \tan I = 2\tan\lambda,
$$
rising from $30\ \mu\mathrm{T}$ at the magnetic equator to $60\ \mu\mathrm{T}$ at the magnetic poles, against an observed global range of $24$ to $68\ \mu\mathrm{T}$. At the **core–mantle boundary** the dipole field is $0.37\ \mathrm{mT}$, and the **root-mean-square** field in the core inferred from the observed secular variation and from the requirement of **magnetostrophic** balance is $2$–$5\ \mathrm{mT}$ — an order of magnitude larger than the surface field, because the small-scale core field is largely **cancelled** at the surface by the spherical-harmonic attenuation $(a/r)^{n+2}$.
:::

::: definition Secular variation, drift and the frozen-flux hypothesis {#def-secular}
The field changes on every timescale from milliseconds to millennia. The observed **secular variation** at the surface is about $60\ \mathrm{nT\,yr^{-1}}$, and its three dominant features are the **westward drift** of the non-dipole field at $0.2$–$0.3^\circ$ of longitude per year, the **decay and growth** of the axial dipole at about 5 per cent per century, and the **South Atlantic Anomaly** — a region of anomalously low intensity, currently $24\ \mu\mathrm{T}$, beneath the South Atlantic and southern South America, whose area has quadrupled since 1970 and which is the surface expression of a region of **reversed** or **weak** flux at the top of the core.

**Backus** (Backus) formulated the **frozen-flux hypothesis**, which states that because the **magnetic diffusivity** of liquid iron is only $\eta = 1/\mu_0\sigma \approx 0.8\ \mathrm{m^2\,s^{-1}}$ and the core's **conductivity** is $\sigma \approx 10^6\ \mathrm{S\,m^{-1}}$, the magnetic field is carried with the flow rather than diffusing through it, so the **flux** through a core-surface element is conserved. The hypothesis is the basis of every **core-flow inversion** from the secular variation, and its validity is measured by the **magnetic Reynolds number**
$$
Rm = \frac{VL}{\eta} = \frac{2\times10^{-4}\times2.2\times10^{6}}{0.8} \approx 550 ,
$$
for a core flow speed $V$ of $0.2\ \mathrm{mm\,s^{-1}}$ and a length $L$ of 2200 km. With $Rm \gg 1$ the field is indeed nearly frozen, and the **diffusion time** across the core,
$$
\tau_\eta = \frac{L^2}{\eta} = \frac{(2.2\times10^{6})^2}{0.8} = 6\times10^{12}\ \mathrm{s} = 190{,}000\ \mathrm{yr},
$$
is the time in which the field would **decay away** if the flow stopped. Since the field is at least **3.5 billion years** old, the dynamo has operated for $10^4$ diffusion times, and the geodynamo is therefore not a **fossil** field but a **self-exciting** one — the conclusion first drawn by **Larmor** (Larmor) in 1919.
:::

::: example The dipole moment and the field at the surface {#ex-dipole}
Find the equatorial and polar field strengths of a geocentric dipole of moment $7.8\times10^{22}\ \mathrm{A\,m^2}$ at the Earth's surface, the field at the core–mantle boundary, and the magnetic energy stored in the outer core if the mean internal field is $0.37\ \mathrm{mT}$ and again if it is $4\ \mathrm{mT}$.
::: solution
The equatorial field of a dipole is $B_{\mathrm{eq}} = \mu_0 m/(4\pi R^3)$:
$$
B_{\mathrm{eq}} = \frac{10^{-7}\times7.8\times10^{22}}{(6.371\times10^{6})^3} = \frac{7.8\times10^{15}}{2.586\times10^{20}} = 30.2\ \mu\mathrm{T},
$$
and the polar field is twice that, $60.4\ \mu\mathrm{T}$. At the core–mantle boundary the **dipole** field is
$$
B_{\mathrm{cmb}} = \frac{2\mu_0 m}{4\pi r_{\mathrm{cmb}}^{3}} = \frac{2\times7.8\times10^{15}}{(3.48\times10^{6})^3} = 370\ \mu\mathrm{T} = 0.37\ \mathrm{mT}.
$$
The magnetic energy is $E = \dfrac{B^2}{2\mu_0}\times\dfrac{4}{3}\pi r_{\mathrm{cmb}}^3$ with a core volume of $1.76\times10^{20}\ \mathrm{m^3}$:
$$
B = 0.37\ \mathrm{mT}: \quad E = \frac{(3.7\times10^{-4})^2}{2\times1.257\times10^{-6}}\times1.76\times10^{20} = 9.6\times10^{18}\ \mathrm{J},
$$
$$
B = 4\ \mathrm{mT}: \quad E = 1.1\times10^{21}\ \mathrm{J}.
$$
The two estimates differ by a factor of **115**, and the difference is the central quantitative uncertainty of dynamo theory.

The reason the internal field is expected to be much larger than the **surface-observed** dipole field is **cancellation**: the small-scale field generated by the turbulent core flow has a spherical-harmonic spectrum that is **peaked at high degree**, and each degree is attenuated at the surface by $(a/r)^{n+2}$, so a 4-mT field of degree 30 at the core–mantle boundary contributes essentially nothing at the surface. The **inference** of 2–5 mT comes from three independent arguments that agree: the **magnetostrophic** balance between the Coriolis, pressure-gradient and Lorentz forces required by the observed secular variation; the **ohmic dissipation** required to sustain the field against diffusion at the observed rate; and the **numerical dynamos**, which only reproduce the observed surface field when their internal field is 10–30 times the surface dipole.

The energy matters because it constrains the **power**. A 4-mT field stores $10^{21}$ J, and the **ohmic dissipation** of a field at the core's diffusivity is of order $B^2 U L/\mu_0$, which is $0.3$–$3\ \mathrm{TW}$, which is 2–20 per cent of the core's total heat loss. A 0.37-mT field would dissipate 100 times less and could be driven by a much weaker flow, so the internal field strength determines whether the dynamo is **energetically marginal** — which is the standard interpretation of why the field reverses so readily.
:::
:::

::: widget plot
f: 30*sqrt(1+3*sin(x*pi/180)*sin(x*pi/180))
x: 0, 90
y: 28, 62
labels: F\ (\mu T)
caption: The intensity of a geocentric axial dipole as a function of **magnetic** latitude, $\lambda$ in degrees, rising from 30 μT at the magnetic equator to 60 μT at the magnetic pole. The curve's shape is the reason the **inclination** of the field, given by $\tan I = 2\tan\lambda$, is the fundamental measurement of **palaeomagnetism** and of the **geocentric axial dipole** hypothesis: a sediment or lava whose remanence gives an inclination $I$ records a **palaeolatitude** $\tan\lambda = \tfrac{1}{2}\tan I$, and the whole of the apparent-polar-wander and plate-reconstruction argument rests on the observation that the time-averaged field is axial, geocentric and dipolar to within a few degrees. The observed surface intensities range from 24 to 68 μT rather than following the curve, and the departures are the **non-dipole** and **crustal** field — the South Atlantic Anomaly being the largest.
:::

## The geodynamo

::: definition The energy and entropy budget of the core {#def-dynamo}
A dynamo converts **mechanical** energy into magnetic field against ohmic decay, and the power must come from the core's own heat and buoyancy. The four candidate sources are
$$
\begin{array}{l|l|l}
\text{source} & \text{mechanism} & \text{fraction of the power} \\ \hline
\text{secular cooling} & \text{cooling of the core and the mantle} & 30\text{--}50\ \% \\
\text{latent heat} & \text{solidification of the inner core} & 10\text{--}20\ \% \\
\text{compositional convection} & \text{exclusion of light elements at the ICB} & 30\text{--}50\ \% \\
\text{radiogenic heating} & {}^{40}\mathrm{K}\ \text{or}\ {}^{41}\mathrm{K}\ \text{in the core} & 0\text{--}30\ \%
\end{array}
$$
The decisive constraint is **thermodynamic**, not magnetic: a dynamo requires a minimum **entropy production**, and **Nimmo, Roberts and Gubbins** (Nimmo) showed that the **core–mantle heat flow** must exceed a threshold of order $15$–$20\ \mathrm{mW\,m^{-2}}$ for a **compositionally** driven dynamo and $40$–$60\ \mathrm{mW\,m^{-2}}$ for a purely **thermal** one. The observed total core heat flow of $5$–$15\ \mathrm{TW}$ corresponds, over a core–mantle boundary area of $1.5\times10^{14}\ \mathrm{m^2}$, to $33$–$99\ \mathrm{mW\,m^{-2}}$, so the dynamo is **running but not comfortably** — and the **adiabatic** heat flow down the core's own geotherm, $4$–$6\ \mathrm{TW}$, is uncomfortably close to the threshold, which means that a large part of the core's heat loss is **not** available to run the dynamo.

The consequence is one of the most consequential inferences in the field. If the core's heat flow has been roughly constant, the entropy available to the dynamo was **lower** in the past because the core was cooler and the inner core smaller, and the dynamo could only have been **strong** for a limited time — the argument by which **Labrosse, Aubert and Poitou** (Labrosse) and **Driscoll** (Driscoll) dated the **nucleation of the inner core** at $0.5$–$1.5\ \mathrm{Ga}$, with recent estimates clustering near $0.5$–$1.0\ \mathrm{Ga}$. An inner core that young explains the **jump** in the palaeosecular-variation rate and in the palaeointensity near 1.0–1.5 Ga, and it means that the **Archaean** dynamo was **thermally** driven and much weaker than today's.
:::

::: definition Reversals, excursions and the polarity time scale {#def-reversals}
A **reversal** is a complete exchange of the magnetic poles; an **excursion** is a large, brief departure of the virtual axial dipole moment followed by a **return to the same polarity**. The record is kept in the **geomagnetic polarity time scale**, calibrated by radiometric ages of reversely and normally magnetised lavas and tied to the **marine magnetic anomaly** lineations, and its principal features are:
$$
\begin{array}{l|l|l}
\text{chron} & \text{age}\ (\mathrm{Ma}) & \text{note} \\ \hline
\text{Brunhes (normal)} & 0\text{--}0.78 & \text{the present chron; the Laschamp excursion at } 41\ \mathrm{ka} \\
\text{Matuyama (reversed)} & 0.78\text{--}2.58 & \text{includes the Jaramillo and Olduvai normal subchrons} \\
\text{Gauss (normal)} & 2.58\text{--}3.60 & \\
\text{Cretaceous Normal Superchron} & 121\text{--}83 & \text{38 Myr without a single reversal} \\
\text{Kiaman Superchron} & 318\text{--}299 & \text{20 Myr of reversed polarity}
\end{array}
$$
The **reversal rate** has varied by an order of magnitude, from about 0.2 per Myr during the superchrons to 4–5 per Myr in the last 1 Myr, and the **average** over the last 165 Myr is about 3 per Myr. The **transition** takes 1000–5000 years, during which the dipole moment falls to 10–20 per cent of its present value and the field becomes **multipolar**, and the **virtual axial dipole moment** during a reversal is indistinguishable from that during an excursion — the two differ only in whether the field recovers its original sign.

No mechanism has been demonstrated for **triggering** a reversal, and the **correlation** claimed between reversals and marine-extinction events, with large igneous provinces, and with the flood basalts of the Columbia River and Deccan has never survived a proper statistical test. What **is** established is that the reversal process is **intrinsic** to the dynamo: numerical dynamos at the lowest accessible magnetic Prandtl number reverse **spontaneously** without any external forcing, and their reversal frequency scales with the **electromagnetic inertia** of the tangent cylinder.
:::

::: example Why the field cannot be fossil, and what powers it {#ex-power}
The outer core has a mass of $1.9\times10^{26}\ \mathrm{kg}$ and a specific heat of $800\ \mathrm{J\,kg^{-1}\,K^{-1}}$. (a) Find the energy released by cooling it by 1 K and the time in which 10 TW of core heat flow would consume it. (b) If the core has lost heat at a mean 10 TW over 4.5 Gyr, find the total cooling this implies, and interpret.
::: solution
**(a)** The heat capacity is $Mc_p = 1.9\times10^{26}\times800 = 1.52\times10^{29}\ \mathrm{J\,K^{-1}}$, and 10 TW consumes it in
$$
\frac{1.52\times10^{29}}{1.0\times10^{13}} = 1.52\times10^{16}\ \mathrm{s} = 4.8\times10^{8}\ \mathrm{yr\ per\ kelvin}.
$$
**(b)** The total heat lost in 4.5 Gyr at 10 TW is
$$
4.5\times10^{9}\times3.16\times10^{7}\times1.0\times10^{13} = 1.42\times10^{30}\ \mathrm{J},
$$
which corresponds to a cooling of $1.42\times10^{30}/1.52\times10^{29} = 9.3\ \mathrm{K}$.

The interpretation is the whole of modern core energetics. A core that has cooled by only **9 K** since accretion is essentially **isothermal in time**, and its **secular cooling** therefore supplies almost none of the entropy the dynamo needs — the 10 TW of heat **flow** is not the same as 10 TW of **usable** power, because a core that is barely cooling is barely producing buoyancy. The remaining sources must therefore supply nearly all of the dynamo's power, and only two are available: the **latent heat** released as the inner core grows and the **gravitational energy** released as light elements — sulfur, silicon, oxygen, carbon or hydrogen — are **excluded** from the freezing iron and rise. Both require an **inner core**, and both are therefore **young**, which is the **Labrosse–Aubert–Poitou** and **Driscoll** argument for an inner core no older than 1–1.5 Ga.

The alternative escape routes have each been examined and each has a cost. A **radiogenic** core, with 1–2 per cent of the Earth's potassium-40, would supply ample power but requires the core-forming metal to have been **oxidised** enough to dissolve potassium, which the **iron-isotope** and **silicon-isotope** constraints on core formation make unlikely. A **hotter** core, 500–1000 K above the mantle, would have cooled fast enough early on to run a thermal dynamo for a billion years, but the **seismic velocity** and **density** of the inner core constrain its temperature to within 300–800 K of the mantle's. And a **thermally** driven Archaean dynamo requires a core–mantle heat flow of 40–60 mW m⁻², which the **mantle's** own thermal evolution permits only if the mantle was 200–300 K hotter than today — which it probably was, so the escape route is not excluded, only uncomfortable.

The **observation** that anchors all of it is the **3.5-billion-year** palaeomagnetic field recorded in barite and in komatiitic hematite, and the **3.45-Ga** detrital zircon record, both of which require a **magnetosphere** and therefore a **dynamo** — and both of which are contested on the ground that a **solar-wind** induced field or a **chemical** remanence could mimic them. The **2.5-Ga** and **1.9-Ga** palaeointensities are uncontested, and they establish a dipole moment within a factor of two of the present value by the Palaeoproterozoic.
:::
:::

::: example Spreading rate from a magnetic anomaly {#ex-spreading}
A marine magnetic anomaly profile across an intermediate-rate ridge places the Matuyama–Brunhes reversal boundary (0.78 Ma) at 35 km from the neovolcanic zone on each flank. Find the full spreading rate, and the width to be expected for the Olduvai normal subchron (1.95–1.78 Ma).
::: solution
The **half-spreading** rate is the distance divided by the age,
$$
u = \frac{35\ \mathrm{km}}{0.78\ \mathrm{Myr}} = 44.9\ \mathrm{km\,Myr^{-1}} = 44.9\ \mathrm{mm\,yr^{-1}},
$$
and the **full** spreading rate is $2u = 90\ \mathrm{mm\,yr^{-1}}$. The Olduvai subchron lasted $1.95 - 1.78 = 0.17\ \mathrm{Myr}$, so its band of normal polarity is
$$
0.17\times44.9 = 7.6\ \mathrm{km}
$$
wide on each flank, and appears as a **pair** of narrow normal-polarity bands straddling the axis.

The exercise contains the two traps that make marine magnetics subtle. **The width of an anomaly is a duration, not a reversal time**: a 7.6-km band records 170 kyr of **stable** normal polarity, and the **transition** itself, at 1–5 kyr, corresponds to 45–225 m of crust — far below the resolution of a ship-borne magnetometer, whose footprint is 100–500 m and whose **sampling** interval is typically 50–200 m. No marine survey has ever resolved a reversal transition, and every statement about the **duration** of a reversal comes from **land sections** and **sediment cores**. **And the anomaly is not the boundary**: what the magnetometer records is the **difference** between the field's intensity at the time of crustal formation and its present value, so a **slowly accreting** or **hydrothermally altered** crust gives a **weak or shifted** anomaly, and the **skewness** of the anomaly profile — its asymmetry about the axis — is the diagnostic of **oblique accretion** and of **along-axis spreading-rate variation**.

The reason the method transformed the earth sciences is that the anomaly sequence is a **tape recorder** of the reversal record at a **constant** rate. Once the polarity time scale was calibrated on land by potassium–argon ages, the anomaly sequence gave the **spreading rate of every ocean** from a single profile, and the **symmetry** of the sequence about the axis — recognised by **Vine and Matthews** (Vine) and independently by **Morley** (Morley) in 1963 — gave the **creation** of new crust at the ridge and hence the whole of plate tectonics. The modern **MORISMAC** and **SETA** databases and the **Marine Magnetic Anomaly Annotated** compilation contain the anomaly picks of 100 000 km of track and are the basis of every global model of past spreading rates and of true polar wander.
:::
:::

::: example A virtual axial dipole moment {#ex-vadm}
A lava of known age, erupted at a site of **palaeolatitude** 50°, gives a palaeointensity of $20\ \mu\mathrm{T}$. Find its **virtual axial dipole moment** and express it as a fraction of the present moment.
::: solution
The intensity of an axial dipole at magnetic latitude $\lambda$ is $B = B_{\mathrm{eq}}\sqrt{1+3\sin^2\lambda}$, so the field that the **present** dipole would have produced at this site is
$$
B = 30.2\sqrt{1 + 3\sin^2 50^\circ} = 30.2\sqrt{2.760} = 50.2\ \mu\mathrm{T}.
$$
The virtual axial dipole moment is the moment that, placed at the centre of the Earth with the present geometry, would give the **observed** intensity:
$$
\mathrm{VADM} = m\,\frac{B_{\mathrm{obs}}}{B_{\mathrm{model}}} = 7.8\times10^{22}\times\frac{20}{50.2} = 3.1\times10^{22}\ \mathrm{A\,m^2},
$$
or **40 per cent** of the present moment.

The quantity is called **virtual** for three reasons, and each is a caution. It assumes the field was an **axial** dipole, whereas the time-averaged field has a **non-axial** component of 10–20 per cent and a **non-dipole** component that at a single site can be 30 per cent of the total, so a single lava's VADM is uncertain by 20–30 per cent and a **palaeosecular-variation** average over 100 flows is required for a reliable site mean. It assumes the **palaeolatitude** is known, and if the only latitude estimate comes from the same site's **inclination** the two are **not independent** — the standard remedy is to use the **virtual dipole moment** computed from the **direction** as well, or to work only at **low-latitude** sites where the latitude term is small. And it assumes the **intensity determination is sound**, which for a **Thellier** measurement means passing the reversibility, the pTRM-check and the anisotropy tests, and for a **microwave** or **CO₂-iso-thermal** determination means a mineral assemblage free of **multi-domain** grains.

The number matters because the **global** average of such VADMs is the only record we have of the field's **strength** through time, and it shows three robust features: the moment has varied between 60 and 140 per cent of its present value over the last 200 kyr with no trend; it fell to 10–20 per cent during each of the last five reversals; and it was **systematically low**, at 30–50 per cent, throughout the **Cretaceous Normal Superchron**, which is the observation that links a **weak dipole** to a **superchron** and that makes the **Palaeoproterozoic** "forced reversal" debate — whether the Archaean field was dipolar at all — so hard to settle.
:::
:::

::: warning A magnetic measurement is a measurement of a vector, and most are not
Five errors account for most misinterpretation of palaeomagnetic and environmental magnetic data. **A remanence is not the field that formed it**: a rock carries a **remanent magnetisation** acquired by one of several mechanisms — **thermoremanence** in a cooling iron oxide, **detrital** alignment of grains at deposition, **chemical** growth in place, **viscous** acquisition over millions of years, and **anhysteretic** acquisition in a weak field — and the **stability** and the **blocking-temperature spectrum** distinguish them; a sediment whose "palaeomagnetic" direction is a **viscous** overprint acquired during the Brunhes records the **present** field, not the depositional one, and the test is a **thermal or alternating-field demagnetisation** component analysis, without which no palaeomagnetic result is publishable. **A declination is not a direction to the pole**: the field is **non-dipolar** at the surface by up to ±15°, and a single lava flow records the **instantaneous** field, whose departure from the geocentric axial dipole is only removed by **averaging over 10⁴–10⁵ years** — which a single flow, cooling in weeks, cannot do. **A palaeointensity needs a field-free cooling**: the Thellier method requires that the mineral acquire a **thermoremanence** on laboratory reheating, and if the mineral has **altered** on heating — which titanomagnetite nearly always does — the result is a **spurious** palaeointensity, and the standard **coefficient-of-variation**, **pTRM-check** and **anisotropy** tests reject 80–90 per cent of Thellier data. **A magnetic anomaly is not a lithology**: the susceptibility of a rock varies by six orders of magnitude, and a magnetic low can be a **demagnetised** sediment, a **reversed** dyke, a **serpentinised** peridotite or a **buried** channel, and the only discriminator is the **shape, wavelength and geometry** of the anomaly together with the geology. **And the field is not a compass for the climate**: the claimed correlations between the palaeointensity, the cosmogenic-nuclide production and the climate records are all **partly** mediated by the geomagnetic field's control of the cosmic-ray flux, and the field's own short-term variability is of the same order as the signal being sought, which is why the "geomagnetic forcing of climate" literature has produced no result that has survived.
:::

::: history
**Gilbert** (Gilbert) established that the Earth is a magnet in *De Magnete* in 1600; **Gauss** (Gauss) and **Weber** (Weber) made the first **spherical-harmonic** analysis of the field in 1839 and founded the **Göttingen Magnetic Association**, and **Sabine** (Sabine) and the **Royal Society's Global Magnetic Crusade** of the 1840s built the first global network of observatories. **Hudson** (Hudson) identified the long-period **secular variation** in 1849, **Schuster** (Schuster) proved in 1889 that the **daily** variation is **externally** (ionospherically) generated by his spherical-harmonic test, and the **westward drift** of the non-dipole field was established from the nineteenth-century observatory series in the 1950s. **Larmor** (Larmor) proposed the **self-exciting dynamo** in 1919, **Elsasser** (Elsasser) wrote down the magnetohydrodynamic equations of the core in 1939–1946, **Bullard and Gellman** (Bullard) showed in 1954 that a plausible flow could not amplify a field by more than a factor of a few — the **negative result** that discouraged the subject for a decade — and **Parker** (Parker) and **Steenbeck, Krause and Rädler** (Steenbeck) built the **mean-field** and **alpha-effect** dynamos in 1955–1966. **Backus** (Backus) formulated the **frozen-flux** hypothesis in 1958 and **Roberts and Scott** (Roberts) and **Hide** (Hide) the **magnetostrophic** and **geostrophic** theories of the core. **Blackett** (Blackett) proposed, and **Bullard, Irving and Runcorn** (Runcorn) disproved, the hypothesis that ferromagnetism of the whole Earth generates the field, in the work that founded **palaeomagnetism** and, with **Vine and Matthews** (Vine) and independently **Morley** (Morley), **plate tectonics**. **Cox and Dalrymple** (Dalrymple) and **McDougall** (McDougall) built the **geomagnetic polarity time scale** in 1963–1966 and **Heirtzler, Drake, Paton and the Lamont group** (Heirtzler) tied it to the **seafloor anomalies** in 1968. **Glatzmaier and Roberts** (Roberts) produced the first self-consistent three-dimensional **numerical dynamo** in 1995, and **Busse, Olson, Christensen, Aubert, Jones and Kuang** (Christensen) brought the simulations to the parameter regime where they reproduce the observed field, its secular variation and its reversals. **Gubbins, Roberts, Stevenson, Buffett, Nimmo, Labrosse, Aubert, Driscoll and Evans** (Stevenson) established the **energetic** and **entropy** constraints and the **age of the inner core**, and **Korte, Constable, Tauxe, McElhinny, Channell, Mazaud, Laj, Kent and Cande** (Constable) built the palaeomagnetic field models and the **PINT** and **geomag** palaeointensity databases.
:::

## Where this leads

The core whose convection generates the field is imaged seismically in [[geophysics/seismic-structure]] and described in [[physical-geology/earth-interior]], the rock magnetism and the polarity time scale are developed in [[geophysics/palaeomagnetism]], the mantle convection that controls the core's heat loss is in [[geophysics/heat-flow]], the field's shielding of a planetary atmosphere is in [[planetary-science/atmospheres]] and [[planetary-science/interiors]], the magnetic method in exploration is in [[geophysics/exploration]], the geomagnetic hazards to power grids and satellites are in [[natural-hazards/risk]] and [[planetary-science/formation]], and the palaeomagnetic evidence for plate tectonics is in [[physical-geology/plate-tectonics]].

::: quiz
The axial dipole moment has fallen by about 5 per cent per century since 1840. What does this predict?
- [ ] A reversal within a few centuries.
- [x] Nothing reliable — the dipole has oscillated many times without reversing.
- [ ] A permanent collapse of the magnetosphere.
- [ ] A proportional fall in the total magnetic energy of the core.
::: solution
The dipole moment has risen and fallen repeatedly over the last 2000 years, including a 35 per cent swing around the year 1000, without reversing; the present decay is within the range of past behaviour. Reversals are not predicted by the dipole's **trend** but by the growth of **reversed non-dipole flux** at the core–mantle boundary, which is not observable far enough ahead. And the total magnetic energy of the core is dominated by the **small-scale** internal field, which need not fall with the dipole at all.
:::
:::

::: summary
- The field is a tilted geocentric dipole to first order, with a moment of 7.8∘10²² A m² and a surface intensity of 30–60 μT.
- The core's magnetic diffusivity gives a diffusion time of 190 000 years, so a 3.5-Gyr-old field must be self-excited.
- The magnetic Reynolds number of the core is of order 500, which justifies the frozen-flux hypothesis and the core-flow inversions built on it.
- The internal field is probably 2–5 mT, an order of magnitude above the surface dipole, because small-scale field is cancelled at the surface.
- Secular cooling supplies little of the dynamo's entropy; latent heat and compositional convection require an inner core, and date its nucleation at 0.5–1.5 Ga.
- Reversals are intrinsic to the dynamo, occur 3–5 times per Myr on average, and have never been correlated with anything at all convincingly.
:::

## Exercises

::: exercise Dipole field {level=1 check="60"}
Find the polar field strength of a dipole whose equatorial field is 30 μT.
::: solution
The polar field of a dipole is twice the equatorial: 60 μT. The observed range at the ground is 24–68 μT, and the highest values are over the Canadian and Siberian magnetic anomalies where the **crustal** field adds to the core field.
:::
:::

::: exercise Inclination {level=1 check="63"}
Find the magnetic inclination at a magnetic latitude of 45°.
::: solution
$\tan I = 2\tan 45^\circ = 2$, so $I = 63.4^\circ$. The relation is the basis of the **palaeolatitude** equation $\tan\lambda = \tfrac{1}{2}\tan I$, and its sensitivity is greatest near the equator: a 1° error in $I$ at $I = 10^\circ$ is a 2° error in $\lambda$, and at $I = 70^\circ$ only 0.4°.
:::
:::

::: exercise Diffusion time {level=1 check="190000"}
Find the magnetic diffusion time across a 2200-km length scale at $\eta = 0.8\ \mathrm{m^2\,s^{-1}}$.
::: solution
$\tau = L^2/\eta = 4.84\times10^{12}/0.8 = 6.05\times10^{12}\ \mathrm{s} = 190{,}000\ \mathrm{yr}$. The observed **60-year** decay of the dipole is therefore **not** free diffusion — it is a **dynamo** process, and its rate is set by the flow, not by the diffusivity.
:::
:::

::: exercise Magnetic Reynolds number {level=2 check="550"}
Find $Rm$ for a core flow of $0.2\ \mathrm{mm\,s^{-1}}$ over 2200 km at $\eta = 0.8\ \mathrm{m^2\,s^{-1}}$, and state the criterion for dynamo action.
::: solution
$Rm = VL/\eta = 2\times10^{-4}\times2.2\times10^{6}/0.8 = 550$. Dynamo action requires $Rm$ above a **critical** value of order $10^1$–$10^2$, so the core is comfortably supercritical — but the **hydrodynamic** Reynolds number is $Re = VL/\nu \sim 5\times10^{3}$ with $\nu \sim 10^{-6}\ \mathrm{m^2\,s^{-1}}$, and the **magnetic Prandtl number** $Pm = \nu/\eta \sim 10^{-6}$ is six orders of magnitude below the smallest value any numerical dynamo has reached, which is the central difficulty of the subject.
:::
:::

::: exercise Reversal statistics {level=2 check="270"}
If reversals occur at a mean rate of 3.7 per Myr as a Poisson process, find the mean interval and the probability that no reversal occurs in a 200-kyr interval.
::: solution
The mean interval is $1/3.7 = 270\ \mathrm{kyr}$. The Poisson probability of zero events in $T = 200$ kyr is
$$
P(0) = e^{-3.7\times0.2} = e^{-0.74} = 0.48 .
$$
Nearly a **coin-toss**, which is the correct answer to the question "is it overdue for a reversal?" — the polarity chron length distribution is close to **exponential**, so the probability of a reversal in the next interval is **independent** of how long the present chron has lasted. The present Brunhes chron, at 0.78 Myr, is **not** "overdue" in any statistical sense, though it is longer than about 60 per cent of chronos.
:::
:::

::: exercise Core heat flow {level=2 check="66"}
Find the core–mantle heat-flow density for a total core heat loss of 10 TW, taking the core–mantle boundary radius as 3480 km.
::: solution
$A = 4\pi r^2 = 4\pi(3.48\times10^{6})^2 = 1.52\times10^{14}\ \mathrm{m^2}$, so
$$
q = \frac{1.0\times10^{13}}{1.52\times10^{14}} = 0.066\ \mathrm{W\,m^{-2}} = 66\ \mathrm{mW\,m^{-2}}.
$$
Against a minimum of 15–20 mW m⁻² for a compositionally driven dynamo and 40–60 for a thermal one, the present core is **above** both thresholds — but the **adiabatic** heat flow down the core's own gradient, 4–6 TW, is not available to do work, so the **usable** heat flow is 4–11 TW, or 26–72 mW m⁻², and the dynamo is **marginal** rather than comfortable.
:::
:::

::: exercise The energy of the field {level=3 check="1.1e21"}
Find the magnetic energy stored in the outer core if the mean internal field is 4 mT, and compare it with the kinetic energy of a core flow of 0.2 mm s⁻¹.
::: solution
With a core volume of $1.76\times10^{20}\ \mathrm{m^3}$,
$$
E_B = \frac{B^2}{2\mu_0}V = \frac{(4\times10^{-3})^2}{2\times1.257\times10^{-6}}\times1.76\times10^{20} = 1.1\times10^{21}\ \mathrm{J}.
$$
The kinetic energy of the mean flow, taking a core density of $1.1\times10^{4}\ \mathrm{kg\,m^{-3}}$, is
$$
E_K = \tfrac{1}{2}\rho U^2 V = 0.5\times1.1\times10^{4}\times(2\times10^{-4})^2\times1.76\times10^{20} = 3.9\times10^{17}\ \mathrm{J}.
$$

The magnetic energy is therefore **2800 times** the kinetic energy of the mean flow, which cannot be right for a **saturated** dynamo, and the resolution is that the two energies are compared at the wrong **scale**. The **equipartition** argument applies to the **flow and field at the same length scale**, and the field is dominated by **small scales** at which the flow is much faster than the 0.2 mm s⁻¹ mean. The standard estimate is that the **total** field energy is within one or two orders of magnitude of the **total** kinetic energy when both are integrated over all scales, and that the **large-scale** field that reaches the surface carries only $10^{-3}$–$10^{-2}$ of either — which is why the surface field is so weak, why the dynamo is so inefficient, and why the field reverses.
:::
:::

::: exercise The South Atlantic Anomaly {level=3 check="1.2"}
The intensity at the centre of the South Atlantic Anomaly has fallen from 24.0 to 22.6 μT between 1970 and 2020. Find the percentage fall per decade, and explain why the anomaly is **not** evidence that a reversal is imminent.
::: solution
The fall is $1.4/24.0 = 5.8$ per cent over 50 years, or **1.2 per cent per decade**.

Three reasons make it poor reversal evidence. The anomaly is a **non-dipole** feature, and the non-dipole field **migrates and decays** on a 300–1000-year timescale without any reversal: the anomaly of 1840, mapped by Gauss, lay over southern Africa and has drifted **westward** by 3° of longitude since, so the "growth" of the anomaly is in part its **motion** across the region being measured. The **global dipole** is what collapses in a reversal, and the dipole's rate of fall has been **constant** at 5 per cent per century since 1840 with no acceleration. And the **palaeomagnetic** record shows that the virtual axial dipole moment oscillated by 30–50 per cent throughout the last three chronos without reversing, so a 6 per cent fall over 50 years is **unremarkable**.

The anomaly does have a real consequence: at 22.6 μT the **inner radiation belt** dips to 200-km altitude over South America, so satellites passing through it are struck by **trapped protons** and must shut down their instruments — the reason the Hubble Space Telescope, the International Space Station and most Earth-observation missions lose several per cent of their observing time, and the reason single-event upsets in avionics are a **South Atlantic** design problem.
:::
:::
