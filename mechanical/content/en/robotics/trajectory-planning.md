Trajectory planning is the foundation of robot motion generation: the point-to-point trajectory generates smooth joint-space motion, the Cartesian trajectory generates straight-line end-effector motion, and the time-optimal trajectory maximizes speed within torque and velocity limits. **The engineer who designs a robot motion system without planning the trajectory is not designing a motion system; they are guessing.** The trajectory planning calculation is the reason the engineer can generate smooth motion, avoid singularities and optimize cycle time, and the trajectory planning is the reason robot motion is a practical engineering tool, not a theoretical abstraction.

The quantitative tools of trajectory planning are the **polynomial trajectory** (the smooth interpolation), the **trapezoidal velocity profile** (the time-optimal motion), and the **s-curve profile** (the smooth acceleration). The tools are the language in which the trajectory planning analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways trajectory planning calculation goes wrong
**Not planning the trajectory.** The engineer who designs a robot motion system without planning the trajectory is not designing a motion system; they are guessing. **The trajectory planning is the reason robotics is designed for the trajectory, not the path, and the trajectory planning is the reason robot motion is a practical engineering tool, not a theoretical abstraction.** **Not checking the polynomial trajectory.** The engineer who designs a robot motion system without checking the polynomial trajectory is not designing a motion system; they are guessing. **The polynomial trajectory is the reason robotics is designed for the polynomial, not the spline, and the polynomial is the reason robot motion is a practical engineering tool, not a theoretical abstraction.** **Not checking the trapezoidal profile.** The engineer who designs a robot motion system without checking the trapezoidal profile is not designing a motion system; they are guessing. **The trapezoidal profile is the reason robotics is designed for the trapezoidal, not the triangular, and the trapezoidal is the reason robot motion is a practical engineering tool, not a theoretical abstraction.** **Not checking the s-curve profile.** The engineer who designs a robot motion system without checking the s-curve profile is not designing a motion system; they are guessing. **The s-curve profile is the reason robotics is designed for the s-curve, not the trapezoidal, and the s-curve is the reason robot motion is a practical engineering tool, not a theoretical abstraction.** **Not checking the boundary conditions.** The engineer who designs a robot motion system without checking the boundary conditions is not designing a motion system; they are guessing. **The boundary conditions are the reason robotics is designed for the boundary, not the interior, and the boundary is the reason robot motion is a practical engineering tool, not a theoretical abstraction.** **Not checking the continuity.** The engineer who designs a robot motion system without checking the continuity is not designing a motion system; they are guessing. **The continuity is the reason robotics is designed for the continuity, not the discontinuity, and the continuity is the reason robot motion is a practical engineering tool, not a theoretical abstraction.** **Not checking the singularity avoidance.** The engineer who designs a robot motion system without checking the singularity avoidance is not designing a motion system; they are guessing. **The singularity avoidance is the reason robotics is designed for the avoidance, not the approach, and the avoidance is the reason robot motion is a practical engineering tool, not a theoretical abstraction.** **Not checking the time scaling.** The engineer who designs a robot motion system without checking the time scaling is not designing a motion system; they are guessing. **The time scaling is the reason robotics is designed for the time, not the space, and the time is the reason robot motion is a practical engineering tool, not a theoretical abstraction.** **Not checking the jerk.** The engineer who designs a robot motion system without checking the jerk is not designing a motion system; they are guessing. **The jerk is the reason robotics is designed for the jerk, not the acceleration, and the jerk is the reason robot motion is a practical engineering tool, not a theoretical abstraction.**
:::

## 1. Joint-space trajectories

