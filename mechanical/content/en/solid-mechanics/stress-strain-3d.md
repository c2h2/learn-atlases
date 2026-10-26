Cut an imaginary plane through a loaded crankshaft, a turbine blade root or the wall of a pressure vessel, and the material on one side of the cut pulls and pushes on the material on the other side. In [[mechanics-of-materials]] that action was simple: a bar carried a uniform $\sigma = N/A$, a shaft a shear stress $\tau = Tr/J$, a beam a linear $\sigma = -My/I$, and the plane stress element of [[mechanics-of-materials/stress-transformation]] had three components and a Mohr's circle. Real parts are not so obliging. At the root of a fillet, at a bolt hole or under a contact load, every one of the six independent stress components can be non-zero at once, and the plane on which the material is most severely loaded is not one you would have guessed.

This chapter builds the general language that the rest of the course uses. Stress at a point is a **tensor** — a rule that turns the orientation of a plane into the force per unit area acting on it — and the whole content of that rule is captured by nine numbers, of which six are independent. Those numbers cannot vary arbitrarily from point to point: the **equilibrium equations** tie their derivatives together. Deformation at a point is another tensor, the **small-strain tensor**, derived from the displacement field; its six components cannot vary arbitrarily either, because they come from only three displacements — that constraint is **compatibility**. Between them, equilibrium and compatibility are the two halves of every problem in solid mechanics; the third half, the material law that connects them, is the subject of [[solid-mechanics/linear-elasticity]].

Throughout, $x, y, z$ (or $x_1, x_2, x_3$) are Cartesian coordinates, tensile normal stress is positive, and the sign of a shear stress follows the face-and-direction rule stated below.

## Traction and the stress tensor

Picture a small plane of area $\Delta A$ through a point $P$ inside the body, with unit normal $\mathbf{n}$ pointing out of the material on which we want the force. The material on the side into which $\mathbf{n}$ points exerts a force $\Delta\mathbf{F}$ on it. As the patch shrinks, the ratio tends to a limit.

