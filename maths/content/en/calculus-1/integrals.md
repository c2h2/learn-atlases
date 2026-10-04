A car's speedometer reads $v(t)$ at each moment. How far does the car travel between $t = a$ and $t = b$? If the speed were constant, the answer would be speed × time. When it varies, we can cut the time interval into short pieces, pretend the speed is constant on each, and add up: distance $\approx\sum v(t_i)\,\Delta t_i$. The shorter the pieces, the better the approximation, and the exact distance is the *limit* of these sums. The same construction computes the area under a curve, the mass of a rod of varying density and the work done by a varying force.

This limit of sums is the **definite integral**. In this chapter we define it carefully, establish its basic properties, and prove the **fundamental theorem of calculus**, which reveals that integration and differentiation are inverse operations. That discovery turned the computation of areas — a problem that had occupied mathematicians since Archimedes — into the routine task of finding antiderivatives. At the end we use the integral to give the rigorous definition of the logarithm and the exponential function promised in earlier chapters.

## Areas and Riemann sums

Consider the region under the graph of $f(x) = x^2$ between $x = 0$ and $x = 1$. Cut $[0,1]$ into $n$ equal pieces of width $1/n$ and erect on the $k$th piece a rectangle whose height is the value of $f$ at its right end, $(k/n)^2$. The total area of the rectangles is

$$
\sum_{k=1}^n\Bigl(\frac kn\Bigr)^2\frac1n = \frac{1}{n^3}\sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6n^3} = \frac16\Bigl(1 + \frac1n\Bigr)\Bigl(2 + \frac1n\Bigr),
$$

using the formula $\sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6}$ (which can be proved by induction; see [[proofs/induction]]). As $n\to\infty$ this tends to $\frac{1\cdot2}{6} = \frac13$. The rectangles overshoot slightly, because $f$ is increasing, but the overshoot disappears in the limit, and we conclude that the area is $\frac13$. To make this into a definition we must allow pieces of unequal width and arbitrary sample points.

