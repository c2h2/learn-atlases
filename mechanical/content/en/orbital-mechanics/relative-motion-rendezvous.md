Every crew and cargo flight to a space station ends with a rendezvous: a spacecraft that was launched hours or days earlier must arrive at the same point of the same orbit, at the same time and at almost zero relative speed. Phasing manoeuvres ([[orbital-mechanics/orbital-manoeuvres]]) bring the chaser within a few tens of kilometres. The final approach is a different kind of problem: what matters is no longer the shape of each orbit but the small *difference* between two neighbouring orbits, seen from the target. In that view orbital mechanics becomes strange. A chaser that fires its engine towards the target drifts away from it; one sitting motionless a hundred metres below the target is a few kilometres ahead of it one orbit later; to move forward you thrust downward. All of this follows from one set of linear equations — the **Clohessy–Wiltshire** (or **Hill**) equations — which this chapter derives, solves in closed form, and uses to design approach trajectories, two-impulse rendezvous transfers and formation-flying orbits. We finish by checking the linear theory against the exact two-body motion, to see when it can be trusted.

The tools are the rotating-frame kinematics of [[dynamics/relative-motion]] and linear constant-coefficient ODEs ([linear systems](/learn/maths/lesson.php?c=ode&l=linear-systems)).

## The target's frame {#sec-frame}

