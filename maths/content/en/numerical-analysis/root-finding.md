In 1669 Isaac Newton illustrated a new method on the cubic equation

$$
x^3 - 2x - 5 = 0 .
$$

There is a formula for the roots of a cubic, but it is clumsy, and for polynomials of degree five or more no general formula in radicals exists at all (the Abel–Ruffini theorem). Equations such as $x = \cos x$, or Kepler's equation $M = E - e\sin E$ for the position of a planet, have no closed-form solutions whatsoever. Yet a computer finds their roots to sixteen digits in microseconds. It does so by **iteration**: start from a guess and improve it repeatedly, producing a sequence $x_0, x_1, x_2, \dots$ that converges to a root.

This chapter studies the four basic iterations — bisection, fixed-point iteration, Newton's method and the secant method. For each we prove when it converges and *how fast*, and we meet the key concept for comparing iterative methods, the **order of convergence**. Throughout, the problem is: given a continuous function $f$, find $x^*$ with $f(x^*) = 0$. Our running example is Newton's cubic, whose real root is

$$
x^* = 2.094\,551\,481\,542\,326\,591\ldots
$$

## Bisection

The intermediate value theorem ([[calculus-1/continuity]]) guarantees a root wherever a continuous function changes sign. **Bisection** turns this existence proof into an algorithm: halve the interval, keep the half on which the sign still changes, and repeat.

