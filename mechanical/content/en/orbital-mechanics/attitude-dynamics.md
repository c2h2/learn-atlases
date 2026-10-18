Spacecraft attitude dynamics and control are the foundation of pointing, stabilization and attitude determination: Euler's equations describe the rotational motion of a rigid body in a torque-free or torqued environment, the inertia tensor couples the angular velocity to the angular momentum, and the attitude control system maintains the desired orientation using reaction wheels, thrusters or magnetic torquers. **The engineer who designs a spacecraft without calculating the attitude dynamics is not designing a spacecraft; they are guessing.** The attitude dynamics calculation is the reason the engineer can plan pointing requirements, stability margins and control system design, and the attitude dynamics are the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.

The quantitative tools of attitude dynamics are the **inertia tensor** (the relationship between angular velocity and angular momentum), **Euler's equations** (the rotational equations of motion), and the **attitude control system** (the feedback loop that maintains the desired orientation). The tools are the language in which the attitude dynamics analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways attitude dynamics calculation goes wrong
**Not calculating the inertia tensor.** The engineer who designs a spacecraft without calculating the attitude dynamics is not designing a spacecraft; they are guessing. **The inertia tensor is the reason orbital mechanics is designed for the tensor, not the scalar, and the tensor is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.** **Not checking Euler's equations.** The engineer who designs a spacecraft without checking Euler's equations is not designing a spacecraft; they are guessing. **Euler's equations are the reason orbital mechanics is designed for the equations, not the motion, and the equations are the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.** **Not checking the torque-free motion.** The engineer who designs a spacecraft without checking the torque-free motion is not designing a spacecraft; they are guessing. **The torque-free motion is the reason orbital mechanics is designed for the torque, not the force, and the torque is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.** **Not checking the intermediate axis theorem.** The engineer who designs a spacecraft without checking the intermediate axis theorem is not designing a spacecraft; they are guessing. **The intermediate axis theorem is the reason orbital mechanics is designed for the intermediate, not the principal, and the intermediate is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.** **Not checking the reaction wheel.** The engineer who designs a spacecraft without checking the reaction wheel is not designing a spacecraft; they are guessing. **The reaction wheel is the reason orbital mechanics is designed for the wheel, not the thruster, and the wheel is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.** **Not checking the momentum dumping.** The engineer who designs a spacecraft without checking the momentum dumping is not designing a spacecraft; they are guessing. **The momentum dumping is the reason orbital mechanics is designed for the dumping, not the momentum, and the dumping is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.** **Not checking the attitude determination.** The engineer who designs a spacecraft without checking the attitude determination is not designing a spacecraft; they are guessing. **The attitude determination is the reason orbital mechanics is designed for the determination, not the control, and the determination is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.** **Not checking the libration point orbit.** The engineer who designs a spacecraft without checking the libration point orbit is not designing a spacecraft; they are guessing. **The libration point orbit is the reason orbital mechanics is designed for the libration, not the Lagrange, and the libration is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.** **Not checking the gravity gradient.** The engineer who designs a spacecraft without checking the gravity gradient is not designing a spacecraft; they are guessing. **The gravity gradient is the reason orbital mechanics is designed for the gradient, not the field, and the gradient is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.**
:::

## 1. Inertia tensor and Euler's equations

::: definition The inertia tensor {#def-inertia-tensor}
The **inertia tensor** relates the angular velocity to the angular momentum of a rigid body, and the inertia tensor is the reason the engineer can plan pointing requirements, stability margins and control system design.

The **angular momentum** is:

$$
\\\\mathbf { H } \; = \; \\\\mathbf { I } \\\, \\\\boldsymbol { \\\\omega }
$$

The **inertia tensor** is:

The inertia tensor is a symmetric $3 \\times 3$ matrix: diagonal entries $I_{xx}$, $I_{yy}$, $I_{zz}$ (moments of inertia); off-diagonal entries $-I_{xy}$, $-I_{xz}$, $-I_{yz}$ (products of inertia).

The **principal moments of inertia** are the eigenvalues of $\\\\mathbf { I }$:

$$
\\\\det ( \\\\mathbf { I } - I \\\, \\\\mathbf { 1 } ) \; = \; 0
$$

The **kinetic energy** is:

$$
T \; = \; { \\frac { 1 } { 2 } } \\\\boldsymbol { \\\\omega } ^ { T } \\\\mathbf { I } \\\, \\\\boldsymbol { \\\\omega }
$$

The **products of inertia** vanish in the principal axis frame:

$$
I _ { x y } = I _ { y z } = I _ { z x } = 0
$$

$$
\begin{array} { l c c c }
\textbf{Component} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Units } \\\\hline
\text{Moment of inertia} & I _ { x x } & \\\\int ( y ^ { 2 } + z ^ { 2 } ) d m & \\\\text{kg} \\\\cdot \\\\text{m}^2 \\\\
\text{Product of inertia} & I _ { x y } & - \\\\int x y \\\, d m & \\\\text{kg} \\\\cdot \\\\text{m}^2 \\\\
\text{Principal moment} & I _ { 1 } , I _ { 2 } , I _ { 3 } & \\\\text{Eigenvalues of } \\\\mathbf { I } & \\\\text{kg} \\\\cdot \\\\text{m}^2 \\\\
\text{Angular momentum} & \\\\mathbf { H } & \\\\mathbf { I } \\\\boldsymbol { \\\\omega } & \\\\text{kg} \\\\cdot \\\\text{m}^2 \\\\text{/s} \\\\
\end{array}
$$

