A voltage between two terminals is a single number. The electric field that produces it is not: at every point in space it has a magnitude and a direction, and both change from place to place. Around a coaxial cable the field points radially outwards and weakens as $1/\rho$; around a power line the magnetic field circles the conductor; inside a waveguide both fields form patterns that repeat along the guide. To describe such fields, compute how much charge lies inside a surface, how much work a field does along a path, or how fast a field "spreads out" or "swirls" at a point, we need the language of vector analysis.

You have met most of the mathematics already in multivariable calculus: see [line integrals](/learn/maths/lesson.php?c=multivariable&l=line-integrals), [surface integrals](/learn/maths/lesson.php?c=multivariable&l=surface-integrals) and [the theorems of Stokes and Gauss](/learn/maths/lesson.php?c=multivariable&l=stokes-divergence) in Maths Atlas. This chapter collects what electromagnetics needs and adds the part that most calculus courses treat lightly: working in **cylindrical** and **spherical** coordinates, where unit vectors change direction from point to point and where most real geometries (wires, cables, spheres, antennas) become simple. We finish with the two integral theorems, which convert the integral form of Maxwell's equations into the differential form, and with the Helmholtz theorem, which tells us why divergence and curl are exactly the right things to know about a field.

## Vectors, components and coordinate systems

A **scalar field** assigns a number to each point, such as the potential $V(x,y,z)$ or the temperature of a conductor. A **vector field** assigns a vector, such as the electric field intensity $\mathbf E(x,y,z)$ in volts per metre. We write vectors in bold, unit vectors as $\mathbf a$ with a subscript naming the direction (the notation of Hayt and Buck), and the magnitude of $\mathbf A$ as $\abs{\mathbf A}$ or simply $A$.

### Cartesian coordinates

In Cartesian coordinates a point is $(x, y, z)$ and a vector is

$$
\mathbf A = A_x\mathbf a_x + A_y\mathbf a_y + A_z\mathbf a_z ,
$$

where $\mathbf a_x$, $\mathbf a_y$, $\mathbf a_z$ are fixed unit vectors forming a right-handed set: $\mathbf a_x\times\mathbf a_y = \mathbf a_z$. The **dot product** $\mathbf A\cdot\mathbf B = A_xB_x + A_yB_y + A_zB_z = AB\cos\theta_{AB}$ projects one vector on another; the **cross product** $\mathbf A\times\mathbf B$ has magnitude $AB\sin\theta_{AB}$ and is perpendicular to both, in the direction given by the right-hand rule. Electromagnetics uses the dot product for work and flux and the cross product for forces on currents and for the direction of power flow.

The vector from a point $P_1$ to a point $P_2$ is the **distance vector** $\mathbf R_{12} = \mathbf r_2 - \mathbf r_1$, where $\mathbf r$ is the **position vector** from the origin. Coulomb's law and the Biot–Savart law are both written with such a vector: from the source point to the field point.

