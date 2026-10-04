How curved is a surface at a point? For a curve the answer is a single number, the curvature $\kappa$ ([[differential-geometry/curves#def-curvature]]). For a surface one number cannot be enough. A cylinder of radius $R$ is curved like a circle of radius $R$ around its axis but not at all along it. The surface of a saddle bends upwards in one direction and downwards in another. An egg is curved in every direction, but more in some than in others.

The idea that organises all of this is due to Gauss: watch how the **unit normal** turns as you move across the surface. On a plane it does not turn at all; on a small sphere it turns quickly in every direction; on a cylinder it turns as you go around but not as you go along. The rate of turning is a linear map of the tangent plane, the **shape operator**. It is self-adjoint, so by the spectral theorem ([[linear-algebra/spectral-theorem]]) it has two real eigenvalues, the **principal curvatures** $\kappa_1, \kappa_2$, in perpendicular directions. Their product is the **Gaussian curvature** $K$ and their average the **mean curvature** $H$, the two most important numbers in the geometry of surfaces. This chapter defines them, gives formulas for computing them in a parametrisation, and works out the standard examples.

Throughout, $S$ is a regular surface ([[differential-geometry/regular-surfaces#def-regular-surface]]) and $\mathbf{x}\colon U\to S$ a patch with $\mathbf{x}_u\times\mathbf{x}_v\ne\mathbf{0}$, smooth enough for all derivatives we use to exist and be continuous. We use the first fundamental form $E = \mathbf{x}_u\cdot\mathbf{x}_u$, $F = \mathbf{x}_u\cdot\mathbf{x}_v$, $G = \mathbf{x}_v\cdot\mathbf{x}_v$ of [[differential-geometry/regular-surfaces#def-first-ff]], and recall that $EG - F^2 = \norm{\mathbf{x}_u\times\mathbf{x}_v}^2 > 0$.

## The Gauss map

::: definition Gauss map {#def-gauss-map}
Let $S$ be an oriented surface with unit normal field $\mathbf{n}$. The **Gauss map** of $S$ is the map

$$
\mathbf{n}\colon S\to S^2, \qquad p\mapsto\mathbf{n}(p),
$$

which sends each point of $S$ to its unit normal, regarded as a point of the unit sphere $S^2$. In a patch compatible with the orientation, $\mathbf{n} = \dfrac{\mathbf{x}_u\times\mathbf{x}_v}{\norm{\mathbf{x}_u\times\mathbf{x}_v}}$.
:::

Every surface has a Gauss map locally (on a single patch), even if it is not orientable, so everything in this chapter is local and applies to all regular surfaces. The image of the Gauss map already tells us a lot:

- for a **plane** the normal is constant, and the Gauss image is a single point;
- for a **sphere** of radius $R$ centred at the origin with outward normal, $\mathbf{n}(p) = p/R$, and the Gauss image is the whole sphere;
- for a **cylinder** $x^2 + y^2 = R^2$, $\mathbf{n} = (x/R, y/R, 0)$, and the Gauss image is just the equator — a curve, not a region, because the normal does not change along the rulings.

To measure how fast the normal turns we differentiate it. If $\boldsymbol\alpha$ is a curve on $S$ with $\boldsymbol\alpha(0) = p$ and $\boldsymbol\alpha'(0) = \mathbf{w}\in T_pS$, put

$$
d\mathbf{n}_p(\mathbf{w}) = \frac{d}{dt}\Big|_{t=0}\mathbf{n}\bigl(\boldsymbol\alpha(t)\bigr).
$$

In a patch, if $\boldsymbol\alpha(t) = \mathbf{x}(u(t), v(t))$, the chain rule gives $d\mathbf{n}_p(\mathbf{w}) = \mathbf{n}_u u'(0) + \mathbf{n}_v v'(0)$ for $\mathbf{w} = \mathbf{x}_uu'(0) + \mathbf{x}_vv'(0)$. So $d\mathbf{n}_p(\mathbf{w})$ depends only on $\mathbf{w}$, not on the curve, and it is linear in $\mathbf{w}$, with $d\mathbf{n}_p(\mathbf{x}_u) = \mathbf{n}_u$ and $d\mathbf{n}_p(\mathbf{x}_v) = \mathbf{n}_v$. Moreover $d\mathbf{n}_p(\mathbf{w})$ lies in the tangent plane: differentiating $\mathbf{n}\cdot\mathbf{n} = 1$ gives $2\,\mathbf{n}\cdot d\mathbf{n}_p(\mathbf{w}) = 0$, so $d\mathbf{n}_p(\mathbf{w})$ is orthogonal to $\mathbf{n}(p)$ — exactly the condition for a vector to lie in $T_pS$ ([[differential-geometry/regular-surfaces#def-tangent-plane]]). Hence $d\mathbf{n}_p$ is a linear map from $T_pS$ to itself.

## The shape operator and the second fundamental form

::: definition Shape operator {#def-shape-operator}
The **shape operator** (or **Weingarten map**) of $S$ at $p$ is the linear map

$$
W_p = -d\mathbf{n}_p\colon T_pS\to T_pS .
$$

In a patch, $W(\mathbf{x}_u) = -\mathbf{n}_u$ and $W(\mathbf{x}_v) = -\mathbf{n}_v$.
:::

The minus sign is a convention that makes curvatures positive in the most common situations (a sphere with its *inward* normal), as we will see. The single most important property of $W_p$ is its symmetry.

::: theorem The shape operator is self-adjoint {#thm-self-adjoint}
For all $\mathbf{w}_1, \mathbf{w}_2\in T_pS$, $\;W_p(\mathbf{w}_1)\cdot\mathbf{w}_2 = \mathbf{w}_1\cdot W_p(\mathbf{w}_2)$.
:::

::: proof
Both sides are bilinear in $(\mathbf{w}_1, \mathbf{w}_2)$, and the identity is trivial when $\mathbf{w}_1 = \mathbf{w}_2$, so it suffices to check it for $\mathbf{w}_1 = \mathbf{x}_u$, $\mathbf{w}_2 = \mathbf{x}_v$, that is, $-\mathbf{n}_u\cdot\mathbf{x}_v = -\mathbf{x}_u\cdot\mathbf{n}_v$. Since $\mathbf{n}$ is orthogonal to the tangent vectors, $\mathbf{n}\cdot\mathbf{x}_u = 0$ and $\mathbf{n}\cdot\mathbf{x}_v = 0$ identically on $U$. Differentiating the first with respect to $v$ and the second with respect to $u$,

$$
\mathbf{n}_v\cdot\mathbf{x}_u + \mathbf{n}\cdot\mathbf{x}_{uv} = 0, \qquad \mathbf{n}_u\cdot\mathbf{x}_v + \mathbf{n}\cdot\mathbf{x}_{vu} = 0 .
$$

Since $\mathbf{x}_{uv} = \mathbf{x}_{vu}$ (the patch is $C^2$), $-\mathbf{n}_u\cdot\mathbf{x}_v = \mathbf{n}\cdot\mathbf{x}_{uv} = -\mathbf{n}_v\cdot\mathbf{x}_u$.
:::

A self-adjoint linear map is described by its quadratic form.

::: definition Second fundamental form {#def-second-ff}
The **second fundamental form** of $S$ at $p$ is the quadratic form $\mathrm{II}_p(\mathbf{w}) = W_p(\mathbf{w})\cdot\mathbf{w}$ on $T_pS$. In a patch its coefficients are

$$
L = W(\mathbf{x}_u)\cdot\mathbf{x}_u = \mathbf{n}\cdot\mathbf{x}_{uu}, \qquad M = W(\mathbf{x}_u)\cdot\mathbf{x}_v = \mathbf{n}\cdot\mathbf{x}_{uv}, \qquad N = W(\mathbf{x}_v)\cdot\mathbf{x}_v = \mathbf{n}\cdot\mathbf{x}_{vv},
$$ {#eq-LMN}

so that $\mathrm{II}(a\mathbf{x}_u + b\mathbf{x}_v) = La^2 + 2Mab + Nb^2$.
:::

The equalities in [[#eq-LMN]] come from differentiating $\mathbf{n}\cdot\mathbf{x}_u = 0$ and $\mathbf{n}\cdot\mathbf{x}_v = 0$, as in the proof above: for instance $\mathbf{n}_u\cdot\mathbf{x}_u + \mathbf{n}\cdot\mathbf{x}_{uu} = 0$ gives $L = -\mathbf{n}_u\cdot\mathbf{x}_u = \mathbf{n}\cdot\mathbf{x}_{uu}$. The formulas $L = \mathbf{n}\cdot\mathbf{x}_{uu}$ etc. are the practical ones: they need only second derivatives of $\mathbf{x}$ and the normal, not derivatives of the normal. Writing $\mathrm{I}$ for the first fundamental form, the classical notation is

$$
\mathrm{I} = E\,du^2 + 2F\,du\,dv + G\,dv^2, \qquad \mathrm{II} = L\,du^2 + 2M\,du\,dv + N\,dv^2 .
$$

The first form measures lengths on the surface; the second measures how the surface bends away from its tangent plane, in a sense made precise by the following observation.

::: proposition The second form is the Hessian of the height {#prop-height}
Let $p = \mathbf{x}(u_0, v_0)$ and let $h(u,v) = \bigl(\mathbf{x}(u,v) - \mathbf{x}(u_0,v_0)\bigr)\cdot\mathbf{n}(p)$ be the height of the surface above its tangent plane at $p$. Then $h$ has a critical point at $(u_0,v_0)$, and its Hessian there is $\begin{pmatrix}L & M\\ M & N\end{pmatrix}$:

$$
h(u_0 + s, v_0 + t) = \tfrac12\bigl(Ls^2 + 2Mst + Nt^2\bigr) + o(s^2 + t^2).
$$
:::

::: proof
$h_u = \mathbf{x}_u\cdot\mathbf{n}(p)$ and $h_v = \mathbf{x}_v\cdot\mathbf{n}(p)$ vanish at $(u_0,v_0)$ because the tangent vectors there are orthogonal to $\mathbf{n}(p)$. The second derivatives are $h_{uu} = \mathbf{x}_{uu}\cdot\mathbf{n}(p)$, $h_{uv} = \mathbf{x}_{uv}\cdot\mathbf{n}(p)$, $h_{vv} = \mathbf{x}_{vv}\cdot\mathbf{n}(p)$, which at $(u_0,v_0)$ are $L$, $M$, $N$ by [[#eq-LMN]]. The expansion is the second-order Taylor formula ([[multivariable/extrema#thm-taylor2]]).
:::

This connects surface curvature with the classification of critical points: if $\mathrm{II}_p$ is definite, the surface stays on one side of its tangent plane near $p$; if it is indefinite, the surface crosses the tangent plane in a saddle ([[multivariable/extrema#thm-second-derivative-test]]).

### The matrix of the shape operator

To compute eigenvalues we need the matrix of $W$ in the basis $\mathbf{x}_u, \mathbf{x}_v$ of $T_pS$, which is usually not orthonormal. Write $W(\mathbf{x}_u) = a_{11}\mathbf{x}_u + a_{21}\mathbf{x}_v$ and $W(\mathbf{x}_v) = a_{12}\mathbf{x}_u + a_{22}\mathbf{x}_v$. Dotting with $\mathbf{x}_u$ and $\mathbf{x}_v$:

$$
\begin{pmatrix} L & M\\ M & N\end{pmatrix} = \begin{pmatrix} E & F\\ F & G\end{pmatrix}\begin{pmatrix} a_{11} & a_{12}\\ a_{21} & a_{22}\end{pmatrix}, \qquad\text{so}\qquad A = \begin{pmatrix} E & F\\ F & G\end{pmatrix}^{-1}\begin{pmatrix} L & M\\ M & N\end{pmatrix}.
$$ {#eq-weingarten}

The matrix $A$ need not be symmetric unless the basis is orthonormal; but $W$ is self-adjoint, so it still has real eigenvalues and orthogonal eigenvectors.

## Normal curvature and Meusnier's theorem

Now we connect the shape operator with curves on the surface. Let $\boldsymbol\alpha(s)$ be a curve on $S$ parametrised by arc length, with unit tangent $\mathbf{T} = \boldsymbol\alpha'$ and curvature vector $\boldsymbol\alpha'' = \kappa\mathbf{N}$ ([[differential-geometry/curves#thm-frenet]]). Split the curvature vector into its component along the surface normal and its component in the tangent plane. The first is the **normal curvature** of the curve,

$$
\kappa_n = \boldsymbol\alpha''\cdot\mathbf{n} = \kappa\,\cos\theta,
$$

where $\theta$ is the angle between the principal normal $\mathbf{N}$ of the curve and the normal $\mathbf{n}$ of the surface. (The tangential component is the geodesic curvature, the subject of [[differential-geometry/geodesics-gauss-bonnet]].) The normal curvature is the part of the curve's bending that is forced on it by the surface.

::: theorem Meusnier's theorem {#thm-meusnier}
The normal curvature of a curve on $S$ through $p$ depends only on its unit tangent $\mathbf{T}$ at $p$:

$$
\kappa_n = \mathrm{II}_p(\mathbf{T}).
$$

Consequently all curves on $S$ through $p$ with the same tangent line have the same normal curvature, and their curvatures satisfy $\kappa\cos\theta = \mathrm{II}_p(\mathbf{T})$.
:::

::: proof
Along the curve, $\mathbf{T}(s)\cdot\mathbf{n}(\boldsymbol\alpha(s)) = 0$ for all $s$, because $\mathbf{T}$ is tangent to $S$. Differentiating,

$$
\boldsymbol\alpha''\cdot\mathbf{n} + \mathbf{T}\cdot\frac{d}{ds}\mathbf{n}(\boldsymbol\alpha(s)) = 0, \qquad\text{that is}\qquad \kappa_n = -\mathbf{T}\cdot d\mathbf{n}(\mathbf{T}) = W(\mathbf{T})\cdot\mathbf{T} = \mathrm{II}(\mathbf{T}).
$$
:::

For a tangent vector $\mathbf{w} = a\mathbf{x}_u + b\mathbf{x}_v$ that is not a unit vector we simply normalise: the normal curvature in the direction of $\mathbf{w}$ is

$$
\kappa_n(\mathbf{w}) = \frac{\mathrm{II}(\mathbf{w})}{\mathrm{I}(\mathbf{w})} = \frac{La^2 + 2Mab + Nb^2}{Ea^2 + 2Fab + Gb^2}.
$$ {#eq-normal-curvature}

A convenient curve with a given tangent is the **normal section**: the intersection of $S$ with the plane through $p$ spanned by $\mathbf{w}$ and $\mathbf{n}(p)$. Its principal normal is $\pm\mathbf{n}$, so $\cos\theta = \pm1$ and its curvature is $\abs{\kappa_n(\mathbf{w})}$. Meusnier's theorem says that tilting the cutting plane away from the normal, while keeping the tangent line fixed, increases the curvature of the section as $1/\cos\theta$. On a sphere of radius $R$, for example, the normal sections are great circles (curvature $1/R$) while a plane tilted at angle $\theta$ cuts a small circle of radius $R\cos\theta$, of curvature $1/(R\cos\theta)$.

::: example Normal curvatures of a cylinder {#ex-cylinder}
Find the normal curvature of the cylinder $\mathbf{x}(v, u) = (R\cos v, R\sin v, u)$ in every tangent direction, using the inward normal.
::: solution
$\mathbf{x}_v = (-R\sin v, R\cos v, 0)$ and $\mathbf{x}_u = (0, 0, 1)$, so $E = R^2$ (for $v$), $F = 0$, $G = 1$ (for $u$). The inward normal is $\mathbf{n} = (-\cos v, -\sin v, 0)$. The second derivatives are $\mathbf{x}_{vv} = (-R\cos v, -R\sin v, 0)$ and $\mathbf{x}_{vu} = \mathbf{x}_{uu} = \mathbf{0}$, so by [[#eq-LMN]] the coefficients are $R$ (for $vv$), $0$ and $0$. By [[#eq-normal-curvature]], for $\mathbf{w} = a\mathbf{x}_v + b\mathbf{x}_u$,

$$
\kappa_n(\mathbf{w}) = \frac{Ra^2}{R^2a^2 + b^2}.
$$

Along the circles ($b = 0$) this is $1/R$; along the rulings ($a = 0$) it is $0$; in between, writing the unit vector as $\cos\theta\,\mathbf{x}_v/R + \sin\theta\,\mathbf{x}_u$ (so $a = \cos\theta/R$, $b = \sin\theta$), it is $\cos^2\theta/R$. The extreme values $1/R$ and $0$ occur in perpendicular directions — a first instance of Euler's theorem below.
:::
:::

## Principal curvatures and Euler's formula

Since $W_p$ is self-adjoint on the two-dimensional inner product space $T_pS$, the spectral theorem gives an orthonormal basis $\mathbf{e}_1, \mathbf{e}_2$ of $T_pS$ consisting of eigenvectors, with real eigenvalues.

::: definition Principal curvatures {#def-principal-curvatures}
The eigenvalues $\kappa_1\ge\kappa_2$ of the shape operator $W_p$ are the **principal curvatures** of $S$ at $p$, and corresponding orthonormal eigenvectors $\mathbf{e}_1, \mathbf{e}_2$ are **principal directions**. A point where $\kappa_1 = \kappa_2$ is an **umbilic**; there every direction is principal.
:::

::: theorem Euler's formula {#thm-euler}
Let $\mathbf{e}_1, \mathbf{e}_2$ be principal directions at $p$ with principal curvatures $\kappa_1\ge\kappa_2$. If $\mathbf{w} = \cos\theta\,\mathbf{e}_1 + \sin\theta\,\mathbf{e}_2$, then

$$
\kappa_n(\mathbf{w}) = \kappa_1\cos^2\theta + \kappa_2\sin^2\theta .
$$

In particular $\kappa_1$ and $\kappa_2$ are the largest and smallest normal curvatures at $p$.
:::

::: proof
$W(\mathbf{w}) = \kappa_1\cos\theta\,\mathbf{e}_1 + \kappa_2\sin\theta\,\mathbf{e}_2$, so by Meusnier's theorem and orthonormality,

$$
\kappa_n(\mathbf{w}) = W(\mathbf{w})\cdot\mathbf{w} = \kappa_1\cos^2\theta + \kappa_2\sin^2\theta .
$$

This is a weighted average of $\kappa_1$ and $\kappa_2$ with weights $\cos^2\theta + \sin^2\theta = 1$, so it lies between them, with the extremes at $\theta = 0$ and $\theta = \pi/2$.
:::

So the bending of a surface in all directions is controlled by two numbers in two perpendicular directions — Euler's discovery of 1760. The directions in which $\kappa_n = 0$ are the **asymptotic directions**; by Euler's formula they exist exactly when $\kappa_1\kappa_2\le0$, and then $\tan^2\theta = -\kappa_1/\kappa_2$ (if $\kappa_2 = 0$, the asymptotic direction is $\theta = \pi/2$, the second principal direction).

::: quiz
What are the principal curvatures of a circular cylinder of radius $R$ (with the inward normal), and what is their product?
- [ ] $1/R$ and $1/R$; product $1/R^2$
- [x] $1/R$ and $0$; product $0$
- [ ] $R$ and $0$; product $0$
- [ ] $1/R$ and $-1/R$; product $-1/R^2$
::: solution
By [[#ex-cylinder]] the normal curvature ranges between $1/R$ (around the cylinder) and $0$ (along a ruling), so these are the principal curvatures, and their product — the Gaussian curvature — is $0$. The cylinder is curved, but only in one direction.
:::
:::

## Gaussian and mean curvature

::: definition Gaussian and mean curvature {#def-gaussian-mean}
The **Gaussian curvature** and the **mean curvature** of $S$ at $p$ are

$$
K = \det W_p = \kappa_1\kappa_2, \qquad H = \tfrac12\tr W_p = \frac{\kappa_1 + \kappa_2}{2}.
$$
:::

Since determinant and trace do not depend on the basis, we may compute them from the matrix [[#eq-weingarten]]. Using $\det(A) = \det\mathrm{II}/\det\mathrm{I}$ and inverting the $2\times2$ matrix of $\mathrm{I}$:

$$
K = \frac{LN - M^2}{EG - F^2}, \qquad H = \frac{EN - 2FM + GL}{2\,(EG - F^2)} .
$$ {#eq-K-H}

(For $H$: $\begin{pmatrix}E&F\\F&G\end{pmatrix}^{-1} = \frac{1}{EG - F^2}\begin{pmatrix}G & -F\\ -F & E\end{pmatrix}$, and the diagonal entries of its product with $\begin{pmatrix}L&M\\M&N\end{pmatrix}$ are $\frac{GL - FM}{EG - F^2}$ and $\frac{EN - FM}{EG - F^2}$.) The principal curvatures are the roots of $\lambda^2 - 2H\lambda + K = 0$, namely $\kappa_{1,2} = H\pm\sqrt{H^2 - K}$.

Reversing the orientation replaces $\mathbf{n}$ by $-\mathbf{n}$ and so $L, M, N$ by $-L, -M, -N$. Hence **$H$ changes sign but $K$ does not**: the Gaussian curvature is a property of the surface alone, while the sign of the mean curvature records which side the normal is on. The sign of $K$ classifies points:

| type | condition | principal curvatures | shape near $p$ |
|---|---|---|---|
| elliptic | $K > 0$ | same sign | cap: on one side of the tangent plane |
| hyperbolic | $K < 0$ | opposite signs | saddle: crosses the tangent plane |
| parabolic | $K = 0$, $W_p\ne0$ | one is zero | like a cylinder |
| planar | $W_p = 0$ | both zero | flat to second order |

The first two rows follow from [[#prop-height]], since $LN - M^2$ has the sign of $K$ and decides whether the height function's Hessian is definite or indefinite.

For a surface given as a graph $z = f(x,y)$, the patch $\mathbf{x}(x,y) = (x, y, f(x,y))$ has $E = 1 + f_x^2$, $F = f_xf_y$, $G = 1 + f_y^2$, upward normal $(-f_x, -f_y, 1)/\sqrt{1 + f_x^2 + f_y^2}$ and $L = f_{xx}/\sqrt{1 + f_x^2 + f_y^2}$, $M = f_{xy}/\sqrt{\cdots}$, $N = f_{yy}/\sqrt{\cdots}$. Substituting into [[#eq-K-H]] gives the useful formulas

$$
K = \frac{f_{xx}f_{yy} - f_{xy}^2}{\left(1 + f_x^2 + f_y^2\right)^2}, \qquad H = \frac{(1 + f_y^2)f_{xx} - 2f_xf_yf_{xy} + (1 + f_x^2)f_{yy}}{2\left(1 + f_x^2 + f_y^2\right)^{3/2}} .
$$ {#eq-K-graph}

At a point where the tangent plane is horizontal ($f_x = f_y = 0$) the Gaussian curvature is simply the determinant of the Hessian of $f$, and the principal curvatures are its eigenvalues.

::: example The sphere {#ex-sphere}
Compute $K$ and $H$ for the sphere of radius $R$ using the patch $\mathbf{x}(\theta,\varphi) = (R\cos\theta\cos\varphi,\ R\cos\theta\sin\varphi,\ R\sin\theta)$, $-\tfrac\pi2 < \theta < \tfrac\pi2$.
::: solution
$\mathbf{x}_\theta = (-R\sin\theta\cos\varphi,\ -R\sin\theta\sin\varphi,\ R\cos\theta)$ and $\mathbf{x}_\varphi = (-R\cos\theta\sin\varphi,\ R\cos\theta\cos\varphi,\ 0)$, so $E = R^2$, $F = 0$, $G = R^2\cos^2\theta$. A short computation gives $\mathbf{x}_\theta\times\mathbf{x}_\varphi = -R\cos\theta\,\mathbf{x}$, so the normal of this patch is the **inward** one, $\mathbf{n} = -\mathbf{x}/R$. Then

$$
L = \mathbf{n}\cdot\mathbf{x}_{\theta\theta} = -\frac{\mathbf{x}}{R}\cdot(-\mathbf{x}) = R, \qquad M = \mathbf{n}\cdot\mathbf{x}_{\theta\varphi} = 0, \qquad N = \mathbf{n}\cdot\mathbf{x}_{\varphi\varphi} = R\cos^2\theta,
$$

using $\mathbf{x}_{\theta\theta} = -\mathbf{x}$, $\mathbf{x}_{\varphi\varphi} = -(R\cos\theta\cos\varphi, R\cos\theta\sin\varphi, 0)$ and the fact that $\mathbf{x}_{\theta\varphi}$ is horizontal and orthogonal to $\mathbf{x}$. By [[#eq-K-H]],

$$
K = \frac{R\cdot R\cos^2\theta}{R^4\cos^2\theta} = \frac{1}{R^2}, \qquad H = \frac{R^2\cdot R\cos^2\theta + R^2\cos^2\theta\cdot R}{2R^4\cos^2\theta} = \frac1R .
$$

Indeed $\mathbf{n} = -\mathbf{x}/R$ gives $d\mathbf{n} = -\tfrac1R\,\mathrm{id}$, so $W = \tfrac1R\,\mathrm{id}$: every point is an umbilic with $\kappa_1 = \kappa_2 = 1/R$. With the outward normal, $\kappa_1 = \kappa_2 = -1/R$, $H = -1/R$ and still $K = 1/R^2$.
:::
:::

::: example The torus {#ex-torus}
Find the Gaussian curvature of the torus $\mathbf{x}(u,v) = \bigl((a + b\cos u)\cos v,\ (a + b\cos u)\sin v,\ b\sin u\bigr)$, $a > b > 0$, and describe where it is positive, negative and zero.
::: solution
$\mathbf{x}_u = (-b\sin u\cos v,\ -b\sin u\sin v,\ b\cos u)$ and $\mathbf{x}_v = (-(a + b\cos u)\sin v,\ (a + b\cos u)\cos v,\ 0)$, so $E = b^2$, $F = 0$, $G = (a + b\cos u)^2$. The normal is $\mathbf{n} = -(\cos u\cos v,\ \cos u\sin v,\ \sin u)$, pointing towards the central circle of the tube. The second derivatives give

$$
L = \mathbf{n}\cdot\mathbf{x}_{uu} = b, \qquad M = 0, \qquad N = \mathbf{n}\cdot\mathbf{x}_{vv} = (a + b\cos u)\cos u .
$$

Therefore

$$
K = \frac{b\,(a + b\cos u)\cos u}{b^2(a + b\cos u)^2} = \frac{\cos u}{b\,(a + b\cos u)} .
$$

$K > 0$ on the outer half of the torus ($\cos u > 0$), like a sphere; $K < 0$ on the inner half ($\cos u < 0$), like a saddle; and $K = 0$ on the top and bottom circles $u = \pm\pi/2$, which are parabolic. At the outermost circle $K = \frac{1}{b(a + b)}$ and at the innermost $K = -\frac{1}{b(a - b)}$.
:::
:::

::: widget surface
fx: (2 + cos(u))*cos(v)
fy: (2 + cos(u))*sin(v)
fz: sin(u)
u: 0, 2pi
v: 0, 2pi
color: gauss
caption: The torus with $a = 2$, $b = 1$, coloured by Gaussian curvature. The outer half has $K > 0$ (elliptic points, curved like a sphere), the inner half $K < 0$ (hyperbolic, saddle-shaped), and the top and bottom circles $K = 0$. Rotate it and compare the colour scale with $K = \cos u/(2 + \cos u)$: from $\tfrac13$ on the outside to $-1$ on the inside. The positive and negative parts exactly cancel — a fact explained by the Gauss–Bonnet theorem.
:::

::: example A saddle {#ex-saddle}
Find $K$ and $H$ for the surface $z = xy$, and the principal curvatures at the origin.
::: solution
With $f = xy$: $f_x = y$, $f_y = x$, $f_{xx} = f_{yy} = 0$, $f_{xy} = 1$. By [[#eq-K-graph]],

$$
K = \frac{0 - 1}{(1 + x^2 + y^2)^2} = -\frac{1}{(1 + x^2 + y^2)^2}, \qquad H = \frac{-2xy}{2(1 + x^2 + y^2)^{3/2}} = -\frac{xy}{(1 + x^2 + y^2)^{3/2}} .
$$

At the origin $K = -1$ and $H = 0$, so $\kappa_{1,2} = H\pm\sqrt{H^2 - K} = \pm1$. The principal directions are the eigenvectors $(1,\pm1)/\sqrt2$ of the Hessian $\begin{pmatrix}0&1\\1&0\end{pmatrix}$: along $y = x$ the surface curves up ($z = x^2$) and along $y = -x$ it curves down. The asymptotic directions, where $\kappa_n = 0$, are the coordinate axes, which lie entirely in the surface.
:::
:::

::: widget surface
f: x^2 + a*y^2
x: -1.5, 1.5
y: -1.5, 1.5
sliders: a=1:-1:1:0.05
color: gauss
caption: The surfaces $z = x^2 + ay^2$, coloured by Gaussian curvature; at the origin $K = 4a$. For $a > 0$ the origin is elliptic (a bowl), for $a < 0$ hyperbolic (a saddle), and for $a = 0$ parabolic (a trough, like a cylinder). Away from the origin $K$ decays like $(1 + 4x^2 + 4a^2y^2)^{-2}$, as the surface flattens out.
:::

::: warning Signs of H and of the principal curvatures depend on the normal
The Gaussian curvature of a sphere is $1/R^2$ whatever normal you choose, but its mean curvature is $+1/R$ for the inward normal and $-1/R$ for the outward one, and many books (and the formulas above) silently use whichever normal the patch produces. When comparing results, or when a problem says "the mean curvature is positive", first check which way $\mathbf{n} = \mathbf{x}_u\times\mathbf{x}_v/\norm{\mathbf{x}_u\times\mathbf{x}_v}$ points. Another frequent slip is to use the graph formula [[#eq-K-graph]] without the denominator $(1 + f_x^2 + f_y^2)^2$, which is only harmless where the tangent plane is horizontal.
:::

::: quiz
At a point $p$ of a surface the Gaussian curvature is negative. Which statement is true?
- [ ] The surface lies on one side of its tangent plane near $p$.
- [x] Every neighbourhood of $p$ on the surface contains points on both sides of the tangent plane at $p$.
- [ ] The mean curvature at $p$ must be zero.
- [ ] The sign of $K$ depends on the choice of unit normal.
::: solution
$K < 0$ means $LN - M^2 < 0$, so by [[#prop-height]] the height above the tangent plane has an indefinite Hessian: the point is a saddle point of the height function, and the surface crosses its tangent plane. $H$ need not vanish (on the inner side of a torus $K < 0$ but $H\ne0$), and $K$ is independent of the orientation.
:::
:::

## Gaussian curvature as an area ratio

Gauss's own definition of curvature compared areas on the surface with areas of its image under the Gauss map. In a patch, the Gauss image of a small region $R$ around $p$ is parametrised by $\mathbf{n}(u,v)$, and its area involves $\norm{\mathbf{n}_u\times\mathbf{n}_v}$.

::: proposition The Gauss map multiplies area by $K$ {#prop-gauss-area}
In any patch, $\mathbf{n}_u\times\mathbf{n}_v = K\,\mathbf{x}_u\times\mathbf{x}_v$. Consequently, if $R_\eps$ are regions shrinking to $p$, then

$$
\abs{K(p)} = \lim_{\eps\to0}\frac{\text{area of }\mathbf{n}(R_\eps)}{\text{area of }R_\eps} .
$$
:::

::: proof
With the matrix $A = (a_{ij})$ of [[#eq-weingarten]], $\mathbf{n}_u = -W(\mathbf{x}_u) = -(a_{11}\mathbf{x}_u + a_{21}\mathbf{x}_v)$ and $\mathbf{n}_v = -(a_{12}\mathbf{x}_u + a_{22}\mathbf{x}_v)$. Expanding the cross product as in [[multivariable/surface-integrals#thm-param-invariance]],

$$
\mathbf{n}_u\times\mathbf{n}_v = (a_{11}a_{22} - a_{21}a_{12})\,\mathbf{x}_u\times\mathbf{x}_v = (\det A)\,\mathbf{x}_u\times\mathbf{x}_v = K\,\mathbf{x}_u\times\mathbf{x}_v .
$$

So the area of $\mathbf{n}(R_\eps)$ is at most $\iint\abs{K}\,\norm{\mathbf{x}_u\times\mathbf{x}_v}\,du\,dv$, with equality when $\mathbf{n}$ is one-to-one on $R_\eps$ (true near a point with $K(p)\ne0$, by the inverse function theorem). Dividing by the area $\iint\norm{\mathbf{x}_u\times\mathbf{x}_v}\,du\,dv$ of $R_\eps$ and letting $\eps\to0$ gives $\abs{K(p)}$ by continuity (as in [[multivariable/multiple-integrals#thm-mvt-integral]]); when $K(p) = 0$ both sides are $0$.
:::

The sign of $K$ also has a meaning: $K > 0$ when the Gauss map preserves orientation (as on a sphere) and $K < 0$ when it reverses it (as on a saddle, where walking anticlockwise around $p$ makes the normal circle clockwise). Gaussian curvature is thus the "Jacobian" of the Gauss map, an idea that leads to the Gauss–Bonnet theorem.

## Minimal surfaces

A soap film stretched across a wire frame minimises its area, because surface tension pulls it tight. Which surfaces are critical points of area? If a surface is deformed by moving each point a small distance $t\,\phi\,\mathbf{n}$ along its normal, with $\phi$ vanishing on the boundary, the area changes at the rate

$$
\frac{d}{dt}\Big|_{t=0}\text{Area} = -2\iint_S H\,\phi\,dA
$$

(the **first variation formula**; see do Carmo, *Differential Geometry of Curves and Surfaces*, §3-5). This vanishes for every $\phi$ exactly when $H\equiv0$. So a **minimal surface** is defined to be a surface with zero mean curvature everywhere: the principal curvatures are equal and opposite, $\kappa_1 = -\kappa_2$, and every point is a saddle or planar point.

::: example The helicoid and the catenoid are minimal {#ex-minimal}
Show that the helicoid $\mathbf{x}(u,v) = (u\cos v,\ u\sin v,\ v)$ and the catenoid $\mathbf{y}(u,v) = (\cosh u\cos v,\ \cosh u\sin v,\ u)$ both have $H = 0$, and find their Gaussian curvatures.
::: solution
*Helicoid.* $\mathbf{x}_u = (\cos v, \sin v, 0)$, $\mathbf{x}_v = (-u\sin v, u\cos v, 1)$, so $E = 1$, $F = 0$, $G = 1 + u^2$, and $\mathbf{n} = (\sin v, -\cos v, u)/\sqrt{1 + u^2}$. Then $\mathbf{x}_{uu} = \mathbf{0}$, $\mathbf{x}_{uv} = (-\sin v, \cos v, 0)$, $\mathbf{x}_{vv} = (-u\cos v, -u\sin v, 0)$, giving $L = 0$, $M = -1/\sqrt{1 + u^2}$, $N = 0$. By [[#eq-K-H]], $H = \frac{1\cdot0 - 0 + (1 + u^2)\cdot0}{2(1 + u^2)} = 0$ and $K = -\frac{M^2}{EG} = -\frac{1}{(1 + u^2)^2}$.

*Catenoid.* $\mathbf{y}_u = (\sinh u\cos v, \sinh u\sin v, 1)$, $\mathbf{y}_v = (-\cosh u\sin v, \cosh u\cos v, 0)$, so $E = \sinh^2u + 1 = \cosh^2u$, $F = 0$, $G = \cosh^2u$, and $\mathbf{n} = (-\cos v, -\sin v, \sinh u)/\cosh u$. With $\mathbf{y}_{uu} = (\cosh u\cos v, \cosh u\sin v, 0)$, $\mathbf{y}_{uv} = (-\sinh u\sin v, \sinh u\cos v, 0)$, $\mathbf{y}_{vv} = (-\cosh u\cos v, -\cosh u\sin v, 0)$ we get $L = -1$, $M = 0$, $N = 1$. Hence $H = \frac{\cosh^2u\cdot1 + \cosh^2u\cdot(-1)}{2\cosh^4u} = 0$ and $K = \frac{-1}{\cosh^4u}$.

Both surfaces are minimal with negative curvature. Remarkably, the two have the same first fundamental form after a change of variables — they are locally isometric, a fact explored in [[differential-geometry/theorema-egregium]].
:::
:::

::: widget surface
fx: cosh(v)*cos(u)
fy: cosh(v)*sin(u)
fz: v
u: 0, 2pi
v: -1.2, 1.2
color: mean
caption: The catenoid, the surface swept out by rotating a hanging chain $x = \cosh z$ about the $z$-axis, coloured by mean curvature. The colour is uniform: $H = 0$ everywhere, since at each point the curvature around the waist exactly cancels the curvature along the profile. A soap film between two parallel rings takes this shape — as long as the rings are not too far apart.
:::

::: application Soap films and lightweight structures
Soap films are minimal surfaces, and their study (Plateau's problem: does every closed wire bound a minimal surface?) drove the theory for two centuries; it was solved in general by Jesse Douglas and Tibor Radó around 1930. Because minimal surfaces spread tension evenly, architects and engineers, notably Frei Otto, have used soap films as models when designing lightweight tensile roofs and membranes. In biology, the membranes of some cell structures and the shapes of certain block copolymers are close to triply periodic minimal surfaces such as Schwarz's P surface.
:::

::: history
Leonhard Euler began the study of the curvature of surfaces in his *Recherches sur la courbure des surfaces* (written in 1760, published in 1767), proving the formula $\kappa_n = \kappa_1\cos^2\theta + \kappa_2\sin^2\theta$ for the curvatures of normal sections. In 1776 Jean-Baptiste Meusnier, then a young military engineer, related the curvature of oblique sections to normal ones, and found that the catenoid and the helicoid satisfy Lagrange's equation for surfaces of least area. The decisive step came in Carl Friedrich Gauss's *Disquisitiones generales circa superficies curvas* (1827), which introduced the normal map to the sphere, defined the curvature of a surface as the ratio of areas in [[#prop-gauss-area]], and derived the formula in terms of the coefficients of the two fundamental forms. Meusnier also observed that Lagrange's equation says the two principal curvatures are equal and opposite — zero mean curvature, in modern terms — and the mean curvature later took centre stage in Sophie Germain's work on the vibrations of elastic plates, which won the Paris Academy's prize in 1816.
:::

## Where this leads

The formula $K = (LN - M^2)/(EG - F^2)$ involves the second fundamental form, which depends on how the surface sits in space. Gauss's great surprise, proved in [[differential-geometry/theorema-egregium]], is that $K$ can nevertheless be computed from $E$, $F$, $G$ and their derivatives alone, so that it is unchanged by bending the surface without stretching it. In [[differential-geometry/geodesics-gauss-bonnet]] the tangential part of the curvature of curves (the geodesic curvature) complements the normal curvature studied here, and the total Gaussian curvature $\iint_S K\,dA$ of a closed surface turns out to be $2\pi$ times a topological invariant. Mean curvature governs soap films, capillary surfaces and the motion of interfaces (mean curvature flow), and Gaussian curvature reappears, generalised, as the curvature of spacetime in general relativity.

::: summary
- The Gauss map $\mathbf{n}\colon S\to S^2$ sends each point to its unit normal; the shape operator $W_p = -d\mathbf{n}_p$ is a linear map of $T_pS$ ([[#def-gauss-map]], [[#def-shape-operator]]).
- $W_p$ is self-adjoint ([[#thm-self-adjoint]]); its quadratic form is the second fundamental form, $L = \mathbf{n}\cdot\mathbf{x}_{uu}$, $M = \mathbf{n}\cdot\mathbf{x}_{uv}$, $N = \mathbf{n}\cdot\mathbf{x}_{vv}$ ([[#def-second-ff]]), the Hessian of the height above the tangent plane.
- Normal curvature $\kappa_n = \boldsymbol\alpha''\cdot\mathbf{n} = \mathrm{II}(\mathbf{T})$ depends only on the tangent direction (Meusnier, [[#thm-meusnier]]); $\kappa_n(\mathbf{w}) = \mathrm{II}(\mathbf{w})/\mathrm{I}(\mathbf{w})$.
- Principal curvatures $\kappa_1\ge\kappa_2$ are the eigenvalues of $W_p$, in orthogonal principal directions, and $\kappa_n = \kappa_1\cos^2\theta + \kappa_2\sin^2\theta$ (Euler, [[#thm-euler]]).
- $K = \kappa_1\kappa_2 = \frac{LN - M^2}{EG - F^2}$ and $H = \frac{\kappa_1 + \kappa_2}{2} = \frac{EN - 2FM + GL}{2(EG - F^2)}$; $K$ is independent of the normal, $H$ changes sign with it.
- Sphere $K = 1/R^2$; cylinder $K = 0$; torus $K = \cos u/(b(a + b\cos u))$; graph $K = (f_{xx}f_{yy} - f_{xy}^2)/(1 + f_x^2 + f_y^2)^2$.
- $K > 0$: elliptic (cap); $K < 0$: hyperbolic (saddle); $\abs{K}$ is the area magnification of the Gauss map.
- Minimal surfaces ($H = 0$), such as the catenoid and helicoid, are critical points of area.
:::

## Exercises

::: exercise A small sphere {level=1 check="1/9"}
What is the Gaussian curvature of a sphere of radius $3$?
::: solution
$K = 1/R^2 = 1/9$ ([[#ex-sphere]]), whichever normal is used.
:::
:::

::: exercise A paraboloid at its vertex {level=1 check="4"}
Find the Gaussian curvature of $z = x^2 + y^2$ at the origin.
::: solution
At the origin $f_x = f_y = 0$ and $f_{xx} = f_{yy} = 2$, $f_{xy} = 0$, so by [[#eq-K-graph]] $K = (2\cdot2 - 0)/1 = 4$. The principal curvatures are both $2$: the origin is an umbilic.
:::
:::

::: exercise Mean curvature of a cylinder {level=1 check="1/4"}
Find the mean curvature of the cylinder $x^2 + y^2 = 4$ with its inward normal.
::: solution
The principal curvatures are $1/R = \tfrac12$ and $0$ ([[#ex-cylinder]]), so $H = \tfrac12\left(\tfrac12 + 0\right) = \tfrac14$.
:::
:::

::: exercise A point of the saddle {level=2 check="-1/9"}
Find the Gaussian curvature of the saddle $z = xy$ at the point $(1, 1, 1)$.
::: solution
By [[#ex-saddle]], $K = -\dfrac{1}{(1 + x^2 + y^2)^2} = -\dfrac{1}{(1 + 1 + 1)^2} = -\dfrac19$.
:::
:::

::: exercise The outermost circle of a torus {level=2 check="1/3"}
For the torus of [[#ex-torus]] with $a = 2$, $b = 1$, find the Gaussian curvature at the points of the outermost circle, and the principal curvatures there.
::: solution
At $u = 0$, $K = \dfrac{\cos0}{1\cdot(2 + 1)} = \dfrac13$. There $E = 1$, $G = 9$, $L = 1$, $N = 3$, $F = M = 0$, so the matrix of $W$ is $\operatorname{diag}(L/E, N/G) = \operatorname{diag}(1, \tfrac13)$: the principal curvatures are $1$ (around the tube, a circle of radius $b = 1$) and $\tfrac13$ (around the outer circle of radius $a + b = 3$).
:::
:::

::: exercise Asymptotic directions {level=2 check="2*atan(sqrt(2))"}
At a point with principal curvatures $\kappa_1 = 2$ and $\kappa_2 = -1$, the two asymptotic directions make angles $\pm\theta_0$ with the principal direction $\mathbf{e}_1$, where $0 < \theta_0 < \pi/2$. Find the angle $2\theta_0$ between them, in radians.
::: solution
By Euler's formula, $\kappa_n = 2\cos^2\theta - \sin^2\theta = 0$ when $\tan^2\theta = 2$, i.e. $\theta = \pm\theta_0$ with $\theta_0 = \arctan\sqrt2\approx54.7^\circ$. The two asymptotic directions are symmetric about $\mathbf{e}_1$ and the angle between them is $2\arctan\sqrt2\approx109.5^\circ$ — curiously, the tetrahedral angle.
:::
:::

::: exercise Curvature of surfaces of revolution {level=3}
Let $\mathbf{x}(u,v) = (f(u)\cos v,\ f(u)\sin v,\ g(u))$ with $f > 0$ and the profile curve parametrised by arc length, $f'^2 + g'^2 = 1$. Show that $E = 1$, $F = 0$, $G = f^2$, and that $K = -f''/f$. Use this to find all such surfaces with $K\equiv0$, and check the formula on the unit sphere ($f = \cos u$, $g = \sin u$).
::: hint
Differentiate $f'^2 + g'^2 = 1$ to get $f'f'' + g'g'' = 0$. The normal is $\mathbf{n} = (-g'\cos v, -g'\sin v, f')$.
:::
::: solution
$\mathbf{x}_u = (f'\cos v, f'\sin v, g')$ and $\mathbf{x}_v = (-f\sin v, f\cos v, 0)$, so $E = f'^2 + g'^2 = 1$, $F = 0$, $G = f^2$. Their cross product is $f\,(-g'\cos v, -g'\sin v, f')$, so $\mathbf{n} = (-g'\cos v, -g'\sin v, f')$ (a unit vector since $f'^2 + g'^2 = 1$). Then

$$
L = \mathbf{n}\cdot\mathbf{x}_{uu} = -g'f'' + f'g'', \qquad M = \mathbf{n}\cdot(-f'\sin v, f'\cos v, 0) = 0, \qquad N = \mathbf{n}\cdot(-f\cos v, -f\sin v, 0) = fg' .
$$

So $K = \dfrac{LN}{EG} = \dfrac{(f'g'' - g'f'')\,g'}{f}$. Using $f'f'' = -g'g''$: $(f'g'' - g'f'')g' = f'g'g'' - g'^2f'' = -f'^2f'' - g'^2f'' = -f''$, hence $K = -f''/f$. Then $K\equiv0$ iff $f'' = 0$, i.e. $f(u) = cu + d$ with $\abs{c}\le1$: cylinders ($c = 0$), cones ($0 < \abs{c} < 1$) and planes perpendicular to the axis ($\abs{c} = 1$, $g$ constant). For the sphere, $f = \cos u$ gives $K = \cos u/\cos u = 1$.
:::
:::

::: exercise Totally umbilic surfaces {level=3}
Suppose every point of a connected patch $\mathbf{x}\colon U\to\R^3$ ($U$ open and connected) is an umbilic. Prove that its image lies in a plane or a sphere.
::: hint
At an umbilic $W = k\,\mathrm{id}$, so $\mathbf{n}_u = -k\mathbf{x}_u$ and $\mathbf{n}_v = -k\mathbf{x}_v$ with $k = k(u,v)$. Compare $\mathbf{n}_{uv}$ and $\mathbf{n}_{vu}$ to show that $k$ is constant.
:::
::: solution
At each point $W = k\,\mathrm{id}$ for a number $k(u,v)$, so $\mathbf{n}_u = -k\mathbf{x}_u$ and $\mathbf{n}_v = -k\mathbf{x}_v$; $k = -\mathbf{n}_u\cdot\mathbf{x}_u/E$ is continuously differentiable. Differentiating, $\mathbf{n}_{uv} = -k_v\mathbf{x}_u - k\mathbf{x}_{uv}$ and $\mathbf{n}_{vu} = -k_u\mathbf{x}_v - k\mathbf{x}_{vu}$. These are equal, so $k_v\mathbf{x}_u - k_u\mathbf{x}_v = \mathbf{0}$, and since $\mathbf{x}_u, \mathbf{x}_v$ are linearly independent, $k_u = k_v = 0$. As $U$ is connected, $k$ is constant ([[multivariable/gradient#cor-constant]] and its extension to connected sets). If $k = 0$, then $\mathbf{n}$ is constant, so $(\mathbf{x}\cdot\mathbf{n})_u = \mathbf{x}_u\cdot\mathbf{n} = 0$ and likewise for $v$: $\mathbf{x}\cdot\mathbf{n}$ is constant and the image lies in a plane with normal $\mathbf{n}$. If $k\ne0$, then $(\mathbf{x} + \mathbf{n}/k)_u = \mathbf{x}_u - \mathbf{x}_u = \mathbf{0}$ and likewise for $v$, so $\mathbf{x} + \mathbf{n}/k = \mathbf{c}$ is constant, and $\norm{\mathbf{x} - \mathbf{c}} = \norm{\mathbf{n}}/\abs{k} = 1/\abs{k}$: the image lies on the sphere of radius $1/\abs{k}$ centred at $\mathbf{c}$.
:::
:::

::: exercise Every closed surface has an elliptic point {level=3}
Let $S$ be a compact regular surface in $\R^3$. Prove that $S$ has a point where $K > 0$. Deduce that there is no compact regular surface in $\R^3$ with $K\le0$ everywhere (in particular, no "flat torus" in $\R^3$).
::: hint
Consider a point $p$ of $S$ farthest from the origin, and compare normal curvatures with those of the sphere through $p$ centred at the origin.
:::
::: solution
The continuous function $\norm{\mathbf{x}}^2$ attains a maximum on the compact set $S$ at some point $p$, with $R = \norm{p} > 0$. For any unit-speed curve $\boldsymbol\alpha$ on $S$ with $\boldsymbol\alpha(0) = p$, the function $\phi(s) = \boldsymbol\alpha(s)\cdot\boldsymbol\alpha(s)$ has a maximum at $s = 0$, so $\phi'(0) = 2\,\boldsymbol\alpha'(0)\cdot p = 0$ and $\phi''(0) = 2\bigl(1 + \boldsymbol\alpha''(0)\cdot p\bigr)\le0$. The first condition, for all curves, says $p$ is orthogonal to $T_pS$, so $\mathbf{n}(p) = \pm p/R$; choose the inward normal $\mathbf{n} = -p/R$. Then $\boldsymbol\alpha''(0)\cdot p = -R\,\kappa_n$, and the second condition gives $1 - R\kappa_n\le0$, that is $\kappa_n(\mathbf{T})\ge1/R$ for every unit tangent $\mathbf{T}$ at $p$. Hence both principal curvatures are at least $1/R$, and $K(p) = \kappa_1\kappa_2\ge1/R^2 > 0$. So a compact surface cannot have $K\le0$ everywhere; the flat torus of topology can be realised in $\R^4$ but not as a regular surface in $\R^3$.
:::
:::
