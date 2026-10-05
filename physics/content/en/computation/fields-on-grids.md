A derivative becomes a subtraction once the unknown is stored only at separated points. Poisson's equation on an interval then becomes a tridiagonal linear system, of the kind solved by hand in [[computation/linear-algebra]]. The wave equation becomes a step forward in time, and the step is safe only when a wave cannot cross more than one cell in one step. Both problems below have answers you can write down before any arithmetic, so a wrong sign or a step that is too long shows up as a number, not as a mood.

The digits in the tables were produced from the schemes written beside them. The integrator of [[computation/integrating-motion]] is the ancestor of the time step. The travelling wave that the grid is trying to follow is the wave of [[oscillations/travelling-waves]].

## The second difference {#second}

Let the nodes be $x_j = j h$, with a fixed spacing $h$, and write $\phi_j$ for the value stored at $x_j$. The centred second difference is

$$
\delta^2 \phi_j = \frac{\phi_{j-1} - 2\phi_j + \phi_{j+1}}{h^2}.
$$

::: definition Centred second difference {#def-delta}
$\delta^2 \phi_j$ is the centred second difference above. It is the candidate for $\phi''(x_j)$. The two neighbours sit at equal distances $h$, so the odd powers in the Taylor expansion cancel and the first error that can survive involves $\phi''''$.
:::

::: proposition Exact on cubics {#prop-exact}
If $\phi$ is a polynomial of degree at most $3$, then $\delta^2 \phi_j = \phi''(x_j)$ at every interior node, for every spacing $h$. If $\phi''''$ is not zero, then

$$
\delta^2 \phi_j = \phi''(x_j) + \frac{h^2}{12}\, \phi''''(x_j) + O(h^4).
$$
::: proof
Expand about $x_j$. The terms in $h$ and $h^3$ cancel between $\phi(x_j+h)$ and $\phi(x_j-h)$, and

$$
\phi(x_j+h) + \phi(x_j-h) = 2\phi(x_j) + h^2 \phi''(x_j) + \frac{h^4}{12}\, \phi''''(x_j) + O(h^6).
$$

Subtract $2\phi(x_j)$ and divide by $h^2$. The remainder written as $O(h^4)$ comes from the sixth derivative, if one exists. A polynomial of degree at most $3$ has $\phi'''' = 0$, so the remainder is zero and the second difference equals $\phi''$.
:::
:::

The loaded string in the next section has $\phi'''' = 0$, so the grid will not be an approximation. It will be the sampled exact solution. The sine example after that has $\phi'''' \neq 0$, and the $h^2/12$ term is the whole story of the table.

## Poisson's equation on an interval {#poisson}

The equation is

$$
-\phi'' = \rho, \qquad \phi(0) = 0, \qquad \phi(1) = 0.
$$

The minus sign is the same convention as $-\nabla^2 \Phi = \rho/\varepsilon_0$ in electrostatics: a positive source makes a positive $\phi$ between grounded ends. At interior nodes the second difference replaces $\phi''$, so

$$
-\delta^2 \phi_j = \rho_j, \qquad \text{that is} \qquad \frac{-\phi_{j-1} + 2\phi_j - \phi_{j+1}}{h^2} = \rho_j.
$$

Endpoint values are not unknowns. They are moved to the right-hand side when a neighbour falls on the boundary.

Take $\rho = 1$. Integrating twice with the two boundary conditions gives

$$
\phi(x) = \frac{x(1-x)}{2}.
$$

The fourth derivative is zero, so [[#prop-exact]] says every uniform grid reproduces this curve at its nodes. The short system below is the check, not a special trick of one spacing.

::: example Three interior nodes {#ex-three}
Take $h = 1/4$. The unknown nodes are $x = 1/4$, $1/2$, $3/4$, with $\phi_0 = \phi_4 = 0$ and $\rho = 1$. Solve the $3 \times 3$ system.
::: solution
Here $h^2 = 1/16$, so $-\phi_{j-1} + 2\phi_j - \phi_{j+1} = 1/16$. With the ends equal to zero,

$$
\begin{aligned}
2\phi_1 - \phi_2 &= \tfrac{1}{16}, \\
-\phi_1 + 2\phi_2 - \phi_3 &= \tfrac{1}{16}, \\
-\phi_2 + 2\phi_3 &= \tfrac{1}{16}.
\end{aligned}
$$

The equations are symmetric, so $\phi_1 = \phi_3$. The middle equation becomes $2\phi_2 - 2\phi_1 = 1/16$, hence $\phi_2 - \phi_1 = 1/32$. Substitute $\phi_2 = \phi_1 + 1/32$ into the first equation:

$$
2\phi_1 - \bigl(\phi_1 + \tfrac{1}{32}\bigr) = \tfrac{1}{16}, \qquad \phi_1 = \tfrac{3}{32}.
$$

Then $\phi_2 = 3/32 + 1/32 = 1/8$ and $\phi_3 = 3/32$. As decimals, the grid holds $0.09375$, $0.125$, $0.09375$.
:::
:::

::: example The same numbers from the formula {#ex-match}
Evaluate $x(1-x)/2$ at $x = 1/4$, $1/2$ and $3/4$.
::: solution
At $x = 1/4$, $(1/4)(3/4)/2 = 3/32$. At $x = 1/2$, $(1/2)(1/2)/2 = 1/8$. At $x = 3/4$, again $3/32$. The three grid values are not close to the exact solution. They are the exact solution. [[#prop-exact]] said they would be, because $\phi'''' = 0$, and the boundary values used by the matrix are the true ones. A program that prints a residual of size $10^{-15}$ for this system is showing rounding in the linear solve. It is not showing a discretisation error. There is none to show.
:::
:::

::: widget plot
f: x*(1-x)/2
x: 0, 1
y: 0, 0.15
caption: The exact solution φ = x(1−x)/2 of −φ'' = 1 with φ(0) = φ(1) = 0. The maximum is 1/8 at x = 1/2. Any uniform grid, solved as in the three-node example, lands on this curve at every node.
:::

A zero source is the other exact case, and it is the one that fixes the two boundary values rather than a sag.

::: example No source, unequal ends {#ex-linear}
Solve $-\phi'' = 0$ with $\phi(0) = 0$ and $\phi(1) = 1$, both exactly and on a grid of spacing $h = 1/N$.
::: solution
The general solution of $\phi'' = 0$ is $\phi(x) = Ax + B$. The conditions give $B = 0$ and $A = 1$, so $\phi(x) = x$. A linear function has vanishing second derivative, and by [[#prop-exact]] the second difference vanishes too. Every interior equation reads $0 = 0$. The nodes are then fixed by the ends: $\phi_j = j h = x_j$. Again the grid matches the exact samples. If both ends were zero, the only linear solution would be $\phi = 0$, and that is also the only grid solution, by the next result.
:::
:::

::: proposition One solution {#prop-unique}
Let $M$ be the $m \times m$ matrix with $2$ on the diagonal and $-1$ on the two adjacent diagonals, and let the grid values next to this block be zero. Then $M$ is positive definite. The discrete equation $M\phi = h^2 \rho$, with those zero ends, has exactly one solution.
::: proof
Let $v_0 = v_{m+1} = 0$. The quadratic form is

$$
v \cdot M v = \sum_{i=1}^{m} v_i \bigl(2v_i - v_{i-1} - v_{i+1}\bigr).
$$

Expand $\sum_{i=0}^{m} (v_{i+1} - v_i)^2$. The boundary terms $v_0$ and $v_{m+1}$ drop out, and the cross terms run over each neighbouring pair once, so the sum equals $v \cdot M v$. A sum of squares is zero only when every difference $v_{i+1} - v_i$ is zero. With $v_0 = 0$ that forces every $v_i = 0$. Thus $v \cdot M v > 0$ for $v \neq 0$, $M$ is invertible, and the right-hand side $h^2 \rho$ produces one $\phi$.
:::
:::

The three-node matrix in [[#ex-three]] is this $M$. Its solution was found by elimination and did not branch. [[#prop-unique]] is why a second, different triple cannot also satisfy the same equations.

::: warning The sign in front of the second derivative
The unknown in $-\phi'' = 1$ with zero ends is positive. The matrix that expresses that equation has $+2$ on the diagonal. Building the opposite matrix, with $-2$ on the diagonal and the same right-hand side $+1$, solves $\phi'' = 1$ instead. On a single interior node at $x = 1/2$ and $h = 1/2$, the correct equation is $2\phi / h^2 = 1$, so $8\phi = 1$ and $\phi = 1/8$. The reversed equation gives $\phi = -1/8$. The shape is an upside-down copy of the true sag. Checking the sign of the middle value, before admiring the plot, catches this.
:::

## A solution the grid misses {#sine}

Now let the exact solution be $\phi(x) = \sin(\pi x)$, so $\phi(0) = \phi(1) = 0$ and

$$
-\phi'' = \pi^2 \sin(\pi x).
$$

The fourth derivative is $\pi^4 \sin(\pi x)$, which is not zero. [[#prop-exact]] predicts an error proportional to $h^2$. On this particular shape the error can be written in closed form, so the prediction can be checked rather than fitted.

::: proposition The sine mode on the grid {#prop-sine}
With $-\delta^2 \phi_j = \pi^2 \sin(\pi x_j)$ and $\phi = 0$ at the ends, the grid solution on $x_j = j h$, $h = 1/N$, is

$$
\phi_j = \alpha(h)\, \sin(\pi x_j), \qquad \alpha(h) = \left( \frac{\pi h}{2 \sin(\pi h / 2)} \right)^2.
$$

The error at the midpoint is $\alpha(h) - 1$. For small $h$,

$$
\alpha(h) - 1 = \frac{\pi^2 h^2}{12} + O(h^4).
$$
::: proof
The second difference of $\sin(\pi x_j)$ is a standard trigonometric identity. The neighbours contribute $\sin(\pi(x_j \pm h)) = \sin(\pi x_j)\cos(\pi h) \pm \cos(\pi x_j)\sin(\pi h)$, so

$$
\delta^2 \sin(\pi x_j) = \frac{2\cos(\pi h) - 2}{h^2}\, \sin(\pi x_j) = -\frac{4}{h^2}\sin^2\Bigl(\frac{\pi h}{2}\Bigr) \sin(\pi x_j).
$$

Therefore $-\delta^2$ multiplies this mode by $\lambda_h = (4/h^2)\sin^2(\pi h / 2)$. The discrete equation asks $\lambda_h \phi_j = \pi^2 \sin(\pi x_j)$. One solution is $\phi_j = (\pi^2 / \lambda_h) \sin(\pi x_j)$, and $\pi^2 / \lambda_h$ is $\alpha(h)$. [[#prop-unique]] says there is no other solution. The expansion $\sin \theta = \theta - \theta^3/6 + O(\theta^5)$ with $\theta = \pi h / 2$ gives $\theta / \sin \theta = 1 + \theta^2/6 + O(\theta^4)$, and squaring produces $1 + \theta^2/3 + O(\theta^4)$. Then $\theta^2/3 = \pi^2 h^2 / 12$.
:::
:::

The formula is easy to evaluate at a coarse spacing, where a $3 \times 3$ solve and the closed form must agree.

::: example One unknown, at the midpoint {#ex-one}
Take $h = 1/2$, so the only unknown is $\phi(1/2)$. Compute it from the difference equation and from $\alpha(h)$.
::: solution
The ends are zero, $h^2 = 1/4$, and $\sin(\pi/2) = 1$. The equation $-\delta^2 \phi = \pi^2$ reads $2\phi / h^2 = \pi^2$, so $8\phi = \pi^2$ and

$$
\phi = \frac{\pi^2}{8} = 1.233701.
$$

The exact midpoint value is $1$. The error is $0.233701$. From the proposition, $\alpha(1/2) = \bigl(\pi/2 \big/ \bigl(2 \sin(\pi/4)\bigr)\bigr)^2$. Since $\sin(\pi/4) = \sqrt{2}/2$, this is $\pi^2/8$ as well. The leading term $\pi^2 h^2/12 = \pi^2/48 = 0.205617$ is in the right direction and still short of $0.233701$. At $h = 1/2$ the $O(h^4)$ piece has not yet become small.
:::
:::

Halving $h$ divides the leading error by four. The table is $\alpha(h) - 1$ at the midpoint, printed to six decimals.

| $h$ | $\phi(1/2)$ on the grid | error $\alpha(h)-1$ | $\pi^2 h^2/12$ |
| --- | --- | --- | --- |
| $1/2$ | $1.233701$ | $0.233701$ | $0.205617$ |
| $1/4$ | $1.053029$ | $0.053029$ | $0.051404$ |
| $1/8$ | $1.012951$ | $0.012951$ | $0.012851$ |
| $1/16$ | $1.003219$ | $0.003219$ | $0.003213$ |
| $1/32$ | $1.000804$ | $0.000804$ | $0.000804$ |

From $h = 1/8$ to $h = 1/16$ the error falls by a factor $0.012951/0.003219 \approx 4.023$. From $h = 1/16$ to $h = 1/32$ the factor is $4.006$. The design of the second difference was an $h^2$ truncation, and the solved equation inherits it. At $h = 1/32$ the leading term and the true error agree at the six decimals printed.

::: widget plot
f: sin(pi*x)
x: 0, 1
y: 0, 1.25
caption: The exact solution sin(πx) of −φ'' = π² sin(πx) with zero ends. The grid does not land on this curve. At h = 1/4 the midpoint grid value is 1.053, above the true value 1. Halving h divides that excess by about four.
:::

Two habits follow. First, agreement on $\rho = 1$ was a test that the matrix was built correctly, because the error had to be zero. It was not a measurement of the method's order. Second, a single fine-looking spacing does not reveal the order. Two spacings do, and the factor should be near $4$ for this scheme. A factor near $2$ would say that the error is only first order, which for this centred difference means a bug, usually a one-sided end or a spacing that is not the $h$ used in the denominator.

The residual test of [[computation/linear-algebra]] still applies, and it answers a different question. Once $\phi$ has been computed, form $r = h^2 \rho - M\phi$ from the matrix you actually handed to the solver. For [[#ex-three]] that residual is the zero vector. If instead you insert the exact samples of $\sin(\pi x)$ into $M$, the residual is not zero: those samples do not satisfy the discrete equation. A tiny residual means you solved the matrix you built. It does not mean the matrix was the differential equation.

::: quiz
For $-\phi'' = 1$ on $(0, 1)$ with $\phi(0) = \phi(1) = 0$, a grid of spacing $h = 1/4$ produces three interior values. Which statement is true?
- [ ] They differ from $x(1-x)/2$ by an error of size about $h^2$.
- [x] They equal $x(1-x)/2$ at the three nodes. The fourth derivative of that solution is zero, so the second difference is exact.
- [ ] The matrix is singular, and any linear function is another solution.
- [ ] The values depend on a time-step restriction, because every grid scheme for a second derivative is a wave scheme.
::: solution
[[#prop-exact]] and the explicit solve in [[#ex-three]] give $3/32$, $1/8$, $3/32$, which are the samples of $x(1-x)/2$. The matrix $M$ is positive definite by [[#prop-unique]], so the solution does not have a second, linear, competitor. Nothing in this boundary-value problem is stepped in time.
:::
:::

## The wave equation {#wave}

The one-dimensional wave equation

$$
\frac{\partial^2 u}{\partial t^2} = c^2 \frac{\partial^2 u}{\partial x^2}, \qquad u(0, t) = u(1, t) = 0,
$$

with $u(x, 0) = \sin(\pi x)$ and $\partial u/\partial t = 0$ at $t = 0$, has the exact solution

$$
u(x, t) = \sin(\pi x)\, \cos(\pi c\, t).
$$

Information travels at speed $c$. On a grid, the centred scheme replaces both second derivatives. With time index $n$ and $u_j^n \approx u(x_j, t_n)$,

$$
\frac{u_j^{n+1} - 2 u_j^n + u_j^{n-1}}{\Delta t^2} = c^2\, \delta^2 u_j^n.
$$

Rearranged, with the Courant number $r = c\, \Delta t / h$,

$$
u_j^{n+1} = 2 u_j^n - u_j^{n-1} + r^2 \bigl(u_{j+1}^n - 2 u_j^n + u_{j-1}^n\bigr).
$$

The ends stay zero at every time level. The scheme needs two time levels to start. For zero initial velocity the Taylor step $u(\Delta t) = u(0) + \tfrac{1}{2} \Delta t^2 u_{tt}(0) + O(\Delta t^4)$, with $u_{tt}$ replaced by $c^2 \delta^2 u$, gives the first level

$$
u_j^1 = u_j^0 + \frac{r^2}{2} \bigl(u_{j+1}^0 - 2 u_j^0 + u_{j-1}^0\bigr).
$$

::: definition Courant number {#def-courant}
The Courant number of this scheme is $r = c\, \Delta t / h$. It is the number of grid cells a true wave crosses in one time step. The scheme uses, at time level $n$, only the values at $j-1$, $j$ and $j+1$. In one step the numerical signal moves at most one cell.
:::

::: algorithm Centred wave step {#alg-wave}
Store two rows, the values at $t_n$ and at $t_{n-1}$, with zeros at the ends. Form the next row from the displayed update. Then discard the oldest row. To start from rest, form the first row from the half-step formula above rather than by inventing a row at $t = -\Delta t$.
:::

When $r = 1$ the half-step formula collapses, by algebra, to the average of the two neighbours:

$$
u_j^1 = \frac{u_{j+1}^0 + u_{j-1}^0}{2}.
$$

That average is d'Alembert's formula. The later steps stay on it.

::: proposition Exact at $r = 1$ {#prop-exact-wave}
Take $c = 1$ and $\Delta t = h$, and take the initial velocity to be zero. Let $f$ be the initial samples, extended off $[0, 1]$ so that the fixed ends are the odd reflection (the value just outside an end is the negative of the value just inside). Then at every node and every time level $t_n = n h$,

$$
u_j^n = \frac{f(x_j + t_n) + f(x_j - t_n)}{2},
$$

which is the exact solution of the wave equation sampled on the grid.
::: proof
At $n = 0$ the formula is $f(x_j)$. At $n = 1$, d'Alembert's formula is the neighbour average, and the half-step with $r = 1$ is that same average. Suppose the formula holds at levels $n$ and $n-1$. The update with $r = 1$ is $u_j^{n+1} = u_{j+1}^n + u_{j-1}^n - u_j^{n-1}$. Substitute the inductive expression. The four shifted copies of $f$ coming from the two neighbours are $f$ at $x_j + (n+1)h$, $x_j - (n-1)h$, $x_j + (n-1)h$ and $x_j - (n+1)h$. Subtracting $u_j^{n-1}$ cancels the two copies at distance $(n-1)h$. What remains is $f$ at $x_j \pm (n+1)h$, averaged, which is the formula at level $n+1$. The odd reflection is what makes an endpoint neighbour equal to the boundary value $0$ already stored in the array, so the stencil never needs a value the grid does not hold.
:::
:::

::: example The sine wave with the step equal to the spacing {#ex-cfl-one}
Take $c = 1$, $h = 1/4$ and $\Delta t = 1/4$, so $r = 1$, and $u(x, 0) = \sin(\pi x)$. Compare the grid with $\sin(\pi x)\cos(\pi t)$ through one period.
::: solution
[[#prop-exact-wave]] applies directly: $\sin(\pi x)$ is already the odd extension of itself. Running the step gives node values that differ from $\sin(\pi x)\cos(\pi t)$ by at most about $2 \times 10^{-16}$ through $t = 2$. That difference is rounding in the additions. It is not a truncation error. At $t = 1$, $\cos(\pi) = -1$, and the interior values are $-0.707107$, $-1$, $-0.707107$, the samples of $-\sin(\pi x)$.

The same initial data with a smaller Courant number are no longer exact. On $h = 1/8$ and $r = 1/2$, so $\Delta t = 1/16$, the midpoint value at $t = 1$ comes out $-0.999885$ instead of $-1$. The error is $1.152 \times 10^{-4}$. The scheme is still accurate. It has left the special cancellation that makes $r = 1$ identical to d'Alembert.
:::
:::

Exactness at one value of $r$ does not licence a larger $r$. If $r > 1$, the true domain of dependence reaches more than one cell away, and the stencil has not heard from those cells. The mode that punishes this is the shortest wave the grid can hold.

::: proposition The Courant condition {#prop-cfl}
For the centred scheme on an infinite grid, write a trial mode $u_j^n = \xi^n e^{i k j h}$. The values $\xi$ are the two roots of

$$
\xi^2 - 2A\xi + 1 = 0, \qquad A = 1 - 2 r^2 \sin^2\Bigl(\frac{k h}{2}\Bigr).
$$

Both roots have modulus $1$ for every wavenumber $k$ if and only if $r \le 1$. If $r > 1$, the root belonging to $\sin^2(kh/2) = 1$ has modulus greater than $1$, and that mode grows at every step.
::: proof
Substitute the trial mode into the update. The second difference contributes $2\cos(kh) - 2 = -4\sin^2(kh/2)$, and the powers of $\xi$ rearrange to the quadratic. The product of the two roots is $1$. They lie on the unit circle precisely when they are complex conjugates or a real pair $\pm 1$, which is the condition $A^2 \le 1$, that is $|A| \le 1$. For $r \le 1$ one has $0 \le 2 r^2 \sin^2(kh/2) \le 2$, so $A$ lies in $[-1, 1]$. For $r > 1$ the choice $\sin^2(kh/2) = 1$ gives $A = 1 - 2r^2 < -1$, so one root is real and its modulus is $|A| + \sqrt{A^2 - 1} > 1$.
:::
:::

On a short grid the same fact is visible without a continuum of wavenumbers. Three interior nodes, $h = 1/4$, and the $6 \times 6$ matrix that advances the pair of time levels $(u^n, u^{n-1})$, were diagonalised directly. At $r = 1$ every eigenvalue has modulus $1$. At $r = 1.2$ the spectral radius is $2.5196$: one mode is multiplied by $2.5196$ at every step, and the other modes keep modulus $1$.

::: example A one-percent short wave {#ex-grow}
Take $c = 1$, $h = 1/4$ and three interior nodes. Start from $\sin(\pi x)$ plus the short wave $0.01$, $-0.01$, $0.01$. Run the centred scheme at $r = 1$ and at $r = 1.2$.
::: solution
The initial interior values are $0.717107$, $0.990000$, $0.717107$. The largest absolute value is $0.990$.

At $r = 1$, $\Delta t = 0.25$. At $t = 2$, after eight steps, the interior values have returned to $0.717107$, $0.990000$, $0.717107$. The added short wave rode along with the exact oscillation. Nothing grew.

At $r = 1.2$, $\Delta t = 0.30$. The same initial row produces these largest absolute values:

| step | $t$ | largest $\|u\|$ |
| --- | --- | --- |
| $0$ | $0$ | $0.990$ |
| $8$ | $2.4$ | $9.584$ |
| $12$ | $3.6$ | $394.6$ |
| $14$ | $4.2$ | $2507$ |

The interior row at $t = 2.4$ is $7.086$, $-9.584$, $7.086$, already the shape of the short wave rather than of $\sin(\pi x)$. From $t = 3.6$ to $t = 3.9$ to $t = 4.2$ the largest value runs $394.6$, $996.3$, $2507$, and the successive ratios are $2.525$ and $2.516$. Those ratios are the spectral radius $2.5196$, seen once the growing mode has overwhelmed the bounded ones. The exact string still has amplitude $1$. The grid does not.

The same $r = 1.2$ started from a pure $\sin(\pi x)$, with no added short wave, stayed of size at most $1$ through $t = 6$ in this arithmetic. The unstable mode was absent from the initial data, so twenty steps did not reveal it. Roundoff will eventually seed it. Waiting for that accident is not a test.
:::
:::

::: warning A consistent scheme can still be useless
The centred scheme is consistent: as $h$ and $\Delta t$ go to zero with $r$ held fixed, the Taylor remainder of each second difference goes to zero, and a smooth solution of the wave equation satisfies the stencil up to that remainder. Consistency did not stop the run at $r = 1.2$. The truncation error is small only for smooth shapes. The mode that grows is the least smooth shape on the grid, and for that mode the amplification is $2.52$ per step whenever $r = 1.2$, however small $h$ is, so long as $\Delta t = 1.2\, h/c$. Refining the grid while keeping $r > 1$ refines the explosion. It does not remove it. A plot of one sine-like run, at one time, is not evidence that the step is safe. Compare two Courant numbers, or add a short-wave seed of a size you chose, and require that seed to stay at that size.
:::

## What is left for the solver {#solver}

Poisson's equation on $m$ interior nodes is $M\phi = h^2 \rho$, with $M$ the matrix of [[#prop-unique]]. For $m = 3$ and $h = 1/4$ that is the system solved in [[#ex-three]]. Gaussian elimination on a tridiagonal matrix costs a small multiple of $m$ operations, not the $m^3/3$ of a full matrix. The residual $h^2 \rho - M\phi$ is still the right acceptance test, and it is the same residual as in [[computation/linear-algebra]].

The wave step is not a linear solve. It is a recurrence. Its acceptance tests are the ones already computed: at $r = 1$ the sine samples must come back to rounding error, and at $r > 1$ a short-wave seed must not be allowed to pass unnoticed. Energy of the continuous string is conserved. A discrete energy can be written for this scheme and is conserved when $r \le 1$, but a growing solution at $r > 1$ will make any such energy grow as well. Watching a single scalar stay flat for a few steps, while $r > 1$, only means the unstable mode has not yet risen above the rounding or the seed.

The passage from this interval to a membrane or a potential in the plane is the same second difference written in each coordinate. The matrix becomes larger and is no longer tridiagonal, and the unknown at a node couples to four neighbours rather than two. The tests do not change. A quadratic or bilinear exact solution must be recovered to rounding. A sine mode must show an error that falls by about four when the spacing is halved. A wave step must be run at a Courant number at most $1$, and a short-wave seed must be seen to stay bounded.

::: history Richardson, and Courant, Friedrichs, Lewy
The calculus of finite differences was already a textbook subject in the nineteenth century. George Boole's *Treatise on the Calculus of Finite Differences* appeared in 1860. What was new in the twentieth century was the decision to step a physical partial differential equation on a grid as a forecast. Lewis Fry Richardson carried one such calculation through by hand, mostly with a slide rule, and published it as *Weather Prediction by Numerical Process* in 1922. His surface-pressure change, over six hours at the central point, came out at $145$ hPa. That tendency is far too large for a real six-hour change, and Richardson judged the arithmetic a fair deduction from an unnatural initial distribution. The failure did not remove the method. It showed that the initial data and the step have to be examined, which is the same demand as the residual and the Courant number in this chapter.

The restriction $r \le 1$ is the 1928 condition of Richard Courant, Kurt Friedrichs and Hans Lewy, in their paper on partial difference equations in *Mathematische Annalen*. Their statement is about domains of dependence: the numerical stencil must be wide enough to have heard from every point the true solution depends on. For the centred wave scheme that geometric demand is $c\, \Delta t \le h$, and [[#prop-cfl]] is the same demand read as a growing mode.
:::

::: summary
- The centred second difference equals $\phi''$ on polynomials of degree at most $3$. The next term is $(h^2/12)\phi''''$.
- For $-\phi'' = 1$ with zero ends, $\phi = x(1-x)/2$. At spacing $h = 1/4$ the grid values are exactly $3/32$, $1/8$, $3/32$.
- The tridiagonal matrix with $2$ on the diagonal and $-1$ beside it is positive definite when the ends are zero, so the discrete Poisson problem has one solution.
- For $-\phi'' = \pi^2 \sin(\pi x)$ the grid multiplies $\sin(\pi x)$ by $\alpha(h) = \bigl(\pi h / (2\sin(\pi h/2))\bigr)^2$. The midpoint error falls by a factor of about $4$ each time $h$ is halved, and at $h = 1/32$ it is $0.000804$.
- The centred wave scheme with $r = c\, \Delta t / h = 1$ and zero initial velocity reproduces d'Alembert's formula on the nodes. At $r = 1.2$ a short wave of amplitude $0.01$ has produced a grid value of size $2507$ by $t = 4.2$.
- A residual near zero means the linear system was solved. It does not mean a wave step with $r > 1$ is safe, and it does not turn an inexact difference into an exact one.
:::

## Exercises

::: exercise Midpoint of the sag {level=1 check="0.125"}
For $-\phi'' = 1$ on $(0, 1)$ with zero ends, what is the exact value of $\phi(1/2)$?
::: solution
$\phi(x) = x(1-x)/2$, so $\phi(1/2) = 1/8 = 0.125$. The three-node grid of [[#ex-three]] stores this same value at the middle node.
:::
:::

::: exercise The quarter-point {level=1 check="0.09375"}
Evaluate the same exact solution at $x = 1/4$.
::: solution
$(1/4)(3/4)/2 = 3/32 = 0.09375$. This is $\phi_1$ in the $h = 1/4$ system.
:::
:::

::: exercise A Courant number {level=1 check="0.8"}
A wave of speed $c = 2$ is stepped with $h = 0.1$ and $\Delta t = 0.04$. What is $r = c\, \Delta t / h$?
::: solution
$r = 2 \times 0.04 / 0.1 = 0.08/0.1 = 0.8$. Since $r \le 1$, [[#prop-cfl]] does not predict a growing mode. The step is inside the allowed range. It is not the special value $r = 1$ at which the scheme copies d'Alembert exactly.
:::
:::

::: exercise One node, constant source {level=2 check="0.125"}
Take $h = 1/2$ and $-\phi'' = 1$, with $\phi(0) = \phi(1) = 0$. There is one unknown, at $x = 1/2$. Find it from the difference equation.
::: solution
$h^2 = 1/4$ and both neighbours are zero, so $2\phi / h^2 = 1$. Thus $8\phi = 1$ and $\phi = 1/8 = 0.125$. The exact midpoint value is also $1/8$. A constant source has a quadratic solution, and the second difference of a quadratic is exact.
:::
:::

::: exercise Right-hand side at $h = 1/4$ {level=2 check="0.0625"}
In [[#ex-three]] the cleared equations are of the form $-\phi_{j-1} + 2\phi_j - \phi_{j+1} = h^2$, because $\rho = 1$. What is $h^2$ when $h = 1/4$?
::: solution
$(1/4)^2 = 1/16 = 0.0625$. Each equation in that example has right-hand side $1/16$.
:::
:::

::: exercise The order, as an integer {level=2 check="2"}
In the sine table, halving $h$ multiplies the midpoint error by a factor that approaches $4$. The error is then proportional to $h$ to what integer power?
::: solution
A factor of $4$ on halving $h$ is $(1/2)^p = 1/4$, so $p = 2$. This is the power in [[#prop-exact]] and in the expansion $\alpha(h) - 1 \approx \pi^2 h^2 / 12$ of [[#prop-sine]]. It is not the Courant number, and it is not $4$ itself. The $4$ is the factor, the $2$ is the order.
:::
:::

::: exercise Largest safe step {level=2 check="0.25"}
For $c = 1$ and $h = 1/4$, what is the largest $\Delta t$ allowed by $r \le 1$?
::: solution
$c\, \Delta t / h \le 1$ gives $\Delta t \le h/c = 1/4 = 0.25$. At that value the scheme is the exact grid d'Alembert formula of [[#prop-exact-wave]]. The run in [[#ex-grow]] used $\Delta t = 0.30$, which is past this bound, and the short wave grew.
:::
:::

::: exercise Why the sag is exact {level=3}
Let $\phi(x) = x(1-x)/2$. Compute $\phi(x+h) - 2\phi(x) + \phi(x-h)$ directly, divide by $h^2$, and conclude that the discrete Poisson equation with $\rho = 1$ is satisfied by the samples of $\phi$ at any spacing.
::: solution
$\phi(x+h) = (x+h)(1-x-h)/2 = \phi(x) + (h/2)(1-2x) - h^2/2$, and $\phi(x-h) = \phi(x) - (h/2)(1-2x) - h^2/2$. Adding and subtracting $2\phi(x)$ leaves $-h^2$. Dividing by $h^2$ gives $-1$, so $\delta^2 \phi = -1$ and $-\delta^2 \phi = 1$. Every interior equation is satisfied exactly. Together with the matching boundary values and [[#prop-unique]], the grid solution equals the samples.
:::
:::

::: exercise The growing root {level=3}
For the quadratic in [[#prop-cfl]], take $\sin^2(kh/2) = 1$ and $r > 1$. Show that one root has modulus greater than $1$, and that the other has modulus less than $1$.
::: solution
The coefficient $A$ equals $1 - 2r^2$, which is less than $-1$. The roots are $A \pm \sqrt{A^2 - 1}$. Both are real. Their product is $1$, from the constant term of $\xi^2 - 2A\xi + 1$. They cannot both have modulus $1$, because $|A| > 1$ puts them off the unit circle, and they cannot both have modulus greater than $1$, because the product would then exceed $1$. So one modulus is greater than $1$ and the other is its reciprocal. That larger root is the growth per step of the shortest grid wave.
:::
:::

::: quiz
A centred wave computation uses $c\, \Delta t = 1.2\, h$, on the three-node grid of this chapter, starting from $\sin(\pi x)$ plus a short wave of amplitude $0.01$. Which statement matches the run?
- [ ] The values stay within $1$ of the exact wave for as long as the step is iterated, because the scheme is consistent.
- [ ] Both $r = 1.2$ and $r = 1$ grow, because every finite-difference wave scheme is unstable.
- [x] At $r = 1.2$ the largest grid value is about $9.6$ by $t = 2.4$ and about $2507$ by $t = 4.2$. The same initial row at $r = 1$ has returned to its initial size at $t = 2$.
- [ ] The growth is a physical resonance of the string, present in $\sin(\pi x)\cos(\pi c t)$ when $r = 1.2$.
::: solution
[[#ex-grow]] records those sizes. Consistency of the stencil for smooth functions does not bound the shortest grid wave. The exact solution of the differential equation keeps amplitude $1$ at every Courant number. The number $r$ is a property of the step, not of the string.
:::
:::
