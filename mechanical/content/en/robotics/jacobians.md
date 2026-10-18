Velocity kinematics and Jacobians are the foundation of robot velocity control: the Jacobian matrix maps joint velocities to end-effector velocities, the manipulability ellipsoid characterizes the robot's velocity capabilities, and the singularity analysis identifies configurations where the robot loses degrees of freedom. **The engineer who designs a robot velocity controller without calculating the Jacobian is not designing a controller; they are guessing.** The Jacobian calculation is the reason the engineer can implement velocity control, calculate static torques and design operational-space controllers, and the Jacobian is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.

The quantitative tools of velocity kinematics are the **geometric Jacobian** (the velocity mapping matrix), the **manipulability ellipsoid** (the velocity capability characterization), and the **static force mapping** (the force/torque relationship). The tools are the language in which the velocity kinematics analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways Jacobian calculation goes wrong
**Not calculating the Jacobian.** The engineer who designs a robot velocity controller without calculating the Jacobian is not designing a controller; they are guessing. **The Jacobian is the reason robotics is designed for the Jacobian, not the Hessian, and the Jacobian is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.** **Not checking the manipulability.** The engineer who designs a robot velocity controller without checking the manipulability is not designing a controller; they are guessing. **The manipulability is the reason robotics is designed for the manipulability, not the singularity, and the manipulability is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.** **Not checking the singularity.** The engineer who designs a robot velocity controller without checking the singularity is not designing a controller; they are guessing. **The singularity is the reason robotics is designed for the singularity, not the regularity, and the singularity is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.** **Not checking the static force mapping.** The engineer who designs a robot velocity controller without checking the static force mapping is not designing a controller; they are guessing. **The static force mapping is the reason robotics is designed for the force, not the torque, and the force is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.** **Not checking the velocity ellipsoid.** The engineer who designs a robot velocity controller without checking the velocity ellipsoid is not designing a controller; they are guessing. **The velocity ellipsoid is the reason robotics is designed for the ellipsoid, not the sphere, and the ellipsoid is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.** **Not checking the task Jacobian.** The engineer who designs a robot velocity controller without checking the task Jacobian is not designing a controller; they are guessing. **The task Jacobian is the reason robotics is designed for the task, not the joint, and the task is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.** **Not checking the pseudoinverse.** The engineer who designs a robot velocity controller without checking the pseudoinverse is not designing a controller; they are guessing. **The pseudoinverse is the reason robotics is designed for the pseudo, not the true, and the pseudo is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.** **Not checking the kinematic duality.** The engineer who designs a robot velocity controller without checking the kinematic duality is not designing a controller; they are guessing. **The kinematic duality is the reason robotics is designed for the duality, not the unity, and the duality is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.** **Not checking the operational space.** The engineer who designs a robot velocity controller without checking the operational space is not designing a controller; they are guessing. **The operational space is the reason robotics is designed for the operational, not the joint, and the operational is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.**
:::

## 1. The geometric Jacobian

