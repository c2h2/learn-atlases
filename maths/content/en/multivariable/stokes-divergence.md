The fundamental theorem of calculus says that integrating a derivative over an interval gives the values of the function at the two ends: $\int_a^b F'(x)\,dx = F(b) - F(a)$. Green's theorem ([[multivariable/greens-theorem#thm-green]]) says something similar in the plane: integrating a combination of derivatives over a region gives a line integral around its boundary. This chapter completes the pattern in space with two theorems that are among the most useful in all of applied mathematics.

**Stokes' theorem** says that the circulation of a vector field around a closed curve equals the flux of its *curl* through any surface spanning the curve. The **divergence theorem** (Gauss's theorem) says that the flux of a vector field out of a closed surface equals the integral of its *divergence* over the solid inside. Together they turn local information (derivatives at points) into global information (integrals over boundaries), and back again. They are the mathematical content of Gauss's law, of conservation of mass and heat, and of Maxwell's equations. We first define the two derivatives, curl and divergence, and then prove both theorems for regions of a simple shape, with a sketch of how the general case follows. We use line integrals ([[multivariable/line-integrals]]), Green's theorem, and flux integrals ([[multivariable/surface-integrals#def-flux]]) throughout.

## Divergence and curl

Write $\nabla$ for the vector of partial derivative operators, $\nabla = \left(\pdv{}{x}, \pdv{}{y}, \pdv{}{z}\right)$. Applied to a function it gives the gradient $\nabla f$; "dotted" and "crossed" with a vector field it gives two new derivatives.

::: definition Divergence {#def-divergence}
The **divergence** of a $C^1$ vector field $\mathbf{F} = (P, Q, R)$ on an open set in $\R^3$ is the function

$$
\nabla\cdot\mathbf{F} = \divg\mathbf{F} = \pdv{P}{x} + \pdv{Q}{y} + \pdv{R}{z}.
$$
:::

::: definition Curl {#def-curl}
The **curl** of $\mathbf{F} = (P, Q, R)$ is the vector field

$$
\nabla\times\mathbf{F} = \curl\mathbf{F} = \begin{vmatrix}\mathbf{i} & \mathbf{j} & \mathbf{k}\\ \partial_x & \partial_y & \partial_z\\ P & Q & R\end{vmatrix} = \left(\pdv{R}{y} - \pdv{Q}{z},\ \ \pdv{P}{z} - \pdv{R}{x},\ \ \pdv{Q}{x} - \pdv{P}{y}\right).
$$
:::

The third component of the curl is the scalar curl $Q_x - P_y$ of Green's theorem. Three examples set the pattern:

| field | divergence | curl | picture |
|---|---|---|---|
| $(x, y, z)$ | $3$ | $\mathbf{0}$ | pure expansion away from the origin |
| $(-y, x, 0)$ | $0$ | $(0, 0, 2)$ | rigid rotation about the $z$-axis |
| $\mathbf{x}/\norm{\mathbf{x}}^3$ | $0$ (for $\mathbf{x}\ne\mathbf{0}$) | $\mathbf{0}$ | inverse-square field of a point source |

For the last one, $\pdv{}{x}\dfrac{x}{\norm{\mathbf{x}}^3} = \dfrac{1}{\norm{\mathbf{x}}^3} - \dfrac{3x^2}{\norm{\mathbf{x}}^5}$, and adding the three similar terms gives $\dfrac{3}{\norm{\mathbf{x}}^3} - \dfrac{3\norm{\mathbf{x}}^2}{\norm{\mathbf{x}}^5} = 0$. More generally, a rigid rotation with angular velocity vector $\boldsymbol{\omega}$ has velocity field $\mathbf{v} = \boldsymbol{\omega}\times\mathbf{x}$, and a short computation gives $\nabla\times\mathbf{v} = 2\boldsymbol{\omega}$: the curl measures rotation, and divergence measures expansion. We make both statements precise later in the chapter ([[#thm-curl-density]] and [[#thm-div-density]]).

::: example Computing divergence and curl {#ex-div-curl}
Find the divergence and curl of $\mathbf{F} = (x^2y,\ yz,\ xz^2)$, and the divergence at $(1,1,1)$.
::: solution
$\nabla\cdot\mathbf{F} = \pdv{}{x}(x^2y) + \pdv{}{y}(yz) + \pdv{}{z}(xz^2) = 2xy + z + 2xz$, which is $5$ at $(1,1,1)$. For the curl, with $P = x^2y$, $Q = yz$, $R = xz^2$:

$$
\nabla\times\mathbf{F} = \bigl(R_y - Q_z,\ P_z - R_x,\ Q_x - P_y\bigr) = \bigl(0 - y,\ 0 - z^2,\ 0 - x^2\bigr) = (-y,\ -z^2,\ -x^2).
$$
:::
:::

Two second-order identities are used constantly.

::: theorem Curl of a gradient, divergence of a curl {#thm-identities}
If $f$ is a $C^2$ function and $\mathbf{F}$ a $C^2$ vector field on an open set in $\R^3$, then

$$
\nabla\times(\nabla f) = \mathbf{0} \qquad\text{and}\qquad \nabla\cdot(\nabla\times\mathbf{F}) = 0 .
$$
:::

::: proof
The first component of $\nabla\times\nabla f$ is $\pdv{}{y}f_z - \pdv{}{z}f_y = f_{zy} - f_{yz} = 0$ by Clairaut's theorem ([[multivariable/partial-derivatives#thm-clairaut]]), and the other two components are similar. For the second,

$$
\nabla\cdot(\nabla\times\mathbf{F}) = (R_y - Q_z)_x + (P_z - R_x)_y + (Q_x - P_y)_z = (R_{yx} - R_{xy}) + (P_{zy} - P_{yz}) + (Q_{xz} - Q_{zx}) = 0,
$$

again by Clairaut's theorem.
:::

The first identity gives the necessary condition for a field to be conservative from [[multivariable/line-integrals#thm-curl-test]]: if $\mathbf{F} = \nabla f$ then $\nabla\times\mathbf{F} = \mathbf{0}$. The second says that a curl field has no sources: as we shall see, its flux out of every closed surface is zero. Other useful rules follow from the product rule for derivatives; for instance, for a $C^1$ function $f$ and field $\mathbf{F}$,

$$
\nabla\cdot(f\mathbf{F}) = f\,\nabla\cdot\mathbf{F} + \nabla f\cdot\mathbf{F}, \qquad \nabla\times(f\mathbf{F}) = f\,\nabla\times\mathbf{F} + \nabla f\times\mathbf{F},
$$

as one checks component by component. Finally, the divergence of a gradient is the **Laplacian**

$$
\Delta f = \nabla\cdot\nabla f = f_{xx} + f_{yy} + f_{zz},
$$

the operator of Laplace's equation $\Delta f = 0$ ([[pde/laplace-equation]]), the heat equation and the wave equation.

::: quiz
Let $f$ be a function and $\mathbf{F}$ a vector field on $\R^3$, both smooth. Which of the following expressions is **meaningless**?
- [ ] $\nabla\cdot(\nabla\times\mathbf{F})$
- [x] $\nabla\times(\nabla\cdot\mathbf{F})$
- [ ] $\nabla(\nabla\cdot\mathbf{F})$
- [ ] $\nabla\cdot(\nabla f)$
::: solution
$\nabla\cdot\mathbf{F}$ is a scalar function, and the curl is only defined for vector fields, so $\nabla\times(\nabla\cdot\mathbf{F})$ makes no sense. The others are the divergence of a vector field (always $0$ here, by [[#thm-identities]]), the gradient of a scalar function, and the Laplacian $\Delta f$.
:::
:::

In the plane, the scalar curl $Q_x - P_y$ and the divergence $P_x + Q_y$ of a field $(P, Q)$ can be visualised by shading, as in the following figures.

::: widget vectorfield
P: sin(x)
Q: sin(y)
x: -3.5, 3.5
y: -3.5, 3.5
shade: divergence
cx: cos(t)
cy: sin(t)
t: 0, 2pi
caption: The field $(\sin x, \sin y)$, shaded by its divergence $\cos x + \cos y$. Near the origin the arrows spread apart (positive divergence: a source region); near the corners $(\pm\pi, \pm\pi)$ they converge (negative divergence: a sink region). The flux out of the unit circle is positive, because it equals the integral of the divergence over the disc. Drag the circle into a sink region and the flux becomes negative.
:::

::: widget vectorfield
P: y
Q: 0
x: -2, 2
y: -2, 2
shade: curl
streamlines: true
cx: 1 + 0.5*cos(t)
cy: 0.5*sin(t)
t: 0, 2pi
caption: A shear flow $(y, 0)$: every streamline is a straight horizontal line, yet the curl is $-1$ everywhere. A small paddle wheel placed in the flow turns clockwise, because the water above it moves faster (to the right) than the water below. The circulation around any circle of radius $\tfrac12$ is $-\pi/4$, the curl times the area — wherever you put the circle. Curl measures local spinning, not curved streamlines.
:::

## Stokes' theorem

Green's theorem relates the circulation around the boundary of a plane region to the scalar curl inside. Stokes' theorem allows the region to be a curved surface in space. We must first match up orientations.

::: definition Positively oriented boundary {#def-positive-boundary}
Let $S$ be an oriented surface with unit normal $\mathbf{n}$, bounded by a closed curve (or several curves) $C$. The orientation of $C$ is **positive** (or **induced** by $\mathbf{n}$) if, when you walk along $C$ with your head pointing in the direction of $\mathbf{n}$, the surface is on your left. Equivalently: if the fingers of your right hand curl in the direction of $C$, your thumb points along $\mathbf{n}$.
:::

For a region in the $xy$-plane with normal $\mathbf{k}$ this is the anticlockwise orientation of Green's theorem. For the upper hemisphere with the outward (upward) normal, its boundary, the equator, is positively oriented when traversed anticlockwise as seen from above.

::: theorem Stokes' theorem {#thm-stokes}
Let $S$ be an oriented, piecewise smooth surface whose boundary $C$ consists of finitely many piecewise smooth simple closed curves with the positive orientation, and let $\mathbf{F}$ be a $C^1$ vector field on an open set containing $S$. Then

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} = \iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S} .
$$ {#eq-stokes}
:::

We prove the theorem when $S$ is a graph, by reducing it to Green's theorem; this is the heart of the matter.

::: proof
*Case of a graph.* Suppose $S$ is the graph $z = g(x,y)$ of a $C^2$ function over a plane region $D$ to which Green's theorem applies, oriented upwards, and let $\mathbf{F} = (P, Q, R)$. Let the boundary $\partial D$ be parametrised anticlockwise by $(x(t), y(t))$, $a\le t\le b$. Then the boundary of $S$ is parametrised by $\mathbf{r}(t) = \bigl(x(t), y(t), g(x(t), y(t))\bigr)$, and this is the positive orientation for the upward normal. Along it $z' = g_x x' + g_y y'$ by the chain rule, so

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} = \int_a^b\bigl(Px' + Qy' + R(g_xx' + g_yy')\bigr)\,dt = \oint_{\partial D}\bigl(P + Rg_x\bigr)\,dx + \bigl(Q + Rg_y\bigr)\,dy,
$$

where $P, Q, R$ are evaluated at $(x, y, g(x,y))$. By Green's theorem this equals

$$
\iint_D\left[\pdv{}{x}\bigl(Q + Rg_y\bigr) - \pdv{}{y}\bigl(P + Rg_x\bigr)\right]dA .
$$

Now differentiate, remembering that $P, Q, R$ depend on $x$ and $y$ also through $z = g(x,y)$:

$$
\begin{aligned}
\pdv{}{x}\bigl(Q + Rg_y\bigr) &= Q_x + Q_zg_x + (R_x + R_zg_x)\,g_y + R\,g_{yx},\\
\pdv{}{y}\bigl(P + Rg_x\bigr) &= P_y + P_zg_y + (R_y + R_zg_y)\,g_x + R\,g_{xy}.
\end{aligned}
$$

Subtracting, the terms $R_zg_xg_y$ cancel, and so do $Rg_{yx}$ and $Rg_{xy}$ by Clairaut's theorem. What remains is

$$
(Q_x - P_y) + g_x(Q_z - R_y) + g_y(R_x - P_z) = -(R_y - Q_z)\,g_x - (P_z - R_x)\,g_y + (Q_x - P_y).
$$

By [[multivariable/surface-integrals#eq-flux-graph]], the integral of exactly this expression over $D$ is the upward flux of $\nabla\times\mathbf{F} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y)$ through $S$. This proves [[#eq-stokes]] for graphs.

*General surfaces (sketch).* A piecewise smooth surface can be cut into finitely many pieces, each of which is a graph over one of the three coordinate planes. Apply the graph case to each piece, with the boundaries positively oriented, and add. Each cut is part of the boundary of two pieces, traversed in opposite directions, so the line integrals along the cuts cancel; what remains is the integral around $C$. Details (including surfaces that are not graphs over any plane near some points) are in Marsden and Tromba, *Vector Calculus*, §8.2, and Apostol, *Calculus*, Vol. II, §12.11.
:::

::: example Stokes' theorem on a hemisphere {#ex-hemisphere}
Verify Stokes' theorem for $\mathbf{F} = (-y,\ x,\ z)$ and the upper half $S$ of the unit sphere, oriented outwards.
::: solution
The boundary is the unit circle in the $xy$-plane, anticlockwise from above: $\mathbf{r}(t) = (\cos t, \sin t, 0)$. Then

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} = \int_0^{2\pi}\bigl((-\sin t)(-\sin t) + \cos t\cos t + 0\bigr)\,dt = 2\pi .
$$

On the other side, $\nabla\times\mathbf{F} = (0 - 0,\ 0 - 0,\ 1 - (-1)) = (0, 0, 2)$. On the unit sphere $\mathbf{n} = (x, y, z)$, so $(\nabla\times\mathbf{F})\cdot\mathbf{n} = 2z$, and with $z = \cos\phi$, $dS = \sin\phi\,d\phi\,d\theta$,

$$
\iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S} = \int_0^{2\pi}\int_0^{\pi/2}2\cos\phi\sin\phi\,d\phi\,d\theta = 2\pi\Bigl[\sin^2\phi\Bigr]_0^{\pi/2} = 2\pi .
$$

Both sides equal $2\pi$. Notice that the flat unit disc, with normal $\mathbf{k}$, gives the flux $\iint 2\,dA = 2\pi$ even more quickly — a first instance of the next corollary.
:::
:::

::: corollary Surface independence {#cor-surface-independence}
If $S_1$ and $S_2$ are two oriented surfaces with the same positively oriented boundary curve $C$, then $\iint_{S_1}(\nabla\times\mathbf{F})\cdot d\mathbf{S} = \iint_{S_2}(\nabla\times\mathbf{F})\cdot d\mathbf{S}$. In particular, the flux of a curl field out of a closed surface (which has no boundary) is zero.
:::

::: proof
Both integrals equal $\oint_C\mathbf{F}\cdot d\mathbf{r}$ by Stokes' theorem. A closed surface can be cut by a curve $C$ into two pieces whose induced boundary orientations are opposite; the two fluxes are $\oint_C\mathbf{F}\cdot d\mathbf{r}$ and $-\oint_C\mathbf{F}\cdot d\mathbf{r}$, which add to zero.
:::

So when the flux of a curl is wanted, we may replace the given surface by any more convenient one with the same boundary — usually a flat one.

::: widget surface
fx: u*cos(v)
fy: u*sin(v)
fz: h*(1 - u^2)
u: 0, 1
v: 0, 2pi
sliders: h=1:-1:1.5:0.05
color: height
caption: A family of caps $z = h(1 - x^2 - y^2)$ over the unit disc, all with the same boundary circle. Move $h$ from a dome through the flat disc ($h = 0$) to a bowl. By [[#cor-surface-independence]], the flux of any curl field through all of these surfaces is the same — equal to the circulation around the common boundary. Only the boundary matters.
:::

::: example Choosing a convenient surface {#ex-stokes-plane}
Let $C$ be the curve in which the plane $z = 2 - x$ meets the cylinder $x^2 + y^2 = 1$, traversed anticlockwise as seen from above. Compute $\oint_C\mathbf{F}\cdot d\mathbf{r}$ for $\mathbf{F} = (-y^3,\ x^3,\ z)$.
::: solution
$\nabla\times\mathbf{F} = \bigl(0 - 0,\ 0 - 0,\ 3x^2 + 3y^2\bigr)$. Take for $S$ the part of the plane $z = 2 - x$ inside the cylinder, a graph over the unit disc $D$, oriented upwards to match the direction of $C$. By [[multivariable/surface-integrals#eq-flux-graph]], only the third component of the curl contributes:

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} = \iint_D3(x^2 + y^2)\,dA = \int_0^{2\pi}\int_0^1 3r^2\cdot r\,dr\,d\theta = \frac{3\pi}{2}.
$$

Directly, with $\mathbf{r}(t) = (\cos t, \sin t, 2 - \cos t)$, the integrand is $\sin^4t + \cos^4t + (2 - \cos t)\sin t$, whose integral over $[0, 2\pi]$ is again $\tfrac{3\pi}{2}$ — but Stokes' theorem gets there with less work.
:::
:::

::: quiz
$S$ is the cone $z = \sqrt{x^2+y^2}$, $0\le z\le1$, with the normal pointing downwards and outwards (away from the $z$-axis). How must its boundary circle $z = 1$ be traversed for Stokes' theorem to hold?
- [ ] Anticlockwise as seen from above
- [x] Clockwise as seen from above
- [ ] Either way: the line integral does not depend on the direction
- [ ] Stokes' theorem does not apply, because the cone has a vertex
::: solution
Walk along the rim with your head along the normal, which points down and out; for the cone to be on your left you must walk clockwise as seen from above. (Reverse the normal and the direction reverses too.) The direction does matter: reversing it changes the sign of the line integral. The vertex is a single point, and a piecewise smooth surface with such a point is allowed.
:::
:::

### Curl as circulation density

Stokes' theorem gives the curl a meaning independent of coordinates.

::: theorem Curl as circulation per unit area {#thm-curl-density}
Let $\mathbf{F}$ be $C^1$ near a point $\mathbf{p}$, let $\mathbf{n}$ be a unit vector, and let $C_r$ be the circle of radius $r$ centred at $\mathbf{p}$ in the plane through $\mathbf{p}$ perpendicular to $\mathbf{n}$, oriented positively with respect to $\mathbf{n}$. Then

$$
(\nabla\times\mathbf{F})(\mathbf{p})\cdot\mathbf{n} = \lim_{r\to0}\frac{1}{\pi r^2}\oint_{C_r}\mathbf{F}\cdot d\mathbf{r}.
$$
:::

::: proof
Let $D_r$ be the flat disc bounded by $C_r$, with normal $\mathbf{n}$. By Stokes' theorem, $\oint_{C_r}\mathbf{F}\cdot d\mathbf{r} = \iint_{D_r}(\nabla\times\mathbf{F})\cdot\mathbf{n}\,dS$. The integrand is continuous, so by the mean value theorem for integrals ([[multivariable/multiple-integrals#thm-mvt-integral]], applied in the plane of the disc) the right-hand side equals $\pi r^2\,(\nabla\times\mathbf{F})(\mathbf{q}_r)\cdot\mathbf{n}$ for some $\mathbf{q}_r\in D_r$. Divide by $\pi r^2$ and let $r\to0$: $\mathbf{q}_r\to\mathbf{p}$, and continuity gives the result.
:::

So the component of the curl along $\mathbf{n}$ is the circulation per unit area in the plane perpendicular to $\mathbf{n}$, and the curl itself points along the axis about which the circulation is greatest. A tiny paddle wheel in a fluid with velocity $\mathbf{v}$ spins fastest when its axis is aligned with $\nabla\times\mathbf{v}$, at angular speed $\tfrac12\norm{\nabla\times\mathbf{v}}$ — consistent with $\nabla\times(\boldsymbol\omega\times\mathbf{x}) = 2\boldsymbol\omega$ for a rigid rotation.

## The divergence theorem

Now let $E$ be a solid region in space whose boundary is a closed surface $S$, oriented outwards. If $\mathbf{F}$ is the velocity of a fluid, the flux $\iint_S\mathbf{F}\cdot d\mathbf{S}$ is the net rate at which fluid leaves $E$. If fluid is neither created nor destroyed inside, this outflow must be produced by the expansion of the fluid inside $E$ — which is what the divergence measures.

::: theorem The divergence theorem {#thm-divergence}
Let $E$ be a bounded solid region whose boundary $S$ is a piecewise smooth closed surface (or several), oriented outwards, and let $\mathbf{F}$ be a $C^1$ vector field on an open set containing $E$. Then

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \iiint_E\nabla\cdot\mathbf{F}\,dV .
$$ {#eq-divergence}
:::

::: proof
We prove the theorem for a **simple solid region**: one that can be described in each of the three ways

$$
u_1(x,y)\le z\le u_2(x,y), \qquad v_1(x,z)\le y\le v_2(x,z), \qquad w_1(y,z)\le x\le w_2(y,z),
$$

with $(x,y)$, $(x,z)$, $(y,z)$ ranging over regions in the coordinate planes and the bounding functions continuously differentiable. Balls, boxes, cylinders and tetrahedra are simple. Write $\mathbf{F} = (P, Q, R)$ and $\mathbf{n} = (n_1, n_2, n_3)$. Since $\mathbf{F}\cdot\mathbf{n} = Pn_1 + Qn_2 + Rn_3$ and $\nabla\cdot\mathbf{F} = P_x + Q_y + R_z$, it suffices to prove the three identities

$$
\iint_S Pn_1\,dS = \iiint_E P_x\,dV, \qquad \iint_S Qn_2\,dS = \iiint_E Q_y\,dV, \qquad \iint_S Rn_3\,dS = \iiint_E R_z\,dV .
$$

We prove the third; the other two are the same with the roles of the variables permuted, using the other two descriptions of $E$. Use the description $E = \set{(x,y)\in D,\ u_1(x,y)\le z\le u_2(x,y)}$. By Fubini's theorem and the fundamental theorem of calculus in $z$,

$$
\iiint_E R_z\,dV = \iint_D\left(\int_{u_1(x,y)}^{u_2(x,y)}R_z\,dz\right)dA = \iint_D\bigl[R(x,y,u_2(x,y)) - R(x,y,u_1(x,y))\bigr]\,dA .
$$

The boundary $S$ consists of a top $S_2$ (the graph of $u_2$), a bottom $S_1$ (the graph of $u_1$) and possibly a vertical side $S_3$ over the boundary of $D$. On $S_3$ the outward normal is horizontal, so $n_3 = 0$ and $S_3$ contributes nothing. On $S_2$ the outward normal points upwards, so by [[multivariable/surface-integrals#eq-flux-graph]] applied to the field $(0, 0, R)$, $\iint_{S_2}Rn_3\,dS = \iint_D R(x,y,u_2(x,y))\,dA$. On $S_1$ the outward normal points downwards, which reverses the sign: $\iint_{S_1}Rn_3\,dS = -\iint_D R(x,y,u_1(x,y))\,dA$. Adding the three contributions gives exactly the expression above.

*General regions (sketch).* A region bounded by piecewise smooth surfaces can be cut into finitely many simple pieces. Applying the theorem to each and adding, the volume integrals add up to $\iiint_E$, and on each cut the two adjacent pieces have opposite outward normals, so those fluxes cancel; only the flux through $S$ survives. This also covers regions with holes, whose boundary consists of several closed surfaces. See Marsden and Tromba, *Vector Calculus*, §8.4.
:::

::: example A flux through a sphere {#ex-ball-flux}
Find the outward flux of $\mathbf{F} = (xy^2,\ yz^2,\ zx^2)$ through the unit sphere.
::: solution
A direct computation would be unpleasant, but $\nabla\cdot\mathbf{F} = y^2 + z^2 + x^2 = \rho^2$. By the divergence theorem, in spherical coordinates,

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \iiint_B\rho^2\,dV = \int_0^{2\pi}\int_0^\pi\int_0^1\rho^2\cdot\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot2\cdot\frac15 = \frac{4\pi}{5}.
$$

For the field $(x, y, z)$, whose divergence is $3$, the same theorem gives $3\cdot\tfrac43\pi R^3 = 4\pi R^3$ through the sphere of radius $R$, agreeing with the direct computation: on the sphere $\mathbf{F}\cdot\mathbf{n} = R$, so the flux is $R\cdot4\pi R^2$.
:::
:::

::: quiz
What is the outward flux of $\mathbf{F} = (x,\ 0,\ 0)$ through the surface of the cube $[0,2]^3$?
- [ ] $0$, because the field is parallel to four of the faces
- [ ] $4$
- [x] $8$
- [ ] $24$
::: solution
$\nabla\cdot\mathbf{F} = 1$, so the flux is the volume of the cube, $8$. Directly: only the faces $x = 0$ (where $\mathbf{F} = \mathbf{0}$) and $x = 2$ (where $\mathbf{F}\cdot\mathbf{n} = 2$ over an area $4$) contribute, giving $0 + 8 = 8$.
:::
:::

::: theorem Divergence as flux density {#thm-div-density}
If $\mathbf{F}$ is $C^1$ near $\mathbf{p}$ and $S_r$ is the sphere of radius $r$ centred at $\mathbf{p}$, oriented outwards, then

$$
(\nabla\cdot\mathbf{F})(\mathbf{p}) = \lim_{r\to0}\frac{1}{\tfrac43\pi r^3}\iint_{S_r}\mathbf{F}\cdot d\mathbf{S} .
$$
:::

::: proof
By the divergence theorem the flux equals $\iiint_{B_r}\nabla\cdot\mathbf{F}\,dV$, and by the mean value theorem for triple integrals (proved exactly as [[multivariable/multiple-integrals#thm-mvt-integral]]) this is $\tfrac43\pi r^3\,(\nabla\cdot\mathbf{F})(\mathbf{q}_r)$ for some $\mathbf{q}_r$ in the ball. As $r\to0$, $\mathbf{q}_r\to\mathbf{p}$ and continuity gives the result.
:::

So the divergence is the net outward flux per unit volume: positive at a source, negative at a sink, zero where the flow neither expands nor compresses. A field with zero divergence everywhere is called **incompressible** or **solenoidal**.

### Gauss's law

The inverse-square field $\mathbf{F} = \mathbf{x}/\norm{\mathbf{x}}^3$ has zero divergence everywhere except at the origin, where it is not defined. The divergence theorem explains why its flux through spheres centred at the origin was always $4\pi$ ([[multivariable/surface-integrals]]).

::: example Gauss's law for a point charge {#ex-gauss-law}
Let $S$ be any closed piecewise smooth surface, oriented outwards, not passing through the origin. Show that the flux of $\mathbf{F} = \mathbf{x}/\norm{\mathbf{x}}^3$ through $S$ is $4\pi$ if $S$ encloses the origin and $0$ if it does not.
::: solution
Let $E$ be the solid bounded by $S$. If the origin is not in $E$, then $\mathbf{F}$ is $C^1$ on an open set containing $E$ and $\nabla\cdot\mathbf{F} = 0$ there, so the flux is $\iiint_E0\,dV = 0$.

If the origin is inside $E$, the theorem cannot be applied to $E$ directly. Choose $\eps > 0$ so small that the ball $B_\eps$ of radius $\eps$ about the origin lies inside $E$, and apply the divergence theorem to the region $E' = E\setminus B_\eps$, on which $\mathbf{F}$ is $C^1$ with zero divergence. The boundary of $E'$ consists of $S$, oriented outwards, and the small sphere $S_\eps$, whose outward normal *from $E'$* points towards the origin. Hence

$$
0 = \iiint_{E'}\nabla\cdot\mathbf{F}\,dV = \iint_S\mathbf{F}\cdot d\mathbf{S} - \iint_{S_\eps,\ \text{outwards}}\mathbf{F}\cdot d\mathbf{S},
$$

and so the flux through $S$ equals the outward flux through the small sphere, which is $4\pi$ by [[multivariable/surface-integrals#ex-inverse-square]].
:::
:::

::: application Gauss's law and the inverse-square law
The electric field of a point charge $q$ at the origin is $\mathbf{E} = \dfrac{q}{4\pi\varepsilon_0}\dfrac{\mathbf{x}}{\norm{\mathbf{x}}^3}$, so by [[#ex-gauss-law]] its flux through any closed surface is $q/\varepsilon_0$ if the surface encloses the charge and $0$ otherwise. By superposition, for any distribution of charges the flux of $\mathbf{E}$ out of a closed surface is the total enclosed charge divided by $\varepsilon_0$ — **Gauss's law**. Applying [[#thm-div-density]] to a continuous charge density $\rho$ turns this integral law into the differential law $\nabla\cdot\mathbf{E} = \rho/\varepsilon_0$, the first of Maxwell's equations. Newtonian gravity works the same way, which is why a spherical planet attracts outside bodies as if all its mass were at its centre.
:::

::: application Conservation laws
Let $\rho(\mathbf{x}, t)$ be the density of a fluid moving with velocity $\mathbf{v}(\mathbf{x}, t)$. For any fixed region $E$ with boundary $S$, the mass inside can change only by flow across $S$:

$$
\frac{d}{dt}\iiint_E\rho\,dV = -\iint_S\rho\mathbf{v}\cdot d\mathbf{S} = -\iiint_E\nabla\cdot(\rho\mathbf{v})\,dV .
$$

So $\iiint_E\left(\pdv{\rho}{t} + \nabla\cdot(\rho\mathbf{v})\right)dV = 0$ for *every* region $E$, and since the integrand is continuous it must vanish identically (otherwise it would have a fixed sign on some small ball). This gives the **continuity equation** $\pdv{\rho}{t} + \nabla\cdot(\rho\mathbf{v}) = 0$. The same argument applied to heat, with Fourier's law $\mathbf{q} = -k\nabla u$ for the heat flux, gives the heat equation $\pdv{u}{t} = \kappa\,\Delta u$ ([[pde/heat-equation]]). Turning a balance law for every region into a differential equation at every point is one of the main uses of the divergence theorem.
:::

::: warning Check the hypotheses: smoothness and closed surfaces
The divergence theorem needs $\mathbf{F}$ to be $C^1$ on the *whole* solid, and the surface to be *closed*. The inverse-square field has $\nabla\cdot\mathbf{F} = 0$ wherever it is defined, yet its flux through the unit sphere is $4\pi$, not $0$ — the field is undefined at the origin, inside the sphere. And for an open surface such as a hemisphere there is no enclosed solid: to use the theorem, first close the surface (add the flat disc), then subtract the flux through the added piece. Similarly, Stokes' theorem needs $\mathbf{F}$ to be $C^1$ on the whole surface, not just on its boundary.
:::

## One theorem in many guises

The theorems of this course share a single form:

| theorem | region | boundary | statement |
|---|---|---|---|
| fundamental theorem of calculus | interval $[a,b]$ | two points | $\int_a^bF'\,dx = F(b) - F(a)$ |
| line integrals ([[multivariable/line-integrals#thm-ftli]]) | curve $C$ | two endpoints | $\int_C\nabla f\cdot d\mathbf{r} = f(B) - f(A)$ |
| Green | plane region $D$ | closed curve | $\iint_D(Q_x - P_y)\,dA = \oint_{\partial D}P\,dx + Q\,dy$ |
| Stokes | surface $S$ | closed curve | $\iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S} = \oint_{\partial S}\mathbf{F}\cdot d\mathbf{r}$ |
| divergence | solid $E$ | closed surface | $\iiint_E\nabla\cdot\mathbf{F}\,dV = \oiint_{\partial E}\mathbf{F}\cdot d\mathbf{S}$ |

In each case, integrating a derivative over a region equals integrating the original object over the boundary, with orientations matched. Notice also the chain gradient $\to$ curl $\to$ divergence, with $\nabla\times\nabla f = \mathbf{0}$ and $\nabla\cdot(\nabla\times\mathbf{F}) = 0$: applying two successive derivatives always gives zero, matching the fact that the boundary of a region has no boundary of its own.

::: remark The general Stokes theorem
In the language of differential forms all five statements are one: for an oriented $k$-dimensional manifold $M$ with boundary $\partial M$ and a $(k-1)$-form $\omega$,

$$
\int_M d\omega = \int_{\partial M}\omega .
$$

Here $d$ is the exterior derivative, which in $\R^3$ acts as the gradient on functions, as the curl on 1-forms and as the divergence on 2-forms, and $d(d\omega) = 0$ is [[#thm-identities]]. This **generalised Stokes theorem** holds in every dimension; it is developed in Spivak, *Calculus on Manifolds*, ch. 5, and in Hubbard and Hubbard, *Vector Calculus, Linear Algebra, and Differential Forms*, ch. 6.
:::

::: history
Special cases of the divergence theorem appear in the work of Lagrange (1762) and Gauss (1813) on gravitation, and the theorem was proved in general form by Mikhail Ostrogradsky, who presented it to the Paris Academy in 1826 and published it in St Petersburg in 1831; the theorem is often called the Gauss–Ostrogradsky theorem. George Green's 1828 essay contained closely related identities. The theorem now called Stokes' theorem first appeared in a letter from William Thomson (later Lord Kelvin) to George Gabriel Stokes in July 1850; Stokes set it as a question in the Smith's Prize examination at Cambridge in 1854, and James Clerk Maxwell, who sat that examination, attributed it to Stokes in his *Treatise on Electricity and Magnetism* (1873), where the theorems became central to physics. The unifying formula $\int_M d\omega = \int_{\partial M}\omega$ emerged in the early twentieth century from Élie Cartan's calculus of differential forms.
:::

## Where this leads

Stokes' and Gauss's theorems are the bridge between the integral and differential forms of the laws of physics: Maxwell's equations, the equations of fluid dynamics, and conservation laws in general ([[pde/heat-equation]], [[pde/wave-equation]], [[pde/laplace-equation]]). In complex analysis, Green's theorem applied to the real and imaginary parts of an analytic function proves Cauchy's theorem ([[complex-analysis/cauchy-theorem]]). In differential geometry, the Gauss–Bonnet theorem ([[differential-geometry/geodesics-gauss-bonnet]]) is proved by applying Green's theorem in coordinates on a surface. And the observation that curl-free fields need not be gradients when the domain has holes is the beginning of de Rham cohomology, which measures the holes of a space with calculus ([[topology/fundamental-group]]).

::: summary
- $\nabla\cdot\mathbf{F} = P_x + Q_y + R_z$ measures expansion (outward flux per unit volume, [[#thm-div-density]]); $\nabla\times\mathbf{F} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y)$ measures rotation (circulation per unit area, [[#thm-curl-density]]).
- $\nabla\times\nabla f = \mathbf{0}$ and $\nabla\cdot(\nabla\times\mathbf{F}) = 0$ for $C^2$ fields ([[#thm-identities]]); $\Delta f = \nabla\cdot\nabla f$ is the Laplacian.
- Stokes: $\oint_{\partial S}\mathbf{F}\cdot d\mathbf{r} = \iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S}$, with the boundary oriented by the right-hand rule ([[#thm-stokes]]). The proof for graphs reduces to Green's theorem.
- The flux of a curl depends only on the boundary curve; replace the surface by a convenient one, often flat ([[#cor-surface-independence]]).
- Divergence theorem: $\oiint_{\partial E}\mathbf{F}\cdot d\mathbf{S} = \iiint_E\nabla\cdot\mathbf{F}\,dV$ for outward orientation ([[#thm-divergence]]); proved by the fundamental theorem of calculus in each coordinate direction.
- Singularities inside the region must be cut out: the inverse-square field has flux $4\pi$ through every closed surface around the origin (Gauss's law).
- Both theorems turn balance laws for every region into differential equations, and are cases of $\int_M d\omega = \int_{\partial M}\omega$.
:::

## Exercises

::: exercise A divergence {level=1 check="5"}
Find $\nabla\cdot\mathbf{F}$ at $(1, 1, 1)$ for $\mathbf{F} = (x^2y,\ yz,\ xz^2)$.
::: solution
$\nabla\cdot\mathbf{F} = 2xy + z + 2xz$, which is $2 + 1 + 2 = 5$ at $(1,1,1)$ (see [[#ex-div-curl]]).
:::
:::

::: exercise A curl-free field {level=1}
Show that $\mathbf{F} = (yz,\ xz,\ xy)$ has zero curl, and find a function $f$ with $\nabla f = \mathbf{F}$.
::: solution
$\nabla\times\mathbf{F} = (x - x,\ y - y,\ z - z) = \mathbf{0}$. Since $\R^3$ is star-shaped, $\mathbf{F}$ is conservative ([[multivariable/line-integrals#thm-star-shaped]]), and $f = xyz$ works: $\nabla(xyz) = (yz, xz, xy)$.
:::
:::

::: exercise Flux out of a cube {level=1 check="3"}
Find the outward flux of $\mathbf{F} = (x, y, z)$ through the surface of the unit cube $[0,1]^3$.
::: solution
$\nabla\cdot\mathbf{F} = 3$, so by the divergence theorem the flux is $3\cdot\text{vol} = 3$. (Directly: only the three faces $x = 1$, $y = 1$, $z = 1$ contribute, each with $\mathbf{F}\cdot\mathbf{n} = 1$ over area $1$.)
:::
:::

::: exercise Flux of a cubic field {level=2 check="12*pi/5"}
Find the outward flux of $\mathbf{F} = (x^3,\ y^3,\ z^3)$ through the unit sphere.
::: solution
$\nabla\cdot\mathbf{F} = 3(x^2 + y^2 + z^2) = 3\rho^2$, so the flux is $\int_0^{2\pi}\int_0^\pi\int_0^1 3\rho^2\cdot\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 3\cdot\tfrac{4\pi}{5} = \tfrac{12\pi}{5}$.
:::
:::

::: exercise A circulation by Stokes' theorem {level=2 check="-pi"}
Use Stokes' theorem to compute $\oint_C\mathbf{F}\cdot d\mathbf{r}$ for $\mathbf{F} = (y,\ z,\ x)$, where $C$ is the unit circle $x^2 + y^2 = 1$, $z = 0$, traversed anticlockwise as seen from above. Check by computing the line integral directly.
::: solution
$\nabla\times\mathbf{F} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y) = (0 - 1,\ 0 - 1,\ 0 - 1) = (-1,-1,-1)$. Take $S$ to be the unit disc with normal $\mathbf{k}$: the flux of the curl is $\iint_S(-1)\,dA = -\pi$. Directly, with $\mathbf{r}(t) = (\cos t, \sin t, 0)$: $\mathbf{F}\cdot\mathbf{r}' = \sin t\cdot(-\sin t) + 0 + 0$, and $\int_0^{2\pi}-\sin^2t\,dt = -\pi$.
:::
:::

::: exercise Flux of a curl through a hemisphere {level=2 check="0"}
Let $\mathbf{F} = (xz,\ yz,\ xy)$ and let $S$ be the upper unit hemisphere, oriented upwards. Find $\iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S}$.
::: solution
By Stokes' theorem the flux equals $\oint_C\mathbf{F}\cdot d\mathbf{r}$ around the unit circle in the plane $z = 0$. There $\mathbf{F} = (0, 0, xy)$ and $d\mathbf{r} = (dx, dy, 0)$, so the integrand vanishes and the flux is $0$. (Check: $\nabla\times\mathbf{F} = (x - y,\ x - y,\ 0)$ and on the sphere $(\nabla\times\mathbf{F})\cdot\mathbf{n} = (x - y)x + (x - y)y = x^2 - y^2$, whose integral over the hemisphere vanishes by the symmetry $x\leftrightarrow y$.)
:::
:::

::: exercise Gauss's law for an ellipsoid {level=2 check="4*pi"}
Find the outward flux of $\mathbf{F} = \mathbf{x}/\norm{\mathbf{x}}^3$ through the ellipsoid $\dfrac{x^2}{4} + \dfrac{y^2}{9} + z^2 = 1$.
::: solution
The ellipsoid is a closed surface enclosing the origin, so by [[#ex-gauss-law]] the flux is $4\pi$ — no parametrisation of the ellipsoid is needed.
:::
:::

::: exercise Volume as a flux {level=2}
Show that the volume of a solid $E$ with outward-oriented boundary $S$ is $\dfrac13\iint_S\mathbf{x}\cdot d\mathbf{S}$, where $\mathbf{x} = (x, y, z)$, and check the formula for the ball of radius $R$.
::: solution
$\nabla\cdot\mathbf{x} = 3$, so by the divergence theorem $\iint_S\mathbf{x}\cdot d\mathbf{S} = \iiint_E3\,dV = 3\,\text{vol}(E)$. For the sphere of radius $R$, $\mathbf{x}\cdot\mathbf{n} = R$ everywhere, so $\tfrac13\iint_S\mathbf{x}\cdot d\mathbf{S} = \tfrac13R\cdot4\pi R^2 = \tfrac43\pi R^3$. (This is the three-dimensional analogue of the area formula $\tfrac12\oint(x\,dy - y\,dx)$ of [[multivariable/greens-theorem#cor-area]].)
:::
:::

::: exercise The curl of a curl {level=3}
Prove that for a $C^2$ vector field $\mathbf{F}$, $\nabla\times(\nabla\times\mathbf{F}) = \nabla(\nabla\cdot\mathbf{F}) - \Delta\mathbf{F}$, where $\Delta\mathbf{F} = (\Delta P, \Delta Q, \Delta R)$. Deduce that if $\nabla\cdot\mathbf{E} = 0$ and $\nabla\times\mathbf{E} = -\pdv{\mathbf{B}}{t}$, $\nabla\times\mathbf{B} = \mu_0\varepsilon_0\pdv{\mathbf{E}}{t}$ (Maxwell's equations in empty space), then each component of $\mathbf{E}$ satisfies the wave equation $\pdv{^2E}{t^2} = c^2\Delta E$ with $c^2 = 1/(\mu_0\varepsilon_0)$.
::: solution
Compare first components. The first component of $\nabla\times\mathbf{G}$ is $G_{3,y} - G_{2,z}$; with $\mathbf{G} = \nabla\times\mathbf{F} = (R_y - Q_z,\ P_z - R_x,\ Q_x - P_y)$ it is

$$
(Q_x - P_y)_y - (P_z - R_x)_z = Q_{xy} + R_{xz} - P_{yy} - P_{zz} .
$$

The first component of $\nabla(\nabla\cdot\mathbf{F}) - \Delta\mathbf{F}$ is $(P_x + Q_y + R_z)_x - (P_{xx} + P_{yy} + P_{zz}) = Q_{yx} + R_{zx} - P_{yy} - P_{zz}$, which is the same by Clairaut's theorem. The other components follow by cyclic symmetry. For Maxwell's equations, take the curl of $\nabla\times\mathbf{E} = -\partial_t\mathbf{B}$ and exchange the order of the space and time derivatives:

$$
\nabla(\nabla\cdot\mathbf{E}) - \Delta\mathbf{E} = -\pdv{}{t}(\nabla\times\mathbf{B}) = -\mu_0\varepsilon_0\pdv{^2\mathbf{E}}{t^2}.
$$

Since $\nabla\cdot\mathbf{E} = 0$, this says $\pdv{^2\mathbf{E}}{t^2} = \frac{1}{\mu_0\varepsilon_0}\Delta\mathbf{E}$: electromagnetic waves travel at speed $c = 1/\sqrt{\mu_0\varepsilon_0}$, the speed of light — Maxwell's great discovery ([[pde/wave-equation]]).
:::
:::

::: exercise Divergence-free fields and surface independence {level=3}
Let $\mathbf{G}$ be a $C^1$ field on $\R^3$ with $\nabla\cdot\mathbf{G} = 0$. Let $S_1$ and $S_2$ be two oriented surfaces with the same boundary curve $C$ and the same induced orientation on $C$, such that together they bound a solid region $E$. Prove that $\iint_{S_1}\mathbf{G}\cdot d\mathbf{S} = \iint_{S_2}\mathbf{G}\cdot d\mathbf{S}$. How does this relate to [[#cor-surface-independence]]?
::: hint
The boundary of $E$ is $S_1$ together with $S_2$, but one of them has the "wrong" orientation for an outward normal.
:::
::: solution
Since $S_1$ and $S_2$ induce the same orientation on $C$, their normals cannot both point out of $E$: going round $C$, the two surfaces leave $C$ on opposite sides, so if $S_1$ is oriented outwards from $E$, then $S_2$ is oriented inwards (if it is the other way round, exchange the names). The outward-oriented boundary of $E$ is therefore $S_1$ together with $S_2$ with reversed orientation, and the divergence theorem gives

$$
\iint_{S_1}\mathbf{G}\cdot d\mathbf{S} - \iint_{S_2}\mathbf{G}\cdot d\mathbf{S} = \iiint_E\nabla\cdot\mathbf{G}\,dV = 0 .
$$

[[#cor-surface-independence]] is the special case $\mathbf{G} = \nabla\times\mathbf{F}$, which is divergence-free by [[#thm-identities]]. In fact on $\R^3$ every divergence-free field is a curl, so the two statements are equivalent — but proving that requires constructing a "vector potential", as in [[multivariable/line-integrals#thm-star-shaped]] for potentials.
:::
:::
