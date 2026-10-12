Ninety-one elements occur in the Earth's crust in measurable amounts. About six thousand minerals are known. And almost every rock you will ever pick up — the granite in a kerbstone, the basalt in a sea cliff, the sandstone in a river gorge — is built from the same twenty or so. This small overlap between the periodic table and the hand specimen is not a coincidence: it is the outcome of chemistry (which ions fit together), of cosmochemistry (which atoms were abundant when the Solar System condensed) and of thermodynamics (which structures survive at the surface of a wet, oxidising, moderately cold planet).

Learning those twenty minerals is the first practical skill of geology, in the same sense that learning the alphabet is the first skill of reading. Every later chapter in this course — how magmas crystallise, how sediments are sorted, which minerals grow when a rock is buried, why one cliff collapses and the other does not — is a statement about minerals. And every property you will use to recognise them, hardness and cleavage above all, is a direct read-out of atomic structure, which is why this chapter starts with bonding rather than with a list.

## What counts as a mineral

::: definition Mineral, crystal, mineraloid {#def-mineral}
A **mineral** is a naturally occurring substance with a reasonably well-defined chemical composition, formed by a natural process, whose atoms are arranged in an ordered, repeating pattern: it is **crystalline**. A **crystal** is a mineral (or other crystalline solid) that has grown freely enough to display external plane faces. A **mineraloid** is a natural substance that fails the crystallinity requirement — volcanic glass, opal (which has water and only short-range order), and native sulfur precipitated from a fumarole in its first days.
:::

The definition looks bureaucratic because it is the published product of the International Mineralogical Association, revised in 2012 and again since, and it exists to settle real arguments. Three consequences are worth stating plainly, because each is a common misconception:

- **Ice is a mineral**, in all its fourteen known crystalline forms, including the ones stable only in the deep mantle. So is the water ice you make in a freezer, once you accept that "natural" in the definition means "not made deliberately by a laboratory reaction" rather than "never touched by humans".
- **Mercury is a mineral**, so the idea that minerals are necessarily solids is wrong; the criterion is atomic order, not state of aggregation at room temperature.
- **Coal is not a mineral**, because it is a mixture of organic compounds rather than a substance with a definite composition and a lattice. Nor is granite, or any other rock: a rock is an aggregate of minerals.

::: warning "It's got six flat faces, so it's a crystal"
Two different things get called a crystal. A mineral grain with **cleavage** has flat surfaces that formed when it broke along planes of weak bonding, and those planes are controlled by the structure — calcite's rhomb, mica's sheet, halite's cube. A **crystal** in the strict sense has faces that grew, and its shape records the growth environment as well as the structure: a quartz grain in a geode is a six-sided prism with terminations, while the same quartz as a grain in sandstone has no faces at all but exactly the same cleavage and the same lattice. Faces tell you about growth; cleavage tells you about structure. Learn to tell which you are looking at before you use either for identification.
:::

## Why structure follows from chemistry

Nearly all rock-forming minerals are held together by a mixture of ionic and covalent bonding, with the ionic component dominant in the oxides and silicates that make up most of the crust. The single most useful quantitative idea is that of **coordination number**: how many oxygen anions surround a given cation.

::: definition Ionic radius and coordination number {#def-coordination}
Ions are treated as hard spheres whose radii depend on coordination number and on the charge state. The values used throughout this atlas are Shannon's effective ionic radii, in which six-coordinated oxygen has $r_\text{O} = 1.38\ \text{Å}$, four-coordinated silicon $r_\text{Si} = 0.26\ \text{Å}$, six-coordinated magnesium $r_\text{Mg} = 0.72\ \text{Å}$, and so on. The **coordination number** (CN) is the number of nearest-neighbour anions around a cation; the common values in silicates are CN 4 (a tetrahedron) and CN 6 (an octahedron).
:::

::: proposition The radius-ratio rule {#prop-radiusratio}
A cation of radius $r_\text{c}$ sits stably in a hole of $n$ anions of radius $r_\text{a}$ only if the anions touch the cation without touching each other too strongly. The limiting ratios, obtained when anions touch both the cation and one another, are

| coordination | geometry | $r_\text{c}/r_\text{a}$ above |
|---|---|---|
| 3 | triangular | $0.155$ |
| 4 | tetrahedral | $0.225$ |
| 6 | octahedral | $0.414$ |
| 8 | cubic | $0.732$ |

:::

::: proof
Work in the tightest cross-section of each hole, and let the anions be touching.

*Octahedral (CN 6).* Take the square of four anions around the cation, edge $2r_\text{a}$. The cation just fits when the diagonal equals $2r_\text{a} + 2r_\text{c}$:
$$
2r_\text{a} + 2r_\text{c} = 2\sqrt{2}\,r_\text{a} \Longrightarrow \frac{r_\text{c}}{r_\text{a}} = \sqrt{2} - 1 = 0.414 .
$$
A smaller cation rattles in the hole, the anions are pushed apart by nothing, and the structure becomes unstable to a lower coordination.

*Tetrahedral (CN 4).* In a regular tetrahedron the cation–anion distance is $\sqrt{3/8}$ times the anion–anion edge, so with the anions touching, $2r_\text{a} + 2r_\text{c} = 2\sqrt{3/8}\times 2r_\text{a}\times\sqrt{2}/\sqrt{2}$, which reduces to
$$
\frac{r_\text{c}}{r_\text{a}} = \sqrt{\tfrac{3}{2}} - 1 = 0.225 .
$$

*Cubic (CN 8).* The anions sit at the corners of a cube of edge $2r_\text{a}$ and the cation at the centre; the body diagonal is $2\sqrt{3}\,r_\text{a} = 2r_\text{a} + 2r_\text{c}$, giving $r_\text{c}/r_\text{a} = \sqrt{3} - 1 = 0.732$. ∎
:::

::: example Which coordination for which cation? {#ex-ratios}
Using $r_\text{O} = 1.38\ \text{Å}$, decide the likely coordination of $\mathrm{Si^{4+}}$ ($0.40\ \text{Å}$), $\mathrm{Mg^{2+}}$ ($0.72\ \text{Å}$), $\mathrm{Fe^{2+}}$ ($0.78\ \text{Å}$), $\mathrm{Ca^{2+}}$ ($1.00\ \text{Å}$) and $\mathrm{K^{+}}$ ($1.38\ \text{Å}$).
::: solution
Divide each radius by $1.38\ \text{Å}$:

| cation | $r_\text{c}/r_\text{a}$ | predicted coordination |
|---|---|---|
| $\mathrm{Si^{4+}}$ | $0.29$ | 4, tetrahedral |
| $\mathrm{Mg^{2+}}$ | $0.52$ | 6, octahedral |
| $\mathrm{Fe^{2+}}$ | $0.57$ | 6, octahedral |
| $\mathrm{Ca^{2+}}$ | $0.72$ | 6, just below the 8-fold threshold |
| $\mathrm{K^{+}}$ | $1.00$ | 8 or higher |

This one line of arithmetic explains the whole architecture of the silicate minerals. Silicon is *always* in four-fold coordination with oxygen, so the fundamental building block of the crust is the $\mathrm{SiO_4}$ tetrahedron; magnesium and iron go into octahedral sites between them; calcium sits on the boundary and so can do either job; and potassium is far too large for either hole and needs the roomy sites of a framework — which is exactly why it is concentrated in the few minerals (micas, K-feldspar, evaporite salts) with open structures. Aluminium, at $0.535\ \text{Å}$ in six-fold coordination, gives $0.39$: right on the tetrahedral–octahedral boundary. That ambivalence is why aluminium can substitute for silicon *and* for magnesium, and why it is the most important minor element in the chemistry of rocks.
:::
:::

::: widget plot
f: if(x<0.155, 2, if(x<0.225, 3, if(x<0.414, 4, if(x<0.732, 6, 8))))
x: 0.1, 1.05
y: 1.5, 9.5
points: 0.29,4; 0.52,6; 0.57,6; 0.72,6; 1.0,8
labels: coordination number
caption: The radius-ratio rule as a step function, with the rock-forming cations plotted at their measured ratios (silicon, magnesium, iron, calcium, potassium, from [[#ex-ratios]]). Drag nothing — there is nothing to drag — but read off how much of the horizontal axis belongs to coordination 6 and how narrow the tetrahedral window is. Then notice how close calcium sits to the 0.732 step: calcium is the cation that changes coordination with pressure, which is why the deep crust and upper mantle are denser than the shallow crust at the same chemistry.
:::

### Substitution and solid solution

Pure end-member minerals are the exception. Cations substitute for one another when their radii differ by less than about 15 % and their charges can be balanced, and the result is a **solid solution** — a continuous series of compositions with the same structure.

Two cases matter everywhere in this course:

- **Simple (isovalent) substitution.** $\mathrm{Mg^{2+}}$ and $\mathrm{Fe^{2+}}$ differ by $8\%$ in radius and share a charge, so olivine ranges continuously from $\mathrm{Mg_2SiO_4}$ (forsterite) to $\mathrm{Fe_2SiO_4}$ (fayalite). So do $\mathrm{Fe^{2+}}$–$\mathrm{Mn^{2+}}$, and $\mathrm{Na^{+}}$–$\mathrm{K^{+}}$ only partly, because their radii differ by 35 %.
- **Coupled (charge-balanced) substitution.** In plagioclase feldspar, $\mathrm{Ca^{2+}}$ and $\mathrm{Na^{+}}$ occupy the same large site, but a charge difference of one must be paid for. It is: each $\mathrm{Na^{+}}$ entering forces an $\mathrm{Al^{3+}}$ onto a $\mathrm{Si^{4+}}$ site, so the substitution is the *coupled pair* $\mathrm{Ca^{3+}Si^{4+}} \rightleftharpoons \mathrm{Na^{+}Al^{3+}}$. This is why the feldspars, which are 50–60 % of the crust, are aluminosilicates.

::: example From a chemical analysis to a mineral formula {#ex-formula}
An olivine crystal is analysed and gives (wt %, totals to 98.9 % after omitting minor components): $\mathrm{SiO_2}\ 39.90$, $\mathrm{MgO}\ 51.30$, $\mathrm{FeO}\ 7.30$. Calculate its formula and its forsterite content $F_{\#} = \mathrm{Mg}/(\mathrm{Mg}+\mathrm{Fe})$.
::: solution
Divide each oxide by its molar mass to get moles per $100\ \mathrm{g}$:
$$
\mathrm{SiO_2}: \frac{39.90}{60.08} = 0.664, \qquad
\mathrm{MgO}: \frac{51.30}{40.30} = 1.273, \qquad
\mathrm{FeO}: \frac{7.30}{71.84} = 0.102 .
$$
Olivine has four oxygens per formula unit, and each $\mathrm{SiO_2}$ contributes two of them, so multiply through by $2$ to put silicon at $1.33$ per two oxygens, or normalise on silicon $= 1$:
$$
\big(\mathrm{Mg}_{1.92}\ \mathrm{Fe}_{0.15}\big)\ \mathrm{SiO}_{4}, \qquad F_{\#} = \frac{1.273}{1.273 + 0.102} = 0.93 .
$$
So this is forsteritic olivine, $\mathrm{Fo}_{93}$, the composition typical of the Earth's upper mantle itself. Note that $F_{\#}$ is computed from *moles of cations*, never from weight percentages: $\mathrm{MgO}$ is only $51\%$ by weight, but magnesium is $93\%$ of the cations in that site, because magnesium is light. Getting this step wrong is the commonest arithmetic error in whole-course petrology.
:::
:::

::: widget plot
f: (140.694 + 63.082*x)/(43.600 + 2.717*x)
x: 0, 1
y: 3.1, 4.5
points: 0.07, 3.31
labels: density of olivine
caption: Density of olivine along the forsterite–fayalite series, computed from the molar volumes of the end members with volumes assumed to add linearly with composition. The horizontal axis is the iron fraction $1 - F_{\#}$, so the left end is pure forsterite ($3.23\ \mathrm{g\,cm^{-3}}$) and the right end pure fayalite ($4.40\ \mathrm{g\,cm^{-3}}$); the marked point is the $\mathrm{Fo}_{93}$ crystal of [[#ex-formula]]. Read off the density of $\mathrm{Fo}_{90}$ and of $\mathrm{Fo}_{10}$: the whole range of a mineral that spans most of the mantle and the oceanic crust changes density by only a third. That is why olivine-rich rocks can be handled with a hand lens and a density measurement without knowing where on the series they lie.
:::

## The properties you can actually measure

Everything below follows from bonding and structure, and in each case the *reason* is more reliable than the rule of thumb.

**Hardness** is resistance to scratching, ranked by Mohs's ten-mineral scale (1 talc … 10 diamond). The scale is ordinal and wildly nonlinear: the Vickers hardness of corundum (9) is about four times that of topaz (8), and diamond (10) is about four times corundum. Hardness falls as bond length increases and rises with charge, which is why the small, highly charged $\mathrm{Si^{4+}}$–O bonds of quartz and the covalent network of diamond are hard, while the layered or molecular solids — graphite, micas, talc, halite — are soft.

**Cleavage** is the tendency to break along crystallographic planes of relatively weak bonding. Describe it by its *number of directions* and their *angles*: mica, one direction, perfect; amphibole, two at $56^\circ$/$124^\circ$; pyroxene, two near $90^\circ$; halite, three at $90^\circ$; calcite, three at $78^\circ$ (the rhomb); fluorite, four (the octahedron); quartz, *none*, so it breaks with a curved (conchoidal) fracture.

**Streak** — the colour of the powdered mineral, rubbed on unglazed porcelain — beats the colour of the hand specimen, because powder destroys the effect of grain size and of trace impurities. Hematite is grey, red or black in hand but always cherry-red in streak, and that single test separates it from magnetite, which is black in both.

**Density** (specific gravity, numerically equal to density in $\mathrm{g\,cm^{-3}}$) is controlled by atomic weight and packing. Most rock-forming silicates fall between 2.6 and 3.4; the carbonates are 2.7 (calcite) to 4.0 (smithsonite); the oxides and sulfides are 4 to 5.5 and feel heavy in the hand. Learning to weigh a hand specimen in one's palm against this remembered scale is a real skill.

::: definition Specific gravity by Archimedes {#def-sg}
Weigh the specimen in air ($m_\text{air}$) and suspended in water ($m_\text{water}$). The loss of weight equals the weight of the displaced water, so
$$
\mathrm{SG} = \frac{m_\text{air}}{m_\text{air} - m_\text{water}} .
$$
:::

::: example A heavy red grain {#ex-sg}
A transparent red grain has $m_\text{air} = 6.40\ \mathrm{mg}$ and $m_\text{water} = 4.80\ \mathrm{mg}$. Find its specific gravity and say what it probably is.
::: solution
$$
\mathrm{SG} = \frac{6.40}{6.40 - 4.80} = \frac{6.40}{1.60} = 4.00 .
$$
A red, glassy mineral with no cleavage and $\mathrm{SG} \approx 4$ is garnet — almandine, most likely, the iron–aluminium nesosilicate of metamorphic schists and of heavy mineral sands. The look-alikes are excluded by the numbers: spinel is also 3.6–4.1 but cubic with a conchoidal fracture and rarely red in this way; almandine's hardness of 7–7.5 rules out the much softer red minerals cinnabar (2–2.5) and realgar (1.5–2), and both of those are far heavier still.
:::
:::

::: algorithm Identifying an unknown hand specimen {#algo-id}
1. Look at a fresh surface. Note colour, luster (metallic, vitreous, pearly, earthy), and whether the surface is crystalline, granular, glassy or fibrous.
2. Is it metallic? If yes, work through the small metallic group: hematite (red streak), magnetite (magnetic, black streak), pyrite (hard, brittle, greenish-black streak), chalcopyrite (soft, brass-yellow, greenish tarnish), galena (perfect cubic cleavage, very heavy).
3. If it is not metallic, scratch-test it. Harder than the steel knife-blade you carry ($\approx 5.5$): quartz, feldspars, garnet, beryl, apatite (just). Softer: calcite, fluorite, gypsum, the micas, talc.
4. Look for cleavage and count the directions and angles. This is the single most informative observation for the silicates.
5. Do the cheap diagnostic tests: cold dilute hydrochloric acid on a fresh surface (effervescence = calcite; powder only = dolomite), a magnet, a streak plate, and heft for density.
6. Check the answer against the properties in the table above *as a set*. A single property never identifies a mineral; the intersection of four or five does.
:::

**The common rock-forming minerals.**
| mineral | formula | hardness | cleavage | SG | occurs in |
|---|---|---|---|---|---|
| quartz | $\mathrm{SiO_2}$ | 7 | none (fracture) | 2.65 | sandstone, granite, veins, schist |
| orthoclase | $\mathrm{KAlSi_3O_8}$ | 6 | 2 near $90^\circ$ | 2.56 | granite, gneiss, arkose |
| plagioclase | $\mathrm{NaAlSi_3O_8}$–$\mathrm{CaAl_2Si_2O_8}$ | 6–6.5 | 2 near $90^\circ$ | 2.62–2.76 | basalt, gabbro, granite, gneiss |
| muscovite | $\mathrm{KAl_2(AlSi_3O_{10})(OH)_2}$ | 2–2.5 | 1 perfect | 2.8 | granite, schist, slate |
| biotite | $\mathrm{K(Mg,Fe)_3(AlSi_3O_{10})(OH)_2}$ | 2.5–3 | 1 perfect | 3.0 | granite, gneiss, schist |
| hornblende | $\mathrm{Ca_2(Mg,Fe)_4(Al,Si)_8O_{22}(OH)_2}$ | 5–6 | 2 at $56^\circ$ | 3.2 | andesite, granite, amphibolite |
| augite | $\mathrm{(Ca,Na)(Mg,Fe,Al)(Si,Al)_2O_6}$ | 5–6 | 2 at $87^\circ$ | 3.3 | basalt, gabbro |
| olivine | $\mathrm{(Mg,Fe)_2SiO_4}$ | 6.5–7 | poor, conchoidal | 3.2–4.4 | peridotite, basalt, contact aureole |
| garnet | $\mathrm{(Fe,Mg,Ca)_3Al_2(SiO_4)_3}$ | 7–7.5 | none | 3.6–4.3 | schist, gneiss, eclogite, heavy sands |
| calcite | $\mathrm{CaCO_3}$ | 3 | 3 at $78^\circ$ | 2.71 | limestone, marble, veins |
| dolomite | $\mathrm{CaMg(CO_3)_2}$ | 3.5–4 | 3 at $78^\circ$ | 2.85 | dolostone, marble |
| pyrite | $\mathrm{FeS_2}$ | 6–6.5 | indistinct | 5.0 | shales, massive sulfides |
| magnetite | $\mathrm{Fe_3O_4}$ | 5.5–6 | none | 5.2 | basalt, skarn, heavy sands |
| hematite | $\mathrm{Fe_2O_3}$ | 5.5–6.5 | none | 5.3 | banded iron formation, red beds |
| gypsum | $\mathrm{CaSO_4\cdot 2H_2O}$ | 2 | 1 perfect | 2.3 | evaporites, veins |
| halite | $\mathrm{NaCl}$ | 2.5 | 3 at $90^\circ$ | 2.16 | evaporites, salt domes |

::: quiz
A pale green mineral scratches glass, has two cleavages meeting at about $90^\circ$, and is noticeably heavier than quartz. It is most likely
- [ ] hornblende
- [x] augite (a clinopyroxene)
- [ ] muscovite
- [ ] calcite
::: solution
Hardness above glass rules out calcite (3) and muscovite (2–2.5). Two cleavages at about $90^\circ$ with a dark green to black colour and $3.2$–$3.6\ \mathrm{g\,cm^{-3}}$ is the classic description of a clinopyroxene. Amphibole (hornblende) is the trap: its two cleavages meet at $56^\circ$ and $124^\circ$, and it is slightly lighter and usually more distinctly green in hand. In a fine-grained basalt where cleavage angles cannot be measured, you cannot separate them reliably with a hand lens, and that is an honest answer rather than a failure.
:::
:::

## Why these elements, and these families

::: proposition The crust is a silicate–oxide world for three reasons {#prop-why-silicates}
(1) *Abundance.* Oxygen and silicon are the first and eighth most abundant elements in the bulk Earth, because they are produced in huge quantities by stellar nucleosynthesis and condense readily from the solar nebula. (2) *Differentiation.* Iron and nickel, the other abundant refractory elements, were removed from the silicate Earth into the core early, leaving the mantle and crust dominated by $\mathrm{O}$, $\mathrm{Si}$, $\mathrm{Al}$, $\mathrm{Fe^{3+/2+}}$, $\mathrm{Mg}$, $\mathrm{Ca}$, $\mathrm{Na}$, $\mathrm{K}$. (3) *Polymerisation.* $\mathrm{Si^{4+}}$ in four-fold coordination links $\mathrm{SiO_4}$ tetrahedra into chains, sheets and frameworks, so a handful of structures can accommodate almost every other cation.
:::

::: proof
The first two statements are measurements, not arguments: the photospheric and CI-chondrite abundances give O and Si among the top four elements after H and He, and the missing iron of the silicate Earth is found in the core (see [[earth-system/planet-earth]] for the mass-balance argument). The third is structural. Because $\mathrm{Si^{4+}}$ is small and highly charged, the $\mathrm{Si–O}$ bond is about 50 % covalent, and each oxygen is left with one unsatisfied bond. That oxygen can bond to a second silicon, forming a bridging oxygen, and the process repeats: isolated tetrahedra (olivine), pairs (epidote), rings (beryl), single chains (pyroxene), double chains (amphibole), sheets (micas, clays) and the fully polymerised three-dimensional frameworks (quartz, feldspars). Each step up the polymerisation ladder uses oxygen more economically, so the ratio of oxygen to silicon falls from 4 in olivine to 2 in quartz, and the remaining charge is balanced by whatever cations the melt or fluid had available.
:::

The chemical classification of the minerals follows the anion or anionic group, and the sequence is also a sequence of environments:

- **Native elements** — gold, copper, diamond, graphite, sulfur: reduced or insoluble species.
- **Sulfides** — pyrite $\mathrm{FeS_2}$, chalcopyrite $\mathrm{CuFeS_2}$, galena $\mathrm{PbS}$, sphalerite $\mathrm{ZnS}$: formed in low-oxygen melts and hydrothermal fluids; the ores of most metals.
- **Oxides and hydroxides** — hematite, magnetite, corundum $\mathrm{Al_2O_3}$, goethite $\mathrm{FeOOH}$: stable at the oxidising, wet surface; the banded iron formations and the laterites.
- **Halides** — halite, sylvite $\mathrm{KCl}$, fluorite $\mathrm{CaF_2}$: highly soluble, so confined to evaporites.
- **Carbonates** — calcite, dolomite, siderite $\mathrm{FeCO_3}$: the marine and lacustrine precipitates, and the reservoir rocks of the oil industry.
- **Sulfates** — gypsum, anhydrite $\mathrm{CaSO_4}$, barite $\mathrm{BaSO_4}$: evaporites and the oxidation products of sulfide mines.
- **Phosphates** — apatite $\mathrm{Ca_5(PO_4)_3(F,OH)}$: bones, teeth, and the only economic source of phosphorus.
- **Silicates** — everything else, about 90 % of the crust by volume.

::: example Reading a rock from its minerals {#ex-modal}
A dark, medium-grained rock contains, by volume, 50 % plagioclase, 40 % augite and 10 % olivine, with no quartz and no feldspathoid. A second rock is 90 % olivine and 10 % augite. Name the minerals' implications: which rock is the mafic cumulate and which is the basalt, and what does the absence of quartz tell you?
::: solution
The first rock is a gabbro (or, with olivine present, an olivine gabbro): plagioclase plus augite is the diagnostic pair of a slowly cooled basic magma. The second, at 90 % olivine, is a peridotite — and since peridotites do not crystallise from a liquid at the surface, this is either a cumulate or, far more often, a fragment of the mantle brought up by a kimberlite or emplaced by tectonism.

The absence of quartz is the informative part. In a silica-*undersaturated* magma, all the available silica is consumed by the mafic minerals and by feldspar, so no free $\mathrm{SiO_2}$ can crystallise; if feldspathoids (nepheline, leucite) were present they would confirm it. A magma with excess silica instead crystallises quartz, and in a volcanic rock it will be visible as glass or as phenocrysts. So a single absent mineral records the bulk chemistry of a melt emplaced kilometres away and, in the second case, sampled from a depth of tens of kilometres.
:::
:::

::: svg
caption: Three silicate structures drawn the same way, tetrahedra at the top. Left: isolated $\mathrm{SiO_4}$ tetrahedra in olivine, linked only by $\mathrm{Mg^{2+}}$ and $\mathrm{Fe^{2+}}$ in octahedral sites — the reason olivine has no cleavage and weathers fast. Centre: a single chain in a pyroxene, two bridging oxygens per tetrahedron shared along one direction — the reason pyroxene splits on two planes. Right: a sheet, three of four oxygens bridged — the reason mica peels. The fourth possible step, the framework, has all four bridged and is quartz and feldspar.
<svg viewBox="0 0 760 272" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Olivine, pyroxene and mica structures as tetrahedra">
  <style>
    .t { fill: var(--accent-wash); stroke: var(--accent); stroke-width: 1.6; }
    .br { stroke: var(--series-2); stroke-width: 2.4; }
    .cat { fill: var(--series-3); stroke: none; }
    .lab { fill: var(--ink-2); font-size: 13px; }
    .ttl { fill: var(--ink); font-size: 14px; font-weight: 700; }
    .ax { stroke: var(--rule-2); stroke-width: 1; stroke-dasharray: 4 4; }
  </style>
  <!-- olivine: isolated tetrahedra -->
  <g transform="translate(30,60)">
    <polygon class="t" points="40,0 70,60 10,60"/>
    <polygon class="t" points="140,0 170,60 110,60"/>
    <polygon class="t" points="40,110 70,170 10,170"/>
    <polygon class="t" points="140,110 170,170 110,170"/>
    <circle class="cat" cx="105" cy="30" r="7"/>
    <circle class="cat" cx="105" cy="140" r="7"/>
    <circle class="cat" cx="5" cy="85" r="7"/>
    <circle class="cat" cx="175" cy="85" r="7"/>
    <text class="ttl" x="10" y="-22">olivine · isolated</text>
    <text class="lab" x="10" y="196">O:Si = 4 · no cleavage</text>
  </g>
  <!-- pyroxene: single chain -->
  <g transform="translate(270,60)">
    <polygon class="t" points="20,0 50,60 -10,60"/>
    <polygon class="t" points="50,60 80,0 110,60"/>
    <polygon class="t" points="80,0 110,60 140,0"/>
    <polygon class="t" points="110,60 140,0 170,60"/>
    <polygon class="t" points="140,0 170,60 200,0"/>
    <line class="br" x1="50" y1="60" x2="80" y2="60"/>
    <line class="br" x1="110" y1="60" x2="140" y2="60"/>
    <line class="br" x1="80" y1="0" x2="110" y2="0"/>
    <line class="br" x1="140" y1="0" x2="170" y2="0"/>
    <text class="ttl" x="0" y="-22">pyroxene · single chain</text>
    <text class="lab" x="0" y="196">O:Si = 3 · two cleavages at 90°</text>
  </g>
  <!-- sheet -->
  <g transform="translate(520,60)">
    <polygon class="t" points="20,0 50,60 -10,60"/>
    <polygon class="t" points="50,60 80,0 110,60"/>
    <polygon class="t" points="80,0 110,60 140,0"/>
    <polygon class="t" points="110,60 140,0 170,60"/>
    <polygon class="t" points="140,0 170,60 200,0"/>
    <line class="ax" x1="-20" y1="72" x2="215" y2="72"/>
    <line class="ax" x1="-20" y1="112" x2="215" y2="112"/>
    <text class="lab" x="0" y="98">weak interlayer (K<tspan baseline-shift="super" font-size="10">+</tspan>, OH)</text>
    <text class="ttl" x="0" y="-22">mica · sheet</text>
    <text class="lab" x="0" y="196">O:Si = 2.5 · one perfect cleavage</text>
  </g>
</svg>
:::

## Minerals record the conditions of their making

::: theorem The Gibbs phase rule {#thm-phaserule}
For a system at equilibrium with $C$ independent components and $P$ phases, the number of degrees of freedom — independent variables you may change without destroying a phase — is
$$
F = C - P + 2 .
$$
:::

::: proof
Equilibrium requires the chemical potential of each component to be equal in every phase: $(P-1)C$ equations, since for each of the $C$ components the potential must match across each of the $P-1$ phase boundaries. To specify the state you must give $T$, $P$ (2 variables) and the composition of each phase, $C-1$ mole fractions per phase, or $P(C-1)$ in total. Subtracting the constraints,
$$
F = \big[P(C-1) + 2\big] - (P-1)C = PC - P + 2 - PC + C = C - P + 2 . \qquad \text{\(\blacksquare\)}
$$
:::

The rule is the reason a metamorphic rock is a thermometer. In the one-component system $\mathrm{Al_2SiO_5}$ ($C = 1$), one phase may exist over a two-dimensional field of the pressure–temperature plane ($F = 2$); two phases coexist only on a line ($F = 1$); and three phases only at a point ($F = 0$). Andalusite, kyanite and sillimanite are that system, and their observed triple point near $0.4\ \mathrm{GPa}$ and $500\ ^\circ\mathrm{C}$ means that finding kyanite in a schist pins the rock to the high-pressure field, and finding andalusite overprinting kyanite records decompression.

::: example When does diamond become the stable form of carbon? {#ex-diamond}
At $298\ \mathrm{K}$ and $10^5\ \mathrm{Pa}$, $\Delta_\mathrm{f} G^\circ$ of diamond relative to graphite is $+2.90\ \mathrm{kJ\,mol^{-1}}$, and the molar volumes are $V_\text{graphite} = 5.316$ and $V_\text{diamond} = 3.417\ \mathrm{cm^3\,mol^{-1}}$. Find the pressure at which diamond becomes stable at $298\ \mathrm{K}$, and, using $S^\circ_\text{graphite} = 5.74$ and $S^\circ_\text{diamond} = 2.38\ \mathrm{J\,mol^{-1}\,K^{-1}}$, at $1200\ ^\circ\mathrm{C}$.
::: solution
At equilibrium $\Delta G^\circ(T) + (V_\text{diamond} - V_\text{graphite})(P - P^\circ) = 0$, so
$$
P = P^\circ + \frac{\Delta G^\circ(T)}{V_\text{graphite} - V_\text{diamond}} .
$$
At $298\ \mathrm{K}$: $P = 10^{5} + 2900/(1.899\times 10^{-6}) = 1.53\ \mathrm{GPa}$ — about $58\ \mathrm{km}$ of lithostatic load in rock of $2700\ \mathrm{kg\,m^{-3}}$. Diamond is *metastable* at the surface: it wants to become graphite, and does so only imperceptibly slowly.

At $1473\ \mathrm{K}$, take $\Delta H^\circ \approx \Delta G^\circ + T\Delta S^\circ = 2900 + 298\times(-3.36) = 1898\ \mathrm{J\,mol^{-1}}$, so $\Delta G^\circ(1473) = 1898 + 1473\times 3.36 = 6852\ \mathrm{J\,mol^{-1}}$ and
$$
P = \frac{6852}{1.899\times 10^{-6}} = 3.6\ \mathrm{GPa}.
$$
The boundary has a positive, shallow slope, $\mathrm{d}P/\mathrm{d}T = -\Delta S/\Delta V \approx +1.8\ \mathrm{MPa\,K^{-1}}$: heating makes diamond *less* stable, because graphite has the higher entropy. Natural gem diamonds come from $4.5$–$6\ \mathrm{GPa}$, that is $150$–$200\ \mathrm{km}$ depth in the cratonic root, and reach the surface in kimberlite magmas erupted in hours — a quench that is the reason you can hold a piece of the deep mantle in your hand ([[physical-geology/volcanoes]], [[geochemistry/elements-earth]]).
:::
:::

::: warning "Rocks and minerals that are stable at the surface are the stable ones"
The opposite is closer to the truth. Almost every mineral in an igneous rock is metastable at the surface: olivine weathers to clay in centuries, pyroxene and calcium plagioclase in millennia, while quartz — the least reactive common mineral — survives to be recycled through a dozen sandstones. The order of instability at the surface is very nearly the order of crystallisation from a melt (Bowen's rule, [[physical-geology/igneous-rocks]]), and that is why a beach sand is overwhelmingly quartz while the rock it came from was a third feldspar.
:::

::: history
Mineralogy is older than geology. Georgius Agricola's *De re metallica* (1556) classified minerals by outward properties and by the behaviour of ores in the furnace. The decisive step was Abbe René Just Haüy's observation of 1784 that a broken grain of calcite is always a rhomb with the same angles, from which he inferred that the mineral is built from identical "integrant molecules" stacked in a lattice — the atomic theory of crystals, five years before Dalton's atoms and a century before X-rays proved the idea directly (Max von Laue's diffraction in 1912, the Braggs' analysis of NaCl in 1913, which gave the structure of the first mineral). Between Haüy and the Braggs the subject was almost entirely measurement: Werner's nomenclature (1789), Haüy's crystal systems, Mohs's hardness scale (1812), and the crystallography that by 1890 had enumerated the 230 possible space groups — a purely mathematical result that turned out to enumerate every mineral that has ever existed. Linus Pauling's three structure rules of 1929, of which [[#prop-radiusratio]] is the first, made mineral chemistry predictive for the first time, and the International Mineralogical Association, founded in 1958, has since been the body that decides what counts as a new mineral: some 5 800 species are now approved, of which fewer than forty make up the rocks under your feet.
:::

## Where this leads

Minerals are the alphabet for four chapters that follow immediately: [[physical-geology/igneous-rocks]] uses the melting and crystallisation behaviour of the silicates, [[physical-geology/sedimentary-rocks]] uses their relative instability at the surface, and [[physical-geology/metamorphic-rocks]] uses the phase rule of [[#thm-phaserule]] in earnest. The same structures reappear in [[mineralogy-petrology/crystallography]] with the symmetry formalism, in [[mineralogy-petrology/optical-mineralogy]] where they are measured with polarised light instead of a knife-blade, and in [[geochemistry/trace-elements]] where ionic radius becomes a quantitative partition coefficient.

::: summary Key takeaways
- A mineral is a natural, crystalline substance of reasonably definite composition; ice and mercury qualify, coal and glass do not, and no rock is a mineral.
- Coordination number follows from the radius ratio, and the thresholds $0.225$, $0.414$ and $0.732$ explain why silicon is always tetrahedral, magnesium and iron octahedral, and potassium in big sites only.
- Substitution is controlled by radius (within about 15 %) and charge; charge differences are paid for by coupled substitutions, which is why the feldspars are aluminosilicates.
- Compute compositions in moles of cations, never in weight per cent: $F_{\#} = \mathrm{Mg}/(\mathrm{Mg}+\mathrm{Fe})$ from an olivine analysis is the standard exercise.
- Identify by a *set* of properties — hardness, cleavage (number and angle), streak, specific gravity, one diagnostic test — and never by colour alone.
- The silicate families are a polymerisation ladder, isolated tetrahedra to framework, and each rung shows up as a cleavage and a weathering rate.
- The Gibbs phase rule, $F = C - P + 2$, is what allows a mineral assemblage to be read as a record of pressure and temperature.
- Nearly every common mineral is metastable at the surface; that metastability is what makes sediment, soil and the shape of the land possible.
:::

## Exercises

::: exercise Coordination from radii {level=1 check="6"}
Using $r_\text{O} = 1.38\ \text{Å}$ and $r_\text{Ti} = 0.605\ \text{Å}$, predict the coordination number of $\mathrm{Ti^{4+}}$ by oxygen.
::: solution
$0.605/1.38 = 0.438$, just above the octahedral threshold of $0.414$, so CN 6. Titanium in rutile, $\mathrm{TiO_2}$, is indeed six-coordinated — and the small margin explains why $\mathrm{Ti^{4+}}$ can also be forced into four-fold coordination in some silicates.
:::
:::

::: exercise Forsterite from the cell {level=1 check="2.16"}
Halite is cubic with $a = 5.6402\ \text{Å}$ and four $\mathrm{NaCl}$ formula units per cell. Calculate its density ($M = 58.44\ \mathrm{g\,mol^{-1}}$).
::: solution
$$
\rho = \frac{Z M}{N_\text{A} V} = \frac{4 \times 58.44}{6.022\times 10^{23} \times (5.6402\times 10^{-8})^3} = \frac{233.8}{108.0} = 2.16\ \mathrm{g\,cm^{-3}} .
$$
The measured value is $2.17$. As a check on the ionic model, the nearest $\mathrm{Na–Cl}$ distance is $a/2 = 2.82\ \text{Å}$, against the sum of the ionic radii $1.02 + 1.81 = 2.83\ \text{Å}$: the hard-sphere picture works to a per cent.
:::
:::

::: exercise Olivine composition {level=1 check="0.79"}
An olivine contains $\mathrm{SiO_2}\ 38.60$, $\mathrm{MgO}\ 42.10$, $\mathrm{FeO}\ 18.60$ wt %. Find $F_{\#}$.
::: solution
Moles per $100\ \mathrm{g}$: $\mathrm{SiO_2}\ 0.642$, $\mathrm{MgO}\ 1.045$, $\mathrm{FeO}\ 0.259$. Then $F_{\#} = 1.045/(1.045 + 0.259) = 0.80$, i.e. $\mathrm{Fo}_{80}$. Note that iron is only 19 % by weight but 20 % of the site — the two numbers differ because $\mathrm{FeO}$ weighs 71.8 and $\mathrm{MgO}$ only 40.3.
:::
:::

::: exercise Density of a heavy mineral {level=2 check="4.27"}
A mineral separates from a heavy liquid of density $4.15\ \mathrm{g\,cm^{-3}}$ by floating, and from one of $4.35\ \mathrm{g\,cm^{-3}}$ by sinking. A separate Archimedes determination gives $m_\text{air} = 8.20\ \mathrm{mg}$, $m_\text{water} = 6.28\ \mathrm{mg}$. Find the density and decide whether the heavy-liquid result is consistent.
::: solution
$\mathrm{SG} = 8.20/(8.20 - 6.28) = 8.20/1.92 = 4.27$. This lies between 4.15 and 4.35, so the two methods agree. The mineral is in the garnet–staurolite–epidote range that dominates heavy mineral concentrates, and the whole point of the density-separation technique is that it sorts grains by exactly this property before anything else is measured.
:::
:::

::: exercise Deriving the tetrahedral threshold {level=2}
Derive $r_\text{c}/r_\text{a} = \sqrt{3/2} - 1 = 0.225$ for a cation in a tetrahedral hole of four touching anions.
::: solution
Place the cation at the centre of a regular tetrahedron of edge $a = 2r_\text{a}$. The centre-to-vertex distance of a regular tetrahedron is $R = a\sqrt{3/8}$, so the cation just touches the anions when $R = r_\text{a} + r_\text{c}$:
$$
r_\text{a} + r_\text{c} = 2r_\text{a}\sqrt{\tfrac{3}{8}} = r_\text{a}\sqrt{\tfrac{3}{2}} \Longrightarrow \frac{r_\text{c}}{r_\text{a}} = \sqrt{1.5} - 1 = 0.225 .
$$
The same construction for the other coordinations gives $\sqrt{2}-1$ (octahedral) and $\sqrt{3}-1$ (cubic); the pattern is that the hole gets roomier as the number of anions increases, which is why larger cations demand higher coordination and why a mineral's density rises with pressure at fixed chemistry.
:::
:::

::: exercise The phase rule in water {level=2}
How many degrees of freedom does (a) liquid water, (b) liquid water and vapour, (c) ice, liquid and vapour together have? What does (c) mean for the triple point of water, and what is the analogue for $\mathrm{Al_2SiO_5}$?
::: solution
$C = 1$ in all three cases, so $F = 3 - P$. (a) $P = 1$, $F = 2$: both $T$ and $P$ may be varied. (b) $P = 2$, $F = 1$: boiling temperature is a function of pressure alone, which is why a pressure cooker works and why water boils at $85\ ^\circ\mathrm{C}$ on a high mountain. (c) $P = 3$, $F = 0$: a single point, $0.01\ ^\circ\mathrm{C}$ and $611\ \mathrm{Pa}$, with no freedom at all.

For $\mathrm{Al_2SiO_5}$ the analogue is the andalusite–kyanite–sillimanite triple point near $0.4\ \mathrm{GPa}$ and $500\ ^\circ\mathrm{C}$: three aluminosilicate polymorphs can coexist only there, so a rock in which all three are found together either formed at that one point or, far more likely, is a mixture of generations recording a path across the boundaries.
:::
:::

::: exercise Why is diamond metastable at the surface? {level=2 check="58"}
Using the data of [[#ex-diamond]], convert the $298\ \mathrm{K}$ equilibrium pressure to a depth in rock of density $2700\ \mathrm{kg\,m^{-3}}$, and explain why a diamond in a kimberlite is not evidence that the kimberlite erupted from that depth.
::: solution
$z = P/\rho g = 1.53\times 10^{9}/(2700 \times 9.81) = 58\ \mathrm{km}$.

The depth is only a lithostatic equivalent, and the real argument is the one in [[#ex-diamond]]: at $1200\ ^\circ\mathrm{C}$ the boundary is at $3.6\ \mathrm{GPa}$, and the cratonic mantle geotherm crosses it at $150$–$200\ \mathrm{km}$. Diamonds crystallise there, and survive the trip up only because the ascent took hours and the graphite–diamond transformation is enormously slow at low temperature. Metastability is a statement about kinetics, not about thermodynamics.
:::
:::

::: exercise A hand-specimen key {level=3}
You are given four colourless minerals: calcite, quartz, fluorite and apatite. Devise the shortest sequence of tests, using only a knife-blade (hardness 5.5), a glass plate (5.5), a hand lens, cold dilute hydrochloric acid and a balance, that separates all four with certainty. Say what each test rules out.
::: solution
Step 1, acid on a fresh surface: effervescence identifies calcite immediately and removes it. Step 2, scratch the glass with the remaining three: quartz (7) and apatite (5) — apatite is marginal, so use the knife-blade too — while fluorite (4) will not scratch glass. Step 3, confirm fluorite by its perfect octahedral cleavage (four directions, visible as cleavage triangles on a broken fragment) and apatite by its conchoidal fracture and hexagonal prisms; apatite also fails the acid test, unlike calcite, but reacts if the acid is warm and concentrated. Step 4, confirm quartz by the absence of any cleavage and by its conchoidal fracture, and check the densities: 2.65 (quartz), 2.71 (calcite), 3.18 (fluorite), 3.1–3.2 (apatite).

The order matters: acid first because it is decisive and takes seconds, hardness next because it splits the remaining three cleanly, cleavage last because it is the observation most likely to be misread in a small specimen. Note that colour, luster and taste would not have separated any pair here — all four can be colourless and vitreous.
:::
:::

::: exercise Estimating modal proportions from a density {level=3 check="0.93"}
A green rock has a measured density of $3.35\ \mathrm{g\,cm^{-3}}$. It is a mechanical mixture of olivine ($\mathrm{Fo}_{90}$, density $3.40\ \mathrm{g\,cm^{-3}}$) and plagioclase (density $2.70\ \mathrm{g\,cm^{-3}}$). Estimate the volume fraction of olivine, and say what assumption you have made.
::: solution
For a mechanical mixture the densities add by volume fraction, $\rho = \phi \rho_\text{ol} + (1-\phi)\rho_\text{pl}$, so
$$
\phi = \frac{3.35 - 2.70}{3.40 - 2.70} = \frac{0.65}{0.70} = 0.93 .
$$
(Enter the fraction to two decimals: $0.93$; if you instead read the question as asking for the *mass* fraction, the answer is $0.96$.) The assumption is that neither mineral contains the other as inclusions and that the rock has no porosity — both usually false. With $2\%$ porosity the olivine fraction falls to $0.93\times0.98 = 0.91$, which is why density-based modes are quoted to two significant figures at best and why petrologists count minerals under the microscope instead.
:::
:::

::: exercise A quantitative phase-rule problem {level=3}
In the two-component system $\mathrm{MgO}–\mathrm{SiO_2}$, forsterite $\mathrm{Mg_2SiO_4}$ and enstatite $\mathrm{MgSiO_3}$ coexist with liquid. How many degrees of freedom are left? What does that imply for the temperature at which a rock of forsterite plus enstatite begins to melt at a fixed pressure, and how does the answer change if $\mathrm{SiO_2}$ is added as a third component?
::: solution
$C = 2$, $P = 3$ (two solids plus liquid), so $F = 2 - 3 + 2 = 1$. At fixed pressure there are no degrees of freedom left: the assemblage melts at one temperature only, the eutectic, and the liquid has one fixed composition. This is why a rock of fixed mineralogy has a sharp, reproducible solidus, and why the eutectic liquid is the composition most often erupted.

Adding a third component gives $F = 2$ at fixed pressure, so melting occurs over a *range* of temperature with the liquid composition changing continuously along it. Real crustal rocks have ten or more components, which is why they melt over hundreds of degrees and why "the melting temperature of granite" is not a well-posed question without specifying which granite, how much water, and how far along the melting path you mean ([[physical-geology/igneous-rocks]], [[mineralogy-petrology/phase-diagrams]]).
:::
:::
