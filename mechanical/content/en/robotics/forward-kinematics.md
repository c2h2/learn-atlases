A robot controller knows its joint angles: every joint carries an encoder ([[mechatronics/sensors]]). What the task cares about is where the tool is — the position of the gripper's fingertips and the direction of its approach. **Forward kinematics** is the map from the first to the second: given the joint variables $\boldsymbol\theta = (\theta_1,\dots,\theta_n)$, compute the pose $T(\boldsymbol\theta) \in SE(3)$ of the end-effector frame relative to the base. It is always possible and always unique, because it is just a product of the homogeneous transformations of [[robotics/rigid-motions]], one per joint; the art lies in choosing the frames so that each factor is simple and the result can be checked. This chapter first defines joint variables and configuration space, then does the planar arm by elementary geometry, then develops the two systematic methods every robotics engineer uses: the **Denavit–Hartenberg** (DH) convention, which attaches a frame to each link so that each joint contributes one matrix with four parameters, and the **product-of-exponentials** (PoE) formula, which needs only two frames and the screw axis of each joint. We compute the same robots both ways and check that they agree, and end with the robot's workspace.

## Joints, links and configuration space {#sec-config}

A serial manipulator is a chain of rigid **links** $0, 1, \dots, n$ connected by $n$ one-degree-of-freedom **joints**; link 0 is the fixed base and joint $i$ connects link $i-1$ to link $i$. Industrial robots use two joint types, both lower pairs in the sense of [[mechanisms/mechanisms-mobility]]:

- a **revolute** joint (R) allows rotation about an axis; its variable $\theta_i$ is an angle;
- a **prismatic** joint (P) allows sliding along an axis; its variable $d_i$ is a length.

Joints with more freedom (spherical, universal) are modelled as two or three one-degree-of-freedom joints with intersecting axes and zero-length links between them. A robot is named by its joint sequence from the base: a SCARA arm is RRPR, the Stanford Arm is RRPRRR, a typical six-axis industrial arm is 6R.

::: definition Configuration space and forward kinematics {#def-fk}
The **configuration** of a robot is a complete specification of the position of every point of the robot. For a serial arm it is given by the vector of joint variables $\boldsymbol\theta = (\theta_1, \dots, \theta_n)$, and the set of all configurations is the **configuration space** (C-space), of dimension equal to the number of **degrees of freedom** (DOF). The **task space** is the space of end-effector poses, $SE(3)$ (or $SE(2)$ for planar arms), and the **forward kinematics** is the map
$$
\boldsymbol\theta \mapsto T_{0n}(\boldsymbol\theta) = \begin{bmatrix} R(\boldsymbol\theta) & \mathbf p(\boldsymbol\theta)\\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}.
$$
:::

For an open chain the DOF equal the sum of the joint freedoms. Grübler's formula for spatial mechanisms with $N$ bodies (base included) and $J$ joints of freedom $f_j$, $m = 6(N - 1 - J) + \sum_j f_j$, gives $N - 1 = J$ for a serial chain, so $m = \sum f_j = n$ for $n$ one-DOF joints. A rigid body in space has six DOF, so an arm needs at least six joints to place its tool at an arbitrary position *and* orientation; one with more than six (for example a 7R arm) is **redundant**, and one with fewer can reach only a lower-dimensional set of poses.

## Planar arms by elementary geometry {#sec-planar}

