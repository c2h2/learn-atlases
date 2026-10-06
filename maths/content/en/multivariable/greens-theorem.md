A surveyor's **planimeter** is a small mechanical arm with a tracing pointer and a measuring wheel. Guide the pointer once round the boundary of a field on a map, read the wheel, and you know the area of the field. The instrument never visits the inside of the region — so how can it know the area? The answer is a theorem that converts an integral over a plane region into an integral around its boundary.

You have met this idea before. The fundamental theorem of calculus says $\int_a^b F'(x)\,dx = F(b) - F(a)$: the integral of a derivative over an interval depends only on the values at the boundary of the interval, its two endpoints. The fundamental theorem for line integrals ([[multivariable/line-integrals#thm-ftli]]) says the same for curves. **Green's theorem** is the version for regions in the plane:

$$
\oint_{\partial D} P\,dx + Q\,dy = \iint_D\left(\pdv{Q}{x} - \pdv{P}{y}\right)dA .
$$

On the left is the circulation of the vector field $(P, Q)$ around the boundary $\partial D$; on the right, the integral over $D$ of a certain derivative of the field. In this chapter we prove the theorem, use it to compute line integrals, double integrals and areas, interpret the integrand as a density of circulation, derive a second "flux" form involving the divergence, and finally settle the question left open in [[multivariable/line-integrals]]: when does $P_y = Q_x$ guarantee that a field is conservative?

## Orientation and the statement

A closed curve is **simple** if it does not cross itself: it has a one-to-one parametrisation $\mathbf{r}\colon[a,b]\to\R^2$ apart from $\mathbf{r}(a) = \mathbf{r}(b)$. Circles, ellipses, the boundary of a square and the boundary of a triangle are simple closed curves; a figure of eight is not. The **Jordan curve theorem** of topology says that a simple closed curve $C$ divides the plane into exactly two connected pieces, a bounded **interior** and an unbounded **exterior**, with $C$ as their common boundary. This sounds obvious, but its proof for arbitrary continuous curves is surprisingly hard; for the piecewise smooth curves of this chapter you may take it for granted.

The theorem relates the circulation around $\partial D$ to an integral over $D$, so we must say which way round the boundary is traversed.

