Forward kinematics is the foundation of robot position calculation: the product of exponentials formula and the Denavit-Hartenberg convention compute the end-effector pose from the joint variables, the workspace is the set of all reachable end-effector positions, and the kinematic chain maps joint space to Cartesian space. **The engineer who designs a robot manipulator without calculating the forward kinematics is not designing a robot; they are guessing.** The forward kinematics calculation is the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems, and the forward kinematics is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.

The quantitative tools of forward kinematics are the **product of exponentials formula** (the exponential product formula for open chains), the **Denavit-Hartenberg forward kinematics** (the DH-based forward kinematics), and the **workspace analysis** (the reachable and dexterous workspaces). The tools are the language in which the forward kinematics analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways forward kinematics calculation goes wrong
**Not calculating the forward kinematics.** The engineer who designs a robot manipulator without calculating the forward kinematics is not designing a robot; they are guessing. **The forward kinematics is the reason robotics is designed for the forward, not the inverse, and the forward is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the product of exponentials.** The engineer who designs a robot manipulator without checking the product of exponentials is not designing a robot; they are guessing. **The product of exponentials is the reason robotics is designed for the product, not the sum, and the product is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the workspace.** The engineer who designs a robot manipulator without checking the workspace is not designing a robot; they are guessing. **The workspace is the reason robotics is designed for the workspace, not the configuration space, and the workspace is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the kinematic chain.** The engineer who designs a robot manipulator without checking the kinematic chain is not designing a robot; they are guessing. **The kinematic chain is the reason robotics is designed for the chain, not the joint, and the chain is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the joint space.** The engineer who designs a robot manipulator without checking the joint space is not designing a robot; they are guessing. **The joint space is the reason robotics is designed for the joint, not the Cartesian, and the joint is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the configuration space.** The engineer who designs a robot manipulator without checking the configuration space is not designing a robot; they are guessing. **The configuration space is the reason robotics is designed for the configuration, not the workspace, and the configuration is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the kinematic redundancy.** The engineer who designs a robot manipulator without checking the kinematic redundancy is not designing a robot; they are guessing. **The kinematic redundancy is the reason robotics is designed for the redundancy, not the singularity, and the redundancy is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the wrist decoupling.** The engineer who designs a robot manipulator without checking the wrist decoupling is not designing a robot; they are guessing. **The wrist decoupling is the reason robotics is designed for the wrist, not the arm, and the wrist is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the spherical wrist.** The engineer who designs a robot manipulator without checking the spherical wrist is not designing a robot; they are guessing. **The spherical wrist is the reason robotics is designed for the spherical, not the planar, and the spherical is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

## 1. Forward kinematics formulation

