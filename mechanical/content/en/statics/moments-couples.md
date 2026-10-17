Two people push a door. One pushes at the handle, perpendicular to the panel, and the door swings easily. The other pushes with the same force near the hinge, perpendicular to the panel, and the door barely moves. Push at the handle *along* the panel and nothing happens at all. Force alone does not describe the turning effect of a push; you need the force and where it acts. The quantity that combines them is the **moment of a force**, and the special case in which the net force vanishes but the turning effect does not is a **couple**.

Moments are the reason a spanner is long, a clutch is a set of small forces far from the axis rather than one large force near it, a diving board is cantilevered rather than simply supported, and a ship's righting action depends on the horizontal shift of the buoyancy force rather than on its size. They are also the step that turns the particle statics of the last two chapters into the statics of real structures, because real bodies have size and the forces on them are not concurrent.

::: warning A moment is not a joule
A newton-metre and a joule have the same dimensions, $\mathrm{kg\,m^{2}\,s^{-2}}$, and are never the same thing. Work is a *scalar* — a force dot a displacement — and a moment is a *vector* (or, in a plane, a signed scalar) — a position cross a force. Writing $100\ \mathrm{J}$ for a bolt torque of $100\ \mathrm{N\,m}$ is a category error, and the reason torque is conventionally quoted in newton-metres and never in joules. The distinction is not pedantry: a bolt tightened to $100\ \mathrm{N\,m}$ stores perhaps $25\ \mathrm{J}$ of elastic energy, and confusing the two numbers in a design calculation gives an answer wrong by a factor of four.
:::

## The moment of a force about a point