::: definition Positive orientation {#def-positive-orientation}
Let $D$ be a bounded region whose boundary $\partial D$ consists of finitely many disjoint piecewise smooth simple closed curves. The boundary is **positively oriented** if $D$ lies on the left of each boundary curve as it is traversed: at each point of $\partial D$ with unit tangent $\mathbf{T} = (T_1, T_2)$, the vector $(-T_2, T_1)$ (the tangent turned anticlockwise through a right angle) points into $D$. Equivalently, the **outward unit normal** is $\mathbf{n} = (T_2, -T_1)$.
:::

For a disc or a square, the positive orientation is anticlockwise. For a region with holes, such as the annulus $1\le x^2 + y^2\le 4$, the outer circle is traversed anticlockwise and the inner circle **clockwise** — walking clockwise round the hole keeps the annulus on your left.

::: theorem Green's theorem {#thm-green}
Let $D$ be a bounded region in the plane whose boundary $\partial D$ consists of finitely many piecewise smooth simple closed curves, positively oriented. If $P$ and $Q$ have continuous partial derivatives on an open set containing $D$ and $\partial D$, then

$$
\oint_{\partial D} P\,dx + Q\,dy = \iint_D\left(\pdv{Q}{x} - \pdv{P}{y}\right)dA .
$$ {#eq-green}
:::

In vector notation, with $\mathbf{F} = (P, Q)$, the left side is $\oint_{\partial D}\mathbf{F}\cdot d\mathbf{r} = \oint_{\partial D}\mathbf{F}\cdot\mathbf{T}\,ds$, the circulation of $\mathbf{F}$ around the boundary.

::: quiz
Which orientation of the boundary of the annulus $1 \le x^2 + y^2 \le 4$ is positive?
- [ ] Both circles anticlockwise
- [ ] Both circles clockwise
- [x] The outer circle anticlockwise and the inner circle clockwise
- [ ] The outer circle clockwise and the inner circle anticlockwise
::: solution
The region must stay on your left. On the outer circle this means going anticlockwise. On the inner circle the annulus lies *outside* the circle, so you must go clockwise to keep it on your left. [[#ex-annulus]] checks that this is the orientation that makes Green's theorem true.
:::
:::

## The proof

We prove the theorem in full for the regions that occur most often, and then explain how it extends. Recall from [[multivariable/multiple-integrals]] that $D$ is of **type I** if

$$
D = \set{(x, y) : a\le x\le b,\; g_1(x)\le y\le g_2(x)}
$$

for continuous functions $g_1\le g_2$, and of **type II** if $D = \set{(x,y) : c\le y\le d,\; h_1(y)\le x\le h_2(y)}$. We assume the bounding functions are piecewise $C^1$, so that $\partial D$ is piecewise smooth. Discs, rectangles and triangles are of both types.

::: proof
Green's formula [[#eq-green]] is the sum of two separate identities,

$$
\oint_{\partial D} P\,dx = -\iint_D\pdv{P}{y}\,dA \qquad\text{and}\qquad \oint_{\partial D}Q\,dy = \iint_D\pdv{Q}{x}\,dA,
$$ {#eq-green-halves}

and we prove the first for regions of type I and the second for regions of type II. So the theorem holds for every region of both types.

*The $P$ identity for a type I region.* The positively oriented boundary consists of four pieces: the lower graph $C_1$, traversed from left to right as $\mathbf{r}(x) = (x, g_1(x))$, $a\le x\le b$; the vertical segment $C_2$ on the line $x = b$, going up; the upper graph $C_3$, traversed from right to left; and the vertical segment $C_4$ on $x = a$, going down. (Either vertical segment may shrink to a point.) On $C_2$ and $C_4$, $x$ is constant, so $dx = 0$ and they contribute nothing to $\oint P\,dx$. On $C_1$, $dx$ is just the parameter increment, and $C_3$ is the reverse of the graph $(x, g_2(x))$, so by [[multivariable/line-integrals#thm-orientation]]

$$
\oint_{\partial D}P\,dx = \int_a^b P(x, g_1(x))\,dx - \int_a^b P(x, g_2(x))\,dx = -\int_a^b\Bigl[P(x, g_2(x)) - P(x, g_1(x))\Bigr]dx .
$$

On the other hand, by Fubini's theorem ([[multivariable/multiple-integrals#thm-fubini]]) and the fundamental theorem of calculus in $y$ (valid because $P_y$ is continuous),

$$
\iint_D\pdv{P}{y}\,dA = \int_a^b\int_{g_1(x)}^{g_2(x)}\pdv{P}{y}(x, y)\,dy\,dx = \int_a^b\Bigl[P(x, g_2(x)) - P(x, g_1(x))\Bigr]dx .
$$

Comparing the two displays proves the first identity in [[#eq-green-halves]].

*The $Q$ identity for a type II region.* Now the boundary consists of the right graph $x = h_2(y)$, traversed upwards ($y$ from $c$ to $d$), the left graph $x = h_1(y)$, traversed downwards, and two horizontal segments on which $dy = 0$. Hence

$$
\oint_{\partial D}Q\,dy = \int_c^d Q(h_2(y), y)\,dy - \int_c^d Q(h_1(y), y)\,dy = \int_c^d\int_{h_1(y)}^{h_2(y)}\pdv{Q}{x}\,dx\,dy = \iint_D\pdv{Q}{x}\,dA .
$$

Adding the two identities proves Green's theorem for regions of both types.
:::

**Extending the theorem.** Suppose $D$ is cut by a segment into two pieces $D_1$ and $D_2$, each of which satisfies Green's theorem. Adding the theorem for $D_1$ and for $D_2$, the double integrals add up to the integral over $D$. On the boundary side, the cut appears twice — once in $\partial D_1$ and once in $\partial D_2$ — traversed in *opposite* directions (each piece must stay on the left), so by [[multivariable/line-integrals#thm-orientation]] the two contributions cancel, and what remains is exactly the circulation around $\partial D$. By induction, Green's theorem holds for every region that can be cut into finitely many regions of both types. (In fact the $P$ identity only needs a decomposition into type I pieces and the $Q$ identity one into type II pieces, and the two decompositions may differ.) This covers all polygons and every region with holes that you are likely to meet: the annulus, for example, is cut into four quarter-annuli by the coordinate axes. The theorem holds in the generality stated, for any region bounded by finitely many piecewise smooth simple closed curves, but the general proof requires approximation arguments; see Apostol, *Mathematical Analysis* (1957 edition), ch. 10.

::: warning The field must be smooth on the whole region
Green's theorem needs $P$ and $Q$ to be $C^1$ at *every* point of $D$, not just on the boundary. The vortex field $\mathbf{F} = \left(\frac{-y}{x^2+y^2}, \frac{x}{x^2+y^2}\right)$ of [[multivariable/line-integrals#ex-vortex]] has $Q_x - P_y = 0$ wherever it is defined, yet its circulation around the unit circle is $2\pi$, not $0$. There is no contradiction: the field is undefined at the origin, which lies inside the disc, so the theorem does not apply to the disc. It does apply to regions that avoid the origin, with striking consequences ([[#ex-vortex-again]]).
:::

## Using Green's theorem

Green's theorem can be used in either direction: a line integral that is hard to compute may become an easy double integral, and vice versa.

::: example A line integral that cannot be done directly {#ex-impossible}
Evaluate $\displaystyle\oint_C\bigl(e^{x^2} - y^3\bigr)\,dx + \bigl(x^3 + \ln(1 + y^2)\bigr)\,dy$, where $C$ is the circle $x^2 + y^2 = 4$ traversed anticlockwise.
::: solution
Parametrising the circle leads to integrals such as $\int e^{4\cos^2t}\sin t\,\dots\,dt$, which have no elementary antiderivative. But $P = e^{x^2} - y^3$ and $Q = x^3 + \ln(1+y^2)$ are $C^1$ on the whole plane, and

$$
\pdv{Q}{x} - \pdv{P}{y} = 3x^2 - (-3y^2) = 3(x^2 + y^2).
$$

The awkward terms $e^{x^2}$ (a function of $x$ alone, differentiated in $y$) and $\ln(1+y^2)$ (a function of $y$ alone, differentiated in $x$) have disappeared. By Green's theorem, in polar coordinates ([[multivariable/multiple-integrals#eq-polar]]),

$$
\oint_C P\,dx + Q\,dy = \iint_{x^2+y^2\le4}3(x^2+y^2)\,dA = \int_0^{2\pi}\int_0^2 3r^2\cdot r\,dr\,d\theta = 2\pi\cdot\frac{3\cdot 2^4}{4} = 24\pi .
$$
:::
:::

::: example A region with a hole {#ex-annulus}
Verify Green's theorem for $\mathbf{F} = (-y^3, x^3)$ on the annulus $D\colon 1\le x^2+y^2\le4$.
::: solution
*Double integral.* $Q_x - P_y = 3x^2 + 3y^2$, so

$$
\iint_D 3(x^2 + y^2)\,dA = \int_0^{2\pi}\int_1^2 3r^3\,dr\,d\theta = 2\pi\cdot\frac34\bigl(2^4 - 1^4\bigr) = \frac{45\pi}{2}.
$$

*Line integral.* On a circle of radius $\rho$ traversed anticlockwise, $\mathbf{r}(t) = (\rho\cos t, \rho\sin t)$, the integrand is $(-\rho^3\sin^3t)(-\rho\sin t) + (\rho^3\cos^3t)(\rho\cos t) = \rho^4(\sin^4t + \cos^4t)$, and $\int_0^{2\pi}(\sin^4t + \cos^4t)\,dt = \tfrac{3\pi}{4} + \tfrac{3\pi}{4} = \tfrac{3\pi}{2}$. So the anticlockwise circulation is $\tfrac{3\pi}{2}\rho^4$. The positively oriented boundary is the outer circle ($\rho = 2$) anticlockwise and the inner circle ($\rho = 1$) clockwise:

$$
\oint_{\partial D}\mathbf{F}\cdot d\mathbf{r} = \frac{3\pi}{2}\cdot16 - \frac{3\pi}{2}\cdot 1 = 24\pi - \frac{3\pi}{2} = \frac{45\pi}{2}.
$$

The two sides agree. With both circles anticlockwise we would have obtained $24\pi + \tfrac{3\pi}{2}$, which is wrong — the orientation of the hole matters.
:::
:::

## Area from the boundary

If we choose $P$ and $Q$ with $Q_x - P_y = 1$, the right-hand side of Green's theorem becomes $\iint_D 1\,dA$, the area of $D$. Three convenient choices are $(P, Q) = (0, x)$, $(-y, 0)$ and $(-\tfrac12y, \tfrac12x)$.

::: corollary Area as a line integral {#cor-area}
If $D$ satisfies the hypotheses of Green's theorem, its area is

$$
A(D) = \oint_{\partial D}x\,dy = -\oint_{\partial D}y\,dx = \frac12\oint_{\partial D}\bigl(x\,dy - y\,dx\bigr).
$$ {#eq-green-area}
:::

::: proof
Apply [[#thm-green]] to each of the three fields: in each case $Q_x - P_y = 1$, so the circulation equals $\iint_D 1\,dA = A(D)$.
:::

For the ellipse $\mathbf{r}(t) = (a\cos t, b\sin t)$ the symmetric form gives $x\,dy - y\,dx = (ab\cos^2t + ab\sin^2t)\,dt = ab\,dt$, so $A = \tfrac12\int_0^{2\pi}ab\,dt = \pi ab$, with no square roots in sight. The integrand $\tfrac12(x\,dy - y\,dx)$ has a pleasant meaning: it is the area of the thin triangle swept out by the position vector as it moves from $\mathbf{r}$ to $\mathbf{r} + d\mathbf{r}$ (half the cross product $\mathbf{r}\times d\mathbf{r}$, compare [[multivariable/vectors-geometry#thm-cross-length]]). So [[#eq-green-area]] adds up the area swept by a radius as it goes once round the curve, which is how Kepler's second law measures area.

::: widget parametric
fx: cos(t)^3
fy: sin(t)^3
t: 0, 2pi
trace: true
equal: true
caption: The astroid $\mathbf{r}(t) = (\cos^3t, \sin^3t)$. Move the point round the curve: the radius sweeps area at the rate $\tfrac12(xy' - yx') = \tfrac32\sin^2t\cos^2t$, which is zero at the four cusps, where the point momentarily stops. Integrating over a full turn gives the enclosed area $\tfrac{3\pi}{8}$, about $37.5\%$ of the unit disc.
:::

For the astroid, $x\,dy - y\,dx = \bigl(\cos^3t\cdot3\sin^2t\cos t + \sin^3t\cdot3\cos^2t\sin t\bigr)\,dt = 3\sin^2t\cos^2t\,dt$, so $A = \tfrac32\int_0^{2\pi}\sin^2t\cos^2t\,dt = \tfrac32\cdot\tfrac{\pi}{4} = \tfrac{3\pi}{8}$.

::: example The shoelace formula {#ex-shoelace}
Show that the area of a polygon with vertices $(x_1, y_1), \dots, (x_n, y_n)$, listed anticlockwise, is

$$
A = \frac12\sum_{i=1}^{n}\bigl(x_iy_{i+1} - x_{i+1}y_i\bigr), \qquad (x_{n+1}, y_{n+1}) = (x_1, y_1),
$$

and find the area of the pentagon with vertices $(0,0)$, $(4,0)$, $(4,3)$, $(1,5)$, $(0,2)$.
::: solution
The boundary is made of the edges from $(x_i, y_i)$ to $(x_{i+1}, y_{i+1})$. Parametrise one edge by $\mathbf{r}(t) = (x_i + t\Delta x, y_i + t\Delta y)$, $0\le t\le1$, with $\Delta x = x_{i+1} - x_i$ and $\Delta y = y_{i+1} - y_i$. Then

$$
\int_{\text{edge}}x\,dy - y\,dx = \int_0^1\Bigl[(x_i + t\Delta x)\Delta y - (y_i + t\Delta y)\Delta x\Bigr]dt = x_i\Delta y - y_i\Delta x = x_iy_{i+1} - x_{i+1}y_i ,
$$

because the terms in $t$ cancel. Summing over the edges and halving gives the formula by [[#eq-green-area]]. For the pentagon the terms $x_iy_{i+1} - x_{i+1}y_i$ are

$$
0\cdot0 - 4\cdot0 = 0,\quad 4\cdot3 - 4\cdot0 = 12,\quad 4\cdot5 - 1\cdot3 = 17,\quad 1\cdot2 - 0\cdot5 = 2,\quad 0\cdot0 - 0\cdot2 = 0,
$$

so $A = \tfrac12(0 + 12 + 17 + 2 + 0) = \tfrac{31}{2}$. The name comes from the criss-cross pattern of the products when the coordinates are written in two columns. Surveyors and computer graphics programs use exactly this formula.
:::
:::

::: application How a planimeter works
In a linear planimeter, one end of an arm of length $\ell$ (the elbow) slides along a fixed straight track, taken to be the $x$-axis, while the other end (the tracer) is guided round the curve. A measuring wheel at the tracer, with its axle along the arm, rolls only with the component of the tracer's motion perpendicular to the arm. If the tracer is at $(x, y)$ the arm points along $\bigl(\sqrt{\ell^2 - y^2}, y\bigr)/\ell$, and a unit vector perpendicular to it is $\bigl(-y, \sqrt{\ell^2 - y^2}\bigr)/\ell$. So the total rolling distance is

$$
\frac1\ell\oint_C\Bigl(-y\,dx + \sqrt{\ell^2 - y^2}\,dy\Bigr) = \frac1\ell\iint_D\bigl(0 - (-1)\bigr)\,dA = \frac{A}{\ell},
$$

by Green's theorem, since $\sqrt{\ell^2-y^2}$ does not depend on $x$. The wheel reading is proportional to the area. (Moving the wheel elsewhere on the arm adds a term proportional to the total rotation of the arm, which is zero after a closed circuit.) The polar planimeter, invented by Jakob Amsler in 1854 and used for a century by engineers, surveyors and doctors, works on the same principle with the elbow moving on a circle.
:::

## Circulation and flux

Green's theorem has a second form, obtained by applying it to a rotated field. On the boundary, $\mathbf{F}\cdot\mathbf{T}$ measures how much the field flows *along* the curve; the component $\mathbf{F}\cdot\mathbf{n}$ along the outward normal measures how much it flows *across* the curve, out of $D$. The integral $\oint_{\partial D}\mathbf{F}\cdot\mathbf{n}\,ds$ is the **flux** of $\mathbf{F}$ out of $D$: if $\mathbf{F}$ is the velocity field of a thin sheet of fluid, it is the rate (area per unit time) at which fluid leaves $D$.

::: definition Scalar curl and divergence {#def-curl-div}
For a $C^1$ field $\mathbf{F} = (P, Q)$ in the plane, the **scalar curl** and the **divergence** of $\mathbf{F}$ are

$$
\curl\mathbf{F} = \pdv{Q}{x} - \pdv{P}{y}, \qquad \divg\mathbf{F} = \nabla\cdot\mathbf{F} = \pdv{P}{x} + \pdv{Q}{y}.
$$
:::

In this notation, Green's theorem reads $\oint_{\partial D}\mathbf{F}\cdot\mathbf{T}\,ds = \iint_D\curl\mathbf{F}\,dA$: circulation around the boundary equals the integral of the curl. The flux version follows.

::: theorem Green's theorem, flux form {#thm-green-flux}
Under the hypotheses of [[#thm-green]], with $\mathbf{n}$ the outward unit normal on $\partial D$,

$$
\oint_{\partial D}\mathbf{F}\cdot\mathbf{n}\,ds = \iint_D\divg\mathbf{F}\,dA = \iint_D\left(\pdv{P}{x} + \pdv{Q}{y}\right)dA .
$$
:::

::: proof
By [[#def-positive-orientation]] the outward normal is $\mathbf{n} = (T_2, -T_1)$, and along a curve $T_1\,ds = dx$ and $T_2\,ds = dy$. Hence

$$
\mathbf{F}\cdot\mathbf{n}\,ds = (PT_2 - QT_1)\,ds = -Q\,dx + P\,dy .
$$

Apply Green's theorem to the field $(-Q, P)$, which is $C^1$ wherever $\mathbf{F}$ is:

$$
\oint_{\partial D}(-Q)\,dx + P\,dy = \iint_D\left(\pdv{P}{x} - \pdv{(-Q)}{y}\right)dA = \iint_D\left(\pdv{P}{x} + \pdv{Q}{y}\right)dA .
$$
:::

The two forms of the theorem attach a local meaning to the curl and the divergence: the curl measures **circulation per unit area** and the divergence **flux per unit area**.

::: theorem Curl and divergence as densities {#thm-densities}
Let $\mathbf{F}$ be $C^1$ near $\mathbf{a}$, let $D_\rho$ be the disc of radius $\rho$ centred at $\mathbf{a}$ and $C_\rho$ its positively oriented boundary. Then

$$
\curl\mathbf{F}(\mathbf{a}) = \lim_{\rho\to0}\frac{1}{\pi\rho^2}\oint_{C_\rho}\mathbf{F}\cdot\mathbf{T}\,ds, \qquad \divg\mathbf{F}(\mathbf{a}) = \lim_{\rho\to0}\frac{1}{\pi\rho^2}\oint_{C_\rho}\mathbf{F}\cdot\mathbf{n}\,ds .
$$
:::

::: proof
By Green's theorem, $\dfrac{1}{\pi\rho^2}\oint_{C_\rho}\mathbf{F}\cdot\mathbf{T}\,ds = \dfrac{1}{\pi\rho^2}\iint_{D_\rho}\curl\mathbf{F}\,dA$, the average value of $\curl\mathbf{F}$ over the disc. Since $\iint_{D_\rho}\curl\mathbf{F}(\mathbf{a})\,dA = \pi\rho^2\curl\mathbf{F}(\mathbf{a})$,

$$
\left|\frac{1}{\pi\rho^2}\iint_{D_\rho}\curl\mathbf{F}\,dA - \curl\mathbf{F}(\mathbf{a})\right| \le \frac{1}{\pi\rho^2}\iint_{D_\rho}\bigl|\curl\mathbf{F}(\mathbf{x}) - \curl\mathbf{F}(\mathbf{a})\bigr|\,dA \le \max_{\mathbf{x}\in D_\rho}\bigl|\curl\mathbf{F}(\mathbf{x}) - \curl\mathbf{F}(\mathbf{a})\bigr|,
$$

which tends to $0$ as $\rho\to0$ because $\curl\mathbf{F}$ is continuous. The divergence statement follows in the same way from [[#thm-green-flux]].
:::

These limits do not mention coordinates at all, so curl and divergence are geometric quantities: they do not change if we rotate the axes. Positive divergence at a point means fluid is being created there — a **source** — and negative divergence a **sink**. Positive curl means a net anticlockwise swirl.

::: intuition The paddle-wheel test
Drop a tiny paddle wheel, free to spin about a vertical axle, into a flowing sheet of fluid. It spins anticlockwise where $\curl\mathbf{F} > 0$ and clockwise where $\curl\mathbf{F} < 0$; in fact its angular velocity is $\tfrac12\curl\mathbf{F}$. Curl is about *local* spin, which is not the same as flowing in circles. In the **shear flow** $\mathbf{F} = (y, 0)$ the fluid moves in straight lines, faster higher up, yet $\curl\mathbf{F} = 0 - 1 = -1$: the faster water above the wheel pushes its top forwards, and the wheel turns clockwise. Conversely, in the vortex of [[multivariable/line-integrals#ex-vortex]] the fluid circles the origin, yet away from the origin the curl is $0$: the wheel is carried round without spinning, because two effects cancel exactly — the curving of the flow turns it anticlockwise, while the faster inner water turns it clockwise.
:::

::: widget vectorfield
P: y
Q: 0
cx: a + r*cos(t)
cy: b + r*sin(t)
t: 0, 2pi
x: -3, 3
y: -3, 3
shade: curl
sliders: a=0:-2:2:0.1; b=0:-2:2:0.1; r=1:0.2:1.5:0.1
caption: The shear flow $\mathbf{F} = (y, 0)$ has curl $-1$ everywhere (uniform shading). Move the circle anywhere with $a$ and $b$: its circulation is always $-\pi r^2$, minus its area, exactly as Green's theorem predicts. The flow lines are straight, but every small loop has a clockwise circulation.
:::

::: example Flux out of a disc {#ex-flux}
Find the flux of $\mathbf{F} = (x^3, y^3)$ out of the unit disc, directly and by [[#thm-green-flux]].
::: solution
*Directly.* On the unit circle $\mathbf{r}(t) = (\cos t, \sin t)$ the outward unit normal is $\mathbf{n} = (\cos t, \sin t)$ and $ds = dt$, so $\mathbf{F}\cdot\mathbf{n} = \cos^4t + \sin^4t$ and the flux is $\int_0^{2\pi}(\cos^4t + \sin^4t)\,dt = \tfrac{3\pi}{2}$.

*By the divergence form.* $\divg\mathbf{F} = 3x^2 + 3y^2$, so the flux is $\iint 3r^2\cdot r\,dr\,d\theta = 2\pi\cdot\tfrac34 = \tfrac{3\pi}{2}$.

Both give $\tfrac{3\pi}{2}$. The divergence is zero at the origin and grows outwards, so most of the outflow is produced near the rim.
:::
:::

::: widget vectorfield
P: x^2
Q: y^2
cx: a + r*cos(t)
cy: b + r*sin(t)
t: 0, 2pi
x: -3, 3
y: -3, 3
shade: divergence
mode: flux
sliders: a=1:-2:2:0.1; b=0.5:-2:2:0.1; r=0.8:0.2:1.5:0.1
caption: The field $\mathbf{F} = (x^2, y^2)$ has divergence $2x + 2y$: sources above the line $x + y = 0$, sinks below it. Slide the circle across that line and watch the flux change sign; by [[#thm-green-flux]] it equals $2(a + b)\pi r^2$, the integral of the divergence over the disc.
:::

::: quiz
A $C^1$ field on the whole plane has $\divg\mathbf{F} = 0$ everywhere. What is the flux of $\mathbf{F}$ out of any region $D$ to which Green's theorem applies?
- [x] $0$
- [ ] The area of $D$
- [ ] It depends on the circulation around $\partial D$
- [ ] It cannot be determined without knowing $\mathbf{F}$
::: solution
By [[#thm-green-flux]], the flux is $\iint_D\divg\mathbf{F}\,dA = 0$. Such fields describe incompressible flows: whatever enters a region must leave it. The circulation is a different quantity, controlled by the curl.
:::
:::

::: warning Getting the normal right
The flux integrand is $\mathbf{F}\cdot\mathbf{n}\,ds = P\,dy - Q\,dx$, with the **outward** normal $\mathbf{n} = (T_2, -T_1)$ for a positively oriented boundary. Writing $Q\,dx - P\,dy$ (the inward normal), or using a clockwise parametrisation without correcting the sign, gives the flux with the wrong sign. When in doubt, test on the radial field $(x, y)$, whose flux out of the unit disc must be positive: $\divg = 2$, flux $= 2\pi$.
:::

## The vortex revisited

Green's theorem explains the puzzling behaviour of the vortex field from [[multivariable/line-integrals]].

::: example Every loop around the origin {#ex-vortex-again}
Let $\mathbf{F} = \left(\frac{-y}{x^2+y^2}, \frac{x}{x^2+y^2}\right)$. Show that $\oint_C\mathbf{F}\cdot d\mathbf{r} = 2\pi$ for every positively oriented piecewise smooth simple closed curve $C$ whose interior contains the origin, and $0$ for every such curve whose interior does not contain the origin (and which does not pass through it).
::: solution
On $\R^2\setminus\set{\mathbf{0}}$ the field is $C^1$ with $\curl\mathbf{F} = Q_x - P_y = 0$ ([[multivariable/line-integrals#ex-vortex]]).

*Origin outside $C$.* Then $\mathbf{F}$ is $C^1$ on the interior $D$ of $C$ and on $C$, and Green's theorem gives $\oint_C\mathbf{F}\cdot d\mathbf{r} = \iint_D 0\,dA = 0$.

*Origin inside $C$.* We cannot use the interior of $C$, which contains the singularity. Instead choose $\eps > 0$ so small that the circle $C_\eps$ of radius $\eps$ about the origin lies inside $C$, and let $D$ be the region between $C$ and $C_\eps$. Its positively oriented boundary is $C$ (anticlockwise) together with $C_\eps$ traversed clockwise. The field is $C^1$ on $D$, so

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} - \oint_{C_\eps}\mathbf{F}\cdot d\mathbf{r} = \iint_D 0\,dA = 0,
$$

where both integrals are now anticlockwise. Hence $\oint_C\mathbf{F}\cdot d\mathbf{r} = \oint_{C_\eps}\mathbf{F}\cdot d\mathbf{r} = 2\pi$, the value computed for a circle (the same computation works for any radius).

The answer is the same for a square, an ellipse or a wiggly loop: all that matters is whether the curve goes round the origin. (A closed curve that winds round the origin $k$ times, counted with sign, gives $2\pi k$, which leads to the **winding number** of [[complex-analysis/contour-integrals]].)
:::
:::

::: definition Simply connected region {#def-simply-connected}
A connected open set $D\subseteq\R^2$ is **simply connected** if the interior of every simple closed curve in $D$ is contained in $D$.
:::

Informally, $D$ has no holes: a loop in $D$ can never surround a point that is missing from $D$. Discs, half-planes, the whole plane, and the plane with a ray removed are simply connected; the punctured plane and the annulus are not. (In topology, simple connectivity is defined by asking that every loop can be shrunk to a point within $D$; for open sets in the plane the two definitions agree. See [[topology/fundamental-group]].)

::: theorem Curl-free fields on simply connected regions are conservative {#thm-simply-connected}
Let $D\subseteq\R^2$ be a simply connected open set and let $\mathbf{F} = (P, Q)$ be $C^1$ on $D$ with $\pdv{Q}{x} = \pdv{P}{y}$ throughout $D$. Then $\mathbf{F}$ is conservative on $D$.
:::

::: proof
Fix $\mathbf{a}\in D$. Since $D$ is a connected open set, every point $\mathbf{x}\in D$ can be joined to $\mathbf{a}$ by a **staircase path**: a polygonal path in $D$ whose segments are horizontal or vertical. We first show that the circulation of $\mathbf{F}$ around every closed staircase path $\Gamma$ in $D$ is zero.

If $\Gamma$ is a simple closed curve, its interior $R$ lies in $D$ because $D$ is simply connected. The region $R$ is a polygon with horizontal and vertical sides, which can be cut by vertical and horizontal lines into finitely many rectangles, so Green's theorem applies to it, and

$$
\oint_\Gamma\mathbf{F}\cdot d\mathbf{r} = \pm\iint_R\left(\pdv{Q}{x} - \pdv{P}{y}\right)dA = 0,
$$

the sign depending on the orientation of $\Gamma$. *(Sketch.)* A closed staircase path that crosses or retraces itself can be split at its finitely many self-intersection points into finitely many simple closed staircase loops, together with segments traversed once in each direction, whose contributions cancel; each loop has zero circulation, so $\Gamma$ does too.

Now define $f(\mathbf{x}) = \int_{\Gamma_\mathbf{x}}\mathbf{F}\cdot d\mathbf{r}$, where $\Gamma_\mathbf{x}$ is any staircase path in $D$ from $\mathbf{a}$ to $\mathbf{x}$. Two such paths $\Gamma_\mathbf{x}, \Gamma'_\mathbf{x}$ give the same value, since $\Gamma_\mathbf{x}$ followed by $-\Gamma'_\mathbf{x}$ is a closed staircase path. The argument in the proof of [[multivariable/line-integrals#thm-path-independence]], which extends the path by a short horizontal or vertical segment, now shows that $f_x = P$ and $f_y = Q$. So $\mathbf{F} = \nabla f$ is conservative.
:::

This theorem and the vortex together give a complete picture. On a simply connected region, the local test $Q_x = P_y$ is equivalent to being conservative. On a region with a hole, a curl-free field can still circulate around the hole, and the amount of circulation is the same for every loop around it — exactly the behaviour of the vortex.

::: quiz
Which of these open sets is simply connected?
- [ ] The punctured disc $0 < x^2 + y^2 < 1$
- [ ] The annulus $1 < x^2 + y^2 < 4$
- [x] The plane with the closed half-line $\set{(x, 0) : x\le0}$ removed
- [ ] The plane with the two points $(\pm1, 0)$ removed
::: solution
In the first, second and fourth sets there is a circle whose interior contains a missing point. The slit plane in the third option is star-shaped with respect to $(1, 0)$: the segment from $(1,0)$ to any point of the set avoids the removed half-line. Every simple closed curve in it has its interior inside it, because a curve surrounding a point of the removed half-line would have to cross the half-line to get round it. This is why the polar angle $\theta\in(-\pi,\pi)$ is a genuine potential for the vortex on the slit plane.
:::
:::

::: application Cauchy's theorem in complex analysis
Write a complex function as $f(z) = u(x,y) + i\,v(x,y)$ with $z = x + iy$ and $dz = dx + i\,dy$. Then

$$
\oint_C f(z)\,dz = \oint_C(u\,dx - v\,dy) + i\oint_C(v\,dx + u\,dy).
$$

If $f$ is complex-differentiable with continuous derivative inside and on $C$, Green's theorem turns the two real integrals into $\iint(-v_x - u_y)\,dA$ and $\iint(u_x - v_y)\,dA$, and both vanish because of the Cauchy–Riemann equations $u_x = v_y$, $u_y = -v_x$. This is Cauchy's theorem, $\oint_C f(z)\,dz = 0$, the cornerstone of [[complex-analysis/cauchy-theorem]] (where it is proved without assuming the derivative continuous). For $f(z) = 1/z$, which is not differentiable at $0$, the imaginary part of $\oint_C dz/z$ is precisely the vortex circulation $2\pi$.
:::

::: history
George Green (1793–1841) was a miller's son from Nottingham with little formal schooling. In 1828 he published, by subscription, *An Essay on the Application of Mathematical Analysis to the Theories of Electricity and Magnetism*, which introduced the term "potential function" and identities between volume and surface integrals that we now call Green's identities. The essay went almost unnoticed; Green entered Cambridge as an undergraduate at the age of forty and died in 1841. In 1845 the young William Thomson (later Lord Kelvin) came across a copy, recognised its importance and had it reprinted in Crelle's journal. The planar theorem that now bears Green's name does not appear in this form in the *Essay*: it was stated by Augustin-Louis Cauchy in 1846 in connection with complex integration, and proved by Bernhard Riemann in his doctoral dissertation of 1851.
:::

## Where this leads

Green's theorem is the two-dimensional member of a family. In space, the circulation form becomes **Stokes' theorem**, $\oint_{\partial S}\mathbf{F}\cdot d\mathbf{r} = \iint_S(\nabla\times\mathbf{F})\cdot d\mathbf{S}$ for a surface $S$, and the flux form becomes the **divergence theorem**, $\iint_{\partial E}\mathbf{F}\cdot d\mathbf{S} = \iiint_E\nabla\cdot\mathbf{F}\,dV$ for a solid $E$; both are proved in [[multivariable/stokes-divergence]] after flux through surfaces is defined in [[multivariable/surface-integrals]]. Applied to $\mathbf{F} = \nabla u$, the flux form gives $\oint_{\partial D}\frac{\partial u}{\partial n}\,ds = \iint_D\Delta u\,dA$ ([[#exr-harmonic]]), the starting point for the study of harmonic functions in [[pde/laplace-equation]]. Cauchy's theorem ([[complex-analysis/cauchy-theorem]]) is Green's theorem combined with the Cauchy–Riemann equations, and the vortex's $2\pi$ becomes the residue theorem. In differential geometry, Green's theorem is the key step in the proof of the Gauss–Bonnet theorem ([[differential-geometry/geodesics-gauss-bonnet]]).

::: summary
- For a region $D$ with positively oriented boundary (region on the left: outer boundary anticlockwise, holes clockwise) and $C^1$ $P, Q$: $\oint_{\partial D}P\,dx + Q\,dy = \iint_D(Q_x - P_y)\,dA$ ([[#thm-green]]).
- The proof splits the theorem into $\oint P\,dx = -\iint P_y\,dA$ (type I regions) and $\oint Q\,dy = \iint Q_x\,dA$ (type II regions); cutting along interior edges extends it, because the cuts are traversed twice in opposite directions.
- Area: $A = \oint x\,dy = -\oint y\,dx = \tfrac12\oint(x\,dy - y\,dx)$; for polygons this is the shoelace formula, and it is how planimeters work ([[#cor-area]]).
- Flux form: $\oint_{\partial D}\mathbf{F}\cdot\mathbf{n}\,ds = \iint_D\divg\mathbf{F}\,dA$ with the outward normal ([[#thm-green-flux]]).
- The scalar curl $Q_x - P_y$ is circulation per unit area and the divergence $P_x + Q_y$ is flux per unit area ([[#thm-densities]]).
- Green's theorem needs the field to be $C^1$ on the whole region: the vortex has curl $0$ but circulation $2\pi$ around every loop enclosing the origin ([[#ex-vortex-again]]).
- On a simply connected region, $Q_x = P_y$ implies that $\mathbf{F}$ is conservative ([[#thm-simply-connected]]).
:::

## Exercises

::: exercise Around a square {level=1 check="1/2"}
Use Green's theorem to evaluate $\oint_C xy\,dx + x^2\,dy$, where $C$ is the boundary of the square $[0,1]\times[0,1]$, traversed anticlockwise.
::: solution
$Q_x - P_y = 2x - x = x$, so the integral is $\int_0^1\int_0^1 x\,dx\,dy = \tfrac12$.
:::
:::

::: exercise Area of an ellipse {level=1 check="6*pi"}
Use [[#eq-green-area]] to find the area enclosed by the ellipse $\dfrac{x^2}{9} + \dfrac{y^2}{4} = 1$.
::: solution
With $\mathbf{r}(t) = (3\cos t, 2\sin t)$, $x\,dy - y\,dx = (6\cos^2t + 6\sin^2t)\,dt = 6\,dt$, so $A = \tfrac12\int_0^{2\pi}6\,dt = 6\pi$.
:::
:::

::: exercise A circulation {level=1 check="3*pi/2"}
Use Green's theorem to evaluate $\oint_C -y^3\,dx + x^3\,dy$ around the unit circle, anticlockwise.
::: solution
$Q_x - P_y = 3x^2 + 3y^2$, so the integral is $\int_0^{2\pi}\int_0^1 3r^2\cdot r\,dr\,d\theta = 2\pi\cdot\tfrac34 = \tfrac{3\pi}{2}$ (in agreement with [[#ex-annulus]] for $\rho = 1$).
:::
:::

::: exercise A pentagon {level=2 check="20"}
Find the area of the pentagon with vertices $(0,0)$, $(4,0)$, $(5,3)$, $(2,5)$, $(-1,2)$, in this order.
::: solution
The vertices are listed anticlockwise. The shoelace terms $x_iy_{i+1} - x_{i+1}y_i$ are $0$, $4\cdot3 - 5\cdot0 = 12$, $5\cdot5 - 2\cdot3 = 19$, $2\cdot2 - (-1)\cdot5 = 9$ and $(-1)\cdot0 - 0\cdot2 = 0$. So $A = \tfrac12(12 + 19 + 9) = 20$.
:::
:::

::: exercise Flux out of a disc {level=2 check="8*pi"}
Find the outward flux of $\mathbf{F} = (x + y^2,\; y - x^2)$ across the circle $x^2 + y^2 = 4$.
::: solution
$\divg\mathbf{F} = 1 + 1 = 2$, so by [[#thm-green-flux]] the flux is $2\times(\text{area}) = 2\cdot 4\pi = 8\pi$. (Directly: on the circle $\mathbf{F}\cdot\mathbf{n}\,ds = P\,dy - Q\,dx$, and the terms $y^2\,dy$ and $x^2\,dx$ integrate to zero round a closed curve, leaving $\oint x\,dy - y\,dx = 2\cdot 4\pi$.)
:::
:::

::: exercise A petal of a rose {level=2 check="pi/8"}
Show that for a curve given in polar coordinates, $x\,dy - y\,dx = r^2\,d\theta$, and deduce that the area enclosed by a closed polar curve is $\tfrac12\int r^2\,d\theta$. Use this to find the area of one petal of the rose $r = \sin 2\theta$, $0\le\theta\le\pi/2$.
::: solution
With $x = r\cos\theta$, $y = r\sin\theta$: $dx = \cos\theta\,dr - r\sin\theta\,d\theta$ and $dy = \sin\theta\,dr + r\cos\theta\,d\theta$, so

$$
x\,dy - y\,dx = r\cos\theta(\sin\theta\,dr + r\cos\theta\,d\theta) - r\sin\theta(\cos\theta\,dr - r\sin\theta\,d\theta) = r^2\,d\theta .
$$

By [[#eq-green-area]] the area is $\tfrac12\oint r^2\,d\theta$. The petal is traced anticlockwise as $\theta$ runs from $0$ to $\pi/2$, so its area is $\tfrac12\int_0^{\pi/2}\sin^22\theta\,d\theta = \tfrac12\cdot\tfrac{\pi}{4} = \tfrac{\pi}{8}$.
:::
:::

::: exercise The vortex around a triangle {level=2 check="2*pi"}
Compute $\oint_C\dfrac{-y\,dx + x\,dy}{x^2+y^2}$, where $C$ is the boundary of the triangle with vertices $(-1,-1)$, $(2,0)$, $(0,2)$, traversed anticlockwise.
::: solution
Check that the origin is inside the triangle: it lies on the same side of each edge as the opposite vertex (for example, the edge from $(2,0)$ to $(0,2)$ is $x + y = 2$, and both the origin and $(-1,-1)$ have $x + y < 2$; similarly for the other edges). By [[#ex-vortex-again]] the integral is $2\pi$.
:::
:::

::: exercise Centroids from the boundary {level=3}
Show that a region $D$ of area $A$ satisfying Green's theorem has centroid

$$
\bar x = \frac{1}{2A}\oint_{\partial D}x^2\,dy, \qquad \bar y = -\frac{1}{2A}\oint_{\partial D}y^2\,dx,
$$

and use the second formula to find the centroid of the half-disc $x^2 + y^2\le1$, $y\ge0$.
::: solution
The centroid is $\bar x = \frac1A\iint_D x\,dA$, $\bar y = \frac1A\iint_D y\,dA$. Green's theorem with $(P, Q) = (0, \tfrac12x^2)$ gives $\oint\tfrac12x^2\,dy = \iint x\,dA$, and with $(P,Q) = (-\tfrac12y^2, 0)$ gives $\oint-\tfrac12y^2\,dx = \iint y\,dA$. For the half-disc, $A = \pi/2$. On the diameter $y = 0$, so it contributes nothing; on the arc $(\cos t, \sin t)$, $0\le t\le\pi$,

$$
-\oint\frac{y^2}{2}\,dx = -\int_0^\pi\frac{\sin^2t}{2}(-\sin t)\,dt = \frac12\int_0^\pi\sin^3t\,dt = \frac12\cdot\frac43 = \frac23 .
$$

So $\bar y = \dfrac{2/3}{\pi/2} = \dfrac{4}{3\pi}\approx0.42$, and $\bar x = 0$ by symmetry.
:::
:::

::: exercise Harmonic functions {#exr-harmonic level=3}
Let $u$ be a $C^2$ function and $D$ a region satisfying Green's theorem. Writing $\dfrac{\partial u}{\partial n} = \nabla u\cdot\mathbf{n}$ for the outward normal derivative and $\Delta u = u_{xx} + u_{yy}$ for the Laplacian, prove that

$$
\oint_{\partial D}\frac{\partial u}{\partial n}\,ds = \iint_D\Delta u\,dA .
$$

Deduce that if $u$ is **harmonic** ($\Delta u = 0$) on the plane, then the net flux of $\nabla u$ across every such boundary is zero, and check this for $u = x^2 - y^2$ on the unit disc.
::: solution
Apply [[#thm-green-flux]] to the $C^1$ field $\mathbf{F} = \nabla u = (u_x, u_y)$: the left side is $\oint\nabla u\cdot\mathbf{n}\,ds = \oint\frac{\partial u}{\partial n}\,ds$ and $\divg\nabla u = u_{xx} + u_{yy} = \Delta u$. If $\Delta u = 0$ the right side vanishes. For $u = x^2 - y^2$: $\Delta u = 2 - 2 = 0$, and on the unit circle $\mathbf{n} = (\cos t, \sin t)$, $\nabla u = (2\cos t, -2\sin t)$, so $\frac{\partial u}{\partial n} = 2\cos^2t - 2\sin^2t = 2\cos2t$, whose integral over $[0,2\pi]$ is indeed $0$.
:::
:::

::: exercise Circulation around a hole {level=3}
Let $\mathbf{F} = (P, Q)$ be $C^1$ on $\R^2\setminus\set{\mathbf{0}}$ with $Q_x = P_y$ there. Prove that $\oint_C\mathbf{F}\cdot d\mathbf{r}$ has the same value for every positively oriented circle $C$ whose interior contains the origin, even if the circles are not concentric.
::: hint
Compare each circle with a tiny circle centred at the origin, as in [[#ex-vortex-again]].
:::
::: solution
Let $C$ be such a circle, and choose $\eps > 0$ so small that the circle $C_\eps$ of radius $\eps$ centred at the origin lies inside $C$ (possible because the origin is an interior point of the disc bounded by $C$). The region $D$ between $C$ and $C_\eps$ avoids the origin, so $\mathbf{F}$ is $C^1$ on it, and Green's theorem with the positive orientation ($C$ anticlockwise, $C_\eps$ clockwise) gives $\oint_C\mathbf{F}\cdot d\mathbf{r} - \oint_{C_\eps}\mathbf{F}\cdot d\mathbf{r} = \iint_D(Q_x - P_y)\,dA = 0$. Applying the same argument to two concentric circles $C_\eps$ and $C_{\eps'}$ shows that $\oint_{C_\eps}$ does not depend on $\eps$; call it $c$. Then every circle $C$ around the origin has circulation $c$. (For the vortex, $c = 2\pi$; for a conservative field, $c = 0$.)
:::
:::
