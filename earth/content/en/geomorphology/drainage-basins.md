A drainage basin is the natural unit of the land surface, and it is the only landscape whose geometry can be measured completely from above. Its area, its relief, the number and length of its channels, the density of its network and the shape of its hypsometric curve are all measurable from a digital elevation model in an afternoon, and they carry information about the rock, the climate, the tectonics and the time. The quantitative study of this geometry began with Horton's (Horton) attempt in 1932 to predict a basin's flood hydrograph from its channel network, and it remains the branch of geomorphology with the most beautiful and the least causal set of laws.

## Horton's laws

::: definition Stream order and the ratios {#def-horton}
The **Strahler stream order** numbers the channels from the top: a headwater channel is order 1, two order-1 channels joining give order 2, a 1 and a 2 joining give 2, and two of equal order joining give the next order. **Horton's laws** are then empirical power laws. The **bifurcation ratio**
$$
R_b = \frac{N_\Omega}{N_{\Omega+1}}
$$
is the mean number of order-$\Omega$ channels per order-$(\Omega+1)$ channel, and the number of channels of each order falls as a geometric series, $N_\Omega = N_1 R_b^{1-\Omega}$. The **length ratio** $R_L$ and the **area ratio** $R_A$ are the corresponding ratios of the mean channel length and the mean contributing area per order. Natural values are $R_b = 3$–$5$, $R_L = 1.6$–$2.5$ and $R_A = 2$–$4$, and their constancy across two or three orders of magnitude of basin size is the **self-similarity** of drainage networks.
:::

::: definition Drainage density {#def-density}
The **drainage density** is the total length of channel per unit catchment area,
$$
D = \frac{\sum L}{A} \quad [\mathrm{km\,km^{-2}}],
$$
and it is the single most informative morphometric number, because it measures the **ratio of the channel network's extension to the hillslope area that feeds it**. Values run from 0.3–0.6 in arid or permeable terrains, through 1–2 in humid temperate landscapes, to 3–5 in highly dissected wet mountains or in soft, easily eroded mudrocks. The controls are the classic five: **erodibility** of the rock (high in mudrock, low in massive limestone or granite), **climate** (higher in humid than in arid, and higher under a wet cold climate than a warm one because of the freeze–thaw and the low evapotranspiration), **vegetation** (higher under forest than grassland in some settings and the reverse in others), **structure** (a bedrock or joint control produces a rectangular or trellis pattern with a high density along the weak beds), and **time** (a young, recently uplifted basin has a low density that increases as the network extends headward).
:::

::: example Measuring a basin {#ex-horton}
A basin's channel network gives 190 first-order, 48 second-order, 12 third-order, 3 fourth-order and 1 fifth-order stream. Find the bifurcation ratios, the mean $R_b$, and the expected number of first-order streams if the basin had obeyed $R_b = 4$ exactly with 1 fifth-order stream.
::: solution
$$
R_b(1\to2) = \frac{190}{48} = 4.0, \quad
R_b(2\to3) = \frac{48}{12} = 4.0, \quad
R_b(3\to4) = \frac{12}{3} = 4.0, \quad
R_b(4\to5) = \frac{3}{1} = 3.0,
$$
so the mean is $4.0$ and the network is an almost textbook Hortonian one. With $R_b = 4$ exactly and one fifth-order stream, the expected numbers are
$$
N_4 = 4, \quad N_3 = 16, \quad N_2 = 64, \quad N_1 = 256,
$$
against the observed 3, 12, 48 and 190. The observed network is **poorer in low-order channels than the ideal**, which is the usual direction of the departure and has three causes: headwater channels are the hardest to map and the most often missed, so the low-order counts are biased low; the headward-eroding tips of the network are **not yet in equilibrium** with the ideal; and a real basin's headwalls are **hillslopes**, not channels, so the lowest orders are incomplete by construction.

The practical number is $R_b$, and its value is diagnostic. A bifurcation ratio of 3–5 is the normal range for a basin shaped by uniform processes. A ratio **above 6** means the network is **dendritic and inefficient**, typical of a recently uplifted or recently deglaciated area whose channels have not yet linked up. A ratio **below 3** means an **anastomosed or low-order** network, typical of a delta, a karst, or a basin whose channels are controlled by a sparse joint set.
:::
:::

::: widget plot
f: 256*exp(1.386*(1-x))
x: 1, 5
y: 0, 300
labels: \text{number of streams}
caption: The number of streams per order for a basin with $R_b = 4$ and 256 first-order streams, drawn as a continuous exponential $N = 256\times4^{1-\Omega}$. The straight line on a log-linear plot is Horton's first law, and its slope is $\ln R_b$. The linearity over four orders of magnitude of stream number is the empirical fact that has never been derived from a mechanism: no model of channel initiation predicts a constant bifurcation ratio from first principles, and the models that come closest — the random-network and optimal-channel theories of Shreve (Shreve) and of Leopold and Langbein (Langbein) — reproduce it as a statistical consequence of a maximum-entropy or minimum-power assumption rather than as a dynamical law. The constancy of $R_b$ is therefore a statement that drainage networks are **statistically self-similar**, and it is one of the most robust patterns in the Earth sciences.
:::

::: history
The quantitative description of drainage basins begins with **Horton** (Horton), whose 1933 paper in the *Journal of the Franklin Institute* proposed the geometric series of stream numbers, the bifurcation ratio, the drainage density and the infiltration capacity that still carry his name, all in the service of predicting the flood hydrograph of an ungauged catchment. **Strahler** (Strahler) supplied the ordering system of 1952, the hypsometric analysis of 1952, and the quantitative synthesis of 1964 that made the whole apparatus standard. **Shreve** (Shreve) showed in 1966–69 that Horton's laws and the random-topological model of a network are statistically indistinguishable, which was the first serious challenge to the idea that the ratios are dynamically determined, and **Leopold and Langbein's** (Langbein) 1962 paper on the minimum-variance hypothesis offered the alternative that a network arranges itself to distribute energy at a uniform rate per unit length. The **drainage-density** controls were established by **Gregory and Walling** (Walling) in 1968 and by **Morisawa** (Morisawa), and the **channel-initiation threshold** by **Smith and Von Seckach**, **Montgomery and Dietrich** (Dietrich) and **Tucker and Bras** (Bras). The **TOPMODEL** index is Beven and Kirkby's (Kirkby) 1979 paper, which turned a topographic index into a predictive hydrological model. The **sediment cascade** and the **legacy sediment** concepts are the work of **Hubble, Reid and Sear** (Sear), of **Trimble** (Trimble) whose 1974 and 1999 papers on the southern American fall-line stores founded the field, and of **Van Oost, Verheggen, Heckelmann and the Van Rompaey school** using caesium-137. The **self-similarity** of river networks and its relation to critical phenomena is the work of **Rigon, Rodriguez-Iturbe, Maritan, La Barbera and Banavar** (Iturbe) in 1994.
:::

## Shape, relief and the hypsometric curve

::: definition Basin shape indices {#def-shape}
The **elongation ratio** is $R_e = 2\sqrt{A/\pi}/L_\text{max}$, which is 1 for a circle and 0.71 for a square; a low value means an elongate basin that drains efficiently and gives a **flashy, peaked** flood hydrograph, and a high value means a compact basin that gives a **broad, delayed** one. The **circularity ratio** is the ratio of the basin's area to that of a circle of the same perimeter, and the **form factor** is $A/L_c^2$ for the axial length $L_c$. The **sinuosity** of the main channel is its length divided by the valley's axial length. These indices are used in engineering hydrology to build a unit hydrograph for an ungauged catchment, and they are the reason a flood can be forecast from a map.
:::

::: definition The hypsometric curve {#def-hypsometry}
The **hypsometric curve** is the cumulative distribution of a basin's elevations, plotted as the fraction of the area above a given height against the normalised height. The **hypsometric integral** is the area under it,
$$
HI = \frac{\bar{z} - z_\text{min}}{z_\text{max} - z_\text{min}},
$$
and it is a measure of how much of the basin's original mass has been removed. Strahler (Strahler) interpreted $HI > 0.6$ as **youthful**, $0.35$–$0.6$ as **mature** and $< 0.35$ as **monadnock** or old-age, on the argument that a young basin has most of its area near the original high surface and an old one has most of it near the base level. The interpretation has been repeatedly qualified: the hypsometric integral depends on the **uplift and erosion history**, on the **lithological structure** — a basin underlain by a resistant cap rock over soft shale has a high integral whatever its age — and on the **shape of the initial surface**, so that a high integral may mean a young basin, a resistant lid, or a recently tilted fault block.
:::

::: example Reading a basin's age from its shape {#ex-hypsometry}
Two basins of similar area and climate have the following data. Basin A: $z_\text{max} = 1420\ \mathrm{m}$, $z_\text{min} = 180\ \mathrm{m}$, mean elevation $890\ \mathrm{m}$, drainage density $2.9\ \mathrm{km\,km^{-2}}$, $R_b = 3.6$. Basin B: $z_\text{max} = 1420\ \mathrm{m}$, $z_\text{min} = 180\ \mathrm{m}$, mean elevation $410\ \mathrm{m}$, drainage density $1.1\ \mathrm{km\,km^{-2}}$, $R_b = 4.4$. Interpret.
::: solution
$$
HI_A = \frac{890 - 180}{1420 - 180} = \frac{710}{1240} = 0.57, \qquad
HI_B = \frac{410 - 180}{1240} = 0.19 .
$$
Basin A is **mature to youthful**, with most of its area still high, and it has a **dense** channel network and a low bifurcation ratio. Basin B is **old**, with 81 per cent of its mass removed, and it has a **sparse** network and a high bifurcation ratio.

The two readings are consistent and they tell a single story. Basin A is being **actively dissected**: its high hypsometric integral and its dense network mean that channels have extended headward into a surface that has not yet been lowered much, and its low $R_b$ means the network is still linking up. Basin B is a **relict, low-relief erosional surface** — a **peneplain** or a **pediment** — whose channels have cut down to a low level, whose interfluves have been reduced to remnants, and whose network is sparse because the remaining hillslopes are short and the channels are widely spaced and well linked.

The alternative reading to exclude is **lithology**. A basin under a resistant cap rock keeps a high integral for a long time, and a basin in soft mudrock reaches a low integral quickly; and a dense network can mean soft rock rather than active dissection. The discriminator is the **channel-head gradient and the sediment flux**: an actively dissecting basin exports a high sediment load with a coarse bedload, and a relict one exports little and carries a fine, reworked, sometimes pedogenic load. The second discriminator is the **cosmogenic denudation rate**, which in Basin A should be several times that in Basin B.
:::
:::

::: example The time of concentration {#ex-tc}
The **Kirpich (Kirpich) formula** for a catchment's time of concentration is
$$
t_c = 0.0195\,L^{0.77}\,S^{-0.385} \quad \text{minutes},
$$
with $L$ the longest flow path in metres and $S$ the average slope in m/m. Find $t_c$ for an 8-km catchment with a slope of 0.02, for the same catchment with a slope of 0.005, and for a 2-km urban catchment with a slope of 0.02. What does the result say about urban flood peaks?
::: solution
$$
L = 8000\ \mathrm{m},\ S = 0.02:\quad t_c = 0.0195\times1012\times4.51 = 89\ \mathrm{min};
$$
$$
S = 0.005:\quad t_c = 152\ \mathrm{min}; \qquad
L = 2000\ \mathrm{m},\ S = 0.02:\quad t_c = 31\ \mathrm{min}.
$$
The time of concentration is the time over which the whole catchment can contribute to the peak, and it is the **duration of the design storm** in the rational method: a storm shorter than $t_c$ cannot bring the whole catchment into the peak, and a storm longer than $t_c$ wastes its later rain on a catchment that has already contributed.

The urban consequence follows immediately. A 2-km catchment has a $t_c$ of 31 minutes against 89 minutes for the 8-km rural one, so a small urbanised catchment responds to a **short, intense convective storm** that a large rural catchment would average out, and its peak discharge per unit area is correspondingly larger. Paving a catchment does three things at once: it raises the runoff coefficient, it raises the peak, and — because pipes and culverts are faster than overland flow — it **shortens** $t_c$, which shifts the design storm to a shorter, more intense, and therefore rarer event. A drainage system designed on the rural $t_c$ will be overwhelmed by exactly the storms that the urbanised catchment is now most sensitive to.

The caution is that Kirpich's formula was fitted to **steep rural agricultural catchments in Tennessee** and that it performs badly on flat, urbanised or channel-dominated catchments, where the travel time is set by the pipe network rather than by the topography. Its value in geomorphology is not as a predictor but as a **dimensional statement**: the response time of a landscape scales as $L^{0.77}$ and $S^{-0.385}$, so a basin's flood response is set by its **shape and relief** — which is why the morphometric indices of the last two sections are engineering hydrology as well as geomorphology.
:::
:::

## The cascade

::: definition Sediment routing {#def-cascade}
A basin is a **sediment cascade** in which material produced on the hillslopes is stored, reworked and released by a sequence of **sinks** — the hillslope hollow, the valley floor, the floodplain, the reservoir, the lake, the estuary — before it leaves. The **sediment delivery ratio** is the fraction of the eroded material that reaches the outlet, and it falls from unity on a small, steep, well-connected catchment to 0.01–0.1 on a large, lowland one, because the floodplain and the reservoirs intercept it. The **travel time** of a sediment packet through a basin is commonly $10^2$–$10^5$ years, and it is measured by the cosmogenic or radiocarbon age of the sediment at the outlet relative to its source. The consequence is that a river's **load at the outlet is a time-averaged, spatially mixed and strongly delayed** signal of the erosion happening on its hillslopes, and that a cosmogenic denudation rate measured at a gauging station is an average over the whole catchment and over the last few tens of thousands of years, not a measurement of what the hillslopes are doing now.
:::

::: example A sediment budget {#ex-cascade}
A $600\ \mathrm{km^2}$ catchment delivers $4\times10^{5}\ \mathrm{t\,yr^{-1}}$ of suspended sediment and $2\times10^{4}\ \mathrm{t\,yr^{-1}}$ of dissolved load to its outlet. The hillslopes are estimated to produce $3.0\times10^{6}\ \mathrm{t\,yr^{-1}}$ of tillage and water erosion. Find the sediment delivery ratio, the storage rate, and the time over which the catchment's floodplain store would be filled if it holds $10^{8}\ \mathrm{t}$.
::: solution
The total yield at the outlet is $4.2\times10^{5}\ \mathrm{t\,yr^{-1}}$, so the **sediment delivery ratio** for the hillslope source is
$$
\mathrm{SDR} = \frac{4\times10^{5}}{3.0\times10^{6}} = 0.13 .
$$
The **storage rate** is the difference,
$$
3.0\times10^{6} - 4\times10^{5} = 2.6\times10^{6}\ \mathrm{t\,yr^{-1}},
$$
which over $6\times10^{8}\ \mathrm{m^2}$ is $4.3\ \mathrm{t\,ha^{-1}\,yr^{-1}}$ of net accumulation on the valley floors and floodplain. A store of $10^{8}\ \mathrm{t}$ would be filled in
$$
\frac{10^{8}}{2.6\times10^{6}} = 38\ \mathrm{yr},
$$
which is far shorter than the age of any floodplain — so the store is **not** filling, and either the erosion estimate is too high, or the floodplain is being reworked and its older sediment is being carried out, or the "missing" sediment is going to a reservoir or a lake that is not in the budget.

That contradiction is the point of the exercise. A sediment budget that does not close is the normal condition, and the discrepancy is the most informative number in it. The three usual resolutions are that the **hillslope erosion estimate is a gross plot-scale number** that over-counts the material that never leaves the field; that the **floodplain is a source as well as a sink**, being eroded on the outside of bends while it aggrades on the inside; and that the **catchment is not in equilibrium**, so that the load at the outlet is the legacy of a stored sediment pulse from a previous land use or a previous climate, released over centuries. In England, France and the eastern United States the last of these dominates: the rivers are still draining the sediment of the nineteenth-century mouldboard plough, and their present load will continue to rise for decades even if erosion at the source is stopped today.
:::
:::

::: warning A morphometric law is a description, not a mechanism
Horton's laws, the drainage-density controls, the hypsometric interpretation and the slope–area relation are all **empirical regularities** whose causal status is contested, and the failure mode of quantitative geomorphology is to read them backwards. A **high bifurcation ratio** does not prove a young basin; it may prove only that the headwaters were not mapped. A **high hypsometric integral** does not prove a young landscape; a resistant lid or a recently tilted fault block produces the same curve, and a basin can hold a high integral for tens of millions of years. A **low drainage density** does not prove an arid climate; it may prove a permeable limestone or a deeply rooted grass sward. And the **self-similarity** of the network — the constancy of $R_b$ across scale — is a statement about the statistics of the network and says nothing about the process that made it, since a random tiling, an optimal-energy network and a critical-percolation cluster all give the same ratios. The discipline is to treat every morphometric index as a **hypothesis generator** rather than a diagnosis, and to test the hypothesis with the four independent observations that geomorphology now has: a cosmogenic denudation rate, a dated stratum, a sediment flux, and a map of the lithology and the structure. Where those four agree with the morphometry, the interpretation stands; where they do not, the morphometry was telling the truth about something else.
:::

::: quiz
A basin has a hypsometric integral of 0.72 and a drainage density of 0.5 km/km². Which reading is most defensible?
- [ ] It is a young, actively dissecting landscape.
- [x] It is a high, lightly dissected surface — which could be young, or could be a resistant or arid surface that has simply not been cut.
- [ ] It is an old peneplain.
- [ ] Its rocks are soft mudrock.
::: solution
A high integral says most of the area is still near the original high surface, and a low density says few channels. Both are consistent with a young dissecting surface, but equally with an arid or permeable-limestone surface whose channels are sparse whatever its age, or with a resistant cap that keeps the relief. The morphometry alone cannot choose, and the discriminator is an independent denudation rate, a dated surface, or a lithological map. Soft mudrock would give a high, not a low, drainage density.
:::
:::

## Where this leads

The hillslopes that supply the network are in [[geomorphology/hillslopes]] and the channels are in [[geomorphology/rivers]], the runoff that drives the hydrograph is in [[hydrology/runoff]] and [[hydrology/water-balance]], the floods are in [[hydrology/floods-droughts]], the sediment it delivers is in [[sedimentology/basins-sequences]], the landsliding that carves many of the hollows is in [[natural-hazards/landslides]], and the tectonics that sets the relief is in [[structural-geology/orogens]] and [[geophysics/flexure]].

::: summary
- Horton's laws describe a self-similar channel network with a bifurcation ratio of 3–5, an empirical regularity that no mechanism has yet derived.
- Drainage density measures the ratio of channel length to hillslope area and responds to rock, climate, vegetation, structure and time.
- The hypsometric integral measures how much of a basin's mass has been removed, and it is as much a lithological as a chronological index.
- Basin shape controls the flood hydrograph, which is why the shape indices are engineering hydrology as well as geomorphology.
- A basin is a sediment cascade with a delivery ratio well below one, and its load is delayed, mixed and often a legacy.
- Morphometric laws generate hypotheses; they do not prove mechanisms, and they must be tested against dates, fluxes and maps.
:::

## Exercises

::: exercise Bifurcation ratio {level=1 check="4"}
A basin has 120 first-order, 30 second-order, 8 third-order and 2 fourth-order streams. Find the mean bifurcation ratio.
::: solution
$120/30 = 4.0$, $30/8 = 3.75$, $8/2 = 4.0$; the mean is $3.9$, a normal value. The network is in equilibrium with its processes.
:::
:::

::: exercise Drainage density {level=1 check="1.6"}
A $250\ \mathrm{km^2}$ basin has 400 km of mapped channel. Find the drainage density.
::: solution
$D = 400/250 = 1.6\ \mathrm{km\,km^{-2}}$, a moderately dense humid-temperate network.
:::
:::

::: exercise Hypsometric integral {level=1 check="0.35"}
A basin ranges from 120 m to 940 m with a mean elevation of 407 m. Find the hypsometric integral.
::: solution
$HI = (407 - 120)/(940 - 120) = 287/820 = 0.35$. A mature to old basin, with about two-thirds of its original mass removed — subject to the lithological caveat.
:::
:::

::: exercise Elongation {level=2}
Two basins of $400\ \mathrm{km^2}$ have maximum lengths of 40 km and 22 km. Find their elongation ratios and say which gives the flashier flood.
::: solution
For the circle of the same area, $2\sqrt{A/\pi} = 2\sqrt{400/\pi} = 22.6\ \mathrm{km}$.
$$
R_{e,1} = \frac{22.6}{40} = 0.56 \quad(\text{elongate}); \qquad
R_{e,2} = \frac{22.6}{22} = 1.03 \quad(\text{circular}).
$$
The **circular** basin gives the flashier flood, because water falling anywhere in it is at most a short distance from the outlet and the contributions arrive together. The elongate basin's hydrograph is broad and delayed, because the upstream half's water arrives hours after the downstream half's. This is why the shape indices are used to build unit hydrographs for ungauged catchments.
:::
:::

::: exercise Topographic index {level=2 check="7.4"}
The saturation-excess runoff mechanism is driven by the TOPMODEL index $\ln(a/\tan\beta)$, where $a$ is the upslope contributing area per unit contour length and $\beta$ the local slope. Find the index for $a = 120\ \mathrm{m}$ and $\beta = 4^\circ$.
::: solution
$\tan 4^\circ = 0.0699$, so $a/\tan\beta = 120/0.0699 = 1717$ and $\ln 1717 = 7.4$. A high index means a convergent, low-slope hollow that saturates first and generates runoff by saturation excess; a low index means a divergent, steep hillslope that drains infiltrating water and never saturates. The index's spatial pattern therefore **maps the contributing area in advance**, and it is the reason that a catchment's runoff can be predicted from its topography alone.
:::
:::

::: exercise A network that is not Hortonian {level=2}
A basin's channel network gives $R_b = 8.5$ for the first three orders and 2.1 for the last two. What is happening?
::: solution
Two different regimes are present. The **high low-order ratio of 8.5** means that many first- and second-order channels feed each third-order channel — a **dendritic, inefficient, poorly linked** headwater network, typical of a recently uplifted or recently deglaciated area, or of a soft-rock landscape whose headwalls are still extending. The **low high-order ratio of 2.1** means that the trunk stream is fed by few large tributaries, which is typical of a basin whose lower orders are **structurally controlled** — a trellis or rectangular pattern in which the tributaries enter along a joint set or a weak bed — or of a basin whose lower trunk has been **superimposed** on an older pattern.

The interpretation is a basin with an **unfinished headward network** above a **structurally controlled trunk**, and the test is the drainage pattern on the map: a trellis or rectangular pattern in the lower part and a dendritic pattern above would confirm it, and a DEM hillshade would show it immediately.
:::
:::

::: exercise A landscape in transition {level=3}
A mountain front has three adjacent catchments of similar area, lithology and climate. Their hypsometric integrals are 0.71, 0.52 and 0.28, their drainage densities 3.4, 2.1 and 0.9, and their cosmogenic denudation rates 1400, 620 and 90 µm/yr. Interpret, and identify the process that makes the difference.
::: solution
The three catchments lie on a **morphometric and denudational sequence** that runs from a high integral, a dense network and a high denudation rate to a low integral, a sparse network and a low rate. The correlation between the hypsometric integral and the denudation rate is **positive**, which is the expected relation for a landscape in which the channels are actively incising and the relief is being maintained: the more the base level cuts, the higher the relief, the denser the network, and the higher the integral, because the upland surface has not yet been consumed.

The process that makes the difference is **incision at the outlet**, and the usual cause in a mountain front is a difference in the **rock** at the base of the escarpment or in the **active fault** at its foot. The fast catchment drains across an active strand of the range-front fault or across a weak formation, its base level is dropping fast, and it is a **bedrock-channel, transport-coupled** system with a steep long profile and a high sediment flux. The slow catchment drains across the foot of an inactive or a resistant segment, its base level is nearly stable, and it is a **decoupled** system whose channels are alluvial, whose hillslopes are shedding slowly, and whose upland is a relict surface.

The test is threefold. The **bedrock channel** should be exposed in the fast catchment and buried under alluvium in the slow one. The **knickpoint** or the fault scarp should be visible at the outlet of the fast catchment. And the **cosmogenic depth profile** on the fast catchment's upland should show a surface that has been stripped recently, while the slow catchment's upland should show a deep, undisturbed, old regolith. Where all three agree, the morphometry has been converted from a description into a measurement of the tectonics.
:::
:::

::: exercise Legacy sediment {level=3}
A midwestern American river's sediment load at its gauging station rose from $2\times10^{6}\ \mathrm{t\,yr^{-1}}$ in 1940 to $8\times10^{6}\ \mathrm{t\,yr^{-1}}$ in 2000, while its hillslope erosion, measured by caesium-137 and by plot studies, has been **constant** since 1980 and lower than in the 1930s. Explain.
::: solution
The load is rising while the source is not, so the extra sediment is coming from **storage**. The catchment's floodplains, valley floors and gullies were loaded with sediment during the great erosion episode of the 1850s to 1930s, when the prairie was broken and the mouldboard plough was applied to the steepest ground; that pulse is now being **remobilised** as the channels, deepened and stabilised by later land use, cut into their own alluvium. The river is draining a **legacy** — a century-old sediment store — and its load is a measure of the connectivity of that store, not of the present hillslope erosion.

Three observations confirm the diagnosis. The **caesium-137 activity** of the channel's bedload should be low, because caesium-137 dates from 1954 and a low activity means the sediment came from below the 1954 layer — that is, from pre-1950 stored alluvium. The **channel cross-section** should be **deepening** at surveyed sections, which is the direct evidence of incision into the store. And the **sediment rating curve** should show a rising hysteresis within each flood, with the concentration higher on the rising limb, which is the signature of a supply that is being scoured out rather than delivered from the hillslopes.

The consequence is the uncomfortable one for policy: because the store is large and the release is slow, the river's sediment load, and the eutrophication and the habitat damage that go with it, will **continue to rise for decades** even if the hillslope erosion were reduced to zero tomorrow. The only lever that acts quickly is to break the **connectivity** — to reconnect the floodplain, to build setbacks, to hold sediment in the hollows — rather than to try to reduce the erosion at its source.
:::
:::
