Stress cannot be measured in a rock; strain can. Nobody has ever put a gauge into a fold, but anyone with a thin section can measure the ratio of the long axis to the short axis of a deformed ooid, and that number is a component of the strain tensor. The whole of structural geology rests on this asymmetry: the observable is geometry, and stress enters only through a rheology that must be supplied from elsewhere. This chapter is about describing geometry exactly, because a deformation that cannot be described cannot be interpreted.

## Displacement, and what part of it is strain

::: definition Displacement gradient, rotation and strain {#def-displacement-gradient}
Let a material point move from $\mathbf{x}$ to $\mathbf{x}' = \mathbf{x} + \mathbf{u}(\mathbf{x})$, where $\mathbf{u}$ is the **displacement**. The displacement gradient is $H_{ij} = \partial u_i/\partial x_j$, and it decomposes uniquely into a symmetric and an antisymmetric part,
$$
H_{ij} = \underbrace{\tfrac12\left(\frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}\right)}_{e_{ij}\ \text{strain}} \; + \; \underbrace{\tfrac12\left(\frac{\partial u_i}{\partial x_j} - \frac{\partial u_j}{\partial x_i}\right)}_{\omega_{ij}\ \text{rotation}} .
$$
For small displacements the **infinitesimal strain tensor** is
$$
e_{xx} = \frac{\partial u}{\partial x}, \qquad
e_{xy} = \tfrac12\left(\frac{\partial u}{\partial y} + \frac{\partial v}{\partial x}\right),
$$
and the **engineering shear strain** is $\gamma_{xy} = 2e_{xy} = \partial u/\partial y + \partial v/\partial x$.
:::

