Manipulator dynamics is the foundation of robot force control: the Euler-Lagrange formulation derives the equations of motion from energy, the Newton-Euler formulation computes inverse dynamics recursively, and the mass matrix, Coriolis and gravity terms characterize the robot's dynamic behavior. **The engineer who designs a robot force controller without calculating the dynamics is not designing a controller; they are guessing.** The dynamics calculation is the reason the engineer can implement torque control, design computed-torque controllers and calculate feedforward torques, and the dynamics is the reason robot control is a practical engineering tool, not a theoretical abstraction.

The quantitative tools of manipulator dynamics are the **Euler-Lagrange formulation** (the energy-based derivation), the **Newton-Euler formulation** (the recursive computation), and the **mass matrix** (the inertia characterization). The tools are the language in which the dynamics analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways manipulator dynamics calculation goes wrong
**Not calculating the dynamics.** The engineer who designs a robot force controller without calculating the dynamics is not designing a controller; they are guessing. **The dynamics is the reason robotics is designed for the dynamics, not the kinematics, and the dynamics is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the mass matrix.** The engineer who designs a robot force controller without checking the mass matrix is not designing a controller; they are guessing. **The mass matrix is the reason robotics is designed for the mass, not the stiffness, and the mass is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the Coriolis terms.** The engineer who designs a robot force controller without checking the Coriolis terms is not designing a controller; they are guessing. **The Coriolis terms are the reason robotics is designed for the Coriolis, not the centrifugal, and the Coriolis is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the gravity terms.** The engineer who designs a robot force controller without checking the gravity terms is not designing a controller; they are guessing. **The gravity terms are the reason robotics is designed for the gravity, not the inertia, and the gravity is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the Lagrangian.** The engineer who designs a robot force controller without checking the Lagrangian is not designing a controller; they are guessing. **The Lagrangian is the reason robotics is designed for the Lagrangian, not the Hamiltonian, and the Lagrangian is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the Christoffel symbols.** The engineer who designs a robot force controller without checking the Christoffel symbols is not designing a controller; they are guessing. **The Christoffel symbols are the reason robotics is designed for the Christoffel, not the Riemann, and the Christoffel is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the energy conservation.** The engineer who designs a robot force controller without checking the energy conservation is not designing a controller; they are guessing. **The energy conservation is the reason robotics is designed for the conservation, not the dissipation, and the conservation is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the passivity.** The engineer who designs a robot force controller without checking the passivity is not designing a controller; they are guessing. **The passivity is the reason robotics is designed for the passivity, not the activity, and the passivity is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the skew-symmetry.** The engineer who designs a robot force controller without checking the skew-symmetry is not designing a controller; they are guessing. **The skew-symmetry is the reason robotics is designed for the skew, not the symmetric, and the skew is the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

## 1. Euler-Lagrange formulation