::: example A distance vector and its unit vector {#ex-distance}
Find the vector from $P_1(1, 2, 3)$ to $P_2(4, -2, 3)$, its length, and the unit vector in its direction. Coordinates are in metres.
::: solution
$$
\mathbf R_{12} = (4-1)\mathbf a_x + (-2-2)\mathbf a_y + (3-3)\mathbf a_z = 3\mathbf a_x - 4\mathbf a_y\ \mathrm{m}.
$$

Its length is $R_{12} = \sqrt{3^2 + 4^2} = 5\,\mathrm m$, and the unit vector is $\mathbf a_{R} = \mathbf R_{12}/R_{12} = 0.6\,\mathbf a_x - 0.8\,\mathbf a_y$. A unit vector is dimensionless; the metres stay with the length.
:::
:::

### Cylindrical coordinates

A point is described by $(\rho, \phi, z)$: the distance $\rho \ge 0$ from the $z$-axis, the angle $\phi$ measured from the $x$-axis towards the $y$-axis, and the height $z$. Then

$$
x = \rho\cos\phi,\quad y = \rho\sin\phi,\quad z = z; \qquad \rho = \sqrt{x^2+y^2},\quad \phi = \operatorname{atan2}(y, x).
$$ {#eq-cyl}

The unit vectors $\mathbf a_\rho$ (pointing away from the axis), $\mathbf a_\phi$ (pointing in the direction of increasing $\phi$, tangent to a circle round the axis) and $\mathbf a_z$ are mutually perpendicular and right-handed, $\mathbf a_\rho\times\mathbf a_\phi = \mathbf a_z$. But **$\mathbf a_\rho$ and $\mathbf a_\phi$ depend on $\phi$**:

$$
\mathbf a_\rho = \cos\phi\,\mathbf a_x + \sin\phi\,\mathbf a_y, \qquad \mathbf a_\phi = -\sin\phi\,\mathbf a_x + \cos\phi\,\mathbf a_y .
$$ {#eq-cyl-unit}

To find the cylindrical components of a vector given in Cartesian form, project: $A_\rho = \mathbf A\cdot\mathbf a_\rho = A_x\cos\phi + A_y\sin\phi$ and $A_\phi = \mathbf A\cdot\mathbf a_\phi = -A_x\sin\phi + A_y\cos\phi$.

### Spherical coordinates

A point is $(r, \theta, \phi)$: the distance $r$ from the origin, the **polar angle** $\theta$ from the positive $z$-axis ($0 \le \theta \le \pi$) and the same azimuth $\phi$ as before:

$$
x = r\sin\theta\cos\phi,\quad y = r\sin\theta\sin\phi,\quad z = r\cos\theta .
$$ {#eq-sph}

The unit vectors $\mathbf a_r$ (radially outwards), $\mathbf a_\theta$ (towards increasing $\theta$, "southwards" on a globe whose north pole is on the $z$-axis) and $\mathbf a_\phi$ (eastwards) are right-handed, $\mathbf a_r\times\mathbf a_\theta = \mathbf a_\phi$, and all three vary with position:

$$
\begin{aligned}
\mathbf a_r &= \sin\theta\cos\phi\,\mathbf a_x + \sin\theta\sin\phi\,\mathbf a_y + \cos\theta\,\mathbf a_z,\\
\mathbf a_\theta &= \cos\theta\cos\phi\,\mathbf a_x + \cos\theta\sin\phi\,\mathbf a_y - \sin\theta\,\mathbf a_z .
\end{aligned}
$$

::: example Converting a point and a vector {#ex-convert}
At the point $P(x=-2, y=6, z=3)$, express $P$ in cylindrical and spherical coordinates, and find the cylindrical components of $\mathbf A = y\,\mathbf a_x + (x+z)\,\mathbf a_y$.
::: solution
**Point.** $\rho = \sqrt{(-2)^2 + 6^2} = \sqrt{40} = 6.325$. The point is in the second quadrant of the $xy$-plane, so $\phi = \operatorname{atan2}(6, -2) = 108.43^\circ$. (A calculator's $\arctan(6/-2) = -71.57^\circ$ is in the wrong quadrant: always check.) In spherical coordinates $r = \sqrt{4 + 36 + 9} = 7$ and $\theta = \arccos(3/7) = 64.62^\circ$, with the same $\phi$.

**Vector.** At $P$, $A_x = y = 6$ and $A_y = x + z = 1$. With $\cos\phi = -2/\sqrt{40} = -0.3162$ and $\sin\phi = 6/\sqrt{40} = 0.9487$,

$$
\begin{aligned}
A_\rho &= A_x\cos\phi + A_y\sin\phi = 6(-0.3162) + 1(0.9487) = -0.949,\\
A_\phi &= -A_x\sin\phi + A_y\cos\phi = -6(0.9487) + 1(-0.3162) = -6.008 .
\end{aligned}
$$

So $\mathbf A = -0.949\,\mathbf a_\rho - 6.008\,\mathbf a_\phi$ at $P$. As a check, the magnitudes agree: $\sqrt{6^2+1^2} = 6.083 = \sqrt{0.949^2 + 6.008^2}$.
:::
:::

::: warning Unit vectors that move
Because $\mathbf a_\rho$, $\mathbf a_r$, $\mathbf a_\theta$ and $\mathbf a_\phi$ change direction from point to point, you **cannot** add the cylindrical or spherical components of vectors located at different points, and you cannot pull these unit vectors out of an integral. The field of a ring of charge at its centre, for instance, is the integral of contributions $\propto -\mathbf a_\rho$ from every point of the ring; integrating "$-\mathbf a_\rho$" as if it were constant gives a non-zero answer, while the true answer is zero. Inside integrals over position, convert the unit vector to Cartesian form with [[#eq-cyl-unit]] first.
:::

## Differential elements and integrals

Every integral in electromagnetics is built from three kinds of element: a length $\mathrm d\mathbf l$ along a path, a surface $\mathrm d\mathbf S$ with a direction (its normal), and a volume $\mathrm dv$.

::: definition Metric coefficients and differential elements {#def-elements}
When one coordinate changes by a small amount with the others fixed, the point moves by a distance equal to the coordinate change times a **metric coefficient** $h$:

| system | coordinates | $h_1,\ h_2,\ h_3$ | $\mathrm d\mathbf l$ | $\mathrm dv$ |
|---|---|---|---|---|
| Cartesian | $x, y, z$ | $1,\ 1,\ 1$ | $\mathrm dx\,\mathbf a_x + \mathrm dy\,\mathbf a_y + \mathrm dz\,\mathbf a_z$ | $\mathrm dx\,\mathrm dy\,\mathrm dz$ |
| cylindrical | $\rho, \phi, z$ | $1,\ \rho,\ 1$ | $\mathrm d\rho\,\mathbf a_\rho + \rho\,\mathrm d\phi\,\mathbf a_\phi + \mathrm dz\,\mathbf a_z$ | $\rho\,\mathrm d\rho\,\mathrm d\phi\,\mathrm dz$ |
| spherical | $r, \theta, \phi$ | $1,\ r,\ r\sin\theta$ | $\mathrm dr\,\mathbf a_r + r\,\mathrm d\theta\,\mathbf a_\theta + r\sin\theta\,\mathrm d\phi\,\mathbf a_\phi$ | $r^2\sin\theta\,\mathrm dr\,\mathrm d\theta\,\mathrm d\phi$ |

A surface element on a coordinate surface is the product of the two length elements lying in it, directed along the third unit vector: for example $\mathrm d\mathbf S = \rho\,\mathrm d\phi\,\mathrm dz\,\mathbf a_\rho$ on a cylinder $\rho = $ const, and $\mathrm d\mathbf S = r^2\sin\theta\,\mathrm d\theta\,\mathrm d\phi\,\mathbf a_r$ on a sphere $r = $ const.
:::

The angle coordinates are dimensionless, so the metric coefficients $\rho$, $r$ and $r\sin\theta$ are what turn an angle increment into a length. The factor $\sin\theta$ appears because a circle of latitude at polar angle $\theta$ has radius $r\sin\theta$. As a check, integrating $\mathrm dv$ over a sphere gives $\int_0^{2\pi}\!\int_0^\pi\!\int_0^a r^2\sin\theta\,\mathrm dr\,\mathrm d\theta\,\mathrm d\phi = \tfrac{4}{3}\pi a^3$, and integrating $\mathrm dS$ over a cylinder of radius $a$ and length $L$ gives $2\pi aL$.

::: definition Line, surface and volume integrals {#def-integrals}
For a vector field $\mathbf F$ and a path $C$, the **line integral** $\int_C \mathbf F\cdot\mathrm d\mathbf l$ adds up the tangential component of $\mathbf F$ along $C$; for a closed path it is the **circulation** $\oint_C\mathbf F\cdot\mathrm d\mathbf l$. For a surface $S$ the **flux** of $\mathbf F$ through $S$ is $\int_S\mathbf F\cdot\mathrm d\mathbf S$, adding the normal component; for a closed surface $\mathrm d\mathbf S$ points outwards. For a scalar density $f$ the **volume integral** $\int_V f\,\mathrm dv$ adds up $f$ throughout $V$.
:::

Physically, $-\int \mathbf E\cdot\mathrm d\mathbf l$ is a potential difference (the work per unit charge done against the field), $\oint\mathbf H\cdot\mathrm d\mathbf l$ is a current by Ampère's law, $\oint \mathbf D\cdot\mathrm d\mathbf S$ is an enclosed charge by Gauss's law, and $\int\rho_v\,\mathrm dv$ is a total charge. Every one of Maxwell's equations in integral form ([[electromagnetics/maxwells-equations]]) is a statement about one of these integrals.

::: example Work along two paths {#ex-line}
Evaluate $\int\mathbf F\cdot\mathrm d\mathbf l$ for $\mathbf F = xy\,\mathbf a_x - 2x\,\mathbf a_y$ from $(0,0,0)$ to $(1,1,0)$, (a) along the straight line $y = x$, (b) along the parabola $y = x^2$.
::: solution
In the $xy$-plane $\mathbf F\cdot\mathrm d\mathbf l = xy\,\mathrm dx - 2x\,\mathrm dy$.

(a) On $y = x$, $\mathrm dy = \mathrm dx$, so the integral is $\int_0^1 (x^2 - 2x)\,\mathrm dx = \tfrac13 - 1 = -\tfrac23$.

(b) On $y = x^2$, $\mathrm dy = 2x\,\mathrm dx$, so it is $\int_0^1 (x^3 - 4x^2)\,\mathrm dx = \tfrac14 - \tfrac43 = -\tfrac{13}{12}$.

The answers differ, so this $\mathbf F$ is not the gradient of any scalar: no "potential difference" can be defined for it. We shall see that this happens exactly when its curl is non-zero; here $(\nabla\times\mathbf F)_z = \partial F_y/\partial x - \partial F_x/\partial y = -2 - x \neq 0$. An electrostatic field always gives path-independent answers.
:::
:::

## Gradient, divergence and curl

Three differential operators describe how fields change locally. All three are built from the operator $\nabla$ ("del"), which in Cartesian coordinates is $\nabla = \mathbf a_x\,\partial/\partial x + \mathbf a_y\,\partial/\partial y + \mathbf a_z\,\partial/\partial z$. In other coordinates the operators are best *defined* by their physical meaning, which gives formulas valid in any system.

::: definition Gradient {#def-gradient}
The **gradient** $\nabla V$ of a scalar field $V$ is the vector field whose component in any direction $\mathbf a_l$ is the rate of change of $V$ with distance in that direction: $\mathrm dV = \nabla V\cdot\mathrm d\mathbf l$. It points in the direction of fastest increase, with magnitude equal to that rate. In the three systems

$$
\begin{aligned}
\nabla V &= \frac{\partial V}{\partial x}\mathbf a_x + \frac{\partial V}{\partial y}\mathbf a_y + \frac{\partial V}{\partial z}\mathbf a_z
= \frac{\partial V}{\partial\rho}\mathbf a_\rho + \frac{1}{\rho}\frac{\partial V}{\partial\phi}\mathbf a_\phi + \frac{\partial V}{\partial z}\mathbf a_z\\
&= \frac{\partial V}{\partial r}\mathbf a_r + \frac{1}{r}\frac{\partial V}{\partial\theta}\mathbf a_\theta + \frac{1}{r\sin\theta}\frac{\partial V}{\partial\phi}\mathbf a_\phi .
\end{aligned}
$$ {#eq-grad}
:::

The metric coefficients from [[#def-elements]] appear in the denominators: a change $\mathrm d\phi$ moves the point by $\rho\,\mathrm d\phi$, so the rate of change per metre is $(1/\rho)\,\partial V/\partial\phi$. The gradient is perpendicular to the surfaces $V = $ const. In electrostatics $\mathbf E = -\nabla V$: the field points "downhill", from high potential to low, and crosses the equipotentials at right angles.

::: widget contour
f: 1/sqrt((x-1)^2 + y^2 + 0.05) - 1/sqrt((x+1)^2 + y^2 + 0.05)
x: -3, 3
y: -2.5, 2.5
levels: 18
gradient: true
point: 0.3, 0.8
caption: Equipotentials of a positive and a negative charge (slightly smoothed so the plot stays finite). Drag the point: the gradient arrow is always perpendicular to the contour through it and longest where the contours are crowded. The electric field is the negative of this arrow. Switch on the gradient field to see the familiar dipole pattern.
:::

::: definition Divergence {#def-divergence}
The **divergence** of a vector field $\mathbf A$ at a point is the outward flux per unit volume of a small closed surface around the point, in the limit as the volume shrinks to zero:

$$
\nabla\cdot\mathbf A = \lim_{\Delta v\to 0}\frac{\oint_S\mathbf A\cdot\mathrm d\mathbf S}{\Delta v}.
$$ {#eq-div-def}

Evaluating the limit on a small coordinate box gives

$$
\begin{aligned}
\nabla\cdot\mathbf A &= \frac{\partial A_x}{\partial x} + \frac{\partial A_y}{\partial y} + \frac{\partial A_z}{\partial z}
= \frac{1}{\rho}\frac{\partial(\rho A_\rho)}{\partial\rho} + \frac{1}{\rho}\frac{\partial A_\phi}{\partial\phi} + \frac{\partial A_z}{\partial z}\\
&= \frac{1}{r^2}\frac{\partial(r^2A_r)}{\partial r} + \frac{1}{r\sin\theta}\frac{\partial(\sin\theta\,A_\theta)}{\partial\theta} + \frac{1}{r\sin\theta}\frac{\partial A_\phi}{\partial\phi}.
\end{aligned}
$$ {#eq-div}
:::

::: proof
We derive the cylindrical form; the others follow in the same way. Take the small volume $\rho_0 \le \rho \le \rho_0 + \Delta\rho$, $\phi_0\le\phi\le\phi_0+\Delta\phi$, $z_0\le z\le z_0+\Delta z$, of volume $\Delta v \approx \rho_0\,\Delta\rho\,\Delta\phi\,\Delta z$. The two faces normal to $\mathbf a_\rho$ have areas $\rho\,\Delta\phi\,\Delta z$ evaluated at $\rho_0+\Delta\rho$ and at $\rho_0$, so their net outward flux is

$$
\bigl[\rho A_\rho\bigr]_{\rho_0+\Delta\rho}\Delta\phi\,\Delta z - \bigl[\rho A_\rho\bigr]_{\rho_0}\Delta\phi\,\Delta z \approx \frac{\partial(\rho A_\rho)}{\partial\rho}\Delta\rho\,\Delta\phi\,\Delta z .
$$

The area itself grows with $\rho$, which is why $\rho A_\rho$, not $A_\rho$, is differentiated. The faces normal to $\mathbf a_\phi$ have equal areas $\Delta\rho\,\Delta z$ and contribute $(\partial A_\phi/\partial\phi)\,\Delta\phi\,\Delta\rho\,\Delta z$; the faces normal to $\mathbf a_z$ have areas $\rho_0\Delta\rho\,\Delta\phi$ and contribute $(\partial A_z/\partial z)\,\Delta z\,\rho_0\Delta\rho\,\Delta\phi$. Dividing the sum by $\Delta v$ and letting the box shrink gives the middle expression in [[#eq-div]].
:::

A positive divergence means that the field lines spread out from the point: there is a **source** there. Gauss's law in differential form, $\nabla\cdot\mathbf D = \rho_v$, says that the sources of electric flux are charges; $\nabla\cdot\mathbf B = 0$ says that magnetic flux has no sources at all.

::: definition Curl {#def-curl}
The **curl** of $\mathbf A$ is the vector whose component in the direction of a unit normal $\mathbf a_n$ is the circulation per unit area round a small loop perpendicular to $\mathbf a_n$, taken anticlockwise when viewed from the tip of $\mathbf a_n$:

$$
(\nabla\times\mathbf A)\cdot\mathbf a_n = \lim_{\Delta S\to0}\frac{\oint_C\mathbf A\cdot\mathrm d\mathbf l}{\Delta S}.
$$ {#eq-curl-def}

In Cartesian and cylindrical coordinates

$$
\begin{aligned}
\nabla\times\mathbf A &= \left(\frac{\partial A_z}{\partial y} - \frac{\partial A_y}{\partial z}\right)\mathbf a_x + \left(\frac{\partial A_x}{\partial z} - \frac{\partial A_z}{\partial x}\right)\mathbf a_y + \left(\frac{\partial A_y}{\partial x} - \frac{\partial A_x}{\partial y}\right)\mathbf a_z\\
&= \left(\frac{1}{\rho}\frac{\partial A_z}{\partial\phi} - \frac{\partial A_\phi}{\partial z}\right)\mathbf a_\rho + \left(\frac{\partial A_\rho}{\partial z} - \frac{\partial A_z}{\partial\rho}\right)\mathbf a_\phi + \frac{1}{\rho}\left(\frac{\partial(\rho A_\phi)}{\partial\rho} - \frac{\partial A_\rho}{\partial\phi}\right)\mathbf a_z ,
\end{aligned}
$$ {#eq-curl}

and in spherical coordinates

$$
\nabla\times\mathbf A = \frac{1}{r\sin\theta}\left(\frac{\partial(\sin\theta\,A_\phi)}{\partial\theta} - \frac{\partial A_\theta}{\partial\phi}\right)\mathbf a_r + \frac{1}{r}\left(\frac{1}{\sin\theta}\frac{\partial A_r}{\partial\phi} - \frac{\partial(rA_\phi)}{\partial r}\right)\mathbf a_\theta + \frac{1}{r}\left(\frac{\partial(rA_\theta)}{\partial r} - \frac{\partial A_r}{\partial\theta}\right)\mathbf a_\phi .
$$
:::

Curl measures local rotation: put a tiny paddle wheel in a flowing fluid with velocity field $\mathbf A$; it spins if $\nabla\times\mathbf A\neq\mathbf 0$, about the axis of the curl, at an angular velocity of half its magnitude. Ampère's law in differential form, $\nabla\times\mathbf H = \mathbf J$, says that the magnetic field swirls around current density; $\nabla\times\mathbf E = \mathbf 0$ in electrostatics says the static electric field never does.

::: widget vectorfield
P: -y + a*x
Q: x + a*y
x: -3, 3
y: -3, 3
shade: curl
streamlines: true
sliders: a=0:-1:1:0.1
caption: The field $(-y + ax)\,\mathbf a_x + (x + ay)\,\mathbf a_y$. Its curl is $2\,\mathbf a_z$ and its divergence $2a$, both uniform. With the shading set to curl, change $a$: the rotation does not change, but the streamlines open from circles into spirals. Switch the shading to divergence and the colour now follows $a$, while the curl colour stayed fixed. Divergence and curl are independent pieces of information.
:::

::: example Divergence and curl in cylindrical coordinates {#ex-div-curl}
Find the divergence and curl of (a) $\mathbf A = \rho\,\mathbf a_\phi$ and (b) $\mathbf H = \dfrac{k}{\rho}\,\mathbf a_\phi$ for $\rho > 0$, where $k$ is a constant.
::: solution
Both fields have only a $\phi$-component that depends only on $\rho$. In [[#eq-div]] the $\phi$-term is $(1/\rho)\,\partial A_\phi/\partial\phi = 0$, so both divergences are zero: the field lines are closed circles with no sources.

For the curl, only the $z$-component survives in [[#eq-curl]]:

(a) $(\nabla\times\mathbf A)_z = \dfrac1\rho\dfrac{\partial(\rho\cdot\rho)}{\partial\rho} = \dfrac{2\rho}{\rho} = 2$, so $\nabla\times\mathbf A = 2\,\mathbf a_z$. This is rigid rotation: the velocity field of a turntable.

(b) $(\nabla\times\mathbf H)_z = \dfrac1\rho\dfrac{\partial(\rho\cdot k/\rho)}{\partial\rho} = \dfrac1\rho\dfrac{\partial k}{\partial\rho} = 0$. The field circulates, yet its curl is zero everywhere except on the axis, where the formula is undefined. This is the magnetic field outside a straight wire ([[electromagnetics/magnetostatics]]): the current that drives it is all on the axis, and a paddle wheel placed anywhere outside the wire does not spin, because the faster flow on its inner side is exactly balanced by the longer path on its outer side.
:::
:::

::: quiz
A field in spherical coordinates is $\mathbf D = \dfrac{Q}{4\pi r^2}\,\mathbf a_r$ for $r > 0$. What is $\nabla\cdot\mathbf D$ there?
- [ ] $-\dfrac{Q}{2\pi r^3}$, the derivative of $D_r$ with respect to $r$
- [x] $0$
- [ ] $\dfrac{Q}{4\pi r^2}$
- [ ] It cannot be found without converting to Cartesian coordinates.
::: solution
By [[#eq-div]], $\nabla\cdot\mathbf D = \dfrac{1}{r^2}\dfrac{\partial}{\partial r}\left(r^2\cdot\dfrac{Q}{4\pi r^2}\right) = \dfrac{1}{r^2}\dfrac{\partial}{\partial r}\dfrac{Q}{4\pi} = 0$. The field of a point charge has no sources away from the charge: the weakening as $1/r^2$ is exactly compensated by the growth of sphere area as $r^2$. Forgetting the $r^2$ factors, as in the first option, is the most common mistake with spherical divergence.
:::
:::

### The Laplacian and second-order identities

Applying two operators in succession gives the second-order operators of field theory. The most important is the **Laplacian** of a scalar, $\nabla^2V = \nabla\cdot\nabla V$:

$$
\nabla^2V = \frac{\partial^2V}{\partial x^2} + \frac{\partial^2V}{\partial y^2} + \frac{\partial^2V}{\partial z^2}
= \frac{1}{\rho}\frac{\partial}{\partial\rho}\left(\rho\frac{\partial V}{\partial\rho}\right) + \frac{1}{\rho^2}\frac{\partial^2V}{\partial\phi^2} + \frac{\partial^2V}{\partial z^2},
$$ {#eq-laplacian}

and in spherical coordinates

$$
\nabla^2V = \frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial V}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial V}{\partial\theta}\right) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2V}{\partial\phi^2}.
$$

It is the operator of Poisson's and Laplace's equations ([[electromagnetics/boundary-value-problems]]) and of the wave equation ([[electromagnetics/plane-waves]]).

::: theorem Two null identities {#thm-null}
For any scalar field $V$ and vector field $\mathbf A$ with continuous second derivatives,

$$
\nabla\times(\nabla V) = \mathbf 0, \qquad \nabla\cdot(\nabla\times\mathbf A) = 0 .
$$
:::

::: proof
In Cartesian coordinates the $z$-component of $\nabla\times\nabla V$ is $\partial^2V/\partial x\,\partial y - \partial^2V/\partial y\,\partial x = 0$ by equality of mixed partial derivatives, and similarly for the other components. Likewise $\nabla\cdot(\nabla\times\mathbf A)$ expands into six second derivatives that cancel in pairs. Both identities are statements about vectors, not about coordinates, so they hold in every coordinate system.
:::

These identities have direct physical consequences. A field with zero curl can be written as a gradient, which is why the electrostatic field has a scalar potential, $\mathbf E = -\nabla V$. A field with zero divergence can be written as a curl, which is why the magnetic field has a vector potential, $\mathbf B = \nabla\times\mathbf A$. We shall also need the vector Laplacian, defined in any coordinates by $\nabla^2\mathbf A = \nabla(\nabla\cdot\mathbf A) - \nabla\times\nabla\times\mathbf A$; in Cartesian coordinates, and *only* there, it is the scalar Laplacian applied to each component.

## The divergence theorem and Stokes's theorem

The definitions [[#eq-div-def]] and [[#eq-curl-def]] describe divergence and curl as flux and circulation "per unit volume" and "per unit area". Adding up many small pieces gives the two integral theorems that underlie all of field theory.

::: theorem Divergence theorem (Gauss) {#thm-divergence}
Let $V$ be a volume bounded by a closed surface $S$ with outward normal, and let $\mathbf A$ have continuous first derivatives throughout $V$. Then

$$
\oint_S\mathbf A\cdot\mathrm d\mathbf S = \int_V\nabla\cdot\mathbf A\,\mathrm dv .
$$ {#eq-divthm}
:::

::: proof
Divide $V$ into a large number of small cells. For each cell, [[#eq-div-def]] gives its outward flux as approximately $(\nabla\cdot\mathbf A)\,\Delta v$. Sum over all cells. On every interior face two neighbouring cells see the same flux with opposite signs, because their outward normals are opposite, so all interior contributions cancel and only the flux through the outer surface $S$ remains. In the limit of vanishing cells the sum of $(\nabla\cdot\mathbf A)\,\Delta v$ becomes the volume integral. A rigorous version is in [Maths Atlas](/learn/maths/lesson.php?c=multivariable&l=stokes-divergence).
:::

::: theorem Stokes's theorem {#thm-stokes}
Let $S$ be an open surface bounded by a closed path $C$, with the direction of $C$ and the normal of $S$ related by the right-hand rule, and let $\mathbf A$ have continuous first derivatives on $S$. Then

$$
\oint_C\mathbf A\cdot\mathrm d\mathbf l = \int_S(\nabla\times\mathbf A)\cdot\mathrm d\mathbf S .
$$ {#eq-stokes}
:::

::: proof
Divide $S$ into small patches. By [[#eq-curl-def]] the circulation round each patch is approximately $(\nabla\times\mathbf A)\cdot\Delta\mathbf S$. Adding the circulations of all patches, each interior edge is traversed twice in opposite directions and cancels, leaving only the circulation round the outer boundary $C$.
:::

The surface in Stokes's theorem can be any surface spanning $C$: a flat disc or a soap bubble ballooning out from it. The answer must be the same, which is consistent only because the flux of a curl through a closed surface is zero: by [[#thm-divergence]] it equals $\int\nabla\cdot(\nabla\times\mathbf A)\,\mathrm dv = 0$ by [[#thm-null]]. This consistency check will reappear when Maxwell discovers that Ampère's law needs a displacement current ([[electromagnetics/maxwells-equations]]).

::: quiz
A closed path $C$ is the rim of a cup. You compute $\int_S(\nabla\times\mathbf A)\cdot\mathrm d\mathbf S$ once over the flat disc spanning the rim and once over the curved surface of the cup itself, with normals chosen consistently with the direction of $C$. If $\mathbf A$ is smooth everywhere, how do the two results compare?
- [x] They are equal, because both equal $\oint_C\mathbf A\cdot\mathrm d\mathbf l$.
- [ ] The cup gives more, because its area is larger.
- [ ] They are equal and opposite, because the normals point different ways.
- [ ] They are unrelated unless $\nabla\times\mathbf A$ is uniform.
::: solution
Stokes's theorem says each surface integral equals the circulation round the common boundary, so they are equal. Equivalently, disc and cup together form a closed surface (with the disc's normal reversed), and the outward flux of a curl through any closed surface is zero by the divergence theorem and $\nabla\cdot\nabla\times\mathbf A = 0$. Area does not matter: the flux of the curl, not the area, is what is fixed by the rim.
:::
:::

::: example Verifying the divergence theorem on a cylinder {#ex-divthm}
Let $\mathbf A = \rho^2\,\mathbf a_\rho + z\,\mathbf a_z$. Evaluate both sides of [[#eq-divthm]] for the closed cylinder $\rho\le2$, $0\le z\le3$.
::: solution
**Volume side.** $\nabla\cdot\mathbf A = \dfrac1\rho\dfrac{\partial(\rho^3)}{\partial\rho} + \dfrac{\partial z}{\partial z} = 3\rho + 1$, so

$$
\int_V\nabla\cdot\mathbf A\,\mathrm dv = \int_0^3\!\!\int_0^{2\pi}\!\!\int_0^2(3\rho+1)\,\rho\,\mathrm d\rho\,\mathrm d\phi\,\mathrm dz = 3\cdot2\pi\left[\rho^3 + \frac{\rho^2}{2}\right]_0^2 = 6\pi(8 + 2) = 60\pi .
$$

**Surface side.** Three pieces:

- curved side $\rho = 2$: $\mathrm d\mathbf S = 2\,\mathrm d\phi\,\mathrm dz\,\mathbf a_\rho$ and $A_\rho = 4$, giving $4\times(2\pi\cdot2\cdot3) = 48\pi$;
- top $z = 3$: $\mathrm d\mathbf S = \rho\,\mathrm d\rho\,\mathrm d\phi\,\mathbf a_z$ and $A_z = 3$, giving $3\times\pi\cdot2^2 = 12\pi$;
- bottom $z = 0$: outward normal $-\mathbf a_z$, but $A_z = 0$ there, giving $0$.

The total is $60\pi \approx 188.5$, as the theorem says.
:::
:::

::: example Circulation around a wire {#ex-stokes-wire}
For $\mathbf H = \dfrac{k}{\rho}\,\mathbf a_\phi$ of [[#ex-div-curl]], find the circulation round the circle $\rho = a$ in the plane $z = 0$, taken anticlockwise seen from $+z$. Does this contradict Stokes's theorem?
::: solution
On the circle $\mathrm d\mathbf l = a\,\mathrm d\phi\,\mathbf a_\phi$, so

$$
\oint_C\mathbf H\cdot\mathrm d\mathbf l = \int_0^{2\pi}\frac{k}{a}\,a\,\mathrm d\phi = 2\pi k ,
$$

independent of $a$. Yet $\nabla\times\mathbf H = \mathbf 0$ for every $\rho > 0$. There is no contradiction: the disc bounded by the circle contains the axis, where $\mathbf H$ is singular, so the hypothesis of [[#thm-stokes]] fails. All the curl is concentrated on the axis. Physically, $\mathbf H$ is the field of a filament current $I = 2\pi k$, and Ampère's law $\oint\mathbf H\cdot\mathrm d\mathbf l = I$ is the correct statement. For a path that does *not* enclose the axis, Stokes's theorem applies and the circulation is zero.
:::
:::

::: widget vectorfield
P: -y/(x^2 + y^2 + 0.01)
Q: x/(x^2 + y^2 + 0.01)
x: -3, 3
y: -3, 3
cx: c + r*cos(t)
cy: r*sin(t)
t: 0, 2pi
sliders: c=0:-2.5:2.5:0.1; r=1:0.3:2:0.1
caption: The field of a line current along the $z$-axis, proportional to $\mathbf a_\phi/\rho$, with a circular path of radius $r$ centred at $(c, 0)$. The figure computes the circulation. While the circle encloses the wire it stays at about $2\pi$, whatever its size or position; slide the centre $c$ until the circle no longer encloses the origin and the circulation drops to zero.
:::

## Classifying fields: the Helmholtz theorem

We now have two local descriptors of a vector field, its divergence (sources) and its curl (vortices). Are they enough?

::: theorem Helmholtz theorem {#thm-helmholtz}
A vector field $\mathbf F$ that vanishes sufficiently fast at infinity (faster than $1/r$) is uniquely determined by its divergence and its curl everywhere. Explicitly, if $\nabla\cdot\mathbf F = s$ and $\nabla\times\mathbf F = \mathbf c$, then

$$
\mathbf F = -\nabla\Phi + \nabla\times\mathbf A, \qquad \Phi(\mathbf r) = \int\frac{s(\mathbf r')}{4\pi\abs{\mathbf r - \mathbf r'}}\,\mathrm dv', \qquad \mathbf A(\mathbf r) = \int\frac{\mathbf c(\mathbf r')}{4\pi\abs{\mathbf r - \mathbf r'}}\,\mathrm dv'.
$$
:::

We do not prove the theorem here (see Griffiths, Appendix B), but its two potentials are exactly the scalar and vector potentials of [[electromagnetics/electrostatics]] and [[electromagnetics/magnetostatics]], with $s$ the charge density divided by $\epsilon_0$ and $\mathbf c$ the current density times $\mu_0$. The theorem explains the form of Maxwell's equations: two of them give the divergences of the fields and two give their curls, and that is everything one needs to know.

Fields fall into four classes:

| class | $\nabla\cdot\mathbf F$ | $\nabla\times\mathbf F$ | example |
|---|---|---|---|
| solenoidal and irrotational | $0$ | $\mathbf 0$ | $\mathbf E$ in a charge-free region of electrostatics |
| solenoidal, rotational | $0$ | $\neq\mathbf 0$ | $\mathbf B$ inside a conductor carrying current |
| irrotational, not solenoidal | $\neq 0$ | $\mathbf 0$ | $\mathbf E$ inside a charge cloud |
| general | $\neq 0$ | $\neq\mathbf 0$ | $\mathbf E$ with time-varying fields and charges |

An **irrotational** (curl-free) field is also called **conservative**: its line integrals depend only on the end points, and it is the gradient of a scalar. A **solenoidal** (divergence-free) field has as much flux entering any closed surface as leaving it.

::: remark Choosing the coordinate system
The coordinate system is a tool, not part of the physics. Choose the one in which the boundaries are coordinate surfaces and the field has the fewest components: Cartesian for parallel plates and rectangular waveguides, cylindrical for wires, coaxial cables and solenoids, spherical for point sources, spheres and antennas far away. A problem that takes a page in the wrong system often takes three lines in the right one.
:::

::: application Field solvers
Commercial electromagnetic solvers, which engineers use to design connectors, antennas, motors and printed-circuit interconnect, never work with smooth fields directly. The finite-element method writes the fields on a mesh of tetrahedra and imposes the integral laws of this chapter cell by cell; the finite-difference time-domain method stores the components of $\mathbf E$ and $\mathbf H$ on two staggered grids so that each curl is a circulation round one cell face, exactly [[#eq-curl-def]] with a finite $\Delta S$. The theorems of Gauss and Stokes are what guarantee that such discrete schemes conserve charge and do not create spurious sources.
:::

::: history
The words "divergence" and "curl", and the habit of treating fields as single vector quantities, are surprisingly recent. George Green published the theorem relating volume and surface integrals for potentials in 1828, and Mikhail Ostrogradsky gave the general divergence theorem in 1826 and published it in 1831; Gauss used special cases in his work on gravitation and magnetism. Stokes's theorem was first stated by William Thomson (Lord Kelvin) in a letter to George Stokes in 1850, and Stokes set it as an examination question at Cambridge in 1854, which is how it acquired his name. Maxwell's *Treatise* of 1873 still wrote the field equations in components and in Hamilton's quaternions; he coined the term "curl". The modern vector notation was created independently in the 1880s by Josiah Willard Gibbs and Oliver Heaviside, and the operator $\nabla$ with dot and cross products became standard through Gibbs's lecture notes, published by Edwin Bidwell Wilson as *Vector Analysis* in 1901.
:::

## Where this leads

Every chapter of this course uses the tools of this one. In [[electromagnetics/electrostatics]] the divergence theorem turns Gauss's law into $\nabla\cdot\mathbf D = \rho_v$ and the gradient relates the field to the potential; in [[electromagnetics/boundary-value-problems]] the Laplacian in each coordinate system gives the separable solutions; in [[electromagnetics/magnetostatics]] Stokes's theorem turns Ampère's circuital law into $\nabla\times\mathbf H = \mathbf J$; and in [[electromagnetics/maxwells-equations]] the two theorems convert the four integral laws into the four differential equations whose wave solutions fill the rest of the course. For the same material from the physicist's side, see the [electrostatics chapter of the Physics Atlas electrodynamics course](/learn/physics/lesson.php?c=electrodynamics&l=electrostatics).

::: summary
- Cylindrical $(\rho,\phi,z)$ and spherical $(r,\theta,\phi)$ coordinates match wires, cables and spheres; their unit vectors $\mathbf a_\rho$, $\mathbf a_\phi$, $\mathbf a_r$, $\mathbf a_\theta$ change with position, so convert to Cartesian form inside integrals.
- Length, area and volume elements carry metric coefficients ($\rho$, $r$, $r\sin\theta$); for example $\mathrm dv = r^2\sin\theta\,\mathrm dr\,\mathrm d\theta\,\mathrm d\phi$.
- The gradient gives the direction and rate of fastest increase and is perpendicular to level surfaces; $\mathbf E = -\nabla V$.
- Divergence is outward flux per unit volume (sources); curl is circulation per unit area (vortices). Their formulas in curvilinear coordinates follow from these definitions.
- $\nabla\times\nabla V = \mathbf 0$ and $\nabla\cdot\nabla\times\mathbf A = 0$: curl-free fields have scalar potentials, divergence-free fields have vector potentials.
- The divergence theorem $\oint\mathbf A\cdot\mathrm d\mathbf S = \int\nabla\cdot\mathbf A\,\mathrm dv$ and Stokes's theorem $\oint\mathbf A\cdot\mathrm d\mathbf l = \int(\nabla\times\mathbf A)\cdot\mathrm d\mathbf S$ need smooth fields; singular sources (a line current) must be accounted for separately.
- By the Helmholtz theorem a field is fixed by its divergence and curl, which is why Maxwell's equations specify exactly these.
:::

## Exercises

::: exercise Distance between two points {level=1 check="7"}
Find the distance in metres between $A(1, 2, -1)$ and $B(3, -1, 5)$, with coordinates in metres, and the unit vector from $A$ towards $B$.
::: solution
$\mathbf R_{AB} = 2\,\mathbf a_x - 3\,\mathbf a_y + 6\,\mathbf a_z$, so $R_{AB} = \sqrt{4 + 9 + 36} = 7\,\mathrm m$ and $\mathbf a_{AB} = \tfrac{2}{7}\mathbf a_x - \tfrac37\mathbf a_y + \tfrac67\mathbf a_z$.
:::
:::

::: exercise From cylindrical to spherical {level=1 check="sqrt(20)"}
A point has cylindrical coordinates $\rho = 4$, $\phi = 120^\circ$, $z = -2$. Find its Cartesian coordinates and its spherical coordinate $r$ (in the same length unit).
::: solution
$x = 4\cos120^\circ = -2$, $y = 4\sin120^\circ = 3.464$, $z = -2$. Then $r = \sqrt{\rho^2 + z^2} = \sqrt{16 + 4} = \sqrt{20} = 4.472$, and $\theta = \arccos(-2/4.472) = 116.6^\circ$ (below the $xy$-plane, as expected for $z<0$).
:::
:::

::: exercise A divergence {level=1 check="14"}
Evaluate $\nabla\cdot\mathbf A$ at $(1, 2, 3)$ for $\mathbf A = x^2y\,\mathbf a_x + yz^2\,\mathbf a_y + xz\,\mathbf a_z$.
::: solution
$\nabla\cdot\mathbf A = 2xy + z^2 + x$. At $(1,2,3)$ this is $4 + 9 + 1 = 14$.
:::
:::

::: exercise Flux out of a cube {level=2 check="3"}
Find the outward flux of $\mathbf F = x^2\,\mathbf a_x + y^2\,\mathbf a_y + z^2\,\mathbf a_z$ through the surface of the unit cube $0\le x,y,z\le1$, (a) by the divergence theorem, (b) directly.
::: solution
(a) $\nabla\cdot\mathbf F = 2(x + y + z)$, and $\int_0^1\!\int_0^1\!\int_0^1 2(x+y+z)\,\mathrm dx\,\mathrm dy\,\mathrm dz = 2\left(\tfrac12 + \tfrac12 + \tfrac12\right) = 3$.

(b) On the face $x = 1$ the outward normal is $\mathbf a_x$ and $F_x = 1$, giving flux $1$; on $x = 0$, $F_x = 0$. The same holds for $y$ and $z$, so the total is $3$.
:::
:::

::: exercise Field from a potential {level=2 check="sqrt(12.5^2 + (100*sin(pi/3)/8)^2)"}
The potential of a small dipole is $V = 100\cos\theta/r^2$ volts ($r$ in metres). Find $\mathbf E = -\nabla V$ and its magnitude in $\mathrm{V/m}$ at $r = 2\,\mathrm m$, $\theta = 60^\circ$.
::: solution
By [[#eq-grad]] in spherical form,

$$
E_r = -\frac{\partial V}{\partial r} = \frac{200\cos\theta}{r^3}, \qquad E_\theta = -\frac1r\frac{\partial V}{\partial\theta} = \frac{100\sin\theta}{r^3}, \qquad E_\phi = 0 .
$$

At the point, $E_r = 200(0.5)/8 = 12.5\,\mathrm{V/m}$ and $E_\theta = 100(0.8660)/8 = 10.83\,\mathrm{V/m}$, so $\abs{\mathbf E} = \sqrt{12.5^2 + 10.83^2} = 16.5\,\mathrm{V/m}$.
:::
:::

::: exercise Stokes on a square {level=2 check="2"}
Compute the circulation of $\mathbf F = -y^2\,\mathbf a_x + x\,\mathbf a_y$ anticlockwise round the square with corners $(0,0)$, $(1,0)$, $(1,1)$, $(0,1)$ in the plane $z=0$, directly and by Stokes's theorem.
::: solution
**Directly.** Bottom ($y = 0$, $x: 0\to1$): $F_x = 0$, contributes $0$. Right ($x = 1$, $y: 0\to1$): $\int_0^1F_y\,\mathrm dy = \int_0^1 1\,\mathrm dy = 1$. Top ($y = 1$, $x: 1\to0$): $\int_1^0(-1)\,\mathrm dx = 1$. Left ($x=0$): $F_y = 0$, contributes $0$. Total $2$.

**Stokes.** $(\nabla\times\mathbf F)_z = \partial F_y/\partial x - \partial F_x/\partial y = 1 + 2y$, and $\int_0^1\!\int_0^1(1 + 2y)\,\mathrm dx\,\mathrm dy = 1 + 1 = 2$.
:::
:::

::: exercise Is it conservative? {level=2}
Show that $\mathbf G = 2xy\,\mathbf a_x + (x^2 + 2z)\,\mathbf a_y + 2y\,\mathbf a_z$ is conservative, find a scalar $f$ with $\mathbf G = \nabla f$, and evaluate $\int\mathbf G\cdot\mathrm d\mathbf l$ from $(0,0,0)$ to $(1,2,3)$ along any path.
::: hint
Compute the curl first; then integrate $G_x$ with respect to $x$ and fix the "constants" using $G_y$ and $G_z$.
:::
::: solution
$\nabla\times\mathbf G = (2 - 2)\,\mathbf a_x + (0 - 0)\,\mathbf a_y + (2x - 2x)\,\mathbf a_z = \mathbf 0$, so $\mathbf G$ is conservative. Integrating $\partial f/\partial x = 2xy$ gives $f = x^2y + g(y,z)$; then $\partial f/\partial y = x^2 + \partial g/\partial y = x^2 + 2z$, so $g = 2yz + h(z)$; and $\partial f/\partial z = 2y + h'(z) = 2y$, so $h$ is constant. Thus $f = x^2y + 2yz$, and the line integral is $f(1,2,3) - f(0,0,0) = 2 + 12 = 14$ for every path.
:::
:::

::: exercise Divergence in spherical coordinates {level=3}
Derive the radial term $\dfrac{1}{r^2}\dfrac{\partial(r^2A_r)}{\partial r}$ of the spherical divergence from the definition [[#eq-div-def]], using a small volume bounded by $r$, $r+\Delta r$, $\theta$, $\theta+\Delta\theta$, $\phi$, $\phi+\Delta\phi$.
::: hint
The faces normal to $\mathbf a_r$ have area $r^2\sin\theta\,\Delta\theta\,\Delta\phi$, evaluated at the two radii.
:::
::: solution
The volume is $\Delta v \approx r^2\sin\theta\,\Delta r\,\Delta\theta\,\Delta\phi$. The outer face, at $r + \Delta r$, has area $(r+\Delta r)^2\sin\theta\,\Delta\theta\,\Delta\phi$ and outward normal $\mathbf a_r$; the inner face, at $r$, has area $r^2\sin\theta\,\Delta\theta\,\Delta\phi$ and outward normal $-\mathbf a_r$. Their net flux is

$$
\bigl[r^2A_r\bigr]_{r+\Delta r}\sin\theta\,\Delta\theta\,\Delta\phi - \bigl[r^2A_r\bigr]_{r}\sin\theta\,\Delta\theta\,\Delta\phi \approx \frac{\partial(r^2A_r)}{\partial r}\,\Delta r\,\sin\theta\,\Delta\theta\,\Delta\phi .
$$

Dividing by $\Delta v$ gives $\dfrac{1}{r^2}\dfrac{\partial(r^2A_r)}{\partial r}$. The factor $r^2$ inside the derivative records the growth of the face area with radius; the $\theta$-term similarly contains $\sin\theta\,A_\theta$ because the $\theta$-faces have area $r\sin\theta\,\Delta r\,\Delta\phi$, which depends on $\theta$.
:::
:::

::: exercise A point source and the divergence theorem {level=3 check="4*pi"}
For $\mathbf F = \mathbf a_r/r^2$, show that $\nabla\cdot\mathbf F = 0$ for $r>0$ and compute the outward flux through a sphere of radius $a$. Explain why the divergence theorem is not violated. What is the flux through a cube of side $10a$ centred at the origin?
::: hint
Look at the hypothesis of [[#thm-divergence]], and use the theorem on the region between the cube and a small sphere.
:::
::: solution
By [[#eq-div]], $\nabla\cdot\mathbf F = r^{-2}\,\partial(r^2\cdot r^{-2})/\partial r = 0$ for $r > 0$. On the sphere $\mathbf F\cdot\mathrm d\mathbf S = a^{-2}\cdot a^2\sin\theta\,\mathrm d\theta\,\mathrm d\phi$, so the flux is $\int_0^{2\pi}\!\int_0^\pi\sin\theta\,\mathrm d\theta\,\mathrm d\phi = 4\pi$, for any $a$.

The theorem requires $\mathbf F$ to be smooth throughout the volume, and $\mathbf F$ is singular at $r=0$: all of its source is concentrated there. (In the language of distributions, $\nabla\cdot\mathbf F = 4\pi\,\delta(\mathbf r)$.) For the cube, apply the theorem to the region between the cube and a small sphere round the origin, where $\mathbf F$ is smooth and divergence-free: the outward flux through the cube equals the outward flux through the small sphere, so it is also $4\pi$. This is Gauss's law for a point charge.
:::
:::

::: exercise Laplacians {level=2}
Show that $V = \ln\rho$ satisfies $\nabla^2V = 0$ for $\rho > 0$ and that $V = 1/r$ satisfies $\nabla^2V = 0$ for $r > 0$. Which physical potentials are these?
::: solution
In cylindrical coordinates $\partial V/\partial\rho = 1/\rho$, so $\nabla^2V = \rho^{-1}\,\partial(\rho\cdot\rho^{-1})/\partial\rho = 0$. In spherical coordinates $\partial V/\partial r = -1/r^2$, so $\nabla^2V = r^{-2}\,\partial(r^2\cdot(-r^{-2}))/\partial r = 0$. Up to constants, $-\ln\rho$ is the potential of an infinite line charge and $1/r$ that of a point charge; both satisfy Laplace's equation away from the charge.
:::
:::
