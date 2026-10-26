A robot is a chain of rigid bodies, and almost every question we will ask about it — where is the gripper, which way is the camera looking, how fast is the tool turning — is a question about the *position and orientation* of one rigid body relative to another. This chapter builds the language for those questions. A position is easy: three coordinates. An orientation is not: it lives in a curved three-dimensional space that cannot be covered by three numbers without a singularity somewhere, and the different ways of parametrising it (rotation matrices, axis and angle, Euler angles, quaternions) each trade simplicity in one operation for trouble in another. We will define rotations as matrices with orthonormal columns, derive Rodrigues' formula for a rotation about an axis, extract the axis and angle back out of a matrix, meet Euler and roll–pitch–yaw angles and see exactly where they fail (gimbal lock), use unit quaternions to compose rotations without that failure, and finally combine rotation and translation into the $4\times4$ homogeneous transformation and the screw motions that every later chapter uses. The rigid-body kinematics of [[dynamics/three-dimensional-dynamics]] supplies the physics; the linear algebra (orthogonal matrices, eigenvalues, the matrix exponential) is in Maths Atlas, for example [eigenvalues and eigenvectors](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues) and [linear systems of ODEs](/learn/maths/lesson.php?c=ode&l=linear-systems).

## Frames and rotation matrices {#sec-rotations}

Attach to every body of interest a right-handed orthonormal **frame**: an origin and three perpendicular unit vectors. In robotics we use many at once — the fixed *space* frame $\{s\}$ on the floor, a frame on each link, the *end-effector* or *body* frame $\{b\}$ on the gripper, a camera frame $\{c\}$ — and the pose of one body is the pose of its frame relative to another frame. A free vector (a velocity, a force, the direction of an axis) does not care where the origins are, only how the axes are turned; so we first describe the turning alone.

