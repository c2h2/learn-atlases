The margin between the continent and the ocean is where three systems meet — the sediment that the rivers deliver, the waves and tides that the atmosphere imposes, and the subsidence that the tectonics allow — and the shape of the resulting coast is the outcome of their contest. Marine environments preserve the most laterally continuous, best correlated and most economically important stratigraphy in the record, because they are the one place where sediment is stored in a body that is both thick and predictable.

## The shoreface profile

::: definition Coastal zonation {#def-zonation}
A wave-dominated coast is zoned, from the land outward, into the **back-barrier lagoon or coastal plain**, the **barrier island** and its washover fans, the **upper shoreface** from the low-tide level down to fair-weather wave base, the **shoreface transition** (the "transition zone" or "lower shoreface") between fair-weather and storm wave base, and the **offshore transition** and **offshore** below storm wave base. **Fair-weather wave base** is the depth below which the orbital motion of ordinary waves is too weak to move the bed sediment, and it is the depth below which the bed is not reworked except during storms; **storm wave base** is the equivalent depth for the largest waves the coast receives. Between the two lies the **shoreface transition**, the zone of the storm bed, and it is the most distinctive facies belt on the shelf.
:::

::: proposition Wave base from orbital velocity {#prop-wavebase}
The near-bed orbital velocity of a linear wave of height $H$ and period $T$ at a water depth $h$ is
$$
u_b = \frac{\pi H}{T\,\sinh(kh)},
$$
where the wavenumber $k$ is set by the dispersion relation $\omega^2 = g k \tanh(kh)$ with $\omega = 2\pi/T$. Wave base is the depth at which $u_b$ falls to the threshold orbital velocity for the bed sediment, about $0.15\ \mathrm{m\,s^{-1}}$ for a fine sand. Because $u_b$ decays as $\sinh^{-1}$ in $kh$, the depth of wave base scales with the **deep-water wavelength** $L_0 = 1.56\,T^2$, and the textbook rule that fair-weather wave base lies near half a wavelength is a statement about this decay.
:::

::: example How deep is wave base? {#ex-wavebase}
Find the depth at which the bed orbital velocity falls to $0.15\ \mathrm{m\,s^{-1}}$ for (a) a swell of $H = 1.5\ \mathrm{m}$ and $T = 8\ \mathrm{s}$, and (b) a storm of $H = 6\ \mathrm{m}$ and $T = 14\ \mathrm{s}$. What does the difference imply for the shelf's stratigraphy?
::: solution
Solving the dispersion relation and setting $u_b = 0.15\ \mathrm{m\,s^{-1}}$ gives
$$
\text{(a) swell:}\ h = 32\ \mathrm{m}; \qquad \text{(b) storm:}\ h = 140\ \mathrm{m}.
$$
The deep-water wavelengths are $L_0 = 1.56\times64 = 100\ \mathrm{m}$ and $1.56\times196 = 306\ \mathrm{m}$, so the two depths are $0.32\,L_0$ and $0.46\,L_0$ — the "half-wavelength" rule is good to a factor of 1.5 and no better, and it is safer to compute.

The stratigraphic consequence is the **three-fold zonation of the shelf**. Above 32 m the bed is reworked every day, is winnowed of its mud, is fully bioturbated, and becomes a clean shoreface sand. Between 32 and 140 m the bed is undisturbed most of the year and is scoured and reworked by a storm every few years, and it is the zone of **tempestites** — the storm beds of hummocky cross-stratification. Below 140 m the bed receives only suspension settling and the slow rain of pelagic and hemipelagic sediment, and it becomes a mud. A measured dip section across a shelf therefore reads, seaward, as sand, then storm-bedded heterolithic sand and mud, then mud, and the same three-fold pattern is preserved in any shallow-marine succession that has not been disturbed — which is the reason a transgressive succession passes upward from shoreface sand into offshore mud in a fixed and predictable order.
:::
:::

::: widget plot
f: 3.1416*6/(14*sinh(0.045*x))
x: 5, 200
y: 0, 3.0
hlines: 0.15
vlines: 140
labels: \text{bed orbital velocity}
caption: The near-bed orbital velocity of a 6-m, 14-second storm wave plotted against water depth, using an approximate wavenumber of $0.045\ \mathrm{m^{-1}}$. The velocity falls steeply and passes the $0.15\ \mathrm{m\,s^{-1}}$ threshold for fine sand at about 140 m, marked by the dashed lines, which is the depth of storm wave base for this wave. The curve is drawn with $k$ held constant, which is not exactly right because $k$ itself depends on depth through the dispersion relation; the exact solution gives 140 m as well, but the shape of the curve near the surface is slightly different. The point of the figure is the steepness: a change of depth of 50 m changes the bed's orbital velocity by a factor of three, which is why the storm-bedded zone of a shelf is a narrow band rather than a gradual gradient.
:::

::: history
The environmental zonation of the shelf was first drawn from the modern seabed by Johnson (Johnson) and by Walcott, and given its process-based form by Swift (Swift), whose shoreface translation model of the early 1970s made the shoreface a **moving body** rather than a static zone and explained why a transgressive sand is thin, coarse and resting on mud. The distinction between fair-weather and storm wave base, and the identification of the storm bed as a facies rather than as a curiosity, is the work of Schwarzbach in 1934 and, decisively, of Kraft (Kraft) and of the seismic and coring surveys of the mid-Atlantic shelf, and of Harms, Southard and Specks' (Specks) 1975 paper on hummocky cross-stratification. The delta triangle is Galloway's (Galloway) 1975 paper, which replaced the older morphological types of Fisher with a process classification, and the three end members were described in detail by Coleman and Wright (Wright) in 1975 and by Coleman's (Coleman) satellite atlas of the world's deltas. Estuarine circulation types are the classification of Pritchard (Pritchard) of 1952 and of Fairweather, and the turbidity maximum and its role in sediment trapping were worked out by Odd, by Pritchard and by Shia. The tidal-prism relation and the empirical prism–inlet-area law are the engineering hydraulics of O'Brien (O'Brien) and Bruun, and the reworking model of deltas and the role of tidal range in controlling delta morphology is the work of Hayes (Hayes) in 1975, whose argument that the gross morphology of a delta is set by the basin's energy rather than by the river's character remains the most useful generalisation in coastal geology.
:::

## Tides, rivers and the delta triangle

::: definition Delta classification {#def-delta}
A **delta** is the deposit of a river entering a standing body of water, and its shape is set by the contest between the river's sediment and the basin's energy. The **Galloway triangle** plots deltas on the three axes of **river** (fluvial), **wave** and **tide** dominance. A **river-dominated** delta — the Mississippi's bird's foot — has a high sediment supply, low wave and tidal energy, a thick and protruding mouth bar, and a distributary network that builds the coast outward in fingers. A **wave-dominated** delta — the São Francisco, the Nile in its early history — is reworked into a smooth, arcuate, beach-ridge coast with the river's sand redistributed along the shoreline. A **tide-dominated** delta — the Ganges-Brahmaputra, the Fly, the Amazon's mouth — is reworked into an array of flood-and-ebb-oriented **sand ridges** and **tidal channels** between mangrove- or mud-flat islands, and its "delta" is barely recognisable as a river deposit at all. Most deltas plot inside the triangle, and the classification is a statement about which agent reworks the sediment **after** the river delivers it.
:::

::: definition Estuaries and their circulation {#def-estuary}
An **estuary** is a partially enclosed coastal body with a river inflow and a marine inflow, and its internal circulation is set by the ratio of the **tidal prism** to the **river discharge**. A **salt-wedge** estuary has a nearly stationary salt-water layer beneath a freshwater surface layer, and occurs where the tidal stirring is weak. A **partially mixed** estuary has a landward-increasing salinity and a two-layer circulation — seaward at the surface, landward at depth — and it is the site of the **turbidity maximum**, where the flocculation of clay and the landward transport of bed load trap most of the river's sediment. A **well-mixed** estuary is vertically uniform in salinity and has a strong residual circulation, and an **inverse** (negative) estuary has higher salinity in its upper reaches than at its mouth, as in the arid embayments where evaporation exceeds all inflow.
:::

::: example The tidal prism and the inlet {#ex-prism}
A coastal lagoon of area $50\ \mathrm{km^2}$ is drained by a single inlet and has a mean tidal range of 2.0 m. Estimate the tidal prism, the peak discharge through the inlet, and the inlet cross-section needed to keep the peak current below $1.2\ \mathrm{m\,s^{-1}}$.
::: solution
The prism — the volume of water that enters and leaves on each tide — is
$$
V = A\times \mathrm{range} = 50\times10^{6}\times2.0 = 1.0\times10^{8}\ \mathrm{m^3}.
$$
For a sinusoidal tide with a half-cycle of 6.21 hours ($2.24\times10^{4}\ \mathrm{s}$) the peak discharge is
$$
Q_\text{peak} = \frac{\pi V}{T_\text{half}} = \frac{3.14\times10^{8}}{2.24\times10^{4}} = 1.4\times10^{4}\ \mathrm{m^3\,s^{-1}},
$$
which is a **large-river discharge** delivered through a gap in a beach for six hours twice a day. The inlet cross-section needed to keep the peak current at $1.2\ \mathrm{m\,s^{-1}}$ is
$$
A = \frac{Q}{u} = \frac{1.4\times10^{4}}{1.2} = 1.2\times10^{4}\ \mathrm{m^2},
$$
which is an inlet 400 m wide and 30 m deep.

Three consequences follow and all three are recorded in the rock. The **inlet is scoured deep** by its own current, so an estuary-mouth deposit is a coarse lag and a deep channel, not a mud flat. The **ebb-tidal delta** seaward of the inlet is a sand body of the order of the prism, and it is the reservoir that the inlet feeds. And the **flood-tidal delta** and the lagoon behind the barrier are mud, because the current that enters the lagoon expands, slows and drops its load. This is the "inlet complex" facies association — a deep channel lag, a basinward sand sheet, and a landward mud flat — and it is the reason that a barrier-island model without inlets is wrong: a real barrier is cut by inlets every few tens of kilometres, and the inlets supply most of the sand to the barrier they interrupt.
:::
:::

::: example Which delta? {#ex-delta}
A 400-m-thick deltaic succession shows, in map view, a 60-km-long, 15-km-wide sandbody elongated **perpendicular** to the palaeoshoreline, with internal sets of large-scale cross-bedding dipping alternately 40$^\circ$ to the seaward and 35$^\circ$ to the landward, mud drapes on both, and a palaeocurrent rose with two modes at right angles to the body's long axis. Classify it.
::: solution
The geometry and the internal structure are diagnostic of a **tide-dominated** system. A sandbody elongated **perpendicular** to the shoreline is a **tidal sand ridge** or a **tidal inlet-fill and ebb-tidal delta complex**, not a river mouth bar, which is lobate, and not a wave-reworked barrier, which is **parallel** to the shoreline. The **bidirectional** cross-bedding with mud drapes is the signature of a tidal current that reverses, and the two palaeocurrent modes at right angles to the ridge's long axis are the flood and ebb directions.

The classification matters because the reservoir architecture is completely different. A river-dominated delta's sand is a **progradational** body whose porosity and permeability decline away from the source and whose baffles are the interdistributary muds. A tide-dominated delta's sand is a **long, narrow, vertically stacked ridge** whose permeability is highest along the ridge and whose baffles are the mud drapes that drape each bedform — and the drapes are **genetically periodic**, laid down at neaps, so the baffle spacing is a fraction of a lunar month. A waterflood designed for a bird's-foot delta in a tide-dominated reservoir will sweep the ridges and bypass the intervals between them.

The alternative reading to exclude is a **submarine channel and levee** system, which also gives an elongate sandbody perpendicular to the palaeoshoreline. The distinction is the bidirectionality: a channel's palaeocurrents are unimodal down-slope, and a tidal ridge's are bimodal along the ridge. The mud drapes alone do not decide it, because a tidally influenced deep-water channel exists; the rose does.
:::
:::

::: example Bruun rule: how far does a metre of sea level go? {#ex-bruun}
A beach has a shoreface of closure depth 10 m and width 6 km, a surf zone 200 m wide, a berm 3 m high and a dune 4 m high. Using the Bruun (Bruun) rule, find the shoreline retreat for a 1-m rise of sea level, and state what the rule assumes.
::: solution
The Bruun rule balances the sediment lost from the profile against the sediment needed to rebuild the shoreface at its new, deeper equilibrium position. With the active profile extending from the dune crest to the closure depth, the volume per unit of shoreline length is conserved, and the retreat is
$$
Y = \frac{L\,\ell_w}{s + b},
$$
where $L$ is the sea-level rise, $\ell_w$ the width of the active profile (shoreface plus surf zone) and $s + b$ the freeboard of the berm and dune. With $\ell_w = 6200\ \mathrm{m}$ and $s+b = 7\ \mathrm{m}$,
$$
Y = \frac{1\times6200}{7} = 890\ \mathrm{m}.
$$
A metre of sea-level rise, given a coast that can retreat, moves this shoreline back by nearly a kilometre. The rule is the reason that the world's barrier coasts are among the most threatened landforms on Earth, and it is the reason that a beach nourishment project must be designed for the **profile**, not for the beach face.

The assumptions are where the criticism lies. The rule assumes that the shoreface is a **closed system** in the cross-section sense, with no net longshore or offshore loss, that the **sand is unlimited** in supply at the base of the profile, that the profile is in **equilibrium** at every instant, that the subsidence is zero, and that the coast is **unprotected** — no headland, no reef, no seawall, no nourishment. Real coasts violate all five: a barrier backed by a bay can transgress by **rollover** rather than by erosion, in which case the shoreline retreats without losing sand; a coast with an offshore sand sheet can be **fed** by it and advance; and a coast behind a seawall loses its beach to the profile without retreating, which is the "coastal squeeze" that removes the beach entirely. In the rock record the corresponding caution is that a transgressive sand sheet of a given thickness does not by itself record a given rate of sea-level rise, because the thickness depends on the sediment supply and on the pre-existing profile as much as on the rate.
:::
:::

::: warning A shoreline is a surface, not a line, and it is rarely where the facies say it is
The commonest error in basin analysis is to equate a facies with a shoreline position. Three mechanisms separate them. **Reworking**: a river's mud may be winnowed away entirely and its sand redistributed to a barrier 50 km along strike, so that the sand at a given locality records the river's sediment and the wave's position. **Transgression**: a rising sea translates the whole profile landward and upward, and the shoreface sand that is now at 20 m depth was once at the coast; the **ravinement surface** that cuts its base removes the barrier and the lagoon, so a transgressive succession commonly shows shoreface sand sitting directly on offshore mud or on a coastal-plain peat, with the intervening facies eroded away. And **incised valleys**: during a fall of base level the river cuts down and fills its valley with coarse sediment that is **genetically continental** but **geographically marine**, and a valley fill can be mistaken for a barrier sand on a well log and for a channel sand on a core, when it is neither. The discipline is to interpret a shoreline as a **surface** — the ravinement surface, the maximum flooding surface, the sequence boundary — and to place the facies relative to it, rather than to read the shoreline off the lithology of a single well.
:::

::: quiz
A sandbody on a well log is 25 m thick, has a sharp base, a coarsening-upward grain-size trend, and is overlain by 60 m of marine shale with a condensed glauconitic lag at its top. What is it?
- [x] A progradational shoreface sand capped by a transgressive surface.
- [ ] A transgressive barrier sand.
- [ ] A deep-water channel fill.
- [ ] A fluvial channel sand.
::: solution
A coarsening-upward shoreface sand that ends at a condensed glauconitic lag is the classic **regressive parasequence terminated by a marine flooding surface**. A transgressive barrier would fine or coarsen upward but would rest on a **ravinement surface** with a transgressive lag at its **base**, not its top. A channel fill would be fining-upward with a basal lag, and a fluvial sand would carry continental gravel and mud chips rather than marine shale.
:::
:::

## Where this leads

The waves and tides that shape these coasts are in [[oceanography/waves-tides]] and [[oceanography/wind-driven]], the storm beds' structures in [[sedimentology/bedforms]], the carbonates that replace clastic coasts in clear tropical water in [[sedimentology/carbonates]], the facies logic in [[sedimentology/facies]], and the sequence-stratigraphic framework in [[sedimentology/stratigraphy]] and [[sedimentology/basins-sequences]].

::: summary
- A wave-dominated coast is zoned by wave energy into barrier, shoreface, shoreface transition and offshore, and the boundaries are the two wave bases.
- Wave base is the depth at which the bed orbital velocity falls to the threshold for the bed sediment, and it scales with the deep-water wavelength.
- Between fair-weather and storm wave base lies the storm-bedded transition zone, the most distinctive facies belt on a shelf.
- Deltas are classified by what reworks the sediment after the river delivers it: river, wave or tide.
- The tidal prism sets the inlet's size, the ebb-tidal delta's volume and the lagoon's mud, and it makes estuary-mouth currents as large as a river's.
- A shoreline is a surface, and facies, reworking and transgression separate it from the lithology that seems to mark it.
:::

## Exercises

::: exercise Wave base {level=1 check="50"}
Using the half-wavelength rule, find the fair-weather wave base for swell of period 8 s.
::: solution
$L_0 = 1.56\times8^2 = 100\ \mathrm{m}$, so the wave base is near $50\ \mathrm{m}$. The exact orbital-velocity calculation gives 32 m for a 1.5-m wave, so the rule is generous by half; the point of the rule is the scaling with $T^2$, not the coefficient.
:::
:::

::: exercise Delta type {level=1}
A delta has a smooth arcuate coastline, beach ridges running parallel to the shore, and no distributary network preserved. Classify it.
::: solution
**Wave-dominated.** The river's sediment has been reworked by waves into a beach-ridge complex and redistributed along the coast, so the delta's map pattern is the coastline's, not the river's. The Nile, the São Francisco and the Ras Paddar are the classic examples, and the exploration consequence is that the reservoir is the **shoreface and beach ridge**, not a mouth bar, and it is continuous along strike rather than lobate.
:::
:::

::: exercise Tidal range class {level=1}
A coast has a tidal range of 6 m. To which class does it belong, and what does the class predict about the coast?
::: solution
**Mesotidal** (microtidal below 4 m, mesotidal 4–8 m, macrotidal above 8 m). A mesotidal coast has enough tidal energy to rework a delta into a mixed tide- and river-dominated system, to develop extensive tidal flats and mangrove or salt-marsh mud flats behind its barriers, and to keep its inlets open. The classic prediction is that a river entering a mesotidal or macrotidal coast builds a **tide-influenced delta** with tidal sand ridges, not a bird's foot.
:::
:::

::: exercise Orbital velocity {level=2 check="0.59"}
Using $u_b = \pi H/(T\sinh kh)$, find the bed orbital velocity of a 1.5-m, 8-s wave at a depth where $kh = 1$ (so that $\sinh kh = 1.175$), in m/s.
::: solution
$u_b = \pi\times1.5/(8\times1.175) = 4.71/9.40 = 0.50\ \mathrm{m\,s^{-1}}$. This is three times the threshold for a fine sand, so at $kh = 1$ the bed is actively moved by this swell.
:::
:::

::: exercise Tidal prism {level=2 check="4.2"}
A lagoon of area $120\ \mathrm{km^2}$ has a tidal range of 3.5 m. Find its tidal prism, in units of $10^{8}\ \mathrm{m^3}$.
::: solution
$V = 120\times10^{6}\times3.5 = 4.2\times10^{8}\ \mathrm{m^3}$. A prism of this size drives peak inlet discharges of order $6\times10^{4}\ \mathrm{m^3\,s^{-1}}$, larger than the Amazon's mean, which is why the inlets of a macrotidal coast are deep, permanently open, and flanked by sand ridges tens of metres high.
:::
:::

::: exercise Estuarine trapping {level=2}
A partially mixed estuary traps 80 per cent of its river's sediment load within 40 km of its mouth. Explain the mechanism and say what the stratigraphic product is.
::: solution
Two mechanisms act together. **Flocculation**: where the river's fresh water meets sea water the clay particles aggregate into flocs of tens to hundreds of microns, whose settling velocity is a thousand times that of the individual grain, so the clay drops out at the salt front rather than reaching the shelf. **The turbidity maximum**: the estuary's two-layer circulation drives bed load landward in the bottom layer, and the converging flow and the bed's near-stagnant point trap it, forming a zone of 1–10 g/L suspended sediment that is the site of most of the estuary's deposition.

The stratigraphic product is a **mud-dominated estuary fill** — the "estuarine valley fill" of sequence stratigraphy — with a basal transgressive lag of reworked sand, a thick central unit of heterolithic flaser and lenticular bedding and bioturbated mud, and a thin cap of bay-head or tidal-flat sand. Because the estuary **traps** its sediment, the shelf beyond receives almost none, and a transgression that drowns a coastal plain converts the coast from a **source** of shelf sand into a **sink** for it. This is the reason that the sandstones of a transgressive succession are concentrated at its base, as the transgressive lag, and why the shelf above them is mud: the shoreline, having passed, took the sand with it.
:::
:::

::: exercise A shelf transect {level=3}
A dip-oriented core transect across a Cretaceous shelf, from landward to seaward, yields: (A) bioturbated fine sand with *Ophiomorpha* and *Planolites* burrows and glauconite; (B) hummocky cross-stratified very fine sand with 30-cm ripples and 5-cm mud drapes; (C) laminated and bioturbated dark grey mud with *Nereites*-like trails and scattered storm beds 20 cm thick; (D) black laminated mud with no burrows and 1-cm silt laminae. Interpret each and estimate the palaeowater depths.
::: solution
**(A)** A shallow, well-oxygenated, wave- and current-swept **shoreface to shoreface transition** sand, with *Ophiomorpha* (a crustacean burrow of firm, shallow, agitated sand) and glauconite, which forms slowly in a low-sedimentation-rate marine setting. The glauconite and the burrowing depth place it near **fair-weather wave base**, so 25–45 m.
**(B)** The **shoreface transition**, the storm zone. Hummocky cross-stratification and 30-cm wave ripples require an orbital excursion of order 0.5 m at the bed, which the calculation of [[#ex-wavebase]] puts at 100–150 m for a large storm. The 5-cm mud drapes are the post-storm settling.
**(C)** The **offshore transition**, below storm wave base but reached by the largest events. The *Nereites*-like grazing trails are a quiet-water, fully marine, oxygenated fauna. Depth 150–300 m.
**(D)** A **basinal or restricted** mud with dysoxic to anoxic bottom water, in which the 1-cm silt laminae are the only record of any current. Depth below 300 m, or a restricted shelf.

The transect is a **deepening- and fining-upward-and-seaward** profile, and the whole is a normal shelf. The observation that would change the interpretation is the **position of the glauconite**: a glauconitic sand at 40 m is a normal shoreface, but the same glauconite at 300 m is a **condensed section** on a starved shelf, and the two have opposite implications for the sediment budget. The discriminator is the **amount of sediment** — a condensed section is thin, and a shoreface sand is thick.
:::
:::

::: exercise A synthesis {level=3}
Two wells 30 km apart in the same sequence both end their core in a 3-m sand with a sharp base, a transgressive lag of shells and glauconite, and *Ophiomorpha* burrows filled with sand. Well A sits on 40 m of shoreface sand below; well B sits on 30 m of offshore mud below. Interpret the surface and correlate the two wells.
::: solution
The 3-m sand with a sharp base, a transgressive lag and sand-filled *Ophiomorpha* is a **ravinement-barrier or shoreface sand**, and the surface below it is a **ravinement surface** — the base of the shoreface that migrates landward and upward during a transgression, eroding everything in its path.

The two wells record the same surface at different **positions relative to the pre-transgression coast**. Well A had shoreface sand beneath, so the ravinement surface there cut **into the old shoreface**, and the barrier that now sits on it is the landward continuation of the one that was there. Well B had offshore mud beneath, so the ravinement surface cut **into the old offshore mud**, and the sand above it is a **transgressive barrier or a ravinement-lag sand** that was deposited directly on the eroded shelf. The surface is therefore **diachronous**, younger at B than at A if the transgression came from the north, and it is a **climbing** surface whose height above the pre-transgression depositional surface increases landward.

The correlation rule that follows is the one that costs the most money in practice: **correlate the ravinement surface, not the base of the sand**, because the base of the sand is the same surface; and never correlate the **base of the underlying shoreface sand** across the surface, because at B that facies was eroded away and does not exist. The test is the lag: a transgressive lag with glauconite, phosphorite and reworked shallow-water shells at B, sitting on mud, proves that the surface is a ravinement surface and not a sequence boundary, because a sequence boundary is cut by a river and carries continental gravel, not marine shells.
:::
:::
