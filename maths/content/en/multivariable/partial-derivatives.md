The temperature on a metal plate depends on two coordinates, $T = T(x, y)$; the pressure of a gas depends on its volume and temperature; the cost of a product depends on dozens of prices. How fast does the temperature change if we walk due east from a point? Holding $y$ fixed turns $T$ into a function of $x$ alone, and its ordinary derivative answers the question. This is a **partial derivative**, and computing it needs nothing beyond one-variable calculus.

The real question, though, is how $f$ responds when *all* its variables change at once, and here several variables bring genuine surprises. A function can have partial derivatives at a point without even being continuous there, and a limit can exist along every straight line through a point and still fail to exist. The cure is the right definition of the derivative: $f$ is **differentiable** when it is well approximated near a point by a *linear* function. With that definition the familiar theorems return, culminating in the multivariable chain rule. Linear algebra (matrices and linear maps, [[linear-algebra/matrices]]) is the natural language throughout.

## Functions of several variables

A **function of $n$ variables** is a rule $f\colon D\to\R$ that assigns a real number $f(\mathbf{x}) = f(x_1, \dots, x_n)$ to each point $\mathbf{x}$ of a set $D \subseteq \R^n$, its **domain**. When no domain is given, we take the largest set on which the formula makes sense. More generally a function $\mathbf{f}\colon D\to\R^m$ has $m$ real **component functions**, $\mathbf{f} = (f_1, \dots, f_m)$.

For $n = 2$ there are two ways to draw $f$:

- its **graph** $\set{(x, y, z) : z = f(x, y)}$, a surface in $\R^3$ lying over the domain;
- its **level curves** $f(x, y) = c$, the curves along which $f$ is constant. Drawn together, they form a **contour map**, like the contour lines of a hiking map or the isobars of a weather chart.

The level curve $f = c$ is the horizontal slice of the graph at height $c$, projected down to the $xy$-plane. For $n = 3$ we cannot draw the graph (it lives in $\R^4$), but the **level surfaces** $f(x, y, z) = c$ are still visible.

