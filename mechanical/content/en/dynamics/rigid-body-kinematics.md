A rigid body is a particle with memory: it has a position, and it has an **orientation**, and the two are linked by the fact that the distance between any two of its points never changes. That one constraint — rigidity — turns the velocity problem from a vector subtraction into something more structured, and gives up a gift in exchange: at any instant the velocity field of a plane-moving body is a **pure rotation about some point**, however complicated the motion looks. Finding that point is often a matter of drawing two lines, and it turns a page of algebra into a sentence of geometry.

Everything in this lesson is a consequence of one equation, $\mathbf{v}_B = \mathbf{v}_A + \boldsymbol{\omega} \times \mathbf{r}_{B / A}$, and one fact about it: $\boldsymbol{\omega}$ is the same for every pair of points on the body, so it can be found once and used everywhere. The commonest error by a wide margin is to compute $\omega$ from one pair of points and then forget which pair produced it, or to write $\omega r_{B / A}$ using the straight distance $A B$ instead of the perpendicular distance from $B$ to the axis through $A$.

::: warning $\omega$ belongs to the body, not to a point
The angular velocity $\boldsymbol{\omega}$ is a property of the **rigid body**: every line fixed in the body rotates at the same rate, so $\boldsymbol{\omega}$ computed from $A$ and $B$ is the same as that computed from $C$ and $D$. This is not true of velocity or acceleration, and it is the lever on which the whole subject works. It also means the direction of $\mathbf{v}_{B / A}$ is always perpendicular to $A B$ — if you compute a relative velocity that is not perpendicular to the line joining the two points, you have made an error, and you can see it before you finish the arithmetic.
:::

## Translation and rotation

