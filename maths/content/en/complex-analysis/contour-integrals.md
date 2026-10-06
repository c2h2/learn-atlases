On the real line there is essentially one way to integrate from $a$ to $b$: along the interval. In the complex plane there are infinitely many routes from one point to another, and a complex integral is taken along a chosen curve. Here is the computation that drives the rest of this course. Walk once around the unit circle, $z = e^{it}$ for $0 \le t \le 2\pi$, and add up the values of $1/z$ multiplied by the small steps $dz = ie^{it}\,dt$:

$$
\oint_{\abs z = 1}\frac{dz}{z} = \int_0^{2\pi}\frac{ie^{it}}{e^{it}}\,dt = \int_0^{2\pi} i\,dt = 2\pi i .
$$

The answer is not zero, even though the path is closed — and, as we shall see, it does not change if the circle is replaced by any other closed curve going once around the origin. The integral is detecting the point $0$ where $1/z$ misbehaves, and counting how often the curve winds around it. Cauchy's theorem, the integral formula and the residue theorem are all elaborations of this one calculation.

In this chapter we define paths and contour integrals, learn to compute them by parametrisation, bound them with the **ML-inequality**, and find when they can be computed by antiderivatives — and when, as for $1/z$ around the origin, they cannot.

## Paths and contours

::: definition Paths and contours {#def-path}
A **path** is a continuous map $\gamma\colon[a, b]\to\C$; its **initial point** is $\gamma(a)$ and its **final point** $\gamma(b)$. The path is **closed** if $\gamma(a) = \gamma(b)$, and **simple** if it does not cross itself ($\gamma(s) \neq \gamma(t)$ for $s < t$, except that $\gamma(a) = \gamma(b)$ is allowed for a closed path). It is **smooth** if $\gamma$ has a continuous derivative $\gamma'(t) = x'(t) + iy'(t)$ on $[a,b]$ (one-sided at the ends), and a **contour** if it is **piecewise smooth**: $[a,b]$ splits into finitely many subintervals on each of which $\gamma$ is smooth.
:::

The two contours used most often are:

- the **segment** from $z_0$ to $z_1$, written $[z_0, z_1]$: $\gamma(t) = z_0 + t(z_1 - z_0)$, $0\le t\le1$, with $\gamma'(t) = z_1 - z_0$;
- the **circle** with centre $a$ and radius $r$, positively oriented (counterclockwise), written $\abs{z - a} = r$ or $C(a, r)$: $\gamma(t) = a + re^{it}$, $0 \le t\le 2\pi$, with $\gamma'(t) = ire^{it}$.

The **reverse** of $\gamma\colon[a,b]\to\C$ is $\gamma^-(t) = \gamma(a + b - t)$, the same curve traversed backwards. If the final point of $\gamma_1$ is the initial point of $\gamma_2$, the **concatenation** $\gamma_1 + \gamma_2$ follows $\gamma_1$ and then $\gamma_2$; a polygon, for instance, is the concatenation of its sides.

The derivative $\gamma'(t)$ is the **velocity** of the moving point $\gamma(t)$, a vector tangent to the curve, and $\abs{\gamma'(t)}$ is its speed. The **length** of a contour is the integral of the speed,