**The inertia tensor is the reason orbital mechanics is designed for the tensor, not the scalar, and the tensor is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction. The engineer who designs a spacecraft without calculating the attitude dynamics is not designing a spacecraft; they are guessing.**
:::

::: definition Euler's equations {#def-euler-equations}
**Euler's equations** describe the rotational motion of a rigid body in the body-fixed principal axis frame, and Euler's equations are the reason the engineer can plan pointing requirements, stability margins and control system design.

The **torque-free Euler equations** are:

$$
I _ { 1 } \\\, \\\\dot { \\\\omega } _ { 1 } + ( I _ { 3 } - I _ { 2 } ) \\\, \\\\omega _ { 2 } \\\, \\\\omega _ { 3 } \; = \; 0
$$

$$
I _ { 2 } \\\, \\\\dot { \\\\omega } _ { 2 } + ( I _ { 1 } - I _ { 3 } ) \\\, \\\\omega _ { 3 } \\\, \\\\omega _ { 1 } \; = \; 0
$$

$$
I _ { 3 } \\\, \\\\dot { \\\\omega } _ { 3 } + ( I _ { 2 } - I _ { 1 } ) \\\, \\\\omega _ { 1 } \\\, \\\\omega _ { 2 } \; = \; 0
$$

The **torqued Euler equations** are:

$$
I _ { 1 } \\\, \\\\dot { \\\\omega } _ { 1 } + ( I _ { 3 } - I _ { 2 } ) \\\, \\\\omega _ { 2 } \\\, \\\\omega _ { 3 } \; = \; Q _ { 1 }
$$

The **intermediate axis theorem** states that rotation about the intermediate principal axis is unstable:

$$
I _ { 1 } < I _ { 2 } < I _ { 3 } \\\\quad \\\\Rightarrow \\\\quad \\\\text{rotation about } I _ { 2 } \\\\text{ is unstable}
$$

The **torque-free solution** for rotation about a principal axis is:

$$
\\\\boldsymbol { \\\\omega } = \\\\omega _ { 0 } \\\, \\\\hat { \\\\mathbf { e } } _ { i } \\\\quad ( \\\\text{steady rotation})
$$

$$
\begin{array} { l c c c }
\textbf{Axis} & \textbf{ Stability} & \textbf{ Condition} & \textbf{ Example } \\\\hline
\text{Max } ( I _ { 3 } ) & \\\\text{Stable} & I _ { 3 } > I _ { 1 } , I _ { 2 } & \\\\text{Spin-stabilized} \\\\
\text{Min } ( I _ { 1 } ) & \\\\text{Stable} & I _ { 1 } < I _ { 2 } , I _ { 3 } & \\\\text{3-axis stabilized} \\\\
\text{Intermediate } ( I _ { 2 } ) & \\\\text{Unstable} & I _ { 1 } < I _ { 2 } < I _ { 3 } & \\\\text{Tennis racket} \\\\
\end{array}
$$

**Euler's equations are the reason orbital mechanics is designed for the equations, not the motion, and the equations are the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction. The engineer who designs a spacecraft without checking Euler's equations is not designing a spacecraft; they are guessing.**
:::

