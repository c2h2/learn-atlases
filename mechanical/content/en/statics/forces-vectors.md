A force is a push or a pull, and it is the first idea in mechanics. Everything else in this atlas — the stress in a crane jib, the lift on a wing, the thrust holding a satellite in orbit, the load a bolt must carry — is a statement about forces, and every one of those statements begins with the same two questions: **how big is it, and which way does it point**. A number without a direction is not a force, and a direction without a number is not a force either.

Statics is the mechanics of bodies that do not accelerate. It is not a special case of the more exciting dynamics that follows it: it is the part of mechanics that engineering uses most, because a bridge, a building frame, a pressure-vessel support, a machine bed and an aircraft on the ground at rest are all required to be in equilibrium, and because the forces found from equilibrium are the loads that the strength-of-materials and design chapters then have to carry. This first chapter builds the bookkeeping: what a force is, how forces add, how a force is resolved into components, and how a system of many forces is replaced by one resultant.

The vector language developed here is used without change in [[dynamics/newtons-laws]], in [[mechanics-of-materials/axial-loading]] and in every aerospace chapter, so the investment is made once and drawn on for the rest of the atlas.

## Force, vector and unit

::: definition Force {#def-force}
A **force** is the action of one body on another, capable of tending to change the state of motion of the body it acts on, or of deforming it. A force is completely described, for the external mechanics of a rigid body, by four attributes: its **magnitude**, its **line of action**, its **sense** (which way along that line) and its **point of application**. Forces come in two kinds by how they are transmitted: **contact forces**, which arise where bodies touch (a roller under a beam, a cable on a hook, fluid pressure on a wall), and **body-action** or **long-range forces**, which act throughout the volume of a body without contact (weight, the gravitational attraction of the Earth, and in a broader context electrostatic and magnetic forces). A contact force spread over an area is a **distributed force**; when the area is small compared with the body it is idealised as a **concentrated force** acting at a point.
:::

The magnitude of a force is a **scalar**: a number with a unit and no direction. Temperature, mass, time, energy and volume are scalars. A **vector** has a magnitude *and* a direction and obeys the parallelogram law of addition below. We write vectors in bold upright — $\mathbf{F}$, $\mathbf{r}$, $\mathbf{v}$ — and their magnitudes in italic — $F = \lvert \mathbf{F} \rvert$. Two vectors are equal when their magnitudes are equal and their directions are parallel with the same sense; a vector is therefore a **free vector**, movable anywhere in space so long as its magnitude and direction are preserved. A force is not free: sliding it along its own line of action is allowed for a rigid body (this is the **principle of transmissibility**, and it is exactly what makes a force a **sliding vector**), but moving it off that line changes the moment it produces and is not allowed.

::: definition Units and dimensions of force {#def-units}
In the SI system the base units used in mechanics are the metre $\mathrm{m}$ (length), the kilogram $\mathrm{kg}$ (mass) and the second $\mathrm{s}$ (time). Force is derived from Newton's second law, $\mathbf{F} = m \mathbf{a}$: the **newton** is the force that gives a mass of one kilogram an acceleration of one metre per second squared,
$$
1\ \mathrm{N} = 1\ \mathrm{kg \cdot m / s^{2}} .
$$
Force therefore has dimension $\mathsf{F} = \mathsf{M L T^{-2}}$. Multiples in ordinary engineering use are the kilonewton $1\ \mathrm{kN} = 10^{3}\ \mathrm{N}$, the meganewton $1\ \mathrm{MN} = 10^{6}\ \mathrm{N}$ and the millinewton. The weight of a mass $m$ at the Earth's surface is $W = m g$ with $g = 9.81\ \mathrm{m/s^{2}}$, so a $100\ \mathrm{kg}$ mass weighs $981\ \mathrm{N}$, or $0.981\ \mathrm{kN}$.
:::

The distinction between mass and weight is worth stating once, precisely, because it is a source of real accidents in lifting and structural work. Mass is a property of a body, measured in kilograms, and the same on the Moon as on the Earth. Weight is the gravitational force on that mass, measured in newtons, and is $1.62\ \mathrm{m/s^{2}} / 9.81\ \mathrm{m/s^{2}} \approx 17$ per cent of the Earth value on the Moon. A "load of $500\ \mathrm{kg}$" in a works specification is a mass whose weight is $4.90\ \mathrm{kN}$; a lifting machine's rating, by contrast, is a force. In US customary units force is the pound-force $\mathrm{lbf}$ and mass the slug, with $1\ \mathrm{lbf} = 4.4482\ \mathrm{N}$; older British texts use the tonne-force, $1\ \mathrm{tf} = 9.807\ \mathrm{kN}$. Never mix systems inside one calculation.

::: warning Rounding and significant figures
Engineering data are known to two or three significant figures: a nominal $10\ \mathrm{kN}$ load is $10\ \mathrm{kN}$, not $10.000\ \mathrm{kN}$. Carry four or five figures through a calculation and round the *answer* to three, which is the convention of this atlas and of the standard texts. Two errors follow from ignoring this. The first is reporting $R = 871.7797887\ \mathrm{N}$ for a resultant whose inputs justify $872\ \mathrm{N}$, which invites a reader to trust digits that are not there. The second is rounding too early: if in a three-force problem you round each component to two figures before summing, the final angle can move by a degree or more. Keep the unrounded numbers in the calculator and round only what you write down.
:::

## Adding forces: the parallelogram law

::: proposition Parallelogram law of force addition {#def-parallelogram}
Two forces $\mathbf{F}_1$ and $\mathbf{F}_2$ acting at a point are together equivalent to a single force $\mathbf{F}_R$, represented by the diagonal of the parallelogram of which $\mathbf{F}_1$ and $\mathbf{F}_2$ are adjacent sides. If $\theta$ is the angle between the two forces,
$$
F_R = \sqrt{F_1^{2} + F_2^{2} + 2 F_1 F_2 \cos\theta} ,
$$
and the resultant makes an angle $\phi$ with $\mathbf{F}_1$ given by the sine rule applied to the force triangle,
$$
\frac{F_1}{\sin\phi} = \frac{F_R}{\sin(180^\circ - \theta)} .
$$
The order of addition does not matter: $\mathbf{F}_1 + \mathbf{F}_2 = \mathbf{F}_2 + \mathbf{F}_1$.
:::

::: proof
Put the origin at the point of application, take $\mathbf{F}_1$ along the $x$-axis, and write $\mathbf{F}_1 = (F_1, 0)$ and $\mathbf{F}_2 = (F_2 \cos\theta, F_2 \sin\theta)$. Their vector sum is
$$
\mathbf{F}_R = (F_1 + F_2 \cos\theta,\; F_2 \sin\theta),
$$
so
$$
F_R^{2} = F_1^{2} + 2 F_1 F_2 \cos\theta + F_2^{2}\cos^{2}\theta + F_2^{2} \sin^{2}\theta = F_1^{2} + F_2^{2} + 2 F_1 F_2 \cos\theta ,
$$
which is the cosine rule for the triangle with sides $F_1$, $F_2$ and included angle $180^\circ - \theta$ — the same triangle whose closing side is the parallelogram diagonal. The tangent of the angle with the $x$-axis is $F_2 \sin\theta / (F_1 + F_2 \cos\theta)$, which is the sine-rule statement. Commutativity is immediate because scalar addition commutes in each component; and because the components of $(\mathbf{F}_1 + \mathbf{F}_2) + \mathbf{F}_3$ and $\mathbf{F}_1 + (\mathbf{F}_2 + \mathbf{F}_3)$ are identical, addition is also associative. The whole parallelogram construction is therefore nothing but component addition written geometrically, which is why it extends without difficulty to any number of forces and to three dimensions.
:::

The law is an experimental fact about forces, not a piece of geometry, and it was verified for centuries before it was written down: it is the reason two people pulling a rope at an angle produce a pull in a direction neither of them is pulling in.

::: example Two forces on a bolt {#ex-two-forces}
Two forces act on the lug of a casting: $F_1 = 400\ \mathrm{N}$ and $F_2 = 600\ \mathrm{N}$, with an angle of $60^\circ$ between their lines of action. Find the resultant and its direction relative to the $600\ \mathrm{N}$ force.
::: solution
By the cosine rule,
$$
F_R = \sqrt{400^{2} + 600^{2} + 2 \times 400 \times 600 \times \cos 60^\circ}
     = \sqrt{160\,000 + 360\,000 + 240\,000} = \sqrt{760\,000} = 872\ \mathrm{N}.
$$
For the direction, use the force triangle: the angle opposite the $600\ \mathrm{N}$ side is $180^\circ - 60^\circ = 120^\circ$, so if $\phi$ is the angle between the resultant and the $600\ \mathrm{N}$ force,
$$
\sin\phi = \frac{400 \sin 120^\circ}{871.8} = 0.3971, \qquad \phi = 23.4^\circ .
$$
The angle between the resultant and the $400\ \mathrm{N}$ force is $36.6^\circ$, and the two sum to $60^\circ$ as they must.

*Sanity checks.* The resultant lies between the two forces, closer to the larger one, as it must. It is less than the arithmetic sum $1000\ \mathrm{N}$ and greater than the difference $200\ \mathrm{N}$, the two limiting cases $\theta = 0$ and $\theta = 180^\circ$. And at $\theta = 60^\circ$ the value $872\ \mathrm{N}$ is close to $\sqrt{400^2 + 600^2} = 721\ \mathrm{N}$, the value for perpendicular forces, but above it, because $60^\circ < 90^\circ$ means the forces help each other more.
:::
:::

::: widget plot
f: sqrt(400^2+600^2+2*400*600*cos(x*pi/180))
x: 0, 180
y: 200, 1000
points: 60,871.8
labels: \text{resultant of 400 N and 600 N}
caption: The magnitude of the resultant of a $400\ \mathrm{N}$ and a $600\ \mathrm{N}$ force, plotted against the angle $\theta$ between them. Drag or read along the curve: at $\theta = 0$ the resultant is the sum, $1000\ \mathrm{N}$; at $\theta = 90^\circ$ it is $\sqrt{400^2+600^2} = 721\ \mathrm{N}$; at $\theta = 180^\circ$ it is the difference, $200\ \mathrm{N}$. Notice how flat the curve is near $\theta = 180^\circ$ — two nearly opposing large forces give a resultant that is very sensitive to the angle between them, which is why the geometry of a braced panel matters so much more when the members are nearly collinear.
:::

::: quiz
Two forces of magnitude $300\ \mathrm{N}$ act at a point. For which angle between them is the resultant also $300\ \mathrm{N}$?
- [ ] $60^\circ$
- [x] $120^\circ$
- [ ] $90^\circ$
- [ ] $180^\circ$
::: solution
$F_R^{2} = 300^2 + 300^2 + 2 \times 300^2 \cos\theta = 300^2$ requires $2 + 2\cos\theta = 1$, so $\cos\theta = -1/2$ and $\theta = 120^\circ$. Two equal forces $120^\circ$ apart form, with their resultant, an equilateral triangle — a result worth remembering, because it appears in the three-member joint and in the symmetric three-cable lift.
:::
:::

## Components of a force

Adding by the parallelogram law is elegant and slow. The working method is to replace each force by two or three **components** along chosen axes, so that vector addition becomes three sums of numbers.

::: definition Rectangular components in a plane {#def-components-2d}
Let $x$ and $y$ be perpendicular axes and let a force $\mathbf{F}$ lie in their plane, its line of action making an angle $\theta$ with the $x$-axis measured anticlockwise. Its components are
$$
F_x = F \cos\theta, \qquad F_y = F \sin\theta, \qquad \mathbf{F} = F_x \mathbf{i} + F_y \mathbf{j},
$$
and conversely $F = \sqrt{F_x^{2} + F_y^{2}}$ with $\theta = \arctan(F_y / F_x)$, the quadrant of $\theta$ being fixed by the signs of $F_x$ and $F_y$. The components are scalars and may be negative; the magnitude $F$ is always positive.
:::

The angle must be measured from the axis to whose direction the cosine component is referred, and it must be the angle *between the force and that axis*, not an angle given in the figure for another purpose. When a slope is quoted as "1 in 4" or as a gradient, the components follow from the triangle, not from the arctangent of the reciprocal: a force of $F$ along a line of slope $1:4$ has a horizontal component $4F/\sqrt{17}$ and a vertical component $F/\sqrt{17}$.

::: example Resolving along inclined axes {#ex-inclined-axes}
A force of $500\ \mathrm{N}$ acts at $60^\circ$ from the $x$-axis. Resolve it along two non-perpendicular directions, the $u$-axis at $20^\circ$ and the $v$-axis at $110^\circ$ from the $x$-axis, and check the answer.
::: solution
The two axes happen to be perpendicular here ($110^\circ - 20^\circ = 90^\circ$), so the components are
$$
F_u = 500 \cos(60^\circ - 20^\circ) = 500 \cos 40^\circ = 383\ \mathrm{N}, \qquad
F_v = 500 \cos(60^\circ - 110^\circ) = 500 \cos 50^\circ = 321\ \mathrm{N}.
$$
Check by recombining in $x$–$y$:
$$
F_x = 383 \cos 20^\circ + 321 \cos 110^\circ = 359.9 - 109.9 = 250\ \mathrm{N}, \qquad
F_y = 383 \sin 20^\circ + 321 \sin 110^\circ = 131.0 + 301.5 = 433\ \mathrm{N},
$$
and $250^{2} + 433^{2} = 250\,000 \approx 500^{2}$, with $\arctan(433/250) = 60^\circ$. The original force is recovered.

Had the axes not been perpendicular, the components would no longer be projections and could not be found with a cosine. Then the force triangle must be closed: draw $\mathbf{F}$, and from its tip draw lines parallel to the two axes; the sine rule applied to the resulting triangle gives the two components. In practice, write the two unit vectors $\mathbf{u}$ and $\mathbf{v}$ and solve the two simultaneous equations
$$
F_x = F_u u_x + F_v v_x, \qquad F_y = F_u u_y + F_v v_y .
$$
This is what a frame analysis does when a strut and a tie meet a joint at oblique angles, and it is why "resolve along the members and solve" is always safe whereas "multiply by the cosine of whatever angle is nearest" is not.
:::
:::

::: definition Direction cosines and the unit vector of a line {#def-direction-cosines}
In space, let a force $\mathbf{F}$ make angles $\theta_x$, $\theta_y$, $\theta_z$ with the $x$-, $y$- and $z$-axes. Its **direction cosines** are
$$
l = \cos\theta_x, \qquad m = \cos\theta_y, \qquad n = \cos\theta_z, \qquad \mathbf{F} = F(l\, \mathbf{i} + m\, \mathbf{j} + n\, \mathbf{k}),
$$
and they satisfy $l^{2} + m^{2} + n^{2} = 1$. If the line of action passes through $A(x_A, y_A, z_A)$ and $B(x_B, y_B, z_B)$, the position vector from $A$ to $B$ is
$$
\mathbf{r}_{AB} = (x_B - x_A)\mathbf{i} + (y_B - y_A)\mathbf{j} + (z_B - z_A)\mathbf{k}, \qquad
r_{AB} = \lvert \mathbf{r}_{AB} \rvert ,
$$
and the **unit vector** along it is $\mathbf{u}_{AB} = \mathbf{r}_{AB} / r_{AB} = (l, m, n)$. A force of magnitude $F$ directed from $A$ towards $B$ is therefore
$$
\mathbf{F} = F\, \mathbf{u}_{AB} = F\, \frac{\mathbf{r}_{AB}}{r_{AB}} .
$$
:::

::: proof
The three components of a vector are its orthogonal projections on the axes, so $F_x = F \cos\theta_x$ and so on, which is the first statement. The magnitude of a vector is the square root of the sum of the squares of its components, so $F^{2} = F^{2}(l^{2} + m^{2} + n^{2})$, and dividing by $F^{2}$ gives $l^{2} + m^{2} + n^{2} = 1$. That identity is a useful check on every three-dimensional calculation: if the squares of your three direction cosines do not add to one, one of them has the wrong sign. It also shows that only two of the three angles are independent — a line in space has two degrees of freedom, not three.
:::

::: example Force of a mast stay in three dimensions {#ex-mast-stay}
A vertical mast stands on a deck with its top at $B(0, 0, 6)\ \mathrm{m}$. A stay runs from $B$ to a deck eye at $C(2, -3, 0)\ \mathrm{m}$ and is tensioned to $840\ \mathrm{N}$. Express the force the stay exerts on the mast top as a Cartesian vector, and find its coordinate direction angles.
::: solution
The force pulls the mast top towards the deck eye, so the relevant vector runs from $B$ to $C$:
$$
\mathbf{r}_{BC} = (2 - 0)\mathbf{i} + (-3 - 0)\mathbf{j} + (0 - 6)\mathbf{k}
               = 2 \mathbf{i} - 3 \mathbf{j} - 6 \mathbf{k}\ \mathrm{m},
$$
$$
r_{BC} = \sqrt{2^{2} + 3^{2} + 6^{2}} = \sqrt{49} = 7.00\ \mathrm{m}, \qquad
\mathbf{u}_{BC} = 0.2857 \mathbf{i} - 0.4286 \mathbf{j} - 0.8571 \mathbf{k}.
$$
Hence
$$
\mathbf{F} = 840\, \mathbf{u}_{BC}
           = 240 \mathbf{i} - 360 \mathbf{j} - 720 \mathbf{k}\ \mathrm{N}.
$$
The direction angles follow from the direction cosines:
$$
\theta_x = \arccos 0.2857 = 73.4^\circ, \quad
\theta_y = \arccos(-0.4286) = 115.4^\circ, \quad
\theta_z = \arccos(-0.8571) = 149.0^\circ .
$$

*Sanity checks.* $0.2857^{2} + 0.4286^{2} + 0.8571^{2} = 0.0816 + 0.1837 + 0.7346 = 1.000$. The $z$-component is negative and largest, because the stay is steeply downward; the $y$-component is negative because the eye is on the $-y$ side; and the vertical component $720\ \mathrm{N}$ is the downward pull the mast top must carry, which is $86$ per cent of the stay tension. A stay that looks "nearly vertical" on a drawing carries a vertical load that is not nearly its tension, and the ratio is $6/7 = 0.857$, not $1$.
:::
:::

## Resultants of force systems

::: proposition Resultant of a system of forces acting at a point {#def-resultant}
A system of forces $\mathbf{F}_1, \mathbf{F}_2, \dots, \mathbf{F}_n$ acting at a point is equivalent to a single force, the **resultant**
$$
\mathbf{F}_R = \sum_{i=1}^{n} \mathbf{F}_i
= \left(\sum_i F_{ix}\right) \mathbf{i}
+ \left(\sum_i F_{iy}\right) \mathbf{j}
+ \left(\sum_i F_{iz}\right) \mathbf{k}.
$$
For a system whose forces do *not* meet at a point the resultant is still this vector sum, but its line of action is not determined by the sum alone: a force system in general reduces to a force and a couple, which is the subject of [[statics/moments-couples]].
:::

::: example Resultant of three coplanar forces {#ex-three-coplanar}
Three forces act on a gusset plate: $500\ \mathrm{N}$ at $30^\circ$, $700\ \mathrm{N}$ at $130^\circ$ and $600\ \mathrm{N}$ at $250^\circ$, all angles measured anticlockwise from the $+x$-axis. Find the resultant.
::: solution
Resolve each force, tabulating to keep the signs straight:

| Force | $x$-component $(\mathrm{N})$ | $y$-component $(\mathrm{N})$ |
|---|---|---|
| $500\ \mathrm{N}$ at $30^\circ$ | $500\cos 30^\circ = +433.0$ | $500\sin 30^\circ = +250.0$ |
| $700\ \mathrm{N}$ at $130^\circ$ | $700\cos 130^\circ = -450.0$ | $700\sin 130^\circ = +536.2$ |
| $600\ \mathrm{N}$ at $250^\circ$ | $600\cos 250^\circ = -205.2$ | $600\sin 250^\circ = -563.8$ |
| **Sum** | $-222.2$ | $+222.4$ |

Then
$$
F_R = \sqrt{(-222.2)^{2} + (222.4)^{2}} = 314\ \mathrm{N}.
$$
The reference angle is $\arctan(222.4 / 222.2) = 45.0^\circ$, but $F_x < 0$ and $F_y > 0$ place the resultant in the second quadrant, so
$$
\theta = 180^\circ - 45.0^\circ = 135.0^\circ .
$$

*Sanity check.* The three forces are roughly, though not exactly, symmetrically placed at $120^\circ$ apart, so a resultant much smaller than any of them is expected; $314\ \mathrm{N}$ against forces of $500$–$700\ \mathrm{N}$ is consistent. Had the answer come out near $1800\ \mathrm{N}$, an error in a sign would be the first thing to look for.
:::
:::

::: warning Magnitudes do not add
The single most common error in this chapter is to write $F_R = F_1 + F_2$ for forces that are not collinear. The correct statement is $\mathbf{F}_R = \mathbf{F}_1 + \mathbf{F}_2$, a vector equation, and it implies $F_R \le F_1 + F_2$ with equality only when the two forces have the same direction. A related error is to add the magnitudes of the components of a force and call the sum the force: $F_x + F_y$ is not $F$, and only $\sqrt{F_x^2 + F_y^2}$ is. When in doubt, sketch the vectors head to tail; if the arithmetic answer does not look like the sketch, one of them is wrong.
:::

::: example Fourth force for equilibrium of a bolt {#ex-fourth-force}
Three forces act on a bolt: $\mathbf{F}_1 = 200 \mathbf{i}\ \mathrm{N}$, $\mathbf{F}_2 = 300 \mathbf{j}\ \mathrm{N}$ and $\mathbf{F}_3 = (-150 \mathbf{i} - 150 \mathbf{j})\ \mathrm{N}$. Find the fourth force that makes the resultant zero.
::: solution
Equilibrium of a particle requires $\sum \mathbf{F} = \mathbf{0}$, so
$$
\mathbf{F}_4 = -(\mathbf{F}_1 + \mathbf{F}_2 + \mathbf{F}_3)
= -\left[(200 - 150)\mathbf{i} + (300 - 150)\mathbf{j}\right]
= -50 \mathbf{i} - 150 \mathbf{j}\ \mathrm{N}.
$$
Its magnitude and direction are
$$
F_4 = \sqrt{50^{2} + 150^{2}} = 158\ \mathrm{N}, \qquad
\theta = \arctan\frac{-150}{-50} = 71.6^\circ \text{ below the } -x \text{ axis},
$$
that is, $\theta = 251.6^\circ$ measured anticlockwise from $+x$.

*Sanity check.* Adding all four forces component by component gives $200 - 150 - 50 = 0$ and $300 - 150 - 150 = 0$. The fourth force points into the third quadrant, opposite to the resultant of the first three, which is exactly what "balances them" means.
:::
:::

## Projection: the dot product

::: definition Scalar product and the component along a line {#def-dot}
The **scalar product** (dot product) of two vectors is
$$
\mathbf{A} \cdot \mathbf{B} = A_x B_x + A_y B_y + A_z B_z = A B \cos\theta ,
$$
where $\theta$ is the angle between them. It is a scalar, it is commutative, and it is zero for perpendicular vectors. The component of a force $\mathbf{F}$ along a line of unit vector $\mathbf{u}$ is the projection
$$
F_u = \mathbf{F} \cdot \mathbf{u},
$$
and the angle between two lines of directions $\mathbf{u}_1$ and $\mathbf{u}_2$ is $\theta = \arccos(\mathbf{u}_1 \cdot \mathbf{u}_2)$.
:::

The projection is the tool that answers the two questions an engineer actually asks about a force on a structure: how much of it pulls *along* this member, and how much of it pushes *into* that support. Only the along-component does axial work in a two-force member; only the perpendicular component shears a bolt or bends a beam.

::: proof
Take $\mathbf{A}$ along the $x$-axis, so $\mathbf{A} = (A, 0, 0)$ and $\mathbf{A} \cdot \mathbf{B} = A B_x$. But $B_x$ is the projection of $\mathbf{B}$ on the $x$-axis, which is $B \cos\theta$ where $\theta$ is the angle between the two vectors. Hence $\mathbf{A} \cdot \mathbf{B} = A B \cos\theta$ in that special frame. Both the component-sum definition and $AB\cos\theta$ are invariant under a rotation of axes — the first because it is the contraction of two vectors, which can be checked by substituting the rotation formulas — so equality in one frame implies equality in all frames. Setting $\mathbf{A} = \mathbf{B}$ gives $A^{2} = A_x^{2} + A_y^{2} + A_z^{2}$, the Pythagorean formula for a magnitude, which is the same invariance in a special case.
:::

::: example Angle between two stays, and the load along a mast {#ex-two-stays}
A mast top at $B(0, 0, 6)\ \mathrm{m}$ is stayed to two deck eyes, $C(2, -3, 0)\ \mathrm{m}$ and $D(0, 5, 0)\ \mathrm{m}$. Find the angle between the two stays, and the total downward force on the mast top if each stay carries $840\ \mathrm{N}$.
::: solution
The two unit vectors, directed from the mast top down to the deck, are
$$
\mathbf{u}_{BC} = \frac{2 \mathbf{i} - 3 \mathbf{j} - 6 \mathbf{k}}{7}
               = 0.2857 \mathbf{i} - 0.4286 \mathbf{j} - 0.8571 \mathbf{k},
$$
$$
\mathbf{r}_{BD} = 0 \mathbf{i} + 5 \mathbf{j} - 6 \mathbf{k}\ \mathrm{m}, \qquad
r_{BD} = \sqrt{25 + 36} = 7.81\ \mathrm{m}, \qquad
\mathbf{u}_{BD} = 0 \mathbf{i} + 0.6402 \mathbf{j} - 0.7682 \mathbf{k}.
$$
Their scalar product is
$$
\mathbf{u}_{BC} \cdot \mathbf{u}_{BD}
= 0 - (0.4286)(0.6402) + (-0.8571)(-0.7682)
= -0.2744 + 0.6584 = 0.3840 ,
$$
so the angle between the stays is $\theta = \arccos 0.3840 = 67.4^\circ$.

The downward force from each stay is the projection of its tension onto the downward vertical $-\mathbf{k}$:
$$
F_{z,BC} = 840 \times 0.8571 = 720\ \mathrm{N}, \qquad
F_{z,BD} = 840 \times 0.7682 = 645\ \mathrm{N},
$$
giving a total downward pull of $1365\ \mathrm{N}$ on the mast top, before any load applied at the top. The horizontal components, $240\ \mathrm{N}$ in the $+x$ direction and $360\ \mathrm{N}$ in the $+y$ direction from $BC$ and $BD$ respectively, do not cancel: the mast top is side-loaded by $\sqrt{240^2 + 360^2} = 433\ \mathrm{N}$, and a fourth stay or a check-stay is needed to balance it.

*Sanity check.* Both stays are steeper than $45^\circ$ — their vertical drops of $6\ \mathrm{m}$ exceed their horizontal runs of $\sqrt{13} = 3.6\ \mathrm{m}$ and $5\ \mathrm{m}$ — so each should contribute more vertical than horizontal pull, and $720 > 240$, $645 > 360$ confirm it. The angle between them, $67.4^\circ$, is less than the $90^\circ$ one might guess from the plan view, because both lean downward towards the same deck level.
:::
:::

::: history
The composition of forces was stated as a rule long before it was proved. The parallelogram of forces appears in a manuscript of Leonardo da Vinci around 1500 and in print in Stevin's *De Beghinselen des Waterwichts* and *Staticorum* of 1586, where the equilibrium of a body on an inclined plane is solved by resolving weight into components along and perpendicular to the plane — the first systematic use of resolution in statics. Varignon published the *Projet d'une nouvelle méchanique* in 1687, the year of Newton's *Principia*, and proved the theorem of moments that still carries his name; Newton's own corollary I to the *Principia* is the parallelogram law, stated as the composition of two velocities. Varignon's 1687 memoir was, in his own account, communicated to the Académie des Sciences within weeks of Newton's book appearing, and the two together put statics on a vector footing a century and a half before the word "vector" was coined by Hamilton in 1843 and the notation of $\mathbf{i}$, $\mathbf{j}$, $\mathbf{k}$ fixed by Gibbs and Heaviside in the 1880s. The practical consequence for engineers was that the graphical statics of the nineteenth century — force polygons drawn to scale on paper, used by Rankine, Culmann and the great bridge engineers of the 1860s — could be replaced by arithmetic, and then, in the twentieth, by the matrix and computer methods that every frame in this atlas is analysed with.
:::

## Where this leads

The vector arithmetic of this chapter is used unchanged in [[statics/particle-equilibrium]], where the condition $\sum \mathbf{F} = \mathbf{0}$ becomes the working tool, and in [[statics/moments-couples]], where the cross product joins it. The same components reappear as stress components in [[mechanics-of-materials/stress-transformation]], as resolved forces along a path in [[dynamics/work-energy]], and as aerodynamic lift and drag in [[aerodynamics/thin-airfoil-theory]]. The vector algebra used here — position vectors, the dot and cross products, and the geometry of lines in space — is developed at length in the Maths Atlas (see [vectors in three dimensions](/learn/maths/lesson.php?c=multivariable)), and the physics behind Newton's laws in [Mechanics](/learn/physics/lesson.php?c=mechanics).

::: summary
- A force has magnitude, line of action, sense and point of application; for a rigid body it is a sliding vector, and moving it off its line of action changes the problem.
- Force is measured in newtons, $1\ \mathrm{N} = 1\ \mathrm{kg \cdot m / s^{2}}$, and weight is the force $W = mg$, not the mass.
- Forces add by the parallelogram law, which is component addition in disguise; magnitudes do not add.
- Resolve forces into rectangular components with the angle measured from the axis referred to, and check the quadrant of the answer with the signs of $F_x$ and $F_y$.
- In space, a force along $AB$ is $F \mathbf{r}_{AB} / r_{AB}$, and its direction cosines satisfy $l^{2} + m^{2} + n^{2} = 1$.
- The resultant of a concurrent system is the vector sum of its forces; the projection $\mathbf{F} \cdot \mathbf{u}$ gives the component along any chosen line.
:::

## Exercises

::: exercise Resultant of two forces {level=1 check="1044"}
Two forces of $600\ \mathrm{N}$ and $800\ \mathrm{N}$ act at a point with an angle of $120^\circ$ between them. Find the magnitude of the resultant. (Enter the force in N.)
::: solution
$F_R = \sqrt{600^{2} + 800^{2} + 2 \times 600 \times 800 \times \cos 120^\circ}
     = \sqrt{360\,000 + 640\,000 - 480\,000} = \sqrt{520\,000} = 1044\ \mathrm{N}$.
The angle between the two forces is obtuse, so the resultant is only a little larger than the bigger force — the two partly cancel.
:::
:::

::: exercise Weight and mass {level=1 check="4.90"}
A machine of mass $500\ \mathrm{kg}$ is lifted by a single vertical cable. What is the tension in the cable when the machine hangs at rest? (Enter the force in kN.)
::: solution
At rest the acceleration is zero, so the cable tension equals the weight:
$T = mg = 500 \times 9.81 = 4905\ \mathrm{N} = 4.90\ \mathrm{kN}$.
If the machine is accelerated upward at $1.5\ \mathrm{m/s^{2}}$ the tension becomes $m(g + a) = 500 \times 11.31 = 5.66\ \mathrm{kN}$, seventeen per cent more — which is why a lifting machine's rated capacity is reduced for hoisting with acceleration.
:::
:::

::: exercise Components on an inclined line {level=1 check="779"}
A guy rope of tension $900\ \mathrm{N}$ makes an angle of $30^\circ$ with the vertical pole it is attached to. Find the component of the pull along the pole. (Enter the force in N.)
::: solution
The angle between the rope and the pole is $30^\circ$, so the component along the pole is
$$
F_\parallel = 900 \cos 30^\circ = 779\ \mathrm{N},
$$
and the component perpendicular to the pole, which bends it, is $900 \sin 30^\circ = 450\ \mathrm{N}$. The rope both compresses the pole and bends it, and it is the $450\ \mathrm{N}$ that governs the bending stress even though it is the smaller of the two.
:::
:::

::: exercise Direction cosines {level=2}
A force of $1200\ \mathrm{N}$ acts along the line from $A(1, 2, 2)\ \mathrm{m}$ to $B(5, 6, -2)\ \mathrm{m}$. Find its components and its coordinate direction angles.
::: solution
$\mathbf{r}_{AB} = 4 \mathbf{i} + 4 \mathbf{j} - 4 \mathbf{k}\ \mathrm{m}$, $r_{AB} = \sqrt{3 \times 16} = 6.93\ \mathrm{m}$, so $\mathbf{u}_{AB} = 0.5774 \mathbf{i} + 0.5774 \mathbf{j} - 0.5774 \mathbf{k}$ and
$$
\mathbf{F} = 1200 \times 0.5774\, (\mathbf{i} + \mathbf{j} - \mathbf{k})
           = 693 \mathbf{i} + 693 \mathbf{j} - 693 \mathbf{k}\ \mathrm{N}.
$$
The direction angles are $\theta_x = \theta_y = 54.7^\circ$ and $\theta_z = 125.3^\circ$. The three direction cosines are equal in magnitude because the line is equally inclined to all three axes, and $3 \times 0.5774^{2} = 1.000$ as required.
:::
:::

::: exercise Resultant in space {level=2 check="5.74"}
Three forces act at a point: $\mathbf{F}_1 = (3 \mathbf{i} - 2 \mathbf{j} + 4 \mathbf{k})\ \mathrm{N}$, $\mathbf{F}_2 = (-\mathbf{i} + 5 \mathbf{j} - 2 \mathbf{k})\ \mathrm{N}$ and $\mathbf{F}_3 = (2 \mathbf{i} + \mathbf{j} - 3 \mathbf{k})\ \mathrm{N}$. Find the magnitude of the resultant. (Enter the force in N.)
::: solution
$\mathbf{F}_R = (3 - 1 + 2)\mathbf{i} + (-2 + 5 + 1)\mathbf{j} + (4 - 2 - 3)\mathbf{k} = 4 \mathbf{i} + 4 \mathbf{j} - \mathbf{k}\ \mathrm{N}$, and
$$
F_R = \sqrt{4^{2} + 4^{2} + 1^{2}} = \sqrt{33} = 5.74\ \mathrm{N}.
$$
The tempting wrong answer is the sum of the three magnitudes, $\sqrt{29} + \sqrt{30} + \sqrt{14} = 5.39 + 5.48 + 3.74 = 14.6\ \mathrm{N}$; magnitudes do not add. Note also that the resultant is far smaller than any individual force here, because the three partly cancel.
:::
:::

::: exercise Angle between two cables {level=2 check="51.3"}
Two cables leave a common point along the directions $(4, -3, -6)$ and $(0, 5, -12)$, in metres. Find the angle between them. (Enter the angle in degrees.)
::: solution
Both directions are already given with convenient lengths, $r_1 = \sqrt{16 + 9 + 36} = 7\ \mathrm{m}$ and $r_2 = \sqrt{25 + 144} = 13\ \mathrm{m}$. Then
$$
\cos\theta = \frac{4 \times 0 + (-3)(5) + (-6)(-12)}{7 \times 13}
           = \frac{-15 + 72}{91} = \frac{57}{91} = 0.6264, \qquad
\theta = 51.2^\circ .
$$
Note that the angle is found without ever normalising the two vectors separately, provided both lengths are divided out; forgetting one of them is the usual slip.
:::
:::

::: exercise Design: three-cable lift {level=3}
A machine weighing $18\ \mathrm{kN}$ is lifted by three cables attached to a single ring above it. In the plane of the drawing the cables leave the ring at $90^\circ$ (vertical), at $200^\circ$ and at $320^\circ$, measured anticlockwise from the $+x$-axis. Determine the tension in each cable. Is the arrangement sensible?
::: solution
Let the tensions be $T_1$ (vertical, at $90^\circ$), $T_2$ (at $200^\circ$) and $T_3$ (at $320^\circ$). Equilibrium of the ring gives
$$
\textstyle \sum F_x = T_2 \cos 200^\circ + T_3 \cos 320^\circ = -0.9397 T_2 + 0.7660 T_3 = 0 ,
$$
$$
\textstyle \sum F_y = T_1 + T_2 \sin 200^\circ + T_3 \sin 320^\circ - 18
= T_1 - 0.3420 T_2 - 0.6428 T_3 - 18 = 0 .
$$
The first equation gives $T_2 = 0.8152\, T_3$. Substituting into the second,
$$
T_1 = 18 + 0.3420 \times 0.8152\, T_3 + 0.6428\, T_3 = 18 + 0.9216\, T_3 .
$$
There are two equations and three unknowns, so the system is **statically indeterminate**: the tensions depend on the stretchings of the cables and cannot be found from statics alone. If the two inclined cables are slack ($T_2 = T_3 = 0$) the vertical cable carries all $18\ \mathrm{kN}$; if they are both tensioned to share the load, say $T_3 = 8\ \mathrm{kN}$, then $T_2 = 6.52\ \mathrm{kN}$ and $T_1 = 25.4\ \mathrm{kN}$ — the vertical cable carries *more* than the weight, because the other two pull downward on the ring.

That is the design lesson. Two cables at $200^\circ$ and $320^\circ$ both lie *below* the horizontal, so they can only pull the ring down, and the vertical cable must carry the weight plus their downward components. A sensible three-cable lift puts all three cables above the ring, symmetrically spaced at $120^\circ$ in plan and each inclined at the same angle $\beta$ to the vertical, so that by symmetry each carries $W / (3 \cos\beta)$ and the horizontal components cancel. With $\beta = 30^\circ$ each tension is $18/(3 \times 0.866) = 6.93\ \mathrm{kN}$, and the load on the lifting hook is the full $18\ \mathrm{kN}$, not more.
:::
:::

::: exercise Derivation {level=3}
Prove that if a force $\mathbf{F}$ is resolved into components along two axes whose angle is $\theta$ (not $90^\circ$), the magnitude of the component along the first axis is
$$
F_u = \frac{F \sin(\theta - \alpha)}{\sin \theta}
$$
where $\alpha$ is the angle from the first axis to the force. Show that the expression reduces to $F \cos\alpha$ when $\theta = 90^\circ$, and discuss what happens as $\theta \to 0$.
::: solution
Close the force triangle: $\mathbf{F} = F_u \mathbf{u} + F_v \mathbf{v}$, where $\mathbf{u}$ and $\mathbf{v}$ are unit vectors along the two axes. Draw $F_u \mathbf{u}$ from the origin along the first axis and $F_v \mathbf{v}$ from its tip to the tip of $\mathbf{F}$. The three interior angles of this triangle are: at the origin, $\alpha$ (between the first axis and $\mathbf{F}$); at the tip of $\mathbf{F}$, $\theta - \alpha$ (the angle between $\mathbf{F}$ and the direction of the second axis, since the second axis makes $\theta$ with the first); and at the remaining vertex, $180^\circ - \theta$. The sine rule gives
$$
\frac{F_u}{\sin(\theta - \alpha)} = \frac{F}{\sin(180^\circ - \theta)} = \frac{F}{\sin\theta},
$$
which is the required result.

For $\theta = 90^\circ$ this becomes $F_u = F \sin(90^\circ - \alpha) = F \cos\alpha$, the rectangular formula, as it must. As $\theta \to 0$ the two axes become parallel, $\sin\theta \to 0$, and $F_u \to \infty$ unless $\alpha \to 0$ too. The divergence is not a curiosity but a warning: two nearly parallel members meeting at a joint cannot together resist a force with a component perpendicular to them, and the forces they carry become enormous. This is why a braced panel is never detailed with two nearly collinear members in place of a third direction, and why the flat curve of [[#ex-two-forces]] near $\theta = 180^\circ$ and the divergence here are the same phenomenon seen from two sides.
:::
:::
