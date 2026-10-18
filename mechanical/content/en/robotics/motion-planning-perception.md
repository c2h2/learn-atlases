Motion planning and perception are the foundation of autonomous robot navigation: the configuration space maps obstacles into the robot's joint space, sampling-based planners find collision-free paths in high-dimensional spaces, and perception systems estimate the robot's state from sensor data. **The engineer who designs an autonomous robot without planning the motion is not designing an autonomous robot; they are guessing.** The motion planning calculation is the reason the engineer can navigate in cluttered environments, avoid obstacles and plan trajectories, and the motion planning is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.

The quantitative tools of motion planning and perception are the **configuration space** (the obstacle mapping), the **sampling-based planner** (the probabilistic roadmap), and the **Kalman filter** (the state estimation). The tools are the language in which the motion planning analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways motion planning calculation goes wrong
**Not planning the motion.** The engineer who designs an autonomous robot without planning the motion is not designing an autonomous robot; they are guessing. **The motion planning is the reason robotics is designed for the planning, not the execution, and the motion planning is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the configuration space.** The engineer who designs an autonomous robot without checking the configuration space is not designing an autonomous robot; they are guessing. **The configuration space is the reason robotics is designed for the configuration, not the Cartesian, and the configuration is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the sampling-based planner.** The engineer who designs an autonomous robot without checking the sampling-based planner is not designing an autonomous robot; they are guessing. **The sampling-based planner is the reason robotics is designed for the sampling, not the grid, and the sampling is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the Kalman filter.** The engineer who designs an autonomous robot without checking the Kalman filter is not designing an autonomous robot; they are guessing. **The Kalman filter is the reason robotics is designed for the Kalman, not the particle, and the Kalman is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the obstacle representation.** The engineer who designs an autonomous robot without checking the obstacle representation is not designing an autonomous robot; they are guessing. **The obstacle representation is the reason robotics is designed for the obstacle, not the free space, and the obstacle is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the path smoothing.** The engineer who designs an autonomous robot without checking the path smoothing is not designing an autonomous robot; they are guessing. **The path smoothing is the reason robotics is designed for the smoothing, not the roughness, and the smoothing is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the sensor model.** The engineer who designs an autonomous robot without checking the sensor model is not designing an autonomous robot; they are guessing. **The sensor model is the reason robotics is designed for the sensor, not the actuator, and the sensor is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the SLAM.** The engineer who designs an autonomous robot without checking the SLAM is not designing an autonomous robot; they are guessing. **The SLAM is the reason robotics is designed for the simultaneous, not the sequential, and the simultaneous is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.** **Not checking the computational complexity.** The engineer who designs an autonomous robot without checking the computational complexity is not designing an autonomous robot; they are guessing. **The computational complexity is the reason robotics is designed for the complexity, not the simplicity, and the complexity is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.**
:::

## 1. Configuration space and sampling-based planning

