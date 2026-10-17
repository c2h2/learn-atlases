Velocity analysis tells you what the machine is doing. Acceleration analysis tells you **what it costs the structure**. A linkage running at a constant input speed has zero input acceleration and yet carries members accelerating at five to ten times gravity, and the reason a high-speed press frame, a sewing-machine head and a packaging turret are sized by those numbers rather than by the torque on the shaft is that **the inertia forces the accelerations produce never leave the machine — they circulate through the bearings, the bolts and the foundation, and they are the whole of the vibration.**

The mathematics is one more differentiation and the same matrix. The physics is three terms that each have a name, a direction and a way of being forgotten: **the centripetal term, the tangential term and the Coriolis term.** Two of them belong to a rigid body and one belongs to a choice of reference frame, and the reason the third is the one that breaks machines is that it appears only where a link slides on another rotating link, which is exactly where a designer is least likely to look.

::: warning Four acceleration errors that survive a velocity check
**Dropping the centripetal term.** A link of length $r$ rotating at $\omega$ accelerates its far end at $r \omega^2$ **towards** the pivot even when $\dot{\omega} = 0$, and the reason that term dominates every high-speed mechanism is that it goes as $\omega^2$ while the tangential term goes as $\dot{\omega}$. **The number that makes this the most common error in the subject is that at $3{,}000$ revolutions per minute a $100$ millimetre crank pin accelerates at $987\ \mathrm{m / s^2}$ — a hundred times gravity — while a crank accelerating from zero to full speed in half a second has a tangential acceleration of only $6.3\ \mathrm{m / s^2}$.** The centripetal term is one hundred and fifty-seven times larger, and the reason a designer who omits it gets the direction of the total acceleration wrong by forty degrees is that the two terms are perpendicular.
**Omitting Coriolis at a sliding pair on a rotating link.** The term $2 \vec{\omega} \times \vec{v}_{\mathrm{rel}}$ exists only when a point slides along a body that is itself rotating, and the reason it is missed is that it is zero in every example in the first dynamics course. **The number that makes it decisive is that on a telescoping arm extending at $0.4\ \mathrm{m / s}$ while rotating at $4\ \mathrm{rad / s}$, the Coriolis acceleration is $3.2\ \mathrm{m / s^2}$ against a transverse acceleration of $2.8\ \mathrm{m / s^2}$ — it is the larger of the two.** **The reason a quick-return mechanism's lever is designed on a torque fifty per cent above the one a naive analysis gives is that Coriolis acts along the lever's axis at one instant and across it at another, and the second is the bearing load.**
**Confusing the instant centre of velocity with the instant centre of acceleration.** A link has one instant centre of velocity and, in general, a **different** one for acceleration, and the reason the second exists is that a rigid body in plane motion has exactly one point of zero acceleration at each instant, and it is not the point of zero velocity unless the angular velocity is zero. **The number that makes the distinction a design matter rather than a curiosity is that the coupler of a four-bar has a point of zero acceleration — Langer's point — whose existence is what makes coupler-point mechanisms possible at all**, and the reason a stitching head that must not accelerate its tool is built about that point is that no amount of balancing achieves what geometry gives for free.
**Adding accelerations that are not in the same frame.** The relative-acceleration equation is a vector sum of terms defined in one inertial frame, and the reason a construction that adds a centripetal term computed about one centre to a tangential term computed about another is wrong is not subtle — it is dimensionally fine and numerically plausible and incorrect. **The number that makes the error detectable is that the acceleration of a point on a rotating link about its own pivot must satisfy $a_B = a_A + \vec{\alpha} \times \vec{r} - \omega^2 \vec{r}$ with the $\omega^2$ term pointing from $B$ to $A$ and never from $A$ to $B$.** **The reason a solution whose centripetal term points outward is wrong by twice its magnitude rather than by nothing is that the sign is the whole of the direction.**
:::

## One more differentiation, the same matrix

