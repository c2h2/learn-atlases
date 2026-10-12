Every sedimentary rock is a statement about the distance between where a grain was born and where it died. A sand of well-rounded, well-sorted, almost pure quartz tells of a craton worn flat and a coast worked by waves for a hundred thousand years; a sand of angular feldspar and rock fragments tells of a mountain that fell down yesterday. Grain size is the single measurement that carries the most information per unit of effort in all of sedimentology, and it is the only one that can be made on a hand specimen, on a drill cutting, on a well-log curve, or from a photograph of the seafloor. This lesson is about the physics of that one number and about the surprisingly large apparatus built on top of it.

## The size of a grain

::: definition The Wentworth scale and the phi system {#def-wentworth}
Grain size is reported in millimetres $d$ or, more usefully, in the logarithmic **phi** scale,
$$
\phi = -\log_2 d\ (\mathrm{mm}), \qquad d = 2^{-\phi}\ \mathrm{mm},
$$
so that each unit of $\phi$ is one half-octave of diameter. The Wentworth classes follow: boulder $>256$ mm, cobble 64–256, pebble 4–64, granule 2–4, **sand** $-1$ to $4\ \phi$ (0.0625–2 mm), **silt** 4–9 $\phi$ (3.9–62.5 µm) and **clay** coarser than $9\ \phi$ (finer than 3.9 µm). Sand is subdivided into very coarse, coarse, medium, fine and very fine at half-phi intervals; the boundary between sand and silt at $4\ \phi$ is the size below which particles remain in suspension in still water for geologically long times, and the boundary between silt and clay at $9\ \phi$ is the size below which surface charge and electrochemistry, rather than weight, control a particle's behaviour.
:::

::: definition Statistical descriptors {#def-moments}
A natural sediment is a distribution, and it is described by four numbers computed from its cumulative curve at the 5th, 16th, 25th, 50th, 75th, 84th and 95th percentiles (Folk and Ward). The **graphic mean** is
$$
M_z = \tfrac{1}{3}(M_{16} + M_{50} + M_{84}),
$$
the **inclusive standard deviation** (the *sorting*) is
$$
\sigma_I = \left|\frac{M_{84} - M_{16}}{4} + \frac{M_{95} - M_5}{6.69}\right|,
$$
the **skewness** is
$$
S_K = \frac{M_{16} + M_{84} - 2M_{50}}{2(M_{84} - M_{16})} + \frac{M_5 + M_{95} - 2M_{50}}{2(M_{95} - M_5)},
$$
and the **kurtosis** (the *peakedness*) is
$$
K = \frac{M_{95} - M_5}{2.44\,(M_{75} - M_{25})} .
$$
Sorting is classified as very well sorted ($\sigma < 0.35\ \phi$), well sorted (0.35–0.50), moderately well sorted (0.50–0.71), moderately sorted (0.71–1.00), poorly sorted (1.00–2.00) and very poorly sorted ($>2\ \phi$). Skewness is negative for a distribution with a tail of fine particles and positive for one with a tail of coarse particles.
:::

::: example The four numbers of a beach sand {#ex-moments}
A beach sand gives the following cumulative percentiles in $\phi$: $M_5 = 3.9$, $M_{16} = 2.8$, $M_{25} = 2.5$, $M_{50} = 1.8$, $M_{75} = 1.0$, $M_{84} = 0.9$, $M_95 = 0.3$. Compute the four Folk–Ward statistics and describe the sand.
::: solution
The graphic mean is
$$
M_z = \tfrac{1}{3}(2.8 + 1.8 + 0.9) = 1.83\ \phi \quad\Longleftrightarrow\quad d = 2^{-1.83} = 0.28\ \mathrm{mm},
$$
which is a **medium sand**. The sorting is
$$
\sigma_I = \left|\frac{0.9 - 2.8}{4} + \frac{0.3 - 3.9}{6.69}\right| = |-0.475 - 0.538| = 1.01\ \phi,
$$
which is at the boundary between moderately sorted and **poorly sorted**. The skewness is
$$
S_K = \frac{2.8 + 0.9 - 3.6}{2(0.9 - 2.8)} + \frac{3.9 + 0.3 - 3.6}{2(3.9 - 0.3)} = \frac{0.1}{-3.8} + \frac{0.6}{-7.2} = -0.026 - 0.083 = -0.11,
$$
a slight **fine skewness**, and the kurtosis is
$$
K = \frac{0.3 - 3.9}{2.44\times(1.0 - 2.5)} = \frac{-3.6}{-3.66} = 0.98,
$$
which is **mesokurtic** — close to a normal distribution in $\phi$.

The interpretation is that this is not a beach sand at all. A beach sand is the product of weeks of wave working and is characteristically well sorted, with $\sigma$ of $0.3$–$0.5\ \phi$, and it is characteristically **coarse skewed** because the swash winnows fines away to the offshore. A medium sand that is poorly sorted and slightly fine skewed is a **fluvial** or **deltaic** sand, or a beach that has been reworked by a storm into the offshore and is being returned to the shore in a single season. The four numbers have already narrowed the environment from "a sand" to "a sand deposited by a river or by a storm", and they have done it without a single look at a thin section.
:::
:::

::: widget plot
f: exp(-((x-2.0)*(x-2.0))/(2*0.5*0.5))
x: -1, 6
y: 0, 1.05
labels: \text{frequency}
caption: The frequency distribution of a well-sorted sand plotted against $\phi$, as a normal curve with a mean of $2.0\ \phi$ (0.25 mm) and a standard deviation of $0.5\ \phi$. Because grain sizes in most sediments are approximately log-normal, the distribution is symmetric in $\phi$ and grossly skewed in millimetres — which is the entire reason the $\phi$ scale was invented. Note that the horizontal axis runs from coarse on the left to fine on the right, because $\phi$ increases as the grains get smaller; every cumulative plot in sedimentology has this reversed sense, and every sedimentologist gets it wrong once.
:::

## Why grains sink

::: proposition Settling velocity {#prop-settling}
A sphere of diameter $d$ and density $\rho_s$ settling in a fluid of density $\rho_f$ and dynamic viscosity $\mu$ reaches a terminal velocity at which its submerged weight balances the drag. In the viscous regime, where the particle Reynolds number $\mathrm{Re} = w d/\nu$ is below about 0.3, Stokes' law gives
$$
w = \frac{(\rho_s - \rho_f)\,g\,d^2}{18\,\mu} .
$$
Settling velocity therefore scales as the **square** of diameter: a grain twice as diameter sinks four times faster. In the intermediate regime relevant to most sands the Ferguson–Church formula
$$
w = \frac{R\,g\,d^2}{C_1\,\nu + \left(C_2\,R\,g\,d^3 + 0.751\,\nu^2\right)^{1/2}}, \qquad C_1 = 18,\ C_2 = 1.0,
$$
with $R = (\rho_s - \rho_f)/\rho_f$, reproduces observations to within ten per cent from clay to gravel.
:::

::: proof
Balance forces on the sphere. The submerged weight is $(\rho_s - \rho_f)g\,\pi d^3/6$. The drag on a sphere is $C_D\,\pi d^2\,\rho_f w^2/8$, where $C_D = 24/\mathrm{Re}$ at low Reynolds number. Setting the two equal and substituting $\mathrm{Re} = wd/\nu$ gives
$$
(\rho_s - \rho_f)g\,\frac{\pi d^3}{6} = \frac{24\nu}{wd}\,\frac{\pi d^2 \rho_f w^2}{8} = 3\pi \mu w d ,
$$
which rearranges to Stokes' law. The quadratic dependence on $d$ follows because the weight grows as $d^3$ while the viscous drag grows only as $w d$. The Ferguson–Church form is obtained by writing the drag coefficient as the sum of a viscous term $24/\mathrm{Re}$ and a pressure-drag term of order unity, $C_D = C_1/\mathrm{Re} + C_2^{1/2}\mathrm{Re}/(\ldots)$, and solving the resulting quadratic for $w$; the constants are fitted, and the $0.751\,\nu^2$ term is an empirical correction that makes the formula pass smoothly through the transition near $\mathrm{Re} = 1$.
:::

::: example From clay to cobble {#ex-settling}
Using the Ferguson–Church formula with $R = 1.65$ for quartz in fresh water at 20 $^\circ$C ($\nu = 1.0\times10^{-6}\ \mathrm{m^2\,s^{-1}}$), find the settling velocity of grains of 2 µm, 62 µm, 0.2 mm, 0.5 mm and 2 mm, and say how long a 2-µm particle takes to fall through a 4-km water column.
::: solution
$$
\begin{array}{lcc}
d\ (\mathrm{mm}) & w\ (\mathrm{mm\,s^{-1}}) & \text{class} \\ \hline
0.002 & 0.00034 & \text{clay} \\
0.062 & 0.0031 & \text{silt / clay boundary} \\
0.20 & 0.022 & \text{medium sand} \\
0.50 & 0.064 & \text{coarse sand} \\
2.0 & 0.171 & \text{granule}
\end{array}
$$
The 2-µm clay settles at $3.4\times10^{-7}\ \mathrm{m\,s^{-1}}$, so through 4 km it takes
$$
\frac{4000}{3.4\times10^{-7}} = 1.2\times10^{10}\ \mathrm{s} = 380\ \mathrm{yr}.
$$
The 0.2-mm sand grain takes $4000/0.022 = 1.8\times10^{5}\ \mathrm{s} = 2.1$ days.

Three consequences follow and they organise the whole of marine sedimentology. First, **clay does not reach the deep sea by settling**; it is flocculated into aggregates of tens of microns in the estuarine turbidity maximum, so that much of it is deposited near the river mouth, and what escapes does so in marine snow, in faecal pellets, or as the interstitial fines of turbidites. Second, the **ten-thousand-fold range in settling velocity** between clay and coarse sand is why a single turbidity current deposits mud 500 km from its source and gravel on its margin: the current outruns its coarse load and delivers its fines far beyond it. Third, a **still-water column sorts itself by depth**, which is why the varves of a glacial lake and the rhythmites of a proglacial fjord are annual records written in grain size.
:::
:::

::: example Hydraulic equivalence: why heavy minerals concentrate {#ex-hydraulic}
A placer deposit contains quartz ($\rho_s = 2650\ \mathrm{kg\,m^{-3}}$), garnet ($4200$) and magnetite ($5200$). Using the settler-diameter relation $d_s = d\,(\rho_s/\rho_f)^{0.85}$, find the diameter of quartz grain that is hydraulically equivalent to a 0.20-mm garnet and to a 0.20-mm magnetite.
::: solution
With $\rho_f = 1000\ \mathrm{kg\,m^{-3}}$ the density factors are
$$
(2.65)^{0.85} = 2.29, \qquad (4.20)^{0.85} = 3.39, \qquad (5.20)^{0.85} = 4.06 .
$$
A 0.20-mm garnet has $d_s = 0.20\times3.39 = 0.677$, so the equivalent quartz grain has
$$
d = \frac{0.677}{2.29} = 0.30\ \mathrm{mm},
$$
and a 0.20-mm magnetite has $d_s = 0.812$, equivalent to quartz of $0.812/2.29 = 0.35\ \mathrm{mm}$.

A heavy-mineral grain is therefore hydraulically equivalent to a quartz grain **1.5 to 1.8 times its diameter**, and this is why a beach placer concentrates garnet, ilmenite, rutile and zircon in a "black sand" layer that is coarser than the sand above and below it: the wave-swash sorts by **hydraulic diameter**, not by diameter, and it puts a fine garnet with a coarse quartz. The same principle explains why dense grains are under-represented in the fine fraction of a heavy-mineral separate and why the "ZTR index" — the proportion of zircon, tourmaline and rutile among the transparent heavy minerals — must be measured on a narrow size fraction if it is to be used as a maturity indicator.
:::
:::

::: quiz
Two sands have the same median diameter. Sand X has $\sigma = 0.3\ \phi$ and a positive skewness; sand Y has $\sigma = 1.4\ \phi$ and a negative skewness. Which statement is best supported?
- [ ] Sand X has travelled further than sand Y.
- [ ] Sand Y is coarser than sand X.
- [x] Sand X has been worked by a winnowing agent that removed its fines; sand Y was deposited from a flow that stopped suddenly.
- [ ] Sand Y is more mature in composition than sand X.
::: solution
Sorting and skewness describe the **flow**, not the distance travelled and not the composition. A well-sorted, coarse-skewed sand is the product of repeated winnowing — waves, wind, or a swash that carries fines away — and a poorly sorted, fine-skewed sand is the product of a flow whose competence collapsed, dropping sand and mud together. Distance travelled affects both, but it is neither necessary nor sufficient, and composition is a separate measurement entirely.
:::
:::

## What grains are made of

::: definition Framework composition and provenance {#def-qfl}
A sandstone's framework is classified on a triangular diagram of **monocrystalline and polycrystalline quartz (Q)**, **alkali and plagioclase feldspar (F)**, and **rock fragments (L)**. The names follow: quartz arenite (Q/(Q+F+L) > 95 %), subquartz arenite (90–95 %), quartz wacke, subarkose and arkose (F/(Q+F+L) > 25 %), lithic arkose, feldspathic litharenite and litharenite (L/(Q+F+L) > 50 % with F < Q). Because quartz and feldspar are destroyed by weathering in a predictable order — plagioclase first, then K-feldspar, then micas, with quartz and the polycyclic rock fragments surviving — the position on the diagram is a **provenance** indicator: cratonic or recycled-orogen sources trend toward Q, magmatic arcs toward Q+F, and dissected arcs or accretionary complexes toward L. The **ZTR index**, the proportion of zircon, tourmaline and rutile among the transparent heavy minerals, rises with the intensity and duration of weathering and with the age of the source terrane, and it is the single best chemical maturity index available.
:::

::: definition Roundness and sphericity {#def-shape}
**Sphericity** $\Psi$ is the closeness of a grain's shape to a sphere, measured by Wadell as $\Psi = (bc/a^2)^{1/3}$ for principal axes $a \geq b \geq c$, and **roundness** is the sharpness of its corners and edges, judged against the Powers comparison chart on a six-point scale from angular to well rounded. The two are independent: a flat pebble may be perfectly rounded and terribly unspherical. Roundness increases with the distance travelled and with the energy of transport, and it decreases with grain size at a given energy because a coarse grain's asperities are too large to be abraded away in the same time.
:::

::: example A sandstone in three numbers {#ex-qfl}
A thin section of 300 points gives 168 monocrystalline quartz, 12 polycrystalline quartz, 40 alkali feldspar, 24 plagioclase, 34 chert and volcanic rock fragments, 14 mica and 8 heavy minerals. Classify it and infer the provenance.
::: solution
Grouping the counts, $Q = 168 + 12 = 180$, $F = 40 + 24 = 64$, and $L = 34 + 14 = 48$ (micas are conventionally grouped with rock fragments, and the opaque and non-opaque heavy minerals are counted separately and excluded from the QFL sum). The total is 292, so
$$
Q = 62\ \%, \qquad F = 22\ \%, \qquad L = 16\ \% .
$$
On the Folk diagram this plots in the **feldspathic wacke to subarkose** field, and on the Dott field it is a **protoquartz arenite to subarkose**. The feldspar is 22 per cent of the framework, just below the 25 per cent boundary of an arkose, and the rock fragments are dominated by chert and volcanic material.

The provenance follows from the combination. Feldspar has survived, so the sand was **not** intensely weathered and was not recycled through a long-lived soil; the source was close, cool or arid. Rock fragments of volcanic lithics and chert point to a **dissected volcanic arc or a magmatic highland**, and the low mica and the absence of sedimentary rock fragments argue against a recycled orogen. The sand is a **first-cycle sediment from a nearby arc**, and the whole tectonic setting of the basin follows from 300 counts under a microscope.
:::
:::

::: warning Grain size is a measurement of the flow, not of the grain
It is tempting to read a sandstone's grain size as a property of its source, and it is not. The same craton supplies coarse sand to a braided river, fine sand to a tidal flat and silt to the shelf mud, and the difference is entirely in the flow. Grain size in a deposit records the **competence** of the transporting agent at the moment of deposition, and competence depends on velocity, on turbulence, on the presence of waves and on the concentration of the sediment itself. Three specific traps follow. **Reworking** resets the signal: a Cretaceous sand reworked by a Miocene beach records the Miocene wave energy and the Cretaceous mineralogy, and the two must be interpreted separately. **Sorting is not transport distance**: well-sorted sand can be deposited metres from its source by a wind or a beach, and poorly sorted sand can travel thousands of kilometres in a large river. And **the finest fraction is often an afterthought**: in a turbidite the mud is deposited from the same flow that laid the sand beneath it, and its thickness, not the sand's grain size, is the better measure of the flow's total sediment concentration. The discipline is to ask, of every grain-size measurement, what process could have produced this size **in this place at this moment**, and to reject the answer "because the source was coarse".
:::

## Where this leads

The flow conditions that grain size records are developed in [[sedimentology/sediment-transport]] and [[sedimentology/bedforms]]; the classification of the resulting rocks and the environments that produce them are in [[sedimentology/facies]], [[sedimentology/continental-environments]] and [[sedimentology/marine-environments]]; the diagenetic destruction of the primary signal is in [[sedimentology/stratigraphy]]; and the chemistry of the source rocks is in [[geochemistry/trace-elements]] and [[mineralogy-petrology/silicates]].

::: history
The logarithmic size scale was proposed by Krumbein and Pettijohn in the 1930s after Wentworth (Wentworth) fixed the class names and boundaries in 1922, and the $\phi$ notation itself is due to Krumbein in 1934. The statistical descriptors came from the same school — Inman's graphical statistics of 1952 and Folk and Ward's (Ward) 1957 paper, which is the most-cited single page in sedimentology and which fixed the four-number description still used in every laboratory. The fluid mechanics of settling was worked out by Stokes in 1851 for the viscous regime, by Rittinger and by Rubey in the 1930s for the transition, and by Ferguson and Church in 2004 for the unified formula. The provenance diagrams are the work of Robert Folk (Folk, 1968) and of Francis Dott (Dott, 1964), whose rival classifications were reconciled by Ingersoll and Suczek in 1979 into the QFL scheme used today; the tectonic discrimination diagrams that grew from them, of Dickinson and Suczek, appeared in 1979 and remain both the most useful and the most abused tools in the subject. Heavy-mineral and settler-diameter methods come from the work of Gulliver and Hart in the 1970s on the hydraulics of mineral placers.
:::

::: summary
- Grain size is reported in $\phi = -\log_2 d$(mm), one unit per half-octave, with sand between $-1$ and $4\ \phi$.
- A distribution is described by four numbers: graphic mean, sorting, skewness and kurtosis, computed from the 5th to 95th percentiles of the cumulative curve.
- Settling velocity scales as $d^2$ in the viscous regime and spans four orders of magnitude between clay and coarse sand.
- Grains of different density travel together when their **settler diameters** match, which is why heavy minerals concentrate in coarse lag deposits.
- Framework composition (QFL and ZTR) records the source terrane and the intensity of weathering; grain size records the flow.
- Roundness and sorting increase with the work done on a grain, and both are reset by reworking.
:::

## Exercises

::: exercise Phi conversion {level=1 check="-1"}
What is $\phi$ for a grain 2 mm in diameter?
::: solution
$\phi = -\log_2 2 = -1$. Negative $\phi$ means coarser than 1 mm; the sand–granule boundary is at $-1\ \phi$.
:::
:::

::: exercise Size classes {level=1 check="4"}
A particle has $\phi = 4$. What is its diameter in mm and what is it called?
::: solution
$d = 2^{-4} = 0.0625\ \mathrm{mm} = 62.5\ \mu\mathrm{m}$, which is exactly the **sand–silt boundary**. A particle at $4\ \phi$ is the finest that behaves as a sand and the coarsest that behaves as a silt.
:::
:::

::: exercise Stokes settling {level=1 check="0.36"}
Using Stokes' law with $\rho_s = 2650$, $\rho_f = 1000\ \mathrm{kg\,m^{-3}}$ and $\mu = 10^{-3}\ \mathrm{Pa\,s}$, find the settling velocity of a 20-µm particle in mm/s.
::: solution
$w = 1650\times9.81\times(2\times10^{-5})^2/(18\times10^{-3}) = 3.6\times10^{-4}\ \mathrm{m\,s^{-1}} = 0.36\ \mathrm{mm\,s^{-1}}$. The Reynolds number is $7\times10^{-3}$, so Stokes' law is valid.
:::
:::

::: exercise Sorting {level=2}
Two sands both have $M_{50} = 1.5\ \phi$. Sand A has $M_{16} = 2.0$ and $M_{84} = 1.0$; sand B has $M_{16} = 3.6$ and $M_{84} = -0.4$. Find the sorting of each and name the environments they most likely come from.
::: solution
Using the first term of the inclusive standard deviation, $\sigma \approx (M_{84} - M_{16})/4$:
$$
\text{A: } \sigma = \frac{|1.0 - 2.0|}{4} = 0.25\ \phi\ (\text{very well sorted}); \qquad
\text{B: } \sigma = \frac{|-0.4 - 3.6|}{4} = 1.00\ \phi\ (\text{poorly sorted}).
$$
Sand A, very well sorted at 0.35 mm, is a **beach or an aeolian dune** sand, the product of a winnowing agent that runs for a long time at a nearly constant competence. Sand B, poorly sorted at the same median, is a **fluvial channel lag, a debris-flow deposit or a turbidite**, in which the flow carried everything from coarse sand to mud together and stopped suddenly.
:::
:::

::: exercise Skewness {level=2}
A turbidite sand has $M_{16} + M_{84} - 2M_{50} = +0.4\ \phi$ with $M_{84} - M_{16} = -2.0\ \phi$. Find the first term of the Folk skewness and say what the sign means.
::: solution
$$
S_{K1} = \frac{+0.4}{2\times(-2.0)} = -0.10 .
$$
In the $\phi$ convention a negative skewness means the distribution has a **tail of fine particles** — a fine-skewed sand. This is exactly what a turbidite is: the flow wanes, the sand grade falls off sharply at the coarse end and gradually at the fine end as the mud is carried away, and the resulting distribution is fine skewed. A beach sand, by contrast, is coarse skewed, because the swash removes fines and leaves a tail of granules.
:::
:::

::: exercise Hydraulic equivalence {level=2 check="0.27"}
Using the settler-diameter relation of [[#ex-hydraulic]], find the diameter of quartz hydraulically equivalent to a 0.15-mm magnetite grain.
::: solution
$d_s = 0.15\times4.06 = 0.609$, so $d_\text{quartz} = 0.609/2.29 = 0.27\ \mathrm{mm}$. A magnetite grain is therefore carried by the flow as though it were a quartz grain nearly twice its diameter, which is why black sands are found in the coarsest part of a beach lag and never in the fine fraction.
:::
:::

::: exercise Provenance {level=3}
A sandstone gives Q = 88, F = 4, L = 8, and its heavy-mineral separate gives a ZTR index of 82. A second gives Q = 42, F = 30, L = 28 with a ZTR of 9. Interpret both and say what would falsify the interpretation.
::: solution
The first is a **quartz wacke to subquartz arenite** with an extremely high ZTR index: the framework is nearly pure quartz and the heavy minerals are nearly all the ultra-stable trio. This is a **mature** sand, and it records either a long transport history or, more likely, a source terrane that has itself been weathered and reworked many times — a cratonic interior or a recycled orogen whose sediments are themselves quartzites. The ZTR of 82 is the diagnostic number: zircon, tourmaline and rutile survive only the most prolonged chemical attack, so a value that high means the sediment has been through soil many times.

The second is a **lithic arkose to feldspathic litharenite** with a ZTR of 9: feldspar and rock fragments abundant, heavy minerals mostly unstable ones such as pyroxene, amphibole and epidote. This is an **immature, first-cycle sand from a nearby uplift**, most likely a magmatic arc or a dissected fold belt.

Three things would falsify the readings. **Diagenesis**: deep burial can dissolve feldspar and grow quartz overgrowths, moving an immature sand artificially toward the Q apex, so the presence of feldspar **replaced by** clay or of pressure-solution contacts must be checked. **Heavy-mineral hydraulic sorting**: a ZTR of 82 can be produced by placer concentration in a beach rather than by maturity, and the test is whether the ZTR rises systematically up through the stratigraphy (maturity) or only in the coarse lag horizons (placers). And **recycling**: a quartz arenite derived from the erosion of an older quartz arenite is texturally mature but tells nothing about the craton, so the heavy-mineral and zircon-age data are needed to distinguish a first-cycle cratonic sand from a recycled one.
:::
:::

::: exercise A settling calculation {level=3 check="1.3"}
A turbidity current 100 m thick carries a uniform cloud of 0.2-mm sand in suspension. If the current's velocity is 5 m/s and its settling velocity is 22 mm/s, how many days does a sand grain take to settle through the current's full thickness, and how far downstream would the current have travelled by then at that velocity? What does this imply for the extent of a sandstone body deposited from such a flow?
::: solution
The settling time is
$$
\frac{100\ \mathrm{m}}{0.022\ \mathrm{m\,s^{-1}}} = 4545\ \mathrm{s} = 1.3\ \mathrm{h},
$$
and in that time the current travels $5\times4545 = 22.7\ \mathrm{km}$. (The value $2.1$ days is the time a grain takes to settle through a 4-km **water column** at the same rate, which is the relevant number for the fines that escape the current.)

The implication is that a single turbidity current of this thickness and velocity deposits its **sand** within a few tens of kilometres of the slope, and cannot deposit its silt or its clay at all. A 62-µm silt grain settles at $3.1\ \mu\mathrm{m\,s^{-1}}$, which would take 370 days to fall 100 m and would carry it 150 000 km downstream at the current's velocity; a 2-µm clay would take nine years and 1.5 million kilometres. Neither number is physical, and that is the point: the fines stay in suspension until the current itself dies, and they are then deposited far beyond the sand, over a plain thousands of kilometres wide. This is why a submarine fan is a coarse, thick, proximal sand body that thins and fines basinward into a distal mud, and why the sandstone bodies of ancient deep-water systems — the Brent of the North Sea, the Shannon of the Gulf of Mexico — extend for hundreds of kilometres from their feeder canyons while their grain size falls by only two or three phi units over that distance. The calculation is the reason deep-water reservoirs are enormous and why their distal parts are bypassed by the sand and are sealed by the mud they grade into.
:::
:::
