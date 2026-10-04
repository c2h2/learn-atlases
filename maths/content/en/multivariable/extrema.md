An open-topped box must hold $4$ cubic metres. Which dimensions use the least material? A satellite dish must point at the highest point of a curve where a plane cuts a cylinder; where is it? A firm with a fixed budget wants the largest output. Optimisation problems like these are among the main reasons for doing calculus at all, and in several variables they come in two flavours: **free** problems, where we search a whole region for the largest or smallest value of a function, and **constrained** problems, where the variables must also satisfy an equation such as "volume $= 4$".

For free problems the strategy is the familiar one from one variable, upgraded: the first derivative (now the gradient) finds the candidates, and the second derivative (now a symmetric matrix, the **Hessian**) sorts them into maxima, minima and a genuinely new kind of point, the **saddle**. For constrained problems we use the gradient's geometric meaning from [[multivariable/gradient]] to derive the method of **Lagrange multipliers**. Linear algebra plays a central role: classifying critical points comes down to the signs of eigenvalues ([[linear-algebra/eigenvalues]]).

## Local and global extrema

::: definition Extrema {#def-local-extremum}
Let $f$ be a real-valued function on a set $D \subseteq \R^n$ and $\mathbf{a} \in D$. Then $f$ has a **local maximum** at $\mathbf{a}$ if there is $\delta > 0$ such that $f(\mathbf{x}) \le f(\mathbf{a})$ for all $\mathbf{x} \in D$ with $\norm{\mathbf{x} - \mathbf{a}} < \delta$, and a **local minimum** if instead $f(\mathbf{x}) \ge f(\mathbf{a})$ for all such $\mathbf{x}$. It is **strict** if the inequality is strict for $\mathbf{x} \neq \mathbf{a}$. If the inequality holds for *all* $\mathbf{x} \in D$, the maximum or minimum is **global** (or **absolute**). Maxima and minima are collectively called **extrema**.
:::

The first-derivative test of one-variable calculus — at an interior extremum the derivative vanishes — carries over directly.

::: theorem Fermat's theorem {#thm-fermat}
If $f$ has a local extremum at an interior point $\mathbf{a}$ of $D$, and the partial derivatives of $f$ exist at $\mathbf{a}$, then $\nabla f(\mathbf{a}) = \mathbf{0}$.
:::

::: proof
Fix $i$ and let $g(t) = f(\mathbf{a} + t\mathbf{e}_i)$, defined for small $\abs{t}$ because $\mathbf{a}$ is interior. If $f$ has a local maximum at $\mathbf{a}$, then $g(t) \le g(0)$ for all small $t$, so $g$ has a local maximum at $t = 0$; the same holds with "minimum". By the one-variable Fermat theorem ([[calculus-1/mean-value-theorem]]), $g'(0) = 0$. But $g'(0)$ is the partial derivative $\pdv{f}{x_i}(\mathbf{a})$. As $i$ was arbitrary, all partial derivatives vanish.
:::

When $f$ is differentiable, $\nabla f(\mathbf{a}) = \mathbf{0}$ says that the tangent plane to the graph is horizontal, which is exactly what we expect at the top of a hill or the bottom of a bowl.

::: definition Critical points and saddle points {#def-critical}
A point $\mathbf{a}$ where $\nabla f(\mathbf{a}) = \mathbf{0}$ is a **critical point** (or **stationary point**) of $f$. A critical point that is neither a local maximum nor a local minimum is a **saddle point**: every neighbourhood of $\mathbf{a}$ contains points where $f > f(\mathbf{a})$ and points where $f < f(\mathbf{a})$.
:::

So the candidates for interior extrema of a differentiable function are its critical points (and, if $f$ is not differentiable everywhere, the points where it fails to be). The converse fails, just as for $x^3$ in one variable. The standard examples are

$$
x^2 + y^2 \;\;(\text{minimum at } \mathbf{0}), \qquad -x^2 - y^2 \;\;(\text{maximum}), \qquad x^2 - y^2 \;\;(\text{saddle}).
$$

All three have $\nabla f(\mathbf{0}) = \mathbf{0}$. The third increases along the $x$-axis and decreases along the $y$-axis: its graph is the saddle of [[multivariable/vectors-geometry]], and its origin is a maximum for walkers going one way and a minimum for walkers going the other.

::: quiz
A differentiable function has $\nabla f(\mathbf{a}) = \mathbf{0}$ at an interior point $\mathbf{a}$. What can you conclude?
- [ ] $f$ has a local minimum or a local maximum at $\mathbf{a}$
- [ ] $f$ has a saddle point at $\mathbf{a}$
- [x] Nothing more without further information: $\mathbf{a}$ could be a maximum, a minimum or a saddle point
- [ ] $f$ is constant near $\mathbf{a}$
::: solution
Fermat's theorem only says that extrema occur at critical points, not that critical points are extrema. The examples $x^2+y^2$, $-x^2-y^2$ and $x^2-y^2$ show that all three behaviours occur at a critical point, and none of these functions is constant.
:::
:::

## The Hessian and second-order Taylor expansion

To decide what happens at a critical point we look one order deeper, at the second derivatives.

::: definition Hessian matrix {#def-hessian}
If the second partial derivatives of $f\colon U\to\R$ exist at $\mathbf{a}$, the **Hessian** of $f$ at $\mathbf{a}$ is the $n\times n$ matrix

$$
Hf(\mathbf{a}) = \left(\frac{\partial^2 f}{\partial x_i\,\partial x_j}(\mathbf{a})\right)_{i,j=1}^n, \qquad\text{for } n = 2:\quad Hf = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy}\end{pmatrix}.
$$

If $f$ is $C^2$ (its second partial derivatives exist and are continuous), then $Hf(\mathbf{a})$ is symmetric by Clairaut's theorem ([[multivariable/partial-derivatives#thm-clairaut]]).
:::

The Hessian is the second derivative of $f$ in the same sense that the gradient is the first: it controls the quadratic term of $f$ near $\mathbf{a}$.

::: theorem Second-order Taylor formula {#thm-taylor2}
Let $f$ be $C^2$ on an open set $U$ containing the segment from $\mathbf{a}$ to $\mathbf{a} + \mathbf{h}$. Then for some $\mathbf{c}$ on that segment,

$$
f(\mathbf{a} + \mathbf{h}) = f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h} + \tfrac12\,\mathbf{h}\T Hf(\mathbf{c})\,\mathbf{h} .
$$

Consequently, if $f$ is $C^2$ near $\mathbf{a}$,

$$
f(\mathbf{a} + \mathbf{h}) = f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h} + \tfrac12\,\mathbf{h}\T Hf(\mathbf{a})\,\mathbf{h} + R(\mathbf{h}), \qquad \frac{R(\mathbf{h})}{\norm{\mathbf{h}}^2}\to 0 \text{ as } \mathbf{h}\to\mathbf{0}.
$$ {#eq-taylor2}
:::

::: proof
Let $g(t) = f(\mathbf{a} + t\mathbf{h})$ for $t$ in an open interval containing $[0,1]$. By the chain rule, $g'(t) = \sum_i f_{x_i}(\mathbf{a} + t\mathbf{h})\,h_i$, and applying the chain rule again to each continuously differentiable function $f_{x_i}$,

$$
g''(t) = \sum_{i}\sum_{j} f_{x_ix_j}(\mathbf{a} + t\mathbf{h})\,h_ih_j = \mathbf{h}\T Hf(\mathbf{a} + t\mathbf{h})\,\mathbf{h}.
$$

Taylor's theorem in one variable with the Lagrange form of the remainder ([[calculus-2/taylor-series]]) gives $\tau\in(0,1)$ with $g(1) = g(0) + g'(0) + \tfrac12 g''(\tau)$; with $\mathbf{c} = \mathbf{a} + \tau\mathbf{h}$ this is the first formula.

For the second, $R(\mathbf{h}) = \tfrac12\,\mathbf{h}\T\bigl(Hf(\mathbf{c}) - Hf(\mathbf{a})\bigr)\mathbf{h}$. For any matrix $A = (a_{ij})$ we have $\abs{\mathbf{h}\T A\mathbf{h}} = \abs{\sum a_{ij}h_ih_j} \le \bigl(\sum\abs{a_{ij}}\bigr)\norm{\mathbf{h}}^2$, because $\abs{h_i} \le \norm{\mathbf{h}}$. So

$$
\frac{\abs{R(\mathbf{h})}}{\norm{\mathbf{h}}^2} \le \frac12\sum_{i,j}\abs{f_{x_ix_j}(\mathbf{c}) - f_{x_ix_j}(\mathbf{a})} \longrightarrow 0,
$$

since $\mathbf{c}\to\mathbf{a}$ as $\mathbf{h}\to\mathbf{0}$ and the second partial derivatives are continuous.
:::

The polynomial $f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h} + \tfrac12\mathbf{h}\T Hf(\mathbf{a})\mathbf{h}$ is the **second-order Taylor polynomial** of $f$ at $\mathbf{a}$. For $n = 2$ and $\mathbf{h} = (h, k)$ it reads $f + f_xh + f_yk + \tfrac12(f_{xx}h^2 + 2f_{xy}hk + f_{yy}k^2)$.

::: example A second-order Taylor polynomial {#ex-taylor2}
Find the second-order Taylor polynomial of $f(x,y) = e^x\ln(1+y)$ at the origin.
::: solution
We need $f$ and its first and second partial derivatives at $(0,0)$:

$$
\begin{aligned}
f &= e^x\ln(1+y) = 0, & f_x &= e^x\ln(1+y) = 0, & f_y &= \frac{e^x}{1+y} = 1,\\
f_{xx} &= e^x\ln(1+y) = 0, & f_{xy} &= \frac{e^x}{1+y} = 1, & f_{yy} &= -\frac{e^x}{(1+y)^2} = -1 .
\end{aligned}
$$

So the polynomial is $0 + 0\cdot x + 1\cdot y + \tfrac12\bigl(0\cdot x^2 + 2\cdot 1\cdot xy + (-1)\,y^2\bigr) = y + xy - \tfrac12y^2$. As a check, multiplying the one-variable series $e^x = 1 + x + \dots$ and $\ln(1+y) = y - \tfrac12y^2 + \dots$ and keeping terms of total degree at most $2$ gives the same answer.
:::
:::

## The second derivative test

At a critical point the linear term of [[#eq-taylor2]] vanishes, and

$$
f(\mathbf{a} + \mathbf{h}) - f(\mathbf{a}) = \tfrac12\,\mathbf{h}\T Hf(\mathbf{a})\,\mathbf{h} + R(\mathbf{h}).
$$

Near $\mathbf{a}$ the quadratic term dominates $R$ — *if* it is not too small. So everything depends on the sign of the **quadratic form** $Q(\mathbf{h}) = \mathbf{h}\T A\mathbf{h}$ of the symmetric matrix $A = Hf(\mathbf{a})$.

::: definition Definiteness {#def-definite}
A symmetric matrix $A$ (or its quadratic form $Q(\mathbf{h}) = \mathbf{h}\T A\mathbf{h}$) is **positive definite** if $Q(\mathbf{h}) > 0$ for all $\mathbf{h}\ne\mathbf{0}$, **negative definite** if $Q(\mathbf{h}) < 0$ for all $\mathbf{h} \ne\mathbf{0}$, and **indefinite** if $Q$ takes both positive and negative values. It is **positive semidefinite** if $Q(\mathbf{h}) \ge 0$ for all $\mathbf{h}$, and similarly negative semidefinite.
:::

By the spectral theorem ([[linear-algebra/spectral-theorem]]), a symmetric $A$ has an orthonormal basis of eigenvectors $\mathbf{q}_1, \dots, \mathbf{q}_n$ with real eigenvalues $\lambda_1, \dots, \lambda_n$, and writing $\mathbf{h} = \sum c_i\mathbf{q}_i$ gives $Q(\mathbf{h}) = \sum\lambda_ic_i^2$. Hence $A$ is positive definite exactly when all its eigenvalues are positive, negative definite when all are negative, and indefinite when it has eigenvalues of both signs. We also need a quantitative version of definiteness.

::: lemma Positive definite forms are bounded below {#lem-definite}
If $A$ is positive definite, there is $m > 0$ such that $\mathbf{h}\T A\mathbf{h} \ge m\norm{\mathbf{h}}^2$ for all $\mathbf{h}$.
:::

::: proof
With the notation above, $Q(\mathbf{h}) = \sum\lambda_ic_i^2 \ge (\min_i\lambda_i)\sum c_i^2 = m\norm{\mathbf{h}}^2$, where $m = \min_i \lambda_i > 0$ and $\sum c_i^2 = \norm{\mathbf{h}}^2$ because the basis is orthonormal.
:::

::: theorem Second derivative test {#thm-second-derivative-test}
Let $f$ be $C^2$ near a critical point $\mathbf{a}$, and let $H = Hf(\mathbf{a})$.

1. If $H$ is positive definite, $f$ has a strict local minimum at $\mathbf{a}$.
2. If $H$ is negative definite, $f$ has a strict local maximum at $\mathbf{a}$.
3. If $H$ is indefinite, $\mathbf{a}$ is a saddle point.
4. If $H$ is only semidefinite (some eigenvalue is $0$ and the others share a sign), the test is inconclusive.
:::

::: proof
(1) Take $m$ as in [[#lem-definite]]. By [[#eq-taylor2]] there is $\delta > 0$ such that $\abs{R(\mathbf{h})} \le \tfrac{m}{4}\norm{\mathbf{h}}^2$ whenever $\norm{\mathbf{h}} < \delta$. For $0 < \norm{\mathbf{h}} < \delta$,

$$
f(\mathbf{a}+\mathbf{h}) - f(\mathbf{a}) = \tfrac12\mathbf{h}\T H\mathbf{h} + R(\mathbf{h}) \ge \tfrac{m}{2}\norm{\mathbf{h}}^2 - \tfrac{m}{4}\norm{\mathbf{h}}^2 = \tfrac{m}{4}\norm{\mathbf{h}}^2 > 0 .
$$

(2) Apply (1) to $-f$, whose Hessian $-H$ is positive definite.

(3) Choose unit vectors $\mathbf{v}, \mathbf{w}$ with $\mathbf{v}\T H\mathbf{v} = p > 0$ and $\mathbf{w}\T H\mathbf{w} = -q < 0$. Along the line through $\mathbf{a}$ in the direction $\mathbf{v}$,

$$
f(\mathbf{a} + t\mathbf{v}) - f(\mathbf{a}) = \tfrac12 pt^2 + R(t\mathbf{v}) = t^2\left(\tfrac{p}{2} + \frac{R(t\mathbf{v})}{t^2}\right),
$$

and $R(t\mathbf{v})/t^2 = R(t\mathbf{v})/\norm{t\mathbf{v}}^2 \to 0$, so this is positive for all small $t \ne 0$. In the same way $f(\mathbf{a} + t\mathbf{w}) < f(\mathbf{a})$ for small $t \ne 0$. So every neighbourhood of $\mathbf{a}$ contains points with larger and with smaller values: a saddle.

(4) The examples in [[#ex-degenerate]] below have the same semidefinite Hessian at a critical point but different behaviour there.
:::

For functions of two variables definiteness can be read off from the determinant and one entry.

::: corollary The two-variable test {#cor-2x2}
Let $f(x,y)$ be $C^2$ near a critical point $\mathbf{a}$, and let $D = f_{xx}f_{yy} - f_{xy}^2$, evaluated at $\mathbf{a}$.

- If $D > 0$ and $f_{xx}(\mathbf{a}) > 0$: local minimum.
- If $D > 0$ and $f_{xx}(\mathbf{a}) < 0$: local maximum.
- If $D < 0$: saddle point.
- If $D = 0$: no conclusion.
:::

::: proof
$D = \det H = \lambda_1\lambda_2$ and $f_{xx} + f_{yy} = \tr H = \lambda_1 + \lambda_2$, where $\lambda_1, \lambda_2$ are the eigenvalues of $H$. If $D < 0$ the eigenvalues have opposite signs, so $H$ is indefinite. If $D > 0$ they have the same sign; moreover $f_{xx}f_{yy} > f_{xy}^2 \ge 0$, so $f_{xx}$ and $f_{yy}$ have the same sign, which is therefore the sign of the trace and of both eigenvalues. Now apply [[#thm-second-derivative-test]]. If $D = 0$, an eigenvalue is $0$ and we are in case (4).
:::

::: example Maximum, minimum and two saddles {#ex-four-critical}
Find and classify the critical points of $f(x,y) = x^3 - 3x + y^3 - 3y$.
::: solution
$f_x = 3x^2 - 3$ and $f_y = 3y^2 - 3$ vanish exactly when $x = \pm1$ and $y = \pm1$, giving four critical points. The second derivatives are $f_{xx} = 6x$, $f_{yy} = 6y$, $f_{xy} = 0$, so $D = 36xy$.

| point | $D$ | $f_{xx}$ | type | value |
|---|---|---|---|---|
| $(1,1)$ | $36$ | $6$ | local minimum | $-4$ |
| $(-1,-1)$ | $36$ | $-6$ | local maximum | $4$ |
| $(1,-1)$ | $-36$ | $6$ | saddle | $0$ |
| $(-1,1)$ | $-36$ | $-6$ | saddle | $0$ |

Neither extremum is global: $f(x, 0) = x^3 - 3x$ takes all real values. In the figure the minimum and maximum sit at opposite corners of the square, with saddles in between.
:::
:::

::: widget surface
f: x^3 - 3x + y^3 - 3y
x: -2.2, 2.2
y: -2.2, 2.2
contours: true
caption: The graph of $x^3 - 3x + y^3 - 3y$ from [[#ex-four-critical]]. Find the bowl at $(1,1)$, the cap at $(-1,-1)$ and the two saddles. Near a saddle the contours form an X: the level curve through a saddle point crosses itself, while near an extremum the contours are small closed loops.
:::

::: example When the test is inconclusive {#ex-degenerate}
Show that $f_1 = x^2 + y^4$, $f_2 = x^2 - y^4$ and $f_3 = x^2 + y^3$ all have a critical point at the origin with the same Hessian, but that the origin is a minimum of $f_1$ and a saddle point of $f_2$ and $f_3$.
::: solution
Each function has gradient $\mathbf{0}$ at the origin and the Hessian there is

$$
\begin{pmatrix} 2 & 0 \\ 0 & 0\end{pmatrix},
$$

which is positive semidefinite with $D = 0$, so the test says nothing. Directly: $f_1 \ge 0 = f_1(0,0)$ everywhere, so the origin is a (global) minimum. For $f_2$ and $f_3$, along the $x$-axis the values $x^2$ are positive, while along the $y$-axis the values $-y^4$ (for $f_2$) and $y^3$ with $y < 0$ (for $f_3$) are negative, so the origin is a saddle point of both. The quadratic term $x^2$ cannot see what happens in the $y$-direction, where everything is decided by higher-order terms.
:::
:::

::: widget surface
f: x^2 + p*y^4
x: -1.5, 1.5
y: -1.5, 1.5
sliders: p=1:-1:1:0.1
contours: true
caption: The surfaces $z = x^2 + p\,y^4$ all have the same Hessian at the origin. Move $p$: for $p > 0$ the origin is a minimum, for $p < 0$ a saddle, and for $p = 0$ the surface is a trough with a whole line of minima. When $D = 0$, the second derivatives cannot tell these apart.
:::

::: quiz
At a critical point of a $C^2$ function, $f_{xx} = 2$, $f_{yy} = 8$ and $f_{xy} = 4$. What does the second derivative test say?
- [ ] Local minimum, because $f_{xx} > 0$ and $f_{yy} > 0$
- [ ] Saddle point, because $f_{xy} \ne 0$
- [x] Nothing: $D = 0$
- [ ] Local maximum
::: solution
$D = f_{xx}f_{yy} - f_{xy}^2 = 16 - 16 = 0$, so the test is inconclusive. Positive $f_{xx}$ and $f_{yy}$ are not enough: the mixed term matters, and here the quadratic form $2h^2 + 8hk + 8k^2 = 2(h + 2k)^2$ vanishes along the direction $(2,-1)$, where higher-order terms decide.
:::
:::

::: warning Do not test only along the axes
A critical point can look like a minimum along every coordinate axis — even along every line through it — and still be a saddle. The function $f(x,y) = (y - x^2)(y - 2x^2)$ has a strict local minimum at the origin along every straight line through it, yet it is negative between the parabolas $y = x^2$ and $y = 2x^2$, which come arbitrarily close to the origin ([[#exr-peano]]). Only the second derivative test, or a direct argument covering *all* nearby points, decides.
:::

## Global extrema on closed bounded sets

A function need not have any global extremum — $x + y$ on $\R^2$ has none — but on the right kind of domain it must.

::: theorem Extreme value theorem {#thm-evt}
If $D\subseteq\R^n$ is closed and bounded and $f\colon D\to\R$ is continuous, then $f$ attains a global maximum and a global minimum on $D$.
:::

Here **closed** means $D$ contains all its boundary points, and **bounded** means it lies inside some ball. The proof uses the completeness of the real numbers and is given in [[real-analysis/metric-spaces]] (closed bounded subsets of $\R^n$ are exactly the compact ones; see [[topology/compactness]]). The theorem turns the search for global extrema into a finite procedure. If $f$ is differentiable in the interior of $D$, a global extremum occurs either at an interior critical point (by [[#thm-fermat]]) or on the boundary. So:

1. find the critical points of $f$ in the interior of $D$;
2. find the extreme values of $f$ on the boundary of $D$ (by parametrising the boundary, or by Lagrange multipliers);
3. the largest of all these values is the global maximum, and the smallest the global minimum.

::: example Extrema on a disc {#ex-disc}
Find the global maximum and minimum of $f(x,y) = x^2 + 2y^2 - x$ on the closed unit disc $x^2 + y^2 \le 1$.
::: solution
The disc is closed and bounded and $f$ is continuous, so both extrema exist.

*Interior.* $f_x = 2x - 1$ and $f_y = 4y$ vanish only at $(\tfrac12, 0)$, which lies inside the disc, and $f(\tfrac12, 0) = -\tfrac14$.

*Boundary.* Parametrise the circle by $(\cos t, \sin t)$:

$$
f(\cos t, \sin t) = \cos^2t + 2\sin^2t - \cos t = 2 - \cos^2 t - \cos t .
$$

With $c = \cos t \in [-1, 1]$ we must find the extremes of $g(c) = 2 - c^2 - c$. Since $g'(c) = -2c - 1$, the only critical point is $c = -\tfrac12$, with $g = \tfrac94$; at the endpoints $g(1) = 0$ and $g(-1) = 2$.

*Compare.* The candidate values are $-\tfrac14$, $\tfrac94$, $0$ and $2$. The global maximum is $\tfrac94$, at the two boundary points $(-\tfrac12, \pm\tfrac{\sqrt3}{2})$, and the global minimum is $-\tfrac14$, at the interior point $(\tfrac12, 0)$.
:::
:::

## Lagrange multipliers

Now suppose we must optimise $f(\mathbf{x})$ only over the points satisfying a **constraint** $g(\mathbf{x}) = c$. Picture the case $n = 2$: the constraint is a curve, and the level curves of $f$ cross it. If a level curve $f = k$ crosses the constraint curve transversally at a point, then moving along the constraint we pass from the side where $f < k$ to the side where $f > k$, so the point is not an extremum. At a constrained extremum the level curve of $f$ must therefore *touch* the constraint curve. Touching curves have the same tangent, hence parallel normals, and by [[multivariable/gradient#thm-gradient-normal]] the normals are the gradients.

::: theorem Lagrange multipliers {#thm-lagrange}
Let $f$ and $g$ be $C^1$ on an open set $U\subseteq\R^n$, let $S = \set{\mathbf{x}\in U : g(\mathbf{x}) = c}$, and suppose that $f$ restricted to $S$ has a local extremum at $\mathbf{a}$ with $\nabla g(\mathbf{a}) \ne \mathbf{0}$. Then there is a number $\lambda$, a **Lagrange multiplier**, such that

$$
\nabla f(\mathbf{a}) = \lambda\,\nabla g(\mathbf{a}).
$$ {#eq-lagrange}
:::

::: proof
We give the proof for $n = 2$. Since $\nabla g(\mathbf{a}) = (g_x, g_y) \ne \mathbf{0}$, one of its components is non-zero; say $g_y(\mathbf{a}) \ne 0$ (otherwise exchange the roles of $x$ and $y$). By the implicit function theorem ([[multivariable/partial-derivatives#thm-implicit]], applied to $F = g - c$), there are an open interval $I$ containing $a_1$ and a $C^1$ function $\varphi\colon I\to\R$ with $\varphi(a_1) = a_2$ such that, near $\mathbf{a}$, the points of $S$ are exactly the points $(x, \varphi(x))$, $x\in I$. Then $\mathbf{r}(t) = (t, \varphi(t))$ is a $C^1$ curve in $S$ with $\mathbf{r}(a_1) = \mathbf{a}$ and $\mathbf{r}'(a_1) = (1, \varphi'(a_1)) \ne \mathbf{0}$.

The function $h(t) = f(\mathbf{r}(t))$ has a local extremum at $t = a_1$, because $f$ restricted to $S$ does at $\mathbf{a}$. By the one-variable Fermat theorem and the chain rule, $0 = h'(a_1) = \nabla f(\mathbf{a})\cdot\mathbf{r}'(a_1)$. Also $\nabla g(\mathbf{a})\cdot\mathbf{r}'(a_1) = 0$ by [[multivariable/gradient#thm-gradient-normal]], since $\mathbf{r}$ lies in the level set $g = c$. In $\R^2$ the vectors orthogonal to the non-zero vector $\mathbf{r}'(a_1)$ form a line, which is spanned by $\nabla g(\mathbf{a}) \ne \mathbf{0}$. As $\nabla f(\mathbf{a})$ lies on this line, $\nabla f(\mathbf{a}) = \lambda\nabla g(\mathbf{a})$ for some $\lambda$.

*For general $n$ (sketch).* The implicit function theorem shows that near $\mathbf{a}$ the set $S$ is a smooth $(n-1)$-dimensional hypersurface, and that every vector orthogonal to $\nabla g(\mathbf{a})$ is the velocity $\mathbf{r}'(0)$ of some $C^1$ curve $\mathbf{r}$ in $S$ with $\mathbf{r}(0) = \mathbf{a}$. The argument above then shows that $\nabla f(\mathbf{a})$ is orthogonal to every vector orthogonal to $\nabla g(\mathbf{a})$, so it lies in the span of $\nabla g(\mathbf{a})$. Full details are in Spivak, *Calculus on Manifolds*, ch. 5, or Marsden and Tromba, *Vector Calculus*, §3.4.
:::

In practice we solve the $n+1$ equations $\nabla f = \lambda\nabla g$, $g = c$ for the $n+1$ unknowns $x_1, \dots, x_n, \lambda$, and then compare the values of $f$ at the solutions — together with any points of $S$ where $\nabla g = \mathbf{0}$, and boundary points of $S$ if it has any. Equivalently, the conditions say that $\mathbf{a}$ is a critical point of the **Lagrangian** $\mathcal{L}(\mathbf{x}, \lambda) = f(\mathbf{x}) - \lambda\,(g(\mathbf{x}) - c)$ as a function of $n+1$ variables.

::: example The cheapest open box {#ex-box}
An open-topped rectangular box must have volume $4$ m³. Find the dimensions that minimise its surface area.
::: solution
With base $x\times y$ and height $z$ (all positive), we minimise $f = xy + 2xz + 2yz$ subject to $g = xyz = 4$. The equations $\nabla f = \lambda\nabla g$ are

$$
y + 2z = \lambda yz, \qquad x + 2z = \lambda xz, \qquad 2x + 2y = \lambda xy .
$$

Multiply them by $x$, $y$ and $z$ respectively: each right-hand side becomes $\lambda xyz$, so

$$
xy + 2xz = xy + 2yz = 2xz + 2yz .
$$

The first equality gives $2z(x - y) = 0$, so $x = y$; the second gives $x(y - 2z) = 0$, so $y = 2z$, and hence $x = y = 2z$. Then $xyz = 4z^3 = 4$, so $z = 1$ and $x = y = 2$ (with $\lambda = 2$). The box is $2\times2\times1$ m with area $4 + 4 + 4 = 12$ m².

Is this really a minimum? Eliminating $z = 4/(xy)$ gives $A(x,y) = xy + 8/x + 8/y$ on the open quadrant $x, y > 0$. If $x$ or $y$ is very small, or $x$ or $y$ is very large, then $A > 12$ (for example if $x > 12$ then $8/y + xy \ge 2\sqrt{8x} > 12$). So $A$ attains its minimum on a closed bounded rectangle inside the quadrant, at an interior critical point, and the only one is $(2,2)$.
:::
:::

::: example Extremes of xy on an ellipse {#ex-ellipse}
Find the maximum and minimum of $f(x,y) = xy$ on the ellipse $\dfrac{x^2}{8} + \dfrac{y^2}{2} = 1$.
::: solution
The ellipse is closed and bounded, so both extrema exist, and $\nabla g = (x/4, y) \ne \mathbf{0}$ on it. The Lagrange equations are

$$
y = \lambda\,\frac{x}{4}, \qquad x = \lambda y, \qquad \frac{x^2}{8} + \frac{y^2}{2} = 1 .
$$

If $y = 0$ then $x = 0$, which is not on the ellipse; so $y \ne 0$, and substituting the second equation into the first gives $y = \lambda^2y/4$, so $\lambda = \pm2$ and $x = \pm2y$. Then $x^2 = 4y^2$ and the constraint becomes $\tfrac{y^2}{2} + \tfrac{y^2}{2} = 1$, so $y = \pm1$. The four candidates are $(2,1)$ and $(-2,-1)$, where $xy = 2$, and $(2,-1)$ and $(-2,1)$, where $xy = -2$. The maximum is $2$ and the minimum $-2$. At each of these points the hyperbola $xy = \pm2$ touches the ellipse.
:::
:::

::: widget contour
f: x*y
x: -3.5, 3.5
y: -2.5, 2.5
levels: 16
constraint: x^2/8 + y^2/2 - 1
point: 1, 1.2
caption: Level curves of $f = xy$ (hyperbolas) and the constraint ellipse $x^2/8 + y^2/2 = 1$. The marked points are where $\nabla f \parallel \nabla g$: there a level curve just touches the ellipse. Drag the point along the ellipse and watch $f$: it is largest at $(2,1)$ and $(-2,-1)$, smallest at $(2,-1)$ and $(-2,1)$, and wherever the level curve *crosses* the ellipse you can still increase or decrease $f$.
:::

::: quiz
Let $\mathbf{a}$ be a constrained local maximum of $f$ on the curve $g(x,y) = c$, with $\nabla g(\mathbf{a}) \ne \mathbf{0}$. Which statement must be true?
- [ ] $\nabla f(\mathbf{a}) = \mathbf{0}$
- [x] $\nabla f(\mathbf{a})$ is parallel to $\nabla g(\mathbf{a})$ (possibly zero)
- [ ] $\nabla f(\mathbf{a})$ is perpendicular to $\nabla g(\mathbf{a})$
- [ ] The level curve of $f$ through $\mathbf{a}$ crosses the constraint curve at a non-zero angle
::: solution
By [[#thm-lagrange]], $\nabla f(\mathbf{a}) = \lambda\nabla g(\mathbf{a})$. The gradient of $f$ need not vanish — in [[#ex-ellipse]], $\nabla f(2,1) = (1,2) \ne\mathbf{0}$ — because we only compare $f$ with its values *on the constraint*. The level curve of $f$ is tangent to the constraint curve, not transverse to it.
:::
:::

::: warning The condition ∇g ≠ 0 is essential
The Lagrange equations can miss an extremum at a point where $\nabla g = \mathbf{0}$. On the cusp curve $g(x,y) = y^2 - x^3 = 0$, the function $f(x,y) = x$ attains its minimum $0$ at the origin (on the curve $x^3 = y^2 \ge 0$, so $x \ge 0$, with equality only at the origin). But $\nabla f = (1, 0)$ while $\nabla g(0,0) = (0,0)$, so $\nabla f = \lambda\nabla g$ has no solution there. Always add the points where $\nabla g = \mathbf{0}$ to the list of candidates.
:::

### Several constraints

With two constraints $g = c_1$ and $h = c_2$ in $\R^3$ the feasible set is typically a curve, and the same reasoning gives the following.

::: theorem Two constraints {#thm-lagrange-two}
Let $f, g, h$ be $C^1$ near $\mathbf{a}\in\R^n$, and suppose that $f$, restricted to $\set{g = c_1,\ h = c_2}$, has a local extremum at $\mathbf{a}$, where $\nabla g(\mathbf{a})$ and $\nabla h(\mathbf{a})$ are linearly independent. Then there are numbers $\lambda, \mu$ with

$$
\nabla f(\mathbf{a}) = \lambda\,\nabla g(\mathbf{a}) + \mu\,\nabla h(\mathbf{a}).
$$
:::

The proof is the same: by the implicit function theorem, the vectors tangent to the constraint set at $\mathbf{a}$ are exactly those orthogonal to both $\nabla g(\mathbf{a})$ and $\nabla h(\mathbf{a})$, and $\nabla f(\mathbf{a})$ is orthogonal to all of them, so it lies in the span of the two gradients.

::: example The highest point of an ellipse {#ex-two-constraints}
The plane $x + y + z = 1$ cuts the cylinder $x^2 + y^2 = 1$ in an ellipse. Find its highest and lowest points.
::: solution
Maximise and minimise $f = z$ subject to $g = x + y + z = 1$ and $h = x^2 + y^2 = 1$. The gradients $\nabla g = (1,1,1)$ and $\nabla h = (2x, 2y, 0)$ are independent on the ellipse. The equation $\nabla f = \lambda\nabla g + \mu\nabla h$ reads

$$
0 = \lambda + 2\mu x, \qquad 0 = \lambda + 2\mu y, \qquad 1 = \lambda .
$$

So $\lambda = 1$ and $2\mu x = 2\mu y = -1$; thus $\mu \ne 0$ and $x = y$. The cylinder gives $x = y = \pm\tfrac{1}{\sqrt2}$, and the plane gives $z = 1 - x - y = 1 \mp \sqrt2$. The highest point is $\left(-\tfrac{1}{\sqrt2}, -\tfrac{1}{\sqrt2}, 1 + \sqrt2\right)$ and the lowest is $\left(\tfrac{1}{\sqrt2}, \tfrac{1}{\sqrt2}, 1 - \sqrt2\right)$. (Directly: $z = 1 - (x + y)$ and $x + y$ ranges over $[-\sqrt2, \sqrt2]$ on the unit circle.)
:::
:::

::: application The meaning of the multiplier
The multiplier is not just an auxiliary unknown. If $M(c)$ denotes the optimal value of $f$ subject to $g = c$, then under mild conditions $M'(c) = \lambda$: the multiplier is the rate at which the best achievable value improves as the constraint is relaxed. Economists call it a **shadow price** — in maximising output subject to a budget, $\lambda$ is the extra output bought by one more unit of money. For instance, the maximum of $xy$ subject to $x + y = c$ is $M(c) = c^2/4$, at $x = y = c/2$ with $\lambda = c/2 = M'(c)$. In physics, multipliers for mechanical constraints turn out to be the forces needed to enforce them, and in statistics maximising entropy $-\sum p_i\ln p_i$ subject to $\sum p_i = 1$ gives $-\ln p_i - 1 = \lambda$ for every $i$, so all $p_i$ are equal: with no further information, the uniform distribution is the least biased.
:::

::: history
Pierre de Fermat devised a method for finding maxima and minima of curves in the 1630s, before calculus existed, based on the observation that near an extremum a function changes very little — the germ of [[#thm-fermat]]. Joseph-Louis Lagrange introduced multipliers in his *Mécanique analytique* (1788) to handle constraints in mechanics, such as a bead confined to a wire, and later applied the same idea to general problems of maxima and minima. The extension to inequality constraints such as $g(\mathbf{x}) \le c$ came much later: it appeared in William Karush's master's thesis in 1939 and was rediscovered by Harold Kuhn and Albert Tucker in 1951. The resulting Karush–Kuhn–Tucker conditions are the foundation of modern optimisation, from economics to the training of support vector machines.
:::

## Where this leads

Critical points and Hessians reappear across mathematics. In [[ode/nonlinear-systems]] the stability of an equilibrium of a gradient system $\mathbf{x}' = -\nabla f(\mathbf{x})$ is read off from the Hessian of $f$; in statistics, maximum likelihood estimates are critical points of a log-likelihood ([[statistics/estimation]]); and numerical methods for optimisation, such as Newton's method $\mathbf{x}_{k+1} = \mathbf{x}_k - Hf(\mathbf{x}_k)^{-1}\nabla f(\mathbf{x}_k)$, are built on the second-order Taylor formula ([[numerical-analysis/root-finding]]). In [[differential-geometry/surface-curvature]] the Hessian of a function whose graph is a surface becomes its second fundamental form, and its eigenvalues become principal curvatures: a minimum is a point of positive curvature, a saddle a point of negative curvature.

::: summary
- Interior extrema of a function with partial derivatives occur at critical points, where $\nabla f = \mathbf{0}$ ([[#thm-fermat]]); critical points can also be saddle points.
- Near $\mathbf{a}$, $f(\mathbf{a}+\mathbf{h}) \approx f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h} + \tfrac12\mathbf{h}\T Hf(\mathbf{a})\mathbf{h}$, where $Hf$ is the symmetric Hessian matrix ([[#thm-taylor2]]).
- At a critical point: positive definite Hessian (all eigenvalues $> 0$) gives a local minimum, negative definite a local maximum, indefinite a saddle; semidefinite is inconclusive ([[#thm-second-derivative-test]]).
- In two variables use $D = f_{xx}f_{yy} - f_{xy}^2$: $D > 0$ gives an extremum (minimum if $f_{xx} > 0$), $D < 0$ a saddle, $D = 0$ no conclusion.
- On a closed bounded set a continuous function attains global extrema; compare interior critical points with the extremes on the boundary.
- To optimise $f$ subject to $g = c$, solve $\nabla f = \lambda\nabla g$, $g = c$, and also check points with $\nabla g = \mathbf{0}$ ([[#thm-lagrange]]). With two constraints, $\nabla f = \lambda\nabla g + \mu\nabla h$.
- The multiplier $\lambda$ measures the sensitivity of the optimal value to the constraint level.
:::

## Exercises

::: exercise A quadratic function {level=1 check="-3"}
Find the critical point of $f(x,y) = x^2 + xy + y^2 - 3x$, classify it, and give the value of $f$ there.
::: solution
$f_x = 2x + y - 3 = 0$ and $f_y = x + 2y = 0$ give $x = -2y$, then $-3y = 3$, so $(x,y) = (2,-1)$. The Hessian is $\begin{pmatrix}2&1\\1&2\end{pmatrix}$ with $D = 3 > 0$ and $f_{xx} = 2 > 0$, so this is a local minimum (in fact global, since the Hessian is constant and positive definite). The value is $f(2,-1) = 4 - 2 + 1 - 6 = -3$.
:::
:::

::: exercise A saddle {level=1}
Show that the origin is a saddle point of $f(x,y) = x^2 - 4xy + y^2$, and find a line through the origin along which $f$ decreases.
::: solution
$\nabla f = (2x - 4y, -4x + 2y)$ vanishes at the origin. The Hessian is $\begin{pmatrix}2&-4\\-4&2\end{pmatrix}$ with $D = 4 - 16 = -12 < 0$, so the origin is a saddle. Along $y = x$, $f = x^2 - 4x^2 + x^2 = -2x^2 < 0$ for $x \ne 0$, while along the $x$-axis $f = x^2 > 0$.
:::
:::

::: exercise A Taylor approximation {level=1 check="1.085"}
Find the second-order Taylor polynomial of $f(x,y) = e^x\cos y$ at the origin and use it to approximate $f(0.1, 0.2)$.
::: solution
At the origin $f = 1$, $f_x = e^x\cos y = 1$, $f_y = -e^x\sin y = 0$, $f_{xx} = 1$, $f_{xy} = -e^x\sin y = 0$, $f_{yy} = -e^x\cos y = -1$. So $T_2 = 1 + x + \tfrac12(x^2 - y^2)$, and $T_2(0.1, 0.2) = 1 + 0.1 + \tfrac12(0.01 - 0.04) = 1.085$. (The true value is $1.0831\ldots$)
:::
:::

::: exercise Global maximum on a disc {level=2 check="8"}
Find the global maximum of $f(x,y) = x^2 + y^2 - 2x$ on the disc $x^2 + y^2 \le 4$.
::: solution
The only critical point is $(1, 0)$, inside the disc, with $f = -1$. On the boundary $x^2 + y^2 = 4$ we have $f = 4 - 2x$ with $x\in[-2,2]$, which ranges from $0$ (at $(2,0)$) to $8$ (at $(-2,0)$). Comparing, the global maximum is $8$ at $(-2, 0)$ (and the global minimum is $-1$ at $(1,0)$).
:::
:::

::: exercise A linear function on a sphere {level=2 check="9"}
Use Lagrange multipliers to find the maximum of $f = x + 2y + 2z$ on the sphere $x^2 + y^2 + z^2 = 9$.
::: solution
$\nabla f = (1,2,2) = \lambda(2x, 2y, 2z)$ gives $(x,y,z) = \tfrac{1}{2\lambda}(1,2,2)$. Substituting into the constraint, $\tfrac{9}{4\lambda^2} = 9$, so $\lambda = \pm\tfrac12$ and $(x,y,z) = \pm(1,2,2)$. The values are $f = \pm 9$, so the maximum is $9$ at $(1,2,2)$. (This agrees with Cauchy–Schwarz: $\abs{(1,2,2)\cdot\mathbf{x}} \le 3\cdot 3$.)
:::
:::

::: exercise The nearest point of a plane {level=2 check="sqrt(14)"}
Use Lagrange multipliers to find the point of the plane $x + 2y + 3z = 14$ nearest to the origin, and its distance from the origin.
::: solution
Minimise $f = x^2 + y^2 + z^2$ (the squared distance) subject to $g = x + 2y + 3z = 14$. From $(2x, 2y, 2z) = \lambda(1,2,3)$ we get $(x,y,z) = \tfrac\lambda2(1,2,3)$, and the constraint gives $\tfrac\lambda2\cdot 14 = 14$, so $\lambda = 2$ and the point is $(1,2,3)$. A nearest point exists (the squared distance tends to infinity far out along the plane), so this is it, and the distance is $\sqrt{1 + 4 + 9} = \sqrt{14}$, in agreement with [[multivariable/vectors-geometry#thm-point-plane]].
:::
:::

::: exercise Three variables {level=2}
Show that $f(x,y,z) = x^2 + y^2 + z^2 + xy + yz$ has a strict local minimum at the origin by computing the eigenvalues of its Hessian.
::: solution
$\nabla f = (2x + y,\; x + 2y + z,\; y + 2z)$ vanishes at the origin, and

$$
Hf = \begin{pmatrix} 2 & 1 & 0\\ 1 & 2 & 1\\ 0 & 1 & 2\end{pmatrix}, \qquad \det(Hf - \lambda I) = (2-\lambda)\bigl((2-\lambda)^2 - 2\bigr).
$$

The eigenvalues are $2$ and $2\pm\sqrt2$, all positive, so the Hessian is positive definite and the origin is a strict local minimum by [[#thm-second-derivative-test]].
:::
:::

::: exercise The cheapest closed box {level=2}
Show that among all closed rectangular boxes of volume $V$, the cube has the least surface area.
::: solution
Minimise $f = 2(xy + yz + zx)$ subject to $xyz = V$. The Lagrange equations are $2(y+z) = \lambda yz$, $2(x+z) = \lambda xz$, $2(x+y) = \lambda xy$. Multiplying by $x$, $y$, $z$ respectively, the right-hand sides all become $\lambda V$, so $xy + xz = xy + yz = xz + yz$. The first equality gives $x = y$ and the second $y = z$. So $x = y = z = V^{1/3}$. As in [[#ex-box]], the area tends to infinity when any dimension tends to $0$ or $\infty$, so a minimum exists and must be this critical point.
:::
:::

::: exercise The arithmetic–geometric mean inequality {level=3}
Use Lagrange multipliers to show that the maximum of $x_1x_2\cdots x_n$ subject to $x_1 + \dots + x_n = s$ and $x_i \ge 0$ is $(s/n)^n$. Deduce that $(x_1\cdots x_n)^{1/n} \le \dfrac{x_1 + \dots + x_n}{n}$ for all non-negative $x_i$.
::: hint
The constraint set is closed and bounded, so a maximum exists; it cannot occur where some $x_i = 0$.
:::
::: solution
The set $\set{x_i \ge 0, \sum x_i = s}$ is closed and bounded, so the continuous function $f = x_1\cdots x_n$ attains a maximum on it. If $s > 0$, the maximum is positive (e.g. at $x_i = s/n$), so it occurs where all $x_i > 0$ — an interior point of the region $x_i > 0$ where we may use [[#thm-lagrange]] with $g = \sum x_i$, $\nabla g = (1,\dots,1) \ne \mathbf{0}$. The equations are $\prod_{j\ne i}x_j = \lambda$ for each $i$; multiplying the $i$-th by $x_i$ gives $f = \lambda x_i$, and $f > 0$ forces all $x_i = f/\lambda$ to be equal, hence $x_i = s/n$ and the maximum is $(s/n)^n$. Therefore $x_1\cdots x_n \le \left(\tfrac{x_1 + \dots + x_n}{n}\right)^n$ whenever $x_i \ge 0$ (trivially if $s = 0$); take $n$-th roots.
:::
:::

::: exercise Minimum on every line, yet a saddle {#exr-peano level=3}
Let $f(x,y) = (y - x^2)(y - 2x^2)$. Show that the restriction of $f$ to every straight line through the origin has a strict local minimum at the origin, but that the origin is not a local minimum of $f$. What does the second derivative test say?
::: solution
Expanding, $f = y^2 - 3x^2y + 2x^4$. On the $y$-axis $f = y^2$, which has a strict minimum at $0$. On the line $y = mx$, $f = m^2x^2 - 3mx^3 + 2x^4$: if $m \ne 0$ the term $m^2x^2$ dominates for small $x$, so $f > 0$ for small $x\ne0$; if $m = 0$, $f = 2x^4 > 0$ for $x \ne 0$. So every line gives a strict local minimum. But on the parabola $y = \tfrac32x^2$, which lies between $y = x^2$ and $y = 2x^2$, we get $f = \left(\tfrac12x^2\right)\left(-\tfrac12x^2\right) = -\tfrac14x^4 < 0$ for $x \ne 0$, and such points come arbitrarily close to the origin. So $f(0,0) = 0$ is not a local minimum; the origin is a saddle point. The Hessian at the origin is $\begin{pmatrix}0&0\\0&2\end{pmatrix}$, with $D = 0$: the test is inconclusive, as it must be.
:::
:::
