At Siccar Point on the Berwickshire coast a visitor can stand on a shelf of flat-lying Old Red Sandstone, Devonian in age, and look down at the greywackes beneath it. Those greywackes were deposited as horizontal mud and sand on a Silurian sea floor 430 million years ago; at some point afterwards they were buried, baked, squeezed into vertical folds, uplifted, and worn flat as a pavement; and then, much later, they were submerged again and buried by the Devonian sandstone. Every geologist who has stood there has had the same reaction, and it is not admiration of the rock. It is the shock of realising that the contact between two beds is an interval of hundreds of millions of years, and that the whole visible thickness of rock above it is a footnote.

James Hutton saw the surface in 1788, and his reaction was the founding argument of the earth sciences: that the Earth must be vastly older than any reckoning from scripture or from the cooling of a hot ball, because the processes he could see — a wave cutting a platform, a river carrying mud — are still running at the same rate, and the record they have left requires time on a scale that has no everyday analogue. This chapter is about the tools that let you read such a surface: the rules that give order without numbers, and the way that order is turned into a global scale.

## The axioms

::: definition Steno's principles {#def-steno}
**Superposition.** In an undisturbed succession of sedimentary rocks, each bed is younger than the one below and older than the one above, because deposition builds upwards.
**Original horizontality.** Beds were deposited approximately horizontally, because sediment settles on a surface of nearly constant level; therefore a bed that is now vertical was made vertical afterwards.
**Original lateral continuity.** A bed extends laterally until it thins and pinches out or runs out against a different facies; therefore two separated outcrops of the same bed are parts of one deposition.
**Cross-cutting relationships.** Any feature that cuts a rock — a fault, a dyke, an erosion surface, an unconformity — is younger than the rock it cuts.
**Inclusions.** Fragments enclosed in a rock are older than that rock.
:::

These five are not observations but inferences from a single assumption, that deposition and deformation work the way they visibly work now. That assumption has a name and a history — **uniformitarianism**, in Lyell's formulation, that the present is the key to the past — and a more careful modern version, **actualism**: the laws of nature are constant, and the processes we see operating are the same kinds of process that made the record, though not necessarily at the same rates or in the same combinations.

