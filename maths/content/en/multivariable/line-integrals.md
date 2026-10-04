A rope tow drags a skier up a winding track while a cross-wind pushes sideways; how much work does the wind do? A thin wire is bent into a spring whose density varies along its length; what is its mass? And why can physicists speak of the "potential energy" of a satellite at all — why does the work done by gravity on a moving body depend only on where it starts and where it ends, and not on the route it takes in between?

All three questions are about integrating along a curve rather than along an interval. In this chapter we introduce **vector fields**, which attach a vector (a force, a velocity) to each point of space, and two kinds of **line integral**: one that adds up a scalar quantity along a curve, such as mass, and one that adds up the component of a vector field along a curve, such as work. We then prove the fundamental theorem for line integrals, which explains when the work is independent of the path, and meet a field — the vortex — that shows how subtle that question really is.

Curves are described by vector functions $\mathbf{r}(t)$ as in [[multivariable/vector-functions]], and gradients are as in [[multivariable/gradient]].

## Vector fields

::: definition Vector field {#def-vector-field}
A **vector field** on a set $D\subseteq\R^n$ is a function $\mathbf{F}\colon D\to\R^n$ that assigns a vector $\mathbf{F}(\mathbf{x})$ to each point $\mathbf{x}\in D$. In the plane we write $\mathbf{F} = (P, Q)$ and in space $\mathbf{F} = (P, Q, R)$, where the **components** $P, Q, R$ are real-valued functions of position. The field is **continuous**, or **of class** $C^1$, if its components are.
:::

We picture a vector field by drawing the arrow $\mathbf{F}(\mathbf{x})$ with its tail at $\mathbf{x}$ for a grid of sample points. Some fields that will accompany us through the rest of the course:

- **Rotation**: $\mathbf{F}(x,y) = (-y, x)$. Each arrow is perpendicular to the position vector and as long as the distance from the origin, so the field describes a rigid rotation about the origin (a turntable).
- **Radial fields**: $\mathbf{F}(x,y) = (x, y)$ points directly away from the origin, like a fluid welling up from a source.
- **Gravitation**: a mass $M$ at the origin attracts a mass $m$ at position $\mathbf{r} \ne \mathbf{0}$ with force
  $$
  \mathbf{F}(\mathbf{r}) = -\frac{GMm}{\norm{\mathbf{r}}^3}\,\mathbf{r},
  $$
  of magnitude $GMm/\norm{\mathbf{r}}^2$ and directed towards the origin — an **inverse-square field**. Electrostatic forces have the same form.
- **Gradient fields**: for a differentiable function $f$, the field $\nabla f$ points in the direction of steepest ascent of $f$ (see [[multivariable/gradient#thm-steepest]]). For instance $f = \sqrt{x^2+y^2+z^2}$ has $\nabla f = \mathbf{r}/\norm{\mathbf{r}}$, the unit radial field.

If $\mathbf{F}$ is the velocity field of a fluid, a particle carried by the flow moves along a curve $\mathbf{r}(t)$ with $\mathbf{r}'(t) = \mathbf{F}(\mathbf{r}(t))$; such curves are called **flow lines** or **streamlines**. For the rotation field they are circles about the origin; for the radial field, rays from the origin. Finding flow lines means solving a system of differential equations, the subject of [[ode/linear-systems]].

::: widget vectorfield
P: a*x - b*y
Q: b*x + a*y
x: -3, 3
y: -3, 3
streamlines: true
sliders: a=0.3:-1:1:0.1; b=1:-1:1:0.1
caption: The linear field $\mathbf{F} = (ax - by,\; bx + ay)$, with flow lines. Set $a = 0$: the flow lines are circles and the field is a pure rotation. Set $b = 0$: they are rays, and the field is a pure expansion ($a > 0$) or contraction ($a < 0$). In between, the flow spirals. In [[multivariable/greens-theorem]] these two effects are measured separately, by the curl ($2b$) and the divergence ($2a$).
:::

## Line integrals of scalar functions

Imagine a thin wire lying along a curve $C$, with linear density (mass per unit length) $\delta(x,y,z)$ that varies from point to point. Cut the wire into short pieces of lengths $\Delta s_1, \dots, \Delta s_N$ and pick a point $\mathbf{x}_i^*$ in each. The mass is approximately $\sum \delta(\mathbf{x}_i^*)\,\Delta s_i$, and the approximation improves as the pieces shrink. If $C$ is parametrised by $\mathbf{r}(t)$, $a\le t\le b$, a short piece corresponding to $[t_{i-1}, t_i]$ has length $\Delta s_i \approx \norm{\mathbf{r}'(t_i)}\,\Delta t_i$ (see [[multivariable/vector-functions#def-arc-length]]), and the sums become Riemann sums for an ordinary integral in $t$.

First we fix the kind of curve we integrate over. A **smooth curve** $C$ is the image of a map $\mathbf{r}\colon[a,b]\to\R^n$ with continuous derivative and $\mathbf{r}'(t)\ne\mathbf{0}$, which is one-to-one except that possibly $\mathbf{r}(a) = \mathbf{r}(b)$ (a **closed** curve). A **piecewise smooth** curve is a finite chain of smooth curves $C_1, \dots, C_k$, each starting where the previous one ends; we write $C = C_1 + \dots + C_k$. Polygons, and the boundary of a square, are piecewise smooth.

::: definition Line integral of a scalar function {#def-scalar-line-integral}
Let $f$ be continuous on a smooth curve $C$ parametrised by $\mathbf{r}\colon[a,b]\to\R^n$ as above. The **line integral of $f$ along $C$ with respect to arc length** is

$$
\int_C f\,ds = \int_a^b f(\mathbf{r}(t))\,\norm{\mathbf{r}'(t)}\,dt .
$$ {#eq-scalar-li}

For a piecewise smooth curve, $\int_C f\,ds$ is the sum of the integrals over its smooth pieces.
:::

The symbol $ds = \norm{\mathbf{r}'(t)}\,dt$ is the **arc length element**. With $f = 1$ the integral is the length of $C$; with $f = \delta$ it is the mass of the wire; and $\frac{1}{L}\int_C f\,ds$ is the average value of $f$ along a curve of length $L$. For a planar curve and $f \ge 0$, $\int_C f\,ds$ is the area of the "curtain" standing on $C$ under the graph of $f$.

The definition uses a particular parametrisation, but the answer must not depend on it — the mass of a wire cannot depend on how we label its points.

::: theorem Independence of parametrisation {#thm-scalar-invariance}
Let $\mathbf{r}\colon[a,b]\to\R^n$ parametrise the smooth curve $C$, and let $\boldsymbol\rho(u) = \mathbf{r}(\varphi(u))$, $c\le u\le d$, where $\varphi\colon[c,d]\to[a,b]$ is a bijection with continuous derivative that never vanishes. Then

$$
\int_c^d f(\boldsymbol\rho(u))\,\norm{\boldsymbol\rho'(u)}\,du = \int_a^b f(\mathbf{r}(t))\,\norm{\mathbf{r}'(t)}\,dt .
$$

In particular, $\int_C f\,ds$ is the same whichever direction $C$ is traversed in.
:::

::: proof
Since $\varphi'$ is continuous and never zero, it has constant sign. By the chain rule $\boldsymbol\rho'(u) = \varphi'(u)\,\mathbf{r}'(\varphi(u))$, so $\norm{\boldsymbol\rho'(u)} = \abs{\varphi'(u)}\,\norm{\mathbf{r}'(\varphi(u))}$. If $\varphi' > 0$, then $\varphi(c) = a$, $\varphi(d) = b$, and the substitution $t = \varphi(u)$ gives

$$
\int_c^d f(\mathbf{r}(\varphi(u)))\,\norm{\mathbf{r}'(\varphi(u))}\,\varphi'(u)\,du = \int_a^b f(\mathbf{r}(t))\,\norm{\mathbf{r}'(t)}\,dt .
$$

If $\varphi' < 0$, then $\varphi(c) = b$, $\varphi(d) = a$ and $\abs{\varphi'} = -\varphi'$, so the same substitution gives $-\int_b^a(\cdots)\,dt = \int_a^b(\cdots)\,dt$. Either way the integrals agree.
:::

::: example The mass of a spring {#ex-spring}
A wire lies along the helix $\mathbf{r}(t) = (\cos t, \sin t, t)$, $0 \le t\le 2\pi$, and its density is equal to the height, $\delta(x,y,z) = z$. Find its mass.
::: solution
$\mathbf{r}'(t) = (-\sin t, \cos t, 1)$, so $\norm{\mathbf{r}'(t)} = \sqrt{\sin^2t + \cos^2t + 1} = \sqrt2$. Along the curve, $\delta(\mathbf{r}(t)) = t$. Hence

$$
m = \int_C z\,ds = \int_0^{2\pi} t\,\sqrt2\,dt = \sqrt2\cdot\frac{(2\pi)^2}{2} = 2\sqrt2\,\pi^2 \approx 27.9 .
$$
:::
:::

::: example The centre of mass of a semicircular wire {#ex-semicircle}
A uniform wire is bent into the semicircle $x^2 + y^2 = 1$, $y\ge0$. Where is its centre of mass?
::: solution
For a uniform wire the centre of mass is the average position, $(\bar x, \bar y) = \frac1L\left(\int_C x\,ds, \int_C y\,ds\right)$, where $L = \pi$ is the length. By symmetry $\bar x = 0$. With $\mathbf{r}(t) = (\cos t, \sin t)$, $0\le t\le\pi$, we have $\norm{\mathbf{r}'(t)} = 1$, so

$$
\bar y = \frac{1}{\pi}\int_0^\pi \sin t\,dt = \frac{2}{\pi} \approx 0.64 .
$$

The centre of mass $(0, 2/\pi)$ lies on the axis of symmetry but not on the wire — like the centre of a ring.
:::
:::

::: warning Do not forget the speed
A common slip is to write $\int_C f\,ds = \int_a^b f(\mathbf{r}(t))\,dt$, dropping the factor $\norm{\mathbf{r}'(t)}$. The result then depends on how fast the curve is traversed: going round the unit circle twice as fast, with $\mathbf{r}(t) = (\cos 2t, \sin 2t)$, $0\le t\le\pi$, would halve the "length". The factor $\norm{\mathbf{r}'(t)}$ is exactly what makes [[#thm-scalar-invariance]] true. Note also that the parametrisation must trace $C$ only once: a parametrisation that goes round a circle twice computes twice the integral.
:::

## Line integrals of vector fields

Now let a force field $\mathbf{F}$ act on a particle moving along a curve $C$. On a short piece of the path the force is nearly constant and the displacement is nearly the straight vector $\Delta\mathbf{r}_i = \mathbf{r}(t_i) - \mathbf{r}(t_{i-1}) \approx \mathbf{r}'(t_i)\,\Delta t_i$, so the work done is approximately $\mathbf{F}(\mathbf{r}(t_i))\cdot\Delta\mathbf{r}_i$ (work = force · displacement, [[multivariable/vectors-geometry]]). Adding up and refining leads to the second kind of line integral. Unlike mass, work depends on the direction of travel, so we integrate over **oriented** curves: curves together with a chosen direction of traversal, the direction of increasing $t$.

::: definition Line integral of a vector field {#def-line-integral}
Let $\mathbf{F}$ be a continuous vector field on an oriented smooth curve $C$ parametrised by $\mathbf{r}\colon[a,b]\to\R^n$ in the direction of its orientation. The **line integral of $\mathbf{F}$ along $C$** is

$$
\int_C \mathbf{F}\cdot d\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,dt .
$$ {#eq-vector-li}

For a piecewise smooth oriented curve it is the sum over the smooth pieces. When $C$ is closed we often write $\oint_C$, and call $\oint_C\mathbf{F}\cdot d\mathbf{r}$ the **circulation** of $\mathbf{F}$ around $C$.
:::

Since $\mathbf{r}'(t) = \norm{\mathbf{r}'(t)}\,\mathbf{T}(t)$, where $\mathbf{T}$ is the unit tangent, we can also write

$$
\int_C\mathbf{F}\cdot d\mathbf{r} = \int_C \mathbf{F}\cdot\mathbf{T}\,ds :
$$

the line integral of a vector field is the scalar line integral of its **tangential component**. A force perpendicular to the motion does no work. In components, with $\mathbf{F} = (P,Q,R)$ and $\mathbf{r} = (x(t), y(t), z(t))$, the integrand is $Px' + Qy' + Rz'$, which suggests the common notation

$$
\int_C \mathbf{F}\cdot d\mathbf{r} = \int_C P\,dx + Q\,dy + R\,dz .
$$

::: theorem Orientation {#thm-orientation}
The line integral $\int_C\mathbf{F}\cdot d\mathbf{r}$ does not change under a reparametrisation $\mathbf{r}\circ\varphi$ with $\varphi' > 0$ (which preserves the direction of travel). If $-C$ denotes $C$ with the opposite orientation, then

$$
\int_{-C}\mathbf{F}\cdot d\mathbf{r} = -\int_C\mathbf{F}\cdot d\mathbf{r}.
$$
:::

::: proof
For $\boldsymbol\rho(u) = \mathbf{r}(\varphi(u))$ we have $\boldsymbol\rho'(u) = \varphi'(u)\,\mathbf{r}'(\varphi(u))$, so

$$
\int_c^d\mathbf{F}(\boldsymbol\rho(u))\cdot\boldsymbol\rho'(u)\,du = \int_c^d \mathbf{F}(\mathbf{r}(\varphi(u)))\cdot\mathbf{r}'(\varphi(u))\,\varphi'(u)\,du = \int_{\varphi(c)}^{\varphi(d)}\mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,dt
$$

by the substitution $t = \varphi(u)$. If $\varphi' > 0$ the limits are $a$ and $b$ and nothing changes. A parametrisation of $-C$ is obtained with $\varphi' < 0$ (for example $\varphi(u) = a + b - u$ on $[a,b]$); then the limits are $b$ and $a$, and swapping them changes the sign. Unlike the proof of [[#thm-scalar-invariance]], there is no absolute value $\abs{\varphi'}$ here to absorb the sign.
:::

::: example Work along a twisted cubic {#ex-twisted-cubic}
Compute $\int_C \mathbf{F}\cdot d\mathbf{r}$ for $\mathbf{F}(x,y,z) = (y, z, x)$ along the twisted cubic $\mathbf{r}(t) = (t, t^2, t^3)$ from $(0,0,0)$ to $(1,1,1)$.
::: solution
Along the curve $\mathbf{F}(\mathbf{r}(t)) = (t^2, t^3, t)$ and $\mathbf{r}'(t) = (1, 2t, 3t^2)$, so

$$
\int_C\mathbf{F}\cdot d\mathbf{r} = \int_0^1\bigl(t^2 + 2t^4 + 3t^3\bigr)\,dt = \frac13 + \frac25 + \frac34 = \frac{20 + 24 + 45}{60} = \frac{89}{60}.
$$
:::
:::

::: example Three paths, three answers {#ex-three-paths}
Let $\mathbf{F}(x,y) = (-y, x)$. Compute $\int_C\mathbf{F}\cdot d\mathbf{r}$ from $(1,0)$ to $(-1,0)$ along (a) the upper half of the unit circle, (b) the straight segment, (c) the lower half of the unit circle.
::: solution
(a) $\mathbf{r}(t) = (\cos t, \sin t)$, $0\le t\le\pi$: $\mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t) = (-\sin t)(-\sin t) + (\cos t)(\cos t) = 1$, so the integral is $\pi$.

(b) $\mathbf{r}(t) = (1-2t, 0)$, $0\le t\le 1$: $\mathbf{F}(\mathbf{r}(t)) = (0, 1-2t)$ and $\mathbf{r}'(t) = (-2, 0)$, whose dot product is $0$. The integral is $0$: the field is perpendicular to the $x$-axis everywhere on it.

(c) $\mathbf{r}(t) = (\cos t, -\sin t)$, $0\le t\le\pi$: the integrand is $(\sin t)(-\sin t) + (\cos t)(-\cos t) = -1$, and the integral is $-\pi$.

The work done by this field depends on the path, not just on the endpoints. Going out along (a) and back along $-(c)$ is a full anticlockwise circuit, with circulation $\pi - (-\pi) = 2\pi$.
:::
:::

::: quiz
Let $-C$ be the curve $C$ traversed in the opposite direction. Which statements are true for every continuous $f$ and $\mathbf{F}$? (Select all that apply.)
- [ ] $\int_{-C} f\,ds = -\int_C f\,ds$
- [x] $\int_{-C} f\,ds = \int_C f\,ds$
- [x] $\int_{-C} \mathbf{F}\cdot d\mathbf{r} = -\int_C \mathbf{F}\cdot d\mathbf{r}$
- [ ] $\int_{-C} \mathbf{F}\cdot d\mathbf{r} = \int_C \mathbf{F}\cdot d\mathbf{r}$
::: solution
Arc length is positive whichever way we walk, so scalar line integrals ignore orientation ([[#thm-scalar-invariance]]). The tangent vector reverses when the direction of travel does, so the tangential component $\mathbf{F}\cdot\mathbf{T}$ changes sign and so does the work ([[#thm-orientation]]).
:::
:::

## The fundamental theorem for line integrals

In one variable, $\int_a^b f'(t)\,dt = f(b) - f(a)$. The analogue for curves replaces $f'$ by the gradient.

::: theorem Fundamental theorem for line integrals {#thm-ftli}
Let $f$ be a $C^1$ function on an open set containing a piecewise smooth curve $C$ that starts at $A$ and ends at $B$. Then

$$
\int_C \nabla f\cdot d\mathbf{r} = f(B) - f(A).
$$
:::

::: proof
First let $C$ be smooth, parametrised by $\mathbf{r}\colon[a,b]\to\R^n$ with $\mathbf{r}(a) = A$, $\mathbf{r}(b) = B$. By the chain rule ([[multivariable/partial-derivatives#thm-chain-rule]]), the function $g(t) = f(\mathbf{r}(t))$ has continuous derivative $g'(t) = \nabla f(\mathbf{r}(t))\cdot\mathbf{r}'(t)$. By the fundamental theorem of calculus,

$$
\int_C\nabla f\cdot d\mathbf{r} = \int_a^b g'(t)\,dt = g(b) - g(a) = f(B) - f(A).
$$

If $C = C_1 + \dots + C_k$ is piecewise smooth, with $C_i$ running from $A_{i-1}$ to $A_i$, where $A_0 = A$ and $A_k = B$, then adding the results for the pieces gives a telescoping sum $\sum_i\bigl(f(A_i) - f(A_{i-1})\bigr) = f(B) - f(A)$.
:::

Two consequences are immediate. For a gradient field, the line integral is **independent of path**: it is the same for all curves with the same endpoints. And around every closed curve, $\oint_C\nabla f\cdot d\mathbf{r} = 0$, since then $A = B$. In [[#ex-three-paths]] the answers differed, so $(-y, x)$ is not a gradient field.

::: example A line integral by finding a potential {#ex-potential-2d}
Evaluate $\int_C 2xy\,dx + (x^2 + 3y^2)\,dy$, where $C$ is any piecewise smooth curve from $(0,0)$ to $(1,2)$.
::: solution
We look for $f$ with $f_x = 2xy$ and $f_y = x^2 + 3y^2$. The function $f(x,y) = x^2y + y^3$ works: $f_x = 2xy$ and $f_y = x^2 + 3y^2$. By [[#thm-ftli]],

$$
\int_C 2xy\,dx + (x^2+3y^2)\,dy = f(1,2) - f(0,0) = 2 + 8 = 10,
$$

whatever the shape of $C$ — a straight segment, a parabola, or a wild spiral that wanders off and comes back. (Below we learn how to *find* $f$ systematically.)
:::
:::

::: widget vectorfield
P: (1 - k)*2*x*y - k*y
Q: (1 - k)*x^2 + k*x
cx: t
cy: t + a*sin(pi*t)
t: 0, 1
x: -1, 2
y: -1, 2
sliders: a=0.5:-1:1:0.05; k=0:0:1:1
caption: Paths $\mathbf{r}(t) = (t,\; t + a\sin \pi t)$ from $(0,0)$ to $(1,1)$. With $k = 0$ the field is $\nabla(x^2y)$: bend the path with $a$ and the work stays exactly $1 = f(1,1) - f(0,0)$. Switch to $k = 1$, the rotation field $(-y, x)$: now the work is $-4a/\pi$ and changes with every bend of the path.
:::

::: quiz
$f$ is a $C^1$ function on $\R^3$ and $C$ is a closed piecewise smooth curve. What is $\oint_C\nabla f\cdot d\mathbf{r}$?
- [ ] It depends on the shape of $C$
- [ ] It equals the length of $C$ times the average of $\norm{\nabla f}$
- [x] $0$
- [ ] $f$ evaluated at the starting point
::: solution
By [[#thm-ftli]] the integral is $f(B) - f(A)$, and for a closed curve the endpoint $B$ is the starting point $A$. So the circulation of a gradient field around any closed curve is zero.
:::
:::

::: application Potential energy and conservation of energy
A force field of the form $\mathbf{F} = -\nabla U$ is called **conservative**, and $U$ is its **potential energy**. The gravitational field above is of this form with $U(\mathbf{r}) = -GMm/\norm{\mathbf{r}}$, because $\nabla(1/\norm{\mathbf{r}}) = -\mathbf{r}/\norm{\mathbf{r}}^3$. By [[#thm-ftli]], the work done by gravity on a body moving from $A$ to $B$ is $U(A) - U(B)$, by any route. More is true. If a particle of mass $m$ moves according to Newton's law $m\mathbf{r}'' = \mathbf{F}(\mathbf{r}) = -\nabla U(\mathbf{r})$, then the **total energy** $E = \tfrac12m\norm{\mathbf{r}'}^2 + U(\mathbf{r})$ is constant, since

$$
\frac{dE}{dt} = m\,\mathbf{r}'\cdot\mathbf{r}'' + \nabla U(\mathbf{r})\cdot\mathbf{r}' = \mathbf{r}'\cdot\bigl(m\mathbf{r}'' + \nabla U(\mathbf{r})\bigr) = 0 .
$$

For example, a rocket launched from the surface of a planet of mass $M$ and radius $R$ escapes to infinity (where $U \to 0$) only if $E \ge 0$, that is, $\tfrac12mv^2 \ge GMm/R$: the **escape velocity** is $\sqrt{2GM/R}$, about $11.2$ km/s for the Earth, whatever direction the rocket is fired in.
:::

## Conservative fields and potentials

We have seen that gradient fields have path-independent line integrals. The converse is the heart of the matter.

::: definition Conservative field {#def-conservative}
A vector field $\mathbf{F}$ on an open set $D$ is **conservative** if $\mathbf{F} = \nabla f$ for some $C^1$ function $f\colon D\to\R$, called a **potential** for $\mathbf{F}$. The line integrals of $\mathbf{F}$ are **path-independent** in $D$ if $\int_{C_1}\mathbf{F}\cdot d\mathbf{r} = \int_{C_2}\mathbf{F}\cdot d\mathbf{r}$ for any two piecewise smooth curves $C_1, C_2$ in $D$ with the same starting point and the same end point.
:::

(Physicists put a minus sign in, $\mathbf{F} = -\nabla U$, as above; this makes no difference to the mathematics.) We need one fact about open sets: an open set $D$ is **connected** if any two of its points can be joined by a path in $D$, and then they can even be joined by a polygonal path made of finitely many segments parallel to the coordinate axes (see [[topology/connectedness]]).

::: theorem Path independence {#thm-path-independence}
Let $\mathbf{F}$ be a continuous vector field on a connected open set $D\subseteq\R^n$. The following are equivalent:

1. $\mathbf{F}$ is conservative on $D$;
2. the line integrals of $\mathbf{F}$ are path-independent in $D$;
3. $\oint_C\mathbf{F}\cdot d\mathbf{r} = 0$ for every closed piecewise smooth curve $C$ in $D$.

Moreover, any two potentials of $\mathbf{F}$ on $D$ differ by a constant.
:::

::: proof
(1) ⇒ (2) is [[#thm-ftli]].

(2) ⇒ (3): Let $C$ be a closed curve starting and ending at $A$. Split it at another point $B$ into $C_1$ from $A$ to $B$ and $C_2$ from $B$ back to $A$. Then $C_1$ and $-C_2$ both run from $A$ to $B$, so by (2) and [[#thm-orientation]], $\oint_C = \int_{C_1} + \int_{C_2} = \int_{C_1} - \int_{-C_2} = 0$.

(3) ⇒ (2): If $C_1$ and $C_2$ run from $A$ to $B$, then $C_1 + (-C_2)$ is a closed curve, so $0 = \int_{C_1} - \int_{C_2}$.

(2) ⇒ (1): Fix a point $\mathbf{a}\in D$ and define

$$
f(\mathbf{x}) = \int_{C_{\mathbf{x}}}\mathbf{F}\cdot d\mathbf{r},
$$

where $C_{\mathbf{x}}$ is any piecewise smooth curve in $D$ from $\mathbf{a}$ to $\mathbf{x}$. Such a curve exists because $D$ is connected, and by (2) the value does not depend on the choice. We show $\pdv{f}{x_1} = F_1$; the other components are identical. Since $D$ is open there is a ball $B(\mathbf{x}, \rho)\subseteq D$. For $0 < \abs{h} < \rho$, a curve from $\mathbf{a}$ to $\mathbf{x} + h\mathbf{e}_1$ is $C_{\mathbf{x}}$ followed by the segment $\mathbf{r}(s) = \mathbf{x} + s\mathbf{e}_1$, $s$ from $0$ to $h$, which stays in the ball. Along this segment $\mathbf{F}\cdot\mathbf{r}'(s) = F_1(\mathbf{x} + s\mathbf{e}_1)$, so

$$
\frac{f(\mathbf{x} + h\mathbf{e}_1) - f(\mathbf{x})}{h} = \frac1h\int_0^h F_1(\mathbf{x} + s\mathbf{e}_1)\,ds \longrightarrow F_1(\mathbf{x}) \quad (h\to0),
$$

by the fundamental theorem of calculus, since $s\mapsto F_1(\mathbf{x}+s\mathbf{e}_1)$ is continuous. Hence $\nabla f = \mathbf{F}$, and $f$ is $C^1$ because $\mathbf{F}$ is continuous.

Finally, if $\nabla f = \nabla g = \mathbf{F}$, then $\nabla(f - g) = \mathbf{0}$ on the connected open set $D$, so $f - g$ is constant ([[multivariable/gradient#cor-constant]] and the remark after it).
:::

The proof is constructive — a potential is "the work done in getting from a base point to $\mathbf{x}$" — but it presupposes that we already know the line integrals are path-independent. We need a test that can be checked by differentiation.

::: theorem A necessary condition {#thm-curl-test}
Let $\mathbf{F} = (P, Q)$ be a conservative $C^1$ field on an open set $D\subseteq\R^2$. Then

$$
\pdv{P}{y} = \pdv{Q}{x} \quad\text{on } D .
$$

Similarly, if $\mathbf{F} = (P, Q, R)$ is a conservative $C^1$ field on an open set in $\R^3$, then $P_y = Q_x$, $P_z = R_x$ and $Q_z = R_y$.
:::

::: proof
Let $\mathbf{F} = \nabla f$. Then $f_x = P$ and $f_y = Q$ are $C^1$, so $f$ is $C^2$, and by Clairaut's theorem ([[multivariable/partial-derivatives#thm-clairaut]]) $P_y = f_{xy} = f_{yx} = Q_x$. The three-dimensional statements are the same argument applied to each pair of variables.
:::

So $\mathbf{F} = (-y, x)$ cannot be conservative, since $P_y = -1 \ne 1 = Q_x$. The real question is whether the condition is also **sufficient**. The next example shows that the answer depends on the shape of the domain.

::: example The vortex {#ex-vortex}
Let $\mathbf{F}(x,y) = \left(\dfrac{-y}{x^2+y^2},\; \dfrac{x}{x^2+y^2}\right)$ on the punctured plane $D = \R^2\setminus\set{\mathbf{0}}$. Show that $P_y = Q_x$ on $D$ but that $\mathbf{F}$ is not conservative on $D$.
::: solution
By the quotient rule,

$$
\pdv{P}{y} = \frac{-(x^2+y^2) + 2y^2}{(x^2+y^2)^2} = \frac{y^2 - x^2}{(x^2+y^2)^2}, \qquad \pdv{Q}{x} = \frac{(x^2+y^2) - 2x^2}{(x^2+y^2)^2} = \frac{y^2 - x^2}{(x^2+y^2)^2},
$$

so the necessary condition of [[#thm-curl-test]] holds everywhere in $D$. But around the unit circle $\mathbf{r}(t) = (\cos t, \sin t)$, $0\le t\le 2\pi$, we have $\mathbf{F}(\mathbf{r}(t)) = (-\sin t, \cos t)$ and $\mathbf{r}'(t) = (-\sin t, \cos t)$, so

$$
\oint_C\mathbf{F}\cdot d\mathbf{r} = \int_0^{2\pi}\bigl(\sin^2t + \cos^2t\bigr)\,dt = 2\pi \ne 0 .
$$

By [[#thm-path-independence]], $\mathbf{F}$ is not conservative on $D$.

What is going on? Away from the negative $x$-axis, $\mathbf{F}$ is the gradient of the polar angle $\theta(x,y)$: for instance on the right half-plane $\theta = \arctan(y/x)$, and $\nabla\theta = \left(\frac{-y}{x^2+y^2}, \frac{x}{x^2+y^2}\right)$. So $\int_C\mathbf{F}\cdot d\mathbf{r}$ measures the total change in angle along $C$. Going once round the origin, the angle increases by $2\pi$ and returns to the "same" direction, so no single-valued continuous function $\theta$ exists on all of $D$. The hole at the origin is what spoils the potential.
:::
:::

::: widget vectorfield
P: -y/(x^2 + y^2)
Q: x/(x^2 + y^2)
cx: c + r*cos(t)
cy: r*sin(t)
t: 0, 2pi
x: -3, 3
y: -3, 3
sliders: c=0:-2:2:0.1; r=1:0.3:2:0.1
caption: The vortex field of [[#ex-vortex]] with a circle of radius $r$ centred at $(c, 0)$. While the circle surrounds the origin the circulation is exactly $2\pi$, however you move or resize it; as soon as the origin lies outside, it drops to $0$. (When the circle passes through the origin the integral is undefined.) Explaining this jump is one of the first applications of Green's theorem.
:::

::: warning The test P_y = Q_x is not enough on its own
Checking $P_y = Q_x$ does **not** prove that a field is conservative: the vortex passes the test on $\R^2\setminus\set{\mathbf{0}}$ and fails to be conservative there. The test proves a field is conservative only when the domain has no holes — for instance the whole plane, a disc or a half-plane, as the next theorem shows. Always ask what the domain is.
:::

::: theorem Sufficiency on star-shaped sets {#thm-star-shaped}
Let $D\subseteq\R^2$ be an open set that is **star-shaped** with respect to the origin: whenever $\mathbf{x}\in D$, the whole segment from $\mathbf{0}$ to $\mathbf{x}$ lies in $D$ (convex sets containing $\mathbf{0}$, and $\R^2$ itself, are examples). If $\mathbf{F} = (P, Q)$ is $C^1$ on $D$ and $P_y = Q_x$ on $D$, then $\mathbf{F}$ is conservative on $D$, with potential

$$
f(x, y) = \int_0^1\bigl(x\,P(tx, ty) + y\,Q(tx, ty)\bigr)\,dt .
$$ {#eq-star-potential}
:::

::: proof
The formula is the line integral of $\mathbf{F}$ along the segment $\mathbf{r}(t) = t\mathbf{x}$, $0\le t\le1$, which lies in $D$. Because the integrand and its partial derivatives with respect to $x$ and $y$ are continuous, we may differentiate under the integral sign (a standard result of analysis):

$$
\pdv{f}{x} = \int_0^1\Bigl(P(tx,ty) + tx\,P_x(tx,ty) + ty\,Q_x(tx,ty)\Bigr)\,dt .
$$

Now use the hypothesis $Q_x = P_y$ in the last term:

$$
\pdv{f}{x} = \int_0^1\Bigl(P(tx,ty) + t\bigl(x\,P_x(tx,ty) + y\,P_y(tx,ty)\bigr)\Bigr)\,dt = \int_0^1\frac{d}{dt}\Bigl(t\,P(tx,ty)\Bigr)\,dt = P(x,y),
$$

since by the product and chain rules $\frac{d}{dt}\bigl(tP(tx,ty)\bigr) = P(tx,ty) + t\bigl(xP_x + yP_y\bigr)(tx,ty)$. In the same way $\pdv{f}{y} = Q(x,y)$. So $\nabla f = \mathbf{F}$.
:::

The same proof works in $\R^3$, with the three conditions of [[#thm-curl-test]] ([[#exr-star-3d]]). A star-shaped set has no holes; in [[multivariable/greens-theorem]] the theorem is extended to every **simply connected** region of the plane, using Green's theorem. The punctured plane is not simply connected, and the vortex is the reason the extension cannot go further.

### Finding potentials in practice

In practice we find a potential by integrating one variable at a time.

::: example A potential in three dimensions {#ex-find-potential}
Show that $\mathbf{F} = (y^2 + 2xz,\; 2xy + z,\; x^2 + y)$ is conservative on $\R^3$, find a potential, and evaluate $\int_C\mathbf{F}\cdot d\mathbf{r}$ along any curve from $(0,0,0)$ to $(1,2,3)$.
::: solution
*Test.* $P_y = 2y = Q_x$, $P_z = 2x = R_x$ and $Q_z = 1 = R_y$. Since $\R^3$ is star-shaped, $\mathbf{F}$ is conservative.

*Potential.* We need $f_x = y^2 + 2xz$. Integrating with respect to $x$, holding $y$ and $z$ fixed,

$$
f(x,y,z) = xy^2 + x^2z + g(y, z),
$$

where the "constant of integration" $g$ may depend on $y$ and $z$. Next, $f_y = 2xy + g_y$ must equal $2xy + z$, so $g_y = z$ and $g = yz + h(z)$. Finally $f_z = x^2 + y + h'(z)$ must equal $x^2 + y$, so $h' = 0$ and $h$ is a constant, which we take to be $0$. Thus

$$
f(x,y,z) = xy^2 + x^2z + yz .
$$

*Integral.* By [[#thm-ftli]], $\int_C\mathbf{F}\cdot d\mathbf{r} = f(1,2,3) - f(0,0,0) = 4 + 3 + 6 = 13$.
:::
:::

::: warning Do not just add up the separate integrals
A tempting shortcut is to integrate $P$ in $x$, $Q$ in $y$ and $R$ in $z$ and add the three results. For the field above this gives $(xy^2 + x^2z) + (xy^2 + yz) + (x^2z + yz)$, which counts the terms $xy^2$, $x^2z$ and $yz$ twice, and its gradient is not $\mathbf{F}$. Each later integration only determines the part of $f$ that the earlier ones could not see; always differentiate your candidate to check it.
:::

::: quiz
Consider the vortex field $\mathbf{F}$ of [[#ex-vortex]]. Which statement is correct?
- [ ] $\mathbf{F}$ is conservative on $\R^2\setminus\set{\mathbf{0}}$, because $P_y = Q_x$ there
- [x] $\mathbf{F}$ is conservative on the right half-plane $x > 0$, but not on $\R^2\setminus\set{\mathbf{0}}$
- [ ] $\mathbf{F}$ is conservative on no open set, because its circulation around the unit circle is $2\pi$
- [ ] $\mathbf{F}$ is not conservative on any set containing the unit circle, but its circulation around every closed curve is $2\pi$
::: solution
On the half-plane $x > 0$, which is convex, the test $P_y = Q_x$ suffices ([[#thm-star-shaped]], after translating so that the base point is inside), and indeed $\mathbf{F} = \nabla\arctan(y/x)$ there. On the punctured plane the circulation around the unit circle is $2\pi \ne 0$, so $\mathbf{F}$ is not conservative there. The circulation around a closed curve that does not go round the origin is $0$, not $2\pi$.
:::
:::

::: history
The idea that a force can be derived from a single function goes back to Joseph-Louis Lagrange, who observed in 1773 that the components of the gravitational attraction of a body are the partial derivatives of one function. George Green named such a function the "potential function" in his *Essay* of 1828, and Carl Friedrich Gauss, writing on inverse-square forces in 1840, made "potential" a standard term. The word "work" for force times distance was introduced by Gaspard-Gustave Coriolis in his 1829 book on the effect of machines. Line integrals as a mathematical tool developed at the same time in complex analysis: in 1825 Augustin-Louis Cauchy studied integrals of complex functions along paths in the plane and asked when they depend only on the endpoints — the question this chapter answers for vector fields, and one whose answer, again, depends on holes in the domain.
:::

## Where this leads

The vortex shows that whether "$P_y = Q_x$" implies "conservative" is a question about the shape of the domain. [[multivariable/greens-theorem]] resolves it in the plane: the quantity $Q_x - P_y$ (the scalar curl) measures circulation per unit area, and its integral over a region equals the circulation around the boundary. In three dimensions the conditions of [[#thm-curl-test]] say that the curl $\nabla\times\mathbf{F}$ vanishes, and Stokes' theorem ([[multivariable/stokes-divergence]]) plays the role of Green's theorem. In [[complex-analysis/contour-integrals]] line integrals of analytic functions are path-independent on simply connected domains (Cauchy's theorem), and the vortex reappears as the integral of $1/z$, which counts how many times a curve winds round the origin. That counting is the starting point of algebraic topology ([[topology/fundamental-group]]).

::: summary
- A vector field assigns a vector to each point; flow lines satisfy $\mathbf{r}' = \mathbf{F}(\mathbf{r})$ ([[#def-vector-field]]).
- $\int_C f\,ds = \int_a^b f(\mathbf{r}(t))\norm{\mathbf{r}'(t)}\,dt$ adds up $f$ along $C$ (mass, average value, length); it does not depend on the parametrisation or the orientation ([[#def-scalar-line-integral]]).
- $\int_C\mathbf{F}\cdot d\mathbf{r} = \int_a^b\mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,dt = \int_C\mathbf{F}\cdot\mathbf{T}\,ds$ is the work done by $\mathbf{F}$ along $C$; it changes sign when the orientation is reversed ([[#def-line-integral]]).
- Fundamental theorem: $\int_C\nabla f\cdot d\mathbf{r} = f(B) - f(A)$ ([[#thm-ftli]]).
- On a connected open set: conservative ⇔ path-independent ⇔ zero circulation around every closed curve; potentials are unique up to a constant ([[#thm-path-independence]]).
- A conservative $C^1$ field satisfies $P_y = Q_x$ (in 3D: all three cross-derivative conditions). The converse holds on star-shaped sets, but not on the punctured plane, as the vortex shows ([[#ex-vortex]]).
- To find a potential, integrate one component, then determine the "constant" by differentiating and comparing with the other components.
:::

## Exercises

::: exercise Along a segment {level=1 check="35/2"}
Evaluate $\int_C (x + y)\,ds$, where $C$ is the segment from $(0,0)$ to $(3,4)$.
::: solution
With $\mathbf{r}(t) = (3t, 4t)$, $0\le t\le1$, we have $\norm{\mathbf{r}'(t)} = 5$ and $x + y = 7t$, so $\int_C(x+y)\,ds = \int_0^1 7t\cdot5\,dt = \tfrac{35}{2}$.
:::
:::

::: exercise Work along a parabola {level=1 check="-1/3"}
Compute $\int_C y\,dx - x\,dy$ along the parabola $y = x^2$ from $(0,0)$ to $(1,1)$.
::: solution
Parametrise by $\mathbf{r}(t) = (t, t^2)$, $0\le t\le 1$, so $dx = dt$ and $dy = 2t\,dt$. The integral is $\int_0^1\bigl(t^2 - t\cdot2t\bigr)\,dt = \int_0^1(-t^2)\,dt = -\tfrac13$.
:::
:::

::: exercise A path-independent integral {level=1 check="13"}
Evaluate $\int_C y\,dx + x\,dy$ along any piecewise smooth curve from $(1,2)$ to $(3,5)$.
::: solution
$(y, x) = \nabla(xy)$, so by [[#thm-ftli]] the integral is $3\cdot5 - 1\cdot2 = 13$.
:::
:::

::: exercise Test, then integrate {level=2 check="1 + e"}
Show that $\mathbf{F} = (3x^2y + y,\; x^3 + x + e^y)$ is conservative on $\R^2$ and evaluate $\int_C\mathbf{F}\cdot d\mathbf{r}$ along the curve $\mathbf{r}(t) = \bigl(t, \sin(\pi t/2)\bigr)$, $0\le t\le1$.
::: solution
$P_y = 3x^2 + 1 = Q_x$ on the whole plane, which is star-shaped, so $\mathbf{F}$ is conservative. Integrating $P$ in $x$: $f = x^3y + xy + g(y)$; then $f_y = x^3 + x + g'(y) = x^3 + x + e^y$ gives $g = e^y$. So $f = x^3y + xy + e^y$. The curve runs from $(0,0)$ to $(1,1)$, so the integral is $f(1,1) - f(0,0) = (1 + 1 + e) - 1 = 1 + e$.
:::
:::

::: exercise A heavy spring {level=2 check="sqrt(5)*(8*pi + 8*pi^3/3)"}
Find the mass of a wire along the helix $\mathbf{r}(t) = (2\cos t, 2\sin t, t)$, $0\le t\le 2\pi$, with density $\delta(x,y,z) = x^2 + y^2 + z^2$.
::: solution
$\norm{\mathbf{r}'(t)} = \sqrt{4\sin^2t + 4\cos^2t + 1} = \sqrt5$ and $\delta(\mathbf{r}(t)) = 4 + t^2$. So

$$
m = \int_0^{2\pi}(4 + t^2)\sqrt5\,dt = \sqrt5\left(8\pi + \frac{8\pi^3}{3}\right) \approx 241.1 .
$$
:::
:::

::: exercise Circulation of a rotation {level=2 check="18*pi"}
Compute the circulation $\oint_C\mathbf{F}\cdot d\mathbf{r}$ of $\mathbf{F} = (-y, x)$ around the circle of radius $3$ centred at the origin, traversed anticlockwise. Compare with the area of the disc.
::: solution
With $\mathbf{r}(t) = (3\cos t, 3\sin t)$: $\mathbf{F}\cdot\mathbf{r}' = (-3\sin t)(-3\sin t) + (3\cos t)(3\cos t) = 9$, so the circulation is $\int_0^{2\pi}9\,dt = 18\pi$ — exactly twice the area $9\pi$. Green's theorem explains why: $Q_x - P_y = 2$ everywhere.
:::
:::

::: exercise A radial field {level=2}
Show that $\mathbf{G}(x,y) = \left(\dfrac{x}{x^2+y^2}, \dfrac{y}{x^2+y^2}\right)$ is conservative on $\R^2\setminus\set{\mathbf{0}}$, although this set is not star-shaped. What is $\oint_C\mathbf{G}\cdot d\mathbf{r}$ around the unit circle?
::: solution
$f(x,y) = \tfrac12\ln(x^2+y^2)$ is $C^1$ on the punctured plane, with $f_x = \dfrac{x}{x^2+y^2}$ and $f_y = \dfrac{y}{x^2+y^2}$. So $\mathbf{G} = \nabla f$ is conservative, and every circulation is $0$; in particular $\oint_C\mathbf{G}\cdot d\mathbf{r} = 0$ around the unit circle (also directly: $\mathbf{G}$ is radial, hence perpendicular to the circle). The hole in the domain prevents the *test* $P_y = Q_x$ from guaranteeing a potential, but a potential may still exist.
:::
:::

::: exercise The angle function as a potential {level=3}
Let $D$ be the plane with the origin and the negative $x$-axis removed, and let $\theta\colon D\to(-\pi,\pi)$ be the polar angle. Show that $\theta$ is a $C^1$ potential for the vortex field on $D$. Deduce that the circulation of the vortex around any closed curve in $D$ is $0$, and that $\int_C\mathbf{F}\cdot d\mathbf{r} = \theta(B) - \theta(A)$ for any curve in $D$ from $A$ to $B$.
::: hint
On $D$ the angle can be written as $\theta = 2\arctan\dfrac{y}{x + \sqrt{x^2+y^2}}$.
:::
::: solution
For $(x,y)\in D$ we have $x + \sqrt{x^2+y^2} > 0$ (it vanishes only when $y = 0$ and $x\le0$), so $\theta = 2\arctan\frac{y}{x+\sqrt{x^2+y^2}}$ is $C^1$ on $D$. This formula gives the polar angle by the half-angle identity $\tan(\theta/2) = \frac{\sin\theta}{1+\cos\theta} = \frac{y}{r + x}$, with $\theta/2\in(-\pi/2,\pi/2)$. Differentiating $x = r\cos\theta$, $y = r\sin\theta$ implicitly (or differentiating the formula) gives $\theta_x = -y/(x^2+y^2)$ and $\theta_y = x/(x^2+y^2)$, so $\nabla\theta = \mathbf{F}$ on $D$. By [[#thm-ftli]], $\int_C\mathbf{F}\cdot d\mathbf{r} = \theta(B) - \theta(A)$ for curves in $D$, and this is $0$ when $C$ is closed. A closed curve that winds round the origin must cross the negative $x$-axis, so it does not lie in $D$ — consistent with the circulation $2\pi$ around the unit circle.
:::
:::

::: exercise The vortex around an ellipse {level=3 check="2*pi"}
Compute the circulation of the vortex field around the ellipse $\mathbf{r}(t) = (2\cos t, \sin t)$, $0\le t\le2\pi$.
::: hint
Either integrate $\dfrac{2}{4\cos^2t + \sin^2t}$ over $[0, 2\pi]$ (substitute $u = \tan t$ on each quarter), or use the interpretation of the integral as the total change of the polar angle.
:::
::: solution
$\mathbf{F}(\mathbf{r}(t)) = \dfrac{(-\sin t, 2\cos t)}{4\cos^2t + \sin^2t}$ and $\mathbf{r}'(t) = (-2\sin t, \cos t)$, so the integrand is $\dfrac{2\sin^2t + 2\cos^2t}{4\cos^2t + \sin^2t} = \dfrac{2}{4\cos^2t + \sin^2t}$. On $(-\pi/2, \pi/2)$ substitute $u = \tan t$: $\int\frac{2\,dt}{4\cos^2t + \sin^2t} = \int\frac{2\sec^2t\,dt}{4 + \tan^2t} = \int\frac{2\,du}{4 + u^2} = \arctan\frac u2$, which increases by $\pi$ as $u$ runs over $\R$. The other half is the same by periodicity, so the circulation is $2\pi$. Geometrically: along the ellipse the polar angle increases by exactly one full turn, $2\pi$, as for the circle.
:::
:::

::: exercise The star-shaped theorem in space {#exr-star-3d level=3}
Let $\mathbf{F} = (P, Q, R)$ be $C^1$ on $\R^3$ with $P_y = Q_x$, $P_z = R_x$ and $Q_z = R_y$. Prove that $f(\mathbf{x}) = \int_0^1\mathbf{F}(t\mathbf{x})\cdot\mathbf{x}\,dt$ is a potential for $\mathbf{F}$.
::: solution
Write $\mathbf{x} = (x,y,z)$ and evaluate $P, Q, R$ and their derivatives at $t\mathbf{x}$. Differentiating under the integral sign,

$$
\pdv{f}{x} = \int_0^1\Bigl(P + t\bigl(xP_x + yQ_x + zR_x\bigr)\Bigr)\,dt = \int_0^1\Bigl(P + t\bigl(xP_x + yP_y + zP_z\bigr)\Bigr)\,dt,
$$

using $Q_x = P_y$ and $R_x = P_z$. By the chain rule $\frac{d}{dt}P(t\mathbf{x}) = xP_x + yP_y + zP_z$ (evaluated at $t\mathbf{x}$), so the integrand is $\frac{d}{dt}\bigl(tP(t\mathbf{x})\bigr)$ and $\pdv{f}{x} = 1\cdot P(\mathbf{x}) - 0 = P(\mathbf{x})$. The same computation, using $P_y = Q_x$, $R_y = Q_z$ and then $P_z = R_x$, $Q_z = R_y$, gives $f_y = Q$ and $f_z = R$.
:::
:::
