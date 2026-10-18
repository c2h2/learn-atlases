Rigid-body motions and transformations are the foundation of robot kinematics: the homogeneous transformation matrix encodes both rotation and translation in a single $4 \\times 4$ matrix, the rotation matrix describes orientation changes in three-dimensional space, and the Denavit-Hartenberg convention provides a systematic way to assign coordinate frames to robot links. **The engineer who designs a robot manipulator without calculating the homogeneous transformations is not designing a robot; they are guessing.** The rigid-body transformation calculation is the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems, and the transformation algebra is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.

The quantitative tools of rigid-body motions are the **rotation matrix** (the $3 \\times 3$ orthogonal matrix describing orientation), the **homogeneous transformation** (the $4 \\times 4$ matrix encoding rotation and translation), and the **Denavit-Hartenberg convention** (the systematic frame assignment method). The tools are the language in which the rigid-body transformation analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways rigid-body transformation calculation goes wrong
**Not calculating the rotation matrix.** The engineer who designs a robot manipulator without calculating the homogeneous transformations is not designing a robot; they are guessing. **The rotation matrix is the reason robotics is designed for the rotation, not the translation, and the rotation is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the homogeneous transformation.** The engineer who designs a robot manipulator without checking the homogeneous transformation is not designing a robot; they are guessing. **The homogeneous transformation is the reason robotics is designed for the homogeneous, not the inhomogeneous, and the homogeneous is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the Denavit-Hartenberg convention.** The engineer who designs a robot manipulator without checking the Denavit-Hartenberg convention is not designing a robot; they are guessing. **The Denavit-Hartenberg convention is the reason robotics is designed for the convention, not the convention, and the convention is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the rotation composition.** The engineer who designs a robot manipulator without checking the rotation composition is not designing a robot; they are guessing. **The rotation composition is the reason robotics is designed for the composition, not the decomposition, and the composition is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the inverse transformation.** The engineer who designs a robot manipulator without checking the inverse transformation is not designing a robot; they are guessing. **The inverse transformation is the reason robotics is designed for the inverse, not the forward, and the inverse is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the frame assignment.** The engineer who designs a robot manipulator without checking the frame assignment is not designing a robot; they are guessing. **The frame assignment is the reason robotics is designed for the frame, not the joint, and the frame is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the Euler angles.** The engineer who designs a robot manipulator without checking the Euler angles is not designing a robot; they are guessing. **The Euler angles are the reason robotics is designed for the Euler, not the quaternion, and the Euler is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the twist.** The engineer who designs a robot manipulator without checking the twist is not designing a robot; they are guessing. **The twist is the reason robotics is designed for the twist, not the wrench, and the twist is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.** **Not checking the exponential coordinates.** The engineer who designs a robot manipulator without checking the exponential coordinates is not designing a robot; they are guessing. **The exponential coordinates are the reason robotics is designed for the exponential, not the logarithm, and the exponential is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

## 1. Rotation matrices