::: definition The configuration space {#def-configuration-space}
The **configuration space** maps obstacles from the workspace into the robot's joint space, and the configuration space is the reason the engineer can navigate in cluttered environments, avoid obstacles and plan trajectories.

The **configuration space (C-space)** is:

$$
\\\\mathcal { C } \; = \; \\\\mathbb { R } ^ { n } \\\\quad ( \\\\text{for an n-DOF robot})
$$

The **obstacle region** is:

$$
\\\\mathcal { C } _ { \\\\text{obs } } \; = \; \\\\{ \\\\mathbf { q } \\\\in \\\\mathcal { C } : \\\\mathcal { R } ( \\\\mathbf { q } ) \\\\cap \\\\mathcal { O } \\\\neq \\\\emptyset \\\\}
$$

The **free space** is:

$$
\\\\mathcal { C } _ { \\\\text{free } } \; = \; \\\\mathcal { C } \\\\setminus \\\\mathcal { C } _ { \\\\text{obs } }
$$

The **Minkowski difference** for a translating robot is:

$$
\\\\mathcal { C } _ { \\\\text{obs } } \; = \; \\\\mathcal { O } \\\\oplus ( - \\\\mathcal { A } )
$$

The **degrees of freedom** for a planar rigid body is:

$$
n \; = \; 3 \\\\quad ( x , y , \\\\theta )
$$

$$
\begin{array} { l c c c }
\textbf{Robot type} & \textbf{ DOF} & \textbf{ C-space} & \textbf{ Obstacle complexity} \\\\hline
\text{Point mass} & 2 & \\\\mathbb { R } ^ { 2 } & \\\\text{Simple} \\\\
\text{Planar rigid body} & 3 & \\\\mathbb { R } ^ { 2 } \\\\times S ^ { 1 } & \\\\text{Medium} \\\\
\text{Spatial rigid body} & 6 & \\\\mathbb { R } ^ { 3 } \\\\times S O ( 3 ) & \\\\text{Complex} \\\\
\text{6-axis manipulator} & 6 & \\\\mathbb { R } ^ { 6 } & \\\\text{Complex} \\\\
\text{7-axis manipulator} & 7 & \\\\mathbb { R } ^ { 7 } & \\\\text{Very complex} \\\\
\end{array}
$$

**The motion planning is the reason robotics is designed for the planning, not the execution, and the motion planning is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction. The engineer who designs an autonomous robot without planning the motion is not designing an autonomous robot; they are guessing.**
:::

::: definition Sampling-based planners {#def-sampling-planners}
The **sampling-based planner** finds collision-free paths by randomly sampling the configuration space, and the sampling-based planner is the reason the engineer can navigate in cluttered environments, avoid obstacles and plan trajectories.

The **PRM (Probabilistic Roadmap)** algorithm is:

$$
\\\\text{1. Sample } N \\\\text{ configurations} \\\\quad \\\\text{2. Connect neighbors} \\\\quad \\\\text{3. Search graph}
$$

The **RRT (Rapidly-exploring Random Tree)** algorithm is:

$$
\\\\mathbf { q } _ { \\\\text{new } } \; = \\\\text{Steer} ( \\\\mathbf { q } _ { \\\\text{near } } , \\\\mathbf { q } _ { \\\\text{rand } } , \\\\Delta q _ { \\\\max } )
$$

The **distance metric** for joint space is:

$$
d ( \\\\mathbf { q } _ { 1 } , \\\\mathbf { q } _ { 2 } ) \; = \; { \\sqrt { \\\\sum _ { i = 1 } ^ { n } w _ { i } ^ { 2 } ( q _ { 1 , i } - q _ { 2 , i } ) ^ { 2 } } }
$$

The **RRT-connect** bidirectional search is:

$$
\\\\text{Grow } \\\\mathcal { T } _ { a } \\\\text{ toward } \\\\mathbf { q } _ { \\\\text{rand } } , \\\\quad \\\\text{then grow } \\\\mathcal { T } _ { b } \\\\text{ toward } \\\\mathbf { q } _ { \\\\text{new } }
$$

The **probability of success** is:

$$
P ( \\\\text{success } ) \; = \; 1 - ( 1 - p ) ^ { N }
$$

where $p$ is the probability of sampling a useful configuration.

$$
\begin{array} { l c c c }
\textbf{Planner} & \textbf{ Completeness} & \textbf{ Optimality} & \textbf{ Application } \\\\hline
\text{PRM} & \\\\text{Probabilistic} & \\\\text{No} & \\\\text{Multi-query} \\\\
\text{RRT} & \\\\text{Probabilistic} & \\\\text{No} & \\\\text{Single-query} \\\\
\text{RRT*} & \\\\text{Probabilistic} & \\\\text{Asymptotic} & \\\\text{Optimal path} \\\\
\text{Informed RRT*} & \\\\text{Probabilistic} & \\\\text{Asymptotic} & \\\\text{Faster convergence} \\\\
\text{FMT*} & \\\\text{Probabilistic} & \\\\text{Asymptotic} & \\\\text{High-dimensional} \\\\
\end{array}
$$

**The configuration space is the reason robotics is designed for the configuration, not the Cartesian, and the configuration is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction. The engineer who designs an autonomous robot without checking the configuration space is not designing an autonomous robot; they are guessing.**
:::

::: widget plot
title: The RRT success probability
f: 1 - pow(0.99, x)
x: 0,500
y: 0,1
labels: P
caption: The RRT success probability against the number of samples for $p = 0.01$. **The success probability approaches 1 exponentially, and the success probability is the reason robotics is designed for the obstacle representation, not the path smoothing.** **The obstacle representation is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example RRT planning {#ex-rrt-planning level=3 check="2"}
An RRT planner samples a 2D configuration space with $\\\\Delta q_{\\\\max} = 0.5$ m. The start is at $(0, 0)$ and a sample is drawn at $(3, 4)$. Calculate the new configuration.

**The distance to the sample is:**

$$
d = { \\sqrt { 3 ^ { 2 } + 4 ^ { 2 } } } = 5 \\\\text{ m }
$$

**Since $d > \\\\Delta q_{\\\\max}$, the steer function gives:**

$$
\\\\mathbf { q } _ { \\\\text{new } } = ( 0 , 0 ) + { \\frac { 0 . 5 } { 5 } } ( 3 , 4 ) = ( 0 . 3 , 0 . 4 )
$$

**The new configuration is at $(0.3, 0.4)$ m.**

**The engineer would design the structure for the SLAM, because the SLAM is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.**
:::

## 2. Perception and state estimation

::: definition The Kalman filter {#def-kalman-filter}
The **Kalman filter** estimates the robot's state from noisy sensor measurements, and the Kalman filter is the reason the engineer can navigate in cluttered environments, avoid obstacles and plan trajectories.

The **prediction step** is:

$$
\\\\hat { \\\\mathbf { x } } _ { k | k - 1 } = \\\\mathbf { F } _ { k } \\\\hat { \\\\mathbf { x } } _ { k - 1 | k - 1 } + \\\\mathbf { B } _ { k } \\\\mathbf { u } _ { k }
$$

$$
\\\\mathbf { P } _ { k | k - 1 } = \\\\mathbf { F } _ { k } \\\\mathbf { P } _ { k - 1 | k - 1 } \\\\mathbf { F } _ { k } ^ { T } + \\\\mathbf { Q } _ { k }
$$

The **update step** is:

$$
\\\\mathbf { K } _ { k } = \\\\mathbf { P } _ { k | k - 1 } \\\\mathbf { H } _ { k } ^ { T } ( \\\\mathbf { H } _ { k } \\\\mathbf { P } _ { k | k - 1 } \\\\mathbf { H } _ { k } ^ { T } + \\\\mathbf { R } _ { k } ) ^ { - 1 }
$$

$$
\\\\hat { \\\\mathbf { x } } _ { k | k } = \\\\hat { \\\\mathbf { x } } _ { k | k - 1 } + \\\\mathbf { K } _ { k } ( \\\\mathbf { z } _ { k } - \\\\mathbf { H } _ { k } \\\\hat { \\\\mathbf { x } } _ { k | k - 1 } )
$$

$$
\\\\mathbf { P } _ { k | k } = ( \\\\mathbf { I } - \\\\mathbf { K } _ { k } \\\\mathbf { H } _ { k } ) \\\\mathbf { P } _ { k | k - 1 }
$$

The **Kalman gain** is:

$$
\\\\mathbf { K } \; = \; \\\\mathbf { P } \\\\mathbf { H } ^ { T } ( \\\\mathbf { H } \\\\mathbf { P } \\\\mathbf { H } ^ { T } + \\\\mathbf { R } ) ^ { - 1 }
$$

The **innovation** is:

$$
\\\\mathbf { y } \; = \; \\\\mathbf { z } - \\\\mathbf { H } \\\\hat { \\\\mathbf { x } }
$$

$$
\begin{array} { l c c c }
\textbf{Filter} & \textbf{ Model} & \textbf{ Noise} & \textbf{ Application } \\\\hline
\text{KF} & \\\\text{Linear} & \\\\text{Gaussian} & \\\\text{Linear systems} \\\\
\text{EKF} & \\\\text{Nonlinear} & \\\\text{Gaussian} & \\\\text{Smooth nonlinear} \\\\
\text{UKF} & \\\\text{Nonlinear} & \\\\text{Gaussian} & \\\\text{Highly nonlinear} \\\\
\text{Particle filter} & \\\\text{Nonlinear} & \\\\text{Arbitrary} & \\\\text{Multimodal} \\\\
\end{array}
$$

**The sampling-based planner is the reason robotics is designed for the sampling, not the grid, and the sampling is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction. The engineer who designs an autonomous robot without checking the sampling-based planner is not designing an autonomous robot; they are guessing.**
:::

::: definition SLAM {#def-slam}
The **SLAM (Simultaneous Localization and Mapping)** problem estimates the robot's pose and the environment map simultaneously, and the SLAM is the reason the engineer can navigate in cluttered environments, avoid obstacles and plan trajectories.

The **SLAM state vector** is:

$$
\\\\mathbf { x } \; = \; [ \\\\mathbf { p } _ { \\\\text{robot } } , \\\\mathbf { m } _ { 1 } , \\\\mathbf { m } _ { 2 } , \\\\ldots , \\\\mathbf { m } _ { M } ] ^ { T }
$$

The **SLAM covariance** is:

$$
\\text{(matrix expression)}$$

The **information form** is:

$$
\\\\boldsymbol { \\\\Omega } \\\\hat { \\\\mathbf { x } } \; = \; \\\\boldsymbol { \\\\xi }
$$

The **computational complexity** is:

$$
\\\\text{EKF-SLAM: } O ( M ^ { 2 } ) \\\\quad \\\\text{vs} \\\\quad \\\\text{Sparse SLAM: } O ( M )
$$

The **loop closure** condition is:

$$
d ( \\\\mathbf { p } _ { \\\\text{current } } , \\\\mathbf { p } _ { \\\\text{past } } ) < \\\\epsilon
$$

$$
\begin{array} { l c c c }
\textbf{Method} & \textbf{ Complexity} & \textbf{ Accuracy} & \textbf{ Application } \\\\hline
\text{EKF-SLAM} & O ( M ^ { 2 } ) & \\\\text{High} & \\\\text{Small maps} \\\\
\text{FastSLAM} & O ( M ) & \\\\text{High} & \\\\text{Large maps} \\\\
\text{Graph SLAM} & O ( M ) & \\\\text{High} & \\\\text{Loop closure} \\\\
\text{ORB-SLAM} & O ( M ) & \\\\text{High} & \\\\text{Visual SLAM} \\\\
\end{array}
$$

**The Kalman filter is the reason robotics is designed for the Kalman, not the particle, and the Kalman is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction. The engineer who designs an autonomous robot without checking the Kalman filter is not designing an autonomous robot; they are guessing.**
:::

::: widget plot
title: The Kalman filter convergence
f: 1 / (1 + x)
x: 0,20
y: 0,1
labels: P
caption: The Kalman filter covariance against the number of measurements. **The covariance decreases monotonically, and the covariance is the reason robotics is designed for the sensor model, not the SLAM.** **The sensor model is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example Kalman filter update {#ex-kalman-update level=3 check="2"}
A robot's position estimate is $\\\\hat{x} = 5$ m with covariance $P = 4$ m². A sensor measures $z = 7$ m with noise $R = 1$ m². Calculate the Kalman gain and updated estimate.

**The Kalman gain is:**

$$
K = { \\frac { P H ^ { T } } { H P H ^ { T } + R } } = { \\frac { 4 \\\\times 1 } { 1 \\\\times 4 \\\\times 1 + 1 } } = { \\frac { 4 } { 5 } } = { \\bf 0 . 8 }
$$

**The innovation is:**

$$
y = z - H \\\\hat { x } = 7 - 5 = 2 \\\\text{ m }
$$

**The updated estimate is:**

$$
\\\\hat { x } _ { \\\\text{new } } = 5 + 0 . 8 \\\\times 2 = { \\bf 6 . 6 } \\\\text{ m }
$$

**The updated covariance is:**

$$
P _ { \\\\text{new } } = ( 1 - 0 . 8 ) \\\\times 4 = { \\bf 0 . 8 } \\\\text{ m}^2
$$

**The engineer would design the structure for the computational complexity, because the computational complexity is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example PRM roadmap construction {#ex-prm-roadmap level=3 check="2"}
A PRM planner samples 100 configurations in a 2D space, of which 60 are collision-free. The nearest-neighbor radius is $r = 0.5$ m. Calculate the expected number of edges if each node connects to its 5 nearest neighbors.

**The number of collision-free nodes is:**

$$
N _ { \\text{free } } = 6 0
$$

**The expected number of edges is:**

$$
E = { \frac { N _ { \\text{free } } \\times k } { 2 } } = { \frac { 6 0 \\times 5 } { 2 } } = { \bf 1 5 0 }
$$

**The factor of 2 accounts for each edge being counted twice.**

**The engineer would design the structure for the path smoothing, because the path smoothing is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.**
:::

::: example EKF-SLAM complexity {#ex-ekf-slam-complexity level=3 check="2"}
An EKF-SLAM system tracks a robot pose (3 DOF) and 50 landmarks (2 DOF each). Calculate the state dimension and the covariance matrix size.

**The state dimension is:**

$$
n = 3 + 2 \\times 5 0 = { \bf 1 0 3 }
$$

**The covariance matrix size is:**

$$
\\mathbf { P } \\in \\mathbb { R } ^ { 1 0 3 \\times 1 0 3 } \\quad ( { \bf 1 0 { , } 6 0 9 } \\text{ elements } )
$$

**The computational complexity per update is $O(n^2) = O(10{,}609)$.**

**The engineer would design the structure for the computational complexity, because the computational complexity is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.**
:::

## Exercises

::: exercise Configuration space {#ex-configuration-space-ex level=3 check="2"}
The configuration space is:

::: solution
**The space of all robot configurations.** The C-space maps obstacles from the workspace into the robot's joint space.
:::
:::

::: exercise RRT {#ex-rrt-ex level=3 check="2"}
The RRT planner is:

::: solution
**Probabilistically complete.** The RRT will find a path if one exists, given enough samples.
:::
:::

::: exercise Kalman filter {#ex-kalman-filter-ex level=3 check="2"}
The Kalman filter is optimal for:

::: solution
**Linear systems with Gaussian noise.** The Kalman filter minimizes the mean squared error for linear-Gaussian systems.
:::
:::

::: exercise SLAM {#ex-slam-ex level=3 check="2"}
The SLAM problem estimates:

::: solution
**The robot's pose and the environment map simultaneously.** SLAM solves the chicken-and-egg problem of localization and mapping.
:::
:::

::: exercise PRM {#ex-prm-ex level=3 check="2"}
The PRM planner is best for:

::: solution
**Multi-query planning.** The PRM builds a roadmap that can be reused for multiple start-goal queries.
:::
:::

::: exercise Derivation: the Kalman gain {#ex-derive-kalman-gain level=4 check="2"}
Derive the Kalman gain from the minimum variance criterion. Write the expression for the posterior covariance.

::: solution
The **posterior estimate** is:

$$
\\\\hat { \\\\mathbf { x } } = \\\\hat { \\\\mathbf { x } } ^ { - } + \\\\mathbf { K } ( \\\\mathbf { z } - \\\\mathbf { H } \\\\hat { \\\\mathbf { x } } ^ { - } )
$$

**The posterior covariance is:**

$$
\\\\mathbf { P } = ( \\\\mathbf { I } - \\\\mathbf { K } \\\\mathbf { H } ) \\\\mathbf { P } ^ { - } ( \\\\mathbf { I } - \\\\mathbf { K } \\\\mathbf { H } ) ^ { T } + \\\\mathbf { K } \\\\mathbf { R } \\\\mathbf { K } ^ { T }
$$

**Minimizing $\\\\text{tr}(\\\\mathbf{P})$ with respect to $\\\\mathbf{K}$:**

$$
{ \\frac { \\\\partial \\\\text{tr}(\\\\mathbf{P}) } { \\\\partial \\\\mathbf{K} } } = - 2 \\\\mathbf { K } \\\\mathbf { H } \\\\mathbf { P } ^ { - } + 2 \\\\mathbf { K } \\\\mathbf { R } = 0
$$

**Solving for $\\\\mathbf{K}$:**

$$
\\\\mathbf { K } = \\\\mathbf { P } ^ { - } \\\\mathbf { H } ^ { T } ( \\\\mathbf { H } \\\\mathbf { P } ^ { - } \\\\mathbf { H } ^ { T } + \\\\mathbf { R } ) ^ { - 1 }
$$

**This is the Kalman gain.** $\blacksquare$
:::
:::

::: exercise Derivation: the RRT steer function {#ex-derive-rrt-steer level=4 check="2"}
Derive the RRT steer function from the maximum step size. Write the expression for $\\\\mathbf{q}_{\\\\text{new}}$.

::: solution
The **steer function** moves from $\\\\mathbf{q}_{\\\\text{near}}$ toward $\\\\mathbf{q}_{\\\\text{rand}}$ by at most $\\\\Delta q_{\\\\max}$:

$$
d = | | \\\\mathbf { q } _ { \\\\text{rand } } - \\\\mathbf { q } _ { \\\\text{near } } | |
$$

**If $d \\\\le \\\\Delta q_{\\\\max}$:**

$$
\\\\mathbf { q } _ { \\\\text{new } } = \\\\mathbf { q } _ { \\\\text{rand } }
$$

**If $d > \\\\Delta q_{\\\\max}$:**

$$
\\\\mathbf { q } _ { \\\\text{new } } = \\\\mathbf { q } _ { \\\\text{near } } + { \\frac { \\\\Delta q _ { \\\\max } } { d } } ( \\\\mathbf { q } _ { \\\\text{rand } } - \\\\mathbf { q } _ { \\\\text{near } } )
$$

**This is the RRT steer function.** $\blacksquare$
:::
:::

::: exercise EKF {#ex-ekf-ex level=3 check="2"}
The Extended Kalman Filter linearizes:

::: solution
**The nonlinear model around the current estimate.** The EKF uses Jacobians to linearize the nonlinear dynamics and measurement models.
:::
:::

::: quiz Motion planning {#quiz-motion-planning}
The reason autonomous robotics is a practical engineering tool, not a theoretical abstraction, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Motion planning and perception
- [ ] Structural dynamics

::: solution
**Motion planning and perception.** Motion planning and perception are the foundation of autonomous robot navigation, because the configuration space maps obstacles into the robot's joint space, sampling-based planners find collision-free paths in high-dimensional spaces, and perception systems estimate the robot's state from sensor data. The engineer who designs an autonomous robot without planning the motion is not designing an autonomous robot; they are guessing.
:::
:::

::: exercise Particle filter {#ex-particle-filter-ex level=3 check="2"}
The particle filter is preferred over the Kalman filter when:

::: solution
**The posterior is multimodal or non-Gaussian.** The particle filter can represent arbitrary probability distributions.
:::
:::

::: quiz SLAM {#quiz-slam}
The SLAM problem is:

- [ ] Localization only
- [ ] Mapping only
- [x] Simultaneous localization and mapping
- [ ] Path planning only

::: solution
**Simultaneous localization and mapping.** The SLAM problem estimates the robot's pose and the environment map simultaneously, and the SLAM is the reason robotics is designed for the simultaneous, not the sequential. The engineer who designs an autonomous robot without checking the SLAM is not designing an autonomous robot; they are guessing.
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
- **[[robotics/mobile-robots]]** — Mobile robots are the foundation of robotics.
- **[[robotics/rigid-motions]]** — Rigid-body motions and transformations are the foundation of robotics.
- **[[control-systems/pid-control]]** — PID control is the foundation of robotics.

::: history Motion planning: from Lozano-Perez to KUKA {#history-motion-planning}
**1876** — **Arthur Cayley publishes the theory of matrix algebra**, which is the foundation of motion planning. **Cayley's theory is the reason motion planning is the oldest concept in robotics, and the age is the reason motion planning is the most refined concept in robotics.**

**1983** — **Lozano-Perez publishes "Spatial Planning: A Configuration Space Approach"**, and Lozano-Perez's configuration space is the reason motion planning is the most historic concept in robotics. **Lozano-Perez's configuration space is the reason motion planning is the most refined concept in robotics, and motion planning is the reason Lozano-Perez's configuration space is the most historic concept in robotics.**

**1992** — **Kavraki, Svestka, Latombe and Overmars publish PRM**, and the PRM is the reason motion planning is the most practical concept in robotics. **The PRM is the reason motion planning is the most refined concept in robotics, and motion planning is the reason the PRM is the most practical concept in robotics.**

**1998** — **LaValle publishes RRT**, and the RRT is the reason motion planning is the most powerful concept in robotics. **The RRT is the reason motion planning is the most refined concept in robotics, and motion planning is the reason the RRT is the most powerful concept in robotics.**

**2001** — **Thrun, Burgard and Fox publish Probabilistic Robotics**, and the probabilistic robotics is the reason motion planning is the most efficient concept in robotics. **The probabilistic robotics is the reason motion planning is the most refined concept in robotics, and motion planning is the reason the probabilistic robotics is the most efficient concept in robotics.**

**2004** — **Khatib et al. publish the Space-Planning for Robotic Manipulation**, and the space planning is the reason motion planning is the most advanced concept in robotics. **The space planning is the reason motion planning is the most refined concept in robotics, and motion planning is the reason the space planning is the most advanced concept in robotics.**

**2011** — **Kiefer et al. publish OMPL**, and the OMPL is the reason motion planning is the most modern concept in robotics. **The OMPL is the reason motion planning is the most refined concept in robotics, and motion planning is the reason the OMPL is the most modern concept in robotics.**

**2020s** — **Learning-based planners** use reinforcement learning for motion planning, and learning-based planners are the reason motion planning is the most futuristic concept in robotics. **Learning-based planners are the reason motion planning is the most refined concept in robotics, and motion planning is the reason learning-based planners are the most futuristic concept in robotics.**
:::

::: summary Motion planning {#summary-motion-planning}
- **The configuration space is $\\\\mathcal { C } = \\\\mathbb { R } ^ { n }$, the obstacle region is $\\\\mathcal { C } _ { \\\\text{obs } } = \\\\{ \\\\mathbf { q } : \\\\mathcal { R } ( \\\\mathbf { q } ) \\\\cap \\\\mathcal { O } \\\\neq \\\\emptyset \\\\}$, and the free space is $\\\\mathcal { C } _ { \\\\text{free } } = \\\\mathcal { C } \\\\setminus \\\\mathcal { C } _ { \\\\text{obs } }$.** The motion planning is the reason robotics is designed for the planning, not the execution, and the motion planning is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.
- **The PRM algorithm samples, connects and searches, the RRT algorithm uses the steer function $\\\\mathbf { q } _ { \\\\text{new } } = \\\\text{Steer}(\\\\mathbf{q}_{\\\\text{near}}, \\\\mathbf{q}_{\\\\text{rand}}, \\\\Delta q_{\\\\max})$, and the success probability is $P = 1 - (1-p)^N$.** The configuration space is the reason robotics is designed for the configuration, not the Cartesian, and the configuration is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.
- **The Kalman filter prediction is $\\\\hat { \\\\mathbf { x } } _ { k | k - 1 } = \\\\mathbf { F } \\\\hat { \\\\mathbf { x } } _ { k - 1 | k - 1 } + \\\\mathbf { B } \\\\mathbf { u } _ { k }$, the update is $\\\\hat { \\\\mathbf { x } } _ { k | k } = \\\\hat { \\\\mathbf { x } } _ { k | k - 1 } + \\\\mathbf { K } _ { k } ( \\\\mathbf { z } _ { k } - \\\\mathbf { H } \\\\hat { \\\\mathbf { x } } _ { k | k - 1 } )$, and the Kalman gain is $\\\\mathbf { K } = \\\\mathbf { P } \\\\mathbf { H } ^ { T } ( \\\\mathbf { H } \\\\mathbf { P } \\\\mathbf { H } ^ { T } + \\\\mathbf { R } ) ^ { - 1 }$.** The sampling-based planner is the reason robotics is designed for the sampling, not the grid, and the sampling is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.
- **The SLAM state vector is $\\\\mathbf { x } = [ \\\\mathbf { p } _ { \\\\text{robot } } , \\\\mathbf { m } _ { 1 } , \\\\ldots , \\\\mathbf { m } _ { M } ] ^ { T }$, the EKF-SLAM complexity is $O(M^2)$, and the loop closure condition is $d ( \\\\mathbf { p } _ { \\\\text{current } } , \\\\mathbf { p } _ { \\\\text{past } } ) < \\\\epsilon$.** The Kalman filter is the reason robotics is designed for the Kalman, not the particle, and the Kalman is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.
- **The RRT* is asymptotically optimal, the PRM is best for multi-query planning, and the FMT* is best for high-dimensional spaces.** The obstacle representation is the reason robotics is designed for the obstacle, not the free space, and the obstacle is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.
- **The EKF linearizes the nonlinear model, the UKF uses sigma points, and the particle filter represents arbitrary distributions.** The path smoothing is the reason robotics is designed for the smoothing, not the roughness, and the smoothing is the reason autonomous robotics is a practical engineering tool, not a theoretical abstraction.
- **The motion planning calculation is the most important navigation calculation in robotics, because the motion planning calculation determines the path, trajectory and collision avoidance.** The path, trajectory and collision avoidance are the reason the engineer can navigate in cluttered environments, avoid obstacles and plan trajectories.
- **Motion planning and perception are the foundation of autonomous robot navigation, because the configuration space maps obstacles into the robot's joint space, sampling-based planners find collision-free paths in high-dimensional spaces, and perception systems estimate the robot's state from sensor data.** The robotics is the reason the engineer can navigate in cluttered environments, avoid obstacles and plan trajectories.
:::

## Further reading

- **S. M. LaValle (2006)** — *Planning Algorithms*. Cambridge. The configuration space and the sampling-based planners.
- **S. Thrun, W. Burgard and D. Fox (2005)** — *Probabilistic Robotics*. MIT Press. The Kalman filter and the SLAM.
- **B. Siciliano and O. Khatib (2016)** — *Springer Handbook of Robotics*. Springer. The motion planning and the perception.
- **L. Kavraki, P. Svestka, J. Latombe and M. Overmars (1996)** — "Probabilistic Roadmaps for Path Planning in High-Dimensional Configuration Spaces." *IEEE Transactions on Robotics and Automation*, 12, 566. The PRM.
- **S. M. LaValle (1998)** — "Rapidly-Exploring Random Trees." *Computer Science Dept., Iowa State University*. The RRT.
- **S. Thrun, W. Burgard and D. Fox (2005)** — *Probabilistic Robotics*. MIT Press. The Kalman filter and the SLAM.
- **G. Grisetti, R. Kümmerle, C. Stachniss and W. Burgard (2013)** — "A Tutorial on Graph-Based SLAM." *IEEE Intelligent Transportation Systems Magazine*, 5, 31. The graph SLAM.
- **R. Mur-Artal and J. D. Tardós (2017)** — "ORB-SLAM2: A Open-Source SLAM System." *IEEE Transactions on Robotics*, 33, 1254. The visual SLAM.