::: algorithm Bisection {#alg-bisection}
Given $f$ continuous on $[a, b]$ with $f(a)f(b) < 0$ and a tolerance $\tau > 0$: while $b - a > 2\tau$, let $c = \frac{a+b}{2}$; if $f(a)f(c) \le 0$ replace $b$ by $c$, otherwise replace $a$ by $c$. Return the midpoint $\frac{a+b}{2}$.
:::

```python
def bisection(f, a, b, tol=1e-12):
    fa = f(a)
    assert fa * f(b) < 0, "f must change sign on [a, b]"
    while b - a > 2 * tol:
        c = (a + b) / 2
        fc = f(c)
        if fa * fc <= 0:
            b = c                  # root in [a, c]
        else:
            a, fa = c, fc          # root in [c, b]
    return (a + b) / 2
```

::: theorem Convergence of bisection {#thm-bisection}
Let $f$ be continuous on $[a, b]$ with $f(a)f(b) < 0$. Let $[a_k, b_k]$ be the interval after $k$ halvings and $c_k = \frac{a_k + b_k}{2}$. Then there is a root $x^*$ of $f$ in $[a, b]$ with

$$
\abs{c_k - x^*} \le \frac{b - a}{2^{k+1}} \qquad (k = 0, 1, 2, \dots).
$$ {#eq-bisection}
:::

::: proof
By construction $f(a_k)f(b_k) \le 0$, $[a_{k+1}, b_{k+1}] \subseteq [a_k, b_k]$ and $b_k - a_k = (b - a)/2^k$. The left endpoints form an increasing sequence bounded by $b$, and the right endpoints a decreasing sequence bounded by $a$, so both converge ([[calculus-2/sequences#thm-mct]]), and since $b_k - a_k \to 0$ they have the same limit $x^*$, which lies in every $[a_k, b_k]$. By continuity, $f(a_k)f(b_k) \to f(x^*)^2$, and since every $f(a_k)f(b_k) \le 0$, also $f(x^*)^2 \le 0$, so $f(x^*) = 0$. Finally $x^*$ and $c_k$ both lie in $[a_k, b_k]$ and $c_k$ is its midpoint, so $\abs{c_k - x^*} \le \frac12(b_k - a_k) = \frac{b-a}{2^{k+1}}$.
:::

Bisection is slow but utterly reliable: each step gains exactly one binary digit, so about $3.3$ steps per decimal digit, and the number of steps needed for a given accuracy is known in advance.

::: example Bisection on Newton's cubic {#ex-bisection}
Apply bisection to $f(x) = x^3 - 2x - 5$ on $[2, 3]$. After how many halvings is the error guaranteed to be below $10^{-6}$?
::: solution
Since $f(2) = -1 < 0$ and $f(3) = 16 > 0$, there is a root in $[2, 3]$. The first midpoint is $c_0 = 2.5$ with $f(2.5) = 5.625 > 0$, so the root lies in $[2, 2.5]$; then $c_1 = 2.25$ with $f(2.25) = 1.89 > 0$, so it lies in $[2, 2.25]$; and so on:

| $k$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $10$ | $15$ | $20$ |
|---|---|---|---|---|---|---|---|---|---|
| $c_k$ | $2.5$ | $2.25$ | $2.125$ | $2.0625$ | $2.093\,75$ | $2.109\,375$ | $2.094\,238$ | $2.094\,558\,7$ | $2.094\,551\,56$ |
| $\abs{c_k - x^*}$ | $0.41$ | $0.16$ | $0.030$ | $0.032$ | $0.000\,80$ | $0.015$ | $3.1\times10^{-4}$ | $7.2\times10^{-6}$ | $8.2\times10^{-8}$ |

The error does not decrease monotonically — at $k = 4$ the midpoint happens to land close to the root — but it always stays below the bound $2^{-(k+1)}$ of [[#eq-bisection]]. That bound is below $10^{-6}$ once $2^{k+1} > 10^6$, i.e. $k + 1 \ge 20$: after $k = 19$ halvings the midpoint is guaranteed to be within $10^{-6}$ of the root, whatever $f$ looks like.
:::
:::

::: widget newton
f: x^3 - 2x - 5
method: bisection
x0: 2
x1: 3
steps: 8
caption: Bisection on Newton's cubic, starting from $[2, 3]$. Step through the iteration: each step evaluates $f$ at the midpoint and keeps the half-interval on which the sign changes. The table shows the interval shrinking by exactly a factor $2$ per step, whatever the shape of the graph.
:::

## Fixed-point iteration

Many equations come naturally in the form $x = g(x)$, and any equation $f(x) = 0$ can be rewritten that way, for instance as $x = x - f(x)$ or $x = x - \lambda f(x)$. A solution of $x = g(x)$ is a **fixed point** of $g$, and the obvious algorithm is to iterate:

$$
x_{n+1} = g(x_n), \qquad n = 0, 1, 2, \dots
$$ {#eq-fixed-point}

If $g$ is continuous and $x_n \to x^*$, then letting $n\to\infty$ gives $x^* = g(x^*)$, so the limit is a fixed point. The question is when the iteration converges, and the answer is a contraction condition.

::: theorem Contraction mapping theorem {#thm-contraction}
Let $g$ map the closed interval $[a, b]$ into itself, and suppose there is a constant $L < 1$ with

$$
\abs{g(x) - g(y)} \le L\abs{x - y} \qquad\text{for all } x, y \in [a, b].
$$

Then $g$ has exactly one fixed point $x^*$ in $[a, b]$; for every $x_0 \in [a, b]$ the iterates [[#eq-fixed-point]] converge to $x^*$; and

$$
\abs{x_n - x^*} \le L^n\abs{x_0 - x^*}, \qquad \abs{x_n - x^*} \le \frac{L}{1 - L}\abs{x_n - x_{n-1}} .
$$ {#eq-contraction}
:::

::: proof
*Existence.* $g$ is continuous (the contraction condition implies it). The function $h(x) = g(x) - x$ satisfies $h(a) = g(a) - a \ge 0$ and $h(b) = g(b) - b \le 0$ since $g(a), g(b) \in [a, b]$, so by the intermediate value theorem $h$ has a zero $x^*$.

*Uniqueness.* If $x^*$ and $y^*$ are fixed points, $\abs{x^* - y^*} = \abs{g(x^*) - g(y^*)} \le L\abs{x^* - y^*}$, which forces $\abs{x^* - y^*} = 0$ because $L < 1$.

*Convergence.* All iterates stay in $[a, b]$, and $\abs{x_{n+1} - x^*} = \abs{g(x_n) - g(x^*)} \le L\abs{x_n - x^*}$. By induction $\abs{x_n - x^*} \le L^n\abs{x_0 - x^*} \to 0$.

*A posteriori bound.* By the triangle inequality, $\abs{x_{n-1} - x^*} \le \abs{x_{n-1} - x_n} + \abs{x_n - x^*} \le \abs{x_n - x_{n-1}} + L\abs{x_{n-1} - x^*}$, so $\abs{x_{n-1} - x^*} \le \frac{1}{1 - L}\abs{x_n - x_{n-1}}$, and then $\abs{x_n - x^*} \le L\abs{x_{n-1} - x^*} \le \frac{L}{1 - L}\abs{x_n - x_{n-1}}$.
:::

The second bound in [[#eq-contraction]] is useful in practice: it estimates the unknown error from the computable difference of the last two iterates. If $g$ is differentiable, the mean value theorem shows that $\abs{g'(x)} \le L$ on $[a, b]$ implies the contraction condition. Near a fixed point this gives a local criterion.

::: corollary Local convergence {#cor-local}
Let $g$ be continuously differentiable near a fixed point $x^*$. If $\abs{g'(x^*)} < 1$, then the iteration converges to $x^*$ for every $x_0$ sufficiently close to $x^*$, and

$$
\lim_{n\to\infty}\frac{x_{n+1} - x^*}{x_n - x^*} = g'(x^*)
$$

whenever $x_n \ne x^*$ for all $n$. If $\abs{g'(x^*)} > 1$, no sequence of iterates converges to $x^*$ unless it lands on $x^*$ exactly.
:::

::: proof
Choose $L$ with $\abs{g'(x^*)} < L < 1$. By continuity of $g'$ there is $\delta > 0$ with $\abs{g'(x)} \le L$ on $I = [x^* - \delta, x^* + \delta]$. For $x \in I$, the mean value theorem gives $\abs{g(x) - x^*} = \abs{g(x) - g(x^*)} \le L\abs{x - x^*} \le \delta$, so $g$ maps $I$ into itself and is a contraction there; [[#thm-contraction]] applies. Moreover $x_{n+1} - x^* = g'(\xi_n)(x_n - x^*)$ with $\xi_n$ between $x_n$ and $x^*$; since $\xi_n \to x^*$, the ratio tends to $g'(x^*)$. If instead $\abs{g'(x^*)} > 1$, then $\abs{g'} \ge L' > 1$ near $x^*$, and the same identity shows that each step *increases* the distance to $x^*$ by a factor at least $L'$ once the iterates are close, so they cannot converge to $x^*$ unless some $x_n = x^*$.
:::

::: example Solving x = cos x {#ex-cos-fixed}
Show that $x_{n+1} = \cos x_n$ converges from every starting point, and predict its rate.
::: solution
After one step every iterate lies in $[-1, 1]$, and after two in $[\cos 1, 1] = [0.540, 1]$. On $[0.5, 1]$, $\cos$ maps into $[\cos1, \cos0.5] = [0.540, 0.878] \subset [0.5, 1]$ and $\abs{g'(x)} = \sin x \le \sin 1 \approx 0.841$. So [[#thm-contraction]] applies with $L = 0.841$: there is a unique fixed point $x^* = 0.739\,085\,133\ldots$ and the iteration converges from any start.

The asymptotic rate is $\abs{g'(x^*)} = \sin x^* = 0.674$, so the error shrinks by about this factor per step:

| $n$ | $0$ | $1$ | $2$ | $3$ | $5$ | $10$ | $20$ | $30$ |
|---|---|---|---|---|---|---|---|---|
| $x_n$ | $1$ | $0.540\,30$ | $0.857\,55$ | $0.654\,29$ | $0.701\,37$ | $0.744\,24$ | $0.739\,184$ | $0.739\,087\,0$ |
| $\abs{x_n - x^*}$ | $0.26$ | $0.20$ | $0.12$ | $0.085$ | $0.038$ | $5.2\times10^{-3}$ | $9.9\times10^{-5}$ | $1.9\times10^{-6}$ |

Because $g'(x^*) < 0$, the iterates alternate around $x^*$. Gaining one decimal digit takes $\frac{1}{-\log_{10}0.674} \approx 5.8$ steps — slower even than bisection.
:::
:::

::: widget cobweb
g: cos(x)
x0: 1
steps: 25
x: 0, 1.2
y: 0, 1.2
caption: The cobweb diagram of $x_{n+1} = \cos x_n$ spirals into the fixed point $x^* \approx 0.739$, where the graph of $\cos x$ crosses $y = x$. A spiral means $g'(x^*) < 0$; a staircase would mean $0 < g'(x^*) < 1$. The spiral closes slowly because $\lvert g'(x^*)\rvert \approx 0.67$ is not much smaller than $1$.
:::

The choice of $g$ matters enormously.

::: example Two rearrangements of the same equation {#ex-rearrange}
Newton's cubic $x^3 - 2x - 5 = 0$ can be rewritten as $x = g_1(x) = (2x + 5)^{1/3}$ or as $x = g_2(x) = \frac{x^3 - 5}{2}$. Which fixed-point iteration converges to $x^* \approx 2.0946$?
::: solution
Both functions have $x^*$ as a fixed point, so [[#cor-local]] decides by the size of the derivative there. For the first, $g_1'(x) = \frac{2}{3(2x + 5)^{2/3}}$, so $g_1'(x^*) \approx 0.152 < 1$: the iteration converges linearly, gaining about $-\log_{10}0.152 \approx 0.8$ digits per step. From $x_0 = 2$ it gives $2.0801,\ 2.0924,\ 2.0942,\ 2.0945, \dots$, and $x_7$ has error $1.8\times10^{-7}$.

For the second, $g_2'(x) = \frac32x^2$, so $g_2'(x^*) \approx 6.6 > 1$: the fixed point repels, and from $x_0 = 2$ the iteration produces $1.5,\ -0.81,\ -2.77,\ -13.1,\ -1128, \dots$. The same equation, rearranged two ways, gives one good and one useless method. A systematic way to choose $g$ with $g'(x^*) = 0$ is exactly Newton's method, below.
:::
:::

## Order of convergence

Bisection gains a fixed amount of accuracy per step; the table for Newton's method below gains a *fixed proportion* of the digits already correct. The order of convergence makes this precise.

::: definition Order of convergence {#def-order}
Let $x_n \to x^*$ with errors $e_n = x_n - x^*$ non-zero. The convergence has **order** $p \ge 1$ with **asymptotic constant** $C > 0$ if

$$
\lim_{n\to\infty}\frac{\abs{e_{n+1}}}{\abs{e_n}^p} = C ,
$$

where for $p = 1$ we require $C < 1$. Order $1$ is **linear**, order $2$ **quadratic**; convergence with $\abs{e_{n+1}}/\abs{e_n} \to 0$ is **superlinear**.
:::

With linear convergence, the number of correct digits grows by about $-\log_{10}C$ per step. With order $p > 1$, the number of correct digits is multiplied by about $p$ per step: if $\abs{e_n} \approx 10^{-k}$ then $\abs{e_{n+1}} \approx C\,10^{-pk}$. Quadratic convergence turns $3$ correct digits into $6$, then $12$, then full precision.

::: theorem Order of a fixed-point iteration {#thm-fp-order}
Let $g$ be $p$ times continuously differentiable near a fixed point $x^*$, with $g'(x^*) = g''(x^*) = \cdots = g^{(p-1)}(x^*) = 0$ and $g^{(p)}(x^*) \ne 0$, where $p \ge 2$. Then for $x_0$ close enough to $x^*$ the iteration converges with order exactly $p$ and asymptotic constant $\dfrac{\abs{g^{(p)}(x^*)}}{p!}$.
:::

::: proof
Since $g'(x^*) = 0$, [[#cor-local]] gives convergence for $x_0$ near $x^*$. If some $x_n = x^*$ the iteration stops there, so assume all $e_n \ne 0$. By Taylor's theorem ([[calculus-2/taylor-series#thm-taylor]]) about $x^*$, with the first $p - 1$ derivatives vanishing,

$$
x_{n+1} = g(x_n) = g(x^*) + \frac{g^{(p)}(\xi_n)}{p!}(x_n - x^*)^p
$$

for some $\xi_n$ between $x_n$ and $x^*$. Since $g(x^*) = x^*$, this says $e_{n+1} = \frac{g^{(p)}(\xi_n)}{p!}e_n^p$. As $\xi_n \to x^*$ and $g^{(p)}$ is continuous, $\frac{\abs{e_{n+1}}}{\abs{e_n}^p} \to \frac{\abs{g^{(p)}(x^*)}}{p!} \ne 0$.
:::

::: quiz
An iteration has errors $10^{-2}$, $10^{-4}$, $10^{-8}$, $10^{-16}$. What is its order of convergence?
- [ ] Linear, with constant $10^{-2}$
- [x] Quadratic
- [ ] Cubic
- [ ] Order $4$
::: solution
Each error is the square of the previous one: $\abs{e_{n+1}} = \abs{e_n}^2$, so $p = 2$ with $C = 1$. The number of correct digits doubles each step ($2, 4, 8, 16$). Linear convergence would add a constant number of digits per step, and cubic convergence would triple them.
:::
:::

## Newton's method

Replace the graph of $f$ near the current guess $x_n$ by its tangent line, $y = f(x_n) + f'(x_n)(x - x_n)$, and take the zero of the tangent as the next guess:

$$
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} .
$$ {#eq-newton}

This is **Newton's method** (or the Newton–Raphson method). It is a fixed-point iteration with $g(x) = x - \frac{f(x)}{f'(x)}$, and

$$
g'(x) = 1 - \frac{f'(x)^2 - f(x)f''(x)}{f'(x)^2} = \frac{f(x)f''(x)}{f'(x)^2},
$$

which vanishes at a root with $f'(x^*) \ne 0$. By [[#thm-fp-order]] we expect at least quadratic convergence. The next theorem gives a direct proof with an explicit error recursion.

::: theorem Quadratic convergence of Newton's method {#thm-newton}
Let $f$ be twice continuously differentiable on an interval around a root $x^*$ with $f'(x^*) \ne 0$. Then there is $\delta > 0$ such that for every $x_0$ with $\abs{x_0 - x^*} \le \delta$, Newton's method converges to $x^*$, and the errors satisfy

$$
e_{n+1} = \frac{f''(\xi_n)}{2f'(x_n)}\,e_n^2 \quad\text{for some } \xi_n \text{ between } x_n \text{ and } x^*, \qquad \lim_{n\to\infty}\frac{e_{n+1}}{e_n^2} = \frac{f''(x^*)}{2f'(x^*)} .
$$ {#eq-newton-error}
:::

::: proof
Choose $\delta_0 > 0$ such that on $I = [x^* - \delta_0, x^* + \delta_0]$ we have $\abs{f'(x)} \ge m > 0$ (possible since $f'$ is continuous and $f'(x^*) \ne 0$), and let $M = \max_I\abs{f''}$. Suppose $x_n \in I$. Taylor's theorem about $x_n$, evaluated at $x^*$, gives

$$
0 = f(x^*) = f(x_n) + f'(x_n)(x^* - x_n) + \tfrac12f''(\xi_n)(x^* - x_n)^2 .
$$

Divide by $f'(x_n)$ and rearrange using [[#eq-newton]]: $x_n - \frac{f(x_n)}{f'(x_n)} - x^* = \frac{f''(\xi_n)}{2f'(x_n)}(x_n - x^*)^2$, which is the error formula. Hence $\abs{e_{n+1}} \le K\abs{e_n}^2$ with $K = \frac{M}{2m}$.

Now let $\delta = \min\left(\delta_0, \frac{1}{2K}\right)$. If $\abs{e_n} \le \delta$, then $\abs{e_{n+1}} \le K\abs{e_n}\cdot\abs{e_n} \le \frac12\abs{e_n}$, so $x_{n+1}$ is again in the interval and closer to $x^*$. By induction all iterates stay within $\delta$ and $\abs{e_n} \le 2^{-n}\abs{e_0} \to 0$. Finally $\xi_n \to x^*$ and $x_n \to x^*$, so by continuity $\frac{e_{n+1}}{e_n^2} \to \frac{f''(x^*)}{2f'(x^*)}$.
:::

::: example Newton's cubic {#ex-newton-cubic}
Apply Newton's method to $f(x) = x^3 - 2x - 5$ from $x_0 = 2$.
::: solution
Here $f'(x) = 3x^2 - 2$, so $x_{n+1} = x_n - \frac{x_n^3 - 2x_n - 5}{3x_n^2 - 2}$. The first step is $x_1 = 2 - \frac{-1}{10} = 2.1$, exactly Newton's own first correction. Computing with high precision:

| $n$ | $x_n$ | $\abs{x_n - x^*}$ |
|---|---|---|
| $0$ | $2$ | $9.5\times10^{-2}$ |
| $1$ | $2.1$ | $5.4\times10^{-3}$ |
| $2$ | $2.094\,568\,121\,104\,185$ | $1.7\times10^{-5}$ |
| $3$ | $2.094\,551\,481\,698\,199$ | $1.6\times10^{-10}$ |
| $4$ | $2.094\,551\,481\,542\,326\,591\,496$ | $1.4\times10^{-20}$ |
| $5$ | (40 correct digits) | $1.0\times10^{-40}$ |

The number of correct digits roughly doubles at each step: $1, 2, 5, 10, 20, 40$. The ratios $e_{n+1}/e_n^2$ approach $\frac{f''(x^*)}{2f'(x^*)} = \frac{6x^*}{2(3(x^*)^2 - 2)} \approx 0.563$, as [[#eq-newton-error]] predicts (for instance $1.66\times10^{-5}/(5.45\times10^{-3})^2 \approx 0.56$). In double precision the iteration reaches full accuracy after $4$ steps.
:::
:::

::: widget newton
f: x^3 - 2x - 5
x0: 3
steps: 5
caption: Newton's method on $x^3 - 2x - 5$: each step slides down the tangent line to the $x$-axis. From $x_0 = 3$ the first tangent lands at $x_1 = 2.36$, still to the right of the root, and from then on the iterates close in at quadratic speed — watch the error column in the table. Try $x_0$ near $0.8$, where $f'$ is close to zero, to see a wild first step.
:::

For $f(x) = x^2 - a$, Newton's method becomes $x_{n+1} = x_n - \frac{x_n^2 - a}{2x_n} = \frac12\left(x_n + \frac{a}{x_n}\right)$, the ancient Babylonian–Heron method for square roots from [[calculus-2/sequences#exr-heron]]; there we proved directly that $x_{n+1} - \sqrt a = \frac{(x_n - \sqrt a)^2}{2x_n}$, an instance of [[#eq-newton-error]].

```python
def newton(f, fprime, x0, tol=1e-14, maxit=50):
    x = x0
    for k in range(maxit):
        dx = f(x) / fprime(x)
        x -= dx
        if abs(dx) <= tol * abs(x):      # step small relative to x: stop
            return x
    raise RuntimeError("Newton's method did not converge")
```

### When Newton's method fails

[[#thm-newton]] is a *local* result: it promises convergence only from starting points close enough to the root, and only for simple roots.

- **Bad starting points.** For $f(x) = \arctan x$ (root $0$), Newton from $x_0 = 1.3$ converges: $-1.162,\ 0.859,\ -0.374,\ 0.034, \dots$. From $x_0 = 1.5$ it diverges: $-1.694,\ 2.321,\ -5.114,\ 32.3, \dots$, because the tangent lines are nearly flat far from $0$ and throw the iterate ever further out.
- **Cycles.** For $f(x) = x^3 - 2x + 2$ and $x_0 = 0$: $x_1 = 0 - \frac{2}{-2} = 1$ and $x_2 = 1 - \frac{1}{1} = 0$; the iteration cycles for ever between $0$ and $1$.
- **Zero derivative.** If $f'(x_n) = 0$ the method is undefined, and if $f'(x_n)$ is small the step is huge.
- **Multiple roots.** If $f'(x^*) = 0$ the convergence is only linear (see below).

In practice Newton's method is combined with a safeguard, for example bisection steps whenever a Newton step would leave a bracketing interval. Brent's method (1973), the standard root finder in libraries such as SciPy's `brentq`, combines bisection, the secant method and inverse quadratic interpolation in this way.

::: warning Small residual does not mean small error
A tiny value of $\abs{f(x_n)}$ does not guarantee that $x_n$ is close to a root, and a small step $\abs{x_{n+1} - x_n}$ does not either, if the function is very flat. Near a simple root $e_n \approx \frac{f(x_n)}{f'(x^*)}$, so the residual must be scaled by the derivative. Near a multiple root the problem is ill-conditioned: for a double root, rounding errors of size $u$ in $f$ produce uncertainties of size $\sqrt u \approx 10^{-8}$ in the root, whatever method is used.
:::

::: example A double root {#ex-double-root}
Apply Newton's method to $f(x) = x^3 - 3x + 2 = (x - 1)^2(x + 2)$ from $x_0 = 2$.
::: solution
The iterates are $1.556,\ 1.298,\ 1.155,\ 1.080,\ 1.040,\ 1.020,\ 1.010, \dots$: the error halves at each step, which is linear convergence with constant $\frac12$. The reason: at a root of multiplicity $m$, $f(x) = (x - x^*)^mh(x)$ with $h(x^*) \ne 0$, and one computes $g'(x^*) = 1 - \frac1m$ ([[#exr-multiplicity]]), here $\frac12$.

If the multiplicity is known, the **modified Newton method** $x_{n+1} = x_n - m\frac{f(x_n)}{f'(x_n)}$ restores quadratic convergence: with $m = 2$ the errors are $0.11,\ 1.9\times10^{-3},\ 6.3\times10^{-7},\ 1.6\times10^{-10}$. The next step, however, jumps *back* to an error of $4.8\times10^{-7}$: at this point $f(x_n)$ is so small that it is dominated by rounding error, illustrating the $\sqrt u$ limit of the warning above.
:::
:::

::: widget newton
f: atan(x)
x0: 1.3
steps: 6
x: -6, 6
caption: Newton's method for $\arctan x = 0$ from $x_0 = 1.3$: the iterates bounce from side to side but close in on $0$. Now change $x_0$ to $1.5$: each tangent line hits the axis further out than the last and the iteration diverges. Between the two lies a critical starting value near $1.39$ from which the iterates cycle between $\pm x_0$.
:::

## The secant method

Newton's method needs the derivative, which may be expensive or unavailable. The **secant method** replaces the tangent by the secant line through the last two iterates:

$$
x_{n+1} = x_n - f(x_n)\,\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})} .
$$ {#eq-secant}

It needs two starting values but only one new function evaluation per step.

::: theorem Convergence of the secant method {#thm-secant}
Let $f$ be twice continuously differentiable near a simple root $x^*$ ($f'(x^*) \ne 0$). For starting values close enough to $x^*$, the secant method converges, its errors satisfy

$$
e_{n+1} = \frac{f''(\eta_n)}{2f'(\zeta_n)}\,e_ne_{n-1}
$$

for some $\eta_n, \zeta_n$ in the smallest interval containing $x_{n-1}, x_n, x^*$, and if $f''(x^*) \ne 0$ the order of convergence is $\varphi = \frac{1 + \sqrt5}{2} \approx 1.618$.
:::

::: proof {collapsed}
*Proof sketch.* The secant line is the linear interpolant $p$ of $f$ at $x_{n-1}, x_n$, and $x_{n+1}$ is its zero. The interpolation error formula of [[numerical-analysis/interpolation]] gives $f(x^*) - p(x^*) = \frac{f''(\eta_n)}{2}(x^* - x_n)(x^* - x_{n-1})$, i.e. $-p(x^*) = \frac{f''(\eta_n)}{2}e_ne_{n-1}$. Since $p$ is linear with slope $\frac{f(x_n) - f(x_{n-1})}{x_n - x_{n-1}} = f'(\zeta_n)$ (mean value theorem) and $p(x_{n+1}) = 0$, we have $p(x^*) = f'(\zeta_n)(x^* - x_{n+1}) = -f'(\zeta_n)e_{n+1}$, which gives the error formula. As in [[#thm-newton]], it implies convergence from close enough starting values, and then $e_{n+1} \approx Ce_ne_{n-1}$ with $C = \frac{f''(x^*)}{2f'(x^*)}$. If $\abs{e_{n+1}} \approx K\abs{e_n}^p$ for some order $p$, then $\abs{e_n} \approx (\abs{e_{n+1}}/K)^{1/p}$ and substituting into $\abs{e_{n+1}} \approx \abs C\,\abs{e_n}\abs{e_{n-1}}$ forces $p = 1 + \frac1p$, i.e. $p^2 = p + 1$, whose positive root is $\varphi$. Making the last step rigorous requires a little more care; see Süli and Mayers, *An Introduction to Numerical Analysis*, Chapter 1.
:::

::: example The secant method on Newton's cubic {#ex-secant}
Apply the secant method to $x^3 - 2x - 5$ with $x_0 = 2$, $x_1 = 3$ and examine the errors.
::: solution
With $f(2) = -1$ and $f(3) = 16$, the first step is $x_2 = 3 - 16\cdot\frac{3 - 2}{16 - (-1)} = 3 - \frac{16}{17} = 2.058\,82$. Continuing with high precision, the errors are

| $n$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ |
|---|---|---|---|---|---|---|---|
| $\abs{x_n - x^*}$ | $3.6\times10^{-2}$ | $1.3\times10^{-2}$ | $2.7\times10^{-4}$ | $2.1\times10^{-6}$ | $3.2\times10^{-10}$ | $3.6\times10^{-16}$ | $6.4\times10^{-26}$ |

From $n = 4$ on, the exponents ($3.6$, $5.7$, $9.5$, $15.4$, $25.2$ in absolute value) grow roughly like a Fibonacci sequence: each is about the sum of the two before, exactly as $e_{n+1} \approx Ce_ne_{n-1}$ predicts. The ratio of successive exponents approaches $\varphi \approx 1.6$, compared with $2$ for Newton's method.
:::
:::

**Which is faster?** Per *step*, Newton (order $2$) beats the secant method (order $1.618$). But a Newton step costs one evaluation of $f$ and one of $f'$, while a secant step costs one evaluation of $f$. If $f'$ costs about as much as $f$, then per function evaluation Newton's method has order $\sqrt2 \approx 1.414$ (two evaluations per squaring of the error), while the secant method has order $1.618$. When derivatives are expensive, the secant method wins.

::: quiz
Which method can find the root of $f(x) = (x-1)^2$, which touches the axis without crossing it?
- [ ] Bisection, starting from $[0, 3]$
- [x] Newton's method (converging linearly)
- [ ] Neither, since $f$ never changes sign
- [ ] Only the secant method
::: solution
Bisection needs a sign change and cannot even start, since $f \ge 0$ everywhere. Newton's method still converges from nearby starting points, but only linearly, with the error halving each step (the root has multiplicity $2$). The secant method also converges, slowly. All methods are limited to about $\sqrt u \approx 10^{-8}$ accuracy here, because the root of a function that only touches the axis is ill-conditioned.
:::
:::

::: application Division and square roots in hardware
Newton's method is so effective that it is used to implement arithmetic itself. To compute $1/a$ without dividing, apply Newton's method to $f(x) = \frac1x - a$: the iteration simplifies to $x_{n+1} = x_n(2 - ax_n)$, which uses only multiplications and a subtraction, and doubles the number of correct bits at each step ([[#exr-reciprocal]]). Starting from a small lookup table accurate to $8$ bits, three steps give $64$ bits. Similar iterations for $1/\sqrt a$ are used in graphics processors and numerical libraries.
:::

::: history
Iterative root finding is ancient: the Babylonian square-root method is Newton's method for $x^2 - a$. Isaac Newton described his method in *De analysi* (1669) on the example $x^3 - 2x - 5 = 0$, not as an iteration on $x$ but by successively correcting polynomial expansions; Joseph Raphson published the simpler iterative form in 1690, and Thomas Simpson stated it for general equations, with derivatives, in 1740. Joseph Fourier and Augustin-Louis Cauchy studied its convergence in the early nineteenth century. The contraction mapping theorem, in the general form for complete metric spaces, was proved by Stefan Banach in his 1922 thesis. The secant method descends from the much older "rule of false position" known in ancient Egypt and China. Richard Brent's robust hybrid algorithm appeared in his book *Algorithms for Minimization without Derivatives* (1973).
:::

## Where this leads

Newton's method generalises to systems of equations $\mathbf F(\mathbf x) = \mathbf 0$, with the derivative replaced by the Jacobian matrix: each step solves a linear system, which is where [[numerical-analysis/direct-methods]] comes in, and the same idea minimises functions in optimisation ([[multivariable/extrema]]). Implicit methods for stiff differential equations solve a nonlinear equation at every time step, usually by Newton's method ([[numerical-analysis/numerical-odes]]). The contraction mapping theorem reappears as the convergence criterion for iterative linear solvers ([[numerical-analysis/iterative-methods]]) and, in function spaces, in the proof of existence of solutions to differential equations ([[ode/existence-uniqueness]]). Finding all roots of a polynomial is best done as an eigenvalue problem for its companion matrix.

::: summary
- Bisection needs only a sign change and continuity; it gains one binary digit per step, guaranteed: $\abs{c_k - x^*} \le (b - a)/2^{k+1}$.
- Fixed-point iteration $x_{n+1} = g(x_n)$ converges when $g$ is a contraction ($\abs{g'} \le L < 1$); the error then shrinks like $L^n$, and asymptotically by the factor $g'(x^*)$ per step.
- Order of convergence $p$: $\abs{e_{n+1}} \approx C\abs{e_n}^p$. Linear convergence adds digits at a constant rate; order $p$ multiplies the number of correct digits by $p$.
- If $g'(x^*) = \cdots = g^{(p-1)}(x^*) = 0 \ne g^{(p)}(x^*)$, fixed-point iteration has order $p$.
- Newton's method $x_{n+1} = x_n - f(x_n)/f'(x_n)$ converges quadratically to simple roots from good starting values, with $e_{n+1} \approx \frac{f''}{2f'}e_n^2$; it can diverge or cycle from bad ones and is only linear at multiple roots.
- The secant method needs no derivative and has order $\varphi \approx 1.618$; per function evaluation it is often faster than Newton.
- Practical solvers combine a safe bracketing method with a fast local method.
:::

## Exercises

::: exercise Bisection steps {level=1 check="20"}
How many halvings of the interval $[1, 2]$ are needed before its length is at most $10^{-6}$?
::: solution
After $k$ halvings the length is $2^{-k}$. We need $2^{-k} \le 10^{-6}$, i.e. $k \ge 6\log_2 10 \approx 19.93$, so $k = 20$. (The midpoint is then within $\frac12\cdot10^{-6}$ of a root.)
:::
:::

::: exercise One Newton step {level=1 check="7/4"}
Perform one step of Newton's method for $f(x) = x^2 - 3$ from $x_0 = 2$.
::: solution
$x_1 = 2 - \frac{f(2)}{f'(2)} = 2 - \frac{1}{4} = \frac74 = 1.75$. (Compare $\sqrt3 = 1.732\,05$: the error has dropped from $0.27$ to $0.018$.)
:::
:::

::: exercise A linearly convergent iteration {level=1}
Show that $x_{n+1} = e^{-x_n}$ converges to the solution $x^* \approx 0.5671$ of $x = e^{-x}$ for $x_0$ near $x^*$, and find the asymptotic factor by which the error is multiplied per step.
::: solution
$g(x) = e^{-x}$ has $g'(x) = -e^{-x}$, so $g'(x^*) = -e^{-x^*} = -x^*$ (since $x^* = e^{-x^*}$), and $\abs{g'(x^*)} \approx 0.567 < 1$. By [[#cor-local]] the iteration converges locally, linearly, with the error multiplied by about $-0.567$ per step (alternating in sign).
:::
:::

::: exercise Choosing a rearrangement {level=2}
The equation $x^2 - x - 2 = 0$ has the root $x^* = 2$. For each of $g_1(x) = x^2 - 2$, $g_2(x) = \sqrt{x + 2}$ and $g_3(x) = 1 + \frac2x$, decide whether fixed-point iteration converges to $2$ from nearby starting values, and if so at what rate.
::: solution
All three have $2$ as a fixed point. $g_1'(2) = 4$, so the iteration diverges from $2$. $g_2'(x) = \frac{1}{2\sqrt{x+2}}$ gives $g_2'(2) = \frac14$: linear convergence, error multiplied by about $\frac14$ per step (monotonically). $g_3'(x) = -\frac{2}{x^2}$ gives $g_3'(2) = -\frac12$: linear convergence with factor $\frac12$, alternating around $2$.
:::
:::

::: exercise Two secant steps {level=2 check="7/5"}
Apply two steps of the secant method to $f(x) = x^2 - 2$ with $x_0 = 1$, $x_1 = 2$. What is $x_3$?
::: solution
$x_2 = 2 - f(2)\frac{2 - 1}{f(2) - f(1)} = 2 - 2\cdot\frac{1}{2 - (-1)} = \frac43$. Then $f(\frac43) = \frac{16}{9} - 2 = -\frac29$, and

$$
x_3 = \frac43 - \left(-\frac29\right)\frac{\frac43 - 2}{-\frac29 - 2} = \frac43 - \left(-\frac29\right)\cdot\frac{-2/3}{-20/9} = \frac43 + \frac29\cdot\frac{3}{10} = \frac43 + \frac{1}{15} = \frac75 .
$$

So $x_3 = 1.4$, with error $0.014$ (compared with $\sqrt2 = 1.414\,21$).
:::
:::

::: exercise Reciprocals without division {level=2 #exr-reciprocal}
Show that Newton's method for $f(x) = \frac1x - a$ ($a > 0$) is $x_{n+1} = x_n(2 - ax_n)$, that the relative errors $r_n = 1 - ax_n$ satisfy $r_{n+1} = r_n^2$, and deduce that the iteration converges to $\frac1a$ exactly when $0 < x_0 < \frac2a$.
::: solution
$f'(x) = -\frac{1}{x^2}$, so $x_{n+1} = x_n - \frac{1/x_n - a}{-1/x_n^2} = x_n + x_n - ax_n^2 = x_n(2 - ax_n)$. Then $1 - ax_{n+1} = 1 - 2ax_n + a^2x_n^2 = (1 - ax_n)^2$, i.e. $r_{n+1} = r_n^2$, so $r_n = r_0^{2^n}$. This tends to $0$ (and $x_n \to \frac1a$) if and only if $\abs{r_0} < 1$, i.e. $0 < ax_0 < 2$. The relation $r_{n+1} = r_n^2$ is quadratic convergence in its purest form.
:::
:::

::: exercise Newton at a multiple root {level=2 #exr-multiplicity}
Let $f(x) = (x - x^*)^mh(x)$ with $m \ge 2$, $h$ differentiable and $h(x^*) \ne 0$. Show that the Newton iteration function $g(x) = x - f(x)/f'(x)$ satisfies $g(x) - x^* = (x - x^*)\left(1 - \frac{h(x)}{mh(x) + (x - x^*)h'(x)}\right)$ and deduce that Newton's method converges linearly with constant $1 - \frac1m$.
::: solution
$f'(x) = (x - x^*)^{m-1}\left[mh(x) + (x - x^*)h'(x)\right]$, so for $x$ near $x^*$, $x \ne x^*$,

$$
\frac{f(x)}{f'(x)} = \frac{(x - x^*)h(x)}{mh(x) + (x - x^*)h'(x)},
$$

and subtracting from $x - x^*$ gives the formula. As $x \to x^*$ the bracket tends to $1 - \frac{h(x^*)}{mh(x^*)} = 1 - \frac1m$, so $\frac{e_{n+1}}{e_n} \to 1 - \frac1m \in (0, 1)$: linear convergence. For $m = 2$ the error halves each step, as in [[#ex-double-root]].
:::
:::

::: exercise An a posteriori bound {level=3}
For $g(x) = \cos x$ on $[0.5, 1]$, with $L = \sin 1$, the iterates in [[#ex-cos-fixed]] satisfy $\abs{x_{30} - x_{29}} \approx 4.7\times10^{-6}$. Use [[#thm-contraction]] to bound $\abs{x_{30} - x^*}$, and explain why the bound is pessimistic. Then prove that if $g$ is a contraction with constant $L$ and $\abs{g'(x)} \le \ell$ on an interval containing all iterates and $x^*$, the bound can be improved to $\frac{\ell}{1 - \ell}\abs{x_n - x_{n-1}}$ for any $\ell$ with $\ell < 1$.
::: solution
With $L = \sin1 \approx 0.841$, $\frac{L}{1-L} \approx 5.3$, so $\abs{x_{30} - x^*} \le 5.3\times4.7\times10^{-6} \approx 2.5\times10^{-5}$. The actual error is $1.9\times10^{-6}$, more than ten times smaller, because near $x^*$ the contraction factor is $\sin x^* \approx 0.674$, not the worst case $0.841$.

For the improvement, the proof of the a posteriori bound only used $\abs{x_{n+1} - x^*} \le L\abs{x_n - x^*}$ for the iterates in question. If $\abs{g'} \le \ell$ on an interval containing all iterates and $x^*$, the mean value theorem gives $\abs{x_{k+1} - x^*} \le \ell\abs{x_k - x^*}$ there, and the same argument yields $\abs{x_n - x^*} \le \frac{\ell}{1 - \ell}\abs{x_n - x_{n-1}}$. For the iterates near $x^*$ we may take $\ell$ close to $0.674$, giving $\frac{\ell}{1-\ell} \approx 2.1$ and a bound $9.8\times10^{-6}$ (still an overestimate, because the iterates alternate around $x^*$, so that $\abs{x_n - x_{n-1}}$ is the *sum* of two consecutive errors).
:::
:::

::: exercise Monotone convergence for convex functions {level=3}
Let $f$ be twice differentiable on $[x^*, b]$ with $f(x^*) = 0$, $f' > 0$ and $f'' > 0$ there. Prove that Newton's method started at any $x_0 \in (x^*, b]$ produces a decreasing sequence converging to $x^*$.
::: hint
Show by induction that $x^* < x_{n+1} < x_n$, using the error formula [[#eq-newton-error]] for the lower bound.
:::
::: solution
Suppose $x^* < x_n \le b$. Since $f$ is increasing and $f(x^*) = 0$, $f(x_n) > 0$, and $f'(x_n) > 0$, so $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)} < x_n$. By [[#eq-newton-error]], $x_{n+1} - x^* = \frac{f''(\xi_n)}{2f'(x_n)}(x_n - x^*)^2 > 0$ (the derivation of this formula only used Taylor's theorem on $[x^*, x_n]$). So $x^* < x_{n+1} < x_n$, and by induction the sequence is decreasing and bounded below by $x^*$. By the monotone convergence theorem it converges to some $L \ge x^*$; letting $n \to\infty$ in $x_{n+1} = x_n - f(x_n)/f'(x_n)$ and using continuity (with $f'(L) > 0$) gives $f(L) = 0$, and since $f$ is strictly increasing, $L = x^*$. Geometrically: a convex function lies above its tangents, so each tangent meets the axis between the root and the current point.
:::
:::
