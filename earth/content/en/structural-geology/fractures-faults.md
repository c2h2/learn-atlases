Almost all the extension of the Earth's upper crust, and a large part of its shortening, is taken up on fractures. A fault is at once the most obvious and the most easily misread structure in the field: obvious, because it puts two rocks together that belong a kilometre apart; misread, because a fault surface is a palimpsest, and the slickenlines on it record the last slip, not the first, and not necessarily the dominant one. This chapter is about the geometry of breaking — how fractures form, how they are arranged, how much they move, and what they are allowed to look like given the stress field and the friction law of the last chapter.

## Joints and extension fractures

::: definition Fracture, joint and fault {#def-fracture}
A **fracture** is a surface across which there is no significant shear displacement; a **joint** is a fracture whose walls have separated normal to the fracture plane, so that it is an extension fracture. A **fault** is a fracture across which measurable displacement has occurred parallel to the surface. Joints form where the least principal stress becomes tensile, $\sigma_3 < 0$ in the compression-positive convention of geology, and they open perpendicular to $\sigma_3$; a swarm of parallel joints therefore records the direction of maximum shortening, which is why joint orientations are used as palaeostress indicators in sedimentary basins.
:::

::: proposition Joint spacing and layer thickness {#prop-joint-spacing}
In a layered sequence in which joints form only in a competent bed of thickness $h$ bounded by weaker layers, the joint spacing $s$ grows with time until it reaches a **saturation spacing** of
$$
s_\text{sat} \approx 2c ,
$$
where $c$ is the half-length of the fracture process zone at the joint tip. Empirically $c \approx 0.05$–$0.15\,h$, so the saturation spacing is $s_\text{sat} \approx 0.1$–$0.3\,h$ and the number of joints per bed increases until the spacing falls to a few tenths of the bed thickness, after which new joints cannot nucleate.
:::

::: example Reading a limestone {#ex-joints}
A 40-cm-thick limestone bed in a shale sequence contains joints spaced at 8 cm on average. The adjacent 12-cm limestone beds are jointed at 2.5 cm. Is the fracture set related to the bed thickness, and what does that tell you about when the joints formed?
::: solution
The ratios are $s/h = 8/40 = 0.20$ for the thick bed and $2.5/12 = 0.21$ for the thin one. The two are the same to within five per cent, which is the classic signature of **layer-controlled, saturation-spaced** jointing: the joints stopped nucleating when the spacing reached about a fifth of the bed thickness, and the set is therefore "mature" or level 2 in the classification of fracture-set development.

The genetic reading follows. Because the spacing is set by the bed thickness and not by the stress, the joint set cannot be used to date the deformation relative to a particular folding event — a set that has reached saturation looks the same whatever the stress that made it, provided only that the stress was enough to fracture the layer. What the set *does* record is the orientation, which is perpendicular to the shortening direction, and the fact that the joints are confined to the bed and do not cross the shale, which means they formed before the bedding was broken by faults and before the sequence was deeply buried — joints that propagate across bedding indicate a much larger fracture process zone and a much higher driving stress, and are typical of tectonic or overpressure-driven fracturing.
:::
:::

## Fault geometry and terminology

::: definition Fault terms {#def-fault-terms}
The **hanging wall** is the block above the fault plane and the **footwall** the block below. The **slip vector** $\mathbf{u}$ joins two points formerly adjacent; its **dip-slip component** is the **throw** and its **strike-slip component** the **heave**. Slip is **normal** if the hanging wall moves down relative to the footwall, **reverse** if it moves up, and **thrust** if the reverse fault dips less than about $45^\circ$. A **listric** fault flattens with depth; a **ramp-flat** fault alternates steep segments cutting across bedding with flat segments along it. The **slip direction** at a point is given by slickenlines, and the **slip sense** by slickensteps, mineral fibres, and by the offset of a marker bed.
:::

::: example Throw, heave and net slip {#ex-throw}
A fault strikes $000^\circ$ and dips $60^\circ$ east. A marker bed that was once continuous is offset in a horizontal tunnel: the bed on the hanging-wall side is 40 m lower than on the footwall side, and the two cut-offs are separated by 25 m measured horizontally perpendicular to the fault strike. Find the throw, the heave, the net slip and the rake of the slip vector.
::: solution
The vertical separation of a horizontal bed across a fault is the **throw**, so $T = 40\ \mathrm{m}$. The horizontal separation perpendicular to strike is the **heave**, $H = 25\ \mathrm{m}$, and the net slip is
$$
|\mathbf{u}| = \sqrt{T^2 + H^2} = \sqrt{1600 + 625} = 47.2\ \mathrm{m}.
$$
The rake of the slip vector in the fault plane, measured from the horizontal, is
$$
\psi = \arctan\frac{T}{H} = \arctan\frac{40}{25} = 58.0^\circ .
$$
A rake of $58^\circ$ on a $60^\circ$-dipping fault is close to dip-slip, and the sense — hanging wall down — makes it a **normal fault** with a small strike-slip component. The arithmetic is worth practising because it is exactly what a geologist does in a tunnel, a mine or a road cutting, and because the answer is the net slip only if the two cut-offs are on the *same* marker and the fault slip is a single vector; a second marker at a different height is the standard check.
:::
:::

::: definition Displacement–length scaling {#def-dl}
Mature faults over nine orders of magnitude of length obey a remarkably tight linear relation between maximum displacement and total length,
$$
D_\text{max} \approx 0.01\,L ,
$$
a displacement–length ratio of about one per cent. The relation holds for laboratory specimens, mine-scale faults, exposed fault zones and first-order crustal shear zones, and it is the closest thing structural geology has to a scaling law.
:::

::: example How long is this fault? {#ex-dl-use}
A fault offsets a marker bed by a maximum of 320 m. Estimate its length, and explain why the estimate is better for a fault that has stopped growing than for one that is still active.
::: solution
$L = D_\text{max}/0.01 = 32\,000\ \mathrm{m} = 32\ \mathrm{km}$.

The estimate works because a fault that has reached the end of its life has accumulated displacement along a length that no longer grows, and the ratio settles at its characteristic value. A fault that is still propagating has a length that increases faster than its displacement early in the history, so young active faults have $D/L$ ratios well below one per cent — the Wasatch and the East African border faults both give lengths far longer than their displacements predict, which is one way of recognising that they have a great deal of slip left in them. The relation is also a good test of correlation: if two fault segments thought to be one fault give wildly different ratios, they are probably two faults.
:::
:::

::: widget plot
f: 0.01*x
x: 0, 100
y: 0, 1.2
labels: D = 0.01L
caption: Maximum displacement against fault length for the relation $D_\text{max} = 0.01L$, with length in kilometres and displacement in metres. The straight line is the remarkable part: faults from a metre long in a road cutting to a hundred kilometres long in a seismic transect fall on it, which means that fault growth is **self-similar** — a fault that slips a thousand times more is a thousand times longer, and the shape of the displacement profile along it does not change. Departures from the line are the interesting observations: a fault below the line is either young and still propagating, or is made of several unlinked segments; a fault above the line has been reactivated, or has its displacement absorbed by a neighbouring structure.
:::

::: quiz
A fault strikes $090^\circ$ and dips $60^\circ$ north. The present maximum horizontal compressive stress trends $000^\circ$. What is its slip tendency?
- [ ] High, because it dips steeply and steep faults slip easily.
- [x] Zero, because the fault plane contains the $\sigma_1$ direction.
- [ ] Moderate, because the angle between the fault strike and $\sigma_H$ is $90^\circ$.
- [ ] It cannot be determined without the coefficient of friction.
::: solution
The stress $\sigma_1$ is horizontal and trends $000^\circ$; the fault strikes $090^\circ$ and dips $60^\circ$ north, so the fault plane contains a horizontal line trending $090^\circ$ and a line dipping north — and $\sigma_1$, trending north and horizontal, lies in that plane. A principal stress lying in the fault plane produces no shear traction on it, so $\tau = 0$ and $T_s = 0$ whatever the friction. The coefficient of friction decides whether a fault with non-zero slip tendency slips; it cannot create slip tendency.
:::
:::

## Fault-related folds

::: definition Fault-bend fold {#def-fbf}
A **fault-bend fold** (Suppe fold) forms where a hanging-wall cutoff passes from a flat onto a ramp. Because the fault-parallel displacement is constant along the fault, the change in dip of the fault forces the hanging wall to fold, and the fold grows as the hanging wall is transported over the ramp. For a ramp of dip $\delta$ and height $h$, the fault-parallel displacement $D$ produces a throw
$$
T = D\sin\delta, \qquad H = D\cos\delta,
$$
and the wavelength of the resulting anticline–syncline pair is $\lambda = 2h/\tan\delta$.
:::

::: example A ramp in a thrust belt {#ex-fbf}
A thrust fault flats along a shale at 2 km depth, then ramps at $30^\circ$ up to a higher shale at 2.5 km. Find the displacement required to carry the hanging wall entirely up the ramp, the horizontal distance the hanging wall travels, and the wavelength of the fold.
::: solution
The ramp height is $h = 500\ \mathrm{m}$ and the dip $\delta = 30^\circ$, so
$$
D = \frac{h}{\sin\delta} = \frac{500}{0.500} = 1000\ \mathrm{m}, \qquad
H = D\cos\delta = 1000\times0.866 = 866\ \mathrm{m},
$$
and
$$
\lambda = \frac{2h}{\tan\delta} = \frac{1000}{0.577} = 1730\ \mathrm{m}.
$$
One kilometre of fault slip makes a 1.7-km-wide anticline with 500 m of relief. The geometry is the reason thrust belts look the way they do: the folds are not independent structures but the hanging wall's answer to a change in the shape of the fault beneath them, and their wavelength tells you the ramp height and therefore the stratigraphic thickness that has been cut, which is otherwise invisible at the surface. In the Canadian Rockies and the Jura this relation is used to build cross-sections where no subsurface control exists, and the closure of the section — the requirement that the hanging-wall and footwall cutoffs match after restoration — is the test that the geometry is right.
:::
:::

## Strike-slip systems

::: definition Riedel shears and the geometry of a strike-slip zone {#def-riedel}
In a laboratory analogue of a strike-slip zone, or in the brittle upper part of one, a characteristic set of fractures forms at fixed angles to the main fault: **Riedel shears** $R$ at $10^\circ$–$20^\circ$ in the same sense as the main fault, **conjugate Riedel shears** $R'$ at about $75^\circ$ in the opposite sense, **tension gashes** $T$ at about $45^\circ$, and **Y shears** at $0^\circ$, parallel to the fault. The angles are set by the internal friction angle through $\theta = 45^\circ - \varphi/2$, and the whole pattern rotates with the sense of shear, which makes an oriented hand specimen a shear-sense indicator.
:::

::: example Pull-apart and relay {#ex-pullapart}
Two overlapping strike-slip segments, each 12 km long, step right by 3 km with a 9-km overlap. What structure forms in the overlap if the fault is right-lateral, and what would form if it were left-lateral?
::: solution
A right step on a right-lateral fault is a **restraining** (convergent) geometry, and the overlap is a **positive relay** that produces transpression: uplift, contraction and a restraining bend rather than a basin. The subsiding case is the opposite — a right step on a left-lateral fault, or a left step on a right-lateral one — which opens a **pull-apart basin** between the fault tips.

For a pull-apart, the depth of the basin is a fraction of the throw on the bounding steps. With a step of 3 km and a displacement–length ratio of one per cent, each segment's displacement near its tip is of order $0.01\times12/2 = 60\ \mathrm{m}$ of strike-slip, whose component across the step is $60\sin\alpha$ for the angle $\alpha$ between the fault and the step; for $\alpha = 45^\circ$ that is 42 m of extensional throw, and with several such increments and normal faulting on the bounding strands a basin of a few hundred metres to a kilometre is typical. The Salton Sea, the Dead Sea, the Sea of Japan and the Lao basin behind the Xianshuihe fault are all pull-aparts, and their sediment thickness records the accumulated slip on the through-going fault — which makes them among the few places where a strike-slip system's slip history can be read directly from a drill core.
:::
:::

::: history
Grove Karl Gilbert (Gilbert) set the programme in 1877, when he read the Basin and Range as the product of horizontal extension and named the horst and the graben, and in 1904 when he described the Boulder conglomerate's overturned beds as the record of a thrust. Samuel Franklin Emmons and, above all, Charles R. Van Hise (Van Hise) made fault mechanics explicit: Van Hise's 1896 paper *On the Laws of Faulting* derived the expected directions of slip from a stress field and then tested them against the faults of the Virginia Blue Ridge, finding that the compression theory failed and that gravity and extension ruled — an early and dramatic case of a field test overturning a favored model. The geometry of normal faulting in extensional terranes was worked out by the Nevada school and by George Ferguson, and the classification of fault types by dip and slip sense was standardised in the decades that followed. The revival of thrust tectonics in the Alps and the Rockies, and the demonstration from the Canadian Rockies that thin-skinned thrusts ride on detachments, made the fault-bend and fault-propagation geometries necessary; John Suppe (Suppe) supplied them in a series of papers of 1983 that turned cross-section balancing from a craft into an arithmetic. Strike-slip geometry owes its modern form to the analogue experiments of Richard Chambers and O. R. Twiss, to the Riedel-shear analysis inherited from Rudolf Riedel's 1929 paper on faulting in clay, and to the synthesis of Christie-Blick and Biddle of 1985 on strike-slip step-overs, which made pull-apart basins and restraining bends into exploration targets. David Price's work on joint spacing in the 1960s and the fracture-mechanics models of Heimson, Pollard and Segall of the 1970s turned joint arrays into a palaeostress tool, and the displacement–length scaling of the 1980s, from the work of David Watterson, John Gawthorpe, Richard Scholz and others, gave structural geology its one robust empirical law.
:::

## Which faults will move?

::: proposition Slip tendency {#prop-sliptendency}
For a fault whose normal makes an angle $\theta$ with $\sigma_1$, the normal and shear tractions are
$$
\sigma_n = \sigma_1\cos^{2}\theta + \sigma_3\sin^{2}\theta, \qquad
\tau = (\sigma_1-\sigma_3)\sin\theta\cos\theta,
$$
and the **slip tendency** is
$$
T_s = \frac{\tau}{\sigma_n} = \frac{(\sigma_1-\sigma_3)\sin\theta\cos\theta}{\sigma_1\cos^{2}\theta + \sigma_3\sin^{2}\theta} .
$$
It is maximised where $\tan^{2}\theta = \sigma_3/\sigma_1$, with
$$
T_{s,\max} = \frac{\sigma_1-\sigma_3}{2\sqrt{\sigma_1\sigma_3}} .
$$
A fault reactivates when $T_s$ reaches the friction coefficient $\mu$.
:::

::: example Will this fault slip? {#ex-sliptendency}
The stress field is $\sigma_1 = 200\ \mathrm{MPa}$, $\sigma_3 = 50\ \mathrm{MPa}$, and a pre-existing fault has a coefficient of friction $\mu = 0.6$. Find the maximum slip tendency, the orientation at which it occurs, and whether the fault will slip. Then decide whether a fault striking parallel to $\sigma_1$ can slip at all.
::: solution
$$
T_{s,\max} = \frac{200-50}{2\sqrt{200\times50}} = \frac{150}{2\times100} = 0.75 .
$$
The optimal orientation is $\tan^{2}\theta = 50/200 = 0.25$, so $\theta = 26.6^\circ$ between the fault **normal** and $\sigma_1$, which means the fault plane makes $63.4^\circ$ with $\sigma_1$ — equivalently, $26.6^\circ$ between the fault plane and $\sigma_1$, the same $30^\circ$-ish angle as the Anderson theory predicts.

Since $T_{s,\max} = 0.75 > \mu = 0.6$, a favourably oriented fault **will** slip. A fault striking parallel to $\sigma_1$ has its plane containing $\sigma_1$; taking $\theta$ as the angle between the normal and $\sigma_1$, such a fault has $\theta = 90^\circ$, so $\tau = (\sigma_1-\sigma_3)\times1\times0 = 0$ and $T_s = 0$. **No slip tendency, no slip**, whatever the stress magnitude. This is the single most useful result in exploration and in hazard assessment: a fault's orientation relative to the present stress field decides whether it is active, and a map full of Quaternary faults can contain several that are currently locked and several apparently innocent ones that are not.
:::
:::

::: warning A fault map is not a hazard map
The presence of a young fault at the surface is evidence of past slip, and the absence of one is not evidence against future slip. Three effects conspire. Faults do not rupture the whole length of their buried tips, and a fault that has never broken the surface — a blind thrust — can generate a large earthquake, as at Northridge in 1994 and at Izmit in 1999. Fault scarps are erased by erosion at rates that in a humid climate exceed the rate at which they are formed by slip, so a landscape may carry no trace of a fault that slips every few thousand years. And the stress field rotates through time: a fault optimally oriented today may have been locked a million years ago and vice versa, which is why the western Basin and Range, the Alps and the Himalaya all contain fault populations whose present slip rates are inconsistent with their cumulative offsets. The defensible statement is about the **rate** of slip and the **probability** that a given segment ruptures in a given interval, and both come from a combination of geology, geodesy and seismology rather than from a field map alone.
:::

## Where this leads

The friction law that decides which faults move is in [[structural-geology/stress]]; the ductile equivalents of the structures in this chapter are in [[structural-geology/shear-zones]]; the folds that are not fault-related are in [[structural-geology/folds]]; the extensional systems that normal faults build are in [[structural-geology/rifts]]; and the seismic hazard that follows is in [[natural-hazards/earthquake-hazard]].

::: summary
- Joints are extension fractures perpendicular to the least principal stress; their spacing in a layered sequence saturates at a fraction of the bed thickness, which makes spacing a poor palaeopiezometer and a good indicator of set maturity.
- Throw, heave and net slip are the three components of a fault's displacement, and only the net slip is a vector property of the fault.
- Mature faults obey $D_\text{max} \approx 0.01L$ over nine orders of magnitude of length; departures record growth, linkage or reactivation.
- Folds above ramps are the hanging wall's response to the shape of the fault below, and their wavelength measures the ramp height.
- Strike-slip zones develop Riedel shears at $15^\circ$, conjugate Riedels at $75^\circ$ and tension gashes at $45^\circ$ to the main fault, and steps between segments make basins or uplifts according to their sense.
- Slip tendency decides which pre-existing faults move; a fault parallel to $\sigma_1$ has zero slip tendency and cannot slip.
- Fault maps record the past, and the hazard depends on rate, on blind tips and on the present stress field.
:::

## Exercises

::: exercise Fault classification {level=1}
Classify: (a) a fault dipping $45^\circ$ with the hanging wall up; (b) a fault dipping $70^\circ$ with the hanging wall down; (c) a fault dipping $15^\circ$ with the hanging wall up.
::: solution
(a) A **reverse** fault. (b) A **normal** fault. (c) A **thrust** fault — a low-dipping reverse fault, and specifically a thin-skinned detachment if it lies along a shale or evaporite. The dip thresholds are conventions, but the $45^\circ$ line between reverse and thrust is the one that matters mechanically, because a fault dipping less than about $30^\circ$ cannot slip by frictional sliding under a vertical $\sigma_1$ without an abnormally low friction or an abnormally high pore pressure.
:::
:::

::: exercise Throw and heave {level=1 check="50"}
Across a fault the throw is 30 m and the heave 40 m. What is the net slip?
::: solution
$|\mathbf{u}| = \sqrt{30^2 + 40^2} = 50\ \mathrm{m}$, with a rake of $\arctan(30/40) = 36.9^\circ$.
:::
:::

::: exercise Joint spacing {level=1 check="0.2"}
A 25-cm sandstone bed has joints spaced at 5 cm. Give $s/h$ and say whether the set is at saturation.
::: solution
$s/h = 5/25 = 0.20$, which is squarely in the saturation range of $0.1$–$0.3$. The set has stopped nucleating new joints, and its spacing records the bed thickness rather than the stress.
:::
:::

::: exercise Displacement–length {level=2 check="18"}
A fault is 1.8 km long. Estimate its maximum displacement in metres.
::: solution
$D_\text{max} = 0.01\times1800 = 18\ \mathrm{m}$. If the measured displacement is 60 m, the fault has either been reactivated, or its displacement is shared with a parallel structure, or the two ends are not its true tips.
:::
:::

::: exercise Fault-bend fold {level=2 check="946"}
A thrust ramp dips $25^\circ$ and has a height of 400 m. Find the fault displacement needed to carry the hanging wall over it, in metres, and the horizontal distance the hanging wall travels.
::: solution
$D = h/\sin\delta = 400/\sin25^\circ = 400/0.4226 = 946\ \mathrm{m}$ along the fault, and $H = h/\tan25^\circ = 400/0.4663 = 858\ \mathrm{m}$ horizontally. The two differ by ten per cent, and confusing them is a standard error in building a cross-section: the displacement is measured along the fault plane, whereas the shortening across the belt is measured horizontally.
:::
:::

::: exercise Slip tendency {level=2 check="0.35"}
For $\sigma_1 = 150$ and $\sigma_3 = 75\ \mathrm{MPa}$, find the maximum slip tendency.
::: solution
$T_{s,\max} = (150-75)/(2\sqrt{150\times75}) = 75/(2\times106.1) = 0.354$. With $\mu = 0.6$ no favourably oriented fault can slip in this stress field, which is the sense of the statement that the crust is "not critically stressed". Frictional failure at $\mu = 0.6$ requires $\sigma_1/\sigma_3 \approx 3.1$, so with $\sigma_3 = 75\ \mathrm{MPa}$ the maximum principal stress would have to reach about $235\ \mathrm{MPa}$ — a differential stress of $160\ \mathrm{MPa}$, more than twice the present value — before anything could slip.
:::
:::

::: exercise Riedel geometry {level=2}
In a right-lateral strike-slip zone, at what azimuth relative to the main fault do Riedel shears, conjugate Riedels and tension gashes form, and how does the pattern change for left-lateral slip?
::: solution
Riedel shears $R$ form at $10^\circ$–$20^\circ$ to the main fault with the same sense of offset, conjugate Riedels $R'$ at about $75^\circ$ with the opposite sense, tension gashes $T$ at about $45^\circ$, and Y shears parallel to the fault. For left-lateral slip the whole pattern is reflected: the $R$ shears that trend $015^\circ$ for right-lateral slip on a north–south fault trend $345^\circ$ for left-lateral slip. The diagnostic point is that $R$ shears are by far the most abundant and that they **overlap en echelon**, leaving a step-over that opens for a tension gash; the geometry of the overlap in a hand specimen therefore gives the shear sense without any need for a marker.
:::
:::

::: exercise A blind fault {level=3}
A seismic reflection section shows a thrust fault that flattens into a detachment at 6 km depth and does not reach the surface, but the overlying sequence is folded into a 4-km-wide anticline with 300 m of relief at the surface. Explain the geometry, estimate the slip on the detachment, and say what makes this structure hazardous.
::: solution
This is a **blind thrust** with a fault-propagation fold: the fault dies upward into the folded layers, and the fold grows as the fault slips, with the fold wavelength set by the depth to the detachment and the mechanical stratigraphy rather than by a ramp. Taking the fold wavelength as $\lambda \approx 2h/\tan\delta$ with $h = 6\ \mathrm{km}$ and an effective dip of $30^\circ$ gives $\lambda \approx 21\ \mathrm{km}$, far more than the observed 4 km, so the fold is not a simple fault-bend fold; a fault-propagation fold over a 6-km-deep detachment with a 4-km wavelength requires either a much steeper fault or mechanical layering that controls the wavelength independently.

The slip on the detachment follows from the shortening across the anticline, which for a tight fold with 300 m of relief and a 4-km wavelength is of order a few hundred metres. The hazard is that the structure has no surface expression: there is no scarp to map, no fault to trench, and no historical record of surface rupture, so the standard probabilistic seismic-hazard map, which is built from mapped faults, assigns it a low weight. The 1994 Northridge and 1987 Whittier Beck earthquakes were both on blind thrusts beneath Los Angeles, and both did billions of dollars of damage in a city whose seismic-hazard assessment had been built on fault maps.
:::
:::

::: exercise Restoration {level=3}
A cross-section across a thrust belt shows three imbricate thrust sheets, each with a ramp of dip $30^\circ$ and height 300 m, and a total shortening of 4 km measured from a restored horizon. If each sheet's ramp contributes the same displacement, find the displacement on each thrust and the total horizontal contraction accounted for. Is the section balanced?
::: solution
Each ramp requires a fault displacement of $D = h/\sin30^\circ = 300/0.5 = 600\ \mathrm{m}$, of which the horizontal component is $H = h/\tan30^\circ = 520\ \mathrm{m}$. Three thrusts therefore account for $3\times520 = 1560\ \mathrm{m}$ of horizontal contraction, against an observed 4000 m.

The section is **not balanced**: 2.4 km of shortening is unaccounted for. The possibilities are a fourth and deeper thrust not seen in the section, a basal detachment that ramps through the stratigraphy below the deepest control, folding by layer-parallel shortening (which requires either bedding-parallel faults or a measurable layer-thickness change), or ductile thickening of the lower crust. The test is to look for the diagnostic evidence of each: a repeated stratigraphic sequence at depth, a change in bed thickness across the belt, or a foliation in the lower section. A section that does not balance is not wrong, but it is incomplete, and the missing shortening is always somewhere — which is the content of the rule that a cross-section must conserve area as well as length.
:::
:::
