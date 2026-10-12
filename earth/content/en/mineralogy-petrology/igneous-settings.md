In 1912 Alfred Wegener pointed out that the Atlantic has no land bridge, no sunken continent, and no need for one: the floor of it is moving. It took fifty more years, and the chemistry of basalts, to make the argument quantitative. The proof did not come from the shapes of the continents but from the rocks beneath the oceans — from the discovery that a single rock type, tholeiitic basalt, is being erupted along a continuous 60,000-kilometre line, that its composition is the same everywhere within a few per cent, and that it becomes progressively more altered and more magnetic away from that line. Igneous petrology and plate tectonics are the same subject viewed from opposite ends: one asks where a rock came from, the other asks where the rock that comes from a given place must be.

Every basalt carries its setting in its chemistry, because the setting fixes three things: the pressure at which the mantle melted, whether water was added, and how much of the crust the magma passed through.

## The four kinds of basalt

::: definition The major magma series and their settings {#def-series}
**MORB** (mid-ocean-ridge basalt): tholeiitic, aphyric to olivine-phyric, $49$–$51\ \mathrm{wt}\%$ $\mathrm{SiO_2}$, $7$–$9\ \mathrm{wt}\%$ MgO, light-rare-earth **depleted**, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7026$–$0.7029$, $\varepsilon_\mathrm{Nd} = +8$ to $+10$. Erupted at ridges, from a shallow, dry, previously-depleted mantle.

**Ocean-island basalt (OIB)**: alkali- to tholeiitic-basaltic, enriched in light rare earths by 50–200 times mantle values, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7023$–$0.7055$, $\varepsilon_\mathrm{Nd} = +1$ to $+10$. Erupted at hotspots, from a deep, enriched, plume-sampled mantle.

**Island-arc basalt (IAB)**: tholeiitic to calc-alkalic and shoshonitic, characterised by a **negative niobium anomaly**, enrichment in barium, strontium, potassium and lead, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7032$–$0.7050$ in oceanic arcs and $> 0.7055$ where the crust is thick. Erupted above subducting slabs.

**Continental and continental-margin basalt**: a mixture of all three, plus a crustal component, and correspondingly the most variable and the least diagnostic.
:::

::: example Reading a spider diagram {#ex-spider}
A basalt has, on a mid-ocean-ridge-basalt-normalised plot of incompatible elements ordered from the least incompatible (hafnium, samarium, titanium, the heavy rare earths) to the most incompatible (niobium, tantalum, thorium, uranium, lanthanum, cerium, strontium, barium, rubidium), a smooth upward-sloping pattern from heavy to light rare earths, a factor-of-eight enrichment in barium and thorium relative to MORB, and a sharp trough at niobium and tantalum where the pattern drops by a factor of five below the line drawn between its lanthanum and its thorium. What is the setting?
::: solution
An arc. Each feature carries a specific meaning. The light-rare-earth enrichment and the high barium and thorium say the source was metasomatised, or that a fluid was added during melting. The **niobium–tantalum trough** is the diagnostic one: niobium, tantalum and the light rare earths have almost identical partition behaviour during mantle melting and during fractional crystallisation, so nothing that happens inside the mantle wedge or the magma chamber can pull them apart. Only the slab-derived fluid can: at the high oxygen fugacity of a subduction environment niobium and tantalum are carried as strongly hydrolysed anionic species that are retained on minerals in the slab, whereas barium, strontium, lead and thorium are readily released. The result is a melt with the rare earths but without the niobium: niobium and tantalum are hydrolysed to anionic complexes under the oxidising conditions of a subduction zone and are retained in the slab and in residual rutile, whereas barium, strontium, lead and thorium pass readily into the fluid.

The alternative explanations are worth excluding explicitly. Crustal contamination raises the strontium ratio and the silica but does not create a niobium trough of that shape. Low-degree melting of a garnet-bearing source enriches the light rare earths and leaves the niobium where it belongs. Fractional crystallisation moves nothing that is not compatible. A negative niobium anomaly of that size is, with few exceptions, a subduction indicator.
:::
:::

::: widget plot
f: 25*x^(-0.8); 1.2*x^0.75; 2.0*x^0.95
x: 1, 10
y: 0, 30
labels: \text{MORB, depleted}; \text{OIB, enriched}; \text{arc, fluid-metasomatised}
caption: Schematic incompatible-element patterns, normalised to a mid-ocean-ridge basalt, plotted against an index of increasing incompatibility running from the heavy rare earths at $x = 1$ to the most fluid-mobile elements at $x = 10$. MORB slopes down: it is the residue of previous melting, and its most incompatible elements were taken away. OIB slopes up: it comes from a source that has been enriched by recycled crust. The arc curve is nearly flat at the incompatible end and rises steeply at the fluid-mobile end, which is the shape a slab-derived fluid makes — and the real version of that curve has a notch at niobium that no smooth function can draw.
:::

## Ridges: the largest igneous province on Earth

Mid-ocean ridges produce about $20\ \mathrm{km^3}$ of new crust a year, which is roughly three-quarters of all volcanic activity on the planet, and they do it along a line longer than the equator ten times over. The product is astonishingly uniform: the worldwide average of glassy, aphyric mid-ocean-ridge basalt is $49.9\ \mathrm{wt}\%$ $\mathrm{SiO_2}$, $1.6\ \mathrm{wt}\%$ $\mathrm{TiO_2}$, $14.9\ \mathrm{wt}\%$ $\mathrm{Al_2O_3}$, $10.3\ \mathrm{wt}\%$ $\mathrm{FeO^*}$, $7.9\ \mathrm{wt}\%$ MgO, $11.0\ \mathrm{wt}\%$ CaO, $2.6\ \mathrm{wt}\%$ $\mathrm{Na_2O}$ and $0.6\ \mathrm{wt}\%$ $\mathrm{K_2O}$, with the individual ridge segments departing from that mean by less than half a per cent in every one of those oxides.

::: proposition Ridge melting is adiabatic and its product is set by potential temperature {#prop-ridge}
Because the dry peridotite solidus rises with pressure faster than a rising parcel of mantle cools, an upwelling mantle crosses its own solidus and melts without an external heat source. Writing the solidus as $T_s = T_0 + \beta P$ and the adiabat as $T = \theta_p + \alpha P$, melting begins at
$$
P_\text{onset} = \frac{\theta_p - T_0}{\beta - \alpha},
$$
and the mean excess temperature of the adiabat above the solidus over the melting column is $\tfrac12(\theta_p - T_0)$, so the melt fraction produced is
$$
F \approx \frac{c_p\,(\theta_p - T_0)}{2L},
$$
with $c_p$ the heat capacity and $L$ the latent heat of fusion. The melt fraction, and therefore the thickness of the crust, is a linear function of the potential temperature anomaly and is quite insensitive to everything else.
:::

::: example Ridge thickness and potential temperature {#ex-ridge}
Take the dry peridotite solidus as $T_s = 1200 + 130P\ (^\circ\mathrm{C},\ \mathrm{GPa})$ and the mantle adiabat as $T = \theta_p + 10P$. For $\theta_p = 1300^\circ\mathrm{C}$ and $\theta_p = 1400^\circ\mathrm{C}$, find the pressure at which melting begins and the mean excess temperature over the melting column, and estimate the crustal thickness from the enthalpy available.
::: solution
Melting begins where $\theta_p + 10P = 1200 + 130P$, i.e. $P = (\theta_p - 1200)/120$.
$$
\theta_p = 1300:\ P = 0.83\ \mathrm{GPa},\ \text{excess at surface} = 100\ \mathrm{K},\ \overline{\Delta T} = 50\ \mathrm{K};
$$
$$
\theta_p = 1400:\ P = 1.67\ \mathrm{GPa},\ \text{excess at surface} = 200\ \mathrm{K},\ \overline{\Delta T} = 100\ \mathrm{K}.
$$
With $c_p = 1300\ \mathrm{J\,kg^{-1}\,K^{-1}}$ and $L = 4\times10^{5}\ \mathrm{J\,kg^{-1}}$, the melt fractions are $F = c_p\overline{\Delta T}/L = 0.16$ and $0.33$. The second is twice the first, and the deeper onset of melting reinforces it, so crustal thickness roughly doubles for a $100\ \mathrm{K}$ increase in potential temperature.

That single relation explains the two great observations about oceanic crust. Normal oceanic crust is $6$–$7\ \mathrm{km}$ thick and is produced by the $1300$–$1350^\circ\mathrm{C}$ mantle of the global ridge system. Igneous provinces such as Iceland, the Ontong Java plateau and the Caribbean large igneous province carry $20$–$40\ \mathrm{km}$ of igneous crust and require mantle $200$–$300\ \mathrm{K}$ hotter than normal — which is the quantitative content of the phrase "mantle plume". The linear relation overestimates the melt fraction at such large anomalies, because the solidus curvature and the depletion of the source both bite, but the direction and the order of magnitude are right.
:::
:::

::: quiz
A basalt has light rare earths enriched relative to mid-ocean-ridge basalt, $\varepsilon_\mathrm{Nd} = +9$, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7028$, and **no** niobium anomaly. Which setting is most likely?
- [ ] An island arc, because it is enriched.
- [x] A hotspot or ocean island sampling a depleted, deep mantle reservoir.
- [ ] A mid-ocean ridge, because the strontium ratio is depleted.
- [ ] A continental flood basalt, because it is enriched.
::: solution
Enrichment in the light rare earths rules out a normal ridge, and the absence of a niobium anomaly rules out an arc. A depleted strontium and neodymium signature together with light-rare-earth enrichment is the classic combination of a deep, undepleted-but-not-radiogenic mantle reservoir — a hotspot such as Hawaii or St Helena. Continental flood basalts have the enrichment but carry radiogenic strontium and neodymium from the continental lithosphere they passed through.
:::
:::

::: warning Uniform chemistry does not mean a uniform source
MORB's global uniformity is one of the most misleading facts in geology. It says that the mantle beneath ridges has been melted before, repeatedly, and is now a residue — depleted in the incompatible elements and in fusibility — and that the melting process itself is remarkably insensitive to what is left. It does **not** say the mantle is homogeneous: within a single ridge segment the strontium ratio varies by 0.0005, patches of enriched mantle a few kilometres across erupt alkali basalt, and the ridge passing near a hotspot inherits its chemistry for hundreds of kilometres. The uniformity is an average over a sampling scheme — 15–25 % melting of a refractory residue between about 15 and 60 km depth — that flattens everything it acts on.
:::

## Subduction: the origin of the continental crust

::: definition Slab indicators {#def-slab}
A magma is judged to be slab-influenced by features that no mantle or crustal process produces on its own: a **negative niobium–tantalum anomaly** on a primitive-mantle-normalised plot; high **Ba/La**, above about 20 against a depleted-mantle value near 2.5, because barium is far more fluid-mobile than lanthanum; high **Sr/Y** and low **Y** and **ytterbium**, which record a residue containing garnet; high **Th/La** and **$^{206}\mathrm{Pb}/^{204}\mathrm{Pb}$** where sediment has been added; and, in young arcs, excess **$^{10}\mathrm{Be}$**, a cosmogenic isotope with a 1.4-million-year half-life that can only have come from recently subducted surface material.
:::

::: example Adakite, or melting the slab {#ex-adakite}
A suite of andesitic to dacitic lavas from a young arc in southern Peru has $58\ \mathrm{wt}\%$ $\mathrm{SiO_2}$, $6\ \mathrm{wt}\%$ MgO, $\mathrm{Sr} = 900\ \mathrm{ppm}$, $\mathrm{Y} = 8\ \mathrm{ppm}$ and $\mathrm{Yb} = 0.8\ \mathrm{ppm}$, giving $\mathrm{Sr/Y} = 110$. What does the source assemblage have to be, and what does that say about the slab?
::: solution
The strontium–yttrium ratio is the key. Strontium enters plagioclase, so a residue that has lost its plagioclase leaves strontium in the melt; yttrium and ytterbium are compatible in **garnet**, so a residue that retains garnet strips them out. A melt with $\mathrm{Sr/Y} = 110$ (a normal arc value is 20–40, and MORB is below 2) therefore comes from a source that had **no plagioclase and had garnet** — that is, from eclogite. And the only eclogite available in quantity in a subduction zone is the metamorphosed basalt of the slab itself.

So these lavas are **adakites**, melts of the subducted oceanic crust, and their existence carries two further implications. First, the slab has heated enough at its surface to melt, which requires either a young, hot, therefore buoyant slab or a slab that has stalled and been heated by the surrounding mantle. Second, the melt is in equilibrium with a garnet- and rutile-bearing residue, which is why adakites have very low heavy-rare-earth contents and high strontium, and why they are the type material for the tonalite–trondhjemite–granodiorite suite that makes up most of the Archaean continental crust. The argument that the first continents were made by slab melting rather than by fractional crystallisation rests on exactly this diagram.
:::
:::

The geometry of arcs is as diagnostic as their chemistry. Arc volcanism begins when the slab reaches about $100\ \mathrm{km}$ depth, which is where the dominant hydrous minerals in the altered oceanic crust and the serpentinite of the underlying mantle break down; that fixes the **arc–trench distance at 100–250 km**, scaling with slab dip. Where the slab is steep the arc sits close to the arc front and a back-arc basin may open behind it; where the slab is flat the arc shuts off entirely and volcanism migrates hundreds of kilometres inland, as in the Ancestral Rockies and the present-day Andes at 25° south latitude.

::: example Where is the volcano? {#ex-arc-geometry}
A subduction zone has a trench at the coast and a volcanic front 140 km inland. If the slab dips at $30^\circ$, how deep is it beneath the front, and what happens to the position of the front if the dip shallows to $15^\circ$ while the depth of dehydration is unchanged?
::: solution
The horizontal distance from trench to front is $d = z/\tan\delta$, where $z$ is the depth of dehydration and $\delta$ the dip. With $d = 140\ \mathrm{km}$ and $\delta = 30^\circ$,
$$
z = d\tan\delta = 140\times0.577 = 81\ \mathrm{km}.
$$
If the dip shallows to $15^\circ$ at the same dehydration depth,
$$
d = \frac{81}{\tan15^\circ} = \frac{81}{0.268} = 302\ \mathrm{km}.
$$
The volcanic front migrates 160 km inland. This is the mechanism behind the great ignimbrite flare-ups of the interior of western North America and the modern volcanic gap of the central Andes, and it is why the depth of 80–100 km is one of the most robust numbers in the subject: the geometry of a volcanic arc, mapped from the air, is a direct measurement of the depth at which the slab loses its water.
:::
:::

## Ophiolites: a slice of ocean floor on land

::: definition The ophiolite sequence {#def-ophiolite}
An **ophiolite** is a fragment of oceanic lithosphere emplaced onto continental margin or into a trench, and it preserves the stratigraphy of the ocean floor in vertical section. From the top down: deep-water sediments and manganese crusts; **pillow basalts** and associated hyaloclastite; a **sheeted dyke complex** of parallel, cross-cutting basaltic dykes recording the fissure system of the ridge; **gabbros**, isotropic then layered, with a transition zone of dykes; a **cumulate ultramafic sequence** of wehrlite, pyroxenite and peridotite with chromitite and platinum-group-element seams at its base; and finally **depleted harzburgite or lherzolite**, tectonised at its base into a mylonitic peridotite, below which lies serpentinised mantle and, in a few inliers, fresh mantle peridotite. The Semail ophiolite of Oman and the Troodos ophiolite of Cyprus are the reference sections.
:::

::: example Reconstructing an ophiolite {#ex-ophiolite}
In a mountain belt you map, from structurally lowest to highest: a serpentinised peridotite with podiform chromitite; a layered sequence of olivine gabbro and troctolite with graded layers and cross-stratification; a thick body of parallel dykes, each chilled on both margins and cross-cutting the one below; pillows with manganese crusts and pelagic limestone; and above them a thrust fault placing all of it on red beds. Interpret.
::: solution
This is an ophiolite, emplaced by obduction, and the internal order is exactly the ocean-floor section: abyssal peridotite, cumulate lower crust, sheeted dykes at the fossil ridge axis, pillow lavas and sediment on the surface of the crust. The **chilled margins** and the cross-cutting relation of the dykes are the proof of the spreading mechanism — each dyke was injected into a crack held open by the previous one, and each is therefore younger than the one it cuts. The graded and cross-stratified cumulates record crystal settling in a long-lived magma chamber. The red beds below the thrust are continental-shelf sediment, so the ophiolite was thrust over a passive margin, which means the ocean between the two converging margins had closed.

The tectonic reading follows: a suture, an obsolete ocean, and a collision. Ophiolites are the only place a geologist can walk on oceanic mantle, and every ophiolite is evidence that an ocean has closed.
:::
:::

::: widget plot
f: 85/tan(x*pi/180)
x: 10, 60
y: 100, 600
hlines: 140
vlines: 30
labels: \text{arc--trench distance}
caption: The distance from the trench to the volcanic front predicted by the geometry of [[#ex-arc-geometry]], for a slab that dehydrates at a fixed depth of $85\ \mathrm{km}$, plotted against slab dip in degrees. The horizontal line marks a typical 140-km arc–trench distance and the vertical line the $30^\circ$ dip of a typical circum-Pacific slab. The curve is steep at low dip: shallowing a slab from $30^\circ$ to $15^\circ$ moves the volcanic front 160 km inland, which is enough to switch an arc off entirely and to start ignimbrite flare-ups far inland, as in the Laramide and the modern central Andes. Read the other way, the mapped position of an ancient volcanic front is a measurement of a slab's dip.
:::

::: history
The interpretation of ophiolites was the hinge on which the tectonics of the 1960s turned. Eduard Suess (Suess) had named the Tethyan "ophites" after the serpentinites of the Alps and had explained them as submarine eruptions onto a geosyncline; the modern account came from a 1972 Penrose Conference, where ophiolite was defined as an oceanic-crust and upper-mantle section and the sheeted-dyke complex was recognised as the fingerprint of a spreading centre. Ian Gass's work on Troodos and Robert Coleman's on the Semail established the stratigraphy from land; the confirmation came from the sea, when deep-sea drilling recovered pillow lava over sheeted dykes over gabbro, and when Leg 37 on the East Pacific Rise in 1974 brought up the copper–zinc massive-sulphide deposits that a hydrothermal circulation model had predicted — a prediction handsomely vindicated by the discovery of the black smokers of the Galápagos Rift in 1977 and the hydrothermal mounds of the Mid-Atlantic Ridge in 1985. The geochemical classification of basalts by tectonic setting — the discrimination diagrams of J. A. Pearce and J. Cann in 1973, and Pearce's long programme of using immobile-element ratios to name the source of a basalt of unknown provenance — made the whole approach usable on deformed, altered, ancient rocks, and is the reason a field geologist with a hand lens and a mass spectrometer can now reconstruct an ocean that closed at 1.8 billion years ago.
:::

## Where this leads

The chemistry used here is developed in [[geochemistry/trace-elements]] and [[geochemistry/radiogenic-tracers]]; the melting physics in [[mineralogy-petrology/phase-diagrams]]; the subduction mechanics in [[geophysics/seismic-structure]]; the ore deposits of ridges, arcs and layered intrusions in [[earth-resources/magmatic-hydrothermal]]; and the volcanic hazards of arcs in [[natural-hazards/volcanic-hazards]].

::: summary
- Basalt tells you where it came from: ridges give depleted tholeiite, hotspots give enriched alkali basalt, arcs give calc-alkaline rock with a niobium trough, and continents give mixtures of all three.
- Ridge magmatism is adiabatic decompression, and the thickness of the crust it makes is set almost entirely by the potential temperature of the upwelling.
- Arc magmatism is flux melting by a slab-derived fluid, and its chemistry is dominated by that fluid: barium, strontium, lead and thorium are mobile, niobium and tantalum are not, and the resulting anomaly cannot be faked by any other process.
- High Sr/Y with low ytterbium means a garnet-bearing, plagioclase-free residue, which in a subduction zone means the slab itself is melting.
- The volcanic front sits where the slab reaches 80–100 km, so the arc–trench distance measures slab dip.
- An ophiolite is an ocean-floor section in vertical profile, and its presence on land records the closure of an ocean.
:::

## Exercises

::: exercise Matching {level=1}
Match each description to MORB, OIB or IAB: (a) light-rare-earth depleted, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7028$; (b) $\mathrm{Ba/La} = 60$, $\mathrm{Nb/Nb^*} = 0.2$; (c) $\varepsilon_\mathrm{Nd} = +2$, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7045$, $^{206}\mathrm{Pb}/^{204}\mathrm{Pb} = 20.5$.
::: solution
(a) **MORB** — depleted and unradiogenic strontium. (b) **IAB** — barium over lanthanum and a large niobium trough are both slab-fluid indicators. (c) **OIB** of the HIMU type: radiogenic lead and low neodymium indicate a source containing ancient recycled oceanic crust, and the absence of a niobium anomaly rules out an arc.
:::
:::

::: exercise Crustal thickness {level=1 check="2"}
By roughly what factor does the thickness of oceanic crust increase when the potential temperature of the upwelling mantle rises from $1300$ to $1400^\circ\mathrm{C}$?
::: solution
About a factor of two, from a melt fraction near 0.16 to one near 0.33 (see [[#ex-ridge]]). Both the deeper onset of melting and the larger enthalpy surplus contribute, and they act in the same direction.
:::
:::

::: exercise What is not a slab indicator {level=1 check="Nb"}
Which element, symbol Nb, gives the diagnostic negative anomaly in arc basalts, and why can neither fractional crystallisation nor partial melting produce that anomaly?
::: solution
Because niobium, tantalum, lanthanum and the light rare earths have essentially identical bulk distribution coefficients in every anhydrous mantle and crustal mineral assemblage: they are all large, highly charged, incompatible cations, and they behave as a single group in every melting and crystallisation process. To pull niobium down by a factor of five relative to its neighbours requires a process that distinguishes them chemically — and the only one available in nature is the hydrolysis and differential retention of niobium and tantalum in a fluid at high oxygen fugacity.
:::
:::

::: exercise Garnet and strontium {level=2}
Explain why a high-pressure melt from a garnet-bearing source has low heavy-rare-earth and low yttrium contents, and why that makes Sr/Y a barometer.
::: solution
Garnet's structure takes the heavy rare earths and yttrium readily into its dodecahedral site, and the compatibility increases monotonically from lanthanum to lutetium, so a garnet-bearing residue produces a melt depleted in the heavy rare earths and enriched in the light ones relative to it. Yttrium behaves like holmium and erbium. Strontium, being divalent and large, is incompatible in garnet and stays in the melt. As pressure rises and plagioclase disappears into garnet, therefore, Sr/Y rises steeply — and a melt with Sr/Y above 40 has almost certainly come from a source at 25–30 kbar or deeper, or from a very wet one where plagioclase is unstable at lower pressure.
:::
:::

::: exercise Arc geometry {level=2 check="204"}
A slab dips at $25^\circ$ and dehydration occurs at 95 km. How far inland is the volcanic front?
::: solution
$d = z/\tan\delta = 95/\tan25^\circ = 95/0.466 = 204\ \mathrm{km}$. The observed range for arcs is 100–250 km, and the calculation reproduces it — which is the strongest single piece of evidence that arc position really does record the depth of slab dehydration rather than the geometry of the crust above.
:::
:::

::: exercise Boninite {level=2}
Boninites are high-silica ($53$–$57\ \mathrm{wt}\%$ $\mathrm{SiO_2}$), high-magnesia ($8$–$12\ \mathrm{wt}\%$ MgO), very low-titania ($< 0.5\ \mathrm{wt}\%$ $\mathrm{TiO_2}$) and very high-chromia ($> 1500\ \mathrm{ppm}$ Cr) lavas found only in the forearc, and only in the oldest part of it. What do they require, and what do they imply about the beginning of subduction?
::: solution
They require a mantle that has already been melted — a refractory harzburgite — being melted again, in the presence of a large flux of slab-derived fluid, at pressures where the residue retains orthopyroxene. The low titanium and high magnesium say the source was depleted by an earlier, larger melting event; the high silica says the residue was hot and the melt was wet. Because they occur at the base of the forearc sequence, they record the **first magmatic activity of a new subduction zone**, before the slab had cooled the wedge. They are therefore the diagnostic rock of subduction initiation, and they are found — with the associated high-magnesian andesites — at the base of nearly every young island arc, including the Izu–Bonin and Mariana systems.
:::
:::

::: exercise Komatiite {level=2}
Komatiites contain 18–35 wt% MgO and are almost entirely confined to rocks older than 2.5 billion years. What does that require of the mantle, and why do they stop?
::: solution
They require melting of the mantle to 40–60 %, producing a liquid in equilibrium with $\mathrm{Fo}_{93}$–$\mathrm{Fo}_{96}$ olivine at eruption temperatures of $1600$–$1900^\circ\mathrm{C}$, some $200$–$400\ \mathrm{K}$ hotter than any basalt erupting today. That requires a mantle with a potential temperature far above the present value, which follows from a higher heat production in the Archaean from the decay of potassium-40, uranium and thorium, and from a more efficient, more vigorous mode of convection. Komatiites become rare and then absent as the mantle cooled through the Palaeoproterozoic; the disappearance of the rock is a direct, petrological measurement of the Earth's secular cooling, and it is one of the few constraints on that cooling that does not depend on a model.
:::
:::

::: exercise A controversial basalt {level=3}
A 2.7-billion-year-old basalt from a greenstone belt has $\mathrm{Nb/Nb^*} = 0.3$, $\mathrm{Ba/La} = 55$, $\varepsilon_\mathrm{Nd} = +4$, $^{87}\mathrm{Sr}/^{86}\mathrm{Sr} = 0.7050$ (uncorrected) and light rare earths enriched thirty times relative to chondrite. A colleague argues this proves plate tectonics in the Archaean. What are the two strongest objections, and what observation would settle them?
::: solution
**Objection one: alteration.** Greenstone-belt basalts are greenschist-facies rocks, and barium, strontium, rubidium and the light rare earths are all mobile during low-grade metamorphism and seawater alteration. A barium–lanthanum ratio of 55 and a strontium ratio of 0.7050 could both be products of metasomatism, and the uncorrected strontium ratio is worthless in a rock of this age. Only elements that are demonstrably immobile in greenschist-facies conditions — niobium, tantalum, the high-field-strength rare earths, titanium, zirconium, hafnium — can be used, and the strontium isotope system must be replaced by samarium–neodymium.

**Objection two: the niobium trough is not unique.** A negative niobium anomaly can also be produced by retention of rutile or amphibole in a residual source during low-degree melting, by assimilation of old continental lithosphere, or by extreme fractional crystallisation of an iron-rich liquid.

The observation that settles it is the **association**, not the chemistry: a calc-alkalic differentiation series with high-magnesian andesite and adakite, boninites at the base of the sequence, a paired high-pressure (eclogite, blueschist) terrain, and a sedimentary record of rapid uplift and recycling. Arc chemistry in a single sample is suggestive; an entire convergent-margin system, with its metamorphic paired belts and its forearc clastic wedge, is evidence. This is why the debate about when plate tectonics began has run for forty years and will only be settled by mapping, not by mass spectrometry.
:::
:::

::: exercise The mass of an ocean {level=3}
Mid-ocean ridges produce about $20\ \mathrm{km^3}$ of new oceanic crust per year, and oceanic crust is $7\ \mathrm{km}$ thick. Estimate the rate of seafloor creation in square kilometres per year, the area of the ocean floor, and the mean age of the ocean floor. What does the last number imply for the sediment record?
::: solution
The area created per year is the volume divided by the thickness, $20/6 = 3.3\ \mathrm{km^2\,yr^{-1}}$. The ocean basins cover about $3.6\times10^{8}\ \mathrm{km^2}$, so the residence time of oceanic crust is
$$
\tau = \frac{3.6\times10^{8}}{3.3} = 1.1\times10^{8}\ \mathrm{yr} = 110\ \mathrm{Myr}.
$$
The observed mean age of the present ocean floor is about 64 Myr rather than 110, because crustal production was roughly twice as fast in the Cretaceous as it is today and the seafloor being created now is a smaller fraction of the total than the steady-state value. The consequence is that the oldest marine sediment ever recovered is about 180 million years old, and that everything known about the chemistry, temperature and circulation of the ocean before the Jurassic must be inferred from continental-margin sediments, from isotopes in carbonates and from the fossils of organisms that lived in the sea but were preserved on land. The ocean keeps no memory of its own deep past; the continents keep it for the ocean.
:::
:::
