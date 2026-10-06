In [[complex-analysis/analytic-functions]] we saw that an analytic function with non-zero derivative acts, on a very small scale, like multiplication by the complex number $f'(z_0)$: a rotation combined with a scaling. Rotations and scalings preserve angles. So an analytic map, however much it distorts large shapes, preserves the angle between any two curves crossing at a point where $f'\neq0$ — the grid pictures of $z^2$ and $e^z$ in earlier chapters were full of right angles mapped to right angles. Maps with this property are called **conformal**.

Conformal maps are the geometric face of complex analysis, and they are enormously useful. Laplace's equation is unchanged by conformal maps, so a problem in electrostatics, heat flow or fluid mechanics on a complicated region can be transported to a simple region — a disc or a half-plane — solved there, and transported back. The **Riemann mapping theorem** guarantees that this is always possible in principle: every simply connected domain other than $\C$ itself can be mapped conformally onto the unit disc. In this chapter we prove that analytic maps are conformal, study the most important family of conformal maps — the **Möbius transformations** — determine all conformal self-maps of the disc with the help of the **Schwarz lemma**, build maps between standard regions, and use them to solve boundary-value problems.

## Conformality

Let $\gamma_1$ and $\gamma_2$ be smooth curves through a point $z_0$, say $\gamma_1(0) = \gamma_2(0) = z_0$, with non-zero tangent vectors $\gamma_1'(0)$ and $\gamma_2'(0)$. The **angle** from $\gamma_1$ to $\gamma_2$ at $z_0$ is the angle from $\gamma_1'(0)$ to $\gamma_2'(0)$, that is, $\arg\gamma_2'(0) - \arg\gamma_1'(0)$ (modulo $2\pi$).