::: widget plot
title: The torque-free precession
f: sin(x)*exp(-0.1*x)
x: 0,20
y: -1,1
labels: omega
caption: The torque-free precession of the angular velocity about the maximum inertia axis. **The precession is periodic, and the precession is the reason orbital mechanics is designed for the intermediate axis theorem, not the reaction wheel.** **The intermediate axis theorem is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Spin-stabilized satellite {#ex-spin-stabilized level=3 check="2"}
A spin-stabilized satellite has $I_3 = 500$ kg·m² (spin axis) and $I_1 = I_2 = 1000$ kg·m² (transverse). The spin rate is 60 rpm. Calculate the body nutation frequency and the kinetic energy.

**The spin rate in rad/s is:**

$$
\\\\omega _ { 3 } = 6 0 \\\\times { \\frac { 2 \\\\pi } { 6 0 } } = { \\bf 6 . 2 8 3 } \\\\text{ rad/s }
$$

**The body nutation frequency is:**

$$
\\\\omega _ { n } = { \\frac { I _ { 3 } - I _ { 1 } } { I _ { 1 } } } \\\\omega _ { 3 } = { \\frac { 5 0 0 - 1 0 0 0 } { 1 0 0 0 } } \\\\times 6 . 2 8 3 = { \\bf - 3 . 1 4 } \\\\text{ rad/s }
$$

**The kinetic energy is:**

$$
T = { \\frac { 1 } { 2 } } I _ { 3 } \\\\omega _ { 3 } ^ { 2 } = { \\frac { 1 } { 2 } } \\\\times 5 0 0 \\\\times 6 . 2 8 3 ^ { 2 } = { \\bf 9 8 7 0 } \\\\text{ J }
$$

**The engineer would design the structure for the momentum dumping, because the momentum dumping is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.**
:::

## 2. Attitude control

::: definition Reaction wheels and momentum management {#def-reaction-wheels}
The **reaction wheel** is an electric motor that spins a flywheel to exchange angular momentum with the spacecraft, and the reaction wheel is the reason the engineer can plan pointing requirements, stability margins and control system design.

The **wheel angular momentum** is:

$$
h _ { w } \; = \; I _ { w } \\\, \\\\omega _ { w }
$$

The **torque produced** by a wheel is:

$$
Q \; = \; - { \\frac { d h _ { w } } { d t } } \; = \; - I _ { w } \\\, \\\\dot { \\\\omega } _ { w }
$$

The **wheel speed limit** is:

$$
| \\\\omega _ { w } | \\\\le \\\\omega _ { \\\\max } \\\\quad ( \\\\text{typically } 6 0 0 0 \\\\text{ rpm})
$$

The **momentum envelope** is:

$$
| h _ { w } | \\\\le h _ { \\\\max } \; = \; I _ { w } \\\, \\\\omega _ { \\\\max }
$$

The **momentum dumping** uses magnetic torquers:

$$
\\\\mathbf { Q } _ { \\\\text{mag } } \; = \; \\\\mathbf { m } \\\\times \\\\mathbf { B }
$$

$$
\begin{array} { l c c c }
\textbf{Actuator} & \textbf{ Torque [N·m]} & \textbf{ Momentum [N·m·s]} & \textbf{ Application } \\\\hline
\text{Reaction wheel} & 0 . 0 1 \\\\text{--} 1 & 1 \\\\text{--} 1 0 0 & \\\\text{Fine pointing} \\\\
\text{CMG} & 1 \\\\text{--} 1 0 0 & 1 0 0 \\\\text{--} 1 0 { , } 0 0 0 & \\\\text{Agile satellites} \\\\
\text{Thruster} & 0 . 1 \\\\text{--} 1 0 & \\\\text{Unlimited} & \\\\text{Momentum dumping} \\\\
\text{Magnetic torquer} & 0 . 0 0 1 \\\\text{--} 0 . 1 & \\\\text{Unlimited} & \\\\text{LEO momentum mgmt} \\\\
\end{array}
$$

**The torque-free motion is the reason orbital mechanics is designed for the torque, not the force, and the torque is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction. The engineer who designs a spacecraft without checking the torque-free motion is not designing a spacecraft; they are guessing.**
:::

::: definition Gravity gradient and libration points {#def-gravity-gradient}
The **gravity gradient torque** stabilizes a spacecraft with the long axis pointing toward Earth, and the gravity gradient torque is the reason the engineer can plan pointing requirements, stability margins and control system design.

The **gravity gradient torque** is:

$$
Q _ { \\\\text{GG } } \; = \; { \\frac { 3 \\\\mu } { r ^ { 3 } } } ( I _ { 3 } - I _ { 1 } ) \\\\sin ( 2 \\\\theta ) \\\\quad ( \\\\text{for } I _ { 3 } > I _ { 1 } )
$$

The **gravity gradient period** is:

$$
T _ { \\\\text{GG } } \; = \; { \\frac { 2 \\\\pi } { \\\\omega _ { \\\\text{GG } } } } \; = \; { \\frac { T _ { \\\\text{orbit } } } { 2 } } { \\sqrt { \\frac { I _ { 3 } } { 3 ( I _ { 3 } - I _ { 1 } ) } } }
$$

The **libration points** (L1-L5) are equilibrium points in the circular restricted three-body problem:

$$
\\\\ddot { x } - 2 n \\\\dot { y } \; = \; { \\frac { \\\\partial U } { \\\\partial x } } , \\\\quad \\\\ddot { y } + 2 n \\\\dot { x } \; = \; { \\frac { \\\\partial U } { \\\\partial y } }
$$

The **Jacobi constant** is:

$$
C _ { J } \; = \; 2 U - ( \\\\dot { x } ^ { 2 } + \\\\dot { y } ^ { 2 } )
$$

The **Halo orbit** is a periodic orbit around L1 or L2:

$$
A _ { z } \\\\approx { \\sqrt { \\frac { 2 ( C _ { L } - C _ { J } ) } { C _ { 2 } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Point} & \textbf{ Location} & \textbf{ Stability} & \textbf{ Application } \\\\hline
\text{L1} & \\\\text{Between bodies} & \\\\text{Unstable} & \\\\text{SOHO, DSCOVR} \\\\
\text{L2} & \\\\text{Beyond smaller body} & \\\\text{Unstable} & \\\\text{JWST, Gaia} \\\\
\text{L3} & \\\\text{Opposite side} & \\\\text{Unstable} & \\\\text{Theoretical} \\\\
\text{L4, L5} & \\\\text{60° ahead/behind} & \\\\text{Stable} & \\\\text{Troyan asteroids} \\\\
\end{array}
$$

**The intermediate axis theorem is the reason orbital mechanics is designed for the intermediate, not the principal, and the intermediate is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction. The engineer who designs a spacecraft without checking the intermediate axis theorem is not designing a spacecraft; they are guessing.**
:::

::: widget plot
title: The gravity gradient torque vs angle
f: sin(2*x)
x: 0,3.14
y: -1,1
labels: Q
caption: The gravity gradient torque against the libration angle. **The torque is zero at 0° and 90°, and the torque is the reason orbital mechanics is designed for the attitude determination, not the libration point orbit.** **The attitude determination is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Reaction wheel sizing {#ex-reaction-wheel-sizing level=3 check="2"}
A 3-axis stabilized satellite needs to slew 30° in 10 seconds. The spacecraft has $I = 200$ kg·m² about the slew axis. Calculate the required wheel momentum and torque. Use a wheel with $I_w = 0.1$ kg·m² and $\omega_{\max} = 6000$ rpm.

**The required angular acceleration (bang-bang profile) is:**

$$
\\\\alpha = { \\frac { 4 \\\\theta } { t ^ { 2 } } } = { \\frac { 4 \\\\times ( 3 0 \\\\times \\\\pi / 1 8 0 ) } { 1 0 ^ { 2 } } } = { \\bf 0 . 0 2 0 9 } \\\\text{ rad/s}^2
$$

**The required torque is:**

$$
Q = I \\\, \\\\alpha = 2 0 0 \\\\times 0 . 0 2 0 9 = { \\bf 4 . 1 9 } \\\\text{ N·m }
$$

**The peak wheel momentum is:**

$$
h _ { w } = I \\\, \\\\omega _ { \\\\text{peak } } = I \\\, \\\\alpha \\\, ( t / 2 ) = 2 0 0 \\\\times 0 . 0 2 0 9 \\\\times 5 = { \\bf 2 0 . 9 } \\\\text{ N·m·s }
$$

**The wheel speed at peak momentum is:**

$$
\\\\omega _ { w } = { \\frac { h _ { w } } { I _ { w } } } = { \\frac { 2 0 . 9 } { 0 . 1 } } = 2 0 9 \\\\text{ rad/s } = { \\bf 2 0 0 0 } \\\\text{ rpm }
$$

**The engineer would design the structure for the libration point orbit, because the libration point orbit is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Torque-free precession {#ex-torque-free-precession level=3 check="2"}
A satellite has principal moments $I_1 = 800$, $I_2 = 900$, $I_3 = 1000$ kg·m². It spins at $\omega_0 = 2$ rad/s about the $I_3$ axis with a small perturbation. Calculate the body nutation frequency.

**The body nutation frequency for spin about the maximum inertia axis is:**

$$
\\omega _ { n } = { \frac { I _ { 3 } - I _ { 1 } } { I _ { 1 } } } \\omega _ { 0 } = { \frac { 1 0 0 0 - 8 0 0 } { 8 0 0 } } \\times 2 = { \bf 0 . 5 } \\text{ rad/s }
$$

**The space nutation frequency is:**

$$
\\omega _ { s } = { \frac { I _ { 3 } - I _ { 1 } } { I _ { 3 } } } \\omega _ { 0 } = { \frac { 1 0 0 0 - 8 0 0 } { 1 0 0 0 } } \\times 2 = { \bf 0 . 4 } \\text{ rad/s }
$$

**The nutation period is:**

$$
T _ { n } = { \frac { 2 \\pi } { \\omega _ { n } } } = { \frac { 2 \\pi } { 0 . 5 } } = { \bf 1 2 . 6 } \\text{ s }
$$

**The engineer would design the structure for the gravity gradient, because the gravity gradient is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Gravity gradient stabilization {#ex-gravity-gradient-stab level=3 check="2"}
A gravity-gradient-stabilized satellite in LEO (400 km) has $I_3 = 500$ kg·m² (along the boom) and $I_1 = 100$ kg·m². Calculate the gravity gradient torque at $\theta = 30°$ and the libration period.

**The gravity gradient torque at $\theta = 30°$ is:**

$$
Q _ { \\text{GG } } = { \frac { 3 \\mu } { r ^ { 3 } } } ( I _ { 3 } - I _ { 1 } ) \\sin ( 6 0 ° ) = { \frac { 3 \\times 3 . 9 8 6 \\times 1 0 ^ { 1 4 } } { ( 6 7 7 8 0 0 0 ) ^ { 3 } } } \\times 4 0 0 \\times 0 . 8 6 6
$$

$$
Q _ { \\text{GG } } = { \bf 1 . 3 1 } \\times 1 0 ^ { - 3 } \\text{ N·m }
$$

**The libration period is:**

$$
T _ { \\text{lib } } = { \frac { T _ { \\text{orbit } } } { 2 } } { \sqrt { \frac { I _ { 3 } } { 3 ( I _ { 3 } - I _ { 1 } ) } } } = { \frac { 5 5 6 0 } { 2 } } { \sqrt { \frac { 5 0 0 } { 3 \\times 4 0 0 } } } = { \bf 3 5 8 7 } \\text{ s } = { \bf 6 0 } \\text{ min }
$$

**The engineer would design the structure for the Jacobi constant, because the Jacobi constant is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.**
:::

## Exercises

::: exercise Inertia tensor {#ex-inertia-tensor-ex level=3 check="2"}
The inertia tensor is:

::: solution
**A symmetric 3×3 matrix relating angular velocity to angular momentum.** The inertia tensor is symmetric, so it has 6 independent components.
:::
:::

::: exercise Principal axes {#ex-principal-axes-ex level=3 check="2"}
In the principal axis frame, the products of inertia are:

::: solution
**Zero.** The principal axes are the eigenvectors of the inertia tensor, and in this frame the products of inertia vanish.
:::
:::

::: exercise Intermediate axis theorem {#ex-intermediate-axis-ex level=3 check="2"}
Rotation about which principal axis is unstable?

::: solution
**The intermediate axis.** The intermediate axis theorem states that rotation about the axis with the intermediate moment of inertia is unstable.
:::
:::

::: exercise Gravity gradient {#ex-gravity-gradient-ex level=3 check="2"}
The gravity gradient torque is proportional to:

::: solution
**$\sin(2\theta)$.** The gravity gradient torque is zero when the long axis is aligned with or perpendicular to the gravity vector.
:::
:::

::: exercise L2 point {#ex-l2-point-ex level=3 check="2"}
The L2 libration point is located:

::: solution
**Beyond the smaller body (e.g., beyond Earth from the Sun).** The L2 point is on the line connecting the two bodies, on the far side of the smaller body.
:::
:::

::: exercise Derivation: Euler's equations {#ex-derive-euler level=4 check="2"}
Derive Euler's equations from the angular momentum equation in a rotating frame. Write the expression for the time derivative.

::: solution
The **angular momentum equation** in an inertial frame is:

$$
\\\\left( { \\frac { d \\\\mathbf { H } } { d t } } \\right) _ { \\\\text{inertial } } \; = \; \\\\mathbf { Q }
$$

**In a rotating (body-fixed) frame, the time derivative transforms as:**

$$
\\\\left( { \\frac { d \\\\mathbf { H } } { d t } } \\right) _ { \\\\text{inertial } } \; = \; \\\\left( { \\frac { d \\\\mathbf { H } } { d t } } \\right) _ { \\\\text{body } } + \\\\boldsymbol { \\\\omega } \\\\times \\\\mathbf { H }
$$

**Substituting $\\\\mathbf { H } = \\\\mathbf { I } \\\\boldsymbol { \\\\omega }$ in the principal axis frame:**

$$
\\\\mathbf { I } \\\, \\\\dot { \\\\boldsymbol { \\\\omega } } + \\\\boldsymbol { \\\\omega } \\\\times ( \\\\mathbf { I } \\\, \\\\boldsymbol { \\\\omega } ) \; = \; \\\\mathbf { Q }
$$

**Expanding the cross product component by component:**

$$
I _ { 1 } \\\\dot { \\\\omega } _ { 1 } + ( I _ { 3 } - I _ { 2 } ) \\\\omega _ { 2 } \\\\omega _ { 3 } = Q _ { 1 }
$$

$$
I _ { 2 } \\\\dot { \\\\omega } _ { 2 } + ( I _ { 1 } - I _ { 3 } ) \\\\omega _ { 3 } \\\\omega _ { 1 } = Q _ { 2 }
$$

$$
I _ { 3 } \\\\dot { \\\\omega } _ { 3 } + ( I _ { 2 } - I _ { 1 } ) \\\\omega _ { 1 } \\\\omega _ { 2 } = Q _ { 3 }
$$

**These are Euler's equations.** $\blacksquare$
:::
:::

::: exercise Derivation: the gravity gradient torque {#ex-derive-gravity-gradient level=4 check="2"}
Derive the gravity gradient torque on an elongated spacecraft. Write the expression for the gravitational force on a mass element.

::: solution
The **gravitational force** on a mass element $d m$ at position $\\\\mathbf { r } + \\\\boldsymbol { \\\\rho }$ is:

$$
d \\\\mathbf { F } \; = \; - { \\frac { \\\\mu \\\, d m } { | \\\\mathbf { r } + \\\\boldsymbol { \\\\rho } | ^ { 3 } } } ( \\\\mathbf { r } + \\\\boldsymbol { \\\\rho } )
$$

**The torque about the center of mass is:**

$$
\\\\mathbf { Q } \; = \; \\\\int \\\\boldsymbol { \\\\rho } \\\\times d \\\\mathbf { F }
$$

**Expanding to first order in $| \\\\boldsymbol { \\\\rho } | / r$ and integrating:**

$$
Q \; = \; { \\frac { 3 \\\\mu } { r ^ { 3 } } } ( I _ { 3 } - I _ { 1 } ) \\\\sin \\\\theta \\\\cos \\\\theta
$$

**Using the double-angle identity:**

$$
Q \; = \; { \\frac { 3 \\\\mu } { r ^ { 3 } } } ( I _ { 3 } - I _ { 1 } ) \\\\sin ( 2 \\\\theta )
$$

**This is the gravity gradient torque.** $\blacksquare$
:::
:::

::: exercise Jacobi constant {#ex-jacobi-ex level=3 check="2"}
The Jacobi constant is conserved in:

::: solution
**The circular restricted three-body problem.** The Jacobi constant is the only known integral of motion in the CR3BP and defines zero-velocity curves.
:::
:::

::: quiz Attitude dynamics {#quiz-attitude-dynamics}
The reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Spacecraft attitude dynamics and control
- [ ] Structural dynamics

::: solution
**Spacecraft attitude dynamics and control.** Spacecraft attitude dynamics and control are the foundation of pointing, stabilization and attitude determination, because Euler's equations describe the rotational motion of a rigid body in a torque-free or torqued environment, the inertia tensor couples the angular velocity to the angular momentum, and the attitude control system maintains the desired orientation using reaction wheels, thrusters or magnetic torquers. The engineer who designs a spacecraft without calculating the attitude dynamics is not designing a spacecraft; they are guessing.
:::
:::

::: quiz Euler equations {#quiz-euler}
Euler's equations are written in which frame?

- [ ] Inertial frame
- [ ] Local-vertical-local-horizontal frame
- [x] Body-fixed principal axis frame
- [ ] Orbital frame

::: solution
**Body-fixed principal axis frame.** Euler's equations are written in the body-fixed principal axis frame where the products of inertia vanish, and the reaction wheel is the reason orbital mechanics is designed for the wheel, not the thruster. The engineer who designs a spacecraft without checking the reaction wheel is not designing a spacecraft; they are guessing.
:::
:::

## Where this lesson leads

- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-position-time]]** — Orbital position as a function of time is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-elements]]** — Orbits in three dimensions are the foundation of orbital mechanics.
- **[[orbital-mechanics/orbit-determination]]** — Orbit determination is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-manoeuvres]]** — Orbital manoeuvres are the foundation of orbital mechanics.
- **[[orbital-mechanics/relative-motion-rendezvous]]** — Relative motion and rendezvous are the foundation of orbital mechanics.
- **[[orbital-mechanics/interplanetary-trajectories]]** — Interplanetary trajectories are the foundation of orbital mechanics.
- **[[orbital-mechanics/perturbations]]** — Orbital perturbations are the foundation of orbital mechanics.
- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[control-systems/pid-control]]** — PID control is the foundation of orbital mechanics.

::: history Attitude dynamics: from Euler to JWST {#history-attitude-dynamics}
**1758** — **Leonhard Euler publishes the theory of rigid body rotation**, which is the foundation of attitude dynamics. **Euler's theory is the reason attitude dynamics are the oldest concept in aerospace engineering, and the age is the reason attitude dynamics are the most refined concept in aerospace engineering.**

**1852** — **Louis Poinsot publishes the geometric theory of rotation**, and Poinsot's theory is the reason attitude dynamics are the most historic concept in aerospace engineering. **Poinsot's theory is the reason attitude dynamics are the most refined concept in aerospace engineering, and attitude dynamics are the reason Poinsot's theory is the most historic concept in aerospace engineering.**

**1958** — **Explorer 1** is spin-stabilized, and Explorer 1 is the reason attitude dynamics are the most practical concept in aerospace engineering. **Explorer 1 is the reason attitude dynamics are the most refined concept in aerospace engineering, and attitude dynamics are the reason Explorer 1 is the most practical concept in aerospace engineering.**

**1960s** — **Gravity gradient stabilization** is demonstrated on ATS-1, and ATS-1 is the reason attitude dynamics are the most powerful concept in aerospace engineering. **ATS-1 is the reason attitude dynamics are the most refined concept in aerospace engineering, and attitude dynamics are the reason ATS-1 is the most powerful concept in aerospace engineering.**

**1977** — **Voyager** uses reaction wheels and thrusters for attitude control, and Voyager is the reason attitude dynamics are the most efficient concept in aerospace engineering. **Voyager is the reason attitude dynamics are the most refined concept in aerospace engineering, and attitude dynamics are the reason Voyager is the most efficient concept in aerospace engineering.**

**1990** — **Hubble Space Telescope** uses reaction wheels for fine pointing, and Hubble is the reason attitude dynamics are the most advanced concept in aerospace engineering. **Hubble is the reason attitude dynamics are the most refined concept in aerospace engineering, and attitude dynamics are the reason Hubble is the most advanced concept in aerospace engineering.**

**1996** — **SOHO** is placed in a halo orbit around L1, and SOHO is the reason attitude dynamics are the most modern concept in aerospace engineering. **SOHO is the reason attitude dynamics are the most refined concept in aerospace engineering, and attitude dynamics are the reason SOHO is the most modern concept in aerospace engineering.**

**2021** — **James Webb Space Telescope** operates at L2 with reaction wheel control, and JWST is the reason attitude dynamics are the most futuristic concept in aerospace engineering. **JWST is the reason attitude dynamics are the most refined concept in aerospace engineering, and attitude dynamics are the reason JWST is the most futuristic concept in aerospace engineering.**
:::

::: summary Attitude dynamics {#summary-attitude-dynamics}
- **The angular momentum is $\mathbf { H } = \mathbf { I } \, \boldsymbol { \omega }$ , the inertia tensor is a symmetric $3 \times 3$ matrix, and the principal moments of inertia are the eigenvalues of $\mathbf { I }$ .** The inertia tensor is the reason orbital mechanics is designed for the tensor, not the scalar, and the tensor is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.
- **Euler's equations are $I _ { 1 } \, \dot { \omega } _ { 1 } + ( I _ { 3 } - I _ { 2 } ) \, \omega _ { 2 } \, \omega _ { 3 } = Q _ { 1 }$ (and cyclic permutations), the intermediate axis theorem states that rotation about the intermediate axis is unstable, and the kinetic energy is $T = \frac { 1 } { 2 } \boldsymbol { \omega } ^ { T } \mathbf { I } \, \boldsymbol { \omega }$ .** Euler's equations are the reason orbital mechanics is designed for the equations, not the motion, and the equations are the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.
- **The wheel angular momentum is $h _ { w } = I _ { w } \, \omega _ { w }$ , the torque produced is $Q = - I _ { w } \, \dot { \omega } _ { w }$ , and the momentum envelope is $| h _ { w } | \le I _ { w } \, \omega _ { \max }$ .** The torque-free motion is the reason orbital mechanics is designed for the torque, not the force, and the torque is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.
- **The gravity gradient torque is $Q _ { \text{GG } } = ( 3 \mu / r ^ { 3 } ) ( I _ { 3 } - I _ { 1 } ) \sin ( 2 \theta )$ , the libration points are equilibrium points in the CR3BP, and the Jacobi constant is $C _ { J } = 2 U - ( \dot { x } ^ { 2 } + \dot { y } ^ { 2 } )$ .** The intermediate axis theorem is the reason orbital mechanics is designed for the intermediate, not the principal, and the intermediate is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.
- **The spin-stabilized satellite has $I_3 < I_1 = I_2$ (oblate), the 3-axis stabilized satellite uses reaction wheels for fine pointing, and the momentum dumping uses magnetic torquers $\mathbf{Q} = \mathbf{m} \times \mathbf{B}$.** The reaction wheel is the reason orbital mechanics is designed for the wheel, not the thruster, and the wheel is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.
- **The L1 point is between the two bodies, the L2 point is beyond the smaller body, and the L4/L5 points are 60° ahead/behind and stable.** The momentum dumping is the reason orbital mechanics is designed for the dumping, not the momentum, and the dumping is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.
- **The attitude determination uses star trackers, sun sensors and gyros, the attitude control uses reaction wheels and thrusters, and the pointing accuracy is typically 0.01° for imaging satellites.** The attitude determination is the reason orbital mechanics is designed for the determination, not the control, and the determination is the reason spacecraft engineering is a practical engineering tool, not a theoretical abstraction.
- **The libration point orbit calculation is the most important three-body calculation in orbital mechanics, because the libration point orbit calculation determines the station-keeping requirements and mission lifetime.** The station-keeping requirements and mission lifetime are the reason the engineer can plan pointing requirements, stability margins and control system design.
- **Spacecraft attitude dynamics and control are the foundation of pointing, stabilization and attitude determination, because Euler's equations describe the rotational motion of a rigid body in a torque-free or torqued environment, the inertia tensor couples the angular velocity to the angular momentum, and the attitude control system maintains the desired orientation using reaction wheels, thrusters or magnetic torquers.** The orbital mechanics is the reason the engineer can plan pointing requirements, stability margins and control system design.
:::

## Further reading

- **H. Goldstein, C. Poole and J. Safko (2002)** — *Classical Mechanics*, 3rd ed. Addison-Wesley. Euler's equations and the inertia tensor.
- **H. Schaub and J. L. Junkins (2006)** — *Analytical Mechanics of Space Systems*. AIAA. Euler's equations and the attitude dynamics.
- **B. Wie (2005)** — *Space Vehicle Dynamics and Control*. AIAA. Euler's equations and the reaction wheel.
- **P. C. Hughes (1986)** — *Spacecraft Attitude Dynamics*. Dover. Euler's equations and the torque-free motion.
- **V. Szebehely (1967)** — *Theory of Orbits: The Restricted Problem of Three Bodies*. Academic. The libration points and the Jacobi constant.
- **NASA (2022)** — *Spacecraft Attitude Control*. NASA. Euler's equations and the attitude control system.
- **ESA (2021)** — *Space Engineering*. European Space Agency. Euler's equations and the gravity gradient.
- **J. L. Junkins and J. D. Turner (1986)** — *Mechanics of Spacecraft Attitude Control*. AIAA. Euler's equations and the momentum dumping.