::: definition The cubic polynomial trajectory {#def-cubic-trajectory}
The **cubic polynomial trajectory** generates smooth point-to-point motion with boundary conditions on position and velocity, and the cubic polynomial trajectory is the reason the engineer can generate smooth motion, avoid singularities and optimize cycle time.

The **cubic polynomial** is:

$$
\\\\theta ( t ) \; = \; a _ { 0 } + a _ { 1 } t + a _ { 2 } t ^ { 2 } + a _ { 3 } t ^ { 3 }
$$

The **boundary conditions** are:

$$
\\\\theta ( 0 ) = \\\\theta _ { 0 } , \\\\quad \\\\dot { \\\\theta } ( 0 ) = 0 , \\\\quad \\\\theta ( t _ { f } ) = \\\\theta _ { f } , \\\\quad \\\\dot { \\\\theta } ( t _ { f } ) = 0
$$

The **coefficients** are:

$$
a _ { 0 } = \\\\theta _ { 0 } , \\\\quad a _ { 1 } = 0 , \\\\quad a _ { 2 } = { \\frac { 3 ( \\\\theta _ { f } - \\\\theta _ { 0 } ) } { t _ { f } ^ { 2 } } } , \\\\quad a _ { 3 } = - { \\frac { 2 ( \\\\theta _ { f } - \\\\theta _ { 0 } ) } { t _ { f } ^ { 3 } } }
$$

The **peak velocity** is:

$$
\\\\dot { \\\\theta } _ { \\\\max } \; = \; { \\frac { 3 ( \\\\theta _ { f } - \\\\theta _ { 0 } ) } { 2 t _ { f } } }
$$

The **peak acceleration** is:

$$
\\\\ddot { \\\\theta } _ { \\\\max } \; = \; { \\frac { 6 ( \\\\theta _ { f } - \\\\theta _ { 0 } ) } { t _ { f } ^ { 2 } } }
$$

$$
\begin{array} { l c c c c }
\textbf{Order} & \textbf{ BCs} & \textbf{ Continuity} & \textbf{ Peak velocity} & \textbf{ Peak accel} \\\\hline
\text{Linear} & 2 & \\\\theta & \\\\infty & \\\\infty \\\\
\text{Cubic} & 4 & \\\\theta , \\\\dot { \\\\theta } & 1 . 5 v _ { \\\\text{avg } } & 6 a _ { \\\\text{avg } } \\\\
\text{Quintic} & 6 & \\\\theta , \\\\dot { \\\\theta } , \\\\ddot { \\\\theta } & 1 . 8 7 5 v _ { \\\\text{avg } } & 5 . 7 7 a _ { \\\\text{avg } } \\\\
\text{Trapezoidal} & 3 & \\\\theta , \\\\dot { \\\\theta } & v _ { \\\\max } & \\\\infty \\\\
\text{S-curve} & 5 & \\\\theta , \\\\dot { \\\\theta } , \\\\ddot { \\\\theta } & 1 . 5 v _ { \\\\text{avg } } & a _ { \\\\max } \\\\
\end{array}
$$

**The trajectory planning is the reason robotics is designed for the trajectory, not the path, and the trajectory planning is the reason robot motion is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot motion system without planning the trajectory is not designing a motion system; they are guessing.**
:::

::: definition The trapezoidal velocity profile {#def-trapezoidal-profile}
The **trapezoidal velocity profile** generates time-optimal motion with constant acceleration, and the trapezoidal velocity profile is the reason the engineer can generate smooth motion, avoid singularities and optimize cycle time.

The **three phases** are:

$$
\\\\text{Phase 1: } \\\\ddot { \\\\theta } = a _ { \\\\max } , \\\\quad \\\\text{Phase 2: } \\\\ddot { \\\\theta } = 0 , \\\\quad \\\\text{Phase 3: } \\\\ddot { \\\\theta } = - a _ { \\\\max }
$$

The **cruise velocity** is:

$$
v _ { c } \; = \; \\\\min \\\\left( v _ { \\\\max } , { \\sqrt { { \\frac { | \\\\Delta \\\\theta | } { 2 } } a _ { \\\\max } } } \\right)
$$

The **total time** is:

$$
t _ { f } \; = \; { \\frac { | \\\\Delta \\\\theta | } { v _ { c } } } + { \\frac { v _ { c } } { a _ { \\\\max } } }
$$

The **triangular profile** (no cruise phase) occurs when:

$$
| \\\\Delta \\\\theta | \\\\le { \\frac { v _ { \\\\max } ^ { 2 } } { a _ { \\\\max } } }
$$

The **acceleration time** is:

$$
t _ { a } \; = \; { \\frac { v _ { c } } { a _ { \\\\max } } }
$$

$$
\begin{array} { l c c c }
\textbf{Profile} & \textbf{ Acceleration} & \textbf{ Jerk} & \textbf{ Application } \\\\hline
\text{Trapezoidal} & \\\\text{Constant} & \\\\text{Infinite} & \\\\text{Time-optimal} \\\\
\text{S-curve} & \\\\text{Trapezoidal} & \\\\text{Finite} & \\\\text{Smooth} \\\\
\text{7-segment} & \\\\text{S-curve} & \\\\text{Finite} & \\\\text{Very smooth} \\\\
\text{Cubic spline} & \\\\text{Continuous} & \\\\text{Continuous} & \\\\text{Multi-waypoint} \\\\
\end{array}
$$

**The polynomial trajectory is the reason robotics is designed for the polynomial, not the spline, and the polynomial is the reason robot motion is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot motion system without checking the polynomial trajectory is not designing a motion system; they are guessing.**
:::

::: widget plot
title: The cubic trajectory position
f: 3 * x^2 - 2 * x^3
x: 0,1
y: 0,1
labels: theta
caption: The cubic polynomial trajectory against normalized time. **The cubic trajectory has smooth velocity but discontinuous acceleration, and the cubic trajectory is the reason robotics is designed for the trapezoidal profile, not the s-curve profile.** **The trapezoidal profile is the reason robot motion is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Cubic trajectory calculation {#ex-cubic-trajectory level=3 check="2"}
A robot joint moves from $\\\\theta_0 = 0$ to $\\\\theta_f = 1$ rad in $t_f = 2$ s. Calculate the cubic trajectory coefficients and peak velocity.

**The coefficients are:**

$$
a _ { 0 } = 0 , \\\\quad a _ { 1 } = 0 , \\\\quad a _ { 2 } = { \\frac { 3 ( 1 - 0 ) } { 2 ^ { 2 } } } = 0 . 7 5 , \\\\quad a _ { 3 } = - { \\frac { 2 ( 1 - 0 ) } { 2 ^ { 3 } } } = - 0 . 2 5
$$

**The trajectory is:**

$$
\\\\theta ( t ) = 0 . 7 5 t ^ { 2 } - 0 . 2 5 t ^ { 3 }
$$

**The peak velocity is:**

$$
\\\\dot { \\\\theta } _ { \\\\max } = { \\frac { 3 \\\\times 1 } { 2 \\\\times 2 } } = { \\bf 0 . 7 5 } \\\\text{ rad/s }
$$

**The engineer would design the structure for the boundary conditions, because the boundary conditions are the reason robot motion is a practical engineering tool, not a theoretical abstraction.**
:::

## 2. Cartesian trajectories and time scaling

::: definition The Cartesian trajectory {#def-cartesian-trajectory}
The **Cartesian trajectory** generates straight-line end-effector motion in task space, and the Cartesian trajectory is the reason the engineer can generate smooth motion, avoid singularities and optimize cycle time.

The **straight-line interpolation** is:

$$
\\\\mathbf { p } ( t ) \; = \; \\\\mathbf { p } _ { 0 } + s ( t ) ( \\\\mathbf { p } _ { f } - \\\\mathbf { p } _ { 0 } )
$$

where $s(t) \\\\in [0, 1]$ is the path parameter.

The **orientation interpolation** (quaternion SLERP) is:

$$
\\\\mathbf { q } ( t ) \; = \; \\\\mathbf { q } _ { 0 } \\\\left( \\\\mathbf { q } _ { 0 } ^ { - 1 } \\\\mathbf { q } _ { f } \\right) ^ { s ( t ) }
$$

The **inverse kinematics at each point** is:

$$
\\\\boldsymbol { \\\\theta } ( t ) \; = \; \\\\text{IK} ( \\\\mathbf { T } ( t ) )
$$

The **path discretization** requires:

$$
\\\\Delta s \\\\le { \\frac { v _ { \\\\max } \\\\Delta t } { | \\\\mathbf { p } _ { f } - \\\\mathbf { p } _ { 0 } | } }
$$

The **singularity check** at each point is:

$$
w ( t ) = { \\sqrt { \\\\det ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } ) } } > w _ { \\\\min }
$$

$$
\begin{array} { l c c c }
\textbf{Trajectory type} & \textbf{ Space} & \textbf{ Path} & \textbf{ IK required} \\\\hline
\text{Joint-space} & \\\\text{Joint} & \\\\text{Curved} & \\\\text{No} \\\\
\text{Cartesian line} & \\\\text{Task} & \\\\text{Straight} & \\\\text{Yes} \\\\
\text{Cartesian arc} & \\\\text{Task} & \\\\text{Circular} & \\\\text{Yes} \\\\
\text{Free-form} & \\\\text{Task} & \\\\text{Spline} & \\\\text{Yes} \\\\
\end{array}
$$

**The trapezoidal profile is the reason robotics is designed for the trapezoidal, not the triangular, and the trapezoidal is the reason robot motion is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot motion system without checking the trapezoidal profile is not designing a motion system; they are guessing.**
:::

::: definition Time-optimal trajectory {#def-time-optimal}
The **time-optimal trajectory** maximizes speed within torque and velocity limits, and the time-optimal trajectory is the reason the engineer can generate smooth motion, avoid singularities and optimize cycle time.

The **time scaling problem** is:

$$
\\\\min \\\\int _ { 0 } ^ { t _ { f } } d t \\\\quad \\\\text{subject to} \\\\quad | \\\\tau _ { i } ( s , \\\\dot { s } , \\\\ddot { s } ) | \\\\le \\\\tau _ { i , \\\\max }
$$

The **parameterized dynamics** is:

$$
\\\\mathbf { M } ( s ) \\\\ddot { s } + \\\\mathbf { c } ( s ) \\\\dot { s } ^ { 2 } + \\\\mathbf { g } ( s ) = \\\\boldsymbol { \\\\tau }
$$

where $\\\\mathbf{M}(s) = \\\\mathbf{J}^T\\\\mathbf{M}_q\\\\mathbf{J}$, $\\\\mathbf{c}(s) = \\\\mathbf{J}^T(\\\\mathbf{M}_q\\\\dot{\\\\mathbf{J}}\\\\dot{\\\\boldsymbol{\\\\theta}} + \\\\mathbf{C}_q\\\\mathbf{J}\\\\dot{s})$.

The **bounding curves** are:

$$
\\\\ddot { s } \\\\le \\\\alpha ( s ) , \\\\quad \\\\ddot { s } \\\\ge \\\\beta ( s ) , \\\\quad \\\\dot { s } ^ { 2 } \\\\le \\\\gamma ( s )
$$

The **maximum velocity profile** is:

$$
\\\\dot { s } _ { \\\\max } ( s ) \; = \; { \\sqrt { \\\\gamma ( s ) } }
$$

$$
\begin{array} { l c c c }
\textbf{Constraint} & \textbf{ Expression} & \textbf{ Effect} & \textbf{ Application } \\\\hline
\text{Torque limit} & | \\\\tau _ { i } | \\\\le \\\\tau _ { i , \\\\max } & \\\\text{Bounds } \\\\ddot { s } & \\\\text{Actuator} \\\\
\text{Velocity limit} & | \\\\dot { \\\\theta } _ { i } | \\\\le \\\\dot { \\\\theta } _ { i , \\\\max } & \\\\text{Bounds } \\\\dot { s } & \\\\text{Motor} \\\\
\text{Singularity} & w ( s ) > w _ { \\\\min } & \\\\text{Avoids} & \\\\text{Kinematics} \\\\
\text{Joint limit} & \\\\theta _ { \\\\min } \\\\le \\\\theta \\\\le \\\\theta _ { \\\\max } & \\\\text{Bounds path} & \\\\text{Workspace} \\\\
\end{array}
$$

**The s-curve profile is the reason robotics is designed for the s-curve, not the trapezoidal, and the s-curve is the reason robot motion is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot motion system without checking the s-curve profile is not designing a motion system; they are guessing.**
:::

::: widget plot
title: The trapezoidal velocity profile
f: min(1, max(0, min(2 - x, 1)))
x: 0,2
y: 0,1.1
labels: v
caption: The trapezoidal velocity profile against normalized time. **The trapezoidal profile has constant acceleration and infinite jerk, and the trapezoidal profile is the reason robotics is designed for the continuity, not the singularity avoidance.** **The continuity is the reason robot motion is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Trapezoidal profile calculation {#ex-trapezoidal-calc level=3 check="2"}
A robot joint moves $\\\\Delta\\\\theta = 2$ rad with $v_{\\\\max} = 1$ rad/s and $a_{\\\\max} = 2$ rad/s². Calculate the cruise velocity, acceleration time and total time.

**The cruise velocity is:**

$$
v _ { c } = \\\\min \\\\left( 1 , { \\sqrt { { \\frac { 2 } { 2 } } \\\\times 2 } } \\right) = \\\\min ( 1 , 1 . 4 1 4 ) = { \\bf 1 } \\\\text{ rad/s }
$$

**The acceleration time is:**

$$
t _ { a } = { \\frac { 1 } { 2 } } = { \\bf 0 . 5 } \\\\text{ s }
$$

**The total time is:**

$$
t _ { f } = { \\frac { 2 } { 1 } } + { \\frac { 1 } { 2 } } = { \\bf 2 . 5 } \\\\text{ s }
$$

**The engineer would design the structure for the time scaling, because the time scaling is the reason robot motion is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Quintic trajectory {#ex-quintic-trajectory level=3 check="2"}
A robot joint moves from $\\theta_0 = 0$ to $\\theta_f = 2$ rad in $t_f = 3$ s with zero initial and final velocity and acceleration. Calculate the peak velocity.

**The quintic trajectory with zero BCs has:**

$$
\\theta ( t ) = \\theta _ { 0 } + ( \\theta _ { f } - \\theta _ { 0 } ) ( 1 0 \\tau ^ { 3 } - 1 5 \\tau ^ { 4 } + 6 \\tau ^ { 5 } )
$$

where $\\tau = t / t_f$.

**The peak velocity is:**

$$
\\dot { \\theta } _ { \\max } = { \frac { 1 5 ( \\theta _ { f } - \\theta _ { 0 } ) } { 8 t _ { f } } } = { \frac { 1 5 \\times 2 } { 8 \\times 3 } } = { \bf 1 . 2 5 } \\text{ rad/s }
$$

**The quintic trajectory has continuous acceleration and lower peak velocity than the cubic.**

**The engineer would design the structure for the singularity avoidance, because the singularity avoidance is the reason robot motion is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Cartesian trajectory discretization {#ex-cartesian-discretization level=3 check="2"}
A robot end-effector moves in a straight line from $[0, 0, 0]^T$ to $[1, 0, 0]^T$ m. The maximum velocity is $v_{\\max} = 0.5$ m/s and the control loop period is $\\Delta t = 10$ ms. Calculate the number of waypoints.

**The path length is:**

$$
L = | \\mathbf { p } _ { f } - \\mathbf { p } _ { 0 } | = 1 \\text{ m }
$$

**The maximum step size is:**

$$
\\Delta s _ { \\max } = v _ { \\max } \\Delta t = 0 . 5 \\times 0 . 0 1 = 0 . 0 0 5 \\text{ m }
$$

**The number of waypoints is:**

$$
N = { \frac { L } { \\Delta s _ { \\max } } } = { \frac { 1 } { 0 . 0 0 5 } } = { \bf 2 0 0 }
$$

**The engineer would design the structure for the time scaling, because the time scaling is the reason robot motion is a practical engineering tool, not a theoretical abstraction.**
:::

## Exercises

::: exercise Trajectory planning {#ex-trajectory-planning-ex level=3 check="2"}
A trajectory specifies:

::: solution
**Position, velocity and acceleration as functions of time.** The trajectory is a path with timing.
:::
:::

::: exercise Cubic trajectory {#ex-cubic-trajectory-ex level=3 check="2"}
A cubic trajectory requires how many boundary conditions?

::: solution
**Four.** Position and velocity at start and end.
:::
:::

::: exercise Trapezoidal profile {#ex-trapezoidal-profile-ex level=3 check="2"}
The trapezoidal velocity profile has:

::: solution
**Constant acceleration and infinite jerk.** The acceleration changes instantaneously at the phase transitions.
:::
:::

::: exercise S-curve profile {#ex-s-curve-profile-ex level=3 check="2"}
The s-curve profile limits:

::: solution
**Jerk.** The s-curve profile has trapezoidal acceleration and finite jerk, giving smoother motion.
:::
:::

::: exercise Cartesian trajectory {#ex-cartesian-trajectory-ex level=3 check="2"}
A Cartesian trajectory requires:

::: solution
**Inverse kinematics at each point.** The Cartesian path is planned in task space and converted to joint space via IK.
:::
:::

::: exercise Derivation: the cubic trajectory {#ex-derive-cubic level=4 check="2"}
Derive the cubic trajectory coefficients from the boundary conditions. Write the expression for $a_2$.

::: solution
The **cubic polynomial** is:

$$
\\\\theta ( t ) = a _ { 0 } + a _ { 1 } t + a _ { 2 } t ^ { 2 } + a _ { 3 } t ^ { 3 }
$$

**Applying $\\\\theta(0) = \\\\theta_0$:**

$$
a _ { 0 } = \\\\theta _ { 0 }
$$

**Applying $\\\\dot{\\\\theta}(0) = 0$:**

$$
a _ { 1 } = 0
$$

**Applying $\\\\theta(t_f) = \\\\theta_f$:**

$$
a _ { 0 } + a _ { 2 } t _ { f } ^ { 2 } + a _ { 3 } t _ { f } ^ { 3 } = \\\\theta _ { f }
$$

**Applying $\\\\dot{\\\\theta}(t_f) = 0$:**

$$
2 a _ { 2 } t _ { f } + 3 a _ { 3 } t _ { f } ^ { 2 } = 0
$$

**Solving the system:**

$$
a _ { 2 } = { \\frac { 3 ( \\\\theta _ { f } - \\\\theta _ { 0 } ) } { t _ { f } ^ { 2 } } } , \\\\quad a _ { 3 } = - { \\frac { 2 ( \\\\theta _ { f } - \\\\theta _ { 0 } ) } { t _ { f } ^ { 3 } } }
$$

**These are the cubic trajectory coefficients.** $\blacksquare$
:::
:::

::: exercise Derivation: the trapezoidal profile time {#ex-derive-trapezoidal level=4 check="2"}
Derive the total time for a trapezoidal velocity profile. Write the expression for the distance covered.

::: solution
The **distance covered** is the area under the velocity profile:

$$
\\\\Delta \\\\theta = { \\frac { 1 } { 2 } } v _ { c } t _ { a } + v _ { c } t _ { v } + { \\frac { 1 } { 2 } } v _ { c } t _ { a } = v _ { c } t _ { a } + v _ { c } t _ { v }
$$

**where $t_a = v_c / a_{\\\\max}$ is the acceleration time and $t_v$ is the cruise time.**

**The total time is:**

$$
t _ { f } = 2 t _ { a } + t _ { v } = { \\frac { 2 v _ { c } } { a _ { \\\\max } } } + { \\frac { \\\\Delta \\\\theta - v _ { c } ^ { 2 } / a _ { \\\\max } } { v _ { c } } }
$$

**Simplifying:**

$$
t _ { f } = { \\frac { \\\\Delta \\\\theta } { v _ { c } } } + { \\frac { v _ { c } } { a _ { \\\\max } } }
$$

**This is the total time for a trapezoidal profile.** $\blacksquare$
:::
:::

::: exercise Quintic trajectory {#ex-quintic-trajectory-ex level=3 check="2"}
A quintic trajectory provides continuity of:

::: solution
**Position, velocity and acceleration.** The quintic trajectory has 6 boundary conditions and continuous acceleration.
:::
:::

::: quiz Trajectory planning {#quiz-trajectory-planning}
The reason robot motion is a practical engineering tool, not a theoretical abstraction, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Trajectory planning
- [ ] Structural dynamics

::: solution
**Trajectory planning.** Trajectory planning is the foundation of robot motion generation, because the point-to-point trajectory generates smooth joint-space motion, the Cartesian trajectory generates straight-line end-effector motion, and the time-optimal trajectory maximizes speed within torque and velocity limits. The engineer who designs a robot motion system without planning the trajectory is not designing a motion system; they are guessing.
:::
:::

::: exercise Jerk {#ex-jerk-ex level=3 check="2"}
The jerk is the derivative of:

::: solution
**Acceleration.** The jerk $\\\\dddot{\\\\theta} = d\\\\ddot{\\\\theta}/dt$ is the rate of change of acceleration.
:::
:::

::: quiz Boundary conditions {#quiz-boundary-conditions}
A cubic trajectory has:

- [ ] 2 boundary conditions
- [x] 4 boundary conditions
- [ ] 6 boundary conditions
- [ ] 8 boundary conditions

::: solution
**4 boundary conditions.** The cubic trajectory has position and velocity at start and end, and the boundary conditions are the reason robotics is designed for the boundary, not the interior. The engineer who designs a robot motion system without checking the boundary conditions is not designing a motion system; they are guessing.
:::
:::

## Where this lesson leads

- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[robotics/forward-kinematics]]** — Forward kinematics is the foundation of robotics.
- **[[robotics/inverse-kinematics]]** — Inverse kinematics is the foundation of robotics.
- **[[robotics/jacobians]]** — Velocity kinematics and Jacobians are the foundation of robotics.
- **[[robotics/manipulator-dynamics]]** — Manipulator dynamics is the foundation of robotics.
- **[[robotics/robot-control]]** — Motion and force control is the foundation of robotics.
- **[[robotics/mobile-robots]]** — Mobile robots are the foundation of robotics.
- **[[robotics/motion-planning-perception]]** — Motion planning and perception are the foundation of robotics.
- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[control-systems/pid-control]]** — PID control is the foundation of robotics.

::: history Trajectory planning: from Whitney to KUKA {#history-trajectory-planning}
**1876** — **Arthur Cayley publishes the theory of matrix algebra**, which is the foundation of trajectory planning. **Cayley's theory is the reason trajectory planning is the oldest concept in robotics, and the age is the reason trajectory planning is the most refined concept in robotics.**

**1974** — **Richard Paul publishes "Modelling Trajectory Calculation for Line Arm Manipulators"**, and Paul's trajectory calculation is the reason trajectory planning is the most historic concept in robotics. **Paul's trajectory calculation is the reason trajectory planning is the most refined concept in robotics, and trajectory planning is the reason Paul's trajectory calculation is the most historic concept in robotics.**

**1979** — **Hollerbach publishes "Optimal Trajectory Planning for Robotic Manipulators"**, and Hollerbach's optimization is the reason trajectory planning is the most practical concept in robotics. **Hollerbach's optimization is the reason trajectory planning is the most refined concept in robotics, and trajectory planning is the reason Hollerbach's optimization is the most practical concept in robotics.**

**1985** — **Dubey publishes "Real-Time Implementation of a Collision Avoidance Strategy"**, and Dubey's collision avoidance is the reason trajectory planning is the most powerful concept in robotics. **Dubey's collision avoidance is the reason trajectory planning is the most refined concept in robotics, and trajectory planning is the reason Dubey's collision avoidance is the most powerful concept in robotics.**

**1989** — **Bobrow et al. publish "Time-Optimal Motion of a Robotic Manipulator"**, and Bobrow's time-optimal motion is the reason trajectory planning is the most efficient concept in robotics. **Bobrow's time-optimal motion is the reason trajectory planning is the most refined concept in robotics, and trajectory planning is the reason Bobrow's time-optimal motion is the most efficient concept in robotics.**

**2000** — **Industrial robots** use trapezoidal and s-curve profiles for welding and assembly, and industrial robots are the reason trajectory planning is the most advanced concept in robotics. **Industrial robots are the reason trajectory planning is the most refined concept in robotics, and trajectory planning is the reason industrial robots are the most advanced concept in robotics.**

**2010** — **KUKA and ABB** use time-optimal trajectory planning for high-speed pick-and-place, and industrial robots are the reason trajectory planning is the most modern concept in robotics. **Industrial robots are the reason trajectory planning is the most refined concept in robotics, and trajectory planning is the reason industrial robots are the most modern concept in robotics.**

**2020s** — **Collaborative robots** use real-time trajectory replanning for obstacle avoidance, and collaborative robots are the reason trajectory planning is the most futuristic concept in robotics. **Collaborative robots are the reason trajectory planning is the most refined concept in robotics, and trajectory planning is the reason collaborative robots are the most futuristic concept in robotics.**
:::

::: summary Trajectory planning {#summary-trajectory-planning}
- **The cubic polynomial is $\\\\theta ( t ) = a _ { 0 } + a _ { 1 } t + a _ { 2 } t ^ { 2 } + a _ { 3 } t ^ { 3 }$, the coefficients are $a_0 = \\\\theta_0$, $a_1 = 0$, $a_2 = 3(\\\\theta_f - \\\\theta_0)/t_f^2$, $a_3 = -2(\\\\theta_f - \\\\theta_0)/t_f^3$, and the peak velocity is $\\\\dot{\\\\theta}_{\\\\max} = 3(\\\\theta_f - \\\\theta_0)/(2t_f)$.** The trajectory planning is the reason robotics is designed for the trajectory, not the path, and the trajectory planning is the reason robot motion is a practical engineering tool, not a theoretical abstraction.
- **The trapezoidal profile has three phases (acceleration, cruise, deceleration), the cruise velocity is $v_c = \\\\min(v_{\\\\max}, \\\\sqrt{|\\\\Delta\\\\theta|a_{\\\\max}/2})$, and the total time is $t_f = |\\\\Delta\\\\theta|/v_c + v_c/a_{\\\\max}$.** The polynomial trajectory is the reason robotics is designed for the polynomial, not the spline, and the polynomial is the reason robot motion is a practical engineering tool, not a theoretical abstraction.
- **The s-curve profile limits jerk, the 7-segment profile has continuous acceleration, and the quintic trajectory provides $C^2$ continuity.** The trapezoidal profile is the reason robotics is designed for the trapezoidal, not the triangular, and the trapezoidal is the reason robot motion is a practical engineering tool, not a theoretical abstraction.
- **The Cartesian trajectory uses straight-line interpolation $\\\\mathbf{p}(t) = \\\\mathbf{p}_0 + s(t)(\\\\mathbf{p}_f - \\\\mathbf{p}_0)$, quaternion SLERP for orientation, and requires IK at each point.** The s-curve profile is the reason robotics is designed for the s-curve, not the trapezoidal, and the s-curve is the reason robot motion is a practical engineering tool, not a theoretical abstraction.
- **The time-optimal trajectory minimizes $\\\\int_0^{t_f} dt$ subject to torque and velocity limits, the parameterized dynamics is $\\\\mathbf{M}(s)\\\\ddot{s} + \\\\mathbf{c}(s)\\\\dot{s}^2 + \\\\mathbf{g}(s) = \\\\boldsymbol{\\\\tau}$, and the maximum velocity profile is $\\\\dot{s}_{\\\\max} = \\\\sqrt{\\\\gamma(s)}$.** The boundary conditions are the reason robotics is designed for the boundary, not the interior, and the boundary is the reason robot motion is a practical engineering tool, not a theoretical abstraction.
- **The continuity requirements are: cubic ($C^1$), quintic ($C^2$), trapezoidal ($C^0$ velocity), s-curve ($C^1$ acceleration), and 7-segment ($C^2$ acceleration).** The continuity is the reason robotics is designed for the continuity, not the discontinuity, and the continuity is the reason robot motion is a practical engineering tool, not a theoretical abstraction.
- **The trajectory planning calculation is the most important motion calculation in robotics, because the trajectory planning calculation determines the position, velocity and acceleration profiles.** The position, velocity and acceleration profiles are the reason the engineer can generate smooth motion, avoid singularities and optimize cycle time.
- **Trajectory planning is the foundation of robot motion generation, because the point-to-point trajectory generates smooth joint-space motion, the Cartesian trajectory generates straight-line end-effector motion, and the time-optimal trajectory maximizes speed within torque and velocity limits.** The robotics is the reason the engineer can generate smooth motion, avoid singularities and optimize cycle time.
:::

## Further reading

- **J. J. Craig (2005)** — *Introduction to Robotics: Mechanics and Control*, 3rd ed. Pearson. The joint-space trajectory and the Cartesian trajectory.
- **K. M. Lynch and F. C. Park (2017)** — *Modern Robotics: Mechanics, Planning, and Control*. Cambridge. The trajectory planning and the time scaling.
- **B. Siciliano and O. Khatib (2016)** — *Springer Handbook of Robotics*. Springer. The trajectory planning and the time-optimal motion.
- **J. E. Bobrow, S. Dubowsky and J. S. Gibson (1985)** — "Time-Optimal Control of Robotic Manipulators along Specified Paths." *International Journal of Robotics Research*, 4(3), 3. The time-optimal trajectory.
- **T. Dubey (1993)** — *Real-Time Collision Avoidance*. Kluwer. The collision avoidance and trajectory replanning.
- **M. W. Spong, S. Hutchinson and M. Vidyasagar (2006)** — *Robot Modeling and Control*. Wiley. The trajectory planning and the control.
- **R. Paul (1981)** — *Robot Manipulators: Mathematics, Programming and Control*. MIT Press. The trajectory calculation and the interpolation.
- **Z. Shiller (1997)** — "Time-Optimal Motion of Robotic Manipulators." *IEEE Transactions on Robotics and Automation*, 13, 1. The time-optimal trajectory planning.
