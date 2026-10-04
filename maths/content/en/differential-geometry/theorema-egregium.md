Imagine a population of very flat ants living *in* a surface. They cannot leave it, cannot see the surrounding space, and know nothing of normals or tangent planes. What they can do is measure: they can lay out curves, find their lengths, measure the angles at which curves meet, and compute the areas of regions. Can such creatures tell whether their world is curved?

Sometimes they cannot. Roll a flat sheet of paper into a cylinder: no length on the sheet changes, so the ants' measurements are identical before and after, although the shape in space is quite different. The principal curvatures change from $0, 0$ to $1/R, 0$, and the mean curvature from $0$ to $1/(2R)$, so neither can be detected from inside. But the Gaussian curvature is $0$ in both cases. Gauss discovered, to his evident delight, that this is no accident: the Gaussian curvature $K = \kappa_1\kappa_2$, although defined through the bending of the surface in space ([[differential-geometry/surface-curvature#def-gaussian-mean]]), can always be computed from lengths measured within the surface. He called the result the **Theorema Egregium**, the "remarkable theorem".

It has striking consequences. No portion of a sphere can be flattened onto a plane without distortion, so no map of the Earth can show all distances to scale. A surface with positive curvature cannot be bent into one with negative curvature. And the idea that a space can have a curvature that its inhabitants can measure, without reference to anything outside it, became through Riemann the foundation of modern geometry and of Einstein's theory of gravity. In this chapter we make "measurable from inside" precise (isometries), introduce the Christoffel symbols, and prove the theorem by an explicit computation.

