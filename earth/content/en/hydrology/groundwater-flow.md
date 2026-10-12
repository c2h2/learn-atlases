**Henry Darcy** was an engineer in Dijon who needed to know how much water would pass through a sand filter to supply the city's fountains, and in 1856 he published *Les Fontaines publiques de Dijon* with a linear law between the flow and the hydraulic gradient. That law, plus the continuity equation, is the whole of theoretical hydrogeology, and it describes the motion of the largest body of liquid fresh water on the planet — some $10{,}600\times10^{3}\ \mathrm{km^{3}}$, a hundred times the surface rivers and lakes, on which half of humanity's drinking water and about a quarter of its irrigation depend. The irony is that the law is exact for the sand in Darcy's column and only approximate for the aquifer, because the aquifer's permeability is **zoned**, **fractured**, **layered** and **unmeasured** between the boreholes.

## Head, gradient and Darcy's law

::: definition Hydraulic head, the water table and the flow net {#def-head}
Water moves in response to the **hydraulic head**
$$
h = z + \frac{p}{\rho_{\mathrm{w}} g},
$$
the elevation of the point plus the **pressure head**, and it moves from **high head to low head** — not from high pressure to low, and not downhill. In an **unconfined** aquifer the water table **is** the surface of zero gauge pressure, so $h$ at the water table equals its elevation and the water table **slopes in the direction of groundwater flow**, which is why a water-table map is a flow map. In a **confined** aquifer the head is measured by the level to which water rises in a **piezometer** — the **potentiometric surface** — which may lie **above** the top of the aquifer (an **artesian** or **pressurised** aquifer) and even **above** the ground surface (a **flowing artesian well**, the reason the first boreholes in the Paris Basin and the Great Plains threw water into the air).

A **flow net** is the orthogonal grid of **flow lines** and **equipotentials** that solves **Laplace's equation** for a steady, homogeneous, isotropic system, and it is both the classic manual method and the best way to understand any groundwater problem. For a net of $N_{\mathrm{f}}$ flow channels and $N_{\mathrm{d}}$ equipotential drops across a total head difference $H$,
$$
Q = K\,H\,\frac{N_{\mathrm{f}}}{N_{\mathrm{d}}},
$$
and the two properties that make the method powerful are that the flow net is **scale-free** — the same net solves the problem at any size — and that it is **unique**, so a flow net drawn for a real, mapped geometry carries the whole of the system's information except the value of $K$.
:::

::: definition Darcy's law, the two velocities and the permeability {#def-darcy}
**Darcy's law** is the empirical linear relation
$$
Q = -K A\frac{\mathrm{d}h}{\mathrm{d}l} \qquad\Longleftrightarrow\qquad q = \frac{Q}{A} = -K\frac{\mathrm{d}h}{\mathrm{d}l},
$$
where $q$ is the **specific discharge** or **Darcy flux** — a flow **per unit total area**, including the rock — and not a velocity. The **average linear velocity** or **seepage velocity** is
$$
\bar{v} = \frac{q}{n_{\mathrm{e}}},
$$
with $n_{\mathrm{e}}$ the **effective** (interconnected, drainable) porosity, and it is this velocity that carries a contaminant. With $K = 10^{-4}\ \mathrm{m\,s^{-1}}$, a gradient of $0.005$ and $n_{\mathrm{e}} = 0.15$, $q = 5\times10^{-7}\ \mathrm{m\,s^{-1}}$ and $\bar{v} = 3.3\times10^{-6}\ \mathrm{m\,s^{-1}} = 0.29\ \mathrm{m\,d^{-1}} = 105\ \mathrm{m\,yr^{-1}}$ — a plume travels **a kilometre in a decade**, which is the reason a groundwater contamination is a **century-long** liability and the reason the **source** must be found and stopped rather than the plume managed.

The **hydraulic conductivity** is a property of **both** the rock and the fluid,
$$
K = \frac{k\,\rho_{\mathrm{w}}\,g}{\mu},
$$
with $k$ the **intrinsic permeability** in $\mathrm{m^{2}}$ or **darcies** ($1\ \mathrm{D} = 9.87\times10^{-13}\ \mathrm{m^{2}}$). For water at 20 °C the conversion is $K[\mathrm{m\,d^{-1}}] \approx 0.84\,k[\mathrm{D}]$, so **one darcy is about one metre per day** — the rule of thumb that lets a petroleum geologist and a hydrogeologist talk to each other. The temperature dependence is not negligible: $K$ rises by **60 per cent** between 5 and 25 °C because the viscosity falls, which is why a **geothermal** well tests better hot than cold and why a **borehole** test must be temperature-corrected.

The **validity** of the linear law requires a **Reynolds number** below about 1–10, which fails in **coarse gravel**, in **karst conduits** and in the **gravel-pack** of a well, where the flow becomes **turbulent** and the head loss goes as the **square** of the velocity. In **clay** and **shale** the opposite failure occurs: the flow is **non-linear** at the low end, with a **threshold gradient** below which nothing moves, because the interlayer water is bound.
:::

::: definition The groundwater flow equation, storage and the diffusivity {#def-flow-eq}
Combining Darcy's law with mass conservation gives the **groundwater flow equation**
$$
S_{\mathrm{s}}\frac{\partial h}{\partial t} = \frac{\partial}{\partial x}\!\left(K_{x}\frac{\partial h}{\partial x}\right) + \frac{\partial}{\partial y}\!\left(K_{y}\frac{\partial h}{\partial y}\right) + \frac{\partial}{\partial z}\!\left(K_{z}\frac{\partial h}{\partial z}\right) + W,
$$
with $S_{\mathrm{s}}$ the **specific storage** ($\mathrm{m^{-1}}$) and $W$ a **source or sink**. For a **confined** aquifer $S_{\mathrm{s}} = \rho_{\mathrm{w}} g(\alpha + n\beta_{\mathrm{w}})$, a sum of the **grain** and **water** compressibilities, and is $10^{-6}$–$10^{-4}\ \mathrm{m^{-1}}$; for an **unconfined** aquifer the drainable storage is the **specific yield**, $0.05$–$0.30$ — **three orders of magnitude larger**, which is why an unconfined aquifer can deliver a large flow with a small drawdown and a confined one cannot.

The equation's **diffusivity** $a = T/S$ (confined) or $T/S_{\mathrm{y}}$ (unconfined), in $\mathrm{m^{2}\,s^{-1}}$, sets how fast a head disturbance **propagates**. For a confined aquifer with $T = 10^{-3}\ \mathrm{m^{2}\,s^{-1}}$ and $S = 10^{-4}$, $a = 10\ \mathrm{m^{2}\,s^{-1}}$ and a disturbance crosses a kilometre in $\sqrt{L^{2}/a} \approx 1.2$ days; for an unconfined aquifer with $T = 10^{-2}$ and $S_{\mathrm{y}} = 0.05$, $a = 0.2\ \mathrm{m^{2}\,s^{-1}}$ and the same distance takes **two months**. This is why a **confined** aquifer's piezometers respond to a distant pumping well within **hours** while an **unconfined** water table responds over **weeks**, and why the **barometric** and **earth-tide** response of a piezometer is used to **classify** the aquifer it is completed in.
:::

::: example Darcy's law, the velocity and the travel time {#ex-darcy}
A sandy aquifer 12 m thick has $K = 2\times10^{-4}\ \mathrm{m\,s^{-1}}$ and $n_{\mathrm{e}} = 0.18$. Two piezometers 400 m apart along the flow direction read heads of $42.6$ and $41.1\ \mathrm{m}$. Find the hydraulic gradient, the Darcy flux, the average linear velocity, and the travel time between the two piezometers and to a well 1.5 km downgradient.
::: solution
$$
i = \frac{42.6 - 41.1}{400} = 0.00375, \qquad
q = Ki = 2\times10^{-4}\times0.00375 = 7.5\times10^{-7}\ \mathrm{m\,s^{-1}} = 0.065\ \mathrm{m\,d^{-1}},
$$
$$
\bar{v} = \frac{q}{n_{\mathrm{e}}} = \frac{7.5\times10^{-7}}{0.18} = 4.17\times10^{-6}\ \mathrm{m\,s^{-1}} = 0.36\ \mathrm{m\,d^{-1}},
$$
so the travel time between the piezometers is $400/0.36 = 1111$ days ($3.0$ years) and to the well $1500/0.36 = 4167$ days ($11.4$ years).

The **discharge per unit width** is $q \times b = 7.5\times10^{-7}\times12 = 9.0\times10^{-6}\ \mathrm{m^{2}\,s^{-1}} = 0.78\ \mathrm{m^{3}\,d^{-1}}$ per metre of width, or $780\ \mathrm{m^{3}\,d^{-1}}$ per kilometre — the number that decides whether a **levee** will heave, whether a **mine** will flood, and whether a **wetland** will stay wet.

Three cautions are worth more than the arithmetic. The **gradient** is measured between **two points**, and the **flow direction** is **perpendicular to the equipotential**, which is **not** the direction between the two piezometers unless they happen to lie along a flow line — so a correct gradient needs **three or more** piezometers and a **triangulation**, and a two-piezometer "gradient" is a **guess**. The **effective porosity** is the **least known** parameter in the whole chain and is **not** the **total** porosity: a **fractured** rock may have a total porosity of 0.02 and an effective porosity of 0.005, and a **glacial till** the reverse, so the velocity is uncertain by a factor of three to ten in most real aquifers. And the **velocity is an average over the pore space**, whereas real flow is **channeled** through the **largest** pores at **several times** the average — which is why a **tracer** arrives **earlier** and **more sharply** than the average-velocity prediction, and why the **first** arrival, not the mean, is what matters for a **well-head protection** radius.
:::
:::

::: widget plot
f: 40*x
x: 0.1, 5
y: 4, 205
labels: z\ (\text{m below sea level})
caption: The **Ghyben–Herzberg** relation $z = 40\,h$, which gives the depth below sea level of the **freshwater–seawater interface** beneath a coastal aquifer as forty times the height of the freshwater **head** above sea level. The relation follows from **hydrostatic balance** between fresh water of density $1000\ \mathrm{kg\,m^{-3}}$ and saline water of $1025\ \mathrm{kg\,m^{-3}}$, and it is exact only for a **stationary**, **sharp** interface with **no** flow — conditions that no real coast satisfies, but which give an answer within 20 per cent of the true one over the **upper** part of the aquifer. Its practical content is brutal: a coastal aquifer with a freshwater head of **2 m** has its interface at **80 m**, and **pumping** that lowers the head by **1 m** raises the interface by **40 m** — the **upconing** that salinises coastal wells long before the lateral **intrusion** arrives. The relation also explains why the **Mediterranean**, the **Florida** and the **Gulf Coast** aquifers, the **Netherlands** and the **Gaza** strip are so salinisation-prone, and why a **1-m** sea-level rise, combined with the **reduction** in recharge that accompanies coastal development, can move the **intrusion** front **hundreds of metres** inland.
:::

::: example Seawater intrusion and the Ghyben–Herzberg interface {#ex-ghyben}
A coastal unconfined aquifer has a freshwater head of $2.5\ \mathrm{m}$ at a well 500 m inland, and the aquifer is $60\ \mathrm{m}$ thick below sea level. Find the depth of the interface at the well, and decide whether the well — screened at the aquifer base — will produce fresh water. Then find the head at the well below which the interface reaches the aquifer base.
::: solution
$$
z = 40\times2.5 = 100\ \mathrm{m}\ \text{below sea level}.
$$
The aquifer base is at only $60\ \mathrm{m}$ below sea level, so the interface at **100 m** lies **below** the base and the well produces **fresh** water — but with a **40-m safety margin**, and the head at which the interface reaches the base is
$$
h_{\mathrm{crit}} = \frac{60}{40} = 1.5\ \mathrm{m}.
$$
A drawdown of **1 m** at the well therefore brings the interface to the screen, and because the **upconing** beneath a pumping well is **1.5 times** the regional rise, the practical critical head is nearer **1.9 m** — a margin of only 0.6 m.

The **dynamics** are not captured by the hydrostatic relation. Fresh water flows **seaward** and discharges to the sea through a **diffuse** **submarine groundwater discharge** and through **spring lines** and **seeps**, and the **salt water** does not move as a sharp wall but mixes in a **transition zone** tens to hundreds of metres thick, in which **tidal** pumping, **density-driven** circulation and **dispersion** maintain salinities between 10 and 35 psu. The **position** of the **10-per-cent salinity** contour — the practical intrusion front — responds to pumping with a **lag of months to years**, so a well that is fresh today may salinise **five years** after the pumping that caused it, and the **management** rule is to control the **head field**, not the **salinity**.

The **global** stakes are large and rising. The **Gaza** aquifer, the **North China Plain**, the **Murray** mouth, the **Netherlands** coastal dunes, the **Oahu** and **Kona** lenses, the **Nile** delta and the **Po** plain are all intruded, and **Jasechko and the global groundwater-quality survey** (Jasechko) found in 2024 that **most** of the world's shallow groundwater is **too saline or too hard** to be counted as usable, and that the **usable** fraction is **over-allocated** in the world's major aquifer systems. The remedy is not treatment but **head management** — artificial recharge, the reduction of the pumping, and the maintenance of a **freshwater head** above the critical value — which is why the **head**, not the **salinity**, is the managed variable in every modern coastal-groundwater law.
:::
:::

## Recharge, discharge and the groundwater balance

::: definition Recharge and its measurement {#def-recharge}
**Recharge** is the flux of water into the saturated zone, and it is the **only** renewable input to an aquifer and the **least measured** term in the groundwater balance. The methods disagree by factors of two to five on the same aquifer:
$$
\begin{array}{lll}
\textbf{water balance} & \text{soil-moisture accounting} & \text{upper boundary, seasonal, error } \pm 50\ \text{per cent} \\
\textbf{Darcy flux} & K\,\partial h/\partial z \ \text{in the unsaturated zone} & \text{local, requires unsaturated } K(\theta) \\
\textbf{chloride mass balance} & R = P\,C_{\mathrm{rain}}/C_{\mathrm{gw}} & \text{long-term average, error } \pm 25\ \text{per cent} \\
\textbf{environmental tracers} & ^{3}\mathrm{H},\ ^{14}\mathrm{C},\ ^{36}\mathrm{Cl},\ \mathrm{CFC},\ ^{81}\mathrm{Kr} & \text{apparent age, not rate} \\
\textbf{water-table fluctuation} & R = S_{\mathrm{y}}\,\Delta h & \text{the standard method, requires } S_{\mathrm{y}} \\
\textbf{MODFLOW} \text{ or model fit} & \text{calibrated } R & \text{inherits every other error}
\end{array}
$$
The **chloride mass balance** is the most robust over decades because chloride is conservative, its atmospheric input is measured at coastal and remote stations, and the method integrates over the whole catchment; its assumptions are a **steady** climate, **no** other chloride source (**dryland** chloride **accumulation** in arid regions is a large bias), and **no** recycling through **irrigation** return.

The **global** numbers are that **total** groundwater recharge is of order **$200\times10^{3}\ \mathrm{km^{3}\,yr^{-1}}$** — about **40 per cent** of the water that infiltrates beyond the root zone — that most of it discharges to the **ocean** beneath the **continental shelves** and is therefore **not usable**, that the **fresh, accessible** fraction is of order **$2{,}000\ \mathrm{km^{3}\,yr^{-1}}$**, and that **human groundwater withdrawal** of about **$700$--$800\ \mathrm{km^{3}\,yr^{-1}}$** removes **a quarter to a third** of the fresh, accessible recharge and **mines** fossil groundwater at **$150$--$200\ \mathrm{km^{3}\,yr^{-1}}$**. The **overdraft** is concentrated in the **North China Plain**, the **Upper Ganges**, the **Central Valley of California**, the **High Plains Ogallala**, the **Northwest Indian** and **Pakistan** alluvium, the **North African** fossil aquifers and the **Murray–Darling**, and the **GRACE** and **GRACE-FO** satellites have measured the resulting storage declines directly.
:::

::: definition Groundwater discharge, springs and the groundwater–surface water connection {#def-discharge}
Groundwater leaves the aquifer at **springs**, **seeps**, **wetlands**, **lake beds** and the **sea**, and by **wells**. **Toth** (Toth) showed in 1963 that a topographically driven flow system contains **three** nested circulations — **local** (a hundred metres, decades), **intermediate** (a few kilometres, centuries) and **regional** (tens of kilometres, tens of thousands of years) — and that the **springs** on a hillside are the **local** systems while the **thermal** and **mineral** springs in the valley are the **regional** ones. The classification explains the **geochemistry**: local water is young, calcium-bicarbonate and dilute; regional water is old, sodium-bicarbonate or sodium-chloride, hot and mineralised.

The **groundwater–surface water** exchange is measured by the **vertical hydraulic gradient** across the bed,
$$
q = K_{\mathrm{bed}}\frac{h_{\mathrm{river}} - h_{\mathrm{piezometer}}}{\Delta l},
$$
with a **positive** flux meaning **losing** (river to aquifer) and a **negative** one **gaining**. A **gaining** stream shows a **hyporheic** zone of upwelling, a **baseflow** that sustains it in drought, and a **temperature** minimum at night; a **losing** stream shows a **hyporheic** downwelling, a **filter cake** that clogs the bed, and a **disappearance** in drought. The distinction is the whole of the **ecology** of a low-flow river and the whole of the **risk** of a **riverbank-filtration** water supply, and it is decided by a **head difference of centimetres** — which is why a **single** mis-levelled pressure transducer reverses the sign of a published result.
:::

::: example Recharge by the chloride mass balance {#ex-chloride}
A semi-arid catchment receives $600\ \mathrm{mm\,yr^{-1}}$ of precipitation with a chloride concentration of $1.0\ \mathrm{mg\,L^{-1}}$. The groundwater beneath the interfluve has a chloride concentration of $25\ \mathrm{mg\,L^{-1}}$. Find the recharge, and explain why the same method applied to groundwater **near a dry valley floor** gives a value three times smaller.
::: solution
With a steady chloride mass balance and no other source or sink,
$$
R = P\,\frac{C_{\mathrm{rain}}}{C_{\mathrm{gw}}} = 600\times\frac{1.0}{25} = 24\ \mathrm{mm\,yr^{-1}},
$$
which is **4 per cent** of the precipitation — a typical semi-arid recharge.

Near the **valley floor** the groundwater has travelled **laterally** from the interfluve and has **also** accumulated the chloride deposited on the valley's own surface, and in a **dryland** the atmosphere's chloride is **recycled** by **evaporation** from the valley's **saline** discharge zones, so the chloride in the **unsaturated zone** and the **groundwater** is **older and more concentrated** than the steady balance allows. The apparent recharge is then **too low** by the factor by which the chloride has been **stored**, and in the **Negev**, the **Sonoran**, the **Murray** mallee and the **Spanish** southeast the stored dryland chloride is enough to make the method report **1–3 mm yr⁻¹** where the true modern recharge is **10–20**.

The **corrections** are to use the **unsaturated-zone** chloride **profile** rather than the groundwater value, which shows the **accumulation** explicitly and dates the **last wet period**; to use the **bromide/chloride ratio**, which distinguishes **atmospheric** chloride from **dryland** or **marine** chloride; and to **date** the water with **tritium**, **CFCs** or **carbon-14** so that the **age** of the water and the **rate** of recharge can be checked against each other. The **moral** is that recharge is **not measured anywhere** — it is **inferred**, and the inference is **method-dependent** by a factor of two to five, which is the largest single uncertainty in every groundwater sustainability plan on Earth.
:::
:::

::: example Land subsidence from groundwater withdrawal {#ex-subsidence}
A pumping district withdraws $200\times10^{6}\ \mathrm{m^{3}\,yr^{-1}}$ from a confined aquifer of area $800\ \mathrm{km^{2}}$, specific storage $S_{\mathrm{s}} = 2\times10^{-6}\ \mathrm{m^{-1}}$ and thickness $120\ \mathrm{m}$. The water is partly drained from **interbeds** of compressible clay whose **inelastic** (plastic) compressibility gives **1 m of subsidence per 100 m of head decline**. Find the annual head decline that the **elastic** storage alone could supply, and the subsidence if the head falls 20 m.
::: solution
The **elastic** storage of the confined aquifer per unit area is $S_{\mathrm{s}} b = 2\times10^{-6}\times120 = 2.4\times10^{-4}$ m of water per m of head. The draft per unit area is
$$
\frac{200\times10^{6}}{800\times10^{6}} = 0.25\ \mathrm{m\,yr^{-1}},
$$
so if it were met **entirely** from elastic storage the head would fall
$$
\frac{0.25}{2.4\times10^{-4}} = 1040\ \mathrm{m\,yr^{-1}} .
$$
That is physically impossible, which is the **point**: a sustained draft of this size **cannot** be met from storage, so it must be met by **captured** recharge or **induced** stream leakage, or the district must **mine** fossil water and **subside**. With a **plastic** compressibility of $10^{-2}$ m of subsidence per metre of head, a **20-m** decline gives
$$
20\times10^{-2} = 0.20\ \mathrm{m}
$$
of **permanent** subsidence over $800\ \mathrm{km^{2}}$ — $1.6\times10^{8}\ \mathrm{m^{3}}$ of ground surface lost.

The **real** numbers are the reason this is a hazard rather than an exercise. **Jakarta** has subsided **4–10 m** since 1970 and is being abandoned as a capital; **Mexico City** **8 m** since 1890; **New Orleans**, **Bangkok**, **Tehran**, **Tianjin**, **Shanghai**, **Houston** and the **San Joaquin Valley** of California **1–9 m**; and the **San Joaquin**'s **25 m** of subsidence since 1925 has **permanently destroyed** the **confining layer** and the **storage capacity** of the aquifer system over hundreds of square kilometres. The subsidence is **inelastic** and **irreversible**: no amount of recharge restores the **crushed** clay fabric, and the aquifer's **capacity** is gone for ever.

The **second** consequence is the one that surprises. Subsidence **lowers the land**, which **increases** the **flood** and **storm-surge** hazard, which **increases** the **levee** height required, which **increases** the **cost** of the floodplain, and which — because the levees **prevent** the **overbank** deposition that built the floodplain — **accelerates** the relative sea-level rise. The **Mississippi Delta**, the **Po** delta, the **Ganges–Brahmaputra** and the **Jakarta** coast are all in this trap, and **groundwater withdrawal** is a **larger** contributor to their relative sea-level rise than **thermal expansion** or **ice melt** locally.
:::
:::

::: warning An aquifer parameter is an estimate between two boreholes, and the estimate is not the answer
Seven problems are structural. **The parameter field is not the parameter**: $K$ in a real aquifer varies over **three to five orders of magnitude** between a **sand lens** and a **clay stringer**, and a **pumping test** measures an average over a **radius of influence** of hundreds of metres that **smooths** the very **heterogeneity** that controls the **plume's** path — so the **transmissivity** used in a **remediation** design is systematically **too high** and the **velocity** systematically **too low**. **The anisotropy is assumed**: the **horizontal** to **vertical** conductivity ratio is $10$–$100$ in a **fluvial** or **deltaic** aquifer and $1000$ in a **layered** till or **shale**, and a model with $K_{\mathrm{h}} = K_{\mathrm{v}}$ predicts **vertical** flows that never occur and **misses** the **confining layers** that do all the work. **The boundary is a guess**: the **no-flow** and **constant-head** boundaries of every model are **inferred** from a **geological map** whose contacts are **conjectural** between boreholes, and a **model** whose boundary is 500 m out predicts a **capture zone** that is 500 m out — which is the difference between a **protected** and an **unprotected** wellhead. **The recharge is unknown**: as shown above, the recharge estimate varies by a factor of two to five with the method, and a **sustainable yield** computed from a **recharge** that is wrong by a factor of two is a **mining** plan. **The scale is wrong**: a **core** measures $10^{-4}\ \mathrm{m^{3}}$, a **pumping test** $10^{6}\ \mathrm{m^{3}}$, a **water balance** $10^{12}\ \mathrm{m^{3}}$, and the three disagree by an order of magnitude because the **fractures**, the **solution channels** and the **paleochannels** that carry the water are **below** the resolution of the small measurement and **averaged away** by the large one. **The transient is steady-state**: most groundwater law is written on a **long-term average** recharge, and the **drought** recharge in a **Mediterranean** or **monsoon** climate is **near zero** while the **wet-year** recharge is **five times** the mean, so a **sustained-yield** licence based on the mean authorises **overdraft** in every drought. **And the model is calibrated to the head**: a model whose parameters are adjusted to match **observed heads** reproduces the **past** and has **no** necessary skill for the **future**, because the **head field** is controlled by the **boundary conditions** and the **regional** permeability while the **flow paths** and **travel times** — the things one actually wants to know — are controlled by the **small-scale heterogeneity** that the calibration has **smoothed away**.
:::

::: history
**Darcy** (Darcy) published *Les Fontaines publiques de Dijon* in 1856 and gave the law, the concept of hydraulic head and the sand-column method in a single book. **Dupuit** (Dupuit) published the *Essai théorique et pratique sur l'écoulement des eaux* in 1863 with the **steady confined and unconfined** solutions still used for well and spring estimates; **Forchheimer** (Forchheimer) extended the theory to **non-linear** flow and to **seepage under dams** between 1886 and 1930, and **Thiem** (Thiem) gave the **steady radial** well solution in 1906. **Slichter** (Slichter) solved the **transient** problem in 1898, **Theis** (Theis) published the **transient drawdown** solution in 1935 after recognising the analogy with heat conduction, **Cooper and Jacob** (Jacob) gave their **straight-line** methods in 1946, **Hantush** (Hantush) the **leaky-aquifer** solutions in 1959–1964, and **Neuman** (Neuman) the **unconfined delayed-yield** solution in 1975. **Wenzel** (Wenzel) wrote *Ground Water Hydraulics* in 1942, **Bear** (Bear) *Dynamics of Fluids in Porous Media* in 1972, **Polubarinova-Kochina** (Polubarinova-Kochina) *Theory of Ground Water Movement* in 1952, **Todd** (Todd) *Groundwater Hydrology* in 1959, and **Freeze and Cherry** (Freeze) *Groundwater* in 1979, which remains the field's book. **Toth** (Toth) published the **theory of regional groundwater flow** and its three nested systems in 1963 and **Hubbert** (Hubbert) its **geological** application in 1966. **Badon Ghijben** (Ghijben) derived the freshwater–seawater relation from the **Netherlands** dunes in 1863 and **Herzberg** (Herzberg) restated it in 1901; **Glover** (Glover) wrote the modern **moving-interface** solutions. **Terzaghi** (Terzaghi) founded **soil mechanics** and the **effective stress** principle in 1925 and applied it to **subsidence**; **Ireland** (Ireland) documented the **San Joaquin Valley** subsidence in 1956–1966; and **Galloway and the USGS subsidence programme** (Galloway), **Chaussard** (Chaussard) and **Shirzaei** (Shirzaei) established the **InSAR** measurement of it. **Freeze and Witherspoon** (Witherspoon) founded **numerical groundwater modelling** in 1966–1967, **McDonald and Harbaugh** (Harbaugh) published **MODFLOW** in 1984, and **Reilly** (Reilly) led its **modular** successors. **Jasechko and the global groundwater-quality survey** (Jasechko) and **Wada and the global groundwater-depletion school** (Wada) quantified the **world's** usable groundwater and its **overdraft** in 2010–2024.
:::
## Where this leads

The unsaturated zone above the water table is [[hydrology/soil-water]] and the recharge that feeds it comes from [[hydrology/precipitation-evaporation]] and [[hydrology/snow]], the baseflow that this chapter's discharge term supplies is separated in [[hydrology/runoff]] and its low flows analysed in [[hydrology/floods-droughts]], the wells and pumping tests are [[hydrology/aquifers-wells]] and the solutes that travel with the water are [[hydrology/contaminant-transport]], the sedimentary architecture that controls the permeability is [[sedimentology/sediment-grains]] and [[sedimentology/basins-sequences]], the fractures and faults that dominate hard-rock flow are [[structural-geology/fractures-faults]], the coastal discharge is [[geomorphology/coasts]], the springs and the drainage density are [[geomorphology/drainage-basins]] and [[geomorphology/hillslopes]], the resource and its law are [[earth-resources/groundwater-resources]] and [[earth-resources/extraction-impacts]], and the geothermal and storage applications are [[earth-resources/geothermal-storage]].

::: quiz
Two piezometers 200 m apart along a transect read 31.4 m and 31.1 m, and a third, 120 m to the side, reads 31.5 m. What is the flow direction?
- [ ] From the first piezometer to the second.
- [x] Perpendicular to the equipotential through the three heads, which is not along the transect.
- [ ] There is no horizontal gradient.
- [ ] Vertically downward.
::: solution
Three heads define a **plane**, and the **equipotential contour** on it is the line of equal head; the flow is **perpendicular to that contour**, down the head gradient. With the third point higher, the gradient strikes obliquely across the transect, so the flow is **not** from the first piezometer to the second. Two points can never give a direction.
:::
:::

::: summary
- Groundwater moves in response to hydraulic head, not pressure or elevation alone, and the water table is a flow surface.
- Darcy's law gives a flux, not a velocity; the seepage velocity is the flux divided by the effective porosity and is uncertain by a factor of three to ten.
- The confined and unconfined storage coefficients differ by three orders of magnitude, and so do the timescales on which the two aquifer types respond.
- The Ghyben–Herzberg relation makes the interface depth forty times the freshwater head, so a metre of drawdown lifts the interface forty metres.
- Recharge is the least measured term in the groundwater balance and the method-dependent factor of two to five is the largest uncertainty in every sustainability plan.
- Inelastic subsidence from pumping is permanent, irreversible, and locally a larger contributor to relative sea-level rise than climate.
- A model calibrated to heads reproduces the past and has no necessary skill for the flow paths and travel times that management needs.
:::

## Exercises

::: exercise Hydraulic gradient {level=1 check="0.004"}
Two piezometers 500 m apart along a flow line read 28.6 and 26.6 m. Find the hydraulic gradient.
::: solution
$i = (28.6 - 26.6)/500 = 0.004$. A gradient of $4\times10^{-3}$ is a **typical** alluvial-valley value; a **confined** aquifer near a pumping well may show $10^{-1}$ and a **submarine** outwash $10^{-5}$.
:::
:::

::: exercise Darcy flux and velocity {level=1 check="0.17"}
With $K = 5\times10^{-5}\ \mathrm{m\,s^{-1}}$, $i = 0.006$ and $n_{\mathrm{e}} = 0.15$, find the average linear velocity in m d⁻¹.
::: solution
$q = Ki = 3\times10^{-7}\ \mathrm{m\,s^{-1}}$ and $\bar v = q/n_{\mathrm{e}} = 2\times10^{-6}\ \mathrm{m\,s^{-1}}$, so $\bar v = 2\times10^{-6}\times86{,}400 = 0.17\ \mathrm{m\,d^{-1}}$. At that rate a plume travels **63 m a year** and a **1-km** wellhead protection radius is a **16-year** travel time — which is why the **10-year** time-of-travel rule used in many jurisdictions protects a well against only a third of the plausible contamination.
:::
:::

::: exercise Intrinsic permeability {level=1 check="0.83"}
Find the hydraulic conductivity in m d⁻¹ of a sand with an intrinsic permeability of 1 darcy, for water at 20 °C.
::: solution
$K = k\rho g/\mu = 9.87\times10^{-13}\times998\times9.81/1.002\times10^{-3} = 9.6\times10^{-6}\ \mathrm{m\,s^{-1}} = 0.83\ \mathrm{m\,d^{-1}}$. The **one darcy is about one metre per day** rule is worth memorising, and so is the **60 per cent** increase in $K$ between 5 and 25 °C, which is why a **geothermal** well tests better hot than cold.
:::
:::

::: exercise Ghyben–Herzberg {level=2 check="60"}
A coastal well has a freshwater head of 1.5 m above sea level. Find the depth of the interface, and the head at which the interface reaches an aquifer base at 60 m below sea level.
::: solution
$z = 40\times1.5 = 60\ \mathrm{m}$ — the interface is **exactly at the aquifer base**, so the well is at the **critical** head and any further drawdown will draw salt water into the screen. The critical head for a 60-m base is $60/40 = 1.5\ \mathrm{m}$, and with the **upconing** factor of 1.5 beneath a pumping well the practical limit is **1.9 m**.
:::
:::

::: exercise Flow net {level=2 check="0.4"}
A flow net under a dam has 8 flow channels and 20 equipotential drops, a head difference of 10 m and a foundation $K = 10^{-4}\ \mathrm{m\,s^{-1}}$. Find the seepage per metre of dam length.
::: solution
$q = K H N_{\mathrm{f}}/N_{\mathrm{d}} = 10^{-4}\times10\times8/20 = 4\times10^{-5}\ \mathrm{m^{2}\,s^{-1}} = 0.4\ \mathrm{m^{3}\,d^{-1}}$ per metre of length, or $400\ \mathrm{m^{3}\,d^{-1}}$ under a 1000-m dam. The **exit gradient** at the downstream toe, not the total flow, is what causes **piping** and **failure**, and it is read from the **spacing of the equipotentials** at the toe — which is why the flow net is drawn to scale and why **filter design** and **sheet-pile depth** are flow-net problems.
:::
:::

::: exercise The chloride mass balance {level=2 check="18"}
Precipitation of $450\ \mathrm{mm\,yr^{-1}}$ carries $1.2\ \mathrm{mg\,L^{-1}}$ of chloride and the groundwater $30\ \mathrm{mg\,L^{-1}}$. Find the recharge.
::: solution
$R = 450\times1.2/30 = 18\ \mathrm{mm\,yr^{-1}}$, or **4 per cent** of the precipitation. If the aquifer is $20\ \mathrm{km}$ wide and the **gradient** is $0.004$ with $K = 5\times10^{-5}\ \mathrm{m\,s^{-1}}$, the **Darcy** discharge per unit width is $2\times10^{-7}\times b$ — and equating the recharge over a 20-km-wide strip with that discharge gives the **saturated thickness** the water must be moving through — about **57 m** — which is the standard **recharge-versus-discharge** consistency check on any groundwater model, and one that many published models fail.
:::
:::

::: exercise The aquifer diffusivity {level=3 check="58"}
An unconfined aquifer has $T = 10^{-2}\ \mathrm{m^{2}\,s^{-1}}$ and $S_{\mathrm{y}} = 0.05$. Find the diffusivity and the time for a head disturbance to propagate 1 km.
::: solution
$a = T/S_{\mathrm{y}} = 0.2\ \mathrm{m^{2}\,s^{-1}}$, and $t = L^{2}/a = 10^{6}/0.2 = 5\times10^{6}\ \mathrm{s} = 58\ \text{days}$. The same calculation for a **confined** aquifer with $T = 10^{-3}$ and $S = 10^{-4}$ gives $a = 10\ \mathrm{m^{2}\,s^{-1}}$ and **1.2 days** — the reason a **confined** aquifer's piezometers respond to a distant well within hours and an **unconfined** water table over weeks.

The **management** consequence is that a **pumping** district in a **confined** aquifer **communicates** almost instantly and its **drawdown** is felt regionally, so the **legal** test of "no injury to a neighbour" is decided by **elastic** storage and **pressure** diffusion; whereas in an **unconfined** aquifer the **water table** responds locally and slowly, so the **injury** appears as a **drying well** years later and the **litigation** is about **cause** rather than **effect**.
:::
:::

::: exercise Subsidence and the storage budget {level=3 check="0.3"}
A district pumps $120\times10^{6}\ \mathrm{m^{3}\,yr^{-1}}$ from an $600\ \mathrm{km^{2}}$ confined aquifer with $S_{\mathrm{s}} = 3\times10^{-6}\ \mathrm{m^{-1}}$ and $b = 100\ \mathrm{m}$. If 20 per cent of the draft comes from storage, find the annual head decline, and the subsidence over five years if the inelastic compressibility is $1.5\times10^{-3}$ per metre of head.
::: solution
The storage contribution is $0.20\times120\times10^{6} = 2.4\times10^{7}\ \mathrm{m^{3}\,yr^{-1}}$, or $0.04\ \mathrm{m\,yr^{-1}}$ over $600\ \mathrm{km^{2}}$. With $S_{\mathrm{s}} b = 3\times10^{-4}$,
$$
\Delta h = \frac{0.04}{3\times10^{-4}} = 133\ \mathrm{m\,yr^{-1}} .
$$
That is impossible, so the assumption that 20 per cent comes from storage cannot persist for a year: the **capture** of recharge and leakage must take up almost all of the draft within a few years, or the district is **mining**. Taking the **realistic** case of a **10-m** total decline over five years, the subsidence is
$$
10\times1.5\times10^{-3} = 0.015\ \mathrm{m} = 15\ \mathrm{mm}.
$$
The **lesson** is the arithmetic of the first line: a confined aquifer's **elastic** storage is so small that **no** sustained draft can come from it, so a **declining** water level in a confined aquifer is **proof** that the draft exceeds the recharge — a conclusion available from the **water level alone**, without a **water balance**, and the reason the **US Supreme Court** and the **EU Water Framework Directive** treat a **declining** confined aquifer as **evidence** of overdraft.
:::
:::
