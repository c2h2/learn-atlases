The previous chapters treated a spacecraft as a point. But a telescope must point at its target to a fraction of an arcsecond, a communications antenna at the Earth, a solar array at the Sun, and a rocket engine along the direction of the planned burn. The orientation of a spacecraft — its **attitude** — is governed by the rotational dynamics of a rigid body, with some features that do not appear in everyday machines: there is no ground to push against, so every change of angular momentum must come from an external torque or be stored inside the vehicle; the environmental torques are tiny but act for years; and a spinning body that slowly loses energy can turn itself over. This chapter derives Euler's equations for a spacecraft, analyses torque-free motion and the stability of spin, derives the gravity-gradient torque and the passive stabilisation it allows, and introduces active control with reaction wheels, magnetic torquers and a proportional–derivative law.

The rigid-body kinematics and the inertia tensor are developed in [[dynamics/three-dimensional-dynamics]]; the orbital background is [[orbital-mechanics/two-body-problem]].

## Euler's equations {#sec-euler}

Fix a frame to the spacecraft with origin at its centre of mass. The angular momentum about the centre of mass is $\mathbf{H} = \mathbf{I}\boldsymbol{\omega}$, where $\boldsymbol{\omega}$ is the spacecraft's angular velocity and $\mathbf{I}$ its inertia tensor — a symmetric positive-definite matrix, constant in the body frame for a rigid body. Its eigenvectors are the **principal axes**, and in principal axes $\mathbf{I} = \operatorname{diag}(I_1, I_2, I_3)$ ([spectral theorem for symmetric matrices](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)).