Throughout, patches $\mathbf{x}(u,v)$ are smooth (at least $C^3$), with first fundamental form $E, F, G$ ([[differential-geometry/regular-surfaces#def-first-ff]]), second fundamental form $L, M, N$ and unit normal $\mathbf{n}$ as in [[differential-geometry/surface-curvature]].

## Isometries and intrinsic geometry

A quantity is **intrinsic** if it can be computed from the first fundamental form alone — equivalently, from the lengths of curves in the surface. The length of a curve $\mathbf{x}(u(t), v(t))$ is $\int\sqrt{Eu'^2 + 2Fu'v' + Gv'^2}\,dt$, angles between curves are given by $\cos\theta = \frac{\mathrm{I}(\mathbf{w}_1, \mathbf{w}_2)}{\sqrt{\mathrm{I}(\mathbf{w}_1)\,\mathrm{I}(\mathbf{w}_2)}}$, and areas by $\iint\sqrt{EG - F^2}\,du\,dv$ ([[differential-geometry/regular-surfaces#eq-area]]): all intrinsic. Maps that preserve the first fundamental form preserve all of these.

::: definition Local isometry {#def-local-isometry}
A smooth map $\phi\colon S\to\tilde S$ between regular surfaces is a **local isometry** if it preserves the lengths of tangent vectors: $\norm{d\phi_p(\mathbf{w})} = \norm{\mathbf{w}}$ for every $p\in S$ and $\mathbf{w}\in T_pS$. A local isometry that is a bijection is an **isometry**, and $S$ and $\tilde S$ are then **isometric**. Two surfaces are **locally isometric** if every point of each has a neighbourhood isometric to an open subset of the other.
:::

Here $d\phi_p(\mathbf{w})$ is the velocity of $\phi\circ\boldsymbol\alpha$ for any curve $\boldsymbol\alpha$ on $S$ with velocity $\mathbf{w}$ at $p$. By polarisation, $2\,\mathbf{w}_1\cdot\mathbf{w}_2 = \norm{\mathbf{w}_1 + \mathbf{w}_2}^2 - \norm{\mathbf{w}_1}^2 - \norm{\mathbf{w}_2}^2$, a map that preserves lengths of tangent vectors also preserves their dot products, and so preserves angles; integrating, it preserves lengths of curves and areas. Note that "distance" here means distance measured *along the surface*: rolling a sheet into a cylinder brings opposite edges close together in space, but not along the sheet.

The working criterion compares fundamental forms in matching patches.

::: theorem Isometries and the first fundamental form {#thm-isometry-fff}
Let $\mathbf{x}\colon U\to S$ and $\tilde{\mathbf{x}}\colon U\to\tilde S$ be patches on the same open set $U$. If $E = \tilde E$, $F = \tilde F$ and $G = \tilde G$ on $U$, then $\phi = \tilde{\mathbf{x}}\circ\mathbf{x}^{-1}$ is an isometry from $\mathbf{x}(U)$ onto $\tilde{\mathbf{x}}(U)$. Conversely, if $\phi\colon S\to\tilde S$ is a local isometry and $\mathbf{x}$ is a patch of $S$ on which $\phi$ is one-to-one, then $\tilde{\mathbf{x}} = \phi\circ\mathbf{x}$ is a patch of $\tilde S$ with the same coefficients $E, F, G$.
:::

::: proof
Since $\phi(\mathbf{x}(u,v)) = \tilde{\mathbf{x}}(u,v)$, the chain rule gives $d\phi(\mathbf{x}_u) = \tilde{\mathbf{x}}_u$ and $d\phi(\mathbf{x}_v) = \tilde{\mathbf{x}}_v$. For $\mathbf{w} = a\mathbf{x}_u + b\mathbf{x}_v$, by linearity $d\phi(\mathbf{w}) = a\tilde{\mathbf{x}}_u + b\tilde{\mathbf{x}}_v$, so

$$
\norm{d\phi(\mathbf{w})}^2 = \tilde Ea^2 + 2\tilde Fab + \tilde Gb^2 = Ea^2 + 2Fab + Gb^2 = \norm{\mathbf{w}}^2 .
$$

So $\phi$ is a local isometry, and it is a bijection from $\mathbf{x}(U)$ to $\tilde{\mathbf{x}}(U)$ because both patches are one-to-one. Conversely, if $\phi$ preserves lengths of tangent vectors, it preserves their dot products (polarisation), so $\tilde E = \tilde{\mathbf{x}}_u\cdot\tilde{\mathbf{x}}_u = d\phi(\mathbf{x}_u)\cdot d\phi(\mathbf{x}_u) = \mathbf{x}_u\cdot\mathbf{x}_u = E$, and similarly $\tilde F = F$, $\tilde G = G$. That $\tilde{\mathbf{x}}$ is a patch (regular and one-to-one) follows because $d\phi$ is injective, being length-preserving.
:::

::: example Unrolling a cylinder {#ex-cylinder}
Show that the plane and the cylinder of radius $R$ are locally isometric, and use this to find the length of one turn of the helix $(R\cos t, R\sin t, ct)$, $0\le t\le2\pi$.
::: solution
Take $\mathbf{x}(u,v) = (u, v, 0)$ for the plane and $\tilde{\mathbf{x}}(u,v) = \bigl(R\cos\tfrac uR,\ R\sin\tfrac uR,\ v\bigr)$ for the cylinder, on $U = (0, 2\pi R)\times\R$. Then $\mathbf{x}_u = (1,0,0)$, $\mathbf{x}_v = (0,1,0)$ and $\tilde{\mathbf{x}}_u = (-\sin\tfrac uR, \cos\tfrac uR, 0)$, $\tilde{\mathbf{x}}_v = (0,0,1)$, so both patches have $E = 1$, $F = 0$, $G = 1$. By [[#thm-isometry-fff]] the map "wrap the strip around the cylinder" is an isometry from the strip onto the cylinder minus a line. (It is not globally one-to-one on the whole plane — the plane wraps around infinitely often — so the plane and cylinder are only *locally* isometric.)

The helix is $\tilde{\mathbf{x}}(Rt, ct)$, the image of the straight segment from $(0,0)$ to $(2\pi R, 2\pi c)$ in the plane. Isometries preserve lengths, so the helix has length $\sqrt{(2\pi R)^2 + (2\pi c)^2} = 2\pi\sqrt{R^2 + c^2}$. Unrolling the cylinder turns the helix into a straight line.
:::
:::

A much less obvious example: the helicoid and the catenoid, which we saw in [[differential-geometry/surface-curvature#ex-minimal]] are both minimal surfaces, are locally isometric.

::: example The catenoid and the helicoid {#ex-catenoid-helicoid}
Let $\mathbf{c}(u,v) = (\cosh u\cos v,\ \cosh u\sin v,\ u)$ (catenoid) and $\mathbf{h}(u,v) = (\sinh u\sin v,\ -\sinh u\cos v,\ v)$ (a helicoid). Show that for every $s$ the surface

$$
\mathbf{z}_s(u,v) = \cos s\;\mathbf{h}(u,v) + \sin s\;\mathbf{c}(u,v)
$$

has $E = G = \cosh^2u$, $F = 0$. Deduce that the helicoid ($s = 0$) and the catenoid ($s = \pi/2$) are locally isometric.
::: solution
Differentiate: $\mathbf{h}_u = (\cosh u\sin v, -\cosh u\cos v, 0)$, $\mathbf{h}_v = (\sinh u\cos v, \sinh u\sin v, 1)$, $\mathbf{c}_u = (\sinh u\cos v, \sinh u\sin v, 1)$, $\mathbf{c}_v = (-\cosh u\sin v, \cosh u\cos v, 0)$. So

$$
\mathbf{h}_v = \mathbf{c}_u, \qquad \mathbf{c}_v = -\mathbf{h}_u, \qquad \norm{\mathbf{h}_u}^2 = \cosh^2u = \sinh^2u + 1 = \norm{\mathbf{c}_u}^2, \qquad \mathbf{h}_u\cdot\mathbf{c}_u = 0 .
$$

Hence $(\mathbf{z}_s)_u = \cos s\,\mathbf{h}_u + \sin s\,\mathbf{c}_u$ and $(\mathbf{z}_s)_v = \cos s\,\mathbf{c}_u - \sin s\,\mathbf{h}_u$. These are obtained from the orthogonal pair $\mathbf{h}_u, \mathbf{c}_u$ of equal length $\cosh u$ by a rotation, so they too are orthogonal with length $\cosh u$: $E = G = \cosh^2u$ and $F = 0$, independently of $s$. By [[#thm-isometry-fff]], all the surfaces $\mathbf{z}_s$ are locally isometric to each other; in particular the helicoid $\mathbf{z}_0$ and the catenoid $\mathbf{z}_{\pi/2}$. One turn of the helicoid ($0 < v < 2\pi$) maps isometrically onto the catenoid cut along a meridian.
:::
:::

::: widget surface
fx: cos(s)*sinh(u)*sin(v) + sin(s)*cosh(u)*cos(v)
fy: -cos(s)*sinh(u)*cos(v) + sin(s)*cosh(u)*sin(v)
fz: cos(s)*v + sin(s)*u
u: -1.2, 1.2
v: 0, 6.2832
sliders: s=0:0:1.5708:0.02
color: gauss
caption: The family $\mathbf{z}_s$ of [[#ex-catenoid-helicoid]]. Move $s$ from $0$ to $\pi/2$: one turn of the helicoid bends, without stretching or tearing, into the catenoid. Watch the colouring by Gaussian curvature: it does not change during the bending — at each parameter point $K = -1/\cosh^4u$ for every $s$. This is the Theorema Egregium in action.
:::

::: quiz
A flat sheet of paper is rolled, without stretching, into a cylinder. Which quantities at a point of the sheet are unchanged? (Select all that apply.)
- [x] The lengths of curves drawn on the sheet
- [ ] The mean curvature
- [x] The Gaussian curvature
- [ ] The principal curvatures
- [x] The area of any region drawn on the sheet
::: solution
Rolling is an isometry, so lengths, angles and areas are preserved — and, by the Theorema Egregium, so is $K$ ($0$ before and after). The principal curvatures change from $(0, 0)$ to $(1/R, 0)$ and the mean curvature from $0$ to $1/(2R)$: these depend on how the sheet sits in space.
:::
:::

## Christoffel symbols

To compute derivatives on a surface, we express the second derivatives of a patch in the moving frame $\mathbf{x}_u, \mathbf{x}_v, \mathbf{n}$, which is a basis of $\R^3$ at each point. The normal components are already known: by [[differential-geometry/surface-curvature#eq-LMN]] they are $L$, $M$, $N$. Writing $1$ for $u$ and $2$ for $v$, we have the **Gauss formulas**

$$
\begin{aligned}
\mathbf{x}_{uu} &= \Gamma^1_{11}\,\mathbf{x}_u + \Gamma^2_{11}\,\mathbf{x}_v + L\,\mathbf{n},\\
\mathbf{x}_{uv} &= \Gamma^1_{12}\,\mathbf{x}_u + \Gamma^2_{12}\,\mathbf{x}_v + M\,\mathbf{n},\\
\mathbf{x}_{vv} &= \Gamma^1_{22}\,\mathbf{x}_u + \Gamma^2_{22}\,\mathbf{x}_v + N\,\mathbf{n}.
\end{aligned}
$$ {#eq-gauss-formulas}

::: definition Christoffel symbols {#def-christoffel}
The coefficients $\Gamma^k_{ij}$ in [[#eq-gauss-formulas]] are the **Christoffel symbols** of the patch $\mathbf{x}$; we also put $\Gamma^k_{21} = \Gamma^k_{12}$, since $\mathbf{x}_{vu} = \mathbf{x}_{uv}$. They describe how the tangent vectors $\mathbf{x}_u$, $\mathbf{x}_v$ change, measured within the tangent plane.
:::

The derivatives of the normal are given by the shape operator: if $A = (a_{ij})$ is the matrix of $W$ from [[differential-geometry/surface-curvature#eq-weingarten]], then

$$
\mathbf{n}_u = -a_{11}\,\mathbf{x}_u - a_{21}\,\mathbf{x}_v, \qquad \mathbf{n}_v = -a_{12}\,\mathbf{x}_u - a_{22}\,\mathbf{x}_v
$$ {#eq-weingarten-eqs}

(the **Weingarten equations**). The key fact is that the Christoffel symbols, unlike $L, M, N$, are intrinsic.

::: theorem The Christoffel symbols are intrinsic {#thm-christoffel-intrinsic}
The Christoffel symbols are determined by $E$, $F$, $G$ and their first derivatives. Explicitly, they are the solutions of the linear systems

$$
\begin{pmatrix}E & F\\ F & G\end{pmatrix}\begin{pmatrix}\Gamma^1_{11}\\ \Gamma^2_{11}\end{pmatrix} = \begin{pmatrix}\tfrac12E_u\\ F_u - \tfrac12E_v\end{pmatrix}, \quad \begin{pmatrix}E & F\\ F & G\end{pmatrix}\begin{pmatrix}\Gamma^1_{12}\\ \Gamma^2_{12}\end{pmatrix} = \begin{pmatrix}\tfrac12E_v\\ \tfrac12G_u\end{pmatrix}, \quad \begin{pmatrix}E & F\\ F & G\end{pmatrix}\begin{pmatrix}\Gamma^1_{22}\\ \Gamma^2_{22}\end{pmatrix} = \begin{pmatrix}F_v - \tfrac12G_u\\ \tfrac12G_v\end{pmatrix}.
$$
:::

::: proof
Take the dot product of each Gauss formula with $\mathbf{x}_u$ and with $\mathbf{x}_v$; the normal terms drop out. For the first formula,

$$
\mathbf{x}_{uu}\cdot\mathbf{x}_u = \Gamma^1_{11}E + \Gamma^2_{11}F, \qquad \mathbf{x}_{uu}\cdot\mathbf{x}_v = \Gamma^1_{11}F + \Gamma^2_{11}G .
$$

The left-hand sides are expressed through $E, F, G$ by differentiating the definitions $E = \mathbf{x}_u\cdot\mathbf{x}_u$, $F = \mathbf{x}_u\cdot\mathbf{x}_v$, $G = \mathbf{x}_v\cdot\mathbf{x}_v$:

$$
E_u = 2\,\mathbf{x}_{uu}\cdot\mathbf{x}_u, \quad E_v = 2\,\mathbf{x}_{uv}\cdot\mathbf{x}_u, \quad G_u = 2\,\mathbf{x}_{uv}\cdot\mathbf{x}_v, \quad G_v = 2\,\mathbf{x}_{vv}\cdot\mathbf{x}_v,
$$

$$
F_u = \mathbf{x}_{uu}\cdot\mathbf{x}_v + \mathbf{x}_u\cdot\mathbf{x}_{uv}, \qquad F_v = \mathbf{x}_{uv}\cdot\mathbf{x}_v + \mathbf{x}_u\cdot\mathbf{x}_{vv}.
$$

Hence $\mathbf{x}_{uu}\cdot\mathbf{x}_u = \tfrac12E_u$ and $\mathbf{x}_{uu}\cdot\mathbf{x}_v = F_u - \mathbf{x}_u\cdot\mathbf{x}_{uv} = F_u - \tfrac12E_v$, which is the first system. Similarly $\mathbf{x}_{uv}\cdot\mathbf{x}_u = \tfrac12E_v$, $\mathbf{x}_{uv}\cdot\mathbf{x}_v = \tfrac12G_u$, $\mathbf{x}_{vv}\cdot\mathbf{x}_u = F_v - \tfrac12G_u$ and $\mathbf{x}_{vv}\cdot\mathbf{x}_v = \tfrac12G_v$ give the other two. The coefficient matrix has determinant $EG - F^2 > 0$, so each system has a unique solution, built from $E, F, G$ and their first derivatives.
:::

When the coordinate curves are orthogonal ($F = 0$), the systems are diagonal and the symbols are simply

$$
\Gamma^1_{11} = \frac{E_u}{2E},\quad \Gamma^2_{11} = -\frac{E_v}{2G},\quad \Gamma^1_{12} = \frac{E_v}{2E},\quad \Gamma^2_{12} = \frac{G_u}{2G},\quad \Gamma^1_{22} = -\frac{G_u}{2E},\quad \Gamma^2_{22} = \frac{G_v}{2G}.
$$ {#eq-christoffel-orthogonal}

::: example Christoffel symbols of the sphere and of polar coordinates {#ex-christoffel}
Compute the Christoffel symbols of the sphere in the latitude–longitude patch $\mathbf{x}(\theta,\varphi) = (R\cos\theta\cos\varphi, R\cos\theta\sin\varphi, R\sin\theta)$, and of the plane in polar coordinates.
::: solution
For the sphere, $E = R^2$, $F = 0$, $G = R^2\cos^2\theta$ (with $u = \theta$, $v = \varphi$). The only non-zero derivative is $G_\theta = -2R^2\sin\theta\cos\theta$, so by [[#eq-christoffel-orthogonal]]

$$
\Gamma^2_{12} = \frac{G_\theta}{2G} = -\tan\theta, \qquad \Gamma^1_{22} = -\frac{G_\theta}{2E} = \sin\theta\cos\theta,
$$

and the other four symbols vanish. For the plane in polar coordinates $\mathbf{x}(r,\theta) = (r\cos\theta, r\sin\theta, 0)$ we have $E = 1$, $F = 0$, $G = r^2$, so $\Gamma^2_{12} = \frac{2r}{2r^2} = \frac1r$ and $\Gamma^1_{22} = -r$, the others being $0$. Indeed $\mathbf{x}_{\theta\theta} = -(r\cos\theta, r\sin\theta, 0) = -r\,\mathbf{x}_r$, as $\Gamma^1_{22} = -r$ says. Even in the flat plane the Christoffel symbols need not vanish: they depend on the coordinates, not only on the geometry.
:::
:::

## The Theorema Egregium

The Gauss formulas contain more information than meets the eye, because third derivatives of $\mathbf{x}$ can be computed in two orders that must agree: $(\mathbf{x}_{uu})_v = (\mathbf{x}_{uv})_u$. Writing out both sides in the frame $\mathbf{x}_u, \mathbf{x}_v, \mathbf{n}$ gives equations that every surface must satisfy, and one of them is Gauss's theorem.

::: theorem Theorema Egregium {#thm-egregium}
The Gaussian curvature of a surface is intrinsic: in any patch it can be expressed in terms of $E$, $F$, $G$ and their first and second partial derivatives. Explicitly, it satisfies **Gauss's equation**

$$
E\,K = \bigl(\Gamma^2_{11}\bigr)_v - \bigl(\Gamma^2_{12}\bigr)_u + \Gamma^1_{11}\Gamma^2_{12} + \Gamma^2_{11}\Gamma^2_{22} - \Gamma^1_{12}\Gamma^2_{11} - \bigl(\Gamma^2_{12}\bigr)^2 .
$$ {#eq-gauss-equation}

Consequently, a local isometry preserves Gaussian curvature: if $\phi\colon S\to\tilde S$ is a local isometry, then $\tilde K(\phi(p)) = K(p)$ for every $p\in S$.
:::

::: proof
Differentiate the first Gauss formula with respect to $v$ and the second with respect to $u$:

$$
\begin{aligned}
\mathbf{x}_{uuv} &= (\Gamma^1_{11})_v\,\mathbf{x}_u + \Gamma^1_{11}\,\mathbf{x}_{uv} + (\Gamma^2_{11})_v\,\mathbf{x}_v + \Gamma^2_{11}\,\mathbf{x}_{vv} + L_v\,\mathbf{n} + L\,\mathbf{n}_v,\\
\mathbf{x}_{uvu} &= (\Gamma^1_{12})_u\,\mathbf{x}_u + \Gamma^1_{12}\,\mathbf{x}_{uu} + (\Gamma^2_{12})_u\,\mathbf{x}_v + \Gamma^2_{12}\,\mathbf{x}_{uv} + M_u\,\mathbf{n} + M\,\mathbf{n}_u .
\end{aligned}
$$

Now substitute the Gauss formulas for $\mathbf{x}_{uu}, \mathbf{x}_{uv}, \mathbf{x}_{vv}$ and the Weingarten equations [[#eq-weingarten-eqs]] for $\mathbf{n}_u, \mathbf{n}_v$, and collect the coefficient of $\mathbf{x}_v$ on each side. In the first line, $\mathbf{x}_v$ comes from $\Gamma^1_{11}\mathbf{x}_{uv}$ (coefficient $\Gamma^1_{11}\Gamma^2_{12}$), from $(\Gamma^2_{11})_v\mathbf{x}_v$, from $\Gamma^2_{11}\mathbf{x}_{vv}$ (coefficient $\Gamma^2_{11}\Gamma^2_{22}$) and from $L\mathbf{n}_v$ (coefficient $-La_{22}$). In the second line it comes from $\Gamma^1_{12}\mathbf{x}_{uu}$ ($\Gamma^1_{12}\Gamma^2_{11}$), $(\Gamma^2_{12})_u\mathbf{x}_v$, $\Gamma^2_{12}\mathbf{x}_{uv}$ ($(\Gamma^2_{12})^2$) and $M\mathbf{n}_u$ ($-Ma_{21}$). Since $\mathbf{x}_{uuv} = \mathbf{x}_{uvu}$ and $\mathbf{x}_u, \mathbf{x}_v, \mathbf{n}$ are linearly independent, the coefficients agree:

$$
\Gamma^1_{11}\Gamma^2_{12} + (\Gamma^2_{11})_v + \Gamma^2_{11}\Gamma^2_{22} - La_{22} = \Gamma^1_{12}\Gamma^2_{11} + (\Gamma^2_{12})_u + (\Gamma^2_{12})^2 - Ma_{21}.
$$

Finally we compute $La_{22} - Ma_{21}$. From $A = \begin{pmatrix}E&F\\F&G\end{pmatrix}^{-1}\begin{pmatrix}L&M\\M&N\end{pmatrix}$ we get $a_{21} = \frac{EM - FL}{EG - F^2}$ and $a_{22} = \frac{EN - FM}{EG - F^2}$, so

$$
La_{22} - Ma_{21} = \frac{L(EN - FM) - M(EM - FL)}{EG - F^2} = \frac{E\,(LN - M^2)}{EG - F^2} = E\,K
$$

by [[differential-geometry/surface-curvature#eq-K-H]]. Rearranging gives [[#eq-gauss-equation]]. Since $E > 0$ and, by [[#thm-christoffel-intrinsic]], the right-hand side involves only $E, F, G$ and their first and second derivatives, so does $K$.

For the last statement, let $\mathbf{x}$ be a patch around $p$ on which $\phi$ is one-to-one. By [[#thm-isometry-fff]], $\tilde{\mathbf{x}} = \phi\circ\mathbf{x}$ has the same $E, F, G$ as $\mathbf{x}$, hence the same Christoffel symbols and, by Gauss's equation, the same Gaussian curvature at corresponding points.
:::

The proof shows where the theorem comes from: the second fundamental form enters only through the combination $LN - M^2$, which is exactly the numerator of $K$. Individually $L$, $M$, $N$ — and with them $\kappa_1$, $\kappa_2$ and $H$ — are not intrinsic. The coefficients of $\mathbf{x}_u$ and $\mathbf{n}$ in $\mathbf{x}_{uuv} = \mathbf{x}_{uvu}$, and the analogous identity $\mathbf{x}_{vvu} = \mathbf{x}_{uvv}$, give further equations, discussed at the end of the chapter.

### Formulas for K in terms of the metric

Substituting [[#eq-christoffel-orthogonal]] into Gauss's equation gives a compact formula for orthogonal patches ([[#exr-orthogonal]]):

$$
K = -\frac{1}{2\sqrt{EG}}\left[\pdv{}{v}\left(\frac{E_v}{\sqrt{EG}}\right) + \pdv{}{u}\left(\frac{G_u}{\sqrt{EG}}\right)\right] \qquad (F = 0).
$$ {#eq-K-orthogonal}

Two special cases are especially useful. If $E = 1$ and $F = 0$ (as for surfaces of revolution with an arc-length profile, or geodesic polar coordinates), then $K = -\dfrac{(\sqrt G)_{uu}}{\sqrt G}$. If the patch is **isothermal**, $E = G = \lambda(u,v)$ and $F = 0$ (conformal coordinates, such as those given by stereographic projection), then

$$
K = -\frac{1}{2\lambda}\,\Delta(\ln\lambda), \qquad \Delta = \pdv{^2}{u^2} + \pdv{^2}{v^2}.
$$ {#eq-K-isothermal}

For a general patch, Gauss's equation can be written out entirely in terms of $E, F, G$ as the **Brioschi formula**:

$$
K = \frac{1}{(EG - F^2)^2}\left(\begin{vmatrix} -\tfrac12E_{vv} + F_{uv} - \tfrac12G_{uu} & \tfrac12E_u & F_u - \tfrac12E_v\\ F_v - \tfrac12G_u & E & F\\ \tfrac12G_v & F & G\end{vmatrix} - \begin{vmatrix}0 & \tfrac12E_v & \tfrac12G_u\\ \tfrac12E_v & E & F\\ \tfrac12G_u & F & G\end{vmatrix}\right).
$$ {#eq-brioschi}

Nobody computes with the Brioschi formula by hand if they can avoid it, but it makes the Theorema Egregium completely explicit.

::: example Curvature from the metric alone {#ex-K-metric}
(a) Recover $K = 1/R^2$ for the sphere from $E = R^2$, $F = 0$, $G = R^2\cos^2\theta$ alone. (b) A surface has an isothermal patch with $E = G = \dfrac{4}{(1 + u^2 + v^2)^2}$, $F = 0$. Find its Gaussian curvature.
::: solution
(a) With $u = \theta$: $\sqrt{EG} = R^2\cos\theta$, $E_v = 0$ and $G_u = -2R^2\cos\theta\sin\theta$, so $G_u/\sqrt{EG} = -2\sin\theta$. By [[#eq-K-orthogonal]],

$$
K = -\frac{1}{2R^2\cos\theta}\cdot\pdv{}{\theta}(-2\sin\theta) = -\frac{-2\cos\theta}{2R^2\cos\theta} = \frac{1}{R^2}.
$$

The ants could find the radius of their sphere by surveying, without ever leaving it.

(b) $\ln\lambda = \ln4 - 2\ln(1 + u^2 + v^2)$. With $\rho = 1 + u^2 + v^2$, $\pdv{^2}{u^2}\ln\rho = \frac{2}{\rho} - \frac{4u^2}{\rho^2}$, and similarly for $v$, so $\Delta\ln\rho = \frac4\rho - \frac{4(u^2 + v^2)}{\rho^2} = \frac{4}{\rho^2}$. Hence $\Delta\ln\lambda = -\frac{8}{\rho^2}$ and

$$
K = -\frac{1}{2\lambda}\cdot\left(-\frac{8}{\rho^2}\right) = \frac{\rho^2}{8}\cdot\frac{8}{\rho^2} = 1 .
$$

This is the metric of the unit sphere in the coordinates of stereographic projection, so the answer had to be $1$ — but we found it without knowing what the surface looks like in space.
:::
:::

::: quiz
Which of the following are intrinsic, that is, determined by the first fundamental form? (Select all that apply.)
- [x] The Gaussian curvature $K$
- [ ] The mean curvature $H$
- [x] The Christoffel symbols $\Gamma^k_{ij}$ of a given patch
- [ ] The coefficient $L$ of the second fundamental form
- [x] The area of a region
::: solution
Areas and the Christoffel symbols are built from $E, F, G$ and their derivatives ([[#thm-christoffel-intrinsic]]), and $K$ is intrinsic by the Theorema Egregium. $H$ and $L$ are not: the plane and the cylinder have the same $E, F, G$ in suitable patches but different $H$ and $L$.
:::
:::

::: warning The converse is false
Local isometries preserve $K$, but two surfaces whose curvatures agree at corresponding points need not be isometric under that correspondence. The surface $\mathbf{x}(u,v) = (u\cos v,\ u\sin v,\ \ln u)$, $u > 0$, and the helicoid $\tilde{\mathbf{x}}(u,v) = (u\cos v,\ u\sin v,\ v)$ both have $K = -\frac{1}{(1 + u^2)^2}$ at the point with parameters $(u,v)$, but their first fundamental forms are $\left(1 + \frac{1}{u^2}\right)du^2 + u^2dv^2$ and $du^2 + (1 + u^2)\,dv^2$, so the map $\tilde{\mathbf{x}}\circ\mathbf{x}^{-1}$ is not an isometry ([[#exr-converse]]). Curvature is a necessary condition for isometry, not a sufficient one — except when it is constant (Minding's theorem below).
:::

::: widget surface
fx: u*cos(v)
fy: u*sin(v)
fz: ln(u)
u: 0.15, 2.5
v: 0, 2pi
color: gauss
caption: The surface of revolution $z = \ln r$, coloured by Gaussian curvature $K = -1/(1 + r^2)^2$. At the point with parameters $(u, v)$ it has exactly the same curvature as the helicoid $(u\cos v, u\sin v, v)$ — both depend only on the distance from the axis in the same way — yet the correspondence between them stretches lengths. Equal curvature does not imply isometry.
:::

## Consequences

### No perfect map of the Earth

::: corollary No isometric map of the sphere {#cor-no-map}
No open subset of a sphere is isometric to an open subset of the plane. More generally, spheres of different radii are not locally isometric, and a surface with $K\ne0$ somewhere is not locally isometric to the plane near that point.
:::

::: proof
A local isometry preserves $K$ by [[#thm-egregium]]. The sphere of radius $R$ has $K = 1/R^2 > 0$ at every point, while the plane has $K = 0$; spheres of radii $R_1\ne R_2$ have different constant curvatures.
:::

So every map of a part of the Earth distorts something, and cartographers must choose what to sacrifice. **Conformal** projections, such as Mercator's and the stereographic projection ([[differential-geometry/regular-surfaces#def-conformal]]), preserve angles but not areas. **Equal-area** projections preserve areas but not angles: for instance Lambert's cylindrical projection, which sends the point at latitude $\theta$ and longitude $\varphi$ of the unit sphere to $(\varphi, \sin\theta)$, preserves area by Archimedes' hat-box theorem ([[multivariable/surface-integrals#ex-sphere-area]]). No projection can do both at once — a map that preserves both angles and areas preserves lengths ([[#exr-angles-areas]]) and would contradict [[#cor-no-map]].

::: application The pizza theorem
A slice of pizza held by its crust droops at the tip. The standard remedy is to fold the crust slightly, curving the slice across its width — and the tip stops drooping. The reason is the Theorema Egregium. The slice starts flat, with $K = 0$, and bending it without stretching cannot change that. Folding it across makes one principal curvature non-zero; since $K = \kappa_1\kappa_2$ must remain $0$, the other principal curvature — along the length of the slice — is forced to be $0$, so the slice stays straight in that direction. The same principle stiffens corrugated iron, folded paper fans and the curved metal of a tape measure, which stays rigid when extended because it is curved across its width.
:::

::: widget surface
fx: u
fy: sin(c*v)/c
fz: (1 - cos(c*v))/c
u: 0, 3
v: -1, 1
sliders: c=0.05:0.05:2:0.05
color: gauss
caption: A strip of paper bent across its width with curvature $c$ (the cross-sections are circular arcs of radius $1/c$). Every value of $c$ gives a surface isometric to the flat strip, with $K = 0$ everywhere — the colour never changes. Notice that however much you bend it across, the lines running along the strip stay perfectly straight: a sheet curved one way cannot curve the other way without stretching.
:::

### Surfaces of constant curvature

For surfaces of constant curvature the converse of the Theorema Egregium does hold.

::: theorem Minding's theorem {#thm-minding}
Any two regular surfaces with the same constant Gaussian curvature are locally isometric.
:::

::: proof
*Sketch.* Around any point of a surface one can construct **geodesic polar coordinates** $(\rho, \vartheta)$, in which the first fundamental form is $d\rho^2 + G(\rho,\vartheta)\,d\vartheta^2$ with $\sqrt G\to0$ and $(\sqrt G)_\rho\to1$ as $\rho\to0$ (their construction uses the geodesics of [[differential-geometry/geodesics-gauss-bonnet]]). By [[#eq-K-orthogonal]] with $E = 1$, $\sqrt G$ satisfies $(\sqrt G)_{\rho\rho} + K\sqrt G = 0$. If $K$ is a constant, this ordinary differential equation with these initial conditions determines $\sqrt G$ uniquely: $\sqrt G = \rho$, $\frac{\sin(\sqrt K\rho)}{\sqrt K}$ or $\frac{\sinh(\sqrt{-K}\rho)}{\sqrt{-K}}$ for $K = 0$, $K > 0$, $K < 0$. So two surfaces with the same constant curvature have the same first fundamental form in geodesic polar coordinates, and are locally isometric by [[#thm-isometry-fff]]. Details are in do Carmo, *Differential Geometry of Curves and Surfaces*, §4-6.
:::

Every surface with $K\equiv0$ is therefore locally isometric to the plane: such surfaces are called **developable**, and besides cylinders and cones they include the tangent developables swept out by the tangent lines of a space curve — all of them can be made from paper. Surfaces with $K\equiv1$ are locally isometric to the unit sphere, and surfaces with $K\equiv-1$, such as the pseudosphere obtained by rotating a tractrix, are locally isometric to the hyperbolic plane, whose metric $\frac{du^2 + dv^2}{v^2}$ ($v > 0$) has $K = -1$ by [[#eq-K-isothermal]].

## The Codazzi–Mainardi equations and Bonnet's theorem

Collecting instead the coefficients of $\mathbf{n}$ in $\mathbf{x}_{uuv} = \mathbf{x}_{uvu}$, and in the analogous identity $\mathbf{x}_{vvu} = \mathbf{x}_{uvv}$, gives the **Codazzi–Mainardi equations**

$$
\begin{aligned}
L_v - M_u &= L\,\Gamma^1_{12} + M\bigl(\Gamma^2_{12} - \Gamma^1_{11}\bigr) - N\,\Gamma^2_{11},\\
M_v - N_u &= L\,\Gamma^1_{22} + M\bigl(\Gamma^2_{22} - \Gamma^1_{12}\bigr) - N\,\Gamma^2_{12}.
\end{aligned}
$$ {#eq-codazzi}

Gauss's equation and the Codazzi–Mainardi equations are the **compatibility equations** of surface theory: the six functions $E, F, G, L, M, N$ of a patch cannot be prescribed arbitrarily. Conversely, they are the only obstruction, exactly as curvature and torsion determine a curve ([[differential-geometry/curves#thm-fundamental-curves]]).

::: theorem Bonnet's theorem {#thm-bonnet}
Let $E, F, G, L, M, N$ be smooth functions on a connected, simply connected open set $U\subseteq\R^2$ with $E > 0$, $G > 0$, $EG - F^2 > 0$, satisfying Gauss's equation [[#eq-gauss-equation]] and the Codazzi–Mainardi equations [[#eq-codazzi]]. Then there is a patch $\mathbf{x}\colon U\to\R^3$ whose first and second fundamental forms have these coefficients, and it is unique up to a rigid motion of $\R^3$.
:::

::: proof
*Sketch.* Uniqueness: if two patches have the same forms, move one by a rigid motion so that the frames $(\mathbf{x}_u, \mathbf{x}_v, \mathbf{n})$ agree at one point. Both frames satisfy the same linear system of partial differential equations — the Gauss formulas and Weingarten equations, whose coefficients are built from $E, F, G, L, M, N$ — so they agree everywhere, and then so do the patches. Existence: the same system is solvable precisely when its mixed partial derivatives are compatible, which is what the Gauss and Codazzi–Mainardi equations say; integrating the frame then gives $\mathbf{x}$. See do Carmo, *Differential Geometry of Curves and Surfaces*, §4-3 and its appendix.
:::

::: history
Carl Friedrich Gauss spent much of the 1820s directing the geodetic survey of the Kingdom of Hanover, measuring large triangles on the curved surface of the Earth, and the experience fed directly into his *Disquisitiones generales circa superficies curvas*, presented to the Göttingen Society in 1827. There he proved that the curvature measure he had defined through the normal map depends only on the coefficients of the first fundamental form and their derivatives, and he himself singled the result out as an *egregium theorema*, a remarkable theorem. Ferdinand Minding showed in 1839 that surfaces of equal constant curvature are locally isometric; Elwin Bruno Christoffel introduced the symbols that bear his name in 1869, in work on quadratic differential forms in any number of variables; and the compatibility equations were found by Gaspare Mainardi (1856) and, independently, by Delfino Codazzi in the 1860s, while Pierre Ossian Bonnet proved the fundamental theorem of surfaces in 1867. In 1854 Bernhard Riemann had already proposed studying spaces of any dimension through their intrinsic metric alone — the idea that Einstein's general relativity would make physical.
:::

## Where this leads

The Christoffel symbols are the beginning of a whole calculus on surfaces. In [[differential-geometry/geodesics-gauss-bonnet]] they appear in the equations of geodesics, the "straightest" curves on a surface, and the intrinsic nature of $K$ is pushed to its limit: the total curvature of a closed surface turns out to depend only on its topology. Riemannian geometry generalises everything here to $n$ dimensions, where the role of $K$ is taken by the Riemann curvature tensor, built from Christoffel symbols in exactly the way Gauss's equation builds $K$; in general relativity this tensor describes gravity. Isothermal coordinates connect surfaces with complex analysis ([[complex-analysis/conformal-maps]]), and the classification of surfaces of constant curvature leads to non-Euclidean geometry.

::: summary
- A local isometry preserves lengths of tangent vectors; two patches with the same $E, F, G$ give an isometry, and conversely ([[#def-local-isometry]], [[#thm-isometry-fff]]). Plane and cylinder, helicoid and catenoid are locally isometric.
- The Gauss formulas $\mathbf{x}_{ij} = \Gamma^1_{ij}\mathbf{x}_u + \Gamma^2_{ij}\mathbf{x}_v + (\text{second form})\,\mathbf{n}$ define the Christoffel symbols, which depend only on $E, F, G$ and their first derivatives ([[#thm-christoffel-intrinsic]]).
- Theorema Egregium: comparing $\mathbf{x}_{uuv}$ with $\mathbf{x}_{uvu}$ gives Gauss's equation $EK = (\Gamma^2_{11})_v - (\Gamma^2_{12})_u + \cdots$, so $K$ is intrinsic and preserved by local isometries ([[#thm-egregium]]).
- For $F = 0$: $K = -\frac{1}{2\sqrt{EG}}\left[(E_v/\sqrt{EG})_v + (G_u/\sqrt{EG})_u\right]$; for $E = G = \lambda$: $K = -\frac{1}{2\lambda}\Delta\ln\lambda$.
- $H$, $\kappa_1$, $\kappa_2$ and $L, M, N$ are not intrinsic.
- No part of a sphere can be mapped to the plane preserving distances; maps must distort lengths (conformal maps keep angles, equal-area maps keep areas, never both).
- Surfaces of equal constant curvature are locally isometric (Minding); the Gauss and Codazzi–Mainardi equations are the only constraints on the two fundamental forms (Bonnet).
:::

## Exercises

::: exercise A cone {#exr-cone level=1 check="0"}
Compute the first fundamental form of the cone $\mathbf{x}(r,\theta) = (r\cos\theta,\ r\sin\theta,\ r)$, $r > 0$, and use [[#eq-K-orthogonal]] to find its Gaussian curvature.
::: solution
$\mathbf{x}_r = (\cos\theta, \sin\theta, 1)$ and $\mathbf{x}_\theta = (-r\sin\theta, r\cos\theta, 0)$, so $E = 2$, $F = 0$, $G = r^2$. Then $E_\theta = 0$ and $\sqrt{EG} = \sqrt2\,r$, so $G_r/\sqrt{EG} = 2r/(\sqrt2r) = \sqrt2$, whose derivative is $0$. Hence $K = 0$: the cone is developable.
:::
:::

::: exercise Polar coordinates {level=1 check="-3"}
For the plane in polar coordinates ($E = 1$, $F = 0$, $G = r^2$), find the Christoffel symbol $\Gamma^1_{22}$ at a point with $r = 3$.
::: solution
By [[#eq-christoffel-orthogonal]], $\Gamma^1_{22} = -\dfrac{G_r}{2E} = -\dfrac{2r}{2} = -r$, which is $-3$ at $r = 3$ (see [[#ex-christoffel]]).
:::
:::

::: exercise Unrolling a helix {level=1 check="2*sqrt(2)*pi"}
Find the length of one turn of the helix $(\cos t, \sin t, t)$, $0\le t\le2\pi$, by unrolling the cylinder.
::: solution
By [[#ex-cylinder]] with $R = c = 1$, the helix unrolls to a straight segment from $(0,0)$ to $(2\pi, 2\pi)$, of length $2\pi\sqrt2$.
:::
:::

::: exercise The hyperbolic plane {level=2 check="-1"}
Find the Gaussian curvature of the metric $\dfrac{du^2 + dv^2}{v^2}$ on the half-plane $v > 0$ (that is, $E = G = 1/v^2$, $F = 0$).
::: solution
By [[#eq-K-isothermal]] with $\lambda = v^{-2}$: $\ln\lambda = -2\ln v$, so $\Delta\ln\lambda = \pdv{^2}{v^2}(-2\ln v) = \frac{2}{v^2}$, and $K = -\frac{1}{2\lambda}\cdot\frac{2}{v^2} = -\frac{v^2}{2}\cdot\frac{2}{v^2} = -1$.
:::
:::

::: exercise A metric with E = 1 {level=2 check="-1"}
A surface has a patch with $E = 1$, $F = 0$, $G = \cosh^2u$. Find its Gaussian curvature. What do you get for $G = \cos^2u$?
::: solution
With $E = 1$, [[#eq-K-orthogonal]] reduces to $K = -(\sqrt G)_{uu}/\sqrt G$. For $\sqrt G = \cosh u$, $K = -\cosh u/\cosh u = -1$. For $\sqrt G = \cos u$, $K = \cos u/\cos u = 1$ (the unit sphere, with $u$ the latitude).
:::
:::

::: exercise The cone is a rolled-up sector {level=2 check="sqrt(2)*pi"}
Show that the cone of [[#exr-cone]] (with $0 < \theta < 2\pi$) is isometric to a sector of the plane, and find the angle of that sector.
::: hint
Look for polar coordinates $(\rho, \psi)$ in the plane with $\rho = ar$ and $\psi = b\theta$ such that $d\rho^2 + \rho^2d\psi^2 = 2\,dr^2 + r^2\,d\theta^2$.
:::
::: solution
In the plane, polar coordinates $(\rho, \psi)$ give the first fundamental form $d\rho^2 + \rho^2\,d\psi^2$. Put $\rho = \sqrt2\,r$ and $\psi = \theta/\sqrt2$: then $d\rho^2 + \rho^2d\psi^2 = 2\,dr^2 + 2r^2\cdot\tfrac12d\theta^2 = 2\,dr^2 + r^2\,d\theta^2$, which is the cone's form. So the patch $(r,\theta)\mapsto(\sqrt2r\cos\tfrac{\theta}{\sqrt2},\ \sqrt2r\sin\tfrac{\theta}{\sqrt2})$ of the plane has the same coefficients as the cone, and by [[#thm-isometry-fff]] the cone (cut along one ruling) is isometric to the sector $0 < \psi < 2\pi/\sqrt2 = \sqrt2\,\pi$ — about $255^\circ$. Cutting a paper cone along a ruling and flattening it gives exactly this sector.
:::
:::

::: exercise Angles and areas together {#exr-angles-areas level=2}
Let $\phi\colon S\to\tilde S$ be a smooth map whose differential preserves angles between tangent vectors and areas (so in matching patches, $\tilde E = \lambda E$, $\tilde F = \lambda F$, $\tilde G = \lambda G$ for a positive function $\lambda$, and $\tilde E\tilde G - \tilde F^2 = EG - F^2$). Show that $\phi$ is a local isometry, and deduce that no map of a region of the sphere onto a region of the plane is both conformal and area-preserving.
::: solution
From the hypotheses, $\tilde E\tilde G - \tilde F^2 = \lambda^2(EG - F^2) = EG - F^2$, and $EG - F^2 > 0$, so $\lambda^2 = 1$ and $\lambda = 1$. Then $\tilde E = E$, $\tilde F = F$, $\tilde G = G$, so $\phi$ is a local isometry by [[#thm-isometry-fff]]. A map from part of a sphere to part of the plane that is conformal and area-preserving would therefore be a local isometry, which [[#cor-no-map]] forbids.
:::
:::

::: exercise The orthogonal formula {#exr-orthogonal level=3}
Derive [[#eq-K-orthogonal]] from Gauss's equation [[#eq-gauss-equation]] and the Christoffel symbols [[#eq-christoffel-orthogonal]] of an orthogonal patch.
::: hint
Write $\Gamma^2_{11} = -E_v/(2G)$ and $\Gamma^2_{12} = G_u/(2G)$, expand everything, and compare with the expansion of the right-hand side of [[#eq-K-orthogonal]] multiplied by $E$.
:::
::: solution
With $F = 0$, Gauss's equation reads

$$
EK = -\left(\frac{E_v}{2G}\right)_v - \left(\frac{G_u}{2G}\right)_u + \frac{E_u}{2E}\cdot\frac{G_u}{2G} - \frac{E_v}{2G}\cdot\frac{G_v}{2G} + \frac{E_v}{2E}\cdot\frac{E_v}{2G} - \frac{G_u^2}{4G^2}.
$$

Expanding the derivatives, $-\left(\frac{E_v}{2G}\right)_v = -\frac{E_{vv}}{2G} + \frac{E_vG_v}{2G^2}$ and $-\left(\frac{G_u}{2G}\right)_u = -\frac{G_{uu}}{2G} + \frac{G_u^2}{2G^2}$. Collecting terms and dividing by $E$,

$$
K = -\frac{E_{vv} + G_{uu}}{2EG} + \frac{E_vG_v + G_u^2}{4EG^2} + \frac{E_uG_u + E_v^2}{4E^2G}.
$$

On the other hand, with $W = \sqrt{EG}$ and $W_v = \frac{E_vG + EG_v}{2W}$, $W_u = \frac{E_uG + EG_u}{2W}$,

$$
-\frac{1}{2W}\left[\left(\frac{E_v}{W}\right)_v + \left(\frac{G_u}{W}\right)_u\right] = -\frac{E_{vv} + G_{uu}}{2W^2} + \frac{E_vW_v + G_uW_u}{2W^3},
$$

and $\frac{E_vW_v + G_uW_u}{2W^3} = \frac{E_v(E_vG + EG_v) + G_u(E_uG + EG_u)}{4W^4} = \frac{E_v^2G + EE_vG_v + E_uGG_u + EG_u^2}{4E^2G^2}$, which equals the sum of the last two fractions above. So the two expressions agree.
:::
:::

::: exercise Same curvature, not isometric {#exr-converse level=3}
Let $\mathbf{x}(u,v) = (u\cos v,\ u\sin v,\ \ln u)$ and $\tilde{\mathbf{x}}(u,v) = (u\cos v,\ u\sin v,\ v)$ for $u > 0$. Show that $K(u,v) = \tilde K(u,v) = -\dfrac{1}{(1+u^2)^2}$, but that $\tilde{\mathbf{x}}\circ\mathbf{x}^{-1}$ is not a local isometry.
::: solution
For $\mathbf{x}$: $\mathbf{x}_u = (\cos v, \sin v, 1/u)$, $\mathbf{x}_v = (-u\sin v, u\cos v, 0)$, so $E = 1 + u^{-2}$, $F = 0$, $G = u^2$. It is the surface of revolution $z = \ln r$; by [[differential-geometry/surface-curvature#eq-K-graph]] applied to $f = \ln\sqrt{x^2+y^2}$ (or by [[#eq-K-orthogonal]]), $K = -\frac{1}{(1 + u^2)^2}$. For the helicoid, $E = 1$, $F = 0$, $G = 1 + u^2$, and $K = -(\sqrt G)_{uu}/\sqrt G = -\frac{(1+u^2)^{-3/2}}{(1+u^2)^{1/2}} = -\frac{1}{(1+u^2)^2}$. So the curvatures agree at corresponding points. But $E\ne\tilde E$ (and $G\ne\tilde G$), so by [[#thm-isometry-fff]] the correspondence $\tilde{\mathbf{x}}\circ\mathbf{x}^{-1}$ does not preserve the lengths of the tangent vectors $\mathbf{x}_u$: it is not a local isometry. (In fact, no local isometry maps one surface onto the other near these points, as a finer argument with the level curves of $K$ shows; see do Carmo, §4-3.)
:::
:::

::: exercise Developable means flat {level=3}
Let $\mathbf{x}(u,v) = \boldsymbol\gamma(u) + v\,\boldsymbol\delta(u)$ be a ruled surface, where $\boldsymbol\delta$ is a unit vector field along the curve $\boldsymbol\gamma$. Show that $M = \mathbf{n}\cdot\boldsymbol\delta'$, $N = 0$, and hence $K = -\dfrac{M^2}{EG - F^2}\le0$. Deduce that a ruled surface has $K\equiv0$ if and only if $\det(\boldsymbol\gamma', \boldsymbol\delta, \boldsymbol\delta') = 0$ everywhere.
::: solution
$\mathbf{x}_v = \boldsymbol\delta$, so $\mathbf{x}_{vv} = \mathbf{0}$ and $N = 0$; $\mathbf{x}_{uv} = \boldsymbol\delta'$, so $M = \mathbf{n}\cdot\boldsymbol\delta'$. Then $K = \frac{LN - M^2}{EG - F^2} = -\frac{M^2}{EG - F^2}\le0$, with equality iff $\mathbf{n}\cdot\boldsymbol\delta' = 0$. Since $\mathbf{n}$ is parallel to $\mathbf{x}_u\times\mathbf{x}_v = (\boldsymbol\gamma' + v\boldsymbol\delta')\times\boldsymbol\delta$, we have $(\mathbf{x}_u\times\mathbf{x}_v)\cdot\boldsymbol\delta' = \det(\boldsymbol\gamma' + v\boldsymbol\delta',\ \boldsymbol\delta,\ \boldsymbol\delta') = \det(\boldsymbol\gamma', \boldsymbol\delta, \boldsymbol\delta')$, the $v\boldsymbol\delta'$ term contributing a determinant with a repeated column. So $K\equiv0$ iff $\det(\boldsymbol\gamma', \boldsymbol\delta, \boldsymbol\delta') = 0$. For a cylinder ($\boldsymbol\delta$ constant) and a cone ($\boldsymbol\gamma$ constant) this holds trivially; for the helicoid, with $\boldsymbol\gamma = (0,0,u)$ and $\boldsymbol\delta = (\cos u, \sin u, 0)$, the determinant is $\det\bigl((0,0,1), (\cos u,\sin u,0), (-\sin u,\cos u,0)\bigr) = 1\ne0$, so the helicoid is not developable.
:::
:::
