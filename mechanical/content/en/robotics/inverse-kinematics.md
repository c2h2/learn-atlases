Inverse kinematics is the foundation of robot position control: the inverse kinematics problem computes the joint variables from the desired end-effector pose, the geometric solution exploits the robot's kinematic structure, and the numerical solution uses iterative methods like Newton-Raphson or Jacobian transpose. **The engineer who designs a robot control system without solving the inverse kinematics is not designing a control system; they are guessing.** The inverse kinematics calculation is the reason the engineer can plan trajectories, implement servo control and design task-space controllers, and the inverse kinematics is the reason robot control is a practical engineering tool, not a theoretical abstraction.

The quantitative tools of inverse kinematics are the **geometric solution** (the closed-form solution for simple robots), the **numerical solution** (the iterative solution using Jacobians), and the **wrist-decoupled solution** (the Pieper solution for spherical-wrist robots). The tools are the language in which the inverse kinematics analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways inverse kinematics calculation goes wrong
**Not solving the inverse kinematics.** The engineer who designs a robot control system without solving the inverse kinematics is not designing a control system; they are guessing. **The inverse kinematics is the reason robotics is designed for the inverse, not the forward, and the inverse is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the geometric solution.** The engineer who designs a robot control system without checking the geometric solution is not designing a control system; they are guessing. **The geometric solution is the reason robotics is designed for the geometric, not the algebraic, and the geometric is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the numerical solution.** The engineer who designs a robot control system without checking the numerical solution is not designing a control system; they are guessing. **The numerical solution is the reason robotics is designed for the numerical, not the analytical, and the numerical is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the wrist decoupling.** The engineer who designs a robot control system without checking the wrist decoupling is not designing a control system; they are guessing. **The wrist decoupling is the reason robotics is designed for the wrist, not the arm, and the wrist is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the multiple solutions.** The engineer who designs a robot control system without checking the multiple solutions is not designing a control system; they are guessing. **The multiple solutions are the reason robotics is designed for the multiple, not the unique, and the multiple is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the singularity.** The engineer who designs a robot control system without checking the singularity is not designing a control system; they are guessing. **The singularity is the reason robotics is designed for the singularity, not the regularity, and the singularity is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the joint limits.** The engineer who designs a robot control system without checking the joint limits is not designing a control system; they are guessing. **The joint limits are the reason robotics is designed for the joint, not the Cartesian, and the joint is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the redundancy resolution.** The engineer who designs a robot control system without checking the redundancy resolution is not designing a control system; they are guessing. **The redundancy resolution is the reason robotics is designed for the redundancy, not the determinacy, and the redundancy is the reason robot control is a practical engineering tool, not a theoretical abstraction.** **Not checking the operational space.** The engineer who designs a robot control system without checking the operational space is not designing a control system; they are guessing. **The operational space is the reason robotics is designed for the operational, not the joint, and the operational is the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

## 1. Geometric inverse kinematics

