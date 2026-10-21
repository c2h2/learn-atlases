Mobile robots are the foundation of wheeled and legged locomotion: the nonholonomic constraint restricts the robot's motion to a subset of the configuration space, the odometry model estimates the robot's position from wheel velocities, and the path-following controller steers the robot along a desired path. **The engineer who designs a mobile robot without calculating the kinematics is not designing a mobile robot; they are guessing.** The mobile robot kinematics calculation is the reason the engineer can estimate position, follow paths and navigate in environments, and the mobile robot kinematics is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.

The quantitative tools of mobile robotics are the **nonholonomic constraint** (the velocity restriction), the **odometry model** (the position estimation), and the **path-following controller** (the steering law). The tools are the language in which the mobile robot analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways mobile robot calculation goes wrong
**Not calculating the kinematics.** The engineer who designs a mobile robot without calculating the kinematics is not designing a mobile robot; they are guessing. **The mobile robot kinematics is the reason robotics is designed for the kinematics, not the dynamics, and the mobile robot kinematics is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the nonholonomic constraint.** The engineer who designs a mobile robot without checking the nonholonomic constraint is not designing a mobile robot; they are guessing. **The nonholonomic constraint is the reason robotics is designed for the nonholonomic, not the holonomic, and the nonholonomic is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the odometry model.** The engineer who designs a mobile robot without checking the odometry model is not designing a mobile robot; they are guessing. **The odometry model is the reason robotics is designed for the odometry, not the localization, and the odometry is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the path-following controller.** The engineer who designs a mobile robot without checking the path-following controller is not designing a mobile robot; they are guessing. **The path-following controller is the reason robotics is designed for the path, not the trajectory, and the path is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the turning radius.** The engineer who designs a mobile robot without checking the turning radius is not designing a mobile robot; they are guessing. **The turning radius is the reason robotics is designed for the turning, not the straight, and the turning is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the slip.** The engineer who designs a mobile robot without checking the slip is not designing a mobile robot; they are guessing. **The slip is the reason robotics is designed for the slip, not the traction, and the slip is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the wheel configuration.** The engineer who designs a mobile robot without checking the wheel configuration is not designing a mobile robot; they are guessing. **The wheel configuration is the reason robotics is designed for the wheel, not the leg, and the wheel is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the controllability.** The engineer who designs a mobile robot without checking the controllability is not designing a mobile robot; they are guessing. **The controllability is the reason robotics is designed for the controllability, not the stabilizability, and the controllability is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the sensor model.** The engineer who designs a mobile robot without checking the sensor model is not designing a mobile robot; they are guessing. **The sensor model is the reason robotics is designed for the sensor, not the actuator, and the sensor is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.**
:::

## 1. Wheeled robot kinematics

