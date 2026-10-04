Try to evaluate

$$
\int_{-\infty}^{\infty}\frac{dx}{1 + x^4}
$$

with the methods of [[calculus-1/integration-techniques]]. The denominator factors over $\R$ as $(x^2 + \sqrt2x + 1)(x^2 - \sqrt2x + 1)$, the partial fractions involve both logarithms and arctangents, and after a page of algebra the answer turns out to be $\pi/\sqrt2$. With the method of this chapter the same answer takes five lines, and integrals such as $\int_0^\infty\frac{\sin x}{x}\,dx = \frac\pi2$, for which no elementary antiderivative exists at all, become routine.

The method rests on one theorem. If $f$ is analytic inside a closed contour except at finitely many isolated singularities, then the integral of $f$ around the contour is $2\pi i$ times the sum of the **residues** of $f$ at those singularities — the coefficients of $(z - a)^{-1}$ in its Laurent series. Since residues can usually be computed by differentiation and algebra, contour integrals become a matter of bookkeeping. In this chapter we prove the **residue theorem**, apply it systematically to real integrals, and then turn it on the function $f'/f$ to count zeros and poles: the **argument principle** and **Rouché's theorem**.

## Residues

::: definition Residue {#def-residue}
Let $a$ be an isolated singularity of $f$, with Laurent series $f(z) = \sum_{n=-\infty}^\infty c_n(z - a)^n$ on a punctured disc $0 < \abs{z - a} < r$. The **residue** of $f$ at $a$ is

$$
\Res_{z = a}f(z) = c_{-1} = \frac{1}{2\pi i}\oint_{\abs{z - a} = \rho}f(z)\,dz \qquad(0 < \rho < r).
$$
:::

The integral formula is [[complex-analysis/laurent-series#eq-laurent]] with $n = -1$. It says: **the residue is the only part of $f$ near $a$ that survives integration around $a$** — every other power $(z - a)^n$ has a primitive on the punctured disc. At a removable singularity the residue is $0$. For an essential singularity one must find the Laurent series; at poles there are convenient formulas.

::: proposition Computing residues at poles {#prop-res-formulas}
1. If $a$ is a simple pole, $\displaystyle\Res_{z=a}f(z) = \lim_{z\to a}(z - a)f(z)$.
2. If $f = g/h$ with $g$, $h$ analytic at $a$, $g(a)\neq0$, $h(a) = 0$ and $h'(a)\neq0$, then $\displaystyle\Res_{z=a}\frac{g(z)}{h(z)} = \frac{g(a)}{h'(a)}$.
3. If $a$ is a pole of order at most $m$, then

$$
\Res_{z=a}f(z) = \frac{1}{(m-1)!}\lim_{z\to a}\frac{d^{m-1}}{dz^{m-1}}\Big((z - a)^mf(z)\Big).
$$ {#eq-res-order-m}
:::

::: proof
(3) If the pole has order at most $m$, then $(z - a)^mf(z) = c_{-m} + c_{-m+1}(z - a) + \dots + c_{-1}(z - a)^{m-1} + c_0(z - a)^m + \cdots$ is a power series (after removing the singularity), and $c_{-1}$ is its coefficient of $(z - a)^{m-1}$, which by [[complex-analysis/laurent-series#thm-series-analytic]] equals the $(m-1)$-th derivative at $a$ divided by $(m-1)!$. (1) is the case $m = 1$. (2) $h$ has a simple zero at $a$ and $g(a)\neq0$, so $g/h$ has a simple pole, and by (1)

$$
\lim_{z\to a}(z - a)\frac{g(z)}{h(z)} = \lim_{z\to a}\frac{g(z)}{\dfrac{h(z) - h(a)}{z - a}} = \frac{g(a)}{h'(a)} .
$$
:::

::: example Four residues {#ex-residues}
Compute (a) $\Res_{z=i}\dfrac{1}{z^2 + 1}$, (b) $\Res_{z=0}\dfrac{e^z}{z^3}$, (c) $\Res_{z=a}\dfrac{1}{z^4 + 1}$ where $a = e^{i\pi/4}$, (d) $\Res_{z = 0}\,e^{1/z}$.
::: solution
(a) By formula (2) with $g = 1$, $h = z^2 + 1$: $\dfrac{1}{h'(i)} = \dfrac{1}{2i} = -\dfrac i2$.

(b) $\dfrac{e^z}{z^3} = \dfrac1{z^3}\Big(1 + z + \dfrac{z^2}{2} + \cdots\Big)$; the coefficient of $z^{-1}$ is $\dfrac12$. (Formula (3) with $m = 3$ gives the same: $\frac{1}{2!}\frac{d^2}{dz^2}e^z\big|_{z=0} = \frac12$.)

(c) $a$ is a simple zero of $z^4 + 1$, so by (2) the residue is $\dfrac{1}{4a^3} = \dfrac{a}{4a^4} = -\dfrac a4$, using $a^4 = -1$. Multiplying top and bottom by $a$ is a standard trick that avoids computing $a^3$.

(d) $e^{1/z} = 1 + \dfrac1z + \dfrac{1}{2!\,z^2} + \cdots$, so the residue is $1$. No formula for poles applies at this essential singularity.
:::
:::

::: warning Use a large enough order
Formula [[#eq-res-order-m]] is valid when $m$ is *at least* the order of the pole; a value of $m$ that is too large is harmless, but one that is too small gives nonsense. For $f(z) = \frac{1}{z^2\sin z}$ at $0$, the pole has order $3$ (not $2$), because $\sin z$ contributes a further simple zero; with $m = 3$, $\frac{1}{2!}\frac{d^2}{dz^2}\frac{z}{\sin z}\big|_{0} = \frac16$. Likewise, formula (2) needs a *simple* zero of $h$: for $\frac{1}{(z - 1)^2}$ it would divide by $h'(1) = 0$.
:::

::: quiz
What is $\displaystyle\Res_{z = 0}\frac{\cos z}{z^3}$?
- [ ] $1$
- [ ] $0$, because $\cos z/z^3$ has a pole of order $3$
- [x] $-\tfrac12$
- [ ] $\tfrac12$
::: solution
$\dfrac{\cos z}{z^3} = \dfrac{1}{z^3}\Big(1 - \dfrac{z^2}{2} + \dfrac{z^4}{24} - \cdots\Big) = \dfrac1{z^3} - \dfrac{1}{2z} + \dfrac{z}{24} - \cdots$, so the coefficient of $z^{-1}$ is $-\frac12$. A pole of order $3$ can perfectly well have a non-zero residue; the residue is the coefficient of $1/z$, not of the leading term.
:::
:::

## The residue theorem

::: theorem Residue theorem {#thm-residue}
Let $\gamma$ be a positively oriented simple closed contour, and let $f$ be analytic on an open set containing $\gamma$ and its interior, except at finitely many points $a_1,\dots,a_k$ inside $\gamma$. Then

$$
\oint_\gamma f(z)\,dz = 2\pi i\sum_{j=1}^k\Res_{z = a_j}f(z) .
$$ {#eq-residue-thm}
:::

::: proof
For each $j$ let $P_j(z) = \sum_{n=1}^{\infty}c^{(j)}_{-n}(z - a_j)^{-n}$ be the principal part of the Laurent series of $f$ at $a_j$. It is a power series in $w = 1/(z - a_j)$ that converges for all $w$ (it converges for $\abs{z - a_j}$ arbitrarily small, i.e. $\abs w$ arbitrarily large), so $P_j$ is analytic on $\C\setminus\set{a_j}$, and the series converges uniformly on $\gamma$, which stays a positive distance from $a_j$.

The function $g = f - P_1 - \dots - P_k$ has removable singularities at every $a_j$: near $a_j$, $f - P_j$ is given by the non-negative part of the Laurent series, and the other $P_i$ are analytic at $a_j$. After removing them, $g$ is analytic on an open set containing $\gamma$ and its interior, so $\oint_\gamma g\,dz = 0$ by Cauchy's theorem in the form stated in [[complex-analysis/cauchy-theorem]]. Hence $\oint_\gamma f = \sum_j\oint_\gamma P_j$. Integrating $P_j$ term by term ([[complex-analysis/contour-integrals#cor-uniform]]): for $n\ge2$, $(z - a_j)^{-n}$ has a primitive on $\C\setminus\set{a_j}$, so its integral is $0$; and $\oint_\gamma\frac{dz}{z - a_j} = 2\pi i$ because $a_j$ lies inside the positively oriented simple closed curve $\gamma$ (for circles this is [[complex-analysis/cauchy-theorem#lem-off-centre]]; in general it follows by deforming $\gamma$ to a small circle around $a_j$). So $\oint_\gamma P_j = 2\pi i\,c^{(j)}_{-1}$, and summing over $j$ gives [[#eq-residue-thm]].
:::

More generally, for any closed contour $\gamma$ in a simply connected domain where $f$ is analytic except at $a_1,\dots,a_k$ (none on $\gamma$), the same proof gives $\oint_\gamma f\,dz = 2\pi i\sum_j n(\gamma, a_j)\Res_{a_j}f$, where $n(\gamma, a_j)$ is the winding number of [[complex-analysis/contour-integrals#def-winding]]. A curve that goes twice around a pole collects its residue twice.

::: widget contourint
f: 1/(z^4 + 1)
center: 0, 0.6
radius: 1
poles: 0.7071, 0.7071; -0.7071, 0.7071; -0.7071, -0.7071; 0.7071, -0.7071
caption: The four simple poles of $\frac{1}{z^4+1}$ sit at $e^{\pm i\pi/4}$ and $e^{\pm 3i\pi/4}$. Move and resize the circle and compare the numerical value of $\oint f\,dz$ with $2\pi i$ times the sum of the residues enclosed: they agree, and the integral only changes when a pole crosses the circle. With the two upper poles enclosed the integral is $\pi/\sqrt2\approx 2.221$ — the value of $\int_{-\infty}^\infty\frac{dx}{1+x^4}$ computed below.
:::

## Trigonometric integrals

An integral of a rational function of $\cos\theta$ and $\sin\theta$ over a full period becomes a contour integral around the unit circle. Put $z = e^{i\theta}$, $0\le\theta\le2\pi$; then $dz = iz\,d\theta$ and

$$
\cos\theta = \frac12\Big(z + \frac1z\Big), \qquad \sin\theta = \frac{1}{2i}\Big(z - \frac1z\Big), \qquad d\theta = \frac{dz}{iz} .
$$ {#eq-trig-sub}

::: example A trigonometric integral {#ex-trig}
Evaluate $\displaystyle\int_0^{2\pi}\frac{d\theta}{2 + \cos\theta}$.
::: solution
By [[#eq-trig-sub]] the integral equals

$$
\oint_{\abs z = 1}\frac{1}{2 + \frac12(z + z^{-1})}\cdot\frac{dz}{iz} = \oint_{\abs z = 1}\frac{2\,dz}{iz\,(4 + z + z^{-1})} = \frac2i\oint_{\abs z = 1}\frac{dz}{z^2 + 4z + 1} .
$$

The denominator vanishes at $z = -2\pm\sqrt3$. Since $\sqrt3\approx1.732$, the root $z_1 = -2 + \sqrt3\approx-0.268$ lies inside the unit circle and $z_2 = -2 - \sqrt3\approx-3.73$ lies outside. At the simple pole $z_1$, formula (2) of [[#prop-res-formulas]] gives the residue $\frac{1}{2z_1 + 4} = \frac{1}{2\sqrt3}$. By the residue theorem,

$$
\int_0^{2\pi}\frac{d\theta}{2 + \cos\theta} = \frac2i\cdot2\pi i\cdot\frac{1}{2\sqrt3} = \frac{2\pi}{\sqrt3}\approx3.628 .
$$

A quick sanity check: the integrand lies between $\frac13$ and $1$, so the integral lies between $\frac{2\pi}{3}\approx2.09$ and $2\pi\approx6.28$.
:::
:::

## Improper integrals of rational functions

For integrals over the whole real line we close the interval $[-R, R]$ with a large semicircle and show that the semicircle contributes nothing in the limit.

::: proposition Rational integrals {#prop-rational}
Let $P$ and $Q$ be polynomials with $\deg Q\ge\deg P + 2$ and no real zeros of $Q$. Then

$$
\int_{-\infty}^\infty\frac{P(x)}{Q(x)}\,dx = 2\pi i\sum_{\operatorname{Im} a > 0}\Res_{z=a}\frac{P(z)}{Q(z)},
$$

the sum running over the zeros of $Q$ in the upper half-plane.
:::

::: proof
Let $f = P/Q$. Because $\deg Q\ge\deg P + 2$, there are constants $C$ and $R_0$ with $\abs{f(z)}\le C/\abs z^2$ for $\abs z\ge R_0$ (compare the leading terms, as in the proof of the fundamental theorem of algebra). In particular $\int_{-\infty}^\infty f$ converges absolutely. For $R > R_0$ larger than the moduli of all zeros of $Q$, let $\gamma_R$ be the segment $[-R, R]$ followed by the semicircle $C_R$: $z = Re^{it}$, $0\le t\le\pi$. This positively oriented simple closed contour encloses exactly the zeros of $Q$ in the upper half-plane, so

$$
\int_{-R}^R f(x)\,dx + \int_{C_R}f(z)\,dz = 2\pi i\sum_{\operatorname{Im} a > 0}\Res_a f .
$$

By the ML-inequality $\left\lvert\int_{C_R}f\right\rvert\le\frac{C}{R^2}\cdot\pi R\to0$, and letting $R\to\infty$ gives the result.
:::

::: example The integral from the introduction {#ex-quartic}
Show that $\displaystyle\int_{-\infty}^\infty\frac{dx}{1 + x^4} = \frac{\pi}{\sqrt2}$.
::: solution
The zeros of $z^4 + 1$ are the fourth roots of $-1$: $e^{i\pi/4}, e^{3i\pi/4}, e^{5i\pi/4}, e^{7i\pi/4}$. The two in the upper half-plane are $a_1 = e^{i\pi/4} = \frac{1 + i}{\sqrt2}$ and $a_2 = e^{3i\pi/4} = \frac{-1 + i}{\sqrt2}$. By [[#ex-residues]](c) the residue at a simple zero $a$ of $z^4 + 1$ is $-a/4$, so

$$
\Res_{a_1} + \Res_{a_2} = -\frac{a_1 + a_2}{4} = -\frac14\cdot\frac{2i}{\sqrt2} = -\frac{i}{2\sqrt2} .
$$

The degree condition of [[#prop-rational]] holds ($4\ge0 + 2$), so

$$
\int_{-\infty}^\infty\frac{dx}{1 + x^4} = 2\pi i\cdot\Big(-\frac{i}{2\sqrt2}\Big) = \frac{\pi}{\sqrt2}\approx2.221 .
$$

The answer is real and positive, as it must be — a useful check on the signs.
:::
:::

::: example A double pole {#ex-double-pole}
Evaluate $\displaystyle\int_{-\infty}^\infty\frac{dx}{(x^2 + 1)^2}$.
::: solution
$\frac{1}{(z^2+1)^2} = \frac{1}{(z - i)^2(z + i)^2}$ has a pole of order $2$ at $i$, the only pole in the upper half-plane. By [[#eq-res-order-m]] with $m = 2$,

$$
\Res_{z = i}\frac{1}{(z^2 + 1)^2} = \frac{d}{dz}\frac{1}{(z + i)^2}\Big|_{z = i} = \frac{-2}{(2i)^3} = \frac{-2}{-8i} = \frac{1}{4i} .
$$

So the integral is $2\pi i\cdot\frac{1}{4i} = \frac\pi2$. (Check: the substitution $x = \tan\theta$ turns it into $\int_{-\pi/2}^{\pi/2}\cos^2\theta\,d\theta = \frac\pi2$.)
:::
:::

## Fourier integrals and Jordan's lemma

Integrals such as $\int_{-\infty}^\infty\frac{\cos x}{x^2 + 1}\,dx$ appear constantly in Fourier analysis. The natural idea is to integrate $\frac{\cos z}{z^2 + 1}$ around a semicircle — but this fails, because $\cos z$ is not small in the upper half-plane: $\abs{\cos(iy)} = \cosh y$ grows exponentially. The remedy is to use $e^{iz}$, which *decays* in the upper half-plane ($\abs{e^{iz}} = e^{-\operatorname{Im} z}$), and take real parts at the end.

::: lemma Jordan's lemma {#lem-jordan}
Let $C_R$ be the semicircle $z = Re^{it}$, $0\le t\le\pi$, and suppose $\abs{f(z)}\le M_R$ on $C_R$. Then

$$
\left\lvert\int_{C_R}f(z)e^{iz}\,dz\right\rvert\le\pi M_R .
$$

In particular, if $M_R\to0$ as $R\to\infty$, then $\int_{C_R}f(z)e^{iz}\,dz\to0$.
:::

::: proof
On $C_R$, $\abs{e^{iz}} = e^{-R\sin t}$ and $\abs{dz} = R\,dt$, so

$$
\left\lvert\int_{C_R}f(z)e^{iz}\,dz\right\rvert\le M_R\int_0^\pi e^{-R\sin t}R\,dt = 2M_RR\int_0^{\pi/2}e^{-R\sin t}\,dt .
$$

Since $\sin$ is concave on $[0,\pi/2]$, its graph lies above the chord: $\sin t\ge\frac{2t}{\pi}$ there. Hence

$$
2M_RR\int_0^{\pi/2}e^{-R\sin t}\,dt\le2M_RR\int_0^{\pi/2}e^{-2Rt/\pi}\,dt = 2M_RR\cdot\frac{\pi}{2R}\big(1 - e^{-R}\big) < \pi M_R .
$$
:::

The point of Jordan's lemma is that $M_R\to0$ suffices — the plain ML-inequality would need $M_R\cdot\pi R\to0$, which fails for $f(z) = 1/z$.

::: example A Fourier integral {#ex-fourier}
Show that $\displaystyle\int_{-\infty}^\infty\frac{\cos x}{x^2 + 1}\,dx = \frac{\pi}{e}$.
::: solution
Let $f(z) = \frac{e^{iz}}{z^2 + 1}$, and close $[-R, R]$ with the semicircle $C_R$ ($R > 1$). The only pole inside is the simple pole $z = i$, with residue

$$
\Res_{z=i}\frac{e^{iz}}{z^2 + 1} = \frac{e^{i\cdot i}}{2i} = \frac{e^{-1}}{2i} .
$$

So $\int_{-R}^Rf(x)\,dx + \int_{C_R}f(z)\,dz = 2\pi i\cdot\frac{e^{-1}}{2i} = \frac\pi e$. On $C_R$, $\big\lvert\frac{1}{z^2 + 1}\big\rvert\le\frac{1}{R^2 - 1} = M_R\to0$, so the semicircle integral tends to $0$ by [[#lem-jordan]] (here even the ML-inequality suffices). Hence

$$
\int_{-\infty}^\infty\frac{e^{ix}}{x^2 + 1}\,dx = \frac{\pi}{e} .
$$

Taking real parts gives $\int_{-\infty}^\infty\frac{\cos x}{x^2+1}\,dx = \frac{\pi}{e}\approx1.156$, and imaginary parts give $\int_{-\infty}^\infty\frac{\sin x}{x^2 + 1}\,dx = 0$, as expected for an odd integrand.
:::
:::

When the integrand has a simple pole *on* the real axis, we detour around it along a small semicircle.

::: lemma Small semicircles {#lem-indent}
Let $f$ have a simple pole at $a$, and let $c_\eps$ be the upper semicircle $z = a + \eps e^{it}$ traversed from $t = \pi$ to $t = 0$ (clockwise, from $a - \eps$ to $a + \eps$). Then

$$
\lim_{\eps\to0^+}\int_{c_\eps}f(z)\,dz = -\pi i\Res_{z=a}f(z) .
$$
:::

::: proof
Near $a$, $f(z) = \frac{c_{-1}}{z - a} + h(z)$ with $h$ analytic, hence bounded by some $K$ near $a$. Directly, $\int_{c_\eps}\frac{c_{-1}}{z - a}\,dz = \int_\pi^0\frac{c_{-1}}{\eps e^{it}}\,i\eps e^{it}\,dt = -\pi i\,c_{-1}$, and $\left\lvert\int_{c_\eps}h\right\rvert\le K\pi\eps\to0$.
:::

::: example The Dirichlet integral {#ex-dirichlet}
Show that $\displaystyle\int_0^\infty\frac{\sin x}{x}\,dx = \frac\pi2$.
::: solution
Integrate $f(z) = \frac{e^{iz}}{z}$, which has a simple pole at $0$ with residue $e^0 = 1$, around the closed contour made of the segment $[-R, -\eps]$, the small semicircle $c_\eps$ of [[#lem-indent]] (passing above $0$ from $-\eps$ to $\eps$), the segment $[\eps, R]$, and the large semicircle $C_R$. The contour encloses no singularity, so by Cauchy's theorem

$$
\int_{-R}^{-\eps}\frac{e^{ix}}{x}\,dx + \int_{c_\eps}f\,dz + \int_\eps^R\frac{e^{ix}}{x}\,dx + \int_{C_R}f\,dz = 0 .
$$

Substituting $x\mapsto-x$ in the first integral, the two straight pieces combine to

$$
\int_\eps^R\frac{e^{ix} - e^{-ix}}{x}\,dx = 2i\int_\eps^R\frac{\sin x}{x}\,dx .
$$

As $R\to\infty$, $\int_{C_R}f\to0$ by Jordan's lemma with $M_R = 1/R$. As $\eps\to0$, $\int_{c_\eps}f\to-\pi i\cdot1$ by [[#lem-indent]]. In the limit, $2i\int_0^\infty\frac{\sin x}{x}\,dx - \pi i = 0$, so $\int_0^\infty\frac{\sin x}{x}\,dx = \frac\pi2$. (The integral converges only conditionally, which is why the symmetric limits and the careful treatment of both ends are needed.)
:::
:::

::: quiz
To evaluate $\int_{-\infty}^\infty\frac{\cos 3x}{x^2 + 4}\,dx$ by residues, which function should you integrate around a large upper semicircle?
- [ ] $\dfrac{\cos 3z}{z^2 + 4}$
- [x] $\dfrac{e^{3iz}}{z^2 + 4}$
- [ ] $\dfrac{e^{-3iz}}{z^2 + 4}$
- [ ] $\dfrac{\sin 3z}{z^2 + 4}$
::: solution
$\cos 3z$ and $\sin 3z$ grow like $\frac12e^{3\abs y}$ off the real axis, so their integrals over the semicircle do not tend to zero. $e^{3iz}$ has modulus $e^{-3y}\le1$ in the upper half-plane, and Jordan's lemma applies (after the substitution $w = 3z$). $e^{-3iz}$ would decay in the *lower* half-plane instead. The answer is the real part of $2\pi i\Res_{z = 2i}\frac{e^{3iz}}{z^2+4} = 2\pi i\frac{e^{-6}}{4i} = \frac{\pi}{2}e^{-6}$.
:::
:::

## The argument principle and Rouché's theorem

Residues can also count. If $f$ has a zero of order $m$ at $a$, then $f(z) = (z - a)^mg(z)$ with $g(a)\neq0$, and the **logarithmic derivative** is

$$
\frac{f'(z)}{f(z)} = \frac{m(z - a)^{m-1}g(z) + (z - a)^mg'(z)}{(z - a)^mg(z)} = \frac{m}{z - a} + \frac{g'(z)}{g(z)},
$$

where $g'/g$ is analytic near $a$. So $f'/f$ has a simple pole at $a$ with residue $m$. At a pole of order $m$ the same computation with $(z - a)^{-m}$ gives residue $-m$. A function analytic on an open set except for poles is called **meromorphic** there.

::: theorem Argument principle {#thm-argument}
Let $\gamma$ be a positively oriented simple closed contour, and let $f$ be meromorphic on an open set containing $\gamma$ and its interior, with no zeros or poles on $\gamma$. Then

$$
\frac{1}{2\pi i}\oint_\gamma\frac{f'(z)}{f(z)}\,dz = Z - P,
$$ {#eq-argument}

where $Z$ and $P$ are the numbers of zeros and poles of $f$ inside $\gamma$, counted with multiplicity.
:::

::: proof
Zeros and poles of a meromorphic function not identically zero are isolated, so only finitely many lie in the compact region bounded by $\gamma$. The function $f'/f$ is analytic except at these points, where by the computation above it has simple poles with residue $m$ at a zero of order $m$ and $-m$ at a pole of order $m$. The residue theorem gives [[#eq-argument]].
:::

Why "argument"? Substituting $w = f(z)$, the left side of [[#eq-argument]] becomes $\frac{1}{2\pi i}\oint_{f\circ\gamma}\frac{dw}{w}$, which is the winding number $n(f\circ\gamma, 0)$ of the image curve around the origin ([[complex-analysis/contour-integrals#def-winding]]). Equivalently, it is the total change of $\arg f(z)$ as $z$ goes once around $\gamma$, divided by $2\pi$. So **the number of zeros minus poles inside $\gamma$ equals the number of times $f(\gamma)$ winds around $0$** — something that can be read off a picture.

::: widget winding
fx: cos(5t) + 3cos(t) + 1
fy: sin(5t) + 3sin(t)
t: 0, 2pi
point: 0, 0
caption: The image of the unit circle under $f(z) = z^5 + 3z + 1$. With the point at the origin, the winding number is $1$, so $f$ has exactly one zero in the unit disc. Drag the point to a value $w$: the winding number around $w$ counts the solutions of $f(z) = w$ in the disc. The image of the circle $\lvert z\rvert = 2$ (not shown) winds $5$ times around $0$ — all five zeros lie in $\lvert z\rvert < 2$.
:::

The argument principle has a remarkably robust consequence: a small perturbation cannot change the number of zeros.

::: theorem Rouché's theorem {#thm-rouche}
Let $\gamma$ be a simple closed contour, and let $f$ and $g$ be analytic on an open set containing $\gamma$ and its interior. If

$$
\abs{g(z)} < \abs{f(z)}\qquad\text{for all } z \text{ on } \gamma,
$$

then $f$ and $f + g$ have the same number of zeros inside $\gamma$, counted with multiplicity.
:::

::: proof
For $0\le t\le1$ let $f_t = f + tg$. On $\gamma$, $\abs{f_t}\ge\abs f - t\abs g\ge\abs f - \abs g > 0$, so no $f_t$ vanishes on $\gamma$, and by the argument principle the number of zeros of $f_t$ inside $\gamma$ is

$$
N(t) = \frac{1}{2\pi i}\oint_\gamma\frac{f'(z) + tg'(z)}{f(z) + tg(z)}\,dz .
$$

The integrand depends continuously on $(t, z)\in[0,1]\times\gamma$, and its denominator is bounded below by $\min_\gamma(\abs f - \abs g) > 0$ (a minimum over the compact set $\gamma$ of a positive continuous function). So $N(t)$ is a continuous function of $t$ (the integrand is uniformly continuous on the compact set $[0,1]\times\gamma$). But $N(t)$ is an integer for every $t$. A continuous integer-valued function on $[0,1]$ is constant, so $N(0) = N(1)$: $f$ and $f + g$ have the same number of zeros.
:::

The picture: think of $f(z)$ as a person walking around a tree (the origin) and $f(z) + g(z)$ as a dog on a lead of length $\abs{g(z)}$. If the lead is always shorter than the person's distance to the tree, the dog walks around the tree exactly as often as the person.

::: example Counting zeros in an annulus {#ex-rouche}
How many zeros does $p(z) = z^5 + 3z + 1$ have in the disc $\abs z < 1$, and how many in the annulus $1 < \abs z < 2$?
::: solution
*On $\abs z = 1$:* take $f(z) = 3z$ and $g(z) = z^5 + 1$. Then $\abs g\le\abs z^5 + 1 = 2 < 3 = \abs f$. By Rouché, $p = f + g$ has as many zeros in $\abs z < 1$ as $3z$, namely one.

*On $\abs z = 2$:* take $f(z) = z^5$ and $g(z) = 3z + 1$. Then $\abs g\le3\cdot2 + 1 = 7 < 32 = \abs f$. So $p$ has as many zeros in $\abs z < 2$ as $z^5$, namely five.

The strict inequality on $\abs z = 1$ also shows that $p$ has no zeros *on* the unit circle (there $\abs p\ge\abs f - \abs g > 0$). Hence exactly $5 - 1 = 4$ zeros lie in the annulus $1 < \abs z < 2$. Numerically, the zeros have moduli about $0.33$, $1.26$, $1.26$, $1.37$ and $1.37$.
:::
:::

Rouché's theorem gives yet another proof of the fundamental theorem of algebra: for $p(z) = z^n + a_{n-1}z^{n-1} + \dots + a_0$, on a circle $\abs z = R$ with $R > 1 + \abs{a_{n-1}} + \dots + \abs{a_0}$ the lower-order terms are smaller in modulus than $z^n$, so $p$ has exactly $n$ zeros in $\abs z < R$.

::: quiz
How many zeros does $z^7 - 5z^3 + 1$ have in the unit disc $\abs z < 1$?
- [ ] $7$
- [x] $3$
- [ ] $1$
- [ ] $0$
::: solution
On $\abs z = 1$, compare with the dominant term $f(z) = -5z^3$: the rest, $g(z) = z^7 + 1$, satisfies $\abs g\le2 < 5 = \abs f$. By Rouché the polynomial has as many zeros in the disc as $-5z^3$, namely $3$ (a triple zero at the origin, counted with multiplicity).
:::
:::

::: application Stability and the Nyquist criterion
A linear system — an electrical circuit, a mechanical structure, an autopilot — is stable when all poles of its transfer function lie in the left half-plane $\operatorname{Re} s < 0$, because each pole $s_0$ contributes a term $e^{s_0t}$ to the response. In a feedback loop with open-loop transfer function $L(s)$, the closed-loop poles are the zeros of $1 + L(s)$. Applying the argument principle to $1 + L$ on a huge semicircle enclosing the right half-plane gives the **Nyquist stability criterion** (Harry Nyquist, 1932): the closed loop is stable exactly when the curve $\omega\mapsto L(i\omega)$ winds around the point $-1$ counterclockwise as many times as $L$ has poles in the right half-plane. Engineers read stability margins directly off this plot, without computing a single pole. Transfer functions arise from the Laplace transform of [[ode/laplace-transform]].
:::

::: history
Cauchy introduced residues (*résidus*) in 1826 in his *Exercices de mathématiques*, after a decade of using contour integration to evaluate definite integrals, and the argument principle also goes back to his work. Eugène Rouché published his theorem in 1862 in a memoir in the *Journal de l'École polytechnique*. Ernst Lindelöf's book *Le calcul des résidus* (1905) collected the techniques for evaluating integrals and sums that are still taught today. In the twentieth century the argument principle found an unexpected home in engineering, through Nyquist's 1932 analysis of feedback amplifiers.
:::

## Where this leads

The residue theorem is the most widely used tool of complex analysis. It computes inverse Laplace and Fourier transforms ([[ode/laplace-transform]], [[pde/fourier-transform]]), sums series such as $\sum 1/n^2$ ([[#exr-basel]]), and gives asymptotic formulas in combinatorics through generating functions ([[discrete/generating-functions]]). The argument principle and Rouché's theorem locate zeros of polynomials and transcendental functions, and the winding numbers behind them are the degree of a loop, studied topologically in [[topology/fundamental-group]]. Finally, the open mapping property that follows from the argument principle — a non-constant analytic function maps open sets to open sets — is the starting point of [[complex-analysis/conformal-maps]].

::: summary
- The residue of $f$ at an isolated singularity is the Laurent coefficient $c_{-1} = \frac{1}{2\pi i}\oint f$ around a small circle; at a simple pole it is $\lim(z - a)f(z)$ or $g(a)/h'(a)$, at a pole of order $m$ use [[#eq-res-order-m]], at an essential singularity expand.
- Residue theorem: $\oint_\gamma f = 2\pi i\sum\Res$ over the singularities inside a positively oriented simple closed contour.
- $\int_0^{2\pi}R(\cos\theta,\sin\theta)\,d\theta$: substitute $z = e^{i\theta}$ and sum residues inside the unit circle.
- $\int_{-\infty}^\infty P/Q$ with $\deg Q\ge\deg P + 2$: close with a semicircle; $2\pi i$ times the residues in the upper half-plane.
- For $\int f(x)\cos x\,dx$ use $e^{iz}$ and Jordan's lemma; indent around poles on the real axis, each contributing $-\pi i\Res$ for a small clockwise semicircle.
- Argument principle: $\frac{1}{2\pi i}\oint f'/f = Z - P$, the winding number of $f(\gamma)$ about $0$. Rouché: if $\abs g < \abs f$ on $\gamma$, then $f$ and $f + g$ have the same number of zeros inside.
:::

## Exercises

::: exercise A residue from a series {level=1 check="-1/6"}
Find $\displaystyle\Res_{z = 0}\frac{\sin z}{z^4}$.
::: solution
$\dfrac{\sin z}{z^4} = \dfrac{1}{z^4}\Big(z - \dfrac{z^3}{6} + \dfrac{z^5}{120} - \cdots\Big) = \dfrac{1}{z^3} - \dfrac{1}{6z} + \dfrac{z}{120} - \cdots$, so the residue is $-\frac16$.
:::
:::

::: exercise A pole of order three {level=1 check="2"}
Find $\displaystyle\Res_{z = 0}\frac{e^{2z}}{z^3}$.
::: solution
By [[#eq-res-order-m]] with $m = 3$: $\frac{1}{2!}\frac{d^2}{dz^2}e^{2z}\big|_{z=0} = \frac{4}{2} = 2$. (From the series: $e^{2z} = 1 + 2z + 2z^2 + \cdots$, and the coefficient of $z^2$ is $2$.)
:::
:::

::: exercise A first real integral {level=1 check="pi/2"}
Evaluate $\displaystyle\int_{-\infty}^\infty\frac{dx}{x^2 + 4}$ by residues, and check the answer with an arctangent.
::: solution
The only pole in the upper half-plane is $2i$, with residue $\frac{1}{2\cdot2i} = \frac1{4i}$. By [[#prop-rational]] the integral is $2\pi i\cdot\frac{1}{4i} = \frac\pi2$. Check: $\int\frac{dx}{x^2+4} = \frac12\arctan\frac x2$, which increases by $\frac12\pi$ over the real line.
:::
:::

::: exercise A trigonometric integral {level=2 check="pi/2"}
Evaluate $\displaystyle\int_0^{2\pi}\frac{d\theta}{5 + 3\cos\theta}$.
::: solution
With [[#eq-trig-sub]]: $\oint_{\abs z = 1}\frac{1}{5 + \frac32(z + z^{-1})}\frac{dz}{iz} = \frac{2}{i}\oint_{\abs z = 1}\frac{dz}{3z^2 + 10z + 3}$. The roots of $3z^2 + 10z + 3 = 3(z + \frac13)(z + 3)$ are $-\frac13$ (inside) and $-3$ (outside). The residue at $-\frac13$ is $\frac{1}{6z + 10}\big|_{z = -1/3} = \frac18$. So the integral is $\frac2i\cdot2\pi i\cdot\frac18 = \frac\pi2$. (In general $\int_0^{2\pi}\frac{d\theta}{a + b\cos\theta} = \frac{2\pi}{\sqrt{a^2 - b^2}}$ for $a > \abs b$; here $\frac{2\pi}{4}$.)
:::
:::

::: exercise A quartic with a numerator {level=2 check="pi/sqrt(2)"}
Evaluate $\displaystyle\int_{-\infty}^\infty\frac{x^2}{x^4 + 1}\,dx$.
::: solution
The degree condition holds ($4\ge2 + 2$). At a simple zero $a$ of $z^4 + 1$ the residue of $\frac{z^2}{z^4+1}$ is $\frac{a^2}{4a^3} = \frac1{4a} = \frac{\bar a}{4}$ (since $\abs a = 1$). For $a_1 = e^{i\pi/4}$ and $a_2 = e^{3i\pi/4}$: $\frac{\bar a_1 + \bar a_2}{4} = \frac14\Big(\frac{1 - i}{\sqrt2} + \frac{-1 - i}{\sqrt2}\Big) = -\frac{i}{2\sqrt2}$. The integral is $2\pi i\cdot\big(-\frac{i}{2\sqrt2}\big) = \frac{\pi}{\sqrt2}$ — the same value as $\int\frac{dx}{1 + x^4}$, which is also clear from the substitution $x\mapsto1/x$.
:::
:::

::: exercise A damped Fourier integral {level=2 check="pi*exp(-2)"}
Evaluate $\displaystyle\int_{-\infty}^\infty\frac{\cos 2x}{x^2 + 1}\,dx$.
::: solution
Integrate $\frac{e^{2iz}}{z^2 + 1}$ over the upper semicircle contour. On $C_R$, $\abs{e^{2iz}}\le1$ and $\frac{1}{\abs{z^2+1}}\le\frac{1}{R^2 - 1}$, so the ML-inequality already shows the arc contributes at most $\frac{\pi R}{R^2 - 1}\to0$. The residue at $i$ is $\frac{e^{2i\cdot i}}{2i} = \frac{e^{-2}}{2i}$, so $\int_{-\infty}^\infty\frac{e^{2ix}}{x^2 + 1}\,dx = 2\pi i\cdot\frac{e^{-2}}{2i} = \pi e^{-2}$, and the real part gives the answer $\pi e^{-2}\approx0.425$.
:::
:::

::: exercise Zeros in an annulus {level=2 check="3"}
How many zeros does $z^4 - 6z + 3$ have in the annulus $1 < \abs z < 2$?
::: solution
On $\abs z = 2$: $\abs{z^4} = 16 > 15\ge\abs{-6z + 3}$, so there are $4$ zeros in $\abs z < 2$. On $\abs z = 1$: $\abs{-6z} = 6 > 4\ge\abs{z^4 + 3}$, so there is $1$ zero in $\abs z < 1$, and none on $\abs z = 1$. Hence $4 - 1 = 3$ zeros lie in the annulus.
:::
:::

::: exercise A keyhole contour {level=3}
Let $0 < a < 1$. Prove that

$$
\int_0^\infty\frac{x^{a-1}}{1 + x}\,dx = \frac{\pi}{\sin\pi a} .
$$
::: hint
Integrate $f(z) = \frac{z^{a-1}}{1 + z}$, with $z^{a-1} = e^{(a-1)\log z}$ and $\arg z\in(0, 2\pi)$, around a "keyhole": the large circle $\abs z = R$, the small circle $\abs z = \eps$ (clockwise), and the two edges of the cut along the positive real axis.
:::
::: solution
Use the branch $z^{a-1} = \abs z^{a-1}e^{i(a-1)\theta}$ with $\theta = \arg z\in(0, 2\pi)$, analytic on $\C\setminus[0,\infty)$. The keyhole contour consists of: the upper edge of the cut from $\eps$ to $R$ (where $\theta\to0$, so $z^{a-1} = x^{a-1}$); the circle $C_R$ counterclockwise; the lower edge from $R$ back to $\eps$ (where $\theta\to2\pi$, so $z^{a-1} = x^{a-1}e^{2\pi i(a-1)} = x^{a-1}e^{2\pi ia}$); and the circle $c_\eps$ clockwise. Inside lies the single simple pole $z = -1 = e^{i\pi}$, with residue $(-1)^{a-1} = e^{i\pi(a-1)} = -e^{i\pi a}$.

*The circles vanish.* On $C_R$: $\abs{f}\le\frac{R^{a-1}}{R - 1}$, and the ML-inequality gives at most $\frac{2\pi R^a}{R - 1}\to0$ because $a < 1$. On $c_\eps$: $\abs f\le\frac{\eps^{a-1}}{1 - \eps}$, giving at most $\frac{2\pi\eps^a}{1 - \eps}\to0$ because $a > 0$.

*The edges.* Writing $I = \int_0^\infty\frac{x^{a-1}}{1 + x}\,dx$ (convergent at both ends for $0 < a < 1$), the two edges contribute $I - e^{2\pi ia}I$ in the limit. By the residue theorem (the keyhole contour is a simple closed contour around $-1$),

$$
(1 - e^{2\pi ia})\,I = 2\pi i\cdot\big(-e^{i\pi a}\big) .
$$

Therefore

$$
I = \frac{-2\pi ie^{i\pi a}}{1 - e^{2\pi ia}} = \frac{-2\pi i}{e^{-i\pi a} - e^{i\pi a}} = \frac{-2\pi i}{-2i\sin\pi a} = \frac{\pi}{\sin\pi a} .
$$

For $a = \frac12$ this gives $\int_0^\infty\frac{dx}{\sqrt x(1 + x)} = \pi$, which you can confirm with the substitution $x = t^2$.
:::
:::

::: exercise Summing the reciprocal squares {#exr-basel level=3 check="pi^2/6"}
Use $f(z) = \dfrac{\pi\cot\pi z}{z^2}$ and the squares $Q_N$ with vertices $(N + \frac12)(\pm1\pm i)$ to prove that $\displaystyle\sum_{n=1}^\infty\frac{1}{n^2} = \frac{\pi^2}{6}$. You may use that $\pi\cot\pi z = \frac1z - \frac{\pi^2}{3}z + O(z^3)$ near $0$.
::: hint
Show that $\abs{\cot\pi z}\le2$ on every $Q_N$, so that $\oint_{Q_N}f\to0$, and compute the residues at the integers.
:::
::: solution
*Residues.* $\pi\cot\pi z = \frac{\pi\cos\pi z}{\sin\pi z}$ has simple poles at the integers $n$, with residue $\frac{\pi\cos\pi n}{\pi\cos\pi n} = 1$ by formula (2). For $n\neq0$ the factor $1/z^2$ is analytic at $n$, so $\Res_{z = n}f = \frac{1}{n^2}$. At $0$, $f(z) = \frac{1}{z^3} - \frac{\pi^2}{3z} + O(z)$, so $\Res_0 f = -\frac{\pi^2}{3}$.

*The bound.* Write $z = x + iy$. Then $\abs{\cot\pi z}^2 = \frac{\cos^2\pi x + \sinh^2\pi y}{\sin^2\pi x + \sinh^2\pi y}$ (from the formulas for $\abs{\sin}$ and $\abs{\cos}$ in [[complex-analysis/elementary-functions]]). On the vertical sides $x = \pm(N + \frac12)$, $\cos\pi x = 0$ and $\sin^2\pi x = 1$, so $\abs{\cot\pi z}^2 = \frac{\sinh^2\pi y}{1 + \sinh^2\pi y}\le1$. On the horizontal sides $\abs y = N + \frac12\ge\frac12$, so $\abs{\cot\pi z}^2\le\frac{1 + \sinh^2\pi y}{\sinh^2\pi y} = \coth^2\pi y\le\coth^2\frac\pi2 < 4$. So $\abs{f}\le\frac{2\pi}{(N + 1/2)^2}$ on $Q_N$ (where $\abs z\ge N + \frac12$), and $Q_N$ has length $8(N + \frac12)$; the ML-inequality gives $\left\lvert\oint_{Q_N}f\right\rvert\le\frac{16\pi}{N + 1/2}\to0$.

*Conclusion.* $Q_N$ encloses the poles $-N,\dots,N$, so by the residue theorem

$$
\oint_{Q_N}f\,dz = 2\pi i\Big(-\frac{\pi^2}{3} + 2\sum_{n=1}^N\frac{1}{n^2}\Big)\longrightarrow0,
$$

hence $\sum_{n\ge1}\frac{1}{n^2} = \frac{\pi^2}{6}$.
:::
:::

::: exercise A sector contour {level=3 check="2*pi/(3*sqrt(3))"}
Evaluate $\displaystyle\int_0^\infty\frac{dx}{1 + x^3}$ by integrating $\frac{1}{1 + z^3}$ around the boundary of the sector $\set{re^{i\theta} : 0\le r\le R,\ 0\le\theta\le\frac{2\pi}{3}}$.
::: solution
Let $\omega = e^{2\pi i/3}$ and $I = \int_0^\infty\frac{dx}{1 + x^3}$. The sector's boundary consists of $[0, R]$, the arc $\Gamma_R$ from $R$ to $R\omega$, and the segment from $R\omega$ back to $0$. On that segment $z = t\omega$ with $z^3 = t^3$, so it contributes $-\omega\int_0^R\frac{dt}{1 + t^3}$. The arc contributes at most $\frac{2\pi R/3}{R^3 - 1}\to0$. The only zero of $1 + z^3$ inside the sector is $a = e^{i\pi/3}$ (the others are $-1$ and $e^{-i\pi/3}$), with residue $\frac{1}{3a^2} = \frac{a}{3a^3} = -\frac{a}{3}$. Letting $R\to\infty$,

$$
(1 - \omega)I = 2\pi i\Big(-\frac{e^{i\pi/3}}{3}\Big) .
$$

Since $1 - \omega = 1 - e^{2\pi i/3} = e^{i\pi/3}\big(e^{-i\pi/3} - e^{i\pi/3}\big) = -2i\sin\frac\pi3\,e^{i\pi/3} = -i\sqrt3\,e^{i\pi/3}$, we get

$$
I = \frac{-2\pi ie^{i\pi/3}/3}{-i\sqrt3\,e^{i\pi/3}} = \frac{2\pi}{3\sqrt3}\approx1.2092 .
$$
:::
:::
