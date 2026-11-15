A household spends its income on food and housing. More of either is better; the two are not perfect substitutes. How much extra food compensates for one less unit of housing? How does that trade-off change as the household becomes richer in one good and poorer in the other? The answers live in a function of two variables — a **utility function** $u(x_1, x_2)$ — and in its **partial derivatives** and **level curves**.

The same geometry describes a firm's production $F(K,L)$, a cost function $C(w,r,q)$, and an indirect utility function $v(\mathbf{p}, m)$. This chapter treats functions of several variables as economists use them: partial derivatives as marginal products and marginal utilities, the total differential as a first-order account of change, level curves as indifference curves and isoquants, homogeneity as returns to scale, and implicit differentiation as the slope of a constraint. The underlying calculus is in the [Maths Atlas](/a/maths/lesson.php?c=multivariable&l=partial-derivatives) and the [gradient chapter](/a/maths/lesson.php?c=multivariable&l=gradient).

## Partial derivatives

::: definition Partial derivative {#def-partial}
Let $f$ be defined on an open set in $\R^n$. The **partial derivative** of $f$ with respect to $x_i$ at $\mathbf{a}$ is the ordinary derivative of the single-variable function obtained by holding every coordinate except $x_i$ fixed:

$$
\frac{\partial f}{\partial x_i}(\mathbf{a}) = \lim_{h \to 0} \frac{f(\mathbf{a} + h \mathbf{e}_i) - f(\mathbf{a})}{h},
$$

when the limit exists. The **gradient** is the vector of partials, $\nabla f(\mathbf{a}) = \bigl(f_{x_1}(\mathbf{a}), \dots, f_{x_n}(\mathbf{a})\bigr)$.
:::

In economic notation:

- $u_1 = \partial u/\partial x_1$ is the **marginal utility** of good 1;
- $F_K = \partial F/\partial K$ is the **marginal product of capital**, $F_L$ the **marginal product of labour**;
- $C_q = \partial C/\partial q$ is marginal cost, when cost is written as a function of input prices and output.

The units are the units of $f$ per unit of $x_i$. Holding the other arguments fixed is the *ceteris paribus* clause of every partial effect in a model.

If the partials exist in a neighbourhood of $\mathbf{a}$ and are continuous there, $f$ is differentiable at $\mathbf{a}$ in the sense of the [Maths Atlas](/a/maths/lesson.php?c=multivariable&l=partial-derivatives): the best linear approximation is $f(\mathbf{a}+\mathbf{h}) \approx f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h}$. Second partials, when continuous, commute (**Clairaut's theorem**): $f_{xy} = f_{yx}$. Young's theorem in economics is this fact applied to a maximum-value function; we meet it as a symmetry of substitution effects in [[microeconomics/slutsky-and-welfare]].

::: example Marginal utilities {#ex-mu}
Let $u(x,y) = x^{1/2} y^{1/2}$. Compute both marginal utilities at $(x,y) = (4, 9)$, and compute their ratio.
::: solution
$u_x = \tfrac12 x^{-1/2} y^{1/2} = \tfrac12 \sqrt{y/x}$ and $u_y = \tfrac12 x^{1/2} y^{-1/2} = \tfrac12 \sqrt{x/y}$. At $(4,9)$, $u_x = \tfrac12 \sqrt{9/4} = \tfrac12 \cdot \tfrac32 = 3/4$ and $u_y = \tfrac12 \sqrt{4/9} = \tfrac12 \cdot \tfrac23 = 1/3$. The ratio $u_x/u_y = (3/4)/(1/3) = 9/4$, which equals $y/x$. For this Cobb–Douglas utility the ratio of marginal utilities is the ratio of the two quantities, inverted.
:::
:::

::: example A Cobb–Douglas production function {#ex-mp}
Let $F(K,L) = K^{0.3} L^{0.7}$. Compute $F_K$ and $F_L$ at $(K,L) = (8, 27)$, and compute $K F_K + L F_L$.
::: solution
$F_K = 0.3 K^{-0.7} L^{0.7}$ and $F_L = 0.7 K^{0.3} L^{-0.3}$. At $(8,27)$, $F(8,27) \approx 18.745$ as in [[mathematical-economics/functions-and-models#ex-cobb-douglas]]. Then $F_K = 0.3 \cdot 8^{-0.7} \cdot 27^{0.7}$ and $K F_K = 0.3 F = 0.3 \times 18.745 \approx 5.623$; $L F_L = 0.7 F \approx 13.121$; the sum is $F$ itself. That is Euler's theorem, [[#thm-euler]], for a homogeneous-of-degree-one function.
:::
:::

## The total differential

When several arguments move at once, the first-order change in $f$ is the sum of the partial effects.

::: definition Total differential {#def-differential}
If $f$ is differentiable at $\mathbf{x}$, its **total differential** is

$$
\dd f = f_{x_1}\, \dd x_1 + \cdots + f_{x_n}\, \dd x_n = \nabla f \cdot \dd\mathbf{x}.
$$ {#eq-diff}

For a function of two variables, $\dd f = f_x\, \dd x + f_y\, \dd y$.
:::

The differential is an accounting identity to first order. If capital rises by $\dd K$ and labour by $\dd L$, output changes by $F_K\, \dd K + F_L\, \dd L$, plus a remainder that is second-order small. In logarithmic form, $\dd F / F = \alpha\, \dd K/K + (1-\alpha)\, \dd L/L$ for a Cobb–Douglas $K^{\alpha}L^{1-\alpha}$, which is the growth-accounting identity of the previous chapter written without time.

Along a **level curve** $f(x,y) = c$ we have $\dd f = 0$, so

$$
\frac{\dd y}{\dd x}\Big|_{f=c} = -\frac{f_x}{f_y},
$$ {#eq-level-slope}

wherever $f_y \neq 0$. The slope of a level curve is minus the ratio of partials.

::: definition Marginal rate of substitution {#def-mrs}
For a utility function $u(x_1, x_2)$ with $u_2 \neq 0$, the **marginal rate of substitution** of good 2 for good 1 is

$$
\mathrm{MRS}_{12} = \frac{u_1}{u_2} = -\frac{\dd x_2}{\dd x_1}\Big|_{u=\text{const}}.
$$

It is the amount of good 2 the household would just be willing to give up for one extra unit of good 1, staying on the same indifference curve. For a production function the same ratio $F_L / F_K$ is the **marginal rate of technical substitution** of capital for labour.
:::

The economic content of [[#eq-level-slope]] is that the slope of an indifference curve is $-MRS$, and the slope of an isoquant is $-MRTS$. Convex-to-the-origin curves correspond to a diminishing MRS or MRTS: as one moves down an indifference curve, substituting good 1 for good 2, the household becomes less willing to give up further units of good 2.

::: widget contour
f: sqrt(x*y)
x: 0.2, 10
y: 0.2, 10
levels: 10
gradient: true
constraint: 2*x + y - 12
point: 3, 6
caption: Indifference curves of $u = \sqrt{xy}$ (Cobb–Douglas) and the budget line $2x + y = 12$. Drag the point along the budget line: the gradient $\nabla u$ is perpendicular to the indifference curve, and at the tangency $(3,6)$ it is parallel to the gradient of the constraint $(2,1)$. That parallelism is the Lagrange condition of the next chapter but one.
:::

::: example MRS along an indifference curve {#ex-mrs}
For $u = \sqrt{xy}$, compute $\mathrm{MRS}_{xy}$ at $(4,9)$ and at $(9,4)$, both of which give $u = 6$. Interpret the change.
::: solution
$\mathrm{MRS}_{xy} = u_x/u_y = y/x$. At $(4,9)$ the MRS is $9/4 = 2.25$: the household would give up 2.25 units of $y$ for one extra $x$. At $(9,4)$ the MRS is $4/9 \approx 0.44$. The household now has more $x$ and less $y$, and is much less willing to sacrifice $y$ for further $x$. The indifference curve is convex to the origin.
:::
:::

## Homogeneous functions and Euler's theorem

A production function has **constant returns to scale** if scaling all inputs by $t > 0$ scales output by $t$; **increasing** (decreasing) returns if output scales by more (less) than $t$. The mathematical name for this is homogeneity.

::: definition Homogeneous function {#def-homogeneous}
A function $f$ defined on a cone in $\R^n$ (typically $\R^n_{++}$) is **homogeneous of degree $k$** if

$$
f(t\mathbf{x}) = t^k f(\mathbf{x}) \qquad \text{for all } t > 0 \text{ and all } \mathbf{x} \text{ in the domain}.
$$

Degree $k = 1$ is linear homogeneity (constant returns); $k > 1$ is increasing returns; $0 < k < 1$ is decreasing returns. Degree $k = 0$ means $f$ is invariant to scale: demand functions that are homogeneous of degree zero in prices and income are the standard example.
:::

Cobb–Douglas $A K^{\alpha} L^{\beta}$ is homogeneous of degree $\alpha+\beta$. CES $F = A\bigl(\alpha K^{\rho} + (1-\alpha)L^{\rho}\bigr)^{1/\rho}$ is homogeneous of degree 1. A linear function $a\cdot\mathbf{x}$ is homogeneous of degree 1; a quadratic form is homogeneous of degree 2.

::: theorem Euler's theorem {#thm-euler}
If $f$ is differentiable and homogeneous of degree $k$, then

$$
\sum_{i=1}^n x_i \frac{\partial f}{\partial x_i}(\mathbf{x}) = k\, f(\mathbf{x}).
$$ {#eq-euler}

In particular, if $F(K,L)$ is homogeneous of degree 1, then $K F_K + L F_L = F$: paying each input its marginal product exactly exhausts output.
:::
::: proof
Differentiate $f(t\mathbf{x}) = t^k f(\mathbf{x})$ with respect to $t$, using the chain rule on the left: $\sum_i x_i f_{x_i}(t\mathbf{x}) = k t^{k-1} f(\mathbf{x})$. Set $t = 1$.
:::

The exhaustion property is why constant-returns models of the competitive firm make zero profit in equilibrium: revenue $p F$ equals $p F_K \cdot K + p F_L \cdot L = r K + w L$, the cost of the inputs, once each factor is paid its marginal-value product. With decreasing returns there is a residual (pure profit, or the return to an unmodelled fixed factor); with increasing returns, paying marginal products would more than exhaust output, and a competitive equilibrium typically fails to exist.

A useful corollary: if $f$ is homogeneous of degree $k$, each partial $f_{x_i}$ is homogeneous of degree $k-1$. Marginal products fall with scale when returns to scale are constant or decreasing — the usual diminishing-returns story — because degree $k-1 \le 0$.

::: quiz
If $F$ is homogeneous of degree $1$ and $F_K, F_L > 0$, then doubling $K$ and $L$
- [ ] doubles both marginal products
- [x] leaves both marginal products unchanged and doubles output
- [ ] halves both marginal products
- [ ] doubles output but has an ambiguous effect on marginal products
::: solution
Euler's corollary: $F_K$ and $F_L$ are homogeneous of degree $0$, so they are invariant to scaling both inputs. Output doubles by the definition of degree 1.
:::
:::

## Implicit differentiation

Many economic relationships are not graphs of functions but **level sets**: a budget constraint $p_1 x_1 + p_2 x_2 = m$, a production constraint $F(K,L) = q$, an iso-profit locus $\pi(q,p) = \bar\pi$. To find how one variable responds to another along the constraint, one differentiates the constraint.

::: proposition Implicit-function slope {#prop-implicit}
Let $G(x,y)$ be $C^1$ and suppose $G(x_0,y_0) = c$ with $G_y(x_0,y_0) \neq 0$. Then there is a $C^1$ function $y = \phi(x)$, defined near $x_0$, such that $G\bigl(x, \phi(x)\bigr) = c$ and $\phi(x_0) = y_0$, with

$$
\phi'(x) = -\frac{G_x\bigl(x,\phi(x)\bigr)}{G_y\bigl(x,\phi(x)\bigr)}.
$$ {#eq-implicit}

This is [[#eq-level-slope]] under a different name. The full implicit function theorem, with parameters, is in [[mathematical-economics/comparative-statics]].
:::

::: example Output as a function of labour {#ex-implicit}
A firm has production $q = 4 L^{1/2} \bar K^{1/2}$ with $\bar K = 9$ fixed in the short run, so $q = 12 L^{1/2}$. Invert to $L = (q/12)^2$ and also recover $dq/dL$ from the implicit relation $G(q,L) = q - 12 L^{1/2} = 0$.
::: solution
Directly, $dq/dL = 6 L^{-1/2} = 6/\sqrt{L}$. From [[#eq-implicit]], $G_q = 1$ and $G_L = -6 L^{-1/2}$, so $dL/dq = -G_q/G_L = 1/(6 L^{-1/2}) = \sqrt{L}/6$, and $dq/dL$ is the reciprocal, $6/\sqrt{L}$, matching. At $L = 4$, $q = 24$ and $dq/dL = 3$: the short-run marginal product of labour is 3.
:::
:::

The same device gives the slope of a budget line, $-p_1/p_2$, without drawing it, and the slope of an isoquant, $-F_K/F_L$, which we already had as $-1/\mathrm{MRTS}$. Comparative statics of equilibria — how $p^*$ moves when a tax moves — is implicit differentiation of the equilibrium condition $D(p) - S(p, t) = 0$ with respect to $t$. That is the next chapter but two.

::: intuition Why hold other things fixed
A partial derivative is an answer to a *ceteris paribus* question, and *ceteris paribus* is a modelling choice. Holding $K$ fixed while $L$ changes is the right experiment for a short-run production function; it is the wrong experiment for a long-run cost function, in which $K$ will be chosen again. The total differential is how one moves from the first experiment to the second: substitute $\dd K$ from the first-order condition that determines $K$, and the remaining coefficient of $\dd L$ is the long-run effect. Comparative statics is this substitution, done with matrices.
:::

::: warning Partials are not total effects
$\partial q^d / \partial p$, holding income and other prices fixed, is not the total change in quantity when the price of one good rises in general equilibrium: incomes and other prices then move too. The total differential, or a full comparative-static derivative, is the right object for that question. Confusing a partial with a total effect is the most common reading error in applied work that quotes "the" elasticity of demand.
:::

::: widget surface
f: x**(0.3) * y**(0.7)
x: 0.2, 12
y: 0.2, 30
contours: true
caption: The Cobb–Douglas surface $z = K^{0.3} L^{0.7}$. Rotate it to see the level curves (isoquants) in the $(K,L)$-plane and the concave-down profile of diminishing returns in each direction. Along a ray from the origin, height scales linearly — constant returns, Euler's case $k = 1$.
:::

The chain rule in several variables is the total differential in operational form. If $q = F(K, L)$ and $K = K(t)$, $L = L(t)$, then

$$
\dot q = F_K \dot K + F_L \dot L,
$$

which is how a growth accountant converts observed $\dot K$ and $\dot L$ into a contribution to $\dot q$. If a household's income $m$ and the prices $\mathbf{p}$ all depend on a policy parameter $\theta$, the total effect on demand is $dx_i/d\theta = \sum_j \partial x_i/\partial p_j \cdot dp_j/d\theta + \partial x_i/\partial m \cdot dm/d\theta$, a chain-rule expansion that comparative statics will write in matrix form. Partial derivatives are the building blocks; the chain rule is how they are assembled into a total effect.

A related identity, used whenever a maximum-value function is twice differentiated, is Young's theorem: mixed partials commute. Applied to the expenditure function $e(\mathbf{p}, u)$, it says that $\partial h_i / \partial p_j = \partial h_j / \partial p_i$, the symmetry of compensated cross-price effects. Applied to the profit function, it says that $\partial q / \partial w$ (the effect of the wage on output) equals $-\partial L / \partial p$ (the effect of the output price on labour demand), up to a sign convention. These are not extra economic assumptions; they are $f_{xy} = f_{yx}$ for a well-behaved value function.

Homothetic functions — monotone transformations of linear-homogeneous functions — have level curves that are radial blow-ups of one another. Marshallian demands then have the property that income expansion paths are rays, and the income elasticity of every good is one. Cobb–Douglas is homothetic; Stone–Geary $u = \prod (x_i - \gamma_i)^{\alpha_i}$ is homothetic only in the supernumerary quantities $x_i - \gamma_i$. Homotheticity is a restriction on $f$, visible in its level curves, and it is the usual reason a model has no Engel-curve curvature.

Quasiconcavity is the ordinal cousin of concavity. A function is **quasiconcave** if its upper contour sets $\{\mathbf{x}: f(\mathbf{x}) \ge c\}$ are convex — exactly the condition that indifference curves (or isoquants) bow toward the origin. Strict concavity implies quasiconcavity, but not conversely: any increasing transformation of a concave function is quasiconcave, and that is why a strictly increasing $v \circ u$ represents the same preferences as $u$. Optimisation theory uses concavity for sufficiency of first-order conditions on the *objective*; consumer theory uses quasiconcavity for convexity of the *preferred set*. The two should not be conflated.

## Where this leads

Indifference curves and isoquants are the geometry of [[microeconomics/preferences-and-utility]] and of the theory of the firm. The total differential is the first-order condition of [[mathematical-economics/unconstrained-optimisation]] once we set it to zero, and of [[mathematical-economics/constrained-optimisation]] once we set it to zero *along a constraint*. Homogeneity organises returns to scale, factor-price frontiers, and the degree-zero property of Marshallian demand. Implicit differentiation, upgraded to the implicit function theorem, is the engine of [[mathematical-economics/comparative-statics]].

The **elasticity of substitution** is a logarithmic derivative of a ratio of inputs with respect to a ratio of marginal products, along an isoquant. For a twice-differentiable production function it equals

$$
\sigma = \frac{F_K F_L}{F \cdot F_{KL}}
$$

in the homothetic two-input case (the general formula involves the bordered Hessian of $F$). Cobb–Douglas has $\sigma = 1$; a linear technology has $\sigma = \infty$; Leontief (fixed proportions) has $\sigma = 0$. CES, $F = A\bigl(\alpha K^{\rho} + (1-\alpha) L^{\rho}\bigr)^{1/\rho}$, is the family that holds $\sigma = 1/(1-\rho)$ constant. The elasticity of substitution is the parameter that decides, in a competitive model, how a change in the wage–rental ratio is split between a change in the capital–labour ratio and a change in factor shares. It is a property of $F$, computable from partials, and it is estimated, not assumed, whenever the question is empirical.

::: history
**1874, Léon Walras.** *Éléments d'économie politique pure* writes demand as a function of every price, not just its own, and treats equilibrium as a system of simultaneous equations — several variables, by necessity.

**1923, Hugh Dalton** and, more influentially, **1934, John Hicks and R. G. D. Allen.** Their reformulation of consumer theory in terms of the marginal rate of substitution made the slope of an indifference curve, rather than a cardinal marginal utility, the primitive.

**1928, Charles Cobb and Paul Douglas.** The function $P = b L^{k} C^{1-k}$ is homogeneous of degree one, so Euler's theorem was built into the specification that still dominates applied production work.
:::

::: summary
- A **partial derivative** holds other arguments fixed: marginal utility, marginal product, marginal cost.
- The **total differential** $\dd f = \nabla f \cdot \dd\mathbf{x}$ is the first-order change when several arguments move. Along a level curve it is zero, so the slope is $-f_x/f_y$.
- That slope is minus the **MRS** (indifference curves) or minus the **MRTS** (isoquants).
- A function homogeneous of degree $k$ scales as $t^k$. **Euler's theorem** says $\sum x_i f_{x_i} = k f$; for $k = 1$, paying marginal products exhausts output.
- **Implicit differentiation** of a constraint $G(x,y) = c$ gives $dy/dx = -G_x/G_y$, the same formula as the level-curve slope.
:::

## Exercises

::: exercise Partials of a CES fragment {level=1}
Let $f(x,y) = \bigl(x^{1/2} + y^{1/2}\bigr)^2$. Compute $f_x$ and $f_y$ at $(4,9)$.
::: solution
$f_x = 2(x^{1/2}+y^{1/2}) \cdot \tfrac12 x^{-1/2} = (x^{1/2}+y^{1/2})/\sqrt{x} = 1 + \sqrt{y/x}$. At $(4,9)$, $f_x = 1 + 3/2 = 2.5$ and $f_y = 1 + \sqrt{x/y} = 1 + 2/3 = 5/3$.
:::
:::

::: exercise A total differential {level=1}
For $u = \sqrt{xy}$, compute $\dd u$ at $(4,9)$ for $\dd x = 0.2$, $\dd y = -0.1$. Compare with the exact change $u(4.2, 8.9) - u(4,9)$.
::: solution
From [[#ex-mu]], $u_x = 3/4$ and $u_y = 1/3$, so $\dd u = (3/4)(0.2) + (1/3)(-0.1) = 0.15 - 0.0333\ldots = 0.1166\ldots$. Exact: $\sqrt{4.2 \times 8.9} = \sqrt{37.38} \approx 6.1147$, and $\sqrt{36} = 6$, so the exact change is about $0.1147$. The differential overshoots by about $0.002$, a second-order error.
:::
:::

::: exercise MRS {level=1 check="2"}
For $u = x^{2/3} y^{1/3}$, compute $\mathrm{MRS}_{xy} = u_x/u_y$ at $(8,8)$. (Enter the MRS.)
::: solution
$u_x = \tfrac23 x^{-1/3} y^{1/3}$, $u_y = \tfrac13 x^{2/3} y^{-2/3}$, so $u_x/u_y = 2 (y/x)$. At $(8,8)$, $\mathrm{MRS} = 2$.
:::
:::

::: exercise Euler on Cobb–Douglas {level=2}
Verify [[#eq-euler]] directly for $F(K,L) = 5 K^{1/4} L^{3/4}$ without using the theorem: compute both partials, form $K F_K + L F_L$, and compare with $k F$. What is $k$?
::: solution
$F_K = 5 \cdot \tfrac14 K^{-3/4} L^{3/4}$, so $K F_K = \tfrac14 F$. $F_L = 5 \cdot \tfrac34 K^{1/4} L^{-1/4}$, so $L F_L = \tfrac34 F$. The sum is $F$, and $k = 1/4 + 3/4 = 1$.
:::
:::

::: exercise Homogeneity of demand {level=2}
Marshallian demand for a Cobb–Douglas household with $u = x^{a} y^{1-a}$ and income $m$ is $x = a m / p_x$, $y = (1-a)m/p_y$. Show that both demands are homogeneous of degree zero in $(p_x, p_y, m)$. What is the economic reading?
::: solution
Replace $(p_x, p_y, m)$ by $(t p_x, t p_y, t m)$: $x = a (tm)/(t p_x) = a m / p_x$, unchanged, and likewise for $y$. Degree zero: only *relative* prices and *real* income matter. Doubling all prices and income leaves the budget set, and therefore the choice, unchanged — the absence of money illusion.
:::
:::

::: exercise An isoquant slope {level=2}
For $F(K,L) = K^{1/3} L^{2/3}$, find $\dd K/\dd L$ along the isoquant $F = 8$ at the point $(K,L) = (8,8)$.
::: solution
$F_K = \tfrac13 K^{-2/3} L^{2/3}$ and $F_L = \tfrac23 K^{1/3} L^{-1/3}$, so $F_L/F_K = 2 (K/L)$. At $(8,8)$ this ratio is $2$, and $\dd K/\dd L = -F_L/F_K = -2$. Check: $F(8,8) = 8^{1/3} 8^{2/3} = 8$, so the point lies on the isoquant.
:::
:::

::: exercise Decreasing returns and Euler {level=3}
Let $F(K,L) = K^{1/3} L^{1/3}$. (a) Of what degree is $F$ homogeneous? (b) Compute $K F_K + L F_L$ and compare with $F$. (c) If a competitive firm pays $p F_K$ and $p F_L$ for capital and labour, what residual remains as a fraction of revenue?
::: hint
Euler's theorem applies for any $k$, not just $k = 1$.
:::
::: solution
(a) $F(tK,tL) = t^{2/3} F(K,L)$, so $k = 2/3$. (b) $F_K = \tfrac13 K^{-2/3} L^{1/3}$, hence $K F_K = \tfrac13 F$; likewise $L F_L = \tfrac13 F$; the sum is $\tfrac23 F$, matching $k F$. (c) Factor payments total $p \cdot \tfrac23 F = \tfrac23$ of revenue, so the residual (pure profit, or the return to an unmodelled fixed factor) is one-third of revenue.
:::
:::

::: exercise Implicit labour requirement {level=3}
A CES production constraint is $G(q, L) = q - \bigl(8 + L^{1/2}\bigr) = 0$ with capital already absorbed in the $8$. (a) Compute $dL/dq$ at the output $q = 12$. (b) Confirm by inverting $q = 8 + \sqrt{L}$ explicitly.
::: solution
(a) $G_q = 1$, $G_L = -\tfrac12 L^{-1/2}$, so $dL/dq = -G_q/G_L = 2\sqrt{L}$. At $q = 12$, $\sqrt{L} = 4$ and $L = 16$, hence $dL/dq = 8$. (b) $L = (q-8)^2$, so $dL/dq = 2(q-8) = 2\sqrt{L}$, and at $q = 12$ this is $8$. One extra unit of output at this point requires 8 extra units of labour: the short-run marginal product of labour is $1/8$.
:::
:::

