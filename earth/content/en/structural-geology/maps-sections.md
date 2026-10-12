A geological map is a hypothesis about the shape of a surface that nobody has seen, drawn on a surface that everybody can see. Everything else in structural geology — the cross-section, the restoration, the reserve estimate, the hazard assessment — is an inference from that drawing, and the inference is only as good as the geometry that got it there. This chapter is the arithmetic of the subject: how to get a dip out of three numbers, how to get a thickness out of a map, and how to draw a section that does not lie.

## Planar geometry

::: definition True dip, apparent dip and strike {#def-dip}
The **true dip** $\delta$ of a plane is the maximum angle between the plane and the horizontal, measured in a vertical plane perpendicular to the **strike**. Any other vertical section gives an **apparent dip** $\delta_a$, related to the true dip by
$$
\tan\delta_a = \tan\delta\,\cos\beta ,
$$
where $\beta$ is the angle in plan between the direction of the apparent dip and the direction of the true dip. Since $\cos\beta \le 1$, an apparent dip is always less than or equal to the true dip, and the true dip can never be measured in a section that is not perpendicular to the strike — which is why a dip measured in a road cutting, a river gorge or a mine drift is a lower bound and not a measurement.
:::

::: proposition The three-point problem {#prop-threepoint}
If a plane is intersected at three points with known plan coordinates and elevations, its dip and strike are uniquely determined. Writing the elevation of the plane as $h = h_0 + p\,x + q\,y$ with $x$ eastward and $y$ northward, the two horizontal gradients $p$ and $q$ follow from three simultaneous equations, and
$$
\tan\delta = \sqrt{p^{2} + q^{2}}, \qquad
\text{dip azimuth} = \left(360^\circ + \arctan\frac{-p}{-q}\right) \bmod 360^\circ,
$$
the azimuth being measured clockwise from north in the direction of steepest descent of the plane.
:::

::: example Three boreholes {#ex-threepoint}
Three boreholes penetrate the top of a coal seam at the following positions and elevations: A at the origin, 200 m; B 400 m due east of A, 160 m; C 300 m due south of A, 110 m. Find the true dip, the dip direction and the strike, and the depth to the seam below a fourth point D, 600 m east and 500 m north of A.
::: solution
Take $x$ eastward and $y$ northward. The two gradients are
$$
p = \frac{160 - 200}{400} = -0.100, \qquad
q = \frac{110 - 200}{-300} = +0.300 .
$$
The seam therefore descends at 0.100 m per metre eastward and rises at 0.300 m per metre northward, so it dips toward the south-east. The true dip is
$$
\tan\delta = \sqrt{0.100^{2} + 0.300^{2}} = 0.3162 \quad\Longrightarrow\quad \delta = 17.5^\circ,
$$
and the dip direction has an eastward component of 0.100 and a southward component of 0.300, so it lies
$$
\arctan\frac{0.100}{0.300} = 18.4^\circ
$$
east of due south: an azimuth of $180^\circ - 18.4^\circ = 162^\circ$. The strike is $072^\circ$.

For point D, the elevation of the seam is
$$
h_D = 200 - 0.100\times600 + 0.300\times500 = 200 - 60 + 150 = 290\ \mathrm{m}.
$$
If the ground surface at D is at 250 m, the seam **crops out above** the surface there — the arithmetic has found that D lies on the up-dip side, and the seam is not buried at all.

Two lessons in the last line. The three-point method is exact for a plane and silently wrong for anything else: if the seam is folded, the "dip" it returns is an average over the triangle, and the triangle should be made as small as the data allow. And the method returns signed answers that mean something: a negative depth is not an error but an outcrop, and a structural-contour map that crosses the ground-surface map tells you exactly where the bed is exposed.
:::
:::

::: widget plot
f: atan(tan(30*pi/180)*cos(x*pi/180))*180/pi
x: 0, 90
y: 0, 60
labels: \text{apparent dip}
caption: The apparent dip, in degrees, of a plane whose true dip is $30^\circ$, plotted against the angle $\beta$ between the section direction and the true dip direction. The apparent dip falls as $\cos\beta$ and vanishes at $\beta = 90^\circ$, which is the strike. The curve is flat near $\beta = 0$ — a section that is $10^\circ$ off the true dip direction underestimates a $30^\circ$ dip by only $0.5^\circ$ — and steep near $\beta = 90^\circ$, where a section $10^\circ$ off the strike reads an apparent dip of only $5^\circ$ for a true dip of $30^\circ$. This is why a single dip measurement in a gorge or a road cutting is nearly worthless unless the strike is known independently, and why the standard field practice is to measure the strike on a horizontal surface and the dip on a surface perpendicular to it.
:::

::: quiz
A bed is measured in a road cutting as dipping $22^\circ$ to the east. The cutting trends N 70° E. What can you say about the true dip?
- [ ] It is $22^\circ$ to the east.
- [x] It is at least $22^\circ$, and its direction is within $20^\circ$ of east.
- [ ] It is less than $22^\circ$, because the cutting is not perpendicular to the strike.
- [ ] Nothing; the apparent dip gives no information about the true dip.
::: solution
The apparent dip is always less than or equal to the true dip, so the true dip is at least $22^\circ$. Its direction must lie within the range permitted by the section orientation: the true dip direction is perpendicular to the strike, and the measured apparent dip constrains the strike to lie within about $20^\circ$ of the cutting's trend, so the dip direction lies within about $20^\circ$ of east. A second measurement in a cutting of different trend, or a strike measurement on a horizontal surface, closes the range to a point — which is why a fieldbook full of dips measured in one gully is much less useful than the same number of dips measured in gullies running different ways.
:::
:::

## Thickness from a map

::: example Outcrop width and true thickness {#ex-thickness}
A bed dips $42^\circ$ and its outcrop band on horizontal ground is 240 m wide. Find the true thickness. The same band is measured along a traverse that runs perpendicular to the strike; if instead the traverse crosses the band at $55^\circ$ to the strike, what width would be measured?
::: solution
On horizontal ground the outcrop width is $w = t/\sin\delta$, so
$$
t = w\sin\delta = 240\times\sin42^\circ = 240\times0.669 = 161\ \mathrm{m}.
$$
For a traverse crossing the band at an angle $\alpha$ to the strike, the measured width is the horizontal width divided by $\sin\alpha$:
$$
w' = \frac{t}{\sin\delta\,\sin\alpha} = \frac{161}{0.669\times\sin55^\circ} = \frac{161}{0.669\times0.819} = 294\ \mathrm{m}.
$$
The band looks twenty-two per cent wider on a traverse that is not perpendicular to the strike, and the correction is a factor of $\sin\alpha$ that is easy to forget and that becomes enormous as the traverse approaches parallel to the strike. The general rule is that a thickness is only meaningful with the two angles that produced it attached, and that the best thickness measurements come from a core drilled perpendicular to the bedding or from a road cutting whose walls are vertical and perpendicular to the strike.
:::
:::

::: example Fault separation from two boreholes {#ex-fault-depth}
Two boreholes 800 m apart along a line perpendicular to the strike of a fault both penetrate the top of a coal seam. Borehole 1, on the hanging-wall side, has a collar at 150 m and hits the seam at a depth of 220 m. Borehole 2, on the footwall side, has a collar at 150 m and hits the seam at a depth of 120 m. The fault dips $65^\circ$ and the seam dips $10^\circ$ toward borehole 2. Find the vertical separation, the throw and the net slip, and say what the seam's own dip does to the answer.
::: solution
The seam top is at elevation $150 - 220 = -70\ \mathrm{m}$ in borehole 1 and $150 - 120 = +30\ \mathrm{m}$ in borehole 2, so the **vertical separation** across the fault is 100 m, with the hanging-wall side down — a normal fault.

If the two boreholes were close enough to the fault that the seam's own dip could be ignored, the vertical separation would equal the **throw**, and the net slip along a $65^\circ$-dipping fault plane would be
$$
|\mathbf{u}| = \frac{T}{\sin\delta} = \frac{100}{\sin65^\circ} = 110\ \mathrm{m}, \qquad
H = \frac{T}{\tan\delta} = \frac{100}{\tan65^\circ} = 47\ \mathrm{m}.
$$

But the boreholes are 800 m apart and the seam dips at $10^\circ$, so over that distance the seam falls by $800\tan10^\circ = 141\ \mathrm{m}$ on its own. That is more than the observed separation, and it means the raw 100 m is **not** a throw: the seam has been lowered by its own dip and raised by the fault. Correcting for the dip, the true vertical separation is
$$
T = 100 + 141 = 241\ \mathrm{m},
$$
and the net slip is $241/\sin65^\circ = 266\ \mathrm{m}$.

This is the single most common quantitative error in subsurface structural geology, and it is invisible unless someone asks how far apart the control points are. The rule is that a separation measured between two points is a throw only when the two points are on the same bed and the bed between them has not changed in elevation for any other reason; the correction is to project both intersections to the fault plane along the bed's own dip, which is exactly what a structure-contour map of the seam does automatically and what two boreholes and an assumption do not.
:::
:::

::: definition Structure contours and the V rule {#def-structure-contour}
A **structure contour** is a line of equal elevation on a chosen geological surface, drawn exactly as a topographic contour is drawn on the ground. Structure contours give the dip directly — the dip is the gradient of the contour field, perpendicular to the contours and in the direction of decreasing elevation — and they make the geometry of a fold or a fault readable without any assumption about outcrop. Where a geological boundary crosses a valley, the **V rule** applies: a dipping bed that crops out in a valley forms a V that points **upstream** if the bed dips upstream more steeply than the valley floor, **downstream** if it dips downstream, and **upstream at the valley gradient** if it dips upstream more gently than the valley floor. The rule is a special case of the geometry of intersections and is the reason a map reader can infer a dip direction from a valley alone.
:::

::: history
The quantitative geometry of geological maps was worked out in the survey offices of the nineteenth century, and its classic statement is Robert Hill's and John Judd's school of field mapping and, above all, the 1881 treatise of Charles Hichcock (Hitchcock) and the practical manuals of the British Geological Survey, in which Andrew Ramsay's survey of Great Britain established the discipline of mapping from the ground with a compass-clinometer and a plane table. The problem of getting a dip from three boreholes — the "three-point problem" — was formalised by the mining engineers, whose need to predict the position of a coal seam between shafts was commercial, and the graphical solution by the method of apparent dips became standard in the manuals of the 1890s. The V rule was stated in its modern form by the American school, and the geometry of intersections of surfaces was treated as a branch of descriptive geometry in the textbooks of van Bemmelen and of Billings. The cross-section became an object of rigorous analysis only in the 1980s, with the recognition — from the work of Suppe, of Dahlstrom on the Canadian Rockies, and of the Texas school of Hossack and Groshong — that a section must conserve area and bed length, and that a section that does not is not merely untidy but wrong. The restoration of a section to its undeformed state, which turns structural interpretation into a testable calculation, is the practical fruit of that recognition, and it is now the standard method by which a subsurface interpretation is validated before a well is drilled.
:::

## Cross-sections and restoration

::: definition Balancing a cross-section {#def-balancing}
A cross-section is **balanced** when it satisfies three conditions simultaneously. **Line length** balancing: the length of a bed measured along its own surface is the same in the restored and the deformed states, so a bed neither stretches nor shortens. **Area** balancing: the area of a rock region is conserved, so no voids and no overlaps appear. **Depth** balancing: the section is consistent with the geometry of the detachment or the basement at depth. A section that violates any of the three is not necessarily wrong — it may record layer-parallel shortening, or ductile thickening, or a fault that has not been mapped — but it is incomplete, and the amount by which it fails is a measurement of the missing process.
:::

::: example An unbalanced section {#ex-balance}
A section across a fold-and-thrust belt shows a competent bed of original thickness 100 m that is now 88 m thick measured perpendicular to bedding, and an outcrop belt that has shortened from an interpreted original width of 12 km to 8 km. Separate the two components of the shortening.
::: solution
The **horizontal** shortening across the belt is $(12 - 8)/12 = 33$ per cent. The bed has thinned by 12 per cent, and if that thinning is by layer-parallel shortening at constant volume then the bed has also shortened **along its own length** by 12 per cent, so its restored length is $0.88L_0$.

The two numbers are not the same thing and should never be added. Folding shortens the horizontal distance between two points without shortening the bed between them, so the horizontal shortening is the product of a bed-length factor and a folding factor:
$$
0.67 = 0.88 \times f \quad\Longrightarrow\quad f = 0.761,
$$
and the shortening taken up by folding is $1 - 0.761 = 24$ per cent. A third of the total shortening is layer-parallel shortening recorded in the bed itself, and three-quarters is folding recorded in its shape.

The three explanations of any residual mismatch between a restored section and its deformed state are the standard ones. **Layer-parallel shortening** before or during folding, which is recorded by bed thinning, by boudination of a competent marker, or by a measurable shortening of the bedding-parallel lineation. **Ductile thickening or thinning** of the whole section, which requires a volume change and therefore a mass transfer, recorded by pressure-solution seams or by veins. **An unrecognised fault or a detachment** at depth, which is the most common answer and the one that requires a deeper control to exclude.

The arithmetic is worth doing carefully because it is the only test a section has. A section that balances is not proof that the geometry is right — several different geometries can balance — but a section that does not balance is proof that it is not.
:::
:::

::: warning A cross-section is an interpretation with the status of a measurement
Two geologists given the same map, the same boreholes and the same dips will draw different sections, and both will be defensible. The reason is that a section is a two-dimensional slice through a three-dimensional structure, and the choice of section line is not neutral: a section drawn perpendicular to the regional strike of a structure whose trend curves by $30^\circ$ will show a shortening that is partly a shortening and partly a rotation. Boreholes are sparse, and the interpolation between them is a guess with a shape. And the deep part of every section is unconstrained: the geometry at 10 km depth is inferred from the geometry at 2 km by a rule — constant area, constant bed length, a listric profile — that is an assumption about a rock nobody has seen.

The defensible practice is to draw several sections, to vary the assumptions deliberately and record how much the answer moves, and to state the shortening as a range. A shortening of "35 to 50 per cent depending on whether the lower unit is restored as parallel or as similar" is a better number than "42 per cent", and it is the number a colleague can use.
:::

## Where this leads

The geometry that this chapter measures is generated in [[structural-geology/folds]] and [[structural-geology/fractures-faults]]; the gravity and seismic methods that supply the deep control are in [[geophysics/gravity-isostasy]] and [[geophysics/exploration]]; the maps of a mountain belt are read in [[structural-geology/orogens]]; and the subsurface structures that hold petroleum are in [[earth-resources/petroleum-systems]].

::: summary
- An apparent dip is always less than the true dip, and a dip measured in a section that is not perpendicular to the strike is a lower bound.
- Three points determine a plane; the two horizontal gradients give the dip as $\sqrt{p^2+q^2}$ and the dip direction as the direction of steepest descent.
- Outcrop width gives true thickness only with the dip and the traverse angle attached.
- Structure contours turn a map into a dip field and remove the ambiguity of outcrop patterns.
- A balanced section conserves line length, area and depth; the amount by which a section fails to balance is a measurement of a missing process.
- A cross-section is an interpretation, and its answer should be quoted as a range obtained by varying the assumptions.
:::

## Exercises

::: exercise Apparent dip {level=1 check="20.4"}
A bed dips $30^\circ$ due east. What apparent dip does a vertical road cutting trending N 40° E show?
::: solution
The dip direction is due east, azimuth $090^\circ$; the cutting trends N 40° E, azimuth $040^\circ$, so $\beta = 50^\circ$ and
$$
\tan\delta_a = \tan30^\circ\cos50^\circ = 0.577\times0.643 = 0.371, \qquad \delta_a = 20.4^\circ .
$$
The cutting shows a dip of about $20^\circ$ toward the east-south-east, and a geologist who recorded it as the true dip would underestimate the dip by a third.
:::
:::

::: exercise Outcrop width {level=1 check="120"}
A bed dipping vertically is 120 m thick. What is its outcrop width on horizontal ground?
::: solution
For a vertical bed the outcrop width equals the true thickness, 120 m, because $\sin 90^\circ = 1$. This is the only dip at which the outcrop width is the thickness, and it is why vertical bedding is so easily recognised on a map — and why a narrow, straight, persistent outcrop belt is the classic signature of a vertical succession and is so often mistaken for a fault.
:::
:::

::: exercise Three-point problem {level=2}
Three boreholes hit the top of a sandstone at (0, 0) elevation 300 m, (500, 0) elevation 260 m and (0, 400) elevation 380 m, coordinates in metres east and north. Find the dip and strike.
::: solution
$p = (260-300)/500 = -0.080$ and $q = (380-300)/400 = +0.200$. Then $\tan\delta = \sqrt{0.080^2 + 0.200^2} = 0.2154$, so $\delta = 12.2^\circ$. The plane descends eastward and rises northward, so it dips toward the south-east, at an azimuth of $180^\circ - \arctan(0.080/0.200) = 180^\circ - 21.8^\circ = 158^\circ$. The strike is $068^\circ$.
:::
:::

::: exercise Structure contours {level=2}
On a structure-contour map of a faulted limestone the contours are 20 m apart and 150 m apart on the map. Find the dip. If the same surface is contoured at 20 m but the contours are 40 m apart on one side of a fault, what has changed?
::: solution
$\tan\delta = 20/150 = 0.133$, so $\delta = 7.6^\circ$. On the other side, $\tan\delta = 20/40 = 0.500$, so $\delta = 26.6^\circ$. The dip has changed across the fault, which means either that the two blocks have been rotated about the fault — a growth fault with rollover — or that the fault has brought a steeper structure up against a flatter one. The first is tested by mapping the fold geometry away from the fault, the second by finding a stratigraphic repetition.
:::
:::

::: exercise Thickness {level=2 check="95"}
A traverse perpendicular to the strike crosses a bed dipping $50^\circ$ with an outcrop width of 124 m. Find the true thickness in metres.
::: solution
$t = w\sin\delta = 124\times\sin50^\circ = 124\times0.766 = 95\ \mathrm{m}$.
:::
:::

::: exercise Depth conversion {level=2 check="1800"}
A seismic reflection from the base of a sandstone arrives at a two-way travel time of 1.20 s, and the interval velocity to that horizon is 3000 m/s. Find the depth.
::: solution
$z = v t/2 = 3000\times1.20/2 = 1800\ \mathrm{m}$. The factor of two is the round trip, and forgetting it is the most common error in subsurface structural geology. The larger error, and the one that matters for a trap, is the velocity: a ten per cent error in velocity is a ten per cent error in depth, and a structure that is 200 m too shallow can turn a spill-point calculation into a dry hole.
:::
:::

::: exercise The V rule {level=2}
A river flows north with a surface gradient of $3^\circ$. In which direction does the outcrop of a bed V if the bed (a) dips $35^\circ$ north, (b) dips $35^\circ$ south, (c) is horizontal? Assume in each case that the beds dip parallel to the valley axis.
::: solution
**(a) Downstream (north).** The bed dips downstream more steeply than the valley floor, so the outcrop migrates down-valley as it descends.
**(b) Upstream (south).** The bed dips upstream, and the outcrop always V's upstream in this case whatever the angles.
**(c) Upstream (south), at exactly the valley gradient.** A horizontal bed V's upstream at an angle whose tangent is the stream gradient, and a vertical bed does the same.

The two remaining cases complete the set: a bed dipping downstream **less steeply** than the valley gradient V's upstream, and a bed dipping downstream at **exactly** the valley gradient outcrops parallel to the river for kilometres. The rule is not a mnemonic but a construction — the intersection of two surfaces, one of which you can draw — and drawing the two cross-sections settles any case in ten seconds, which is why it is worth learning once rather than memorising six cases.
:::
:::

::: exercise Section balancing {level=3}
A restored cross-section conserves area but not line length: a limestone bed that was 5 km long is now 4.0 km long measured along its own surface, and its thickness is unchanged. What process is required, and by how much must the bed have shortened? Where does the missing length go?
::: solution
The bed has shortened along its own length by $(5.0 - 4.0)/5.0 = 20$ per cent, and since its thickness is unchanged the shortening is not accompanied by thickening. A bed that shortens by 20 per cent at constant thickness and constant area must have **thickened somewhere else** — the area of the whole section is conserved, so the shortening of the limestone has been taken up by an equal amount of thickening in the units above or below it.

The candidates are a ductile unit that has flowed into the fold hinges, a weak unit that has been squeezed into the limbs, or a unit that has been faulted and imbricated so that its apparent thickness is a stack of slices. The test is to measure the thickness of every unit in the section, restored and deformed, and to find the one that has gained the area the limestone has lost. If no unit has gained, then the section does not conserve area either, and the missing material has left the section by flow perpendicular to it — which is a three-dimensional statement and requires a three-dimensional restoration to check.
:::
:::

::: exercise Uncertainty {level=3}
A fault is penetrated by one borehole at 800 m depth and is inferred from a reflection to be at 1200 m depth 1.5 km away. If the fault is listric rather than planar, in which direction is the true depth at that point, and by roughly how much might a planar interpretation be wrong?
::: solution
A listric fault flattens with depth, so its true dip decreases downward and its true depth at a given horizontal distance is **less** than a planar extrapolation from the shallow dip predicts. If the planar interpretation puts it at 1200 m and the true profile is listric, the fault may be at 900–1000 m — an error of 200–300 m, or twenty per cent.

The magnitude follows from the geometry. A listric profile that flattens from $60^\circ$ at 800 m to $30^\circ$ at 1500 m has, over 1.5 km of horizontal distance, a mean dip of about $45^\circ$ rather than the constant $60^\circ$ a planar fit would use, and the depth ratio is $\tan45^\circ/\tan60^\circ = 0.577$. The practical consequence is that a well placed on a planar interpretation of a listric normal fault will be **too deep and too far into the footwall**, which is the classic reason that exploration wells miss the up-dip corner of a rollover trap. The remedy is to interpret the fault as listric from the first, to use every reflection and borehole as a constraint on the curvature, and to quote the depth as a range bounded by the planar and listric end members.
:::
:::
