Statics asks what forces keep a body still. Dynamics asks what motion a set of forces produces, or — the inverse and more common engineering question — what forces a known motion requires. Almost everything a machine does is a dynamics problem: the crank that must be sized for the inertia of its connecting rod, the lift motor that must accelerate a tonne in two seconds, the cam that must not let a follower float at $3000\\ \\mathrm{rpm}$, the car that must corner without sliding, the robot arm whose settling time sets its cycle rate, the missile whose fin size is fixed by how fast it must turn.

The subject divides cleanly. **Kinematics** describes motion — position, velocity, acceleration — without asking what causes it, and it is a branch of geometry, not physics. **Kinetics** relates motion to force through Newton's second law. This lesson is entirely kinematics, and it is worth taking slowly, because nine dynamics problems in ten are lost not to $F = ma$ but to getting the acceleration wrong.

::: warning Acceleration is not the rate of change of speed
Speed is $\\left| \\mathbf{v} \\right|$; velocity is $\\mathbf{v}$. A particle moving at constant speed round a circle has zero rate of change of speed and an acceleration of $v^{2} / r$. Conversely a particle at an instant of rest can have any acceleration at all: a ball at the top of its flight has $v = 0$ and $a = 9.81\\ \\mathrm{m / s^{2}}$ downward, and a piston at top dead centre reverses, so $v = 0$, while its acceleration is $r \\omega^{2}$ towards the crank centre — the largest value in the cycle. Setting $a = 0$ because $v = 0$ is the most common single error in the whole of dynamics.
:::

## Rectilinear motion