::: definition Plane motion of a rigid body {#def-plane-motion}
A body has **plane motion** when all its points move in parallel planes and it does not rotate about an axis perpendicular to them. Its motion is then either:

- **Translation**, in which every line in the body stays parallel to itself, so $\boldsymbol{\omega} = 0$ and all points have the same velocity and acceleration; or
- **Rotation about a fixed axis**, in which for a point at position $\mathbf{r}$ from the axis
$$
\mathbf{v} = \boldsymbol{\omega} \times \mathbf{r}, \qquad
\mathbf{a} = \boldsymbol{\alpha} \times \mathbf{r} - \omega^{2} \mathbf{r}, \qquad
v = \omega r, \quad a_t = \alpha r, \quad a_n = \omega^{2} r ;
$$
or
- **General plane motion**, a translation with an arbitrary base point plus a rotation.

The **rolling without slipping** condition is the special case in which the point of the rolling body in contact with a fixed surface has zero velocity, so $v_C = \omega R$ for a wheel of radius $R$ whose centre moves at $v_C$.
:::

::: proof The relative-velocity equation {#proof-rel-vel}
Let $A$ and $B$ be two points of a rigid body, so that $\left| \mathbf{r}_{B / A} \right|$ is constant. In an inertial frame,
$$
\mathbf{r}_B = \mathbf{r}_A + \mathbf{r}_{B / A} .
$$
Because $\mathbf{r}_{B / A}$ has constant length, its rate of change is the rotation of the line $A B$ through the angle it makes with itself, of magnitude $\omega r_{B / A}$ and directed perpendicular to $A B$ — which is exactly $\boldsymbol{\omega} \times \mathbf{r}_{B / A}$. Differentiating,
$$
\mathbf{v}_B = \mathbf{v}_A + \boldsymbol{\omega} \times \mathbf{r}_{B / A} .
$$
Differentiating again, with $\boldsymbol{\alpha} = \dot{\boldsymbol{\omega}}$,
$$
\mathbf{a}_B = \mathbf{a}_A + \boldsymbol{\alpha} \times \mathbf{r}_{B / A}
+ \boldsymbol{\omega} \times \left( \boldsymbol{\omega} \times \mathbf{r}_{B / A} \right) ,
$$
where the last term is $- \omega^{2} \mathbf{r}_{B / A}$, directed from $B$ towards $A$.

*Note what the proof did not assume.* Nothing about the path of $A$, nothing about whether the axis is fixed, and nothing about the size of $\omega$. The equations hold instantaneously for **any** plane motion, and the base point $A$ may be any point of the body — including one that is not physically on it, and including the instantaneous centre, about which the velocity field is then a pure rotation.
:::

::: theorem Instantaneous centre of zero velocity {#thm-ic}
If a body in plane motion has $\omega \ne 0$, there is a unique point $I$, fixed in the body at that instant, at which the velocity is zero. It lies on the line through $A$ perpendicular to $\mathbf{v}_A$ and on the line through $B$ perpendicular to $\mathbf{v}_B$, and the velocity of any point $P$ is
$$
v_P = \omega \, I P, \quad \text{perpendicular to } I P, \qquad
\omega = \frac{v_A}{I A} = \frac{v_B}{I B} .
$$
If $\mathbf{v}_A$ and $\mathbf{v}_B$ are parallel, $I$ is at infinity and the motion is an instantaneous translation.
:::

::: proof
The velocity of a point at $\mathbf{r}$ from $A$ is $\mathbf{v}_A + \boldsymbol{\omega} \times \mathbf{r}$. Setting this to zero,
$$
\mathbf{v}_A = - \boldsymbol{\omega} \times \mathbf{r},
$$
which requires $\mathbf{r}$ perpendicular to $\mathbf{v}_A$ — so $I$ lies on the line through $A$ normal to $\mathbf{v}_A$ — and of magnitude $r = v_A / \omega$. The same argument at $B$ gives the second line, and the two non-parallel lines meet in one point. Once $I$ is known, the velocity of any point $P$ is obtained by taking $\mathbf{v}_P = \mathbf{v}_I + \boldsymbol{\omega} \times \mathbf{r}_{P / I} = \boldsymbol{\omega} \times \mathbf{r}_{P / I}$, which is a pure rotation of magnitude $\omega \cdot I P$.

If $\mathbf{v}_A \parallel \mathbf{v}_B$ the two normals are parallel and meet at infinity; then $\omega = 0$ and the body is translating instantaneously. The limiting case is not a curiosity: it occurs at the dead centres of every slider-crank and four-bar linkage, and it is exactly where the velocity analysis must be done with care rather than with a ruler.
:::

::: example Rolling wheel {#ex-wheel}
A wheel of radius $400\ \mathrm{mm}$ rolls without slipping with its centre at $8\ \mathrm{m / s}$. Find the velocity of a point on the rim at the same height as the centre, and of the top of the wheel.
::: solution
The contact point $C$ has zero velocity, so it is the instantaneous centre and
$$
\omega = \frac{v_{\text{centre}}}{R} = \frac{8}{0.4} = 20\ \mathrm{rad / s} .
$$
**Point at the centre's height**, at $P$:
$$
IP = \sqrt{0.4^{2} + 0.4^{2}} = 0.5657\ \mathrm{m}, \qquad
v_P = 20 \times 0.5657 = 11.31\ \mathrm{m / s},
$$
directed perpendicular to $IP$, that is at $45^{\circ}$ up and forward.
**Top of the wheel**, at $T$:
$$
v_T = \omega \times 2 R = 20 \times 0.8 = 16.0\ \mathrm{m / s} = 2 v_{\text{centre}} .
$$
*Check.* Take the centre $G$ as base with $\mathbf{i}$ forward, $\mathbf{j}$ up and $\boldsymbol{\omega} = - 20 \mathbf{k}$ for forward rolling. The point $P$ directly ahead of the centre is at $\mathbf{r}_{P / G} = 0.4 \mathbf{i}$, so
$$
\mathbf{v}_P = 8 \mathbf{i} + \left( - 20 \mathbf{k} \right) \times 0.4 \mathbf{i}
= 8 \mathbf{i} - 8 \mathbf{j}, \qquad
\left| \mathbf{v}_P \right| = 11.31\ \mathrm{m / s} \checkmark
$$
directed forwards and downwards at $45^{\circ}$, perpendicular to $IP$ as the instantaneous-centre method requires. $\checkmark$

*Sanity.* The top of a rolling wheel moves at twice the vehicle's speed and the contact point at zero — two facts that can be verified by filming the spokes of a moving bicycle and that surprise almost everyone the first time. They explain why a rolling wheel throws mud forwards and up from its top rather than backwards, why the outer flange of a railway wheel is the fastest-moving part of a train and is worn accordingly, and why the tread of a tyre at the contact patch is momentarily stationary relative to the road — which is exactly the condition that makes static friction, and therefore tractive force, available. A skid is the failure of that condition, and the friction available then drops from the static to the kinetic value.
:::
:::

::: widget plot
f: 2*sin(x*pi/360)
x: 0, 360
y: 0, 2.1
labels: \text{point speed } / \ v_{\text{centre}}
caption: Speed of a point on the rim of a rolling wheel, relative to the ground, against its angular position $x$ measured from the contact point. The speed is $2 v \sin(x / 2)$ — it vanishes at the contact point, reaches $v \sqrt{2}$ at a quarter turn and $2 v$ at the top. The **cycloidal** velocity profile is why a point on a wheel experiences a stress cycle at the rotation frequency and why the contact point, which is stationary, is nevertheless the point of maximum **deformation**: zero velocity and zero strain are not the same thing, and the distinction is the whole of rolling resistance in a tyre.
:::

## Velocity analysis

::: algorithm Velocity of a mechanism {#alg-velocity}
Two methods, and you should be able to do either.

**Relative-velocity (vector) method.**
1. Write $\mathbf{v}_B = \mathbf{v}_A + \boldsymbol{\omega} \times \mathbf{r}_{B / A}$ for a pair on the same link, taking $A$ where the velocity is known.
2. Count unknowns: the equation is two scalar equations in two dimensions, so it can carry two unknowns — usually a magnitude and a direction.
3. Add equations link by link until you reach the point of interest, and never introduce a link's $\omega$ before you have found it.

**Instantaneous-centre method.**
1. Locate $I$ for the link from the directions of two known velocities.
2. Compute $\omega = v / I P$ from the point whose velocity is fully known.
3. Get every other velocity on the link as $\omega \times$ distance from $I$.

The instantaneous-centre method is faster and gives a check on the answer; the vector method is the only one that generalises to acceleration, to space mechanisms and to a computer.
:::

::: example Slider-crank {#ex-slider-crank}
The crank of a slider-crank is $100\ \mathrm{mm}$ and the connecting rod $300\ \mathrm{mm}$. The crank turns at $1200\ \mathrm{rpm}$ with the crank angle at $60^{\circ}$ from inner dead centre. Find the piston speed and the angular speed of the connecting rod.
::: solution
$\omega = 2 \pi \times 1200 / 60 = 125.7\ \mathrm{rad / s}$, so the crank pin moves at
$$
v_A = \omega r = 125.7 \times 0.1 = 12.57\ \mathrm{m / s}
$$
in a direction perpendicular to the crank. The rod's obliquity follows from the loop closure $r \sin \theta = l \sin \beta$:
$$
\sin \beta = \frac{0.1 \times 0.8660}{0.3} \quad\Longrightarrow\quad \beta = 16.78^{\circ} .
$$
**Piston speed.** The piston is on the cylinder axis, so equating the components of $\mathbf{v}_A$ and $\mathbf{v}_B$ along the rod,
$$
v_B \cos \beta = v_A \cos \left( 90^{\circ} - \theta - \beta \right)
\quad\Longrightarrow\quad
v_B = v_A \left( \sin \theta + \tan \beta \cos \theta \right),
$$
$$
v_B = 12.57 \left( 0.8660 + 0.3014 \times 0.5 \right) = 12.57 \times 1.0167 = 12.78\ \mathrm{m / s}.
$$
**Rod angular speed.** The component of velocity perpendicular to the rod must be $\omega_{\text{rod}} l$ at $B$ relative to $A$:
$$
\omega_{\text{rod}} = \frac{v_A \cos \theta}{l \cos \beta}
= \frac{12.57 \times 0.5}{0.3 \times 0.9576} = 21.9\ \mathrm{rad / s} .
$$
*Check.* The familiar approximate formula $v_B = r \omega \left[ \sin \theta + r \sin 2 \theta / \left( 2 l \right) \right]$ gives $12.70\ \mathrm{m / s}$, within $0.6$ per cent of the exact $12.78$; the approximation replaces $\tan \beta$ by $\sin \beta$ and is good to first order in $r / l$. $\checkmark$

*Sanity.* The piston moves **faster** than the crank pin, by $1.7$ per cent here, because the rod's obliquity adds a second contribution. The ratio $l / r = 3$ is short by modern standards — car engines use $3.2$ to $3.6$ and marine diesels up to $4.5$ — and the reason for the long rod is precisely this: the second-order term goes as $r / l$, so a longer rod makes the piston motion closer to pure simple harmonic, which reduces the unbalanced second-order shaking force that no counterweight can remove. That single geometric ratio is the reason a long-stroke slow-speed marine diesel vibrates less than a short-stroke car engine at the same speed, and why racing engines accept short rods in exchange for a compact, stiff block.
:::
:::

::: example Spool on a cord {#ex-spool}
A spool of outer radius $120\ \mathrm{mm}$ and inner radius $60\ \mathrm{mm}$ rolls without slipping along a horizontal floor. A cord wound on the inner core is pulled horizontally at $2\ \mathrm{m / s}$. Which way does the spool move and how fast?
::: solution
The cord leaves the core at the **top**, so the point of the core at the cord has velocity $2\ \mathrm{m / s}$ forwards. The contact point $C$ with the floor is the instantaneous centre, so
$$
\omega = \frac{v_{\text{cord}}}{R + r} = \frac{2}{0.12 + 0.06} = 11.11\ \mathrm{rad / s} ,
$$
$$
v_{\text{centre}} = \omega R = 11.11 \times 0.12 = 1.333\ \mathrm{m / s} \quad \text{forwards} .
$$
*Sanity.* The spool moves in the **same** direction as the pull, more slowly than it. The general rule is that the spool rolls towards the side of the contact point on which the cord's line of action falls: pull horizontally at the top and it comes to you, pull at just the right angle and it does not move at all. That critical angle is where the cord's line of action passes through the contact point, at
$$
\cos \alpha = - \frac{r}{R} = - 0.5 \quad\Longrightarrow\quad \alpha = 120^{\circ}
$$
from the direction of the pull measured at the centre — that is, pulling at $60^{\circ}$ above the horizontal backwards. This is the classic demonstration that a body can be pulled and not move, and it is the reason a yo-yo on a table goes one way for a low pull and the other for a high one.
:::
:::

::: example Epicyclic gear {#ex-epicyclic}
In a simple planetary gear the sun has a pitch radius of $100\ \mathrm{mm}$, each planet $50\ \mathrm{mm}$ and the ring $200\ \mathrm{mm}$. The ring is held fixed and the arm turns at $60\ \mathrm{rpm}$. Find the planet's spin and the sun's speed.
::: solution
The arm's angular speed is $\omega_a = 2 \pi \times 60 / 60 = 6.283\ \mathrm{rad / s}$, so the planet centre $P$, at $150\ \mathrm{mm}$ from the axis, moves at
$$
v_P = 6.283 \times 0.15 = 0.942\ \mathrm{m / s} .
$$
The planet rolls without slipping on the **fixed** ring, so the point of the planet in contact with the ring is the instantaneous centre, at $200\ \mathrm{mm}$ from the axis and $50\ \mathrm{mm}$ from $P$:
$$
\omega_{\text{planet}} = \frac{v_P}{0.05} = 18.85\ \mathrm{rad / s} = 180\ \mathrm{rpm} .
$$
The sun's pitch point is $100\ \mathrm{mm}$ from the axis, that is $100\ \mathrm{mm}$ on the far side of the instantaneous centre, so
$$
v_{\text{sun}} = 18.85 \times 0.100 = 1.885\ \mathrm{m / s}, \qquad
\omega_{\text{sun}} = \frac{1.885}{0.100} = 18.85\ \mathrm{rad / s} = 180\ \mathrm{rpm} .
$$
*Check.* The tabular (superposition) method gives $\omega_s - \omega_a = - \left( N_r / N_s \right) \left( \omega_r - \omega_a \right)$, so with $\omega_r = 0$,
$$
\omega_s = \omega_a \left( 1 + \frac{N_r}{N_s} \right) = 6.283 \times 3 = 18.85\ \mathrm{rad / s}. \checkmark
$$

*Sanity.* A speed ratio of exactly $3 : 1$ in one stage, with the input and output on the same shaft and turning the same way — that is the whole attraction of the epicyclic gear, and it is why an automatic gearbox, a wind-turbine gearbox and a planetary final drive are all built from these. The instantaneous-centre method gets there without a single equation of the tabular kind, and it generalises to a differential where the tabular method becomes awkward: the four-bar linkage of velocities is drawn, and the answer is measured.
:::
:::

::: example Rack-and-pinion steering {#ex-rack}
A rack-and-pinion steering has a pinion of $60\ \mathrm{mm}$ pitch radius and an overall ratio of $16 : 1$. The track rod attachment gives $120\ \mathrm{mm}$ of effective steering arm and the road wheels steer through $30^{\circ}$ either way. Find the lock-to-lock steering-wheel rotation.
::: solution
At full lock the two rack ends have moved symmetrically, so the rack travel from centre is
$$
x = 2 \times 0.12 \times \sin 30^{\circ} = 0.120\ \mathrm{m}.
$$
The pinion must therefore turn through
$$
\theta_p = \frac{x}{r} = \frac{0.120}{0.060} = 2.00\ \mathrm{rad} = 114.6^{\circ},
$$
and the steering wheel through
$$
\theta_w = 16 \times 114.6 = 1834^{\circ} = 5.1 \ \text{turns from centre},
$$
$$
\text{lock to lock} = 10.2 \ \text{turns}.
$$
*Sanity.* Ten turns lock-to-lock is a realistic figure for a commercial vehicle and high for a car, where $2.5$ to $3$ turns is normal — obtained either by a higher pinion radius or, much more often, by a **variable** ratio, in which the pinion tooth profile is ground so that the ratio falls from $15 : 1$ on centre to $12 : 1$ at full lock. That gives quick response in a parking manoeuvre without the nervousness on a motorway that a fixed quick ratio brings, and it is the same trick the steering geometry itself plays with Ackermann: the inside wheel steers more than the outside so that both roll about a common instantaneous centre on the extended rear-axle line. Ignoring that difference costs a few centimetres of scrub per metre of travel at full lock, which is why a vehicle with worn front-end geometry pushes tyres sideways and howls round a roundabout.
:::
:::

## Acceleration analysis

::: example Connecting-rod acceleration {#ex-accel}
For the slider-crank of Example 6, find the piston acceleration and the rod's angular acceleration at the same position, if the crank turns at a constant $1200\ \mathrm{rpm}$.
::: solution
**Piston.** With $\alpha_{\text{crank}} = 0$,
$$
\begin{aligned}
a_B &= r \omega^{2} \left[ \cos \theta + \frac{r \cos 2 \theta}{l} \right] 
= 0.1 \times 125.7^{2} \left[ 0.5 + \frac{0.1 \times \left( - 0.5 \right)}{0.3} \right] \\
&= 1579 \left[ 0.5 - 0.1667 \right] = 526\ \mathrm{m / s^{2}} = 53.7\ g ,
\end{aligned}
$$
against $527\ \mathrm{m / s^{2}}$ from the exact second derivative of the loop equation.

**Rod.** The rod's angular acceleration follows from the transverse component of the relative acceleration:
$$
\alpha_{\text{rod}} = \frac{r \omega^{2} \sin \theta}{l \cos \beta}
= \frac{1579 \times 0.8660}{0.3 \times 0.9576} = 4756\ \mathrm{rad / s^{2}} .
$$
*Check.* At inner dead centre $\theta = 0$ the formula gives $a_B = r \omega^{2} \left( 1 + r / l \right) = 1579 \times 1.333 = 2105\ \mathrm{m / s^{2}}$, and at outer dead centre $r \omega^{2} \left( 1 - r / l \right) = 1053$ — the classic asymmetry that makes an engine's inner-dead-centre bearing load twice its outer-dead-centre one. $\checkmark$

*Sanity.* Fifty-four gravities from a crank turning at a modest $1200\ \mathrm{rpm}$, and the reason is $\omega^{2}$: $125.7^{2}$ is $15\,800$, and multiplying by $0.1\ \mathrm{m}$ gives $1580\ \mathrm{m / s^{2}}$ before any geometry. That is why reciprocating machinery is balanced with counterweights and why a compressor's foundation is designed against a **shaking force** of $m r \omega^{2}$ at the running speed, and why the second-order term $r \cos 2 \theta / l$ — which no amount of counterweighting can cancel, since it occurs at twice the running speed — is the reason a V-twin and a four-cylinder inline feel different at the same speed.
:::
:::

::: warning The instantaneous centre gives velocities only
The instantaneous centre is a point of **zero velocity**, not of zero acceleration, and it must not be used in an acceleration analysis as though the body were pivoting about a fixed pin. The acceleration of $B$ is $\mathbf{a}_B = \mathbf{a}_A + \boldsymbol{\alpha} \times \mathbf{r}_{B / A} - \omega^{2} \mathbf{r}_{B / A}$, and taking $A = I$ gives $\mathbf{a}_B = \mathbf{a}_I + \boldsymbol{\alpha} \times \mathbf{r}_{B / I} - \omega^{2} \mathbf{r}_{B / I}$ — with an $\mathbf{a}_I$ that is generally **not** zero. For a rolling wheel the contact point has zero velocity but an acceleration $\omega^{2} R$ directed towards the centre. The safe rule is to use $I$ for velocities and a genuinely material point — the centre, a pin, a slider — as the base for accelerations.
:::

::: history
The kinematics of rigid bodies begins with Euler's *Theoria motus corporum rigidorum* of 1765, which introduced the rotation matrix, the principal axes and the theorem that any displacement of a rigid body with one point fixed is a rotation about some axis. The **instantaneous centre of rotation** is due to Robert, Lord Macaulay — the historian's uncle, and a competent engineer who wrote on the strength of gotic arches — in a paper of 1819 read to the Royal Society of Edinburgh, and it was developed into a systematic method by Poinsot in 1834 and, for mechanisms, by Kennedy in his three-centres theorem of 1886. The **centrode** construction, in which the plane motion of a body is represented as the rolling of one centrode on another, is Savary's and Euler's, and it is the geometric basis of the involute gear. The **acceleration image** and the graphical acceleration polygon appear in the machine-design texts of Föppl and of Kennedy's *The Mechanics of Machinery* of 1877, and remained the standard practice until the analytical vector methods of Hartenberg and Denavit's *Kinematic Synthesis of Linkages* of 1964 displaced them; the matrix and complex-number formulations of the same problems, due to Freudenstein in 1954, are what a modern mechanism program uses.
:::

## Where this leads

Accelerations of mechanisms are completed in [[mechanisms/acceleration-analysis]] and the velocity method is applied to linkages in [[mechanisms/velocity-analysis]]. Putting forces into these accelerations is [[dynamics/rigid-body-kinetics]], the three-dimensional generalisation with the Coriolis and gyroscopic terms is [[dynamics/three-dimensional-dynamics]], and the geometry of tooth contact that follows from the centrode idea is in [[mechanisms/gears]].

::: summary
- A rigid body's plane motion is a translation plus a rotation, and $\boldsymbol{\omega}$ is the same for every pair of points on it.
- $\mathbf{v}_B = \mathbf{v}_A + \boldsymbol{\omega} \times \mathbf{r}_{B / A}$: two scalar equations, two unknowns, and $\mathbf{v}_{B / A}$ is always perpendicular to $A B$.
- Unless $\omega = 0$ there is an instantaneous centre of zero velocity, found from two perpendiculars, about which the velocity field is a pure rotation.
- Rolling without slipping means the contact point has zero velocity, so $v_{\text{centre}} = \omega R$ and the top of a wheel moves at $2 v$.
- The instantaneous centre is a velocity concept only; the acceleration equation needs a material base point.
- Reciprocating accelerations go as $r \omega^{2}$, which is why balancing and second-order shake dominate high-speed engine design.
:::

::: quiz
A wheel rolls without slipping on a horizontal road. Comparing the acceleration of the point of the wheel in contact with the road and of the point at the top of the wheel, both measured relative to the road:
- [ ] Both are zero, because the wheel is in steady rolling
- [ ] Both are equal in magnitude and directed towards the centre
- [x] The contact point has an acceleration towards the centre while its velocity is zero; the top point has the same magnitude
- [ ] The contact point has zero acceleration because its velocity is zero
::: solution
The contact point has zero **velocity** and a centripetal acceleration $\omega^{2} R$ directed towards the centre, and so does every other point on the rim, all with the same magnitude. Zero velocity does not imply zero acceleration — a ball at the top of its flight has the same property. This is the clearest possible demonstration that the instantaneous centre is a velocity device and nothing more: if the wheel really were pivoting about a fixed pin at the contact point, that point would have zero acceleration, and the rim points would have accelerations proportional to their distance from it instead of equal magnitudes. The corollary matters in practice: the rubber at the contact patch is stationary and simultaneously accelerating at several gravities, which is why a tyre's greatest stresses and its greatest heat generation occur at the shoulder rather than where it touches the road.
:::
:::

## Exercises

::: exercise Fixed-axis rotation {level=1 check="3.77"}
A $300\ \mathrm{mm}$ diameter flywheel accelerates uniformly from rest to $1200\ \mathrm{rpm}$ in $5\ \mathrm{s}$. Find the tangential acceleration of a point on the rim in $\mathrm{m / s^{2}}$.
::: solution
$\alpha = 125.7 / 5 = 25.13\ \mathrm{rad / s^{2}}$, $a_t = \alpha r = 25.13 \times 0.15 = 3.77\ \mathrm{m / s^{2}}$.
*Note.* The answer to enter is $3.77\ \mathrm{m / s^{2}}$.
:::
:::

::: exercise Rolling {level=1 check="40"}
A car travels at $20\ \mathrm{m / s}$ on wheels of $0.35\ \mathrm{m}$ radius. What is the speed of the topmost point of a tyre relative to the road?
::: solution
$2 v = 40\ \mathrm{m / s}$.
*Note.* The answer to enter is $40\ \mathrm{m / s}$.
:::
:::

::: exercise Instantaneous centre {level=1 check="0.667"}
A ladder $4\ \mathrm{m}$ long leans against a wall and its foot slides away at $0.5\ \mathrm{m / s}$. When the foot is $2.4\ \mathrm{m}$ from the wall, how fast is the top descending?
::: solution
The instantaneous centre is at the corner of wall and floor; with $\theta$ the angle of the ladder,
$$
\omega = \frac{0.5}{4 \cos \theta} = \frac{0.5}{2.4} = 0.2083\ \mathrm{rad / s}, \qquad
v_{\text{top}} = \omega \times 4 \sin \theta = 0.2083 \times 3.2 = 0.667\ \mathrm{m / s}.
$$
*Note.* The answer to enter is $0.667\ \mathrm{m / s}$.
:::
:::

::: exercise Rolling contact {level=1 check="0.05"}
A bicycle wheel of $350\ \mathrm{mm}$ radius travels at $5\ \mathrm{m / s}$. What is the velocity of the valve relative to the ground when the valve is at the same height as the hub and moving backwards?
::: solution
The instantaneous centre is at the contact point, $\omega = 5 / 0.35 = 14.29\ \mathrm{rad / s}$. With the valve level with the hub and behind it, its distance from the contact point is $\sqrt{0.35^{2} + 0.35^{2}} = 0.495\ \mathrm{m}$ and
$$
v = 14.29 \times 0.495 = 7.07\ \mathrm{m / s},
$$
directed perpendicular to the line from the contact point, that is backwards and downwards at $45^{\circ}$.
*Note.* The answer to enter is $7.07\ \mathrm{m / s}$.
:::
:::

::: exercise Relative acceleration {level=2}
A wheel of $250\ \mathrm{mm}$ radius rolls at a steady $6\ \mathrm{m / s}$. Find the acceleration of a point on the rim at (a) the contact point, (b) the top, (c) the same height as the centre.
::: solution
$\omega = 6 / 0.25 = 24\ \mathrm{rad / s}$, and the centre has zero acceleration, so for any rim point $\mathbf{a} = - \omega^{2} \mathbf{r}$ directed from the point towards the centre, of magnitude
$$
\omega^{2} r = 576 \times 0.25 = 144\ \mathrm{m / s^{2}} .
$$
Every point on the rim has the **same** acceleration magnitude, directed to the centre.
*Sanity.* The contact point has zero velocity and $144\ \mathrm{m / s^{2}}$ of acceleration — fifteen gravities — which is the clearest demonstration that the instantaneous centre is not a pivot. It is also why a stone caught in a tyre tread is thrown out rather than merely dropped at the contact patch, and why the highest stresses in a rolling tyre occur at the shoulder rather than at the contact point.
:::
:::

::: exercise Four-bar {level=2}
In a four-bar linkage the frame $A D$ is $240\ \mathrm{mm}$ horizontal, the crank $A B$ is $80\ \mathrm{mm}$, the coupler $B C$ is $240\ \mathrm{mm}$ and the rocker $C D$ is $140\ \mathrm{mm}$. At the instant when the crank is vertical, find the angular velocity of the rocker if the crank turns at $\omega_1$.
::: solution
Place $A$ at the origin and $D$ at $\left( 0.24, 0 \right)$, so $B = \left( 0, 0.08 \right)$. Solving
$$
\left| C - B \right| = 0.24, \qquad \left| C - D \right| = 0.14
$$
gives $C = \left( 0.2324, 0.1398 \right)\ \mathrm{m}$.
**Velocities.** With $\boldsymbol{\omega}_1 = \omega_1 \mathbf{k}$,
$$
\mathbf{v}_B = \omega_1 \mathbf{k} \times 0.08 \mathbf{j} = - 0.08 \omega_1 \mathbf{i} .
$$
Writing $\mathbf{v}_C = \mathbf{v}_B + \omega_2 \mathbf{k} \times \mathbf{r}_{C / B} = \omega_3 \mathbf{k} \times \mathbf{r}_{C / D}$ with
$$
\mathbf{r}_{C / B} = \left( 0.2324, 0.0598 \right), \qquad
\mathbf{r}_{C / D} = \left( - 0.0076, 0.1398 \right),
$$
the two components give
$$
- 0.08 \omega_1 - 0.0598 \omega_2 = - 0.1398 \omega_3, \qquad
0.2324 \omega_2 = - 0.0076 \omega_3 ,
$$
$$
\omega_2 = - 0.0184 \ \omega_1, \qquad
\boxed{\omega_3 = 0.564 \ \omega_1} .
$$
*Sanity.* The coupler's angular velocity is only $1.8$ per cent of the crank's, so at this instant it is very nearly in **translation** — its instantaneous centre lies far outside the mechanism, on the far side of $C$. That is a real and useful feature: a coupler point near such an instant traces an almost straight line over a short arc, which is the principle of the straight-line linkages of Watt and of Chebyshev, and it is also why a four-bar used as a gripper holds its orientation nearly fixed over part of its travel.
:::
:::

::: exercise Design {level=3}
A quick-return shaping machine of the crank-and-slotted-lever type has a crank of radius $200\ \mathrm{mm}$ and a slotted lever of length $900\ \mathrm{mm}$ pivoted $900\ \mathrm{mm}$ below the crank axis. Find the ratio of the return-stroke time to the cutting-stroke time, the ram stroke, and the mean cutting speed if the crank turns at $60\ \mathrm{rpm}$.
::: solution
**Lever oscillation.** The extreme positions occur when the crank is perpendicular to the lever, so the half-angle of oscillation is
$$
\sin \beta = \frac{200}{900} = 0.2222 \quad\Longrightarrow\quad \beta = 12.84^\circ ,
$$
and the total oscillation of the lever is $2 \beta = 25.68^\circ$.
**Time ratio.** The crank sweeps $180^\circ + 2 \beta = 205.7^\circ$ during the cutting stroke and $180^\circ - 2 \beta = 154.3^\circ$ during the return, so
$$
\frac{t_{\text{return}}}{t_{\text{cut}}} = \frac{154.3}{205.7} = 0.750 .
$$
**Ram stroke.** The lever tip describes an arc of radius $900\ \mathrm{mm}$,
$$
s = 2 \times 900 \sin \beta = 2 \times 900 \times 0.2222 = 400\ \mathrm{mm}.
$$
**Mean cutting speed.** At $60\ \mathrm{rpm}$ the cycle is $1.00\ \mathrm{s}$ and the cutting stroke occupies $205.7 / 360 = 0.571\ \mathrm{s}$, so
$$
\bar{v} = \frac{0.400}{0.571} = 0.70\ \mathrm{m / s},
$$
with a peak of about $1.6$ times the mean, $1.1\ \mathrm{m / s}$.

*Design comment.* The whole point of a quick-return mechanism is that the tool cuts slowly, where the force is high and the finish matters, and returns fast, where it does nothing: a ratio of $0.75$ saves a quarter of the cycle time, which on a shaper running at forty strokes a minute is worth twenty-five per cent of its output. The consequence for the drive is that the **motor** sees a wildly varying load — full torque during the cut and almost none during the return — so a shaper carries a heavy flywheel between the motor and the crank, sized so that the speed drop over the cutting stroke stays under $5$ per cent. That flywheel, not the motor's rating, is what makes the table move smoothly, and it is why variable-speed drives with torque limiting have replaced the belt-and-flywheel arrangement only on small machines, where the flywheel's inertia is not needed to keep the motor out of stall.
:::
:::

::: exercise Derivation {level=3}
Show that the plane motion of a rigid body can be represented as the rolling without slipping of one centrode on another, and derive the Euler–Savary equation relating the curvatures of the two centrodes to the pole distance and the angular velocity.
::: solution
**Centrodes.** As the body moves, the instantaneous centre $I$ traces a locus in the **fixed** frame, the *fixed centrode*, and a locus in the **moving** body, the *moving centrode*. At every instant the two pass through the same point, and since the body's velocity at $I$ is zero, the two curves roll on each other without slipping: the arc lengths swept out on each are equal, because the point of contact has no relative velocity along either tangent.

**Euler–Savary.** Take the pole $I$ as origin with the common tangent as $x$-axis, and let the fixed centrode have curvature radius $\rho$ and the moving one $\rho'$, both measured from the same side. If the body turns through $\mathrm{d}\theta$, the pole advances a distance
$$
\mathrm{d} s = \rho \, \mathrm{d}\phi = - \rho' \left( \mathrm{d}\phi + \mathrm{d}\theta \right)
$$
along the fixed centrode, where $\mathrm{d}\phi$ is the rotation of the common normal. Eliminating $\mathrm{d}\phi$,
$$
\left( \frac{1}{\rho} + \frac{1}{\rho'} \right) \mathrm{d} s = - \mathrm{d}\theta .
$$
Applying this to a point $P$ of the body at distance $r$ from the pole along the normal, and requiring its path to have curvature radius $r_P$ so that its centre of curvature lies on the inflection circle, gives the **Euler–Savary equation**
$$
\left( \frac{1}{r} - \frac{1}{\rho} \right) \left( \frac{1}{r} - \frac{1}{\rho'} \right)
= \frac{1}{r^{2}} \left( \frac{\omega_{\text{body}}}{\omega_{\text{pole}}} \right)^{2} \sin^{2} \psi ,
$$
whose most useful form for the design of a cam or a gear flank is
$$
\frac{1}{r_A} + \frac{1}{r_B} = \frac{1}{a} \left( \frac{\sin^{2} \phi_1 + \sin^{2} \phi_2}{\sin^{2} \phi} \right)
$$
relating the radii of curvature of the two pitch centrodes to the centre distance $a$ and the pressure angles $\phi_1, \phi_2$.

*Comment.* The centrode picture is the reason a pair of **non-circular** gears can transmit a prescribed varying ratio: the two pitch centrodes are chosen to roll on each other, and the teeth are then cut to be conjugate to whatever profile is convenient. It is also why an involute gear works at all — its pitch centrodes are circles, so the centre distance can vary without changing the ratio, which is the single property that makes gear trains tolerant of manufacturing error. The inflection circle and the Euler–Savary equation are what tell you where the **undercut** begins on a cam profile, and hence the minimum radius of a cam that can be cut without flattening the follower motion.
:::
:::
