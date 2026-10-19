Energy and momentum turn rigid-body dynamics from a differential equation into arithmetic. Where [[dynamics/rigid-body-kinetics]] gives you the acceleration at an instant, the work–energy equation gives you the **speed after a distance** without integrating anything, and the impulse–momentum equations give you the **velocity after a blow** without knowing anything about the enormous, unmeasurable forces during the contact. For a rigid body there is one extra term in each — a rotational one — and one enormous simplification: the friction force at a rolling contact does **no work**, so it never appears in the energy equation at all.

The three tools have sharply different scopes, and choosing wrongly is the commonest mistake in this chapter. Work–energy gives speed against position and says nothing about time. Angular momentum about a point is conserved when the moment about that point vanishes, and it is the only tool that survives an impact. Impulse–momentum gives velocity against time. A problem that asks for a distance wants energy; one that asks for a time wants momentum; one that asks about a collision wants angular momentum about the impact point, because the impulsive force then has no moment.

::: warning The friction at a rolling contact does no work — but that is not the same as saying it is zero
For a body rolling without slipping, the point of application of the friction force is instantaneously at rest, so its power $\mathbf{F} \cdot \mathbf{v}$ is zero. The friction can be large, can be essential to the motion, and can even point "the wrong way", and still do no work. Do not conclude from this that friction can be ignored in the force equations: it cannot, and a problem solved by energy alone will silently assume the no-slip condition holds without ever checking $F \le \mu N$. The standard procedure is to find the motion by energy and then **go back** through the force equations to verify that the required friction is available.
:::

## Work and kinetic energy of a rigid body