::: definition The acceleration loop {#def-accel-loop}
**Differentiate the velocity loop once more.** With $\alpha_k = d \omega_k / dt$, the four-bar gives

$$
\boxed{ - a \omega_2^2 e^{i \theta_2} + a \alpha_2 i e^{i \theta_2} - b \omega_3^2 e^{i \theta_3} + b \alpha_3 i e^{i \theta_3} = - c \omega_4^2 e^{i \theta_4} + c \alpha_4 i e^{i \theta_4} }
$$

**in which everything on the left of the $\alpha$ terms is known from the position and velocity analyses.** Written as a linear system with the **same coefficient matrix as the velocity analysis**, and therefore the **same determinant** $- b c \sin \mu$:

$$
\begin{pmatrix} - b \sin \theta_3 & c \sin \theta_4 \\ b \cos \theta_3 & - c \cos \theta_4 \end{pmatrix}
\begin{pmatrix} \alpha_3 \\ \alpha_4 \end{pmatrix} =
\begin{pmatrix} A_x \\ A_y \end{pmatrix}, \qquad
\begin{pmatrix} A_x \\ A_y \end{pmatrix} =
\begin{pmatrix} a \omega_2^2 \sin \theta_2 + b \omega_3^2 \sin \theta_3 - c \omega_4^2 \sin \theta_4 \\ - a \omega_2^2 \cos \theta_2 - b \omega_3^2 \cos \theta_3 + c \omega_4^2 \cos \theta_4 \end{pmatrix}
$$

**and the reading is that a mechanism which is singular in velocity is singular in acceleration too, and its angular accelerations do not merely grow, they blow up as $1 / \sin \mu$ while the angular velocities stay finite.** **The number that makes that a machine-shop fact is that a four-bar at $\mu = 20^\circ$ has angular accelerations $2.9$ times their nominal values and a toggle at $\mu = 2^\circ$ has them twenty-nine times — and the reason a linkage that jams at a toggle does not jam from the load but from the inertia of its own coupler is that the coupler's angular acceleration is what the load is measured against.**
:::

::: definition Rigid-body plane motion {#def-rigid-accel}
**Two points on one rigid body:**

$$
\boxed{ \vec{a}_B = \vec{a}_A + \underbrace{\vec{\alpha} \times \vec{r}_{B / A}}_{\text{tangential},\; \perp \vec{r}} - \underbrace{\omega^2 \vec{r}_{B / A}}_{\text{normal, from } B \text{ to } A} }
$$

**and the two components are perpendicular by construction, which is what makes the acceleration polygon work.**

$$
\begin{array}{l l l l}
\text{Term} & \text{Magnitude} & \text{Direction} & \text{Vanishes when} \\
\text{Normal} & \omega^2 r & B \text{ to } A & \omega = 0 \\
\text{Tangential} & \alpha r & \perp \vec{r} & \alpha = 0 \\
\text{Coriolis} & 2 \omega v_{\mathrm{rel}} & \perp \text{ sliding direction} & \omega = 0 \text{ or } v_{\mathrm{rel}} = 0 \\
\text{Translational} & a_A & \text{as given} & A \text{ is fixed}
\end{array}
$$

**The Coriolis term appears when the reference frame attached to a link is used**, and its direction is obtained by rotating the sliding velocity through $90^\circ$ in the sense of $\omega$:

$$
\boxed{ \vec{a}_B = \vec{a}_A + \vec{\alpha} \times \vec{r} - \omega^2 \vec{r} + \underbrace{2 \vec{\omega} \times \vec{v}_{\mathrm{rel}}}_{\mathrm{Coriolis}} + \vec{a}_{\mathrm{rel}} }
$$

**The number that makes the Coriolis term worth a paragraph is that it is the only term in the whole of mechanism dynamics that is proportional to a product of two things the designer sets independently** — the link's speed and the slider's speed — **and the reason it therefore dominates at high output rates is that every other term is quadratic in one of them.**
:::

::: example Four-bar accelerations {#ex-acc4}
The four-bar $a = 0.5$, $b = 1.2$, $c = 0.9$, $d = 1.1$ metres at $\theta_2 = 40^\circ$, $\omega_2 = 10\ \mathrm{rad / s}$ constant. From the position and velocity solutions: $\theta_3 = 24.44^\circ$, $\theta_4 = 65.34^\circ$, $\omega_3 = - 2.724\ \mathrm{rad / s}$, $\omega_4 = 2.276\ \mathrm{rad / s}$. Find $\alpha_3$, $\alpha_4$ and the accelerations of $A$, $B$ and the coupler's centre of mass.
::: solution
**The known centripetal magnitudes:**
$$
a \omega_2^2 = 0.5 \times 100 = 50.0, \qquad
b \omega_3^2 = 1.2 \times 7.420 = 8.904, \qquad
c \omega_4^2 = 0.9 \times 5.180 = 4.662\ \mathrm{m / s^2}
$$
**The two scalar equations, taken from the real and imaginary parts of the loop equation with $\alpha_2 = 0$:**
$$
- b \alpha_3 \sin \theta_3 + c \alpha_4 \sin \theta_4 = a \omega_2^2 \cos \theta_2 + b \omega_3^2 \cos \theta_3 - c \omega_4^2 \cos \theta_4 = 38.30 + 8.11 - 1.94 = 44.47
$$
$$
b \alpha_3 \cos \theta_3 - c \alpha_4 \cos \theta_4 = a \omega_2^2 \sin \theta_2 + b \omega_3^2 \sin \theta_3 - c \omega_4^2 \sin \theta_4 = 32.14 + 3.69 - 4.24 = 31.59
$$
**with $b \sin \theta_3 = 0.4967$, $c \sin \theta_4 = 0.8180$, $b \cos \theta_3 = 1.0925$, $c \cos \theta_4 = 0.3747$.** **From the first,** $\alpha_4 = \left( 44.47 + 0.4967 \alpha_3 \right) / 0.8180 = 54.36 + 0.6072 \alpha_3$. **Substituting into the second:**
$$
1.0925 \alpha_3 - 0.3747 \left( 54.36 + 0.6072 \alpha_3 \right) = 31.59
\qquad \Rightarrow \qquad 0.8649 \alpha_3 = 51.96
$$
$$
\boxed{ \alpha_3 = 60.1\ \mathrm{rad / s^2} \ \text{counter-clockwise}, \qquad \alpha_4 = 54.36 + 36.49 = 90.9\ \mathrm{rad / s^2}\ \text{counter-clockwise} }
$$
**The check by finite difference of the position solution, differentiated twice numerically through the exact loop closure, gives $60.15$ and $90.87$** — and the reason that check is worth doing once per mechanism is that it catches a sign error in $\vec{\omega}$ or a transposition of the two scalar equations, which are the two errors that survive every other check.
**The acceleration of $A$** (crank at constant speed, so no tangential term):
$$
\vec{a}_A = - a \omega_2^2 \left( \cos \theta_2 , \sin \theta_2 \right) = - 50.0 \left( 0.7660,\; 0.6428 \right) = \left( - 38.30,\; - 32.14 \right)
\qquad \left| \vec{a}_A \right| = 50.0\ \mathrm{m / s^2} = 5.1\ g
$$
**The acceleration of $B$, from the coupler:**
$$
\vec{r}_{B / A} = 1.2 \left( 0.9104,\; 0.4139 \right) = \left( 1.0925,\; 0.4967 \right)
$$
$$
\vec{\alpha}_3 \times \vec{r}_{B / A} = 60.1 \left( - 0.4967,\; 1.0925 \right) = \left( - 29.85,\; 65.66 \right), \qquad
- \omega_3^2 \vec{r}_{B / A} = - 7.420 \left( 1.0925,\; 0.4967 \right) = \left( - 8.11,\; - 3.69 \right)
$$
$$
\vec{a}_B = \left( - 38.30 - 29.85 - 8.11,\; - 32.14 + 65.66 - 3.69 \right) = \left( - 76.26,\; 29.83 \right)
$$
**The check from the rocker,** which must give the same vector because $O_4$ is fixed:
$$
\vec{a}_B = c \alpha_4 \left( - \sin \theta_4, \cos \theta_4 \right) - c \omega_4^2 \left( \cos \theta_4, \sin \theta_4 \right)
= 81.8 \left( - 0.9087, 0.4174 \right) - 4.662 \left( 0.4174, 0.9087 \right)
$$
$$
= \left( - 74.33 - 1.95,\; 34.14 - 4.24 \right) = \left( - 76.28,\; 29.90 \right) \quad \checkmark
$$
$$
\boxed{ \left| \vec{a}_B \right| = \mathbf{81.9\ \mathrm{m / s^2} = 8.4\ g} }
$$
**The reading is that the two routes agree to one part in a hundred and that the agreement is the only check which is sensitive to a transposition of the two scalar equations or a reversal of either angular acceleration** — and the reason a solution that fails it is wrong by $150\ \mathrm{m / s^2}$ rather than by a subtle few per cent is that a sign error in a perpendicular pair of components reverses a vector rather than tilting it.

**The coupler's centre of mass,** at the mid-point of $AB$:
$$
\vec{r}_{G / A} = \left( 0.5463,\; 0.2484 \right), \qquad
\vec{a}_G = \left( - 38.30, - 32.14 \right) + 60.1 \left( - 0.2484, 0.5463 \right) - 7.420 \left( 0.5463, 0.2484 \right)
$$
$$
= \left( - 38.30 - 14.93 - 4.05,\; - 32.14 + 32.83 - 1.84 \right) = \left( - 57.28,\; - 1.15 \right)
\qquad \left| \vec{a}_G \right| = \mathbf{57.3\ \mathrm{m / s^2} = 5.8\ g}
$$
**The inertia forces** with the coupler at $6\ \mathrm{kg}$, the crank at $3\ \mathrm{kg}$ and the rocker at $4\ \mathrm{kg}$, the last two with centres of mass at mid-length:
$$
F_{\mathrm{crank}} = 3 \times 50.0 = 150\ \mathrm{N}, \qquad
F_{\mathrm{coupler}} = 6 \times 57.3 = 344\ \mathrm{N}, \qquad
F_{\mathrm{rocker}} = 4 \times 41.0 = 164\ \mathrm{N}
$$
**The shaking force** — the vector sum, which is what the foundation feels:
$$
\vec{F} = 3 \left( - 38.30, - 32.14 \right) + 6 \left( - 57.28, - 1.15 \right) + 4 \left( - 38.14, 14.92 \right) = \left( - 611, - 44 \right)\ \mathrm{N}
\qquad \left| \vec{F} \right| = \mathbf{613\ \mathrm{N}}
$$
**against a total weight of $128\ \mathrm{N}$.** **The mechanism shakes its frame with a force four and three-quarter times its own weight at an input speed of ninety-six revolutions per second, and the reason the machine's bolts are the fatigue item rather than its links is exactly that ratio.**
*Sanity.* The reason $\left| \vec{a}_G \right|$ is dominated by its $x$-component is that at this instant the coupler's centripetal and tangential accelerations very nearly cancel in $y$ and add in $x$, and the reason a coupler's acceleration is not smooth even when the input speed is exactly constant is that the two terms are perpendicular and rotate with the link.
:::
:::

::: widget plot
f: 986.96*(cos(x*pi/180)+0.25*cos(x*pi/90))
x: 0, 360
y: -360, 1320
caption: The piston acceleration of the $100$–$400$ millimetre slider–crank at $300$ revolutions per minute, in metres per second squared. **The curve is not a cosine: the second-harmonic term $0.25 \cos 2\theta$ makes the top-dead-centre peak $1234$ and the bottom-dead-centre peak $-247$, a factor of five.** **The peak of $1234$ metres per second squared is one hundred and twenty-six times gravity**, and the reason the curve's asymmetry is the reason a connecting rod is fat at the big end and thin in the middle is that the maximum compression occurs at top dead centre while the maximum tension, at $-247$, is only a fifth as large — **a rod sized for the peak would be five times heavier than necessary at the other end of the stroke.**
:::

## The polygon, the pole and the point that does not accelerate

::: definition Acceleration images {#def-images}
**The acceleration polygon is the vector equation drawn to scale**, exactly as the velocity polygon was, with each relative acceleration split into its known-direction tangential part and its known-magnitude normal part.

$$
\begin{array}{l l l}
\text{Vector} & \text{Known} & \text{Unknown} \\
\vec{a}_A & \text{magnitude and direction} & \text{none, if the input speed is constant} \\
\vec{a}_{B / A} & \text{the normal part } \omega_3^2 b \text{ (magnitude and direction)} & \text{the tangential part, direction known} \\
\vec{a}_B & \text{direction only, } \perp O_4 B \text{ plus the known normal part} & \text{magnitude}
\end{array}
$$

**The construction:** from the pole $o$ lay off $\vec{a}_A$; from its tip lay off $\vec{a}_{B / A}^n$ pointing **from $B$ to $A$**; from the end of that draw a line perpendicular to $AB$ (the tangential direction); from $o$ lay off $\vec{a}_B^n = c \omega_4^2$ from $B$ to $O_4$ and from its end draw a line perpendicular to $O_4 B$. **The intersection gives $\vec{a}_B$, and the two tangential lengths divided by their link lengths give $\alpha_3$ and $\alpha_4$.**

**The acceleration image.** Just as the velocity polygon contains a copy of the coupler turned through $90^\circ$, **the acceleration polygon contains a copy of the coupler turned through an angle $\gamma$ given by**

$$
\tan \gamma = \frac{\alpha_3}{\omega_3^2}
$$

**and the reason this is not a curiosity is that it gives the acceleration of any coupler point from two measurements on a drawing** — and that the angle $\gamma$ is **the same for every point on the link**, which is the geometric statement that a rigid body's acceleration field is a single complex number.

$$
\text{For the four-bar above: } \tan \gamma = \frac{60.1}{7.42} = 8.10 \qquad \Rightarrow \qquad \gamma = 83.0^\circ
$$

**The instant centre of acceleration.** A rigid body in plane motion has **one point whose acceleration is zero** at each instant, found by laying off from the known-acceleration point a vector at the angle $\gamma$ with magnitude $a / \sqrt{\alpha^2 + \omega^4}$. **For the coupler above, taking $A$:**

$$
\overline{A P_0} = \frac{\left| \vec{a}_A \right|}{\sqrt{\alpha_3^2 + \omega_3^4}} = \frac{50.0}{\sqrt{3{,}612 + 55.1}} = \frac{50.0}{60.55} = 0.826\ \mathrm{m}
$$

**at $83.0^\circ$ from the direction of $\vec{a}_A$.** **The number that makes this a design tool is that $0.826\ \mathrm{m}$ is longer than the coupler itself, so the zero-acceleration point lies outside the physical link — and the reason a coupler point can nevertheless be placed at it is that the coupler is a triangular plate and its plane extends as far as the designer likes.** **A tool carried at that point accelerates not at all at this instant, which is the principle of the coupler-point stitching head and of the exact-mechanism family of [[mechanisms/linkage-synthesis]].**
:::

::: example Coriolis on a rotating arm {#ex-coriolis}
A telescoping arm extends as $R = 0.30 + 0.40\, t$ metres while rotating as $\theta = 2.0\, t^2$ radians. Find the acceleration of the end effector at $t = 1.0\ \mathrm{s}$, and the fraction of the transverse acceleration contributed by Coriolis.
::: solution
**The kinematics at $t = 1.0\ \mathrm{s}$:**
$$
R = 0.70\ \mathrm{m}, \quad \dot{R} = 0.40\ \mathrm{m / s}, \quad \ddot{R} = 0; \qquad
\theta = 2.0\ \mathrm{rad}, \quad \omega = \dot{\theta} = 4.0\ \mathrm{rad / s}, \quad \alpha = 4.0\ \mathrm{rad / s^2}
$$
**The radial component:**
$$
a_R = \ddot{R} - R \omega^2 = 0 - 0.70 \times 16.0 = \mathbf{- 11.20\ \mathrm{m / s^2}}
$$
**The transverse component, split into its two parts:**
$$
a_\theta = R \alpha + 2 \omega \dot{R} = 0.70 \times 4.0 + 2 \times 4.0 \times 0.40 = 2.80 + 3.20 = \mathbf{6.00\ \mathrm{m / s^2}}
$$
$$
\boxed{ \vec{a} = \left( - 11.20,\; 6.00 \right)\ \mathrm{m / s^2}, \qquad \left| \vec{a} \right| = 12.7\ \mathrm{m / s^2} = 1.3\ g }
$$
**The Coriolis fraction:**
$$
\frac{2 \omega \dot{R}}{R \alpha + 2 \omega \dot{R}} = \frac{3.20}{6.00} = \mathbf{53\ \%}
$$
**The reading.** **More than half the transverse acceleration — and therefore more than half the torque the slewing drive must supply — comes from a term that exists only because the arm is extending.** **The number that makes that a control problem and not only a sizing problem is that the Coriolis term reverses sign when the arm retracts, so the drive sees $+ 3.20$ on extension and $- 3.20$ on retraction with everything else unchanged** — and the reason a telescopic handler's boom slew feels a kick at the moment the operator reverses the extension is that the torque demand steps by $6.4\ \mathrm{m / s^2}$ times the payload mass, instantaneously, at the reversal.
**The torque** for a $120\ \mathrm{kg}$ payload plus a $60\ \mathrm{kg}$ uniform boom:
$$
T = \left( 120 \times 0.70 + 60 \times 0.35 \right) \times 6.00 + \left( 120 \times 0.70^2 + 60 \times 0.35^2 \right) \times 4.0
= 105.0 \times 6.00 + 66.15 \times 4.0 = 630 + 265 = \mathbf{895\ \mathrm{N \cdot m}}
$$
**of which the Coriolis part alone is $120 \times 0.70 \times 3.20 + 60 \times 0.35 \times 3.20 = 269 + 67 = 336\ \mathrm{N \cdot m}$ — thirty-eight per cent of the total.**
*Sanity.* The reason $a_R$ is negative — inward — although the arm is extending is that the centripetal term $R \omega^2 = 11.2\ \mathrm{m / s^2}$ exactly exceeds the outward $\ddot{R} = 0$, and the reason the end effector's path is nevertheless lengthening is that velocity and acceleration are independent; the reason a payload on a frictionless extension rail slides inward on its own at this speed is that nothing supplies the $11.2\ \mathrm{m / s^2}$.
:::
:::

::: widget plot
f: 2*(4*x)*(0.4)
x: 0.2, 1.2
y: 0, 4
caption: The Coriolis acceleration $2 \omega \dot R$ of a telescoping arm extending at $0.4$ metres per second while rotating at $4x$ radians per second, against the extension $x$ in metres. **The curve is flat, and that is the point: the Coriolis term does not care how far out the arm is, only how fast it is going and how fast it is turning.** **At the fully retracted $0.2$ metres it is still $1.6$ metres per second squared, which is more than half the transverse acceleration there**, and the reason a telescopic handler is hardest to control with the boom out is not the Coriolis term but the $R\alpha$ term, which grows linearly and overtakes it at $R = 2\omega\dot R/\alpha = 0.8$ metres.
:::

## What the accelerations cost: inertia forces, shaking force, balancing

::: definition Inertia loading and equivalent inertia {#def-inertia}
**Each link is a rigid body whose motion is known, so its inertia load is known:**

$$
\vec{F}_i = - m_i \vec{a}_{G_i}, \qquad T_i = - I_{G_i} \alpha_i
$$

**and the two together are a single force applied at a single point — the centre of percussion — at a distance**

$$
\overline{G Q} = \frac{I_G}{m \overline{G P}} \qquad \left( \text{from } G, \text{ on the far side from the acceleration centre } P \right)
$$

**The shaking force** is the vector sum of all the inertia forces, and **the shaking moment** is their moment sum about any point:

$$
\vec{F}_{\mathrm{shake}} = - \sum_i m_i \vec{a}_{G_i} = - M_{\mathrm{tot}} \vec{a}_{G,\mathrm{tot}}, \qquad
T_{\mathrm{shake}} = - \sum_i \left( \vec{r}_{G_i} \times m_i \vec{a}_{G_i} + I_{G_i} \alpha_i \right)
$$

**The middle expression is the whole of balancing theory in one line:** **the shaking force is the total mass times the acceleration of the mechanism's overall centre of mass, and it is therefore zero for all time if and only if the overall centre of mass does not move.** **The number that makes that achievable for the shaking force and essentially impossible for the shaking moment is that a single counterweight can hold the centre of mass still, but holding the centre of mass still and holding the shaking moment still at the same time requires the mechanism's mass distribution to satisfy two independent conditions, and the reason a four-bar can satisfy both only in one prescribed position is Chebyshev's theorem on the number of precision points a linkage can have.**

**The equivalent inertia referred to the input** is what a motor sees:

$$
\boxed{ I_{\mathrm{eq}} \left( \theta \right) = \sum_i m_i \left( \frac{v_{G_i}}{\omega_{\mathrm{in}}} \right)^2 + \sum_i I_{G_i} \left( \frac{\omega_i}{\omega_{\mathrm{in}}} \right)^2 } , \qquad
T_{\mathrm{in}} = I_{\mathrm{eq}} \, \alpha_{\mathrm{in}} + \frac{1}{2} \frac{d I_{\mathrm{eq}}}{d \theta} \, \omega_{\mathrm{in}}^2
$$

**and the second term, which is present even at perfectly constant input speed, is the reason a mechanism's drive torque is not proportional to its output torque.** **The number that makes it a sizing item is that for the four-bar above, $I_{\mathrm{eq}}$ varies from $0.62$ to $1.31\ \mathrm{kg \cdot m^2}$ over one revolution, so $\tfrac{1}{2} d I_{\mathrm{eq}} / d \theta \times \omega^2$ reaches $19\ \mathrm{N \cdot m}$ at $\omega_2 = 10\ \mathrm{rad / s}$ with the crank running at exactly constant speed** — and the reason a designer who sizes a servo on the steady-state torque sees it alarm on the following-error fault is that the alarm is set against the profiled torque, and the profile did not contain this term.
:::

::: example Slider–crank shaking force and its balance {#ex-shake}
A compressor slider–crank has $r = 60\ \mathrm{mm}$, $l = 240\ \mathrm{mm}$, $3{,}000\ \mathrm{rev / min}$, a reciprocating mass of $2.0\ \mathrm{kg}$ and a crankpin mass of $1.5\ \mathrm{kg}$. Find the shaking force at three instants and design the counterweight.
::: solution
**The ingredients:** $\omega = 314.16\ \mathrm{rad / s}$, $r \omega^2 = 0.060 \times 98{,}696 = 5{,}922\ \mathrm{m / s^2}$, $\lambda = 0.25$.
**The piston acceleration** $a = r \omega^2 \left( \cos \theta + \lambda \cos 2 \theta \right)$:
$$
\theta = 0: \; a = 5922 \times 1.25 = 7{,}403; \qquad
\theta = 90^\circ: \; a = 5922 \times \left( 0 - 0.25 \right) = - 1{,}480; \qquad
\theta = 180^\circ: \; a = 5922 \times \left( - 1 + 0.25 \right) = - 4{,}442\ \mathrm{m / s^2}
$$
**The inertia force of the reciprocating mass** $F_S = - m_S a$:
$$
F_S = - 14{,}806, \qquad + 2{,}961, \qquad + 8{,}884\ \mathrm{N}
$$
**The crankpin's centripetal force** $F_A = m_A r \omega^2 = 1.5 \times 5922 = 8{,}883\ \mathrm{N}$, directed from $A$ to $O$, so its components are $F_A \left( - \cos \theta, - \sin \theta \right)$:
$$
\theta = 0: \; \left( - 8{,}883, 0 \right); \qquad \theta = 90^\circ: \; \left( 0, - 8{,}883 \right); \qquad \theta = 180^\circ: \; \left( 8{,}883, 0 \right)
$$
**The total shaking force:**
$$
\begin{array}{c c c c}
\theta & F_x \left( \mathrm{N} \right) & F_y \left( \mathrm{N} \right) & \left| F \right| \left( \mathrm{N} \right) \\
0^\circ & - 14{,}806 - 8{,}883 = - 23{,}689 & 0 & \mathbf{23{,}689} \\
90^\circ & 2{,}961 & - 8{,}883 & \mathbf{9{,}366} \\
180^\circ & 8{,}884 + 8{,}883 = 17{,}767 & 0 & \mathbf{17{,}767}
\end{array}
$$
**The reading.** **The force is never zero, its peak is $23.7\ \mathrm{kN}$ against a total moving weight of $34\ \mathrm{N}$, and it rotates around the frame once per revolution.** **The number that makes a compressor frame a casting rather than a fabrication is that ratio of seven hundred to one.**
**The balance.** A counterweight $m_c$ opposite the crankpin cancels the crankpin's centripetal force exactly if $m_c R_c = m_A r = 1.5 \times 0.060 = 0.090\ \mathrm{kg \cdot m}$. **It can also cancel part of the reciprocating force**, but only its first-harmonic part, and the standard choice is to balance an additional fraction $c$ of the reciprocating mass:
$$
m_c R_c = \left( m_A + c \, m_S \right) r
$$
**The residual force is then**
$$
F_x = - m_S r \omega^2 \left[ \left( 1 - c \right) \cos \theta + \lambda \cos 2 \theta \right], \qquad
F_y = - c \, m_S r \omega^2 \sin \theta, \qquad m_S r \omega^2 = 11{,}844\ \mathrm{N}
$$
**and the trade-off, which is the whole of the design decision, is that $c$ moves the force from the horizontal line into the vertical direction:**
$$
\begin{array}{c c c c}
c & m_c R_c \left( \mathrm{kg \cdot m} \right) & F_{\max} \left( \mathrm{kN} \right) & \text{where the peak occurs} \\
0 & 0.090 & 14.8 & \theta = 0, \text{ the full first harmonic along the bore} \\
0.3 & 0.126 & 11.3 & \theta = 0 \\
0.60 & 0.162 & \mathbf{7.7} & \theta = 0 \text{ and } 90^\circ \text{ together} \\
1.0 & 0.210 & 12.2 & \theta = 90^\circ, \text{ the second harmonic and the introduced vertical}
\end{array}
$$
**The reason $c = 1$ is not optimal is that full reciprocating balance leaves the second-harmonic force $m_S r \omega^2 \lambda \cos 2 \theta = 2{,}961\ \mathrm{N}$ unbalanced and adds a vertical force of $c \, m_S r \omega^2 \sin \theta = 11{,}844 \sin \theta$ that the machine did not have before.** **The number that makes $c \approx 0.60$ the standard answer is that it is where the two candidate peaks are equal — $\left( 1 - c \right) + \lambda$ against $\sqrt{ \lambda^2 + c^2 }$ — and the reason a designer who needs a smoother machine than $7.7\ \mathrm{kN}$ uses two balance shafts is that two counter-rotating weights cancel the first harmonic completely and leave only the second, at a cost of two shafts, four bearings and a gear.**
**The residual at the optimum:**
$$
F_{\max} = 7.7\ \mathrm{kN}, \qquad \text{a reduction of } 48\ \% \text{ from the } 14.8\ \mathrm{kN} \text{ of the fully rotating-balanced machine}
$$
**and $68\ \%$ from the $23.7\ \mathrm{kN}$ of the machine with no counterweight at all.** **The reason the counterweight is placed at the largest radius the crankweb allows is that $m_c R_c$ is fixed and the weight's own contribution to the bearing load goes as $m_c$, so doubling $R_c$ halves $m_c$ and halves the load on the main bearing.**
*Sanity.* The reason the shaking force at $90^\circ$ is smaller than at $0^\circ$ although the crankpin force is unchanged is that the reciprocating and rotating components are perpendicular there and add in quadrature, and the reason a frame designed on the $0^\circ$ case alone is over-strong in one direction and under-strong at forty degrees is that the force's direction, not only its magnitude, rotates.
:::
:::

::: widget plot
f: 11.844*sqrt(pow(1.75*cos(x*pi/180)+0.25*cos(x*pi/90),2)+pow(0.75*sin(x*pi/180),2))
x: 0, 360
y: 8, 26
caption: The magnitude of the shaking force of the compressor slider–crank with no counterweight at all, in kilonewtons, against crank angle. **The curve has a sharp maximum of $23.7$ kilonewtons at top dead centre and a broad, low region near ninety degrees, and its minimum is not zero at any angle.** **The peak is $23.7$ and the trough $9.4$, a ratio of $2.5$,** and the reason the curve is asymmetric about ninety degrees — unlike the piston acceleration curve that produced it — is that the crankpin's centripetal force adds in quadrature rather than in line, which rotates the resultant and smooths its trough.
:::

## Sliding pairs, cams and the jerk that follows

::: definition Jerk and its consequences {#def-jerk}
**One more differentiation gives the jerk**, and in a mechanism the jerk is discontinuous wherever the motion law is, which is to say **twice per cycle for every cam and every Geneva**.

$$
j = \frac{d a}{d t}, \qquad
\Delta F = m \, j \, \Delta t, \qquad
\text{contact force} \propto m a + F_{\mathrm{spring}}
$$

$$
\begin{array}{l c c c l}
\text{Cam law} & k_v & k_a & k_j & \text{use} \\
\text{Uniform} & 1.000 & 0 & \infty \text{ at 2 points} & \text{never, except in a discussion} \\
\text{Parabolic} & 2.000 & 4.000 & \infty \text{ at 3 points} & \text{low speed only} \\
\text{Harmonic} & 1.571 & 4.935 & \infty \text{ at 2 points} & \text{rise of a moderate cam} \\
\text{Cycloidal} & 2.000 & 6.283 & 39.5 & \text{reversals, no dwell error} \\
\text{3-4-5 polynomial} & 1.500 & 6.000 & 12.0 \text{ (} \infty \text{ at ends)} & \text{the general-purpose compromise} \\
\text{4-5-6-7 polynomial} & 2.188 & 7.513 & 52.5 & \text{high-speed cams, dwell-to-dwell} \\
\text{5-6-7-8-9 polynomial} & 2.461 & 9.372 & 78.8 & \text{where jerk, not acceleration, rules} \\
\text{Modified sine} & 1.761 & 5.189 & 33.5 & \text{a good compromise, eight segments}
\end{array}
$$

**The number that decides between them is not the peak acceleration but which derivative first goes discontinuous.** The 4-5-6-7 polynomial buys a jerk that is finite everywhere — $k_j = 52.5$, against the cycloidal's $39.5$ and the 3-4-5's infinite steps at the ends — at the cost of a peak acceleration $20\ \%$ above the cycloidal and a peak velocity $9\ \%$ above it. **That trade is right when the follower is spring-closed and lightly loaded, because then the acceleration is what floats it and the jerk is what rings it; and it is wrong when the follower is heavy and the cam is slow, because then a $20\ \%$ acceleration penalty costs more spring force than a jerk step costs fatigue.** The reason a cam running at three thousand revolutions per minute is cut on the polynomial and a cam running at three hundred is cut on the cycloidal is that the infinite jerk of the latter produces a force step of $m \Delta a$ across one control period of the machine's own dynamics, and at three thousand revolutions that step is $167$ times per second.

**The contact force.** A cam's follower is held by a spring, and the force the cam must transmit is
$$
F = m a + F_s + k \left( s + s_0 \right) + \mu \left( \text{side thrust terms} \right)
$$
**and the reason a cam can float — lose contact — at high speed is that $m a$ goes as $\omega^2$ while the spring force goes as neither**, so there is a speed above which the follower leaves the profile at the point of maximum negative acceleration. **The number that defines the limit is the cam's own dimensionless parameter $\bar{a} = m a_{\max} / \left( k s_0 \right)$: above about $0.6$ the cam will float, and the reason the parameter is independent of speed is that both $m a_{\max}$ and the spring force scale with the geometry, not the rate.**
:::

::: example Cam float {#ex-float}
A radial cam drives a $1.4\ \mathrm{kg}$ follower through a cycloidal rise of $18\ \mathrm{mm}$ over $70^\circ$ at a spring preload of $120\ \mathrm{N}$ and a stiffness of $9\ \mathrm{N / mm}$. Find the speed at which the follower loses contact.
::: solution
**The peak acceleration** (cycloidal, $k_a = 6.28$):
$$
a_{\max} = k_a \frac{h}{\beta^2} \omega^2 = 6.28 \times \frac{0.018}{1.219^2} \omega^2 = 0.0760\, \omega^2\ \mathrm{m / s^2}
$$
**The acceleration is negative — the follower wants to decelerate faster than the spring can pull it — at the end of the rise, where the spring force is smallest relative to the demand:**
$$
F_{\mathrm{spring}} = 120 + 9 \times 18 = 282\ \mathrm{N}
$$
**Loss of contact occurs when the follower's required force exceeds what the spring supplies:**
$$
m a_{\max} = F_{\mathrm{spring}}
\qquad \Rightarrow \qquad
1.4 \times 0.0760 \times \omega^2 = 282
\qquad \Rightarrow \qquad \omega^2 = 2{,}653
$$
$$
\boxed{ \omega_{\mathrm{float}} = 51.5\ \mathrm{rad / s} = 492\ \mathrm{rev / min} }
$$
**The design speed with a safety factor of two on acceleration** — which is the convention, because the acceleration is what floats the follower and a factor of two on acceleration is a factor of $\sqrt{2}$ on speed:
$$
\omega_{\mathrm{design}} = \frac{51.5}{\sqrt{2}} = 36.4\ \mathrm{rad / s} = \mathbf{348\ \mathrm{rev / min}}
$$
**The number that makes the answer a redesign rather than a speed limit is that the machine needs $900\ \mathrm{rev / min}$.** **The three ways out, in the order they should be tried:**
$$
\begin{array}{l l l}
\text{1. Stiffer spring} & k \to 30\ \mathrm{N / mm} & \omega_{\mathrm{float}} \to 840\ \mathrm{rev / min}, \text{ but the contact stress rises and the cam wears} \\
\text{2. Lighter follower} & m \to 0.5\ \mathrm{kg} \text{ by rolling-element design} & \omega_{\mathrm{float}} \to 820\ \mathrm{rev / min}, \text{ at the cost of stiffness} \\
\text{3. Flatter cam law} & \text{modified sine, } k_a = 5.19 \text{ against } 6.28 & \omega_{\mathrm{float}} \to 541\ \mathrm{rev / min}, \text{ a gain of ten per cent} \\
\text{4. Slower cam, more lobes} & \text{two lobes at half the speed} & \omega_{\mathrm{float}} \text{ unchanged, but the machine meets its rate}
\end{array}
$$
**The reading.** **Option 3 is nearly useless and the reason it is always the first one proposed is that it is the cheapest.** **The cam's peak acceleration coefficient is a property of the motion law and can only be moved by about ten per cent — and note that the four-five-six-seven polynomial, so often recommended for high speed, is worse than the cycloidal on this particular criterion, $k_a = 7.51$ against $6.28$; it is chosen for its finite jerk, not its low acceleration.** The float speed goes as $\sqrt{k s_0 / m}$, so mass and spring are the levers that work. **The number that makes option 4 the right answer is that the machine's requirement is a displacement rate, not a lift per event: splitting $18\ \mathrm{mm}$ into two $9\ \mathrm{mm}$ rises on a two-lobe cam halves the lift and, because $a_{\max} \propto h / \beta^2$ while $\beta$ is unchanged in cam angle, halves the acceleration and doubles the float speed to $984\ \mathrm{rev / min}$ — and the reason that clears the requirement with margin is that the follower mass is untouched.**
*Sanity.* The reason $\omega_{\mathrm{float}}$ goes as the square root of the spring force is that the demand is $m a \propto \omega^2$ and the supply is a constant, and the reason a cam's maximum speed is quoted in the literature as a "valve float limit" with a scatter of a factor of two between published values is that the loss of contact is gradual, not sudden: the follower begins to leave the profile at one point of the lift long before it leaves at every point.
:::
:::

::: quiz
A slider moves with relative speed $v_{\mathrm{rel}}$ along a link rotating at $\omega$. The Coriolis acceleration $2 \omega v_{\mathrm{rel}}$ appears in the acceleration equation:

- [ ] For any two points on the same rigid body, whatever the joint between them
- [x] Only when the sliding pair is observed from a frame that is itself rotating; it is perpendicular to the sliding direction, turned $90^{ \circ }$ in the sense of $\omega$, and it reverses sign when the sliding reverses
- [ ] Only when $\omega$ is constant, because a varying $\omega$ is already carried by the tangential term
- [ ] Only in spatial mechanisms, where the extra rotation couples the axes

::: solution
**Only at a sliding pair on a rotating link.** The term comes from differentiating $\boldsymbol{\omega} \times \mathbf{r}$ twice and is $2 \boldsymbol{\omega} \times \mathbf{v}_{\mathrm{rel}}$, so it vanishes when either factor does: a pin joint has $v_{\mathrm{rel}} = 0$, and a slider on a non-rotating guide has $\omega = 0$. **Its practical importance is out of all proportion to its size.** It is why the ram of a shaper, in which a slider block rides on a rotating slotted link, needs a bearing length set by $2 \omega v_{\mathrm{rel}}$ and not by the direct acceleration — the Coriolis component is a sideways load on the slideway, and it reverses twice per revolution, so a short block rocks and the machine's finish degrades at the ends of the stroke where $v_{\mathrm{rel}}$ is largest. It is why a quick-return's slotted-link pin is loaded in fatigue even though the ram's mean acceleration is zero. And it is why the term must be included in the acceleration polygon at all: it is not a correction, and dropping it does not make the answer slightly wrong, it makes the polygon not close.
:::
:::

::: history
**Coriolis presented his term in 1835 in a memoir on the relative motion of systems of bodies, and it was adopted into engineering mechanics within a decade by Rankine, who needed it for the slotted-lever mechanisms then appearing in shaping machines.** **The acceleration polygon is in Willis's *Principles of Mechanism* of 1841 and in Rankine's *Applied Mechanics* of 1858, and the acceleration image — the similar figure in the polygon — is Reuleaux's.** **The instant centre of acceleration and the circle of inflection are due to de la Vallée Poussin and are usually attributed to Bresme, whose 1885 paper gives the circle on which the points of zero normal acceleration lie; Langer's point, the coupler point of zero acceleration, was identified in 1865 and remained a curiosity until the 1950s, when the demand for exact-motion couplings made it a design tool.** **The theory of complete force balancing of linkages — the counterweight conditions and the impossibility of balancing force and moment simultaneously over a whole cycle — is the work of Chelidze and of Dimentberg in the 1950s, and the proof that no four-bar can be fully balanced over more than a finite set of positions is Sherman's of 1960.** **The four-five-six-seven cam law is a numerical convenience of the 1960s; the double-cycloidal and modified-sine laws are earlier, and the tabulated coefficients of this lesson are those of the 1958 Hrovat and Durein catalogue, which is still the source most cam-grinding software uses.**
:::

## Where this leads

The inertia forces computed here become the bearing loads of [[mechanisms/machine-dynamics]] and the torque that sizes the motor; the shaking force and its balance are the subject of [[vibrations]]' isolation chapters and the reason a press foundation is a block of concrete; the equivalent inertia is the plant that [[control-systems]]' servo loops must reject; the contact forces set the bearing life; and the jerk is the reason [[mechanisms/cams]] are cut on polynomials and [[mechanisms/gears]] are ground.

::: summary
- One more differentiation, the same coefficient matrix: the angular accelerations blow up as $1/\sin\mu$ where the angular velocities stay finite.
- $\vec a_B = \vec a_A + \vec\alpha\times\vec r - \omega^2\vec r$; the normal term points from $B$ to $A$ and dominates at speed because it goes as $\omega^2$.
- Coriolis, $2\omega v_{\mathrm{rel}}$, appears only at a sliding pair on a rotating link, can exceed every other transverse term, and reverses sign with the sliding.
- The acceleration polygon contains an image of the coupler turned through $\gamma = \arctan(\alpha/\omega^2)$, the same angle for every point of the link.
- A rigid body has one point of zero acceleration; placing a tool there gives a mechanism that carries it without accelerating it.
- The shaking force is the total mass times the acceleration of the mechanism's overall centre of mass; a counterweight can null it, and nulling the shaking moment as well is generally impossible.
- The drive sees an equivalent inertia that varies through the cycle, and $\tfrac12 (dI_{\mathrm{eq}}/d\theta)\omega^2$ is a real torque at constant speed.
- Cam float is set by $ma_{\max}$ against the spring, goes as $\sqrt{k/m}$, and cannot be cured by changing the motion law.
:::

## Exercises

::: exercise Normal acceleration {level=1 check="987"}
A crank of $100$ millimetres runs at $3{,}000$ revolutions per minute at constant speed. Give the acceleration of the crankpin in metres per second squared.
::: solution
$r\omega^2 = 0.1\times(314.16)^2 = 987$ m/s$^2$, directed inward.
:::
:::

::: exercise Four-bar alpha three {level=1 check="60.1"}
For the four-bar of the worked example, give the coupler's angular acceleration in radians per second squared.
::: solution
$\alpha_3 = 60.1$ rad/s$^2$.
:::
:::

::: exercise Four-bar alpha four {level=1 check="90.9"}
For the same four-bar, give the rocker's angular acceleration in radians per second squared.
::: solution
$\alpha_4 = 90.9$ rad/s$^2$.
:::
:::

::: exercise Coupler centre of mass {level=1 check="57.3"}
For the same four-bar, give the magnitude of the coupler centre of mass's acceleration in metres per second squared.
::: solution
$\left|\vec a_G\right| = \sqrt{57.28^2 + 1.15^2} = 57.3$ m/s$^2$.
:::
:::

::: exercise Piston acceleration {level=1 check="1234"}
For the $100$–$400$ millimetre slider–crank at $300$ revolutions per minute, give the piston acceleration at top dead centre in metres per second squared.
::: solution
$r\omega^2(1+\lambda) = 986.96\times1.25 = 1234$ m/s$^2$.
:::
:::

::: exercise Coriolis {level=1 check="3.2"}
For the telescoping arm of the worked example, give the Coriolis acceleration in metres per second squared at $t=1$ second.
::: solution
$2\omega\dot R = 2\times4.0\times0.40 = 3.2$ m/s$^2$.
:::
:::

::: exercise Image angle {level=1 check="83.0"}
For the four-bar of the worked example, give the angle through which the acceleration image of the coupler is turned, in degrees.
::: solution
$\gamma=\arctan(\alpha_3/\omega_3^2)=\arctan(60.1/7.42)=83.0^\circ$.
:::
:::

::: exercise Cam float {level=1 check="492"}
For the cam of the worked example, give the follower float speed in revolutions per minute.
::: solution
$1.4\times0.0760\times\omega^2 = 282$; $\omega = 51.5$ rad/s $=492$ rev/min.
:::
:::

::: exercise Shaking force {level=2}
For the compressor slider–crank, give the shaking force at ninety degrees and explain why it is smaller than at top dead centre.
::: solution
$$
F_x = - m_S r \omega^2 \lambda = + 2{,}961\ \mathrm{N}, \qquad F_y = - m_A r \omega^2 = - 8{,}883\ \mathrm{N}
\qquad \Rightarrow \qquad \left| F \right| = 9{,}366\ \mathrm{N}
$$
**It is smaller because the two components are perpendicular there and add in quadrature, whereas at top dead centre they are collinear and add directly.** **The number that makes this a design matter is that the force vector's direction rotates through the cycle while its magnitude varies by a factor of $2.5$, so the frame must be sized on the envelope of the force's tip, not on its maximum magnitude** — and the reason a bolt group placed on the $0^\circ$ case alone fails at $35^\circ$ is that the moment arm of the force about the bolt group's centre is greatest where the force is not greatest.
:::
:::

::: exercise Balance fraction {level=2}
For the compressor slider–crank, give the counterweight moment $m_c R_c$ for full reciprocating balance and state what it leaves unbalanced.
::: solution
$$
m_c R_c = \left( m_A + m_S \right) r = 3.5 \times 0.060 = 0.210\ \mathrm{kg \cdot m}
$$
**It leaves the whole of the second-harmonic reciprocating force unbalanced,** $m_S r \omega^2 \lambda \cos 2 \theta = 2.0 \times 5922 \times 0.25 = 2{,}961\ \mathrm{N}$ **peak**, **and it introduces a vertical force of** $\left( m_A + m_S \right) r \omega^2 \sin \theta = 20{,}687 \sin \theta\ \mathrm{N}$ **that the unbalanced machine did not have.** **The reason the peak shaking force falls only from $23.7$ to $11.8\ \mathrm{kN}$ rather than to zero is that the second harmonic and the introduced vertical component together account for the residual**, and the reason a designer who must do better uses two counter-rotating balance shafts is that they cancel the first harmonic without introducing a rotating vector at all.
:::
:::

::: exercise Derivation {level=3}
Differentiate the slider–crank loop twice to obtain the piston acceleration, and show that the two-term expression $a = r \omega^2 \left( \cos \theta + \lambda \cos 2 \theta \right)$ is the first order in $\lambda$ of the exact result. Bound the error at $\lambda = 0.3$.
::: solution
**The loop.** $x = r \cos \theta + l \cos \phi$, $\sin \phi = \lambda \sin \theta$.
**First derivative** (from [[mechanisms/velocity-analysis]]):
$$
v = - r \omega \left[ \sin \theta + \frac{\lambda \sin 2 \theta}{2 \sqrt{1 - \lambda^2 \sin^2 \theta}} \right]
$$
**Second derivative.** Differentiating and collecting to first order in $\lambda$:
$$
a = \frac{d v}{d t} = - r \omega^2 \left[ \cos \theta + \lambda \cos 2 \theta + O \left( \lambda^2 \right) \right]
$$
**The exact second derivative is**
$$
a = - r \omega^2 \left[ \cos \theta + \lambda \cos 2 \theta + \frac{\lambda^2 \sin^2 \theta \cos 2 \theta}{4 \left( 1 - \lambda^2 \sin^2 \theta \right)^{3 / 2}} + \frac{\lambda^3 \sin^3 \theta \cos \theta}{4 \left( 1 - \lambda^2 \sin^2 \theta \right)^{5 / 2}}  \right]
$$
**The third term is the leading error.** **At $\lambda = 0.3$ its maximum occurs near $\theta = 90^\circ$:**
$$
\left| \epsilon \right|_{\max} = \frac{\lambda^2}{4 \left( 1 - \lambda^2 \right)^{3 / 2}} = \frac{0.09}{4 \times 0.8240} = 0.0273
\qquad \Rightarrow \qquad \frac{\epsilon}{r \omega^2} = 2.7\ \%
$$
**against $r \omega^2 \left( 1 + \lambda \right) = 1.3\, r \omega^2$ at top dead centre, so the relative error in the peak acceleration is**
$$
\frac{0.0273}{1.3} = 2.1\ \%
$$
**The number that makes the two-term expression acceptable is that $2.1\ \%$ is less than the tolerance on the reciprocating mass itself, which is rarely known better than three per cent.** **The reason it is not acceptable at $\lambda = 0.5$ is that the error goes as $\lambda^2$ and reaches $9\ \%$, and the reason long-stroke engines are analysed numerically is that their $\lambda$ is $0.35$ to $0.45$.**
*Sanity.* The reason the error term vanishes at top and bottom dead centre is that $\sin \theta = 0$ there, and the reason the two-term expression is nevertheless used for the peak — which is at top dead centre — is that the error is zero exactly where the load is greatest, which is the best possible accident and the reason the formula has survived a century of better arithmetic.
:::
:::

::: exercise Design {level=3}
Design the **linkage and drive of a rotary die-cutting press**: the cutting head must dwell for $40^\circ$ of input shaft rotation at the bottom of its stroke, cut $18\ \mathrm{kN}$ through $2\ \mathrm{mm}$ of a $250\ \mathrm{mm}$ perimeter of $0.3\ \mathrm{mm}$ board at $45$ strokes per minute, the head's mass is $28\ \mathrm{kg}$, the machine frame will tolerate a shaking force of $4\ \mathrm{kN}$, the cut must occur within $\pm 0.1\ \mathrm{mm}$ of the same place every cycle, and the drive must not need a clutch-brake. Give the topology, the motion law, the sizing, the balancing, the failure modes and the acceptance tests.
::: solution
**The duty.** $45$ strokes per minute is a cycle of $1.333\ \mathrm{s}$. **The cut:** a board of shear strength $\tau = 90\ \mathrm{MPa}$, thickness $0.3\ \mathrm{mm}$, perimeter $250\ \mathrm{mm}$:
$$
F_{\mathrm{cut}} = \tau t L = 90 \times 10^6 \times 0.0003 \times 0.250 = 6{,}750\ \mathrm{N}
$$
**The specified $18\ \mathrm{kN}$ is therefore $2.7$ times the theoretical shear load, which is the usual allowance for a dull die and a non-uniform cut; the design load is $18\ \mathrm{kN}$ and the energy is**
$$
E = \tfrac{1}{2} F d = \tfrac{1}{2} \times 18{,}000 \times 0.002 = 18\ \mathrm{J} \text{ per stroke}
$$
**The topology.** The requirement is a dwell at the bottom, which is a **dwell-dwell-rise-dwell** cam duty or a **six-bar with a coupler-point dwell**.
$$
\begin{array}{l l c l}
\text{A. Cam and roller follower} & \text{exact dwell, exact law} & 28\ \mathrm{kg} \text{ follower is too heavy} & \text{rejected: float} \\
\text{B. Slider--crank} & \text{no dwell} & \text{—} & \text{rejected} \\
\text{C. Drag-link six-bar} & \text{dwell by design} & \text{coupler point} & \text{candidate} \\
\text{D. Toggle knuckle} & \text{near-dwell at toggle} & 18\ \mathrm{kN} \text{ from a small actuator} & \text{candidate} \\
\text{E. Servo and planetary roller screw} & \text{arbitrary law} & 28\ \mathrm{kg} \text{ on the nut} & \text{candidate}
\end{array}
$$
**The choice is E, and the reason is the $\pm 0.1\ \mathrm{mm}$ cut-position requirement rather than the dwell.** A drag-link six-bar's dwell is a **stationary point of the coupler path**, and the head must be driven along a straight line by a second linkage; the accumulated angular error of two linkages at the cut is
$$
\delta = \frac{\partial s}{\partial \theta} \delta \theta + \sum \frac{\partial s}{\partial l_i} \delta l_i
$$
**and with $\partial s / \partial \theta = 0$ at the dwell the first term vanishes — which is exactly why drag-links are used — but $\partial s / \partial l_i$ is not, and a $0.05\ \mathrm{mm}$ pin wear in a $250\ \mathrm{mm}$ four-bar moves the cut by $0.05 \times \left( 300 / 120 \right) = 0.125\ \mathrm{mm}$.** **The reason a linkage cannot hold $\pm 0.1\ \mathrm{mm}$ for ten thousand hours is that its accuracy is a function of its joint clearances and its joint clearances are a function of wear.** **A roller-screw servo holds its position by the screw's own rigidity, and the reason it is chosen despite costing four times as much is that its accuracy is a function of the screw's lead accuracy, which does not change.**
**The motion law.** $60\ \mathrm{mm}$ of stroke: rise $30^\circ$ of cam, dwell $40^\circ$ at the top, return $30^\circ$, dwell $260^\circ$ at the bottom — **but the cut happens on the way down, so the law is: rapid advance, controlled cut, rapid retract.** Referred to the $1.333\ \mathrm{s}$ cycle:
$$
\begin{array}{l c c c}
\text{Phase} & \text{Angle} & \text{Time} \left( \mathrm{s} \right) & \text{Motion} \\
\text{Approach} & 90^\circ & 0.333 & 50\ \mathrm{mm} \text{ at a modified sine} \\
\text{Cut} & 30^\circ & 0.111 & 2\ \mathrm{mm} \text{ at constant velocity} \\
\text{Dwell} & 40^\circ & 0.148 & 0 \\
\text{Retract} & 60^\circ & 0.222 & 52\ \mathrm{mm} \text{ at a modified sine} \\
\text{Dwell} & 140^\circ & 0.519 & 0
\end{array}
$$
**The cut velocity:** $v_{\mathrm{cut}} = 0.002 / 0.111 = 0.018\ \mathrm{m / s}$. **The reason a constant cutting velocity is specified rather than a constant acceleration is that the cutting force of a board depends on the rate for a fibrous material, and a varying velocity gives a varying force and a varying burr.**
**The accelerations.** Approach, $50\ \mathrm{mm}$ in $0.333\ \mathrm{s}$ on a modified sine, $k_a = 5.19$:
$$
a_{\max} = 5.19 \times \frac{0.050}{0.333^2} = 2.34\ \mathrm{m / s^2}
\qquad \Rightarrow \qquad F_{\mathrm{inertia}} = 28 \times 2.34 = 66\ \mathrm{N}
$$
**Retract, $52\ \mathrm{mm}$ in $0.222\ \mathrm{s}$:**
$$
a_{\max} = 5.19 \times \frac{0.052}{0.222^2} = 5.48\ \mathrm{m / s^2}
\qquad \Rightarrow \qquad F = 28 \times 5.48 = 153\ \mathrm{N}
$$
**The reading.** **The inertia force is $153\ \mathrm{N}$ against a cutting force of $18{,}000\ \mathrm{N}$ — less than one per cent.** **The number that makes the machine's dynamics trivial is the low stroke rate of $45$ per minute; the reason a $600$-stroke-per-minute press is a completely different machine is that the inertia force goes as the square of the rate and would be $27$ times larger, at $4.2\ \mathrm{kN}$, which is comparable with the shaking-force allowance.**
**The sizing.** Peak force $18{,}000 + 153 + 28 \times 9.81 = 18{,}430\ \mathrm{N}$. **A $32\ \mathrm{mm}$ diameter, $10\ \mathrm{mm}$ lead planetary roller screw at $\eta = 0.90$:**
$$
T_{\mathrm{peak}} = \frac{F p}{2 \pi \eta} = \frac{18{,}430 \times 0.010}{2 \pi \times 0.90} = 32.6\ \mathrm{N \cdot m}
$$
**The RMS torque over the cycle.** The force is present only during the $0.111\ \mathrm{s}$ cut, so
$$
T_{\mathrm{RMS}} = \sqrt{\frac{1}{1.333} \left[ 32.6^2 \times 0.111 + 3^2 \times 0.555 + 0 \times 0.667 \right]} = \sqrt{\frac{118.3 + 5.0}{1.333}} = 9.6\ \mathrm{N \cdot m}
$$
**A $1.5\ \mathrm{kW}$ servo at $3{,}000\ \mathrm{rev / min}$ gives $4.77\ \mathrm{N \cdot m}$ rated and $14.3\ \mathrm{N \cdot m}$ peak.** **The speed at $3{,}000\ \mathrm{rev / min}$ and $10\ \mathrm{mm}$ lead is $3.0\ \mathrm{m / min} = 0.050\ \mathrm{m / s}$, against the retract peak of $2 \times 0.052 / 0.222 = 0.469\ \mathrm{m / s}$ — a factor of nine short.** **The number that forces the design open is the speed, not the torque.** **A $3{:}1$ belt reduction raises the screw to $9{,}000\ \mathrm{rev / min}$, which is above the $d n$ limit of a $32\ \mathrm{mm}$ screw; the answer is a $20\ \mathrm{mm}$ lead screw, at which the torque doubles to $65\ \mathrm{N \cdot m}$ peak and $19.2\ \mathrm{N \cdot m}$ RMS.**
$$
\boxed{ \text{A } 2.2\ \mathrm{kW} \text{ servo at } 3{,}000\ \mathrm{rev / min} \; \left( 7.0\ \mathrm{N \cdot m} \text{ rated, } 21\ \mathrm{N \cdot m} \text{ peak} \right) \text{ through a } 1{:}3.5 \text{ planetary} \to 24.5\ \mathrm{N \cdot m} \text{ rated, } 73.5\ \mathrm{N \cdot m} \text{ peak} }
$$
**against $19.2$ and $65$ required, and a $32\ \mathrm{mm}$ screw with a $20\ \mathrm{mm}$ lead running at $8{,}570\ \mathrm{rev / min}$ — below its $d n$ limit of $12{,}000$ with the $1.3$ safety factor.**
**The shaking force.** The head moves vertically; the frame sees $m a$ plus the reaction of the cut. **The cutting force itself closes on the die bed — upper die, sheet, lower die, die bed, and back to the upper die — and does not appear as a shaking force at all.** **What the frame feels is the inertia of the head and the nut, $153\ \mathrm{N}$, plus the residual unbalance of the rotating parts, plus the transient the cut's onset excites.**
**The transient is the item that needs the analysis.** The shear stress collapses at the instant the board gives way, and the energy stored in the frame's elasticity — at $18\ \mathrm{kN}$ and a frame stiffness of $900\ \mathrm{kN / mm}$, an elastic shortening of $0.020\ \mathrm{mm}$ and $180\ \mathrm{J}$ — is released in about a millisecond.
**An energy-balance estimate of the resulting shock is worthless, and the arithmetic that shows why is worth doing once:**
$$
v = \sqrt{\frac{2 E}{M}} = \sqrt{\frac{2 \times 180}{800}} = 0.67\ \mathrm{m / s}, \qquad
a = v \omega_n = 0.67 \times 754 = 505\ \mathrm{m / s^2}
\qquad \Rightarrow \qquad F = 800 \times 505 = 404\ \mathrm{kN}
$$
**which is absurd, and the absurdity is the signal that the estimate assumes all the stored energy enters one mode of a rigid body with no damping.**  **The honest design statement is that the shock must be dealt with by construction rather than by calculation: a preloaded die holder, a die bed stiff enough that its first mode is above $400\ \mathrm{Hz}$ so that the shock's energy is split over many modes, and a measurement at commissioning.** **The number that makes the $4\ \mathrm{kN}$ allowance satisfiable is that a well-jointed cast frame transmits a shock of this size at two to five per cent of the static force — $360$ to $900\ \mathrm{N}$ — and the reason the acceptance test is run with the die open and then with the die cutting is that the difference between the two is the shock, and it is the only number on the report that cannot be calculated.**
**The failure modes.**
$$
\begin{array}{l l}
\text{Screw buckles in the cut} & 18.4\ \mathrm{kN} \text{ against a } 2.4\ \mathrm{m} \text{ unsupported } 32\ \mathrm{mm} \text{ screw's } 96\ \mathrm{kN} \text{ Euler load, safety factor } 5.2 \\
\text{Servo loses position in the cut} & \text{following error at } 18\ \mathrm{kN} \text{ on a } 19.2\ \mathrm{N \cdot m / rad} \text{ loop} = 0.02\ \mathrm{mm} \\
\text{Backlash reverses at the cut} & \text{the cut is taken on the same side of the backlash every cycle; a preloaded nut} \\
\text{Thermal growth of the screw} & 1.2\ \mu\mathrm{m / m \cdot K} \times 1.2\ \mathrm{m} \times 8\ \mathrm{K} = 11.5\ \mu\mathrm{m}, \text{ within the } 100\ \mu\mathrm{m} \\
\text{Die impact at the dwell} & \text{the } 40^\circ \text{ dwell holds the cut open; the retract starts only after the shear has relaxed} \\
\text{Head droops on power loss} & 28\ \mathrm{kg} \text{ on a } 90\ \% \text{-efficient screw is not self-locking; a shaft brake is mandatory}
\end{array}
$$
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Cut position} & 1{,}000 \text{ consecutive strokes, a } 0.001\ \mathrm{mm} \text{ gauge against the die}; 3\sigma \le \pm 0.05\ \mathrm{mm} \text{ so that wear has margin} \\
\text{Dwell} & \text{measured against the encoder; the head must not move more than } 0.02\ \mathrm{mm} \text{ during the } 40^\circ \text{ dwell} \\
\text{Shaking force} & \text{three accelerometers on the frame; the peak dynamic force below } 4\ \mathrm{kN} \text{ with the die open} \\
\text{Torque} & \text{a torque transducer on the screw; the profiled curve retained as the condition baseline} \\
\text{Cut quality} & 10^4 \text{ strokes, then re-measure the position and inspect the burr height against the } 0.05\ \mathrm{mm} \text{ datum} \\
\text{Power loss} & \text{power removed at the top of the stroke; the head must not fall more than } 0.05\ \mathrm{mm}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE CUT POSITION REPEATABILITY SHALL BE MEASURED OVER ONE THOUSAND CONSECUTIVE STROKES WITH A WORN DIE AND REPORTED AS A THREE-SIGMA VALUE."** **"THE CUT SHALL BE TAKEN WITH THE SCREW DRIVEN FROM THE SAME SIDE OF THE BACKLASH AT EVERY STROKE, AND THE PRELOAD OF THE NUT SHALL BE VERIFIABLE."** **"THE MACHINE SHALL HOLD THE HEAD WITHIN ZERO ZERO FIVE MILLIMETRES WITH THE DRIVE DE-ENERGISED AT ANY POINT OF THE STROKE."** **"THE DRIVE TORQUE PROFILE SHALL BE RECORDED AT COMMISSIONING AND TREND MONTHLY, AN INCREASE IN THE PEAK BEING TAKEN AS AN INDICATION OF DIE WEAR OR OF LUBRICATION FAILURE."**
*Design comment.* The general rule is that **a press is designed on its energy and its stiffness and only then on its force, and a press that must hold a position is designed on its structure and not on its mechanism** — and the reason this design abandons the linkage is that a linkage's accuracy is a geometric property that wears, while a screw's accuracy is a manufactured property that also wears but does so in a direction the designer can measure and compensate.
:::
:::