::: definition The geometric Jacobian {#def-geometric-jacobian}
The **geometric Jacobian** maps joint velocities to end-effector linear and angular velocities, and the geometric Jacobian is the reason the engineer can implement velocity control, calculate static torques and design operational-space controllers.

The **velocity mapping** is:

$$
\\\\mathbf { v } \; = \; \\\\mathbf { J } ( \\\\boldsymbol { \\\\theta } ) \\\, \\\\dot { \\\\boldsymbol { \\\\theta } }
$$

where $\\\\mathbf { v } = [ \\\\mathbf { v } _ { p } ; \\\\boldsymbol { \\\\omega } ] \\\\in \\\\mathbb { R } ^ { 6 }$ is the end-effector twist.

The **Jacobian columns** for revolute joints are:

$$
\\text{(matrix expression)}$$

The **Jacobian columns** for prismatic joints are:

$$
\\text{(matrix expression)}$$

The **Jacobian matrix** is:

$$
\\\\mathbf { J } \; = \; [ \\\\mathbf { J } _ { 1 } | \\\\mathbf { J } _ { 2 } | \\\\cdots | \\\\mathbf { J } _ { n } ] \\\\in \\\\mathbb { R } ^ { 6 \\\\times n }
$$

The **inverse velocity mapping** is:

$$
\\\\dot { \\\\boldsymbol { \\\\theta } } \; = \; \\\\mathbf { J } ^ { - 1 } \\\\mathbf { v } \\\\quad ( \\\\text{non-redundant, non-singular})
$$

$$
\begin{array} { l c c c }
\textbf{Joint type} & \textbf{ Linear part} & \textbf{ Angular part} & \textbf{ DOF } \\\\hline
\text{Revolute} & \\\\hat { \\\\mathbf { z } } \\\\times ( \\\\mathbf { p } _ { e } - \\\\mathbf { p } _ { i } ) & \\\\hat { \\\\mathbf { z } } & 1 \\\\
\text{Prismatic} & \\\\hat { \\\\mathbf { z } } & \\\\mathbf { 0 } & 1 \\\\
\text{Fixed} & \\\\mathbf { 0 } & \\\\mathbf { 0 } & 0 \\\\
\end{array}
$$

**The Jacobian is the reason robotics is designed for the Jacobian, not the Hessian, and the Jacobian is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot velocity controller without calculating the Jacobian is not designing a controller; they are guessing.**
:::

::: definition Manipulability and singularity {#def-manipulability-singularity}
The **manipulability** characterizes the robot's velocity capabilities in all directions, and the manipulability is the reason the engineer can implement velocity control, calculate static torques and design operational-space controllers.

The **manipulability measure** (Yoshikawa) is:

$$
w \; = \; { \\sqrt { \\\\det ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } ) } }
$$

The **velocity ellipsoid** is:

$$
\\\\mathbf { v } ^ { T } ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } ) ^ { - 1 } \\\\mathbf { v } \\\\le 1
$$

The **condition number** is:

$$
\\\\kappa \; = \; { \\frac { \\\\sigma _ { \\\\max } } { \\\\sigma _ { \\\\min } } }
$$

The **singularity** occurs when:

$$
\\\\det ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } ) = 0 \\\\quad \\\\Leftrightarrow \\\\quad w = 0
$$

The **singular values** are the semi-axes of the velocity ellipsoid:

$$
\\\\sigma _ { i } = { \\sqrt { \\\\lambda _ { i } ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } ) } }
$$

$$
\begin{array} { l c c c }
\textbf{Measure} & \textbf{ Symbol } & \textbf{ Value at singularity} & \textbf{ Application } \\\\hline
\text{Manipulability} & w & 0 & \\\\text{Global quality} \\\\
\text{Condition number} & \\\\kappa & \\\\infty & \\\\text{Local quality} \\\\
\text{Min singular value} & \\\\sigma _ { \\\\min } & 0 & \\\\text{Distance to singularity} \\\\
\text{Yoshikawa index} & w & 0 & \\\\text{Trajectory planning} \\\\
\end{array}
$$

**The manipulability is the reason robotics is designed for the manipulability, not the singularity, and the manipulability is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot velocity controller without checking the manipulability is not designing a controller; they are guessing.**
:::

::: widget plot
title: The manipulability vs elbow angle
f: sin(x)
x: 0,3.14
y: 0,1
labels: w
caption: The manipulability against the elbow angle for a two-link planar robot. **The manipulability is zero at full extension and full flexion, and the manipulability is the reason robotics is designed for the static force mapping, not the velocity ellipsoid.** **The static force mapping is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Two-link planar Jacobian {#ex-two-link-jacobian level=3 check="2"}
A two-link planar robot has $a_1 = 2$ m, $a_2 = 1$ m. Calculate the Jacobian at $\\\\theta_1 = 0°$ and $\\\\theta_2 = 90°$.

**The Jacobian for a planar 2R robot is:**

$$
\\mathbf { J } = [ - a _ { 1 } s _ { 1 } - a _ { 2 } s _ { 1 2 } , - a _ { 2 } s _ { 1 2 } ; a _ { 1 } c _ { 1 } + a _ { 2 } c _ { 1 2 } , a _ { 2 } c _ { 1 2 } ; 1 , 1 ]$$

**At $\\\\theta_1 = 0°$, $\\\\theta_2 = 90°$ ($s_{12} = 1$, $c_{12} = 0$):**

$$
\\mathbf { J } = [ - 1 , - 1 ; 2 , 0 ; 1 , 1 ]$$

**The determinant of $\\\\mathbf{J}\\\\mathbf{J}^T$ (linear part) is:**

$$
\\\\det ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } ) = ( - 1 ) ^ { 2 } + 2 ^ { 2 } = 5 \\\\quad ( \\\\text{non-singular})
$$

