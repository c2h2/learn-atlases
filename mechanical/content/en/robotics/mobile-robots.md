A robot arm is bolted to the floor; a mobile robot carries its base with it — a warehouse vehicle, a lawn mower, an agricultural tractor, a planetary rover. Two new difficulties appear. The first is mechanical: a wheel that rolls without slipping cannot move sideways, so a wheeled robot has fewer independent velocities than it has position coordinates. A car has three coordinates in the plane ($x$, $y$, heading) but only two controls (speed and steering), yet it can still be parked anywhere — the hallmark of a **nonholonomic** system. The second difficulty is knowing where the robot is: an arm reads its pose from joint encoders through the forward kinematics, but a vehicle that integrates its wheel rotations (**odometry**) accumulates error without bound and must correct itself from external references. This chapter derives the kinematics of differential-drive and car-like robots from the rolling constraints, proves that those constraints are not integrable, computes odometry exactly and studies its error growth, designs path-following controllers (pure pursuit and a linear lateral controller), and introduces the probabilistic view of localisation and occupancy-grid mapping that [[robotics/motion-planning-perception]] develops further. Poses in the plane are elements of $SE(2)$, the planar case of [[robotics/rigid-motions]].

## Rolling without slipping {#sec-constraints}

Describe a planar vehicle by its **pose** $\mathbf q = (x, y, \phi)$: the position of a reference point (for a differential-drive robot, the midpoint of the wheel axle) and the heading $\phi$ of the body's forward axis, measured anticlockwise from the world $x$-axis. A wheel rolling on the floor without slipping imposes two conditions at its contact point: no motion along the wheel's axle (no **skidding**), and forward motion equal to the wheel's rim speed (no **slipping**).

