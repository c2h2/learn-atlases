Before electronic computers, scientists looked up logarithms, sines and Bessel functions in printed tables, and needed values *between* the tabulated ones. Today the same problem appears everywhere: a function is known only at a few points — measurements, the output of an expensive simulation, the grid values of an ODE solver — and we want a formula that passes through those points and can be evaluated, differentiated or integrated anywhere. The simplest such formula is a polynomial.

**Polynomial interpolation** asks: given $n + 1$ points $(x_0, y_0), \dots, (x_n, y_n)$ with distinct **nodes** $x_i$, find a polynomial $p$ of degree at most $n$ with $p(x_i) = y_i$ for every $i$. This chapter shows that there is exactly one, gives two practical ways of writing it down (Lagrange's and Newton's), and proves a formula for the error when the data come from a smooth function. The error formula leads to a surprise — interpolating at more equally spaced points can make things *worse* (Runge's phenomenon) — and to its cure: Chebyshev nodes, or piecewise polynomials called **splines**. Interpolation is also the foundation of the next chapters: quadrature rules integrate interpolants, and many ODE solvers extrapolate them.

## Existence, uniqueness and the Lagrange form

Write $\mathcal P_n$ for the set of polynomials of degree at most $n$ with real coefficients.

::: theorem Existence and uniqueness of the interpolant {#thm-interp-unique}
Let $x_0, x_1, \dots, x_n$ be distinct real numbers and $y_0, \dots, y_n$ any real numbers. There is exactly one polynomial $p \in \mathcal P_n$ with $p(x_i) = y_i$ for $i = 0, \dots, n$.
:::

::: proof
*Uniqueness.* If $p, q \in \mathcal P_n$ both interpolate the data, then $p - q \in \mathcal P_n$ vanishes at the $n + 1$ distinct points $x_i$. A non-zero polynomial of degree at most $n$ has at most $n$ roots, so $p - q = 0$.

*Existence.* For each $j$ define the **Lagrange basis polynomial**

$$
\ell_j(x) = \prod_{k \ne j}\frac{x - x_k}{x_j - x_k} = \frac{(x - x_0)\cdots(x - x_{j-1})(x - x_{j+1})\cdots(x - x_n)}{(x_j - x_0)\cdots(x_j - x_{j-1})(x_j - x_{j+1})\cdots(x_j - x_n)} .
$$ {#eq-lagrange-basis}

It is a product of $n$ linear factors, so $\ell_j \in \mathcal P_n$; it vanishes at every node except $x_j$, where it equals $1$: $\ell_j(x_i) = \delta_{ij}$. Hence

$$
p(x) = \sum_{j=0}^n y_j\,\ell_j(x)
$$ {#eq-lagrange-form}

satisfies $p(x_i) = \sum_j y_j\delta_{ij} = y_i$.
:::

Formula [[#eq-lagrange-form]] is the **Lagrange form** of the interpolant. When the data come from a function, $y_i = f(x_i)$, we write $p = p_n$ and call it the interpolant of $f$.

::: example A quadratic through three points {#ex-lagrange}
Find the polynomial of degree at most $2$ through $(0, 1)$, $(1, 3)$ and $(2, 2)$.
::: solution
The Lagrange basis polynomials are

$$
\ell_0(x) = \frac{(x-1)(x-2)}{(0-1)(0-2)} = \frac{(x-1)(x-2)}{2}, \quad \ell_1(x) = \frac{x(x-2)}{(1)(-1)} = -x(x-2), \quad \ell_2(x) = \frac{x(x-1)}{2\cdot1}.
$$

So $p(x) = 1\cdot\frac{(x-1)(x-2)}{2} - 3x(x-2) + 2\cdot\frac{x(x-1)}{2}$. Expanding, $p(x) = \frac12x^2 - \frac32x + 1 - 3x^2 + 6x + x^2 - x = -\frac32x^2 + \frac72x + 1$. Check: $p(0) = 1$, $p(1) = -\frac32 + \frac72 + 1 = 3$, $p(2) = -6 + 7 + 1 = 2$.
:::
:::

::: remark Why not solve for the coefficients directly?
Writing $p(x) = a_0 + a_1x + \cdots + a_nx^n$, the conditions $p(x_i) = y_i$ form a linear system $V\mathbf a = \mathbf y$ with the **Vandermonde matrix** $V_{ij} = x_i^j$. [[#thm-interp-unique]] shows that $V$ is invertible, but it is extremely ill-conditioned: for $n + 1$ equally spaced nodes on $[0, 1]$ its condition number ([[numerical-analysis/direct-methods]]) is about $4.9\times10^3$ for $n = 5$, $1.2\times10^8$ for $n = 10$ and $9\times10^{16}$ for $n = 20$, so in double precision the monomial coefficients for $n = 20$ can be entirely wrong. The Lagrange and Newton forms avoid computing these coefficients at all.
:::

## Newton's form and divided differences

The Lagrange form has a drawback: adding one more data point changes every basis polynomial. **Newton's form** builds the interpolant up one node at a time:

$$
p_n(x) = c_0 + c_1(x - x_0) + c_2(x - x_0)(x - x_1) + \cdots + c_n(x - x_0)(x - x_1)\cdots(x - x_{n-1}) .
$$

Adding a node $x_{n+1}$ just adds one more term. The coefficients turn out to be **divided differences**.

::: definition Divided differences {#def-divided}
The divided differences of $f$ at distinct nodes are defined recursively by $f[x_i] = f(x_i)$ and

$$
f[x_i, x_{i+1}, \dots, x_{i+k}] = \frac{f[x_{i+1}, \dots, x_{i+k}] - f[x_i, \dots, x_{i+k-1}]}{x_{i+k} - x_i} .
$$
:::

So $f[x_0, x_1] = \frac{f(x_1) - f(x_0)}{x_1 - x_0}$ is the slope of the secant, $f[x_0, x_1, x_2]$ is a difference of slopes divided by a distance, and so on.

::: theorem Newton's interpolation formula {#thm-newton-form}
The interpolant of $f$ at distinct nodes $x_0, \dots, x_n$ is

$$
p_n(x) = \sum_{k=0}^n f[x_0, \dots, x_k]\prod_{j=0}^{k-1}(x - x_j) .
$$ {#eq-newton-form}

In particular, the coefficient of $x^n$ in $p_n$ is $f[x_0, \dots, x_n]$.
:::

::: proof
For $0 \le i$ and $i + k \le n$ let $p_{i,k} \in \mathcal P_k$ interpolate $f$ at $x_i, \dots, x_{i+k}$. We first show **Aitken's formula**: for $k \ge 1$,

$$
p_{i,k}(x) = \frac{(x - x_i)\,p_{i+1,k-1}(x) - (x - x_{i+k})\,p_{i,k-1}(x)}{x_{i+k} - x_i} .
$$

The right side has degree at most $k$. At $x = x_i$ it equals $\frac{-(x_i - x_{i+k})f(x_i)}{x_{i+k} - x_i} = f(x_i)$; at $x = x_{i+k}$ it equals $f(x_{i+k})$; and at an intermediate node $x_j$ both $p_{i+1,k-1}$ and $p_{i,k-1}$ equal $f(x_j)$, so it equals $\frac{(x_j - x_i) - (x_j - x_{i+k})}{x_{i+k} - x_i}f(x_j) = f(x_j)$. By uniqueness it is $p_{i,k}$.

Comparing the coefficients of $x^k$ in Aitken's formula, the leading coefficients $L_{i,k}$ satisfy $L_{i,k} = \frac{L_{i+1,k-1} - L_{i,k-1}}{x_{i+k} - x_i}$, the same recursion as the divided differences, with $L_{i,0} = f(x_i)$. By induction on $k$, $L_{i,k} = f[x_i, \dots, x_{i+k}]$.

Now $p_{0,k} - p_{0,k-1}$ has degree at most $k$ and vanishes at $x_0, \dots, x_{k-1}$, so it equals $c\,(x - x_0)\cdots(x - x_{k-1})$, and comparing leading coefficients, $c = L_{0,k} = f[x_0, \dots, x_k]$. Summing $p_{0,k} - p_{0,k-1}$ for $k = 1, \dots, n$ and adding $p_{0,0} = f(x_0)$ gives [[#eq-newton-form]].
:::

Divided differences are computed in a triangular table, column by column, and the Newton form is evaluated by nested multiplication like Horner's rule.

```python
def divided_differences(x, y):
    """Return the Newton coefficients c[k] = f[x_0, ..., x_k]."""
    c = list(y)
    n = len(x)
    for k in range(1, n):                     # column k of the table
        for i in range(n - 1, k - 1, -1):     # update from the bottom up
            c[i] = (c[i] - c[i-1]) / (x[i] - x[i-k])
    return c

def newton_eval(c, x, t):
    """Evaluate the Newton form at t by nested multiplication."""
    p = c[-1]
    for k in range(len(c) - 2, -1, -1):
        p = p * (t - x[k]) + c[k]
    return p
```

::: example A divided-difference table {#ex-divided}
Interpolate $f(x) = \frac1x$ at the nodes $1, 2, 4$, and use the result to estimate $f(3)$.
::: solution
The table of divided differences is

| $x_i$ | $f[x_i]$ | first differences | second difference |
|---|---|---|---|
| $1$ | $1$ | | |
| | | $f[1,2] = \frac{1/2 - 1}{2 - 1} = -\frac12$ | |
| $2$ | $\frac12$ | | $f[1,2,4] = \frac{-1/8 - (-1/2)}{4 - 1} = \frac18$ |
| | | $f[2,4] = \frac{1/4 - 1/2}{4 - 2} = -\frac18$ | |
| $4$ | $\frac14$ | | |

The top diagonal gives the Newton form

$$
p_2(x) = 1 - \frac12(x - 1) + \frac18(x - 1)(x - 2) .
$$

At $x = 3$: $p_2(3) = 1 - 1 + \frac18\cdot2\cdot1 = \frac14$, while $f(3) = \frac13$. The error $\frac1{12} \approx 0.083$ is large because $\frac1x$ curves strongly on $[1, 4]$; the error formula below explains it exactly.
:::
:::

## The interpolation error

When the data come from a smooth function, the error of the interpolant has a formula strikingly similar to the remainder in Taylor's theorem ([[calculus-2/taylor-series#thm-taylor]]). Indeed Taylor's polynomial is the limiting case in which all nodes coincide.

::: theorem Interpolation error {#thm-interp-error}
Let $f$ be $n + 1$ times continuously differentiable on $[a, b]$ and let $p_n$ interpolate $f$ at distinct nodes $x_0, \dots, x_n$ in $[a, b]$. For every $x \in [a, b]$ there is $\xi \in (a, b)$ such that

$$
f(x) - p_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}\,\omega_{n+1}(x), \qquad \omega_{n+1}(x) = \prod_{i=0}^n(x - x_i) .
$$ {#eq-interp-error}
:::

::: proof
If $x$ is a node, both sides are $0$. Otherwise $\omega_{n+1}(x) \ne 0$, and we define, for $t \in [a, b]$,

$$
g(t) = f(t) - p_n(t) - \bigl(f(x) - p_n(x)\bigr)\frac{\omega_{n+1}(t)}{\omega_{n+1}(x)} .
$$

Then $g$ vanishes at the $n + 1$ nodes (where $f = p_n$ and $\omega_{n+1} = 0$) and at $t = x$: $n + 2$ distinct zeros in $[a, b]$. By Rolle's theorem $g'$ has at least $n + 1$ zeros strictly between them, $g''$ at least $n$, and so on: $g^{(n+1)}$ has a zero $\xi \in (a, b)$. Since $p_n^{(n+1)} = 0$ and $\omega_{n+1}^{(n+1)} = (n+1)!$ (it is monic of degree $n + 1$),

$$
0 = g^{(n+1)}(\xi) = f^{(n+1)}(\xi) - \bigl(f(x) - p_n(x)\bigr)\frac{(n+1)!}{\omega_{n+1}(x)},
$$

which rearranges to [[#eq-interp-error]].
:::

::: corollary Error bound {#cor-interp-bound}
If $\abs{f^{(n+1)}} \le M_{n+1}$ on $[a, b]$, then $\displaystyle\max_{[a,b]}\abs{f - p_n} \le \frac{M_{n+1}}{(n+1)!}\max_{[a,b]}\abs{\omega_{n+1}}$. For linear interpolation between two points a distance $h$ apart, $\abs{f - p_1} \le \frac{M_2h^2}{8}$.
:::

::: proof
The first statement follows from [[#eq-interp-error]]. For $n = 1$ with nodes $x_0$ and $x_0 + h$, $\abs{\omega_2(x)} = \abs{(x - x_0)(x - x_0 - h)}$ is largest at the midpoint, where it equals $\frac{h^2}{4}$; dividing by $2! = 2$ gives $\frac{M_2h^2}{8}$.
:::

Comparing the two formulas, a divided difference is a scaled derivative: applying [[#eq-interp-error]] with $n - 1$ in place of $n$ at the point $x = x_n$, and using [[#thm-newton-form]], gives $f[x_0, \dots, x_n] = \frac{f^{(n)}(\xi)}{n!}$ for some $\xi$ in the span of the nodes ([[#exr-dd-derivative]]).

::: example Interpolating a table {#ex-table}
A table lists $\sin x$ at spacing $h = 0.1$. How accurate is linear interpolation between entries? What spacing would give six correct decimals?
::: solution
With $\abs{(\sin)''} \le 1$, [[#cor-interp-bound]] gives an error at most $\frac{h^2}{8} = \frac{0.01}{8} = 1.25\times10^{-3}$ for $h = 0.1$, so only about two decimals are reliable. For an error below $5\times10^{-7}$ we need $\frac{h^2}{8} \le 5\times10^{-7}$, i.e. $h \le \sqrt{4\times10^{-6}} = 0.002$. Printed tables chose their spacing, or supplied second differences for quadratic interpolation, with exactly this calculation in mind.
:::
:::

For [[#ex-divided]], the formula gives $f(3) - p_2(3) = \frac{f'''(\xi)}{6}\omega_3(3)$ with $f'''(x) = -\frac{6}{x^4}$ and $\omega_3(3) = (3-1)(3-2)(3-4) = -2$, so the error is $\frac{2}{\xi^4}$ for some $\xi \in (1, 4)$. The actual error $\frac1{12}$ corresponds to $\xi = 24^{1/4} \approx 2.21$.

::: quiz
For distinct nodes $x_0, \dots, x_n$, what is $\sum_{j=0}^n\ell_j(x)$, the sum of the Lagrange basis polynomials?
- [ ] $0$
- [x] $1$ for every $x$
- [ ] $n + 1$
- [ ] It depends on the nodes.
::: solution
$\sum_j\ell_j(x) = \sum_j 1\cdot\ell_j(x)$ is the interpolant of the constant function $f = 1$. By uniqueness ([[#thm-interp-unique]]) that interpolant is $1$ itself. Equivalently, [[#eq-interp-error]] gives error $0$, because $f^{(n+1)} = 0$. More generally, interpolation reproduces every polynomial of degree at most $n$ exactly.
:::
:::

## Runge's phenomenon

The error formula suggests that more nodes should mean smaller errors: the factor $(n+1)!$ in the denominator grows very fast. In 1901 Carl Runge showed that this hope can fail spectacularly, even for an innocent-looking function. Interpolate

$$
f(x) = \frac{1}{1 + 25x^2} \qquad\text{on } [-1, 1]
$$

at $n + 1$ equally spaced nodes $x_i = -1 + \frac{2i}{n}$. The maximum error over $[-1, 1]$ is:

| degree $n$ | $5$ | $10$ | $15$ | $20$ | $40$ |
|---|---|---|---|---|---|
| equispaced nodes | $0.43$ | $1.92$ | $2.11$ | $59.8$ | $1.0\times10^{5}$ |
| Chebyshev nodes | $0.56$ | $0.11$ | $0.083$ | $0.015$ | $2.9\times10^{-4}$ |

With equally spaced nodes the interpolants match $f$ well in the middle of the interval but oscillate wildly near the ends, with amplitude growing exponentially in $n$. This is **Runge's phenomenon**.

::: widget interpolation
f: 1/(1 + 25x^2)
n: 11
nodes: equispaced
caption: Runge's function interpolated at $11$ equally spaced nodes (degree $10$). The fit is good near the centre but overshoots badly near $\pm1$. Increase the number of nodes: the oscillations at the ends *grow*. Then switch the nodes to Chebyshev and watch them disappear.
:::

Two factors in [[#eq-interp-error]] explain this. First, the derivatives of $f$ grow very fast: $\max\abs{f^{(n+1)}}$ behaves roughly like $(n+1)!\,5^{n+1}$, because $f$ has complex poles at $\pm\frac{i}{5}$, close to the real interval. Second, for equally spaced nodes the node polynomial $\omega_{n+1}(x)$ is much larger near the ends of the interval than in the middle: the nodes are too sparse near $\pm1$. The second factor we can control, by choosing the nodes.

::: warning More data points are not always better
For polynomial interpolation at equally spaced points, increasing the degree can make the approximation diverge, even for smooth (indeed analytic) functions. High-degree interpolation at equispaced points is also badly conditioned: small errors in the data are amplified enormously. If your data come equally spaced, use low-degree pieces (splines) or least-squares fits ([[linear-algebra/least-squares]]) instead of one high-degree interpolant.
:::

## Chebyshev nodes

To minimise the error bound we should choose nodes that make $\max_{[-1,1]}\abs{\omega_{n+1}}$ as small as possible. The answer involves the **Chebyshev polynomials**

$$
T_n(x) = \cos(n\arccos x), \qquad -1 \le x \le 1 .
$$

With $x = \cos\theta$, the identity $\cos((n+1)\theta) + \cos((n-1)\theta) = 2\cos\theta\cos(n\theta)$ gives the recurrence

$$
T_0(x) = 1, \quad T_1(x) = x, \quad T_{n+1}(x) = 2xT_n(x) - T_{n-1}(x),
$$

so $T_2 = 2x^2 - 1$, $T_3 = 4x^3 - 3x$, and in general $T_n$ is a polynomial of degree $n$ with leading coefficient $2^{n-1}$ (for $n \ge 1$). From the cosine form: $\abs{T_n(x)} \le 1$ on $[-1, 1]$; $T_n$ takes the values $\pm1$ alternately at the $n + 1$ points $\eta_k = \cos\frac{k\pi}{n}$, $k = 0, \dots, n$; and its $n$ zeros are $\cos\frac{(2k+1)\pi}{2n}$, $k = 0, \dots, n-1$.

::: theorem Minimax property of Chebyshev polynomials {#thm-chebyshev}
For $n \ge 1$, the monic polynomial $\tilde T_n = 2^{1-n}T_n$ satisfies $\max_{[-1,1]}\abs{\tilde T_n} = 2^{1-n}$, and every monic polynomial $q$ of degree $n$ satisfies $\max_{[-1,1]}\abs{q} \ge 2^{1-n}$.
:::

::: proof
The first claim follows from $\abs{T_n} \le 1$ with equality at the points $\eta_k$. Suppose a monic $q$ of degree $n$ had $\abs{q(x)} < 2^{1-n}$ for all $x \in [-1, 1]$. Then $r = \tilde T_n - q$ has degree at most $n - 1$ (the leading terms cancel). At the $n + 1$ points $\eta_0 > \eta_1 > \cdots > \eta_n$, $\tilde T_n(\eta_k) = (-1)^k2^{1-n}$ while $\abs{q(\eta_k)} < 2^{1-n}$, so $r(\eta_k)$ has the sign $(-1)^k$. Thus $r$ changes sign between consecutive $\eta_k$, and by the intermediate value theorem it has at least $n$ zeros. A polynomial of degree at most $n - 1$ with $n$ zeros is $0$, so $q = \tilde T_n$, contradicting $\max\abs q < 2^{1-n} = \max\abs{\tilde T_n}$.
:::

::: corollary Interpolation at Chebyshev nodes {#cor-chebyshev-nodes}
If the nodes are the zeros of $T_{n+1}$, the **Chebyshev nodes** $x_k = \cos\frac{(2k+1)\pi}{2n+2}$, $k = 0, \dots, n$, then $\omega_{n+1} = \tilde T_{n+1}$, and for $f \in C^{n+1}[-1, 1]$

$$
\max_{[-1,1]}\abs{f - p_n} \le \frac{\max\abs{f^{(n+1)}}}{2^n\,(n+1)!} .
$$

No other choice of nodes gives a smaller value of $\max\abs{\omega_{n+1}}$.
:::

::: proof
$\omega_{n+1}$ is monic of degree $n + 1$ with the same $n + 1$ zeros as $\tilde T_{n+1}$, so the two are equal, and $\max\abs{\omega_{n+1}} = 2^{-n}$ by [[#thm-chebyshev]]; insert this into [[#cor-interp-bound]]. Optimality is the second part of [[#thm-chebyshev]]. On a general interval $[a, b]$, map the nodes affinely: $x_k = \frac{a+b}{2} + \frac{b-a}{2}\cos\frac{(2k+1)\pi}{2n+2}$.
:::

The gain is dramatic. For $n = 10$ the maximum of $\abs{\omega_{11}}$ is $8.5\times10^{-3}$ for equally spaced nodes and $9.8\times10^{-4}$ for Chebyshev nodes; for $n = 20$ the ratio is about $245$. Chebyshev nodes cluster near the ends of the interval, like the projections onto the $x$-axis of equally spaced points on a semicircle, exactly where equally spaced nodes are too sparse. For Runge's function the Chebyshev interpolants converge geometrically (the second row of the table above).

::: widget interpolation
f: 1/(1 + 25x^2)
n: 21
nodes: chebyshev
caption: Runge's function at $21$ Chebyshev nodes (degree $20$). The nodes crowd towards the endpoints and the error is now small everywhere — about $0.015$ at most. Compare with the equispaced interpolant of the same degree, whose error near the ends is about $60$.
:::

::: remark Stable evaluation: the barycentric formula
Chebyshev interpolation of degree $1000$ is routine in modern software (for instance the Chebfun system), but only with a stable evaluation formula. Dividing the Lagrange form by the interpolant of the constant $1$ gives the **barycentric formula** $p(x) = \sum_j\frac{w_j}{x - x_j}y_j\Big/\sum_j\frac{w_j}{x - x_j}$, where $w_j = 1/\prod_{k\ne j}(x_j - x_k)$. It costs $O(n)$ operations per evaluation and is numerically stable; for the Chebyshev extreme points $\cos\frac{k\pi}{n}$ the weights can be taken to be simply $(-1)^k$, halved at the two endpoints. See Trefethen's *Approximation Theory and Approximation Practice*.
:::

## Cubic splines

Instead of one polynomial of high degree, use many of low degree. The simplest choice joins the data points by straight lines; by [[#cor-interp-bound]] its error is at most $\frac{M_2h^2}{8}$ for spacing $h$, so it always converges as $h \to 0$, but its graph has corners. Cubic splines keep the convergence and remove the corners.

::: definition Cubic spline {#def-spline}
Let $a = x_0 < x_1 < \cdots < x_n = b$. A **cubic spline** with these knots is a function $s$ that is a cubic polynomial on each interval $[x_{i-1}, x_i]$ and is twice continuously differentiable on $[a, b]$. It **interpolates** data $y_i$ if $s(x_i) = y_i$ for all $i$. It is **natural** if $s''(a) = s''(b) = 0$.
:::

Counting conditions: $n$ cubics have $4n$ coefficients; interpolation at both ends of each interval gives $2n$ conditions, and continuity of $s'$ and $s''$ at the $n - 1$ interior knots gives $2n - 2$ more. Two conditions remain free, and the natural spline fixes them by $s'' = 0$ at the ends. (Other choices: the **clamped** spline prescribes $s'(a)$ and $s'(b)$; the **not-a-knot** spline demands continuity of $s'''$ at $x_1$ and $x_{n-1}$.)

::: theorem The natural cubic spline {#thm-spline}
For equally spaced knots $x_i = a + ih$ and any data $y_0, \dots, y_n$ there is exactly one natural cubic spline interpolant. Its second derivatives $M_i = s''(x_i)$ satisfy $M_0 = M_n = 0$ and

$$
M_{i-1} + 4M_i + M_{i+1} = \frac{6}{h^2}\left(y_{i+1} - 2y_i + y_{i-1}\right), \qquad i = 1, \dots, n-1 ,
$$ {#eq-spline-system}

and on $[x_{i-1}, x_i]$

$$
s(x) = M_{i-1}\frac{(x_i - x)^3}{6h} + M_i\frac{(x - x_{i-1})^3}{6h} + \left(y_{i-1} - \frac{M_{i-1}h^2}{6}\right)\frac{x_i - x}{h} + \left(y_i - \frac{M_ih^2}{6}\right)\frac{x - x_{i-1}}{h} .
$$ {#eq-spline-piece}
:::

::: proof
Suppose $s$ is a natural spline interpolant. On $[x_{i-1}, x_i]$, $s''$ is linear (as $s$ is cubic), so it interpolates $M_{i-1}$ and $M_i$ linearly. Integrating twice and choosing the two constants of integration so that $s(x_{i-1}) = y_{i-1}$ and $s(x_i) = y_i$ gives exactly [[#eq-spline-piece]] (check by differentiating twice and evaluating at the endpoints). By construction $s$ and $s''$ are continuous. Differentiating [[#eq-spline-piece]], the one-sided derivatives at $x_i$ are

$$
s'(x_i^-) = \frac{y_i - y_{i-1}}{h} + \frac{h}{6}M_{i-1} + \frac{h}{3}M_i, \qquad s'(x_i^+) = \frac{y_{i+1} - y_i}{h} - \frac h3M_i - \frac h6M_{i+1},
$$

and equating them (continuity of $s'$) gives [[#eq-spline-system]]. Conversely, any solution $M_1, \dots, M_{n-1}$ of [[#eq-spline-system]] with $M_0 = M_n = 0$ defines through [[#eq-spline-piece]] a natural spline interpolant. So it remains to show that the linear system has exactly one solution. Its matrix $A$ is tridiagonal with $4$ on the diagonal and $1$ beside it, so in each row $\abs{a_{ii}} = 4 > 2 \ge \sum_{j\ne i}\abs{a_{ij}}$: it is **strictly diagonally dominant**. Such a matrix is invertible: if $A\mathbf z = \mathbf 0$ with $\mathbf z \ne \mathbf 0$, pick $i$ with $\abs{z_i}$ maximal; then $\abs{a_{ii}}\abs{z_i} = \abs{\sum_{j\ne i}a_{ij}z_j} \le \sum_{j\ne i}\abs{a_{ij}}\abs{z_i} < \abs{a_{ii}}\abs{z_i}$, a contradiction.
:::

The tridiagonal system is solved in $O(n)$ operations ([[numerical-analysis/direct-methods]]), so splines are cheap even for millions of points. For non-uniform knots the same derivation gives a tridiagonal, diagonally dominant system with the spacings $h_i$ as weights.

::: example A natural spline through three points {#ex-spline}
Find the natural cubic spline through $(0, 0)$, $(1, 1)$, $(2, 0)$.
::: solution
Here $h = 1$, $M_0 = M_2 = 0$, and [[#eq-spline-system]] for $i = 1$ reads $4M_1 = 6(0 - 2 + 0) = -12$, so $M_1 = -3$. By [[#eq-spline-piece]], on $[0, 1]$

$$
s(x) = -3\cdot\frac{x^3}{6} + 0 + \left(1 + \frac36\right)x = -\frac{x^3}{2} + \frac32x,
$$

and by symmetry $s(x) = s(2 - x)$ on $[1, 2]$. Checks: $s(0) = 0$, $s(1) = 1$, $s''(0) = 0$, and $s'(1) = -\frac32 + \frac32 = 0$, matching the mirror-image piece. Compare the interpolating parabola $x(2 - x)$: the spline is flatter near the ends, where its curvature must vanish.
:::
:::

::: widget interpolation
f: 1/(1 + 25x^2)
n: 11
method: spline
caption: The natural cubic spline through the same $11$ equally spaced samples of Runge's function that gave the wild degree-$10$ polynomial. The spline follows the function closely everywhere (maximum error about $0.02$). Increase the number of points: the error now *decreases*, roughly like $h^4$ away from the ends.
:::

Splines converge reliably. For a function with continuous fourth derivative, the clamped cubic spline satisfies $\max\abs{f - s} \le \frac{5}{384}h^4\max\abs{f^{(4)}}$, and the natural spline achieves the same $O(h^4)$ rate away from the endpoints (near them its artificial condition $s'' = 0$ limits it to $O(h^2)$ unless $f''$ vanishes there); see de Boor's *A Practical Guide to Splines*. For Runge's function with $n + 1$ equally spaced points, the natural spline errors are $0.022$ ($n = 10$), $0.0032$ ($n = 20$) and $0.000\,28$ ($n = 40$). In Python, `scipy.interpolate.CubicSpline(x, y, bc_type='natural')` constructs the spline of [[#thm-spline]].

::: quiz
Why does interpolating $f$ at more and more equally spaced points with a single polynomial fail for Runge's function, while cubic splines on the same points succeed?
- [ ] Splines use more information about $f$.
- [x] The spline error involves only $h^4$ and the fourth derivative, while the polynomial error involves the $(n+1)$st derivative, which grows very fast, and a node polynomial that is large near the ends.
- [ ] Polynomials of high degree cannot be computed accurately in floating point.
- [ ] Runge's function is not smooth.
::: solution
Both methods use the same data. The polynomial error [[#eq-interp-error]] has the factor $f^{(n+1)}/(n+1)!$, which for Runge's function grows like $5^{n+1}$, times $\omega_{n+1}$, which for equispaced nodes is large near $\pm1$. The spline uses a fixed low degree, so only $f^{(4)}$ enters, multiplied by $h^4 \to 0$. (Rounding errors make things even worse for high-degree equispaced interpolation, but the divergence happens in exact arithmetic too; and Runge's function is infinitely differentiable.)
:::
:::

::: application Splines in design
The word *spline* originally meant a thin flexible strip of wood held in place by weights ("ducks") at chosen points, used by shipbuilders and draughtsmen to draw smooth curves. A bent elastic strip minimises its bending energy, which is approximately $\int(s'')^2$, and the natural cubic spline is exactly the minimiser of this integral among all smooth interpolants ([[#exr-min-curvature]]). Splines and their relatives — B-splines, whose theory goes back to Schoenberg in the 1940s, and Bézier curves, developed for car-body design at Citroën and Renault in the 1960s — are now the standard way of representing curves and surfaces in computer-aided design, computer graphics and digital fonts.
:::

::: history
Interpolation formulas were developed for astronomical and navigational tables. Isaac Newton described interpolation by divided differences in the *Principia* (1687) and in his *Methodus differentialis* (1711). The Lagrange form was published by Edward Waring in 1779, used by Euler in 1783, and presented by Joseph-Louis Lagrange in 1795. Pafnuty Chebyshev introduced the polynomials named after him in 1854, in a study of mechanical linkages. Carl Runge published his famous example in 1901, showing that interpolation at equally spaced points need not converge. Isaac Schoenberg introduced the name and the mathematical theory of splines in 1946.
:::

## Where this leads

Integrating interpolating polynomials gives the quadrature rules of [[numerical-analysis/numerical-integration]], and Gaussian quadrature is built on the roots of orthogonal polynomials, as Chebyshev interpolation is built on the roots of $T_n$. Differentiating interpolants gives finite-difference formulas, and extrapolating them gives Richardson extrapolation and multistep ODE methods ([[numerical-analysis/numerical-odes]]). Least-squares approximation, which fits rather than interpolates noisy data, is in [[linear-algebra/least-squares]], and the trigonometric analogue of polynomial interpolation is the discrete Fourier transform ([[pde/fourier-transform]]).

::: summary
- For distinct nodes $x_0, \dots, x_n$ there is a unique interpolant in $\mathcal P_n$; the Lagrange form is $\sum y_j\ell_j(x)$ with $\ell_j(x_i) = \delta_{ij}$.
- Newton's form $\sum f[x_0, \dots, x_k]\prod_{j<k}(x - x_j)$ uses divided differences, is built up one node at a time and evaluated by nested multiplication. Avoid the ill-conditioned Vandermonde system.
- Error: $f(x) - p_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!}\prod(x - x_i)$; linear interpolation has error at most $M_2h^2/8$.
- Runge's phenomenon: at equally spaced nodes, high-degree interpolants of smooth functions can diverge near the ends.
- Chebyshev nodes $\cos\frac{(2k+1)\pi}{2n+2}$ minimise $\max\abs{\prod(x - x_i)}$ (to $2^{-n}$) and give rapidly convergent interpolants for smooth functions.
- Cubic splines are piecewise cubics with continuous second derivatives; the natural spline solves a tridiagonal, diagonally dominant system and converges like $h^4$ (away from the ends) without oscillation.
:::

## Exercises

::: exercise A parabola {level=1 check="5"}
Find the polynomial of degree at most $2$ through $(-1, 2)$, $(0, 1)$, $(1, 2)$, and evaluate it at $x = 2$.
::: solution
By symmetry the parabola is even: $p(x) = ax^2 + 1$ with $a + 1 = 2$, so $p(x) = x^2 + 1$ (by uniqueness this is *the* interpolant). Then $p(2) = 5$.
:::
:::

::: exercise Divided differences of a cubic {level=1 check="3"}
Compute $f[0, 1, 2]$ for $f(x) = x^3$.
::: solution
$f(0) = 0$, $f(1) = 1$, $f(2) = 8$. First differences: $f[0,1] = 1$, $f[1,2] = 7$. Second: $f[0,1,2] = \frac{7 - 1}{2 - 0} = 3$. (In general $f[a, b, c] = a + b + c$ for $f(x) = x^3$; and $\frac{f''(\xi)}{2} = 3\xi = 3$ at $\xi = 1$.)
:::
:::

::: exercise Linear interpolation of a sine table {level=1 check="1/800"}
What is the error bound of [[#cor-interp-bound]] for linear interpolation of $\sin x$ between nodes $0.1$ apart?
::: solution
$M_2 = \max\abs{\sin''} \le 1$, so the error is at most $\frac{h^2}{8} = \frac{0.01}{8} = \frac{1}{800} = 1.25\times10^{-3}$.
:::
:::

::: exercise Quadratic interpolation of the exponential {level=2}
Let $p_2$ interpolate $e^x$ at $0$, $\frac12$ and $1$. Bound $\abs{e^{0.25} - p_2(0.25)}$ using [[#eq-interp-error]], and compare with the actual error, $0.0123$.
::: solution
$f''' = e^x \le e$ on $[0, 1]$ and $\omega_3(0.25) = 0.25\times(-0.25)\times(-0.75) = 0.046\,875$. So $\abs{e^{0.25} - p_2(0.25)} \le \frac{e}{6}\times0.046\,875 \approx 0.0212$. The actual error $0.0123$ corresponds to $f'''(\xi) = e^\xi \approx 1.57$, i.e. $\xi \approx 0.45$, inside $(0, 1)$ as the theorem says.
:::
:::

::: exercise Three Chebyshev nodes {level=2 check="1/4"}
Find the three Chebyshev nodes on $[-1, 1]$ and the maximum of $\abs{\omega_3}$ for them. Compare with the equispaced nodes $-1, 0, 1$.
::: solution
The zeros of $T_3(x) = 4x^3 - 3x$ are $0$ and $\pm\frac{\sqrt3}{2}$. Then $\omega_3 = x\left(x^2 - \frac34\right) = \frac14T_3$, whose maximum absolute value on $[-1, 1]$ is $\frac14$. For $-1, 0, 1$: $\omega_3 = x^3 - x$, with maximum $\frac{2}{3\sqrt3} \approx 0.385$ at $x = \pm\frac{1}{\sqrt3}$. Chebyshev nodes reduce the bound by a factor of about $1.54$; the gain grows exponentially with the degree.
:::
:::

::: exercise Evaluating a spline {level=2 check="11/16"}
Evaluate the natural spline of [[#ex-spline]] at $x = \frac12$, and compare with the interpolating parabola there.
::: solution
$s\left(\frac12\right) = -\frac{1}{16} + \frac34 = \frac{11}{16} = 0.6875$. The parabola $x(2-x)$ gives $\frac34$ at $x = \frac12$.
:::
:::

::: exercise Reproducing polynomials {level=2}
Show that for distinct nodes $x_0, \dots, x_n$ with $n \ge 1$, $\sum_{j=0}^nx_j\ell_j(x) = x$ for all $x$, and more generally $\sum_jx_j^k\ell_j(x) = x^k$ for $0 \le k \le n$. What goes wrong for $k = n + 1$?
::: solution
$\sum_jx_j^k\ell_j(x)$ is the interpolant of $f(x) = x^k$ at the nodes. For $k \le n$, $f \in \mathcal P_n$ interpolates itself, so by uniqueness the interpolant is $x^k$. For $k = n + 1$, [[#eq-interp-error]] gives $x^{n+1} - p_n(x) = \frac{(n+1)!}{(n+1)!}\omega_{n+1}(x)$, so $\sum_jx_j^{n+1}\ell_j(x) = x^{n+1} - \omega_{n+1}(x)$, which differs from $x^{n+1}$ except at the nodes.
:::
:::

::: exercise Divided differences are scaled derivatives {level=3 #exr-dd-derivative}
Let $f \in C^n[a, b]$ and let $x_0, \dots, x_n$ be distinct points of $[a, b]$. Prove that $f[x_0, \dots, x_n] = \frac{f^{(n)}(\xi)}{n!}$ for some $\xi$ in the smallest interval containing the nodes.
::: hint
Let $p_{n-1}$ interpolate $f$ at $x_0, \dots, x_{n-1}$ and use Newton's form to write $p_n(x_n) - p_{n-1}(x_n)$.
:::
::: solution
By [[#thm-newton-form]], $p_n(x) = p_{n-1}(x) + f[x_0, \dots, x_n]\,\omega_n(x)$ with $\omega_n(x) = \prod_{j<n}(x - x_j)$. At $x = x_n$, $p_n(x_n) = f(x_n)$, so $f(x_n) - p_{n-1}(x_n) = f[x_0, \dots, x_n]\,\omega_n(x_n)$. On the other hand [[#thm-interp-error]] with $n - 1$ in place of $n$ (applied on the smallest interval containing the nodes) gives $f(x_n) - p_{n-1}(x_n) = \frac{f^{(n)}(\xi)}{n!}\omega_n(x_n)$. Since $\omega_n(x_n) \ne 0$, the two expressions give $f[x_0, \dots, x_n] = \frac{f^{(n)}(\xi)}{n!}$.
:::
:::

::: exercise Splines minimise curvature {level=3 #exr-min-curvature}
Let $s$ be the natural cubic spline interpolating data at knots $a = x_0 < \cdots < x_n = b$, and let $g$ be any twice continuously differentiable function with $g(x_i) = s(x_i)$ for all $i$. Prove that $\int_a^b(s'')^2\,dx \le \int_a^b(g'')^2\,dx$.
::: hint
Write $g = s + e$, expand $\int(g'')^2$, and show $\int_a^b s''e''\,dx = 0$ by integrating by parts on each subinterval.
:::
::: solution
With $e = g - s$, $\int(g'')^2 = \int(s'')^2 + 2\int s''e'' + \int(e'')^2$, so it suffices to show $\int_a^bs''e'' = 0$. Integrating by parts,

$$
\int_a^bs''e''\,dx = \Bigl[s''e'\Bigr]_a^b - \sum_{i=1}^n\int_{x_{i-1}}^{x_i}s'''e'\,dx .
$$

The boundary term vanishes because $s''(a) = s''(b) = 0$. On each subinterval $s$ is cubic, so $s''' = c_i$ is constant there, and $\int_{x_{i-1}}^{x_i}c_ie'\,dx = c_i\bigl(e(x_i) - e(x_{i-1})\bigr) = 0$ because $e$ vanishes at every knot. (Integration by parts over $[a, b]$ is valid since $s''e'$ is continuous; we split only the second integral.) Hence $\int(g'')^2 = \int(s'')^2 + \int(e'')^2 \ge \int(s'')^2$, with equality only if $e'' = 0$, i.e. $e$ linear, and then $e = 0$ because it vanishes at two or more knots.
:::
:::

::: exercise Chebyshev polynomials {level=3}
Using $T_n(\cos\theta) = \cos(n\theta)$, prove the recurrence $T_{n+1} = 2xT_n - T_{n-1}$, deduce that $T_n$ is a polynomial of degree $n$ with leading coefficient $2^{n-1}$ for $n \ge 1$, and show that its zeros are $\cos\frac{(2k+1)\pi}{2n}$, $k = 0, \dots, n - 1$.
::: solution
The addition formulas give $\cos((n+1)\theta) + \cos((n-1)\theta) = 2\cos\theta\cos(n\theta)$. With $x = \cos\theta \in [-1, 1]$ this reads $T_{n+1}(x) + T_{n-1}(x) = 2xT_n(x)$. Since $T_0 = 1$ and $T_1 = x$, induction shows that $T_n$ is a polynomial of degree $n$; if its leading coefficient is $2^{n-1}$, that of $2xT_n$ is $2^n$, and subtracting $T_{n-1}$ (degree $n - 1$) does not change it, so $T_{n+1}$ has leading coefficient $2^n$. The base case is $T_1 = x$ with $2^0 = 1$. Finally $T_n(\cos\theta) = 0$ iff $n\theta = \frac\pi2 + k\pi$, and the angles $\theta_k = \frac{(2k+1)\pi}{2n}$, $k = 0, \dots, n-1$, lie in $(0, \pi)$ and give $n$ distinct values $\cos\theta_k$; a polynomial of degree $n$ has no other zeros.
:::
:::