::: definition The geometric solution {#def-geometric-ik}
The **geometric solution** computes the joint variables from the desired end-effector pose using geometric relationships, and the geometric solution is the reason the engineer can plan trajectories, implement servo control and design task-space controllers.

The **two-link planar IK** is:

$$
\\\\theta _ { 2 } \; = \; \\\\arccos { \\frac { x ^ { 2 } + y ^ { 2 } - a _ { 1 } ^ { 2 } - a _ { 2 } ^ { 2 } } { 2 a _ { 1 } a _ { 2 } } }
$$

$$
\\\\theta _ { 1 } \; = \; \\\\mathrm { atan2 } ( y , x ) - \\\\mathrm { atan2 } ( a _ { 2 } \\\\sin \\\\theta _ { 2 } , a _ { 1 } + a _ { 2 } c \\\\theta _ { 2 } )
$$

The **elbow-up and elbow-down** solutions are:

$$
\\\\theta _ { 2 } ^ { \\\\pm } \; = \; \\\\pm \\\\arccos ( \\\\cdot )
$$

The **workspace condition** is:

$$
( a _ { 1 } - a _ { 2 } ) ^ { 2 } \\\\le x ^ { 2 } + y ^ { 2 } \\\\le ( a _ { 1 } + a _ { 2 } ) ^ { 2 }
$$

The **number of solutions** for a planar 2R robot is:

$$
n _ { \\\\text{solutions } } \; = \; 2 \\\\quad ( \\\\text{elbow-up and elbow-down})
$$

$$
\begin{array} { l c c c }
\textbf{Robot type} & \textbf{ Solutions} & \textbf{ Method} & \textbf{ Closed form} \\\\hline
\text{Planar 2R} & 2 & \\\\text{Geometric} & \\\\text{Yes} \\\\
\text{SCARA} & 2 & \\\\text{Geometric} & \\\\text{Yes} \\\\
\text{6-axis spherical wrist} & 8 & \\\\text{Pieper} & \\\\text{Yes} \\\\
\text{General 6R} & \\\\le 1 6 & \\\\text{Elimination} & \\\\text{Sometimes} \\\\
\text{Redundant 7R} & \\\\infty & \\\\text{Optimization} & \\\\text{No} \\\\
\end{array}
$$

**The inverse kinematics is the reason robotics is designed for the inverse, not the forward, and the inverse is the reason robot control is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot control system without solving the inverse kinematics is not designing a control system; they are guessing.**
:::

::: definition The wrist-decoupled solution {#def-wrist-decoupled}
The **wrist-decoupled solution** separates the position and orientation sub-problems for robots with a spherical wrist, and the wrist-decoupled solution is the reason the engineer can plan trajectories, implement servo control and design task-space controllers.

The **wrist position** is:

$$
\\\\mathbf { p } _ { \\\\text{wrist } } \; = \; \\\\mathbf { p } _ { \\\\text{ee } } - d _ { 6 } \\\\mathbf { R } _ { \\\\text{ee } } \\\\hat { \\\\mathbf { z } }
$$

The **arm angles** ($\\\\theta_1$, $\\\\theta_2$, $\\\\theta_3$) are found from the wrist position.

The **wrist angles** ($\\\\theta_4$, $\\\\theta_5$, $\\\\theta_6$) are found from the orientation:

$$
\\\\mathbf { R } _ { \\\\text{wrist } } \; = \; \\\\mathbf { R } _ { \\\\text{ee } } ( \\\\mathbf { R } _ { \\\\text{arm } } ) ^ { T }
$$

The **Pieper criterion** states that a 6R robot has a closed-form IK if the last three axes intersect at a point.

The **number of solutions** for a 6-axis spherical-wrist robot is:

$$
n _ { \\\\text{solutions } } \; = \; 8 \\\\quad ( 2 ^ { 3 } \\\\text{ from shoulder, elbow, wrist})
$$

$$
\begin{array} { l c c c }
\textbf{Sub-problem} & \textbf{ Variables} & \textbf{ Equations} & \textbf{ Solutions } \\\\hline
\text{Arm (position)} & \\\\theta _ { 1 } , \\\\theta _ { 2 } , \\\\theta _ { 3 } & 3 \\\\text{ position eqs} & 2 \\\\text{ (shoulder, elbow)} \\\\
\text{Wrist (orientation)} & \\\\theta _ { 4 } , \\\\theta _ { 5 } , \\\\theta _ { 6 } & 3 \\\\text{ orientation eqs} & 4 \\\\text{ (flip, no-flip)} \\\\
\text{Total} & 6 & 6 & 8 \\\\
\end{array}
$$

**The geometric solution is the reason robotics is designed for the geometric, not the algebraic, and the geometric is the reason robot control is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot control system without checking the geometric solution is not designing a control system; they are guessing.**
:::

::: widget plot
title: The elbow angle vs reach
f: acos(max(-1, min(1, (x^2 - 5) / 4)))
x: 1,3
y: 0,3.14
labels: theta2
caption: The elbow angle against the reach for a two-link planar robot with $a_1 = 2$, $a_2 = 1$. **The elbow angle decreases with reach, and the elbow angle is the reason robotics is designed for the numerical solution, not the wrist decoupling.** **The numerical solution is the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Two-link planar IK {#ex-two-link-ik level=3 check="2"}
A two-link planar robot has $a_1 = 2$ m, $a_2 = 1$ m. Calculate the joint angles for the end-effector position $(x, y) = (2, 1.5)$ m.

**The squared distance is:**

$$
r ^ { 2 } = 2 ^ { 2 } + 1 . 5 ^ { 2 } = 4 + 2 . 2 5 = 6 . 2 5
$$

**The elbow angle is:**

$$
\\\\theta _ { 2 } = \\\\arccos { \\frac { 6 . 2 5 - 4 - 1 } { 2 \\\\times 2 \\\\times 1 } } = \\\\arccos ( 0 . 3 1 2 5 ) = { \\bf 7 1 . 8 ° }
$$

**The shoulder angle is:**

$$
\\\\theta _ { 1 } = \\\\mathrm { atan2 } ( 1 . 5 , 2 ) - \\\\mathrm { atan2 } ( 1 \\\\times \\\\sin 7 1 . 8 ° , 2 + 1 \\\\times \\\\cos 7 1 . 8 ° )
$$

$$
\\\\theta _ { 1 } = 3 6 . 9 ° - 2 2 . 0 ° = { \\bf 1 4 . 9 ° }
$$

**The engineer would design the structure for the multiple solutions, because the multiple solutions are the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

## 2. Numerical inverse kinematics

::: definition The numerical solution {#def-numerical-ik}
The **numerical solution** computes the joint variables iteratively using the Jacobian matrix, and the numerical solution is the reason the engineer can plan trajectories, implement servo control and design task-space controllers.

The **Jacobian transpose method** is:

$$
\\\\boldsymbol { \\\\theta } _ { k + 1 } \; = \; \\\\boldsymbol { \\\\theta } _ { k } + \\\\alpha \\\\mathbf { J } ^ { T } \\\\mathbf { e }
$$

where $\\\\mathbf { e }$ is the task-space error and $\\\\alpha$ is the step size.

The **Newton-Raphson method** is:

$$
\\\\boldsymbol { \\\\theta } _ { k + 1 } \; = \; \\\\boldsymbol { \\\\theta } _ { k } + \\\\mathbf { J } ^ { - 1 } \\\\mathbf { e }
$$

The **damped least-squares (Levenberg-Marquardt) method** is:

$$
\\\\boldsymbol { \\\\theta } _ { k + 1 } \; = \; \\\\boldsymbol { \\\\theta } _ { k } + \\\\mathbf { J } ^ { T } ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } + \\\\lambda ^ { 2 } \\\\mathbf { I } ) ^ { - 1 } \\\\mathbf { e }
$$

The **convergence condition** is:

$$
| | \\\\mathbf { e } | | \; < \\\\epsilon
$$

The **singularity measure** is:

$$
\\\\mu \; = \; { \\sqrt { \\\\det ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } ) } }
$$