::: theorem Euler's equations {#thm-euler}
In principal body axes, a rigid body acted on by an external torque $\mathbf{M}$ about its centre of mass obeys
$$
\begin{aligned}
I_1\dot\omega_1 - (I_2 - I_3)\,\omega_2\omega_3 &= M_1,\\
I_2\dot\omega_2 - (I_3 - I_1)\,\omega_3\omega_1 &= M_2,\\
I_3\dot\omega_3 - (I_1 - I_2)\,\omega_1\omega_2 &= M_3.
\end{aligned}
$$ {#eq-euler}
:::

::: proof
Newton's second law for rotation, $\dot{\mathbf{H}} = \mathbf{M}$, holds when the derivative is taken in an inertial frame. For any vector expressed in a frame rotating at $\boldsymbol{\omega}$, the transport theorem gives $\dot{\mathbf{H}}_\text{inertial} = \dot{\mathbf{H}}_\text{body} + \boldsymbol{\omega}\times\mathbf{H}$. In the body frame $\mathbf{I}$ is constant, so $\dot{\mathbf{H}}_\text{body} = \mathbf{I}\dot{\boldsymbol{\omega}}$, and
$$
\mathbf{I}\dot{\boldsymbol{\omega}} + \boldsymbol{\omega}\times(\mathbf{I}\boldsymbol{\omega}) = \mathbf{M}.
$$
With $\mathbf{I}$ diagonal, the first component of $\boldsymbol{\omega}\times\mathbf{I}\boldsymbol{\omega}$ is $\omega_2(I_3\omega_3) - \omega_3(I_2\omega_2) = -(I_2 - I_3)\omega_2\omega_3$, and the others follow by cyclic permutation. The assumptions: a rigid body (constant $\mathbf{I}$), and the centre of mass as the reference point (so that the motion of the centre of mass along its orbit does not enter).
:::

If the spacecraft carries spinning wheels with total angular momentum $\mathbf{h}_w$ relative to the body, the total angular momentum is $\mathbf{H} = \mathbf{I}\boldsymbol{\omega} + \mathbf{h}_w$ and the same argument gives
$$
\mathbf{I}\dot{\boldsymbol{\omega}} + \dot{\mathbf{h}}_w + \boldsymbol{\omega}\times(\mathbf{I}\boldsymbol{\omega} + \mathbf{h}_w) = \mathbf{M}.
$$ {#eq-euler-wheels}
Spinning a wheel up ($\dot{\mathbf{h}}_w$) applies an equal and opposite torque to the body: that is how reaction wheels work.

Two quantities are conserved when $\mathbf{M} = \mathbf{0}$: the magnitude of the angular momentum, $H^2 = I_1^2\omega_1^2 + I_2^2\omega_2^2 + I_3^2\omega_3^2$ (indeed the whole vector $\mathbf{H}$ is fixed in inertial space), and the rotational kinetic energy $2T = I_1\omega_1^2 + I_2\omega_2^2 + I_3\omega_3^2$, for a rigid body. The motion of $\boldsymbol{\omega}$ in the body frame is confined to the intersection of these two ellipsoids — Poinsot's geometric picture.

## Torque-free motion of an axisymmetric spacecraft {#sec-torque-free}

Many spacecraft are nearly axisymmetric: $I_1 = I_2 = I_t$ (transverse), $I_3 = I_s$ (spin axis). A spacecraft spun about its symmetry axis that is disturbed — by separation from the launcher, or a thruster misalignment — acquires a small transverse rate, and its motion becomes a **nutation** (coning).

::: proposition Torque-free axisymmetric motion {#prop-nutation}
For $I_1 = I_2 = I_t$, $I_3 = I_s$ and $\mathbf{M} = \mathbf{0}$:
1. the spin rate $\omega_3 = \omega_s$ is constant, and the transverse angular velocity $(\omega_1, \omega_2)$ rotates in the body frame at the rate
$$
\lambda = \frac{I_s - I_t}{I_t}\,\omega_s;
$$ {#eq-body-nutation}
2. in inertial space the symmetry axis cones about the fixed vector $\mathbf{H}$ at the constant **nutation angle** $\theta$ with $\tan\theta = I_t\omega_t/(I_s\omega_s)$, where $\omega_t$ is the (constant) transverse rate, and at the inertial **precession rate**
$$
\omega_p = \frac{H}{I_t}.
$$ {#eq-precession}
:::

::: proof
1. The third of [[#eq-euler]] gives $I_s\dot\omega_3 = 0$. The first two become $\dot\omega_1 = -\lambda\omega_2$, $\dot\omega_2 = \lambda\omega_1$ with $\lambda$ as stated, whose solution is a rotation of $(\omega_1, \omega_2)$ at rate $\lambda$ with constant magnitude $\omega_t$.
2. $\mathbf{H} = I_t(\omega_1\hat{\mathbf{e}}_1 + \omega_2\hat{\mathbf{e}}_2) + I_s\omega_s\hat{\mathbf{e}}_3$, so the angle between $\mathbf{H}$ and $\hat{\mathbf{e}}_3$ satisfies $\tan\theta = I_t\omega_t/(I_s\omega_s)$, constant. Writing $\mathbf{H} = I_t\boldsymbol{\omega} + (I_s - I_t)\omega_s\hat{\mathbf{e}}_3$ gives $\boldsymbol{\omega} = \mathbf{H}/I_t - [(I_s - I_t)\omega_s/I_t]\,\hat{\mathbf{e}}_3$. The symmetry axis moves as $\dot{\hat{\mathbf{e}}}_3 = \boldsymbol{\omega}\times\hat{\mathbf{e}}_3 = (\mathbf{H}/I_t)\times\hat{\mathbf{e}}_3$: a rotation about the fixed $\mathbf{H}$ at rate $H/I_t$.
:::

For an **oblate** body ($I_s > I_t$, a disc) $\lambda$ has the sign of $\omega_s$; for a **prolate** one ($I_s < I_t$, a pencil) the opposite. That distinction becomes decisive once energy dissipation is considered.

::: example A spin-stabilised spacecraft {#ex-spinner}
A drum-shaped spacecraft has $I_s = 500\ \mathrm{kg\,m^2}$ and $I_t = 300\ \mathrm{kg\,m^2}$ and spins at $6\ \mathrm{rpm}$. After separation it has a transverse rate $\omega_t = 0.05\ \mathrm{rad/s}$. Find the nutation angle, the body-frame nutation rate and the inertial precession rate.
::: solution
$\omega_s = 6 \times 2\pi/60 = 0.6283\ \mathrm{rad/s}$, $I_s\omega_s = 314.16$, $I_t\omega_t = 15.0\ \mathrm{N\,m\,s}$.

Nutation angle $\theta = \arctan(15.0/314.16) = 2.73^\circ$. $H = \sqrt{314.16^2 + 15.0^2} = 314.5\ \mathrm{N\,m\,s}$.

Body rate $\lambda = (500 - 300)/300 \times 0.6283 = 0.419\ \mathrm{rad/s}$ (period $15.0\ \mathrm{s}$); an accelerometer on the spacecraft would see a wobble at this frequency.

Precession rate $\omega_p = 314.5/300 = 1.048\ \mathrm{rad/s}$ (period $5.99\ \mathrm{s}$): the spin axis traces a cone of half-angle $2.73^\circ$ around $\mathbf{H}$ once every six seconds.

*Check:* for small $\theta$, $\omega_p \approx I_s\omega_s/I_t$, and indeed $\omega_p - \omega_s = 0.419 = \lambda$ — the body rotates relative to the coning motion at exactly the body-frame nutation rate, as kinematics requires. To remove the coning, spinners carry a **nutation damper** (a viscous ring or a pendulum) — which works only because the body is oblate, as the next section shows.
:::
:::

## Stability of spin {#sec-stability}

::: proposition Spin about the principal axes {#prop-spin-stability}
For a rigid body spinning freely about a principal axis at rate $\Omega$:
1. spin about the axis of largest or of smallest moment of inertia is stable — small perturbations oscillate;
2. spin about the intermediate axis is unstable — small perturbations grow as $e^{\sigma t}$ with, for spin about axis 2 with $I_1 < I_2 < I_3$,
$$
\sigma = \Omega\sqrt{\frac{(I_2 - I_1)(I_3 - I_2)}{I_1I_3}}.
$$ {#eq-intermediate}
3. If the body dissipates energy internally (flexing, sloshing fuel, a damper) while $\mathbf{H}$ stays fixed, the only spin that remains stable is about the axis of **largest** moment of inertia.
:::

::: proof
1–2. Let the body spin about axis 1 with $\omega_1 = \Omega + \delta_1$ and small $\omega_2$, $\omega_3$. To first order, [[#eq-euler]] gives $\dot\delta_1 = 0$ and
$$
\dot\omega_2 = \frac{I_3 - I_1}{I_2}\,\Omega\,\omega_3, \qquad \dot\omega_3 = \frac{I_1 - I_2}{I_3}\,\Omega\,\omega_2
\quad\Rightarrow\quad
\ddot\omega_2 = \frac{(I_3 - I_1)(I_1 - I_2)}{I_2I_3}\,\Omega^2\,\omega_2.
$$
The coefficient is negative — oscillation — when $I_1$ is the largest or the smallest of the three, and positive — exponential growth — when $I_1$ lies between the other two. Relabelling for spin about axis 2 gives [[#eq-intermediate]].
3. With $\mathbf{H}$ fixed, the kinetic energy of a body rotating about principal axis $k$ is $T = H^2/(2I_k)$, and for any motion $T \ge H^2/(2I_\text{max})$, with equality only for spin about the major axis. Dissipation lowers $T$ while $H$ is conserved, so the motion drifts towards the state of minimum energy — spin about the major axis — whatever axis it started on. (Strictly, this is an energy-sink argument, not a proof for every damper design, but it is confirmed by both analysis and flight experience.)
:::

The intermediate-axis instability can be seen by tossing a book or a phone into the air spinning about its middle axis: it flips over every turn or so. It is often called the Dzhanibekov effect, after the cosmonaut who filmed a spinning wing nut doing the same in orbit.

::: example The intermediate-axis flip {#ex-flip}
A body with $I_1 = 100$, $I_2 = 200$, $I_3 = 300\ \mathrm{kg\,m^2}$ is set spinning at $\Omega = 1.0\ \mathrm{rad/s}$ about axis 2, with small rates of $0.01\ \mathrm{rad/s}$ about the other two axes. Find the growth rate of the perturbation and estimate when the body flips; compare with spin about axes 1 and 3.
::: solution
Axis 2: $\sigma = 1.0\sqrt{(100)(100)/(100 \times 300)} = 0.577\ \mathrm{s^{-1}}$. The perturbation grows from $0.01$ to order $1$ (comparable with the spin) in about $\ln(100)/0.577 = 8\ \mathrm{s}$; numerical integration of the full nonlinear [[#eq-euler]] shows $\omega_2$ first reversing sign at $t = 10.9\ \mathrm{s}$, after which the body flips back and forth periodically.

Axis 3 (major): oscillation frequency $\Omega\sqrt{(I_3 - I_1)(I_3 - I_2)/(I_1I_2)} = 1.0\ \mathrm{rad/s}$, bounded. Axis 1 (minor): $\Omega\sqrt{(I_2 - I_1)(I_3 - I_1)/(I_2I_3)} = 0.577\ \mathrm{rad/s}$, bounded for a rigid body — but, by part 3 of [[#prop-spin-stability]], not for a real body that dissipates energy.

*Check:* the linear estimate ($8\ \mathrm{s}$ to grow a hundredfold) and the nonlinear flip time ($10.9\ \mathrm{s}$) agree in order of magnitude, as they should — the linearisation predicts growth, not the full flip.
:::
:::

::: warning Stable for a rigid body is not stable for a spacecraft {#warn-minor-axis}
Spin about the minor axis passes the rigid-body test and fails in practice. Every real spacecraft dissipates energy — propellant sloshes, antennas and booms flex, structures have damping — and energy dissipation turns a minor-axis spin into a tumble and finally into a flat spin about the major axis, on a time scale set by the damping (hours to weeks). The design rule for passive spinners is therefore: spin about the axis of *maximum* moment of inertia, preferably by a margin of at least 5–10 per cent, and remember that the inertia properties change as propellant is used and appendages deploy. A **dual-spin** spacecraft, with a spinning rotor and a despun platform, can relax this rule if the damping is placed on the despun part, which is how many tall, prolate communications satellites of the 1970s were stabilised.
:::

## The gravity-gradient torque {#sec-gravity-gradient}

The parts of a spacecraft nearer the Earth are pulled slightly harder than those farther away. The resulting torque tends to align the spacecraft's long axis with the local vertical — the reason the Moon keeps one face towards the Earth.

::: proposition Gravity-gradient torque {#prop-gg}
A spacecraft with inertia tensor $\mathbf{I}$ (about its centre of mass) at distance $R$ from the centre of a spherical Earth experiences the torque
$$
\mathbf{M}_{gg} = \frac{3\mu}{R^3}\,\hat{\mathbf{c}}\times(\mathbf{I}\hat{\mathbf{c}}),
$$ {#eq-gg}
where $\hat{\mathbf{c}}$ is the unit vector along the local vertical (either sign), to second order in the spacecraft's size relative to $R$. In a circular orbit $3\mu/R^3 = 3n^2$.
:::

::: proof
A mass element $\mathrm{d}m$ at $\boldsymbol{\rho}$ from the centre of mass is at $\mathbf{R} + \boldsymbol{\rho}$ from the Earth and feels $-\mu(\mathbf{R} + \boldsymbol{\rho})/\lvert\mathbf{R} + \boldsymbol{\rho}\rvert^3\,\mathrm{d}m$. Expanding for $\rho \ll R$,
$$
\frac{\mathbf{R} + \boldsymbol{\rho}}{\lvert\mathbf{R} + \boldsymbol{\rho}\rvert^3} \approx \frac{\mathbf{R} + \boldsymbol{\rho}}{R^3}\left(1 - \frac{3\,\mathbf{R}\cdot\boldsymbol{\rho}}{R^2}\right).
$$
The torque about the centre of mass is $\mathbf{M} = \int\boldsymbol{\rho}\times(\text{force})$. The term in $\mathbf{R}$ alone gives $-(\mu/R^3)\left(\int\boldsymbol{\rho}\,\mathrm{d}m\right)\times\mathbf{R} = \mathbf{0}$, because the origin is the centre of mass; the term in $\boldsymbol{\rho}$ gives $\boldsymbol{\rho}\times\boldsymbol{\rho} = \mathbf{0}$. What remains, to second order, is
$$
\mathbf{M} = \frac{3\mu}{R^5}\int(\mathbf{R}\cdot\boldsymbol{\rho})\,\boldsymbol{\rho}\times\mathbf{R}\,\mathrm{d}m = \frac{3\mu}{R^3}\int(\hat{\mathbf{c}}\cdot\boldsymbol{\rho})\,\boldsymbol{\rho}\times\hat{\mathbf{c}}\,\mathrm{d}m.
$$
Since $\mathbf{I}\hat{\mathbf{c}} = \int\left[\rho^2\hat{\mathbf{c}} - \boldsymbol{\rho}(\boldsymbol{\rho}\cdot\hat{\mathbf{c}})\right]\mathrm{d}m$, we have $\hat{\mathbf{c}}\times\mathbf{I}\hat{\mathbf{c}} = \int(\boldsymbol{\rho}\cdot\hat{\mathbf{c}})\,\boldsymbol{\rho}\times\hat{\mathbf{c}}\,\mathrm{d}m$, which is [[#eq-gg]]. The torque vanishes when $\hat{\mathbf{c}}$ is a principal axis ($\mathbf{I}\hat{\mathbf{c}}\parallel\hat{\mathbf{c}}$): the equilibria have a principal axis vertical.
:::

Consider the **pitch** motion of a spacecraft in a circular orbit, with body axis 1 nominally along the local vertical, axis 2 along-track and axis 3 along the orbit normal, rotated by a pitch angle $\theta$ about axis 3. Then $\hat{\mathbf{c}} = (\cos\theta, -\sin\theta, 0)$ in body axes, and [[#eq-gg]] gives $M_3 = -\tfrac32 n^2(I_2 - I_1)\sin 2\theta$. The orbiting reference frame turns at the constant rate $n$ about the same axis, so the inertial angular acceleration is just $\ddot\theta$ and
$$
I_3\ddot\theta + \tfrac32 n^2(I_2 - I_1)\sin 2\theta = 0, \qquad
\omega_\text{pitch} = n\sqrt{\frac{3(I_2 - I_1)}{I_3}} \ \ \text{(small }\theta\text{)}.
$$ {#eq-pitch}
Pitch is stable when $I_2 > I_1$: the axis of *smaller* moment of inertia points along the vertical. A long boom with a tip mass, pointing up or down, gives exactly that. (The full analysis of roll and yaw, which are coupled, adds the condition $I_3 > I_2 > I_1$ — the classical **Lagrange region** — for the simplest stable configuration.)

::: widget phaseplane
f: y
g: -1.5*k*sin(2*x)
x: -4, 4
y: -2.5, 2.5
sliders: k=0.95:0:1:0.05
caption: Gravity-gradient pitch motion [[#eq-pitch]] in the phase plane: pitch angle $\theta$ (rad, horizontal) against its rate in units of the orbital rate, $\mathrm{d}\theta/\mathrm{d}(nt)$ (vertical), for the inertia ratio $k = (I_2 - I_1)/I_3$ set by the slider. Closed curves round $\theta = 0$ and $\pm\pi$ are librations — the spacecraft rocks about the vertical, with either end of its long axis pointing down; the saddles at $\pm\pi/2$ (long axis horizontal) are unstable. Trajectories outside the separatrix tumble. With $k = 0.95$ (a slender boom) the small-amplitude libration frequency is $\sqrt{3k} = 1.69$ times the orbital rate. A disturbance larger than the separatrix height $\sqrt{3k}\,n$ — about $0.1^\circ$ per second in low orbit — tumbles the spacecraft, which is why gravity-gradient satellites need dampers and gentle deployment.
:::

::: example A gravity-gradient boom {#ex-gg-boom}
A small satellite in a $700\ \mathrm{km}$ circular orbit deploys a vertical boom with a tip mass, giving $I_1 = 20\ \mathrm{kg\,m^2}$ (vertical) and $I_2 = I_3 = 400\ \mathrm{kg\,m^2}$. Find its pitch libration period, and the largest gravity-gradient torque it can experience.
::: solution
$n = \sqrt{398\,600/7078^3} = 1.0602\times10^{-3}\ \mathrm{rad/s}$ (orbital period $98.8\ \mathrm{min}$). $\omega_\text{pitch} = n\sqrt{3 \times 380/400} = 1.688\,n = 1.790\times10^{-3}\ \mathrm{rad/s}$; period $58.5\ \mathrm{min}$.

Largest torque: $\tfrac32n^2(I_2 - I_1)\lvert\sin 2\theta\rvert \le 1.5 \times (1.0602\times10^{-3})^2 \times 380 = 6.4\times10^{-4}\ \mathrm{N\,m}$, at $\theta = 45^\circ$.

*Check:* the libration is undamped in [[#eq-pitch]], so a disturbed satellite would rock indefinitely; real gravity-gradient satellites add a damper (magnetic hysteresis rods or a damping boom). The torques are tiny — the force of a small coin's weight on a lever a few centimetres long — but act continuously, which is why they matter.
:::
:::

## Active attitude control {#sec-control}

**Reaction wheels** are electric motors driving flywheels. Commanding a wheel torque $-\mathbf{u}$ on the wheel applies $+\mathbf{u}$ to the body ([[#eq-euler-wheels]]), so three or more wheels give full three-axis control without propellant. They exchange momentum with the body; they cannot remove it. A secular external torque (from aerodynamic, radiation or gravity-gradient effects that do not average to zero) therefore accumulates in the wheels until they approach their maximum speed — **saturation** — and must be **desaturated** ("momentum dumping") by an external torque: thrusters, or in low orbit **magnetic torquers**, coils whose magnetic dipole $\mathbf{m}$ produces $\mathbf{m}\times\mathbf{B}$ in the Earth's field $\mathbf{B}$. **Control-moment gyroscopes** — wheels at constant speed whose axes are gimballed — produce larger torques for agile or large spacecraft (the International Space Station uses them).

::: proposition Rest-to-rest slew with limited torque {#prop-slew}
A rigid body of moment of inertia $I$ about a fixed axis, with control torque limited to $\lvert u\rvert \le T$, turns through an angle $\Theta$ from rest to rest in minimum time by applying $+T$ for the first half and $-T$ for the second (**bang–bang** control). The slew time and the peak angular momentum to be stored are
$$
t_\text{slew} = 2\sqrt{\frac{I\Theta}{T}}, \qquad h_\text{peak} = \sqrt{IT\Theta}.
$$ {#eq-slew}
:::

::: proof
With constant acceleration $\alpha = T/I$ for time $t/2$ the body turns through $\tfrac12\alpha(t/2)^2$ and reaches rate $\alpha t/2$; the symmetric deceleration phase turns it through the same angle. So $\Theta = \alpha t^2/4$, giving $t = 2\sqrt{I\Theta/T}$. The peak rate is $\alpha t/2 = \sqrt{T\Theta/I}$, and the peak body momentum — equal and opposite to what the wheels must absorb — is $I$ times that. That bang–bang is time-optimal follows from Pontryagin's maximum principle, or from the observation that any other admissible torque history reaches lower speeds at every instant of the acceleration phase. Assumptions: single-axis rotation (no gyroscopic coupling, valid for slow slews), rigid body, torque available instantly.
:::

For pointing and small corrections the standard law is **proportional–derivative** (PD) feedback on the attitude error $\theta$:
$$
u = -K_p\theta - K_d\dot\theta \quad\Rightarrow\quad I\ddot\theta + K_d\dot\theta + K_p\theta = 0,
$$ {#eq-pd}
a damped oscillator with natural frequency $\omega_n = \sqrt{K_p/I}$ and damping ratio $\zeta = K_d/(2\sqrt{K_pI})$; the gains are chosen as $K_p = I\omega_n^2$, $K_d = 2\zeta\omega_nI$, and the 2 % settling time is about $4/(\zeta\omega_n)$. In practice the attitude error is measured with star trackers, sun sensors and gyroscopes, and for three-axis control is expressed as a quaternion or a small-angle vector rather than a single angle.

::: example Slewing a space telescope {#ex-slew}
A spacecraft with $I = 1000\ \mathrm{kg\,m^2}$ about the slew axis has reaction wheels that can deliver $0.2\ \mathrm{N\,m}$. (a) How long does a $30^\circ$ rest-to-rest slew take, and how much momentum must the wheels store? (b) A PD controller is designed with $\omega_n = 0.1\ \mathrm{rad/s}$ and $\zeta = 0.7$. Find the gains and the settling time, and the torque it would demand for an initial error of $10^\circ$.
::: solution
(a) $\Theta = 0.5236\ \mathrm{rad}$. $t = 2\sqrt{1000 \times 0.5236/0.2} = 2 \times 51.2 = 102\ \mathrm{s}$; $h_\text{peak} = \sqrt{1000 \times 0.2 \times 0.5236} = 10.2\ \mathrm{N\,m\,s}$. A wheel of inertia $0.05\ \mathrm{kg\,m^2}$ must then spin at $10.2/0.05 = 205\ \mathrm{rad/s}$, about $1950\ \mathrm{rpm}$, on top of any momentum already stored.

(b) $K_p = 1000 \times 0.01 = 10\ \mathrm{N\,m/rad}$, $K_d = 2 \times 0.7 \times 0.1 \times 1000 = 140\ \mathrm{N\,m\,s/rad}$, settling time $4/0.07 = 57\ \mathrm{s}$. For a $10^\circ$ ($0.1745\ \mathrm{rad}$) error, the initial demand is $10 \times 0.1745 = 1.75\ \mathrm{N\,m}$ — nearly nine times what the wheels can deliver.

*Check:* the PD design would saturate the actuators on a large step, so large slews are performed by commanding a feasible trajectory (such as the bang–bang or a smoothed version of it) and using PD feedback only to track it. The slow, deliberate slews of large telescopes — minutes for tens of degrees — are set by exactly this momentum and torque budget.
:::
:::

::: widget plot
f: 1 - exp(-z*w*x)*(cos(w*sqrt(1 - z^2)*x) + z/sqrt(1 - z^2)*sin(w*sqrt(1 - z^2)*x)); 1
x: 0, 150
y: 0, 1.6
sliders: z=0.7:0.1:0.95:0.05; w=0.1:0.03:0.4:0.01
labels: \theta/\theta_\text{cmd}; \text{target}
caption: Response of a PD-controlled spacecraft axis [[#eq-pd]] to a small commanded attitude change, against time in seconds, for damping ratio $\zeta$ (slider z) and natural frequency $\omega_n$ (slider w, rad/s). At $\zeta = 0.7$, $\omega_n = 0.1$ ([[#ex-slew]]) the response settles in about a minute with $5\,\%$ overshoot. Low damping rings; raising $\omega_n$ speeds the response but raises the torque demand in proportion to $\omega_n^2$ — the trade-off between agility and actuator size.
:::

::: example Dumping momentum magnetically {#ex-dump}
After the slew of [[#ex-slew]] the wheels hold a residual $10\ \mathrm{N\,m\,s}$ from accumulated disturbances. Magnetic torquers with a dipole of $100\ \mathrm{A\,m^2}$ act in a field of $3\times10^{-5}\ \mathrm{T}$ (typical of low orbit). Estimate the shortest possible dumping time.
::: solution
Maximum torque $mB = 100 \times 3\times10^{-5} = 3\times10^{-3}\ \mathrm{N\,m}$ (dipole perpendicular to the field). Time $\ge 10/3\times10^{-3} = 3300\ \mathrm{s} \approx 56\ \mathrm{min}$.

*Check:* magnetic torque is always perpendicular to $\mathbf{B}$, so the momentum component along the field cannot be removed at a given instant; only as the field direction changes around the orbit can all three components be dumped. Real dumping therefore takes one or more orbits, and the momentum budget must allow for it.
:::
:::

::: quiz
A satellite was designed to spin about its long (minimum-inertia) axis and carries four flexible wire antennas. Which statements are correct?
- [x] Its angular momentum vector stays fixed in space while no external torque acts.
- [x] Its kinetic energy decreases as the antennas flex and dissipate energy.
- [x] It will end up spinning about the axis of maximum moment of inertia — a flat spin.
- [ ] It is stable because spin about the minimum-inertia axis is stable for a rigid body.
::: solution
With $\mathbf{H}$ conserved and energy dissipated, the motion moves towards the minimum-energy state for that $\mathbf{H}$, which is spin about the major axis; the rigid-body stability of minor-axis spin is irrelevant once the body is not rigid. This is what happened to Explorer 1.
:::
:::

::: history
Leonhard Euler set out the equations of rigid-body rotation that bear his name in *Theoria motus corporum solidorum seu rigidorum* (1765), and Louis Poinsot gave the geometric description of torque-free motion in 1834. The first American satellite, Explorer 1, launched on 31 January 1958, was spun about its long axis; within its first orbit it began to nutate, and the coning grew until it was tumbling. Ronald Bracewell and Owen Garriott explained the behaviour in *Nature* later that year ("Rotation of artificial Earth satellites", 1958): the flexible whip antennas dissipated energy, driving the spin towards the axis of maximum moment of inertia. The lesson — spin about the major axis, or provide active control — has been part of every spacecraft design since.
:::

## Where this leads {#sec-next}

Three-axis attitude determination combines star trackers, sun sensors, magnetometers and gyroscopes, usually through a Kalman filter; attitude is represented by quaternions to avoid the singularities of Euler angles ([[dynamics/three-dimensional-dynamics]]). The PD law here is the simplest instance of the feedback design treated in [[control-systems/pid-control]]; flexible appendages, fuel slosh and the gyroscopic coupling ignored in [[#prop-slew]] are the subjects of advanced spacecraft-control texts such as Wie and Schaub and Junkins. The perturbing torques — gravity gradient, aerodynamic, radiation, magnetic — come from the same environment as the orbital perturbations of [[orbital-mechanics/perturbations]].

::: summary
- Euler's equations in principal axes: $I_1\dot\omega_1 - (I_2 - I_3)\omega_2\omega_3 = M_1$ and cyclic; with wheels, $\mathbf{I}\dot{\boldsymbol{\omega}} + \dot{\mathbf{h}}_w + \boldsymbol{\omega}\times(\mathbf{I}\boldsymbol{\omega} + \mathbf{h}_w) = \mathbf{M}$.
- Torque-free axisymmetric body: nutation angle $\tan\theta = I_t\omega_t/(I_s\omega_s)$, body-frame rate $(I_s - I_t)\omega_s/I_t$, inertial precession rate $H/I_t$.
- Spin about the major or minor axis is stable for a rigid body, about the intermediate axis unstable (growth rate [[#eq-intermediate]]); with energy dissipation only major-axis spin is stable.
- Gravity-gradient torque $3n^2\,\hat{\mathbf{c}}\times\mathbf{I}\hat{\mathbf{c}}$; pitch libration at $n\sqrt{3(I_2 - I_1)/I_3}$, stable with the minimum-inertia axis vertical.
- Reaction wheels store momentum and need dumping (magnetic torquers, thrusters); bang–bang slew time $2\sqrt{I\Theta/T}$, peak momentum $\sqrt{IT\Theta}$; PD gains $K_p = I\omega_n^2$, $K_d = 2\zeta\omega_nI$.
:::

## Exercises

::: exercise Angular momentum of a spinner {level=1 check="838"}
A spacecraft with $I_s = 800\ \mathrm{kg\,m^2}$ spins at $10\ \mathrm{rpm}$ about its symmetry axis. Find its angular momentum. (Enter $H$ in N m s to three significant figures.)
::: solution
$\omega_s = 10 \times 2\pi/60 = 1.0472\ \mathrm{rad/s}$; $H = 800 \times 1.0472 = 838\ \mathrm{N\,m\,s}$. Tilting this vector by $1^\circ$ requires an angular impulse of $838 \times 0.01745 = 14.6\ \mathrm{N\,m\,s}$ — the "gyroscopic stiffness" that makes spinners resist disturbances.
:::
:::

::: exercise Nutation angle {level=1 check="1.46"}
A spacecraft with $I_s = 1200$, $I_t = 800\ \mathrm{kg\,m^2}$ spins at $5\ \mathrm{rpm}$ and has a transverse rate of $0.02\ \mathrm{rad/s}$. Find the nutation angle, the body-frame nutation rate and the inertial precession rate. (Enter $\theta$ in degrees to three significant figures.)
::: solution
$\omega_s = 0.5236\ \mathrm{rad/s}$, $\tan\theta = 800 \times 0.02/(1200 \times 0.5236) = 16/628.3 = 0.02546$, $\theta = 1.46^\circ$. $\lambda = (400/800) \times 0.5236 = 0.262\ \mathrm{rad/s}$; $H = 628.5\ \mathrm{N\,m\,s}$, $\omega_p = 628.5/800 = 0.786\ \mathrm{rad/s}$.
:::
:::

::: exercise Intermediate-axis growth {level=2 check="22.6"}
A body with principal moments $400$, $500$ and $600\ \mathrm{kg\,m^2}$ spins at $0.5\ \mathrm{rad/s}$ about the $500\ \mathrm{kg\,m^2}$ axis. How long does a small perturbation take to grow tenfold, according to the linearised equations? (Enter the time in seconds to three significant figures.)
::: solution
$\sigma = 0.5\sqrt{(100)(100)/(400 \times 600)} = 0.5 \times 0.2041 = 0.1021\ \mathrm{s^{-1}}$; $t = \ln 10/\sigma = 22.6\ \mathrm{s}$.
:::
:::

::: exercise Pitch libration period {level=2 check="59.8"}
A satellite in a circular orbit at $500\ \mathrm{km}$ altitude has $I_1 = 50$ (vertical), $I_2 = 250$ (along-track) and $I_3 = 240\ \mathrm{kg\,m^2}$ (orbit normal). Find the period of small pitch librations. (Enter it in minutes to three significant figures.)
::: solution
$n = \sqrt{398\,600/6878^3} = 1.1068\times10^{-3}\ \mathrm{rad/s}$ (orbital period $94.6\ \mathrm{min}$). $\omega_\text{pitch} = n\sqrt{3 \times 200/240} = 1.581\,n$; period $94.6/1.581 = 59.8\ \mathrm{min}$.
:::
:::

::: exercise A gravity-gradient disturbance {level=2 check="1.83e-4"}
An Earth-pointing satellite in a $600\ \mathrm{km}$ circular orbit has moments of inertia $900$ and $300\ \mathrm{kg\,m^2}$ about its along-track and vertical axes, and is held pitched $5^\circ$ away from the gravity-gradient equilibrium to point an instrument. What constant torque must the wheels supply? (Enter it in N m to three significant figures; an expression such as `1.83e-4` is accepted.)
::: solution
$n = 1.0831\times10^{-3}\ \mathrm{rad/s}$. $M = \tfrac32n^2(I_2 - I_1)\sin 2\theta = 1.5 \times 1.1731\times10^{-6} \times 600 \times \sin 10^\circ = 1.83\times10^{-4}\ \mathrm{N\,m}$. Over one $97\ \mathrm{min}$ orbit this accumulates $1.06\ \mathrm{N\,m\,s}$ of wheel momentum, which must be dumped periodically.
:::
:::

::: exercise A quarter-turn slew {level=2 check="177"}
A spacecraft with $I = 2500\ \mathrm{kg\,m^2}$ and $0.5\ \mathrm{N\,m}$ of wheel torque must slew $90^\circ$ from rest to rest. Find the minimum time and the peak momentum stored. (Enter the time in seconds to three significant figures.)
::: solution
$t = 2\sqrt{2500 \times 1.5708/0.5} = 2 \times 88.6 = 177\ \mathrm{s}$; $h_\text{peak} = \sqrt{2500 \times 0.5 \times 1.5708} = 44.3\ \mathrm{N\,m\,s}$.
:::
:::

::: exercise PD gains from a settling time {level=2 check="53.3"}
Design a PD attitude controller for an axis with $I = 400\ \mathrm{kg\,m^2}$ that settles (2 %) in $60\ \mathrm{s}$ with $\zeta = 0.8$. Find $K_p$ and $K_d$. (Enter $K_d$ in N m s/rad to three significant figures.)
::: solution
$\omega_n = 4/(\zeta t_s) = 4/48 = 0.0833\ \mathrm{rad/s}$. $K_p = I\omega_n^2 = 2.78\ \mathrm{N\,m/rad}$, $K_d = 2\zeta\omega_nI = 2 \times 0.8 \times 0.0833 \times 400 = 53.3\ \mathrm{N\,m\,s/rad}$.
:::
:::

::: exercise Magnetic momentum dumping {level=1 check="417"}
Magnetic torquers of dipole $50\ \mathrm{A\,m^2}$ in a field of $2\times10^{-5}\ \mathrm{T}$ are used to remove $25\ \mathrm{N\,m\,s}$ from the wheels. What is the shortest possible dumping time? (Enter it in minutes to three significant figures.)
::: solution
$T_\text{max} = 50 \times 2\times10^{-5} = 10^{-3}\ \mathrm{N\,m}$; $t \ge 25/10^{-3} = 25\,000\ \mathrm{s} = 417\ \mathrm{min}$, about four orbits in low orbit — and longer in practice, because the dipole cannot always be perpendicular to the field in the required direction.
:::
:::

::: exercise Design: choosing a stabilisation scheme {level=3}
For each mission, choose between spin stabilisation, gravity-gradient stabilisation and three-axis control with reaction wheels, and justify the choice with the results of this chapter: (a) a low-cost satellite measuring the magnetic field in all directions; (b) an Earth-imaging satellite needing $0.01^\circ$ pointing; (c) a student satellite needing only rough Earth pointing ($\pm10^\circ$) for an antenna, with no budget for wheels.
::: solution
(a) Spin stabilisation: gyroscopic stiffness ($H$ large) keeps the spin axis fixed in space with no active control, and the spin sweeps the sensors through all directions. Spin about the major axis ([[#prop-spin-stability]]), with a nutation damper. (b) Three-axis control with reaction wheels and star trackers: only active control reaches $0.01^\circ$; wheels provide fine, propellant-free torque, with magnetic torquers for dumping the secular momentum (including the gravity-gradient torque on the off-nadir pointing configuration, as in the exercise above). (c) Gravity gradient: a deployable boom makes the vertical axis the minimum-inertia axis ([[#eq-pitch]]); a damper (magnetic hysteresis rods) removes the librations, and the pointing is a few degrees to $10^\circ$ — adequate for an antenna. Risk: the satellite can settle upside down (both $\theta = 0$ and $\pi$ are stable), so the antenna pattern or the deployment sequence must allow for it.
:::
:::
