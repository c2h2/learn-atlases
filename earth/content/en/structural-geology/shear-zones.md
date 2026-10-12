A shear zone is a place where the crust moved, and it is the structure that carries most of the displacement in the Earth. A fault in the shallow crust is a surface; a shear zone in the ductile crust below 10 km is a **zone**, tens of metres to tens of kilometres wide, in which the rock has been stretched, sheared, recrystallised and, usually, flushed with fluid. Because the rock in a shear zone is fine-grained, coherent and full of minerals that grew during deformation, a shear zone is also the closest thing structural geology has to a laboratory: it preserves the pressure, the temperature, the stress, the strain, the strain rate, the flow geometry and the sense of shear of an event, all in the same hand specimen.

## Fault rocks

::: definition The fault-rock series {#def-fault-rocks}
Rocks formed by brittle deformation at shallow depths are **cataclastic**: granular, cohesive **cataclasite** if the fragments are visible, cohesionless **fault gouge** if they are clay-rich and fine. Rock formed by frictional melting on a seismically slipping fault is **pseudotachylyte**, a black glassy or fine crystalline vein whose existence proves that the fault slipped at centimetres per second. Rocks formed by crystal-plastic deformation with grain-size reduction at depth are **mylonites**: a **protomylonite** has lost less than half its original grains, a **mylonite** is a well-mixed fine-grained rock, and an **ultramylonite** has less than ten per cent porphyroclasts left. A **phyllonite** is a mylonite formed largely by grain-boundary sliding in a phyllosilicate-rich rock, and an **augen mylonite** preserves large porphyroclasts ("augen") in a fine matrix.
:::

::: definition Foliation, lineation and the C–S fabric {#def-cs}
A mylonite has a **mylonitic foliation** $S$, defined by the shape-preferred orientation of grains and by compositional layering, and a **stretching lineation** $L$ defined by elongate grains or by the intersection lineation of $S$ with a second fabric. With increasing shear a second set of surfaces, the **C-surfaces** (from the German *C* for *Schiebung*, shear), develops as closely spaced shear bands oblique to $S$. The angle $\theta$ between $S$ and $C$ falls steadily with accumulated shear, and for a rock deforming by simple shear from an initially equant state,
$$
\gamma \approx \cot\theta .
$$
The $C$-surfaces become parallel to the shear plane at large strain, which is why a strongly deformed mylonite has a single, nearly planar fabric and no internal shear-sense indicator.
:::

::: example How much shear from a hand specimen? {#ex-sc}
A quartzofeldspathic mylonite has an $S$–$C$ obliquity of $20^\circ$. Estimate the shear strain, and the displacement if the shear zone is 40 m wide.
::: solution
$$
\gamma = \cot 20^\circ = 2.75 .
$$
Over a 40-m-wide zone this is a displacement of $2.75\times40 = 110\ \mathrm{m}$.

Two cautions. The relation $\gamma = \cot\theta$ assumes the rock started with no foliation and deformed by pure simple shear; if a foliation already existed at an angle to the shear plane, the observed obliquity is a compound result and can be smaller or larger than the simple-shear value. And at $\theta$ below about $15^\circ$ the two surfaces are separated by millimetres and cannot be resolved in the field, so the method saturates at $\gamma$ of about four. For larger strains the only reliable estimates come from deformed markers — a vein, a dyke, an ooid — or from the internal fabric of a porphyroclast.
:::
:::

::: widget plot
f: 1/tan(x*pi/180)
x: 5, 85
y: 0, 10
labels: \gamma = \cot\theta
caption: The shear strain implied by an $S$–$C$ obliquity $\theta$ in degrees. The curve is steep at small $\theta$, which is the practical difficulty: an obliquity of $60^\circ$ records a shear of 0.6, one of $20^\circ$ a shear of 2.8, and one of $10^\circ$ a shear of 5.7, but the difference between $10^\circ$ and $8^\circ$ — a factor of 1.25 in strain — is hard to measure on a hand specimen and impossible on a map. The method is therefore good for recognising moderate strain and for indicating shear sense, and poor for measuring large strain.
:::

::: history
The name comes from Charles Lapworth (Lapworth), who in 1885 coined "mylonite" — from the Greek *mylos*, a mill — for the finely laminated, cataclastic rocks of the Moine Thrust, and who understood at once that they marked a zone of movement rather than a single surface. The distinction between a fault and a shear zone was argued through the first half of the twentieth century, with Read's 1949 analysis of the Moine Thrust in the Moine and Ben More inliers establishing the ductile character of the deep part of the zone. The experimental foundation came from Christie's 1965 paper on the "mylonites" of the Lewisian, which first interpreted the microstructure in terms of crystal-plastic deformation and dynamic recrystallisation, and from the simultaneous realisation by Borris Esaiassen and by Mervyn Paterson that the flow of a fine-grained aggregate is grain-size-sensitive. The kinematic apparatus arrived in the 1970s and 1980s: the $S$–$C$ fabric and its strain interpretation from the work of the Berthé, Choukroune and Marcoux school of 1979; the mica fish of Lister and Williams of the same year; the shear-sense criteria catalogued by Hanmer and by Simpson and Schmid; and the kinematic vorticity function of Simpson (Simpson) and of Jeffreys's successor in the mathematics of flow, which for the first time gave a single number to the difference between pure shear and simple shear. The grain-size piezometer for quartz came from the experimental work of Stünitz, Herleman and Tullis in the 1980s and 1990s, and its application to natural mylonites is still contested — which is exactly as it should be, since the disagreement is about whether the deep crust can be read at all.
:::

## Kinematics: how to tell which way it went

::: definition Shear-sense criteria {#def-ssc}
A **shear-sense indicator** is a fabric whose asymmetry has a definite handedness relative to the flow. The reliable ones are:

**$\sigma$-type and $\delta$-type porphyroclasts.** A rigid porphyroclast in a shearing matrix develops a mantle of fine recrystallised material that is asymmetric, with a "wing" trailing in the direction of shear; $\sigma$-type wings are continuous with the matrix and $\delta$-type are detached and rotated.

**Mica fish.** A mica grain rotates in shear and, if it recrystallises continuously, takes the shape of a fish whose "tail" steps back against the shear direction.

**Oblique foliation and oblique mica.** The pole to the foliation lies oblique to the shear plane, on the side opposite to the shear direction.

**$C'$-C' shear bands.** Secondary shear bands at a high angle to the main $C$-surfaces, forming a conjugate set whose acute bisector is the shear direction.

**Foliation fish and f-foliation.** Folded $C$-surfaces whose asymmetry records the shear.
:::

::: proposition Vorticity and the flow type {#prop-vorticity}
A steady two-dimensional flow is the superposition of an irrotational (coaxial) and a simple-shear (non-coaxial) part, and its geometry is measured by the **kinematic vorticity number**
$$
\omega = \frac{\text{rotational rate}}{\text{stretching rate}}, \qquad 0 \le \omega \le 1 .
$$
Pure shear has $\omega = 0$, simple shear has $\omega = 1$, and a general ductile shear zone lies between. For steady flow the material lines rotate towards the shear plane at a rate that depends on $\omega$, and the angle $\theta_\text{max}$ between the maximum stretching direction and the shear plane satisfies
$$
\cos 2\theta_\text{max} = \omega ,
$$
so that $\theta_\text{max} = 45^\circ$ for pure shear and $0^\circ$ for simple shear.
:::

::: example Pure shear or simple shear? {#ex-vorticity}
In a mylonite, a finite-strain analysis of deformed markers puts the maximum-stretching direction $30^\circ$ from the shear plane. Estimate $\omega$, and describe what else you would look for.
::: solution
With $\theta_\text{max} = 30^\circ$,
$$
\omega = \cos 2\theta_\text{max} = \cos 60^\circ = 0.50 .
$$
The flow is therefore about half simple shear and half pure shear — a general shear, which is the norm in crustal-scale shear zones rather than the exception.

That estimate must be tested against independent observations. A pure-shear-dominated zone should have **no consistent shear-sense asymmetry**: porphyroclast wings should point both ways with no preferred handedness, and there should be no systematic obliquity of mica fish. A zone with $\omega = 0.5$ should show asymmetry in about half the grains. Finding a perfectly consistent asymmetry in every porphyroclast over kilometres means $\omega$ is near one and the fabric-pole estimate is wrong, usually because the "shear plane" has been identified with the foliation rather than with the $C$-surfaces. Conversely, finding no asymmetry anywhere in a zone that clearly transported kilometres of displacement means the displacement was taken by layer-parallel shortening and not by simple shear — which is a real and under-appreciated possibility in the deep crust.
:::
:::

::: quiz
A mylonite shows a strong, consistent top-to-the-west asymmetry in every porphyroclast over a distance of 5 km, and its $S$–$C$ obliquity is $12^\circ$. What is the best interpretation?
- [x] A strongly non-coaxial, simple-shear-dominated flow with a shear strain of about five or more.
- [ ] A pure-shear-dominated flow with a small rotational component.
- [ ] Two phases of deformation of opposite sense.
- [ ] The obliquity is too small to be meaningful, so nothing can be said.
::: solution
Consistent asymmetry in every grain over kilometres means the rotational part of the flow dominates, so $\omega$ is near one and the flow is close to simple shear. An obliquity of $12^\circ$ gives $\gamma = \cot 12^\circ = 4.7$, and because the $S$–$C$ method saturates at large strain the true strain is at least that. Pure shear produces no consistent asymmetry at all, and two opposite phases would give a mixed population.
:::
:::

## Stress, strain rate and width from a mylonite

::: example Palaeopiezometry from grain size {#ex-piezo}
Recrystallised quartz grains in a mylonite average $25\ \mu\mathrm{m}$. Using the flow-law-calibrated relation $d = 2\times10^{3}\,\sigma^{-1.2}$ for quartz ($d$ in $\mu\mathrm{m}$, $\sigma$ in MPa), find the differential stress; then combine it with a flow law written in normalised form as
$$
\dot{\varepsilon} = 10^{-14}\left(\frac{\sigma}{40\ \mathrm{MPa}}\right)^{3}\ \mathrm{s^{-1}}
$$
to find the strain rate and the displacement rate across a shear zone 20 km wide.
::: solution
$$
\sigma^{1.2} = \frac{2\times10^{3}}{25} = 80
\quad\Longrightarrow\quad
\sigma = 80^{1/1.2} = e^{4.382/1.2} = 39\ \mathrm{MPa}.
$$
Then
$$
\dot{\varepsilon} = 10^{-14}\left(\frac{39}{40}\right)^{3} = 9.3\times10^{-15}\ \mathrm{s^{-1}},
$$
and across a 20-km-wide zone the displacement rate is
$$
9.3\times10^{-15}\times2\times10^{4} = 1.9\times10^{-10}\ \mathrm{m\,s^{-1}} = 5.9\ \mathrm{mm\,yr^{-1}} .
$$

That is a plate-tectonic displacement rate, and it is the sort of number that makes people distrust the method — rightly, in part. Grain-size palaeopiezometry for quartz is calibrated over stresses of 20–200 MPa and reproduces laboratory grain sizes to a factor of about two in stress; the strain rate inherits that error raised to the third power, so a factor-of-two error in stress is a factor of eight in strain rate. The displacement rate of $37\ \mathrm{mm\,yr^{-1}}$ could as easily be $5$ or $300$. What the calculation does establish, and establishes robustly, is that the shear zone was **actively deforming at a geological strain rate** rather than recording a single seismic event, and that the stress was of order tens of megapascals — which is the number that matters for the strength of the crust.
:::
:::

::: example Integrating a strain profile {#ex-profile}
Across a mylonite zone the shear strain falls away from the core as $\gamma(x) = \gamma_0\,e^{-|x|/w}$, with $\gamma_0 = 6$ at the centre and $w = 300\ \mathrm{m}$. Find the total displacement, and explain why the width of a shear zone is conventionally defined by a strain contour rather than by a lithological boundary.
::: solution
The displacement is the integral of the strain across the zone,
$$
D = \int_{-\infty}^{\infty}\gamma_0\,e^{-|x|/w}\,\mathrm{d}x = 2\gamma_0 w = 2\times6\times300 = 3600\ \mathrm{m}.
$$
Half of that displacement — 1.8 km — is taken up within one value of $w$ of the centre, where the strain is above $6/e = 2.2$, and half in the wings, where the strain is below that.

The exponential profile has no edge: the strain is never exactly zero, so the "width of the shear zone" is whatever strain contour you choose to draw. The convention is to report the width across which the strain exceeds some threshold, commonly $\gamma = 1$ or the width of visibly mylonitised rock, and to state the threshold — because the same zone can be reported as 600 m wide at $\gamma > 2.2$ or 2 km wide at $\gamma > 0.5$, and both are correct. A structural geology map that shows a shear zone as a line is therefore asserting that the displacement is localised into a width too small to draw, and a map that shows it as a 5-km-wide band is asserting the opposite; the strain profile is what decides, and it is one of the few things about a shear zone that cannot be inferred from a single outcrop.
:::
:::

::: warning A shear zone is not necessarily a large displacement
The instinct that a mylonite zone marks a major fault is often wrong in both directions. A mylonite records **finite strain**, not displacement, and a strain of five across a zone two metres wide is ten metres of displacement, while the same strain across a zone twenty kilometres wide is a hundred kilometres. Conversely, a shear zone of tens of metres width and a few tens of metres of displacement can look spectacular in the field and be tectonically trivial.

The width is therefore as important as the strain, and it is the quantity that shear-zone theory predicts least well. Strain localisation runs away — a zone weakens as it strains, the strain concentrates, and the width should collapse to a few centimetres — so the observed widths of hundreds of metres to tens of kilometres require a **diffusive counter-process** that spreads the strain: heat conduction, grain growth, the influx of fluid that resets the grain size, or the geometric requirement that the displaced block be accommodated somewhere. Which of these wins decides the width, and none of them is well enough known to predict it. The honest procedure is to measure the strain profile across the whole width of the zone, from the wall rock to the core, and to report the displacement as the integral.
:::

## Where this leads

The flow laws that govern shear-zone strength are in [[structural-geology/rheology]]; the brittle structures that form at the tips of a shear zone are in [[structural-geology/fractures-faults]]; the folds that grow in a shear zone are in [[structural-geology/folds]]; the extensional core complexes that large low-angle shear zones build are in [[structural-geology/rifts]]; and the subduction-channel analogue is in [[geophysics/earthquake-sources]].

::: summary
- Fault rocks record the deformation mechanism: cataclasite and gouge are brittle, mylonite is crystal-plastic, pseudotachylyte is frictional melt.
- The $S$–$C$ obliquity gives the shear strain as $\gamma \approx \cot\theta$ and saturates at strains above about four.
- Shear-sense indicators — porphyroclast wings, mica fish, oblique fabrics, $C'$-shear bands — record the rotational part of the flow and require a consistent population, not a single grain.
- The kinematic vorticity number measures the ratio of simple shear to pure shear, and most crustal shear zones lie between the two end members.
- Recrystallised grain size is a piezometer, and combined with a flow law it gives the strain rate; the stress is good to a factor of two and the strain rate to an order of magnitude.
- A shear zone's displacement is the integral of its strain across its width, and width is the least predictable quantity of the three.
:::

## Exercises

::: exercise Fault rock {level=1}
Distinguish a fault gouge from a mylonite in the field, without a microscope.
::: solution
A **gouge** is unlayered or weakly layered, soft enough to scratch with a knife, commonly clay-rich and often moist, and it contains angular fragments of the wall rock in a fine matrix; it forms at depths of a few kilometres or less. A **mylonite** is hard, coherent, layered or foliated, commonly glossy or silvery on the foliation, and it contains stretched and rotated porphyroclasts set in a fine but crystalline matrix; it forms at depths of 10 km or more. The decisive field test is whether the rock has a penetrative foliation with stretched augen — plastic — or a brecciated, soft, structureless core — brittle.
:::
:::

::: exercise S–C strain {level=1 check="1.73"}
An $S$–$C$ mylonite has an obliquity of $30^\circ$. Estimate the shear strain.
::: solution
$\gamma = \cot30^\circ = 1.73$. In a 10-m-wide zone this is 17 m of displacement.
:::
:::

::: exercise Vorticity {level=1 check="1"}
What is the kinematic vorticity number of a flow in which material lines rotate steadily towards the shear plane and the stretching direction lies along the shear plane?
::: solution
$\omega = 1$: steady simple shear. Pure shear has $\omega = 0$ and no rotation of material lines at all.
:::
:::

::: exercise Piezometry {level=2 check="78"}
Recrystallised quartz grains in a mylonite average $10\ \mu\mathrm{m}$. Using $d = 2\times10^{3}\sigma^{-1.2}$, find the differential stress in MPa.
::: solution
$\sigma^{1.2} = 2000/10 = 200$, so $\sigma = 200^{1/1.2} = e^{5.298/1.2} = 78\ \mathrm{MPa}$. A ten-micrometre grain size is unusually fine for a quartz mylonite and usually indicates either a high stress, a low temperature, or a fine grain size inherited from a precursor and never reset — which is why the grain-size distribution, and whether the grains grew after deformation, must be checked before the piezometer is used.
:::
:::

::: exercise Displacement {level=2 check="600"}
A shear zone 3 km wide has a uniform shear strain of 0.2. What is the displacement, in metres?
::: solution
$D = \gamma w = 0.2\times3000 = 600\ \mathrm{m}$. A three-kilometre-wide mylonite zone with only 600 m of displacement is a **diffuse** shear zone, and it is a warning sign: either the strain is not uniform and the displacement is concentrated in a narrower core, or the zone records layer-parallel shortening of a broad region rather than a discrete fault.
:::
:::

::: exercise Strain rate {level=2 check="0.53"}
Using the flow law of [[#ex-piezo]], what strain rate corresponds to a differential stress of $15\ \mathrm{MPa}$? Give your answer in units of $10^{-15}\ \mathrm{s^{-1}}$.
::: solution
$\dot{\varepsilon} = 10^{-14}(15/40)^{3} = 10^{-14}\times0.0527 = 5.3\times10^{-16}\ \mathrm{s^{-1}} = 0.53\times10^{-15}\ \mathrm{s^{-1}}$. The point of the exercise is the leverage of the exponent: dropping the stress from $39$ to $15\ \mathrm{MPa}$ — a factor of 2.6 — drops the strain rate by a factor of seventeen, and a factor-of-two error in the palaeopiezometer is therefore worth an order of magnitude in strain rate.
:::
:::

::: exercise Shear-sense from a porphyroclast {level=2}
A porphyroclast of feldspar in a quartz matrix has two wings of recrystallised quartz, one longer and tapering to the north and one shorter and blunter to the south, and the wings are continuous with the matrix. Is this a $\sigma$- or a $\delta$-type porphyroclast, and what does it say about the shear sense?
::: solution
Continuous wings make it a **$\sigma$-type** porphyroclast, which forms at relatively low strain and low temperature and preserves the sense of shear most reliably. The wings trail in the direction of shear of the matrix relative to the porphyroclast, so the longer, tapering wing points in the direction in which the matrix above the porphyroclast moved — here, northward, indicating top-to-the-north shear.

The caution is that the longer wing is not always the trailing one: at high strain the wings become symmetric, and at low strain the asymmetry may reflect the shape of the original porphyroclast rather than the flow. The test is a population: measure the asymmetry of thirty grains and look for a consistent handedness, and check that the same sense comes from the oblique foliation and from the mica fish.
:::
:::

::: exercise Shear zone as a fluid conduit {level=3}
A 100-m-wide mylonite zone in a granitic protolith contains 12 per cent white mica, whereas the wall rock contains 2 per cent. The mylonitisation occurred at $450^\circ\mathrm{C}$ and 6 kbar, and the strain is 3. Estimate the mass of fluid that passed through per cubic metre of rock, and explain why shear zones are the conduits for orogenic gold.
::: solution
The extra mica is the product of the reaction $\mathrm{feldspar} + \mathrm{H_2O} \to \mathrm{white\ mica} + \mathrm{quartz} + \mathrm{K^+}$, so the water consumed is roughly proportional to the extra mica. Taking the additional 10 per cent mica as requiring about 4 per cent $\mathrm{H_2O}$ by mass of rock, and taking a rock density of $2650\ \mathrm{kg\,m^{-3}}$, the water consumed is
$$
0.04\times2650 = 106\ \mathrm{kg\,m^{-3}} .
$$
That is a **lower bound** on the fluid flux, because most of the fluid that passed through merely passed through. The flux required to sustain the reaction over a 100-m zone and a strain of 3 accumulated in $10^6$ years is of order $10^{3}$–$10^{4}\ \mathrm{kg\,m^{-2}}$, which is a substantial fraction of the crust's water inventory.

The connection to ore is that a shear zone is the only place in the middle and lower crust where three requirements are met at once: **permeability** created by fine grains, microfractures and an interconnected mica fabric; **channelled flow** driven by the pressure gradient between a deep, overpressured source and a shallow hydrostatic sink; and **a chemical trap**, because the drop in pressure and temperature, the mixing with cooler wall-rock fluid, or the change in the fluid's sulphide activity at the point where the shear zone meets a reactive lithology, all precipitate what the fluid was carrying. Almost every orogenic gold deposit in the world — the Abitibi, the Yilgarn and the Alpine clefts — lies on a crustal-scale shear zone, and the mineralisation is younger than the peak metamorphism and synchronous with the main shearing.
:::
:::

::: exercise Width and displacement {level=3}
Two shear zones have the same peak strain of 8 and the same displacement of 20 km. Zone A has a width of 200 m and a sharp boundary; zone B has a width of 20 km and a gradual boundary. Describe the two strain profiles and say which is more likely to have been active seismically.
::: solution
Zone A must carry its whole 20 km within 200 m, so its mean strain is 100 — far above the stated peak of 8. The numbers are inconsistent, and the resolution is that the strain is not uniform: the profile is strongly peaked, and the "peak strain of 8" is a measurement made in the wall rock at the edge of the visible mylonite, not in the ultracataclastic core where the displacement actually localised. Zone A is a **localised, strain-softened** shear zone, and such zones are the ones that rupture seismically, because localisation concentrates the stress and the fine-grained, water-poor core has a high friction.

Zone B, at 20 km wide, has a mean strain of 1.0 against a peak of 8, so its profile is broad and anastomosing: strain distributed through anastomosing mylonite strands around undeformed boudins of less strained rock. Such a zone deforms **aseismically** by crystal-plastic creep at a few hundred metres depth and above, and its displacement accumulates over tens of millions of years. The distinction matters for hazard: a broad ductile shear zone at the base of the seismogenic crust creeps, and the faults that break are the brittle ones in the cover above it, whose geometry is controlled but not determined by the ductile fabric below.
:::
:::
