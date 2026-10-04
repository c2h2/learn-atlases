A thin metal plate has a density that varies from point to point. How heavy is it, and where is its balance point? A hill is described by a height function $z = f(x, y)$ over a rectangular plot; how much earth would it take to build? And a question that looks as if it has nothing to do with several variables: what is $\int_{-\infty}^{\infty} e^{-x^2}\,dx$, the integral behind the normal distribution? No antiderivative of $e^{-x^2}$ can be written in elementary terms, yet the answer, $\sqrt{\pi}$, drops out in three lines once we view the *square* of the integral as an integral over the plane.

In one variable, $\int_a^b f(x)\,dx$ adds up $f$ over an interval; the **double integral** $\iint_D f\,dA$ adds up $f$ over a region $D$ in the plane, and the **triple integral** $\iiint_E f\,dV$ over a solid $E$ in space. This chapter defines them as limits of Riemann sums, proves Fubini's theorem — which reduces them to repeated one-variable integrals — and shows how to describe regions and choose coordinates (polar, cylindrical, spherical) that make the integrals manageable. The one-variable theory of [[calculus-1/integrals]] and the techniques of [[calculus-1/integration-techniques]] are used throughout.

## Double integrals over rectangles

Start with a function $f(x,y) \ge 0$ on a rectangle $R = [a,b]\times[c,d]$ and the solid that lies above $R$ and below the graph of $f$. To estimate its volume, cut $[a,b]$ into pieces by points $a = x_0 < x_1 < \dots < x_m = b$ and $[c,d]$ by $c = y_0 < \dots < y_n = d$. This divides $R$ into $mn$ small rectangles $R_{ij} = [x_{i-1}, x_i]\times[y_{j-1}, y_j]$ of area $\Delta A_{ij} = \Delta x_i\,\Delta y_j$. Over each $R_{ij}$, choose a sample point $(x_{ij}^*, y_{ij}^*)$ and approximate the solid by a box of height $f(x_{ij}^*, y_{ij}^*)$. The total volume of the boxes is the **Riemann sum**

$$
S = \sum_{i=1}^m\sum_{j=1}^n f(x_{ij}^*, y_{ij}^*)\,\Delta A_{ij}.
$$

As the partition becomes finer the boxes fit the solid better, and we define the volume — and, for functions of any sign, the integral — as the limit. The **mesh** of the partition is the largest of the $\Delta x_i$ and $\Delta y_j$.

