In real calculus the exponential, the logarithm and the trigonometric functions are separate creatures with separate graphs. Over the complex numbers they collapse into a single family. The cosine and sine turn out to be combinations of exponentials, the exponential turns out to be *periodic*, the sine function is unbounded and takes the value $2$, and the logarithm of $-1$ exists — but has infinitely many values. These surprises are not pathologies. They are what the elementary functions really are, and real calculus only ever saw the shadow they cast on the real line.

In this chapter we define the complex exponential and prove its properties, derive the trigonometric and hyperbolic functions from it, and then face the main difficulty: inverting a function that is not one-to-one. This leads to the multivalued logarithm, to **branches** and **branch cuts**, and to complex powers $z^c$. The ideas of this chapter — especially the fact that going once around the origin changes the logarithm by $2\pi i$ — underlie the whole theory of contour integration that follows.

## The complex exponential

We want a function $e^z$ on $\C$ that extends the real exponential, is analytic, and satisfies $e^{z + w} = e^ze^w$. If the last property is to hold, then $e^{x + iy} = e^x e^{iy}$, and the natural candidate for $e^{iy}$ is the point $\cos y + i\sin y$ of the unit circle that we used as notation in [[complex-analysis/complex-numbers]]. In [[complex-analysis/analytic-functions#ex-exp-preview]] we checked that the resulting function is entire and equal to its own derivative.

::: definition The exponential function {#def-exp}
For $z = x + iy$ with $x, y\in\R$,

$$
e^z = \exp z = e^x(\cos y + i\sin y).
$$
:::

::: theorem Properties of the exponential {#thm-exp}
1. $e^z$ is entire and $\dfrac{d}{dz}e^z = e^z$.
2. $e^{z + w} = e^z e^w$ for all $z, w \in \C$.
3. $\lvert e^z\rvert = e^{\operatorname{Re} z}$ and $\operatorname{Im} z$ is an argument of $e^z$. In particular $e^z \neq 0$ for every $z$.
4. $e^z = 1$ if and only if $z = 2\pi i k$ for some $k\in\Z$. Consequently $e^z = e^w$ if and only if $z - w \in 2\pi i\Z$, and $e^z$ is periodic with period $2\pi i$.
:::

::: proof
(1) was proved in [[complex-analysis/analytic-functions#ex-exp-preview]] from the Cauchy–Riemann equations.

(2) Let $z = x + iy$ and $w = s + it$. Using $e^{x+s} = e^xe^s$ for real numbers and the multiplication rule $e^{iy}e^{it} = e^{i(y+t)}$ for points of the unit circle ([[complex-analysis/complex-numbers#thm-polar-mult]]),

$$
e^ze^w = e^xe^s\,(\cos y + i\sin y)(\cos t + i\sin t) = e^{x + s}\big(\cos(y + t) + i\sin(y + t)\big) = e^{z + w}.
$$

(3) The definition presents $e^z$ in polar form with modulus $e^x > 0$ and argument $y$. Since $e^x > 0$, $e^z \neq 0$.

(4) $e^{x+iy} = 1$ means $e^x = 1$ and $y$ is an argument of $1$, that is, $x = 0$ and $y \in 2\pi\Z$. Then, by (2) and (3), $e^z = e^w$ if and only if $e^{z - w} = e^z/e^w = 1$, if and only if $z - w \in 2\pi i\Z$.
:::

Two remarks put this definition beyond doubt. First, $e^z$ is the sum of the familiar series $\sum_{n\ge0} z^n/n!$, which converges for all $z$ (we prove in [[complex-analysis/laurent-series]] that every entire function is the sum of its Taylor series, and the Taylor coefficients of $e^z$ at $0$ are all $1/n!$ because $e^z$ is its own derivative). Second, there is no other choice: if $g$ is entire with $g' = g$ and $g(0) = 1$, then $\big(g(z)e^{-z}\big)' = g'e^{-z} - ge^{-z} = 0$, so $g(z)e^{-z}$ is constant by [[complex-analysis/analytic-functions#thm-zero-derivative]], and the constant is $g(0) = 1$. Hence $g = \exp$.

Setting $z = i\pi$ in [[#def-exp]] gives **Euler's identity** $e^{i\pi} = -1$, and the period $2\pi i$ is the reason why it is $2\pi$, not $\pi$, that appears so often in complex analysis.

### How the exponential maps the plane

Writing $w = e^{x + iy} = e^xe^{iy}$ shows how $\exp$ moves points: the real part $x$ controls the distance $e^x$ from the origin, and the imaginary part $y$ the direction.

- A **horizontal line** $y = c$ is mapped onto the open ray from $0$ at angle $c$ (as $x$ runs from $-\infty$ to $\infty$, the modulus $e^x$ runs from $0$ to $\infty$).
- A **vertical segment** $x = c$, $-\pi < y \le \pi$, is mapped onto the circle of radius $e^c$, traversed once.
- The **fundamental strip** $\set{x + iy : -\pi < y \le \pi}$ is mapped one-to-one onto $\C\setminus\set0$, and every horizontal strip of height $2\pi$ does the same; the plane is wrapped infinitely often around the punctured plane.

::: widget complexmap
f: exp(z)
mode: grid
x: -2, 1.5
y: -pi, pi
caption: The image of a rectangular grid under $e^z$. Horizontal lines become rays from the origin and vertical lines become circles, crossing at right angles. The grid has height $2\pi$, so its image, an annulus around the origin, is covered exactly once (the whole strip $-\pi < y \le \pi$ covers the punctured plane exactly once); a taller strip would wrap around again, which is the periodicity $e^{z+2\pi i} = e^z$. The left edge of the grid is squeezed towards $0$, which is never reached.
:::

::: example Solving an exponential equation {#ex-exp-eq}
Find all $z$ with $e^z = -2$.
::: solution
Write $z = x + iy$. By [[#thm-exp]], $e^z = -2$ means $\lvert e^z\rvert = e^x = 2$ and $y$ is an argument of $-2$. So $x = \ln 2$ and $y = \pi + 2\pi k$:

$$
z = \ln 2 + i(2k + 1)\pi, \qquad k \in \Z .
$$

There are infinitely many solutions, spaced $2\pi i$ apart on the vertical line $\operatorname{Re} z = \ln 2$ — as periodicity predicts.
:::
:::

## Trigonometric and hyperbolic functions

From Euler's formula, $e^{iy} = \cos y + i\sin y$ and $e^{-iy} = \cos y - i\sin y$ for real $y$. Adding and subtracting expresses cosine and sine through the exponential, and the resulting formulas make sense for every complex number.

::: definition Complex trigonometric and hyperbolic functions {#def-trig}
For $z\in\C$,

$$
\cos z = \frac{e^{iz} + e^{-iz}}{2}, \qquad \sin z = \frac{e^{iz} - e^{-iz}}{2i}, \qquad \cosh z = \frac{e^z + e^{-z}}{2}, \qquad \sinh z = \frac{e^z - e^{-z}}{2},
$$

and $\tan z = \sin z/\cos z$ and so on wherever the denominators are non-zero.
:::

For real $z$ these agree with the real functions, and they are entire, with $(\sin z)' = \cos z$ and $(\cos z)' = -\sin z$ by the chain rule. All the algebraic identities of trigonometry survive, because they are consequences of $e^{z + w} = e^ze^w$; for example

$$
\cos^2 z + \sin^2 z = \frac{(e^{iz} + e^{-iz})^2 - (e^{iz} - e^{-iz})^2}{4} = \frac{4e^{iz}e^{-iz}}{4} = 1 .
$$

The definitions also show that trigonometric and hyperbolic functions are the same functions viewed along different axes:

$$
\cos(iy) = \cosh y, \qquad \sin(iy) = i\sinh y .
$$

What does *not* survive is boundedness.

::: proposition Real and imaginary parts of sine {#prop-sin}
For $z = x + iy$,

$$
\sin z = \sin x\cosh y + i\cos x\sinh y, \qquad \lvert\sin z\rvert^2 = \sin^2 x + \sinh^2 y .
$$ {#eq-sin-modulus}

Consequently $\sin z = 0$ if and only if $z = n\pi$ with $n\in\Z$, and $\lvert \sin(iy) \rvert = \lvert\sinh y\rvert \to \infty$ as $y \to \pm\infty$.
:::

::: proof
The addition formula $\sin(x + iy) = \sin x\cos(iy) + \cos x\sin(iy)$ holds for complex arguments (it follows from the exponential definitions exactly as for real ones), and $\cos(iy) = \cosh y$, $\sin(iy) = i\sinh y$ give the first formula. Then

$$
\lvert \sin z\rvert^2 = \sin^2x\cosh^2y + \cos^2x\sinh^2y = \sin^2x(1 + \sinh^2y) + (1 - \sin^2x)\sinh^2y = \sin^2x + \sinh^2y,
$$

using $\cosh^2y - \sinh^2y = 1$. This vanishes only if $\sin x = 0$ and $\sinh y = 0$, that is, $x \in \pi\Z$ and $y = 0$.
:::

So the complex sine has no new zeros — only the real ones — but it is not bounded: on the imaginary axis it grows like $\frac12 e^{\abs y}$. This is no accident. Liouville's theorem, proved in [[complex-analysis/cauchy-theorem]], says that a bounded entire function must be constant.

::: example Solving cos z = 2 {#ex-cos2}
Find all complex solutions of $\cos z = 2$.
::: solution
Put $w = e^{iz}$, which is never $0$. The equation becomes $\frac12(w + w^{-1}) = 2$, that is, $w^2 - 4w + 1 = 0$, so $w = 2 \pm\sqrt3$ (both positive reals). Now solve $e^{iz} = 2 \pm\sqrt3$: by [[#thm-exp]], $iz = \ln(2\pm\sqrt3) + 2\pi i k$, so

$$
z = 2\pi k - i\ln(2 \pm \sqrt 3), \qquad k\in\Z .
$$

Since $(2 + \sqrt3)(2 - \sqrt3) = 1$, we have $\ln(2 - \sqrt3) = -\ln(2 + \sqrt3)$, and the solutions are $z = 2\pi k \pm i\ln(2 + \sqrt3) \approx 2\pi k \pm 1.317i$. Check: by the addition formula, $\cos(x + iy) = \cos x\cosh y - i\sin x\sinh y$, which at $x = 2\pi k$ equals $\cosh y$; and indeed $\cosh\ln(2+\sqrt3) = \frac12\big((2 + \sqrt3) + (2 - \sqrt3)\big) = 2$.
:::
:::

::: quiz
Which statement holds for **every** complex number $z$?
- [ ] $\lvert \sin z\rvert \le 1$
- [ ] $\lvert e^{iz}\rvert = 1$
- [x] $e^z \neq 0$
- [ ] $e^{z} = e^{w}$ implies $z = w$
::: solution
By [[#thm-exp]], $\lvert e^z\rvert = e^{\operatorname{Re} z} > 0$, so $e^z$ never vanishes. The others fail off the real axis: $\lvert\sin(iy)\rvert = \lvert\sinh y\rvert$ is unbounded; $\lvert e^{iz}\rvert = e^{-\operatorname{Im} z}$, which is $1$ only for real $z$; and $e^0 = e^{2\pi i}$ although $0 \neq 2\pi i$.
:::
:::

## The logarithm

For real $x > 0$, $\ln x$ is the unique real number whose exponential is $x$. In $\C$ the exponential is not one-to-one: by [[#thm-exp]], if $e^w = z$ then also $e^{w + 2\pi i k} = z$ for every integer $k$. So "the" logarithm of $z$ is really a set of numbers.

::: definition Logarithms {#def-log}
For $z \neq 0$, a **logarithm** of $z$ is any $w \in \C$ with $e^w = z$. The set of all logarithms is

$$
\log z = \ln\abs z + i\arg z = \set{\ln \abs z + i(\Arg z + 2\pi k) : k\in\Z},
$$

and the **principal logarithm** is $\Log z = \ln\abs z + i\Arg z$, whose imaginary part lies in $(-\pi, \pi]$.
:::

The description of the set follows from [[#thm-exp]]: $e^{u + iv} = z$ means $e^u = \abs z$ and $v \in \arg z$. The number $0$ has no logarithm because $e^w$ is never $0$.

::: example Some logarithms {#ex-logs}
Compute $\log(-1)$, $\log i$ and $\Log(-1 - i)$.
::: solution
$\abs{-1} = 1$ and $\arg(-1) = \set{\pi + 2\pi k}$, so $\log(-1) = \set{(2k+1)\pi i : k\in\Z}$, with principal value $\Log(-1) = i\pi$ — the logarithm form of Euler's identity. Similarly $\log i = \set{i(\tfrac\pi2 + 2\pi k)}$ and $\Log i = \tfrac{i\pi}{2}$. Finally $\abs{-1 - i} = \sqrt2$ and $\Arg(-1-i) = -\tfrac{3\pi}{4}$, so

$$
\Log(-1 - i) = \ln\sqrt2 - \frac{3\pi}{4}i = \tfrac12\ln 2 - \tfrac{3\pi}{4}i .
$$
:::
:::

The principal logarithm satisfies $e^{\Log z} = z$ for all $z \neq 0$, but $\Log(e^w) = w$ only when $-\pi < \operatorname{Im} w \le \pi$: the logarithm undoes the exponential only on the fundamental strip.

### Continuity and analyticity

The principal argument jumps by $2\pi$ as $z$ crosses the negative real axis: just above the point $-1$, $\Arg z$ is close to $\pi$; just below, close to $-\pi$. So $\Log$ is discontinuous at every point of $(-\infty, 0]$. Away from this ray it is as good as one could wish.

::: theorem The principal logarithm is analytic {#thm-log}
$\Log$ is analytic on the **slit plane** $\C\setminus(-\infty, 0]$, with

$$
\frac{d}{dz}\Log z = \frac1z .
$$
:::

::: proof
*Continuity.* For $z = x + iy = re^{i\theta}$ with $\theta = \Arg z\in(-\pi,\pi)$, the half-angle formula gives

$$
\frac{y}{r + x} = \frac{\sin\theta}{1 + \cos\theta} = \tan\frac\theta2, \qquad\text{so}\qquad \Arg z = 2\arctan\frac{y}{\abs z + x},
$$

because $\theta/2 \in (-\pi/2, \pi/2)$, the range of $\arctan$. Off the ray $(-\infty, 0]$ we have $\abs z + x > 0$, so this formula expresses $\Arg$ as a composition of continuous functions. Hence $\Arg$, and with it $\Log z = \ln\abs z + i\Arg z$, is continuous on the slit plane.

*Differentiability.* Fix $z$ in the slit plane, let $w = \Log z$, and for small $h \neq 0$ let $w_h = \Log(z + h)$. Then $w_h \neq w$ (because $e^{w_h} = z + h \neq z = e^w$) and $w_h \to w$ as $h \to 0$ by continuity. Therefore

$$
\frac{\Log(z+h) - \Log z}{h} = \frac{w_h - w}{e^{w_h} - e^w} = \left(\frac{e^{w_h} - e^w}{w_h - w}\right)^{-1} \longrightarrow \frac{1}{e^w} = \frac1z,
$$

since the difference quotient of $\exp$ tends to $\exp'(w) = e^w \neq 0$.
:::

There is nothing special about the negative real axis except convention. Any continuous choice of logarithm works equally well.

::: definition Branch of the logarithm {#def-branch}
Let $D$ be a domain not containing $0$. A **branch of the logarithm** on $D$ is a continuous function $L\colon D\to\C$ with $e^{L(z)} = z$ for all $z\in D$.
:::

For example, choosing the argument in $(0, 2\pi]$ instead of $(-\pi, \pi]$ gives a branch on $\C\setminus[0, \infty)$, which agrees with $\Log$ in the upper half-plane and differs from it by $2\pi i$ in the lower half-plane. The excluded ray is called the **branch cut**, and the point $0$, around which the values of $\log z$ are permuted, is the **branch point**.

::: proposition Branches are analytic and differ by constants {#prop-branches}
Every branch $L$ of the logarithm on a domain $D$ is analytic with $L'(z) = 1/z$. If $L_1, L_2$ are two branches on $D$, then $L_1 - L_2 = 2\pi i k$ for a single integer $k$.
:::

::: proof
The proof of differentiability in [[#thm-log]] used only continuity of $\Log$ and $e^{\Log z} = z$, so it applies word for word to $L$. For the second statement, $e^{L_1(z)} = z = e^{L_2(z)}$, so by [[#thm-exp]] the function $k(z) = \big(L_1(z) - L_2(z)\big)/2\pi i$ is continuous and takes only integer values. On a segment $[p, q]$ in $D$, the real function $t\mapsto k(p + t(q-p))$ is continuous and integer-valued, so by the intermediate value theorem it is constant. Joining any two points of $D$ by a polygonal path shows that $k$ is constant on $D$.
:::

The deeper question — *on which domains does a branch of the logarithm exist?* — has a striking answer: there is none on any domain containing a closed curve that winds around $0$ ([[#exr-no-branch]]). Going once around the origin increases every continuous choice of $\arg z$ by $2\pi$, so after a full circuit we cannot return to the value we started with. This is the first appearance of the **winding number**, which is the subject of the fundamental group in [[topology/fundamental-group]] and the key to the residue theorem in [[complex-analysis/residues]].

::: widget complexmap
f: ln(z)
mode: polar
x: -2, 2
y: -2, 2
caption: The principal logarithm straightens a polar grid: circles $\lvert z\rvert = r$ go to vertical segments $\operatorname{Re} w = \ln r$, and rays $\arg z = \theta$ go to horizontal lines $\operatorname{Im} w = \theta$. All images lie in the strip $-\pi < \operatorname{Im} w \le \pi$ — compare the grid picture of $e^z$ above, of which this is the inverse. The ray at angle $\pi$ is where the image jumps from the top of the strip to the bottom: the branch cut.
:::

::: warning Logarithm laws need care
The rule $\Log(zw) = \Log z + \Log w$ is false in general. With $z = w = -i$: $\Log(zw) = \Log(-1) = i\pi$, whereas $\Log z + \Log w = -\tfrac{i\pi}{2} - \tfrac{i\pi}{2} = -i\pi$. What *is* true is the identity of sets $\log(zw) = \log z + \log w$ (every logarithm of $z$ plus every logarithm of $w$ is a logarithm of $zw$, and every logarithm of $zw$ arises this way); for principal values the two sides differ by $0$ or $\pm 2\pi i$, exactly as for $\Arg$ in [[complex-analysis/complex-numbers]].
:::

In practice we often need the logarithm of a function, such as $\Log(1 + z^2)$ or $\sqrt{1 - z}$. The chain rule settles analyticity once we know where the inner function avoids the branch cut.

::: example Where is a composite logarithm analytic? {#ex-log-composite}
Find the largest open set on which $f(z) = \Log(1 + z^2)$ is analytic, and compute $f'$ there.
::: solution
By [[#thm-log]] and the chain rule, $f$ is analytic wherever $g(z) = 1 + z^2$ does *not* lie on the cut $(-\infty, 0]$, and there $f'(z) = \dfrac{g'(z)}{g(z)} = \dfrac{2z}{1 + z^2}$. Now $1 + z^2 \in (-\infty, 0]$ means $z^2 \in (-\infty, -1]$, that is, $z^2 = -t^2$ with $t \ge 1$, so $z = \pm it$. The bad set is therefore the pair of rays $\set{iy : y \ge 1}$ and $\set{iy : y \le -1}$ on the imaginary axis, and $f$ is analytic on their complement, a domain containing the whole real axis and the segment between $-i$ and $i$. On the rays themselves $f$ is discontinuous: for $z = x + 2i$ with small real $x$ we have $1 + z^2 = (x^2 - 3) + 4ix$, which lies just above the negative real axis when $x > 0$ and just below it when $x < 0$, so the imaginary part of $f$ jumps between about $\pi$ and about $-\pi$ as $z$ crosses the ray. (At $z = \pm i$, where $1 + z^2 = 0$, the function is not even defined.) The cuts of a composite function are the preimages of the cut of the outer function, and they always start at the points where the inner function hits the branch point.
:::
:::

::: quiz
Let $z = -i$. Which statement is correct?
- [ ] $\Log(z^2) = 2\Log z$
- [x] $\Log(z^2) = i\pi$ while $2\Log z = -i\pi$
- [ ] $\Log(z^2)$ is undefined because $z^2$ is negative
- [ ] $\Log(z^2) = -i\pi$
::: solution
$z^2 = -1$ and $\Log(-1) = \ln 1 + i\Arg(-1) = i\pi$. But $\Log(-i) = -\tfrac{i\pi}2$, so $2\Log(-i) = -i\pi$. The two differ by $2\pi i$. Negative numbers do have logarithms in $\C$; they lie on the branch cut of $\Log$, where the principal value is defined but discontinuous.
:::
:::

## Complex powers

For $x > 0$ and real $c$, $x^c = e^{c\ln x}$. We use the same formula in $\C$, with all its multivaluedness.

::: definition Complex powers {#def-power}
For $z \neq 0$ and $c\in\C$, the **powers** of $z$ with exponent $c$ are the numbers

$$
z^c = e^{c\log z} = \set{e^{c(\Log z + 2\pi i k)} : k\in\Z},
$$

and the **principal value** is $e^{c\Log z}$. On the slit plane $\C\setminus(-\infty,0]$ the principal power $z^c = e^{c\Log z}$ is analytic, and by the chain rule and [[#thm-log]]

$$
\frac{d}{dz}z^c = e^{c\Log z}\cdot\frac cz = c\,\frac{z^c}{z}.
$$
:::

How many values does $z^c$ have? The values are $e^{c\Log z}\,e^{2\pi i ck}$, $k\in\Z$, and two of them coincide exactly when $e^{2\pi i c(k - k')} = 1$, that is, when $c(k - k')$ is an integer. Hence:

- if $c$ is an integer, all values coincide and $z^c$ is the ordinary power;
- if $c = p/q$ is rational in lowest terms with $q \ge 2$, there are exactly $q$ values — for $c = 1/n$ these are the $n$-th roots of $z$ from [[complex-analysis/complex-numbers#thm-roots]];
- if $c$ is irrational or not real, there are infinitely many values.

::: example Imaginary powers {#ex-powers}
Find all values of $i^i$, and the principal value of $(1 + i)^i$.
::: solution
$\log i = i\big(\tfrac\pi2 + 2\pi k\big)$, so

$$
i^i = e^{i\log i} = e^{i\cdot i(\pi/2 + 2\pi k)} = e^{-\pi/2 - 2\pi k}, \qquad k\in\Z .
$$

All of these are *real*; the principal value ($k = 0$) is $e^{-\pi/2}\approx 0.2079$. For $(1 + i)^i$, $\Log(1 + i) = \ln\sqrt2 + \tfrac{i\pi}{4}$, so

$$
e^{i\Log(1+i)} = e^{i\ln\sqrt2 - \pi/4} = e^{-\pi/4}\big(\cos(\ln\sqrt2) + i\sin(\ln\sqrt2)\big) \approx 0.4288 + 0.1549i .
$$
:::
:::

::: warning The principal cube root of a negative number
The principal value of $(-8)^{1/3}$ is $e^{\frac13\Log(-8)} = e^{\frac13(\ln 8 + i\pi)} = 2e^{i\pi/3} = 1 + i\sqrt3$, not $-2$. All three cube roots of $-8$ are values of $(-8)^{1/3}$, but the principal branch picks the one with argument in $(-\pi/3, \pi/3]$. Many computer algebra systems follow this convention, which surprises users who expect $\sqrt[3]{-8} = -2$. Similarly, laws such as $(z^a)^b = z^{ab}$ and $z^aw^a = (zw)^a$ fail for principal values.
:::

Square roots deserve special mention. The principal square root $\sqrt z = e^{\frac12\Log z}$ is analytic on the slit plane, with derivative $\frac{1}{2\sqrt z}$, and is discontinuous across the negative real axis: just above $-r$ it is close to $i\sqrt r$, just below to $-i\sqrt r$. Following $\sqrt z$ continuously once around the origin, starting from $1$ and returning to $1$, multiplies its value by $e^{\frac12\cdot 2\pi i} = -1$.

::: widget complexmap
f: sqrt(z)
mode: domain
x: -2, 2
y: -2, 2
caption: Domain colouring of the principal square root. Hue (the argument of $\sqrt z$) varies smoothly everywhere except along the negative real axis, where the colour jumps abruptly between two opposite hues: the values just above and just below differ by a sign. Walk counterclockwise around the origin: the colours run through only *half* of the colour wheel before the jump, because the argument of $\sqrt z$ changes by $\pi$, not $2\pi$.
:::

::: intuition Riemann surfaces
Instead of cutting the plane, Riemann suggested enlarging it. Take infinitely many copies (sheets) of the slit plane, one for each branch $\Log z + 2\pi i k$, and glue the upper edge of the cut on sheet $k$ to the lower edge on sheet $k+1$. The result is a surface shaped like an infinite spiral staircase, on which $\log$ becomes a genuine single-valued (and analytic) function: walking once around the origin takes you up one floor. For $\sqrt z$ two sheets suffice, glued crosswise along the cut, because after two circuits the value returns. These **Riemann surfaces** are the starting point of a large part of modern geometry; in the language of [[topology/fundamental-group]], the exponential map from $\C$ onto $\C\setminus\set0$ is a covering map, and the spiral staircase is the logarithm's surface.
:::

::: example An inverse sine formula {#ex-arcsin}
Show that every solution of $\sin w = z$ has the form $w = -i\log\big(iz + \sqrt{1 - z^2}\big)$ for one of the two square roots, and use this to solve $\sin w = 2$.
::: solution
Put $\zeta = e^{iw}$. Then $\sin w = z$ becomes $\zeta - \zeta^{-1} = 2iz$, that is, $\zeta^2 - 2iz\zeta - 1 = 0$. By the quadratic formula,

$$
\zeta = iz \pm \sqrt{-z^2 + 1},
$$

and $w = -i\log\zeta$, which is the claimed formula (each value of the logarithm and each choice of the square root gives a solution, since the steps reverse). For $z = 2$: $\sqrt{1 - 4} = \pm i\sqrt3$, so $\zeta = i(2\pm\sqrt3)$, which has modulus $2 \pm \sqrt 3$ and argument $\frac\pi2$. Hence $\log\zeta = \ln(2 \pm\sqrt3) + i\big(\tfrac\pi2 + 2\pi k\big)$ and

$$
w = \frac\pi2 + 2\pi k - i\ln(2\pm\sqrt3) = \frac\pi2 + 2\pi k \pm i\ln(2 + \sqrt3), \qquad k\in\Z,
$$

using $\ln(2 - \sqrt 3) = -\ln(2+\sqrt3)$. So $\sin w = 2$ has infinitely many solutions, all on the vertical lines $\operatorname{Re} w = \frac\pi2 + 2\pi k$.
:::
:::

::: application Exponentials in differential equations
Complex exponentials turn the oscillating solutions of linear differential equations into algebra. For $y'' + 2y' + 5y = 0$, the trial solution $e^{\lambda t}$ gives $\lambda^2 + 2\lambda + 5 = 0$, so $\lambda = -1\pm 2i$, and $e^{(-1 + 2i)t} = e^{-t}(\cos 2t + i\sin 2t)$ by [[#def-exp]]. Its real and imaginary parts $e^{-t}\cos 2t$ and $e^{-t}\sin 2t$ are the real solutions: a damped oscillation whose decay rate $1 = -\operatorname{Re}\lambda$ and frequency $2 = \operatorname{Im}\lambda$ come from the real and imaginary parts of $\lambda$. This is the systematic method of [[ode/second-order-linear]], and it explains why engineers describe vibrations by complex frequencies.
:::

::: history
Euler's formula $e^{ix} = \cos x + i\sin x$ appears in his *Introductio in analysin infinitorum* (1748), and with it the complex exponential. The logarithms of negative numbers had caused a famous disagreement in the correspondence between Gottfried Wilhelm Leibniz and Johann Bernoulli in 1712–1713: Bernoulli argued that $\log(-x) = \log x$, Leibniz that logarithms of negative numbers are imaginary. Euler settled the question in a paper of 1749 by showing that every non-zero number has infinitely many logarithms, differing by multiples of $2\pi i$. Bernhard Riemann's dissertation of 1851 introduced the many-sheeted surfaces that make multivalued functions single-valued.
:::

## Where this leads

With $\exp$, $\Log$ and powers in hand, we have all the functions needed for the integral theory. In [[complex-analysis/contour-integrals]] the derivative $\frac{d}{dz}\Log z = \frac1z$ shows that $\frac1z$ has an antiderivative on the slit plane but not on the punctured plane — and that failure produces the number $2\pi i$ that dominates [[complex-analysis/cauchy-theorem]] and [[complex-analysis/residues]]. Branch cuts reappear when we use the residue theorem to compute integrals such as $\int_0^\infty \frac{x^{a-1}}{1 + x}\,dx$, and the mapping properties of $\exp$, $\Log$ and $z^c$ are the building blocks of [[complex-analysis/conformal-maps]].

::: summary
- $e^{x + iy} = e^x(\cos y + i\sin y)$ is entire, equals its own derivative, satisfies $e^{z+w} = e^ze^w$, never vanishes, and is periodic with period $2\pi i$; $e^z = 1$ exactly when $z\in 2\pi i\Z$.
- The exponential maps horizontal lines to rays and vertical lines to circles; each horizontal strip of height $2\pi$ is mapped one-to-one onto $\C\setminus\set0$.
- $\cos z$ and $\sin z$ are defined through $e^{\pm iz}$; all identities survive, but they are unbounded, and equations such as $\cos z = 2$ have infinitely many solutions.
- $\log z = \ln\abs z + i\arg z$ is multivalued; the principal value $\Log z$ is analytic on $\C\setminus(-\infty,0]$ with derivative $1/z$, and discontinuous on the cut.
- A branch of the logarithm is a continuous choice of $\log z$ on a domain; branches are analytic and differ by constants $2\pi i k$; none exists on a domain containing a loop around $0$.
- $z^c = e^{c\log z}$ has one value for integer $c$, $q$ values for $c = p/q$ in lowest terms, and infinitely many otherwise; laws of exponents and logarithms fail for principal values.
:::

## Exercises

::: exercise A modulus {level=1 check="e^2"}
Find $\lvert e^{2 + 3i}\rvert$.
::: solution
By [[#thm-exp]], $\lvert e^z\rvert = e^{\operatorname{Re} z}$, so $\lvert e^{2+3i}\rvert = e^2$. The imaginary part $3$ only affects the argument.
:::
:::

::: exercise A principal logarithm {level=1 check="2pi/3"}
Compute $\Log(-1 + i\sqrt3)$ and give its imaginary part.
::: solution
$\abs{-1 + i\sqrt3} = 2$ and $-1 + i\sqrt 3 = 2\big(-\tfrac12 + \tfrac{\sqrt3}{2}i\big)$ has principal argument $\tfrac{2\pi}{3}$. So $\Log(-1 + i\sqrt3) = \ln 2 + \tfrac{2\pi}{3}i$, with imaginary part $\tfrac{2\pi}3$.
:::
:::

::: exercise The principal value of i to the i {level=1 check="exp(-pi/2)"}
Compute the principal value of $i^i$.
::: solution
$\Log i = \frac{i\pi}{2}$, so the principal value is $e^{i\Log i} = e^{i\cdot i\pi/2} = e^{-\pi/2} \approx 0.208$ (see [[#ex-powers]]).
:::
:::

::: exercise An exponential equation {level=2 check="ln(2)"}
Find all $z$ with $e^z = 1 + i\sqrt3$. What is their common real part?
::: solution
$\abs{1 + i\sqrt3} = 2$ and $\arg(1 + i\sqrt3) = \frac\pi3 + 2\pi k$. So $z = \ln 2 + i\big(\frac\pi3 + 2\pi k\big)$, $k \in\Z$; the common real part is $\ln 2$.
:::
:::

::: exercise Derivative of a principal power {level=2 check="exp(-pi/2)"}
Let $f(z) = z^i = e^{i\Log z}$ (principal branch) on the slit plane. Compute $f'(i)$.
::: solution
By [[#def-power]], $f'(z) = i\,z^i/z$. At $z = i$, $z^i = e^{i\Log i} = e^{-\pi/2}$, so $f'(i) = i e^{-\pi/2}/i = e^{-\pi/2}$.
:::
:::

::: exercise Zeros and size of cosine {level=2}
Show that $\lvert\cos(x + iy)\rvert^2 = \cos^2x + \sinh^2y$, and deduce that the only zeros of $\cos z$ are $z = \frac\pi2 + n\pi$, $n \in\Z$.
::: solution
From the addition formula, $\cos(x + iy) = \cos x\cos(iy) - \sin x\sin(iy) = \cos x\cosh y - i\sin x\sinh y$. Hence

$$
\lvert\cos z\rvert^2 = \cos^2x\cosh^2y + \sin^2x\sinh^2y = \cos^2x(1 + \sinh^2y) + \sin^2x\sinh^2y = \cos^2x + \sinh^2y .
$$

This vanishes exactly when $\cos x = 0$ and $\sinh y = 0$, that is, $x = \frac\pi2 + n\pi$ and $y = 0$.
:::
:::

::: exercise The image of a strip {level=2}
Find the image of the strip $S = \set{z : 0 < \operatorname{Im} z < \pi}$ under $w = e^z$, and the image of the half-strip $\set{z : \operatorname{Re} z < 0,\ 0 < \operatorname{Im} z < \pi}$.
::: solution
For $z = x + iy\in S$, $w = e^xe^{iy}$ has modulus $e^x\in(0,\infty)$ and argument $y\in(0,\pi)$. Every point of the upper half-plane $\set{w : \operatorname{Im} w > 0}$ has a unique polar form $re^{i\theta}$ with $r > 0$ and $\theta\in(0,\pi)$, and it is the image of $z = \ln r + i\theta\in S$. So $e^z$ maps $S$ one-to-one onto the upper half-plane. Restricting to $x < 0$ restricts the modulus to $(0, 1)$: the half-strip is mapped onto the upper half of the unit disc, $\set{w : \abs w < 1,\ \operatorname{Im} w > 0}$.
:::
:::

::: exercise The principal square root {level=2}
Show that $\sqrt z = e^{\frac12\Log z}$ is analytic on $\C\setminus(-\infty,0]$ with derivative $\dfrac{1}{2\sqrt z}$, that $(\sqrt z)^2 = z$, and that $\operatorname{Re}\sqrt z > 0$ there.
::: solution
$\sqrt z$ is the composition of the analytic functions $\Log$ and $\exp$, so it is analytic on the slit plane, with derivative $e^{\frac12\Log z}\cdot\frac{1}{2z} = \frac{\sqrt z}{2z} = \frac{1}{2\sqrt z}$, using $z = (\sqrt z)^2$, which holds because $(e^{\frac12\Log z})^2 = e^{\Log z} = z$. Finally $\sqrt z = \abs z^{1/2}e^{\frac i2\Arg z}$ with $\frac12\Arg z\in(-\frac\pi2,\frac\pi2)$ on the slit plane, so its real part $\abs z^{1/2}\cos\big(\frac12\Arg z\big)$ is positive.
:::
:::

::: exercise No logarithm around the origin {#exr-no-branch level=3}
Prove that there is no continuous function $L$ on the unit circle $\set{z : \abs z = 1}$ with $e^{L(z)} = z$ for all $\abs z = 1$. Deduce that there is no branch of the logarithm on $\C\setminus\set0$, or on any domain containing the unit circle.
::: hint
Compare $L(e^{it})$ with $it$.
:::
::: solution
Suppose such an $L$ exists, and define $k(t) = \dfrac{L(e^{it}) - it}{2\pi i}$ for $t\in[0, 2\pi]$. It is continuous, and since $e^{L(e^{it})} = e^{it}$, [[#thm-exp]] shows that $k(t)$ is an integer for every $t$. A continuous integer-valued function on an interval is constant (by the intermediate value theorem), so $k(0) = k(2\pi)$. But $e^{i\cdot0} = e^{2\pi i} = 1$, so

$$
k(2\pi) - k(0) = \frac{L(1) - 2\pi i - L(1)}{2\pi i} = -1 \neq 0,
$$

a contradiction. A branch of the logarithm on a domain containing the unit circle would restrict to such an $L$, so it cannot exist.
:::
:::

::: exercise Cosine is onto {level=3}
Prove that $\cos\colon\C\to\C$ is surjective: for every $c\in\C$ there is $z$ with $\cos z = c$. Is the same true of $\exp$?
::: solution
Let $c\in\C$. As in [[#ex-cos2]], $\cos z = c$ is equivalent to $w + w^{-1} = 2c$ with $w = e^{iz}$, that is, $w^2 - 2cw + 1 = 0$. This quadratic has a root $w_0\in\C$ by the quadratic formula (square roots exist in $\C$), and $w_0 \neq 0$ because the product of the two roots is $1$. Since $w_0\neq 0$, it has a logarithm: choose $\zeta$ with $e^\zeta = w_0$ and put $z = -i\zeta$, so that $e^{iz} = w_0$. Reversing the steps, $\cos z = \frac12(w_0 + w_0^{-1}) = c$. The exponential is *not* onto: it omits exactly one value, $0$. (By Picard's theorem, a non-constant entire function can omit at most one value, so both $\cos$ and $\exp$ are extreme cases of opposite kinds.)
:::
:::