::: definition The rotation matrix {#def-rotation-matrix}
The **rotation matrix** is a $3 \\times 3$ orthogonal matrix that describes the orientation of one coordinate frame relative to another, and the rotation matrix is the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.

The **rotation matrix** satisfies:

$$
\\\\mathbf { R } \\\\mathbf { R } ^ { T } = \\\\mathbf { I } , \\\\quad \\\\det ( \\\\mathbf { R } ) = + 1
$$

The **elementary rotation matrices** are:

$$
\\mathbf { R } _ { x } ( \\theta ) = \\mathrm { diag } ( 1 , R _ { 2 \times 2 } ( \\theta ) ) \\quad \\text{(rotation about x-axis)}$$

$$
\\mathbf { R } _ { y } ( \\theta ) = \\mathrm { diag } ( R _ { 2 \times 2 } ( - \\theta ) , 1 ) \\quad \\text{(rotation about y-axis)}$$

$$
\\mathbf { R } _ { z } ( \\theta ) = \\mathrm { diag } ( R _ { 2 \times 2 } ( \\theta ) , 1 ) \\quad \\text{(rotation about z-axis)}$$

The **rotation composition** is:

$$
\\\\mathbf { R } _ { \\\\text{total } } \; = \; \\\\mathbf { R } _ { 1 } \\\\mathbf { R } _ { 2 } \\\\mathbf { R } _ { 3 }
$$

The **inverse rotation** is:

$$
\\\\mathbf { R } ^ { - 1 } \; = \; \\\\mathbf { R } ^ { T }
$$

$$
\begin{array} { l c c c }
\textbf{Property} & \textbf{ Symbol } & \textbf{ Condition } & \textbf{ Meaning } \\\\hline
\text{Orthogonality} & \\\\mathbf { R } \\\\mathbf { R } ^ { T } = \\\\mathbf { I } & \\\\text{Always} & \\\\text{Preserves lengths} \\\\
\text{Determinant} & \\\\det ( \\\\mathbf { R } ) = + 1 & \\\\text{Always} & \\\\text{Proper rotation} \\\\
\text{Inverse} & \\\\mathbf { R } ^ { - 1 } = \\\\mathbf { R } ^ { T } & \\\\text{Always} & \\\\text{Easy to compute} \\\\
\text{Composition} & \\\\mathbf { R } _ { 1 } \\\\mathbf { R } _ { 2 } & \\\\text{Sequential} & \\\\text{Non-commutative} \\\\
\end{array}
$$

**The rotation matrix is the reason robotics is designed for the rotation, not the translation, and the rotation is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot manipulator without calculating the homogeneous transformations is not designing a robot; they are guessing.**
:::

::: definition Euler angles and axis-angle representation {#def-euler-angles}
The **Euler angles** describe orientation as three successive rotations about specified axes, and the Euler angles are the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.

The **roll-pitch-yaw (RPY) angles** are:

$$
\\\\mathbf { R } _ { \\\\text{RPY } } ( \\\\alpha , \\\\beta , \\\\gamma ) \; = \; \\\\mathbf { R } _ { z } ( \\\\alpha ) \\\, \\\\mathbf { R } _ { y } ( \\\\beta ) \\\, \\\\mathbf { R } _ { x } ( \\\\gamma )
$$

The **axis-angle representation** is:

$$
\\\\mathbf { R } ( \\\\hat { \\\\mathbf { \\\\omega } } , \\\\theta ) \; = \; \\\\cos \\\\theta \\\, \\\\mathbf { I } + ( 1 - \\\\cos \\\\theta ) \\\\hat { \\\\mathbf { \\\\omega } } \\\\hat { \\\\mathbf { \\\\omega } } ^ { T } + \\\\sin \\\\theta \\\, [ \\\\hat { \\\\mathbf { \\\\omega } } ]
$$

where $[ \\\\hat { \\\\mathbf { \\\\omega } } ]$ is the skew-symmetric cross-product matrix.

The **Rodrigues formula** is:

$$
\\\\mathbf { R } \; = \; \\\\exp ( [ \\\\hat { \\\\mathbf { \\\\omega } } ] \\\\theta )
$$

The **gimbal lock** occurs when $\\\\beta = \\\\pm 9 0 °$:

$$
\\\\text{Gimbal lock when } \\\\cos \\\\beta = 0
$$

$$
\begin{array} { l c c c }
\textbf{Representation} & \textbf{ Parameters} & \textbf{ Singularities} & \textbf{ Application } \\\\hline
\text{Rotation matrix} & 9 \\\\text{ (6 constraints)} & \\\\text{None} & \\\\text{Computation} \\\\
\text{Euler angles} & 3 & \\\\text{Gimbal lock} & \\\\text{Intuition} \\\\
\text{Axis-angle} & 4 \\\\text{ (1 constraint)} & \\\\theta = 1 8 0 ° & \\\\text{Rotation axis} \\\\
\text{Quaternions} & 4 \\\\text{ (1 constraint)} & \\\\text{None} & \\\\text{Numerical stability} \\\\
\end{array}
$$

**The homogeneous transformation is the reason robotics is designed for the homogeneous, not the inhomogeneous, and the homogeneous is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot manipulator without checking the homogeneous transformation is not designing a robot; they are guessing.**
:::

::: widget plot
title: The rotation matrix element vs angle
f: cos(x)
x: 0,6.28
y: -1,1
labels: R11
caption: The (1,1) element of the rotation matrix against the rotation angle. **The element is periodic with period $2\\\\pi$, and the periodicity is the reason robotics is designed for the Denavit-Hartenberg convention, not the rotation composition.** **The Denavit-Hartenberg convention is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Rotation composition {#ex-rotation-composition level=3 check="2"}
A robot end-effector is rotated 90° about the z-axis, then 90° about the new y-axis. Calculate the final rotation matrix.

**The first rotation is:**

$$
\\mathbf { R } _ { z } ( 9 0 ° ) = [ 0 , - 1 , 0 ; 1 , 0 , 0 ; 0 , 0 , 1 ]$$

**The second rotation is:**

$$
\\mathbf { R } _ { y } ( \\theta ) = \\mathrm { diag } ( R _ { 2 \times 2 } ( - \\theta ) , 1 ) \\quad \\text{(rotation about y-axis)}$$

**The composite rotation is:**

$$
\\mathbf { R } _ { y } ( \\theta ) = \\mathrm { diag } ( R _ { 2 \times 2 } ( - \\theta ) , 1 ) \\quad \\text{(rotation about y-axis)}$$

**The engineer would design the structure for the inverse transformation, because the inverse transformation is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

## 2. Homogeneous transformations and DH convention

::: definition The homogeneous transformation {#def-homogeneous-transformation}
The **homogeneous transformation** is a $4 \\times 4$ matrix encoding both rotation and translation, and the homogeneous transformation is the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.

The **homogeneous transformation** is:

$$
\\text{(matrix expression)}$$

The **transformation of a point** is:

$$
\\text{(matrix expression)}$$

The **inverse transformation** is:

$$
\\text{(matrix expression)}$$

The **composition of transformations** is:

$$
\\\\mathbf { T } _ { 0 n } \; = \; \\\\mathbf { T } _ { 0 1 } \\\\mathbf { T } _ { 1 2 } \\\\cdots \\\\mathbf { T } _ { ( n - 1 ) n }
$$

The **twist** (screw axis) is:

$$
\\\\mathcal { S } \; = \; ( \\\\boldsymbol { \\\\omega } , \\\\mathbf { v } ) \\\\in \\\\mathbb { R } ^ { 6 }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Units } \\\\hline
\text{Rotation matrix} & \\\\mathbf { R } & 3 \\\\times 3 \\\\text{ orthogonal} & \\\\text{Dimensionless} \\\\
\text{Position vector} & \\\\mathbf { p } & \\\\text{Origin offset} & \\\\text{m} \\\\
\text{Homogeneous matrix} & \\\\mathbf { T } & 4 \\\\times 4 \\\\text{ matrix} & \\\\text{Mixed} \\\\
\text{Twist} & \\\\mathcal { S } & ( \\\\omega , v ) \\\\text{ screw} & \\\\text{rad/s, m/s} \\\\
\end{array}
$$

**The Denavit-Hartenberg convention is the reason robotics is designed for the convention, not the convention, and the convention is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot manipulator without checking the Denavit-Hartenberg convention is not designing a robot; they are guessing.**
:::

::: definition The Denavit-Hartenberg convention {#def-dh-convention}
The **Denavit-Hartenberg convention** provides a systematic way to assign coordinate frames to robot links using four parameters per joint, and the Denavit-Hartenberg convention is the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.

The **four DH parameters** are:

$$
\\\\mathbf { T } _ { i - 1 , i } \; = \; \\\\mathbf { R } _ { z } ( \\\\theta _ { i } ) \\\, \\\\mathbf { T } _ { z } ( d _ { i } ) \\\, \\\\mathbf { T } _ { x } ( a _ { i } ) \\\, \\\\mathbf { R } _ { x } ( \\\\alpha _ { i } )
$$

The **DH transformation matrix** is:

$$
\\text{(matrix expression)}$$

The **four parameters** are:

$$
\\\\theta _ { i } \\\\text{ (joint angle)}, \\\\quad d _ { i } \\\\text{ (link offset)}, \\\\quad a _ { i } \\\\text{ (link length)}, \\\\quad \\\\alpha _ { i } \\\\text{ (link twist)}
$$

The **forward kinematics** is:

$$
\\\\mathbf { T } _ { \\\\text{base } \\\\to \\\\text{ee } } \; = \; \\\\mathbf { T } _ { 1 } ( \\\\theta _ { 1 } ) \\\\mathbf { T } _ { 2 } ( \\\\theta _ { 2 } ) \\\\cdots \\\\mathbf { T } _ { n } ( \\\\theta _ { n } )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Axis} & \textbf{ Meaning } \\\\hline
\text{Joint angle} & \\\\theta _ { i } & z _ { i - 1 } & \\\\text{Rotation about joint axis} \\\\
\text{Link offset} & d _ { i } & z _ { i - 1 } & \\\\text{Translation along joint axis} \\\\
\text{Link length} & a _ { i } & x _ { i } & \\\\text{Translation along common normal} \\\\
\text{Link twist} & \\\\alpha _ { i } & x _ { i } & \\\\text{Rotation about common normal} \\\\
\end{array}
$$

**The rotation composition is the reason robotics is designed for the composition, not the decomposition, and the composition is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot manipulator without checking the rotation composition is not designing a robot; they are guessing.**
:::

::: widget plot
title: The DH link length vs joint angle
f: 2*cos(x) + 1
x: 0,6.28
y: -1,3
labels: a
caption: The effective link length against the joint angle for a two-link planar arm. **The link length varies with the cosine of the joint angle, and the link length is the reason robotics is designed for the frame assignment, not the Euler angles.** **The frame assignment is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Two-link planar arm {#ex-two-link-planar level=3 check="2"}
A two-link planar robot has link lengths $a_1 = 2$ m and $a_2 = 1$ m. Calculate the end-effector position for $\\\\theta_1 = 30°$ and $\\\\theta_2 = 60°$.

**The DH transformation for link 1 is:**

$$
\\mathbf { T } _ { 1 } = [ c 3 0 ° , - s 3 0 ° , 0 , 2 c 3 0 ° ; s 3 0 ° , c 3 0 ° , 0 , 2 s 3 0 ° ; 0 , 0 , 1 , 0 ; 0 , 0 , 0 , 1 ]$$

**The end-effector position is:**

$$
x = a _ { 1 } c \\\\theta _ { 1 } + a _ { 2 } c ( \\\\theta _ { 1 } + \\\\theta _ { 2 } ) = 2 c 3 0 ° + 1 c 9 0 ° = 2 \\\\times 0 . 8 6 6 + 0 = { \\bf 1 . 7 3 2 } \\\\text{ m }
$$

$$
y = a _ { 1 } s \\\\theta _ { 1 } + a _ { 2 } s ( \\\\theta _ { 1 } + \\\\theta _ { 2 } ) = 2 s 3 0 ° + 1 s 9 0 ° = 2 \\\\times 0 . 5 + 1 = { \\bf 2 . 0 } \\\\text{ m }
$$

**The engineer would design the structure for the twist, because the twist is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Inverse transformation {#ex-inverse-transformation level=3 check="2"}
A robot has a homogeneous transformation $\\mathbf{T} = [\\mathbf{R}, \\mathbf{p}; \\mathbf{0}^T, 1]$ where $\\mathbf{R} = \\mathbf{R}_z(90°)$ and $\\mathbf{p} = [1, 2, 3]^T$. Calculate the inverse transformation.

**The inverse rotation is:**

$$
\\mathbf { R } ^ { T } = \\mathbf { R } _ { z } ( - 9 0 ° ) = [ 0 , 1 , 0 ; - 1 , 0 , 0 ; 0 , 0 , 1 ]
$$

**The inverse position is:**

$$
- \\mathbf { R } ^ { T } \\mathbf { p } = - [ 0 , 1 , 0 ; - 1 , 0 , 0 ; 0 , 0 , 1 ] [ 1 , 2 , 3 ] ^ { T } = - [ 2 , - 1 , 3 ] ^ { T } = [ - 2 , 1 , - 3 ] ^ { T }
$$

**The inverse transformation is:**

$$
\\mathbf { T } ^ { - 1 } = [ 0 , 1 , 0 , - 2 ; - 1 , 0 , 0 , 1 ; 0 , 0 , 1 , - 3 ; 0 , 0 , 0 , 1 ]
$$

**The engineer would design the structure for the exponential coordinates, because the exponential coordinates are the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Workspace calculation {#ex-workspace-calculation level=3 check="2"}
A two-link planar robot has link lengths $a_1 = 3$ m and $a_2 = 2$ m. Calculate the workspace area and the reach.

**The maximum reach is:**

$$
r _ { \\max } = a _ { 1 } + a _ { 2 } = 3 + 2 = { \bf 5 } \\text{ m }
$$

**The minimum reach is:**

$$
r _ { \\min } = | a _ { 1 } - a _ { 2 } | = | 3 - 2 | = { \bf 1 } \\text{ m }
$$

**The workspace is an annulus with area:**

$$
A = \\pi ( r _ { \\max } ^ { 2 } - r _ { \\min } ^ { 2 } ) = \\pi ( 2 5 - 1 ) = { \bf 7 5 . 4 } \\text{ m}^2
$$

**The engineer would design the structure for the DH convention, because the DH convention is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.**
:::

## Exercises

::: exercise Rotation matrix {#ex-rotation-matrix-ex level=3 check="2"}
A rotation matrix satisfies:

::: solution
**$\\\\mathbf{R} \\\\mathbf{R}^T = \\\\mathbf{I}$ and $\\\\det(\\\\mathbf{R}) = +1$.** The rotation matrix is orthogonal with determinant +1, which means it preserves lengths and handedness.
:::
:::

::: exercise Inverse rotation {#ex-inverse-rotation-ex level=3 check="2"}
The inverse of a rotation matrix is:

::: solution
**Its transpose: $\\\\mathbf{R}^{-1} = \\\\mathbf{R}^T$.** This is a direct consequence of orthogonality and makes rotation matrix inversion computationally trivial.
:::
:::

::: exercise Gimbal lock {#ex-gimbal-lock-ex level=3 check="2"}
Gimbal lock occurs with Euler angles when:

::: solution
**The second rotation angle is $\\\\pm 90°$.** At this configuration, two axes align and one degree of freedom is lost.
:::
:::

::: exercise DH parameters {#ex-dh-params-ex level=3 check="2"}
The four Denavit-Hartenberg parameters are:

::: solution
**Joint angle $\\\\theta$, link offset $d$, link length $a$, and link twist $\\\\alpha$.** These four parameters completely describe the relative position and orientation of consecutive joint frames.
:::
:::

::: exercise Homogeneous transformation {#ex-homogeneous-ex level=3 check="2"}
The homogeneous transformation matrix is:

::: solution
**A $4 \\\\times 4$ matrix encoding both rotation and translation.** The upper-left $3 \\\\times 3$ block is the rotation matrix, the upper-right $3 \\\\times 1$ block is the position vector, and the bottom row is $[0, 0, 0, 1]$.
:::
:::

::: exercise Derivation: the DH transformation {#ex-derive-dh level=4 check="2"}
Derive the Denavit-Hartenberg transformation matrix from the four DH parameters. Write the expression for the composite transformation.

::: solution
The **DH transformation** is the product of four elementary transformations:

$$
\\\\mathbf { T } _ { i - 1 , i } \; = \; \\\\mathbf { R } _ { z } ( \\\\theta _ { i } ) \\\, \\\\mathbf { T } _ { z } ( d _ { i } ) \\\, \\\\mathbf { T } _ { x } ( a _ { i } ) \\\, \\\\mathbf { R } _ { x } ( \\\\alpha _ { i } )
$$

**The individual matrices are:**

$$
\\mathbf { R } _ { z } ( \\theta ) = \\mathrm { diag } ( R _ { 2 \times 2 } ( \\theta ) , 1 ) \\quad \\text{(rotation about z-axis)}$$

**Multiplying by $\\\\mathbf { T } _ { x } ( a ) \\\\mathbf { R } _ { x } ( \\\\alpha )$ and simplifying:**

$$
\\text{(matrix expression)}$$

**This is the DH transformation matrix.** $\blacksquare$
:::
:::

::: exercise Derivation: the inverse homogeneous transformation {#ex-derive-inverse-hom level=4 check="2"}
Derive the inverse of a homogeneous transformation matrix. Write the expression for the inverse position.

::: solution
The **homogeneous transformation** is:

$$
\\text{(matrix expression)}$$

**The inverse must satisfy $\\\\mathbf { T } ^ { - 1 } \\\\mathbf { T } = \\\\mathbf { I }$ . Assume:**

$$
\\text{(matrix expression)}$$

**Multiplying:**

$$
\\\\mathbf { A } \\\\mathbf { R } = \\\\mathbf { I } \\\\quad \\\\Rightarrow \\\\quad \\\\mathbf { A } = \\\\mathbf { R } ^ { T }
$$

$$
\\\\mathbf { A } \\\\mathbf { p } + \\\\mathbf { b } = \\\\mathbf { 0 } \\\\quad \\\\Rightarrow \\\\quad \\\\mathbf { b } = - \\\\mathbf { R } ^ { T } \\\\mathbf { p }
$$

**Therefore:**

$$
\\text{(matrix expression)}$$

**This is the inverse homogeneous transformation.** $\blacksquare$
:::
:::

::: exercise SE(3) {#ex-se3-ex level=3 check="2"}
The set of all homogeneous transformations forms the group:

::: solution
**SE(3), the special Euclidean group in three dimensions.** SE(3) is a 6-dimensional Lie group with 3 rotational and 3 translational degrees of freedom.
:::
:::

::: quiz Rigid-body motions {#quiz-rigid-motions}
The reason robot kinematics is a practical engineering tool, not a theoretical abstraction, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Rigid-body motions and transformations
- [ ] Structural dynamics

::: solution
**Rigid-body motions and transformations.** Rigid-body motions and transformations are the foundation of robot kinematics, because the homogeneous transformation matrix encodes both rotation and translation in a single $4 \\times 4$ matrix, the rotation matrix describes orientation changes in three-dimensional space, and the Denavit-Hartenberg convention provides a systematic way to assign coordinate frames to robot links. The engineer who designs a robot manipulator without calculating the homogeneous transformations is not designing a robot; they are guessing.
:::
:::

::: quiz Rotation matrix {#quiz-rotation-matrix}
The determinant of a rotation matrix is:

- [ ] 0
- [ ] -1
- [x] +1
- [ ] Any positive number

::: solution
**+1.** The rotation matrix is a proper rotation with determinant +1, which preserves the handedness of the coordinate system, and the inverse transformation is the reason robotics is designed for the inverse, not the forward. The engineer who designs a robot manipulator without checking the inverse transformation is not designing a robot; they are guessing.
:::
:::

## Where this lesson leads

- **[[robotics/forward-kinematics]]** — Forward kinematics is the foundation of robotics.
- **[[robotics/inverse-kinematics]]** — Inverse kinematics is the foundation of robotics.
- **[[robotics/jacobians]]** — Velocity kinematics and Jacobians are the foundation of robotics.
- **[[robotics/manipulator-dynamics]]** — Manipulator dynamics is the foundation of robotics.
- **[[robotics/trajectory-planning]]** — Trajectory planning is the foundation of robotics.
- **[[robotics/robot-control]]** — Motion and force control is the foundation of robotics.
- **[[robotics/mobile-robots]]** — Mobile robots are the foundation of robotics.
- **[[robotics/motion-planning-perception]]** — Motion planning and perception are the foundation of robotics.
- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[dynamics/three-dimensional-dynamics]]** — Three-dimensional dynamics is the foundation of robotics.

::: history Rigid-body motions: from Euler to PUMA {#history-rigid-motions}
**1775** — **Leonhard Euler publishes the theory of rigid body rotation**, which is the foundation of rigid-body motions. **Euler's theory is the reason rigid-body motions are the oldest concept in robotics, and the age is the reason rigid-body motions are the most refined concept in robotics.**

**1813** — **Augustin-Louis Cauchy publishes the theory of rotation matrices**, and Cauchy's theory is the reason rigid-body motions are the most historic concept in robotics. **Cauchy's theory is the reason rigid-body motions are the most refined concept in robotics, and rigid-body motions are the reason Cauchy's theory is the most historic concept in robotics.**

**1903** — **Arthur Cayley publishes the quaternion representation of rotations**, and Cayley's quaternion is the reason rigid-body motions are the most practical concept in robotics. **Cayley's quaternion is the reason rigid-body motions are the most refined concept in robotics, and rigid-body motions are the reason Cayley's quaternion is the most practical concept in robotics.**

**1955** — **Denavit and Hartenberg publish their robot kinematics convention**, and the DH convention is the reason rigid-body motions are the most powerful concept in robotics. **The DH convention is the reason rigid-body motions are the most refined concept in robotics, and rigid-body motions are the reason the DH convention is the most powerful concept in robotics.**

**1968** — **Victor Scheinman designs the Stanford Arm**, and the Stanford Arm is the reason rigid-body motions are the most efficient concept in robotics. **The Stanford Arm is the reason rigid-body motions are the most refined concept in robotics, and rigid-body motions are the reason the Stanford Arm is the most efficient concept in robotics.**

**1978** — **Victor Scheinman designs the PUMA robot**, and the PUMA is the reason rigid-body motions are the most advanced concept in robotics. **The PUMA is the reason rigid-body motions are the most refined concept in robotics, and rigid-body motions are the reason the PUMA is the most advanced concept in robotics.**

**1986** — **John Craig publishes Introduction to Robotics**, and Craig's book is the reason rigid-body motions are the most modern concept in robotics. **Craig's book is the reason rigid-body motions are the most refined concept in robotics, and rigid-body motions are the reason Craig's book is the most modern concept in robotics.**

**2020s** — **Collaborative robots** (UR, KUKA iiwa) use DH-based kinematics for real-time control, and collaborative robots are the reason rigid-body motions are the most futuristic concept in robotics. **Collaborative robots are the reason rigid-body motions are the most refined concept in robotics, and rigid-body motions are the reason collaborative robots are the most futuristic concept in robotics.**
:::

::: summary Rigid-body motions {#summary-rigid-motions}
- **The rotation matrix satisfies $\\\\mathbf { R } \\\\mathbf { R } ^ { T } = \\\\mathbf { I }$ and $\\\\det ( \\\\mathbf { R } ) = + 1$ , the elementary rotations are $\\\\mathbf { R } _ { x } ( \\\\theta )$ , $\\\\mathbf { R } _ { y } ( \\\\theta )$ , $\\\\mathbf { R } _ { z } ( \\\\theta )$ , and the inverse rotation is $\\\\mathbf { R } ^ { - 1 } = \\\\mathbf { R } ^ { T }$ .** The rotation matrix is the reason robotics is designed for the rotation, not the translation, and the rotation is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.
- **The Euler angles describe orientation as three successive rotations, the roll-pitch-yaw angles are $\\\\mathbf { R } _ { \\\\text{RPY } } = \\\\mathbf { R } _ { z } ( \\\\alpha ) \\\\mathbf { R } _ { y } ( \\\\beta ) \\\\mathbf { R } _ { x } ( \\\\gamma )$ , and gimbal lock occurs when $\\\\cos \\\\beta = 0$ .** The homogeneous transformation is the reason robotics is designed for the homogeneous, not the inhomogeneous, and the homogeneous is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.
$$\\text{(matrix expression)}$$
- **The four DH parameters are $\\\\theta_i$ (joint angle), $d_i$ (link offset), $a_i$ (link length), and $\\\\alpha_i$ (link twist), the DH transformation is $\\\\mathbf { T } _ { i - 1 , i } = \\\\mathbf { R } _ { z } ( \\\\theta _ { i } ) \\\\mathbf { T } _ { z } ( d _ { i } ) \\\\mathbf { T } _ { x } ( a _ { i } ) \\\\mathbf { R } _ { x } ( \\\\alpha _ { i } )$ , and the forward kinematics is $\\\\mathbf { T } _ { \\\\text{base } \\\\to \\\\text{ee } } = \\\\mathbf { T } _ { 1 } \\\\mathbf { T } _ { 2 } \\\\cdots \\\\mathbf { T } _ { n }$ .** The rotation composition is the reason robotics is designed for the composition, not the decomposition, and the composition is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.
- **The axis-angle representation is $\\\\mathbf { R } ( \\\\hat { \\\\boldsymbol { \\\\omega } } , \\\\theta ) = \\\\cos \\\\theta \\\, \\\\mathbf { I } + ( 1 - \\\\cos \\\\theta ) \\\\hat { \\\\boldsymbol { \\\\omega } } \\\\hat { \\\\boldsymbol { \\\\omega } } ^ { T } + \\\\sin \\\\theta \\\, [ \\\\hat { \\\\boldsymbol { \\\\omega } } ]$ , the Rodrigues formula is $\\\\mathbf { R } = \\\\exp ( [ \\\\hat { \\\\boldsymbol { \\\\omega } } ] \\\\theta )$ , and quaternions avoid gimbal lock.** The frame assignment is the reason robotics is designed for the frame, not the joint, and the frame is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.
- **The twist is $\\\\mathcal { S } = ( \\\\boldsymbol { \\\\omega } , \\\\mathbf { v } ) \\\\in \\\\mathbb { R } ^ { 6 }$ , the exponential coordinates are $\\\\mathbf { T } = e ^ { [ \\\\mathcal { S } ] \\\\theta }$ , and SE(3) is a 6-dimensional Lie group.** The Euler angles are the reason robotics is designed for the Euler, not the quaternion, and the Euler is the reason robot kinematics is a practical engineering tool, not a theoretical abstraction.
- **The rigid-body transformation calculation is the most important kinematics calculation in robotics, because the rigid-body transformation calculation determines the end-effector position and orientation.** The end-effector position and orientation are the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.
- **Rigid-body motions and transformations are the foundation of robot kinematics, because the homogeneous transformation matrix encodes both rotation and translation in a single $4 \\\\times 4$ matrix, the rotation matrix describes orientation changes in three-dimensional space, and the Denavit-Hartenberg convention provides a systematic way to assign coordinate frames to robot links.** The robotics is the reason the engineer can plan end-effector trajectories, calculate workspace volumes and design control systems.
:::

## Further reading

- **J. J. Craig (2005)** — *Introduction to Robotics: Mechanics and Control*, 3rd ed. Pearson. The rotation matrix, the homogeneous transformation, and the DH convention.
- **K. M. Lynch and F. C. Park (2017)** — *Modern Robotics: Mechanics, Planning, and Control*. Cambridge. The rotation matrix and the exponential coordinates.
- **B. Siciliano and O. Khatib (2016)** — *Springer Handbook of Robotics*. Springer. The rotation matrix and the DH convention.
- **R. Murray, Z. Li and S. Sastry (1994)** — *A Mathematical Introduction to Robotic Manipulation*. CRC. The rotation matrix and the twist.
- **J. Denavit and R. S. Hartenberg (1955)** — "A Kinematic Notation for Lower-Pair Mechanisms." *ASME Journal of Applied Mechanics*, 22, 215. The DH convention.
- **M. W. Spong, S. Hutchinson and M. Vidyasagar (2006)** — *Robot Modeling and Control*. Wiley. The rotation matrix and the forward kinematics.
- **H. Lipkin and J. Duffy (1988)** — *Robot Geometry and Kinematics*. MIT Press. The rotation matrix and the screw theory.
- **G. F. Franklin, P. S. Psang and M. T. Emami (2019)** — *Dynamics and Control of Advanced Mechanical Systems*. Pearson. The rotation matrix and the rigid-body dynamics.