::: definition Conformal map {#def-conformal}
A map $f$ defined near $z_0$ is **conformal at $z_0$** if, for every pair of smooth curves through $z_0$ with non-zero tangents, the image curves $f\circ\gamma_1$ and $f\circ\gamma_2$ have non-zero tangents at $f(z_0)$ and the angle between them, in size and in sense, equals the angle between $\gamma_1$ and $\gamma_2$. A **conformal map** of a domain $D$ onto a domain $D'$ is a bijective analytic map $f\colon D\to D'$.
:::

::: theorem Analytic maps preserve angles {#thm-conformal}
If $f$ is analytic at $z_0$ and $f'(z_0)\neq0$, then $f$ is conformal at $z_0$. Every tangent vector at $z_0$ is rotated by $\Arg f'(z_0)$ and scaled by $\abs{f'(z_0)}$.
:::

::: proof
By [[complex-analysis/analytic-functions#lem-curve]], the image curve $f\circ\gamma_k$ has tangent vector

$$
(f\circ\gamma_k)'(0) = f'(z_0)\,\gamma_k'(0),
$$

which is non-zero because both factors are. Multiplication by the fixed number $f'(z_0) = \rho e^{i\varphi}$ multiplies lengths by $\rho$ and adds $\varphi$ to arguments. Hence $\arg(f\circ\gamma_2)'(0) - \arg(f\circ\gamma_1)'(0) = \big(\arg\gamma_2'(0) + \varphi\big) - \big(\arg\gamma_1'(0) + \varphi\big) = \arg\gamma_2'(0) - \arg\gamma_1'(0)$.
:::

Where $f'(z_0) = 0$, angles are not preserved. If $f(z) - f(z_0)$ has a zero of order $k\ge2$ at $z_0$, then $f(z)\approx f(z_0) + c(z - z_0)^k$ near $z_0$, and **angles at $z_0$ are multiplied by $k$**. The map $z\mapsto z^2$ doubles the right angle between the positive real and imaginary axes into the straight angle between the positive and negative real axes. Conversely (a remark we do not prove), a continuously differentiable map of a planar domain that preserves angles in size and sense and has non-zero Jacobian everywhere is analytic: conformality and analyticity with $f'\neq0$ are the same thing.

::: quiz
At which points is $f(z) = z^3 - 3z$ **not** conformal?
- [ ] Nowhere: polynomials are conformal everywhere
- [ ] At $z = 0$ only
- [x] At $z = \pm1$
- [ ] At the zeros of $f$, namely $0$ and $\pm\sqrt3$
::: solution
By [[#thm-conformal]] $f$ is conformal wherever $f'(z) = 3z^2 - 3\neq0$; it fails exactly at the critical points $z = \pm1$. There $f(z) - f(\pm1)$ has a zero of order $2$, so angles are doubled. The zeros of $f$ itself are irrelevant: at $z = 0$, $f'(0) = -3\neq0$.
:::
:::

A conformal map of domains is a *bijective* analytic map. Two facts make this definition natural: such a map automatically has $f'\neq0$ everywhere (if $f'(z_0) = 0$, the argument principle shows that $f$ takes nearby values at least twice near $z_0$, so $f$ is not injective), and its inverse is automatically analytic, by the following theorem.

::: theorem Inverse function theorem {#thm-inverse}
Let $f$ be analytic on an open set containing $z_0$, with $f'(z_0)\neq0$. Then there are open sets $U\ni z_0$ and $V\ni f(z_0)$ such that $f$ maps $U$ bijectively onto $V$, and the inverse $g\colon V\to U$ is analytic with $g'(w) = \dfrac{1}{f'(g(w))}$.
:::

::: proof
Regard $f = u + iv$ as a map of $\R^2$. It is continuously differentiable (analytic functions have continuous derivatives, [[complex-analysis/cauchy-theorem#thm-derivatives]]), and its Jacobian matrix at $z_0$ is $\begin{pmatrix} a & -b\\ b & a\end{pmatrix}$ with $a + bi = f'(z_0)$, whose determinant $a^2 + b^2 = \abs{f'(z_0)}^2$ is non-zero. By the inverse function theorem for maps of $\R^2$, a standard result of multivariable analysis, there are open sets $U$, $V$ such that $f\colon U\to V$ is a bijection with a continuously differentiable inverse $g$, and $Dg(w) = Df(g(w))^{-1}$; shrinking $U$, we may assume $f'\neq0$ on $U$. The inverse of a non-zero matrix of the form $\begin{pmatrix} a & -b\\ b & a\end{pmatrix}$ is $\frac{1}{a^2 + b^2}\begin{pmatrix} a & b\\ -b & a\end{pmatrix}$, again of this form — it is the matrix of multiplication by $1/(a + bi)$. So the Jacobian of $g$ satisfies the Cauchy–Riemann equations at every point, $g$ is analytic by [[complex-analysis/analytic-functions#thm-cr-sufficient]], and $g'(w) = 1/f'(g(w))$.
:::

## Möbius transformations

The simplest conformal maps after the linear maps $z\mapsto az + b$ are the quotients of linear functions.

::: definition Möbius transformation {#def-mobius}
A **Möbius transformation** (or linear fractional transformation) is a map

$$
T(z) = \frac{az + b}{cz + d}, \qquad a, b, c, d\in\C,\quad ad - bc\neq0,
$$

regarded as a map of the extended plane $\C_\infty$: if $c\neq0$ we set $T(-d/c) = \infty$ and $T(\infty) = a/c$; if $c = 0$ we set $T(\infty) = \infty$.
:::

The condition $ad - bc\neq0$ excludes constant maps. Since

$$
T'(z) = \frac{a(cz + d) - c(az + b)}{(cz + d)^2} = \frac{ad - bc}{(cz + d)^2}\neq0,
$$

$T$ is conformal at every point of $\C$ except the pole $-d/c$ (and, interpreting angles at $\infty$ via $w = 1/z$, it is conformal there too). Solving $w = \frac{az + b}{cz + d}$ for $z$ gives the inverse $T^{-1}(w) = \frac{dw - b}{-cw + a}$, again a Möbius transformation, so every Möbius transformation is a bijection of $\C_\infty$ onto itself. A direct computation shows that composing Möbius transformations corresponds to multiplying their coefficient matrices $\begin{pmatrix} a & b\\ c & d\end{pmatrix}$: the Möbius transformations form a **group** under composition ([[abstract-algebra/groups]]), and two matrices give the same map exactly when one is a non-zero multiple of the other.

Every Möbius transformation is a composition of three simple kinds of map: **translations** $z\mapsto z + b$, **rotation-dilations** $z\mapsto az$, and the **inversion** $z\mapsto1/z$. Indeed, if $c = 0$ then $T(z) = \frac ad z + \frac bd$; if $c\neq0$,

$$
T(z) = \frac{a}{c} + \frac{bc - ad}{c}\cdot\frac{1}{cz + d},
$$

which is: multiply by $c$ and add $d$, invert, multiply by $\frac{bc - ad}{c}$, add $\frac ac$.

::: theorem Circles and lines {#thm-circles}
A Möbius transformation maps every circle or straight line in $\C$ onto a circle or a straight line (lines being regarded as circles through $\infty$).
:::

::: proof
A circle or line is the set of solutions of an equation

$$
A\abs z^2 + \bar Bz + B\bar z + C = 0, \qquad A, C\in\R,\ B\in\C,\ \abs B^2 > AC,
$$

with $A\neq0$ for a circle ($\abs{z - z_0}^2 = r^2$ expands to $\abs z^2 - \bar z_0z - z_0\bar z + \abs{z_0}^2 - r^2 = 0$) and $A = 0$ for a line ($\operatorname{Re}(\bar B z) = -C/2$). By the decomposition above it suffices to check the three basic kinds of map. Translations and rotation-dilations map circles to circles and lines to lines, being similarities of the plane. For the inversion $w = 1/z$, substitute $z = 1/w$ and multiply by $\abs w^2$:

$$
A + \bar B\bar w + Bw + C\abs w^2 = 0 ,
$$

which is an equation of the same form with the roles of $A$ and $C$ exchanged and $B$ replaced by $\bar B$ (the condition $\abs B^2 > AC$ is unchanged). So the image is again a circle or line.
:::

The theorem says that a circle through the pole $-d/c$ goes to a line (it passes through $\infty$), and any other circle goes to a circle. On the Riemann sphere of [[complex-analysis/complex-numbers]], where lines are circles through $\infty$, Möbius transformations simply map circles to circles.

::: example Inverting a line {#ex-invert-line}
Find the image of the line $\operatorname{Re} z = 1$ under $w = 1/z$.
::: solution
The line does not pass through $0$, the pole of $1/z$, so its image is a circle through $1/\infty = 0$. It also contains $w = 1$ (the image of $z = 1$) and, by the symmetry $z\mapsto\bar z$ of the line, is symmetric about the real axis. A circle through $0$ and $1$ symmetric about the real axis has centre $\frac12$ and radius $\frac12$. To confirm: for $z = 1 + iy$,

$$
w - \frac12 = \frac{1}{1 + iy} - \frac12 = \frac{1 - iy}{2(1 + iy)}, \qquad\text{so}\qquad \left\lvert w - \frac12\right\rvert = \frac{\abs{1 - iy}}{2\abs{1 + iy}} = \frac12 .
$$

The image is the circle $\abs{w - \frac12} = \frac12$ with the point $0$ removed (it would be the image of $\infty$).
:::
:::

::: quiz
What is the image of the circle $\abs{z - 1} = 1$ under $w = 1/z$?
- [ ] The circle $\abs{w - 1} = 1$
- [ ] A circle through $0$
- [x] The straight line $\operatorname{Re} w = \tfrac12$
- [ ] A straight line through $0$
::: solution
The circle passes through $0$, the pole of $1/z$, so by [[#thm-circles]] its image is a circle through $\infty$, that is, a straight line. Two of its points are $1/2$ (the image of $z = 2$) and $\frac{1}{1 + i} = \frac{1 - i}{2}$, both with real part $\frac12$. So the image is the line $\operatorname{Re}w = \frac12$ — the reverse of [[#ex-invert-line]], as it should be, since $1/z$ is its own inverse (here combined with the scaling by $2$).
:::
:::

How many Möbius transformations are there? A map $\frac{az + b}{cz + d}$ has four coefficients but only three degrees of freedom (scaling the matrix changes nothing), and indeed three points determine it.

::: theorem Three points determine a Möbius transformation {#thm-three-points}
Given distinct $z_1, z_2, z_3\in\C_\infty$ and distinct $w_1, w_2, w_3\in\C_\infty$, there is exactly one Möbius transformation $T$ with $T(z_k) = w_k$ for $k = 1, 2, 3$.
:::

::: proof
*Existence.* For distinct finite $z_1, z_2, z_3$ the map

$$
S(z) = \frac{(z - z_1)(z_2 - z_3)}{(z - z_3)(z_2 - z_1)}
$$ {#eq-cross-ratio}

is a Möbius transformation (its coefficients are $a = z_2 - z_3$, $b = -z_1(z_2 - z_3)$, $c = z_2 - z_1$, $d = -z_3(z_2 - z_1)$, so $ad - bc = (z_2 - z_3)(z_2 - z_1)(z_1 - z_3)\neq0$) with $S(z_1) = 0$, $S(z_2) = 1$, $S(z_3) = \infty$. If one of the $z_k$ is $\infty$, delete the two factors containing it. Let $R$ be the analogous map for the $w_k$; then $T = R^{-1}\circ S$ sends $z_k$ to $w_k$.

*Uniqueness.* If $T_1$ and $T_2$ both work, then $U = T_2^{-1}\circ T_1$ is a Möbius transformation fixing $z_1, z_2, z_3$. Conjugating by $S$, the map $V = S\circ U\circ S^{-1}$ fixes $0$, $1$ and $\infty$. Fixing $\infty$ forces $c = 0$, so $V(z) = \alpha z + \beta$; fixing $0$ gives $\beta = 0$, and fixing $1$ gives $\alpha = 1$. So $V$ is the identity, hence so is $U$, and $T_1 = T_2$.
:::

The number $S(z)$ in [[#eq-cross-ratio]] is the **cross-ratio** $(z, z_1, z_2, z_3)$. The theorem implies that cross-ratios are preserved by Möbius transformations, and that four points lie on one circle or line exactly when their cross-ratio is real (because $S$ maps the circle through $z_1, z_2, z_3$ to the circle through $0, 1, \infty$, the real line).

::: example A map from three points {#ex-three-points}
Find the Möbius transformation with $T(0) = 1$, $T(1) = i$, $T(\infty) = -1$, and determine the image of the upper half-plane.
::: solution
Write $T(z) = \frac{az + b}{cz + d}$. $T(\infty) = a/c = -1$; normalise $c = 1$, so $a = -1$. $T(0) = b/d = 1$, so $b = d$. $T(1) = \frac{-1 + d}{1 + d} = i$ gives $-1 + d = i + id$, so $d(1 - i) = 1 + i$ and $d = \frac{1 + i}{1 - i} = i$. Hence

$$
T(z) = \frac{-z + i}{z + i} = \frac{i - z}{i + z} .
$$

The real axis (the "circle" through $0$, $1$, $\infty$) goes to the circle through $1$, $i$, $-1$, which is the unit circle. The upper half-plane, being connected and disjoint from the real axis, goes to one side of the unit circle; since $T(i) = 0$, it is the inside. So $T$ maps the upper half-plane conformally onto the unit disc.
:::
:::

The most famous map of this kind is the **Cayley transform** $C(z) = \dfrac{z - i}{z + i}$. For real $z$ the points $i$ and $-i$ are equidistant from $z$, so $\abs{C(z)} = 1$; for $\operatorname{Im} z > 0$, $z$ is closer to $i$ than to $-i$, so $\abs{C(z)} < 1$. Thus $C$ maps the upper half-plane onto the unit disc, with $C(i) = 0$.

::: widget complexmap
f: (z - i)/(z + i)
mode: grid
x: -1.5, 1.5
y: 0, 1.5
caption: The Cayley transform $\frac{z-i}{z+i}$ applied to a grid in the upper half-plane. Horizontal and vertical lines become arcs of circles that, continued beyond the grid, all pass through the point $1$ (the image of $\infty$), and they still meet at right angles. The grid lands inside the unit disc: its bottom edge, the segment $[-1.5, 1.5]$ of the real axis, wraps around most of the boundary circle (the thick arc), and the point $i$ lands at the centre.
:::

## Automorphisms of the disc and the Schwarz lemma

Which conformal maps send the unit disc $\mathbb D = \set{z : \abs z < 1}$ onto itself? Rotations $z\mapsto e^{i\theta}z$ do, and in [[complex-analysis/complex-numbers]] we met another family: for $\abs a < 1$,

$$
\varphi_a(z) = \frac{z - a}{1 - \bar az}
$$

satisfies $\abs{1 - \bar az}^2 - \abs{z - a}^2 = (1 - \abs a^2)(1 - \abs z^2)$, so $\abs{\varphi_a(z)} < 1$ for $\abs z < 1$ and $=1$ for $\abs z = 1$. It is a Möbius transformation with $\varphi_a(a) = 0$, and one checks directly that $\varphi_{-a}$ is its inverse ($\varphi_{-a}(\varphi_a(z)) = z$). So $\varphi_a$ maps $\mathbb D$ conformally onto itself, moving $a$ to the centre. The key to showing that there are no other automorphisms is a simple but deep lemma.

::: lemma Schwarz lemma {#lem-schwarz}
Let $f\colon\mathbb D\to\mathbb D$ be analytic with $f(0) = 0$. Then $\abs{f(z)}\le\abs z$ for all $z\in\mathbb D$ and $\abs{f'(0)}\le1$. If $\abs{f(z_0)} = \abs{z_0}$ for some $z_0\neq0$, or $\abs{f'(0)} = 1$, then $f(z) = e^{i\theta}z$ for some real $\theta$.
:::

::: proof
Since $f(0) = 0$, the function $g(z) = f(z)/z$ has a removable singularity at $0$ with $g(0) = f'(0)$ (the Taylor series of $f$ has no constant term); so $g$ is analytic on $\mathbb D$. Fix $0 < r < 1$. On the circle $\abs z = r$, $\abs{g(z)} = \abs{f(z)}/r < 1/r$. By the maximum modulus principle ([[complex-analysis/cauchy-theorem#thm-max]]) $\abs{g(z)} < 1/r$ for $\abs z\le r$. Letting $r\to1$ gives $\abs{g(z)}\le1$ on $\mathbb D$, which is $\abs{f(z)}\le\abs z$ and $\abs{f'(0)} = \abs{g(0)}\le1$. If equality $\abs{g(z_0)} = 1$ holds at some point of $\mathbb D$ (either $z_0\neq0$ with $\abs{f(z_0)} = \abs{z_0}$, or $z_0 = 0$ with $\abs{f'(0)} = 1$), then $\abs g$ attains its maximum inside $\mathbb D$, so $g$ is a constant of modulus $1$, say $e^{i\theta}$, and $f(z) = e^{i\theta}z$.
:::

::: theorem Automorphisms of the disc {#thm-disc-auto}
The conformal maps of $\mathbb D$ onto itself are exactly the maps

$$
f(z) = e^{i\theta}\,\frac{z - a}{1 - \bar az}, \qquad \theta\in\R,\ \abs a < 1 .
$$
:::

::: proof
These maps are conformal bijections of $\mathbb D$ by the discussion above. Conversely, let $f\colon\mathbb D\to\mathbb D$ be a conformal bijection, let $a = f^{-1}(0)$, and put $h = f\circ\varphi_a^{-1} = f\circ\varphi_{-a}$. Then $h$ is a conformal bijection of $\mathbb D$ with $h(0) = f(a) = 0$, and so is its inverse $h^{-1}$ (analytic by [[#thm-inverse]]). The Schwarz lemma applied to $h$ and to $h^{-1}$ gives $\abs{h(z)}\le\abs z$ and $\abs z = \abs{h^{-1}(h(z))}\le\abs{h(z)}$. So $\abs{h(z)} = \abs z$ for all $z$, and by the equality case $h(z) = e^{i\theta}z$. Hence $f = h\circ\varphi_a$, that is, $f(z) = e^{i\theta}\varphi_a(z)$.
:::

The same idea, combined with a hard existence argument, gives the central theorem of the subject. We state it without proof; complete proofs, using the theory of normal families, are in Stein and Shakarchi, *Complex Analysis*, Chapter 8, and Ahlfors, *Complex Analysis*, Chapter 6.

::: theorem Riemann mapping theorem {#thm-riemann}
Let $D\subsetneq\C$ be a simply connected domain and $z_0\in D$. There is a unique conformal map $f$ of $D$ onto the unit disc with $f(z_0) = 0$ and $f'(z_0) > 0$.
:::

Uniqueness, at least, follows from what we have proved: if $f$ and $g$ are two such maps, then $f\circ g^{-1}$ is an automorphism of the disc fixing $0$, so it is a rotation $e^{i\theta}z$ by [[#thm-disc-auto]], and the condition on the derivatives forces $e^{i\theta} = 1$. The hypothesis $D\neq\C$ is essential: by Liouville's theorem there is no conformal map of $\C$ onto the disc ([[#exr-plane-disc]]). Remarkably, the theorem says that any two simply connected proper subdomains of the plane — a square, a slit plane, the inside of a fractal snowflake — are conformally equivalent.

## Building conformal maps

In practice, conformal maps between given regions are built by composing a few standard maps. Here is the toolbox.

- **Möbius transformations** map discs and half-planes to discs and half-planes; for instance the Cayley transform maps the upper half-plane onto the disc.
- **Powers** $z\mapsto z^\alpha$ ($\alpha > 0$) open or close wedges: with the branch $z^\alpha = \abs z^\alpha e^{i\alpha\arg z}$, $0 < \arg z < \beta$ (the principal branch when $\beta\le\pi$), the wedge $\set{0 < \arg z < \beta}$ goes onto the wedge $\set{0 < \arg w < \alpha\beta}$, provided $\alpha\beta\le2\pi$. In particular $z\mapsto z^{\pi/\beta}$ maps a wedge of angle $\beta$ onto the upper half-plane.
- **The exponential** maps the horizontal strip $\set{0 < \operatorname{Im} z < \pi}$ onto the upper half-plane, and the logarithm maps it back ([[complex-analysis/elementary-functions]]).
- **The Joukowski map** $J(z) = \frac12\big(z + \frac1z\big)$, discussed below.

::: example From a quadrant and a strip to the disc {#ex-quadrant}
Find conformal maps of (a) the quadrant $Q = \set{z : \operatorname{Re} z > 0,\ \operatorname{Im} z > 0}$ and (b) the strip $S = \set{z : 0 < \operatorname{Im} z < \pi}$ onto the unit disc.
::: solution
(a) $z\mapsto z^2$ maps $Q$ (the wedge $0 < \arg z < \frac\pi2$) bijectively onto the upper half-plane (the wedge $0 < \arg w < \pi$), and the Cayley transform then maps the half-plane onto the disc. So

$$
f(z) = \frac{z^2 - i}{z^2 + i}
$$

works; for instance $f(1 + i) = \frac{2i - i}{2i + i} = \frac13$, inside the disc.

(b) $z\mapsto e^z$ maps $S$ onto the upper half-plane, and the Cayley transform finishes: $g(z) = \dfrac{e^z - i}{e^z + i}$. The boundary lines $\operatorname{Im} z = 0$ and $\operatorname{Im} z = \pi$ go to the positive and negative real axes, and then to the lower and upper halves of the unit circle; the two ends of the strip, $\operatorname{Re} z\to\mp\infty$, go to $-1$ and $1$.
:::
:::

::: example A half-disc {#ex-half-disc}
Map the upper half-disc $H = \set{z : \abs z < 1,\ \operatorname{Im} z > 0}$ conformally onto the upper half-plane.
::: solution
The boundary of $H$ consists of the segment $[-1, 1]$ and the upper semicircle, which meet at right angles at $\pm1$. A Möbius map sending $-1$ to $0$ and $1$ to $\infty$ will turn both boundary arcs into rays from $0$, and by conformality the rays will still meet at a right angle. Take $T(z) = \frac{1 + z}{1 - z}$. It maps $(-1, 1)$ onto the positive real axis ($T(0) = 1$, $T$ is increasing on $(-1,1)$), and the semicircle onto a ray from $0$ through $T(i) = \frac{1 + i}{1 - i} = i$: the positive imaginary axis. So $T$ maps $H$ onto one of the four quadrants bounded by these rays, and since $T(\frac i2) = \frac{3 + 4i}{5}$ lies in the first quadrant, $T(H)$ is the first quadrant. Squaring maps the quadrant onto the upper half-plane, so

$$
f(z) = \Big(\frac{1 + z}{1 - z}\Big)^2
$$

maps $H$ conformally onto the upper half-plane.
:::
:::

The **Joukowski map** $J(z) = \frac12\big(z + \frac1z\big)$ is the key to classical aerofoil theory. Writing $z = re^{it}$,

$$
J(re^{it}) = \frac12\Big(r + \frac1r\Big)\cos t + \frac i2\Big(r - \frac1r\Big)\sin t,
$$

so for $r\neq1$ the circle $\abs z = r$ goes to the ellipse with semi-axes $\frac12(r + \frac1r)$ and $\frac12\abs{r - \frac1r}$ and foci $\pm1$, while the unit circle is flattened onto the segment $[-1, 1]$, traversed twice. The rays $\arg z = t$ go to hyperbolas with the same foci. Since $J(z_1) = J(z_2)$ only when $z_2 = z_1$ or $z_2 = 1/z_1$, and $J'(z) = \frac12(1 - z^{-2})$ vanishes only at $\pm1$, $J$ maps the exterior $\set{\abs z > 1}$ conformally onto $\C\setminus[-1,1]$: each $w\notin[-1,1]$ has the two preimages $z$ and $1/z$, exactly one of which lies outside the unit circle.

::: widget complexmap
f: (z + 1/z)/2
mode: polar
x: -2.5, 2.5
y: -2.5, 2.5
caption: The Joukowski map $\frac12(z + 1/z)$ applied to a polar grid. Circles $\lvert z\rvert = r$ become confocal ellipses with foci $\pm1$, rays become confocal hyperbolas, and they cross at right angles. As $r$ decreases to $1$ the ellipses flatten onto the slit $[-1,1]$. (Not drawn here: a slightly off-centre circle through $-1$ that encloses the point $1$ is mapped to the curved, pointed profile of a Joukowski aerofoil.)
:::

## Harmonic functions and boundary-value problems

The reason conformal maps matter in applications is that they preserve harmonicity.

::: theorem Conformal invariance of Laplace's equation {#thm-harmonic-invariance}
Let $f\colon D\to D'$ be analytic and let $h$ be harmonic on $D'$. Then $h\circ f$ is harmonic on $D$.
:::

::: proof
Harmonicity is a local property, so fix $z_0\in D$ and a disc $B\subseteq D'$ around $f(z_0)$. By [[complex-analysis/analytic-functions#thm-conjugate]], $h = \operatorname{Re}G$ on $B$ for some analytic function $G$ on $B$. On the open set $f^{-1}(B)$, which contains $z_0$, we have $h\circ f = \operatorname{Re}(G\circ f)$, the real part of an analytic function, which is harmonic by [[complex-analysis/analytic-functions#thm-harmonic]] (its partial derivatives of all orders are continuous by [[complex-analysis/cauchy-theorem#thm-derivatives]]).
:::

So to solve **Dirichlet's problem** — find a harmonic function on a domain with prescribed boundary values — we may map the domain conformally onto one where the solution is known, solve there, and compose. The basic building block lives in the upper half-plane: $\Arg z$ is harmonic there (it is the imaginary part of $\Log z$), equals $0$ on the positive real axis and $\pi$ on the negative real axis. Hence

$$
u(z) = \frac1\pi\Arg z
$$

is the harmonic function in the upper half-plane with boundary values $0$ for $x > 0$ and $1$ for $x < 0$. More generally $\frac{1}{\pi}\Arg(z - x_0)$ has a jump at $x_0$.

::: example Temperature in a half-plane {#ex-dirichlet-halfplane}
Find a bounded harmonic function $u$ in the upper half-plane with $u(x) = 1$ for $-1 < x < 1$ and $u(x) = 0$ for $\abs x > 1$, and compute $u(i)$.
::: solution
Combine two jumps:

$$
u(z) = \frac1\pi\big(\Arg(z - 1) - \Arg(z + 1)\big).
$$

It is harmonic (the imaginary part of $\frac1\pi(\Log(z - 1) - \Log(z + 1))$, which is analytic in the upper half-plane) and takes values in $[0,1]$. On the real axis: for $x > 1$ both arguments are $0$, so $u = 0$; for $-1 < x < 1$, $\Arg(x - 1) = \pi$ and $\Arg(x + 1) = 0$, so $u = 1$; for $x < -1$ both are $\pi$, so $u = 0$. Geometrically, $\pi u(z)$ is the angle subtended at $z$ by the segment $[-1, 1]$. At $z = i$ the segment subtends a right angle ($\Arg(i - 1) = \frac{3\pi}{4}$, $\Arg(i + 1) = \frac\pi4$), so $u(i) = \frac12$.
:::
:::

To solve the analogous problem in the unit disc with boundary values $1$ on the upper semicircle and $0$ on the lower one, map the disc to the half-plane by the inverse of the Cayley-type map, $w = i\frac{1 + z}{1 - z}$: it sends the upper semicircle to the negative real axis and the lower semicircle to the positive one. Then $u(z) = \frac1\pi\Arg\big(i\frac{1 + z}{1 - z}\big)$. At the centre, $u(0) = \frac{1}{\pi}\Arg i = \frac12$ — the average of the boundary values, as the mean value property demands.

::: application Flow past a cylinder and lift on a wing
In the ideal-flow model of [[complex-analysis/analytic-functions]], the complex potential

$$
F(z) = U\Big(z + \frac{a^2}{z}\Big)
$$

describes a uniform stream of speed $U$ flowing past a circular cylinder of radius $a$: for large $\abs z$, $F\approx Uz$, and on $\abs z = a$ the stream function $\psi = \operatorname{Im}F = U\big(y - \frac{a^2y}{x^2 + y^2}\big)$ vanishes, so the circle is a streamline that the fluid flows around. Composing with a Joukowski map transports this flow to the flow around an aerofoil; adding a circulation term $\frac{\Gamma}{2\pi i}\Log z$, chosen so that the flow leaves the sharp trailing edge smoothly, produces the lift force $\rho U\Gamma$ per unit span of the wing, where $\rho$ is the density of the air (the Kutta–Joukowski theorem). Martin Kutta and Nikolai Zhukovsky developed this, the first quantitative theory of lift, between 1902 and 1910.
:::

::: widget contour
f: y - y/(x^2 + y^2)
x: -3, 3
y: -2, 2
levels: 24
caption: Streamlines $\psi = \text{const}$ of the flow past the unit cylinder, $\psi = \operatorname{Im}\big(z + 1/z\big) = y - \frac{y}{x^2+y^2}$. Far away the streamlines are horizontal (uniform flow); near the cylinder they part and wrap around it, and the unit circle itself is the level curve $\psi = 0$. The flow is fastest at the top and bottom of the cylinder, where the streamlines crowd together.
:::

::: warning Conformal is not the same as analytic everywhere
Conformality can fail at isolated points, and that matters at the boundary. The map $z\mapsto z^2$ is a conformal bijection of the open quadrant onto the half-plane, but at the corner $0$ it doubles the right angle into a straight angle — which is exactly why it is useful. Do not expect boundary angles to be preserved at points where $f'$ vanishes or is undefined. Also, an analytic function with $f'\neq0$ everywhere need not be injective: $e^z$ has non-zero derivative but takes each value infinitely often. Local conformality ([[#thm-conformal]]) is not global bijectivity.
:::

::: history
Bernhard Riemann stated the mapping theorem in his dissertation of 1851, with a proof based on the "Dirichlet principle", whose validity Karl Weierstrass called into question in 1870. The first complete proof was given by William Fogg Osgood in 1900; Paul Koebe and Constantin Carathéodory gave further proofs around 1912, and Carathéodory showed that for domains bounded by Jordan curves the map extends to a homeomorphism of the closures. The short argument by an extremal problem that most textbooks now use was found by Lipót Fejér and Frigyes Riesz in 1922. August Ferdinand Möbius studied the transformations named after him in the 1850s as part of his geometry of circles, and Nikolai Zhukovsky (Joukowski) introduced his aerofoil profiles in 1910.
:::

## Where this leads

Conformal maps connect complex analysis with geometry and physics. The Laplace equation and its boundary-value problems are developed in [[pde/laplace-equation]], where the Poisson integral formula gives the solution in the disc explicitly. The Möbius transformations of the disc (or of the half-plane) onto itself are the orientation-preserving isometries of the hyperbolic plane, a geometry of constant negative curvature ([[differential-geometry/geodesics-gauss-bonnet]]). Riemann surfaces and the uniformisation theorem, the far-reaching generalisation of the Riemann mapping theorem, belong to graduate courses in complex analysis and geometry.

::: summary
- An analytic function is conformal (angle- and orientation-preserving) wherever $f'\neq0$; at a zero of $f'$ of order $k - 1$, angles are multiplied by $k$.
- Where $f'(z_0)\neq0$, $f$ has a local analytic inverse with derivative $1/f'$; a conformal map of domains is an analytic bijection, and its inverse is analytic.
- Möbius transformations $\frac{az + b}{cz + d}$ ($ad - bc\neq0$) are conformal bijections of $\C_\infty$; they form a group, map circles and lines to circles and lines, and are determined by the images of three points.
- The Cayley transform $\frac{z - i}{z + i}$ maps the upper half-plane onto the disc; the automorphisms of the disc are $e^{i\theta}\frac{z - a}{1 - \bar az}$, proved with the Schwarz lemma $\abs{f(z)}\le\abs z$.
- Riemann mapping theorem: every simply connected domain other than $\C$ is conformally equivalent to the disc.
- Composing powers, exponentials, Möbius maps and the Joukowski map transforms standard regions into one another.
- Harmonic functions stay harmonic under analytic maps, so Dirichlet problems can be moved to the half-plane, where $\frac1\pi\Arg(z - x_0)$ solves the basic jump problem.
:::

## Exercises

::: exercise The Cayley transform {level=1 check="1/3"}
Let $C(z) = \dfrac{z - i}{z + i}$. Compute $\abs{C(2i)}$.
::: solution
$C(2i) = \dfrac{2i - i}{2i + i} = \dfrac{i}{3i} = \dfrac13$, so $\abs{C(2i)} = \frac13$, inside the unit disc as it must be for a point of the upper half-plane.
:::
:::

::: exercise Fixed points {level=1}
Find the fixed points of the Möbius transformation $T(z) = \dfrac{2z + 1}{z + 2}$, and check that $T$ maps the unit disc onto itself.
::: solution
$T(z) = z$ means $2z + 1 = z^2 + 2z$, that is, $z^2 = 1$: the fixed points are $\pm1$. For $\abs z = 1$, $\abs{2z + 1} = \abs{z + 2}$: indeed $\abs{2z + 1}^2 = 4 + 4\operatorname{Re}z + 1$ and $\abs{z + 2}^2 = 1 + 4\operatorname{Re}z + 4$. So $T$ maps the unit circle onto itself, and since $T(0) = \frac12$ lies inside, it maps the disc onto the disc. (It is $\varphi_{-1/2}$ in the notation of the text.)
:::
:::

::: exercise Critical points {level=1}
Find all points where $f(z) = z^3 - 3z$ fails to be conformal, and the angle-multiplication factor there. Where is $g(z) = e^{z^2}$ not conformal?
::: solution
$f'(z) = 3(z^2 - 1)$ vanishes at $z = \pm1$, where $f(z) - f(\pm1) = (z \mp 1)^2(z \pm 2)$ has a double zero: angles are doubled. For $g$, $g'(z) = 2ze^{z^2}$ vanishes only at $0$, where $g(z) - 1 = z^2 + \cdots$ has a double zero, so angles at $0$ are doubled.
:::
:::

::: exercise The image of a line {level=2 check="1/2"}
Show that $w = 1/z$ maps the line $\operatorname{Im} z = -1$ onto a circle, and find its radius.
::: solution
The line does not pass through $0$, so its image is a circle through $0$. It contains $1/(-i) = i$. By the symmetry $z\mapsto-\bar z$ of the line (reflection in the imaginary axis), which $1/z$ turns into the reflection $w\mapsto-\bar w$, the image is symmetric about the imaginary axis. So it is the circle with diameter $[0, i]$: centre $\frac i2$, radius $\frac12$. Check: for $z = x - i$, $w - \frac i2 = \frac{1}{x - i} - \frac i2 = \frac{2 - ix - 1}{2(x - i)} = \frac{1 - ix}{2(x - i)}$, whose modulus is $\frac{\sqrt{1 + x^2}}{2\sqrt{x^2 + 1}} = \frac12$.
:::
:::

::: exercise A map from three points {level=2}
Find the Möbius transformation sending $-1, 0, 1$ to $-i, 1, i$ respectively. Where does it send the upper half-plane?
::: solution
Write $T(z) = \frac{az + b}{cz + d}$. From $T(0) = 1$: $b = d$. Normalise $b = d = 1$. From $T(1) = i$: $a + 1 = i(c + 1)$. From $T(-1) = -i$: $-a + 1 = -i(-c + 1)$, i.e. $1 - a = ic - i$. Adding the two equations: $2 = 2ic$, so $c = -i$, and then $a = i(1 - i) - 1 = i$. Hence $T(z) = \frac{iz + 1}{-iz + 1} = \frac{1 + iz}{1 - iz}$. The real axis goes to the circle through $-i, 1, i$, the unit circle. Since $T(i) = \frac{1 - 1}{1 + 1} = 0$, the upper half-plane goes onto the unit disc.
:::
:::

::: exercise A boundary-value problem {level=2 check="1/4"}
Let $u$ be the bounded harmonic function in the upper half-plane with boundary values $1$ on the negative real axis and $0$ on the positive real axis. Find $u(1 + i)$.
::: solution
From the text, $u(z) = \frac1\pi\Arg z$. At $1 + i$, $\Arg(1+i) = \frac\pi4$, so $u(1 + i) = \frac14$. (The value is the fraction of the "visual angle" at $1 + i$ occupied by the negative real axis.)
:::
:::

::: exercise A Joukowski ellipse {level=2 check="5/4"}
Find the image of the circle $\abs z = 2$ under $J(z) = \frac12\big(z + \frac1z\big)$, and give its semi-major axis.
::: solution
For $z = 2e^{it}$, $J(z) = \frac12\big(2e^{it} + \frac12e^{-it}\big) = \frac54\cos t + \frac34 i\sin t$. This traces the ellipse $\frac{u^2}{(5/4)^2} + \frac{v^2}{(3/4)^2} = 1$ once, with semi-axes $\frac54$ and $\frac34$; its foci are at $\pm\sqrt{(5/4)^2 - (3/4)^2} = \pm1$.
:::
:::

::: exercise A consequence of the Schwarz lemma {level=2}
Let $f\colon\mathbb D\to\mathbb D$ be analytic with $f(0) = 0$ and $f(\frac12) = \frac12$. Find $f$. Is there an analytic $g\colon\mathbb D\to\mathbb D$ with $g(0) = 0$ and $g(\frac12) = \frac34$?
::: solution
By the Schwarz lemma $\abs{f(z)}\le\abs z$, with equality at the non-zero point $z_0 = \frac12$. So $f(z) = e^{i\theta}z$, and $f(\frac12) = \frac12$ forces $e^{i\theta} = 1$: $f(z) = z$. No such $g$ exists, because the Schwarz lemma would require $\abs{g(\frac12)}\le\frac12 < \frac34$.
:::
:::

::: exercise Automorphisms of the half-plane {level=3}
Let $a, b, c, d$ be real with $ad - bc > 0$, and $T(z) = \dfrac{az + b}{cz + d}$. Prove that $\operatorname{Im}T(z) = \dfrac{(ad - bc)\operatorname{Im}z}{\abs{cz + d}^2}$, and deduce that $T$ maps the upper half-plane $\mathbb H$ conformally onto itself. (In fact these are all the conformal automorphisms of $\mathbb H$; this follows from [[#thm-disc-auto]] via the Cayley transform.)
::: solution
Multiply numerator and denominator by $\overline{cz + d} = c\bar z + d$ (the coefficients are real):

$$
T(z) = \frac{(az + b)(c\bar z + d)}{\abs{cz + d}^2} = \frac{ac\abs z^2 + adz + bc\bar z + bd}{\abs{cz + d}^2}.
$$

The terms $ac\abs z^2$ and $bd$ are real, and $\operatorname{Im}(adz + bc\bar z) = (ad - bc)\operatorname{Im}z$. This proves the formula. If $\operatorname{Im}z > 0$ then $cz + d\neq0$ (as $c, d$ are real and not both zero), and $\operatorname{Im}T(z) > 0$; so $T(\mathbb H)\subseteq\mathbb H$. The inverse $T^{-1}(w) = \frac{dw - b}{-cw + a}$ also has real coefficients with determinant $da - bc > 0$, so $T^{-1}(\mathbb H)\subseteq\mathbb H$ as well. Hence $T$ is a bijection of $\mathbb H$ onto itself, analytic with $T'\neq0$, i.e. a conformal automorphism.
:::
:::

::: exercise The plane is not a disc {#exr-plane-disc level=3}
Prove that there is no conformal map of $\C$ onto the unit disc $\mathbb D$, and indeed no non-constant analytic map from $\C$ into $\mathbb D$. Why does this not contradict the Riemann mapping theorem?
::: solution
An analytic map $f\colon\C\to\mathbb D$ is an entire function with $\abs f < 1$, hence constant by Liouville's theorem ([[complex-analysis/cauchy-theorem#thm-liouville]]). In particular it cannot be a bijection onto $\mathbb D$. There is no contradiction: the Riemann mapping theorem applies only to simply connected domains $D\neq\C$. Topologically $\C$ and $\mathbb D$ are the same (they are homeomorphic, for instance by $z\mapsto\frac{z}{1 + \abs z}$), but conformally they are different — complex analysis distinguishes them although topology does not.
:::
:::
