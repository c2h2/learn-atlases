Robot control is the foundation of robot servo systems: the PID controller stabilizes joint positions, the computed-torque controller linearizes the dynamics, the impedance controller regulates contact forces, and the hybrid position/force controller manages constrained motion. **The engineer who designs a robot servo system without designing the controller is not designing a servo system; they are guessing.** The controller design calculation is the reason the engineer can achieve precise positioning, regulate contact forces and handle environmental constraints, and the controller design is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.

The quantitative tools of robot control are the **PID controller** (the joint-space feedback), the **computed-torque controller** (the dynamics-based linearization), and the **impedance controller** (the force-position relationship). The tools are the language in which the controller design analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways robot control calculation goes wrong
**Not designing the controller.** The engineer who designs a robot servo system without designing the controller is not designing a servo system; they are guessing. **The controller design is the reason robotics is designed for the controller, not the plant, and the controller design is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.** **Not checking the PID controller.** The engineer who designs a robot servo system without checking the PID controller is not designing a servo system; they are guessing. **The PID controller is the reason robotics is designed for the PID, not the state-space, and the PID is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.** **Not checking the computed-torque controller.** The engineer who designs a robot servo system without checking the computed-torque controller is not designing a servo system; they are guessing. **The computed-torque controller is the reason robotics is designed for the computed, not the measured, and the computed is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.** **Not checking the impedance controller.** The engineer who designs a robot servo system without checking the impedance controller is not designing a servo system; they are guessing. **The impedance controller is the reason robotics is designed for the impedance, not the admittance, and the impedance is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.** **Not checking the hybrid position/force controller.** The engineer who designs a robot servo system without checking the hybrid position/force controller is not designing a servo system; they are guessing. **The hybrid position/force controller is the reason robotics is designed for the hybrid, not the pure, and the hybrid is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.** **Not checking the selection matrix.** The engineer who designs a robot servo system without checking the selection matrix is not designing a servo system; they are guessing. **The selection matrix is the reason robotics is designed for the selection, not the rejection, and the selection is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.** **Not checking the task space.** The engineer who designs a robot servo system without checking the task space is not designing a servo system; they are guessing. **The task space is the reason robotics is designed for the task, not the joint, and the task is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.** **Not checking the stability.** The engineer who designs a robot servo system without checking the stability is not designing a servo system; they are guessing. **The stability is the reason robotics is designed for the stability, not the instability, and the stability is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.** **Not checking the robustness.** The engineer who designs a robot servo system without checking the robustness is not designing a servo system; they are guessing. **The robustness is the reason robotics is designed for the robustness, not the fragility, and the robustness is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.**
:::

## 1. Joint-space control

::: definition The PID controller {#def-pid-controller}
The **PID controller** stabilizes joint positions using proportional, integral and derivative feedback, and the PID controller is the reason the engineer can achieve precise positioning, regulate contact forces and handle environmental constraints.

The **PID control law** is:

$$
\\\\boldsymbol { \\\\tau } \; = \\\\mathbf { K } _ { p } ( \\\\boldsymbol { \\\\theta } _ { d } - \\\\boldsymbol { \\\\theta } ) + \\\\mathbf { K } _ { i } \\\\int ( \\\\boldsymbol { \\\\theta } _ { d } - \\\\boldsymbol { \\\\theta } ) d t + \\\\mathbf { K } _ { d } ( \\\\dot { \\\\boldsymbol { \\\\theta } } _ { d } - \\\\dot { \\\\boldsymbol { \\\\theta } } )
$$

The **PD plus gravity compensation** is:

$$
\\\\boldsymbol { \\\\tau } \; = \\\\mathbf { K } _ { p } \\\\mathbf { e } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } + \\\\mathbf { g } ( \\\\boldsymbol { \\\\theta } )
$$

The **closed-loop dynamics** (PD plus gravity) is:

$$
\\\\mathbf { M } ( \\\\theta ) \\\\ddot { \\\\mathbf { e } } + \\\\mathbf { C } ( \\\\theta , \\\\dot { \\\\theta } ) \\\\dot { \\\\mathbf { e } } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } + \\\\mathbf { K } _ { p } \\\\mathbf { e } = 0
$$

The **Lyapunov function** is:

