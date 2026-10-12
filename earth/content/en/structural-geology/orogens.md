A mountain belt is the exposed part of a collision, and it is the only place where the deep structure of a convergent margin is laid bare for mapping. Orogens cover a fifth of the land surface, they build and destroy the continents, they control the rate at which the silicate weathering sink draws carbon dioxide from the atmosphere, and they are where most of the record of plate tectonics before the Cenozoic has been preserved. Structurally they are the hardest problem in the subject, because they combine every mechanism in this course — frictional faulting, ductile flow, folding, metamorphism, magmatism and erosion — operating simultaneously over tens of millions of years on a scale that no analogue experiment and no single field area can capture.

## Kinds of orogen

::: definition Orogen types {#def-orogen-types}
A **collisional (Himalayan-type) orogen** forms when two continental masses converge and no subduction of continental lithosphere is required; it is characterised by crust twice the normal thickness, a mid-crustal low-strength layer, extrusion of the middle crust sideways, and Cretaceous to Palaeogene marine sediments thrust over the foreland. An **accretionary (Cordilleran-type) orogen** grows by the addition of terranes scraped from a downgoing plate onto the margin, and is characterised by a long, narrow, magmatically active belt of stacked thrust sheets, extensive plutonism, and a stratigraphy that is a jumble of oceanic fragments, island arcs and slivers of continent. An **Andean-type orogen** is a continental margin above a subduction zone without continental collision, with crust thickened by a factor of one and a half rather than two. A **collisional orogen without a suture** — a "Cascadia-type" accretionary prism on land — is the end member in which nothing has yet collided.
:::

::: definition Suture, terrane and tectonite {#def-suture}
A **suture** is the trace of a closed ocean, marked by a belt of ophiolite, by a change in the age and facies of the strata on either side, by high-pressure metamorphism, and by a match between the faunas or palaeomagnetic poles of the two margins. A **terrane** is a fault-bounded fragment of crust with a history, recorded in its stratigraphy, its fossils, its palaeomagnetism and its basement, that is different from that of its neighbours and therefore **exotic** or at least **displaced**. A **tectonite** is a strongly foliated metamorphic rock that has been transposed to the point where its original layering is no longer recoverable, and it is the characteristic rock of the core of every orogen.
:::

## The strength of a mountain belt

::: proposition The critical taper {#prop-taper}
A wedge of Coulomb material above a basal décollement is stable at a unique surface slope — the **critical taper** — at which the force pushing it from behind is exactly balanced by the strength of its interior and of its base. For a dry wedge with no basal strength the taper cannot exceed the internal friction angle, $\alpha \lesssim \varphi$; with pore fluid at a pressure ratio $\lambda = P_p/(\rho g d)$ the effective friction is reduced in the proportion $1-\lambda$, so
$$
\tan\alpha_c \approx (1-\lambda)\tan\varphi .
$$
Observed taper angles of accretionary prisms are $3^\circ$–$9^\circ$ and of collisional orogens $1^\circ$–$3^\circ$, against an internal friction angle of $25^\circ$–$35^\circ$ — which requires either high pore pressure or a weak basal décollement, or both.
:::

::: example Why the Himalaya is only 2° wide-angled {#ex-taper}
Take an orogen with internal friction angle $\varphi = 30^\circ$ and a pore-pressure ratio $\lambda = 0.90$ in its upper crust. Find the critical taper. Then take the same orogen with $\lambda = 0.4$ and comment on the result.
::: solution
$$
\lambda = 0.90:\quad \tan\alpha_c = 0.10\times0.577 = 0.0577 \quad\Longrightarrow\quad \alpha_c = 3.3^\circ;
$$
$$
\lambda = 0.40:\quad \tan\alpha_c = 0.60\times0.577 = 0.346 \quad\Longrightarrow\quad \alpha_c = 19.1^\circ .
$$
The observed taper of the Himalaya and Tibet, measured from the topography and from the depth to the detachment, is about $1^\circ$–$2^\circ$, and that of the Himalayan front itself a little more. The high-pore-pressure calculation reproduces it; the low-pore-pressure calculation does not, and would require a mountain belt with slopes of twenty degrees throughout its interior, which is not what is there.

This is the strongest and most general argument in the subject for overpressured fluids in the middle and upper crust of collisional orogens, and it is corroborated by three independent observations: the focal depths of earthquakes in Tibet stop at 20–25 km, which is where the crust becomes too hot to break; the geodetically measured strain is distributed rather than localised on the range-front faults; and the Tibetan plateau has a low seismic-wave-velocity layer at 15–20 km depth that has been read as partial melt or as brine. The taper argument is a statement about the whole orogen's strength, made from a topographic profile, and it is one of the few places in geology where a large mechanical conclusion follows from a small measurement.
:::
:::

::: widget plot
f: atan((1-x)*tan(30*pi/180))*180/pi
x: 0, 0.98
y: 0, 32
hlines: 2
vlines: 0.9
labels: \text{critical taper}
caption: The critical taper of a Coulomb wedge with internal friction angle $30^\circ$, plotted against the pore-pressure ratio $\lambda$. The curve is flat for low $\lambda$ and collapses steeply as $\lambda$ approaches one: at hydrostatic pressure ($\lambda \approx 0.4$ in most of the upper crust) the taper is nearly the friction angle, but at $\lambda = 0.9$ it is $3^\circ$, and at $\lambda = 0.95$ it is $1.7^\circ$. The horizontal line marks the observed taper of the Himalaya–Tibet and the vertical line the pore-pressure ratio required to support it. The message is that a mountain belt's height is a measurement of its fluid pressure, and that a small change in $\lambda$ — the overpressuring caused by a low-permeability seal, or the depressurisation caused by a major erosion event — changes the whole orogen's stability.
:::

::: history
The mechanical interpretation of mountain belts begins with the contracting-Earth theory of James Dana and Eduard Suess, which explained folding and thrusting as the wrinkles of a cooling planet, and with the counter-argument of the "fixedists" who invoked vertical movements instead. Alfred Wegener (Wegener) supplied the decisive image in 1912 and again in 1924: the Himalaya as the product of India's collision with Asia, with the crust crumpled up like the bow wave of a snowplough. Hans Stille's geosynclinal school and the American mobile-belts school of James Kay fought the argument through the 1940s, and it was closed not by field geology but by the marine geophysics of the 1960s. Sam Carey (Carey), whose 1958 paper on the orocline hypothesis introduced the idea that a mountain belt can be bent by the rotation of the blocks that carry it, reopened the geometric question; and the modern synthesis begins with the 1966 paper of Warren Hamilton on the mechanics of the Andes, the 1970 paper of John Dewey and John Bird on the mechanics of orogeny, and the 1975 paper of Peter Molnar and Paul Tapponnier (Tapponnier), which predicted from the geometry of India's indentation that Tibet should be extruded eastward along great strike-slip faults and that the prediction could be tested against the slip vectors of earthquakes — a rare instance of a structural model being validated by seismology within a year of publication. The critical-taper theory came from the mechanics of soils, was formalised for accretionary prisms by Dahlen, Jordan and Suppe in 1984, and was extended to collisional orogens by Barr and by Dahlen; the coupling of erosion and tectonics came from the work of Terry Jordan, Peter Clift, and the modelling school of Beaumont, Willett and Whipple in the 1990s.
:::

## Crustal thickness and elevation

::: example How high should Tibet be? {#ex-tibet}
By Airy isostasy, with $\rho_c = 2700$ and $\rho_m = 3300\ \mathrm{kg\,m^{-3}}$ and a reference crust of 30 km at sea level, what elevation should a 70-km-thick crust support? The Tibetan plateau stands at 5 km. What does the discrepancy imply?
::: solution
$$
E = (h_c - h_0)\left(1 - \frac{\rho_c}{\rho_m}\right) = (70 - 30)\times\left(1 - \frac{2700}{3300}\right) = 40\times0.182 = 7.3\ \mathrm{km}.
$$
The plateau is 2.3 km lower than a simple Airy column predicts. Three explanations are available and all three are partly right. The lower crust beneath Tibet is **denser** than normal — either eclogitised, or loaded by dense mantle that has foundered into it — and a dense root pulls the surface down. The mantle beneath the plateau is **hot**, and therefore lighter, which reduces the buoyancy contrast that supports the elevation. And the crust is not a column of uniform density: the geophysical models show a low-velocity, possibly partially molten layer at 15–25 km, which changes the isostatic calculation from a two-layer to a three-layer problem.

The calculation is worth doing in every orogen, because the sign of the discrepancy is diagnostic. A plateau **higher** than Airy predicts is being supported by dynamic topography from the convecting mantle, or by the flexural strength of a strong lithosphere — as in the Altiplano, where the subducting slab holds the region up. A plateau **lower** than Airy predicts has a dense root or a hot one, and is gravitationally unstable: it will spread laterally, which is exactly what the eastward extrusion of Tibet and the extensional grabens of its interior record.
:::
:::

::: example Shortening across an orogen {#ex-shortening}
A 600-km-wide transect across a collisional orogen is restored from its present state to a horizontal precursor. In the upper crust it yields 180 km of shortening on frontal thrusts, 240 km on a system of imbricate thrusts and 90 km of layer-parallel shortening recorded in bed thinning. Independently, seismic refraction shows a Moho at 70 km beneath the plateau, against a Precambrian precursor crust 35 km thick. Find the extension factor from each route and reconcile them.
::: solution
The upper-crustal structures give a total shortening of
$$
180 + 240 + 90 = 510\ \mathrm{km},
$$
over a restored length of $600 + 510 = 1110\ \mathrm{km}$, so
$$
\beta_\text{upper} = \frac{1110}{600} = 1.85 .
$$
The crustal thickness gives, independently,
$$
\beta_\text{deep} = \frac{70}{35} = 2.00 .
$$
The two agree to within eight per cent, and that agreement is the whole point: it means the shortening measured in the brittle upper crust accounts for essentially all of the crustal thickening, that little has been taken up by ductile flow out of the section, and that the cross-section from the surface to the Moho is **balanced**.

Had the two numbers disagreed badly — say 1.5 from the structures and 2.0 from the Moho — the missing 0.5 would have to go somewhere: shortening below the deepest imaged thrust, crustal flow out of or into the transect, or a transect that is not perpendicular to the shortening direction. The comparison of a structural $\beta$ with a crustal-thickness $\beta$ is the standard closure test of every orogen transect, and it is the reason the deep seismic reflection profiles of the Alps, Tibet and the Himalaya were worth the money they cost.
:::
:::

::: quiz
A mountain belt has a crustal thickness of 62 km and a mean elevation of 5.0 km, against an Airy prediction of 5.8 km. What does the discrepancy suggest?
- [ ] The crust is less dense than assumed.
- [x] The crustal root is denser than normal, or the mantle beneath is hot.
- [ ] The belt is being supported by the flexural strength of the lithosphere.
- [ ] The measurement of crustal thickness is too high.
::: solution
A lower-than-predicted elevation means the column is less buoyant than a simple two-layer Airy column, which happens if the root is dense — eclogitised lower crust or foundered mantle — or if the supporting mantle is hot and therefore light. A crust that is *less* dense would stand *higher*. Flexural support from a strong lithosphere also raises an orogen rather than lowering it, and would make the discrepancy go the other way.
:::
:::

## Exhumation and the record

::: definition Exhumation of deep rocks {#def-exhumation}
High-pressure and ultra-high-pressure rocks are exhumed by a combination of processes whose relative importance is the subject of a large and unresolved argument: **erosion** at the surface, **extensional faulting** that unloads the crust and lets it rise, **buoyant ascent** of a crustal fragment lighter than the mantle it displaces, **channel flow** of a weak mid-crustal layer out from beneath the load, and **underplating** that buries and then exhumes. The observable is a pressure–temperature–time path, and the shapes of the paths distinguish the mechanisms: buoyant return gives a cold, fast, near-isothermal decompression path; erosion gives a path in which pressure and temperature fall together; and channel flow gives a near-isothermal decompression at high temperature followed by rapid cooling.
:::

::: example Which mechanism exhumed these granulites? {#ex-exhume}
A granulite-facies terrane gives a peak of $12\ \mathrm{kbar}$ and $850^\circ\mathrm{C}$ at 520 Ma, and a pressure–temperature path that decompressed from 12 to 5 kbar while cooling by only $30^\circ\mathrm{C}$, then cooled through the argon-closure temperatures of hornblende and biotite at 505 and 490 Ma. Which exhumation mechanism does the path favour, and what is the mean exhumation rate?
::: solution
The rock rose from about 40 km to 18 km — 22 km — between 520 and 505 Ma, a mean rate of
$$
\frac{22\ \mathrm{km}}{15\ \mathrm{Myr}} = 1.5\ \mathrm{km\,Myr^{-1}} = 1.5\ \mathrm{mm\,yr^{-1}},
$$
and then cooled from about $820^\circ\mathrm{C}$ to below $500^\circ\mathrm{C}$ between 505 and 490 Ma, a rate of $22\ ^\circ\mathrm{C\,Myr^{-1}}$.

The near-isothermal decompression is the diagnostic feature. Erosion alone cannot do it: a column eroded at $1.5\ \mathrm{mm\,yr^{-1}}$ follows a geotherm of $25\ ^\circ\mathrm{C\,km^{-1}}$ and would cool by $22\times25 = 550^\circ\mathrm{C}$, not $30^\circ\mathrm{C}$. The rock must have risen through a **near-adiabatic** regime, which means either buoyant ascent of a hot, low-density fragment or lateral channel flow of the middle crust beneath a load, both of which move rock upward faster than heat can diffuse out of it. The subsequent rapid cooling at 505–490 Ma is then the arrival of the fragment at a level where erosion can act, and the 15-million-year interval is the time of buoyant rise.

The discriminating observation between buoyancy and channel flow is the **lateral extent** of the exhumed terrane. A buoyant fragment is tens of kilometres across and has steep boundaries; a channel-flow sheet is hundreds of kilometres along strike, is bounded above and below by mylonites, and carries a stretching lineation parallel to the direction of flow over its whole length. The Tso Morari eclogites of Ladakh and the high-pressure granulites of southern India sit at the two ends of this argument, and it is not closed.
:::
:::

::: warning An orogen's structure is a record of its topography, and its topography is a record of its structure
The circularity is real and it is the central difficulty of the subject. The structure of an orogen — the fault geometry, the taper, the distribution of strain — determines the topography by isostasy and by the strength of the crust. The topography determines the erosion, which determines where sediment is deposited, which determines where the crust is unloaded, which determines the stresses that drive the faulting. Erosion is therefore not a boundary condition on an orogen's evolution but a participant in it, and the observation that modern orogens' structures correlate with their drainage patterns — the syntaxes of Namcha Barwa and of the eastern Himalaya, the asymmetric strain of the Alps, the migration of the foreland folds of the Jura in step with the growth of the Aar massif — is the evidence that the coupling is strong.

The consequence for interpretation is uncomfortable. A structural geologist who restores an orogen to its "shortened state" without accounting for the erosion that has removed half of it is restoring to a geometry that never existed, and a basin analyst who treats sediment supply as independent of the tectonics is making the same error from the other side. The models that handle this — the coupled thermomechanical codes with an erosion law — reproduce the first-order shapes of real orogens, and they also show that the same boundary conditions can give several very different structures depending on the erosion parameters. Which is a warning and not a failure: the structure is not determined by the convergence rate alone.
:::

## Where this leads

The structures described here are built from the parts in [[structural-geology/fractures-faults]], [[structural-geology/folds]] and [[structural-geology/shear-zones]]; the metamorphism they record is in [[mineralogy-petrology/metamorphic-reactions]] and [[mineralogy-petrology/pt-paths]]; the isostasy and flexure are in [[geophysics/gravity-isostasy]] and [[geophysics/flexure]]; the sediment they shed is in [[sedimentology/basins-sequences]]; and the erosion that shapes them is in [[geomorphology/landscape-evolution]].

::: summary
- Orogens are of three main kinds — collisional, accretionary and Andean-type — and they differ in whether continental crust is subducted, whether terranes are added, and how much the crust is thickened.
- A mountain belt's taper angle is a measurement of its strength, and the observed 1°–3° tapers require near-lithostatic pore pressure or a weak décollement.
- Airy isostasy predicts an elevation from the crustal thickness, and the sign of the discrepancy tells you whether the root is dense, hot, or supported dynamically.
- Shallow and deep shortening are the same shortening at different levels; they must be combined in a balanced section, not added.
- Near-isothermal decompression proves that a rock rose faster than heat could diffuse, which requires buoyancy or channel flow rather than erosion.
- Erosion and tectonics are coupled: the structure shapes the topography and the topography drives the erosion that shapes the structure.
:::

## Exercises

::: exercise Orogen type {level=1}
An orogen contains a 200-km-long belt of stacked oceanic sediments, chert and pillow basalt sandwiched between continental-margin strata, together with a 600-km-long calc-alkaline batholith. Classify it.
::: solution
An **accretionary (Cordilleran-type)** orogen. The oceanic slice is an accretionary prism or a set of exotic terranes — the "ophiolite mélanges" of a subduction complex — and the batholith records the magmatism of the subduction zone that was active while they were being scraped off. A collisional orogen would instead show a suture with a match of strata on either side, crust twice normal thickness, and little calc-alkaline magmatism after collision.
:::
:::

::: exercise Critical taper {level=1 check="6.6"}
For $\varphi = 30^\circ$ and $\lambda = 0.8$, find the critical taper.
::: solution
$\tan\alpha_c = 0.2\times0.577 = 0.115$, so $\alpha_c = 6.6^\circ$. This is in the range of natural accretionary prisms, which is why they are thought to be near critically stressed with moderately overpressured pore fluids.
:::
:::

::: exercise Isostasy {level=1 check="3.6"}
By Airy isostasy with the densities of [[#ex-tibet]], what elevation does a 50-km-thick crust support?
::: solution
$E = (50-30)\times0.182 = 3.6\ \mathrm{km}$. This is roughly the elevation of the Altiplano and of the Basin and Range's high plateau, both of which have crust of 50–55 km.
:::
:::

::: exercise Terrane test {level=2}
A fault-bounded block in a Cordilleran belt carries Late Jurassic limestones with Tethyan faunas, a Permian basalt with mid-ocean-ridge chemistry, and a palaeomagnetic pole indicating 30° palaeolatitude when the surrounding autochthon was at 5°. List the criteria that establish it as an exotic terrane and say which is strongest.
::: solution
Four criteria are present: **faunal** (Tethyan species in a belt whose margin strata carry Boreal or Pacific faunas), **stratigraphic** (a Permian mid-ocean-ridge basalt, which requires an ocean that is not otherwise present), **palaeomagnetic** (a 25° discrepancy in palaeolatitude), and **structural** (a fault-bounded block with a boundary that is a thrust or a strike-slip fault).

The palaeomagnetic criterion is the strongest, because it is a measurement of latitude and is not open to an interpretation in terms of facies or of migration of a fauna; the others can sometimes be explained by a facies change, by an ocean that has since been entirely subducted, or by a rotation about a vertical axis. The caveat is that palaeomagnetism gives latitude and only a poor constraint on longitude, so a terrane may have travelled thousands of kilometres east–west and be undetectable by this method — which is why the strike-slip faults of British Columbia and New Zealand are inferred from the match of terranes along their length rather than from their palaeolatitude.
:::
:::

::: exercise Exhumation rate {level=2 check="2.5"}
An eclogite exhumed from 60 to 20 km depth between 130 and 114 Ma. Find the mean exhumation rate in $\mathrm{mm\,yr^{-1}}$.
::: solution
$(60-20)\times10^{6}\ \mathrm{m}/(16\times10^{6}\ \mathrm{yr}) = 2.5\ \mathrm{mm\,yr^{-1}}$. This is fast — an order of magnitude faster than typical orogenic exhumation — and it requires buoyant return rather than erosion, since no erosion on Earth removes 40 km of rock in 16 million years.
:::
:::

::: exercise Cooling rate {level=2 check="15"}
Using the [[#ex-exhume]] example, what was the mean cooling rate between the hornblende and biotite argon closure temperatures of $500$ and $280^\circ\mathrm{C}$, in $^\circ\mathrm{C\,Myr^{-1}}$?
::: solution
$(500-280)/(505-490) = 220/15 = 14.7\ ^\circ\mathrm{C\,Myr^{-1}}$, about 15. Combined with an exhumation rate of $1.5\ \mathrm{mm\,yr^{-1}}$ this gives a palaeogeothermal gradient of $14.7/1.5 = 9.8\ ^\circ\mathrm{C\,km^{-1}}$ during cooling — a low gradient, consistent with the rapid unroofing of hot rock by thrusting or by extension rather than with steady-state conduction.
:::
:::

::: exercise Sediment flux and taper {level=3}
An orogen receives sediment at a rate that fills its foreland at 2 mm/yr, effectively increasing the basal taper of the wedge. Using the critical-taper idea, explain why the frontal thrust of an actively prograding orogen is less steep than that of an eroding one, and predict what happens to the internal structure when the sediment supply stops.
::: solution
Sediment delivered to the foreland loads the front of the wedge, adding a **pro-wedge** that increases the force resisting forward propagation. In the critical-taper force balance this is equivalent to increasing the basal friction or reducing the basal slope, and the wedge responds by flattening its front and by propagating a shallow frontal thrust outward over the newly deposited sediments — which is why the range-front thrusts of the Himalaya, the Jura and the Andean subandean belt are listric and shallow, and why they carry sedimentary sections many kilometres thick.

When the sediment supply stops, the balance reverses. The front is no longer buttressed, the taper becomes supercritical, and the wedge responds by **internal shortening** rather than frontal propagation: out-of-sequence thrusts reactivate older structures inside the belt, the frontal thrusts are cut off and left hanging, and the topography steepens and migrates inward. If erosion then removes the pro-wedge, the front may be truncated by a new, steeper thrust. The prediction is testable in the field — a change from frontal propagation to internal shortening should be dated by the growth strata in the foreland — and it is observed in the eastern Himalaya, where the change from frontal propagation to out-of-sequence thrusting in the Miocene followed a change in the erosion and sedimentation pattern of the foreland.
:::
:::

::: exercise A synthesis {level=3}
A collisional orogen shows: a 400-km-wide plateau at 4.8 km elevation with a 68-km crust; a 15-km-deep low-velocity layer at 18–22 km; a foreland basin 800 km wide with 7 km of Neogene sediment; and a set of east–west extensional grabens in the plateau's interior with 2 km of throw and ages younger than 8 Ma. Interpret the whole, and identify the weakest link.
::: solution
The crustal thickness of 68 km should support 6.9 km by Airy isostasy, so the plateau at 4.8 km is 2.1 km low — the root is dense or hot, and the crust is gravitationally unstable. The low-velocity layer at 18–22 km is the mid-crustal channel: partially molten or brine-bearing, weak, and the décollement along which the upper crust is spreading. The 7 km of foreland sediment is the flexural load of the growing wedge and the mass that has been eroded off it, and its thickness requires an erosion rate of order 1–2 mm/yr sustained over the Neogene. The extensional grabens are the diagnostic structure: they record the **gravitational collapse** of the overthickened crust, with the upper crust extending east–west while the middle crust flows outward beneath it.

The weakest link is the interpretation of the low-velocity layer. Partial melt at 18–22 km requires temperatures of 700–800 $^\circ$C at that depth, which implies a crustal geotherm far above conduction and implies that the middle crust is mechanically weak — the assumption on which the whole channel-flow or extrusion model rests. An alternative reading of the same low velocity is a layer of aqueous brine or of aligned micas in a rock that is strong and cold, in which case the middle crust is not weak, the channel-flow model fails, and the plateau's evolution must be explained by pure shear thickening and by erosion-driven collapse instead. The two readings are distinguished by the heat flow, by the magnetotelluric conductivity, and by the xenolith and earthquake evidence for the temperature at that depth — and they are not yet distinguished.
:::
:::
