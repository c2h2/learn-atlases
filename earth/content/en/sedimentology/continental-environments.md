Continental environments occupy a third of the land surface and preserve a far smaller fraction of the sediment that passes through them, because most of what a river carries to the sea is carried through the continent and not deposited on it. What is preserved is nonetheless the most readable part of the rock record: the deposits are laterally extensive, their processes are observable on the ground today, and their architecture is controlled by the two variables that continental sedimentology is about — water discharge and sediment supply, and how both vary through a year, a flood and a climate cycle.

## Rivers

::: definition Braided and meandering {#def-braid-meander}
A **braided** river is one with multiple, divergent and convergent channels separated by bars, a wide shallow bed, a steep slope, a coarse bedload-dominated load and a high capacity to rework its own bed. A **meandering** river is a single sinuous channel with a helical flow that builds a point bar on the inside of each bend and erodes the cut bank on the outside, a bedload-to-suspension load ratio near one, and cohesive banks. The discrimination is not a matter of sinuosity alone: a river with a sinuosity below 1.3 is straight to sinuous and one above 1.5 is meandering, but the **control** on which of the two a river is, is the fraction of **fine sediment in the bed and banks**. Clay-rich banks and a suspension-load supply give a narrow, deep, meandering channel; a non-cohesive, coarse bedload supply give a wide, shallow, braided one. The **anastomosed** river, with several interconnected channels separated by vegetated or deltaic islands and a very low gradient, is a third type and is characterised by a net **subsidence** rate comparable to its sediment supply.
:::

::: proposition Meander geometry and avulsion {#prop-meander}
The meander **wavelength** of an alluvial river is, with remarkable constancy across two orders of magnitude of river size,
$$
\lambda \approx (11\text{–}16)\,W,
$$
where $W$ is the bankfull channel width, so that a meander belt is typically 10–14 times the channel width across. A meandering river **avulses** — abandons its course and captures a shorter path across the floodplain — when the slope of the valley floor down the abandoned path exceeds about one third of the slope of the active channel (Leopold and Newton), because at that point the energy available to the shorter course is enough to erode the mouth bar and capture the flow.
:::

::: example How big was the river? {#ex-meander}
A Cretaceous meander belt is 620 m wide, its channel sandstone is 11 m thick, and its palaeocurrents are unimodal. Estimate the bankfull width, the meander wavelength, the mean depth and the bankfull discharge, and state the uncertainty.
::: solution
A meander belt is 10–14 times the bankfull width, so
$$
W = \frac{620}{12} = 52\ \mathrm{m}, \qquad
\lambda = 12.6\times52 = 655\ \mathrm{m}.
$$
The width-to-depth ratio of a meandering river is 10–40, and the channel sandstone thickness of 11 m is a **minimum** for the depth because the bar truncates the thalweg; taking a width-to-depth ratio of 20 gives
$$
d = \frac{52}{20} = 2.6\ \mathrm{m},
$$
which is comfortably less than the 11 m of preserved sand, so the estimate is self-consistent and the true depth was probably 5–8 m with the rest of the channel removed by truncation.

For the discharge, a downstream hydraulic-geometry relation of the form $W = aQ^b$ with $b \approx 0.5$ and calibrated on large meandering rivers gives a bankfull discharge of order
$$
Q \approx \left(\frac{52}{3.0}\right)^{2} = 300\ \mathrm{m^3\,s^{-1}},
$$
with an uncertainty of a factor of three, because the coefficient $a$ varies by a factor of three between anastomosed, meandering and braided systems and because the palaeoslope is unknown. The honest statement is that this was a **large river** — of the order of the Rhine or the lower Mississippi's smaller tributaries — and that the reconstruction is good to a factor of two in width and a factor of three in discharge.

The point of the exercise is the asymmetry of the method. The **width** of a meander belt is a robust measurement that can be made from a quarry or a seismic attribute and gives the channel width to within a third; the **discharge** requires the slope, which is almost never preserved, and is therefore always an order-of-magnitude estimate. Palaeohydrology from geometry is a science of widths, not of discharges.
:::
:::

::: example Will it avulse? {#ex-avulsion}
A meandering river has a channel slope of $2.4\times10^{-5}$ and a sinuosity of 2.1. Its valley floor, down the straighter abandoned course, has a slope of $1.0\times10^{-5}$. Is the system avulsive, and what does the rock record of an avulsion look like?
::: solution
The ratio of valley slope to channel slope is
$$
\frac{1.0\times10^{-5}}{2.4\times10^{-5}} = 0.42 ,
$$
which exceeds the critical value of about $1/3$, so the system is **avulsive** and a course change should be expected within a human lifetime. The modern analogue is the Yazoo-Mississippi and the Atchafalaya, where the ratio is 0.4–0.5 and where avulsion is an active engineering problem, and the lower Ganges, where the same ratio has driven the migration of the whole system.

The rock record of an avulsion is a distinctive and much-sought package. At the **pivot** the abandoned channel is filled with fine sediment and an oxidised palaeosol, and the **avulsion splay** — a wedge of crevasse-channel sands and laminated silt that thins and fines away from the source — is built at the mouth. Downstream, the abandoned channel becomes a **meander-scour lake** and then a coal or a lacustrine mud, and the whole is bounded above by the new channel's basal scour. Because an avulsion redistributes the entire sediment load in a few years, an avulsion surface is one of the few **time markers** in a fluvial succession, and it is the surface along which a fluvial reservoir should be correlated rather than the base of the sand, which is diachronous.
:::
:::

::: widget plot
f: 12.6*x
x: 5, 400
y: 0, 5200
labels: \text{meander wavelength}
caption: Meander wavelength as a function of bankfull channel width, using the mid-range coefficient of 12.6. The line is straight through the origin, which is the content of the relation: a meander is a **self-similar** feature whose size is set by the channel that makes it and not by the valley it occupies. The practical use is the inverse — a meander-belt width measured on a seismic amplitude map or in a quarry gives the channel width, and with it the net-sand budget of a basin. The scatter about the line is a factor of 1.4, and it is largest for anastomosed and for tidally influenced rivers, whose wavelengths are longer than the relation predicts.
:::

## Fans, playas and lakes

::: definition Alluvial fans and playas {#def-fan}
An **alluvial fan** is a cone of sediment built where a confined mountain stream debouches onto an unconfined basin floor and loses its competence. Its three process end members are **debris flow** (a matrix-supported, boulder-rich, non-stratified lobe that stops abruptly and preserves its shape), **sheetflood** (a shallow, unchannelled, laterally extensive flood that lays lenticular beds of stratified gravel and sand on the upper fan), and **open-channel flow** (a channelised, laterally stable stream that lays lags and cross-bedded bars on the mid- and lower fan). A fan's **apex** is where the slope breaks, its **mid-fan** is the zone of maximum channel mobility, and its **distal fan** intertongues with the basin. A **playa** is the dry, saline, mud-cracked floor of a closed basin, and its deposits are laminated mud, evaporite crusts, and the **desiccation-curl** breccia formed when the curls of dried mud are torn up and redeposited.
:::

::: definition Lakes {#def-lake}
A **lake** receives its sediment from three sources: a **littoral** zone of waves and bars, a **profundal** zone of quiet suspension settling and varves, and the **delta** that connects them. A **meromictic** lake is stratified so that its deep water never mixes with the surface, and it is the classic site of organic-rich laminated mud and of the exceptional preservation that makes a Konservat-Lagerstätte. A **varve** is an annual couplet of a coarse summer layer and a fine winter layer, and a varve chronology is one of the few absolute geochronometers available in the Quaternary. A lake's **level** is a measurement of the balance between precipitation, runoff and evaporation, and a lacustrine transgression is therefore a **climate** signal in a way that a marine transgression, which is mostly an ice-volume and tectonic signal, is not.
:::

::: example Counting varves and reading a lake {#ex-varve}
A 14-m lacustrine succession shows varves 1.8 mm thick in its lower 9 m and 6 mm thick in its upper 5 m. The lower unit is laminated lime mudstone with no burrows; the upper unit has *Planorbis* gastropods, rootlets and desiccation cracks. Find the duration of each unit and interpret the history.
::: solution
The lower unit represents $9000/1.8 = 5000$ years and the upper $5000/6 = 830$ years, for a total of about 5800 years. The sedimentation rate rose from $1.8\ \mathrm{mm\,yr^{-1}}$ to $6\ \mathrm{mm\,yr^{-1}}$, a factor of 3.3.

The two units record opposite conditions. The lower unit, laminated, unbioturbated and calcareous, is a **deep, meromictic or seasonally ice-covered** lake with anoxia at the sediment–water interface; its low and constant varve thickness records a steady supply of fine carbonate and marl from a stable catchment. The upper unit, with gastropods, roots and desiccation cracks, is a **shallow, oxygenated, periodically emergent** lake; its thicker varves record either a higher productivity, a higher clastic supply, or — most likely, given the shallowing — the concentration of deposition into a smaller and more productive water column.

The history is a **lacustrine regression**, and because a lake's level responds to the precipitation–evaporation balance, the regression is a **drying** signal. Where such a succession is one of many stacked in a basin fill, the cycles are sapropel-type lake-level cycles and, in the classic cases — the Eocene Green River Formation, the Jurassic Carmel and the Triassic Castile — their periodicity has been used to measure the Milankovitch cycles of deep time with the precision of a varve chronometer.
:::
:::

::: history
The systematic study of continental deposits begins with Gilbert's (Gilbert) 1877 monograph on the Lake Bonneville basin, which established the ideas of a base-level-controlled profile and of the lacustrine cycle, and with his 1914 study of the Meadville and Eufaula river terraces, which founded the hydraulic interpretation of cross-bedding. The alluvial fan as a process-response system was worked out by Putnam (Putnam) and by the geographers of arid regions, and was given its modern three-process form by Bull (Bull) in 1972 and by Rust and Costello. The distinction between braided and meandering rivers was quantified by Leopold and Wolman (Wolman) in their 1957 paper on river channel patterns, which showed that the pattern correlates with stream power and sediment load and not with gradient alone, and the avulsion criterion used here is from Leopold and Newton's (Newton) 1953 study of the Atchafalaya. The hydraulic geometry relations are Leopold and Maddock's (Maddock) of 1953 and the downstream and at-a-station forms are due to Leopold and Maddock and to Dunne and Dietrich. Aeolian dune classification is the work of Bagnold (Bagnold), whose 1941 physics of blown sand remains the founding text, and of McKee and Tibert, whose 1964 and 1979 studies of the sand seas of the world established the facies association of the erg. Lacustrine facies models are the work of Eugster and Hardie (Hardie) on meromictic and alkaline lakes in 1978 and of Talbot, and the varve chronometer goes back to Sederholm's (Sederholm) 1899 identification and De Geer's (De Geer) varve chronology of the Baltic, which won the first great triumph of Quaternary geochronology and, in its over-extension to the Americas, one of its instructive failures.
:::

## Wind

::: definition Aeolian dunes {#def-aeolian}
An **aeolian** deposit is identified by its grain size (a tight, well-sorted fine to medium sand, because wind sorts far more finely than water), its **roundness** (grain-surface frosting and, in some settings, silica coatings), its **large-scale cross-bedding** with set thicknesses of metres, and its internal lamination of three types: **grainfall** (a low-angle, normal-graded, very fine lamination from the rain of saltating grains across a lee face), **grain-avalanche** (a steeper, inversely graded lamination formed when a lee face over-steepens to the angle of repose and fails), and **wind-ripple** lamination (a thin, low-angle, rippled lamination formed on the stoss and on the interdune floor). The dune types follow the **sand supply and the wind regime**: barchan (a crescent with horns downwind, on a limited supply and a unimodal wind), transverse dune (a long ridge normal to a unimodal wind and an abundant supply), barchanoid (a transitional crescent-ridge), linear or **seif** dune (a ridge parallel to the resultant of a bimodal wind), and star dune (a pyramidal dune of a multidirectional regime and a sediment trap, commonly at the edge of an erg).
:::

::: example An ancient erg {#ex-erg}
A sandstone shows sets of cross-bedding up to 22 m thick, composed of well-sorted 0.20-mm quartz sand with grainfall and grain-avalanche lamination in the ratio 3:1, tangential foresets dipping at 30$^\circ$ to 33$^\circ$, and no mud at all. The palaeocurrent rose is broad and octomodal. Estimate the dune height and wavelength, and identify the dune type.
::: solution
The preserved set thickness of 22 m is a minimum for the dune height, and with the aeolian relation $h_\text{set} \approx 0.08\lambda$ the wavelength is at least
$$
\lambda = \frac{22}{0.08} = 275\ \mathrm{m},
$$
which puts the dune height at $\lambda/12 \approx 23\ \mathrm{m}$ — consistent with the set thickness, so the dunes were about 25 m high with a 300-m wavelength. This is a **small erg by modern standards** (the Namib and the Taklamakan have dunes 100–300 m high and 1–2 km apart) but a large one by the standard of the rock record, where most aeolian set thicknesses are 1–10 m.

The **octomodal palaeocurrent rose** is the diagnostic observation. A barchan or transverse dune field of unimodal wind gives a strongly unimodal or bimodal rose with the transport direction normal to the crest; an octomodal rose means the winds blew from many directions and that the dunes were **star dunes** or **reversing dunes** of a multidirectional regime. Star dunes are the dunes of a **sediment trap** — a topographic or aerodynamic depression where the net sand transport converges — and they characterise the margins and centres of large ergs rather than their actively migrating parts.

The absence of mud, the tight grain size, the 3:1 grainfall-to-avalanche ratio and the 30–33$^\circ$ foresets together exclude every alternative. A subaqueous dune of that size would require a 45-m-deep flow and would carry mud; a beach would be reworked into horizontal or steeply dipping storm laminae; and a turbidite channel would have mud chips, grading and a marine fauna. The grainfall lamination alone is decisive, because a grainfall lamination forms only where grains fall through **air** onto a dry lee face, and it is the single most reliable primary sedimentary structure in geology.
:::
:::

::: warning Continental deposits are systematically missing, and the bias is not random
A continental succession is a record of the places where sediment happened to be stored, and the storage is controlled by subsidence, by base level and by climate. Three biases follow. **The preserved fraction is small and variable**: a large river delivers its whole load to the shelf and stores almost none on the floodplain, so a fluvial succession under-represents the wet, vegetated, low-gradient parts of the system and over-represents the arid, unvegetated, high-energy parts where the river actually cut and filled. **Vegetation changes the rules**: a vegetated floodplain is cohesive, meanders narrowly, and preserves overbank mud and palaeosols, whereas the bare, microbial-grounded floodplains of the Silurian and Devonian, before roots penetrated deeply, produced wide, shallow, anastomosing and braided systems from sediments that today would make a meandering river — which is why the great Old Red Sandstone and the Devonian of Greenland read as "arid braided" systems in a climate that was probably not arid. And **the climate signal is a preservation signal**: evaporites, calcretes, aeolian sands and playa muds are all deposits of dryness, and a basin fill dominated by them may record either a dry climate or a wet climate whose wet deposits were never stored. The discipline is to interpret a continental succession as a **filter** applied to a climate and a sediment flux, and to say what the filter passes and what it blocks.
:::

::: quiz
A fluvial sandbody is 400 m wide, 12 m thick, and is encased in overbank mud. What is the best estimate of the palaeochannel width?
- [ ] 400 m
- [x] 30–40 m
- [ ] 120 m
- [ ] 12 m
::: solution
The body is a **meander belt**, and a meander belt is 10–14 times the bankfull channel width, so the channel was 30–40 m wide. The 400 m is the width of the belt swept by the migrating channel, and using it as the channel width overestimates the palaeodischarge by an order of magnitude. The 12 m is the thickness of the preserved sand, which is a minimum for the depth and is commonly the sum of several storeys.
:::
:::

## Where this leads

The flows in these environments are quantified in [[sedimentology/sediment-transport]] and their bedforms in [[sedimentology/bedforms]]; the marine-influenced end members — deltas, estuaries and tidal flats — are in [[sedimentology/marine-environments]]; the facies logic is in [[sedimentology/facies]]; the soils and weathering that supply the sediment are in [[geomorphology/soils]] and [[geomorphology/weathering]]; and the basin-scale controls are in [[sedimentology/basins-sequences]].

::: summary
- Braided rivers take their character from a coarse, non-cohesive bedload; meandering rivers from cohesive banks and a suspension load; anastomosed rivers from subsidence matched to supply.
- A meander wavelength is 11–16 times the bankfull width, which makes a meander-belt width a measurement of channel width.
- A river avulses when the valley slope down the shorter course exceeds about a third of its channel slope.
- Alluvial fans are built by debris flows, sheetfloods and channelised flows, and their three deposits are unmistakable and commonly interbedded.
- Lakes are climate instruments: their level records precipitation minus evaporation, and their varves are an annual clock.
- Aeolian sand is identified by grainfall and grain-avalanche lamination, and the palaeocurrent rose identifies the dune type.
- Continental preservation is a filter, and its bias runs toward the dry, the coarse and the stored.
:::

## Exercises

::: exercise Sinuosity {level=1 check="1.8"}
A channel's thalweg is 36 km long between two points 20 km apart in a straight line. Find the sinuosity and classify the river.
::: solution
$S = 36/20 = 1.8$, which is a **meandering** river (the classes are: straight $< 1.05$, sinuous $1.05$–$1.3$, meandering $> 1.5$). A sinuosity of 1.8 is high but not extreme; the Amazon's tributaries in the Beni lowland reach 3 to 14.
:::
:::

::: exercise Meander wavelength {level=1 check="780"}
A meandering river has a bankfull width of 62 m. Estimate its meander wavelength.
::: solution
$\lambda = 12.6\times62 = 780\ \mathrm{m}$. The meander belt would be about 620–870 m wide, and the whole wavelength about 780 m, so a single bend occupies roughly a kilometre of valley.
:::
:::

::: exercise Avulsion {level=1 check="0.5"}
A river's channel slope is $2\times10^{-5}$ and the valley slope down its abandoned course is $1\times10^{-5}$. Find the ratio and say whether avulsion is expected.
::: solution
The ratio is $1/2 = 0.5$, which exceeds the critical $1/3$, so avulsion is expected. This is the Atchafalaya ratio, and it is the reason the Old River Control Structure exists.
:::
:::

::: exercise Fan processes {level=2}
A fan section shows, in one 20-m measured column, four boulder-bearing matrix-supported units with no stratification and rounded outs, eight lenticular beds of stratified coarse sand and granule lags 0.3–1.5 m thick, and one 6-m-thick channel fill with a scoured base and trough cross-bedding. Reconstruct the fan.
::: solution
The four matrix-supported boulder units are **debris-flow lobes**, and their lack of stratification and their rounded, abrupt margins are diagnostic. The eight lenticular stratified beds with granule lags are **sheetflood** deposits, and their lensoidal geometry and their lateral pinch-out mean that no single bed can be traced far. The 6-m channel fill is a **mid-fan distributory channel**, and its scour and cross-bedding record a confined, competent flow.

The proportions — debris flow 20 per cent by thickness, sheetflood 45 per cent, channel 30 per cent — place the measured section on the **upper- to mid-fan**, where all three processes coexist, rather than on the distal fan, which would be dominated by lacustrine mud and by thin distal debris-flow tongues. The interpretation to carry away is that a fan cannot be described by a single process: the correct facies model is a **three-process fan** whose relative contributions vary through a climate cycle, with debris flows dominant in a wet phase that wets the catchment and mobilises it, and channelised flows dominant in a dry phase when the vegetation is gone and the stream is efficient.
:::
:::

::: exercise Aeolian versus subaqueous {level=2}
A 15-m set of cross-bedded sand has a palaeocurrent rose with two modes 90$^\circ$ apart, foresets of 28$^\circ$, and mud chips at the base of some sets. Is it aeolian?
::: solution
Not necessarily, and probably not. The **mud chips** argue against a dry aeolian system, because mud chips require a mud source and a flow competent to rip it up, and an erg has neither. The **28$^\circ$ foresets** are below the angle of repose of dry sand (about 34$^\circ$) and are consistent with subaqueous grain-avalanche or with damp aeolian foresets. The **bimodal rose at 90$^\circ$** is consistent with a **reversing or barchanoid** aeolian dune of bimodal wind, but equally with a subaqueous dune whose crest has been refashioned by a cross-current, or with a tidal dune whose two modes are flood and ebb.

The decisive observations are the **grainfall lamination**, which forms only in air; the **grain-surface textures**, where the pitting and silica coatings of saltation in air differ from the coatings of a subaqueous grain; the **size sorting**, which is far tighter in aeolian sand; and the **absence of any aquatic fauna or mud drape**. Where these are ambiguous, the correct answer is "an aeolianically reworked subaqueous sand, or a damp interdune", which is a real and common environment that neither end-member model describes.
:::
:::

::: exercise Lake level {level=2 check="3.3"}
Using the varve data of [[#ex-varve]], by what factor did the sedimentation rate increase between the lower and upper units?
::: solution
$6/1.8 = 3.3$. The interpretation is not straightforward, because a rise in varve thickness can mean more water, more clastic supply, more productivity, or a shallower and therefore more concentrated basin; the associated facies — gastropods, roots and desiccation cracks — show that in this case the cause was shallowing rather than wetting.
:::
:::

::: exercise A fluvial architecture {level=3}
A 300-m-wide, 40-m-thick sandstone body has a concave-up erosive base, an internal structure of stacked trough cross-bedded sets with 3-m set thickness and a unimodal palaeocurrent, an upper part of interbedded sand and mud with rootlets, and it is surrounded by 200 m of overbank mud and palaeosol. Reconstruct the body and estimate the palaeochannel's width and depth.
::: solution
The body is a **fluvial channel and its accretion deposits**, and the surrounding mud is its overbank. The concave-up erosive base is the channel's basal scour; the stacked trough cross-beds with a unimodal palaeocurrent are **point-bar or lateral-accretion** deposits, and the rootleted top is the abandonment surface and the start of the next cycle.

The 3-m set thickness gives a dune wavelength of $3/0.08 = 37.5\ \mathrm{m}$ and a dune height of about 3 m, which for a subaqueous dune implies a flow depth of $37.5/6 = 6.3\ \mathrm{m}$ — a **minimum** for the channel depth, because the dunes formed on the bar and not in the thalweg. The **body width of 300 m is not the channel width**: a meander belt is 10–14 times the channel width, so the channel was $300/12 = 25\ \mathrm{m}$ wide, and the 40-m thickness of the body is the sum of many storeys, not the depth of one. With a width-to-depth ratio of 15 the channel was about 2 m deep and 25 m wide, which is a small river, and the 6.3-m dune-derived depth is then too large — the inconsistency is resolved by recognising that the 3-m sets are **not** dune sets but the accretion units of a bar, whose thickness is set by the bar height and not by a dune.

The lesson is the one that every reservoir geologist learns once: a set thickness is a dune height **only** when the structure is a dune, and the interpretation of a fluvial reservoir's architecture turns on distinguishing bar accretion from dune migration.
:::
:::

::: exercise A continental climate reconstruction {level=3}
A Permo-Triassic basin fill is 70 per cent red siltstone with calcrete horizons, 20 per cent well-sorted quartz sand with grainfall lamination and octomodal palaeocurrents, and 10 per cent laminated grey mudstone with fish and freshwater marl. Reconstruct the climate and the sediment system, and identify what the red colour does and does not prove.
::: solution
The three components are a **floodplain**, an **erg** and a **lake**. The red siltstone with calcretes is an oxidised, seasonally dry, periodically emergent floodplain with a carbonate soil; the well-sorted quartz sand with grainfall lamination is an **aeolian dune field** whose octomodal rose indicates a multidirectional or star-dune regime; and the laminated grey mudstone with fish and marl is a **freshwater lake** with at least seasonal anoxia at the bed. The system is an **arid to semi-arid alluvial-lacustrine-eolian complex** of the type of the modern Tarim Basin or the Permian of the Delaware Basin, with the sand sea fed by the reworking of the rivers that crossed it and the lakes standing in the deflations and on the floodplain.

The **red colour** proves **oxidising** conditions in the sediment after deposition, which requires that the sediment stood above the water table long enough for haematite to form — a **drained, seasonally unsaturated** floodplain. It does **not** prove an arid climate, because red beds form in well-drained tropical and subtropical settings with abundant rainfall, and the modern equivalent of a red bed is often a lateritised, deeply weathered, wet landscape. What ties the interpretation to aridity is the **calcrete**, which requires evaporation and a shallow water table, and the **aeolian sand**, which requires a lack of vegetation and a supply of dry sand. Remove those two and the red colour alone would support no climate conclusion at all.

The weakest link in the reconstruction is the **relative timing**. An erg and a lake are not obvious neighbours, and their interbedding may record either a lateral juxtaposition or a vertical alternation driven by climate cycles that turned the sand sea on and off. The test is the lateral continuity of the units and the presence, between them, of a transitional facies — the interdune mud, the reworked dune sand with lake ripples — that would prove they stood side by side.
:::
:::