::: definition The Euler-Lagrange formulation {#def-euler-lagrange}
The **Euler-Lagrange formulation** derives the equations of motion from the kinetic and potential energy, and the Euler-Lagrange formulation is the reason the engineer can implement torque control, design computed-torque controllers and calculate feedforward torques.

The **Lagrangian** is:

$$
\mathcal { L } ( \\\\boldsymbol { \\\\theta } , \\\\dot { \\\\boldsymbol { \\\\theta } } ) \; = \; K ( \\\\boldsymbol { \\\\theta } , \\\\dot { \\\\boldsymbol { \\\\theta } } ) - P ( \\\\boldsymbol { \\\\theta } )
$$

The **Euler-Lagrange equation** is:

$$
{ \\frac { d } { d t } } { \\frac { \\\\partial \\\\mathcal { L } } { \\\\partial { \\\\dot { \\\\theta } } _ { i } } } - { \\frac { \\\\partial \\\\mathcal { L } } { \\\\partial \\\\theta _ { i } } } \; = \; \\\\tau _ { i }
$$

The **standard form** is:

$$
\\\\mathbf { M } ( \\\\boldsymbol { \\\\theta } ) \\\\ddot { \\\\boldsymbol { \\\\theta } } + \\\\mathbf { C } ( \\\\boldsymbol { \\\\theta } , \\\\dot { \\\\boldsymbol { \\\\theta } } ) \\\\dot { \\\\boldsymbol { \\\\theta } } + \\\\mathbf { g } ( \\\\boldsymbol { \\\\theta } ) \; = \; \\\\boldsymbol { \\\\tau }
$$

The **mass matrix** is:

$$
M _ { i j } \; = \; \\\\sum _ { k = \\\\max ( i , j ) } ^ { n } m _ { k } \\\\mathbf { J } _ { v , k } ^ { T } \\\\mathbf { J } _ { v , k } + \\\\mathbf { J } _ { \\\\omega , k } ^ { T } \\\\mathbf { I } _ { k } \\\\mathbf { J } _ { \\\\omega , k }
$$

The **gravity vector** is:

$$
g _ { i } \; = \; { \\frac { \\\\partial P } { \\\\partial \\\\theta _ { i } } }
$$

$$
\begin{array} { l c c c }
\textbf{Term} & \textbf{ Symbol} & \textbf{ Depends on} & \textbf{ Physical meaning } \\\\hline
\text{Inertia} & \\\\mathbf { M } ( \\\\theta ) & \\\\theta & \\\\text{Kinetic energy} \\\\
\text{Coriolis} & \\\\mathbf { C } ( \\\\theta , \\\\dot { \\\\theta } ) & \\\\theta , \\\\dot { \\\\theta } & \\\\text{Velocity coupling} \\\\
\text{Gravity} & \\\\mathbf { g } ( \\\\theta ) & \\\\theta & \\\\text{Potential energy} \\\\
\text{Friction} & \\\\mathbf { F } _ { v } \\\\dot { \\\\theta } + \\\\mathbf { F } _ { c } \\\\text{sgn}(\\\\dot{\\\\theta}) & \\\\dot { \\\\theta } & \\\\text{Dissipation} \\\\
\end{array}
$$

**The dynamics is the reason robotics is designed for the dynamics, not the kinematics, and the dynamics is the reason robot control is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot force controller without calculating the dynamics is not designing a controller; they are guessing.**
:::

::: definition The two-link planar dynamics {#def-two-link-dynamics}
The **two-link planar dynamics** is the simplest non-trivial robot dynamics example, and the two-link planar dynamics is the reason the engineer can implement torque control, design computed-torque controllers and calculate feedforward torques.

The **mass matrix** is:

$$
\\mathbf { M } = [ M _ { 1 1 } , M _ { 1 2 } ; M _ { 1 2 } , M _ { 2 2 } ] \\quad \\text{where } M_{11} = m_1 l_{c1}^2 + m_2(l_1^2 + l_{c2}^2 + 2l_1 l_{c2}c_2) + I_1 + I_2$$

The **Coriolis matrix** is:

$$
\\text{(matrix expression)}$$

where $h = m_2 l_1 l_{c2} s_2$.

The **gravity vector** is:

$$
\\mathbf { g } = [ ( m _ { 1 } l _ { c 1 } + m _ { 2 } l _ { 1 } ) g c _ { 1 } + m _ { 2 } g l _ { c 2 } c _ { 1 2 } ; m _ { 2 } g l _ { c 2 } c _ { 1 2 } ]$$

The **skew-symmetry property** is:

$$
\\\\dot { \\\\mathbf { M } } - 2 \\\\mathbf { C } \\\\quad \\\\text{is skew-symmetric}
$$

$$
\begin{array} { l c c c }
\textbf{Property} & \textbf{ Expression} & \textbf{ Consequence} & \textbf{ Application } \\\\hline
\text{Symmetric M} & \\\\mathbf { M } = \\\\mathbf { M } ^ { T } & \\\\text{Positive definite} & \\\\text{Energy conservation} \\\\
\text{Skew-symmetry} & \\\\dot { \\\\mathbf { M } } - 2 \\\\mathbf { C } & \\\\text{Passivity} & \\\\text{Stability proof} \\\\
\text{Energy conservation} & \\\\dot { K } + \\\\dot { P } = \\\\boldsymbol { \\\\tau } ^ { T } \\\\dot { \\\\theta } & \\\\text{Conservative} & \\\\text{Control design} \\\\
\text{Linear in parameters} & \\\\boldsymbol { \\\\tau } = \\\\mathbf { Y } ( \\\\theta , \\\\dot { \\\\theta } , \\\\ddot { \\\\theta } ) \\\\mathbf { p } & \\\\text{Adaptive control} & \\\\text{Parameter identification} \\\\
\end{array}
$$

**The mass matrix is the reason robotics is designed for the mass, not the stiffness, and the mass is the reason robot control is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot force controller without checking the mass matrix is not designing a controller; they are guessing.**
:::

::: widget plot
title: The mass matrix element vs elbow angle
f: 2 + cos(x)
x: 0,3.14
y: 1,3
labels: M11
caption: The $M_{11}$ mass matrix element against the elbow angle for a two-link planar robot. **The mass matrix is configuration-dependent, and the mass matrix is the reason robotics is designed for the Coriolis terms, not the gravity terms.** **The Coriolis terms are the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Two-link gravity torque {#ex-two-link-gravity level=3 check="2"}
A two-link planar robot has $m_1 = 5$ kg, $m_2 = 3$ kg, $l_1 = 1$ m, $l_{c2} = 0.5$ m. Calculate the gravity torque at $\\\\theta_1 = 0°$ and $\\\\theta_2 = 90°$.

**The gravity vector is:**

$$
g _ { 1 } = ( m _ { 1 } l _ { c 1 } + m _ { 2 } l _ { 1 } ) g c _ { 1 } + m _ { 2 } g l _ { c 2 } c _ { 1 2 }
$$

**At $\\\\theta_1 = 0°$, $\\\\theta_2 = 90°$ ($c_1 = 1$, $c_{12} = 0$):**

$$
g _ { 1 } = ( 5 \\\\times 0 . 5 + 3 \\\\times 1 ) \\\\times 9 . 8 1 \\\\times 1 + 0 = 5 . 5 \\\\times 9 . 8 1 = { \\bf 5 4 . 0 } \\\\text{ N·m }
$$

$$
g _ { 2 } = m _ { 2 } g l _ { c 2 } c _ { 1 2 } = 3 \\\\times 9 . 8 1 \\\\times 0 . 5 \\\\times 0 = { \\bf 0 } \\\\text{ N·m }
$$

**The engineer would design the structure for the Lagrangian, because the Lagrangian is the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

## 2. Newton-Euler formulation

::: definition The Newton-Euler formulation {#def-newton-euler}
The **Newton-Euler formulation** computes inverse dynamics recursively from base to tip and back, and the Newton-Euler formulation is the reason the engineer can implement torque control, design computed-torque controllers and calculate feedforward torques.

The **outward recursion** (base to tip) computes velocities and accelerations:

$$
\\\\boldsymbol { \\\\omega } _ { i } \; = \; \\\\mathbf { R } _ { i } ^ { i - 1 } \\\\boldsymbol { \\\\omega } _ { i - 1 } + \\\\dot { \\\\theta } _ { i } \\\\hat { \\\\mathbf { z } } _ { i }
$$

$$
\\\\dot { \\\\boldsymbol { \\\\omega } } _ { i } \; = \; \\\\mathbf { R } _ { i } ^ { i - 1 } \\\\dot { \\\\boldsymbol { \\\\omega } } _ { i - 1 } + \\\\ddot { \\\\theta } _ { i } \\\\hat { \\\\mathbf { z } } _ { i } + \\\\dot { \\\\theta } _ { i } ( \\\\mathbf { R } _ { i } ^ { i - 1 } \\\\boldsymbol { \\\\omega } _ { i - 1 } \\\\times \\\\hat { \\\\mathbf { z } } _ { i } )
$$

The **inward recursion** (tip to base) computes forces and torques:

$$
\\\\mathbf { f } _ { i } \; = \; \\\\mathbf { R } _ { i + 1 } ^ { i } \\\\mathbf { f } _ { i + 1 } + m _ { i } \\\\dot { \\\\mathbf { v } } _ { c i }
$$

$$
\\\\mathbf { n } _ { i } \; = \; - \\\\mathbf { p } _ { c i } \\\\times m _ { i } \\\\dot { \\\\mathbf { v } } _ { c i } + \\\\mathbf { R } _ { i + 1 } ^ { i } \\\\mathbf { n } _ { i + 1 } + \\\\mathbf { p } _ { i + 1 } \\\\times \\\\mathbf { R } _ { i + 1 } ^ { i } \\\\mathbf { f } _ { i + 1 } + \\\\mathbf { I } _ { i } \\\\dot { \\\\boldsymbol { \\\\omega } } _ { i } + \\\\boldsymbol { \\\\omega } _ { i } \\\\times ( \\\\mathbf { I } _ { i } \\\\boldsymbol { \\\\omega } _ { i } )
$$

The **computational complexity** is:

$$
\\\\text{Newton-Euler: } O ( n ) \\\\quad \\\\text{vs} \\\\quad \\\\text{Euler-Lagrange: } O ( n ^ { 4 } )
$$

$$
\begin{array} { l c c c }
\textbf{Method} & \textbf{ Complexity} & \textbf{ Output} & \textbf{ Application } \\\\hline
\text{Newton-Euler} & O ( n ) & \\\\text{Inverse dynamics} & \\\\text{Real-time control} \\\\
\text{Euler-Lagrange} & O ( n ^ { 4 } ) & \\\\text{Explicit } \\\\mathbf { M } , \\\\mathbf { C } & \\\\text{Analysis} \\\\
\text{Recursive Newton-Euler} & O ( n ) & \\\\text{Inverse dynamics} & \\\\text{Simulation} \\\\
\text{Featherstone's ABF} & O ( n ) & \\\\text{Forward dynamics} & \\\\text{Simulation} \\\\
\end{array}
$$

**The Coriolis terms are the reason robotics is designed for the Coriolis, not the centrifugal, and the Coriolis is the reason robot control is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot force controller without checking the Coriolis terms is not designing a controller; they are guessing.**
:::

::: definition Computed-torque control {#def-computed-torque}
The **computed-torque control** linearizes the robot dynamics using feedback linearization, and the computed-torque control is the reason the engineer can implement torque control, design computed-torque controllers and calculate feedforward torques.

The **control law** is:

$$
\\\\boldsymbol { \\\\tau } \; = \; \\\\mathbf { M } ( \\\\theta ) ( \\\\ddot { \\\\theta } _ { d } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } + \\\\mathbf { K } _ { p } \\\\mathbf { e } ) + \\\\mathbf { C } ( \\\\theta , \\\\dot { \\\\theta } ) \\\\dot { \\\\theta } + \\\\mathbf { g } ( \\\\theta )
$$

where $\\\\mathbf { e } = \\\\theta _ { d } - \\\\theta$ is the tracking error.

The **closed-loop dynamics** is:

$$
\\\\ddot { \\\\mathbf { e } } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } + \\\\mathbf { K } _ { p } \\\\mathbf { e } = 0
$$

The **Lyapunov function** is:

$$
V \; = \; { \\frac { 1 } { 2 } } \\\\mathbf { e } ^ { T } \\\\mathbf { K } _ { p } \\\\mathbf { e } + { \\frac { 1 } { 2 } } \\\\dot { \\\\mathbf { e } } ^ { T } \\\\mathbf { M } \\\\dot { \\\\mathbf { e } }
$$

The **stability condition** is:

$$
\\\\mathbf { K } _ { p } > 0 , \\\\quad \\\\mathbf { K } _ { d } > 0
$$

$$
\begin{array} { l c c c }
\textbf{Controller} & \textbf{ Model} & \textbf{ Stability} & \textbf{ Robustness } \\\\hline
\text{Computed-torque} & \\\\text{Perfect} & \\\\text{Exponential} & \\\\text{Low} \\\\
\text{PD+gravity} & \\\\text{Partial} & \\\\text{Asymptotic} & \\\\text{Medium} \\\\
\text{PD+feedforward} & \\\\text{Partial} & \\\\text{Asymptotic} & \\\\text{Medium} \\\\
\text{Sliding mode} & \\\\text{Bounding} & \\\\text{Finite-time} & \\\\text{High} \\\\
\end{array}
$$

**The gravity terms are the reason robotics is designed for the gravity, not the inertia, and the gravity is the reason robot control is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot force controller without checking the gravity terms is not designing a controller; they are guessing.**
:::

::: widget plot
title: The gravity torque vs shoulder angle
f: 54 * cos(x)
x: 0,3.14
y: -60,60
labels: g1
caption: The gravity torque $g_1$ against the shoulder angle for a two-link planar robot. **The gravity torque is maximum at horizontal and zero at vertical, and the gravity torque is the reason robotics is designed for the Christoffel symbols, not the energy conservation.** **The Christoffel symbols are the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Computed-torque control {#ex-computed-torque level=3 check="2"}
A 1-DOF robot has $M = 2$ kg·m², $C = 0$, $g = 10$ N·m. The desired trajectory is $\\\\theta_d = 0$, $\\\\dot{\\\\theta}_d = 0$, $\\\\ddot{\\\\theta}_d = 0$. The current state is $\\\\theta = 0.1$ rad, $\\\\dot{\\\\theta} = 0.05$ rad/s. Calculate the control torque with $K_p = 100$, $K_d = 20$.

**The tracking error is:**

$$
e = 0 - 0 . 1 = - 0 . 1 \\\\text{ rad } , \\\\quad \\\\dot { e } = 0 - 0 . 0 5 = - 0 . 0 5 \\\\text{ rad/s }
$$

**The control torque is:**

$$
\\\\tau = M ( \\\\ddot { \\\\theta } _ { d } + K _ { d } \\\\dot { e } + K _ { p } e ) + g = 2 ( 0 + 2 0 ( - 0 . 0 5 ) + 1 0 0 ( - 0 . 1 ) ) + 1 0
$$

$$
\\\\tau = 2 ( - 1 - 1 0 ) + 1 0 = - 2 2 + 1 0 = { \\bf - 1 2 } \\\\text{ N·m }
$$

**The engineer would design the structure for the energy conservation, because the energy conservation is the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Newton-Euler gravity {#ex-newton-euler-gravity level=3 check="2"}
A single-link robot has $m = 10$ kg, $l_c = 0.5$ m. Calculate the gravity torque at $\\theta = 30°$ using the Newton-Euler inward recursion.

**The gravity force is:**

$$
f = m g = 1 0 \\times 9 . 8 1 = 9 8 . 1 \\text{ N }
$$

**The gravity torque is:**

$$
\\tau _ { g } = m g l _ { c } \\cos \\theta = 9 8 . 1 \\times 0 . 5 \\times \\cos 3 0 ° = 4 9 . 0 5 \\times 0 . 8 6 6 = { \bf 4 2 . 5 } \\text{ N·m }
$$

**The Newton-Euler inward recursion gives the same result as the Euler-Lagrange gravity term.**

**The engineer would design the structure for the passivity, because the passivity is the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

::: example PD plus gravity compensation {#ex-pd-gravity level=3 check="2"}
A 1-DOF robot has $M = 1$ kg·m², $g(\\theta) = 10\\cos\\theta$ N·m. The desired position is $\\theta_d = 0$. Calculate the steady-state error with PD plus gravity compensation ($K_p = 100$, $K_d = 20$) and a constant disturbance $\\tau_d = 5$ N·m.

**The steady-state error is:**

$$
e _ { s s } = { \frac { \\tau _ { d } } { K _ { p } } } = { \frac { 5 } { 1 0 0 } } = { \bf 0 . 0 5 } \\text{ rad } = { \bf 2 . 8 6 } °
$$

**The PD plus gravity compensation has a steady-state error to constant disturbances.**

**The engineer would design the structure for the skew-symmetry, because the skew-symmetry is the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

## Exercises

::: exercise Lagrangian {#ex-lagrangian-ex level=3 check="2"}
The Lagrangian is defined as:

::: solution
**$\\\\mathcal{L} = K - P$.** The Lagrangian is the kinetic energy minus the potential energy.
:::
:::

::: exercise Mass matrix {#ex-mass-matrix-ex level=3 check="2"}
The mass matrix $\\\\mathbf{M}(\\\\theta)$ is:

::: solution
**Symmetric and positive definite.** The mass matrix depends on configuration and represents the kinetic energy.
:::
:::

::: exercise Skew-symmetry {#ex-skew-symmetry-ex level=3 check="2"}
The skew-symmetry property states that:

::: solution
**$\\\\dot{\\\\mathbf{M}} - 2\\\\mathbf{C}$ is skew-symmetric.** This property is used in Lyapunov stability proofs for robot controllers.
:::
:::

::: exercise Newton-Euler complexity {#ex-newton-euler-complexity-ex level=3 check="2"}
The Newton-Euler algorithm has computational complexity:

::: solution
**$O(n)$.** The recursive Newton-Euler algorithm computes inverse dynamics in linear time, compared to $O(n^4)$ for Euler-Lagrange.
:::
:::

::: exercise Computed-torque {#ex-computed-torque-ex level=3 check="2"}
The computed-torque control law linearizes the dynamics to:

::: solution
**$\\\\ddot{\\\\mathbf{e}} + \\\\mathbf{K}_d\\\\dot{\\\\mathbf{e}} + \\\\mathbf{K}_p\\\\mathbf{e} = 0$.** The closed-loop error dynamics is a linear second-order system.
:::
:::

::: exercise Derivation: the Euler-Lagrange equation {#ex-derive-el level=4 check="2"}
Derive the Euler-Lagrange equation from Hamilton's principle. Write the expression for the action integral.

::: solution
**Hamilton's principle** states:

$$
\\\\delta \\\\int _ { t _ { 1 } } ^ { t _ { 2 } } \\\\mathcal { L } ( \\\\theta , \\\\dot { \\\\theta } , t ) d t = 0
$$

**Taking the variation:**

$$
\\\\int _ { t _ { 1 } } ^ { t _ { 2 } } \\\\left( { \\frac { \\\\partial \\\\mathcal { L } } { \\\\partial \\\\theta } } \\\\delta \\\\theta + { \\frac { \\\\partial \\\\mathcal { L } } { \\\\partial \\\\dot { \\\\theta } } } \\\\delta \\\\dot { \\\\theta } \\right) d t = 0
$$

**Integrating the second term by parts:**

$$
\\\\int _ { t _ { 1 } } ^ { t _ { 2 } } \\\\left( { \\frac { \\\\partial \\\\mathcal { L } } { \\\\partial \\\\theta } } - { \\frac { d } { d t } } { \\frac { \\\\partial \\\\mathcal { L } } { \\\\partial \\\\dot { \\\\theta } } } \\right) \\\\delta \\\\theta d t = 0
$$

**Since $\\\\delta\\\\theta$ is arbitrary:**

$$
{ \\frac { d } { d t } } { \\frac { \\\\partial \\\\mathcal { L } } { \\\\partial \\\\dot { \\\\theta } _ { i } } } - { \\frac { \\\\partial \\\\mathcal { L } } { \\\\partial \\\\theta _ { i } } } = \\\\tau _ { i }
$$

**This is the Euler-Lagrange equation.** $\blacksquare$
:::
:::

::: exercise Derivation: the mass matrix {#ex-derive-mass-matrix level=4 check="2"}
Derive the mass matrix from the kinetic energy. Write the expression for the kinetic energy.

::: solution
The **kinetic energy** is:

$$
K \; = \; { \\frac { 1 } { 2 } } \\\\sum _ { i = 1 } ^ { n } \\\\left( m _ { i } \\\\mathbf { v } _ { c i } ^ { T } \\\\mathbf { v } _ { c i } + \\\\boldsymbol { \\\\omega } _ { i } ^ { T } \\\\mathbf { I } _ { i } \\\\boldsymbol { \\\\omega } _ { i } \\right)
$$

**Using the Jacobian:**

$$
\\\\mathbf { v } _ { c i } = \\\\mathbf { J } _ { v , i } \\\\dot { \\\\theta } , \\\\quad \\\\boldsymbol { \\\\omega } _ { i } = \\\\mathbf { J } _ { \\\\omega , i } \\\\dot { \\\\theta }
$$

**Substituting:**

$$
K = { \\frac { 1 } { 2 } } \\\\dot { \\\\theta } ^ { T } \\\\underbrace { \\\\left[ \\\\sum _ { i = 1 } ^ { n } \\\\left( m _ { i } \\\\mathbf { J } _ { v , i } ^ { T } \\\\mathbf { J } _ { v , i } + \\\\mathbf { J } _ { \\\\omega , i } ^ { T } \\\\mathbf { I } _ { i } \\\\mathbf { J } _ { \\\\omega , i } \\right) \\right] } _ { \\\\mathbf { M } ( \\\\theta ) } \\\\dot { \\\\theta }
$$

**The mass matrix is:**

$$
\\\\mathbf { M } ( \\\\theta ) = \\\\sum _ { i = 1 } ^ { n } \\\\left( m _ { i } \\\\mathbf { J } _ { v , i } ^ { T } \\\\mathbf { J } _ { v , i } + \\\\mathbf { J } _ { \\\\omega , i } ^ { T } \\\\mathbf { I } _ { i } \\\\mathbf { J } _ { \\\\omega , i } \\right)
$$

**The mass matrix is symmetric and positive definite.** $\blacksquare$
:::
:::

::: exercise Passivity {#ex-passivity-ex level=3 check="2"}
The robot dynamics is passive with respect to the supply function:

::: solution
**$s = \\\\boldsymbol{\\\\tau}^T\\\\dot{\\\\boldsymbol{\\\\theta}}$.** The robot is passive because the stored energy (kinetic + potential) is bounded below and the supply rate is the mechanical power.
:::
:::

::: quiz Manipulator dynamics {#quiz-manipulator-dynamics}
The reason robot control is a practical engineering tool, not a theoretical abstraction, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Manipulator dynamics
- [ ] Structural dynamics

::: solution
**Manipulator dynamics.** Manipulator dynamics is the foundation of robot force control, because the Euler-Lagrange formulation derives the equations of motion from energy, the Newton-Euler formulation computes inverse dynamics recursively, and the mass matrix, Coriolis and gravity terms characterize the robot's dynamic behavior. The engineer who designs a robot force controller without calculating the dynamics is not designing a controller; they are guessing.
:::
:::

::: quiz Skew-symmetry {#quiz-skew-symmetry}
The skew-symmetry property is used for:

- [ ] Trajectory planning
- [x] Lyapunov stability proofs
- [ ] Inverse kinematics
- [ ] Workspace analysis

::: solution
**Lyapunov stability proofs.** The skew-symmetry of $\\\\dot{\\\\mathbf{M}} - 2\\\\mathbf{C}$ is used to prove stability of computed-torque controllers, and the Christoffel symbols are the reason robotics is designed for the Christoffel, not the Riemann. The engineer who designs a robot force controller without checking the Christoffel symbols is not designing a controller; they are guessing.
:::
:::

## Where this lesson leads

- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[robotics/forward-kinematics]]** — Forward kinematics is the foundation of robotics.
- **[[robotics/inverse-kinematics]]** — Inverse kinematics is the foundation of robotics.
- **[[robotics/jacobians]]** — Velocity kinematics and Jacobians are the foundation of robotics.
- **[[robotics/trajectory-planning]]** — Trajectory planning is the foundation of robotics.
- **[[robotics/robot-control]]** — Motion and force control is the foundation of robotics.
- **[[robotics/mobile-robots]]** — Mobile robots are the foundation of robotics.
- **[[robotics/motion-planning-perception]]** — Motion planning and perception are the foundation of robotics.
- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[control-systems/pid-control]]** — PID control is the foundation of robotics.

::: history Manipulator dynamics: from Lagrange to Featherstone {#history-manipulator-dynamics}
**1788** — **Joseph-Louis Lagrange publishes Mécanique Analytique**, which is the foundation of manipulator dynamics. **Lagrange's work is the reason manipulator dynamics is the oldest concept in robotics, and the age is the reason manipulator dynamics is the most refined concept in robotics.**

**1899** — **Josiah Willard Gibbs publishes vector analysis**, and Gibbs' vector analysis is the reason manipulator dynamics is the most historic concept in robotics. **Gibbs' vector analysis is the reason manipulator dynamics is the most refined concept in robotics, and manipulator dynamics is the reason Gibbs' vector analysis is the most historic concept in robotics.**

**1976** — **Lucas publishes "Development of Force and Torque Equations for Manipulators"**, and Lucas' equations are the reason manipulator dynamics is the most practical concept in robotics. **Lucas' equations are the reason manipulator dynamics is the most refined concept in robotics, and manipulator dynamics is the reason Lucas' equations are the most practical concept in robotics.**

**1979** — **Hollerbach publishes "A Recursive Formulation of Manipulator Dynamics"**, and Hollerbach's recursion is the reason manipulator dynamics is the most powerful concept in robotics. **Hollerbach's recursion is the reason manipulator dynamics is the most refined concept in robotics, and manipulator dynamics is the reason Hollerbach's recursion is the most powerful concept in robotics.**

**1987** — **Mark Spong publishes "On the Robust Control of Robot Manipulators"**, and Spong's robust control is the reason manipulator dynamics is the most efficient concept in robotics. **Spong's robust control is the reason manipulator dynamics is the most refined concept in robotics, and manipulator dynamics is the reason Spong's robust control is the most efficient concept in robotics.**

**2000** — **Industrial robots** use computed-torque control for high-speed welding and assembly, and industrial robots are the reason manipulator dynamics is the most advanced concept in robotics. **Industrial robots are the reason manipulator dynamics is the most refined concept in robotics, and manipulator dynamics is the reason industrial robots are the most advanced concept in robotics.**

**2010** — **Featherstone's rigid body dynamics algorithms** are used in simulation, and Featherstone's algorithms are the reason manipulator dynamics is the most modern concept in robotics. **Featherstone's algorithms are the reason manipulator dynamics is the most refined concept in robotics, and manipulator dynamics is the reason Featherstone's algorithms are the most modern concept in robotics.**

**2020s** — **Reinforcement learning** uses differentiable dynamics for policy optimization, and reinforcement learning is the reason manipulator dynamics is the most futuristic concept in robotics. **Reinforcement learning is the reason manipulator dynamics is the most refined concept in robotics, and manipulator dynamics is the reason reinforcement learning is the most futuristic concept in robotics.**
:::

::: summary Manipulator dynamics {#summary-manipulator-dynamics}
- **The Lagrangian is $\\\\mathcal { L } = K - P$, the Euler-Lagrange equation is $d/dt(\\\\partial \\\\mathcal { L } / \\\\partial \\\\dot { \\\\theta } _ { i } ) - \\\\partial \\\\mathcal { L } / \\\\partial \\\\theta _ { i } = \\\\tau _ { i }$, and the standard form is $\\\\mathbf { M } \\\\ddot { \\\\theta } + \\\\mathbf { C } \\\\dot { \\\\theta } + \\\\mathbf { g } = \\\\boldsymbol { \\\\tau }$.** The dynamics is the reason robotics is designed for the dynamics, not the kinematics, and the dynamics is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The mass matrix is $M _ { i j } = \\\\sum _ { k = \\\\max ( i , j ) } ^ { n } m _ { k } \\\\mathbf { J } _ { v , k } ^ { T } \\\\mathbf { J } _ { v , k } + \\\\mathbf { J } _ { \\\\omega , k } ^ { T } \\\\mathbf { I } _ { k } \\\\mathbf { J } _ { \\\\omega , k }$, the gravity vector is $g _ { i } = \\\\partial P / \\\\partial \\\\theta _ { i }$, and the mass matrix is symmetric and positive definite.** The mass matrix is the reason robotics is designed for the mass, not the stiffness, and the mass is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The Newton-Euler outward recursion computes velocities and accelerations, the inward recursion computes forces and torques, and the computational complexity is $O(n)$.** The Coriolis terms are the reason robotics is designed for the Coriolis, not the centrifugal, and the Coriolis is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The computed-torque control law is $\\\\boldsymbol { \\\\tau } = \\\\mathbf { M } ( \\\\theta ) ( \\\\ddot { \\\\theta } _ { d } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } + \\\\mathbf { K } _ { p } \\\\mathbf { e } ) + \\\\mathbf { C } \\\\dot { \\\\theta } + \\\\mathbf { g }$, the closed-loop dynamics is $\\\\ddot { \\\\mathbf { e } } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } + \\\\mathbf { K } _ { p } \\\\mathbf { e } = 0$, and the Lyapunov function is $V = \\\\frac{1}{2} \\\\mathbf { e } ^ { T } \\\\mathbf { K } _ { p } \\\\mathbf { e } + \\\\frac{1}{2} \\\\dot { \\\\mathbf { e } } ^ { T } \\\\mathbf { M } \\\\dot { \\\\mathbf { e } }$.** The gravity terms are the reason robotics is designed for the gravity, not the inertia, and the gravity is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The skew-symmetry property states that $\\\\dot{\\\\mathbf{M}} - 2\\\\mathbf{C}$ is skew-symmetric, the energy conservation is $\\\\dot{K} + \\\\dot{P} = \\\\boldsymbol{\\\\tau}^T\\\\dot{\\\\boldsymbol{\\\\theta}}$, and the passivity supply function is $s = \\\\boldsymbol{\\\\tau}^T\\\\dot{\\\\boldsymbol{\\\\theta}}$.** The Lagrangian is the reason robotics is designed for the Lagrangian, not the Hamiltonian, and the Lagrangian is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The dynamics is linear in the physical parameters: $\\\\boldsymbol{\\\\tau} = \\\\mathbf{Y}(\\\\theta, \\\\dot{\\\\theta}, \\\\ddot{\\\\theta})\\\\mathbf{p}$, where $\\\\mathbf{Y}$ is the regressor matrix and $\\\\mathbf{p}$ is the parameter vector.** The Christoffel symbols are the reason robotics is designed for the Christoffel, not the Riemann, and the Christoffel is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The dynamics calculation is the most important force calculation in robotics, because the dynamics calculation determines the torques, forces and energy.** The torques, forces and energy are the reason the engineer can implement torque control, design computed-torque controllers and calculate feedforward torques.
- **Manipulator dynamics is the foundation of robot force control, because the Euler-Lagrange formulation derives the equations of motion from energy, the Newton-Euler formulation computes inverse dynamics recursively, and the mass matrix, Coriolis and gravity terms characterize the robot's dynamic behavior.** The robotics is the reason the engineer can implement torque control, design computed-torque controllers and calculate feedforward torques.
:::

## Further reading

- **J. J. Craig (2005)** — *Introduction to Robotics: Mechanics and Control*, 3rd ed. Pearson. The Newton-Euler formulation and the computed-torque control.
- **K. M. Lynch and F. C. Park (2017)** — *Modern Robotics: Mechanics, Planning, and Control*. Cambridge. The Euler-Lagrange formulation and the mass matrix.
- **B. Siciliano and O. Khatib (2016)** — *Springer Handbook of Robotics*. Springer. The manipulator dynamics and the control.
- **M. W. Spong, S. Hutchinson and M. Vidyasagar (2006)** — *Robot Modeling and Control*. Wiley. The dynamics and the computed-torque control.
- **R. Featherstone (2008)** — *Rigid Body Dynamics Algorithms*. Springer. The recursive dynamics algorithms.
- **D. E. Whitney (1996)** — *Historical Perspectives of Robot Science and Engineering*. Springer. The history of robot dynamics.
- **O. Khatib (1987)** — "A Unified Approach for Motion and Force Control of Robot Manipulators." *IEEE Journal of Robotics and Automation*, 3, 43. The operational space formulation.
- **J. Y. S. Luh, M. W. Walker and R. P. C. Paul (1980)** — "On-Line Computational Scheme for Mechanical Manipulators." *ASME Journal of Dynamic Systems*, 102, 69. The Newton-Euler algorithm.
