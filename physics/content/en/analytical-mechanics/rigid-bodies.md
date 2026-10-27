Throw a book into the air, spinning it about its longest axis, and it rotates steadily. Spin it about its shortest axis, across the face, and it again rotates steadily. Spin it about the remaining axis, the one in the plane of the cover parallel to the spine's short side, and it tumbles: however carefully you launch it, it flips over every turn or two. A tennis racket does the same, and so did a wing nut that the cosmonaut Vladimir Dzhanibekov watched spinning in weightlessness aboard Salyut 7 in 1985. No torque acts in any of these cases. The behaviour is a property of the free motion of a rigid body, and its explanation is the high point of this chapter.

A rigid body has six degrees of freedom ([[analytical-mechanics/constraints#ex-dof]]): three for the position of its centre of mass and three for its orientation. The translational part is the motion of a single particle of the total mass. The rotational part is new, because the relation between angular momentum and angular velocity is no longer a single number. [[mechanics/rotation]] and [[mechanics/angular-momentum]] treated rotation about a fixed axis, where $L = I\omega$ with a scalar $I$. For rotation about an arbitrary axis, angular momentum and angular velocity need not even be parallel, and the scalar becomes a symmetric $3\times 3$ matrix, the **inertia tensor**.

The plan is: describe rotation by an angular velocity vector; compute angular momentum and kinetic energy, which introduces the inertia tensor and its principal axes; write Newton's law for rotation in a frame fixed in the body, which gives Euler's equations; and solve those equations for the free symmetric top and for the stability question raised by the book.

## Angular velocity and rotating frames {#angular-velocity}

Fix a point $O$ of the body, either a fixed pivot or the centre of mass. Every other point moves, relative to $O$, on a sphere about $O$. By Euler's rotation theorem, any displacement of a rigid body with one point fixed is a rotation about some axis through that point. For an infinitesimal displacement in time $\dd t$ the rotation angle is $\omega\,\dd t$ about an axis $\hat{\mathbf{n}}$, and the **angular velocity** is the vector $\boldsymbol{\omega} = \omega\hat{\mathbf{n}}$. A point at position $\mathbf{r}$ relative to $O$ then has velocity

$$
\mathbf{v} = \boldsymbol{\omega}\times\mathbf{r}.
$$ {#eq-v-omega}

The axis and rate of rotation may change from instant to instant; $\boldsymbol{\omega}(t)$ is the instantaneous axis.

The same formula governs the rate of change of any vector fixed in the body. More generally, let $\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3$ be orthonormal axes attached to the body. Then $\dot{\mathbf{e}}_a = \boldsymbol{\omega}\times\mathbf{e}_a$.

::: theorem Rate of change in a rotating frame {#thm-rotating}
Let $\mathbf{A}(t) = \sum_a A_a(t)\,\mathbf{e}_a(t)$ be any vector, written in components along axes that rotate with angular velocity $\boldsymbol{\omega}$. Then

$$
\left(\deriv{\mathbf{A}}{t}\right)_{\mathrm{space}} = \left(\deriv{\mathbf{A}}{t}\right)_{\mathrm{body}} + \boldsymbol{\omega}\times\mathbf{A},
$$ {#eq-rotating}

where $(\dd\mathbf{A}/\dd t)_{\mathrm{body}} = \sum_a\dot A_a\,\mathbf{e}_a$ is the rate of change seen by an observer rotating with the axes.
:::

::: proof
By the product rule,

$$
\deriv{\mathbf{A}}{t} = \sum_a\dot A_a\,\mathbf{e}_a + \sum_a A_a\,\dot{\mathbf{e}}_a = \left(\deriv{\mathbf{A}}{t}\right)_{\mathrm{body}} + \sum_a A_a\,\boldsymbol{\omega}\times\mathbf{e}_a,
$$

and the last sum is $\boldsymbol{\omega}\times\mathbf{A}$ by linearity of the cross product.
:::

Applied twice to the position of a particle, [[#eq-rotating]] produces the Coriolis and centrifugal accelerations of a rotating frame. Here we apply it once, to angular momentum.

## The inertia tensor {#inertia}

Treat the body as a collection of particles of masses $m_\alpha$ at positions $\mathbf{r}_\alpha$ relative to $O$; for a continuous body, sums become integrals over the mass density. The angular momentum about $O$ is

$$
\mathbf{L} = \sum_\alpha m_\alpha\,\mathbf{r}_\alpha\times(\boldsymbol{\omega}\times\mathbf{r}_\alpha) = \sum_\alpha m_\alpha\bigl[r_\alpha^2\boldsymbol{\omega} - (\mathbf{r}_\alpha\cdot\boldsymbol{\omega})\mathbf{r}_\alpha\bigr],
$$

using the vector triple product. This is linear in $\boldsymbol{\omega}$, so it is a matrix times $\boldsymbol{\omega}$.

::: definition Inertia tensor {#def-inertia-tensor}
The **inertia tensor** of a body about the point $O$ is the $3\times 3$ matrix with components

$$
I_{ij} = \sum_\alpha m_\alpha\bigl(r_\alpha^2\delta_{ij} - x_{\alpha i}x_{\alpha j}\bigr),
$$ {#eq-inertia}

where $x_{\alpha i}$ are the Cartesian components of $\mathbf{r}_\alpha$. The diagonal elements, such as $I_{xx} = \sum m(y^2 + z^2)$, are the **moments of inertia** about the coordinate axes; the off-diagonal elements, such as $I_{xy} = -\sum mxy$, are the **products of inertia**.
:::

With this definition,

$$
\mathbf{L} = I\boldsymbol{\omega}, \qquad T = \tfrac12\sum_\alpha m_\alpha(\boldsymbol{\omega}\times\mathbf{r}_\alpha)^2 = \tfrac12\boldsymbol{\omega}\cdot I\boldsymbol{\omega} = \tfrac12\boldsymbol{\omega}\cdot\mathbf{L}.
$$ {#eq-L-T}

The second formula follows from $(\boldsymbol{\omega}\times\mathbf{r})\cdot(\boldsymbol{\omega}\times\mathbf{r}) = \boldsymbol{\omega}\cdot[\mathbf{r}\times(\boldsymbol{\omega}\times\mathbf{r})]$, a cyclic permutation of the triple product. For rotation about a fixed axis $\hat{\mathbf{n}}$, $T = \frac12 I_n\omega^2$ with $I_n = \hat{\mathbf{n}}\cdot I\hat{\mathbf{n}} = \sum m\rho^2$, the familiar moment of inertia about that axis, $\rho$ being the distance from the axis.

The matrix $I$ is real and symmetric. It is also positive semi-definite, since $\boldsymbol{\omega}\cdot I\boldsymbol{\omega} = 2T \ge 0$, and positive definite unless all the mass lies on a line through $O$.

::: theorem Parallel-axis theorem {#thm-parallel-axis}
Let $I^{\mathrm{cm}}$ be the inertia tensor about the centre of mass, and let $\mathbf{d}$ be the position of the centre of mass relative to a point $O$. For a body of total mass $M$, the inertia tensor about $O$ is

$$
I_{ij}^{O} = I_{ij}^{\mathrm{cm}} + M\bigl(d^2\delta_{ij} - d_id_j\bigr).
$$ {#eq-parallel}
:::

::: proof
Write $\mathbf{r}_\alpha = \mathbf{d} + \mathbf{s}_\alpha$, where $\mathbf{s}_\alpha$ is measured from the centre of mass, so that $\sum_\alpha m_\alpha\mathbf{s}_\alpha = 0$. Substitute into [[#eq-inertia]]:

$$
I^O_{ij} = \sum_\alpha m_\alpha\bigl[(d^2 + 2\mathbf{d}\cdot\mathbf{s}_\alpha + s_\alpha^2)\delta_{ij} - (d_i + s_{\alpha i})(d_j + s_{\alpha j})\bigr].
$$

Every term linear in $\mathbf{s}_\alpha$ sums to zero. The terms quadratic in $\mathbf{s}$ give $I^{\mathrm{cm}}_{ij}$, and those with no $\mathbf{s}$ give $M(d^2\delta_{ij} - d_id_j)$.
:::

The extra term is the inertia tensor of a point mass $M$ at the centre of mass. For an axis $\hat{\mathbf{n}}$ it gives the familiar $I_n = I_n^{\mathrm{cm}} + Md_\perp^2$, with $d_\perp$ the distance between the parallel axes.

### Principal axes

Because $I$ is real and symmetric, the spectral theorem ([see the Maths Atlas](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)) guarantees three real eigenvalues and an orthonormal basis of eigenvectors.

::: definition Principal axes and moments {#def-principal}
The eigenvectors $\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3$ of the inertia tensor about $O$, chosen orthonormal, are the **principal axes** of the body at $O$, and the eigenvalues $I_1, I_2, I_3$ are the **principal moments of inertia**. In principal axes,

$$
I = \begin{pmatrix} I_1 & 0 & 0\\ 0 & I_2 & 0\\ 0 & 0 & I_3\end{pmatrix}, \qquad \mathbf{L} = (I_1\omega_1, I_2\omega_2, I_3\omega_3), \qquad T = \tfrac12\bigl(I_1\omega_1^2 + I_2\omega_2^2 + I_3\omega_3^2\bigr).
$$
:::

$\mathbf{L}$ is parallel to $\boldsymbol{\omega}$ exactly when $\boldsymbol{\omega}$ lies along a principal axis (or in a plane of degenerate eigenvalues). A body with $I_1 = I_2 \neq I_3$ is a **symmetric top**; one with $I_1 = I_2 = I_3$ is a **spherical top**, for which every axis is principal. Symmetry often finds the principal axes without any calculation: an axis of rotational symmetry, or the normal to a plane of reflection symmetry, is a principal axis.

::: example The inertia tensor of a cube about a corner {#ex-cube}
A uniform solid cube of mass $M$ and side $a$ has one corner at the origin and edges along the positive coordinate axes. Find its inertia tensor about the corner and its principal moments there.
::: solution
The density is $M/a^3$. The moment about the $x$-axis is

$$
I_{xx} = \frac{M}{a^3}\int_0^a\!\!\int_0^a\!\!\int_0^a (y^2 + z^2)\,\dd x\,\dd y\,\dd z = \frac{M}{a^3}\left(a\cdot\frac{a^3}{3}\cdot a + a\cdot a\cdot\frac{a^3}{3}\right) = \frac23 Ma^2,
$$

and by symmetry $I_{yy} = I_{zz} = \frac23 Ma^2$. The product of inertia is

$$
I_{xy} = -\frac{M}{a^3}\int_0^a\!\!\int_0^a\!\!\int_0^a xy\,\dd x\,\dd y\,\dd z = -\frac{M}{a^3}\cdot\frac{a^2}{2}\cdot\frac{a^2}{2}\cdot a = -\frac14 Ma^2,
$$

and likewise for $I_{yz}$ and $I_{xz}$. So

$$
I = Ma^2\begin{pmatrix} 2/3 & -1/4 & -1/4\\ -1/4 & 2/3 & -1/4\\ -1/4 & -1/4 & 2/3\end{pmatrix} = Ma^2\left(\frac{11}{12}\,\mathbb{1} - \frac14 J\right),
$$

where $J$ is the matrix of all ones. $J$ has eigenvalue $3$ on $(1, 1, 1)$ and eigenvalue $0$ on the plane perpendicular to it. The principal moments are therefore

$$
I_1 = Ma^2\left(\frac{11}{12} - \frac34\right) = \frac16 Ma^2 \quad\text{along the body diagonal}, \qquad I_2 = I_3 = \frac{11}{12}Ma^2
$$

for every axis perpendicular to the diagonal. The cube about its corner is a symmetric top. Check with [[#thm-parallel-axis]]: about the centre the cube is a spherical top with $I^{\mathrm{cm}} = \frac16 Ma^2$, and the diagonal through the corner passes through the centre, so $d_\perp = 0$ and the moment about the diagonal is $\frac16 Ma^2$, as found. Perpendicular to it, $d_\perp = \frac{\sqrt3}{2}a$ and $\frac16 Ma^2 + \frac34 Ma^2 = \frac{11}{12}Ma^2$.
:::
:::

::: warning Angular momentum is not parallel to angular velocity
The scalar formula $L = I\omega$ from fixed-axis rotation tempts you to assume $\mathbf{L}\parallel\boldsymbol{\omega}$. For the cube about its corner, spinning about the $x$-edge with $\boldsymbol{\omega} = \omega\hat{\mathbf{x}}$, the angular momentum is $Ma^2\omega(2/3, -1/4, -1/4)$, tilted by $\arccos\bigl((2/3)/\sqrt{4/9 + 1/8}\bigr) = 28^\circ$ from the axis of rotation. Only for rotation about a principal axis, or for a spherical top, is the scalar formula correct as a vector statement.
:::

## Euler's equations {#euler}

The rotational form of Newton's second law, about a fixed point or about the centre of mass, is $(\dd\mathbf{L}/\dd t)_{\mathrm{space}} = \boldsymbol{\tau}$. In the space frame the inertia tensor changes as the body turns, which makes $\mathbf{L} = I\boldsymbol{\omega}$ awkward to differentiate. In axes fixed in the body the inertia tensor is constant, so we use [[#thm-rotating]] with the body's own principal axes.

::: theorem Euler's equations {#thm-euler-eqs}
In the principal axes of a rigid body, with $\omega_a$ and $\tau_a$ the components of the angular velocity and of the applied torque along those axes,

$$
\begin{aligned}
I_1\dot\omega_1 - (I_2 - I_3)\,\omega_2\omega_3 &= \tau_1,\\
I_2\dot\omega_2 - (I_3 - I_1)\,\omega_3\omega_1 &= \tau_2,\\
I_3\dot\omega_3 - (I_1 - I_2)\,\omega_1\omega_2 &= \tau_3.
\end{aligned}
$$ {#eq-euler}
:::

::: proof
In body axes, $\mathbf{L} = (I_1\omega_1, I_2\omega_2, I_3\omega_3)$ with constant $I_a$, so $(\dd\mathbf{L}/\dd t)_{\mathrm{body}} = (I_1\dot\omega_1, I_2\dot\omega_2, I_3\dot\omega_3)$. By [[#eq-rotating]],

$$
\boldsymbol{\tau} = \left(\deriv{\mathbf{L}}{t}\right)_{\mathrm{space}} = \left(\deriv{\mathbf{L}}{t}\right)_{\mathrm{body}} + \boldsymbol{\omega}\times\mathbf{L}.
$$

The first component of $\boldsymbol{\omega}\times\mathbf{L}$ is $\omega_2L_3 - \omega_3L_2 = (I_3 - I_2)\omega_2\omega_3$, which gives the first equation. The others follow by cyclic permutation of $(1, 2, 3)$.
:::

Euler's equations are three nonlinear first-order equations for the components of $\boldsymbol{\omega}$ in the body. They do not by themselves say how the body is oriented in space; for that one integrates $\dot{\mathbf{e}}_a = \boldsymbol{\omega}\times\mathbf{e}_a$ as well, or uses Euler angles. But when the torque depends on nothing but $\boldsymbol{\omega}$, in particular when it is zero, they form a closed system.

::: example A rod spun about a tilted axis {#ex-unbalanced}
A uniform thin rod of mass $M = 2.00\,\mathrm{kg}$ and length $\ell = 1.00\,\mathrm{m}$ is welded at its centre to an axle, at angle $\alpha = 30.0^\circ$ to it, and the axle turns at a constant $\omega = 10.0\,\mathrm{rad/s}$ in fixed bearings. Find the torque the bearings must supply.
::: solution
Take principal axes at the centre: $\mathbf{e}_3$ along the rod, with $I_3 = 0$ for a thin rod, and $\mathbf{e}_1$ perpendicular to the rod in the plane containing the rod and the axle, with $I_1 = I_2 = M\ell^2/12$. The angular velocity is fixed in space, $\boldsymbol{\omega} = \omega\hat{\mathbf{z}}$, and since the rod rotates rigidly about it, its body components are constant: $\omega_1 = \omega\sin\alpha$, $\omega_2 = 0$, $\omega_3 = \omega\cos\alpha$, with signs depending on the orientation of $\mathbf{e}_1$. All $\dot\omega_a = 0$, and Euler's equations [[#eq-euler]] give

$$
\tau_1 = 0, \qquad \tau_2 = -(I_3 - I_1)\,\omega_3\omega_1 = \frac{M\ell^2}{12}\,\omega^2\sin\alpha\cos\alpha, \qquad \tau_3 = 0.
$$

The torque is along $\mathbf{e}_2$, perpendicular to both the rod and the axle, and rotates with the rod. Its magnitude is

$$
\tau = \frac{(2.00)(1.00)^2}{12}(10.0)^2\sin 30.0^\circ\cos 30.0^\circ = (16.67)(0.4330) = 7.22\,\mathrm{N\,m}.
$$

Physically, $\mathbf{L} = I_1\omega_1\mathbf{e}_1$ is not along the axle; it sweeps round a cone at rate $\omega$, and a torque $\boldsymbol{\omega}\times\mathbf{L}$ is needed to swing it. The bearings feel a rotating couple, which is the vibration of an unbalanced car wheel. Balancing a wheel means adding small masses so that the axle becomes a principal axis, and then the torque vanishes.
:::
:::

## The free symmetric top {#symmetric-top}

With no torque, Euler's equations conserve the kinetic energy and the magnitude of the angular momentum, as you can check by differentiating ([[#exr-invariants]]):

$$
2T = I_1\omega_1^2 + I_2\omega_2^2 + I_3\omega_3^2, \qquad L^2 = I_1^2\omega_1^2 + I_2^2\omega_2^2 + I_3^2\omega_3^2.
$$ {#eq-invariants}

In space, of course, the whole vector $\mathbf{L}$ is constant. For a symmetric top, $I_1 = I_2$, the equations can be solved in elementary functions.

::: theorem Torque-free precession {#thm-precession}
Let a symmetric top with $I_1 = I_2$ and symmetry axis $\mathbf{e}_3$ move freely. Then $\omega_3$ is constant, and in the body frame the component of $\boldsymbol{\omega}$ perpendicular to $\mathbf{e}_3$ rotates about $\mathbf{e}_3$ with angular velocity

$$
\Omega_b = \frac{I_3 - I_1}{I_1}\,\omega_3.
$$ {#eq-body-precession}

In the space frame the symmetry axis $\mathbf{e}_3$ precesses about the fixed vector $\mathbf{L}$ with angular velocity $\Omega_s = L/I_1$, and $\mathbf{e}_3$, $\boldsymbol{\omega}$ and $\mathbf{L}$ always lie in one plane.
:::

::: proof
With $\boldsymbol{\tau} = 0$ and $I_1 = I_2$, the third Euler equation is $I_3\dot\omega_3 = 0$, so $\omega_3$ is constant. The first two become

$$
\dot\omega_1 = -\Omega_b\,\omega_2, \qquad \dot\omega_2 = \Omega_b\,\omega_1,
$$

with $\Omega_b$ as in [[#eq-body-precession]]. Their solution is $\omega_1 + i\omega_2 = \omega_\perp e^{i(\Omega_bt + \delta)}$: uniform rotation of $(\omega_1, \omega_2)$ at rate $\Omega_b$, with constant length $\omega_\perp$.

For the space-frame motion, write $\mathbf{L} = I_1(\omega_1\mathbf{e}_1 + \omega_2\mathbf{e}_2) + I_3\omega_3\mathbf{e}_3 = I_1\boldsymbol{\omega} + (I_3 - I_1)\omega_3\mathbf{e}_3$. This shows that $\mathbf{L}$, $\boldsymbol{\omega}$ and $\mathbf{e}_3$ are coplanar, and gives

$$
\boldsymbol{\omega} = \frac{\mathbf{L}}{I_1} - \frac{I_3 - I_1}{I_1}\,\omega_3\,\mathbf{e}_3.
$$

The symmetry axis is fixed in the body, so $\dot{\mathbf{e}}_3 = \boldsymbol{\omega}\times\mathbf{e}_3 = (\mathbf{L}/I_1)\times\mathbf{e}_3$, because the second term of $\boldsymbol{\omega}$ is parallel to $\mathbf{e}_3$. With $\mathbf{L}$ constant this is uniform rotation of $\mathbf{e}_3$ about $\mathbf{L}$ at angular velocity $L/I_1$.
:::

A **prolate** top, like a rugby ball or a pencil, has $I_3 < I_1$, so $\Omega_b$ is opposite to $\omega_3$. An **oblate** top, like a plate or the Earth, has $I_3 > I_1$.

::: example The wobbling plate {#ex-plate}
A thin uniform disc is thrown spinning with angular velocity nearly along its symmetry axis, with a slight wobble. Show that the wobble, the precession of the symmetry axis about $\mathbf{L}$, is twice as fast as the spin, for small wobble angle.
::: solution
For a thin disc of mass $M$ and radius $R$, $I_3 = \frac12 MR^2$ and, by the perpendicular-axis theorem, $I_1 = I_2 = \frac14 MR^2$. So $I_3 = 2I_1$.

When the wobble angle $\vartheta$ between $\mathbf{e}_3$ and $\mathbf{L}$ is small, $L = I_3\omega_3/\cos\vartheta \approx I_3\omega_3$, and the space-frame precession rate is

$$
\Omega_s = \frac{L}{I_1} \approx \frac{I_3}{I_1}\,\omega_3 = 2\omega_3.
$$

The rate at which the disc turns about its own axis, as seen by an observer following the wobble, is $\omega_3 - \Omega_s\cos\vartheta \approx -\omega_3$, of magnitude $\omega_3$. The wobble is therefore twice as fast as the spin. In *Surely You're Joking, Mr. Feynman!*, Richard Feynman tells how working out this ratio for a plate thrown in the Cornell cafeteria restored his pleasure in physics; he recalled the ratio the other way round, but the equations give two wobbles per spin. The body-frame rate [[#eq-body-precession]] is $\Omega_b = (2 - 1)\omega_3 = \omega_3$, and the three rates are tied together by $\Omega_s\cos\vartheta - \Omega_b = (I_3/I_1 - (I_3 - I_1)/I_1)\,\omega_3 = \omega_3$, exactly, for any wobble angle.
:::
:::

::: example The Earth's free wobble {#ex-chandler}
The Earth is an oblate symmetric top with $(C - A)/A = 0.00327$, where $C$ is the polar and $A$ the equatorial moment of inertia. If the rotation axis is slightly displaced from the figure axis, how long does it take, according to the rigid-body theory, for the rotation axis to circle the figure axis once?
::: solution
The relevant rate is the body-frame precession [[#eq-body-precession]], because the observer, standing on the Earth, sees the rotation axis move relative to the figure axis (the geographic pole):

$$
\Omega_b = \frac{C - A}{A}\,\omega_3, \qquad T_b = \frac{2\pi}{\Omega_b} = \frac{A}{C - A}\cdot\frac{2\pi}{\omega_3} = \frac{1}{0.00327}\ \text{sidereal days} = 306\ \text{days}.
$$

This is Euler's prediction of about ten months. When Seth Chandler searched old latitude observations in 1891 he found a wobble with a period of about $433$ days. The discrepancy is real physics: the Earth is not rigid. Its mantle yields elastically and its oceans and core respond to the wobble, which lengthens the period. The amplitude of the **Chandler wobble** is a few metres at the pole, and it would damp out in decades if it were not continually re-excited, probably by fluctuations of ocean-bottom pressure and atmospheric mass.
:::
:::

## Stability of rotation: the tennis-racket theorem {#stability}

Return to the book. Label the principal axes so that $I_1 < I_2 < I_3$, all distinct. Each axis allows steady rotation: $\boldsymbol{\omega} = \omega\mathbf{e}_a$ makes every product term in [[#eq-euler]] vanish. The question is what happens after a small disturbance.

::: theorem The intermediate-axis theorem {#thm-tennis}
For a free rigid body with $I_1 < I_2 < I_3$, steady rotation about the axis of smallest or largest moment is linearly stable: small disturbances oscillate. Steady rotation about the intermediate axis $\mathbf{e}_2$ is unstable: small disturbances grow exponentially at the rate

$$
\lambda = \omega\sqrt{\frac{(I_2 - I_1)(I_3 - I_2)}{I_1I_3}}.
$$ {#eq-tennis-rate}
:::

::: proof
Consider rotation about $\mathbf{e}_2$ with $\omega_2 \approx \omega$ and small $\omega_1$, $\omega_3$. The second Euler equation gives $I_2\dot\omega_2 = (I_3 - I_1)\omega_3\omega_1$, which is of second order in small quantities, so to first order $\omega_2 = \omega$ is constant. The other two equations, linearised, are

$$
I_1\dot\omega_1 = (I_2 - I_3)\,\omega\,\omega_3, \qquad I_3\dot\omega_3 = (I_1 - I_2)\,\omega\,\omega_1.
$$

Differentiate the first and substitute the second:

$$
\ddot\omega_1 = \frac{(I_2 - I_3)(I_1 - I_2)}{I_1I_3}\,\omega^2\,\omega_1 = \lambda^2\omega_1,
$$

with $\lambda^2 = \omega^2(I_2 - I_1)(I_3 - I_2)/(I_1I_3) > 0$. The solutions are combinations of $e^{\lambda t}$ and $e^{-\lambda t}$, and a generic disturbance contains the growing one.

For rotation about $\mathbf{e}_1$ the same calculation, with indices permuted, gives $\ddot\omega_2 = \omega^2\frac{(I_3 - I_1)(I_1 - I_2)}{I_2I_3}\omega_2$. The coefficient is negative, since $I_1 - I_2 < 0 < I_3 - I_1$, so $\omega_2$ oscillates with angular frequency $\omega\sqrt{(I_3 - I_1)(I_2 - I_1)/(I_2I_3)}$. For rotation about $\mathbf{e}_3$ the coefficient is $\omega^2(I_1 - I_3)(I_3 - I_2)/(I_1I_2) < 0$, again stable.
:::

Linear stability only says that small disturbances stay small to first order. For the axes of extreme moment it is confirmed exactly by the conservation laws, as the intuition box below explains. For the intermediate axis the growth stops when the disturbance is no longer small, and the body flips over: $\omega_2$ reverses sign, then reverses back, periodically.

::: widget plot
f: (x-b)*(a-x)/(a*b)
x: 0, 4
y: -1.5, 0.5
sliders: a=1:0.5:2:0.05; b=3:2.2:4:0.05
caption: Spin about an axis with moment $x$, the other two principal moments being $a$ and $b$. The curve is $\lambda^2/\omega^2$ from [[#eq-tennis-rate]]: where it is positive, between $a$ and $b$, the spin is unstable and disturbances grow like $e^{\lambda t}$; where it is negative, small disturbances oscillate with angular frequency $\omega\sqrt{-(\text{value})}$. Only the intermediate moment lands in the unstable band. Move $a$ and $b$ together and watch the band shrink: a nearly symmetric body tumbles only slowly.
:::

The nonlinear motion is easily computed. The listing integrates Euler's equations with the classical fourth-order Runge–Kutta method ([see the Maths Atlas](/learn/maths/lesson.php?c=numerical-analysis&l=numerical-odes)) for a body with $I = (1, 2, 3)$, started close to each principal axis with $\abs{\boldsymbol{\omega}} \approx 1$, and reports when the large component changes sign.

```python
import math
I1, I2, I3 = 1.0, 2.0, 3.0

def f(w):
    w1, w2, w3 = w
    return [(I2 - I3) * w2 * w3 / I1,
            (I3 - I1) * w3 * w1 / I2,
            (I1 - I2) * w1 * w2 / I3]

def rk4(w, h):
    k1 = f(w)
    k2 = f([w[i] + h/2 * k1[i] for i in range(3)])
    k3 = f([w[i] + h/2 * k2[i] for i in range(3)])
    k4 = f([w[i] + h * k3[i] for i in range(3)])
    return [w[i] + h/6 * (k1[i] + 2*k2[i] + 2*k3[i] + k4[i]) for i in range(3)]

def invariants(w):
    E = 0.5 * (I1*w[0]**2 + I2*w[1]**2 + I3*w[2]**2)
    L2 = (I1*w[0])**2 + (I2*w[1])**2 + (I3*w[2])**2
    return E, L2

for start in ([0.01, 1.0, 0.01], [1.0, 0.01, 0.01], [0.01, 0.01, 1.0]):
    w, h, t = start[:], 0.001, 0.0
    E0, L0 = invariants(w)
    flips, sign = [], 1
    axis = start.index(max(start))
    big = 0.0
    for step in range(60000):        # 60 time units
        w = rk4(w, h); t += h
        big = max(big, max(abs(w[i]) for i in range(3) if i != axis))
        if w[axis] * sign < 0:
            sign = -sign; flips.append(round(t, 2))
    E, L2 = invariants(w)
    print("start", start, "reversals at t =", flips[:3], " max |other components| = %.3f" % big)
    print("   relative drift in E: %.1e, in L^2: %.1e" % (abs(E-E0)/E0, abs(L2-L0)/L0))
print("linear growth rate about axis 2:", math.sqrt((I2-I1)*(I3-I2)/(I1*I3)))
```

Output:

```
start [0.01, 1.0, 0.01] reversals at t = [10.92, 30.47, 50.02]  max |other components| = 1.000
   relative drift in E: 2.5e-14, in L^2: 2.2e-14
start [1.0, 0.01, 0.01] reversals at t = []  max |other components| = 0.020
   relative drift in E: 2.4e-15, in L^2: 2.7e-15
start [0.01, 0.01, 1.0] reversals at t = []  max |other components| = 0.014
   relative drift in E: 1.1e-14, in L^2: 1.1e-14
linear growth rate about axis 2: 0.5773502691896257
```

Started near the intermediate axis, the spin component $\omega_2$ reverses at $t \approx 10.9$ and then every $19.55$ time units: the body flips over and back again periodically. The other components, initially $0.01$, grow to order one. Near the other two axes nothing reverses and the disturbances stay of the size they started. The two invariants [[#eq-invariants]] are conserved to rounding error, which is a check that the integration is accurate. The time before the first flip is set by the growth rate $0.577$: a disturbance of $0.01$ needs about $\ln(100)/0.577 \approx 8$ time units to grow to order one.

::: intuition Poinsot's picture
In the body frame, $\mathbf{L} = (I_1\omega_1, I_2\omega_2, I_3\omega_3)$ must lie on the sphere $L_1^2 + L_2^2 + L_3^2 = L^2$ and, because the energy is $2T = L_1^2/I_1 + L_2^2/I_2 + L_3^2/I_3$, on an ellipsoid as well. The motion follows a curve where the sphere and the ellipsoid intersect. Near the ends of the longest and shortest axes of the ellipsoid these curves are small closed loops around the axis: stable motion. Through the ends of the intermediate axis pass two great curves that cross there, the **separatrices**; a nearby curve is carried all the way round to the opposite end of the axis, which is the flip.
:::

::: quiz
A rectangular box has principal moments about its centre in the ratio $1 : 4 : 5$. Spun about which axis is it unstable?
- [ ] The axis of moment $1$, because it is the easiest to turn about.
- [x] The axis of moment $4$.
- [ ] The axis of moment $5$, because it has the largest kinetic energy for a given angular momentum.
- [ ] None of them, because without torque angular momentum is conserved.
::: solution
By [[#thm-tennis]], rotation about the intermediate moment is unstable. Conservation of $\mathbf{L}$ does not prevent the flip: the body turns over while $\mathbf{L}$ stays fixed in space, and in the body frame $\mathbf{L}$ moves from near $+\mathbf{e}_2$ to near $-\mathbf{e}_2$. For a given $L$, the largest moment has the *smallest* energy $L^2/(2I)$, and with dissipation a body ends up rotating about that axis, which is why the satellite Explorer 1, spinning about its long, minimum-moment axis, went into a tumble soon after its launch in 1958.
:::
:::

::: remark Euler angles and the heavy top
To follow the orientation itself one needs coordinates on the space of rotations. The standard choice is the three **Euler angles** $(\phi, \theta, \psi)$: precession about the space $z$-axis, nutation (tilt) about the new $x$-axis, and spin about the body's symmetry axis. In terms of them, for a symmetric top, $T = \frac12 I_1(\dot\theta^2 + \dot\phi^2\sin^2\theta) + \frac12 I_3(\dot\psi + \dot\phi\cos\theta)^2$. With gravity acting at a distance $h$ along the axis, $V = Mgh\cos\theta$, and the angles $\phi$ and $\psi$ are cyclic. Their conserved momenta reduce the heavy top to a one-dimensional problem in $\theta$, exactly like the effective potential of [[analytical-mechanics/central-forces]]. The resulting nutation and precession are worked out in Goldstein, Poole and Safko, Chapter 5, and in Landau and Lifshitz, §35.
:::

::: history Euler, Poinsot and the wobbling Earth
Leonhard Euler derived the equations [[#eq-euler]] in memoirs for the Berlin Academy in the 1750s and set out the whole theory, including the principal axes, in *Theoria motus corporum solidorum seu rigidorum* (1765). He also predicted that the Earth's rotation axis should wander about its figure axis with a period of about ten months. Louis Poinsot gave the geometrical description of free rotation in *Théorie nouvelle de la rotation des corps* (1834). Seth Carlo Chandler found the Earth's wobble in latitude records in 1891, with a period near 14 months, and Simon Newcomb soon explained the lengthening by the Earth's elasticity. The intermediate-axis instability was known in the nineteenth century as an exercise in Euler's equations; it became famous after Vladimir Dzhanibekov filmed a spinning wing nut flipping aboard Salyut 7 in 1985.
:::

## Where this leads {#leads}

[[analytical-mechanics/small-oscillations]] uses the same mathematics, a symmetric matrix and its eigenvectors, for a different physical question: there the matrices are the kinetic and potential energies of small vibrations. [[analytical-mechanics/hamiltonian]] shows that Euler's equations are Hamilton's equations for the angular momentum components, with Poisson brackets $\{L_1, L_2\} = L_3$. The rigid rotor reappears in [[quantum-1/angular-momentum]], where the energy levels of a symmetric-top molecule are $\hbar^2\ell(\ell + 1)/(2I_1) + \hbar^2 m^2(1/(2I_3) - 1/(2I_1))$, the quantum version of [[#eq-invariants]].

::: summary
- A rigid body's points move with $\mathbf{v} = \boldsymbol{\omega}\times\mathbf{r}$, and any body-fixed vector obeys $(\dd\mathbf{A}/\dd t)_{\mathrm{space}} = (\dd\mathbf{A}/\dd t)_{\mathrm{body}} + \boldsymbol{\omega}\times\mathbf{A}$.
- The inertia tensor $I_{ij} = \sum m(r^2\delta_{ij} - x_ix_j)$ gives $\mathbf{L} = I\boldsymbol{\omega}$ and $T = \frac12\boldsymbol{\omega}\cdot I\boldsymbol{\omega}$; $\mathbf{L}$ is parallel to $\boldsymbol{\omega}$ only along a principal axis.
- The parallel-axis theorem adds $M(d^2\delta_{ij} - d_id_j)$ to the centre-of-mass tensor.
- $I$ is real symmetric, so it has three orthogonal principal axes with real principal moments; symmetry axes and normals to symmetry planes are principal.
- Euler's equations in principal axes: $I_1\dot\omega_1 - (I_2 - I_3)\omega_2\omega_3 = \tau_1$ and cyclic permutations. Free motion conserves $T$ and $L^2$.
- A free symmetric top precesses: in the body at rate $(I_3 - I_1)\omega_3/I_1$, in space at rate $L/I_1$. The Earth's rigid-body wobble period would be $A/(C - A) \approx 306$ days; elasticity makes it 433.
- Rotation about the axes of largest and smallest moment is stable; about the intermediate axis it is unstable with growth rate $\omega\sqrt{(I_2 - I_1)(I_3 - I_2)/(I_1I_3)}$, and the body flips periodically.
:::

## Exercises {#exercises}

::: exercise A rod about its end {level=1 check="4"}
A uniform thin rod of mass $3.00\,\mathrm{kg}$ and length $2.00\,\mathrm{m}$ lies along the $z$-axis with its centre at the origin. Write down its inertia tensor about the centre, then use [[#thm-parallel-axis]] to find the moment of inertia about a perpendicular axis through one end, in $\mathrm{kg\,m^2}$.
::: solution
For a thin rod along $z$ the mass has $x = y = 0$, so $I_{zz} = 0$, all products vanish, and $I_{xx} = I_{yy} = \int z^2\,\dd m = M\ell^2/12$. With $M = 3.00$ and $\ell = 2.00$, $I^{\mathrm{cm}} = \mathrm{diag}(1, 1, 0)\,\mathrm{kg\,m^2}$.

Move to the end, $\mathbf{d} = (0, 0, \ell/2) = (0, 0, 1.00)$. By [[#eq-parallel]], $I^O_{xx} = 1 + M(d^2 - 0) = 1 + 3.00 = 4.00\,\mathrm{kg\,m^2}$, which is $M\ell^2/3$. The $zz$ component is unchanged, $0 + M(d^2 - d^2) = 0$: moving along the axis does not change the moment about it.
:::
:::

::: exercise A rectangular plate {level=1 check="0.025"}
A thin uniform rectangular plate of mass $1.20\,\mathrm{kg}$ has sides $0.300\,\mathrm{m}$ and $0.400\,\mathrm{m}$. Find its principal moments of inertia about its centre, and give the largest in $\mathrm{kg\,m^2}$.
::: solution
Put the plate in the $xy$-plane with the sides $a = 0.300\,\mathrm{m}$ along $x$ and $b = 0.400\,\mathrm{m}$ along $y$. The planes $x = 0$ and $y = 0$ and the plate's own plane are planes of reflection symmetry, so the coordinate axes are principal. Integrating,

$$
I_x = \int y^2\,\dd m = \frac{Mb^2}{12} = 0.0160, \qquad I_y = \int x^2\,\dd m = \frac{Ma^2}{12} = 0.0090,
$$

and, since $z = 0$ throughout, $I_z = \int(x^2 + y^2)\,\dd m = I_x + I_y = 0.0250\,\mathrm{kg\,m^2}$, the perpendicular-axis theorem. The largest moment, about the normal, is $0.025\,\mathrm{kg\,m^2}$, and the intermediate one is about the axis parallel to the longer side. That is the axis about which the plate tumbles.
:::
:::

::: exercise Wobble and spin {level=1 check="2"}
For a free symmetric top with $I_3 = 2I_1$, find the ratio $\Omega_s/\omega_3$ of the space precession rate to the spin component, for a very small wobble angle.
::: solution
From [[#thm-precession]], $\Omega_s = L/I_1$, and for a small wobble $L \approx I_3\omega_3$. So $\Omega_s/\omega_3 \approx I_3/I_1 = 2$. This is the wobbling plate of [[#ex-plate]]. For a sphere, $I_3 = I_1$ and the ratio is $1$; a symmetric top always has $I_3 \le 2I_1$ by the perpendicular-axis inequality, so the plate is the extreme case.
:::
:::

::: exercise The Euler period {level=2 check="1/0.00327"}
Show from [[#eq-body-precession]] that the body-frame wobble period of a nearly rigid oblate planet is $A/(C - A)$ rotation periods, and evaluate it in days for the Earth with $(C - A)/A = 0.00327$. Mars has $(C - A)/A \approx 0.0054$ and a rotation period of $1.026$ days; what is its Euler period?
::: solution
$T_b = 2\pi/\Omega_b = (A/(C - A))(2\pi/\omega_3)$, and $2\pi/\omega_3$ is the rotation period, one sidereal day for the Earth. So $T_b = 1/0.00327 = 306$ sidereal days, about $305$ solar days. For Mars, $T_b \approx 1.026/0.0054 = 190$ days. The observed Martian wobble period is about $207$ days, longer again because Mars too is not perfectly rigid.
:::
:::

::: exercise Bearing torque {level=2 check="6"}
A thin uniform rod of mass $1.00\,\mathrm{kg}$ and length $0.600\,\mathrm{m}$ is fixed at its centre to an axle at $45.0^\circ$ and turned at $20.0\,\mathrm{rad/s}$. Find the magnitude of the torque in $\mathrm{N\,m}$ that the bearings must supply.
::: solution
From [[#ex-unbalanced]], $\tau = (M\ell^2/12)\,\omega^2\sin\alpha\cos\alpha$. Here $M\ell^2/12 = (1.00)(0.360)/12 = 0.0300\,\mathrm{kg\,m^2}$, $\omega^2 = 400\,\mathrm{s^{-2}}$ and $\sin 45^\circ\cos 45^\circ = 0.500$, so $\tau = (0.0300)(400)(0.500) = 6.00\,\mathrm{N\,m}$. At $45^\circ$ the torque for given $\omega$ is the largest possible; it vanishes at $0^\circ$ and $90^\circ$, where the axle is a principal axis.
:::
:::

::: exercise How long before the racket flips? {level=2 check="ln(100)/sqrt(1/3)"}
A body with principal moments in the ratio $1 : 2 : 3$ is spun at $\omega = 1.00\,\mathrm{rad/s}$ about the intermediate axis, with a disturbance of $1\%$ in the other components. Using the linear growth rate, estimate the time for the disturbance to grow to the size of $\omega$, and compare with the first reversal in the numerical output.
::: solution
By [[#eq-tennis-rate]], $\lambda = (1.00)\sqrt{(2 - 1)(3 - 2)/(1\cdot 3)} = \sqrt{1/3} = 0.577\,\mathrm{s^{-1}}$. The disturbance grows like $e^{\lambda t}$, so growing from $0.01$ to $1$ takes $t = \ln(100)/\lambda = 4.605/0.577 = 7.98\,\mathrm{s}$. The first reversal in the listing comes at $t = 10.9\,\mathrm{s}$: the estimate gives the right scale, and the remaining time is spent in the nonlinear stage, when the flip itself happens and the linear formula no longer applies. Halving the initial disturbance adds only $\ln 2/\lambda = 1.2\,\mathrm{s}$, which is why even a carefully launched racket flips.
:::
:::

::: exercise Conservation laws from Euler's equations {level=3 #exr-invariants}
Prove directly from the torque-free Euler equations that $2T = \sum_a I_a\omega_a^2$ and $L^2 = \sum_a I_a^2\omega_a^2$ are constant. Then use the two conservation laws to show that rotation about $\mathbf{e}_1$, the axis of least moment, is stable in the following sense: if $\omega_2$ and $\omega_3$ are small initially, they remain small for all time.
::: hint
For stability, form $L^2 - 2TI_1$ and show it is a sum of non-negative terms in $\omega_2^2$ and $\omega_3^2$.
:::
::: solution
Multiply the three equations $I_a\dot\omega_a = (I_b - I_c)\omega_b\omega_c$ (with $(a, b, c)$ cyclic) by $\omega_a$ and add:

$$
\deriv{}{t}\left(\tfrac12\sum_a I_a\omega_a^2\right) = \omega_1\omega_2\omega_3\bigl[(I_2 - I_3) + (I_3 - I_1) + (I_1 - I_2)\bigr] = 0.
$$

Multiply instead by $I_a\omega_a$ and add:

$$
\deriv{}{t}\left(\tfrac12\sum_a I_a^2\omega_a^2\right) = \omega_1\omega_2\omega_3\bigl[I_1(I_2 - I_3) + I_2(I_3 - I_1) + I_3(I_1 - I_2)\bigr] = 0,
$$

since the bracket expands to zero.

For stability about $\mathbf{e}_1$, consider the conserved combination

$$
L^2 - 2TI_1 = I_2(I_2 - I_1)\,\omega_2^2 + I_3(I_3 - I_1)\,\omega_3^2.
$$

Both coefficients are positive when $I_1$ is the smallest moment. The combination is fixed by the initial values, so if $\omega_2$ and $\omega_3$ start small, of order $\eps$, the combination is of order $\eps^2$ forever, and each of $\omega_2^2$ and $\omega_3^2$ is bounded by it divided by a positive coefficient. They stay of order $\eps$. The same argument with $2TI_3 - L^2 = I_1(I_3 - I_1)\omega_1^2 + I_2(I_3 - I_2)\omega_2^2$ proves stability about $\mathbf{e}_3$. For $\mathbf{e}_2$ the analogous combination $L^2 - 2TI_2 = I_1(I_1 - I_2)\omega_1^2 + I_3(I_3 - I_2)\omega_3^2$ has coefficients of opposite signs, so it can stay small while $\omega_1$ and $\omega_3$ both become large: no bound follows, consistent with the instability.
:::
:::

::: exercise Symmetry makes a symmetric top {level=3}
A rigid body is unchanged by rotation through $2\pi/n$ about an axis $\mathbf{e}_3$ through $O$, for some integer $n \ge 3$. Prove that $\mathbf{e}_3$ is a principal axis at $O$ and that the two principal moments perpendicular to it are equal. Deduce that a cube, a regular tetrahedron and a uniform equilateral triangular plate are symmetric tops about suitable points, and that the cube about its centre is a spherical top.
::: hint
If $R$ is the rotation matrix, symmetry of the mass distribution means $RIR\T = I$. Look at how $R$ acts on the $2\times 2$ block of $I$ perpendicular to $\mathbf{e}_3$ and on the off-diagonal column.
:::
::: solution
Under a rotation $R$ of the body, the inertia tensor becomes $RIR\T$, because $I_{ij}$ is built from $\delta_{ij}$ and products $x_ix_j$. If $R$ maps the body to itself, then $RIR\T = I$, so $I$ commutes with $R$.

Use axes with $\mathbf{e}_3$ along the symmetry axis. Then $R$ leaves $\mathbf{e}_3$ fixed and rotates the perpendicular plane by $\alpha = 2\pi/n$. From $RI = IR$, apply both sides to $\mathbf{e}_3$: $R(I\mathbf{e}_3) = I\mathbf{e}_3$, so $I\mathbf{e}_3$ is fixed by $R$. A rotation by $\alpha \neq 0, 2\pi$ fixes only multiples of $\mathbf{e}_3$, so $I\mathbf{e}_3 = I_3\mathbf{e}_3$: $\mathbf{e}_3$ is a principal axis.

Then $I$ maps the perpendicular plane to itself, by symmetry of $I$, and on that plane it is a symmetric $2\times 2$ matrix $B$ commuting with the rotation $R_\alpha$. Write $B = \begin{pmatrix} p & q\\ q & s\end{pmatrix}$. Because $R_\alpha$ commutes with $B$, it maps each eigenvector of $B$ to an eigenvector with the same eigenvalue. If $B$ had two distinct eigenvalues, its eigenvectors would be two perpendicular lines, and $R_\alpha$ would have to map each line to itself, which requires $\alpha$ to be a multiple of $\pi$. For $n \ge 3$, $\alpha = 2\pi/n$ is not, so $B$ has a repeated eigenvalue, $B = I_1\mathbb{1}$, and $I_1 = I_2$.

A cube about its centre has threefold axes along the body diagonals and fourfold axes through face centres, so $I_1 = I_2$ for several different choices of $\mathbf{e}_3$, which forces all three moments equal: a spherical top. About a corner, only the diagonal through that corner remains a threefold axis, giving the symmetric top of [[#ex-cube]]. A regular tetrahedron has threefold axes through each vertex, and is a spherical top about its centre; an equilateral triangular plate has a threefold axis through its centre normal to the plate, so it is a symmetric top with $I_1 = I_2 = \frac12 I_3$.
:::
:::