::: definition Double integral {#def-double-integral}
A bounded function $f$ on a rectangle $R$ is **integrable** over $R$, with **double integral** $I$, if for every $\eps > 0$ there is $\delta > 0$ such that every Riemann sum $S$ of a partition with mesh less than $\delta$ (with any choice of sample points) satisfies $\abs{S - I} < \eps$. We write

$$
I = \iint_R f(x,y)\,dA = \lim_{\text{mesh}\to0}\sum_{i,j} f(x_{ij}^*, y_{ij}^*)\,\Delta A_{ij}.
$$
:::

When $f \ge 0$ the integral is the volume under the graph; in general it is the volume above the $xy$-plane minus the volume below. As in one variable, the key existence result is that every continuous function on $R$ is integrable, and more generally every bounded function whose discontinuities lie on finitely many smooth curves (which have zero area). The proof uses the uniform continuity of continuous functions on closed bounded sets and is given in [[real-analysis/riemann-integral]]; we use it freely. The basic properties of the integral follow directly from the definition.

::: proposition Properties of the double integral {#prop-properties}
Let $f$ and $g$ be integrable on the rectangle $R$ and let $\alpha, \beta\in\R$. Then

1. (linearity) $\alpha f + \beta g$ is integrable and $\iint_R(\alpha f + \beta g)\,dA = \alpha\iint_R f\,dA + \beta\iint_R g\,dA$;
2. (monotonicity) if $f\le g$ on $R$, then $\iint_R f\,dA \le \iint_R g\,dA$;
3. if $\abs{f}$ is integrable (for example if $f$ is continuous), then $\abs{\iint_R f\,dA} \le \iint_R\abs{f}\,dA$;
4. (additivity) if a line parallel to an axis divides $R$ into rectangles $R_1$ and $R_2$, then $\iint_R f\,dA = \iint_{R_1}f\,dA + \iint_{R_2}f\,dA$;
5. $\iint_R 1\,dA = \text{area}(R)$.
:::

::: proof
For a fixed partition and fixed sample points, Riemann sums are linear in the function, $S(\alpha f + \beta g) = \alpha S(f) + \beta S(g)$, and monotone: $f\le g$ gives $S(f)\le S(g)$ term by term. Letting the mesh tend to $0$ gives (1) and (2), since limits respect sums, constant multiples and non-strict inequalities. Statement (3) follows from (2) applied to $-\abs{f}\le f\le\abs{f}$. For (4), use partitions of $R$ that contain the dividing line; such partitions of arbitrarily small mesh exist, and each of their Riemann sums splits into a Riemann sum for $R_1$ plus one for $R_2$. Finally every Riemann sum of the constant $1$ is $\sum\Delta A_{ij} = \text{area}(R)$.
:::

## Iterated integrals and Fubini's theorem

Computing a double integral from Riemann sums is as impractical as computing $\int_0^1 x^2\,dx$ from sums. Instead we slice. Fix $x$ and integrate in $y$:

$$
A(x) = \int_c^d f(x,y)\,dy
$$

is the area of the cross-section of the solid by the plane through $x$ perpendicular to the $x$-axis. Adding up slices of thickness $dx$ suggests that the volume is $\int_a^b A(x)\,dx$. This **iterated integral** is written $\int_a^b\int_c^d f(x,y)\,dy\,dx$, with the inner integral done first. Slicing the other way gives $\int_c^d\int_a^b f(x,y)\,dx\,dy$.

::: theorem Fubini's theorem {#thm-fubini}
If $f$ is continuous on the rectangle $R = [a,b]\times[c,d]$, then

$$
\iint_R f\,dA = \int_a^b\left(\int_c^d f(x,y)\,dy\right)dx = \int_c^d\left(\int_a^b f(x,y)\,dx\right)dy .
$$
:::

::: proof
Let $F(x) = \int_c^d f(x,y)\,dy$. Since $f$ is continuous on the closed bounded set $R$, it is uniformly continuous ([[real-analysis/continuity]]), which implies that $F$ is continuous on $[a,b]$, hence integrable.

Take any partition of $R$ into rectangles $R_{ij}$ as above, and let $m_{ij}$ and $M_{ij}$ be the minimum and maximum of $f$ on $R_{ij}$. For $x\in[x_{i-1}, x_i]$, integrating $m_{ij} \le f(x,y) \le M_{ij}$ over $y \in[y_{j-1}, y_j]$ and adding over $j$ gives

$$
\sum_j m_{ij}\,\Delta y_j \;\le\; F(x) \;\le\; \sum_j M_{ij}\,\Delta y_j .
$$

Integrate over $x\in[x_{i-1}, x_i]$ and add over $i$:

$$
L = \sum_{i,j} m_{ij}\,\Delta x_i\,\Delta y_j \;\le\; \int_a^b F(x)\,dx \;\le\; \sum_{i,j}M_{ij}\,\Delta x_i\,\Delta y_j = U .
$$

Every Riemann sum of a *refinement* of this partition lies between $L$ and $U$, because each of its small rectangles lies inside some $R_{ij}$, where $m_{ij}\le f\le M_{ij}$. Refinements of arbitrarily small mesh exist, and their Riemann sums converge to $\iint_R f\,dA$; so also $L \le \iint_R f\,dA \le U$. Now let $\eps > 0$. By uniform continuity there is $\delta > 0$ such that $\abs{f(\mathbf{p}) - f(\mathbf{q})} < \eps$ whenever $\norm{\mathbf{p} - \mathbf{q}} < \delta$; for a partition whose rectangles all have diameter less than $\delta$ we get $M_{ij} - m_{ij} < \eps$ and therefore $U - L < \eps\cdot\text{area}(R)$. Both $\int_a^bF\,dx$ and $\iint_R f\,dA$ lie in the interval $[L, U]$ of length less than $\eps\cdot\text{area}(R)$, for every $\eps > 0$; so they are equal. The same argument with the roles of $x$ and $y$ exchanged gives the second equality.
:::

The same proof works whenever $f$ is integrable on $R$ and the inner integrals exist; in particular for bounded functions continuous except on finitely many smooth curves. The most general form, for Lebesgue integrable functions, is proved in [[measure-theory/lebesgue-integral]].

::: example Choosing the order {#ex-order}
Evaluate $\displaystyle\iint_R x\,e^{xy}\,dA$ over $R = [0,1]\times[0,1]$.
::: solution
Integrating first in $y$, the factor $x$ is exactly what the inner antiderivative needs:

$$
\int_0^1 x\,e^{xy}\,dy = \Bigl[e^{xy}\Bigr]_{y=0}^{y=1} = e^x - 1, \qquad\text{so}\qquad \iint_R x\,e^{xy}\,dA = \int_0^1 (e^x - 1)\,dx = e - 2 .
$$

In the other order the inner integral $\int_0^1 x e^{xy}\,dx$ needs integration by parts and produces an awkward function of $y$; Fubini guarantees the same answer, $e - 2 \approx 0.718$, but at the cost of much more work. Choosing the order of integration is often the main decision in a multiple integral.
:::
:::

::: warning Fubini needs hypotheses
For the unbounded function $f(x,y) = \dfrac{x^2 - y^2}{(x^2+y^2)^2}$ on $(0,1]\times(0,1]$, both iterated integrals exist but are different:

$$
\int_0^1\int_0^1 f\,dy\,dx = \int_0^1\frac{dx}{1+x^2} = \frac{\pi}{4}, \qquad \int_0^1\int_0^1 f\,dx\,dy = -\frac{\pi}{4},
$$

since $\int_0^1 f\,dy = \bigl[\tfrac{y}{x^2+y^2}\bigr]_0^1 = \tfrac{1}{1+x^2}$ and $f(y,x) = -f(x,y)$. The double integral does not exist: $f$ is unbounded near the origin and $\iint\abs{f}\,dA = \infty$. Swapping the order of integration is safe for continuous functions on rectangles, and for any function whose absolute value has a finite integral — not otherwise.
:::

A special case worth remembering: if $f(x,y) = g(x)h(y)$, then $\iint_R f\,dA = \left(\int_a^b g\,dx\right)\left(\int_c^d h\,dy\right)$, because the inner integral $\int_c^d g(x)h(y)\,dy = g(x)\int_c^d h$ pulls the constant $\int_c^d h$ out of the outer one.

## Integrals over general regions

Regions of interest are rarely rectangles. For a bounded region $D$, enclose it in a rectangle $R$ and extend $f$ by zero: $\tilde f = f$ on $D$ and $\tilde f = 0$ on $R\setminus D$. Then define $\iint_D f\,dA = \iint_R\tilde f\,dA$. If $f$ is continuous on $D$ and the boundary of $D$ consists of finitely many smooth curves, $\tilde f$ is continuous except on the boundary of $D$, so the integral exists. For computation, two shapes of region are fundamental.

::: definition Regions of type I and type II {#def-region-types}
A region is of **type I** if it lies between the graphs of two continuous functions of $x$,

$$
D = \set{(x,y) : a \le x \le b,\ g_1(x) \le y \le g_2(x)},
$$

and of **type II** if it lies between the graphs of two continuous functions of $y$, $D = \set{(x,y) : c\le y\le d,\ h_1(y) \le x \le h_2(y)}$.
:::

::: theorem Iterated integrals over type I and II regions {#thm-general-fubini}
If $f$ is continuous on a type I region $D$ as above, then

$$
\iint_D f\,dA = \int_a^b\int_{g_1(x)}^{g_2(x)} f(x,y)\,dy\,dx ,
$$

and similarly $\iint_D f\,dA = \int_c^d\int_{h_1(y)}^{h_2(y)} f(x,y)\,dx\,dy$ for a type II region.
:::

::: proof
Choose $R = [a,b]\times[c,d]$ containing $D$ and apply Fubini's theorem (in the extended form just mentioned) to $\tilde f$, which is continuous except on the boundary curves of $D$. For fixed $x$, $\tilde f(x, y)$ vanishes unless $g_1(x)\le y\le g_2(x)$, so $\int_c^d\tilde f(x,y)\,dy = \int_{g_1(x)}^{g_2(x)} f(x,y)\,dy$.
:::

The recipe for a type I region: **draw the region**, let a vertical line sweep across it from $x = a$ to $x = b$, and note where the line enters ($y = g_1(x)$) and leaves ($y = g_2(x)$). Those are the inner limits; the outer limits are constants.

::: example One region, both orders {#ex-two-orders}
Let $D$ be the region between the curves $y = x^2$ and $y = \sqrt{x}$. Evaluate $\iint_D xy\,dA$ in both orders.
::: solution
The curves meet where $x^2 = \sqrt x$, that is at $x = 0$ and $x = 1$, and $\sqrt{x} \ge x^2$ between them. As a type I region, $0 \le x\le1$, $x^2 \le y\le\sqrt x$:

$$
\int_0^1\int_{x^2}^{\sqrt x} xy\,dy\,dx = \int_0^1 x\cdot\frac{x - x^4}{2}\,dx = \frac12\left(\frac13 - \frac16\right) = \frac{1}{12}.
$$

As a type II region, a horizontal line at height $y\in[0,1]$ enters at $x = y^2$ (the curve $y = \sqrt x$) and leaves at $x = \sqrt y$ (the curve $y = x^2$):

$$
\int_0^1\int_{y^2}^{\sqrt y} xy\,dx\,dy = \int_0^1 y\cdot\frac{y - y^4}{2}\,dy = \frac{1}{12}.
$$

The region is symmetric in the line $y = x$, which is why the two computations look identical.
:::
:::

::: widget region
lower: x^2
upper: sqrt(x)
a: 0
b: 1
left: y^2
right: sqrt(y)
c: 0
d: 1
f: x*y
caption: The region of [[#ex-two-orders]]. Move the slice across the region: in the type I view a vertical segment runs from $y = x^2$ up to $y = \sqrt x$, and in the type II view a horizontal segment runs from $x = y^2$ to $x = \sqrt y$. The limits of the inner integral are where the slice enters and leaves; both orders give $\iint_D xy\,dA = 1/12$.
:::

::: example Reversing the order to make an integral possible {#ex-reverse}
Evaluate $\displaystyle\int_0^1\int_x^1 e^{y^2}\,dy\,dx$.
::: solution
As written, the inner integral asks for an antiderivative of $e^{y^2}$, which is not elementary. The limits describe the triangle $0\le x\le1$, $x\le y\le1$, with vertices $(0,0)$, $(0,1)$ and $(1,1)$. Viewed as a type II region it is $0\le y\le 1$, $0\le x\le y$. By [[#thm-general-fubini]],

$$
\int_0^1\int_x^1 e^{y^2}\,dy\,dx = \int_0^1\int_0^y e^{y^2}\,dx\,dy = \int_0^1 y\,e^{y^2}\,dy = \Bigl[\tfrac12 e^{y^2}\Bigr]_0^1 = \frac{e - 1}{2}.
$$

The inner integral in $x$ is trivial because the integrand does not depend on $x$, and it produces exactly the factor $y$ that the substitution $u = y^2$ needs.
:::
:::

::: widget region
lower: x
upper: 1
a: 0
b: 1
left: 0
right: y
c: 0
d: 1
f: exp(y^2)
caption: The triangle of [[#ex-reverse]]. In the type I description the vertical slice runs from $y = x$ to $y = 1$, and the inner integral of $e^{y^2}$ is impossible in closed form. Switch to type II: the horizontal slice runs from $x = 0$ to $x = y$, and the integral becomes elementary. The value $(e-1)/2 \approx 0.859$ is the same either way.
:::

::: quiz
Which iterated integral equals $\displaystyle\int_0^2\int_{x/2}^{1} f(x,y)\,dy\,dx$ for every continuous $f$?
- [x] $\displaystyle\int_0^1\int_0^{2y} f(x,y)\,dx\,dy$
- [ ] $\displaystyle\int_0^1\int_{2y}^{2} f(x,y)\,dx\,dy$
- [ ] $\displaystyle\int_{x/2}^1\int_0^2 f(x,y)\,dx\,dy$
- [ ] $\displaystyle\int_0^2\int_0^{y/2} f(x,y)\,dx\,dy$
::: solution
The region is $0\le x\le2$, $x/2\le y\le1$: the triangle with vertices $(0,0)$, $(0,1)$ and $(2,1)$. A horizontal line at height $y\in[0,1]$ meets it for $0\le x\le 2y$ (the condition $y \ge x/2$ is $x\le 2y$). The third option has variable outer limits, which can never be right: the outer limits must be constants.
:::
:::

### Area, mass and centre of mass

Integrating the constant $1$ gives the **area**: $\text{area}(D) = \iint_D 1\,dA$. If a thin plate occupying $D$ has **density** $\sigma(x,y)$ (mass per unit area), its **mass** and **centre of mass** $(\bar x, \bar y)$ are

$$
m = \iint_D \sigma\,dA, \qquad \bar x = \frac1m\iint_D x\,\sigma\,dA, \qquad \bar y = \frac1m\iint_D y\,\sigma\,dA,
$$

obtained by adding up the masses $\sigma\,\Delta A$ and their moments $x\,\sigma\,\Delta A$, $y\,\sigma\,\Delta A$ of small pieces. For constant density the centre of mass is the **centroid**, a purely geometric point. Similarly the **average value** of $f$ over $D$ is $\frac{1}{\text{area}(D)}\iint_D f\,dA$, and for continuous functions the average is always attained.

::: theorem Mean value theorem for double integrals {#thm-mvt-integral}
Let $D$ be a closed bounded region of positive area in which any two points can be joined by a continuous path in $D$, and let $f$ be continuous on $D$. Then there is a point $\mathbf{p}\in D$ with

$$
\iint_D f\,dA = f(\mathbf{p})\,\text{area}(D).
$$
:::

::: proof
By the extreme value theorem ([[multivariable/extrema#thm-evt]]) $f$ attains a minimum $m = f(\mathbf{p}_1)$ and a maximum $M = f(\mathbf{p}_2)$ on $D$. Integrating $m\le f\le M$ over $D$ (monotonicity) gives $m\,\text{area}(D) \le \iint_D f\,dA \le M\,\text{area}(D)$, so the average value $\mu = \iint_D f\,dA/\text{area}(D)$ lies in $[m, M]$. Let $\boldsymbol{\gamma}\colon[0,1]\to D$ be a continuous path from $\mathbf{p}_1$ to $\mathbf{p}_2$. The function $f\circ\boldsymbol\gamma$ is continuous on $[0,1]$ with values $m$ and $M$ at the ends, so by the intermediate value theorem it takes the value $\mu$ at some $t_0$; put $\mathbf{p} = \boldsymbol\gamma(t_0)$.
:::

Applying this to the discs $D_r$ of radius $r$ about a point $\mathbf{a}$ gives a point $\mathbf{p}_r\in D_r$ with $\frac{1}{\pi r^2}\iint_{D_r}f\,dA = f(\mathbf{p}_r)$, and $\mathbf{p}_r\to\mathbf{a}$ as $r\to0$. Hence, for continuous $f$,

$$
\lim_{r\to0}\frac{1}{\pi r^2}\iint_{D_r}f\,dA = f(\mathbf{a}):
$$ {#eq-density}

a continuous function is recovered from its integrals over small discs. This is how divergence and curl will be interpreted as densities of flux and circulation in [[multivariable/greens-theorem]] and [[multivariable/stokes-divergence]].

## Triple integrals

Everything above extends to functions of three variables. A bounded function on a box $B = [a,b]\times[c,d]\times[p,q]$ is integrable if its Riemann sums $\sum f(\mathbf{x}^*_{ijk})\,\Delta V_{ijk}$ over partitions into small boxes converge, Fubini's theorem holds with the same proof (now there are six possible orders), and for a solid lying between two surfaces,

$$
E = \set{(x,y,z) : (x,y)\in D,\ u_1(x,y)\le z\le u_2(x,y)}, \qquad \iiint_E f\,dV = \iint_D\left(\int_{u_1(x,y)}^{u_2(x,y)} f\,dz\right)dA .
$$

The volume of $E$ is $\iiint_E 1\,dV$, and a solid with density $\rho$ has mass $\iiint_E\rho\,dV$ and centre of mass $\bar z = \frac1m\iiint_E z\rho\,dV$, and so on.

::: example The centroid of a tetrahedron {#ex-tetrahedron}
Let $E$ be the tetrahedron bounded by the coordinate planes and the plane $x + y + z = 1$. Find its volume and the height $\bar z$ of its centroid.
::: solution
The solid lies above the triangle $D$: $0 \le x\le1$, $0\le y\le 1-x$ in the $xy$-plane, and below the plane $z = 1 - x - y$. So

$$
\iiint_E z\,dV = \int_0^1\int_0^{1-x}\int_0^{1-x-y} z\,dz\,dy\,dx = \int_0^1\int_0^{1-x}\frac{(1-x-y)^2}{2}\,dy\,dx = \int_0^1\frac{(1-x)^3}{6}\,dx = \frac{1}{24},
$$

and in the same way $\text{vol}(E) = \int_0^1\int_0^{1-x}(1-x-y)\,dy\,dx = \int_0^1\frac{(1-x)^2}{2}\,dx = \frac16$. Hence $\bar z = \dfrac{1/24}{1/6} = \dfrac14$. By symmetry $\bar x = \bar y = \tfrac14$ too: the centroid of a tetrahedron is a quarter of the way up from each face to the opposite vertex.
:::
:::

## Polar coordinates

Integrals over discs, annuli and sectors are awkward in $x$ and $y$ — the limits involve square roots — but simple in **polar coordinates** $x = r\cos\theta$, $y = r\sin\theta$ ([[calculus-2/parametric-polar]]). The question is what replaces $dA = dx\,dy$.

Cut the plane by circles $r = r_i$ and rays $\theta = \theta_j$. A typical piece, the **polar rectangle** $r_{i-1}\le r\le r_i$, $\theta_{j-1}\le\theta\le\theta_j$, is a difference of two circular sectors, so its area is exactly

$$
\Delta A = \tfrac12 r_i^2\,\Delta\theta - \tfrac12 r_{i-1}^2\,\Delta\theta = \frac{r_i + r_{i-1}}{2}\,(r_i - r_{i-1})\,\Delta\theta = r_i^*\,\Delta r\,\Delta\theta,
$$

where $r_i^*$ is the midpoint radius. The polar rectangle is *not* a $\Delta r$ by $\Delta\theta$ rectangle: its sides are $\Delta r$ and approximately $r\,\Delta\theta$, an arc whose length grows with the distance from the origin. This exact formula is the heart of the following theorem.

::: theorem Integration in polar coordinates {#thm-polar}
Let $D = \set{(r\cos\theta, r\sin\theta) : \alpha\le\theta\le\beta,\ h_1(\theta)\le r\le h_2(\theta)}$, where $0\le\beta - \alpha\le2\pi$ and $0\le h_1\le h_2$ are continuous. If $f$ is continuous on $D$, then

$$
\iint_D f(x,y)\,dA = \int_\alpha^\beta\int_{h_1(\theta)}^{h_2(\theta)} f(r\cos\theta, r\sin\theta)\,r\,dr\,d\theta, \qquad D = \set{\alpha\le\theta\le\beta,\ h_1(\theta)\le r\le h_2(\theta)}.
$$ {#eq-polar}

:::

::: proof
*Sketch.* Partition the parameter rectangle $[r_{\min}, r_{\max}]\times[\alpha, \beta]$ into small rectangles; their images are polar rectangles covering $D$. Choosing each sample point at the midpoint radius $r_i^*$, the identity $\Delta A = r_i^*\,\Delta r\,\Delta\theta$ turns a Riemann sum $\sum f(\mathbf{x}^*)\,\Delta A$ for $\iint_D f\,dA$ into a Riemann sum for the function $f(r\cos\theta, r\sin\theta)\,r$ over the parameter rectangle, and letting the mesh tend to $0$ gives the formula. What this sketch glosses over is that polar rectangles are not the ordinary rectangles of [[#def-double-integral]]; the gap is closed in [[multivariable/change-of-variables#thm-change-of-variables]], of which [[#eq-polar]] is a special case, the factor $r$ appearing as a Jacobian determinant.
:::

In short, $dA = r\,dr\,d\theta$.

::: example The volume under a paraboloid {#ex-paraboloid}
Find the volume of the solid above the $xy$-plane and below the paraboloid $z = 4 - x^2 - y^2$.
::: solution
The paraboloid meets the plane $z = 0$ in the circle $x^2 + y^2 = 4$, so the solid lies over the disc $r \le 2$, where the height is $4 - r^2$. By [[#eq-polar]],

$$
V = \int_0^{2\pi}\int_0^2(4 - r^2)\,r\,dr\,d\theta = 2\pi\left[2r^2 - \frac{r^4}{4}\right]_0^2 = 2\pi(8 - 4) = 8\pi .
$$

In Cartesian coordinates the same volume is $\int_{-2}^2\int_{-\sqrt{4-x^2}}^{\sqrt{4-x^2}}(4 - x^2 - y^2)\,dy\,dx$, a much less pleasant calculation.
:::
:::

::: example The Gaussian integral {#ex-gaussian}
Prove that $\displaystyle\int_{-\infty}^{\infty}e^{-x^2}\,dx = \sqrt{\pi}$.
::: solution
Let $I(a) = \int_{-a}^{a}e^{-x^2}\,dx$, which increases with $a$ and converges as $a\to\infty$ (compare with $e^{-\abs{x}}$ for $\abs{x}\ge1$; see [[calculus-1/improper-integrals]]). By the product case of Fubini's theorem noted above, on the square $S_a = [-a,a]^2$,

$$
I(a)^2 = \int_{-a}^a e^{-x^2}\,dx\int_{-a}^a e^{-y^2}\,dy = \iint_{S_a} e^{-(x^2+y^2)}\,dA .
$$

The integrand is positive, and the square $S_a$ contains the disc $D_a$ of radius $a$ and is contained in the disc $D_{a\sqrt2}$. Over a disc of radius $b$, polar coordinates give

$$
\iint_{D_b}e^{-(x^2+y^2)}\,dA = \int_0^{2\pi}\int_0^b e^{-r^2}\,r\,dr\,d\theta = 2\pi\left[-\tfrac12e^{-r^2}\right]_0^b = \pi\left(1 - e^{-b^2}\right).
$$

Therefore $\pi(1 - e^{-a^2}) \le I(a)^2 \le \pi(1 - e^{-2a^2})$. Letting $a\to\infty$, both bounds tend to $\pi$, so $\left(\int_{-\infty}^\infty e^{-x^2}\,dx\right)^2 = \pi$, and the integral (which is positive) equals $\sqrt\pi$. The factor $r$ in $dA = r\,dr\,d\theta$ is precisely what makes $e^{-r^2}$ integrable in closed form.
:::
:::

::: widget surface
f: exp(-x^2 - y^2)
x: -2.5, 2.5
y: -2.5, 2.5
contours: true
color: height
caption: The bell-shaped surface $z = e^{-(x^2+y^2)}$. Its level curves are circles, which is why polar coordinates suit it, and the volume beneath it is exactly $\pi$ ([[#ex-gaussian]]). Every vertical slice $y = $ const is a scaled copy of the one-variable bell curve $e^{-x^2}$.
:::

::: application The normal distribution
The standard normal density $\varphi(x) = \frac{1}{\sqrt{2\pi}}e^{-x^2/2}$ is the most important function in statistics. That its total integral is $1$ follows from [[#ex-gaussian]] by the substitution $x = \sqrt2\,u$. The same polar-coordinates trick shows that if $X$ and $Y$ are independent standard normal variables, the pair $(X,Y)$ has a rotationally symmetric distribution — the starting point of the Box–Muller method for generating normal random numbers ([[probability/joint-distributions]]).
:::

## Cylindrical and spherical coordinates

In space, two coordinate systems adapted to symmetry are used constantly.

**Cylindrical coordinates** $(r, \theta, z)$ are polar coordinates in the $xy$-plane together with the height $z$: $x = r\cos\theta$, $y = r\sin\theta$, $z = z$. A small cylindrical box has base area $r\,\Delta r\,\Delta\theta$ and height $\Delta z$, so

$$
\iiint_E f\,dV = \iiint f(r\cos\theta, r\sin\theta, z)\,r\,dz\,dr\,d\theta .
$$ {#eq-cylindrical}

They suit solids with an axis of symmetry: cylinders, cones, paraboloids of revolution.

::: example The moment of inertia of a cylinder {#ex-inertia}
A solid cylinder of radius $R$, height $h$ and constant density $\rho$ spins about its axis. Find its moment of inertia $I = \iiint_E \rho\,(x^2+y^2)\,dV$ in terms of its mass $M$.
::: solution
With the axis along the $z$-axis, $E$ is $0\le r\le R$, $0\le\theta\le2\pi$, $0\le z\le h$, and $x^2 + y^2 = r^2$. By [[#eq-cylindrical]],

$$
I = \rho\int_0^{2\pi}\int_0^R\int_0^h r^2\cdot r\,dz\,dr\,d\theta = \rho\cdot2\pi\cdot\frac{R^4}{4}\cdot h = \frac{\pi\rho R^4h}{2}.
$$

The mass is $M = \rho\pi R^2h$, so $I = \tfrac12MR^2$. A hollow tube of the same mass, with all its mass at distance $R$, would have $I = MR^2$: solid cylinders are easier to spin up, which is why a full tin rolls down a slope faster than an empty one.
:::
:::

**Spherical coordinates** $(\rho, \phi, \theta)$ locate a point by its distance $\rho\ge0$ from the origin, the angle $\phi\in[0,\pi]$ between its position vector and the positive $z$-axis, and the same azimuthal angle $\theta$ as in cylindrical coordinates:

$$
x = \rho\sin\phi\cos\theta, \qquad y = \rho\sin\phi\sin\theta, \qquad z = \rho\cos\phi .
$$

The small region $\rho\in[\rho_1,\rho_2]$, $\phi\in[\phi_1,\phi_2]$, $\theta\in[\theta_1,\theta_2]$ is nearly a box with edges $\Delta\rho$ (radially), $\rho\,\Delta\phi$ (along a meridian) and $\rho\sin\phi\,\Delta\theta$ (along a circle of latitude, whose radius is $\rho\sin\phi$). In fact, using Archimedes' formula for the volume of a spherical sector, its volume is exactly $\tfrac13(\rho_2^3 - \rho_1^3)(\cos\phi_1 - \cos\phi_2)\,\Delta\theta$, which by the mean value theorem equals $\tilde\rho^2\sin\tilde\phi\,\Delta\rho\,\Delta\phi\,\Delta\theta$ for some intermediate $\tilde\rho, \tilde\phi$. Hence $dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$:

$$
\iiint_E f\,dV = \iiint f(\rho\sin\phi\cos\theta,\ \rho\sin\phi\sin\theta,\ \rho\cos\phi)\,\rho^2\sin\phi\,d\rho\,d\phi\,d\theta .
$$ {#eq-spherical}

For the ball of radius $R$ this gives at once $\int_0^{2\pi}\int_0^\pi\int_0^R\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot2\cdot\tfrac{R^3}{3} = \tfrac43\pi R^3$.

::: example An ice-cream cone {#ex-icecream}
Find the volume of the solid that lies inside the sphere $x^2 + y^2 + z^2 = 1$ and above the cone $z = \sqrt{x^2 + y^2}$.
::: solution
In spherical coordinates the sphere is $\rho = 1$, and the cone $z = \sqrt{x^2+y^2}$ is $\rho\cos\phi = \rho\sin\phi$, that is $\phi = \pi/4$. The solid is $0\le\rho\le1$, $0\le\phi\le\pi/4$, $0\le\theta\le2\pi$, so

$$
V = \int_0^{2\pi}\int_0^{\pi/4}\int_0^1\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot\Bigl[-\cos\phi\Bigr]_0^{\pi/4}\cdot\frac13 = \frac{2\pi}{3}\left(1 - \frac{\sqrt2}{2}\right) = \frac{\pi(2-\sqrt2)}{3} \approx 0.613 .
$$
:::
:::

::: quiz
Which integral gives the volume of the ball of radius $2$?
- [ ] $\displaystyle\int_0^{2\pi}\int_0^{2\pi}\int_0^2 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$
- [x] $\displaystyle\int_0^{2\pi}\int_0^{\pi}\int_0^2 \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$
- [ ] $\displaystyle\int_0^{2\pi}\int_0^{\pi}\int_0^2 d\rho\,d\phi\,d\theta$
- [ ] $\displaystyle\int_0^{2\pi}\int_0^{\pi}\int_0^2 \rho\,d\rho\,d\phi\,d\theta$
::: solution
The polar angle $\phi$ runs only from $0$ (north pole) to $\pi$ (south pole); letting it run to $2\pi$ covers the ball twice and, worse, $\sin\phi < 0$ on $(\pi, 2\pi)$ makes the integral $0$. The volume element is $\rho^2\sin\phi\,d\rho\,d\phi\,d\theta$; without the factor $\rho^2\sin\phi$ we would be computing the volume of the box $[0,2]\times[0,\pi]\times[0,2\pi]$ in coordinate space, not of the ball. The correct integral gives $\tfrac{32\pi}{3}$.
:::
:::

::: warning Do not forget the volume factor, or mix conventions
The most common error with curvilinear coordinates is to write $dA = dr\,d\theta$ or $dV = d\rho\,d\phi\,d\theta$; the factors $r$ and $\rho^2\sin\phi$ are essential, and they measure how much the coordinate grid is stretched. A second trap is notation: many physics books swap the names, using $\theta$ for the polar angle from the $z$-axis and $\phi$ for the azimuth, and $r$ for the distance from the origin. The volume element is the same geometric object either way — the sine always belongs to the angle measured from the axis.
:::

::: history
Slicing a solid to find its volume goes back to Bonaventura Cavalieri, whose *Geometria indivisibilibus* (1635) compared solids by comparing their cross-sections, and further still to Archimedes, who found the volume of a sphere by balancing slices. Double integrals over general regions, evaluated as repeated integrals, were developed by Leonhard Euler in the eighteenth century, and in 1773 Joseph-Louis Lagrange, studying the gravitational attraction of ellipsoids, wrote volumes as triple integrals and transformed them into spherical coordinates. For the integrals of the eighteenth and nineteenth centuries, reversing the order of integration was used freely for well-behaved functions; the precise conditions under which it is valid were settled for the Lebesgue integral by Guido Fubini in 1907 and, for non-negative functions, by Leonida Tonelli in 1909.
:::

## Where this leads

The factors $r$ and $\rho^2\sin\phi$ are special cases of the Jacobian determinant, and [[multivariable/change-of-variables]] proves the general change of variables formula, which lets us choose coordinates adapted to any region. Double integrals over regions bounded by curves are related to line integrals around their boundaries by Green's theorem ([[multivariable/greens-theorem]]), and triple integrals to surface integrals by the divergence theorem ([[multivariable/stokes-divergence]]). In probability, joint densities are integrated over regions of the plane to compute probabilities and expectations ([[probability/joint-distributions]]), and when integrals cannot be done in closed form they are approximated by the methods of [[numerical-analysis/numerical-integration]] or by Monte Carlo sampling. The Lebesgue integral of [[measure-theory/lebesgue-integral]] puts Fubini's theorem in its natural generality.

::: summary
- $\iint_R f\,dA$ is the limit of Riemann sums $\sum f(\mathbf{x}_{ij}^*)\,\Delta A_{ij}$; for $f\ge0$ it is the volume under the graph ([[#def-double-integral]]).
- Fubini's theorem: for continuous $f$ on a rectangle the double integral equals either iterated integral ([[#thm-fubini]]). Without hypotheses (e.g. unbounded $f$) the iterated integrals can differ.
- Over a type I region, $\iint_D f\,dA = \int_a^b\int_{g_1(x)}^{g_2(x)}f\,dy\,dx$: draw the region and read the inner limits off a sweeping slice; the outer limits are constants.
- Reversing the order of integration can turn an impossible integral into an easy one; redraw the region to find the new limits.
- Area, mass, centre of mass and average value are all integrals; triple integrals work the same way.
- Polar: $dA = r\,dr\,d\theta$ ([[#eq-polar]]); cylindrical: $dV = r\,dz\,dr\,d\theta$ ([[#eq-cylindrical]]); spherical: $dV = \rho^2\sin\phi\,d\rho\,d\phi\,d\theta$ with $0\le\phi\le\pi$ ([[#eq-spherical]]).
- Polar coordinates give $\int_{-\infty}^\infty e^{-x^2}\,dx = \sqrt\pi$.
:::

## Exercises

::: exercise A rectangle {level=1 check="11/3"}
Evaluate $\displaystyle\iint_R (x + y^2)\,dA$ where $R = [0,1]\times[0,2]$.
::: solution
$\displaystyle\int_0^1\int_0^2(x + y^2)\,dy\,dx = \int_0^1\left(2x + \frac83\right)dx = 1 + \frac83 = \frac{11}{3}$.
:::
:::

::: exercise A triangle {level=1 check="1/3"}
Evaluate $\displaystyle\iint_D (x + y)\,dA$ where $D$ is the triangle with vertices $(0,0)$, $(1,0)$ and $(0,1)$.
::: solution
$D$ is $0\le x\le1$, $0\le y\le1-x$. The inner integral is $\int_0^{1-x}(x + y)\,dy = x(1-x) + \tfrac12(1-x)^2 = \tfrac12(1-x)(1+x)$, and $\tfrac12\int_0^1(1 - x^2)\,dx = \tfrac12\cdot\tfrac23 = \tfrac13$.
:::
:::

::: exercise Polar coordinates {level=1 check="pi*(1 - exp(-4))"}
Evaluate $\displaystyle\iint_D e^{-(x^2+y^2)}\,dA$ over the disc $x^2 + y^2\le 4$.
::: solution
In polar coordinates, $\int_0^{2\pi}\int_0^2 e^{-r^2}r\,dr\,d\theta = 2\pi\left[-\tfrac12e^{-r^2}\right]_0^2 = \pi(1 - e^{-4})$.
:::
:::

::: exercise Reversing an order {level=2 check="2*(2*sqrt(2) - 1)/9"}
Evaluate $\displaystyle\int_0^1\int_{\sqrt x}^1\sqrt{y^3 + 1}\,dy\,dx$.
::: hint
Sketch the region and describe it as a type II region.
:::
::: solution
The region is $0\le x\le 1$, $\sqrt x\le y\le1$, i.e. $0\le y\le1$, $0\le x\le y^2$. So the integral equals

$$
\int_0^1\int_0^{y^2}\sqrt{y^3+1}\,dx\,dy = \int_0^1 y^2\sqrt{y^3+1}\,dy = \Bigl[\tfrac29(y^3+1)^{3/2}\Bigr]_0^1 = \tfrac29\left(2\sqrt2 - 1\right).
$$
:::
:::

::: exercise Centroid of a half-disc {level=2 check="4/(3*pi)"}
Find the height $\bar y$ of the centroid of the half-disc $x^2 + y^2\le1$, $y\ge0$.
::: solution
The area is $\pi/2$. In polar coordinates, $\iint y\,dA = \int_0^\pi\int_0^1 (r\sin\theta)\,r\,dr\,d\theta = \tfrac13\bigl[-\cos\theta\bigr]_0^\pi = \tfrac23$. So $\bar y = \dfrac{2/3}{\pi/2} = \dfrac{4}{3\pi}\approx 0.424$.
:::
:::

::: exercise A ball with variable density {level=2 check="pi"}
A ball of radius $1$ has density equal to the distance from its centre. Find its mass.
::: solution
In spherical coordinates the density is $\rho$, so $m = \int_0^{2\pi}\int_0^\pi\int_0^1\rho\cdot\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot2\cdot\tfrac14 = \pi$.
:::
:::

::: exercise A slanted cylinder {level=2 check="2*pi"}
Find the volume of the solid inside the cylinder $x^2 + y^2 = 1$, above the plane $z = 0$ and below the plane $z = 2 - y$.
::: solution
The height over the point $(x,y)$ of the unit disc $D$ is $2 - y > 0$. So $V = \iint_D(2 - y)\,dA = 2\cdot\text{area}(D) - \iint_D y\,dA = 2\pi - 0$, since $\iint_D y\,dA = 0$ by symmetry ($y\mapsto -y$ maps $D$ to itself and changes the sign of the integrand). So $V = 2\pi$.
:::
:::

::: exercise Moment of inertia of a ball {level=3 check="8*pi/15"}
Find $\iiint_B (x^2 + y^2)\,dV$ over the unit ball $B$, and deduce that a solid ball of mass $M$ and radius $R$ has moment of inertia $\tfrac25MR^2$ about a diameter.
::: solution
In spherical coordinates $x^2 + y^2 = \rho^2\sin^2\phi$, so the integral is

$$
\int_0^{2\pi}\int_0^\pi\int_0^1\rho^4\sin^3\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot\frac43\cdot\frac15 = \frac{8\pi}{15},
$$

using $\int_0^\pi\sin^3\phi\,d\phi = \int_{-1}^1(1 - u^2)\,du = \tfrac43$ (with $u = \cos\phi$). For a ball of radius $R$ and density $\rho_0$, scaling each coordinate by $R$ multiplies the integral by $R^5$, so $I = \rho_0\cdot\tfrac{8\pi}{15}R^5$. Since $M = \rho_0\cdot\tfrac43\pi R^3$, $I = \tfrac{8\pi}{15}\cdot\tfrac{3}{4\pi}MR^2 = \tfrac25MR^2$.
:::
:::

::: exercise Different iterated integrals {level=3}
Let $f(x,y) = \dfrac{x^2-y^2}{(x^2+y^2)^2}$. Show that $\displaystyle\int_0^1\int_0^1 f\,dy\,dx = \frac\pi4$ and $\displaystyle\int_0^1\int_0^1 f\,dx\,dy = -\frac\pi4$, and explain why this does not contradict Fubini's theorem.
::: hint
Check that $\pdv{}{y}\left(\dfrac{y}{x^2+y^2}\right) = f(x,y)$.
:::
::: solution
For $x > 0$, $\pdv{}{y}\dfrac{y}{x^2+y^2} = \dfrac{(x^2+y^2) - 2y^2}{(x^2+y^2)^2} = f(x,y)$, so $\int_0^1 f\,dy = \dfrac{1}{x^2+1}$ and $\int_0^1\frac{dx}{1+x^2} = \arctan 1 = \frac\pi4$. Since $f(y,x) = -f(x,y)$, the other iterated integral is the same computation with the roles of the variables exchanged and the sign reversed: $-\frac\pi4$. There is no contradiction because $f$ is not continuous on $[0,1]^2$ — it is unbounded near the origin (e.g. $f(x,0) = 1/x^2$) — and $\iint\abs{f}\,dA = \infty$, so none of the versions of Fubini's theorem applies.
:::
:::

::: exercise The shell method {level=3}
Let $0\le a<b$ and $f\ge0$ be continuous on $[a,b]$. The region $0\le y\le f(x)$, $a\le x\le b$ is rotated about the $y$-axis. Use cylindrical coordinates (with the $y$-axis as the axis) to prove that the volume of the resulting solid is $2\pi\displaystyle\int_a^b x f(x)\,dx$.
::: solution
Use cylindrical coordinates about the $y$-axis: a point is described by its height $y$, its distance $r$ from the $y$-axis and an angle $\theta$, with volume element $r\,dy\,dr\,d\theta$ (the roles of $y$ and $z$ in [[#eq-cylindrical]] are exchanged). The solid is exactly the set $a\le r\le b$, $0\le y\le f(r)$, $0\le\theta\le2\pi$, since a point at distance $r$ from the axis lies in the solid precisely when the point $(r, y)$ lies in the original region. Hence

$$
V = \int_0^{2\pi}\int_a^b\int_0^{f(r)} r\,dy\,dr\,d\theta = 2\pi\int_a^b r\,f(r)\,dr,
$$

which is the stated formula with $r$ renamed $x$. Each thin shell of radius $x$, height $f(x)$ and thickness $dx$ contributes $2\pi x f(x)\,dx$.
:::
:::
