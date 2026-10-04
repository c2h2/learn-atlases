Leave a metal plate long enough with its edges held at fixed temperatures and it reaches a **steady state**: the temperature no longer changes in time. In the two-dimensional heat equation $u_t = k(u_{xx} + u_{yy})$ we then have $u_t = 0$, and the temperature satisfies **Laplace's equation**

$$
\Delta u = u_{xx} + u_{yy} = 0.
$$

The same equation describes the electrostatic potential in a region free of charge, the gravitational potential in empty space, the velocity potential of an ideal fluid, and the shape of a soap film with small slopes. Its solutions, the **harmonic functions**, are among the most beautiful objects in analysis: they are infinitely differentiable, they equal their own averages over every circle, and they are the real parts of complex analytic functions.

Laplace's equation has no time variable, so there are no initial conditions; a solution is determined entirely by its values (or its normal derivative) on the boundary of a region. In this chapter we solve such **boundary value problems** on rectangles and discs by separation of variables, derive Poisson's integral formula for the disc, and prove the **mean value property** and the **maximum principle**, which give uniqueness and stability and explain why harmonic functions can have no peaks or pits.

## Harmonic functions

::: definition Harmonic function {#def-harmonic}
Let $\Omega \subseteq \R^2$ be open. A function $u\colon\Omega\to\R$ is **harmonic** if it has continuous second partial derivatives and satisfies **Laplace's equation**

$$
\Delta u = \frac{\partial^2u}{\partial x^2} + \frac{\partial^2u}{\partial y^2} = 0 \quad\text{in } \Omega.
$$

The operator $\Delta$ is the **Laplacian**. The inhomogeneous equation $\Delta u = f$ is **Poisson's equation**. In $\R^3$, $\Delta u = u_{xx} + u_{yy} + u_{zz}$.
:::

Some examples, which you can check by differentiating twice:

- every linear function $a + bx + cy$;
- $x^2 - y^2$ and $xy$, but **not** $x^2 + y^2$, whose Laplacian is $4$;
- $e^x\cos y$ and $e^x\sin y$;
- $x^3 - 3xy^2$, and in polar coordinates $r^n\cos n\theta$ and $r^n\sin n\theta$ for every $n \ge 0$;
- $\ln(x^2 + y^2) = 2\ln r$, harmonic on $\R^2\setminus\{0\}$ but not across the origin.

These are no accident. If $f = u + iv$ is a complex analytic function, the Cauchy–Riemann equations $u_x = v_y$, $u_y = -v_x$ give $u_{xx} = v_{yx} = v_{xy} = -u_{yy}$, so $\Delta u = 0$, and likewise $\Delta v = 0$ ([[complex-analysis/analytic-functions]]). The examples above are the real and imaginary parts of $z^2$, $e^z$, $z^3$, $z^n$ and $2\log z$. Conversely, on a simply connected region every harmonic function is the real part of an analytic function, so the two theories are intimately linked.

Three physical problems lead to Laplace's equation.

- **Steady heat flow.** A steady temperature in a plate without sources satisfies $\Delta u = 0$ (set $u_t = 0$ in the heat equation of [[pde/heat-equation]]).
- **Electrostatics.** The electric field is $\mathbf E = -\nabla V$, and Gauss's law says $\divg\mathbf E = \rho/\eps_0$. So the potential satisfies Poisson's equation $\Delta V = -\rho/\eps_0$, and Laplace's equation where there is no charge.
- **Ideal fluid flow.** An incompressible ($\divg\mathbf v = 0$), irrotational ($\curl\mathbf v = 0$) flow has a velocity potential $\mathbf v = \nabla\phi$, and then $\Delta\phi = \divg\nabla\phi = 0$.

::: intuition Harmonic means "equal to the average of its neighbours"
As in the heat equation, $u_{xx}(x,y) \approx \frac{u(x+h,y) + u(x-h,y) - 2u(x,y)}{h^2}$, and similarly in $y$. Adding,

$$
\Delta u(x,y) \approx \frac{4}{h^2}\left[\frac{u(x+h,y) + u(x-h,y) + u(x,y+h) + u(x,y-h)}{4} - u(x,y)\right].
$$

So $\Delta u = 0$ says that the value at each point is (to second order) the average of the values at its four neighbours. A steady temperature cannot have a hot spot, since a hot spot would be above the average of its surroundings and would be cooling. We will make this exact with the mean value property.
:::

### Boundary value problems

Let $\Omega$ be a bounded region with boundary $\partial\Omega$ and outward unit normal $\mathbf n$. The two basic problems are:

- the **Dirichlet problem**: $\Delta u = 0$ in $\Omega$, $u = g$ on $\partial\Omega$ (prescribed boundary temperature or potential);
- the **Neumann problem**: $\Delta u = 0$ in $\Omega$, $\dfrac{\partial u}{\partial n} = \nabla u\cdot\mathbf n = h$ on $\partial\Omega$ (prescribed heat flux through the boundary).

The Neumann problem cannot be solved for arbitrary $h$.

::: proposition Compatibility condition for the Neumann problem {#prop-compatibility}
Let $\Omega$ be a bounded region with piecewise smooth boundary, and let $u$ have continuous second derivatives on $\overline\Omega$ with $\Delta u = f$ in $\Omega$ and $\partial u/\partial n = h$ on $\partial\Omega$. Then

$$
\iint_\Omega f\,dA = \oint_{\partial\Omega}h\,ds.
$$

In particular, the Neumann problem for Laplace's equation can have a solution only if $\oint_{\partial\Omega}h\,ds = 0$, and a solution, if one exists, can be changed by adding any constant.
:::

::: proof
Apply the divergence theorem ([[multivariable/stokes-divergence]]) to the vector field $\nabla u$: $\iint_\Omega\divg(\nabla u)\,dA = \oint_{\partial\Omega}\nabla u\cdot\mathbf n\,ds$. The left side is $\iint_\Omega\Delta u\,dA = \iint_\Omega f\,dA$ and the right side is $\oint_{\partial\Omega}h\,ds$. Adding a constant to $u$ changes neither $\Delta u$ nor $\partial u/\partial n$.
:::

Physically: a steady temperature is possible only if the net heat flowing in through the boundary is zero.

::: quiz
Which of the following functions are harmonic on the indicated domain? Select all that apply.
- [x] $e^{2x}\cos 2y$ on $\R^2$
- [ ] $x^2 + y^2$ on $\R^2$
- [x] $\ln\sqrt{x^2+y^2}$ on $\R^2\setminus\{0\}$
- [x] $x^4 - 6x^2y^2 + y^4$ on $\R^2$
::: solution
$e^{2x}\cos2y = \operatorname{Re}e^{2z}$ and $x^4 - 6x^2y^2 + y^4 = \operatorname{Re}z^4$ are real parts of analytic functions, hence harmonic (or check: for the first, $u_{xx} = 4u$ and $u_{yy} = -4u$). $\ln r$ is harmonic away from the origin: in polar form it depends on $r$ only, and $u_{rr} + \frac1ru_r = -\frac{1}{r^2} + \frac{1}{r^2} = 0$. But $\Delta(x^2 + y^2) = 4 \neq 0$.
:::
:::

## The Dirichlet problem on a rectangle

Let $\Omega = (0, a)\times(0, b)$. Consider first the case where the boundary data vanish on three sides:

$$
\Delta u = 0 \ \text{in } \Omega, \qquad u(0, y) = u(a, y) = 0, \qquad u(x, 0) = 0, \qquad u(x, b) = f(x).
$$ {#eq-rect-problem}

Try $u = X(x)Y(y)$. Then $X''Y + XY'' = 0$, so $\frac{X''}{X} = -\frac{Y''}{Y} = -\lambda$. The homogeneous conditions on the vertical sides give the familiar eigenvalue problem $X'' + \lambda X = 0$, $X(0) = X(a) = 0$, with $\lambda_n = (n\pi/a)^2$ and $X_n = \sin\frac{n\pi x}{a}$ ([[pde/heat-equation#prop-dirichlet-eigen]]). The $y$-equation is now $Y'' = \lambda_nY$, with exponential rather than oscillating solutions, and $Y(0) = 0$ selects $Y_n = \sinh\frac{n\pi y}{a}$. Superposing,

$$
u(x,y) = \sum_{n=1}^\infty c_n\sinh\frac{n\pi y}{a}\sin\frac{n\pi x}{a}.
$$

At $y = b$ we need $\sum c_n\sinh\frac{n\pi b}{a}\sin\frac{n\pi x}{a} = f(x)$, so $c_n\sinh\frac{n\pi b}{a} = b_n$, the $n$th sine coefficient of $f$ on $[0, a]$. Hence

$$
u(x,y) = \sum_{n=1}^{\infty}b_n\,\frac{\sinh(n\pi y/a)}{\sinh(n\pi b/a)}\,\sin\frac{n\pi x}{a}, \qquad b_n = \frac{2}{a}\int_0^af(x)\sin\frac{n\pi x}{a}\,dx.
$$ {#eq-rect-solution}

For $y < b$ the ratio $\frac{\sinh(n\pi y/a)}{\sinh(n\pi b/a)}$ is about $e^{-n\pi(b - y)/a}$, so high-frequency wiggles in the boundary data die out exponentially as we move into the rectangle: just as for the heat equation, the solution is smooth inside even if $f$ is rough. If the data are non-zero on all four sides, we solve four problems of this type, each with data on one side only, and add the solutions — superposition again.

::: example A heated edge {#ex-square}
A square plate $0 \le x, y \le \pi$ has three edges at temperature $0$ and the top edge $y = \pi$ at temperature $1$. Find the steady temperature, and its value at the centre.
::: solution
The sine coefficients of $f = 1$ on $[0,\pi]$ are $b_n = \frac{4}{n\pi}$ for odd $n$ and $0$ for even $n$. By [[#eq-rect-solution]] with $a = b = \pi$,

$$
u(x,y) = \frac{4}{\pi}\sum_{n\ \text{odd}}\frac{\sinh ny}{n\sinh n\pi}\sin nx.
$$

The value at the centre can be found without summing the series. Let $u_1 = u$, and let $u_2, u_3, u_4$ be the solutions with temperature $1$ on the right, bottom and left edges respectively (and $0$ on the other three). By the symmetry of the square, each is a rotation of $u_1$, so all four take the same value at the centre. Their sum is harmonic with boundary value $1$ on every edge, so by uniqueness ([[#cor-unique]] below) the sum is the constant $1$. Hence

$$
u\bigl(\tfrac\pi2, \tfrac\pi2\bigr) = \frac14.
$$

(Numerically, $\frac4\pi\sum_{n\text{ odd}}\frac{\sinh(n\pi/2)\sin(n\pi/2)}{n\sinh n\pi} = 0.2500\ldots$; the first term alone gives $0.2537$, and the first two $0.2499$.) The edge values jump at the two top corners, so the series converges slowly near $y = \pi$, with a Gibbs overshoot along the top edge; inside the square it converges very fast.
:::
:::

::: widget surface
f: sum(4/(pi*(2*j + 1))*sinh((2*j + 1)*y)/sinh((2*j + 1)*pi)*sin((2*j + 1)*x), j, 0, 30)
x: 0, pi
y: 0, pi
contours: true
caption: The steady temperature of [[#ex-square]]: the edge $y = \pi$ is held at $1$, the other three at $0$. Rotate the surface. Along the hot edge the partial sum oscillates (Gibbs), but a short distance inside the plate the surface is perfectly smooth, and it falls off roughly like $\sinh y/\sinh\pi$. Notice that there is no bump or dip anywhere inside — the largest and smallest values sit on the boundary.
:::

## Laplace's equation in a disc

For a disc it is natural to use polar coordinates $x = r\cos\theta$, $y = r\sin\theta$. By the chain rule (see [[multivariable/partial-derivatives]]), the Laplacian becomes

$$
\Delta u = u_{rr} + \frac1r u_r + \frac{1}{r^2}u_{\theta\theta}.
$$ {#eq-polar-laplacian}

Consider the Dirichlet problem in the disc $r < a$ with $u(a,\theta) = g(\theta)$, where $g$ is $2\pi$-periodic. Separating $u = R(r)\Theta(\theta)$ in [[#eq-polar-laplacian]] and multiplying by $r^2/(R\Theta)$,

$$
\frac{r^2R'' + rR'}{R} = -\frac{\Theta''}{\Theta} = \lambda.
$$

The angular equation $\Theta'' + \lambda\Theta = 0$ comes with an implicit boundary condition: $\Theta$ must be $2\pi$-periodic, because $(r, \theta)$ and $(r, \theta + 2\pi)$ are the same point. Negative $\lambda$ gives exponentials, which are not periodic; $\lambda = 0$ gives $A + B\theta$, periodic only if $B = 0$; and $\lambda = \mu^2 > 0$ gives $A\cos\mu\theta + B\sin\mu\theta$, periodic exactly when $\mu = n$ is an integer. So $\lambda = n^2$, $n = 0, 1, 2, \dots$

The radial equation $r^2R'' + rR' - n^2R = 0$ is a Cauchy–Euler equation: trying $R = r^m$ gives $m^2 = n^2$, so $R = r^n$ or $r^{-n}$ for $n \ge 1$, and $R = 1$ or $\ln r$ for $n = 0$. The solutions $r^{-n}$ and $\ln r$ are unbounded at the centre of the disc, so we discard them. Superposing what remains and matching the boundary data,

$$
u(r,\theta) = \frac{a_0}{2} + \sum_{n=1}^{\infty}\left(\frac ra\right)^n\bigl(a_n\cos n\theta + b_n\sin n\theta\bigr),
$$ {#eq-disc-series}

where $a_n$, $b_n$ are the Fourier coefficients of $g$. Each term is harmonic, since $r^n\cos n\theta$ and $r^n\sin n\theta$ are the real and imaginary parts of $z^n$. The boundary data are smoothed by the factors $(r/a)^n$, which damp high frequencies more and more strongly towards the centre. At the centre only the constant survives: $u(0) = \frac{a_0}{2} = \frac{1}{2\pi}\int_{-\pi}^{\pi}g(\theta)\,d\theta$, the **average of the boundary values** — a first glimpse of the mean value property.

::: warning Keep the singular solutions when the origin is excluded
We discarded $r^{-n}$ and $\ln r$ only because the origin lies in the disc and the solution must be bounded there. In an **annulus** $a < r < b$, or outside a disc, these solutions are perfectly good and must be kept: for instance, the steady temperature between two concentric circles held at different constant temperatures is $A + B\ln r$, not a constant. Always ask which solutions the geometry allows before throwing any away.
:::

::: example Boundary data that are trigonometric polynomials {#ex-cos3}
Solve the Dirichlet problem in the unit disc with $u(1,\theta) = \cos^3\theta$, express the answer in Cartesian coordinates, and find the maximum of $u$ on the closed disc.
::: solution
No integrals are needed: from $\cos3\theta = 4\cos^3\theta - 3\cos\theta$ we get $\cos^3\theta = \frac34\cos\theta + \frac14\cos3\theta$, which is already a Fourier series. By [[#eq-disc-series]] with $a = 1$, each $\cos n\theta$ is multiplied by $r^n$:

$$
u(r,\theta) = \frac34r\cos\theta + \frac14r^3\cos3\theta = \frac34x + \frac14\bigl(x^3 - 3xy^2\bigr),
$$

using $r^3\cos3\theta = \operatorname{Re}z^3 = x^3 - 3xy^2$. It is a harmonic polynomial, as it must be (each term is the real part of a power of $z$). By the maximum principle ([[#cor-unique]] below) its maximum over the closed disc is the maximum of the boundary values $\cos^3\theta$, namely $1$, attained only at $(1, 0)$; inside the disc, $u < 1$.
:::
:::

::: example Two halves of a circle {#ex-semicircle}
The boundary of the unit disc is held at temperature $1$ on the upper semicircle $0 < \theta < \pi$ and at $0$ on the lower semicircle. Find the steady temperature.
::: solution
The Fourier coefficients of $g$ are $a_0 = 1$, $a_n = 0$, and $b_n = \frac1\pi\int_0^\pi\sin n\theta\,d\theta = \frac{1 - (-1)^n}{n\pi}$, i.e. $\frac{2}{n\pi}$ for odd $n$. So

$$
u(r,\theta) = \frac12 + \frac{2}{\pi}\sum_{n\ \text{odd}}\frac{r^n\sin n\theta}{n}.
$$

This series can be summed. With $z = re^{i\theta}$, $\sum_{n\ \text{odd}}\frac{z^n}{n} = \frac12\log\frac{1 + z}{1 - z}$ for $\abs z < 1$, and the imaginary part of $\log w$ is $\arg w$. Since $\frac{1+z}{1-z} = \frac{(1 + z)(1 - \bar z)}{\abs{1-z}^2} = \frac{1 - r^2 + 2ir\sin\theta}{\abs{1 - z}^2}$ has positive real part,

$$
u(r,\theta) = \frac12 + \frac1\pi\arctan\frac{2r\sin\theta}{1 - r^2} = \frac12 + \frac1\pi\arctan\frac{2y}{1 - x^2 - y^2}.
$$

On the horizontal diameter ($y = 0$) the temperature is $\frac12$, as symmetry demands, and the isotherms $u = c$ are the curves $\frac{2y}{1 - x^2 - y^2} = \tan\bigl(\pi(c - \tfrac12)\bigr)$, which are arcs of circles through the two points $(\pm1, 0)$ where the boundary data jump.
:::
:::

::: widget surface
fx: u*cos(v)
fy: u*sin(v)
fz: 0.5 + atan(2*u*sin(v)/(1 - u^2))/pi
u: 0, 0.995
v: 0, 2pi
color: height
caption: The steady temperature of [[#ex-semicircle]] on the unit disc, plotted over the disc in polar coordinates. Rotate it: the surface is a smooth "twisted sheet" climbing from $0$ on the lower half of the rim to $1$ on the upper half, with value $\tfrac12$ all along the horizontal diameter. Near the two points $(\pm1, 0)$, where the boundary data jump, all levels between $0$ and $1$ crowd together.
:::

### Poisson's integral formula

Substituting the formulas for $a_n$ and $b_n$ into [[#eq-disc-series]] and summing the resulting geometric series produces a closed formula for the solution.

::: theorem Poisson's integral formula {#thm-poisson}
Let $g$ be continuous and $2\pi$-periodic. For $0 \le r < a$ define

$$
u(r,\theta) = \frac{1}{2\pi}\int_{-\pi}^{\pi}P(r, \theta - \phi)\,g(\phi)\,d\phi, \qquad P(r,\alpha) = \frac{a^2 - r^2}{a^2 - 2ar\cos\alpha + r^2},
$$ {#eq-poisson}

and set $u(a,\theta) = g(\theta)$. Then $u$ equals the series [[#eq-disc-series]] for $r < a$, it is harmonic in the open disc, and it is continuous on the closed disc. So it solves the Dirichlet problem. The function $P$ is the **Poisson kernel**.
:::

::: proof
*Harmonic.* The Fourier coefficients of the continuous function $g$ are bounded, say by $B$. On a smaller disc $r \le r_0 < a$, the $n$th term of [[#eq-disc-series]] and each of its partial derivatives up to second order are bounded by a constant times $n^2(r_0/a)^n$, which is summable. By the M-test the series and its derivatives converge uniformly there, so $u$ is $C^2$ in the open disc and $\Delta u$ is the sum of the Laplacians of the terms, which are zero.

*The kernel.* Write $\rho = r/a < 1$. Substituting the coefficient formulas and interchanging sum and integral (allowed because the series converges uniformly in $\phi$),

$$
u(r,\theta) = \frac{1}{2\pi}\int_{-\pi}^{\pi}g(\phi)\left[1 + 2\sum_{n=1}^{\infty}\rho^n\cos n(\theta - \phi)\right]d\phi.
$$

With $w = \rho e^{i\alpha}$, the bracket is $\operatorname{Re}\bigl(1 + 2\sum_{n\ge1}w^n\bigr) = \operatorname{Re}\frac{1 + w}{1 - w} = \operatorname{Re}\frac{(1 + w)(1 - \bar w)}{\abs{1 - w}^2} = \frac{1 - \rho^2}{1 - 2\rho\cos\alpha + \rho^2}$, which is $P(r, \alpha)$ after multiplying top and bottom by $a^2$.

*Boundary values.* The kernel has three properties: (i) $P > 0$, since $a^2 - 2ar\cos\alpha + r^2 = \abs{a - re^{i\alpha}}^2 > 0$; (ii) $\frac1{2\pi}\int_{-\pi}^{\pi}P(r,\alpha)\,d\alpha = 1$, by integrating the series term by term; (iii) for $0 < \delta \le \abs\alpha \le \pi$, $a^2 - 2ar\cos\alpha + r^2 = (a - r)^2 + 2ar(1 - \cos\alpha) \ge 2ar(1 - \cos\delta)$, so $P(r,\alpha) \le \frac{a^2 - r^2}{2ar(1 - \cos\delta)} \to 0$ as $r \to a$. Now fix $\theta_0$ and $\eps > 0$, and let $\abs g \le K$. By uniform continuity choose $\delta > 0$ with $\abs{g(\phi) - g(\theta_0)} < \eps$ whenever $\abs{\phi - \theta_0} < 2\delta$. For $r < a$ and $\abs{\theta - \theta_0} < \delta$, by (ii),

$$
u(r,\theta) - g(\theta_0) = \frac{1}{2\pi}\int_{-\pi}^{\pi}P(r,\theta - \phi)\bigl(g(\phi) - g(\theta_0)\bigr)\,d\phi.
$$

Split the integral (over a period centred at $\theta$) into $\abs{\phi - \theta} < \delta$, where $\abs{\phi - \theta_0} < 2\delta$ and so, by (i) and (ii), the contribution is less than $\eps$; and $\abs{\phi - \theta}\ge\delta$, where by (iii) the contribution is at most $2K\max_{\delta\le\abs\alpha\le\pi}P(r,\alpha) \to 0$. Hence $\abs{u(r,\theta) - g(\theta_0)} < 2\eps$ for all $(r,\theta)$ close enough to $(a, \theta_0)$ with $r < a$; together with the continuity of $g$ on the boundary itself, this proves that $u$ is continuous on the closed disc.
:::

The Poisson kernel is a weighted average: $u$ at an interior point is an average of the boundary values, weighted heavily towards the part of the boundary nearest the point. At the centre $P \equiv 1$, which gives the plain average again.

## The mean value property and the maximum principle

The fact that $u(0)$ is the average of the boundary values is not special to discs centred at the origin: it holds on every circle inside the domain.

::: theorem Mean value property {#thm-mean-value}
Let $u$ be harmonic in an open set $\Omega\subseteq\R^2$, and let the closed disc $\overline D$ of radius $R$ centred at $p = (p_1, p_2)$ lie in $\Omega$. Then

$$
u(p) = \frac{1}{2\pi}\int_0^{2\pi}u(p_1 + R\cos\theta,\ p_2 + R\sin\theta)\,d\theta = \frac{1}{\pi R^2}\iint_{D}u\,dA.
$$

The value at the centre equals the average over the circle and the average over the disc.
:::

::: proof
For $0 < r \le R$ let $m(r) = \frac{1}{2\pi}\int_0^{2\pi}u(p + r\mathbf e_\theta)\,d\theta$, where $\mathbf e_\theta = (\cos\theta, \sin\theta)$. Differentiating under the integral sign (allowed because $u$ is $C^1$ on a neighbourhood of $\overline D$),

$$
m'(r) = \frac1{2\pi}\int_0^{2\pi}\nabla u(p + r\mathbf e_\theta)\cdot\mathbf e_\theta\,d\theta = \frac{1}{2\pi r}\oint_{\abs{x - p} = r}\frac{\partial u}{\partial n}\,ds = \frac{1}{2\pi r}\iint_{\abs{x-p}<r}\Delta u\,dA = 0,
$$

where we used $ds = r\,d\theta$, that $\mathbf e_\theta$ is the outward normal of the circle, and the divergence theorem. So $m$ is constant on $(0, R]$. As $r\to0^+$, $m(r) \to u(p)$ because $u$ is continuous: $\abs{m(r) - u(p)} \le \max_{\abs{x - p} = r}\abs{u(x) - u(p)} \to 0$. Hence $m(R) = u(p)$. For the disc average, use polar coordinates centred at $p$: $\iint_Du\,dA = \int_0^R2\pi r\,m(r)\,dr = \pi R^2u(p)$.
:::

The mean value property characterises harmonic functions: a continuous function that satisfies it on every small circle is automatically harmonic (and infinitely differentiable). We will not need this converse, but it explains why harmonic functions are so rigid. The most important consequence is the maximum principle.

::: theorem Strong maximum principle {#thm-strong-max}
Let $\Omega\subseteq\R^2$ be open and connected, and let $u$ be harmonic in $\Omega$. If $u$ attains its maximum (or its minimum) over $\Omega$ at a point of $\Omega$, then $u$ is constant in $\Omega$.
:::

::: proof
Let $M = \max_\Omega u$ be attained, and let $S = \set{x\in\Omega : u(x) = M}$, which is non-empty. $S$ is closed in $\Omega$ because $u$ is continuous. $S$ is also open: if $p \in S$, choose a disc $D$ around $p$ with $\overline D\subset\Omega$. By [[#thm-mean-value]], $M = u(p) = \frac{1}{\abs D}\iint_Du\,dA$, so $\iint_D(M - u)\,dA = 0$ with a continuous, non-negative integrand. Hence $u = M$ on all of $D$ (if $M - u$ were positive at some point, it would be positive on a small disc around that point and the integral would be positive). So $D\subseteq S$. A non-empty subset of a connected set that is both open and closed is the whole set, so $S = \Omega$. For the minimum, apply this to $-u$.
:::

::: corollary Weak maximum principle and uniqueness {#cor-unique}
Let $\Omega$ be bounded, and let $u$ be continuous on $\overline\Omega$ and harmonic in $\Omega$. Then

$$
\max_{\overline\Omega}u = \max_{\partial\Omega}u, \qquad \min_{\overline\Omega}u = \min_{\partial\Omega}u.
$$

Consequently the Dirichlet problem has at most one solution continuous on $\overline\Omega$, and two solutions $u_1, u_2$ with boundary data $g_1, g_2$ satisfy $\max_{\overline\Omega}\abs{u_1 - u_2} = \max_{\partial\Omega}\abs{g_1 - g_2}$.
:::

::: proof
$\overline\Omega$ is compact, so $u$ attains its maximum $M$ at some point $p$. If $p\in\partial\Omega$ we are done. If $p\in\Omega$, let $U$ be the connected component of $\Omega$ containing $p$; by [[#thm-strong-max]], $u = M$ on $U$, hence by continuity on $\overline U$. The bounded open set $U$ has a non-empty boundary, which lies in $\partial\Omega$, so $M$ is attained on $\partial\Omega$. The minimum is similar. For uniqueness and stability, apply this to $\pm(u_1 - u_2)$, which is harmonic with boundary values $\pm(g_1 - g_2)$.
:::

So a steady temperature in a plate is never hotter, nor colder, than the hottest and coldest points of its edge, and small changes in the edge temperature cause uniformly small changes everywhere inside. This is the elliptic counterpart of the maximum principle for the heat equation in [[pde/heat-equation#thm-max]].

::: widget contour
f: x^3 - 3*x*y^2
x: -2, 2
y: -2, 2
levels: 16
gradient: true
point: 1, 0.5
caption: Level curves of the harmonic function $x^3 - 3xy^2 = \operatorname{Re}z^3$, with its gradient at the draggable point. Move the point around: the gradient never vanishes except at the origin, where three "valleys" and three "ridges" meet (a monkey saddle). There is no local maximum or minimum anywhere, exactly as the maximum principle predicts: on any disc you draw, the largest and smallest values of the function lie on the boundary circle, never inside.
:::

::: quiz
A function $u$ is harmonic on a neighbourhood of the closed unit disc, and on the unit circle $u(\cos\theta, \sin\theta) = 3 + \sin\theta + \cos2\theta$. What is $u(0,0)$, and what is the largest value of $u$ on the closed disc?
- [x] $u(0,0) = 3$ and $\max u = 33/8$
- [ ] $u(0,0) = 4$ and $\max u = 5$
- [ ] $u(0,0) = 3$ and $\max u = 5$
- [ ] $u(0,0)$ cannot be determined from the boundary values alone
::: solution
By the mean value property, $u(0,0)$ is the average of the boundary values, and $\sin\theta$ and $\cos2\theta$ average to zero, so $u(0,0) = 3$. By the maximum principle the maximum of $u$ is the maximum of $g(\theta) = 3 + \sin\theta + \cos2\theta = 4 + \sin\theta - 2\sin^2\theta$ over the circle. As a function of $s = \sin\theta\in[-1,1]$, $4 + s - 2s^2$ is largest at $s = \frac14$, where it equals $4 + \frac14 - \frac18 = \frac{33}{8}$. (The value $5$ is never attained: $\sin\theta = 1$ forces $\cos2\theta = -1$.)
:::
:::

::: warning Uniqueness needs a bounded domain
On an unbounded domain the Dirichlet problem can have many solutions. In the upper half-plane $y > 0$, both $u = 0$ and $u = y$ are harmonic and vanish on the boundary $y = 0$. The proof of [[#cor-unique]] breaks down because $\overline\Omega$ is not compact and the maximum need not be attained. Uniqueness is restored by adding a condition at infinity, such as requiring $u$ to be bounded.
:::

### Radial solutions and an annulus

Harmonic functions depending only on $r$ satisfy $u_{rr} + \frac1ru_r = \frac1r(ru_r)_r = 0$, so $ru_r$ is constant and $u = A + B\ln r$. These solve Dirichlet problems in annuli with constant data on each circle.

::: example Temperature in a pipe wall {#ex-annulus}
The wall of a long pipe occupies $1 \le r \le e$ (in suitable units). Its inner surface is at $100^\circ$ and its outer surface at $0^\circ$. Find the steady temperature, and where in the wall it equals $50^\circ$.
::: solution
By symmetry we look for $u = A + B\ln r$. The conditions $u(1) = A = 100$ and $u(e) = A + B = 0$ give $B = -100$, so $u = 100(1 - \ln r)$. By uniqueness ([[#cor-unique]]) this is the solution. It equals $50$ when $\ln r = \frac12$, that is $r = \sqrt e \approx 1.65$ — not at the midpoint $r = \frac{1 + e}{2} \approx 1.86$ of the wall. The temperature falls fastest near the inner surface, where the heat flux $-u_r = 100/r$ is concentrated on a smaller circumference; the total flux through every circle, $2\pi r\cdot\frac{100}{r} = 200\pi$, is the same, as it must be in a steady state.
:::
:::

::: example Ideal flow past a cylinder {#ex-cylinder}
A uniform stream with velocity $U$ in the $x$-direction flows past a long cylinder of radius $a$. The velocity potential $\phi$ satisfies $\Delta\phi = 0$ outside the cylinder, $\partial\phi/\partial r = 0$ on $r = a$ (no flow through the wall), and $\phi \approx Ux$ far away. Show that $\phi = U\bigl(r + \frac{a^2}{r}\bigr)\cos\theta$ is such a potential, and find the fluid speed on the surface of the cylinder.
::: solution
The function $r\cos\theta = x$ is harmonic, and so is $r^{-1}\cos\theta = \operatorname{Re}\frac1z$ on $r > 0$ — one of the singular solutions which we were allowed to keep because the origin is not in the fluid. So $\phi$ is harmonic for $r > a$. Its radial derivative is $\phi_r = U\bigl(1 - \frac{a^2}{r^2}\bigr)\cos\theta$, which vanishes on $r = a$, and $\phi - Ux = \frac{Ua^2}{r}\cos\theta \to 0$ as $r\to\infty$. On the surface the velocity is purely tangential, with component

$$
\frac1r\phi_\theta\Big|_{r=a} = -U\left(1 + \frac{a^2}{a^2}\right)\sin\theta = -2U\sin\theta.
$$

The fluid is at rest at the front and back of the cylinder ($\theta = \pi$ and $\theta = 0$, the **stagnation points**) and moves at twice the free-stream speed at the top and bottom. (In this ideal model the pressure distribution is symmetric front to back, so the cylinder feels no drag — d'Alembert's paradox, resolved only by including viscosity.)
:::
:::

::: application Potential theory at work
In electrostatics, [[#cor-unique]] is the uniqueness theorem behind the "method of images" and behind Faraday cages: inside a closed conducting shell held at constant potential, the potential is constant, so there is no field, whatever charges sit outside. Numerically, the discrete mean value property — each grid value equals the average of its four neighbours — turns the Dirichlet problem into a large linear system, classically solved by the Jacobi and Gauss–Seidel iterations of [[numerical-analysis/iterative-methods]], whose iterations literally replace each value by the average of its neighbours. A probabilistic interpretation, due to Shizuo Kakutani (1944), says that $u(p)$ is the expected boundary value at the point where a Brownian motion started at $p$ first leaves $\Omega$; this underlies Monte Carlo methods for elliptic equations.
:::

::: history
Laplace's equation appeared in Euler's work on fluid flow in the 1750s and became central in the 1780s, when Pierre-Simon Laplace showed that the gravitational potential of a body satisfies it in the empty space outside the body. In 1813 Siméon Denis Poisson showed that inside matter the potential satisfies $\Delta V = -4\pi\rho$ (in his units). George Green, a self-taught miller's son from Nottingham, published in 1828 an *Essay on the Application of Mathematical Analysis to the Theories of Electricity and Magnetism*, introducing Green's identities and Green's functions; it was almost unknown until William Thomson (Lord Kelvin) rediscovered it in 1845. Carl Friedrich Gauss proved the mean value property for potentials in 1840. Bernhard Riemann, building on lectures of Dirichlet, assumed that the Dirichlet problem can always be solved by minimising the energy $\iint\abs{\nabla u}^2$ — the "Dirichlet principle" — but in 1870 Karl Weierstrass showed that such minimisation problems need not have a minimiser. David Hilbert rehabilitated the principle around 1900, opening the way to the modern direct methods of the calculus of variations.
:::

## Where this leads

Separation of variables in other coordinate systems leads to new families of special functions: cylindrical coordinates give Bessel's equation, and spherical coordinates give Legendre's equation and spherical harmonics, the building blocks of gravitational and atomic physics ([[ode/series-solutions]], [[pde/sturm-liouville]]). The connection with complex analysis is exploited systematically through conformal maps, which transform harmonic functions into harmonic functions and turn hard regions into discs ([[complex-analysis/conformal-maps]]). Poisson's equation on general domains is solved with Green's functions, the continuous analogue of an inverse matrix, and on the whole plane with convolution, as for the heat kernel in [[pde/fourier-transform]].

::: summary
- Laplace's equation $\Delta u = 0$ governs steady temperatures, electrostatic and gravitational potentials, and ideal fluid flow; its solutions are harmonic functions, such as the real and imaginary parts of analytic functions.
- A boundary value problem prescribes $u$ (Dirichlet) or $\partial u/\partial n$ (Neumann) on the boundary; the Neumann problem requires $\oint h\,ds = 0$ and determines $u$ only up to a constant ([[#prop-compatibility]]).
- On a rectangle, separation gives $\sinh$ in one variable and $\sin$ in the other ([[#eq-rect-solution]]); general data are handled by superposing four problems.
- On a disc, $u = \frac{a_0}{2} + \sum(r/a)^n(a_n\cos n\theta + b_n\sin n\theta)$, which sums to Poisson's integral formula ([[#thm-poisson]]); in annuli, keep $\ln r$ and $r^{-n}$.
- A harmonic function equals its average over every circle and disc in its domain ([[#thm-mean-value]]).
- Maximum principle: a non-constant harmonic function has no interior maximum or minimum, so on bounded domains extremes occur on the boundary; this gives uniqueness and stability for the Dirichlet problem ([[#cor-unique]]).
:::

## Exercises

::: exercise Making a polynomial harmonic {level=1 check="-3"}
For which constant $a$ is $u(x,y) = x^3 + axy^2$ harmonic?
::: solution
$u_{xx} = 6x$ and $u_{yy} = 2ax$, so $\Delta u = (6 + 2a)x$, which vanishes identically exactly when $a = -3$. (Then $u = \operatorname{Re}z^3$.)
:::
:::

::: exercise Boundary data in polar form {level=1 check="5/8"}
Solve the Dirichlet problem in the unit disc with $u(1,\theta) = \cos^2\theta$, and evaluate $u$ at the point $(x, y) = (\frac12, 0)$.
::: solution
Since $\cos^2\theta = \frac12 + \frac12\cos2\theta$, the series [[#eq-disc-series]] has only two terms: $u = \frac12 + \frac12r^2\cos2\theta = \frac12 + \frac12(x^2 - y^2)$. At $(\frac12, 0)$, $u = \frac12 + \frac18 = \frac58$.
:::
:::

::: exercise A single mode on a square {level=1 check="1/(2*cosh(3*pi/2))"}
Solve $\Delta u = 0$ on $0 < x, y < \pi$ with $u = 0$ on the edges $x = 0$, $x = \pi$, $y = 0$ and $u(x, \pi) = \sin 3x$. Evaluate $u(\pi/6, \pi/2)$.
::: solution
The boundary data are a single eigenfunction, so by [[#eq-rect-solution]] $u = \frac{\sinh 3y}{\sinh 3\pi}\sin3x$. At $(\pi/6,\pi/2)$, $\sin\frac\pi2 = 1$ and $u = \frac{\sinh(3\pi/2)}{\sinh 3\pi} = \frac{1}{2\cosh(3\pi/2)} \approx 0.009$, using $\sinh2s = 2\sinh s\cosh s$. The value at the centre is tiny: the third harmonic dies off quickly away from the edge.
:::
:::

::: exercise An annulus {level=2 check="5"}
Find the harmonic function in the annulus $1 < r < 2$ with $u = 0$ on $r = 1$ and $u = 10$ on $r = 2$, and evaluate it on the circle $r = \sqrt2$.
::: solution
Try $u = A + B\ln r$. Then $A = 0$ and $B\ln 2 = 10$, so $u = \frac{10\ln r}{\ln2}$, which is the unique solution by [[#cor-unique]]. On $r = \sqrt2$, $u = \frac{10\cdot\frac12\ln2}{\ln2} = 5$. (The geometric mean of the radii, not the arithmetic mean, gets the average temperature.)
:::
:::

::: exercise A Neumann problem {level=2 check="1/2"}
For which constant $c$ does the Neumann problem $\Delta u = 0$ in the unit disc, $\frac{\partial u}{\partial r}(1,\theta) = \cos^2\theta - c$, have a solution? Find all solutions for that $c$.
::: solution
By [[#prop-compatibility]] we need $\int_0^{2\pi}(\cos^2\theta - c)\,d\theta = \pi - 2\pi c = 0$, so $c = \frac12$. Then the data are $\frac12\cos2\theta$. Trying $u = Ar^2\cos2\theta$ gives $u_r(1,\theta) = 2A\cos2\theta$, so $A = \frac14$, and the solutions are $u = \frac14r^2\cos2\theta + C = \frac14(x^2 - y^2) + C$ for any constant $C$ (no others, by the next exercise).
:::
:::

::: exercise Uniqueness for the Neumann problem {level=2}
Let $\Omega$ be a bounded connected region with piecewise smooth boundary, and let $w$ have continuous second derivatives on $\overline\Omega$, with $\Delta w = 0$ in $\Omega$ and $\partial w/\partial n = 0$ on $\partial\Omega$. Prove that $w$ is constant. Deduce that two solutions of the same Neumann problem differ by a constant.
::: hint
Apply the divergence theorem to $w\nabla w$.
:::
::: solution
We have $\divg(w\nabla w) = \abs{\nabla w}^2 + w\Delta w = \abs{\nabla w}^2$. By the divergence theorem,

$$
\iint_\Omega\abs{\nabla w}^2\,dA = \oint_{\partial\Omega}w\frac{\partial w}{\partial n}\,ds = 0.
$$

The integrand is continuous and non-negative, so $\nabla w = 0$ throughout $\Omega$; as $\Omega$ is connected, $w$ is constant. If $u_1$ and $u_2$ solve the same Neumann problem, $w = u_1 - u_2$ satisfies these hypotheses, so $u_1 - u_2$ is constant.
:::
:::

::: exercise The maximum on a circle {level=2}
Let $u$ be harmonic in the whole plane and let $M(r) = \max_{\abs{x} = r}u(x)$. Show that $M$ is non-decreasing, and that if $M(r_1) = M(r_2)$ for some $r_1 < r_2$, then $u$ is constant on the disc $\abs x < r_2$.
::: solution
Let $r_1 < r_2$. By [[#cor-unique]] applied to the closed disc $\abs x \le r_2$, every value of $u$ in that disc — in particular on the circle $\abs x = r_1$ — is at most $\max_{\abs x = r_2}u = M(r_2)$. Hence $M(r_1) \le M(r_2)$.

If $M(r_1) = M(r_2)$, choose a point $p$ with $\abs p = r_1$ and $u(p) = M(r_1)$. Then $u(p) = M(r_2)$ is the maximum of $u$ over the open disc $\abs x < r_2$, attained at the interior point $p$. The open disc is connected, so by [[#thm-strong-max]] $u$ is constant there. (In fact $u$ is then constant on the whole plane, because harmonic functions, like analytic ones, cannot be constant on an open set without being constant on every connected set containing it; we do not prove this here.)
:::
:::

::: exercise Harnack's inequality {level=3}
Let $u$ be continuous on the closed disc $r \le a$, harmonic inside, and non-negative. Prove that for $r < a$,

$$
\frac{a - r}{a + r}\,u(0) \le u(r,\theta) \le \frac{a + r}{a - r}\,u(0).
$$
::: hint
Bound the Poisson kernel above and below using $(a - r)^2 \le a^2 - 2ar\cos\alpha + r^2 \le (a + r)^2$.
:::
::: solution
Let $g(\theta) = u(a,\theta) \ge 0$. By [[#thm-poisson]] and [[#cor-unique]], $u$ is given by the Poisson integral of $g$. Since $(a - r)^2 \le a^2 - 2ar\cos\alpha + r^2 \le (a + r)^2$ and $a^2 - r^2 = (a - r)(a + r)$,

$$
\frac{a - r}{a + r} \le P(r, \alpha) \le \frac{a + r}{a - r}.
$$

Multiplying by $g(\phi) \ge 0$ and averaging over $\phi$,

$$
\frac{a - r}{a + r}\cdot\frac1{2\pi}\int_{-\pi}^{\pi}g \le u(r,\theta) \le \frac{a + r}{a - r}\cdot\frac{1}{2\pi}\int_{-\pi}^{\pi}g,
$$

and $\frac{1}{2\pi}\int g = u(0)$ because $P(0,\alpha) = 1$ (this is the mean value property on the circle of radius $a$). For example, a positive harmonic function on the unit disc can be at most $3u(0)$ at distance $\frac12$ from the centre.
:::
:::

::: exercise Liouville's theorem for harmonic functions {level=3}
Prove that a bounded harmonic function on all of $\R^2$ is constant.
::: hint
Compare the disc averages of $u$ over two large discs of the same radius $R$ centred at $p$ and $q$.
:::
::: solution
Let $\abs u \le K$ and fix points $p, q$. For any $R > 0$, the mean value property over discs gives

$$
u(p) - u(q) = \frac{1}{\pi R^2}\left(\iint_{D(p,R)}u\,dA - \iint_{D(q,R)}u\,dA\right).
$$

The common part $D(p,R)\cap D(q,R)$ cancels, so $\abs{u(p) - u(q)} \le \frac{K}{\pi R^2}\operatorname{area}\bigl(D(p,R)\,\triangle\,D(q,R)\bigr)$. The symmetric difference is contained in the set of points within distance $\abs{p-q}$ of the circle of radius $R$ around $p$ (a point of $D(q,R)\setminus D(p,R)$ has distance between $R$ and $R + \abs{p - q}$ from $p$, and similarly the other way round), whose area is $\pi\bigl((R + d)^2 - (R - d)^2\bigr) = 4\pi Rd$ with $d = \abs{p - q}$ (for $R > d$). Hence

$$
\abs{u(p) - u(q)} \le \frac{K\cdot4\pi R\,d}{\pi R^2} = \frac{4Kd}{R} \longrightarrow 0 \quad (R\to\infty).
$$

So $u(p) = u(q)$ for all $p, q$: $u$ is constant.
:::
:::
