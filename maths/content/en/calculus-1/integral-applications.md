The definite integral was introduced as a limit of sums, and that is the key to its applications. Whenever a quantity can be cut into thin slices, each slice approximately "density × thickness", the quantity is an integral. The recipe is always the same: **slice, approximate, add, take the limit**. Cut the interval into pieces of width $\Delta x$; approximate the contribution of the piece at $x$ by $f(x)\,\Delta x$; add the contributions to get a Riemann sum; and let $\Delta x\to0$ to get $\int_a^bf(x)\,dx$.

In this chapter we apply the recipe to geometry — areas between curves, volumes of solids, lengths of curves — and to physics and probability: average values, work, and probabilities described by densities. In each case the hard part is not the integration (the techniques of [[calculus-1/integration-techniques]] take care of that) but setting up the right integral. We begin with a theorem that explains why the recipe gives exact answers rather than approximations.

## The slicing principle

::: theorem The slicing principle {#thm-slicing}
Let $f$ be continuous on $[a,b]$, and suppose that a quantity $Q$ assigns a number $Q[c,d]$ to each subinterval $[c,d]$ of $[a,b]$, such that

1. $Q$ is **additive**: $Q[c,e] = Q[c,d] + Q[d,e]$ whenever $c<d<e$; and
2. on each subinterval, $m\,(d-c)\le Q[c,d]\le M\,(d - c)$, where $m$ and $M$ are the minimum and maximum of $f$ on $[c,d]$.

Then $Q[a,b] = \displaystyle\int_a^bf(x)\,dx$.
:::

::: proof
Let $P$ be a partition $a = x_0<x_1<\dots<x_n = b$, and let $m_i$, $M_i$ be the minimum and maximum of $f$ on $[x_{i-1},x_i]$ (they exist by the extreme value theorem, attained at points $s_i$ and $t_i$ say). By additivity and hypothesis 2,

$$
\sum_{i=1}^nf(s_i)\,\Delta x_i \le \sum_{i=1}^nQ[x_{i-1},x_i] = Q[a,b] \le \sum_{i=1}^nf(t_i)\,\Delta x_i .
$$

The outer expressions are Riemann sums of $f$. Since $f$ is continuous, hence integrable ([[calculus-1/integrals#thm-integrable]]), both tend to $\int_a^bf$ as $\norm P\to0$. The number $Q[a,b]$ does not depend on $P$ and is squeezed between them, so it equals $\int_a^bf$.
:::

The theorem tells us what to check when we set up an integral: that the quantity is additive, and that the contribution of a thin slice lies between the smallest and largest values of "density × thickness" on that slice. Mass with a continuous density, work done by a continuous force and the volume of a solid of revolution all have these properties, as we shall see.

## Areas between curves

If $f\ge g$ on $[a,b]$, the region between the graphs is made of thin vertical strips of height $f(x) - g(x)$ and width $\Delta x$. When $f\ge g\ge0$ its area is the area under $f$ minus the area under $g$; in general we take the following as the definition.

::: definition Area between curves {#def-area-between}
Let $f$ and $g$ be continuous on $[a,b]$. The **area** of the region between their graphs for $a\le x\le b$ is

$$
\int_a^b\abs{f(x) - g(x)}\,dx .
$$

When $f\ge g$ on $[a,b]$ this is simply $\int_a^b\bigl(f(x) - g(x)\bigr)\,dx$, "top minus bottom".
:::

When the curves cross, split the interval at the crossing points and integrate "top minus bottom" on each piece. The boundaries of a region are often given as intersection points that must be found first.

::: example A parabola and a line {#ex-area-between}
Find the area of the region enclosed by $y = x^2$ and $y = x + 2$.
::: solution
The curves meet where $x^2 = x + 2$, that is, $(x-2)(x+1) = 0$: at $x = -1$ and $x = 2$. On $[-1, 2]$ the line lies above the parabola (check $x = 0$: $2 > 0$). So the area is

$$
\int_{-1}^2\bigl(x + 2 - x^2\bigr)\,dx = \Bigl[\frac{x^2}{2} + 2x - \frac{x^3}{3}\Bigr]_{-1}^2 = \Bigl(2 + 4 - \frac83\Bigr) - \Bigl(\frac12 - 2 + \frac13\Bigr) = \frac{10}{3} + \frac76 = \frac92 .
$$

(Archimedes found this kind of area without calculus: the region is a parabolic segment, and its area is $\frac43$ of the inscribed triangle with vertices at $x = -1, \frac12, 2$ on the parabola.)
:::
:::

::: widget plot
f: x + 2; x^2
x: -2, 3
y: -1, 6
shade: -1, 2
between: true
labels: y = x + 2; y = x^2
caption: The region between the line and the parabola, from $x = -1$ to $x = 2$. Each thin vertical strip has height (top minus bottom) $x + 2 - x^2$; adding the strips gives the area $\frac92$. Hover at any $x$ to read off the heights of the line and the parabola; their difference is the height of the strip there.
:::

Sometimes it is better to slice horizontally, treating $x$ as a function of $y$: if the region lies between $x = u(y)$ on the left and $x = v(y)$ on the right for $c\le y\le d$, its area is $\int_c^d\bigl(v(y) - u(y)\bigr)\,dy$, "right minus left".

::: example Slicing horizontally {#ex-area-dy}
Find the area of the region enclosed by the line $y = x - 1$ and the parabola $y^2 = 2x + 6$.
::: solution
Solving for $x$, the parabola is $x = \frac{y^2}{2} - 3$ and the line is $x = y + 1$. They meet where $y + 1 = \frac{y^2}{2} - 3$, that is, $y^2 - 2y - 8 = 0$, at $y = -2$ and $y = 4$. Between these values the line is to the right of the parabola, so

$$
\int_{-2}^4\Bigl(y + 1 - \frac{y^2}{2} + 3\Bigr)dy = \Bigl[-\frac{y^3}{6} + \frac{y^2}{2} + 4y\Bigr]_{-2}^4 = \frac{40}{3} + \frac{14}{3} = 18.
$$

With vertical slices the lower boundary would change formula at $x = -1$ (it is the lower half of the parabola to the left of $x = -1$ and the line to the right), and two integrals would be needed. They give the same answer, $18$, but with more work.
:::
:::

::: widget region
lower: if(x < -1, -sqrt(2x + 6), x - 1)
upper: sqrt(2x + 6)
a: -3
b: 5
left: y^2/2 - 3
right: y + 1
c: -2
d: 4
caption: The region of [[#ex-area-dy]]. Move the slice and switch between the two descriptions. Vertical slices (type I) run from the lower boundary to the upper one, but the lower boundary changes formula at $x = -1$; horizontal slices (type II) always run from the parabola on the left to the line on the right, so a single integral suffices.
:::

::: quiz
What is the area of the region between $y = x$ and $y = x^3$ for $0\le x\le1$?
- [ ] $\tfrac12$
- [x] $\tfrac14$
- [ ] $\tfrac34$
- [ ] $0$
::: solution
On $[0,1]$ we have $x^3\le x$, so the area is $\int_0^1(x - x^3)\,dx = \frac12 - \frac14 = \frac14$. The answer $\frac34$ comes from adding the two integrals instead of subtracting.
:::
:::

## Volumes

Slicing a loaf of bread suggests how to find the volume of a solid: cut it into thin slabs perpendicular to an axis, approximate each slab by a cylinder (cross-sectional area × thickness), and add.

::: definition Volume by slicing {#def-volume}
Let $S$ be a solid lying between the planes $x = a$ and $x = b$, and suppose its cross-section by the plane perpendicular to the $x$-axis at $x$ has area $A(x)$, where $A$ is continuous. The **volume** of $S$ is

$$
V = \int_a^bA(x)\,dx .
$$ {#eq-volume}
:::

For a solid of revolution, whose cross-sections are discs, the slab between $x = c$ and $x = d$ contains the cylinder whose radius is the smallest radius on $[c,d]$ and is contained in the cylinder with the largest; so the hypotheses of the slicing principle hold, and [[#eq-volume]] gives the volume exactly. In general it is the natural definition. It implies **Cavalieri's principle**: two solids whose cross-sections at each height have equal areas have equal volumes, however differently shaped the sections are.

::: example A pyramid {#ex-pyramid}
Find the volume of a pyramid with a square base of side $L$ and height $h$.
::: solution
Measure $y$ upwards from the base. The cross-section at height $y$ is a square, similar to the base and scaled by the factor $\frac{h-y}{h}$, so its side is $L\frac{h-y}{h}$ and

$$
V = \int_0^h L^2\Bigl(\frac{h-y}{h}\Bigr)^2dy = \frac{L^2}{h^2}\Bigl[-\frac{(h-y)^3}{3}\Bigr]_0^h = \frac{L^2h}{3}.
$$

The same argument works for any base shape: a cone or pyramid has volume $\frac13\times$ base area $\times$ height.
:::
:::

**Solids of revolution.** Rotating the region under $y = f(x)\ge0$, $a\le x\le b$, about the $x$-axis produces a solid whose cross-sections are discs of radius $f(x)$. If the region lies between $y = g(x)$ and $y = f(x)$ with $0\le g\le f$, the cross-sections are washers (annuli) with outer radius $f(x)$ and inner radius $g(x)$. So

$$
V_{\text{disc}} = \int_a^b\pi f(x)^2\,dx, \qquad V_{\text{washer}} = \int_a^b\pi\bigl(f(x)^2 - g(x)^2\bigr)\,dx .
$$

::: example The volume of a sphere {#ex-sphere}
Show that a ball of radius $r$ has volume $\frac43\pi r^3$, and find the volume of the solid obtained by rotating the region between $y = x$ and $y = x^2$, $0\le x\le1$, about the $x$-axis.
::: solution
The ball is obtained by rotating the half-disc under $y = \sqrt{r^2 - x^2}$, $-r\le x\le r$, about the $x$-axis. By the disc method,

$$
V = \int_{-r}^r\pi\bigl(r^2 - x^2\bigr)\,dx = \pi\Bigl[r^2x - \frac{x^3}{3}\Bigr]_{-r}^r = \pi\Bigl(2r^3 - \frac{2r^3}{3}\Bigr) = \frac43\pi r^3 .
$$

For the second solid, on $[0,1]$ the outer radius is $x$ and the inner radius is $x^2$, so

$$
V = \int_0^1\pi\bigl(x^2 - x^4\bigr)\,dx = \pi\Bigl(\frac13 - \frac15\Bigr) = \frac{2\pi}{15}.
$$
:::
:::

::: widget surface
fx: u
fy: sqrt(u)*cos(v)
fz: sqrt(u)*sin(v)
u: 0, 4
v: 0, 2pi
color: height
caption: The surface obtained by rotating $y = \sqrt{x}$, $0\le x\le4$, about the $x$-axis. Rotate the view: every cross-section perpendicular to the $x$-axis is a circle of radius $\sqrt x$, so the solid it bounds has cross-sectional area $\pi x$ and volume $\int_0^4\pi x\,dx = 8\pi$ — exactly half the volume of the enclosing cylinder of radius $2$ and length $4$.
:::

**Cylindrical shells.** For rotation about the $y$-axis, slicing perpendicular to the axis requires $x$ as a function of $y$, which may be awkward to find. Instead we can cut the region into thin vertical strips; rotating a strip about the $y$-axis produces a thin cylindrical shell.

::: theorem Shell method {#thm-shells}
Let $f$ be continuous and non-negative on $[a,b]$, where $0\le a<b$. The solid obtained by rotating the region under $y = f(x)$, $a\le x\le b$, about the $y$-axis has volume

$$
V = \int_a^b2\pi x\,f(x)\,dx .
$$
:::

::: proof {collapsed}
*Sketch.* Take a partition of $[a,b]$ and let $\bar x_i = \frac{x_{i-1}+x_i}{2}$ be the midpoint of the $i$th subinterval. Rotating the rectangle of height $f(\bar x_i)$ over $[x_{i-1}, x_i]$ gives a shell whose volume is the difference of two cylinders:

$$
\pi x_i^2f(\bar x_i) - \pi x_{i-1}^2f(\bar x_i) = \pi(x_i + x_{i-1})(x_i - x_{i-1})f(\bar x_i) = 2\pi\bar x_i\,f(\bar x_i)\,\Delta x_i .
$$

The sum of these shell volumes is exactly a Riemann sum for $\int_a^b2\pi xf(x)\,dx$, and the shells fill out the solid as the mesh tends to $0$. That the result agrees with the volume computed by discs is shown, in an important special case, in [[#exr-shells-discs]].
:::

The formula has a memorable reading: a shell is a thin rectangle rolled up, with length $2\pi x$ (the circumference), height $f(x)$ and thickness $dx$.

::: example Shells avoid solving a cubic {#ex-shells}
Find the volume of the solid obtained by rotating the region bounded by $y = 2x^2 - x^3$ and $y = 0$ about the $y$-axis.
::: solution
The curve meets the $x$-axis at $x = 0$ and $x = 2$, and is non-negative in between. Slicing horizontally would require solving the cubic $y = 2x^2 - x^3$ for $x$. With shells,

$$
V = \int_0^22\pi x\,(2x^2 - x^3)\,dx = 2\pi\Bigl[\frac{x^4}{2} - \frac{x^5}{5}\Bigr]_0^2 = 2\pi\Bigl(8 - \frac{32}{5}\Bigr) = \frac{16\pi}{5}.
$$
:::
:::

::: quiz
The region under $y = \sqrt{x}$, $0\le x\le4$, is rotated about the $x$-axis. Which integral gives the volume?
- [x] $\displaystyle\int_0^4\pi x\,dx$
- [ ] $\displaystyle\int_0^4\pi\sqrt{x}\,dx$
- [ ] $\displaystyle\int_0^42\pi\sqrt{x}\,dx$
- [ ] $\displaystyle\int_0^42\pi x\sqrt{x}\,dx$
::: solution
The cross-sections are discs of radius $\sqrt{x}$, with area $\pi(\sqrt x)^2 = \pi x$, so $V = \int_0^4\pi x\,dx = 8\pi$. Forgetting to square the radius gives the second option; the last option is the shell formula, which would compute the volume of rotation about the $y$-axis instead.
:::
:::

## Arc length

What is the length of a curved graph? Approximate the curve by a polygon whose vertices lie on it, and refine.

::: definition Arc length {#def-arc-length}
Let $f$ be defined on $[a,b]$. For a partition $P$ of $[a,b]$, let $\ell(P)$ be the length of the polygonal path joining the points $(x_0, f(x_0)), (x_1, f(x_1)), \dots, (x_n, f(x_n))$. If $\ell(P)$ tends to a limit $L$ as $\norm P\to0$, then $L$ is the **length** of the graph of $f$ over $[a,b]$.
:::

::: theorem Arc length formula {#thm-arc-length}
If $f$ has a continuous derivative on $[a,b]$, then the length of its graph over $[a,b]$ exists and equals

$$
L = \int_a^b\sqrt{1 + f'(x)^2}\,dx .
$$ {#eq-arc-length}
:::

::: proof
The $i$th segment of the polygon has horizontal extent $\Delta x_i$ and vertical extent $f(x_i) - f(x_{i-1})$. By the mean value theorem, $f(x_i) - f(x_{i-1}) = f'(c_i)\,\Delta x_i$ for some $c_i\in(x_{i-1},x_i)$. So by Pythagoras the segment has length

$$
\sqrt{\Delta x_i^2 + f'(c_i)^2\Delta x_i^2} = \sqrt{1 + f'(c_i)^2}\;\Delta x_i,
$$

and $\ell(P) = \sum_i\sqrt{1 + f'(c_i)^2}\,\Delta x_i$ is a Riemann sum for the continuous function $\sqrt{1 + f'(x)^2}$. As $\norm P\to0$ it tends to the integral.
:::

In Leibniz's notation the formula says that a tiny piece of curve has length $ds = \sqrt{dx^2 + dy^2}$, the hypotenuse of a tiny right triangle. Unfortunately the square root makes most arc length integrals impossible to evaluate in closed form — even the length of an ellipse leads to an "elliptic integral" that is not elementary — so the examples that work out exactly are chosen with care.

::: example Neile's parabola {#ex-arc-length}
Find the length of the curve $y = x^{3/2}$ for $0\le x\le4$.
::: solution
Here $f'(x) = \frac32x^{1/2}$, so $1 + f'(x)^2 = 1 + \frac94x$. With $u = 1 + \frac94x$, $du = \frac94dx$,

$$
L = \int_0^4\sqrt{1 + \tfrac94x}\,dx = \frac49\int_1^{10}u^{1/2}\,du = \frac49\cdot\frac23\bigl(10^{3/2} - 1\bigr) = \frac{8}{27}\bigl(10\sqrt{10} - 1\bigr)\approx9.073 .
$$

As a sanity check, the straight line from $(0,0)$ to $(4,8)$ has length $\sqrt{80}\approx8.944$, a little shorter, as it must be.
:::
:::

::: example The catenary {#ex-catenary}
Find the length of the hanging-chain curve $y = \cosh x$ for $0\le x\le1$.
::: solution
Since $\frac{d}{dx}\cosh x = \sinh x$ and $1 + \sinh^2x = \cosh^2x$ ([[calculus-1/real-functions#eq-hyperbolic]]), the integrand is $\sqrt{\cosh^2x} = \cosh x$, and

$$
L = \int_0^1\cosh x\,dx = \sinh1 = \frac{e - e^{-1}}{2}\approx1.1752 .
$$
:::
:::

::: quiz
Which integral gives the length of the curve $y = e^x$ for $0\le x\le1$?
- [x] $\displaystyle\int_0^1\sqrt{1 + e^{2x}}\,dx$
- [ ] $\displaystyle\int_0^1\sqrt{1 + e^{x}}\,dx$
- [ ] $\displaystyle\int_0^1\bigl(1 + e^{x}\bigr)\,dx$
- [ ] $\displaystyle\int_0^1\sqrt{1 + e^{x^2}}\,dx$
::: solution
The integrand is $\sqrt{1 + f'(x)^2}$ with $f'(x) = e^x$, and $(e^x)^2 = e^{2x}$, not $e^{x^2}$. The integral cannot be expressed through $1 + e^x$ either: the square root does not distribute over a sum. (Its value is about $2.003$; the substitution $u = \sqrt{1 + e^{2x}}$ evaluates it exactly.)
:::
:::

## Average value

The average of finitely many numbers is their sum divided by their number. For a continuous function the sum becomes an integral and the count becomes the length of the interval.

::: definition Average value {#def-average}
The **average value** of an integrable function $f$ on $[a,b]$ is

$$
f_{\text{avg}} = \frac{1}{b-a}\int_a^bf(x)\,dx .
$$
:::

It is the limit of the averages of $f$ at $n$ equally spaced sample points, since $\frac1n\sum f(x_i) = \frac{1}{b-a}\sum f(x_i)\frac{b-a}{n}$ is a Riemann sum divided by $b - a$. By the mean value theorem for integrals ([[calculus-1/integrals#thm-mvt-integral]]), a continuous function actually takes its average value somewhere on the interval. For example, the average value of $\sin x$ on $[0,\pi]$ is $\frac1\pi\int_0^\pi\sin x\,dx = \frac{2}{\pi}\approx0.637$.

::: application Root mean square voltage
Mains electricity has voltage $V(t) = V_0\sin(2\pi\nu t)$, whose average over a period is $0$. The power delivered to a resistor is proportional to $V^2$, so what matters is the average of $V^2$, which is $\frac12V_0^2$ by [[calculus-1/integration-techniques#ex-trig-integrals]]. The **root mean square** voltage $V_0/\sqrt2$ is the constant voltage that would deliver the same average power; the quoted $230$ V of the European mains is an RMS value, corresponding to a peak voltage of about $325$ V.
:::

## Work

In physics, a constant force $F$ moving an object a distance $d$ in its own direction does **work** $W = Fd$ (in joules, when $F$ is in newtons and $d$ in metres). If the force varies with position, slice the path: on a short piece of length $\Delta x$ the force is nearly constant, and the work is about $F(x)\,\Delta x$.

::: definition Work done by a variable force {#def-work}
If a continuous force $F(x)$ acts along the $x$-axis on an object moving from $x = a$ to $x = b$, the **work** done is

$$
W = \int_a^bF(x)\,dx .
$$
:::

This is the slicing principle again: work is additive over the path, and on each piece it lies between the minimum and maximum force times the length of the piece.

::: example Stretching a spring {#ex-spring}
A spring has natural length $0.2$ m, and a force of $40$ N is needed to hold it stretched to a length of $0.3$ m. How much work is done in stretching it from $0.3$ m to $0.35$ m?
::: solution
By **Hooke's law**, the force needed to hold a spring stretched $x$ metres beyond its natural length is $F(x) = kx$. Here $40 = k\cdot0.1$, so $k = 400$ N/m. Stretching from $0.3$ m to $0.35$ m means $x$ goes from $0.1$ to $0.15$:

$$
W = \int_{0.1}^{0.15}400x\,dx = 200\bigl(0.15^2 - 0.1^2\bigr) = 200\times0.0125 = 2.5 \text{ J}.
$$

Note that the same extra $5$ cm of stretch would cost only $0.5$ J starting from the natural length: the spring resists more the further it is stretched.
:::
:::

::: example Pumping out a tank {#ex-pumping}
A cylindrical tank of radius $2$ m and height $5$ m is full of water (density $1000$ kg/m³). How much work is needed to pump all the water out over the top? Use $g = 9.8$ m/s².
::: solution
Here the *distance* varies, not the force: water near the bottom must be lifted further. Slice the water horizontally. The layer at height $y$ (measured from the bottom) with thickness $\Delta y$ has volume $\pi\cdot2^2\,\Delta y$, mass $4000\pi\,\Delta y$ kg and weight $9.8\times4000\pi\,\Delta y = 39\,200\pi\,\Delta y$ N, and it must be lifted $5 - y$ metres. So

$$
W = \int_0^539\,200\pi\,(5 - y)\,dy = 39\,200\pi\Bigl[5y - \frac{y^2}{2}\Bigr]_0^5 = 39\,200\pi\times12.5 = 490\,000\pi\approx1.54\times10^6 \text{ J}.
$$

This is the same as lifting the whole mass of water ($20\,000\pi$ kg) from its centre of mass, $2.5$ m above the bottom, to the top: a lift of $5 - 2.5 = 2.5$ m.
:::
:::

## Probability densities

Many random quantities — a waiting time, a measurement error, the lifetime of a component — can take any value in an interval, and the probability of any single exact value is $0$. Their distribution is described by a density, and probabilities are areas under it.

::: definition Probability density function {#def-pdf}
A **probability density function** on an interval $I$ is an integrable function $f\ge0$ with $\int_If(x)\,dx = 1$. A random quantity $X$ has density $f$ if, for all $a\le b$ in $I$,

$$
\Prob(a\le X\le b) = \int_a^bf(x)\,dx .
$$

Its **mean** (expected value) is $\mu = \int_Ixf(x)\,dx$, the balance point of the region under $f$.
:::

When $I$ is unbounded, as for waiting times, the integrals over $I$ are improper integrals, made precise in [[calculus-1/improper-integrals]].

::: example A density on an interval {#ex-density}
Find the constant $c$ for which $f(x) = cx(1-x)$ is a probability density on $[0,1]$. For $X$ with this density, find $\Prob\bigl(X\le\frac13\bigr)$ and the mean.
::: solution
We need $1 = \int_0^1cx(1-x)\,dx = c\bigl(\frac12 - \frac13\bigr) = \frac c6$, so $c = 6$. Then

$$
\Prob\bigl(X\le\tfrac13\bigr) = \int_0^{1/3}6x(1-x)\,dx = \bigl[3x^2 - 2x^3\bigr]_0^{1/3} = \frac13 - \frac{2}{27} = \frac{7}{27}\approx0.259,
$$

and $\mu = \int_0^16x^2(1-x)\,dx = 6\bigl(\frac13 - \frac14\bigr) = \frac12$, as the symmetry of $f$ about $\frac12$ predicts.
:::
:::

::: example Waiting times {#ex-exponential-wait}
Waiting times for a bus are often modelled by the **exponential density** $f(x) = \lambda e^{-\lambda x}$ for $x\ge0$, where $\lambda>0$. With $\lambda = 0.1$ per minute, find the probability of waiting at most $5$ minutes, and the median waiting time.
::: solution
For $0\le b$, $\Prob(0\le X\le b) = \int_0^b\lambda e^{-\lambda x}\,dx = \bigl[-e^{-\lambda x}\bigr]_0^b = 1 - e^{-\lambda b}$. With $\lambda = 0.1$ and $b = 5$ this is $1 - e^{-0.5}\approx0.393$. The median $m$ satisfies $1 - e^{-\lambda m} = \frac12$, so $m = \frac{\ln2}{\lambda}\approx6.93$ minutes. (Letting $b\to\infty$ shows that the total probability is $1$, and in [[calculus-1/improper-integrals]] we find that the mean is $1/\lambda = 10$ minutes — longer than the median, because a few very long waits pull the average up.)
:::
:::

::: widget distribution
dist: exponential
params: lambda=0.1
a: 0
b: 5
caption: The exponential density with rate $\lambda = 0.1$; the shaded area is $\Prob(0\le X\le5) = 1 - e^{-0.5}\approx0.393$, as computed in [[#ex-exponential-wait]]. Move $\lambda$: the density always starts at height $\lambda$ and the total area stays $1$, so a larger rate squeezes the probability towards $0$ (shorter waits).
:::

::: history
Archimedes, in *On the Sphere and Cylinder* (around 225 BC), proved that a sphere has two-thirds of the volume and surface area of its circumscribing cylinder; according to Plutarch he asked for a sphere inscribed in a cylinder to be carved on his tomb, which Cicero found and restored in 75 BC. Bonaventura Cavalieri's principle of indivisibles (1635) compared solids slice by slice, as in [[#def-volume]]. Arc length was considered so hard that René Descartes doubted in 1637 that the exact length of any curve could be found by geometry. Within twenty years he was proved wrong: in 1657 William Neile found the length of the curve $y^2 = x^3$ (the curve of [[#ex-arc-length]]), the first algebraic curve to be rectified, and in 1659 Hendrik van Heuraet published a general method equivalent to [[#eq-arc-length]].
:::

## Where this leads

Every application here generalises to higher dimensions. Areas and volumes of general regions are double and triple integrals ([[multivariable/multiple-integrals]]), lengths of curves in space and work along curved paths are line integrals ([[multivariable/line-integrals]]), and surface areas are surface integrals ([[multivariable/surface-integrals]]). Probability densities are the foundation of continuous probability ([[probability/continuous-random-variables]]), and arc length leads to the study of curvature in [[differential-geometry/curves]].

::: summary
- Slice, approximate, add, take the limit: a quantity that is additive and approximately $f(x)\,\Delta x$ on thin slices equals $\int_a^bf(x)\,dx$ (the slicing principle).
- Area between curves is $\int_a^b\abs{f - g}\,dx$ ("top minus bottom"); sometimes horizontal slices, $\int_c^d(\text{right} - \text{left})\,dy$, are simpler.
- Volume is the integral of the cross-sectional area: discs $\int\pi f^2\,dx$, washers $\int\pi(f^2 - g^2)\,dx$, and shells $\int2\pi xf(x)\,dx$ for rotation about the $y$-axis.
- The length of the graph of a function with continuous derivative is $\int_a^b\sqrt{1 + f'(x)^2}\,dx$.
- The average value of $f$ on $[a,b]$ is $\frac{1}{b-a}\int_a^bf$, and a continuous function attains it.
- Work done by a variable force is $\int_a^bF(x)\,dx$; when lifting a fluid, slice the fluid and integrate weight × distance.
- A probability density $f\ge0$ has total integral $1$; probabilities are areas $\int_a^bf$ and the mean is $\int xf(x)\,dx$.
:::

## Exercises

::: exercise Between a root and a square {level=1 check="1/3"}
Find the area of the region between $y = \sqrt{x}$ and $y = x^2$.
::: solution
The curves meet at $x = 0$ and $x = 1$, and $\sqrt{x}\ge x^2$ on $[0,1]$. The area is $\int_0^1(\sqrt x - x^2)\,dx = \frac23 - \frac13 = \frac13$.
:::
:::

::: exercise A cone {level=1 check="12*pi"}
The region under $y = \frac34x$ for $0\le x\le4$ is rotated about the $x$-axis. Find the volume of the resulting cone.
::: solution
By the disc method, $V = \int_0^4\pi\bigl(\frac34x\bigr)^2\,dx = \frac{9\pi}{16}\cdot\frac{64}{3} = 12\pi$. This agrees with $\frac13\pi r^2h$ for a cone of radius $3$ and height $4$.
:::
:::

::: exercise An average value {level=1 check="3"}
Find the average value of $f(x) = x^2$ on $[0, 3]$, and a point where $f$ takes this value. Give the average value as your answer.
::: solution
$f_{\text{avg}} = \frac13\int_0^3x^2\,dx = \frac13\cdot9 = 3$. It is attained at $x = \sqrt3\in[0,3]$, as the mean value theorem for integrals promises.
:::
:::

::: exercise An exact arc length {level=2 check="17/12"}
Find the length of the curve $y = \dfrac{x^3}{6} + \dfrac{1}{2x}$ for $1\le x\le2$.
::: hint
Show that $1 + y'^2$ is a perfect square.
:::
::: solution
$y' = \frac{x^2}{2} - \frac{1}{2x^2}$, so $1 + y'^2 = 1 + \frac{x^4}{4} - \frac12 + \frac{1}{4x^4} = \Bigl(\frac{x^2}{2} + \frac{1}{2x^2}\Bigr)^2$. Hence

$$
L = \int_1^2\Bigl(\frac{x^2}{2} + \frac{1}{2x^2}\Bigr)dx = \Bigl[\frac{x^3}{6} - \frac{1}{2x}\Bigr]_1^2 = \Bigl(\frac43 - \frac14\Bigr) - \Bigl(\frac16 - \frac12\Bigr) = \frac{17}{12}.
$$
:::
:::

::: exercise Shells and a sine arch {level=2 check="2*pi^2"}
The region under $y = \sin x$, $0\le x\le\pi$, is rotated about the $y$-axis. Find the volume.
::: solution
By [[#thm-shells]], $V = \int_0^\pi2\pi x\sin x\,dx$. Integrating by parts ($u = x$, $dv = \sin x\,dx$): $\int x\sin x\,dx = -x\cos x + \sin x$, so

$$
V = 2\pi\bigl[-x\cos x + \sin x\bigr]_0^\pi = 2\pi\cdot\pi = 2\pi^2 .
$$
:::
:::

::: exercise Winding up a chain {level=2 check="980"}
A $10$ m chain with mass $2$ kg per metre hangs from the top of a tall building. How much work is needed to wind the whole chain up to the top? Use $g = 9.8$ m/s².
::: solution
The piece of chain at distance $y$ below the top, of length $\Delta y$, has weight $2\times9.8\,\Delta y = 19.6\,\Delta y$ N and must be lifted $y$ metres. So $W = \int_0^{10}19.6y\,dy = 19.6\times50 = 980$ J.
:::
:::

::: exercise A density proportional to x² {level=2 check="19/27"}
Find $k$ such that $f(x) = kx^2$ is a probability density on $[0,3]$, and compute $\Prob(X\ge2)$.
::: solution
$\int_0^3kx^2\,dx = 9k = 1$ gives $k = \frac19$. Then $\Prob(X\ge2) = \int_2^3\frac{x^2}{9}\,dx = \frac{27 - 8}{27} = \frac{19}{27}\approx0.704$.
:::
:::

::: exercise The volume of a torus {level=3}
A torus (doughnut) is obtained by rotating the disc $(x - R)^2 + y^2\le r^2$ about the $y$-axis, where $0<r<R$. Show that its volume is $2\pi^2Rr^2$.
::: solution
The disc consists of the vertical segments over $R - r\le x\le R+r$ of height $2\sqrt{r^2 - (x-R)^2}$. By the shell method (applied to the region between $y = -\sqrt{\cdots}$ and $y = \sqrt{\cdots}$, which has height $2\sqrt{\cdots}$),

$$
V = \int_{R-r}^{R+r}2\pi x\cdot2\sqrt{r^2 - (x-R)^2}\,dx = 4\pi\int_{-r}^r(R + u)\sqrt{r^2 - u^2}\,du,
$$

substituting $u = x - R$. The term $u\sqrt{r^2-u^2}$ is odd, so its integral over $[-r,r]$ vanishes ([[calculus-1/integrals#exr-odd-even]]). The remaining integral is $R$ times the area of a half-disc of radius $r$, which is $\frac{\pi r^2}{2}$ ([[calculus-1/integration-techniques#ex-circle-area]]). Hence $V = 4\pi R\cdot\frac{\pi r^2}{2} = 2\pi^2Rr^2$ — the area $\pi r^2$ of the disc times the distance $2\pi R$ travelled by its centre (an instance of Pappus's theorem).
:::
:::

::: exercise Shells and discs agree {#exr-shells-discs level=3}
Let $f$ have a continuous derivative and be strictly decreasing on $[0,b]$, with $f(b) = 0$ and $f(0) = h$. The region under $y = f(x)$, $0\le x\le b$, is rotated about the $y$-axis. Show that slicing perpendicular to the $y$-axis (discs) and the shell method give the same volume:

$$
\int_0^h\pi\bigl(f^{-1}(y)\bigr)^2\,dy = \int_0^b2\pi x\,f(x)\,dx .
$$
::: solution
At height $y\in[0,h]$ the cross-section of the solid is a disc of radius $f^{-1}(y)$, which gives the left-hand side. In it, substitute $y = f(x)$, so that $f^{-1}(y) = x$ and $dy = f'(x)\,dx$; as $y$ runs from $0$ to $h$, $x$ runs from $b$ to $0$. By [[calculus-1/integration-techniques#thm-substitution]],

$$
\int_0^h\pi\bigl(f^{-1}(y)\bigr)^2\,dy = \int_b^0\pi x^2f'(x)\,dx = -\int_0^b\pi x^2f'(x)\,dx.
$$

Integrate by parts with $u = \pi x^2$ and $dv = f'(x)\,dx$:

$$
-\int_0^b\pi x^2f'(x)\,dx = -\bigl[\pi x^2f(x)\bigr]_0^b + \int_0^b2\pi x\,f(x)\,dx = \int_0^b2\pi xf(x)\,dx,
$$

because the boundary term is $\pi b^2f(b) - 0 = 0$.
:::
:::

::: exercise Archimedes' hemisphere {level=3}
Use Cavalieri's principle to show that a hemisphere of radius $r$ has the same volume as a cylinder of radius $r$ and height $r$ from which a cone with the same base and height has been removed, with the cone's apex at the centre of the cylinder's lower face. Deduce the volume of the ball.
::: solution
Put both solids on a horizontal table, the hemisphere with its flat face down and the cylinder upright, and cut them at height $y$, $0\le y\le r$. The section of the hemisphere is a disc of radius $\sqrt{r^2 - y^2}$, with area $\pi(r^2 - y^2)$. The cone has its apex at the bottom and widens to radius $r$ at the top, so at height $y$ its radius is $y$; the section of the cylinder-minus-cone is an annulus of area $\pi r^2 - \pi y^2$. The areas agree at every height, so by Cavalieri's principle (that is, by [[#eq-volume]]) the volumes agree:

$$
V_{\text{hemisphere}} = \pi r^2\cdot r - \frac13\pi r^2\cdot r = \frac23\pi r^3,
$$

and the ball has volume $\frac43\pi r^3$. This slice-by-slice comparison is a modern form of Archimedes' own reasoning: in his *Method* he balanced slices of a sphere and of a cone against slices of a cylinder, using the law of the lever.
:::
:::
