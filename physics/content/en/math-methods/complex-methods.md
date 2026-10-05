A mass on a spring and an alternating current in a series circuit are the same algebra once the unknown is allowed to be complex. The quantity you measure is the real part. The phase, which would otherwise sit in a separate sine, sits in the argument of one exponential. Adding two oscillations is then addition of two arrows in the plane.

The integrals in this chapter are real. The path is not. We close a contour, compute a residue, and read off a number such as $\pi$ or $\pi/(2e)$. The method stands or falls by the estimate that says the arc at infinity contributed nothing. That estimate is most of the work.

The exponential is earned in the linear equations of [[math-methods/odes]]. The version of Cauchy's theorem proved here calls on the integral theorems of [[math-methods/integral-theorems]]. The rest of the course is [[math-methods]]. We take the positive sense of a closed curve to be anticlockwise: walk around the curve and the interior stays on your left. Some books say counterclockwise for the same sense. The residue theorem carries a plus sign only for that sense.

## The complex exponential {#exponential}

A complex number $z = x + iy$ is a point $(x, y)$ in the plane, with $x$ and $y$ real and $i$ a formal square root of $-1$. The **modulus** is $\abs{z} = \sqrt{x^2 + y^2}$, the distance from the origin. A non-zero $z$ has an **argument** $\theta$, an angle from the positive real axis to the ray through $z$, so that $x = \abs{z}\cos\theta$ and $y = \abs{z}\sin\theta$. Arguments that differ by a multiple of $2\pi$ name the same ray. When a single value is required we will say which range we are using.