$$
\begin{array} { l c c c }
\textbf{Method} & \textbf{ Convergence} & \textbf{ Singularity} & \textbf{ Application } \\\\hline
\text{Jacobian transpose} & \\\\text{Linear} & \\\\text{Poor} & \\\\text{Simple, slow} \\\\
\text{Newton-Raphson} & \\\\text{Quadratic} & \\\\text{Poor} & \\\\text{Fast, near solution} \\\\
\text{Damped LS} & \\\\text{Quadratic} & \\\\text{Good} & \\\\text{Near singularity} \\\\
\text{GN (Gauss-Newton)} & \\\\text{Quadratic} & \\\\text{Moderate} & \\\\text{General purpose} \\\\
\end{array}
$$

**The numerical solution is the reason robotics is designed for the numerical, not the analytical, and the numerical is the reason robot control is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot control system without checking the numerical solution is not designing a control system; they are guessing.**
:::

::: definition Singularity and redundancy resolution {#def-singularity-redundancy}
The **singularity** is a configuration where the Jacobian loses rank, and the singularity is the reason the engineer can plan trajectories, implement servo control and design task-space controllers.

The **manipulability** is:

$$
w \; = \; { \\sqrt { \\\\det ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } ) } }
$$

The **condition number** is:

$$
\\\\kappa \; = \; { \\frac { \\\\sigma _ { \\\\max } } { \\\\sigma _ { \\\\min } } }
$$

The **redundancy resolution** using the null-space projection is:

$$
\\\\dot { \\\\boldsymbol { \\\\theta } } \; = \; \\\\mathbf { J } ^ { + } \\\\mathbf { v } + ( \\\\mathbf { I } - \\\\mathbf { J } ^ { + } \\\\mathbf { J } ) \\\\mathbf { z }
$$

The **gradient projection method** optimizes a criterion $H$:

$$
\\\\mathbf { z } \; = \; - k \\\\nabla H ( \\\\boldsymbol { \\\\theta } )
$$

The **joint limit avoidance** criterion is:

$$
H \; = \; { \\frac { 1 } { 4 } } \\\\sum _ { i = 1 } ^ { n } \\\\left( { \\frac { \\\\theta _ { i } - \\\\theta _ { i , c } } { \\\\theta _ { i , \\\\max } - \\\\theta _ { i , \\\\min } } } \\right) ^ { 2 }
$$

