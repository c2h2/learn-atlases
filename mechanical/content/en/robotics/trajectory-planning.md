Inverse kinematics tells a robot *where* its joints must be; a trajectory tells it *when*. A controller cannot be handed a list of poses and told to jump between them: the motors have torque limits, the links have flexibility, the gearboxes have backlash, and the payload may be a full glass of water. A **trajectory** is a time-parametrised reference $\mathbf q_d(t)$ (or $T_d(t)$ in task space) that is smooth enough to be followed — continuous position and velocity at least, usually continuous acceleration — and respects the limits on velocity and acceleration of every joint. This chapter separates the geometric question (the **path**: which curve) from the timing question (the **time scaling**: how fast along it), derives the cubic and quintic polynomial time scalings and the trapezoidal velocity profile used by almost every industrial controller, connects several via points with cubic splines, and plans straight-line Cartesian paths with orientation interpolated by slerp. It ends with the choice between joint-space and task-space planning, and with the limits that singularities and joint ranges impose on Cartesian paths. The kinematics comes from [[robotics/forward-kinematics]] and [[robotics/inverse-kinematics]]; the trajectories produced here are the inputs of the controllers in [[robotics/robot-control]].

## Paths, trajectories and time scaling {#sec-time-scaling}

::: definition Path, time scaling and trajectory {#def-trajectory}
A **path** is a curve $\boldsymbol\theta(s)$, $s\in[0,1]$, in configuration space (or $\mathbf x(s)$ in task space) from the start $\boldsymbol\theta(0)$ to the goal $\boldsymbol\theta(1)$. A **time scaling** is a non-decreasing function $s(t)$ with $s(0) = 0$ and $s(T) = 1$, where $T$ is the duration. The **trajectory** is the composition $\boldsymbol\theta(s(t))$, $t\in[0, T]$. By the chain rule its velocity and acceleration are
$$
\dot{\boldsymbol\theta} = \frac{d\boldsymbol\theta}{ds}\,\dot s,\qquad \ddot{\boldsymbol\theta} = \frac{d\boldsymbol\theta}{ds}\,\ddot s + \frac{d^2\boldsymbol\theta}{ds^2}\,\dot s^2 .
$$ {#eq-chain}
:::

For a **straight-line path in joint space**, $\boldsymbol\theta(s) = \boldsymbol\theta_0 + s(\boldsymbol\theta_1 - \boldsymbol\theta_0)$, the second derivative vanishes and every joint simply follows the scalar profile $s(t)$ scaled by its own displacement: $\dot\theta_i = \Delta\theta_i\,\dot s$, $\ddot\theta_i = \Delta\theta_i\,\ddot s$. All joints start and stop together — the **synchronised** point-to-point move that industrial controllers call a joint (PTP) move. Designing a point-to-point motion therefore reduces to designing one scalar function $s(t)$.

The separation of path and timing is not only a convenience: a path can be checked for collisions and joint limits once, and then re-timed (faster, slower, slowed down near an obstacle or a human) without re-planning it.

## Polynomial time scalings {#sec-polynomial}

The simplest smooth time scalings are polynomials whose coefficients are fixed by the boundary conditions. Write $\tau = t/T\in[0,1]$ for normalised time.

::: proposition Cubic and quintic time scalings {#prop-polynomials}
(a) The unique cubic with $s(0) = 0$, $s(T) = 1$, $\dot s(0) = \dot s(T) = 0$ is
$$
s(t) = 3\tau^2 - 2\tau^3,\qquad \dot s_{\max} = \frac{3}{2T}\ \text{at } \tau = \tfrac12,\qquad \lvert\ddot s\rvert_{\max} = \frac{6}{T^2}\ \text{at } \tau = 0, 1 .
$$ {#eq-cubic}
(b) The unique quintic that also has $\ddot s(0) = \ddot s(T) = 0$ is
$$
s(t) = 10\tau^3 - 15\tau^4 + 6\tau^5,\qquad \dot s_{\max} = \frac{15}{8T},\qquad \lvert\ddot s\rvert_{\max} = \frac{10}{\sqrt3\,T^2}\ \text{at } \tau = \tfrac12 \mp \tfrac{\sqrt3}{6} .
$$ {#eq-quintic}
:::

::: proof
(a) Write $s = a_0 + a_1\tau + a_2\tau^2 + a_3\tau^3$; then $ds/d\tau = a_1 + 2a_2\tau + 3a_3\tau^2$ and $\dot s = (ds/d\tau)/T$. The conditions at $\tau = 0$ give $a_0 = 0$, $a_1 = 0$; at $\tau = 1$, $a_2 + a_3 = 1$ and $2a_2 + 3a_3 = 0$, so $a_3 = -2$, $a_2 = 3$. Four conditions, four coefficients, a non-singular linear system: unique. $ds/d\tau = 6\tau - 6\tau^2$ is maximal at $\tau = \frac12$ with value $\frac32$, so $\dot s_{\max} = 3/(2T)$. $d^2s/d\tau^2 = 6 - 12\tau$ is linear, largest in magnitude at the ends, $\pm6$, giving $6/T^2$.
(b) With $a_0 = a_1 = a_2 = 0$ from the conditions at $\tau = 0$, the conditions at $\tau = 1$ are $a_3 + a_4 + a_5 = 1$, $3a_3 + 4a_4 + 5a_5 = 0$, $6a_3 + 12a_4 + 20a_5 = 0$, whose solution is $(a_3, a_4, a_5) = (10, -15, 6)$ (substitute to check: $10 - 15 + 6 = 1$, $30 - 60 + 30 = 0$, $60 - 180 + 120 = 0$). Then $ds/d\tau = 30\tau^2(1-\tau)^2$, maximal at $\tau = \frac12$ with value $\frac{30}{16} = \frac{15}{8}$. Next $d^2s/d\tau^2 = 60\tau - 180\tau^2 + 120\tau^3 = 60\tau(1-\tau)(1-2\tau)$; its extrema satisfy $d^3s/d\tau^3 = 60 - 360\tau + 360\tau^2 = 0$, i.e. $\tau = \frac12 \mp \frac{\sqrt3}{6}$, where $\tau(1-\tau) = \frac16$ and $1 - 2\tau = \pm\frac{1}{\sqrt3}$, giving $\lvert d^2s/d\tau^2\rvert = 60\cdot\frac16\cdot\frac1{\sqrt3} = \frac{10}{\sqrt3}$.
:::

The cubic has a jump in acceleration at start and end — from zero to $6/T^2$ instantaneously — which means infinite jerk and a sudden step in motor torque that can excite vibration. The quintic starts and ends with zero acceleration at the price of a 25% higher peak velocity ($15/8$ against $3/2$). The quintic's peak acceleration ($5.77/T^2$) is actually *slightly lower* than the cubic's ($6/T^2$), because the cubic spends its acceleration at the very start.

::: example A cubic and a quintic joint move {#ex-poly}
A joint must move from $20^\circ$ to $80^\circ$ in $T = 2.0\,\mathrm s$, starting and ending at rest. Give $q(t)$ for a cubic and a quintic time scaling and the peak velocity and acceleration of each.
::: solution
$\Delta q = 60^\circ$ and $q(t) = 20^\circ + 60^\circ\,s(t)$.
*Cubic:* $q(t) = 20 + 60(3\tau^2 - 2\tau^3)$ with $\tau = t/2$, i.e. $q(t) = 20 + 45t^2 - 15t^3$ (degrees, seconds). Peak velocity $60\times\frac{3}{2\times2} = 45^\circ/\mathrm s$ at $t = 1\,\mathrm s$; peak acceleration $60\times\frac{6}{4} = 90^\circ/\mathrm s^2$ at $t = 0$ and (deceleration) at $t = 2\,\mathrm s$. Check: $\dot q = 90t - 45t^2$, at $t = 1$: $45^\circ/\mathrm s$ ✓; $\ddot q(0) = 90^\circ/\mathrm s^2$ ✓.
*Quintic:* $q(t) = 20 + 60(10\tau^3 - 15\tau^4 + 6\tau^5)$. Peak velocity $60\times\frac{15}{8\times2} = 56.25^\circ/\mathrm s$; peak acceleration $60\times\frac{10}{\sqrt3\times4} = 86.60^\circ/\mathrm s^2$ at $t = 2(0.5 - 0.2887) = 0.423\,\mathrm s$, with zero acceleration at both ends.
In radians the cubic's peaks are $0.785\,\mathrm{rad/s}$ and $1.571\,\mathrm{rad/s^2}$. Sanity check by averages: the mean velocity is $60/2 = 30^\circ/\mathrm s$, and both profiles peak at 1.5–1.9 times the mean, as a smooth bell-shaped profile must.
:::
:::

::: widget plot
f: 3x^2 - 2x^3; 10x^3 - 15x^4 + 6x^5; 6x - 6x^2; 30x^2 - 60x^3 + 30x^4
x: 0, 1
y: 0, 2
labels: s\ \text{cubic}; s\ \text{quintic}; ds/d\tau\ \text{cubic}; ds/d\tau\ \text{quintic}
caption: Normalised position $s$ and velocity $ds/d\tau$ against normalised time $\tau = t/T$ for the cubic and quintic time scalings (multiply velocities by $\Delta q/T$ for real units). Both positions run from 0 to 1 and both velocities start and end at zero. The quintic's velocity starts flat — zero slope, i.e. zero acceleration — and peaks higher ($1.875$ against $1.5$). Look at the slope of the cubic's velocity at $\tau = 0$: it is 6, an instantaneous step in acceleration.
:::

### Non-zero boundary velocities and via points

Long motions often pass through intermediate **via points** without stopping. The cubic with prescribed end velocities $v_0, v_f$ over a segment of duration $T$ is
$$
q(t) = q_0 + v_0t + a_2t^2 + a_3t^3,\qquad a_2 = \frac{3(q_f - q_0) - (2v_0 + v_f)T}{T^2},\qquad a_3 = \frac{-2(q_f - q_0) + (v_0 + v_f)T}{T^3},
$$ {#eq-cubic-velocities}
obtained exactly as in [[#prop-polynomials]] from $q(T) = q_f$, $\dot q(T) = v_f$. Chaining such cubics with matching velocities at the via points gives a trajectory with continuous velocity but generally discontinuous acceleration. Choosing the via-point velocities so that the *accelerations* also match gives a **cubic spline**: with $N$ segments, continuity of acceleration at the $N-1$ interior points plus two end conditions determines all via velocities through a tridiagonal linear system ([interpolation in Maths Atlas](/learn/maths/lesson.php?c=numerical-analysis&l=interpolation)).

::: example A clamped cubic spline through a via point {#ex-spline}
A joint must start at $0^\circ$ at rest at $t = 0$, pass through $40^\circ$ at $t = 1\,\mathrm s$, and stop at $30^\circ$ at $t = 3\,\mathrm s$. Find the cubic spline with continuous acceleration.
::: solution
Unknown: the via velocity $v_1$. Segment A ($0\le t\le1$, $T_A = 1$) from $0^\circ$ to $40^\circ$ with velocities $0, v_1$; segment B ($T_B = 2$) from $40^\circ$ to $30^\circ$ with velocities $v_1, 0$. From [[#eq-cubic-velocities]] the acceleration at the end of A is $2a_2^A + 6a_3^AT_A$ and at the start of B is $2a_2^B$:
$$
a_2^A = 120 - v_1,\quad a_3^A = -80 + v_1,\quad \ddot q_A(1) = 2(120 - v_1) + 6(-80 + v_1) = -240 + 4v_1,
$$
$$
a_2^B = \frac{3(-10) - 2v_1(2)}{4} = -7.5 - v_1,\qquad \ddot q_B(0) = -15 - 2v_1 .
$$
Equating: $-240 + 4v_1 = -15 - 2v_1$, so $v_1 = 37.5^\circ/\mathrm s$ and the acceleration at the via point is $-90^\circ/\mathrm s^2$. The segments are
$$
q_A(t) = 82.5t^2 - 42.5t^3,\qquad q_B(t) = 40 + 37.5(t-1) - 45(t-1)^2 + 11.875(t-1)^3 .
$$
Checks: $q_A(1) = 82.5 - 42.5 = 40$ ✓; $q_B(3) = 40 + 75 - 180 + 95 = 30$ ✓; $\dot q_B(3) = 37.5 - 180 + 142.5 = 0$ ✓. The largest acceleration is $165^\circ/\mathrm s^2$ at $t = 0$, and the trajectory overshoots slightly beyond $40^\circ$ after the via point (maximum $49.0^\circ$ at $t = 1.53\,\mathrm s$) before settling to $30^\circ$ — splines pass *through* via points with non-zero velocity, so they can overshoot. If the overshoot is unacceptable (a joint limit at $45^\circ$, say), the via timing must be changed.
:::
:::

## The trapezoidal velocity profile {#sec-trapezoid}

Polynomials fix the duration and let the peaks fall where they may. Industrial controllers usually do the opposite: given limits $v_{\max}$ and $a_{\max}$, move as fast as possible. The minimum-time profile under those two limits accelerates at $a_{\max}$, cruises at $v_{\max}$, and decelerates at $a_{\max}$ — a **trapezoidal velocity profile** (constant-acceleration segments joined to a constant-velocity segment, also called linear segments with parabolic blends).

::: proposition Minimum-time trapezoidal motion {#prop-trapezoid}
A rest-to-rest motion of distance $D > 0$ with $\lvert\dot q\rvert\le v_{\max}$ and $\lvert\ddot q\rvert\le a_{\max}$ takes at least
$$
T = \begin{cases}\dfrac{D}{v_{\max}} + \dfrac{v_{\max}}{a_{\max}}, & D \ge \dfrac{v_{\max}^2}{a_{\max}}\quad\text{(trapezoid)},\\[2ex] 2\sqrt{\dfrac{D}{a_{\max}}}, & D < \dfrac{v_{\max}^2}{a_{\max}}\quad\text{(triangle, peak speed } \sqrt{a_{\max}D}),\end{cases}
$$ {#eq-trapezoid}
and the bound is achieved by the bang–coast–bang profile: acceleration $a_{\max}$ for $t_a = v_{\max}/a_{\max}$, cruise, then deceleration $a_{\max}$ (trapezoid), or $a_{\max}$ then $-a_{\max}$ for $\sqrt{D/a_{\max}}$ each (triangle).
:::

::: proof
*Lower bound.* Let $v(t)\ge0$ be any admissible velocity profile with $v(0) = v(T) = 0$. Because $\lvert\dot v\rvert\le a_{\max}$, $v(t)\le a_{\max}t$ (it cannot have risen faster) and $v(t)\le a_{\max}(T - t)$ (it must still be able to stop); also $v(t)\le v_{\max}$. Hence $D = \int_0^Tv\,dt \le \int_0^T\min\{a_{\max}t,\ v_{\max},\ a_{\max}(T - t)\}\,dt$. The right side is the area under the trapezoid (or triangle) of duration $T$; it increases with $T$, so the smallest $T$ for which it reaches $D$ is a lower bound on the duration.
*Evaluating it.* If $T \ge 2v_{\max}/a_{\max}$, the cap $v_{\max}$ is reached and the area is that of a trapezoid with ramps of duration $t_a = v_{\max}/a_{\max}$: $v_{\max}(T - t_a)$. Setting it equal to $D$ gives $T = D/v_{\max} + v_{\max}/a_{\max}$, consistent with $T \ge 2t_a$ exactly when $D \ge v_{\max}^2/a_{\max}$. Otherwise the area is a triangle, $a_{\max}(T/2)^2$, equal to $D$ when $T = 2\sqrt{D/a_{\max}}$, with peak $a_{\max}T/2 = \sqrt{a_{\max}D}$ (less than $v_{\max}$ precisely in this case).
*Achievability.* The profile equal to the bound $\min\{a_{\max}t, v_{\max}, a_{\max}(T - t)\}$ is itself admissible, so the bound is attained.
:::

::: example A fastest joint move and synchronisation {#ex-trapezoid}
Two joints of an arm must move by $\Delta q_1 = 90^\circ$ and $\Delta q_2 = 30^\circ$; both have $v_{\max} = 60^\circ/\mathrm s$ and $a_{\max} = 120^\circ/\mathrm s^2$. Find the minimum time of each joint alone, then a synchronised motion in which both start and stop together along a straight line in joint space.
::: solution
The threshold distance is $v_{\max}^2/a_{\max} = 3600/120 = 30^\circ$, and $t_a = 60/120 = 0.5\,\mathrm s$.
*Joint 1:* $90^\circ \ge 30^\circ$, trapezoid: $T_1 = 90/60 + 0.5 = 2.0\,\mathrm s$, with $0.5\,\mathrm s$ of acceleration (covering $\frac12\times120\times0.5^2 = 15^\circ$), $1.0\,\mathrm s$ of cruise ($60^\circ$) and $0.5\,\mathrm s$ of deceleration ($15^\circ$): $15 + 60 + 15 = 90^\circ$ ✓.
*Joint 2:* exactly at the threshold, so the cruise phase has zero length: $T_2 = 30/60 + 0.5 = 1.0\,\mathrm s = 2\sqrt{30/120}$ ✓ (both formulas agree at the boundary).
*Synchronised:* the slower joint sets the duration, $T = 2.0\,\mathrm s$. Joint 2 uses the same normalised profile $s(t)$ as joint 1, scaled by $30/90 = \frac13$: it accelerates at $40^\circ/\mathrm s^2$ to $20^\circ/\mathrm s$, cruises, and decelerates — well inside its limits. The tool then moves along the joint-space straight line, and both motors share the same timing, which simplifies supervision and makes the path independent of the speed override.
:::
:::

::: widget plot
f: max(0, if(D >= vm^2/a, min(a*x, vm, a*(D/vm + vm/a - x)), min(a*x, a*(2*sqrt(D/a) - x))))
x: 0, 4
y: 0, 2
sliders: D=1.5:0.1:4:0.05; vm=1:0.2:2:0.05; a=2:0.5:6:0.1
labels: \dot q(t)\ \text{(rad/s)}
caption: Minimum-time velocity profile for a rest-to-rest move of $D$ radians with limits $v_{\max}$ and $a_{\max}$ (time in seconds on the horizontal axis). The area under the curve is always $D$. Shrink $D$ below $v_{\max}^2/a_{\max}$ and the cruise phase disappears: the trapezoid becomes a triangle whose peak no longer reaches $v_{\max}$. Raising $a_{\max}$ helps short moves a lot and long moves little — for long moves the duration is dominated by $D/v_{\max}$.
:::

The trapezoid has discontinuous acceleration at four instants (infinite jerk). Controllers for high-speed or vibration-sensitive machines replace each corner by a constant-jerk ramp, giving the seven-segment **S-curve** profile with an additional jerk limit $j_{\max}$; the minimum-time reasoning of [[#prop-trapezoid]] extends directly, at the cost of more cases.

::: warning A smooth joint trajectory can still violate limits
A time scaling chosen by duration (polynomials) says nothing about limits: halve $T$ and the cubic's peak velocity doubles and its peak acceleration quadruples ($\propto 1/T^2$). Always compute the peaks — $\Delta q\cdot\dot s_{\max}$ and $\Delta q\cdot\ddot s_{\max}$ — for *every* joint and stretch $T$ until the most limited joint is satisfied. Splines through via points can also overshoot between knots ([[#ex-spline]]) and so break a joint limit that every knot respects. Finally, velocity and acceleration limits are a proxy for the real limit, motor torque, which depends on configuration and speed through the dynamics of [[robotics/manipulator-dynamics]].
:::

## Cartesian paths {#sec-cartesian}

Joint-space trajectories are cheap and always feasible between two reachable configurations, but the tool follows an unpredictable curve (see the figure in [[robotics/forward-kinematics]]). Welding, gluing, inserting a peg, or moving close to obstacles need the tool itself to follow a specified path — usually a straight line with smoothly changing orientation.

::: definition Straight-line Cartesian path with slerp orientation {#def-cartesian}
Between poses $(R_0, \mathbf p_0)$ and $(R_1, \mathbf p_1)$, the **straight-line path** is
$$
\mathbf p(s) = \mathbf p_0 + s(\mathbf p_1 - \mathbf p_0),\qquad
R(s) = R_0\,\exp\!\big(\log(R_0^{\mathsf T}R_1)\,s\big),\qquad s\in[0,1],
$$
where $\log(R_0^{\mathsf T}R_1) = [\hat{\boldsymbol\omega}]\theta$ is the axis–angle of the relative rotation ([[robotics/rigid-motions]]). In unit quaternions the same orientation path is **spherical linear interpolation**:
$$
q(s) = \frac{\sin\big((1-s)\Omega\big)}{\sin\Omega}\,q_0 + \frac{\sin(s\Omega)}{\sin\Omega}\,q_1,\qquad \cos\Omega = q_0\cdot q_1 > 0 .
$$ {#eq-slerp}
:::

::: proposition Slerp rotates about a fixed axis at a uniform rate {#prop-slerp}
Along $R(s) = R_0\exp([\hat{\boldsymbol\omega}]\theta s)$ the body-frame angular velocity is constant in direction, $\boldsymbol\omega_b = \hat{\boldsymbol\omega}\,\theta\,\dot s$; with a time scaling $s(t)$ the tool turns about the fixed (body) axis $\hat{\boldsymbol\omega}$ through the total angle $\theta$, following the same timing as the position. The quaternion formula [[#eq-slerp]] represents the same rotations, with $\Omega = \theta/2$.
:::

::: proof
$R^{\mathsf T}\dot R = \exp(-[\hat{\boldsymbol\omega}]\theta s)R_0^{\mathsf T}R_0\exp([\hat{\boldsymbol\omega}]\theta s)[\hat{\boldsymbol\omega}]\theta\dot s = [\hat{\boldsymbol\omega}]\theta\dot s$, because a matrix commutes with its own exponential; by [[robotics/rigid-motions]] this is $[\boldsymbol\omega_b]$. For the quaternion form, let $p = q_0^*\otimes q_1 = (\cos\frac\theta2, \sin\frac\theta2\hat{\boldsymbol\omega})$ be the quaternion of $R_0^{\mathsf T}R_1$ (choosing the sign with $\cos\frac\theta2 > 0$). The rotation $R_0\,\mathrm{Rot}(\hat{\boldsymbol\omega}, s\theta)$ has quaternion $q_0\otimes(\cos\frac{s\theta}2, \sin\frac{s\theta}2\hat{\boldsymbol\omega})$. Now $q_0\cdot q_1 = $ scalar part of $q_0^*\otimes q_1 = \cos\frac\theta2$, so $\Omega = \theta/2$. Write $(\cos s\Omega, \sin s\Omega\,\hat{\boldsymbol\omega}) = \frac{\sin((1-s)\Omega)}{\sin\Omega}(1, \mathbf 0) + \frac{\sin(s\Omega)}{\sin\Omega}(\cos\Omega, \sin\Omega\,\hat{\boldsymbol\omega})$ — the scalar parts agree by the identity $\sin((1-s)\Omega) + \sin(s\Omega)\cos\Omega = \cos(s\Omega)\sin\Omega$, and the vector parts trivially. Multiplying on the left by $q_0$ (a linear operation) turns $(1,\mathbf 0)$ into $q_0$ and $p$ into $q_1$, giving [[#eq-slerp]].
:::

::: example A straight line for the 2R arm {#ex-line}
The 2R arm ($L_1 = 0.6$, $L_2 = 0.5\,\mathrm m$, elbow-up solutions) must move its tip from $(0.9, -0.3)$ to $(0.3, 0.9)\,\mathrm m$. Compare the Cartesian straight line with the joint-space straight line.
::: solution
Inverse kinematics at the ends ([[robotics/inverse-kinematics]]): $\mathbf q_0 = (-45.9^\circ, 61.1^\circ)$, $\mathbf q_1 = (44.1^\circ, 61.1^\circ)$ — both points are $0.949\,\mathrm m$ from the base, so the elbow angle is the same.
*Joint-space line:* the elbow stays at $61.1^\circ$ and only the shoulder turns, so the tip moves on a **circular arc** of radius $0.949\,\mathrm m$ about the base. At $s = 0.5$, $\mathbf q = (-0.9^\circ, 61.1^\circ)$ and the tip is at $(0.849, 0.424)\,\mathrm m$.
*Cartesian line:* at $s = 0.5$ the tip must be at $(0.6, 0.3)\,\mathrm m$, $0.671\,\mathrm m$ from the base, requiring $\mathbf q = (-19.4^\circ, 105.5^\circ)$. Along the line:

| $s$ | tip (m) | $q_1$ | $q_2$ |
|---|---|---|---|
| 0 | $(0.90, -0.30)$ | $-45.9^\circ$ | $61.1^\circ$ |
| 0.25 | $(0.75, 0.00)$ | $-41.6^\circ$ | $94.5^\circ$ |
| 0.5 | $(0.60, 0.30)$ | $-19.4^\circ$ | $105.5^\circ$ |
| 0.75 | $(0.45, 0.60)$ | $11.5^\circ$ | $94.5^\circ$ |
| 1 | $(0.30, 0.90)$ | $44.1^\circ$ | $61.1^\circ$ |

The midpoints of the two paths are $\lVert(0.849 - 0.6,\ 0.424 - 0.3)\rVert = 0.28\,\mathrm m$ apart. The Cartesian line makes the elbow fold by $44^\circ$ and reopen, and the shoulder's motion is non-uniform: in the middle half of the line ($s$ from 0.25 to 0.75) it turns $53^\circ$, against $37^\circ$ in the outer halves. For a constant tool speed the joint velocities therefore vary along the path, and the planner must check them with [[#eq-chain]] at many points, not only at the ends.
:::
:::

::: example Halfway orientation by slerp {#ex-slerp}
A tool must turn from $R_0 = I$ to $R_1$ with quaternion $q_1 = (\frac12, \frac12, \frac12, \frac12)$ (the $120^\circ$ turn about $(1,1,1)/\sqrt3$ from [[robotics/rigid-motions]]). Find the orientation halfway, by slerp and by naive interpolation of the quaternion components.
::: solution
$q_0 = (1, 0, 0, 0)$, $\cos\Omega = q_0\cdot q_1 = \frac12$, $\Omega = 60^\circ$, $\sin\Omega = 0.8660$. At $s = \frac12$, both weights are $\sin30^\circ/\sin60^\circ = 0.5774$:
$$
q(\tfrac12) = 0.5774\big((1,0,0,0) + (\tfrac12,\tfrac12,\tfrac12,\tfrac12)\big) = (0.8660,\ 0.2887,\ 0.2887,\ 0.2887),
$$
a unit quaternion with $\cos\frac\theta2 = 0.8660$, i.e. $\theta = 60^\circ$ about $(1,1,1)/\sqrt3$: exactly half of the turn, about the same axis ✓. Naive linear interpolation gives $\frac12(q_0 + q_1) = (0.75, 0.25, 0.25, 0.25)$, which has norm $0.866$ — not a rotation until renormalised; after normalising it happens to coincide here (by symmetry at $s = \frac12$), but at other $s$ normalised linear interpolation moves along the same arc at a non-uniform rate (fast in the middle, slow at the ends), and interpolating Euler angles moves along a different, curved path altogether.
:::
:::

### Joint space or task space?

| | joint-space trajectory | Cartesian trajectory |
|---|---|---|
| tool path | curve, depends on geometry | specified (line, arc) |
| computation | interpolate joints | IK at every control cycle |
| singularities | no problem | joint rates blow up near them |
| joint limits | checked at the ends | must be checked along the path |
| workspace | always feasible between reachable points | the line may leave the workspace |
| IK branch | fixed by the end configurations | must stay on one branch |

Cartesian paths inherit every difficulty of inverse kinematics. If the straight line passes near a singularity, $\dot{\mathbf q} = J^{-1}\dot{\mathbf x}$ becomes huge for a fixed tool speed ([[robotics/jacobians]]); if it leaves the workspace annulus or crosses a joint limit, it is infeasible; if the start and goal are in different IK branches, no continuous Cartesian path exists without passing through a singularity. Industrial controllers offer both — "PTP" joint moves for free motion and "LIN"/"CIRC" Cartesian moves for process paths — and stop with an error when a Cartesian move approaches a singularity.

::: remark Time-optimal timing along a given path
For a fixed path $\mathbf q(s)$, the robot's dynamics $M\ddot{\mathbf q} + C\dot{\mathbf q} + \mathbf g = \boldsymbol\tau$ with [[#eq-chain]] become, for each joint, $a_i(s)\ddot s + b_i(s)\dot s^2 + c_i(s) = \tau_i$. Torque limits then restrict $\ddot s$ to an interval depending on $(s, \dot s)$, and the fastest timing is found in the $(s, \dot s)$ phase plane by integrating maximum acceleration forwards from the start and maximum deceleration backwards from the goal, switching where the curves meet (the method of Bobrow, Dubowsky and Gibson, and of Shin and McKay, 1985). It gives far faster motions than fixed velocity and acceleration limits when the load is light.
:::

::: quiz
A joint follows a cubic time scaling over $\Delta q = 1\,\mathrm{rad}$. The duration is reduced from $2\,\mathrm s$ to $1\,\mathrm s$. By what factor do the peak velocity and peak acceleration change?
- [ ] both double
- [x] velocity doubles, acceleration quadruples
- [ ] velocity quadruples, acceleration doubles
- [ ] both quadruple
::: solution
From [[#prop-polynomials]], $\dot q_{\max} = \frac32\Delta q/T$ and $\ddot q_{\max} = 6\Delta q/T^2$: halving $T$ doubles the first and quadruples the second. Since inertial torques scale with acceleration, a "twice as fast" motion needs four times the inertial torque.
:::
:::

::: history
Joint-space trajectories and Cartesian motion of the tool were among the core topics of Richard Paul's 1981 book *Robot Manipulators: Mathematics, Programming, and Control*, which collected the methods developed for the first computer-controlled arms. Ken Shoemake introduced quaternion slerp to computer graphics in 1985. Time-optimal timing along a specified path under torque limits was solved by Bobrow, Dubowsky and Gibson and independently by Shin and McKay, both published in 1985; Flash and Hogan's 1985 study of human arm movements showed that people's reaching motions closely follow the minimum-jerk (quintic) profile.
:::

::: summary
- A trajectory is a path $\boldsymbol\theta(s)$ composed with a time scaling $s(t)$; for joint-space straight lines every joint follows $\Delta\theta_i\,s(t)$, so all joints start and stop together.
- Cubic $3\tau^2 - 2\tau^3$: $\dot s_{\max} = 1.5/T$, $\ddot s_{\max} = 6/T^2$ with acceleration jumps at the ends. Quintic $10\tau^3 - 15\tau^4 + 6\tau^5$: $\dot s_{\max} = 1.875/T$, $\ddot s_{\max} = 5.77/T^2$, zero acceleration at the ends.
- Via points: cubics with prescribed boundary velocities; cubic splines choose them for continuous acceleration (and may overshoot).
- Trapezoidal profile is minimum-time under $v_{\max}$, $a_{\max}$: $T = D/v_{\max} + v_{\max}/a_{\max}$ if $D \ge v_{\max}^2/a_{\max}$, else $T = 2\sqrt{D/a_{\max}}$. Synchronise joints by scaling the slowest joint's profile.
- Cartesian straight lines with slerp orientation rotate about a fixed axis at a rate set by $s(t)$; they need IK along the path and fail near singularities, outside the workspace, or across IK branches.
- Check peak velocities, accelerations and torques for every joint; they scale as $1/T$ and $1/T^2$.
:::

## Exercises

::: exercise Peak velocity of a cubic {#exr-cubic level=1 check="45"}
A joint moves $45^\circ$ in $1.5\,\mathrm s$, rest to rest, with a cubic time scaling. What is its peak velocity? (Enter it in degrees per second.)
::: solution
$\dot q_{\max} = \frac32\Delta q/T = 1.5\times45/1.5 = 45^\circ/\mathrm s$, reached at $t = 0.75\,\mathrm s$; the peak acceleration is $6\times45/1.5^2 = 120^\circ/\mathrm s^2$.
:::
:::

::: exercise Trapezoid duration {#exr-trap level=1 check="1.7"}
A joint must move $1.2\,\mathrm{rad}$ with $v_{\max} = 1.0\,\mathrm{rad/s}$ and $a_{\max} = 2.0\,\mathrm{rad/s^2}$. What is the minimum duration? (Enter $T$ in s.)
::: solution
$v_{\max}^2/a_{\max} = 0.5\,\mathrm{rad} < 1.2\,\mathrm{rad}$: trapezoid. $T = 1.2/1.0 + 1.0/2.0 = 1.7\,\mathrm s$ (0.5 s accelerating over $0.25\,\mathrm{rad}$, 0.7 s cruising over $0.7\,\mathrm{rad}$, 0.5 s decelerating over $0.25\,\mathrm{rad}$; total $1.2\,\mathrm{rad}$ ✓).
:::
:::

::: exercise A short move {#exr-short level=1 check="0.6325"}
The same joint must move only $0.2\,\mathrm{rad}$. What is the minimum duration, and what peak speed is reached? (Enter $T$ in s, rounded to four decimal places.)
::: solution
$0.2 < 0.5\,\mathrm{rad}$: triangular. $T = 2\sqrt{0.2/2.0} = 2\sqrt{0.1} = 0.6325\,\mathrm s$, peak speed $\sqrt{2.0\times0.2} = 0.632\,\mathrm{rad/s}$, below $v_{\max}$. Using the trapezoid formula blindly would give $0.2 + 0.5 = 0.7\,\mathrm s$ — longer than necessary.
:::
:::

::: exercise Quintic peak acceleration {#exr-quintic level=2 check="86.60"}
For the quintic move of [[#ex-poly]] ($60^\circ$ in $2\,\mathrm s$), verify the peak acceleration by evaluating $\ddot q$ at $t = 2(\frac12 - \frac{\sqrt3}{6})\,\mathrm s$. (Enter it in degrees per second squared, rounded to two decimal places.)
::: solution
$\tau = 0.5 - 0.2887 = 0.2113$: $d^2s/d\tau^2 = 60\tau(1-\tau)(1-2\tau) = 60\times0.2113\times0.7887\times0.5774 = 5.774$. Then $\ddot q = \Delta q\,(d^2s/d\tau^2)/T^2 = 60\times5.774/4 = 86.60^\circ/\mathrm s^2$, equal to $60\times10/(\sqrt3\times4)$ ✓.
:::
:::

::: exercise Synchronising two joints {#exr-sync level=2 check="0.8"}
Joint 1 must move $1.0\,\mathrm{rad}$ and joint 2 $1.5\,\mathrm{rad}$; both have $v_{\max} = 1.2\,\mathrm{rad/s}$ and $a_{\max} = 3.0\,\mathrm{rad/s^2}$. Find each joint's minimum time, the synchronised duration, and joint 1's cruise speed in the synchronised move. (Enter joint 1's cruise speed in rad/s.)
::: solution
Threshold $1.44/3.0 = 0.48\,\mathrm{rad}$; both are trapezoids. $T_1 = 1.0/1.2 + 0.4 = 1.233\,\mathrm s$; $T_2 = 1.5/1.2 + 0.4 = 1.65\,\mathrm s$. Synchronised $T = 1.65\,\mathrm s$, joint 2 using its own minimum-time profile and joint 1 the same normalised profile scaled by $1.0/1.5$: cruise speed $1.2\times\frac23 = 0.8\,\mathrm{rad/s}$ and acceleration $2.0\,\mathrm{rad/s^2}$, both within limits.
:::
:::

::: exercise A cubic with an end velocity {#exr-endvel level=2 check="0.5"}
A segment must go from $q_0 = 0$ at rest to $q_f = 1.0\,\mathrm{rad}$, arriving with $v_f = 0.5\,\mathrm{rad/s}$, in $T = 2\,\mathrm s$. Find the cubic coefficients and check the end conditions. (Enter $a_2$ in $\mathrm{rad/s^2}$.)
::: solution
From [[#eq-cubic-velocities]]: $a_2 = (3\times1.0 - (0 + 0.5)\times2)/4 = 0.5\,\mathrm{rad/s^2}$, $a_3 = (-2\times1.0 + 0.5\times2)/8 = -0.125\,\mathrm{rad/s^3}$. Check: $q(2) = 0.5\times4 - 0.125\times8 = 2 - 1 = 1.0$ ✓; $\dot q(2) = 2\times0.5\times2 - 3\times0.125\times4 = 2 - 1.5 = 0.5$ ✓.
:::
:::

::: exercise Minimum-jerk motion {#exr-minjerk level=3}
Show that the quintic $s(\tau) = 10\tau^3 - 15\tau^4 + 6\tau^5$ minimises the integrated squared jerk $\int_0^1(s''')^2\,d\tau$ among smooth functions with $s(0) = 0$, $s(1) = 1$ and $s' = s'' = 0$ at both ends. (Hint: the Euler–Lagrange equation of $\int F(s''')\,d\tau$ is $\frac{d^3}{d\tau^3}\frac{\partial F}{\partial s'''} = 0$.) What is the physical reason for preferring low jerk?
::: solution
With $F = (s''')^2$, $\partial F/\partial s''' = 2s'''$, and the Euler–Lagrange equation (obtained by integrating the first variation by parts three times; the boundary terms vanish because the variation and its first two derivatives are zero at both ends) is $s^{(6)} = 0$: $s$ is a polynomial of degree at most 5. Six boundary conditions fix its six coefficients, and the quintic of [[#prop-polynomials]] satisfies them, so it is the minimiser (the functional is convex, so the stationary point is the minimum). Physically, jerk is the rate of change of acceleration and hence of inertial force: abrupt changes excite the lightly damped vibration modes of the links, gearboxes and payload (and spill liquids). A profile with bounded jerk, like the quintic or the S-curve, lets a flexible arm settle faster at the goal even if its nominal duration is the same.
:::
:::

::: exercise Planning a pick-and-place cycle {#exr-design level=3}
A SCARA arm must move parts between two stations $0.5\,\mathrm m$ apart, 60 times a minute, with $1\,\mathrm s$ cycles consisting of a move, a $0.15\,\mathrm s$ gripper action, the return move and another $0.15\,\mathrm s$. The tool's straight-line speed is limited to $2\,\mathrm{m/s}$ and its acceleration to $10\,\mathrm{m/s^2}$; the parts are delicate and the arm's first vibration mode is at about $15\,\mathrm{Hz}$. (a) Is the cycle feasible with a trapezoidal profile on the straight line? (b) Discuss whether you would use a Cartesian line or a joint move, and whether you would use a trapezoid, S-curve or quintic, and why.
::: solution
(a) Each move has $T = (1 - 0.3)/2 = 0.35\,\mathrm s$ available. Threshold $v^2/a = 4/10 = 0.4\,\mathrm m < 0.5\,\mathrm m$: trapezoid, minimum $T = 0.5/2 + 2/10 = 0.45\,\mathrm s$ — **not** feasible. Options: raise the acceleration limit (with $a = 20\,\mathrm{m/s^2}$, threshold $0.2\,\mathrm m$ and $T = 0.25 + 0.1 = 0.35\,\mathrm s$, just feasible), shorten the gripper actions, or overlap gripper action with the end of the motion.
(b) Free motion between stations does not need a straight line: a joint-space move is usually faster (each joint uses its own limits, no IK at run time, no singularity risk) unless obstacles or the parts' orientation require a defined path; the vertical approach and departure at each station would be short Cartesian moves. With a $15\,\mathrm{Hz}$ mode (period $67\,\mathrm{ms}$), the trapezoid's abrupt acceleration changes excite residual vibration that must die out before the gripper acts; an S-curve with jerk-limited ramps of about one period ($\approx 70\,\mathrm{ms}$), or a quintic, costs a little time in the move but saves settling time — usually a net gain for delicate parts. Any choice must be checked against motor torque limits using the dynamics, since at $20\,\mathrm{m/s^2}$ the inertial loads dominate.
:::
:::

## Further reading

Spong, Hutchinson and Vidyasagar and Siciliano et al. both treat polynomial, spline and trapezoidal trajectories in joint and operational space; Lynch and Park cover time scaling, time-optimal timing along a path in the $(s,\dot s)$ plane, and slerp in exponential coordinates.