$$
V \; = \; { \\frac { 1 } { 2 } } \\\\mathbf { e } ^ { T } \\\\mathbf { K } _ { p } \\\\mathbf { e } + { \\frac { 1 } { 2 } } \\\\dot { \\\\mathbf { e } } ^ { T } \\\\mathbf { M } ( \\\\theta ) \\\\dot { \\\\mathbf { e } }
$$

The **stability condition** is:

$$
\\\\mathbf { K } _ { p } > 0 , \\\\quad \\\\mathbf { K } _ { d } > 0
$$

$$
\begin{array} { l c c c }
\textbf{Controller} & \textbf{ Model} & \textbf{ Stability} & \textbf{ Application } \\\\hline
\text{PD} & \\\\text{None} & \\\\text{Local} & \\\\text{Simple joints} \\\\
\text{PD+gravity} & \\\\text{Gravity} & \\\\text{Global asymptotic} & \\\\text{Industrial robots} \\\\
\text{Computed-torque} & \\\\text{Full} & \\\\text{Exponential} & \\\\text{High performance} \\\\
\text{PD+feedforward} & \\\\text{Partial} & \\\\text{Asymptotic} & \\\\text{Trajectory tracking} \\\\
\end{array}
$$

**The controller design is the reason robotics is designed for the controller, not the plant, and the controller design is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot servo system without designing the controller is not designing a servo system; they are guessing.**
:::

::: definition The computed-torque controller {#def-computed-torque-ctrl}
The **computed-torque controller** linearizes and decouples the robot dynamics using feedback linearization, and the computed-torque controller is the reason the engineer can achieve precise positioning, regulate contact forces and handle environmental constraints.

The **control law** is:

$$
\\\\boldsymbol { \\\\tau } = \\\\mathbf { M } ( \\\\theta ) \\\\mathbf { u } + \\\\mathbf { C } ( \\\\theta , \\\\dot { \\\\theta } ) \\\\dot { \\\\theta } + \\\\mathbf { g } ( \\\\theta )
$$

where $\\\\mathbf{u}$ is the linearizing control input.

The **linearizing input** is:

$$
\\\\mathbf { u } \; = \; \\\\ddot { \\\\theta } _ { d } + \\\\mathbf { K } _ { d } ( \\\\dot { \\\\theta } _ { d } - \\\\dot { \\\\theta } ) + \\\\mathbf { K } _ { p } ( \\\\theta _ { d } - \\\\theta )
$$

The **closed-loop dynamics** is:

$$
\\\\ddot { \\\\mathbf { e } } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } + \\\\mathbf { K } _ { p } \\\\mathbf { e } = 0
$$

The **tracking error** is:

$$
\\\\mathbf { e } ( t ) \; = \; \\\\mathcal { O } ( e ^ { - \\\\alpha t } ) \\\\quad \\\\text{for} \\\\quad \\\\alpha > 0
$$

The **model uncertainty effect** is:

$$
\\\\boldsymbol { \\\\tau } = ( \\\\mathbf { M } + \\\\Delta \\\\mathbf { M } ) \\\\mathbf { u } + ( \\\\mathbf { C } + \\\\Delta \\\\mathbf { C } ) \\\\dot { \\\\theta } + ( \\\\mathbf { g } + \\\\Delta \\\\mathbf { g } )
$$

$$
\begin{array} { l c c c }
\textbf{Controller} & \textbf{ Linearization} & \textbf{ Decoupling} & \textbf{ Robustness } \\\\hline
\text{PD} & \\\\text{None} & \\\\text{None} & \\\\text{High} \\\\
\text{Computed-torque} & \\\\text{Exact} & \\\\text{Exact} & \\\\text{Low} \\\\
\text{Adaptive} & \\\\text{Estimated} & \\\\text{Estimated} & \\\\text{Medium} \\\\
\text{Sliding mode} & \\\\text{Bounding} & \\\\text{Bounding} & \\\\text{High} \\\\
\end{array}
$$

**The PID controller is the reason robotics is designed for the PID, not the state-space, and the PID is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot servo system without checking the PID controller is not designing a servo system; they are guessing.**
:::

::: widget plot
title: The PD step response
f: 1 - exp(-5 * x) * cos(10 * x)
x: 0,1
y: 0,1.5
labels: y
caption: The PD controller step response against normalized time. **The PD response is oscillatory without damping, and the PD response is the reason robotics is designed for the computed-torque controller, not the impedance controller.** **The computed-torque controller is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.**
:::

