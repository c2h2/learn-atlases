An earthquake is a shear crack a few metres to a few tens of metres wide that propagates for kilometres or hundreds of kilometres in tens of seconds, and everything about it — its size, its radiation, its hazard and its tectonic meaning — follows from three numbers: the **area** that slipped, the **slip** and the **rigidity** of the rock. The discipline of earthquake source physics is the extraction of those numbers, and of the **focal mechanism** that says which way the fault moved, from seismograms recorded thousands of kilometres away.

## Moment, magnitude and the geometry of slip

::: definition Seismic moment and magnitude {#def-moment}
An earthquake is modelled as a **double couple**: two equal and opposite force couples with no net force or torque, which is the only body-force system whose radiation pattern has the observed **four-quadrant** first-motion pattern. Its size is the **seismic moment**
$$
M_0 = \mu\, \bar{D}\, A ,
$$
where $\mu$ is the rigidity across the fault (30–50 GPa in the crust), $\bar{D}$ the **average** slip and $A$ the **area** of the slipping surface. The **moment magnitude** is
$$
M_{\mathrm{w}} = \tfrac{2}{3}\left(\log_{10} M_0 - 9.1\right), \qquad M_0\ \text{in}\ \mathrm{N\,m},
$$
constructed so that $M_{\mathrm{w}}$ agrees with the older local and surface-wave magnitudes in the range where those were calibrated and so that it **does not saturate**. The three scales differ in what they measure and in where they fail: $M_{\mathrm{L}}$ (Richter) saturates above about 6.5 because it is read from a 1-Hz amplitude, $M_{\mathrm{S}}$ saturates near 8.0–8.2 because a fault longer than about 200 km radiates most of its energy **below** the 1-Hz period at which $M_{\mathrm{S}}$ is defined, and $M_{\mathrm{w}}$ is unbounded because it is a **measurement of the source** rather than of a wave amplitude. The consequences are historical and practical: the 1960 Chile and 1964 Alaska earthquakes were **understated** by $M_{\mathrm{S}}$ by 0.5 to 1.0 magnitude units, and the entire **seismic-hazard** extrapolation for subduction zones depends on using $M_{\mathrm{w}}$.

The scaling follows from the definition. One magnitude unit multiplies the **moment** and the **radiated energy** by $10^{1.5} = 31.6$, and, at constant stress drop, the **fault area** by $10$, the **fault length** and **slip** by $10^{1/3} = 2.15$, and leaves the **rupture duration** proportional to $10^{1/3}$ as well. These are the numbers behind every statement of the form "a magnitude 8 is thirty times bigger than a magnitude 7", which is true of **energy** and false of **damage**, of **fault length** and of **duration**.
:::

::: definition The focal mechanism {#def-focal}
First motions read from a network of stations divide the **beachball** — the lower-hemisphere stereonet of the focal sphere — into four quadrants of compression and dilation separated by two **nodal planes**, across which the radiated P radiation changes sign. The two planes are the **fault plane** and the **auxiliary plane**, and seismology alone **cannot** tell them apart: they are orthogonal and geometrically equivalent. The choice is made from **geology** — the strike of the mapped fault, the region's stress field, the depth — and a focal mechanism published without the geological choice stated is incomplete. The three end-member geometries and their **rake** $\lambda$ (the angle of slip measured in the fault plane from the strike):
$$
\begin{array}{l|ccc}
\text{type} & \text{rake} & \text{typical dip} & \text{setting} \\ \hline
\text{strike-slip} & 0 \text{ or } 180^\circ & 90^\circ & \text{transform, ridge transform} \\
\text{thrust (reverse)} & +90^\circ & 10\text{--}45^\circ & \text{subduction, collision} \\
\text{normal} & -90^\circ & 45\text{--}60^\circ & \text{rifts, extensional margins} \\
\text{oblique} & \text{intermediate} & \text{varies} & \text{most real faults}
\end{array}
$$
The **P axis** (compression) and **T axis** (tension) bisect the compressional quadrants and are at $45^\circ$ to both nodal planes; under the **Anderson** theory of faulting the P axis is identified with $\sigma_1$ and the T axis with $\sigma_3$, which is the basis of the entire field of **regional stress inversion** from focal mechanisms. A **centroid moment tensor** or **regional moment tensor** inversion goes further and returns the full symmetric tensor, whose **non-double-couple** component (the **isotropic** and **compensated linear vector dipole** parts) records volumetric change — explosion, collapse, magma injection, or a **trans-tensile** component in a fluid-driven swarm.
:::

::: example Moment, slip and magnitude from the field {#ex-moment}
The 2011 Tōhoku earthquake ruptured a fault plane of about $450 \times 200\ \mathrm{km}$ with an average slip of $12\ \mathrm{m}$ at a rigidity of $50\ \mathrm{GPa}$. Find the seismic moment, the moment magnitude, and the average slip that would be required if the rupture had been confined to $150 \times 150\ \mathrm{km}$.
::: solution
$$
M_0 = \mu \bar{D} A = 5.0\times10^{10} \times 12 \times (450\times10^{3}\times200\times10^{3})
    = 5.0\times10^{10}\times12\times9.0\times10^{10} = 5.4\times10^{22}\ \mathrm{N\,m},
$$
$$
M_{\mathrm{w}} = \tfrac{2}{3}\left(\log_{10}5.4\times10^{22} - 9.1\right)
   = \tfrac{2}{3}(22.73 - 9.1) = 9.1 .
$$
For the smaller area, $A' = 2.25\times10^{10}\ \mathrm{m^2}$, the same moment requires
$$
\bar{D}' = \frac{M_0}{\mu A'} = \frac{5.4\times10^{22}}{5.0\times10^{10}\times2.25\times10^{10}} = 48\ \mathrm{m}.
$$
A mean slip of 48 m over a 150-km patch is not impossible — the **maximum** slip in the Tōhoku rupture reached 50 m — but a **mean** of 48 m over a 150-km patch would require an implausibly uniform giant-slip patch, and the geodetic and tsunami data independently require the **large** area. This is the reason the Tōhoku magnitude was revised upward within days: the **tsunami** height and the **GPS** displacements both scale with $M_0$ and both required a moment near $4$–$6\times10^{22}\ \mathrm{N\,m}$, whereas the $M_{\mathrm{S}}$ of 8.0 announced within an hour implied only $1\times10^{22}$.

The three-way consistency of **geodesy** (the GPS field and InSAR), **tsunami** (the wave heights and their travel times) and **seismology** (the moment tensor and the source time function) is the modern standard for a great earthquake, and each of the three is **blind** in a way the others are not: geodesy cannot resolve the **timing**, the tsunami cannot resolve the **depth**, and the seismogram cannot resolve the **largest wavelengths** of slip on a fault that ruptured slower than the corner frequency. The 2004 Sumatra and 2011 Tōhoku events each required all three, and in both the initial seismic estimate was **too small** because the long-period, slow-slip component was cut off by the bandwidth of the routine moment-tensor processing.
:::
:::

::: widget plot
f: 1/(1+(x*x))
x: 0.05, 4
y: 0, 1.05
labels: |u(f)|
caption: The **Brune $\omega^2$ source spectrum** $|u(f)| \propto [1+(f/f_c)^2]^{-1}$ plotted against frequency in units of the **corner frequency** $f_c$. The spectrum is **flat** below $f_c$ — the **low-frequency plateau** from which the seismic moment is measured, since it depends only on $M_0$ and not on the rupture details — and falls as $f^{-2}$ above it. The corner frequency is set by the **source radius**, $r = 0.37\,\beta/f_c$, and the **stress drop** follows from the moment and the radius together, $\Delta\sigma = 7M_0/(16\pi r^3)$. The whole of quantitative source physics is this: **the low-frequency level gives the moment and the corner frequency gives the size**, and their ratio gives the stress drop, which is the one source parameter that carries information about the **fault's strength**.
:::

## Statistics, budgets and the size of the largest earthquake

::: definition The Gutenberg–Richter law {#def-gr}
The number of earthquakes exceeding magnitude $M$ in a region over a time $T$ follows
$$
\log_{10} N(\geq M) = a - bM ,
$$
where $a$ measures the **seismicity rate** and $b$ the **relative proportion** of large to small events. The **b-value** is remarkably universal: $b = 1.0 \pm 0.1$ for most tectonic regions, **lower** ($0.6$–$0.8$) for subduction-zone thrust earthquakes and for the largest events, and **higher** ($1.2$–$1.8$) for volcanic and fluid-driven swarms, where the stresses are small and the fault population is not critically stressed. The physical interpretation, due to **Kanamori**, **Aki**, **Mogi** and later **Turcotte**, **Scholz** and the **criticality** school, is that a crust near the athermal frictional strength is a **self-organised critical** system whose earthquake population is a scale-free power law — and the corollary that there is **no characteristic magnitude** and no upper limit **in the statistics**, only in the **physics** of the fault.

The two limits on the largest earthquake are geometric and mechanical. **Geometric**: the largest event on a fault is bounded by the fault's **area**, and since $M_0 = \mu D A$ and $D$ is bounded by the fault **width** (about 15 km in the brittle crust, more in a cold subducting slab), the maximum magnitude on a fault of length $L$ is
$$
M_{\mathrm{w,max}} \approx \tfrac{2}{3}\log_{10}\left(\mu\, \beta_w L^{2}\right) - 9.1/1 \quad\text{with } \beta \sim 10^{-5}\text{--}10^{-4},
$$
which, with $D/W \approx 3\times10^{-5}$ to $10^{-4}$, gives $M_{\mathrm{w}} \approx 7.0$ for a 100-km fault and $M_{\mathrm{w}} \approx 9.2$ for a 1000-km subduction segment. **Mechanical**: the **moment budget**, in which the long-term moment **release rate** must equal the moment **loading rate** $\dot{M}_0 = \mu A V$ supplied by the plate motion, so that a segment that has not ruptured for a time longer than its recurrence interval is **loading** and one that has ruptured more often than the budget allows is **creeping**.
:::

::: example A moment budget and the largest earthquake {#ex-budget}
A subduction segment $1000\ \mathrm{km}$ long and $100\ \mathrm{km}$ wide converges at $50\ \mathrm{mm\,yr^{-1}}$ with a rigidity of $30\ \mathrm{GPa}$. Find the tectonic moment loading rate, its moment-magnitude equivalent, and the mean recurrence interval of $M_{\mathrm{w}} 9.0$ earthquakes if the segment releases all its moment in such events.
::: solution
$$
\dot{M}_0 = \mu A V = 3.0\times10^{10} \times 1.0\times10^{11} \times 0.050 = 1.5\times10^{20}\ \mathrm{N\,m\,yr^{-1}} .
$$
Its magnitude equivalent is $M_{\mathrm{w}} = \tfrac{2}{3}(\log_{10}1.5\times10^{20} - 9.1) = 7.4$ — the segment produces a **magnitude 7.4 equivalent every year**, distributed over all its earthquakes. The moment of an $M_{\mathrm{w}} 9.0$ earthquake is $4.0\times10^{22}\ \mathrm{N\,m}$, so the recurrence interval is
$$
\frac{4.0\times10^{22}}{1.5\times10^{20}} = 270\ \mathrm{yr}.
$$
An $M_{\mathrm{w}} 8.5$ event ($1.3\times10^{22}\ \mathrm{N\,m}$) would recur every 85 yr on the same budget.

Three features of this arithmetic dominate seismic hazard. **The budget closes only if the largest events are included**: a segment whose small earthquakes release $1.5\times10^{19}\ \mathrm{N\,m\,yr^{-1}}$ — one tenth of the loading — is **aseismic** over 90 per cent of its area, either by **stable sliding** (creep) or by **slow slip**, and the seismic-hazard model built on the observed small-earthquake catalogue **underestimates** the hazard by a factor of ten. This is the **seismic versus aseismic coupling** problem, measured directly by **geodetic inversion** of the interseismic GPS and InSAR strain field, which shows that most subduction zones are **patchily** locked with coupling fractions of 0.2 to 1.0. **The recurrence is not periodic**: the actual intervals scatter by a factor of two or three about the mean, and the **Cascadia** segment, whose budget gives 200–500 yr for $M_{\mathrm{w}} 9$, has produced such events in AD 1700 and about 590, 1150 and 1700 years before it — a **clustered** rather than periodic sequence. **And the b-value extrapolation is dangerous**: extrapolating a $b = 1.0$ law from the observed $M 7$ rate to the $M 9$ rate underestimates the number of great events by a factor of about six, because the distribution **flattens** (b falls to 0.7) at the top, and a $b$ of 0.7 gives 0.4 rather than 0.06 events per thousand years.
:::
:::

::: example A focal mechanism from first motions {#ex-focal}
A network of stations records the following first motions of the P wave, given as the take-off angle from the vertical and the azimuth measured clockwise from north:
$$
\begin{array}{l|cccccccc}
\text{azimuth} & 0 & 45 & 90 & 135 & 180 & 225 & 270 & 315 \\ \hline
\text{at } 40^\circ & C & C & D & D & D & D & C & C \\
\text{at } 70^\circ & D & D & C & C & C & C & D & D
\end{array}
$$
Find the two nodal planes, the rake, and the fault type.
::: solution
The compressional and dilational quadrants alternate with azimuth at both take-off angles, and the **boundaries** between them — the **nodal lines** — fall near azimuths $22^\circ$–$202^\circ$ and $112^\circ$–$292^\circ$. On a lower-hemisphere equal-area net these two great circles are the two nodal planes, and their intersection is the **slip line** (the direction of motion of the hanging wall projected onto the fault).

Reading the pattern: compression at $0^\circ$–$45^\circ$ and $270^\circ$–$315^\circ$ at shallow take-off, and dilation at the same azimuths at steep take-off, means the **compression axis plunges gently toward the north-west**, and the **tension axis plunges steeply**. The P and T axes bisect the compressional quadrants at $45^\circ$ to both planes, so
$$
\text{P axis: } 337^\circ/15^\circ, \qquad \text{T axis: } 067^\circ/75^\circ .
$$
The two candidate fault planes are approximately **$N70^\circ$E, dipping $55^\circ$ to the south-east** and **$N20^\circ$E, dipping $60^\circ$ to the north-west**, and the rake is **negative** — the hanging wall moves **down** — because the T axis is steep and the P axis shallow, which is the geometry of **extension**.

The mechanism is therefore **normal faulting with a north-west–south-east extension direction**, and the choice between the two planes is made from the geology: if the mapped fault strikes north-east, the first plane is the fault; if the region's Quaternary extension direction is north-west–south-east, both planes are consistent with it and the **one with the dip closest to $60^\circ$** is preferred, because Byerlee friction and the **Anderson** theory predict a fault dip of about $60^\circ$ in a crust with a hydrostatic pore pressure and a dip of $55^\circ$–$65^\circ$ in general.

Three cautions complete the reading. **A single event's mechanism is not a stress measurement**: the fault plane is inherited, and an individual earthquake slips on a pre-existing structure whose orientation need not be the Andersonian optimum — the Basin and Range is full of **reactivated** low-angle normal faults whose mechanisms imply a stress field that could never have created them. **Ten mechanisms are the minimum** for a stress inversion, and the inversion must test whether a **single** stress tensor explains them (the **right** and **Angelier** methods) or whether the region is **heterogeneously** stressed. **And the quality of the mechanism depends on the **azimuthal coverage** of the network**: a mechanism from stations confined to a $90^\circ$ azimuth range has its **strike** poorly determined, and a substantial fraction of the earliest catalogued mechanisms have strikes uncertain by $30^\circ$.
:::
:::

::: definition Rupture dynamics, stress drop and directivity {#def-rupture}
A rupture propagates at a **Mode II crack speed** of $0.6$–$0.95\,V_S$, most commonly $0.7$–$0.8\,V_S$; above the **Rayleigh** speed $0.92\,V_S$ the crack **bursts** and radiates intensely, and **supershear** ruptures have been documented for the 2001 Kunlunshān, the 2002 Denali and the 2018 Palu earthquakes from the **Mach front** in the strong-motion records and from the **asymmetry** of the surface breaks. Two source parameters carry the mechanics. The **static stress drop**
$$
\Delta\sigma = \frac{7M_0}{16\pi r^3} \approx \frac{2\mu \bar{D}}{\pi W}
$$
is 1–10 MPa for most earthquakes, which is **small** compared with the absolute stress on a fault (tens to hundreds of MPa) and is the reason the **stress** hypothesis and the **frictional** hypothesis of earthquake mechanics both survive. The **radiated energy** $E_s$ and the **radiation efficiency** $\eta = E_s/(E_s + E_G)$, where $E_G$ is the fracture energy, are obtained by integrating the source spectrum; $\eta$ is 0.1–0.7, and the **apparent stress** $\tau_d = E_s/(D A)$ of 0.1–10 MPa is the dynamic counterpart of the stress drop. **Directivity** — the Doppler focusing of radiation in the direction of rupture propagation — makes the ground motion on the **along-strike** side of a fault two to four times that on the other, and is the reason the 1906 San Francisco, the 1999 İzmit and the 2023 Kahramanmaraş earthquakes did their worst damage at the **far end** of the rupture.
:::

::: example Corner frequency and stress drop {#ex-stressdrop}
An $M 6.2$ earthquake has a source spectrum with a corner frequency of $0.50\ \mathrm{Hz}$ in the S wave, recorded at a shear velocity of $3.5\ \mathrm{km\,s^{-1}}$. Find the source radius, the stress drop and the average slip, and comment on the result.
::: solution
The **Brune** source radius is
$$
r = \frac{0.37\,\beta}{f_c} = \frac{0.37\times3500}{0.50} = 2590\ \mathrm{m},
$$
the moment of an $M 6.2$ event is $M_0 = 10^{1.5\times6.2+9.1} = 4.0\times10^{18}\ \mathrm{N\,m}$, and the stress drop is
$$
\Delta\sigma = \frac{7M_0}{16\pi r^3} = \frac{7\times4.0\times10^{18}}{16\pi\times(2590)^3}
   = \frac{2.8\times10^{19}}{8.7\times10^{11}} = 3.2\ \mathrm{MPa}.
$$
For a circular fault of radius 2.6 km and area $2.1\times10^{7}\ \mathrm{m^2}$ the average slip implied by the moment is
$$
\bar{D} = \frac{M_0}{\mu A} = \frac{4.0\times10^{18}}{3\times10^{10}\times2.1\times10^{7}} = 0.064\ \mathrm{m},
$$
and the **displacement** estimator of the stress drop then gives
$$
\Delta\sigma = \frac{2\mu\bar{D}}{\pi r} = \frac{2\times3\times10^{10}\times0.064}{\pi\times2590} = 0.47\ \mathrm{MPa},
$$
a factor of **seven lower** than the spectral estimator. The two are not independent — the Brune model makes them algebraically identical — so the discrepancy measures how far the real source departs from the model.

The number is therefore **good to a factor of three at best**, and the reasons are worth knowing. The corner frequency is measured from a spectrum that must be **corrected for attenuation** ($t^*$), for the **site response** at each station and for the **free-surface** and **radiation-pattern** terms, and a 20 per cent error in $f_c$ is a **factor of 2.2** error in stress drop because $\Delta\sigma \propto f_c^3$. The Brune model assumes a **circular, single-corner, constant-stress-drop** source, whereas real faults are **elongate**, have **multiple asperities** and radiate at several corner frequencies. And $f_c$ **decreases** with magnitude as $M_0^{-1/3}$ only if the stress drop is constant; the observed scaling is close to that for $M < 7$ and shows a **fall** in $f_c$ (a **drop** in stress drop) for the largest events, which is one of the two or three robust results in the subject.

The **geological** significance is that a stress drop of a few MPa over a fault of tens of MPa absolute strength means an earthquake **does not** break the fault to its frictional strength, and that the **efficiency** of the process is low — most of the released energy goes into **fracture energy** and **heat**, not into ground motion. This is the observation that supports the **fracture-mechanics** rather than the **frictional-sliding** view of the earthquake source.
:::
:::

::: warning A magnitude is a number on a scale, not a property of the earthquake
Six confusions recur in every hazard assessment and every media report. **Magnitude saturation**: an $M_{\mathrm{S}}$ or $M_{\mathrm{L}}$ value for a great earthquake is **systematically too small**, by up to a full unit, and the initial announcement of a great subduction earthquake is **always** an underestimate because the routine processing is bandwidth-limited; the correct statement is that the magnitude is **preliminary** until the moment tensor is published. **b-value extrapolation**: the largest earthquake in a catalogue is **always** smaller than the largest earthquake the region can produce, and a hazard model built by extrapolating the observed maximum magnitude underestimates the hazard by a factor of two to ten; the **moment budget** and the **geology of the fault** bound the maximum, not the catalogue. **A focal mechanism is not a fault**: the two nodal planes are geometrically equivalent, and the choice between them is a **geological** interpretation; a stress inversion that uses the wrong plane rotates the inferred $\sigma_1$ by up to $90^\circ$, and a substantial fraction of published stress inversions do exactly that. **Aftershocks are not foreshocks**: the **Bakun–Bufe** and related "foreshock" statistics are all **retrospective**, and no reliable foreshock signature has been demonstrated for a mainshock of $M > 6$; the statement "the sequence is still in its aftershock phase" is a **probability statement**, not a prediction, and the probability of a larger event following a $M 6.5$ is a few per cent, not zero. **Intensity is not magnitude**: the Modified Mercalli intensity depends on **distance, depth, site geology, directivity and building type**, and a shallow $M 5$ beneath a city can produce intensity VIII while a subduction $M 8$ two hundred kilometres away produces VI; every damage claim that mixes the two is meaningless. **And the seismic moment is not the energy**: the ratio $E_s/M_0$ is $10^{-5}$ to $10^{-4}\ \mathrm{s^{-1}}$, so a great earthquake of moment $10^{23}\ \mathrm{N\,m}$ radiates only $10^{18}$ J of seismic energy — a thousand times less than the energy its **slip** releases in the gravitational and tectonic sense — and the "energy released by an earthquake" figures quoted in the popular literature are usually the **total** strain-energy release, of which a few per cent becomes seismic waves and the rest becomes heat.
:::

::: history
The **elastic-rebound** theory was established by **Reid** (Reid) in 1910 from the geodetic surveys published by **Lawson** (Lawson) and the State Earthquake Investigation Commission after the 1906 San Francisco earthquake. The first-motion method and the four-quadrant pattern are the work of **Byerly** (Byerly) in 1926, **Honda** (Honda) in 1931 and **Richter** (Richter) in 1938, and **Isacks, Oliver and Sykes** (Sykes) turned focal mechanisms into a **plate-tectonic** instrument in 1968. **Aki** (Aki) introduced the **moment tensor** in 1966 and the spectral corner-frequency method in 1967; **Kanamori and Anderson** (Kanamori) proved the **equivalence of the geodetic and seismic moment** in 1975, which is the theorem that makes the moment budget legitimate; **Hanks and Kanamori** (Kanamori) introduced $M_{\mathrm{w}}$ in 1979; **Brune** (Brune) published the $\omega^2$ source spectrum in 1970; and **Aki and Richards** (Aki) wrote *Quantitative Seismology* in 1980. **Gutenberg and Richter** (Gutenberg) established the frequency–magnitude law in 1944; **Burridge and Knopoff** (Knopoff) built the spring-block model in 1967; and **Kanamori** (Kanamori), **Mogi** (Mogi), **Bak, Tang and Wiesenfeld** (Wiesenfeld) and **Scholz** (Scholz) developed the criticality interpretation. **Pacheco, Scholz and Naber** (Scholz) established the **breakdown of self-similarity** for the largest events in 1992. **Kanamori** (Kanamori) and **Beroza** (Beroza) and **Archuleta** (Archuleta) developed the finite-fault inversion; **Burridge** (Burridge) and **Madariaga** (Madariaga) the dynamic rupture theory; **Andrews** (Andrews) the cohesion-weakening model; and **Bouchon and Vallée** (Bouchon) the full-waveform source inversions. The **global centroid moment tensor** catalogue is the work of **Dziewonski** (Dziewonski) from 1981 and of **Ekström, Nettles and the Harvard and Global CMT project** (Ekström).
:::

## Where this leads

The waves whose sources are described here are in [[geophysics/elastic-waves]] and [[geophysics/seismic-structure]], the faults that slip are in [[structural-geology/fractures-faults]] and [[structural-geology/shear-zones]], the stress field that drives them is in [[structural-geology/stress]] and [[geophysics/flexure]], the seismic hazard and the risk model are in [[natural-hazards/earthquake-hazard]] and [[natural-hazards/risk]], the tsunamis they generate are in [[natural-hazards/tsunamis]] and [[oceanography/waves-tides]], the interseismic strain accumulation and the viscoelastic relaxation that follow great earthquakes are in [[geophysics/flexure]] and [[geophysics/gravity-isostasy]], and the deep-focus earthquakes of subducted slabs are in [[physical-geology/plate-tectonics]] and [[geophysics/seismic-structure]].

::: quiz
A great subduction earthquake is announced at $M_S$ 8.0 within an hour and later revised to $M_w$ 9.1. Why?
- [ ] The initial network was too sparse.
- [x] $M_S$ is measured at 1 Hz and saturates for faults longer than about 200 km, which radiate mostly below 1 Hz.
- [ ] The rupture was supershear.
- [ ] The rigidity was underestimated.
::: solution
Surface-wave magnitude is calibrated on the amplitude of a 20-second surface wave, and a fault longer than about 200 km radiates most of its energy at **longer** periods than that, so the 20-second amplitude stops growing with moment and $M_S$ **saturates** near 8.0–8.2. Moment magnitude is measured from the **low-frequency plateau** of the dislocation spectrum, which is proportional to $M_0$ alone and does not saturate. The remedy — and the reason modern centres now publish $M_{\mathrm{w}}$ within minutes — is the **teleseismic body-wave** and **regional** moment tensor, and for great earthquakes the **W-phase** and **geodetic** moment.
:::
:::

::: summary
- Seismic moment is rigidity times area times slip, and moment magnitude is a logarithm of it; the scale does not saturate, the older ones do.
- A magnitude unit is a factor of 31.6 in moment and energy but only 2.15 in fault length and slip.
- First motions give two nodal planes and cannot choose between them; the choice is geological.
- The Gutenberg–Richter $b$-value is near 1.0 for most tectonic settings and the largest earthquake is bounded by the fault area and the moment budget, not by the catalogue.
- The corner frequency gives the source radius and, with the moment, the stress drop — a few MPa, which means an earthquake does not break the fault to its frictional strength.
- Directivity, site response and the difference between intensity and magnitude dominate what a given earthquake actually does to people.
:::

## Exercises

::: exercise Moment from fault dimensions {level=1 check="6.7"}
Find the seismic moment of a fault 20 km long and 12 km wide with 1.0 m of slip at $\mu = 50\ \mathrm{GPa}$, and its moment magnitude.
::: solution
$A = 2.4\times10^{8}\ \mathrm{m^2}$, $M_0 = 5\times10^{10}\times1\times2.4\times10^{8} = 1.2\times10^{19}\ \mathrm{N\,m}$, and
$M_{\mathrm{w}} = \tfrac{2}{3}(\log_{10}1.2\times10^{19} - 9.1) = \tfrac{2}{3}(19.08-9.1) = 6.7$.
:::
:::

::: exercise Energy per magnitude {level=1 check="31.6"}
By what factor does the radiated energy increase from $M 6.0$ to $M 7.0$?
::: solution
$10^{1.5} = 31.6$. The same factor applies to the **moment**; the **fault area** increases by $10^{1} = 10$ and the **slip** and **length** by $10^{1/3} = 2.15$ at constant stress drop. The often-quoted "thirty times more energy, ten times the amplitude" is right for energy and wrong for amplitude, which scales as the moment and hence also as 31.6 at the source but as $1/r$ with distance.
:::
:::

::: exercise Gutenberg–Richter {level=1 check="100"}
A region has $a = 5.0$ and $b = 1.0$. How many earthquakes of $M \geq 3.0$ per year?
::: solution
$\log_{10}N = 5.0 - 1.0\times3.0 = 2.0$, so $N = 100$ per year. The $a$-value is a **rate** and depends on the catalogue's completeness, so an $a$-value comparison between two regions is meaningless unless both catalogues are complete to the same magnitude.
:::
:::

::: exercise Return period {level=2 check="100"}
For the same region ($a = 5.0$, $b = 1.0$), find the mean recurrence interval of $M \geq 7.0$ earthquakes.
::: solution
$\log_{10}N = 5.0 - 7.0 = -2.0$, so $N = 0.01\ \mathrm{yr^{-1}}$ and the recurrence is **100 years**.
If the $b$-value is really 0.8 rather than 1.0, then $\log_{10}N = 5.0 - 0.8\times7.0 = -0.6$, $N = 0.25\ \mathrm{yr^{-1}}$, and the recurrence is **4 years**. A 20 per cent error in $b$ changes the $M 7$ recurrence by a factor of **twenty-five**, which is the single largest uncertainty in probabilistic seismic-hazard analysis.
:::
:::

::: exercise Slip from moment {level=2 check="11"}
An $M_{\mathrm{w}} 7.5$ earthquake ruptures 60 km by 20 km at $\mu = 30\ \mathrm{GPa}$. Find the average slip.
::: solution
$M_0 = 10^{1.5\times7.5+9.1} = 4.0\times10^{20}\ \mathrm{N\,m}$, $A = 1.2\times10^{9}\ \mathrm{m^2}$, and
$$
\bar{D} = \frac{4.0\times10^{20}}{3\times10^{10}\times1.2\times10^{9}} = 11\ \mathrm{m}.
$$
An average of 11 m with a maximum of perhaps 20 m is typical of an $M 7.5$, and the ratio of maximum to average slip of about 2 is a robust result of finite-fault inversions.
:::
:::

::: exercise Corner frequency {level=2 check="1.85"}
Find the corner frequency of a source of radius 700 m in a medium with $\beta = 3.5\ \mathrm{km\,s^{-1}}$.
::: solution
$f_c = 0.37\beta/r = 0.37\times3500/700 = 1.85\ \mathrm{Hz}$. Because $f_c \propto r^{-1}$ and $r \propto M_0^{1/3}$ at constant stress drop, the corner frequency falls as $M_0^{-1/3}$: from 1.85 Hz at $M 5$ to 0.86 Hz at $M 6$ and 0.40 Hz at $M 7$ — which is why the stress drop of **large** earthquakes must be measured on **broadband** and **near-source** instruments, and why most published stress drops for $M > 6$ are unreliable.
:::
:::

::: exercise A moment budget {level=3 check="310"}
A 500-km-long, 80-km-wide transform slips at $35\ \mathrm{mm\,yr^{-1}}$ with $\mu = 30\ \mathrm{GPa}$. Find the moment loading rate and the recurrence interval of $M_{\mathrm{w}} 8.5$ earthquakes if the fault is fully locked.
::: solution
$$
\dot{M}_0 = 3\times10^{10}\times(5\times10^{5}\times8\times10^{4})\times0.035
        = 3\times10^{10}\times4\times10^{10}\times0.035 = 4.2\times10^{19}\ \mathrm{N\,m\,yr^{-1}},
$$
and $M_0(M_{\mathrm{w}} 8.5) = 1.3\times10^{22}\ \mathrm{N\,m}$, so the recurrence is
$$
\frac{1.3\times10^{22}}{4.2\times10^{19}} = 310\ \mathrm{yr}.
$$
If the fault is only **60 per cent locked** — the geodetic value for much of the San Andreas — the recurrence lengthens to **520 years**, and if 20 per cent of the slip is released by **aseismic creep** and **slow-slip events** the recurrence lengthens further still. The point is that the recurrence interval of a great earthquake is **not** a property of the fault's geology alone but of its **coupling**, and that the coupling is measured by **geodesy**, not by the earthquake catalogue.
:::
:::

::: exercise Directivity and hazard {level=3 check="5"}
A rupture propagates at $0.8\,V_S$ along a 100-km fault at $V_S = 3.5\ \mathrm{km\,s^{-1}}$. Estimate the factor by which the ground velocity at the **along-strike** end exceeds that at the **up-dip** end, taking the directivity function to be $D = [1 - (V_r/V_S)\cos\theta]^{-1}$ evaluated at $\theta = 0$ and $\theta = 90^\circ$.
::: solution
At $\theta = 0$ (looking down the rupture), $D = [1 - 0.8]^{-1} = 5.0$; at $\theta = 90^\circ$, $D = 1$. The ratio is **5**, and the observed ground-velocity ratios in the near field of large strike-slip earthquakes are 2–4, the difference being that the point-source directivity function overestimates the effect for a rupture that is **finite** in extent and that **decelerates** at its end.

The hazard consequence is immediate and is routinely ignored. A **bidirectional** fault such as the Hayward or the North Anatolian can deliver its directivity pulse to **either** end depending on where it nucleates, and the **nucleation location** is unknowable in advance, so the hazard at **both** ends must be computed with the directivity term. A **unidirectional** fault such as a subduction megathrust that always nucleates at depth and always ruptures **up-dip** concentrates its pulse on the **shallow, landward** part of the margin, which is why the coastal ground motions in the 2010 Maule and 2015 Illapel earthquakes were so much larger than the **hazard maps** predicted. And because directivity is a **coherent, long-duration pulse** rather than broadband shaking, it does the most damage to **tall buildings** and **long-span bridges**, whose natural periods match the pulse — the mechanism of the 1985 Mexico City and the 2017 Mexico City damage, in which the dominant period of the lake-bed sediments and of the 55-storey buildings coincided.
:::
:::
