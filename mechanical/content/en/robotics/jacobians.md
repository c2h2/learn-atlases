Forward kinematics tells us where the tool is; to move it smoothly we need to know how fast it moves when the joints move. Differentiating $T(\boldsymbol\theta(t))$ with respect to time gives a linear relation between the joint rates $\dot{\boldsymbol\theta}$ and the end-effector's linear and angular velocity, and the matrix of that relation is the **manipulator Jacobian** $J(\boldsymbol\theta)$. It is the most used object in robotics after the forward kinematics itself. It converts a desired tool velocity into joint rates (resolved-rate control), it drives the numerical inverse kinematics of [[robotics/inverse-kinematics]], and — through the principle of virtual work — its transpose converts a force at the tool into the joint torques that balance it. Where $J$ loses rank the robot is at a **singularity**: it cannot move the tool in some direction, needs unbounded joint rates to approach that direction, and can resist forces there without any joint torque. This chapter derives the geometric Jacobian column by column, locates singularities, measures how far a configuration is from them with Yoshikawa's manipulability and the velocity ellipsoid, proves the force–torque duality, and ends with redundant arms and the pseudoinverse. The rotation-matrix and screw machinery is from [[robotics/rigid-motions]]; the singular value decomposition is in Maths Atlas ([SVD](/learn/maths/lesson.php?c=linear-algebra&l=svd)).

## The geometric Jacobian {#sec-geometric}

Recall from [[robotics/rigid-motions]] that the angular velocity $\boldsymbol\omega$ of a frame with orientation $R(t)$ is defined by $\dot RR^{\mathsf T} = [\boldsymbol\omega]$, and that angular velocities of bodies in a chain *add*: if frame $i$ turns relative to frame $i-1$ with angular velocity $\boldsymbol\omega_{i-1,i}$, then $\boldsymbol\omega_{0,i} = \boldsymbol\omega_{0,i-1} + \boldsymbol\omega_{i-1,i}$ (all expressed in the same frame). Linear velocities of points obey the rigid-body rule $\mathbf v_P = \mathbf v_Q + \boldsymbol\omega\times(\mathbf p_P - \mathbf p_Q)$ ([[dynamics/three-dimensional-dynamics]]).

