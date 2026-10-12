Continents do not break easily, and when they do they leave a structure so characteristic that it can be recognised on a gravity map a hundred million years after the fact. A rift is a zone of crustal extension bounded by normal faults, and it is the site of about a tenth of the Earth's sedimentary basins, most of its offshore hydrocarbons, and every passive continental margin on the planet. The physics is simple — stretch the crust, let it subside, let it cool — and the complications are all in the geometry of how the crust says no.

## The geometry of extension

::: definition Rift architecture {#def-rift}
A **half-graben** is a fault-bounded basin tilted by a single border fault; a **graben** is bounded by two inward-facing faults; a **horst** is the intervening uplifted block. A **detachment fault** is a long, low-angle normal fault along which kilometres of crust have been translated, and a **metamorphic core complex** is the domed culmination of such a fault, over which the upper plate has been removed to expose mid-crustal mylonites and gneisses against their cover. A **transfer zone** or **accommodation zone** links two overlapping fault segments and takes up the strain between them. A **rift** is a zone of active extension; an **aulacogen** is a failed rift arm; a **passive margin** is what a rift becomes when it succeeds and seafloor spreading takes over.
:::

::: definition Extension factor and thinning {#def-beta}
The **extension factor** is the ratio of stretched to unstretched length in the direction of extension,
$$
\beta = \frac{L_1}{L_0} = \frac{h_0}{h_1},
$$
where $h_0$ and $h_1$ are the pre- and post-rift thicknesses of the thinned column. A $\beta$ of 1 means no extension, 2 means the crust has been halved, and 100 means it has been stretched to a hundredth. The areal extension $e$ is related to $\beta$ by $\beta = 1/(1-e)$, so 50 per cent extension is $\beta = 2$.
:::

::: proposition Subsidence by crustal thinning {#prop-subsidence}
Extend a column of crust of initial thickness $h_{c0}$ and initial elevation zero, and let water fill the resulting depression. By Airy isostasy the depth to the seafloor is
$$
d = \frac{(\rho_m - \rho_c)}{(\rho_m - \rho_w)}\,\frac{h_{c0}}{\beta}\,(\beta - 1) .
$$
Thermal subsidence from the upwelling of hot asthenosphere beneath the thinned column adds a further amount of the same order, so the total syn-rift and early post-rift subsidence is commonly two to three times the crustal-thinning term alone.
:::

::: proof
Balance two columns to a compensation depth beneath the base of the crust. The reference column is crust of thickness $h_{c0}$ standing to sea level. The extended column has crust of thickness $h_c = h_{c0}/\beta$, water of depth $d$ above it, and — because the compensation depth is fixed — mantle filling the remaining space. Equality of mass per unit area gives
$$
\rho_c h_{c0} = \rho_c h_c + \rho_w d + \rho_m(h_{c0} - h_c - d).
$$
Collecting terms, $(\rho_m - \rho_c)(h_{c0} - h_c) = (\rho_m - \rho_w)d$, and substituting $h_c = h_{c0}/\beta$ gives the result. The thermal term comes from the density contrast between the upwelled asthenosphere and the mantle it replaces, and because hot mantle is both lighter and thicker than the column it displaces, it must be integrated over the temperature field rather than treated as a layer.
:::

::: example How deep does a rift sink? {#ex-subsidence}
Take $h_{c0} = 35\ \mathrm{km}$, $\rho_c = 2700$, $\rho_m = 3300$ and $\rho_w = 1030\ \mathrm{kg\,m^{-3}}$. Find the water depth produced by $\beta = 1.5$, $2$ and $3$ from crustal thinning alone, and compare with the observed depth of the North Sea and the Red Sea.
::: solution
With $(\rho_m - \rho_c)/(\rho_m - \rho_w) = 600/2270 = 0.264$ and $h_{c0} = 35\ \mathrm{km}$,
$$
d = 0.264\times\frac{35(\beta-1)}{\beta}\ \mathrm{km},
$$
so
$$
\beta = 1.5:\ d = 0.264\times11.7 = 3.1\ \mathrm{km}; \qquad
\beta = 2:\ d = 0.264\times17.5 = 4.6\ \mathrm{km}; \qquad
\beta = 3:\ d = 0.264\times23.3 = 6.2\ \mathrm{km}.
$$
The Red Sea, where $\beta$ is close to one and the crust is only slightly thinned, has a 1-km-deep axial trough in 500 m of water — roughly the crustal-thinning term plus a large thermal contribution from the shallow magma beneath it. The North Sea, with $\beta$ of 1.5–2 in its southern basins, subsided to 3–5 km, which is the crustal term plus the thermal term. The agreement is good enough that the two-term model is still the starting point of every basin analysis, and the discrepancy — usually the model under-predicts the total subsidence — is the reason basin modellers add a "exaltment" or "magma loading" term.

The most useful consequence is the inverse: measure the present crustal thickness beneath a rift from its heat flow or from refraction seismology, and the $\beta$ and therefore the extension follow immediately. This is how the extension across the Basin and Range, the Aegean and the North Sea has been quantified, and it is why the Aegean, with a crust only 15 km thick, is recognised as one of the most extended regions on Earth.
:::
:::

::: example Reading a half-graben from the well data {#ex-halfgraben}
In a half-graben a single border fault dips $50^\circ$ at the surface. Three wells lie on a line perpendicular to the fault strike: well 1 on the footwall at 400 m elevation, with the base of the syn-rift series at 900 m below surface; well 2 in the hanging wall at 350 m elevation, with the base of the syn-rift at 1650 m below surface; well 3, a further 6 km hanging-wall-ward, at 300 m elevation with the base of the syn-rift at 1900 m below surface. The base of the syn-rift is flat and undeformed. Find the depth to that horizon below each well, the dip of the fault implied between wells 1 and 2 if they are 5 km apart, and the extension if the fault flattens at 10 km.
::: solution
Depths to the base of the syn-rift, measured below sea level, are
$$
400 + 900 = 1300\ \mathrm{m}\ (\text{well 1}), \quad
350 + 1650 = 2000\ \mathrm{m}\ (\text{well 2}), \quad
300 + 1900 = 2200\ \mathrm{m}\ (\text{well 3}).
$$
The horizon is flat, so the whole 700-m step between wells 1 and 2 is fault separation, and the 200 m between wells 2 and 3 is either a second, smaller fault or the roll-over of a listric surface.

Between wells 1 and 2, 5 km apart, the fault must carry 700 m of separation. If the fault were planar at its surface dip of $50^\circ$, the horizontal distance from well 1 to the fault and from the fault to well 2 would put the fault somewhere between them, and the fault's depth at well 2 would be
$$
z = \frac{700}{\tan50^\circ} = \frac{700}{1.192} = 587\ \mathrm{m}
$$
below the horizon — that is, at about 1.9 km depth. A fault that carries 700 m of separation at 1.9 km depth and dips $50^\circ$ is entirely ordinary.

If instead the fault flattens onto a detachment at 10 km, its mean dip between the surface and that depth is far lower than $50^\circ$, and the heave required to produce 700 m of separation at a mean dip of $25^\circ$ is $700/\tan25^\circ = 1500\ \mathrm{m}$ rather than 587 m. The difference — 900 m of unaccounted horizontal distance between the two wells — is the observable signature of listric geometry, and it is why a cross-section built from a surface dip and a set of well ties will not balance unless the curvature of the fault is allowed for. The 200 m of additional down-dip step between wells 2 and 3 is consistent with a roll-over anticline above the flattening fault, which is exactly what such a geometry predicts and what a seismic line across the field will show.
:::
:::

::: widget plot
f: 0.264*35*(x-1)/x
x: 1, 6
y: 0, 8
hlines: 4.6
vlines: 2
labels: \text{water depth}
caption: The water depth produced by crustal thinning alone, for a 35-km-thick crust and the densities of [[#ex-subsidence]], plotted against the extension factor $\beta$. The curve saturates towards 9.2 km as $\beta$ becomes large, because the crustal-thinning term is bounded: no amount of stretching can remove more than the whole crust. The horizontal line marks the 4.6 km produced by $\beta = 2$, and the vertical line that value of $\beta$. Real rifts subside deeper than this curve because the upwelling asthenosphere adds its own contribution, and where $\beta$ exceeds about 3 the model fails altogether, because the crust has been removed and the mantle is exposed at the seafloor, as at Iberia and Newfoundland.
:::

::: history
The idea that continents extend rather than contract is older than plate tectonics. Clarence Dutton (Dutton) read the Basin and Range as the product of horizontal extension in 1880, describing the "flexed and faulted blocks" of the Colorado region with a geometric clarity that was simply ignored for eighty years, and Eduard Suess described the East African Rift as a failed arm of a three-part system. The modern study begins with the seafloor-spreading synthesis of the 1960s, which made extension a first-principles process rather than a local oddity, and with Dan McKenzie's (McKenzie) 1978 paper on the extension of the lithosphere, which reduced the whole of basin formation to two numbers — the extension factor and the amount of instantaneous thinning — and gave the square-root-of-age subsidence law that still underpins every basin-modelling package. The geometry was settled by the field work of the 1970s and 1980s: the recognition of metamorphic core complexes in the North American Cordillera by Armstrong and by Coney and Critchfield, the low-angle detachments of the Whipple Mountains described by Davis, Lister and Frost and of the Snake Range described by Miller and by Armstrong, and the synthesis of Wernicke and Burchfiel (Burchfiel) of 1982 on extensional tectonics and gravity-driven faulting. The discovery, from deep-sea drilling and from the Ocean Drilling Program's legs 39, 48, 81 and 103, that many margins are non-volcanic and expose subcontinental mantle on the seafloor — first reported from the Iberian margin and the Atlantic margin of Newfoundland — overturned the assumption that break-up is always accompanied by flood basalts, and it is still producing new structural styles, of which the "core-complex" margins of the West Iberian rift are the most striking.
:::

## The depth paradox

::: warning Normal faults do not go deep enough
The central puzzle of extensional tectonics is arithmetic. The Basin and Range has been extended by a factor of two or more over a region 1000 km wide, and the extension is evidently taken up by normal faults that dip at $50^\circ$–$60^\circ$ at the surface. If those faults continued as planar surfaces to the base of the crust at 15 km, the slip required to produce the observed extension would be so large that the hanging wall would be left floating in mid-air: the faults would have to intersect at implausibly shallow depths, and the blocks between them would rotate through angles that are not observed. This is the **depth problem** of the Basin and Range, and it was stated explicitly by Wernicke and Burchfiel in 1982.

Four resolutions are available and all four operate. Faults **listric**: they flatten with depth and merge into a low-angle detachment at 10–15 km, so the dip at the surface is not representative. Strain is **distributed** over many more faults than are mapped, including faults with no surface expression. Some of the extension is **ductile**, taken up by the lower crust flowing rather than by the upper crust faulting, and is therefore invisible at the surface. And in the most extended regions the low-angle faults **are** the structures: the metamorphic core complexes of the Aegean, the Idaho–Montana belt and the British Cordillera carry tens of kilometres of displacement on surfaces that dip at $20^\circ$–$30^\circ$ and were active at depths of 10–20 km, and the steep faults above them are the gravity-driven response to the removal of the cover. The last resolution requires that a low-angle normal fault can slip, which friction forbids under a vertical $\sigma_1$ unless the pore pressure is extreme or the fault is temporarily oversteepened by the geometry of the system — a problem that is not fully closed and that is one of the most productive arguments in the subject.
:::

::: example How much extension from fault heaves? {#ex-heave}
A 220-km-wide transect across an extensional province crosses fourteen normal faults whose heaves, measured in map view perpendicular to their strikes, are 2.1, 1.8, 3.4, 1.2, 2.6, 4.0, 1.5, 2.2, 3.1, 1.9, 2.4, 1.1, 2.8 and 1.6 km. The faults strike parallel to the transect's shortening direction and dip $55^\circ$. Find the total shortening, the extension factor, and the depth to the horizontal detachment implied if the faults are listric and merge into a flat.
::: solution
The sum of the heaves is $31.7\ \mathrm{km}$, so the transect has been shortened from $220 + 31.7 = 251.7\ \mathrm{km}$ to 220 km, and
$$
\beta = \frac{251.7}{220} = 1.14, \qquad e = 11.5\ \% .
$$
If each fault were **planar** at $55^\circ$ and cut down to a single horizontal detachment at depth $z$, its heave would be $H = z/\tan\delta$, so the depth required by each fault is
$$
z_i = H_i\tan\delta = 1.428\,H_i,
$$
which ranges from $1.1\times1.428 = 1.6\ \mathrm{km}$ for the smallest fault to $4.0\times1.428 = 5.7\ \mathrm{km}$ for the largest. The faults would therefore have to flatten at fourteen different depths between 1.6 and 5.7 km.

Geophysical and field evidence puts the principal detachment of most extensional provinces at 10–15 km, well below all fourteen values, so the planar assumption fails and the faults must be **listric**: their dip decreases with depth, and a fault that meets the surface at $55^\circ$ is flattening through $40^\circ$, $30^\circ$ and $20^\circ$ on its way down, taking up its heave over a much greater depth range than a planar fault of the same surface dip. That is the resolution of the depth paradox for the upper crust, and it is directly observable in the mine and quarry data of the western United States. What the listric geometry does not do is remove the need for a deep detachment, and below about 12 km the extension must be taken up by ductile flow in the lower crust — which is why the geometry of extensional provinces is not one listric surface but a hierarchy of fault sets above a flowing substrate.
:::
:::

::: quiz
A rift basin's post-rift thermal subsidence is observed to follow a square-root-of-time curve for 80 million years and then to slow. What does the curve measure?
- [x] The cooling and thickening of the lithosphere by half-space conduction.
- [ ] The compaction of the sediment pile.
- [ ] The flexural response to the sediment load.
- [ ] Eustatic sea-level change.
::: solution
Thermal subsidence after instantaneous extension follows the cooling of a half-space, in which the depth of the thermal anomaly grows as $\sqrt{\kappa t}$ and the subsidence therefore does too. It slows when the thermal anomaly has conducted away or when the lithosphere has a finite thickness, which is why the simple half-space model over-predicts subsidence at ages beyond about 80–100 Ma and why the "plate model" with a fixed asthenospheric temperature is used instead. Compaction, loading and eustasy all affect the observed thicknesses, which is why they are removed by backstripping before the subsidence curve is fitted.
:::
:::

## From rift to margin

::: definition The life of a rift {#def-rift-stages}
A successful rift passes through recognisable stages. **Syn-rift**: fault-controlled subsidence, high heat flow, alkaline and tholeiitic volcanism, and coarse alluvial and lacustrine sediment shed into the half-grabens. **Post-rift thermal sag**: faulting wanes, subsidence becomes regional and exponential as the lithosphere cools, and shallow marine sediment onlaps across the fault blocks. **Break-up**: a transition from continental to oceanic magmatism, marked on volcanic margins by flood basalts and seaward-dipping reflectors and on non-volcanic margins by exhumed subcontinental mantle. **Drift**: seafloor spreading, and the formation of a passive margin whose subsidence follows the square-root-of-age law of cooling lithosphere for the next hundred million years.
:::

::: example Volcanic or non-volcanic? {#ex-margin-type}
A passive margin shows, seaward from the continent: thinned continental crust with 20-km-wide fault blocks; a 15-km-thick seaward-dipping reflector sequence; a narrow band of high-amplitude, high-velocity reflections interpreted as underplated material; and then normal oceanic crust with magnetic anomalies. A second margin shows continental crust, then a 30-km-wide zone of highly faulted crust with exhumed mantle peridotite at the seafloor, then oceanic crust, with no volcanic sequence at all. Classify and compare the two.
::: solution
The first is a **volcanic (magma-rich) passive margin** of the type of Namibia, Brazil, East Greenland and the Deccan: the upwelling mantle was hot, decompression melting was voluminous, and the transition to oceanic crust was made by magmatism. The seaward-dipping reflector sequence is a pile of flood basalts erupted as the continent broke and onlapping seaward as the subsidence outpaced the supply; the high-velocity reflections are the underplated mafic material at the base of the thinned crust.

The second is a **non-volcanic (magma-poor) margin** of the type of Iberia, Newfoundland and the western Black Sea: the mantle was cool or the extension was fast, magmatism was minimal, and the extension was taken up by detachment faults that exhumed subcontinental mantle directly onto the seafloor. The 30-km-wide zone of exhumed peridotite is the diagnostic feature, and it means that in that zone the crust has been entirely removed — a $\beta$ that is effectively infinite.

The two types differ in everything that matters for hydrocarbons and for hazard. Volcanic margins have a thick, often impermeable, volcanic seal that makes good traps and terrible seismic imaging, and their source rocks are buried by the volcanic pile. Magma-poor margins have excellent imaging, complex sub-seafloor detachment topography that makes structural traps, and a mantle that hydrates and serpentinises to produce hydrogen and the methane that goes with it. Both are productive; the exploration strategy for the two is entirely different, and the first thing a basin analyst does is decide which one is on the seismic.
:::
:::

## Where this leads

The faults that build a rift are described in [[structural-geology/fractures-faults]]; the shear zones that form at depth beneath a detachment are in [[structural-geology/shear-zones]]; the isostasy that governs the subsidence is in [[geophysics/gravity-isostasy]]; the flexure of the lithosphere around a rift is in [[geophysics/flexure]]; and the sedimentary systems that fill the basins are in [[sedimentology/basins-sequences]].

::: summary
- A rift is a zone of crustal extension bounded by normal faults, and it is the ancestor of every passive margin.
- The extension factor $\beta$ relates stretched to unstretched length and, by thickness, gives the crustal thinning.
- Crustal thinning alone subsides a rift to a few kilometres, and the thermal contribution of the upwelling asthenosphere roughly doubles it.
- Steep normal faults observed at the surface cannot account for the observed extension by themselves; the missing strain is in listric geometry, in unmapped faults, in ductile flow, and in low-angle detachments.
- A rift passes through syn-rift faulting, post-rift thermal sag, break-up and drift, and each stage leaves a distinct stratigraphy.
- Volcanic and non-volcanic passive margins differ in the amount of magmatism at break-up and in everything that follows for exploration.
:::

## Exercises

::: exercise Extension factor {level=1 check="1.67"}
A rift has undergone 40 per cent extension. What is $\beta$?
::: solution
$\beta = 1/(1 - 0.40) = 1.67$. The crust is two-thirds of its original thickness.
:::
:::

::: exercise Crustal thickness {level=1 check="21"}
If $\beta = 1.7$ beneath a region whose pre-rift crust was 35 km thick, what is the crustal thickness now, in km?
::: solution
$h = 35/1.7 = 20.6\ \mathrm{km}$, about 21 km. This is the standard way of mapping extension from a crustal-thickness model derived from gravity or from seismic refraction.
:::
:::

::: exercise Graben faulting {level=1}
Distinguish a graben from a half-graben in seismic data, and say which is more common in the early stages of a rift.
::: solution
A **graben** is bounded by two inward-dipping border faults, both active, and its fill is symmetric about the axis. A **half-graben** is bounded by one dominant fault, with the opposing side rotating gently on a series of smaller antithetic faults, and its fill thickens towards the border fault. Half-grabens are much more common in the early stages of a rift, because a single fault localises the strain before the system has developed the maturity to distribute it; symmetric grabens tend to appear later, or where the extension direction has changed.
:::
:::

::: exercise Subsidence {level=2 check="6.9"}
Using the model of [[#ex-subsidence]], find the water depth produced by $\beta = 4$ from crustal thinning alone, in km.
::: solution
$d = 0.264\times35\times(4-1)/4 = 0.264\times26.25 = 6.9\ \mathrm{km}$. Note how little the depth increases beyond $\beta \approx 3$: the crustal-thinning term saturates, and any further subsidence must come from the mantle, from magmatism, or from the sediment load.
:::
:::

::: exercise Core complexes {level=2}
A metamorphic core complex exposes garnet–mica schist beneath a mylonitic gneiss, which is in turn overlain unconformably by non-foliated Cretaceous conglomerate. The mylonites show top-to-the-west shear and the overlying conglomerate contains clasts of the schist. Reconstruct the history.
::: solution
The schist and the gneiss are mid-crustal rocks exhumed by a low-angle normal fault — the detachment — whose mylonitic hanging-wall gneiss records top-to-the-west translation of the cover away from the core. The unconformity beneath the conglomerate is the **detachment fault itself, or its erosion surface**, and the conglomerate is syn-tectonic fill shed from the rising core. Because the conglomerate contains clasts of the schist, the schist had already been exhumed to the surface before the conglomerate was deposited, so the detachment had taken up most of its displacement by the Cretaceous.

The test of the interpretation is whether the mylonite fabric is gradational into the breccia along the fault plane, whether the conglomerate thickens into the hanging-wall depression, and whether a radiometric age on the mylonite's syn-tectonic feldspar matches the base of the conglomerate. Where all three agree, the core complex dates the extension, and the timing can be tied to the plate-tectonic reconstruction.
:::
:::

::: exercise Heat flow {level=2 check="110"}
Beneath a rift with $\beta = 2$, the crustal radiogenic component of the surface heat flow falls from a background of $60$ to $30\ \mathrm{mW\,m^{-2}}$ as the crust thins, while the mantle component rises from $40$ to $80\ \mathrm{mW\,m^{-2}}$ as hot asthenosphere approaches the surface. What is the total surface heat flow, in $\mathrm{mW\,m^{-2}}$?
::: solution
$q = 30 + 80 = 110\ \mathrm{mW\,m^{-2}}$, against a background of $100$. The point of the exercise is that the heat-flow anomaly of a rift is much smaller than the change in either component, because the crustal and mantle contributions move in opposite directions — which is why heat flow is a poor discriminator of $\beta$ and why the shape of the subsidence curve, not the heat flow, is the diagnostic observation.
:::
:::

::: exercise Fault population {level=3}
A rift's border faults have a mean spacing of 8 km and dip $55^\circ$, and the seismogenic layer is 12 km thick. Estimate the extension taken up by faults that break the surface if each fault's maximum displacement is 7 per cent of its length, and say what fraction of a total extension of $\beta = 1.8$ this accounts for.
::: solution
A fault that dips $55^\circ$ and cuts a 12-km-thick seismogenic layer has a down-dip length of $12/\sin55^\circ = 14.6\ \mathrm{km}$ and a surface trace of at least $12/\tan55^\circ = 8.4\ \mathrm{km}$; taking a fault length of 20 km as typical for a border fault of this spacing, the maximum displacement is $0.07\times20 = 1.4\ \mathrm{km}$, of which the heave is $1.4\cos55^\circ = 0.80\ \mathrm{km}$.

With a spacing of 8 km, one such fault occurs for every 8 km of transect, so the extension is $0.80/8 = 0.10$, or ten per cent, giving $\beta = 1.11$. The required extension is $\beta = 1.8$, so the mapped faults account for
$$
\frac{1.11 - 1}{1.8 - 1} = \frac{0.11}{0.80} = 14\ \% 
$$
of it. Seven-eighths of the extension is missing, and the candidates are the same four as always: faults below the resolution of mapping, ductile flow in the lower crust, large displacements on low-angle detachments that do not repeat at the surface, and rotation of the blocks so that the extension is partly taken up without new faulting. The calculation is worth doing in every rift, because the size of the discrepancy is itself a measurement — of how much of the strain is invisible.
:::
:::

::: exercise Margin evolution {level=3}
A well on a passive margin penetrates, from the top: 400 m of Holocene shelf sands; 1.2 km of marine shales with foraminifera of progressively younger age from 90 to 20 Ma; a 300-m coal and deltaic sand unit; 800 m of non-marine red beds and lacustrine shales; and then faulted granite. The base of the marine shales is at 1.6 km and the base of the red beds at 2.7 km. Reconstruct the margin's history and estimate the extension factor from the subsidence.
::: solution
The sequence is a textbook passive margin, in reverse order of events. The faulted granite is the rift basement. The 800 m of non-marine red beds and lacustrine shales are the **syn-rift** fill of a half-graben, deposited in fault-bounded lakes. The 300 m of coal and deltaic sand is the **break-up** sequence, deposited as the subsidence outpaced the sediment supply and the sea came in across the inverted topography. The 1.2 km of marine shale is the **post-rift thermal sag and drift** sequence, and its progressively younger ages from 90 to 20 Ma record the continuous subsidence of the cooling lithosphere. The Holocene sands are the present shelf.

For the extension, the syn-rift thickness of 800 m plus the break-up thickness of 300 m gives about 1.1 km of fault-controlled subsidence, and the water depth at break-up was shallow, so the crustal-thinning term is of order 1.1 km. Inverting $d = 0.264\times35(\beta-1)/\beta$ with $d = 1.1$ gives $(\beta-1)/\beta = 0.119$, so $\beta = 1.14$. Adding the thermal contribution, which is comparable in magnitude, roughly doubles the term and gives $\beta \approx 1.3$.

That is a modest extension, and it is the kind of number that comes out of a single well and is wrong by a factor of two. The proper estimate uses the whole post-rift subsidence curve, backstripped for sediment load and eustasy, and fitted to the cooling-lithosphere model; the $\beta$ from the fit is generally larger than the one from the syn-rift thickness alone, because a good deal of the thinning happens without any faulting at all.
:::
:::
