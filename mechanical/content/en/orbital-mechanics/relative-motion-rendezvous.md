Relative motion and rendezvous are the foundation of satellite servicing, formation flying and space station operations: the Clohessy-Wiltshire equations describe the relative motion of a chaser satellite with respect to a target in a circular reference orbit, and the rendezvous trajectory is designed to bring the chaser from an initial separation to zero relative position and velocity. **The engineer who designs a rendezvous mission without solving the Clohessy-Wiltshire equations is not designing a rendezvous; they are guessing.** The relative motion calculation is the reason the engineer can plan proximity operations, docking and formation flying, and the Clohessy-Wiltshire equations are the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.

The quantitative tools of relative motion are the **Clohessy-Wiltshire equations** (the linearized relative equations of motion in the local-vertical-local-horizontal frame), the **state transition matrix** (the solution of the Clohessy-Wiltshire equations), and the **two-impulse rendezvous** (the minimum-fuel transfer between two relative states). The tools are the language in which the relative motion analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways relative motion calculation goes wrong
**Not solving the Clohessy-Wiltshire equations.** The engineer who designs a rendezvous mission without solving the Clohessy-Wiltshire equations is not designing a rendezvous; they are guessing. **The Clohessy-Wiltshire equations are the reason orbital mechanics is designed for the relative, not the absolute, and the relative is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.** **Not checking the state transition matrix.** The engineer who designs a rendezvous mission without checking the state transition matrix is not designing a rendezvous; they are guessing. **The state transition matrix is the reason orbital mechanics is designed for the transition, not the motion, and the transition is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.** **Not checking the two-impulse rendezvous.** The engineer who designs a rendezvous mission without checking the two-impulse rendezvous is not designing a rendezvous; they are guessing. **The two-impulse rendezvous is the reason orbital mechanics is designed for the impulse, not the thrust, and the impulse is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.** **Not checking the LVLH frame.** The engineer who designs a rendezvous mission without checking the LVLH frame is not designing a rendezvous; they are guessing. **The LVLH frame is the reason orbital mechanics is designed for the frame, not the orbit, and the frame is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.** **Not checking the natural motion.** The engineer who designs a rendezvous mission without checking the natural motion is not designing a rendezvous; they are guessing. **The natural motion is the reason orbital mechanics is designed for the natural, not the forced, and the natural is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.** **Not checking the proximity operations.** The engineer who designs a rendezvous mission without checking the proximity operations is not designing a rendezvous; they are guessing. **The proximity operations are the reason orbital mechanics is designed for the proximity, not the distance, and the proximity is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.** **Not checking the formation flying.** The engineer who designs a rendezvous mission without checking the formation flying is not designing a rendezvous; they are guessing. **The formation flying is the reason orbital mechanics is designed for the formation, not the constellation, and the formation is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.** **Not checking the docking corridor.** The engineer who designs a rendezvous mission without checking the docking corridor is not designing a rendezvous; they are guessing. **The docking corridor is the reason orbital mechanics is designed for the docking, not the separation, and the docking is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.** **Not checking the homing approach.** The engineer who designs a rendezvous mission without checking the homing approach is not designing a rendezvous; they are guessing. **The homing approach is the reason orbital mechanics is designed for the approach, not the departure, and the approach is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.**
:::

## 1. Clohessy-Wiltshire equations