::: definition Partitions and Riemann sums {#def-riemann-sum}
A **partition** $P$ of $[a,b]$ is a finite list of points $a = x_0 < x_1 < \dots < x_n = b$. It divides $[a,b]$ into the subintervals $[x_{i-1}, x_i]$ of widths $\Delta x_i = x_i - x_{i-1}$; the largest width is the **mesh** $\norm{P}$. Choosing a **sample point** $x_i^*\in[x_{i-1}, x_i]$ in each subinterval, the **Riemann sum** of $f$ is

$$
S(f, P, x^*) = \sum_{i=1}^n f(x_i^*)\,\Delta x_i .
$$ {#eq-riemann-sum}
:::

When $f\ge0$ the Riemann sum is the total area of rectangles of heights $f(x_i^*)$ standing on the subintervals. Common choices of sample point are the left endpoints, the right endpoints and the midpoints.

::: widget riemann
f: x^2
a: 0
b: 1
n: 6
method: right
caption: Right-endpoint rectangles for $x^2$ on $[0,1]$. Because the function increases, every rectangle overshoots and the sum exceeds the exact area $\frac13$. Increase $n$ and watch the error shrink like $1/(2n)$; switch to left endpoints (which undershoot) and to midpoints (whose error shrinks much faster, like $1/n^2$).
:::

::: definition The definite integral {#def-integral}
A function $f$ defined on $[a,b]$ is (Riemann) **integrable** on $[a,b]$ if there is a number $I$ with the following property: for every $\eps>0$ there is a $\delta>0$ such that

$$
\bigl\lvert S(f, P, x^*) - I\bigr\rvert < \eps
$$

for every partition $P$ with $\norm{P}<\delta$ and every choice of sample points $x^*$. The number $I$ is the **definite integral** of $f$ from $a$ to $b$, written

$$
I = \int_a^b f(x)\,dx .
$$
:::

Briefly, $\int_a^b f(x)\,dx = \lim_{\norm P\to0}\sum f(x_i^*)\,\Delta x_i$. The function $f$ is the **integrand**, $a$ and $b$ are the **limits of integration**, and $x$ is a **dummy variable**: $\int_a^b f(x)\,dx = \int_a^b f(t)\,dt$. The notation records the construction — the elongated S is Leibniz's sign for a sum, and $dx$ recalls the widths $\Delta x_i$. We also set $\int_a^a f(x)\,dx = 0$ and $\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$ when $a<b$.

When $f$ takes negative values, rectangles below the axis contribute negatively, and the integral is a **signed area**: the area above the $x$-axis minus the area below it. For instance $\int_0^{2\pi}\sin x\,dx = 0$, because the arch above the axis on $[0,\pi]$ is cancelled by the arch below on $[\pi, 2\pi]$.

Which functions are integrable? Unbounded functions never are, since a single sample point can make a Riemann sum as large as we like. The **Dirichlet function** — equal to $1$ at rational numbers and $0$ at irrationals — is bounded but not integrable on $[0,1]$: every subinterval contains both kinds of number, so some Riemann sums equal $1$ and others equal $0$, however fine the partition. Fortunately all the functions we meet in practice are integrable.

::: theorem Integrability of continuous functions {#thm-integrable}
If $f$ is continuous on $[a,b]$, then $f$ is integrable on $[a,b]$. More generally, $f$ is integrable if it is bounded on $[a,b]$ and has only finitely many discontinuities there, or if it is monotonic on $[a,b]$.
:::

::: proof {collapsed}
*Sketch for continuous $f$.* For a partition $P$, let $M_i$ and $m_i$ be the maximum and minimum of $f$ on $[x_{i-1}, x_i]$ (they exist by the extreme value theorem). Every Riemann sum lies between the **lower sum** $\sum m_i\Delta x_i$ and the **upper sum** $\sum M_i\Delta x_i$. The key fact, a consequence of completeness, is that a continuous function on a closed bounded interval is *uniformly* continuous: for every $\eps>0$ there is a $\delta>0$ such that $\abs{f(s) - f(t)}<\eps$ whenever $\abs{s-t}<\delta$, with the same $\delta$ for all $s, t$. If $\norm{P}<\delta$, then $M_i - m_i < \eps$ on every subinterval, so the upper and lower sums differ by less than $\eps(b-a)$. Refining partitions, the upper sums decrease and the lower sums increase towards a common value, which is the integral. The details, and the other cases, are in [[real-analysis/riemann-integral]].
:::

::: widget riemann
f: 1 + sin(3x)
a: 0
b: 3
n: 8
method: upper
caption: Upper sums use the largest value of $f$ on each subinterval, so their rectangles cover the region under the graph; lower sums (switch the method) use the smallest value and fit inside it. Every Riemann sum lies between the two. As $n$ grows, the gap between upper and lower sums closes — the idea behind the proof of [[#thm-integrable]].
:::

Since a continuous function is integrable, any convenient sequence of partitions whose mesh tends to $0$, with any choice of sample points, computes the integral. This justifies the calculation at the start of the section.

::: example The integral of x² from the definition {#ex-x-squared}
Show that $\displaystyle\int_0^b x^2\,dx = \frac{b^3}{3}$ for every $b>0$.
::: solution
The integrand is continuous, hence integrable by [[#thm-integrable]], so it suffices to compute the limit along one sequence of partitions. Use $n$ equal subintervals of width $b/n$ with right endpoints $x_k = kb/n$:

$$
\sum_{k=1}^n\Bigl(\frac{kb}{n}\Bigr)^2\frac{b}{n} = \frac{b^3}{n^3}\sum_{k=1}^nk^2 = \frac{b^3}{n^3}\cdot\frac{n(n+1)(2n+1)}{6} = \frac{b^3}{6}\Bigl(1 + \frac1n\Bigr)\Bigl(2 + \frac1n\Bigr).
$$

The mesh $b/n$ tends to $0$ as $n\to\infty$, and the sums tend to $\frac{b^3}{6}\cdot2 = \frac{b^3}{3}$.
:::
:::

Computing integrals this way requires a closed formula for the sums, which is rarely available. The fundamental theorem below makes such computations unnecessary.

## Properties of the integral

The integral inherits simple properties from the sums that define it.

::: theorem Properties of the definite integral {#thm-integral-properties}
Let $f$ and $g$ be integrable on $[a,b]$ and let $k$ be a constant. Then:

1. **Linearity:** $f + g$ and $kf$ are integrable, with $\int_a^b(f + g) = \int_a^b f + \int_a^b g$ and $\int_a^b kf = k\int_a^b f$.
2. **Comparison:** if $f(x)\le g(x)$ for all $x\in[a,b]$, then $\int_a^b f\le\int_a^b g$.
3. **Bounds:** if $m\le f(x)\le M$ for all $x\in[a,b]$, then $m(b-a)\le\int_a^b f\le M(b-a)$.
4. **Absolute value:** if $\abs{f}$ is integrable (for instance, if $f$ is continuous), then $\abs{\int_a^b f}\le\int_a^b\abs{f}$.
5. **Additivity:** for $a<c<b$, $f$ is integrable on $[a,c]$ and on $[c,b]$, and $\int_a^b f = \int_a^c f + \int_c^b f$. With the sign conventions above this holds for any order of $a$, $b$, $c$ for which the integrals exist.
:::

::: proof
(1) For every partition and choice of sample points, $S(f+g, P, x^*) = S(f, P, x^*) + S(g, P, x^*)$ and $S(kf, P, x^*) = k\,S(f, P, x^*)$. Given $\eps>0$, choose $\delta$ so small that both $S(f,\dots)$ and $S(g,\dots)$ are within $\eps/2$ of their integrals when $\norm P<\delta$; then $S(f+g,\dots)$ is within $\eps$ of $\int f + \int g$. The constant multiple is similar.

(2) Here $S(f, P, x^*) \le S(g, P, x^*)$ for every $P$ and $x^*$, and limits preserve weak inequalities. (Formally: if $\int f > \int g$, take $\eps = \frac12\bigl(\int f - \int g\bigr)$ and a fine enough partition; then $S(f,\dots) > \int f - \eps = \int g + \eps > S(g,\dots)$, a contradiction.)

(3) Apply (2) to the constant functions $m$ and $M$, whose integrals are $m(b-a)$ and $M(b-a)$ because all their Riemann sums equal these numbers.

(4) Since $-\abs{f}\le f\le\abs{f}$, (1) and (2) give $-\int\abs f\le\int f\le\int\abs f$.

(5) We sketch the argument. Integrability on the subintervals is proved in [[real-analysis/riemann-integral]]. Given that, take partitions of $[a,c]$ and of $[c,b]$ with small mesh; together they form a partition of $[a,b]$ containing $c$, whose Riemann sum is the sum of the two separate Riemann sums. Letting the mesh tend to $0$ gives the formula.
:::

Property 3 is useful for estimating integrals that cannot be computed exactly. For example, on $[0,1]$ we have $e^{-1}\le e^{-x^2}\le1$, so $0.367 < \int_0^1e^{-x^2}\,dx\le1$; a sharper bound is found in [[#exr-bounds]].

::: theorem Mean value theorem for integrals {#thm-mvt-integral}
If $f$ is continuous on $[a,b]$, there is a $c\in[a,b]$ with

$$
\int_a^b f(x)\,dx = f(c)\,(b - a).
$$
:::

::: proof
By the extreme value theorem $f$ has a minimum value $m$ and a maximum value $M$ on $[a,b]$. By property 3, the number $\mu = \frac{1}{b-a}\int_a^b f$ satisfies $m\le\mu\le M$. Since $f$ takes the values $m$ and $M$ and is continuous, the intermediate value theorem ([[calculus-1/continuity#thm-ivt]], applied between the points where $m$ and $M$ are attained) gives a $c$ with $f(c) = \mu$. If $\mu$ equals $m$ or $M$, take $c$ to be the corresponding point.
:::

The number $\mu = \frac{1}{b-a}\int_a^bf$ is the **average value** of $f$ on $[a,b]$: a rectangle of height $\mu$ over $[a,b]$ has the same area as the region under the graph. Average values are taken up in [[calculus-1/integral-applications]].

::: quiz
Suppose $\int_0^2 f(x)\,dx = 5$ and $\int_0^2 g(x)\,dx = -1$. What is $\int_0^2\bigl(3f(x) - 2g(x)\bigr)\,dx$?
- [ ] $13$
- [x] $17$
- [ ] $15$
- [ ] It cannot be determined from this information
::: solution
By linearity, $\int_0^2(3f - 2g) = 3\cdot5 - 2\cdot(-1) = 15 + 2 = 17$. Note that the integral of a *product* $fg$ could not be determined from these two numbers: there is no product rule for integrals of that kind.
:::
:::

## The fundamental theorem of calculus

Fix $a$ and let the upper limit vary. If $f$ is integrable on every interval $[a, x]$, we obtain the **area function**

$$
F(x) = \int_a^x f(t)\,dt,
$$

which accumulates the signed area under $f$ from $a$ up to $x$. How fast does it grow? Increasing $x$ by a small $h$ adds a thin strip of width $h$ and height about $f(x)$, so $F(x+h) - F(x)\approx f(x)h$, suggesting $F'(x) = f(x)$. This is the first half of the fundamental theorem.

::: theorem Fundamental theorem of calculus, part 1 {#thm-ftc1}
Let $f$ be continuous on an interval $I$ and let $a\in I$. Then the function $F(x) = \int_a^x f(t)\,dt$ is differentiable on $I$ (one-sidedly at endpoints of $I$), and

$$
F'(x) = f(x) \qquad\text{for all } x\in I.
$$
:::

::: proof
Let $x\in I$ and $h\neq0$ with $x + h\in I$. By additivity,

$$
F(x+h) - F(x) = \int_a^{x+h}f(t)\,dt - \int_a^xf(t)\,dt = \int_x^{x+h}f(t)\,dt.
$$

By the mean value theorem for integrals ([[#thm-mvt-integral]]) applied on the interval between $x$ and $x+h$, this equals $f(c_h)\,h$ for some $c_h$ between $x$ and $x+h$. (For $h<0$, apply the theorem on $[x+h, x]$ and use $\int_x^{x+h} = -\int_{x+h}^x$; the factor $h$ comes out with the right sign.) Hence

$$
\frac{F(x+h) - F(x)}{h} = f(c_h).
$$

As $h\to0$, $c_h\to x$ because it is squeezed between $x$ and $x+h$, so $f(c_h)\to f(x)$ by continuity of $f$ at $x$. Thus $F'(x) = f(x)$.
:::

Part 1 says that **every continuous function has an antiderivative**, namely its area function — even functions like $e^{-x^2}$ whose antiderivatives cannot be written with elementary formulas.

::: widget plot
f: x^3/3 - x; x^2 - 1
x: -2.5, 3
y: -2.5, 4
tangent: 2
labels: F(x) = \int_0^x (t^2 - 1)\,dt; f(x) = x^2 - 1
caption: The blue curve is the area function $F(x) = \int_0^x(t^2-1)\,dt = \frac{x^3}{3} - x$ of the parabola $f(x) = x^2 - 1$. Drag the point of tangency: the slope of $F$ always equals the height of $f$. Where $f<0$ (between $-1$ and $1$) the accumulated signed area decreases, where $f>0$ it increases, and where $f$ crosses zero the area function has a horizontal tangent.
:::

The second half of the theorem turns this into a method for computing integrals.

::: definition Antiderivative {#def-antiderivative}
A function $G$ is an **antiderivative** of $f$ on an interval $I$ if $G'(x) = f(x)$ for all $x\in I$. The family of all antiderivatives is the **indefinite integral**, written

$$
\int f(x)\,dx = G(x) + C,
$$

where $G$ is any one antiderivative and $C$ an arbitrary constant.
:::

By [[calculus-1/mean-value-theorem#cor-same-derivative]], two antiderivatives of $f$ on an interval differ by a constant, which is why "$+\,C$" describes all of them.

::: theorem Fundamental theorem of calculus, part 2 {#thm-ftc2}
Let $f$ be integrable on $[a,b]$, and let $G$ be continuous on $[a,b]$ and differentiable on $(a,b)$ with $G'(x) = f(x)$ for all $x\in(a,b)$. Then

$$
\int_a^b f(x)\,dx = G(b) - G(a).
$$ {#eq-ftc}
:::

::: proof
Let $P$ be any partition $a = x_0<x_1<\dots<x_n = b$. On each subinterval the mean value theorem ([[calculus-1/mean-value-theorem#thm-mvt]]) gives a point $c_i\in(x_{i-1}, x_i)$ with

$$
G(x_i) - G(x_{i-1}) = G'(c_i)\,\Delta x_i = f(c_i)\,\Delta x_i.
$$

Adding these equations, the left-hand sides telescope:

$$
G(b) - G(a) = \sum_{i=1}^n\bigl(G(x_i) - G(x_{i-1})\bigr) = \sum_{i=1}^n f(c_i)\,\Delta x_i.
$$

The right-hand side is a Riemann sum for $f$ with sample points $c_i$. So for *every* partition there is a Riemann sum exactly equal to $G(b) - G(a)$. Since $f$ is integrable, Riemann sums for partitions of small mesh are within any $\eps>0$ of $\int_a^b f$; hence $\abs{G(b) - G(a) - \int_a^bf}<\eps$ for every $\eps>0$, and the two numbers are equal.
:::

The difference $G(b) - G(a)$ is written $\bigl[G(x)\bigr]_a^b$ or $G(x)\big|_a^b$. When $f$ is continuous, part 1 supplies an antiderivative and part 2 applies; this is the situation in almost all calculations. The theorem also has a natural reading as the **net change theorem**: the integral of a rate of change is the total change, $\int_a^b G'(x)\,dx = G(b) - G(a)$.

::: intuition Why differentiation and integration undo each other
Think of $f$ as a rate — litres per minute flowing into a tank — and of $\int_a^xf$ as the amount accumulated by time $x$. Part 1 says that the rate at which the accumulated amount grows is the current flow rate: *differentiating an accumulation recovers the rate*. Part 2 says that to find the total inflow over $[a,b]$ you only need the readings of any gauge $G$ that measures the contents, at the start and at the end: *integrating a rate recovers the net change*. Neither statement is surprising for a tank; the content of the theorem is that both are exactly true for every continuous rate.
:::

Reading the differentiation formulas backwards gives a table of antiderivatives, valid on any interval where the integrand is defined:

| $f(x)$ | $x^r\ (r\neq-1)$ | $\dfrac1x$ | $e^x$ | $\cos x$ | $\sin x$ | $\sec^2x$ | $\dfrac{1}{1+x^2}$ | $\dfrac{1}{\sqrt{1-x^2}}$ |
|---|---|---|---|---|---|---|---|---|
| $\int f(x)\,dx$ | $\dfrac{x^{r+1}}{r+1}$ | $\ln\abs x$ | $e^x$ | $\sin x$ | $-\cos x$ | $\tan x$ | $\arctan x$ | $\arcsin x$ |

(each plus an arbitrary constant). Every entry can be checked by differentiating the second row.

::: example Evaluating integrals {#ex-ftc}
Evaluate (a) $\displaystyle\int_0^\pi\sin x\,dx$ and (b) $\displaystyle\int_1^4\Bigl(3\sqrt{x} - \frac{1}{x^2}\Bigr)\,dx$.
::: solution
(a) An antiderivative of $\sin x$ is $-\cos x$, so

$$
\int_0^\pi\sin x\,dx = \bigl[-\cos x\bigr]_0^\pi = -\cos\pi + \cos0 = 1 + 1 = 2.
$$

A single arch of the sine curve has area exactly $2$ — a fact that would be hard to discover with rectangles alone.

(b) Write the integrand as $3x^{1/2} - x^{-2}$, with antiderivative $2x^{3/2} + x^{-1}$:

$$
\int_1^4\Bigl(3\sqrt x - \frac1{x^2}\Bigr)dx = \Bigl[2x^{3/2} + \frac1x\Bigr]_1^4 = \Bigl(16 + \frac14\Bigr) - (2 + 1) = \frac{53}{4}.
$$
:::
:::

::: example Variable limits of integration {#ex-ftc-chain}
Find $\dfrac{d}{dx}\displaystyle\int_0^{x^2}\cos(t^2)\,dt$ and $\dfrac{d}{dx}\displaystyle\int_x^{3}e^{t^2}\,dt$.
::: solution
Let $F(u) = \int_0^u\cos(t^2)\,dt$, so that $F'(u) = \cos(u^2)$ by [[#thm-ftc1]]. The first function is $F(x^2)$, and by the chain rule its derivative is

$$
F'(x^2)\cdot2x = 2x\cos(x^4).
$$

For the second, reverse the limits: $\int_x^3e^{t^2}\,dt = -\int_3^xe^{t^2}\,dt$, so its derivative is $-e^{x^2}$. Neither integrand has an elementary antiderivative, yet these derivatives are found without one.
:::
:::

::: example Signed area and total area {#ex-signed-area}
Compute $\displaystyle\int_{-1}^1(x^3 - x)\,dx$ and the total area of the region between the graph of $y = x^3 - x$ and the $x$-axis for $-1\le x\le1$.
::: solution
The integrand is odd, and directly

$$
\int_{-1}^1(x^3 - x)\,dx = \Bigl[\frac{x^4}{4} - \frac{x^2}{2}\Bigr]_{-1}^1 = \Bigl(\frac14 - \frac12\Bigr) - \Bigl(\frac14 - \frac12\Bigr) = 0.
$$

This does not mean the region has no area: the graph lies above the axis on $(-1, 0)$ and below it on $(0,1)$, and the two signed areas cancel. The total area is $\int_{-1}^1\abs{x^3 - x}\,dx$, found by splitting at the zero $x = 0$:

$$
\int_{-1}^0(x^3 - x)\,dx - \int_0^1(x^3 - x)\,dx = \Bigl(0 - \bigl(\tfrac14 - \tfrac12\bigr)\Bigr) - \Bigl(\bigl(\tfrac14 - \tfrac12\bigr) - 0\Bigr) = \frac14 + \frac14 = \frac12 .
$$

To compute an area, first find where the integrand changes sign.
:::
:::

::: quiz
What is the total area enclosed between the graph of $y = \sin x$ and the $x$-axis for $0\le x\le2\pi$?
- [ ] $0$
- [ ] $2$
- [x] $4$
- [ ] $2\pi$
::: solution
The integral $\int_0^{2\pi}\sin x\,dx$ is $0$, because the arch below the axis on $[\pi, 2\pi]$ cancels the arch above it on $[0,\pi]$. The *area* counts both arches positively: each has area $2$ ([[#ex-ftc]]), so the total is $4$.
:::
:::

::: example Displacement and distance {#ex-net-change}
A particle moves along a line with velocity $v(t) = t^2 - 4t + 3$ m/s for $0\le t\le4$. Find its displacement and the total distance travelled.
::: solution
An antiderivative of $v$ is $G(t) = \frac{t^3}{3} - 2t^2 + 3t$. The displacement is the net change in position:

$$
\int_0^4v(t)\,dt = G(4) - G(0) = \frac{64}{3} - 32 + 12 = \frac43 \text{ m}.
$$

The distance travelled counts motion in both directions, so it is $\int_0^4\abs{v(t)}\,dt$. Since $v(t) = (t-1)(t-3)$ is positive on $[0,1)$, negative on $(1,3)$ and positive on $(3,4]$, we split the interval. With $G(0) = 0$, $G(1) = \frac43$, $G(3) = 0$ and $G(4) = \frac43$,

$$
\int_0^4\abs{v}\,dt = \bigl(G(1) - G(0)\bigr) - \bigl(G(3) - G(1)\bigr) + \bigl(G(4) - G(3)\bigr) = \frac43 + \frac43 + \frac43 = 4 \text{ m}.
$$
:::
:::

::: warning The antiderivative must be valid on the whole interval
Part 2 needs $G' = f$ throughout $(a,b)$, with $f$ integrable. A careless computation gives $\int_{-1}^1\frac{dx}{x^2} = \bigl[-\frac1x\bigr]_{-1}^1 = -2$, a negative answer for a positive integrand! The error is that $\frac{1}{x^2}$ is unbounded near $0$, so it is not integrable on $[-1,1]$, and $-\frac1x$ is not an antiderivative across $0$. Such integrals are *improper*; they are studied in [[calculus-1/improper-integrals]], where this one turns out to diverge.
:::

::: quiz
What is $\dfrac{d}{dx}\displaystyle\int_x^5 \sqrt{1 + t^4}\,dt$?
- [ ] $\sqrt{1 + x^4}$
- [x] $-\sqrt{1+x^4}$
- [ ] $\sqrt{626} - \sqrt{1 + x^4}$
- [ ] $0$, because $5$ is a constant
::: solution
Writing $\int_x^5 = -\int_5^x$ and applying [[#thm-ftc1]] gives $-\sqrt{1+x^4}$. The variable is the *lower* limit, which accounts for the minus sign.
:::
:::

## The logarithm as an integral

In [[calculus-1/real-functions]] and [[calculus-1/derivatives]] we took on trust that the exponential function exists, obeys the laws of exponents, and has a base $e$ with $\frac{d}{dx}e^x = e^x$. The fundamental theorem lets us *construct* these functions, starting from the integral of $1/t$, which is the one power not covered by the power rule.

::: theorem The logarithm defined by an integral {#thm-log-integral}
For $x>0$ let $L(x) = \displaystyle\int_1^x\frac{dt}{t}$. Then:

1. $L$ is differentiable with $L'(x) = \frac1x$, so $L$ is strictly increasing, and $L(1) = 0$;
2. $L(xy) = L(x) + L(y)$ for all $x, y>0$;
3. $L$ maps $(0,\infty)$ onto $\R$;
4. the inverse function $E = L^{-1}\colon\R\to(0,\infty)$ satisfies $E'(x) = E(x)$, $E(0) = 1$ and $E(x+y) = E(x)E(y)$.
:::

::: proof
(1) The integrand $1/t$ is continuous on $(0,\infty)$, so [[#thm-ftc1]] gives $L'(x) = 1/x>0$; the monotonicity test shows $L$ is strictly increasing, and $L(1) = \int_1^1 = 0$.

(2) Fix $y>0$ and let $h(x) = L(xy) - L(x)$. By the chain rule $h'(x) = y\cdot\frac{1}{xy} - \frac1x = 0$, so $h$ is constant on $(0,\infty)$ ([[calculus-1/mean-value-theorem#cor-zero-derivative]]), equal to $h(1) = L(y)$. Thus $L(xy) = L(x) + L(y)$.

(3) Since $L$ is increasing, $L(2)>L(1) = 0$. By (2) and induction, $L(2^n) = nL(2)$ and $L(2^{-n}) = -nL(2)$, so $L$ takes arbitrarily large positive and negative values. Being continuous on the interval $(0,\infty)$, it takes every value in between by the intermediate value theorem; so its range is $\R$.

(4) By (1) and (3), $L$ is a continuous strictly increasing bijection from $(0,\infty)$ onto $\R$, with nowhere-zero derivative. By [[calculus-1/chain-rule#thm-inverse-deriv]] its inverse $E$ is differentiable with $E'(x) = \frac{1}{L'(E(x))} = E(x)$. Also $E(0) = 1$ because $L(1) = 0$. Finally, with $u = E(x)$ and $v = E(y)$, (2) gives $L(uv) = x + y$, that is, $E(x+y) = uv = E(x)E(y)$.
:::

Define $e = E(1)$, the number with $\int_1^e\frac{dt}{t} = 1$. The functional equation in (4) gives $E(n) = e^n$ for integers $n$ and $E(p/q) = e^{p/q}$ for rationals, so $E$ is the natural continuous extension of $x\mapsto e^x$ to all real $x$, and $L = \ln$. The defining property of $e$ in [[calculus-1/derivatives#def-e]] holds because $\lim_{h\to0}\frac{e^h - 1}{h} = E'(0) = E(0) = 1$. In this way the whole theory of exponentials and logarithms rests on the integral of the continuous function $1/t$.

::: history
The idea of finding an area as a limit of sums is ancient. Eudoxus of Cnidus, in the fourth century BC, devised the *method of exhaustion*, filling a region with ever finer polygons, and Archimedes used it brilliantly: around 250 BC he showed that a parabolic segment has $\frac43$ the area of its inscribed triangle. In the seventeenth century Bonaventura Cavalieri, Pierre de Fermat and others found the areas under the curves $y = x^n$, and Isaac Barrow, Newton's predecessor as Lucasian Professor at Cambridge, proved a geometric version of the fundamental theorem in his *Lectiones geometricae* (1670). Newton and Leibniz recognised the theorem as the key to a general calculus; Leibniz introduced the sign $\int$, an elongated S for *summa*, in a manuscript of 1675. The integral as a limit of sums was defined for continuous functions by Augustin-Louis Cauchy in 1823, and for general bounded functions by Bernhard Riemann in 1854, which is why Riemann sums carry his name.
:::

## Where this leads

The fundamental theorem reduces integration to finding antiderivatives, and [[calculus-1/integration-techniques]] develops the standard methods for doing so. The integral computes areas, volumes, lengths, work and probabilities ([[calculus-1/integral-applications]]), and [[calculus-1/improper-integrals]] extends it to unbounded intervals and integrands. When no antiderivative can be found, Riemann sums and their refinements become numerical methods ([[numerical-analysis/numerical-integration]]). In [[real-analysis/riemann-integral]] the theory of this chapter is completed, and in [[measure-theory/lebesgue-integral]] the Riemann integral is replaced by Lebesgue's more powerful one. In several variables, the fundamental theorem grows into the theorems of Green, Gauss and Stokes ([[multivariable/stokes-divergence]]).

::: summary
- The definite integral $\int_a^bf(x)\,dx$ is the limit of Riemann sums $\sum f(x_i^*)\Delta x_i$ as the mesh of the partition tends to $0$; it is the signed area under the graph.
- Continuous functions, bounded functions with finitely many discontinuities, and monotonic functions are integrable; unbounded functions are not.
- The integral is linear, additive over intervals and monotone ($f\le g$ implies $\int f\le\int g$); a continuous $f$ equals its average value $\frac1{b-a}\int_a^bf$ somewhere in $[a,b]$.
- FTC part 1: for continuous $f$, $\frac{d}{dx}\int_a^xf(t)\,dt = f(x)$, so every continuous function has an antiderivative.
- FTC part 2: if $f$ is integrable, $G$ is continuous on $[a,b]$ and $G' = f$ on $(a,b)$, then $\int_a^bf = G(b) - G(a)$. The integral of a rate of change is the net change.
- Antiderivatives on an interval are unique up to a constant; with the chain rule, variable limits are differentiated by $\frac{d}{dx}\int_a^{u(x)}f = f(u(x))\,u'(x)$.
- Defining $\ln x = \int_1^x\frac{dt}{t}$ gives a rigorous construction of the logarithm and the exponential function.
:::

## Exercises

::: exercise A polynomial {level=1 check="5"}
Evaluate $\displaystyle\int_1^2\bigl(3x^2 - 2x + 1\bigr)\,dx$.
::: solution
An antiderivative is $x^3 - x^2 + x$, so the integral is $(8 - 4 + 2) - (1 - 1 + 1) = 6 - 1 = 5$.
:::
:::

::: exercise Two standard antiderivatives {level=1 check="e - 1 + pi/4"}
Evaluate $\displaystyle\int_0^1\Bigl(e^x + \frac{1}{1+x^2}\Bigr)\,dx$.
::: solution
From the table, an antiderivative is $e^x + \arctan x$, so the integral is $(e + \arctan1) - (1 + \arctan 0) = e - 1 + \frac{\pi}{4}\approx2.504$.
:::
:::

::: exercise Differentiating an area function {level=1 check="3"}
Let $F(x) = \displaystyle\int_0^x\sqrt{1 + t^3}\,dt$. Find $F'(2)$.
::: solution
The integrand is continuous on $[0,\infty)$, so by [[#thm-ftc1]] $F'(x) = \sqrt{1+x^3}$ and $F'(2) = \sqrt{9} = 3$. No antiderivative of $\sqrt{1+t^3}$ is needed (and none can be written in elementary terms).
:::
:::

::: exercise An absolute value {level=2 check="5/2"}
Evaluate $\displaystyle\int_{-1}^2\abs{x}\,dx$.
::: solution
Split at $0$, where the formula for $\abs x$ changes: $\int_{-1}^0(-x)\,dx + \int_0^2x\,dx = \bigl[-\frac{x^2}{2}\bigr]_{-1}^0 + \bigl[\frac{x^2}{2}\bigr]_0^2 = \frac12 + 2 = \frac52$. Geometrically, two triangles of areas $\frac12$ and $2$.
:::
:::

::: exercise From the definition {level=2 check="1/4"}
Use right-endpoint Riemann sums with $n$ equal subintervals to evaluate $\displaystyle\int_0^1x^3\,dx$, using $\sum_{k=1}^nk^3 = \Bigl(\dfrac{n(n+1)}{2}\Bigr)^2$.
::: solution
With $x_k = k/n$ and $\Delta x = 1/n$, the Riemann sum is

$$
\sum_{k=1}^n\frac{k^3}{n^3}\cdot\frac1n = \frac{1}{n^4}\cdot\frac{n^2(n+1)^2}{4} = \frac14\Bigl(1 + \frac1n\Bigr)^2\longrightarrow\frac14.
$$

Since $x^3$ is continuous, it is integrable, and this limit is $\int_0^1x^3\,dx = \frac14$, in agreement with $\bigl[\frac{x^4}{4}\bigr]_0^1$.
:::
:::

::: exercise A limit of sums {level=2 check="2/3"}
Evaluate $\displaystyle\lim_{n\to\infty}\frac1n\sum_{k=1}^n\sqrt{\frac kn}$.
::: hint
Recognise a Riemann sum for a function on $[0,1]$.
:::
::: solution
This is the right-endpoint Riemann sum for $f(x) = \sqrt{x}$ on $[0,1]$ with $n$ equal subintervals. Since $\sqrt{x}$ is continuous, the sums converge to $\int_0^1\sqrt{x}\,dx = \bigl[\frac23x^{3/2}\bigr]_0^1 = \frac23$.
:::
:::

::: exercise Estimating an integral {#exr-bounds level=2}
Show that $\dfrac23\le\displaystyle\int_0^1e^{-x^2}\,dx\le1$.
::: hint
Use $e^u \ge 1 + u$ ([[calculus-1/mean-value-theorem#ex-inequalities]]).
:::
::: solution
For $x\in[0,1]$, $-x^2\le0$ gives $e^{-x^2}\le1$, and $e^u\ge1+u$ with $u = -x^2$ gives $e^{-x^2}\ge1 - x^2$. By the comparison property,

$$
\int_0^1(1 - x^2)\,dx\le\int_0^1e^{-x^2}\,dx\le\int_0^11\,dx, \qquad\text{that is,}\qquad \frac23\le\int_0^1e^{-x^2}\,dx\le1.
$$

(The true value is $0.7468\ldots$; it cannot be found with an elementary antiderivative.)
:::
:::

::: exercise A non-negative function with zero integral {level=3}
Let $f$ be continuous on $[a,b]$ with $f(x)\ge0$ for all $x$ and $\int_a^bf(x)\,dx = 0$. Prove that $f(x) = 0$ for all $x\in[a,b]$.
::: solution
Suppose $f(c) > 0$ for some $c\in[a,b]$. By continuity there is an interval $[p, q]\subseteq[a,b]$ with $p<q$, containing $c$, on which $f(x) > f(c)/2$. (Take $\eps = f(c)/2$ in the definition of continuity and intersect the resulting interval around $c$ with $[a,b]$.) By additivity, and the bounds property on each piece,

$$
\int_a^bf = \int_a^pf + \int_p^qf + \int_q^bf \ge 0 + \frac{f(c)}{2}(q-p) + 0 > 0,
$$

contradicting $\int_a^bf = 0$. Hence $f$ vanishes everywhere. (Continuity is essential: a function that is $0$ except at one point where it equals $1$ has integral $0$.)
:::
:::

::: exercise An integral equation {level=3 check="9"}
Find a continuous function $f$ and a constant $a>0$ such that

$$
6 + \int_a^x\frac{f(t)}{t^2}\,dt = 2\sqrt{x} \qquad\text{for all } x>0.
$$

Give the value of $a$.
::: solution
Differentiate both sides with respect to $x$, using [[#thm-ftc1]] (the integrand is continuous on $(0,\infty)$): $\dfrac{f(x)}{x^2} = \dfrac{1}{\sqrt{x}}$, so $f(x) = x^{3/2}$. Setting $x = a$ makes the integral vanish: $6 = 2\sqrt{a}$, so $a = 9$. Conversely, with these choices $\int_9^x t^{-1/2}\,dt = 2\sqrt x - 6$, so the equation holds for all $x>0$.
:::
:::

::: exercise Integrals of odd and even functions {#exr-odd-even level=3}
Let $f$ be continuous on $[-a, a]$. Prove that $\int_{-a}^af(x)\,dx = 0$ if $f$ is odd, and $\int_{-a}^af(x)\,dx = 2\int_0^af(x)\,dx$ if $f$ is even.
::: hint
Differentiate $\Phi(s) = \int_{-s}^sf(x)\,dx$ with respect to $s$.
:::
::: solution
Let $F(u) = \int_0^uf(x)\,dx$, so $F' = f$ by [[#thm-ftc1]], and $\Phi(s) = \int_{-s}^sf = F(s) - F(-s)$ for $0\le s\le a$. By the chain rule,

$$
\Phi'(s) = f(s) + f(-s).
$$

If $f$ is odd, $\Phi'(s) = 0$, so $\Phi$ is constant on $[0,a]$ and $\Phi(a) = \Phi(0) = 0$. If $f$ is even, $\Phi'(s) = 2f(s)$, which is also the derivative of $2F(s)$; since $\Phi(0) = 0 = 2F(0)$, [[calculus-1/mean-value-theorem#cor-same-derivative]] gives $\Phi(s) = 2F(s)$, and in particular $\int_{-a}^af = 2\int_0^af$. For example, $\int_{-1}^1x^3\cos x\,dx = 0$ without any computation.
:::
:::