::: example Domains, ranges and level curves {#ex-level-curves}
Describe the domain, range and level curves of (a) $f(x, y) = \sqrt{9 - x^2 - y^2}$ and (b) $g(x, y) = x^2 - y^2$.
::: solution
(a) We need $9 - x^2 - y^2 \ge 0$, so the domain is the closed disc $x^2 + y^2 \le 9$. The values run from $0$ (on the boundary circle) to $3$ (at the origin), so the range is $[0, 3]$. Squaring $z = f(x,y)$ gives $x^2 + y^2 + z^2 = 9$ with $z \ge 0$: the graph is the upper hemisphere of radius $3$. The level curve $f = c$ for $0 \le c \le 3$ is the circle $x^2 + y^2 = 9 - c^2$, of radius $\sqrt{9 - c^2}$; the circles crowd together as $c \to 0$, where the hemisphere becomes vertical.

(b) The domain is $\R^2$ and the range is $\R$ (take $y = 0$ for positive values, $x = 0$ for negative ones). For $c > 0$ the level curve $x^2 - y^2 = c$ is a hyperbola opening left and right; for $c < 0$, one opening up and down; and for $c = 0$ it is the pair of lines $y = \pm x$. The graph is a saddle: it rises along the $x$-axis and falls along the $y$-axis.
:::
:::

::: widget surface
f: (x^2 + 3y^2)*exp(1 - x^2 - y^2)
x: -2.5, 2.5
y: -2.5, 2.5
contours: true
caption: The landscape $z = (x^2 + 3y^2)e^{1-x^2-y^2}$ with its level curves. Rotate it and match features of the graph with features of the contour map: two peaks of height $3$ at $(0, \pm1)$, two mountain passes of height $1$ at $(\pm1, 0)$, and a pit at the origin. Where level curves crowd together the surface is steep; a pass shows up as level curves crossing in an X.
:::

## Limits and continuity

We measure distance in $\R^n$ by the Euclidean norm $\norm{\mathbf{x} - \mathbf{a}} = \sqrt{(x_1 - a_1)^2 + \dots + (x_n - a_n)^2}$. The set of points within distance $r$ of $\mathbf{a}$ is the **open ball** $B(\mathbf{a}, r)$, a disc when $n = 2$. With absolute values replaced by norms, the definition of a limit is word for word the one in [[calculus-1/limits]].

::: definition Limit of a function of several variables {#def-limit-2d}
Let $f\colon D\to\R$ with $D\subseteq\R^n$, and let $\mathbf{a}$ be a point such that every ball $B(\mathbf{a}, r)$ contains points of $D$ other than $\mathbf{a}$. We write $\lim_{\mathbf{x}\to\mathbf{a}} f(\mathbf{x}) = L$ if for every $\eps > 0$ there is a $\delta > 0$ such that
$$
\mathbf{x}\in D \ \text{ and } \ 0 < \norm{\mathbf{x} - \mathbf{a}} < \delta \implies \abs{f(\mathbf{x}) - L} < \eps .
$$
The function $f$ is **continuous at** $\mathbf{a}\in D$ if $\lim_{\mathbf{x}\to\mathbf{a}} f(\mathbf{x}) = f(\mathbf{a})$, and **continuous** if it is continuous at every point of $D$. For $\mathbf{f}\colon D\to\R^m$ the same definitions apply with $\norm{\mathbf{f}(\mathbf{x}) - \mathbf{L}}$ in place of $\abs{f(\mathbf{x}) - L}$; as for vector functions of one variable, this is equivalent to convergence of each component.
:::

The proofs of uniqueness, of the limit laws for sums, products and quotients, and of the squeeze theorem carry over unchanged from one variable. Each coordinate function $\mathbf{x}\mapsto x_i$ is continuous (because $\abs{x_i - a_i} \le \norm{\mathbf{x} - \mathbf{a}}$), so polynomials in $x_1, \dots, x_n$ are continuous everywhere, rational functions are continuous wherever the denominator is non-zero, and compositions of continuous functions are continuous. Expressions like $e^{xy}\cos(x + z)$ are therefore continuous, and their limits can be found by substitution.

The new feature is that $\mathbf{x}$ can approach $\mathbf{a}$ from infinitely many directions, and along curved paths too. The limit must be the same along all of them.

::: theorem Limits along curves {#thm-path-limits}
Suppose $\lim_{\mathbf{x}\to\mathbf{a}} f(\mathbf{x}) = L$. Let $\boldsymbol\gamma$ be a function from an interval around $t_0$ into $D$ with $\boldsymbol\gamma(t) \to \mathbf{a}$ as $t\to t_0$ and $\boldsymbol\gamma(t) \neq \mathbf{a}$ for $t\neq t_0$. Then $f(\boldsymbol\gamma(t)) \to L$ as $t\to t_0$. Consequently, if $f$ has different limits along two such curves, or no limit along one of them, then $\lim_{\mathbf{x}\to\mathbf{a}} f(\mathbf{x})$ does not exist.
:::

::: proof
Let $\eps > 0$ and choose $\delta$ as in [[#def-limit-2d]]. Since $\boldsymbol\gamma(t)\to\mathbf{a}$, there is $\eta > 0$ such that $0<\abs{t - t_0}<\eta$ implies $\norm{\boldsymbol\gamma(t) - \mathbf{a}} < \delta$; and $\boldsymbol\gamma(t) \neq \mathbf{a}$ for these $t$, so $0 < \norm{\boldsymbol\gamma(t) - \mathbf{a}} < \delta$. Hence $\abs{f(\boldsymbol\gamma(t)) - L} < \eps$. The second statement is the contrapositive, together with uniqueness of one-variable limits.
:::

::: example Different limits along different lines {#ex-xy}
Show that $\displaystyle\lim_{(x,y)\to(0,0)}\frac{xy}{x^2+y^2}$ does not exist.
::: solution
Along the line $y = mx$ (with $x \neq 0$),
$$
\frac{x\cdot mx}{x^2 + m^2x^2} = \frac{m}{1 + m^2},
$$
a constant that depends on $m$: it is $0$ along the $x$-axis ($m = 0$) and $\tfrac12$ along the diagonal ($m = 1$). By [[#thm-path-limits]] there is no limit. In polar coordinates the function equals $\cos\theta\sin\theta = \tfrac12\sin 2\theta$: it depends only on the direction of approach, never on the distance.
:::
:::

::: example Lines are not enough {#ex-parabola-path}
Let $f(x, y) = \dfrac{x^2y}{x^4 + y^2}$ for $(x, y) \neq (0,0)$. Show that $f \to 0$ along every straight line through the origin, but $\lim_{(x,y)\to(0,0)} f(x,y)$ does not exist.
::: solution
On the axes $f = 0$. Along $y = mx$ with $m \neq 0$ and $x\neq0$,
$$
f(x, mx) = \frac{mx^3}{x^4 + m^2x^2} = \frac{mx}{x^2 + m^2} \longrightarrow \frac{0}{m^2} = 0 \qquad (x\to0).
$$
But along the parabola $y = x^2$,
$$
f(x, x^2) = \frac{x^4}{x^4 + x^4} = \frac12 \quad\text{for every } x \neq 0 .
$$
Two curves give the limits $0$ and $\tfrac12$, so there is no limit.
:::
:::

::: widget surface
f: if(x^2 + y^2 > 0, x^2*y/(x^4 + y^2), 0)
x: -1, 1
y: -1, 1
resolution: 60
caption: The graph of $x^2y/(x^4+y^2)$, set to $0$ at the origin. Rotate it and look along any straight line through the origin: the height tends to $0$. But a ridge of constant height $\tfrac12$ runs above the parabola $y = x^2$, and a valley of depth $-\tfrac12$ above $y = -x^2$, both all the way into the origin. Every disc around the origin, however small, contains points at heights $\tfrac12$ and $-\tfrac12$, so no single number can be the limit.
:::

::: quiz
Suppose $f(x,y)\to 0$ as $(x,y)\to(0,0)$ along every straight line through the origin. What can you conclude about $\lim_{(x,y)\to(0,0)}f(x,y)$?
- [ ] It exists and equals $0$.
- [ ] It exists, but it might not be $0$.
- [x] Nothing: it may or may not exist, but if it exists it equals $0$.
- [ ] It cannot exist.
::: solution
[[#ex-parabola-path]] tends to $0$ along every line, yet has no limit. On the other hand $f = 0$ tends to $0$ along lines and has limit $0$. Lines only test some of the ways to approach the origin. What *is* true is that if the limit exists, it must equal the common value along the lines, by [[#thm-path-limits]].
:::
:::

To prove that a limit *does* exist we need an estimate valid for all nearby points at once, usually via the squeeze theorem.

::: example A limit that exists {#ex-squeeze-2d}
Show that $\displaystyle\lim_{(x,y)\to(0,0)}\frac{3x^2y}{x^2+y^2} = 0$.
::: solution
For $(x,y) \neq (0,0)$ we have $x^2 \le x^2 + y^2$, so
$$
\abs{\frac{3x^2y}{x^2+y^2}} = 3\abs{y}\,\frac{x^2}{x^2+y^2} \le 3\abs{y} \le 3\sqrt{x^2+y^2}.
$$
Given $\eps > 0$, take $\delta = \eps/3$: if $0 < \norm{(x,y)} < \delta$ the expression is within $3\delta = \eps$ of $0$. In polar coordinates the same estimate reads $\abs{3r\cos^2\theta\sin\theta} \le 3r$, a bound that does not involve $\theta$.
:::
:::

::: warning Polar coordinates: the bound must not depend on θ
Writing $x = r\cos\theta$, $y = r\sin\theta$ and letting $r\to0$ *with $\theta$ fixed* only tests approach along straight lines. In [[#ex-parabola-path]],
$$
f = \frac{r\cos^2\theta\sin\theta}{r^2\cos^4\theta + \sin^2\theta},
$$
which tends to $0$ as $r\to0$ for each fixed $\theta$, yet the limit does not exist. A polar argument proves a limit only when it gives $\abs{f - L} \le g(r)$ with $g(r)\to0$ and $g$ independent of $\theta$, as in [[#ex-squeeze-2d]].
:::

## Partial derivatives

::: definition Partial derivatives {#def-partial}
Let $f$ be defined on a ball around $\mathbf{a}\in\R^n$, and let $\mathbf{e}_j$ be the $j$-th standard basis vector. The **partial derivative** of $f$ with respect to $x_j$ at $\mathbf{a}$ is
$$
\pdv{f}{x_j}(\mathbf{a}) = \lim_{h\to0}\frac{f(\mathbf{a} + h\mathbf{e}_j) - f(\mathbf{a})}{h},
$$
when the limit exists. For a function $f(x, y)$ of two variables,
$$
f_x(a, b) = \lim_{h\to0}\frac{f(a+h, b) - f(a, b)}{h}, \qquad f_y(a, b) = \lim_{h\to0}\frac{f(a, b+h) - f(a, b)}{h}.
$$
Other notations are $\partial f/\partial x$, $\partial_x f$ and $D_1 f$.
:::

So $f_x(a, b)$ is the ordinary derivative at $x = a$ of the one-variable function $x\mapsto f(x, b)$. To compute $f_x$, differentiate with respect to $x$ treating every other variable as a constant. Geometrically, the plane $y = b$ cuts the graph of $f$ in a curve $z = f(x, b)$, and $f_x(a, b)$ is the slope of that curve at $x = a$: the slope of the surface in the $x$-direction. Likewise $f_y$ is the slope in the $y$-direction.

::: example Computing partial derivatives {#ex-partials}
(a) For $f(x, y) = x^3 + x^2y^3 - 2y^2$, find $f_x(2, 1)$ and $f_y(2, 1)$. (b) For $g(x, y, z) = e^{xy}\ln z$, find all three partial derivatives.
::: solution
(a) Holding $y$ constant, $f_x = 3x^2 + 2xy^3$; holding $x$ constant, $f_y = 3x^2y^2 - 4y$. At $(2,1)$: $f_x(2,1) = 12 + 4 = 16$ and $f_y(2, 1) = 12 - 4 = 8$. So at the point $(2, 1, f(2,1)) = (2, 1, 10)$ the surface rises with slope $16$ in the $x$-direction and slope $8$ in the $y$-direction.

(b) By the chain rule in one variable, $g_x = ye^{xy}\ln z$, $g_y = xe^{xy}\ln z$ and $g_z = e^{xy}/z$, for $z > 0$.
:::
:::

Partial derivatives only look along lines parallel to the axes, and this is a serious limitation.

::: example Partial derivatives without continuity {#ex-partials-discontinuous}
Let $f(x, y) = \dfrac{xy}{x^2 + y^2}$ for $(x,y)\neq(0,0)$ and $f(0, 0) = 0$. Show that $f_x(0,0)$ and $f_y(0,0)$ exist although $f$ is not continuous at the origin.
::: solution
On the $x$-axis $f(h, 0) = 0$ for all $h$, so $f_x(0,0) = \lim_{h\to0}\frac{0 - 0}{h} = 0$; similarly $f_y(0,0) = 0$. Yet by [[#ex-xy]], $f$ has no limit at the origin, so it is certainly not continuous there.
:::
:::

::: warning Partial derivatives do not make a function well behaved
In one variable, differentiability implies continuity. Having partial derivatives does not: they only examine $f$ along two lines through the point, and $f$ can misbehave everywhere else. This is why we shall need a stronger notion, differentiability, before the familiar theorems come back.
:::

::: quiz
A function $f(x,y)$ has both partial derivatives at $(0,0)$. Which of the following must be true?
- [ ] $f$ is continuous at $(0,0)$.
- [ ] $f$ is differentiable at $(0,0)$.
- [x] The one-variable function $x\mapsto f(x, 0)$ is differentiable at $x = 0$.
- [ ] $f_{xy}(0,0) = f_{yx}(0,0)$.
::: solution
By definition $f_x(0,0)$ is the derivative of $x\mapsto f(x,0)$ at $0$, so the third statement is exactly what is given. [[#ex-partials-discontinuous]] rules out the first two (a differentiable function is continuous, [[#thm-diff-partials]]), and the second-order partial derivatives need not even exist.
:::
:::

## Higher derivatives and Clairaut's theorem

The partial derivatives $f_x$ and $f_y$ are themselves functions of $(x, y)$ and can be differentiated again, giving four **second-order partial derivatives**:
$$
f_{xx} = \frac{\partial^2 f}{\partial x^2}, \qquad f_{xy} = (f_x)_y = \frac{\partial^2 f}{\partial y\,\partial x}, \qquad f_{yx} = (f_y)_x = \frac{\partial^2 f}{\partial x\,\partial y}, \qquad f_{yy} = \frac{\partial^2 f}{\partial y^2}.
$$
In the subscript notation we differentiate in the order read from left to right; in the fraction notation, from right to left. For example, $f(x, y) = xe^{xy}$ has $f_x = (1 + xy)e^{xy}$ and $f_y = x^2e^{xy}$, and
$$
f_{xy} = xe^{xy} + (1+xy)\,xe^{xy} = (2x + x^2y)e^{xy}, \qquad f_{yx} = 2xe^{xy} + x^2y\,e^{xy} = (2x + x^2y)e^{xy}.
$$
The two mixed derivatives agree. This is no accident.

A function is of **class** $C^1$ on an open set if all its first partial derivatives exist and are continuous there, and of **class** $C^2$ if, in addition, all second partial derivatives exist and are continuous.

::: theorem Clairaut–Schwarz theorem {#thm-clairaut}
Let $f$ be defined on an open disc $D$ centred at $(a, b)$. Suppose $f_x$, $f_y$, $f_{xy}$ and $f_{yx}$ exist on $D$ and that $f_{xy}$ and $f_{yx}$ are continuous at $(a, b)$. Then
$$
f_{xy}(a, b) = f_{yx}(a, b).
$$
In particular, the mixed partial derivatives of a $C^2$ function are equal.
:::

::: proof
Let $\rho$ be the radius of $D$ and take $0 < \abs{h} < \rho/2$, so that every point $(a + \alpha h, b + \beta h)$ with $\alpha, \beta\in[0, 1]$ lies in $D$. The idea is to compute one quantity, a "second difference", in two different orders:
$$
\Delta(h) = f(a+h, b+h) - f(a+h, b) - f(a, b+h) + f(a, b).
$$
*First order.* Let $\varphi(x) = f(x, b+h) - f(x, b)$. Then $\Delta(h) = \varphi(a+h) - \varphi(a)$, and $\varphi$ is differentiable with $\varphi'(x) = f_x(x, b+h) - f_x(x, b)$. By the mean value theorem ([[calculus-1/mean-value-theorem]]) there is $\xi$ between $a$ and $a+h$ with
$$
\Delta(h) = h\,\varphi'(\xi) = h\bigl[f_x(\xi, b+h) - f_x(\xi, b)\bigr].
$$
The function $y\mapsto f_x(\xi, y)$ has derivative $f_{xy}(\xi, y)$, so the mean value theorem again gives $\eta$ between $b$ and $b+h$ with $f_x(\xi, b+h) - f_x(\xi, b) = h\,f_{xy}(\xi, \eta)$. Hence $\Delta(h) = h^2 f_{xy}(\xi, \eta)$.

*Second order.* Let $\psi(y) = f(a+h, y) - f(a, y)$. Then $\Delta(h) = \psi(b+h) - \psi(b)$, and the same two steps, first in $y$ and then in $x$, give points $\eta'$ between $b$ and $b+h$ and $\xi'$ between $a$ and $a+h$ with $\Delta(h) = h\bigl[f_y(a+h, \eta') - f_y(a, \eta')\bigr] = h^2 f_{yx}(\xi', \eta')$.

Comparing, $f_{xy}(\xi, \eta) = f_{yx}(\xi', \eta')$, where both points lie within distance $\sqrt2\abs{h}$ of $(a, b)$. Let $h\to0$. Both points tend to $(a, b)$, and since $f_{xy}$ and $f_{yx}$ are continuous there, $f_{xy}(a, b) = f_{yx}(a, b)$.
:::

The continuity hypothesis cannot be dropped.

::: example Unequal mixed partial derivatives {#ex-peano}
Let $f(x, y) = \dfrac{xy(x^2 - y^2)}{x^2 + y^2}$ for $(x, y) \neq (0, 0)$ and $f(0,0) = 0$. Show that $f_{xy}(0, 0) = -1$ but $f_{yx}(0, 0) = 1$.
::: solution
We need $f_x$ along the $y$-axis and $f_y$ along the $x$-axis. For any $y$,
$$
f_x(0, y) = \lim_{h\to0}\frac{f(h, y) - f(0, y)}{h} = \lim_{h\to0}\frac{y(h^2 - y^2)}{h^2 + y^2} = -y
$$
(for $y \neq 0$ the limit is $y\cdot(-y^2)/y^2$; for $y = 0$ the quotient is identically $0$). Hence $f_{xy}(0, 0) = \frac{d}{dy}(-y)\big|_{y=0} = -1$. Similarly, for any $x$,
$$
f_y(x, 0) = \lim_{k\to0}\frac{f(x, k) - f(x, 0)}{k} = \lim_{k\to0}\frac{x(x^2 - k^2)}{x^2 + k^2} = x,
$$
so $f_{yx}(0, 0) = \frac{d}{dx}(x)\big|_{x=0} = 1$. The mixed partial derivatives exist but differ; by [[#thm-clairaut]] they cannot both be continuous at the origin. (Away from the origin $f$ is a rational function and its mixed partials are equal, but they depend only on the direction from the origin: on every circle around it they take every value between $-\sqrt2$ and $\sqrt2$, so they have no limit at the origin.)
:::
:::

For functions of $n$ variables the theorem applies to each pair of variables in turn: if $f$ is of class $C^k$, every $k$-th order partial derivative is independent of the order in which the differentiations are performed. This symmetry halves the work of computing second derivatives, and it is the reason the Hessian matrix of [[multivariable/extrema]] is symmetric.

## Differentiability

In one variable, $f'(a)$ exists exactly when
$$
f(a + h) = f(a) + f'(a)\,h + \text{(error)}, \qquad \frac{\text{error}}{h}\to 0 \text{ as } h\to0 :
$$
near $a$, $f$ is a linear function plus an error that is small *even compared with* $h$. This is the formulation that generalises: we ask for a linear map that approximates $f$ near $\mathbf{a}$ in every direction at once.

::: definition Differentiability and the derivative {#def-differentiable}
Let $U\subseteq\R^n$ be open, $\mathbf{f}\colon U\to\R^m$ and $\mathbf{a}\in U$. Then $\mathbf{f}$ is **differentiable at** $\mathbf{a}$ if there is an $m\times n$ matrix $A$ such that
$$
\lim_{\mathbf{h}\to\mathbf{0}}\frac{\norm{\mathbf{f}(\mathbf{a}+\mathbf{h}) - \mathbf{f}(\mathbf{a}) - A\mathbf{h}}}{\norm{\mathbf{h}}} = 0 .
$$ {#eq-differentiable}
The matrix $A$ is the **derivative** of $\mathbf{f}$ at $\mathbf{a}$, written $D\mathbf{f}(\mathbf{a})$, and $\mathbf{f}$ is **differentiable** on $U$ if it is differentiable at every point of $U$.
:::

Equivalently, $\mathbf{f}(\mathbf{a} + \mathbf{h}) = \mathbf{f}(\mathbf{a}) + A\mathbf{h} + \norm{\mathbf{h}}\,\boldsymbol\eps(\mathbf{h})$ with $\boldsymbol\eps(\mathbf{h})\to\mathbf{0}$ as $\mathbf{h}\to\mathbf{0}$. The affine map $\mathbf{x}\mapsto\mathbf{f}(\mathbf{a}) + D\mathbf{f}(\mathbf{a})(\mathbf{x} - \mathbf{a})$ is the **linearisation** of $\mathbf{f}$ at $\mathbf{a}$; for a real function of two variables its graph is the tangent plane studied in [[multivariable/gradient]]. In the proofs below, $\norm{A} = \bigl(\sum_{i,j}a_{ij}^2\bigr)^{1/2}$; applying the Cauchy–Schwarz inequality ([[multivariable/vectors-geometry#thm-cauchy-schwarz]]) to each row of $A$ gives $\norm{A\mathbf{h}} \le \norm{A}\,\norm{\mathbf{h}}$.

::: theorem What differentiability gives {#thm-diff-partials}
If $\mathbf{f}$ is differentiable at $\mathbf{a}$, then
1. $\mathbf{f}$ is continuous at $\mathbf{a}$;
2. every partial derivative $\partial f_i/\partial x_j(\mathbf{a})$ exists, and $D\mathbf{f}(\mathbf{a})$ is the matrix of partial derivatives:
$$
D\mathbf{f}(\mathbf{a}) = \begin{pmatrix} \dfrac{\partial f_1}{\partial x_1}(\mathbf{a}) & \cdots & \dfrac{\partial f_1}{\partial x_n}(\mathbf{a}) \\ \vdots & & \vdots \\ \dfrac{\partial f_m}{\partial x_1}(\mathbf{a}) & \cdots & \dfrac{\partial f_m}{\partial x_n}(\mathbf{a}) \end{pmatrix}.
$$
In particular the derivative is unique.
:::

::: proof
Write $A = D\mathbf{f}(\mathbf{a})$ and $\mathbf{f}(\mathbf{a}+\mathbf{h}) - \mathbf{f}(\mathbf{a}) = A\mathbf{h} + \norm{\mathbf{h}}\boldsymbol\eps(\mathbf{h})$ with $\boldsymbol\eps(\mathbf{h}) \to \mathbf{0}$.

1. $\norm{\mathbf{f}(\mathbf{a}+\mathbf{h}) - \mathbf{f}(\mathbf{a})} \le \norm{A}\,\norm{\mathbf{h}} + \norm{\mathbf{h}}\,\norm{\boldsymbol\eps(\mathbf{h})} \to 0$ as $\mathbf{h}\to\mathbf{0}$.

2. Take $\mathbf{h} = t\mathbf{e}_j$ with $t \neq 0$ small. Then [[#eq-differentiable]] gives
$$
\norm{\frac{\mathbf{f}(\mathbf{a} + t\mathbf{e}_j) - \mathbf{f}(\mathbf{a})}{t} - A\mathbf{e}_j} = \frac{\norm{\mathbf{f}(\mathbf{a}+t\mathbf{e}_j) - \mathbf{f}(\mathbf{a}) - A(t\mathbf{e}_j)}}{\abs t} \longrightarrow 0 .
$$
So the difference quotient tends to $A\mathbf{e}_j$, the $j$-th column of $A$. Its $i$-th component is the difference quotient of $f_i$, so $\partial f_i/\partial x_j(\mathbf{a})$ exists and equals $a_{ij}$.
:::

The matrix of partial derivatives is called the **Jacobian matrix** of $\mathbf{f}$; when $m = n$ its determinant is the Jacobian determinant of [[multivariable/change-of-variables]]. For a real-valued $f$ ($m = 1$) it is the row $\bigl(f_{x_1}\ \cdots\ f_{x_n}\bigr)$, which as a vector is the gradient $\nabla f$ of the next chapter. Part 1 of the theorem shows that the function of [[#ex-partials-discontinuous]] is not differentiable at the origin. Continuity is not enough either.

::: example Continuous, with partial derivatives, but not differentiable {#ex-sqrt-xy}
Show that $f(x, y) = \sqrt{\abs{xy}}$ is continuous and has both partial derivatives at $(0,0)$, but is not differentiable there.
::: solution
$f$ is a composition of continuous functions, hence continuous. On the axes $f = 0$, so $f_x(0,0) = f_y(0,0) = 0$. If $f$ were differentiable at the origin, [[#thm-diff-partials]] would force $Df(0,0) = (0\ \ 0)$, and [[#eq-differentiable]] would say $f(h, k)/\norm{(h,k)}\to0$. But along the diagonal $h = k \neq 0$,
$$
\frac{f(h, h)}{\norm{(h, h)}} = \frac{\abs{h}}{\sqrt2\,\abs{h}} = \frac{1}{\sqrt2} \not\to 0 .
$$
So $f$ is not differentiable at $(0,0)$.
:::
:::

::: widget surface
f: sqrt(abs(x*y))
x: -1, 1
y: -1, 1
tangent: 0, 0
resolution: 60
caption: The graph of $\sqrt{\lvert xy\rvert}$ with the plane $z = 0$, the only candidate for a tangent plane at the origin since both partial derivatives vanish there. Rotate the view. The surface contains both axes, so the plane matches it in the $x$- and $y$-directions. Along the diagonals, though, the surface rises like a cone with slope $1/\sqrt2$, so it never flattens onto the plane, however far you zoom in. The plane is not tangent, and $f$ is not differentiable at the origin.
:::

Checking [[#eq-differentiable]] directly is tedious. Fortunately, a simple condition on the partial derivatives guarantees differentiability, and it covers almost every function met in practice.

::: theorem Continuous partial derivatives imply differentiability {#thm-c1-differentiable}
Suppose all partial derivatives of $f\colon U\to\R$ exist on a ball around $\mathbf{a}$ and are continuous at $\mathbf{a}$. Then $f$ is differentiable at $\mathbf{a}$. In particular every $C^1$ function is differentiable, and the same holds for $\mathbf{f}\colon U\to\R^m$ by applying this to each component.
:::

::: proof
We give the proof for $n = 2$; for $n$ variables, change one coordinate at a time in the same way. Write $\mathbf{a} = (a, b)$ and let $(h, k)$ be small. Split the change in $f$ into a step in $x$ followed by a step in $y$:
$$
f(a+h, b+k) - f(a, b) = \bigl[f(a+h, b+k) - f(a, b+k)\bigr] + \bigl[f(a, b+k) - f(a, b)\bigr].
$$
By the mean value theorem applied to $x\mapsto f(x, b+k)$ and to $y\mapsto f(a, y)$, there are $\theta_1, \theta_2\in(0,1)$ with
$$
f(a+h, b+k) - f(a, b) = h\,f_x(a + \theta_1h,\ b+k) + k\,f_y(a,\ b+\theta_2k).
$$
Subtracting the candidate linear term $f_x(a,b)h + f_y(a,b)k$ and using $\abs h, \abs k \le \norm{(h,k)}$,
$$
\frac{\abs{f(a+h, b+k) - f(a,b) - f_x(a,b)h - f_y(a,b)k}}{\norm{(h,k)}} \le \abs{f_x(a+\theta_1h, b+k) - f_x(a,b)} + \abs{f_y(a, b+\theta_2k) - f_y(a,b)} .
$$
As $(h,k)\to(0,0)$, the points $(a+\theta_1h, b+k)$ and $(a, b+\theta_2k)$ tend to $(a,b)$, so by continuity of $f_x$ and $f_y$ at $(a,b)$ the right-hand side tends to $0$. This is [[#eq-differentiable]] with $A = \bigl(f_x(a,b)\ \ f_y(a,b)\bigr)$.
:::

So for functions built from polynomials, exponentials, trigonometric functions and so on, we compute the partial derivatives, observe that they are continuous, and conclude that $f$ is differentiable with $Df$ equal to the matrix of partials. The converse of [[#thm-c1-differentiable]] is false: [[#exr-3-9]] gives a differentiable function whose partial derivatives are not continuous.

::: example The derivative of the polar-coordinate map {#ex-polar-map}
Find the derivative of $\mathbf{F}(r, \theta) = (r\cos\theta, r\sin\theta)$ and use it to approximate $\mathbf{F}(1.02, 0.03)$.
::: solution
The components $x = r\cos\theta$ and $y = r\sin\theta$ have continuous partial derivatives everywhere, so $\mathbf{F}$ is differentiable by [[#thm-c1-differentiable]], with
$$
D\mathbf{F}(r, \theta) = \begin{pmatrix} \partial x/\partial r & \partial x/\partial\theta \\ \partial y/\partial r & \partial y/\partial\theta\end{pmatrix} = \begin{pmatrix}\cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta\end{pmatrix}.
$$
At $(r, \theta) = (1, 0)$, $\mathbf{F}(1, 0) = (1, 0)$ and $D\mathbf{F}(1, 0) = \begin{pmatrix}1 & 0\\ 0 & 1\end{pmatrix}$, so with $\mathbf{h} = (0.02, 0.03)$,
$$
\mathbf{F}(1.02, 0.03) \approx (1, 0) + \begin{pmatrix}1 & 0\\0&1\end{pmatrix}\begin{pmatrix}0.02\\0.03\end{pmatrix} = (1.02,\ 0.03).
$$
The exact value is $(1.02\cos 0.03,\ 1.02\sin 0.03) \approx (1.0195,\ 0.0306)$: the error, about $7.5\times10^{-4}$, is small compared with $\norm{\mathbf{h}} \approx 0.036$, as differentiability promises. Note that $\det D\mathbf{F} = r$; this factor reappears as the $r$ in $dA = r\,dr\,d\theta$ ([[multivariable/multiple-integrals]]).
:::
:::

## The chain rule

If $x$ and $y$ depend on $t$ and $z = f(x, y)$, how fast does $z$ change with $t$? A change in $t$ moves both $x$ and $y$, and each movement changes $z$. To first order the two effects add, and in matrix language the rule is simply that derivatives multiply.

::: theorem Chain rule {#thm-chain-rule}
Let $U\subseteq\R^n$ and $V\subseteq\R^m$ be open, let $\mathbf{f}\colon U\to V$ be differentiable at $\mathbf{a}$, and let $\mathbf{g}\colon V\to\R^p$ be differentiable at $\mathbf{b} = \mathbf{f}(\mathbf{a})$. Then $\mathbf{g}\circ\mathbf{f}$ is differentiable at $\mathbf{a}$ and
$$
D(\mathbf{g}\circ\mathbf{f})(\mathbf{a}) = D\mathbf{g}(\mathbf{f}(\mathbf{a}))\,D\mathbf{f}(\mathbf{a}),
$$ {#eq-chain-rule}
a product of a $p\times m$ and an $m\times n$ matrix.
:::

::: proof
Let $A = D\mathbf{f}(\mathbf{a})$ and $B = D\mathbf{g}(\mathbf{b})$. By differentiability,
$$
\mathbf{f}(\mathbf{a}+\mathbf{h}) = \mathbf{f}(\mathbf{a}) + A\mathbf{h} + \norm{\mathbf{h}}\,\boldsymbol\eps_1(\mathbf{h}), \qquad \mathbf{g}(\mathbf{b}+\mathbf{k}) = \mathbf{g}(\mathbf{b}) + B\mathbf{k} + \norm{\mathbf{k}}\,\boldsymbol\eps_2(\mathbf{k}),
$$
where $\boldsymbol\eps_1(\mathbf{h})\to\mathbf{0}$ and $\boldsymbol\eps_2(\mathbf{k})\to\mathbf{0}$; we set $\boldsymbol\eps_1(\mathbf{0}) = \mathbf{0}$ and $\boldsymbol\eps_2(\mathbf{0}) = \mathbf{0}$, so both are continuous at $\mathbf{0}$. Put $\mathbf{k}(\mathbf{h}) = \mathbf{f}(\mathbf{a}+\mathbf{h}) - \mathbf{f}(\mathbf{a}) = A\mathbf{h} + \norm{\mathbf{h}}\boldsymbol\eps_1(\mathbf{h})$. Then
$$
\mathbf{g}(\mathbf{f}(\mathbf{a}+\mathbf{h})) = \mathbf{g}(\mathbf{b} + \mathbf{k}(\mathbf{h})) = \mathbf{g}(\mathbf{b}) + BA\mathbf{h} + \norm{\mathbf{h}}\,B\boldsymbol\eps_1(\mathbf{h}) + \norm{\mathbf{k}(\mathbf{h})}\,\boldsymbol\eps_2(\mathbf{k}(\mathbf{h})).
$$
It remains to show that the last two terms, divided by $\norm{\mathbf{h}}$, tend to $\mathbf{0}$. The first is at most $\norm{B}\,\norm{\boldsymbol\eps_1(\mathbf{h})}\to0$. For the second, $\norm{\mathbf{k}(\mathbf{h})} \le \bigl(\norm{A} + \norm{\boldsymbol\eps_1(\mathbf{h})}\bigr)\norm{\mathbf{h}}$, so $\norm{\mathbf{k}(\mathbf{h})}/\norm{\mathbf{h}}$ stays bounded as $\mathbf{h}\to\mathbf{0}$; and $\mathbf{k}(\mathbf{h})\to\mathbf{0}$, so $\boldsymbol\eps_2(\mathbf{k}(\mathbf{h}))\to\mathbf{0}$ by continuity of $\boldsymbol\eps_2$ at $\mathbf{0}$ (this is where $\boldsymbol\eps_2(\mathbf{0}) = \mathbf{0}$ matters: $\mathbf{k}(\mathbf{h})$ may equal $\mathbf{0}$). Hence $\mathbf{g}\circ\mathbf{f}$ satisfies [[#eq-differentiable]] at $\mathbf{a}$ with matrix $BA$.
:::

Written out entry by entry, [[#eq-chain-rule]] gives the formulas used in practice. If $z = f(x, y)$ with $x = x(t)$ and $y = y(t)$, then
$$
\frac{dz}{dt} = \pdv{z}{x}\frac{dx}{dt} + \pdv{z}{y}\frac{dy}{dt},
$$ {#eq-chain-t}
and if $x = x(s, t)$ and $y = y(s, t)$, then
$$
\pdv{z}{s} = \pdv{z}{x}\pdv{x}{s} + \pdv{z}{y}\pdv{y}{s}, \qquad \pdv{z}{t} = \pdv{z}{x}\pdv{x}{t} + \pdv{z}{y}\pdv{y}{t} .
$$
A **tree diagram** organises such computations: write $z$ at the top, the intermediate variables $x, y$ below it, and the independent variables below each of those. Then $\partial z/\partial s$ is the sum, over all paths from $z$ down to $s$, of the products of the partial derivatives along each path. The hypotheses matter: the outer function must be differentiable, not merely possess partial derivatives ([[#exr-3-4]] shows what goes wrong otherwise).

::: example Chain rule along a curve {#ex-chain-t}
Let $z = x^2y + 3xy^4$, where $x = \sin 2t$ and $y = \cos t$. Find $dz/dt$ at $t = 0$.
::: solution
By [[#eq-chain-t]],
$$
\frac{dz}{dt} = (2xy + 3y^4)(2\cos 2t) + (x^2 + 12xy^3)(-\sin t).
$$
At $t = 0$ we have $x = 0$ and $y = 1$, so $dz/dt = (0 + 3)(2) + (0)(0) = 6$. As a check, substituting first gives $z(t) = \sin^2 2t\cos t + 3\sin 2t\cos^4 t$, whose derivative at $0$ is $0 + 3\cdot2\cdot1 = 6$.
:::
:::

::: example Partial derivatives in polar coordinates {#ex-chain-polar}
Let $u(x, y)$ be differentiable, and write $x = r\cos\theta$, $y = r\sin\theta$. Express $u_r$ and $u_\theta$ in terms of $u_x$ and $u_y$, and show that $u_x^2 + u_y^2 = u_r^2 + \dfrac{1}{r^2}u_\theta^2$ for $r > 0$.
::: solution
By the chain rule, with $x_r = \cos\theta$, $y_r = \sin\theta$, $x_\theta = -r\sin\theta$ and $y_\theta = r\cos\theta$,
$$
u_r = u_x\cos\theta + u_y\sin\theta, \qquad u_\theta = -u_x\,r\sin\theta + u_y\,r\cos\theta .
$$
In matrix form, $(u_r\ \ u_\theta) = (u_x\ \ u_y)\,D\mathbf{F}(r,\theta)$, with $D\mathbf{F}$ from [[#ex-polar-map]]. Now
$$
u_r^2 + \frac{u_\theta^2}{r^2} = (u_x\cos\theta + u_y\sin\theta)^2 + (-u_x\sin\theta + u_y\cos\theta)^2 = u_x^2 + u_y^2,
$$
because the cross terms $\pm2u_xu_y\sin\theta\cos\theta$ cancel and $\cos^2\theta + \sin^2\theta = 1$. The quantity $u_x^2 + u_y^2$ is the squared length of the gradient, and this identity is how it is computed in polar coordinates.
:::
:::

::: warning The ∂ notation hides what is held fixed
A partial derivative depends on which *other* variables are held constant, and the notation $\partial f/\partial x$ does not record them. Take $f = x + y$ and new variables $u = x$, $v = x + y$, so that $f = v$. Then $\partial f/\partial x = 1$ (holding $y$ fixed), but $\partial f/\partial u = 0$ (holding $v$ fixed), even though $u = x$. In thermodynamics, where the same quantity is differentiated with different variables held fixed, one writes $(\partial P/\partial V)_T$ to make the choice explicit.
:::

::: quiz
Let $z = f(x, y)$ be differentiable, with $x = t^2$ and $y = t^3$. What is $dz/dt$?
- [x] $2t\,f_x + 3t^2 f_y$
- [ ] $f_x + f_y$
- [ ] $6t^3 f_x f_y$
- [ ] $(2t + 3t^2)(f_x + f_y)$
::: solution
By [[#eq-chain-t]], each path through the tree contributes the product of its derivatives: $\frac{dz}{dt} = f_x\cdot\frac{d(t^2)}{dt} + f_y\cdot\frac{d(t^3)}{dt} = 2t\,f_x + 3t^2f_y$, with $f_x, f_y$ evaluated at $(t^2, t^3)$.
:::
:::

### Implicit differentiation

An equation $F(x, y) = 0$ often defines $y$ as a function of $x$ near a point, even when we cannot solve for it. If $y = g(x)$ is differentiable and $F(x, g(x)) = 0$ for all $x$ near $a$, differentiating with [[#eq-chain-t]] gives $F_x + F_y\,g'(x) = 0$, so
$$
\frac{dy}{dx} = -\frac{F_x}{F_y} \qquad\text{wherever } F_y \neq 0 .
$$ {#eq-implicit}
The following theorem guarantees that $g$ exists when $F_y \neq 0$.

::: theorem Implicit function theorem {#thm-implicit}
Let $F$ be of class $C^1$ near $(a, b)$, with $F(a, b) = 0$ and $F_y(a, b)\neq0$. Then there are open intervals $I\ni a$ and $J\ni b$ and a unique function $g\colon I\to J$ such that, for $(x, y)\in I\times J$, $F(x, y) = 0$ if and only if $y = g(x)$. Moreover $g$ is of class $C^1$ and $g'(x) = -F_x(x, g(x))/F_y(x, g(x))$. Similarly, if $F(x, y, z)$ is $C^1$ with $F = 0$ and $F_z \neq 0$ at a point, the equation $F = 0$ defines $z$ as a $C^1$ function of $(x, y)$ nearby, with
$$
\pdv{z}{x} = -\frac{F_x}{F_z}, \qquad \pdv{z}{y} = -\frac{F_y}{F_z} .
$$
:::

The proof (by a contraction or monotonicity argument, then a general version for systems of equations) belongs to analysis; see Spivak's *Calculus on Manifolds*, Chapter 2 (one standard route uses the contraction mapping theorem of [[real-analysis/metric-spaces]]). The formulas themselves are just the chain rule, as we derived above.

::: example The folium of Descartes {#ex-folium}
The curve $x^3 + y^3 = 6xy$ passes through $(3, 3)$. Find the slope of the tangent line there, and explain why the method fails at the origin.
::: solution
With $F(x, y) = x^3 + y^3 - 6xy$ we have $F_x = 3x^2 - 6y$ and $F_y = 3y^2 - 6x$. At $(3, 3)$, $F_x = 27 - 18 = 9$ and $F_y = 9 \neq 0$, so by [[#eq-implicit]] the slope is $-9/9 = -1$. At the origin $F_x = F_y = 0$, and [[#thm-implicit]] does not apply. Indeed the curve crosses itself there, with one branch tangent to each axis, so near the origin it is not the graph of any function $y = g(x)$.

For a surface, the same idea applied to $x^3 + y^3 + z^3 + 6xyz = 1$ gives $\dfrac{\partial z}{\partial x} = -\dfrac{F_x}{F_z} = -\dfrac{x^2 + 2yz}{z^2 + 2xy}$ wherever the denominator is non-zero.
:::
:::

::: history
Leonhard Euler and Alexis Clairaut used the equality of mixed partial derivatives freely in the 1730s and 1740s, in work on families of curves and on exact differential equations. The curly $\partial$ was introduced by Adrien-Marie Legendre in 1786, abandoned, and revived by Carl Gustav Jacob Jacobi in 1841. Hermann Amandus Schwarz gave a rigorous proof of the symmetry of mixed partials in 1873, and the counterexample of [[#ex-peano]] appeared in Giuseppe Peano's 1884 edition of Angelo Genocchi's calculus lectures. The definition of differentiability as the existence of a good linear approximation, which repairs the defects of partial derivatives, appears in Otto Stolz's textbook of 1893 and was championed by W. H. Young in *The Fundamental Theorems of the Differential Calculus* (1910); Maurice Fréchet later extended it to infinite-dimensional spaces, which is why the derivative is often called the Fréchet derivative.
:::

## Where this leads

The next chapter, [[multivariable/gradient]], uses differentiability to define derivatives in every direction, the gradient vector and tangent planes. Second derivatives and the symmetry of [[#thm-clairaut]] drive the classification of maxima, minima and saddle points in [[multivariable/extrema]]. The derivative matrix of a map between spaces of the same dimension has a determinant, the Jacobian, which measures how the map stretches area and volume ([[multivariable/change-of-variables]]). Partial derivatives are the raw material of partial differential equations such as Laplace's equation $u_{xx} + u_{yy} = 0$ ([[pde/laplace-equation]]), and the inverse and implicit function theorems, which say that a map is locally invertible where its derivative is, are proved in courses on analysis, for instance from the contraction mapping theorem of [[real-analysis/metric-spaces]].

::: summary
- Limits in $\R^n$ use the norm: $0 < \norm{\mathbf{x} - \mathbf{a}} < \delta \implies \abs{f(\mathbf{x}) - L} < \eps$ ([[#def-limit-2d]]). Different limits along two paths prove that a limit does not exist; lines alone are never enough to prove that one does.
- To prove a limit exists, bound $\abs{f - L}$ by a quantity that tends to $0$ with $\norm{\mathbf{x} - \mathbf{a}}$, independently of direction.
- Partial derivatives are one-variable derivatives with the other variables frozen; their existence does not even imply continuity.
- If the mixed partials are continuous then $f_{xy} = f_{yx}$ ([[#thm-clairaut]]); without continuity they can differ.
- $\mathbf{f}$ is differentiable at $\mathbf{a}$ if $\mathbf{f}(\mathbf{a}+\mathbf{h}) = \mathbf{f}(\mathbf{a}) + D\mathbf{f}(\mathbf{a})\mathbf{h} + o(\norm{\mathbf{h}})$; then $\mathbf{f}$ is continuous and $D\mathbf{f}(\mathbf{a})$ is the matrix of partial derivatives.
- Continuous partial derivatives imply differentiability ([[#thm-c1-differentiable]]), which is how differentiability is checked in practice.
- Chain rule: $D(\mathbf{g}\circ\mathbf{f}) = D\mathbf{g}\,D\mathbf{f}$; in coordinates, sum over all paths in the tree diagram. Implicit differentiation gives $dy/dx = -F_x/F_y$.
:::

## Exercises

::: exercise A partial derivative {level=1 check="4*e^2"}
Let $f(x, y) = x^2e^{xy}$. Find $f_x(1, 2)$.
::: solution
Holding $y$ fixed and using the product rule, $f_x = 2xe^{xy} + x^2\cdot ye^{xy} = (2x + x^2y)e^{xy}$. At $(1, 2)$: $f_x(1, 2) = (2 + 2)e^2 = 4e^2$. (Also $f_y = x^3e^{xy}$, so $f_y(1,2) = e^2$.)
:::
:::

::: exercise Domain and level curves {level=1}
Find the domain of $f(x, y) = \ln(y - x^2)$ and describe its level curves.
::: solution
The logarithm needs $y - x^2 > 0$, so the domain is the region strictly above the parabola $y = x^2$. The level curve $f = c$ is $y - x^2 = e^c$, that is the parabola $y = x^2 + e^c$. As $c$ runs through $\R$, these are all the upward translates of $y = x^2$; they fill the domain, and they get closer together as $c\to-\infty$, near the boundary parabola, where $f\to-\infty$.
:::
:::

::: exercise A limit by conjugates {level=1 check="2"}
Find $\displaystyle\lim_{(x,y)\to(0,0)}\frac{x^2+y^2}{\sqrt{x^2+y^2+1} - 1}$.
::: solution
Multiply numerator and denominator by $\sqrt{x^2+y^2+1}+1$:
$$
\frac{(x^2+y^2)\bigl(\sqrt{x^2+y^2+1}+1\bigr)}{(x^2+y^2+1) - 1} = \sqrt{x^2+y^2+1} + 1 \qquad ((x,y)\neq(0,0)).
$$
This is continuous at the origin with value $2$, so the limit is $2$.
:::
:::

::: exercise Another path test {level=2}
Let $f(x, y) = \dfrac{xy^2}{x^2 + y^4}$ for $(x, y)\neq(0,0)$ and $f(0,0) = 0$. (a) Show that $f$ has a limit $0$ along every line through the origin, but no limit at the origin. (b) Show that for each fixed $(u, v)\neq(0,0)$ the function $t\mapsto f(tu, tv)$ is differentiable at $t = 0$: $f$ has a derivative along every line, yet it is not even continuous. (c) Let $\boldsymbol\gamma(t) = (t^2, t)$. Show that $f\circ\boldsymbol\gamma$ is not differentiable at $t = 0$, although $\boldsymbol\gamma$ is differentiable and $f_x(0,0) = f_y(0,0) = 0$. Why does this not contradict [[#thm-chain-rule]]?
::: hint
For (a) try the curve $x = y^2$.
:::
::: solution
(a) On the $y$-axis $f = 0$. Along $y = mx$ with $x \neq 0$: $f = \dfrac{m^2x^3}{x^2 + m^4x^4} = \dfrac{m^2x}{1 + m^4x^2}\to0$. Along $x = y^2$ with $y\neq0$: $f = \dfrac{y^4}{y^4 + y^4} = \dfrac12$. Two different limits, so by [[#thm-path-limits]] there is no limit at the origin.

(b) If $u = 0$, $f(0, tv) = 0$ for all $t$, with derivative $0$. If $u\neq0$, then for $t\neq0$
$$
\frac{f(tu, tv) - f(0,0)}{t} = \frac{t^3uv^2}{t\,(t^2u^2 + t^4v^4)} = \frac{uv^2}{u^2 + t^2v^4} \longrightarrow \frac{v^2}{u}\qquad(t\to0).
$$
So every such derivative exists, although $f$ is discontinuous at the origin.

(c) For $t\neq0$, $f(t^2, t) = \dfrac{t^4}{t^4 + t^4} = \dfrac12$, while $f(\boldsymbol\gamma(0)) = f(0,0) = 0$. So $f\circ\boldsymbol\gamma$ is not even continuous at $0$, let alone differentiable, whereas the formula [[#eq-chain-t]] would predict the derivative $f_x(0,0)\cdot0 + f_y(0,0)\cdot1 = 0$. There is no contradiction, because the chain rule assumes $f$ is *differentiable* at $\boldsymbol\gamma(0)$, and by (a) and [[#thm-diff-partials]] it is not.
:::
:::

::: exercise Checking Clairaut {level=2 check="4*e"}
Let $f(x, y) = e^{xy^2}$. Compute $f_{xy}$ and $f_{yx}$, and give the value of $f_{xy}(1,1)$.
::: solution
$f_x = y^2e^{xy^2}$ and $f_y = 2xye^{xy^2}$. Then
$$
f_{xy} = \pdv{}{y}\bigl(y^2e^{xy^2}\bigr) = 2ye^{xy^2} + y^2\cdot2xy\,e^{xy^2} = (2y + 2xy^3)e^{xy^2},
$$
$$
f_{yx} = \pdv{}{x}\bigl(2xye^{xy^2}\bigr) = 2ye^{xy^2} + 2xy\cdot y^2e^{xy^2} = (2y + 2xy^3)e^{xy^2},
$$
equal, as [[#thm-clairaut]] predicts for this $C^2$ function. At $(1, 1)$ the value is $4e$.
:::
:::

::: exercise A tree diagram {level=2 check="2"}
Let $w = x^2 + y^2 + z^2$ with $x = st$, $y = s\cos t$, $z = s\sin t$. Use the chain rule to find $\partial w/\partial s$, and evaluate it at $(s, t) = (1, 0)$.
::: solution
$$
\pdv{w}{s} = 2x\,t + 2y\cos t + 2z\sin t = 2st^2 + 2s\cos^2t + 2s\sin^2 t = 2st^2 + 2s .
$$
At $(1, 0)$ this is $2$. Check: substituting first, $w = s^2t^2 + s^2$, and $\partial w/\partial s = 2st^2 + 2s$.
:::
:::

::: exercise Implicit differentiation {level=2 check="-3/4"}
The curve $x^2 + xy + y^3 = 3$ passes through $(1, 1)$. Find $dy/dx$ there.
::: solution
With $F = x^2 + xy + y^3 - 3$: $F_x = 2x + y = 3$ and $F_y = x + 3y^2 = 4 \neq 0$ at $(1,1)$. By [[#eq-implicit]], $dy/dx = -3/4$.
:::
:::

::: exercise The ideal gas {level=2 check="-1"}
For a fixed amount of ideal gas, $PV = nRT$ with $n$ and $R$ constant, so each of $P, V, T$ is a function of the other two. Compute the product $\left(\pdv{P}{V}\right)_T\left(\pdv{V}{T}\right)_P\left(\pdv{T}{P}\right)_V$.
::: solution
From $P = nRT/V$, $(\partial P/\partial V)_T = -nRT/V^2$. From $V = nRT/P$, $(\partial V/\partial T)_P = nR/P$. From $T = PV/(nR)$, $(\partial T/\partial P)_V = V/(nR)$. The product is
$$
-\frac{nRT}{V^2}\cdot\frac{nR}{P}\cdot\frac{V}{nR} = -\frac{nRT}{PV} = -1 .
$$
The answer is $-1$, not $1$: partial derivatives cannot be "cancelled" like fractions, because each is taken with a different variable held fixed.
:::
:::

::: exercise Differentiable without continuous partials {level=3}
Let $f(x, y) = (x^2 + y^2)\sin\dfrac{1}{\sqrt{x^2+y^2}}$ for $(x,y)\neq(0,0)$ and $f(0,0) = 0$. Prove that $f$ is differentiable at the origin with $Df(0,0) = (0\ \ 0)$, but that $f_x$ is not continuous there.
::: solution
*Differentiability.* With $\mathbf{h} = (h, k)\neq\mathbf{0}$, $\abs{f(h, k) - 0 - 0}/\norm{\mathbf{h}} = \norm{\mathbf{h}}\,\abs{\sin(1/\norm{\mathbf{h}})} \le \norm{\mathbf{h}} \to 0$. So [[#eq-differentiable]] holds with $A = (0\ \ 0)$.

*Discontinuity of $f_x$.* For $(x, y)\neq(0,0)$, with $r = \sqrt{x^2+y^2}$ and $\partial r/\partial x = x/r$,
$$
f_x = 2x\sin\frac1r + r^2\cos\frac1r\cdot\left(-\frac{1}{r^2}\right)\frac{x}{r} = 2x\sin\frac1r - \frac{x}{r}\cos\frac1r .
$$
On the positive $x$-axis ($y = 0$, $x > 0$) this is $2x\sin\frac1x - \cos\frac1x$. The first term tends to $0$, but $\cos(1/x)$ takes the value $1$ at $x = 1/(2k\pi)$ and $-1$ at $x = 1/((2k+1)\pi)$, for every positive integer $k$. So $f_x$ takes values near $-1$ and near $1$ arbitrarily close to the origin, and has no limit there; in particular it is not continuous at $(0,0)$, where $f_x(0,0) = 0$. Thus the converse of [[#thm-c1-differentiable]] fails.
:::
:::

::: exercise Laplace's equation in polar coordinates {level=3}
Let $u(x, y)$ be of class $C^2$ and $x = r\cos\theta$, $y = r\sin\theta$ with $r > 0$. Prove that
$$
u_{xx} + u_{yy} = u_{rr} + \frac1r u_r + \frac{1}{r^2}u_{\theta\theta} .
$$
::: hint
Start from $u_r$ and $u_\theta$ in [[#ex-chain-polar]] and differentiate again with the chain rule, remembering that $u_x$ and $u_y$ are themselves functions of $x$ and $y$. Use $u_{xy} = u_{yx}$.
:::
::: solution
From [[#ex-chain-polar]], $u_r = \cos\theta\,u_x + \sin\theta\,u_y$. Differentiating with respect to $r$ (with $\theta$ fixed), and applying the chain rule to $u_x$ and $u_y$ just as to $u$,
$$
u_{rr} = \cos\theta\,(\cos\theta\,u_{xx} + \sin\theta\,u_{xy}) + \sin\theta\,(\cos\theta\,u_{yx} + \sin\theta\,u_{yy}) = \cos^2\theta\,u_{xx} + 2\sin\theta\cos\theta\,u_{xy} + \sin^2\theta\,u_{yy},
$$
using $u_{xy} = u_{yx}$ ([[#thm-clairaut]]). Next $u_\theta = -r\sin\theta\,u_x + r\cos\theta\,u_y$. Differentiating with respect to $\theta$ by the product rule,
$$
u_{\theta\theta} = -r\cos\theta\,u_x - r\sin\theta\,u_y - r\sin\theta\,(-r\sin\theta\,u_{xx} + r\cos\theta\,u_{xy}) + r\cos\theta\,(-r\sin\theta\,u_{yx} + r\cos\theta\,u_{yy}),
$$
so
$$
\frac{1}{r^2}u_{\theta\theta} = \sin^2\theta\,u_{xx} - 2\sin\theta\cos\theta\,u_{xy} + \cos^2\theta\,u_{yy} - \frac1r\bigl(\cos\theta\,u_x + \sin\theta\,u_y\bigr).
$$
The bracket in the last term is $u_r$. Adding $u_{rr}$ and $\frac1r u_r$, the mixed terms cancel, the $u_r$ terms cancel, and $\cos^2\theta + \sin^2\theta = 1$ leaves $u_{xx} + u_{yy}$.
:::
:::

::: exercise Euler's theorem on homogeneous functions {level=3}
A differentiable function $f\colon\R^2\setminus\set{\mathbf{0}}\to\R$ is **homogeneous of degree** $k$ if $f(tx, ty) = t^kf(x, y)$ for all $t > 0$ and all $(x,y)\neq(0,0)$. Prove that then
$$
x\,f_x(x, y) + y\,f_y(x, y) = k\,f(x, y).
$$
Check the identity for $f(x, y) = x^2y + y^3$.
::: hint
Fix $(x, y)$ and differentiate both sides of $f(tx, ty) = t^kf(x,y)$ with respect to $t$, then set $t = 1$.
:::
::: solution
Fix $(x, y)\neq(0,0)$ and let $\varphi(t) = f(tx, ty)$ for $t > 0$. By the chain rule [[#eq-chain-t]], with inner functions $t\mapsto tx$ and $t\mapsto ty$,
$$
\varphi'(t) = f_x(tx, ty)\,x + f_y(tx, ty)\,y .
$$
On the other hand $\varphi(t) = t^kf(x, y)$, so $\varphi'(t) = kt^{k-1}f(x, y)$. Setting $t = 1$ gives $xf_x(x,y) + yf_y(x,y) = kf(x,y)$.

For $f = x^2y + y^3$ (degree $3$): $xf_x + yf_y = x\cdot2xy + y\,(x^2 + 3y^2) = 3x^2y + 3y^3 = 3f$.
:::
:::
