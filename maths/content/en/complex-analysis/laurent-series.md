Real Taylor series hold two well-known puzzles. The function $\frac{1}{1 + x^2}$ is infinitely differentiable on the whole real line and perfectly tame, yet its Taylor series at $0$,

$$
\frac{1}{1 + x^2} = 1 - x^2 + x^4 - x^6 + \cdots,
$$

converges only for $\abs x < 1$. Nothing happens at $x = \pm1$ to explain this. Second, the function equal to $e^{-1/x^2}$ for $x\neq0$ and $0$ at $0$ is infinitely differentiable with every derivative zero at $0$, so its Taylor series is identically zero — and does not represent the function at all. Real analysis offers no explanation of either phenomenon. Complex analysis explains both at once. The function $\frac{1}{1 + z^2}$ has poles at $z = \pm i$, at distance exactly $1$ from the origin, and a power series cannot converge on a disc containing a pole. And $e^{-1/z^2}$ is not even continuous at $z = 0$ in the complex plane (along the imaginary axis it blows up), so there is no reason for it to have a Taylor series there.

In this chapter we prove that every analytic function equals the sum of its Taylor series on the largest disc where it is analytic. Consequences include the **identity theorem**: an analytic function on a domain is determined by its values on any set with a limit point in the domain. We then extend Taylor series to **Laurent series**, which allow negative powers and represent functions on annuli, and use them to classify **isolated singularities** as removable singularities, poles or essential singularities.

## Power series in the complex plane

A **power series** about $a$ is a series $\sum_{n=0}^\infty c_n(z - a)^n$ with complex coefficients. You met real power series in [[calculus-2/power-series]]; the theory carries over to complex numbers almost unchanged, and the region of convergence becomes a disc.

