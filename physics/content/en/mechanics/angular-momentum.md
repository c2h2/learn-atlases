A force changes the linear momentum of a particle. The rotational partner of that statement is not tied to a fixed axle. The **angular momentum** of a particle about a chosen point is the moment of its momentum about that point, and the torque of the forces about the same point equals the rate at which that angular momentum changes. When the torque vanishes, the angular momentum is a constant of the motion. That single sentence contains the equal-area law of planetary motion, the speeding up of a spinning skater who pulls her arms in, and the reason a bullet embedded in a hanging rod can be analysed about the pivot even though the pivot destroys conservation of ordinary momentum.

This chapter proves the relation between torque and angular momentum for one particle and then for a system, including motion described about the centre of mass. It specialises the result to a rigid body on a symmetry axis, where it collapses to $L = I\omega$ and recovers [[mechanics/rotation]], and it derives the equal-area law for any central force. Conservation of angular momentum is not conservation of energy: the skater and the bullet are there to keep the two apart. Take $g = 9.80\,\mathrm{m/s^2}$. The case in which $\mathbf{L}$ does not lie along $\boldsymbol{\omega}$ is left to [[analytical-mechanics]].

## Angular momentum of a particle

Choose an origin $O$, fixed for the moment, and let $\mathbf{r}$ be the position of a particle relative to $O$. Let $\mathbf{p} = m\mathbf{v}$ be its linear momentum.

