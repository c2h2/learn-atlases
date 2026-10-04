A satellite in orbit, a roller-coaster car, a charged particle spiralling in a magnetic field: in each case we want to know where the object is, how fast it is moving, which way it is heading, how far it has travelled and how sharply its path bends. Record the position at time $t$ as a vector $\mathbf{r}(t)$ in $\R^3$. As $t$ varies, the tip of $\mathbf{r}(t)$ traces out a curve, and the questions become questions about the function $t \mapsto \mathbf{r}(t)$.

Such a function is called a vector-valued function, and its calculus turns out to be ordinary one-variable calculus applied to each coordinate. The pay-off is geometric. The derivative is a tangent vector; integrating the speed gives the length of the curve; the rate at which the direction turns per unit length is the curvature; and splitting the acceleration into a part along the path and a part across it explains why you are pushed sideways on a bend, and why that push grows with the *square* of your speed. Plane parametric curves were met in [[calculus-2/parametric-polar]]; here we work in space and use the vector algebra of [[multivariable/vectors-geometry]] throughout.

## Vector-valued functions

::: definition Vector-valued function {#def-vector-function}
A **vector-valued function** (or **vector function**) on an interval $I \subseteq \R$ assigns to each $t \in I$ a vector $\mathbf{r}(t) \in \R^3$. Writing
$$
\mathbf{r}(t) = \bigl(x(t),\, y(t),\, z(t)\bigr) = x(t)\,\mathbf{i} + y(t)\,\mathbf{j} + z(t)\,\mathbf{k},
$$
the real functions $x, y, z$ are the **component functions** of $\mathbf{r}$. The set $C = \set{\mathbf{r}(t) : t \in I}$ of tips of the position vectors is the **curve traced by** $\mathbf{r}$, and $\mathbf{r}$ is called a **parametrisation** of $C$ with **parameter** $t$. Plane curves are the case $z(t) = 0$, or simply $\mathbf{r}(t) = (x(t), y(t))$.
:::

Three examples cover most of what follows.

- **Lines.** $\mathbf{r}(t) = \mathbf{r}_0 + t\mathbf{v}$ traces the line through $\mathbf{r}_0$ with direction $\mathbf{v} \neq \mathbf{0}$.
- **Circles.** $\mathbf{r}(t) = (a\cos t, a\sin t)$, $0 \le t \le 2\pi$, traces the circle of radius $a$ about the origin once, anticlockwise.
- **Helices.** $\mathbf{r}(t) = (a\cos t, a\sin t, bt)$ with $a > 0$ winds around the cylinder $x^2 + y^2 = a^2$, rising $2\pi b$ per turn, like the thread of a screw or a strand of DNA.

A curve has many parametrisations. The circle is also traced by $(a\cos 2t, a\sin 2t)$, twice as fast, and by $(a\cos t, -a\sin t)$, in the opposite direction. The parametrisation carries more information than the curve (speed, direction, starting point), and part of our work will be to sort out which quantities depend only on the curve.

::: example The curve where a cylinder meets a plane {#ex-intersection}
Find a vector function whose curve is the intersection of the cylinder $x^2 + y^2 = 1$ and the plane $y + z = 2$, and describe the curve.
::: solution
Points of the cylinder have $(x, y) = (\cos t, \sin t)$ for some $t \in [0, 2\pi)$. The plane then forces $z = 2 - y = 2 - \sin t$. Hence
$$
\mathbf{r}(t) = (\cos t,\ \sin t,\ 2 - \sin t), \qquad 0 \le t \le 2\pi .
$$
Every point of the intersection is of this form, and every such point lies on both surfaces. The curve is a closed loop: it lies in a tilted plane and projects onto the unit circle in the $xy$-plane, so it is an ellipse. It is highest, at $(0, -1, 3)$, when $t = 3\pi/2$, and lowest, at $(0, 1, 1)$, when $t = \pi/2$.
:::
:::

## Limits, derivatives and tangent vectors

Distances between vectors are measured by the norm, so limits are defined exactly as for real functions with $\abs{\cdot}$ replaced by $\norm{\cdot}$ (compare [[calculus-1/limits]]).

::: definition Limit and continuity {#def-vf-limit}
Let $\mathbf{r}$ be defined near $a$ (except possibly at $a$). We write $\lim_{t\to a}\mathbf{r}(t) = \mathbf{L}$ if for every $\eps > 0$ there is a $\delta > 0$ such that
$$
0 < \abs{t - a} < \delta \implies \norm{\mathbf{r}(t) - \mathbf{L}} < \eps .
$$
The function $\mathbf{r}$ is **continuous** at $a$ if $\lim_{t\to a}\mathbf{r}(t) = \mathbf{r}(a)$.
:::

::: theorem Limits are taken componentwise {#thm-componentwise}
Let $\mathbf{r} = (x, y, z)$ and $\mathbf{L} = (L_1, L_2, L_3)$. Then $\lim_{t\to a}\mathbf{r}(t) = \mathbf{L}$ if and only if $x(t)\to L_1$, $y(t) \to L_2$ and $z(t) \to L_3$ as $t \to a$.
:::

::: proof
For any vector $\mathbf{w} = (w_1, w_2, w_3)$ we have
$$
\abs{w_i} \le \norm{\mathbf{w}} \le \abs{w_1} + \abs{w_2} + \abs{w_3}\qquad (i = 1, 2, 3),
$$
the first because $w_i^2 \le w_1^2 + w_2^2 + w_3^2$, the second by squaring both sides. Apply this to $\mathbf{w} = \mathbf{r}(t) - \mathbf{L}$. If $\norm{\mathbf{r}(t) - \mathbf{L}} < \eps$ whenever $0<\abs{t-a}<\delta$, then also $\abs{x(t) - L_1} < \eps$ for those $t$, and similarly for $y$ and $z$. Conversely, given $\eps > 0$ choose $\delta_1, \delta_2, \delta_3$ so that each component is within $\eps/3$ of its limit when $0 < \abs{t - a} < \delta_i$; for $0 < \abs{t-a} < \min(\delta_1, \delta_2, \delta_3)$ the right-hand inequality gives $\norm{\mathbf{r}(t) - \mathbf{L}} < \eps$.
:::

::: definition Derivative of a vector function {#def-vector-derivative}
The **derivative** of $\mathbf{r}$ at $t$ is
$$
\mathbf{r}'(t) = \frac{d\mathbf{r}}{dt} = \lim_{h\to 0}\frac{\mathbf{r}(t+h) - \mathbf{r}(t)}{h},
$$
when the limit exists. By [[#thm-componentwise]], $\mathbf{r}'(t) = \bigl(x'(t), y'(t), z'(t)\bigr)$. If $\mathbf{r}'(t) \neq \mathbf{0}$ it is called a **tangent vector** to the curve at $\mathbf{r}(t)$, the line $\mathbf{r}(t) + u\,\mathbf{r}'(t)$ ($u \in \R$) is the **tangent line**, and
$$
\mathbf{T}(t) = \frac{\mathbf{r}'(t)}{\norm{\mathbf{r}'(t)}}
$$
is the **unit tangent vector**. A parametrisation is **smooth** (or **regular**) if $\mathbf{r}'$ is continuous and never equal to $\mathbf{0}$.
:::

::: intuition Secants become tangents
The vector $\mathbf{r}(t+h) - \mathbf{r}(t)$ joins two nearby points of the curve: it is a secant. Dividing by $h$ rescales it (and, when $h < 0$, reverses it, so that it always points in the direction of increasing $t$). As $h \to 0$ the secant direction turns into the tangent direction, and its length tends to the speed at which the curve is traced.
:::

::: example A helix {#ex-helix-tangent}
For the helix $\mathbf{r}(t) = (\cos t, \sin t, t)$ find $\mathbf{r}'(t)$, $\mathbf{T}(t)$, the tangent line at $t = \pi/2$, and the angle between the tangent and the $z$-axis.
::: solution
Differentiating each component, $\mathbf{r}'(t) = (-\sin t, \cos t, 1)$, so $\norm{\mathbf{r}'(t)} = \sqrt{\sin^2 t + \cos^2 t + 1} = \sqrt2$ and
$$
\mathbf{T}(t) = \tfrac{1}{\sqrt2}(-\sin t, \cos t, 1).
$$
At $t = \pi/2$ the point is $(0, 1, \pi/2)$ and $\mathbf{r}'(\pi/2) = (-1, 0, 1)$, so the tangent line is $(-u,\ 1,\ \pi/2 + u)$, $u \in \R$. The angle $\theta$ with the $z$-axis satisfies $\cos\theta = \mathbf{T}\cdot\mathbf{k} = 1/\sqrt2$, so $\theta = \pi/4$ at *every* point: the helix climbs at a constant angle, which is what makes it a useful screw thread.
:::
:::

::: warning Differentiable components do not guarantee a smooth-looking curve
The function $\mathbf{r}(t) = (t^3, \abs{t}^3)$ has continuous first and second derivatives, yet its curve is the graph of $y = \abs{x}$, which has a corner at the origin. There is no contradiction: $\mathbf{r}'(0) = (0, 0)$, so the moving point stops at the corner and can leave in a new direction. This is why "smooth parametrisation" requires $\mathbf{r}'(t) \neq \mathbf{0}$ as well as continuity of $\mathbf{r}'$.
:::

::: widget parametric
fx: t - sin(t)
fy: 1 - cos(t)
t: 0, 4pi
x: -0.5, 13
y: -0.5, 3
caption: A cycloid, traced by a point on the rim of a wheel of radius 1 rolling along the $x$-axis. Drag $t$ and watch the velocity vector $\mathbf{r}'(t) = (1-\cos t, \sin t)$. It is longest, with length $2$, at the top of each arch, where the rim moves at twice the speed of the wheel's centre, and it shrinks to $\mathbf{0}$ at the cusps $t = 0, 2\pi, 4\pi$, where the point touches the ground. The components are infinitely differentiable, but the curve has cusps exactly where the parametrisation fails to be regular.
:::

Differentiation obeys the familiar rules, including two product rules that have no one-variable analogue.

::: theorem Differentiation rules {#thm-vf-product-rules}
Let $\mathbf{u}$ and $\mathbf{v}$ be differentiable vector functions and $f$ a differentiable real function on an interval. Then
1. $(\mathbf{u} + \mathbf{v})' = \mathbf{u}' + \mathbf{v}'$;
2. $(f\mathbf{u})' = f'\mathbf{u} + f\mathbf{u}'$;
3. $(\mathbf{u}\cdot\mathbf{v})' = \mathbf{u}'\cdot\mathbf{v} + \mathbf{u}\cdot\mathbf{v}'$;
4. $(\mathbf{u}\times\mathbf{v})' = \mathbf{u}'\times\mathbf{v} + \mathbf{u}\times\mathbf{v}'$;
5. (chain rule) $\dfrac{d}{dt}\,\mathbf{u}\bigl(f(t)\bigr) = f'(t)\,\mathbf{u}'\bigl(f(t)\bigr)$.
:::

::: proof
Rules 1, 2 and 5 hold component by component: for instance the first component of $f\mathbf{u}$ is $fu_1$, whose derivative is $f'u_1 + fu_1'$ by the one-variable product rule; rule 5 is the one-variable chain rule ([[calculus-1/chain-rule]]) applied to each $u_i \circ f$.

For rule 3, $\mathbf{u}\cdot\mathbf{v} = u_1v_1 + u_2v_2 + u_3v_3$ is a real function, and
$$
(\mathbf{u}\cdot\mathbf{v})' = \sum_{i=1}^3 (u_i'v_i + u_iv_i') = \mathbf{u}'\cdot\mathbf{v} + \mathbf{u}\cdot\mathbf{v}'.
$$
For rule 4, add and subtract $\mathbf{u}(t)\times\mathbf{v}(t+h)$ and use the distributive law for the cross product:
$$
\frac{\mathbf{u}(t+h)\times\mathbf{v}(t+h) - \mathbf{u}(t)\times\mathbf{v}(t)}{h} = \frac{\mathbf{u}(t+h) - \mathbf{u}(t)}{h}\times\mathbf{v}(t+h) + \mathbf{u}(t)\times\frac{\mathbf{v}(t+h) - \mathbf{v}(t)}{h}.
$$
As $h \to 0$ the difference quotients tend to $\mathbf{u}'(t)$ and $\mathbf{v}'(t)$, and $\mathbf{v}(t+h) \to \mathbf{v}(t)$ because a differentiable function is continuous (componentwise, this is the one-variable fact). The components of a cross product are sums of products of components, so by the limit laws the right-hand side tends to $\mathbf{u}'(t)\times\mathbf{v}(t) + \mathbf{u}(t)\times\mathbf{v}'(t)$.
:::

::: warning Keep the order in the cross-product rule
Because $\mathbf{a}\times\mathbf{b} = -\mathbf{b}\times\mathbf{a}$, writing $(\mathbf{u}\times\mathbf{v})' = \mathbf{v}\times\mathbf{u}' + \mathbf{u}\times\mathbf{v}'$ gives the wrong sign for the first term. Each factor must stay in its original position; only the prime moves.
:::

The dot-product rule has a corollary that we shall use again and again.

::: corollary Constant length means perpendicular derivative {#cor-constant-length}
Let $\mathbf{r}$ be differentiable on an interval $I$. Then $\norm{\mathbf{r}(t)}$ is constant on $I$ if and only if $\mathbf{r}(t)\cdot\mathbf{r}'(t) = 0$ for all $t \in I$.
:::

::: proof
By rule 3, $\dfrac{d}{dt}\norm{\mathbf{r}}^2 = (\mathbf{r}\cdot\mathbf{r})' = 2\,\mathbf{r}\cdot\mathbf{r}'$. If $\norm{\mathbf{r}}$ is constant, the left side is $0$. Conversely, if $\mathbf{r}\cdot\mathbf{r}' = 0$ on $I$, then $\norm{\mathbf{r}}^2$ has zero derivative on an interval, so it is constant by the mean value theorem ([[calculus-1/mean-value-theorem]]), and hence so is $\norm{\mathbf{r}}$.
:::

Geometrically: a point moving on a sphere centred at the origin always has velocity tangent to the sphere. Applied to the unit tangent vector, which has constant length $1$, the corollary says $\mathbf{T}'(t) \perp \mathbf{T}(t)$: the direction can only change *sideways*.

::: quiz
A particle moves along a curve with constant speed $\norm{\mathbf{r}'(t)} = 5$. Which statement must be true?
- [ ] The acceleration $\mathbf{r}''(t)$ is zero.
- [x] The acceleration is perpendicular to the velocity.
- [ ] The acceleration is parallel to the velocity.
- [ ] The particle moves along a straight line.
::: solution
Apply [[#cor-constant-length]] to the velocity $\mathbf{v} = \mathbf{r}'$: its length is constant, so $\mathbf{v}\cdot\mathbf{v}' = 0$, that is, the acceleration is perpendicular to the velocity. It need not be zero: uniform motion round a circle has constant speed but an acceleration pointing to the centre.
:::
:::

## Integrals of vector functions

Integrals are also defined componentwise:
$$
\int_a^b \mathbf{r}(t)\,dt = \left(\int_a^b x(t)\,dt,\ \int_a^b y(t)\,dt,\ \int_a^b z(t)\,dt\right).
$$
For example, $\int_0^1 (t, e^t, 2\cos \pi t)\,dt = \bigl(\tfrac12,\ e - 1,\ 0\bigr)$. Applying the fundamental theorem of calculus ([[calculus-1/integrals]]) to each component, if $\mathbf{r}'$ is continuous then
$$
\int_a^b \mathbf{r}'(t)\,dt = \mathbf{r}(b) - \mathbf{r}(a),
$$ {#eq-vf-ftc}
so displacement is the integral of velocity. One inequality connects integrals with lengths, and it is the key to arc length.

::: lemma The norm of an integral {#lem-norm-integral}
If $\mathbf{r}$ is continuous on $[a, b]$, then
$$
\norm{\int_a^b \mathbf{r}(t)\,dt} \le \int_a^b \norm{\mathbf{r}(t)}\,dt .
$$
:::

::: proof
Let $\mathbf{w} = \int_a^b \mathbf{r}(t)\,dt$; if $\mathbf{w} = \mathbf{0}$ there is nothing to prove. Since $\mathbf{w}$ is a constant vector, linearity of the integral in each component gives $\mathbf{w}\cdot\int_a^b\mathbf{r}\,dt = \int_a^b \mathbf{w}\cdot\mathbf{r}(t)\,dt$. Using the Cauchy–Schwarz inequality ([[multivariable/vectors-geometry#thm-cauchy-schwarz]]) inside the integral,
$$
\norm{\mathbf{w}}^2 = \int_a^b \mathbf{w}\cdot\mathbf{r}(t)\,dt \le \int_a^b \norm{\mathbf{w}}\,\norm{\mathbf{r}(t)}\,dt = \norm{\mathbf{w}}\int_a^b \norm{\mathbf{r}(t)}\,dt .
$$
Dividing by $\norm{\mathbf{w}} > 0$ gives the result.
:::

## Arc length

How long is a curve? Choose points $a = t_0 < t_1 < \dots < t_n = b$ and join $\mathbf{r}(t_0), \mathbf{r}(t_1), \dots, \mathbf{r}(t_n)$ by straight segments. The inscribed polygon has length $\sum_i \norm{\mathbf{r}(t_i) - \mathbf{r}(t_{i-1})}$, and each chord is approximately $\norm{\mathbf{r}'(t_i)}\,\Delta t_i$, where $\Delta t_i = t_i - t_{i-1}$. The sum is then a Riemann sum for $\int_a^b\norm{\mathbf{r}'(t)}\,dt$. This suggests the following definition, which the next proposition justifies.

::: definition Arc length {#def-arc-length}
Let $\mathbf{r}\colon [a, b] \to \R^3$ have a continuous derivative. The **arc length** of $\mathbf{r}$ is
$$
L = \int_a^b \norm{\mathbf{r}'(t)}\,dt = \int_a^b \sqrt{x'(t)^2 + y'(t)^2 + z'(t)^2}\,dt .
$$ {#eq-arc-length}
:::

::: proposition Arc length is the limit of polygon lengths {#prop-polygons}
Let $\mathbf{r}$ be as in [[#def-arc-length]], and let $P$ be the polygon with vertices $\mathbf{r}(t_0), \dots, \mathbf{r}(t_n)$ for a partition $a = t_0 < \dots < t_n = b$. Then $\text{length}(P) \le L$, and $\text{length}(P) \to L$ as $\max_i \Delta t_i \to 0$.
:::

::: proof
By [[#eq-vf-ftc]] and [[#lem-norm-integral]], each chord satisfies
$$
\norm{\mathbf{r}(t_i) - \mathbf{r}(t_{i-1})} = \norm{\int_{t_{i-1}}^{t_i}\mathbf{r}'(t)\,dt} \le \int_{t_{i-1}}^{t_i}\norm{\mathbf{r}'(t)}\,dt,
$$
and adding over $i$ gives $\text{length}(P) \le L$.

For the limit, let $\eps > 0$. The derivative $\mathbf{r}'$ is continuous on the closed bounded interval $[a,b]$, hence uniformly continuous (each component is; see [[real-analysis/continuity]]), so there is $\delta > 0$ with $\norm{\mathbf{r}'(t) - \mathbf{r}'(t')} < \eps$ whenever $\abs{t - t'} < \delta$. Suppose every $\Delta t_i < \delta$. On $[t_{i-1}, t_i]$ write $\mathbf{r}'(t) = \mathbf{r}'(t_i) + \mathbf{e}(t)$ with $\norm{\mathbf{e}(t)} < \eps$. Then, using the triangle inequality and [[#lem-norm-integral]] again,
$$
\norm{\mathbf{r}(t_i) - \mathbf{r}(t_{i-1})} = \norm{\mathbf{r}'(t_i)\,\Delta t_i + \int_{t_{i-1}}^{t_i}\mathbf{e}(t)\,dt} \ge \norm{\mathbf{r}'(t_i)}\,\Delta t_i - \eps\,\Delta t_i,
$$
while $\int_{t_{i-1}}^{t_i}\norm{\mathbf{r}'(t)}\,dt \le \bigl(\norm{\mathbf{r}'(t_i)} + \eps\bigr)\Delta t_i$. Subtracting and summing over $i$,
$$
0 \le L - \text{length}(P) \le 2\eps\,(b - a).
$$
Since $\eps$ was arbitrary, $\text{length}(P) \to L$.
:::

::: remark Length without derivatives
The proposition shows that $L$ is the supremum of the lengths of all inscribed polygons. That supremum makes sense for any continuous curve; curves for which it is finite are called **rectifiable**. Some continuous curves, such as the Koch snowflake, are not rectifiable: every refinement of the polygon makes it longer without bound.
:::

::: example An arc length that simplifies {#ex-arc-length}
Find the length of $\mathbf{r}(t) = (t^2, 2t, \ln t)$ for $1 \le t \le e$.
::: solution
We have $\mathbf{r}'(t) = (2t, 2, 1/t)$ and
$$
\norm{\mathbf{r}'(t)}^2 = 4t^2 + 4 + \frac{1}{t^2} = \left(2t + \frac1t\right)^2 ,
$$
a perfect square. Since $2t + 1/t > 0$,
$$
L = \int_1^e \left(2t + \frac1t\right)dt = \Bigl[t^2 + \ln t\Bigr]_1^e = (e^2 + 1) - (1 + 0) = e^2 .
$$
Most arc-length integrals cannot be evaluated in closed form (even the ellipse leads to "elliptic integrals"); textbook examples are chosen so that the square root simplifies, and in practice $L$ is computed numerically ([[numerical-analysis/numerical-integration]]).
:::
:::

Arc length should be a property of the curve, not of the way it is traced. The next theorem confirms this, provided the curve is traced once in a consistent direction.

::: theorem Arc length does not depend on the parametrisation {#thm-reparametrisation}
Let $\mathbf{r}\colon[a,b]\to\R^3$ have a continuous derivative, and let $\varphi\colon[c,d]\to[a,b]$ be a bijection with continuous derivative such that either $\varphi' > 0$ everywhere or $\varphi' < 0$ everywhere. Then $\boldsymbol\rho(u) = \mathbf{r}(\varphi(u))$ has the same arc length as $\mathbf{r}$.
:::

::: proof
By the chain rule (rule 5 of [[#thm-vf-product-rules]]), $\boldsymbol\rho'(u) = \varphi'(u)\,\mathbf{r}'(\varphi(u))$, so $\norm{\boldsymbol\rho'(u)} = \abs{\varphi'(u)}\,\norm{\mathbf{r}'(\varphi(u))}$. If $\varphi' > 0$ then $\varphi(c) = a$ and $\varphi(d) = b$, and the substitution $t = \varphi(u)$ gives
$$
\int_c^d \norm{\boldsymbol\rho'(u)}\,du = \int_c^d \norm{\mathbf{r}'(\varphi(u))}\,\varphi'(u)\,du = \int_a^b \norm{\mathbf{r}'(t)}\,dt .
$$
If $\varphi' < 0$ then $\varphi(c) = b$, $\varphi(d) = a$ and $\abs{\varphi'} = -\varphi'$, so the same substitution gives $-\int_b^a\norm{\mathbf{r}'(t)}\,dt = \int_a^b\norm{\mathbf{r}'(t)}\,dt$.
:::

::: quiz
What does the integral $\int_0^{2\pi}\norm{\mathbf{r}'(t)}\,dt$ equal for $\mathbf{r}(t) = (\cos 2t, \sin 2t)$?
- [ ] $2\pi$, the circumference of the unit circle
- [x] $4\pi$
- [ ] $\pi$
- [ ] It depends on where the curve starts.
::: solution
Here $\mathbf{r}'(t) = (-2\sin 2t, 2\cos 2t)$ has length $2$, so the integral is $4\pi$. The parametrisation goes round the unit circle *twice* as $t$ runs from $0$ to $2\pi$, and the integral measures the distance travelled, not the length of the set traced. [[#thm-reparametrisation]] does not apply because $t\mapsto 2t$ maps $[0,2\pi]$ onto $[0, 4\pi]$, not onto a parameter interval that traces the circle once.
:::
:::

### Parametrising by arc length

For a smooth parametrisation on $[a, b]$, the **arc-length function**
$$
s(t) = \int_a^t \norm{\mathbf{r}'(u)}\,du
$$
measures the distance travelled from $\mathbf{r}(a)$. By the fundamental theorem of calculus, $s'(t) = \norm{\mathbf{r}'(t)}$, so the speed is $ds/dt$.

::: theorem Reparametrisation by arc length {#thm-arc-length-param}
Let $\mathbf{r}\colon[a,b]\to\R^3$ be a smooth parametrisation of length $L$. Then $s\colon[a,b]\to[0,L]$ is a bijection whose inverse $t = t(s)$ has a continuous derivative, and the reparametrised curve $\tilde{\mathbf{r}}(s) = \mathbf{r}(t(s))$ has unit speed: $\norm{\tilde{\mathbf{r}}'(s)} = 1$ for all $s$. Its derivative is the unit tangent, $\tilde{\mathbf{r}}'(s) = \mathbf{T}(t(s))$.
:::

::: proof
Since $s'(t) = \norm{\mathbf{r}'(t)} > 0$ is continuous, $s$ is strictly increasing and continuous, hence a bijection from $[a,b]$ onto $[s(a), s(b)] = [0, L]$. By the inverse function rule of one-variable calculus, $t(s)$ is differentiable with $\dfrac{dt}{ds} = \dfrac{1}{s'(t)} = \dfrac{1}{\norm{\mathbf{r}'(t)}}$, which is continuous. By the chain rule,
$$
\tilde{\mathbf{r}}'(s) = \mathbf{r}'(t(s))\,\frac{dt}{ds} = \frac{\mathbf{r}'(t(s))}{\norm{\mathbf{r}'(t(s))}} = \mathbf{T}(t(s)),
$$
a unit vector.
:::

::: example The helix by arc length {#ex-helix-arc}
Reparametrise the helix $\mathbf{r}(t) = (a\cos t, a\sin t, bt)$, $t \ge 0$, by arc length from $t = 0$.
::: solution
Here $\mathbf{r}'(t) = (-a\sin t, a\cos t, b)$ has constant length $c = \sqrt{a^2 + b^2}$. Hence $s(t) = \int_0^t c\,du = ct$, so $t = s/c$ and
$$
\tilde{\mathbf{r}}(s) = \left(a\cos\frac{s}{c},\ a\sin\frac{s}{c},\ \frac{bs}{c}\right), \qquad c = \sqrt{a^2+b^2}.
$$
One check: $\tilde{\mathbf{r}}'(s) = \frac1c(-a\sin\frac sc, a\cos\frac sc, b)$ has length $\frac1c\sqrt{a^2+b^2} = 1$. One full turn ($0 \le t \le 2\pi$) has length $2\pi\sqrt{a^2+b^2}$, the hypotenuse of a right triangle with sides $2\pi a$ (once round the cylinder) and $2\pi b$ (the rise): unroll the cylinder and the helix becomes a straight line.
:::
:::

Explicit arc-length parametrisations are rare, because the integral for $s(t)$ and its inverse are rarely elementary. Their value is theoretical: they let us define geometric quantities that do not depend on how fast the curve is traced.

## Curvature

A straight road needs no steering; a gentle bend needs a little; a hairpin needs a lot. The amount of steering is the rate at which the direction of motion changes *per unit distance travelled*. Measuring per unit distance, rather than per unit time, makes the answer independent of speed.

::: definition Curvature {#def-curvature}
Let $\mathbf{r}$ be a smooth parametrisation with continuous second derivative, $\mathbf{T}$ its unit tangent and $s$ its arc length. The **curvature** is
$$
\kappa = \norm{\frac{d\mathbf{T}}{ds}} = \frac{\norm{\mathbf{T}'(t)}}{\norm{\mathbf{r}'(t)}},
$$
where the second form follows from the chain rule $\mathbf{T}'(t) = \dfrac{d\mathbf{T}}{ds}\,\dfrac{ds}{dt}$. Where $\kappa > 0$, the **radius of curvature** is $1/\kappa$.
:::

For a line, $\mathbf{T}$ is constant and $\kappa = 0$. For a circle of radius $a$ traced by arc length, $\tilde{\mathbf{r}}(s) = (a\cos\frac sa, a\sin\frac sa)$, we get $\mathbf{T}(s) = (-\sin\frac sa, \cos\frac sa)$ and $\frac{d\mathbf{T}}{ds} = -\frac1a(\cos\frac sa, \sin\frac sa)$, so $\kappa = 1/a$: small circles are sharply curved, large circles nearly straight, and the radius of curvature of a circle is its radius. Computing $\mathbf{T}$ and differentiating it is usually laborious; the cross product gives a direct formula.

::: theorem A formula for curvature {#thm-curvature-formula}
For a smooth parametrisation $\mathbf{r}$ with continuous second derivative,
$$
\kappa(t) = \frac{\norm{\mathbf{r}'(t)\times\mathbf{r}''(t)}}{\norm{\mathbf{r}'(t)}^3}.
$$ {#eq-curvature}
:::

::: proof
Write $\sigma = \norm{\mathbf{r}'} = ds/dt > 0$, so that $\mathbf{r}' = \sigma\mathbf{T}$. By the product rule, $\mathbf{r}'' = \sigma'\mathbf{T} + \sigma\mathbf{T}'$, and since $\mathbf{T}\times\mathbf{T} = \mathbf{0}$,
$$
\mathbf{r}'\times\mathbf{r}'' = \sigma\sigma'\,\mathbf{T}\times\mathbf{T} + \sigma^2\,\mathbf{T}\times\mathbf{T}' = \sigma^2\,\mathbf{T}\times\mathbf{T}' .
$$
Because $\norm{\mathbf{T}} = 1$ is constant, $\mathbf{T}' \perp \mathbf{T}$ by [[#cor-constant-length]], so the angle between them is $\pi/2$ and $\norm{\mathbf{T}\times\mathbf{T}'} = \norm{\mathbf{T}}\,\norm{\mathbf{T}'}\sin\frac\pi2 = \norm{\mathbf{T}'}$ (by [[multivariable/vectors-geometry#thm-cross-length]]). If $\mathbf{T}' = \mathbf{0}$ this holds trivially. Hence $\norm{\mathbf{r}'\times\mathbf{r}''} = \sigma^2\norm{\mathbf{T}'} = \sigma^2\cdot\kappa\sigma = \kappa\sigma^3$, using $\norm{\mathbf{T}'} = \kappa\sigma$ from [[#def-curvature]].
:::

::: corollary Curvature of a graph {#cor-graph-curvature}
The curvature of the plane curve $y = f(x)$, where $f$ has a continuous second derivative, is
$$
\kappa(x) = \frac{\abs{f''(x)}}{\bigl(1 + f'(x)^2\bigr)^{3/2}} .
$$
:::

::: proof
Parametrise the graph by $\mathbf{r}(x) = (x, f(x), 0)$, which is smooth because $\mathbf{r}'(x) = (1, f'(x), 0) \neq \mathbf{0}$. Then $\mathbf{r}''(x) = (0, f''(x), 0)$ and $\mathbf{r}'\times\mathbf{r}'' = (0, 0, f''(x))$. Substituting into [[#eq-curvature]] with $\norm{\mathbf{r}'} = \sqrt{1 + f'^2}$ gives the formula.
:::

Notice that $\kappa$ is close to $\abs{f''}$ only where the graph is nearly horizontal. A steep graph can have large $f''$ and still small curvature.

::: example The twisted cubic {#ex-twisted-cubic}
Find the curvature of $\mathbf{r}(t) = (t, t^2, t^3)$, and its value at the origin.
::: solution
We have $\mathbf{r}' = (1, 2t, 3t^2)$ and $\mathbf{r}'' = (0, 2, 6t)$, so
$$
\mathbf{r}'\times\mathbf{r}'' = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & 2t & 3t^2 \\ 0 & 2 & 6t\end{vmatrix} = (12t^2 - 6t^2,\ -6t,\ 2) = (6t^2, -6t, 2).
$$
Therefore
$$
\kappa(t) = \frac{\sqrt{36t^4 + 36t^2 + 4}}{(1 + 4t^2 + 9t^4)^{3/2}} = \frac{2\sqrt{9t^4 + 9t^2 + 1}}{(1 + 4t^2 + 9t^4)^{3/2}} .
$$
At $t = 0$, $\kappa(0) = 2$. Far from the origin the curve straightens out: for large $\abs t$ the numerator grows like $6t^2$ and the denominator like $27\abs{t}^6$, so $\kappa(t) \to 0$.
:::
:::

::: example The parabola and its osculating circle {#ex-parabola}
Find the curvature of the parabola $y = x^2$, where it is largest, and the circle that best fits the parabola at that point.
::: solution
By [[#cor-graph-curvature]] with $f'(x) = 2x$ and $f''(x) = 2$,
$$
\kappa(x) = \frac{2}{(1 + 4x^2)^{3/2}} .
$$
The denominator is smallest at $x = 0$, so the curvature is largest at the vertex, where $\kappa(0) = 2$ and the radius of curvature is $\tfrac12$. The best-fitting circle at the vertex has radius $\tfrac12$ and lies on the concave side, so its centre is $(0, \tfrac12)$. Near the origin, $y = x^2$ and the lower half of the circle $x^2 + (y - \frac12)^2 = \frac14$, namely $y = \frac12 - \sqrt{\frac14 - x^2} = x^2 + x^4 + \dots$, agree to third order: they differ only by $x^4 + \dots$.
:::
:::

The best-fitting circle in the last example has a general definition. Where $\kappa > 0$, the **principal unit normal** is
$$
\mathbf{N} = \frac{1}{\kappa}\frac{d\mathbf{T}}{ds} = \frac{\mathbf{T}'(t)}{\norm{\mathbf{T}'(t)}},
$$
a unit vector perpendicular to $\mathbf{T}$ (by [[#cor-constant-length]]) pointing towards the side to which the curve is turning. The **osculating circle** ("kissing circle") at a point lies in the plane of $\mathbf{T}$ and $\mathbf{N}$, has radius $1/\kappa$ and centre $\mathbf{r} + \frac1\kappa\mathbf{N}$; it matches the curve's position, direction and curvature. The third vector $\mathbf{B} = \mathbf{T}\times\mathbf{N}$, the **binormal**, completes a moving right-handed frame. How fast $\mathbf{B}$ turns measures how quickly the curve twists out of the plane of its osculating circle, the **torsion**; the frame $\mathbf{T}, \mathbf{N}, \mathbf{B}$ and its Frenet–Serret equations are the subject of [[differential-geometry/curves]].

::: widget curvature
fx: 2cos(t)
fy: sin(t)
t: 0, 2pi
at: 0.5
x: -3.5, 3.5
y: -2.5, 2.5
caption: The ellipse $(2\cos t, \sin t)$ with its osculating circle. Move the point around the curve. At the ends of the long axis ($t = 0, \pi$) the ellipse turns sharply: $\kappa = 2$ and the circle has radius $\tfrac12$. At the ends of the short axis ($t = \pm\pi/2$) it is flattest: $\kappa = \tfrac14$ and the circle has radius $4$. In general $\kappa(t) = 2/(1 + 3\sin^2 t)^{3/2}$.
:::

::: widget frenet
fx: cos(t)
fy: sin(t)
fz: b*t
t: 0, 4pi
sliders: b=0.3:0:1.5:0.05
caption: The helix $(\cos t, \sin t, bt)$ with its moving frame $\mathbf{T}, \mathbf{N}, \mathbf{B}$. Rotate the view: $\mathbf{N}$ always points horizontally towards the axis of the helix. Move the slider. At $b = 0$ the helix collapses to the unit circle with $\kappa = 1$; as $b$ grows the coils stretch and the curvature $\kappa = 1/(1+b^2)$ decreases. The binormal $\mathbf{B}$ tilts as the curve twists, which the torsion measures.
:::

## Velocity, acceleration and motion

Now let $t$ be time and $\mathbf{r}(t)$ the position of a moving particle. Its **velocity** is $\mathbf{v} = \mathbf{r}'$, its **speed** is $\norm{\mathbf{v}} = ds/dt$, and its **acceleration** is $\mathbf{a} = \mathbf{v}' = \mathbf{r}''$. Newton's second law $\mathbf{F} = m\mathbf{a}$ links the acceleration to the force, so the decomposition of $\mathbf{a}$ into a part along the path and a part across it has direct physical meaning.

::: theorem Tangential and normal components of acceleration {#thm-acceleration-components}
Let $\mathbf{r}$ be a smooth parametrisation with continuous second derivative, and let $\sigma = \norm{\mathbf{v}}$ be the speed. Then
$$
\mathbf{a} = \frac{d\sigma}{dt}\,\mathbf{T} + \kappa\,\sigma^2\,\mathbf{N},
$$ {#eq-acceleration}
where the second term is read as $\mathbf{0}$ wherever $\kappa = 0$. Consequently the **tangential** and **normal components** of acceleration are
$$
a_T = \frac{d\sigma}{dt} = \frac{\mathbf{v}\cdot\mathbf{a}}{\norm{\mathbf{v}}}, \qquad a_N = \kappa\sigma^2 = \frac{\norm{\mathbf{v}\times\mathbf{a}}}{\norm{\mathbf{v}}} .
$$
:::

::: proof
Since $\mathbf{v} = \sigma\mathbf{T}$, the product rule gives $\mathbf{a} = \sigma'\mathbf{T} + \sigma\mathbf{T}'$. By the chain rule $\mathbf{T}'(t) = \dfrac{d\mathbf{T}}{ds}\,\sigma$, and $\dfrac{d\mathbf{T}}{ds} = \kappa\mathbf{N}$ where $\kappa > 0$ (and $=\mathbf{0}$ where $\kappa = 0$). Hence $\mathbf{a} = \sigma'\mathbf{T} + \kappa\sigma^2\mathbf{N}$. Taking the dot product with $\mathbf{T}$, and using $\mathbf{T}\cdot\mathbf{T} = 1$ and $\mathbf{T}\cdot\mathbf{N} = 0$, gives $\mathbf{a}\cdot\mathbf{T} = \sigma'$, that is $a_T = \mathbf{v}\cdot\mathbf{a}/\sigma$. Finally $\mathbf{v}\times\mathbf{a} = \sigma\mathbf{T}\times(\sigma'\mathbf{T} + \kappa\sigma^2\mathbf{N}) = \kappa\sigma^3\,\mathbf{T}\times\mathbf{N}$, and $\norm{\mathbf{T}\times\mathbf{N}} = 1$ because $\mathbf{T}$ and $\mathbf{N}$ are perpendicular unit vectors; so $\norm{\mathbf{v}\times\mathbf{a}} = \kappa\sigma^3$ and $a_N = \kappa\sigma^2 = \norm{\mathbf{v}\times\mathbf{a}}/\sigma$.
:::

So acceleration has no component along the binormal: it always lies in the osculating plane. The tangential part changes the speed; the normal part changes the direction and has size $\kappa\sigma^2$.

::: example Components of acceleration on a parabola {#ex-components}
A particle moves along $\mathbf{r}(t) = (t, t^2)$. Find $a_T$, $a_N$ and the curvature at $t = 1$.
::: solution
We have $\mathbf{v} = (1, 2t)$ and $\mathbf{a} = (0, 2)$; at $t = 1$, $\mathbf{v} = (1, 2)$ and $\norm{\mathbf{v}} = \sqrt5$. Then
$$
a_T = \frac{\mathbf{v}\cdot\mathbf{a}}{\norm{\mathbf{v}}} = \frac{4}{\sqrt5}, \qquad a_N = \frac{\abs{1\cdot 2 - 2\cdot 0}}{\sqrt 5} = \frac{2}{\sqrt5},
$$
where for plane vectors $\norm{\mathbf{v}\times\mathbf{a}} = \abs{v_1a_2 - v_2a_1}$. As a check, $a_T^2 + a_N^2 = \frac{16}{5} + \frac45 = 4 = \norm{\mathbf{a}}^2$. The curvature is $\kappa = a_N/\norm{\mathbf{v}}^2 = \frac{2}{5\sqrt5}$, which agrees with $\kappa(x) = 2/(1+4x^2)^{3/2}$ from [[#ex-parabola]] at $x = 1$.
:::
:::

::: application Why bends are designed with care
On a bend of radius $R$ taken at speed $\sigma$, the road must supply a sideways acceleration $a_N = \sigma^2/R$ through friction or banking. Doubling the speed quadruples the force. A straight road cannot be joined directly to a circular arc either, since the curvature, and with it the sideways force, would jump from $0$ to $1/R$ in an instant. Road and railway engineers therefore insert **transition curves**, usually arcs of a clothoid (Euler spiral), whose curvature increases in proportion to arc length, so the steering and the sideways force build up gradually.
:::

::: quiz
A car takes a bend of radius $50$ m at a constant $20$ m/s. What is the magnitude of its acceleration?
- [ ] $0$ m/s², since the speed is constant
- [ ] $0.4$ m/s²
- [x] $8$ m/s²
- [ ] $20$ m/s²
::: solution
The speed is constant, so $a_T = 0$, but the direction changes: $a_N = \kappa\sigma^2 = \sigma^2/R = 400/50 = 8$ m/s², pointing towards the centre of the bend. This is about $0.8\,g$, more than ordinary tyres can supply on a wet road.
:::
:::

::: example Projectile motion {#ex-projectile}
A ball is launched from the origin with speed $v_0$ at angle $\alpha$ above the horizontal, and moves under gravity alone, $\mathbf{a} = (0, -g)$. Find its path and its range, and show the range is greatest when $\alpha = \pi/4$.
::: solution
Integrate the acceleration using [[#eq-vf-ftc]]: $\mathbf{v}(t) = \mathbf{v}(0) + \int_0^t (0, -g)\,du = (v_0\cos\alpha,\ v_0\sin\alpha - gt)$. Integrating again with $\mathbf{r}(0) = \mathbf{0}$,
$$
\mathbf{r}(t) = \left(v_0 t\cos\alpha,\ v_0 t\sin\alpha - \tfrac12 g t^2\right).
$$
Eliminating $t = x/(v_0\cos\alpha)$ gives $y = x\tan\alpha - \dfrac{g\,x^2}{2v_0^2\cos^2\alpha}$, a parabola. The ball lands when $y = 0$ with $t > 0$, at $t = 2v_0\sin\alpha/g$, so the range is
$$
R(\alpha) = v_0\cos\alpha\cdot\frac{2v_0\sin\alpha}{g} = \frac{v_0^2\sin 2\alpha}{g}.
$$
For $0 < \alpha < \pi/2$ this is largest when $\sin 2\alpha = 1$, that is $\alpha = \pi/4$, with $R = v_0^2/g$. (Air resistance, ignored here, lowers the best angle.)
:::
:::

### Central forces and Kepler's second law

A force is **central** if it always points along the line joining the particle to a fixed centre, which we take as the origin: gravity of the Sun on a planet, or the electric force of a nucleus on an electron. The cross product turns this into a conservation law.

::: theorem Central forces conserve angular momentum {#thm-central-force}
Suppose $\mathbf{r}$ is twice differentiable and $\mathbf{a}(t) = \lambda(t)\,\mathbf{r}(t)$ for some real function $\lambda$. Then $\mathbf{h} = \mathbf{r}\times\mathbf{v}$ is constant. If $\mathbf{h} \neq \mathbf{0}$, the motion lies in the plane through the origin perpendicular to $\mathbf{h}$, and the line from the origin to the particle sweeps out area at the constant rate $\frac12\norm{\mathbf{h}}$.
:::

::: proof
By rule 4 of [[#thm-vf-product-rules]],
$$
\frac{d}{dt}(\mathbf{r}\times\mathbf{v}) = \mathbf{v}\times\mathbf{v} + \mathbf{r}\times\mathbf{a} = \mathbf{0} + \lambda\,\mathbf{r}\times\mathbf{r} = \mathbf{0},
$$
so $\mathbf{h}$ is constant. Since $\mathbf{r}\times\mathbf{v}$ is perpendicular to $\mathbf{r}$, we have $\mathbf{r}(t)\cdot\mathbf{h} = 0$ for all $t$: the particle stays in the plane through $\mathbf{0}$ perpendicular to $\mathbf{h}$.

Choose axes so that this is the $xy$-plane and $\mathbf{h} = (0, 0, h)$ with $h > 0$, and write $\mathbf{r} = (\rho\cos\theta, \rho\sin\theta, 0)$ in polar coordinates (note $\rho > 0$, since $\mathbf{r} = \mathbf{0}$ would make $\mathbf{h} = \mathbf{0}$). Then
$$
\mathbf{v} = \rho'(\cos\theta, \sin\theta, 0) + \rho\theta'(-\sin\theta, \cos\theta, 0), \qquad \mathbf{r}\times\mathbf{v} = (0,\ 0,\ \rho^2\theta').
$$
So $\rho^2\theta' = h > 0$ and $\theta$ is increasing. By the polar area formula ([[calculus-2/parametric-polar]]), the area swept between times $t_0$ and $t$ is $A(t) = \frac12\int_{t_0}^{t}\rho^2\theta'\,du$, hence $A'(t) = \frac12\rho^2\theta' = \frac12 h$.
:::

This is Kepler's second law, that a planet sweeps out equal areas in equal times, and it holds for *every* central force, not only the inverse-square law of gravity. The vector $m\mathbf{h}$ is the angular momentum, and the theorem is conservation of angular momentum. Kepler's first law, that orbits are ellipses, needs the inverse-square law and a longer calculation.

::: history
Kepler announced his first two laws of planetary motion in *Astronomia nova* (1609), extracting them from Tycho Brahe's observations of Mars. In the *Principia* (1687), Book I, Proposition 1, Newton proved that any body moving under a force directed towards a fixed centre sweeps out equal areas in equal times; his argument was geometric, with no coordinates or vectors, but it is the same idea as our proof. Newton's *Method of Fluxions* (written around 1671, published in 1736) includes the problem of finding the curvature of a curve at any point, and Huygens's theory of evolutes in *Horologium oscillatorium* (1673) located the centres of curvature. The notation of vectors, with the dot and cross products used in this chapter, came much later, from Josiah Willard Gibbs and Oliver Heaviside in the 1880s.
:::

## Where this leads

Arc length and curvature are the start of the differential geometry of curves: [[differential-geometry/curves]] adds torsion, proves the Frenet–Serret formulas for the frame $\mathbf{T}, \mathbf{N}, \mathbf{B}$, and shows that curvature and torsion determine a curve up to a rigid motion. The element of arc length $ds = \norm{\mathbf{r}'(t)}\,dt$ is what we integrate against in [[multivariable/line-integrals]], where the work done by a force along a path is computed. The next chapter, [[multivariable/partial-derivatives]], turns from functions of one variable with vector values to functions of several variables, and equations of motion like $\mathbf{r}'' = \mathbf{F}(\mathbf{r})/m$ are systems of differential equations studied in [[ode/linear-systems]].

::: summary
- A vector function $\mathbf{r}(t) = (x(t), y(t), z(t))$ traces a curve; limits, derivatives and integrals are taken component by component ([[#thm-componentwise]]).
- $\mathbf{r}'(t)$ is tangent to the curve; a parametrisation is smooth when $\mathbf{r}'$ is continuous and never $\mathbf{0}$. Without that condition the curve can have corners and cusps.
- Dot and cross products obey product rules ([[#thm-vf-product-rules]]); $\norm{\mathbf{r}}$ is constant exactly when $\mathbf{r}\perp\mathbf{r}'$.
- Arc length $L = \int_a^b\norm{\mathbf{r}'(t)}\,dt$ is the limit of inscribed polygon lengths and does not depend on the parametrisation; every smooth curve can be reparametrised to have unit speed.
- Curvature $\kappa = \norm{d\mathbf{T}/ds} = \norm{\mathbf{r}'\times\mathbf{r}''}/\norm{\mathbf{r}'}^3$; for $y = f(x)$, $\kappa = \abs{f''}/(1+f'^2)^{3/2}$; a circle of radius $a$ has $\kappa = 1/a$.
- Acceleration splits as $\mathbf{a} = \sigma'\,\mathbf{T} + \kappa\sigma^2\,\mathbf{N}$: the tangential part changes the speed, the normal part turns the direction.
- Under a central force $\mathbf{r}\times\mathbf{v}$ is constant, so the motion is planar and sweeps out equal areas in equal times.
:::

## Exercises

::: exercise A tangent line {level=1}
Let $\mathbf{r}(t) = (e^t,\ te^t,\ t^2 + 1)$. Find $\mathbf{r}'(t)$, the unit tangent vector at $t = 0$, and the tangent line at $t = 0$.
::: solution
Differentiating componentwise, $\mathbf{r}'(t) = (e^t,\ (1+t)e^t,\ 2t)$. At $t = 0$: $\mathbf{r}(0) = (1, 0, 1)$ and $\mathbf{r}'(0) = (1, 1, 0)$, so $\mathbf{T}(0) = \frac{1}{\sqrt2}(1, 1, 0)$ and the tangent line is $(1 + u,\ u,\ 1)$, $u\in\R$.
:::
:::

::: exercise Length of a stretched helix {level=1 check="2*pi*sqrt(13)"}
Find the arc length of $\mathbf{r}(t) = (2t,\ 3\sin t,\ 3\cos t)$ for $0 \le t \le 2\pi$.
::: solution
$\mathbf{r}'(t) = (2,\ 3\cos t,\ -3\sin t)$, so $\norm{\mathbf{r}'(t)} = \sqrt{4 + 9\cos^2 t + 9\sin^2 t} = \sqrt{13}$ and $L = \int_0^{2\pi}\sqrt{13}\,dt = 2\pi\sqrt{13}$.
:::
:::

::: exercise Curvature of the exponential {level=1 check="sqrt(2)/4"}
Find the curvature of $y = e^x$ at the point $(0, 1)$.
::: solution
With $f(x) = e^x$, $f'(0) = f''(0) = 1$, so by [[#cor-graph-curvature]] $\kappa(0) = \dfrac{1}{(1 + 1)^{3/2}} = \dfrac{1}{2\sqrt2} = \dfrac{\sqrt2}{4}$.
:::
:::

::: exercise One arch of the cycloid {level=2 check="8"}
Find the length of one arch of the cycloid $\mathbf{r}(t) = (t - \sin t,\ 1 - \cos t)$, $0 \le t \le 2\pi$.
::: hint
Use $1 - \cos t = 2\sin^2(t/2)$.
:::
::: solution
$\mathbf{r}'(t) = (1 - \cos t,\ \sin t)$, so
$$
\norm{\mathbf{r}'(t)}^2 = 1 - 2\cos t + \cos^2 t + \sin^2 t = 2 - 2\cos t = 4\sin^2\frac t2 .
$$
For $0 \le t \le 2\pi$, $\sin(t/2) \ge 0$, so $\norm{\mathbf{r}'(t)} = 2\sin(t/2)$ and
$$
L = \int_0^{2\pi}2\sin\frac t2\,dt = \Bigl[-4\cos\frac t2\Bigr]_0^{2\pi} = 4 + 4 = 8 .
$$
The arch is $8$ times the radius of the rolling wheel, a result found by Christopher Wren in 1658.
:::
:::

::: exercise From velocity to position {level=2 check="15"}
A particle has velocity $\mathbf{v}(t) = (t^2,\ 2t,\ 2)$ and starts at $\mathbf{r}(0) = (1, 0, 0)$. Find $\mathbf{r}(t)$ and the distance it travels between $t = 0$ and $t = 3$.
::: solution
By [[#eq-vf-ftc]], $\mathbf{r}(t) = \mathbf{r}(0) + \int_0^t \mathbf{v}(u)\,du = \bigl(1 + \tfrac{t^3}{3},\ t^2,\ 2t\bigr)$. The speed is $\norm{\mathbf{v}} = \sqrt{t^4 + 4t^2 + 4} = t^2 + 2$, so the distance travelled is $\int_0^3 (t^2 + 2)\,dt = 9 + 6 = 15$.
:::
:::

::: exercise Normal acceleration on the twisted cubic {level=2 check="sqrt(38/7)"}
A particle moves along $\mathbf{r}(t) = (t, t^2, t^3)$. Find the tangential and normal components of its acceleration at $t = 1$, and give $a_N$.
::: solution
At $t = 1$, $\mathbf{v} = (1, 2, 3)$, $\mathbf{a} = (0, 2, 6)$ and $\norm{\mathbf{v}} = \sqrt{14}$. Then $a_T = \mathbf{v}\cdot\mathbf{a}/\norm{\mathbf{v}} = 22/\sqrt{14}$. Next $\mathbf{v}\times\mathbf{a} = (2\cdot6 - 3\cdot2,\ 3\cdot0 - 1\cdot6,\ 1\cdot2 - 2\cdot0) = (6, -6, 2)$, with length $\sqrt{76}$, so
$$
a_N = \frac{\sqrt{76}}{\sqrt{14}} = \sqrt{\frac{38}{7}} \approx 2.330 .
$$
Check: $a_T^2 + a_N^2 = \frac{484}{14} + \frac{76}{14} = 40 = \norm{\mathbf{a}}^2$.
:::
:::

::: exercise Where is a logarithm most curved? {level=2 check="1/sqrt(2)"}
Find the value of $x > 0$ at which the curve $y = \ln x$ has the largest curvature.
::: solution
With $f'(x) = 1/x$ and $f''(x) = -1/x^2$,
$$
\kappa(x) = \frac{1/x^2}{(1 + 1/x^2)^{3/2}} = \frac{x}{(x^2+1)^{3/2}} .
$$
Then $\kappa'(x) = \dfrac{(x^2+1) - 3x^2}{(x^2+1)^{5/2}} = \dfrac{1 - 2x^2}{(x^2+1)^{5/2}}$, which is positive for $x < 1/\sqrt2$ and negative for $x > 1/\sqrt2$. So the maximum is at $x = 1/\sqrt2$, where $\kappa = 2\sqrt3/9$.
:::
:::

::: exercise How far does it go? {level=2 check="200*sqrt(3)/9.8"}
A ball is thrown from ground level at $20$ m/s at $30°$ above the horizontal. Ignoring air resistance and taking $g = 9.8$ m/s², how far away does it land (in metres)?
::: solution
By [[#ex-projectile]], $R = v_0^2\sin 2\alpha/g = 400\sin 60°/9.8 = 200\sqrt3/9.8 \approx 35.3$ m.
:::
:::

::: exercise Zero curvature means a straight line {level=3}
Let $\mathbf{r}\colon I\to\R^3$ be a smooth parametrisation with continuous second derivative on an interval $I$, and suppose $\kappa(t) = 0$ for all $t$. Prove that the curve lies on a straight line.
::: hint
Show that $\mathbf{T}$ is constant, then integrate $\mathbf{r}' = \norm{\mathbf{r}'}\,\mathbf{T}$.
:::
::: solution
By [[#def-curvature]], $\norm{\mathbf{T}'(t)} = \kappa(t)\norm{\mathbf{r}'(t)} = 0$, so $\mathbf{T}' = \mathbf{0}$ on $I$. Each component of $\mathbf{T}$ has zero derivative on an interval and is therefore constant: $\mathbf{T}(t) = \mathbf{T}_0$. Fix $t_0 \in I$. Then $\mathbf{r}'(t) = \norm{\mathbf{r}'(t)}\,\mathbf{T}_0$, and by [[#eq-vf-ftc]]
$$
\mathbf{r}(t) = \mathbf{r}(t_0) + \left(\int_{t_0}^t\norm{\mathbf{r}'(u)}\,du\right)\mathbf{T}_0 .
$$
Every point $\mathbf{r}(t)$ is therefore of the form $\mathbf{r}(t_0) + \lambda\mathbf{T}_0$ with $\lambda\in\R$, so the curve lies on the line through $\mathbf{r}(t_0)$ with direction $\mathbf{T}_0$.
:::
:::

::: exercise Rigid motions preserve length and curvature {level=3}
Let $Q$ be an orthogonal $3\times3$ matrix ($Q\T Q = I$), let $\mathbf{c}\in\R^3$, and let $\boldsymbol\rho(t) = Q\mathbf{r}(t) + \mathbf{c}$, where $\mathbf{r}$ is a smooth parametrisation with continuous second derivative. Prove that $\boldsymbol\rho$ has the same arc-length function and the same curvature as $\mathbf{r}$.
::: hint
First show $\norm{Q\mathbf{w}} = \norm{\mathbf{w}}$ for every vector $\mathbf{w}$, and that $(Q\mathbf{r})' = Q\mathbf{r}'$.
:::
::: solution
For any vector $\mathbf{w}$, $\norm{Q\mathbf{w}}^2 = (Q\mathbf{w})\T(Q\mathbf{w}) = \mathbf{w}\T Q\T Q\mathbf{w} = \mathbf{w}\T\mathbf{w} = \norm{\mathbf{w}}^2$. Each component of $Q\mathbf{r}(t)$ is a fixed linear combination of the components of $\mathbf{r}(t)$, so differentiating componentwise gives $\boldsymbol\rho'(t) = Q\mathbf{r}'(t)$. Hence $\norm{\boldsymbol\rho'(t)} = \norm{\mathbf{r}'(t)}$: the speeds agree, so the arc-length functions $s(t) = \int_a^t\norm{\mathbf{r}'}$ agree, and in particular $\boldsymbol\rho$ is smooth.

The unit tangents are related by $\mathbf{T}_{\boldsymbol\rho} = Q\mathbf{r}'/\norm{\mathbf{r}'} = Q\mathbf{T}$. Differentiating with respect to the common arc length $s$, $\dfrac{d\mathbf{T}_{\boldsymbol\rho}}{ds} = Q\dfrac{d\mathbf{T}}{ds}$, and taking norms, $\kappa_{\boldsymbol\rho} = \norm{Q\,d\mathbf{T}/ds} = \norm{d\mathbf{T}/ds} = \kappa$. So length and curvature are properties of the shape of a curve, not of where it sits in space.
:::
:::