::: definition Rotation matrix {#def-rotation-matrix}
Let $\{a\}$ and $\{b\}$ be right-handed orthonormal frames with axes $(\hat{\mathbf x}_a, \hat{\mathbf y}_a, \hat{\mathbf z}_a)$ and $(\hat{\mathbf x}_b, \hat{\mathbf y}_b, \hat{\mathbf z}_b)$. The **rotation matrix** of $\{b\}$ relative to $\{a\}$ is the $3\times3$ matrix whose columns are the axes of $\{b\}$ written in $\{a\}$-coordinates:
$$
R_{ab} = \begin{bmatrix} \hat{\mathbf x}_b^{\,a} & \hat{\mathbf y}_b^{\,a} & \hat{\mathbf z}_b^{\,a} \end{bmatrix}
= \begin{bmatrix}
\hat{\mathbf x}_b\cdot\hat{\mathbf x}_a & \hat{\mathbf y}_b\cdot\hat{\mathbf x}_a & \hat{\mathbf z}_b\cdot\hat{\mathbf x}_a \\
\hat{\mathbf x}_b\cdot\hat{\mathbf y}_a & \hat{\mathbf y}_b\cdot\hat{\mathbf y}_a & \hat{\mathbf z}_b\cdot\hat{\mathbf y}_a \\
\hat{\mathbf x}_b\cdot\hat{\mathbf z}_a & \hat{\mathbf y}_b\cdot\hat{\mathbf z}_a & \hat{\mathbf z}_b\cdot\hat{\mathbf z}_a
\end{bmatrix}.
$$
Each entry is a direction cosine. The set of all such matrices is the **special orthogonal group**
$$
SO(3) = \{ R \in \mathbb R^{3\times 3} : R^{\mathsf T} R = I,\ \det R = +1 \}.
$$
:::

The double subscript is a bookkeeping device that prevents most frame errors: if a vector has coordinates $\mathbf p_b$ in $\{b\}$, then its coordinates in $\{a\}$ are
$$
\mathbf p_a = R_{ab}\,\mathbf p_b ,
$$ {#eq-change-frame}
because $\mathbf p = p_{b,x}\hat{\mathbf x}_b + p_{b,y}\hat{\mathbf y}_b + p_{b,z}\hat{\mathbf z}_b$ and the columns of $R_{ab}$ are exactly those three axes written in $\{a\}$. The inner subscripts "cancel": $R_{ab}\mathbf p_b$ is legal, $R_{ab}\mathbf p_a$ is a bug. In the same way $R_{ac} = R_{ab}R_{bc}$.

::: proposition Properties of rotation matrices {#prop-so3}
For $R, R_1, R_2 \in SO(3)$:
1. $R^{-1} = R^{\mathsf T}$, and $R_{ba} = R_{ab}^{\mathsf T}$;
2. $R_1 R_2 \in SO(3)$ (closure), so $SO(3)$ is a group under multiplication, but $R_1R_2 \ne R_2R_1$ in general;
3. $R$ preserves lengths and angles, $\lVert R\mathbf x\rVert = \lVert\mathbf x\rVert$ and $(R\mathbf x)\cdot(R\mathbf y) = \mathbf x\cdot\mathbf y$;
4. $R$ preserves cross products, $R(\mathbf x\times\mathbf y) = (R\mathbf x)\times(R\mathbf y)$.
:::

::: proof
(1) $R^{\mathsf T}R = I$ says $R^{\mathsf T}$ is a left inverse; for square matrices a left inverse is the inverse. Since $\mathbf p_a = R_{ab}\mathbf p_b$ for every $\mathbf p$, we have $\mathbf p_b = R_{ab}^{-1}\mathbf p_a = R_{ab}^{\mathsf T}\mathbf p_a$, which is the definition of $R_{ba}$.
(2) $(R_1R_2)^{\mathsf T}(R_1R_2) = R_2^{\mathsf T}(R_1^{\mathsf T}R_1)R_2 = R_2^{\mathsf T}R_2 = I$ and $\det(R_1R_2) = \det R_1\det R_2 = 1$. The identity is in $SO(3)$ and inverses are (by 1), so it is a group. Non-commutativity: [[#ex-fixed-current]] exhibits two rotations whose products in the two orders differ.
(3) $(R\mathbf x)\cdot(R\mathbf y) = \mathbf x^{\mathsf T}R^{\mathsf T}R\,\mathbf y = \mathbf x\cdot\mathbf y$; put $\mathbf y = \mathbf x$ for lengths.
(4) For any $\mathbf z$, the scalar triple product is a determinant, so $(R\mathbf z)\cdot\big((R\mathbf x)\times(R\mathbf y)\big) = \det[R\mathbf z\ R\mathbf x\ R\mathbf y] = \det R\,\det[\mathbf z\ \mathbf x\ \mathbf y] = \mathbf z\cdot(\mathbf x\times\mathbf y) = (R\mathbf z)\cdot\big(R(\mathbf x\times\mathbf y)\big)$, using (3) in the last step. As $R\mathbf z$ ranges over all of $\mathbb R^3$, the two vectors $(R\mathbf x)\times(R\mathbf y)$ and $R(\mathbf x\times\mathbf y)$ are equal. Here $\det R = +1$ is essential: an orthogonal matrix with $\det = -1$ is a reflection and flips the sign of cross products, turning a right-handed frame into a left-handed one.
:::

Nine numbers with six constraints ($R^{\mathsf T}R = I$ is symmetric, so it gives six independent equations) leave **three** degrees of freedom: a rigid body turning about a fixed point has three rotational freedoms, as Grübler's count in [[mechanisms/mechanisms-mobility]] also says. The three **elementary rotations** about the coordinate axes by an angle $\theta$ (anticlockwise when viewed from the tip of the axis, the right-hand rule) are
$$
\mathrm{Rot}_x(\theta) = \begin{bmatrix} 1 & 0 & 0 \\ 0 & c_\theta & -s_\theta \\ 0 & s_\theta & c_\theta \end{bmatrix},\quad
\mathrm{Rot}_y(\theta) = \begin{bmatrix} c_\theta & 0 & s_\theta \\ 0 & 1 & 0 \\ -s_\theta & 0 & c_\theta \end{bmatrix},\quad
\mathrm{Rot}_z(\theta) = \begin{bmatrix} c_\theta & -s_\theta & 0 \\ s_\theta & c_\theta & 0 \\ 0 & 0 & 1 \end{bmatrix},
$$ {#eq-elementary}
with $c_\theta = \cos\theta$, $s_\theta = \sin\theta$. Note the sign pattern of $\mathrm{Rot}_y$: the minus sign is in the bottom row because $\hat{\mathbf z}\times\hat{\mathbf x} = \hat{\mathbf y}$ (the cyclic order is $x\to y\to z\to x$).

::: example Changing the frame of a point {#ex-rotate-point}
Frame $\{b\}$ has the same origin as $\{a\}$ and is obtained by turning $\{a\}$ through $30^\circ$ about $\hat{\mathbf z}_a$. A sensor mounted on the body reports a point at $\mathbf p_b = (2,\ 1,\ 0.5)\,\mathrm{m}$. Find $\mathbf p_a$.
::: solution
The axes of $\{b\}$ in $\{a\}$ are the columns of $R_{ab} = \mathrm{Rot}_z(30^\circ)$, with $\cos 30^\circ = 0.8660$ and $\sin 30^\circ = 0.5$:
$$
\mathbf p_a = R_{ab}\mathbf p_b =
\begin{bmatrix} 0.8660 & -0.5 & 0 \\ 0.5 & 0.8660 & 0 \\ 0 & 0 & 1 \end{bmatrix}
\begin{bmatrix} 2 \\ 1 \\ 0.5 \end{bmatrix}
= \begin{bmatrix} 1.732 - 0.5 \\ 1 + 0.866 \\ 0.5 \end{bmatrix}
= \begin{bmatrix} 1.232 \\ 1.866 \\ 0.5 \end{bmatrix}\mathrm{m}.
$$
Sanity checks: the $z$-coordinate is unchanged (the rotation is about $z$), and the length is preserved, $\sqrt{2^2+1^2+0.5^2} = \sqrt{1.232^2+1.866^2+0.5^2} = 2.291\,\mathrm m$. The polar angle of the point in the $xy$-plane went from $\arctan(1/2) = 26.6^\circ$ in $\{b\}$ to $56.6^\circ$ in $\{a\}$: $30^\circ$ more, as it must.
:::
:::

### Three readings of one matrix

A rotation matrix plays three roles, and confusing them is the commonest source of sign and order errors:

1. **Orientation**: $R_{ab}$ *is* the orientation of $\{b\}$ seen from $\{a\}$ (its columns are $\{b\}$'s axes).
2. **Change of coordinates**: $\mathbf p_a = R_{ab}\mathbf p_b$ re-expresses the same physical vector.
3. **Operator**: $\mathbf p' = R\mathbf p$ rotates a vector to a *new* vector, both in the same frame.

Composition depends on which frame the second rotation is described in. If a body with orientation $R$ is turned by $R'$ about an axis **fixed in space**, its new orientation is $R'R$ (pre-multiply). If the turn is about an axis of the **body's own current frame**, the new orientation is $RR'$ (post-multiply). The second rule follows from the subscript cancellation: the turn in body coordinates is $R_{bb'} = R'$, so $R_{sb'} = R_{sb}R_{bb'}$. The first follows from the second: an axis fixed in $\{s\}$ has body coordinates $R^{\mathsf T}\hat{\boldsymbol\omega}$, and $R\,\mathrm{Rot}(R^{\mathsf T}\hat{\boldsymbol\omega},\theta) = \mathrm{Rot}(\hat{\boldsymbol\omega},\theta)\,R$ ([[#exr-conjugation]]).

::: example Fixed axes versus current axes {#ex-fixed-current}
A tool starts aligned with $\{s\}$. (a) It is turned $90^\circ$ about its own $z$-axis and then $90^\circ$ about its own (new) $x$-axis. (b) It is turned $90^\circ$ about the space $z$-axis and then $90^\circ$ about the space $x$-axis. Find the final orientation in each case.
::: solution
(a) Current-axis rotations post-multiply, so $R_a = \mathrm{Rot}_z(90^\circ)\,\mathrm{Rot}_x(90^\circ)$:
$$
R_a = \begin{bmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 \end{bmatrix}
= \begin{bmatrix} 0 & 0 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix}.
$$
(b) Fixed-axis rotations pre-multiply, so the *later* rotation stands on the left, $R_b = \mathrm{Rot}_x(90^\circ)\,\mathrm{Rot}_z(90^\circ)$:
$$
R_b = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 \end{bmatrix}\begin{bmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}
= \begin{bmatrix} 0 & -1 & 0 \\ 0 & 0 & -1 \\ 1 & 0 & 0 \end{bmatrix}.
$$
Read the columns: in (a) the tool's $x$-axis ends up along $\hat{\mathbf y}_s$, in (b) along $\hat{\mathbf z}_s$. The same two instructions give different final orientations, which is the non-commutativity of [[#prop-so3]]. Check by hand with a book: it is worth doing once. Both results are proper rotations: the columns are orthonormal and expanding the determinants gives $\det R_a = \det R_b = +1$.
:::
:::

::: warning Pre- or post-multiply?
"Rotate about $x$, then about $z$" has no unique matrix until you say *which* $x$ and $z$. About the fixed (space) axes, write the matrices right to left in the order performed, $R = \mathrm{Rot}_z\,\mathrm{Rot}_x$; about the moving (body) axes, left to right, $R = \mathrm{Rot}_x\,\mathrm{Rot}_z$. Robot software libraries differ in which they assume, and controller manuals for industrial arms define their own orientation angles: always test a library with a $90^\circ$ case such as [[#ex-fixed-current]] before trusting it.
:::

## Exponential coordinates: axis and angle {#sec-exp}

Euler proved in 1776 that any rotation of a rigid body about a fixed point is a rotation through some angle $\theta$ about some axis $\hat{\boldsymbol\omega}$. Those four numbers with one constraint ($\lVert\hat{\boldsymbol\omega}\rVert = 1$), or equivalently the three components of the vector $\hat{\boldsymbol\omega}\theta$, are the **exponential coordinates** of the rotation. To compute with them we need cross products as matrices.

::: definition Skew-symmetric matrix of a vector {#def-skew}
For $\boldsymbol\omega = (\omega_1,\omega_2,\omega_3) \in \mathbb R^3$,
$$
[\boldsymbol\omega] = \begin{bmatrix} 0 & -\omega_3 & \omega_2 \\ \omega_3 & 0 & -\omega_1 \\ -\omega_2 & \omega_1 & 0 \end{bmatrix},
\qquad [\boldsymbol\omega]\,\mathbf x = \boldsymbol\omega\times\mathbf x \ \text{ for all } \mathbf x .
$$
$[\boldsymbol\omega]^{\mathsf T} = -[\boldsymbol\omega]$, and every $3\times3$ skew-symmetric matrix is $[\boldsymbol\omega]$ for exactly one $\boldsymbol\omega$. The set of these matrices is written $so(3)$.
:::

Two identities are used constantly. For a **unit** vector $\hat{\boldsymbol\omega}$, the vector triple product $\hat{\boldsymbol\omega}\times(\hat{\boldsymbol\omega}\times\mathbf x) = (\hat{\boldsymbol\omega}\cdot\mathbf x)\hat{\boldsymbol\omega} - \mathbf x$ gives
$$
[\hat{\boldsymbol\omega}]^2 = \hat{\boldsymbol\omega}\hat{\boldsymbol\omega}^{\mathsf T} - I,
\qquad
[\hat{\boldsymbol\omega}]^3 = -[\hat{\boldsymbol\omega}],
$$ {#eq-skew-powers}
the second because $[\hat{\boldsymbol\omega}]\hat{\boldsymbol\omega} = \hat{\boldsymbol\omega}\times\hat{\boldsymbol\omega} = \mathbf 0$.

::: theorem Rodrigues' formula {#thm-rodrigues}
The rotation through angle $\theta$ about the unit axis $\hat{\boldsymbol\omega}$ (right-hand rule) is
$$
\mathrm{Rot}(\hat{\boldsymbol\omega},\theta) = e^{[\hat{\boldsymbol\omega}]\theta} = I + \sin\theta\,[\hat{\boldsymbol\omega}] + (1-\cos\theta)\,[\hat{\boldsymbol\omega}]^2 ,
$$ {#eq-rodrigues}
and acting on a vector,
$\ \mathrm{Rot}(\hat{\boldsymbol\omega},\theta)\,\mathbf p = \cos\theta\,\mathbf p + \sin\theta\,(\hat{\boldsymbol\omega}\times\mathbf p) + (1-\cos\theta)(\hat{\boldsymbol\omega}\cdot\mathbf p)\,\hat{\boldsymbol\omega}$.
:::

::: proof
Let the body turn about the fixed axis $\hat{\boldsymbol\omega}$ through the origin at unit angular speed, so that after time $t$ it has turned through angle $t$. A point fixed in the body moves with velocity $\boldsymbol\omega\times\mathbf p$ (rigid-body kinematics, [[dynamics/three-dimensional-dynamics]]), so its position obeys the linear ODE $\dot{\mathbf p} = [\hat{\boldsymbol\omega}]\mathbf p$ with solution $\mathbf p(t) = e^{[\hat{\boldsymbol\omega}]t}\mathbf p(0)$. Setting $t = \theta$, the rotation operator is the matrix exponential $e^{[\hat{\boldsymbol\omega}]\theta} = \sum_{k\ge0} ([\hat{\boldsymbol\omega}]\theta)^k/k!$. Reduce the powers with [[#eq-skew-powers]]: $[\hat{\boldsymbol\omega}]^{3} = -[\hat{\boldsymbol\omega}]$, $[\hat{\boldsymbol\omega}]^{4} = -[\hat{\boldsymbol\omega}]^2$, and so on, so the odd powers are $\pm[\hat{\boldsymbol\omega}]$ and the even powers ($k\ge2$) are $\pm[\hat{\boldsymbol\omega}]^2$:
$$
e^{[\hat{\boldsymbol\omega}]\theta} = I + \Big(\theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \cdots\Big)[\hat{\boldsymbol\omega}] + \Big(\frac{\theta^2}{2!} - \frac{\theta^4}{4!} + \cdots\Big)[\hat{\boldsymbol\omega}]^2
= I + \sin\theta\,[\hat{\boldsymbol\omega}] + (1-\cos\theta)[\hat{\boldsymbol\omega}]^2 .
$$
For the vector form apply this to $\mathbf p$ and use $[\hat{\boldsymbol\omega}]^2\mathbf p = (\hat{\boldsymbol\omega}\cdot\mathbf p)\hat{\boldsymbol\omega} - \mathbf p$. Finally the result is in $SO(3)$: $(e^{A})^{\mathsf T} = e^{A^{\mathsf T}} = e^{-A}$ for $A = [\hat{\boldsymbol\omega}]\theta$, so $(e^A)^{\mathsf T}e^A = I$; and $\det e^{A} = e^{\operatorname{tr}A} = e^0 = 1$. Assumptions: $\lVert\hat{\boldsymbol\omega}\rVert = 1$ (otherwise [[#eq-skew-powers]] fails) and the axis passes through the origin (otherwise a translation appears — see [[#sec-screw]]).
:::

The vector form has a clean picture: split $\mathbf p$ into a part along the axis, $(\hat{\boldsymbol\omega}\cdot\mathbf p)\hat{\boldsymbol\omega}$, which does not move, and a part perpendicular to it, which turns through $\theta$ in the plane spanned by itself and $\hat{\boldsymbol\omega}\times\mathbf p$. Every point therefore moves on a circle in a plane perpendicular to the axis.

::: widget parametric
fx: cos(t) + (1 - cos(t))*sin(a)^2
fy: sin(t)*cos(a)
t: 0, 2pi
x: -1.3, 1.3
y: -1.3, 1.3
sliders: a=0.6:0:1.5:0.05
caption: The point $\mathbf p = (1,0,0)$ turned by $\mathrm{Rot}(\hat{\boldsymbol\omega}, t)$ about the axis $\hat{\boldsymbol\omega} = (\sin a, 0, \cos a)$, seen from above (projection on the $xy$-plane), computed from Rodrigues' formula. At $a = 0$ the axis is $\hat{\mathbf z}$ and the path is the unit circle. Tilt the axis towards $\hat{\mathbf x}$ and the circle shrinks and is seen edge-on more and more: its true radius is $\cos a$, the distance of $\mathbf p$ from the axis, and its centre $(\sin^2 a, 0)$ is the projection of $\mathbf p$ onto the axis. At $a \approx \pi/2$ the point lies on the axis and does not move.
:::

The inverse problem — given $R$, find $\hat{\boldsymbol\omega}$ and $\theta$ — is the **matrix logarithm**.

::: proposition Axis and angle of a rotation matrix {#prop-log}
Let $R \in SO(3)$ and $\theta \in [0,\pi]$ its rotation angle. Then
$$
\cos\theta = \tfrac12(\operatorname{tr}R - 1),
\qquad
[\hat{\boldsymbol\omega}] = \frac{R - R^{\mathsf T}}{2\sin\theta}\quad (0 < \theta < \pi).
$$ {#eq-log}
If $\theta = 0$ the axis is undefined ($R = I$). If $\theta = \pi$, then $R = 2\hat{\boldsymbol\omega}\hat{\boldsymbol\omega}^{\mathsf T} - I$ and $\hat{\boldsymbol\omega}$ is read (up to sign) from any non-zero column of $R + I$.
:::

::: proof
Take the trace of [[#eq-rodrigues]]: $\operatorname{tr}I = 3$, $\operatorname{tr}[\hat{\boldsymbol\omega}] = 0$, and $\operatorname{tr}[\hat{\boldsymbol\omega}]^2 = \operatorname{tr}(\hat{\boldsymbol\omega}\hat{\boldsymbol\omega}^{\mathsf T}) - 3 = 1 - 3 = -2$, so $\operatorname{tr}R = 3 - 2(1-\cos\theta) = 1 + 2\cos\theta$. Next, $I$ and $[\hat{\boldsymbol\omega}]^2$ are symmetric and $[\hat{\boldsymbol\omega}]$ is skew, so $R - R^{\mathsf T} = 2\sin\theta\,[\hat{\boldsymbol\omega}]$, which can be divided by $2\sin\theta$ when $\sin\theta \ne 0$. At $\theta = \pi$ the formula gives $R = I + 2[\hat{\boldsymbol\omega}]^2 = 2\hat{\boldsymbol\omega}\hat{\boldsymbol\omega}^{\mathsf T} - I$, so $R + I = 2\hat{\boldsymbol\omega}\hat{\boldsymbol\omega}^{\mathsf T}$, whose columns are multiples of $\hat{\boldsymbol\omega}$; both $\pm\hat{\boldsymbol\omega}$ are valid, since a half-turn either way is the same rotation. Restricting $\theta$ to $[0,\pi]$ loses nothing: a rotation by $\theta > \pi$ about $\hat{\boldsymbol\omega}$ equals a rotation by $2\pi - \theta$ about $-\hat{\boldsymbol\omega}$.
:::

::: example Axis and angle of a composite rotation {#ex-log}
Find the axis and angle of $R_a$ from [[#ex-fixed-current]].
::: solution
$\operatorname{tr}R_a = 0 + 0 + 0 = 0$, so $\cos\theta = (0 - 1)/2 = -\tfrac12$ and $\theta = 120^\circ = 2\pi/3$, with $\sin\theta = \sqrt3/2$. Then
$$
\frac{R_a - R_a^{\mathsf T}}{2\sin\theta} = \frac{1}{\sqrt3}
\left(\begin{bmatrix} 0 & 0 & 1 \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix} - \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 1 & 0 & 0 \end{bmatrix}\right)
= \frac{1}{\sqrt3}\begin{bmatrix} 0 & -1 & 1 \\ 1 & 0 & -1 \\ -1 & 1 & 0 \end{bmatrix},
$$
which is $[\hat{\boldsymbol\omega}]$ with $\hat{\boldsymbol\omega} = (1,1,1)/\sqrt3$ (read $\omega_1 = $ entry $(3,2)$, $\omega_2 = $ entry $(1,3)$, $\omega_3 = $ entry $(2,1)$). So two successive quarter-turns about body $z$ and body $x$ equal one $120^\circ$ turn about the cube diagonal. Check: a $120^\circ$ turn about $(1,1,1)$ cycles the axes $x \to y \to z \to x$, and indeed the columns of $R_a$ say $\hat{\mathbf x}_b = \hat{\mathbf y}_s$, $\hat{\mathbf y}_b = \hat{\mathbf z}_s$, $\hat{\mathbf z}_b = \hat{\mathbf x}_s$. The same computation for $R_b$ gives $120^\circ$ about $(1,-1,1)/\sqrt3$.
:::
:::

### Angular velocity

When $R(t)$ changes with time, the derivative $\dot R$ is not itself a rotation, but it carries the angular velocity.

::: proposition Angular velocity from a rotating frame {#prop-angular-velocity}
Let $R(t) = R_{sb}(t)$ be the orientation of a body frame. Then $\dot R R^{\mathsf T}$ and $R^{\mathsf T}\dot R$ are skew-symmetric, and
$$
\dot R R^{\mathsf T} = [\boldsymbol\omega_s], \qquad R^{\mathsf T}\dot R = [\boldsymbol\omega_b], \qquad \boldsymbol\omega_s = R\,\boldsymbol\omega_b ,
$$ {#eq-angular-velocity}
where $\boldsymbol\omega_s$ is the angular velocity of the body expressed in $\{s\}$ and $\boldsymbol\omega_b$ the same vector expressed in $\{b\}$.
:::

::: proof
Differentiate $RR^{\mathsf T} = I$: $\dot RR^{\mathsf T} + R\dot R^{\mathsf T} = 0$, i.e. $\dot RR^{\mathsf T} = -(\dot RR^{\mathsf T})^{\mathsf T}$, so it is skew and equals $[\boldsymbol\omega_s]$ for a unique $\boldsymbol\omega_s$. It is the angular velocity: a point fixed in the body has constant $\mathbf p_b$ and $\mathbf p_s(t) = R(t)\mathbf p_b$ (origins coincident), so $\dot{\mathbf p}_s = \dot R\mathbf p_b = \dot RR^{\mathsf T}\mathbf p_s = \boldsymbol\omega_s\times\mathbf p_s$, which is the defining property of the angular velocity of a rigid body. The same argument with $R^{\mathsf T}R = I$ shows $R^{\mathsf T}\dot R$ is skew. Finally $R^{\mathsf T}\dot R = R^{\mathsf T}(\dot RR^{\mathsf T})R = R^{\mathsf T}[\boldsymbol\omega_s]R = [R^{\mathsf T}\boldsymbol\omega_s]$, using the identity $R[\mathbf x]R^{\mathsf T} = [R\mathbf x]$ (a restatement of property 4 of [[#prop-so3]]; [[#exr-conjugation]]). Hence $\boldsymbol\omega_b = R^{\mathsf T}\boldsymbol\omega_s$.
:::

Exponential coordinates have one more virtue: for a constant angular velocity $\boldsymbol\omega$, $R(t) = e^{[\boldsymbol\omega]t}R(0)$ exactly. A gyroscope integrator in an inertial measurement unit uses this: over each sample period $\Delta t$ it updates $R \leftarrow R\,e^{[\boldsymbol\omega_b]\Delta t}$ with the measured body rate, which stays exactly on $SO(3)$, whereas the naive Euler step $R \leftarrow R + R[\boldsymbol\omega_b]\Delta t$ drifts off it (its columns slowly lose orthonormality).

## Euler angles and roll–pitch–yaw {#sec-euler}

Three numbers are the minimum, and people like three angles they can picture. Any rotation can be built from three successive elementary rotations, provided consecutive axes differ.

::: definition ZYZ Euler angles and ZYX roll–pitch–yaw angles {#def-euler}
The **ZYZ Euler angles** $(\alpha,\beta,\gamma)$ describe the rotation obtained by turning about the body $z$-axis by $\alpha$, then about the new body $y$-axis by $\beta$, then about the newest body $z$-axis by $\gamma$:
$$
R = \mathrm{Rot}_z(\alpha)\,\mathrm{Rot}_y(\beta)\,\mathrm{Rot}_z(\gamma)
= \begin{bmatrix}
c_\alpha c_\beta c_\gamma - s_\alpha s_\gamma & -c_\alpha c_\beta s_\gamma - s_\alpha c_\gamma & c_\alpha s_\beta \\
s_\alpha c_\beta c_\gamma + c_\alpha s_\gamma & -s_\alpha c_\beta s_\gamma + c_\alpha c_\gamma & s_\alpha s_\beta \\
-s_\beta c_\gamma & s_\beta s_\gamma & c_\beta
\end{bmatrix}.
$$
The **roll–pitch–yaw** (ZYX) angles $(\psi, \vartheta, \varphi)$ — yaw $\psi$, pitch $\vartheta$, roll $\varphi$ — use $R = \mathrm{Rot}_z(\psi)\,\mathrm{Rot}_y(\vartheta)\,\mathrm{Rot}_x(\varphi)$, whose first column and last row are
$$
r_{11} = c_\psi c_\vartheta,\quad r_{21} = s_\psi c_\vartheta,\quad r_{31} = -s_\vartheta,\quad r_{32} = c_\vartheta s_\varphi,\quad r_{33} = c_\vartheta c_\varphi .
$$
Equivalently, ZYX roll–pitch–yaw is roll about the fixed $x$-axis, then pitch about the fixed $y$-axis, then yaw about the fixed $z$-axis (pre-multiplication reverses the order).
:::

Spherical wrists of industrial arms have three revolute axes in ZYZ arrangement, so ZYZ angles are literally wrist joint angles ([[robotics/inverse-kinematics]]); aircraft, ships and mobile robots use roll–pitch–yaw. Extraction uses `atan2`, the two-argument arctangent that returns the angle in $(-\pi,\pi]$ with the correct quadrant. For ZYZ with $\sin\beta > 0$:
$$
\beta = \operatorname{atan2}\!\big(\sqrt{r_{13}^2 + r_{23}^2},\ r_{33}\big),\quad
\alpha = \operatorname{atan2}(r_{23},\ r_{13}),\quad
\gamma = \operatorname{atan2}(r_{32},\ -r_{31}),
$$ {#eq-zyz-extract}
and the choice $\sin\beta < 0$ gives a second solution $(\alpha+\pi, -\beta, \gamma+\pi)$. For roll–pitch–yaw with $\cos\vartheta > 0$:
$$
\vartheta = \operatorname{atan2}\!\big(-r_{31},\ \sqrt{r_{32}^2 + r_{33}^2}\big),\quad
\psi = \operatorname{atan2}(r_{21},\ r_{11}),\quad
\varphi = \operatorname{atan2}(r_{32},\ r_{33}).
$$ {#eq-rpy-extract}

::: example Roll, pitch and yaw from a measured orientation {#ex-rpy}
An attitude sensor on a mobile manipulator reports (to four decimals)
$$
R = \begin{bmatrix} 0.6943 & -0.6892 & -0.2072 \\ 0.5826 & 0.7072 & -0.4005 \\ 0.4226 & 0.1574 & 0.8925 \end{bmatrix}.
$$
Find yaw, pitch and roll, and check that $R$ is a rotation.
::: solution
Check first: column 1 has length $\sqrt{0.6943^2 + 0.5826^2 + 0.4226^2} = 1.0000$; columns 1 and 2 have dot product $-0.4785 + 0.4120 + 0.0665 = 0.0000$; similar for the rest. Now [[#eq-rpy-extract]]:
$$
\vartheta = \operatorname{atan2}\!\big(-0.4226,\ \sqrt{0.1574^2 + 0.8925^2}\big) = \operatorname{atan2}(-0.4226,\ 0.9063) = -25.0^\circ,
$$
$$
\psi = \operatorname{atan2}(0.5826,\ 0.6943) = 40.0^\circ,\qquad \varphi = \operatorname{atan2}(0.1574,\ 0.8925) = 10.0^\circ .
$$
Sanity check: $\cos\vartheta = 0.9063$ and $r_{11} = \cos\psi\cos\vartheta = 0.7660\times0.9063 = 0.6943$ ✓. The vehicle is yawed $40^\circ$ and has pitch $-25^\circ$ about $y$. With $z$ pointing up, a negative rotation about $y$ *raises* the $x$-axis: the first column of $R$ has $z$-component $+0.4226 = \sin 25^\circ$, so the vehicle's nose points $25^\circ$ upwards. In aerospace, where $z$ points down, the same words carry the opposite sign — which is why the matrix, not the words, should be passed between programs.
:::
:::

### Gimbal lock

The ZYZ formulas divide by nothing, yet they fail at $\beta = 0$: then $r_{13} = r_{23} = r_{31} = r_{32} = 0$ and $R = \mathrm{Rot}_z(\alpha+\gamma)$, so only the sum $\alpha + \gamma$ is determined. The trouble is not just in the extraction; it is in the *rates*.

::: proposition Singularity of Euler-angle rates {#prop-gimbal}
For ZYZ angles the space-frame angular velocity is $\boldsymbol\omega_s = B(\alpha,\beta)\,(\dot\alpha, \dot\beta, \dot\gamma)$ with
$$
B(\alpha,\beta) = \begin{bmatrix} 0 & -s_\alpha & c_\alpha s_\beta \\ 0 & c_\alpha & s_\alpha s_\beta \\ 1 & 0 & c_\beta \end{bmatrix},
\qquad \det B = -\sin\beta .
$$
At $\beta = 0$ or $\pi$ the matrix $B$ is singular: some angular velocities cannot be produced by any finite Euler-angle rates. Every three-parameter representation of $SO(3)$ has such singular points.
:::

::: proof
Differentiate $R = R_1R_2R_3$ with $R_1 = \mathrm{Rot}_z(\alpha)$, $R_2 = \mathrm{Rot}_y(\beta)$, $R_3 = \mathrm{Rot}_z(\gamma)$: $\dot RR^{\mathsf T} = \dot R_1R_1^{\mathsf T} + R_1(\dot R_2R_2^{\mathsf T})R_1^{\mathsf T} + R_1R_2(\dot R_3R_3^{\mathsf T})R_2^{\mathsf T}R_1^{\mathsf T}$. For an elementary rotation $\dot{\mathrm{Rot}}_z(\alpha)\mathrm{Rot}_z(\alpha)^{\mathsf T} = \dot\alpha[\hat{\mathbf z}]$, and by $R[\mathbf x]R^{\mathsf T} = [R\mathbf x]$ the three terms are the skew matrices of $\dot\alpha\hat{\mathbf z}$, $\dot\beta R_1\hat{\mathbf y}$ and $\dot\gamma R_1R_2\hat{\mathbf z}$. So $\boldsymbol\omega_s = \hat{\mathbf z}\dot\alpha + (-s_\alpha, c_\alpha, 0)\dot\beta + (c_\alpha s_\beta, s_\alpha s_\beta, c_\beta)\dot\gamma$, whose coefficient columns form $B$. Expanding along the first column, $\det B = 1\cdot\big((-s_\alpha)(s_\alpha s_\beta) - (c_\alpha)(c_\alpha s_\beta)\big) = -s_\beta$. Geometrically, at $\beta = 0$ the first and third axes coincide, so $B$'s first and third columns are both $\hat{\mathbf z}$ and only two independent directions remain. The final claim is topological: $SO(3)$ is not homeomorphic to any open subset of $\mathbb R^3$ (it is compact), so no single smooth three-parameter chart with a non-singular rate map covers all of it.
:::

::: widget plot
f: 1/sin(x); -cos(x)/sin(x)
x: 0.05, 1.5708
y: -12, 12
labels: \dot\gamma\ \text{(rad/s)}; \dot\alpha\ \text{(rad/s)}
hlines: 0
caption: Euler-angle rates needed to produce the steady angular velocity $\boldsymbol\omega_s = (1, 0, 0)\,\mathrm{rad/s}$ at $\alpha = 0$, plotted against $\beta$ in radians: $\dot\gamma = 1/\sin\beta$ and $\dot\alpha = -\cot\beta$ (from $B^{-1}\boldsymbol\omega_s$). Far from the singularity both rates are modest; as $\beta \to 0$ they grow without bound, and the two rates nearly cancel — the first and third gimbals spin furiously in opposite directions to produce a gentle tumble. A motion controller commanding Euler angles near $\beta = 0$ saturates its actuators; this is gimbal lock.
:::

::: quiz
A robot wrist with ZYZ axes sits at $\beta = 0$, so its first and third axes are aligned. Which statement is correct?
- [ ] The wrist can still rotate the tool about any axis with bounded joint rates.
- [x] The tool cannot be given an angular velocity about the $x$-axis, whatever the joint rates.
- [ ] The rotation matrix of the tool is undefined.
- [ ] Only $\beta$ is undetermined from the rotation matrix.
::: solution
At $\beta = 0$ the columns of $B$ are $\hat{\mathbf z}$, $(-s_\alpha, c_\alpha, 0)$ and $\hat{\mathbf z}$, which span only a plane containing $\hat{\mathbf z}$; the direction perpendicular to that plane (at $\alpha = 0$, the $x$-axis) is unreachable. The matrix $R$ itself is perfectly well defined — it is $\mathrm{Rot}_z(\alpha+\gamma)$ — and $\beta = 0$ is determined; it is $\alpha$ and $\gamma$ separately that are not.
:::
:::

## Unit quaternions {#sec-quat}

Four numbers with one constraint avoid the singularity of three angles while using far less storage and arithmetic than nine numbers with six constraints. That is the unit quaternion, the representation used inside most robot middleware, flight controllers and game engines.

::: definition Quaternions and unit quaternions {#def-quaternion}
A **quaternion** is $q = q_0 + q_1\mathbf i + q_2\mathbf j + q_3\mathbf k$, written $q = (q_0, \mathbf u)$ with scalar part $q_0$ and vector part $\mathbf u = (q_1,q_2,q_3)$, multiplied using $\mathbf i^2 = \mathbf j^2 = \mathbf k^2 = \mathbf i\mathbf j\mathbf k = -1$. In vector form the product is
$$
(a_0,\mathbf a)\otimes(b_0,\mathbf b) = \big(a_0b_0 - \mathbf a\cdot\mathbf b,\ \ a_0\mathbf b + b_0\mathbf a + \mathbf a\times\mathbf b\big),
$$ {#eq-quat-product}
which is associative but not commutative. The conjugate is $q^* = (q_0, -\mathbf u)$ and the norm $\lVert q\rVert^2 = q\otimes q^* = q_0^2 + \lVert\mathbf u\rVert^2$. A **unit quaternion** has $\lVert q\rVert = 1$; the unit quaternion of the rotation $\mathrm{Rot}(\hat{\boldsymbol\omega},\theta)$ is
$$
q = \big(\cos\tfrac\theta2,\ \sin\tfrac\theta2\,\hat{\boldsymbol\omega}\big).
$$
:::

::: proposition Rotating a vector with a quaternion {#prop-quat-rotation}
Identify $\mathbf p\in\mathbb R^3$ with the pure quaternion $(0,\mathbf p)$. If $q = (\cos\frac\theta2, \sin\frac\theta2\hat{\boldsymbol\omega})$ then
$$
q\otimes(0,\mathbf p)\otimes q^* = \big(0,\ \mathrm{Rot}(\hat{\boldsymbol\omega},\theta)\,\mathbf p\big),
$$
and the quaternion of a composite rotation is the product: if $q_1 \leftrightarrow R_1$ and $q_2 \leftrightarrow R_2$ then $q_1\otimes q_2 \leftrightarrow R_1R_2$. Both $q$ and $-q$ represent the same rotation.
:::

::: proof
Write $q = (s, \mathbf u)$ with $s = \cos\frac\theta2$, $\mathbf u = \sin\frac\theta2\hat{\boldsymbol\omega}$. By [[#eq-quat-product]], $q\otimes(0,\mathbf p) = (-\mathbf u\cdot\mathbf p,\ s\mathbf p + \mathbf u\times\mathbf p)$. Multiply on the right by $q^* = (s, -\mathbf u)$. The scalar part is $-s\,\mathbf u\cdot\mathbf p + (s\mathbf p + \mathbf u\times\mathbf p)\cdot\mathbf u = 0$. The vector part is
$$
(-\mathbf u\cdot\mathbf p)(-\mathbf u) + s(s\mathbf p + \mathbf u\times\mathbf p) - (s\mathbf p + \mathbf u\times\mathbf p)\times\mathbf u
= (\mathbf u\cdot\mathbf p)\mathbf u + s^2\mathbf p + 2s\,\mathbf u\times\mathbf p - (\mathbf u\times\mathbf p)\times\mathbf u .
$$
With $(\mathbf u\times\mathbf p)\times\mathbf u = \lVert\mathbf u\rVert^2\mathbf p - (\mathbf u\cdot\mathbf p)\mathbf u$ this becomes $(s^2 - \lVert\mathbf u\rVert^2)\mathbf p + 2(\mathbf u\cdot\mathbf p)\mathbf u + 2s\,\mathbf u\times\mathbf p$. Now $s^2 - \lVert\mathbf u\rVert^2 = \cos\theta$, $2\sin^2\frac\theta2 = 1-\cos\theta$ and $2\sin\frac\theta2\cos\frac\theta2 = \sin\theta$, giving $\cos\theta\,\mathbf p + (1-\cos\theta)(\hat{\boldsymbol\omega}\cdot\mathbf p)\hat{\boldsymbol\omega} + \sin\theta\,\hat{\boldsymbol\omega}\times\mathbf p$: the vector form of Rodrigues' formula ([[#thm-rodrigues]]). For composition, $q_1\otimes q_2\otimes(0,\mathbf p)\otimes(q_1\otimes q_2)^* = q_1\otimes\big(q_2\otimes(0,\mathbf p)\otimes q_2^*\big)\otimes q_1^*$ by associativity and $(q_1\otimes q_2)^* = q_2^*\otimes q_1^*$, which applies $R_2$ then $R_1$, i.e. $R_1R_2$. Replacing $q$ by $-q$ changes the sign of both factors and leaves the product unchanged.
:::

The sign ambiguity — the **double cover** — is harmless for rotating vectors but matters for interpolation and averaging: $q$ and $-q$ are far apart in $\mathbb R^4$ yet represent the same orientation, so software flips the sign of one quaternion when $q_1\cdot q_2 < 0$ before interpolating, to take the short way round. Spherical linear interpolation (slerp) between orientations is the subject of [[robotics/trajectory-planning]].

::: example Composing rotations with quaternions {#ex-quat}
Recompute $R_a = \mathrm{Rot}_z(90^\circ)\mathrm{Rot}_x(90^\circ)$ of [[#ex-fixed-current]] with quaternions, and use the result to rotate $\mathbf p = (1, 2, 3)$.
::: solution
With $h = \cos 45^\circ = \sin 45^\circ = \sqrt2/2$: $q_z = (h, 0, 0, h)$, $q_x = (h, h, 0, 0)$. By [[#eq-quat-product]] with $\mathbf a = (0,0,h)$, $\mathbf b = (h,0,0)$:
$$
q_z\otimes q_x = \big(h^2 - 0,\ h(h,0,0) + h(0,0,h) + (0,0,h)\times(h,0,0)\big) = \big(\tfrac12,\ (\tfrac12, 0, \tfrac12) + (0, \tfrac12, 0)\big) = \big(\tfrac12, \tfrac12, \tfrac12, \tfrac12\big).
$$
So $\cos\frac\theta2 = \frac12$, $\theta = 120^\circ$, and $\sin 60^\circ\,\hat{\boldsymbol\omega} = (\frac12,\frac12,\frac12)$ gives $\hat{\boldsymbol\omega} = (1,1,1)/\sqrt3$ — the same axis and angle found from the matrix in [[#ex-log]], with 16 multiplications instead of 27. The rotation cycles $x\to y\to z\to x$, so $\mathbf p = \hat{\mathbf x} + 2\hat{\mathbf y} + 3\hat{\mathbf z} \mapsto \hat{\mathbf y} + 2\hat{\mathbf z} + 3\hat{\mathbf x} = (3, 1, 2)$, which equals $R_a\mathbf p$ computed directly: $(0\cdot1 + 0\cdot2 + 1\cdot3,\ 1,\ 2) = (3,1,2)$. Length check: $\sqrt{14}$ before and after.
:::
:::

## Homogeneous transformations {#sec-homog}

A full pose needs a translation as well. If the origin of $\{b\}$ is at $\mathbf p_{ab}$ (coordinates in $\{a\}$) and its axes are given by $R_{ab}$, a point with $\{b\}$-coordinates $\mathbf x_b$ has $\{a\}$-coordinates $\mathbf x_a = R_{ab}\mathbf x_b + \mathbf p_{ab}$. This affine map becomes a matrix product if we append a 1 to the point.

::: definition Homogeneous transformation {#def-homogeneous}
The **homogeneous transformation** of $\{b\}$ relative to $\{a\}$ is
$$
T_{ab} = \begin{bmatrix} R_{ab} & \mathbf p_{ab} \\ \mathbf 0^{\mathsf T} & 1 \end{bmatrix} \in SE(3),
\qquad
\begin{bmatrix} \mathbf x_a \\ 1 \end{bmatrix} = T_{ab}\begin{bmatrix} \mathbf x_b \\ 1 \end{bmatrix},
$$
where the **special Euclidean group** $SE(3)$ is the set of such $4\times4$ matrices with $R \in SO(3)$ and $\mathbf p\in\mathbb R^3$. Points carry a homogeneous 1; free vectors carry a 0, so they are rotated but not translated. Compositions chain as before: $T_{ac} = T_{ab}T_{bc}$.
:::

::: proposition Inverse of a homogeneous transformation {#prop-inverse}
$$
T^{-1} = \begin{bmatrix} R & \mathbf p \\ \mathbf 0^{\mathsf T} & 1 \end{bmatrix}^{-1} = \begin{bmatrix} R^{\mathsf T} & -R^{\mathsf T}\mathbf p \\ \mathbf 0^{\mathsf T} & 1 \end{bmatrix},
\qquad T_{ba} = T_{ab}^{-1}.
$$
:::

::: proof
Multiply: $\begin{bmatrix} R^{\mathsf T} & -R^{\mathsf T}\mathbf p \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}\begin{bmatrix} R & \mathbf p \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix} = \begin{bmatrix} R^{\mathsf T}R & R^{\mathsf T}\mathbf p - R^{\mathsf T}\mathbf p \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix} = I_4$. Physically: inverting $\mathbf x_a = R\mathbf x_b + \mathbf p$ gives $\mathbf x_b = R^{\mathsf T}\mathbf x_a - R^{\mathsf T}\mathbf p$; the origin of $\{a\}$ seen from $\{b\}$ is $-R^{\mathsf T}\mathbf p$, not $-\mathbf p$. Computing the inverse this way costs a transpose and one matrix–vector product, and keeps the result exactly in $SE(3)$, unlike a general $4\times4$ numerical inversion.
:::

::: example Locating an object seen by a wrist camera {#ex-camera}
A robot's end-effector frame $\{e\}$ is at $\mathbf p_{se} = (0.60, 0.20, 0.50)\,\mathrm m$ with $R_{se} = \mathrm{Rot}_x(180^\circ)$ (the tool $z$-axis points straight down). A camera frame $\{c\}$ is bolted to the gripper with $\mathbf p_{ec} = (0.05, 0, -0.04)\,\mathrm m$ and $R_{ec} = \mathrm{Rot}_z(90^\circ)$. The camera locates a part at $\mathbf x_c = (0.02, -0.03, 0.30)\,\mathrm m$. Where is the part in $\{s\}$, and what is $T_{cs}$?
::: solution
First, $R_{se} = \mathrm{diag}(1,-1,-1)$, so
$$
T_{sc} = T_{se}T_{ec},\qquad R_{sc} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & -1 & 0 \\ 0 & 0 & -1\end{bmatrix}\begin{bmatrix} 0 & -1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1\end{bmatrix} = \begin{bmatrix} 0 & -1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & -1\end{bmatrix},
$$
$$
\mathbf p_{sc} = \mathbf p_{se} + R_{se}\mathbf p_{ec} = (0.60, 0.20, 0.50) + (0.05, 0, 0.04) = (0.65, 0.20, 0.54)\,\mathrm m .
$$
Then $\mathbf x_s = R_{sc}\mathbf x_c + \mathbf p_{sc} = (0.03, -0.02, -0.30) + (0.65, 0.20, 0.54) = (0.68, 0.18, 0.24)\,\mathrm m$. The part is $0.30\,\mathrm m$ below the camera (the camera looks along its $z$-axis, which points down) — consistent with the camera at height $0.54\,\mathrm m$ and the part at $0.24\,\mathrm m$. By [[#prop-inverse]],
$$
T_{cs} = \begin{bmatrix} R_{sc}^{\mathsf T} & -R_{sc}^{\mathsf T}\mathbf p_{sc} \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix},\qquad
-R_{sc}^{\mathsf T}\mathbf p_{sc} = -\begin{bmatrix} 0 & -1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & -1\end{bmatrix}\begin{bmatrix} 0.65 \\ 0.20 \\ 0.54\end{bmatrix} = \begin{bmatrix} 0.20 \\ 0.65 \\ 0.54\end{bmatrix}\mathrm m .
$$
Check: $T_{cs}$ applied to the base origin $(0,0,0,1)$ gives $(0.20, 0.65, 0.54)$, and its length $0.871\,\mathrm m$ equals $\lVert\mathbf p_{sc}\rVert = \sqrt{0.65^2 + 0.2^2 + 0.54^2} = 0.871\,\mathrm m$, as a distance between two origins must.
:::
:::

In a real cell the transform $T_{ec}$ is not read off a drawing but measured by *hand–eye calibration*, and errors in it propagate directly into every grasp: an angular error of $0.5^\circ$ in $R_{ec}$ moves a point $0.30\,\mathrm m$ away by $0.30\times0.5\pi/180 = 2.6\,\mathrm{mm}$.

## Twists and screw motions {#sec-screw}

Rodrigues' formula describes a rotation about an axis through the origin. A general rigid motion is better described by an axis that can be anywhere in space, with some translation along it.

::: definition Screw axis and twist {#def-screw}
A **screw axis** is $\mathcal S = (\boldsymbol\omega, \mathbf v) \in \mathbb R^6$ with either (a) $\lVert\boldsymbol\omega\rVert = 1$, describing rotation about the line through $\mathbf q$ in direction $\boldsymbol\omega$ with **pitch** $h$ (translation per radian), where
$$
\mathbf v = -\boldsymbol\omega\times\mathbf q + h\,\boldsymbol\omega ;
$$
or (b) $\boldsymbol\omega = \mathbf 0$, $\lVert\mathbf v\rVert = 1$, a pure translation along $\mathbf v$ (infinite pitch). Its $4\times4$ matrix form is $[\mathcal S] = \begin{bmatrix} [\boldsymbol\omega] & \mathbf v \\ \mathbf 0^{\mathsf T} & 0\end{bmatrix}$. A **twist** $\mathcal V = \mathcal S\dot\theta$ is a screw axis times a rate: $\boldsymbol\omega\dot\theta$ is the angular velocity and $\mathbf v\dot\theta$ is the velocity of the body point instantaneously at the origin of the frame.
:::

The second interpretation explains the odd-looking $\mathbf v$: a body spinning about a line through $\mathbf q$ moves the point at the origin with velocity $\boldsymbol\omega\times(\mathbf 0 - \mathbf q) = -\boldsymbol\omega\times\mathbf q$, plus the axial drift $h\boldsymbol\omega$. A revolute joint is a screw of zero pitch, a prismatic joint a screw of infinite pitch — which is why the product-of-exponentials formula of [[robotics/forward-kinematics]] treats both with one formula.

::: proposition Exponential of a screw motion {#prop-screw-exp}
Moving along the screw axis $\mathcal S = (\boldsymbol\omega,\mathbf v)$ with $\lVert\boldsymbol\omega\rVert = 1$ through angle $\theta$ is the rigid motion
$$
e^{[\mathcal S]\theta} = \begin{bmatrix} e^{[\boldsymbol\omega]\theta} & G(\theta)\,\mathbf v \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix},
\qquad G(\theta) = I\theta + (1-\cos\theta)[\boldsymbol\omega] + (\theta - \sin\theta)[\boldsymbol\omega]^2 ,
$$ {#eq-screw-exp}
and for a pure translation ($\boldsymbol\omega = \mathbf 0$) $e^{[\mathcal S]\theta} = \begin{bmatrix} I & \mathbf v\theta \\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}$. Conversely (**Chasles' theorem**) every $T \in SE(3)$ is $e^{[\mathcal S]\theta}$ for some screw axis $\mathcal S$ and $\theta \ge 0$.
:::

::: proof
As in the proof of [[#thm-rodrigues]], a point moving rigidly with the twist $\mathcal S$ at unit rate satisfies $\frac{d}{dt}\begin{bmatrix}\mathbf x\\1\end{bmatrix} = [\mathcal S]\begin{bmatrix}\mathbf x\\1\end{bmatrix}$, i.e. $\dot{\mathbf x} = \boldsymbol\omega\times\mathbf x + \mathbf v$, so the motion after angle $\theta$ is $e^{[\mathcal S]\theta}$. Powers of the block matrix are $[\mathcal S]^k = \begin{bmatrix}[\boldsymbol\omega]^k & [\boldsymbol\omega]^{k-1}\mathbf v\\ \mathbf 0^{\mathsf T} & 0\end{bmatrix}$ for $k \ge 1$, so the top-left block of the exponential is $e^{[\boldsymbol\omega]\theta}$ and the top-right block is $\big(\sum_{k\ge1}[\boldsymbol\omega]^{k-1}\theta^k/k!\big)\mathbf v$. Reducing the powers with $[\boldsymbol\omega]^3 = -[\boldsymbol\omega]$ as before,
$$
\sum_{k\ge1}\frac{[\boldsymbol\omega]^{k-1}\theta^k}{k!} = I\theta + \Big(\frac{\theta^2}{2!} - \frac{\theta^4}{4!} + \cdots\Big)[\boldsymbol\omega] + \Big(\frac{\theta^3}{3!} - \frac{\theta^5}{5!} + \cdots\Big)[\boldsymbol\omega]^2 = G(\theta).
$$
If $\boldsymbol\omega = \mathbf 0$ only the $k=1$ term survives, giving $\mathbf v\theta$.
For the converse, let $T = (R,\mathbf p)$. If $R = I$, take $\boldsymbol\omega = \mathbf 0$, $\theta = \lVert\mathbf p\rVert$, $\mathbf v = \mathbf p/\theta$ (or $\theta = 0$ if $\mathbf p = \mathbf 0$). Otherwise take $\boldsymbol\omega$ and $\theta\in(0,\pi]$ from [[#prop-log]] and solve $G(\theta)\mathbf v = \mathbf p$; this is possible because $G(\theta)$ is invertible. Indeed, along $\boldsymbol\omega$ it acts as multiplication by $\theta > 0$ (as $[\boldsymbol\omega]\boldsymbol\omega = \mathbf 0$), and on the plane perpendicular to $\boldsymbol\omega$, where $[\boldsymbol\omega]$ acts as a quarter-turn $J$ with $J^2 = -I$, it acts as $\sin\theta\,I + (1-\cos\theta)J$, whose determinant on that plane is $\sin^2\theta + (1-\cos\theta)^2 = 2 - 2\cos\theta > 0$.
:::

::: example A screw motion about an offset axis {#ex-screw}
A body is moved by a quarter turn, $\theta = \pi/2$, about the vertical line through $\mathbf q = (1, 0, 0)\,\mathrm m$, with pitch $h = 0.05\,\mathrm{m/rad}$. Find $T$ and the new position of the body point that was at the origin.
::: solution
$\boldsymbol\omega = (0,0,1)$; $\boldsymbol\omega\times\mathbf q = (0,0,1)\times(1,0,0) = (0,1,0)$; so $\mathbf v = (0,-1,0) + 0.05(0,0,1) = (0,-1,0.05)$. At $\theta = \pi/2$: $1 - \cos\theta = 1$, $\theta - \sin\theta = \pi/2 - 1 = 0.5708$, and with $[\boldsymbol\omega]\mathbf v = \boldsymbol\omega\times\mathbf v = (1, 0, 0)$, $[\boldsymbol\omega]^2\mathbf v = \boldsymbol\omega\times(1,0,0) = (0,1,0)$,
$$
G\mathbf v = \tfrac\pi2(0,-1,0.05) + 1\cdot(1,0,0) + 0.5708\,(0,1,0) = (1,\ -1.5708 + 0.5708,\ 0.0785) = (1,\ -1,\ 0.0785)\,\mathrm m,
$$
$$
T = \begin{bmatrix} 0 & -1 & 0 & 1 \\ 1 & 0 & 0 & -1 \\ 0 & 0 & 1 & 0.0785 \\ 0 & 0 & 0 & 1\end{bmatrix}.
$$
The origin goes to $(1, -1, 0.0785)\,\mathrm m$. Check geometrically: relative to the axis the origin is at $(-1,0,0)$; a quarter-turn anticlockwise about $z$ takes it to $(0,-1,0)$; adding back $\mathbf q$ gives $(1,-1,0)$; and the screw advances $h\theta = 0.05\times\pi/2 = 0.0785\,\mathrm m$ upwards. ✓
:::
:::

::: widget transform2d
matrix: cos(pi/6), -sin(pi/6); sin(pi/6), cos(pi/6)
eigen: true
vector: 1.5, 0.5
caption: A planar rotation $\mathrm{Rot}(30^\circ)$ acting on the grid, the unit square and a draggable vector. Notice that the determinant (area ratio) is exactly 1 and that no real eigenvector appears: in the plane, only the rotation axis (here perpendicular to the screen) is left fixed. Edit an entry, say change the $(1,1)$ entry to $1.2$, and the matrix stops being a rotation: the square is sheared and lengths are no longer preserved, which is what happens to a numerically integrated orientation matrix that is never re-orthonormalised.
:::

::: warning A transform is not symmetric in its frames
$T_{ab}$ and $T_{ba}$ are inverses, not transposes: the transpose of a $4\times4$ homogeneous matrix is not even in $SE(3)$ (its bottom row is no longer $(0,0,0,1)$). Equally, the translation part of $T_{ba}$ is $-R_{ab}^{\mathsf T}\mathbf p_{ab}$, not $-\mathbf p_{ab}$; the two agree only when $R_{ab} = I$. When chaining transforms, write the frame names and check that inner subscripts match ($T_{se}T_{ec}$, never $T_{se}T_{ce}$).
:::

::: history
Euler's theorem that a rigid displacement with a fixed point is a rotation about an axis appeared in 1776. Giulio Mozzi (1763) and Michel Chasles (1830) showed that any rigid displacement is a screw motion about some line, and Olinde Rodrigues published the composition of rotations and the formula now named after him in 1840. William Rowan Hamilton discovered the quaternions on 16 October 1843; Robert Stawell Ball developed the geometry of twists and wrenches in *The Theory of Screws* (1876). The homogeneous $4\times4$ matrix entered kinematics in Denavit and Hartenberg's 1955 paper on lower-pair mechanisms, and Richard Paul's 1981 book *Robot Manipulators: Mathematics, Programming, and Control* made homogeneous transforms the everyday language of robot programming. Roger Brockett's 1984 product-of-exponentials formula brought the screw exponential of [[#prop-screw-exp]] back into robot kinematics.
:::

::: summary
- A rotation matrix $R_{ab} \in SO(3)$ has the axes of $\{b\}$ in $\{a\}$ as its columns; $R^{-1} = R^{\mathsf T}$, $\det R = 1$, and $\mathbf p_a = R_{ab}\mathbf p_b$, $R_{ac} = R_{ab}R_{bc}$.
- Rotations about fixed axes pre-multiply, rotations about the body's current axes post-multiply; rotations do not commute.
- Rodrigues: $\mathrm{Rot}(\hat{\boldsymbol\omega},\theta) = I + \sin\theta[\hat{\boldsymbol\omega}] + (1-\cos\theta)[\hat{\boldsymbol\omega}]^2$; inversely $\cos\theta = (\operatorname{tr}R - 1)/2$, $[\hat{\boldsymbol\omega}] = (R - R^{\mathsf T})/(2\sin\theta)$.
- Angular velocity: $\dot RR^{\mathsf T} = [\boldsymbol\omega_s]$, $R^{\mathsf T}\dot R = [\boldsymbol\omega_b]$.
- Euler and roll–pitch–yaw angles are intuitive but singular (gimbal lock, $\det B = -\sin\beta$ for ZYZ); every three-parameter representation has singularities.
- Unit quaternions $(\cos\frac\theta2, \sin\frac\theta2\hat{\boldsymbol\omega})$ compose by multiplication, have no singularity, and double-cover $SO(3)$.
- Homogeneous transforms $T = \begin{bmatrix} R & \mathbf p\\ \mathbf 0^{\mathsf T} & 1\end{bmatrix}$ chain by multiplication; $T^{-1}$ has translation $-R^{\mathsf T}\mathbf p$.
- Every rigid motion is a screw motion $e^{[\mathcal S]\theta}$ about some line (Chasles); revolute and prismatic joints are screws of zero and infinite pitch.
:::

## Exercises

::: exercise Rotated and shifted frame {#exr-shift level=1 check="-1.5"}
Frame $\{b\}$ is obtained from $\{a\}$ by a rotation of $90^\circ$ about $\hat{\mathbf z}_a$ and a translation of its origin to $\mathbf p_{ab} = (0.5, 0, 0)\,\mathrm m$. A point has $\mathbf x_b = (1, 2, 3)\,\mathrm m$. Find $\mathbf x_a$. (Enter the $x$-coordinate of $\mathbf x_a$ in m.)
::: solution
$R_{ab} = \mathrm{Rot}_z(90^\circ) = \begin{bmatrix} 0 & -1 & 0\\ 1 & 0 & 0\\ 0 & 0 & 1\end{bmatrix}$, so $R_{ab}\mathbf x_b = (-2, 1, 3)$ and $\mathbf x_a = (-2 + 0.5,\ 1,\ 3) = (-1.5, 1, 3)\,\mathrm m$. Check: the distance from the origin of $\{b\}$ is $\sqrt{14}$ in both frames: $\lVert\mathbf x_a - \mathbf p_{ab}\rVert = \lVert(-2,1,3)\rVert = \sqrt{14}$.
:::
:::

::: exercise Angle from the trace {#exr-trace level=1 check="75.52"}
A rotation matrix has trace $1.5$. What is its rotation angle? (Enter $\theta$ in degrees, in $[0, 180]$, rounded to two decimal places.)
::: solution
$\cos\theta = (\operatorname{tr}R - 1)/2 = 0.25$, so $\theta = \arccos 0.25 = 75.5^\circ$. The trace ranges from $3$ (identity) to $-1$ (half-turn), so $1.5$ is a moderate rotation, as found.
:::
:::

::: exercise Inverse transform {#exr-inverse level=1 check="-2"}
$T_{ab}$ has $R_{ab} = \mathrm{Rot}_z(90^\circ)$ and $\mathbf p_{ab} = (1, 2, 0)\,\mathrm m$. Find the position of the origin of $\{a\}$ in $\{b\}$-coordinates. (Enter its $x$-coordinate in m.)
::: solution
By [[#prop-inverse]], $\mathbf p_{ba} = -R_{ab}^{\mathsf T}\mathbf p_{ab} = -\begin{bmatrix} 0 & 1 & 0\\ -1 & 0 & 0 \\ 0 & 0 & 1\end{bmatrix}\begin{bmatrix}1\\2\\0\end{bmatrix} = -\begin{bmatrix} 2 \\ -1 \\ 0\end{bmatrix} = \begin{bmatrix} -2 \\ 1 \\ 0\end{bmatrix}\mathrm m$. Note it is not $-\mathbf p_{ab} = (-1,-2,0)$. Check: $T_{ab}(\mathbf p_{ba},1)$ must be the origin: $R_{ab}(-2,1,0) + (1,2,0) = (-1,-2,0) + (1,2,0) = \mathbf 0$ ✓.
:::
:::

::: exercise Roll from a rotation matrix {#exr-roll level=2 check="-15"}
A ZYX (roll–pitch–yaw) orientation has, to four decimals, $r_{11} = 0.8138$, $r_{21} = 0.4698$, $r_{31} = -0.3420$, $r_{32} = -0.2432$, $r_{33} = 0.9077$. Find yaw, pitch and roll. (Enter the roll angle in degrees.)
::: solution
Pitch: $\vartheta = \operatorname{atan2}(0.3420, \sqrt{0.2432^2 + 0.9077^2}) = \operatorname{atan2}(0.3420, 0.9397) = 20.0^\circ$. Yaw: $\psi = \operatorname{atan2}(0.4698, 0.8138) = 30.0^\circ$. Roll: $\varphi = \operatorname{atan2}(-0.2432, 0.9077) = -15.0^\circ$. Check: $\cos\vartheta\cos\varphi = 0.9397\times0.9659 = 0.9077 = r_{33}$ ✓. Using $\arctan(r_{32}/r_{33})$ would also work here, but only because $r_{33} > 0$; `atan2` is needed in general.
:::
:::

::: exercise Quaternion rotation {#exr-quat level=2 check="3"}
Using $q = (\frac12, \frac12, \frac12, \frac12)$, rotate $\mathbf p = (1, 2, 3)$ by computing $q\otimes(0,\mathbf p)\otimes q^*$ explicitly with [[#eq-quat-product]]. (Enter the $x$-component of the result.)
::: solution
Write $\mathbf u = (\frac12,\frac12,\frac12)$. First product, by [[#eq-quat-product]]: scalar part $-\mathbf u\cdot\mathbf p = -3$; vector part $\frac12\mathbf p + \mathbf u\times\mathbf p = (0.5, 1, 1.5) + (0.5, -1, 0.5) = (1, 0, 2)$, since $\mathbf u\times\mathbf p = \big(\frac12\cdot3 - \frac12\cdot2,\ \frac12\cdot1 - \frac12\cdot3,\ \frac12\cdot2 - \frac12\cdot1\big) = (0.5, -1, 0.5)$. So $q\otimes(0,\mathbf p) = (-3, (1,0,2))$.
Second product with $q^* = (\frac12, -\mathbf u)$: scalar part $(-3)\cdot\frac12 - (1,0,2)\cdot(-\mathbf u) = -1.5 + 1.5 = 0$, as it must be for a rotated vector. Vector part
$$
(-3)(-\mathbf u) + \tfrac12(1,0,2) + (1,0,2)\times(-\mathbf u) = (1.5,1.5,1.5) + (0.5, 0, 1) + (1, -0.5, -0.5) = (3, 1, 2).
$$
This agrees with [[#ex-quat]] (the rotation cycles $x\to y\to z\to x$), and the length $\sqrt{14}$ is preserved. Enter $3$.
:::
:::

::: exercise Two fixed-axis turns {#exr-fixed level=2 check="120"}
A body aligned with $\{s\}$ is turned $90^\circ$ about the space $x$-axis and then $90^\circ$ about the space $y$-axis. Find the final rotation matrix and its rotation angle. (Enter the angle in degrees.)
::: solution
Fixed axes pre-multiply: $R = \mathrm{Rot}_y(90^\circ)\mathrm{Rot}_x(90^\circ) = \begin{bmatrix} 0 & 0 & 1\\ 0 & 1 & 0\\ -1 & 0 & 0\end{bmatrix}\begin{bmatrix} 1 & 0 & 0\\ 0 & 0 & -1\\ 0 & 1 & 0\end{bmatrix} = \begin{bmatrix} 0 & 1 & 0\\ 0 & 0 & -1\\ -1 & 0 & 0\end{bmatrix}$. Its trace is $0$, so $\cos\theta = -\frac12$ and $\theta = 120^\circ$; from $(R - R^{\mathsf T})/(2\sin\theta)$ the axis is $(1, 1, -1)/\sqrt3$. Check: a $120^\circ$ turn about $(1,1,-1)$ sends $\hat{\mathbf x} \to -\hat{\mathbf z}$, which is the first column of $R$ ✓.
:::
:::

::: exercise Angular velocity of a compound rotation {#exr-omega level=2 check="sqrt(2)"}
A camera gimbal has orientation $R(t) = \mathrm{Rot}_z(t)\,\mathrm{Rot}_x(t)$ ($t$ in seconds, angles in radians). Find $\boldsymbol\omega_s(t)$ and its magnitude. (Enter $\lVert\boldsymbol\omega_s\rVert$ in rad/s, exactly — an expression such as a square root is accepted.)
::: solution
As in the proof of [[#prop-gimbal]], $\dot RR^{\mathsf T} = [\hat{\mathbf z}]\cdot1 + \mathrm{Rot}_z(t)[\hat{\mathbf x}]\mathrm{Rot}_z(t)^{\mathsf T}\cdot1 = [\hat{\mathbf z} + \mathrm{Rot}_z(t)\hat{\mathbf x}]$, so $\boldsymbol\omega_s = (\cos t, \sin t, 1)\,\mathrm{rad/s}$ and $\lVert\boldsymbol\omega_s\rVert = \sqrt{\cos^2t + \sin^2t + 1} = \sqrt2 = 1.414\,\mathrm{rad/s}$ for all $t$. The two joint rates add as vectors along the two (perpendicular) joint axes; the angular velocity is constant in size but its direction precesses about $\hat{\mathbf z}$.
:::
:::

::: exercise Conjugation identity {#exr-conjugation level=3}
Prove that $R[\mathbf x]R^{\mathsf T} = [R\mathbf x]$ for every $R \in SO(3)$ and $\mathbf x\in\mathbb R^3$, and deduce that $R\,\mathrm{Rot}(\hat{\boldsymbol\omega},\theta)\,R^{\mathsf T} = \mathrm{Rot}(R\hat{\boldsymbol\omega},\theta)$. Interpret the second identity, and use it to justify the rule that a rotation about a fixed axis pre-multiplies.
::: solution
For any $\mathbf y$, $R[\mathbf x]R^{\mathsf T}\mathbf y = R\big(\mathbf x\times R^{\mathsf T}\mathbf y\big) = (R\mathbf x)\times(RR^{\mathsf T}\mathbf y) = (R\mathbf x)\times\mathbf y = [R\mathbf x]\mathbf y$, using the cross-product property 4 of [[#prop-so3]]. Since the two matrices agree on every $\mathbf y$, they are equal. Then, because conjugation commutes with powers, $R(A^k)R^{\mathsf T} = (RAR^{\mathsf T})^k$, and therefore with the exponential series: $Re^{[\hat{\boldsymbol\omega}]\theta}R^{\mathsf T} = e^{R[\hat{\boldsymbol\omega}]R^{\mathsf T}\theta} = e^{[R\hat{\boldsymbol\omega}]\theta}$. Interpretation: "go to the frame in which the axis is $\hat{\boldsymbol\omega}$, rotate there, come back" is a rotation by the same angle about the transformed axis $R\hat{\boldsymbol\omega}$. Fixed-axis rule: let the body have orientation $R$ and turn by $\theta$ about a space axis $\hat{\boldsymbol\omega}_s$. In body coordinates that axis is $\hat{\boldsymbol\omega}_b = R^{\mathsf T}\hat{\boldsymbol\omega}_s$, and the body-frame rule gives $R\,\mathrm{Rot}(R^{\mathsf T}\hat{\boldsymbol\omega}_s,\theta) = R\,R^{\mathsf T}\mathrm{Rot}(\hat{\boldsymbol\omega}_s,\theta)R = \mathrm{Rot}(\hat{\boldsymbol\omega}_s,\theta)\,R$ — pre-multiplication.
:::
:::

::: exercise Screw parameters of a given motion {#exr-screw level=3 check="2/pi"}
A rigid motion has $R = \mathrm{Rot}_z(90^\circ)$ and $\mathbf p = (0, 2, 1)\,\mathrm m$. Find its screw axis (direction, a point on it), the angle, and the pitch. (Enter the pitch in m/rad, exactly — an expression containing pi is accepted.)
::: solution
From $R$: $\boldsymbol\omega = \hat{\mathbf z}$, $\theta = \pi/2$. Solve $G(\theta)\mathbf v = \mathbf p$ with [[#eq-screw-exp]]. Along $\hat{\mathbf z}$, $G$ multiplies by $\theta$: $v_z = 1/(\pi/2) = 0.6366$. In the $xy$-plane $G$ acts as $\sin\theta\,I + (1-\cos\theta)J = I + J$ with $J(a,b) = (-b,a)$: $(v_x - v_y,\ v_y + v_x) = (0, 2)$, so $v_x = v_y = 1$. Hence $\mathbf v = (1, 1, 0.6366)$. Pitch $h = \boldsymbol\omega\cdot\mathbf v = 2/\pi = 0.637\,\mathrm{m/rad}$. The point of the axis nearest the origin is $\mathbf q = \boldsymbol\omega\times\mathbf v = (-1, 1, 0)\,\mathrm m$ (from $\mathbf v = -\boldsymbol\omega\times\mathbf q + h\boldsymbol\omega$ with $\mathbf q\perp\boldsymbol\omega$). Check: turning the origin $90^\circ$ about the vertical line through $(-1,1,0)$ takes it to $(-1,1,0) + \mathrm{Rot}_z(90^\circ)(1,-1,0) = (-1,1,0) + (1,1,0) = (0,2,0)$, and the advance $h\theta = 1\,\mathrm m$ gives $(0,2,1) = \mathbf p$ ✓.
:::
:::

::: exercise Choosing an orientation representation {#exr-design level=3}
You are writing the software for a camera-carrying robot arm that must (i) store target orientations taught by an operator, (ii) display them to the operator, (iii) interpolate smoothly between them, and (iv) integrate gyroscope readings at $1\,\mathrm{kHz}$ to track the camera's orientation between vision updates. For each task recommend a representation (rotation matrix, axis–angle / exponential coordinates, Euler or roll–pitch–yaw angles, unit quaternion) and justify the choice by the properties derived in this chapter, including what can go wrong.
::: solution
There is no single right answer; a defensible design is: (i) *Storage*: unit quaternions (4 numbers, no singularity) or rotation matrices; store normalised and document the convention (scalar first or last). (ii) *Display*: roll–pitch–yaw or the controller's own Euler convention, because operators think in angles — but compute them from the stored representation only for display, warn near pitch $\pm90^\circ$ (gimbal lock, [[#prop-gimbal]]) and never feed displayed angles back into computation. (iii) *Interpolation*: quaternion slerp (or, equivalently, $R_1e^{[\hat{\boldsymbol\omega}]\theta s}$ with $R_1^{\mathsf T}R_2 = e^{[\hat{\boldsymbol\omega}]\theta}$), which rotates about a fixed axis at constant rate; flip the sign of one quaternion if $q_1\cdot q_2 < 0$ to take the short path. Interpolating Euler angles linearly gives a curved, speed-varying motion and can pass through gimbal lock. (iv) *Integration*: update with the exact exponential, $R \leftarrow R\,e^{[\boldsymbol\omega_b]\Delta t}$ or $q \leftarrow q\otimes(\cos\frac{\lVert\boldsymbol\omega_b\rVert\Delta t}{2}, \sin\frac{\lVert\boldsymbol\omega_b\rVert\Delta t}{2}\,\boldsymbol\omega_b/\lVert\boldsymbol\omega_b\rVert)$, and renormalise the quaternion (or re-orthonormalise the matrix) every step to remove round-off drift. Euler angles are a poor state for integration because their rate equations are singular ($\det B = -\sin\beta$).
:::
:::

## Further reading

Lynch and Park, *Modern Robotics*, develop this chapter's material (rotations, exponential coordinates, twists and screws) in the same notation; Murray, Li and Sastry give the Lie-group proofs; Spong, Hutchinson and Vidyasagar treat Euler angles, roll–pitch–yaw and homogeneous transforms in the style used by the Denavit–Hartenberg chapters that follow.
