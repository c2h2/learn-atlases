Bedforms are the flow's handwriting. A current moving over a mobile bed organises that bed into ripples, dunes, planes and antidunes of a wavelength and height that are set by the flow's depth, velocity and grain size, and it leaves each of them preserved as a distinctive style of cross-stratification. The consequence is one of the most powerful tools in historical geology: a sandstone's internal structure is a measurement of the flow that made it, made millions of years before anyone was there to take the measurement, and readable with a hand lens and a tape measure.

## Flow regimes

::: definition The Froude number and the two regimes {#def-froude}
The **Froude number** is the ratio of the flow velocity to the celerity of a long surface gravity wave,
$$
\mathrm{Fr} = \frac{u}{\sqrt{g h}} ,
$$
and it divides open-channel flow into two dynamically distinct states. Below about 0.7 the flow is **subcritical** (or *tranquil*): a surface wave can travel upstream, the flow is deep and slow, and the bed is shaped into ripples and dunes. Above 1 the flow is **supercritical** (*shooting*): no disturbance can travel upstream, the flow is shallow and fast, and the bed is a plane or is shaped into antidunes whose surface waves are in phase with them. The intermediate state, the **upper-regime plane bed**, is a flat, polished surface with no bedform at all, and it is the state of highest flow resistance. The distinction is the first thing to establish in any palaeohydraulic reconstruction, because a dune and an antidune of the same wavelength record flows whose depths differ by a factor of three.
:::

::: definition The regime diagram {#def-regime}
The **Simons–Richardson–Bogardi regime diagram** (usually called the Simons–Albertson diagram) plots the shear velocity $u_*$ against the particle Reynolds number $u_* d/\nu$ and maps the fields of no movement, ripples, dunes, plane bed, transitions, antidunes and chutes-and-dunes. Its structure is simple and robust. At low stress, nothing moves. With rising stress the bed makes ripples, then dunes of increasing height and wavelength, then a plane bed as the dunes are washed out, then antidunes as the Froude number approaches unity. At a fixed grain size the sequence therefore runs **lower regime → transition → upper regime**, and the position of a bedform in the diagram fixes both $u_*$ and, with the depth, the velocity.
:::

::: example Which regime? {#ex-regime}
A river 1.5 m deep flows at 1.1 m/s over a bed of 0.25-mm sand. Find the Froude number and predict the bedform. The same discharge is then constricted into a flume 0.4 m deep at 2.0 m/s: what happens to the bed?
::: solution
$$
\mathrm{Fr}_1 = \frac{1.1}{\sqrt{9.81\times1.5}} = \frac{1.1}{3.84} = 0.29, \qquad
\mathrm{Fr}_2 = \frac{2.0}{\sqrt{9.81\times0.4}} = \frac{2.0}{1.98} = 1.01 .
$$
The first flow is comfortably subcritical and, with a shear velocity of 0.02 m/s and a 0.25-mm bed, lies in the **dune** field of the regime diagram: the bed is a train of asymmetric dunes with wavelengths of order $6h = 9\ \mathrm{m}$ and heights of order $0.1h = 0.15\ \mathrm{m}$. The second is at Fr = 1.0, the **hydraulically critical** state, and the bed is a washed-out plane or an antidune train with a free surface in phase with the bed.

The practical consequence is that the constriction has changed the deposit from a **lower-regime dune sand with large-scale trough cross-bedding dipping downstream** to an **upper-regime unit with low-angle, upstream-dipping laminae and a rip-cast top**. In the rock record the two are separated by a sharp, often scoured contact, and the pair records a single event in which the flow became shallower and faster — a flood slackening as it spreads off a bar, or a wave run-up on a shelf. Reading the regime from the structure is therefore not a classification exercise but a direct statement about the depth and velocity of water that has been gone for a hundred million years.
:::
:::

## Ripples, dunes and their sizes

::: definition Ripples and dunes {#def-ripples-dunes}
A **ripple** is a small bedform with a wavelength of 5–15 cm on medium sand and a height of 1–2 cm, giving a ripple index $\lambda/H$ of 15–25 for current ripples and 8–15 for wave ripples. On gravels the wavelength scales with the grain size, $\lambda \approx 6$–$7\,d$, but on sands it is set by the flow and is nearly independent of $d$. A **dune** is a bedform with a wavelength of 0.5–10 m in rivers and 50–500 m in deserts, a height of about a tenth of its wavelength, and a stoss that is a quarter to a half of the wavelength long. For subaqueous dunes the empirical relations
$$
\lambda \approx 6\,h, \qquad H \approx 0.1\,h \approx \lambda/12
$$
hold over two orders of magnitude of flow depth, which makes dune wavelength a **flow-depth gauge**. A **ripple** is a dune whose height is limited by the grain size; a **dune** is a bedform whose height is limited by the flow depth; and an **antidune** is a bedform whose height is limited by the free surface.
:::

::: proposition Dune stratification and the preserved set {#prop-set}
A dune migrating over an aggrading bed is truncated by the next dune's trough, and the thickness of the preserved set of cross-bedding is
$$
h_\text{set} \approx 0.08\,\lambda ,
$$
which, since $H \approx \lambda/12$, is approximately the **dune height itself**. The set thickness of a cross-bedded sandstone is therefore a measurement of the height of the dune that made it, and through the relations above, of the flow depth that formed it.
:::

::: example From a set of cross-beds to a river's depth {#ex-set}
A sandstone shows trough cross-bedding in sets 45 cm thick, with set boundaries that are concave-up and with no evidence of truncation by overlying beds. Estimate the dune wavelength, the dune height and the flow depth, and state the assumptions.
::: solution
Inverting $h_\text{set} = 0.08\,\lambda$,
$$
\lambda = \frac{0.45}{0.08} = 5.6\ \mathrm{m}, \qquad
H = \frac{\lambda}{12} = 0.47\ \mathrm{m}, \qquad
h = \frac{\lambda}{6} = 0.94\ \mathrm{m}.
$$
The flow was therefore about a metre deep and the dunes were half a metre high — a small river or a tidal channel, not a great braided stream.

Three assumptions are doing work here and each is testable. The first is that the sets are **not truncated** by the base of an overlying bed; if they are, the measured thickness is a minimum and the true dune was taller. The second is that the relation $h_\text{set} = 0.08\lambda$ applies, which requires **aggradation without degradation** — a bed that is being scoured gives sets much thinner than the dune. The third is that the dunes were in **equilibrium** with the flow, which fails during a waning flood when the dunes are washed out to a plane and the last-preserved set records the last dune, not the largest. Where all three hold, a tape measure on a cliff section gives the depth of a Carboniferous river to within a factor of two, which is better than most palaeohydraulic methods achieve.
:::
:::

::: example Wave ripples and a storm on the shelf {#ex-waveripple}
A fine sand with $d = 0.25\ \mathrm{mm}$ contains laminae of low-angle, symmetric, bifurcate cross-lamination with a wavelength of 60 cm and a height of 4 cm. Using the vortex-ripple spacing relation $\lambda/d = 5.5\,(A_{63}/d)^{0.8}$, find the near-bed orbital excursion $A_{63}$, and decide whether the lamination is a wave ripple or a current ripple.
::: solution
The measured ratio is $\lambda/d = 0.60/2.5\times10^{-4} = 2400$, so
$$
\frac{A_{63}}{d} = \left(\frac{\lambda/d}{5.5}\right)^{1/0.8} = \left(\frac{2400}{5.5}\right)^{1.25} = (436)^{1.25} = 1994,
$$
and $A_{63} = 1994\times2.5\times10^{-4} = 0.50\ \mathrm{m}$.

An orbital excursion of half a metre at 63 mm above the bed requires a storm wave on a shallow shelf, not a swell on a beach: normal fair-weather waves give $A_{63}$ of 5–20 cm and ripples of 5–15 cm wavelength. The **ripple index** confirms the diagnosis:
$$
\frac{\lambda}{H} = \frac{60}{4} = 15,
$$
which is at the upper end of the wave-ripple field (8–15) and below the current-ripple field (15–25). Combined with the symmetry of the laminae, the bifurcate crests and the 60-cm wavelength, the structure is a **vortex (wave) ripple** formed under a storm, and the bed records a wave base that reached the seafloor. This is the standard field identification of a **storm bed**, and the orbital excursion derived from the wavelength is a first estimate of the wave height that can be compared with the depth derived from the overlying sediment.
:::
:::

::: widget plot
f: 5.5*exp(0.8*ln(x/0.00025))*0.00025
x: 0.02, 1.5
y: 0, 1.6
labels: \text{vortex-ripple wavelength}
caption: The wavelength of a vortex (wave) ripple on 0.25-mm sand as a function of the near-bed orbital excursion $A_{63}$, from $\lambda/d = 5.5(A_{63}/d)^{0.8}$. The curve is steeply superlinear, so a doubling of the orbital excursion increases the wavelength by a factor of 1.7 — which makes the preserved wavelength a sensitive palaeohydraulic instrument, and equally makes it fragile, because a ripple that is reworked even slightly loses its original spacing. Note that the relation is dimensionally a statement about the ratio $\lambda/d$ to $A_{63}/d$; the grain size enters twice, and a coarser sand makes longer ripples at the same orbital excursion.
:::

::: history
The classification of bedforms was settled by the hydraulic-laboratory school of Ralph Simons, Esmail Richardson and John Nordin at Colorado State University, whose 1965 regime diagram mapped the fields of ripples, dunes, plane bed and antidunes in the shear-velocity–grain-size plane and remains the working tool of every flume laboratory. The hydraulic interpretation of cross-bedding is older: Gilbert (Gilbert) showed in 1877 that the great Cretaceous cross-beds of Utah are the migrated traces of dunes, and the geometry of a set and its relation to the form that made it was worked out for modern sands by McKee and by Bigarella in their mid-century studies of Brazilian and Texan dunes. The distinction between current and wave ripples by the ripple index is due to Bucher (Bucher, 1919) and was quantified by Ashley (Ashley, 1961) and by Miller and Komar (Komar) in 1980; the vortex-ripple spacing relation used here is the Miller–Komar form as recast by Nielsen (Nielsen) in 1990. Hummocky cross-stratification was named and interpreted as a storm structure by Harms, Southard and Specks in 1975, in a paper that created a subfield and settled a decade of argument about "bottom-current" structures on storm shelves. The relation between preserved set thickness and dune height was measured in the laboratory by Yinger, Jerolmack and Lim (Lim) in 2010, and the counting of tidal and daily laminae to recover the length of a geological day goes back to the stromatolite work of the 1960s, was applied to Precambrian tidal deposits by Schröder-Adams and Schwarzacher (Schwarzacher) in 1969 and by George Williams (Williams) in 1989, and remains one of the few genuinely quantitative measurements in the entire history of the Earth.
:::


## The structures and what they mean

::: definition Diagnostic structures {#def-structures}
**Trough cross-bedding** is the fill of a three-dimensional dune's scour and is the commonest large-scale structure in fluvial, shallow-marine and deep-water sands; its set boundaries are concave-up and its laminae dip at 15–25$^\circ$. **Planar (tabular) cross-bedding** is the migration of a two-dimensional dune's straight crest and indicates a stronger, shallower flow than trough cross-bedding of the same scale. **Ripple cross-lamination** is 1–5 cm thick, and its **ripple index** $\lambda/H$ separates current ripples (15–25, asymmetric, with a straight or linguoid crest) from wave ripples (8–15, symmetric and bifurcate, with laminae that thicken at the crest). **Hummocky cross-stratification** is a series of low-angle, broadly convex and concave surfaces with no consistent dip, formed on a storm-influenced shelf below fair-weather wave base by the combined oscillatory and unidirectional flow of a storm. **Flaser, lenticular and wavy bedding** are the interbedding of sand ripples and mud drapes and are the classic indication of **tidal** currents, in which the spring–neap cycle produces bundles of sand couplets whose count, if the mud survives the burrowers, records the number of springs between neaps.
:::

::: example Reading a stack of structures {#ex-stack}
A 12-m succession fines upward and shows, from the base: (1) 3 m of trough cross-bedded coarse sand with set thicknesses of 0.8 m and scattered 5-cm mud chips; (2) 4 m of planar-bedded medium sand with 60-cm sets and low-angle reactivation surfaces; (3) 3 m of flaser-bedded fine sand with 2-cm ripples and mud drapes after every 13th to 15th sand lamina; (4) 2 m of horizontally laminated very fine sand and silt with isolated burrows. Interpret each and the whole.
::: solution
**(1)** A set thickness of 0.8 m gives $\lambda = 0.8/0.08 = 10\ \mathrm{m}$ and $h = 10/6 = 1.7\ \mathrm{m}$: a **deep, high-competence channel** with 0.8-m dunes, and the mud chips are lag material torn from the channel's own mud-lined bed.
**(2)** Planar bedding with 60-cm sets gives $\lambda = 7.5\ \mathrm{m}$ and $h = 1.25\ \mathrm{m}$, but planar bedding requires a **higher Froude number** than trough bedding at the same depth, so the flow was shallower and faster than in (1) — a bar flat or a channel margin during a waning flood. The reactivation surfaces record the flow's reversals or its waning and re-strengthening.
**(3)** Flaser bedding with 2-cm ripples and mud drapes after every 13th to 15th sand lamina is a **tidal flat**, and the drape periodicity is a **tidal bundle**. If each sand lamina is one spring tide and each drape a neap, the expected spacing is the 14.76 days of the spring–neap cycle expressed in half-daily or daily laminae, and a count of 13–15 is the diagnostic number for a semidiurnal or mixed system.
**(4)** Horizontal lamination of very fine sand and silt with burrows is a **low-energy subtidal or intertidal flat** below the level of dune migration, with enough oxygen for infauna.

The whole is a **transgressive** succession: a deep channel, a shallower and faster bar-flat, a tidal flat, and a quiet subtidal. The grain size fines, the flow depth first falls and then the energy falls, and the ichnofabric appears only at the top. This is a coastal onlap and, in a basin-scale context, the top of a transgressive systems tract — a conclusion that the structures alone support and that the grain size alone would not.
:::
:::

::: warning Bedforms migrate, and the rock records the migration, not the bed
A cross-bed is the **preserved fraction** of a bedform, and the fraction preserved depends on the ratio of the bed's aggradation rate to its migration rate. Three systematic distortions follow. **Set thickness under-estimates dune height** wherever the bed is degraded rather than aggraded, and in a channel fill most sets are truncated, so the thickest set in a section is a better estimate of the dune height than the mean. **The sedimentary structure is not the bedform**: a dune 1 m high may be preserved as a set 5 cm thick, and the ratio between the two is a function of the aggradation rate that is almost never measured in the rock. And **the palaeocurrent from a cross-bed is the flow direction at the moment of deposition**, which for a dune on the lee of a bar may differ from the regional flow by thirty degrees or more; a palaeocurrent rose built from a few dozen measurements in one bed is a measurement of one bar, not of a current regime. The discipline is to state, for every interpreted flow direction and every interpreted depth, whether the structure is a complete set, a truncated set, or a reactivation surface, and to treat the mean of a population of measurements as a measurement of the population rather than of the flow.
:::

::: quiz
A sandstone shows sets of trough cross-bedding 30 cm thick and laminae dipping at 22°. Nothing else is visible. What is the strongest conclusion?
- [x] The sand was deposited by migrating three-dimensional dunes in a subcritical flow.
- [ ] The flow was about 0.6 m deep.
- [ ] The flow was a river rather than a marine current.
- [ ] The dunes were 30 cm high.
::: solution
Trough cross-bedding with 22° dips is diagnostic of three-dimensional dune migration in a subcritical flow, and that conclusion needs no calibration. The depth cannot be obtained without assuming that the set is complete and that the set-thickness relation applies, and either assumption could be wrong by a factor of three. The flow could have been a river, a tidal channel, a shelf current or a turbidity current, and the environment cannot be determined from cross-bedding alone. The dune was **at least** 30 cm high and probably taller.
:::
:::

## Where this leads

The flows that make these bedforms are described in [[sedimentology/sediment-transport]] and the grain sizes they sort are in [[sedimentology/sediment-grains]]; the environments are in [[sedimentology/continental-environments]] and [[sedimentology/marine-environments]]; the way the structures are used to build a facies model is in [[sedimentology/facies]]; and the tides that make the bundles are in [[oceanography/waves-tides]].

::: summary
- The Froude number divides lower-regime bedforms (ripples, dunes) from upper-regime ones (plane bed, antidunes), and the two record flows whose depths differ by a factor of three.
- Subaqueous dune wavelength is about six times the flow depth and its height about a tenth of its wavelength, so dunes are a flow-depth gauge.
- The preserved cross-bed set thickness is about 8 per cent of the dune wavelength, which is approximately the dune height.
- The ripple index separates current ripples (15–25) from wave ripples (8–15), and the vortex-ripple wavelength measures the near-bed orbital excursion.
- Hummocky cross-stratification records a storm's combined flow; flaser bedding and tidal bundles record the tide.
- A cross-bed records the fraction of a bedform that was preserved, not the bedform itself, and set thickness is a minimum.
:::

## Exercises

::: exercise Froude number {level=1 check="0.64"}
Find the Froude number of a flow 4 m deep moving at 4 m/s.
::: solution
$\mathrm{Fr} = 4/\sqrt{9.81\times4} = 4/6.26 = 0.64$. The flow is subcritical but close to the transition, and the bed would be a washed-out dune or a transition bedform.
:::
:::

::: exercise Dune size {level=1 check="6"}
A subaqueous dune field has a wavelength of 36 m. Estimate the flow depth.
::: solution
$h = \lambda/6 = 6\ \mathrm{m}$. The dune height would be about $36/12 = 3\ \mathrm{m}$, and the preserved set thickness about $0.08\times36 = 2.9\ \mathrm{m}$.
:::
:::

::: exercise Ripple index {level=1 check="20"}
A ripple has a wavelength of 12 cm and a height of 6 mm. Find the ripple index and classify it.
::: solution
$\lambda/H = 120/6 = 20$, which is a **current ripple**. A wave ripple of the same wavelength would be 8–15 mm high and would have symmetric, bifaminate laminae.
:::
:::

::: exercise Set thickness {level=2}
A sandstone shows sets of trough cross-bedding 25 cm thick, but the base of every overlying set truncates the one below, and the largest set in the section is 70 cm. Which number should be used to estimate the dune height, and what depth does it give?
::: solution
The **largest set**, 70 cm, because truncation makes every other set a minimum. It gives $\lambda = 0.70/0.08 = 8.8\ \mathrm{m}$ and $h = 8.8/6 = 1.5\ \mathrm{m}$. Using the mean of 25 cm would give a depth of 0.53 m, a factor of three too small. The general rule in a channel fill is to use the maximum set thickness and to state the mean as a lower bound.
:::
:::

::: exercise Wave ripples {level=2 check="0.13"}
Using the relation of [[#ex-waveripple]], find $A_{63}$ for a wave ripple of 20 cm wavelength on 0.25-mm sand.
::: solution
$\lambda/d = 800$, so $A_{63}/d = (800/5.5)^{1.25} = 145.5^{1.25} = 505$ and $A_{63} = 505\times2.5\times10^{-4} = 0.13\ \mathrm{m}$. This is a fair-weather to moderate-swell orbital excursion, consistent with the small ripple size, and it is the reason that wave ripples are common in shallow-marine sandstones and rare in deep-water ones.
:::
:::

::: exercise Tidal bundles {level=2}
A tidal-flat sandstone preserves bundles of 13 to 15 sand laminae separated by mud drapes. What does the count mean, and what would falsify the interpretation?
::: solution
The count is the number of **spring tides between successive neaps** in a semidiurnal system: a spring–neap cycle is 14.76 days, and with two springs and two neaps per lunisolar cycle the spacing of the largest-tide drapes is 13–15 lamina pairs. The bundle is therefore a **lunar-month clock**, and where it is preserved it gives the number of days per month in the geological past — the classic application being the Precambrian and Palaeozoic stromatolite and tidal-bed counts used to infer a shorter month and a longer day.

Three things would falsify it. **Burrowing**: if the mud drapes are bioturbated and the laminae are not primary, the count is meaningless. **Storm and flood drapes**: a mud drape can be deposited by a single storm or a single flood rather than by a neap, and the test is whether the drapes are systematically thicker and more persistent at one stratigraphic level (a storm horizon) or recur at a constant interval throughout. And **the laminae must be couplets of the right thickness**: a single sand lamina is one tide, and if the laminae are actually half-tide couplets the count must be doubled. The interpretation survives only when the laminae can be shown to be daily or half-daily and the drapes to be periodic.
:::
:::

::: exercise A palaeohydraulic synthesis {level=3}
A Cambrian sandstone contains dunes with a preserved wavelength of 1.2 km and a height of 60 m, and trough cross-bedding sets up to 25 m thick. Interpret, and identify what is wrong with using the subaqueous relations.
::: solution
The subaqueous relations give $h = 1200/6 = 200\ \mathrm{m}$ of water and a dune height of $1200/12 = 100\ \mathrm{m}$, which would be a river 200 m deep — the depth of the largest measured river flood, and larger than any reconstructed for the Amazon. The set thickness of 25 m is consistent with a dune height of 25–100 m, so the internal consistency is not the problem.

The problem is that the relations $\lambda = 6h$ and $H = 0.1h$ are calibrated on subaqueous dunes in flows 0.1–20 m deep, and they are **not valid for aeolian dunes**, whose wavelength is set by the saturation length of the saltation cloud and by the boundary-layer height rather than by a water depth. Aeolian dunes have $\lambda/H$ of 10–20, similar to subaqueous dunes, but their wavelength is 50–500 m and is independent of the wind's height. The correct interpretation of a 1.2-km-wavelength, 60-m-high dune with 25-m sets is therefore an **aeolian erg** — a giant dune field of the type preserved in the Navajo Sandstone, the Coconino Sandstone and the Cambrian Mount Simon — and the interpretation is supported by the associated grainfall and grain-avalanche lamination, the large-scale cross-bedding with high-angle tangential foresets, the absence of mud, and the desiccation and evaporite features that go with it.

The general lesson is that every palaeohydraulic relation carries the range of its calibration, and applying a flume-derived formula to a dune field is the commonest and most consequential error in the subject.
:::
:::

::: exercise Hummocky cross-stratification {level=3}
A 4-m storm-bed succession shows, upward: a sharp erosive base with 10-cm mud clasts; 60 cm of parallel-laminated coarse sand with load casts; 2 m of hummocky cross-stratified medium sand with 30-cm wavelength and 3-cm height; 80 cm of very fine sand with wave-ripple laminae of 8 cm wavelength; and 40 cm of bioturbated mud. Reconstruct the storm.
::: solution
The succession is the classic **tempestite** and it records the storm's decay. The sharp erosive base with mud clasts is the **peak current** phase, when the storm's combined flow scoured the seafloor and ripped up its mud. The parallel-laminated coarse sand with load casts is the **upper-regime** phase, deposited from a high-concentration, high-velocity flow that was dense enough to load-cast into the underlying mud. The hummocky cross-stratification is the **oscillatory-dominated** phase as the storm slackened, with an orbital excursion large enough to move medium sand and a weak residual current; the 30-cm wavelength and 3-cm height give a ripple index of 10, diagnostic of a vortex ripple. The 8-cm wave ripples in very fine sand are the **tail** of the event, when only the finest grains were moving. The bioturbated mud is the **post-storm** quiet-water drape, recolonised by infauna.

The reconstruction gives a storm that lasted days, winnowed and reworked the seafloor in its first hours, and was followed by weeks of quiet. The water depth at the time can be estimated from the fact that the storm's oscillatory flow reached the bed: for a wave period of 15 s, an orbital excursion of 0.5 m at the bed requires a wave height of a few metres and puts the storm wave base at 40–80 m, so this is a **medial shelf** section. The absence of any deltaic or turbiditic structure in the mud, and the presence of burrows throughout, confirm that the background was a low-energy fully marine shelf.
:::
:::
