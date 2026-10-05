A temperature, a pressure and an electrostatic potential are numbers attached to points of space. A wind velocity, a force and a magnetic field are vectors attached to those same points. Differentiation has to be rebuilt for both kinds of object, because the increment of a field depends on the direction in which you step. The three operators that come out of that rebuilding — the gradient, the divergence and the curl — are the language of fluid mechanics and of electromagnetism.

This chapter works in ordinary three-dimensional space, with the Cartesian vectors of [[mechanics/units-vectors]] assumed. A partial derivative is an ordinary derivative in which the other coordinates are held fixed. Whenever an identity moves one partial derivative past another, the second partial derivatives are assumed continuous, so that the mixed partials agree. The integral theorems that turn these local operators into global statements are in [[math-methods/integral-theorems]].

## Scalar fields and vector fields {#fields}

A field is a function of position. The value may be a number or a vector, and it may also depend on time. For most of the calculus below the time is frozen, and the field is a function of a point alone.

::: definition Scalar and vector fields {#def-field}
A **scalar field** on a region $U \subset \R^3$ is a function $f \colon U \to \R$. A **vector field** on $U$ is a function $\mathbf{F} \colon U \to \R^3$. In a Cartesian frame,

$$
\mathbf{F}(x, y, z) = F_x(x, y, z)\,\mathbf{i} + F_y(x, y, z)\,\mathbf{j} + F_z(x, y, z)\,\mathbf{k},
$$

and $F_x$, $F_y$, $F_z$ are the **component fields**. We write $\mathbf{F} = (F_x, F_y, F_z)$.
:::

The height of a hillside is a scalar field on the horizontal plane. The velocity of a river is a vector field. So is the electric field of a charge distribution, and so is the gravitational acceleration near the Earth, which is nearly the constant vector $(0, 0, -g)$ in a frame with $z$ upward and $g = 9.80\,\mathrm{m/s^2}$. A constant vector field is a legitimate field: the derivatives we are about to define simply come out zero.

Two warnings about notation belong here, before any derivative is taken. The symbol $\mathbf{r} = (x, y, z)$ is the position vector, and $r = \abs{\mathbf{r}} = \sqrt{x^2 + y^2 + z^2}$ is its length. A radial unit vector is $\mathbf{e}_r = \mathbf{r}/r$ for $r \neq 0$. Component functions are scalars. The vector is the sum of each component times the corresponding unit vector, and a derivative of the vector is the vector of the derivatives only in a Cartesian frame whose unit vectors do not themselves change from point to point. That last sentence is the reason the formulae in spherical coordinates, later in the chapter, are not the Cartesian formulae with the letters renamed.

A field may fail to be defined at a point it surrounds. The potential of a point charge behaves as $1/r$ and is not defined at the origin, and it is not bounded there either. Every derivative formula below is a statement about points where the field is differentiable. The origin, for that potential, is not such a point. What to do with the missing point is a question for the divergence theorem.

## The gradient {#gradient}

The rate of change of a scalar field depends on the direction of the step. The gradient packs all of those rates into one vector.

::: definition Gradient and directional derivative {#def-gradient}
Let $f$ be a scalar field whose first partial derivatives exist at a point. The **gradient** of $f$ at that point is the vector

$$
\nabla f = \pdv{f}{x}\,\mathbf{i} + \pdv{f}{y}\,\mathbf{j} + \pdv{f}{z}\,\mathbf{k} = \left(\pdv{f}{x},\, \pdv{f}{y},\, \pdv{f}{z}\right).
$$ {#eq-gradient}

If $\mathbf{u}$ is a unit vector, the **directional derivative** of $f$ in the direction $\mathbf{u}$ is

$$
D_{\mathbf{u}} f = \nabla f \cdot \mathbf{u}.
$$ {#eq-directional}
:::

The formula is the chain rule in disguise. Along the straight line $\mathbf{r}(t) = \mathbf{p} + t\mathbf{u}$,

$$
\deriv{}{t} f(\mathbf{r}(t)) = \pdv{f}{x} u_x + \pdv{f}{y} u_y + \pdv{f}{z} u_z = \nabla f \cdot \mathbf{u},
$$

evaluated at $t = 0$. The same chain rule along an arbitrary differentiable curve reads

$$
\deriv{}{t} f(\mathbf{r}(t)) = \nabla f(\mathbf{r}(t)) \cdot \mathbf{r}'(t).
$$ {#eq-chain}

So $D_{\mathbf{u}} f$ is the rate of change of $f$ per unit distance, not per unit time. If the step is a vector $\mathbf{v}$ that is not a unit vector, the rate per unit distance is $\nabla f \cdot \mathbf{v}/\abs{\mathbf{v}}$. Forgetting to divide by the length is the usual source of a wrong directional derivative.

Since $\nabla f \cdot \mathbf{u} = \abs{\nabla f}\cos\theta$, the directional derivative is largest when $\mathbf{u}$ points along $\nabla f$, and the largest value is $\abs{\nabla f}$. It is smallest, equal to $-\abs{\nabla f}$, in the opposite direction. It is zero when $\mathbf{u}$ is perpendicular to $\nabla f$.

::: theorem Gradient and level surfaces {#thm-level}
Let $f$ have continuous first partial derivatives near a point $\mathbf{p}$ where $\nabla f(\mathbf{p}) \neq \mathbf{0}$. Then $\nabla f(\mathbf{p})$ is perpendicular to every curve that lies in the level set $f = f(\mathbf{p})$ and passes through $\mathbf{p}$. The direction of $\nabla f(\mathbf{p})$ is the direction of steepest increase of $f$, and the slope in that direction is $\abs{\nabla f(\mathbf{p})}$.
:::

::: proof
Let $\mathbf{r}(t)$ be a differentiable curve with $\mathbf{r}(0) = \mathbf{p}$ and $f(\mathbf{r}(t)) = f(\mathbf{p})$ for every $t$ near $0$. Differentiating the constant with [[#eq-chain]] gives $\nabla f(\mathbf{p}) \cdot \mathbf{r}'(0) = 0$. Every tangent vector to the level set is therefore perpendicular to $\nabla f(\mathbf{p})$. Where the gradient is not zero, those tangent vectors fill a plane, the tangent plane of the level surface, and $\nabla f(\mathbf{p})$ is a normal vector to that plane.

For the steepest increase, let $\mathbf{u}$ be a unit vector and $\theta$ the angle between $\mathbf{u}$ and $\nabla f$. Then $D_{\mathbf{u}} f = \abs{\nabla f}\cos\theta$ by [[#eq-directional]]. The cosine is at most $1$, and it equals $1$ only when $\mathbf{u}$ is the unit vector in the direction of $\nabla f$. The value attained there is $\abs{\nabla f}$.
:::

The hypothesis $\nabla f \neq \mathbf{0}$ matters. At a maximum, a minimum or a saddle the gradient vanishes, and the level set through that point need not look like a smooth surface. The top of a hill is a level point of the height function, and the tangent plane there is horizontal because the gradient is the zero vector, which is not a useful normal. The proof did not claim a normal at such a point.

::: intuition
On a map, the level curves of height are the contours. The gradient is perpendicular to the contour you are standing on, and it points uphill. Its length is the slope of the hillside in that uphill direction: rise over run. Walking along the contour, the directional derivative is zero and you neither climb nor descend. Water runs in the opposite direction, down the gradient of the height.
:::

::: example A temperature and its steepest rise {#ex-temperature}
A temperature field, in degrees and metres, is $f(x, y, z) = 2xy + z^2$. Find the gradient at $P = (1, 3, -1)$, the directional derivative there in the direction of $\mathbf{v} = (2, -1, 2)$, and the rate of steepest increase.
::: solution
Differentiate each coordinate, holding the others fixed:

$$
\nabla f = (2y,\, 2x,\, 2z).
$$

At $P$,

$$
\nabla f(P) = (2\cdot 3,\, 2\cdot 1,\, 2\cdot(-1)) = (6, 2, -2).
$$

The vector $\mathbf{v}$ has length $\abs{\mathbf{v}} = \sqrt{4 + 1 + 4} = 3$, so the unit vector in its direction is $\mathbf{u} = (2/3,\, -1/3,\, 2/3)$. Then

$$
D_{\mathbf{u}} f = 6\cdot\frac{2}{3} + 2\cdot\left(-\frac{1}{3}\right) + (-2)\cdot\frac{2}{3} = 4 - \frac{2}{3} - \frac{4}{3} = 2.
$$

Walking from $P$ in the direction of $\mathbf{v}$, the temperature rises by $2$ degrees per metre. The steepest rise is the magnitude

$$
\abs{\nabla f(P)} = \sqrt{36 + 4 + 4} = \sqrt{44} = 2\sqrt{11},
$$

about $6.63$ degrees per metre, in the direction of $(6, 2, -2)$. The directional derivative $2$ is smaller, as it must be, because $\mathbf{u}$ is not parallel to the gradient.
:::
:::

::: quiz
The gradient of a scalar field at a point where it is not zero is best described by which statement?
- [ ] It is tangent to the level surface, and its length is the value of the field.
- [x] It is perpendicular to the level surface, and it points towards increasing values of the field.
- [ ] It is perpendicular to the level surface, and it points towards decreasing values of the field.
- [ ] It equals the curl of the field.
::: solution
By [[#thm-level]] the gradient is a normal to the level surface, not a tangent. The directional derivative in its own direction equals the positive number $\abs{\nabla f}$, so the field increases that way. The opposite direction is the direction of steepest decrease. The curl is an operator on vector fields, and it is not part of this comparison.
:::
:::

## Divergence {#divergence}

A vector field can carry something — mass, charge, heat — from place to place. The divergence measures the net rate at which that something appears, per unit volume, at a point.

::: definition Divergence {#def-divergence}
The **divergence** of a vector field $\mathbf{F} = (F_x, F_y, F_z)$, at a point where the first partial derivatives of the components exist, is the scalar

$$
\divg \mathbf{F} = \pdv{F_x}{x} + \pdv{F_y}{y} + \pdv{F_z}{z}.
$$ {#eq-divergence}
:::

The coordinate formula is the one used for calculation. Its meaning is a flux. For a small region $\Delta V$ with outward-oriented boundary,

$$
\divg \mathbf{F} = \lim_{\Delta V \to 0} \frac{1}{\Delta V} \oint_{\partial(\Delta V)} \mathbf{F}\cdot\dd\mathbf{A},
$$ {#eq-div-geom}

when the limit is taken through regions that shrink to the point in a controlled way, for example through cubes or balls. A positive divergence is a source: more field leaves the small region than enters it. A negative divergence is a sink. A field with $\divg \mathbf{F} = 0$ everywhere in a region is called **solenoidal** there, or divergence-free. Incompressible flow is modelled by a divergence-free velocity field, because a positive divergence would be a local creation of volume.

::: proposition Flux through a small box {#prop-flux}
Suppose the components of $\mathbf{F}$ have continuous first partial derivatives. Then the limit in [[#eq-div-geom]], taken over boxes centred at the point, exists and equals [[#eq-divergence]].
:::

::: proof
Take the box $[x, x+\Delta x] \times [y, y+\Delta y] \times [z, z+\Delta z]$, with each side length positive and small. On the face at $x+\Delta x$ the outward normal is $\mathbf{i}$, and on the face at $x$ the outward normal is $-\mathbf{i}$. The combined contribution of that pair to the flux is

$$
\int\!\!\int \big(F_x(x+\Delta x, y', z') - F_x(x, y', z')\big)\,\dd y'\,\dd z'.
$$

By the mean value theorem the difference of $F_x$ equals $\partial F_x/\partial x$, evaluated at an intermediate $x$, times $\Delta x$. Dividing by the volume $\Delta x\,\Delta y\,\Delta z$ and sending the side lengths to zero, continuity of the partial derivative pulls the intermediate point back to $(x, y, z)$ and leaves $\partial F_x/\partial x$. The pairs of faces normal to $\mathbf{j}$ and to $\mathbf{k}$ contribute $\partial F_y/\partial y$ and $\partial F_z/\partial z$. The sum is [[#eq-divergence]].
:::

The argument is local. It says nothing about the flux through a large surface. Passing from the local limit to a finite region is the divergence theorem, and it needs its own hypotheses.

For a product of a scalar and a vector the operator acts on both factors, as a derivative should.

::: proposition Product rule for the divergence {#prop-product}
If $\phi$ and the components of $\mathbf{F}$ have continuous first partial derivatives, then

$$
\divg(\phi\mathbf{F}) = \nabla\phi \cdot \mathbf{F} + \phi\,\divg\mathbf{F}.
$$ {#eq-product}
:::

::: proof
The $x$-component of $\phi\mathbf{F}$ is $\phi F_x$, and

$$
\pdv{}{x}(\phi F_x) = \pdv{\phi}{x} F_x + \phi\pdv{F_x}{x}.
$$

Add the three components. The terms in which $\phi$ is differentiated assemble into the dot product $\nabla\phi \cdot \mathbf{F}$. The terms in which a component of $\mathbf{F}$ is differentiated assemble into $\phi\,\divg\mathbf{F}$.
:::

There is a companion rule $\curl(\phi\mathbf{F}) = \nabla\phi \times \mathbf{F} + \phi\,\curl\mathbf{F}$. The proof is the same expansion, one component at a time, and it is left as an exercise so that the pattern is checked rather than memorised.

## Curl {#curl}

Divergence asks how much a field spreads out. Curl asks how much it circulates.

::: definition Curl {#def-curl}
The **curl** of $\mathbf{F} = (F_x, F_y, F_z)$ is the vector field

$$
\begin{aligned}
\curl\mathbf{F} = \bigg(
&\pdv{F_z}{y} - \pdv{F_y}{z},\;
\pdv{F_x}{z} - \pdv{F_z}{x},\;
\pdv{F_y}{x} - \pdv{F_x}{y}
\bigg).
\end{aligned}
$$ {#eq-curl}
:::

The third component is the one that survives in a planar field $\mathbf{F} = (F_x, F_y, 0)$ with no $z$-dependence: $(\curl\mathbf{F})_z = \partial F_y/\partial x - \partial F_x/\partial y$. The first two components record circulation in planes normal to $\mathbf{i}$ and to $\mathbf{j}$. The formal determinant with row $\mathbf{i}, \mathbf{j}, \mathbf{k}$, row $\partial/\partial x, \partial/\partial y, \partial/\partial z$ and row $F_x, F_y, F_z$ expands to the same three expressions, including the minus sign that the middle component inherits from the cofactor. It is a memory aid, not a different definition. Expanding it and dropping that minus sign is a common way to get the middle component backwards.

The geometric content matches the box argument for the divergence. For a small flat patch of area $\Delta A$ with unit normal $\mathbf{n}$, oriented by the right-hand rule,

$$
(\curl\mathbf{F})\cdot\mathbf{n} = \lim_{\Delta A \to 0} \frac{1}{\Delta A} \oint_{\partial(\Delta A)} \mathbf{F}\cdot\dd\mathbf{r}.
$$ {#eq-curl-geom}

The line integral around the edge is the **circulation**. Positive curl in the direction $\mathbf{n}$ means the field turns anticlockwise when you look along $\mathbf{n}$.

::: proposition Circulation around a small rectangle {#prop-circulation}
Let the components of $\mathbf{F}$ have continuous first partial derivatives. Then the circulation of $\mathbf{F}$ around the boundary of a small rectangle in a plane of constant $z$, divided by the area of the rectangle and taken to the limit, equals $(\curl\mathbf{F})_z$. The boundary is read anticlockwise when seen from the positive $z$-side.
:::

::: proof
Place the rectangle with corners $(x, y)$, $(x+\Delta x, y)$, $(x+\Delta x, y+\Delta y)$ and $(x, y+\Delta y)$, at fixed $z$. Along the bottom, $\dd\mathbf{r} = \mathbf{i}\,\dd x$ and the integral of $F_x$ is $F_x$ at an intermediate point of the bottom edge, times $\Delta x$. Along the top, the anticlockwise sense runs from right to left, so that contribution is minus $F_x$ at an intermediate point of the top edge, times $\Delta x$. The difference of those values of $F_x$, divided by $\Delta y$, tends to $-\partial F_x/\partial y$. Along the vertical edges the same reasoning produces $\partial F_y/\partial x$. Dividing the whole circulation by the area $\Delta x\,\Delta y$ and passing to the limit leaves

$$
\pdv{F_y}{x} - \pdv{F_x}{y},
$$

which is the third component in [[#eq-curl]]. The normal supplied by the right-hand rule is $+\mathbf{k}$.
:::

The same computation in the other two coordinate planes gives the other two components. A field with $\curl\mathbf{F} = \mathbf{0}$ throughout a region is called **irrotational** there. The name is deserved for the velocity of a fluid: a small paddle wheel, whose rotation measures the circulation around its rim, does not spin where the curl vanishes.

::: example Solid-body rotation {#ex-rotation}
Let $\mathbf{F} = (-y,\, x,\, 0)$. Compute the divergence and the curl. Show that $\mathbf{F}$ is the velocity field of a rigid rotation with angular-velocity vector $\boldsymbol{\omega} = \mathbf{k}$, and that a general constant angular velocity satisfies $\curl(\boldsymbol{\omega}\times\mathbf{r}) = 2\boldsymbol{\omega}$.
::: solution
The components are $F_x = -y$, $F_y = x$, $F_z = 0$. None of them depends on the variable it is differentiated by in the divergence, so

$$
\divg\mathbf{F} = \pdv{(-y)}{x} + \pdv{x}{y} + \pdv{0}{z} = 0.
$$

The curl has only one surviving pair of derivatives:

$$
\begin{aligned}
(\curl\mathbf{F})_x &= \pdv{0}{y} - \pdv{x}{z} = 0,\\
(\curl\mathbf{F})_y &= \pdv{(-y)}{z} - \pdv{0}{x} = 0,\\
(\curl\mathbf{F})_z &= \pdv{x}{x} - \pdv{(-y)}{y} = 1 - (-1) = 2.
\end{aligned}
$$

Thus $\curl\mathbf{F} = (0, 0, 2)$.

Rigid rotation at instantaneous angular velocity $\boldsymbol{\omega}$ has velocity $\mathbf{v} = \boldsymbol{\omega}\times\mathbf{r}$. With $\boldsymbol{\omega} = \omega\mathbf{k}$ and $\mathbf{r} = (x, y, z)$,

$$
\boldsymbol{\omega}\times\mathbf{r} = \begin{vmatrix}
\mathbf{i} & \mathbf{j} & \mathbf{k} \\
0 & 0 & \omega \\
x & y & z
\end{vmatrix}
= (-\omega y,\, \omega x,\, 0).
$$

The case $\omega = 1$ is exactly $\mathbf{F}$. The speed at perpendicular distance $\rho = \sqrt{x^2 + y^2}$ from the axis is $\omega\rho$, which is the speed of a body turning at angular speed $\omega$. The divergence is zero: rigid rotation does not create volume.

For a constant vector $\boldsymbol{\omega} = (\omega_x, \omega_y, \omega_z)$ the cross product is

$$
\boldsymbol{\omega}\times\mathbf{r} = (\omega_y z - \omega_z y,\; \omega_z x - \omega_x z,\; \omega_x y - \omega_y x).
$$

Differentiate. The $x$-component of the curl is

$$
\pdv{}{y}(\omega_x y - \omega_y x) - \pdv{}{z}(\omega_z x - \omega_x z) = \omega_x - (-\omega_x) = 2\omega_x,
$$

and the $y$- and $z$-components likewise each contribute a factor $2$. Therefore $\curl(\boldsymbol{\omega}\times\mathbf{r}) = 2\boldsymbol{\omega}$. For the field of this example, $\boldsymbol{\omega} = \mathbf{k}$ and the curl is $2\mathbf{k}$, in agreement with the direct computation. The curl is constant, not larger farther from the axis: every small paddle wheel, wherever it sits, spins at the same rate.
:::
:::

The planar picture of this field is a slope field. The vector $(-y, x)$ has slope $\dd y/\dd x = x/(-y) = -x/y$ wherever $y \neq 0$.

::: widget slopefield
f: -x/y
x: -3, 3
y: -3, 3
caption: The arrows are the slope field of y' = -x/y, which is the direction of the planar field (-y, x). Click a point off the horizontal axis: the solution is an arc of a circle, an orbit of steady rotation, and the solver stops where the tangent becomes vertical because it is drawing y as a function of x. On the axis itself the formula divides by y, and the arrows are drawn vertical. The curl of (-y, x, 0) is the constant (0, 0, 2), the same at every point.
:::

Changing the formula in the figure to something other than $-x/y$ draws a different family of curves. The circles belong to this particular right-hand side, and to the rigid rotation whose curl is constant.

## Two identities and the Laplacian {#identities}

The gradient of a scalar has no curl, and the curl of a vector has no divergence. Both facts are the equality of mixed partial derivatives, and both are used every time a potential or a vector potential is introduced.

::: theorem Curl of a gradient {#thm-curl-grad}
Let $f$ be a scalar field whose second partial derivatives exist and are continuous. Then

$$
\curl(\nabla f) = \mathbf{0}.
$$ {#eq-curl-grad}
:::

::: proof
The gradient is $(\partial f/\partial x,\, \partial f/\partial y,\, \partial f/\partial z)$. Its curl, by [[#eq-curl]], has components

$$
\begin{aligned}
\pdv{}{y}\pdv{f}{z} - \pdv{}{z}\pdv{f}{y}, \qquad
\pdv{}{z}\pdv{f}{x} - \pdv{}{x}\pdv{f}{z}, \qquad
\pdv{}{x}\pdv{f}{y} - \pdv{}{y}\pdv{f}{x}.
\end{aligned}
$$

Continuity of the second partials makes each pair equal: $\partial^2 f/\partial y\,\partial z = \partial^2 f/\partial z\,\partial y$, and likewise for the other two pairs. Every component is zero.
:::

::: theorem Divergence of a curl {#thm-div-curl}
Let the components of $\mathbf{F}$ have continuous second partial derivatives. Then

$$
\divg(\curl\mathbf{F}) = 0.
$$ {#eq-div-curl}
:::

::: proof
Write out [[#eq-divergence]] on the vector [[#eq-curl]]:

$$
\begin{aligned}
\divg(\curl\mathbf{F})
&= \pdv{}{x}\!\left(\pdv{F_z}{y} - \pdv{F_y}{z}\right)
+ \pdv{}{y}\!\left(\pdv{F_x}{z} - \pdv{F_z}{x}\right)
+ \pdv{}{z}\!\left(\pdv{F_y}{x} - \pdv{F_x}{y}\right).
\end{aligned}
$$

Six second partials appear. Continuity lets us rearrange the order of differentiation, and they cancel in three pairs: $\partial^2 F_z/\partial x\,\partial y$ against $\partial^2 F_z/\partial y\,\partial x$, $\partial^2 F_x/\partial y\,\partial z$ against $\partial^2 F_x/\partial z\,\partial y$, and $\partial^2 F_y/\partial z\,\partial x$ against $\partial^2 F_y/\partial x\,\partial z$.
:::

The converses need a hypothesis on the shape of the region, and they are false without it. On a ball, a smooth irrotational field is a gradient, and a smooth divergence-free field is a curl. On a punctured plane the angular field $(-y, x)/(x^2 + y^2)$ is irrotational wherever it is defined, and it is not a gradient on the whole punctured plane. That distinction is drawn in [[math-methods/integral-theorems]].

Applying the divergence to a gradient produces the operator that sits inside Laplace's equation, Poisson's equation and the wave equation.

::: definition Laplacian {#def-laplacian}
The **Laplacian** of a scalar field $f$ is the divergence of its gradient,

$$
\nabla^2 f = \divg(\nabla f) = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2},
$$

wherever the second partial derivatives exist. A field with $\nabla^2 f = 0$ on a region is called **harmonic** there.
:::

The Laplacian of a vector field, used in electromagnetism, is the vector whose Cartesian components are the Laplacians of the component scalars. That abbreviation is safe only in Cartesian components. In spherical components the Laplacian of a vector picks up extra terms from the turning unit vectors, and the abbreviation is wrong.

::: example A harmonic polynomial {#ex-harmonic}
Let $f(x, y, z) = x^2 + y^2 - 2z^2$. Compute $\nabla f$ and $\nabla^2 f$.
::: solution
The gradient is $\nabla f = (2x,\, 2y,\, -4z)$. Differentiate again:

$$
\frac{\partial^2 f}{\partial x^2} = 2, \qquad \frac{\partial^2 f}{\partial y^2} = 2, \qquad \frac{\partial^2 f}{\partial z^2} = -4.
$$

The Laplacian is $2 + 2 - 4 = 0$ at every point, so $f$ is harmonic on all of space. The level surface $f = 0$ is the cone $x^2 + y^2 = 2z^2$. The gradient $(2x, 2y, -4z)$ is normal to that cone wherever it is not the zero vector, which is only at the origin. Harmonic functions are the scalar potentials of source-free regions: if $\mathbf{F} = -\nabla f$ and $\nabla^2 f = 0$, then $\mathbf{F}$ is both irrotational and solenoidal.
:::
:::

## Orthogonal curvilinear coordinates {#curvilinear}

Cartesian partial derivatives are the right tool when the components are given in $x$, $y$ and $z$. A point charge, a straight wire and a spinning cylinder are not shaped like a box, and the same operators written in spherical or cylindrical coordinates are shorter. The cost is that the coordinate unit vectors change from point to point, so the formulae are not the Cartesian ones with new letters.

An **orthogonal curvilinear** system $(u, v, w)$ labels each point by three numbers, and the three coordinate directions are mutually perpendicular. A small displacement splits into three perpendicular pieces,

$$
\dd\mathbf{r} = h_u\,\dd u\,\mathbf{e}_u + h_v\,\dd v\,\mathbf{e}_v + h_w\,\dd w\,\mathbf{e}_w.
$$

The positive functions $h_u$, $h_v$, $h_w$ are the **scale factors**. They convert a change in a coordinate into a length. In Cartesian coordinates every scale factor is $1$. The gradient is read off from $\dd f = \nabla f \cdot \dd\mathbf{r}$: the coefficient of each unit vector is the corresponding partial derivative divided by the scale factor,

$$
\nabla f = \frac{1}{h_u}\pdv{f}{u}\,\mathbf{e}_u + \frac{1}{h_v}\pdv{f}{v}\,\mathbf{e}_v + \frac{1}{h_w}\pdv{f}{w}\,\mathbf{e}_w.
$$ {#eq-grad-orth}

The divergence is the flux-per-volume limit of [[#eq-div-geom]], applied to a small coordinate box of side lengths $h_u\,\dd u$, $h_v\,\dd v$ and $h_w\,\dd w$. The volume of that box is $h_u h_v h_w\,\dd u\,\dd v\,\dd w$, and the flux through a pair of faces brings down one derivative of a component times the two transverse scale factors. The result is

$$
\divg\mathbf{F} = \frac{1}{h_u h_v h_w}\left[
\pdv{}{u}(F_u h_v h_w) + \pdv{}{v}(F_v h_w h_u) + \pdv{}{w}(F_w h_u h_v)
\right].
$$ {#eq-div-orth}

The Laplacian is this formula applied to $\mathbf{F} = \nabla f$. The curl has a similar scale-factor expression; the cylindrical and spherical cases are written out below, and they should be used as they stand rather than rebuilt in the middle of a calculation.

### Cylindrical coordinates

Cylindrical coordinates $(\rho, \varphi, z)$ use the perpendicular distance from the $z$-axis, the azimuthal angle and the original height:

$$
x = \rho\cos\varphi, \qquad y = \rho\sin\varphi, \qquad z = z,
$$

with $\rho \ge 0$ and $\varphi$ read anticlockwise from the positive $x$-axis. Differentiating the position with respect to each coordinate gives the scale factors. The $\rho$-derivative of $\mathbf{r}$ is the unit vector $\mathbf{e}_\rho = (\cos\varphi, \sin\varphi, 0)$, so $h_\rho = 1$. The $\varphi$-derivative is $\rho(-\sin\varphi, \cos\varphi, 0)$, a vector of length $\rho$, so $h_\varphi = \rho$ and $\mathbf{e}_\varphi = (-\sin\varphi, \cos\varphi, 0)$. The $z$-derivative is $\mathbf{k}$, so $h_z = 1$.

[[#eq-grad-orth]] and [[#eq-div-orth]] therefore become

$$
\nabla f = \pdv{f}{\rho}\,\mathbf{e}_\rho + \frac{1}{\rho}\pdv{f}{\varphi}\,\mathbf{e}_\varphi + \pdv{f}{z}\,\mathbf{e}_z,
$$ {#eq-grad-cyl}

$$
\divg\mathbf{F} = \frac{1}{\rho}\pdv{}{\rho}(\rho F_\rho) + \frac{1}{\rho}\pdv{F_\varphi}{\varphi} + \pdv{F_z}{z}.
$$ {#eq-div-cyl}

The curl is

$$
\begin{aligned}
\curl\mathbf{F}
&= \left(\frac{1}{\rho}\pdv{F_z}{\varphi} - \pdv{F_\varphi}{z}\right)\mathbf{e}_\rho
+ \left(\pdv{F_\rho}{z} - \pdv{F_z}{\rho}\right)\mathbf{e}_\varphi \\
&\quad + \frac{1}{\rho}\left(\pdv{}{\rho}(\rho F_\varphi) - \pdv{F_\rho}{\varphi}\right)\mathbf{e}_z.
\end{aligned}
$$ {#eq-curl-cyl}

The Laplacian of a scalar is

$$
\nabla^2 f = \frac{1}{\rho}\pdv{}{\rho}\!\left(\rho\pdv{f}{\rho}\right) + \frac{1}{\rho^2}\frac{\partial^2 f}{\partial \varphi^2} + \frac{\partial^2 f}{\partial z^2}.
$$ {#eq-lap-cyl}

Every one of these expressions misbehaves on the axis $\rho = 0$, where the coordinate $\varphi$ is undefined and the scale factor $h_\varphi$ vanishes. A field that is smooth in Cartesian coordinates may look singular in these formulae on the axis and still be perfectly regular. The test is to rewrite it in $x$ and $y$ before concluding that something has gone wrong.

### Spherical coordinates

Spherical coordinates $(r, \theta, \varphi)$ use the distance from the origin, the polar angle from the positive $z$-axis, and the same azimuth as in cylindrical coordinates:

$$
x = r\sin\theta\cos\varphi, \qquad y = r\sin\theta\sin\varphi, \qquad z = r\cos\theta,
$$

with $r \ge 0$, $0 \le \theta \le \pi$ and $\varphi$ anticlockwise about the $z$-axis. This is the convention of physics. A mathematics text often swaps the names of $\theta$ and $\varphi$. The scale factors, computed as lengths of the partial derivatives of $\mathbf{r}$, are

$$
h_r = 1, \qquad h_\theta = r, \qquad h_\varphi = r\sin\theta.
$$

The gradient and the divergence are

$$
\nabla f = \pdv{f}{r}\,\mathbf{e}_r + \frac{1}{r}\pdv{f}{\theta}\,\mathbf{e}_\theta + \frac{1}{r\sin\theta}\pdv{f}{\varphi}\,\mathbf{e}_\varphi,
$$ {#eq-grad-sph}

$$
\divg\mathbf{F} = \frac{1}{r^2}\pdv{}{r}(r^2 F_r) + \frac{1}{r\sin\theta}\pdv{}{\theta}(\sin\theta\, F_\theta) + \frac{1}{r\sin\theta}\pdv{F_\varphi}{\varphi}.
$$ {#eq-div-sph}

The curl is

$$
\begin{aligned}
(\curl\mathbf{F})_r &= \frac{1}{r\sin\theta}\left(\pdv{}{\theta}(F_\varphi\sin\theta) - \pdv{F_\theta}{\varphi}\right),\\
(\curl\mathbf{F})_\theta &= \frac{1}{r\sin\theta}\pdv{F_r}{\varphi} - \frac{1}{r}\pdv{}{r}(r F_\varphi),\\
(\curl\mathbf{F})_\varphi &= \frac{1}{r}\pdv{}{r}(r F_\theta) - \frac{1}{r}\pdv{F_r}{\theta}.
\end{aligned}
$$ {#eq-curl-sph}

The Laplacian is

$$
\begin{aligned}
\nabla^2 f &= \frac{1}{r^2}\pdv{}{r}\!\left(r^2\pdv{f}{r}\right) + \frac{1}{r^2\sin\theta}\pdv{}{\theta}\!\left(\sin\theta\pdv{f}{\theta}\right) \\
&\quad + \frac{1}{r^2\sin^2\theta}\frac{\partial^2 f}{\partial \varphi^2}.
\end{aligned}
$$ {#eq-lap-sph}

The coordinate singularities sit at $r = 0$ and on the $z$-axis where $\sin\theta = 0$. As in the cylindrical case, a singularity of a component formula on that set is not automatically a singularity of the field.

For a function of $r$ alone the angular derivatives drop out, and the Laplacian collapses to a single ordinary derivative. This is the form used for a spherically symmetric potential.

::: proposition Radial part of the spherical Laplacian {#prop-radial}
Let $f$ depend only on the spherical radius $r$, and assume $f$ is twice differentiable for $r > 0$. Then

$$
\nabla^2 f = \frac{1}{r^2}\deriv{}{r}\!\left(r^2\deriv{f}{r}\right).
$$ {#eq-lap-radial}

In particular, for $r > 0$,

$$
\nabla^2(r^n) = n(n+1)\,r^{n-2}, \qquad \nabla^2\!\left(\frac{1}{r}\right) = 0.
$$
:::

::: proof
A step of length $\dd r$ along $\mathbf{e}_r$ changes $f$ by $f'(r)\,\dd r$. A step tangent to the sphere of radius $r$ holds $r$ fixed and does not change $f$. So $\nabla f = f'(r)\,\mathbf{e}_r$, in agreement with [[#eq-grad-sph]].

Now compute the divergence of $\mathbf{G} = f'(r)\,\mathbf{e}_r$ from the flux through a thin spherical shell $r \le s \le r + \Delta r$, with $r > 0$. On a sphere of radius $s$ the outward flux of $\mathbf{G}$ is $f'(s)$ times the area $4\pi s^2$. The flux leaving the shell is therefore

$$
4\pi(r+\Delta r)^2 f'(r+\Delta r) - 4\pi r^2 f'(r).
$$

The volume of the shell is $4\pi r^2\,\Delta r$ plus a term of order $(\Delta r)^2$. Divide the flux by the volume and let $\Delta r \to 0$. The definition [[#eq-div-geom]] gives

$$
\divg\mathbf{G} = \frac{1}{r^2}\deriv{}{r}\!\left(r^2 f'(r)\right),
$$

which is [[#eq-lap-radial]]. The same identity is the radial piece of [[#eq-lap-sph]], with the angular derivatives omitted.

For $f = r^n$ one has $f' = n r^{n-1}$ and $r^2 f' = n r^{n+1}$, whose derivative is $n(n+1) r^n$. Dividing by $r^2$ leaves $n(n+1) r^{n-2}$. For $f = r^{-1}$ one has $f' = -r^{-2}$ and $r^2 f' = -1$, whose derivative is zero. Hence $1/r$ is harmonic on $\R^3$ with the origin removed.
:::

The removal of the origin is essential. The flux computation used a shell that does not contain the origin, and $1/r$ is not differentiable there. The integral of this Laplacian over a region that does contain the origin is not zero. That calculation is the first application of the divergence theorem in the next chapter, and it produces $-4\pi$ rather than $0$.

::: example The inverse-square field {#ex-inverse-square}
Let $\mathbf{F} = \mathbf{e}_r / r^2$ for $r \neq 0$, the radial field of a point source. Show that $\divg\mathbf{F} = 0$ and $\curl\mathbf{F} = \mathbf{0}$ at every point except the origin, and relate $\mathbf{F}$ to $\nabla(1/r)$.
::: solution
In spherical components, $F_r = r^{-2}$ and $F_\theta = F_\varphi = 0$. The divergence [[#eq-div-sph]] reduces to

$$
\divg\mathbf{F} = \frac{1}{r^2}\deriv{}{r}\!\left(r^2 \cdot r^{-2}\right) = \frac{1}{r^2}\deriv{}{r}(1) = 0, \qquad r \neq 0.
$$

Every term of [[#eq-curl-sph]] contains either an angular component, which is zero, or an angular derivative of $F_r$. Since $F_r$ depends only on $r$, those derivatives vanish, and $\curl\mathbf{F} = \mathbf{0}$ for $r \neq 0$.

The radial calculation of [[#prop-radial]] gave $\nabla(1/r) = -r^{-2}\,\mathbf{e}_r$. Therefore

$$
\mathbf{F} = -\nabla\!\left(\frac{1}{r}\right), \qquad r \neq 0,
$$

which is why the curl had to vanish: [[#thm-curl-grad]] applies on any region that stays away from the origin. The divergence of $\mathbf{F}$ is $-\nabla^2(1/r) = 0$ on that same region. Nothing in this example says that the flux of $\mathbf{F}$ through a closed surface around the origin is zero. The field is not differentiable on the whole interior of such a surface, so the small-box identity cannot be summed up by a theorem that demands a smooth field throughout the volume.

The same cancellation can be seen in Cartesian components, which is a useful check that the spherical formula has not been misremembered. With $r = \sqrt{x^2 + y^2 + z^2}$,

$$
\mathbf{F} = \left(\frac{x}{r^3},\, \frac{y}{r^3},\, \frac{z}{r^3}\right).
$$

Differentiating the first component by $x$ gives $r^{-3} - 3x^2 r^{-5}$. The three components together give

$$
\divg\mathbf{F} = \frac{3}{r^3} - \frac{3(x^2 + y^2 + z^2)}{r^5} = \frac{3}{r^3} - \frac{3}{r^3} = 0
$$

for $r \neq 0$. The $3/r^3$ from the three bare derivatives is cancelled by the three terms that differentiate the denominator. At the origin the components are undefined, and this algebra does not apply.
:::
:::

::: warning
The divergence and the curl in cylindrical or spherical coordinates are not the Cartesian formulae with $(r, \theta, \varphi)$ typed in place of $(x, y, z)$. The scale factors have to be there. In particular, $\partial F_r/\partial r + \partial F_\theta/\partial\theta + \partial F_\varphi/\partial\varphi$ is not the divergence. Use [[#eq-div-cyl]], [[#eq-div-sph]], [[#eq-curl-cyl]] and [[#eq-curl-sph]]. A radial inverse-square field has zero curl and zero divergence at every point except the origin. At the origin the divergence is a delta function, in a sense made precise by the divergence theorem in [[math-methods/integral-theorems]]: the integral of the Laplacian of $1/r$ over a volume is $-4\pi$ when the origin is inside and $0$ when it is outside.
:::

::: history
The algebra of the gradient, the divergence and the curl was organised in the 1880s by J. Willard Gibbs and by Oliver Heaviside, working independently. Gibbs wrote it up for his students at Yale in the privately circulated *Elements of Vector Analysis* of 1881 and 1884. Heaviside used the same operators in his papers on electromagnetism and later in *Electromagnetic Theory*. Both of them separated the scalar part and the vector part of Hamilton's quaternion product into the modern dot and cross products. The names gradient, divergence and curl settled into standard use in that period. Heaviside often wrote "rotation" where the later books write "curl".
:::

## Where this leads {#leads}

The operators here are local. Each one is a limit of a difference quotient, a flux or a circulation on a region that shrinks to a point. [[math-methods/integral-theorems]] promotes those limits to finite regions: the divergence theorem equates the integral of a divergence to a flux, and Stokes' theorem equates the integral of a curl to a circulation. The identity $\curl(\nabla f) = \mathbf{0}$ becomes the statement that a conservative field has a potential, with a hypothesis on the shape of the domain that this chapter has not yet earned.

In electrostatics the electric field is minus the gradient of a potential, [[electrostatics/potential]], and its flux through a closed surface is fixed by the charge inside, [[electrostatics/gauss-law]]. The inverse-square calculation of [[#ex-inverse-square]] is the empty-space half of that law. The magnetic field of a steady current is built so that its curl is the current density, [[magnetism/biot-savart]], and Faraday's law equates the circulation of the electric field to the rate of change of magnetic flux, [[magnetism/faraday]]. The Laplacian returns as Poisson's equation for the electrostatic potential and, later, as the operator inverted by a Green's function in [[math-methods/green-functions]].

The modelling assumption to keep straight is the one in [[#ex-rotation]]. A rigid rotation has curl equal to twice the angular-velocity vector of [[mechanics/rotation]], not equal to the angular velocity itself. The factor of two survives into the relation between vorticity and local spin in a fluid.

::: summary
- A scalar field assigns a number to each point, and a vector field assigns a vector. Cartesian unit vectors are constant; cylindrical and spherical unit vectors are not.
- The gradient $\nabla f$ points in the direction of steepest increase, with length equal to that slope, and it is perpendicular to the level surface of $f$.
- The directional derivative in the direction of a unit vector $\mathbf{u}$ is $\nabla f \cdot \mathbf{u}$. Divide by $\abs{\mathbf{v}}$ if the given direction vector is not a unit vector.
- The divergence is the flux per unit volume. In Cartesian components it is the sum of $\partial F_x/\partial x$, $\partial F_y/\partial y$ and $\partial F_z/\partial z$.
- The curl is the circulation per unit area. Its Cartesian components are $(\partial F_z/\partial y - \partial F_y/\partial z,\; \partial F_x/\partial z - \partial F_z/\partial x,\; \partial F_y/\partial x - \partial F_x/\partial y)$.
- If the second partial derivatives are continuous, then $\curl(\nabla f) = \mathbf{0}$ and $\divg(\curl\mathbf{F}) = 0$. The Laplacian is $\nabla^2 f = \divg(\nabla f)$.
- In spherical coordinates a radial function has $\nabla^2 f = (1/r^2)\,\mathrm{d}(r^2 f')/\mathrm{d}r$. Thus $1/r$ is harmonic for $r \neq 0$, and the inverse-square field $\mathbf{e}_r/r^2$ has zero divergence and zero curl away from the origin.
- Scale-factor formulae are required in cylindrical and spherical coordinates. Substituting $(r, \theta, \varphi)$ into the Cartesian formulae gives the wrong operator.
:::

## Exercises {#exercises}

::: exercise Magnitude of a gradient {#exr-grad-mag level=1 check="sqrt(17)"}
The scalar field $f(x, y, z) = x^2 y$ does not depend on $z$. Find the magnitude of $\nabla f$ at the point $(1, 2, 0)$.
::: solution
The partial derivatives are $\partial f/\partial x = 2xy$, $\partial f/\partial y = x^2$ and $\partial f/\partial z = 0$. At $(1, 2, 0)$,

$$
\nabla f = (2\cdot 1\cdot 2,\, 1^2,\, 0) = (4, 1, 0).
$$

The magnitude is $\sqrt{16 + 1 + 0} = \sqrt{17}$. The zero $z$-component does not add a term under the square root, and it does not mean that the point is special: $f$ does not change when $z$ changes, so the level surfaces are vertical cylinders.
:::
:::

::: exercise Divergence at a point {#exr-div-point level=1 check="6"}
Let $\mathbf{F} = (xy,\, yz,\, zx)$. Evaluate $\divg\mathbf{F}$ at $(1, 2, 3)$.
::: solution
Differentiate the matching pairs:

$$
\divg\mathbf{F} = \pdv{(xy)}{x} + \pdv{(yz)}{y} + \pdv{(zx)}{z} = y + z + x.
$$

At $(1, 2, 3)$ the value is $1 + 2 + 3 = 6$. The divergence is not a constant field here. It equals the sum of the coordinates, so the origin is a source-free point of this particular field and the point $(1, 2, 3)$ is not.
:::
:::

::: exercise Sum of the curl components {#exr-curl-sum level=1 check="3"}
Let $\mathbf{F} = (z,\, x,\, y)$. Find the sum of the three Cartesian components of $\curl\mathbf{F}$.
::: solution
Apply [[#eq-curl]]:

$$
\begin{aligned}
(\curl\mathbf{F})_x &= \pdv{y}{y} - \pdv{x}{z} = 1 - 0 = 1,\\
(\curl\mathbf{F})_y &= \pdv{z}{z} - \pdv{y}{x} = 1 - 0 = 1,\\
(\curl\mathbf{F})_z &= \pdv{x}{x} - \pdv{z}{y} = 1 - 0 = 1.
\end{aligned}
$$

The curl is the constant vector $(1, 1, 1)$, and the sum of its components is $3$. Each component of $\mathbf{F}$ is the next coordinate in the cycle $(x, y, z)$, and each differentiation in the curl picks up exactly one of those factors.
:::
:::

::: exercise A directional derivative on a sphere {#exr-directional level=2 check="8/3"}
Let $f(x, y, z) = x^2 + y^2 + z^2$. Compute the directional derivative of $f$ at $(1, 2, 2)$ in the direction of the vector $(2, -1, 2)$.
::: solution
The gradient is $\nabla f = (2x, 2y, 2z)$, so at the given point $\nabla f = (2, 4, 4)$. The direction vector has length $\sqrt{4 + 1 + 4} = 3$, and the unit vector is $(2/3,\, -1/3,\, 2/3)$. The directional derivative is

$$
2\cdot\frac{2}{3} + 4\cdot\left(-\frac{1}{3}\right) + 4\cdot\frac{2}{3} = \frac{4}{3} - \frac{4}{3} + \frac{8}{3} = \frac{8}{3}.
$$

Using $(2, -1, 2)$ itself in the dot product, without dividing by $3$, would have given $8$ and would have been the derivative with respect to a parameter that runs three times too fast. The level surface through the point is the sphere of radius $3$, since $1 + 4 + 4 = 9$, and $\nabla f = 2\mathbf{r}$ does indeed point radially outward.
:::
:::

::: exercise Divergence of a cylindrical unit vector {#exr-erho level=2 check="1/2"}
In cylindrical coordinates the unit vector field $\mathbf{e}_\rho$ has components $F_\rho = 1$, $F_\varphi = 0$, $F_z = 0$. Find its divergence at the point whose cylindrical radius is $\rho = 2$.
::: solution
The cylindrical divergence [[#eq-div-cyl]] gives

$$
\divg\mathbf{e}_\rho = \frac{1}{\rho}\pdv{}{\rho}(\rho \cdot 1) + 0 + 0 = \frac{1}{\rho}.
$$

At $\rho = 2$ the value is $1/2$. The field is not divergence-free. A small coordinate box at radius $\rho$ has an outer face slightly larger than its inner face, and a unit radial field therefore has a larger outward flux through the outer face than the inward flux through the inner face. The Cartesian form $\mathbf{e}_\rho = (x/\rho,\, y/\rho,\, 0)$ leads to the same divergence $1/\rho$ for $\rho \neq 0$, which is a check on the scale factor in [[#eq-div-cyl]].
:::
:::

::: exercise Laplacian of the cylindrical radius squared {#exr-lap-rho level=2 check="4"}
Let $f = \rho^2$ in cylindrical coordinates, with no dependence on $\varphi$ or $z$. Compute $\nabla^2 f$.
::: solution
Use [[#eq-lap-cyl]]. The angular and vertical derivatives are zero, and $\partial f/\partial\rho = 2\rho$, so

$$
\nabla^2 f = \frac{1}{\rho}\pdv{}{\rho}(\rho \cdot 2\rho) = \frac{1}{\rho}\pdv{}{\rho}(2\rho^2) = \frac{1}{\rho}\cdot 4\rho = 4.
$$

In Cartesian coordinates $\rho^2 = x^2 + y^2$, whose second derivatives are $2$ and $2$ and whose $z$-derivative is zero, and the Laplacian is again $4$. The value is constant, unlike $\nabla^2(\ln\rho)$, which vanishes for $\rho > 0$ and is the two-dimensional analogue of the harmonic function $1/r$.
:::
:::

::: exercise The curl of a scalar times a vector {#exr-curl-product level=3}
::: hint
Expand one Cartesian component of $\curl(\phi\mathbf{F})$ with the product rule, and compare it with the corresponding component of $\nabla\phi \times \mathbf{F} + \phi\,\curl\mathbf{F}$. The other two components are the same calculation with the indices cycled.
:::
Prove that if $\phi$ and the components of $\mathbf{F}$ have continuous first partial derivatives, then

$$
\curl(\phi\mathbf{F}) = \nabla\phi \times \mathbf{F} + \phi\,\curl\mathbf{F}.
$$
::: solution
The $x$-component of $\curl(\phi\mathbf{F})$ is

$$
\pdv{(\phi F_z)}{y} - \pdv{(\phi F_y)}{z}
= \pdv{\phi}{y} F_z + \phi\pdv{F_z}{y} - \pdv{\phi}{z} F_y - \phi\pdv{F_y}{z}.
$$

The terms that still contain a derivative of $\phi$ are $(\nabla\phi \times \mathbf{F})_x = \partial\phi/\partial y\, F_z - \partial\phi/\partial z\, F_y$. The terms that contain $\phi$ are $\phi$ times $(\curl\mathbf{F})_x$. That is the $x$-component of the required identity. The $y$-component starts from $\partial(\phi F_x)/\partial z - \partial(\phi F_z)/\partial x$ and matches $(\nabla\phi \times \mathbf{F})_y + \phi(\curl\mathbf{F})_y$, and the $z$-component matches in the same way. Continuity of the first partials is enough: unlike [[#thm-curl-grad]], this identity does not exchange the order of two differentiations.
:::
:::

::: exercise The Laplacian of a logarithm in three dimensions {#exr-log level=3}
::: hint
Use [[#eq-lap-radial]], not the two-dimensional formula. The derivative of $r^2 \cdot (1/r)$ is not zero.
:::
For $r > 0$ compute $\nabla^2(\ln r)$ in spherical coordinates, where $r$ is the distance from the origin. Then compute $\nabla^2(r^n)$ from the same formula and record the power of $r$ that remains.
::: solution
For $f = \ln r$ the derivative is $f' = 1/r$, so $r^2 f' = r$. Then

$$
\nabla^2(\ln r) = \frac{1}{r^2}\deriv{}{r}(r) = \frac{1}{r^2}, \qquad r > 0.
$$

The logarithm of the spherical radius is not harmonic. The contrast with cylindrical radius is worth keeping: [[#eq-lap-cyl]] applied to $\ln\rho$ gives $(1/\rho)\,\partial(1)/\partial\rho = 0$ for $\rho > 0$, so the logarithm is harmonic in two dimensions and not in three.

For $f = r^n$, the computation in the proof of [[#prop-radial]] gives $r^2 f' = n r^{n+1}$ and

$$
\nabla^2(r^n) = \frac{1}{r^2}\cdot n(n+1) r^n = n(n+1)\, r^{n-2}, \qquad r > 0.
$$

The power drops by two, as it does for an ordinary second derivative of a monomial. The coefficient $n(n+1)$ vanishes at $n = 0$ and at $n = -1$: constants are harmonic, and so is $1/r$, away from the origin. At $n = 2$ the formula returns the constant $6$, which is the Cartesian Laplacian of $x^2 + y^2 + z^2$.
:::
:::