::: example PD plus gravity tuning {#ex-pd-gravity-tuning level=3 check="2"}
A 1-DOF robot has $M = 1$ kg·m², $g(\\\\theta) = 10\\\\cos\\\\theta$ N·m. Design a PD plus gravity controller with natural frequency $\\\\omega_n = 10$ rad/s and damping ratio $\\\\zeta = 0.7$. Calculate $K_p$ and $K_d$.

**The desired characteristic equation is:**

$$
s ^ { 2 } + 2 \\\\zeta \\\\omega _ { n } s + \\\\omega _ { n } ^ { 2 } = s ^ { 2 } + 1 4 . 1 4 s + 1 0 0
$$

**The gains are:**

$$
K _ { p } = \\\\omega _ { n } ^ { 2 } = { \\bf 1 0 0 } \\\\text{ N·m/rad }
$$

$$
K _ { d } = 2 \\\\zeta \\\\omega _ { n } = { \\bf 1 4 . 1 4 } \\\\text{ N·m·s/rad }
$$

**The engineer would design the structure for the hybrid position/force controller, because the hybrid position/force controller is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.**
:::

## 2. Force and impedance control

::: definition The impedance controller {#def-impedance-controller}
The **impedance controller** regulates the force-position relationship at the end-effector, and the impedance controller is the reason the engineer can achieve precise positioning, regulate contact forces and handle environmental constraints.

The **target impedance** is:

$$
\\\\mathbf { F } \; = \; \\\\mathbf { M } _ { d } ( \\\\ddot { \\\\mathbf { x } } _ { d } - \\\\ddot { \\\\mathbf { x } } ) + \\\\mathbf { D } _ { d } ( \\\\dot { \\\\mathbf { x } } _ { d } - \\\\dot { \\\\mathbf { x } } ) + \\\\mathbf { K } _ { d } ( \\\\mathbf { x } _ { d } - \\\\mathbf { x } )
$$

The **impedance control law** is:

$$
\\\\boldsymbol { \\\\tau } = \\\\mathbf { J } ^ { T } \\\\mathbf { F } + \\\\mathbf { g } ( \\\\theta )
$$

The **admittance control** is:

$$
\\\\ddot { \\\\mathbf { x } } _ { c } = \\\\mathbf { M } _ { d } ^ { - 1 } ( \\\\mathbf { F } _ { \\\\text{sense } } - \\\\mathbf { D } _ { d } \\\\dot { \\\\mathbf { x } } _ { c } - \\\\mathbf { K } _ { d } ( \\\\mathbf { x } _ { c } - \\\\mathbf { x } _ { d } ) )
$$

The **impedance vs admittance** comparison is:

$$
\\\\text{Impedance: force output, position input} \\\\quad \\\\text{Admittance: position output, force input}
$$

The **stable contact condition** is:

$$
\\\\mathbf { D } _ { d } > 0 \\\\quad \\\\text{(dissipative impedance)}
$$

$$
\begin{array} { l c c c }
\textbf{Controller} & \textbf{ Input} & \textbf{ Output} & \textbf{ Application } \\\\hline
\text{Impedance} & \\\\text{Position} & \\\\text{Force} & \\\\text{Free space} \\\\
\\\\\text{Admittance} & \\\\text{Force} & \\\\text{Position} & \\\\text{Stiff environment} \\\\
\text{Hybrid} & \\\\text{Mixed} & \\\\text{Mixed} & \\\\text{Constrained motion} \\\\
\text{Position} & \\\\text{Position} & \\\\text{Position} & \\\\text{Free space} \\\\
\end{array}
$$

**The computed-torque controller is the reason robotics is designed for the computed, not the measured, and the computed is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot servo system without checking the computed-torque controller is not designing a servo system; they are guessing.**
:::

::: definition Hybrid position/force control {#def-hybrid-position-force}
The **hybrid position/force controller** simultaneously controls position in unconstrained directions and force in constrained directions, and the hybrid position/force controller is the reason the engineer can achieve precise positioning, regulate contact forces and handle environmental constraints.

The **selection matrix** is:

$$
\\\\mathbf { S } \; = \; \\\\text{diag} ( s _ { 1 } , s _ { 2 } , \\\\ldots , s _ { 6 } ) , \\\\quad s _ { i } \\\\in \\\\{ 0 , 1 \\\\}
$$

where $s_i = 1$ for position control and $s_i = 0$ for force control.

The **position control subspace** is:

$$
\\\\mathbf { S } ( \\\\mathbf { x } _ { d } - \\\\mathbf { x } ) \\\\quad \\\\text{(position error in controlled directions)}
$$

The **force control subspace** is:

$$
( \\\\mathbf { I } - \\\\mathbf { S } ) ( \\\\mathbf { F } _ { d } - \\\\mathbf { F } ) \\\\quad \\\\text{(force error in controlled directions)}
$$

The **hybrid control law** is:

$$
\\\\mathbf { F } \; = \; \\\\mathbf { S } ( \\\\mathbf { K } _ { p } \\\\mathbf { e } _ { x } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } _ { x } ) + ( \\\\mathbf { I } - \\\\mathbf { S } ) ( \\\\mathbf { F } _ { d } - \\\\mathbf { K } _ { f } \\\\mathbf { e } _ { f } )
$$

The **constraint surface** is:

$$
\\\\phi ( \\\\mathbf { x } ) = 0 \\\\quad \\\\text{(rigid constraint)}
$$

$$
\begin{array} { l c c c }
\textbf{Direction} & \textbf{ Control} & \textbf{ Selection} & \textbf{ Example } \\\\hline
\\\\text{Tangent} & \\\\text{Position} & s _ { i } = 1 & \\\\text{Sliding along surface} \\\\
\\\\text{Normal} & \\\\text{Force} & s _ { i } = 0 & \\\\text{Pressing against surface} \\\\
\\\\text{Free} & \\\\text{Position} & s _ { i } = 1 & \\\\text{Unconstrained motion} \\\\
\\\\text{Constrained} & \\\\text{Force} & s _ { i } = 0 & \\\\text{Contact direction} \\\\
\end{array}
$$

**The impedance controller is the reason robotics is designed for the impedance, not the admittance, and the impedance is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot servo system without checking the impedance controller is not designing a servo system; they are guessing.**
:::

::: widget plot
title: The impedance step response
f: 1 - exp(-3 * x) * (cos(4 * x) + 0.75 * sin(4 * x))
x: 0,2
y: 0,1.3
labels: y
caption: The impedance controller step response against normalized time. **The impedance response is compliant and oscillatory, and the impedance response is the reason robotics is designed for the selection matrix, not the task space.** **The selection matrix is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.**
:::

::: example Impedance control design {#ex-impedance-design level=3 check="2"}
A robot end-effector presses against a rigid surface with desired force $F_d = 10$ N. The target impedance is $M_d = 1$ kg, $D_d = 20$ N·s/m, $K_d = 100$ N/m. Calculate the steady-state force error.

**The steady-state force error is:**

$$
e _ { f , s s } = { \\frac { F _ { d } } { K _ { \\\\text{env } } + K _ { d } } } K _ { \\\\text{env } }
$$

**For a rigid environment ($K_{\\\\text{env}} \\\\to \\\\infty$):**

$$
e _ { f , s s } \\\\to F _ { d } = { \\bf 1 0 } \\\\text{ N }
$$

**For a compliant environment ($K_{\\\\text{env}} = 200$ N/m):**

$$
e _ { f , s s } = { \\frac { 1 0 } { 2 0 0 + 1 0 0 } } \\\\times 2 0 0 = { \\bf 6 . 6 7 } \\\\text{ N }
$$

**The engineer would design the structure for the stability, because the stability is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.**
:::

::: example Computed-torque tracking {#ex-computed-torque-tracking level=3 check="2"}
A 1-DOF robot has $M = 2$ kg·m², $C = 0$, $g = 0$. The desired trajectory is $\\theta_d = \\sin(t)$, $\\dot{\\theta}_d = \\cos(t)$, $\\ddot{\\theta}_d = -\\sin(t)$. Calculate the control torque at $t = 0$ with $K_p = 100$, $K_d = 20$ and errors $e = 0.01$, $\\dot{e} = 0.02$.

**The linearizing input is:**

$$
u = \\ddot { \\theta } _ { d } + K _ { d } \\dot { e } + K _ { p } e = - \\sin ( 0 ) + 2 0 ( 0 . 0 2 ) + 1 0 0 ( 0 . 0 1 ) = 0 + 0 . 4 + 1 . 0 = 1 . 4
$$

**The control torque is:**

$$
\\tau = M u + C \\dot { \\theta } + g = 2 \\times 1 . 4 + 0 + 0 = { \bf 2 . 8 } \\text{ N·m }
$$

**The engineer would design the structure for the task space, because the task space is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.**
:::

::: example Hybrid position/force control {#ex-hybrid-position-force-ex level=3 check="2"}
A robot deburrs a surface. The selection matrix is $\\mathbf{S} = \\text{diag}(1, 1, 0, 0, 0, 0)$ (position in x, y; force in z). The position errors are $e_x = 0.01$, $e_y = 0.02$ m, and the force error is $e_z = 2$ N. Calculate the contact force in z with $K_f = 0.5$ and $F_d = 10$ N.

**The force control output in z is:**

$$
F _ { z } = F _ { d } - K _ { f } e _ { z } = 1 0 - 0 . 5 \\times 2 = { \bf 9 } \\text{ N }
$$

**The position control output in x is:**

$$
F _ { x } = K _ { p } e _ { x } = 1 0 0 \\times 0 . 0 1 = { \bf 1 } \\text{ N }
$$

**The engineer would design the structure for the robustness, because the robustness is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.**
:::

## Exercises

::: exercise PID controller {#ex-pid-controller-ex level=3 check="2"}
The PID controller uses:

::: solution
**Proportional, integral and derivative feedback.** The PID controller uses three terms to stabilize the system.
:::
:::

::: exercise PD plus gravity {#ex-pd-gravity-ex level=3 check="2"}
The PD plus gravity controller is:

::: solution
**$\\\\boldsymbol{\\\\tau} = \\\\mathbf{K}_p\\\\mathbf{e} + \\\\mathbf{K}_d\\\\dot{\\\\mathbf{e}} + \\\\mathbf{g}(\\\\theta)$.** The PD plus gravity controller compensates gravity and provides PD feedback.
:::
:::

::: exercise Computed-torque {#ex-computed-torque-ctrl-ex level=3 check="2"}
The computed-torque controller:

::: solution
**Linearizes and decouples the dynamics.** The computed-torque controller uses the full dynamics model to linearize the closed-loop system.
:::
:::

::: exercise Impedance control {#ex-impedance-ctrl-ex level=3 check="2"}
The impedance controller regulates:

::: solution
**The force-position relationship.** The impedance controller regulates the dynamic relationship between end-effector force and position.
:::
:::

::: exercise Selection matrix {#ex-selection-matrix-ex level=3 check="2"}
The selection matrix $\\\\mathbf{S}$ has entries:

::: solution
**0 or 1.** $s_i = 1$ for position control, $s_i = 0$ for force control.
:::
:::

::: exercise Derivation: the PD plus gravity stability {#ex-derive-pd-gravity level=4 check="2"}
Derive the Lyapunov stability proof for PD plus gravity control. Write the expression for the Lyapunov function.

::: solution
The **Lyapunov function** is:

$$
V = { \\frac { 1 } { 2 } } \\\\mathbf { e } ^ { T } \\\\mathbf { K } _ { p } \\\\mathbf { e } + { \\frac { 1 } { 2 } } \\\\dot { \\\\mathbf { e } } ^ { T } \\\\mathbf { M } ( \\\\theta ) \\\\dot { \\\\mathbf { e } }
$$

**The time derivative is:**

$$
\\\\dot { V } = \\\\mathbf { e } ^ { T } \\\\mathbf { K } _ { p } \\\\dot { \\\\mathbf { e } } + { \\frac { 1 } { 2 } } \\\\dot { \\\\mathbf { e } } ^ { T } \\\\dot { \\\\mathbf { M } } \\\\dot { \\\\mathbf { e } } + \\\\dot { \\\\mathbf { e } } ^ { T } \\\\mathbf { M } \\\\ddot { \\\\mathbf { e } }
$$

**Using the skew-symmetry property $\\\\dot{\\\\mathbf{e}}^T(\\\\frac{1}{2}\\\\dot{\\\\mathbf{M}} - \\\\mathbf{C})\\\\dot{\\\\mathbf{e}} = 0$:**

$$
\\\\dot { V } = \\\\dot { \\\\mathbf { e } } ^ { T } ( \\\\mathbf { K } _ { p } \\\\mathbf { e } + \\\\mathbf { M } \\\\ddot { \\\\mathbf { e } } + \\\\mathbf { C } \\\\dot { \\\\mathbf { e } } )
$$

**Substituting the closed-loop dynamics $\\\\mathbf{M}\\\\ddot{\\\\mathbf{e}} + \\\\mathbf{C}\\\\dot{\\\\mathbf{e}} + \\\\mathbf{K}_d\\\\dot{\\\\mathbf{e}} + \\\\mathbf{K}_p\\\\mathbf{e} = 0$:**

$$
\\\\dot { V } = - \\\\dot { \\\\mathbf { e } } ^ { T } \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } \\\\le 0
$$

**Since $V > 0$ and $\\\\dot{V} \\\\le 0$, the system is stable by Lyapunov's direct method.** $\blacksquare$
:::
:::

::: exercise Derivation: the impedance control law {#ex-derive-impedance level=4 check="2"}
Derive the impedance control law from the target impedance. Write the expression for the control torque.

::: solution
The **target impedance** is:

$$
\\\\mathbf { F } = \\\\mathbf { M } _ { d } ( \\\\ddot { \\\\mathbf { x } } _ { d } - \\\\ddot { \\\\mathbf { x } } ) + \\\\mathbf { D } _ { d } ( \\\\dot { \\\\mathbf { x } } _ { d } - \\\\dot { \\\\mathbf { x } } ) + \\\\mathbf { K } _ { d } ( \\\\mathbf { x } _ { d } - \\\\mathbf { x } )
$$

**The desired end-effector force is computed from the impedance.**

**The joint torque is obtained through the Jacobian transpose:**

$$
\\\\boldsymbol { \\\\tau } = \\\\mathbf { J } ^ { T } \\\\mathbf { F } + \\\\mathbf { g } ( \\\\theta )
$$

**The gravity term compensates the robot's weight.**

**The impedance control law is:**

$$
\\\\boldsymbol { \\\\tau } = \\\\mathbf { J } ^ { T } [ \\\\mathbf { M } _ { d } \\\\ddot { \\\\mathbf { e } } _ { x } + \\\\mathbf { D } _ { d } \\\\dot { \\\\mathbf { e } } _ { x } + \\\\mathbf { K } _ { d } \\\\mathbf { e } _ { x } ] + \\\\mathbf { g } ( \\\\theta )
$$

**This is the impedance control law.** $\blacksquare$
:::
:::

::: exercise Admittance control {#ex-admittance-ctrl-ex level=3 check="2"}
The admittance controller takes:

::: solution
**Force as input and position as output.** The admittance controller computes the desired position from the sensed force.
:::
:::

::: quiz Robot control {#quiz-robot-control}
The reason robot servo systems are a practical engineering tool, not a theoretical abstraction, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Robot control
- [ ] Structural dynamics

::: solution
**Robot control.** Robot control is the foundation of robot servo systems, because the PID controller stabilizes joint positions, the computed-torque controller linearizes the dynamics, the impedance controller regulates contact forces, and the hybrid position/force controller manages constrained motion. The engineer who designs a robot servo system without designing the controller is not designing a servo system; they are guessing.
:::
:::

::: quiz Hybrid control {#quiz-hybrid-control}
The hybrid position/force controller uses:

- [ ] A single controller
- [x] A selection matrix
- [ ] A PID controller only
- [ ] An impedance controller only

::: solution
**A selection matrix.** The hybrid position/force controller uses a selection matrix to partition the task space into position-controlled and force-controlled directions, and the hybrid position/force controller is the reason robotics is designed for the hybrid, not the pure. The engineer who designs a robot servo system without checking the hybrid position/force controller is not designing a servo system; they are guessing.
:::
:::

## Where this lesson leads

- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[robotics/forward-kinematics]]** — Forward kinematics is the foundation of robotics.
- **[[robotics/inverse-kinematics]]** — Inverse kinematics is the foundation of robotics.
- **[[robotics/jacobians]]** — Velocity kinematics and Jacobians are the foundation of robotics.
- **[[robotics/manipulator-dynamics]]** — Manipulator dynamics is the foundation of robotics.
- **[[robotics/trajectory-planning]]** — Trajectory planning is the foundation of robotics.
- **[[robotics/mobile-robots]]** — Mobile robots are the foundation of robotics.
- **[[robotics/motion-planning-perception]]** — Motion planning and perception are the foundation of robotics.
- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[control-systems/pid-control]]** — PID control is the foundation of robotics.

::: history Robot control: from Paul to KUKA {#history-robot-control}
**1876** — **Arthur Cayley publishes the theory of matrix algebra**, which is the foundation of robot control. **Cayley's theory is the reason robot control is the oldest concept in robotics, and the age is the reason robot control is the most refined concept in robotics.**

**1974** — **Richard Paul publishes "Robotic Manipulators: Mathematics, Programming and Control"**, and Paul's control is the reason robot control is the most historic concept in robotics. **Paul's control is the reason robot control is the most refined concept in robotics, and robot control is the reason Paul's control is the most historic concept in robotics.**

**1979** — **Luh, Walker and Paul publish "On-Line Computational Scheme for Mechanical Manipulators"**, and the computed-torque method is the reason robot control is the most practical concept in robotics. **The computed-torque method is the reason robot control is the most refined concept in robotics, and robot control is the reason the computed-torque method is the most practical concept in robotics.**

**1982** — **Hogan publishes "Impedance Control: An Approach to Manipulation"**, and Hogan's impedance control is the reason robot control is the most powerful concept in robotics. **Hogan's impedance control is the reason robot control is the most refined concept in robotics, and robot control is the reason Hogan's impedance control is the most powerful concept in robotics.**

**1987** — **Khatib publishes "A Unified Approach for Motion and Force Control"**, and Khatib's operational space is the reason robot control is the most efficient concept in robotics. **Khatib's operational space is the reason robot control is the most refined concept in robotics, and robot control is the reason Khatib's operational space is the most efficient concept in robotics.**

**2000** — **Industrial robots** use PD plus gravity compensation for welding and assembly, and industrial robots are the reason robot control is the most advanced concept in robotics. **Industrial robots are the reason robot control is the most refined concept in robotics, and robot control is the reason industrial robots are the most advanced concept in robotics.**

**2010** — **KUKA LBR iiwa** uses impedance control for compliant assembly, and the iiwa is the reason robot control is the most modern concept in robotics. **The iiwa is the reason robot control is the most refined concept in robotics, and robot control is the reason the iiwa is the most modern concept in robotics.**

**2020s** — **Collaborative robots** use admittance control for hand-guiding and collision detection, and collaborative robots are the reason robot control is the most futuristic concept in robotics. **Collaborative robots are the reason robot control is the most refined concept in robotics, and robot control is the reason collaborative robots are the most futuristic concept in robotics.**
:::

::: summary Robot control {#summary-robot-control}
- **The PID control law is $\\\\boldsymbol { \\\\tau } = \\\\mathbf { K } _ { p } \\\\mathbf { e } + \\\\mathbf { K } _ { i } \\\\int \\\\mathbf { e } d t + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } }$, the PD plus gravity is $\\\\boldsymbol { \\\\tau } = \\\\mathbf { K } _ { p } \\\\mathbf { e } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } + \\\\mathbf { g } ( \\\\theta )$, and the Lyapunov function is $V = \\\\frac{1}{2} \\\\mathbf { e } ^ { T } \\\\mathbf { K } _ { p } \\\\mathbf { e } + \\\\frac{1}{2} \\\\dot { \\\\mathbf { e } } ^ { T } \\\\mathbf { M } \\\\dot { \\\\mathbf { e } }$.** The controller design is the reason robotics is designed for the controller, not the plant, and the controller design is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.
- **The computed-torque control law is $\\\\boldsymbol { \\\\tau } = \\\\mathbf { M } ( \\\\theta ) \\\\mathbf { u } + \\\\mathbf { C } \\\\dot { \\\\theta } + \\\\mathbf { g }$, the linearizing input is $\\\\mathbf { u } = \\\\ddot { \\\\theta } _ { d } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } + \\\\mathbf { K } _ { p } \\\\mathbf { e }$, and the closed-loop dynamics is $\\\\ddot { \\\\mathbf { e } } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } + \\\\mathbf { K } _ { p } \\\\mathbf { e } = 0$.** The PID controller is the reason robotics is designed for the PID, not the state-space, and the PID is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.
- **The target impedance is $\\\\mathbf { F } = \\\\mathbf { M } _ { d } \\\\ddot { \\\\mathbf { e } } _ { x } + \\\\mathbf { D } _ { d } \\\\dot { \\\\mathbf { e } } _ { x } + \\\\mathbf { K } _ { d } \\\\mathbf { e } _ { x }$, the impedance control law is $\\\\boldsymbol { \\\\tau } = \\\\mathbf { J } ^ { T } \\\\mathbf { F } + \\\\mathbf { g } ( \\\\theta )$, and the admittance control computes position from sensed force.** The computed-torque controller is the reason robotics is designed for the computed, not the measured, and the computed is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.
- **The selection matrix is $\\\\mathbf { S } = \\\\text{diag}(s_1, \\\\ldots, s_6)$ with $s_i \\\\in \\\\{0, 1\\\\}$, the position control subspace is $\\\\mathbf { S } ( \\\\mathbf { x } _ { d } - \\\\mathbf { x } )$, and the force control subspace is $( \\\\mathbf { I } - \\\\mathbf { S } ) ( \\\\mathbf { F } _ { d } - \\\\mathbf { F } )$.** The impedance controller is the reason robotics is designed for the impedance, not the admittance, and the impedance is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.
- **The hybrid control law is $\\\\mathbf { F } = \\\\mathbf { S } ( \\\\mathbf { K } _ { p } \\\\mathbf { e } _ { x } + \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } _ { x } ) + ( \\\\mathbf { I } - \\\\mathbf { S } ) ( \\\\mathbf { F } _ { d } - \\\\mathbf { K } _ { f } \\\\mathbf { e } _ { f } )$, the constraint surface is $\\\\phi ( \\\\mathbf { x } ) = 0$, and the stable contact condition is $\\\\mathbf { D } _ { d } > 0$.** The hybrid position/force controller is the reason robotics is designed for the hybrid, not the pure, and the hybrid is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.
- **The Lyapunov stability proof uses $\\\\dot { V } = - \\\\dot { \\\\mathbf { e } } ^ { T } \\\\mathbf { K } _ { d } \\\\dot { \\\\mathbf { e } } \\\\le 0$, the skew-symmetry property is $\\\\dot{\\\\mathbf{e}}^T(\\\\frac{1}{2}\\\\dot{\\\\mathbf{M}} - \\\\mathbf{C})\\\\dot{\\\\mathbf{e}} = 0$, and the stability condition is $\\\\mathbf { K } _ { p } > 0$, $\\\\mathbf { K } _ { d } > 0$.** The selection matrix is the reason robotics is designed for the selection, not the rejection, and the selection is the reason robot servo systems are a practical engineering tool, not a theoretical abstraction.
- **The controller design calculation is the most important servo calculation in robotics, because the controller design calculation determines the stability, tracking accuracy and force regulation.** The stability, tracking accuracy and force regulation are the reason the engineer can achieve precise positioning, regulate contact forces and handle environmental constraints.
- **Robot control is the foundation of robot servo systems, because the PID controller stabilizes joint positions, the computed-torque controller linearizes the dynamics, the impedance controller regulates contact forces, and the hybrid position/force controller manages constrained motion.** The robotics is the reason the engineer can achieve precise positioning, regulate contact forces and handle environmental constraints.
:::

## Further reading

- **J. J. Craig (2005)** — *Introduction to Robotics: Mechanics and Control*, 3rd ed. Pearson. The PD plus gravity and the computed-torque control.
- **K. M. Lynch and F. C. Park (2017)** — *Modern Robotics: Mechanics, Planning, and Control*. Cambridge. The robot control and the Lyapunov stability.
- **B. Siciliano and O. Khatib (2016)** — *Springer Handbook of Robotics*. Springer. The robot control and the impedance control.
- **N. Hogan (1985)** — "Impedance Control: An Approach to Manipulation." *ASME Journal of Dynamic Systems*, 107, 1. The impedance control.
- **O. Khatib (1987)** — "A Unified Approach for Motion and Force Control of Robot Manipulators." *IEEE Journal of Robotics and Automation*, 3, 43. The operational space control.
- **M. W. Spong, S. Hutchinson and M. Vidyasagar (2006)** — *Robot Modeling and Control*. Wiley. The robot control and the stability.
- **R. Paul (1981)** — *Robot Manipulators: Mathematics, Programming and Control*. MIT Press. The computed-torque control.
- **J. Y. S. Luh, M. W. Walker and R. P. C. Paul (1980)** — "On-Line Computational Scheme for Mechanical Manipulators." *ASME Journal of Dynamic Systems*, 102, 69. The computed-torque method.
