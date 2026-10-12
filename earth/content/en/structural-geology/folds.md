A fold is what a stack of layers does when it is shortened, and almost everything in the sedimentary record is a stack of layers. That is why folds are the most abundant structure on the planet and why they are the first thing a structural geologist learns to describe — and also why they are the structure most often over-interpreted, because a fold's shape records three things at once: the shortening, the mechanical stratigraphy that decided where the layers slipped, and the sequence of deformations that the fold has survived.

## Describing a fold

::: definition Fold geometry {#def-fold-geometry}
The **hinge line** is the line of maximum curvature on a folded surface and the **hinge zone** the region around it; the **limbs** are the flanking surfaces of lower curvature. The **axial surface** (or axial plane) is the surface that divides a fold into approximately symmetrical halves, and the **axial trace** is its line of intersection with a map. The **interlimb angle** is the angle between the limbs measured perpendicular to the axial surface, and the **wavelength** $\lambda$ is the distance between successive hinges of the same sense measured parallel to the axial surface. A fold is **open** for interlimb angles above $90^\circ$, **tight** below $30^\circ$, and a **chevron** if its limbs are planar and hinged.
:::

::: definition Parallel, similar and tangential folds {#def-fold-classes}
A **parallel** (concentric) fold preserves the orthogonal thickness of the bed everywhere: the beds are bent but not thinned, and the hinge is thicker than the limb measured vertically. A **similar** fold preserves the shape of the profile at every level, so that the layer thickness measured parallel to the axial surface is constant and the hinge is thinned in the same proportion as the limb. A **tangential-longitudinal maintenance** fold preserves the length of lines drawn perpendicular to the bedding. Real folds fall between the end members, and Ramsay's classification by the ratio of orthogonal to axial-surface thickness, $t_\alpha/t_\beta$, orders them on a continuous scale from class 1A (strongly thickened hinge) through class 2 (similar) to class 3 (strongly thinned hinge).
:::

::: example Measuring a fold from a map {#ex-fold-map}
A resistant limestone forms a 900-m-wide outcrop band on a horizontal plain, and the bed dips $35^\circ$ throughout. Find the orthogonal thickness of the bed. A borehole drilled on the same limb, 1.5 km up-dip along the surface from the band's northern edge, hits the top of the bed at what depth? And if the band is the limb of a chevron fold with vertical axial planes, what shortening does the dip imply?
::: solution
On horizontal ground the outcrop width of a band is the thickness divided by the sine of the dip, $w = t/\sin\delta$, because the band is the hypotenuse of a right triangle whose vertical side is the thickness. Therefore
$$
t = w\sin\delta = 900\times\sin35^\circ = 900\times0.574 = 516\ \mathrm{m}.
$$
Along the limb the bed descends at the dip angle, so a surface distance of $1500\ \mathrm{m}$ up-dip corresponds to a depth of
$$
z = 1500\tan35^\circ = 1500\times0.700 = 1050\ \mathrm{m}.
$$
For a chevron fold with vertical axial planes the shortening is $s = 1 - \cos\delta = 1 - 0.819 = 0.18$, eighteen per cent.

Three cautions are built into these numbers. The outcrop-width formula assumes horizontal ground and a constant dip; on a hillside the correct construction uses structure contours, and the error can be a factor of two. The depth calculation assumes the dip is unchanged over 1.5 km, which a fold by definition does not do. And the shortening formula assumes a chevron with no layer-parallel shortening before buckling and no thickening at the hinge, so the true shortening is larger. Fold geometry from a map alone is under-determined, and the dip isogrid, a structure-contour map, or a single valley incising the structure is what resolves it.
:::
:::

::: quiz
The hinge of a tight fold in a thick limestone is crowded with quartz veins perpendicular to the bedding, and the same bed on its limbs has none. What does that record?
- [x] Tangential-longitudinal extension at the hinge, which opened the beds perpendicular to themselves.
- [ ] Layer-parallel shortening, which squeezed fluid out of the limbs.
- [ ] A later fault that happened to pass through the hinge.
- [ ] Compaction during burial, focused where the bed was thickest.
::: solution
In a parallel fold the arc length along the bed is preserved, so a line drawn across the bed through the hinge must lengthen by $t/\rho$. That extension is perpendicular to the bedding and is concentrated where the curvature is greatest, and it opens veins exactly there. The absence of veins on the limbs, where $t/\rho$ vanishes, is the diagnostic observation: a regional or compactional cause would not be so precisely geometric.
:::
:::

## Tangential-longitudinal strain

::: proposition Tangential-longitudinal extension {#prop-tl}
In a **parallel** fold, the arc length measured along a bed through the hinge is preserved, because the bed neither stretches nor shortens along itself. A line drawn perpendicular to the bed through the hinge — a **tangential-longitudinal** line, TL — must therefore lengthen to accommodate the curvature, and its extension is
$$
e_{TL} = \frac{t}{\rho},
$$
where $t$ is the orthogonal layer thickness and $\rho$ the radius of curvature of the hinge. The extension is greatest where the curvature is greatest, and it vanishes on the limbs.
:::

::: proof
Take a bed of thickness $t$ bent into a circular arc of radius $\rho$ measured to its mid-surface, subtending an angle $\phi$. The inner surface has arc length $\rho_-\phi = (\rho - t/2)\phi$ and the outer $(\rho + t/2)\phi$, so the difference in arc length between the two surfaces is $t\phi$. Since the mid-surface arc length $\rho\phi$ is preserved, the outer surface must have been stretched relative to the inner by $t\phi$ over a length $\rho\phi$, giving a shear of $t/\rho$ between adjacent layers. Because the layers cannot slide freely past one another in a stack, that shear appears as a lengthening of the lines that cross the layers: the TL lines. Equivalently, the outer arc is longer than the inner by the fraction $t/\rho$ of the mid-surface arc, and this is the extension that must be taken up by TL stretching.
:::

::: example How much does a fold hinge open? {#ex-tl}
A 60-m-thick competent bed is folded into an anticline with a hinge radius of curvature of 120 m. Find the tangential-longitudinal extension at the hinge, and describe the structures it produces.
::: solution
$$
e_{TL} = \frac{t}{\rho} = \frac{60}{120} = 0.50,
$$
fifty per cent extension at the hinge, decreasing to nothing along the limbs. That is far more than any rock can take by homogeneous stretching, so it is localised: **extension veins** and **tension gashes** open perpendicular to the bedding on the outer arc of the hinge, and the fold hinge becomes a site of mineralisation, of stylolite-free limestone, and of enhanced permeability. The classic examples are the quartz veins in the hinges of tight folds in the Swiss Alps and the Appalachians, and the ore shoots of many vein deposits lie exactly where $t/\rho$ was largest.

The construction also gives a way of measuring curvature in the field. Where a fold has extension veins whose aperture can be measured, and the bed thickness is known, $e_{TL}$ gives $\rho$ directly, and the radius of curvature of a fold is otherwise a nuisance to measure.
:::
:::

::: widget plot
f: t/x
x: 20, 1000
y: 0, 3
sliders: t=60:5:400:5
labels: \text{hinge extension}
caption: The tangential-longitudinal extension $e_{TL} = t/\rho$ at the hinge of a parallel fold, plotted against the hinge radius of curvature $\rho$ for a layer thickness $t$ set by the slider. The relation is a rectangular hyperbola, so a fold becomes exponentially harder to tighten as it closes: a 60-m bed folded to a 120-m radius needs fifty per cent hinge extension, and folded to a 30-m radius needs two hundred per cent. Beyond about $t/\rho \approx 1$ the assumption of a parallel fold fails altogether, the hinge must thin, and the fold becomes class 2 or class 3 — which is why tight folds in thick competent beds are rare and why tight folds are usually found in thin beds or in weak rocks.
:::

::: history
Folds were the first structures to be argued about. Horace-Bénédict de Saussure and then Albrecht von Haller described the great recumbent folds of the Alps, and the nineteenth-century dispute over whether they were primary or the product of later flattening was not settled for a century. Edward Suess (Suess) gave the first mechanical account in terms of a contracting Earth and a crust that wrinkled under its own weight, and his term *Bausand* — a swelling — survives in the concept of a swelling or flow fold. The decisive observational work was done in the field: Rich's 1934 analysis of the Pennsylvania coal fields established chevron folding as a distinct style, and the Swiss and Austrian schools — the Aubert, the Argand, and above all the Bernhard Stoiber and Arnold Altschacher school of saltdome tectonics — established the role of evaporites and of detachment. The theoretical apparatus arrived from engineering in the 1950s and 1960s: Maurice Biot (Biot) solved the buckling of a viscous layer in a viscous matrix in 1957 and 1961, and his dominant-wavelength formula is still the equation a structural geologist writes down first; Currie, Patnode and Ford gave the elastic treatment in 1962; and John Ramsay (Ramsay) supplied in *The Formation of Folds* of 1967 the descriptive vocabulary, the tangent graphical construction, the classification by $t_\alpha/t_\beta$, and the strain analysis that made folds quantitative. The final synthesis, and the one that still governs the practice of the subject, is the 1994 treatise of Martin Johnson and David Fletcher, which showed that the whole range of fold geometries follows from a handful of rheological end members and a set of boundary conditions.
:::

## Why folds have the wavelength they have

::: proposition Buckling of a competent layer {#prop-buckle}
A layer of thickness $h$ and viscosity $\eta_1$, embedded in a matrix of viscosity $\eta_m$ and shortened parallel to its length, becomes unstable to a sinusoidal perturbation. The perturbation grows exponentially in time, and the wavelength that grows fastest is
$$
\lambda_\text{max} = 2\pi h\left(\frac{\eta_1}{6\eta_m}\right)^{1/3}.
$$
The dominant wavelength is therefore proportional to the layer thickness and to the cube root of the viscosity contrast, and independent of the amount of shortening.
:::

::: example Estimating a viscosity contrast {#ex-buckle-use}
Ripple laminae in a quartzite are folded with a dominant wavelength of 4 cm, and the competent layer is 3 mm thick. Estimate the viscosity contrast between the layer and its matrix, and comment.
::: solution
$$
\frac{\eta_1}{\eta_m} = 6\left(\frac{\lambda}{2\pi h}\right)^{3} = 6\left(\frac{40}{2\pi\times3}\right)^{3} = 6\times(2.122)^{3} = 6\times9.56 = 57 .
$$
A contrast of about sixty. That is a plausible number for a slightly quartz-rich bed in a micaceous matrix, and it is the kind of estimate that makes folding a rheometer.

The caveats are severe and worth stating. The formula gives the wavelength of **maximum growth rate at the onset of buckling**, and folds grow, interact, and coalesce, so an observed wavelength is usually larger than the initial one and the viscosity contrast is systematically overestimated. The theory assumes a Newtonian matrix, an isolated single layer, and no layer-parallel shortening; real rocks have power-law matrices, multiple layers at spacing comparable to the wavelength, and tens of per cent of shortening before buckling becomes visible. The honest statement is that the layer was between ten and a hundred times more competent than its matrix — which is still a real measurement, and one that no other method supplies.
:::
:::

## Superposition and interference

::: definition Refolded and interference structures {#def-interference}
A fold that deforms an earlier fold is a **refolded** or **superposed** fold, and the geometry of the interference pattern records the angle between the two shortening directions and the amount of each. Ghosh's classification orders the patterns by the relative competence of the two events: type 1 interference gives dome-and-basin patterns of the classic "egg-box" type when the two shortening directions are at right angles and the second fold is gentle; type 2 gives the hook and boomerang patterns of a tight second fold; and type 3 gives the complex patterns of two tight folds. A **sheath fold**, in which the hinge line lies in the foliation and the fold closes on itself, records non-coaxial flow in a shear zone.
:::

::: example Reading an interference pattern {#ex-interference}
A terrain maps closed elliptical outcrop patterns 2 km across, plunging gently east, overprinted by open north–south trending folds with a 5-km wavelength whose axial planes dip $80^\circ$ east. The first-generation foliation is folded around the second-generation hinges. Interpret.
::: solution
Two deformations. The **first** produced the east–west trending, gently plunging tight folds and the axial-planar foliation; the closed elliptical outcrops and the gentle plunge make them **dome-and-basin** structures, which means the first shortening was roughly horizontal in a north–south direction and the fold population is doubly plunging. The **second** produced open north–south folds with steep east-dipping axial planes, which requires a horizontal shortening trending east–west, and it **refolded the first-generation foliation**, so it is younger.

The two shortenings are at right angles, and the pattern is Ghosh type 1 or 2 depending on the tightness. Geologically this is the classic signature of orthogonal convergence or of a change in boundary conditions during a single orogeny — the Alps, the Himalaya and the Caledonides of northern Scotland all show it. The practical consequence is that a map of such a terrain cannot be read as one structure: the fold hinges of the first generation are themselves folded, so their apparent trend and plunge are not their original ones, and a structural analysis must restore the second deformation before the first can be measured.
:::
:::

::: warning A fold shape is not a strain estimate
The two most tempting inferences from a fold are both usually wrong. The first is that the shortening across a fold equals $1 - \cos\delta$ for the limb dip $\delta$: that formula assumes a chevron fold with vertical axial planes, no layer-parallel shortening, no thickening of the hinge, and no material transfer, and it can be wrong by a factor of two. The second is that the fold's wavelength records the shortening: it records the layer thickness and the viscosity contrast, and it is essentially independent of how much shortening has occurred once the fold has grown.

The defensible route to a shortening estimate is to find an independent constraint on the original length — a palaeogeographic marker, a restored cross-section that balances, a comparison with an undeformed equivalent formation, or a palaeomagnetic rotation — and to check that the fold geometry is consistent with it. Where none exists, the correct statement is that the rock has been shortened, that the shortening is greater than the difference between the present and restored bed lengths, and that its magnitude is unknown.
:::

## Where this leads

The buckling mechanics are worked out from the rheology in [[structural-geology/rheology]]; the folds that a fault makes are in [[structural-geology/fractures-faults]]; the folds of a shear zone are in [[structural-geology/shear-zones]]; the map patterns are read in [[structural-geology/maps-sections]]; and the orogenic context is in [[structural-geology/orogens]].

::: summary
- A fold is described by its hinge, limbs, axial surface, interlimb angle and wavelength; parallel folds preserve bed thickness, similar folds preserve profile shape.
- Tangential-longitudinal extension at a fold hinge is $t/\rho$, and it is the reason fold hinges are the sites of veins, ore shoots and fracture permeability.
- The dominant buckling wavelength is $2\pi h(\eta_1/6\eta_m)^{1/3}$, so wavelength measures layer thickness and the cube root of the viscosity contrast, not shortening.
- Folds grow through layer-parallel shortening, then buckling, then limb rotation and hinge migration; the stage they reached records the amount of shortening and the rheology.
- Superposed folds record changes in the shortening direction and must be separated before either generation can be measured.
- Fold shape alone does not determine shortening; an independent constraint on the original length is required.
:::

## Exercises

::: exercise Fold terminology {level=1}
A fold has an interlimb angle of 25°. Is it open, close or tight, and what class of fold is it likely to be?
::: solution
With an interlimb angle of $25^\circ$ it is **tight**. Tight folds require either a small layer thickness relative to the radius of curvature, or a weak or mobile layer that can flow, or a class 2 or class 3 geometry in which the hinge has thinned; a thick competent bed cannot be folded tight without either extending its hinge by more than 100 % or faulting.
:::
:::

::: exercise Tangential-longitudinal strain {level=1 check="0.25"}
A 40-m bed is folded with a hinge radius of 160 m. Find $e_{TL}$.
::: solution
$e_{TL} = t/\rho = 40/160 = 0.25$, twenty-five per cent extension at the hinge.
:::
:::

::: exercise Chevron shortening {level=1 check="0.5"}
A chevron fold has limbs dipping $60^\circ$ and vertical axial planes. Estimate the shortening.
::: solution
$s = 1 - \cos60^\circ = 1 - 0.5 = 0.50$, fifty per cent shortening. The formula assumes no layer-parallel shortening before buckling and no thickening at the hinge, so the true shortening is larger.
:::
:::

::: exercise Wavelength {level=2 check="207"}
A layer 6 mm thick with a viscosity a thousand times that of its matrix buckles with what dominant wavelength, in mm?
::: solution
$\lambda = 2\pi h(\eta_1/6\eta_m)^{1/3} = 2\pi\times6\times(1000/6)^{1/3} = 37.7\times5.503 = 207\ \mathrm{mm}$, about 21 cm. Note the leverage of the cube root: a thousandfold change in viscosity contrast is worth a factor of ten in wavelength, and a hundredfold change of layer thickness is worth a hundredfold change in wavelength. Folding is therefore a far better measure of bed thickness than of rheology.
:::
:::

::: exercise Radius of curvature {level=2 check="80"}
Extension veins at the hinge of a folded 20-m bed record 25 per cent tangential-longitudinal extension. What is the hinge radius of curvature, in metres?
::: solution
$\rho = t/e_{TL} = 20/0.25 = 80\ \mathrm{m}$. The measurement is a genuine curvature gauge, provided the veins opened by TL extension and not by a later, unrelated fracture event — which is tested by checking that the vein density falls to nothing along the limbs, exactly where $t/\rho$ does.
:::
:::

::: exercise Fold class {level=2}
Measured orthogonal layer thicknesses in a fold are 1.00 m at the hinge and 0.70 m on the limb, measured perpendicular to the axial surface. What is the fold class and what does it imply about the mechanism?
::: solution
The ratio $t_\alpha/t_\beta$ of orthogonal to axial-surface thickness is $1.00/0.70 = 1.43$, which is greater than one and therefore **class 1**: the hinge is thicker than the limb measured parallel to the axial surface, and the fold is approximately parallel (concentric). The mechanism must have involved flexural slip or flexural flow, because a parallel fold requires no layer-parallel extension or shortening — the beds slide past one another on the limbs, which is why slickensides and drag folds along bed contacts are the diagnostic evidence of class 1 folding.
:::
:::

::: exercise Flexural slip {level=2}
In a parallel fold of a sandstone-shale sequence, the sandstone beds carry slickensides on their contacts with the shale, and small asymmetric folds of the shale lie on the sandstone surfaces. What do the slickensides record and what do the small folds record?
::: solution
Both record **flexural slip**: as a parallel fold tightens, adjacent beds slide past one another on the limbs, by an amount that increases with the dip of the limb and vanishes at the hinge. The slickensides give the slip direction, which lies in the bedding and is perpendicular to the fold hinge — and the small asymmetric folds of the shale are **drag folds** whose hinges point in the direction of relative movement of the sandstone above them. Together they give the sense of slip on each limb, and therefore the position of the hinge, which is the standard way of confirming a fold interpretation where the hinge itself is not exposed.
:::
:::

::: exercise Growth of a fold {level=3}
A fold's amplitude grows with time as $a = a_0 e^{t/\tau}$ during the buckling stage. If the initial amplitude is 1 mm, the fold has reached 1 m today, and the shortening rate has been constant, how many e-foldings of growth have occurred, and why does the exponential stage end?
::: solution
The number of e-foldings is $\ln(a/a_0) = \ln(1000/1) = 6.9$. Six or seven e-foldings is typical: the initial perturbation need only be a millimetre, and the fold grows to a metre in seven e-foldings, which is why folds so commonly preserve relict evidence of an earlier, larger wavelength in their cores.

The exponential stage ends for three reasons, and all three are visible in the field. The fold amplitude becomes comparable with the wavelength, so the linear theory that gives exponential growth no longer applies and growth slows. The limbs rotate towards the shortening direction, which reduces the component of shortening driving the buckling and transfers the strain to layer-parallel shortening of the limbs. And the layers may fault, at which point the fold grows by limb rotation about hinges rather than by amplification of the original perturbation. A fold whose limbs are vertical and whose hinge is rounded has usually passed through all three stages, and its amplitude is therefore not a measure of the shortening.
:::
:::

::: exercise Three-dimensional geometry {level=3}
A bed dips $40^\circ$ due north at locality A, $40^\circ$ due south at locality B, 3 km due south of A, and $40^\circ$ toward N 5° W at locality C, 2 km due east of A. Interpret the structure and find the plunge of the hinge.
::: solution
Equal and opposite dips on a north–south line mean the hinge trends east–west between the two localities, and because the beds dip **away** from the intervening strip the structure is an **anticline**. The wavelength is at least 6 km, since the two hinges lie beyond A and B.

At C, which lies on the same limb and on a line parallel to the hinge, the dip has the same magnitude but its direction has swung $5^\circ$ to the west of north. The dip vector therefore has a northward component of $40^\circ$ and a westward component $\beta$ with
$$
\tan 5^\circ = \frac{\beta}{40} \quad\Longrightarrow\quad \beta = 40\times0.0875 = 3.5^\circ .
$$
A westward component of dip on a limb means the hinge **plunges west** at about $3.5^\circ$. The construction is the standard dip-vector or pole-to-a-plane method, and the exact treatment plots the two poles on an equal-angle net and measures the angle between them; the small-angle arithmetic above is good to a few tenths of a degree for a plunge this gentle.

Note what the three readings do **not** give: the amplitude, the true wavelength, or whether the structure is an anticline rather than a syncline. The last requires a younging direction, a facing criterion, or a borehole, and it is the single most consequential fact to establish before any interpretation is attempted.
:::
:::