$$
L(\gamma) = \int_a^b\abs{\gamma'(t)}\,dt ,
$$

which agrees with the arc length of [[multivariable/vector-functions]]. For the circle $C(a, r)$, $\abs{\gamma'(t)} = r$ and $L = 2\pi r$.

::: widget parametric
fx: 0.5 + a*cos(t)
fy: a*sin(t)
t: 0, 2pi
sliders: a=1:0.3:2:0.1
x: -1.7, 2.7
y: -2.2, 2.2
equal: true
trace: true
caption: The circle $\gamma(t) = \tfrac12 + ae^{it}$ traced counterclockwise, with its velocity vector $\gamma'(t) = iae^{it}$. Multiplication by $i$ turns the radius vector through a right angle, so the velocity is always tangent to the circle, and its length is the constant speed $a$. Change the radius with the slider: the length $2\pi a$ of the path is the time ($2\pi$) times the speed.
:::

## Integrating complex functions of a real variable

Before integrating along curves we need integrals of complex-valued functions on an interval. If $\phi\colon[a,b]\to\C$ is continuous (or piecewise continuous), with $\phi = \alpha + i\beta$, we define

$$
\int_a^b\phi(t)\,dt = \int_a^b\alpha(t)\,dt + i\int_a^b\beta(t)\,dt .
$$

This integral is linear over $\C$ (one checks $\int c\phi = c\int\phi$ for complex $c$ by splitting into real and imaginary parts), and the fundamental theorem of calculus holds: if $\Phi' = \phi$ on $[a,b]$ then $\int_a^b\phi = \Phi(b) - \Phi(a)$, by applying the real theorem to real and imaginary parts. For example, since $\frac{d}{dt}\frac{e^{it}}{i} = e^{it}$,

$$
\int_0^{\pi}e^{it}\,dt = \frac{e^{i\pi} - 1}{i} = \frac{-2}{i} = 2i,
$$

which matches $\int_0^\pi\cos t\,dt + i\int_0^\pi\sin t\,dt = 0 + 2i$.

The one property that needs an idea is the triangle inequality for integrals.

::: lemma Modulus of an integral {#lem-modulus}
If $\phi\colon[a,b]\to\C$ is piecewise continuous, then

$$
\left\lvert\int_a^b\phi(t)\,dt\right\rvert \le \int_a^b\abs{\phi(t)}\,dt .
$$
:::

::: proof
Let $I = \int_a^b\phi(t)\,dt$. If $I = 0$ there is nothing to prove. Otherwise write $I = \abs Ie^{i\theta}$. Then, using linearity,

$$
\abs I = e^{-i\theta}I = \int_a^b e^{-i\theta}\phi(t)\,dt .
$$

The left side is real, so the right side equals its own real part, which is $\int_a^b\operatorname{Re}\big(e^{-i\theta}\phi(t)\big)\,dt$. Since $\operatorname{Re} w \le \abs w$ and $\abs{e^{-i\theta}} = 1$,

$$
\abs I = \int_a^b\operatorname{Re}\big(e^{-i\theta}\phi(t)\big)\,dt \le \int_a^b\abs{\phi(t)}\,dt .
$$
:::

The trick — rotate the integral onto the positive real axis, then compare real parts — is worth remembering: it reduces a statement about complex numbers to the monotonicity of real integrals.

## Contour integrals

::: definition Contour integral {#def-contour-integral}
Let $\gamma\colon[a,b]\to\C$ be a contour and $f$ a function continuous on the image of $\gamma$. The **integral of $f$ along $\gamma$** is

$$
\int_\gamma f(z)\,dz = \int_a^b f\big(\gamma(t)\big)\,\gamma'(t)\,dt .
$$ {#eq-contour}

(At the finitely many points where $\gamma'$ jumps, the integrand has jump discontinuities, which do not affect the integral; equivalently, sum the integrals over the smooth pieces.) For closed contours one often writes $\oint_\gamma$.
:::

The formula is what the notation suggests: substitute $z = \gamma(t)$ and $dz = \gamma'(t)\,dt$. It is also a limit of Riemann sums $\sum f(z_k)(z_{k+1} - z_k)$ over points $z_k$ along the curve — complex values multiplied by complex steps.

::: proposition Basic properties {#prop-props}
Let $\gamma$ be a contour and $f, g$ continuous on it.

1. **Linearity**: $\int_\gamma(\alpha f + \beta g)\,dz = \alpha\int_\gamma f\,dz + \beta\int_\gamma g\,dz$ for $\alpha,\beta\in\C$.
2. **Reparametrisation**: if $\varphi\colon[c,d]\to[a,b]$ is a continuously differentiable increasing bijection, then $\int_{\gamma\circ\varphi}f\,dz = \int_\gamma f\,dz$.
3. **Reversal**: $\int_{\gamma^-}f\,dz = -\int_\gamma f\,dz$.
4. **Additivity**: $\int_{\gamma_1 + \gamma_2} f\,dz = \int_{\gamma_1}f\,dz + \int_{\gamma_2}f\,dz$.
:::

::: proof
(1) follows from the linearity of the integral of a complex-valued function of a real variable. For (2), assume first that $\gamma$ is smooth; by the chain rule $(\gamma\circ\varphi)'(s) = \gamma'(\varphi(s))\varphi'(s)$, and the substitution $t = \varphi(s)$ (applied to real and imaginary parts) gives

$$
\int_c^d f(\gamma(\varphi(s)))\,\gamma'(\varphi(s))\,\varphi'(s)\,ds = \int_a^b f(\gamma(t))\,\gamma'(t)\,dt .
$$

For a contour, apply this to each smooth piece. (3) Here $(\gamma^-)'(t) = -\gamma'(a + b - t)$, and the substitution $s = a + b - t$ reverses the limits:

$$
\int_a^b f(\gamma(a + b - t))\,\big(-\gamma'(a+b-t)\big)\,dt = -\int_a^b f(\gamma(s))\,\gamma'(s)\,ds .
$$

(4) is the additivity of the integral over subintervals, after parametrising $\gamma_1 + \gamma_2$ on adjacent intervals.
:::

So a contour integral depends only on the oriented curve, not on how fast we traverse it. Writing $f = u + iv$ and $dz = dx + i\,dy$ and multiplying out,

$$
\int_\gamma f\,dz = \int_\gamma(u\,dx - v\,dy) + i\int_\gamma(v\,dx + u\,dy),
$$ {#eq-line-integrals}

so a contour integral is a pair of real line integrals of the kind studied in [[multivariable/line-integrals]].

::: theorem The fundamental integral {#thm-fundamental}
For $a\in\C$, $r > 0$ and $n\in\Z$,

$$
\oint_{\abs{z-a} = r}(z - a)^n\,dz = \begin{cases} 2\pi i & \text{if } n = -1,\\ 0 & \text{if } n\neq -1.\end{cases}
$$
:::

::: proof
With $\gamma(t) = a + re^{it}$, $(\gamma(t) - a)^n = r^ne^{int}$ and $\gamma'(t) = ire^{it}$, so

$$
\oint_{\abs{z-a}=r}(z - a)^n\,dz = \int_0^{2\pi}r^ne^{int}\,ire^{it}\,dt = ir^{n+1}\int_0^{2\pi}e^{i(n+1)t}\,dt .
$$

If $n = -1$ the integrand is $1$ and the integral is $2\pi i$. Otherwise $\frac{e^{i(n+1)t}}{i(n+1)}$ is an antiderivative of $e^{i(n+1)t}$, and it takes the same value at $t = 0$ and $t = 2\pi$, so the integral is $0$.
:::

This theorem is worth memorising together with its proof. It will be the engine of the residue theorem, where a function is expanded as a sum of powers $(z - a)^n$ and only the term with $n = -1$ survives integration.

::: example The same endpoints, different answers {#ex-path-dependence}
Compute $\int_\gamma\bar z\,dz$ and $\int_\gamma z^2\,dz$ from $0$ to $1 + i$ along (a) the segment $[0, 1 + i]$, and (b) the path $\gamma_2$ from $0$ to $1$ and then from $1$ to $1+i$ along straight lines.
::: solution
(a) On the segment, $z = (1 + i)t$, $dz = (1+i)\,dt$ and $\bar z = (1 - i)t$:

$$
\int_{[0, 1+i]}\bar z\,dz = \int_0^1(1 - i)t\,(1 + i)\,dt = 2\int_0^1 t\,dt = 1 .
$$

(b) On $[0, 1]$, $z = t$ and $dz = dt$, giving $\int_0^1t\,dt = \tfrac12$. On $[1, 1+i]$, $z = 1 + it$, $dz = i\,dt$ and $\bar z = 1 - it$, giving

$$
\int_0^1(1 - it)\,i\,dt = i\int_0^1(1 - it)\,dt = i\Big(1 - \frac i2\Big) = \frac12 + i .
$$

The total along $\gamma_2$ is $1 + i \neq 1$: **the integral of $\bar z$ depends on the path.**

For $z^2$: on the segment $\int_0^1(1+i)^2t^2(1 + i)\,dt = \frac{(1+i)^3}{3}$. Along $\gamma_2$: $\int_0^1t^2\,dt + \int_0^1(1 + it)^2\,i\,dt = \tfrac13 + \big[\tfrac{(1+it)^3}{3}\big]_0^1 = \tfrac13 + \tfrac{(1+i)^3 - 1}{3} = \tfrac{(1+i)^3}{3}$. Both routes give $\frac{(1+i)^3}{3} = \frac{-2 + 2i}{3}$. For the analytic function $z^2$ the path did not matter; we will see why in the section on antiderivatives.
:::
:::

::: quiz
What is $\displaystyle\oint_{\abs z = 2}\bar z\,dz$?
- [ ] $0$, because the path is closed
- [ ] $2\pi i$
- [x] $8\pi i$
- [ ] $4\pi i$
::: solution
On the circle $\abs z = 2$ we have $z\bar z = 4$, so $\bar z = 4/z$ there, and by [[#thm-fundamental]] $\oint 4/z\,dz = 4\cdot2\pi i = 8\pi i$. (Directly: $\int_0^{2\pi}2e^{-it}\cdot 2ie^{it}\,dt = 8\pi i$.) Closed paths only give zero for special integrands; $\bar z$ is not analytic, and in general $\oint_{\abs z = r}\bar z\,dz = 2\pi i r^2$, which is $2i$ times the area enclosed ([[#exr-area]]).
:::
:::

::: widget contourint
f: 1/z
center: 0.3, 0.2
radius: 1
poles: 0, 0
caption: The numerically computed integral of $1/z$ around a movable circle, compared with $2\pi i$ times the residues inside (for $1/z$ the only residue is $1$, at the origin; residues are defined in [[complex-analysis/residues]]). Drag and resize the circle: as long as it encloses the origin the integral is exactly $2\pi i \approx 6.283i$, whatever the centre and radius; as soon as the origin is outside, it drops to $0$. Proving this in general is the job of [[complex-analysis/cauchy-theorem]].
:::

## The ML-inequality

Most contour integrals cannot be computed exactly, but they can be estimated, and estimates are often all we need — for example to show that an integral over a large semicircle tends to $0$, the key step in evaluating real integrals by residues.

::: theorem ML-inequality {#thm-ml}
Let $\gamma$ be a contour of length $L$, and $f$ continuous on $\gamma$ with $\abs{f(z)}\le M$ for all $z$ on $\gamma$. Then

$$
\left\lvert\int_\gamma f(z)\,dz\right\rvert\le ML .
$$
:::

::: proof
By [[#lem-modulus]] and the bound on $f$,

$$
\left\lvert\int_a^b f(\gamma(t))\gamma'(t)\,dt\right\rvert \le \int_a^b\abs{f(\gamma(t))}\,\abs{\gamma'(t)}\,dt \le M\int_a^b\abs{\gamma'(t)}\,dt = ML .
$$
:::

::: example An integral over a large semicircle {#ex-semicircle}
Let $C_R$ be the upper half of the circle $\abs z = R$, from $R$ to $-R$. Show that $\displaystyle\int_{C_R}\frac{dz}{z^2 + 1}\to 0$ as $R \to\infty$.
::: solution
The length of $C_R$ is $\pi R$. To bound $\frac{1}{\abs{z^2+1}}$ from *above* we need $\abs{z^2 + 1}$ from *below*, which the reverse triangle inequality provides: for $\abs z = R > 1$,

$$
\abs{z^2 + 1}\ge\abs z^2 - 1 = R^2 - 1, \qquad\text{so}\qquad \left\lvert\frac{1}{z^2 + 1}\right\rvert\le\frac{1}{R^2 - 1} .
$$

By [[#thm-ml]],

$$
\left\lvert\int_{C_R}\frac{dz}{z^2+1}\right\rvert\le\frac{\pi R}{R^2 - 1}\longrightarrow 0 \qquad (R\to\infty).
$$

In [[complex-analysis/residues]] this estimate, combined with the residue theorem, gives $\int_{-\infty}^\infty\frac{dx}{x^2+1} = \pi$ without finding an antiderivative.
:::
:::

::: warning Bound the denominator from below
A frequent error is to write $\abs{z^2 + 1}\le R^2 + 1$ and conclude $\frac{1}{\abs{z^2 + 1}} \le \frac{1}{R^2 + 1}$. The first inequality is true, but taking reciprocals reverses it: an *upper* bound for the denominator gives a *lower* bound for the fraction. To bound a quotient from above you need an upper bound for the numerator and a lower bound for the denominator, usually from $\abs{z - w}\ge\bigl\lvert\abs z - \abs w\bigr\rvert$.
:::

A second consequence of the ML-inequality lets us interchange limits and integrals, which we will need for power series.

::: corollary Uniform limits {#cor-uniform}
If $f_n\to f$ uniformly on a contour $\gamma$ (all functions continuous), then $\int_\gamma f_n\,dz\to\int_\gamma f\,dz$. In particular, a series $\sum g_k$ of continuous functions converging uniformly on $\gamma$ can be integrated term by term.
:::

::: proof
Let $M_n = \sup_{z\in\gamma}\abs{f_n(z) - f(z)}$; uniform convergence means $M_n \to 0$. By [[#thm-ml]], $\left\lvert\int_\gamma f_n\,dz - \int_\gamma f\,dz\right\rvert \le M_nL(\gamma) \to 0$. For a series apply this to the partial sums, using linearity.
:::

Uniform convergence is studied in [[real-analysis/uniform-convergence]]; the Weierstrass M-test is the usual way to establish it.

## Antiderivatives

For real functions, $\int_a^b f = F(b) - F(a)$ whenever $F' = f$. The same is true along any contour.

::: definition Primitive {#def-primitive}
Let $f$ be continuous on a domain $D$. A **primitive** (or antiderivative) of $f$ on $D$ is an analytic function $F$ on $D$ with $F' = f$.
:::

::: theorem Fundamental theorem for contour integrals {#thm-ftc}
If $F$ is a primitive of $f$ on $D$ and $\gamma$ is a contour in $D$ from $z_0$ to $z_1$, then

$$
\int_\gamma f(z)\,dz = F(z_1) - F(z_0) .
$$

In particular $\oint_\gamma f(z)\,dz = 0$ for every closed contour $\gamma$ in $D$.
:::

::: proof
On each smooth piece, [[complex-analysis/analytic-functions#lem-curve]] gives $\frac{d}{dt}F(\gamma(t)) = F'(\gamma(t))\gamma'(t) = f(\gamma(t))\gamma'(t)$, so by the fundamental theorem of calculus for complex-valued functions of a real variable the integral over the piece is the difference of the values of $F\circ\gamma$ at its ends. Summing over the pieces, the intermediate values cancel and leave $F(\gamma(b)) - F(\gamma(a)) = F(z_1) - F(z_0)$.
:::

This explains [[#ex-path-dependence]]: $z^2$ has the primitive $z^3/3$ on $\C$, so its integral from $0$ to $1+i$ along *any* contour is $(1+i)^3/3$. It also re-proves half of [[#thm-fundamental]]: for $n\neq-1$, $(z - a)^n$ has the primitive $(z-a)^{n+1}/(n+1)$ on $\C\setminus\set a$, so its integral around any closed contour avoiding $a$ vanishes. And it shows that $\bar z$ has no primitive on any domain, since its integral depends on the path.

The case $n = -1$ is different. If $1/z$ had a primitive on $\C\setminus\set0$, its integral around the unit circle would vanish — but the integral is $2\pi i$. So **$1/z$ has no primitive on the punctured plane**. It does have one on the slit plane $\C\setminus(-\infty,0]$, namely $\Log z$ ([[complex-analysis/elementary-functions#thm-log]]), and on any domain where a branch of the logarithm exists.

::: example Integrating 1/z with a logarithm {#ex-log-primitive}
Let $\gamma$ be the right half of the unit circle from $-i$ to $i$, and $\sigma$ the left half from $i$ to $-i$ (both counterclockwise). Compute $\int_\gamma\frac{dz}z$ and $\int_\sigma \frac{dz}{z}$.
::: solution
$\gamma$ lies in the slit plane, where $\Log$ is a primitive of $1/z$, so by [[#thm-ftc]]

$$
\int_\gamma\frac{dz}z = \Log i - \Log(-i) = \frac{i\pi}{2} - \Big(-\frac{i\pi}2\Big) = i\pi .
$$

$\sigma$ crosses the negative real axis, so $\Log$ cannot be used. Instead use the branch $L(z) = \ln\abs z + i\arg z$ with $\arg z\in(0, 2\pi)$, defined and analytic on $\C\setminus[0,\infty)$, which contains $\sigma$. With this branch $L(i) = \frac{i\pi}{2}$ and $L(-i) = \frac{3i\pi}{2}$, so

$$
\int_\sigma\frac{dz}{z} = L(-i) - L(i) = i\pi .
$$

Together $\gamma + \sigma$ is the whole circle, and $i\pi + i\pi = 2\pi i$, as in [[#thm-fundamental]]. The $2\pi i$ arises precisely because no *single* branch of the logarithm works along the whole circle.
:::
:::

The same idea computes $\oint dz/z$ around curves that are not circles, piece by piece.

::: example Around a square {#ex-square}
Let $Q$ be the boundary of the square with vertices $\pm1\pm i$, traversed counterclockwise. Compute $\oint_Q\frac{dz}{z}$ without parametrising any side.
::: solution
Consider the right side $\sigma_1$, the segment from $1 - i$ to $1 + i$. It lies in the slit plane, where $\Log$ is a primitive of $1/z$, so

$$
\int_{\sigma_1}\frac{dz}{z} = \Log(1 + i) - \Log(1 - i) = \Big(\ln\sqrt2 + \frac{i\pi}{4}\Big) - \Big(\ln\sqrt2 - \frac{i\pi}{4}\Big) = \frac{i\pi}{2}.
$$

The other three sides are obtained from $\sigma_1$ by multiplying by $i$, $i^2$ and $i^3$ (rotations by quarter-turns). If $\sigma_2 = i\sigma_1$, that is, $\sigma_2(t) = i\sigma_1(t)$, then $\sigma_2'(t) = i\sigma_1'(t)$ and

$$
\int_{\sigma_2}\frac{dz}{z} = \int\frac{i\sigma_1'(t)}{i\sigma_1(t)}\,dt = \int_{\sigma_1}\frac{dz}{z} = \frac{i\pi}2 ,
$$

and likewise for the other two sides. The total is $4\cdot\frac{i\pi}{2} = 2\pi i$, the same as for the circle. Each side contributes the angle it subtends at the origin, times $i$: the integral of $1/z$ measures the total change of the argument along the curve.
:::
:::

When does a continuous function have a primitive? The answer is: exactly when its closed contour integrals all vanish.

::: theorem Existence of primitives {#thm-primitive}
Let $f$ be continuous on a domain $D$. The following are equivalent:

1. $f$ has a primitive on $D$;
2. $\oint_\gamma f\,dz = 0$ for every closed contour $\gamma$ in $D$;
3. $\int_\gamma f\,dz$ depends only on the endpoints of $\gamma$, for contours $\gamma$ in $D$.
:::

::: proof
(1) ⇒ (2) is [[#thm-ftc]]. (2) ⇒ (3): if $\gamma_1$ and $\gamma_2$ run from $z_0$ to $z_1$, then $\gamma_1 + \gamma_2^-$ is closed, so $0 = \int_{\gamma_1}f - \int_{\gamma_2}f$ by [[#prop-props]].

(3) ⇒ (1): fix $z_0\in D$ and define $F(z) = \int_{\gamma}f(\zeta)\,d\zeta$ for any contour $\gamma$ in $D$ from $z_0$ to $z$; such contours exist because $D$ is a domain (polygonal paths), and by (3) the value does not depend on the choice. Let $z\in D$ and choose $r > 0$ with $D(z, r)\subseteq D$. For $0 < \abs h < r$ the segment $[z, z + h]$ lies in $D$; following a contour to $z$ and then this segment shows $F(z + h) - F(z) = \int_{[z, z+h]}f(\zeta)\,d\zeta$. Since $\int_{[z,z+h]}d\zeta = h$,

$$
\frac{F(z + h) - F(z)}{h} - f(z) = \frac1h\int_{[z,z+h]}\big(f(\zeta) - f(z)\big)\,d\zeta .
$$

Given $\eps > 0$, continuity of $f$ at $z$ gives $\delta > 0$ such that $\abs{f(\zeta) - f(z)} < \eps$ when $\abs{\zeta - z} < \delta$. For $0 < \abs h < \min(r, \delta)$, every $\zeta$ on the segment satisfies this, and the ML-inequality (length $\abs h$) bounds the right-hand side by $\frac{1}{\abs h}\eps\abs h = \eps$. Hence $F'(z) = f(z)$.
:::

::: quiz
Which of these functions have a primitive on the punctured plane $\C\setminus\set0$? (Several may be correct.)
- [ ] $1/z$
- [x] $1/z^2$
- [x] $e^z + z^{-5}$
- [ ] $\bar z$
::: solution
$1/z^2$ has the primitive $-1/z$, and $e^z + z^{-5}$ has the primitive $e^z - \tfrac14z^{-4}$, both analytic on $\C\setminus\set0$. The function $1/z$ has no primitive there, because its integral around the unit circle is $2\pi i\neq0$ ([[#thm-primitive]]); and $\bar z$ has no primitive on any domain, because its integral around a small circle, $2\pi ir^2$, is not zero.
:::
:::

So the existence of primitives is equivalent to the vanishing of all closed contour integrals. Cauchy's theorem, in the next chapter, says that the latter holds for analytic functions on discs and on any domain "without holes" — and the punctured plane, with its hole at $0$, is exactly where it fails for $1/z$.

::: example Integration without parametrising {#ex-no-param}
Evaluate $\displaystyle\int_\gamma ze^{z^2}\,dz$, where $\gamma$ is any contour from $0$ to $i\sqrt\pi$ — for instance a spiral, or the arc of a parabola.
::: solution
By the chain rule $\frac{d}{dz}\frac12e^{z^2} = ze^{z^2}$, so $F(z) = \frac12 e^{z^2}$ is a primitive on $\C$. By [[#thm-ftc]],

$$
\int_\gamma ze^{z^2}\,dz = \frac12e^{(i\sqrt\pi)^2} - \frac12e^0 = \frac{e^{-\pi} - 1}{2}\approx -0.4784,
$$

independently of the shape of $\gamma$.
:::
:::

The square of [[#ex-square]] and the circles before it suggest a definition that will be central later.

::: definition Winding number {#def-winding}
Let $\gamma$ be a closed contour and $p$ a point not on $\gamma$. The **winding number** (or index) of $\gamma$ about $p$ is

$$
n(\gamma, p) = \frac{1}{2\pi i}\oint_\gamma\frac{dz}{z - p} .
$$
:::

For the circle $\abs{z - a} = r$, [[#thm-fundamental]] gives $n = 1$ at the centre $p = a$, and the remark after [[#thm-ftc]] gives $n = 0$ for points outside (where $1/(z - p)$ has the primitive $\log(z - p)$ on a disc containing the circle but not $p$). For a circle traversed twice, $n = 2$. In general the winding number is always an integer, and it does not change as $p$ moves without crossing the curve; so $n = 1$ at every point inside the circle, not only at the centre.

::: proposition Winding numbers are integers {#prop-winding}
For every closed contour $\gamma\colon[\alpha,\beta]\to\C$ and every $p$ not on $\gamma$, $n(\gamma, p)\in\Z$.
:::

::: proof
Define $g(t) = \displaystyle\int_\alpha^t\frac{\gamma'(s)}{\gamma(s) - p}\,ds$ for $t\in[\alpha,\beta]$, so that $g(\beta) = 2\pi i\,n(\gamma,p)$, and let $h(t) = (\gamma(t) - p)e^{-g(t)}$. Except at the finitely many corners of $\gamma$,

$$
h'(t) = \gamma'(t)e^{-g(t)} - (\gamma(t) - p)\,\frac{\gamma'(t)}{\gamma(t) - p}\,e^{-g(t)} = 0 ,
$$

and $h$ is continuous, so $h$ is constant: $h(t) = h(\alpha) = \gamma(\alpha) - p$. Thus $e^{g(t)} = \dfrac{\gamma(t) - p}{\gamma(\alpha) - p}$, and at $t = \beta$ the right-hand side is $1$ because $\gamma(\beta) = \gamma(\alpha)$. By [[complex-analysis/elementary-functions#thm-exp]], $g(\beta)\in2\pi i\Z$, so $n(\gamma,p)\in\Z$.
:::

The function $g(t)$ in the proof is a continuous logarithm of $\gamma(t) - p$ along the curve (up to a constant), so $\operatorname{Im} g(\beta)$ is the total change of the argument of $\gamma(t) - p$ — the winding number counts complete turns. Winding numbers return in the residue theorem and the argument principle of [[complex-analysis/residues]], and as the degree of a loop in [[topology/fundamental-group]].

::: application Circulation and flux
A two-dimensional vector field $\mathbf V = (P, Q)$ can be packed into the complex function $f = P - iQ = \overline{P + iQ}$. Then [[#eq-line-integrals]] becomes

$$
\oint_\gamma f\,dz = \oint_\gamma(P\,dx + Q\,dy) + i\oint_\gamma(P\,dy - Q\,dx),
$$

the **circulation** (work) of $\mathbf V$ around $\gamma$ plus $i$ times its **flux** across $\gamma$. For $f(z) = 1/z$ the corresponding field is $\mathbf V = \overline{1/z} = (x, y)/(x^2 + y^2)$, a source at the origin: its circulation is $0$ and its flux is $2\pi$, matching $\oint dz/z = 0 + 2\pi i$. This **Pólya field** picture links complex integration with Green's theorem ([[multivariable/greens-theorem]]) and with ideal fluid flow.
:::

::: widget vectorfield
P: x/(x^2 + y^2)
Q: y/(x^2 + y^2)
x: -2, 2
y: -2, 2
cx: 0.3 + 1.2*cos(t)
cy: 0.2 + 1.2*sin(t)
t: 0, 2pi
caption: The Pólya field $(x, y)/(x^2+y^2)$ of $f(z) = 1/z$, with the work and flux along a circle. The work (circulation) is $0$ and the flux is $2\pi$, so $\oint dz/z = 0 + 2\pi i$. A curve that does not surround the origin has zero flux as well: everything that flows in also flows out.
:::

::: history
The idea that an integral between two complex limits might depend on the path was understood by Carl Friedrich Gauss, who wrote to Friedrich Bessel in 1811 that the integral of a function between two points has the same value along different paths provided the function does not become infinite in the region between them. Gauss never published this. Augustin-Louis Cauchy developed complex integration in a memoir on definite integrals presented to the Paris Academy in 1814 (published in 1827), originally as a method for evaluating real integrals, and in 1825 published his memoir on integrals "taken between imaginary limits", which contains the first general form of Cauchy's theorem.
:::

## Where this leads

The fundamental integral $\oint dz/(z - a) = 2\pi i$ and the existence theorem for primitives set the stage for [[complex-analysis/cauchy-theorem]], which shows that analytic functions on discs (and on simply connected domains) have primitives, so that their closed contour integrals vanish. The ML-inequality is the workhorse for the estimates in Cauchy's integral formula and for evaluating real integrals with [[complex-analysis/residues]], and term-by-term integration ([[#cor-uniform]]) is the bridge to the power series of [[complex-analysis/laurent-series]]. The number $\frac{1}{2\pi i}\oint\frac{dz}{z - a}$ counts how many times a curve winds around $a$ — a topological invariant studied in [[topology/fundamental-group]].

::: summary
- A contour is a piecewise smooth path; $\int_\gamma f\,dz = \int_a^b f(\gamma(t))\gamma'(t)\,dt$ is unchanged by reparametrisation and changes sign when the path is reversed.
- The basic computation: $\oint_{\abs{z-a}=r}(z-a)^n\,dz$ is $2\pi i$ for $n = -1$ and $0$ for every other integer $n$.
- $\left\lvert\int\phi\right\rvert \le\int\abs\phi$, and hence the ML-inequality $\left\lvert\int_\gamma f\,dz\right\rvert\le M\,L(\gamma)$; to bound a quotient, bound the denominator from below with the reverse triangle inequality.
- Uniform convergence on $\gamma$ allows limits and series to be integrated term by term.
- If $F' = f$ on $D$, then $\int_\gamma f\,dz = F(\text{end}) - F(\text{start})$ for every contour in $D$, and closed integrals vanish.
- A continuous $f$ has a primitive on a domain if and only if all its closed contour integrals vanish; $1/z$ has none on $\C\setminus\set0$, though it has $\Log z$ on the slit plane.
:::

## Exercises

::: exercise Independent of the path {level=1 check="2/3"}
Evaluate $\int_\gamma z^2\,dz$, where $\gamma$ is any contour from $-1$ to $1$.
::: solution
$z^3/3$ is a primitive of $z^2$ on $\C$, so by [[#thm-ftc]] the integral is $\frac{1^3}{3} - \frac{(-1)^3}{3} = \frac23$, for every contour.
:::
:::

::: exercise The length of a spiral {level=1 check="sqrt(2)*(e - 1)"}
Find the length of the path $\gamma(t) = e^{(1 + i)t}$, $0\le t\le1$.
::: solution
$\gamma'(t) = (1 + i)e^{(1+i)t}$, so $\abs{\gamma'(t)} = \abs{1+i}\,e^t = \sqrt2\,e^t$. Hence $L = \int_0^1\sqrt2\,e^t\,dt = \sqrt2(e - 1)\approx 2.430$.
:::
:::

::: exercise Using the fundamental integral {level=1 check="5"}
Compute $\dfrac{1}{2\pi i}\displaystyle\oint_{\abs{z - 2} = 1}\Big(\frac{5}{z - 2} + 3(z-2)^2 + \frac{7}{(z-2)^3}\Big)\,dz$.
::: solution
By linearity and [[#thm-fundamental]] with $a = 2$, only the term with $(z-2)^{-1}$ contributes: the integral is $5\cdot2\pi i + 0 + 0$, and dividing by $2\pi i$ gives $5$.
:::
:::

::: exercise A conjugate around a circle {level=2 check="8"}
Compute $\dfrac{1}{\pi i}\displaystyle\oint_{\abs z = 2}\bar z\,dz$ by parametrisation, and check the answer using $\bar z = 4/z$ on the circle.
::: solution
With $z = 2e^{it}$: $\bar z = 2e^{-it}$ and $dz = 2ie^{it}\,dt$, so $\oint\bar z\,dz = \int_0^{2\pi}4i\,dt = 8\pi i$. Alternatively, on the circle $\bar z = \abs z^2/z = 4/z$, and $\oint 4/z\,dz = 8\pi i$ by [[#thm-fundamental]]. Dividing by $\pi i$ gives $8$.
:::
:::

::: exercise An ML estimate {level=2}
Show that $\displaystyle\left\lvert\oint_{\abs z = 2}\frac{e^z}{z^2 + 1}\,dz\right\rvert\le\frac{4\pi e^2}{3}$.
::: solution
On $\abs z = 2$: $\abs{e^z} = e^{\operatorname{Re} z}\le e^2$, and $\abs{z^2 + 1}\ge\abs z^2 - 1 = 3$. So the integrand is at most $M = e^2/3$ in modulus, and the circle has length $L = 4\pi$. By [[#thm-ml]] the integral is at most $ML = 4\pi e^2/3$ in modulus.
:::
:::

::: exercise Half a circle {level=2 check="pi"}
Let $\gamma$ be the upper half of the unit circle from $1$ to $-1$. Compute $\int_\gamma\frac{dz}{z}$ (a) by parametrisation and (b) with a branch of the logarithm. What is its imaginary part?
::: solution
(a) $z = e^{it}$, $0\le t\le\pi$: $\int_0^\pi\frac{ie^{it}}{e^{it}}\,dt = i\pi$. (b) The branch with $\arg z\in(-\pi/2, 3\pi/2)$, analytic on $\C$ minus the negative imaginary axis, contains $\gamma$ and takes the values $0$ at $1$ and $i\pi$ at $-1$, so the integral is $i\pi - 0 = i\pi$. The imaginary part is $\pi$. (The principal $\Log$ cannot be used directly because $-1$ lies on its cut.)
:::
:::

::: exercise A Gaussian-type integral {level=2 check="(exp(-pi) - 1)/2"}
Evaluate $\displaystyle\int_\gamma ze^{z^2}\,dz$ along the straight segment from $0$ to $i\sqrt\pi$ by parametrisation, and confirm the value found in [[#ex-no-param]].
::: solution
Put $z = i\sqrt\pi\,t$, $0\le t\le1$, $dz = i\sqrt\pi\,dt$. Then $z^2 = -\pi t^2$ and

$$
\int_0^1 i\sqrt\pi\,t\,e^{-\pi t^2}\,i\sqrt\pi\,dt = -\pi\int_0^1 te^{-\pi t^2}\,dt = -\pi\Big[-\frac{e^{-\pi t^2}}{2\pi}\Big]_0^1 = \frac{e^{-\pi} - 1}{2}.
$$
:::
:::

::: exercise Reversing a path {level=2}
Let $\gamma$ be the segment from $1$ to $i$. Compute $\int_\gamma\operatorname{Re}(z)\,dz$ and $\int_{\gamma^-}\operatorname{Re}(z)\,dz$ directly, and check [[#prop-props]](3).
::: solution
$\gamma(t) = 1 + t(i - 1)$, so $\operatorname{Re}\gamma(t) = 1 - t$ and $\gamma'(t) = i - 1$: $\int_\gamma\operatorname{Re} z\,dz = (i - 1)\int_0^1(1 - t)\,dt = \frac{i-1}{2}$. The reverse is $\gamma^-(t) = i + t(1 - i)$ with $\operatorname{Re}\gamma^-(t) = t$ and $(\gamma^-)'(t) = 1 - i$: $\int_{\gamma^-}\operatorname{Re} z\,dz = (1 - i)\int_0^1t\,dt = \frac{1 - i}{2} = -\frac{i - 1}{2}$, as predicted.
:::
:::

::: exercise The area formula {#exr-area level=3}
Let $\gamma$ be a positively oriented simple closed contour enclosing a region $\Omega$ to which Green's theorem applies. Prove that

$$
\oint_\gamma\bar z\,dz = 2i\,\operatorname{Area}(\Omega),
$$

and check it for the circle $\abs z = r$ and for the unit square with vertices $0, 1, 1+i, i$.
::: hint
Use [[#eq-line-integrals]] with $u = x$, $v = -y$, then Green's theorem ([[multivariable/greens-theorem]]).
:::
::: solution
With $f = \bar z = x - iy$, $u = x$ and $v = -y$, [[#eq-line-integrals]] gives

$$
\oint_\gamma\bar z\,dz = \oint_\gamma(x\,dx + y\,dy) + i\oint_\gamma(-y\,dx + x\,dy).
$$

By Green's theorem $\oint(P\,dx + Q\,dy) = \iint_\Omega(Q_x - P_y)\,dA$. For the first integral $Q_x - P_y = 0 - 0 = 0$; for the second, $P = -y$ and $Q = x$ give $Q_x - P_y = 2$. Hence $\oint_\gamma\bar z\,dz = 0 + 2i\operatorname{Area}(\Omega)$. For $\abs z = r$ this is $2\pi i r^2$, matching the direct computation in the quiz above. For the unit square: the four sides $z = t$, $1 + it$, $(1 - t) + i$, $i(1 - t)$ ($0\le t\le1$) contribute $\frac12$, $\frac12 + i$, $-\frac12 + i$ and $-\frac12$ (check each by parametrisation), with total $2i = 2i\cdot1$.
:::
:::

::: exercise Shrinking circles {level=3}
Let $f$ be continuous on an open set containing $a$. Prove that

$$
\lim_{r\to0^+}\oint_{\abs{z - a} = r}\frac{f(z)}{z - a}\,dz = 2\pi i f(a).
$$
::: hint
Subtract $f(a)\oint\frac{dz}{z-a} = 2\pi if(a)$ and use the ML-inequality.
:::
::: solution
By [[#thm-fundamental]], $2\pi if(a) = \oint_{\abs{z - a}=r}\frac{f(a)}{z-a}\,dz$ for every $r > 0$. Hence

$$
\left\lvert\oint_{\abs{z-a}=r}\frac{f(z)}{z-a}\,dz - 2\pi if(a)\right\rvert = \left\lvert\oint_{\abs{z-a} = r}\frac{f(z) - f(a)}{z - a}\,dz\right\rvert\le\max_{\abs{z-a} = r}\frac{\abs{f(z) - f(a)}}{r}\cdot2\pi r = 2\pi\max_{\abs{z-a}=r}\abs{f(z) - f(a)} .
$$

By continuity of $f$ at $a$, given $\eps > 0$ there is $\delta > 0$ with $\abs{f(z) - f(a)} < \eps$ for $\abs{z - a} < \delta$; so for $0 < r < \delta$ the right-hand side is less than $2\pi\eps$. This proves the limit. (Combined with Cauchy's theorem, which will show that the integral does not depend on $r$ when $f$ is analytic, this gives Cauchy's integral formula.)
:::
:::