::: definition Rectilinear kinematics {#def-rectilinear}
For motion along a fixed line with position $s (t)$,
$$
v = \\frac{\\mathrm{d} s}{\\mathrm{d} t}, \\qquad
a = \\frac{\\mathrm{d} v}{\\mathrm{d} t} = \\frac{\\mathrm{d}^{2} s}{\\mathrm{d} t^{2}} = v \\frac{\\mathrm{d} v}{\\mathrm{d} s} .
$$
The last form, $a \, \\mathrm{d} s = v \, \\mathrm{d} v$, is the one to use when the acceleration is given as a function of position. For **constant** acceleration,
$$
v = v_0 + a t, \\qquad
s = s_0 + v_0 t + \\tfrac{1}{2} a t^{2}, \\qquad
v^{2} = v_0^{2} + 2 a \\left( s - s_0 \\right), \\qquad
s = s_0 + \\tfrac{1}{2} \\left( v_0 + v \\right) t .
$$
The average velocity is $\\left( v_0 + v \\right) / 2$ **only** when $a$ is constant.
:::

::: example Polynomial motion {#ex-polynomial}
A particle moves so that $s = 2 t^{3} - 9 t^{2} + 12 t + 3\\ \\mathrm{m}$, with $t$ in seconds. Find when the velocity is zero, the total distance travelled in the first $3\\ \\mathrm{s}$, and the acceleration at $t = 3\\ \\mathrm{s}$.
::: solution
$$
v = 6 t^{2} - 18 t + 12 = 6 \\left( t - 1 \\right) \\left( t - 2 \\right)\\ \\mathrm{m / s}, \\qquad
a = 12 t - 18\\ \\mathrm{m / s^{2}} .
$$
**Turning points.** $v = 0$ at $t = 1\\ \\mathrm{s}$ and $t = 2\\ \\mathrm{s}$, with
$$
s (0) = 3, \\quad s (1) = 8, \\quad s (2) = 7, \\quad s (3) = 12\\ \\mathrm{m}.
$$
**Total distance.** The particle moves $+ 5\\ \\mathrm{m}$, then $- 1\\ \\mathrm{m}$, then $+ 5\\ \\mathrm{m}$:
$$
d = 5 + 1 + 5 = 11\\ \\mathrm{m},
$$
against a displacement of only $12 - 3 = 9\\ \\mathrm{m}$.
**Acceleration at $t = 3\\ \\mathrm{s}$:** $a = 36 - 18 = 18\\ \\mathrm{m / s^{2}}$.

*Check.* At $t = 1$, $a = - 6\\ \\mathrm{m / s^{2}} < 0$ and $v$ changes from positive to negative — a maximum of $s$, consistent. At $t = 2$, $a = + 6$ and $v$ changes from negative to positive — a minimum. $\checkmark$

*Sanity.* Distance and displacement differ by $22$ per cent here, and in a reciprocating machine they differ by a factor of two or more: a piston travels $4$ times the stroke per revolution while its displacement over a revolution is zero. Whenever a problem asks for distance rather than displacement, the first thing to do is solve $v = 0$ and check whether the answer lies inside the time interval.
:::
:::

::: example Acceleration as a function of position {#ex-a-of-s}
A slider enters a oil damper at $300\\ \\mathrm{m / s}$ and decelerates at $a = - k v^{2}$ with $k = 0.005\\ \\mathrm{m^{-1}}$. Find the speed after $200\\ \\mathrm{m}$ and the time taken to reach it.
::: solution
Use $a = v \, \\mathrm{d} v / \\mathrm{d} s$:
$$
v \\frac{\\mathrm{d} v}{\\mathrm{d} s} = - k v^{2}
\\quad\\Longrightarrow\\quad
\\frac{\\mathrm{d} v}{v} = - k \, \\mathrm{d} s
\\quad\\Longrightarrow\\quad
v = v_0 e^{- k s} .
$$
$$
v = 300 \, e^{-0.005 \\times 200} = 300 \, e^{-1} = 110.4\\ \\mathrm{m / s}.
$$
For the time, use $a = \\mathrm{d} v / \\mathrm{d} t$:
$$
\\frac{\\mathrm{d} v}{\\mathrm{d} t} = - k v^{2}
\\quad\\Longrightarrow\\quad
\\frac{1}{v} = \\frac{1}{v_0} + k t
\\quad\\Longrightarrow\\quad
v = \\frac{v_0}{1 + k v_0 t} ,
$$
$$
110.4 = \\frac{300}{1 + 1.5 t}
\\quad\\Longrightarrow\\quad
t = \\frac{2.718 - 1}{1.5} = 1.145\\ \\mathrm{s}.
$$
*Check.* $s = \\int_0^t v \, \\mathrm{d} t = \\dfrac{1}{k} \\ln \\left( 1 + k v_0 t \\right) = 200 \\ln 2.718 = 200\\ \\mathrm{m}$. $\checkmark$

*Sanity.* Note that the two integrations give **different** functional forms — exponential in distance, hyperbolic in time — and that using the wrong one is a classic error. The rule is: given $a (s)$, integrate with $v \, \\mathrm{d} v = a \, \\mathrm{d} s$; given $a (t)$, integrate twice in $t$; given $a (v)$, separate $\\mathrm{d} v / a (v) = \\mathrm{d} t$ or $v \, \\mathrm{d} v / a (v) = \\mathrm{d} s$. A quadratic drag law is the standard case where all three forms differ, and it is the reason a bullet's remaining velocity at $500\\ \\mathrm{m}$ cannot be found from the constant-acceleration formulae at any accuracy.
:::
:::

::: widget plot
f: 2*x^3-9*x^2+12*x+3
x: 0, 3
y: 0, 13
labels: \text{position } s \text{ (m)}
caption: Position of the particle of Example 1 against time. The curve rises to a local maximum of $8\\ \\mathrm{m}$ at $t = 1\\ \\mathrm{s}$, falls to $7\\ \\mathrm{m}$ at $t = 2\\ \\mathrm{s}$, and climbs to $12\\ \\mathrm{m}$ at $t = 3\\ \\mathrm{s}$; the two turning points are where the velocity changes sign, and the total path length of $11\\ \\mathrm{m}$ exceeds the $9\\ \\mathrm{m}$ displacement by the $2\\ \\mathrm{m}$ of the downward excursion. Reading $v = 0$ off a position-time graph as a maximum or minimum, rather than solving the velocity equation, is exactly how a machine's dead centres get found.
:::

## Curvilinear motion: three coordinate systems

::: definition Rectangular, normal–tangential and polar {#def-coordinate-systems}
**Rectangular.** $\\mathbf{r} = x \\mathbf{i} + y \\mathbf{j}$, $\\mathbf{v} = \\dot{x} \\mathbf{i} + \\dot{y} \\mathbf{j}$, $\\mathbf{a} = \\ddot{x} \\mathbf{i} + \\ddot{y} \\mathbf{j}$. Use when $x$ and $y$ are given independently, as in projectile motion.

**Normal and tangential.** For a particle on a known path of radius of curvature $\\rho$,
$$
\\mathbf{v} = v \\mathbf{e}_t, \\qquad
\\mathbf{a} = \\underbrace{\\dot{v}}_{a_t} \\mathbf{e}_t + \\underbrace{\\frac{v^{2}}{\\rho}}_{a_n} \\mathbf{e}_n .
$$
Use when the **path is known** and the tangential acceleration or the total acceleration is wanted. The curvature of $y = f (x)$ is
$$
\\frac{1}{\\rho} = \\frac{\\left| y^{\\prime \\prime} \\right|}{\\left[ 1 + y^{\\prime 2} \\right]^{3 / 2}} .
$$

**Polar.** $\\mathbf{r} = r \\mathbf{e}_r$, with $\\mathbf{e}_r$ rotating at $\\dot{\\theta}$,
$$
\\mathbf{v} = \\dot{r} \\mathbf{e}_r + r \\dot{\\theta} \\mathbf{e}_\\theta, \\qquad
\\mathbf{a} = \\left( \\ddot{r} - r \\dot{\\theta}^{2} \\right) \\mathbf{e}_r
+ \\left( r \\ddot{\\theta} + 2 \\dot{r} \\dot{\\theta} \\right) \\mathbf{e}_\\theta .
$$
Use when the particle is constrained to move along a **rotating** path, or when the data are given as $r (t)$ and $\\theta (t)$. The term $2 \\dot{r} \\dot{\\theta}$ is the **Coriolis** acceleration and $- r \\dot{\\theta}^{2}$ the centripetal term.
:::

::: proof Normal and tangential components {#proof-nt}
Differentiate $\\mathbf{v} = v \\mathbf{e}_t$:
$$
\\mathbf{a} = \\dot{v} \\mathbf{e}_t + v \\dot{\\mathbf{e}}_t .
$$
As the particle moves from $P$ to $P^{\\prime}$ the unit tangent turns through $\\mathrm{d} \\theta$ without changing length, so $\\left| \\mathrm{d} \\mathbf{e}_t \\right| = \\mathrm{d} \\theta$ in the direction of the inward normal $\\mathbf{e}_n$, and
$$
\\dot{\\mathbf{e}}_t = \\frac{\\mathrm{d} \\theta}{\\mathrm{d} t} \\mathbf{e}_n
= \\frac{\\mathrm{d} \\theta}{\\mathrm{d} s} \\frac{\\mathrm{d} s}{\\mathrm{d} t} \\mathbf{e}_n
= \\frac{1}{\\rho} v \\mathbf{e}_n ,
$$
since $\\mathrm{d} s = \\rho \, \\mathrm{d} \\theta$ by the definition of curvature. Hence
$$
\\mathbf{a} = \\dot{v} \\mathbf{e}_t + \\frac{v^{2}}{\\rho} \\mathbf{e}_n .
$$
The two components are orthogonal by construction, so $a = \\sqrt{a_t^{2} + a_n^{2}}$, and $a_n$ is zero only on a straight path or at an instant of zero speed.
:::

::: proof Polar acceleration {#proof-polar}
The rotating unit vectors satisfy $\\dot{\\mathbf{e}}_r = \\dot{\\theta} \\mathbf{e}_\\theta$ and $\\dot{\\mathbf{e}}_\\theta = - \\dot{\\theta} \\mathbf{e}_r$. Differentiating $\\mathbf{v} = \\dot{r} \\mathbf{e}_r + r \\dot{\\theta} \\mathbf{e}_\\theta$,
$$
\\mathbf{a} = \\ddot{r} \\mathbf{e}_r + \\dot{r} \\dot{\\theta} \\mathbf{e}_\\theta
+ \\left( \\dot{r} \\dot{\\theta} + r \\ddot{\\theta} \\right) \\mathbf{e}_\\theta
+ r \\dot{\\theta} \\left( - \\dot{\\theta} \\mathbf{e}_r \\right),
$$
which collects to the stated result. The Coriolis term $2 \\dot{r} \\dot{\\theta}$ has one factor from the change in direction of the radial velocity and one from the change in magnitude of the transverse velocity as $r$ grows — it is not an extra physical force but a bookkeeping consequence of differentiating in a rotating basis.
:::

::: example Collar on a rotating rod {#ex-polar}
A collar slides along a rod whose angle is $\\theta = 0.5 t^{2}\\ \\mathrm{rad}$ and whose radial position is $r = 0.4 - 0.1 t^{2}\\ \\mathrm{m}$. Find the acceleration at $t = 1\\ \\mathrm{s}$.
::: solution
$$
r = 0.3, \\quad \\dot{r} = - 0.2 t = - 0.2, \\quad \\ddot{r} = - 0.2\\ \\mathrm{m},
$$
$$
\\theta = 0.5, \\quad \\dot{\\theta} = t = 1.0, \\quad \\ddot{\\theta} = 1.0\\ \\mathrm{rad / s^{2}} .
$$
$$
a_r = \\ddot{r} - r \\dot{\\theta}^{2} = - 0.2 - 0.3 \\times 1.0^{2} = - 0.500\\ \\mathrm{m / s^{2}},
$$
$$
a_\\theta = r \\ddot{\\theta} + 2 \\dot{r} \\dot{\\theta} = 0.3 \\times 1.0 + 2 \\left( - 0.2 \\right) \\times 1.0 = - 0.100\\ \\mathrm{m / s^{2}},
$$
$$
a = \\sqrt{0.500^{2} + 0.100^{2}} = 0.510\\ \\mathrm{m / s^{2}},
$$
directed at $\\tan^{-1} \\left( 0.100 / 0.500 \\right) = 11.3^{\\circ}$ from the inward radial direction.

*Check.* The Coriolis term alone is $2 \\times 0.2 \\times 1.0 = 0.400\\ \\mathrm{m / s^{2}}$, comparable with the whole radial acceleration — dropping it would give $a_r = - 0.5$ and $a_\\theta = + 0.3$, an answer wrong in **direction** as well as magnitude. $\checkmark$

*Sanity.* This is the calculation behind a cam-follower on a rotating arm, a telescoping robot arm, a centrifuge with a sliding bucket and the classic problem of a bead on a spinning wire. Note that the Coriolis component is perpendicular to the sliding velocity, so it can never do work — which is why a Coriolis mass flowmeter works: the through-flow generates a transverse acceleration, and hence a transverse force, proportional to mass flow rate and independent of the fluid's velocity profile, density or viscosity.
:::
:::

::: theorem Projectile motion {#thm-projectile}
A particle launched at speed $v_0$ and angle $\theta$ from level ground, under gravity alone, follows
$$
y = x \tan \theta - \frac{g x^{2}}{2 v_0^{2} \cos^{2} \theta},
$$
a parabola, with time of flight, range and maximum height
$$
T = \frac{2 v_0 \sin \theta}{g}, \qquad
R = \frac{v_0^{2} \sin 2 \theta}{g}, \qquad
h = \frac{v_0^{2} \sin^{2} \theta}{2 g} .
$$
The trajectory is **independent of the mass**, and the speed at any height depends only on that height:
$$
v^{2} = v_0^{2} - 2 g y .
$$
:::

::: proof
With $a_x = 0$ and $a_y = - g$,
$$
x = v_0 \cos \theta \, t, \qquad y = v_0 \sin \theta \, t - \tfrac{1}{2} g t^{2} .
$$
Eliminating $t = x / \left( v_0 \cos \theta \right)$ gives the parabola. Setting $y = 0$ gives $T$; substituting gives $R = v_0^{2} \sin 2 \theta / g$ after using $2 \sin \theta \cos \theta = \sin 2 \theta$. The height follows from $v_y = 0$ at the apex, $t = v_0 \sin \theta / g$. The speed relation follows from $v_x^{2} + v_y^{2} = v_0^{2} \cos^{2} \theta + \left( v_0 \sin \theta - g t \right)^{2}$ and the expression for $y$.
:::

::: example Slider-crank kinematics {#ex-slider-crank}
An engine has a crank radius of $60\ \mathrm{mm}$, a connecting rod of $240\ \mathrm{mm}$ and runs at $3000\ \mathrm{rpm}$. Find the maximum piston acceleration and speed, and the mean piston speed.
::: solution
$\omega = 2 \pi \times 3000 / 60 = 314.2\ \mathrm{rad / s}$, $\lambda = r / l = 0.25$. The piston acceleration from top dead centre is, to second order in $\lambda$,
$$
a \approx - r \omega^{2} \left( \cos \theta + \lambda \cos 2 \theta \right),
$$
**At top dead centre**, $\theta = 0$:
$$
a = - 0.06 \times 314.2^{2} \times 1.25 = - 7400\ \mathrm{m / s^{2}} = - 755 \ g .
$$
**At $90^{\circ}$**, $a = - 0.06 \times 98\,696 \times \left( 0 - 0.25 \right) = + 1480\ \mathrm{m / s^{2}}$.
**Velocity**, $v \approx - r \omega \left( \sin \theta + \tfrac{1}{2} \lambda \sin 2 \theta \right)$, peaks near $\theta = 75^{\circ}$:
$$
v_{\max} = 0.06 \times 314.2 \times \left( 0.966 + 0.125 \times 0.5 \right) = 19.4\ \mathrm{m / s}.
$$
**Mean piston speed**, over a stroke of $2 r = 120\ \mathrm{mm}$ at $50$ revolutions per second:
$$
\bar{v} = 2 \times 0.12 \times 50 = 12.0\ \mathrm{m / s}.
$$
*Sanity.* Three numbers every engine designer carries. The peak acceleration of $755 \ g$ occurs at top dead centre, where the piston velocity is **zero** — the connecting-rod big-end load is greatest exactly where the piston is momentarily still, which is why the wrist pin is loaded in both directions and why the second-order term $\lambda \cos 2 \theta$ is what makes a high-revving engine's rod load lopsided between the firing and the exhaust strokes. The mean piston speed of $12\ \mathrm{m / s}$ is the traditional engine-speed limit index, with $20$ to $25\ \mathrm{m / s}$ the practical ceiling for a production petrol engine, set not by the piston's strength but by the inertia forces, which scale as $r \omega^{2}$ and hence as the **square** of engine speed.
:::
:::

::: example Falling with drag {#ex-drag}
A hailstone falls from rest through still air and reaches a terminal speed of $40\ \mathrm{m / s}$. Find how far it falls before it is within $5$ per cent of terminal speed, the time taken, and the speed after $500\ \mathrm{m}$.
::: solution
For quadratic drag the equation is $\dot{v} = g \left( 1 - v^{2} / v_T^{2} \right)$, whose solution from rest is
$$
v = v_T \tanh \frac{g t}{v_T}, \qquad
y = \frac{v_T^{2}}{g} \ln \cosh \frac{g t}{v_T}, \qquad
v = v_T \sqrt{1 - e^{- 2 g y / v_T^{2}}} .
$$
**Distance for $v = 0.95 \, v_T$.** From the last relation,
$$
0.95^{2} = 1 - e^{- 2 g y / v_T^{2}}
\quad\Longrightarrow\quad
e^{- 2 g y / v_T^{2}} = 0.0975, \quad \frac{2 g y}{v_T^{2}} = 2.328 ,
$$
$$
y = \frac{2.328 \times 40^{2}}{2 \times 9.81} = 190\ \mathrm{m}.
$$
**Time.** $\tanh \left( g t / v_T \right) = 0.95$ gives $g t / v_T = 1.832$,
$$
t = \frac{1.832 \times 40}{9.81} = 7.47\ \mathrm{s}.
$$
**After $500\ \mathrm{m}$:**
$$
v = 40 \sqrt{1 - e^{- 2 \times 9.81 \times 500 / 1600}} = 40 \sqrt{1 - 0.0022} = 39.96\ \mathrm{m / s}.
$$
*Check.* In $7.47\ \mathrm{s}$ a freely falling body would have fallen $\tfrac{1}{2} g t^{2} = 273\ \mathrm{m}$ and reached $73\ \mathrm{m / s}$; the drag has cost it $30$ per cent of the distance and $45$ per cent of the speed. $\checkmark$

*Sanity.* The hailstone is essentially at terminal speed by $200\ \mathrm{m}$, which is why large hail damages roofs but not aircraft cruising below cloud base, and why a cat dropped from a tall building survives: its terminal speed is about $60\ \mathrm{km / h}$, reached after $4$ or $5$ storeys, so anything higher is no worse. The general rule for quadratic drag is that a body loses most of its speed deficit within a distance of about $v_T^{2} / g$ and a time of about $v_T / g$ — the two scales that make this class of problem dimensionless.
:::
:::

::: example Motion along a helix {#ex-helix}
A ball-screw nut travels along a screw of $50\ \mathrm{mm}$ radius and $20\ \mathrm{mm}$ lead as the screw turns at $600\ \mathrm{rpm}$. Find the speed of a ball in the circuit and its normal acceleration.
::: solution
Write the motion as a helix with $r = 0.05\ \mathrm{m}$ constant, $\dot{\theta} = 2 \pi \times 600 / 60 = 62.83\ \mathrm{rad / s}$, and $\dot{z} = \left( 0.02 / 2 \pi \right) \dot{\theta} = 0.200\ \mathrm{m / s}$.
$$
v_\theta = r \dot{\theta} = 3.142\ \mathrm{m / s}, \qquad
v = \sqrt{v_\theta^{2} + v_z^{2}} = \sqrt{9.872 + 0.040} = 3.148\ \mathrm{m / s},
$$
$$
a_n = \frac{v_\theta^{2}}{r} = \frac{9.872}{0.05} = 197\ \mathrm{m / s^{2}} = 20.1 \ g .
$$
*Check.* The helix's curvature is $\kappa = r / \left( r^{2} + c^{2} \right)$ where $c = 0.02 / 2 \pi = 3.183 \times 10^{-3}\ \mathrm{m}$, giving $\rho = \left( 0.0025 + 1.013 \times 10^{-5} \right) / 0.05 = 0.0502\ \mathrm{m}$ and $a_n = v^{2} / \rho = 9.912 / 0.0502 = 197\ \mathrm{m / s^{2}}$. $\checkmark$

*Sanity.* The normal acceleration of $20 \ g$ is what a recirculating ball-screw nut actually experiences, and it is why the return channel is generous, why the balls are steel or ceramic and not polymer, and why a ball screw's speed limit is set by the ball's centrifugal loading in the nut rather than by the screw's whizzing speed. Note also that the axial motion contributes almost nothing to the acceleration — $v_z$ is $6$ per cent of $v_\theta$ and $\dot{v}_z$ is zero — which is the general result for a helix of small lead: the motion is essentially a rotation with a slow translation superposed.
:::
:::

## Application: the banked curve

::: example Maximum cornering speed {#ex-cornering}
A car corners on an unbanked road of radius $60\\ \\mathrm{m}$ with a tyre–road coefficient of friction of $0.8$. Find the maximum speed. Then repeat for the same curve banked at $10^{\\circ}$.
::: solution
**Unbanked.** The only horizontal force is friction, so
$$
\\mu m g = \\frac{m v^{2}}{r}
\\quad\\Longrightarrow\\quad
v = \\sqrt{\\mu g r} = \\sqrt{0.8 \\times 9.81 \\times 60} = 21.7\\ \\mathrm{m / s} = 78\\ \\mathrm{km / h}.
$$
**Banked, no friction.** Resolving perpendicular to the road gives $N \\sin \\theta = m v^{2} / r$ and $N \\cos \\theta = m g$, so
$$
v = \\sqrt{g r \\tan \\theta} = \\sqrt{9.81 \\times 60 \\times 0.1763} = 10.2\\ \\mathrm{m / s}.
$$
**Banked with friction**, at the limit,
$$
v = \\sqrt{g r \\frac{\\tan \\theta + \\mu}{1 - \\mu \\tan \\theta}}
= \\sqrt{588.6 \\times \\frac{0.9763}{0.8590}} = 25.9\\ \\mathrm{m / s} = 93\\ \\mathrm{km / h}.
$$
*Check.* At $\\theta = 0$ the banked formula reduces to $\\sqrt{\\mu g r}$, the unbanked answer. $\checkmark$

*Sanity.* A $10^{\\circ}$ bank raises the limit from $78$ to $93\\ \\mathrm{km / h}$, a $19$ per cent gain, and it does so without using any extra friction — the "design speed" of a highway curve is the speed at which **no** lateral friction is needed, which is why motorway curves are banked at the speed lorries travel at and not at the speed sports cars arrive at. Note also the denominator $1 - \\mu \\tan \\theta$: as the bank steepens towards $\\tan \\theta = 1 / \\mu = 1.25$ ($51^{\\circ}$) the allowable speed goes to infinity, which is the physics of a wall of death and the reason a velodrome's $45^{\\circ}$ banking lets a cyclist corner at $70\\ \\mathrm{km / h}$ on a $60\\ \\mathrm{m}$ radius with almost no side friction.
:::
:::

::: warning Curvilinear coordinates are chosen, not given
There is no "right" coordinate system, only ones that make the algebra small. Use **normal–tangential** when the path is known and you want the acceleration; use **polar** when the geometry is described by an angle and a radius from a fixed point, or when a member slides along a rotating one; use **rectangular** when the components are independent, as in projectile motion. A problem solved in the wrong system is not wrong, merely four times as long — and a problem solved in a system whose unit vectors you have forgotten to differentiate is wrong in a way that no amount of checking the arithmetic will catch. Always write down $\\dot{\\mathbf{e}}$ for your basis before you differentiate anything.
:::

::: history
The kinematics of motion was invented twice. Galileo's *Discorsi* of 1638 established the uniformly accelerated fall, the parabolic trajectory as the composition of a uniform horizontal motion and an accelerated vertical one, and — most importantly for this lesson — the idea that motion is described by quantities that can be measured independently of what causes it. Descartes supplied the coordinates in 1637 and the composition of velocities in 1644. Newton's *Principia* of 1687 gave the dynamics, and Euler in the 1750s separated the description of a rigid body's motion into a translation and a rotation, and introduced the space and body axes that make three-dimensional kinematics tractable. The **intrinsic** or normal–tangential formulation, in which the acceleration is written in terms of the path's curvature rather than of any coordinate system, is due to the French school — Servois and Binet around 1810, and then Cauchy and Bertrand, whose formula for the derivative of a moving trihedron of $1847$ is still the standard statement. The **Coriolis** term comes from Gaspard-Gustave Coriolis's 1835 paper on the work of moving machines, and its geophysical consequence — the deflection of winds, currents, long-range shells and river beds — was worked out by Laplace, Poisson and Foucault in the 1850s. The practical kinematics of machines, the velocity and acceleration diagrams of linkages, is a nineteenth-century engineering subject, formalised by Willis, Kennedy and Reuleaux between 1841 and 1875.
:::

## Where this leads

The same three coordinate systems reappear in [[dynamics/newtons-laws]] as the frames in which $\\sum \\mathbf{F} = m \\mathbf{a}$ is written, and the polar and rotating-frame results become the whole content of [[dynamics/three-dimensional-dynamics]]. Projectile and orbital motion are treated in [[orbital-mechanics/two-body-problem]], the curvature formula is used again in [[dynamics/rigid-body-kinematics]] for the instantaneous centre, and the numerical integration of these equations when they cannot be integrated in closed form is a topic of its own.

::: summary
- $a = v \, \\mathrm{d} v / \\mathrm{d} s$ is the form to use when acceleration is given as a function of position; the constant-acceleration formulae apply only when $a$ is truly constant.
- Distance travelled is the integral of $\\left| v \\right|$; solve $v = 0$ first whenever a path length is asked for.
- On a curved path $\\mathbf{a} = \\dot{v} \\mathbf{e}_t + \\left( v^{2} / \\rho \\right) \\mathbf{e}_n$: the normal component exists whenever there is curvature and speed, whatever the speed's rate of change.
- In polar coordinates the acceleration is $\\left( \\ddot{r} - r \\dot{\\theta}^{2} \\right) \\mathbf{e}_r + \\left( r \\ddot{\\theta} + 2 \\dot{r} \\dot{\\theta} \\right) \\mathbf{e}_\\theta$; the Coriolis term is frequently the largest single contribution.
- Choose the coordinate system from the geometry of the path, not from the way the question is worded.
:::

::: quiz
A particle's speed is instantaneously zero. Which of the following must be true?
- [ ] Its acceleration is also zero
- [ ] It is at a maximum of its position $s (t)$
- [x] Nothing at all follows about its acceleration
- [ ] Its total distance travelled is zero
::: solution
Nothing follows about the acceleration. $v = 0$ is a single statement about the first derivative of $s$; the acceleration is the second derivative and is independent of it. A ball at the top of its flight has $v = 0$ and $a = - g$. A piston at top dead centre has $v = 0$ and $a = r \omega^{2}$ towards the crank. A particle momentarily at rest at $s = 0$ may be accelerating at anything at all. The only thing $v = 0$ tells you is that $s$ is stationary — and even then it may be an inflection rather than a maximum, as $s = t^{3}$ at $t = 0$ shows.
:::
:::

## Exercises

::: exercise Average quantities {level=1 check="-9"}
A particle's position is $s = t^{3} - 6 t^{2}\\ \\mathrm{m}$. Find its average velocity from $t = 0$ to $t = 3\\ \\mathrm{s}$.
::: solution
$s (0) = 0$, $s (3) = 27 - 54 = - 27\\ \\mathrm{m}$, so $v_{\\text{avg}} = - 27 / 3 = - 9\\ \\mathrm{m / s}$.
*Note.* The average **speed** is different: $v = 3 t^{2} - 12 t$ vanishes at $t = 4$, outside the interval, so the particle never turns and the average speed is $9\\ \\mathrm{m / s}$.
:::
:::

::: exercise Constant acceleration {level=1 check="7.72"}
A car braking uniformly from $100\\ \\mathrm{km / h}$ stops in $50\\ \\mathrm{m}$. Find the deceleration in $\\mathrm{m / s^{2}}$.
::: solution
$v_0 = 27.78\\ \\mathrm{m / s}$, and $0 = v_0^{2} - 2 a s$ gives $a = 27.78^{2} / \\left( 2 \\times 50 \\right) = 7.72\\ \\mathrm{m / s^{2}}$, or $0.79 g$.
*Note.* The answer to enter is $7.72$. Stopping distance scales as $v^{2}$, which is why the $50\\ \\mathrm{m}$ at $100\\ \\mathrm{km / h}$ becomes $12.5\\ \\mathrm{m}$ at $50\\ \\mathrm{km / h}$ and why speed limits near schools are a road-safety measure with a squared factor behind them.
:::
:::

::: exercise Normal acceleration {level=1 check="22.4"}
A particle moves at $10\\ \\mathrm{m / s}$ along a path of radius $5\\ \\mathrm{m}$ while speeding up at $10\\ \\mathrm{m / s^{2}}$. Find the magnitude of its total acceleration.
::: solution
$a_n = 10^{2} / 5 = 20\\ \\mathrm{m / s^{2}}$, $a_t = 10\\ \\mathrm{m / s^{2}}$, so
$$
a = \\sqrt{20^{2} + 10^{2}} = 22.4\\ \\mathrm{m / s^{2}},
$$
inclined at $\\tan^{-1} \\left( 20 / 10 \\right) = 63.4^{\\circ}$ to the tangent.
*Note.* The answer is $22.4\\ \\mathrm{m / s^{2}}$, more than twice the tangential value: at this speed the path's curvature dominates.
:::
:::

::: exercise Curvature {level=2}
A train travels at $120\\ \\mathrm{km / h}$ over the crest of a hump whose profile is $y = x^{2} / 2000$ (metres). Find the normal acceleration at the crest and the speed at which the wheels would leave the rail.
::: solution
At the crest $x = 0$, $y^{\\prime} = 0$ and $y^{\\prime \\prime} = 1 / 1000$, so $\\rho = 1 / y^{\\prime \\prime} = 1000\\ \\mathrm{m}$.
$$
a_n = \\frac{v^{2}}{\\rho} = \\frac{33.33^{2}}{1000} = 1.11\\ \\mathrm{m / s^{2}} = 0.113 g .
$$
The wheels lift when $a_n = g$:
$$
v = \\sqrt{g \\rho} = \\sqrt{9.81 \\times 1000} = 99.0\\ \\mathrm{m / s} = 357\\ \\mathrm{km / h}.
$$
*Sanity.* The $0.11 g$ reduction in wheel load at $120\\ \\mathrm{km / h}$ is why a train's adhesion and its ride comfort both degrade over a crest, and why the vertical curvature of a track is limited by a **comfort** criterion of about $0.3\\ \\mathrm{m / s^{2}}$ of unbalanced normal acceleration rather than by the far higher lift-off speed. The same formula sets the maximum speed of a roller-coaster over a hill and the minimum radius of a saddle in a road design.
:::
:::

::: exercise Polar {level=2}
A particle moves with $r = 0.5 \\cos \\theta$ and $\\dot{\\theta} = 3\\ \\mathrm{rad / s}$ constant. Find the radial and transverse accelerations at $\\theta = 0$.
::: solution
With $\\ddot{\\theta} = 0$ and $r = 0.5 \\cos \\theta$:
$$
\\dot{r} = - 0.5 \\sin \\theta \\times \\dot{\\theta} = - 1.5 \\sin \\theta, \\qquad
\\ddot{r} = - 1.5 \\cos \\theta \\times \\dot{\\theta} = - 4.5 \\cos \\theta,
$$
so at $\\theta = 0$, $r = 0.5$, $\\dot{r} = 0$, $\\ddot{r} = - 4.5$, and
$$
a_r = - 4.5 - 0.5 \\times 9 = - 9.0\\ \\mathrm{m / s^{2}}, \\qquad
a_\\theta = 0 + 0 = 0 .
$$
*Check.* The path $r = 0.5 \\cos \\theta$ is a circle of diameter $0.5\\ \\mathrm{m}$ through the origin, whose centre is at $r = 0.25$. At $\\theta = 0$ the particle is at the far end of that circle, and the acceleration must point towards its centre — that is, purely radially inward, as found. Its magnitude should be $v^{2} / \\rho$ with $v = r \\dot{\\theta} = 1.5\\ \\mathrm{m / s}$ and $\\rho = 0.25\\ \\mathrm{m}$: $1.5^{2} / 0.25 = 9.0\\ \\mathrm{m / s^{2}}$. $\checkmark$
:::
:::

::: exercise Projectile {level=2}
A ball is kicked at $20\\ \\mathrm{m / s}$ at $35^{\\circ}$ on level ground. Find the range, the maximum height and the time of flight. What launch angle maximises the range, and what maximises the height?
::: solution
$$
R = \\frac{v_0^{2} \\sin 2 \\theta}{g} = \\frac{400 \\times \\sin 70^{\\circ}}{9.81} = 38.3\\ \\mathrm{m},
$$
$$
h = \\frac{v_0^{2} \\sin^{2} \\theta}{2 g} = \\frac{400 \\times 0.3290}{19.62} = 6.71\\ \\mathrm{m}, \\qquad
T = \\frac{2 v_0 \\sin \\theta}{g} = 2.34\\ \\mathrm{s}.
$$
The range is maximised at $\\theta = 45^{\\circ}$, the height at $\\theta = 90^{\\circ}$.
*Sanity.* The $45^{\\circ}$ answer holds only for a launch and landing at the same height and for no drag. With drag the optimum falls to $35$ to $40^{\\circ}$ for a golf ball and to about $30^{\\circ}$ for a bullet, and for a launch above the landing level it falls below $45^{\\circ}$ even without drag, at $\\theta = \\tfrac{1}{2} \\cos^{-1} \\left( 1 / \\left[ 1 + h / R_0 \\right] \\right)$. Any problem whose answer is exactly $45^{\\circ}$ is a problem whose assumptions you should be checking.
:::
:::

::: exercise Design {level=3}
A vertical injection-moulding machine must lift a $12\\ \\mathrm{kg}$ mould assembly through $400\\ \\mathrm{mm}$ in $0.6\\ \\mathrm{s}$, using a trapezoidal velocity profile with $0.1\\ \\mathrm{s}$ of acceleration and deceleration. Find the peak acceleration, the peak force in the guide columns and the peak power.
::: solution
With acceleration time $t_1 = 0.1\\ \\mathrm{s}$, cruise time $0.4\\ \\mathrm{s}$ and cruise velocity $v$,
$$
s = \\tfrac{1}{2} v \\left( 0.1 \\right) + v \\left( 0.4 \\right) + \\tfrac{1}{2} v \\left( 0.1 \\right) = 0.5 v = 0.4\\ \\mathrm{m}
\\quad\\Longrightarrow\\quad
v = 0.8\\ \\mathrm{m / s},
$$
$$
a = \\frac{0.8}{0.1} = 8.0\\ \\mathrm{m / s^{2}} .
$$
**Peak force.** During the upward acceleration the guide must supply weight plus inertia:
$$
F = m \\left( g + a \\right) = 12 \\left( 9.81 + 8.0 \\right) = 214\\ \\mathrm{N}.
$$
**Peak power.**
$$
P = F v = 214 \\times 0.8 = 171\\ \\mathrm{W},
$$
although this peak occurs at the end of the acceleration ramp, at which point the velocity is $0.8\\ \\mathrm{m / s}$ and the acceleration is still $8.0\\ \\mathrm{m / s^{2}}$, so the two maxima do coincide for a trapezoidal profile.

*Design comment.* Note that the acceleration force is $82$ per cent of the weight force, so the drive is sized by the duty cycle and not by the static load: a motor chosen for $118\\ \\mathrm{N}$ would stall on the ramp. Note also that the **deceleration** phase needs only $m \\left( g - a \\right) = 21.7\\ \\mathrm{N}$, so the guide sees a load reversal, and that if $a$ exceeded $g$ the assembly would be in free fall and the guide would have to react it in tension — which is why a vertical axis with a heavy head always has a counterbalance, a brake or a holding valve, and why a hoist's "overhauling load" is a standard safety item.
:::
:::

::: exercise Derivation {level=3}
Derive the expressions for the radius of curvature of the path $y = f (x)$ and for the acceleration components of a particle moving along it with $\\dot{x} = u$ constant, and show that the two approaches agree.
::: solution
**Curvature.** With $\\tan \\phi = y^{\\prime}$, so $\\phi = \\tan^{-1} y^{\\prime}$,
$$
\\frac{\\mathrm{d} \\phi}{\\mathrm{d} x} = \\frac{y^{\\prime \\prime}}{1 + y^{\\prime 2}}, \\qquad
\\frac{\\mathrm{d} s}{\\mathrm{d} x} = \\sqrt{1 + y^{\\prime 2}} ,
$$
and therefore
$$
\\frac{1}{\\rho} = \\frac{\\mathrm{d} \\phi}{\\mathrm{d} s}
= \\frac{y^{\\prime \\prime}}{\\left( 1 + y^{\\prime 2} \\right)^{3 / 2}} .
$$
**Direct differentiation.** With $x = u t$ and $y = f (x)$,
$$
\\dot{y} = f^{\\prime} u, \\qquad
\\ddot{y} = f^{\\prime \\prime} u^{2}, \\qquad
\\mathbf{a} = f^{\\prime \\prime} u^{2} \\mathbf{j},
$$
so the acceleration is **vertical**, of magnitude $\\left| y^{\\prime \\prime} \\right| u^{2}$.

**Agreement.** The speed is $v = u \\sqrt{1 + y^{\\prime 2}}$, so
$$
a_n = \\frac{v^{2}}{\\rho}
= u^{2} \\left( 1 + y^{\\prime 2} \\right) \\times \\frac{\\left| y^{\\prime \\prime} \\right|}{\\left( 1 + y^{\\prime 2} \\right)^{3 / 2}}
= \\frac{\\left| y^{\\prime \\prime} \\right| u^{2}}{\\sqrt{1 + y^{\\prime 2}}} ,
$$
and since the normal direction makes an angle $\\phi$ with the vertical, the vertical acceleration resolves as
$$
a = \\frac{a_n}{\\cos \\phi}
= \\frac{\\left| y^{\\prime \\prime} \\right| u^{2}}{\\sqrt{1 + y^{\\prime 2}}} \\times \\sqrt{1 + y^{\\prime 2}}
= \\left| y^{\\prime \\prime} \\right| u^{2} . \\checkmark
$$
*Comment.* The exercise is worth doing once because it exposes something the intrinsic formula hides: the normal and tangential components depend on the **speed** along the path, and a particle can have a purely vertical acceleration while having a non-zero tangential component $a_t = \\dot{v} = y^{\\prime} y^{\\prime \\prime} u^{2} / \\sqrt{1 + y^{\\prime 2}}$. The two decompositions are the same vector resolved on two different bases, and any disagreement between them means an algebra error, not a paradox.
:::
:::