::: definition Angular momentum of a particle {#def-L}
The **angular momentum** of a particle about an origin $O$ is

$$
\mathbf{L} = \mathbf{r}\times\mathbf{p} = \mathbf{r}\times m\mathbf{v}.
$$ {#eq-L-def}

Its magnitude is $L = mvr\sin\phi = mv\,r_\perp$, where $\phi$ is the angle between $\mathbf{r}$ and $\mathbf{v}$, and $r_\perp = r\sin\phi$ is the perpendicular distance from $O$ to the line of the velocity. The direction is fixed by the right-hand rule. The origin is part of the definition: a different point gives a different $\mathbf{L}$.
:::

If the velocity is perpendicular to the position, $\sin\phi = 1$ and $L = mvr$. If the velocity points straight at the origin, or straight away from it, $\sin\phi = 0$ and $\mathbf{L} = \mathbf{0}$ even though the particle is moving. Nothing about the particle has changed except the point we are measuring from, or the direction of $\mathbf{v}$ relative to that point. Angular momentum is not a property the particle carries around by itself, in the way mass is.

In a plane, with $O$ at the origin of coordinates, the only component is the one out of the page,

$$
L_z = m(xv_y - yv_x).
$$

Positive $L_z$ means the particle is circulating anticlockwise about $O$. The sign flips when the velocity swings from one side of the radial line to the other, and it is zero at the instant the velocity lies along that line. The figure below is that cross product, drawn per unit mass: if $\mathbf{a}$ stands for $\mathbf{r}$ and $\mathbf{b}$ for $\mathbf{v}$, then $a_x b_y - a_y b_x$ is $L_z/m$.

::: widget vector
ax: 2
ay: 0.5
bx: 0.4
by: 1.5
caption: Read a × b as the angular momentum, per unit mass, out of the page, if a stands for the position and b for the velocity. Drag the tips and watch the cross product change sign when the velocity swings past the radial line.
:::

With the vectors as they first appear, $a_x b_y - a_y b_x = (2)(1.5) - (0.5)(0.4) = 3 - 0.2 = 2.8$. Drag $\mathbf{b}$ until it lies along $\mathbf{a}$ and the product passes through zero; drag it past that line and the product changes sign. That zero is not a special dynamical event. It is the geometry of $\mathbf{r}\times\mathbf{v}$.

::: intuition A lever arm for momentum
Linear momentum asks how fast the mass is moving. Angular momentum asks how much of that motion fails to point at the origin. The factor $r_\perp$ is a lever arm, the same idea as the lever arm of a force in [[mechanics/rotation]], applied to $\mathbf{p}$ instead of $\mathbf{F}$. A large momentum aimed straight at $O$ contributes nothing; a modest momentum with a long lever arm contributes a great deal.
:::

::: example A particle on a circle {#ex-circle}
A particle of mass $m = 0.500\,\mathrm{kg}$ moves in a circle of radius $R = 0.400\,\mathrm{m}$ at speed $v = 3.00\,\mathrm{m/s}$. Find its angular momentum about the centre of the circle, and check the result with $L = I\omega$.
::: solution
The velocity is perpendicular to the radius, so $\sin\phi = 1$ and

$$
L = mvr = (0.500)(3.00)(0.400) = 0.600\,\mathrm{kg\cdot m^2/s}.
$$

The direction is along the axis of the circle, fixed by the right-hand rule, and it does not change during uniform circular motion. For a second calculation, $\omega = v/R = 3.00/0.400 = 7.50\,\mathrm{rad/s}$ and the moment of inertia of the particle about the centre is $I = mR^2 = (0.500)(0.160) = 0.0800\,\mathrm{kg\cdot m^2}$. Then

$$
I\omega = (0.0800)(7.50) = 0.600\,\mathrm{kg\cdot m^2/s},
$$

the same value. The force that keeps the particle on the circle is radial, so its torque about the centre is zero. A constant $\mathbf{L}$ is what a vanishing torque must produce, which is the content of the next section. The areal velocity belonging to this motion is computed once the area law is available: $\deriv{A}{t} = L/(2m) = 0.600/(2\times 0.500) = 0.600\,\mathrm{m^2/s}$.
:::
:::

## Torque and the rate of change

The torque about $O$ was defined in [[mechanics/rotation]] as $\boldsymbol{\tau} = \mathbf{r}\times\mathbf{F}$. For a single particle there is a differential relation between that torque and $\mathbf{L}$, and it does not require the particle to be moving in a circle.

::: theorem Torque on one particle {#thm-taudL}
Let a particle of constant mass $m$ move under a force $\mathbf{F}$, and let $\mathbf{L}$ and $\boldsymbol{\tau}$ both be computed about an origin $O$ that is fixed in an inertial frame. Then

$$
\boldsymbol{\tau} = \deriv{\mathbf{L}}{t}.
$$ {#eq-taudL}

The two sides must refer to the same origin. If the origin accelerates, or if it is a different point for $\boldsymbol{\tau}$ than for $\mathbf{L}$, the equality need not hold.
:::

::: proof
By [[#def-L]], and with $m$ constant,

$$
\deriv{\mathbf{L}}{t} = \deriv{}{t}(\mathbf{r}\times m\mathbf{v}) = \dot{\mathbf{r}}\times(m\mathbf{v}) + \mathbf{r}\times m\dot{\mathbf{v}}.
$$

The first term is $m(\mathbf{v}\times\mathbf{v}) = \mathbf{0}$. In an inertial frame Newton's second law says $m\dot{\mathbf{v}} = \mathbf{F}$, so the second term is $\mathbf{r}\times\mathbf{F} = \boldsymbol{\tau}$. Hence $\deriv{\mathbf{L}}{t} = \boldsymbol{\tau}$.

The step $\dot{\mathbf{r}} = \mathbf{v}$ uses an origin at rest in the inertial frame. If $O$ were accelerating, the derivative of the relative position would not be the inertial velocity, and an extra term would appear. The mass was taken outside the derivative; a variable mass, as in a rocket, needs a separate accounting of the momentum carried in or out, which belongs with [[mechanics/momentum]] rather than with this identity.
:::

The theorem is the rotational form of $\mathbf{F} = \deriv{\mathbf{p}}{t}$. Integrating through a time interval gives an angular impulse: $\int\boldsymbol{\tau}\,\dd t = \Delta\mathbf{L}$. For a brief collision the forces are huge and the interval is tiny, so a torque that stays finite — the weight of a rod, for example — contributes an angular impulse that is negligible beside the angular impulse of the impact. That is why gravity can be ignored during the embedding of a bullet and must be restored afterwards, when the rod swings for a time of order seconds.

::: warning Different points, and kinetic energy
Torque and angular momentum about different points must not be set equal. A body's linear momentum can fail to be conserved, because a pivot pushes, while its angular momentum about that pivot is conserved, because the push has no lever arm. The two statements are about different quantities. A second, separate mistake is to treat a conserved $\mathbf{L}$ as a conserved energy. Kinetic energy is usually lost when a bullet embeds, and it usually rises when a skater pulls her arms in. [[#eq-taudL]] says nothing about $K$.
:::

## Systems of particles

For several particles the total angular momentum about a fixed origin is the sum of the individual ones, $\mathbf{L} = \sum_i \mathbf{r}_i\times m_i\mathbf{v}_i$. Differentiating and using [[#thm-taudL]] on each particle gives $\deriv{\mathbf{L}}{t} = \sum_i \mathbf{r}_i\times\mathbf{F}_i$, the total torque of every force, external and internal. The internal forces cancel from this sum when they are central.

::: theorem Angular momentum of a system {#thm-system}
Suppose the internal forces of a system come in pairs $\mathbf{F}_{ij} = -\mathbf{F}_{ji}$ directed along the line joining the two particles. About an origin fixed in an inertial frame, the total angular momentum changes at the rate of the net external torque about that origin:

$$
\deriv{\mathbf{L}}{t} = \boldsymbol{\tau}_{\mathrm{ext}}.
$$ {#eq-system}

If $\boldsymbol{\tau}_{\mathrm{ext}} = \mathbf{0}$ about that origin, $\mathbf{L}$ is conserved. The same conclusion holds about the centre of mass, by [[#thm-cm]] below, even when the centre of mass accelerates.
:::

::: proof
Split $\mathbf{F}_i = \mathbf{F}_i^{\mathrm{ext}} + \sum_{j\neq i}\mathbf{F}_{ij}$. Then

$$
\deriv{\mathbf{L}}{t} = \sum_i \mathbf{r}_i\times\mathbf{F}_i^{\mathrm{ext}} + \sum_i\sum_{j\neq i}\mathbf{r}_i\times\mathbf{F}_{ij}.
$$

The first sum is $\boldsymbol{\tau}_{\mathrm{ext}}$. In the double sum, group $(i, j)$ with $(j, i)$. The contribution of one pair is $\mathbf{r}_i\times\mathbf{F}_{ij} + \mathbf{r}_j\times\mathbf{F}_{ji} = (\mathbf{r}_i - \mathbf{r}_j)\times\mathbf{F}_{ij}$, where $\mathbf{F}_{ji} = -\mathbf{F}_{ij}$ was used. The force $\mathbf{F}_{ij}$ is parallel to $\mathbf{r}_i - \mathbf{r}_j$ by the central-force hypothesis, so the cross product vanishes. Every pair drops out, and $\deriv{\mathbf{L}}{t} = \boldsymbol{\tau}_{\mathrm{ext}}$.

If the internal forces were equal and opposite but not along the joining line, the cross product would survive. Electromagnetic forces between moving charges can behave that way; the mechanical angular momentum of the charges is then not the whole story, because the field carries some. For the contact forces, tensions and gravitation of this course, the central-pair hypothesis is the one in force, and it is the same hypothesis already used for $\tau = I\alpha$ in [[mechanics/rotation]].
:::

The centre-of-mass statement needs its own argument, because the centre of mass may accelerate, and [[#thm-taudL]] was proved for a fixed origin. Write $\mathbf{r}_i = \mathbf{R} + \mathbf{r}_i'$ and $\mathbf{v}_i = \mathbf{V} + \mathbf{v}_i'$, with $\mathbf{R}$ and $\mathbf{V}$ the position and velocity of the centre of mass and the primed vectors measured from it. Then $\sum m_i\mathbf{r}_i' = \mathbf{0}$ and $\sum m_i\mathbf{v}_i' = \mathbf{0}$. Expanding the sum for $\mathbf{L}$ about the fixed origin,

$$
\mathbf{L} = \mathbf{R}\times M\mathbf{V} + \mathbf{L}', \qquad \mathbf{L}' = \sum_i \mathbf{r}_i'\times m_i\mathbf{v}_i'.
$$

The first term is the angular momentum the body would have if it were a point mass at the centre of mass. The second, $\mathbf{L}'$, is the angular momentum relative to the centre of mass. The cross terms vanish because $\sum m_i\mathbf{r}_i' = \mathbf{0}$ and $\sum m_i\mathbf{v}_i' = \mathbf{0}$.

::: theorem Angular momentum about the centre of mass {#thm-cm}
Under the same hypothesis on the internal forces as in [[#thm-system]],

$$
\deriv{\mathbf{L}'}{t} = \boldsymbol{\tau}'_{\mathrm{ext}},
$$

where $\mathbf{L}'$ and $\boldsymbol{\tau}'_{\mathrm{ext}}$ are the angular momentum and the external torque computed with position vectors drawn from the centre of mass. This holds whether or not the centre of mass accelerates.
:::

::: proof
Differentiate $\mathbf{L}' = \sum_i \mathbf{r}_i'\times m_i\mathbf{v}_i'$. The terms $\mathbf{v}_i'\times m_i\mathbf{v}_i'$ vanish, so $\deriv{\mathbf{L}'}{t} = \sum_i \mathbf{r}_i'\times m_i\mathbf{a}_i'$, where $\mathbf{a}_i' = \dot{\mathbf{v}}_i'$ is the acceleration relative to the centre of mass. The inertial acceleration is $\mathbf{a}_i = \mathbf{A} + \mathbf{a}_i'$, with $\mathbf{A}$ the acceleration of the centre of mass, and Newton's second law reads $m_i\mathbf{a}_i = \mathbf{F}_i^{\mathrm{ext}} + \mathbf{F}_i^{\mathrm{int}}$. Therefore

$$
\sum_i \mathbf{r}_i'\times m_i\mathbf{a}_i' = \sum_i \mathbf{r}_i'\times\mathbf{F}_i^{\mathrm{ext}} + \sum_i \mathbf{r}_i'\times\mathbf{F}_i^{\mathrm{int}} - \Bigl(\sum_i m_i\mathbf{r}_i'\Bigr)\times\mathbf{A}.
$$

The last sum is zero because the primed origin is the centre of mass. The internal sum cancels pair by pair, by the same algebra as in [[#thm-system]]: that algebra never used the origin being fixed, only the vectors between the particles. The remaining sum is $\boldsymbol{\tau}'_{\mathrm{ext}}$.
:::

This is the justification, promised in [[mechanics/rotation]], for writing $\tau = I\alpha$ about the centre of a rolling object. The centre accelerates down the plane, but [[#thm-cm]] still supplies $\tau' = \deriv{L'}{t}$, and for the symmetric bodies of that chapter $L' = I\omega$ along the axle.

If the net external torque about a fixed point, or about the centre of mass, is zero, the corresponding angular momentum is constant. The forces that fail this test are easy to spot on a diagram: any external force whose line of action misses the point contributes. Gravity acting at the centre of mass contributes nothing about the centre of mass, and a force at a pivot contributes nothing about the pivot. Internal forces, when they are central, never contribute, however large they are. They can still do work. Muscles pulling a skater's arms inward are internal and central enough that they do not torque the vertical axis, but the arms move, the forces do positive work, and the kinetic energy rises. Angular-momentum conservation and energy conservation are independent theorems with independent hypotheses.

## A rigid body on a symmetry axis

A rigid body rotating about a fixed axis has $K = \tfrac{1}{2}I\omega^2$ and $\tau = I\alpha$, proved in [[mechanics/rotation]] from Newton's laws in tangential components. The angular-momentum route gives the same law when the axis is a symmetry axis, and it shows why the law can fail when the body is lopsided.

::: proposition Angular momentum along a symmetry axis {#prop-rigid}
Let a rigid body rotate with angular velocity $\boldsymbol{\omega}$ about the $z$-axis, a fixed axis of symmetry of the mass distribution. Then the angular momentum about a point on that axis is $\mathbf{L} = I\boldsymbol{\omega}$, along the axis, with $I = \int(x^2 + y^2)\,\dd m$ the moment of inertia about the axis. Combined with [[#thm-system]] or [[#thm-cm]], this gives $\tau = I\alpha$ about the axis. For a lopsided body $\mathbf{L}$ need not lie along $\boldsymbol{\omega}$; that case is left to [[analytical-mechanics]].
:::

::: proof
The velocity of a mass element at $\mathbf{r}$ is $\boldsymbol{\omega}\times\mathbf{r}$. With $\boldsymbol{\omega} = \omega\,\mathbf{e}_z$,

$$
\dd\mathbf{L} = \dd m\,\mathbf{r}\times(\boldsymbol{\omega}\times\mathbf{r}) = \dd m\bigl[(\mathbf{r}\cdot\mathbf{r})\boldsymbol{\omega} - (\mathbf{r}\cdot\boldsymbol{\omega})\mathbf{r}\bigr].
$$

In components, $\mathbf{r}\cdot\boldsymbol{\omega} = \omega z$ and $\mathbf{r}\cdot\mathbf{r} = x^2 + y^2 + z^2$, so the contribution is

$$
\dd L_x = -\dd m\,\omega\, xz, \qquad \dd L_y = -\dd m\,\omega\, yz, \qquad \dd L_z = \dd m\,\omega\,(x^2 + y^2).
$$

Integrating the $z$-component gives $L_z = I\omega$. The transverse components vanish when the mass distribution is symmetric under $z \to -z$, or under a half-turn about the axis, because then the contributions at $z$ and at $-z$ cancel. A planar body lying in $z = 0$ is the simplest case: $z = 0$ kills $\dd L_x$ and $\dd L_y$ outright. A hoop, a disc, a cylinder about its axis and a sphere about a diameter all have the symmetry. Then $\mathbf{L} = I\boldsymbol{\omega}$, and $\tau_z = \deriv{L_z}{t} = I\alpha$ if $I$ is constant, which it is for a rigid body on a fixed axis.

If the body is a tilted dumbbell, masses off the axis and not balanced by the symmetry, $\int xz\,\dd m$ need not vanish. Then $\mathbf{L}$ has a component perpendicular to $\boldsymbol{\omega}$, and that component swings around as the body turns. The bearings must supply a torque even at constant $\omega$. The scalar law $\tau = I\alpha$ does not describe that torque.
:::

## Central forces and equal areas

A force is **central** about a point $O$ when it is always directed along the line from $O$ to the particle: $\mathbf{F}$ is parallel to $\mathbf{r}$, attractive or repulsive. Gravity due to a fixed sun, and the tension in a string that disappears through a hole in a smooth table, are central about that sun or that hole. The torque about $O$ is $\mathbf{r}\times\mathbf{F} = \mathbf{0}$.

::: theorem Equal areas {#thm-area}
If the force on a particle is central about a fixed point $O$, the angular momentum of the particle about $O$ is constant. The radius from $O$ to the particle therefore sweeps out area at the constant rate

$$
\deriv{A}{t} = \frac{L}{2m},
$$ {#eq-area}

where $L = \abs{\mathbf{L}}$ and $m$ is the mass. Conversely, if the areal velocity is constant, so that $\mathbf{L}$ about $O$ is constant, then the force is central about $O$.
:::

::: proof
[[#thm-taudL]] gives $\deriv{\mathbf{L}}{t} = \mathbf{r}\times\mathbf{F}$. For a central force the cross product is zero, so $\mathbf{L}$ is constant in magnitude and in direction. Motion with a fixed direction of $\mathbf{L}$ lies in a plane through $O$ perpendicular to $\mathbf{L}$.

In a time $\dd t$ the position changes by $\dd\mathbf{r} = \mathbf{v}\,\dd t$. The area of the triangle with vertices at $O$, at $\mathbf{r}$ and at $\mathbf{r} + \dd\mathbf{r}$ is half the magnitude of the cross product of two of its sides,

$$
\dd A = \tfrac{1}{2}\abs{\mathbf{r}\times\dd\mathbf{r}} = \tfrac{1}{2}\abs{\mathbf{r}\times\mathbf{v}}\,\dd t.
$$

But $\abs{\mathbf{r}\times m\mathbf{v}} = L$, so $\abs{\mathbf{r}\times\mathbf{v}} = L/m$ and $\deriv{A}{t} = L/(2m)$. Constancy of $L$ is constancy of the areal velocity. Equal areas in equal times are this statement read in words.

Conversely, a constant areal velocity in a plane means a constant $\mathbf{L}$, hence $\boldsymbol{\tau} = \deriv{\mathbf{L}}{t} = \mathbf{0}$, hence $\mathbf{r}\times\mathbf{F} = \mathbf{0}$. The force is parallel to $\mathbf{r}$.
:::

The factor $\tfrac{1}{2}$ is the triangle, not a convention one is free to drop. For the particle of [[#ex-circle]], $L = 0.600\,\mathrm{kg\cdot m^2/s}$ and $m = 0.500\,\mathrm{kg}$, so $\deriv{A}{t} = 0.600\,\mathrm{m^2/s}$. In one second the radius sweeps $0.600\,\mathrm{m^2}$, which is a fraction $0.600/(\pi R^2) = 0.600/0.5027 = 1.19$ of the disc of radius $0.400\,\mathrm{m}$: more than a full turn, since the period is $2\pi R/v = 2\pi(0.400)/3.00 = 0.838\,\mathrm{s}$ and $1/0.838 = 1.19$ revolutions per second. The geometry and the dynamics agree.

::: history
Kepler's *Astronomia nova* (1609) stated that a line from the Sun to a planet sweeps equal areas in equal times. He read the law out of Tycho Brahe's observations of Mars, as a fact about the orbit, not as a consequence of a force. In the *Principia* (1687), Book 1, Newton proved both directions of [[#thm-area]]: a force directed towards a fixed point implies the equal-area law, and the equal-area law implies that the force is directed towards that point. The argument is the one given above, written in the geometry of his time. The identification of $\mathbf{r}\times m\mathbf{v}$ as a single conserved vector came later; what Newton conserved was the areal velocity itself.
:::

::: quiz
A bullet embeds in a rod hanging from a pivot. During the brief impact, which statement is correct?
- [ ] Kinetic energy and angular momentum about the pivot are both conserved
- [x] Angular momentum about the pivot is conserved, and kinetic energy is not
- [ ] Linear momentum is conserved, because the rod is free to swing after the impact
- [ ] Angular momentum about the pivot is not conserved, because the pivot pushes on the rod
::: solution
The pivot may exert a large impulse, so linear momentum is not conserved: the pivot pushes. That impulse has no torque about the pivot, and the angular impulse of the weight is negligible during the short impact, so angular momentum about the pivot is conserved. Embedding is inelastic, and kinetic energy drops sharply. The error in the last option is the one [[#thm-system]] is written to prevent: a force through the origin does not change $\mathbf{L}$ about that origin.
:::
:::

## Two collisions with rotation, and a skater

The conservation law is used in the same way each time. Name the point, check that the external torque about it vanishes for the interval you care about, equate $\mathbf{L}$ before and after, and only then ask what happened to the energy.

::: example A skater pulls her arms in {#ex-skater}
A skater spins about a vertical axis with moment of inertia $I_1 = 4.00\,\mathrm{kg\cdot m^2}$ and angular velocity $\omega_1 = 2.00\,\mathrm{rad/s}$. She pulls her arms in, and her moment of inertia falls to $I_2 = 1.60\,\mathrm{kg\cdot m^2}$. Find the new angular velocity and the change in kinetic energy. There is no external torque about the vertical axis: the ice is smooth enough, or the forces at the skates have no lever arm about that axis.
::: solution
[[#thm-system]] says $I\omega$ about the vertical axis is constant, since $L = I\omega$ along the axis by [[#prop-rigid]] while she is spinning about it. Thus

$$
I_1\omega_1 = (4.00)(2.00) = 8.00\,\mathrm{kg\cdot m^2/s}, \qquad \omega_2 = \frac{8.00}{1.60} = 5.00\,\mathrm{rad/s}.
$$

The kinetic energies are

$$
K_1 = \tfrac{1}{2}I_1\omega_1^2 = \tfrac{1}{2}(4.00)(4.00) = 8.00\,\mathrm{J}, \qquad K_2 = \tfrac{1}{2}(1.60)(5.00)^2 = (0.800)(25.0) = 20.0\,\mathrm{J}.
$$

The kinetic energy rises by $12.0\,\mathrm{J}$. Angular momentum was conserved and energy was not. The increase is the work done by the skater's muscles as they pull her arms in: those forces are internal, so they contribute no torque about the axis, but their points of application move inward and the forces do positive work. A rigid body, with fixed $I$, could not have done this. During the pull the skater is not a rigid body, which is why $I$ is allowed to change while $I\omega$ is not.
:::
:::

::: example A bullet embeds in a hanging rod {#ex-bullet}
A uniform rod of mass $M = 1.00\,\mathrm{kg}$ and length $L = 0.800\,\mathrm{m}$ hangs at rest from a pivot at one end. A bullet of mass $m = 0.0100\,\mathrm{kg}$, travelling at $400\,\mathrm{m/s}$ perpendicular to the rod, hits the free end and embeds. Find the angular velocity just after impact, and compare the kinetic energies.
::: solution
During the impact the hinge may exert a large impulse, so linear momentum is not conserved. That impulse has no torque about the pivot. The weight is finite, and the duration of the impact is very short, so the angular impulse of the weight is negligible beside the angular momentum the bullet brings in. [[#thm-system]] therefore conserves angular momentum about the pivot, and does not conserve kinetic energy: embedding is inelastic.

About the end, the rod has $I_{\mathrm{rod}} = ML^2/3$. With $L^2 = 0.640$,

$$
I_{\mathrm{rod}} = \frac{(1.00)(0.640)}{3} = 0.21333\ldots\,\mathrm{kg\cdot m^2},
$$

which is $0.2133\,\mathrm{kg\cdot m^2}$ to four decimal places. The embedded bullet is a point mass at distance $L$, so

$$
I = I_{\mathrm{rod}} + mL^2 = 0.21333\ldots + (0.0100)(0.640) = 0.21973\ldots\,\mathrm{kg\cdot m^2},
$$

recorded as $0.21973\,\mathrm{kg\cdot m^2}$. Just before impact the rod is at rest and the bullet's momentum is perpendicular to the position vector from the pivot, of length $L$, so

$$
L_{\mathrm{ang}} = mvL = (0.0100)(400)(0.800) = 3.20\,\mathrm{kg\cdot m^2/s}.
$$

Just after impact the combined body is rigid, with this same angular momentum:

$$
\omega = \frac{3.20}{0.21973\ldots} = 14.563\ldots\,\mathrm{rad/s},
$$

which is $14.56\,\mathrm{rad/s}$ to four figures.

Kinetic energy before the impact is

$$
K_{\mathrm{before}} = \tfrac{1}{2}mv^2 = \tfrac{1}{2}(0.0100)(400)^2 = 800\,\mathrm{J}.
$$

Just after, $K = \tfrac{1}{2}I\omega^2$. Using the intermediates $I = 0.219733\,\mathrm{kg\cdot m^2}$ and $\omega = 14.563\,\mathrm{rad/s}$,

$$
(14.563)^2 = 212.080969, \qquad \tfrac{1}{2}(0.219733)(212.080969) = 23.3006\ldots\,\mathrm{J},
$$

which we quote as $23.3\,\mathrm{J}$. The combination $L_{\mathrm{ang}}^2/(2I)$ gives the same $23.3\,\mathrm{J}$ without the intermediate rounding. Almost all of the bullet's kinetic energy has gone into permanent deformation.

The centre of mass of rod plus bullet lies at

$$
r_{\mathrm{cm}} = \frac{M(L/2) + mL}{M + m} = \frac{0.400 + 0.00800}{1.01} = \frac{0.408}{1.01} = 0.404\,\mathrm{m}
$$

from the pivot. Reaching the inverted position raises it by $2r_{\mathrm{cm}} = 0.808\,\mathrm{m}$, at a cost

$$
(1.01)(9.80)(0.808) = (9.898)(0.808) = 8.00\,\mathrm{J}.
$$

Since $23.3\,\mathrm{J}$ remains after the impact, the rod swings past the upward vertical. Gravity, negligible during the impact, determines that later motion through [[mechanics/work-energy]], with the pivot still doing no work.
:::
:::

## A stated formula for steady precession

For a wheel spinning rapidly with angular momentum $\mathbf{L}$ along a horizontal axle, a gravitational torque $\boldsymbol{\tau}$ makes the axle precess at $\Omega = \tau/L$.

::: warning The fast-spin assumption
The steady-precession formula $\Omega = \tau/L$ assumes the spin is fast. It treats $\mathbf{L}$ as the spin angular momentum alone, and it neglects the angular momentum associated with the slow precession. A wheel that is not spinning rapidly does not obey the formula; the full account is in [[analytical-mechanics]]. Use $\Omega = \tau/L$ only when the problem says the spin is rapid, and do not invent a derivation of it from $\tau = I\alpha$ about a fixed axis.
:::

::: example Precession of a spinning wheel {#ex-precess}
A wheel spins rapidly, with spin angular momentum of magnitude $L = 5.00\,\mathrm{kg\cdot m^2/s}$ along a horizontal axle. The wheel's mass is $2.00\,\mathrm{kg}$ and its centre of mass is $0.250\,\mathrm{m}$ from the pivot that supports the axle. Find the magnitude of the gravitational torque and the steady precession rate $\Omega = \tau/L$. Take $g = 9.80\,\mathrm{m/s^2}$.
::: solution
The weight acts at the centre of mass, a horizontal distance $0.250\,\mathrm{m}$ from the vertical line through the pivot, so the lever arm is $0.250\,\mathrm{m}$ and

$$
\tau = mgd = (2.00)(9.80)(0.250) = (19.6)(0.250) = 4.90\,\mathrm{N\cdot m}.
$$

The stated formula, under the fast-spin assumption, gives

$$
\Omega = \frac{\tau}{L} = \frac{4.90}{5.00} = 0.980\,\mathrm{rad/s}.
$$

The corresponding period is $T = 2\pi/\Omega = 2\pi/0.980 = 6.41\,\mathrm{s}$. The axle swings horizontally. We have not derived $\Omega = \tau/L$; we have evaluated it. If the same wheel were barely spinning, this number would not be the motion.
:::
:::

## Where this leads

The equal-area law is the opening move of orbital mechanics. [[mechanics/gravitation]] specialises the central force to the inverse-square law and finds the closed ellipses, the circular-orbit speed and the escape speed; the constancy of $\mathbf{L}$ is what reduces the orbit to a problem in one radial coordinate. Whenever the body is rigid but the axis is not a symmetry axis, or the precession is not the fast-spin special case used above, $\mathbf{L}$ and $\boldsymbol{\omega}$ part company and the right language is the inertia tensor. That is the start of [[analytical-mechanics]]. The fixed-axis and rolling results of [[mechanics/rotation]] remain the working tools when their hypotheses really do hold.

::: summary
- The angular momentum of a particle about an origin is $\mathbf{L} = \mathbf{r}\times m\mathbf{v}$, with magnitude $mvr\sin\phi$. The origin is part of the statement.
- About a fixed origin in an inertial frame, $\boldsymbol{\tau} = \deriv{\mathbf{L}}{t}$ for one particle of constant mass. Torque and angular momentum must be about the same origin.
- For a system with central internal forces, $\deriv{\mathbf{L}}{t} = \boldsymbol{\tau}_{\mathrm{ext}}$ about a fixed origin, and the same law holds for $\mathbf{L}'$ about the centre of mass. Vanishing external torque implies conservation.
- On a fixed symmetry axis, $\mathbf{L} = I\boldsymbol{\omega}$ and $\tau = I\alpha$. For a lopsided body $\mathbf{L}$ need not lie along $\boldsymbol{\omega}$.
- A central force conserves $\mathbf{L}$, so the radius sweeps area at the constant rate $L/(2m)$. The converse is also true.
- Conservation of angular momentum does not conserve kinetic energy. A skater with $I$ falling from $4.00$ to $1.60\,\mathrm{kg\cdot m^2}$ speeds up from $2.00$ to $5.00\,\mathrm{rad/s}$, and $K$ rises from $8.00\,\mathrm{J}$ to $20.0\,\mathrm{J}$.
- A bullet of angular momentum $3.20\,\mathrm{kg\cdot m^2/s}$ embedding in a hanging rod leaves the rod spinning at $14.56\,\mathrm{rad/s}$, with kinetic energy $23.3\,\mathrm{J}$ against $800\,\mathrm{J}$ before impact. The pivot's impulse does not torque the pivot.
- Steady precession of a rapid spin is the stated formula $\Omega = \tau/L$, valid only when the spin is fast.
:::

## Exercises

::: exercise Angular momentum about the centre {#exr-particle level=1 check="1.2"}
A particle of mass $0.200\,\mathrm{kg}$ moves at $4.00\,\mathrm{m/s}$ perpendicular to its position vector from a chosen origin. The distance from the origin is $1.50\,\mathrm{m}$. Find $L$ about that origin, in $\mathrm{kg\cdot m^2/s}$.
::: solution
The velocity is perpendicular to $\mathbf{r}$, so $\sin\phi = 1$ and [[#def-L]] gives

$$
L = mvr = (0.200)(4.00)(1.50) = (0.200)(6.00) = 1.20\,\mathrm{kg\cdot m^2/s}.
$$

If the same speed made an angle of $30^\circ$ with $\mathbf{r}$, the factor $\sin 30^\circ = \tfrac{1}{2}$ would cut this result in half. The question states that the motion is perpendicular.
:::
:::

::: exercise A skater, routine numbers {#exr-skater-w level=1 check="7.5"}
A skater spinning about a vertical axis has moment of inertia $2.50\,\mathrm{kg\cdot m^2}$ and angular velocity $3.00\,\mathrm{rad/s}$. She pulls her arms in until her moment of inertia is $1.00\,\mathrm{kg\cdot m^2}$. There is no external torque about the axis. Find the new angular velocity, in $\mathrm{rad/s}$.
::: solution
[[#thm-system]] and [[#prop-rigid]] give $I\omega$ constant:

$$
I_1\omega_1 = (2.50)(3.00) = 7.50\,\mathrm{kg\cdot m^2/s}, \qquad \omega_2 = \frac{7.50}{1.00} = 7.50\,\mathrm{rad/s}.
$$

The kinetic energy rises from $\tfrac{1}{2}(2.50)(3.00)^2 = 11.25\,\mathrm{J}$ to $\tfrac{1}{2}(1.00)(7.50)^2 = 28.125\,\mathrm{J}$. The question asks only for $\omega_2$. The increase is work done by the skater, as in [[#ex-skater]].
:::
:::

::: exercise Areal velocity on the circle {#exr-area level=1 check="0.6"}
A particle of mass $0.500\,\mathrm{kg}$ has angular momentum of magnitude $0.600\,\mathrm{kg\cdot m^2/s}$ about a fixed point, and the force on it is central about that point. Find the rate at which area is swept, in $\mathrm{m^2/s}$.
::: solution
[[#thm-area]] gives

$$
\deriv{A}{t} = \frac{L}{2m} = \frac{0.600}{2\times 0.500} = \frac{0.600}{1.00} = 0.600\,\mathrm{m^2/s}.
$$

The value is constant because $L$ is constant. These are the mass and angular momentum of [[#ex-circle]]; the radius is not needed once $L$ and $m$ are known.
:::
:::

::: exercise Clay on the end of a rod {#exr-clay level=2 check="10"}
A uniform rod of mass $M = 1.20\,\mathrm{kg}$ and length $L = 1.00\,\mathrm{m}$ hangs at rest from a pivot at one end. A lump of clay of mass $m = 0.0500\,\mathrm{kg}$, moving at $90.0\,\mathrm{m/s}$ perpendicular to the rod, hits the free end and sticks. Find the angular speed, in $\mathrm{rad/s}$, just after the impact.
::: hint
The hinge impulse has no torque about the pivot. Gravity's angular impulse is negligible during the impact. Angular momentum about the pivot is conserved; kinetic energy is not.
:::
::: solution
About the pivot, $I_{\mathrm{rod}} = ML^2/3 = (1.20)(1.00)/3 = 0.400\,\mathrm{kg\cdot m^2}$. The clay at the free end adds $mL^2 = (0.0500)(1.00) = 0.0500\,\mathrm{kg\cdot m^2}$, so

$$
I = 0.400 + 0.0500 = 0.450\,\mathrm{kg\cdot m^2}.
$$

The angular momentum brought in by the clay is

$$
mvL = (0.0500)(90.0)(1.00) = 4.50\,\mathrm{kg\cdot m^2/s}.
$$

The rod is at rest before the impact, and the hinge contributes nothing about the pivot, so

$$
\omega = \frac{4.50}{0.450} = 10.0\,\mathrm{rad/s}.
$$

Kinetic energy is not conserved. Before, $K = \tfrac{1}{2}(0.0500)(90.0)^2 = (0.0250)(8100) = 202.5\,\mathrm{J}$. After, $K = \tfrac{1}{2}(0.450)(10.0)^2 = 22.5\,\mathrm{J}$. Most of the energy is lost to deformation of the clay, as in [[#ex-bullet]].
:::
:::

::: exercise The energy a skater must supply {#exr-energy level=2 check="13.5"}
An object spinning freely about a vertical axis has moment of inertia $6.00\,\mathrm{kg\cdot m^2}$ and angular velocity $1.50\,\mathrm{rad/s}$. Internal forces, with no external torque about the axis, reduce the moment of inertia to $2.00\,\mathrm{kg\cdot m^2}$. Find the increase in kinetic energy, in joules.
::: solution
Angular momentum about the axis is conserved:

$$
L = (6.00)(1.50) = 9.00\,\mathrm{kg\cdot m^2/s}, \qquad \omega_2 = \frac{9.00}{2.00} = 4.50\,\mathrm{rad/s}.
$$

The kinetic energies are

$$
K_1 = \tfrac{1}{2}(6.00)(1.50)^2 = (3.00)(2.25) = 6.75\,\mathrm{J},
$$

$$
K_2 = \tfrac{1}{2}(2.00)(4.50)^2 = (1.00)(20.25) = 20.25\,\mathrm{J}.
$$

The increase is $20.25 - 6.75 = 13.5\,\mathrm{J}$. That difference is the work done by the internal forces while the mass distribution changes. Conserving $L$ and then also setting $K_2 = K_1$ would be using two laws whose hypotheses are not both satisfied.
:::
:::

::: exercise A precession rate from the stated formula {#exr-omega level=2 check="0.98"}
A rapidly spinning wheel has spin angular momentum $5.00\,\mathrm{kg\cdot m^2/s}$ along a horizontal axle. The centre of mass, of mass $2.00\,\mathrm{kg}$, is $0.250\,\mathrm{m}$ from the supporting pivot. Using $\Omega = \tau/L$ and $g = 9.80\,\mathrm{m/s^2}$, find $\Omega$ in $\mathrm{rad/s}$.
::: solution
The gravitational torque has magnitude

$$
\tau = mgd = (2.00)(9.80)(0.250) = 4.90\,\mathrm{N\cdot m}.
$$

The stated fast-spin formula gives $\Omega = \tau/L = 4.90/5.00 = 0.980\,\mathrm{rad/s}$. The same arithmetic is [[#ex-precess]]. The formula is being used, not derived, and it requires the spin to be rapid.
:::
:::

::: exercise Stopping a wheel on a turntable {#exr-platform level=3 check="5/3"}
A person stands on a turntable, free to rotate about a vertical axis, with moment of inertia $3.20\,\mathrm{kg\cdot m^2}$ together with the turntable. She holds a wheel of moment of inertia $0.400\,\mathrm{kg\cdot m^2}$ spinning at $15.0\,\mathrm{rad/s}$ about that same vertical axis. The turntable is initially at rest. She applies a brake and brings the wheel to rest relative to herself. Find the final angular velocity of the person, the turntable and the wheel, in $\mathrm{rad/s}$.
::: hint
Internal torques between the person and the wheel cancel about the vertical axis. In the final state the wheel and the person share one angular velocity, so the final moment of inertia is the sum.
:::
::: solution
No external torque acts about the vertical axis: the bearing of the turntable is on the axis, and weights and normal forces are vertical. [[#thm-system]] conserves the total angular momentum about that axis. Initially only the wheel contributes,

$$
L = (0.400)(15.0) = 6.00\,\mathrm{kg\cdot m^2/s}.
$$

Finally the wheel is at rest relative to the person, so both rotate at the same $\omega$ and

$$
I_{\mathrm{f}} = 3.20 + 0.400 = 3.60\,\mathrm{kg\cdot m^2}, \qquad \omega = \frac{6.00}{3.60} = \frac{600}{360} = \frac{5}{3}\,\mathrm{rad/s}.
$$

Kinetic energy is not conserved. Before, $K = \tfrac{1}{2}(0.400)(15.0)^2 = (0.200)(225) = 45.0\,\mathrm{J}$. After,

$$
K = \tfrac{1}{2}(3.60)\Bigl(\frac{5}{3}\Bigr)^2 = (1.80)\cdot\frac{25}{9} = 5.00\,\mathrm{J}.
$$

The brake does negative work. The situation is the reverse of [[#ex-skater]] in one respect and the same in another: $L$ is conserved either way, and $K$ changes whenever internal forces do work or dissipate energy.
:::
:::

::: exercise Why a central pair exerts no torque {#exr-pair level=3}
Two particles interact by forces $\mathbf{F}_{ij} = -\mathbf{F}_{ji}$ directed along the line that joins them. Prove that the pair contributes nothing to the total torque about an arbitrary fixed origin, and conclude that the total angular momentum of an isolated collection of such pairs is conserved.
::: hint
Write the two torques about the origin and factor $\mathbf{F}_{ij}$. The vector $\mathbf{r}_i - \mathbf{r}_j$ is parallel to that force.
:::
::: solution
About a fixed origin the torque of the pair is

$$
\boldsymbol{\tau}_{ij} = \mathbf{r}_i\times\mathbf{F}_{ij} + \mathbf{r}_j\times\mathbf{F}_{ji} = \mathbf{r}_i\times\mathbf{F}_{ij} + \mathbf{r}_j\times(-\mathbf{F}_{ij}) = (\mathbf{r}_i - \mathbf{r}_j)\times\mathbf{F}_{ij}.
$$

By hypothesis $\mathbf{F}_{ij}$ is parallel to $\mathbf{r}_i - \mathbf{r}_j$, so the cross product is zero. The origin never entered except as the point from which $\mathbf{r}_i$ and $\mathbf{r}_j$ are drawn, and it cancelled. Every internal pair of an isolated system therefore contributes nothing, and [[#thm-system]] gives $\deriv{\mathbf{L}}{t} = \mathbf{0}$ about any fixed origin, because there is no external force at all. Each particle's own angular momentum need not be constant: the particles do torque each other. Only the sum is conserved. If the forces were equal and opposite but not central, $(\mathbf{r}_i - \mathbf{r}_j)\times\mathbf{F}_{ij}$ would survive and the conclusion would fail.
:::
:::