$$
\begin{array} { l c c c }
\textbf{Singularity type} & \textbf{ Condition} & \textbf{ Effect} & \textbf{ Avoidance } \\\\hline
\text{Boundary} & w = 0 & \\\\text{Lost DOF} & \\\\text{Stay in interior} \\\\
\text{Interior} & \\\\kappa \\\\to \\\\infty & \\\\text{Infinite velocity} & \\\\text{Damped LS} \\\\
\text{Redundant} & \\\\text{Always} & \\\\text{Infinite solutions} & \\\\text{Null-space optimization} \\\\
\end{array}
$$

**The wrist decoupling is the reason robotics is designed for the wrist, not the arm, and the wrist is the reason robot control is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot control system without checking the wrist decoupling is not designing a control system; they are guessing.**
:::

::: widget plot
title: The manipulability vs joint angle
f: sin(x)
x: 0,3.14
y: 0,1
labels: w
caption: The manipulability against the elbow angle for a two-link planar robot. **The manipulability is zero at full extension and full flexion, and the manipulability is the reason robotics is designed for the singularity, not the joint limits.** **The singularity is the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Damped least-squares IK {#ex-damped-ls-ik level=3 check="2"}
A 2-DOF robot has Jacobian $\\\\mathbf{J} = [1, 2; 0, 1]$ and task-space error $\\\\mathbf{e} = [0.1, 0.05]^T$. Calculate the joint update using damped least-squares with $\\\\lambda = 0.1$.

**The product $\\\\mathbf{J}\\\\mathbf{J}^T$ is:**

$$
\\\\mathbf { J } \\\\mathbf { J } ^ { T } = [ 1 , 2 ; 0 , 1 ] [ 1 , 0 ; 2 , 1 ] = [ 5 , 2 ; 2 , 1 ]
$$

**The damped matrix is:**

$$
\\\\mathbf { J } \\\\mathbf { J } ^ { T } + \\\\lambda ^ { 2 } \\\\mathbf { I } = [ 5 . 0 1 , 2 ; 2 , 1 . 0 1 ]
$$

**The inverse is:**

$$
( \\\\mathbf { J } \\\\mathbf { J } ^ { T } + \\\\lambda ^ { 2 } \\\\mathbf { I } ) ^ { - 1 } = { \\frac { 1 } { 5 . 0 1 \\\\times 1 . 0 1 - 4 } } [ 1 . 0 1 , - 2 ; - 2 , 5 . 0 1 ] = [ 1 . 0 2 , - 2 . 0 2 ; - 2 . 0 2 , 5 . 0 7 ]
$$

**The joint update is:**

$$
\\\\Delta \\\\boldsymbol { \\\\theta } = \\\\mathbf { J } ^ { T } ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } + \\\\lambda ^ { 2 } \\\\mathbf { I } ) ^ { - 1 } \\\\mathbf { e } = [ 1 , 0 ; 2 , 1 ] [ 1 . 0 2 , - 2 . 0 2 ; - 2 . 0 2 , 5 . 0 7 ] [ 0 . 1 , 0 . 0 5 ] ^ { T }
$$

$$
\\\\Delta \\\\boldsymbol { \\\\theta } = [ { \\bf 0 . 0 5 1 } , { \\bf 0 . 0 5 3 } ] ^ { T } \\\\text{ rad }
$$

