A **pumping test** is the only geophysical-scale experiment that hydrogeology has: you take water out of the ground at a known rate, watch the level fall in the well and in its neighbours, and read from the shape of the fall the **transmissivity** and **storativity** of a body of rock that nobody has seen. Everything else — every core, every log, every grain-size analysis — measures a **sample**, and only the pumping test measures the **aquifer**. It is also the most misused measurement in the subject, because the equations are easy to apply and hard to apply **correctly**, and because the assumptions that make them work are **invisible** in the data.

## Aquifers and their storage

::: definition The four aquifer types and their rocks {#def-aquifer-types}
An aquifer is a body of rock that yields water usefully; an aquitard transmits it slowly; an aquiclude does not transmit it at all. The four flow systems have entirely different hydraulics, chemistry and vulnerability:
$$
\begin{array}{l|l|l|l}
\text{type} & \text{storage released by} & \text{response} & \text{typical rock} \\ \hline
\textbf{unconfined} & \text{draining the pores } (S_{\mathrm{y}} = 0.05\text{–}0.30) & \text{slow, large } \Delta h & \text{alluvium, dune sand, weathered rock} \\
\textbf{confined} & \text{depressurising } (S = 10^{-5}\text{–}10^{-4}) & \text{fast, small } \Delta h & \text{buried sandstone, basalt flows} \\
\textbf{leaky} & \text{both, plus vertical leakage} & \text{delayed, S-shaped on log-log} & \text{interbeded deltaic and till} \\
\textbf{perched} & \text{a local lens over a lens of clay} & \text{runs dry in drought} & \text{till, loess, colluvium}
\end{array}
$$
and the rock matters less than the architecture: a sandstone may be a world-class aquifer or a aquitard depending on its cementation and shale content, a limestone is an aquifer only where it is fractured or karstified, a basalt only where its flow tops, vesicular zones and contacts are developed, and a chalk almost always, because its porosity of 40 per cent is primary and its permeability is secondary from the flint bands and joints.

Karst is the extreme and the rule rather than the exception over 20 per cent of the emerged land surface. In a karst aquifer 90 per cent of the flow may travel in a few conduits whose diameters are metres and whose velocities are centimetres per second — a thousand times the matrix velocity — while the matrix holds 95 per cent of the storage. The consequences are total: Darcy's law fails in the conduits, a pumping test measures an average that describes nothing, a contaminant appears at a spring twelve hours after a spill ten kilometres away, and the only reliable characterisation is a tracer test with fluorescein, sulforhodamine or salt, a recovery measurement and a dilution analysis.
:::

::: definition Equilibrium well hydraulics: Thiem and Dupuit {#def-thiem}
For **steady** radial flow to a **fully penetrating** well in a **confined** aquifer of transmissivity $T$, integrating Darcy's law over the cylinder of radius $r$ gives the **Thiem** equation
$$
Q = 2\pi T\,\frac{h_{\mathrm{e}} - h_{\mathrm{w}}}{\ln(R/r_{\mathrm{w}})} = 2\pi T\,\frac{s_{\mathrm{w}}}{\ln(R/r_{\mathrm{w}})},
$$
and for an **unconfined** aquifer, with the **Dupuit** assumption of horizontal flow and a hydrostatic vertical gradient,
$$
Q = \pi K\,\frac{h_{\mathrm{e}}^{2} - h_{\mathrm{w}}^{2}}{\ln(R/r_{\mathrm{w}})} .
$$
Both contain the **radius of influence** $R$, which is **not** a property of the aquifer but of the **pumping rate** and the **duration**, and which is estimated empirically as $R = 10\,s_{\mathrm{w}}\sqrt{K}$ or $R = 3000\,s_{\mathrm{w}}\sqrt{T}$. Because the **logarithm** of $R$ appears in the denominator, so an error of a **factor of ten** in $R$ changes the predicted drawdown by only **15–20 per cent**, which is the reason equilibrium methods are **robust** for yield and **useless** for storage.

The **well loss** is the second correction. The head lost between the formation face and the pump is the sum of a **laminar** formation loss and a **turbulent** well loss,
$$
s_{\mathrm{w}} = B\,Q + C\,Q^{2},
$$
and the **specific capacity** $Q/s$ and the **well efficiency** — the ratio of the theoretical formation drawdown to the observed total — are read from a **step-drawdown test**. A well with an efficiency **below 70 per cent** is **poorly developed**, **gravel-packed** wrongly, or **encrusted**, and the **energy cost** of a low efficiency is not trivial: a well at 50 per cent efficiency wastes **half** its pumping energy in **turbulence at the screen**.
:::

::: definition The transient test: Theis, Cooper–Jacob and the type curve {#def-theis}
Real tests are **transient**, and the **Theis** (1935) solution for a fully penetrating well in an infinite confined aquifer is
$$
s(r,t) = \frac{Q}{4\pi T}\,W(u), \qquad W(u) = -\int_{-u}^{\infty}\frac{e^{-y}}{y}\,dy = -0.5772 - \ln u + u - \frac{u^{2}}{2\cdot2!} + \cdots, \qquad u = \frac{r^{2}S}{4Tt}.
$$
For $u < 0.01$ the series collapses to its logarithmic terms and gives the **Cooper–Jacob** straight line on **semi-log** paper,
$$
s = \frac{Q}{4\pi T}\ln\!\left(\frac{2.25\,T\,t}{r^{2}S}\right), \qquad
T = \frac{2.3\,Q}{4\pi\,\Delta s_{\text{per log cycle}}} = \frac{0.183\,Q}{\Delta s}, \qquad
S = \frac{2.25\,T\,t_0}{r^{2}},
$$
where $t_0$ is the intercept of the straight line with the zero-drawdown axis. The Theis type curve on log-log paper is used when $u > 0.01$, and the log-log plot of $s$ against $t$ is the diagnostic of the whole system: a unit slope at early time is wellbore storage, a half-slope is radial flow, a flattening is a boundary or recharge, a steepening is a no-flow boundary, and an S-shape on the derivative is leakage. That diagnostic — the Bourdet derivative plot — is the single most valuable tool in the subject and the one most often skipped.
:::

::: example A confined well's yield {#ex-thiem}
A confined aquifer has $T = 5\times10^{-3}\ \mathrm{m^{2}\,s^{-1}}$ and the radius of influence of a 0.15-m-radius well is estimated at 300 m. Find the discharge that produces a drawdown of $5\ \mathrm{m}$ at the well, and the drawdown at an observation well 60 m away.
::: solution
$$
Q = 2\pi T\,\frac{s_{\mathrm{w}}}{\ln(R/r_{\mathrm{w}})} = \frac{2\pi\times5\times10^{-3}\times5}{\ln(300/0.15)} = \frac{0.157}{7.60} = 0.0207\ \mathrm{m^{3}\,s^{-1}} = 21\ \mathrm{L\,s^{-1}},
$$
and the drawdown at radius $r$ is $s(r) = Q\ln(R/r)/(2\pi T)$, so at 60 m,
$$
s(60) = \frac{0.0207\times\ln(300/60)}{2\pi\times5\times10^{-3}} = \frac{0.0207\times1.609}{0.0314} = 1.06\ \mathrm{m}.
$$
The drawdown therefore falls from **5 m** at the well to **1.06 m** at 60 m and to **zero** at 300 m — a **logarithmic** cone of depression whose **slope** is steepest at the well, which is why **interference** between neighbouring wells is a **near-field** problem and why the **setback distance** between water-supply wells is set by the **local** gradient rather than by the radius of influence.

The **sensitivity** to $R$ is the instructive part. Raising $R$ from 300 m to 3000 m — a factor of ten — raises the denominator from 7.60 to 9.90 and **lowers** the predicted discharge by **23 per cent**. Since $R$ is **never** measured and is **always** estimated from an empirical formula whose scatter is a factor of three to ten, the **equilibrium** prediction of a well's yield is uncertain by **15–30 per cent** however well $T$ is known, which is why a **water-supply** design is based on a **pumping test** and not on a formula.

The **volume of the cone of depression** is the number that governs the **capture** of a contaminant or of a river's water. Integrating $s(r) = (Q/2\pi T)\ln(R/r)$ over the area gives
$$
V = \int_0^{R} 2\pi r\,s(r)\,dr = \frac{Q R^{2}}{4T} = \frac{0.0207\times9\times10^{4}}{4\times5\times10^{-3}} = 9.3\times10^{4}\ \mathrm{m^{3}},
$$
and the **capture zone** of the well extends to the **radius of influence** only in the **steady state**, which takes **years** to establish in a low-diffusivity aquifer.
:::
:::

::: widget plot
f: 0.1217*ln(0.1667*x)
x: 10, 10000
y: 0.02, 0.95
labels: s\ (\text{m})
caption: The **Cooper–Jacob** straight line for a $1\ \mathrm{L\,s^{-1}}$ test in a well 10 m from the observation point, with $T = 6.5\times10^{-4}\ \mathrm{m^{2}\,s^{-1}}$ and $S = 8.8\times10^{-5}$, plotted as drawdown against the **logarithm** of time. The **slope** is $Q/(4\pi T) = 0.122\ \mathrm{m}$ per log cycle and the **intercept** with the zero-drawdown axis gives $S$; the two numbers are the whole of the interpretation. The line is **straight** only where $u < 0.01$, which here means $t > 25$ minutes, and the **early** data that fall **below** the line are **wellbore storage** — the water drawn from **inside the well** rather than from the aquifer, which gives a **unit-slope** line on the log-log plot and which is the reason a **short** or **low-rate** test yields a **too-high** transmissivity. The **late** flattening, not shown, would signal a **boundary**: a **no-flow** boundary doubles the slope and a **constant-head** boundary (a river, a recharge boundary) **halves** it, and the **time** at which the departure begins gives the **distance** to the boundary from the **image-well** solution — which is how a pumping test **maps** a fault or a river that no borehole has reached.
:::

::: example A Cooper–Jacob pumping test {#ex-cooper}
A well is pumped at $1.0\ \mathrm{L\,s^{-1}}$ and an observation piezometer 10 m away records a drawdown that falls on a straight line on semi-log paper with a slope of $0.28\ \mathrm{m}$ per log cycle and an intercept $t_0 = 6\ \mathrm{s}$ on the zero-drawdown axis. Find $T$ and $S$, and check whether the Cooper–Jacob approximation is valid at the last observation time of 10 000 s.
::: solution
$$
T = \frac{2.3\,Q}{4\pi\,\Delta s} = \frac{2.3\times1.0\times10^{-3}}{4\pi\times0.28} = 6.5\times10^{-4}\ \mathrm{m^{2}\,s^{-1}},
$$
$$
S = \frac{2.25\,T\,t_0}{r^{2}} = \frac{2.25\times6.5\times10^{-4}\times6}{100} = 8.8\times10^{-5},
$$
and at $t = 10{,}000\ \mathrm{s}$,
$$
u = \frac{r^{2}S}{4Tt} = \frac{100\times8.8\times10^{-5}}{4\times6.5\times10^{-4}\times10^{4}} = 3.4\times10^{-4} \ll 0.01 ,
$$
so the approximation is **comfortably** valid. The storativity of $8.8\times10^{-5}$ is a **confined** value, and with an aquifer thickness of 40 m the specific storage is $2.2\times10^{-6}\ \mathrm{m^{-1}}$ — a **normal** number for a sandstone with clay interbeds.

The validity check at the earliest time is the one that catches errors. At $t = 10\ \mathrm{s}$ the same formula gives $u = 0.34$, which is far above 0.01, so the early points must be discarded — and the standard failure is to fit the straight line through a curve that includes them, which gives a too-shallow slope and a too-high transmissivity. The Theis type curve or the Bourdet derivative must be used when the test is short, the rate is low, or the observation is close.

The three assumptions that the arithmetic cannot see are the ones that matter. The aquifer is assumed homogeneous, isotropic and infinite, and a real one is layered, anisotropic and bounded; the well is assumed fully penetrating and of negligible diameter, and a real well is partially penetrating — which gives a too-low apparent $T$ at early time and a too-high apparent $S$ — and has a finite diameter whose storage dominates the first minutes; and the boundary is assumed absent, and a real aquifer has a fault, a river, a no-flow contact or a recharge area within a few hundred metres. The professional test therefore lasts 24 to 72 hours, is observed at two or more distances, and is followed by a recovery measurement — because the residual drawdown during recovery is a cleaner signal of the aquifer than the drawdown itself, since it is unaffected by fluctuations in the pumping rate.
:::
:::

::: example A step-drawdown test and the well efficiency {#ex-step}
A well gives a stabilized drawdown of $2.0\ \mathrm{m}$ at $10\ \mathrm{L\,s^{-1}}$ and $8.5\ \mathrm{m}$ at $30\ \mathrm{L\,s^{-1}}$. Fit $s_{\mathrm{w}} = BQ + CQ^{2}$ and find the well efficiency at the higher rate.
::: solution
Solving the two equations,
$$
2.0 = 10B + 100C, \qquad 8.5 = 30B + 900C
\quad\Longrightarrow\quad
C = 4.17\times10^{-3}\ \mathrm{m\,(L\,s^{-1})^{-2}}, \qquad B = 0.158\ \mathrm{m\,(L\,s^{-1})^{-1}},
$$
so at $30\ \mathrm{L\,s^{-1}}$ the **formation** (laminar) loss is $BQ = 4.75\ \mathrm{m}$ of the observed $8.5\ \mathrm{m}$, and the **efficiency** is
$$
E = \frac{BQ}{s_{\mathrm{w}}} = \frac{4.75}{8.5} = 56\ \text{per cent}.
$$
A well at 56 per cent efficiency is badly developed, poorly gravel-packed or encrusted: nearly half the available head is being lost in turbulence at the screen and in the pack.

The energy cost is the reason this matters commercially. Doubling the efficiency from 56 to 90 per cent at this rate reduces the drawdown by 3.2 m, which reduces the pump setting depth, the motor size and the annual electricity by roughly the same fraction of the lift — over a twenty-year well life, tens of thousands of dollars. The remedies are development by surging, air-lifting, back-washing and over-pumping until the turbidity falls; a gravel pack with a median grain size four to six times the d₅₀ of the aquifer; and, for encrustation, acid or polyphosphate treatment.

The interpretation caution is that $B$ and $C$ are not constants. $B$ rises as the aquifer's transmissivity is reduced by bridging or biofouling, and $C$ rises as the screen clogs and the velocity through the remaining open area increases; so a step-drawdown test repeated annually is the cheapest and most sensitive condition monitoring available for a water-supply well, and a well whose $C$ has doubled is telling you that it needs development long before its yield falls below the demand.
:::
:::

## Managing the resource

::: definition Yields, capture and managed recharge {#def-yields}
Three different quantities are all called "yield" and only one of them is useful. The safe yield of the early twentieth century was the maximum sustainable pumping inferred from the baseflow of springs and streams — a reasonable estimate that ignored the time to reach the new steady state, and which therefore licensed decades of mining before the deficit appeared. The sustainable yield is the recharge under the managed condition, and it is not a property of the aquifer but of the management: pumping captures water that would have discharged to a stream, a wetland or the sea, and the sustainable yield is therefore recharge plus the capture, which can be larger than the natural recharge — and can destroy the stream that the captured water sustained. The desired yield is a policy choice that trades the pumping against the dependent ecosystems, the subsidence, the intrusion and the cost.

Managed aquifer recharge (MAR) makes the capture deliberate. The methods are spreading and basin infiltration, soil-aquifer treatment of treated wastewater, aquifer storage and recovery (ASR) of fresh or treated water into a confined aquifer through a well, bank filtration beside a river, check dams, infiltration ponds and floodwater diversion of the kind practised in the San Joaquin Valley and the Ganges plain. MAR supplies perhaps 2 per cent of the world's groundwater augmentation but a large fraction of the drought resilience of California, Israel, Australia, India and the Netherlands, and its three limits are clogging by suspended solids, biofilm and gas, the quality of the recharged water, and the legal question of who owns the water once it is underground.
:::

::: example A karst tracer test {#ex-tracer}
$2.0\ \mathrm{kg}$ of fluorescein is injected into a swallow hole $8.4\ \mathrm{km}$ upstream of a spring. The tracer appears at the spring $14$ hours later, the breakthrough curve is approximately triangular with a base of $60$ hours and a peak concentration of $15\ \mu\mathrm{g\,L^{-1}}$, and the spring discharges $0.60\ \mathrm{m^{3}\,s^{-1}}$. Find the peak tracer velocity and the mass recovery, and interpret them.
::: solution
The peak velocity is
$$
v = \frac{8400\ \mathrm{m}}{14\times3600\ \mathrm{s}} = 0.17\ \mathrm{m\,s^{-1}} = 10\ \mathrm{m\,min^{-1}},
$$
and the recovered mass, taking the mean concentration of a triangle as half the peak, is
$$
M = \bar{C}\,Q_{\mathrm{spring}}\,t = 7.5\times10^{-3}\ \mathrm{g\,m^{-3}} \times 0.60\ \mathrm{m^{3}\,s^{-1}} \times 60\times3600\ \mathrm{s} = 972\ \mathrm{g},
$$
a recovery of 49 per cent.

A velocity of **$0.17\ \mathrm{m\,s^{-1}}$** is **fifty thousand times** the Darcy velocity of a good sand and gravel aquifer and is a **conduit** flow in an open channel of metres in diameter — which is why **Darcy's law does not apply**, why a **pumping test** in the same aquifer would return a **transmissivity** that describes nothing, and why the **recovery** of the tracer, not its **arrival**, is the informative measurement. A **49 per cent** recovery means **half** the dye went **somewhere else**: to an **unobserved** spring, to a **river**, to the **unexplored** branch of the conduit network, or into **storage** from which it will **elute** for weeks. In a **drinking-water** source that is the finding that matters, because it means a **contamination** at the swallow hole will appear at **more than one** receptor and **later** than anyone predicts.

The dispersion is the third measurement. A 60-hour base for a 14-hour first arrival means the conduit has substantial storage — side pockets, a perched section, a sump — that retards and broadens the pulse, and the ratio of the base to the arrival time is the standard index of it. A sharp breakthrough (a base of 20 hours) means a clean, fast conduit and a catastrophic vulnerability; a broad one means storage and a chronic exposure. And the recovery must be measured at every downstream receptor, because the missing fraction is not lost — it is somewhere with your name on it.

The method's limits are that it measures one injection, one season and one flow condition, and that a karst system's conduit network reorganises with flow: at low flow the tracer may go to spring A, at high flow to spring B, and the flood-time diversion is exactly when the contamination risk is greatest. A proper karst investigation runs ten tracers in three seasons, and the cost of doing so is trivial against the cost of a mis-sited wellhead.
:::
:::

::: warning A pumping test measures the aquifer between the well and the boundary, and the boundary is where the answer changes
Seven errors dominate the practice. The Cooper–Jacob line is fitted through wellbore storage: the first minutes of every test are dominated by the water drawn from inside the well, which gives a unit-slope line on log-log paper and a flat segment on semi-log, and a straight line fitted through it gives a transmissivity too high by a factor of two to ten — the single commonest error in the subject. The early data are used for the storativity: $S$ comes from the intercept $t_0$, which is extrapolated from the straight line, and a 10-minute error in $t_0$ is a factor-of-two error in $S$; a storativity quoted to two significant figures from a short test is a fabrication. The well is assumed fully penetrating: a partially penetrating well in a thick aquifer gives a drawdown that is larger than the theory predicts, so the apparent $T$ is too low and the apparent $S$ too high, and the error is largest at early time — where the interpretation is done. The aquifer is assumed infinite: the boundary that will control the decades-long behaviour of a wellfield shows up in a test only if the test is long enough, and a 8-hour test in a low-diffusivity aquifer sees tens of metres, not the kilometres that matter. The rate is assumed constant: a diesel pump on a fluctuating water level delivers a variable rate, and the superposition correction that should be applied is almost never applied, giving errors of 10–30 per cent in $T$. The recovery is ignored: the residual drawdown during recovery is unaffected by rate fluctuations and is the cleanest data in the test, and most tests do not record it. And the karst is assumed porous: in a fractured or karstified aquifer the Theis curve fits beautifully and means nothing, because the conduits give a radial-flow signature whose transmissivity is a volume average that no future pumping or contaminant will obey — which is why the karst practitioner traces, does not pump, and why the 100-m setback around a karst wellhead is a joke.
:::

::: history
Dupuit (Dupuit) derived the steady unconfined well equation in 1863 and Thiem (Thiem) the steady confined one in 1906, both from the Darcy framework. Slichter (Slichter) obtained the transient solution in 1898; it was rediscovered by Theis (Theis) in 1935, who recognised the analogy with Fourier heat conduction and gave the well function. Wenzel (Wenzel) and Jacob (Jacob) developed the type-curve method in 1940–1950, Cooper and Jacob (Jacob) the straight-line method in 1946, Jacob (Jacob) the generalised theory of unsteady flow in layered aquifers in 1953, Boulton (Boulton) the delayed-yield solution in 1954, and Hantush (Hantush) the leaky-aquifer and partially-penetrating-well solutions in 1959–1964. Papadopulos and Cooper (Cooper) gave the finite-diameter-well solution in 1967 and Neuman (Neuman) the modern unconfined solution in 1975. Bourdet (Bourdet), Gringarten (Gringarten) and Ramey (Ramey) developed the derivative diagnostic plot out of petroleum well-test analysis between 1979 and 1999, Butler (Butler) wrote the standard *Pumping Tests* in 1998, Kruseman and Ridder (Kruseman) the Design and Analysis of Pumping Tests manual in 1990, Walton (Walton) the well efficiency and specific-capacity methods in 1962, and Hvorslev (Hvorslev) the slug test method in 1951. Todd (Todd) wrote *Groundwater Hydrology* in 1959 and Fetter (Fetter) *Applied Hydrogeology*. Dillon (Dillon) founded aquifer storage and recovery in South Australia in 1975–1985, Bouwer (Bouwer) the soil-aquifer treatment and bank filtration work at the US Salinity Laboratory from 1978, Pyne (Pyne) the ASR practice in Florida, and Dillon and Pavelic (Dillon) and Hiscock (Hiscock) the modern managed aquifer recharge assessment in Australia and Europe.
:::
## Where this leads

The physics on which every well equation rests is [[hydrology/groundwater-flow]], the unsaturated zone through which the recharge travels is [[hydrology/soil-water]], the solutes the well pumps are [[hydrology/contaminant-transport]], the baseflow the well captures is separated in [[hydrology/runoff]] and its low flows analysed in [[hydrology/floods-droughts]], the recharge that limits the sustainable yield comes from [[hydrology/precipitation-evaporation]] and [[hydrology/snow]], the sedimentary architecture that sets the transmissivity is [[sedimentology/basins-sequences]] and [[sedimentology/sediment-grains]], the fractures and conduits that break every equation here are [[structural-geology/fractures-faults]] and [[geomorphology/landscape-evolution]], the resource, its law and its depletion are [[earth-resources/groundwater-resources]] and [[earth-resources/extraction-impacts]], the geothermal and storage wells are [[earth-resources/geothermal-storage]], and the coastal discharge that bounds the aquifer is [[geomorphology/coasts]].

::: quiz
A pumping test's semi-log drawdown plot is straight for the last two hours of a three-hour test, and the first hour curves upward on the same axes. What should the analyst do?
- [ ] Fit the line through all the data for the best average.
- [x] Fit the line only to the late straight portion and discard the early points.
- [ ] Use the early points, which have the least drawdown error.
- [ ] Repeat the test at a higher rate.
::: solution
The early curved segment is **wellbore storage** — water coming out of the well itself rather than out of the aquifer. It carries no information about the aquifer's transmissivity, and fitting through it makes the slope too shallow and the transmissivity too high. The straight late portion is the radial-flow regime, and it alone is used.
:::
:::

::: summary
- The four aquifer types differ in what supplies the water — drained pores or released pressure — and their storage coefficients differ by three orders of magnitude.
- Karst breaks every equation in this chapter: 90 per cent of the flow in a few conduits, 95 per cent of the storage in the matrix, and only tracer tests describe it.
- Equilibrium formulas are robust for yield and useless for storage, because the radius of influence enters only inside a logarithm.
- The Cooper–Jacob straight line gives transmissivity from its slope and storativity from its intercept, and both are destroyed by fitting through the wellbore-storage segment.
- The Bourdet derivative plot on log–log paper diagnoses storage, radial flow, leakage and boundaries; skipping it is the commonest professional error.
- Sustainable yield is recharge **plus** captured discharge, so it is a management variable and its cost is paid by the stream, the wetland or the sea.
- A recovery measurement is free, immune to pumping-rate fluctuations, and almost never taken.
:::

## Exercises

::: exercise Specific capacity {level=1 check="4.2"}
A well pumped at $8.4\ \mathrm{L\,s^{-1}}$ shows a drawdown of $2.0\ \mathrm{m}$. Find the specific capacity.
::: solution
$\mathrm{SC} = 8.4/2.0 = 4.2\ \mathrm{L\,s^{-1}\,m^{-1}}$. A specific capacity below 1 is a poor well in most rocks and above 20 a karst conduit or a gravel aquifer; the number is the first diagnostic of a well's condition and its trend over years is the cheapest condition monitoring available.
:::
:::

::: exercise The unconfined well {level=1 check="8.6"}
Find the discharge of a 0.15-m-radius well in an unconfined aquifer with $K = 10^{-4}\ \mathrm{m\,s^{-1}}$, an undisturbed saturated thickness of 20 m, a pumping water level 14 m above the base, and a radius of influence of 250 m.
::: solution
$Q = \pi K(h_{\mathrm{e}}^2 - h_{\mathrm{w}}^2)/\ln(R/r_{\mathrm{w}}) = \pi\times10^{-4}\times(400 - 196)/\ln(1667) = 6.41\times10^{-2}/7.42 = 8.6\times10^{-3}\ \mathrm{m^{3}\,s^{-1}} = 8.6\ \mathrm{L\,s^{-1}}$. Note that the **drawdown** enters as a **difference of squares**, so an unconfined well's yield falls **faster** with drawdown than a confined one's — the reason a **shallow** well in a **drought** fails **disproportionately**.
:::
:::

::: exercise The radius of influence {level=2 check="23"}
For the confined well of the worked example, find the percentage change in the predicted discharge if the radius of influence is taken as 3000 m instead of 300 m.
::: solution
The denominator changes from $\ln(2000) = 7.60$ to $\ln(20{,}000) = 9.90$, so the discharge falls by $1 - 7.60/9.90 = 23$ per cent. A **factor of ten** in an unmeasurable parameter moves the answer by a **quarter** — which is why the equilibrium method is used for **screening** and never for **design**.
:::
:::

::: exercise The Cooper–Jacob slope {level=2 check="0.0018"}
A test pumped at $2.0\ \mathrm{L\,s^{-1}}$ gives a semi-log slope of $0.20\ \mathrm{m}$ per log cycle. Find the transmissivity.
::: solution
$T = 0.183\,Q/\Delta s = 0.183\times2.0\times10^{-3}/0.20 = 1.8\times10^{-3}\ \mathrm{m^{2}\,s^{-1}}$. A transmissivity of $1.8\times10^{-3}\ \mathrm{m^{2}\,s^{-1}}$ is a **good** sand and gravel aquifer; below $10^{-5}$ the well is a **domestic** one and above $10^{-2}$ a **karst** or a **fractured** basalt.
:::
:::

::: exercise The storativity {level=2 check="8.8"}
For the test of the worked example, find $S\times10^{5}$ if the semi-log intercept is $t_0 = 6\ \mathrm{s}$ at an observation distance of 10 m.
::: solution
$S = 2.25\,T t_0/r^{2} = 2.25\times6.5\times10^{-4}\times6/100 = 8.8\times10^{-5}$ — a **confined** value. If the intercept were read at 12 s instead of 6 s the storativity would be **doubled**, which is why a storativity from a short test is quoted to **one** significant figure at most.
:::
:::

::: exercise Well efficiency {level=2 check="0.75"}
A well has $B = 0.12\ \mathrm{m\,(L\,s^{-1})^{-1}}$ and $C = 0.002\ \mathrm{m\,(L\,s^{-1})^{-2}}$. Find the efficiency at $20\ \mathrm{L\,s^{-1}}$.
::: solution
$s_{\mathrm{w}} = 0.12\times20 + 0.002\times400 = 2.4 + 0.8 = 3.2\ \mathrm{m}$, and $E = 2.4/3.2 = 0.75$. At **75 per cent** the well is **acceptable**; the **turbulent** loss is 25 per cent of the drawdown and will **grow** as the screen clogs, because $C$ rises **faster** than $B$ when the open area falls.
:::
:::

::: exercise The distance to a boundary {level=3 check="1.2"}
A well 10 m from a river is pumped at $1.0\ \mathrm{L\,s^{-1}}$ from an aquifer of transmissivity $6.5\times10^{-4}\ \mathrm{m^{2}\,s^{-1}}$ with a 0.15-m-radius well. Assuming the river is a **constant-head** boundary, find the maximum drawdown the well can reach, and the pumping rate at which the drawdown would be $2.0\ \mathrm{m}$.
::: solution
A constant-head boundary is represented by an **image recharge well** of equal rate at the mirror position $2d$ away, and the steady-state drawdown of the real well is
$$
s_{\infty} = \frac{Q}{2\pi T}\ln\!\left(\frac{2d}{r_{\mathrm{w}}}\right) = \frac{10^{-3}}{2\pi\times6.5\times10^{-4}}\ln\!\left(\frac{20}{0.15}\right) = 0.245\times4.89 = 1.2\ \mathrm{m}.
$$
The drawdown **cannot exceed** this, because the river supplies the water; at a pumping rate of $2.0/1.2\times1.0 = 1.7\ \mathrm{L\,s^{-1}}$ the drawdown would be $2.0\ \mathrm{m}$.

The interpretation is the point. Below $1.7\ \mathrm{L\,s^{-1}}$ the well pumps a mixture of aquifer storage and induced river water, and above it the drawdown stops rising and the extra water comes entirely from the river — which means the well has captured the river. The ecological and legal consequence is immediate: a licence written on the aquifer's yield alone ignores the fact that beyond a threshold the well becomes a river diversion, and the threshold is computable from the distance, the transmissivity and the river bed's hydraulic conductivity.

The method is the image-well or method of images, and it is the analytic backbone of boundary analysis: a no-flow boundary is an image of the same sign, which doubles the late-time slope; a constant-head boundary is an image of the opposite sign, which halves it; a leaky boundary is a partial image. The time at which the departure from the infinite-aquifer curve begins gives the distance through $t \approx r^{2}S/(4T)$, and the magnitude of the departure gives its type — which is how a single pumping test maps a fault, a river or a lithological contact that no borehole has reached.
:::
:::

::: exercise The sustainable yield and the capture {level=3 check="12"}
An aquifer receives $100\ \mathrm{mm\,yr^{-1}}$ of recharge over $200\ \mathrm{km^{2}}$. A wellfield is developed and, at the new steady state, **all** of the pumped water is balanced by a **reduction** of the discharge to a stream. Find the sustainable pumping rate in million $\mathrm{m^{3}\,yr^{-1}}$, and the volume the stream loses each year.
::: solution
The recharge is
$$
R = 0.100\times200\times10^{6} = 2.0\times10^{7}\ \mathrm{m^{3}\,yr^{-1}} = 20\ \text{million}\ \mathrm{m^{3}\,yr^{-1}},
$$
and at the new steady state the **pumping cannot exceed** it, so the sustainable rate is **20 million m³ yr⁻¹** — and because the recharge is unchanged, **all 20 million** must be balanced by a **reduction of discharge** or an **increase of recharge**. If the whole of the capture is taken from the stream, the stream loses **20 million m³ yr⁻¹**; if 60 per cent is taken from the stream and 40 per cent from a **wetland** or by **induced** recharge from a canal, the stream loses **12 million m³ yr⁻¹**.

This is the capture theorem, the most important and least popular result in groundwater hydrology. At the new steady state the recharge is unchanged, so every cubic metre pumped must be balanced by a cubic metre of reduced discharge or increased recharge somewhere — a stream that dries in summer, a wetland that dies, a spring that stops, or seawater that advances. The "mining" phase, in which the water comes from storage instead, lasts years to centuries and is what makes an aquifer look abundant until it is not.

The policy consequence is that a sustainable yield computed as "recharge" is sustainable for the aquifer's pressure but not for the ecosystem, and that the honest number is "recharge minus the environmental flow requirement". Over the Ogallala, the Central Valley, the North China Plain and the Murray–Darling the difference between the two numbers is 30 to 70 per cent of the current pumping, and that difference is the whole of the adaptation problem.
:::
:::
