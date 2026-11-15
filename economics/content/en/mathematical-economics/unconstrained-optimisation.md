A firm faces inverse demand $p = 40 - 2q$ and cost $C(q) = 100 + 4q + q^2$. Every extra unit sold brings in a little less revenue and costs a little more to produce. Somewhere in between there is an output at which profit is as large as it can be. Finding that output, and being sure it is a maximum rather than a minimum or a saddle, is **unconstrained optimisation**.

This chapter states the first- and second-order conditions, introduces concave and convex functions as the case in which those conditions are decisive, and works the leading economic examples: profit maximisation in one and in several variables. Constrained problems — a household's budget, a firm's isoquant — wait until the next chapter. The mathematical backbone is [extrema of functions of several variables](/a/maths/lesson.php?c=multivariable&l=extrema).

## First-order conditions

::: definition Local and global extrema {#def-extrema}
Let $f$ be a real-valued function on a set $D \subseteq \R^n$ and let $\mathbf{a} \in D$. Then $f$ has a **local maximum** at $\mathbf{a}$ if $f(\mathbf{x}) \le f(\mathbf{a})$ for all $\mathbf{x} \in D$ sufficiently close to $\mathbf{a}$, and a **local minimum** if the inequality is reversed. The extremum is **global** (or absolute) if the inequality holds for every $\mathbf{x} \in D$.
:::

Interior local extrema of a differentiable function are critical points.

::: theorem First-order necessary condition {#thm-foc}
If $f$ is differentiable on an open set containing $\mathbf{a}$ and has a local extremum at $\mathbf{a}$, then $\nabla f(\mathbf{a}) = \mathbf{0}$. In one variable, $f'(a) = 0$.
:::
::: proof
In one variable this is Fermat's theorem ([Maths Atlas](/a/maths/lesson.php?c=calculus-1&l=mean-value-theorem)). In several variables, restrict $f$ to each coordinate line through $\mathbf{a}$: the resulting single-variable functions have local extrema at $0$, so each partial vanishes.
:::

The condition is necessary, not sufficient. The cubic $x^3$ has $f'(0) = 0$ and no extremum; the saddle $x^2 - y^2$ has a vanishing gradient at the origin and is a maximum in one direction, a minimum in the other. Sufficiency needs second derivatives, or concavity.

The economic reading of $\nabla f = \mathbf{0}$ is that every marginal benefit equals the corresponding marginal cost. For profit $\pi(q) = R(q) - C(q)$ it is $MR = MC$. For $\pi(K,L) = p F(K,L) - rK - wL$ it is $p F_K = r$ and $p F_L = w$: each input is hired up to the point at which its marginal-value product equals its price.

::: example A monopolist's output {#ex-monopoly}
Inverse demand is $p = 40 - 2q$ and cost is $C(q) = 100 + 4q + q^2$. Find the profit-maximising output, the price, and profit.
::: solution
Revenue is $R(q) = 40q - 2q^2$, so $\pi(q) = 36q - 3q^2 - 100$ for $q \ge 0$. Then $\pi'(q) = 36 - 6q$, which vanishes at $q^* = 6$. The price is $p^* = 40 - 12 = 28$ and $\pi(6) = 216 - 108 - 100 = 8$. At $q = 0$, $\pi = -100$; as $q \to \infty$, $\pi \to -\infty$; so among non-negative outputs the critical point is the global maximum. Marginal revenue is $40-4q$ and marginal cost is $4+2q$; they meet at $q = 6$, as they must.
:::
:::

::: widget plot
f: 36*x - 3*x*x - 100; 36 - 6*x
x: 0, 14
y: -120, 40
labels: \text{profit } \pi(q); \text{marginal profit } \pi'(q)
caption: Profit and marginal profit for [[#ex-monopoly]]. The peak of $\pi$ sits where $\pi'$ crosses zero, at $q = 6$. To the left, extra output still adds to profit; to the right it subtracts. Move along the profit curve and check that the height at $q = 6$ is $8$.
:::

::: intuition Why second order
The first-order condition says the surface is flat. Flat can mean a hilltop, a valley, a saddle, or a long plateau. The Hessian is the curvature of that surface, and curvature is what distinguishes the four. In one variable we already know this: $f' = 0$ and $f'' < 0$ is a maximum. In several variables the same sentence has to be true *in every direction*, which is negative-definiteness: $\mathbf{h}\T H \mathbf{h} < 0$ for every $\mathbf{h} \neq \mathbf{0}$. A single negative second derivative, $f_{xx} < 0$, is not enough — that is only one direction.
:::

::: warning Interior versus boundary
The condition $\nabla f = \mathbf{0}$ applies at an *interior* point of the domain. If the domain is $q \ge 0$ and the only critical point is negative, the maximum on the feasible set is typically at $q = 0$ (a shutdown). Always check the boundary, and always check that a critical point lies in the domain. A firm cannot produce negative output, hire negative labour, or charge a negative price.
:::

## Second-order conditions

The second derivative, or the Hessian matrix, distinguishes hills from valleys from saddles.

::: definition Hessian {#def-hessian}
If $f$ is $C^2$, its **Hessian** at $\mathbf{a}$ is the symmetric matrix of second partials,

$$
Hf(\mathbf{a}) = \left( \frac{\partial^2 f}{\partial x_i\, \partial x_j}(\mathbf{a}) \right).
$$

In one variable this is just $f''(a)$.
:::

::: theorem Second-order sufficient conditions {#thm-soc}
Let $f$ be $C^2$ near an interior point $\mathbf{a}$ with $\nabla f(\mathbf{a}) = \mathbf{0}$.

1. If $Hf(\mathbf{a})$ is **negative definite**, then $f$ has a strict local maximum at $\mathbf{a}$.
2. If $Hf(\mathbf{a})$ is **positive definite**, then $f$ has a strict local minimum at $\mathbf{a}$.
3. If $Hf(\mathbf{a})$ is **indefinite**, then $\mathbf{a}$ is a saddle: neither a local max nor a local min.

In one variable: $f''(a) < 0$ is sufficient for a local max, $f''(a) > 0$ for a local min, and $f''(a) = 0$ is inconclusive ($x^4$, $-x^4$, $x^3$ at $0$).
:::

Definiteness is tested by leading principal minors ([[mathematical-economics/matrices-and-linear-models#prop-leading-minors]]) or by eigenvalues. For $n = 2$ and a maximum one needs $f_{xx} < 0$ and $f_{xx} f_{yy} - f_{xy}^2 > 0$.

::: example Checking the monopolist {#ex-soc-mono}
In [[#ex-monopoly]], $\pi''(q) = -6 < 0$, so the critical point is a strict local maximum. Because $\pi''$ is a negative *constant*, $\pi$ is strictly concave on the whole of $\R$ and the local maximum is global.
:::

::: example Two inputs {#ex-two-inputs}
A firm with decreasing returns produces $F(K,L) = 20 K^{1/3} L^{1/3}$, sells at $p = 1$, and pays $r = 4$, $w = 1$. Find the profit-maximising input bundle and the Hessian test.
::: solution
$\pi(K,L) = 20 K^{1/3} L^{1/3} - 4K - L$. The first-order conditions are
$$
\frac{20}{3} K^{-2/3} L^{1/3} = 4, \qquad \frac{20}{3} K^{1/3} L^{-2/3} = 1.
$$
Dividing the two equations eliminates the $20/3$ and gives $L/K = 4$, so $L = 4K$. Substituting into the second equation: $\tfrac{20}{3} K^{1/3} (4K)^{-2/3} = 1$, that is $\tfrac{20}{3} \cdot 4^{-2/3} K^{1/3-2/3} = 1$. Then $\tfrac{20}{3} \cdot 4^{-2/3} = K^{1/3}$, and $K = \bigl(\tfrac{20}{3}\bigr)^3 / 4^{2} = 8000 / (27 \cdot 16) = 500/27 \approx 18.52$. Then $L = 2000/27 \approx 74.07$. Profit is $2000/27 \approx 74.07$.

The Hessian of $F$ has $F_{KK} = \tfrac{20}{3}\cdot\bigl(-\tfrac23\bigr) K^{-5/3} L^{1/3} < 0$, $F_{LL} < 0$, and one can check $\det HF > 0$ on $K,L > 0$ (decreasing returns, $k = 2/3 < 1$). Adding a linear cost does not change the Hessian, so $H\pi$ is negative definite on the positive orthant and the critical point is a strict local maximum. Because $\pi \to -\infty$ as $\norm{(K,L)} \to \infty$ and $\pi < 0$ near the axes for large inputs, it is the global maximum on $K,L \ge 0$.
:::
:::

Constant returns change the picture. If $F$ is homogeneous of degree 1 and factor prices equal the competitive values $p F_K$, $p F_L$ at even one bundle, Euler's theorem says profit is zero at every scale; if factor prices are too high, the unique maximum is shutdown; if they are too low, profit can be made arbitrarily large by scaling up and no maximum exists. That is why a competitive firm with constant returns has no determined size in the long run.

::: quiz
A $C^2$ function of two variables has $\nabla f(\mathbf{a}) = \mathbf{0}$, $f_{xx}(\mathbf{a}) = -4$ and $\det Hf(\mathbf{a}) = -3$. Then
- [ ] $f$ has a local maximum at $\mathbf{a}$
- [ ] $f$ has a local minimum at $\mathbf{a}$
- [x] $\mathbf{a}$ is a saddle point
- [ ] the test is inconclusive
::: solution
$f_{xx} < 0$ looks like a maximum in the $x$-direction, but $\det Hf < 0$ means $Hf$ is indefinite ([[mathematical-economics/matrices-and-linear-models#prop-leading-minors]]). The surface bends down one way and up the other: a saddle. The test is conclusive whenever the determinant is nonzero.
:::
:::

## Concave and convex functions

Second-order tests are local. **Concavity** makes them global, and makes the first-order condition sufficient as well as necessary.

::: definition Concave and convex functions {#def-concave}
A function $f$ on a convex set $D \subseteq \R^n$ is **concave** if for all $\mathbf{x}, \mathbf{y} \in D$ and all $t \in [0,1]$,

$$
f\bigl(t\mathbf{x} + (1-t)\mathbf{y}\bigr) \ge t f(\mathbf{x}) + (1-t) f(\mathbf{y}).
$$

It is **convex** if $-f$ is concave (the inequality reversed). It is **strictly** concave or convex if the inequality is strict whenever $\mathbf{x} \neq \mathbf{y}$ and $t \in (0,1)$.
:::

A $C^2$ function is concave iff its Hessian is negative semidefinite everywhere, and strictly concave if the Hessian is negative definite. In one variable, $f'' \le 0$ is concavity: the graph lies below its tangents, which is the geometry of diminishing marginal utility, diminishing marginal product, and increasing (convex) cost.

::: theorem Concave maximisation {#thm-concave-max}
Let $f$ be concave and differentiable on an open convex set. Then $\nabla f(\mathbf{a}) = \mathbf{0}$ if and only if $\mathbf{a}$ is a global maximiser of $f$. If $f$ is strictly concave, the maximiser is unique.
:::
::: proof
Concavity implies $f(\mathbf{y}) \le f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot(\mathbf{y}-\mathbf{a})$ for every $\mathbf{y}$ (the graph lies below the tangent plane). If $\nabla f(\mathbf{a}) = \mathbf{0}$, then $f(\mathbf{y}) \le f(\mathbf{a})$ for every $\mathbf{y}$: a global maximum. Conversely, a global maximum is a local maximum, so [[#thm-foc]] gives $\nabla f(\mathbf{a}) = \mathbf{0}$. Strict concavity: if two maximisers existed, every convex combination would be a maximiser and the strict inequality would be contradicted.
:::

This is the theorem that lets economics treat $MR = MC$ as *the* answer, not a candidate. Profit is concave when revenue is concave (downward-sloping $MR$) and cost is convex (upward-sloping $MC$), the standard case. Utility is typically assumed strictly concave, so the household's problem, once the budget is substituted out or handled by a Lagrange multiplier, has a unique solution.

::: example A strictly concave utility {#ex-log-concave}
Let $u(x,y) = \ln x + \ln y$ on $x,y > 0$. Compute the Hessian and apply Sylvester's criterion.
::: solution
$u_x = 1/x$, $u_y = 1/y$, so $u_{xx} = -1/x^2$, $u_{yy} = -1/y^2$, $u_{xy} = 0$. The Hessian is $\operatorname{diag}(-1/x^2,\ -1/y^2)$. Then $u_{xx} < 0$ and $\det Hu = 1/(x^2 y^2) > 0$, so $Hu$ is negative definite and $u$ is strictly concave. (By contrast, $u = \sqrt{xy}$ is concave but *not* strictly concave: it is linear along rays from the origin, $u(t\mathbf{x}) = t\, u(\mathbf{x})$, and its Hessian has determinant zero.)
:::
:::

For a strictly concave objective, numerical maximisation is well-behaved: gradient ascent climbs to the unique peak. The figure below runs *gradient descent* on a convex bowl, which is the same as climbing the corresponding concave profit.

::: widget gradientdescent
f: x*x + 4*y*y
start: 2.4, 1.2
rate: 0.12
steps: 25
x: -3, 3
y: -2, 2
caption: Gradient descent on $f = x^2 + 4y^2$, a strictly convex bowl (minus a strictly concave profit, up to scaling). The iterates walk downhill, faster in $x$ than in $y$ because the curvature is smaller in $x$. Raise the step size past about $0.4$: the path overshoots and can diverge — a reminder that a first-order method needs a step small enough relative to the Lipschitz constant of the gradient.
:::

Quasiconcavity is enough for a unique tangency on a convex budget set, but it is not enough for the second-order tests of this chapter. A quasiconcave $f$ can have a critical point that is not a maximum (the function $f(x,y) = x^3 - y^2$ is a standard illustration in a neighbourhood of the origin). When economists write "assume $u$ is strictly quasiconcave", they are assuming convex-to-the-origin indifference curves, which delivers a unique demand on a linear budget; they are not assuming that an unconstrained critical point of $u$ is a maximum — there usually is no unconstrained maximum of $u$, because more is better. The unconstrained problem in economics is typically *profit* or *minus cost*, not utility.

A practical check: if a calculated critical point gives negative output, negative labour, or a price below average variable cost, the first-order condition has described a stationary point of the *unconstrained* extension of the function, not of the economically relevant domain. Re-solve on the boundary. Shutdown, a corner of the Edgeworth box, and a firm that uses only one of two inputs are all boundary solutions, and they are common.

## Where this leads

Every optimisation in the atlas starts here. Adding an equality constraint produces the Lagrangian of the next chapter; adding inequalities produces Kuhn–Tucker. The first-order conditions, treated as identities in the parameters, are the raw material of [[mathematical-economics/comparative-statics]]. Dynamic problems replace $f(\mathbf{x})$ by a sum or an integral of instantaneous payoffs, but the same logic — a first-order condition, a concavity argument for sufficiency — applies to the Bellman equation in [[mathematical-economics/dynamic-optimisation]].

Numerical maximisation is how one proceeds when $f$ is known as a computer program rather than as a formula — a simulated-method-of-moments criterion, a likelihood, a calibrated planner's objective. Gradient descent, Newton's method and their constrained cousins are the workhorses; they converge to a *local* maximum, and with a non-concave objective that need not be the global one. Multiple starts, a grid, or a concave reformulation are the usual defences. In economic theory one prefers to impose concavity (or quasiconcavity plus a convex constraint) so that the first-order condition is the whole answer. In economic computation one does not always have that luxury, and the second-order test at the reported point — the Hessian of the criterion, or the bordered Hessian — is part of the report, not an optional extra.

::: history
**1838, Antoine Augustin Cournot.** Cournot’s monopolist chooses output to maximise $p(q)\,q - C(q)$, and the first-order condition $MR = MC$ appears, in different notation, as equation (4) of *Recherches*.

**1947, Paul Samuelson.** *Foundations of Economic Analysis* takes maximisation of a twice-differentiable function, and the second-order conditions that make the critical point a maximum, as the unifying structure of static economic theory.

**1951, Kenneth Arrow and Alain Enthoven.** Their work on quasiconcave programming (published 1961 in *Econometrica*) relaxed concavity of the objective to quasiconcavity, the property indifference curves actually need, and still obtained sufficient first-order conditions.
:::

::: summary
- At an interior local extremum of a differentiable function, $\nabla f = \mathbf{0}$ (**first-order necessary condition**). For profit, $MR = MC$ and $p F_K = r$, $p F_L = w$.
- If $\nabla f(\mathbf{a}) = \mathbf{0}$ and $Hf(\mathbf{a})$ is negative definite, $\mathbf{a}$ is a strict local maximum (**second-order sufficient condition**). An indefinite Hessian means a saddle.
- A **concave** differentiable function has a global maximum at $\mathbf{a}$ if and only if $\nabla f(\mathbf{a}) = \mathbf{0}$. Strict concavity gives uniqueness.
- Always check the boundary of the domain. Constant-returns profit is either zero at every scale, negative, or unbounded — never a unique interior maximum.
:::

## Exercises

::: exercise A quadratic profit {level=1 check="5"}
$\pi(q) = 40q - 4q^2 - 20$. Find the output at which $\pi'(q) = 0$. (Enter that output.)
::: solution
$\pi'(q) = 40 - 8q = 0$ gives $q = 5$. Then $\pi''(q) = -8 < 0$, so it is a maximum, with $\pi(5) = 80$.
:::
:::

::: exercise A cubic cost {level=1}
Cost is $C(q) = 8q + q^2 + \tfrac13 q^3$ and the firm is competitive at $p = 16$. Write profit, compute the FOC, and verify the SOC at the positive critical point.
::: solution
$\pi(q) = 16q - 8q - q^2 - \tfrac13 q^3 = 8q - q^2 - \tfrac13 q^3$. Then $\pi'(q) = 8 - 2q - q^2$. Setting $\pi' = 0$ gives $q^2 + 2q - 8 = 0$, or $(q+4)(q-2) = 0$. The positive root is $q = 2$. And $\pi''(q) = -2 - 2q$, so $\pi''(2) = -6 < 0$: a local maximum. (The other root $q = -4$ is not a feasible output.)
:::
:::

::: exercise Shutdown {level=1}
A competitive firm has $C(q) = 12 + 4q + q^2$ and faces $p = 3$. Compute $\pi'(q)$ for $q > 0$. Is there an interior profit maximum, or does the firm prefer $q = 0$?
::: solution
$\pi(q) = 3q - 12 - 4q - q^2 = -12 - q - q^2$. Then $\pi'(q) = -1 - 2q < 0$ for all $q \ge 0$. Profit is strictly decreasing on the feasible set, so the maximum is at the boundary $q = 0$, with $\pi = -12$ (the firm loses its fixed cost). Price lies below average variable cost at every positive output — $AVC = 4 + q \ge 4 > 3$ — which is the shutdown test.
:::
:::

::: exercise Two-good quadratic {level=2}
Maximise $f(x,y) = 12x + 8y - x^2 - xy - y^2$ over $\R^2$. Find the critical point, test the Hessian, and compute $f$ there.
::: solution
$f_x = 12 - 2x - y = 0$, $f_y = 8 - x - 2y = 0$. The system $2x + y = 12$, $x + 2y = 8$ has solution $(x,y) = (16/3,\ 4/3)$, as in [[mathematical-economics/matrices-and-linear-models#ex-hessian-sign]]. The Hessian is $\begin{pmatrix} -2 & -1 \\ -1 & -2 \end{pmatrix}$, with $f_{xx} = -2 < 0$ and $\det H = 3 > 0$, hence negative definite: a strict global maximum (the function is a concave quadratic). $f(16/3, 4/3) = 12\cdot 16/3 + 8\cdot 4/3 - (16/3)^2 - (16/3)(4/3) - (4/3)^2 = 64 + 32/3 - 256/9 - 64/9 - 16/9 = (576 + 96 - 256 - 64 - 16)/9 = 336/9 = 112/3$.
:::
:::

::: exercise Factor demand {level=2}
In [[#ex-two-inputs]], what happens to the optimal $K$ if the rental rate rises from $4$ to $5$, with $w$ still $1$? Compute the new bundle.
::: solution
The FOCs become $\tfrac{20}{3} K^{-2/3} L^{1/3} = 5$ and $\tfrac{20}{3} K^{1/3} L^{-2/3} = 1$. Dividing, $L/K = 5$, so $L = 5K$. Substitute: $\tfrac{20}{3} K^{1/3} (5K)^{-2/3} = 1$, hence $\tfrac{20}{3} \cdot 5^{-2/3} K^{-1/3} = 1$ and $K^{1/3} = \tfrac{20}{3} \cdot 5^{-2/3}$. Then $K = \bigl(\tfrac{20}{3}\bigr)^3 / 5^{2} = 8000 / (27 \cdot 25) = 32/2.7 = 320/27 \approx 11.85$. And $L = 1600/27 \approx 59.26$. Capital demand falls, as does labour (the inputs are complements in this Cobb–Douglas-like technology). Profit falls with it.
:::
:::

::: exercise An inconclusive second derivative {level=2}
Let $f(x) = -x^4 + 2x^2$. Find the critical points, evaluate $f''$ at each, and determine which are maxima by inspecting $f$ (or $f''$ is not enough at one of them).
::: solution
$f'(x) = -4x^3 + 4x = -4x(x^2-1)$, so $x = 0, \pm 1$. Then $f''(x) = -12x^2 + 4$, so $f''(\pm 1) = -8 < 0$ (local maxima) and $f''(0) = 4 > 0$ (local minimum). Here the test is conclusive at every critical point. For a contrast, $g(x) = -x^4$ has $g'(0) = g''(0) = 0$ and a maximum at $0$; $h(x) = x^4$ has a minimum; $k(x) = x^3$ has a point of inflection. When $f''(a) = 0$, look at the first non-vanishing derivative, or at the sign of $f(x)-f(a)$ nearby.
:::
:::

::: exercise No maximum under increasing returns {level=3}
Let $F(K,L) = K^{2/3} L^{2/3}$, $p = 1$, $r = w = 1$. Show that the first-order conditions have a solution, but that profit is unbounded above on $K,L > 0$. What fails in [[#thm-soc]]?
::: hint
The first-order conditions can be solved, but check the Hessian against [[#thm-soc]], and compare $\pi(t,t)$ as $t \to \infty$.
:::
::: solution
$F_K = \tfrac23 K^{-1/3} L^{2/3}$, $F_L = \tfrac23 K^{2/3} L^{-1/3}$. Setting $F_K = 1 = F_L$ gives $L = K$ and $\tfrac23 K^{1/3} = 1$, so $K = L = (2/3)^3 = 8/27$. That is a critical point. But $F$ is homogeneous of degree $4/3 > 1$, so $\pi(t,t) = t^{4/3} - 2t$, which tends to $+\infty$ as $t \to \infty$: profit is unbounded and there is no maximum. The Hessian of $\pi$ at $8/27$ cannot be negative definite — increasing returns make $H\pi$ indefinite or positive in the scaling direction. [[#thm-soc]] is a *local* sufficient condition; even if it held, it would not prevent profit from rising at large scale. (In fact along the ray, $\pi(t,t)$ has a local *minimum* near the critical scale, not a maximum.)
:::
:::

::: exercise Concavity from the Hessian {level=3}
Let $f(x,y) = ax - \tfrac12 b x^2 + cy - \tfrac12 d y^2 - k xy$ with $b > 0$, $d > 0$. Find the condition on $(b,d,k)$ for $f$ to be strictly concave on $\R^2$, and interpret $k$ as a complementarity parameter in a two-product profit function.
::: solution
The Hessian is constant, $H = \begin{pmatrix} -b & -k \\ -k & -d \end{pmatrix}$. Negative definite iff $-b < 0$ (already) and $\det H = bd - k^2 > 0$, i.e. $\abs{k} < \sqrt{bd}$. If $k > 0$ the products are complements in demand (or rivals in cost): extra $x$ raises the marginal profit of $y$. If $k < 0$ they are substitutes. Strict concavity, and a unique unconstrained maximum, survive moderate complementarity; if $\abs{k} > \sqrt{bd}$ the Hessian is indefinite and the "profit" function is a saddle — the firm would want to go to infinity along one ray and minus infinity along another, which is not a well-posed product-mix problem.
:::
:::

