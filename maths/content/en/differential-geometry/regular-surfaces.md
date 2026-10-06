What exactly is a smooth surface? In [[multivariable/surface-integrals]] a surface was a parametrisation $\mathbf{r}(u,v)$ — a map from a region of the plane into space ([[multivariable/surface-integrals#def-parametric-surface]]). That is enough for computing areas and fluxes, but it is not a good definition of the *object*. The sphere cannot be covered by a single well-behaved parametrisation, the latitude–longitude grid has artificial singularities at the poles that have nothing to do with the sphere itself, and a parametrisation can be smooth while its image crosses itself or has a corner. Differential geometry needs a notion of surface that does not depend on any particular choice of coordinates.

The solution, which goes back to Gauss and was made precise in the twentieth century, is to require a surface to be covered by many small, well-behaved parametrisations — **patches** — like an atlas of overlapping maps of the Earth. In this chapter we define regular surfaces, show that level sets $F(x,y,z) = c$ with non-vanishing gradient are surfaces, prove that the tangent plane is well defined, and introduce the **first fundamental form**, the inner product on tangent planes from which all lengths, angles and areas *within* the surface are computed. Everything a two-dimensional inhabitant of the surface could measure is encoded in it, and the next three chapters are about what it does and does not determine. Our patches are written $\mathbf{x}(u,v)$, following do Carmo; they are the same objects as the $\mathbf{r}(u,v)$ of the multivariable course.

## Surface patches

A good local parametrisation must be smooth, must not collapse directions (so that it has a genuine tangent plane), and must be a faithful copy of a piece of the plane, without gluing distant parameter values to nearby points.

::: definition Surface patch {#def-surface-patch}
Let $U\subseteq\R^2$ be open. A **surface patch** (or **local parametrisation**) is a smooth map $\mathbf{x}\colon U\to\R^3$, $(u,v)\mapsto\mathbf{x}(u,v)$, such that

1. $\mathbf{x}$ is a **homeomorphism** onto its image: it is injective, and its inverse $\mathbf{x}(U)\to U$ is continuous (where $\mathbf{x}(U)$ carries the distances of $\R^3$); and
2. $\mathbf{x}$ is **regular**: the partial derivatives $\mathbf{x}_u$ and $\mathbf{x}_v$ are linearly independent at every point of $U$, that is, $\mathbf{x}_u\times\mathbf{x}_v\ne\mathbf{0}$.
:::

Condition 2 says that the derivative $D\mathbf{x}(q)$, the $3\times2$ matrix with columns $\mathbf{x}_u$ and $\mathbf{x}_v$, has rank $2$: small rectangles in the parameter plane are mapped to small genuine parallelograms, not to slivers. The continuity of the inverse in condition 1 says that points of $\mathbf{x}(U)$ that are close in space come from parameter values that are close in $U$.

::: example Graphs and the latitude–longitude patch {#ex-patches}
(a) For a smooth function $f$ on an open set $U\subseteq\R^2$, $\mathbf{x}(u,v) = (u, v, f(u,v))$ is a surface patch. (b) For $R > 0$, $\mathbf{x}(\theta, \varphi) = (R\cos\theta\cos\varphi,\ R\cos\theta\sin\varphi,\ R\sin\theta)$ on $U = (-\tfrac\pi2, \tfrac\pi2)\times(0, 2\pi)$ is a surface patch whose image is the sphere of radius $R$ minus a closed half great circle.
::: solution
(a) $\mathbf{x}$ is smooth and injective, and its inverse is the restriction of the projection $(x,y,z)\mapsto(x,y)$, which is continuous. Also $\mathbf{x}_u\times\mathbf{x}_v = (1, 0, f_u)\times(0, 1, f_v) = (-f_u, -f_v, 1)\ne\mathbf{0}$.

(b) Here $\theta$ is the latitude and $\varphi$ the longitude. A direct computation gives

$$
\mathbf{x}_\theta\times\mathbf{x}_\varphi = -R^2\cos\theta\,(\cos\theta\cos\varphi,\ \cos\theta\sin\varphi,\ \sin\theta), \qquad \norm{\mathbf{x}_\theta\times\mathbf{x}_\varphi} = R^2\cos\theta,
$$

which is non-zero because $\abs{\theta} < \pi/2$. The latitude of a point is $\theta = \arcsin(z/R)$, and its longitude is determined by $(\cos\varphi, \sin\varphi) = (x, y)/\sqrt{x^2+y^2}$ with $\varphi\in(0, 2\pi)$; both are continuous functions of $(x, y, z)$ on the image, which is the sphere minus the poles and the meridian $\varphi = 0$. So $\mathbf{x}$ is injective with continuous inverse. Note that $\mathbf{x}_\theta\times\mathbf{x}_\varphi$ would vanish at the poles $\theta = \pm\pi/2$: that is why they are excluded, even though the sphere itself is perfectly smooth there.
:::
:::

::: warning Injective and regular is not enough
The map $\mathbf{x}(u,v) = (\sin u,\ \sin 2u,\ v)$ on $U = (0, 2\pi)\times\R$ is smooth, injective and regular ($\mathbf{x}_u\times\mathbf{x}_v = (2\cos2u, -\cos u, 0)\ne\mathbf{0}$). Its image is a "figure-of-eight cylinder" over the curve $(\sin u, \sin2u)$, which passes through the origin at $u = \pi$ and approaches it again as $u\to0$ and $u\to2\pi$. Along the line $x = y = 0$ the image looks like two planes crossing, which is not what a surface should look like. The map fails condition 1: the points $\mathbf{x}(u, 0)$ with $u\to0^+$ converge to $\mathbf{x}(\pi, 0)$ although $u\not\to\pi$, so the inverse is not continuous.
:::

## Regular surfaces

::: definition Regular surface {#def-regular-surface}
A subset $S\subseteq\R^3$ is a **regular surface** if every point $p\in S$ has an open neighbourhood $W\subseteq\R^3$ for which there is a surface patch $\mathbf{x}\colon U\to\R^3$ with $\mathbf{x}(U) = S\cap W$. A collection of patches whose images cover $S$ is an **atlas** of $S$.
:::

So a regular surface is a set that, near each of its points, is a faithful smooth copy of a piece of the plane. By [[#ex-patches]](a), every graph $z = f(x,y)$ of a smooth function on an open set is a regular surface, covered by a single patch.

::: example The sphere is a regular surface {#ex-sphere-atlas}
Show that the unit sphere $S^2 = \set{x^2 + y^2 + z^2 = 1}$ is a regular surface.
::: solution
Let $D = \set{(u,v) : u^2 + v^2 < 1}$ and $h(u,v) = \sqrt{1 - u^2 - v^2}$, smooth on $D$. The upper hemisphere $S^2\cap\set{z > 0}$ is the graph of $h$, so $\mathbf{x}_1(u,v) = (u, v, h(u,v))$ is a patch with image $S^2\cap W_1$, where $W_1 = \set{z > 0}$ is open. In the same way the five maps

$$
(u, v, -h),\quad (u, h, v),\quad (u, -h, v),\quad (h, u, v),\quad (-h, u, v)
$$

on $D$ are patches whose images are the hemispheres $z < 0$, $y > 0$, $y < 0$, $x > 0$ and $x < 0$. Every point of $S^2$ has some non-zero coordinate, so these six patches form an atlas. (Two patches suffice — see [[#exr-stereographic]] — but one never does, as [[#exr-one-patch]] shows.)
:::
:::

Checking the definition patch by patch is laborious. Most surfaces of interest are level sets, and for them there is a quick criterion.

::: theorem Level sets are regular surfaces {#thm-level-set}
Let $F\colon W\to\R$ be a smooth function on an open set $W\subseteq\R^3$, let $c\in\R$, and suppose that $\nabla F(p)\ne\mathbf{0}$ at every point $p$ of $S = F^{-1}(c) = \set{p\in W : F(p) = c}$. Then $S$ (if non-empty) is a regular surface.
:::

::: proof
Let $p = (x_0, y_0, z_0)\in S$. Some partial derivative of $F$ is non-zero at $p$; say $F_z(p)\ne0$ (the other cases are the same with the coordinates permuted). By the implicit function theorem ([[multivariable/partial-derivatives#thm-implicit]], in its smooth version) there are an open set $U\ni(x_0, y_0)$, an open interval $J\ni z_0$ with $U\times J\subseteq W$, and a smooth function $g\colon U\to J$ such that for $(x, y, z)\in U\times J$,

$$
F(x, y, z) = c \iff z = g(x, y).
$$

So $S\cap(U\times J)$ is the graph of $g$, and $\mathbf{x}(u,v) = (u, v, g(u,v))$ is a surface patch (by [[#ex-patches]](a)) with image $S\cap W'$ for the open set $W' = U\times J$.
:::

::: example Quadrics and the torus {#ex-level-sets}
Show that the hyperboloid of one sheet $x^2 + y^2 - z^2 = 1$ and the torus obtained by rotating the circle $(x - a)^2 + z^2 = b^2$ ($0 < b < a$) about the $z$-axis are regular surfaces.
::: solution
For the hyperboloid, $F = x^2 + y^2 - z^2$ has $\nabla F = (2x, 2y, -2z)$, which vanishes only at the origin, and the origin is not on the surface. By [[#thm-level-set]] it is a regular surface (so is every hyperboloid and ellipsoid, by the same one-line argument).

A point lies on the torus exactly when its distance $\rho = \sqrt{x^2 + y^2}$ from the $z$-axis satisfies $(\rho - a)^2 + z^2 = b^2$. Since $\rho\ge a - b > 0$ on the torus, $F = (\rho - a)^2 + z^2$ is smooth on the open set $W = \set{x^2 + y^2 > 0}$ containing it, and

$$
\nabla F = \left(\frac{2(\rho - a)x}{\rho},\ \frac{2(\rho - a)y}{\rho},\ 2z\right),
$$

which vanishes only when $\rho = a$ and $z = 0$, on the central circle of the tube, where $F = 0 \ne b^2$. So the torus $F = b^2$ is a regular surface. A convenient patch is

$$
\mathbf{x}(u, v) = \bigl((a + b\cos u)\cos v,\ (a + b\cos u)\sin v,\ b\sin u\bigr), \qquad (u,v)\in(0,2\pi)\times(0,2\pi),
$$

where $u$ is the angle around the tube and $v$ the angle around the axis; three such patches, with shifted parameter ranges, cover the torus.
:::
:::

::: widget surface
fx: (a + b*cos(u))*cos(v)
fy: (a + b*cos(u))*sin(v)
fz: b*sin(u)
u: 0, 2pi
v: 0, 2pi
sliders: a=2:1:3:0.1; b=0.8:0.2:3:0.05
color: plain
caption: The torus patch of [[#ex-level-sets]]. The grid curves are the meridian circles ($v$ constant, around the tube) and the parallels ($u$ constant, around the axis); they meet at right angles everywhere, because $\mathbf{x}_u\cdot\mathbf{x}_v = 0$ for this patch. Push $b$ up to $a$: when $a = b$ the tube touches the axis and the surface stops being regular at the origin.
:::

Not every reasonable-looking set is a regular surface.

::: example The double cone is not a regular surface {#ex-cone}
Show that the cone $C = \set{x^2 + y^2 = z^2}$ is not a regular surface.
::: solution
[[#thm-level-set]] does not apply at the vertex, where $\nabla(x^2 + y^2 - z^2) = \mathbf{0}$, but that alone proves nothing; we need an argument that no patch can work. Suppose $\mathbf{x}\colon U\to\R^3$ were a patch with $\mathbf{x}(U) = C\cap W$ and $\mathbf{x}(q) = \mathbf{0}$. Choose an open disc $D\subseteq U$ centred at $q$. Since $\mathbf{x}$ is a homeomorphism onto $C\cap W$, the image $\mathbf{x}(D)$ is $C\cap W'$ for some open $W'\ni\mathbf{0}$, so it contains points of both nappes, with $z > 0$ and with $z < 0$. Now $D\setminus\set{q}$ is connected (any two of its points can be joined by a path avoiding the centre), so its continuous image $\mathbf{x}(D)\setminus\set{\mathbf{0}}$ is connected. But $\mathbf{x}(D)\setminus\set{\mathbf{0}}$ lies in $\set{z\ne0}$ (on the cone, $z = 0$ only at the vertex) and meets both $\set{z > 0}$ and $\set{z < 0}$, so it is disconnected — a contradiction. Removing the vertex disconnects every neighbourhood of it in $C$, while removing a point from a disc does not. (The single nappe $z = \sqrt{x^2+y^2}$ is not a regular surface either, but the proof is different: near the vertex it would have to be the graph of a smooth function, and $\sqrt{x^2+y^2}$ is not differentiable at the origin; see do Carmo, §2-2.)
:::
:::

::: quiz
Which of the following subsets of $\R^3$ are regular surfaces? (Select all that apply.)
- [x] The sphere $x^2 + y^2 + z^2 = 4$ with the north pole removed
- [x] The hyperboloid of two sheets $z^2 - x^2 - y^2 = 1$
- [ ] The double cone $x^2 + y^2 = z^2$
- [ ] The figure-of-eight cylinder, the image of $(u,v)\mapsto(\sin u, \sin2u, v)$, $0 < u < 2\pi$
::: solution
Removing a point from a regular surface leaves a regular surface (shrink each patch), and the hyperboloid is a level set of $z^2 - x^2 - y^2$, whose gradient $(-2x, -2y, 2z)$ vanishes only at the origin, which is not on it. The cone fails at its vertex ([[#ex-cone]]), and the figure-of-eight cylinder fails along the line $x = y = 0$, where two sheets cross (see the warning above): no neighbourhood of a point on that line is a faithful copy of a disc.
:::
:::

### Changes of parameters

A point of a surface usually lies in the images of many patches, and a geometric quantity is only meaningful if it does not depend on which one we use. The key technical fact is that patches are compatible with each other, and it rests on the following lemma, which is where the homeomorphism condition earns its keep.

::: lemma Patches have smooth local inverses {#lem-local-inverse}
Let $\mathbf{x}\colon U\to\R^3$ be a surface patch whose image $\mathbf{x}(U) = S\cap W$ is an open piece of a regular surface, and let $q\in U$. Then there are an open set $W_0\subseteq\R^3$ containing $\mathbf{x}(q)$ and a smooth map $\Phi\colon W_0\to\R^2$ such that $\Phi(p) = \mathbf{x}^{-1}(p)$ for every $p\in S\cap W_0$. Consequently, if $\boldsymbol\gamma$ is a smooth curve in $\R^3$ with values in $\mathbf{x}(U)$, then $\mathbf{x}^{-1}\circ\boldsymbol\gamma$ is a smooth curve in $U$.
:::

::: proof
Since $\mathbf{x}_u\times\mathbf{x}_v\ne\mathbf{0}$ at $q$, some $2\times2$ minor of the $3\times2$ matrix $D\mathbf{x}(q)$ is non-zero; say the one formed by the first two rows. Let $\pi(x,y,z) = (x,y)$. Then $\pi\circ\mathbf{x}\colon U\to\R^2$ has invertible derivative at $q$, so by the inverse function theorem (Spivak, *Calculus on Manifolds*, Theorem 2-11) there are open sets $U_1\ni q$ and $V_1\ni\pi(\mathbf{x}(q))$ such that $\pi\circ\mathbf{x}$ maps $U_1$ bijectively onto $V_1$ with a smooth inverse $G\colon V_1\to U_1$. Because $\mathbf{x}$ is a homeomorphism onto the open subset $S\cap W$ of $S$, the image $\mathbf{x}(U_1)$ is open in $S$: $\mathbf{x}(U_1) = S\cap W_1$ for some open $W_1\subseteq\R^3$. Put $W_0 = W_1\cap\pi^{-1}(V_1)$ and $\Phi = G\circ\pi$ on $W_0$. A point $p\in S\cap W_0$ lies in $\mathbf{x}(U_1)$, so $p = \mathbf{x}(u,v)$ with $(u,v)\in U_1$, and then $\Phi(p) = G(\pi(\mathbf{x}(u,v))) = (u,v) = \mathbf{x}^{-1}(p)$. Finally, near any parameter value, $\mathbf{x}^{-1}\circ\boldsymbol\gamma = \Phi\circ\boldsymbol\gamma$ is a composition of smooth maps.
:::

::: corollary Changes of parameters are smooth {#cor-change-of-parameters}
If $\mathbf{x}\colon U\to S$ and $\mathbf{y}\colon V\to S$ are patches of a regular surface whose images overlap in $O = \mathbf{x}(U)\cap\mathbf{y}(V)$, then the **change of parameters** $\mathbf{x}^{-1}\circ\mathbf{y}\colon\mathbf{y}^{-1}(O)\to\mathbf{x}^{-1}(O)$ is a smooth bijection with smooth inverse $\mathbf{y}^{-1}\circ\mathbf{x}$, and its Jacobian determinant never vanishes.
:::

::: proof
Near each point, $\mathbf{x}^{-1}\circ\mathbf{y} = \Phi\circ\mathbf{y}$ with $\Phi$ as in [[#lem-local-inverse]], which is smooth; by symmetry so is $\mathbf{y}^{-1}\circ\mathbf{x}$. The two maps are inverse to each other, so by the chain rule the product of their Jacobian matrices is the identity, and neither determinant can vanish.
:::

This corollary is the reason why "smooth" makes sense on a surface: a function $f\colon S\to\R$ is **smooth** if $f\circ\mathbf{x}$ is smooth for every patch $\mathbf{x}$, and by the corollary it is enough to check one patch around each point.

## The tangent plane

For a regular surface we define the tangent plane without reference to a patch: it consists of all possible velocities of smooth curves moving in the surface.

::: definition Tangent plane {#def-tangent-plane}
Let $S$ be a regular surface and $p\in S$. A vector $\mathbf{w}\in\R^3$ is **tangent to $S$ at $p$** if $\mathbf{w} = \boldsymbol\gamma'(0)$ for some smooth curve $\boldsymbol\gamma\colon(-\eps, \eps)\to\R^3$ with values in $S$ and $\boldsymbol\gamma(0) = p$. The set of tangent vectors at $p$ is the **tangent plane** $T_pS$.
:::

::: theorem The tangent plane is a plane {#thm-tangent-plane}
Let $\mathbf{x}\colon U\to S$ be a patch with $\mathbf{x}(q) = p$. Then

$$
T_pS = \set{a\,\mathbf{x}_u(q) + b\,\mathbf{x}_v(q) : a, b\in\R},
$$

a two-dimensional vector subspace of $\R^3$. In particular the span of $\mathbf{x}_u$ and $\mathbf{x}_v$ at $p$ is the same for every patch around $p$.
:::

::: proof
Given $a, b$, the curve $\boldsymbol\gamma(t) = \mathbf{x}(q + t(a,b))$ is defined for small $t$ (as $U$ is open), lies in $S$, and has $\boldsymbol\gamma'(0) = a\mathbf{x}_u(q) + b\mathbf{x}_v(q)$ by the chain rule. So the span is contained in $T_pS$.

Conversely, let $\boldsymbol\gamma$ be a smooth curve in $S$ with $\boldsymbol\gamma(0) = p$. By continuity $\boldsymbol\gamma(t)\in\mathbf{x}(U)$ for small $\abs{t}$ (as $\mathbf{x}(U)$ is open in $S$), and by [[#lem-local-inverse]] the curve $\boldsymbol\alpha(t) = \mathbf{x}^{-1}(\boldsymbol\gamma(t)) = (u(t), v(t))$ is smooth. Since $\boldsymbol\gamma = \mathbf{x}\circ\boldsymbol\alpha$, the chain rule gives

$$
\boldsymbol\gamma'(0) = u'(0)\,\mathbf{x}_u(q) + v'(0)\,\mathbf{x}_v(q),
$$

which lies in the span. The span is two-dimensional because $\mathbf{x}_u$ and $\mathbf{x}_v$ are independent; and $T_pS$ was defined without any patch, which gives the last statement.
:::

The **unit normal** of a patch is $\mathbf{n} = \dfrac{\mathbf{x}_u\times\mathbf{x}_v}{\norm{\mathbf{x}_u\times\mathbf{x}_v}}$; by the theorem, $T_pS = \mathbf{n}(p)^\perp$, and the affine plane $p + T_pS$ is the tangent plane of [[multivariable/gradient#def-tangent-plane]]. For a level set $S = F^{-1}(c)$ as in [[#thm-level-set]], every curve in $S$ satisfies $F(\boldsymbol\gamma(t)) = c$, so $\nabla F(p)\cdot\boldsymbol\gamma'(0) = 0$; hence $T_pS\subseteq\nabla F(p)^\perp$, and since both are planes they are equal. So $\nabla F/\norm{\nabla F}$ is a unit normal of a level set.

::: widget surface
f: x^3 - 3*x*y^2
x: -1.5, 1.5
y: -1.5, 1.5
tangent: 0.6, 0.3
contours: true
caption: The monkey saddle $z = x^3 - 3xy^2$, a regular surface covered by the single graph patch $\mathbf{x}(u,v) = (u, v, u^3 - 3uv^2)$, with its tangent plane at $(0.6, 0.3)$, spanned by $\mathbf{x}_u = (1, 0, f_u)$ and $\mathbf{x}_v = (0, 1, f_v)$. Rotate the view: every curve on the surface through the point leaves it with a velocity in this plane, as [[#thm-tangent-plane]] asserts. At the origin both partial derivatives vanish and the tangent plane is horizontal, although the surface there curves up in three directions and down in three others.
:::

::: example A tangent plane to the helicoid {#ex-helicoid-tangent}
The **helicoid** is the image of $\mathbf{x}(u,v) = (u\cos v,\ u\sin v,\ v)$, $(u, v)\in\R^2$. Show that $\mathbf{x}$ is a patch and find the tangent plane at $\mathbf{x}(1, \pi/2)$.
::: solution
$\mathbf{x}_u = (\cos v, \sin v, 0)$ and $\mathbf{x}_v = (-u\sin v, u\cos v, 1)$, so $\mathbf{x}_u\times\mathbf{x}_v = (\sin v, -\cos v, u)\ne\mathbf{0}$ (its first two components are never both zero). The map is injective with continuous inverse, since $v = z$ and then $u = x\cos z + y\sin z$. At $(u,v) = (1,\pi/2)$ the point is $(0, 1, \tfrac\pi2)$, the tangent plane is spanned by $\mathbf{x}_u = (0,1,0)$ and $\mathbf{x}_v = (-1, 0, 1)$, and the normal is $\mathbf{x}_u\times\mathbf{x}_v = (1, 0, 1)$. The affine tangent plane is therefore $x + (z - \tfrac\pi2) = 0$, i.e. $x + z = \tfrac\pi2$.
:::
:::

::: quiz
Let $S = F^{-1}(c)$ with $\nabla F\ne\mathbf{0}$ on $S$, and $p\in S$. Which set is $T_pS$?
- [ ] The line through the origin spanned by $\nabla F(p)$
- [x] $\set{\mathbf{w}\in\R^3 : \nabla F(p)\cdot\mathbf{w} = 0}$
- [ ] $\set{\mathbf{w}\in\R^3 : F(p + \mathbf{w}) = c}$
- [ ] All of $\R^3$, since curves can leave $p$ in any direction
::: solution
Tangent vectors are velocities of curves *in* $S$, and differentiating $F(\boldsymbol\gamma(t)) = c$ shows they are orthogonal to $\nabla F(p)$; both sets are planes, so they coincide. The gradient spans the normal line instead. The third set is the surface itself translated so that $p$ moves to the origin, which is generally curved, not a plane.
:::
:::

::: remark Orientation
Under a change of parameters with Jacobian matrix $J$, the normal vectors of two patches are related by $\tilde{\mathbf{x}}_{\tilde u}\times\tilde{\mathbf{x}}_{\tilde v} = (\det J)\,\mathbf{x}_u\times\mathbf{x}_v$ (the computation behind [[multivariable/surface-integrals#thm-param-invariance]]), so the unit normals agree or are opposite according to the sign of $\det J$. A regular surface is **orientable** if it has a continuous unit normal field $\mathbf{n}\colon S\to\R^3$, equivalently an atlas in which all changes of parameters have positive Jacobian. Level sets are orientable (use $\nabla F/\norm{\nabla F}$); the Möbius band is not. Orientation is what flux integrals need ([[multivariable/surface-integrals#def-flux]]), and orientability of closed surfaces is part of their topological classification ([[topology/surfaces]]).
:::

## The first fundamental form

An inhabitant of a surface — an ant, or a surveyor who cannot see the third dimension — can measure lengths of curves, angles between them and areas of regions, all inside the surface. All of these come from the dot product of $\R^3$ restricted to tangent planes.

::: definition First fundamental form {#def-first-ff}
The **first fundamental form** of a regular surface $S$ at $p$ is the quadratic form $\mathrm{I}_p(\mathbf{w}) = \mathbf{w}\cdot\mathbf{w} = \norm{\mathbf{w}}^2$ on $T_pS$. In a patch $\mathbf{x}$, writing $\mathbf{w} = a\,\mathbf{x}_u + b\,\mathbf{x}_v$,

$$
\mathrm{I}_p(\mathbf{w}) = E\,a^2 + 2F\,ab + G\,b^2, \qquad E = \mathbf{x}_u\cdot\mathbf{x}_u,\quad F = \mathbf{x}_u\cdot\mathbf{x}_v,\quad G = \mathbf{x}_v\cdot\mathbf{x}_v .
$$ {#eq-first-ff}

The functions $E, F, G$ on $U$ are the **coefficients of the first fundamental form**, often recorded as the **line element** $ds^2 = E\,du^2 + 2F\,du\,dv + G\,dv^2$.
:::

The symmetric matrix $\begin{pmatrix}E & F\\ F & G\end{pmatrix}$ is the Gram matrix of $\mathbf{x}_u, \mathbf{x}_v$; it is positive definite, and by Lagrange's identity ([[multivariable/vectors-geometry#thm-cross-length]])

$$
EG - F^2 = \norm{\mathbf{x}_u}^2\norm{\mathbf{x}_v}^2 - (\mathbf{x}_u\cdot\mathbf{x}_v)^2 = \norm{\mathbf{x}_u\times\mathbf{x}_v}^2 > 0 .
$$

Everything intrinsic is computed from $E, F, G$:

- **Length.** A curve $\boldsymbol\gamma(t) = \mathbf{x}(u(t), v(t))$, $a\le t\le b$, has velocity $u'\mathbf{x}_u + v'\mathbf{x}_v$, so its length is

$$
L = \int_a^b\sqrt{E\,u'^2 + 2F\,u'v' + G\,v'^2}\;dt .
$$ {#eq-length}

- **Angle.** Two curves through $p$ with velocities $\mathbf{w}_1 = a_1\mathbf{x}_u + b_1\mathbf{x}_v$ and $\mathbf{w}_2 = a_2\mathbf{x}_u + b_2\mathbf{x}_v$ meet at the angle $\theta$ with $\cos\theta = \dfrac{Ea_1a_2 + F(a_1b_2 + a_2b_1) + Gb_1b_2}{\sqrt{\mathrm{I}(\mathbf{w}_1)}\sqrt{\mathrm{I}(\mathbf{w}_2)}}$. In particular the coordinate curves meet at right angles everywhere exactly when $F\equiv0$; such a patch is called **orthogonal**.

- **Area**, treated below.

::: example Four first fundamental forms {#ex-fff}
Compute $E, F, G$ for (a) the plane in polar coordinates, (b) the cylinder $\mathbf{x}(u,v) = (\cos u, \sin u, v)$, (c) the latitude–longitude patch of the sphere, (d) a surface of revolution $\mathbf{x}(u,v) = (f(u)\cos v,\ f(u)\sin v,\ g(u))$ with $f > 0$.
::: solution
(a) $\mathbf{x}(r,\theta) = (r\cos\theta, r\sin\theta, 0)$: $\mathbf{x}_r = (\cos\theta, \sin\theta, 0)$, $\mathbf{x}_\theta = (-r\sin\theta, r\cos\theta, 0)$, so $E = 1$, $F = 0$, $G = r^2$: $ds^2 = dr^2 + r^2d\theta^2$.

(b) $\mathbf{x}_u = (-\sin u, \cos u, 0)$, $\mathbf{x}_v = (0,0,1)$: $E = 1$, $F = 0$, $G = 1$. This is exactly the first fundamental form of the plane in Cartesian coordinates, $ds^2 = du^2 + dv^2$: a bug on the cylinder measures lengths and angles exactly as on a flat sheet. Indeed a sheet of paper can be rolled into a cylinder without stretching.

(c) $E = R^2$, $F = 0$, $G = R^2\cos^2\theta$. A parallel $\theta = \theta_0$ has length $\int_0^{2\pi}\sqrt{G}\,d\varphi = 2\pi R\cos\theta_0$, shrinking towards the poles.

(d) $\mathbf{x}_u = (f'\cos v, f'\sin v, g')$, $\mathbf{x}_v = (-f\sin v, f\cos v, 0)$, so $E = f'^2 + g'^2$, $F = 0$, $G = f^2$. Meridians and parallels are always orthogonal, and if the profile curve $(f(u), g(u))$ is unit-speed then $E = 1$. The patch is regular exactly when the profile curve is regular, since $\norm{\mathbf{x}_u\times\mathbf{x}_v} = f\sqrt{f'^2 + g'^2}$.
:::
:::

::: widget surface
fx: u*cos(v)
fy: u*sin(v)
fz: c*v
u: -1.5, 1.5
v: 0, 4pi
sliders: c=0.4:0:1:0.05
color: height
caption: The helicoid $(u\cos v, u\sin v, cv)$, with first fundamental form $E = 1$, $F = 0$, $G = u^2 + c^2$: the rulings ($v$ constant) are straight lines meeting the helices ($u$ constant) at right angles. Lower $c$ to $0$: the helicoid collapses onto the plane, covered infinitely often, and at $u = 0$ the vectors $\mathbf{x}_u, \mathbf{x}_v$ become dependent — the map stops being a patch.
:::

### Area

The area of the parallelogram spanned by $\mathbf{x}_u\,\Delta u$ and $\mathbf{x}_v\,\Delta v$ is $\norm{\mathbf{x}_u\times\mathbf{x}_v}\Delta u\,\Delta v = \sqrt{EG - F^2}\,\Delta u\,\Delta v$, which leads, as in [[multivariable/surface-integrals#def-surface-area]], to the following.

::: definition Area {#def-area}
Let $\mathbf{x}\colon U\to S$ be a patch and $R\subseteq U$ a closed bounded region whose boundary consists of finitely many smooth curves. The **area** of $\mathbf{x}(R)$ is

$$
A\bigl(\mathbf{x}(R)\bigr) = \iint_R\norm{\mathbf{x}_u\times\mathbf{x}_v}\,du\,dv = \iint_R\sqrt{EG - F^2}\;du\,dv .
$$ {#eq-area}
:::

For this to be a property of the set $\mathbf{x}(R)$, it must not depend on the patch.

::: theorem Area does not depend on the patch {#thm-area-invariance}
Let $\phi\colon\tilde U\to U$ be a change of parameters, $(\tilde u, \tilde v)\mapsto(u, v)$, with Jacobian matrix $J$, and $\tilde{\mathbf{x}} = \mathbf{x}\circ\phi$. Then the coefficients of the first fundamental form transform by

$$
\begin{pmatrix}\tilde E & \tilde F\\ \tilde F & \tilde G\end{pmatrix} = J\T\begin{pmatrix}E & F\\ F & G\end{pmatrix}J ,
$$

so $\sqrt{\tilde E\tilde G - \tilde F^2} = \abs{\det J}\,\sqrt{EG - F^2}$, and for every region $R$ as in [[#def-area]], with $\tilde R = \phi^{-1}(R)$,

$$
\iint_{\tilde R}\sqrt{\tilde E\tilde G - \tilde F^2}\;d\tilde u\,d\tilde v = \iint_R\sqrt{EG - F^2}\;du\,dv .
$$
:::

::: proof
By the chain rule, $\tilde{\mathbf{x}}_{\tilde u} = \mathbf{x}_u\,\pdv{u}{\tilde u} + \mathbf{x}_v\,\pdv{v}{\tilde u}$ and $\tilde{\mathbf{x}}_{\tilde v} = \mathbf{x}_u\,\pdv{u}{\tilde v} + \mathbf{x}_v\,\pdv{v}{\tilde v}$; in matrix form, $(\tilde{\mathbf{x}}_{\tilde u}\ \tilde{\mathbf{x}}_{\tilde v}) = (\mathbf{x}_u\ \mathbf{x}_v)\,J$ as $3\times2$ matrices. The Gram matrix of the columns of $MJ$ is $(MJ)\T(MJ) = J\T(M\T M)J$, which is the transformation law. Taking determinants, $\tilde E\tilde G - \tilde F^2 = (\det J)^2(EG - F^2)$. Finally, by the change of variables theorem ([[multivariable/change-of-variables#thm-change-of-variables]]) applied to the diffeomorphism $\phi$,

$$
\iint_R\sqrt{EG - F^2}\;du\,dv = \iint_{\tilde R}\sqrt{EG - F^2}\circ\phi\;\abs{\det J}\;d\tilde u\,d\tilde v = \iint_{\tilde R}\sqrt{\tilde E\tilde G - \tilde F^2}\;d\tilde u\,d\tilde v .
$$
:::

By [[#cor-change-of-parameters]], two patches covering the same region are related by a change of parameters, so the area of a region covered by one patch is well defined; a region that needs several patches is cut into pieces, each inside one patch, and the areas are added. The same transformation law shows that the length formula [[#eq-length]] gives the same answer in any patch, as it must, since it computes $\int\norm{\boldsymbol\gamma'}\,dt$.

For example, the latitude–longitude patch gives the area of the sphere minus a meridian, which is the area of the sphere: $\int_0^{2\pi}\int_{-\pi/2}^{\pi/2}R^2\cos\theta\,d\theta\,d\varphi = 4\pi R^2$. For the torus of [[#ex-level-sets]], $E = b^2$, $F = 0$, $G = (a + b\cos u)^2$, and the area is $\int_0^{2\pi}\int_0^{2\pi}b(a + b\cos u)\,du\,dv = 4\pi^2ab$.

::: quiz
A patch has $E = 1$, $F = 0$ and $G = \cosh^2u$. What is the length of the coordinate curve $v\mapsto\mathbf{x}(0, v)$, $0\le v\le2\pi$?
- [x] $2\pi$
- [ ] $2\pi\cosh^2 1$
- [ ] $\pi$
- [ ] It cannot be determined from $E$, $F$, $G$ alone
::: solution
Along the curve $u = 0$, $v = t$ we have $u' = 0$ and $v' = 1$, so by [[#eq-length]] the length is $\int_0^{2\pi}\sqrt{G(0, t)}\,dt = \int_0^{2\pi}\cosh 0\,dt = 2\pi$. Lengths of curves are exactly the kind of thing the first fundamental form determines, whatever the surface looks like in space.
:::
:::

## Conformal patches and maps of the Earth

A patch preserves lengths only if $E = G = 1$ and $F = 0$, and we will see in [[differential-geometry/theorema-egregium]] that no patch of the sphere can do that. A weaker but very useful property is the preservation of angles.

::: definition Conformal patch {#def-conformal}
A patch is **conformal** (or **isothermal**) if $E = G$ and $F = 0$ at every point, so that $ds^2 = \lambda(u,v)^2\,(du^2 + dv^2)$ for a positive function $\lambda$.
:::

In a conformal patch the angle formula reduces to $\cos\theta = \dfrac{a_1a_2 + b_1b_2}{\sqrt{a_1^2 + b_1^2}\sqrt{a_2^2 + b_2^2}}$, the angle between the parameter vectors $(a_1, b_1)$ and $(a_2, b_2)$ in the plane: curves on the surface meet at the same angles as their pictures in the $(u,v)$-plane, although lengths are scaled by the factor $\lambda$, which varies from point to point. Two classical examples are the inverse of **stereographic projection** ([[#exr-stereographic]]) and Mercator's patch of the unit sphere,

$$
\mathbf{x}(\varphi, \psi) = (\operatorname{sech}\psi\cos\varphi,\ \operatorname{sech}\psi\sin\varphi,\ \tanh\psi), \qquad (\varphi, \psi)\in(0, 2\pi)\times\R,
$$

for which a direct computation gives $E = G = \operatorname{sech}^2\psi$ and $F = 0$. (Here $\varphi$ is the longitude and $\psi$ is related to the latitude $\theta$ by $\sin\theta = \tanh\psi$.)

::: example A rhumb line to the pole {#ex-loxodrome}
A ship sails on the unit sphere along a **loxodrome** (rhumb line): a curve that crosses every meridian at the same angle $\alpha$, $0\le\alpha < \pi/2$. Show that the loxodrome from the equator to the north pole has length $\dfrac{\pi}{2\cos\alpha}$, although it winds around the pole infinitely often when $\alpha > 0$.
::: solution
Use Mercator's patch. The meridians are the vertical lines $\varphi = $ const, and since the patch is conformal, a curve crossing them at the constant angle $\alpha$ is, in the $(\varphi, \psi)$-plane, a curve crossing vertical lines at angle $\alpha$: a straight line $\varphi = \varphi_0 + \psi\tan\alpha$. Parametrise it by $\psi\in[0, \infty)$ (the equator is $\psi = 0$ and the pole is approached as $\psi\to\infty$). Then $\varphi' = \tan\alpha$, $\psi' = 1$, and by [[#eq-length]],

$$
L = \int_0^\infty\sqrt{\operatorname{sech}^2\psi\,(\tan^2\alpha + 1)}\;d\psi = \frac{1}{\cos\alpha}\int_0^\infty\operatorname{sech}\psi\,d\psi = \frac{1}{\cos\alpha}\Bigl[2\arctan e^\psi\Bigr]_0^\infty = \frac{1}{\cos\alpha}\left(\pi - \frac\pi2\right) = \frac{\pi}{2\cos\alpha}.
$$

The longitude $\varphi = \varphi_0 + \psi\tan\alpha$ grows without bound, so the ship circles the pole infinitely many times, yet travels only a finite distance. For $\alpha = 0$ the loxodrome is a meridian, of length $\pi/2$.
:::
:::

::: application Mercator's map
Gerardus Mercator's world map of 1569 draws the point with longitude $\varphi$ and Mercator coordinate $\psi$ at the position $(\varphi, \psi)$ of the plane — it is the inverse of the conformal patch above. Because the patch is conformal, compass bearings are preserved, and a course of constant bearing (a loxodrome) appears as a straight line, which is exactly what a navigator needs. The price is the scale factor $1/\lambda = \cosh\psi = \sec\theta$: Greenland appears about as large as Africa, although Africa is some fourteen times larger. Stereographic projection is also conformal and is used for polar charts and in complex analysis, where it identifies the sphere with the extended complex plane ([[complex-analysis/complex-numbers]]).
:::

::: history
Carl Friedrich Gauss introduced the first fundamental form in his *Disquisitiones generales circa superficies curvas* (1827), writing the line element of a surface as $ds^2 = E\,dp^2 + 2F\,dp\,dq + G\,dq^2$ in curvilinear coordinates $p, q$ — the notation $E, F, G$ is his. He was led to it partly by geodesy: through the 1820s he directed the triangulation survey of the Kingdom of Hanover, which required doing geometry on the curved surface of the Earth. Map-makers had long faced the same problem: Mercator published his conformal world chart in 1569, and in 1599 Edward Wright explained its mathematical construction and published tables for it. The modern definition of a surface by an atlas of compatible patches came much later. It was made precise for Riemann surfaces by Hermann Weyl in *Die Idee der Riemannschen Fläche* (1913) and for differentiable manifolds in general by Hassler Whitney in 1936.
:::

## Where this leads

The first fundamental form records how to measure *inside* a surface. The next chapter, [[differential-geometry/surface-curvature]], studies how the surface bends in space, through the rate at which its unit normal turns; this leads to the second fundamental form and the Gaussian curvature. Gauss's *Theorema Egregium* ([[differential-geometry/theorema-egregium]]) then shows that, astonishingly, the Gaussian curvature can be computed from $E, F, G$ alone — and this is why the cylinder, whose first fundamental form is that of the plane, has zero curvature, while no map of the sphere can preserve distances. Geodesics, the locally shortest paths on a surface, are defined using only the first fundamental form ([[differential-geometry/geodesics-gauss-bonnet]]). In Riemannian geometry the first fundamental form, freed from any ambient $\R^3$, becomes the *metric* of a manifold, the basic object of general relativity.

::: summary
- A surface patch is a smooth map $\mathbf{x}\colon U\to\R^3$ that is a homeomorphism onto its image and has $\mathbf{x}_u\times\mathbf{x}_v\ne\mathbf{0}$ ([[#def-surface-patch]]); a regular surface is a set covered by patches whose images are open pieces of it ([[#def-regular-surface]]).
- Graphs of smooth functions and level sets $F = c$ with $\nabla F\ne\mathbf{0}$ are regular surfaces ([[#thm-level-set]]); the double cone is not ([[#ex-cone]]).
- Changes of parameters between patches are diffeomorphisms ([[#cor-change-of-parameters]]), so smoothness and other geometric notions do not depend on the patch.
- The tangent plane $T_pS$, the set of velocities of curves in $S$ through $p$, equals $\Span\set{\mathbf{x}_u, \mathbf{x}_v}$ for any patch, and $\nabla F(p)^\perp$ for a level set ([[#thm-tangent-plane]]).
- The first fundamental form $\mathrm{I}_p(\mathbf{w}) = \norm{\mathbf{w}}^2$ has coefficients $E = \mathbf{x}_u\cdot\mathbf{x}_u$, $F = \mathbf{x}_u\cdot\mathbf{x}_v$, $G = \mathbf{x}_v\cdot\mathbf{x}_v$; lengths, angles and areas on $S$ are computed from them ([[#def-first-ff]]).
- Area $=\iint\sqrt{EG - F^2}\,du\,dv$, independent of the patch because $(E,F,G)$ transforms by $J\T(\cdot)J$ ([[#thm-area-invariance]]).
- Plane and cylinder have the same $E, F, G$; conformal patches ($E = G$, $F = 0$) such as Mercator's preserve angles but not lengths.
:::

## Exercises

::: exercise A paraboloid {level=1 check="9"}
For the patch $\mathbf{x}(u,v) = (u, v, u^2 + v^2)$ of the paraboloid, compute $E$, $F$, $G$ and the value of $EG - F^2$ at $(u,v) = (1,1)$. (Enter $EG - F^2$.)
::: solution
$\mathbf{x}_u = (1, 0, 2u)$ and $\mathbf{x}_v = (0, 1, 2v)$, so $E = 1 + 4u^2$, $F = 4uv$, $G = 1 + 4v^2$. At $(1,1)$: $E = G = 5$, $F = 4$, and $EG - F^2 = 25 - 16 = 9$. (In general $EG - F^2 = 1 + 4u^2 + 4v^2 = \norm{\mathbf{x}_u\times\mathbf{x}_v}^2$.)
:::
:::

::: exercise A parallel of latitude {level=1 check="pi"}
Find the length of the parallel of latitude $\theta = \pi/3$ on the unit sphere.
::: solution
By [[#ex-fff]](c) with $R = 1$, $G = \cos^2\theta$, and the parallel $\varphi\mapsto\mathbf{x}(\pi/3, \varphi)$ has length $\int_0^{2\pi}\cos\tfrac\pi3\,d\varphi = 2\pi\cdot\tfrac12 = \pi$.
:::
:::

::: exercise The helicoid {level=1}
Compute the first fundamental form of the helicoid patch $\mathbf{x}(u,v) = (u\cos v, u\sin v, v)$ and show that the patch is orthogonal. What is the angle between a ruling ($v$ constant) and a helix ($u$ constant)?
::: solution
From [[#ex-helicoid-tangent]], $\mathbf{x}_u = (\cos v, \sin v, 0)$ and $\mathbf{x}_v = (-u\sin v, u\cos v, 1)$, so $E = 1$, $F = -u\sin v\cos v + u\sin v\cos v = 0$, $G = u^2 + 1$. Since $F = 0$ the coordinate curves meet at right angles: every ruling is perpendicular to every helix it crosses.
:::
:::

::: exercise Area of a torus {level=2 check="8*pi^2"}
Find the area of the torus of [[#ex-level-sets]] with $a = 2$ and $b = 1$.
::: solution
$\sqrt{EG - F^2} = b(a + b\cos u)$, so the area is $\int_0^{2\pi}\int_0^{2\pi}(2 + \cos u)\,du\,dv = 2\pi\cdot4\pi = 8\pi^2$, in agreement with $4\pi^2ab$. (The image of the open patch misses two circles, which have zero area.)
:::
:::

::: exercise A loxodrome at 45 degrees {level=2 check="pi/sqrt(2)"}
How long is the loxodrome on the unit sphere that crosses every meridian at $45^\circ$, from the equator to the north pole?
::: solution
By [[#ex-loxodrome]], $L = \dfrac{\pi}{2\cos(\pi/4)} = \dfrac{\pi}{\sqrt2}\approx2.22$, compared with $\pi/2\approx1.57$ along a meridian.
:::
:::

::: exercise Area of a catenoid {#exr-catenoid level=2 check="2*pi + pi*sinh(2)"}
The **catenoid** is the surface of revolution $\mathbf{x}(u,v) = (\cosh u\cos v,\ \cosh u\sin v,\ u)$. Compute its first fundamental form and the area of the part with $-1\le u\le1$.
::: solution
By [[#ex-fff]](d) with $f = \cosh u$ and $g = u$: $E = \sinh^2u + 1 = \cosh^2u$, $F = 0$, $G = \cosh^2u$ (so the patch is conformal). Then $\sqrt{EG - F^2} = \cosh^2u$ and the area is

$$
2\pi\int_{-1}^1\cosh^2u\,du = 2\pi\left[\frac u2 + \frac{\sinh2u}{4}\right]_{-1}^1 = 2\pi\left(1 + \frac{\sinh2}{2}\right) = 2\pi + \pi\sinh2\approx17.68 .
$$
:::
:::

::: exercise A ruled quadric {level=2}
Show that the hyperboloid $S\colon x^2 + y^2 - z^2 = 1$ is a regular surface, find its tangent plane at $p = (1, 0, 0)$, and show that this tangent plane meets $S$ in two straight lines through $p$.
::: solution
$S$ is regular by [[#ex-level-sets]]. At $p$, $\nabla F = (2x, 2y, -2z) = (2, 0, 0)$, so $T_pS = \set{\mathbf{w} : w_1 = 0}$ and the affine tangent plane is $x = 1$. Substituting $x = 1$ into the equation gives $y^2 - z^2 = 0$, i.e. $y = \pm z$: the intersection is the pair of lines $(1, s, s)$ and $(1, s, -s)$, $s\in\R$, which lie on $S$ and pass through $p$. (Every point of the hyperboloid is like this: it is a doubly ruled surface.)
:::
:::

::: exercise Stereographic projection {#exr-stereographic level=3}
Let $N = (0,0,1)$. Show that the map $\mathbf{x}(u,v) = \dfrac{(2u,\ 2v,\ u^2 + v^2 - 1)}{u^2 + v^2 + 1}$ sends $(u, v)$ to the second point where the line through $N$ and $(u, v, 0)$ meets the unit sphere, that it is a conformal patch with $E = G = \dfrac{4}{(1 + u^2 + v^2)^2}$, and that $S^2$ can be covered by two patches.
::: hint
For the last part, use the analogous map built from the south pole.
:::
::: solution
Points of the line are $N + t\bigl((u, v, 0) - N\bigr) = (tu, tv, 1 - t)$. This lies on the sphere when $t^2(u^2 + v^2) + (1 - t)^2 = 1$, i.e. $t\bigl(t(u^2 + v^2 + 1) - 2\bigr) = 0$; the solution $t = 0$ is $N$ and the other is $t = 2/(u^2+v^2+1)$, giving $\mathbf{x}(u,v)$. Writing $\delta = u^2 + v^2 + 1$, a computation gives $\mathbf{x}_u = \frac{2}{\delta^2}\bigl(\delta - 2u^2,\ -2uv,\ 2u\bigr)$ and $\mathbf{x}_v = \frac{2}{\delta^2}\bigl(-2uv,\ \delta - 2v^2,\ 2v\bigr)$, whence

$$
E = \frac{4}{\delta^4}\bigl((\delta - 2u^2)^2 + 4u^2v^2 + 4u^2\bigr) = \frac{4}{\delta^4}\bigl(\delta^2 - 4u^2\delta + 4u^2(u^2 + v^2 + 1)\bigr) = \frac{4}{\delta^2},
$$

and similarly $G = 4/\delta^2$ and $F = \frac{4}{\delta^4}\bigl(-2uv(\delta - 2u^2) - 2uv(\delta - 2v^2) + 4uv\bigr) = \frac{4}{\delta^4}\bigl(-4uv\delta + 4uv(u^2 + v^2 + 1)\bigr) = 0$. Since $E = G > 0$ and $F = 0$, the vectors $\mathbf{x}_u, \mathbf{x}_v$ are independent and the patch is conformal. The map is a bijection from $\R^2$ onto $S^2\setminus\set{N}$ whose inverse, $(x, y, z)\mapsto\bigl(\frac{x}{1-z}, \frac{y}{1-z}\bigr)$ (the projection from $N$), is continuous; so it is a patch. Projecting from the south pole instead gives a patch onto $S^2\setminus\set{(0,0,-1)}$, and the two patches cover $S^2$.
:::
:::

::: exercise One patch is not enough {#exr-one-patch level=3}
Prove that the sphere $S^2$ is not the image of a single surface patch.
::: hint
A patch is a homeomorphism onto its image. Compare compactness of $S^2$ and of an open subset of $\R^2$.
:::
::: solution
Suppose $\mathbf{x}\colon U\to\R^3$ were a patch with $\mathbf{x}(U) = S^2$. Then $\mathbf{x}^{-1}\colon S^2\to U$ is continuous and onto, and $S^2$ is compact (closed and bounded in $\R^3$), so $U$ is compact, hence closed and bounded in $\R^2$ ([[topology/compactness]]). But $U$ is also open and non-empty. Since $\R^2$ is connected, its only subsets that are both open and closed are $\emptyset$ and $\R^2$; so $U = \R^2$, which is not bounded — a contradiction. Hence every atlas of the sphere has at least two patches, and two suffice by [[#exr-stereographic]].
:::
:::

::: exercise A roof is not a surface {level=3}
Prove that the "roof" $S = \set{(x, y, z) : z = \abs{x}}$ is not a regular surface.
::: hint
If $S$ were regular, [[#lem-local-inverse]] would show that the velocity at $t = 0$ of a curve $\boldsymbol\gamma\colon[0,\eps)\to S$ that is smooth up to $t = 0$ also lies in $T_{\mathbf{0}}S$. Find three such one-sided curves at the origin with independent velocities.
:::
::: solution
Suppose $S$ were a regular surface, and let $\mathbf{x}$ be a patch around the origin, with $\Phi$ as in [[#lem-local-inverse]]. If $\boldsymbol\gamma\colon[0,\eps)\to S$ is the restriction of a smooth map on an open interval with $\boldsymbol\gamma(0) = \mathbf{0}$, then $\boldsymbol\alpha = \Phi\circ\boldsymbol\gamma$ is a smooth one-sided curve in $U$ and $\boldsymbol\gamma = \mathbf{x}\circ\boldsymbol\alpha$, so by the chain rule $\boldsymbol\gamma'(0) = u'(0)\mathbf{x}_u + v'(0)\mathbf{x}_v\in T_{\mathbf{0}}S$. Apply this to $\boldsymbol\gamma_1(t) = (t, 0, t)$ and $\boldsymbol\gamma_2(t) = (-t, 0, t)$, $t\ge0$, which lie in $S$ and are restrictions of linear maps; and to $\boldsymbol\gamma_3(t) = (0, t, 0)$, $t\in\R$. Their velocities $(1,0,1)$, $(-1,0,1)$ and $(0,1,0)$ are linearly independent, so the plane $T_{\mathbf{0}}S$ would contain three independent vectors, which is impossible. Hence $S$ is not a regular surface: no tangent plane can fit the crease.
:::
:::
