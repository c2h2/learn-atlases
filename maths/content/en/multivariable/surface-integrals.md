How much paint does it take to cover a dome? How much water flows each second through a fishing net held in a river? How much electric field "passes through" a closed surface surrounding a charge? The first question asks for the **area** of a curved surface, the second for the **flux** of a vector field through it, and the third — whose answer is the subject of Gauss's law — for the flux through a closed surface.

To answer them we need to describe surfaces by formulas and to integrate over them. The idea parallels arc length in [[multivariable/vector-functions]]: there we described a curve by a parametrisation $\mathbf{r}(t)$ and found that a small piece has length $\norm{\mathbf{r}'(t)}\,dt$; here we describe a surface by a parametrisation $\mathbf{r}(u,v)$ with *two* parameters, and a small piece turns out to have area $\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv$ — a cross product, because area in space is measured by cross products ([[multivariable/vectors-geometry#thm-cross-length]]). With this one formula we compute surface areas, integrals of functions over surfaces, and fluxes, which are the subject of the great integral theorems in [[multivariable/stokes-divergence]].

## Parametric surfaces

A curve is the image of an interval under a map into space; a surface is the image of a plane region.

::: definition Parametric surface {#def-parametric-surface}
A **parametric surface** is a continuous map $\mathbf{r}\colon D\to\R^3$ from a region $D$ in the $(u,v)$-plane,

$$
\mathbf{r}(u,v) = \bigl(x(u,v),\ y(u,v),\ z(u,v)\bigr), \qquad (u,v)\in D,
$$

together with its image $S = \mathbf{r}(D)$. If $\mathbf{r}$ is $C^1$, its partial derivatives $\mathbf{r}_u = \pdv{\mathbf{r}}{u}$ and $\mathbf{r}_v = \pdv{\mathbf{r}}{v}$ are the **tangent vectors** of the parametrisation, and the parametrisation is **regular** at $(u,v)$ if

$$
\mathbf{r}_u(u,v)\times\mathbf{r}_v(u,v) \ne \mathbf{0}.
$$

At a regular point the **tangent plane** to $S$ at $\mathbf{r}(u_0,v_0)$ is the plane through that point spanned by $\mathbf{r}_u$ and $\mathbf{r}_v$, with normal vector $\mathbf{r}_u\times\mathbf{r}_v$.
:::

Fixing $v = v_0$ and letting $u$ vary traces a curve on $S$, a **grid curve**, with velocity $\mathbf{r}_u$; fixing $u$ gives grid curves with velocity $\mathbf{r}_v$. Regularity says that these two velocities are not parallel, so they really do span a plane. Where regularity fails the surface may have a corner or cusp, or the parametrisation may simply be badly chosen at that point.

The standard examples:

- **Graphs.** A graph $z = f(x,y)$ over $D$ is parametrised by $\mathbf{r}(x,y) = (x, y, f(x,y))$. Then $\mathbf{r}_x = (1, 0, f_x)$, $\mathbf{r}_y = (0, 1, f_y)$ and $\mathbf{r}_x\times\mathbf{r}_y = (-f_x, -f_y, 1)$, which is never zero: graphs are always regular. The tangent plane agrees with [[multivariable/gradient#eq-tangent-plane]].
- **Spheres.** Spherical coordinates with $\rho = R$ give $\mathbf{r}(\phi,\theta) = (R\sin\phi\cos\theta,\ R\sin\phi\sin\theta,\ R\cos\phi)$, $0\le\phi\le\pi$, $0\le\theta\le2\pi$.
- **Cylinders and cones.** $\mathbf{r}(\theta, z) = (R\cos\theta, R\sin\theta, z)$, and the cone $z = \sqrt{x^2+y^2}$ as $\mathbf{r}(r,\theta) = (r\cos\theta, r\sin\theta, r)$.
- **Surfaces of revolution.** Rotating the curve $y = f(x)\ge0$, $a\le x\le b$, about the $x$-axis gives $\mathbf{r}(x,\theta) = (x,\ f(x)\cos\theta,\ f(x)\sin\theta)$.
- **The torus** with centre-circle radius $R$ and tube radius $a < R$: $\mathbf{r}(u,v) = \bigl((R + a\cos v)\cos u,\ (R + a\cos v)\sin u,\ a\sin v\bigr)$.

::: example The sphere's normal and its poles {#ex-sphere-normal}
Compute $\mathbf{r}_\phi\times\mathbf{r}_\theta$ for the sphere of radius $R$ and determine where the parametrisation is regular.
::: solution
Differentiating,

$$
\mathbf{r}_\phi = (R\cos\phi\cos\theta,\ R\cos\phi\sin\theta,\ -R\sin\phi), \qquad \mathbf{r}_\theta = (-R\sin\phi\sin\theta,\ R\sin\phi\cos\theta,\ 0).
$$

Their cross product is

$$
\mathbf{r}_\phi\times\mathbf{r}_\theta = \bigl(R^2\sin^2\phi\cos\theta,\ R^2\sin^2\phi\sin\theta,\ R^2\sin\phi\cos\phi\bigr) = R\sin\phi\;\mathbf{r}(\phi,\theta).
$$

Since $\sin\phi\ge0$, this is a non-negative multiple of the position vector: it points straight **outwards**, as a normal to a sphere centred at the origin should, and its length is $R^2\sin\phi$. It vanishes exactly when $\sin\phi = 0$, at the poles $\phi = 0, \pi$. There the grid curves $\phi = $ const shrink to a point. The sphere itself is perfectly smooth at its poles; it is the parametrisation that degenerates there, just as polar coordinates do at the origin.
:::
:::

::: widget surface
fx: u*cos(v)
fy: u*sin(v)
fz: c*v
u: -1, 1
v: 0, 4pi
sliders: c=0.3:0:1:0.05
color: height
caption: The helicoid $\mathbf{r}(u,v) = (u\cos v,\ u\sin v,\ cv)$, a spiral staircase. The grid curves $v = $ const are horizontal straight lines through the axis, and the curves $u = $ const are helices. Here $\norm{\mathbf{r}_u\times\mathbf{r}_v} = \sqrt{c^2 + u^2}$: the surface is stretched most at the outer edge. Set $c = 0$: the parametrisation covers the flat disc four times over (its centre infinitely often) and fails to be regular on the axis $u = 0$.
:::

## Surface area

Let $\mathbf{r}\colon D\to\R^3$ be a $C^1$ parametrisation that is one-to-one and regular on the interior of $D$. Cut $D$ into small rectangles $[u, u + \Delta u]\times[v, v + \Delta v]$. Each is mapped to a small curved patch of $S$ whose sides are, to first order, the vectors

$$
\mathbf{r}(u + \Delta u, v) - \mathbf{r}(u,v) \approx \mathbf{r}_u\,\Delta u, \qquad \mathbf{r}(u, v + \Delta v) - \mathbf{r}(u,v) \approx \mathbf{r}_v\,\Delta v .
$$

So the patch is nearly the parallelogram spanned by $\mathbf{r}_u\Delta u$ and $\mathbf{r}_v\Delta v$, whose area is $\norm{\mathbf{r}_u\times\mathbf{r}_v}\,\Delta u\,\Delta v$. Adding up and letting the rectangles shrink suggests the following definition.

::: definition Surface area {#def-surface-area}
The **area** of the surface $S$ parametrised by $\mathbf{r}\colon D\to\R^3$ (one-to-one and regular on the interior of $D$) is

$$
A(S) = \iint_D\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv .
$$

We write $dS = \norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv$ and call it the **area element** of $S$.
:::

Two remarks justify the definition. First, it gives the right answer for flat pieces: for a region in the plane $z = 0$ parametrised by $\mathbf{r}(u,v) = (x(u,v), y(u,v), 0)$, $\mathbf{r}_u\times\mathbf{r}_v = (0, 0, x_uy_v - x_vy_u)$, so the definition gives $\iint_D\abs{J}\,du\,dv$, which is the area by the change of variables theorem ([[multivariable/change-of-variables#thm-change-of-variables]]). Second, it does not depend on the parametrisation chosen ([[#thm-param-invariance]] below). One might hope instead to define area as a limit of areas of inscribed polyhedra, in analogy with arc length; surprisingly that fails, because triangles inscribed in a cylinder can be arranged to make the polyhedral areas grow without bound (an example of H. A. Schwarz).

For a graph the area element has a convenient form.

::: proposition Area of a graph {#prop-graph-area}
The area of the graph of a $C^1$ function $z = f(x,y)$ over $D$ is

$$
A = \iint_D\sqrt{1 + f_x^2 + f_y^2}\,dA .
$$
:::

::: proof
With $\mathbf{r}(x,y) = (x,y,f(x,y))$ we found $\mathbf{r}_x\times\mathbf{r}_y = (-f_x, -f_y, 1)$, whose length is $\sqrt{f_x^2 + f_y^2 + 1}$.
:::

The factor $\sqrt{1 + \norm{\nabla f}^2}\ge1$ is $1/\cos\gamma$, where $\gamma$ is the angle between the tangent plane and the horizontal: a tilted patch has more area than its shadow on the $xy$-plane.

::: example The area of a sphere {#ex-sphere-area}
Find the area of the sphere of radius $R$, and of the zone of it between the planes $z = c$ and $z = d$ (where $-R\le c < d\le R$).
::: solution
By [[#ex-sphere-normal]], $dS = R^2\sin\phi\,d\phi\,d\theta$, so

$$
A = \int_0^{2\pi}\int_0^\pi R^2\sin\phi\,d\phi\,d\theta = 2\pi R^2\Bigl[-\cos\phi\Bigr]_0^\pi = 4\pi R^2 .
$$

For the zone, $z = R\cos\phi$ ranges over $[c,d]$ when $\phi$ runs from $\phi_d = \arccos(d/R)$ to $\phi_c = \arccos(c/R)$, so

$$
A_{\text{zone}} = 2\pi R^2\bigl(\cos\phi_d - \cos\phi_c\bigr) = 2\pi R^2\left(\frac dR - \frac cR\right) = 2\pi R\,(d - c).
$$

The area of a zone depends only on its *height* $d - c$, not on where it sits: a slice of orange peel near the pole has the same area as a slice of the same thickness at the equator. This is Archimedes' **hat-box theorem**, and taking $d - c = 2R$ recovers $4\pi R^2$ — the lateral area of the cylinder ("hat box") of radius $R$ and height $2R$ that encloses the sphere.
:::
:::

::: example A paraboloid {#ex-paraboloid-area}
Find the area of the part of the paraboloid $z = x^2 + y^2$ that lies below the plane $z = 1$.
::: solution
The part lies over the unit disc, and $\sqrt{1 + f_x^2 + f_y^2} = \sqrt{1 + 4x^2 + 4y^2} = \sqrt{1 + 4r^2}$. In polar coordinates,

$$
A = \int_0^{2\pi}\int_0^1\sqrt{1 + 4r^2}\,r\,dr\,d\theta = 2\pi\left[\frac{(1 + 4r^2)^{3/2}}{12}\right]_0^1 = \frac{\pi}{6}\left(5\sqrt5 - 1\right)\approx5.33 .
$$

Compare with the area $\pi\approx3.14$ of the unit disc below it.
:::
:::

::: proposition Surfaces of revolution {#prop-revolution}
If $f\ge0$ is $C^1$ on $[a,b]$, the surface obtained by rotating the graph $y = f(x)$ about the $x$-axis has area

$$
A = 2\pi\int_a^b f(x)\sqrt{1 + f'(x)^2}\,dx .
$$
:::

::: proof
With $\mathbf{r}(x,\theta) = (x,\ f(x)\cos\theta,\ f(x)\sin\theta)$ we have $\mathbf{r}_x = (1,\ f'\cos\theta,\ f'\sin\theta)$ and $\mathbf{r}_\theta = (0,\ -f\sin\theta,\ f\cos\theta)$, so

$$
\mathbf{r}_x\times\mathbf{r}_\theta = \bigl(f f'\cos^2\theta + f f'\sin^2\theta,\ -f\cos\theta,\ -f\sin\theta\bigr) = \bigl(ff',\ -f\cos\theta,\ -f\sin\theta\bigr),
$$

of length $\sqrt{f^2f'^2 + f^2} = f\sqrt{1 + f'^2}$. Integrating over $a\le x\le b$, $0\le\theta\le2\pi$ gives the formula. (Where $f = 0$ the parametrisation is not regular, but such points do not affect the integral.)
:::

This is the formula of one-variable calculus: each arc-length element $ds = \sqrt{1 + f'^2}\,dx$ sweeps out a band of circumference $2\pi f(x)$. For the torus, the same reasoning (or a direct computation, which gives $\norm{\mathbf{r}_u\times\mathbf{r}_v} = a(R + a\cos v)$) yields area $\int_0^{2\pi}\int_0^{2\pi}a(R + a\cos v)\,du\,dv = 4\pi^2Ra$: the circumference $2\pi a$ of the tube times the distance $2\pi R$ travelled by its centre, an instance of Pappus's theorem for areas (compare the volume in [[multivariable/change-of-variables#ex-torus]]).

::: quiz
For a graph $z = f(x,y)$, which expression is the area element $dS$?
- [ ] $dS = dA$, because the surface lies over $D$
- [ ] $dS = (1 + f_x + f_y)\,dA$
- [x] $dS = \sqrt{1 + f_x^2 + f_y^2}\,dA$
- [ ] $dS = \sqrt{f_x^2 + f_y^2}\,dA$
::: solution
$\mathbf{r}_x\times\mathbf{r}_y = (-f_x, -f_y, 1)$ has length $\sqrt{1 + f_x^2 + f_y^2}$ ([[#prop-graph-area]]). The "$1$" accounts for the flat part: for a horizontal plane $f_x = f_y = 0$ and $dS = dA$; the last option would give area $0$ for a horizontal plane.
:::
:::

## Surface integrals of functions

Once we have an area element, we can integrate any function over a surface, just as we integrated over curves with respect to arc length.

::: definition Surface integral of a function {#def-scalar-surface-integral}
Let $S$ be parametrised by $\mathbf{r}\colon D\to\R^3$ as in [[#def-surface-area]] and let $f$ be continuous on $S$. The **surface integral** of $f$ over $S$ is

$$
\iint_S f\,dS = \iint_D f\bigl(\mathbf{r}(u,v)\bigr)\,\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv .
$$
:::

It is the limit of sums $\sum f(P_k)\,\Delta S_k$ over small patches of area $\Delta S_k$. With $f = 1$ it is the area; if $f$ is the density of a thin shell (mass per unit area), it is the **mass**; and $\frac{1}{A(S)}\iint_S f\,dS$ is the **average** of $f$ over $S$, for example the average temperature over the surface of the Earth.

::: example An integral over the sphere {#ex-sphere-z2}
Compute $\iint_S z^2\,dS$ over the unit sphere, first by symmetry and then directly.
::: solution
*By symmetry.* The sphere is unchanged by permuting the coordinates, so $\iint_S x^2\,dS = \iint_S y^2\,dS = \iint_S z^2\,dS$. Their sum is $\iint_S(x^2 + y^2 + z^2)\,dS = \iint_S 1\,dS = 4\pi$, since $x^2 + y^2 + z^2 = 1$ on $S$. Hence $\iint_S z^2\,dS = \tfrac{4\pi}{3}$.

*Directly.* With $z = \cos\phi$ and $dS = \sin\phi\,d\phi\,d\theta$,

$$
\iint_S z^2\,dS = \int_0^{2\pi}\int_0^\pi\cos^2\phi\,\sin\phi\,d\phi\,d\theta = 2\pi\left[-\frac{\cos^3\phi}{3}\right]_0^\pi = 2\pi\cdot\frac23 = \frac{4\pi}{3}.
$$

As a consequence, the average of $z^2$ over the unit sphere is $\tfrac13$: a random direction in space has, on average, a third of its squared length along any given axis.
:::
:::

## Independence of the parametrisation

A surface has many parametrisations — the upper hemisphere is both a graph $z = \sqrt{1 - x^2 - y^2}$ and a piece of the spherical-coordinate parametrisation — and the definitions above would be worthless if they depended on the choice. They do not, and the reason is the change of variables formula.

::: theorem Independence of the parametrisation {#thm-param-invariance}
Let $\mathbf{r}\colon D\to\R^3$ be a $C^1$ parametrisation of $S$, regular and one-to-one on the interior of $D$. Let $T\colon\tilde D\to D$, $T(s,t) = (u(s,t), v(s,t))$, be a $C^1$ map of $\tilde D$ onto $D$ that is one-to-one with Jacobian $J_T = \partial(u,v)/\partial(s,t) \ne 0$ on the interior, and let $\tilde{\mathbf{r}} = \mathbf{r}\circ T$. Then

$$
\tilde{\mathbf{r}}_s\times\tilde{\mathbf{r}}_t = J_T\,\bigl(\mathbf{r}_u\times\mathbf{r}_v\bigr)\circ T .
$$ {#eq-reparam}

Consequently the area of $S$ and every integral $\iint_S f\,dS$ are the same whichever of the two parametrisations is used.
:::

::: proof
By the chain rule, $\tilde{\mathbf{r}}_s = u_s\,\mathbf{r}_u + v_s\,\mathbf{r}_v$ and $\tilde{\mathbf{r}}_t = u_t\,\mathbf{r}_u + v_t\,\mathbf{r}_v$, with $\mathbf{r}_u, \mathbf{r}_v$ evaluated at $T(s,t)$. Expanding the cross product by bilinearity and using $\mathbf{r}_u\times\mathbf{r}_u = \mathbf{r}_v\times\mathbf{r}_v = \mathbf{0}$ and $\mathbf{r}_v\times\mathbf{r}_u = -\mathbf{r}_u\times\mathbf{r}_v$ ([[multivariable/vectors-geometry#thm-cross-props]]),

$$
\tilde{\mathbf{r}}_s\times\tilde{\mathbf{r}}_t = u_sv_t\,\mathbf{r}_u\times\mathbf{r}_v + v_su_t\,\mathbf{r}_v\times\mathbf{r}_u = (u_sv_t - v_su_t)\,\mathbf{r}_u\times\mathbf{r}_v = J_T\,\mathbf{r}_u\times\mathbf{r}_v .
$$

In particular $\tilde{\mathbf{r}}$ is regular wherever $\mathbf{r}$ is. Now, by the change of variables theorem applied to $T$,

$$
\iint_{\tilde D} f(\tilde{\mathbf{r}})\,\norm{\tilde{\mathbf{r}}_s\times\tilde{\mathbf{r}}_t}\,ds\,dt = \iint_{\tilde D} f\bigl(\mathbf{r}(T)\bigr)\,\norm{\mathbf{r}_u\times\mathbf{r}_v}(T)\,\abs{J_T}\,ds\,dt = \iint_D f(\mathbf{r})\,\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv .
$$
:::

Formula [[#eq-reparam]] contains more information than we have used: the normal vector $\mathbf{r}_u\times\mathbf{r}_v$ keeps its direction when $J_T > 0$ and reverses it when $J_T < 0$. This is about to matter.

## Orientation

To measure the flow *through* a surface we must say which way counts as positive: through a net in a river, downstream or upstream? A surface needs a chosen side.

::: definition Orientation {#def-orientation}
An **orientation** of a surface $S$ is a choice of unit normal vector $\mathbf{n}(P)$ at each point $P$ of $S$ (except possibly on its boundary) that varies continuously with $P$. A surface that admits an orientation is **orientable**, and an orientable surface with a chosen orientation is **oriented**. A regular parametrisation $\mathbf{r}$ that is one-to-one orients its image by $\mathbf{n} = \dfrac{\mathbf{r}_u\times\mathbf{r}_v}{\norm{\mathbf{r}_u\times\mathbf{r}_v}}$. A closed surface bounding a solid region is oriented **outwards** unless stated otherwise.
:::

A connected orientable surface has exactly two orientations, $\mathbf{n}$ and $-\mathbf{n}$. A graph $z = f(x,y)$ is oriented **upwards** by $\mathbf{n} = (-f_x, -f_y, 1)/\sqrt{1 + f_x^2 + f_y^2}$, whose $z$-component is positive. The sphere parametrisation of [[#ex-sphere-normal]] gives the outward orientation; swapping $\phi$ and $\theta$ (a reparametrisation with $J_T = -1$) gives the inward one.

Not every surface is orientable. The **Möbius strip**, made by giving a strip of paper a half-twist before gluing its ends, has only one side: an ant walking along its centre line returns to its starting point upside down. With the parametrisation in the next figure one can check that $\mathbf{r}_u\times\mathbf{r}_v$ at $(u, v) = (0, 0)$ is $(0,0,-1)$ while at $(2\pi, 0)$ — the same point of the strip — it is $(0,0,1)$: carrying the normal continuously once around the strip reverses it, so no continuous choice of $\mathbf{n}$ exists.

::: widget surface
fx: (1 + v*cos(u/2))*cos(u)
fy: (1 + v*cos(u/2))*sin(u)
fz: v*sin(u/2)
u: 0, 2pi
v: -0.4, 0.4
color: plain
caption: The Möbius strip $\mathbf{r}(u,v) = \bigl((1 + v\cos\tfrac u2)\cos u,\ (1 + v\cos\tfrac u2)\sin u,\ v\sin\tfrac u2\bigr)$. Rotate it and follow the centre line $v = 0$ once around: you come back on the "other side". Because the strip has only one side, flux through it cannot be defined — there is no consistent choice of which way is "through".
:::

## Flux integrals

Picture a fluid moving with velocity field $\mathbf{F}(x,y,z)$ (metres per second), and an oriented surface $S$ in it. Through a small flat patch of area $\Delta S$ with unit normal $\mathbf{n}$, the fluid that crosses in a short time $\Delta t$ fills a slanted prism with base $\Delta S$ and height $(\mathbf{F}\cdot\mathbf{n})\,\Delta t$. So the volume crossing per unit time, in the direction of $\mathbf{n}$, is $(\mathbf{F}\cdot\mathbf{n})\,\Delta S$: only the normal component of the flow counts, and flow backwards across the patch counts negatively. Adding up over patches gives the total rate of flow, the flux.

::: definition Flux {#def-flux}
Let $S$ be an oriented surface with unit normal $\mathbf{n}$, and $\mathbf{F}$ a continuous vector field on $S$. The **flux** of $\mathbf{F}$ through $S$ is

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \iint_S\mathbf{F}\cdot\mathbf{n}\,dS .
$$

If $\mathbf{r}\colon D\to\R^3$ is a parametrisation compatible with the orientation (that is, $\mathbf{r}_u\times\mathbf{r}_v$ is a positive multiple of $\mathbf{n}$), then, since $\mathbf{n}\,dS = \mathbf{r}_u\times\mathbf{r}_v\,du\,dv$,

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \iint_D\mathbf{F}\bigl(\mathbf{r}(u,v)\bigr)\cdot\bigl(\mathbf{r}_u\times\mathbf{r}_v\bigr)\,du\,dv .
$$ {#eq-flux}
:::

Two things are worth noticing. The awkward square root in $\norm{\mathbf{r}_u\times\mathbf{r}_v}$ cancels, so flux integrals are often easier than area integrals. And by [[#thm-param-invariance]] the flux is the same for all parametrisations compatible with the orientation, and changes sign if the orientation is reversed. For an upward-oriented graph $z = f(x,y)$ and $\mathbf{F} = (P, Q, R)$, [[#eq-flux]] becomes

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \iint_D\bigl(-P f_x - Q f_y + R\bigr)\,dA .
$$ {#eq-flux-graph}

::: example The flux of an inverse-square field {#ex-inverse-square}
Let $\mathbf{F}(\mathbf{x}) = \dfrac{\mathbf{x}}{\norm{\mathbf{x}}^3}$, the field of a point charge or point mass at the origin (up to a constant). Find its flux outward through the sphere of radius $R$ centred at the origin.
::: solution
On the sphere the outward unit normal is $\mathbf{n} = \mathbf{x}/R$ and $\norm{\mathbf{x}} = R$, so

$$
\mathbf{F}\cdot\mathbf{n} = \frac{\mathbf{x}}{R^3}\cdot\frac{\mathbf{x}}{R} = \frac{R^2}{R^4} = \frac{1}{R^2},
$$

which is constant. Hence the flux is $\frac{1}{R^2}\cdot A(S) = \frac{1}{R^2}\cdot4\pi R^2 = 4\pi$, **independent of $R$**. The field weakens like $1/R^2$, while the area of the sphere grows like $R^2$, and the two effects cancel exactly. This is the mathematical heart of Gauss's law; in [[multivariable/stokes-divergence]] we shall see that the flux through *every* closed surface enclosing the origin is $4\pi$, and through every closed surface not enclosing it is $0$.
:::
:::

::: example Flux through a paraboloid {#ex-flux-graph}
Find the flux of $\mathbf{F} = (y,\ x,\ z)$ upward through the part of the paraboloid $z = 1 - x^2 - y^2$ with $z\ge0$.
::: solution
Here $f = 1 - x^2 - y^2$ over the unit disc, $f_x = -2x$, $f_y = -2y$. By [[#eq-flux-graph]],

$$
-Pf_x - Qf_y + R = y\cdot2x + x\cdot2y + (1 - x^2 - y^2) = 4xy + 1 - x^2 - y^2 .
$$

The term $4xy$ integrates to $0$ over the disc (it is odd in $x$). In polar coordinates the rest gives

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \int_0^{2\pi}\int_0^1(1 - r^2)\,r\,dr\,d\theta = 2\pi\left(\frac12 - \frac14\right) = \frac\pi2 .
$$
:::
:::

::: widget surface
f: 1 - x^2 - y^2
x: -1, 1
y: -1, 1
contours: true
color: height
caption: The paraboloid $z = 1 - x^2 - y^2$ of [[#ex-flux-graph]], drawn over the square $[-1,1]^2$; the surface of the example is the cap above $z = 0$, over the unit disc. The upward normal $(-f_x, -f_y, 1) = (2x, 2y, 1)$ tilts outwards away from the top; the flux adds up $\mathbf{F}\cdot\mathbf{n}$ over the cap, and only the component of the flow along this normal counts.
:::

::: quiz
If the orientation of a surface $S$ is reversed, which of the following changes?
- [ ] The area of $S$
- [ ] The integral $\iint_S f\,dS$ of a function $f$
- [x] The flux $\iint_S\mathbf{F}\cdot d\mathbf{S}$ of a vector field (its sign)
- [ ] Nothing, by [[#thm-param-invariance]]
::: solution
Area and $\iint_S f\,dS$ involve only $\norm{\mathbf{r}_u\times\mathbf{r}_v}$, which is unaffected by orientation. The flux involves $\mathbf{n}$ itself, and replacing $\mathbf{n}$ by $-\mathbf{n}$ changes its sign. In terms of [[#eq-reparam]], a reparametrisation with $J_T < 0$ leaves $\abs{J_T}\norm{\mathbf{r}_u\times\mathbf{r}_v}$ unchanged but reverses $\mathbf{r}_u\times\mathbf{r}_v$.
:::
:::

::: warning Check the direction of the normal
[[#eq-flux]] uses $\mathbf{r}_u\times\mathbf{r}_v$, which may point the wrong way. Before computing, check its direction at one convenient point: for the sphere in the order $(\phi, \theta)$ it points outwards ([[#ex-sphere-normal]]), but in the order $(\theta, \phi)$ inwards. For a closed surface made of several pieces (a cylinder with its two end discs, say), orient every piece outwards — the top disc with $\mathbf{n} = \mathbf{k}$, the bottom with $\mathbf{n} = -\mathbf{k}$ — and add the fluxes.
:::

::: application Flux in physics
The same integral measures many physical flows. For a fluid of density $\rho$ and velocity $\mathbf{v}$, the flux of $\rho\mathbf{v}$ through $S$ is the mass crossing $S$ per second. In heat conduction, Fourier's law says that heat flows with flux density $\mathbf{q} = -k\nabla T$ (down the temperature gradient), and $\iint_S\mathbf{q}\cdot d\mathbf{S}$ is the rate at which heat crosses $S$ — the basis of the heat equation ([[pde/heat-equation]]). In electrostatics, the flux of the electric field $\mathbf{E}$ through a closed surface equals the enclosed charge divided by $\varepsilon_0$ (Gauss's law), which [[#ex-inverse-square]] verifies for a point charge at the centre of a sphere.
:::

::: history
Archimedes, in *On the Sphere and Cylinder* (third century BC), proved that the surface area of a sphere is four times the area of its great circle, and that a zone of a sphere has the same area as the matching band of the circumscribed cylinder — results he valued so much that he asked for a sphere inscribed in a cylinder to be carved on his tomb. Surface integrals in the modern sense arose in eighteenth- and early nineteenth-century physics, in the work of Lagrange, Gauss and Poisson on gravitational attraction, where the attraction of a body could be related to integrals over its bounding surface. The one-sided strip was discovered independently in 1858 by two German mathematicians, August Ferdinand Möbius and Johann Benedict Listing; it showed that "having two sides" is a genuine property a surface may lack, and orientability became one of the basic notions of topology ([[topology/surfaces]]).
:::

## Where this leads

Flux integrals are half of each of the two great theorems of vector calculus in space. **Stokes' theorem** equates the flux of the curl of a field through a surface with the circulation of the field around the surface's boundary, and the **divergence theorem** equates the flux through a closed surface with the integral of the divergence over the enclosed solid; both are proved in [[multivariable/stokes-divergence]], and both rely on the orientation conventions set up here. The parametrised surfaces of this chapter are the starting point of [[differential-geometry/regular-surfaces]], where $\mathbf{r}_u$, $\mathbf{r}_v$ and the dot products $\mathbf{r}_u\cdot\mathbf{r}_u$, $\mathbf{r}_u\cdot\mathbf{r}_v$, $\mathbf{r}_v\cdot\mathbf{r}_v$ (the first fundamental form) are used to measure lengths and angles on the surface, and the unit normal $\mathbf{n}$ becomes the Gauss map that measures curvature ([[differential-geometry/surface-curvature]]).

::: summary
- A parametric surface is a map $\mathbf{r}(u,v)$ from a plane region into space; $\mathbf{r}_u$, $\mathbf{r}_v$ are tangent vectors, and the parametrisation is regular where $\mathbf{r}_u\times\mathbf{r}_v\ne\mathbf{0}$ ([[#def-parametric-surface]]).
- Area element $dS = \norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv$; for a graph, $dS = \sqrt{1 + f_x^2 + f_y^2}\,dA$; for a sphere of radius $R$, $dS = R^2\sin\phi\,d\phi\,d\theta$ ([[#def-surface-area]]).
- Sphere: area $4\pi R^2$, and a zone of height $h$ has area $2\pi Rh$; torus: $4\pi^2Ra$.
- $\iint_S f\,dS = \iint_D f(\mathbf{r})\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv$ gives masses, averages and centroids of shells.
- Reparametrising multiplies $\mathbf{r}_u\times\mathbf{r}_v$ by the Jacobian, so areas and $\iint f\,dS$ do not depend on the parametrisation ([[#thm-param-invariance]]).
- An orientation is a continuous unit normal $\mathbf{n}$; the Möbius strip has none.
- Flux: $\iint_S\mathbf{F}\cdot d\mathbf{S} = \iint_S\mathbf{F}\cdot\mathbf{n}\,dS = \iint_D\mathbf{F}(\mathbf{r})\cdot(\mathbf{r}_u\times\mathbf{r}_v)\,du\,dv$; it changes sign with the orientation ([[#def-flux]]).
- The inverse-square field has flux $4\pi$ through every sphere centred at the origin.
:::

## Exercises

::: exercise A tangent plane {level=1}
Find the tangent plane to the surface $\mathbf{r}(u,v) = (u + v,\ u - v,\ uv)$ at the point where $(u,v) = (1,1)$.
::: solution
At $(1,1)$ the point is $(2, 0, 1)$, with $\mathbf{r}_u = (1, 1, v) = (1,1,1)$ and $\mathbf{r}_v = (1, -1, u) = (1,-1,1)$. The normal is $\mathbf{r}_u\times\mathbf{r}_v = (1\cdot1 - 1\cdot(-1),\ 1\cdot1 - 1\cdot1,\ 1\cdot(-1) - 1\cdot1) = (2, 0, -2)$, so the tangent plane is $2(x - 2) - 2(z - 1) = 0$, i.e. $x - z = 1$. (The surface is the graph $z = (x^2 - y^2)/4$, and [[multivariable/gradient#eq-tangent-plane]] gives the same plane.)
:::
:::

::: exercise A triangle in space {level=1 check="27/2"}
Find the area of the part of the plane $x + 2y + 2z = 6$ in the first octant.
::: solution
As a graph, $z = 3 - \tfrac x2 - y$ over the triangle $D$ with vertices $(0,0)$, $(6,0)$, $(0,3)$, of area $9$. The area element is $\sqrt{1 + \tfrac14 + 1}\,dA = \tfrac32\,dA$, so the area is $\tfrac32\cdot9 = \tfrac{27}{2}$. (Check with a cross product: the vertices $(6,0,0)$, $(0,3,0)$, $(0,0,3)$ give edge vectors $(-6,3,0)$ and $(-6,0,3)$ with cross product $(9, 18, 18)$ of length $27$, and half of that is $\tfrac{27}{2}$.)
:::
:::

::: exercise A function on a sphere {level=1 check="64*pi"}
Evaluate $\iint_S(x^2 + y^2 + z^2)\,dS$ over the sphere of radius $2$ centred at the origin.
::: solution
On $S$ the integrand equals $4$, so the integral is $4\cdot A(S) = 4\cdot4\pi\cdot2^2 = 64\pi$.
:::
:::

::: exercise The area of a cone {level=2 check="sqrt(2)*pi"}
Find the area of the cone $z = \sqrt{x^2 + y^2}$, $0\le z\le1$.
::: solution
With $\mathbf{r}(r,\theta) = (r\cos\theta, r\sin\theta, r)$: $\mathbf{r}_r = (\cos\theta, \sin\theta, 1)$, $\mathbf{r}_\theta = (-r\sin\theta, r\cos\theta, 0)$, and $\mathbf{r}_r\times\mathbf{r}_\theta = (-r\cos\theta, -r\sin\theta, r)$ of length $\sqrt2\,r$. So $A = \int_0^{2\pi}\int_0^1\sqrt2\,r\,dr\,d\theta = \sqrt2\,\pi$. (Equivalently, a graph with $\norm{\nabla f} = 1$ has $dS = \sqrt2\,dA$ over the unit disc.)
:::
:::

::: exercise The area of a helicoid {level=2 check="pi*(sqrt(2) + ln(1 + sqrt(2)))"}
Find the area of one turn of the helicoid $\mathbf{r}(u,v) = (u\cos v,\ u\sin v,\ v)$, $0\le u\le1$, $0\le v\le2\pi$.
::: hint
$\int_0^1\sqrt{1 + u^2}\,du = \tfrac12\left(\sqrt2 + \ln(1 + \sqrt2)\right)$.
:::
::: solution
$\mathbf{r}_u = (\cos v, \sin v, 0)$, $\mathbf{r}_v = (-u\sin v, u\cos v, 1)$, so $\mathbf{r}_u\times\mathbf{r}_v = (\sin v, -\cos v, u)$ of length $\sqrt{1 + u^2}$. The area is $2\pi\int_0^1\sqrt{1 + u^2}\,du = \pi\left(\sqrt2 + \ln(1 + \sqrt2)\right)\approx7.21$.
:::
:::

::: exercise Flux through a sphere {level=2 check="4*pi/3"}
Find the outward flux of $\mathbf{F} = (0, 0, z)$ through the unit sphere.
::: solution
On the unit sphere $\mathbf{n} = (x, y, z)$, so $\mathbf{F}\cdot\mathbf{n} = z^2$ and the flux is $\iint_S z^2\,dS = \tfrac{4\pi}{3}$ by [[#ex-sphere-z2]]. (This equals the volume of the unit ball — not a coincidence, as the divergence theorem will show, since $\nabla\cdot\mathbf{F} = 1$.)
:::
:::

::: exercise Flux through a cylinder {level=2 check="4*pi"}
Find the outward flux of $\mathbf{F} = (x, y, 0)$ through the curved part of the cylinder $x^2 + y^2 = 1$, $0\le z\le2$ (without the end discs).
::: solution
On the curved surface the outward unit normal is $\mathbf{n} = (x, y, 0)$, so $\mathbf{F}\cdot\mathbf{n} = x^2 + y^2 = 1$ and the flux equals the area $2\pi\cdot1\cdot2 = 4\pi$. (On the end discs $\mathbf{F}\cdot\mathbf{n} = 0$, so adding them would not change the answer.)
:::
:::

::: exercise Graphs have at least the area of their shadows {level=2}
Let $f$ be $C^1$ on a region $D$. Prove that the area of the graph of $f$ is at least $\text{area}(D)$, and that if $D$ is convex and open, equality holds only if $f$ is constant.
::: solution
By [[#prop-graph-area]], $A = \iint_D\sqrt{1 + \norm{\nabla f}^2}\,dA\ge\iint_D1\,dA$, since the integrand is at least $1$. If equality holds, then $\iint_D\bigl(\sqrt{1 + \norm{\nabla f}^2} - 1\bigr)\,dA = 0$ with a continuous non-negative integrand, which forces the integrand to vanish everywhere on the open set $D$ (a continuous function positive at one point is positive on a small disc around it, which would contribute a positive amount). So $\nabla f = \mathbf{0}$ on $D$, and $f$ is constant by [[multivariable/gradient#cor-constant]].
:::
:::

::: exercise Gabriel's horn {level=3}
The curve $y = 1/x$, $x\ge1$, is rotated about the $x$-axis. Show that the resulting solid has finite volume $\pi$ but that its surface has infinite area.
::: hint
Use [[#prop-revolution]] on $[1, b]$ and let $b\to\infty$.
:::
::: solution
The volume (by discs) is $\pi\int_1^\infty x^{-2}\,dx = \pi$. For the area, [[#prop-revolution]] on $[1,b]$ gives

$$
A_b = 2\pi\int_1^b\frac1x\sqrt{1 + \frac{1}{x^4}}\,dx\ \ge\ 2\pi\int_1^b\frac{dx}{x} = 2\pi\ln b\to\infty .
$$

So the horn could be filled with a finite amount of paint, but its inside surface could never be painted — the paradox is resolved by noting that a layer of paint of fixed thickness has infinite volume, while filling the horn means the "layer" becomes arbitrarily thin.
:::
:::

::: exercise A one-sided surface {level=3}
For the Möbius strip $\mathbf{r}(u,v) = \bigl((1 + v\cos\tfrac u2)\cos u,\ (1 + v\cos\tfrac u2)\sin u,\ v\sin\tfrac u2\bigr)$, $0\le u\le2\pi$, $-\tfrac12\le v\le\tfrac12$, show that $\mathbf{r}(0, v) = \mathbf{r}(2\pi, -v)$, compute $\mathbf{r}_u\times\mathbf{r}_v$ along the centre line $v = 0$, and deduce that the strip is not orientable.
::: solution
At $u = 2\pi$, $\cos\tfrac u2 = -1$ and $\sin\tfrac u2 = 0$, so $\mathbf{r}(2\pi, -v) = (1 + v, 0, 0) = \mathbf{r}(0, v)$: the two ends of the parameter rectangle are glued with a flip. On the centre line, $\mathbf{r}(u, 0) = (\cos u, \sin u, 0)$, so $\mathbf{r}_u = (-\sin u, \cos u, 0)$ and $\mathbf{r}_v = (\cos\tfrac u2\cos u,\ \cos\tfrac u2\sin u,\ \sin\tfrac u2)$. Hence

$$
\mathbf{r}_u\times\mathbf{r}_v = \bigl(\cos u\sin\tfrac u2,\ \sin u\sin\tfrac u2,\ -\cos\tfrac u2\bigr),
$$

a unit vector, which is $(0,0,-1)$ at $u = 0$ and $(0,0,1)$ at $u = 2\pi$ — the same point $(1,0,0)$ of the strip. Suppose $\mathbf{n}$ were a continuous unit normal on the strip. Along the centre circle, $\mathbf{n}(\mathbf{r}(u,0)) = \varepsilon(u)\,\mathbf{r}_u\times\mathbf{r}_v$ with $\varepsilon(u) = \pm1$ depending continuously on $u\in[0,2\pi]$, hence constant. Then $\mathbf{n}$ at $(1,0,0)$ would equal both $\varepsilon(0,0,-1)$ and $\varepsilon(0,0,1)$, a contradiction. So the Möbius strip is not orientable.
:::
:::
