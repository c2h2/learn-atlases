A sedimentary basin is a hole that is being dug while it is being filled, and the whole of basin analysis is the separation of those two processes. The subsidence is a record of the lithosphere's density, thickness and stress; the fill is a record of the climate, the sediment supply and the sea level. They are coupled — the load of the fill depresses the lithosphere and the shape of the fill controls where the next sediment goes — but they are driven by different engines, and the discipline of reading a basin is to keep them apart.

## Basin types

::: definition Basins by geodynamic setting {#def-basin-types}
Basins are classified by the force that made them. **Extensional basins** form where the lithosphere is thinned: continental rifts and their half-grabens, the sag basins that follow them, and the **passive margins** that result if the rift succeeds. **Convergent-margin basins** form above or beside a subduction zone: the **forearc** basin between the trench and the volcanic arc, the **volcanic-arc** (or intra-arc) basin within the arc, and the **retroarc** or **back-arc** basin behind it, which may be extensional if the slab is retreating. **Foreland basins** form on the overriding plate in front of a thrust belt, by the flexural depression caused by the load of the belt and of its root. **Intra-cratonic (sag) basins** lie on stable cratons with no visible boundary fault or load, and their origin — edge-driven convection, plume underplating, or ancient rift reactivation — is unresolved. **Strike-slip basins** are pull-aparts, transtensional step-overs and releasing bends, and they are small, deep and fast subsiding. **Relic basins** are the deformed and inverted remains of any of the above. The Ingersoll and Busby (Busby) classification groups these into three **tectonic settings** — convergent, extensional and salvage — because the setting controls the sediment source, the subsidence rate and the facies.
:::

::: definition Subsidence mechanisms {#def-subsidence}
Four mechanisms create accommodation. **Thinning** of the lithosphere by extension lets hot asthenosphere rise, and the instantaneous and thermal parts of the subsidence follow the extension factor $\beta$. **Thermal cooling** of a thinned or heated lithosphere produces the square-root-of-time subsidence of a passive margin. **Flexure** of the elastic lithosphere under a load — a mountain belt, a volcano, an ice sheet — creates a moat beside the load and a **forebulge** 200–400 km away. **Sedimentary and volcanic loading** of the basin itself depresses the lithosphere further, and because the fill is lighter than the mantle it displaces, sedimentary basins are **underfilled**: they are always deeper than the water that fills them would make them.
:::

::: example Backstripping a well {#ex-backstrip}
A well penetrates 1 km of water, then 2 km of compacted sand of density $2400\ \mathrm{kg\,m^{-3}}$, and reaches its target horizon at 3 km below sea level. Take the mantle density as $3300\ \mathrm{kg\,m^{-3}}$. Find the depth of the **bare basement** and hence the palaeowater depth at the time the target was deposited.
::: solution
The basement lies $3000 - 2000 = 1000\ \mathrm{m}$ below the present seafloor. If the sediment load were removed, the crust would rebound by the Airy amount
$$
\Delta = h_s\,\frac{\rho_m - \rho_s}{\rho_m} = 2000\times\frac{3300 - 2400}{3300} = 2000\times0.273 = 545\ \mathrm{m},
$$
so the **bare basement** would stand $1000 - 545 = 455\ \mathrm{m}$ below sea level. At the moment the target horizon was deposited there was no overburden, so the water depth then was about **455 m** — a deep shelf or upper slope, not the 3 km that the present burial depth suggests.

This is backstripping in its simplest form, and the whole method is the systematic version of this calculation applied bed by bed, with three refinements. The overburden must be **decompacted** to its zero-porosity thickness, because a compacted 2 km of sand was 2.6 km of mud and sand when it was deposited. The **water load** must be included, because water depresses the crust too. And the calculation must be done **recursively**, because the load at each level depends on the water depth that the previous level's backstrip produced. The output is a **tectonic subsidence curve**, and it is that curve, not the depth to any horizon, that is compared with the McKenzie stretching model or with the flexural model, and from which $\beta$, the heat flow and the rift age are read.
:::
:::

## Flexure and the foreland basin

::: proposition The flexural parameter {#prop-flexure}
The lithosphere is modelled as an elastic plate of thickness $T_e$ — the **elastic thickness** — resting on a fluid of density $\Delta\rho$. Its flexural rigidity is
$$
D = \frac{E\,T_e^{3}}{12\,(1 - \nu^2)},
$$
and the **flexural parameter**, the length over which a load is distributed, is
$$
a = \left(\frac{4D}{\Delta\rho\,g}\right)^{1/4}.
$$
For a line load the moat lies beneath the load and the **forebulge** rises at a distance of about $\pi a$; the observed distance from a thrust belt to its forebulge is therefore a direct measurement of $T_e$. Because $D \propto T_e^3$, the flexure is exquisitely sensitive to the elastic thickness: a factor of two in $T_e$ is a factor of eight in $D$ and of 1.7 in $a$.
:::

::: example Measuring the strength of a continent {#ex-flexure}
Compute the flexural parameter and the forebulge distance for elastic thicknesses of 5, 10, 30 and 50 km, taking $E = 7\times10^{10}\ \mathrm{Pa}$, $\nu = 0.25$ and $\Delta\rho = 2300\ \mathrm{kg\,m^{-3}}$. A foreland basin's forebulge is observed 230 km from its thrust belt. What is $T_e$?
::: solution
$$
\begin{array}{lccc}
T_e\ (\mathrm{km}) & D\ (\mathrm{N\,m}) & a\ (\mathrm{km}) & \pi a\ (\mathrm{km}) \\ \hline
5 & 7.8\times10^{20} & 19 & 61 \\
10 & 6.2\times10^{21} & 32 & 102 \\
30 & 1.7\times10^{23} & 74 & 232 \\
50 & 7.8\times10^{23} & 108 & 340
\end{array}
$$
An observed forebulge distance of 230 km corresponds to $a = 73\ \mathrm{km}$ and therefore to
$$
T_e \approx 30\ \mathrm{km}.
$$
This is the classic result for a **craton**: the North American, Australian and African cratons carry elastic thicknesses of 30–60 km, and their foreland basins are wide, their forebulges are far from the thrust belt, and the moat between them is a broad, gently deepening shelf on which shallow-marine seas can flood for a thousand kilometres.

The contrast is with a **hot or young** lithosphere. At $T_e = 10\ \mathrm{km}$ the forebulge lies 100 km from the load, the moat is narrow and deep, and the basin is filled by coarse conglomerate shed directly into it — the architecture of the Gulf of Papua or of a young arc. The observation that many foreland basins, notably the Western Interior of North America and the Alps, require an elastic thickness of only 10–20 km where the modern craton shows 40 km is the **flexural paradox**, and it is explained either by the thermal weakening caused by the subduction of a young slab, by the damage done to the plate by the loading itself, or by the fact that $T_e$ measured over $10^7$ years of loading is a **viscoelastic** relaxation thickness and not the elastic thickness measured by the gravity admittance over $10^9$ years.
:::
:::

::: widget plot
f: 5.76*exp(0.75*ln(x))
x: 1, 60
y: 0, 140
labels: \text{flexural parameter}
caption: The flexural parameter $a$ in kilometres as a function of the elastic thickness $T_e$ in kilometres. The curve is a cube-root law, $a \propto T_e^{3/4}$, so it rises steeply at first and then flattens: quadrupling $T_e$ from 10 to 40 km doubles $a$. The practical use is the inverse — the width of a foreland basin, or the distance from a volcanic load to its forebulge, gives $T_e$, and $T_e$ is the closest thing geology has to a measurement of a continent's mechanical strength. The scatter in published $T_e$ values for the same craton, which spans a factor of three, is the sign that the elastic-plate model is a crude representation of a lithosphere that is layered, thermally graded, and weaker along its faults than the model allows.
:::

::: history
The idea that a basin is a record of the Earth's movement is as old as the geosyncline, which Hall (Hall) and Dana (Dana) defined from the subsidence of the Appalachian trough, and which Suess formalised. The modern quantitative study begins with the **backstripping** method of Sloss, of Cope, and above all of **Watts and Ryan** (Watts) in 1967 and **Steinen, Dickinson and Walker** in 1975, who removed the sediment and water loads to recover a tectonic subsidence curve, and with **Watts'** (Watts) 1978 elastic-plate treatment of the subsidence of the Deep Sea Drilling Project's Atlantic margins. The stretching model is **McKenzie's** (McKenzie) 1978 paper, and the square-root-of-age subsidence of passive margins is **Parsons and Sclater's** (Sclater) 1977 synthesis of the Deep Sea Drilling Project's depth data. The flexural parameter and the forebulge distance as a measurement of the lithosphere's strength are the work of **Walcott** (Walcott) in 1970 on the Canadian foreland and of **Turcotte, Hanks and Watts** on the Hawaiian swell, and the discrepancy between the short-term and long-term elastic thickness is the subject of **Watts and Burov's** (Burov) reviews. Sequence stratigraphy is the **Vail, Mitchum, Vard, Thompson and Williams** (Vail) Exxon seismic-stratigraphy papers of 1977 and the 1987 AAPG memoir of Mitropoulos, Posamentier, Vail and others; the genetic and flooding-surface alternatives are **Galloway's** (Galloway) and **Embry's** (Embry) and **Catuneascu's** (Catuneascu); and the depositional-systems framework that has partly replaced them is **Galloway's** (Galloway) and **Helland-Hansen and Gjelberg's** (Gjelberg). The Ingersoll and Busby (Busby) classification of 1995 is the standard basin typology, and the **A/S ratio** as a single controlling variable is the synthesis of Jervey (Jervey) in 1988.
:::

::: example The subsidence of a guyot {#ex-guyot}
Flat-topped seamounts (guyots) in the central Pacific are capped by Cretaceous reef limestone that formed at sea level. Using the depth–age relation for young oceanic lithosphere,
$$
d = 2500 + 350\sqrt{t}\ \mathrm{m}\quad(t\ \text{in Myr}),
$$
find how much a seamount that formed on 5-Myr-old lithosphere has subsided by the time the lithosphere reaches 60 Myr, and explain why many of these guyots stand at 1200–1500 m rather than at the depth predicted.
::: solution
$$
d(5) = 2500 + 350\sqrt{5} = 2500 + 783 = 3283\ \mathrm{m}, \qquad
d(60) = 2500 + 350\sqrt{60} = 2500 + 2711 = 5211\ \mathrm{m},
$$
so the lithosphere has subsided by
$$
5211 - 3283 = 1928\ \mathrm{m}.
$$
A reef that grew at sea level on 5-Myr-old lithosphere should therefore stand at about 1900 m depth, corrected for the height of the edifice itself, by the time the lithosphere is 60 Myr old. Many central Pacific guyots of exactly that age stand at 1200–1500 m, which is **400–700 m shallower** than the thermal model predicts.

Three explanations have been argued for fifty years and all three contribute. The **swell support** explanation is that the seamount's own edifice and the thermal anomaly of its formation still dynamically or flexurally support the lithosphere, so the topographic expression of the swell has not fully decayed; this is the flexural and dynamic-topography problem, and it accounts for a few hundred metres near a hotspot track. The **eustatic** explanation is that the Cretaceous sea level was 100–250 m higher than today, so the reef's "sea level" was not the present datum; this accounts for a couple of hundred metres and is now well constrained. And the **subsidence model** itself may be wrong for the Pacific, because the depth–age relation is an average over the whole ocean floor and central Pacific lithosphere is anomalously shallow, being older than its magnetic age suggests if it has been thinned by a plume.

The point of the exercise is the method. A guyot is a **paleobathymeter with a built-in clock**: the reef cap fixes the depth at which the seamount stood, the magnetic anomaly fixes the age of the lithosphere, and the difference between the observed and predicted depths is a measurement of everything the thermal model leaves out. The same logic, applied to a sedimentary basin, is backstripping: the fill fixes the palaeodepth, the fossils fix the age, and the residual is the tectonic subsidence.
:::
:::

## Accommodation and sequences

::: definition Accommodation and systems tracts {#def-systems-tracts}
**Accommodation** is the space available for sediment, and its rate of creation is the sum of subsidence, eustatic rise and the removal of water by fall. The **A/S ratio** — the rate of creation of accommodation divided by the rate of sediment supply — is the single controlling variable of sequence stratigraphy. Where $A/S > 1$ the shoreline **retreats** and a **transgressive systems tract** (TST) is built; where $A/S = 1$ the shoreline stands and a **highstand systems tract** (HST) progrades; where $A/S < 1$ the shoreline **advances** and a **falling-stage** or **lowstand systems tract** builds basinward. The **maximum flooding surface** is the surface of maximum $A/S$, the **transgressive surface** is its base, the **sequence boundary** is the surface of minimum accommodation, and the **regressive surface of marine erosion** separates the lowstand from the overlying highstand. A **depositional system** is a genetically linked set of facies belts, and a **linked depositional system** is the set that a single shoreline trajectory produces through a cycle.
:::

::: example The A/S ratio and the architecture {#ex-as}
A deltaic shelf subsides at $60\ \mathrm{m\,Myr^{-1}}$, sea level rises at $20\ \mathrm{m\,Myr^{-1}}$, and the river delivers $90\ \mathrm{m\,Myr^{-1}}$ of compacted sediment measured as the thickness it would occupy at the shoreline. Find $A/S$ and describe the succession that will be built. Then the river is dammed and its load falls by 60 per cent: what changes?
::: solution
The rate of creation of accommodation is the sum of subsidence and sea-level rise,
$$
A = 60 + 20 = 80\ \mathrm{m\,Myr^{-1}},
$$
and the supply is $S = 90\ \mathrm{m\,Myr^{-1}}$, so
$$
\frac{A}{S} = \frac{80}{90} = 0.89 .
$$
With $A/S$ slightly below one, the shoreline **advances slowly**: the succession is a **highstand progradational** package, a coarsening-upward parasequence set in which each parasequence is a few tens of metres thick, the flooding surfaces are closely spaced, and the shoreline trajectory is **low and positive** — a few tens of metres of climb over tens of kilometres of advance. The sand body is wide, sheet-like and continuous, and the offshore is starved because the sediment is trapped near the shore.

After the dam, $S$ falls to $0.4\times90 = 36\ \mathrm{m\,Myr^{-1}}$ and
$$
\frac{A}{S} = \frac{80}{36} = 2.2 .
$$
Now $A/S$ is well above one, the shoreline **retreats**, and the succession changes completely: the sand is reworked into a thin transgressive lag and a barrier that rides up the profile, the lagoon and the estuary flood inland, the offshore becomes a **shelf sea** that receives only mud, and the whole is capped by a **maximum flooding surface** and a condensed section. The sand body that had been a wide sheet becomes a **thin, clean, landward-riding barrier** with a transgressive lag at its base and offshore mud above — a completely different reservoir, from the same source, because a dam was built upstream.

This is the whole content of sequence stratigraphy stated as one number, and it is why the discipline matters: the architecture of a sedimentary basin, and therefore the geometry of every reservoir and seal in it, is controlled not by the sediment supply or by the subsidence but by their **ratio**.
:::
:::

::: warning A basin's subsidence curve is not its fill, and the two are routinely confused
The tectonic subsidence curve is derived by backstripping, and it is a measurement of the lithosphere. The stratigraphy is a record of the fill, and it is a measurement of the sediment supply and the sea level. Four confusions recur. **A thick succession is not a fast-subsiding basin**: a basin that subsides slowly and receives sediment continuously can accumulate as much as one that subsides fast and is starved, and the two have opposite hydrocarbon systems — the first is sand-rich and reservoir-prone, the second is source-rock prone. **A shallow-water facies is not a shallow basin**: a delta top is at sea level whatever the basement depth beneath it, and a paralic succession 6 km thick records not a 6-km-deep basin but a 6-km-long race between subsidence and supply. **An unconformity is not an uplift event**: most hiatuses in a foreland basin record the **advance of the thrust load** and the migration of the forebulge, not a regional emergence, and the "unconformity" may be a time-transgressive surface of non-deposition that never was a land surface. And **the A/S ratio is not measured, it is inferred**: it is derived from the observed stacking pattern, and the same stacking pattern can be produced by a change in supply or by a change in accommodation. The resolution is the independent age model and the palaeogeography, and the honest statement is that sequence stratigraphy is a **description of architecture** whose causal interpretation requires data that are rarely all available.
:::

::: quiz
A foreland basin's moat is 60 km wide and its forebulge lies 60 km from the thrust belt. What does this say about the lithosphere?
- [x] It has a low elastic thickness, of order 5–10 km, so the load is flexed locally.
- [ ] It has a high elastic thickness, so the load is distributed widely.
- [ ] It is not flexing at all; the basin is a rift.
- [ ] The thrust load is too small to flex the plate.
::: solution
A forebulge only 60 km from the load means a flexural parameter of about 20 km, which corresponds to an elastic thickness of roughly 5 km. A strong, cold craton would carry the forebulge 200–400 km away and would build a broad, shallow moat. A narrow, deep, coarse-filled moat close to the thrust is the signature of a **hot, young or previously deformed** lithosphere.
:::
:::

## Where this leads

The extensional subsidence model is worked out in [[structural-geology/rifts]], the isostasy in [[geophysics/gravity-isostasy]] and the flexure in [[geophysics/flexure]], the facies that fill the basin in [[sedimentology/facies]] and [[sedimentology/marine-environments]], the sequence-stratigraphic principles in [[sedimentology/stratigraphy]], the petroleum systems that the architecture creates in [[earth-resources/petroleum-systems]], and the orogenic loads in [[structural-geology/orogens]].

::: summary
- Basins are classified by the force that made them: extension, subduction, flexure under an orogenic load, or an unresolved intra-cratonic process.
- Subsidence is created by thinning, by thermal cooling, by flexure, and by the load of the fill itself, and basins are always underfilled.
- Backstripping removes the sediment and water loads to give the tectonic subsidence curve, which is the measurement that constrains the model.
- The flexural parameter $a \propto T_e^{3/4}$ sets the width of a foreland basin, and the forebulge distance is a measurement of the elastic thickness.
- The ratio of the rate of creation of accommodation to the rate of sediment supply controls whether a shoreline advances, stands or retreats, and therefore the whole architecture of the fill.
- Subsidence and fill are different measurements, and most basin-analysis errors come from reading one as the other.
:::

## Exercises

::: exercise Basin type {level=1}
A basin has a half-graben basement, an alkaline basalt at its base, and a thick evaporite above the syn-rift clastics. What type of basin and what stage?
::: solution
An **extensional (rift) basin** at the **syn-rift to early post-rift** transition. The half-graben basement and the alkaline basalt are the diagnostic syn-rift association, and the evaporite marks the **restriction** of the basin as it subsided below the level of marine connection while the surrounding highs were still shedding clastics — the classic "rift sag" evaporite of the Red Sea, the Gabon basin and the South Atlantic's pre-salt.
:::
:::

::: exercise Flexural parameter {level=1 check="32"}
For $T_e = 10\ \mathrm{km}$ with the constants of [[#ex-flexure]], find the flexural parameter in km.
::: solution
$D = 6.2\times10^{21}\ \mathrm{N\,m}$ and $a = (4D/\Delta\rho g)^{1/4} = 32\ \mathrm{km}$. The forebulge would lie about $\pi a = 100\ \mathrm{km}$ from the load, which is the narrow, deep, coarse-filled foreland of a young or hot lithosphere.
:::
:::

::: exercise A/S ratio {level=1 check="1.0"}
Accommodation is created at $50\ \mathrm{m\,Myr^{-1}}$ and sediment is supplied at $50\ \mathrm{m\,Myr^{-1}}$. What is the stacking pattern?
::: solution
$A/S = 1$, so the shoreline **stands still** and the system **aggrades**. The stacking is **aggradational**: repeated parasequences of equal thickness with no net shallowing or deepening, and a shoreline that stays in place while the section thickens. In practice this is a balance that rarely persists for long, and the real signature is a rapid alternation of progradational and retrogradational parasequences.
:::
:::

::: exercise Backstripping {level=2 check="-228"}
A well has 500 m of water, 3 km of sediment of density $2500\ \mathrm{kg\,m^{-3}}$, and a mantle density of $3300\ \mathrm{kg\,m^{-3}}$. Find the elevation of the **bare basement** relative to sea level, in metres (negative means below).
::: solution
The basement lies $3500 - 3000 = 500\ \mathrm{m}$ below the seafloor. Removing the sediment load rebounds the crust by
$$
\Delta = 3000\times\frac{3300-2500}{3300} = 3000\times0.242 = 728\ \mathrm{m},
$$
so the bare basement stands $500 - 728 = -228\ \mathrm{m}$ below the seafloor's datum, which is **228 m above sea level**. A bare basement standing above sea level means that without its sediment load this site would have been subaerial, and that the entire subsidence history of the site is **sediment-loaded** — a sediment-starved basin would have remained a land.
:::
:::

::: exercise Forebulge {level=2}
Two foreland basins have the same thrust load. Basin A has a forebulge 250 km from the thrust and a wide, shallow moat filled with shallow-marine sandstone; basin B has a forebulge 90 km from the thrust and a narrow, deep moat filled with conglomerate. Compare their lithospheres.
::: solution
The forebulge distance is $\pi a$, so $a_A = 80\ \mathrm{km}$ and $a_B = 29\ \mathrm{km}$. Since $a \propto T_e^{3/4}$,
$$
\frac{T_{eA}}{T_{eB}} = \left(\frac{80}{29}\right)^{4/3} = 2.76^{4/3} = 3.9 .
$$
Basin A's lithosphere is about **four times stronger** than basin B's — perhaps $T_e$ of 40 km against 10 km. Basin A is an old craton whose flexure is distributed over a thousand kilometres, so its moat is a broad shallow shelf that floods easily and fills with shallow-marine sand. Basin B is a young or hot lithosphere whose flexure is localised, so its moat is a narrow deep trough that is kept deep by the load and filled with the conglomerate shed directly off it.

The prediction that follows is testable: basin A should show a **regional unconformity and a coastal onlap** pattern on seismic, with the shoreline migrating hundreds of kilometres, while basin B should show **steep, hummocky, chaotic reflectors** of a wedge-top fan and no regional onlap. The two basins will have opposite hydrocarbon systems — A with regional seals and stratigraphic traps on the onlap, B with structural traps in the thrust belt and poor seals.
:::
:::

::: exercise Systems tracts {level=2}
A well shows, upward: a 40-m coarsening-upward deltaic sand; a sharp-based 25-m shoreface sand with a transgressive lag; 120 m of offshore shale with a condensed glauconitic zone at its base; and a 60-m coarsening-upward shoreface sand. Identify the surfaces and the systems tracts.
::: solution
The 40-m coarsening-upward deltaic sand is a **highstand systems tract** (HST) — progradational, $A/S \lesssim 1$. The sharp-based shoreface sand with a transgressive lag is the ravinement barrier at the base of the **transgressive systems tract** (TST), and its base is the **transgressive surface of erosion**. The 120 m of offshore shale is the TST's condensed drift, and the **maximum flooding surface is at its top**, where the condensed fauna, the glauconite and the starved sediment should be found. The 60-m coarsening-upward shoreface sand above it is the next **highstand systems tract**.

The exercise's point is the one that costs money: the **condensed section and the maximum flooding surface are at the top of the transgressive shale, not at its base**, and a glauconitic sand at the base of a shale is a transgressive lag, whereas the same glauconite at the top is the maximum flooding surface. Getting them the wrong way round inverts the interpretation of the whole cycle and puts the seal where the reservoir is.
:::
:::

::: exercise A basin synthesis {level=3}
A passive-margin well penetrates, from the top: 1.5 km of shelf sandstone and shale (Miocene–Quaternary); 800 m of marine shale (Cretaceous–Palaeogene); 300 m of evaporite; 1.2 km of lacustrine shale and fan-delta conglomerate with alkaline basalts; and faulted granite basement. The crustal thickness beneath is 22 km against a precursor of 35 km. Build the basin's history and find $\beta$ and the syn-rift and post-rift subsidence.
::: solution
The **faulted granite and the 1.2 km of lacustrine shale, fan-delta conglomerate and alkaline basalt** are the **syn-rift** half-graben fill. The **300 m of evaporite** is the **restriction and break-up** sequence, deposited as the basin subsided below marine connection and then connected briefly as the seafloor spread. The **800 m of marine shale** is the **post-rift thermal sag and drift** sequence, and the **1.5 km of shelf clastics** is the progradational margin fill of the last 30 Myr.

The crustal thickness gives
$$
\beta = \frac{35}{22} = 1.59 .
$$
The crustal-thinning term of the subsidence, with the densities of [[structural-geology/rifts]], is
$$
d = 0.264\times\frac{35\times0.59}{1.59} = 0.264\times13.0 = 3.4\ \mathrm{km},
$$
and the observed syn-rift plus early post-rift thickness is $1.2 + 0.3 + 0.8 = 2.3\ \mathrm{km}$ of sediment, which under-estimates the subsidence because the section was deposited **in** the subsiding hole and its thickness is not the subsidence. Adding the water and sediment loading, the two are consistent with a $\beta$ of 1.6 and a thermal contribution comparable to the crustal term.

The weakest link is the **$\beta$ from the present crustal thickness**. A passive margin's crust is thinned not only by the rift's faulting but by the magmatism at break-up, which **adds** mafic material at the base and can make the crust appear thicker than the extension warrants; and the sediment load has driven additional subsidence that is not extensional. The proper estimate comes from the **fit of the backstripped tectonic subsidence curve** to the McKenzie model, which separates the instantaneous thinning from the thermal decay and gives $\beta$ from the shape of the curve rather than from a single number.
:::
:::

::: exercise The forward problem {level=3}
A basin subsides at a constant $40\ \mathrm{m\,Myr^{-1}}$ and receives sediment at a constant $55\ \mathrm{m\,Myr^{-1}}$ for 20 Myr. Sea level is constant. Find the total thickness, the shoreline trajectory, and the fraction of the section that is non-marine.
::: solution
The thickness is $55\times20 = 1100\ \mathrm{m}$ and the accommodation created is $40\times20 = 800\ \mathrm{m}$, so the system **fills its accommodation and has 300 m to spare**, which is built above sea level as coastal plain and non-marine sediment. With $A/S = 40/55 = 0.73$ the shoreline **progrades**, and the shoreline trajectory — the climb per unit of advance — is set by the excess supply.

The fraction of the section that is non-marine depends on the profile geometry, but the **volume** balance is exact: the 300 m of excess is subaerial, so at least
$$
\frac{300}{1100} = 27\ \%
$$
of the section is non-marine or coastal plain, and the remaining 73 per cent is marine, built in the 800 m of accommodation. The 300 m of subaerial excess, built on a delta plain whose profile slope is $10^{-3}$, forms a wedge of width
$$
\frac{300}{10^{-3}} = 300\ \mathrm{km},
$$
which is the reason that a surplus of supply builds a coastal plain hundreds of kilometres wide and a deficit builds a thin, clean, landward-riding sand.

The caution is that the "constant" rates are not constant. A real basin's subsidence decays as the square root of time after a rifting event, and its supply varies with climate and with the area of the catchment as it is eroded. A forward model with the two rates as functions of time reproduces the observed stacking pattern of a real succession, and the exercise of matching one is the whole of quantitative basin analysis.
:::
:::