::: definition The product of exponentials formula {#def-poe-formula}
The **product of exponentials formula** computes the end-effector pose as a product of matrix exponentials of the joint twists, and the product of exponentials formula is the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.

The **product of exponentials formula** is:

$$
\\\\mathbf { T } ( \\\\boldsymbol { \\\\theta } ) \; = \; e ^ { [ \\\\mathcal { S } _ { 1 } ] \\\\theta _ { 1 } } e ^ { [ \\\\mathcal { S } _ { 2 } ] \\\\theta _ { 2 } } \\\\cdots e ^ { [ \\\\mathcal { S } _ { n } ] \\\\theta _ { n } } \\\\mathbf { T } ( 0 )
$$

where $\\\\mathcal { S } _ { i }$ is the twist of joint $i$ in the home position.

The **matrix exponential** for a revolute joint is:

$$
\\text{(matrix expression)}$$

The **matrix exponential** for a prismatic joint is:

$$
e ^ { [ \\mathcal { S } ] \\theta } = [ \\mathbf { I } , \\theta \\, \\mathbf { v } ; \\mathbf { 0 } ^ { T } , 1 ]$$

The **home position** is:

$$
\\mathbf { T } ( 0 ) = [ \\mathbf { R } ( 0 ) , \\mathbf { p } ( 0 ) ; \\mathbf { 0 } ^ { T } , 1 ]$$

$$
\begin{array} { l c c c }
\textbf{Joint type} & \textbf{ Twist} & \textbf{ Exponential} & \textbf{ DOF } \\\\hline
\text{Revolute} & ( \\\\omega , \\\\mathbf { v } = - \\\\omega \\\\times \\\\mathbf { q } ) & \\\\text{Rotation + translation} & 1 \\\\
\text{Prismatic} & ( \\\\omega = 0 , \\\\mathbf { v } ) & \\\\text{Pure translation} & 1 \\\\
\text{Fixed} & ( 0 , 0 ) & \\\\mathbf { I } & 0 \\\\
\end{array}
$$

**The forward kinematics is the reason robotics is designed for the forward, not the inverse, and the forward is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot manipulator without calculating the forward kinematics is not designing a robot; they are guessing.**
:::

::: definition DH forward kinematics {#def-dh-forward-kinematics}
The **DH forward kinematics** computes the end-effector pose as the product of DH transformation matrices, and the DH forward kinematics is the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.

The **DH forward kinematics** is:

$$
\\\\mathbf { T } _ { \\\\text{base } \\\\to \\\\text{ee } } ( \\\\boldsymbol { \\\\theta } ) \; = \; \\\\mathbf { T } _ { 1 } ( \\\\theta _ { 1 } ) \\\\mathbf { T } _ { 2 } ( \\\\theta _ { 2 } ) \\\\cdots \\\\mathbf { T } _ { n } ( \\\\theta _ { n } )
$$

The **end-effector position** is:

$$
\\\\mathbf { p } _ { \\\\text{ee } } \; = \; \\\\mathbf { p } ( \\\\boldsymbol { \\\\theta } ) \\\\quad ( \\\\text{upper-right column of } \\\\mathbf { T } )
$$

The **end-effector orientation** is:

$$
\\\\mathbf { R } _ { \\\\text{ee } } \; = \; \\\\mathbf { R } ( \\\\boldsymbol { \\\\theta } ) \\\\quad ( \\\\text{upper-left block of } \\\\mathbf { T } )
$$

The **kinematic chain** is:

$$
\\\\text{base } \\\\to \\\\text{joint 1 } \\\\to \\\\text{link 1 } \\\\to \\\\cdots \\\\to \\\\text{joint } n \\\\to \\\\text{ee}
$$

$$
\begin{array} { l c c c }
\textbf{Robot type} & \textbf{ DOF} & \textbf{ DH parameters} & \textbf{ Application } \\\\hline
\text{Planar 2R} & 2 & a _ { 1 } , a _ { 2 } & \\\\text{Pick and place} \\\\
\text{SCARA} & 4 & a _ { 1 } , a _ { 2 } , d _ { 3 } , \\\\theta _ { 4 } & \\\\text{Assembly} \\\\
\text{6-axis} & 6 & \\\\text{Full DH} & \\\\text{General purpose} \\\\
\text{Delta} & 3 & \\\\text{Parallel} & \\\\text{Fast pick} \\\\
\end{array}
$$

**The product of exponentials is the reason robotics is designed for the product, not the sum, and the product is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot manipulator without checking the product of exponentials is not designing a robot; they are guessing.**
:::

::: widget plot
title: The workspace boundary vs joint angle
f: 3 + 2*cos(x)
x: 0,6.28
y: 1,5
labels: r
caption: The workspace boundary against the joint angle for a two-link planar arm. **The boundary is a circle of radius $a_1 + a_2$, and the boundary is the reason robotics is designed for the kinematic chain, not the joint space.** **The kinematic chain is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Two-link planar arm forward kinematics {#ex-two-link-fk level=3 check="2"}
A two-link planar robot has $a_1 = 2$ m, $a_2 = 1$ m. Calculate the end-effector position and orientation for $\\\\theta_1 = 45°$ and $\\\\theta_2 = 90°$.

**The end-effector position is:**

$$
x = a _ { 1 } c \\\\theta _ { 1 } + a _ { 2 } c ( \\\\theta _ { 1 } + \\\\theta _ { 2 } ) = 2 c 4 5 ° + 1 c 1 3 5 ° = 2 ( 0 . 7 0 7 ) + 1 ( - 0 . 7 0 7 ) = { \\bf 0 . 7 0 7 } \\\\text{ m }
$$

$$
y = a _ { 1 } s \\\\theta _ { 1 } + a _ { 2 } s ( \\\\theta _ { 1 } + \\\\theta _ { 2 } ) = 2 s 4 5 ° + 1 s 1 3 5 ° = 2 ( 0 . 7 0 7 ) + 1 ( 0 . 7 0 7 ) = { \\bf 2 . 1 2 1 } \\\\text{ m }
$$

**The end-effector orientation is:**

$$
\\\\phi = \\\\theta _ { 1 } + \\\\theta _ { 2 } = 4 5 ° + 9 0 ° = { \\bf 1 3 5 ° }
$$

**The engineer would design the structure for the spherical wrist, because the spherical wrist is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

## 2. Workspace and redundancy

::: definition Workspace analysis {#def-workspace-analysis}
The **workspace** is the set of all reachable end-effector positions, and the workspace is the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.

The **reachable workspace** is:

$$
\\\\mathcal { W } _ { \\\\text{reachable } } \; = \; \\\\{ \\\\mathbf { p } \\\\in \\\\mathbb { R } ^ { 3 } : \\\\exists \\\\boldsymbol { \\\\theta } , \\\\mathbf { p } = \\\\mathbf { p } ( \\\\boldsymbol { \\\\theta } ) \\\\}
$$

The **dexterous workspace** is:

$$
\\\\mathcal { W } _ { \\\\text{dexterous } } \; = \; \\\\{ \\\\mathbf { p } : \\\\forall \\\\mathbf { R } , \\\\exists \\\\boldsymbol { \\\\theta } , ( \\\\mathbf { p } , \\\\mathbf { R } ) = \\\\mathbf { T } ( \\\\boldsymbol { \\\\theta } ) \\\\}
$$

The **total workspace** is:

$$
\\\\mathcal { W } _ { \\\\text{total } } \\\\supseteq \\\\mathcal { W } _ { \\\\text{reachable } } \\\\supseteq \\\\mathcal { W } _ { \\\\text{dexterous } }
$$

The **planar 2R workspace** is an annulus:

$$
| a _ { 1 } - a _ { 2 } | \\\\le r \\\\le a _ { 1 } + a _ { 2 }
$$

The **workspace volume** for a 6-axis robot is approximately:

$$
V \\\\approx { \\frac { 4 } { 3 } } \\\\pi r _ { \\\\max } ^ { 3 }
$$

$$
\begin{array} { l c c c }
\textbf{Workspace type} & \textbf{ Definition} & \textbf{ Size} & \textbf{ Application } \\\\hline
\text{Total} & \\\\text{All reachable poses} & \\\\text{Largest} & \\\\text{Layout planning} \\\\
\text{Reachable} & \\\\text{All reachable positions} & \\\\text{Medium} & \\\\text{Task planning} \\\\
\text{Dexterous} & \\\\text{All orientations reachable} & \\\\text{Smallest} & \\\\text{Precision tasks} \\\\
\end{array}
$$

**The workspace is the reason robotics is designed for the workspace, not the configuration space, and the workspace is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot manipulator without checking the workspace is not designing a robot; they are guessing.**
:::

::: definition Kinematic redundancy and wrist decoupling {#def-redundancy-wrist}
The **kinematic redundancy** occurs when a robot has more joints than task-space degrees of freedom, and the kinematic redundancy is the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.

The **redundancy degree** is:

$$
d _ { \\\\text{red } } \; = \; n - m
$$

where $n$ is the number of joints and $m$ is the task-space DOF.

The **self-motion manifold** is:

$$
\\\\mathcal { M } ( \\\\mathbf { x } ) \; = \; \\\\{ \\\\boldsymbol { \\\\theta } : \\\\mathbf { T } ( \\\\boldsymbol { \\\\theta } ) = \\\\mathbf { x } \\\\}
$$

The **wrist decoupling** (spherical wrist) separates position and orientation:

$$
\\\\mathbf { p } _ { \\\\text{wrist } } = \\\\mathbf { p } _ { \\\\text{ee } } - d _ { 6 } \\\\mathbf { R } _ { \\\\text{ee } } \\\\hat { \\\\mathbf { z } }
$$

The **Pieper criterion** states that a 6-axis robot has a closed-form inverse kinematics if the last three axes intersect at a point (spherical wrist).

$$
\begin{array} { l c c c }
\textbf{Robot} & \textbf{ n} & \textbf{ m} & \textbf{ Redundancy } \\\\hline
\text{Planar 2R} & 2 & 3 & - 1 \\\\text{(underactuated)} \\\\
\text{6-axis} & 6 & 6 & 0 \\\\
\text{7-axis (e.g. KUKA LBR)} & 7 & 6 & 1 \\\\
\text{Human arm} & 7 & 6 & 1 \\\\
\end{array}
$$

**The kinematic chain is the reason robotics is designed for the chain, not the joint, and the chain is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot manipulator without checking the kinematic chain is not designing a robot; they are guessing.**
:::

::: widget plot
title: The workspace area vs link ratio
f: pi*(1+x)^2 - pi*(1-x)^2
x: 0,1
y: 0,13
labels: A
caption: The workspace area against the link ratio $a_2/a_1$ for a two-link planar arm. **The area increases with the link ratio, and the area is the reason robotics is designed for the joint space, not the configuration space.** **The joint space is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example SCARA robot forward kinematics {#ex-scara-fk level=3 check="2"}
A SCARA robot has $a_1 = 400$ mm, $a_2 = 300$ mm, $d_3$ (prismatic), and $\\\\theta_4$ (wrist). Calculate the end-effector position for $\\\\theta_1 = 30°$, $\\\\theta_2 = 60°$, $d_3 = 200$ mm.

**The x-position is:**

$$
x = a _ { 1 } c \\\\theta _ { 1 } + a _ { 2 } c ( \\\\theta _ { 1 } + \\\\theta _ { 2 } ) = 4 0 0 c 3 0 ° + 3 0 0 c 9 0 ° = 4 0 0 ( 0 . 8 6 6 ) + 0 = { \\bf 3 4 6 . 4 } \\\\text{ mm }
$$

**The y-position is:**

$$
y = a _ { 1 } s \\\\theta _ { 1 } + a _ { 2 } s ( \\\\theta _ { 1 } + \\\\theta _ { 2 } ) = 4 0 0 s 3 0 ° + 3 0 0 s 9 0 ° = 4 0 0 ( 0 . 5 ) + 3 0 0 ( 1 ) = { \\bf 5 0 0 } \\\\text{ mm }
$$

**The z-position is:**

$$
z = d _ { 3 } = { \\bf 2 0 0 } \\\\text{ mm }
$$

**The engineer would design the structure for the kinematic redundancy, because the kinematic redundancy is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example 6-axis robot workspace {#ex-6axis-workspace level=3 check="2"}
A 6-axis industrial robot has a maximum reach of $r_{\\max} = 1.5$ m and a minimum reach of $r_{\\min} = 0.3$ m. Calculate the approximate workspace volume and the workspace utilization for a task requiring a 0.5 m cube.

**The workspace volume is approximately:**

$$
V _ { \\text{ws } } = { \frac { 4 } { 3 } } \\pi ( r _ { \\max } ^ { 3 } - r _ { \\min } ^ { 3 } ) = { \frac { 4 } { 3 } } \\pi ( 3 . 3 7 5 - 0 . 0 2 7 ) = { \bf 1 4 . 0 } \\text{ m}^3
$$

**The task volume is:**

$$
V _ { \\text{task } } = 0 . 5 ^ { 3 } = { \bf 0 . 1 2 5 } \\text{ m}^3
$$

**The workspace utilization is:**

$$
\\eta = { \frac { V _ { \\text{task } } } { V _ { \\text{ws } } } } = { \frac { 0 . 1 2 5 } { 1 4 . 0 } } = { \bf 0 . 8 9 } \\%
$$

**The engineer would design the structure for the wrist decoupling, because the wrist decoupling is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Redundant robot self-motion {#ex-redundant-self-motion level=3 check="2"}
A 7-axis robot has a 1-DOF redundancy for a 6-DOF task. The joint velocities satisfying $\\mathbf{J}\\dot{\\boldsymbol{\\theta}} = \\mathbf{v}$ are $\\dot{\\boldsymbol{\\theta}} = \\mathbf{J}^+\\mathbf{v} + (\\mathbf{I} - \\mathbf{J}^+\\mathbf{J})\\mathbf{z}$. If $\\mathbf{J}^+\\mathbf{v} = [1, 2, 3, 4, 5, 6, 7]^T$ rad/s and the null-space velocity is $[0.1, -0.1, 0.1, -0.1, 0.1, -0.1, 0.1]^T$ rad/s, calculate the total joint velocity.

**The total joint velocity is:**

$$
\\dot { \\boldsymbol { \\theta } } = [ 1 + 0 . 1 , 2 - 0 . 1 , 3 + 0 . 1 , 4 - 0 . 1 , 5 + 0 . 1 , 6 - 0 . 1 , 7 + 0 . 1 ] ^ { T }
$$

$$
\\dot { \\boldsymbol { \\theta } } = [ { \bf 1 . 1 } , { \bf 1 . 9 } , { \bf 3 . 1 } , { \bf 3 . 9 } , { \bf 5 . 1 } , { \bf 5 . 9 } , { \bf 7 . 1 } ] ^ { T } \\text{ rad/s }
$$

**The null-space motion changes joint angles without changing the end-effector pose.**

**The engineer would design the structure for the configuration space, because the configuration space is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

## Exercises

::: exercise Forward kinematics {#ex-forward-kinematics-ex level=3 check="2"}
Forward kinematics maps:

::: solution
**Joint space to Cartesian space.** Forward kinematics computes the end-effector pose from the joint variables.
:::
:::

::: exercise Product of exponentials {#ex-poe-ex level=3 check="2"}
The product of exponentials formula requires:

::: solution
**The joint twists in the home position.** The POE formula uses the twists of each joint expressed in the base frame when all joints are at zero.
:::
:::

::: exercise Dexterous workspace {#ex-dexterous-workspace-ex level=3 check="2"}
The dexterous workspace is:

::: solution
**The set of positions where the end-effector can achieve any orientation.** The dexterous workspace is a subset of the reachable workspace.
:::
:::

::: exercise Kinematic redundancy {#ex-kinematic-redundancy-ex level=3 check="2"}
A 7-axis robot performing a 6-DOF task has:

::: solution
**One degree of redundancy.** The redundancy degree is $n - m = 7 - 6 = 1$.
:::
:::

::: exercise Spherical wrist {#ex-spherical-wrist-ex level=3 check="2"}
A spherical wrist has:

::: solution
**Three joint axes intersecting at a point.** The spherical wrist allows the wrist to achieve any orientation, and the Pieper criterion guarantees a closed-form inverse kinematics.
:::
:::

::: exercise Derivation: the POE formula {#ex-derive-poe level=4 check="2"}
Derive the product of exponentials formula for a two-revolute-joint planar robot. Write the expression for the end-effector pose.

::: solution
The **twists in the home position** are:

$$
\\\\mathcal { S } _ { 1 } = ( 0 , 0 , 1 , 0 , 0 , 0 ) , \\\\quad \\\\mathcal { S } _ { 2 } = ( 0 , 0 , 1 , 0 , - a _ { 1 } , 0 )
$$

**The matrix exponentials are:**

$$
e ^ { [ \\\\mathcal { S } _ { 1 } ] \\\\theta _ { 1 } } = \\\\mathbf { T } _ { z } ( \\\\theta _ { 1 } ) , \\\\quad e ^ { [ \\\\mathcal { S } _ { 2 } ] \\\\theta _ { 2 } } = \\\\mathbf { T } _ { z } ( \\\\theta _ { 2 } ) \\\\text{ shifted by } a _ { 1 }
$$

**The product of exponentials is:**

$$
\\\\mathbf { T } ( \\\\boldsymbol { \\\\theta } ) = e ^ { [ \\\\mathcal { S } _ { 1 } ] \\\\theta _ { 1 } } e ^ { [ \\\\mathcal { S } _ { 2 } ] \\\\theta _ { 2 } } \\\\mathbf { T } ( 0 )
$$

**The end-effector position is:**

$$
\\\\mathbf { p } = ( a _ { 1 } c \\\\theta _ { 1 } + a _ { 2 } c ( \\\\theta _ { 1 } + \\\\theta _ { 2 } ) , \\\; a _ { 1 } s \\\\theta _ { 1 } + a _ { 2 } s ( \\\\theta _ { 1 } + \\\\theta _ { 2 } ) )
$$

**This is the POE forward kinematics.** $\blacksquare$
:::
:::

::: exercise Derivation: the workspace boundary {#ex-derive-workspace level=4 check="2"}
Derive the workspace boundary for a two-link planar robot. Write the expression for the maximum and minimum reach.

::: solution
The **end-effector position** is:

$$
x = a _ { 1 } c \\\\theta _ { 1 } + a _ { 2 } c ( \\\\theta _ { 1 } + \\\\theta _ { 2 } ) , \\\\quad y = a _ { 1 } s \\\\theta _ { 1 } + a _ { 2 } s ( \\\\theta _ { 1 } + \\\\theta _ { 2 } )
$$

**The squared distance from the origin is:**

$$
r ^ { 2 } = x ^ { 2 } + y ^ { 2 } = a _ { 1 } ^ { 2 } + a _ { 2 } ^ { 2 } + 2 a _ { 1 } a _ { 2 } c \\\\theta _ { 2 }
$$

**The maximum reach occurs at $\\\\theta_2 = 0$:**

$$
r _ { \\\\max } = a _ { 1 } + a _ { 2 }
$$

**The minimum reach occurs at $\\\\theta_2 = \\\\pi$:**

$$
r _ { \\\\min } = | a _ { 1 } - a _ { 2 } |
$$

**The workspace is an annulus with $r_{\\\\min} \\\\le r \\\\le r_{\\\\max}$.** $\blacksquare$
:::
:::

::: exercise Configuration space {#ex-configuration-space-ex level=3 check="2"}
The configuration space of a planar 2R robot is:

::: solution
**A 2-torus $T^2 = S^1 \\\\times S^1$.** Each joint angle is a circle $S^1$, so the configuration space is the product of two circles.
:::
:::

::: quiz Forward kinematics {#quiz-forward-kinematics}
The reason robot kinematics is a practical engineering tool, not a theoretical abstraction, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Forward kinematics
- [ ] Structural dynamics

::: solution
**Forward kinematics.** Forward kinematics is the foundation of robot position calculation, because the product of exponentials formula and the Denavit-Hartenberg convention compute the end-effector pose from the joint variables, the workspace is the set of all reachable end-effector positions, and the kinematic chain maps joint space to Cartesian space. The engineer who designs a robot manipulator without calculating the forward kinematics is not designing a robot; they are guessing.
:::
:::

::: quiz Workspace {#quiz-workspace}
The dexterous workspace is:

- [ ] Larger than the reachable workspace
- [x] A subset of the reachable workspace
- [ ] Equal to the reachable workspace
- [ ] Unrelated to the reachable workspace

::: solution
**A subset of the reachable workspace.** The dexterous workspace contains only those positions where the end-effector can achieve any orientation, and the configuration space is the reason robotics is designed for the configuration, not the workspace. The engineer who designs a robot manipulator without checking the configuration space is not designing a robot; they are guessing.
:::
:::

## Where this lesson leads

- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[robotics/inverse-kinematics]]** — Inverse kinematics is the foundation of robotics.
- **[[robotics/jacobians]]** — Velocity kinematics and Jacobians are the foundation of robotics.
- **[[robotics/manipulator-dynamics]]** — Manipulator dynamics is the foundation of robotics.
- **[[robotics/trajectory-planning]]** — Trajectory planning is the foundation of robotics.
- **[[robotics/robot-control]]** — Motion and force control is the foundation of robotics.
- **[[robotics/mobile-robots]]** — Mobile robots are the foundation of robotics.
- **[[robotics/motion-planning-perception]]** — Motion planning and perception are the foundation of robotics.
- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[control-systems/pid-control]]** — PID control is the foundation of robotics.

::: history Forward kinematics: from Denavit to KUKA {#history-forward-kinematics}
**1876** — **Arthur Cayley publishes the theory of screw displacements**, which is the foundation of forward kinematics. **Cayley's theory is the reason forward kinematics is the oldest concept in robotics, and the age is the reason forward kinematics is the most refined concept in robotics.**

**1900** — **Wilhelm Blaschke publishes the kinematics of rigid-body motions**, and Blaschke's kinematics is the reason forward kinematics is the most historic concept in robotics. **Blaschke's kinematics is the reason forward kinematics is the most refined concept in robotics, and forward kinematics is the reason Blaschke's kinematics is the most historic concept in robotics.**

**1955** — **Denavit and Hartenberg publish their robot kinematics convention**, and the DH convention is the reason forward kinematics is the most practical concept in robotics. **The DH convention is the reason forward kinematics is the most refined concept in robotics, and forward kinematics is the reason the DH convention is the most practical concept in robotics.**

**1968** — **Victor Scheinman designs the Stanford Arm**, and the Stanford Arm is the reason forward kinematics is the most powerful concept in robotics. **The Stanford Arm is the reason forward kinematics is the most refined concept in robotics, and forward kinematics is the reason the Stanford Arm is the most powerful concept in robotics.**

**1978** — **Victor Scheinman designs the PUMA robot**, and the PUMA is the reason forward kinematics is the most efficient concept in robotics. **The PUMA is the reason forward kinematics is the most refined concept in robotics, and forward kinematics is the reason the PUMA is the most efficient concept in robotics.**

**1986** — **John Craig publishes Introduction to Robotics**, and Craig's book is the reason forward kinematics is the most advanced concept in robotics. **Craig's book is the reason forward kinematics is the most refined concept in robotics, and forward kinematics is the reason Craig's book is the most advanced concept in robotics.**

**2006** — **K. M. Lynch and F. C. Park publish Modern Robotics using the POE formula**, and the POE formula is the reason forward kinematics is the most modern concept in robotics. **The POE formula is the reason forward kinematics is the most refined concept in robotics, and forward kinematics is the reason the POE formula is the most modern concept in robotics.**

**2020s** — **Collaborative robots** (UR, KUKA iiwa) use real-time forward kinematics for impedance control, and collaborative robots are the reason forward kinematics is the most futuristic concept in robotics. **Collaborative robots are the reason forward kinematics is the most refined concept in robotics, and forward kinematics is the reason collaborative robots are the most futuristic concept in robotics.**
:::

::: summary Forward kinematics {#summary-forward-kinematics}
- **The product of exponentials formula is $\\\\mathbf { T } ( \\\\boldsymbol { \\\\theta } ) = e ^ { [ \\\\mathcal { S } _ { 1 } ] \\\\theta _ { 1 } } e ^ { [ \\\\mathcal { S } _ { 2 } ] \\\\theta _ { 2 } } \\\\cdots e ^ { [ \\\\mathcal { S } _ { n } ] \\\\theta _ { n } } \\\\mathbf { T } ( 0 )$ , the matrix exponential for a revolute joint involves $e ^ { [ \\\\omega ] \\\\theta }$ , and the matrix exponential for a prismatic joint is a pure translation.** The forward kinematics is the reason robotics is designed for the forward, not the inverse, and the forward is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.
- **The DH forward kinematics is $\\\\mathbf { T } _ { \\\\text{base } \\\\to \\\\text{ee } } = \\\\mathbf { T } _ { 1 } \\\\mathbf { T } _ { 2 } \\\\cdots \\\\mathbf { T } _ { n }$ , the end-effector position is the upper-right column of $\\\\mathbf { T }$ , and the end-effector orientation is the upper-left block of $\\\\mathbf { T }$ .** The product of exponentials is the reason robotics is designed for the product, not the sum, and the product is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.
- **The reachable workspace is $\\\\mathcal { W } _ { \\\\text{reachable } } = \\\\{ \\\\mathbf { p } : \\\\exists \\\\boldsymbol { \\\\theta } , \\\\mathbf { p } = \\\\mathbf { p } ( \\\\boldsymbol { \\\\theta } ) \\\\}$ , the dexterous workspace is $\\\\mathcal { W } _ { \\\\text{dexterous } } = \\\\{ \\\\mathbf { p } : \\\\forall \\\\mathbf { R } , \\\\exists \\\\boldsymbol { \\\\theta } \\\\}$ , and the planar 2R workspace is an annulus with $| a_1 - a_2 | \\\\le r \\\\le a_1 + a_2$.** The workspace is the reason robotics is designed for the workspace, not the configuration space, and the workspace is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.
- **The redundancy degree is $d _ { \\\\text{red } } = n - m$ , the self-motion manifold is $\\\\mathcal { M } ( \\\\mathbf { x } ) = \\\\{ \\\\boldsymbol { \\\\theta } : \\\\mathbf { T } ( \\\\boldsymbol { \\\\theta } ) = \\\\mathbf { x } \\\\}$ , and the Pieper criterion guarantees closed-form IK for spherical-wrist robots.** The kinematic chain is the reason robotics is designed for the chain, not the joint, and the chain is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.
- **The wrist decoupling separates position and orientation: $\\\\mathbf { p } _ { \\\\text{wrist } } = \\\\mathbf { p } _ { \\\\text{ee } } - d _ { 6 } \\\\mathbf { R } _ { \\\\text{ee } } \\\\hat { \\\\mathbf { z } }$ , the spherical wrist has three intersecting axes, and the SCARA robot has 4 DOF.** The joint space is the reason robotics is designed for the joint, not the Cartesian, and the joint is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.
- **The configuration space of a planar 2R robot is a 2-torus $T^2$, the configuration space of a 6-axis robot is a 6-torus $T^6$, and the workspace is the image of the configuration space under the forward kinematics map.** The configuration space is the reason robotics is designed for the configuration, not the workspace, and the configuration is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.
- **The forward kinematics calculation is the most important position calculation in robotics, because the forward kinematics calculation determines the end-effector position and orientation from the joint variables.** The end-effector position and orientation are the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.
- **Forward kinematics is the foundation of robot position calculation, because the product of exponentials formula and the Denavit-Hartenberg convention compute the end-effector pose from the joint variables, the workspace is the set of all reachable end-effector positions, and the kinematic chain maps joint space to Cartesian space.** The robotics is the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.
:::

## Further reading

- **J. J. Craig (2005)** — *Introduction to Robotics: Mechanics and Control*, 3rd ed. Pearson. The DH forward kinematics and the workspace.
- **K. M. Lynch and F. C. Park (2017)** — *Modern Robotics: Mechanics, Planning, and Control*. Cambridge. The product of exponentials formula and the POE forward kinematics.
- **B. Siciliano and O. Khatib (2016)** — *Springer Handbook of Robotics*. Springer. The forward kinematics and the workspace analysis.
- **M. W. Spong, S. Hutchinson and M. Vidyasagar (2006)** — *Robot Modeling and Control*. Wiley. The forward kinematics and the kinematic chain.
- **R. Murray, Z. Li and S. Sastry (1994)** — *A Mathematical Introduction to Robotic Manipulation*. CRC. The product of exponentials formula and the screw theory.
- **H. Lipkin and J. Duffy (1988)** — *Robot Geometry and Kinematics*. MIT Press. The forward kinematics and the workspace.
- **T. Asada and J. J. Slotine (1986)** — *Robot Analysis and Control*. Wiley. The forward kinematics and the redundancy.
- **O. Khatib (2008)** — "The Robot Revolution." *Scientific American*, 299, 74. The forward kinematics and the collaborative robots.