::: theorem Disc of convergence {#thm-radius}
For every power series $\sum c_n(z - a)^n$ there is $R\in[0,\infty]$, the **radius of convergence**, such that the series converges absolutely for $\abs{z - a} < R$ and diverges for $\abs{z - a} > R$. Convergence is uniform on every closed disc $\abs{z - a}\le r$ with $r < R$. Moreover

$$
\frac1R = \limsup_{n\to\infty}\abs{c_n}^{1/n} \qquad\text{(Cauchy–Hadamard)},
$$

and if $\abs{c_{n+1}/c_n}$ has a limit $L$, then $R = 1/L$.
:::

::: proof
*Abel's lemma.* Suppose the series converges at some $z_1\neq a$. Then its terms tend to $0$, so $\abs{c_n}\abs{z_1 - a}^n\le K$ for some $K$ and all $n$. If $\abs{z - a}\le r < \abs{z_1 - a}$, put $q = r/\abs{z_1 - a} < 1$; then

$$
\abs{c_n(z - a)^n}\le\abs{c_n}\abs{z_1 - a}^nq^n\le Kq^n,
$$

and $\sum Kq^n < \infty$, so by the Weierstrass M-test the series converges absolutely and uniformly on $\abs{z - a}\le r$.

Now let $R$ be the supremum of $\abs{z - a}$ over all points $z$ where the series converges. If $\abs{z - a} < R$, there is a point $z_1$ of convergence with $\abs{z_1 - a} > \abs{z - a}$, and Abel's lemma gives absolute convergence at $z$, uniformly on $\abs{z - a}\le r$ for any $r < \abs{z_1 - a}$; since such $z_1$ exist for every $r < R$, convergence is uniform on each closed disc of radius $r < R$. If $\abs{z - a} > R$ the series diverges, by definition of $R$. The formulas for $R$ follow from the root and ratio tests for absolute convergence exactly as in the real case ([[calculus-2/power-series]]).
:::

On the circle $\abs{z - a} = R$ itself anything can happen: $\sum z^n$ diverges at every point of the unit circle, $\sum z^n/n^2$ converges at every point, and $\sum z^n/n$ converges at every point except $z = 1$.

::: theorem Power series are analytic {#thm-series-analytic}
If $\sum c_n(z - a)^n$ has radius of convergence $R > 0$, its sum $f$ is analytic on $D(a, R)$, and it may be differentiated term by term:

$$
f'(z) = \sum_{n=1}^\infty nc_n(z - a)^{n-1}\qquad(\abs{z - a} < R).
$$

Consequently $f$ has derivatives of all orders and $c_n = \dfrac{f^{(n)}(a)}{n!}$; in particular the coefficients of a power series are determined by its sum.
:::

::: proof
The partial sums $S_N$ are polynomials and converge to $f$ uniformly on every closed disc $\abs{z - a}\le r < R$ ([[#thm-radius]]); in particular $f$ is continuous on $D(a,R)$. If $T$ is a triangle in $D(a, R)$, then $\partial T$ lies in such a closed disc, so by [[complex-analysis/contour-integrals#cor-uniform]] and Cauchy–Goursat, $\oint_{\partial T}f\,dz = \lim_N\oint_{\partial T}S_N\,dz = 0$. By Morera's theorem ([[complex-analysis/cauchy-theorem#thm-morera]]), $f$ is analytic on $D(a,R)$. To compute $f'$, fix $w$ with $\abs{w - a} < r < R$. By Cauchy's formula for derivatives ([[complex-analysis/cauchy-theorem#thm-derivatives]]) applied to $f$ and to $S_N$, and uniform convergence on the circle $\abs{z - a} = r$ ([[complex-analysis/contour-integrals#cor-uniform]]),

$$
f'(w) = \frac{1}{2\pi i}\oint_{\abs{z-a}=r}\frac{f(z)}{(z - w)^2}\,dz = \lim_{N\to\infty}\frac{1}{2\pi i}\oint_{\abs{z-a}=r}\frac{S_N(z)}{(z - w)^2}\,dz = \lim_{N\to\infty}S_N'(w),
$$

which is the term-by-term derivative. Repeating, $f^{(k)}(a) = k!\,c_k$, because all other terms of the $k$-times differentiated series vanish at $z = a$.
:::

## Taylor's theorem

Now the converse, which has no counterpart for real functions.

::: theorem Taylor's theorem {#thm-taylor}
Let $f$ be analytic on the disc $D(a, R)$ (where $R = \infty$ is allowed). Then

$$
f(z) = \sum_{n=0}^\infty c_n(z - a)^n \quad\text{for all } z \in D(a,R), \qquad c_n = \frac{f^{(n)}(a)}{n!} = \frac{1}{2\pi i}\oint_{\abs{\zeta - a} = r}\frac{f(\zeta)}{(\zeta - a)^{n+1}}\,d\zeta,
$$ {#eq-taylor}

for any $0 < r < R$. In particular the radius of convergence of the Taylor series is at least $R$.
:::

::: proof
Fix $z\in D(a, R)$ and choose $r$ with $\abs{z - a} < r < R$. Cauchy's integral formula on the circle $C$: $\abs{\zeta - a} = r$ gives

$$
f(z) = \frac{1}{2\pi i}\oint_C\frac{f(\zeta)}{\zeta - z}\,d\zeta .
$$

For $\zeta\in C$, put $q = \abs{z - a}/r < 1$ and expand as in [[complex-analysis/cauchy-theorem#lem-off-centre]]:

$$
\frac{1}{\zeta - z} = \frac{1}{(\zeta - a) - (z - a)} = \sum_{n=0}^\infty\frac{(z - a)^n}{(\zeta - a)^{n+1}} .
$$

With $M = \max_C\abs f$, the $n$-th term of $\frac{f(\zeta)}{\zeta - z}$ expanded this way has modulus at most $Mq^n/r$ on $C$, so the series converges uniformly on $C$ and can be integrated term by term:

$$
f(z) = \sum_{n=0}^\infty\Big(\frac{1}{2\pi i}\oint_C\frac{f(\zeta)}{(\zeta - a)^{n+1}}\,d\zeta\Big)(z - a)^n .
$$

By [[complex-analysis/cauchy-theorem#eq-cif-n]] the coefficient is $f^{(n)}(a)/n!$, which does not depend on $r$. So the Taylor series converges to $f(z)$ at every point of $D(a, R)$.
:::

Combining the two theorems: **a function is analytic on an open set if and only if it is locally the sum of a convergent power series.** This is why "analytic" (originally meaning "given by power series") and "holomorphic" (complex differentiable) are used interchangeably.

::: corollary The radius is the distance to the nearest singularity {#cor-radius}
If $f$ is analytic on a domain $D$ and $a\in D$, the Taylor series of $f$ about $a$ converges to $f$ on the largest open disc centred at $a$ contained in $D$. If $f$ cannot be extended analytically to any larger disc around $a$ — for instance because $\abs f\to\infty$ at a point of the boundary circle — the radius of convergence is exactly the radius of that disc.
:::

::: proof
The first statement is [[#thm-taylor]] applied to the largest disc $D(a,R)\subseteq D$. For the second, if the radius of convergence $\rho$ were larger than $R$, the sum of the series would be an analytic function on $D(a,\rho)$ ([[#thm-series-analytic]]) extending $f$, which is excluded.
:::

So $\frac{1}{1 + z^2}$, analytic except at $\pm i$ where it blows up, has Taylor series of radius $1$ about $0$ — the explanation of the real puzzle — and of radius $\abs{1 - i} = \sqrt2$ about $a = 1$.

::: widget taylor
f: 1/(1 + x^2)
a: 0
n: 10
x: -2, 2
y: -1, 2
caption: Taylor polynomials of $\frac{1}{1+x^2}$ about $0$. Raise the degree: inside $(-1, 1)$ the polynomials hug the graph ever more closely, outside they swing away wildly — although the real graph is perfectly smooth at $x = \pm1$. Move the centre $a$: the interval of convergence becomes $(a - \sqrt{1 + a^2},\ a + \sqrt{1 + a^2})$, because its radius is the distance from $a$ to the complex poles $\pm i$.
:::

::: example Taylor series by partial fractions {#ex-partial-fractions}
Find the Taylor series of $f(z) = \dfrac{1}{z^2 - 3z + 2}$ about $0$, and its radius of convergence.
::: solution
Factor and split: $z^2 - 3z + 2 = (z - 1)(z - 2)$ and

$$
f(z) = \frac{1}{z - 2} - \frac{1}{z - 1} = \frac{1}{1 - z} - \frac12\cdot\frac{1}{1 - z/2} .
$$

For $\abs z < 1$ both geometric series converge, and

$$
f(z) = \sum_{n=0}^\infty z^n - \sum_{n=0}^\infty\frac{z^n}{2^{n+1}} = \sum_{n=0}^\infty\Big(1 - \frac{1}{2^{n+1}}\Big)z^n = \frac12 + \frac34z + \frac78z^2 + \cdots
$$

By uniqueness of coefficients ([[#thm-series-analytic]]) this *is* the Taylor series. Its radius of convergence is $1$, the distance from $0$ to the nearest pole $z = 1$, as [[#cor-radius]] predicts. (Directly: $c_{n+1}/c_n\to1$.)
:::
:::

::: quiz
What is the radius of convergence of the Taylor series of $\dfrac{1}{z^2 + 4}$ about $z = 1$?
- [ ] $1$
- [ ] $2$
- [x] $\sqrt5$
- [ ] $3$
::: solution
By [[#cor-radius]] the radius is the distance from $1$ to the nearest point where the function fails to be analytic. The poles are $\pm2i$, and $\abs{1 - 2i} = \abs{1 + 2i} = \sqrt5$.
:::
:::

## Zeros and the identity theorem

Power series make the local structure of zeros transparent.

::: definition Order of a zero {#def-zero-order}
Let $f$ be analytic near $a$ with $f(a) = 0$, and not identically zero near $a$. The **order** (or multiplicity) of the zero is the smallest $m\ge1$ with $f^{(m)}(a)\neq0$. Equivalently, $f(z) = (z - a)^mg(z)$ with $g$ analytic near $a$ and $g(a)\neq0$.
:::

The equivalence comes from the Taylor series: if $c_0 = \dots = c_{m-1} = 0\neq c_m$, then $f(z) = (z - a)^m\sum_{k\ge0}c_{m+k}(z - a)^k$, and the last series defines an analytic $g$ with $g(a) = c_m\neq0$. For example $z - \sin z = \frac{z^3}{6} - \frac{z^5}{120} + \cdots$ has a zero of order $3$ at $0$.

::: theorem Zeros are isolated {#thm-isolated-zeros}
Let $f$ be analytic on a domain $D$ and not identically zero. Then every zero $a$ of $f$ has finite order, and there is $r > 0$ such that $f(z)\neq0$ for $0 < \abs{z - a} < r$.
:::

::: proof
Let $E$ be the set of points $z\in D$ at which $f$ and all its derivatives vanish. *$E$ is open*: if $z_0\in E$, the Taylor series of $f$ about $z_0$ is identically zero, so by [[#thm-taylor]] $f = 0$ on a disc around $z_0$, and then all derivatives vanish on that disc too. *$E$ is closed in $D$*: it is the intersection of the closed sets $\set{f^{(n)} = 0}$. As in the proof of the maximum modulus principle ([[complex-analysis/cauchy-theorem#thm-max]]), a subset of a domain that is open and closed is empty or everything. It is not everything, since $f\not\equiv0$; so $E = \emptyset$. Hence at each zero $a$ some derivative is non-zero, the zero has a finite order $m$, and $f(z) = (z - a)^mg(z)$ with $g(a)\neq0$. By continuity $g\neq0$ on a disc $D(a, r)$, and there $f(z)\neq0$ for $z\neq a$.
:::

::: theorem Identity theorem {#thm-identity}
Let $f$ and $g$ be analytic on a domain $D$. If $f(z) = g(z)$ for all $z$ in a set $S\subseteq D$ that has a limit point in $D$, then $f = g$ on all of $D$.
:::

::: proof
Let $h = f - g$ and let $a\in D$ be a limit point of $S$. There are points $s_n\in S$, $s_n\neq a$, with $s_n\to a$, and $h(s_n) = 0$; by continuity $h(a) = 0$. So $a$ is a zero of $h$ that is not isolated. By [[#thm-isolated-zeros]], $h$ must be identically zero on $D$.
:::

The identity theorem is the reason analytic functions are so rigid: values on a segment, or on a convergent sequence of points, determine the function everywhere on a domain. It also guarantees that identities proved for real arguments remain true for complex ones. For example, $\sin^2z + \cos^2z - 1$ is entire and vanishes on $\R$, so it vanishes on $\C$; and $e^{z+w} = e^ze^w$ for real $z, w$ extends first to complex $z$ (fix real $w$) and then to complex $w$.

::: example Determining a function from a sequence {#ex-identity}
(a) Find all functions $f$ analytic on the unit disc with $f(1/n) = 1/n^2$ for all $n\ge2$. (b) Is there an analytic function on the unit disc with $f(1/n) = (-1)^n/n$ for all $n\ge2$?
::: solution
(a) $g(z) = z^2$ satisfies $g(1/n) = 1/n^2$. The set $S = \set{1/n : n\ge2}$ has the limit point $0$, which lies in the disc, so by [[#thm-identity]] $f = g$: the only such function is $f(z) = z^2$.

(b) No. Along the even integers $n = 2k$ we would have $f(1/2k) = 1/2k$, and the set $\set{1/2k}$ accumulates at $0$, so $f(z) = z$ by the identity theorem. But then $f(1/3) = 1/3\neq-1/3$. In contrast, values at the points $1/n$ do not determine a *smooth real* function: $x^2 + e^{-1/x^2}\sin(\pi/x)$, with value $0$ at $x = 0$, is infinitely differentiable on $\R$ and equals $1/n^2$ at every $x = 1/n$, yet it is not $x^2$ — another way in which real smoothness is much weaker than complex analyticity.
:::
:::

::: warning The limit point must be inside the domain
The function $\sin(1/z)$ is analytic on $\C\setminus\set0$ and vanishes at the points $1/(k\pi)$, which accumulate at $0$. It is not identically zero — this does not contradict [[#thm-identity]], because the limit point $0$ is not in the domain. Similarly, two analytic functions that agree on a sequence tending to the boundary of their domain need not agree.
:::

## Laurent series

A function such as $\frac{e^z}{z^2}$ or $e^{1/z}$ is analytic on a punctured disc but not at its centre, so it has no Taylor series there. Allowing negative powers repairs this.

::: lemma Circles in an annulus {#lem-annulus}
Let $g$ be analytic on the annulus $A = \set{z : r < \abs{z - a} < R}$. Then $I(\rho) = \oint_{\abs{z - a} = \rho}g(z)\,dz$ is the same for all $\rho\in(r, R)$.
:::

::: proof
Write $I(\rho) = \int_0^{2\pi}g(a + \rho e^{it})\,i\rho e^{it}\,dt$. The integrand has a continuous partial derivative in $\rho$ (because $g'$ is continuous, [[complex-analysis/cauchy-theorem#thm-derivatives]]), so we may differentiate under the integral sign:

$$
I'(\rho) = \int_0^{2\pi}\Big(g'(a + \rho e^{it})\,e^{it}\cdot i\rho e^{it} + g(a + \rho e^{it})\,ie^{it}\Big)\,dt = \int_0^{2\pi}\frac{\partial}{\partial t}\Big(g(a + \rho e^{it})\,e^{it}\Big)\,dt = 0,
$$

since the function $t\mapsto g(a + \rho e^{it})e^{it}$ has period $2\pi$. So $I$ is constant on $(r, R)$.
:::

::: theorem Laurent expansion {#thm-laurent}
Let $f$ be analytic on the annulus $A = \set{z : r < \abs{z - a} < R}$, where $0\le r < R\le\infty$. Then

$$
f(z) = \sum_{n=-\infty}^{\infty}c_n(z - a)^n, \qquad c_n = \frac{1}{2\pi i}\oint_{\abs{\zeta - a} = \rho}\frac{f(\zeta)}{(\zeta - a)^{n+1}}\,d\zeta \quad (r < \rho < R),
$$ {#eq-laurent}

where both $\sum_{n\ge0}$ and $\sum_{n<0}$ converge absolutely in $A$ and uniformly on every closed sub-annulus $r < \rho_1\le\abs{z - a}\le\rho_2 < R$. The coefficients do not depend on $\rho$, and the expansion is unique: any series $\sum b_n(z-a)^n$ converging to $f$ on $A$ in this way has $b_n = c_n$.
:::

::: proof
*An integral formula on the annulus.* Fix $z\in A$ and radii $r < \rho_1 < \abs{z - a} < \rho_2 < R$; write $C_1, C_2$ for the circles of radii $\rho_1, \rho_2$ about $a$. The function $g(\zeta) = \frac{f(\zeta) - f(z)}{\zeta - z}$ (with $g(z) = f'(z)$) is continuous on $A$ and analytic except possibly at $z$, hence analytic on $A$ by Morera's theorem and [[complex-analysis/cauchy-theorem#lem-goursat-point]]. By [[#lem-annulus]], $\oint_{C_2}g = \oint_{C_1}g$. Now $\oint_{C_2}\frac{d\zeta}{\zeta - z} = 2\pi i$ ([[complex-analysis/cauchy-theorem#lem-off-centre]]), while $\oint_{C_1}\frac{d\zeta}{\zeta - z} = 0$ because $\frac{1}{\zeta - z}$ is analytic on the disc $\abs{\zeta - a} < \abs{z - a}$, which contains $C_1$. Substituting the definition of $g$,

$$
f(z) = \frac{1}{2\pi i}\oint_{C_2}\frac{f(\zeta)}{\zeta - z}\,d\zeta - \frac{1}{2\pi i}\oint_{C_1}\frac{f(\zeta)}{\zeta - z}\,d\zeta .
$$

*Expanding.* On $C_2$, $\abs{z - a} < \abs{\zeta - a}$, and as in [[#thm-taylor]] $\frac{1}{\zeta - z} = \sum_{n\ge0}\frac{(z - a)^n}{(\zeta - a)^{n+1}}$ uniformly on $C_2$. On $C_1$, $\abs{\zeta - a} < \abs{z - a}$, and the roles are reversed:

$$
-\frac{1}{\zeta - z} = \frac{1}{(z - a) - (\zeta - a)} = \sum_{m\ge0}\frac{(\zeta - a)^m}{(z - a)^{m+1}},
$$

uniformly on $C_1$. Integrating term by term,

$$
f(z) = \sum_{n\ge0}\Big(\frac{1}{2\pi i}\oint_{C_2}\frac{f(\zeta)\,d\zeta}{(\zeta - a)^{n+1}}\Big)(z - a)^n + \sum_{m\ge0}\Big(\frac{1}{2\pi i}\oint_{C_1}f(\zeta)(\zeta - a)^m\,d\zeta\Big)(z - a)^{-m-1}.
$$

Putting $n = -m-1$ in the second sum, both coefficients have the form [[#eq-laurent]], and by [[#lem-annulus]] (applied to the analytic functions $f(\zeta)(\zeta - a)^{-n-1}$) the circle may be any $\abs{\zeta - a} = \rho$. Convergence of the two parts: the positive part is a power series converging on $D(a, R)$, and the negative part is a power series in $w = 1/(z - a)$ converging for $\abs w < 1/r$; [[#thm-radius]] gives absolute and locally uniform convergence.

*Uniqueness.* If $f(z) = \sum b_n(z - a)^n$ with uniform convergence on the circle $\abs{z - a} = \rho$, multiply by $(z - a)^{-k-1}$ and integrate term by term: by [[complex-analysis/contour-integrals#thm-fundamental]] only $n = k$ survives, giving $\oint f(z)(z - a)^{-k-1}\,dz = 2\pi i\,b_k$, so $b_k = c_k$.
:::

The part $\sum_{n<0}c_n(z - a)^n$ is the **principal part** of the Laurent series. Uniqueness is what makes Laurent series computable in practice: we never use [[#eq-laurent]] directly but manipulate known series, and whatever we obtain by legitimate means *is* the Laurent series.

::: example One function, three Laurent series {#ex-three-laurent}
Expand $f(z) = \dfrac{1}{z(z - 1)}$ in Laurent series on (a) $0 < \abs z < 1$, (b) $\abs z > 1$, (c) $0 < \abs{z - 1} < 1$.
::: solution
(a) For $\abs z < 1$, $\frac{1}{z - 1} = -\sum_{n\ge0}z^n$, so

$$
f(z) = -\frac1z\sum_{n\ge0}z^n = -\frac1z - 1 - z - z^2 - \cdots\qquad(0 < \abs z < 1).
$$

(b) For $\abs z > 1$ we must expand in powers of $1/z$: $\frac{1}{z - 1} = \frac1z\cdot\frac{1}{1 - 1/z} = \sum_{n\ge0}z^{-n-1}$, so

$$
f(z) = \sum_{n\ge0}z^{-n-2} = \frac{1}{z^2} + \frac{1}{z^3} + \frac1{z^4} + \cdots\qquad(\abs z > 1).
$$

(c) Put $w = z - 1$, $0 < \abs w < 1$: $f = \frac{1}{w(1 + w)} = \frac1w\sum_{n\ge0}(-1)^nw^n$, so

$$
f(z) = \frac{1}{z - 1} - 1 + (z - 1) - (z - 1)^2 + \cdots\qquad(0 < \abs{z - 1} < 1).
$$

The same function has different Laurent series on different annuli; each is unique on its own annulus. Notice the coefficient of the inverse first power: $-1$ in (a), $0$ in (b), $1$ in (c). By [[#eq-laurent]] with $n = -1$ it equals $\frac{1}{2\pi i}\oint f$ over a circle in the annulus — this observation is the residue theorem in embryo ([[complex-analysis/residues]]).
:::
:::

## Isolated singularities

::: definition Isolated singularities {#def-singularity}
A point $a$ is an **isolated singularity** of $f$ if $f$ is analytic on a punctured disc $0 < \abs{z - a} < r$ but not (or not known to be) at $a$. Let $\sum c_n(z - a)^n$ be the Laurent series on that punctured disc. The singularity is

1. **removable** if $c_n = 0$ for all $n < 0$;
2. a **pole of order $m$** if $c_{-m}\neq0$ and $c_n = 0$ for all $n < -m$ (a pole of order $1$ is a **simple pole**);
3. **essential** if $c_n\neq0$ for infinitely many $n < 0$.
:::

At a removable singularity, defining $f(a) = c_0$ makes $f$ analytic at $a$ (the Laurent series is then a power series). Typical examples at $a = 0$:

| $f(z)$ | Laurent series about $0$ | type |
|---|---|---|
| $\dfrac{\sin z}{z}$ | $1 - \dfrac{z^2}{6} + \dfrac{z^4}{120} - \cdots$ | removable |
| $\dfrac{\sin z}{z^3}$ | $\dfrac{1}{z^2} - \dfrac16 + \dfrac{z^2}{120} - \cdots$ | pole of order $2$ |
| $\dfrac{1}{e^z - 1}$ | $\dfrac1z - \dfrac12 + \dfrac{z}{12} - \cdots$ | simple pole |
| $e^{1/z}$ | $1 + \dfrac1z + \dfrac{1}{2!\,z^2} + \dfrac{1}{3!\,z^3} + \cdots$ | essential |

Each type can be recognised from the behaviour of $f$ near $a$, without computing the series.

::: theorem Riemann's removable singularity theorem {#thm-removable}
Let $f$ be analytic on $0 < \abs{z - a} < r$. If $(z - a)f(z)\to0$ as $z\to a$ — in particular, if $f$ is bounded near $a$ — then $a$ is a removable singularity.
:::

::: proof
Let $\eps > 0$ and choose $\rho_0$ such that $\abs{(z - a)f(z)} < \eps$ for $0 < \abs{z - a} < \rho_0$. For $n\ge1$ and $0 < \rho < \rho_0$, the ML-inequality applied to [[#eq-laurent]] gives

$$
\abs{c_{-n}} = \left\lvert\frac{1}{2\pi i}\oint_{\abs{\zeta - a} = \rho}f(\zeta)(\zeta - a)^{n-1}\,d\zeta\right\rvert\le\frac{1}{2\pi}\cdot\frac{\eps}{\rho}\,\rho^{n-1}\cdot2\pi\rho = \eps\rho^{n-1}\le\eps\rho_0^{n-1} .
$$

For $n = 1$ this says $\abs{c_{-1}} \le \eps$ for every $\eps$; for $n\ge2$ let $\rho\to0$ in $\eps\rho^{n-1}$. Either way $c_{-n} = 0$.
:::

::: theorem Characterisation of poles {#thm-poles}
Let $a$ be an isolated singularity of $f$ and $m\ge1$. The following are equivalent:

1. $a$ is a pole of order $m$;
2. $f(z) = \dfrac{g(z)}{(z - a)^m}$ near $a$, with $g$ analytic at $a$ and $g(a)\neq0$;
3. $\dfrac1f$ has a removable singularity at $a$ whose extension has a zero of order $m$ at $a$.

Moreover, $a$ is a pole (of some order) if and only if $\abs{f(z)}\to\infty$ as $z\to a$.
:::

::: proof
(1) ⇒ (2): $f(z) = (z - a)^{-m}\sum_{k\ge0}c_{k-m}(z - a)^k$, and the series defines $g$ with $g(a) = c_{-m}\neq0$. (2) ⇒ (1): expand $g$ in its Taylor series and divide by $(z - a)^m$. (2) ⇒ (3): $\frac1f = \frac{(z - a)^m}{g}$, and $\frac1g$ is analytic near $a$ because $g(a)\neq0$. (3) ⇒ (2): if $\frac1f = (z - a)^mh$ with $h$ analytic and $h(a)\neq0$, then $f = \frac{1/h}{(z - a)^m}$.

If $a$ is a pole, (2) gives $\abs{f(z)} = \frac{\abs{g(z)}}{\abs{z - a}^m}\to\infty$. Conversely, if $\abs f\to\infty$, then $f\neq0$ near $a$ and $\frac1f\to0$; by [[#thm-removable]] $\frac1f$ extends analytically with value $0$ at $a$, not identically zero, so the zero has some finite order $m$ by [[#thm-isolated-zeros]], and (3) holds.
:::

At an essential singularity the behaviour is wild.

::: theorem Casorati–Weierstrass theorem {#thm-casorati}
If $a$ is an essential singularity of $f$, then for every $w\in\C$, every $\eps > 0$ and every $\delta > 0$ there is $z$ with $0 < \abs{z - a} < \delta$ and $\abs{f(z) - w} < \eps$. That is, the values of $f$ on any punctured disc around $a$ are dense in $\C$.
:::

::: proof
Suppose not: for some $w$, $\eps$ and $\delta$, $\abs{f(z) - w}\ge\eps$ for all $0 < \abs{z - a} < \delta$. Then $h(z) = \frac{1}{f(z) - w}$ is analytic on that punctured disc and bounded by $1/\eps$, so it has a removable singularity at $a$ ([[#thm-removable]]). If the extended $h$ has $h(a)\neq0$, then $f = w + \frac1h$ is analytic at $a$; if $h(a) = 0$, then $h$ has a zero of finite order (it is not identically zero), and $f = w + \frac1h$ has a pole at $a$ by [[#thm-poles]]. Either way $a$ is not essential — a contradiction.
:::

::: widget complexmap
f: exp(1/z)
mode: domain
x: -0.6, 0.6
y: -0.6, 0.6
caption: Domain colouring of $e^{1/z}$ near its essential singularity at $0$. Zoom in on the origin in your mind: every colour (argument) and every brightness (modulus) occurs in every neighbourhood of $0$ — the Casorati–Weierstrass theorem made visible. Compare a pole, where the picture near the point is a single colour wheel with brightness increasing towards the centre.
:::

In fact much more is true. **Picard's great theorem** (1879) says that in every punctured neighbourhood of an essential singularity, $f$ takes *every* complex value, with at most one exception, infinitely often. For $e^{1/z}$ the exception is $0$: given $w\neq0$, the solutions of $e^{1/z} = w$ are $z = \frac{1}{\Log w + 2\pi ik}$, $k\in\Z$ (with $k\neq0$ when $w = 1$), and they tend to $0$ as $\abs k\to\infty$.

::: example Classifying singularities {#ex-classify}
Find and classify the singularities of (a) $\dfrac{1 - \cos z}{z^4}$, (b) $\dfrac{1}{e^z - 1}$, (c) $z\sin\dfrac1z$.
::: solution
(a) The only singularity is $0$. From $1 - \cos z = \frac{z^2}{2} - \frac{z^4}{24} + \cdots$,

$$
\frac{1 - \cos z}{z^4} = \frac{1}{2z^2} - \frac{1}{24} + \frac{z^2}{720} - \cdots,
$$

a pole of order $2$. (Equivalently: the numerator has a zero of order $2$, the denominator one of order $4$.)

(b) $e^z = 1$ exactly at $z = 2\pi ik$, $k\in\Z$. At each such point the derivative of $e^z - 1$ is $e^{2\pi ik} = 1\neq0$, so $e^z - 1$ has a simple zero, and by [[#thm-poles]](3) $\frac{1}{e^z - 1}$ has a simple pole there.

(c) The only singularity is $0$, and $z\sin\frac1z = z\Big(\frac1z - \frac{1}{3!\,z^3} + \frac{1}{5!\,z^5} - \cdots\Big) = 1 - \frac{1}{6z^2} + \frac{1}{120z^4} - \cdots$ has infinitely many negative powers: an essential singularity. (Notice that $z\sin\frac1z$ is bounded on the *real* axis near $0$, but not on the imaginary axis, where $\sin\frac{1}{iy} = -i\sinh\frac1y$ explodes.)
:::
:::

::: quiz
What kind of singularity does $\dfrac{z}{\sin z}$ have at $z = 0$ and at $z = \pi$?
- [ ] A simple pole at $0$ and a simple pole at $\pi$
- [x] A removable singularity at $0$ and a simple pole at $\pi$
- [ ] A removable singularity at both points
- [ ] An essential singularity at $0$
::: solution
At $0$, $\frac{z}{\sin z}\to1$ (since $\frac{\sin z}{z}\to1$), so it is bounded and the singularity is removable by [[#thm-removable]]. At $\pi$, the numerator is $\pi\neq0$ and $\sin z$ has a simple zero ($\cos\pi = -1\neq0$), so the reciprocal $\frac{\sin z}{z}$ has a simple zero at $\pi$ and $\frac{z}{\sin z}$ has a simple pole there by [[#thm-poles]].
:::
:::

::: application Analytic continuation and the zeta function
The Riemann zeta function is defined by $\zeta(s) = \sum_{n\ge1}n^{-s}$ for $\operatorname{Re} s > 1$, where the series converges. Riemann showed in 1859 that it extends to an analytic function on $\C\setminus\set1$, with a simple pole at $s = 1$. By the identity theorem such an extension is unique, so values such as $\zeta(-1) = -\frac{1}{12}$ are meaningful even though the series diverges there. The location of the zeros of this continuation governs the distribution of prime numbers, and the conjecture that all non-real zeros lie on the line $\operatorname{Re} s = \frac12$ — the Riemann hypothesis — is the most famous open problem in mathematics. The same uniqueness lets physicists and engineers continue functions defined by series or integrals beyond their original domains with confidence.
:::

::: history
Taylor series are named after Brook Taylor (1715), and Cauchy proved in his Turin memoir of 1831 that a complex differentiable function is the sum of its power series on any disc where it is differentiable. Series with negative powers were introduced by Pierre Alphonse Laurent in a memoir submitted to the Paris Academy in 1843; Karl Weierstrass had found the expansion in 1841, but his paper was only published in 1894. The theorem that the values near an essential singularity are dense was published by Felice Casorati and by Yulian Sokhotski in 1868, and by Weierstrass in 1876; Émile Picard's far stronger theorem followed in 1879.
:::

## Where this leads

Laurent series are the raw material of [[complex-analysis/residues]]: the coefficient $c_{-1}$, the **residue**, is the only part of a Laurent series that survives integration around a circle, and the residue theorem turns contour integrals into sums of residues. The classification of singularities tells us how to compute residues, and the behaviour of zeros and poles is counted by the argument principle. The identity theorem underlies analytic continuation, the reflection principle and the uniqueness of solutions to many problems in [[pde]] and mathematical physics.

::: summary
- A power series converges absolutely on a disc $\abs{z - a} < R$ (uniformly on smaller closed discs) and diverges outside; inside, its sum is analytic and can be differentiated term by term.
- Every analytic function on $D(a,R)$ equals its Taylor series there, with $c_n = f^{(n)}(a)/n! = \frac{1}{2\pi i}\oint\frac{f(\zeta)\,d\zeta}{(\zeta - a)^{n+1}}$; the radius of convergence is the distance to the nearest singularity.
- Zeros of a non-zero analytic function on a domain are isolated and have finite orders; if two analytic functions agree on a set with a limit point in the domain, they agree everywhere (identity theorem).
- On an annulus, an analytic function has a unique Laurent expansion $\sum_{n=-\infty}^\infty c_n(z - a)^n$; compute it by manipulating geometric and known series.
- Isolated singularities are removable (bounded near $a$), poles ($\abs f\to\infty$; finitely many negative powers) or essential (infinitely many negative powers).
- Near an essential singularity, $f$ comes arbitrarily close to every value (Casorati–Weierstrass), and in fact takes every value, with at most one exception (Picard).
:::

## Exercises

::: exercise A radius of convergence {level=1 check="3"}
Find the radius of convergence of $\displaystyle\sum_{n=1}^\infty\frac{n^2}{3^n}z^n$.
::: solution
$\abs{c_n}^{1/n} = \frac{n^{2/n}}{3}\to\frac13$, since $n^{1/n}\to1$. By [[#thm-radius]], $R = 3$. (Or by the ratio test: $\frac{c_{n+1}}{c_n} = \frac{(n+1)^2}{3n^2}\to\frac13$.)
:::
:::

::: exercise Radius from the singularities {level=1 check="5"}
Without computing any coefficients, find the radius of convergence of the Taylor series of $\dfrac{1}{z^2 + 9}$ about $z = 4$.
::: solution
The function is analytic except at its poles $\pm3i$, where it blows up. By [[#cor-radius]] the radius is the distance from $4$ to the nearer pole: $\abs{4 - 3i} = \abs{4 + 3i} = 5$.
:::
:::

::: exercise A Laurent coefficient {level=1 check="1/6"}
Find the coefficient of $z^{-1}$ in the Laurent series of $z^2e^{1/z}$ about $0$.
::: solution
$z^2e^{1/z} = z^2\sum_{n\ge0}\frac{1}{n!\,z^n} = \sum_{n\ge0}\frac{z^{2-n}}{n!}$. The power $z^{-1}$ occurs for $n = 3$, with coefficient $\frac{1}{3!} = \frac16$.
:::
:::

::: exercise The order of a zero {level=2 check="3"}
Find the order of the zero of $f(z) = z - \sin z$ at $z = 0$, and of $g(z) = z^2(e^{z} - 1)$ at $0$.
::: solution
$z - \sin z = \frac{z^3}{3!} - \frac{z^5}{5!} + \cdots$, whose first non-zero coefficient is that of $z^3$: order $3$. (Check with derivatives: $f'(0) = 1 - \cos 0 = 0$, $f''(0) = \sin0 = 0$, $f'''(0) = \cos0 = 1\neq0$.) For $g$: $e^z - 1$ has a simple zero, so $g = z^3\cdot\frac{e^z - 1}{z}$ with $\frac{e^z-1}{z}\to1$; order $3$ again.
:::
:::

::: exercise A Taylor coefficient of tan {level=2 check="2/15"}
Find the coefficient of $z^5$ in the Taylor series of $\tan z$ about $0$. What is the radius of convergence of this series?
::: hint
Write $\tan z = c_1z + c_3z^3 + c_5z^5 + \cdots$ (it is odd) and compare coefficients in $\sin z = \tan z\cdot\cos z$.
:::
::: solution
Multiply $(c_1z + c_3z^3 + c_5z^5 + \cdots)\big(1 - \frac{z^2}{2} + \frac{z^4}{24} - \cdots\big)$ and compare with $z - \frac{z^3}{6} + \frac{z^5}{120} - \cdots$:

$$
c_1 = 1, \qquad c_3 - \frac{c_1}{2} = -\frac16\ \Rightarrow\ c_3 = \frac13, \qquad c_5 - \frac{c_3}{2} + \frac{c_1}{24} = \frac{1}{120}\ \Rightarrow\ c_5 = \frac1{120} + \frac16 - \frac1{24} = \frac{2}{15}.
$$

The nearest singularities of $\tan z$ to $0$ are the zeros $\pm\frac\pi2$ of $\cos z$ (simple poles), so the radius of convergence is $\frac\pi2$ by [[#cor-radius]].
:::
:::

::: exercise Laurent series on an annulus {level=2}
Find the Laurent series of $f(z) = \dfrac{1}{(z - 1)(z - 2)}$ on the annulus $1 < \abs z < 2$.
::: solution
By partial fractions $f(z) = \frac{1}{z - 2} - \frac{1}{z - 1}$. On $\abs z < 2$: $\frac{1}{z - 2} = -\frac12\cdot\frac{1}{1 - z/2} = -\sum_{n\ge0}\frac{z^n}{2^{n+1}}$. On $\abs z > 1$: $\frac{1}{z - 1} = \frac1z\cdot\frac{1}{1 - 1/z} = \sum_{n\ge0}z^{-n-1}$. So on $1 < \abs z < 2$,

$$
f(z) = -\sum_{n\ge1}z^{-n} - \sum_{n\ge0}\frac{z^n}{2^{n+1}} = \cdots - \frac{1}{z^2} - \frac1z - \frac12 - \frac z4 - \frac{z^2}{8} - \cdots
$$
:::
:::

::: exercise Classify the singularities {level=2}
Find and classify all singularities of (a) $\dfrac{z}{\sin^2z}$, (b) $\dfrac{e^z - 1}{z^2}$, (c) $\cos\dfrac{1}{z - 1}$.
::: solution
(a) $\sin^2z$ has zeros of order $2$ at $z = k\pi$. At $k = 0$ the numerator has a simple zero, so $\frac{z}{\sin^2z} = \frac{z}{z^2(1 - z^2/6 + \cdots)^2}$ has a simple pole; at $k\neq0$ the numerator is non-zero, so there is a pole of order $2$. (b) Only $z = 0$: $\frac{e^z - 1}{z^2} = \frac1z + \frac12 + \frac{z}{6} + \cdots$, a simple pole. (c) Only $z = 1$: $\cos\frac{1}{w} = 1 - \frac{1}{2w^2} + \frac{1}{24w^4} - \cdots$ with $w = z - 1$ has infinitely many negative powers, an essential singularity.
:::
:::

::: exercise Entire functions that grow {level=3}
Let $f$ be entire with $\abs{f(z)}\to\infty$ as $\abs z\to\infty$. Prove that $f$ is a polynomial.
::: hint
Apply [[#thm-poles]] to $F(w) = f(1/w)$ at $w = 0$, then use the exercise on polynomial growth in [[complex-analysis/cauchy-theorem#exr-poly-growth]].
:::
::: solution
Choose $R > 0$ with $\abs{f(z)}\ge1$ for $\abs z\ge R$, and consider $F(w) = f(1/w)$, which is analytic on $0 < \abs w < 1/R$. As $w\to0$, $\abs{F(w)}\to\infty$, so by [[#thm-poles]] $F$ has a pole at $0$, say of order $m$: $\abs{F(w)}\le C\abs w^{-m}$ for small $\abs w$. Hence $\abs{f(z)}\le C\abs z^m$ for large $\abs z$, and by [[complex-analysis/cauchy-theorem#exr-poly-growth]], $f$ is a polynomial of degree at most $m$.
:::
:::

::: exercise A mild singularity is removable {level=3}
Let $f$ be analytic on $0 < \abs{z - a} < r$ with $\abs{f(z)}\le M\abs{z - a}^{-1/2}$. Prove that the singularity at $a$ is removable. Is the same true with the exponent $-1/2$ replaced by $-1$?
::: solution
$\abs{(z - a)f(z)}\le M\abs{z - a}^{1/2}\to0$, so [[#thm-removable]] applies. With exponent $-1$ the conclusion fails: $f(z) = \frac{1}{z - a}$ satisfies $\abs f\le\abs{z - a}^{-1}$ but has a simple pole. (The proof of [[#thm-removable]] then only gives $c_{-n} = 0$ for $n\ge2$: the singularity is at worst a simple pole.)
:::
:::

::: exercise No zero divisors {level=3}
Let $f$ and $g$ be analytic on a domain $D$ with $f(z)g(z) = 0$ for all $z\in D$. Prove that $f\equiv0$ or $g\equiv0$. Show that the statement fails if $D$ is not connected, and that it fails for infinitely differentiable real functions on $\R$.
::: solution
Suppose $f\not\equiv0$. Then $f(z_0)\neq0$ for some $z_0\in D$, and by continuity $f\neq0$ on a disc $D(z_0, r)$. On that disc $g = 0$. The disc is a set with limit points in $D$, so $g\equiv0$ on $D$ by [[#thm-identity]]. On the disconnected set $D = D(0,1)\cup D(3, 1)$, take $f = 1$ on the first disc and $0$ on the second, and $g = 1 - f$: then $fg = 0$ but neither vanishes identically. On $\R$, let $\phi(x) = e^{-1/x^2}$ for $x > 0$ and $\phi(x) = 0$ for $x\le0$; then $\phi(x)$ and $\phi(-x)$ are smooth, neither is identically zero, and their product is $0$. In the language of [[abstract-algebra/rings]], the analytic functions on a domain form an integral domain, while the smooth functions on $\R$ do not.
:::
:::
