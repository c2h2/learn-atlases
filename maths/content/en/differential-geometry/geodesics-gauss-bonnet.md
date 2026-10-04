An ant walks across a curved surface, always going "straight ahead": never turning left or right, as far as it can tell. What path does it follow? On a plane it walks a straight line; on a sphere, a great circle — the route an aircraft flies between two cities. Such paths are **geodesics**, the straight lines of curved geometry: locally the shortest routes, determined by differential equations that depend only on the first fundamental form.

Draw a triangle on the sphere whose sides are geodesics, and its angles add up to *more* than $\pi$; on a saddle-shaped surface they add up to less. Gauss discovered that the excess is exactly the total Gaussian curvature inside the triangle. Bonnet extended this to arbitrary regions, and the global version of their theorem is one of the most beautiful results in mathematics: for every compact orientable surface,

$$
\iint_S K\,dA = 2\pi\chi(S),
$$

where $\chi(S)$ is the Euler characteristic, a number that depends only on the topology of $S$: it is $2$ for a sphere and $0$ for a torus. However you dent a sphere, the total curvature stays $4\pi$; on any doughnut the positive and negative curvature cancel exactly. This chapter builds up to this **Gauss–Bonnet theorem** through geodesic curvature, geodesics, parallel transport and holonomy.

We use the notation of the previous chapters: a regular surface $S$ with patches $\mathbf{x}(u,v)$, first fundamental form $E, F, G$ ([[differential-geometry/regular-surfaces#def-first-ff]]), unit normal $\mathbf{n}$, normal curvature $\kappa_n$ ([[differential-geometry/surface-curvature#thm-meusnier]]), and the Christoffel symbols $\Gamma^k_{ij}$ of [[differential-geometry/theorema-egregium#def-christoffel]] (index $1$ stands for $u$ and $2$ for $v$), defined by the Gauss formulas

$$
\mathbf{x}_{uu} = \Gamma^1_{11}\mathbf{x}_u + \Gamma^2_{11}\mathbf{x}_v + L\mathbf{n}, \qquad \mathbf{x}_{uv} = \Gamma^1_{12}\mathbf{x}_u + \Gamma^2_{12}\mathbf{x}_v + M\mathbf{n}, \qquad \mathbf{x}_{vv} = \Gamma^1_{22}\mathbf{x}_u + \Gamma^2_{22}\mathbf{x}_v + N\mathbf{n}.
$$

## Geodesic curvature

Let $\boldsymbol\gamma(s)$ be a curve on an oriented surface $S$, parametrised by arc length, with unit tangent $\mathbf{T} = \boldsymbol\gamma'$. Along the curve we have three mutually orthogonal unit vectors: $\mathbf{T}$, the surface normal $\mathbf{n}$, and

$$
\mathbf{V} = \mathbf{n}\times\mathbf{T},
$$

the unit vector in the tangent plane obtained by rotating $\mathbf{T}$ through a right angle "to the left" (with $\mathbf{n}$ pointing up). The frame $(\mathbf{T}, \mathbf{V}, \mathbf{n})$ is the **Darboux frame** of the curve. Since $\mathbf{T}\cdot\mathbf{T} = 1$, the derivative $\mathbf{T}'$ is orthogonal to $\mathbf{T}$, so it is a combination of $\mathbf{V}$ and $\mathbf{n}$.

::: definition Geodesic curvature {#def-geodesic-curvature}
The **geodesic curvature** $\kappa_g$ and the normal curvature $\kappa_n$ of a unit-speed curve $\boldsymbol\gamma$ on $S$ are defined by

$$
\mathbf{T}' = \kappa_g\,\mathbf{V} + \kappa_n\,\mathbf{n}, \qquad\text{that is}\qquad \kappa_g = \boldsymbol\gamma''\cdot(\mathbf{n}\times\boldsymbol\gamma'), \quad \kappa_n = \boldsymbol\gamma''\cdot\mathbf{n} .
$$

For a regular curve with an arbitrary parametrisation, $\kappa_g = \dfrac{\mathbf{n}\cdot(\boldsymbol\gamma'\times\boldsymbol\gamma'')}{\norm{\boldsymbol\gamma'}^3}$.
:::

(The last formula follows from the first by the cyclic symmetry of the triple product, after the chain-rule computation $\frac{d\mathbf{T}}{ds} = \frac{\boldsymbol\gamma''}{\norm{\boldsymbol\gamma'}^2} - (\cdots)\,\boldsymbol\gamma'$, whose $\boldsymbol\gamma'$-term is orthogonal to $\mathbf{V}$.) The normal curvature measures the bending of the curve that is forced on it by the surface; the geodesic curvature measures how much the curve bends *within* the surface — how sharply an inhabitant feels it turning. For a curve in the $xy$-plane with $\mathbf{n} = \mathbf{k}$, $\mathbf{V}$ is $\mathbf{T}$ rotated anticlockwise by $\pi/2$ and $\kappa_g$ is the signed curvature of [[differential-geometry/curves#def-signed-curvature]].

::: theorem Splitting the curvature {#thm-curvature-split}
For a unit-speed curve on a surface, $\kappa^2 = \kappa_g^2 + \kappa_n^2$, where $\kappa$ is its curvature as a space curve.
:::

::: proof
By the Frenet–Serret formulas ([[differential-geometry/curves#thm-frenet]]) $\mathbf{T}' = \kappa\mathbf{N}$, so $\kappa^2 = \norm{\mathbf{T}'}^2$. Since $\mathbf{V}$ and $\mathbf{n}$ are orthonormal, $\norm{\mathbf{T}'}^2 = \norm{\kappa_g\mathbf{V} + \kappa_n\mathbf{n}}^2 = \kappa_g^2 + \kappa_n^2$.
:::

Reversing the direction of the curve, or the orientation of the surface, changes the sign of $\mathbf{V}$ and hence of $\kappa_g$; its absolute value is unaffected.

::: example A circle of latitude {#ex-latitude}
Find the geodesic curvature of the circle of latitude $\theta_0$ (with $0\le\theta_0 < \pi/2$) on the sphere of radius $R$, traversed eastwards, with the outward normal.
::: solution
The circle has radius $r = R\cos\theta_0$; at unit speed it is $\boldsymbol\gamma(s) = \bigl(r\cos\tfrac sr,\ r\sin\tfrac sr,\ R\sin\theta_0\bigr)$. Its curvature is $\kappa = 1/r$, and $\boldsymbol\gamma'' = -\tfrac{1}{r}\bigl(\cos\tfrac sr, \sin\tfrac sr, 0\bigr)$ points horizontally towards the axis. With $\mathbf{n} = \boldsymbol\gamma/R$,

$$
\kappa_n = \boldsymbol\gamma''\cdot\mathbf{n} = -\frac{1}{r}\cdot\frac{r}{R} = -\frac1R, \qquad \kappa_g^2 = \kappa^2 - \kappa_n^2 = \frac{1}{R^2\cos^2\theta_0} - \frac{1}{R^2} = \frac{\tan^2\theta_0}{R^2}.
$$

A direct computation of $\mathbf{n}\cdot(\boldsymbol\gamma'\times\boldsymbol\gamma'')$ fixes the sign: $\kappa_g = \tan\theta_0/R$, positive because, walking east in the northern hemisphere with your head pointing out of the sphere, the circle bends to your left, towards the pole. On the equator $\kappa_g = 0$, and near the pole $\kappa_g$ is very large: small circles round the pole turn sharply even for an inhabitant of the sphere.
:::
:::

::: widget frenet
fx: cos(a)*cos(t)
fy: cos(a)*sin(t)
fz: sin(a)
t: 0, 2pi
sliders: a=0.8:0:1.4:0.05
caption: A circle of latitude $a$ on the unit sphere with its Frenet frame. The principal normal $\mathbf{N}$ points horizontally at the axis, while the sphere's normal points away from the centre; $\mathbf{N}$ makes the angle $a$, the latitude, with the inward normal. The part of the curvature $\kappa = 1/\cos a$ along the sphere's normal is $\kappa_n = -1$, and the rest, $\kappa_g = \tan a$, is the turning felt on the sphere. Move $a$ to $0$: $\mathbf{N}$ points straight at the centre, along the sphere's normal line, and the equator becomes a geodesic.
:::

## Geodesics

To speak of "acceleration felt on the surface" for curves that are not unit speed, and later of transporting vectors, we project derivatives onto the tangent plane.

::: definition Covariant derivative {#def-covariant-derivative}
Let $\boldsymbol\gamma\colon I\to S$ be a smooth curve and $\mathbf{w}(t)$ a smooth vector field along $\boldsymbol\gamma$ that is tangent to $S$, $\mathbf{w}(t)\in T_{\boldsymbol\gamma(t)}S$. The **covariant derivative** of $\mathbf{w}$ is the tangential part of its ordinary derivative:

$$
\frac{D\mathbf{w}}{dt} = \mathbf{w}' - (\mathbf{w}'\cdot\mathbf{n})\,\mathbf{n}.
$$
:::

In a patch, write $\boldsymbol\gamma(t) = \mathbf{x}(u(t), v(t))$ and $\mathbf{w} = a\mathbf{x}_u + b\mathbf{x}_v$. Then $\mathbf{w}' = a'\mathbf{x}_u + b'\mathbf{x}_v + a(\mathbf{x}_{uu}u' + \mathbf{x}_{uv}v') + b(\mathbf{x}_{uv}u' + \mathbf{x}_{vv}v')$; substituting the Gauss formulas and discarding the normal components gives

$$
\frac{D\mathbf{w}}{dt} = \bigl(a' + \Gamma^1_{11}au' + \Gamma^1_{12}(av' + bu') + \Gamma^1_{22}bv'\bigr)\mathbf{x}_u + \bigl(b' + \Gamma^2_{11}au' + \Gamma^2_{12}(av' + bu') + \Gamma^2_{22}bv'\bigr)\mathbf{x}_v .
$$ {#eq-covariant}

The covariant derivative therefore depends only on $E, F, G$ (through the Christoffel symbols), not on how the surface sits in space. For a unit-speed curve, $D\mathbf{T}/ds = \kappa_g\mathbf{V}$, so the geodesic curvature is intrinsic too.

::: definition Geodesic {#def-geodesic}
A smooth curve $\boldsymbol\gamma\colon I\to S$ is a **geodesic** if $\dfrac{D\boldsymbol\gamma'}{dt} = \mathbf{0}$ for all $t$; that is, the acceleration $\boldsymbol\gamma''(t)$ is zero or normal to $S$ at every point.
:::

A geodesic automatically has constant speed, since $\frac{d}{dt}\norm{\boldsymbol\gamma'}^2 = 2\,\boldsymbol\gamma'\cdot\boldsymbol\gamma'' = 0$. For unit-speed curves, $\boldsymbol\gamma$ is a geodesic exactly when $\kappa_g\equiv0$; a regular curve with $\kappa_g\equiv0$ becomes a geodesic when reparametrised by arc length.

::: intuition Free particles on a surface
A particle sliding on a frictionless surface, acted on only by the surface's reaction (which is normal to it), has $m\boldsymbol\gamma'' = $ normal force, so by Newton's second law it moves along a geodesic at constant speed. It feels no sideways force: from its point of view it is moving straight ahead.
:::

The basic examples:

- **Planes.** $\boldsymbol\gamma'' = \mathbf{0}$ forces straight lines at constant speed.
- **Spheres.** A great circle of the sphere of radius $R$ at unit speed is $\boldsymbol\gamma(s) = R\bigl(\cos\tfrac sR\,\mathbf{e} + \sin\tfrac sR\,\mathbf{f}\bigr)$ with orthonormal $\mathbf{e}, \mathbf{f}$; then $\boldsymbol\gamma'' = -\boldsymbol\gamma/R^2$, which is normal to the sphere. Every great circle is a geodesic; the other circles are not, by [[#ex-latitude]].
- **Cylinders.** For the helix $\boldsymbol\gamma(t) = (R\cos at,\ R\sin at,\ bt)$ on the cylinder $x^2 + y^2 = R^2$, $\boldsymbol\gamma'' = -a^2R(\cos at, \sin at, 0)$ points straight at the axis, along the normal. Helices — including circles ($b = 0$) and rulings ($a = 0$) — are geodesics.

::: quiz
Which of the following curves on the unit sphere, traversed at constant speed, are geodesics? (Select all that apply.)
- [x] the equator
- [ ] the circle of latitude $45^\circ$ north
- [x] the intersection of the sphere with the plane $x + y + z = 0$
- [ ] the intersection of the sphere with the plane $z = \tfrac12$
- [x] a meridian from the north pole to the south pole
::: solution
The geodesics of the sphere are its great circles: the intersections with planes through the centre. The equator, the circle in the plane $x + y + z = 0$ and the meridians are great circles (or arcs of them). The circle of latitude $45^\circ$ and the circle at height $z = \tfrac12$ are small circles with $\kappa_g = \tan\theta_0\ne0$.
:::
:::

### The geodesic equations

::: theorem The geodesic equations {#thm-geodesic-equations}
A curve $\boldsymbol\gamma(t) = \mathbf{x}(u(t), v(t))$ in a patch is a geodesic if and only if

$$
\begin{aligned}
u'' + \Gamma^1_{11}\,u'^2 + 2\Gamma^1_{12}\,u'v' + \Gamma^1_{22}\,v'^2 &= 0,\\
v'' + \Gamma^2_{11}\,u'^2 + 2\Gamma^2_{12}\,u'v' + \Gamma^2_{22}\,v'^2 &= 0 .
\end{aligned}
$$ {#eq-geodesic}
:::

::: proof
Apply [[#eq-covariant]] to $\mathbf{w} = \boldsymbol\gamma' = u'\mathbf{x}_u + v'\mathbf{x}_v$, i.e. $a = u'$, $b = v'$. The coefficients of $\mathbf{x}_u$ and $\mathbf{x}_v$ in $D\boldsymbol\gamma'/dt$ are the left-hand sides of [[#eq-geodesic]], and since $\mathbf{x}_u, \mathbf{x}_v$ are linearly independent, $D\boldsymbol\gamma'/dt = \mathbf{0}$ exactly when both vanish.
:::

Since the Christoffel symbols are determined by $E, F, G$, so are the geodesics: **a local isometry maps geodesics to geodesics** ([[differential-geometry/theorema-egregium#def-local-isometry]]); rolling up a plane turns its straight lines into the geodesics of a cylinder. For an orthogonal patch ($F = 0$) the Christoffel symbols are

$$
\Gamma^1_{11} = \frac{E_u}{2E},\quad \Gamma^2_{11} = -\frac{E_v}{2G},\quad \Gamma^1_{12} = \frac{E_v}{2E},\quad \Gamma^2_{12} = \frac{G_u}{2G},\quad \Gamma^1_{22} = -\frac{G_u}{2E},\quad \Gamma^2_{22} = \frac{G_v}{2G}.
$$

::: theorem Existence and uniqueness of geodesics {#thm-geodesic-existence}
For every point $p\in S$ and every tangent vector $\mathbf{w}\in T_pS$ there are $\eps > 0$ and a geodesic $\boldsymbol\gamma\colon(-\eps,\eps)\to S$ with $\boldsymbol\gamma(0) = p$ and $\boldsymbol\gamma'(0) = \mathbf{w}$. Two geodesics with the same initial point and initial velocity agree wherever both are defined.
:::

::: proof
Choose a patch with $p = \mathbf{x}(u_0, v_0)$ and write $\mathbf{w} = a\mathbf{x}_u + b\mathbf{x}_v$. With $y = (u, v, u', v')$, the system [[#eq-geodesic]] is a first-order system $y' = \Phi(y)$ whose right-hand side is smooth, because the Christoffel symbols are smooth functions of $(u,v)$ (they are rational in $E, F, G$ and their derivatives, with denominator $EG - F^2 > 0$). Smooth functions are locally Lipschitz, so by the Picard–Lindelöf theorem ([[ode/existence-uniqueness]]) there is a unique solution with $y(0) = (u_0, v_0, a, b)$ on some interval $(-\eps, \eps)$. Uniqueness for overlapping patches follows because being a geodesic is a geometric condition, independent of the patch used to express it.
:::

::: example All geodesics of the sphere {#ex-sphere-geodesics}
Write down the geodesic equations for the sphere of radius $R$ in latitude–longitude coordinates $\mathbf{x}(\theta,\varphi) = (R\cos\theta\cos\varphi, R\cos\theta\sin\varphi, R\sin\theta)$, check them on the equator and the meridians, and show that every geodesic of the sphere is a great circle traversed at constant speed.
::: solution
Here $E = R^2$, $F = 0$, $G = R^2\cos^2\theta$, and the formulas above give $\Gamma^2_{12} = \frac{G_\theta}{2G} = -\tan\theta$, $\Gamma^1_{22} = -\frac{G_\theta}{2E} = \sin\theta\cos\theta$, all other symbols being $0$. The geodesic equations are

$$
\theta'' + \sin\theta\cos\theta\,\varphi'^2 = 0, \qquad \varphi'' - 2\tan\theta\,\theta'\varphi' = 0 .
$$

On the equator $\theta = 0$, $\varphi = t/R$, both hold; on a meridian $\varphi = \varphi_0$, $\theta = t/R$, both hold. For the general case we do not need to solve the equations. Given $p$ on the sphere and $\mathbf{w}\in T_pS$, $\mathbf{w}\ne\mathbf{0}$, the plane through the centre spanned by $p$ and $\mathbf{w}$ cuts the sphere in a great circle, and traversing it at speed $\norm{\mathbf{w}}$ gives a geodesic starting at $p$ with velocity $\mathbf{w}$. By [[#thm-geodesic-existence]] it is *the* geodesic with these initial conditions. So every geodesic is (an arc of) a great circle.
:::
:::

::: example Geodesics on a cylinder {#ex-cylinder}
Find all geodesics of the cylinder $\mathbf{x}(u,v) = (R\cos\tfrac uR,\ R\sin\tfrac uR,\ v)$, and show that two points of the cylinder are joined by infinitely many geodesics.
::: solution
Here $E = G = 1$ and $F = 0$, so all Christoffel symbols vanish and [[#eq-geodesic]] reads $u'' = v'' = 0$: $u = \alpha t + u_0$ and $v = \beta t + v_0$. The geodesics are the images of straight lines of the $(u,v)$-plane: helices, horizontal circles ($\beta = 0$) and vertical rulings ($\alpha = 0$). Now take two points $p = \mathbf{x}(0, 0)$ and $q = \mathbf{x}(u_1, v_1)$. Since $\mathbf{x}(u + 2\pi Rk, v) = \mathbf{x}(u,v)$ for every integer $k$, the segments from $(0,0)$ to each of the points $(u_1 + 2\pi Rk,\ v_1)$ give geodesics from $p$ to $q$ that wind $k$ times around the cylinder, of lengths $\sqrt{(u_1 + 2\pi Rk)^2 + v_1^2}$. Only one or two of them are shortest.
:::
:::

### Geodesics on surfaces of revolution

Let $\mathbf{x}(u,v) = (f(u)\cos v,\ f(u)\sin v,\ g(u))$ be a surface of revolution, with $f > 0$ and the profile curve parametrised by arc length ($f'^2 + g'^2 = 1$). Then $E = 1$, $F = 0$, $G = f^2$, the only non-zero Christoffel symbols are $\Gamma^2_{12} = f'/f$ and $\Gamma^1_{22} = -ff'$, and the geodesic equations are

$$
u'' - ff'\,v'^2 = 0, \qquad v'' + \frac{2f'}{f}\,u'v' = 0 .
$$ {#eq-revolution-geodesic}

**Meridians** ($v$ constant, $u = s$) satisfy both equations, so every meridian is a geodesic. A **parallel** $u = u_0$, traversed at unit speed ($v' = 1/f(u_0)$), satisfies the second equation, and the first becomes $f(u_0)f'(u_0)/f(u_0)^2 = 0$: a parallel is a geodesic exactly when $f'(u_0) = 0$, that is, at a parallel of locally extreme radius, such as the equator of a sphere or the waist of a catenoid. The general geodesic is controlled by a conserved quantity.

::: theorem Clairaut's relation {#thm-clairaut}
Let $\boldsymbol\gamma$ be a unit-speed geodesic on a surface of revolution, and let $\psi(s)$ be the angle between $\boldsymbol\gamma'(s)$ and the parallel through $\boldsymbol\gamma(s)$. Then

$$
f\bigl(u(s)\bigr)\cos\psi(s) = \text{constant} .
$$

In words: the distance from the axis times the cosine of the angle with the parallels is constant along every geodesic.
:::

::: proof
The parallel through $\boldsymbol\gamma(s)$ has direction $\mathbf{x}_v$, with $\norm{\mathbf{x}_v} = f$. So

$$
\cos\psi = \frac{\boldsymbol\gamma'\cdot\mathbf{x}_v}{\norm{\mathbf{x}_v}} = \frac{(u'\mathbf{x}_u + v'\mathbf{x}_v)\cdot\mathbf{x}_v}{f} = \frac{Gv'}{f} = fv', \qquad\text{hence}\qquad f\cos\psi = f^2v' .
$$

By the second equation of [[#eq-revolution-geodesic]],

$$
\frac{d}{ds}\bigl(f^2v'\bigr) = 2ff'u'v' + f^2v'' = f^2\left(v'' + \frac{2f'}{f}u'v'\right) = 0 .
$$
:::

Since $\abs{\cos\psi}\le1$, a geodesic with Clairaut constant $c$ never enters the part of the surface where $f(u) < \abs{c}$: heading into a narrowing part, it turns back where the radius equals $\abs{c}$, touching that parallel. (Physically, $f^2v'$ is angular momentum about the axis, conserved by symmetry.)

::: example How high does a great circle go? {#ex-clairaut-sphere}
On the unit sphere a geodesic leaves the equator heading north-east, at angle $\alpha$ to the equator ($0 < \alpha < \pi/2$). What is the highest latitude it reaches?
::: solution
With latitude $\theta$ as the profile parameter, the radius of the parallel at latitude $\theta$ is $f = \cos\theta$. At the start $f = 1$ and $\psi = \alpha$, so Clairaut's constant is $c = \cos\alpha$. At the highest point the geodesic runs along a parallel, $\cos\psi = 1$, so $\cos\theta_{\max} = \cos\alpha$, i.e. $\theta_{\max} = \alpha$. This agrees with geometry: the geodesic is the great circle whose plane is tilted at angle $\alpha$ to the equatorial plane, and its highest point has latitude $\alpha$.
:::
:::

### Geodesics and shortest paths

Straight lines in the plane are the shortest paths between their points. On a surface the relationship is subtler.

::: theorem Shortest curves are geodesics {#thm-shortest}
(a) If a curve on $S$ is the shortest among all piecewise smooth curves on $S$ joining its endpoints, then, parametrised by arc length, it is a geodesic. (b) Conversely, every point $p\in S$ has a neighbourhood $W$ such that for each $q\in W$ the geodesic from $p$ to $q$ within $W$ is the unique shortest curve on $S$ joining $p$ and $q$.
:::

::: proof
(a) Let $\boldsymbol\gamma\colon[0,\ell]\to S$ be the shortest curve, at unit speed, and suppose $\kappa_g(s_0)\ne0$ for some $s_0\in(0,\ell)$; replacing $\mathbf{n}$ by $-\mathbf{n}$ if necessary, $\kappa_g > 0$ on an interval $J$ around $s_0$. Choose a smooth function $\phi\ge0$, positive at $s_0$ and vanishing outside $J$. Working in a patch, push $\boldsymbol\gamma$ sideways: let $\boldsymbol\gamma_\eps(s)$ be the curve on $S$ whose coordinates are those of $\boldsymbol\gamma(s)$ plus $\eps\phi(s)$ times the coordinates of $\mathbf{V}(s)$. Then $\boldsymbol\gamma_\eps$ has the same endpoints, $\boldsymbol\gamma_0 = \boldsymbol\gamma$, and $\pdv{\boldsymbol\gamma_\eps}{\eps}\big|_{\eps=0} = \phi\mathbf{V}$. Its length $\mathcal{L}(\eps) = \int_0^\ell\norm{\partial_s\boldsymbol\gamma_\eps}\,ds$ satisfies, using $\norm{\boldsymbol\gamma'} = 1$, the symmetry of mixed partial derivatives and an integration by parts,

$$
\mathcal{L}'(0) = \int_0^\ell\mathbf{T}\cdot\frac{d}{ds}(\phi\mathbf{V})\,ds = \Bigl[\phi\,\mathbf{T}\cdot\mathbf{V}\Bigr]_0^\ell - \int_0^\ell\phi\,\mathbf{T}'\cdot\mathbf{V}\,ds = -\int_0^\ell\phi\,\kappa_g\,ds < 0 .
$$

So $\mathcal{L}(\eps) < \mathcal{L}(0)$ for small $\eps > 0$, contradicting minimality. Hence $\kappa_g\equiv0$ and $\boldsymbol\gamma$ is a geodesic. This "first variation of length" argument is the surface analogue of Fermat's theorem.

(b) *Sketch.* The geodesics leaving $p$ sweep out a neighbourhood of $p$, and by Gauss's lemma the geodesic circles around $p$ cross them at right angles; so any curve from $p$ to $q$ is at least as long as the radial geodesic, with equality only for that geodesic. Full proofs are in do Carmo, *Differential Geometry of Curves and Surfaces*, §4-6, and Pressley, *Elementary Differential Geometry*, ch. 9.
:::

::: warning Geodesics are only locally shortest
A geodesic need not be the shortest path between its endpoints: a great-circle arc longer than half the circle is a geodesic, but the other arc is shorter, and the multiply wound helices of [[#ex-cylinder]] are not shortest. A shortest path need not even exist: in the plane minus the origin, no curve from $(-1,0)$ to $(1,0)$ is shortest. On a compact surface, though, any two points are joined by a shortest geodesic (Hopf–Rinow theorem).
:::

## Parallel transport and holonomy

How can an inhabitant of a curved surface carry a direction from one point to another "without turning it"? The covariant derivative answers this.

::: definition Parallel transport {#def-parallel}
A tangent vector field $\mathbf{w}$ along a curve $\boldsymbol\gamma$ is **parallel** if $D\mathbf{w}/dt = \mathbf{0}$, i.e. $\mathbf{w}'$ is normal to $S$ at every point. Given $\mathbf{w}_0\in T_{\boldsymbol\gamma(t_0)}S$, the parallel field with $\mathbf{w}(t_0) = \mathbf{w}_0$ is the **parallel transport** of $\mathbf{w}_0$ along $\boldsymbol\gamma$.
:::

By [[#eq-covariant]], $D\mathbf{w}/dt = \mathbf{0}$ is a system of two *linear* differential equations for the coefficients $a(t), b(t)$, so the parallel transport of any $\mathbf{w}_0$ exists along the whole curve and is unique. A curve is a geodesic exactly when its velocity is parallel along it.

::: proposition Parallel transport preserves lengths and angles {#prop-parallel}
If $\mathbf{w}_1, \mathbf{w}_2$ are parallel fields along $\boldsymbol\gamma$, then $\mathbf{w}_1\cdot\mathbf{w}_2$ is constant. In particular parallel fields have constant length, and the angle between two parallel fields is constant.
:::

::: proof
Since $\mathbf{w}_2$ is tangent to $S$, the normal component of $\mathbf{w}_1'$ contributes nothing to $\mathbf{w}_1'\cdot\mathbf{w}_2$, so $\mathbf{w}_1'\cdot\mathbf{w}_2 = \frac{D\mathbf{w}_1}{dt}\cdot\mathbf{w}_2$, and similarly with the roles exchanged. Hence

$$
\frac{d}{dt}(\mathbf{w}_1\cdot\mathbf{w}_2) = \frac{D\mathbf{w}_1}{dt}\cdot\mathbf{w}_2 + \mathbf{w}_1\cdot\frac{D\mathbf{w}_2}{dt} = 0 .
$$
:::

On the plane, parallel transport is translation, and a vector carried around a loop returns unchanged. On a sphere it does not. Carry a vector from the north pole down the meridian $\varphi = 0$ to the equator (pointing south all the way, since it stays parallel to the geodesic's velocity), a quarter of the way along the equator (still pointing south, perpendicular to that geodesic), and back up the meridian $\varphi = \pi/2$. It returns rotated by $\pi/2$ — exactly the area of the octant enclosed by the loop on the unit sphere. The angle by which a vector returns rotated is the **holonomy** of the loop; the next section explains the coincidence.

## The local Gauss–Bonnet theorem

We work in an **orthogonal patch** ($F = 0$); every point of a regular surface lies in one (do Carmo, §3-4). Normalise the coordinate vectors to an orthonormal frame and orient the surface by it:

$$
\mathbf{e}_1 = \frac{\mathbf{x}_u}{\sqrt E}, \qquad \mathbf{e}_2 = \frac{\mathbf{x}_v}{\sqrt G}, \qquad \mathbf{n} = \mathbf{e}_1\times\mathbf{e}_2 .
$$

Along a unit-speed curve, measure the direction of $\mathbf{T}$ by an angle $\phi(s)$ from $\mathbf{e}_1$: $\mathbf{T} = \cos\phi\,\mathbf{e}_1 + \sin\phi\,\mathbf{e}_2$, with $\phi$ chosen to vary continuously. The key computation expresses $\kappa_g$ through the rate of change of this angle.

::: lemma Liouville's formula {#lem-liouville}
For a unit-speed curve $\boldsymbol\gamma(s) = \mathbf{x}(u(s), v(s))$ in an orthogonal patch,

$$
\kappa_g = \frac{d\phi}{ds} + \frac{1}{2\sqrt{EG}}\left(G_u\frac{dv}{ds} - E_v\frac{du}{ds}\right).
$$ {#eq-liouville}

Moreover, a unit tangent field $\mathbf{w} = \cos\psi\,\mathbf{e}_1 + \sin\psi\,\mathbf{e}_2$ along $\boldsymbol\gamma$ is parallel if and only if $\dfrac{d\psi}{ds} = -\dfrac{1}{2\sqrt{EG}}\left(G_u\dfrac{dv}{ds} - E_v\dfrac{du}{ds}\right)$.
:::

::: proof
Write $\mathbf{e}_i'$ for $\frac{d}{ds}\mathbf{e}_i(\boldsymbol\gamma(s))$. Since $\mathbf{e}_1, \mathbf{e}_2$ are orthonormal, $\mathbf{e}_1'\cdot\mathbf{e}_1 = \mathbf{e}_2'\cdot\mathbf{e}_2 = 0$ and $\mathbf{e}_2'\cdot\mathbf{e}_1 = -\mathbf{e}_1'\cdot\mathbf{e}_2$. So the tangential parts of $\mathbf{e}_1'$ and $\mathbf{e}_2'$ are $(\mathbf{e}_1'\cdot\mathbf{e}_2)\,\mathbf{e}_2$ and $-(\mathbf{e}_1'\cdot\mathbf{e}_2)\,\mathbf{e}_1$. For $\mathbf{w} = \cos\psi\,\mathbf{e}_1 + \sin\psi\,\mathbf{e}_2$ this gives

$$
\frac{D\mathbf{w}}{ds} = \left(\frac{d\psi}{ds} + \mathbf{e}_1'\cdot\mathbf{e}_2\right)\bigl(-\sin\psi\,\mathbf{e}_1 + \cos\psi\,\mathbf{e}_2\bigr).
$$

With $\psi = \phi$ we get $D\mathbf{T}/ds = (\phi' + \mathbf{e}_1'\cdot\mathbf{e}_2)\,\mathbf{V}$ (note $\mathbf{V} = \mathbf{n}\times\mathbf{T} = -\sin\phi\,\mathbf{e}_1 + \cos\phi\,\mathbf{e}_2$), so $\kappa_g = \phi' + \mathbf{e}_1'\cdot\mathbf{e}_2$; and $\mathbf{w}$ is parallel exactly when $\psi' = -\mathbf{e}_1'\cdot\mathbf{e}_2$. It remains to compute $\mathbf{e}_1'\cdot\mathbf{e}_2$. Differentiating $\mathbf{x}_u/\sqrt{E}$ produces a multiple of $\mathbf{x}_u$ (orthogonal to $\mathbf{e}_2$) plus $(\mathbf{x}_{uu}u' + \mathbf{x}_{uv}v')/\sqrt E$, so

$$
\mathbf{e}_1'\cdot\mathbf{e}_2 = \frac{(\mathbf{x}_{uu}\cdot\mathbf{x}_v)\,u' + (\mathbf{x}_{uv}\cdot\mathbf{x}_v)\,v'}{\sqrt{EG}} = \frac{-\tfrac12E_v\,u' + \tfrac12G_u\,v'}{\sqrt{EG}},
$$

using $\mathbf{x}_{uu}\cdot\mathbf{x}_v = F_u - \tfrac12E_v = -\tfrac12E_v$ and $\mathbf{x}_{uv}\cdot\mathbf{x}_v = \tfrac12G_u$ (differentiate $F = \mathbf{x}_u\cdot\mathbf{x}_v = 0$ and $G = \mathbf{x}_v\cdot\mathbf{x}_v$).
:::

Check: on the sphere in latitude–longitude coordinates ($\mathbf{e}_1$ north, $\mathbf{e}_2$ east, so $\mathbf{n}$ points *inwards*), the eastward circle of latitude $\theta_0$ has $\phi = \pi/2$, $\theta' = 0$, $\varphi' = 1/(R\cos\theta_0)$, and [[#eq-liouville]] gives $\kappa_g = \frac{-2R^2\cos\theta_0\sin\theta_0}{2R^2\cos\theta_0}\cdot\frac{1}{R\cos\theta_0} = -\frac{\tan\theta_0}{R}$ — the value of [[#ex-latitude]], with the sign reversed because the normal is reversed.

To state the theorem, let $R$ be a **simple region** in an orthogonal patch: the image $\mathbf{x}(D)$ of a region $D$ homeomorphic to a closed disc whose boundary is a piecewise smooth simple closed curve. Parametrise the boundary $\partial R$ by arc length in the **positive** direction (with $R$ on the left when $\mathbf{n}$ points up; equivalently, $\partial D$ anticlockwise in the $(u,v)$-plane). At each **vertex**, where the boundary has a corner, the **exterior angle** $\theta_i\in(-\pi, \pi)$ is the angle from the incoming to the outgoing tangent, positive if the boundary turns towards $R$; the interior angle is $\alpha_i = \pi - \theta_i$.

::: theorem Local Gauss–Bonnet theorem {#thm-local-gauss-bonnet}
For a simple region $R$ in an orthogonal patch, with positively oriented boundary and exterior angles $\theta_1, \dots, \theta_k$ at its vertices,

$$
\iint_R K\,dA + \int_{\partial R}\kappa_g\,ds + \sum_{i=1}^k\theta_i = 2\pi .
$$ {#eq-local-gb}
:::

::: proof
*Step 1 (Liouville).* On each smooth arc of $\partial R$, by [[#eq-liouville]], $\kappa_g = \phi' + \frac{1}{2\sqrt{EG}}(G_uv' - E_vu')$. Adding over the arcs,

$$
\int_{\partial R}\kappa_g\,ds = \sum_{\text{arcs}}\bigl[\phi\bigr] + \oint_{\partial D}\left(-\frac{E_v}{2\sqrt{EG}}\,du + \frac{G_u}{2\sqrt{EG}}\,dv\right),
$$

where $\sum[\phi]$ is the total change of $\phi$ along the smooth arcs.

*Step 2 (Green).* By Green's theorem ([[multivariable/greens-theorem#thm-green]]) in the $(u,v)$-plane, the line integral equals

$$
\iint_D\left[\left(\frac{G_u}{2\sqrt{EG}}\right)_u + \left(\frac{E_v}{2\sqrt{EG}}\right)_v\right]du\,dv = -\iint_D K\sqrt{EG}\,du\,dv = -\iint_R K\,dA,
$$

because in an orthogonal patch $K = -\dfrac{1}{2\sqrt{EG}}\left[\left(\dfrac{E_v}{\sqrt{EG}}\right)_v + \left(\dfrac{G_u}{\sqrt{EG}}\right)_u\right]$ ([[differential-geometry/theorema-egregium#eq-K-orthogonal]]) and $dA = \sqrt{EG}\,du\,dv$.

*Step 3 (turning tangents).* The tangent of a positively oriented simple closed curve turns through exactly one full turn, counting the jumps at the corners:

$$
\sum_{\text{arcs}}\bigl[\phi\bigr] + \sum_{i=1}^k\theta_i = 2\pi .
$$

This is the **theorem of turning tangents** (Hopf's Umlaufsatz); we take it on trust. *Sketch:* the left-hand side is a multiple of $2\pi$, because $\mathbf{T}$ returns to its starting direction; it depends continuously on the inner product used to measure angles; deforming $E\,du^2 + G\,dv^2$ to the Euclidean $du^2 + dv^2$ therefore does not change it, and in the Euclidean plane it equals $2\pi$ by Hopf's theorem. See do Carmo, §4-5, and Pressley, ch. 13.

Substituting Steps 2 and 3 into Step 1 gives $\int_{\partial R}\kappa_g\,ds = 2\pi - \sum\theta_i - \iint_R K\,dA$, which is [[#eq-local-gb]].
:::

In the plane ($K = 0$) the theorem says that the exterior angles of a polygon add up to $2\pi$, and that a smooth simple closed curve has total signed curvature $2\pi$. On a curved surface the curvature inside supplies part of the turning.

::: corollary Angle sum of a geodesic triangle {#cor-triangle}
If $T$ is a geodesic triangle (a simple region bounded by three geodesic arcs) with interior angles $\alpha_1, \alpha_2, \alpha_3$, lying in an orthogonal patch, then

$$
\alpha_1 + \alpha_2 + \alpha_3 = \pi + \iint_T K\,dA .
$$

More generally, the interior angles of a geodesic $n$-gon add up to $(n - 2)\pi + \iint K\,dA$.
:::

::: proof
On geodesic sides $\kappa_g = 0$, and $\theta_i = \pi - \alpha_i$, so [[#eq-local-gb]] gives $\iint_T K\,dA + 3\pi - (\alpha_1 + \alpha_2 + \alpha_3) = 2\pi$. For an $n$-gon, $\sum\theta_i = n\pi - \sum\alpha_i$.
:::

So triangles on surfaces of positive curvature are "fat" (angle sum $> \pi$), and on surfaces of negative curvature "thin" (angle sum $< \pi$). On a sphere of radius $R$, $K = 1/R^2$, and a geodesic triangle with angles $\alpha, \beta, \gamma$ has area $R^2(\alpha + \beta + \gamma - \pi)$ — Girard's theorem.

::: example The octant and the cube {#ex-octant}
On the unit sphere, check [[#cor-triangle]] for the triangle with vertices $(1,0,0)$, $(0,1,0)$, $(0,0,1)$, and use it to find the angles of the geodesic quadrilaterals obtained by projecting the six faces of a cube radially onto the sphere.
::: solution
The sides are arcs of the equator and of two meridians, all geodesics, meeting at right angles, so $\alpha_1 + \alpha_2 + \alpha_3 - \pi = \tfrac{3\pi}{2} - \pi = \tfrac\pi2$. The triangle is one of eight congruent octants, so its area is $\tfrac{4\pi}{8} = \tfrac\pi2$, as the corollary predicts. (It lies in the orthogonal — indeed conformal — patch given by stereographic projection from the south pole, so the theorem applies.) For the cube, each projected face is a geodesic quadrilateral (its edges lie in planes through the centre) of area $\tfrac{4\pi}{6} = \tfrac{2\pi}{3}$, with all four angles equal by symmetry, say $\alpha$. Then $4\alpha = 2\pi + \tfrac{2\pi}{3}$, so $\alpha = \tfrac{2\pi}{3}$: three faces meet at each vertex of the spherical cube at $120^\circ$, as they must to fill $2\pi$.
:::
:::

::: widget surface
fx: cos(v)/cosh(u)
fy: sin(v)/cosh(u)
fz: u - tanh(u)
u: 0.1, 3
v: 0, 2pi
color: gauss
caption: The pseudosphere, the surface of revolution of a tractrix, has constant curvature $K = -1$ — the uniform colour. It is a model of a piece of the hyperbolic plane: a geodesic triangle of area $A$ on it has angle sum $\pi - A$, so triangles are thinner than Euclidean ones, and there is no similarity without congruence. Rotate it: it narrows forever towards the top but has finite total area $2\pi$.
:::

::: quiz
A geodesic triangle on the pseudosphere ($K = -1$) has area $0.3$. What is the sum of its angles?
- [x] $\pi - 0.3$
- [ ] $\pi + 0.3$
- [ ] $\pi$
- [ ] It depends on the shape of the triangle, not just its area
::: solution
By [[#cor-triangle]], $\alpha_1 + \alpha_2 + \alpha_3 = \pi + \iint_T K\,dA = \pi - \text{area}(T) = \pi - 0.3$. On a surface of *constant* curvature the angle sum depends only on the area; on other surfaces it depends on how the curvature is distributed inside the triangle.
:::
:::

### Holonomy and the Foucault pendulum

Liouville's formula also measures holonomy.

::: proposition Holonomy equals enclosed curvature {#prop-holonomy}
Let $R$ be a simple region in an orthogonal patch whose boundary $\partial R$ is a smooth curve, traversed once positively, and let $\mathbf{w}$ be a parallel unit field along $\partial R$. Measured against the frame $\mathbf{e}_1, \mathbf{e}_2$, the angle $\psi$ of $\mathbf{w}$ increases by $\iint_R K\,dA$ in one circuit. So parallel transport around $\partial R$ rotates every tangent vector at the starting point by the angle $\iint_R K\,dA$.
:::

::: proof
By [[#lem-liouville]], $\psi' = -\frac{1}{2\sqrt{EG}}(G_uv' - E_vu')$ along $\partial R$, so the total change of $\psi$ is minus the line integral of Step 2 in the proof of [[#thm-local-gauss-bonnet]], namely $\iint_R K\,dA$. Since the frame $\mathbf{e}_1, \mathbf{e}_2$ returns to itself, $\mathbf{w}$ comes back rotated by this angle relative to its starting position.
:::

This is the intrinsic meaning of Gaussian curvature: **curvature is the rotation produced by parallel transport around a small loop, per unit enclosed area**. On the unit sphere, the loop of the previous section enclosed the octant of area $\pi/2$ and rotated vectors by $\pi/2$.

::: application The Foucault pendulum
In 1851 Léon Foucault hung a heavy pendulum from the dome of the Panthéon in Paris and showed that its plane of swing slowly turns relative to the floor. The Earth carries the pendulum eastwards around its circle of latitude $\theta_0$ once per sidereal day ($23.93$ hours), and to a good approximation the swing direction is parallel transported along that circle. Measure it by its angle $\psi$ from north towards east, using the frame $\mathbf{e}_1$ (north), $\mathbf{e}_2$ (east) of the latitude–longitude patch. Along the circle, $\theta' = 0$ and $\varphi' = 1/(R\cos\theta_0)$, so by [[#lem-liouville]]

$$
\psi' = -\frac{G_\theta\,\varphi'}{2\sqrt{EG}} = \frac{2R^2\cos\theta_0\sin\theta_0}{2R^2\cos\theta_0}\cdot\frac{1}{R\cos\theta_0} = \frac{\tan\theta_0}{R},
$$

and over the whole circle, of length $2\pi R\cos\theta_0$, the angle changes by $2\pi\sin\theta_0$. Relative to the ground the swing turns from north towards east — clockwise seen from above in the northern hemisphere — by $2\pi\sin\theta_0$ per sidereal day. At the poles that is a full turn a day, at the equator nothing, and in Paris ($48.85^\circ$ N) a full turn takes $23.93/\sin48.85^\circ\approx31.8$ hours, as Foucault observed. In terms of [[#prop-holonomy]]: the polar cap above the circle has total curvature $2\pi(1 - \sin\theta_0)$ (Archimedes' hat-box theorem, [[multivariable/surface-integrals#ex-sphere-area]]), which differs from $-2\pi\sin\theta_0$ by one full turn of the north–east frame around the pole.
:::

## The global Gauss–Bonnet theorem

To pass from small regions to a whole closed surface we cut it into triangles.

::: definition Triangulations and the Euler characteristic {#def-euler-characteristic}
A **triangulation** of a compact surface $S$ is a finite collection of triangles $T_1, \dots, T_{\mathsf F}$ — simple regions with three vertices and three smooth edges — that cover $S$ and such that any two of them are either disjoint, or meet in exactly one common vertex, or meet in exactly one common edge. If the triangulation has $\mathsf V$ vertices, $\mathsf E$ edges and $\mathsf F$ faces, the **Euler characteristic** of $S$ is

$$
\chi(S) = \mathsf V - \mathsf E + \mathsf F .
$$
:::

(We use sans-serif letters for these counts, to avoid confusion with the coefficients $E$ and $F$ of the first fundamental form.) Two facts from topology make this a good definition ([[topology/surfaces]]; do Carmo, §4-5): every compact regular surface has a triangulation, which can be chosen so fine that each triangle lies in an orthogonal patch; and $\chi(S)$ is the same for every triangulation of $S$ — it is a **topological invariant**. For instance, projecting the faces of an octahedron onto the sphere gives a triangulation with $\mathsf V = 6$, $\mathsf E = 12$, $\mathsf F = 8$, so $\chi(\text{sphere}) = 2$, in agreement with Euler's polyhedron formula. A torus cut into a $3\times3$ grid of squares, each divided into two triangles, has $\mathsf V = 9$, $\mathsf E = 27$, $\mathsf F = 18$, so $\chi(\text{torus}) = 0$. A compact orientable surface with $g$ handles has $\chi = 2 - 2g$.

::: theorem Gauss–Bonnet theorem {#thm-gauss-bonnet}
Let $S$ be a compact orientable regular surface. Then

$$
\iint_S K\,dA = 2\pi\chi(S).
$$
:::

::: proof
Fix an orientation of $S$ and a triangulation in which every triangle $T_j$ lies in an orthogonal patch whose normal agrees with the orientation (exchange $u$ and $v$ if necessary). Orient the boundary of every triangle positively. Let $\alpha_{j1}, \alpha_{j2}, \alpha_{j3}$ be the interior angles of $T_j$. By [[#thm-local-gauss-bonnet]], with exterior angles $\pi - \alpha_{jk}$,

$$
\iint_{T_j}K\,dA + \int_{\partial T_j}\kappa_g\,ds + 3\pi - (\alpha_{j1} + \alpha_{j2} + \alpha_{j3}) = 2\pi .
$$

Add these $\mathsf F$ equations.

- The integrals of $K$ add up to $\iint_S K\,dA$.
- Every edge belongs to exactly two triangles, and because the orientation is consistent, it is traversed in opposite directions as part of their boundaries. Reversing the direction of a curve reverses the sign of $\kappa_g$, so the boundary integrals cancel in pairs and their sum is $0$.
- The triangles meeting at a vertex fill a neighbourhood of it, so the interior angles at each vertex add up to $2\pi$, and the sum of all interior angles is $2\pi\mathsf V$.

Hence $\iint_S K\,dA + 3\pi\mathsf F - 2\pi\mathsf V = 2\pi\mathsf F$, i.e. $\iint_S K\,dA = 2\pi\mathsf V - \pi\mathsf F$. Finally, each triangle has three edges and each edge lies in two triangles, so $3\mathsf F = 2\mathsf E$, and $-\pi\mathsf F = 2\pi\mathsf F - 3\pi\mathsf F = 2\pi\mathsf F - 2\pi\mathsf E$. Therefore $\iint_S K\,dA = 2\pi(\mathsf V - \mathsf E + \mathsf F) = 2\pi\chi(S)$.
:::

The left-hand side comes from differential geometry, the right-hand side from counting. As by-products, $\chi(S)$ does not depend on the triangulation, and $\iint_S K\,dA$ does not change when $S$ is deformed: denting a surface moves curvature around but never changes the total.

::: example The total curvature of a torus {#ex-torus-total}
Verify the Gauss–Bonnet theorem for the torus $\mathbf{x}(u,v) = \bigl((a + b\cos u)\cos v,\ (a + b\cos u)\sin v,\ b\sin u\bigr)$.
::: solution
From [[differential-geometry/surface-curvature#ex-torus]], $K = \dfrac{\cos u}{b(a + b\cos u)}$, and $dA = \sqrt{EG}\,du\,dv = b(a + b\cos u)\,du\,dv$. So

$$
\iint_S K\,dA = \int_0^{2\pi}\int_0^{2\pi}\cos u\,du\,dv = 0 = 2\pi\cdot\chi(\text{torus}).
$$

The outer half ($K > 0$) and the inner half ($K < 0$) cancel exactly, for all radii $a > b$ — and on every deformed doughnut too.
:::
:::

::: example A spherical cap {#ex-cap}
Check the local theorem on the unit sphere for the cap $R$ north of latitude $\theta_0$, with the outward normal.
::: solution
The cap has area $2\pi(1 - \sin\theta_0)$ (Archimedes), so $\iint_R K\,dA = 2\pi(1 - \sin\theta_0)$. Its boundary, traversed eastwards (positively for the outward normal: the cap is on your left), has $\kappa_g = \tan\theta_0$ by [[#ex-latitude]] and length $2\pi\cos\theta_0$, so $\int_{\partial R}\kappa_g\,ds = 2\pi\sin\theta_0$. There are no vertices, and the total is $2\pi(1 - \sin\theta_0) + 2\pi\sin\theta_0 = 2\pi$, as [[#eq-local-gb]] requires.
:::
:::

::: widget surface
fx: (1 + e*sin(v)^3*cos(3*u))*sin(v)*cos(u)
fy: (1 + e*sin(v)^3*cos(3*u))*sin(v)*sin(u)
fz: (1 + e*sin(v)^3*cos(3*u))*cos(v)
u: 0, 2pi
v: 0, pi
sliders: e=0.3:0:0.5:0.05
color: gauss
caption: A sphere with three bulges and three dents, coloured by Gaussian curvature. Increase $e$: regions of negative curvature (saddles) appear between the bulges, and the curvature on the bulges grows to compensate. However large $e$ is, $\iint K\,dA$ stays exactly $4\pi$, because the surface is still topologically a sphere ($\chi = 2$).
:::

::: quiz
A smooth closed surface in space is shaped like a pretzel with three holes. What is its total curvature $\iint_S K\,dA$?
- [ ] $4\pi$
- [ ] $0$
- [x] $-8\pi$
- [ ] It cannot be determined without knowing the exact shape
::: solution
A compact orientable surface with $g = 3$ handles has $\chi = 2 - 2g = -4$, so $\iint_S K\,dA = 2\pi\cdot(-4) = -8\pi$, whatever its exact shape; in particular it must have plenty of points of negative curvature.
:::
:::

Some consequences of the theorem:

1. Every surface homeomorphic to a sphere — an ellipsoid, a potato, the bumpy sphere above — has total curvature $4\pi$.
2. If $K > 0$ everywhere on a compact orientable surface, then $\chi(S) > 0$, so $\chi(S) = 2$ and $S$ is homeomorphic to a sphere.
3. Every compact surface in space has points with $K > 0$ (last exercise of [[differential-geometry/surface-curvature]]), so a torus must also have points with $K < 0$.

::: warning Read the hypotheses
The global theorem is about compact surfaces *without boundary*; for a region with boundary use the local form with the boundary terms, or its extension $\iint_R K\,dA + \int_{\partial R}\kappa_g\,ds + \sum\theta_i = 2\pi\chi(R)$ (where $\chi = 1$ for a disc and $0$ for an annulus). It says nothing about the curvature at individual points, only about the total, so it cannot distinguish a sphere from an ellipsoid — though it does distinguish a sphere from a torus. And watch the signs: exterior angles and $\kappa_g$ are measured with the boundary oriented positively.
:::

::: remark A discrete Gauss–Bonnet theorem
On a polyhedron all the curvature sits at the vertices: the **angle defect** of a vertex is $2\pi$ minus the sum of the face angles there ($\tfrac\pi2$ at each corner of a cube, $4\pi$ in total). The total angle defect of a polyhedral surface is $2\pi\chi$ (Descartes' theorem for convex polyhedra), and computer graphics uses angle defects as the Gaussian curvature of triangle meshes.
:::

::: history
That the angles of a spherical triangle exceed $\pi$ by an amount proportional to its area was published by Albert Girard in 1629. Alexis Clairaut found his relation for geodesics on surfaces of revolution in the 1730s, while studying the figure of the Earth. In his *Disquisitiones generales circa superficies curvas* (1827), which also contains the Theorema Egregium, Carl Friedrich Gauss proved that for a triangle of shortest lines on any surface, the excess of the angle sum over $\pi$ equals the total curvature inside; his geodetic survey of Hanover had led him to such questions. In 1848 Pierre Ossian Bonnet extended the result to regions bounded by arbitrary curves, with the geodesic curvature of the boundary entering the formula. Foucault's pendulum was first shown to the public in Paris in 1851. In 1944 Shiing-Shen Chern gave an intrinsic proof of the Gauss–Bonnet theorem for closed Riemannian manifolds of any even dimension.
:::

## Where this leads

Everything in this chapter was built from the first fundamental form, and it extends to spaces of any dimension carrying such a form, the Riemannian manifolds of Riemann's 1854 lecture. There geodesics are again curves with zero covariant acceleration, curvature is again the holonomy of parallel transport around small loops, and the Gauss–Bonnet–Chern theorem relates integrated curvature to the Euler characteristic in every even dimension; in general relativity, freely falling bodies and light rays follow geodesics of curved spacetime. The Euler characteristic also counts the zeros of vector fields (the Poincaré–Hopf theorem): since $\chi(\text{sphere}) = 2\ne0$, every continuous tangent vector field on a sphere vanishes somewhere — you cannot comb a hairy ball flat. The classification of compact surfaces by $\chi$ and orientability is the subject of [[topology/surfaces]].

::: summary
- The curvature vector of a curve on a surface splits as $\mathbf{T}' = \kappa_g\mathbf{V} + \kappa_n\mathbf{n}$ with $\mathbf{V} = \mathbf{n}\times\mathbf{T}$, and $\kappa^2 = \kappa_g^2 + \kappa_n^2$; $\kappa_g$ is the bending felt within the surface ([[#def-geodesic-curvature]]).
- Geodesics have zero covariant acceleration ($\boldsymbol\gamma''$ normal to $S$); they satisfy $u'' + \Gamma^1_{11}u'^2 + 2\Gamma^1_{12}u'v' + \Gamma^1_{22}v'^2 = 0$ and its partner, so they are intrinsic and exist uniquely for given initial point and velocity ([[#thm-geodesic-equations]], [[#thm-geodesic-existence]]).
- Geodesics: lines, great circles, helices on cylinders; on surfaces of revolution, meridians, parallels of extreme radius, and curves with $f\cos\psi = $ const (Clairaut, [[#thm-clairaut]]).
- Shortest curves are geodesics, and geodesics are locally shortest, but not always globally ([[#thm-shortest]]).
- Parallel transport preserves lengths and angles; around a loop it rotates vectors by the enclosed total curvature ([[#prop-holonomy]]), which explains the Foucault pendulum.
- Local Gauss–Bonnet: $\iint_R K\,dA + \int_{\partial R}\kappa_g\,ds + \sum\theta_i = 2\pi$ ([[#thm-local-gauss-bonnet]]); a geodesic triangle has angle sum $\pi + \iint K\,dA$.
- Global Gauss–Bonnet: $\iint_S K\,dA = 2\pi\chi(S)$ for compact orientable $S$, with $\chi = \mathsf V - \mathsf E + \mathsf F = 2 - 2g$ ([[#thm-gauss-bonnet]]): $4\pi$ for every sphere, $0$ for every torus.
:::

## Exercises

::: exercise A latitude circle {level=1 check="sqrt(3)"}
Find the absolute value of the geodesic curvature of the circle of latitude $60^\circ$ on the unit sphere.
::: solution
By [[#ex-latitude]] with $R = 1$, $\abs{\kappa_g} = \tan60^\circ = \sqrt3$. (Check: $\kappa = 1/\cos60^\circ = 2$ and $\kappa_n = \pm1$, so $\kappa_g^2 = 4 - 1 = 3$.)
:::
:::

::: exercise A spherical triangle {level=1 check="pi + 1/2"}
A geodesic triangle on the unit sphere has area $\tfrac12$. What is the sum of its angles?
::: solution
By [[#cor-triangle]] with $K = 1$: $\alpha_1 + \alpha_2 + \alpha_3 = \pi + \tfrac12$.
:::
:::

::: exercise The total curvature of an ellipsoid {level=1 check="4*pi"}
Find $\iint_S K\,dA$ for the ellipsoid $\dfrac{x^2}{4} + \dfrac{y^2}{9} + z^2 = 1$.
::: solution
The ellipsoid is a compact orientable surface homeomorphic to a sphere, so $\chi = 2$ and by [[#thm-gauss-bonnet]] the total curvature is $4\pi$. No computation of $K$ is needed.
:::
:::

::: exercise Helices on a cylinder {level=2}
Show directly from [[#def-geodesic]] that every helix $\boldsymbol\gamma(t) = (R\cos at,\ R\sin at,\ bt)$ on the cylinder $x^2 + y^2 = R^2$ is a geodesic, and compute its geodesic curvature and normal curvature after reparametrising by arc length.
::: solution
$\boldsymbol\gamma''(t) = (-a^2R\cos at,\ -a^2R\sin at,\ 0)$ is a multiple of $(\cos at, \sin at, 0)$, the unit normal of the cylinder at $\boldsymbol\gamma(t)$, so $\boldsymbol\gamma$ is a geodesic and $\kappa_g = 0$. The speed is $c = \sqrt{a^2R^2 + b^2}$, and at unit speed the acceleration is $\boldsymbol\gamma''/c^2$, of length $\frac{a^2R}{a^2R^2 + b^2}$, all of it normal: with the inward normal $\kappa_n = \frac{a^2R}{a^2R^2 + b^2}$. This is also the curvature of the helix as a space curve ([[differential-geometry/curves#ex-helix]]), consistent with $\kappa^2 = \kappa_g^2 + \kappa_n^2$.
:::
:::

::: exercise Clairaut on the sphere {level=2 check="pi/6"}
A geodesic on the unit sphere crosses the equator at an angle of $30^\circ$. Use Clairaut's relation to find the highest latitude it reaches, in radians.
::: solution
At the equator $f = 1$ and $\psi = 30^\circ$, so $c = \cos30^\circ$. At the highest point $\cos\psi = 1$ and $f = \cos\theta_{\max} = c$, so $\theta_{\max} = 30^\circ = \pi/6$, as in [[#ex-clairaut-sphere]].
:::
:::

::: exercise Foucault at thirty degrees {level=2 check="pi"}
Through what angle, in radians, does the swing plane of a Foucault pendulum at latitude $30^\circ$ turn relative to the ground in one sidereal day? How long does a full turn take?
::: solution
$2\pi\sin30^\circ = \pi$ per sidereal day, so a full turn takes two sidereal days, about $47.9$ hours.
:::
:::

::: exercise Liouville's formula in the plane {level=2 check="1/2"}
In polar coordinates $\mathbf{x}(r,\theta) = (r\cos\theta, r\sin\theta, 0)$ the first fundamental form is $E = 1$, $F = 0$, $G = r^2$. Use [[#eq-liouville]] to compute the geodesic curvature of the circle $r = 2$, traversed anticlockwise at unit speed.
::: solution
Along the circle $r' = 0$ and $\theta' = \tfrac12$ (unit speed on a circle of radius $2$). The tangent is $\mathbf{T} = \mathbf{x}_\theta/\sqrt G = \mathbf{e}_2$, so $\phi = \pi/2$ is constant. With $G_r = 2r = 4$ and $E_\theta = 0$, [[#eq-liouville]] gives $\kappa_g = 0 + \frac{1}{2\cdot2}\cdot4\cdot\tfrac12 = \tfrac12$, the curvature of a circle of radius $2$ — although the polar frame turns along the circle, Liouville's formula accounts for it.
:::
:::

::: exercise Spherical polygons {level=3 check="pi/3"}
Use [[#cor-triangle]] for polygons to find the area of the projection of one face of a regular dodecahedron onto the unit sphere, and check it against the number of faces. (Three faces meet at each vertex of the projected dodecahedron, so each angle of the spherical pentagon is $2\pi/3$.)
::: solution
A geodesic pentagon with all angles $2\pi/3$ has $\sum\alpha_i = \tfrac{10\pi}{3} = 3\pi + \text{area}$, so the area is $\tfrac{10\pi}{3} - 3\pi = \tfrac\pi3$. Twelve such faces give $4\pi$, the area of the sphere, as they should. (Similarly the six spherical cube faces of [[#ex-octant]] have area $\tfrac{2\pi}{3}$ each.)
:::
:::

::: exercise No geodesic bigons on saddle surfaces {level=3}
Let $S$ have $K\le0$ everywhere. Prove that two geodesics leaving a point $p$ cannot meet again at a point $q$ so that together they bound a simple region in an orthogonal patch. Deduce that a closed geodesic on such a surface cannot bound a simple region either.
::: hint
Apply [[#thm-local-gauss-bonnet]] to the region, which has two vertices.
:::
::: solution
Suppose the two geodesic arcs bound a simple region $R$, with interior angles $\alpha_1$ at $p$ and $\alpha_2$ at $q$. Since the exterior angles $\pi - \alpha_i$ lie in $(-\pi, \pi)$, each $\alpha_i$ lies in $(0, 2\pi)$; in particular $\alpha_i > 0$. The boundary arcs are geodesics, so $\kappa_g = 0$ on them. By [[#eq-local-gb]],

$$
\iint_R K\,dA + (\pi - \alpha_1) + (\pi - \alpha_2) = 2\pi, \qquad\text{so}\qquad \iint_R K\,dA = \alpha_1 + \alpha_2 > 0,
$$

contradicting $K\le0$. For a smooth closed geodesic bounding $R$ there are no vertices and $\iint_R K\,dA = 2\pi > 0$, again a contradiction. On a sphere both situations occur: two meridians bound a lune, and the equator bounds a hemisphere.
:::
:::

::: exercise Total curvature of a surface of revolution {level=3 check="4*pi"}
Let $S$ be obtained by rotating a unit-speed profile curve $(f(u), g(u))$, $0\le u\le\ell$, about the $z$-axis, where $f > 0$ on $(0,\ell)$, $f(0) = f(\ell) = 0$, $f'(0) = 1$ and $f'(\ell) = -1$ (the profile meets the axis at right angles, so $S$ is a smooth surface homeomorphic to a sphere). Using $K = -f''/f$ ([[differential-geometry/surface-curvature]]), compute $\iint_S K\,dA$ directly and compare with the Gauss–Bonnet theorem.
::: solution
In the patch $\mathbf{x}(u,v) = (f\cos v, f\sin v, g)$, $E = 1$, $F = 0$, $G = f^2$, so $dA = f\,du\,dv$ and $K\,dA = -f''\,du\,dv$. The two poles are single points and do not affect the integral, so

$$
\iint_S K\,dA = \int_0^{2\pi}\int_0^\ell -f''(u)\,du\,dv = -2\pi\bigl[f'(u)\bigr]_0^\ell = -2\pi(-1 - 1) = 4\pi = 2\pi\chi(\text{sphere}).
$$

Remarkably, only the slopes of the profile at the poles matter: however the profile wiggles in between, the total curvature is $4\pi$.
:::
:::