::: definition Complex exponential {#def-exp}
For real $x$ and $y$,
$$
e^{x+iy} = e^{x}\bigl(\cos y + i\sin y\bigr).
$$ {#eq-euler}
In particular, Euler's formula is the case $x = 0$:
$$
e^{i\theta} = \cos\theta + i\sin\theta.
$$
:::

The formula is the unique way to extend the real exponential so that the addition rule $e^{z_1+z_2} = e^{z_1}e^{z_2}$ survives and the derivative stays $e^{z}$. One check is the power series. For any complex $z$,
$$
e^{z} = \sum_{n=0}^{\infty} \frac{z^{n}}{n!}.
$$
Put $z = i\theta$ with $\theta$ real. The powers of $i$ cycle through $1, i, -1, -i$. The even terms are real and reproduce the series for $\cos\theta$. The odd terms are imaginary and reproduce the series for $\sin\theta$. That is [[#eq-euler]] again, and it shows that the trigonometric functions were already sitting inside the exponential series.

Three properties follow at once and are the ones used below. First, $e^{i\theta}$ lies on the unit circle: $\abs{e^{i\theta}}^{2} = \cos^{2}\theta + \sin^{2}\theta = 1$. Second, the addition formula for the exponential is the angle-addition formula for sine and cosine, packed into one line. Third,
$$
\deriv{}{\theta} e^{i\theta} = i e^{i\theta},
$$
so differentiation multiplies by $i$, which rotates the point $e^{i\theta}$ through a right angle. The velocity of a particle travelling on the unit circle is tangent to the circle. That is what multiplication by $i$ looks like.

A real cosine is the real part of a complex exponential. If $A$ and $\alpha$ are real,
$$
A\cos(\omega t - \alpha) = \operatorname{Re}\bigl(A e^{-i\alpha} e^{i\omega t}\bigr).
$$
The complex number $A e^{-i\alpha}$ is a fixed arrow. The factor $e^{i\omega t}$ spins it at angular frequency $\omega$. Superposition of oscillations of one frequency is addition of those arrows, followed by taking the real part at the end. You do not expand the sines until a measurement forces you to.

::: example Two oscillations, one arrow {#ex-phasor}
Write $3\cos\theta + 4\sin\theta$ as a single cosine, and check the identity numerically at $\theta = 0.300$.
::: solution
Match the form $R\cos(\theta - \phi) = R\cos\phi\,\cos\theta + R\sin\phi\,\sin\theta$. The coefficients give
$$
R\cos\phi = 3, \qquad R\sin\phi = 4.
$$
Square and add: $R^{2} = 9 + 16 = 25$, so $R = 5$ since a modulus is not negative. Then $\cos\phi = 3/5$, $\sin\phi = 4/5$, and $\phi = \arctan(4/3) = 0.927295$ radians, which is $53.13^{\circ}$ to two decimal places in the degree measure.

The same arrow is the complex number $3 - 4i$. Indeed
$$
\operatorname{Re}\bigl((3-4i)e^{i\theta}\bigr) = \operatorname{Re}\bigl((3-4i)(\cos\theta + i\sin\theta)\bigr) = 3\cos\theta + 4\sin\theta,
$$
and $\abs{3-4i} = 5$. At $\theta = 0.300$,
$$
3\cos 0.300 + 4\sin 0.300 = 4.04809,
$$
and $5\cos(0.300 - 0.927295) = 4.04809$ as well. The two expressions agree because they are the same function, not because $0.300$ is a special angle.
:::
:::

::: intuition Arrows, not mysticism
Multiplication by $e^{i\alpha}$ rotates every arrow through the angle $\alpha$. Multiplication by a positive real number changes the length and leaves the direction alone. Every non-zero complex multiplication is one of each. Nothing in the arithmetic asks you to picture a mystical square root of minus one sitting on the axis: $i$ is the rotation by a right angle, applied twice, which is a half-turn, which multiplies by $-1$.
:::

The same bookkeeping is why a complex root of a characteristic polynomial, in [[math-methods/odes]], produces a real oscillatory solution. If $r = -\gamma + i\omega$ is a root, $e^{rt} = e^{-\gamma t}e^{i\omega t}$ decays in radius and rotates in argument. The real and imaginary parts are $e^{-\gamma t}\cos\omega t$ and $e^{-\gamma t}\sin\omega t$.

## Analytic functions {#analytic}

Real differentiability of the two component functions is not the same as complex differentiability. The complex derivative has to exist as a limit in the plane, and the limit has to be the same along every path.

::: definition Analytic function {#def-analytic}
A function $f$ defined on an open set in the complex plane is **analytic** (or holomorphic) at $z_0$ if
$$
f'(z_0) = \lim_{h \to 0} \frac{f(z_0+h) - f(z_0)}{h}
$$
exists and is finite, where $h$ approaches $0$ through complex values. It is analytic on an open set if it is analytic at every point of that set.
:::

Write $f = u + iv$ with $u$ and $v$ real. Approaching along the real direction, $h = \Delta x$, gives $f' = \pdv{u}{x} + i\pdv{v}{x}$. Approaching along the imaginary direction, $h = i\Delta y$, gives $f' = \pdv{v}{y} - i\pdv{u}{y}$. These agree precisely when the Cauchy–Riemann equations hold.

::: theorem Cauchy–Riemann equations {#thm-cr}
Let $f = u + iv$ be defined on an open set. If $f$ is analytic at a point, then at that point
$$
\pdv{u}{x} = \pdv{v}{y}, \qquad \pdv{u}{y} = -\pdv{v}{x},
$$ {#eq-cr}
and $f' = \pdv{u}{x} + i\pdv{v}{x}$. Conversely, if the first partial derivatives of $u$ and $v$ exist and are continuous in a neighbourhood of the point and satisfy [[#eq-cr]] there, then $f$ is analytic at the point.
:::

::: proof
The two difference quotients in the paragraph above are the necessity half: an analytic function has a derivative independent of direction, so the two real expressions for $f'$ match, and matching real and imaginary parts is [[#eq-cr]].

For the converse, continuous first partials imply that $u$ and $v$ are differentiable as real functions of two variables. With $\Delta z = h + ik$,
$$
\begin{aligned}
u(x+h, y+k) - u(x, y) &= u_x h + u_y k + \rho_1, \\
v(x+h, y+k) - v(x, y) &= v_x h + v_y k + \rho_2,
\end{aligned}
$$
where $\rho_j / \abs{\Delta z} \to 0$ as $\Delta z \to 0$. Substitute [[#eq-cr]], in the form $u_y = -v_x$ and $v_y = u_x$. The increment of $f$ becomes
$$
\bigl(u_x + i v_x\bigr)(h + ik) + \rho_1 + i\rho_2.
$$
Divide by $\Delta z = h + ik$. The first term is $u_x + i v_x$, and the remainder tends to $0$. So $f'$ exists and equals $u_x + i v_x$.
:::

The equations are a test you can apply without returning to the limit. They are not optional bookkeeping: a function that fails them has no complex derivative, and every later theorem in this chapter refuses it.

::: example A square, and a conjugation {#ex-cr}
Show that $f(z) = z^{2}$ is analytic everywhere, and that $g(z) = \overline{z}$ is analytic nowhere.
::: solution
For $f(z) = (x+iy)^{2} = (x^{2}-y^{2}) + i(2xy)$, one has $u = x^{2}-y^{2}$ and $v = 2xy$. Then $u_x = 2x = v_y$ and $u_y = -2y = -v_x$. The partials are continuous, so [[#thm-cr]] says $f$ is analytic, and $f' = 2x + i(2y) = 2z$, the usual rule.

For $g(z) = x - iy$, one has $u = x$ and $v = -y$. Then $u_x = 1$ and $v_y = -1$, so the first Cauchy–Riemann equation fails at every point. A function that fails it on a whole neighbourhood is not a candidate for any of the integral theorems below. Conjugation is smooth as a map of the plane, and it is still not analytic.
:::
:::

Polynomials in $z$, the exponential, sine and cosine defined by $e^{iz}$, and rational functions away from their poles are analytic where they are defined. A quotient of analytic functions is analytic where the denominator is not zero. The complex conjugate, the modulus, and the argument are not analytic.

## Cauchy's theorem {#cauchy}

Let $\gamma$ be a piecewise smooth path, $z(t) = x(t) + iy(t)$ for $a \le t \le b$. The contour integral of a continuous $f$ is the ordinary integral
$$
\int_{\gamma} f(z)\,\dd z = \int_{a}^{b} f\bigl(z(t)\bigr)\, z'(t)\,\dd t.
$$
Reversing the path changes the sign. Splitting the path adds the integrals. On the circle $z = a + \rho e^{i\theta}$, $\theta$ from $0$ to $2\pi$, one has $\dd z = i\rho e^{i\theta}\,\dd\theta$, and a direct computation gives the integral we use constantly:
$$
\int_{\abs{z-a}=\rho} \frac{1}{z-a}\,\dd z = \int_{0}^{2\pi} i\,\dd\theta = 2\pi i.
$$ {#eq-circle}
For every other integer power, $\int (z-a)^{n}\,\dd z = 0$ on that circle. The case $n = -1$ is the whole residue calculus in miniature.

::: theorem Cauchy's theorem {#thm-cauchy}
Let $C$ be a simple closed path, anticlockwise, bounding a region $D$, and let $f'$ be continuous on an open set containing $D$ and $C$. If $f$ is analytic throughout that set, then
$$
\int_{C} f(z)\,\dd z = 0.
$$
:::

::: proof
Write $f = u + iv$ and $\dd z = \dd x + i\,\dd y$. The integral splits into two real line integrals,
$$
\int_{C} (u\,\dd x - v\,\dd y) + i\int_{C} (v\,\dd x + u\,\dd y).
$$
Green's theorem, in the form recorded in [[math-methods/integral-theorems]], converts a line integral $\int P\,\dd x + Q\,\dd y$ into the double integral of $Q_x - P_y$ over $D$. For the real part, $P = u$ and $Q = -v$, so the integrand is $-v_x - u_y$, which vanishes by [[#eq-cr]]. For the imaginary part, $P = v$ and $Q = u$, so the integrand is $u_x - v_y$, which vanishes the same way. Both double integrals are zero. The hypothesis that $f'$ is continuous supplies the continuous partial derivatives Green's theorem asks for.
:::

Goursat's refinement removes the assumption that $f'$ is continuous, at the price of a harder argument. Every function we integrate below has a continuous derivative where it is analytic, so the version just proved is the one we use. The hypothesis that matters in applications is different: the integrand has to be analytic *inside* the path, not merely on it. A single pole inside the path makes the integral non-zero, which is the next theorem's content.

::: theorem Cauchy's integral formula {#thm-cif}
Let $C$ and $f$ be as in [[#thm-cauchy]], and let $a$ be a point inside $C$. Then
$$
f(a) = \frac{1}{2\pi i}\int_{C} \frac{f(z)}{z-a}\,\dd z.
$$ {#eq-cif}
:::

::: proof
The quotient $f(z)/(z-a)$ is analytic on the region between $C$ and a small circle $\abs{z-a} = \rho$ lying inside $C$. Cut that region by a corridor if you wish to quote [[#thm-cauchy]] on a single simple path; the integrals along the corridor cancel, and one is left with
$$
\int_{C} \frac{f(z)}{z-a}\,\dd z = \int_{\abs{z-a}=\rho} \frac{f(z)}{z-a}\,\dd z.
$$
Write $f(z) = f(a) + \bigl(f(z)-f(a)\bigr)$. The first piece integrates to $f(a)$ times $2\pi i$, by [[#eq-circle]]. The second piece is bounded by the length $2\pi\rho$ times the maximum of $\abs{f(z)-f(a)}/\rho$ on the circle, which is $2\pi$ times that maximum of $\abs{f-f(a)}$. Analyticity implies continuity, so the maximum tends to $0$ as $\rho \to 0$. The integral does not depend on $\rho$, and the only number that survives is $2\pi i\, f(a)$.
:::

Differentiating under the integral with respect to $a$, which is legitimate because the integrand is continuous in $(z, a)$ for $z$ on $C$ and $a$ inside, gives the formula for the derivative.

::: corollary Derivative as a contour integral {#cor-deriv}
Under the same hypotheses,
$$
f'(a) = \frac{1}{2\pi i}\int_{C} \frac{f(z)}{(z-a)^{2}}\,\dd z.
$$
:::

::: proof
Difference quotients of [[#eq-cif]] in the parameter $a$ pass inside the integral. On $C$, the difference quotient of $1/(z-a)$ converges uniformly to $1/(z-a)^{2}$. The resulting integral is the displayed formula.
:::

::: example The exponential on the unit circle {#ex-exp-circle}
Evaluate $\displaystyle\int_{\abs{z}=1} \frac{e^{z}}{z^{2}}\,\dd z$.
::: solution
The integrand is $f(z)/(z-a)^{2}$ with $f(z) = e^{z}$ and $a = 0$. The exponential is analytic everywhere, and the unit circle is inside that region. [[#cor-deriv]] gives
$$
\int_{\abs{z}=1} \frac{e^{z}}{z^{2}}\,\dd z = 2\pi i\, f'(0) = 2\pi i,
$$
since $f'(z) = e^{z}$ and $e^{0} = 1$. The same conclusion is the residue statement of the next section: $e^{z}/z^{2} = z^{-2} + z^{-1} + 1/2 + \cdots$, and the coefficient of $z^{-1}$ is $1$, so the integral is $2\pi i$ times $1$.
:::
:::

## The residue theorem {#residues}

A point $a$ is an **isolated singularity** of $f$ if $f$ is analytic in a punctured neighbourhood $0 < \abs{z-a} < \rho$ but not at $a$ itself. It is a **pole of order $1$**, or a simple pole, if $(z-a)f(z)$ extends to a function analytic at $a$ and non-zero there.

::: lemma Residue at a simple pole {#lem-simple}
If $f$ has a simple pole at $a$ and $L = \lim_{z \to a}(z-a)f(z)$, then on a small anticlockwise circle about $a$,
$$
\int \frac{f(z)}{1}\,\dd z = 2\pi i\, L.
$$
The number $L$ is the **residue** of $f$ at $a$, written $\Res(f, a)$. If $f = g/h$ with $g$ and $h$ analytic, $h(a) = 0$, $h'(a) \ne 0$ and $g(a) \ne 0$, then
$$
\Res(f, a) = \frac{g(a)}{h'(a)}.
$$ {#eq-res-quot}
:::

::: proof
By the definition of a simple pole, $g_1(z) = (z-a)f(z)$ is analytic at $a$ and $g_1(a) = L$, so $f(z) = L/(z-a) + \bigl(g_1(z) - L\bigr)/(z-a)$. The second term is analytic once it is given the value $g_1'(a)$ at $z = a$. Its integral over the small circle vanishes by [[#thm-cauchy]]. The first term integrates to $2\pi i\, L$ by [[#eq-circle]].

For the quotient, $h(z) = (z-a)h_1(z)$ with $h_1(a) = h'(a) \ne 0$, so $(z-a)f(z) = g(z)/h_1(z)$ and the limit is $g(a)/h'(a)$.
:::

The wording of the integral in the lemma is the ordinary contour integral of $f$; the fraction over $1$ is only there to keep the sentence a formula. In calculations we write $\int f\,\dd z = 2\pi i\, L$.

::: theorem Residue theorem {#thm-residue}
Let $C$ be a simple closed path, anticlockwise. Let $f$ be analytic inside and on $C$ except for finitely many isolated singularities $a_1, \ldots, a_n$ inside $C$, and assume $f'$ is continuous on the remaining region. Then
$$
\int_{C} f(z)\,\dd z = 2\pi i \sum_{j=1}^{n} \Res(f, a_j).
$$ {#eq-residue}
:::

::: proof
Draw a small anticlockwise circle $\gamma_j$ about each $a_j$, small enough that the circles lie inside $C$ and do not meet. On the region between $C$ and these circles, $f$ satisfies [[#thm-cauchy]]. The boundary of that region runs anticlockwise around $C$ and clockwise around each $\gamma_j$, so
$$
\int_{C} f\,\dd z - \sum_{j} \int_{\gamma_j} f\,\dd z = 0.
$$
Each inner integral equals $2\pi i$ times the residue, by the definition of the residue through [[#lem-simple]] when the pole is simple, and by the same small-circle definition in general: the residue *is* that integral divided by $2\pi i$. Summing gives [[#eq-residue]].
:::

For a pole of order $2$, if $(z-a)^{2} f(z)$ extends analytically, the residue is the derivative of that extension at $a$. The proof is the same splitting: $(z-a)^{2} f(z) = c_0 + c_1(z-a) + (z-a)^{2} h(z)$ with $h$ analytic, so $f(z) = c_0(z-a)^{-2} + c_1(z-a)^{-1} + h(z)$, and only the middle term survives on a small circle. We used that fact, without naming it, for $e^{z}/z^{2}$.

::: widget plot
f: 1/(x*x+1)
x: -6, 6
caption: The Lorentzian $1/(x^{2}+1)$. The area under the whole graph is $\pi$, the value computed by residues in this section. The curve is even, so the area from $0$ to $\infty$ is half of that. At $|x| = 6$ the height is $1/37$, and the tails are thin.
:::

::: widget parametric
fx: cos(t)
fy: sin(t)
t: 0, 2pi
caption: The unit circle, traversed once anticlockwise as $t$ runs from $0$ to $2\pi$. This is the contour used when $z = e^{i\theta}$ turns a real integral over a full period into a residue. The moving point has a velocity tangent to the circle, which is multiplication by $i$ in the plane.
:::

## Real integrals by residues {#real}

The passage from a closed contour back to the real line needs an estimate. On a curve of length $\ell$, if $\abs{f} \le M$, then $\abs{\int f\,\dd z} \le M\ell$. This is the ML estimate. It is crude and it is enough whenever $M\ell \to 0$.

::: theorem The Lorentzian integral {#thm-lorentz}
$$
\int_{-\infty}^{\infty} \frac{1}{x^{2}+1}\,\dd x = \pi.
$$ {#eq-lorentz}
:::

::: proof
Consider $f(z) = 1/(z^{2}+1) = 1/\bigl((z-i)(z+i)\bigr)$. The singularities are simple poles at $z = i$ and $z = -i$. By [[#eq-res-quot]], or by cancelling the factor $z-i$,
$$
\Res(f, i) = \frac{1}{2i}.
$$
For $R > 1$ let $C_R$ be the closed contour that runs along the real axis from $-R$ to $R$ and returns along the semicircle $\Gamma_R$ of radius $R$ in the upper half-plane. That semicircle is the one that makes $C_R$ anticlockwise: the real axis is traversed from left to right, and the interior lies above it, on the left of the direction of travel. The pole at $i$ is inside $C_R$. The pole at $-i$ is outside. [[#thm-residue]] gives
$$
\int_{-R}^{R} \frac{\dd x}{x^{2}+1} + \int_{\Gamma_R} \frac{\dd z}{z^{2}+1} = 2\pi i \cdot \frac{1}{2i} = \pi.
$$
On $\Gamma_R$, $\abs{z} = R$, so $\abs{z^{2}+1} \ge R^{2}-1$ and $\abs{f(z)} \le 1/(R^{2}-1)$. The length of $\Gamma_R$ is $\pi R$, and the ML estimate yields
$$
\abs{\int_{\Gamma_R} f\,\dd z} \le \frac{\pi R}{R^{2}-1}.
$$
As $R \to \infty$ the bound tends to $0$, so the integral along the arc tends to $0$. The real integral from $-R$ to $R$ therefore tends to $\pi$. The integrand is positive, and the improper integral converges to that limit.
:::

We close in the upper half-plane because that is the half-plane in which an anticlockwise contour, with the real axis running left to right, places its interior. The arc estimate itself would also have succeeded in the lower half-plane: $\abs{f}$ depends on $\abs{z}$ only. Closing below, while still running the real axis from left to right, produces a *clockwise* contour around the pole at $-i$. The integral would equal $-2\pi i$ times the residue at $-i$. That residue is $1/(-2i)$, and $-2\pi i \cdot 1/(-2i) = \pi$ again. The value is the same. The sign bookkeeping is not. For the rational function of this section either closure works if the orientation is tracked. For the exponential of the next theorem only one closure works.

The integrand is even, so the integral from $0$ to $\infty$ is $\pi/2$. A double-precision quadrature of the full line reproduces $\pi$ to the twelve digits $3.141592653589793$.

::: quiz
The factor $e^{iz}$ is to be integrated over a large semicircle. Where does it decay?
- [ ] In the lower half-plane, because $y$ is negative there and the exponent contains $e^{-y}$.
- [x] In the upper half-plane, because $e^{i(x+iy)} = e^{ix}e^{-y}$ and $e^{-y}$ is small for $y > 0$.
- [ ] Equally on both semicircles, because $\abs{e^{ix}} = 1$.
- [ ] Nowhere in the plane, because a complex exponential always has modulus $1$.
::: solution
Write $z = x+iy$. Then $e^{iz} = e^{i(x+iy)} = e^{ix}e^{-y}$, so the modulus is $e^{-y}$, not $1$. The modulus is small when $y$ is large and positive, which is the upper half-plane. In the lower half-plane $y < 0$, so $e^{-y}$ is large and the integrand grows. The identity $\abs{e^{ix}} = 1$ holds for real $x$ only. It is the reason the real integral does not decay by itself, and it says nothing about the arc.
:::
:::

::: theorem A cosine transform {#thm-cosine}
$$
\int_{0}^{\infty} \frac{\cos x}{x^{2}+1}\,\dd x = \frac{\pi}{2e}.
$$ {#eq-cosine}
:::

::: proof
The cosine is the real part of $e^{ix}$. Consider
$$
f(z) = \frac{e^{iz}}{z^{2}+1}
$$
on the same contour $C_R$ as in [[#thm-lorentz]]: real axis from $-R$ to $R$, semicircle $\Gamma_R$ in the upper half-plane, $R > 1$. The only singularity inside is the simple pole at $z = i$. By [[#eq-res-quot]],
$$
\Res(f, i) = \frac{e^{i\cdot i}}{2i} = \frac{e^{-1}}{2i}.
$$
The residue theorem gives
$$
\int_{-R}^{R} \frac{e^{ix}}{x^{2}+1}\,\dd x + \int_{\Gamma_R} f(z)\,\dd z = 2\pi i \cdot \frac{e^{-1}}{2i} = \frac{\pi}{e}.
$$
It remains to show that the arc vanishes as $R \to \infty$. Parametrize $z = Re^{i\theta}$, $\theta$ from $0$ to $\pi$. Then $\abs{e^{iz}} = \abs{e^{iR(\cos\theta + i\sin\theta)}} = e^{-R\sin\theta}$, and $\abs{z^{2}+1} \ge R^{2}-1$, so
$$
\abs{\int_{\Gamma_R} f\,\dd z} \le \frac{R}{R^{2}-1}\int_{0}^{\pi} e^{-R\sin\theta}\,\dd\theta.
$$
On $[0, \pi/2]$ the sine lies above its chord: $\sin\theta$ is concave there because its second derivative is $-\sin\theta \le 0$, and a concave function lies above the chord joining its endpoints. The chord from $(0, 0)$ to $(\pi/2, 1)$ is $2\theta/\pi$, so $\sin\theta \ge 2\theta/\pi$. Therefore
$$
\int_{0}^{\pi/2} e^{-R\sin\theta}\,\dd\theta \le \int_{0}^{\pi/2} e^{-2R\theta/\pi}\,\dd\theta = \frac{\pi}{2R}\bigl(1-e^{-R}\bigr).
$$
The integral from $0$ to $\pi$ is twice the integral from $0$ to $\pi/2$, by symmetry of $\sin\theta$ about $\pi/2$. Combining the bounds,
$$
\abs{\int_{\Gamma_R} f\,\dd z} \le \frac{\pi\bigl(1-e^{-R}\bigr)}{R^{2}-1},
$$
which tends to $0$ as $R \to \infty$. Hence
$$
\int_{-\infty}^{\infty} \frac{e^{ix}}{x^{2}+1}\,\dd x = \frac{\pi}{e}.
$$
The imaginary part is $\sin x/(x^{2}+1)$, an odd function, and its integral over a symmetric interval vanishes. The real part is even, so
$$
\int_{0}^{\infty} \frac{\cos x}{x^{2}+1}\,\dd x = \frac{1}{2}\cdot\frac{\pi}{e} = \frac{\pi}{2e}.
$$
:::

The numerical value is $\pi/(2e) = 0.577863674895$. A Fourier-weighted quadrature of the same integral returned $0.577863674892$, which agrees through the eleventh digit. The decay $e^{-y}$ is the whole reason the upper half-plane was mandatory. The factor $e^{-iz}$ has modulus $e^{y}$, which is small when $y$ is negative, and that integral would be closed below.

::: example A shifted denominator {#ex-shift}
Evaluate $\displaystyle\int_{-\infty}^{\infty} \frac{\dd x}{x^{2}-2x+2}$.
::: solution
Complete the square: $x^{2}-2x+2 = (x-1)^{2}+1$. The complex function $1/(z^{2}-2z+2)$ has poles where $z = 1 \pm i$. Only $1+i$ lies in the upper half-plane. The denominator has derivative $2z-2$, so [[#eq-res-quot]] gives
$$
\Res = \frac{1}{2(1+i)-2} = \frac{1}{2i}.
$$
The degree of the denominator exceeds the degree of the numerator by $2$, so the semicircular arc vanishes by the same ML estimate as in [[#thm-lorentz]]: the length is $\pi R$ and the modulus of the integrand is at most $1/(R^{2}-2R-2)$ for large $R$, up to adjusting the constant in the denominator, and the product still tends to $0$. Therefore the integral equals $2\pi i \cdot 1/(2i) = \pi$.

As a check, the antiderivative is $\arctan(x-1)$, and $\arctan(\infty) - \arctan(-\infty) = \pi/2 - (-\pi/2) = \pi$. The residue and the elementary antiderivative agree. The residue calculation did not need the antiderivative, which is the point of using it on integrands that do not have one.
:::
:::

::: example A full turn of a cosine {#ex-circle}
Evaluate $\displaystyle\int_{0}^{2\pi} \frac{\dd\theta}{2+\cos\theta}$.
::: solution
Put $z = e^{i\theta}$, so $\dd\theta = \dd z/(iz)$ and $\cos\theta = (z+1/z)/2$, with the contour the unit circle, anticlockwise. Then
$$
2+\cos\theta = 2 + \frac{z+1/z}{2} = \frac{z^{2}+4z+1}{2z},
$$
and the integral becomes
$$
\int_{\abs{z}=1} \frac{1}{iz}\cdot\frac{2z}{z^{2}+4z+1}\,\dd z = \int_{\abs{z}=1} \frac{2}{i(z^{2}+4z+1)}\,\dd z.
$$
The poles are the roots of $z^{2}+4z+1 = 0$, namely $z = -2 \pm \sqrt{3}$. The root inside the unit circle is $z_{\mathrm{in}} = -2+\sqrt{3}$, because $\sqrt{3} < 2$ and $\abs{-2+\sqrt{3}} = 2-\sqrt{3} < 1$. The other root has modulus $2+\sqrt{3} > 1$. The derivative of the quadratic is $2z+4$, and at $z_{\mathrm{in}}$ it equals $2(-2+\sqrt{3})+4 = 2\sqrt{3}$. The residue of the integrand is
$$
\frac{2}{i\cdot 2\sqrt{3}} = \frac{1}{i\sqrt{3}}.
$$
[[#thm-residue]] multiplies by $2\pi i$ and gives $2\pi/\sqrt{3}$. The general pattern for $a > b > 0$ is $\int_{0}^{2\pi} \dd\theta/(a+b\cos\theta) = 2\pi/\sqrt{a^{2}-b^{2}}$. Here $a = 2$, $b = 1$, and $2\pi/\sqrt{3} = 3.62759872847$.
:::
:::

::: warning Which half-plane, and which poles
Closing a contour is legal only when the integral over the arc tends to zero, and only the poles actually inside the closed path are counted. For $\int e^{iz}/(z^{2}+1)\,\dd z$ one has $e^{iz} = e^{i(x+iy)} = e^{ix}e^{-y}$, so the factor decays for $y > 0$ and the upper half-plane is the one that works. The opposite exponential $e^{-iz}$ has modulus $e^{y}$ and decays in the lower half-plane. A rational function with no exponential may allow either half-plane, but the orientation changes if the real axis is kept running left to right, and a clockwise contour brings a minus sign in front of $2\pi i$. Leaving out a pole, or including the pole in the other half-plane, produces a wrong value with no warning from the algebra of the residue itself.
:::

## Where this leads {#leads}

Fourier integrals are this chapter with a continuous frequency. The transform pair used in [[math-methods/fourier]] writes a function as a superposition of $e^{ikx}$, and the inversion integral is a contour integral when the function is rational. Driven linear circuits are the same exponential: impedance is a complex number, and the real part of a product of exponentials is the physical current.

The logarithm is the integral of $1/z$. On the plane cut along the negative real axis one may set $\log z = \ln\abs{z} + i\operatorname{Arg} z$ with the argument in $(-\pi, \pi]$. The derivative is $1/z$ on the cut plane. Crossing the cut jumps the argument by $2\pi$, so the function jumps by $2\pi i$. That jump is the integral [[#eq-circle]] seen from the other side: a full turn about the origin cannot be contracted, and $1/z$ has residue $1$.

::: history Cauchy, 1825
Augustin-Louis Cauchy's memoir on complex integrals is cited as 1825. The work belongs to the memoirs of 1824 and 1825; 1825 is the year used here. In that memoir the integral of an analytic function around a closed contour vanishes, under hypotheses Cauchy continued to sharpen. The residue calculus, including the systematic use of residues to evaluate real integrals, was developed by Cauchy over the following decade. Laurent's expansion of a function about an isolated singularity came later and supplies the language of principal parts. We have used only the simple-pole case and the order-two derivative formula, which is as much of that expansion as the integrals in this chapter need.
:::

::: summary
- $e^{i\theta} = \cos\theta + i\sin\theta$, and $e^{x+iy} = e^{x}(\cos y + i\sin y)$. A real oscillation is the real part of a complex exponential.
- Analytic means the complex derivative exists. The Cauchy–Riemann equations $\partial u/\partial x = \partial v/\partial y$ and $\partial u/\partial y = -\partial v/\partial x$ are necessary, and with continuous partials they are sufficient.
- If $f'$ is continuous and $f$ is analytic inside and on a simple anticlockwise contour, the integral of $f$ is zero. Cauchy's integral formula recovers $f(a)$ from the values on the contour.
- The residue at a simple pole is $\lim_{z \to a}(z-a)f(z)$, and also $g(a)/h'(a)$ for $f = g/h$. The integral around an anticlockwise contour is $2\pi i$ times the sum of the residues inside.
- Closing in the upper half-plane, with the real axis running left to right, is the anticlockwise choice. For $1/(z^{2}+1)$ the arc vanishes by the ML estimate, the residue at $i$ is $1/(2i)$, and $\int_{-\infty}^{\infty} \dd x/(x^{2}+1) = \pi$.
- For $e^{iz}/(z^{2}+1)$ the modulus on $z = x+iy$ is $e^{-y}/|z^{2}+1|$, so the arc must be placed in the upper half-plane. The integral $\int_{0}^{\infty} \cos x/(x^{2}+1)\,\dd x$ equals $\pi/(2e)$.
- A trigonometric integral over a full period becomes a residue on the unit circle by $z = e^{i\theta}$. Poles outside the circle are not included.
- Conjugation is not analytic. Cauchy's theorem does not apply to it, and the integral of $\overline{z}$ around the unit circle is $2\pi i$, not zero.
:::

## Exercises {#exercises}

::: exercise Real part of a root of unity {level=1 check="1/2"}
Find the real part of $e^{i\pi/3}$.
::: solution
By [[#eq-euler]],
$$
e^{i\pi/3} = \cos\frac{\pi}{3} + i\sin\frac{\pi}{3} = \frac{1}{2} + i\frac{\sqrt{3}}{2}.
$$
The real part is $1/2$. The modulus is $1$, as it is for every pure imaginary exponent, and the imaginary part is $\sqrt{3}/2$, which is not what was asked.
:::
:::

::: exercise Modulus of a complex exponential {level=1 check="e^2"}
Find the modulus of $e^{2+i\pi/2}$.
::: solution
Separate the exponent by the addition rule:
$$
e^{2+i\pi/2} = e^{2}\, e^{i\pi/2} = e^{2}\bigl(\cos\tfrac{\pi}{2} + i\sin\tfrac{\pi}{2}\bigr) = i e^{2}.
$$
The modulus of $i$ is $1$, and $e^{2}$ is real and positive, so the modulus is $e^{2}$. Equivalently, if $z = x+iy$ then $\abs{e^{z}} = e^{x}$, and here $x = 2$. The argument $\pi/2$ affects the direction and does not affect the length.
:::
:::

::: exercise Imaginary part of a residue {level=1 check="-1/2"}
The function $1/(z^{2}+1)$ has a simple pole at $z = i$. Find the imaginary part of the residue at that pole.
::: solution
Cancel the factor $z-i$ in the denominator $(z-i)(z+i)$:
$$
\Res = \frac{1}{2i}.
$$
Multiply numerator and denominator by $-i$: $1/(2i) = -i/(2i\cdot i) = -i/2$. The real part is $0$ and the imaginary part is $-1/2$. The integral of the function around a large anticlockwise semicircle is $2\pi i$ times this residue, which is $\pi$, a real number: the factor $2\pi i$ times $-i/2$ rotates the residue back onto the real axis. The residue itself is not the value of the real integral.
:::
:::

::: exercise A wider Lorentzian {level=2 check="pi/2"}
Evaluate $\displaystyle\int_{-\infty}^{\infty} \frac{\dd x}{x^{2}+4}$.
::: solution
The integrand is the real trace of $f(z) = 1/(z^{2}+4) = 1/\bigl((z-2i)(z+2i)\bigr)$. The poles are at $2i$ and $-2i$. Close in the upper half-plane with the semicircular contour of [[#thm-lorentz]], now of radius $R > 2$. The pole inside is $2i$, and
$$
\Res(f, 2i) = \frac{1}{4i}.
$$
The arc estimate is unchanged in structure: $\abs{z^{2}+4} \ge R^{2}-4$, the length is $\pi R$, and $\pi R/(R^{2}-4) \to 0$. [[#thm-residue]] gives
$$
\int_{-\infty}^{\infty} \frac{\dd x}{x^{2}+4} = 2\pi i \cdot \frac{1}{4i} = \frac{\pi}{2}.
$$
The antiderivative $(1/2)\arctan(x/2)$ runs from $-\pi/4$ to $\pi/4$ and confirms the value. Scaling $x = 2u$ turns the integral into $(1/2)\int \dd u/(u^{2}+1) = (1/2)\pi$, which is the same result read off [[#eq-lorentz]].
:::
:::

::: exercise A faster oscillation {level=2 check="pi/(2*e^2)"}
Evaluate $\displaystyle\int_{0}^{\infty} \frac{\cos(2x)}{x^{2}+1}\,\dd x$.
::: solution
Replace $\cos(2x)$ by the real part of $e^{i 2 z}$ and use the upper-half-plane contour of [[#thm-cosine]]. The modulus of $e^{i 2 z}$ on $z = x+iy$ is $e^{-2y}$, which decays for $y > 0$, so the same half-plane is the correct one, and the arc estimate goes through with $e^{-2R\sin\theta}$ in place of $e^{-R\sin\theta}$. The residue at $z = i$ is
$$
\frac{e^{i\cdot 2 \cdot i}}{2i} = \frac{e^{-2}}{2i}.
$$
The integral from $-\infty$ to $\infty$ of $e^{i 2 x}/(x^{2}+1)$ equals $2\pi i \cdot e^{-2}/(2i) = \pi e^{-2}$. The integrand $\cos(2x)/(x^{2}+1)$ is even and the sine partner is odd, so the integral from $0$ to $\infty$ is half of that:
$$
\frac{\pi}{2e^{2}}.
$$
The general formula $\int_{0}^{\infty} \cos(ax)/(x^{2}+1)\,\dd x = \pi e^{-a}/2$ for $a > 0$ contains both [[#eq-cosine]], where $a = 1$, and this exercise, where $a = 2$.
:::
:::

::: exercise Three plus two cosines {level=2 check="2*pi/sqrt(5)"}
Evaluate $\displaystyle\int_{0}^{2\pi} \frac{\dd\theta}{3+2\cos\theta}$.
::: solution
Substitute $z = e^{i\theta}$ on the unit circle, as in [[#ex-circle]]. Then $\dd\theta = \dd z/(iz)$ and $\cos\theta = (z+1/z)/2$, so
$$
3+2\cos\theta = 3 + \frac{z+1/z}{1} = \frac{2z^{2}+6z+2}{2z} = \frac{z^{2}+3z+1}{z}.
$$
More carefully, $2\cos\theta = z+1/z$, so $3+2\cos\theta = (3z + z^{2} + 1)/z = (z^{2}+3z+1)/z$. The integral is
$$
\int_{\abs{z}=1} \frac{1}{iz}\cdot\frac{z}{z^{2}+3z+1}\,\dd z = \int_{\abs{z}=1} \frac{1}{i(z^{2}+3z+1)}\,\dd z.
$$
The roots of $z^{2}+3z+1 = 0$ are $(-3\pm\sqrt{5})/2$. The root inside the unit circle is $(-3+\sqrt{5})/2$, whose modulus is less than $1$ because the product of the roots is $1$ and the other root $(-3-\sqrt{5})/2$ has modulus greater than $1$. The derivative $2z+3$ equals $\sqrt{5}$ at the inner root. The residue is $1/(i\sqrt{5})$, and multiplication by $2\pi i$ produces $2\pi/\sqrt{5}$.

The formula $2\pi/\sqrt{a^{2}-b^{2}}$ with $a = 3$ and $b = 2$ gives the same value, since $a^{2}-b^{2} = 5$.
:::
:::

::: exercise Fourth powers {level=3 check="pi/sqrt(2)"}
Evaluate $\displaystyle\int_{-\infty}^{\infty} \frac{\dd x}{x^{4}+1}$ by residues. Include the estimate that shows the arc vanishes.
::: hint
The poles in the upper half-plane are $e^{i\pi/4}$ and $e^{i 3\pi/4}$. At a simple root of $z^{4}+1 = 0$ the residue of $1/(z^{4}+1)$ is $1/(4z^{3}) = -z/4$.
:::
::: solution
The integrand $f(z) = 1/(z^{4}+1)$ has simple poles where $z^{4} = -1 = e^{i\pi + i 2\pi k}$. Four roots are $e^{i(\pi/4 + k\pi/2)}$ for $k = 0, 1, 2, 3$. Those in the upper half-plane are
$$
z_1 = e^{i\pi/4} = \frac{1+i}{\sqrt{2}}, \qquad z_2 = e^{i 3\pi/4} = \frac{-1+i}{\sqrt{2}}.
$$
Close with the anticlockwise semicircular contour of [[#thm-lorentz]], of radius $R > 1$. On the arc, $\abs{z^{4}+1} \ge R^{4}-1$, the length is $\pi R$, and
$$
\abs{\int_{\Gamma_R} f\,\dd z} \le \frac{\pi R}{R^{4}-1} \to 0
$$
as $R \to \infty$. The residue at a simple zero of the denominator $h(z) = z^{4}+1$ is $1/h'(z) = 1/(4z^{3})$. Since $z^{4} = -1$, one has $1/z^{3} = -z$, so $1/(4z^{3}) = -z/4$. The sum of the residues at $z_1$ and $z_2$ is
$$
-\frac{1}{4}\left(e^{i\pi/4}+e^{i 3\pi/4}\right) = -\frac{1}{4}\cdot\frac{(1+i)+(-1+i)}{\sqrt{2}} = -\frac{1}{4}\cdot\frac{2i}{\sqrt{2}} = -\frac{i\sqrt{2}}{4}.
$$
Multiply by $2\pi i$:
$$
2\pi i\left(-\frac{i\sqrt{2}}{4}\right) = \frac{2\pi\sqrt{2}}{4} = \frac{\pi}{\sqrt{2}}.
$$
The poles in the lower half-plane were outside the contour and were not added. A quadrature of the real integral agrees with $\pi/\sqrt{2} = 2.22144146908$ to the digits that double precision returns for this smooth, rapidly decaying integrand.
:::
:::

::: exercise Conjugation on the unit circle {level=3}
Evaluate $\displaystyle\int_{\abs{z}=1} \overline{z}\,\dd z$, taking the circle anticlockwise. Explain why the result does not contradict [[#thm-cauchy]].
::: hint
On the unit circle, $\overline{z} = 1/z$. Parametrize $z = e^{i\theta}$ if you prefer to avoid that identity.
:::
::: solution
Parametrize $z = e^{i\theta}$, $\theta$ from $0$ to $2\pi$. Then $\overline{z} = e^{-i\theta}$ and $\dd z = i e^{i\theta}\,\dd\theta$, so
$$
\overline{z}\,\dd z = e^{-i\theta}\cdot i e^{i\theta}\,\dd\theta = i\,\dd\theta.
$$
The integral is $\int_{0}^{2\pi} i\,\dd\theta = 2\pi i$. The same computation is the observation that $\overline{z} = 1/z$ on $\abs{z} = 1$, and [[#eq-circle]] with $a = 0$ gives $\int \dd z/z = 2\pi i$.

[[#thm-cauchy]] does not apply, because its hypothesis fails. The function $\overline{z}$ is not analytic at any point: [[#ex-cr]] showed that the Cauchy–Riemann equations fail everywhere. The integral of a non-analytic function around a closed path need not vanish, and this one does not. The calculation is a reminder that smoothness as a map from the plane to the plane is not the hypothesis the theorem uses.
:::
:::