::: definition Work, power and kinetic energy {#def-rbe-work}
For a rigid body in plane motion,
$$
T = \frac{1}{2} m v_G^{2} + \frac{1}{2} I_G \omega^{2} = \frac{1}{2} I_C \omega^{2} \ \text{(rolling)},
$$
where $C$ is the contact point, and the work of the external forces over a finite displacement is
$$
U_{1 \to 2} = \int_1^2 \sum \mathbf{F} \cdot \mathrm{d} \mathbf{r}_G
+ \int_1^2 \sum M_G \, \mathrm{d} \theta .
$$
The **work–energy equation** is $T_2 - T_1 = U_{1 \to 2}$, and the power form is
$$
\frac{\mathrm{d} T}{\mathrm{d} t} = \sum \mathbf{F} \cdot \mathbf{v}_G + \sum M_G \, \omega .
$$
A force does no work if its point of application does not move, if it is perpendicular to the motion, or if it is the friction at a rolling or non-slipping contact. A **couple** does work $M \Delta\theta$ regardless of where it is applied, and the work of a couple is path-independent in a way a force's is not.
:::

::: proof König's theorem: the kinetic energy splits {#proof-koenig}
Write the velocity of a particle of the body as $\mathbf{v}_i = \mathbf{v}_G + \boldsymbol{\omega} \times \boldsymbol{\rho}_i$, where $\boldsymbol{\rho}_i$ is measured from $G$. Then
$$
T = \tfrac{1}{2} \sum m_i \mathbf{v}_i \cdot \mathbf{v}_i
= \tfrac{1}{2} \sum m_i \left[ v_G^{2}
+ 2 \mathbf{v}_G \cdot \left( \boldsymbol{\omega} \times \boldsymbol{\rho}_i \right)
+ \left| \boldsymbol{\omega} \times \boldsymbol{\rho}_i \right|^{2} \right] .
$$
The middle term is $\mathbf{v}_G \cdot \boldsymbol{\omega} \times \sum m_i \boldsymbol{\rho}_i$, which vanishes because $\sum m_i \boldsymbol{\rho}_i = \mathbf{0}$ by the definition of the mass centre. The first term sums to $\tfrac{1}{2} m v_G^{2}$ and the third, for plane motion, to $\tfrac{1}{2} I_G \omega^{2}$. Hence
$$
T = \tfrac{1}{2} m v_G^{2} + \tfrac{1}{2} I_G \omega^{2} .
$$
For rolling, $v_G = \omega R$ and $I_C = I_G + m R^{2}$, so
$$
T = \tfrac{1}{2} \left( I_G + m R^{2} \right) \omega^{2} = \tfrac{1}{2} I_C \omega^{2} ,
$$
which is the same energy computed as a pure rotation about the instantaneous centre. $\checkmark$

*Note.* The cross term vanishing is the whole content of the theorem, and it is worth knowing that it fails in three dimensions unless $\boldsymbol{\omega}$ is along a principal axis: there the energy is $\tfrac{1}{2} \boldsymbol{\omega} \cdot \mathbf{I} \boldsymbol{\omega}$ and the products of inertia do not drop out.
:::

::: example Spool pulled by a cord {#ex-spool-energy}
A spool of mass $60\ \mathrm{kg}$, outer radius $250\ \mathrm{mm}$, core radius $100\ \mathrm{mm}$ and radius of gyration $180\ \mathrm{mm}$ rests on a rough floor. A cord wound on the core is pulled horizontally with $200\ \mathrm{N}$ at a height of $350\ \mathrm{mm}$, and the spool rolls without slipping. Use energy to find the speed of its centre after it has moved $3\ \mathrm{m}$ from rest.
::: solution
**Kinetic energy.** With $\omega = v / R$,
$$
T = \tfrac{1}{2} m v^{2} + \tfrac{1}{2} m k^{2} \frac{v^{2}}{R^{2}}
= \tfrac{1}{2} \times 60 \, v^{2} \left( 1 + \frac{0.0324}{0.0625} \right)
= 45.55 \, v^{2} .
$$
**Work.** The friction does no work. The cord's point of application moves further than the centre, in the ratio of the moment arms about the contact point:
$$
s_{\text{cord}} = s_{\text{centre}} \times \frac{R + r}{R}
= 3 \times \frac{0.35}{0.25} = 4.20\ \mathrm{m},
\qquad U = 200 \times 4.20 = 840\ \mathrm{J} .
$$
**Speed.**
$$
v = \sqrt{\frac{840}{45.55}} = 4.29\ \mathrm{m / s} .
$$
*Check.* Constant acceleration gives $a = v^{2} / \left( 2 s \right) = 18.44 / 6 = 3.07\ \mathrm{m / s^{2}}$, and the force method of [[dynamics/rigid-body-kinetics]] gives $a = P R \left( R + r \right) / m \left( k^{2} + R^{2} \right) = 3.07\ \mathrm{m / s^{2}}$ $\checkmark$

*Sanity.* The cord's end moves $4.2\ \mathrm{m}$ while the spool moves $3$, so the pull does $40$ per cent more work than a naive $P s_{\text{centre}}$ would suggest — the same factor by which a block-and-tackle's rope outruns its load, and the same accounting. Getting this ratio wrong is the standard failure in this problem, and the reliable way to see it is to work about the **instantaneous centre**: the moment arm of the pull is $R + r$ and the moment arm of the centre's motion is $R$, so the displacements must be in that ratio.
:::
:::

::: widget plot
f: sqrt(24.525*sin(x*pi/180))
x: 0, 90
y: 0, 5.2
labels: \text{angular speed } \omega \ \left( \mathrm{rad/s} \right)
caption: Angular speed of a uniform rod of length $1.2\ \mathrm{m}$ hinged at one end and released from the horizontal, against its angle $x$ below the horizontal, from $\omega = \sqrt{3 g \sin \theta / L}$. The curve is a square root of a sine: steep at the start, where a small angle releases a proportional amount of energy but the inertia is being asked to carry it at low speed, and flattening towards the bottom. The **slope** $\mathrm{d}\omega / \mathrm{d}\theta$ is infinite at $\theta = 0$ — which is the same fact as the finite initial angular acceleration divided by a zero angular speed — and it is why a hinged arm released from horizontal has its maximum **bearing** load not at the start but somewhere in the middle of the swing, where the centripetal term $m \bar{r} \omega^{2}$ has grown.
:::

::: definition Impulse and momentum for a rigid body {#def-rbe-impulse}
Integrating the equations of motion over a short interval $\Delta t$ gives the **impulse–momentum** equations
$$
\int \sum \mathbf{F} \, \mathrm{d} t = m \left( \mathbf{v}_{G2} - \mathbf{v}_{G1} \right),
\qquad
\int \sum M_O \, \mathrm{d} t = \mathbf{H}_{O2} - \mathbf{H}_{O1} .
$$
During an **impact** the forces are enormous, act over milliseconds and cannot be measured; the impulses can still be found, and the standard consequences are:

- Angular momentum about the impact point (or about any point on the line of the impulsive force) is **conserved**.
- Linear momentum is conserved only if no external impulsive force acts — in particular, **not** at a hinge or a pinned support, which supplies its own impulse.
- Kinetic energy is **not** conserved. For two colliding masses the loss is
$$
\Delta T = \tfrac{1}{2} \mu \left( 1 - e^{2} \right) \left( v_1 - v_2 \right)^{2},
\qquad \mu = \frac{m_1 m_2}{m_1 + m_2},
$$
which vanishes only for a perfectly elastic collision, $e = 1$.
:::

::: example Cylinder rolling inside a cylinder {#ex-inside-cylinder}
A solid cylinder of radius $100\ \mathrm{mm}$ rolls without slipping on the inside of a fixed cylindrical surface of radius $500\ \mathrm{mm}$. Find the period of small oscillation about the bottom.
::: solution
Let $\theta$ be the angle of the line of centres from the vertical. The mass centre moves on a circle of radius $R - r = 0.4\ \mathrm{m}$, so
$$
T = \tfrac{1}{2} m \left( R - r \right)^{2} \dot{\theta}^{2}
+ \tfrac{1}{2} \left( \tfrac{1}{2} m r^{2} \right) \omega^{2},
\qquad \omega = \frac{v}{r} = \frac{\left( R - r \right) \dot{\theta}}{r} ,
$$
$$
T = \tfrac{1}{2} m \left( R - r \right)^{2} \dot{\theta}^{2} \left( 1 + \tfrac{1}{2} \right)
= \tfrac{3}{4} m \left( R - r \right)^{2} \dot{\theta}^{2},
\qquad
V = - m g \left( R - r \right) \cos \theta .
$$
Differentiating $T + V = \text{const}$ and dividing by $\tfrac{3}{2} m \left( R - r \right)^{2} \dot{\theta}$,
$$
\ddot{\theta} + \frac{2 g}{3 \left( R - r \right)} \sin \theta = 0
\quad\Longrightarrow\quad
\tau = 2 \pi \sqrt{\frac{1.5 \left( R - r \right)}{g}}
= 2 \pi \sqrt{\frac{1.5 \times 0.4}{9.81}} = 1.55\ \mathrm{s} .
$$
*Check.* A simple pendulum of length $0.4\ \mathrm{m}$ has $\tau = 1.27\ \mathrm{s}$; the rolling cylinder is slower by exactly $\sqrt{1.5}$, the factor by which its inertia exceeds a point mass's. $\checkmark$

*Sanity.* The radius of the rolling cylinder drops out of the period as long as it stays a cylinder, because both the path radius and the spin enter through the same $\left( R - r \right) \dot{\theta}$ — but its **shape** does not, since the $\tfrac{1}{2}$ becomes $\tfrac{2}{5}$ for a sphere and $1$ for a hoop. That is the same $k^{2} / R^{2}$ that sets the acceleration on an incline, appearing here as a factor on the inertia, and it is why the period of a rolling body is a clean way to measure a component's radius of gyration without ever weighing it precisely: the mass cancels, and only the distribution survives.
:::
:::

## Angular momentum and impacts

::: theorem Angular momentum of a plane-moving body {#thm-rbe-h}
For a body in plane motion,
$$
\mathbf{H}_G = I_G \omega \mathbf{k}, \qquad
\mathbf{H}_P = I_G \omega \mathbf{k} + \mathbf{r}_{G / P} \times m \mathbf{v}_G ,
$$
and about a **fixed** point $O$, or about the instantaneous centre $C$,
$$
\mathbf{H}_O = I_O \omega \mathbf{k}, \qquad
\mathbf{H}_C = I_C \omega \mathbf{k} .
$$
The moment equation is $\sum M_O = \dot{\mathbf{H}}_O$ for a fixed point $O$, and $\sum M_G = \dot{\mathbf{H}}_G$ always. If $\sum M_O = 0$ over an interval, $\mathbf{H}_O$ is conserved — and this is the tool for **impacts**, because an impulsive force whose line of action passes through $O$ has no moment about $O$ however large it is.
:::

::: proof Angular momentum about the instantaneous centre {#proof-h-ic}
About the mass centre, $\mathbf{H}_G = I_G \omega \mathbf{k}$, and for two points $P$ and $Q$,
$$
\mathbf{H}_Q = \mathbf{H}_P + \mathbf{r}_{P / Q} \times m \mathbf{v}_G \quad \text{(with care about which velocity)} .
$$
Taking $Q$ fixed and using the transport theorem,
$$
\mathbf{H}_O = I_G \omega \mathbf{k} + \mathbf{r}_{G / O} \times m \mathbf{v}_G .
$$
Now let $O$ be the instantaneous centre $C$, so that $\mathbf{v}_G = \boldsymbol{\omega} \times \mathbf{r}_{G / C}$. Then
$$
\mathbf{r}_{G / C} \times m \left( \boldsymbol{\omega} \times \mathbf{r}_{G / C} \right)
= m \left[ r_{G / C}^{2} \boldsymbol{\omega}
- \left( \boldsymbol{\omega} \cdot \mathbf{r}_{G / C} \right) \mathbf{r}_{G / C} \right] ,
$$
which for plane motion, with $\boldsymbol{\omega}$ perpendicular to $\mathbf{r}_{G / C}$, reduces to $m r_{G / C}^{2} \boldsymbol{\omega}$. Hence
$$
\mathbf{H}_C = \left( I_G + m r_{G / C}^{2} \right) \omega \mathbf{k} = I_C \omega \mathbf{k} . \quad \checkmark
$$
*Note.* The reduction used $\boldsymbol{\omega} \perp \mathbf{r}_{G / C}$, which is a property of **plane** motion. In three dimensions the angular momentum about the instantaneous centre is **not** $I_C \omega$, and using that identity on a spatial problem is a real and common error.
:::

::: example Ballistic pendulum {#ex-ballistic}
A uniform rod of mass $4\ \mathrm{kg}$ and length $1.2\ \mathrm{m}$ hangs from a hinge at its top. A $10\ \mathrm{g}$ bullet travelling horizontally at $400\ \mathrm{m / s}$ strikes it $600\ \mathrm{mm}$ below the hinge and embeds itself. Find the angular speed just after impact and the maximum swing.
::: solution
**Impact: conserve angular momentum about the hinge.** The impulsive hinge reaction has no moment about the hinge, so
$$
m v d = \left( I_O + m d^{2} \right) \omega, \qquad
I_O = \frac{M L^{2}}{3} = \frac{4 \times 1.44}{3} = 1.92\ \mathrm{kg\,m^{2}} ,
$$
$$
\omega = \frac{0.01 \times 400 \times 0.6}{1.92 + 0.01 \times 0.36}
= \frac{2.40}{1.9236} = 1.248\ \mathrm{rad / s} .
$$
**Swing: conserve energy.** The energy just after impact is
$$
T = \tfrac{1}{2} \times 1.9236 \times 1.248^{2} = 1.497\ \mathrm{J},
$$
and the combined mass centre, at $0.6\ \mathrm{m}$ from the hinge, rises by $0.6 \left( 1 - \cos \theta \right)$, so
$$
1.497 = 4.01 \times 9.81 \times 0.6 \left( 1 - \cos \theta \right)
\quad\Longrightarrow\quad
\theta = 20.5^{\circ} .
$$
*Check.* The bullet's initial kinetic energy was $\tfrac{1}{2} \times 0.01 \times 400^{2} = 800\ \mathrm{J}$, and only $1.5\ \mathrm{J}$ — $0.19$ per cent — survived the impact. $\checkmark$

*Sanity.* That $99.8$ per cent loss is not an accident and cannot be recovered: a perfectly inelastic collision destroys as much kinetic energy as the constraints allow, and the amount is fixed by momentum conservation, not by the details of the deformation. It is why a **ballistic pendulum** measures momentum-like quantities and must be corrected by the mass ratio before it can be called an energy measurement, and it is the same arithmetic that makes a **car crash** at twice the speed four times as destructive in energy but only twice as severe in momentum — which is precisely the difference between what an airbag is designed for and what a crumple zone is designed for.
:::
:::

::: example Falling rod {#ex-falling-rod}
The rod of Example 3, released from the horizontal with no bullet, has angular speed $\omega = \sqrt{3 g \sin \theta / L}$ at angle $\theta$ below the horizontal. Find the bearing reaction at the bottom of the swing.
::: solution
Differentiating $\tfrac{1}{2} I_O \omega^{2} = m g \tfrac{L}{2} \sin \theta$ gives $\alpha = 3 g \cos \theta / \left( 2 L \right)$, and at the bottom $\theta = 90^{\circ}$ this is **zero** while
$$
\omega^{2} = \frac{3 g}{L} = 24.53\ \mathrm{s^{- 2}} .
$$
The mass centre accelerates **upwards** at $\bar{a} = \omega^{2} L / 2 = 14.72\ \mathrm{m / s^{2}}$, so
$$
R - m g = m \bar{a}
\quad\Longrightarrow\quad
R = m \left( g + \omega^{2} L / 2 \right) = 8 \times 24.53 = 196\ \mathrm{N} = 2.5\, m g .
$$
*Check.* At release the vertical reaction is $m g / 4 = 19.6\ \mathrm{N}$, but the mass centre also accelerates **horizontally** at $\alpha L / 2 = 7.36\ \mathrm{m / s^{2}}$, so the hinge must supply $58.9\ \mathrm{N}$ sideways and the total is $62\ \mathrm{N}$, directed almost horizontally. At the bottom the reaction is $196\ \mathrm{N}$ and directed straight up. $\checkmark$

*Sanity.* The bearing force therefore **rotates through ninety degrees** during the swing while growing by a factor of three, and a bearing that sees a rotating load of varying magnitude is one whose fatigue life must be computed on the load vector's orbit rather than on its peak. That is exactly the situation in a connecting-rod big-end bearing, where the load swings once per revolution and its magnitude is the sum of a gas pressure and a reciprocating inertia force, and it is why plain bearings are rated on the minimum film thickness over the whole cycle rather than on the peak pressure.

The general result is worth having: a body pivoted at distance $\bar{r}$ from its mass centre and released from the horizontal reaches the bottom with
$$
R = m g \left[ 1 + \frac{2}{1 + k^{2} / \bar{r}^{2}} \right] ,
$$
which is $3\, m g$ for a point mass on a massless arm, $2.5\, m g$ for a uniform rod and $2\, m g$ for a body whose mass is concentrated at the pivot. The peak reaction depends on the **mass distribution** and not at all on the size — which is the reason a scale model of a swinging arm does not reproduce the bearing loads of the prototype unless it is made of the same material and is geometrically similar, and why dynamic similarity for swinging structures is a stiffness-and-mass problem rather than a geometry problem.
:::
:::

::: example Geared drive by energy {#ex-geared-drive}
A gear of mass $30\ \mathrm{kg}$ and radius of gyration $200\ \mathrm{mm}$ drives a pinion of mass $10\ \mathrm{kg}$ and radius of gyration $100\ \mathrm{mm}$ through a ratio of $3 : 1$. A constant torque of $50\ \mathrm{N\,m}$ is applied to the gear. Find its speed after five revolutions from rest, neglecting friction.
::: solution
**Effective inertia at the gear shaft.** With $n = \omega_p / \omega_g = 3$,
$$
I_{\text{eff}} = I_g + I_p n^{2}
= 30 \times 0.2^{2} + 10 \times 0.1^{2} \times 9
= 1.20 + 0.90 = 2.10\ \mathrm{kg\,m^{2}} .
$$
**Work–energy.**
$$
M \times 2 \pi N = \tfrac{1}{2} I_{\text{eff}} \omega_g^{2}
\quad\Longrightarrow\quad
\omega_g = \sqrt{\frac{2 \times 50 \times 10 \pi}{2.10}} = 38.7\ \mathrm{rad / s} = 369\ \mathrm{rpm} .
$$
*Check.* Doing it as a force problem, $\alpha_g = M / I_{\text{eff}} = 23.81\ \mathrm{rad / s^{2}}$ and $\omega^{2} = 2 \alpha \times 10 \pi$ gives the same $38.7\ \mathrm{rad / s}$. $\checkmark$

*Sanity.* The pinion, a third of the gear's mass and a fifth of its $I$ about its own shaft, contributes $0.90$ of the $2.10\ \mathrm{kg\,m^{2}}$ — $43$ per cent of the total — purely because the ratio enters **squared**. That single fact governs the layout of every geared drive: put the high-speed stage where the inertia is small, and if you must accelerate a drive hard, reduce the ratio rather than lighten the fast shaft, because halving the ratio quarters the reflected inertia. It is also why a machine tool's headstock is geared down in several steps rather than in one: the workpiece's own inertia is reflected through the square of whatever ratio stands between it and the motor, and a two-stage reduction with the larger ratio in the middle of the range is a cheaper way to make a heavy table feel light than any amount of motor.
:::
:::

::: example Emergency stop of a hoist {#ex-hoist-stop}
A mine hoist lowers a $500\ \mathrm{kg}$ cage at $3\ \mathrm{m / s}$. The drum has mass $200\ \mathrm{kg}$, radius of gyration $300\ \mathrm{mm}$ and rope radius $400\ \mathrm{mm}$. A brake brings the cage to rest in $2\ \mathrm{m}$. Find the rope tension and the braking torque.
::: solution
**Deceleration.**
$$
a = \frac{v^{2}}{2 s} = \frac{9}{2 \times 2} = 2.25\ \mathrm{m / s^{2}} \quad \text{(upwards, since the cage is descending)} .
$$
**Cage.** With $T$ the rope tension,
$$
T - m g = m a
\quad\Longrightarrow\quad
T = 500 \left( 9.81 + 2.25 \right) = 6030\ \mathrm{N},
$$
$23$ per cent above the static weight of $4905\ \mathrm{N}$.
**Drum.** Its angular deceleration is $\alpha = a / R = 5.625\ \mathrm{rad / s^{2}}$, and the brake torque must overcome both the rope's driving moment and the drum's own inertia:
$$
M_b = T R + I \alpha = 6030 \times 0.4 + 18 \times 5.625
= 2412 + 101 = 2513\ \mathrm{N\,m} .
$$
*Check.* Energy: the cage loses $\tfrac{1}{2} \times 500 \times 9 = 2250\ \mathrm{J}$ of kinetic energy and $500 \times 9.81 \times 2 = 9810\ \mathrm{J}$ of potential energy, a total of $12\,060\ \mathrm{J}$ to be dissipated; the brake turns through $2 / 0.4 = 5\ \mathrm{rad}$, so $M_b = 12\,060 / 5 = 2412\ \mathrm{N\,m}$ — which is the rope's moment alone, and the extra $101\ \mathrm{N\,m}$ is the drum's own kinetic energy, $\tfrac{1}{2} \times 18 \times 7.5^{2} = 506\ \mathrm{J}$, which the energy balance must also absorb. Adding $506 / 5 = 101$ gives $2513\ \mathrm{N\,m}$ $\checkmark$

*Sanity.* The $23$ per cent dynamic overshoot in the rope tension is the whole of hoist-rope design: a rope sized on the static weight with a nominal safety factor of $9$ has, on an emergency stop, a real safety factor of $7$, and mine regulations specify the stop deceleration precisely for that reason. The other number to notice is that the drum's own inertia is only $4$ per cent of the braking torque — but on a **light** cage or a big multi-rope drum it is $20$ per cent, and a brake set on the high-speed side of the reducer sees that inertia multiplied by the **square** of the gear ratio, which is why hoist brakes are always applied to the low-speed shaft or directly to the drum.
:::
:::

::: history
The **work–energy** principle for rigid bodies is d'Alembert's and, in its cleanest form, Daniel Bernoulli's of 1726; the term "kinetic energy" for $\tfrac{1}{2} m v^{2}$ is Thomas Young's of 1807, and the distinction between kinetic and potential energy, with the conservation statement in the modern form, is Rankine's of 1853. **König's theorem**, that the energy splits into translation of the mass centre and rotation about it, is from 1834 and is sometimes called the theorem of the living force of the centre of gravity. The **ballistic pendulum** is Robins's invention of 1742, in *New Principles of Gunnery*, and it was the standard method of measuring muzzle velocity for a hundred and fifty years — precisely because it converts an unmeasurable impulsive force into a measurable height, at the cost of the enormous energy loss computed in Example 3. The **coefficient of restitution** as a measured material property is Rankine's and Newton's experimental legacy, and the modern treatment of rigid-body impact as a differential inclusion rather than a conservation law, resolving the indeterminacy of simultaneous contacts, begins with Poisson in 1833 and runs through Stronge, Kane and the nonsmooth dynamics of Moreau and Batlle in the 1980s.
:::

## Where this leads

The three-dimensional generalisation, with the full angular momentum vector and the gyroscopic terms, is in [[dynamics/three-dimensional-dynamics]]. Energy methods applied to deformable bodies — strain energy, Castigliano and the unit-load method — are in [[solid-mechanics/energy-methods]], the vibration of the systems studied here is in [[vibrations/free-vibration]], and the impact and contact modelling that the last section gestures at is developed in [[mechanisms/cams]].

::: summary
- A rigid body's kinetic energy is $\tfrac{1}{2} m v_G^{2} + \tfrac{1}{2} I_G \omega^{2}$, and for rolling it is $\tfrac{1}{2} I_C \omega^{2}$ about the contact point.
- The friction at a rolling contact does no work, so energy methods cannot tell you whether the no-slip assumption is valid — check it afterwards against $\mu N$.
- Work is $\int \mathbf{F} \cdot \mathrm{d} \mathbf{r}_G + \int M_G \, \mathrm{d}\theta$; a couple contributes $M \Delta \theta$ wherever it is applied, and a cord's end moves in the ratio of the moment arms about the instantaneous centre.
- Angular momentum about a fixed point or the instantaneous centre is $I \omega$; conserve it about the impact point to solve a collision without knowing the impulsive force.
- An inelastic impact destroys most of the kinetic energy — $99.8$ per cent for a bullet in a pendulum — and the loss is fixed by momentum, not by the material.
- Rotating inertias reflect through a gear ratio as the **square** of the ratio, which dominates the acceleration behaviour of any geared drive.
:::

::: quiz
A spool rolls without slipping along a rough horizontal floor while a cord wound on its core is pulled. Over a given displacement, the work done by the floor's friction force on the spool is:
- [ ] Positive, because the friction acts in the direction of motion
- [ ] Negative, because the friction opposes the motion
- [x] Zero, because the point of application of the friction is instantaneously at rest
- [ ] Zero, because the friction force itself is zero
::: solution
The friction is generally **not** zero — it is what enforces the no-slip condition and it can point either way — but its power is $\mathbf{F} \cdot \mathbf{v}_C$ and the contact point $C$ of a rolling body has zero velocity, so it does no work. The corollary is a trap: an energy solution to a rolling problem never reveals whether the required friction exceeds $\mu N$, so the no-slip assumption must be checked afterwards through the force equations. This is also why a car moving at a steady speed on level ground does not gain energy from the road: the static friction supplies the external force that lets the engine's chemical energy become kinetic energy, and it does not itself spend a joule. The energy is spent at the contact patch as **hysteresis** in the deforming tyre, which is a different mechanism entirely and is why rolling resistance is proportional to load and to the loss tangent of the rubber rather than to any friction coefficient.
:::
:::

## Exercises

::: exercise Kinetic energy {level=1 check="0.333"}
A solid cylinder of mass $m$ and radius $R$ rolls at speed $v$. What fraction of its kinetic energy is rotational?
::: solution
$T_{\text{rot}} / T = \tfrac{1}{2} I_G \omega^{2} / \tfrac{1}{2} m v^{2} \left( 1 + k^{2} / R^{2} \right) = \tfrac{1}{2} / \tfrac{3}{2} = 1 / 3$, so the rotational fraction is $1 / 3$ and the translational is $2 / 3$.
*Note.* The answer to enter is the fraction $1 / 3 = 0.333$.
:::
:::

::: exercise Rolling {level=1 check="5.72"}
A $10\ \mathrm{kg}$ solid cylinder of radius $0.2\ \mathrm{m}$ rolls from rest down a $30^{\circ}$ incline through $5\ \mathrm{m}$. Find its speed by energy.
::: solution
$m g s \sin \theta = \tfrac{1}{2} m v^{2} \times 1.5$, so
$$
v = \sqrt{\frac{2 \times 9.81 \times 5 \times 0.5}{1.5}} = \sqrt{32.7} = 5.72\ \mathrm{m / s}.
$$
*Note.* The answer to enter is $5.72\ \mathrm{m / s}$.
:::
:::

::: exercise Reflected inertia {level=1 check="2.1"}
For the drive of Example 5, what is the effective moment of inertia at the gear shaft?
::: solution
$I_{\text{eff}} = 1.20 + 0.90 = 2.10\ \mathrm{kg\,m^{2}}$.
:::
:::

::: exercise Falling yo-yo {level=2}
A yo-yo of mass $0.5\ \mathrm{kg}$, outer radius $30\ \mathrm{mm}$, axle radius $5\ \mathrm{mm}$ and $k = 20\ \mathrm{mm}$ falls $1.5\ \mathrm{m}$ from rest with the string unwinding. Find its speed and spin rate by energy.
::: solution
$$
m g h = \tfrac{1}{2} m v^{2} \left( 1 + \frac{k^{2}}{r^{2}} \right)
= \tfrac{1}{2} m v^{2} \times 17
\quad\Longrightarrow\quad
v = \sqrt{\frac{2 \times 9.81 \times 1.5}{17}} = 1.32\ \mathrm{m / s} ,
$$
$$
\omega = \frac{v}{r} = \frac{1.316}{0.005} = 263\ \mathrm{rad / s} = 2510\ \mathrm{rpm} .
$$
*Sanity.* Two and a half thousand revolutions a minute from a fall of a metre and a half, and only $8$ per cent of the potential energy ends up as translation — the other $92$ per cent is spin. That is the whole trick of a yo-yo, and the same arithmetic governs a **falling-weight** clock's escapement, which exists precisely to dump that $92$ per cent slowly and regularly rather than in a burst.
:::
:::

::: exercise Angular momentum {level=2}
A uniform rod of mass $M$ and length $L$ lies on a smooth horizontal table and is struck a sharp horizontal blow $L / 4$ from its centre. Show that it acquires both translation and rotation, and find the ratio of the rotational to the translational kinetic energy.
::: solution
Impulse $J$ gives $m v = J$ and $J \times L / 4 = I_G \omega = \left( M L^{2} / 12 \right) \omega$, so
$$
v = \frac{J}{M}, \qquad \omega = \frac{3 J}{M L} ,
$$
$$
\frac{T_{\text{rot}}}{T_{\text{trans}}}
= \frac{\tfrac{1}{2} I_G \omega^{2}}{\tfrac{1}{2} M v^{2}}
= \frac{\left( M L^{2} / 24 \right) \times 9 J^{2} / M^{2} L^{2}}{J^{2} / 2 M}
= \frac{9}{12} = 0.75 .
$$
*Sanity.* The split depends only on where the blow lands: in general $T_{\text{rot}} / T_{\text{trans}} = M d^{2} / I_G = 12 d^{2} / L^{2}$, which is $0$ at the centre, $0.75$ at $L / 4$, and $3$ at the end. A cue ball struck off centre gets spin in exactly this ratio — for a sphere $I_G = 2 m R^{2} / 5$ the ratio is $5 d^{2} / \left( 2 R^{2} \right)$ — which is why the "english" a player puts on a ball is quoted as a fraction of the radius rather than as a force: the ratio of spin to speed is set by the offset alone, and the strength of the stroke only scales both together. The natural value $d = 0.4 R$ gives pure rolling on a cue ball, which is why that offset is the one that produces no side slip at the cloth and why anything struck harder at that same point still travels straight but leaves more energy in the cloth as heat.
:::
:::

::: exercise Work of a couple {level=2}
A winding drum of $I = 18\ \mathrm{kg\,m^{2}}$ and rope radius $0.4\ \mathrm{m}$ lifts a $500\ \mathrm{kg}$ cage through $5\ \mathrm{m}$ from rest, the driving torque being $2500\ \mathrm{N\,m}$. Find the final speed by energy and compare with [[dynamics/rigid-body-kinetics]].
::: solution
$$
\left( M - m g R \right) \theta = \tfrac{1}{2} \left( m + \frac{I}{R^{2}} \right) v^{2},
\qquad \theta = \frac{5}{0.4} = 12.5\ \mathrm{rad} ,
$$
$$
538 \times 12.5 = \tfrac{1}{2} \times 612.5 \, v^{2}
\quad\Longrightarrow\quad
v = \sqrt{21.96} = 4.69\ \mathrm{m / s} .
$$
*Sanity.* The same answer comes from $v = \sqrt{2 a s}$ with $a = 2.20\ \mathrm{m / s^{2}}$, as it must. The energy route is preferable whenever the torque **varies** — as it does for a real motor with a torque–speed curve — because the work is then $\int M \, \mathrm{d}\theta$ and the varying torque never requires an integration of the equation of motion, only of the torque diagram.
:::
:::

::: exercise Design {level=3}
A drop forge hammers a $200\ \mathrm{kg}$ ram from a height of $1.2\ \mathrm{m}$ onto a $1500\ \mathrm{kg}$ anvil assembly. Estimate the energy delivered to the work, the rebound, and the force on the foundation if the work is $8\ \mathrm{mm}$ thick at the moment of impact. Say what you would change to deliver more energy to the work.
::: solution
**Impact velocity.** $v = \sqrt{2 g h} = \sqrt{2 \times 9.81 \times 1.2} = 4.85\ \mathrm{m / s}$.
**Energy available.**
$$
T_1 = \tfrac{1}{2} \times 200 \times 4.85^{2} = 2354\ \mathrm{J}.
$$
**Common velocity after impact** (the work flows plastically, so the collision is perfectly inelastic):
$$
v_c = \frac{200 \times 4.85}{1700} = 0.571\ \mathrm{m / s}, \qquad
T_2 = \tfrac{1}{2} \times 1700 \times 0.571^{2} = 277\ \mathrm{J}.
$$
**Delivered to the work.** For a perfectly plastic collision,
$$
\Delta T = 2354 - 277 = 2077\ \mathrm{J} \quad \left( 88\ \text{per cent} \right) .
$$
**Rebound.** If the work is not perfectly plastic but has $e = 0.2$, the separation condition $v_1 - v_2 = e v_1^{\prime}$ together with momentum conservation gives
$$
v_2 = \frac{m_1 v \left( 1 - e \right)}{m_1 + m_2} = \frac{200 \times 4.85 \times 0.8}{1700} = 0.456\ \mathrm{m / s},
\qquad
v_1 = v_2 + e v = 1.43\ \mathrm{m / s} ,
$$
a rebound height of $v_1^{2} / 2 g = 104\ \mathrm{mm}$ and a kinetic energy left in the two bodies of $360\ \mathrm{J}$ rather than $277\ \mathrm{J}$. The delivered energy falls to $1994\ \mathrm{J}$, $85$ per cent.

**Mean forging force.**
$$
\bar{F} = \frac{2077}{0.008} = 260\ \mathrm{kN}.
$$
*Design comment.* The efficiency of a drop hammer is $\eta = m_{\text{anvil}} / \left( m_{\text{anvil}} + m_{\text{ram}} \right)$, here $0.88$, and it is the reason an anvil is heavy and a forging press's bed is heavier still: every kilogram you add to the anvil goes directly into delivered energy, and every kilogram you add to the ram does too, which is why the ram is made light and the frame massive. Two changes deliver more energy. First, **increase the anvil mass** — going from $1500$ to $3000\ \mathrm{kg}$ raises the efficiency to $0.94$, a $7$ per cent gain, but the foundation then has to carry the extra static weight. Second, **increase the drop height**, which gains linearly in energy but as the square root in cycle time, so it costs throughput. What does **not** help is making the ram heavier: that raises $T_1$ but lowers $\eta$ by exactly the same factor, and to first order the delivered energy is $m_1 g h \, m_2 / \left( m_1 + m_2 \right)$, which is maximised in $m_1$ only by making the anvil heavier. The mean force of $260\ \mathrm{kN}$ is also a warning: the peak is several times that, the frame is designed for it, and the $8\ \mathrm{mm}$ work thickness is what sets everything — a thinner flash would give a proportionally higher force and would crack the die.
:::
:::

::: exercise Derivation {level=3}
Derive the work–energy equation for a rigid body in plane motion from the equations of motion, and use it to show that the friction force at a rolling contact does no work while the contact point nevertheless has a non-zero acceleration.
::: solution
**From the equations of motion.** With $\sum \mathbf{F} = m \mathbf{a}_G$ and $\sum M_G = I_G \alpha$, take the scalar product of the first with $\mathrm{d} \mathbf{r}_G$ and multiply the second by $\mathrm{d} \theta$:
$$
\sum \mathbf{F} \cdot \mathrm{d} \mathbf{r}_G = m \mathbf{a}_G \cdot \mathrm{d} \mathbf{r}_G
= m \frac{\mathrm{d} \mathbf{v}_G}{\mathrm{d} t} \cdot \mathbf{v}_G \, \mathrm{d} t
= \mathrm{d} \left( \tfrac{1}{2} m v_G^{2} \right) ,
$$
$$
\sum M_G \, \mathrm{d} \theta = I_G \alpha \, \mathrm{d} \theta
= I_G \frac{\mathrm{d} \omega}{\mathrm{d} t} \omega \, \mathrm{d} t
= \mathrm{d} \left( \tfrac{1}{2} I_G \omega^{2} \right) .
$$
Adding and integrating,
$$
U_{1 \to 2} = \left[ \tfrac{1}{2} m v_G^{2} + \tfrac{1}{2} I_G \omega^{2} \right]_1^2 = T_2 - T_1 .
$$
**Power of the friction force.** The total power of a force system on a rigid body is
$$
\mathcal{P} = \sum_i \mathbf{F}_i \cdot \mathbf{v}_i .
$$
For a single friction force $\mathbf{F}$ applied at the contact point $C$, $\mathcal{P} = \mathbf{F} \cdot \mathbf{v}_C$, and rolling without slipping means $\mathbf{v}_C = \mathbf{0}$, so
$$
\mathcal{P}_{\text{friction}} = 0 .
$$
**But the acceleration is not zero.** The contact point's **velocity** is zero at one instant and its **acceleration** is $\omega^{2} R$ towards the centre, as shown in [[dynamics/rigid-body-kinematics]]. Work is the integral of force against the **velocity of its own point of application**, and that velocity is identically zero; acceleration enters the work only through the equations of motion, not through the definition of work. Equivalently, the contact point is a different material point at every instant — the sequence of particles that touch the ground — and each of them is at rest at the moment it is touched.

*Comment.* This is the reason a car can accelerate without its tyres doing any work on it. The engine's chemical energy becomes kinetic energy through the **static** friction at the contact patch, and that friction does no work; it merely supplies the external force that lets the internal forces redistribute energy within the car-plus-Earth system. The same argument explains why a person walking does no work through the ground's friction, why an ice skater pushing off the side boards gains kinetic energy from her own muscles and not from the boards, and why the textbook claim "friction always dissipates energy" is only true of **kinetic** friction. Static friction is the most industrially useful force there is, and it does not spend a joule.
:::
:::