::: definition Geometric Jacobian {#def-jacobian}
For an $n$-joint arm with tool origin $\mathbf o_n(\boldsymbol\theta)$ and tool orientation $R_{0n}(\boldsymbol\theta)$, the **geometric Jacobian** $J(\boldsymbol\theta)\in\mathbb R^{6\times n}$ is the matrix such that
$$
\begin{bmatrix} \mathbf v\\ \boldsymbol\omega\end{bmatrix} = J(\boldsymbol\theta)\,\dot{\boldsymbol\theta} = \begin{bmatrix} J_v\\ J_\omega\end{bmatrix}\dot{\boldsymbol\theta},
$$ {#eq-jacobian}
where $\mathbf v = \dot{\mathbf o}_n$ is the linear velocity of the tool origin and $\boldsymbol\omega$ the angular velocity of the tool frame, both expressed in the base frame $\{0\}$. Column $i$ of $J$ is the tool's velocity when joint $i$ moves at unit rate and all other joints are still.
:::

We stack linear velocity first, as Spong et al. and Siciliano et al. do; Lynch and Park stack $(\boldsymbol\omega, \mathbf v)$ and express the linear part at a different point (the space Jacobian uses the velocity of the body point at the base origin). The content is the same; the formulas below are for the convention of [[#eq-jacobian]].

::: proposition Columns of the geometric Jacobian {#prop-columns}
With Denavit–Hartenberg frames, let $\mathbf z_{i-1}$ be the unit axis of joint $i$ and $\mathbf o_{i-1}$ the origin of frame $i-1$ (a point on that axis), both in base coordinates. Then column $i$ of $J$ is
$$
J_i = \begin{bmatrix} \mathbf z_{i-1}\times(\mathbf o_n - \mathbf o_{i-1})\\ \mathbf z_{i-1}\end{bmatrix} \ \text{(revolute)},
\qquad
J_i = \begin{bmatrix} \mathbf z_{i-1}\\ \mathbf 0\end{bmatrix}\ \text{(prismatic)}.
$$ {#eq-columns}
Here $\mathbf z_{i-1} = R_{0,i-1}\hat{\mathbf z}$ is the third column of $R_{0,i-1}$ and $\mathbf o_{i-1}$ is the translation part of $T_{0,i-1} = A_1\cdots A_{i-1}$.
:::

::: proof
Freeze every joint except joint $i$ and let it move at rate $\dot\theta_i$. Links $0,\dots,i-1$ are then at rest, and links $i,\dots,n$ move together as one rigid body attached to the joint.
*Revolute joint.* The outboard body rotates about the fixed line through $\mathbf o_{i-1}$ with direction $\mathbf z_{i-1}$, with angular velocity $\dot\theta_i\mathbf z_{i-1}$. The point $\mathbf o_{i-1}$ on the axis is at rest, so the tool origin has velocity $\dot\theta_i\mathbf z_{i-1}\times(\mathbf o_n - \mathbf o_{i-1})$. Changing the point on the axis changes $\mathbf o_n - \mathbf o_{i-1}$ by a multiple of $\mathbf z_{i-1}$, which does not change the cross product.
*Prismatic joint.* The outboard body translates along $\mathbf z_{i-1}$ with speed $\dot d_i$ and does not rotate: velocity $\dot d_i\mathbf z_{i-1}$, angular velocity $\mathbf 0$.
*Superposition.* When all joints move, the angular velocity of the tool is the sum of the relative angular velocities across the joints, $\boldsymbol\omega = \sum_{\text{revolute}}\dot\theta_i\mathbf z_{i-1}$. For the linear velocity, $\mathbf o_n(\boldsymbol\theta)$ is a smooth function, so by the chain rule $\dot{\mathbf o}_n = \sum_i(\partial\mathbf o_n/\partial\theta_i)\dot\theta_i$, and $\partial\mathbf o_n/\partial\theta_i$ is, by definition, the velocity of $\mathbf o_n$ when only joint $i$ moves at unit rate — the expression just found. Collecting the coefficients of each $\dot\theta_i$ gives [[#eq-columns]].
:::

The angular part $J_\omega$ is *not* in general the derivative of any three orientation coordinates (angular velocity is not the time derivative of a vector of angles). If a task is written in terms of a minimal orientation representation $\boldsymbol\phi$ (Euler or roll–pitch–yaw angles), the **analytic Jacobian** $J_a = \partial(\mathbf o_n, \boldsymbol\phi)/\partial\boldsymbol\theta$ is related to the geometric one by $J_a = \begin{bmatrix} I & 0\\ 0 & B(\boldsymbol\phi)^{-1}\end{bmatrix}J$, where $\boldsymbol\omega = B(\boldsymbol\phi)\dot{\boldsymbol\phi}$ is the rate map of [[robotics/rigid-motions]]; it inherits the representation singularities of $B$ (gimbal lock) in addition to the robot's own.

::: example The planar 2R Jacobian {#ex-2r-jacobian}
For a planar 2R arm ($L_1 = 0.6\,\mathrm m$, $L_2 = 0.5\,\mathrm m$) derive $J_v$ in two ways, evaluate it at $\boldsymbol\theta = (30^\circ, 60^\circ)$, and find the tip velocity for $\dot{\boldsymbol\theta} = (0.5, -1.0)\,\mathrm{rad/s}$.
::: solution
*By differentiation.* $x = L_1c_1 + L_2c_{12}$, $y = L_1s_1 + L_2s_{12}$, so
$$
J_v = \begin{bmatrix} \partial x/\partial\theta_1 & \partial x/\partial\theta_2\\ \partial y/\partial\theta_1 & \partial y/\partial\theta_2\end{bmatrix}
= \begin{bmatrix} -L_1s_1 - L_2s_{12} & -L_2s_{12}\\ L_1c_1 + L_2c_{12} & L_2c_{12}\end{bmatrix}.
$$
*By columns.* Both axes are $\mathbf z = \hat{\mathbf k}$; $\mathbf o_0 = \mathbf 0$, $\mathbf o_1 = L_1(c_1, s_1, 0)$, $\mathbf o_2 = (x, y, 0)$. Column 1: $\hat{\mathbf k}\times(x, y, 0) = (-y, x, 0)$; column 2: $\hat{\mathbf k}\times(\mathbf o_2 - \mathbf o_1) = (-L_2s_{12}, L_2c_{12}, 0)$. Same matrix ✓, and $J_\omega = [1\ \ 1]$ (the angular velocity is $\dot\theta_1 + \dot\theta_2$ about $\hat{\mathbf k}$).
*Numbers.* At $(30^\circ, 60^\circ)$: $s_1 = 0.5$, $c_1 = 0.8660$, $s_{12} = 1$, $c_{12} = 0$, so
$$
J_v = \begin{bmatrix} -0.3 - 0.5 & -0.5\\ 0.5196 + 0 & 0\end{bmatrix} = \begin{bmatrix} -0.8 & -0.5\\ 0.5196 & 0\end{bmatrix}\mathrm m,
\qquad
\mathbf v = J_v\begin{bmatrix} 0.5\\ -1.0\end{bmatrix} = \begin{bmatrix} -0.4 + 0.5\\ 0.2598\end{bmatrix} = \begin{bmatrix} 0.100\\ 0.260\end{bmatrix}\mathrm{m/s}.
$$
Sanity check: the second link points straight up ($\theta_1 + \theta_2 = 90^\circ$), so turning joint 2 alone can move the tip only horizontally — column 2 is $(-0.5, 0)$ ✓. The determinant is $(-0.8)(0) - (-0.5)(0.5196) = 0.2598\,\mathrm{m^2} = L_1L_2\sin\theta_2 = 0.3\times0.8660$ ✓.
:::
:::

::: example Jacobian of a SCARA arm {#ex-scara-jacobian}
Using the SCARA frames of [[robotics/forward-kinematics]] (axes $\mathbf z_0 = \mathbf z_1 = \hat{\mathbf k}$, $\mathbf z_2 = \mathbf z_3 = -\hat{\mathbf k}$; joints R, R, P, R), write the $6\times4$ Jacobian.
::: solution
With tool origin $\mathbf o_4 = (a_1c_1 + a_2c_{12},\ a_1s_1 + a_2s_{12},\ d_1 - d_3 - d_4)$ and $\mathbf o_1 = (a_1c_1, a_1s_1, d_1)$:
- joint 1 (R): $\hat{\mathbf k}\times(\mathbf o_4 - \mathbf o_0) = (-a_1s_1 - a_2s_{12},\ a_1c_1 + a_2c_{12},\ 0)$, angular part $\hat{\mathbf k}$;
- joint 2 (R): $\hat{\mathbf k}\times(\mathbf o_4 - \mathbf o_1) = (-a_2s_{12},\ a_2c_{12},\ 0)$, angular part $\hat{\mathbf k}$;
- joint 3 (P): linear part $\mathbf z_2 = (0, 0, -1)$, angular part $\mathbf 0$;
- joint 4 (R): $\mathbf o_4$ lies on the axis $\mathbf z_3$, so the linear part is $\mathbf 0$; angular part $(0,0,-1)$.
$$
J = \begin{bmatrix}
-a_1s_1 - a_2s_{12} & -a_2s_{12} & 0 & 0\\
a_1c_1 + a_2c_{12} & a_2c_{12} & 0 & 0\\
0 & 0 & -1 & 0\\
0 & 0 & 0 & 0\\
0 & 0 & 0 & 0\\
1 & 1 & 0 & -1
\end{bmatrix}.
$$
Rows 4 and 5 are zero — a SCARA cannot tilt its tool — so the rank is at most 4, matching its four DOF. The upper-left $2\times2$ block is the 2R Jacobian; it is singular when $\sin\theta_2 = 0$.
:::
:::

## Singularities {#sec-singularities}

::: definition Singular configuration {#def-singular}
A configuration $\boldsymbol\theta^*$ is **singular** if $J(\boldsymbol\theta^*)$ has lower rank than its maximum rank over all configurations. At a singularity some end-effector velocity directions cannot be produced by any joint rates, and (for a square $J$) $\det J(\boldsymbol\theta^*) = 0$.
:::

Singularities matter for three reasons. Velocities: near a singularity, $J^{-1}$ has huge entries, so a modest tool velocity in an almost-lost direction demands huge joint rates. Forces: at a singularity some tool forces are balanced with zero joint torque (see [[#sec-statics]]) — useful for supporting loads, but it means those directions cannot be force-controlled. Solutions: singular configurations usually separate the branches of inverse kinematics (elbow up from elbow down), so a path between branches must pass through one.

::: proposition Singularities of the 2R arm {#prop-2r-singular}
For the planar 2R arm, $\det J_v = L_1L_2\sin\theta_2$, so the singular configurations are $\theta_2 = 0$ (stretched) and $\theta_2 = \pi$ (folded), whatever $\theta_1$. At them the tip can move only perpendicular to the line from the base to the tip.
:::

::: proof
$\det J_v = (-L_1s_1 - L_2s_{12})L_2c_{12} + L_2s_{12}(L_1c_1 + L_2c_{12}) = L_1L_2(s_{12}c_1 - s_1c_{12}) = L_1L_2\sin(\theta_{12} - \theta_1) = L_1L_2\sin\theta_2$; the $L_2^2$ terms cancel. With $L_1L_2 \ne 0$, $\det J_v = 0$ iff $\sin\theta_2 = 0$. At $\theta_2 = 0$ or $\pi$ both columns, $(-y, x)$ and $(-L_2s_{12}, L_2c_{12})$, are perpendicular to the direction $(c_1, s_1)$ of the (collinear) links, which is also the direction from the base to the tip; so the range of $J_v$ is the line perpendicular to the arm. These are the boundaries of the workspace annulus found in [[robotics/forward-kinematics]].
:::

For a six-axis arm with a spherical wrist the $6\times6$ determinant factorises, which is the singularity counterpart of Pieper's decoupling.

::: proposition Decoupling of singularities {#prop-decouple-singular}
Let the last three joint axes of a 6R arm intersect at the wrist centre $\mathbf o_c$, and compute the linear velocity in [[#eq-jacobian]] at $\mathbf o_c$ instead of at the tool. Then
$$
J = \begin{bmatrix} J_{11} & 0\\ J_{21} & J_{22}\end{bmatrix},\qquad \det J = \det J_{11}\,\det J_{22},
$$
where $J_{11}$ ($3\times3$) is the position Jacobian of the wrist centre with respect to $\theta_1,\theta_2,\theta_3$ and $J_{22} = [\mathbf z_3\ \mathbf z_4\ \mathbf z_5]$. The arm is singular iff the *arm* is singular ($\det J_{11} = 0$) or the *wrist* is singular (two of the wrist axes $\mathbf z_3, \mathbf z_4, \mathbf z_5$ are parallel, i.e. $\theta_5 = 0$ or $\pi$ for a ZYZ wrist).
:::

::: proof
The reference point for linear velocity only changes $J$ by an invertible transformation: moving it from $\mathbf o_n$ to $\mathbf o_c$ replaces $\mathbf v$ by $\mathbf v - \boldsymbol\omega\times(\mathbf o_n - \mathbf o_c)$, i.e. $J$ by $\begin{bmatrix} I & [\mathbf o_n - \mathbf o_c]\\ 0 & I\end{bmatrix}J$, a matrix of determinant 1; so the singular configurations are unchanged. With the reference point at $\mathbf o_c$, columns 4–6 have linear part $\mathbf z_{i-1}\times(\mathbf o_c - \mathbf o_{i-1}) = \mathbf 0$ because $\mathbf o_c$ lies on each wrist axis. The upper-right block is zero, and the determinant of a block-triangular matrix is the product of the determinants of its diagonal blocks. Finally, $\det[\mathbf z_3\ \mathbf z_4\ \mathbf z_5] = 0$ iff the three unit vectors are coplanar; for a ZYZ wrist $\mathbf z_4 \perp \mathbf z_3$ and $\mathbf z_4\perp\mathbf z_5$ always, so they are coplanar iff $\mathbf z_5 = \pm\mathbf z_3$, i.e. $\sin\theta_5 = 0$.
:::

::: example Singularities of the elbow arm {#ex-elbow-singular}
For the elbow arm of [[robotics/forward-kinematics]] ($d_1 = 0.5$, $a_2 = 0.6$, $a_3 = 0.5\,\mathrm m$), find the arm singularities from the wrist-centre position $\mathbf o_c = \big(c_1 r,\ s_1 r,\ d_1 + a_2s_2 + a_3s_{23}\big)$ with $r = a_2c_2 + a_3c_{23}$.
::: solution
Differentiating and simplifying (or evaluating numerically and comparing) gives
$$
\det J_{11} = -a_2a_3\,s_3\,(a_2c_2 + a_3c_{23}) = -a_2a_3\,s_3\,r .
$$
At $\boldsymbol\theta = (30^\circ, 45^\circ, -60^\circ)$: $s_3 = -0.8660$ and $r = 0.9073\,\mathrm m$, so $\det J_{11} = -0.30\times(-0.8660)\times0.9073 = 0.2357\,\mathrm{m^3}$, which matches a numerical finite-difference Jacobian. Two families of singularity follow:
- **elbow singularity**, $s_3 = 0$: the forearm is aligned with the upper arm (stretched or folded), as for the 2R arm — at the boundary of the workspace;
- **shoulder singularity**, $r = 0$: the wrist centre is on the waist axis $\mathbf z_0$. Then turning the waist does not move the wrist centre at all, and it cannot be moved sideways by any joint rates; the waist angle needed to follow a path through the axis jumps by $180^\circ$.
The shoulder singularity is *inside* the workspace, which is why controllers check for it; the elbow singularity is at its boundary.
:::
:::

::: warning Singular is not the same as "small determinant"
$\det J$ has units (for the 2R arm, $\mathrm m^2$) and scales with the robot's size, so "$\lvert\det J\rvert < 0.01$" means different things for a watchmaking robot and a crane. For the full $6\times6$ Jacobian the units are also mixed (metres in the linear rows, dimensionless in the angular rows), so the determinant changes if you work in millimetres. Judge closeness to a singularity by a dimensionless quantity — the condition number $\sigma_{\max}/\sigma_{\min}$ of a consistently scaled Jacobian, or the manipulability of the position part alone — and always state which point the linear velocity refers to and in which frame $J$ is expressed: a Jacobian in the base frame and one in the tool frame differ by a rotation, and mixing them is a common bug.
:::

## Manipulability and the velocity ellipsoid {#sec-manipulability}

How well can the arm move in each direction? Feed in all joint-rate vectors of unit size and see which tool velocities come out.

::: definition Velocity ellipsoid and manipulability {#def-manipulability}
For a Jacobian $J\in\mathbb R^{m\times n}$ (the rows of the task of interest) with $\operatorname{rank}J = m$, the **velocity (manipulability) ellipsoid** is the image of the unit ball of joint rates, $\{J\dot{\boldsymbol\theta} : \lVert\dot{\boldsymbol\theta}\rVert \le 1\}$. **Yoshikawa's manipulability measure** is
$$
w(\boldsymbol\theta) = \sqrt{\det\big(J(\boldsymbol\theta)J(\boldsymbol\theta)^{\mathsf T}\big)} = \sigma_1\sigma_2\cdots\sigma_m ,
$$
the product of the singular values of $J$; for square $J$, $w = \lvert\det J\rvert$.
:::

::: proposition Shape of the velocity ellipsoid {#prop-ellipsoid}
Let $J = U\Sigma V^{\mathsf T}$ be a singular value decomposition with singular values $\sigma_1 \ge \dots \ge \sigma_m > 0$ and left singular vectors $\mathbf u_1,\dots,\mathbf u_m$. The velocity ellipsoid is the solid ellipsoid with principal axes along $\mathbf u_i$ and semi-axes $\sigma_i$:
$$
\{\mathbf v : \mathbf v^{\mathsf T}(JJ^{\mathsf T})^{-1}\mathbf v \le 1\}.
$$
Its volume is proportional to $w$.
:::

::: proof
Write $\dot{\boldsymbol\theta} = V\boldsymbol\beta$; since $V$ is orthogonal, $\lVert\boldsymbol\beta\rVert = \lVert\dot{\boldsymbol\theta}\rVert$, so $\boldsymbol\beta$ ranges over the unit ball of $\mathbb R^n$. Then $\mathbf v = U\Sigma\boldsymbol\beta$; in the coordinates $\boldsymbol\eta = U^{\mathsf T}\mathbf v$ this is $\eta_i = \sigma_i\beta_i$ for $i \le m$, the components $\beta_{m+1},\dots,\beta_n$ having no effect. The set of $\boldsymbol\eta$ reachable with $\sum\beta_i^2 \le 1$ is exactly $\sum_{i\le m}\eta_i^2/\sigma_i^2 \le 1$ (choose $\beta_i = \eta_i/\sigma_i$ and the remaining $\beta$'s zero), an ellipsoid with semi-axes $\sigma_i$ along the coordinate axes of $\boldsymbol\eta$, i.e. along $\mathbf u_i$ in $\mathbf v$-space. In matrix form, $\sum\eta_i^2/\sigma_i^2 = \mathbf v^{\mathsf T}U\Sigma_m^{-2}U^{\mathsf T}\mathbf v = \mathbf v^{\mathsf T}(JJ^{\mathsf T})^{-1}\mathbf v$, since $JJ^{\mathsf T} = U\Sigma_m^2U^{\mathsf T}$. The volume of an ellipsoid is that of the unit ball times the product of its semi-axes, $\sigma_1\cdots\sigma_m = \sqrt{\det(U\Sigma_m^2U^{\mathsf T})} = w$.
:::

For the 2R arm, $w = \lvert\det J_v\rvert = L_1L_2\lvert\sin\theta_2\rvert$: largest at $\theta_2 = \pm90^\circ$, zero at the singularities. The ratio $\sigma_{\min}/\sigma_{\max}$ (the inverse condition number) measures isotropy — how round the ellipse is.

::: example The velocity ellipse of a 2R arm {#ex-ellipse}
For $J_v = \begin{bmatrix} -0.8 & -0.5\\ 0.5196 & 0\end{bmatrix}\mathrm m$ from [[#ex-2r-jacobian]], find the velocity ellipse and the manipulability.
::: solution
$$
J_vJ_v^{\mathsf T} = \begin{bmatrix} 0.64 + 0.25 & -0.4157\\ -0.4157 & 0.27\end{bmatrix} = \begin{bmatrix} 0.89 & -0.4157\\ -0.4157 & 0.27\end{bmatrix}\mathrm{m^2},
$$
with trace $1.16$ and determinant $0.89\times0.27 - 0.4157^2 = 0.2403 - 0.1728 = 0.0675\,\mathrm{m^4}$. Its eigenvalues are $\sigma^2 = \frac12\big(1.16 \pm \sqrt{1.16^2 - 4\times0.0675}\big) = \frac12(1.16 \pm 1.0371)$, i.e. $1.0986$ and $0.0615\,\mathrm{m^2}$, so $\sigma_1 = 1.048\,\mathrm m$ and $\sigma_2 = 0.248\,\mathrm m$. The manipulability is $w = \sqrt{0.0675} = 0.2598\,\mathrm{m^2} = \sigma_1\sigma_2$ ✓ $= L_1L_2\sin60^\circ$ ✓. The major axis is along $\mathbf u_1 = (-0.894, 0.448)$, at $153.4^\circ$ (equivalently $-26.6^\circ$), and the minor along $(0.448, 0.894)$, at $63.4^\circ$. So with joint rates of at most $1\,\mathrm{rad/s}$ in norm, the tip can move at up to $1.05\,\mathrm{m/s}$ roughly along the direction $153^\circ$ but only $0.25\,\mathrm{m/s}$ along $63^\circ$ — close to the direction of the line from the base to the tip ($\operatorname{atan2}(0.8, 0.5196) = 57^\circ$), because extending or retracting the arm requires opening the elbow.
:::
:::

::: widget svd
matrix: -0.8, -0.5; 0.5196, 0
caption: The 2R Jacobian of the worked example, $J_v = U\Sigma V^{\mathsf T}$, applied step by step to the unit circle of joint rates: the image is the velocity ellipse with semi-axes $\sigma_1 = 1.05$ and $\sigma_2 = 0.25\,\mathrm m$. Edit the matrix to the Jacobian at a nearly stretched configuration, for example $\theta = (0^\circ, 10^\circ)$, where $J_v = \begin{bmatrix} -0.087 & -0.087\\ 1.092 & 0.492\end{bmatrix}$: the ellipse collapses towards a line segment perpendicular to the arm, and $\sigma_2$ — the speed available radially — almost vanishes.
:::

::: widget plot
f: sqrt((L1^2 + 2*L2^2 + 2*L1*L2*cos(x) + sqrt((L1^2 + 2*L2^2 + 2*L1*L2*cos(x))^2 - 4*(L1*L2*sin(x))^2))/2); sqrt(abs(L1^2 + 2*L2^2 + 2*L1*L2*cos(x) - sqrt((L1^2 + 2*L2^2 + 2*L1*L2*cos(x))^2 - 4*(L1*L2*sin(x))^2))/2); L1*L2*abs(sin(x))
x: -pi, pi
y: 0, 2
sliders: L1=0.6:0.2:1:0.05; L2=0.5:0.2:1:0.05
labels: \sigma_1\ (\mathrm m); \sigma_2\ (\mathrm m); w\ (\mathrm{m^2})
piticks: true
caption: Singular values $\sigma_1 \ge \sigma_2$ and manipulability $w = \sigma_1\sigma_2$ of the 2R arm against the elbow angle $\theta_2$ (they do not depend on $\theta_1$). $\sigma_2$ and $w$ vanish at $\theta_2 = 0$ and $\pm\pi$, the singularities. The manipulability peaks at $\theta_2 = \pm\pi/2$ whatever the link lengths; but the ellipse is roundest (largest $\sigma_2/\sigma_1$) at a different elbow angle that depends on $L_1/L_2$ — two reasonable measures of "dexterity" disagree, so state which one a design optimises.
:::

## Statics: forces and torques {#sec-statics}

The Jacobian also relates forces. Let the tool exert a force $\mathbf f$ and a moment $\mathbf n$ on its environment — together the **wrench** $\mathbf F = (\mathbf f, \mathbf n)$, with $\mathbf f$ acting at the tool origin — while the arm is in equilibrium.

::: theorem Force–torque relation {#thm-statics}
If a frictionless, rigid serial arm holds static equilibrium while its tool exerts the wrench $\mathbf F = (\mathbf f, \mathbf n)$ on the environment, and gravity and other loads on the links are balanced separately, the joint torques (for revolute joints) and forces (for prismatic joints) required are
$$
\boldsymbol\tau = J(\boldsymbol\theta)^{\mathsf T}\mathbf F .
$$ {#eq-statics}
:::

::: proof
Use the principle of virtual work ([[dynamics/rigid-body-energy-momentum]]). Give the joints an arbitrary virtual displacement $\delta\boldsymbol\theta$ consistent with the constraints. The tool undergoes the virtual displacement $\delta\mathbf x = (\delta\mathbf p, \delta\boldsymbol\phi) = J\delta\boldsymbol\theta$ (the velocity relation [[#eq-jacobian]] multiplied by $\delta t$; $\delta\boldsymbol\phi$ is an infinitesimal rotation vector). The actuators do virtual work $\boldsymbol\tau^{\mathsf T}\delta\boldsymbol\theta$ on the arm; the environment exerts the reaction $-\mathbf F$ on the tool and does virtual work $-\mathbf f\cdot\delta\mathbf p - \mathbf n\cdot\delta\boldsymbol\phi = -\mathbf F^{\mathsf T}J\delta\boldsymbol\theta$. The joints and links are frictionless and rigid, so internal forces do no work, and in equilibrium the total virtual work vanishes for every $\delta\boldsymbol\theta$:
$$
\boldsymbol\tau^{\mathsf T}\delta\boldsymbol\theta - \mathbf F^{\mathsf T}J\delta\boldsymbol\theta = (\boldsymbol\tau - J^{\mathsf T}\mathbf F)^{\mathsf T}\delta\boldsymbol\theta = 0\quad\text{for all }\delta\boldsymbol\theta,
$$
hence $\boldsymbol\tau = J^{\mathsf T}\mathbf F$. Equivalently, power is conserved: $\boldsymbol\tau^{\mathsf T}\dot{\boldsymbol\theta} = \mathbf F^{\mathsf T}\mathbf v$.
:::

Two consequences. First, **at a singularity** there is a non-zero $\mathbf F$ with $J^{\mathsf T}\mathbf F = \mathbf 0$ (the null space of $J^{\mathsf T}$ is the orthogonal complement of the range of $J$): a wrench along a "lost" velocity direction is carried entirely by the structure, with no joint torque. A stretched arm can hold an axial load with slack motors; a person straightens their arms to push a heavy car. Second, **duality**: the set of tool forces produced by joint torques with $\lVert\boldsymbol\tau\rVert\le1$ is the ellipsoid $\{\mathbf F : \mathbf F^{\mathsf T}JJ^{\mathsf T}\mathbf F \le 1\}$, with the *same* principal axes $\mathbf u_i$ as the velocity ellipsoid but semi-axes $1/\sigma_i$. Directions in which the arm moves fast are directions in which it pushes weakly, and vice versa — a lever.

::: example Joint torques for a pressing task {#ex-statics}
The 2R arm of [[#ex-2r-jacobian]] at $(30^\circ, 60^\circ)$ presses its tip down on a table with a force of $20\,\mathrm N$. Find the joint torques. Then find the torques needed to hold a $2.0\,\mathrm{kg}$ mass at the tip with the arm stretched horizontally along $+x$ (ignore the arm's own weight; $g = 9.81\,\mathrm{m/s^2}$).
::: solution
*Pressing.* The tip exerts $\mathbf f = (0, -20)\,\mathrm N$ on the table (in the vertical plane of the arm, with $y$ up). By [[#eq-statics]] with the planar position Jacobian,
$$
\boldsymbol\tau = J_v^{\mathsf T}\mathbf f = \begin{bmatrix} -0.8 & 0.5196\\ -0.5 & 0\end{bmatrix}\begin{bmatrix} 0\\ -20\end{bmatrix} = \begin{bmatrix} -10.39\\ 0\end{bmatrix}\mathrm{N\,m}.
$$
Joint 2 needs no torque: link 2 is vertical, so the force acts along it and passes through joint 2. Check by statics of the whole arm: the moment about joint 1 of the reaction $(0, +20)\,\mathrm N$ from the table on the tip, which is at $x = 0.6\cos30^\circ = 0.5196\,\mathrm m$, is $+20\times0.5196 = 10.39\,\mathrm{N\,m}$ anticlockwise, and the motor must supply $-10.39\,\mathrm{N\,m}$ to balance it ✓.
*Holding a mass stretched out.* At $\boldsymbol\theta = (0, 0)$, $J_v = \begin{bmatrix} 0 & 0\\ 1.1 & 0.5\end{bmatrix}\mathrm m$. To support the weight the tip must push up on the mass with $\mathbf f = (0, mg) = (0, 19.62)\,\mathrm N$, so $\boldsymbol\tau = (1.1\times19.62,\ 0.5\times19.62) = (21.6, 9.81)\,\mathrm{N\,m}$ — the weight times the horizontal distance from each joint, as elementary statics says. This configuration is singular: a horizontal force $(f_x, 0)$ along the arm gives $\boldsymbol\tau = J_v^{\mathsf T}(f_x, 0) = \mathbf 0$, so the arm can push or pull along its length with no motor torque at all (and cannot control that force).
:::
:::

::: quiz
A planar 2R arm is at a configuration where $\sigma_1 = 1.0\,\mathrm m$ and $\sigma_2 = 0.1\,\mathrm m$. Joint torques are limited to $\lVert\boldsymbol\tau\rVert \le 10\,\mathrm{N\,m}$. In the direction $\mathbf u_2$, compared with direction $\mathbf u_1$, the arm can
- [ ] move 10 times faster and push 10 times harder.
- [x] move 10 times slower and push 10 times harder.
- [ ] move 10 times slower and push 10 times less hard.
- [ ] move and push equally well, because the torque limit is the same.
::: solution
The velocity semi-axes are $\sigma_i$ and the force semi-axes are $1/\sigma_i$ (times the torque bound): $1\,\mathrm{m/s}$ and $0.1\,\mathrm{m/s}$ per $\mathrm{rad/s}$, but $10$ and $100\,\mathrm N$ for $10\,\mathrm{N\,m}$. Along $\mathbf u_2$ the arm is a low-gear lever: slow and strong.
:::
:::

## Resolved-rate control and redundancy {#sec-resolved}

To move the tool with a desired velocity $\mathbf v_d$, command the joint rates $\dot{\boldsymbol\theta} = J(\boldsymbol\theta)^{-1}\mathbf v_d$ at each control step: **resolved-rate control**. Integrated over time with feedback of the position error, $\dot{\boldsymbol\theta} = J^{-1}(\mathbf v_d + K\mathbf e)$, it tracks Cartesian paths, and it is the continuous-time version of Newton's method in [[robotics/inverse-kinematics]]. For a redundant arm ($n > m$) $J$ has no inverse and $J\dot{\boldsymbol\theta} = \mathbf v_d$ has infinitely many solutions.

::: proposition Minimum-norm joint rates and the null space {#prop-pseudoinverse}
Let $J\in\mathbb R^{m\times n}$ have full row rank $m < n$, and let $J^{+} = J^{\mathsf T}(JJ^{\mathsf T})^{-1}$. Then (a) $\dot{\boldsymbol\theta} = J^{+}\mathbf v_d$ is the solution of $J\dot{\boldsymbol\theta} = \mathbf v_d$ with the smallest norm $\lVert\dot{\boldsymbol\theta}\rVert$; (b) every solution has the form
$$
\dot{\boldsymbol\theta} = J^{+}\mathbf v_d + (I - J^{+}J)\,\dot{\boldsymbol\theta}_0
$$ {#eq-nullspace}
for some $\dot{\boldsymbol\theta}_0\in\mathbb R^n$, where $I - J^{+}J$ projects onto the null space of $J$.
:::

::: proof
(a) $JJ^{+}\mathbf v_d = JJ^{\mathsf T}(JJ^{\mathsf T})^{-1}\mathbf v_d = \mathbf v_d$, so $J^{+}\mathbf v_d$ is a solution; $JJ^{\mathsf T}$ is invertible because $J$ has full row rank. Any other solution differs from it by $\mathbf n$ with $J\mathbf n = \mathbf 0$. Now $J^{+}\mathbf v_d = J^{\mathsf T}\mathbf y$ (with $\mathbf y = (JJ^{\mathsf T})^{-1}\mathbf v_d$) lies in the row space of $J$, which is orthogonal to the null space: $\mathbf n^{\mathsf T}J^{\mathsf T}\mathbf y = (J\mathbf n)^{\mathsf T}\mathbf y = 0$. By Pythagoras, $\lVert J^{+}\mathbf v_d + \mathbf n\rVert^2 = \lVert J^{+}\mathbf v_d\rVert^2 + \lVert\mathbf n\rVert^2$, minimised by $\mathbf n = \mathbf 0$. (b) $J(I - J^{+}J) = J - JJ^{+}J = J - J = 0$, so every vector of the form [[#eq-nullspace]] is a solution; conversely, a solution $\dot{\boldsymbol\theta}$ equals [[#eq-nullspace]] with $\dot{\boldsymbol\theta}_0 = \dot{\boldsymbol\theta}$, because $(I - J^{+}J)\dot{\boldsymbol\theta} = \dot{\boldsymbol\theta} - J^{+}\mathbf v_d$.
:::

The null-space term moves the joints without moving the tool — **self-motion** — and is used to pursue secondary goals: choose $\dot{\boldsymbol\theta}_0 = k\nabla_{\boldsymbol\theta}h$ to climb a criterion $h(\boldsymbol\theta)$ such as manipulability or distance from joint limits and obstacles.

::: example A redundant planar arm near a singularity {#ex-redundant}
The planar 3R arm with $L_1 = 0.4$, $L_2 = 0.3$, $L_3 = 0.1\,\mathrm m$ positions only its tip (task $m = 2$, $n = 3$). At $\boldsymbol\theta = (0^\circ, 10^\circ, 90^\circ)$ the first two links are almost aligned. Compare the joint rates needed for a tip velocity $\mathbf v_d = (0.1, 0)\,\mathrm{m/s}$ (pulling the tip back along the arm) (a) with joint 3 locked, (b) with the pseudoinverse.
::: solution
Column $i$ of the $2\times3$ position Jacobian is $\hat{\mathbf k}\times(\mathbf o_3 - \mathbf o_{i-1})$; with absolute link angles $0^\circ, 10^\circ, 100^\circ$:
$$
J = \begin{bmatrix} -0.1506 & -0.1506 & -0.0985\\ 0.6781 & 0.2781 & -0.0174\end{bmatrix}\mathrm m.
$$
(a) Locking joint 3 leaves the first two columns, a nearly singular 2R arm: solving gives $\dot{\boldsymbol\theta} = (0.462, -1.126, 0)\,\mathrm{rad/s}$, $\lVert\dot{\boldsymbol\theta}\rVert = 1.22\,\mathrm{rad/s}$.
(b) $JJ^{\mathsf T} = \begin{bmatrix} 0.0550 & -0.1423\\ -0.1423 & 0.5374\end{bmatrix}$ and $\dot{\boldsymbol\theta} = J^{\mathsf T}(JJ^{\mathsf T})^{-1}\mathbf v_d = (0.166, -0.443, -0.593)\,\mathrm{rad/s}$, with norm $0.758\,\mathrm{rad/s}$ — 38% less, because the third joint, which is well placed to move the tip along $x$, takes a large share. Check: $J\dot{\boldsymbol\theta} = (-0.0250 + 0.0667 + 0.0584,\ 0.1129 - 0.1232 + 0.0103) = (0.100, 0.000)\,\mathrm{m/s}$ ✓.
:::
:::

Near singularities even the pseudoinverse produces large rates; the damped least-squares inverse $J^{\mathsf T}(JJ^{\mathsf T} + \lambda^2I)^{-1}$ of [[robotics/inverse-kinematics]] bounds them at the cost of a small tracking error.

::: history
Daniel Whitney's 1969 paper "Resolved motion rate control of manipulators and human prostheses" introduced the idea of commanding joint rates through the inverse Jacobian so that an operator could specify motion in Cartesian terms; resolved-rate control is still used for teleoperated arms. Tsuneo Yoshikawa's 1985 paper "Manipulability of robotic mechanisms" defined the manipulability measure $\sqrt{\det JJ^{\mathsf T}}$ and the velocity ellipsoid, giving a quantitative way to compare configurations and arm designs. The force–velocity duality through $J^{\mathsf T}$ is the principle of virtual work, which goes back to Lagrange's *Mécanique analytique* (1788).
:::

::: summary
- The geometric Jacobian maps joint rates to tool velocity, $(\mathbf v, \boldsymbol\omega) = J\dot{\boldsymbol\theta}$; revolute column $(\mathbf z_{i-1}\times(\mathbf o_n - \mathbf o_{i-1}), \mathbf z_{i-1})$, prismatic column $(\mathbf z_{i-1}, \mathbf 0)$.
- For the planar 2R arm $\det J_v = L_1L_2\sin\theta_2$; singular when stretched or folded.
- Singular configurations lose velocity directions, demand large joint rates nearby, and separate IK branches. With a spherical wrist $\det J = \det J_{11}\det J_{22}$: arm (elbow, shoulder) and wrist ($\theta_5 = 0$) singularities.
- Manipulability $w = \sqrt{\det JJ^{\mathsf T}} = \prod\sigma_i$; the velocity ellipsoid has semi-axes $\sigma_i$ along the left singular vectors.
- Statics: $\boldsymbol\tau = J^{\mathsf T}\mathbf F$ (virtual work); the force ellipsoid has the same axes with semi-axes $1/\sigma_i$; at singularities some wrenches need no torque.
- Resolved rates $\dot{\boldsymbol\theta} = J^{-1}\mathbf v_d$; for redundant arms $J^{+} = J^{\mathsf T}(JJ^{\mathsf T})^{-1}$ gives minimum-norm rates and $(I - J^{+}J)\dot{\boldsymbol\theta}_0$ adds self-motion.
:::

## Exercises

::: exercise Determinant of a 2R Jacobian {#exr-det level=1 check="0.15"}
A 2R arm with $L_1 = 0.6\,\mathrm m$, $L_2 = 0.5\,\mathrm m$ has $\theta_2 = 30^\circ$. Find $\det J_v$. (Enter it in $\mathrm{m^2}$.)
::: solution
$\det J_v = L_1L_2\sin\theta_2 = 0.30\times0.5 = 0.15\,\mathrm{m^2}$, independent of $\theta_1$. It is $58\%$ of the maximum $0.30\,\mathrm{m^2}$ at $\theta_2 = 90^\circ$.
:::
:::

::: exercise Tip velocity {#exr-vel level=1 check="0.1697"}
For the 2R arm with $L_1 = 0.6$, $L_2 = 0.5\,\mathrm m$ at $\boldsymbol\theta = (45^\circ, 45^\circ)$ with $\dot{\boldsymbol\theta} = (0.4, 0.3)\,\mathrm{rad/s}$, find the tip velocity. (Enter $\dot y$ in m/s, rounded to four decimal places.)
::: solution
At $\theta_1 = 45^\circ$, $\theta_1 + \theta_2 = 90^\circ$: $\dot x = -(L_1s_1 + L_2s_{12})\dot\theta_1 - L_2s_{12}\dot\theta_2 = -(0.4243 + 0.5)(0.4) - 0.5(0.3) = -0.370 - 0.150 = -0.520\,\mathrm{m/s}$; $\dot y = (L_1c_1 + L_2c_{12})\dot\theta_1 + L_2c_{12}\dot\theta_2 = 0.4243\times0.4 + 0 = 0.170\,\mathrm{m/s}$. The second link is vertical, so its rotation contributes only to $\dot x$.
:::
:::

::: exercise Holding a load {#exr-load level=1 check="11"}
The 2R arm ($L_1 = 0.6$, $L_2 = 0.5\,\mathrm m$) is stretched horizontally, $\boldsymbol\theta = (0, 0)$, and supports a $10\,\mathrm N$ weight hanging from its tip. Find the joint torques. (Enter $\tau_1$ in N·m.)
::: solution
The tip must push up with $\mathbf f = (0, 10)\,\mathrm N$; $J_v^{\mathsf T} = \begin{bmatrix} 0 & 1.1\\ 0 & 0.5\end{bmatrix}$, so $\boldsymbol\tau = (11, 5)\,\mathrm{N\,m}$: weight times lever arm about each joint ✓.
:::
:::

::: exercise Best manipulability {#exr-best level=2 check="0.3"}
For the 2R arm with $L_1 = 0.6$, $L_2 = 0.5\,\mathrm m$, find the elbow angle that maximises $w$ and the maximum value. If the total length $L_1 + L_2 = 1.1\,\mathrm m$ is fixed, which split maximises the best manipulability? (Enter the maximum $w$ for the given arm, in $\mathrm{m^2}$.)
::: solution
$w = L_1L_2\lvert\sin\theta_2\rvert$ is maximal at $\theta_2 = \pm90^\circ$, $w_{\max} = 0.30\,\mathrm{m^2}$. With $L_1 + L_2 = \ell$ fixed, $L_1L_2 \le (\ell/2)^2$ with equality for equal links: $L_1 = L_2 = 0.55\,\mathrm m$ gives $0.3025\,\mathrm{m^2}$ — barely more. Yoshikawa's analysis of this case is one reason many arms have nearly equal upper arm and forearm.
:::
:::

::: exercise Shoulder singularity {#exr-shoulder level=2 check="66.87"}
For the elbow arm with $a_2 = 0.6$, $a_3 = 0.5\,\mathrm m$ and $\theta_2 = 60^\circ$, find the elbow angle $\theta_3\in(0^\circ, 180^\circ)$ that puts the wrist centre on the waist axis. (Enter $\theta_3$ in degrees, rounded to two decimal places.)
::: solution
The shoulder singularity is $r = a_2c_2 + a_3c_{23} = 0$: $0.6\times0.5 + 0.5\cos(60^\circ + \theta_3) = 0$, so $\cos(60^\circ + \theta_3) = -0.6$, $60^\circ + \theta_3 = 126.87^\circ$, $\theta_3 = 66.87^\circ$. At this configuration $\det J_{11} = -a_2a_3s_3r = 0$ even though the elbow is far from straight.
:::
:::

::: exercise Velocity ellipse axes {#exr-ellipse level=2 check="0.2479"}
Show that for the Jacobian of [[#ex-2r-jacobian]] the smallest singular value is $\sigma_2 = \sqrt{\big(1.16 - \sqrt{1.16^2 - 4\times0.0675}\big)/2}\,\mathrm m$, and interpret it as a speed. (Enter $\sigma_2$ in m, rounded to four decimal places.)
::: solution
$\sigma_i^2$ are the eigenvalues of $J_vJ_v^{\mathsf T}$, roots of $\lambda^2 - (\operatorname{tr})\lambda + \det = 0$ with $\operatorname{tr} = 1.16\,\mathrm{m^2}$ and $\det = 0.0675\,\mathrm{m^4}$ ([[#ex-ellipse]]); the smaller root gives $\sigma_2 = 0.248\,\mathrm m$. With joint rates of norm $1\,\mathrm{rad/s}$, the tip can move at only $0.248\,\mathrm{m/s}$ along $\mathbf u_2 = (0.448, 0.894)$, its slowest direction; to move at $0.5\,\mathrm{m/s}$ in that direction requires joint rates of norm $0.5/0.248 = 2.0\,\mathrm{rad/s}$.
:::
:::

::: exercise The force ellipsoid {#exr-force-ellipsoid level=3}
Prove that the set of tool forces $\{\mathbf F : \mathbf F = (J^{\mathsf T})^{-1}\boldsymbol\tau,\ \lVert\boldsymbol\tau\rVert\le1\}$ for a square, non-singular $J$ is the ellipsoid $\mathbf F^{\mathsf T}JJ^{\mathsf T}\mathbf F\le1$ with principal axes $\mathbf u_i$ and semi-axes $1/\sigma_i$. Deduce that the product of a velocity semi-axis and the force semi-axis in the same direction is 1, and explain this in terms of power.
::: solution
$\boldsymbol\tau = J^{\mathsf T}\mathbf F$, so $\lVert\boldsymbol\tau\rVert^2 = \mathbf F^{\mathsf T}JJ^{\mathsf T}\mathbf F \le 1$. With $JJ^{\mathsf T} = U\Sigma^2U^{\mathsf T}$ and $\boldsymbol\eta = U^{\mathsf T}\mathbf F$, the condition is $\sum\sigma_i^2\eta_i^2\le1$: an ellipsoid with axes $\mathbf u_i$ and semi-axes $1/\sigma_i$. Velocity semi-axis times force semi-axis is $\sigma_i\cdot(1/\sigma_i) = 1$. Power: a unit-norm joint-rate vector along $\mathbf v_i$ gives tool velocity $\sigma_i\mathbf u_i$, and a unit-norm torque vector along $\mathbf v_i$ gives tool force $\mathbf u_i/\sigma_i$; the power $\mathbf F^{\mathsf T}\mathbf v = (1/\sigma_i)\sigma_i = 1 = \boldsymbol\tau^{\mathsf T}\dot{\boldsymbol\theta}$ is the same on both sides, as it must be for an ideal (lossless) transmission. The arm is a configuration-dependent gearbox whose "gear ratio" in direction $\mathbf u_i$ is $\sigma_i$.
:::
:::

::: exercise Jacobian of the elbow arm {#exr-elbow-jacobian level=3}
Derive the $3\times3$ position Jacobian $J_{11}$ of the elbow arm's wrist centre $\mathbf o_c = (c_1r, s_1r, d_1 + a_2s_2 + a_3s_{23})$, $r = a_2c_2 + a_3c_{23}$, and show that $\det J_{11} = -a_2a_3s_3r$.
::: solution
$$
J_{11} = \begin{bmatrix} -s_1r & c_1\,\partial r/\partial\theta_2 & c_1\,\partial r/\partial\theta_3\\ c_1r & s_1\,\partial r/\partial\theta_2 & s_1\,\partial r/\partial\theta_3\\ 0 & a_2c_2 + a_3c_{23} & a_3c_{23}\end{bmatrix},
\quad \frac{\partial r}{\partial\theta_2} = -a_2s_2 - a_3s_{23},\quad \frac{\partial r}{\partial\theta_3} = -a_3s_{23}.
$$
Expand along the first column. The first two rows of columns 2 and 3 are $c_1$ and $s_1$ times the same pair $(p, q) = (-a_2s_2 - a_3s_{23}, -a_3s_{23})$, so
$$
\det J_{11} = -s_1r\big(s_1p\,a_3c_{23} - s_1q\,r\big) - c_1r\big(c_1p\,a_3c_{23} - c_1q\,r\big) = -r\big(p\,a_3c_{23} - q\,r\big),
$$
using $s_1^2 + c_1^2 = 1$ and that the third-row entries are $r$ and $a_3c_{23}$. Now $p\,a_3c_{23} - q\,r = (-a_2s_2 - a_3s_{23})a_3c_{23} + a_3s_{23}(a_2c_2 + a_3c_{23}) = a_2a_3(s_{23}c_2 - s_2c_{23}) = a_2a_3s_3$. Hence $\det J_{11} = -a_2a_3s_3r$, which at $(30^\circ, 45^\circ, -60^\circ)$ gives $0.2357\,\mathrm{m^3}$, as found numerically in [[#ex-elbow-singular]].
:::
:::

::: exercise Choosing a working posture {#exr-posture level=3}
A 2R arm with $L_1 = L_2 = 0.5\,\mathrm m$ and joint torque limits of $30\,\mathrm{N\,m}$ on each joint must (i) press down on a workpiece with $60\,\mathrm N$ and (ii) also slide along it horizontally at up to $0.5\,\mathrm{m/s}$ with joint rates under $2\,\mathrm{rad/s}$. The workpiece surface can be placed anywhere within reach. Propose a posture and justify it with the velocity and force ellipses; check the torque requirement for your choice.
::: solution
The two requirements pull in different directions: pressing hard downwards wants the force ellipse long in $y$ (velocity ellipse short in $y$), sliding fast horizontally wants the velocity ellipse long in $x$. Both are satisfied when the arm's slow, strong direction is vertical — that is, when the line from the base to the tip is vertical, with the elbow bent. One choice: workpiece directly below the base at depth $r = 0.707\,\mathrm m$ ($\theta_2 = 90^\circ$), $\theta_1 = -135^\circ$, so link 1 points down-left and link 2 down-right. Then $J_v = \begin{bmatrix} 0.354 + 0.354 & 0.354\\ -0.354 + 0.354 & 0.354\end{bmatrix} = \begin{bmatrix} 0.707 & 0.354\\ 0 & 0.354\end{bmatrix}\mathrm m$ (using $s_1 = c_1 = -0.707$, $s_{12} = -0.707$, $c_{12} = 0.707$). Pressing with $\mathbf f = (0, -60)\,\mathrm N$: $\boldsymbol\tau = J_v^{\mathsf T}\mathbf f = (0, -21.2)\,\mathrm{N\,m}$, within limits. Sliding at $\dot x = 0.5\,\mathrm{m/s}$, $\dot y = 0$: $\dot\theta_2 = 0$ and $\dot\theta_1 = 0.5/0.707 = 0.71\,\mathrm{rad/s}$, within limits — the whole arm swings about the base. A stretched-down posture would press with zero torque but could not slide (singular); a posture with the tip far to the side would slide easily but need large torques to press. Other answers are acceptable if they check both ellipses and the numbers.
:::
:::

## Further reading

Spong, Hutchinson and Vidyasagar derive the geometric Jacobian, singularity decoupling and the analytic Jacobian in this chapter's notation; Siciliano et al. treat redundancy, the pseudoinverse, damped least squares and the manipulability and force ellipsoids in depth; Lynch and Park give the space and body Jacobians in screw notation.