::: proposition Rigid rotation is not strain {#prop-rotation}
A displacement field that is a rigid translation and rotation produces $e_{ij} = 0$, and conversely a deformation with $e_{ij} = 0$ everywhere in a connected body is a rigid motion. Strain is therefore what remains of the displacement gradient after the rotation has been removed, and a body may be displaced by hundreds of kilometres and remain unstrained.
:::

::: proof
A rigid motion has $\mathbf{u} = \mathbf{a} + \boldsymbol{\Omega}\mathbf{x}$ with $\boldsymbol{\Omega}$ constant and antisymmetric, so $H_{ij} = \Omega_{ij}$ and the symmetric part vanishes. Conversely, if $e_{ij} = 0$ then $H_{ij} = \omega_{ij}$ is constant wherever the field is differentiable, so the motion is rigid. The physical content is that the symmetric part measures the change in the *distance between neighbouring points*: for two points separated by $\mathrm{d}\mathbf{x}$,
$$
|\mathrm{d}\mathbf{x}'|^2 - |\mathrm{d}\mathbf{x}|^2 = 2\,e_{ij}\,\mathrm{d}x_i\,\mathrm{d}x_j ,
$$
so the strain is exactly, and only, the change in length. This is why strain can be measured from a deformed object and stress cannot: an object remembers its change of shape, not the force that caused it.
:::

::: definition Principal strains, dilatation and the strain ellipsoid {#def-principal-strain}
The strain tensor is symmetric and therefore has three real eigenvalues $e_1 \geq e_2 \geq e_3$, the **principal strains**, along mutually perpendicular directions that suffer no shear. The **dilatation** is the trace,
$$
\Delta = e_{kk} = e_1 + e_2 + e_3 = \frac{\delta V}{V},
$$
and the deviatoric part $e_{ij} - \tfrac13\Delta\delta_{ij}$ describes the change of shape at constant volume. A sphere of material becomes an **ellipsoid of strain** with semi-axes in the ratios $\lambda_1 : \lambda_2 : \lambda_3$, where the **stretch** $\lambda_i = 1 + e_i$ is the ratio of final to initial length. The **natural** or true strain is $\varepsilon_i = \ln\lambda_i$, which has the property that the total strain of two successive deformations is the sum, and which is the measure used when strains are large.
:::

## Pure shear and simple shear

::: definition The two end-member deformations {#def-pure-simple}
A **pure shear** is a coaxial deformation: the principal strain axes do not rotate during the deformation, there is no shear on the principal planes, and the strain accumulates along fixed directions. It is the idealisation of layer-parallel shortening, of necking, and of the strain in the core of a fold. A **simple shear** is non-coaxial: material planes slide past one another like a pack of cards, the principal strain axes rotate continuously towards the shear direction, and there is a set of planes — the shear planes — that are neither stretched nor rotated. It is the idealisation of fault zones, of mylonites, and of the flow in a ductile shear band.
:::

::: proposition Stretch in a simple shear {#prop-simpleshear}
Take a simple shear of shear strain $\gamma$ in which a point $(x, y)$ moves to $(x + \gamma y,\, y)$. A material line originally of length $l$ and making an angle $\theta$ with the shear direction becomes a line of length $l'$ making an angle $\theta'$ given by
$$
\lambda' \equiv \left(\frac{l'}{l}\right)^{2} = 1 + \gamma\sin 2\theta + \gamma^{2}\sin^{2}\theta,
\qquad
\tan\theta' = \frac{\sin\theta}{\cos\theta + \gamma\sin\theta} .
$$
Lines initially at $\theta = 0$ are unstretched, lines at $\theta = 90^\circ$ are stretched by $\sqrt{1+\gamma^2}$, and the deformation has unit area: $\det\mathbf{F} = 1$.
:::

::: proof
The line has direction vector $(\cos\theta, \sin\theta)$, and the deformation gradient is $\mathbf{F} = \begin{pmatrix} 1 & \gamma \\ 0 & 1\end{pmatrix}$, so its image is $(\cos\theta + \gamma\sin\theta, \sin\theta)$. Squaring and using $2\sin\theta\cos\theta = \sin2\theta$ gives $\lambda'$; taking the ratio of components gives $\tan\theta'$. The determinant of $\mathbf{F}$ is 1 whatever $\gamma$ is, so simple shear is volume-preserving — which is why a mylonite zone can accommodate metres of displacement without any change in the density of the rock, and why the "flow foliation" of a mylonite is a shear-plane trace and not a compaction surface.
:::

::: example Simple shear at $\gamma = 1$ {#ex-simple1}
A porphyroblast and a set of originally circular quartz grains lie in a rock that has suffered a simple shear of $\gamma = 1$. Find the principal stretches and their orientations, the axial ratio of the strain ellipse, the final angle of a line that started at $45^\circ$ to the shear direction, and the equivalent pure shear.
::: solution
The deformation gradient is $\mathbf{F} = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$ and the stretch tensor is $\mathbf{C} = \mathbf{F}^{\mathsf T}\mathbf{F} = \begin{pmatrix} 1 & 1 \\ 1 & 2\end{pmatrix}$, with eigenvalues $2.618$ and $0.382$. The principal stretches are therefore
$$
\lambda_1 = \sqrt{2.618} = 1.618, \qquad \lambda_3 = \sqrt{0.382} = 0.618,
$$
whose product is 1.000, as volume preservation requires, and whose axial ratio is $R_s = 1.618/0.618 = 2.62$. The extension direction makes $58.3^\circ$ with the shear direction — not $45^\circ$, which is the answer intuition offers and which is wrong: the maximum extension has already rotated towards the shear plane.

A line that started at $45^\circ$ ends at
$$
\tan\theta' = \frac{\sin 45^\circ}{\cos 45^\circ + 1\times\sin 45^\circ} = \frac{1}{1+1} = \tfrac12, \qquad \theta' = 26.6^\circ,
$$
and its stretch is $\lambda' = 1 + \sin 90^\circ + \sin^2 45^\circ = 2.50$, so it has lengthened by a factor of 1.58 while rotating $18^\circ$ towards the shear direction.

The equivalent pure shear — the coaxial deformation with the same strain ellipsoid — has $\lambda_1/\lambda_3 = R_s = 2.62$, and by the Jeffery relation the simple shear that produces it is
$$
\gamma_s = \sqrt{R_s} - \frac{1}{\sqrt{R_s}} = 1.618 - 0.618 = 1.00,
$$
as it must. The relation is worth memorising in that form, because it is the standard conversion between the shear strain measured in a mylonite and the axial ratio measured in a deformed ooid, and it shows that a rock with an apparent axial ratio of only 2.6 has been sheared by an amount comparable to its own length.
:::
:::

::: widget parametric
fx: cos(t) + g*sin(t)
fy: sin(t)
t: 0, 2pi
x: -2.2, 2.2
y: -1.4, 1.4
equal: true
sliders: g=1.0:0:3:0.05
caption: A circle of material deformed by simple shear of amount $g$. At $g = 0$ it is a circle; at $g = 1$ it is the ellipse of [[#ex-simple1]], with axial ratio 2.62 and its long axis at $58^\circ$ to the shear direction rather than at $45^\circ$. Drag the slider and watch two things happen at once: the ellipse grows more and more elongate, and it rotates steadily towards horizontal. That rotation is the whole difference between coaxial and non-coaxial deformation — in a pure shear the ellipse keeps its orientation and simply grows, whereas here it spins, and any object with a shape inside it (a porphyroclast, a fossil, a folded vein) records that spin in its internal geometry.
:::

::: quiz
A quartz grain in a mylonite has an axial ratio of 3.0. The same rock contains a chert pebble with an axial ratio of 1.3. What do the two numbers measure?
- [ ] Both measure the finite strain of the rock; the difference is analytical error.
- [x] The ooid-like quartz grain approximates the matrix strain; the competent pebble records much less than the matrix strain.
- [ ] The pebble is the better strain marker, because it is more resistant to later alteration.
- [ ] Neither can be used; only the foliation spacing records strain.
::: solution
A competent object deforms far less than the matrix around it, because the strain is partitioned into the weaker phase; a chert pebble in a schist therefore gives a lower bound and not an estimate. A quartz grain in a quartz-rich matrix is close in rheology to its surroundings and deforms largely by crystal plasticity, so its shape is a much better strain marker — subject to the caveats about pressure solution and grain-size-sensitive flattening. Foliation spacing records strain only through a layer-parallel-shortening model that has to be justified separately.
:::
:::

## Measuring strain from a rock

::: example Deformed ooids {#ex-ooids}
Ooids in a deformed limestone are elliptical with an axial ratio $R_{fs} = 3.0$ in the section perpendicular to the fold axis. Assuming they were originally spherical, that this section contains the maximum and minimum principal stretches, and that the strain in it is plane strain with no stretching parallel to the fold axis, find the principal stretches, the shortening perpendicular to the section, and the shear strain if the deformation was a simple shear with the shear plane parallel to bedding.
::: solution
$R_{fs} = \lambda_1/\lambda_3 = 3.0$, and constant volume in the section gives $\lambda_1\lambda_3 = 1$, so $\lambda_1^2 = 3.0$ and
$$
\lambda_1 = 1.732, \qquad \lambda_3 = 0.577, \qquad \lambda_2 = 1.000 .
$$
The rock has been extended by 73 % in the section and shortened to 58 % of its original thickness perpendicular to it — a shortening of 42 %. As natural strains, $\varepsilon_1 = \ln 1.732 = +0.549$ and $\varepsilon_3 = \ln 0.577 = -0.549$, equal and opposite, which is the arithmetic convenience that makes logarithmic strain worth using.

If the deformation was a simple shear with the shear plane parallel to bedding, the equivalent shear strain is
$$
\gamma = \sqrt{R_s} - \frac{1}{\sqrt{R_s}} = \sqrt{3.0} - \frac{1}{\sqrt{3.0}} = 1.732 - 0.577 = 1.15 .
$$
Over a mylonite zone one metre wide, that is a displacement of 1.15 m; over a shear zone one kilometre wide, 1.15 km. The point of the calculation is the scale-invariance: the strain measured on a hand specimen is the strain of the whole zone, provided the deformation is homogeneous, and this is how the displacements on major ductile shear zones are estimated where no marker bed survives to be offset.
:::
:::

::: example Three sections and a Flinn diagram {#ex-flinn}
Elliptical objects in three mutually perpendicular sections of a deformed conglomerate give axial ratios of 3.0 in the $XY$ section, 4.5 in the $XZ$ section and 1.5 in the $YZ$ section. Find the principal stretches, the Flinn parameter, and the shape of the strain ellipsoid.
::: solution
The three ratios are $a/b = 3.0$, $a/c = 4.5$ and $b/c = 1.5$, and they are mutually consistent because $3.0\times1.5 = 4.5$. Normalising to unit volume, $\lambda_1\lambda_2\lambda_3 = 1$ with $\lambda_1/\lambda_2 = 3$, $\lambda_2/\lambda_3 = 1.5$: writing $\lambda_3 = t$ gives $\lambda_2 = 1.5t$ and $\lambda_1 = 4.5t$, so
$$
4.5t\times1.5t\times t = 6.75\,t^{3} = 1 \quad\Longrightarrow\quad t = 0.523,
$$
and $\lambda_1 = 2.35$, $\lambda_2 = 0.78$, $\lambda_3 = 0.52$.

The Flinn parameter is
$$
k = \frac{a/b}{b/c} = \frac{3.0}{1.5} = 2.0 .
$$
Since $k > 1$ the ellipsoid is **prolate** — cigar-shaped — and the strain is dominated by extension in one direction with shortening distributed over the other two. On a Flinn diagram the point plots above the $k = 1$ line, which is plane strain, and well away from $k = 0$, which is pure flattening. Geologically, prolate strain is the signature of a constrictional regime: the interior of a doubly plunging fold nose, a boudinage field, or a region of orthogonal convergence. Flattening ($k < 1$) is the signature of a flattening regime: a thrust sheet resting on its floor, where the rock is squeezed out perpendicular to shortening but not extended along it.
:::
:::

::: warning A deformed fossil records the strain of the fossil, not of the rock
The whole method of the two examples above rests on the assumption that the object was originally spherical, or originally circular in a known section, and that it deformed **passively** — that is, with exactly the strain of the surrounding matrix. Both assumptions fail in predictable ways. Ooids and ooliths flatten by pressure solution at their contacts and by internal twinning, and they can develop an axial ratio of two with no more than a few per cent of matrix strain. Spherical objects in a matrix of much different viscosity rotate and deform less than the matrix around them, so a competent pebble underestimates the strain and a pressure-solution-flattened one overestimates it. And a fossil with an original bilateral symmetry — an ammonite, a brachiopod — has a shape that is not a sphere to begin with, and its deformation cannot be separated from its ontogeny without a population.

The defensible procedure is to measure many objects of several kinds, to look for the consistency between them, and to prefer objects that deformed by crystal-plastic processes in a matrix of the same composition: quartz grains in a quartzite, calcite grains in a pure limestone, and magnetite in a magnetite quartzite. Where the strain is large, the safest measurement is not the shape of a grain but the **orientation of a fabric**, which records the geometry of the flow even when the magnitude cannot be recovered.
:::

::: history
The mathematics of strain belongs to elasticity: Navier and Cauchy set down the strain tensor in the 1820s, and Saint-Venant showed in 1843 that the six strain components cannot be chosen arbitrarily but must satisfy compatibility conditions — the reason a geologist cannot assign any strain field to a folded layer and expect it to close. The geological discovery came from the opposite direction and much later. Henry Clifton Sorby (Sorby) showed in 1858 that the slaty cleavage of North Wales is a fabric of aligned chlorite and mica and not a plane of parting, and Joseph Prestwich and Charles Lapworth were meanwhile mapping the deformation of Silurian graptolites as a stratigraphic tool. The decisive step was Alfred Harker's (Harker) observation of 1888 that the elliptical ooids and ooliths of some limestones had been rotated and stretched, and that their axial ratio and orientation could be measured and used — the first finite-strain measurement in geology, and the origin of the whole discipline of strain analysis. Hans Cloos (Cloos) introduced the term and the concept of the strain ellipsoid into structural petrology in 1921, and the modern quantitative treatment dates from the 1950s and 1960s: the strain and flow nets of Hans Ramberg and of Hans Zwart, the injection methods and the graphical techniques of John Ramsay (Ramsay), whose 1967 *The Formation of Folds* made the strain ellipse a routine field measurement, and the Flinn diagram of Edward Flinn (Flinn) of 1962, which reduced the shape of a three-dimensional strain to a single number. The recognition that non-coaxial flow — simple shear — is the rule rather than the exception in the crust came from the mylonite studies of the 1970s and from the shear-sense criteria of Michael O'Hara Gray and Bill Simpson, and it transformed structural geology from a study of shapes into a study of motion.
:::

## Strain rate

::: definition Strain rate {#def-strain-rate}
The strain rate is the time derivative of strain, $\dot{e}_{ij} = \partial e_{ij}/\partial t$, with units of $\mathrm{s^{-1}}$. Geological strain rates are extraordinarily small: $1\ \mathrm{Myr^{-1}} = 3.2\times10^{-14}\ \mathrm{s^{-1}}$, and typical intraplate and orogenic interior values are $10^{-15}$ to $10^{-13}\ \mathrm{s^{-1}}$. A crust deforming at $10^{-14}\ \mathrm{s^{-1}}$ accumulates a strain of one in $10^{14}\ \mathrm{s}$, which is three million years — and this is why rock strengths measured in a laboratory at $10^{-6}\ \mathrm{s^{-1}}$ have almost nothing to do with the strength of the crust.
:::

::: example How fast is the crust deforming? {#ex-strainrate}
A 20-km-thick shear zone accommodates 100 km of displacement in 5 Myr. Find the average strain rate, and the stress in a quartz mylonite at $400^\circ\mathrm{C}$ if the flow law is $\dot{\varepsilon} = A\sigma^{n}$ with $n = 3$ and $A = 1.2\times10^{-13}\ \mathrm{MPa^{-3}\,s^{-1}}$.
::: solution
The strain is $\gamma = 100/20 = 5$ over $5\times10^{6}\ \mathrm{yr} = 1.58\times10^{14}\ \mathrm{s}$, so
$$
\dot{\gamma} = \frac{5}{1.58\times10^{14}} = 3.2\times10^{-14}\ \mathrm{s^{-1}} .
$$
Inverting the flow law,
$$
\sigma = \left(\frac{\dot{\varepsilon}}{A}\right)^{1/n} = \left(\frac{3.2\times10^{-14}}{1.2\times10^{-13}}\right)^{1/3} = 0.267^{1/3} = 0.64\ \mathrm{MPa}.
$$
That is a spectacularly small stress — two orders of magnitude below Byerlee friction — and it is the reason mylonites form at all. Note the leverage of the exponent: if the strain rate were a thousand times higher, the stress would rise by only $1000^{1/3} = 10$, to $6.4\ \mathrm{MPa}$. A power-law material with $n = 3$ is therefore extremely insensitive to how fast it is being deformed, which is why the same mylonitic fabric forms in a shear zone that has been active for a million years and in one that has been active for a hundred thousand.
:::
:::

::: widget plot
f: 20240*exp(0.76754*x)
x: -16, -11
y: 0, 5
labels: \text{differential stress}
caption: The differential stress, in megapascals, required to drive a quartz-rich mylonite at a strain rate $\dot\varepsilon$, plotted against $x = \log_{10}\dot\varepsilon$ in $\mathrm{s^{-1}}$, for a power-law flow with stress exponent three. Because the relation is a cube root, five orders of magnitude of strain rate, from $10^{-16}$ to $10^{-11}\ \mathrm{s^{-1}}$, span a factor of only eight in stress, from $0.09$ to $4.4\ \mathrm{MPa}$. This is the single most important fact about the rheology of the crust, and it is why structural geologists can say that the crust deforms at stresses of tens of megapascals without ever measuring a stress directly.
:::

## Where this leads

The stress that produces these strains, and the friction that limits it, are in [[structural-geology/stress]]; the flow laws that connect the two are in [[structural-geology/rheology]]; the geometries that result are in [[structural-geology/folds]] and [[structural-geology/shear-zones]]; and the way strain is mapped in the field is the subject of [[structural-geology/maps-sections]].

::: summary
- Strain is the symmetric part of the displacement gradient; rigid rotation and translation contribute nothing to it.
- Strain is measurable and stress is not, which is why the whole subject is built on geometry and a supplied rheology.
- Principal stretches $\lambda_i$ and natural strains $\ln\lambda_i$ are the useful measures at large deformation; the dilatation is the volume change.
- Pure shear is coaxial and simple shear is not; in simple shear the strain ellipse rotates towards the shear direction as it grows.
- Simple shear preserves volume, and the equivalent coaxial strain has $\gamma = \sqrt{R_s} - 1/\sqrt{R_s}$.
- Strain measured from deformed objects assumes the objects were originally equant and deformed passively; both assumptions fail in known, correctable ways.
- Geological strain rates are of order $10^{-14}\ \mathrm{s^{-1}}$, and power-law creep at that rate requires stresses far below the frictional strength of the rock.
:::

## Exercises

::: exercise Engineering versus tensorial shear strain {level=1 check="0.5"}
A square of material is deformed so that its top edge moves sideways by half its side length while the bottom edge stays fixed. What is the engineering shear strain $\gamma$?
::: solution
$\gamma = \tan\psi = 0.5$, where $\psi$ is the change in the corner angle. The tensorial component is $e_{xy} = \gamma/2 = 0.25$. The two conventions differ by a factor of two and mixing them is the commonest error in the subject; the engineering value is the one that appears in the simple-shear geometry of this chapter.
:::
:::

::: exercise Natural strain {level=1 check="0.69"}
A layer is stretched to twice its original length. Give the engineering strain and the natural strain.
::: solution
$e = 1.0$ and $\varepsilon = \ln 2 = 0.69$. The advantage of the logarithmic measure appears when the same layer is later shortened back to its original length: the natural strains are $+0.69$ and $-0.69$ and sum to zero, whereas the engineering strains are $+1.0$ and $-0.5$ and sum to $+0.5$, which is nonsense.
:::
:::

::: exercise Dilatation {level=1 check="-0.1"}
A rock deforms with principal stretches $\lambda_1 = 1.4$, $\lambda_2 = 1.0$, $\lambda_3 = 0.64$. Find the volume change.
::: solution
$\lambda_1\lambda_2\lambda_3 = 1.4\times1.0\times0.64 = 0.896$, so the rock has lost 10.4 % of its volume: $\Delta V/V = -0.10$. Such a volume loss cannot be accommodated by elastic stretching and requires either pressure solution, compaction, or the escape of fluid — and finding a dilatancy of ten per cent in a metamorphic rock is therefore direct evidence for mass transfer, which is why the volume-balance calculation of [[structural-geology/rheology]] is done as often as the strain measurement itself.
:::
:::

::: exercise Simple shear {level=2 check="2.24"}
For a simple shear of $\gamma = 2$, by what factor does a line originally at $45^\circ$ to the shear direction lengthen?
::: solution
$\lambda' = 1 + \gamma\sin 2\theta + \gamma^2\sin^2\theta = 1 + 2\times1 + 4\times0.5 = 5.0$, so the length ratio is $\sqrt{5.0} = 2.24$. Note that the cross term $\gamma\sin2\theta$ is positive for $0 < \theta < 90^\circ$: lines in the first quadrant are stretched more than the $\gamma^2$ term alone would suggest, and lines in the second quadrant are shortened by the same term. That asymmetry is what makes a mylonite's porphyroclast population look different on one side of a shear zone from the other.
:::
:::

::: exercise Rotation in simple shear {level=2 check="32"}
In the $\gamma = 1$ shear of [[#ex-simple1]], through what angle does a line originally at $60^\circ$ to the shear direction rotate, and in which sense?
::: solution
$\tan\theta' = \sin 60^\circ/(\cos 60^\circ + \sin 60^\circ) = 0.866/(0.500+0.866) = 0.634$, so $\theta' = 32.3^\circ$. The line has rotated $27.7^\circ$ **towards** the shear direction, which is the diagnostic sense: in a simple shear every line with $0 < \theta < 90^\circ$ rotates towards the shear direction, and lines in the second quadrant rotate towards it from the other side. This is the rotation that produces the "fish" and "sigma" shapes of porphyroclasts and that makes a mylonite's asymmetry a shear-sense indicator.
:::
:::

::: exercise Equivalent pure shear {level=2 check="1.5"}
A mylonite contains deformed ooids with $R_s = 4.0$ in the section that contains the lineation. What simple shear strain does this correspond to?
::: solution
$\gamma = \sqrt{R_s} - 1/\sqrt{R_s} = 2.0 - 0.5 = 1.5$. In a shear zone 200 m wide this is 300 m of displacement. Note that the answer is larger than the axial ratio suggests: an ooid that looks only four times elongate records a shear of one and a half times the width of the zone.
:::
:::

::: exercise Flinn parameter {level=2 check="0.5"}
A conglomerate gives $a/b = 2.0$ and $b/c = 4.0$. Find $k$ and describe the strain ellipsoid.
::: solution
$k = (a/b)/(b/c) = 2.0/4.0 = 0.5$. Since $k < 1$ the ellipsoid is **oblate** — pancake-shaped — and the strain is a flattening: the rock has been shortened much more in one direction than in the other two, and has been extended in the plane of the other two axes. This is the classic strain of a thrust sheet, and it is found where the rock has been squeezed out sideways rather than stretched.
:::
:::

::: exercise Strain rate {level=2 check="32"}
A 5-km-thick crustal layer is shortened by 50 km in 10 Myr. Find the average strain rate in $\mathrm{s^{-1}}$, expressed as a multiple of $10^{-15}\ \mathrm{s^{-1}}$.
::: solution
$\gamma = 50/5 = 10$ over $10^{7}\ \mathrm{yr} = 3.16\times10^{14}\ \mathrm{s}$, so $\dot\varepsilon = 3.2\times10^{-14}\ \mathrm{s^{-1}} = 32\times10^{-15}\ \mathrm{s^{-1}}$. The number is a good calibration point: orogenic shortening at centimetres per year in a layer tens of kilometres thick is always of order $10^{-14}\ \mathrm{s^{-1}}$, whatever the orogen, and that single number is what makes the flow-law calibrations of experimentally deformed quartzite directly applicable to mountains.
:::
:::

::: exercise Passive or not {level=3}
Two layers at the same structural level contain deformed calcite ooids ($R_{fs} = 2.8$) and deformed chert pebbles ($R_{fs} = 1.4$) in the same section. The matrix is a quartz mica schist. Reconcile the two measurements and say which, if either, gives the matrix strain.
::: solution
The two objects have very different viscosities relative to the matrix. A **chert pebble** is far more competent than the schist, so it deforms mainly by rigid rotation and by elastic bending, and it takes up much less strain than the matrix: $R_{fs} = 1.4$ is a lower bound on the matrix strain, not an estimate of it. A **calcite ooid** is close in composition and rheology to the calcite in the matrix and deforms largely by crystal plasticity and pressure solution, so it is close to passive — but calcite ooids are also notorious for flattening by solution transfer at grain contacts, which inflates the ratio.

Neither number is the matrix strain. The defensible route is to measure the matrix itself: the shape-preferred orientation of the quartz grains, the aspect ratio of dynamically recrystallised grains (which scales with the stress and hence, through the flow law, with the strain rate rather than the strain), and above all the **finite strain recovered from a strain marker of matched rheology** — a deformed amygdule, a deformed dyke of similar composition, or a deformed stylolite. Where none exists, the correct statement is that the strain is greater than 1.4 and probably greater than 2.8, and that its magnitude is unknown.
:::
:::

::: exercise Compatibility {level=3}
A field area contains a fold with an axial plane dipping $70^\circ$ and a foliation in its core dipping $10^\circ$. Explain why the two cannot both be the product of a single homogeneous shortening, and give two mechanisms that reconcile them.
::: solution
A homogeneous shortening produces a foliation perpendicular to $\sigma_3$, which for a fold with a steep axial plane is steep. A gently dipping foliation in the core of a steeply plunging fold therefore records either a different deformation or a different stress field, and the two cannot come from one coaxial strain.

**Mechanism one: two deformations.** The steep foliation is the product of layer-parallel shortening during early folding, and the flat foliation is a later crenulation cleavage formed during a second, coaxial shortening — or the other way round, with the flat fabric first and the steep one superposed. The test is overprinting relations in thin section: a crenulation cleavage that refolds the earlier foliation is younger, and the two can be separated and each measured.

**Mechanism two: strain partitioning.** The flat foliation is a **S–C or extensional** fabric formed in a low-angle shear zone that the fold happens to sit in, and the steep axial-plane foliation formed in the fold's core where the local flow was coaxial and the shear component was small. The test is kinematic: the flat fabric should carry a consistent shear sense over kilometres and the steep fabric should not, and the fold should be refolded or truncated by the shear zone.

Both readings are common, and the choice between them decides whether the structure records convergence or extension — which is why a foliation is never, on its own, evidence for anything.
:::
:::