::: definition Moment of a force {#def-moment}
Let a force $\mathbf{F}$ act at a point $P$, and let $O$ be any point with position vector $\mathbf{r}$ drawn from $O$ to $P$. The **moment of $\mathbf{F}$ about $O$** is the vector
$$
\mathbf{M}_O = \mathbf{r} \times \mathbf{F}, \qquad M_O = r F \sin\theta ,
$$
where $\theta$ is the angle from $\mathbf{r}$ to $\mathbf{F}$ when their tails are together. The moment is perpendicular to the plane containing $O$ and the line of action of $\mathbf{F}$, with the sense given by the right-hand rule. Its magnitude is $M_O = F d$ where $d = r \sin\theta$ is the **moment arm** — the perpendicular distance from $O$ to the line of action. The SI unit is the newton-metre, $\mathrm{N\,m}$.
:::

Two facts follow immediately and are used constantly. First, only the component of $\mathbf{F}$ perpendicular to $\mathbf{r}$ contributes: a force directed along the line to $O$ has no moment about $O$. Second, the moment arm $d$ can be found by *any* perpendicular dropped from $O$ to the line of action, and this is often the fastest route: slide the force along its own line until it is easiest to multiply.

::: proposition Moment is a sliding-vector quantity; transmissibility {#prop-transmissibility}
The moment of a force about a fixed point $O$ is unchanged if the force is moved anywhere along its own line of action. Consequently a force acting on a **rigid** body may be treated as a sliding vector, and replaced at any point of its line without altering the external effect on that body. This is the **principle of transmissibility**. It is *not* valid for the internal forces or the deformation of a body, nor for a flexible one.
:::

::: proof
Move the point of application from $P$ to $P'$ on the same line of action, so the new position vector is $\mathbf{r}' = \mathbf{r} + \lambda \mathbf{F}$ for some scalar $\lambda$. Then
$$
\mathbf{M}_O' = \mathbf{r}' \times \mathbf{F} = (\mathbf{r} + \lambda \mathbf{F}) \times \mathbf{F}
= \mathbf{r} \times \mathbf{F} + \lambda\, \mathbf{F} \times \mathbf{F}
= \mathbf{r} \times \mathbf{F} ,
$$
because the cross product of any vector with itself is zero. The external effect on a rigid body is fully described by the resultant force and the resultant moment about one point, and neither changes, so the body's equilibrium and rigid-body motion are unaffected. The internal forces do change: pushing a rod along its axis at one end puts it in compression, pushing at the other end puts it in tension, and both give the same external force-couple system. Deformation is therefore not covered by transmissibility, and neither is a cable, on which the point of application determines the shape.
:::

::: example Torque on a bolt with a spanner {#ex-spanner}
A mechanic pushes on the end of a spanner of length $0.25\ \mathrm{m}$ with a force of $250\ \mathrm{N}$. The force makes an angle of $60^\circ$ with the handle. What is the moment about the bolt axis? At what angle is the moment greatest?
::: solution
Take moments about the bolt axis $O$, with $\mathbf{r}$ along the handle, $r = 0.25\ \mathrm{m}$:
$$
M_O = r F \sin\theta = 0.25 \times 250 \times \sin 60^\circ = 62.5 \times 0.866 = 54.1\ \mathrm{N\,m}.
$$
Equivalently, resolve the force: the component perpendicular to the handle is $250 \sin 60^\circ = 216.5\ \mathrm{N}$ with arm $0.25\ \mathrm{m}$, giving $54.1\ \mathrm{N\,m}$; the component along the handle is $250 \cos 60^\circ = 125\ \mathrm{N}$ with zero arm, contributing nothing but a useless bending of the bolt shank.

The moment is greatest when $\sin\theta = 1$, that is at $\theta = 90^\circ$, giving $M_{\max} = 62.5\ \mathrm{N\,m}$. Pushing at $60^\circ$ rather than squarely loses $13$ per cent of the available torque, and pushing at $30^\circ$ loses half of it.

*Sanity check.* $54\ \mathrm{N\,m}$ is a typical road-car wheel-bearing torque; a mechanic's one-handed push of $250\ \mathrm{N}$ on a $0.25\ \mathrm{m}$ bar is exactly the right order to reach it. The answer is between $0$ and $62.5\ \mathrm{N\,m}$ as it must be, and it has units of force times length, not force.
:::
:::

## Varignon's theorem and computing moments

::: theorem Varignon's theorem (principle of moments) {#thm-varignon}
The moment about a point $O$ of the resultant of several concurrent forces equals the vector sum of the moments of the individual forces about $O$:
$$
\mathbf{r} \times (\mathbf{F}_1 + \mathbf{F}_2 + \cdots + \mathbf{F}_n)
= \mathbf{r} \times \mathbf{F}_1 + \mathbf{r} \times \mathbf{F}_2 + \cdots + \mathbf{r} \times \mathbf{F}_n .
$$
More generally, for forces acting at different points, the moment of the resultant of a force system about any point equals the sum of the moments of the members of the system about that point — provided the resultant is placed on the correct line of action.
:::

::: proof
The result is the distributive law of the cross product, applied term by term:
$$
\mathbf{r} \times \textstyle \sum_i \mathbf{F}_i
= \mathbf{r} \times \left( \sum_i F_{ix} \mathbf{i} + F_{iy} \mathbf{j} + F_{iz} \mathbf{k} \right)
= \textstyle \sum_i \left( \mathbf{r} \times F_{ix} \mathbf{i} + \mathbf{r} \times F_{iy} \mathbf{j} + \mathbf{r} \times F_{iz} \mathbf{k} \right)
= \textstyle \sum_i \mathbf{r} \times \mathbf{F}_i ,
$$
using bilinearity of the determinant definition of the cross product. For non-concurrent forces, take moments of $\sum \mathbf{F}_i$ applied at a point $Q$ and of the individual forces $\mathbf{F}_i$ applied at $P_i$:
$$
\sum_i \mathbf{r}_i \times \mathbf{F}_i = \mathbf{r}_Q \times \sum_i \mathbf{F}_i + \sum_i (\mathbf{r}_i - \mathbf{r}_Q) \times \mathbf{F}_i ,
$$
and the second term vanishes precisely when $Q$ is chosen on the line of action of the resultant, which is what "the correct line of action" means. Varignon's theorem is what licenses the everyday shortcut of resolving a force into components and adding their moments — a step that would otherwise be unjustified.
:::

Varignon's theorem is the practical method. In two dimensions, with $O$ at the origin and a force $(F_x, F_y)$ acting at $(x, y)$, the $z$-component of $\mathbf{r} \times \mathbf{F}$ is the scalar
$$
M_O = x F_y - y F_x ,
$$
positive anticlockwise. Every force in a plane problem can be handled by this one line, and it removes all the geometric argument about which side of the point the force is on.

::: example Varignon's theorem in a plane {#ex-varignon}
Three forces act on a triangular plate. $\mathbf{F}_1 = (60, 40)\ \mathrm{N}$ at $(0, 0.3)\ \mathrm{m}$, $\mathbf{F}_2 = (-30, 50)\ \mathrm{N}$ at $(0.4, 0)\ \mathrm{m}$ and $\mathbf{F}_3 = (20, -20)\ \mathrm{N}$ at $(0.4, 0.3)\ \mathrm{m}$. Find the resultant force and its moment about the origin $O$.
::: solution
Add the components:
$$
R_x = 60 - 30 + 20 = 50\ \mathrm{N}, \qquad
R_y = 40 + 50 - 20 = 70\ \mathrm{N}, \qquad
R = \sqrt{50^{2} + 70^{2}} = 86.0\ \mathrm{N}
$$
at $\theta = \arctan(70 / 50) = 54.5^{\circ}$ above the $x$-axis. Now the moments, using $M_O = x F_y - y F_x$ for each force:
$$
M_1 = 0 \times 40 - 0.3 \times 60 = -18.0\ \mathrm{N\,m},
$$
$$
M_2 = 0.4 \times 50 - 0 \times (-30) = +20.0\ \mathrm{N\,m},
$$
$$
M_3 = 0.4 \times (-20) - 0.3 \times 20 = -8.0 - 6.0 = -14.0\ \mathrm{N\,m}.
$$
$$
M_O = -18.0 + 20.0 - 14.0 = -12.0\ \mathrm{N\,m},
$$
that is $12.0\ \mathrm{N\,m}$ clockwise.

*Sanity check.* Recompute $M_3$ geometrically: the $-20\ \mathrm{N}$ horizontal component has arm $0.3\ \mathrm{m}$ and turns clockwise about $O$ ($-6.0\ \mathrm{N\,m}$), and the $-20\ \mathrm{N}$ vertical component has arm $0.4\ \mathrm{m}$ and also turns clockwise ($-8.0\ \mathrm{N\,m}$); total $-14.0\ \mathrm{N\,m}$. Agreement. The signs are the whole difficulty in this class of problem, and $x F_y - y F_x$ settles them without argument.
:::
:::

## Moment about a specified axis

::: definition Moment about an axis (triple product) {#def-axis-moment}
The moment of a force about a *line* through $O$ in the direction of the unit vector $\mathbf{u}$ is the component of $\mathbf{M}_O$ along that line,
$$
M_{\mathbf{u}} = \mathbf{u} \cdot (\mathbf{r} \times \mathbf{F})
= \begin{vmatrix} u_x & u_y & u_z \ r_x & r_y & r_z \ F_x & F_y & F_z \end{vmatrix} ,
$$
where $\mathbf{r}$ runs from *any* point on the axis to any point on the line of action of the force. It is a scalar, signed by the sense of $\mathbf{u}$, and it measures the tendency to turn the body *about that axis* — the only component the body can use if it is pinned to it.
:::

::: proposition The moment about an axis is independent of the chosen points {#prop-axis-invariant}
$M_{\mathbf{u}} = \mathbf{u} \cdot (\mathbf{r} \times \mathbf{F})$ is unchanged if the point of $\mathbf{r}$'s tail is moved anywhere along the axis, or its head anywhere along the line of action of $\mathbf{F}$.
:::

::: proof
Move the tail along the axis by $\lambda \mathbf{u}$: the change is $\mathbf{u} \cdot (\lambda \mathbf{u} \times \mathbf{F}) = \lambda\, \mathbf{F} \cdot (\mathbf{u} \times \mathbf{u}) = 0$. Move the head along the line of action by $\mu \mathbf{F}$: the change is $\mathbf{u} \cdot (\mu \mathbf{F} \times \mathbf{F}) = \mu\, \mathbf{F} \cdot (\mathbf{u} \times \mathbf{F}) = 0$, since $\mathbf{u} \times \mathbf{F}$ is perpendicular to $\mathbf{F}$. Both invariances are needed in practice: they mean you may pick whichever point on the axis and whichever point on the force are algebraically convenient, which is why the scalar triple product is usually easier than the vector product followed by a dot product.
:::

::: example Moment about a diagonal axis {#ex-axis}
A force $\mathbf{F} = (30, -20, 50)\ \mathrm{N}$ acts at $P(2, 3, 1)\ \mathrm{m}$. Find its moment about the axis from $A(0, 0, 0)$ to $B(1, 2, 2)\ \mathrm{m}$, and about the $x$-axis.
::: solution
The axis direction is $\mathbf{u}_{AB} = (\mathbf{i} + 2 \mathbf{j} + 2 \mathbf{k}) / \sqrt{1 + 4 + 4} = (0.333, 0.667, 0.667)$. Take $\mathbf{r}$ from $A$ to $P$: $\mathbf{r} = (2, 3, 1)\ \mathrm{m}$. First
$$
\mathbf{M}_A = \mathbf{r} \times \mathbf{F} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \ 2 & 3 & 1 \ 30 & -20 & 50 \end{vmatrix}
= (3 \times 50 - 1 \times (-20)) \mathbf{i} - (2 \times 50 - 1 \times 30) \mathbf{j} + (2 \times (-20) - 3 \times 30) \mathbf{k}
$$
$$
\mathbf{M}_A = 170 \mathbf{i} - 70 \mathbf{j} - 130 \mathbf{k} \quad \mathrm{N\,m}.
$$
Then
$$
M_{AB} = \mathbf{u}_{AB} \cdot \mathbf{M}_A
= \frac{1 \times 170 + 2 \times (-70) + 2 \times (-130)}{3}
= \frac{170 - 140 - 260}{3} = -76.7\ \mathrm{N\,m}.
$$
The negative sign means the force tends to turn the body clockwise about the sense $A \to B$. About the $x$-axis, $\mathbf{u} = \mathbf{i}$ and $M_x = 170\ \mathrm{N\,m}$ immediately.

*Sanity check.* $|M_{AB}| = 76.7\ \mathrm{N\,m}$ must be no greater than $|\mathbf{M}_A| = \sqrt{170^{2} + 70^{2} + 130^{2}} = 224.5\ \mathrm{N\,m}$, since a component cannot exceed the vector; it is $34$ per cent of it, which is plausible for an axis that is not aligned with $\mathbf{M}_A$. Recomputing with $\mathbf{r}$ taken from $B$ instead gives the same $-76.7\ \mathrm{N\,m}$, as the proposition guarantees.
:::
:::

## The couple

::: definition Couple {#def-couple}
A **couple** is a pair of forces equal in magnitude, opposite in sense and acting along two parallel but distinct lines. Its resultant force is zero, and its moment about *every* point in space is the same:
$$
\mathbf{M} = \mathbf{r}_A \times \mathbf{F} + \mathbf{r}_B \times (-\mathbf{F}) = (\mathbf{r}_A - \mathbf{r}_B) \times \mathbf{F} = \mathbf{d} \times \mathbf{F},
\qquad M = F d ,
$$
where $\mathbf{d}$ runs from the line of the second force to the line of the first and $d$ is the perpendicular distance between the two lines, the **arm** of the couple. A couple is therefore a **free vector**: it may be applied anywhere and in any orientation that keeps its vector, and it produces the same turning effect. Its moment is called the **torque** of the couple.
:::

::: proof
Let $\mathbf{F}$ act at $A$ and $-\mathbf{F}$ at $B$. The resultant force is $\mathbf{F} + (-\mathbf{F}) = \mathbf{0}$. The moment about an arbitrary point $O$ is
$$
\mathbf{M}_O = \mathbf{r}_A \times \mathbf{F} + \mathbf{r}_B \times (-\mathbf{F})
= (\mathbf{r}_A - \mathbf{r}_B) \times \mathbf{F} = \mathbf{d} \times \mathbf{F},
$$
which contains no reference to $O$ — the vector $\mathbf{r}_A - \mathbf{r}_B = \mathbf{d}$ is fixed by the two lines of action alone. Because the moment is the same about every point, no single force can be equivalent to a couple (a force has zero moment about points on its own line, a couple never has zero moment), and a couple can only be balanced by another couple of equal and opposite moment. Two couples with the same moment vector are completely equivalent, whatever their forces and arms: $200\ \mathrm{N}$ at $0.15\ \mathrm{m}$ and $20\ \mathrm{N}$ at $1.5\ \mathrm{m}$ are the same thing to a rigid body.
:::

::: example Couples add as free vectors {#ex-couples}
A pipe elbow is loaded by two couples: $M_1 = 300\ \mathrm{N\,m}$ about the $x$-axis and $M_2 = 400\ \mathrm{N\,m}$ about an axis in the $xy$-plane at $30^\circ$ to the $x$-axis. Find the resultant couple.
::: solution
Because couples are free vectors they add by ordinary vector addition. Write
$$
\mathbf{M}_1 = 300\, \mathbf{i}\ \mathrm{N\,m}, \qquad
\mathbf{M}_2 = 400 (\cos 30^\circ\, \mathbf{i} + \sin 30^\circ\, \mathbf{j}) = 346.4\, \mathbf{i} + 200.0\, \mathbf{j}\ \mathrm{N\,m},
$$
$$
\mathbf{M} = 646.4\, \mathbf{i} + 200.0\, \mathbf{j}\ \mathrm{N\,m}, \qquad
M = \sqrt{646.4^{2} + 200.0^{2}} = 676\ \mathrm{N\,m}
$$
at $\arctan(200 / 646.4) = 17.2^{\circ}$ to the $x$-axis in the $xy$-plane.

*Sanity check.* The result lies between the arithmetic sum $700\ \mathrm{N\,m}$ and the vector difference $100\ \mathrm{N\,m}$, and closer to the sum because the two couples are only $30^\circ$ apart. Had they been at right angles the answer would have been $\sqrt{300^{2} + 400^{2}} = 500\ \mathrm{N\,m}$ exactly.
:::
:::

::: widget plot
f: 400*sin(x*pi/180)
x: 0, 180
y: 0, 420
labels: \text{moment of a couple, } M = Fd\sin\theta
caption: Moment of a couple of two $400\ \mathrm{N}$ forces $0.15\ \mathrm{m}$ apart, plotted against the angle $\theta$ between the arm joining the two lines of action and the forces themselves. The maximum is $60\ \mathrm{N\,m}$ at $\theta = 90^\circ$; at $30^\circ$ the moment is $30\ \mathrm{N\,m}$; at $0^\circ$ the two forces are collinear and the couple vanishes. This is why bolt circles, clutch plates and flange bolts are sized by the *perpendicular* spacing of the forces they carry.
:::

## Reducing a force system to a force and a couple at a point

Any system of forces acting on a rigid body, however complicated, can be replaced by a single force $\mathbf{F}_R$ and a single couple $\mathbf{M}_{R,O}$, both evaluated at an arbitrarily chosen point $O$, without changing the external effect. This reduction is the algebraic backbone of rigid-body statics, of cross-section analysis in [[solid-mechanics/stress-strain-3d]], and of the definition of the stress tensor.

::: proposition Reduction of a force system {#prop-reduction}
A system of forces $\mathbf{F}_i$ acting at points $P_i$ is externally equivalent to
$$
\mathbf{F}_R = \sum_i \mathbf{F}_i , \qquad
\mathbf{M}_{R,O} = \sum_i \mathbf{r}_i \times \mathbf{F}_i ,
$$
a force applied at $O$ together with a couple. Changing the reduction point from $O$ to $O'$ changes the couple to
$$
\mathbf{M}_{R,O'} = \mathbf{M}_{R,O} + \mathbf{r}_{O \to O'} \times \mathbf{F}_R ,
$$
while leaving $\mathbf{F}_R$ unchanged. Two consequences: the component of $\mathbf{M}_{R}$ along $\mathbf{F}_R$, called the **twist** or **pitch** component, is independent of $O$; and there is always some point (in three dimensions, a whole line of points) at which the couple's component perpendicular to $\mathbf{F}_R$ vanishes, so that the system reduces to a **wrench** — a force and a parallel couple.
:::

::: proof
Move each force $\mathbf{F}_i$ to $O$ by transmissibility plus the standard device of inserting $+\mathbf{F}_i$ and $-\mathbf{F}_i$ at $O$: this gives the force $\mathbf{F}_i$ at $O$ together with the couple $\mathbf{r}_i \times \mathbf{F}_i$. Summing over $i$ gives the stated pair, and the equivalence is exact for a rigid body. For the change of point, write $\mathbf{r}_i' = \mathbf{r}_i - \mathbf{a}$ where $\mathbf{a} = \mathbf{r}_{O \to O'}$; then
$$
\mathbf{M}_{R,O'} = \sum_i (\mathbf{r}_i - \mathbf{a}) \times \mathbf{F}_i
= \mathbf{M}_{R,O} - \mathbf{a} \times \mathbf{F}_R = \mathbf{M}_{R,O} + \mathbf{a} \times \mathbf{F}_R \cdot(-1) \cdot(-1) = \mathbf{M}_{R,O} + \mathbf{r}_{O' \to O} \times \mathbf{F}_R .
$$
Dotting with the unit vector $\hat{\mathbf{F}}_R$ gives $\mathbf{M}_{R,O'} \cdot \hat{\mathbf{F}}_R = \mathbf{M}_{R,O} \cdot \hat{\mathbf{F}}_R + (\mathbf{r}_{O' \to O} \times \mathbf{F}_R) \cdot \hat{\mathbf{F}}_R$, and the last term is zero because $\mathbf{r} \times \mathbf{F}_R$ is perpendicular to $\mathbf{F}_R$; the twist is therefore invariant. Finally, choose a point displaced by $\mathbf{a}$ perpendicular to $\mathbf{F}_R$ with $\mathbf{a} \times \mathbf{F}_R = -\mathbf{M}_{\perp}$; such an $\mathbf{a}$ exists and is unique up to a shift along $\mathbf{F}_R$, namely $\mathbf{a} = \mathbf{M}_{\perp} \times \hat{\mathbf{F}}_R / F_R$, which proves the wrench form and the line of points.
:::

::: example Reduce a plane system to a force and a couple, then to one force {#ex-reduce}
Three forces act on a bracket: $\mathbf{F}_1 = (40, 30)\ \mathrm{N}$ at $(0, 0.20)\ \mathrm{m}$, $\mathbf{F}_2 = (-20, 10)\ \mathrm{N}$ at $(0.30, 0)\ \mathrm{m}$ and $\mathbf{F}_3 = (10, -40)\ \mathrm{N}$ at $(0.20, 0.25)\ \mathrm{m}$. Reduce the system to the origin $O$; then replace it by a single force and state where it acts.
::: solution
**Resultant force.**
$$
R_x = 40 - 20 + 10 = 30\ \mathrm{N}, \qquad R_y = 30 + 10 - 40 = 0\ \mathrm{N}, \qquad
\mathbf{F}_R = 30\ \mathrm{N}\ \text{along} + x .
$$
**Resultant couple at $O$**, using $M_O = x F_y - y F_x$:
$$
M_O = [0 \times 30 - 0.20 \times 40] + [0.30 \times 10 - 0] + [0.20 \times (-40) - 0.25 \times 10]
$$
$$
= -8.0 + 3.0 - 10.5 = -15.5\ \mathrm{N\,m}.
$$
So at $O$ the system is a $30\ \mathrm{N}$ force in the $+x$ direction plus a clockwise couple of $15.5\ \mathrm{N\,m}$.

**Single equivalent force.** Because $\mathbf{F}_R \neq \mathbf{0}$ the couple can be removed by moving the force off $O$. Put the force on the line $y = y_0$, where its moment about $O$ is $-y_0 R_x$:
$$
-y_0 \times 30 = -15.5 \quad\Longrightarrow\quad y_0 = 0.517\ \mathrm{m}.
$$
The whole system is therefore equivalent to a single horizontal force of $30\ \mathrm{N}$ acting along the line $y = 0.517\ \mathrm{m}$, above every point of the bracket.

*Sanity check.* Take moments about the point $(0.5, 0.517)$ on the new line of action: the force has zero moment there, and the original three forces give $M = -8.0 + 3.0 - 10.5 + 0.517 \times 30 - 0.5 \times 0 = -15.5 + 15.5 = 0$. Correct — a single force has zero moment about every point on its own line.
:::
:::

::: warning A couple cannot be balanced by a force
Students routinely write $\sum M = 0$ and $\sum F = 0$ as though one implied the other, and try to "cancel" a couple with a force. They are independent conditions: a couple has zero resultant force and non-zero moment, so no force contributes to its balance in $\sum \mathbf{F}$, and no force-free couple appears in $\sum \mathbf{F}$ either. When a couple moment appears in a problem — a motor's torque reaction, a bolt's pretension, a welded joint's applied moment — include it in the moment equation only, and include it with its sign, not its magnitude. Also remember that a couple may be taken about *any* point when writing $\sum M = 0$, which is a licence a single force does not have.
:::

::: history
Varignon's theorem appears in his *Projet d'une nouvelle méchanique* of 1687, published the same year as Newton's *Principia* and much less read; Varignon died in 1722 and the full *Nouvelles conjectures sur la pesanteur* appeared posthumously. The theorem was known in substance to Stevin and to Galileo, but Varignon's statement in terms of components is the one still used, and Euler and Daniel Bernoulli put it into analytic mechanics in the 1750s. The concept of the couple, and the demonstration that its moment is independent of the point, belong to Poinsot's *Éléments de statique* of 1808 and his *Théorie nouvelle de la rotation des corps* of 1834, in which the reduction of an arbitrary force system to a wrench and the geometric picture of Poinsot's ellipsoid and central axis are set out. The "central axis" of that reduction is exactly the line of points along which the wrench form holds, and it is still the cleanest way to state what a general load system does to a rigid body.
:::

::: quiz
A force of magnitude $F$ acts at distance $r$ from $O$. Which change produces the largest moment about $O$?
- [ ] Doubling $F$
- [x] Doubling the moment arm $d$
- [ ] Halving $F$ and doubling $r$
- [ ] Rotating the force to be radial
::: solution
The moment is $M = F d$, so doubling the arm doubles the moment, exactly as doubling the force does — the two are equivalent, and either doubles $M$. Halving $F$ and doubling $r$ leaves $M$ unchanged if the force stays perpendicular, and rotating the force to be radial makes $d = 0$ and the moment zero. The lesson is that force and arm enter $M = Fd$ symmetrically: a small force on a long lever is indistinguishable, as far as rigid-body equilibrium is concerned, from a large force on a short one. That is the whole content of Archimedes' lever, and the reason a $400\ \mathrm{N}$ pull on a $0.5\ \mathrm{m}$ bar exceeds a $1000\ \mathrm{N}$ pull on a $0.15\ \mathrm{m}$ bar.
:::
:::

## Where this leads

Moment is the reason a body needs six equilibrium equations rather than three, which is [[statics/rigid-body-equilibrium]]. Internal moments become bending moment and torque in beams and shafts, treated in [[statics/centroids-distributed-loads]], [[mechanics-of-materials/bending-stress]] and [[mechanics-of-materials/torsion]]. The moment of a force about an axis is what a bearing can and cannot react, and the reduction of a load system to a force and a couple at a point is the definition of an internal stress resultant, used in [[solid-mechanics/stress-strain-3d]] and throughout [[mechanics-of-materials/stress-transformation]].

::: summary
- The moment of a force about a point is $\mathbf{M}_O = \mathbf{r} \times \mathbf{F}$, of magnitude $F d$ where $d$ is the perpendicular distance from the point to the line of action; its unit is the newton-metre.
- A force may be slid along its own line without changing its moment about a fixed point (transmissibility), but this does not extend to internal forces or deformations.
- Varignon's theorem lets a force be resolved into components whose moments are added; in a plane, $M_O = x F_y - y F_x$ with anticlockwise positive.
- The moment about an axis is the scalar triple product $\mathbf{u} \cdot (\mathbf{r} \times \mathbf{F})$, independent of which points on the axis and on the line of action are chosen.
- A couple has zero resultant force and the same moment about every point; couples are free vectors and add like vectors.
- Any force system reduces to a force $\mathbf{F}_R$ and a couple $\mathbf{M}_{R,O}$ at a chosen point; the couple changes with the point but the component of the couple along $\mathbf{F}_R$ does not, and somewhere the system reduces to a wrench.
:::

## Exercises

::: exercise Moment of a force {level=1 check="54"}
A force of $180\ \mathrm{N}$ is applied at the end of a $0.30\ \mathrm{m}$ handle, perpendicular to it. What is the moment about the pivot at the other end? (Enter the answer in $\mathrm{N\,m}$.)
::: solution
$M_O = F d = 180 \times 0.30 = 54\ \mathrm{N\,m}$. Since the force is perpendicular to the handle the moment arm is the full handle length; tilting the force by $30^\circ$ would reduce the moment to $54 \cos 30^\circ = 46.8\ \mathrm{N\,m}$.
:::
:::

::: exercise Moment of a space force {level=1 check="44.8"}
A force $\mathbf{F} = (10, -8, 12)\ \mathrm{N}$ acts at the point $(2, 1, 3)\ \mathrm{m}$. What is the magnitude of its moment about the origin? (Enter the answer in $\mathrm{N\,m}$.)
::: solution
$$
\mathbf{M}_O = \mathbf{r} \times \mathbf{F}
= \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \ 2 & 1 & 3 \ 10 & -8 & 12 \end{vmatrix}
= (1 \times 12 - 3 \times (-8)) \mathbf{i} - (2 \times 12 - 3 \times 10) \mathbf{j} + (2 \times (-8) - 1 \times 10) \mathbf{k}
$$
$$
= 36\, \mathbf{i} + 6\, \mathbf{j} - 26\, \mathbf{k}\ \mathrm{N\,m},
\qquad
M_O = \sqrt{36^{2} + 6^{2} + 26^{2}} = \sqrt{2008} = 44.8\ \mathrm{N\,m}.
$$
The moment about the $x$-axis is $36\ \mathrm{N\,m}$, about the $y$-axis $6\ \mathrm{N\,m}$ and about the $z$-axis $-26\ \mathrm{N\,m}$.
:::
:::

::: exercise Couple {level=1 check="12"}
Two forces of $60\ \mathrm{N}$ act along parallel lines $0.20\ \mathrm{m}$ apart, in opposite senses. What is the moment of the couple? (Enter the answer in $\mathrm{N\,m}$.)
::: solution
$M = F d = 60 \times 0.20 = 12\ \mathrm{N\,m}$, the same about every point. Doubling the force and halving the arm gives the same couple: $120 \times 0.10 = 12\ \mathrm{N\,m}$. This is why a large-diameter clutch with many small pad loads transmits the same torque as a small clutch with one large pad load, at lower wear rate.
:::
:::

::: exercise Varignon {level=2}
Four forces act on a rectangular plate $0.6\ \mathrm{m}$ by $0.4\ \mathrm{m}$: $(50, 0)\ \mathrm{N}$ at the lower-left corner, $(0, 40)\ \mathrm{N}$ at the lower-right, $(-30, 0)\ \mathrm{N}$ at the upper-right and $(0, -20)\ \mathrm{N}$ at the upper-left, with the origin at the lower-left corner. Find the resultant force and its moment about the origin, and locate the line of action.
::: solution
$$
R_x = 50 - 30 = 20\ \mathrm{N}, \qquad R_y = 40 - 20 = 20\ \mathrm{N}, \qquad
F_R = \sqrt{20^{2} + 20^{2}} = 28.3\ \mathrm{N}
$$
at $45^\circ$. Moments, with $M_O = x F_y - y F_x$:
$$
M_O = [0 - 0] + [0.6 \times 40 - 0] + [0.6 \times 0 - 0.4 \times (-30)] + [0 - 0.4 \times 0]
= 24.0 + 12.0 = 36.0\ \mathrm{N\,m}.
$$
The line of action of the resultant is at perpendicular distance $d = M_O / F_R = 36.0 / 28.3 = 1.27\ \mathrm{m}$ from the origin, on the anticlockwise side. Writing the line as $y = x + c$ (it has slope 1), the moment about the origin of a force $(20, 20)$ acting anywhere on it is $x \times 20 - y \times 20 = -20 c$, so $-20 c = 36.0$ and $c = -1.80\ \mathrm{m}$: the line is $y = x - 1.80$, well outside the plate.

That the line of action falls outside the body is normal and important — it is exactly the situation that makes a tall, narrow object tip.
:::
:::

::: exercise Moment about an axis {level=2 check="-76.7"}
A force $\mathbf{F} = (30, -20, 50)\ \mathrm{N}$ acts at $P(2, 3, 1)\ \mathrm{m}$. Find the moment about the axis from $A(0, 0, 0)$ to $B(1, 2, 2)\ \mathrm{m}$. (Enter the answer in $\mathrm{N\,m}$, with sign.)
::: solution
$\mathbf{u}_{AB} = (1, 2, 2) / 3$, $\mathbf{r} = \vec{AP} = (2, 3, 1)\ \mathrm{m}$, and $\mathbf{M}_A = \mathbf{r} \times \mathbf{F} = (170, -70, -130)\ \mathrm{N\,m}$. Then
$$
M_{AB} = \mathbf{u}_{AB} \cdot \mathbf{M}_A = \frac{170 - 140 - 260}{3} = -76.7\ \mathrm{N\,m}.
$$
Recomputing with $\mathbf{r} = \vec{BP} = (1, 1, -1)$ gives the same value, confirming the invariance. The magnitude of the total moment about $A$ is $224.5\ \mathrm{N\,m}$, of which only $34$ per cent is usable about the diagonal axis; the rest is reacted by the axis's bearings.
:::
:::

::: exercise Reduction to a wrench {level=2}
A force system reduces at $O$ to $\mathbf{F}_R = (60, 0, 80)\ \mathrm{N}$ and $\mathbf{M}_{R,O} = (30, 40, -22.5)\ \mathrm{N\,m}$. Find the twist (pitch) component of the couple, and the line of points about which the system reduces to a single force.
::: solution
$F_R = \sqrt{60^{2} + 80^{2}} = 100\ \mathrm{N}$, so $\hat{\mathbf{F}} = (0.6, 0, 0.8)$ and
$$
M_\parallel = \hat{\mathbf{F}} \cdot \mathbf{M}_{R,O}
= 0.6 \times 30 + 0 \times 40 + 0.8 \times (-22.5) = 18.0 - 18.0 = 0\ \mathrm{N\,m}.
$$
The couple is entirely perpendicular to the force, so the system is not a wrench at all but a single force. Since $\mathbf{M} \cdot \mathbf{F} = 0$, the shift $\mathbf{a}$ from $O$ to the line of action solves $\mathbf{a} \times \mathbf{F}_R = -\mathbf{M}_{R,O}$ and is, by the vector triple product,
$$
\mathbf{a} = \frac{\mathbf{M}_{R,O} \times \mathbf{F}_R}{F_R^{2}} : \qquad
\left( \frac{\mathbf{M} \times \mathbf{F}}{F^{2}} \right) \times \mathbf{F}
= \frac{\mathbf{F}(\mathbf{M} \cdot \mathbf{F}) - \mathbf{M}(\mathbf{F} \cdot \mathbf{F})}{F^{2}} = -\mathbf{M}.
$$
Numerically,
$$
\mathbf{M}_{R,O} \times \mathbf{F}_R
= \big( 40 \times 80 - (-22.5) \times 0,\; (-22.5) \times 60 - 30 \times 80,\; 30 \times 0 - 40 \times 60 \big)
= (3200,\; -3750,\; -2400)\ \mathrm{N^{2}m},
$$
$$
\mathbf{a} = (0.320,\; -0.375,\; -0.240)\ \mathrm{m}, \qquad |\mathbf{a}| = 0.541\ \mathrm{m}.
$$
*Check.* $\mathbf{a} \times \mathbf{F}_R = \big( (-0.375)(80) - (-0.240)(0),\; (-0.240)(60) - (0.320)(80),\; (0.320)(0) - (-0.375)(60) \big)$
$$
= (-30.0,\; -14.4 - 25.6,\; 22.5) = (-30.0,\; -40.0,\; 22.5) = -\mathbf{M}_{R,O}.
$$
Correct in all three components. Note that $|\mathbf{a}| = 0.541\ \mathrm{m} = M_\perp / F_R = 54.1 / 100$, as it must be, and that every point of the line $\mathbf{a} + \lambda \hat{\mathbf{F}}$ is equally valid — the line of action of a force is a line, not a point.
:::
:::

::: exercise Design: bolt circle {level=3}
A flanged coupling must transmit $500\ \mathrm{N\,m}$ using six bolts on a pitch-circle diameter of $150\ \mathrm{mm}$. Find the shear force in each bolt. If one bolt is missing during operation, what is the maximum force in any of the remaining five?
::: solution
**Six bolts.** With a rigid flange and identical bolts the load is shared equally, and each takes a tangential force
$$
F = \frac{T}{n r} = \frac{500}{6 \times 0.075} = 1111\ \mathrm{N}.
$$
**Five bolts.** Equal sharing is no longer available, because the flange rotates about the *centroid of the remaining bolt group*, and the force in a bolt is proportional to its distance from that centre. Put the missing bolt at angle $0^\circ$; the survivors are at $60^\circ, 120^\circ, 180^\circ, 240^\circ, 300^\circ$, whose centroid is at
$$
\bar{x} = \frac{r}{5} \sum \cos\theta_i = \frac{0.075}{5} (0.5 - 0.5 - 1 - 0.5 + 0.5) = -0.015\ \mathrm{m}, \qquad \bar{y} = 0 .
$$
The distances from this centre are $0.0835\ \mathrm{m}$ for the two bolts nearest the gap at $60^\circ$ and $300^\circ$, $0.0687\ \mathrm{m}$ for those at $120^\circ$ and $240^\circ$, and $0.0600\ \mathrm{m}$ for the bolt at $180^\circ$, giving
$$
\textstyle \sum d_i^{2} = 2 (0.0835^{2} + 0.0687^{2} + 0.0600^{2}) = 0.03059\ \mathrm{m^{2}} .
$$
The torsion of a rigid plate about its centroid gives $F_i = T d_i / \sum d_j^{2}$, so the worst bolt carries
$$
F_{\max} = \frac{500 \times 0.0835}{0.03059} = 1365\ \mathrm{N},
$$
$23$ per cent above the six-bolt value and $2.7$ per cent above the naive mean $500 / (5 \times 0.075) = 1333\ \mathrm{N}$.

*Design conclusion.* Losing one bolt of six raises the worst bolt by only about a quarter, which is tolerable if the joint is rated for it; but the load is also now *eccentric*, since the bolt-group centre no longer coincides with the shaft axis, and a flange that was self-equilibrating now bends. A coupling intended to survive a missing bolt must be rated on the eccentric group, not on the symmetric one.
:::
:::

::: exercise Derivation: moment of a force about an arbitrary point {level=3}
Show that for a plane system of parallel forces $P_i$ acting at positions $x_i$ measured from a line, the moment about that line is $M = R \bar{x}$ where $R = \sum P_i$ and $\bar{x} = \sum P_i x_i / \sum P_i$; and use the result to show that the resultant of a uniformly distributed load $w$ over a span $L$ acts at mid-span with magnitude $w L$, and that the resultant of a triangular load rising from $0$ to $w$ over $L$ acts at $2 L / 3$ from the apex with magnitude $w L / 2$.
::: solution
For parallel forces perpendicular to the $x$-axis, each has moment $P_i x_i$ about the reference line, so
$$
M = \sum_i P_i x_i = \left( \sum_i P_i \right) \frac{\sum_i P_i x_i}{\sum_i P_i} = R \bar{x} .
$$
That is, the resultant acts at the *centroid* of the load pattern. Passing to the continuous case, $R = \int w(x)\, \mathrm{d}x$ and $\bar{x} = \int x\, w(x)\, \mathrm{d}x / \int w(x)\, \mathrm{d}x$, which is the first moment of area divided by the area — so the resultant of a distributed load equals the area under the load diagram and acts through its centroid.

**Uniform load.** $R = \int_0^L w\, \mathrm{d}x = w L$ and $\bar{x} = \int_0^L x w\, \mathrm{d}x / (w L) = (w L^{2} / 2) / (w L) = L / 2$. Mid-span, as expected.

**Triangular load.** With $w(x) = w x / L$,
$$
R = \int_0^L \frac{w x}{L}\, \mathrm{d}x = \frac{w L}{2}, \qquad
\bar{x} = \frac{\int_0^L x (w x / L)\, \mathrm{d}x}{w L / 2}
= \frac{w L^{2} / 3}{w L / 2} = \frac{2 L}{3}.
$$
Two-thirds of the way from the apex, which is the centroid of a triangle. These two results are the whole content of the "replace the distributed load by its resultant" step used in every beam calculation, and they are why [[statics/centroids-distributed-loads]] is a chapter of its own: the same centroid algebra, applied to areas and volumes, gives centroids, second moments of area and the section properties needed in [[statics/area-moments]].
:::
:::
