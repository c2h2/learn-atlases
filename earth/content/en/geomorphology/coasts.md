The coast is the shortest path in the sediment routing system and the most energetic: a tenth of the world's population lives within ten metres of sea level and within a few kilometres of a shore that is moving, in most places landward, at between a fraction of a metre and several metres a year. Waves do the work, and waves are a solar-energy machine with an efficiency set by the wind field, so the coast is a **power-limited** landscape in a way that a river valley is not.

## Waves and their energy

::: definition Waves, wave base and shoaling {#def-waves}
A wind sea of period $T$ has a deep-water wavelength
$$
L_0 = \frac{gT^2}{2\pi} = 1.56\,T^2 \quad \text{metres},
$$
and its orbital motion decays exponentially with depth, so that at the **wave base**, $d = L_0/2$, the water moves at only 4 per cent of its surface value. **Wave base is therefore the lower limit of wave-driven erosion and of wave-formed sedimentary structures**, and it is why a storm bed's grain size and its sedimentary structures give the water depth to within a factor of two. As a wave enters water shallower than $L_0/2$ it **shoals**: its speed and wavelength decrease, its period is conserved, its height grows, and its crest steepens until it breaks at a depth of about $H/d \approx 0.78$ on a gently sloping beach. Because the wave's **crests bend toward the shallows** — the inshore end of a crest travels more slowly than the offshore end — waves **refract** to become nearly parallel to the depth contours and therefore to the shore, and this refraction concentrates energy on **headlands** and disperses it in **bays**, which is the reason that a discordant coastline evolves into an embayed one.
:::

::: definition Wave power and longshore drift {#def-wave-power}
The energy of a wave, per unit crest length, is $E = \rho_w g H^2/8$, and the **wave power** — the energy crossing a line of unit length parallel to the crest — is that energy multiplied by the group velocity:
$$
P = \frac{\rho_w g^2}{64\pi} H^2 T \approx 0.5\,H^2 T \quad \mathrm{kW\,m^{-1}},
$$
with $H$ in metres and $T$ in seconds. A 2-m, 8-s swell carries 16 kW per metre of crest, and a 5-m storm wave carries 120 kW per metre — the power of a small power station, applied continuously to a cliff face. Because refraction makes waves approach nearly parallel, the alongshore component of the orbital motion survives the breaking and drives the **longshore current**, which carries the **longshore sediment transport**
$$
Q_l = C\,H_b^{5/2}\sin\theta_b\cos\theta_b ,
$$
with $C \approx 1.4\times10^{-3}\ \mathrm{m^{-1/2}}$ in the Komar–Inman (Inman) form, $H_b$ the breaker height and $\theta_b$ the breaker angle. The **$H^{5/2}$ dependence** is the most important number in coastal geomorphology: doubling the breaker height multiplies the longshore transport by **5.7**, so a coast's sediment budget is dominated by its few largest storms, and a coast's response to a warming, stormier climate is a strongly nonlinear function of the wave climate.
:::

::: example The power of a shore {#ex-wave-power}
Find the wave power of (a) a 1.5-m, 7-s swell, (b) a 3-m, 10-s storm sea, and (c) a 6-m, 12-s extreme storm. Then find the longshore transport for case (b) with a breaker angle of $35^\circ$, and say what fraction of the annual transport case (c) supplies if it lasts 12 hours and case (b) occurs 20 days a year.
::: solution
$$
P = \frac{1025\times9.81^2}{64\pi}H^2T = 491\,H^2T \quad \mathrm{W\,m^{-1}},
$$
giving $P_a = 491\times2.25\times7 = 7.7\ \mathrm{kW\,m^{-1}}$, $P_b = 491\times9\times10 = 44\ \mathrm{kW\,m^{-1}}$ and $P_c = 491\times36\times12 = 212\ \mathrm{kW\,m^{-1}}$.

For the longshore transport, with $H_b \approx 0.8H_0 = 2.4\ \mathrm{m}$ in case (b),
$$
Q_b = 1.4\times10^{-3}\times2.4^{2.5}\times\sin 35^\circ\cos 35^\circ
    = 1.4\times10^{-3}\times8.92\times0.470 = 5.9\times10^{-3}\ \mathrm{m^3\,s^{-1}},
$$
a rate that would deliver $1.8\times10^{5}\ \mathrm{m^3}$ if it persisted all year. Over the 20 storm-days assumed, case (b) therefore moves
$$
5.9\times10^{-3}\times20\times86\,400 = 1.0\times10^{4}\ \mathrm{m^3}.
$$
For case (c), $H_b = 4.8\ \mathrm{m}$ gives
$$
Q_c = 1.4\times10^{-3}\times50.5\times0.470 = 3.3\times10^{-2}\ \mathrm{m^3\,s^{-1}},
$$
and 12 hours of it delivers $1.4\times10^{3}\ \mathrm{m^3}$ — **fourteen per cent of the whole 20-day moderate storm season**, or the work of 2.8 days of the moderate sea. Twelve hours of extreme waves are worth three days of ordinary storm waves.

The general result is what matters: because $Q \propto H^{5/2}$, the transport in a 6-m storm is **5.7 times** that in a 3-m storm of the same angle, so a storm that occurs **one-tenth as often** still contributes **half** as much. Whether the extremes or the ordinary events dominate depends on the **shape of the wave-height distribution's tail**, and the answer differs from coast to coast: on the exposed coasts of the North Sea and the Bay of Biscay the ten largest storms supply 40–70 per cent of the annual transport, while on a microtidal coast with a persistent modest swell the ordinary events dominate.
:::
:::

::: widget plot
f: 0.5*x*x*8
x: 0.5, 6
y: 0, 150
labels: \text{wave power}
caption: Wave power $P = 0.5\,H^2T$ in kW per metre of crest, plotted for $T = 8$ s against the wave height. The quadratic makes the curve steep above 3 m: a 6-m wave carries **fourteen times** the power of a 1.5-m wave, and the longshore transport it drives carries fifty times as much sand because of the additional $H^{5/2}$. The practical consequence is that a coastal-management design based on the mean wave climate underestimates the sediment transport by a factor of several, and that the geomorphic effectiveness of a coast's waves is concentrated in the small fraction of hours when the sea is rough.
:::

::: history
The quantitative study of coasts begins with **Gilbert Warren** and with the **US Army Corps of Engineers'** Coastal Engineering Research Center, but its founding text is **Ralph Bagnold**'s (Bagnold) 1940 paper on the wave-driven longshore current and **H. A. Bowers'** and **M. H. P. Le Messurier's** (Le Messurier) work of the same decade, followed by **Bagnold's** own *Physics of Blown Sand*, whose longshore chapter was the first correct statement of the mechanism. **Komar and Inman** (Inman) gave the $H^{5/2}$ transport formula in 1970 from the surf-zone measurements of the Navy's Field Research Unit at Duck, North Carolina, and **Bagnold's** **energy-based** approach was generalised by **Shoreac, the Coastal Engineering Manual** and by the **CERC** formulae of the 1980s. The **wave refraction** theory is the work of **Munk** (Munk) and **Arthur** (Arthur) in the 1940s, and Munk's 1949 paper on the refraction of water waves is the foundation of the whole subject; his 1956 paper with **Tucker** (Tucker) on the wave energy flux made the power concept quantitative. The **barrier island** debate — the **submergence** school of **Hoyt**, the **offshore bar** school of **Shepard and Schwartz**, and the **wave-built** school of **Kraft** and **Nummedal** — has run since the 1960s and is unresolved. The **salt marsh** and **mangrove** as sea-level sensors is the work of **Pethick** (Pethick), of **Redfield** (Redfield) whose 1972 paper on the marsh's elevation founded the field, and of the **relative sea-level** school of **Japanese, Dutch and British** groups using foraminiferal transfer functions. The **sediment-budget** approach to coastal management was established by **Williams**, **Bruun** (Bruun) whose 1962 rule on the shoreline recession behind a groyne is still used and still misused, and by the **US National Research Council** reports of 1990 and 1995. The **coastal squeeze** and **marsh drowning** concepts are the work of **Doody** (Doody), of **Kirwan and Megonigal** (Megonigal), and of the **Schuerch, Temmerman, Spencer and the VU Amsterdam** modelling school of the 2010s.
:::

::: example Reading a depth from a storm bed {#ex-stormbed}
A Cambrian shelf sandstone contains a 25-cm graded bed with **hummocky cross-stratification** at its base, a sharp erosive base with tool marks, and a return to quiet-water shale above. Reconstructed swell periods from the bed's ripples are 8 s for the fair-weather fauna below and 14 s for the storm event. Estimate the range of water depths in which the bed was deposited.
::: solution
Wave base is $d = L_0/2 = 0.78\,T^2$, so
$$
T = 8\ \mathrm{s}:\quad d = 0.78\times64 = 50\ \mathrm{m}; \qquad
T = 14\ \mathrm{s}:\quad d = 0.78\times196 = 153\ \mathrm{m}.
$$
The bed must lie **below the fair-weather wave base**, because the quiet-water shale and the undisturbed fauna below show that ordinary swell could not reach the floor, and **above the storm wave base**, because the hummocky stratification, the tool marks and the grading require that the largest storm waves could. The depositional depth is therefore **between 50 and 153 m**, most probably in the **lower half of the range**, since hummocky cross-stratification is most characteristic of the zone between the fair-weather and the storm wave bases where oscillatory currents are strong but unidirectional currents are weak.

The method's precision is limited by three things. The **wave periods are reconstructed**, not measured, and are commonly inferred from the bed's own grain size and from the assumed storm duration. The **palaeo-water depth is not the same as the palaeo-isobath**, because the seafloor's relief and the storm's own setup and setdown shift the depth by metres. And the **storm wave base is a matter of definition** — the depth at which the largest wave in a thousand years moves sand — which depends on the assumed storm climate. In practice the method gives a factor-of-two bracket on the depth, which for a Cambrian shelf where the whole depositional system spans 100 m is a genuinely useful constraint, and it is one of the few **quantitative** depth indicators available on a shelf lacking fossils.
:::
:::

## Erosional and depositional forms

::: definition Erosional coastal landforms {#def-erosional-coast}
A **wave-cut platform** (shore platform, wave-cut bench) is the rock surface cut by wave abrasion at the foot of a retreating cliff, and it is bounded inland by the **wave-cut notch** and offshore by a **wave-built platform cover** of reworked sediment; its width records the time and the sea-level stand of its formation, and the broadest platforms — 1–3 km — are cut in soft rock on coasts with a wide surf zone. A **cave** is cut along a weakness at the high-tide level, an **arch** is a cave cut through a headland, a **stack** is the remnant of an arch's collapsed roof, and a **stump** is the stack's own remnant; the sequence is the classic demonstration of headland retreat. A **bay** forms where a discordant coastline's soft structure is excavated faster than the adjacent hard one, and the **refraction** of the waves into the bay progressively reduces the energy there as the bay widens, which is why bays reach an **equilibrium** form with the waves parallel to the shore. A **rift valley coast** (rias coast, Dalmatian coast) is a drowned one, and a **fiord coast** is a glacial one; both are **submergent** and neither has a wide platform.
:::

::: definition Depositional coastal landforms {#def-depositional-coast}
A **beach** is the accumulation of wave-deposited sediment between the highest and lowest water lines, and its **profile** — the berm, the beach face, the bar-and-trough system — adjusts seasonally, with a steep winter profile and a berm built by summer swash. A **bar** is a submerged or exposed ridge of sand parallel to the shore, a **tombolo** is a bar joining an island to the mainland, and a **baymouth bar** is a bar closing a bay. A **spit** is a ridge of sand or shingle built by longshore drift beyond a bend in the coast or a river mouth, with a landward **swale** and a salt-marsh behind it and a hooked **terminus** (a hook, a cuspate foreland) that records the storm waves from the open water. A **barrier island** is a long, low, alongshore-continuous sand body separated from the mainland by a lagoon, and its origin is disputed between the **submergence of a barrier-spit complex**, the **offshore-bar** and the **wave-built** models. A **chenier** is a beach ridge of a prograding coast separated by muddy **mudflats**, and a **salt marsh** or **mangrove swamp** is the vegetated intertidal flat behind a barrier. A **beach ridge plain** records a prograding or emergent coast, and its ridges are dated by the shoreline they mark.
:::

::: example A retreating cliff's sediment budget {#ex-cliff-budget}
A 12-km stretch of soft-clay coast retreats at a mean of 1.4 m/yr, the cliff is 8 m high and the shore face steepens to a 1:50 slope. Find the sediment supply, and say what happens if a coastal defence stops half of it.
::: solution
The cliff-line retreat delivers
$$
1.4\times8\times12\,000 = 1.34\times10^{5}\ \mathrm{m^3\,yr^{-1}}
$$
of material. The shore face between the cliff toe and the 10-m depth has an area of $12\,000\times(10/0.02) = 6\times10^{6}\ \mathrm{m^2}$, and if the profile is in equilibrium the same volume must be carried away alongshore, so the required longshore flux is $1.3\times10^{5}\ \mathrm{m^3\,yr^{-1}}$ — a modest value, consistent with the 10⁵ m³/yr the wave climate can carry.

If a **seawall or a groyne field stops half the cliff supply**, the sediment budget is closed by **lowering the shore face and the adjacent beach**, because the equilibrium profile must still be maintained. The measured response on the Holderness, on the Norfolk and Suffolk coasts, and around the groynes of the Humber and the Rhine estuaries, is a **lowering of the beach by 0.5–1.5 m** and a **retreat of the cliff further down-drift** as the protective beach disappears — the classic **coastal squeeze** and **terminal groyne problem**. The defence does not stop the erosion; it moves it 5–20 km down-drift and converts a cliff problem into a beach and a flood-defence problem.

The second consequence is the **salt marsh**. A marsh can only exist on a shore whose **accommodation space** fills at the rate at which the marsh can build peat and trap sediment, about 2–5 mm/yr. If the beach lowering steepens the profile and increases the wave energy at the marsh front, the marsh erodes; if the sea level rises faster than the marsh can build, the marsh **drowns in place** and becomes open water. Both are being observed on the Gulf Coast, in the North Sea and in the Mekong.
:::
:::

::: example The Bruun rule {#ex-bruun}
A sandy coast with a 1:100 nearshore slope, an active profile depth of 8 m and a 2-m berm faces a sea-level rise of 0.5 m. Estimate the shoreline retreat by **Bruun's rule** (Bruun), and repeat it for a steeper 1:50 coast.
::: solution
Bruun's rule states that the profile moves landward and upward as a rigid body, conserving the sediment within the active profile, so
$$
R = \frac{L_*}{h_* + B}\,\Delta S,
$$
where $L_*$ is the horizontal length of the active profile, $h_*$ its depth and $B$ the berm height. For the 1:100 coast, $L_* = 8/0.01 = 800\ \mathrm{m}$, so
$$
R = \frac{800}{8+2}\times0.5 = 40\ \mathrm{m}.
$$
For the 1:50 coast, $L_* = 8/0.02 = 400\ \mathrm{m}$ and $R = 400\times0.5/10 = 20\ \mathrm{m}$.

The **steeper coast retreats half as far**, which is the rule's most useful and most counter-intuitive result: a coarse, steep beach is more resistant to sea-level rise than a fine, flat one, because the same volume of sediment is spread over a shorter profile. On a low-lying coast with a 1:500 slope the same rise gives 400 m of retreat, which is why the microtidal sandy coasts of the Gulf of Mexico, the Baltic and the Great Lakes are the most exposed to a given rise.

The rule's limitations are as important as its result. It assumes an **unlimited sediment supply from offshore** and no loss from the profile, whereas a real coast may be starved or may lose sand beyond the profile. It assumes a **fixed profile shape**, whereas a real profile coarsens or steepens as it is eroded and then erodes more slowly. It ignores the **tide range, the waves, the storms and the human works**, all of which are commonly larger than the sea-level term. And it is a **rule for open sandy coasts only** — it does not apply to an eroding cliff, a marsh, a mangrove or a reef. The measured retreats on the US East Coast, where the rule predicts 40–80 m for the twentieth century's 15 cm of rise, are 10–50 m, so the rule **over-predicts by a factor of one to three** on most coasts; on the Nile Delta and the Mississippi, where the sediment supply has been cut by dams and levees, the observed retreat is **far greater** than the rule predicts, because the deficit is not sea level but the missing sand.
:::
:::

::: warning A coast in equilibrium is a coast that is not
A beach profile, a spit's planform and a barrier's cross-section all adjust on a timescale of **weeks to decades**, so a coast surveyed once is a coast whose state is unknown. Four traps follow. **The profile is seasonal**: a beach with a steep summer berm and a bar offshore may lose a third of its dry volume over a winter and regain it in spring, and a nourishment designed on a winter survey will be over-designed. **The sediment budget is closed at the scale of the cell, not the site**: a beach that is stable may be so only because a groyne 10 km up-drift is starving its neighbour, and the whole cell's budget must be balanced before any local intervention. **The sea-level rise is not the dominant term**: on most retreating coasts the retreat is driven by the **sediment-budget deficit** created by dams, aggregate extraction and groynes, and by the **storm climate**, and the eustatic contribution to the retreat rate is commonly less than a tenth of the total — which is why the fix that works is the sediment supply, not the sea wall. **And the coast may be a system with a threshold**: a barrier island, a salt marsh and a beach-bar system each have a **tipping point** — the marsh drowns when the accommodation creation exceeds the sediment supply, the barrier breaks through when a storm overtops it while the dune is low, and the beach goes to a **coarse-armour lag** once the fines are winnowed. A management plan built on the linear extrapolation of the last fifty years' retreat rate will fail at the threshold, and the honest statement is that the threshold's position is not known.
:::

::: quiz
A beach nourishment is designed using the mean annual wave height and the mean annual longshore transport rate. What is the most likely outcome?
- [ ] It works as designed, because the mean is the right average for a budget.
- [x] It fails early, because transport goes as $H^{5/2}$, so the mean transport rate is far below what the largest storms of the first winter move.
- [ ] It fails late, because the sand coarsens with time.
- [ ] It cannot be predicted without knowing the tide range.
::: solution
Because $Q \propto H^{5/2}$, the transport is dominated by the tail of the wave-height distribution, and the arithmetic mean of the transport over all sea states is much less than the total actually delivered by the few largest events. A design on the mean therefore under-sizes the fill and the loss rate, and the observed behaviour of nourishments designed this way is that a large fraction of the sand is lost from the active profile in the first one or two winters. The correct design uses the **transport-weighted** wave climate and includes a storm and sea-level allowance.
:::
:::

## Where this leads

The waves and tides that do the work are in [[oceanography/waves-tides]], the sea level that sets the coast's position is in [[climate-change/sea-level-rise]] and [[oceanography/sea-level]], the sediments are in [[sedimentology/marine-environments]] and [[sedimentology/bedforms]], the deltas and the sediment supply are in [[sedimentology/marine-environments]] and [[sedimentology/sediment-transport]], the storm and tsunami deposits are in [[natural-hazards/storms]] and [[natural-hazards/tsunamis]], and the ice-sheet and glacio-isostatic control on a raised beach's height is in [[glaciology/ice-sheets]] and [[palaeoclimate/proxies]].

::: summary
- Waves move water in orbits that decay with depth, so the wave base at half the wavelength is the lower limit of wave work.
- Wave power goes as $H^2T$ and longshore transport as $H^{5/2}$, so a coast's work is done by its few largest storms.
- Refraction concentrates wave energy on headlands and disperses it in bays, and it makes waves nearly parallel to the shore.
- Erosion gives notches, platforms, caves, arches, stacks and stumps; deposition gives beaches, bars, spits, barriers, cheniers and marshes.
- A coast's sediment budget is closed at the cell scale, and a defence that cuts the supply moves the erosion down-drift.
- Beach profiles are seasonal and coastal systems have thresholds, so a single survey and a linear extrapolation are both misleading.
:::

## Exercises

::: exercise Wave base {level=1 check="63"}
Find the wave base for a 9-s swell.
::: solution
$L_0 = 1.56\times81 = 126\ \mathrm{m}$, so the wave base is at $126/2 = 63\ \mathrm{m}$. Below this depth a 9-s swell cannot move sand, which is why a storm bed's structures give the palaeodepth.
:::
:::

::: exercise Wave power {level=1 check="44"}
Find the wave power of a 3-m, 10-s sea.
::: solution
$P = 0.5\times9\times10 = 45\ \mathrm{kW\,m^{-1}}$ of crest. A 100-km stretch of such a coast receives 4.5 GW — about four large power stations, applied to the shore continuously.
:::
:::

::: exercise Landform identification {level=1}
A sand ridge 15 km long extends from a river mouth across the mouth of a bay, with a salt marsh landward and a hooked end pointing back toward the river. Name it.
::: solution
A **spit** (a baymouth spit, or a **cuspat e foreland** where it is double-hooked). The ridge built by longshore drift beyond the river mouth, the marsh in the sheltered swale behind it, and the hooked terminus formed by the refracted storm waves in the bay's mouth are the diagnostic features.
:::
:::

::: exercise Longshore transport {level=2 check="0.007"}
Using $Q = 1.4\times10^{-3}H_b^{5/2}\sin\theta_b\cos\theta_b$, find the transport for $H_b = 2.5\ \mathrm{m}$ and $\theta_b = 45^\circ$, in $\mathrm{m^3\,s^{-1}}$.
::: solution
$Q = 1.4\times10^{-3}\times9.88\times0.5 = 6.9\times10^{-3}\ \mathrm{m^3\,s^{-1}} = 2.2\times10^{5}\ \mathrm{m^3\,yr^{-1}}$. The maximum transport is at $45^\circ$, where $\sin\theta\cos\theta$ is greatest, and it falls to zero both for a shore-normal and for a shore-parallel wave approach.
:::
:::

::: exercise Storm dominance {level=2 check="5.7"}
By what factor does the longshore transport rise when the breaker height rises from 2 m to 4 m at the same angle?
::: solution
By $2^{2.5} = 5.7$. Because the transport is so strongly nonlinear, a coast's response to a projected 20 per cent increase in the significant wave height is a 55 per cent increase in the longshore flux, and its sediment budget must be re-balanced rather than adjusted.
:::
:::

::: exercise A nourishment design {level=2}
A 5-km recreational beach is to be widened by 60 m of dry berm at +2 m and backed by a 100-m-wide submerged offshore borrow at +1.5 m. Find the sand volume, and say how long it will last if the longshore loss is $2\times10^{5}\ \mathrm{m^3\,yr^{-1}}$.
::: solution
$$
V = 5000\times(60\times2 + 100\times1.5) = 5000\times270 = 1.35\times10^{6}\ \mathrm{m^3}.
$$
At a loss of $2\times10^{5}\ \mathrm{m^3\,yr^{-1}}$ the fill lasts $1.35\times10^{6}/2\times10^{5} = 6.8\ \mathrm{yr}$, so the design life is **less than a decade** and the nourishment must be repeated.

Three refinements change the answer. The **loss is not uniform**: most of it occurs in the first two winters as the profile equilibrates, so the effective life is shorter than the linear estimate. The **borrow's grain size** must match or exceed the native sand, because a finer fill is transported several times faster. And the **design should include the storm and sea-level allowance**, which on a rising shore means an extra metre of dry berm. A well-designed nourishment on a sediment-starved coast lasts 5–10 years and must be re-nourished on that cycle, which is the practice on the Dutch coast, in the Fed and in the Gold Coast of Queensland.
:::
:::

::: exercise A spit's budget {level=3}
A spit grows at 40 m/yr at its tip, where the shore face is 6 m deep and the beach face 4 m high, and the longshore sediment supply arriving at the tip is $9\times10^{4}\ \mathrm{m^3\,yr^{-1}}$. Find the width over which the tip must be prograding, and discuss why the spit's growth rate is not constant.
::: solution
The cross-sectional area of the new spit per unit length is roughly the sum of the subaerial beach face and the submerged shore face,
$$
A \approx \tfrac12\times4\times(\text{beach width}) + \tfrac12\times6\times(\text{shore-face width}),
$$
but it is simpler to write the volume balance directly: if the tip advances a distance $w$ per year across a width $W$, the volume required is $W\times w\times\bar z$ where $\bar z$ is the mean height of the new deposit, about 5 m. Then
$$
W = \frac{9\times10^{4}}{40\times5} = 450\ \mathrm{m},
$$
so the spit is prograding across a **450-m-wide** tip — a plausible spit width.

The growth rate is not constant for four reasons. As the spit lengthens, **wave refraction around its own tip** increases the energy there and the transport capacity rises, so a long spit grows faster than a short one until it reaches a **dynamic limit**. As it extends into deeper water the **volume needed per metre of advance grows**, so the same supply gives a slower advance. The **longshore supply itself varies** with the sand source up-drift, which may be a retreating cliff that will run out. And once the spit reaches the far side of a bay or an inlet, the **tidal flow** at the mouth may exceed the sand supply and keep the inlet open, so the spit stops growing in length and begins to grow in width and height instead. The **hooked terminus** forms at this stage, when the spit's end is reworked by the refracted storm waves from the open water.
:::
:::

::: exercise A coast under rising sea level {level=3}
A salt-marsh coast has a marsh surface 1.2 m above mean tide level, a peat accumulation rate of 3 mm/yr, a sediment supply that has been reduced by 60 per cent by upstream dams, and a sea-level rise of 4 mm/yr. Determine whether the marsh survives, and what would have to change.
::: solution
A marsh surface is built by the combination of **inorganic sediment trapping** and **peat growth**, and its vertical accretion rate must at least match the **relative** sea-level rise. The observed accretion here is 3 mm/yr against a rise of 4 mm/yr, so the marsh is **losing 1 mm/yr of elevation** and will be drowned when the deficit accumulates to the 1.2 m of present elevation above mean tide level — in
$$
\frac{1200}{1} = 1200\ \mathrm{yr}.
$$
But the deficit is not constant. A marsh's accretion is **self-limiting**: as the surface sinks relative to the tide, it is flooded more often, traps more sediment and grows more peat, so the accretion rate rises with inundation. This negative feedback keeps most marshes afloat, and the empirical relation is roughly linear in the tidal elevation, with a marsh able to track a rise of up to about 8–10 mm/yr where the sediment supply is adequate.

The 60-per-cent sediment reduction is the critical term, because in a supply-rich marsh most of the accretion is mineral sediment rather than peat. If the accretion scales with the supply, the present 3 mm/yr would have been 7.5 mm/yr before the dams, and the marsh was previously **gaining** elevation. To survive the 4 mm/yr rise the marsh needs its accretion restored to at least 4–5 mm/yr, which requires roughly **half** of the lost sediment — obtainable by managed sediment recharge, by removing a levee to restore tidal flooding of a sediment-rich floodplain, or by **managed retreat** of the shoreline so that the marsh can migrate landward into new accommodation space.

The honest conclusion is that the marsh survives for centuries and then either drowns or retreats, that the timescale is far shorter than the 1200 years of the linear calculation because the feedback is nonlinear and because a marsh that is drowned once cannot recover, and that the only robust option on a coast with a fixed upstream levee is to **give the marsh room**, since a marsh that cannot migrate landward loses area whatever its vertical accretion.
:::
:::