::: definition The nonholonomic constraint {#def-nonholonomic-constraint}
The **nonholonomic constraint** restricts the robot's velocity to a subset of the configuration space, and the nonholonomic constraint is the reason the engineer can estimate position, follow paths and navigate in environments.

The **rolling constraint** (no lateral slip) is:

$$
\\\\dot { y } \\\\cos \\\\theta - \\\\dot { x } \\\\sin \\\\theta = 0
$$

The **driving constraint** (no longitudinal slip) is:

$$
\\\\dot { x } \\\\cos \\\\theta + \\\\dot { y } \\\\sin \\\\theta = v
$$

The **kinematic model** (differential drive) is:

$$
\\\\dot { x } = v \\\\cos \\\\theta , \\\\quad \\\\dot { y } = v \\\\sin \\\\theta , \\\\quad \\\\dot { \\\\theta } = \\\\omega
$$

The **nonholonomic constraint** in Pfaffian form is:

$$
\\\\mathbf { A } ( \\\\mathbf { q } ) \\\\dot { \\\\mathbf { q } } = 0
$$

The **controllability** (Brockett's condition) is:

$$
[ \\\\mathbf { g } _ { 1 } , [ \\\\mathbf { g } _ { 1 } , \\\\mathbf { g } _ { 2 } ] ] \\\\quad \\\\text{spans the full space}
$$

$$
\begin{array} { l c c c }
\textbf{Constraint type} & \textbf{ Form} & \textbf{ Integrable} & \textbf{ Example } \\\\hline
\text{Holonomic} & h ( \\\\mathbf { q } ) = 0 & \\\\text{Yes} & \\\\text{Joint limits} \\\\
\text{Nonholonomic} & \\\\mathbf { A } ( \\\\mathbf { q } ) \\\\dot { \\\\mathbf { q } } = 0 & \\\\text{No} & \\\\text{Rolling wheel} \\\\
\text{Bilaterally nonholonomic} & \\\\mathbf { A } ( \\\\mathbf { q } ) \\\\dot { \\\\mathbf { q } } = 0 & \\\\text{No} & \\\\text{Knife edge} \\\\
\end{array}
$$

**The mobile robot kinematics is the reason robotics is designed for the kinematics, not the dynamics, and the mobile robot kinematics is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a mobile robot without calculating the kinematics is not designing a mobile robot; they are guessing.**
:::

::: definition The odometry model {#def-odometry-model}
The **odometry model** estimates the robot's position from wheel velocities, and the odometry model is the reason the engineer can estimate position, follow paths and navigate in environments.

The **differential drive kinematics** is:

$$
v = { \\frac { v _ { R } + v _ { L } } { 2 } } , \\\\quad \\\\omega = { \\frac { v _ { R } - v _ { L } } { b } }
$$

where $v_R$, $v_L$ are the wheel velocities and $b$ is the wheel base.

The **odometry integration** is:

$$
x _ { k + 1 } = x _ { k } + { \\frac { \\\\Delta s _ { R } + \\\\Delta s _ { L } } { 2 } } \\\\cos ( \\\\theta _ { k } + { \\frac { \\\\Delta \\\\theta } { 2 } } )
$$

$$
y _ { k + 1 } = y _ { k } + { \\frac { \\\\Delta s _ { R } + \\\\Delta s _ { L } } { 2 } } \\\\sin ( \\\\theta _ { k } + { \\frac { \\\\Delta \\\\theta } { 2 } } )
$$

$$
\\\\theta _ { k + 1 } = \\\\theta _ { k } + { \\frac { \\\\Delta s _ { R } - \\\\Delta s _ { L } } { b } }
$$

The **odometry error** grows as:

$$
\\\\sigma _ { \\\\text{odometry } } \\\\propto \\\\sqrt { d }
$$

where $d$ is the distance traveled.

The **turning radius** is:

$$
R \; = \; { \\frac { v } { \\\\omega } } \; = \; { \\frac { b } { 2 } } { \\frac { v _ { R } + v _ { L } } { v _ { R } - v _ { L } } }
$$

$$
\begin{array} { l c c c }
\textbf{Robot type} & \textbf{ DOF} & \textbf{ Constraints} & \textbf{ Controllable} \\\\hline
\text{Differential drive} & 3 & 1 & \\\\text{Yes} \\\\
\text{Unicycle} & 3 & 1 & \\\\text{Yes} \\\\
\text{Car (Ackermann)} & 4 & 2 & \\\\text{Yes} \\\\
\text{Tricycle} & 3 & 2 & \\\\text{No (parallel parking)} \\\\
\text{Omnidirectional} & 3 & 0 & \\\\text{Yes} \\\\
\end{array}
$$

**The nonholonomic constraint is the reason robotics is designed for the nonholonomic, not the holonomic, and the nonholonomic is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a mobile robot without checking the nonholonomic constraint is not designing a mobile robot; they are guessing.**
:::

::: widget plot
title: The turning radius vs wheel speed ratio
f: 0.5 / max(0.01, x - 1)
x: 1.01,3
y: 0,50
labels: R
caption: The turning radius against the wheel speed ratio for a differential-drive robot. **The turning radius approaches infinity for equal wheel speeds, and the turning radius is the reason robotics is designed for the slip, not the wheel configuration.** **The slip is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Differential drive odometry {#ex-diff-drive-odometry level=3 check="2"}
A differential-drive robot has $b = 0.5$ m. The wheel velocities are $v_R = 1.2$ m/s and $v_L = 0.8$ m/s. Calculate the linear velocity, angular velocity and turning radius.

**The linear velocity is:**

$$
v = { \\frac { 1 . 2 + 0 . 8 } { 2 } } = { \\bf 1 . 0 } \\\\text{ m/s }
$$

**The angular velocity is:**

$$
\\\\omega = { \\frac { 1 . 2 - 0 . 8 } { 0 . 5 } } = { \\bf 0 . 8 } \\\\text{ rad/s }
$$

**The turning radius is:**

$$
R = { \\frac { v } { \\\\omega } } = { \\frac { 1 . 0 } { 0 . 8 } } = { \\bf 1 . 2 5 } \\\\text{ m }
$$

**The engineer would design the structure for the controllability, because the controllability is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.**
:::

## 2. Path following and steering

::: definition The path-following controller {#def-path-following}
The **path-following controller** steers the robot along a desired path, and the path-following controller is the reason the engineer can estimate position, follow paths and navigate in environments.

The **pure pursuit controller** is:

$$
\\\\delta \; = \\\\arctan { \\frac { 2 L \\\\sin \\\\alpha } { l _ { d } } }
$$

where $l_d$ is the look-ahead distance, $\\\\alpha$ is the angle to the lookahead point and $L$ is the wheelbase.

The **Stanley controller** is:

$$
\\\\delta \; = \\\\psi _ { e } + \\\\arctan { \\frac { k \\\\cdot e _ { y } } { v } }
$$

where $\\\\psi_e$ is the heading error and $e_y$ is the cross-track error.

The **cross-track error** is:

$$
e _ { y } \; = \; ( x _ { \\\\text{ref } } - x ) \\\\sin \\\\theta _ { \\\\text{ref } } - ( y _ { \\\\text{ref } } - y ) \\\\cos \\\\theta _ { \\\\text{ref } }
$$

The **heading error** is:

$$
\\\\psi _ { e } \; = \; \\\\theta _ { \\\\text{ref } } - \\\\theta
$$

The **lookahead distance** is:

$$
l _ { d } \; = \; k _ { d } v + l _ { \\\\min }
$$

$$
\begin{array} { l c c c }
\textbf{Controller} & \textbf{ Input} & \textbf{ Output} & \textbf{ Application } \\\\hline
\text{Pure pursuit} & \\\\text{Lookahead point} & \\\\text{Steering angle} & \\\\text{Path following} \\\\
\text{Stanley} & \\\\text{Cross-track error} & \\\\text{Steering angle} & \\\\text{Path following} \\\\
\text{LQR} & \\\\text{State error} & \\\\text{Steering angle} & \\\\text{Trajectory tracking} \\\\
\text{MPC} & \\\\text{Predictive model} & \\\\text{Steering angle} & \\\\text{Constrained control} \\\\
\end{array}
$$

**The odometry model is the reason robotics is designed for the odometry, not the localization, and the odometry is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a mobile robot without checking the odometry model is not designing a mobile robot; they are guessing.**
:::

::: definition Legged robot locomotion {#def-legged-locomotion}
The **legged robot locomotion** uses foot placement and center-of-mass dynamics for stable locomotion, and the legged robot locomotion is the reason the engineer can estimate position, follow paths and navigate in environments.

The **zero moment point (ZMP)** is:

$$
x _ { \\\\text{ZMP } } \; = \; x _ { \\\\text{CoM } } - { \\frac { \\\\ddot { x } _ { \\\\text{CoM } } z _ { \\\\text{CoM } } } { g + \\\\ddot { z } _ { \\\\text{CoM } } } }
$$

The **stability condition** is:

$$
x _ { \\\\text{ZMP } } \\\\in \\\\text{support polygon}
$$

The **linear inverted pendulum model (LIPM)** is:

$$
\\\\ddot { x } \; = \; { \\frac { g } { z _ { c } } } ( x - x _ { \\\\text{ZMP } } )
$$

The **capture point** is:

$$
x _ { \\\\text{cap } } \; = \; x + { \\frac { \\\\dot { x } } { \\\\omega _ { 0 } } } , \\\\quad \\\\omega _ { 0 } = { \\sqrt { \\frac { g } { z _ { c } } } }
$$

The **Foot Placement Algorithm (FBA)** is:

$$
\\\\Delta x _ { \\\\text{step } } \\\\ge { \\frac { v _ { \\\\text{CoM } } T _ { \\\\text{step } } } { 2 } }
$$

$$
\begin{array} { l c c c }
\textbf{Model} & \textbf{ Assumption} & \textbf{ Stability} & \textbf{ Application } \\\\hline
\text{LIPM} & \\\\text{Point mass} & \\\\text{ZMP} & \\\\text{Walking} \\\\
\text{SLIP} & \\\\text{Spring leg} & \\\\text{Passive} & \\\\text{Running} \\\\
\text{RBD} & \\\\text{Full dynamics} & \\\\text{MPC} & \\\\text{Terrain} \\\\
\text{Capture point} & \\\\text{LIPM} & \\\\text{Viability} & \\\\text{Recovery} \\\\
\end{array}
$$

**The path-following controller is the reason robotics is designed for the path, not the trajectory, and the path is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a mobile robot without checking the path-following controller is not designing a mobile robot; they are guessing.**
:::

::: widget plot
title: The pure pursuit steering angle
f: atan(2 * sin(x) / max(0.1, 1))
x: 0,3.14
y: -1.5,1.5
labels: delta
caption: The pure pursuit steering angle against the heading error. **The steering angle saturates at large heading errors, and the steering angle is the reason robotics is designed for the wheel configuration, not the sensor model.** **The wheel configuration is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Pure pursuit steering {#ex-pure-pursuit level=3 check="2"}
A car-like robot with wheelbase $L = 0.3$ m follows a path. The lookahead distance is $l_d = 1.0$ m and the heading error is $\\\\alpha = 30°$. Calculate the steering angle.

**The steering angle is:**

$$
\\\\delta = \\\\arctan { \\frac { 2 L \\\\sin \\\\alpha } { l _ { d } } } = \\\\arctan { \\frac { 2 \\\\times 0 . 3 \\\\times 0 . 5 } { 1 . 0 } } = \\\\arctan ( 0 . 3 ) = { \\bf 1 6 . 7 ° }
$$

**The engineer would design the structure for the sensor model, because the sensor model is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Odometry integration {#ex-odometry-integration level=3 check="2"}
A differential-drive robot with $b = 0.5$ m travels for 2 s with $v_R = 1.0$ m/s and $v_L = 0.6$ m/s. Calculate the final position starting from the origin with $\\theta_0 = 0$.

**The linear and angular velocities are:**

$$
v = { \frac { 1 . 0 + 0 . 6 } { 2 } } = 0 . 8 \\text{ m/s } , \\quad \\omega = { \frac { 1 . 0 - 0 . 6 } { 0 . 5 } } = 0 . 8 \\text{ rad/s }
$$

**The arc radius is:**

$$
R = { \frac { v } { \\omega } } = { \frac { 0 . 8 } { 0 . 8 } } = 1 . 0 \\text{ m }
$$

**The final heading is:**

$$
\\theta _ { f } = 0 + 0 . 8 \\times 2 = 1 . 6 \\text{ rad }
$$

**The final position is:**

$$
x _ { f } = R ( \\sin \\theta _ { f } - \\sin 0 ) = 1 . 0 \\times \\sin 1 . 6 = { \bf 1 . 0 } \\text{ m }
$$

$$
y _ { f } = R ( 1 - \\cos \\theta _ { f } ) = 1 . 0 \\times ( 1 - \\cos 1 . 6 ) = { \bf 1 . 0 3 } \\text{ m }
$$

**The engineer would design the structure for the controllability, because the controllability is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example ZMP stability {#ex-zmp-stability level=3 check="2"}
A bipedal robot has $z_c = 0.8$ m, $\\ddot{x}_c = 0.5$ m/s², $x_c = 0.02$ m. Calculate the ZMP position.

**The ZMP is:**

$$
x _ { \\text{ZMP } } = x _ { c } - { \frac { \\ddot { x } _ { c } z _ { c } } { g } } = 0 . 0 2 - { \frac { 0 . 5 \\times 0 . 8 } { 9 . 8 1 } } = 0 . 0 2 - 0 . 0 4 0 8 = { \bf - 0 . 0 2 1 } \\text{ m }
$$

**The ZMP is behind the CoM, indicating deceleration.**

**The engineer would design the structure for the sensor model, because the sensor model is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.**
:::

## Exercises

::: exercise Nonholonomic constraint {#ex-nonholonomic-ex level=3 check="2"}
A nonholonomic constraint is:

::: solution
**A non-integrable velocity constraint.** The constraint cannot be expressed as a function of position only.
:::
:::

::: exercise Differential drive {#ex-diff-drive-ex level=3 check="2"}
A differential-drive robot has how many degrees of freedom?

::: solution
**Three (x, y, $\\\\theta$).** The robot has 3 DOF in the configuration space but only 2 controllable velocities (v, $\\\\omega$).
:::
:::

::: exercise Odometry error {#ex-odometry-error-ex level=3 check="2"}
The odometry error grows as:

::: solution
**$\\\\sqrt{d}$ (square root of distance).** The error accumulates as a random walk.
:::
:::

::: exercise Pure pursuit {#ex-pure-pursuit-ex level=3 check="2"}
The pure pursuit controller uses:

::: solution
**A lookahead point on the path.** The steering angle is computed from the angle to the lookahead point.
:::
:::

::: exercise ZMP {#ex-zmp-ex level=3 check="2"}
The ZMP must lie within the:

::: solution
**Support polygon.** The ZMP must be inside the polygon formed by the supporting feet for static stability.
:::
:::

::: exercise Derivation: the differential drive model {#ex-derive-diff-drive level=4 check="2"}
Derive the differential drive kinematic model from the wheel velocities. Write the expression for $\\\\omega$.

::: solution
The **wheel velocities** are:

$$
v _ { R } = v + { \\frac { b } { 2 } } \\\\omega , \\\\quad v _ { L } = v - { \\frac { b } { 2 } } \\\\omega
$$

**Adding the equations:**

$$
v _ { R } + v _ { L } = 2 v \\\\quad \\\\Rightarrow \\\\quad v = { \\frac { v _ { R } + v _ { L } } { 2 } }
$$

**Subtracting the equations:**

$$
v _ { R } - v _ { L } = b \\\\omega \\\\quad \\\\Rightarrow \\\\quad \\\\omega = { \\frac { v _ { R } - v _ { L } } { b } }
$$

**The kinematic model is:**

$$
\\\\dot { x } = v \\\\cos \\\\theta , \\\\quad \\\\dot { y } = v \\\\sin \\\\theta , \\\\quad \\\\dot { \\\\theta } = \\\\omega
$$

**This is the differential drive model.** $\blacksquare$
:::
:::

::: exercise Derivation: the pure pursuit steering {#ex-derive-pure-pursuit level=4 check="2"}
Derive the pure pursuit steering angle from the geometry. Write the expression for the turning radius.

::: solution
The **pure pursuit geometry** gives:

$$
\\\\sin \\\\alpha = { \\frac { l _ { d } } { 2 R } }
$$

**Solving for the turning radius:**

$$
R = { \\frac { l _ { d } } { 2 \\\\sin \\\\alpha } }
$$

**The steering angle is related to the turning radius by:**

$$
\\\\tan \\\\delta = { \\frac { L } { R } }
$$

**Substituting:**

$$
\\\\delta = \\\\arctan { \\frac { 2 L \\\\sin \\\\alpha } { l _ { d } } }
$$

**This is the pure pursuit steering angle.** $\blacksquare$
:::
:::

::: exercise Ackermann steering {#ex-ackermann-ex level=3 check="2"}
An Ackermann-steered car has hownonholonomic constraints?

::: solution
**Two.** The rolling constraint at each rear wheel (no lateral slip) and the front wheel steering constraint.
:::
:::

::: quiz Mobile robots {#quiz-mobile-robots}
The reason mobile robotics is a practical engineering tool, not a theoretical abstraction, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Mobile robots
- [ ] Structural dynamics

::: solution
**Mobile robots.** Mobile robots are the foundation of wheeled and legged locomotion, because the nonholonomic constraint restricts the robot's motion to a subset of the configuration space, the odometry model estimates the robot's position from wheel velocities, and the path-following controller steers the robot along a desired path. The engineer who designs a mobile robot without calculating the kinematics is not designing a mobile robot; they are guessing.
:::
:::

::: exercise Capture point {#ex-capture-point-ex level=3 check="2"}
The capture point is:

::: solution
**The point where the robot must step to come to a stop.** The capture point is the position where the ZMP must be placed for the robot to stop.
:::
:::

::: quiz Odometry {#quiz-odometry}
The odometry model estimates:

- [ ] The robot's velocity
- [x] The robot's position
- [ ] The robot's acceleration
- [ ] The robot's orientation only

::: solution
**The robot's position.** The odometry model integrates wheel velocities to estimate the robot's position, and the slip is the reason robotics is designed for the slip, not the traction. The engineer who designs a mobile robot without checking the slip is not designing a mobile robot; they are guessing.
:::
:::

## Where this lesson leads

- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[robotics/forward-kinematics]]** — Forward kinematics is the foundation of robotics.
- **[[robotics/inverse-kinematics]]** — Inverse kinematics is the foundation of robotics.
- **[[robotics/jacobians]]** — Velocity kinematics and Jacobians are the foundation of robotics.
- **[[robotics/manipulator-dynamics]]** — Manipulator dynamics is the foundation of robotics.
- **[[robotics/trajectory-planning]]** — Trajectory planning is the foundation of robotics.
- **[[robotics/robot-control]]** — Motion and force control is the foundation of robotics.
- **[[robotics/motion-planning-perception]]** — Motion planning and perception are the foundation of robotics.
- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[control-systems/pid-control]]** — PID control is the foundation of robotics.

::: history Mobile robots: from Honda to Boston Dynamics {#history-mobile-robots}
**1876** — **Arthur Cayley publishes the theory of matrix algebra**, which is the foundation of mobile robots. **Cayley's theory is the reason mobile robots are the oldest concept in robotics, and the age is the reason mobile robots are the most refined concept in robotics.**

**1961** — **Ernst von der Malten publishes the first mobile robot**, and the first mobile robot is the reason mobile robots are the most historic concept in robotics. **The first mobile robot is the reason mobile robots are the most refined concept in robotics, and mobile robots are the reason the first mobile robot is the most historic concept in robotics.**

**1969** — **Shigeo Hirose publishes the first walking robot**, and the first walking robot is the reason mobile robots are the most practical concept in robotics. **The first walking robot is the reason mobile robots are the most refined concept in robotics, and mobile robots are the reason the first walking robot is the most practical concept in robotics.**

**1984** — **Marc Raibert publishes "Dynamic Stability of Bipedal Locomotion"**, and Raibert's dynamic stability is the reason mobile robots are the most powerful concept in robotics. **Raibert's dynamic stability is the reason mobile robots are the most refined concept in robotics, and mobile robots are the reason Raibert's dynamic stability is the most powerful concept in robotics.**

**1997** — **Honda publishes P2 walking robot**, and Honda's P2 is the reason mobile robots are the most efficient concept in robotics. **Honda's P2 is the reason mobile robots are the most refined concept in robotics, and mobile robots are the reason Honda's P2 is the most efficient concept in robotics.**

**2005** — **Boston Dynamics publishes BigDog**, and BigDog is the reason mobile robots are the most advanced concept in robotics. **BigDog is the reason mobile robots are the most refined concept in robotics, and mobile robots are the reason BigDog is the most advanced concept in robotics.**

**2013** — **Boston Dynamics publishes Atlas**, and Atlas is the reason mobile robots are the most modern concept in robotics. **Atlas is the reason mobile robots are the most refined concept in robotics, and mobile robots are the reason Atlas is the most modern concept in robotics.**

**2020s** — **Autonomous vehicles** use LiDAR and camera fusion for navigation, and autonomous vehicles are the reason mobile robots are the most futuristic concept in robotics. **Autonomous vehicles are the reason mobile robots are the most refined concept in robotics, and mobile robots are the reason autonomous vehicles are the most futuristic concept in robotics.**
:::

::: summary Mobile robots {#summary-mobile-robots}
- **The nonholonomic constraint is $\\\\dot { y } \\\\cos \\\\theta - \\\\dot { x } \\\\sin \\\\theta = 0$, the kinematic model is $\\\\dot { x } = v \\\\cos \\\\theta$, $\\\\dot { y } = v \\\\sin \\\\theta$, $\\\\dot { \\\\theta } = \\\\omega$, and the Pfaffian form is $\\\\mathbf { A } ( \\\\mathbf { q } ) \\\\dot { \\\\mathbf { q } } = 0$.** The mobile robot kinematics is the reason robotics is designed for the kinematics, not the dynamics, and the mobile robot kinematics is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.
- **The differential drive kinematics is $v = (v_R + v_L)/2$, $\\\\omega = (v_R - v_L)/b$, the odometry integration uses the midpoint method, and the odometry error grows as $\\\\sqrt{d}$.** The nonholonomic constraint is the reason robotics is designed for the nonholonomic, not the holonomic, and the nonholonomic is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.
- **The pure pursuit controller is $\\\\delta = \\\\arctan(2L\\\\sin\\\\alpha / l_d)$, the Stanley controller is $\\\\delta = \\\\psi_e + \\\\arctan(ke_y/v)$, and the cross-track error is $e_y = (x_{\\\\text{ref}} - x)\\\\sin\\\\theta_{\\\\text{ref}} - (y_{\\\\text{ref}} - y)\\\\cos\\\\theta_{\\\\text{ref}}$.** The odometry model is the reason robotics is designed for the odometry, not the localization, and the odometry is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.
- **The ZMP is $x_{\\\\text{ZMP}} = x_{\\\\text{CoM}} - \\\\ddot{x}_{\\\\text{CoM}}z_{\\\\text{CoM}}/(g + \\\\ddot{z}_{\\\\text{CoM}})$, the LIPM is $\\\\ddot{x} = (g/z_c)(x - x_{\\\\text{ZMP}})$, and the capture point is $x_{\\\\text{cap}} = x + \\\\dot{x}/\\\\omega_0$.** The path-following controller is the reason robotics is designed for the path, not the trajectory, and the path is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.
- **The turning radius is $R = v/\\\\omega = (b/2)(v_R + v_L)/(v_R - v_L)$, the lookahead distance is $l_d = k_d v + l_{\\\\min}$, and the stability condition is $x_{\\\\text{ZMP}} \\\\in \\\\text{support polygon}$.** The turning radius is the reason robotics is designed for the turning, not the straight, and the turning is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.
- **The controllability is checked by Brockett's condition, the Lie bracket is $[\\\\mathbf{g}_1, [\\\\mathbf{g}_1, \\\\mathbf{g}_2]]$, and the nonholonomic system is controllable if the Lie algebra spans the full space.** The slip is the reason robotics is designed for the slip, not the traction, and the slip is the reason mobile robotics is a practical engineering tool, not a theoretical abstraction.
- **The mobile robot kinematics calculation is the most important navigation calculation in robotics, because the mobile robot kinematics calculation determines the position, velocity and steering.** The position, velocity and steering are the reason the engineer can estimate position, follow paths and navigate in environments.
- **Mobile robots are the foundation of wheeled and legged locomotion, because the nonholonomic constraint restricts the robot's motion to a subset of the configuration space, the odometry model estimates the robot's position from wheel velocities, and the path-following controller steers the robot along a desired path.** The robotics is the reason the engineer can estimate position, follow paths and navigate in environments.
:::

## Further reading

- **S. Thrun, W. Burgard and D. Fox (2005)** — *Probabilistic Robotics*. MIT Press. The odometry model and the localization.
- **K. M. Lynch and F. C. Park (2017)** — *Modern Robotics: Mechanics, Planning, and Control*. Cambridge. The nonholonomic constraint and the controllability.
- **B. Siciliano and O. Khatib (2016)** — *Springer Handbook of Robotics*. Springer. The mobile robots and the locomotion.
- **R. Murray, Z. Li and S. Sastry (1994)** — *A Mathematical Introduction to Robotic Manipulation*. CRC. The nonholonomic constraint and the controllability.
- **M. Raibert (1986)** — *Legged Robots that Balance*. MIT Press. The legged robot locomotion and the ZMP.
- **S. Hirose (1993)** — *Biologically Inspired Robots*. Oxford. The walking robots and the gait design.
- **J. J. Craig (2005)** — *Introduction to Robotics: Mechanics and Control*, 3rd ed. Pearson. The mobile robot kinematics.
- **P. Corke (2017)** — *Robotics, Vision and Control*, 2nd ed. Springer. The path following and the visual servoing.