::: proposition The principles give a partial order, and correlation is what makes it total {#prop-partial-order}
Within one outcrop, superposition and cross-cutting relationships give a sequence of events that is complete and unambiguous. Between two basins, or two continents, they give nothing at all: there is no physical connection between a Carboniferous sandstone in Wales and a Carboniferous sandstone in Russia, and their equivalence is an assertion that has to be justified by some independent argument — the same fossils, the same magnetic polarity, the same isotopic excursion, the same ash bed. Every global timescale is therefore a hierarchy: a very strong local order, a strong regional order built by fossil correlation, and a weaker intercontinental order that has been revised repeatedly as the correlation changed.
:::

::: proof
That the order within a section is a *partial* order is easy to see: two beds may be related by superposition, or they may be unrelated because one has been removed by erosion, or because they are the same age in the sense of being deposited at the same time in different places. To make the order total you need a relation that identifies simultaneity, and simultaneity cannot be observed directly in rocks — only inferred from something that was globally synchronous, such as a magnetic reversal, an oceanic anoxic event, an ash fall from one eruption, or the first appearance of a fossil species. Each of those is an independent hypothesis about a time-marker, and each is falsifiable: an ash bed has one age, so if two beds correlated by a fossil assemblance give different ash ages, one of the correlations is wrong. ∎
:::

::: warning Superposition can be inverted
The principle holds only for a succession that has not been turned over. Tight folding, thrusting and nappe emplacement can put young rocks beneath old, and in such terrains the geologist must establish the **facing** of the beds before using them as a clock: graded bedding (coarse below, fine above), ripple cross-lamination, mudcracks, rain prints, the way load casts bulge downwards, the way fossils or crystals point, and the order of pillow lavas, which chill inward from the top. A formation that has been inverted reads as a complete, younging-upward sequence and will happily contradict every fossil age in it. Where the facing is ambiguous, cross-cutting relationships and the ages of igneous intrusions are the only reliable arbiters.
:::

## Unconformities: the missing record

::: definition Types of unconformity {#def-unconformity}
An **unconformity** is a surface of erosion or non-deposition between rocks of different ages. An **angular unconformity** has tilted or folded rocks below an eroded surface, overlain by younger beds at an angle — the Siccar Point type. A **disconformity** has parallel beds above and below a buried erosion surface, and can only be detected by fossils, by a palaeosol, by a hardground encrusted with oysters, or by an age gap. A **nonconformity** has sedimentary rocks over igneous or metamorphic rock, and records the removal of many kilometres of crust. A **paraconformity** is a surface with no visible erosion and no angular discordance, known only from the fossil or isotopic gap.
:::

::: example How much of Earth history is missing? {#ex-missing-time}
A sedimentary basin accumulates sediment at a mean rate of $0.1\ \mathrm{mm\,yr^{-1}}$ whenever it is depositing, and is raised, eroded and starved for $20\%$ of the time. A $5\ \mathrm{km}$-thick succession is measured, and the fossils show that it spans $500\ \mathrm{Myr}$. Find the fraction of the interval that is actually preserved, and the mean thickness of rock that has been removed.
::: solution
At $0.1\ \mathrm{mm\,yr^{-1}} = 0.1\ \mathrm{km\,Myr^{-1}}$, $500\ \mathrm{Myr}$ of continuous deposition would give $50\ \mathrm{km}$ of section. The preserved $5\ \mathrm{km}$ is therefore $10\%$ of what should be there, and the $20\%$ of the time spent not depositing accounts for only a fifth of the loss: the rest has been deposited and then **eroded away**.

This is the result that made John Wheeler say in 1958 that most of Earth history is missing from the rock record, and the modern estimates are worse, not better: on the continents the preserved fraction of any interval is commonly a few per cent, and in the deep sea the sedimentary record of the Palaeogene is largely gone, removed by the turbidity currents that built the fans on the continental rise. The corollary matters for every argument from absence: "no fossils of X in beds of this age" is very weak evidence that X did not exist, and the same is true of the absence of an impact layer, an anoxic event or a mass extinction.
:::
:::

::: svg
caption: The four kinds of unconformity, drawn as they appear in the field. An angular unconformity records deformation and uplift before burial; a disconformity is a buried erosion surface between parallel beds and is detected by fossils or by a soil or a hardground; a nonconformity is sedimentary rock on crystalline basement and records the removal of kilometres of overburden; a paraconformity is invisible except in the fossil record. Each one is a gap in time, and in most basins the gaps contain more time than the beds.
<svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The four types of unconformity">
  <style>
    .young { fill: var(--accent-wash); stroke: var(--rule-2); stroke-width: 1; }
    .old { fill: var(--warm-wash); stroke: var(--rule-2); stroke-width: 1; }
    .base { fill: var(--deemph); stroke: var(--rule-2); stroke-width: 1; }
    .surf { stroke: var(--bad); stroke-width: 2.6; fill: none; }
    .bed { stroke: var(--series-1); stroke-width: 1.2; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
  </style>
  <!-- angular -->
  <g>
    <rect class="old" x="20" y="150" width="160" height="110"/>
    <line class="bed" x1="40" y1="150" x2="40" y2="260"/><line class="bed" x1="70" y1="150" x2="70" y2="260"/>
    <line class="bed" x1="100" y1="150" x2="100" y2="260"/><line class="bed" x1="130" y1="150" x2="130" y2="260"/>
    <line class="bed" x1="160" y1="150" x2="160" y2="260"/>
    <path class="surf" d="M20,150 L180,150"/>
    <rect class="young" x="20" y="90" width="160" height="60"/>
    <line class="bed" x1="20" y1="110" x2="180" y2="110"/><line class="bed" x1="20" y1="130" x2="180" y2="130"/>
    <text class="lab" x="24" y="80">angular</text>
    <text class="sub" x="24" y="278">tilted below, flat above</text>
  </g>
  <!-- disconformity -->
  <g transform="translate(200,0)">
    <rect class="old" x="20" y="150" width="160" height="110"/>
    <line class="bed" x1="20" y1="180" x2="180" y2="180"/><line class="bed" x1="20" y1="215" x2="180" y2="215"/>
    <path class="surf" d="M20,150 Q60,140 100,150 T180,150"/>
    <rect class="young" x="20" y="90" width="160" height="60"/>
    <line class="bed" x1="20" y1="110" x2="180" y2="110"/><line class="bed" x1="20" y1="130" x2="180" y2="130"/>
    <text class="lab" x="24" y="80">disconformity</text>
    <text class="sub" x="24" y="278">parallel beds, gap by fossils</text>
  </g>
  <!-- nonconformity -->
  <g transform="translate(400,0)">
    <rect class="base" x="20" y="150" width="160" height="110"/>
    <path class="surf" d="M20,150 L180,150"/>
    <rect class="young" x="20" y="90" width="160" height="60"/>
    <line class="bed" x1="20" y1="110" x2="180" y2="110"/><line class="bed" x1="20" y1="130" x2="180" y2="130"/>
    <text class="lab" x="24" y="80">nonconformity</text>
    <text class="sub" x="24" y="278">cover on crystalline basement</text>
  </g>
  <!-- paraconformity -->
  <g transform="translate(600,0)">
    <rect class="old" x="0" y="150" width="150" height="110"/>
    <line class="bed" x1="0" y1="180" x2="150" y2="180"/><line class="bed" x1="0" y1="215" x2="150" y2="215"/>
    <line class="surf" x1="0" y1="150" x2="150" y2="150" stroke-dasharray="7 5"/>
    <rect class="young" x="0" y="90" width="150" height="60"/>
    <line class="bed" x1="0" y1="110" x2="150" y2="110"/><line class="bed" x1="0" y1="130" x2="150" y2="130"/>
    <text class="lab" x="4" y="80">paraconformity</text>
    <text class="sub" x="4" y="278">no surface, only a time gap</text>
  </g>
</svg>
:::

## Correlation, and the tools that make it global

Lithology correlates well over tens of kilometres and badly over thousands, because the same sandstone is deposited many times. The tools that work across a continent or an ocean are the ones that record something synchronous:

- **Fossils.** The first appearance of a species is, in principle, a single moment spread over its habitat. A good **index fossil** has a short stratigraphic range, a wide distribution, abundant shells or pollen that survive in the rock, and is independent of facies — it lived in many environments, so its presence is not simply a sign of the mudstone. Conodonts, graptolites, ammonites, foraminifera and pollen are the workhorses for exactly these reasons.
- **Magnetic polarity.** Reversals are globally synchronous to within the few thousand years of their transition and are recorded in marine and lacustrine muds and in lavas. **Magnetostratigraphy** gives a pattern of normal and reversed zones that can be matched to the geomagnetic polarity timescale, and is the method by which most Cenozoic sections, and many older ones, are dated to better than a per cent.
- **Chemistry.** Carbon-, oxygen-, strontium-, osmium- and boron-isotope curves through a section give a chemostratigraphic fingerprint. The negative carbon isotope excursions of the Palaeocene–Eocene thermal maximum, the end-Permian and the PETM's cousins are used as tie-lines over thousands of kilometres.
- **Ash beds.** A single eruption can blanket $10^6\ \mathrm{km^2}$ with a distinctive glass composition and zircon age. **Tephrochronology** gives isochronous horizons accurate to a few tens of kilometres and, when the zircon is datable, an absolute age on the bed itself.

::: example Correlating with a fossil first appearance {#ex-fad}
A graptolite species whose total range is $1.8\ \mathrm{Myr}$ is used to correlate two sections $3000\ \mathrm{km}$ apart. Its first appearance is taken as the base of a zone. In section A the species occurs in mudstone at $120\ \mathrm{m}$; in section B the lowest occurrence is in a sandstone at $340\ \mathrm{m}$, and the base of the overlying shale, which is the same facies as A's mudstone, is at $300\ \mathrm{m}$. Estimate the maximum error in the correlation, and name the two effects that make a first appearance diachronous.
::: solution
If the species' range is $1.8\ \mathrm{Myr}$ and its first appearance is used as an isochron, the correlation is good to at most the range of the species, i.e. $\pm 0.9\ \mathrm{Myr}$, and in practice to the interval between its first appearance and its acme — commonly a few hundred thousand years. The facies change in B is the second problem: the species may have been present below $300\ \mathrm{m}$ in the sandstone and simply not preserved, or not living there.

The two effects are (**i**) **evolutionary diachrony** — a species appears at different times in different parts of its range, and the first appearance in a marginal basin can lag the global first appearance by hundreds of thousands of years — and (**ii**) **preservation and sampling diachrony** — the record is incomplete, so the lowest fossil found is younger than the lowest fossil that ever lived. Both push the observed first appearance *up* section, never down, which means that a first-appearance datum is a minimum age for the evolution of the species and a maximum age for the bed. That asymmetry is the reason the base of a stage is defined on one chosen section, the GSSP, rather than on the first appearance of anything.
:::
:::

::: widget plot
f: 3.5 - 0.62*x
x: 0, 7
y: -2, 4
points: 3, 1.64; 6, -0.22
labels: log10 rate (mm/yr) vs log10 span (yr)
caption: The measured rate of sediment accumulation falls as the interval over which it is measured grows — the "MEH curve" of Sadler (1981), here for shallow-marine sequences. The axes are logarithmic: $x$ is $\log_{10}$ of the time span in years and $y$ is $\log_{10}$ of the apparent sedimentation rate in millimetres per year. Over a millennium the rate looks like $50\ \mathrm{mm\,yr^{-1}}$; over a million years, $0.8$; over ten million, $0.2$. The reason is not that sedimentation slowed, but that the long average includes the gaps, the starved intervals and the surfaces where rock was removed. Every rate in this curriculum that is quoted "per million years" is a number of this kind, and every one of them is an average over a record that is mostly missing.
:::

::: example Two ash beds, one section {#ex-ashes}
A lacustrine section contains two bentonites of identical glass composition: the lower at $120\ \mathrm{m}$ gives a CA-ID-TIMS zircon age of $104.21 \pm 0.05\ \mathrm{Ma}$, the upper at $340\ \mathrm{m}$ gives $103.10 \pm 0.06\ \mathrm{Ma}$. Find the mean sedimentation rate and its uncertainty, and say what the identical composition does and does not prove.
::: solution
The interval is $220\ \mathrm{m}$ in $1.11\ \mathrm{Myr}$:
$$
R = \frac{220}{1.11} = 198\ \mathrm{m\,Myr^{-1}} = 0.20\ \mathrm{mm\,yr^{-1}} .
$$
The uncertainty in the interval is $\sqrt{0.05^2 + 0.06^2} = 0.078\ \mathrm{Myr}$, or $7\%$, so $R = 198 \pm 14\ \mathrm{m\,Myr^{-1}}$ — an uncertainty of only $7\%$ on a rate averaged over a million years, which is why ash beds are worth the price of a zircon separation.

The identical major-element composition shows that the two beds came from **one eruption**, so they are isochronous and can be used to tie sections together over the whole extent of the ash fall, which for a large eruption may be a continent. What it does not prove is that the two sections are otherwise equivalent: the ash fell through whatever water column or soil profile was there, and the intervening $220\ \mathrm{m}$ can be entirely different facies, entirely different thickness, or entirely missing in the second section. An ash bed is a line, not a correlation of everything between the lines.
:::
:::

## Facies, Walther's law, and the geometry of a transgression

::: definition Facies and Walther's law {#def-facies}
A **facies** is a body of rock with the characteristics — lithology, sedimentary structures, fossils, colour, bedding — that record a particular depositional environment. **Walther's law** states that the vertical succession of facies in a conformable section is the same as the lateral succession of the environments that produced them, provided there is no unconformity. A **transgression** — sea level rising relative to the land — therefore stacks shoreface sand beneath offshore mud beneath lagoon peat, a *fining-upward*, *deepening-upward* succession, and lays the shoreline progressively inland. A **regression** does the opposite: a coarsening-upward, shallowing-upward succession, with the shoreline moving seaward.
:::

::: example Reading a transgression {#ex-transgression}
A measured section, from the base: $12\ \mathrm{m}$ of cross-bedded conglomerate and channel sand with rootlets and coal; $8\ \mathrm{m}$ of finely laminated sandy silt with oyster reefs and mudcracks; $25\ \mathrm{m}$ of grey marine shale with ammonites and glauconite; $6\ \mathrm{m}$ of cross-bedified clean sandstone with ripple-laminated heterolithic facies at its base; then $20\ \mathrm{m}$ of the same grey shale. Interpret the succession and locate the maximum flooding surface.
::: solution
Base to top: a coastal plain and fluvial system (coal, rootlets, channels), passing up into a tidal flat and estuary (mudcracks, oysters, silt), then open marine shelf (ammonite shale, glauconite) — a **transgressive, deepening-upward** succession. The clean sandstone with a rippled heterolithic base is a shoreface sand deposited as the shoreline came back — a **regression, shallowing-upward** — and the return to shale is a second transgression.

The **maximum flooding surface** is the base of the second shale, the surface at which the shoreline was furthest inland and the water deepest; it is commonly marked by a condensed section — a hardground, a concentration of phosphorite nodules or reworked phosphatic grains, an abundance of authigenic minerals, or a peak in total organic carbon — because at maximum flooding the sediment supply is at its lowest and the sea floor is being carpeted by everything that fell on it for millions of years. Condensed sections are the most time-rich surfaces in any basin and the best places to look for an unconformity disguised as a bedding plane.
:::
:::

::: history
Nicolas Steno set out the principles of stratigraphy in 1669 in forty-odd pages, in a book whose real subject was how a stone shaped like a tongue got inside another stone. Robert Hooke and Ole Worm had already argued that fossils were remains of living things rather than games of nature, and Steno's account of a shark's tooth settled the question for a generation. James Hutton turned the logic on itself in 1785 and 1788, showing that the record implies immensity, and John Playfair and John Hall found the angular unconformities that proved it. William Smith, a canal surveyor from Oxfordshire, established between 1793 and 1815 that strata follow a fixed order and can be identified by their fossils anywhere in England, and produced the map that made stratigraphy a practical science; Georges Cuvier and Alexandre Brongniart were doing the same for the Paris basin at the same time, and Cuvier's extinction argument gave them both a reason. Charles Lyell's *Principles* (1830–1833) assembled the argument for uniform rates, and Adam Sedgwick, Roderick Murchison and Henry De la Beche, arguing bitterly over the age of the Cambrian and Silurian rocks of Wales and the Border country, drew most of the Palaeozoic boundaries still in use. The word "biostratigraphy" and the discipline's modern form arrived with the geological surveys of the mid-nineteenth century, and the international timescale with the First Geological Congress of 1878, which began the long argument about whether a stage should be defined by a rock, a fossil, or an age.
:::

::: quiz
A sandstone body contains fragments of the shale it lies on, and is cut by a basalt dyke that is itself eroded at its top by an overlying conglomerate. What is the correct order, oldest first?
- [ ] sandstone, shale, dyke, conglomerate
- [x] shale, sandstone, dyke, conglomerate
- [ ] dyke, shale, sandstone, conglomerate
- [ ] conglomerate, dyke, sandstone, shale
::: solution
The sandstone contains inclusions of the shale, so the shale is older. The dyke cuts the sandstone, so it is younger. The conglomerate erodes the dyke, so it is youngest: shale → sandstone → dyke → conglomerate. Note that the *age* of the dyke is not the age of the magma's eruption necessarily — it is younger than the sandstone and older than the conglomerate, and that bracket is all the field relation gives; a radiometric date on the dyke would close it.
:::
:::

## Nomenclature: how the timescale is actually built

Three parallel systems describe the same rocks and are constantly confused. **Lithostratigraphy** names bodies of rock (formation, member, group) by their lithology and is local. **Biostratigraphy** names intervals by their fossils (a range zone, an acme zone, an assemblage zone) and is a statement about organisms, not about time. **Chronostratigraphy** names intervals of time as rocks — the Jurassic System is the rock deposited in the Jurassic Period — and is what the international timescale is made of.

A **stage** is the working unit of chronostratigraphy, and since 1974 each has been defined by a **GSSP**, a "golden spike": a single measured section, a single horizon in it, and a definition in terms of the first appearance of a chosen fossil species in that horizon, ratified by a subcommission and a two-thirds vote of the International Union of Geological Sciences. The stage then has a lower boundary that is a physical point in a rock, and every other section in the world is assigned to it by correlation. The system is deliberately conservative: it is designed to be stable rather than accurate, which is why some stage boundaries are now known to be diachronous by a million years and why the definition of the Anthropocene was rejected in 2024 rather than allowed to disturb the scale.

::: summary Key takeaways
- Steno's principles — superposition, horizontality, continuity, cross-cutting, inclusions — give the order of events in a section, and are valid only for a succession that has not been overturned or thrusted.
- Unconformities are the interesting surfaces: they record uplift, erosion and missing time, and in most basins the gaps contain more time than the beds.
- The rock record is mostly missing. A typical continental succession preserves a few per cent of the interval it spans, so arguments from absence are weak.
- Correlation across a basin needs a synchronous marker: fossils, magnetic polarity, isotope chemistry or an ash bed. Lithology alone does not travel.
- A fossil first appearance is a minimum age for the species and a maximum age for the bed, because both evolution and non-preservation push it up section.
- Walther's law makes a vertical succession a map of environments sideways; transgressions fine and deepen upward, regressions coarsen and shallow upward, and the maximum flooding surface is where the condensed section is.
- The timescale is a human construction: stages defined by golden spikes, ratified by committees, stable by design and revised only when the vote goes the other way.
:::

## Exercises

::: exercise Ordering events {level=1 check="4"}
A sequence contains: (1) a conglomerate resting on an eroded surface in folded shale; (2) folded shale; (3) a granite dyke cutting the shale but not the conglomerate; (4) a normal fault cutting the shale and the dyke but not the conglomerate. How many distinct events are recorded, and which is the youngest? (Enter the number of events.)
::: solution
Four: deposition and folding of the shale; intrusion of the dyke (after folding, since it cuts the shale and is not folded); faulting (after the dyke, since it cuts it); erosion and then deposition of the conglomerate, which truncates the fault and is undeformed. The youngest event is the deposition of the conglomerate; the erosion surface beneath it is older than the conglomerate and younger than the fault.
:::
:::

::: exercise Facing {level=1}
Name two younging criteria that survive recrystallisation, and one that does not.
::: solution
Graded bedding and cross-lamination survive as a geometry even when the minerals are gone, as do load casts and the chilled margins of pillow lavas. Mudcracks do not survive metamorphism, and ripple geometry can be transposed by foliation. In a high-grade terrain the reliable evidence is therefore the relation to intrusions and to the stratigraphic facing of unmetamorphosed cover, not the sedimentary structures.
:::
:::

::: exercise Unconformity types {level=1 check="disconformity"}
Two parallel limestone beds are separated by a surface with iron-stained cobbles, a palaeosol and brackish oysters. What kind of unconformity is it, and what does the evidence show?
::: solution
A **disconformity**: parallel beds, so no angular discordance, but the soil, the oxidised cobbles and the brackish oysters all show that the sea went away and the surface was weathered. The gap is proven by the fossils and the palaeosol, not by the geometry.
:::
:::

::: exercise Completeness {level=2 check="0.05"}
A $2.4\ \mathrm{km}$-thick succession spans $400\ \mathrm{Myr}$ and the basin's plausible maximum accumulation rate is $0.12\ \mathrm{mm\,yr^{-1}}$. Find the fraction of the interval preserved as rock.
::: solution
Maximum possible thickness $= 0.12\ \mathrm{mm\,yr^{-1}} \times 4\times10^{8}\ \mathrm{yr} = 4.8\times10^{7}\ \mathrm{mm} = 48\ \mathrm{km}$. Preserved fraction $= 2.4/48 = 0.05$, i.e. $5\%$. Ninety-five per cent of the time is represented by a surface, a thin bed, or nothing at all.
:::
:::

::: exercise Reworked fossils {level=2 check="younger"}
A sandstone contains well-preserved ammonites of two faunas: one of the age of the beds below, and one of species otherwise known only from beds $200\ \mathrm{m}$ higher in the section. What is the age of the sandstone, and what happened to the second fauna?
::: solution
The sandstone is the age of the beds it lies on — the older fauna is **indigenous** and gives the age. The second fauna has been **reworked**: the ammonite-bearing beds higher in the section were already exposed and eroded when the sand was being shed, and their fossils were transported and buried in the sand. Reworked fossils are identified by abrasion, by breakage, by mineralisation different from the matrix, and by occurring in a rock whose other contents contradict them. The rule is that the age given by the *best preserved, least transported* assemblage wins, and that a fauna containing species of two ages is evidence of erosion somewhere, not of two ages of deposition.
:::
:::

::: exercise Magnetostratigraphy {level=2 check="2.4"}
A lacustrine section records polarity zones matched to the geomagnetic polarity timescale. The base of the section lies at the base of chron C5n.2n ($10.9\ \mathrm{Ma}$) and the top at the top of C5n.1n ($7.6\ \mathrm{Ma}$), and the section is $8.2\ \mathrm{km}$ thick — but the correlation is contested, and an alternative places the top at the top of C5n.2n ($10.0\ \mathrm{Ma}$). Find the sedimentation rate for each correlation and say which is more likely if the basin's other margins show $3\ \mathrm{mm\,yr^{-1}}$.
::: solution
Correlation A: $8.2\ \mathrm{km}$ in $3.3\ \mathrm{Myr}$ gives $2.5\ \mathrm{mm\,yr^{-1}}$. Correlation B: $8.2\ \mathrm{km}$ in $0.9\ \mathrm{Myr}$ gives $9.1\ \mathrm{mm\,yr^{-1}}$. Correlation A is closer to the basin's other margins and is preferred; the exercise is a demonstration of why magnetostratigraphic correlations must be tested against the plausible range of accumulation rates, because a polarity pattern can be matched to the timescale at several positions and only one of them gives a sensible rate.
:::
:::

::: exercise Deriving Walther's law {level=3}
State Walther's law precisely and give two reasons why a real vertical succession fails to reproduce the lateral succession even when it is conformable.
::: solution
Walther's law: if a facies A passes laterally into facies B without a break, then a vertical section through a transgressing or regressing shoreline will contain A below B (or above, depending on the direction of migration), and the vertical order reproduces the lateral order of the environments.

Two failures. (i) **Reworking and condensation**: transgression erodes the lower part of the emerging profile, so the vertical succession skips the facies that were there laterally — a ravinement surface removes the lagoon and puts the shoreface sand directly on the coastal plain. (ii) **Non-equivalence of rates**: the shoreline may migrate faster than the environment can build, so a facies that occupies $50\ \mathrm{km}$ laterally is represented by $20\ \mathrm{cm}$ vertically, and the vertical profile is a compressed, biased sample of the lateral one. A third, more subtle, is that some environments — a carbonate platform's margin, for instance — are not passed over at all if the transgression is fast, so their facies never appear in the vertical succession.
:::
:::

::: exercise The GSSP problem {level=3}
A stage boundary is defined by the first appearance of a conodont species in one section in Nevada. Explain three distinct ways in which the base of the same stage in a section in China can be wrong by more than half a million years, and how each is tested.
::: solution
(i) **Diachronous first appearance.** The species evolved in one region and migrated; its first appearance in China postdates its first appearance in Nevada. Tested by high-precision CA-ID-TIMS dates on ash beds bracketing the boundary in both sections, and by using several markers at once. (ii) **Preservation and sampling.** The lowest Chinese occurrence is not the lowest occurrence: the species was there earlier in an unfossiliferous or unsampled facies. Tested by sampling more densely, by bulk-sieving for microfauna, and by looking in the equivalent facies elsewhere in the basin. (iii) **Correlation error.** The two sections are tied by a fossil assemblage or an isotope curve that is itself ambiguous, so the Chinese boundary is drawn at the wrong level. Tested by independent markers — a distinctive ash bed, a magnetic polarity reversal, a strontium isotope excursion — that do not depend on the fossil.

All three are real and all three have moved boundaries. The 2012 redefinition of the base of the Tournaisian, the 2018 redefinition of the base of the Greenlandian, and the long argument over the base of the Cambrian (moved from a trace fossil to a small shelly fossil and then to a combination) are examples of the system correcting itself by exactly this method.
:::
:::

::: exercise A field problem {level=3}
You are mapping a mountain belt and find the same fossil assemblage in three lithologies: a limestone, a shale and a sandstone, each $200\ \mathrm{m}$ thick, in the same stratigraphic position at three localities $40\ \mathrm{km}$ apart. A colleague maps them as three formations of different ages. Set out the argument for and against, and design the test.
::: solution
**For the colleague:** three formations is the lithostratigraphic convention, and if the three lithologies are separated by sharp contacts that can be mapped, they are mappable units. **Against:** identical faunas in the same stratigraphic position are strong evidence that the three bodies are one time-slice deposited in three adjacent environments — platform limestone, basin shale, delta-front sandstone — and that they interdigitate laterally rather than overlying one another. If they are facies, then calling them formations of different ages will produce a phantom stratigraphy and a phantom thrust fault where the units are put in contact.

**The test:** walk the contacts. Facies boundaries intergrade, show identical bedding at the margin, contain intraclasts of the neighbouring facies and carry the same fauna across the contact; a formation boundary is a surface of erosion or non-deposition, has a fauna change across it, and can be traced through a change of facies. Add a sedimentological tranche — grain-size trends, the palaeocurrents, the fauna's ecological tolerance — and, if the argument is still alive, date the base of each lithology with ash beds or with conodont zones at a finer resolution than the disputed interval. This is a common and consequential argument in the history of stratigraphy, and the facies interpretation has won it more often than the formation interpretation.
:::
:::
