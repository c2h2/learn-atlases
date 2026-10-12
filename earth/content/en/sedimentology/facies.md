A facies is a rock described so that its environment is implied. The word carries two commitments that are in permanent tension: the descriptive one, that the rock should be recorded without interpretation, and the genetic one, that the record should be read back into a world of water, currents, animals and sediment supply. Sedimentology's central intellectual operation is the passage between the two, and the discipline that governs it is facies analysis. Everything that follows — the correlation of a reservoir, the reconstruction of a basin, the interpretation of a seismic reflection — is built on whether that passage has been made honestly.

## Facies and the law that links them

::: definition Facies and facies association {#def-facies}
A **facies** is a body of rock characterised by a combination of lithology, grain size, sedimentary structure, sedimentary and biogenic structures, palaeontological content and, where it can be determined, colour and mineralogy, such that it is distinguishable from its neighbours and implies a single style of deposition. A **facies association** is a group of facies that recur together and that share an environment. A **facies model** is a generalised three-dimensional geometry for a facies association — a channel, a barrier, a carbonate platform — with its predicted vertical succession, its lateral transitions and its expected dimensions. A **facies mosaic** is the map pattern produced when several facies of comparable size interdigitate, as on a tidal flat or a carbonate shelf, so that no single facies is laterally continuous.
:::

::: theorem Walther's law of facies {#thm-walther}
A vertical succession of facies in which each facies passes up into the next without a break of erosion or non-deposition represents a lateral succession of the same facies in the same order. The converse holds only where the vertical succession is complete: a condensed or hiatal surface destroys the correspondence, and a **cut-off** facies, one whose lateral counterpart was never deposited or has been removed, appears in a vertical section with no neighbours.
:::

::: proof
Walther's (Walther) argument is a kinematic one. Suppose the depositional system is in **gradational equilibrium**, so that the position of each environment relative to the shoreline is fixed in the long term and the profile of the depositional surface does not change in shape as it migrates. If the shoreline then translates landward by a distance greater than the width of the environments involved, a fixed point on the seafloor experiences in vertical succession the same sequence of environments that it would cross in walking from one end of the system to the other. The two are the same set of events read along two perpendicular axes, and the correspondence is exact only if the profile is preserved during the translation. Where the profile changes shape — because of a change in sediment supply, in subsidence, in wave energy or in relative sea level — the vertical succession is a distorted version of the lateral one, and where the surface is erosional or condensed the correspondence is broken altogether.
:::

::: example Applying Walther's law {#ex-walther}
A vertical succession reads, upward: bioturbated marine mud with *Thalassinoides*; flaser-bedded fine sand and mud; planar cross-bedded medium sand with mud drapes; trough cross-bedded coarse sand with mud chips; a sharp scoured base into the mud below. Is this a regressive or a transgressive succession, and what is the lateral equivalent of the topmost facies?
::: solution
The succession **coarsens and shallows upward**: from a fully marine, permanently subtidal mud, through a tidal-flat facies, into a subtidal sand bar, and finally into a channel lag. The topmost facies is the coarsest and the lowest in the water column, so the environments have moved **seaward** — this is a **regressive** (progradational or offlapping) succession, a coarsening-upward parasequence or a regressive surface of marine erosion overlain by a lowstand or falling-latestand fill.

By Walther's law the lateral equivalent of the topmost facies, the scoured coarse channel sand, lies **seaward** of the bioturbated mud, and the whole vertical stack is a cross-section through a single coastal system: mud offshore, tidal flat in the middle, channel and bar toward the land. The **missing** facies are the ones that would lie landward of the channel — the coastal plain, the peat, the overbank mud — and their absence tells you that the section is truncated or that the shoreline never reached this far.

The caution is the sharp base. A scoured surface at the top of a coarsening-upward succession is not necessarily a sequence boundary; it may be the base of the next parasequence's channel, in which case the surface is **correlative to a marine flooding surface** somewhere else. The identification of a sequence boundary requires the surface to be demonstrably regional, to be incised, and to be overlain by a basinward shift of facies — three criteria, of which the third is the one that Walther's law supplies.
:::
:::

## Cycles, parasequences and stacking

::: definition Genetic sequences {#def-sequences}
A **parasequence** is a relatively conformable succession of genetically related beds bounded by a marine flooding surface or its correlative conformity; it is the smallest genetic sequence, and it is typically 1–30 m thick and 1–100 km wide. A **parasequence set** is a genetically related group of parasequences bounded by a maximum flooding surface or a subaerial unconformity, and its **stacking pattern** records the balance of sediment supply and accommodation: **progradational** sets are stacked with no vertical grain-size break and record a surplus of supply, **aggradational** sets are stacked with repeated flooding and no net shallowing, and **retrogradational** sets are stacked with a landward shift and record a deficit. A **deepening-upward** (fining-upward, retrogradational) cycle ends with a flooding surface and a condensed section; a **shallowing-upward** (coarsening-upward, progradational) cycle ends with a regression.
:::

::: example Reading a stacking pattern {#ex-stacking}
A 60-m succession comprises five coarsening-upward parasequences of 8–14 m, each capped by a 20-cm glauconitic sand and a hardground with *Trypanites* borings, and each overlain by 2 m of dark marine shale. The parasequences thicken and coarsen upward, and the shales between them thin from 2 m to 0.3 m. Interpret the stacking and the forcing.
::: solution
Each parasequence is a **progradational** cycle: it shallows upward and is terminated by a **marine flooding surface**, marked by the glauconitic lag, the hardground and the overlying shale. Five such cycles form a **progradational parasequence set**, and the whole is a regressive compound cycle.

The two trends are the information. That the parasequences **thicken and coarsen upward** means that each successive cycle delivered more sediment, so the **supply rate was rising** relative to the accommodation. That the intervening shales **thin from 2 m to 0.3 m** means that the flooding events became shorter or the water became shallower, so the **rate of relative sea-level rise was falling**. Together they record a **falling rate of creation of accommodation** against a rising or steady sediment supply — the classic signature of the approach of a highstand, and the succession would be expected to pass up into a broadly aggradational then finally a downlapping highstand systems tract.

The quantitative content is worth noting. If each parasequence represents one cycle of relative sea-level change, five cycles in a 60-m succession with the cyclicity of a fourth-order sequence implies a duration of order 0.5–2 Myr for the whole, and the thinning of the shales from 2 m to 0.3 m is a factor of nearly seven in the thickness of the transgressive deposits. A factor of seven in transgressive thickness at a constant subsidence rate is a factor of seven in the **duration** of transgression, which is a statement about the forcing — the shape of the sea-level curve, not its amplitude — and it is the kind of statement that can be tested against the sea-level curve derived from the margin elsewhere.
:::
:::

::: widget plot
f: 0.35+0.3*sin(2*pi*x/10 - pi/2) + 0.008*x
x: 0, 50
y: 0, 1.15
labels: \text{grain-size proxy up-section}
caption: An idealised stacking pattern. The sinusoidal term is the shallowing-upward of successive parasequences, each terminated at its crest by a marine flooding surface, and the linear term is the long-term shoaling that makes the set **progradational**: the flooding surfaces step progressively down-section and the parasequences thicken upward. Reversing the sign of the linear term gives a retrogradational set in which the flooding surfaces step up and each parasequence is thinner and more flooded than the one below. The pattern is read in the field from the grain-size trend, from the spacing of the flooding surfaces and from the amount of bioturbation at each one, and it is the primary data of sequence stratigraphy. The pattern is read in the field from the grain-size trend, from the spacing of the flooding surfaces and from the amount of bioturbation at each one, and it is the primary data of sequence stratigraphy.
:::

::: history
The concept of facies was introduced by Gressly (Gressly) in 1838 in the Jura and formalised by Gumbel and by Zirkel; the law of facies is the 1894 thesis of Johannes Walther (Walther), who worked out the correspondence between the vertical and lateral successions from the Quaternary deposits of the German North Sea coast and from the Stassfurt evaporites. Walther's law was ignored for seventy years and was rediscovered by Moore (Moore) and by Visher in the 1960s, and its quantitative consequences were exploited by Sloss (Sloss), by Visher and by Jervey in the sequence-stratigraphic synthesis that began with Vail, Mitchum and Thompson's (Thompson) 1977 paper and was made a testable method by the Exxon sequence-stratigraphic model of the 1980s. The genetic sequence and parasequence terminology is Mitchum's (Mitchum), the systems-tract concept is that of Van Wagoner, Posamentier, Mitchum, Vail and others in 1988, and the alternative genetic-stratigraphy school of T-R-U (T-R-U) and the flooding-surface school of Galloway (Galloway) are the rival frameworks still in use. Facies models in their modern sense come from the 1976 collection of Reading (Reading) on depositional environments and from Walker and James's (James) 1992 facies models volume, which is the standard reference and which made explicit that a model is a prediction. Ichnology's environmental application is the work of Seilacher (Seilacher), whose 1964 paper on the trace-fossil ichnofacies and whose 1967 book established the depth and energy zonation, refined by Pemberton and by Frey and by Droser into the modern ichnofabric method. The trace-fossil genera named in this lesson — *Skolithos*, *Cruziana*, *Glossifungites*, *Thalassinoides*, *Trypanites*, *Nereites*, *Zoophycos* — are form genera of the classical trace-fossil nomenclature and are used as environmental terms in their own right.
:::

::: example A facies mosaic in three wells {#ex-mosaic}
Three wells 2 km apart on a dip line through a Cretaceous delta front penetrate, from the top: **Well 1** — 18 m of marine shale, then a 9-m coarsening-upward unit of very fine sand and mud, then shale. **Well 2** — 17 m of the same shale, then a 12-m very-fine sand with no mud, sharply based and graded, then shale. **Well 3** — 18 m of the same shale, then 11 m of interbedded sand and mud in centimetre couplets, then shale. Correlate them and say whether the three sand bodies are one reservoir.
::: solution
The three wells stand on the same **flooding surface**, the top of the underlying shale, which is the correlation datum; the overlying shale is the next flooding surface, and the interval between them is one parasequence. Within it the three facies are **laterally equivalent**, not stacked: Well 1 is a **distal delta-front** heterolithic facies that prograded only part of the way through the cycle, Well 2 is a **sand-rich delta-front or mouth-bar** facies that reached its full shallowing-upward, and Well 3 is a **tide-influenced** facies in which the sediment was supplied as fluid mud or as tidally generated rip-up couplets.

Whether they are one reservoir depends on the **connectivity of the sand**, and the answer is not decidable from three wells. Well 2's sand is 12 m thick and mud-free; Well 1's is 9 m of interbedded sand and mud of perhaps 40 per cent net sand; Well 3's is 11 m of couplets of perhaps 30 per cent net sand. If the facies pass laterally within a few hundred metres, the sand is **baffled** rather than connected, and the field will drain from Well 2 and leave the rest. If the facies interdigitate over kilometres, the sands are connected through the net-sand-rich parts.

The observations that decide it are the **palaeocurrents**, which give the direction of facies migration and therefore of the sand trend; the **base of each sand**, because a sharp erosive base in Well 2 that can be traced into Well 1 means a channel that connects them, while a gradational base means a sheet that does not; and the **net-to-gross ratio measured in a fourth and fifth well placed along the palaeocurrent trend**. Three wells on a dip line cannot resolve a mosaic whose facies spacing is 1 km, and admitting that is the honest conclusion of the exercise.
:::
:::

## The trace-fossil solution

::: definition Ichnofabrics {#def-ichno}
A **trace fossil** is the burrow, trail or feeding structure of an organism, and unlike a body fossil it is found where the animal lived. The **ichnofabric** is the proportion, diversity and cross-cutting relation of the traces in a bed, and it is a measurement of the **time the substrate was firm and inhabited** — the bioturbation index on a scale of 0 to 6. The classic **cross-shelf ichnofabric succession** runs from the *Skolithos* ichnofacies of high-energy, shallow, mobile sand, through the *Glossifungites* ichnofacies of a firmground cut during a fall of sea level, to the *Cruziana* and *Helminthoida* ichnofabrics of the quiet, fully marine shelf, and out to the *Nereites* and *Paleodictyon* ichnofabrics of the deep-sea fan, where the traces are the only evidence that the bed was colonised at all. The **depth-velocity control** is real but not absolute: the *Skolithos* ichnofacies is a **hard-substrate, high-energy, shallow** association and the *Glossifungites* ichnofacies is a **firmground** that can form at any depth, and the two are distinguished by the presence or absence of the borings *Glossifungites* and *Trypanites* and by the overlying and underlying facies.
:::

::: example Ichnology against sedimentology {#ex-ichno}
A 3-m unit of very fine, horizontally laminated sand contains *Skolithos* vertical tubes 3 mm across and 40 mm long at its base, *Cruziana* grazing trails in its middle, and *Thalassinoides* galleries in its top. The lamination is preserved in the middle third and is completely homogenised in the top third. Interpret.
::: solution
The three ichnofabrics record a **deepening- and quieting-upward** succession, and they contradict any reading of the lithology alone. *Skolithos* is the trace of a suspension-feeding worm anchored vertically in a mobile, well-oxygenated, high-energy sand — a shallow subtidal bar or a storm-influenced shoreface. *Cruziana* is the grazing trail of a mobile deposit feeder, most often an arthropod or a bivalve, which requires a **stable, firmer, lower-energy** substrate and a food supply in the sediment. *Thalassinoides* is the gallery system of a decapod crustacean, which requires **firm to stiff** sediment, permanent marine subtidal conditions, and enough time to build a burrow system of decimetres.

The lamination tells the same story in a different currency: it is preserved in the middle third because the sediment was colonised too slowly or too shallowly to destroy it, and it is destroyed in the top third because the *Thalassinoides* producer worked the sediment to a depth of several centimetres for a long time. The **bioturbation index** is therefore a clock: the top third was inhabited for years to decades, and the middle third for weeks.

The unit is a **transgressive** or **condensed** interval, and the *Skolithos* at its base is the last trace of the high-energy shoreface that was drowned. The whole is a flooding event recorded in the animals rather than in the sediment, and it is a better correlation tool than the lithology, because the lithology of a very fine sand is not diagnostic of anything and the ichnofabric is.
:::
:::

::: warning Facies models are not the world
A facies model is a generalisation, and the failure mode of facies analysis is to find the model in the rock rather than the rock in the model. Four specific traps recur. **The model's vertical succession is a prediction, not a law**: a barrier-island model predicts a coarsening-upward barrier sand over a fining-upward offshore mud, and a real barrier may be transgressive, may be cut by tidal inlets, may be reworked by a ravinement surface into a lag, and may be absent altogether where the profile is steep. **The model's dimensions are drawn from a few measured sections** and are commonly wrong by an order of magnitude; the reservoir engineer who uses a published channel width of 200 m for a system whose channels are 2 km wide has inherited an error that no amount of core will correct. **The model assumes uniform process**: a "fluvial" model written for a meandering river is not a model for an ephemeral, saline, playa-fed system of the type that dominates the rock record in arid climates, and the same is true of "carbonate platform" models written from the Bahamas and applied to a cool-water, bryolith-dominated platform with no ooids and no microbial boundstone. And **the model is time-averaged**: a facies is a body of rock whose boundaries may be diachronous by thousands of years, and a facies map drawn from a single time slice is a different object from a facies map drawn from a genetic unit. The defence is to write down, for every interpreted environment, the **alternative** that the data cannot exclude, and to say what observation would decide between them.
:::

::: quiz
A vertical succession shows offshore mud directly below a coal, with no sand between. Walther's law predicts which lateral transition?
- [x] Offshore mud passes landward into coastal plain and peat swamp with no intervening shoreface.
- [ ] The coal is a float or raft deposit in open water.
- [ ] The contact is a fault.
- [ ] Nothing, because Walther's law does not apply to coal.
::: solution
Walther's law predicts the lateral equivalent, and here the lateral equivalent is a **wave- or tide-dominated, low-energy coastal plain** in which the peat swamp sat directly against the mud flat and the offshore mud, with no shoreface sand because there was no wave- or tide-built sand to make one. The classic modern analogue is the mud-dominated coast of the Gulf of Papua or the German Wadden Sea back-barrier, where coal-forming swamps abut tidal flats directly. The alternative reading — that the coal is a distal raft — is excluded by the root beds and the palaeosol beneath the coal, which prove it grew there.
:::
:::

## Where this leads

The environments that supply the facies are in [[sedimentology/continental-environments]] and [[sedimentology/marine-environments]], the carbonates in [[sedimentology/carbonates]], the structures in [[sedimentology/bedforms]], the grain sizes in [[sedimentology/sediment-grains]], and the sequence-stratigraphic framework in [[sedimentology/stratigraphy]] and [[sedimentology/basins-sequences]].

::: summary
- A facies is a description that implies an environment, and a facies model gives its predicted geometry and vertical succession.
- Walther's law makes a complete vertical succession a cross-section of the lateral one, and it fails at erosional, condensed and hiatal surfaces.
- Coarsening-upward cycles are progradational and end at a flooding surface; fining-upward cycles are retrogradational and record a deficit of accommodation.
- The stacking pattern of parasequences records the balance of sediment supply against the rate of creation of accommodation.
- Trace fossils record the substrate and the time it was inhabited, and an ichnofabric can contradict a lithology and be right.
- Facies models are predictions, not laws, and every interpretation should name the alternative it cannot exclude.
:::

## Exercises

::: exercise Walther's law {level=1}
A vertical succession of offshore mud passes up into shoreface sand and then into a lag of shells and pebbles at a sharp surface. What lateral transition does Walther's law predict, and what breaks it?
::: solution
It predicts that the offshore mud lies **seaward** of the shoreface sand, which lies seaward of the lag — a landward-facing, **transgressive** profile in which the shoreface has been cut by a ravinement surface and its basal lag is the transgressive lag. What breaks the law is the surface itself: a ravinement surface is erosional, it removes the facies that were there, and the vertical succession therefore jumps over part of the lateral one. The lag is a **cut-down** facies with no counterpart below it in the section.
:::
:::

::: exercise Stacking {level=1}
A parasequence set in which every parasequence is the same thickness and the flooding surfaces are equally spaced is what kind of stacking, and what does it record?
::: solution
**Aggradational** stacking. It records a balance between the sediment supply and the rate of creation of accommodation, so that the shoreline stays in place and each cycle of flooding and progradation adds a layer without net landward or seaward shift. In practice it is the signature of a steady rise of relative sea level at a steady supply, and it is commonest during a transgression whose rate matches the sediment that the system can deliver.
:::
:::

::: exercise Ichnology {level=1 check="0"}
A bed has a bioturbation index of 0 and the lamination is perfect. What does it say about the time of colonization, and what are the two alternatives?
::: solution
It says the bed was **never colonised**, so the time of inhabitation was zero. The two alternatives are **no oxygen** — the bed was deposited under dysoxic or anoxic bottom water, which is the interpretation used to identify oceanic anoxic events and the black shales of rift lakes — and **too fast or too hostile a substrate**, in which a turbidity current's underflow, a debris flow, or a hypersaline or hot substrate left no fauna to colonise. The two are distinguished by the associated geochemistry, by the presence or absence of a fauna in the beds above and below, and by the sedimentary structures: a turbidite's basal sole marks and graded bedding say "too fast", and a laminated mud with pyrite framboids and organic richness say "no oxygen".
:::
:::

::: exercise Facies model test {level=2}
A "meandering-river" model predicts a fining-upward channel fill with a lag, an accretion-bedded point bar, and an overbank splay and palaeosol. A measured section shows a 12-m-thick, entirely structureless, very coarse sand with a flat scoured base, no mudstone interbeds, and palaeocurrents unimodal to the east. Which part of the model fails, and what is the alternative?
::: solution
Everything fails except the basal scour. There is no fining-upward, no accretion bedding, no overbank mud and no palaeosol, so the unit is not a meander-belt fill. The alternatives are a **braided-river channel** — but a braided channel of 12 m thickness with no mud and no bar structures is unusual — and, given the structurelessness, the coarse grain size and the flat scour, a **high-density turbidity current or a debris-flow channel fill**, or a **hyperconcentrated flood** deposit.

The discriminating observations are three. **Sole marks and grading**: a turbidite channel fill has flute casts, a basal inverse-to-normal grading and a mud-chip lag, and a fluvial unit does not. **Palaeocurrent geometry**: a braided or meandering system gives a spread of currents across the bar set, whereas a channel fill from a single flow direction gives a tight unimodal rose, as observed. **The bounding facies**: a fluvial sand is surrounded by its own overbank mud, and a submarine channel fill is surrounded by the hemipelagic or basinal mud it crossed. The unimodal palaeocurrent and the absence of mud argue for a single high-concentration flow in a confined channel, and the whole point of the exercise is that the model's vertical succession is a prediction that the rock is free to refuse.
:::
:::

::: exercise Parasequence counting {level=2 check="300"}
A 96-m parasequence set contains 8 parasequences, each capped by a flooding surface. If the set represents 2.4 Myr, what is the mean duration of a parasequence in kyr, and what order of cycle does it correspond to?
::: solution
The mean thickness is $96/8 = 12\ \mathrm{m}$ and the mean duration is $2.4\times10^{6}/8 = 300\ \mathrm{kyr}$. A 300-kyr cycle is a **fourth-order (smaller-scale) sequence**, and it is generally attributed to the 405-kyr long eccentricity cycle or, more often, to the 100-kyr short eccentricity cycle with several precession cycles contained within each parasequence. The thickness of 12 m per 300 kyr gives a mean sedimentation rate of $40\ \mathrm{m\,Myr^{-1}}$, which is high but normal for a deltaic setting.
:::
:::

::: exercise Carbonate zonation {level=2}
A transect across a Middle Jurassic platform yields, from the interior outward: dolomicrite with desiccation cracks and algal laminites; ooidal grainstone with flat-pebble conglomerate; coral and algal buildstone with interbeds of peloidal packstone; bioclastic packstone with bryozoans and foraminifera; and then basinal mudstone with pelagic fauna. Reconstruct the profile and identify the zone that is most likely to be a reservoir.
::: solution
The profile is a classic **ramped to zoned carbonate platform**. The interior is a **peritidal to sabkha** zone: dolomicrite with desiccation cracks and algal laminites is a supratidal to intertidal flat, hypersaline and periodically emergent. The ooidal grainstone with flat-pebble conglomerate is the **shallow, high-energy ooid shoal and its lagoon**, and the flat pebbles are intraclasts of the underlying algal mat torn up by a storm. The buildstone is the **platform-margin reef or coral-algal framework**, and the interbedded peloidal packstone is its back-reef lagoon. The bioclastic packstone with bryozoans is the **shallow-water outer platform**, and the basinal mudstone with pelagic fauna is the **basin** beyond the platform margin.

The best reservoir is the **ooidal grainstone**, because it was deposited as a high-energy, mud-free, well-washed sand on a shoal and it is therefore the facies most likely to have preserved primary intergranular porosity and to have been exposed to meteoric freshwater during the times the shoal was emergent — the meteoric lens that develops beneath a carbonate shoal is the classic site of dissolution and of secondary porosity. The buildstone can be an excellent but unpredictable reservoir, its porosity controlled by the baffling and the early marine cement that filled the framework; the peritidal dolomicrite can be a poor but regionally extensive reservoir or seal depending on the dolomitisation; and the basinal mudstone is the source rock and the seal.
:::
:::

::: exercise A facies synthesis {level=3}
Two cores 20 km apart in the same formation both show a 4-m coarsening-upward cycle capped by a flooding surface. Core A has 3 m of offshore mud below the cycle and 1 m above; core B has 0.5 m below and 4 m above. Which core is more basinal, and what is the structure of the surface above?
::: solution
A coarsening-upward cycle records the shoreline **approaching**; the shale above the flooding surface records its **retreat**. The ratio of the shale below the cycle to the shale above it therefore measures the site's position relative to the sediment source. Core A has 3 m of mud below and only 1 m above, so the shoreline approached, flooded briefly, and prograded back over the site at once: the site was **proximal**, close to the sediment supply. Core B has 0.5 m below and 4 m above, so the transgression drowned it and kept it drowned: the site is the more **distal** of the two.

The surface above is a **marine flooding surface**, and its expression should differ between the two cores in a predictable way. In the distal core B it should be a regionally extensive **hardground or condensed section** with glauconite, phosphorite, a lag of reworked shells and a condensed fauna, because the site stood in the ravinement zone and in the zone of sediment starvation. In the proximal core A it should be a **correlative conformity**, possibly with a transgressive lag and with evidence of incision, because the shoreline did not retreat far and the surface is there expressed as the base of an advancing channel. The test is the glauconite and the condensed fauna in B against the lag and the incision in A.
:::
:::

::: exercise The resolution of facies analysis {level=3}
A facies map drawn on a sequence boundary shows a single 30-km-wide "fluvial" facies belt across an entire basin. A facies map drawn on the maximum flooding surface within the same sequence shows a narrow "shoreface" sand and a wide "offshore" mud. Are the two maps consistent, and what does the difference tell you about the basin?
::: solution
They are entirely consistent, and the difference is the whole content of sequence stratigraphy. On a **falling and lowstand** surface the shoreline has moved basinward, so the fluvial system has been pushed out across the area that was previously shelf, and a single wide fluvial belt is what a lowstand plain looks like. On the **maximum flooding surface** the shoreline has retreated to its most landward position, so only a narrow shoreface sand and a wide offshore mud remain in the same area. The two maps are the same coastline at two different points in a cycle of relative sea-level change, separated by perhaps a million years.

The information in the difference is the **amount of shoreline migration**, which is the product of the amplitude of the sea-level change and the **gradient of the depositional profile**. A 30-km-wide fluvial belt that collapses to a 5-km-wide shoreface implies a shoreline migration of tens of kilometres and, for a eustatic amplitude of 50–100 m, a palaeoslope of order $10^{-2}$ — a steep shelf. A wide shelf with a gentle slope would show the same sea-level change as a much larger migration and a much wider facies belt, and this is why the same eustatic signal produces very different stratigraphic architectures in basins of different slope, and why a facies map must always be drawn on a time-parallel surface rather than on a lithostratigraphic one.
:::
:::