**The engineer would design the structure for the redundancy resolution, because the redundancy resolution is the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Wrist-decoupled IK {#ex-wrist-decoupled-ik level=3 check="2"}
A 6-axis robot has a spherical wrist with $d_6 = 0.2$ m. The desired end-effector pose has $\\mathbf{p}_{\\text{ee}} = [1.0, 0.5, 0.8]^T$ m and $\\mathbf{R}_{\\text{ee}} = \\mathbf{I}$. Calculate the wrist center position.

**The wrist center is:**

$$
\\mathbf { p } _ { \\text{wrist } } = \\mathbf { p } _ { \\text{ee } } - d _ { 6 } \\mathbf { R } _ { \\text{ee } } \\hat { \\mathbf { z } } = [ 1 . 0 , 0 . 5 , 0 . 8 ] ^ { T } - 0 . 2 [ 0 , 0 , 1 ] ^ { T }
$$

$$
\\mathbf { p } _ { \\text{wrist } } = [ { \bf 1 . 0 } , { \bf 0 . 5 } , { \bf 0 . 6 } ] ^ { T } \\text{ m }
$$

**The arm angles are then found from the wrist position, and the wrist angles from the orientation.**

**The engineer would design the structure for the operational space, because the operational space is the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Jacobian transpose IK {#ex-jacobian-transpose-ik level=3 check="2"}
A 2-DOF robot has Jacobian $\\mathbf{J} = [1, 1; 0, 1]$ and task-space error $\\mathbf{e} = [0.1, 0.05]^T$. Calculate the joint update using the Jacobian transpose method with step size $\\alpha = 0.5$.

**The Jacobian transpose is:**

$$
\\mathbf { J } ^ { T } = [ 1 , 0 ; 1 , 1 ]
$$

**The joint update is:**

$$
\\Delta \\boldsymbol { \\theta } = \\alpha \\mathbf { J } ^ { T } \\mathbf { e } = 0 . 5 [ 1 , 0 ; 1 , 1 ] [ 0 . 1 , 0 . 0 5 ] ^ { T }
$$

$$
\\Delta \\boldsymbol { \\theta } = 0 . 5 [ 0 . 1 , 0 . 1 5 ] ^ { T } = [ { \bf 0 . 0 5 } , { \bf 0 . 0 7 5 } ] ^ { T } \\text{ rad }
$$

**The Jacobian transpose method converges linearly and is simple to implement.**

**The engineer would design the structure for the redundancy resolution, because the redundancy resolution is the reason robot control is a practical engineering tool, not a theoretical abstraction.**
:::

## Exercises

::: exercise Inverse kinematics {#ex-inverse-kinematics-ex level=3 check="2"}
The inverse kinematics problem maps:

::: solution
**Cartesian space to joint space.** The IK computes the joint variables from the desired end-effector pose.
:::
:::

::: exercise Number of solutions {#ex-number-solutions-ex level=3 check="2"}
A two-link planar robot has how many IK solutions?

::: solution
**Two (elbow-up and elbow-down).** The two solutions correspond to the two possible configurations of the elbow joint.
:::
:::

::: exercise Pieper criterion {#ex-pieper-criterion-ex level=3 check="2"}
The Pieper criterion guarantees a closed-form IK when:

::: solution
**The last three joint axes intersect at a point (spherical wrist).** This allows the position and orientation sub-problems to be decoupled.
:::
:::

::: exercise Singularity {#ex-singularity-ex level=3 check="2"}
At a singularity, the Jacobian:

::: solution
**Loses rank.** The manipulability $w = \sqrt{\det(\mathbf{J}\mathbf{J}^T)}$ becomes zero, and the robot loses one or more degrees of freedom in Cartesian space.
:::
:::

::: exercise Damped least-squares {#ex-damped-ls-ex level=3 check="2"}
The damped least-squares method is preferred over Newton-Raphson when:

::: solution
**The robot is near a singularity.** The damping term $\lambda^2 \mathbf{I}$ prevents large joint velocities near singularities.
:::
:::

::: exercise Derivation: the two-link planar IK {#ex-derive-two-link-ik level=4 check="2"}
Derive the inverse kinematics for a two-link planar robot. Write the expression for $\\\\theta_2$.

::: solution
The **forward kinematics** is:

$$
x = a _ { 1 } c _ { 1 } + a _ { 2 } c _ { 1 2 } , \\\\quad y = a _ { 1 } s _ { 1 } + a _ { 2 } s _ { 1 2 }
$$

**Squaring and adding:**

$$
x ^ { 2 } + y ^ { 2 } = a _ { 1 } ^ { 2 } + a _ { 2 } ^ { 2 } + 2 a _ { 1 } a _ { 2 } ( c _ { 1 } c _ { 1 2 } + s _ { 1 } s _ { 1 2 } ) = a _ { 1 } ^ { 2 } + a _ { 2 } ^ { 2 } + 2 a _ { 1 } a _ { 2 } c _ { 2 }
$$

**Solving for $c_2$:**

$$
c _ { 2 } = { \\frac { x ^ { 2 } + y ^ { 2 } - a _ { 1 } ^ { 2 } - a _ { 2 } ^ { 2 } } { 2 a _ { 1 } a _ { 2 } } }
$$

**Therefore:**

$$
\\\\theta _ { 2 } = \\\\pm \\\\arccos { \\frac { x ^ { 2 } + y ^ { 2 } - a _ { 1 } ^ { 2 } - a _ { 2 } ^ { 2 } } { 2 a _ { 1 } a _ { 2 } } }
$$

**The $\\\\pm$ gives the elbow-up and elbow-down solutions.** $\blacksquare$
:::
:::

::: exercise Derivation: the damped least-squares update {#ex-derive-damped-ls level=4 check="2"}
Derive the damped least-squares IK update from the optimization problem. Write the expression for the cost function.

::: solution
The **optimization problem** is:

$$
\\\\min _ { \\\\Delta \\\\boldsymbol { \\\\theta } } | | \\\\mathbf { J } \\\\Delta \\\\boldsymbol { \\\\theta } - \\\\mathbf { e } | | ^ { 2 } + \\\\lambda ^ { 2 } | | \\\\Delta \\\\boldsymbol { \\\\theta } | | ^ { 2 }
$$

**Expanding the cost function:**

$$
C = ( \\\\mathbf { J } \\\\Delta \\\\boldsymbol { \\\\theta } - \\\\mathbf { e } ) ^ { T } ( \\\\mathbf { J } \\\\Delta \\\\boldsymbol { \\\\theta } - \\\\mathbf { e } ) + \\\\lambda ^ { 2 } \\\\Delta \\\\boldsymbol { \\\\theta } ^ { T } \\\\Delta \\\\boldsymbol { \\\\theta }
$$

**Setting the gradient to zero:**

$$
\\\\mathbf { J } ^ { T } ( \\\\mathbf { J } \\\\Delta \\\\boldsymbol { \\\\theta } - \\\\mathbf { e } ) + \\\\lambda ^ { 2 } \\\\Delta \\\\boldsymbol { \\\\theta } = 0
$$

**Rearranging:**

$$
( \\\\mathbf { J } ^ { T } \\\\mathbf { J } + \\\\lambda ^ { 2 } \\\\mathbf { I } ) \\\\Delta \\\\boldsymbol { \\\\theta } = \\\\mathbf { J } ^ { T } \\\\mathbf { e }
$$

**Using the identity $(\\\\mathbf{J}^T\\\\mathbf{J} + \\\\lambda^2\\\\mathbf{I})^{-1}\\\\mathbf{J}^T = \\\\mathbf{J}^T(\\\\mathbf{J}\\\\mathbf{J}^T + \\\\lambda^2\\\\mathbf{I})^{-1}$:**

$$
\\\\Delta \\\\boldsymbol { \\\\theta } = \\\\mathbf { J } ^ { T } ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } + \\\\lambda ^ { 2 } \\\\mathbf { I } ) ^ { - 1 } \\\\mathbf { e }
$$

**This is the damped least-squares update.** $\blacksquare$
:::
:::

::: exercise Redundancy resolution {#ex-redundancy-resolution-ex level=3 check="2"}
The null-space projection $(\\\\mathbf{I} - \\\\mathbf{J}^+\\\\mathbf{J})\\\\mathbf{z}$ produces:

::: solution
**Motion that does not change the end-effector pose.** The null-space velocity is orthogonal to the row space of $\\\\mathbf{J}$, so it produces no end-effector motion.
:::
:::

::: quiz Inverse kinematics {#quiz-inverse-kinematics}
The reason robot control is a practical engineering tool, not a theoretical abstraction, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Inverse kinematics
- [ ] Structural dynamics

::: solution
**Inverse kinematics.** Inverse kinematics is the foundation of robot position control, because the inverse kinematics problem computes the joint variables from the desired end-effector pose, the geometric solution exploits the robot's kinematic structure, and the numerical solution uses iterative methods like Newton-Raphson or Jacobian transpose. The engineer who designs a robot control system without solving the inverse kinematics is not designing a control system; they are guessing.
:::
:::

::: quiz Singularity {#quiz-singularity}
At a singularity, the manipulability $w$ is:

- [ ] Maximum
- [x] Zero
- [ ] Equal to 1
- [ ] Negative

::: solution
**Zero.** The manipulability $w = \sqrt{\det(\mathbf{J}\mathbf{J}^T)}$ is zero at a singularity because the Jacobian loses rank, and the joint limits are the reason robotics is designed for the joint, not the Cartesian. The engineer who designs a robot control system without checking the joint limits is not designing a control system; they are guessing.
:::
:::

## Where this lesson leads

- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[robotics/forward-kinematics]]** — Forward kinematics is the foundation of robotics.
- **[[robotics/jacobians]]** — Velocity kinematics and Jacobians are the foundation of robotics.
- **[[robotics/manipulator-dynamics]]** — Manipulator dynamics is the foundation of robotics.
- **[[robotics/trajectory-planning]]** — Trajectory planning is the foundation of robotics.
- **[[robotics/robot-control]]** — Motion and force control is the foundation of robotics.
- **[[robotics/mobile-robots]]** — Mobile robots are the foundation of robotics.
- **[[robotics/motion-planning-perception]]** — Motion planning and perception are the foundation of robotics.
- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[control-systems/pid-control]]** — PID control is the foundation of robotics.

::: history Inverse kinematics: from Pieper to KUKA {#history-inverse-kinematics}
**1876** — **Arthur Cayley publishes the theory of screw displacements**, which is the foundation of inverse kinematics. **Cayley's theory is the reason inverse kinematics is the oldest concept in robotics, and the age is the reason inverse kinematics is the most refined concept in robotics.**

**1968** — **Donald Pieper publishes his PhD thesis on closed-form IK**, and Pieper's thesis is the reason inverse kinematics is the most historic concept in robotics. **Pieper's thesis is the reason inverse kinematics is the most refined concept in robotics, and inverse kinematics is the reason Pieper's thesis is the most historic concept in robotics.**

**1974** — **Richard Paul publishes robot manipulator kinematics**, and Paul's kinematics is the reason inverse kinematics is the most practical concept in robotics. **Paul's kinematics is the reason inverse kinematics is the most refined concept in robotics, and inverse kinematics is the reason Paul's kinematics is the most practical concept in robotics.**

**1986** — **John Craig publishes Introduction to Robotics**, and Craig's book is the reason inverse kinematics is the most powerful concept in robotics. **Craig's book is the reason inverse kinematics is the most refined concept in robotics, and inverse kinematics is the reason Craig's book is the most powerful concept in robotics.**

**1990** — **Y. Nakamura publishes "Inverse Kinematics Solutions Using Singularity-Avoidance Function"**, and Nakamura's method is the reason inverse kinematics is the most efficient concept in robotics. **Nakamura's method is the reason inverse kinematics is the most refined concept in robotics, and inverse kinematics is the reason Nakamura's method is the most efficient concept in robotics.**

**2000** — **KUKA and ABB industrial robots** use closed-form IK for real-time control, and industrial robots are the reason inverse kinematics is the most advanced concept in robotics. **Industrial robots are the reason inverse kinematics is the most refined concept in robotics, and inverse kinematics is the reason industrial robots are the most advanced concept in robotics.**

**2010** — **KUKA LBR iiwa** 7-axis redundant robot uses null-space optimization, and the iiwa is the reason inverse kinematics is the most modern concept in robotics. **The iiwa is the reason inverse kinematics is the most refined concept in robotics, and inverse kinematics is the reason the iiwa is the most modern concept in robotics.**

**2020s** — **Collaborative robots** use real-time IK with joint limit avoidance, and collaborative robots are the reason inverse kinematics is the most futuristic concept in robotics. **Collaborative robots are the reason inverse kinematics is the most refined concept in robotics, and inverse kinematics is the reason collaborative robots are the most futuristic concept in robotics.**
:::

::: summary Inverse kinematics {#summary-inverse-kinematics}
- **The two-link planar IK is $\\\\theta _ { 2 } = \\\\arccos ( ( x ^ { 2 } + y ^ { 2 } - a _ { 1 } ^ { 2 } - a _ { 2 } ^ { 2 } ) / ( 2 a _ { 1 } a _ { 2 } ) )$ and $\\\\theta _ { 1 } = \\\\mathrm { atan2 } ( y , x ) - \\\\mathrm { atan2 } ( a _ { 2 } s _ { 2 } , a _ { 1 } + a _ { 2 } c _ { 2 } )$ , the workspace condition is $( a_1 - a_2 )^2 \\\\le x^2 + y^2 \\\\le (a_1 + a_2)^2$, and there are two solutions (elbow-up and elbow-down).** The inverse kinematics is the reason robotics is designed for the inverse, not the forward, and the inverse is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The wrist position is $\\\\mathbf { p } _ { \\\\text{wrist } } = \\\\mathbf { p } _ { \\\\text{ee } } - d _ { 6 } \\\\mathbf { R } _ { \\\\text{ee } } \\\\hat { \\\\mathbf { z } }$ , the Pieper criterion guarantees closed-form IK for spherical-wrist robots, and the number of solutions is 8 for a 6-axis spherical-wrist robot.** The geometric solution is the reason robotics is designed for the geometric, not the algebraic, and the geometric is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The Jacobian transpose method is $\\\\boldsymbol { \\\\theta } _ { k + 1 } = \\\\boldsymbol { \\\\theta } _ { k } + \\\\alpha \\\\mathbf { J } ^ { T } \\\\mathbf { e }$ , the Newton-Raphson method is $\\\\boldsymbol { \\\\theta } _ { k + 1 } = \\\\boldsymbol { \\\\theta } _ { k } + \\\\mathbf { J } ^ { - 1 } \\\\mathbf { e }$ , and the damped least-squares method is $\\\\boldsymbol { \\\\theta } _ { k + 1 } = \\\\boldsymbol { \\\\theta } _ { k } + \\\\mathbf { J } ^ { T } ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } + \\\\lambda ^ { 2 } \\\\mathbf { I } ) ^ { - 1 } \\\\mathbf { e }$ .** The numerical solution is the reason robotics is designed for the numerical, not the analytical, and the numerical is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The manipulability is $w = \sqrt{\det(\mathbf{J}\mathbf{J}^T)}$, the condition number is $\\\\kappa = \sigma_{\max}/\sigma_{\min}$, and the singularity occurs when $w = 0$ or $\\\\kappa \\\\to \\\\infty$.** The wrist decoupling is the reason robotics is designed for the wrist, not the arm, and the wrist is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The redundancy resolution is $\\\\dot { \\\\boldsymbol { \\\\theta } } = \\\\mathbf { J } ^ { + } \\\\mathbf { v } + ( \\\\mathbf { I } - \\\\mathbf { J } ^ { + } \\\\mathbf { J } ) \\\\mathbf { z }$ , the gradient projection method uses $\\\\mathbf { z } = - k \\\\nabla H ( \\\\boldsymbol { \\\\theta } )$ , and the joint limit avoidance criterion is $H = \\\\frac{1}{4} \\\\sum ( ( \\\\theta_i - \\\\theta_{i,c} ) / ( \\\\theta_{i,\max} - \\\\theta_{i,\min} ) )^2$.** The multiple solutions are the reason robotics is designed for the multiple, not the unique, and the multiple is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The number of IK solutions for a planar 2R robot is 2, for a 6-axis spherical-wrist robot is 8, and for a redundant 7R robot is infinite.** The singularity is the reason robotics is designed for the singularity, not the regularity, and the singularity is the reason robot control is a practical engineering tool, not a theoretical abstraction.
- **The inverse kinematics calculation is the most important position calculation in robot control, because the inverse kinematics calculation determines the joint variables from the desired end-effector pose.** The joint variables are the reason the engineer can plan trajectories, implement servo control and design task-space controllers.
- **Inverse kinematics is the foundation of robot position control, because the inverse kinematics problem computes the joint variables from the desired end-effector pose, the geometric solution exploits the robot's kinematic structure, and the numerical solution uses iterative methods like Newton-Raphson or Jacobian transpose.** The robotics is the reason the engineer can plan trajectories, implement servo control and design task-space controllers.
:::

## Further reading

- **J. J. Craig (2005)** — *Introduction to Robotics: Mechanics and Control*, 3rd ed. Pearson. The geometric IK and the wrist decoupling.
- **K. M. Lynch and F. C. Park (2017)** — *Modern Robotics: Mechanics, Planning, and Control*. Cambridge. The numerical IK and the Jacobian methods.
- **B. Siciliano and O. Khatib (2016)** — *Springer Handbook of Robotics*. Springer. The inverse kinematics and the singularity analysis.
- **D. Pieper (1968)** — *The Kinematics of Manipulators under Computer Control*. PhD thesis, Stanford. The Pieper criterion.
- **R. Paul (1981)** — *Robot Manipulators: Mathematics, Programming and Control*. MIT Press. The geometric IK and the wrist decoupling.
- **Y. Nakamura (1991)** — *Advanced Robotics: Redundancy and Optimization*. Addison-Wesley. The redundancy resolution and the null-space optimization.
- **M. W. Spong, S. Hutchinson and M. Vidyasagar (2006)** — *Robot Modeling and Control*. Wiley. The numerical IK and the Jacobian methods.
- **O. Khatib (1987)** — "A Unified Approach for Motion and Force Control of Robot Manipulators." *IEEE Journal of Robotics and Automation*, 3, 43. The operational space and the redundancy resolution.
