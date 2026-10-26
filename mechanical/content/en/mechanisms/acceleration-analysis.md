Velocity analysis tells you what the machine is doing. Acceleration analysis tells you **what it costs the structure**. A linkage driven at constant input speed has zero input acceleration, yet its members routinely accelerate at five to ten times gravity. Those accelerations, multiplied by the link masses, are the inertia forces that load the bearings, the bolts and the foundation, and in a high-speed press, a sewing-machine head or a packaging turret they are usually larger than the forces of the process itself. **Inertia forces never leave the machine: they circulate through the joints and the frame, and their unbalanced resultant is what shakes the foundation.**

The mathematics is one more differentiation of the loop equation, with the same coefficient matrix as the velocity analysis. The physics is three terms, each with its own magnitude and direction: **the centripetal (normal) term, the tangential term and the Coriolis term.** The first two describe a rigid body; the third appears only where a point slides along a link that is itself rotating — a slider in a slotted lever, a block on a rotating guide, a telescoping arm — and it is the one most often forgotten.

::: warning Four acceleration errors that survive a velocity check
**Dropping the centripetal term.** A link of length $r$ rotating at $\omega$ accelerates its far end at $r \omega^2$ **towards** the pivot even when $\dot{\omega} = 0$. The term grows as $\omega^2$, while the tangential term grows only with $\dot{\omega}$. At $3{,}000\ \mathrm{rev / min}$ a $100\ \mathrm{mm}$ crank pin accelerates at $0.1 \times 314.16^2 = 987\ \mathrm{m / s^2}$ — about a hundred times gravity — while a crank brought from rest to that speed in half a second ($\dot{\omega} = 628\ \mathrm{rad / s^2}$) has a tangential acceleration of only $62.8\ \mathrm{m / s^2}$. The centripetal term is almost sixteen times larger, and the total acceleration lies within $3.6^\circ$ of the crank axis.
**Omitting Coriolis at a sliding pair on a rotating link.** The term $2 \vec{\omega} \times \vec{v}_{\mathrm{rel}}$ exists only when a point slides along a body that is itself rotating, and it is zero in most first-course dynamics examples. On a telescoping arm extending at $0.4\ \mathrm{m / s}$ while rotating at $4\ \mathrm{rad / s}$, the Coriolis acceleration is $3.2\ \mathrm{m / s^2}$, larger than the $2.8\ \mathrm{m / s^2}$ tangential term $R\alpha$ in the worked example below. Leaving it out does not make the answer slightly wrong; it removes more than half the transverse acceleration.
**Confusing the instant centre of velocity with the instant centre of acceleration.** A link in plane motion has one point of zero velocity and, in general, a **different** point of zero acceleration (the acceleration pole). The two coincide only in special cases. Using the velocity instant centre as if it were a centre of zero acceleration gives wrong accelerations everywhere on the link.
**Getting the direction of the normal term wrong.** For two points on one rigid body, $\vec{a}_B = \vec{a}_A + \vec{\alpha} \times \vec{r}_{B/A} - \omega^2 \vec{r}_{B/A}$: the normal term points **from $B$ towards $A$**, never from $A$ to $B$. A centripetal term drawn outward is wrong by twice its magnitude, $2 \omega^2 r$, because the sign is the whole of its direction. The same applies to adding a normal term computed about one centre to a tangential term computed about another: every term must refer to the same pair of points.
:::

## One more differentiation, the same matrix