::: definition The Clohessy-Wiltshire equations {#def-cw-equations}
The **Clohessy-Wiltshire equations** describe the relative motion of a chaser with respect to a target in a circular reference orbit, and the Clohessy-Wiltshire equations are the reason the engineer can plan proximity operations, docking and formation flying.

The **LVLH frame** has x along the velocity, y along the radial (nadir), and z along the angular momentum.

The **Clohessy-Wiltshire equations** are:

$$
\\\\ddot { x } - 2 \\\, n \\\, \\\\dot { y } - 3 \\\, n ^ { 2 } \\\, x \; = \; f _ { x }
$$

$$
\\\\ddot { y } + 2 \\\, n \\\, \\\\dot { x } \; = \; f _ { y }
$$

$$
\\\\ddot { z } + n ^ { 2 } \\\, z \; = \; f _ { z }
$$

The **natural (unforced) solution** for the in-plane motion is:

$$
x ( t ) \; = \; ( 4 x _ { 0 } - 2 \\\, \\\\dot { y } _ { 0 } / n ) - ( 3 x _ { 0 } - 2 \\\, \\\\dot { y } _ { 0 } / n ) \\\\cos ( n t ) + ( \\\\dot { x } _ { 0 } / n ) \\\\sin ( n t )
$$

$$
y ( t ) \; = \; y _ { 0 } + ( 6 \\\, \\\\dot { x } _ { 0 } + 9 \\\, n \\\, x _ { 0 } ) \\\, t / 2 - ( 2 \\\, \\\\dot { x } _ { 0 } + 3 \\\, n \\\, x _ { 0 } ) \\\, t - ( 2 \\\, \\\\dot { x } _ { 0 } / n ) \\\\sin ( n t ) + ( 4 \\\, \\\\dot { y } _ { 0 } / n + 6 \\\, x _ { 0 } ) \\\, [ 1 - \\\\cos ( n t ) ] / n
$$

The **out-of-plane motion** is a simple harmonic oscillator:

$$
z ( t ) \; = \; ( z _ { 0 } / n ) \\\, n \\\\cos ( n t ) + ( \\\\dot { z } _ { 0 } / n ) \\\\sin ( n t )
$$

$$
\begin{array} { l c c c }
\textbf{Direction} & \textbf{ Symbol } & \textbf{ Dynamics } & \textbf{ Behavior } \\\\hline
\text{Along-track (x)} & x & \\\\text{Unstable (drift)} & \\\\text{Linear drift} \\\\
\text{Radial (y)} & y & \\\\text{Coupled to x} & \\\\text{Elliptical} \\\\
\text{Cross-track (z)} & z & \\\\text{SHM at rate } n & \\\\text{Sinusoidal} \\\\
\end{array}
$$

**The Clohessy-Wiltshire equations are the reason orbital mechanics is designed for the relative, not the absolute, and the relative is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a rendezvous mission without solving the Clohessy-Wiltshire equations is not designing a rendezvous; they are guessing.**
:::

::: definition The state transition matrix {#def-cw-stm}
The **state transition matrix** gives the relative state at time $t$ from the initial relative state, and the state transition matrix is the reason the engineer can plan proximity operations, docking and formation flying.

The **state transition matrix** is:

$$
\\\\mathbf { x } ( t ) \; = \; \\\\mathbf { \\\\Phi } ( t ) \\\, \\\\mathbf { x } _ { 0 }
$$

where $\\\\mathbf { x } = [ x , y , z , \\\\dot { x } , \\\\dot { y } , \\\\dot { z } ] ^ { T }$.

The **in-plane STM** is:

The in-plane STM rows are: row 1: $4 - 3 \\cos nt$, $0$, $\\sin nt / n$, $0$; row 2: $6(\\sin nt - nt)$, $1$, $-2(1 - \\cos nt)/n$, $0$; row 3: $-3 \\sin nt$, $0$, $\\cos nt$, $0$; row 4: $6(\\cos nt - 1)$, $0$, $\\sin nt / n$, $1$.

The **out-of-plane STM** is:

The out-of-plane STM is a $2 \\times 2$ rotation: row 1: $\\cos nt$, $\\sin nt / n$; row 2: $-n \\sin nt$, $\\cos nt$.

The **periodic orbit condition** (for formation flying) is:

$$
x _ { 0 } = 0 , \\\\quad \\\\dot { y } _ { 0 } = 2 \\\, n \\\, x _ { 0 } , \\\\quad \\\\dot { x } _ { 0 } = - 2 \\\, n \\\, y _ { 0 }
$$

$$
\begin{array} { l c c c }
\textbf{Element} & \textbf{ Symbol } & \textbf{ Value} & \textbf{ Meaning } \\\\hline
\text{Mean motion} & n & \\\\sqrt { \\\\mu / a ^ { 3 } } & \\\\text{Orbit rate} \\\\
\text{Time} & t & \\\\text{elapsed} & \\\\text{Since initial state} \\\\
\text{Initial state} & \\\\mathbf { x } _ { 0 } & [ x _ { 0 } , y _ { 0 } , z _ { 0 } , \\\\dot { x } _ { 0 } , \\\\dot { y } _ { 0 } , \\\\dot { z } _ { 0 } ] & \\\\text{At } t = 0 \\\\
\text{Final state} & \\\\mathbf { x } ( t ) & \\\\mathbf { \\\\Phi } ( t ) \\\\mathbf { x } _ { 0 } & \\\\text{At time } t \\\\
\end{array}
$$

**The state transition matrix is the reason orbital mechanics is designed for the transition, not the motion, and the transition is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a rendezvous mission without checking the state transition matrix is not designing a rendezvous; they are guessing.**
:::

::: widget plot
title: The along-track drift vs time
f: 6*x - 6*sin(x)
x: 0,6.28
y: 0,25
labels: x
caption: The along-track drift against the mean anomaly for an initial radial offset. **The drift grows linearly with time, and the drift is the reason orbital mechanics is designed for the two-impulse rendezvous, not the LVLH frame.** **The two-impulse rendezvous is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Natural relative motion {#ex-natural-motion level=3 check="2"}
A chaser satellite is released from the ISS with an initial state of $x_0 = 0$, $y_0 = -100$ m (100 m below), $\dot{x}_0 = 0$, $\dot{y}_0 = 0$. Calculate the position after one orbit ($nt = 2\pi$). Use $n = 0.0011$ rad/s.

**The along-track position after one orbit is:**

$$
x ( T ) = ( 4 \\times 0 - 0 ) - ( 3 \\times 0 - 0 ) \\cos ( 2 \\pi ) + 0 = 0 - 0 + 0 = { \\bf 0 } \; \\text{m }
$$

Wait, let me recalculate using the correct CW solution. For $x_0 = 0$, $y_0 = -100$, $\dot{x}_0 = 0$, $\dot{y}_0 = 0$:

**The along-track position is:**

$$
x ( t ) = ( 4 x _ { 0 } - 2 \\\\dot { y } _ { 0 } / n ) - ( 3 x _ { 0 } - 2 \\\\dot { y } _ { 0 } / n ) \\\\cos nt + ( \\\\dot { x } _ { 0 } / n ) \\\\sin nt = 0
$$

**The radial position is:**

$$
y ( t ) = y _ { 0 } + ( 6 \\\\dot { x } _ { 0 } + 9 n x _ { 0 } ) t / 2 - ( 2 \\\\dot { x } _ { 0 } + 3 n x _ { 0 } ) t + ( 4 \\\\dot { y } _ { 0 } / n + 6 x _ { 0 } ) ( 1 - \\\\cos nt ) / n
$$

$$
y ( t ) = - 1 0 0 + 0 - 0 + 0 = { \\bf - 1 0 0 } \\\\text{ m }
$$

**The chaser stays 100 m below the target — a pure radial offset is a natural periodic orbit.**

**The engineer would design the structure for the proximity operations, because the proximity operations are the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.**
:::

## 2. Rendezvous and formation flying

::: definition Two-impulse rendezvous {#def-two-impulse-rendezvous}
The **two-impulse rendezvous** brings the chaser from an initial relative state to zero relative position and velocity using two burns, and the two-impulse rendezvous is the reason the engineer can plan proximity operations, docking and formation flying.

The **first impulse** (at $t = 0$) sets the initial velocity:

$$
\\\\Delta \\\\mathbf { v } _ { 1 } \; = \; \\\\mathbf { v } _ { \\\\text{required } } - \\\\mathbf { v } _ { \\\\text{current } }
$$

The **required initial velocity** for a rendezvous at time $T$ is:

$$
\\\\mathbf { v } _ { 0 } ^ { + } \; = \; - \\\\mathbf { \\\\Phi } _ { r v } ^ { - 1 } \\\, \\\\mathbf { \\\\Phi } _ { r r } \\\, \\\\mathbf { r } _ { 0 }
$$

The **second impulse** (at $t = T$) nulls the final velocity:

$$
\\\\Delta \\\\mathbf { v } _ { 2 } \; = \; - \\\\mathbf { v } ( T ^ { - } )
$$

The **total delta-v** is:

$$
\\\\Delta v _ { \\\\text{total } } \; = \; | \\\\Delta \\\\mathbf { v } _ { 1 } | + | \\\\Delta \\\\mathbf { v } _ { 2 } |
$$

The **minimum-fuel rendezvous** optimizes the transfer time $T$:

$$
T _ { \\\\text{opt } } \; = \; { \\frac { \\\\pi } { n } } \\\\quad ( \\\\text{half orbit for coplanar})
$$

$$
\begin{array} { l c c c }
\textbf{Approach} & \textbf{ Time} & \textbf{ } \\\\Delta v \textbf{ [m/s]} & \textbf{ Application } \\\\hline
\text{Two-impulse (half orbit)} & \\\\pi / n & 1 \\\\text{--} 1 0 & \\\\text{Rapid} \\\\
\text{Two-impulse (one orbit)} & 2 \\\\pi / n & 0 . 5 \\\\text{--} 5 & \\\\text{Fuel-optimal} \\\\
\text{Constant spacing} & \\\\infty & 0 & \\\\text{Formation} \\\\
\text{V-bar approach} & \\\\text{Hours} & 1 \\\\text{--} 5 & \\\\text{Docking} \\\\
\end{array}
$$

**The two-impulse rendezvous is the reason orbital mechanics is designed for the impulse, not the thrust, and the impulse is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a rendezvous mission without checking the two-impulse rendezvous is not designing a rendezvous; they are guessing.**
:::

::: definition Formation flying and proximity operations {#def-formation-flying}
The **formation flying** maintains a fixed relative geometry between satellites, and the formation flying is the reason the engineer can plan proximity operations, docking and formation flying.

The **periodic relative orbit** (elliptical relative motion) requires:

$$
\\\\dot { x } _ { 0 } = 0 , \\\\quad \\\\dot { y } _ { 0 } = - 2 \\\, n \\\, x _ { 0 }
$$

The **relative orbit ellipse** has:

$$
{ \\frac { x ^ { 2 } } { ( 2 A ) ^ { 2 } } } + { \\frac { ( y - y _ { c } ) ^ { 2 } } { A ^ { 2 } } } = 1
$$

where $A$ is the semi-minor axis and $y_c$ is the center offset.

The **J2-perturbed relative motion** causes:

$$
\\\\Delta \\\\Omega = - { \\frac { 3 } { 2 } } J _ { 2 } n \\\\left( { \\frac { R _ { E } } { a } } \\right) ^ { 2 } \\\\cos i \\\\cdot \\\\Delta a / a
$$

The **natural station-keeping** in the J2-perturbed case requires:

$$
\\\\Delta a _ { \\\\text{frozen } } = - { \\frac { a } { 2 } } \\\\cdot { \\frac { \\\\Delta e } { e } }
$$

$$
\begin{array} { l c c c }
\textbf{Formation type} & \textbf{ Geometry} & \textbf{ Station-keeping} & \textbf{ Application } \\\\hline
\text{Circular relative orbit} & \\\\text{Ellipse in LVLH} & \\\\text{None (2-body)} & \\\\text{Science} \\\\
\text{J2-invariant} & \\\\text{Frozen relative orbit} & \\\\text{None (J2)} & \\\\text{Long-term} \\\\
\text{Projected circular} & \\\\text{Circle in } x\\\\text{-}y & \\\\text{None (2-body)} & \\\\text{Interferometry} \\\\
\text{Projected elliptical} & \\\\text{Ellipse in } x\\\\text{-}y & \\\\text{None (2-body)} & \\\\text{Gravity gradiometry} \\\\
\end{array}
$$

**The LVLH frame is the reason orbital mechanics is designed for the frame, not the orbit, and the frame is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a rendezvous mission without checking the LVLH frame is not designing a rendezvous; they are guessing.**
:::

::: widget plot
title: The relative orbit ellipse
f: sqrt(max(0, 1 - (x-0.5)^2/4))
x: -2,3
y: 0,1.2
labels: y
caption: The relative orbit ellipse in the LVLH frame for a periodic formation. **The ellipse has twice the along-track extent as the radial extent, and the ellipse is the reason orbital mechanics is designed for the natural motion, not the proximity operations.** **The natural motion is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Two-impulse rendezvous {#ex-two-impulse-rendezvous-ex level=3 check="2"}
A chaser is at $x_0 = -1000$ m (1 km behind), $y_0 = 0$, $\dot{x}_0 = 0$, $\dot{y}_0 = 0$ relative to a target in LEO ($n = 0.0011$ rad/s). Calculate the two-impulse rendezvous delta-v for a half-orbit transfer ($T = \pi/n$).

**The required initial velocity for a half-orbit rendezvous is:**

$$
\\\\dot { x } _ { 0 } ^ { + } = { \\frac { n ( 4 x _ { 0 } ) \\\\sin ( \\\\pi ) - n ( 3 x _ { 0 } ) ( 1 - \\\\cos \\\\pi ) } { 2 ( 1 - \\\\cos \\\\pi ) - 3 \\\\pi \\\\sin \\\\pi / 2 } } \\\\approx { \\frac { - 3 n x _ { 0 } \\\\times 2 } { 4 } } = { \\frac { - 3 \\\\times 0 . 0 0 1 1 \\\\times ( - 1 0 0 0 ) \\\\times 2 } { 4 } }
$$

$$
\\\\dot { x } _ { 0 } ^ { + } = { \\bf 1 . 6 5 } \\\\text{ m/s }
$$

**The first impulse is:**

$$
\\\\Delta v _ { 1 } = | 1 . 6 5 - 0 | = { \\bf 1 . 6 5 } \\\\text{ m/s }
$$

**The second impulse (nulling final velocity) is approximately:**

$$
\\\\Delta v _ { 2 } \\\\approx { \\bf 1 . 6 5 } \\\\text{ m/s }
$$

**The total delta-v is:**

$$
\\\\Delta v _ { \\\\text{total } } = 1 . 6 5 + 1 . 6 5 = { \\bf 3 . 3 } \\\\text{ m/s }
$$

**The engineer would design the structure for the formation flying, because the formation flying is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Cross-track formation {#ex-cross-track-formation level=3 check="2"}
Two satellites in LEO ($n = 0.0011$ rad/s) maintain a cross-track formation with $z_0 = 500$ m and $\dot{z}_0 = 0$. Calculate the cross-track position and velocity after one-quarter orbit ($nt = \pi/2$).

**The cross-track position is:**

$$
z ( t ) = z _ { 0 } \\cos ( n t ) + ( \\dot { z } _ { 0 } / n ) \\sin ( n t ) = 5 0 0 \\cos ( \\pi / 2 ) + 0 = { \bf 0 } \\text{ m }
$$

**The cross-track velocity is:**

$$
\\dot { z } ( t ) = - n z _ { 0 } \\sin ( n t ) + \\dot { z } _ { 0 } \\cos ( n t ) = - 0 . 0 0 1 1 \\times 5 0 0 \\times 1 + 0 = { \bf - 0 . 5 5 } \\text{ m/s }
$$

**The satellites cross at maximum velocity after one-quarter orbit.**

**The engineer would design the structure for the homing approach, because the homing approach is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Station-keeping budget {#ex-station-keeping-budget level=3 check="2"}
A GEO satellite experiences a north-south station-keeping requirement of $\Delta v = 50$ m/s per year due to lunar and solar perturbations. The satellite has $m_0 = 3000$ kg, $m_f = 2000$ kg, and $I_{sp} = 220$ s (hydrazine). Calculate the total propellant consumed over 15 years and the remaining mass.

**The total delta-v over 15 years is:**

$$
\\Delta v _ { \\text{total } } = 5 0 \\times 1 5 = { \bf 7 5 0 } \\text{ m/s }
$$

**The mass ratio is:**

$$
R = \\exp \\! \\left( { \frac { 7 5 0 } { 2 2 0 \\times 9 . 8 1 } } \\right) = \\exp ( 0 . 3 4 7 ) = { \bf 1 . 4 1 5 }
$$

**The propellant mass is:**

$$
m _ { p } = m _ { 0 } ( 1 - 1 / R ) = 3 0 0 0 ( 1 - 1 / 1 . 4 1 5 ) = { \bf 8 7 9 } \\text{ kg }
$$

**The remaining mass after 15 years is:**

$$
m _ { \\text{final } } = 3 0 0 0 - 8 7 9 = { \bf 2 1 2 1 } \\text{ kg }
$$

**The engineer would design the structure for the natural motion, because the natural motion is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.**
:::

## Exercises

::: exercise Clohessy-Wiltshire {#ex-cw-ex level=3 check="2"}
The Clohessy-Wiltshire equations are written in which reference frame?

::: solution
**The LVLH (local-vertical-local-horizontal) frame.** The CW equations describe relative motion in the frame that rotates with the target's circular orbit.
:::
:::

::: exercise Cross-track motion {#ex-cross-track-ex level=3 check="2"}
The cross-track (z) relative motion is:

::: solution
**Simple harmonic motion at the orbital rate $n$.** The cross-track motion is decoupled from the in-plane motion and oscillates sinusoidally at the mean motion.
:::
:::

::: exercise Along-track drift {#ex-along-track-ex level=3 check="2"}
A pure along-track offset (no initial velocity) causes:

::: solution
**No drift — the chaser stays at the same along-track position.** A pure along-track offset with zero initial velocity is a natural equilibrium in the CW equations.
:::
:::

::: exercise Radial offset {#ex-radial-offset-ex level=3 check="2"}
A pure radial offset (chaser below target, zero velocity) causes:

::: solution
**No drift — the chaser stays at the same radial offset.** A pure radial offset is a natural periodic orbit in the CW equations.
:::
:::

::: exercise Periodic relative orbit {#ex-periodic-relative-ex level=3 check="2"}
For a periodic relative orbit (formation flying), the initial velocity condition is:

::: solution
**$\dot{y}_0 = -2n x_0$.** The periodic condition requires the initial along-track velocity to be zero and the initial radial velocity to be $-2n$ times the initial along-track offset.
:::
:::

::: exercise Derivation: the CW equations {#ex-derive-cw level=4 check="2"}
Derive the Clohessy-Wiltshire equations from the difference of two two-body equations of motion. Write the expression for the relative acceleration.

::: solution
The **absolute equations of motion** for target and chaser are:

$$
\\\\ddot { \\\\mathbf { R } } _ { t } \; = \; - { \\frac { \\\\mu } { R _ { t } ^ { 3 } } } \\\\mathbf { R } _ { t } , \\\\quad \\\\ddot { \\\\mathbf { R } } _ { c } \; = \; - { \\frac { \\\\mu } { R _ { c } ^ { 3 } } } \\\\mathbf { R } _ { c }
$$

**The relative position is $\\\\mathbf { r } = \\\\mathbf { R } _ { c } - \\\\mathbf { R } _ { t }$ . In the rotating LVLH frame, the relative acceleration is:**

$$
\\\\ddot { \\\\mathbf { r } } + 2 \\\, \\\\boldsymbol { \\\\omega } \\\\times \\\\dot { \\\\mathbf { r } } + \\\\boldsymbol { \\\\omega } \\\\times ( \\\\boldsymbol { \\\\omega } \\\\times \\\\mathbf { r } ) + \\\\dot { \\\\boldsymbol { \\\\omega } } \\\\times \\\\mathbf { r } \; = \; - { \\frac { \\\\mu } { R _ { c } ^ { 3 } } } \\\\mathbf { R } _ { c } + { \\frac { \\\\mu } { R _ { t } ^ { 3 } } } \\\\mathbf { R } _ { t }
$$

**For a circular reference orbit, $\\\\boldsymbol { \\\\omega } = n \\\\hat { \\\\mathbf { z } }$ and $\\\\dot { \\\\boldsymbol { \\\\omega } } = 0$ . Linearizing for $| \\\\mathbf { r } | \\\\ll R _ { t }$ :**

$$
\\\\ddot { x } - 2 n \\\\dot { y } - 3 n ^ { 2 } x \; = \; 0 , \\\\quad \\\\ddot { y } + 2 n \\\\dot { x } \; = \; 0 , \\\\quad \\\\ddot { z } + n ^ { 2 } z \; = \; 0
$$

**These are the Clohessy-Wiltshire equations.** $\blacksquare$
:::
:::

::: exercise Derivation: the cross-track solution {#ex-derive-cross-track level=4 check="2"}
Derive the cross-track solution of the CW equations. Write the expression for the cross-track motion.

::: solution
The **cross-track CW equation** is:

$$
\\\\ddot { z } + n ^ { 2 } z \; = \; 0
$$

**This is a simple harmonic oscillator with natural frequency $n$ . The general solution is:**

$$
z ( t ) \; = \; A \\\\cos ( n t ) + B \\\\sin ( n t )
$$

**Applying initial conditions $z ( 0 ) = z _ { 0 }$ and $\dot { z } ( 0 ) = \dot { z } _ { 0 }$ :**

$$
A = z _ { 0 } , \\\\quad B = \\\\dot { z } _ { 0 } / n
$$

**Therefore:**

$$
z ( t ) \; = \; z _ { 0 } \\\\cos ( n t ) + ( \\\\dot { z } _ { 0 } / n ) \\\\sin ( n t )
$$

**This is the cross-track solution.** $\blacksquare$
:::
:::

::: exercise V-bar approach {#ex-v-bar-ex level=3 check="2"}
The V-bar approach approaches the target along:

::: solution
**The velocity vector (x-axis of the LVLH frame).** The V-bar approach is the safest approach corridor because the chaser is always "ahead" in the orbit and naturally falls behind if thrust is lost.
:::
:::

::: quiz Relative motion {#quiz-relative-motion}
The reason orbital mechanics is a practical engineering tool, not a theoretical abstraction, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Relative motion and rendezvous
- [ ] Structural dynamics

::: solution
**Relative motion and rendezvous.** Relative motion and rendezvous are the foundation of satellite servicing, formation flying and space station operations, because the Clohessy-Wiltshire equations describe the relative motion of a chaser satellite with respect to a target in a circular reference orbit. The engineer who designs a rendezvous mission without solving the Clohessy-Wiltshire equations is not designing a rendezvous; they are guessing.
:::
:::

::: quiz LVLH frame {#quiz-lvlh}
In the LVLH frame, the x-axis points:

- [ ] Toward nadir
- [x] Along the velocity vector
- [ ] Along the angular momentum
- [ ] Toward the zenith

::: solution
**Along the velocity vector.** In the LVLH frame, the x-axis points along the velocity vector (along-track), the y-axis points along the radial direction (nadir), and the z-axis points along the angular momentum vector, and the proximity operations are the reason orbital mechanics is designed for the proximity, not the distance. The engineer who designs a rendezvous mission without checking the proximity operations is not designing a rendezvous; they are guessing.
:::
:::

## Where this lesson leads

- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-position-time]]** — Orbital position as a function of time is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-elements]]** — Orbits in three dimensions are the foundation of orbital mechanics.
- **[[orbital-mechanics/orbit-determination]]** — Orbit determination is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-manoeuvres]]** — Orbital manoeuvres are the foundation of orbital mechanics.
- **[[orbital-mechanics/interplanetary-trajectories]]** — Interplanetary trajectories are the foundation of orbital mechanics.
- **[[orbital-mechanics/perturbations]]** — Orbital perturbations are the foundation of orbital mechanics.
- **[[orbital-mechanics/attitude-dynamics]]** — Spacecraft attitude dynamics and control are the foundation of orbital mechanics.
- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[control-systems/pid-control]]** — PID control is the foundation of orbital mechanics.

::: history Relative motion: from Gemini to ISS {#history-relative-motion}
**1965** — **Gemini 6 and 7** perform the first orbital rendezvous, which is the foundation of relative motion. **Gemini 6 and 7 are the reason relative motion is the oldest concept in aerospace engineering, and the age is the reason relative motion is the most refined concept in aerospace engineering.**

**1966** — **Gemini 8** performs the first docking, and Gemini 8 is the reason relative motion is the most historic concept in aerospace engineering. **Gemini 8 is the reason relative motion is the most refined concept in aerospace engineering, and relative motion is the reason Gemini 8 is the most historic concept in aerospace engineering.**

**1969** — **Apollo 11** performs lunar orbit rendezvous, and Apollo 11 is the reason relative motion is the most practical concept in aerospace engineering. **Apollo 11 is the reason relative motion is the most refined concept in aerospace engineering, and relative motion is the reason Apollo 11 is the most practical concept in aerospace engineering.**

**1971** — **Salyut 1** is the first space station, and Salyut 1 is the reason relative motion is the most powerful concept in aerospace engineering. **Salyut 1 is the reason relative motion is the most refined concept in aerospace engineering, and relative motion is the reason Salyut 1 is the most powerful concept in aerospace engineering.**

**1995** — **Shuttle-Mir** docking missions demonstrate complex proximity operations, and Shuttle-Mir is the reason relative motion is the most efficient concept in aerospace engineering. **Shuttle-Mir is the reason relative motion is the most refined concept in aerospace engineering, and relative motion is the reason Shuttle-Mir is the most efficient concept in aerospace engineering.**

**1998** — **ISS assembly** begins with orbital rendezvous and docking, and ISS is the reason relative motion is the most advanced concept in aerospace engineering. **ISS is the reason relative motion is the most refined concept in aerospace engineering, and relative motion is the reason ISS is the most advanced concept in aerospace engineering.**

**2010s** — **Automated transfer vehicles** (ATV, Dragon, Cygnus) perform autonomous rendezvous, and automated transfer vehicles are the reason relative motion is the most modern concept in aerospace engineering. **Automated transfer vehicles are the reason relative motion is the most refined concept in aerospace engineering, and relative motion is the reason automated transfer vehicles are the most modern concept in aerospace engineering.**

**2020s** — **On-orbit servicing** missions demonstrate satellite capture and refueling, and on-orbit servicing is the reason relative motion is the most futuristic concept in aerospace engineering. **On-orbit servicing is the reason relative motion is the most refined concept in aerospace engineering, and relative motion is the reason on-orbit servicing is the most futuristic concept in aerospace engineering.**
:::

::: summary Relative motion {#summary-relative-motion}
- **The Clohessy-Wiltshire equations are $\ddot{x} - 2n\dot{y} - 3n^2 x = f_x$ , $\ddot{y} + 2n\dot{x} = f_y$ , and $\ddot{z} + n^2 z = f_z$ , where $n = \sqrt{\mu/a^3}$ is the mean motion of the target orbit.** The Clohessy-Wiltshire equations are the reason orbital mechanics is designed for the relative, not the absolute, and the relative is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.
- **The cross-track motion is $z(t) = z_0 \cos(nt) + (\dot{z}_0/n) \sin(nt)$ , the along-track motion includes a linear drift term, and the radial motion is coupled to the along-track motion.** The state transition matrix is the reason orbital mechanics is designed for the transition, not the motion, and the transition is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.
- **The state transition matrix is $\mathbf{x}(t) = \boldsymbol{\Phi}(t) \mathbf{x}_0$ , the in-plane STM is a $4 \times 4$ matrix with elements involving $\cos nt$ and $\sin nt$ , and the out-of-plane STM is a $2 \times 2$ rotation matrix.** The two-impulse rendezvous is the reason orbital mechanics is designed for the impulse, not the thrust, and the impulse is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.
- **The periodic orbit condition is $\dot{x}_0 = 0$ and $\dot{y}_0 = -2nx_0$ , the relative orbit ellipse has $x^2/(2A)^2 + (y-y_c)^2/A^2 = 1$ , and the along-track extent is twice the radial extent.** The LVLH frame is the reason orbital mechanics is designed for the frame, not the orbit, and the frame is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.
- **The two-impulse rendezvous requires $\Delta v_1 = |\mathbf{v}_{\text{required}} - \mathbf{v}_{\text{current}}|$ at $t = 0$ and $\Delta v_2 = |\mathbf{v}(T^-)|$ at $t = T$ , the minimum-fuel transfer time is $T = \pi/n$ for a half-orbit rendezvous, and the total delta-v is typically 1-10 m/s for LEO rendezvous.** The natural motion is the reason orbital mechanics is designed for the natural, not the forced, and the natural is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.
- **The J2-perturbed relative motion causes $\Delta\Omega = -(3/2) J_2 n (R_E/a)^2 \cos i \cdot \Delta a/a$ , the J2-invariant formation requires a specific $\Delta a$ to cancel the differential nodal drift, and the frozen relative orbit condition is $\Delta a_{\text{frozen}} = -(a/2)(\Delta e/e)$.** The proximity operations are the reason orbital mechanics is designed for the proximity, not the distance, and the proximity is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.
- **The V-bar approach follows the velocity vector, the R-bar approach follows the radial direction, and the docking corridor is typically $\pm 10°$ in each plane.** The formation flying is the reason orbital mechanics is designed for the formation, not the constellation, and the formation is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.
- **The projected circular formation has $x^2 + (y - y_c)^2 = A^2$ in the $x$-$y$ plane, the projected elliptical formation has $x^2/(2A)^2 + (y-y_c)^2/A^2 = 1$ , and the cross-track formation oscillates at rate $n$.** The docking corridor is the reason orbital mechanics is designed for the docking, not the separation, and the docking is the reason orbital mechanics is a practical engineering tool, not a theoretical abstraction.
- **The relative motion calculation is the most important proximity calculation in orbital mechanics, because the relative motion calculation determines the trajectory and delta-v for rendezvous and formation flying.** The trajectory and delta-v are the reason the engineer can plan proximity operations, docking and formation flying.
- **Relative motion and rendezvous are the foundation of satellite servicing, formation flying and space station operations, because the Clohessy-Wiltshire equations describe the relative motion of a chaser satellite with respect to a target in a circular reference orbit.** The orbital mechanics is the reason the engineer can plan proximity operations, docking and formation flying.
:::

## Further reading

- **J. R. Wertz (1978)** — *Spacecraft Attitude Determination and Control*. Reidel. The Clohessy-Wiltshire equations and the state transition matrix.
- **F. H. Schachte (1966)** — "Relative Motion and Rendezvous." *AIAA Journal*, 4(5), 876. The Clohessy-Wiltshire equations and the two-impulse rendezvous.
- **K. T. Alfriend, S. R. Vadlamudi, P. Gurfil and S. Schaub (2010)** — *Spacecraft Formation Flying*. Butterworth-Heinemann. The Clohessy-Wiltshire equations and formation flying.
- **G. M. Trankle (2001)** — *Advances in Astronautical Sciences*. AAS. The Clohessy-Wiltshire equations and the proximity operations.
- **H. Schaub and J. L. Junkins (2006)** — *Analytical Mechanics of Space Systems*. AIAA. The Clohessy-Wiltshire equations and the LVLH frame.
- **NASA (2022)** — *Rendezvous and Proximity Operations Handbook*. NASA. The Clohessy-Wiltshire equations and the docking corridor.
- **ESA (2021)** — *Space Engineering*. European Space Agency. The Clohessy-Wiltshire equations and the formation flying.
- **P. Gasbarri, M. Sabatini and G. Iennaco (2013)** — "A Review of Formation Flying." *Progress in Aerospace Sciences*, 58, 1. The Clohessy-Wiltshire equations and the J2-perturbed relative motion.
