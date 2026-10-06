You are standing on a hillside whose height above sea level is $z = f(x, y)$, where $x$ and $y$ are the east and north coordinates of your position. The partial derivatives $f_x$ and $f_y$ tell you how steep the ground is if you walk due east or due north. But you are free to walk in *any* direction. How steep is the path heading north-east? In which direction does the ground rise most steeply, and how steep is it there? In which directions can you walk without climbing at all?

All three questions have the same answer, packaged in a single vector: the **gradient** $\nabla f$. It points straight uphill, its length is the steepest slope, it is perpendicular to the contour lines of the map, and its dot product with any unit vector gives the slope in that direction. In this chapter we prove these facts, use the gradient to write down tangent planes to surfaces and linear approximations, meet a function that has a slope in every direction yet is not differentiable, and finish with gradient descent, the algorithm that trains most of modern machine learning.

Throughout, $f$ is a real-valued function on an open set $U \subseteq \R^n$, usually with $n = 2$ or $3$, and points of $\R^n$ are written as vectors $\mathbf{a}, \mathbf{x}$. We rely on the notion of differentiability and the chain rule from [[multivariable/partial-derivatives]].

## Directional derivatives

The partial derivative $f_x(\mathbf{a})$ is the rate of change of $f$ as we move from $\mathbf{a}$ in the direction of $\mathbf{i}$, and $f_y(\mathbf{a})$ the rate of change in the direction of $\mathbf{j}$. The obvious generalisation uses any direction, described by a unit vector.