::: definition Local-vertical local-horizontal frame {#def-lvlh}
Let the **target** move on a circular orbit of radius $r_0$ with mean motion $n = \sqrt{\mu/r_0^3}$. The **local-vertical local-horizontal** (LVLH, or **Hill**) frame has its origin at the target and rotates with it at angular velocity $\boldsymbol{\Omega} = n\,\hat{\mathbf{k}}$:

- $\hat{\mathbf{i}}$ points **radially outward** (away from the Earth's centre), the **R-bar** direction;
- $\hat{\mathbf{j}}$ points **along-track**, in the direction of the target's velocity, the **V-bar** direction;
- $\hat{\mathbf{k}} = \hat{\mathbf{i}}\times\hat{\mathbf{j}}$ points along the orbit normal (the target's angular momentum), the **H-bar** direction.

The chaser's position relative to the target is $\delta\mathbf{r} = x\,\hat{\mathbf{i}} + y\,\hat{\mathbf{j}} + z\,\hat{\mathbf{k}}$: $x$ is radial (positive above the target), $y$ along-track (positive ahead), $z$ cross-track.
:::

Different organisations order and sign these axes differently — the convention used in International Space Station operations, for instance, has $x$ along-track and $z$ pointing *down*. Check the convention every time you read a rendezvous document; the physics is the same, but the signs in the equations are not.

## The Clohessy–Wiltshire equations {#sec-cw}

::: theorem The Clohessy–Wiltshire equations {#thm-cw}
If the target's orbit is circular, both bodies move under the inverse-square gravity of the same central body only, and the separation is small compared with $r_0$, then to first order in $\delta r/r_0$ the relative motion in the LVLH frame obeys
$$
\begin{aligned}
\ddot x - 3n^2x - 2n\dot y &= a_x,\\
\ddot y + 2n\dot x &= a_y,\\
\ddot z + n^2 z &= a_z,
\end{aligned}
$$ {#eq-cw}
where $(a_x, a_y, a_z)$ is any thrust acceleration of the chaser (zero for free motion).
:::

::: proof
**Inertial relative acceleration.** Let $\mathbf{r}_0$ be the target's position and $\mathbf{r} = \mathbf{r}_0 + \delta\mathbf{r}$ the chaser's. Then
$$
\delta\ddot{\mathbf{r}}\big|_\text{inertial} = -\frac{\mu\,(\mathbf{r}_0 + \delta\mathbf{r})}{\lVert\mathbf{r}_0 + \delta\mathbf{r}\rVert^3} + \frac{\mu\,\mathbf{r}_0}{r_0^3} + \mathbf{a}.
$$
**Linearisation.** $\lVert\mathbf{r}_0 + \delta\mathbf{r}\rVert^{-3} = (r_0^2 + 2\mathbf{r}_0\cdot\delta\mathbf{r} + \delta r^2)^{-3/2} = r_0^{-3}\left(1 - 3\,\mathbf{r}_0\cdot\delta\mathbf{r}/r_0^2 + O(\delta r^2/r_0^2)\right)$. Keeping first-order terms,
$$
\delta\ddot{\mathbf{r}}\big|_\text{inertial} = -\frac{\mu}{r_0^3}\left(\delta\mathbf{r} - \frac{3\,(\mathbf{r}_0\cdot\delta\mathbf{r})}{r_0^2}\,\mathbf{r}_0\right) + \mathbf{a} = -n^2\left(\delta\mathbf{r} - 3x\,\hat{\mathbf{i}}\right) + \mathbf{a},
$$
since $\mathbf{r}_0 = r_0\hat{\mathbf{i}}$ and $\mathbf{r}_0\cdot\delta\mathbf{r} = r_0 x$. In components: $(2n^2x,\ -n^2y,\ -n^2z) + \mathbf{a}$. This is the **gravity gradient**: a body displaced radially outward is pulled back less than it would need to keep up, one displaced along-track or cross-track is pulled back towards the target's orbit.

**Rotating frame.** The LVLH frame rotates at the constant rate $\boldsymbol{\Omega} = n\hat{\mathbf{k}}$, so (from [[dynamics/relative-motion]])
$$
\delta\ddot{\mathbf{r}}\big|_\text{inertial} = \delta\ddot{\mathbf{r}}\big|_\text{rot} + 2\boldsymbol{\Omega}\times\delta\dot{\mathbf{r}}\big|_\text{rot} + \boldsymbol{\Omega}\times(\boldsymbol{\Omega}\times\delta\mathbf{r}),
$$
with no $\dot{\boldsymbol{\Omega}}$ term because the target's orbit is circular. Here $2\boldsymbol{\Omega}\times\delta\dot{\mathbf{r}} = 2n(-\dot y,\ \dot x,\ 0)$ and $\boldsymbol{\Omega}\times(\boldsymbol{\Omega}\times\delta\mathbf{r}) = -n^2(x,\ y,\ 0)$. Equating the two expressions for the inertial acceleration component by component: $x$: $\ddot x - 2n\dot y - n^2x = 2n^2x + a_x$, i.e. $\ddot x - 2n\dot y - 3n^2x = a_x$; $y$: $\ddot y + 2n\dot x - n^2y = -n^2y + a_y$, i.e. $\ddot y + 2n\dot x = a_y$; $z$: $\ddot z = -n^2z + a_z$. These are [[#eq-cw]]. The assumptions are: two-body gravity (no drag, no oblateness), circular target orbit, and $\delta r \ll r_0$ so that second-order terms are negligible.
:::

The in-plane equations are coupled through the **Coriolis terms** $2n\dot y$ and $2n\dot x$; the cross-track motion is a simple harmonic oscillation at the orbital frequency, because a small cross-track offset is just a slightly different orbital plane, crossing the target's plane twice per orbit.

## The closed-form solution {#sec-solution}

The equations [[#eq-cw]] are linear with constant coefficients and can be solved exactly ([second-order linear ODEs](/learn/maths/lesson.php?c=ode&l=second-order-linear)).

::: proposition Solution of the Clohessy–Wiltshire equations {#prop-cw-solution}
For free motion from $(x_0, y_0, z_0)$ with velocity $(\dot x_0, \dot y_0, \dot z_0)$ at $t = 0$, with $c = \cos nt$ and $s = \sin nt$,
$$
\begin{aligned}
x(t) &= (4 - 3c)\,x_0 + \frac{s}{n}\,\dot x_0 + \frac{2}{n}(1 - c)\,\dot y_0,\\
y(t) &= 6(s - nt)\,x_0 + y_0 - \frac{2}{n}(1 - c)\,\dot x_0 + \frac{1}{n}(4s - 3nt)\,\dot y_0,\\
z(t) &= c\,z_0 + \frac{s}{n}\,\dot z_0,
\end{aligned}
$$ {#eq-cw-solution}
and the velocities are
$$
\begin{aligned}
\dot x(t) &= 3ns\,x_0 + c\,\dot x_0 + 2s\,\dot y_0,\\
\dot y(t) &= -6n(1 - c)\,x_0 - 2s\,\dot x_0 + (4c - 3)\,\dot y_0,\\
\dot z(t) &= -ns\,z_0 + c\,\dot z_0.
\end{aligned}
$$
In matrix form, $\begin{bmatrix}\delta\mathbf{r}\\ \delta\mathbf{v}\end{bmatrix}(t) = \begin{bmatrix}\boldsymbol{\Phi}_{rr} & \boldsymbol{\Phi}_{rv}\\ \boldsymbol{\Phi}_{vr} & \boldsymbol{\Phi}_{vv}\end{bmatrix}\begin{bmatrix}\delta\mathbf{r}_0\\ \delta\mathbf{v}_0\end{bmatrix}$, where the $3\times3$ blocks are read off the coefficients above: the **state transition matrix** of the relative motion.
:::

::: proof
Integrate the $y$-equation once: $\dot y + 2nx = \dot y_0 + 2nx_0 \equiv C$, a constant. Substitute $\dot y = C - 2nx$ into the $x$-equation: $\ddot x - 3n^2x - 2n(C - 2nx) = 0$, i.e. $\ddot x + n^2x = 2nC$. Its general solution is $x = 2C/n + A\cos nt + B\sin nt$. The initial conditions give $A = x_0 - 2C/n$ and $B = \dot x_0/n$; with $C = \dot y_0 + 2nx_0$, $A = -3x_0 - 2\dot y_0/n$ and
$$
x = 4x_0 + \frac{2\dot y_0}{n} - \left(3x_0 + \frac{2\dot y_0}{n}\right)c + \frac{\dot x_0}{n}s,
$$
which is the stated $x(t)$. Then $\dot y = C - 2nx$ integrates to $y = y_0 + Ct - 2n\int_0^t x\,\mathrm{d}t'$; carrying out the integral of the three terms of $x$ and collecting gives the stated $y(t)$. The $z$-equation is a harmonic oscillator. The velocities are the time derivatives. Every formula can be checked by substitution into [[#eq-cw]] and by setting $t = 0$.
:::

The $y$-solution contains terms that grow linearly with time. Collecting them, $y_\text{secular} = -3t\,(\dot y_0 + 2nx_0)$: unless
$$
\dot y_0 = -2n\,x_0,
$$ {#eq-no-drift}
the chaser drifts steadily along-track, by $-6\pi(\dot y_0 + 2nx_0)/n$ per orbit. The physical meaning: $\dot y_0 + 2nx_0$ measures the difference between the chaser's orbital energy (semi-major axis) and the target's, and orbits of different size have different periods. When [[#eq-no-drift]] holds the periods are equal and the motion is periodic.

::: example Sitting still, a hundred metres below {#ex-below}
A space station is in a circular orbit at $400\ \mathrm{km}$ altitude ($n = 1.1314\times10^{-3}\ \mathrm{rad/s}$, $T = 5553\ \mathrm{s}$). At $t = 0$ a chaser is $100\ \mathrm{m}$ directly below it, with zero velocity relative to the LVLH frame. Describe its motion over one orbit.
::: solution
$x_0 = -100\ \mathrm{m}$, everything else zero. From [[#eq-cw-solution]]:
$$
x(t) = -100\,(4 - 3\cos nt)\ \mathrm{m}, \qquad y(t) = -600\,(\sin nt - nt)\ \mathrm{m}.
$$
Radially, the chaser oscillates between $-100\ \mathrm{m}$ (at $t = 0$ and $t = T$) and $-700\ \mathrm{m}$ (at $t = T/2$). Along-track, it moves ahead steadily; after one orbit ($nt = 2\pi$)
$$
y(T) = 600 \times 2\pi = 1200\pi = 3770\ \mathrm{m}.
$$
*Check:* the no-drift condition [[#eq-no-drift]] would require $\dot y_0 = -2n x_0 = +0.226\ \mathrm{m/s}$; the chaser has zero, so it drifts at $-6\pi(0 + 2n x_0)/n = 12\pi \times 100\ \mathrm{m} = 3.77\ \mathrm{km}$ per orbit, *ahead* — lower orbits are faster. Physically, zero relative velocity at $100\ \mathrm{m}$ below means an inertial speed of $n(r_0 - 0.1\ \mathrm{km})$, slightly less than the local circular speed, so the chaser is at the apoapsis of an ellipse whose periapsis lies about $700\ \mathrm{m}$ below the target's orbit, and whose average radius is less than the target's. Integrating the exact two-body equations numerically for the same initial state gives $y(T) = 3769.6\ \mathrm{m}$ and $x(T) = -101.0\ \mathrm{m}$: the linear theory is good to a fraction of a per cent here.
:::
:::

::: widget parametric
fx: 6*(sin(t) - t)*x0 - 2*(1 - cos(t))*vx/0.0011314 + (4*sin(t) - 3*t)*vy/0.0011314
fy: (4 - 3*cos(t))*x0 + sin(t)*vx/0.0011314 + 2*(1 - cos(t))*vy/0.0011314
t: 0, 4*pi
x: -4000, 8000
y: -1500, 1500
sliders: x0=-100:-500:500:10; vx=0:-0.5:0.5:0.005; vy=0:-0.5:0.5:0.005
equal: false
caption: Two orbits of free relative motion seen from a target at $400\ \mathrm{km}$ altitude, from [[#eq-cw-solution]]: along-track $y$ horizontal (positive ahead, metres), radial $x$ vertical (positive up), parameter $t$ is the orbital angle $nt$. Sliders set the initial radial offset $x_0$ (m) and the initial relative velocities $v_x = \dot x_0$ and $v_y = \dot y_0$ (m/s); $y_0 = 0$. The default is [[#ex-below]]: the chaser loops downward and forward, gaining $3.77\ \mathrm{km}$ per orbit. Now set $v_y = 0.225$ (close to $-2nx_0 = 0.226$): the drift stops and the path closes into a $2{:}1$ ellipse. Set $x_0 = 0$, $v_x = 0$ and $v_y = 0.1$ — a forward burn — and watch the chaser rise and fall *behind*.
:::

## Natural motion and the paradoxes of thrust {#sec-natural}

With [[#eq-no-drift]] and $y_0 = 0$, $\dot x_0 = 0$, the solution reduces to
$$
x = x_0\cos nt, \qquad y = -2x_0\sin nt:
$$
an ellipse centred on the target, twice as long along-track as radially, traversed once per orbit — a **natural motion circumnavigation**. It costs nothing to maintain (in the two-body approximation) and is used to inspect a target from all sides. Adding a cross-track oscillation $z = z_0\cos nt$ tilts the ellipse out of the orbital plane; with $z_0 = \sqrt3\,x_0$ the relative orbit becomes a circle of radius $2x_0$ in a plane inclined to the local horizontal, the basis of some formation-flying designs.

Thrust behaves counter-intuitively. A small forward burn $\dot y_0 > 0$ raises the chaser's energy, so it climbs into a higher, *slower* orbit: after one orbit it is $-6\pi\dot y_0/n$ along-track — behind — having risen to $4\dot y_0/n$ above the target half an orbit after the burn. A radial burn, by contrast, produces no net drift: after one orbit the chaser is back where it started (the $\dot x_0$ terms are periodic), but half an orbit later it is $-4\dot x_0/n$ along-track. So the efficient way to **move along V-bar** is to thrust *radially*: a downward burn ($\dot x_0 < 0$) carries the chaser forward. These are the **radial hop** and the **tangential hop** of rendezvous practice.

::: example A forward burn that loses ground {#ex-forward}
At the station of [[#ex-below]], an astronaut's tool bag (or a small inspection vehicle) starts at the target with a forward relative velocity of $0.10\ \mathrm{m/s}$. Where is it half an orbit and one orbit later?
::: solution
$\dot y_0 = 0.10\ \mathrm{m/s}$, all else zero. From [[#eq-cw-solution]]:
$$
x = \frac{2}{n}(1 - \cos nt)\dot y_0, \qquad y = \frac{1}{n}(4\sin nt - 3nt)\dot y_0.
$$
With $\dot y_0/n = 88.4\ \mathrm{m}$: at $t = T/2$, $x = 4 \times 88.4 = 354\ \mathrm{m}$ (above) and $y = -3\pi \times 88.4 = -833\ \mathrm{m}$ (behind); at $t = T$, $x = 0$ and $y = -6\pi \times 88.4 = -1666\ \mathrm{m}$.

*Check:* the nonlinear two-body integration gives $y(T) = -1666.1\ \mathrm{m}$ and $x(T) = -0.2\ \mathrm{m}$. The object thrown forward ends up $1.7\ \mathrm{km}$ behind after an orbit — the reason objects released from the station drift away and come back near the station only by coincidence.
:::
:::

::: warning Intuition from straight-line motion fails here {#warn-intuition}
In free space, pointing at the target and thrusting brings you to it. In orbit, a chaser $1\ \mathrm{km}$ behind the target on V-bar that thrusts gently forward first rises and then falls back — it *loses* ground. To approach along V-bar a chaser must either use repeated hops (radial impulses, or a sequence of small along-track impulses each followed by an opposite one) or thrust continuously to cancel the Coriolis and gravity-gradient accelerations. Along R-bar the trap is different: a chaser hovering $100\ \mathrm{m}$ below the target with zero relative velocity is not "parked" — it drifts ahead by $3.8\ \mathrm{km}$ per orbit. Two more sign traps: the axis convention (radial up versus radial down, which flips the sign of every $x$ term), and forgetting that the LVLH frame rotates, so a relative velocity of zero is not the same as an inertial velocity equal to the target's.
:::

## Two-impulse rendezvous {#sec-rendezvous}

To bring the chaser from $\delta\mathbf{r}_0$ to the target in a chosen time $t_f$ the state transition matrix is used exactly as Lambert's problem is used for full orbits ([[orbital-mechanics/orbit-determination]]):

::: algorithm Two-impulse Clohessy–Wiltshire rendezvous {#alg-cw-rendezvous}
Given the chaser's relative state $(\delta\mathbf{r}_0, \delta\mathbf{v}_0^-)$ just before the first burn and the transfer time $t_f$:

1. Required departure velocity: $\delta\mathbf{v}_0^+ = -\boldsymbol{\Phi}_{rv}(t_f)^{-1}\,\boldsymbol{\Phi}_{rr}(t_f)\,\delta\mathbf{r}_0$, so that $\delta\mathbf{r}(t_f) = \boldsymbol{\Phi}_{rr}\delta\mathbf{r}_0 + \boldsymbol{\Phi}_{rv}\delta\mathbf{v}_0^+ = \mathbf{0}$.
2. First impulse: $\Delta\mathbf{v}_1 = \delta\mathbf{v}_0^+ - \delta\mathbf{v}_0^-$.
3. Arrival velocity: $\delta\mathbf{v}_f^- = \boldsymbol{\Phi}_{vr}(t_f)\,\delta\mathbf{r}_0 + \boldsymbol{\Phi}_{vv}(t_f)\,\delta\mathbf{v}_0^+$.
4. Second impulse, to stop at the target: $\Delta\mathbf{v}_2 = -\delta\mathbf{v}_f^-$.
5. Total cost $\lVert\Delta\mathbf{v}_1\rVert + \lVert\Delta\mathbf{v}_2\rVert$; repeat over a range of $t_f$ to choose the transfer time.

$\boldsymbol{\Phi}_{rv}$ is singular when $nt_f$ is a multiple of $2\pi$ (and for the in-plane block at certain other times), so those transfer times must be avoided: after a whole orbit a velocity impulse can produce no net displacement except along-track.
:::

::: example A radial hop along V-bar {#ex-hop}
A chaser is $10.0\ \mathrm{km}$ behind the station of [[#ex-below]], on V-bar, at rest in the LVLH frame. Plan a two-impulse transfer that arrives at the station in half an orbit.
::: solution
$\delta\mathbf{r}_0 = (0, -10\,000, 0)\ \mathrm{m}$, $\delta\mathbf{v}_0^- = \mathbf{0}$, $nt_f = \pi$ ($c = -1$, $s = 0$). In-plane blocks at $nt = \pi$:
$$
\boldsymbol{\Phi}_{rr} = \begin{bmatrix}7 & 0\\ -6\pi & 1\end{bmatrix}, \qquad
\boldsymbol{\Phi}_{rv} = \frac1n\begin{bmatrix}0 & 4\\ -4 & -3\pi\end{bmatrix}.
$$
$\boldsymbol{\Phi}_{rr}\delta\mathbf{r}_0 = (0, -10\,000)$. Solving $\boldsymbol{\Phi}_{rv}\delta\mathbf{v} = (0, 10\,000)$: the first row gives $\dot y = 0$, the second $-4\dot x/n = 10\,000$, so $\dot x_0^+ = -2500\,n = -2.829\ \mathrm{m/s}$ — a **downward** radial burn. Arrival velocity: $\dot x_f = c\,\dot x_0^+ = +2.829\ \mathrm{m/s}$, $\dot y_f = -2s\,\dot x_0^+ = 0$; the second burn is $2.829\ \mathrm{m/s}$ downward again. Total $5.66\ \mathrm{m/s}$, taking $46\ \mathrm{min}$.

*Check:* during the transfer the chaser's radial position is $x = (s/n)\dot x_0^+$, reaching $-2.5\ \mathrm{km}$ at the quarter-orbit: it dips below the station's orbit, where it moves faster, and rises back to meet it — consistent with the "thrust down to go forward" rule. The exact nonlinear propagation of the same first burn misses the target by about $116\ \mathrm{m}$ (about $1\,\%$ of the distance), which in practice is removed by mid-course corrections computed with fresh navigation data.
:::
:::

In a real approach the final kilometres are flown in a sequence of hold points — for example $2\ \mathrm{km}$, $250\ \mathrm{m}$, $30\ \mathrm{m}$ — each reached by a hop or a forced-motion segment, with the approach corridor and abort trajectories designed so that a failure leaves the chaser on a passively safe path that does not hit the target. **V-bar approaches** (from ahead or behind) are natural for docking to a forward- or aft-facing port; **R-bar approaches** (from below) use the gravity gradient to brake, since a chaser below the target that stops thrusting tends to move away from it. These operational choices are made with the equations of this chapter and validated with full nonlinear simulations.

## When the linear theory fails {#sec-validity}

The Clohessy–Wiltshire equations rest on three assumptions, and each fails in a recognisable way:

- **Separation.** The neglected terms are of order $(\delta r/r_0)^2$ relative to those kept. For $100\ \mathrm{m}$ at $r_0 = 6778\ \mathrm{km}$ that is $2\times10^{-10}$; for tens of kilometres the errors become visible, and they are dominated not by the gravity nonlinearity but by the *geometry*: the LVLH axes are straight, while orbits curve ([[#ex-validity]]). Using curvilinear coordinates (arc length along the target's orbit instead of $y$) removes most of this error.
- **Eccentric target orbit.** The frame then rotates non-uniformly; the Tschauner–Hempel equations generalise the theory, and for $e$ of order $0.001$ the CW equations remain adequate over an orbit or two.
- **Perturbations.** Differential drag (two spacecraft with different area-to-mass ratios) and the $J_2$ oblateness term add slow relative drifts that matter over many orbits and are included in operational planning.

::: example Ten kilometres below: linear against exact {#ex-validity}
Repeat [[#ex-below]] with the chaser $10.0\ \mathrm{km}$ below the station instead of $100\ \mathrm{m}$, and compare the Clohessy–Wiltshire prediction after one orbit with a numerical integration of the exact two-body equations for both spacecraft.
::: solution
Linear theory scales exactly: $x(T) = x_0 = -10.0\ \mathrm{km}$ and $y(T) = -12\pi x_0 = 377.0\ \mathrm{km}$.

Exact: integrating $\ddot{\mathbf{r}} = -\mu\mathbf{r}/r^3$ for the station and for the chaser (whose initial inertial velocity is the station's plus $\boldsymbol{\Omega}\times\delta\mathbf{r}_0$) and resolving the difference along the station's LVLH axes after one orbit gives $x = -20.4\ \mathrm{km}$ and $y = 373.6\ \mathrm{km}$.

The along-track error is under $1\,\%$, but the radial "error" of $10.4\ \mathrm{km}$ is mostly geometry: a point $374\ \mathrm{km}$ further along the station's circular orbit lies $374^2/(2 \times 6778) = 10.3\ \mathrm{km}$ *below* the straight $y$-axis, which is tangent to the orbit at the station. Measured as height above the station's orbit — the curvilinear radial coordinate — the chaser is at $-10.05\ \mathrm{km}$, and the arc length along the orbit is $374.4\ \mathrm{km}$ — both close to the linear prediction.

*Check:* for the $100\ \mathrm{m}$ case the same comparison gave agreement to about $1\ \mathrm{m}$; the error grows roughly as the square of the separation, as a first-order theory should.
:::
:::

::: quiz
A chaser is $200\ \mathrm{m}$ directly ahead of the target on V-bar ($y_0 = +200\ \mathrm{m}$), at rest in the LVLH frame. What happens if it does nothing?
- [x] It stays where it is.
- [ ] It drifts ahead at $12\pi \times 200\ \mathrm{m}$ per orbit.
- [ ] It falls towards the target under the target's gravity.
- [ ] It oscillates radially with amplitude $200\ \mathrm{m}$.
::: solution
With $x_0 = 0$ and zero relative velocity, [[#eq-cw-solution]] gives $x(t) = 0$ and $y(t) = y_0$: the chaser is on the same circular orbit, just later, and keeps its station for free. The target's own gravity is negligible and not part of the model. Points on V-bar are equilibria of the CW equations — which is why V-bar hold points are used in approaches — whereas points on R-bar are not.
:::
:::

::: history
The linear equations of motion relative to a body on a circular orbit first appeared in celestial mechanics: George William Hill used a rotating frame of this kind in his "Researches in the lunar theory" (*American Journal of Mathematics*, 1878), which is why the equations are often called Hill's equations. W. H. Clohessy and R. S. Wiltshire derived them for spacecraft and solved them in closed form in "Terminal guidance system for satellite rendezvous" (*Journal of the Aerospace Sciences*, 1960), with the aim of designing rendezvous guidance. Practice followed within six years: on 15 December 1965 Gemini 6A, flown by Walter Schirra and Thomas Stafford, made the first crewed space rendezvous, station-keeping with Gemini 7 at distances down to about $30\ \mathrm{cm}$; on 16 March 1966 Neil Armstrong and David Scott in Gemini 8 made the first docking of two spacecraft, with an Agena target vehicle. Both missions' crews found that flying directly at the target did not work, exactly as the equations predict.
:::

## Where this leads {#sec-next}

The state transition matrix of this chapter is the linear version of the Lagrange coefficients used in [[orbital-mechanics/orbit-determination]], and the same idea — linearise about a reference trajectory, propagate the deviation with a transition matrix — underlies orbit estimation and trajectory-correction manoeuvres everywhere. Relative motion under $J_2$ and drag ([[orbital-mechanics/perturbations]]) is the main difficulty of long-lived formations. Pointing the docking port, cameras and thrusters during the approach is the attitude-control problem of [[orbital-mechanics/attitude-dynamics]].

::: summary
- In the LVLH frame of a circular target orbit ($x$ radial up, $y$ along-track, $z$ normal), small relative motion obeys $\ddot x - 3n^2x - 2n\dot y = 0$, $\ddot y + 2n\dot x = 0$, $\ddot z + n^2z = 0$: gravity gradient plus Coriolis.
- The closed-form solution and state transition matrix give the relative state at any time; $\dot y_0 = -2nx_0$ removes the secular along-track drift $-6\pi(\dot y_0 + 2nx_0)/n$ per orbit.
- A chaser $100\ \mathrm{m}$ below with zero relative velocity drifts $12\pi \times 100\ \mathrm{m} = 3.77\ \mathrm{km}$ ahead per orbit while its radial offset swings between $-100$ and $-700\ \mathrm{m}$; V-bar points are equilibria, R-bar points are not.
- Forward thrust makes you fall behind; downward (radial) thrust carries you forward half an orbit later. Natural motion circumnavigations are $2{:}1$ ellipses.
- Two-impulse rendezvous: $\delta\mathbf{v}_0^+ = -\boldsymbol{\Phi}_{rv}^{-1}\boldsymbol{\Phi}_{rr}\delta\mathbf{r}_0$, cancel the arrival velocity; avoid transfer times of whole orbits.
- The linear theory is excellent for separations of kilometres; beyond tens of kilometres curvature of the orbit dominates the error, and eccentricity, drag and $J_2$ need extended models.
:::

## Exercises

::: exercise Drift from fifty metres below {level=1 check="1885"}
A chaser $50\ \mathrm{m}$ directly below the target has zero velocity relative to the LVLH frame. How far along-track does it drift in one orbit, and in which direction? (Enter the distance in metres to the nearest metre.)
::: solution
Drift per orbit $= -6\pi(\dot y_0 + 2nx_0)/n = -12\pi x_0 = 12\pi \times 50 = 1885\ \mathrm{m}$, ahead of the target. It is independent of the altitude of the orbit — only the offset matters.
:::
:::

::: exercise Cross-track oscillation from an inclination difference {level=1 check="1.18"}
A chaser is in the same circular $400\ \mathrm{km}$ orbit as the target but in a plane inclined $0.010^\circ$ to it, with the same node. What is the amplitude of its cross-track motion? (Enter the amplitude in km to three significant figures.)
::: solution
The cross-track offset is $z = r_0\,\Delta i\,\sin u$ for small $\Delta i$, oscillating with amplitude $r_0\,\Delta i = 6778 \times 1.745\times10^{-4} = 1.18\ \mathrm{km}$ — a solution $z = (\dot z_0/n)\sin nt$ of the CW cross-track equation. It is removed where the chaser crosses the target's plane ($z = 0$, the line of nodes), by cancelling $\dot z = n \times 1.18\ \mathrm{km} = 1.34\ \mathrm{m/s}$ — the same as the plane-change cost $v\,\Delta i$ of [[orbital-mechanics/orbital-manoeuvres]].
:::
:::

::: exercise Velocity for an inspection ellipse {level=1 check="-0.113"}
An inspector satellite starts $50\ \mathrm{m}$ above a target at $400\ \mathrm{km}$ altitude ($n = 1.1314\times10^{-3}\ \mathrm{rad/s}$). What along-track relative velocity $\dot y_0$ makes it fly a closed natural-motion ellipse around the target, and what is the ellipse's along-track semi-axis? (Enter $\dot y_0$ in m/s to three significant figures, with its sign.)
::: solution
$\dot y_0 = -2nx_0 = -2 \times 1.1314\times10^{-3} \times 50 = -0.113\ \mathrm{m/s}$ (backwards: above the target it must move slower than the frame to stay with it on average). The ellipse is $x = 50\cos nt$, $y = -100\sin nt$: along-track semi-axis $100\ \mathrm{m}$.
:::
:::

::: exercise A radial hop {level=2 check="0.566"}
For the station of [[#ex-below]], what total $\Delta v$ is needed to move a chaser from $1.00\ \mathrm{km}$ behind the station on V-bar to the station in half an orbit using a radial hop? (Enter the total in m/s to three significant figures.)
::: solution
As in [[#ex-hop]], $y(T/2) = -4\dot x_0/n$ must equal $+1000\ \mathrm{m}$: $\dot x_0 = -250\,n = -0.283\ \mathrm{m/s}$, and the arrival radial velocity is $+0.283\ \mathrm{m/s}$, cancelled by a second burn. Total $0.566\ \mathrm{m/s}$ — the cost is proportional to the distance, $\Delta v_\text{total} = n\,\Delta y/2$.
:::
:::

::: exercise Falling behind after three orbits {level=2 check="-2.50"}
A small object is released from the station of [[#ex-below]] with a forward relative velocity of $0.05\ \mathrm{m/s}$. Where is it along-track after exactly three orbits? (Enter $y$ in km to three significant figures, with its sign.)
::: solution
At whole orbits only the secular term survives: $y = -3t\,\dot y_0 = -3 \times 3T \times 0.05 = -18\pi\dot y_0/n = -18\pi \times 0.05/1.1314\times10^{-3} = -2499\ \mathrm{m} = -2.50\ \mathrm{km}$. It is behind the station, and at $x = 0$ (level with it) at those instants.
:::
:::

::: exercise A two-impulse transfer from below and behind {level=2 check="2.92"}
A chaser is $1.00\ \mathrm{km}$ below and $5.00\ \mathrm{km}$ behind the station of [[#ex-below]], at rest in the LVLH frame. Using [[#alg-cw-rendezvous]] with $t_f = T/2$, find both impulses and the total. (Enter the total $\Delta v$ in m/s to three significant figures.)
::: solution
$\delta\mathbf{r}_0 = (-1000, -5000)\ \mathrm{m}$. With the matrices of [[#ex-hop]], $\boldsymbol{\Phi}_{rr}\delta\mathbf{r}_0 = (-7000,\ 6000\pi - 5000) = (-7000,\ 13\,850)$. Solve $\boldsymbol{\Phi}_{rv}\delta\mathbf{v} = (7000, -13\,850)$: first row $4\dot y/n = 7000$, so $\dot y_0^+ = 1750n = 1.980\ \mathrm{m/s}$; second row $(-4\dot x - 3\pi\dot y)/n = -13\,850$, so $\dot x_0^+ = (13\,850 n - 3\pi \times 1.980)/4 = -0.748\ \mathrm{m/s}$. $\lVert\Delta\mathbf{v}_1\rVert = \sqrt{0.748^2 + 1.980^2} = 2.117\ \mathrm{m/s}$. Arrival: $\dot x_f = 3ns\,x_0 + c\,\dot x_0^+ + 2s\,\dot y_0^+ = 0.748$, $\dot y_f = -6n(2)x_0 - 0 + (4c - 3)\dot y_0^+ = 13.577 - 13.860 = -0.283\ \mathrm{m/s}$ (using $x_0$ in m). $\lVert\Delta\mathbf{v}_2\rVert = 0.800\ \mathrm{m/s}$. Total $2.92\ \mathrm{m/s}$.
:::
:::

::: exercise Drift and semi-major axis {level=3}
(a) Show that the chaser's semi-major axis differs from the target's by $\delta a = 4x_0 + 2\dot y_0/n$ to first order, by linearising the vis-viva equation (remember that $\dot y_0$ is measured in the rotating frame). (b) Hence show that the along-track drift per orbit is $-3\pi\,\delta a$, and interpret it with Kepler's third law.
::: solution
(a) The chaser's inertial velocity is the target's $nr_0\hat{\mathbf{j}}$ plus $(\dot x_0, \dot y_0)$ plus the frame-rotation term $\boldsymbol{\Omega}\times\delta\mathbf{r} = (-ny_0, nx_0)$. To first order its speed squared is $v^2 = n^2r_0^2 + 2nr_0(\dot y_0 + nx_0)$ and its radius $r = r_0 + x_0$. From $1/a = 2/r - v^2/\mu$ with $\mu = n^2r_0^3$: $1/a = \frac{2}{r_0}(1 - x_0/r_0) - \frac{1}{r_0} - \frac{2(\dot y_0 + nx_0)}{nr_0^2} = \frac{1}{r_0} - \frac{2x_0}{r_0^2} - \frac{2\dot y_0}{nr_0^2} - \frac{2x_0}{r_0^2}$. So $\delta(1/a) = -(4x_0 + 2\dot y_0/n)/r_0^2$ and $\delta a = 4x_0 + 2\dot y_0/n$.
(b) The secular drift per orbit is $-6\pi(\dot y_0 + 2nx_0)/n = -3\pi(2\dot y_0/n + 4x_0) = -3\pi\,\delta a$. Kepler: $n \propto a^{-3/2}$, so $\delta n = -\tfrac32 n\,\delta a/a$; over one orbit ($t = 2\pi/n$) the angle lost is $2\pi\,\delta n/n = -3\pi\,\delta a/a$, which multiplied by $a$ is the along-track distance $-3\pi\,\delta a$. Check with [[#ex-below]]: $\delta a = -400\ \mathrm{m}$, drift $+1200\pi\ \mathrm{m}$.
:::
:::

::: exercise Design: an R-bar approach with a safe abort {level=3}
A cargo vehicle is to approach the station of [[#ex-below]] from directly below (R-bar), from a hold point $250\ \mathrm{m}$ below to $10\ \mathrm{m}$ below. (a) What continuous radial thrust acceleration is needed to hover at $x = -250\ \mathrm{m}$? (b) If the thrusters fail while hovering, where does the vehicle go, and does it threaten the station? (c) Sketch an approach strategy (speed profile, hold points, abort manoeuvre) and justify it with the CW equations.
::: solution
(a) Hovering means $\dot x = \dot y = \ddot x = \ddot y = 0$, so [[#eq-cw]] requires $a_x = -3n^2x = -3(1.1314\times10^{-3})^2(-250) = 9.6\times10^{-4}\ \mathrm{m/s^2}$ upward, $a_y = 0$: about $1\ \mathrm{N}$ per tonne, continuously.
(b) After failure the vehicle is at $x_0 = -250\ \mathrm{m}$ with zero relative velocity: by [[#ex-below]] it drops to $-1750\ \mathrm{m}$ half an orbit later and drifts ahead by $12\pi \times 250 = 9.4\ \mathrm{km}$ per orbit — away from the station. This passive safety is the main attraction of R-bar: the gravity gradient pushes a vehicle below the target downward and forward, never up into it.
(c) A typical strategy: approach from $250\ \mathrm{m}$ at a closing speed proportional to the distance (e.g. $0.1\ \%$ of range per second, so $0.25\ \mathrm{m/s}$ at the start and $1\ \mathrm{cm/s}$ near $10\ \mathrm{m}$), with hold points where the crew confirm alignment; the thrust profile is $a_x = -3n^2x + \ddot x_\text{desired}$ and $a_y = 2n\dot x$ to cancel the Coriolis term from the radial motion. An abort is a small radial *downward* burn plus a retrograde burn, which puts the vehicle on a drifting trajectory ahead and below that grows the separation every orbit. Justify every number by propagating the CW equations with the thrust terms and by checking the free-drift trajectory from every point of the approach.
:::
:::