For a planar arm whose revolute axes are all parallel (perpendicular to the plane), geometry gives the forward kinematics directly. Measure each joint angle $\theta_i$ from the previous link's direction, anticlockwise positive; then link $i$ points at the absolute angle $\theta_1 + \dots + \theta_i$, and the tip is the sum of the link vectors. For three links of lengths $L_1, L_2, L_3$,
$$
\begin{aligned}
x &= L_1c_1 + L_2c_{12} + L_3c_{123},\\
y &= L_1s_1 + L_2s_{12} + L_3s_{123},\\
\phi &= \theta_1 + \theta_2 + \theta_3,
\end{aligned}
$$ {#eq-3r-planar}
with $c_{12} = \cos(\theta_1+\theta_2)$, $s_{123} = \sin(\theta_1+\theta_2+\theta_3)$ and $\phi$ the orientation of the last link. The two-link (2R) arm is the case $L_3 = 0$.

::: example Forward kinematics of a planar 3R arm {#ex-3r}
A planar 3R arm has $L_1 = 0.40\,\mathrm m$, $L_2 = 0.30\,\mathrm m$, $L_3 = 0.10\,\mathrm m$ and is at $\boldsymbol\theta = (30^\circ, 45^\circ, -30^\circ)$. Find the tool position and orientation.
::: solution
The absolute link angles are $30^\circ$, $75^\circ$ and $45^\circ$. By [[#eq-3r-planar]],
$$
\begin{aligned}
x &= 0.40\cos30^\circ + 0.30\cos75^\circ + 0.10\cos45^\circ = 0.3464 + 0.0776 + 0.0707 = 0.4948\,\mathrm m,\\
y &= 0.40\sin30^\circ + 0.30\sin75^\circ + 0.10\sin45^\circ = 0.2000 + 0.2898 + 0.0707 = 0.5605\,\mathrm m,\\
\phi &= 30^\circ + 45^\circ - 30^\circ = 45^\circ.
\end{aligned}
$$
Sanity check: the distance from the base, $\sqrt{0.4948^2 + 0.5605^2} = 0.748\,\mathrm m$, is less than the total length $0.80\,\mathrm m$, as it must be when the links are not aligned. We will get the same numbers from DH and PoE below.
:::
:::

Elementary geometry stops working as soon as the axes are not parallel. The systematic methods turn the geometry into matrix multiplication.

## The Denavit–Hartenberg convention {#sec-dh}

A general homogeneous transformation has six parameters. Denavit and Hartenberg observed that by placing the frames cleverly, the transformation from one link frame to the next needs only **four**, of which one is the joint variable and three are constants of the link's geometry. We use the classic convention of Spong, Hutchinson and Vidyasagar and of Siciliano et al., in which frame $i$ is attached to the far (distal) end of link $i$ and **axis $\mathbf z_{i-1}$ is the axis of joint $i$**.

::: algorithm Assigning Denavit–Hartenberg frames {#alg-dh}
1. Number the joints $1,\dots,n$ and draw the axis of each. Put $\mathbf z_{i-1}$ along the axis of joint $i$ (for $i = 1,\dots,n$), pointing either way.
2. Base frame $\{0\}$: origin anywhere on $\mathbf z_0$; $\mathbf x_0$ any direction perpendicular to $\mathbf z_0$.
3. For $i = 1,\dots,n-1$, given $\mathbf z_{i-1}$ and $\mathbf z_i$:
   - if they are skew lines, $\mathbf x_i$ lies along their unique **common normal**, pointing from $\mathbf z_{i-1}$ to $\mathbf z_i$, and the origin $\mathbf o_i$ is where that normal meets $\mathbf z_i$;
   - if they intersect, $\mathbf o_i$ is the intersection point and $\mathbf x_i$ is along $\pm\mathbf z_{i-1}\times\mathbf z_i$;
   - if they are parallel, choose any common normal (usually the one through $\mathbf o_{i-1}$ or the one making $d_i = 0$).
   Then $\mathbf y_i = \mathbf z_i\times\mathbf x_i$.
4. Tool frame $\{n\}$: origin at the tool point, $\mathbf x_n$ perpendicular to and intersecting $\mathbf z_{n-1}$; usually $\mathbf z_n$ is the approach direction.
5. Read off the four **DH parameters** of each link $i$:
   - $a_i$ (link length): distance from $\mathbf z_{i-1}$ to $\mathbf z_i$ measured along $\mathbf x_i$;
   - $\alpha_i$ (link twist): angle from $\mathbf z_{i-1}$ to $\mathbf z_i$ measured about $\mathbf x_i$;
   - $d_i$ (link offset): distance from $\mathbf o_{i-1}$ to the foot of $\mathbf x_i$ on $\mathbf z_{i-1}$, measured along $\mathbf z_{i-1}$;
   - $\theta_i$ (joint angle): angle from $\mathbf x_{i-1}$ to $\mathbf x_i$ measured about $\mathbf z_{i-1}$.
   For a revolute joint $\theta_i$ is the variable; for a prismatic joint $d_i$ is.
:::

::: proposition The Denavit–Hartenberg link transformation {#prop-dh}
With frames assigned by [[#alg-dh]], the transformation from frame $i-1$ to frame $i$ is
$$
A_i = \mathrm{Rot}_z(\theta_i)\,\mathrm{Trans}_z(d_i)\,\mathrm{Trans}_x(a_i)\,\mathrm{Rot}_x(\alpha_i)
= \begin{bmatrix}
c_{\theta_i} & -s_{\theta_i}c_{\alpha_i} & s_{\theta_i}s_{\alpha_i} & a_ic_{\theta_i}\\
s_{\theta_i} & c_{\theta_i}c_{\alpha_i} & -c_{\theta_i}s_{\alpha_i} & a_is_{\theta_i}\\
0 & s_{\alpha_i} & c_{\alpha_i} & d_i\\
0 & 0 & 0 & 1
\end{bmatrix},
$$ {#eq-dh}
and the forward kinematics is $T_{0n}(\boldsymbol\theta) = A_1A_2\cdots A_n$. Conversely, any transformation between two frames satisfying (DH1) $\mathbf x_i \perp \mathbf z_{i-1}$ and (DH2) $\mathbf x_i$ intersects $\mathbf z_{i-1}$ has this form for some $(\theta_i, d_i, a_i, \alpha_i)$.
:::

::: proof
*The product.* Following the four parameters in order from frame $i-1$ is a sequence of motions about and along the *current* axes, so the matrices post-multiply ([[robotics/rigid-motions]]): rotate by $\theta_i$ about $\mathbf z_{i-1}$ (which turns $\mathbf x_{i-1}$ into the direction of $\mathbf x_i$), slide by $d_i$ along the same axis (to the foot of $\mathbf x_i$), slide by $a_i$ along the new $x$-axis (to $\mathbf o_i$), and rotate by $\alpha_i$ about that $x$-axis (which turns $\mathbf z_{i-1}$ into $\mathbf z_i$). Rotations about $z$ commute with translations along $z$, and likewise for $x$, so the order within each pair does not matter. Multiplying $\mathrm{Rot}_z(\theta)\mathrm{Trans}_z(d) = \begin{bmatrix} \mathrm{Rot}_z(\theta) & d\hat{\mathbf z}\\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}$ by $\mathrm{Trans}_x(a)\mathrm{Rot}_x(\alpha) = \begin{bmatrix} \mathrm{Rot}_x(\alpha) & a\hat{\mathbf x}\\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}$ gives rotation part $\mathrm{Rot}_z(\theta)\mathrm{Rot}_x(\alpha)$ — the $3\times3$ block of [[#eq-dh]] — and translation $d\hat{\mathbf z} + a\,\mathrm{Rot}_z(\theta)\hat{\mathbf x} = (ac_\theta, as_\theta, d)$. The chain rule $T_{0n} = T_{01}T_{12}\cdots T_{n-1,n}$ with $T_{i-1,i} = A_i$ gives the forward kinematics.
*Only four parameters are needed.* Let $R = R_{i-1,i}$ and $\mathbf p = \mathbf p_{i-1,i}$. (DH1) says $\hat{\mathbf x}_i\cdot\hat{\mathbf z}_{i-1} = 0$, i.e. $r_{31} = 0$. The first column $(r_{11}, r_{21}, 0)$ is a unit vector, so $r_{11} = c_\theta$, $r_{21} = s_\theta$ for a unique $\theta$; the third row $(0, r_{32}, r_{33})$ is a unit vector, so $r_{32} = s_\alpha$, $r_{33} = c_\alpha$ for a unique $\alpha$. Orthonormality then fixes the remaining four entries to those of $\mathrm{Rot}_z(\theta)\mathrm{Rot}_x(\alpha)$ (the third column must be the cross product of the first two, and the second column the cross product of the third and first). (DH2) says the line through $\mathbf o_i$ in direction $\hat{\mathbf x}_i$ meets $\mathbf z_{i-1}$: $\mathbf p - a\,\hat{\mathbf x}_i = d\,\hat{\mathbf z}$ for some scalars $a, d$, so $\mathbf p = a(c_\theta, s_\theta, 0) + d(0,0,1)$ — exactly the translation in [[#eq-dh]]. Four free numbers remain: $\theta, \alpha, a, d$.
:::

::: example DH parameters of the planar 3R arm {#ex-dh-3r}
Assign DH frames to the arm of [[#ex-3r]] and check the result.
::: solution
All three joint axes are perpendicular to the plane, so $\mathbf z_0, \mathbf z_1, \mathbf z_2$ all point out of the page and are parallel. Put $\mathbf o_0$ at joint 1, and choose each $\mathbf x_i$ along link $i$ so that $\mathbf o_1$ is at joint 2, $\mathbf o_2$ at joint 3 and $\mathbf o_3$ at the tool. Then $d_i = 0$ and $\alpha_i = 0$ for all links, $a_i = L_i$, and $\theta_i$ is the angle from $\mathbf x_{i-1}$ to $\mathbf x_i$ — the relative joint angle.

| link | $a_i$ | $\alpha_i$ | $d_i$ | $\theta_i$ |
|---|---|---|---|---|
| 1 | $0.40\,\mathrm m$ | $0$ | $0$ | $\theta_1$ |
| 2 | $0.30\,\mathrm m$ | $0$ | $0$ | $\theta_2$ |
| 3 | $0.10\,\mathrm m$ | $0$ | $0$ | $\theta_3$ |

With $\alpha = d = 0$, $A_i$ is a planar rotation by $\theta_i$ followed by a shift $L_i$ along the new $x$-axis, and products of planar rotations add their angles, so
$$
T_{03} = \begin{bmatrix} c_{123} & -s_{123} & 0 & L_1c_1 + L_2c_{12} + L_3c_{123}\\ s_{123} & c_{123} & 0 & L_1s_1 + L_2s_{12} + L_3s_{123}\\ 0 & 0 & 1 & 0\\ 0 & 0 & 0 & 1\end{bmatrix},
$$
which is [[#eq-3r-planar]]. At $(30^\circ, 45^\circ, -30^\circ)$ the numerical product of the three matrices has rotation part $\mathrm{Rot}_z(45^\circ)$ and translation $(0.4948, 0.5605, 0)\,\mathrm m$, matching the geometric result.
:::
:::

::: example A SCARA arm {#ex-scara}
A SCARA (RRPR) arm has two parallel vertical revolute axes, a vertical prismatic joint and a vertical tool roll. Use the DH table below (base frame on the floor, so the first link carries the column height $d_1$) with $d_1 = 0.40\,\mathrm m$, $a_1 = 0.35\,\mathrm m$, $a_2 = 0.30\,\mathrm m$, $d_4 = 0.05\,\mathrm m$, and find the tool pose at $\theta_1 = 30^\circ$, $\theta_2 = 60^\circ$, $d_3 = 0.10\,\mathrm m$, $\theta_4 = 45^\circ$.

| link | $a_i$ | $\alpha_i$ | $d_i$ | $\theta_i$ |
|---|---|---|---|---|
| 1 | $a_1$ | $0$ | $d_1$ | $\theta_1^*$ |
| 2 | $a_2$ | $180^\circ$ | $0$ | $\theta_2^*$ |
| 3 | $0$ | $0$ | $d_3^*$ | $0$ |
| 4 | $0$ | $0$ | $d_4$ | $\theta_4^*$ |

(An asterisk marks the joint variable.)
::: solution
The twist $\alpha_2 = 180^\circ$ flips $\mathbf z_2$ to point down, so that positive $d_3$ lowers the quill. Multiplying the four matrices [[#eq-dh]] symbolically gives
$$
T_{04} = \begin{bmatrix}
c_{12}c_4 + s_{12}s_4 & s_{12}c_4 - c_{12}s_4 & 0 & a_1c_1 + a_2c_{12}\\
s_{12}c_4 - c_{12}s_4 & -c_{12}c_4 - s_{12}s_4 & 0 & a_1s_1 + a_2s_{12}\\
0 & 0 & -1 & d_1 - d_3 - d_4\\
0 & 0 & 0 & 1
\end{bmatrix},
$$
i.e. the tool frame is turned by $\theta_1 + \theta_2 - \theta_4$ about the vertical and its $z$-axis points down. With the numbers: $\theta_1 + \theta_2 = 90^\circ$, so
$$
x = 0.35\cos30^\circ + 0.30\cos90^\circ = 0.3031\,\mathrm m,\quad y = 0.35\sin30^\circ + 0.30\sin90^\circ = 0.4750\,\mathrm m,\quad z = 0.40 - 0.10 - 0.05 = 0.25\,\mathrm m,
$$
and the tool's $x$-axis is at $\theta_1 + \theta_2 - \theta_4 = 45^\circ$: first column $(0.7071, 0.7071, 0)$. Check: the horizontal reach $\sqrt{0.3031^2 + 0.475^2} = 0.563\,\mathrm m$ lies between $a_1 - a_2 = 0.05\,\mathrm m$ and $a_1 + a_2 = 0.65\,\mathrm m$. The SCARA's structure is visible in $T_{04}$: the horizontal position depends only on $\theta_1, \theta_2$, the height only on $d_3$ — the reason SCARAs dominate fast pick-and-place on a table.
:::
:::

::: example The elbow (anthropomorphic) arm {#ex-elbow}
The first three joints of most six-axis industrial arms form an "elbow" arm: a vertical waist joint, then shoulder and elbow joints with parallel horizontal axes. With DH parameters $(a, \alpha, d, \theta)$ = $(0, 90^\circ, d_1, \theta_1)$, $(a_2, 0, 0, \theta_2)$, $(a_3, 0, 0, \theta_3)$ and $d_1 = 0.50\,\mathrm m$, $a_2 = 0.60\,\mathrm m$, $a_3 = 0.50\,\mathrm m$, find the position of the wrist point $\mathbf o_3$ at $\boldsymbol\theta = (30^\circ, 45^\circ, -60^\circ)$.
::: solution
$A_1$ has $\alpha_1 = 90^\circ$, which turns the shoulder axis $\mathbf z_1$ horizontal; joints 2 and 3 then form a planar 2R arm in the vertical plane at azimuth $\theta_1$. Multiplying,
$$
\mathbf o_3 = \begin{bmatrix} c_1(a_2c_2 + a_3c_{23})\\ s_1(a_2c_2 + a_3c_{23})\\ d_1 + a_2s_2 + a_3s_{23}\end{bmatrix}.
$$
Numerically $\theta_2 + \theta_3 = -15^\circ$: the horizontal reach is $r = 0.6\cos45^\circ + 0.5\cos(-15^\circ) = 0.4243 + 0.4830 = 0.9073\,\mathrm m$, so
$$
\mathbf o_3 = (0.9073\cos30^\circ,\ 0.9073\sin30^\circ,\ 0.50 + 0.6\sin45^\circ + 0.5\sin(-15^\circ)) = (0.7857,\ 0.4536,\ 0.7949)\,\mathrm m .
$$
Check: the distance from the shoulder $(0,0,0.5)$ to $\mathbf o_3$ is $\sqrt{0.9073^2 + 0.2949^2} = 0.954\,\mathrm m$, which by the law of cosines must equal $\sqrt{a_2^2 + a_3^2 + 2a_2a_3\cos\theta_3} = \sqrt{0.36 + 0.25 + 0.30} = 0.954\,\mathrm m$ ✓. A spherical wrist (three revolute axes meeting at $\mathbf o_3$) is added with three more DH rows; it changes the tool orientation without moving $\mathbf o_3$ — the property that makes inverse kinematics tractable ([[robotics/inverse-kinematics]]).
:::
:::

::: warning Two Denavit–Hartenberg conventions
Craig's textbook and much robot documentation use the **modified** DH convention, in which frame $i$ sits on joint $i$ (proximal) and $A_i = \mathrm{Rot}_x(\alpha_{i-1})\mathrm{Trans}_x(a_{i-1})\mathrm{Rot}_z(\theta_i)\mathrm{Trans}_z(d_i)$, with the indices of $a$ and $\alpha$ shifted by one. Both describe the same robots, but a table written in one convention gives nonsense in the other's formula. Check which convention a data sheet uses, and test any DH table at a configuration where you can predict the answer by inspection (all joints at zero, or one joint at $90^\circ$). Remember also that the manufacturer's "zero" of a joint is often offset from the DH $\theta_i = 0$ by a constant.
:::

## The product-of-exponentials formula {#sec-poe}

DH frames require a frame on every link and some care with special cases (parallel axes make $d_i$ arbitrary; a small misalignment of nominally parallel axes makes $d_i$ jump, which is bad for calibration). The product-of-exponentials (PoE) formula uses just two frames — the base $\{s\}$ and the end-effector $\{b\}$ — and describes each joint by its screw axis ([[robotics/rigid-motions]]).

::: theorem Product of exponentials (space form) {#thm-poe}
Choose a **home configuration** $\boldsymbol\theta = \mathbf 0$ and let $M \in SE(3)$ be the end-effector pose there. Let $\mathcal S_i = (\boldsymbol\omega_i, \mathbf v_i)$ be the screw axis of joint $i$ expressed in $\{s\}$ **at the home configuration**: for a revolute joint $\boldsymbol\omega_i$ is the unit axis direction and $\mathbf v_i = -\boldsymbol\omega_i\times\mathbf q_i$ for any point $\mathbf q_i$ on the axis; for a prismatic joint $\boldsymbol\omega_i = \mathbf 0$ and $\mathbf v_i$ is the unit direction of motion. Then
$$
T(\boldsymbol\theta) = e^{[\mathcal S_1]\theta_1}\,e^{[\mathcal S_2]\theta_2}\cdots e^{[\mathcal S_n]\theta_n}\,M .
$$ {#eq-poe}
:::

::: proof
The final pose depends only on the joint values, not on the order in which the joints are moved, so move them from the tip inwards. Start at home, pose $M$. Move joint $n$ alone to $\theta_n$: links $1, \dots, n-1$ are still at home, so the axis of joint $n$ is where $\mathcal S_n$ says it is, and the end-effector undergoes the screw motion $e^{[\mathcal S_n]\theta_n}$; its pose becomes $e^{[\mathcal S_n]\theta_n}M$ (a motion described in the space frame pre-multiplies). Now move joint $n-1$ to $\theta_{n-1}$. Links $1,\dots,n-2$ are still at home, so the axis of joint $n-1$ is still $\mathcal S_{n-1}$; the whole outboard assembly (links $n-1$ and $n$, in whatever configuration they are) moves rigidly by $e^{[\mathcal S_{n-1}]\theta_{n-1}}$, giving $e^{[\mathcal S_{n-1}]\theta_{n-1}}e^{[\mathcal S_n]\theta_n}M$. Continuing down to joint 1 gives [[#eq-poe]]. The essential assumption is that each screw axis is computed in the home configuration; the axis of joint $i$ moves when joints $1,\dots,i-1$ move, but by the time joint $i$ is moved in this ordering, they have not yet moved.
:::

::: algorithm Forward kinematics by product of exponentials {#alg-poe}
1. Fix $\{s\}$ and $\{b\}$ and choose the home configuration (usually a stretched-out pose where axes are aligned with $\{s\}$).
2. Write $M = T_{sb}(\mathbf 0)$ by inspection.
3. For each joint, at home: read the axis direction $\boldsymbol\omega_i$ and a point $\mathbf q_i$ on it, and form $\mathcal S_i = (\boldsymbol\omega_i, -\boldsymbol\omega_i\times\mathbf q_i)$ (revolute) or $(\mathbf 0, \hat{\mathbf v}_i)$ (prismatic).
4. Evaluate each $e^{[\mathcal S_i]\theta_i}$ with [[robotics/rigid-motions#eq-screw-exp|the screw exponential]] and multiply as in [[#eq-poe]].
:::

::: example The elbow arm by product of exponentials {#ex-poe-elbow}
Recompute [[#ex-elbow]] with PoE, taking $\{s\}$ = the DH base frame and $\{b\}$ = DH frame 3.
::: solution
*Home configuration* $\boldsymbol\theta = \mathbf 0$: the arm is stretched horizontally along $\hat{\mathbf x}_s$ at shoulder height. Frame 3 is then at $(a_2 + a_3, 0, d_1) = (1.1, 0, 0.5)\,\mathrm m$ with the orientation of DH frame 1, $\mathrm{Rot}_x(90^\circ)$:
$$
M = \begin{bmatrix} 1 & 0 & 0 & 1.1\\ 0 & 0 & -1 & 0\\ 0 & 1 & 0 & 0.5\\ 0 & 0 & 0 & 1\end{bmatrix}.
$$
*Screw axes.* The waist axis is $\hat{\mathbf z}_s$ through the origin: $\mathcal S_1 = (0,0,1,\ 0,0,0)$. The shoulder axis is $\mathbf z_1 = \mathrm{Rot}_x(90^\circ)\hat{\mathbf z} = (0,-1,0)$ through $\mathbf q_2 = (0,0,0.5)$: $\boldsymbol\omega_2\times\mathbf q_2 = (-0.5, 0, 0)$, so $\mathcal S_2 = (0,-1,0,\ 0.5, 0, 0)$. The elbow axis is parallel, through $\mathbf q_3 = (0.6, 0, 0.5)$: $\boldsymbol\omega_3\times\mathbf q_3 = (-0.5, 0, 0.6)$, so $\mathcal S_3 = (0,-1,0,\ 0.5, 0, -0.6)$. (Axis $-\hat{\mathbf y}$ makes positive $\theta_2$ raise the arm, as in the DH model.)
*Product.* Evaluating $e^{[\mathcal S_1]\pi/6}e^{[\mathcal S_2]\pi/4}e^{[\mathcal S_3](-\pi/3)}M$ numerically gives position $(0.7857, 0.4536, 0.7949)\,\mathrm m$ and the same rotation matrix as $A_1A_2A_3$ (first column $(0.8365, 0.4830, -0.2588)$), entry for entry. The two methods are two factorisations of the same function.
Why it works, by hand for the position: $e^{[\mathcal S_3]\theta_3}$ turns the forearm about the elbow; $e^{[\mathcal S_2]\theta_2}$ then turns the whole arm about the shoulder; $e^{[\mathcal S_1]\theta_1}$ swings everything about the vertical — the same sequence of moves as in the proof of [[#thm-poe]].
:::
:::

::: example The planar 3R arm by product of exponentials {#ex-poe-3r}
Find $M$ and the screw axes of the 3R arm of [[#ex-3r]] with $\{b\}$ at the tool, and show that PoE reproduces [[#eq-3r-planar]].
::: solution
At home the arm lies along $\hat{\mathbf x}_s$, so $M$ has $R = I$ and $\mathbf p = (0.8, 0, 0)\,\mathrm m$. All axes are $\hat{\mathbf z}$, through $(0,0,0)$, $(0.4,0,0)$ and $(0.7,0,0)$; with $\hat{\mathbf z}\times(q_x,0,0) = (0, q_x, 0)$,
$$
\mathcal S_1 = (0,0,1,\ 0,0,0),\quad \mathcal S_2 = (0,0,1,\ 0,-0.4,0),\quad \mathcal S_3 = (0,0,1,\ 0,-0.7,0).
$$
Each factor $e^{[\mathcal S_i]\theta_i}$ is a planar rotation by $\theta_i$ about the point $\mathbf q_i$ (zero pitch). Applying them to the home tool point $(0.8, 0)$: rotating by $\theta_3$ about $(0.7,0)$ gives $(0.7 + 0.1c_3, 0.1s_3)$; rotating that by $\theta_2$ about $(0.4,0)$ gives $(0.4 + 0.3c_2 + 0.1c_{23},\ 0.3s_2 + 0.1s_{23})$; rotating by $\theta_1$ about the origin gives $(0.4c_1 + 0.3c_{12} + 0.1c_{123},\ \dots)$ — exactly [[#eq-3r-planar]]. The orientation is $\mathrm{Rot}_z(\theta_1+\theta_2+\theta_3)$. Numerically at $(30^\circ, 45^\circ, -30^\circ)$ the product gives $(0.4948, 0.5605)\,\mathrm m$ and $\phi = 45^\circ$, as before.
:::
:::

PoE has three practical advantages. Revolute and prismatic joints are handled by one formula; no link frames are needed, so the model is read straight off a drawing of the home pose; and the screw axes vary continuously with the geometry, which suits kinematic calibration. DH has the advantage of compactness (four numbers per joint rather than six) and is what most robot data sheets still quote.

::: remark Body form
Moving the frames to the end-effector gives the **body form** $T(\boldsymbol\theta) = M\,e^{[\mathcal B_1]\theta_1}\cdots e^{[\mathcal B_n]\theta_n}$, where $\mathcal B_i$ is the screw axis of joint $i$ expressed in $\{b\}$ at home. It follows from $Me^{[\mathcal B]\theta}M^{-1} = e^{M[\mathcal B]M^{-1}\theta}$ ([[#exr-body]]). The space form is natural for the space Jacobian, the body form for the body Jacobian of [[robotics/jacobians]].
:::

## Workspace {#sec-workspace}

::: definition Reachable and dexterous workspace {#def-workspace}
The **reachable workspace** of a manipulator is the set of points that the tool point can reach with at least one orientation; the **dexterous workspace** is the set reachable with every orientation. Both are computed from the forward kinematics over the allowed joint ranges.
:::

::: proposition Workspace of the planar 2R arm {#prop-2r-workspace}
Without joint limits, the reachable workspace of a planar 2R arm with $L_1, L_2 > 0$ is the closed annulus
$$
\lvert L_1 - L_2\rvert \le \sqrt{x^2 + y^2} \le L_1 + L_2 ,
$$
and the distance of the tip from the base depends only on the elbow angle: $r^2 = L_1^2 + L_2^2 + 2L_1L_2\cos\theta_2$.
:::

::: proof
From [[#eq-3r-planar]] with $L_3 = 0$, $x^2 + y^2 = L_1^2(c_1^2 + s_1^2) + L_2^2(c_{12}^2 + s_{12}^2) + 2L_1L_2(c_1c_{12} + s_1s_{12}) = L_1^2 + L_2^2 + 2L_1L_2\cos\theta_2$, since $c_1c_{12} + s_1s_{12} = \cos(\theta_{12} - \theta_1)$. As $\theta_2$ ranges over a full turn, $\cos\theta_2$ takes every value in $[-1,1]$, so $r^2$ takes every value in $[(L_1 - L_2)^2, (L_1 + L_2)^2]$. For a given $r$ (and $\theta_2$), the tip lies at polar angle $\theta_1 + \beta(\theta_2)$ for a fixed offset $\beta$, and $\theta_1$ is free, so every point of the circle of radius $r$ is reached. Hence the workspace is exactly the annulus.
:::

The boundary circles $r = L_1 + L_2$ (arm stretched) and $r = \lvert L_1 - L_2\rvert$ (arm folded) are where the arm is **singular** — it cannot move its tip radially outwards (or inwards) — as the Jacobian of [[robotics/jacobians]] will show. The dexterous workspace of the 3R arm of [[#ex-3r]] is the annulus shrunk by $L_3$ at both edges: a point can be approached from every direction only if the wrist point $(x - L_3\cos\phi, y - L_3\sin\phi)$ is in the 2R annulus for every $\phi$, i.e. $\lvert L_1 - L_2\rvert + L_3 \le r \le L_1 + L_2 - L_3$, here $0.2 \le r \le 0.6\,\mathrm m$.

::: widget plot
f: sqrt(L1^2 + L2^2 + 2*L1*L2*cos(x))
x: -pi, pi
y: 0, 2
sliders: L1=0.6:0.1:1:0.05; L2=0.4:0.1:1:0.05
labels: r(\theta_2)\ \text{(m)}
piticks: true
caption: Distance of a 2R arm's tip from the base as a function of the elbow angle $\theta_2$, for link lengths $L_1$, $L_2$ in metres. The maximum $L_1 + L_2$ is at $\theta_2 = 0$ (stretched), the minimum $\lvert L_1 - L_2\rvert$ at $\theta_2 = \pm\pi$ (folded). Make $L_1 = L_2$ and the inner radius drops to zero: an arm with equal links can reach its own base. Notice how flat the curve is near $\theta_2 = 0$: a large change of elbow angle barely changes the reach there, which is the kinematic signature of the boundary singularity.
:::

Joint limits cut the annulus down. If the elbow can only move in $-150^\circ \le \theta_2 \le 150^\circ$, the smallest reach is $\sqrt{L_1^2 + L_2^2 + 2L_1L_2\cos150^\circ}$ instead of $\lvert L_1 - L_2\rvert$, and if the shoulder range is limited the annulus becomes a sector. Real arms also lose workspace to self-collision and to the mounting surface.

::: widget parametric
fx: cos(t) + 0.7*cos((1 + k)*t)
fy: sin(t) + 0.7*sin((1 + k)*t)
t: 0, 1.5
x: -1.8, 1.8
y: -1.8, 1.8
sliders: k=1:-3:3:0.1
caption: Path of the tip of a 2R arm ($L_1 = 1$, $L_2 = 0.7$) when the joints move along a straight line in joint space, $\theta_1 = t$, $\theta_2 = k\,t$, for $0 \le t \le 1.5\,\mathrm{rad}$. Only at $k = 0$ (elbow locked) is the tip path a circle; for other $k$ it is a curve that is neither straight nor circular. Straight lines in joint space are curves in task space, and vice versa — the reason trajectory planners must decide in which space to interpolate ([[robotics/trajectory-planning]]).
:::

::: quiz
A 7R arm has seven revolute joints. Which statement is true?
- [ ] Its forward kinematics has several solutions for each joint vector.
- [x] Its configuration space has dimension 7, so for a reachable tool pose there is in general a one-parameter family of joint vectors.
- [ ] It cannot be described with Denavit–Hartenberg parameters.
- [ ] Its task space has dimension 7.
::: solution
Forward kinematics is a function: one joint vector gives exactly one pose. The C-space has one dimension per joint (7); the task space $SE(3)$ has 6, so the set of joint vectors giving a fixed pose is generically one-dimensional — the "self-motion" of a redundant arm, such as swinging the elbow while the hand stays still. Any serial chain of R and P joints has a DH description.
:::
:::

::: history
Jacques Denavit and Richard Hartenberg, working on spatial linkages at Northwestern University, published "A kinematic notation for lower-pair mechanisms based on matrices" in the *Journal of Applied Mechanics* in 1955. Their four-parameter description was adopted by the first generation of computer-controlled arms; Richard Paul's 1981 book *Robot Manipulators: Mathematics, Programming, and Control* made the $A$-matrices and their products the standard way to program arms. In 1984 Roger Brockett showed that the forward kinematics of any serial chain can be written as a product of matrix exponentials of joint twists, an approach developed in the textbooks of Murray, Li and Sastry (1994) and Lynch and Park (2017).
:::

::: summary
- Forward kinematics maps joint variables to the end-effector pose, $\boldsymbol\theta\mapsto T(\boldsymbol\theta)\in SE(3)$; it is unique and is a product of one transform per joint. A serial arm with $n$ one-DOF joints has $n$ DOF; six are needed for arbitrary poses.
- DH convention: $\mathbf z_{i-1}$ along joint $i$, $\mathbf x_i$ along the common normal; four parameters $(a_i,\alpha_i,d_i,\theta_i)$ per link, $A_i = \mathrm{Rot}_z(\theta_i)\mathrm{Trans}_z(d_i)\mathrm{Trans}_x(a_i)\mathrm{Rot}_x(\alpha_i)$, $T_{0n} = A_1\cdots A_n$. Know which DH convention a source uses.
- PoE: $T(\boldsymbol\theta) = e^{[\mathcal S_1]\theta_1}\cdots e^{[\mathcal S_n]\theta_n}M$ with screw axes read at the home configuration; revolute $\mathcal S = (\boldsymbol\omega, -\boldsymbol\omega\times\mathbf q)$, prismatic $(\mathbf 0, \hat{\mathbf v})$.
- DH and PoE give identical results; always check a model at a configuration you can predict by hand.
- The 2R workspace is the annulus $\lvert L_1 - L_2\rvert \le r \le L_1 + L_2$, $r^2 = L_1^2 + L_2^2 + 2L_1L_2\cos\theta_2$; joint limits and offsets shrink it, and its boundaries are singular configurations.
:::

## Exercises

::: exercise Tip of a 2R arm {#exr-2r level=1 check="0.5964"}
A planar 2R arm has $L_1 = 0.5\,\mathrm m$, $L_2 = 0.4\,\mathrm m$ and is at $\theta_1 = 60^\circ$, $\theta_2 = -90^\circ$. Find the tip position. (Enter $x$ in m, rounded to four decimal places.)
::: solution
Absolute angles $60^\circ$ and $-30^\circ$: $x = 0.5\cos60^\circ + 0.4\cos(-30^\circ) = 0.25 + 0.3464 = 0.5964\,\mathrm m$, $y = 0.5\sin60^\circ + 0.4\sin(-30^\circ) = 0.4330 - 0.2 = 0.2330\,\mathrm m$. Check: $r = 0.640\,\mathrm m = \sqrt{0.25 + 0.16 + 0.4\cos(-90^\circ)} = \sqrt{0.41}$ ✓.
:::
:::

::: exercise Degrees of freedom {#exr-dof level=1 check="8"}
A serial chain is built from four revolute joints, one prismatic joint and one spherical joint (three rotational freedoms). How many degrees of freedom does it have? (Enter the number.)
::: solution
With $N = 7$ bodies (base included) and $J = 6$ joints, Grübler's formula gives $m = 6(7 - 1 - 6) + (4\cdot1 + 1 + 3) = 8$. For an open chain this is just the sum of the joint freedoms. The arm is redundant by two for spatial tasks.
:::
:::

::: exercise Reach from the elbow angle {#exr-reach level=1 check="0.9539"}
A 2R arm has $L_1 = 0.6\,\mathrm m$, $L_2 = 0.5\,\mathrm m$. How far is the tip from the base when $\theta_2 = -60^\circ$? (Enter $r$ in m, rounded to four decimal places.)
::: solution
$r = \sqrt{0.36 + 0.25 + 2(0.6)(0.5)\cos(-60^\circ)} = \sqrt{0.91} = 0.9539\,\mathrm m$, independent of $\theta_1$ ([[#prop-2r-workspace]]). It lies between $0.1$ and $1.1\,\mathrm m$ ✓.
:::
:::

::: exercise A cylindrical robot {#exr-cyl level=2 check="0.2165"}
A cylindrical (RPP) robot has DH rows $(a, \alpha, d, \theta)$: $(0, 0, d_1, \theta_1^*)$, $(0, -90^\circ, d_2^*, 0)$, $(0, 0, d_3^*, 0)$ with $d_1 = 0.30\,\mathrm m$. Find $T_{03}$ symbolically and the tool position at $\theta_1 = 30^\circ$, $d_2 = 0.40\,\mathrm m$, $d_3 = 0.25\,\mathrm m$. (Enter the $y$-coordinate in m, rounded to four decimal places.)
::: solution
$A_1 = \mathrm{Rot}_z(\theta_1)\mathrm{Trans}_z(d_1)$, $A_2 = \mathrm{Trans}_z(d_2)\mathrm{Rot}_x(-90^\circ)$, $A_3 = \mathrm{Trans}_z(d_3)$. The rotation $\mathrm{Rot}_x(-90^\circ)$ turns $\mathbf z_2$ horizontal: $\mathrm{Rot}_x(-90^\circ)\hat{\mathbf z} = (0, 1, 0)$, so $\mathbf z_2 = \mathbf y_1$. Multiplying,
$$
T_{03} = \begin{bmatrix} c_1 & 0 & -s_1 & -s_1d_3\\ s_1 & 0 & c_1 & c_1d_3\\ 0 & -1 & 0 & d_1 + d_2\\ 0 & 0 & 0 & 1\end{bmatrix}.
$$
Numerically $\mathbf p = (-0.25\sin30^\circ,\ 0.25\cos30^\circ,\ 0.70) = (-0.125,\ 0.2165,\ 0.70)\,\mathrm m$. Check: the radial distance from the column is $d_3 = 0.25\,\mathrm m$ and the height is $d_1 + d_2$ — cylindrical coordinates, hence the name.
:::
:::

::: exercise A screw axis for PoE {#exr-screw level=2 check="-0.6"}
For the elbow arm of [[#ex-poe-elbow]], derive $\mathcal S_3$ from $\boldsymbol\omega_3 = (0,-1,0)$ and $\mathbf q_3 = (a_2, 0, d_1)$ symbolically, and check the result against the velocity interpretation of a twist. (Enter the $z$-component of $\mathbf v_3$ in m for $a_2 = 0.6\,\mathrm m$.)
::: solution
$\boldsymbol\omega_3\times\mathbf q_3 = (0,-1,0)\times(a_2, 0, d_1) = \big((-1)d_1 - 0,\ 0\cdot a_2 - 0\cdot d_1,\ 0 - (-1)a_2\big) = (-d_1, 0, a_2)$, so $\mathbf v_3 = (d_1, 0, -a_2) = (0.5, 0, -0.6)\,\mathrm m$. Velocity check: if the forearm spins at $1\,\mathrm{rad/s}$ about the elbow axis, the point of the (extended) forearm at the base origin has velocity $\boldsymbol\omega\times(\mathbf 0 - \mathbf q_3) = -(-d_1, 0, a_2) = (d_1, 0, -a_2)$: it moves forward (it is $d_1$ below the axis) and down (it is $a_2$ behind it). ✓
:::
:::

::: exercise SCARA reach {#exr-scara level=2 check="0.4610"}
For the SCARA arm of [[#ex-scara]], what is the horizontal distance of the tool from the base axis when $\theta_2 = 90^\circ$ (any $\theta_1$)? Find also the range of horizontal reach without joint limits. (Enter the distance in m, rounded to four decimal places.)
::: solution
The horizontal part is a 2R arm, so $r^2 = a_1^2 + a_2^2 + 2a_1a_2\cos\theta_2 = 0.35^2 + 0.30^2 + 0 = 0.2125$ and $r = 0.461\,\mathrm m$. The range is $a_1 - a_2 = 0.05\,\mathrm m$ to $a_1 + a_2 = 0.65\,\mathrm m$ (in practice the elbow range of a SCARA is limited to about $\pm 150^\circ$, which raises the minimum).
:::
:::

::: exercise Body form of the product of exponentials {#exr-body level=3}
Show that $T(\boldsymbol\theta) = M e^{[\mathcal B_1]\theta_1}\cdots e^{[\mathcal B_n]\theta_n}$ with $[\mathcal B_i] = M^{-1}[\mathcal S_i]M$, and interpret $\mathcal B_i$. Compute $\mathcal B_1$ for the planar 3R arm of [[#ex-poe-3r]].
::: solution
For any invertible $P$ and square $A$, $Pe^{A}P^{-1} = e^{PAP^{-1}}$ (apply the conjugation to each term of the series). Hence $e^{[\mathcal S_i]\theta_i}M = M\,M^{-1}e^{[\mathcal S_i]\theta_i}M = M e^{M^{-1}[\mathcal S_i]M\,\theta_i}$. Move $M$ from the right end of [[#eq-poe]] to the left one factor at a time: $e^{[\mathcal S_1]\theta_1}\cdots e^{[\mathcal S_n]\theta_n}M = e^{[\mathcal S_1]\theta_1}\cdots e^{[\mathcal S_{n-1}]\theta_{n-1}}Me^{[\mathcal B_n]\theta_n} = \cdots = Me^{[\mathcal B_1]\theta_1}\cdots e^{[\mathcal B_n]\theta_n}$. The matrix $M^{-1}[\mathcal S_i]M$ is the same screw axis expressed in the home end-effector frame $\{b\}$: $\mathcal B_i$ is joint $i$'s axis as seen from the tool. For the 3R arm, $M = (I, (0.8,0,0))$, so in $\{b\}$ the first axis is $\hat{\mathbf z}$ through the point $(-0.8, 0, 0)$: $\mathcal B_1 = (0,0,1,\ -\hat{\mathbf z}\times(-0.8,0,0)) = (0,0,1,\ 0, 0.8, 0)$. Check: spinning the whole arm about the base at $1\,\mathrm{rad/s}$ moves the tool (at the origin of $\{b\}$) along $+\mathbf y_b$ at $0.8\,\mathrm{m/s}$ ✓.
:::
:::

::: exercise Sizing a planar arm {#exr-size level=3 check="0.6"}
A planar 2R arm must reach every point of an annulus with inner radius $0.2\,\mathrm m$ and outer radius $1.0\,\mathrm m$, and no further (to keep it compact). (a) Find $L_1$ and $L_2$ with $L_1 \ge L_2$. (b) The elbow is limited to $\lvert\theta_2\rvert \le 150^\circ$ by its cabling. What is the inner radius now, and how would you restore the required $0.2\,\mathrm m$? (c) Discuss what else limits the useful workspace near the two boundaries. (Enter $L_1$ in m.)
::: solution
(a) $L_1 + L_2 = 1.0$ and $L_1 - L_2 = 0.2$ give $L_1 = 0.6\,\mathrm m$, $L_2 = 0.4\,\mathrm m$.
(b) $r_{\min} = \sqrt{0.36 + 0.16 + 2(0.24)\cos150^\circ} = \sqrt{0.1043} = 0.323\,\mathrm m$: the joint limit removes the band $0.2 < r < 0.323\,\mathrm m$. Can a different split of the same total length restore $0.2\,\mathrm m$? With $L_1 + L_2 = 1$, $r_{\min}^2 = L_1^2 + L_2^2 + 2L_1L_2\cos150^\circ = (L_1 + L_2)^2 - 2L_1L_2(1 - \cos150^\circ) = 1 - 3.732\,L_1L_2$, which is smallest when $L_1L_2$ is largest, at $L_1 = L_2 = 0.5\,\mathrm m$: $r_{\min} = \sqrt{1 - 0.933} = 0.259\,\mathrm m$. So no 2R arm of total length $1.0\,\mathrm m$ with a $\pm150^\circ$ elbow reaches $0.2\,\mathrm m$. The remedies are mechanical: increase the elbow range (offset the second link vertically so the links can fold past each other, as many SCARAs do), add a third joint, or accept a central dead zone and place the work outside it.
(c) Near the outer boundary the arm is nearly stretched: the Jacobian loses rank, so radial speed requires huge joint rates and radial force is carried by the structure, not the motors (useful for pushing, bad for precise motion). Near the inner boundary the same happens with the arm folded, and the links may collide with each other or the base. A practical design keeps the task in the middle of the annulus — a theme quantified by manipulability in [[robotics/jacobians]].
:::
:::

## Further reading

Spong, Hutchinson and Vidyasagar give many more worked DH tables (Stanford arm, PUMA-type arms, spherical wrists) in the convention used here; Craig uses the modified convention; Lynch and Park develop the product-of-exponentials formula in both space and body forms with worked examples.