::: definition Pfaffian, holonomic and nonholonomic constraints {#def-nonholonomic}
A set of $k$ velocity constraints that is linear in the velocities, $A(\mathbf q)\dot{\mathbf q} = \mathbf 0$ with $A(\mathbf q)\in\mathbb R^{k\times n}$, is a **Pfaffian constraint**. It is **holonomic** (integrable) if it is equivalent to $k$ position constraints $h_j(\mathbf q) = \text{const}$, i.e. the rows of $A$ can be combined into gradients $\nabla h_j$; then the motion is confined to an $(n-k)$-dimensional surface in configuration space. Otherwise it is **nonholonomic**: it restricts the directions of motion at each configuration without restricting which configurations can be reached.
:::

For a single wheel (or a differential-drive robot, whose axle midpoint moves like a wheel) the no-skid condition says that the velocity of the reference point has no component along the axle direction $(-\sin\phi, \cos\phi)$:
$$
-\dot x\sin\phi + \dot y\cos\phi = 0 ,\qquad\text{i.e.}\qquad A(\mathbf q) = \begin{bmatrix} -\sin\phi & \cos\phi & 0\end{bmatrix}.
$$ {#eq-noskid}

::: proposition The rolling constraint is nonholonomic {#prop-nonholonomic}
The constraint [[#eq-noskid]] is not integrable: there is no function $h(x, y, \phi)$ with non-zero gradient such that $\nabla h = \lambda(\mathbf q)\,(-\sin\phi, \cos\phi, 0)$ for some scalar $\lambda(\mathbf q)$. Consequently a robot obeying it is not confined to any surface in $(x, y, \phi)$-space.
:::

::: proof
Suppose such $h$ and $\lambda$ exist. The third component gives $\partial h/\partial\phi = 0$, so $h = h(x, y)$ and its partial derivatives $h_x$, $h_y$ do not depend on $\phi$. The first two components give $h_x = -\lambda\sin\phi$ and $h_y = \lambda\cos\phi$. At any fixed $(x, y)$ where $(h_x, h_y)\ne\mathbf 0$, the vector $(h_x, h_y)$ is a fixed non-zero vector, but it is required to be parallel to $(-\sin\phi, \cos\phi)$ for *every* $\phi$ — impossible, since the directions $(-\sin\phi, \cos\phi)$ for different $\phi$ are not all parallel. Hence $(h_x, h_y) = \mathbf 0$ everywhere, so $\nabla h = \mathbf 0$, contradicting the assumption. For the consequence: with the two controls of the unicycle model below (drive forward, turn), any pose can be reached from any other — turn to face the goal, drive straight to it, turn to the final heading — so no surface $h = \text{const}$ contains the reachable set.
:::

Holonomic constraints reduce the dimension of the configuration space; nonholonomic constraints reduce only the dimension of the space of *velocities*. A car can be parked anywhere (three-dimensional configuration space), but at any instant it can move in only two independent directions. The price is paid in planning: the shortest path between two poses is not a straight line, and reaching a pose beside the current one requires manoeuvres (parallel parking).

## The differential-drive robot {#sec-diff-drive}

A **differential-drive** robot has two independently driven wheels of radius $r$ on a common axle, separated by the **track** $b$, plus passive castors for balance. Most indoor service robots and robot vacuum cleaners are built this way.

::: proposition Differential-drive kinematics {#prop-diff-drive}
With wheel angular speeds $\omega_R$, $\omega_L$ (positive for forward rolling), the forward speed $v$ of the axle midpoint and the yaw rate $\omega = \dot\phi$ are
$$
v = \frac{r(\omega_R + \omega_L)}{2},\qquad \omega = \frac{r(\omega_R - \omega_L)}{b},
$$ {#eq-diff-drive}
and the pose evolves by the **unicycle model**
$$
\dot x = v\cos\phi,\qquad \dot y = v\sin\phi,\qquad \dot\phi = \omega .
$$ {#eq-unicycle}
The robot turns about the **instantaneous centre of rotation** (ICR) on the axle line at signed distance $R = v/\omega = \frac b2\,\frac{\omega_R + \omega_L}{\omega_R - \omega_L}$ to the left of the midpoint.
:::

::: proof
Rolling without slipping makes the contact point of each wheel instantaneously at rest, so the wheel centres move forward with speeds $v_R = r\omega_R$ and $v_L = r\omega_L$ (no skidding means they have no sideways component). The body is rigid and moves in the plane, so the velocity of any point is $\mathbf v_P = \mathbf v_O + \omega\hat{\mathbf k}\times(\mathbf p_P - \mathbf p_O)$. Take $O$ at the axle midpoint and express vectors in the body frame (forward $\hat{\mathbf x}_b$, left $\hat{\mathbf y}_b$): the right wheel is at $-\frac b2\hat{\mathbf y}_b$, so its velocity is $v\hat{\mathbf x}_b + \omega\hat{\mathbf k}\times(-\frac b2\hat{\mathbf y}_b) = (v + \omega\frac b2)\hat{\mathbf x}_b$, and the left wheel's is $(v - \omega\frac b2)\hat{\mathbf x}_b$. Equating with $r\omega_R$ and $r\omega_L$ and solving gives [[#eq-diff-drive]]. The midpoint moves along $\hat{\mathbf x}_b = (\cos\phi, \sin\phi)$ in world coordinates, giving [[#eq-unicycle]]. The ICR is the point of zero velocity: on the axle line at $\hat{\mathbf y}_b$-coordinate $\rho$ with $v - \omega\rho = 0$, i.e. $\rho = v/\omega$.
:::

Special cases: $\omega_R = \omega_L$ gives straight motion ($R = \infty$); $\omega_R = -\omega_L$ gives rotation on the spot ($R = 0$); one wheel stopped gives rotation about that wheel ($R = \pm b/2$).

::: example Speeds and turning radius of a differential drive {#ex-diff-drive}
A robot has wheels of radius $r = 0.05\,\mathrm m$ and track $b = 0.30\,\mathrm m$. The right wheel turns at $12\,\mathrm{rad/s}$ and the left at $8\,\mathrm{rad/s}$. Find $v$, $\omega$ and the turning radius; then find the wheel speeds for $v = 0.4\,\mathrm{m/s}$ on a circle of radius $1\,\mathrm m$ to the right.
::: solution
$v = 0.05(12 + 8)/2 = 0.50\,\mathrm{m/s}$, $\omega = 0.05(12 - 8)/0.30 = 0.667\,\mathrm{rad/s}$ (anticlockwise, turning left), $R = v/\omega = 0.75\,\mathrm m$. Check with the formula $R = \frac b2\frac{20}{4} = 0.15\times5 = 0.75\,\mathrm m$ ✓. The robot completes a circle every $2\pi/0.667 = 9.4\,\mathrm s$.
For the right-hand circle: $\omega = -v/R = -0.4\,\mathrm{rad/s}$. Inverting [[#eq-diff-drive]]: $\omega_R = (v + \omega b/2)/r = (0.4 - 0.06)/0.05 = 6.8\,\mathrm{rad/s}$, $\omega_L = (v - \omega b/2)/r = (0.4 + 0.06)/0.05 = 9.2\,\mathrm{rad/s}$ — the outer (left) wheel turns faster, as it must.
:::
:::

## Car-like robots {#sec-car}

Cars, tractors and many outdoor robots steer their front wheels. The **kinematic bicycle model** lumps the two front wheels into one steered wheel at the front axle and the two rear wheels into one fixed wheel at the rear axle, separated by the **wheelbase** $L$. With the reference point at the rear-axle midpoint, speed $v$ and steering angle $\delta$:
$$
\dot x = v\cos\phi,\qquad \dot y = v\sin\phi,\qquad \dot\phi = \frac{v}{L}\tan\delta .
$$ {#eq-bicycle}
The rear wheel cannot skid, so the ICR lies on the rear-axle line; the front wheel cannot skid, so the ICR also lies on the line through the front wheel perpendicular to it. They meet at distance $R = L/\tan\delta$ from the rear-axle midpoint, which gives $\dot\phi = v/R$. Unlike the differential drive, a car cannot turn on the spot: $\lvert\delta\rvert\le\delta_{\max}$ sets a **minimum turning radius** $R_{\min} = L/\tan\delta_{\max}$.

For real four-wheeled vehicles all four wheels must share the same ICR, so the inner front wheel must steer more than the outer one — **Ackermann steering geometry**. With track $w$ between the front wheels and a turn of radius $R$ at the rear-axle midpoint, the inner and outer steering angles are
$$
\delta_i = \arctan\frac{L}{R - w/2},\qquad \delta_o = \arctan\frac{L}{R + w/2},\qquad \cot\delta_o - \cot\delta_i = \frac wL .
$$

::: example Turning circle of a car-like robot {#ex-car}
A car-like delivery robot has wheelbase $L = 2.7\,\mathrm m$, front track $w = 1.5\,\mathrm m$ and maximum steering angle $35^\circ$ (bicycle model). Find the minimum turning radius at the rear-axle midpoint, and the Ackermann angles of the two front wheels for a turn of radius $R = 6\,\mathrm m$.
::: solution
$R_{\min} = 2.7/\tan35^\circ = 2.7/0.7002 = 3.86\,\mathrm m$. For $R = 6\,\mathrm m$: $\delta_i = \arctan(2.7/5.25) = 27.2^\circ$, $\delta_o = \arctan(2.7/6.75) = 21.8^\circ$, and the equivalent bicycle angle is $\arctan(2.7/6) = 24.2^\circ$, between the two. Check: $\cot21.8^\circ - \cot27.2^\circ = 2.500 - 1.944 = 0.556 = 1.5/2.7$ ✓. If both wheels were steered to $24.2^\circ$ (parallel steering), the wheels would scrub sideways in every turn, wearing the tyres and corrupting odometry.
:::
:::

::: remark Omnidirectional bases
Wheels can be designed to roll freely in a second direction: **mecanum** wheels carry rollers at $45^\circ$ around the rim, and four of them, driven independently, let a platform translate in any direction and rotate at the same time. Such a base has three independent velocities, so its velocity constraints are absent and it can be planned like a holonomic robot — at the cost of rollers that slip, wear and transmit vibration, and of odometry that is less accurate than that of plain wheels.
:::

## Odometry {#sec-odometry}

Integrating [[#eq-unicycle]] with velocities measured by wheel encoders gives the pose — **dead reckoning** or **odometry**. Encoders deliver wheel angle increments $\Delta\varphi_R$, $\Delta\varphi_L$ over each sampling interval, from which the distance travelled by the midpoint and the heading change are
$$
\Delta s = \frac{r(\Delta\varphi_R + \Delta\varphi_L)}{2},\qquad \Delta\phi = \frac{r(\Delta\varphi_R - \Delta\varphi_L)}{b}.
$$

::: proposition Exact odometry update {#prop-odometry}
If $v$ and $\omega$ are constant during the interval (the robot moves on a circular arc), the pose update is
$$
\begin{aligned}
x_{k+1} &= x_k + \Delta s\,\frac{\sin(\Delta\phi/2)}{\Delta\phi/2}\,\cos\!\Big(\phi_k + \frac{\Delta\phi}{2}\Big),\\
y_{k+1} &= y_k + \Delta s\,\frac{\sin(\Delta\phi/2)}{\Delta\phi/2}\,\sin\!\Big(\phi_k + \frac{\Delta\phi}{2}\Big),\qquad \phi_{k+1} = \phi_k + \Delta\phi ,
\end{aligned}
$$ {#eq-odometry}
with the factor $\sin(\Delta\phi/2)/(\Delta\phi/2)$ replaced by 1 when $\Delta\phi = 0$. Dropping that factor gives the second-order (midpoint) approximation; using $\phi_k$ instead of $\phi_k + \Delta\phi/2$ gives the first-order (Euler) approximation.
:::

::: proof
With constant $v$ and $\omega \ne 0$, $\phi(t) = \phi_k + \omega t$ and $\dot x = v\cos(\phi_k + \omega t)$, so over the interval $x_{k+1} - x_k = \frac v\omega\big(\sin(\phi_k + \Delta\phi) - \sin\phi_k\big)$ and similarly $y_{k+1} - y_k = -\frac v\omega\big(\cos(\phi_k + \Delta\phi) - \cos\phi_k\big)$, with $\Delta\phi = \omega\Delta t$ and $v/\omega = \Delta s/\Delta\phi$. The sum-to-product identities $\sin(a + c) - \sin a = 2\cos(a + c/2)\sin(c/2)$ and $\cos(a + c) - \cos a = -2\sin(a + c/2)\sin(c/2)$ turn these into [[#eq-odometry]]: the displacement is the **chord** of the arc, of length $2\frac{\Delta s}{\Delta\phi}\sin\frac{\Delta\phi}{2}$, in the direction of the mean heading. As $\Delta\phi\to0$, $\sin(\Delta\phi/2)/(\Delta\phi/2)\to1$ and the update tends to a straight step $\Delta s$ along $\phi_k$, which is continuous with the case $\omega = 0$.
:::

::: example Exact, midpoint and Euler odometry {#ex-odometry}
A robot with $r = 0.05\,\mathrm m$, $b = 0.30\,\mathrm m$ starts at $(0, 0, 0)$; during one (deliberately long) interval the encoders report $\Delta\varphi_R = 12\,\mathrm{rad}$ and $\Delta\varphi_L = 4\,\mathrm{rad}$. Compute the new pose by the three updates.
::: solution
$\Delta s = 0.05\times16/2 = 0.40\,\mathrm m$; $\Delta\phi = 0.05\times8/0.30 = 1.333\,\mathrm{rad}$ ($76.4^\circ$); the arc radius is $\Delta s/\Delta\phi = 0.30\,\mathrm m$.
*Exact:* the factor is $\sin(0.6667)/0.6667 = 0.9276$, the chord $0.371\,\mathrm m$ at mean heading $0.6667\,\mathrm{rad}$: $(x, y) = (0.371\cos0.6667,\ 0.371\sin0.6667) = (0.2916, 0.2294)\,\mathrm m$. (Directly: $0.30\sin1.333 = 0.2916$, $0.30(1 - \cos1.333) = 0.2294$ ✓.)
*Midpoint:* $(0.40\cos0.6667,\ 0.40\sin0.6667) = (0.3144, 0.2473)\,\mathrm m$ — $0.029\,\mathrm m$ off.
*Euler:* $(0.40, 0)\,\mathrm m$ — $0.25\,\mathrm m$ off: it moves the robot straight ahead and then turns it.
All three give $\phi = 1.333\,\mathrm{rad}$. With realistic sampling (say $100\,\mathrm{Hz}$, where $\Delta\phi$ per step is a few milliradians) the three updates differ negligibly per step; the exact form matters when encoder data arrive slowly or in bursts.
:::
:::

### Why odometry drifts

Odometry integrates small errors: wheel radii that differ from their nominal values (tyre wear, load), an uncertain effective track $b$ (wide tyres touch the floor over a patch), wheel slip on smooth floors and uneven ground, and encoder quantisation. Heading errors are the most damaging, because a heading error $\delta\phi$ turns every later metre of travel into a lateral error of $\delta\phi$ metres. A systematic radius mismatch makes a robot that believes it is driving straight follow an arc, and the lateral error then grows with the *square* of the distance.

::: widget plot
f: (0.3/(eps/100))*(1 - cos(x*(eps/100)/0.3))
x: 0, 20
y: 0, 2
sliders: eps=0.5:0.1:2:0.1
labels: \text{lateral error (m)}
caption: Lateral position error of a differential-drive robot ($b = 0.30\,\mathrm m$) that drives "straight" for $x$ metres according to its odometry, when its right wheel is actually larger than the left by the fraction $\varepsilon$ (in per cent, slider). The robot really follows an arc of radius about $b/\varepsilon$, so the error is $\frac b\varepsilon(1 - \cos(x\varepsilon/b)) \approx x^2\varepsilon/(2b)$ for short distances. A mismatch of $0.5\%$ — less than the effect of a few kilograms of load on a soft tyre — already gives about $0.3\,\mathrm m$ after $6\,\mathrm m$ and grows quadratically. Calibrating $r_R/r_L$ and $b$ (for example by driving squares in both directions and measuring the closure error) reduces but never removes this drift.
:::

## Path following {#sec-path-following}

A planner supplies a geometric path; the vehicle must follow it at some speed despite disturbances and modelling errors. Two classical controllers do this for nonholonomic vehicles.

::: proposition Pure pursuit curvature {#prop-pure-pursuit}
Let the goal point lie on the path at distance $L_d$ (the **lookahead distance**) from the robot's reference point, at angle $\alpha$ from the robot's heading — equivalently at body-frame coordinates $(x_g, y_g)$ with $x_g^2 + y_g^2 = L_d^2$. The unique circular arc through the reference point, tangent to the current heading, that passes through the goal point has curvature
$$
\kappa = \frac{2\sin\alpha}{L_d} = \frac{2y_g}{L_d^2},
$$ {#eq-pure-pursuit}
and pure pursuit commands $\omega = v\kappa$ (unicycle) or $\delta = \arctan(L\kappa)$ (bicycle model).
:::

::: proof
An arc tangent to the heading at the origin of the body frame has its centre on the body's $y$-axis, at $(0, \rho)$ with $\rho = 1/\kappa$ (positive to the left). The goal lies on it iff $x_g^2 + (y_g - \rho)^2 = \rho^2$, i.e. $x_g^2 + y_g^2 = 2\rho y_g$, so $\kappa = 1/\rho = 2y_g/L_d^2$. With $y_g = L_d\sin\alpha$ this is $2\sin\alpha/L_d$. The bicycle relation $\dot\phi = v\tan\delta/L$ with $\dot\phi = v\kappa$ gives $\tan\delta = L\kappa$.
:::

::: example One pure-pursuit step {#ex-pure-pursuit}
A differential-drive robot ($r = 0.05\,\mathrm m$, $b = 0.30\,\mathrm m$) moving at $v = 0.5\,\mathrm{m/s}$ finds the path point $1.5\,\mathrm m$ ahead at body coordinates $(1.2, 0.9)\,\mathrm m$. Compute the commanded curvature, yaw rate and wheel speeds.
::: solution
Check $L_d = \sqrt{1.44 + 0.81} = 1.5\,\mathrm m$ ✓. $\kappa = 2\times0.9/2.25 = 0.80\,\mathrm{m^{-1}}$ (radius $1.25\,\mathrm m$, turning left); $\alpha = \operatorname{atan2}(0.9, 1.2) = 36.9^\circ$ and $2\sin\alpha/L_d = 2\times0.6/1.5 = 0.80$ ✓. $\omega = v\kappa = 0.40\,\mathrm{rad/s}$, so $\omega_R = (0.5 + 0.4\times0.15)/0.05 = 11.2\,\mathrm{rad/s}$ and $\omega_L = (0.5 - 0.06)/0.05 = 8.8\,\mathrm{rad/s}$. On the next control cycle a new goal point is chosen $L_d$ ahead on the path, so the robot never actually completes this arc; the arc is a local plan, recomputed continuously.
:::
:::

The lookahead distance is the tuning knob: a short $L_d$ tracks tightly but oscillates and reacts violently to path noise; a long $L_d$ is smooth but cuts corners. A common rule makes $L_d$ proportional to speed.

For a straight path, a linear controller gives more insight. Let the path be the $x$-axis, with lateral error $y$ and heading error $\phi$. For small errors [[#eq-unicycle]] gives $\dot y = v\sin\phi \approx v\phi$ and $\dot\phi = \omega$. The feedback $\omega = -k_1y - k_2\phi$ yields
$$
\ddot y + k_2\dot y + vk_1y = 0 ,
$$ {#eq-lateral}
a second-order system with $\omega_n = \sqrt{vk_1}$ and $\zeta = k_2/(2\sqrt{vk_1})$: choose $k_1 = \omega_n^2/v$, $k_2 = 2\zeta\omega_n$. The gain on lateral error must be scaled inversely with speed to keep the same response in time — at high speed a small heading change produces a large lateral rate.

::: example A lateral controller {#ex-lateral}
A unicycle robot moves at $v = 1.0\,\mathrm{m/s}$ and must follow the $x$-axis with $\omega_n = 1.0\,\mathrm{rad/s}$ and $\zeta = 0.7$. Find the gains and the initial yaw-rate command when it starts $0.5\,\mathrm m$ to the left of the line, parallel to it. Estimate how quickly the error decays.
::: solution
$k_1 = \omega_n^2/v = 1.0\,\mathrm{rad/(m\,s)}$, $k_2 = 2\zeta\omega_n = 1.4\,\mathrm{s^{-1}}$. Initially $y = 0.5\,\mathrm m$, $\phi = 0$: $\omega = -0.5\,\mathrm{rad/s}$ (turn right, towards the line). The error envelope decays like $e^{-\zeta\omega_nt} = e^{-0.7t}$, so reaching $10\%$ of the initial error takes roughly $\ln10/0.7 = 3.3\,\mathrm s$, about $3.3\,\mathrm m$ of travel, with an overshoot of $e^{-\pi\zeta/\sqrt{1-\zeta^2}} = 4.6\%$ ($2.3\,\mathrm{cm}$) on the far side. Simulating the nonlinear model ($\dot y = v\sin\phi$) gives a largest heading error of $0.23\,\mathrm{rad}$ ($13^\circ$) on the way in and $\lvert y\rvert < 5\,\mathrm{cm}$ from $t = 2.6\,\mathrm s$ on — small angles, so the linearisation is reasonable.
:::
:::

::: widget phaseplane
f: y
g: -w*x - k2*y
x: -1, 1
y: -1, 1
sliders: w=1:0.1:6:0.1; k2=1.4:0:3:0.1
points: 0.5, 0; -0.5, 0.3; 0.8, -0.8
caption: Linearised path-following error dynamics [[#eq-lateral]] ($x$-axis: lateral error $y$ in m; $y$-axis: its rate $\dot y = v\phi$ in m/s), with $w = vk_1$ and damping gain $k_2$; the start values $w = 1$, $k_2 = 1.4$ are those of [[#ex-lateral]]. Trajectories spiral gently into the origin — the robot on the path with the right heading. Reduce $k_2$ towards 0 and the robot weaves along the path; raise $w$ (higher speed with the gain $k_1$ unchanged) and the oscillation becomes faster and less damped, which is why $k_1$ should be scaled as $1/v$.
:::

::: remark Shortest paths for car-like robots
For a car that can only drive forwards with a minimum turning radius, Dubins showed in 1957 that a shortest path between two poses consists of at most three pieces, each a straight segment (S) or an arc of minimum radius (C): one of the patterns CSC or CCC. Allowing reverse driving (Reeds and Shepp) adds cusps and more patterns. These paths are used as local connections in planners for car-like vehicles ([[robotics/motion-planning-perception]]).
:::

::: warning Do not control a nonholonomic robot as if it were holonomic
A controller that commands a velocity *towards* the goal point from the current position — natural for an arm or an omnidirectional base — asks a differential-drive robot for sideways velocity it cannot produce. Projecting the command onto the forward direction then lets the robot drive past the goal or circle it. Moreover, no smooth, time-invariant state feedback can stabilise a nonholonomic vehicle at a single pose (Brockett's condition), so pose-regulation controllers are discontinuous or time-varying, and practical systems stabilise to a *path* (as above) rather than to a point, ending with a separate final-heading manoeuvre.
:::

## Localisation and mapping {#sec-localisation}

Because odometry drifts, a mobile robot must compare what it senses with what it expects: landmarks at known positions, the walls of a known map, satellite positioning outdoors. Since every sensor is noisy, the robot's knowledge of its pose is a probability distribution — the **belief** $\mathrm{bel}(\mathbf q_k)$ — rather than a single pose.

::: algorithm Bayes filter {#alg-bayes}
Input: belief $\mathrm{bel}(\mathbf q_{k-1})$, control $\mathbf u_k$ (e.g. odometry increments), measurement $\mathbf z_k$.
1. **Prediction** with the motion model $p(\mathbf q_k\mid\mathbf q_{k-1},\mathbf u_k)$: $\overline{\mathrm{bel}}(\mathbf q_k) = \int p(\mathbf q_k\mid\mathbf q_{k-1},\mathbf u_k)\,\mathrm{bel}(\mathbf q_{k-1})\,d\mathbf q_{k-1}$. Uncertainty grows.
2. **Correction** with the measurement model $p(\mathbf z_k\mid\mathbf q_k)$: $\mathrm{bel}(\mathbf q_k) = \eta\,p(\mathbf z_k\mid\mathbf q_k)\,\overline{\mathrm{bel}}(\mathbf q_k)$, where $\eta$ normalises. Uncertainty shrinks.
:::

The prediction is the law of total probability and the correction is Bayes' rule ([conditional probability](/learn/maths/lesson.php?c=probability&l=conditional-probability)); the assumption that makes the recursion valid is the Markov property — given the current pose, past measurements and controls carry no further information. Implementations differ in how they represent the belief: a grid of probabilities (histogram filter), a Gaussian (the Kalman filter of [[robotics/motion-planning-perception]]), or a set of samples (particle filter, widely used for localisation in a known map).

**Mapping** inverts the problem: given the poses, estimate the map. The **occupancy grid** divides the floor into cells, each with a probability of being occupied, updated independently by Bayes' rule. Working with **log-odds** $\ell = \ln\frac{p}{1-p}$ turns the update into an addition: each measurement adds $\ln\frac{p(\text{occ}\mid z)}{1 - p(\text{occ}\mid z)}$ (minus the prior's log-odds), so a cell repeatedly seen as occupied accumulates evidence linearly.

::: example An occupancy-grid cell {#ex-occupancy}
A cell starts at $p = 0.5$ ($\ell = 0$). A range sensor's inverse model says that a "hit" in the cell means occupied with probability $0.7$ and a beam passing through it ("miss") means occupied with probability $0.4$. After two hits and then one miss, what is the occupancy probability?
::: solution
Hit: $\ell_{\text{hit}} = \ln(0.7/0.3) = 0.847$. Miss: $\ell_{\text{miss}} = \ln(0.4/0.6) = -0.405$. After two hits, $\ell = 1.695$ and $p = 1/(1 + e^{-1.695}) = 0.845$. After the miss, $\ell = 1.289$ and $p = 0.784$. The cell is still probably occupied, but less certainly. Additivity makes updates cheap (one addition per cell per beam) and symmetric: the order of the measurements does not matter. Implementations clamp $\ell$ to a range such as $[-4, 4]$ so that a cell can change state again if the world changes (a door opens).
:::
:::

Building the map while localising in it — **simultaneous localisation and mapping** (SLAM) — couples the two problems: pose errors corrupt the map, and map errors corrupt localisation. The probabilistic formulation of SLAM began with Smith and Cheeseman's 1986 work on representing and propagating spatial uncertainty, and modern systems combine odometry, lidar or cameras and optimisation over the whole trajectory.

::: quiz
A differential-drive robot has $\omega_R = 10\,\mathrm{rad/s}$ and $\omega_L = -10\,\mathrm{rad/s}$. Where is its instantaneous centre of rotation?
- [ ] at infinity: it drives straight
- [x] at the midpoint of the axle: it turns on the spot
- [ ] at the left wheel
- [ ] the ICR is undefined because $v = 0$
::: solution
$v = r(10 - 10)/2 = 0$ and $\omega = 20r/b \ne 0$, so $R = v/\omega = 0$: the robot spins about the axle midpoint. The ICR is undefined only when both $v$ and $\omega$ are zero (or at infinity when $\omega = 0$).
:::
:::

::: history
L. E. Dubins characterised the shortest paths of bounded curvature in the *American Journal of Mathematics* in 1957, long before car-like robots needed them. R. Craig Coulter's 1992 Carnegie Mellon technical report "Implementation of the pure pursuit path tracking algorithm" documented the geometric pursuit law used on the Navlab autonomous vehicles; it remains one of the most widely used path trackers. Randall Smith and Peter Cheeseman's 1986 paper "On the representation and estimation of spatial uncertainty" in the *International Journal of Robotics Research*, and the stochastic map of Smith, Self and Cheeseman, laid the probabilistic foundations of localisation and SLAM, developed in Thrun, Burgard and Fox's *Probabilistic Robotics* (2005).
:::

::: summary
- Rolling without skidding gives the Pfaffian constraint $-\dot x\sin\phi + \dot y\cos\phi = 0$, which is nonholonomic: it restricts velocities but not reachable poses.
- Differential drive: $v = r(\omega_R + \omega_L)/2$, $\omega = r(\omega_R - \omega_L)/b$, unicycle model $\dot x = v\cos\phi$, $\dot y = v\sin\phi$, $\dot\phi = \omega$; ICR at $R = v/\omega$ on the axle line.
- Car-like robots: $\dot\phi = v\tan\delta/L$, $R_{\min} = L/\tan\delta_{\max}$; Ackermann geometry $\cot\delta_o - \cot\delta_i = w/L$.
- Exact odometry moves along the chord of the arc: $\Delta s\,\frac{\sin(\Delta\phi/2)}{\Delta\phi/2}$ at the mean heading. Odometry drifts without bound; heading errors make position errors grow quadratically with distance.
- Pure pursuit: curvature $\kappa = 2\sin\alpha/L_d = 2y_g/L_d^2$ towards a lookahead point; a linear lateral controller gives $\ddot y + k_2\dot y + vk_1y = 0$.
- Localisation is a Bayes filter (predict with the motion model, correct with the measurement model); occupancy grids update cells additively in log-odds.
:::

## Exercises

::: exercise Turning radius {#exr-radius level=1 check="1"}
A differential-drive robot has $r = 0.10\,\mathrm m$ and $b = 0.50\,\mathrm m$; its wheels turn at $\omega_R = 10\,\mathrm{rad/s}$ and $\omega_L = 6\,\mathrm{rad/s}$. Find $v$, $\omega$ and the turning radius. (Enter $R$ in m.)
::: solution
$v = 0.1\times16/2 = 0.8\,\mathrm{m/s}$, $\omega = 0.1\times4/0.5 = 0.8\,\mathrm{rad/s}$, $R = v/\omega = 1.0\,\mathrm m$ (to the left). Check: $\frac b2\frac{16}{4} = 0.25\times4 = 1.0$ ✓.
:::
:::

::: exercise Wheel speeds for a command {#exr-wheels level=1 check="11"}
A robot with $r = 0.05\,\mathrm m$, $b = 0.30\,\mathrm m$ must move at $v = 0.4\,\mathrm{m/s}$ with $\omega = 1.0\,\mathrm{rad/s}$. Find both wheel speeds. (Enter $\omega_R$ in rad/s.)
::: solution
$\omega_R = (v + \omega b/2)/r = (0.4 + 0.15)/0.05 = 11\,\mathrm{rad/s}$; $\omega_L = (0.4 - 0.15)/0.05 = 5\,\mathrm{rad/s}$. Turning radius $0.4\,\mathrm m$.
:::
:::

::: exercise Minimum turning radius {#exr-rmin level=1 check="1.7321"}
A small car-like robot has wheelbase $L = 1.0\,\mathrm m$ and maximum steering angle $30^\circ$. What is its minimum turning radius at the rear-axle midpoint? (Enter it in m, rounded to four decimal places.)
::: solution
$R_{\min} = L/\tan30^\circ = 1.0/0.5774 = 1.7321\,\mathrm m$. To reverse its heading in a corridor it needs a width of at least about $2R_{\min}$ plus its own width, or a multi-point turn.
:::
:::

::: exercise Pure-pursuit curvature {#exr-pursuit level=2 check="0.2353"}
The lookahead point is at body-frame coordinates $(2.0, 0.5)\,\mathrm m$. What curvature does pure pursuit command? (Enter $\kappa$ in $\mathrm{m^{-1}}$, rounded to four decimal places.)
::: solution
$L_d^2 = 4 + 0.25 = 4.25\,\mathrm{m^2}$, $\kappa = 2\times0.5/4.25 = 0.2353\,\mathrm{m^{-1}}$ (radius $4.25\,\mathrm m$, to the left). Check with $\alpha = \operatorname{atan2}(0.5, 2.0) = 14.04^\circ$: $2\sin\alpha/L_d = 2\times0.2425/2.0616 = 0.2353$ ✓.
:::
:::

::: exercise Ackermann inner wheel {#exr-ackermann level=2 check="30.17"}
A vehicle with $L = 2.5\,\mathrm m$ and front track $w = 1.4\,\mathrm m$ drives a circle of radius $R = 5\,\mathrm m$ (at the rear-axle midpoint). Find both front-wheel steering angles. (Enter the inner angle in degrees, rounded to two decimal places.)
::: solution
$\delta_i = \arctan(2.5/(5 - 0.7)) = \arctan0.5814 = 30.17^\circ$; $\delta_o = \arctan(2.5/5.7) = 23.68^\circ$. Check: $\cot23.68^\circ - \cot30.17^\circ = 2.280 - 1.720 = 0.560 = 1.4/2.5$ ✓.
:::
:::

::: exercise An odometry step {#exr-odom level=2 check="0.30*sin(4/3)"}
For [[#ex-odometry]], verify the exact update by integrating the unicycle model directly with $v$ and $\omega$ constant. Take the interval as $1\,\mathrm s$. (Enter $x$ in m, exactly — an expression such as 0.3*sin(4/3) is accepted.)
::: solution
$v = 0.40\,\mathrm{m/s}$, $\omega = 4/3\,\mathrm{rad/s}$. $x(1) = \int_0^1v\cos(\omega t)\,dt = \frac v\omega\sin\omega = 0.30\sin(4/3) = 0.2916\,\mathrm m$; $y(1) = \frac v\omega(1 - \cos\omega) = 0.2294\,\mathrm m$, matching the chord formula.
:::
:::

::: exercise Calibrating the track width {#exr-track level=3 check="35.64"}
A robot's odometry uses $b = 0.300\,\mathrm m$, but its effective track is $0.303\,\mathrm m$. It is commanded to spin on the spot until its odometry reports ten full turns. (a) How far does it actually turn, and what is the heading error? (b) Explain how a test of this kind, done in both directions, separates track-width error from wheel-radius mismatch. (Enter the magnitude of the heading error in degrees, rounded to two decimal places.)
::: solution
(a) Odometry computes $\Delta\phi_{\text{odo}} = r(\Delta\varphi_R - \Delta\varphi_L)/b_{\text{nom}}$, the true rotation is $r(\Delta\varphi_R - \Delta\varphi_L)/b_{\text{true}}$, so the true rotation is $3600^\circ\times0.300/0.303 = 3564.36^\circ$: the robot falls short by $35.64^\circ$. (b) A track-width error scales every rotation by the same factor in both directions (clockwise and anticlockwise turns are both too short or both too long), while a wheel-radius mismatch adds a rotation proportional to distance travelled whose sign does not depend on the turn direction — it makes the robot curve the same way on straight segments. Driving a square path clockwise and anticlockwise and measuring the closure errors therefore allows the two errors to be estimated and corrected separately (the idea behind Borenstein and Feng's UMBmark test).
:::
:::

::: exercise Parallel parking from the constraints {#exr-parking level=3}
A unicycle can only drive forwards/backwards ($v$) and turn ($\omega$). Show that the sequence "drive forward $\varepsilon$, turn $\varepsilon$, drive back $\varepsilon$, turn back $\varepsilon$" moves it sideways by approximately $\varepsilon^2$ (to second order), starting from $(0, 0, 0)$. Relate this to the non-integrability proof of [[#prop-nonholonomic]] and to how a car parallel-parks.
::: solution
Track the pose (small-angle arithmetic kept to second order). Forward $\varepsilon$: $(\varepsilon, 0, 0)$. Turn $\varepsilon$: $(\varepsilon, 0, \varepsilon)$. Back $\varepsilon$ along heading $\varepsilon$: $(\varepsilon - \varepsilon\cos\varepsilon,\ -\varepsilon\sin\varepsilon,\ \varepsilon) \approx (\varepsilon^3/2, -\varepsilon^2, \varepsilon)$. Turn back: $(\approx0, -\varepsilon^2, 0)$. The net displacement is $\varepsilon^2$ *sideways* (to the right here; reverse the turns to go left) with no net heading change — motion in exactly the direction forbidden by the instantaneous constraint. In the language of control theory, the sideways direction is the Lie bracket of the "drive" and "turn" vector fields $(\cos\phi, \sin\phi, 0)$ and $(0, 0, 1)$, which is $(-\sin\phi, \cos\phi, 0)$ up to sign, and it lies outside the span of the two fields: that is why the constraint cannot be integrated to a surface. A car parallel-parks by the same principle, with the turning replaced by steering while driving; because the sideways gain is only second order in the manoeuvre size, it takes several back-and-forth cycles in a tight space.
:::
:::

## Further reading

Siegwart, Nourbakhsh and Scaramuzza cover wheel kinematics, odometry error and localisation for mobile robots at an introductory level; Lynch and Park treat nonholonomic constraints, controllability and motion planning for wheeled robots; Thrun, Burgard and Fox develop Bayes filters, occupancy grids and SLAM.
