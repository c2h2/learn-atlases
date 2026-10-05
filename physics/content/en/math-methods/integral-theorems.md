The divergence of a field is a flux per unit volume, and the curl is a circulation per unit area. Those descriptions, from [[math-methods/vector-calculus]], are limits in which the region shrinks to a point. The integral theorems remove the limit. They equate the integral of a divergence over a finite volume to the flux through its boundary, and the integral of a curl over a finite surface to the circulation around the edge. Every global conservation law that is written as a divergence, and every induction law that is written as a curl, is one of these theorems with a physical name attached.

The fields in this chapter are defined on open subsets of $\R^3$, or of the plane, and they are continuously differentiable wherever a derivative of them is integrated. A boundary is oriented. For a volume the orientation is the outward normal. For a surface the orientation of the edge follows the right-hand rule: if the thumb points along the chosen normal, the fingers curl in the positive sense of the boundary. Reversing the normal reverses the edge. A theorem that forgets the orientation is a theorem with the wrong sign.

## Line integrals {#line}

A vector field does work, or circulates, along a path. The line integral is that accumulation.

::: definition Line integral {#def-line}
Let $\mathbf{F}$ be a vector field and let $C$ be a piecewise continuously differentiable curve given by $\mathbf{r}(t)$ for $a \le t \le b$. The **line integral** of $\mathbf{F}$ along $C$ is

$$
\int_C \mathbf{F}\cdot\dd\mathbf{r} = \int_a^b \mathbf{F}(\mathbf{r}(t))\cdot\mathbf{r}'(t)\,\dd t,
$$ {#eq-line}

provided the integrand is defined along $C$. The integral over a path made of several such pieces is the sum of the integrals over the pieces.
:::

An increasing reparametrisation does not change the value: the chain rule multiplies $\mathbf{r}'$ by the derivative of the parameter and divides $\dd t$ by the same factor. Traversing $C$ backwards replaces $\mathbf{r}'$ by its negative and changes the sign of the integral. A closed curve, written $\oint_C$, returns to its starting point; its line integral is the **circulation** of $\mathbf{F}$ around $C$.

The scalar integral $\int_C f\,\dd s$, with $\dd s = \abs{\mathbf{r}'(t)}\,\dd t$, is a different object. It does not change sign when the curve is reversed, because arc length does not. The two are easy to confuse when both are called "the line integral". In this chapter the unadorned line integral of a vector field always means [[#eq-line]].

If the vector field is a gradient, the integral collapses to the endpoints. This is the fundamental theorem of calculus along a curve.

::: theorem Gradient theorem {#thm-gradient}
Let $V$ have continuous first partial derivatives on an open set containing a piecewise continuously differentiable curve $C$ from $A$ to $B$. Then

$$
\int_C \nabla V\cdot\dd\mathbf{r} = V(B) - V(A).
$$ {#eq-gradient-ftc}
:::

::: proof
On a single smooth piece, with $\mathbf{r}(a) = A$ and $\mathbf{r}(b) = B$, the chain rule from [[math-methods/vector-calculus]] gives

$$
\deriv{}{t} V(\mathbf{r}(t)) = \nabla V(\mathbf{r}(t))\cdot\mathbf{r}'(t).
$$

Integrate from $a$ to $b$. The left-hand side is $V(B) - V(A)$ by the ordinary fundamental theorem of calculus, and the right-hand side is the line integral. On a piecewise path the same identity holds on each piece, and the intermediate endpoints cancel, leaving $V$ at the final point minus $V$ at the initial point.
:::

The sign that physics uses for a potential is the opposite of this formula. If a force, or an electric field, is written $\mathbf{F} = -\nabla V$, then the work done *by* the field along $C$ is

$$
\int_C \mathbf{F}\cdot\dd\mathbf{r} = V(A) - V(B).
$$ {#eq-work-potential}

The field does positive work when the potential falls. This is the same convention as the potential energy in [[mechanics/work-energy]], where the work done by a conservative force is minus the change in potential energy. It is not the work–energy statement $W_{\mathrm{net}} = \Delta K$, which counts work done by the net force and equals a change in kinetic energy. Mixing the two signs is a reliable way to send a particle uphill in a calculation.

::: example Two paths, one value {#ex-paths}
Let $\mathbf{F} = (2xy,\, x^2,\, 0)$. Compute $\int_C \mathbf{F}\cdot\dd\mathbf{r}$ from $(0, 0, 0)$ to $(1, 1, 0)$ along the straight line, and again along the path that goes first to $(1, 0, 0)$ and then to $(1, 1, 0)$.
::: solution
Along the straight line, $\mathbf{r}(t) = (t, t, 0)$ for $0 \le t \le 1$, so $\mathbf{r}'(t) = (1, 1, 0)$ and $\mathbf{F}(\mathbf{r}(t)) = (2t^2,\, t^2,\, 0)$. The integrand is $2t^2 + t^2 = 3t^2$, and

$$
\int_0^1 3t^2\,\dd t = 1.
$$

Along the first leg, $\mathbf{r}(t) = (t, 0, 0)$, $\mathbf{F} = (0,\, t^2,\, 0)$ and $\mathbf{r}' = (1, 0, 0)$, so the integrand is $0$. Along the second leg, $\mathbf{r}(s) = (1, s, 0)$, $\mathbf{F} = (2s,\, 1,\, 0)$ and $\mathbf{r}' = (0, 1, 0)$, so the integrand is $1$. The integral of $1$ from $s = 0$ to $s = 1$ is $1$. The two paths agree.

They agree because $\mathbf{F}$ is minus a gradient. Try $V = -x^2 y$. Then

$$
-\nabla V = -(-2xy,\, -x^2,\, 0) = (2xy,\, x^2,\, 0) = \mathbf{F}.
$$

[[#eq-work-potential]] gives $V(0, 0, 0) - V(1, 1, 0) = 0 - (-1) = 1$, which is both line integrals at once. Any other path with the same ends, including the parabola $y = x^2$ in the plane $z = 0$, gives the same number. The curl test below explains why a potential was available.
:::
:::

## Conservative fields {#conservative}

Path independence is a property of the field, not a coincidence of two curves that happened to be chosen well.

::: definition Conservative field {#def-conservative}
A vector field $\mathbf{F}$ on an open set $U$ is **conservative** when $\int_C \mathbf{F}\cdot\dd\mathbf{r}$ depends only on the endpoints of $C$, for every piecewise continuously differentiable curve $C$ that stays in $U$. Equivalently, the circulation of $\mathbf{F}$ around every closed curve in $U$ is zero.
:::

The two sentences are equivalent by the same splitting used for conservative forces in [[mechanics/work-energy]]. Break a closed curve into a trip from $A$ to $B$ and a return; the return is minus some other trip from $A$ to $B$. Path independence makes the two trips equal, so the circulation vanishes. Conversely, two trips from $A$ to $B$ together with a reversal form a closed curve of circulation zero, so the trips are equal.

::: definition Simply connected region {#def-simply}
An open set $U$ is **simply connected** when every closed curve in $U$ is the oriented boundary of a surface that lies entirely in $U$.
:::

A ball, a box and the whole of $\R^3$ are simply connected. So is $\R^3$ with one point removed: a closed curve there still bounds a surface that dodges the missing point. The plane with the origin removed is not simply connected, and neither is $\R^3$ with a whole line removed. A loop that winds once around the missing line is not the boundary of any surface that avoids the line. The definition is exactly the hypothesis Stokes' theorem needs when it is used to test a field. It is not the same as "every closed surface bounds a volume inside $U$", which is a different topological demand and the one the divergence theorem uses.

::: theorem Path independence and potentials {#thm-potential}
Let $\mathbf{F}$ be continuously differentiable on an open set $U$.
If $\mathbf{F} = -\nabla V$ for some scalar field $V$ on $U$, then $\mathbf{F}$ is conservative, and $\curl\mathbf{F} = \mathbf{0}$.
Conversely, if $\mathbf{F}$ is conservative, fix a base point $\mathbf{r}_0$ in $U$ and set

$$
V(\mathbf{r}) = -\int_{\mathbf{r}_0}^{\mathbf{r}} \mathbf{F}\cdot\dd\mathbf{r},
$$ {#eq-potential-def}

the integral being taken along any path in $U$ from $\mathbf{r}_0$ to $\mathbf{r}$. Then $\mathbf{F} = -\nabla V$ on the connected component of $\mathbf{r}_0$.
:::

::: proof
If $\mathbf{F} = -\nabla V$, [[#eq-work-potential]] shows that the line integral equals $V(A) - V(B)$ and so depends only on the ends. The curl of a gradient vanishes by [[math-methods/vector-calculus#thm-curl-grad]], once the second partials of $V$ are continuous, which they are if $\mathbf{F}$ is continuously differentiable and $\mathbf{F} = -\nabla V$. Thus $\curl\mathbf{F} = \mathbf{0}$.

Now suppose the integrals are path-independent, so [[#eq-potential-def]] does not depend on the route. To recover the partial derivative, step from $\mathbf{p}$ to $\mathbf{p} + h\mathbf{i}$ along the straight segment, with $h$ small enough that the segment stays in $U$. Parametrise it by $\mathbf{r}(t) = \mathbf{p} + th\mathbf{i}$, $0 \le t \le 1$. Then

$$
\frac{V(\mathbf{p}+h\mathbf{i}) - V(\mathbf{p})}{h} = -\int_0^1 F_x(\mathbf{p} + th\mathbf{i})\,\dd t.
$$

As $h \to 0$ the integrand tends to $F_x(\mathbf{p})$ uniformly on the segment, by continuity, and the right-hand side tends to $-F_x(\mathbf{p})$. The same argument in the $y$- and $z$-directions gives $\nabla V = -\mathbf{F}$.
:::

What is not in this theorem is the converse of the curl statement. Vanishing curl does not by itself make a field conservative. The missing hypothesis is simple connectedness, and the missing tool is Stokes' theorem. Both are supplied below, and the angular field in the exercises is the standard counter-example on a domain that fails the hypothesis. Until that proof is in place, the safe direction to use is the one already proved: a gradient has no curl, and a field that is minus a gradient is conservative.

::: quiz
A continuously differentiable field on a simply connected region has curl zero. Which conclusion follows?
- [ ] The flux of the field through every closed surface is zero.
- [ ] The field itself is the zero field.
- [x] The circulation around every closed curve vanishes, and the field is minus the gradient of a scalar potential.
- [ ] The divergence equals $-4\pi$ at the origin.
::: solution
Vanishing curl, on a simply connected region, is the hypothesis of [[#thm-stokes-potential]] below: the circulation vanishes and a potential exists with $\mathbf{F} = -\nabla V$. Vanishing flux is a statement about the divergence, not the curl. A constant nonzero field has curl zero and is not the zero field. The value $-4\pi$ belongs to the Laplacian of $1/r$, not to an arbitrary irrotational field.
:::
:::

The quiz refers to a theorem that is proved after Stokes' theorem. The logic is not circular: the statement being checked is the theorem itself, and the solution points at the proof rather than assuming a fact from nowhere. Read the quiz again after [[#thm-stokes-potential]].

## Green's theorem in the plane {#green}

In the plane the circulation statement is Green's theorem. It is Stokes' theorem for a flat region, proved first because the proof of Stokes reduces the curved case to this one.

::: theorem Green's theorem {#thm-green}
Let $D$ be a bounded region in the plane whose boundary $\partial D$ consists of one or more piecewise continuously differentiable closed curves, oriented so that $D$ lies on the left as the boundary is traversed, the anticlockwise sense for a single outer boundary. Let $P$ and $Q$ have continuous first partial derivatives on an open set containing $D$ and its boundary. Then

$$
\oint_{\partial D} P\,\dd x + Q\,\dd y = \iint_D \left(\pdv{Q}{x} - \pdv{P}{y}\right)\dd x\,\dd y.
$$ {#eq-green}
:::

::: proof
It is enough to prove the identity when $D$ is both vertically simple and horizontally simple, and then to cut a more complicated region into such pieces. Internal cuts are traversed twice, once in each direction, and their line integrals cancel. The boundary orientation is preserved by the cutting.

Suppose $a \le x \le b$ and $g_1(x) \le y \le g_2(x)$. Then

$$
\iint_D -\pdv{P}{y}\,\dd x\,\dd y = -\int_a^b \big(P(x, g_2(x)) - P(x, g_1(x))\big)\dd x.
$$

On the boundary, $\int P\,\dd x$ receives $P(x, g_1(x))$ running from $a$ to $b$ along the lower curve, and $P(x, g_2(x))$ running from $b$ to $a$ along the upper curve. Vertical sides, if any, have $\dd x = 0$. The boundary integral of $P\,\dd x$ is therefore exactly the double integral of $-\partial P/\partial y$.

Suppose likewise $c \le y \le d$ and $h_1(y) \le x \le h_2(y)$. Then

$$
\iint_D \pdv{Q}{x}\,\dd x\,\dd y = \int_c^d \big(Q(h_2(y), y) - Q(h_1(y), y)\big)\dd y,
$$

which is the anticlockwise boundary integral of $Q\,\dd y$: the right-hand curve is traversed upwards and the left-hand curve downwards. Adding the two identities gives [[#eq-green]].
:::

In the language of the curl, the integrand is the $z$-component of $\curl(P, Q, 0)$, and the double integral is the flux of that curl through $D$ with normal $\mathbf{k}$. Green's theorem is the circulation formula [[math-methods/vector-calculus#eq-curl-geom]] with the limit removed and the patch allowed to be large. There is a second, equivalent form for flux rather than circulation. If $\mathbf{F} = (F_x, F_y)$, the outward flux across $\partial D$ equals $\iint_D \divg\mathbf{F}\,\dd x\,\dd y$. It is Green's theorem applied to $P = -F_y$ and $Q = F_x$, and it is the planar divergence theorem.

::: example Green's theorem on the unit disk {#ex-green-disk}
Let $D$ be the unit disk $x^2 + y^2 \le 1$, and let $P = -y$, $Q = x$. Evaluate both sides of [[#eq-green]].
::: solution
The integrand is $\partial Q/\partial x - \partial P/\partial y = 1 - (-1) = 2$. The double integral is $2$ times the area of the unit disk, so

$$
\iint_D 2\,\dd x\,\dd y = 2\pi.
$$

On the boundary, $\mathbf{r}(\theta) = (\cos\theta,\, \sin\theta)$ for $0 \le \theta \le 2\pi$, traversed anticlockwise. Then $\dd x = -\sin\theta\,\dd\theta$, $\dd y = \cos\theta\,\dd\theta$, and

$$
P\,\dd x + Q\,\dd y = (-\sin\theta)(-\sin\theta\,\dd\theta) + (\cos\theta)(\cos\theta\,\dd\theta) = \dd\theta.
$$

The line integral is $\int_0^{2\pi} \dd\theta = 2\pi$. The two sides agree. The same field in three dimensions is the rigid rotation of [[math-methods/vector-calculus#ex-rotation]], whose curl is $(0, 0, 2)$. The flux of that curl through the disk is $2$ times the area, which is again $2\pi$. Green's theorem did not need the three-dimensional language, but the numbers are the planar case of Stokes' theorem.
:::
:::

## The divergence theorem {#divergence}

The flux form extends from the plane to a volume. The result is the divergence theorem, also called Gauss's theorem.

::: theorem Divergence theorem {#thm-divergence}
Let $V$ be a bounded solid region whose boundary $\partial V$ is a piecewise smooth closed surface, oriented with the outward unit normal. Let $\mathbf{F}$ have continuous first partial derivatives on an open set containing $V$ and its boundary. Then

$$
\int_V \divg\mathbf{F}\,\dd V = \oint_{\partial V} \mathbf{F}\cdot\dd\mathbf{A}.
$$ {#eq-div-thm}
:::

::: proof
Consider first a region that is a graph in the $z$-direction: over a domain $D$ in the $xy$-plane, $g_1(x, y) \le z \le g_2(x, y)$, with $g_1$ and $g_2$ continuously differentiable, and with vertical walls only where they do not contribute to the $z$-flux. Write $\mathbf{F} = (0, 0, F_z)$ for this step. Then

$$
\int_V \pdv{F_z}{z}\,\dd V = \iint_D \big(F_z(x, y, g_2) - F_z(x, y, g_1)\big)\dd x\,\dd y.
$$

On the upper surface $z = g_2$ the upward vector area element is $(-\partial g_2/\partial x,\, -\partial g_2/\partial y,\, 1)\,\dd x\,\dd y$, and it points outwards when $g_2 \ge g_1$. Its dot product with $(0, 0, F_z)$ is $F_z(x, y, g_2)\,\dd x\,\dd y$. On the lower surface the outward normal points downwards, the vector area element is $(\partial g_1/\partial x,\, \partial g_1/\partial y,\, -1)\,\dd x\,\dd y$, and the dot product contributes $-F_z(x, y, g_1)\,\dd x\,\dd y$. Adding these fluxes reproduces the volume integral. A vertical wall has a horizontal outward normal, so $(0, 0, F_z)$ contributes nothing to it.

The same argument with the axes cycled accounts for $(F_x, 0, 0)$ and $(0, F_y, 0)$. Add the three fields. A general region of the kind met in this course can be cut into finitely many graph regions. Fluxes through a shared cut cancel, because the outward normals of the two pieces point in opposite directions.
:::

The hypotheses are used in full. The partial derivatives have to exist and be continuous up to the boundary, so the field cannot blow up at an interior point and still be fed into [[#eq-div-thm]]. The orientation has to be outward. An inward normal produces the negative of the flux and breaks the equality.

::: example The unit ball {#ex-sphere}
Verify the divergence theorem for $\mathbf{F} = (x, y, z)$ on the unit ball $x^2 + y^2 + z^2 \le 1$.
::: solution
The divergence is $\partial x/\partial x + \partial y/\partial y + \partial z/\partial z = 3$, a constant. The volume integral is $3$ times the volume of the unit ball. In spherical coordinates the volume element is $r^2\sin\theta\,\dd r\,\dd\theta\,\dd\varphi$, with $r$ from $0$ to $1$, $\theta$ from $0$ to $\pi$ and $\varphi$ from $0$ to $2\pi$. The three integrals separate:

$$
\int_0^1 r^2\,\dd r = \frac{1}{3}, \qquad \int_0^{\pi}\sin\theta\,\dd\theta = 2, \qquad \int_0^{2\pi}\dd\varphi = 2\pi.
$$

The volume is $(1/3)\cdot 2\cdot 2\pi = 4\pi/3$. Therefore

$$
\int_V \divg\mathbf{F}\,\dd V = 3\cdot\frac{4\pi}{3} = 4\pi.
$$

On the boundary, $r = 1$ and the outward unit normal is $\mathbf{e}_r$. The field is the position vector, so on this surface $\mathbf{F} = \mathbf{e}_r$ and $\mathbf{F}\cdot\mathbf{n} = 1$. The area element is $\sin\theta\,\dd\theta\,\dd\varphi$, and the flux is

$$
\int_0^{2\pi}\int_0^{\pi} 1\cdot\sin\theta\,\dd\theta\,\dd\varphi = 2\pi\cdot 2 = 4\pi.
$$

The two sides are equal. Both computations were done from the integrals, not by quoting the area $4\pi$ and the volume $4\pi/3$ as memorised constants, though those are the values the integrals returned.

The same arithmetic works for a ball of any radius $R$. The divergence is still $3$, the volume is $4\pi R^3/3$, and the volume integral is $4\pi R^3$. On the sphere, $\mathbf{F}\cdot\mathbf{n} = R$ and the area is $4\pi R^2$, so the flux is $4\pi R^3$ as well. The unit ball is the case $R = 1$. Nothing in the cancellation depends on a special property of the number $1$.
:::
:::

## A point source {#source}

The inverse-square field of [[math-methods/vector-calculus#ex-inverse-square]] has divergence zero at every point where it is defined, and a nonzero flux through any sphere about the origin. The divergence theorem does not apply on a region containing the origin, because the field is not differentiable there. The way to use the theorem is to cut the origin out.

::: theorem Laplacian of the reciprocal radius {#thm-delta}
Let $V$ be a bounded solid region on which the divergence theorem can be applied to smooth fields, and let the boundary be oriented outwards. Then

$$
\int_V \nabla^2\!\left(\frac{1}{r}\right)\dd V =
\begin{cases}
-4\pi & \text{if the origin is an interior point of } V,\\
0 & \text{if the origin is outside } V.
\end{cases}
$$ {#eq-delta-int}

In the sense of this integral identity,

$$
\nabla^2\!\left(\frac{1}{r}\right) = -4\pi\,\delta^3(\mathbf{r}),
$$ {#eq-delta}

where the three-dimensional delta function is defined by $\int \delta^3(\mathbf{r})\,\phi(\mathbf{r})\,\dd V = \phi(\mathbf{0})$ for every continuous test function $\phi$.
:::

::: proof
Write $\mathbf{G} = \nabla(1/r) = -\mathbf{e}_r/r^2$ for $r \neq 0$. On any region that stays a positive distance away from the origin, $1/r$ is smooth and [[math-methods/vector-calculus#prop-radial]] gives $\nabla^2(1/r) = 0$. If the origin is outside $V$, the integral in [[#eq-delta-int]] is the integral of the zero function.

If the origin is interior, choose $\varepsilon > 0$ small enough that the closed ball $B_\varepsilon$ of radius $\varepsilon$ lies inside $V$. On the excised region $V_\varepsilon = V \setminus B_\varepsilon$ the field $\mathbf{G}$ is smooth and its divergence is zero, so [[#thm-divergence]] gives

$$
0 = \oint_{\partial V} \mathbf{G}\cdot\dd\mathbf{A} + \oint_{S_\varepsilon} \mathbf{G}\cdot\mathbf{n}_\varepsilon\,\dd A.
$$

The normal $\mathbf{n}_\varepsilon$ is outward from $V_\varepsilon$, so it points into the hole: $\mathbf{n}_\varepsilon = -\mathbf{e}_r$. On $S_\varepsilon$,

$$
\mathbf{G}\cdot\mathbf{n}_\varepsilon = \left(-\frac{\mathbf{e}_r}{\varepsilon^2}\right)\cdot(-\mathbf{e}_r) = \frac{1}{\varepsilon^2},
$$

and $\dd A = \varepsilon^2\,\dd\Omega$. The integral over the small sphere is $\int \dd\Omega = 4\pi$, independent of $\varepsilon$. Therefore the outward flux of $\mathbf{G}$ through $\partial V$ is $-4\pi$.

The integral of $\nabla^2(1/r)$ over $V$ cannot be computed by substituting the pointwise value, which is undefined at the origin. It is defined by the identity the divergence theorem would have given for a smooth field, namely the flux of $\mathbf{G}$ through $\partial V$. That flux is $-4\pi$. This is [[#eq-delta-int]].

The delta-function form is the same statement tested against a continuous function $\phi$. Repeat the excision on the vector field $\phi\mathbf{G}$. The divergence theorem on $V_\varepsilon$, followed by $\varepsilon \to 0$, produces a small-sphere contribution. The piece $\phi\,\mathbf{G}\cdot\mathbf{n}_\varepsilon$ tends to $\phi(\mathbf{0})$ times $4\pi$, because $\phi$ is continuous and $\mathbf{G}\cdot\mathbf{n}_\varepsilon\,\dd A = \dd\Omega$. The piece in which $(1/r)$ multiplies a derivative of $\phi$ is of order $\varepsilon$ and vanishes in the limit. The result is $\int_V \phi\,\nabla^2(1/r)\,\dd V = -4\pi\,\phi(\mathbf{0})$, which is [[#eq-delta]].
:::

Since $\mathbf{e}_r/r^2 = -\nabla(1/r)$, the flux of the inverse-square field itself through $\partial V$ is $4\pi$ when the origin is inside and $0$ when it is outside. That is Gauss's law for a unit point source, before the constants $\varepsilon_0$ and the charge are restored in [[electrostatics/gauss-law]]. The flux does not depend on the shape of $\partial V$, and it does not depend on how large $V$ is. Spreading the same source over a larger sphere does not weaken the total flux: the field gets weaker as $1/r^2$ and the area grows as $r^2$.

::: widget plot
f: -1/x
x: 0.2, 3
caption: The curve is -1/x on the interval from 0.2 to 3. At the left edge the value is -5, and at x = 3 it is -1/3. There is no slider; read how fast the graph falls. This curve is not an inverse-square profile. In three dimensions the radial field of a point source falls as 1/r², and its flux through any surrounding sphere is the same.
:::

The figure is a one-dimensional graph with a singularity off the left-hand edge of the window. It is there as a picture of a quantity that becomes large near the origin and settles down farther out. The three-dimensional fact, that the flux is independent of the radius, is [[#thm-delta]] applied to a ball, not a property you can read off the vertical scale of this plot.

## Stokes' theorem {#stokes}

Green's theorem upgrades from a flat region to a curved surface. The circulation around the edge equals the flux of the curl through any surface the edge bounds.

::: theorem Stokes' theorem {#thm-stokes}
Let $S$ be an oriented piecewise smooth surface with boundary curve $\partial S$ oriented by the right-hand rule relative to the unit normal of $S$. Let $\mathbf{F}$ have continuous first partial derivatives on an open set containing $S$ and $\partial S$. Then

$$
\int_S (\curl\mathbf{F})\cdot\dd\mathbf{A} = \oint_{\partial S} \mathbf{F}\cdot\dd\mathbf{r}.
$$ {#eq-stokes}
:::

::: proof
Take $S$ to be the graph $z = g(x, y)$ over a region $D$ in the $xy$-plane to which [[#thm-green]] applies, with $g$ twice continuously differentiable, and with the normal chosen so that its $z$-component is positive. The vector area element is

$$
\dd\mathbf{A} = \left(-\pdv{g}{x},\, -\pdv{g}{y},\, 1\right)\dd x\,\dd y.
$$

A parametrisation $(x(t), y(t))$ of $\partial D$ lifts to the space curve $(x, y, g(x, y))$ on $\partial S$, and

$$
\mathbf{F}\cdot\dd\mathbf{r} = \big(F_x + F_z \pdv{g}{x}\big)\dd x + \big(F_y + F_z \pdv{g}{y}\big)\dd y,
$$

with the components of $\mathbf{F}$ evaluated on the surface. Call the two coefficients $\tilde P$ and $\tilde Q$. They are functions of $x$ and $y$ alone. Green's theorem says that the boundary integral equals $\iint_D (\partial\tilde Q/\partial x - \partial\tilde P/\partial y)\,\dd x\,\dd y$.

Differentiate using the chain rule. The second partials of $g$ cancel because they are continuous, and so do the terms with $\partial^2$ of a component of $\mathbf{F}$ against itself. What survives is

$$
\pdv{\tilde Q}{x} - \pdv{\tilde P}{y}
= (\curl\mathbf{F})_z - (\curl\mathbf{F})_x\pdv{g}{x} - (\curl\mathbf{F})_y\pdv{g}{y},
$$

evaluated on the surface. That expression is $(\curl\mathbf{F})\cdot(-\partial g/\partial x,\, -\partial g/\partial y,\, 1)$, which is the integrand of the flux. This is [[#eq-stokes]] for an upward graph.

A surface that is a graph over one of the other coordinate planes is the same argument with the axes renamed. A general piecewise smooth surface in this course can be split into finitely many such graphs. Integrals along shared edges cancel in pairs.
:::

The proof gives a practical method as well as an existence argument. For a curl that points only in the $z$-direction, the flux through a graph equals the integral of that component over the shadow of the surface in the $xy$-plane, not over the curved area. Multiplying $(\curl\mathbf{F})\cdot\mathbf{k}$ by the curved area is the mistake the hemisphere example is built to catch.

The missing implication for conservative fields is now available.

::: theorem Curl and simple connectedness {#thm-stokes-potential}
Let $\mathbf{F}$ have continuous first partial derivatives on a simply connected open set $U$, and suppose $\curl\mathbf{F} = \mathbf{0}$ throughout $U$. Then $\mathbf{F}$ is conservative on $U$, and $\mathbf{F} = -\nabla V$ for the potential [[#eq-potential-def]].
:::

::: proof
Let $C_1$ and $C_2$ be two piecewise smooth paths in $U$ from $A$ to $B$. The path $C_1$ followed by the reversal of $C_2$ is a closed curve in $U$. By [[#def-simply]] it is the oriented boundary of a surface $S$ lying in $U$. Stokes' theorem turns the circulation into the flux of $\curl\mathbf{F}$ through $S$, which is zero. Hence the line integrals along $C_1$ and along $C_2$ are equal. Path independence is the hypothesis of [[#thm-potential]], so a potential of the stated sign exists.
:::

Taken together, [[#thm-potential]] and [[#thm-stokes-potential]] are the equivalence in the syllabus. On a simply connected domain, for a continuously differentiable field, the following are equivalent: the curl is zero; the line integral is path-independent; the field is minus the gradient of a scalar potential. Drop simple connectedness and the curl test survives in only one direction. A gradient still has zero curl on any domain. A curl-free field on a domain with a hole need not be a gradient, because the surface Stokes' theorem asks for may not exist inside the domain.

::: example Stokes' theorem on a hemisphere {#ex-hemisphere}
Let $S$ be the hemisphere $x^2 + y^2 + z^2 = 1$, $z \ge 0$, with upward normal, and let $\mathbf{F} = (-y,\, x,\, z)$. Compute both sides of [[#eq-stokes]].
::: solution
The curl is

$$
\curl\mathbf{F} = \left(\pdv{z}{y} - \pdv{x}{z},\; \pdv{(-y)}{z} - \pdv{z}{x},\; \pdv{x}{x} - \pdv{(-y)}{y}\right) = (0, 0, 2).
$$

The hemisphere is the graph $z = \sqrt{1 - x^2 - y^2}$ over the unit disk. The vector area element has third component $\dd x\,\dd y$, so

$$
(\curl\mathbf{F})\cdot\dd\mathbf{A} = 2\,\dd x\,\dd y.
$$

The flux equals $2$ times the area of the unit disk, which is $2\pi$. It is not $2$ times the curved area $2\pi$ of the hemisphere. That product is $4\pi$, and it answers a different question, the flux of the constant field $(0, 0, 2)$ through a surface whose normal is vertical.

The boundary is the unit circle in the plane $z = 0$, anticlockwise when seen from above, which is the right-hand sense for the upward normal. Parametrise $\mathbf{r}(\theta) = (\cos\theta,\, \sin\theta,\, 0)$. Then $\mathbf{F}(\mathbf{r}(\theta)) = (-\sin\theta,\, \cos\theta,\, 0)$ and $\mathbf{r}'(\theta) = (-\sin\theta,\, \cos\theta,\, 0)$, so

$$
\mathbf{F}\cdot\mathbf{r}' = \sin^2\theta + \cos^2\theta = 1.
$$

The circulation is $\int_0^{2\pi} \dd\theta = 2\pi$. The $z$-component of $\mathbf{F}$ never entered, because $\dd z = 0$ on this edge. The two sides of Stokes' theorem agree.
:::
:::

::: warning
Stokes' theorem and the divergence theorem need an oriented surface or an oriented boundary, and they need the field to be continuously differentiable on an open set that contains the whole region of integration, boundary included. A field that blows up at the origin is not of that kind on any region that contains the origin. Cutting the origin out, as in the proof of [[#thm-delta]], is legal; pretending the theorem applies across the singularity is not. That is why a point charge has a nonzero flux through a surrounding surface and, at the same time, zero divergence at every point of $\R^3 \setminus \{\mathbf{0}\}$. The punctured space is simply connected, and the inverse-square field is minus a gradient there, so there is no conflict with [[#thm-stokes-potential]]. The conflict with a naive divergence theorem is a failure of smoothness, not a failure of simple connectedness.
:::

::: history
George Green’s essay of 1828, printed privately in Nottingham, contains the integral identities that relate a volume integral of a divergence to a flux through the boundary. Gauss had already used the flux of an inverse-square field in his work on attraction, and the divergence theorem is often called Gauss’s theorem for that reason. Mikhail Ostrogradsky stated a general form in a paper presented to the Paris Academy in 1826. Stokes’ theorem has a more particular date. William Thomson, later Lord Kelvin, wrote it in a letter to George Gabriel Stokes on 2 July 1850. Stokes set the theorem as a question on the Smith’s Prize examination of 1854. It became part of the ordinary equipment of electromagnetism through Maxwell’s use of it.
:::

## Where this leads {#leads}

The two theorems are the bridge from the local operators of [[math-methods/vector-calculus]] to the integral laws of the later courses. Gauss’s law in [[electrostatics/gauss-law]] is [[#thm-divergence]] applied to the electric field, with the delta-function identity [[#eq-delta]] supplying the point charge. The existence of an electrostatic potential in [[electrostatics/potential]] is [[#thm-stokes-potential]] applied to a curl-free electric field in empty space. Faraday’s law in [[magnetism/faraday]] is Stokes’ theorem applied to the electric field around a changing magnetic flux, and Ampère’s law is the same theorem applied to the magnetic field around a current, as prepared in [[magnetism/biot-savart]].

The Laplacian of $1/r$ is also the start of the Green's function for Poisson's equation. In [[math-methods/green-functions]] the response to a unit source is built so that its Laplacian is a delta function, and [[#eq-delta]] is the free-space case, up to the factor $-4\pi$. The sign in [[#eq-work-potential]] stays in force there: the potential is still defined so that the field points downhill.

::: summary
- The line integral $\int_C \mathbf{F}\cdot\dd\mathbf{r}$ reverses sign when the path is reversed. The scalar integral of arc length does not.
- If $\mathbf{F} = -\nabla V$, the line integral from $A$ to $B$ equals $V(A) - V(B)$. The minus sign is the mechanics convention for potential energy.
- On a simply connected domain, vanishing curl, path independence and the existence of this potential are equivalent. Without that hypothesis, vanishing curl is not enough.
- Green's theorem equates a planar circulation to the double integral of $\partial Q/\partial x - \partial P/\partial y$. It is Stokes' theorem for a flat surface.
- The divergence theorem equates $\int_V \divg\mathbf{F}\,\dd V$ to the outward flux of $\mathbf{F}$. The field must be smooth throughout $V$.
- Cutting out a small ball shows that $\int_V \nabla^2(1/r)\,\dd V$ is $-4\pi$ if the origin is inside and $0$ otherwise, so $\nabla^2(1/r) = -4\pi\delta^3(\mathbf{r})$.
- Stokes' theorem equates the flux of the curl through an oriented surface to the circulation around the edge. The edge and the normal are tied by the right-hand rule.
- A singularity on a line, such as $(-y, x)/(x^2 + y^2)$ along the $z$-axis, can have zero curl and nonzero circulation, because no surface bounded by the loop stays inside the domain.
:::

## Exercises {#exercises}

::: exercise A straight-line integral {#exr-line level=1 check="2"}
Let $\mathbf{F} = (y,\, x,\, 0)$. Compute the line integral of $\mathbf{F}$ from $(0, 0, 0)$ to $(1, 2, 0)$.
::: solution
The field is a gradient: $\nabla(xy) = (y, x, 0)$. By [[#thm-gradient]] the integral of $\nabla(xy)$ from the origin to $(1, 2, 0)$ is $1\cdot 2 - 0 = 2$.

As a check, parametrise the straight line $\mathbf{r}(t) = (t,\, 2t,\, 0)$, $0 \le t \le 1$. Then $\mathbf{F}(\mathbf{r}(t)) = (2t,\, t,\, 0)$ and $\mathbf{r}' = (1, 2, 0)$, so the integrand is $2t + 2t = 4t$. The integral of $4t$ from $0$ to $1$ is $2$. The two methods agree. The potential in the physics sign would be $V = -xy$, and [[#eq-work-potential]] returns $0 - (-2) = 2$ as well.
:::
:::

::: exercise Flux through a larger sphere {#exr-sphere-2 level=1 check="32*pi"}
Let $\mathbf{F} = (x, y, z)$. Find the outward flux of $\mathbf{F}$ through the sphere of radius $2$ centred at the origin.
::: solution
The divergence is $3$. The ball of radius $2$ has volume

$$
\frac{4}{3}\pi R^3 = \frac{4}{3}\pi\cdot 8 = \frac{32\pi}{3}.
$$

The divergence theorem, which applies because $\mathbf{F}$ is smooth everywhere, gives the flux as

$$
3\cdot\frac{32\pi}{3} = 32\pi.
$$

On the surface itself, $\mathbf{F}\cdot\mathbf{n} = R = 2$ and the area is $4\pi R^2 = 16\pi$, so the flux is $2\cdot 16\pi = 32\pi$ again. This is the scaling checked at the end of [[#ex-sphere]]: both sides grow as $R^3$, and $4\pi R^3$ at $R = 2$ is $32\pi$.
:::
:::

::: exercise Circulation on a larger circle {#exr-circle-3 level=1 check="18*pi"}
Let $\mathbf{F} = (-y,\, x,\, 0)$. Find the circulation of $\mathbf{F}$ once anticlockwise around the circle of radius $3$ in the plane $z = 0$, centred at the origin.
::: solution
Parametrise $\mathbf{r}(\theta) = (3\cos\theta,\, 3\sin\theta,\, 0)$. Then $\mathbf{F}(\mathbf{r}) = (-3\sin\theta,\, 3\cos\theta,\, 0)$ and $\mathbf{r}' = (-3\sin\theta,\, 3\cos\theta,\, 0)$, so

$$
\mathbf{F}\cdot\mathbf{r}' = 9\sin^2\theta + 9\cos^2\theta = 9.
$$

The circulation is $\int_0^{2\pi} 9\,\dd\theta = 18\pi$.

Stokes' theorem gives the same number with less trigonometry. The curl is $(0, 0, 2)$, as in [[math-methods/vector-calculus#ex-rotation]]. The flux of the curl through the disk of radius $3$ is $2$ times the area $9\pi$, which is $18\pi$. The right-hand rule for the upward normal selects the anticlockwise sense, which is the sense in the question.
:::
:::

::: exercise The unit cube {#exr-cube level=2 check="3"}
Let $\mathbf{F} = (x, y, z)$ and let $V$ be the unit cube $0 \le x \le 1$, $0 \le y \le 1$, $0 \le z \le 1$. Compute the outward flux of $\mathbf{F}$ through the surface of the cube, and compare it with the volume integral of the divergence.
::: solution
The divergence is $3$ and the volume is $1$, so the volume integral is $3$.

The six faces contribute as follows. On $x = 1$ the outward normal is $\mathbf{i}$ and $F_x = 1$, so the flux is $1$ times the unit area. On $x = 0$ the outward normal is $-\mathbf{i}$ and $F_x = 0$, so the flux is $0$. The faces $y = 1$ and $y = 0$ contribute $1$ and $0$ in the same way, and so do $z = 1$ and $z = 0$. The total outward flux is $3$.

The two sides of [[#thm-divergence]] agree. The three faces that pass through the origin contribute nothing because the corresponding component of $\mathbf{F}$ vanishes there, not because the area element was forgotten.
:::
:::

::: exercise Green's theorem on the unit square {#exr-green-square level=2 check="1/2"}
Let $D$ be the square $0 \le x \le 1$, $0 \le y \le 1$, let $P = x^2$ and let $Q = xy$. Evaluate both sides of Green's theorem.
::: solution
The integrand is $\partial Q/\partial x - \partial P/\partial y = y - 0 = y$. Then

$$
\int_0^1\int_0^1 y\,\dd x\,\dd y = \int_0^1 y\,\dd y = \frac{1}{2}.
$$

The boundary, anticlockwise, has four sides. Along the bottom, $y = 0$ and $x$ runs from $0$ to $1$: $P\,\dd x = x^2\,\dd x$ integrates to $1/3$, and $\dd y = 0$. Along the right side, $x = 1$ and $y$ runs from $0$ to $1$: $\dd x = 0$ and $Q\,\dd y = y\,\dd y$ integrates to $1/2$. Along the top, $y = 1$ and $x$ runs from $1$ to $0$: $\int_1^0 x^2\,\dd x = -1/3$. Along the left side, $x = 0$ and $Q = 0$, so the integral is $0$. The total is $1/3 + 1/2 - 1/3 + 0 = 1/2$.

The double integral was the shorter computation. The boundary integral is the one that catches a reversed edge: running the top from left to right instead of from right to left would have produced $+1/3$ and a total of $7/6$, which is not the double integral.
:::
:::

::: exercise A potential in three variables {#exr-potential level=2 check="6"}
Let $\mathbf{F} = (2xy,\, x^2 + 2yz,\, y^2)$. Show that the curl is zero, find a potential with $\mathbf{F} = -\nabla V$, and compute the line integral from $(0, 0, 0)$ to $(1, 2, 1)$.
::: solution
The curl components are

$$
\begin{aligned}
\pdv{(y^2)}{y} - \pdv{(x^2 + 2yz)}{z} &= 2y - 2y = 0,\\
\pdv{(2xy)}{z} - \pdv{(y^2)}{x} &= 0,\\
\pdv{(x^2 + 2yz)}{x} - \pdv{(2xy)}{y} &= 2x - 2x = 0.
\end{aligned}
$$

The domain $\R^3$ is simply connected, so [[#thm-stokes-potential]] supplies a potential. Integrate $-\partial V/\partial x = 2xy$ to get $V = -x^2 y + g(y, z)$. Then $-\partial V/\partial y = x^2 - \partial g/\partial y$ must equal $x^2 + 2yz$, so $\partial g/\partial y = -2yz$ and $g = -y^2 z + h(z)$. Then $-\partial V/\partial z = y^2 - h'(z)$ must equal $y^2$, so $h$ is constant. Thus $V = -x^2 y - y^2 z$, up to that constant.

The line integral is $V(0, 0, 0) - V(1, 2, 1)$. The value at the end point is $-1^2\cdot 2 - 2^2\cdot 1 = -6$, so the integral is $0 - (-6) = 6$.

On the straight line $\mathbf{r}(t) = (t,\, 2t,\, t)$, the integrand is $F_x + 2 F_y + F_z$ with $(x, y, z) = (t, 2t, t)$, which is $4t^2 + 2(t^2 + 4t^2) + 4t^2 = 18t^2$. The integral of $18t^2$ from $0$ to $1$ is $6$.
:::
:::

::: exercise A curl-free field with circulation {#exr-hole level=3}
::: hint
On the unit circle the denominator $x^2 + y^2$ equals $1$, so the integrand collapses. For the curl, differentiate the quotient $(x^2 + y^2)^{-1}$ and watch the two terms in the $z$-component cancel. The surface Stokes' theorem would need has to stay off the $z$-axis.
:::
Let $\mathbf{F} = (-y/(x^2 + y^2),\, x/(x^2 + y^2),\, 0)$ on $\R^3$ with the $z$-axis removed. Show that $\curl\mathbf{F} = \mathbf{0}$ at every point of the domain, and that the circulation once anticlockwise around the unit circle in the plane $z = 0$ is $2\pi$. Explain why this does not contradict Stokes' theorem.
::: solution
Write $F_x = -y(x^2 + y^2)^{-1}$ and $F_y = x(x^2 + y^2)^{-1}$, with $F_z = 0$. The derivatives with respect to $z$ vanish, so the $x$- and $y$-components of the curl are zero. For the $z$-component,

$$
\pdv{F_y}{x} = (x^2 + y^2)^{-1} - 2x^2(x^2 + y^2)^{-2} = \frac{y^2 - x^2}{(x^2 + y^2)^2},
$$

and

$$
\pdv{F_x}{y} = -(x^2 + y^2)^{-1} + 2y^2(x^2 + y^2)^{-2} = \frac{y^2 - x^2}{(x^2 + y^2)^2}.
$$

The difference is zero wherever the denominator is not zero, that is, off the $z$-axis. So the curl vanishes on the whole domain.

On the unit circle, $x = \cos\theta$, $y = \sin\theta$ and $x^2 + y^2 = 1$, so $\mathbf{F} = (-\sin\theta,\, \cos\theta,\, 0)$ and $\mathbf{r}' = (-\sin\theta,\, \cos\theta,\, 0)$. The integrand is $1$, and the circulation is $2\pi$.

Stokes' theorem does not promise that this circulation equals a flux of the curl, because it demands a surface bounded by the circle and lying inside the domain, where $\mathbf{F}$ is continuously differentiable. The flat disk meets the origin, which is not in the domain. A surface that bows out of the plane still has to meet the $z$-axis: the unit circle winds once around that axis, and no surface with that boundary stays off the axis. Every candidate surface hits the line on which $\mathbf{F}$ is undefined. The curl is zero where it exists, the circulation is $2\pi$, and the hypothesis of [[#thm-stokes]] is not satisfied. The domain is not simply connected, so [[#thm-stokes-potential]] does not apply either. The field is not conservative on $\R^3$ minus the $z$-axis, even though its curl is zero.
:::
:::

::: exercise The divergence theorem on a box {#exr-box level=3}
::: hint
Integrate $\partial F_x/\partial x$ in $x$ first. The fundamental theorem of calculus produces the two faces $x = a$ and $x = 0$, and the outward normal on $x = 0$ supplies the minus sign.
:::
Let $\mathbf{F}$ have continuous first partial derivatives on an open set containing the box $V$ given by $0 \le x \le a$, $0 \le y \le b$, $0 \le z \le c$, with $a$, $b$ and $c$ positive. Prove the divergence theorem for this box by comparing each term of the divergence with the flux through the corresponding pair of faces.
::: solution
Integrate the first term in the divergence:

$$
\int_V \pdv{F_x}{x}\,\dd V = \int_0^c\int_0^b \big(F_x(a, y, z) - F_x(0, y, z)\big)\dd y\,\dd z.
$$

On the face $x = a$ the outward normal is $\mathbf{i}$ and the vector area element is $\mathbf{i}\,\dd y\,\dd z$, so the flux of $\mathbf{F}$ through that face is the integral of $F_x(a, y, z)$. On the face $x = 0$ the outward normal is $-\mathbf{i}$, so the flux is the integral of $-F_x(0, y, z)$. The sum of those two fluxes is the volume integral of $\partial F_x/\partial x$.

The same calculation in $y$, between the faces $y = b$ and $y = 0$, identifies the volume integral of $\partial F_y/\partial y$ with the outward flux of the $y$-component. The faces $z = c$ and $z = 0$ do the same for $\partial F_z/\partial z$. Adding the three pairs gives

$$
\int_V \divg\mathbf{F}\,\dd V = \oint_{\partial V} \mathbf{F}\cdot\dd\mathbf{A},
$$

with the outward orientation. No property of $\mathbf{F}$ was used beyond continuous first partials, so that the inner integral in $x$ really is the difference of the endpoint values. A field that is singular inside the box is excluded by that hypothesis, just as the origin is excluded in [[#thm-delta]].
:::
:::