::: definition Directional derivative {#def-directional}
Let $\mathbf{u}$ be a unit vector. The **directional derivative** of $f$ at $\mathbf{a}$ in the direction $\mathbf{u}$ is

$$
D_{\mathbf{u}}f(\mathbf{a}) = \lim_{h\to 0}\frac{f(\mathbf{a} + h\mathbf{u}) - f(\mathbf{a})}{h},
$$

provided the limit exists.
:::

Geometrically, $D_{\mathbf{u}}f(\mathbf{a})$ is the slope of the curve cut out of the graph of $f$ by the vertical plane through $\mathbf{a}$ in the direction $\mathbf{u}$: it is the ordinary derivative at $t = 0$ of the one-variable function $g(t) = f(\mathbf{a} + t\mathbf{u})$, which records the height of $f$ as you walk through $\mathbf{a}$ at unit speed in the direction $\mathbf{u}$. Taking $\mathbf{u} = \mathbf{i}$ or $\mathbf{j}$ gives back the partial derivatives: $D_{\mathbf{i}}f = f_x$, $D_{\mathbf{j}}f = f_y$. Taking $-\mathbf{u}$ in place of $\mathbf{u}$ reverses the sign: $D_{-\mathbf{u}}f(\mathbf{a}) = -D_{\mathbf{u}}f(\mathbf{a})$ (substitute $h \mapsto -h$ in the limit).

Why insist that $\mathbf{u}$ is a unit vector? Because we want a rate of change *per unit distance*. If we used $2\mathbf{u}$, we would be walking twice as fast and the limit would double.

::: example A directional derivative from the definition {#ex-directional}
Let $f(x, y) = x^2 + 3xy$. Find the directional derivative of $f$ at $(1, 2)$ in the direction of $\mathbf{u} = \left(\tfrac35, \tfrac45\right)$.
::: solution
First, $\norm{\mathbf{u}} = \sqrt{9/25 + 16/25} = 1$, so $\mathbf{u}$ is a unit vector. We have $f(1, 2) = 1 + 6 = 7$ and

$$
\begin{aligned}
f\left(1 + \tfrac{3h}{5},\, 2 + \tfrac{4h}{5}\right) &= \left(1 + \tfrac{3h}{5}\right)^2 + 3\left(1 + \tfrac{3h}{5}\right)\left(2 + \tfrac{4h}{5}\right) \\
&= 1 + \tfrac{6h}{5} + \tfrac{9h^2}{25} + 6 + 6h + \tfrac{36h^2}{25} = 7 + \tfrac{36}{5}h + \tfrac{9}{5}h^2 .
\end{aligned}
$$

Hence

$$
D_{\mathbf{u}}f(1,2) = \lim_{h\to0}\frac{\tfrac{36}{5}h + \tfrac95 h^2}{h} = \lim_{h\to0}\left(\tfrac{36}{5} + \tfrac95 h\right) = \frac{36}{5}.
$$

Notice that $f_x = 2x + 3y = 8$ and $f_y = 3x = 3$ at $(1,2)$, and $8\cdot\tfrac35 + 3\cdot\tfrac45 = \tfrac{24 + 12}{5} = \tfrac{36}{5}$. This is no coincidence, as we now prove.
:::
:::

## The gradient

::: definition Gradient {#def-gradient}
If the partial derivatives of $f$ exist at $\mathbf{a} \in \R^n$, the **gradient** of $f$ at $\mathbf{a}$ is the vector of partial derivatives

$$
\nabla f(\mathbf{a}) = \left(\pdv{f}{x_1}(\mathbf{a}),\, \pdv{f}{x_2}(\mathbf{a}),\, \dots,\, \pdv{f}{x_n}(\mathbf{a})\right).
$$

For $n = 3$ this is $\nabla f = (f_x, f_y, f_z) = f_x\,\mathbf{i} + f_y\,\mathbf{j} + f_z\,\mathbf{k}$. The symbol $\nabla$ is read "nabla" or "del".
:::

The gradient is the $1\times n$ derivative matrix $Df(\mathbf{a})$ of [[multivariable/partial-derivatives]] written as a vector. Recall from [[multivariable/partial-derivatives#def-differentiable]] that $f$ is **differentiable** at $\mathbf{a}$ if it has a good linear approximation there; for a real-valued function this says precisely that

$$
f(\mathbf{a} + \mathbf{h}) = f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h} + R(\mathbf{h}), \qquad\text{where}\quad \frac{R(\mathbf{h})}{\norm{\mathbf{h}}} \to 0 \text{ as } \mathbf{h}\to\mathbf{0}.
$$ {#eq-differentiable}

By [[multivariable/partial-derivatives#thm-c1-differentiable]], this holds whenever the partial derivatives exist near $\mathbf{a}$ and are continuous at $\mathbf{a}$ — which covers every function built from polynomials, exponentials, trigonometric functions and so on, away from points where a formula breaks down.

::: theorem Directional derivatives from the gradient {#thm-directional-gradient}
If $f$ is differentiable at $\mathbf{a}$, then for every unit vector $\mathbf{u}$ the directional derivative exists and

$$
D_{\mathbf{u}}f(\mathbf{a}) = \nabla f(\mathbf{a})\cdot\mathbf{u}.
$$
:::

::: proof
Put $\mathbf{h} = t\mathbf{u}$ in [[#eq-differentiable]], where $t \ne 0$ is small. Since $\norm{t\mathbf{u}} = \abs{t}$,

$$
\frac{f(\mathbf{a} + t\mathbf{u}) - f(\mathbf{a})}{t} = \nabla f(\mathbf{a})\cdot\mathbf{u} + \frac{R(t\mathbf{u})}{t}, \qquad \abs{\frac{R(t\mathbf{u})}{t}} = \frac{\abs{R(t\mathbf{u})}}{\norm{t\mathbf{u}}} .
$$

As $t \to 0$ we have $t\mathbf{u}\to\mathbf{0}$, so the last quantity tends to $0$ by differentiability. Hence the difference quotient tends to $\nabla f(\mathbf{a})\cdot\mathbf{u}$.
:::

(Equivalently: $g(t) = f(\mathbf{a} + t\mathbf{u})$ is a composition, and the chain rule [[multivariable/partial-derivatives#thm-chain-rule]] gives $g'(0) = \nabla f(\mathbf{a})\cdot\mathbf{u}$.)

So one vector of $n$ numbers encodes the slopes in *all* directions. Combining this with the geometry of the dot product answers the hiker's question.

::: theorem The gradient is the direction of steepest ascent {#thm-steepest}
Let $f$ be differentiable at $\mathbf{a}$ with $\nabla f(\mathbf{a}) \ne \mathbf{0}$. As $\mathbf{u}$ ranges over unit vectors:

1. the largest value of $D_{\mathbf{u}}f(\mathbf{a})$ is $\norm{\nabla f(\mathbf{a})}$, attained only for $\mathbf{u} = \nabla f(\mathbf{a})/\norm{\nabla f(\mathbf{a})}$;
2. the smallest value is $-\norm{\nabla f(\mathbf{a})}$, attained only in the opposite direction;
3. $D_{\mathbf{u}}f(\mathbf{a}) = 0$ exactly when $\mathbf{u}$ is orthogonal to $\nabla f(\mathbf{a})$.
:::

::: proof
By [[#thm-directional-gradient]] and the Cauchy–Schwarz inequality ([[multivariable/vectors-geometry#thm-cauchy-schwarz]]),

$$
\abs{D_{\mathbf{u}}f(\mathbf{a})} = \abs{\nabla f(\mathbf{a})\cdot\mathbf{u}} \le \norm{\nabla f(\mathbf{a})}\,\norm{\mathbf{u}} = \norm{\nabla f(\mathbf{a})},
$$

so every directional derivative lies in $[-\norm{\nabla f(\mathbf{a})}, \norm{\nabla f(\mathbf{a})}]$. Equality in Cauchy–Schwarz holds only when $\mathbf{u}$ is a multiple of $\nabla f(\mathbf{a})$; the unit multiples are $\pm\nabla f(\mathbf{a})/\norm{\nabla f(\mathbf{a})}$, giving the values $\pm\norm{\nabla f(\mathbf{a})}$. This proves (1) and (2). Statement (3) is immediate from $D_{\mathbf{u}}f(\mathbf{a}) = \nabla f(\mathbf{a})\cdot\mathbf{u}$.
:::

In the language of [[multivariable/vectors-geometry#thm-dot-geometric]]: $D_{\mathbf{u}}f(\mathbf{a}) = \norm{\nabla f(\mathbf{a})}\cos\theta$, where $\theta$ is the angle between $\mathbf{u}$ and the gradient. The slope is greatest at $\theta = 0$, zero at $\theta = \pi/2$ and most negative at $\theta = \pi$.

::: example The steepest way up a hill {#ex-hill}
A hill has height $f(x, y) = 4 - x^2 - 2y^2$. A walker stands at $(1, 1)$. Find the direction of steepest ascent and the slope in that direction, the directions in which the walker stays at the same height, and the slope of the path that heads straight for the summit.
::: solution
$\nabla f = (-2x, -4y)$, so $\nabla f(1,1) = (-2, -4)$. The steepest ascent is in the direction $\mathbf{u} = (-2,-4)/\sqrt{20} = (-1,-2)/\sqrt5$, with slope $\norm{\nabla f(1,1)} = \sqrt{20} = 2\sqrt5 \approx 4.47$.

The level directions are the unit vectors orthogonal to $(-2,-4)$, namely $\pm(2,-1)/\sqrt5$.

The summit is at the origin (where $\nabla f = \mathbf{0}$). The direction from $(1,1)$ towards it is $\mathbf{v} = (-1,-1)/\sqrt2$, and

$$
D_{\mathbf{v}}f(1,1) = (-2,-4)\cdot\frac{(-1,-1)}{\sqrt2} = \frac{6}{\sqrt2} = 3\sqrt2 \approx 4.24 .
$$

Heading straight for the summit is *not* the steepest way up: because the hill is steeper in the $y$-direction, the steepest path initially bends towards the $x$-axis. ([[#exr-steepest-path]] finds the whole path of steepest descent on a similar surface.)
:::
:::

::: widget contour
f: x*exp(-x^2 - y^2)
x: -2, 2
y: -2, 2
levels: 16
gradient: true
point: 0.3, 0.6
caption: Contours of $f(x,y) = x e^{-x^2-y^2}$, a hill on the right and a hollow on the left. Drag the point. The gradient arrow is always perpendicular to the contour through the point and points uphill; it is long where the contours are crowded (steep ground) and shrinks to zero at the summit $(1/\sqrt2, 0)$ and the bottom of the hollow $(-1/\sqrt2, 0)$. Read off the directional derivative as you rotate the direction: it is largest along the gradient and zero along the contour.
:::

::: quiz
At a point $\mathbf{a}$ a differentiable function has $\nabla f(\mathbf{a}) = (3, -4)$. What is the greatest rate of increase of $f$ at $\mathbf{a}$, per unit distance?
- [ ] $-1$
- [ ] $7$
- [x] $5$
- [ ] $25$
::: solution
By [[#thm-steepest]] the greatest directional derivative is $\norm{\nabla f(\mathbf{a})} = \sqrt{3^2 + 4^2} = 5$, attained in the direction $(3,-4)/5$. The sum of the components, $-1$, is the derivative in the non-unit direction $(1,1)$, and $7 = 3 + 4$ is not a directional derivative in any unit direction (it exceeds $5$).
:::
:::

## Gradients and level sets

A **level set** of $f$ is a set $\set{\mathbf{x} : f(\mathbf{x}) = c}$: a contour line on a map when $n = 2$, a surface such as a sphere when $n = 3$. Moving along a level set, $f$ does not change, so the rate of change of $f$ along the level set is zero. Combined with [[#thm-steepest]](3), this suggests that the gradient is perpendicular to level sets. The chain rule makes this precise.

::: theorem The gradient is normal to level sets {#thm-gradient-normal}
Let $f$ be differentiable on an open set containing a level set $S = \set{\mathbf{x} : f(\mathbf{x}) = c}$, and let $\mathbf{r}\colon I \to \R^n$ be a differentiable curve lying in $S$ with $\mathbf{r}(t_0) = \mathbf{a}$. Then

$$
\nabla f(\mathbf{a})\cdot\mathbf{r}'(t_0) = 0 .
$$

That is, $\nabla f(\mathbf{a})$ is orthogonal to the velocity of every curve in the level set through $\mathbf{a}$.
:::

::: proof
Since $\mathbf{r}(t)$ lies in $S$ for all $t \in I$, the function $g(t) = f(\mathbf{r}(t))$ is constantly equal to $c$, so $g'(t_0) = 0$. On the other hand, by the chain rule ([[multivariable/partial-derivatives#thm-chain-rule]]), $g'(t_0) = \nabla f(\mathbf{r}(t_0))\cdot\mathbf{r}'(t_0) = \nabla f(\mathbf{a})\cdot\mathbf{r}'(t_0)$.
:::

On a topographic map, then, the gradient of the height function crosses the contour lines at right angles, and water running downhill (along $-\nabla f$) follows paths that cut every contour perpendicularly. Crowded contours mean a large gradient: if neighbouring contours differ in height by $\Delta c$ and are a distance $\Delta s$ apart, the steepest slope is roughly $\Delta c/\Delta s$.

### Tangent planes

For a surface in $\R^3$ given as a level set $F(x, y, z) = c$, [[#thm-gradient-normal]] says that every curve on the surface through $\mathbf{a}$ moves, at $\mathbf{a}$, perpendicular to $\nabla F(\mathbf{a})$. All these velocity vectors lie in one plane, which is the natural candidate for the plane that "touches" the surface.

::: definition Tangent plane and normal line {#def-tangent-plane}
Let $F$ be differentiable near a point $\mathbf{a}$ of the level surface $S\colon F(x,y,z) = c$, with $\nabla F(\mathbf{a}) \ne \mathbf{0}$. The **tangent plane** to $S$ at $\mathbf{a} = (a_1, a_2, a_3)$ is the plane through $\mathbf{a}$ with normal $\nabla F(\mathbf{a})$:

$$
F_x(\mathbf{a})(x - a_1) + F_y(\mathbf{a})(y - a_2) + F_z(\mathbf{a})(z - a_3) = 0 ,
$$

and the **normal line** to $S$ at $\mathbf{a}$ is the line $\mathbf{a} + t\,\nabla F(\mathbf{a})$, $t\in\R$.
:::

The condition $\nabla F(\mathbf{a}) \ne \mathbf{0}$ matters: at the vertex of the cone $x^2 + y^2 - z^2 = 0$ the gradient $(2x, 2y, -2z)$ vanishes, and indeed no plane touches the cone there. When the gradient is non-zero, the implicit function theorem ([[multivariable/partial-derivatives#thm-implicit]]) shows that near $\mathbf{a}$ the level set really is a smooth surface and that *every* vector of the tangent plane is the velocity of some curve in it; this is taken up carefully in [[differential-geometry/regular-surfaces]].

A **graph** $z = f(x, y)$ is the level set $F(x, y, z) = f(x, y) - z = 0$, and $\nabla F = (f_x, f_y, -1)$ is never zero. The definition gives $f_x(a,b)(x - a) + f_y(a,b)(y - b) - (z - f(a,b)) = 0$, that is,

$$
z = f(a, b) + f_x(a, b)\,(x - a) + f_y(a, b)\,(y - b).
$$ {#eq-tangent-plane}

Note the familiar shape: it is the tangent line $y = f(a) + f'(a)(x-a)$ of one-variable calculus with one slope for each variable. The traces of this plane in the planes $y = b$ and $x = a$ are the tangent lines to the curves $z = f(x, b)$ and $z = f(a, y)$, whose slopes are $f_x(a,b)$ and $f_y(a,b)$.

::: example A tangent plane to an ellipsoid {#ex-tangent-ellipsoid}
Find the tangent plane and the normal line to the ellipsoid $x^2 + 2y^2 + 3z^2 = 6$ at the point $(1,1,1)$.
::: solution
The point lies on the surface since $1 + 2 + 3 = 6$. With $F = x^2 + 2y^2 + 3z^2$ we have $\nabla F = (2x, 4y, 6z)$, so $\nabla F(1,1,1) = (2, 4, 6)$. The tangent plane is

$$
2(x - 1) + 4(y - 1) + 6(z - 1) = 0, \qquad\text{i.e.}\qquad x + 2y + 3z = 6,
$$

and the normal line is $(x, y, z) = (1 + 2t,\, 1 + 4t,\, 1 + 6t)$, or more simply $(1,1,1) + s(1,2,3)$.
:::
:::

::: example A tangent plane to a graph {#ex-tangent-graph}
Find the tangent plane to the surface $z = x e^{xy}$ at the point where $(x, y) = (1, 0)$.
::: solution
Here $f(1,0) = 1$, $f_x = e^{xy} + xy\,e^{xy}$ and $f_y = x^2e^{xy}$, so $f_x(1,0) = 1$ and $f_y(1,0) = 1$. By [[#eq-tangent-plane]],

$$
z = 1 + (x - 1) + (y - 0) = x + y .
$$

Near $(1,0)$ the surface is closely approximated by the plane $z = x + y$; for instance $f(1.1, -0.05) = 1.1\,e^{-0.055} \approx 1.0411$, while the plane gives $1.05$.
:::
:::

::: widget surface
f: x*y*exp(-(x^2 + y^2)/2)
x: -2.5, 2.5
y: -2.5, 2.5
tangent: 1, 0.5
color: height
caption: The graph of $f(x,y) = xy\,e^{-(x^2+y^2)/2}$ with its tangent plane at $(1, 0.5)$. Rotate the view until you look along the plane edge-on: near the point of contact the surface and the plane are indistinguishable, and they separate only quadratically as you move away. At the four bumps the tangent plane is horizontal, because the gradient vanishes there.
:::

## Linear approximation and differentials

The tangent plane is the graph of the **linearisation** of $f$ at $\mathbf{a}$,

$$
L(\mathbf{x}) = f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot(\mathbf{x} - \mathbf{a}),
$$ {#eq-linearisation}

and [[#eq-differentiable]] says exactly that $f(\mathbf{x}) - L(\mathbf{x})$ is small compared with $\norm{\mathbf{x} - \mathbf{a}}$. So for $\mathbf{x}$ near $\mathbf{a}$ we have the **linear approximation** $f(\mathbf{x}) \approx L(\mathbf{x})$. In the older notation of **differentials**, writing $dx, dy, dz$ for small changes in the variables, the corresponding change in $f$ is approximately

$$
df = f_x\,dx + f_y\,dy + f_z\,dz = \nabla f\cdot d\mathbf{x}.
$$

::: example A linear approximation {#ex-linear-approx}
Estimate $\sqrt{(3.02)^2 + (3.97)^2}$ without a calculator.
::: solution
Let $f(x,y) = \sqrt{x^2 + y^2}$ and $\mathbf{a} = (3, 4)$, where $f(\mathbf{a}) = 5$. Then $f_x = x/\sqrt{x^2+y^2}$ and $f_y = y/\sqrt{x^2+y^2}$, so $\nabla f(3,4) = \left(\tfrac35, \tfrac45\right)$. With $dx = 0.02$ and $dy = -0.03$,

$$
f(3.02, 3.97) \approx 5 + \tfrac35(0.02) + \tfrac45(-0.03) = 5 + 0.012 - 0.024 = 4.988 .
$$

The true value is $4.98812\ldots$, so the error is about $10^{-4}$ — of the order of the squares of the increments, as expected from a first-order approximation.
:::
:::

::: example Propagation of measurement errors {#ex-error}
The radius and height of a cylindrical tank are measured as $r = 3$ m and $h = 10$ m, with possible errors of at most $0.02$ m in $r$ and $0.05$ m in $h$. Estimate the largest possible error in the computed volume $V = \pi r^2 h$.
::: solution
$dV = V_r\,dr + V_h\,dh = 2\pi rh\,dr + \pi r^2\,dh$. The error is largest when both terms have the same sign, so

$$
\abs{dV} \le 2\pi(3)(10)(0.02) + \pi(9)(0.05) = 1.2\pi + 0.45\pi = 1.65\pi \approx 5.2 \text{ m}^3 .
$$

Since $V = 90\pi \approx 283$ m³, the relative error is about $1.83\%$. A useful shortcut: taking logarithms, $\ln V = \ln\pi + 2\ln r + \ln h$, so $\dfrac{dV}{V} = 2\dfrac{dr}{r} + \dfrac{dh}{h} = 2\cdot\dfrac{0.02}{3} + \dfrac{0.05}{10} \approx 0.0183$: relative errors add, weighted by the powers.
:::
:::

::: application Error analysis in the laboratory
The rule in [[#ex-error]] is the basis of error propagation in experimental science: if a quantity is computed as $Q = k\,x^\alpha y^\beta z^\gamma$ from measured values, its relative error is at most $\abs{\alpha}\frac{\abs{dx}}{x} + \abs{\beta}\frac{\abs{dy}}{y} + \abs{\gamma}\frac{\abs{dz}}{z}$ to first order. It shows which measurement deserves the most care: the one whose error is multiplied by the largest power. When the errors are independent and random rather than worst-case, statisticians add their squares instead ([[statistics/estimation]]).
:::

## When slopes in every direction are not enough

[[#thm-directional-gradient]] requires $f$ to be differentiable. It is tempting to think that if all the directional derivatives exist, then $f$ is automatically differentiable and the formula holds. It is not so.

::: example Directional derivatives that are not linear {#ex-not-differentiable}
Let $f(x, y) = \dfrac{x^2y}{x^2 + y^2}$ for $(x,y) \ne (0,0)$ and $f(0,0) = 0$. Show that $f$ is continuous and has a directional derivative in every direction at the origin, but is not differentiable there.
::: solution
*Continuity.* Since $x^2 \le x^2 + y^2$, we have $\abs{f(x,y)} \le \abs{y} \to 0$ as $(x,y)\to(0,0)$.

*Directional derivatives.* For a unit vector $\mathbf{u} = (u_1, u_2)$ and $h \ne 0$,

$$
\frac{f(hu_1, hu_2) - f(0,0)}{h} = \frac{1}{h}\cdot\frac{h^3u_1^2u_2}{h^2(u_1^2 + u_2^2)} = u_1^2u_2 ,
$$

so $D_{\mathbf{u}}f(0,0) = u_1^2u_2$ exists for every $\mathbf{u}$. In particular $f_x(0,0) = 0$ ($\mathbf{u} = \mathbf{i}$) and $f_y(0,0) = 0$ ($\mathbf{u} = \mathbf{j}$), so $\nabla f(0,0) = \mathbf{0}$.

*Not differentiable.* If $f$ were differentiable at the origin, [[#thm-directional-gradient]] would give $D_{\mathbf{u}}f(0,0) = \nabla f(0,0)\cdot\mathbf{u} = 0$ for every $\mathbf{u}$. But for $\mathbf{u} = (1,1)/\sqrt2$ we found $D_{\mathbf{u}}f(0,0) = \tfrac12\cdot\tfrac{1}{\sqrt2} \ne 0$. So $f$ is not differentiable at the origin. Geometrically, the graph has a tangent *line* in every vertical plane through the origin, but these lines do not lie in a common plane.
:::
:::

The defect is that $\mathbf{u} \mapsto D_{\mathbf{u}}f(\mathbf{a})$ is not linear. Worse examples exist: the function $x^2y/(x^4 + y^2)$ of [[multivariable/partial-derivatives]] has directional derivatives in every direction at the origin (equal to $u_1^2/u_2$ if $u_2 \ne 0$, and $0$ if $u_2 = 0$), yet it is not even continuous there, since it equals $\tfrac12$ along the parabola $y = x^2$.

::: warning Check differentiability before using ∇f · u
The formula $D_{\mathbf{u}}f = \nabla f\cdot\mathbf{u}$ is a theorem about *differentiable* functions. At a point where differentiability fails (typically where a formula is defined piecewise, or involves $\abs{\cdot}$ or fractional powers), compute directional derivatives from [[#def-directional]] instead. For functions with continuous partial derivatives — almost everything you will meet — the formula is safe.
:::

::: quiz
Suppose every directional derivative $D_{\mathbf{u}}f(\mathbf{a})$ exists. Which conclusion is justified?
- [ ] $f$ is differentiable at $\mathbf{a}$
- [ ] $f$ is continuous at $\mathbf{a}$
- [ ] $D_{\mathbf{u}}f(\mathbf{a}) = \nabla f(\mathbf{a})\cdot\mathbf{u}$ for all unit $\mathbf{u}$
- [x] The partial derivatives of $f$ exist at $\mathbf{a}$, so $\nabla f(\mathbf{a})$ is defined
::: solution
The partial derivatives are the directional derivatives in the directions of the coordinate axes, so they exist and $\nabla f(\mathbf{a})$ makes sense. Nothing more follows: [[#ex-not-differentiable]] is continuous but not differentiable, and $x^2y/(x^4+y^2)$ is not even continuous, although both have all directional derivatives at the origin; in both, $D_{\mathbf{u}}f \ne \nabla f\cdot\mathbf{u}$ for some $\mathbf{u}$.
:::
:::

## The mean value theorem in several variables

The one-variable mean value theorem ([[calculus-1/mean-value-theorem]]) transfers to several variables along line segments. Write $[\mathbf{a}, \mathbf{b}] = \set{\mathbf{a} + t(\mathbf{b} - \mathbf{a}) : 0 \le t \le 1}$ for the segment joining $\mathbf{a}$ and $\mathbf{b}$.

::: theorem Mean value theorem {#thm-mvt}
Let $f$ be differentiable on an open set $U$ containing the segment $[\mathbf{a}, \mathbf{b}]$. Then there is a point $\mathbf{c}$ on the segment, strictly between $\mathbf{a}$ and $\mathbf{b}$, such that

$$
f(\mathbf{b}) - f(\mathbf{a}) = \nabla f(\mathbf{c})\cdot(\mathbf{b} - \mathbf{a}).
$$
:::

::: proof
Let $g(t) = f(\mathbf{a} + t(\mathbf{b} - \mathbf{a}))$ for $t$ in an open interval containing $[0,1]$ (it exists because $U$ is open). By the chain rule $g$ is differentiable with $g'(t) = \nabla f(\mathbf{a} + t(\mathbf{b}-\mathbf{a}))\cdot(\mathbf{b} - \mathbf{a})$; in particular $g$ is continuous on $[0,1]$. The one-variable mean value theorem gives $t_0 \in (0,1)$ with $g(1) - g(0) = g'(t_0)$. Since $g(1) = f(\mathbf{b})$ and $g(0) = f(\mathbf{a})$, the point $\mathbf{c} = \mathbf{a} + t_0(\mathbf{b} - \mathbf{a})$ works.
:::

::: corollary Zero gradient means constant {#cor-constant}
Let $f$ be differentiable on an open convex set $U$ (one that contains the segment between any two of its points). If $\nabla f = \mathbf{0}$ on $U$, then $f$ is constant on $U$. If $\norm{\nabla f} \le M$ on $U$, then $\abs{f(\mathbf{b}) - f(\mathbf{a})} \le M\norm{\mathbf{b} - \mathbf{a}}$ for all $\mathbf{a}, \mathbf{b} \in U$.
:::

::: proof
For $\mathbf{a}, \mathbf{b}\in U$, [[#thm-mvt]] and Cauchy–Schwarz give $\abs{f(\mathbf{b}) - f(\mathbf{a})} = \abs{\nabla f(\mathbf{c})\cdot(\mathbf{b}-\mathbf{a})} \le \norm{\nabla f(\mathbf{c})}\norm{\mathbf{b}-\mathbf{a}}$, which is $0$ in the first case and at most $M\norm{\mathbf{b}-\mathbf{a}}$ in the second.
:::

The first statement holds more generally on any *connected* open set, since any two of its points can be joined by a path of finitely many segments inside it (see [[topology/connectedness]]); on a set made of two separate pieces, $f$ could take a different constant value on each. This corollary is what makes potential functions unique up to a constant in [[multivariable/line-integrals]].

## Gradient descent

Since $-\nabla f$ points in the direction of steepest *descent*, a natural way to search for a minimum of $f$ is to take repeated small steps downhill:

$$
\mathbf{x}_{k+1} = \mathbf{x}_k - \eta\,\nabla f(\mathbf{x}_k), \qquad k = 0, 1, 2, \dots
$$ {#eq-gd}

where the **step size** (or **learning rate**) $\eta > 0$ is chosen by the user. Each step decreases $f$ if $\eta$ is small enough: by the linear approximation, $f(\mathbf{x}_{k+1}) \approx f(\mathbf{x}_k) - \eta\norm{\nabla f(\mathbf{x}_k)}^2$. But "small enough" is a real constraint, as the next example shows.

::: example Gradient descent on an elongated bowl {#ex-gd}
Apply [[#eq-gd]] to $f(x, y) = x^2 + 10y^2$. For which step sizes $\eta$ do the iterates converge to the minimum at the origin, from every starting point?
::: solution
Here $\nabla f = (2x, 20y)$, so the iteration is

$$
x_{k+1} = x_k - 2\eta x_k = (1 - 2\eta)\,x_k, \qquad y_{k+1} = (1 - 20\eta)\,y_k ,
$$

and therefore $x_k = (1-2\eta)^k x_0$ and $y_k = (1-20\eta)^k y_0$. Both tend to $0$ for all starting points exactly when $\abs{1 - 2\eta} < 1$ and $\abs{1 - 20\eta} < 1$, that is, when $0 < \eta < 0.1$. For $\eta = 0.09$, say, the factors are $0.82$ and $-0.8$: the $y$-coordinate flips sign at every step, so the iterates zigzag across the narrow valley while creeping slowly along it. For $\eta > 0.1$ the $y$-coordinates grow and the method diverges. The steep direction limits the step size, and the shallow direction then converges slowly — the basic difficulty of gradient descent on badly scaled problems.
:::
:::

::: widget gradientdescent
f: x^2 + 10y^2
start: 2.5, 1
rate: 0.09
steps: 30
method: gd
x: -3, 3
y: -1.5, 1.5
caption: Gradient descent on $f = x^2 + 10y^2$. With learning rate $0.09$ the path zigzags across the valley, as predicted in [[#ex-gd]]. Try $0.05$ (smooth but slow), $0.099$ (violent zigzag) and $0.11$ (divergence: the loss curve shoots up). Each step leaves the current contour at right angles, because it moves along $-\nabla f$.
:::

::: application Training neural networks
A neural network is a function with millions of adjustable parameters $\mathbf{w}$, and training it means minimising a loss $f(\mathbf{w})$ that measures its errors on example data. The workhorse algorithm is gradient descent [[#eq-gd]] and its variants (stochastic gradient descent, momentum, Adam). The gradient itself is computed by the chain rule organised efficiently, an algorithm called back-propagation. Choosing the learning rate, and the zigzagging of [[#ex-gd]], are everyday concerns of practitioners; a curvature-aware alternative, Newton's method, uses the second derivatives of [[multivariable/extrema]].
:::

::: history
The operator $\nabla$ grew out of William Rowan Hamilton's work on quaternions in the 1840s, where he used it (drawn as a sideways triangle) to combine the three partial derivatives into one symbol. Peter Guthrie Tait developed its use, and the name "nabla", after the shape of an ancient harp, is said to have been suggested to him by his friend the biblical scholar William Robertson Smith. In the vector analysis of Gibbs and Heaviside in the 1880s, $\nabla f$ became the gradient vector we use today. The method of steepest descent is older than the notation: in an 1847 note to the Paris Academy, Augustin-Louis Cauchy proposed reducing a function step by step along the direction of fastest decrease, as a way of solving the systems of equations that arise in computing planetary orbits. More than 170 years later, variants of Cauchy's method train the largest computer models in existence.
:::

## Where this leads

The gradient is the first derivative of a function of several variables; [[multivariable/extrema]] adds the second derivative (the Hessian matrix), finds maxima and minima where $\nabla f = \mathbf{0}$, and uses [[#thm-gradient-normal]] to derive the method of Lagrange multipliers for optimisation under a constraint $g = c$. Gradient fields $\mathbf{F} = \nabla f$ are the conservative vector fields of [[multivariable/line-integrals]], where the fundamental theorem for line integrals, $\int_C\nabla f\cdot d\mathbf{r} = f(B) - f(A)$, plays the role of the fundamental theorem of calculus, and $\nabla$ reappears as the divergence $\nabla\cdot\mathbf{F}$ and curl $\nabla\times\mathbf{F}$ in [[multivariable/stokes-divergence]]. Tangent planes and unit normals are the starting point of the geometry of surfaces in [[differential-geometry/regular-surfaces]]. On a quadratic bowl, gradient descent is a stationary linear iteration, and its convergence is governed by the spectral radius studied in [[numerical-analysis/iterative-methods]].

::: summary
- The directional derivative $D_{\mathbf{u}}f(\mathbf{a})$ is the rate of change of $f$ at $\mathbf{a}$ per unit distance in the direction of the unit vector $\mathbf{u}$ ([[#def-directional]]).
- The gradient $\nabla f = (f_{x_1}, \dots, f_{x_n})$ collects the partial derivatives. For differentiable $f$, $D_{\mathbf{u}}f = \nabla f\cdot\mathbf{u}$ ([[#thm-directional-gradient]]).
- $\nabla f$ points in the direction of steepest ascent, and $\norm{\nabla f}$ is the steepest slope; $-\nabla f$ is the direction of steepest descent ([[#thm-steepest]]).
- $\nabla f$ is perpendicular to level curves and level surfaces ([[#thm-gradient-normal]]). The tangent plane to $F = c$ at $\mathbf{a}$ is $\nabla F(\mathbf{a})\cdot(\mathbf{x} - \mathbf{a}) = 0$; for a graph, $z = f(a,b) + f_x(x-a) + f_y(y-b)$.
- The linearisation $f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot(\mathbf{x}-\mathbf{a})$ gives linear approximations and first-order error estimates.
- Existence of all directional derivatives does not imply differentiability, or even continuity.
- The mean value theorem $f(\mathbf{b}) - f(\mathbf{a}) = \nabla f(\mathbf{c})\cdot(\mathbf{b}-\mathbf{a})$ implies that $\nabla f = \mathbf{0}$ on a connected open set forces $f$ to be constant.
- Gradient descent $\mathbf{x}_{k+1} = \mathbf{x}_k - \eta\nabla f(\mathbf{x}_k)$ needs a small enough step size; badly scaled problems make it zigzag.
:::

## Exercises

::: exercise A directional derivative {level=1 check="8/3"}
Let $f(x,y,z) = xy^2 + z e^x$. Find the directional derivative of $f$ at $(0, 1, 2)$ in the direction of the vector $(2, -1, 2)$.
::: solution
$\nabla f = (y^2 + ze^x,\; 2xy,\; e^x)$, so $\nabla f(0,1,2) = (1 + 2,\, 0,\, 1) = (3, 0, 1)$. The vector $(2,-1,2)$ has length $3$, so $\mathbf{u} = \tfrac13(2,-1,2)$ and

$$
D_{\mathbf{u}}f(0,1,2) = (3,0,1)\cdot\tfrac13(2,-1,2) = \tfrac13(6 + 0 + 2) = \tfrac83 .
$$
:::
:::

::: exercise The steepest slope {level=1 check="sqrt(185)"}
Find the maximum rate of change of $f(x,y) = x^2y + y^3$ at the point $(1, 2)$, and the direction in which it occurs.
::: solution
$\nabla f = (2xy,\; x^2 + 3y^2)$, so $\nabla f(1,2) = (4, 13)$. The maximum rate of change is $\norm{(4,13)} = \sqrt{16 + 169} = \sqrt{185} \approx 13.6$, in the direction $(4,13)/\sqrt{185}$.
:::
:::

::: exercise A tangent plane to a graph {level=1}
Find the tangent plane to $z = x^2 + xy$ at the point $(1, 2, 3)$.
::: solution
$f_x = 2x + y$ and $f_y = x$, so $f_x(1,2) = 4$ and $f_y(1,2) = 1$. By [[#eq-tangent-plane]], $z = 3 + 4(x - 1) + (y - 2)$, that is, $z = 4x + y - 3$.
:::
:::

::: exercise A linear approximation {level=2 check="15.58"}
Use a linear approximation to estimate $(1.98)^3\sqrt{4.03}$.
::: solution
Let $f(x,y) = x^3\sqrt{y}$ near $(2, 4)$, where $f = 8\cdot 2 = 16$. Then $f_x = 3x^2\sqrt y = 24$ and $f_y = \dfrac{x^3}{2\sqrt y} = 2$ at $(2,4)$. With $dx = -0.02$, $dy = 0.03$:

$$
f(1.98, 4.03) \approx 16 + 24(-0.02) + 2(0.03) = 16 - 0.48 + 0.06 = 15.58 .
$$

(The exact value is $15.5829\ldots$)
:::
:::

::: exercise Error in a pendulum's period {level=2 check="0.75"}
The period of a simple pendulum is $T = 2\pi\sqrt{L/g}$. If $L$ is measured with a relative error of at most $1\%$ and $g$ with a relative error of at most $0.5\%$, estimate the largest possible relative error in $T$, in per cent.
::: solution
$\ln T = \ln 2\pi + \tfrac12\ln L - \tfrac12\ln g$, so $\dfrac{dT}{T} = \dfrac12\dfrac{dL}{L} - \dfrac12\dfrac{dg}{g}$. In the worst case the two terms have the same sign: $\abs{dT/T} \le \tfrac12(1\%) + \tfrac12(0.5\%) = 0.75\%$.
:::
:::

::: exercise Parallel tangent planes {level=2}
Find the points of the ellipsoid $x^2 + 2y^2 + 3z^2 = 12$ at which the tangent plane is parallel to the plane $x + 4y + 6z = 0$, and the equations of these tangent planes.
::: solution
The normal $\nabla F = (2x, 4y, 6z)$ must be parallel to $(1, 4, 6)$: $2x = \lambda$, $4y = 4\lambda$, $6z = 6\lambda$, so $(x,y,z) = (\lambda/2, \lambda, \lambda)$. Substituting, $\tfrac{\lambda^2}{4} + 2\lambda^2 + 3\lambda^2 = \tfrac{21}{4}\lambda^2 = 12$, so $\lambda = \pm\tfrac{4}{\sqrt7}$. The points are $\pm\left(\tfrac{2}{\sqrt7}, \tfrac{4}{\sqrt7}, \tfrac{4}{\sqrt7}\right)$, and the tangent planes are $x + 4y + 6z = \pm\tfrac{2 + 16 + 24}{\sqrt7} = \pm 6\sqrt7$.
:::
:::

::: exercise Tangent planes to a cone {level=2}
Show that every tangent plane to the cone $z^2 = x^2 + y^2$ at a point other than the vertex passes through the origin.
::: solution
Let $F = x^2 + y^2 - z^2$ and let $\mathbf{a} = (a_1, a_2, a_3) \ne \mathbf{0}$ lie on the cone, so $a_1^2 + a_2^2 = a_3^2$. Then $\nabla F(\mathbf{a}) = (2a_1, 2a_2, -2a_3) \ne \mathbf{0}$, and the tangent plane is $a_1(x - a_1) + a_2(y - a_2) - a_3(z - a_3) = 0$, i.e. $a_1x + a_2y - a_3z = a_1^2 + a_2^2 - a_3^2 = 0$. The origin satisfies this equation. (Geometrically, the tangent plane contains the whole line through the vertex and $\mathbf{a}$, which lies on the cone.)
:::
:::

::: exercise The path of steepest descent {#exr-steepest-path level=3}
A ball rolls on the surface $z = x^2 + 2y^2$, always moving horizontally in the direction of $-\nabla f$. Starting above $(1, 1)$, show that its horizontal path is the parabola $y = x^2$.
::: hint
A path whose velocity is $-\nabla f$ satisfies $x'(t) = -f_x$, $y'(t) = -f_y$. Solve the two separate differential equations.
:::
::: solution
The path $(x(t), y(t))$ satisfies $x' = -2x$ and $y' = -4y$ with $x(0) = y(0) = 1$, so $x = e^{-2t}$ and $y = e^{-4t} = x^2$. As $t\to\infty$ the ball approaches the origin along the parabola $y = x^2$, $0 < x \le 1$. Only the direction of the velocity matters for the shape of the path, so the same parabola results if the ball moves along $-\nabla f$ at any (positive) speed. Note that the path leaves $(1,1)$ heading towards the $x$-axis more steeply than the straight line to the origin, as in [[#ex-hill]].
:::
:::

::: exercise Euler's theorem on homogeneous functions {level=3}
A function $f$ on $\R^n\setminus\set{\mathbf{0}}$ is **homogeneous of degree** $k$ if $f(t\mathbf{x}) = t^k f(\mathbf{x})$ for all $t > 0$ and $\mathbf{x} \ne \mathbf{0}$. Prove that if such an $f$ is differentiable, then $\mathbf{x}\cdot\nabla f(\mathbf{x}) = k\,f(\mathbf{x})$. Check the result for $f(x,y) = x^2y + y^3$.
::: hint
Differentiate both sides of $f(t\mathbf{x}) = t^kf(\mathbf{x})$ with respect to $t$, then set $t = 1$.
:::
::: solution
Fix $\mathbf{x} \ne \mathbf{0}$. The left side $g(t) = f(t\mathbf{x})$ is the composition of $f$ with the curve $t\mapsto t\mathbf{x}$, whose velocity is $\mathbf{x}$, so by the chain rule $g'(t) = \nabla f(t\mathbf{x})\cdot\mathbf{x}$. The right side has derivative $kt^{k-1}f(\mathbf{x})$. Setting $t = 1$ gives $\nabla f(\mathbf{x})\cdot\mathbf{x} = k f(\mathbf{x})$. For $f = x^2y + y^3$ (degree $3$): $x f_x + y f_y = x(2xy) + y(x^2 + 3y^2) = 3x^2y + 3y^3 = 3f$.
:::
:::

::: exercise Partial derivatives without differentiability {level=3}
Let $f(x, y) = \sqrt{\abs{xy}}$. Show that $f_x(0,0) = f_y(0,0) = 0$, but that $f$ is not differentiable at the origin.
::: solution
$f(x, 0) = 0$ for all $x$ and $f(0, y) = 0$ for all $y$, so both partial derivatives at the origin are $0$ and $\nabla f(0,0) = \mathbf{0}$. If $f$ were differentiable there, its linearisation would be $L = 0$, and [[#eq-differentiable]] would require $f(\mathbf{h})/\norm{\mathbf{h}} \to 0$. But along the diagonal $\mathbf{h} = (t, t)$ with $t > 0$,

$$
\frac{f(t,t)}{\norm{(t,t)}} = \frac{t}{\sqrt2\,t} = \frac{1}{\sqrt2},
$$

which does not tend to $0$. Hence $f$ is not differentiable at the origin. (Alternatively, $D_{\mathbf{u}}f(0,0)$ does not exist for $\mathbf{u} = (1,1)/\sqrt2$: the quotient $f(t\mathbf{u})/t = \abs{t}/(\sqrt2\,t)$ is $\pm 1/\sqrt2$ according to the sign of $t$.)
:::
:::