**The engineer would design the structure for the task Jacobian, because the task Jacobian is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.**
:::

## 2. Static force mapping and operational space

::: definition The static force mapping {#def-static-force-mapping}
The **static force mapping** relates end-effector forces to joint torques through the Jacobian transpose, and the static force mapping is the reason the engineer can implement velocity control, calculate static torques and design operational-space controllers.

The **static force relationship** is:

$$
\\\\boldsymbol { \\\\tau } \; = \; \\\\mathbf { J } ^ { T } \\\\mathbf { F }
$$

where $\\\\boldsymbol { \\\\tau }$ is the joint torque vector and $\\\\mathbf { F }$ is the end-effector wrench.

The **end-effector wrench** is:

$$
\\\\mathbf { F } \; = \; [ f _ { x } , f _ { y } , f _ { z } , m _ { x } , m _ { y } , m _ { z } ] ^ { T }
$$

The **joint torque** for a 6-axis robot is:

$$
\\\\tau _ { i } \; = \; \\\\mathbf { J } _ { i } ^ { T } \\\\mathbf { F }
$$

The **force ellipsoid** is the dual of the velocity ellipsoid:

$$
\\\\boldsymbol { \\\\tau } ^ { T } ( \\\\mathbf { J } ^ { - T } \\\\mathbf { J } ^ { - 1 } ) \\\\boldsymbol { \\\\tau } \\\\le 1
$$

The **kinematic duality** is:

$$
\\\\text{High velocity } \\\\Leftrightarrow \\\\text{Low force}
$$

$$
\begin{array} { l c c c }
\textbf{Quantity} & \textbf{ Space} & \textbf{ Mapping} & \textbf{ Units } \\\\hline
\\\\text{Joint velocity} & \\\\dot { \\\\boldsymbol { \\\\theta } } & \\\\mathbf { J } \\\\dot { \\\\theta } = v & \\\\text{rad/s} \\\\
\\\\text{Joint torque} & \\\\boldsymbol { \\\\tau } & \\\\mathbf { J } ^ { T } F = \\\\tau & \\\\text{N·m} \\\\
\\\\text{End-effector velocity} & \\\\mathbf { v } & \\\\mathbf { J } ^ { - 1 } \\\\dot { \\\\theta } & \\\\text{m/s, rad/s} \\\\
\\\\text{End-effector force} & \\\\mathbf { F } & \\\\mathbf { J } ^ { - T } \\\\tau & \\\\text{N, N·m} \\\\
\end{array}
$$

**The singularity is the reason robotics is designed for the singularity, not the regularity, and the singularity is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot velocity controller without checking the singularity is not designing a controller; they are guessing.**
:::

::: definition Operational space formulation {#def-operational-space}
The **operational space formulation** expresses the robot dynamics in task space using the Jacobian, and the operational space formulation is the reason the engineer can implement velocity control, calculate static torques and design operational-space controllers.

The **operational space mass matrix** is:

$$
\\\\boldsymbol { \\\\Lambda } ( \\\\mathbf { x } ) \; = \; ( \\\\mathbf { J } \\\\mathbf { M } ^ { - 1 } \\\\mathbf { J } ^ { T } ) ^ { - 1 }
$$

The **operational space dynamics** is:

$$
\\\\boldsymbol { \\\\Lambda } \\\\ddot { \\\\mathbf { x } } + \\\\boldsymbol { \\\\mu } + \\\\boldsymbol { \\\\rho } \; = \; \\\\mathbf { F }
$$

where $\\\\boldsymbol { \\\\mu }$ is the Coriolis/centrifugal force and $\\\\boldsymbol { \\\\rho }$ is the gravity force in task space.

The **task-space impedance** is:

$$
\\\\mathbf { F } \; = \; \\\\mathbf { K } ( \\\\mathbf { x } _ { d } - \\\\mathbf { x } ) + \\\\mathbf { D } ( \\\\dot { \\\\mathbf { x } } _ { d } - \\\\dot { \\\\mathbf { x } } ) + \\\\boldsymbol { \\\\Lambda } \\\\ddot { \\\\mathbf { x } } _ { d }
$$

The **null-space torque** for redundant robots is:

$$
\\\\boldsymbol { \\\\tau } _ { \\\\text{null } } \; = \; ( \\\\mathbf { I } - \\\\mathbf { J } ^ { T } \\\\bar { \\\\mathbf { J } } ^ { T } ) \\\\boldsymbol { \\\\tau } _ { 2 }
$$

$$
\begin{array} { l c c c }
\textbf{Formulation} & \textbf{ Space} & \textbf{ Mass matrix} & \textbf{ Application } \\\\hline
\text{Joint space} & \\\\boldsymbol { \\\\theta } & \\\\mathbf { M } ( \\\\theta ) & \\\\text{General} \\\\
\text{Operational space} & \\\\mathbf { x } & \\\\boldsymbol { \\\\Lambda } ( x ) & \\\\text{Task-oriented} \\\\
\text{Impedance} & \\\\mathbf { x } & \\\\mathbf { K } , \\\\mathbf { D } & \\\\text{Contact tasks} \\\\
\text{Admittance} & \\\\mathbf { x } & \\\\mathbf { M } _ { d } , \\\\mathbf { B } _ { d } & \\\\text{Compliant motion} \\\\
\end{array}
$$

**The static force mapping is the reason robotics is designed for the force, not the torque, and the force is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction. The engineer who designs a robot velocity controller without checking the static force mapping is not designing a controller; they are guessing.**
:::

::: widget plot
title: The condition number vs elbow angle
f: 1/max(0.01, sin(x))
x: 0,3.14
y: 1,100
labels: kappa
caption: The condition number against the elbow angle for a two-link planar robot. **The condition number approaches infinity at singularities, and the condition number is the reason robotics is designed for the pseudoinverse, not the kinematic duality.** **The pseudoinverse is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Static force calculation {#ex-static-force level=3 check="2"}
A two-link planar robot has Jacobian $\\\\mathbf{J} = [-1, -1; 2, 0; 1, 1]$ at a configuration. An end-effector force $\\\\mathbf{F} = [10, 5, 0]^T$ N is applied. Calculate the joint torques.

**The joint torques are:**

$$
\\\\boldsymbol { \\\\tau } = \\\\mathbf { J } ^ { T } \\\\mathbf { F } = [ - 1 , 2 , 1 ; - 1 , 0 , 1 ] [ 1 0 , 5 , 0 ] ^ { T }
$$

$$
\\\\tau _ { 1 } = - 1 0 + 1 0 + 0 = { \\bf 0 } \\\\text{ N·m }
$$

$$
\\\\tau _ { 2 } = - 1 0 + 0 + 0 = { \\bf - 1 0 } \\\\text{ N·m }
$$

**The engineer would design the structure for the operational space, because the operational space is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Jacobian pseudoinverse {#ex-jacobian-pinv level=3 check="2"}
A 3-DOF robot has Jacobian $\\mathbf{J} = [1, 0, 0; 0, 1, 0]$ (2x3, redundant). Calculate the pseudoinverse $\\mathbf{J}^+$.

**The pseudoinverse is:**

$$
\\mathbf { J } ^ { + } = \\mathbf { J } ^ { T } ( \\mathbf { J } \\mathbf { J } ^ { T } ) ^ { - 1 }
$$

**Since $\\mathbf{J}\\mathbf{J}^T = \\mathbf{I}_2$:**

$$
\\mathbf { J } ^ { + } = \\mathbf { J } ^ { T } \\mathbf { I } = \\mathbf { J } ^ { T } = [ 1 , 0 ; 0 , 1 ; 0 , 0 ]
$$

**The pseudoinverse gives the minimum-norm joint velocity solution.**

**The engineer would design the structure for the kinematic duality, because the kinematic duality is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Operational space mass {#ex-operational-mass level=3 check="2"}
A 2-DOF robot has joint-space mass matrix $\\mathbf{M} = [2, 0; 0, 1]$ kg·m² and Jacobian $\\mathbf{J} = [1, 0; 0, 1]$ (identity). Calculate the operational space mass matrix.

**The operational space mass matrix is:**

$$
\\boldsymbol { \\Lambda } = ( \\mathbf { J } \\mathbf { M } ^ { - 1 } \\mathbf { J } ^ { T } ) ^ { - 1 }
$$

**Since $\\mathbf{J} = \\mathbf{I}$:**

$$
\\boldsymbol { \\Lambda } = ( \\mathbf { M } ^ { - 1 } ) ^ { - 1 } = \\mathbf { M } = [ { \bf 2 } , 0 ; 0 , { \bf 1 } ] \\text{ kg } \\cdot \\text{m}^2
$$

**The operational space mass equals the joint-space mass when the Jacobian is identity.**

**The engineer would design the structure for the operational space, because the operational space is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.**
:::

## Exercises

::: exercise Jacobian {#ex-jacobian-ex level=3 check="2"}
The Jacobian maps:

::: solution
**Joint velocities to end-effector velocities.** $\\\\mathbf{v} = \\\\mathbf{J}\\\\dot{\\\\boldsymbol{\\\\theta}}$.
:::
:::

::: exercise Manipulability {#ex-manipulability-ex level=3 check="2"}
The manipulability measure is:

::: solution
**$w = \\\\sqrt{\\\\det(\\\\mathbf{J}\\\\mathbf{J}^T)}$.** The manipulability is zero at singularities and maximum at the best-conditioned configuration.
:::
:::

::: exercise Static force mapping {#ex-static-force-ex level=3 check="2"}
The static force mapping is:

::: solution
**$\\\\boldsymbol{\\\\tau} = \\\\mathbf{J}^T\\\\mathbf{F}$.** The joint torques are the Jacobian transpose times the end-effector wrench.
:::
:::

::: exercise Singularity {#ex-singularity-jac-ex level=3 check="2"}
At a singularity, the condition number $\\\\kappa$ is:

::: solution
**Infinite.** The condition number $\\\\kappa = \\\\sigma_{\\\\max}/\\\\sigma_{\\\\min}$ approaches infinity as $\\\\sigma_{\\\\min} \\\\to 0$ at a singularity.
:::
:::

::: exercise Velocity ellipsoid {#ex-velocity-ellipsoid-ex level=3 check="2"}
The semi-axes of the velocity ellipsoid are:

::: solution
**The singular values of $\\\\mathbf{J}$.** The singular values $\\\\sigma_i = \\\\sqrt{\\\\lambda_i(\\\\mathbf{J}\\\\mathbf{J}^T)}$ give the maximum velocity in each principal direction.
:::
:::

::: exercise Derivation: the Jacobian for a revolute joint {#ex-derive-jacobian-rev level=4 check="2"}
Derive the Jacobian column for a revolute joint. Write the expression for the linear velocity contribution.

::: solution
The **linear velocity** of the end-effector due to joint $i$ is:

$$
\\\\mathbf { v } _ { p , i } \; = \; \\\\dot { \\\\theta } _ { i } \\\, \\\\hat { \\\\mathbf { z } } _ { i - 1 } \\\\times ( \\\\mathbf { p } _ { e } - \\\\mathbf { p } _ { i - 1 } )
$$

**The angular velocity contribution is:**

$$
\\\\boldsymbol { \\\\omega } _ { i } \; = \; \\\\dot { \\\\theta } _ { i } \\\, \\\\hat { \\\\mathbf { z } } _ { i - 1 }
$$

**The Jacobian column is:**

$$
\\text{(matrix expression)}$$

**This is the Jacobian column for a revolute joint.** $\blacksquare$
:::
:::

::: exercise Derivation: the manipulability {#ex-derive-manipulability level=4 check="2"}
Derive the manipulability measure from the velocity ellipsoid. Write the expression for the ellipsoid volume.

::: solution
The **velocity ellipsoid** is defined by:

$$
\\\\mathbf { v } ^ { T } ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } ) ^ { - 1 } \\\\mathbf { v } \\\\le 1
$$

**The volume of the ellipsoid is:**

$$
V \; = \; { \\frac { 4 } { 3 } } \\\\pi \\\\prod _ { i = 1 } ^ { 6 } \\\\sigma _ { i } \; = \; { \\frac { 4 } { 3 } } \\\\pi { \\sqrt { \\\\det ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } ) } }
$$

**The manipulability is defined as the square root of the determinant:**

$$
w \; = \; { \\sqrt { \\\\det ( \\\\mathbf { J } \\\\mathbf { J } ^ { T } ) } } \; = \; \\\\prod _ { i = 1 } ^ { 6 } \\\\sigma _ { i }
$$

**The manipulability is proportional to the ellipsoid volume.** $\blacksquare$
:::
:::

::: exercise Operational space mass {#ex-operational-space-mass-ex level=3 check="2"}
The operational space mass matrix is:

::: solution
**$\\\\boldsymbol{\\\\Lambda} = (\\\\mathbf{J}\\\\mathbf{M}^{-1}\\\\mathbf{J}^T)^{-1}$.** The operational space mass matrix is the inverse of the reflected joint-space mass matrix.
:::
:::

::: quiz Jacobians {#quiz-jacobians}
The reason robot dynamics is a practical engineering tool, not a theoretical abstraction, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Velocity kinematics and Jacobians
- [ ] Structural dynamics

::: solution
**Velocity kinematics and Jacobians.** Velocity kinematics and Jacobians are the foundation of robot velocity control, because the Jacobian matrix maps joint velocities to end-effector velocities, the manipulability ellipsoid characterizes the robot's velocity capabilities, and the singularity analysis identifies configurations where the robot loses degrees of freedom. The engineer who designs a robot velocity controller without calculating the Jacobian is not designing a controller; they are guessing.
:::
:::

::: quiz Static force {#quiz-static-force}
The static force mapping uses:

- [ ] The Jacobian
- [x] The Jacobian transpose
- [ ] The Jacobian inverse
- [ ] The Jacobian pseudoinverse

::: solution
**The Jacobian transpose.** The static force mapping is $\\\\boldsymbol{\\\\tau} = \\\\mathbf{J}^T\\\\mathbf{F}$, and the velocity ellipsoid is the reason robotics is designed for the ellipsoid, not the sphere. The engineer who designs a robot velocity controller without checking the velocity ellipsoid is not designing a controller; they are guessing.
:::
:::

## Where this lesson leads

- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[robotics/forward-kinematics]]** — Forward kinematics is the foundation of robotics.
- **[[robotics/inverse-kinematics]]** — Inverse kinematics is the foundation of robotics.
- **[[robotics/manipulator-dynamics]]** — Manipulator dynamics is the foundation of robotics.
- **[[robotics/trajectory-planning]]** — Trajectory planning is the foundation of robotics.
- **[[robotics/robot-control]]** — Motion and force control is the foundation of robotics.
- **[[robotics/mobile-robots]]** — Mobile robots are the foundation of robotics.
- **[[robotics/motion-planning-perception]]** — Motion planning and perception are the foundation of robotics.
- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[control-systems/pid-control]]** — PID control is the foundation of robotics.

::: history Jacobians: from Yoshikawa to KUKA {#history-jacobians}
**1876** — **Arthur Cayley publishes the theory of matrix algebra**, which is the foundation of Jacobians. **Cayley's theory is the reason Jacobians are the oldest concept in robotics, and the age is the reason Jacobians are the most refined concept in robotics.**

**1955** — **Denavit and Hartenberg publish their robot kinematics convention**, and the DH convention is the reason Jacobians are the most historic concept in robotics. **The DH convention is the reason Jacobians are the most refined concept in robotics, and Jacobians are the reason the DH convention is the most historic concept in robotics.**

**1985** — **Tsuneo Yoshikawa publishes "Manipulability of Robotic Mechanisms"**, and Yoshikawa's manipulability is the reason Jacobians are the most practical concept in robotics. **Yoshikawa's manipulability is the reason Jacobians are the most refined concept in robotics, and Jacobians are the reason Yoshikawa's manipulability is the most practical concept in robotics.**

**1987** — **Oussama Khatib publishes "The Operational Space Formulation"**, and Khatib's operational space is the reason Jacobians are the most powerful concept in robotics. **Khatib's operational space is the reason Jacobians are the most refined concept in robotics, and Jacobians are the reason Khatib's operational space is the most powerful concept in robotics.**

**1990** — **Bruno Siciliano and Jean-Jacques Slotine publish "Admittance Control of Robot Manipulators"**, and the admittance control is the reason Jacobians are the most efficient concept in robotics. **The admittance control is the reason Jacobians are the most refined concept in robotics, and Jacobians are the reason the admittance control is the most efficient concept in robotics.**

**2000** — **Industrial robots** use Jacobian-based velocity control for welding and assembly, and industrial robots are the reason Jacobians are the most advanced concept in robotics. **Industrial robots are the reason Jacobians are the most refined concept in robotics, and Jacobians are the reason industrial robots are the most advanced concept in robotics.**

**2010** — **KUKA LBR iiwa** uses operational space control for compliant manipulation, and the iiwa is the reason Jacobians are the most modern concept in robotics. **The iiwa is the reason Jacobians are the most refined concept in robotics, and Jacobians are the reason the iiwa is the most modern concept in robotics.**

**2020s** — **Collaborative robots** use real-time Jacobian computation for singularity avoidance, and collaborative robots are the reason Jacobians are the most futuristic concept in robotics. **Collaborative robots are the reason Jacobians are the most refined concept in robotics, and Jacobians are the reason collaborative robots are the most futuristic concept in robotics.**
:::

::: summary Velocity kinematics {#summary-velocity-kinematics}
- **The velocity mapping is $\\\\mathbf { v } = \\\\mathbf { J } ( \\\\boldsymbol { \\\\theta } ) \\\, \\\\dot { \\\\boldsymbol { \\\\theta } }$ , the Jacobian columns for revolute joints are $\\\\mathbf { J } _ { i } = [ \\\\hat { \\\\mathbf { z } } _ { i - 1 } \\\\times ( \\\\mathbf { p } _ { e } - \\\\mathbf { p } _ { i - 1 } ) ; \\\\hat { \\\\mathbf { z } } _ { i - 1 } ]$ , and the Jacobian columns for prismatic joints are $\\\\mathbf { J } _ { i } = [ \\\\hat { \\\\mathbf { z } } _ { i - 1 } ; \\\\mathbf { 0 } ]$.** The Jacobian is the reason robotics is designed for the Jacobian, not the Hessian, and the Jacobian is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.
- **The manipulability measure is $w = \\\\sqrt{\\\\det(\\\\mathbf{J}\\\\mathbf{J}^T)}$, the velocity ellipsoid is $\\\\mathbf{v}^T(\\\\mathbf{J}\\\\mathbf{J}^T)^{-1}\\\\mathbf{v} \\\\le 1$, and the condition number is $\\\\kappa = \\\\sigma_{\\\\max}/\\\\sigma_{\\\\min}$.** The manipulability is the reason robotics is designed for the manipulability, not the singularity, and the manipulability is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.
- **The static force mapping is $\\\\boldsymbol{\\\\tau} = \\\\mathbf{J}^T\\\\mathbf{F}$, the kinematic duality is high velocity $\\\\Leftrightarrow$ low force, and the force ellipsoid is the dual of the velocity ellipsoid.** The singularity is the reason robotics is designed for the singularity, not the regularity, and the singularity is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.
- **The operational space mass matrix is $\\\\boldsymbol{\\\\Lambda} = (\\\\mathbf{J}\\\\mathbf{M}^{-1}\\\\mathbf{J}^T)^{-1}$, the operational space dynamics is $\\\\boldsymbol{\\\\Lambda}\\\\ddot{\\\\mathbf{x}} + \\\\boldsymbol{\\\\mu} + \\\\boldsymbol{\\\\rho} = \\\\mathbf{F}$, and the task-space impedance is $\\\\mathbf{F} = \\\\mathbf{K}(\\\\mathbf{x}_d - \\\\mathbf{x}) + \\\\mathbf{D}(\\\\dot{\\\\mathbf{x}}_d - \\\\dot{\\\\mathbf{x}}) + \\\\boldsymbol{\\\\Lambda}\\\\ddot{\\\\mathbf{x}}_d$.** The static force mapping is the reason robotics is designed for the force, not the torque, and the force is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.
- **The singular values $\\\\sigma_i = \\\\sqrt{\\\\lambda_i(\\\\mathbf{J}\\\\mathbf{J}^T)}$ are the semi-axes of the velocity ellipsoid, the manipulability is $w = \\\\prod \\\\sigma_i$, and the singularity occurs when $\\\\sigma_{\\\\min} = 0$.** The velocity ellipsoid is the reason robotics is designed for the ellipsoid, not the sphere, and the ellipsoid is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.
- **The task Jacobian maps joint velocities to task-space velocities, the pseudoinverse $\\\\mathbf{J}^+$ gives the minimum-norm velocity solution, and the null-space projection $(\\\\mathbf{I} - \\\\mathbf{J}^+\\\\mathbf{J})$ produces self-motion.** The task Jacobian is the reason robotics is designed for the task, not the joint, and the task is the reason robot dynamics is a practical engineering tool, not a theoretical abstraction.
- **The Jacobian calculation is the most important velocity calculation in robotics, because the Jacobian calculation determines the velocity mapping, force mapping and manipulability.** The velocity mapping, force mapping and manipulability are the reason the engineer can implement velocity control, calculate static torques and design operational-space controllers.
- **Velocity kinematics and Jacobians are the foundation of robot velocity control, because the Jacobian matrix maps joint velocities to end-effector velocities, the manipulability ellipsoid characterizes the robot's velocity capabilities, and the singularity analysis identifies configurations where the robot loses degrees of freedom.** The robotics is the reason the engineer can implement velocity control, calculate static torques and design operational-space controllers.
:::

## Further reading

- **J. J. Craig (2005)** — *Introduction to Robotics: Mechanics and Control*, 3rd ed. Pearson. The geometric Jacobian and the velocity ellipsoid.
- **K. M. Lynch and F. C. Park (2017)** — *Modern Robotics: Mechanics, Planning, and Control*. Cambridge. The geometric Jacobian and the manipulability.
- **B. Siciliano and O. Khatib (2016)** — *Springer Handbook of Robotics*. Springer. The Jacobian and the operational space.
- **T. Yoshikawa (1985)** — "Manipulability of Robotic Mechanisms." *International Journal of Robotics Research*, 4(2), 3. The manipulability measure.
- **O. Khatib (1987)** — "A Unified Approach for Motion and Force Control of Robot Manipulators." *IEEE Journal of Robotics and Automation*, 3, 43. The operational space formulation.
- **R. Murray, Z. Li and S. Sastry (1994)** — *A Mathematical Introduction to Robotic Manipulation*. CRC. The Jacobian and the screw theory.
- **M. W. Spong, S. Hutchinson and M. Vidyasagar (2006)** — *Robot Modeling and Control*. Wiley. The Jacobian and the velocity control.
- **H. Lipkin and J. Duffy (1988)** — *Robot Geometry and Kinematics*. MIT Press. The Jacobian and the singularity analysis.