::: definition Traction vector {#def-traction}
The **traction** (or stress vector) at a point $P$ on a plane with unit normal $\mathbf{n}$ is
$$
\mathbf{t}^{(\mathbf{n})} = \lim_{\Delta A \to 0} \frac{\Delta \mathbf{F}}{\Delta A},
$$
the force per unit area exerted on the material on the negative side of the plane by the material on the positive side (the side into which $\mathbf{n}$ points). Its component along $\mathbf{n}$, $\sigma_n = \mathbf{t}\cdot\mathbf{n}$, is the **normal stress** on the plane (positive in tension); the remaining part, of magnitude $\tau_n = \sqrt{\lvert\mathbf{t}\rvert^2 - \sigma_n^2}$, is the **shear stress** on the plane. By Newton's third law $\mathbf{t}^{(-\mathbf{n})} = -\mathbf{t}^{(\mathbf{n})}$.
:::

The traction depends on the plane: through the same point, a plane normal to the axis of a bar in tension carries $\sigma = N/A$ and no shear, while a plane at $45^\circ$ carries $N/2A$ of each. So it looks as if we would need a table of tractions for every one of the infinitely many planes through each point. Cauchy's discovery is that we do not.

::: definition Stress components {#def-stress-components}
Let $\mathbf{t}^{(x)}, \mathbf{t}^{(y)}, \mathbf{t}^{(z)}$ be the tractions on the three planes through $P$ whose outward normals are $\mathbf{i}, \mathbf{j}, \mathbf{k}$. Their components are the **stress components** $\sigma_{ij}$: the first index names the plane (by its normal), the second the direction of the force component,
$$
\mathbf{t}^{(x)} = \sigma_{xx}\mathbf{i} + \sigma_{xy}\mathbf{j} + \sigma_{xz}\mathbf{k}, \quad \text{and similarly for } y, z.
$$
We also write $\sigma_x = \sigma_{xx}$ and $\tau_{xy} = \sigma_{xy}$. A component is **positive** when it acts in the positive coordinate direction on a face whose outward normal points in a positive coordinate direction (or in the negative direction on a negative face). Arranged as a matrix,
$$
[\boldsymbol{\sigma}] = \begin{bmatrix} \sigma_x & \tau_{xy} & \tau_{xz} \\ \tau_{yx} & \sigma_y & \tau_{yz} \\ \tau_{zx} & \tau_{zy} & \sigma_z \end{bmatrix}.
$$
:::

::: theorem Cauchy's stress theorem {#thm-cauchy}
At any point of a body in equilibrium (or in motion with finite acceleration and body force), the traction on a plane with unit normal $\mathbf{n} = (n_x, n_y, n_z)$ is a linear function of $\mathbf{n}$:
$$
t_i = \sum_{j} \sigma_{ji}\, n_j, \qquad \text{that is}\qquad \mathbf{t} = [\boldsymbol{\sigma}]^{\mathsf T}\mathbf{n} = [\boldsymbol{\sigma}]\,\mathbf{n},
$$
where the last form uses the symmetry $\sigma_{ij} = \sigma_{ji}$ ([[#prop-symmetry]]). The nine components $\sigma_{ij}$ therefore determine the traction on every plane through the point.
:::

::: proof
Isolate a small tetrahedron at $P$: three faces lie on the coordinate planes, with outward normals $-\mathbf{i}, -\mathbf{j}, -\mathbf{k}$ and areas $A_x, A_y, A_z$, and the fourth, slanted face has outward normal $\mathbf{n}$ and area $A$. Projecting the slanted face onto the coordinate planes gives $A_x = n_x A$, $A_y = n_y A$, $A_z = n_z A$ (for a normal with positive components; other octants work the same way with signs absorbed). Let $h$ be the distance from $P$ to the slanted face, so the volume is $V = Ah/3$.

The forces on the tetrahedron are the tractions times areas and the body force $\mathbf{b}$ (per unit volume) times $V$. On the face with outward normal $-\mathbf{i}$ the traction is $\mathbf{t}^{(-x)} = -\mathbf{t}^{(x)}$. Newton's second law with density $\rho$ and acceleration $\mathbf{a}$ reads
$$
\mathbf{t}^{(\mathbf{n})}A - \mathbf{t}^{(x)} n_x A - \mathbf{t}^{(y)} n_y A - \mathbf{t}^{(z)} n_z A + \mathbf{b}\,\frac{Ah}{3} = \rho\,\frac{Ah}{3}\,\mathbf{a}.
$$
Divide by $A$ and let $h \to 0$ (the tractions are evaluated at average points of each face, which all tend to $P$; the body-force and inertia terms vanish because they scale with $h$):
$$
\mathbf{t}^{(\mathbf{n})} = \mathbf{t}^{(x)}n_x + \mathbf{t}^{(y)}n_y + \mathbf{t}^{(z)}n_z .
$$
Taking the $i$-th component and using [[#def-stress-components]], $t_i = \sigma_{xi}n_x + \sigma_{yi}n_y + \sigma_{zi}n_z = \sum_j \sigma_{ji}n_j$. Assumptions: the tractions are continuous near $P$, and $\mathbf{b}$, $\rho\mathbf{a}$ are bounded. Surface forces scale with $h^2$ and volume forces with $h^3$, which is why only the surface forces survive in the limit.
:::

::: proposition Symmetry of the stress tensor {#prop-symmetry}
In the absence of distributed body couples, $\tau_{xy} = \tau_{yx}$, $\tau_{yz} = \tau_{zy}$ and $\tau_{zx} = \tau_{xz}$: the stress matrix is symmetric and has six independent components.
:::

::: proof
Take a small rectangular block $\Delta x \times \Delta y \times \Delta z$ centred at $P$ and sum moments about the $z$-axis through its centre. The shear stress $\tau_{xy}$ on the two $x$-faces (area $\Delta y\,\Delta z$) gives forces $\pm\tau_{xy}\Delta y\Delta z$ in the $\pm y$ directions, a couple of arm $\Delta x$: moment $\tau_{xy}\Delta x\Delta y\Delta z$ anticlockwise. The $\tau_{yx}$ forces on the $y$-faces give a clockwise couple $\tau_{yx}\Delta x\Delta y\Delta z$. Normal stresses and body forces act through the centre to first order, and any difference between the stresses on opposite faces contributes moments of order $\Delta^4$. Angular momentum balance gives
$$
(\tau_{xy} - \tau_{yx})\,\Delta x\,\Delta y\,\Delta z + O(\Delta^4) = I_{zz}\,\alpha_z = O(\Delta^5),
$$
since the mass moment of inertia of the block scales with the fifth power of its size. Dividing by the volume and letting the block shrink gives $\tau_{xy} = \tau_{yx}$; the other two pairs follow in the same way.
:::

Symmetry is what lets us write $\mathbf{t} = [\boldsymbol\sigma]\mathbf{n}$ without worrying about the transpose, and it halves the bookkeeping: six numbers describe the state of stress at a point.

::: example Traction on an oblique plane {#ex-traction}
At a point in a forged bracket the stress components, in MPa, are
$$
[\boldsymbol{\sigma}] = \begin{bmatrix} 80 & 30 & 0 \\ 30 & -40 & 20 \\ 0 & 20 & 60 \end{bmatrix}.
$$
Find the traction, the normal stress and the shear stress on the plane whose normal is parallel to $(1, 2, 2)$.
::: solution
The unit normal is $\mathbf{n} = (1, 2, 2)/3$ because $\sqrt{1 + 4 + 4} = 3$. By Cauchy's theorem
$$
\mathbf{t} = [\boldsymbol\sigma]\mathbf{n} = \frac{1}{3}\begin{bmatrix} 80 + 60 + 0 \\ 30 - 80 + 40 \\ 0 + 40 + 120 \end{bmatrix} = \begin{bmatrix} 46.67 \\ -3.33 \\ 53.33 \end{bmatrix}\ \mathrm{MPa}.
$$
The normal stress is the projection on $\mathbf{n}$:
$$
\sigma_n = \mathbf{t}\cdot\mathbf{n} = \tfrac13(46.67 - 6.67 + 106.67) = 48.89\ \mathrm{MPa}\ \text{(tension)}.
$$
The magnitude of the traction is $\lvert\mathbf{t}\rvert = \sqrt{46.67^2 + 3.33^2 + 53.33^2} = 70.95\ \mathrm{MPa}$, so the shear stress on the plane is
$$
\tau_n = \sqrt{70.95^2 - 48.89^2} = 51.41\ \mathrm{MPa}.
$$
Sanity check: neither $\sigma_n$ nor $\tau_n$ exceeds the largest principal stress, $87.9\ \mathrm{MPa}$, found in [[#ex-principal]]; and the shear stress is below the maximum shear stress $69.2\ \mathrm{MPa}$ found there, as it must be.
:::
:::

## Equilibrium equations

Cauchy's theorem says what happens *at* a point. Equilibrium also constrains how stress changes *between* points: if $\sigma_x$ is larger on the right face of a small block than on the left, something else — a shear stress gradient or a body force — must balance the difference.

::: proposition Equilibrium equations {#prop-equilibrium}
In a body in static equilibrium with body force $\mathbf{b} = (b_x, b_y, b_z)$ per unit volume, the stress field satisfies
$$
\begin{aligned}
\frac{\partial \sigma_x}{\partial x} + \frac{\partial \tau_{yx}}{\partial y} + \frac{\partial \tau_{zx}}{\partial z} + b_x &= 0,\\
\frac{\partial \tau_{xy}}{\partial x} + \frac{\partial \sigma_y}{\partial y} + \frac{\partial \tau_{zy}}{\partial z} + b_y &= 0,\\
\frac{\partial \tau_{xz}}{\partial x} + \frac{\partial \tau_{yz}}{\partial y} + \frac{\partial \sigma_z}{\partial z} + b_z &= 0,
\end{aligned}
$$ {#eq-equilibrium}
or compactly $\sum_j \partial\sigma_{ji}/\partial x_j + b_i = 0$. For a body in motion the right-hand sides become $\rho\,a_x$, $\rho\,a_y$, $\rho\,a_z$. On the boundary, with outward normal $\mathbf{n}$ and prescribed surface traction $\bar{\mathbf{t}}$, the stresses must satisfy $[\boldsymbol\sigma]\mathbf{n} = \bar{\mathbf{t}}$.
:::

::: proof
Consider the block $\Delta x\times\Delta y\times\Delta z$ with its corner at $(x, y, z)$ and add the forces in the $x$-direction. On the face at $x + \Delta x$ the normal stress is $\sigma_x(x + \Delta x) \approx \sigma_x(x) + (\partial\sigma_x/\partial x)\Delta x$, acting in $+x$; on the face at $x$ it is $\sigma_x(x)$, acting in $-x$. Their net force is $(\partial\sigma_x/\partial x)\,\Delta x\,\Delta y\,\Delta z$. The same argument for the $x$-direction shear stresses on the $y$-faces and $z$-faces gives $(\partial\tau_{yx}/\partial y)\,\Delta V$ and $(\partial\tau_{zx}/\partial z)\,\Delta V$, and the body force contributes $b_x\,\Delta V$. Setting the sum to zero and dividing by $\Delta V = \Delta x\Delta y\Delta z$ gives the first equation, exact in the limit of a vanishing block (the Taylor remainders are of higher order). The other two follow by symmetry of the argument. The boundary condition is Cauchy's theorem applied at a surface point.
:::

These are three equations for six unknown stress components: equilibrium alone cannot determine the stress in a body (except in special, statically determinate cases such as a thin-walled vessel). The other three equations come from deformation — compatibility and the material law.

::: example Shear stress in a beam from the bending stress {#ex-beam-equilibrium}
A rectangular cantilever of depth $h$ and width $b$ carries an end load $P$ in the $-y$ direction at $x = 0$, so that $M(x) = -Px$ (sagging positive) and simple beam theory gives $\sigma_x = -My/I = Pxy/I$ with $I = bh^3/12$. Assume $\sigma_y = 0$ and no body force. Use the equilibrium equations to find $\tau_{xy}$, given that the top and bottom faces $y = \pm h/2$ are free of load. Evaluate the maximum for $P = 10\ \mathrm{kN}$, $b = 50\ \mathrm{mm}$, $h = 100\ \mathrm{mm}$.
::: solution
The first equilibrium equation in two dimensions is
$$
\frac{\partial\sigma_x}{\partial x} + \frac{\partial\tau_{xy}}{\partial y} = 0 \quad\Rightarrow\quad \frac{\partial\tau_{xy}}{\partial y} = -\frac{Py}{I} \quad\Rightarrow\quad \tau_{xy} = -\frac{Py^2}{2I} + f(x).
$$
The second, $\partial\tau_{xy}/\partial x + \partial\sigma_y/\partial y = 0$, gives $f'(x) = 0$, so $f$ is a constant $C$. A free surface at $y = \pm h/2$ with normal $\pm\mathbf{j}$ needs $\tau_{xy} = \sigma_y = 0$ there: $C = Ph^2/(8I)$, and
$$
\tau_{xy} = \frac{P}{2I}\left(\frac{h^2}{4} - y^2\right).
$$
This is the parabolic shear distribution of [[mechanics-of-materials/transverse-shear]], recovered without any "$VQ/It$" argument — only from equilibrium. With $I = 50\times100^3/12 = 4.167\times10^{6}\ \mathrm{mm^4}$, the maximum at $y = 0$ is
$$
\tau_{\max} = \frac{Ph^2}{8I} = \frac{10\,000 \times 100^2}{8\times4.167\times10^{6}} = 3.00\ \mathrm{N/mm^2} = 3.00\ \mathrm{MPa}.
$$
Check: $3P/(2bh) = 3\times10\,000/(2\times50\times100) = 3.00\ \mathrm{MPa}$, the familiar result, and integrating $\tau_{xy}$ over the section gives $\int_{-h/2}^{h/2} \tau_{xy}\,b\,dy = P$, the shear force.
:::
:::

## Principal stresses and invariants

Rotating the plane through $P$ changes the split of the traction into normal and shear parts. A plane on which the traction is purely normal, $\mathbf{t} = \sigma\mathbf{n}$, carries no shear at all; it is a **principal plane** and $\sigma$ is a **principal stress**.

::: theorem Principal stresses {#thm-principal}
For a symmetric stress tensor there are three real principal stresses $\sigma_1 \ge \sigma_2 \ge \sigma_3$, the roots of the characteristic equation
$$
\det\bigl([\boldsymbol\sigma] - \sigma\mathbf{I}\bigr) = 0 \quad\Longleftrightarrow\quad \sigma^3 - I_1\sigma^2 + I_2\sigma - I_3 = 0,
$$ {#eq-characteristic}
with the **stress invariants**
$$
\begin{aligned}
I_1 &= \sigma_x + \sigma_y + \sigma_z,\\
I_2 &= \sigma_x\sigma_y + \sigma_y\sigma_z + \sigma_z\sigma_x - \tau_{xy}^2 - \tau_{yz}^2 - \tau_{zx}^2,\\
I_3 &= \det[\boldsymbol\sigma].
\end{aligned}
$$
The corresponding principal directions can be chosen mutually perpendicular. $I_1, I_2, I_3$ have the same values in every Cartesian coordinate system.
:::

::: proof
The condition $[\boldsymbol\sigma]\mathbf{n} = \sigma\mathbf{n}$ with $\mathbf{n} \ne \mathbf{0}$ is an eigenvalue problem; it has non-trivial solutions only if $\det([\boldsymbol\sigma] - \sigma\mathbf{I}) = 0$. Expanding the $3\times3$ determinant gives the cubic with the coefficients shown. The roots of the characteristic polynomial of a matrix do not depend on the basis, so neither do the coefficients $I_1, I_2, I_3$: in a rotated system $[\boldsymbol\sigma'] = \mathbf{Q}[\boldsymbol\sigma]\mathbf{Q}^{\mathsf T}$ with $\mathbf{Q}$ orthogonal, and $\det(\mathbf{Q}[\boldsymbol\sigma]\mathbf{Q}^{\mathsf T} - \sigma\mathbf{I}) = \det(\mathbf{Q}([\boldsymbol\sigma] - \sigma\mathbf{I})\mathbf{Q}^{\mathsf T}) = \det([\boldsymbol\sigma] - \sigma\mathbf{I})$.

Reality: if $[\boldsymbol\sigma]\mathbf{n} = \sigma\mathbf{n}$ with complex $\sigma$ and $\mathbf{n}$, multiply by the conjugate transpose $\bar{\mathbf{n}}^{\mathsf T}$: $\bar{\mathbf{n}}^{\mathsf T}[\boldsymbol\sigma]\mathbf{n} = \sigma\,\bar{\mathbf{n}}^{\mathsf T}\mathbf{n}$. The left side equals its own conjugate because $[\boldsymbol\sigma]$ is real and symmetric, and $\bar{\mathbf{n}}^{\mathsf T}\mathbf{n} > 0$ is real, so $\sigma$ is real. Orthogonality: if $[\boldsymbol\sigma]\mathbf{n}_1 = \sigma_1\mathbf{n}_1$ and $[\boldsymbol\sigma]\mathbf{n}_2 = \sigma_2\mathbf{n}_2$, then $\mathbf{n}_2\cdot[\boldsymbol\sigma]\mathbf{n}_1 = \mathbf{n}_1\cdot[\boldsymbol\sigma]\mathbf{n}_2$ by symmetry, so $(\sigma_1 - \sigma_2)\,\mathbf{n}_1\cdot\mathbf{n}_2 = 0$, and $\mathbf{n}_1\perp\mathbf{n}_2$ whenever $\sigma_1 \ne \sigma_2$. For a repeated root every direction in the corresponding plane (or all of space) is principal, and an orthogonal triad can still be chosen. This is the spectral theorem of [Maths Atlas](/learn/maths/) linear algebra applied to stress.
:::

In principal axes the stress matrix is diagonal, $\operatorname{diag}(\sigma_1, \sigma_2, \sigma_3)$, and the invariants become $I_1 = \sigma_1 + \sigma_2 + \sigma_3$, $I_2 = \sigma_1\sigma_2 + \sigma_2\sigma_3 + \sigma_3\sigma_1$, $I_3 = \sigma_1\sigma_2\sigma_3$ — useful checks on any computed set of principal stresses.

::: widget transform2d
matrix: 80,30; 30,-40
eigen: true
editable: true
range: 120
caption: The in-plane part of the stress tensor of [[#ex-traction]] as a linear map: a unit normal $\mathbf{n}$ is carried to the traction $\mathbf{t} = [\boldsymbol\sigma]\mathbf{n}$, so the images $A\mathbf{e}_1$ and $A\mathbf{e}_2$ are the tractions on the $x$- and $y$-faces, in MPa. In general $\mathbf{t}$ is not parallel to $\mathbf{n}$ — the angle between them is the shear on that plane. The two eigenvector directions are the principal directions, where $\mathbf{t}$ and $\mathbf{n}$ line up; they are perpendicular because the matrix is symmetric. Make the off-diagonal entries unequal and watch the eigenvectors stop being perpendicular: a non-symmetric "stress" would violate moment equilibrium.
:::

### Maximum shear, octahedral stress and the deviator

Two further results follow directly from the principal stresses and are used throughout [[solid-mechanics/plasticity]] and in design.

::: proposition Maximum shear stress and the stress deviator {#prop-max-shear}
(a) The largest shear stress on any plane through the point is
$$
\tau_{\max} = \frac{\sigma_1 - \sigma_3}{2},
$$
acting on the two planes that bisect the directions of $\sigma_1$ and $\sigma_3$; the normal stress on those planes is $(\sigma_1 + \sigma_3)/2$.

(b) The **mean (hydrostatic) stress** is $\sigma_m = I_1/3$, and the **stress deviator** $s_{ij} = \sigma_{ij} - \sigma_m\delta_{ij}$ has the same principal directions as $\boldsymbol\sigma$, principal values $\sigma_i - \sigma_m$, zero trace, and second invariant
$$
J_2 = \tfrac16\bigl[(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2\bigr].
$$
The **von Mises equivalent stress** is $\sigma_{\mathrm{vM}} = \sqrt{3J_2}$, and the **octahedral shear stress** — the shear stress on the planes equally inclined to the three principal axes — is $\tau_{\mathrm{oct}} = \sqrt{2J_2/3} = (\sqrt2/3)\,\sigma_{\mathrm{vM}}$.
:::

::: proof
(a) In principal axes the traction on a plane with normal $\mathbf{n}$ is $(\sigma_1 n_1, \sigma_2 n_2, \sigma_3 n_3)$, so with $\ell_i = n_i^2$ ($\ell_1 + \ell_2 + \ell_3 = 1$, all $\ell_i \ge 0$)
$$
\sigma_n = \sum \sigma_i \ell_i, \qquad \tau_n^2 = \sum\sigma_i^2\ell_i - \Bigl(\sum\sigma_i\ell_i\Bigr)^2 .
$$
$\tau_n^2$ is the variance of a random variable that takes the value $\sigma_i$ with probability $\ell_i$. A variable confined to $[\sigma_3, \sigma_1]$ has the largest variance when it puts probability $\tfrac12$ on each end point, which gives variance $(\sigma_1 - \sigma_3)^2/4$. Hence $\tau_{\max} = (\sigma_1 - \sigma_3)/2$ at $\ell_1 = \ell_3 = \tfrac12$, $\ell_2 = 0$: normals at $45^\circ$ to the 1- and 3-axes in the 1–3 plane, with mean $\sigma_n = (\sigma_1 + \sigma_3)/2$.

(b) Subtracting $\sigma_m\mathbf{I}$ shifts every eigenvalue by $-\sigma_m$ and leaves the eigenvectors unchanged; the trace becomes $I_1 - 3\sigma_m = 0$. For a traceless tensor with principal values $s_i$, the second invariant is conventionally taken as $J_2 = \tfrac12\sum s_i^2$, and since $\sum s_i = 0$, $\sum_{i<j}(s_i - s_j)^2 = 3\sum s_i^2 - (\sum s_i)^2 = 3\sum s_i^2$; with $s_i - s_j = \sigma_i - \sigma_j$ this gives the formula. On an octahedral plane $\ell_i = \tfrac13$, so by the variance formula $\tau_{\mathrm{oct}}^2 = \tfrac13\sum\sigma_i^2 - \sigma_m^2 = \tfrac13\sum s_i^2 = \tfrac23 J_2$.
:::

::: example Principal stresses in three dimensions {#ex-principal}
Find the principal stresses, the direction of $\sigma_1$, the maximum shear stress and the von Mises stress for the state of stress of [[#ex-traction]].
::: solution
The invariants (MPa, MPa², MPa³):
$$
\begin{aligned}
I_1 &= 80 - 40 + 60 = 100,\\
I_2 &= (80)(-40) + (-40)(60) + (60)(80) - 30^2 - 20^2 - 0^2 = -3200 - 2400 + 4800 - 900 - 400 = -2100,\\
I_3 &= 80\bigl[(-40)(60) - 20^2\bigr] - 30\bigl[(30)(60) - 0\bigr] + 0 = 80(-2800) - 54\,000 = -278\,000 .
\end{aligned}
$$
The cubic $\sigma^3 - 100\sigma^2 - 2100\sigma + 278\,000 = 0$ is solved numerically (or with the trigonometric formula for three real roots):
$$
\sigma_1 = 87.92\ \mathrm{MPa}, \qquad \sigma_2 = 62.59\ \mathrm{MPa}, \qquad \sigma_3 = -50.52\ \mathrm{MPa}.
$$
Checks: the sum is $100.0 = I_1$; the product is $87.92\times62.59\times(-50.52) = -2.780\times10^{5} = I_3$.

The direction of $\sigma_1$ solves $([\boldsymbol\sigma] - 87.92\,\mathbf{I})\mathbf{n} = \mathbf{0}$. The cross product of the first two rows, $(-7.92, 30, 0)\times(30, -127.92, 20)$, is $(600, 158.5, 113.5)$, which normalises to
$$
\mathbf{n}_1 = (0.951,\ 0.251,\ 0.180),
$$
an axis $18.0^\circ$ from the $x$-axis — the large $\sigma_x = 80\ \mathrm{MPa}$ has been nudged up and tilted by the shear components.

Maximum shear: $\tau_{\max} = (87.92 + 50.52)/2 = 69.22\ \mathrm{MPa}$. Von Mises stress:
$$
\sigma_{\mathrm{vM}} = \sqrt{\tfrac12\bigl[(25.33)^2 + (113.11)^2 + (138.44)^2\bigr]} = 127.7\ \mathrm{MPa}.
$$
Sanity check: $\sigma_{\mathrm{vM}}$ lies between $\sigma_1 - \sigma_3 = 138.4\ \mathrm{MPa}$ (the Tresca equivalent stress) and $(\sqrt3/2)(\sigma_1 - \sigma_3) = 119.9\ \mathrm{MPa}$, the bounds that hold for every stress state.
:::
:::

::: warning The in-plane maximum shear is not always the maximum shear
For plane stress ($\sigma_z = \tau_{xz} = \tau_{yz} = 0$) the in-plane principal stresses $\sigma_a, \sigma_b$ and the out-of-plane principal stress $0$ must be sorted together before applying $\tau_{\max} = (\sigma_1 - \sigma_3)/2$. If $\sigma_a = 120\ \mathrm{MPa}$ and $\sigma_b = 40\ \mathrm{MPa}$, the in-plane Mohr's circle gives $40\ \mathrm{MPa}$, but the true maximum is $(120 - 0)/2 = 60\ \mathrm{MPa}$, on a plane inclined out of the sheet. Both principal stresses having the same sign is exactly the case of a thin pressure vessel wall, where using the in-plane value underestimates the shear by a factor of up to two and overestimates the margin against yield by the Tresca criterion.
:::

## Mohr's circles in three dimensions

The variance argument of [[#prop-max-shear]] also shows where all possible $(\sigma_n, \tau_n)$ pairs lie: in the region of the $\sigma$–$\tau$ plane inside the big circle on diameter $[\sigma_3, \sigma_1]$ and outside the two small circles on $[\sigma_3, \sigma_2]$ and $[\sigma_2, \sigma_1]$ (Mohr's three circles). For planes containing one principal axis, the point lies on one of the circles, and the familiar two-dimensional construction of [[mechanics-of-materials/stress-transformation]] applies. The figure lets you drive the two-dimensional circle: the moving point is the stress on a plane whose normal makes angle $\theta$ with $x$, plotted at the angle $2\theta$ around the circle.

::: widget parametric
fx: (sx + sy)/2 + (sx - sy)/2*cos(t) + txy*sin(t)
fy: (sx - sy)/2*sin(t) - txy*cos(t)
t: 0, 2pi
sliders: sx=80:-150:150:5; sy=-40:-150:150:5; txy=30:-100:100:5
x: -160, 160
y: -110, 110
equal: true
caption: Mohr's circle for the in-plane stresses $(\sigma_x, \sigma_y, \tau_{xy})$, horizontal axis $\sigma_n$, vertical axis $\tau$ (plotted with the clockwise-positive convention, so the $x$-face starts at $(\sigma_x, -\tau_{xy})$). The parameter $t$ is $2\theta$. Read the principal stresses where the circle crosses the horizontal axis and the in-plane maximum shear at the top. Set $\sigma_y = 40$, $\tau_{xy} = 0$, $\sigma_x = 120$: the circle no longer reaches the origin, the third principal stress $0$ lies outside it, and the absolute maximum shear is the radius of a bigger circle from $0$ to $120$.
:::

## Strain: from displacement to deformation

Now look at the same point from the point of view of geometry. Under load, each material point moves from $\mathbf{x}$ to $\mathbf{x} + \mathbf{u}(\mathbf{x})$, where $\mathbf{u} = (u, v, w)$ is the **displacement field**. A rigid translation (constant $\mathbf{u}$) or a rigid rotation moves points without stretching anything, so strain must be built from the *differences* in displacement between neighbouring points — from the displacement gradient — with the rotation removed.

::: definition Small-strain and rotation tensors {#def-strain}
For displacement gradients small compared with 1, the **small (infinitesimal) strain tensor** is the symmetric part of the displacement gradient,
$$
\varepsilon_{ij} = \frac12\left(\frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}\right),
$$
so that
$$
\varepsilon_x = \frac{\partial u}{\partial x},\quad \varepsilon_y = \frac{\partial v}{\partial y},\quad \varepsilon_z = \frac{\partial w}{\partial z},\quad
\gamma_{xy} = 2\varepsilon_{xy} = \frac{\partial u}{\partial y} + \frac{\partial v}{\partial x},
$$
and cyclically for $\gamma_{yz}$, $\gamma_{zx}$. The **engineering shear strain** $\gamma_{xy}$ is the decrease in the right angle between two line elements initially along $x$ and $y$; the **tensor shear strain** $\varepsilon_{xy}$ is half of it. The antisymmetric part, $\omega_{ij} = \tfrac12(\partial u_i/\partial x_j - \partial u_j/\partial x_i)$, describes a local rigid rotation; in the $x$–$y$ plane the rotation angle (anticlockwise) is $\omega_z = \tfrac12(\partial v/\partial x - \partial u/\partial y)$.
:::

The physical meaning follows from following two short fibres. A fibre $dx$ along $x$ moves its far end by $(\partial u/\partial x\,dx,\ \partial v/\partial x\,dx)$ relative to its near end: it stretches by the fraction $\partial u/\partial x$ and rotates anticlockwise by $\partial v/\partial x$. A fibre $dy$ along $y$ stretches by $\partial v/\partial y$ and rotates *clockwise* by $\partial u/\partial y$. The right angle between them closes by the sum of the two rotations, $\gamma_{xy}$, while the average of the two rotations is the rigid spin $\omega_z$. The strain tensor transforms with rotation of axes exactly as stress does, so it too has principal strains, invariants and a Mohr's circle — with the one bookkeeping trap that the circle is drawn with $\gamma/2$, not $\gamma$.

::: example Strain and rotation from a displacement field {#ex-displacement}
A thin plate deforms with the homogeneous displacement field
$$
u = (3x + 2y)\times10^{-3}, \qquad v = (-2x + y)\times10^{-3}
$$
($x, y$ in any length unit). Find the strains and the rotation. Is there any shear strain?
::: solution
The displacement gradient is
$$
\begin{bmatrix} \partial u/\partial x & \partial u/\partial y \\ \partial v/\partial x & \partial v/\partial y \end{bmatrix} = \begin{bmatrix} 3 & 2 \\ -2 & 1 \end{bmatrix}\times10^{-3}.
$$
Then $\varepsilon_x = 3.0\times10^{-3}$, $\varepsilon_y = 1.0\times10^{-3}$ and
$$
\gamma_{xy} = (2 + (-2))\times10^{-3} = 0, \qquad \omega_z = \tfrac12(-2 - 2)\times10^{-3} = -2.0\times10^{-3}\ \mathrm{rad}.
$$
The off-diagonal terms of the gradient are large, yet there is **no** shear strain: the fibre along $x$ turns clockwise by $2\times10^{-3}$ rad, and so does the fibre along $y$, so the right angle between them is preserved. The whole element stretches by $0.3\,\%$ and $0.1\,\%$ and spins clockwise by $2$ mrad $= 0.115^\circ$. A strain gauge would read only the stretches; a misreading of the gradient as "shear" would invent a stress that is not there. (Check: a pure rigid rotation $u = -\omega y$, $v = \omega x$ gives $\gamma_{xy} = -\omega + \omega = 0$, as it must.)
:::
:::

## Compatibility

The six strain components are derived from three displacements, so they cannot be prescribed independently. If someone hands you six strain functions, there need not be any displacement field that produces them — the deformed pieces of the body would not fit together. The conditions that guarantee they do fit are the **compatibility equations**.

::: proposition Saint-Venant compatibility equations {#prop-compatibility}
If the strains are derived from a single-valued, sufficiently smooth displacement field, they satisfy six compatibility equations. In plane problems only one is non-trivial:
$$
\frac{\partial^2 \varepsilon_x}{\partial y^2} + \frac{\partial^2 \varepsilon_y}{\partial x^2} = \frac{\partial^2 \gamma_{xy}}{\partial x\,\partial y}.
$$ {#eq-compat2d}
In three dimensions there are two more of this type (obtained by cycling $x \to y \to z \to x$) and three of the form
$$
2\frac{\partial^2\varepsilon_x}{\partial y\,\partial z} = \frac{\partial}{\partial x}\left(-\frac{\partial\gamma_{yz}}{\partial x} + \frac{\partial\gamma_{zx}}{\partial y} + \frac{\partial\gamma_{xy}}{\partial z}\right)
$$
and its cyclic permutations. Conversely, in a simply connected body, strains satisfying all six equations can be integrated to a single-valued displacement field (unique up to a rigid-body motion).
:::

::: proof
Necessity in the plane case: substitute $\varepsilon_x = u_{,x}$, $\varepsilon_y = v_{,y}$, $\gamma_{xy} = u_{,y} + v_{,x}$ (commas denote partial derivatives). The left side is $u_{,xyy} + v_{,yxx}$ and the right side is $u_{,yxy} + v_{,xxy}$; these are equal because mixed partial derivatives of a smooth function commute. The three-dimensional equations follow the same way, for example $2\varepsilon_{x,yz} = 2u_{,xyz}$ and $-\gamma_{yz,xx} + \gamma_{zx,xy} + \gamma_{xy,xz} = -(v_{,zxx} + w_{,yxx}) + (w_{,xxy} + u_{,zxy}) + (u_{,yxz} + v_{,xxz}) = 2u_{,xyz}$. Sufficiency (integrating strains to displacements in a simply connected region) uses the line-integral argument of Cesàro and Volterra; we state it without proof. In a multiply connected region — a body with a hole — extra conditions are needed to make the displacement single-valued around the hole; their violation is the mechanism of residual stresses caused by dislocations and by welding a ring closed.
:::

Compatibility matters for stress analysis because stresses come from strains through the material law: a stress field that satisfies equilibrium but produces incompatible strains is not the solution. In [[solid-mechanics/linear-elasticity]] the Airy stress function is constructed exactly so that equilibrium is automatic and compatibility becomes a single equation, $\nabla^4\phi = 0$.

::: intuition Equilibrium and compatibility as two sets of books
Think of a statically indeterminate structure: equilibrium gives fewer equations than unknown forces, and the missing equations come from requiring the members to fit together after deforming. Continuum mechanics is the same at every point. Three equilibrium equations for six stresses; six strains from three displacements; six material equations linking them. Count: $6 + 6 + 3 = 15$ unknowns ($\sigma_{ij}$, $\varepsilon_{ij}$, $u_i$) and $3 + 6 + 6 = 15$ equations (equilibrium, strain–displacement, material law). Compatibility is not an extra equation in that count: it is what you must add if you choose to work with strains and stresses alone and eliminate the displacements.
:::

## Strain measurement: rosettes

Stress cannot be measured directly; strain on a free surface can. An electrical-resistance strain gauge bonded to the surface reads the normal strain along its own axis. At a free surface the material is in plane stress, so three in-plane strain components $(\varepsilon_x, \varepsilon_y, \gamma_{xy})$ are unknown, and three gauges in different directions — a **rosette** — are needed. The normal strain in the direction at angle $\theta$ from $x$ is
$$
\varepsilon_\theta = \varepsilon_x\cos^2\theta + \varepsilon_y\sin^2\theta + \gamma_{xy}\sin\theta\cos\theta .
$$ {#eq-gauge}

::: algorithm Reducing a rectangular (0°/45°/90°) rosette {#alg-rosette}
Given gauge readings $\varepsilon_a$ (at $0^\circ$), $\varepsilon_b$ ($45^\circ$) and $\varepsilon_c$ ($90^\circ$) on an isotropic, linear-elastic surface with known $E$ and $\nu$:
1. From [[#eq-gauge]]: $\varepsilon_x = \varepsilon_a$, $\varepsilon_y = \varepsilon_c$, $\gamma_{xy} = 2\varepsilon_b - \varepsilon_a - \varepsilon_c$.
2. Principal strains: $\varepsilon_{1,2} = \dfrac{\varepsilon_x + \varepsilon_y}{2} \pm \sqrt{\left(\dfrac{\varepsilon_x - \varepsilon_y}{2}\right)^2 + \left(\dfrac{\gamma_{xy}}{2}\right)^2}$.
3. Principal direction: $\tan 2\theta_p = \gamma_{xy}/(\varepsilon_x - \varepsilon_y)$; pick the root that, put back into [[#eq-gauge]], returns $\varepsilon_1$.
4. Principal stresses from the plane-stress Hooke's law ([[solid-mechanics/linear-elasticity]]): $\sigma_1 = \dfrac{E}{1 - \nu^2}(\varepsilon_1 + \nu\varepsilon_2)$, $\sigma_2 = \dfrac{E}{1 - \nu^2}(\varepsilon_2 + \nu\varepsilon_1)$.
5. Out-of-plane strain (not measured, but real): $\varepsilon_z = -\dfrac{\nu}{1 - \nu}(\varepsilon_x + \varepsilon_y)$.
:::

::: example A rosette on a steel bracket {#ex-rosette}
A rectangular rosette on a steel bracket ($E = 200\ \mathrm{GPa}$, $\nu = 0.3$) reads $\varepsilon_a = 600\ \mu\varepsilon$, $\varepsilon_b = 500\ \mu\varepsilon$ and $\varepsilon_c = -200\ \mu\varepsilon$. Find the principal strains and their direction, the principal stresses and the maximum shear stress at the surface.
::: solution
Step 1: $\varepsilon_x = 600\ \mu\varepsilon$, $\varepsilon_y = -200\ \mu\varepsilon$, $\gamma_{xy} = 2(500) - 600 - (-200) = 600\ \mu\varepsilon$.

Step 2: centre $(600 - 200)/2 = 200\ \mu\varepsilon$, radius $\sqrt{400^2 + 300^2} = 500\ \mu\varepsilon$, so
$$
\varepsilon_1 = 700\ \mu\varepsilon, \qquad \varepsilon_2 = -300\ \mu\varepsilon .
$$
Step 3: $\tan2\theta_p = 600/800 = 0.75$, $2\theta_p = 36.87^\circ$, $\theta_p = 18.43^\circ$ anticlockwise from gauge $a$. Check with [[#eq-gauge]]: $600\cos^2 18.43^\circ - 200\sin^2 18.43^\circ + 600\sin18.43^\circ\cos18.43^\circ = 540 - 20 + 180 = 700\ \mu\varepsilon$. ✓

Step 4: $E/(1 - \nu^2) = 200\,000/0.91 = 219\,780\ \mathrm{MPa}$, so
$$
\sigma_1 = 219\,780\,(700 - 90)\times10^{-6} = 134.1\ \mathrm{MPa}, \qquad \sigma_2 = 219\,780\,(-300 + 210)\times10^{-6} = -19.8\ \mathrm{MPa}.
$$
With $\sigma_3 = 0$ (free surface) the ordering is $\sigma_1 = 134.1$, $0$, $-19.8\ \mathrm{MPa}$, so $\tau_{\max} = (134.1 + 19.8)/2 = 77.0\ \mathrm{MPa}$ — here the in-plane value is the true maximum because the in-plane principal stresses have opposite signs. Check: $\tau_{\max} = G\gamma_{\max}$ with $G = E/2(1+\nu) = 76.9\ \mathrm{GPa}$ and $\gamma_{\max} = \varepsilon_1 - \varepsilon_2 = 1000\ \mu\varepsilon$ gives $76.9\ \mathrm{MPa}$. ✓ (The tiny difference is rounding.)
:::
:::

::: application Where the numbers come from
Rosettes are bonded at the places a finite element model flags as critical — fillet roots, weld toes, holes — on prototypes of crane booms, wind-turbine hubs, aircraft fittings and pressure vessels during qualification tests. The measured principal stresses are compared with the model, and discrepancies of more than a few per cent usually reveal a modelling error (a boundary condition, a contact) rather than a gauge error. Proof and burst tests of pressurised or rotating hardware store large amounts of energy and are carried out only behind barriers by trained staff following the applicable test standard.
:::

::: history
Augustin-Louis Cauchy presented the concept of the stress at a point, specified by components on three perpendicular planes, to the Paris Academy of Sciences in 1822; the tetrahedron argument used above is his. The graphical construction for transforming stress was published by Otto Mohr in 1882 and is still taught under his name. The compatibility conditions are named after Adhémar Barré de Saint-Venant, who also gave the principle of the same name used in [[solid-mechanics/linear-elasticity]]. Measuring surface strain electrically became practical with the bonded-wire resistance strain gauge, developed independently in 1938 by Edward E. Simmons at the California Institute of Technology and Arthur C. Ruge at the Massachusetts Institute of Technology; foil gauges and rosettes followed and remain the standard tool of experimental stress analysis.
:::

::: quiz
At a point, $\sigma_1 = 150\ \mathrm{MPa}$, $\sigma_2 = 90\ \mathrm{MPa}$, $\sigma_3 = 0$. What is the maximum shear stress?
- [ ] $30\ \mathrm{MPa}$
- [ ] $45\ \mathrm{MPa}$
- [x] $75\ \mathrm{MPa}$
- [ ] $120\ \mathrm{MPa}$
::: solution
$\tau_{\max} = (\sigma_1 - \sigma_3)/2 = (150 - 0)/2 = 75\ \mathrm{MPa}$. The value $30\ \mathrm{MPa}$ is the in-plane maximum $(\sigma_1 - \sigma_2)/2$, which ignores the out-of-plane direction ([[#prop-max-shear]]).
:::
:::

::: quiz
A displacement field gives $\partial u/\partial y = 4\times10^{-4}$ and $\partial v/\partial x = -4\times10^{-4}$. Which statement is true?
- [ ] $\gamma_{xy} = 8\times10^{-4}$
- [x] $\gamma_{xy} = 0$ and the element rotates by $-4\times10^{-4}$ rad
- [ ] $\gamma_{xy} = 4\times10^{-4}$ and there is no rotation
::: solution
$\gamma_{xy} = \partial u/\partial y + \partial v/\partial x = 0$ and $\omega_z = \tfrac12(\partial v/\partial x - \partial u/\partial y) = -4\times10^{-4}$ rad (clockwise): a rigid rotation, not a deformation.
:::
:::

::: summary
- The traction on a plane depends linearly on its unit normal: $\mathbf{t} = [\boldsymbol\sigma]\mathbf{n}$ (Cauchy). The stress tensor is symmetric, so six components describe the stress at a point.
- Equilibrium of a small element gives three partial differential equations, $\partial\sigma_{ji}/\partial x_j + b_i = 0$, plus the traction boundary condition $[\boldsymbol\sigma]\mathbf{n} = \bar{\mathbf{t}}$. They are not enough on their own to fix the stress field.
- Principal stresses are the eigenvalues of $[\boldsymbol\sigma]$, roots of $\sigma^3 - I_1\sigma^2 + I_2\sigma - I_3 = 0$; the invariants are the same in every coordinate system.
- $\tau_{\max} = (\sigma_1 - \sigma_3)/2$ with all three principal stresses sorted, including a zero out-of-plane one in plane stress.
- The deviator $s_{ij} = \sigma_{ij} - \sigma_m\delta_{ij}$ and its invariant $J_2$ give the von Mises stress $\sigma_{\mathrm{vM}} = \sqrt{3J_2}$ and the octahedral shear stress.
- Small strain is the symmetric part of the displacement gradient; the antisymmetric part is a rigid rotation. Engineering shear strain $\gamma$ is twice the tensor component.
- Strains derived from a displacement field satisfy the compatibility equations; in 2D, $\varepsilon_{x,yy} + \varepsilon_{y,xx} = \gamma_{xy,xy}$.
- Three gauges (a rosette) determine the surface strain state; principal stresses then follow from the plane-stress Hooke's law.
:::

## Exercises

::: exercise Normal stress on an inclined plane {level=1 check="34"}
At a point the only non-zero stress components are $\sigma_y = 50\ \mathrm{MPa}$, $\sigma_z = -20\ \mathrm{MPa}$ and $\tau_{yz} = 30\ \mathrm{MPa}$. Find the normal stress on the plane with unit normal $\mathbf{n} = (0, 0.6, 0.8)$. (Enter the normal stress in MPa.)
::: solution
$\mathbf{t} = [\boldsymbol\sigma]\mathbf{n} = (0,\ 50(0.6) + 30(0.8),\ 30(0.6) - 20(0.8)) = (0,\ 54,\ 2)\ \mathrm{MPa}$. Then $\sigma_n = 54(0.6) + 2(0.8) = 34\ \mathrm{MPa}$, and the shear stress on the plane is $\tau_n = \sqrt{54^2 + 2^2 - 34^2} = \sqrt{1764} = 42\ \mathrm{MPa}$.
:::
::: answer
$\sigma_n = 34\ \mathrm{MPa}$ (and $\tau_n = 42\ \mathrm{MPa}$).
:::
:::

::: exercise Maximum shear from a 3D state {level=1 check="50"}
$$
[\boldsymbol\sigma] = \begin{bmatrix} 60 & 0 & 0 \\ 0 & -20 & 30 \\ 0 & 30 & 60 \end{bmatrix}\ \mathrm{MPa}.
$$
Find the three principal stresses and the maximum shear stress. (Enter $\tau_{\max}$ in MPa.)
::: solution
$x$ is already a principal direction with $\sigma = 60\ \mathrm{MPa}$, because the first row and column have no shear terms. The $y$–$z$ block has centre $(-20 + 60)/2 = 20$ and radius $\sqrt{40^2 + 30^2} = 50$, so its principal values are $70$ and $-30\ \mathrm{MPa}$. Sorted: $\sigma_1 = 70$, $\sigma_2 = 60$, $\sigma_3 = -30\ \mathrm{MPa}$, and $\tau_{\max} = (70 + 30)/2 = 50\ \mathrm{MPa}$. Check: $I_1 = 100$ both ways; $I_3 = 60[(-20)(60) - 900] = -126\,000 = 70\times60\times(-30)$.
:::
:::

::: exercise Reduce a rosette {level=1 check="350"}
A rectangular $0^\circ/45^\circ/90^\circ$ rosette reads $\varepsilon_a = 300\ \mu\varepsilon$, $\varepsilon_b = 250\ \mu\varepsilon$, $\varepsilon_c = -100\ \mu\varepsilon$. Find the larger principal strain. (Enter $\varepsilon_1$ in microstrain.)
::: solution
$\varepsilon_x = 300$, $\varepsilon_y = -100$, $\gamma_{xy} = 500 - 300 + 100 = 300\ \mu\varepsilon$. Centre $100$, radius $\sqrt{200^2 + 150^2} = 250$, so $\varepsilon_1 = 350\ \mu\varepsilon$ and $\varepsilon_2 = -150\ \mu\varepsilon$, with $\tan2\theta_p = 300/400$, $\theta_p = 18.4^\circ$ from gauge $a$.
:::
:::

::: exercise Is this stress field in equilibrium? {level=2 check="3"}
A plane stress field (MPa, with $x, y$ in metres) is
$$
\sigma_x = 4x + 3y, \qquad \sigma_y = 2x - y, \qquad \tau_{xy} = -2x + ky .
$$
(a) Find $k$ so that the first equilibrium equation holds with no body force. (b) With that $k$, find the body force $b_y$ needed to satisfy the second equation. (Enter $b_y$ in MN/m³.)
::: solution
(a) $\partial\sigma_x/\partial x + \partial\tau_{xy}/\partial y = 4 + k = 0$, so $k = -4$.
(b) $\partial\tau_{xy}/\partial x + \partial\sigma_y/\partial y + b_y = -2 - 1 + b_y = 0$, so $b_y = 3\ \mathrm{MPa/m} = 3\ \mathrm{MN/m^3}$, a body force in $+y$. For comparison, the weight of steel is about $0.077\ \mathrm{MN/m^3}$: this field would need a body force forty times stronger than gravity, so it could only describe a rapidly rotating or accelerating part — or it is simply not an equilibrium field.
:::
:::

::: exercise Shear strain and rotation {level=2 check="5"}
A displacement field is $u = 10^{-3}x^2y$, $v = 10^{-3}xy^2$ ($x, y$ in m, displacements in m). At the point $(1, 2)\ \mathrm{m}$ find $\varepsilon_x$, $\varepsilon_y$, $\gamma_{xy}$ and $\omega_z$. (Enter $\gamma_{xy}$ in units of $10^{-3}$.)
::: solution
$\varepsilon_x = 2\times10^{-3}xy = 4\times10^{-3}$; $\varepsilon_y = 2\times10^{-3}xy = 4\times10^{-3}$; $\gamma_{xy} = \partial u/\partial y + \partial v/\partial x = 10^{-3}(x^2 + y^2) = 5\times10^{-3}$; $\omega_z = \tfrac12\cdot10^{-3}(y^2 - x^2) = 1.5\times10^{-3}\ \mathrm{rad}$. All are small compared with 1, so the small-strain definitions are appropriate at this point (but not far from the origin, where they grow without bound).
:::
:::

::: exercise A compatible strain field {level=2 check="4"}
A proposed plane strain field is $\varepsilon_x = k y^2$, $\varepsilon_y = k x^2$, $\gamma_{xy} = c\,xy$ with $k = 10^{-4}\ \mathrm{m^{-2}}$. Find $c$ so that the field is compatible, and find a displacement field that produces it. (Enter $c$ in units of $10^{-4}\ \mathrm{m^{-2}}$.)
::: solution
[[#eq-compat2d]]: $\partial^2\varepsilon_x/\partial y^2 + \partial^2\varepsilon_y/\partial x^2 = 2k + 2k = 4k$ and $\partial^2\gamma_{xy}/\partial x\partial y = c$, so $c = 4k = 4\times10^{-4}\ \mathrm{m^{-2}}$. Integrating: $u = kxy^2 + f(y)$, $v = kx^2y + g(x)$; then $\gamma_{xy} = 2kxy + f'(y) + 2kxy + g'(x) = 4kxy$ requires $f'(y) + g'(x) = 0$, i.e. $f' = -g' = $ const: a rigid rotation. One displacement field is $u = kxy^2$, $v = kx^2y$. With any other $c$ there is no displacement field at all.
:::
:::

::: exercise Out-of-plane strain at a gauge {level=2 check="-200"}
A rosette on an aluminium alloy panel ($\nu = 1/3$) gives $\varepsilon_x = 250\ \mu\varepsilon$ and $\varepsilon_y = 150\ \mu\varepsilon$ at a free surface. Find the through-thickness strain $\varepsilon_z$. (Enter it in microstrain.)
::: solution
At a free surface $\sigma_z = 0$, so from Hooke's law $\varepsilon_z = -\nu(\sigma_x + \sigma_y)/E$, and with $\sigma_x + \sigma_y = E(\varepsilon_x + \varepsilon_y)/(1 - \nu)$ this is $\varepsilon_z = -\nu(\varepsilon_x + \varepsilon_y)/(1 - \nu) = -\tfrac{1/3}{2/3}(400) = -200\ \mu\varepsilon$. The panel thins even though no gauge points through the thickness.
:::
:::

::: exercise Octahedral shear and von Mises {level=3}
(a) Show that the normal stress on an octahedral plane is $\sigma_m = I_1/3$ and that $\tau_{\mathrm{oct}} = \tfrac13\sqrt{(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2}$.
(b) Hence show $\sigma_{\mathrm{vM}} = \tfrac{3}{\sqrt2}\tau_{\mathrm{oct}}$ and that adding a hydrostatic stress $p$ to every normal component changes neither.
(c) Evaluate $\tau_{\mathrm{oct}}$ for the stress state of [[#ex-traction]].
::: solution
(a) In principal axes an octahedral normal is $\mathbf{n} = (1, 1, 1)/\sqrt3$, so $\mathbf{t} = (\sigma_1, \sigma_2, \sigma_3)/\sqrt3$ and $\sigma_n = \mathbf{t}\cdot\mathbf{n} = (\sigma_1 + \sigma_2 + \sigma_3)/3$. Then $\tau^2 = \lvert\mathbf{t}\rvert^2 - \sigma_n^2 = \tfrac13\sum\sigma_i^2 - \tfrac19(\sum\sigma_i)^2 = \tfrac19\bigl[3\sum\sigma_i^2 - (\sum\sigma_i)^2\bigr] = \tfrac19\sum_{i<j}(\sigma_i - \sigma_j)^2$.
(b) $\sigma_{\mathrm{vM}}^2 = \tfrac12\sum_{i<j}(\sigma_i - \sigma_j)^2 = \tfrac92\tau_{\mathrm{oct}}^2$, so $\sigma_{\mathrm{vM}} = (3/\sqrt2)\tau_{\mathrm{oct}}$. Both depend only on differences of principal stresses, which a hydrostatic $p$ does not change. This is why both are used as yield measures for metals, whose plastic flow is nearly insensitive to hydrostatic pressure ([[solid-mechanics/plasticity]]).
(c) With $\sigma_i = 87.92, 62.59, -50.52\ \mathrm{MPa}$: $\tau_{\mathrm{oct}} = \tfrac13\sqrt{25.33^2 + 113.11^2 + 138.44^2} = 60.18\ \mathrm{MPa}$, and $(3/\sqrt2)(60.18) = 127.7\ \mathrm{MPa} = \sigma_{\mathrm{vM}}$ as found in [[#ex-principal]].
:::
:::

::: exercise The delta rosette {level=3}
A delta rosette has gauges at $0^\circ$, $60^\circ$ and $120^\circ$ reading $\varepsilon_a, \varepsilon_b, \varepsilon_c$. (a) Derive
$$
\varepsilon_x = \varepsilon_a,\qquad \varepsilon_y = \tfrac13(2\varepsilon_b + 2\varepsilon_c - \varepsilon_a),\qquad \gamma_{xy} = \tfrac{2}{\sqrt3}(\varepsilon_b - \varepsilon_c).
$$
(b) Show that $\varepsilon_x + \varepsilon_y = \tfrac23(\varepsilon_a + \varepsilon_b + \varepsilon_c)$, and explain why this sum is the same whichever way the rosette is rotated on the surface. (c) Readings of $\varepsilon_a = 400$, $\varepsilon_b = 100$, $\varepsilon_c = 100\ \mu\varepsilon$: find the principal strains.
::: solution
(a) From [[#eq-gauge]] with $\cos^2 60^\circ = \tfrac14$, $\sin^2 60^\circ = \tfrac34$, $\sin60^\circ\cos60^\circ = \tfrac{\sqrt3}{4}$, and the same at $120^\circ$ with the last term negative:
$\varepsilon_b = \tfrac14\varepsilon_x + \tfrac34\varepsilon_y + \tfrac{\sqrt3}{4}\gamma_{xy}$, $\varepsilon_c = \tfrac14\varepsilon_x + \tfrac34\varepsilon_y - \tfrac{\sqrt3}{4}\gamma_{xy}$. Subtracting gives $\gamma_{xy} = \tfrac{2}{\sqrt3}(\varepsilon_b - \varepsilon_c)$; adding gives $\varepsilon_b + \varepsilon_c = \tfrac12\varepsilon_a + \tfrac32\varepsilon_y$, so $\varepsilon_y = \tfrac13(2\varepsilon_b + 2\varepsilon_c - \varepsilon_a)$.
(b) $\varepsilon_x + \varepsilon_y = \varepsilon_a + \tfrac13(2\varepsilon_b + 2\varepsilon_c - \varepsilon_a) = \tfrac23(\varepsilon_a + \varepsilon_b + \varepsilon_c)$. The sum $\varepsilon_x + \varepsilon_y$ is the first invariant of the in-plane strain tensor, independent of the axes, and the three gauges are symmetric under a $60^\circ$ rotation, so their mean must equal half the invariant: it is the centre of Mohr's circle.
(c) $\varepsilon_x = 400$, $\varepsilon_y = \tfrac13(200 + 200 - 400) = 0$, $\gamma_{xy} = 0$: the axes are principal, $\varepsilon_1 = 400\ \mu\varepsilon$ along gauge $a$ and $\varepsilon_2 = 0$. Check (b): $\tfrac23(600) = 400 = \varepsilon_x + \varepsilon_y$. ✓
:::
:::

::: exercise Choosing where to put the gauges {level=3}
You must verify a finite element model of a cast-iron pump casing during a hydrostatic proof test. The model shows the highest von Mises stress on the inside of a nozzle junction, which you cannot reach, and a secondary peak on the outside at the root of a mounting boss. Explain how you would decide where to place rosettes, what type, how many, and what checks on the data you would make. What hazards does the test involve?
::: solution
A good answer covers: (1) Gauges can only be placed on accessible free surfaces, so instrument the outside peak at the boss and points on the outer surface opposite the nozzle junction, where the model's surface stresses are also known; agreement there validates the model, which is then trusted for the inaccessible inner peak. (2) Use rectangular rosettes where principal directions are unknown (near the boss) and single gauges only where the direction is certain (on a straight cylindrical shell the hoop and axial directions are principal). (3) Small gauge length near steep gradients, because a gauge averages strain over its length; place a second rosette a short distance away to sample the gradient. (4) Checks: zero readings at zero pressure, linearity of strain with pressure on loading and unloading (non-linearity or hysteresis means yielding or slipping of the bond), a return to zero after unloading, temperature compensation, and comparison of $\varepsilon_x + \varepsilon_y$ (an invariant) with the model as a check independent of rosette orientation. (5) Cast iron is brittle, so the margin against fracture must be assessed with the maximum principal stress rather than von Mises. Hazards: a hydrostatic test is used precisely because water stores little energy, but trapped air, a failed fitting or an unexpected brittle fracture can still release fragments and high-pressure jets; the test is carried out to the applicable standard, with air vented, behind barriers, by trained personnel.
:::
:::
