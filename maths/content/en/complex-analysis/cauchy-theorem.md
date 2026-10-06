In [[complex-analysis/contour-integrals]] we met two kinds of behaviour. The integral of $z^2$ between two points did not depend on the path, and its integral around any closed contour was zero; the integral of $\bar z$ depended on the path; and $1/z$ integrated to $2\pi i$ around the origin but to zero around curves that do not enclose it. The difference between $z^2$ and $\bar z$ is analyticity. The difference between a curve around the origin and a curve that misses it is the "hole" that the singularity of $1/z$ punches in the plane.

**Cauchy's theorem** turns these observations into a principle: *the integral of an analytic function around a closed contour is zero, provided the function is analytic everywhere inside the contour.* It is the central theorem of complex analysis, and its consequences are spectacular. From it we will derive **Cauchy's integral formula**, which recovers the values of an analytic function inside a circle from its values on the circle; the fact that analytic functions are infinitely differentiable; **Liouville's theorem**, that bounded entire functions are constant; a three-line proof of the **fundamental theorem of algebra**; and the **maximum modulus principle**.

## A first look via Green's theorem

There is a quick heuristic argument. Let $f = u + iv$ be analytic, with *continuous* partial derivatives, on an open set containing a simple closed contour $\gamma$ and the region $\Omega$ it encloses. By [[complex-analysis/contour-integrals#eq-line-integrals]] and Green's theorem ([[multivariable/greens-theorem]]),

$$
\oint_\gamma f\,dz = \oint_\gamma(u\,dx - v\,dy) + i\oint_\gamma(v\,dx + u\,dy) = \iint_\Omega(-v_x - u_y)\,dA + i\iint_\Omega(u_x - v_y)\,dA .
$$

Both integrands vanish identically by the Cauchy–Riemann equations, so $\oint_\gamma f\,dz = 0$. This was essentially Cauchy's own argument. It has two defects: it needs the derivative $f'$ to be continuous, which is not part of the definition of analyticity, and it relies on Green's theorem for general regions, whose proof is harder than it looks. In 1900 Édouard Goursat found a proof that avoids both, by subdividing into small squares; we follow Alfred Pringsheim's version of 1901, which starts from triangles.

## Goursat's theorem

Throughout, a **triangle** $T$ means a closed solid triangle (including its interior) with vertices $a, b, c$, and $\partial T$ is its boundary, traversed as the closed polygon $[a, b] + [b, c] + [c, a]$.

::: theorem Cauchy–Goursat theorem for triangles {#thm-goursat}
Let $f$ be analytic on an open set $U$ and let $T\subseteq U$ be a triangle. Then

$$
\oint_{\partial T}f(z)\,dz = 0 .
$$
:::

::: proof
Let $I = \left\lvert\oint_{\partial T}f\,dz\right\rvert$, and let $d$ and $p$ be the diameter and the perimeter of $T$. We will show $I\le\eps\,dp$ for every $\eps > 0$.

*Subdivision.* Join the midpoints of the three sides of $T$. This cuts $T$ into four congruent triangles $T^{(1)},\dots,T^{(4)}$, each similar to $T$ with half the size, and we orient their boundaries in the same (counterclockwise) sense as $\partial T$. Then

$$
\oint_{\partial T}f\,dz = \sum_{j=1}^4\oint_{\partial T^{(j)}}f\,dz,
$$

because each interior edge is traversed twice in opposite directions, and those contributions cancel by [[complex-analysis/contour-integrals#prop-props]], while the remaining edges make up $\partial T$. By the triangle inequality at least one of the four, call it $T_1$, satisfies $\left\lvert\oint_{\partial T_1}f\,dz\right\rvert\ge I/4$.

*Nesting.* Repeating the construction with $T_1$ in place of $T$, and so on, produces nested triangles $T\supseteq T_1\supseteq T_2\supseteq\cdots$ such that

$$
\left\lvert\oint_{\partial T_n}f\,dz\right\rvert\ge\frac{I}{4^n}, \qquad \operatorname{diam}(T_n) = \frac{d}{2^n}, \qquad \operatorname{perimeter}(T_n) = \frac{p}{2^n}.
$$

The $T_n$ are non-empty, closed, bounded and nested, so their intersection contains a point $z_0$ (choose $w_n\in T_n$; the sequence is Cauchy because $\abs{w_n - w_m}\le d/2^{\min(n,m)}$, its limit lies in every closed $T_n$; compare [[real-analysis/metric-spaces]]). In particular $z_0\in T\subseteq U$.

*Using differentiability at one point.* Since $f$ is differentiable at $z_0$,

$$
f(z) = f(z_0) + f'(z_0)(z - z_0) + \psi(z)(z - z_0), \qquad\text{where } \psi(z)\to0 \text{ as } z\to z_0 .
$$

The linear function $f(z_0) + f'(z_0)(z - z_0)$ has a primitive on $\C$ (a quadratic polynomial), so its integral around the closed contour $\partial T_n$ is zero by [[complex-analysis/contour-integrals#thm-ftc]]. Therefore

$$
\oint_{\partial T_n}f\,dz = \oint_{\partial T_n}\psi(z)(z - z_0)\,dz .
$$

Let $\eps > 0$ and choose $\delta > 0$ with $\abs{\psi(z)} < \eps$ for $\abs{z - z_0} < \delta$. For $n$ large enough that $d/2^n < \delta$, every $z\in\partial T_n$ satisfies $\abs{z - z_0}\le\operatorname{diam}T_n = d/2^n < \delta$ (both $z$ and $z_0$ lie in $T_n$). The ML-inequality gives

$$
\frac{I}{4^n}\le\left\lvert\oint_{\partial T_n}\psi(z)(z - z_0)\,dz\right\rvert\le\eps\cdot\frac{d}{2^n}\cdot\frac{p}{2^n} = \frac{\eps\,dp}{4^n}.
$$

Hence $I\le\eps\,dp$. Since $\eps > 0$ was arbitrary, $I = 0$.
:::

The proof uses differentiability only at the single point $z_0$ — but that point is not known in advance, which is why differentiability everywhere on $U$ is needed. For the integral formula we need a slightly stronger version that tolerates one bad point, provided the function is continuous there.

::: lemma Goursat with an exceptional point {#lem-goursat-point}
Let $U$ be open, $q\in U$, and let $f$ be continuous on $U$ and analytic on $U\setminus\set q$. Then $\oint_{\partial T}f\,dz = 0$ for every triangle $T\subseteq U$.
:::

::: proof
If $q\notin T$, then $T$ lies in the open set $U\setminus\set q$ where $f$ is analytic, and [[#thm-goursat]] applies. Suppose next that $q$ is a vertex, say $T$ has vertices $q, b, c$. Choose points $b'$ on $[q, b]$ and $c'$ on $[q, c]$. Then $T$ is the union of the triangles $T' = [q, b', c']$, $[b', b, c']$ and $[c', b, c]$, and as in the proof of [[#thm-goursat]] (interior edges cancel)

$$
\oint_{\partial T}f\,dz = \oint_{\partial T'}f\,dz + \oint_{\partial[b',b,c']}f\,dz + \oint_{\partial[c',b,c]}f\,dz = \oint_{\partial T'}f\,dz,
$$

since the last two triangles do not contain $q$. Now $f$ is continuous on the compact set $T$, hence bounded there by some $M$, and the ML-inequality gives $\left\lvert\oint_{\partial T'}f\,dz\right\rvert\le M\cdot\operatorname{perimeter}(T')$, which tends to $0$ as $b'$ and $c'$ approach $q$. So $\oint_{\partial T}f\,dz = 0$. Finally, if $q$ lies in $T$ but is not a vertex, join $q$ to the vertices: this splits $T$ into two or three triangles having $q$ as a vertex (degenerate ones contribute nothing), and the integral over $\partial T$ is the sum of their integrals, each zero by the previous case.
:::

## Cauchy's theorem in a disc

From triangles we pass to arbitrary closed contours, at first inside a disc. The key is to build a primitive.

::: theorem Cauchy's theorem for a disc {#thm-cauchy-disc}
Let $D$ be an open disc, and let $f$ be analytic on $D$, or more generally continuous on $D$ and analytic on $D\setminus\set q$ for some point $q$. Then $f$ has a primitive on $D$, and consequently

$$
\oint_\gamma f(z)\,dz = 0 \qquad\text{for every closed contour } \gamma \text{ in } D .
$$

The same holds with $D$ replaced by any convex open set.
:::

::: proof
Let $c$ be the centre of $D$ and define $F(z) = \int_{[c, z]}f(\zeta)\,d\zeta$ for $z\in D$. If $z$ and $z + h$ are in $D$, the triangle with vertices $c, z, z + h$ lies in $D$, because a disc (more generally a convex set) contains the segment between any two of its points. By [[#lem-goursat-point]] (or [[#thm-goursat]]) the integral around this triangle vanishes, that is,

$$
F(z + h) - F(z) = \int_{[z, z + h]}f(\zeta)\,d\zeta .
$$

This is exactly the identity used in the proof of [[complex-analysis/contour-integrals#thm-primitive]], and the same ML-estimate shows that $F'(z) = f(z)$. So $F$ is a primitive of $f$ on $D$, and the closed contour integrals vanish by [[complex-analysis/contour-integrals#thm-ftc]].
:::

How far can the disc be generalised? Some hypothesis on the shape of the domain is unavoidable: $1/z$ is analytic on the annulus $1/2 < \abs z < 2$, but its integral around the unit circle is $2\pi i$. The precise condition is topological.

::: remark The general Cauchy theorem
A domain $D$ is **simply connected** if every closed curve in $D$ can be continuously shrunk to a point within $D$ — informally, $D$ has no holes. Discs, half-planes, convex sets, star-shaped sets and the slit plane are simply connected; annuli and punctured discs are not. The general theorem says:

*If $f$ is analytic on a simply connected domain $D$, then $\oint_\gamma f\,dz = 0$ for every closed contour $\gamma$ in $D$, and $f$ has a primitive on $D$.*

More generally, if two closed contours can be deformed into each other within the domain of analyticity of $f$ (they are *homotopic*), their integrals are equal. The proof covers the deformation by small discs, applies [[#thm-cauchy-disc]] in each, and adds up; see Stein and Shakarchi, *Complex Analysis*, Chapter 3, or Conway, *Functions of One Complex Variable*, Chapter IV. Homotopy and simple connectivity are studied in [[topology/fundamental-group]]. A version in which the deformation is replaced by the condition $n(\gamma, p) = 0$ for all $p\notin D$, where $n$ is the winding number of [[complex-analysis/contour-integrals#def-winding]] (the **homology version**), is the most general form.

In this course we use the theorem in the following concrete form: *if $\gamma$ is a simple closed contour (such as a circle, a polygon, or the boundary of a semicircle or a keyhole) and $f$ is analytic on an open set containing $\gamma$ and the region inside it, then $\oint_\gamma f\,dz = 0$.* For the contours that occur in practice this follows from [[#thm-cauchy-disc]] by cutting the inside region into finitely many convex pieces, as the next picture suggests.
:::

::: intuition Deforming contours
Suppose $f$ is analytic between two circles, one inside the other, and on them. Cut the ring between them by two radial segments into two "C-shaped" pieces, each of which lies in a simply connected region where $f$ is analytic. The integral around the boundary of each piece is zero. Adding the two, the radial segments are traversed once in each direction and cancel, leaving the outer circle counterclockwise and the inner circle clockwise:

$$
\oint_{\text{outer}}f\,dz - \oint_{\text{inner}}f\,dz = 0 .
$$

So **a contour can be deformed across any region where the function is analytic without changing the integral.** Only the singularities that the contour encloses matter. For $1/z$, every circle around the origin gives $2\pi i$, and so does every simple closed contour around it.
:::

Cauchy's theorem alone, without any singularities, already evaluates real integrals: integrate around a rectangle and let it grow.

::: example The Fourier transform of a Gaussian {#ex-gaussian}
Using $\int_{-\infty}^\infty e^{-x^2}\,dx = \sqrt\pi$, show that for every real $b$

$$
\int_{-\infty}^{\infty}e^{-x^2}\cos(2bx)\,dx = \sqrt\pi\,e^{-b^2}.
$$
::: solution
Let $b > 0$ (the integral is even in $b$, and $b = 0$ is the given formula). Integrate the entire function $f(z) = e^{-z^2}$ counterclockwise around the rectangle with vertices $-R$, $R$, $R + ib$, $-R + ib$. Since $f$ is entire, the rectangle and its inside lie in a disc on which $f$ is analytic, and [[#thm-cauchy-disc]] gives

$$
\int_{-R}^{R}e^{-x^2}\,dx + \int_{\text{right}}f\,dz - \int_{-R}^{R}e^{-(x + ib)^2}\,dx + \int_{\text{left}}f\,dz = 0,
$$

where the top side, traversed from right to left, has been written as minus an integral from $-R$ to $R$. On the right side $z = R + iy$ with $0\le y\le b$, and

$$
\abs{e^{-z^2}} = e^{-\operatorname{Re}(z^2)} = e^{-(R^2 - y^2)}\le e^{b^2 - R^2},
$$

so by the ML-inequality that integral is at most $b\,e^{b^2 - R^2}\to0$ as $R\to\infty$; the left side is the same. Letting $R\to\infty$,

$$
\int_{-\infty}^{\infty}e^{-(x + ib)^2}\,dx = \int_{-\infty}^\infty e^{-x^2}\,dx = \sqrt\pi .
$$

Now expand: $e^{-(x + ib)^2} = e^{-x^2 - 2ibx + b^2} = e^{b^2}e^{-x^2}\big(\cos 2bx - i\sin2bx\big)$. The imaginary part integrates to zero because $e^{-x^2}\sin 2bx$ is odd, and the real part gives $e^{b^2}\int_{-\infty}^\infty e^{-x^2}\cos 2bx\,dx = \sqrt\pi$, which is the claim. In probability language, this computes the characteristic function of the normal distribution; in [[pde/fourier-transform]] it says that the Fourier transform of a Gaussian is a Gaussian.
:::
:::

We now prove the one deformation we need for the integral formula, by an argument independent of pictures.

::: lemma Off-centre circles {#lem-off-centre}
If $\abs{a - c} < r$, then $\displaystyle\oint_{\abs{z - c} = r}\frac{dz}{z - a} = 2\pi i$.
:::

::: proof
For $z$ on the circle put $w = \dfrac{a - c}{z - c}$; then $\abs w = \dfrac{\abs{a - c}}{r} = \rho < 1$. Expanding in a geometric series,

$$
\frac{1}{z - a} = \frac{1}{(z - c) - (a - c)} = \frac{1}{z - c}\cdot\frac{1}{1 - w} = \sum_{n=0}^\infty\frac{(a - c)^n}{(z - c)^{n+1}} .
$$

The $n$-th term has modulus at most $\rho^n/r$ on the circle, and $\sum\rho^n/r < \infty$, so by the Weierstrass M-test the series converges uniformly on the circle. By [[complex-analysis/contour-integrals#cor-uniform]] we may integrate term by term, and by [[complex-analysis/contour-integrals#thm-fundamental]] only the term $n = 0$, which is $1/(z - c)$, contributes; it gives $2\pi i$.
:::

## Cauchy's integral formula

::: theorem Cauchy's integral formula {#thm-cif}
Let $f$ be analytic on an open set $U$ containing the closed disc $\overline{D}(c, r)$. Then for every $a$ with $\abs{a - c} < r$,

$$
f(a) = \frac{1}{2\pi i}\oint_{\abs{z - c} = r}\frac{f(z)}{z - a}\,dz .
$$ {#eq-cif}
:::

::: proof
Because the closed disc is compact and $U$ is open, $U$ contains a slightly larger open disc $D = D(c, R)$ with $R > r$ (otherwise there would be points $z_n\notin U$ with $\abs{z_n - c} < r + 1/n$, and a subsequence would converge to a point of the closed disc that is not in the open set $U$ — impossible). Define

$$
g(z) = \begin{cases}\dfrac{f(z) - f(a)}{z - a}, & z\neq a,\\[2mm] f'(a), & z = a.\end{cases}
$$

Then $g$ is analytic on $D\setminus\set a$ and continuous at $a$ (by the definition of $f'(a)$). By [[#thm-cauchy-disc]] with the exceptional point $q = a$, $\oint_{\abs{z-c}=r}g(z)\,dz = 0$, that is,

$$
\oint_{\abs{z - c} = r}\frac{f(z)}{z - a}\,dz = f(a)\oint_{\abs{z-c}=r}\frac{dz}{z - a} = 2\pi i\,f(a)
$$

by [[#lem-off-centre]].
:::

This is remarkable: the values of $f$ on the circle determine its values everywhere inside. Nothing like it holds for real functions — a smooth function on $\R^2$ can be changed inside a disc without changing it on the boundary. Choosing $a = c$ and parametrising $z = c + re^{it}$ (so $dz/(z - c) = i\,dt$) gives the **mean value property**

$$
f(c) = \frac{1}{2\pi}\int_0^{2\pi}f(c + re^{it})\,dt :
$$ {#eq-mvp}

the value at the centre is the average over any circle around it. Taking real parts, harmonic functions have the same property.

::: example Using the integral formula {#ex-cif}
Evaluate (a) $\displaystyle\oint_{\abs z = 2}\frac{e^z}{z - 1}\,dz$ and (b) $\displaystyle\oint_{\abs z = 2}\frac{\sin z}{z^2 + 1}\,dz$.
::: solution
(a) $f(z) = e^z$ is entire and $a = 1$ lies inside $\abs z = 2$, so [[#eq-cif]] gives $\oint\frac{e^z}{z-1}\,dz = 2\pi i\,e^1 = 2\pi ie$.

(b) The integrand is not of the form $f(z)/(z - a)$ with a single point $a$ inside, because $z^2 + 1 = (z - i)(z + i)$ vanishes at both $\pm i$, and both are inside. Use partial fractions:

$$
\frac{1}{z^2 + 1} = \frac{1}{2i}\Big(\frac{1}{z - i} - \frac{1}{z + i}\Big).
$$

Applying the formula to each term with $f = \sin$,

$$
\oint_{\abs z = 2}\frac{\sin z}{z^2 + 1}\,dz = \frac{1}{2i}\big(2\pi i\sin(i) - 2\pi i\sin(-i)\big) = 2\pi\sin(i) = 2\pi i\sinh 1 \approx 7.384i,
$$

using $\sin(i) = i\sinh 1$ from [[complex-analysis/elementary-functions]].
:::
:::

::: widget contourint
f: exp(z)/(z - 1)
center: 0, 0
radius: 2
poles: 1, 0
caption: The integral of $e^z/(z-1)$ around a movable circle. While the circle encloses $z = 1$, the integral equals $2\pi i\,e\approx 17.08i$, exactly as Cauchy's integral formula predicts, regardless of the centre and radius. Move the circle off the point $1$ and the integral becomes $0$: that is Cauchy's theorem.
:::

::: quiz
Let $\gamma$ be the circle $\abs z = 1$. Which of the following integrals is **not** zero?
- [ ] $\oint_\gamma\dfrac{e^z}{z - 3}\,dz$
- [ ] $\oint_\gamma z^5\cos z\,dz$
- [x] $\oint_\gamma\dfrac{\cos z}{z}\,dz$
- [ ] $\oint_\gamma\dfrac{\sin z}{z^2 - 4}\,dz$
::: solution
In the first, second and fourth integrals the integrand is analytic on a disc slightly larger than the closed unit disc (the bad points $3$ and $\pm2$ are outside), so Cauchy's theorem gives $0$. In the third, $\frac{\cos z}{z}$ has the point $0$ inside, and the integral formula gives $2\pi i\cos 0 = 2\pi i$.
:::
:::

## Analytic functions are infinitely differentiable

The integral formula expresses $f(a)$ through an integral in which $a$ appears only in the simple factor $1/(z - a)$. Differentiating under the integral sign with respect to $a$ is therefore easy — and it shows that the derivative of an analytic function is again analytic.

::: lemma Differentiating under the integral sign {#lem-diff-integral}
Let $\gamma$ be a contour, $V$ an open set, and $g(z, w)$ continuous on $\gamma\times V$, analytic in $w$ for each fixed $z$, with $\partial g/\partial w$ also continuous on $\gamma\times V$. Then $G(w) = \int_\gamma g(z, w)\,dz$ is analytic on $V$ and $G'(w) = \int_\gamma\frac{\partial g}{\partial w}(z, w)\,dz$.
:::

::: proof
Fix $w\in V$ and $\rho > 0$ with $\overline D(w,\rho)\subseteq V$. For $0 < \abs h<\rho$, [[complex-analysis/analytic-functions#lem-curve]] and the fundamental theorem of calculus along the segment from $w$ to $w + h$ give

$$
\frac{g(z, w + h) - g(z, w)}{h} - \frac{\partial g}{\partial w}(z, w) = \int_0^1\Big(\frac{\partial g}{\partial w}(z, w + sh) - \frac{\partial g}{\partial w}(z, w)\Big)\,ds .
$$

The function $\partial g/\partial w$ is continuous on the compact set $\gamma\times\overline D(w,\rho)$, hence uniformly continuous there ([[topology/compactness]]); so the right-hand side tends to $0$ as $h\to0$, uniformly in $z\in\gamma$. Integrating over $\gamma$ and using the ML-inequality, $\frac{G(w+h) - G(w)}{h}\to\int_\gamma\frac{\partial g}{\partial w}(z,w)\,dz$.
:::

::: theorem Cauchy's formula for derivatives {#thm-derivatives}
If $f$ is analytic on an open set $U$, then $f'$ is analytic on $U$; hence $f$ has derivatives of all orders, all analytic on $U$. If $\overline D(c, r)\subseteq U$ and $\abs{a - c} < r$, then for every $n\ge0$

$$
f^{(n)}(a) = \frac{n!}{2\pi i}\oint_{\abs{z-c}=r}\frac{f(z)}{(z - a)^{n+1}}\,dz .
$$ {#eq-cif-n}
:::

::: proof
Fix a closed disc $\overline D(c, r)\subseteq U$ and let $V = D(c, r)$ be the open disc. The function $g(z, w) = f(z)/(z - w)$ for $z$ on the circle and $w\in V$ satisfies the hypotheses of [[#lem-diff-integral]], with $\partial^k g/\partial w^k = k!\,f(z)/(z - w)^{k+1}$, all continuous because $\abs{z - w} > 0$ for $z$ on the circle and $w$ inside. Starting from [[#eq-cif]] and applying the lemma $n$ times, we find that $f$ is $n$ times differentiable on $V$ with $f^{(n)}$ given by [[#eq-cif-n]]. Every point of $U$ lies in such a disc $V$, so all derivatives of $f$ exist on $U$; in particular $f'$ is differentiable on $U$, that is, analytic.
:::

This answers a question left open in [[complex-analysis/analytic-functions]]: since $f'$ is analytic, so is $f''$, and the real and imaginary parts of an analytic function have continuous partial derivatives of all orders. The hypothesis "continuous second partial derivatives" in [[complex-analysis/analytic-functions#thm-harmonic]] is therefore automatic.

::: example A derivative by integration {#ex-cif-n}
Evaluate $\displaystyle\oint_{\abs z = 1}\frac{e^{2z}}{z^4}\,dz$.
::: solution
This is [[#eq-cif-n]] with $f(z) = e^{2z}$, $a = 0$ and $n + 1 = 4$, so $n = 3$:

$$
\oint_{\abs z = 1}\frac{e^{2z}}{z^4}\,dz = \frac{2\pi i}{3!}f'''(0) = \frac{2\pi i}{6}\cdot 2^3e^0 = \frac{8\pi i}{3}.
$$
:::
:::

## Liouville's theorem and the fundamental theorem of algebra

Bounding the integral in [[#eq-cif-n]] with the ML-inequality shows that the derivatives of $f$ at a point are controlled by the size of $f$ on a circle around it.

::: corollary Cauchy's estimates {#cor-estimates}
If $f$ is analytic on an open set containing $\overline D(a, r)$ and $\abs{f(z)}\le M$ on the circle $\abs{z - a} = r$, then

$$
\abs{f^{(n)}(a)}\le\frac{n!\,M}{r^n} \qquad (n = 0, 1, 2, \dots).
$$
:::

::: proof
Apply the ML-inequality to [[#eq-cif-n]] with $c = a$: the integrand has modulus at most $M/r^{n+1}$ and the circle has length $2\pi r$, so $\abs{f^{(n)}(a)}\le\frac{n!}{2\pi}\cdot\frac{M}{r^{n+1}}\cdot2\pi r = \frac{n!\,M}{r^n}$.
:::

::: theorem Liouville's theorem {#thm-liouville}
A bounded entire function is constant.
:::

::: proof
Suppose $\abs{f(z)}\le M$ for all $z\in\C$. For any $a\in\C$ and any $r > 0$, [[#cor-estimates]] with $n = 1$ gives $\abs{f'(a)}\le M/r$. Letting $r\to\infty$, $f'(a) = 0$. So $f' \equiv 0$ on $\C$, and $f$ is constant by [[complex-analysis/analytic-functions#thm-zero-derivative]].
:::

Liouville's theorem has no real analogue: $\sin x$ and $1/(1 + x^2)$ are bounded and infinitely differentiable on $\R$ without being constant. Their complex extensions are not counterexamples — $\sin z$ is unbounded on the imaginary axis, and $1/(1 + z^2)$ is not entire.

::: theorem Fundamental theorem of algebra {#thm-fta}
Every non-constant polynomial with complex coefficients has a root in $\C$. Consequently every polynomial of degree $n\ge1$ factors as $p(z) = a_n(z - z_1)(z - z_2)\cdots(z - z_n)$.
:::

::: proof
Let $p(z) = a_nz^n + \dots + a_1z + a_0$ with $n\ge1$ and $a_n\neq0$. First we show $\abs{p(z)}\to\infty$. For $z\neq0$,

$$
\abs{p(z)} = \abs{z}^n\left\lvert a_n + \frac{a_{n-1}}{z} + \dots + \frac{a_0}{z^n}\right\rvert,
$$

and the sum of the fractions has modulus at most $\abs{a_n}/2$ when $\abs z\ge R$ for a suitable $R\ge1$ (each of the $n$ fractions is at most $\abs{a_k}/\abs z$). So $\abs{p(z)}\ge\frac12\abs{a_n}\abs z^n\ge\frac12\abs{a_n}R^n$ for $\abs z\ge R$.

Now suppose $p$ has no root. Then $g = 1/p$ is entire. On the closed disc $\abs z\le R$ it is continuous, hence bounded (a continuous function on a compact set); for $\abs z\ge R$, $\abs{g(z)}\le\frac{2}{\abs{a_n}R^n}$. So $g$ is a bounded entire function, constant by Liouville's theorem, and then $p = 1/g$ is constant — a contradiction.

For the factorisation, if $p(z_1) = 0$, polynomial division gives $p(z) = (z - z_1)q(z)$ with $\deg q = n - 1$ (see [[abstract-algebra/polynomials]]); apply the theorem to $q$ and use induction on $n$.
:::

::: widget complexmap
f: z^3 - 1
mode: domain
x: -2, 2
y: -2, 2
caption: Domain colouring of $p(z) = z^3 - 1$. Its three roots, the cube roots of unity, are the points where all colours meet. Far from the origin $p(z)\approx z^3$, so going once around a large circle the colours run three times through the colour wheel; this winding cannot happen without zeros inside, which is the topological heart of the fundamental theorem of algebra (made precise by the argument principle in [[complex-analysis/residues]]).
:::

::: quiz
An entire function satisfies $\abs{f(z)}\le\dfrac{1}{1 + \abs z}$ for all $z$. What can you conclude?
- [ ] Nothing: Liouville's theorem needs a constant bound
- [ ] $f$ is constant, but the constant could be any $c$ with $\abs c\le1$
- [x] $f(z) = 0$ for all $z$
- [ ] $f$ is a polynomial of degree at most $1$
::: solution
The bound gives $\abs{f(z)}\le1$ everywhere, so $f$ is bounded and hence constant, say $f\equiv c$, by Liouville. Letting $\abs z\to\infty$ in $\abs c\le\frac{1}{1+\abs z}$ forces $c = 0$.
:::
:::

## Morera's theorem and the maximum modulus principle

Cauchy's theorem has a converse, which is the most convenient way to prove that a function defined by a limit or an integral is analytic.

::: theorem Morera's theorem {#thm-morera}
Let $f$ be continuous on an open set $U$, and suppose $\oint_{\partial T}f\,dz = 0$ for every triangle $T\subseteq U$. Then $f$ is analytic on $U$.
:::

::: proof
Analyticity is a local property, so it suffices to prove it on each open disc $D\subseteq U$. The proof of [[#thm-cauchy-disc]] used only the vanishing of integrals around triangles, so it shows that $F(z) = \int_{[c,z]}f(\zeta)\,d\zeta$ is a primitive of $f$ on $D$. Then $F$ is analytic on $D$, so by [[#thm-derivatives]] its derivative $F' = f$ is analytic on $D$.
:::

The mean value property [[#eq-mvp]] says that $f(a)$ is an average of the values of $f$ on circles around $a$. An average cannot exceed all the values it averages, which leads to a striking principle.

::: theorem Maximum modulus principle {#thm-max}
Let $f$ be analytic on a domain $D$. If $\abs f$ attains a maximum value at some point of $D$, then $f$ is constant on $D$. Consequently, if $D$ is bounded and $f$ is continuous on $\overline D$ and analytic on $D$, then $\max_{\overline D}\abs f$ is attained on the boundary of $D$.
:::

::: proof
Let $M = \max_D\abs f$ and $E = \set{z\in D : \abs{f(z)} = M}$, which is non-empty by hypothesis. *$E$ is open.* Let $a\in E$ and choose $R$ with $\overline D(a, R)\subseteq D$. For $0 < r\le R$, the mean value property gives

$$
M = \abs{f(a)} = \left\lvert\frac{1}{2\pi}\int_0^{2\pi}f(a + re^{it})\,dt\right\rvert\le\frac1{2\pi}\int_0^{2\pi}\abs{f(a + re^{it})}\,dt\le M .
$$

So equality holds throughout, and the continuous function $M - \abs{f(a + re^{it})}\ge0$ has integral zero, hence vanishes identically: $\abs f = M$ on every circle $\abs{z - a} = r\le R$, that is, on the disc $D(a, R)$. So $D(a,R)\subseteq E$.

*$E$ is closed in $D$*, since $\abs f$ is continuous. A non-empty subset of a domain that is both open and closed in it is the whole domain (if $z_1\in D\setminus E$, join a point of $E$ to $z_1$ by a polygonal path $\gamma\colon[0,1]\to D$ and let $t^* = \sup\set{t : \gamma(t)\in E}$; closedness gives $\gamma(t^*)\in E$, openness then gives points of $E$ beyond $t^*$ unless $t^* = 1$, and $t^* = 1$ would put $z_1 \in E$). Hence $E = D$, so $\abs f$ is constant on $D$ and $f$ is constant by [[complex-analysis/analytic-functions#cor-rigid]].

For the second statement, $\abs f$ attains a maximum on the compact set $\overline D$. If the maximum were attained only at interior points, $f$ would be constant on $D$ by the first part, and then (by continuity) on $\overline D$, so the maximum would also be attained on the boundary after all.
:::

::: example Locating a maximum {#ex-max-sin}
Find the maximum of $\abs{\sin z}$ over the rectangle $R = \set{x + iy : 0\le x\le2\pi,\ -1\le y\le1}$.
::: solution
$\sin z$ is entire, so by [[#thm-max]] the maximum of $\abs{\sin z}$ over $R$ is attained on the boundary. By [[complex-analysis/elementary-functions#prop-sin]], $\abs{\sin z}^2 = \sin^2x + \sinh^2y$. On the vertical sides $x = 0$ and $x = 2\pi$ this is $\sinh^2y\le\sinh^21$. On the horizontal sides $y = \pm1$ it is $\sin^2x + \sinh^21$, which is largest when $\sin^2x = 1$, giving $1 + \sinh^21 = \cosh^21$. So the maximum is $\cosh1\approx1.543$, attained at the four boundary points $\frac\pi2\pm i$ and $\frac{3\pi}{2}\pm i$. (Here we can also see directly that the maximum is on the boundary: for fixed $x$, $\sinh^2y$ increases with $\abs y$.)
:::
:::

::: warning Hypotheses matter
Each theorem in this chapter has hypotheses that cannot be dropped. Cauchy's theorem fails for $1/z$ around the unit circle because $1/z$ is not analytic at $0$, which is *inside* the curve — analyticity on the curve alone is not enough. The integral formula needs $a$ *inside* the circle; for $a$ outside, $\oint\frac{f(z)}{z - a}\,dz = 0$ instead. Liouville needs $f$ to be bounded on *all* of $\C$; $e^z$ is bounded on the left half-plane and $\sin z$ on the real axis, and neither is constant. The maximum modulus principle is about $\abs f$, not $\operatorname{Re} f$ or $f$ itself (there is no maximum principle for complex values), though harmonic functions such as $\operatorname{Re} f$ do satisfy their own maximum principle.
:::

::: application Computing derivatives by integration
Formula [[#eq-cif-n]] turns differentiation, which amplifies rounding errors, into integration, which smooths them. To compute the Taylor coefficients $f^{(n)}(a)/n!$ numerically, sample $f$ at $N$ equally spaced points $a + re^{2\pi ik/N}$ on a circle and apply the trapezoidal rule to the integral. For periodic analytic integrands the trapezoidal rule converges geometrically fast, so a few dozen points often give coefficients to full machine precision. The same idea, applied to the integral formula for a matrix function $f(A) = \frac{1}{2\pi i}\oint f(z)(zI - A)^{-1}\,dz$, is used to compute matrix exponentials and to locate eigenvalues; see [[numerical-analysis/numerical-integration]].
:::

::: history
Cauchy proved the integral theorem in his memoir of 1825 on integrals between imaginary limits, assuming (as all mathematicians then did) that the derivative is continuous, and he published the integral formula and its consequence that analytic functions have power series in 1831, while in exile in Turin. Cauchy also proved in 1844 that a bounded entire function is constant; the theorem is named after Joseph Liouville, who used it in his lectures on elliptic functions. Édouard Goursat showed in 1900 that the continuity of $f'$ is unnecessary, and Alfred Pringsheim recast the proof in terms of triangles in 1901. Giacinto Morera published his converse in 1886. The first proofs of the fundamental theorem of algebra, by d'Alembert (1746) and Gauss (1799), had gaps by modern standards; the proof via Liouville's theorem is one of the shortest known.
:::

## Where this leads

Cauchy's integral formula is the foundation of everything that follows. In [[complex-analysis/laurent-series]] we expand $\frac{1}{z - a}$ in a geometric series inside [[#eq-cif]] to show that every analytic function is the sum of its Taylor series, and on annuli we obtain Laurent series. In [[complex-analysis/residues]] the integral around a contour is reduced to the coefficients of $(z - a)^{-1}$ at the singularities inside — the residue theorem — which evaluates real integrals and counts zeros. The maximum modulus principle reappears in the Schwarz lemma of [[complex-analysis/conformal-maps]], and the mean value property and the maximum principle for harmonic functions are central in [[pde/laplace-equation]].

::: summary
- Cauchy–Goursat: if $f$ is analytic on an open set containing a triangle, its integral around the triangle is zero ([[#thm-goursat]]); the proof subdivides and uses differentiability at one point.
- On a disc or convex set, an analytic function has a primitive, so all closed contour integrals vanish; one exceptional point of continuity is allowed ([[#thm-cauchy-disc]]). In general, contours may be deformed across regions of analyticity.
- Cauchy's integral formula: $f(a) = \frac{1}{2\pi i}\oint\frac{f(z)}{z-a}\,dz$ for $a$ inside the circle; in particular $f(c)$ is the average of $f$ over circles centred at $c$.
- Analytic functions are infinitely differentiable, with $f^{(n)}(a) = \frac{n!}{2\pi i}\oint\frac{f(z)}{(z - a)^{n+1}}\,dz$, and Cauchy's estimates $\abs{f^{(n)}(a)}\le n!M/r^n$.
- Liouville: bounded entire functions are constant. Hence every non-constant polynomial has a complex root.
- Morera: continuity plus vanishing integrals around triangles implies analyticity.
- Maximum modulus: a non-constant analytic function on a domain has no interior maximum of $\abs f$.
:::

## Exercises

::: exercise The integral formula {level=1 check="e"}
Compute $\dfrac{1}{2\pi i}\displaystyle\oint_{\abs z = 2}\frac{e^z}{z - 1}\,dz$.
::: solution
By [[#thm-cif]] with $f = \exp$ and $a = 1$ inside $\abs z = 2$, the value is $e^1 = e$.
:::
:::

::: exercise A polynomial numerator {level=1 check="5"}
Compute $\dfrac{1}{2\pi i}\displaystyle\oint_{\abs z = 3}\frac{z^2 + 1}{z - 2}\,dz$.
::: solution
$f(z) = z^2 + 1$ is entire and $2$ lies inside $\abs z = 3$, so the value is $f(2) = 5$.
:::
:::

::: exercise A second derivative {level=1 check="9/2"}
Compute $\dfrac{1}{2\pi i}\displaystyle\oint_{\abs z = 1}\frac{e^{3z}}{z^3}\,dz$.
::: solution
By [[#eq-cif-n]] with $n = 2$ and $f(z) = e^{3z}$, the value is $\frac{f''(0)}{2!} = \frac{9}{2}$.
:::
:::

::: exercise Choosing the circle {level=2 check="1"}
Let $\gamma_1$ be the circle $\abs{z - 1} = 1$ and $\gamma_2$ the circle $\abs z = 2$. Compute $\dfrac{1}{\pi i}\displaystyle\oint_{\gamma_1}\frac{dz}{z^2 - 1}$, and show that $\displaystyle\oint_{\gamma_2}\frac{dz}{z^2 - 1} = 0$.
::: solution
Inside $\gamma_1$ only the zero $z = 1$ of $z^2 - 1$ lies ($-1$ is at distance $2$ from the centre). Write $\frac{1}{z^2-1} = \frac{f(z)}{z - 1}$ with $f(z) = \frac1{z+1}$, which is analytic on the open disc $D(1, 2)$ containing the closed disc $\abs{z - 1}\le1$. Then $\oint_{\gamma_1} = 2\pi if(1) = 2\pi i\cdot\frac12 = \pi i$, and dividing by $\pi i$ gives $1$. For $\gamma_2$, both $\pm1$ are inside; with $\frac{1}{z^2 - 1} = \frac12\big(\frac{1}{z - 1} - \frac{1}{z + 1}\big)$ and [[#lem-off-centre]] applied to each term, we get $\frac12(2\pi i - 2\pi i) = 0$.
:::
:::

::: exercise A real integral from the mean value property {level=2 check="2*pi"}
Show that $\displaystyle\int_0^{2\pi}e^{\cos t}\cos(\sin t)\,dt = 2\pi$.
::: hint
Apply the mean value property [[#eq-mvp]] to $f(z) = e^z$ on the unit circle, and take real parts.
:::
::: solution
By [[#eq-mvp]] with $f(z) = e^z$, $c = 0$ and $r = 1$:

$$
1 = e^0 = \frac{1}{2\pi}\int_0^{2\pi}e^{e^{it}}\,dt = \frac1{2\pi}\int_0^{2\pi}e^{\cos t}\big(\cos(\sin t) + i\sin(\sin t)\big)\,dt .
$$

Taking real parts gives $\int_0^{2\pi}e^{\cos t}\cos(\sin t)\,dt = 2\pi$ (and the imaginary part shows $\int_0^{2\pi}e^{\cos t}\sin(\sin t)\,dt = 0$).
:::
:::

::: exercise Maximum on the disc {level=2 check="3"}
Find $\max\set{\abs{z^2 + 2z} : \abs z\le1}$.
::: solution
By [[#thm-max]] the maximum is attained on the circle $\abs z = 1$. There $\abs{z^2 + 2z} = \abs z\,\abs{z + 2} = \abs{z + 2}\le\abs z + 2 = 3$, with equality at $z = 1$. So the maximum is $3$.
:::
:::

::: exercise A one-sided bound {level=2}
Let $f$ be entire with $\operatorname{Re} f(z)\le0$ for all $z$. Prove that $f$ is constant.
::: hint
Consider $g = e^f$.
:::
::: solution
$g = e^{f}$ is entire and $\abs{g(z)} = e^{\operatorname{Re} f(z)}\le e^0 = 1$, so $g$ is constant by Liouville's theorem. Then $0 = g' = f'e^f$, and since $e^f$ never vanishes, $f' = 0$ on $\C$, so $f$ is constant.
:::
:::

::: exercise Doubly periodic entire functions {level=2}
Let $f$ be entire with $f(z + 1) = f(z)$ and $f(z + i) = f(z)$ for all $z$. Prove that $f$ is constant.
::: solution
Every $z = x + iy$ can be moved by integer steps $1$ and $i$ into the closed unit square $S = \set{x + iy : 0\le x, y\le1}$: $z - \lfloor x\rfloor - i\lfloor y\rfloor\in S$, and $f$ takes the same value there. So $f(\C) = f(S)$. Since $S$ is compact and $f$ is continuous, $f(S)$ is bounded. Hence $f$ is a bounded entire function, constant by Liouville. (Non-constant doubly periodic functions, the *elliptic functions*, must therefore have poles.)
:::
:::

::: exercise Polynomial growth {#exr-poly-growth level=3}
Let $f$ be entire, and suppose there are constants $C$, $R$ and an integer $n\ge0$ with $\abs{f(z)}\le C\abs z^n$ for $\abs z\ge R$. Prove that $f$ is a polynomial of degree at most $n$.
::: hint
Use Cauchy's estimates for $f^{(n+1)}(a)$ on circles of radius $r\to\infty$.
:::
::: solution
Fix $a\in\C$. For $r > R + \abs a$, every $z$ with $\abs{z - a} = r$ has $\abs z\ge r - \abs a > R$, so $\abs{f(z)}\le C\abs z^n\le C(r + \abs a)^n$. By [[#cor-estimates]],

$$
\abs{f^{(n+1)}(a)}\le\frac{(n+1)!\,C(r + \abs a)^n}{r^{n+1}}\longrightarrow0 \qquad (r\to\infty).
$$

So $f^{(n+1)}\equiv0$ on $\C$. Then $f^{(n)}$ has zero derivative, so it is constant; integrating repeatedly (each time using [[complex-analysis/analytic-functions#thm-zero-derivative]] for the difference of $f^{(k)}$ and a polynomial of degree at most $n - k$ with the same derivative), $f$ is a polynomial of degree at most $n$. Liouville's theorem is the case $n = 0$.
:::
:::

::: exercise Uniform limits of analytic functions {#exr-uniform-limits level=3}
Let $f_n$ be analytic on an open set $U$, and suppose $f_n\to f$ uniformly on every closed disc contained in $U$. Prove that $f$ is analytic on $U$. Show by an example that the corresponding statement for real differentiable functions on an interval is false.
::: hint
Use Morera's theorem.
:::
::: solution
$f$ is continuous on $U$, being locally a uniform limit of continuous functions. Let $D$ be an open disc with $\overline D\subseteq U$ and $T\subseteq D$ a triangle. By [[#thm-goursat]], $\oint_{\partial T}f_n\,dz = 0$ for each $n$, and since $f_n\to f$ uniformly on $\partial T\subseteq\overline D$, [[complex-analysis/contour-integrals#cor-uniform]] gives $\oint_{\partial T}f\,dz = \lim_n\oint_{\partial T}f_n\,dz = 0$. By Morera's theorem ([[#thm-morera]]) $f$ is analytic on $D$, and every point of $U$ lies in such a disc. In the real case, $f_n(x) = \sqrt{x^2 + 1/n}$ is differentiable on $\R$ and converges uniformly to $\abs x$ (since $0\le\sqrt{x^2 + 1/n} - \abs x\le1/\sqrt n$), which is not differentiable at $0$.
:::
:::

::: exercise The minimum modulus principle {level=3}
Let $f$ be analytic and **nowhere zero** on a domain $D$. Prove that if $\abs f$ attains a minimum at a point of $D$, then $f$ is constant. Show by an example that the hypothesis "nowhere zero" is needed, and deduce another proof of the fundamental theorem of algebra.
::: solution
Since $f$ has no zeros, $g = 1/f$ is analytic on $D$, and $\abs g = 1/\abs f$ attains a maximum where $\abs f$ attains its minimum. By [[#thm-max]], $g$ is constant, hence so is $f$. Without the hypothesis the statement fails: $f(z) = z$ on the unit disc has $\abs f$ minimal (zero) at $0$ but is not constant. For the fundamental theorem: if a polynomial $p$ of degree $n\ge1$ had no zeros, then on a large disc $\abs z\le R$ chosen so that $\abs{p(z)} > \abs{p(0)}$ for $\abs z = R$ (possible since $\abs p\to\infty$), the minimum of $\abs p$ over the closed disc would be attained at an interior point; by the minimum modulus principle $p$ would be constant, a contradiction.
:::
:::