::: definition The acceleration loop {#def-accel-loop}
**Differentiate the velocity loop once more.** With $\alpha_k = d \omega_k / dt$, the four-bar loop $a e^{i \theta_2} + b e^{i \theta_3} = d + c e^{i \theta_4}$ gives

$$
\boxed{ - a \omega_2^2 e^{i \theta_2} + a \alpha_2 i e^{i \theta_2} - b \omega_3^2 e^{i \theta_3} + b \alpha_3 i e^{i \theta_3} = - c \omega_4^2 e^{i \theta_4} + c \alpha_4 i e^{i \theta_4} }
$$

in which all the $\omega$ terms are known from the position and velocity analyses. Taking real and imaginary parts gives a linear system with the **same coefficient matrix as the velocity analysis**, and therefore the **same determinant** $b c \sin \left( \theta_3 - \theta_4 \right) = - b c \sin \mu$, where $\mu = \theta_4 - \theta_3$ is the transmission angle:

$$
\begin{pmatrix} - b \sin \theta_3 & c \sin \theta_4 \\ b \cos \theta_3 & - c \cos \theta_4 \end{pmatrix}
\begin{pmatrix} \alpha_3 \\ \alpha_4 \end{pmatrix} =
\begin{pmatrix} A_x \\ A_y \end{pmatrix}, \qquad
\begin{pmatrix} A_x \\ A_y \end{pmatrix} =
\begin{pmatrix} a \omega_2^2 \cos \theta_2 + a \alpha_2 \sin \theta_2 + b \omega_3^2 \cos \theta_3 - c \omega_4^2 \cos \theta_4 \\ a \omega_2^2 \sin \theta_2 - a \alpha_2 \cos \theta_2 + b \omega_3^2 \sin \theta_3 - c \omega_4^2 \sin \theta_4 \end{pmatrix}
$$

**A mechanism that is singular in velocity is singular in acceleration too.** Near a singular position the angular velocities grow as $1 / \sin \mu$; the right-hand side of the acceleration system contains their squares, so the angular accelerations grow faster still, up to $1 / \sin^3 \mu$. Relative to $\mu = 90^\circ$, the factor $1 / \sin \mu$ alone is $2.9$ at $\mu = 20^\circ$ and $29$ at $\mu = 2^\circ$. This is one more reason to keep the transmission angle of a working linkage above about $40^\circ$.
:::

::: definition Rigid-body plane motion {#def-rigid-accel}
**Two points on one rigid body:**

$$
\boxed{ \vec{a}_B = \vec{a}_A + \underbrace{\vec{\alpha} \times \vec{r}_{B / A}}_{\text{tangential},\; \perp \vec{r}} - \underbrace{\omega^2 \vec{r}_{B / A}}_{\text{normal, from } B \text{ to } A} }
$$

The tangential and normal components are perpendicular by construction, which is what makes the acceleration polygon work.

$$
\begin{array}{l l l l}
\text{Term} & \text{Magnitude} & \text{Direction} & \text{Vanishes when} \\
\text{Normal} & \omega^2 r & B \text{ to } A & \omega = 0 \\
\text{Tangential} & \alpha r & \perp \vec{r} & \alpha = 0 \\
\text{Coriolis} & 2 \omega v_{\mathrm{rel}} & \perp \text{ sliding direction} & \omega = 0 \text{ or } v_{\mathrm{rel}} = 0 \\
\text{Translational} & a_A & \text{as given} & A \text{ is fixed}
\end{array}
$$

**When a point $B$ moves relative to a rotating link** (a slider in a slot, a block on a rotating guide), the acceleration is written with the link as a moving reference frame. If $B'$ is the point of the link that coincides with $B$ at this instant,

$$
\boxed{ \vec{a}_B = \vec{a}_{B'} + \underbrace{2 \vec{\omega} \times \vec{v}_{\mathrm{rel}}}_{\mathrm{Coriolis}} + \vec{a}_{\mathrm{rel}}, \qquad \vec{a}_{B'} = \vec{a}_A + \vec{\alpha} \times \vec{r} - \omega^2 \vec{r} }
$$

The direction of the Coriolis term is found by rotating $\vec{v}_{\mathrm{rel}}$ through $90^\circ$ in the sense of $\omega$. Its magnitude is the product of two quantities the designer sets independently — the angular speed of the guide and the sliding speed along it — so it reverses whenever either reverses.
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
**The two scalar equations**, the real and imaginary parts of the loop equation with $\alpha_2 = 0$:
$$
- b \alpha_3 \sin \theta_3 + c \alpha_4 \sin \theta_4 = a \omega_2^2 \cos \theta_2 + b \omega_3^2 \cos \theta_3 - c \omega_4^2 \cos \theta_4 = 38.30 + 8.11 - 1.94 = 44.47
$$
$$
b \alpha_3 \cos \theta_3 - c \alpha_4 \cos \theta_4 = a \omega_2^2 \sin \theta_2 + b \omega_3^2 \sin \theta_3 - c \omega_4^2 \sin \theta_4 = 32.14 + 3.69 - 4.24 = 31.59
$$
with $b \sin \theta_3 = 0.4967$, $c \sin \theta_4 = 0.8180$, $b \cos \theta_3 = 1.0925$, $c \cos \theta_4 = 0.3755$. From the first, $\alpha_4 = \left( 44.47 + 0.4967 \alpha_3 \right) / 0.8180 = 54.36 + 0.6072 \alpha_3$. Substituting into the second:
$$
1.0925 \alpha_3 - 0.3755 \left( 54.36 + 0.6072 \alpha_3 \right) = 31.59
\qquad \Rightarrow \qquad 0.8645 \alpha_3 = 52.00
$$
$$
\boxed{ \alpha_3 = 60.1\ \mathrm{rad / s^2} \ \text{counter-clockwise}, \qquad \alpha_4 = 54.36 + 36.52 = 90.9\ \mathrm{rad / s^2}\ \text{counter-clockwise} }
$$
A finite-difference check — solving the position loop at $\theta_2 \pm 10^{-4}\ \mathrm{rad}$ and differentiating twice numerically — gives $60.15$ and $90.87\ \mathrm{rad / s^2}$. It is worth doing once per mechanism, because it catches a sign error in $\omega$ or a transposition of the two scalar equations.
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
\vec{\alpha}_3 \times \vec{r}_{B / A} = 60.15 \left( - 0.4967,\; 1.0925 \right) = \left( - 29.88,\; 65.71 \right), \qquad
- \omega_3^2 \vec{r}_{B / A} = - 7.420 \left( 1.0925,\; 0.4967 \right) = \left( - 8.11,\; - 3.69 \right)
$$
$$
\vec{a}_B = \left( - 38.30 - 29.88 - 8.11,\; - 32.14 + 65.71 - 3.69 \right) = \left( - 76.28,\; 29.88 \right)
$$
**The check from the rocker**, which must give the same vector because $O_4$ is fixed:
$$
\vec{a}_B = c \alpha_4 \left( - \sin \theta_4, \cos \theta_4 \right) - c \omega_4^2 \left( \cos \theta_4, \sin \theta_4 \right)
= 81.79 \left( - 0.9088, 0.4173 \right) - 4.662 \left( 0.4173, 0.9088 \right)
$$
$$
= \left( - 74.33 - 1.95,\; 34.13 - 4.24 \right) = \left( - 76.28,\; 29.89 \right) \quad \checkmark
$$
$$
\boxed{ \left| \vec{a}_B \right| = \mathbf{81.9\ \mathrm{m / s^2} = 8.4\ g} }
$$
The two routes agree to rounding. This is the check that detects a transposed pair of equations or a reversed angular acceleration: either error reverses a perpendicular component, so the two routes then disagree by tens of metres per second squared rather than by a few per cent.

**The coupler's centre of mass**, at the mid-point of $AB$:
$$
\vec{r}_{G / A} = \left( 0.5463,\; 0.2484 \right), \qquad
\vec{a}_G = \left( - 38.30, - 32.14 \right) + 60.15 \left( - 0.2484, 0.5463 \right) - 7.420 \left( 0.5463, 0.2484 \right)
$$
$$
= \left( - 38.30 - 14.94 - 4.05,\; - 32.14 + 32.86 - 1.84 \right) = \left( - 57.29,\; - 1.13 \right)
\qquad \left| \vec{a}_G \right| = \mathbf{57.3\ \mathrm{m / s^2} = 5.8\ g}
$$
**The inertia forces**, with the crank at $3\ \mathrm{kg}$, the coupler at $6\ \mathrm{kg}$ and the rocker at $4\ \mathrm{kg}$, each with its centre of mass at mid-length. The crank's centre accelerates at $\tfrac{1}{2} \times 50.0 = 25.0\ \mathrm{m / s^2}$ and the rocker's at $\tfrac{1}{2} \left| \vec{a}_B \right| = 41.0\ \mathrm{m / s^2}$:
$$
F_{\mathrm{crank}} = 3 \times 25.0 = 75\ \mathrm{N}, \qquad
F_{\mathrm{coupler}} = 6 \times 57.3 = 344\ \mathrm{N}, \qquad
F_{\mathrm{rocker}} = 4 \times 41.0 = 164\ \mathrm{N}
$$
**The shaking force** is $- \sum m_i \vec{a}_{G_i}$, which is what the frame and foundation feel:
$$
\sum m_i \vec{a}_{G_i} = 3 \left( - 19.15, - 16.07 \right) + 6 \left( - 57.29, - 1.13 \right) + 4 \left( - 38.14, 14.94 \right) = \left( - 554, \; 5 \right)\ \mathrm{N}
\qquad \left| \vec{F}_{\mathrm{shake}} \right| = \mathbf{554\ \mathrm{N}}
$$
against a total weight of $13 \times 9.81 = 128\ \mathrm{N}$. At an input speed of only $95.5\ \mathrm{rev / min}$ the mechanism already shakes its frame with a force $4.3$ times its own weight, and since every term scales as $\omega_2^2$, doubling the speed quadruples it.
*Sanity.* $\left| \vec{a}_G \right|$ is dominated by its $x$-component because at this instant the coupler's tangential term ($+32.86$ in $y$) almost cancels the crank-pin and normal terms in $y$, while all three add in $x$.
:::
:::

::: widget plot
f: 986.96*(cos(x*pi/180)+0.25*cos(x*pi/90))
x: 0, 360
y: -900, 1400
caption: The piston acceleration of the $100$–$400$ millimetre slider–crank ($\lambda = 0.25$) at $3{,}000$ revolutions per minute, in metres per second squared, positive towards the crank centre, against crank angle in degrees. **The curve is not a cosine: the second-harmonic term $0.25 \cos 2\theta$ raises the top-dead-centre peak to $1234$ and reduces the bottom-dead-centre value to $-740$.** The top-dead-centre peak is about $126$ times gravity. Notice how the second harmonic flattens the curve around bottom dead centre; with a shorter connecting rod (larger $\lambda$) the asymmetry grows.
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

**The acceleration image.** Just as the velocity polygon contains a copy of the coupler turned through $90^\circ$, **the acceleration polygon contains a similar copy of the coupler, scaled by $\sqrt{\alpha_3^2 + \omega_3^4}$ and turned through $180^\circ - \gamma$**, where

$$
\tan \gamma = \frac{\alpha_3}{\omega_3^2}
$$

Every relative acceleration $\vec{a}_{P / A}$ on the link makes the same angle with $\vec{r}_{P / A}$, so the acceleration of any coupler point follows from two measurements on a drawing. Algebraically, the relative acceleration is $\left( i \alpha - \omega^2 \right) \vec{r}$: one complex number multiplies every position vector of the link.

$$
\text{For the four-bar above: } \tan \gamma = \frac{60.15}{7.42} = 8.11 \qquad \Rightarrow \qquad \gamma = 83.0^\circ
$$

**The instant centre of acceleration (acceleration pole).** A rigid body in plane motion with $\alpha$ and $\omega$ not both zero has **exactly one point whose acceleration is zero** at each instant. It lies at a distance $\left| \vec{a}_A \right| / \sqrt{\alpha^2 + \omega^4}$ from any point $A$ of known acceleration, in a direction turned through $\gamma$ from $\vec{a}_A$ in the sense of $\alpha$. **For the coupler above, taking $A$:**

$$
\overline{A P_0} = \frac{\left| \vec{a}_A \right|}{\sqrt{\alpha_3^2 + \omega_3^4}} = \frac{50.0}{\sqrt{3{,}618 + 55.1}} = \frac{50.0}{60.61} = 0.825\ \mathrm{m}
$$

at $83.0^\circ$ anticlockwise from the direction of $\vec{a}_A$. Resolved along and across the coupler, $P_0$ is $0.12\ \mathrm{m}$ along $AB$ and $0.82\ \mathrm{m}$ to the side of it — off the bar itself, but in the plane of the coupler, which a designer can extend with a plate. The acceleration of any coupler point is then $\sqrt{\alpha_3^2 + \omega_3^4}$ times its distance from $P_0$. The pole moves as the linkage moves, so a coupler point coincides with it only instantaneously; mechanisms that hold a point nearly still over a finite interval are designed by the methods of [[mechanisms/linkage-synthesis]].
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
**The reading.** More than half the transverse acceleration — and therefore more than half the torque the slewing drive must supply for the payload — comes from a term that exists only because the arm is extending. The Coriolis term reverses sign when the arm retracts: with everything else unchanged, $a_\theta$ would be $2.80 - 3.20 = - 0.40\ \mathrm{m / s^2}$, so the slewing torque changes sign as well.
**The torque** for a $120\ \mathrm{kg}$ payload at the tip plus a $60\ \mathrm{kg}$ boom, modelled as a uniform slender rod whose length is $R$. The angular momentum about the pivot is $H = \left( m_p R^2 + \tfrac{1}{3} m_b R^2 \right) \omega$, so
$$
T = \frac{d H}{d t} = \left( m_p + \tfrac{1}{3} m_b \right) \left( R^2 \alpha + 2 R \dot{R} \omega \right)
= 140 \times \left( 1.96 + 2.24 \right) = \mathbf{588\ \mathrm{N \cdot m}}
$$
of which the Coriolis part is $140 \times 2.24 = 314\ \mathrm{N \cdot m}$, again $53\ \%$ of the total.
*Sanity.* $a_R$ is inward although the arm is extending: the radial velocity $\dot R$ is constant, so the only radial acceleration is the centripetal $- R \omega^2$. A payload free to slide on a frictionless extension rail would move outward relative to the arm, because nothing would supply the $11.2\ \mathrm{m / s^2}$ inward. Units: $\mathrm{kg} \times \mathrm{m^2 / s^2} = \mathrm{N \cdot m}$.
:::
:::

::: widget plot
f: 3.2+0*x; 4*x
x: 0.2, 1.2
y: 0, 5
labels: 2\omega\dot R; R\alpha
caption: The two parts of the transverse acceleration of a telescoping arm extending at $0.4$ metres per second while rotating at $\omega = 4$ radians per second with $\alpha = 4$ radians per second squared, against the extension $R$ in metres. **The Coriolis term $2\omega\dot R = 3.2$ is flat: it depends on how fast the arm extends and turns, not on how far out it is.** The term $R\alpha$ grows linearly and overtakes it at $R = 2\omega\dot R/\alpha = 0.8$ metres. At $R = 0.2$ metres Coriolis supplies $80$ per cent of the transverse acceleration.
:::

## What the accelerations cost: inertia forces, shaking force, balancing

::: definition Inertia loading and equivalent inertia {#def-inertia}
**Each link is a rigid body whose motion is known, so its inertia load is known** (d'Alembert):

$$
\vec{F}_i = - m_i \vec{a}_{G_i}, \qquad T_i = - I_{G_i} \alpha_i
$$

The force and couple together are equivalent to the single force $- m_i \vec{a}_{G_i}$ acting along a line offset from $G_i$ by

$$
e_i = \frac{I_{G_i} \left| \alpha_i \right|}{m_i \left| \vec{a}_{G_i} \right|}
$$

on the side that makes its moment about $G_i$ equal to $- I_{G_i} \alpha_i$. For a link rotating about a fixed pivot this line passes through the centre of percussion.

**The shaking force** is the vector sum of all the inertia forces, and **the shaking moment** is their moment sum about a fixed point $O$:

$$
\vec{F}_{\mathrm{shake}} = - \sum_i m_i \vec{a}_{G_i} = - M_{\mathrm{tot}} \vec{a}_{G,\mathrm{tot}}, \qquad
T_{\mathrm{shake}} = - \sum_i \left( \vec{r}_{G_i} \times m_i \vec{a}_{G_i} + I_{G_i} \alpha_i \right)
$$

**The middle expression is the basis of force balancing:** the shaking force is the total moving mass times the acceleration of the mechanism's overall centre of mass, so it is zero for all time if and only if that centre of mass does not move. For a four-bar this can be achieved exactly with counterweights on the crank and the rocker (Berkof and Lowen, 1969). Balancing the shaking moment as well generally needs extra elements, such as counter-rotating inertias, and adding counterweights usually increases the shaking moment and the bearing loads, so in practice the two are traded against each other.

**The equivalent inertia referred to the input** is what a motor sees:

$$
\boxed{ I_{\mathrm{eq}} \left( \theta \right) = \sum_i m_i \left( \frac{v_{G_i}}{\omega_{\mathrm{in}}} \right)^2 + \sum_i I_{G_i} \left( \frac{\omega_i}{\omega_{\mathrm{in}}} \right)^2 } , \qquad
T_{\mathrm{in}} = I_{\mathrm{eq}} \, \alpha_{\mathrm{in}} + \frac{1}{2} \frac{d I_{\mathrm{eq}}}{d \theta} \, \omega_{\mathrm{in}}^2
$$

The second term is present even at perfectly constant input speed, which is why a mechanism's drive torque is not proportional to its output torque. For the four-bar above, with the link masses of the example and each link treated as a uniform slender bar ($I_G = m L^2 / 12$), $I_{\mathrm{eq}}$ varies between $0.71$ and $4.00\ \mathrm{kg \cdot m^2}$ over one revolution, and $\tfrac{1}{2} \left( d I_{\mathrm{eq}} / d \theta \right) \omega_2^2$ ranges from $-376$ to $+192\ \mathrm{N \cdot m}$ at $\omega_2 = 10\ \mathrm{rad / s}$. A servo sized on the steady process torque alone would trip on following error, because this inertial torque is not in its profile.
:::

::: example Slider–crank shaking force and its balance {#ex-shake}
A compressor slider–crank has $r = 60\ \mathrm{mm}$, $l = 240\ \mathrm{mm}$, $3{,}000\ \mathrm{rev / min}$, a reciprocating mass of $2.0\ \mathrm{kg}$ and a crankpin mass of $1.5\ \mathrm{kg}$. Find the shaking force at three instants and design the counterweight.
::: solution
**The ingredients:** $\omega = 314.16\ \mathrm{rad / s}$, $r \omega^2 = 0.060 \times 98{,}696 = 5{,}922\ \mathrm{m / s^2}$, $\lambda = r / l = 0.25$. Measure $x$ from the crank centre $O$ towards the piston, with $\theta = 0$ at top dead centre.
**The piston acceleration** is $\ddot{x} = - r \omega^2 \left( \cos \theta + \lambda \cos 2 \theta \right)$. Its magnitude in brackets, $a = r \omega^2 \left( \cos \theta + \lambda \cos 2 \theta \right)$ (positive towards $O$):
$$
\theta = 0: \; a = 5922 \times 1.25 = 7{,}403; \qquad
\theta = 90^\circ: \; a = 5922 \times \left( 0 - 0.25 \right) = - 1{,}480; \qquad
\theta = 180^\circ: \; a = 5922 \times \left( - 1 + 0.25 \right) = - 4{,}442\ \mathrm{m / s^2}
$$
**The inertia force of the reciprocating mass** $F_S = - m_S \ddot{x} = m_S a$, along $+x$:
$$
F_S = + 14{,}806, \qquad - 2{,}961, \qquad - 8{,}884\ \mathrm{N}
$$
**The crankpin's inertia (centrifugal) force** $m_A r \omega^2 = 1.5 \times 5922 = 8{,}883\ \mathrm{N}$, directed outward from $O$ through $A$, with components $8{,}883 \left( \cos \theta, \sin \theta \right)$:
$$
\theta = 0: \; \left( 8{,}883, 0 \right); \qquad \theta = 90^\circ: \; \left( 0, 8{,}883 \right); \qquad \theta = 180^\circ: \; \left( - 8{,}883, 0 \right)
$$
**The total shaking force:**
$$
\begin{array}{c c c c}
\theta & F_x \left( \mathrm{N} \right) & F_y \left( \mathrm{N} \right) & \left| F \right| \left( \mathrm{N} \right) \\
0^\circ & 14{,}806 + 8{,}883 = 23{,}689 & 0 & \mathbf{23{,}689} \\
90^\circ & - 2{,}961 & 8{,}883 & \mathbf{9{,}363} \\
180^\circ & - 8{,}884 - 8{,}883 = - 17{,}767 & 0 & \mathbf{17{,}767}
\end{array}
$$
**The reading.** The force is never zero, its peak is $23.7\ \mathrm{kN}$ against a total moving weight of $3.5 \times 9.81 = 34\ \mathrm{N}$ — a ratio of about seven hundred — and it rotates around the frame once per revolution.
**The balance.** A counterweight $m_c$ at radius $R_c$ opposite the crankpin cancels the crankpin's force exactly if $m_c R_c = m_A r = 1.5 \times 0.060 = 0.090\ \mathrm{kg \cdot m}$. It can also cancel part of the reciprocating force, but only its first-harmonic part, and the standard choice is to balance an additional fraction $c$ of the reciprocating mass:
$$
m_c R_c = \left( m_A + c \, m_S \right) r
$$
**The residual force is then**
$$
F_x = m_S r \omega^2 \left[ \left( 1 - c \right) \cos \theta + \lambda \cos 2 \theta \right], \qquad
F_y = - c \, m_S r \omega^2 \sin \theta, \qquad m_S r \omega^2 = 11{,}844\ \mathrm{N}
$$
and the design decision is the trade-off: increasing $c$ moves force out of the line of stroke into the perpendicular direction. Maximising $\left| F \right|$ over a full revolution for each $c$:
$$
\begin{array}{c c c c}
c & m_c R_c \left( \mathrm{kg \cdot m} \right) & F_{\max} \left( \mathrm{kN} \right) & \text{where the peak occurs} \\
0 & 0.090 & 14.8 & \theta = 0, \text{ the full first harmonic along the bore} \\
0.3 & 0.126 & 11.3 & \theta = 0 \\
0.60 & 0.162 & \mathbf{7.9} & \theta \approx 101^\circ \; (7.7 \text{ at both } 0 \text{ and } 90^\circ) \\
1.0 & 0.210 & 12.2 & \theta = 90^\circ, \text{ the second harmonic and the introduced vertical}
\end{array}
$$
$c = 1$ is not optimal: full reciprocating balance leaves the second-harmonic force $m_S r \omega^2 \lambda \cos 2 \theta$ (peak $2{,}961\ \mathrm{N}$) unbalanced and adds a perpendicular force $c \, m_S r \omega^2 \sin \theta = 11{,}844 \sin \theta\ \mathrm{N}$ that the machine did not have before. A simple rule takes $c$ where the values at $0^\circ$ and $90^\circ$ are equal, $\left( 1 - c \right) + \lambda = \sqrt{ \lambda^2 + c^2 }$, which gives $c = 0.60$; a full numerical minimax over the revolution gives $c = 0.59$ and $F_{\max} = 7.8\ \mathrm{kN}$, so the rule is close. To do better than this, designers use two counter-rotating balance shafts, which cancel the first harmonic completely and leave only the second, at the cost of extra shafts, bearings and gears.
**The residual at $c = 0.60$:**
$$
F_{\max} = 7.9\ \mathrm{kN}, \qquad \text{a reduction of } 47\ \% \text{ from the } 14.8\ \mathrm{kN} \text{ of the machine with only the rotating mass balanced}
$$
and $67\ \%$ from the $23.7\ \mathrm{kN}$ of the machine with no counterweight at all. The counterweight is placed at the largest radius the crank web allows, because $m_c R_c$ is fixed: doubling $R_c$ halves the added mass.
*Sanity.* The shaking force at $90^\circ$ is smaller than at $0^\circ$ although the crankpin force is unchanged, because the reciprocating and rotating components are perpendicular there and add in quadrature instead of in line.
:::
:::

::: widget plot
f: 11.844*sqrt(pow(1.75*cos(x*pi/180)+0.25*cos(x*pi/90),2)+pow(0.75*sin(x*pi/180),2))
x: 0, 360
y: 8, 26
caption: The magnitude of the shaking force of the compressor slider–crank with no counterweight at all, in kilonewtons, against crank angle in degrees. **The curve has a sharp maximum of $23.7$ kilonewtons at top dead centre, a secondary maximum of $17.8$ at bottom dead centre, and its minimum, $8.8$ kilonewtons near $81^\circ$ and $279^\circ$, is never zero.** Peak and trough differ by a factor of $2.7$. The crankpin force adds in quadrature with the reciprocating force away from the dead centres, which is why the trough is broad rather than a sharp zero.
:::

## Sliding pairs, cams and the jerk that follows

::: definition Jerk and its consequences {#def-jerk}
**One more differentiation gives the jerk**, $j = d a / d t$. Wherever the acceleration of a motion law jumps, the jerk is infinite (a step in force); wherever the jerk jumps, the force changes slope abruptly. Both excite vibration of the follower train.

$$
j = \frac{d a}{d t}, \qquad
\Delta F = m \, \Delta a = m \int j \, dt, \qquad
\text{contact force} = m a + F_{\mathrm{spring}}
$$

The peak coefficients of the standard rise laws, for a rise $h$ over a cam angle $\beta$ (velocity $k_v h \omega / \beta$, acceleration $k_a h \omega^2 / \beta^2$, jerk $k_j h \omega^3 / \beta^3$):

$$
\begin{array}{l c c c l}
\text{Cam law} & k_v & k_a & k_j & \text{use} \\
\text{Uniform} & 1.000 & \infty \text{ at ends} & \infty & \text{never on its own} \\
\text{Parabolic} & 2.000 & 4.000 & \infty \text{ at 3 points} & \text{low speed only} \\
\text{Harmonic} & 1.571 & 4.935 & \infty \text{ at the ends} & \text{rise of a moderate-speed cam} \\
\text{Cycloidal} & 2.000 & 6.283 & 39.5 \text{ (steps at the ends)} & \text{dwell–rise–dwell} \\
\text{3-4-5 polynomial} & 1.875 & 5.774 & 60.0 \text{ (steps at the ends)} & \text{the general-purpose compromise} \\
\text{4-5-6-7 polynomial} & 2.188 & 7.513 & 52.5 \text{ (continuous)} & \text{high-speed cams, dwell-to-dwell} \\
\text{5-6-7-8-9 polynomial} & 2.461 & 9.372 & 78.8 \text{ (continuous)} & \text{where jerk, not acceleration, rules} \\
\text{Modified sine} & 1.760 & 5.528 & 69.5 \text{ (steps at the ends)} & \text{low peak acceleration, three segments}
\end{array}
$$

**What decides between them is not only the peak acceleration but which derivative first becomes discontinuous.** The 4-5-6-7 polynomial gives a jerk that is continuous everywhere ($k_j = 52.5$, zero at both ends), against the cycloidal's jerk steps of $39.5$ at each end, at the cost of a peak acceleration $20\ \%$ above the cycloidal ($7.513 / 6.283 = 1.20$) and a peak velocity $9\ \%$ above it. That trade is right when vibration of a stiff, fast follower train is the concern, and wrong when the follower is heavy and spring-closed, because a $20\ \%$ higher acceleration needs a correspondingly stronger spring.

**The contact force.** A cam's follower is held against the cam by a spring of stiffness $k$ and preload $F_0$, and the force the cam must transmit along the follower axis is
$$
F = m a + F_0 + k s + F_{\mathrm{friction}}
$$
**The follower floats — loses contact — where $m a$ is negative and larger in magnitude than the spring force $F_0 + k s$.** Since $a \propto \omega^2$ while the spring force does not depend on speed, there is a definite speed above which contact is lost, first near the point of greatest deceleration.
:::

::: example Cam float {#ex-float}
A radial cam drives a $1.4\ \mathrm{kg}$ follower through a cycloidal rise of $18\ \mathrm{mm}$ over $70^\circ$ with a spring preload of $120\ \mathrm{N}$ and a stiffness of $9\ \mathrm{N / mm}$. Find the speed at which the follower loses contact.
::: solution
**The peak acceleration** (cycloidal, $k_a = 2 \pi = 6.283$, $\beta = 70^\circ = 1.2217\ \mathrm{rad}$):
$$
a_{\max} = k_a \frac{h}{\beta^2} \omega^2 = 6.283 \times \frac{0.018}{1.2217^2} \omega^2 = 0.07577\, \omega^2\ \mathrm{m / s^2}
$$
**Where the deceleration peaks.** The cycloidal acceleration is $\left( 2 \pi h / \beta^2 \right) \omega^2 \sin \left( 2 \pi u \right)$ with $u = \theta / \beta$, so the largest deceleration occurs at $u = 3/4$, where the lift is
$$
s = h \left( \tfrac{3}{4} + \tfrac{1}{2 \pi} \right) = 0.909 \times 18 = 16.37\ \mathrm{mm}, \qquad
F_{\mathrm{spring}} = 120 + 9 \times 16.37 = 267.3\ \mathrm{N}
$$
**Loss of contact** occurs when the deceleration demand exceeds what the spring supplies:
$$
m a_{\max} = F_{\mathrm{spring}}
\qquad \Rightarrow \qquad
1.4 \times 0.07577 \times \omega^2 = 267.3
\qquad \Rightarrow \qquad \omega^2 = 2{,}520
$$
$$
\boxed{ \omega_{\mathrm{float}} = 50.2\ \mathrm{rad / s} = 479\ \mathrm{rev / min} }
$$
A search over the whole rise for the first point where $m \left| a \right| > F_0 + k s$ gives $478\ \mathrm{rev / min}$ (contact is lost first at $u = 0.73$, slightly before the peak deceleration, where the spring force is a little lower), so the peak-deceleration estimate is adequate.
**The design speed with a factor of two on acceleration** — a common convention; a factor of two on acceleration is a factor of $\sqrt{2}$ on speed:
$$
\omega_{\mathrm{design}} = \frac{50.2}{\sqrt{2}} = 35.5\ \mathrm{rad / s} = \mathbf{339\ \mathrm{rev / min}}
$$
**Suppose the machine needs $900$ follower strokes per minute.** The options, each with the float speed found by the same search over the rise:
$$
\begin{array}{l l l}
\text{1. Stiffer spring} & k \to 30\ \mathrm{N / mm} & \omega_{\mathrm{float}} \to 720\ \mathrm{rev / min}, \text{ but the contact stress rises and the cam wears} \\
\text{2. Lighter follower} & m \to 0.5\ \mathrm{kg} & \omega_{\mathrm{float}} \to 800\ \mathrm{rev / min} \\
\text{3. Different cam law} & \text{modified sine, } k_a = 5.53 \text{ against } 6.28 & \omega_{\mathrm{float}} \to 521\ \mathrm{rev / min}, \text{ a gain of nine per cent} \\
\text{4. Two lobes} & \text{the same rise twice per revolution} & 900 \text{ strokes/min at } 450\ \mathrm{rev / min}
\end{array}
$$
**The reading.** Option 3 is the cheapest and the least effective: the peak acceleration coefficient is a property of the motion law and can be moved only by ten per cent or so. (The 4-5-6-7 polynomial, often recommended for high speed, is worse than the cycloidal on this criterion, $k_a = 7.51$ against $6.28$; it is chosen for its continuous jerk.) The float speed goes roughly as $\sqrt{F_{\mathrm{spring}} / m}$, so mass and spring are the levers that work. A two-lobe cam with the same rise over the same $70^\circ$ meets the stroke rate at half the shaft speed, $450\ \mathrm{rev / min}$, but that is only $6\ \%$ below the float speed of $478$; combined with the lighter follower (float at $800\ \mathrm{rev / min}$) it gives a speed margin of $1.78$, a factor of $3.2$ on acceleration.
*Sanity.* Units: $\mathrm{kg} \times \mathrm{m} \times \mathrm{rad^2 / s^2} = \mathrm{N}$. Doubling the mass lowers the float speed by $\sqrt{2}$, as the formula requires. In practice loss of contact is gradual: the follower first leaves the profile over a short arc near the peak deceleration, and the impact when it lands again is what damages cams and followers.
:::
:::

::: quiz
A slider moves with relative speed $v_{\mathrm{rel}}$ along a link rotating at $\omega$. The Coriolis acceleration $2 \omega v_{\mathrm{rel}}$ appears in the acceleration equation:

- [ ] For any two points on the same rigid body, whatever the joint between them
- [x] Only when the sliding pair is observed from a frame that is itself rotating; it is perpendicular to the sliding direction, turned $90^{ \circ }$ in the sense of $\omega$, and it reverses sign when the sliding reverses
- [ ] Only when $\omega$ is constant, because a varying $\omega$ is already carried by the tangential term
- [ ] Only in spatial mechanisms, where the extra rotation couples the axes

::: solution
**Only at a sliding pair on a rotating link.** The term comes from differentiating a position vector expressed in a rotating frame twice and is $2 \boldsymbol{\omega} \times \mathbf{v}_{\mathrm{rel}}$, so it vanishes when either factor does: a pin joint has $v_{\mathrm{rel}} = 0$, and a slider on a non-rotating guide has $\omega = 0$. Two points on one rigid body have no relative sliding, so the first option is wrong; the term does not depend on whether $\omega$ is constant, so the third is wrong; and it appears in plane mechanisms, so the fourth is wrong. In the slotted-lever quick-return mechanism the Coriolis component acts across the slot, so it loads the sides of the slider block and the slot; it is zero at the ends of the stroke, where the lever momentarily stops, and largest in between. Omitting it from an acceleration polygon gives a polygon that still closes but with the wrong angular acceleration of the slotted link.
:::
:::

::: history
**Gaspard-Gustave Coriolis** published the extra term in relative motion in his memoir *Sur les équations du mouvement relatif des systèmes de corps*, in the *Journal de l'École polytechnique* in 1835. **Jacques Antoine Charles Bresse** showed in 1853, in a memoir in the same journal, that a body in plane motion has an instantaneous centre of acceleration, and described the two circles through it — the inflection circle, whose points have zero normal acceleration, and the circle of points with zero tangential acceleration — now called the Bresse circles. Graphical velocity and acceleration polygons became the standard tool of mechanism analysis in the textbooks of the late nineteenth and early twentieth centuries and remained so until computers made the loop-equation method routine. **R. S. Berkof and G. G. Lowen** showed in 1969 (*Journal of Engineering for Industry*) that simple linkages such as the four-bar can be completely force-balanced by counterweights alone. For cams, polynomial motion laws chosen to account for the dynamics of the follower train — the "polydyne" method — were introduced for automotive valve gear by W. M. Dudley (1948) and developed by D. A. Stoddart in a series of articles in *Machine Design* in 1953.
:::

## Where this leads

The inertia forces computed here become the bearing loads of [[mechanisms/machine-dynamics]] and the torque that sizes the motor; the shaking force and its balance are the subject of [[vibrations]]' isolation chapters and the reason a press stands on a heavy foundation; the equivalent inertia is the plant that [[control-systems]]' servo loops must handle; the contact forces set the bearing life; and the jerk is the reason [[mechanisms/cams]] are cut on smooth polynomial laws and [[mechanisms/gears]] are ground.

::: summary
- One more differentiation, the same coefficient matrix: near a singular position the angular velocities grow as $1/\sin\mu$ and the angular accelerations faster still.
- $\vec a_B = \vec a_A + \vec\alpha\times\vec r - \omega^2\vec r$; the normal term points from $B$ to $A$ and dominates at speed because it goes as $\omega^2$.
- Coriolis, $2\omega v_{\mathrm{rel}}$, appears only at a sliding pair on a rotating link, can exceed the other transverse terms, and reverses sign with the sliding.
- The relative acceleration of every point of a link makes the same angle $\gamma = \arctan(\alpha/\omega^2)$ with its position vector, so the acceleration polygon contains a similar image of the link.
- A rigid body in plane motion has one point of zero acceleration at each instant, the acceleration pole.
- The shaking force is the total mass times the acceleration of the mechanism's overall centre of mass; counterweights can null it, but nulling the shaking moment as well needs extra elements.
- The drive sees an equivalent inertia that varies through the cycle, and $\tfrac12 (dI_{\mathrm{eq}}/d\theta)\omega^2$ is a real torque at constant speed.
- Cam float is set by $ma$ against the spring force; the float speed goes roughly as $\sqrt{F_{\mathrm{spring}}/m}$, and changing the motion law moves it by only about ten per cent.
:::

## Exercises

::: exercise Normal acceleration {level=1 check="987"}
A crank of $100$ millimetres runs at $3{,}000$ revolutions per minute at constant speed. Give the acceleration of the crankpin in metres per second squared.
::: solution
$\omega = 3000 \times 2\pi/60 = 314.16$ rad/s, so $r\omega^2 = 0.1\times(314.16)^2 = 987$ m/s$^2$, directed towards the crank centre.
:::
:::

::: exercise Four-bar alpha three {level=1 check="60.1"}
For the four-bar of the worked example, give the coupler's angular acceleration in radians per second squared.
::: solution
From the two scalar equations of the worked example, $0.8645\,\alpha_3 = 52.00$, so $\alpha_3 = 60.1$ rad/s$^2$ (counter-clockwise).
:::
:::

::: exercise Four-bar alpha four {level=1 check="90.9"}
For the same four-bar, give the rocker's angular acceleration in radians per second squared.
::: solution
$\alpha_4 = 54.36 + 0.6072 \times 60.15 = 90.9$ rad/s$^2$ (counter-clockwise).
:::
:::

::: exercise Coupler centre of mass {level=1 check="57.3"}
For the same four-bar, give the magnitude of the coupler centre of mass's acceleration in metres per second squared.
::: solution
$\left|\vec a_G\right| = \sqrt{57.29^2 + 1.13^2} = 57.3$ m/s$^2$.
:::
:::

::: exercise Piston acceleration {level=1 check="1234"}
For the $100$–$400$ millimetre slider–crank at $3{,}000$ revolutions per minute, give the magnitude of the piston acceleration at top dead centre in metres per second squared.
::: solution
$\lambda = 100/400 = 0.25$ and $r\omega^2 = 0.1 \times 314.16^2 = 986.96$ m/s$^2$, so $r\omega^2(1+\lambda) = 986.96\times1.25 = 1234$ m/s$^2$.
:::
:::

::: exercise Coriolis {level=1 check="3.2"}
For the telescoping arm of the worked example, give the Coriolis acceleration in metres per second squared at $t=1$ second.
::: solution
$2\omega\dot R = 2\times4.0\times0.40 = 3.2$ m/s$^2$.
:::
:::

::: exercise Image angle {level=1 check="83.0"}
For the four-bar of the worked example, give the angle $\gamma$ between the relative acceleration of a coupler point and the inward normal direction, in degrees.
::: solution
$\gamma=\arctan(\alpha_3/\omega_3^2)=\arctan(60.15/7.42)=83.0^\circ$.
:::
:::

::: exercise Cam float {level=1 check="479"}
For the cam of the worked example, give the follower float speed in revolutions per minute, using the peak-deceleration estimate.
::: solution
At the peak deceleration the spring force is $267.3$ N, so $1.4\times0.07577\times\omega^2 = 267.3$, $\omega = 50.2$ rad/s $=479$ rev/min.
:::
:::

::: exercise Shaking force {level=2}
For the compressor slider–crank, give the shaking force at ninety degrees and explain why it is smaller than at top dead centre.
::: solution
$$
F_x = m_S r \omega^2 \lambda \cos 180^\circ = - 2{,}961\ \mathrm{N}, \qquad F_y = m_A r \omega^2 = 8{,}883\ \mathrm{N}
\qquad \Rightarrow \qquad \left| F \right| = \sqrt{2961^2 + 8883^2} = 9{,}363\ \mathrm{N}
$$
It is smaller because at ninety degrees the reciprocating and rotating components are perpendicular and add in quadrature, whereas at top dead centre they are collinear and add directly. Because the direction of the force rotates through the cycle while its magnitude varies by a factor of $2.7$, the frame and its bolt group must be checked over the whole cycle, not only at the angle of maximum magnitude.
:::
:::

::: exercise Balance fraction {level=2}
For the compressor slider–crank, give the counterweight moment $m_c R_c$ for full reciprocating balance and state what it leaves unbalanced.
::: solution
$$
m_c R_c = \left( m_A + m_S \right) r = 3.5 \times 0.060 = 0.210\ \mathrm{kg \cdot m}
$$
It leaves the whole of the second-harmonic reciprocating force unbalanced, $m_S r \omega^2 \lambda \cos 2 \theta$ with a peak of $2.0 \times 5922 \times 0.25 = 2{,}961\ \mathrm{N}$, and it introduces a perpendicular force $- m_S r \omega^2 \sin \theta = -11{,}844 \sin \theta\ \mathrm{N}$ that the machine with only its rotating mass balanced did not have. The peak shaking force therefore falls only from $23.7$ to $12.2\ \mathrm{kN}$ (at $\theta = 90^\circ$, where the two residuals combine to $\sqrt{2961^2 + 11844^2}$). Two counter-rotating balance shafts cancel the first harmonic without introducing a rotating vector.
:::
:::

::: exercise Derivation {level=3}
Differentiate the slider–crank loop twice to obtain the piston acceleration, and show that the two-term expression $a = r \omega^2 \left( \cos \theta + \lambda \cos 2 \theta \right)$ is the first order in $\lambda$ of the exact result. Bound the error at $\lambda = 0.3$.
::: solution
**The loop.** $x = r \cos \theta + l \cos \phi$, $\sin \phi = \lambda \sin \theta$, so with $D = 1 - \lambda^2 \sin^2 \theta$, $x / r = \cos \theta + \sqrt{D} / \lambda$.
**First derivative** (from [[mechanisms/velocity-analysis]]), at constant $\omega$:
$$
v = - r \omega \left[ \sin \theta + \frac{\lambda \sin 2 \theta}{2 \sqrt{D}} \right]
$$
**Second derivative.** Differentiating again with respect to $\theta$ and multiplying by $\omega$:
$$
\ddot{x} = - r \omega^2 \left[ \cos \theta + \frac{\lambda \cos 2 \theta}{\sqrt{D}} + \frac{\lambda^3 \sin^2 2 \theta}{4 D^{3 / 2}} \right]
$$
This is exact. Expanding $1 / \sqrt{D} = 1 + \tfrac12 \lambda^2 \sin^2 \theta + \dots$ gives
$$
\ddot{x} = - r \omega^2 \left[ \cos \theta + \lambda \cos 2 \theta + O \left( \lambda^3 \right) \right]
$$
so the two-term expression is correct to first order in $\lambda$ — in fact to second order, since there is no $\lambda^2$ term.
**The error at $\lambda = 0.3$.** The difference between the exact and two-term expressions, $\lambda \cos 2 \theta \left( D^{-1/2} - 1 \right) + \lambda^3 \sin^2 2 \theta / \left( 4 D^{3/2} \right)$, is largest in magnitude at $\theta = 90^\circ$, where the second part vanishes:
$$
\left| \epsilon \right|_{\max} = \lambda \left( \frac{1}{\sqrt{1 - \lambda^2}} - 1 \right) = 0.3 \left( \frac{1}{0.9539} - 1 \right) = 0.0145\, r \omega^2
$$
Relative to the peak acceleration $r \omega^2 \left( 1 + \lambda \right) = 1.3\, r \omega^2$ at top dead centre, this is
$$
\frac{0.0145}{1.3} = 1.1\ \%
$$
At $\lambda = 0.5$ the same bound is $0.0774\, r \omega^2$, or $5.2\ \%$ of the peak, because the error grows as $\lambda^3$; for short connecting rods the exact expression (or a numerical solution) is used.
*Sanity.* The error vanishes at top and bottom dead centre, where $\sin \theta = 0$ and $D = 1$, so the two-term formula gives the peak acceleration at top dead centre exactly. Numerical double differentiation of $x(\theta)$ agrees with the exact expression to better than $10^{-6}\, r\omega^2$.
:::
:::

::: exercise Design {level=3}
Design the **linkage and drive of a die-cutting press**: the cutting head must dwell for $40^\circ$ of input shaft rotation at the bottom of its stroke, cut $18\ \mathrm{kN}$ through $2\ \mathrm{mm}$ of a $250\ \mathrm{mm}$ perimeter of $0.3\ \mathrm{mm}$ board at $45$ strokes per minute, the head's mass is $28\ \mathrm{kg}$, the machine frame will tolerate a shaking force of $4\ \mathrm{kN}$, the cut must occur within $\pm 0.1\ \mathrm{mm}$ of the same place every cycle, and the drive must not need a clutch-brake. Give the topology, the motion law, the sizing, the balancing, the failure modes and the acceptance tests.
::: solution
**The duty.** $45$ strokes per minute is a cycle of $1.333\ \mathrm{s}$. **The cut:** a board of shear strength $\tau = 90\ \mathrm{MPa}$ (assumed), thickness $0.3\ \mathrm{mm}$, perimeter $250\ \mathrm{mm}$:
$$
F_{\mathrm{cut}} = \tau t L = 90 \times 10^6 \times 0.0003 \times 0.250 = 6{,}750\ \mathrm{N}
$$
The specified $18\ \mathrm{kN}$ is $2.7$ times this theoretical shear load, an allowance for a dull die and a non-uniform cut. The design load is $18\ \mathrm{kN}$, and an upper bound on the energy per stroke, taking the force as rising linearly over the $2\ \mathrm{mm}$, is
$$
E = \tfrac{1}{2} F d = \tfrac{1}{2} \times 18{,}000 \times 0.002 = 18\ \mathrm{J}
$$
**The topology.** The requirement is a dwell at the bottom of the stroke, which a cam, a six-bar with a coupler-point dwell or a servo can provide.
$$
\begin{array}{l l c l}
\text{A. Cam and roller follower} & \text{exact dwell, exact law} & \text{an } 18\ \mathrm{kN} \text{ form-closed cam is large} & \text{possible; wear moves the cut} \\
\text{B. Slider--crank} & \text{no dwell} & \text{—} & \text{rejected} \\
\text{C. Six-bar with dwell} & \text{dwell by design} & \text{coupler point} & \text{candidate} \\
\text{D. Toggle knuckle} & \text{near-dwell at toggle} & 18\ \mathrm{kN} \text{ from a small actuator} & \text{candidate} \\
\text{E. Servo and planetary roller screw} & \text{arbitrary law} & 28\ \mathrm{kg} \text{ on the nut} & \text{candidate}
\end{array}
$$
**The choice is E, because of the $\pm 0.1\ \mathrm{mm}$ cut-position requirement rather than the dwell.** A six-bar's dwell is a stationary point of the output, and the position error at the cut is
$$
\delta = \frac{\partial s}{\partial \theta} \delta \theta + \sum \frac{\partial s}{\partial l_i} \delta l_i
$$
With $\partial s / \partial \theta = 0$ at the dwell the first term vanishes — which is why dwell linkages are used — but the sensitivities $\partial s / \partial l_i$ to joint clearances and link errors do not. With a lever ratio of $2.5$ between a worn joint and the head, $0.05\ \mathrm{mm}$ of pin wear moves the cut by $0.05 \times 2.5 = 0.125\ \mathrm{mm}$, already outside the tolerance. A roller-screw servo positions the head from an encoder and the screw lead, and its errors (lead error, thermal growth, backlash) can be measured and compensated.
**The motion law.** A $52\ \mathrm{mm}$ stroke: rapid approach, controlled cut, dwell at the bottom, rapid retract, dwell at the top. Referred to the $1.333\ \mathrm{s}$ cycle:
$$
\begin{array}{l c c c}
\text{Phase} & \text{Angle} & \text{Time} \left( \mathrm{s} \right) & \text{Motion} \\
\text{Approach} & 90^\circ & 0.333 & 50\ \mathrm{mm} \text{ on a modified sine} \\
\text{Cut} & 30^\circ & 0.111 & 2\ \mathrm{mm} \text{ at constant velocity} \\
\text{Dwell} & 40^\circ & 0.148 & 0 \\
\text{Retract} & 60^\circ & 0.222 & 52\ \mathrm{mm} \text{ on a modified sine} \\
\text{Dwell} & 140^\circ & 0.519 & 0
\end{array}
$$
**The cut velocity:** $v_{\mathrm{cut}} = 0.002 / 0.111 = 0.018\ \mathrm{m / s}$. A constant cutting velocity is specified because the cutting force of a fibrous board depends on the rate, and a varying velocity gives a varying force and a varying burr.
**The accelerations.** Approach, $50\ \mathrm{mm}$ in $0.333\ \mathrm{s}$ on a modified sine, $k_a = 5.53$:
$$
a_{\max} = 5.53 \times \frac{0.050}{0.333^2} = 2.49\ \mathrm{m / s^2}
\qquad \Rightarrow \qquad F_{\mathrm{inertia}} = 28 \times 2.49 = 70\ \mathrm{N}
$$
**Retract, $52\ \mathrm{mm}$ in $0.222\ \mathrm{s}$:**
$$
a_{\max} = 5.53 \times \frac{0.052}{0.222^2} = 5.82\ \mathrm{m / s^2}
\qquad \Rightarrow \qquad F = 28 \times 5.82 = 163\ \mathrm{N}
$$
**The reading.** The inertia force is $163\ \mathrm{N}$ against a cutting force of $18{,}000\ \mathrm{N}$ — less than one per cent — because the stroke rate is low. At $600$ strokes per minute with the same motion law, the inertia force would be $\left( 600 / 45 \right)^2 = 178$ times larger, about $29\ \mathrm{kN}$, seven times the shaking-force allowance: a fast press is a different machine.
**The sizing.** Peak force, conservatively summing the cut, the retract inertia force and the head weight: $18{,}000 + 163 + 28 \times 9.81 = 18{,}440\ \mathrm{N}$. **A $32\ \mathrm{mm}$ diameter, $10\ \mathrm{mm}$ lead planetary roller screw at $\eta = 0.90$:**
$$
T_{\mathrm{peak}} = \frac{F p}{2 \pi \eta} = \frac{18{,}440 \times 0.010}{2 \pi \times 0.90} = 32.6\ \mathrm{N \cdot m}
$$
**The RMS torque over the cycle.** The cutting force is present only during the $0.111\ \mathrm{s}$ cut; taking about $3\ \mathrm{N \cdot m}$ for accelerating and holding the head during the $0.555\ \mathrm{s}$ of approach, dwell at the bottom and retract, and zero during the top dwell,
$$
T_{\mathrm{RMS}} = \sqrt{\frac{1}{1.333} \left[ 32.6^2 \times 0.111 + 3^2 \times 0.555 + 0 \times 0.667 \right]} = \sqrt{\frac{118.0 + 5.0}{1.333}} = 9.6\ \mathrm{N \cdot m}
$$
**The speed.** The peak retract velocity on a modified sine is $k_v h / t = 1.76 \times 0.052 / 0.222 = 0.412\ \mathrm{m / s}$, which with a $10\ \mathrm{mm}$ lead is a screw speed of $0.412 / 0.010 \times 60 = 2{,}470\ \mathrm{rev / min}$. That must be checked against the screw maker's speed limit for the chosen length and end fixing.
**The motor.** Direct-coupled, it must supply at least $9.6\ \mathrm{N \cdot m}$ continuous, about $33\ \mathrm{N \cdot m}$ peak and $2{,}500\ \mathrm{rev / min}$. A servo of about $3.5\ \mathrm{kW}$ rated at $3{,}000\ \mathrm{rev / min}$ has $3{,}500 / 314.2 = 11.1\ \mathrm{N \cdot m}$ continuous and, with the common $300\ \%$ short-time overload, about $33\ \mathrm{N \cdot m}$ peak. The peak margin is small, but the peak torque is needed only during the cut at $0.018\ \mathrm{m / s}$ (about $110\ \mathrm{rev / min}$), so the maker's torque–speed curve at low speed decides. A reduction gear would raise the torque margin but push the motor speed above $3{,}000\ \mathrm{rev / min}$ during the retract; the trade must be made against real catalogue data, including the reflected inertia of motor and screw, which is neglected here.
**The shaking force.** The head moves vertically; the frame sees $m a$ plus the reaction of the cut. The cutting force closes within the press — upper die, sheet, lower die, die bed, frame, screw — and does not appear as an external shaking force. What the foundation feels is the inertia of the head and nut, at most $163\ \mathrm{N}$, plus the residual unbalance of the rotating parts, plus the transient excited at break-through.
**The break-through transient.** When the board gives way the cutting force collapses in about a millisecond. With a frame stiffness of $900\ \mathrm{kN / mm}$ (assumed), the frame is stretched by $18 / 900 = 0.020\ \mathrm{mm}$ and stores $\tfrac{1}{2} \times 18{,}000 \times 2.0 \times 10^{-5} = 0.18\ \mathrm{J}$. If that energy were released undamped into a single mode with an effective mass of $800\ \mathrm{kg}$ (assumed):
$$
\omega_n = \sqrt{\frac{900 \times 10^6}{800}} = 1{,}061\ \mathrm{rad / s}, \qquad
v = \sqrt{\frac{2 \times 0.18}{800}} = 0.0212\ \mathrm{m / s}, \qquad
F = M v \omega_n = 800 \times 0.0212 \times 1{,}061 = 18.0\ \mathrm{kN}
$$
— the force amplitude equals the cutting force, as it must for a sudden release ($F = k \delta$). This is an upper bound, four and a half times the $4\ \mathrm{kN}$ allowance, so the shock must be dealt with by construction — a stiff, preloaded die set that closes the force locally, damping in the die cushions, and a measurement at commissioning — rather than by calculation alone.
**The failure modes.**
$$
\begin{array}{l l}
\text{Screw buckles in the cut} & 18.4\ \mathrm{kN} \text{ against a } 0.4\ \mathrm{m} \text{ pinned–pinned screw of } 28\ \mathrm{mm} \text{ root diameter: } P_{\mathrm{cr}} = \pi^2 E I / L^2 = 391\ \mathrm{kN}, \text{ factor } 21 \\
\text{Servo yields under the cut} & 0.02\ \mathrm{mm} \text{ at a } 10\ \mathrm{mm} \text{ lead is } 0.0126\ \mathrm{rad}, \text{ so the position loop needs } 32.6 / 0.0126 = 2.6\ \mathrm{kN \cdot m / rad} \text{ at the screw} \\
\text{Backlash reverses at the cut} & \text{the cut is taken on the same side of the backlash every cycle; a preloaded nut} \\
\text{Thermal growth of the screw} & 12\ \mu\mathrm{m / (m \cdot K)} \times 0.4\ \mathrm{m} \times 8\ \mathrm{K} = 38\ \mu\mathrm{m}, \text{ within the } 100\ \mu\mathrm{m} \text{ but a third of it} \\
\text{Die impact at the dwell} & \text{the } 40^\circ \text{ dwell lets the cut complete; the retract starts only after the force has relaxed} \\
\text{Head drops on power loss} & 28\ \mathrm{kg} \text{ on a } 90\ \% \text{-efficient screw is not self-locking; a holding brake is mandatory}
\end{array}
$$
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Cut position} & 1{,}000 \text{ consecutive strokes, a } 0.001\ \mathrm{mm} \text{ gauge against the die}; 3\sigma \le \pm 0.05\ \mathrm{mm} \text{ so that wear has margin} \\
\text{Dwell} & \text{measured against the encoder; the head must not move more than } 0.02\ \mathrm{mm} \text{ during the } 40^\circ \text{ dwell} \\
\text{Shaking force} & \text{accelerometers on the frame; the peak dynamic force below } 4\ \mathrm{kN}, \text{ first with the die open, then cutting} \\
\text{Torque} & \text{the drive torque recorded over a cycle and kept as the condition baseline} \\
\text{Cut quality} & 10^4 \text{ strokes, then re-measure the position and inspect the burr height} \\
\text{Power loss} & \text{power removed at the top of the stroke; the head must not fall more than } 0.05\ \mathrm{mm}
\end{array}
$$
The difference between the shaking-force measurements with the die open and with the die cutting is the break-through transient, the one number on the report that cannot be calculated reliably.
**Clauses for the specification.** "Cut-position repeatability shall be measured over one thousand consecutive strokes with a worn die and reported as a three-sigma value." "The cut shall be taken with the screw driven from the same side of the backlash at every stroke, and the nut preload shall be verifiable." "The machine shall hold the head within $0.05\ \mathrm{mm}$ with the drive de-energised at any point of the stroke." "The drive torque profile shall be recorded at commissioning and trended monthly; an increase in the peak is taken as an indication of die wear or lubrication failure."
*Design comment.* A press is designed on its energy and stiffness before its force, and a press that must hold a position is designed on its structure and its measurement system rather than on its mechanism. This design gives up the linkage because a linkage's accuracy depends on joint clearances that grow with wear, whereas a servo-screw's errors can be measured and compensated. This is a teaching example of the method, not an approved machine design; real presses are built to the applicable machinery-safety standards and checked by qualified engineers.
:::
:::
