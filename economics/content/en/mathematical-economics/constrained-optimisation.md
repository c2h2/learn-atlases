A household has 12 units of money, faces prices $(p_x, p_y) = (2, 1)$, and ranks bundles by $u(x,y) = \sqrt{xy}$. It cannot buy the unconstrained bliss point — there is none, because more is better — and it cannot spend more than 12. The problem is to maximise $u$ **subject to** $2x + y = 12$ (and $x,y \ge 0$). Substituting $y = 12-2x$ into $u$ reduces the problem to one variable, which we already know how to solve. The **Lagrangian** solves the same problem without substituting, and it produces a number $\lambda$ with a name: the **shadow price** of the constraint, the extra utility that one extra unit of money would buy.

This chapter treats equality constraints by Lagrange multipliers and inequality constraints by the Kuhn–Tucker conditions. The geometry is that of [[mathematical-economics/functions-of-several-variables]]: at an interior optimum the gradient of the objective is parallel to the gradient of the constraint, so an indifference curve is tangent to the budget line. Full proofs of the Lagrange theorem are in the [Maths Atlas](/a/maths/lesson.php?c=multivariable&l=extrema).

## Equality constraints and the Lagrangian

::: definition Lagrangian {#def-lagrangian}
To maximise $f(\mathbf{x})$ subject to $g(\mathbf{x}) = c$, with $f$ and $g$ of class $C^1$ on an open set in $\R^n$, form the **Lagrangian**

$$
\mathcal{L}(\mathbf{x}, \lambda) = f(\mathbf{x}) + \lambda \bigl(c - g(\mathbf{x})\bigr).
$$ {#eq-L}

A **critical point** of the constrained problem is a pair $(\mathbf{x}^*, \lambda^*)$ at which $\nabla_{\mathbf{x}} \mathcal{L} = \mathbf{0}$ and $\partial \mathcal{L}/\partial \lambda = 0$, that is

$$
\nabla f(\mathbf{x}^*) = \lambda^* \nabla g(\mathbf{x}^*), \qquad g(\mathbf{x}^*) = c.
$$ {#eq-lagrange}
:::

The first vector equation says that the two gradients are parallel: there is no feasible direction in which $f$ still increases. The second equation is the constraint. The multiplier $\lambda^*$ is determined jointly with $\mathbf{x}^*$.

::: theorem Lagrange necessary conditions {#thm-lagrange}
Let $f$ and $g$ be $C^1$ and suppose $\mathbf{x}^*$ is a local maximiser of $f$ on the constraint set $g(\mathbf{x}) = c$. If $\nabla g(\mathbf{x}^*) \neq \mathbf{0}$ (**constraint qualification**), then there exists $\lambda^*$ such that [[#eq-lagrange]] holds.
:::
::: proof Sketch
The constraint set is a hypersurface near $\mathbf{x}^*$ because $\nabla g(\mathbf{x}^*) \neq \mathbf{0}$; by the implicit function theorem one can parametrise it and reduce to an unconstrained problem in $n-1$ variables. The chain rule then says that $\nabla f(\mathbf{x}^*)$ is orthogonal to every tangent vector of the constraint, hence parallel to $\nabla g(\mathbf{x}^*)$. A complete proof is in the [Maths Atlas](/a/maths/lesson.php?c=multivariable&l=extrema).
:::

With two goods and a budget $p_x x + p_y y = m$, [[#eq-lagrange]] reads $u_x = \lambda p_x$, $u_y = \lambda p_y$, and the budget. Dividing, $u_x / u_y = p_x / p_y$: the **MRS equals the price ratio**, the tangency condition of undergraduate microeconomics. The multiplier is $\lambda = u_x / p_x = u_y / p_y$, the marginal utility per unit of money, equalised across goods.

::: example A Cobb–Douglas household {#ex-cd-lagrange}
Maximise $u(x,y) = \sqrt{xy}$ subject to $2x + y = 12$, $x,y > 0$.
::: solution
$\mathcal{L} = \sqrt{xy} + \lambda (12 - 2x - y)$. The first-order conditions are
$$
\frac12 \sqrt{y/x} = 2\lambda, \qquad \frac12 \sqrt{x/y} = \lambda, \qquad 2x + y = 12.
$$
Dividing the first by the second, $y/x = 2$, so $y = 2x$. The budget then gives $2x + 2x = 12$, $x^* = 3$, $y^* = 6$. From the second equation, $\lambda^* = \tfrac12 \sqrt{3/6} = \tfrac12 \cdot 1/\sqrt{2} = \sqrt{2}/4 \approx 0.3536$. Utility is $\sqrt{18} = 3\sqrt{2} \approx 4.243$. The same point is reached by substituting $y = 12-2x$ into $u$ and maximising $h(x) = \sqrt{x(12-2x)}$: $h'(x) = 0$ at $x = 3$.
:::
:::

::: widget contour
f: sqrt(x*y)
x: 0.2, 8
y: 0.2, 14
levels: 12
gradient: true
constraint: 2*x + y - 12
point: 3, 6
caption: Indifference curves of $\sqrt{xy}$ and the budget $2x+y=12$. At $(3,6)$ the two gradients line up: $\nabla u = \bigl(\sqrt{2}/2,\, \sqrt{2}/4\bigr)$ and $\nabla g = (2,1)$, with $\nabla u = \lambda \nabla g$ for $\lambda = \sqrt{2}/4$. Drag the point along the budget line and watch the indifference curve cut the budget, except at this tangency.
:::

Second-order conditions for a constrained maximum involve the **bordered Hessian** of $\mathcal{L}$. For two variables and one constraint, a sufficient condition is that

$$
\det \begin{pmatrix} 0 & g_x & g_y \\ g_x & \mathcal{L}_{xx} & \mathcal{L}_{xy} \\ g_y & \mathcal{L}_{yx} & \mathcal{L}_{yy} \end{pmatrix} > 0
$$

at the critical point (the principal minor of order 3 of the bordered Hessian). In economic practice one often knows by concavity: if $f$ is concave and $g$ is linear, the constraint set is convex and [[#thm-lagrange]] is sufficient as well as necessary, by the concave-maximisation theorem of the previous chapter applied to $\mathcal{L}$ in $\mathbf{x}$.

::: warning Constraint qualification
If $\nabla g(\mathbf{x}^*) = \mathbf{0}$, the Lagrange conditions can fail. The standard classroom example is $\max x$ subject to $x^3 = 0$: the unique feasible point is $x = 0$, which is the maximum, but $\nabla g = 3x^2$ vanishes there and no $\lambda$ satisfies $1 = \lambda \cdot 0$. In consumer theory the budget gradient is the price vector, which is not zero. Always state the qualification; it is not automatic for nonlinear constraints (capacity constraints of the form $(q-\bar q)^3 = 0$ are the sort of thing that goes wrong).
:::

## The multiplier as a shadow price

The reason to keep $\lambda$ rather than substitute the constraint out is that $\lambda$ answers a comparative-static question: what is extra constraint-capacity worth?

::: theorem Shadow price {#thm-shadow}
Let $v(c) = \max_{\mathbf{x}} \bigl\{ f(\mathbf{x}) : g(\mathbf{x}) = c \bigr\}$ be the **maximum-value function**, and suppose the hypotheses of [[#thm-lagrange]] hold at an interior solution $\mathbf{x}^*(c)$ that is $C^1$ in $c$. Then

$$
v'(c) = \lambda^*(c).
$$ {#eq-shadow}

That is, $\lambda^*$ is the rate at which the maximised objective rises as the constraint is relaxed.
:::
::: proof
$v(c) = f\bigl(\mathbf{x}^*(c)\bigr)$. Differentiating, $v'(c) = \nabla f \cdot \mathbf{x}^{*\prime}(c)$. From [[#eq-lagrange]], $\nabla f = \lambda^* \nabla g$, so $v'(c) = \lambda^* \nabla g \cdot \mathbf{x}^{*\prime}(c)$. Differentiating the identity $g\bigl(\mathbf{x}^*(c)\bigr) = c$ gives $\nabla g \cdot \mathbf{x}^{*\prime}(c) = 1$. Hence $v'(c) = \lambda^*$.
:::

This is a special case of the envelope theorem of the next chapter. In the household problem, $c = m$ is income and $v(m)$ is **indirect utility**; $\lambda^*$ is the marginal utility of income. In a cost-minimisation problem, $\min w L + r K$ subject to $F(K,L) = q$, the multiplier on the output constraint is **marginal cost**. In a planner's problem with a resource constraint, the multiplier is the social value of the resource.

::: example Relaxing the budget {#ex-shadow}
In [[#ex-cd-lagrange]], $\lambda^* \approx 0.3536$. If income rises from 12 to 13, the new demand is $x = 13/4 = 3.25$, $y = 13/2 = 6.5$, and $u = \sqrt{3.25 \times 6.5} = \sqrt{21.125} \approx 4.596$. The discrete extra utility is $4.596 - 4.243 = 0.353$, matching $\lambda^*$ to three decimals. The match is not an accident: for Cobb–Douglas with this specification, $v(m) = m/(2\sqrt{2})$ and $v'(m) = 1/(2\sqrt{2}) = \sqrt{2}/4 = \lambda^*$ exactly, at every $m$.
:::

::: quiz
In a cost-minimisation problem $\min wL + rK$ s.t. $F(K,L) = q$, the Lagrange multiplier on the output constraint is
- [ ] the wage
- [x] marginal cost, $\dd C/\dd q$
- [ ] the rental rate of capital
- [ ] minus marginal cost, because cost is being minimised
::: solution
By [[#thm-shadow]], the multiplier is the derivative of the minimised objective (cost) with respect to the constraint level $q$, which is marginal cost. The sign is positive: extra required output raises minimised cost. (If one wrote $\mathcal{L} = wL + rK + \mu (q - F)$, then $\mu = MC$; if the constraint were written $F-q = 0$ with the opposite sign convention, the multiplier would flip. State the convention.)
:::
:::

## Inequality constraints: Kuhn–Tucker

A household might not spend all its income if a bliss point lies inside the budget set; a firm might not use all of a capacity constraint; labour cannot be negative. These are **inequalities**. The Kuhn–Tucker conditions extend Lagrange by adding complementary slackness.

::: definition Kuhn–Tucker conditions {#def-kt}
To maximise $f(\mathbf{x})$ subject to $g_j(\mathbf{x}) \le c_j$ for $j = 1, \dots, m$ and (optionally) $\mathbf{x} \ge \mathbf{0}$, form $\mathcal{L} = f(\mathbf{x}) + \sum_j \lambda_j \bigl(c_j - g_j(\mathbf{x})\bigr)$. A point $\mathbf{x}^*$ with multipliers $\boldsymbol\lambda^* \ge \mathbf{0}$ satisfies the **Kuhn–Tucker conditions** if

1. **Stationarity.** $\nabla_{\mathbf{x}} \mathcal{L}(\mathbf{x}^*, \boldsymbol\lambda^*) = \mathbf{0}$ (or $\le \mathbf{0}$, with complementary slackness, if $\mathbf{x} \ge \mathbf{0}$ is imposed this way).
2. **Primal feasibility.** $g_j(\mathbf{x}^*) \le c_j$ for all $j$.
3. **Dual feasibility.** $\lambda_j^* \ge 0$ for all $j$.
4. **Complementary slackness.** $\lambda_j^* \bigl(c_j - g_j(\mathbf{x}^*)\bigr) = 0$ for all $j$.

Complementary slackness says: if a constraint is slack, its multiplier is zero (the constraint is not locally worth anything); if a multiplier is positive, the constraint binds.
:::

::: theorem Kuhn–Tucker necessity {#thm-kt}
If $\mathbf{x}^*$ maximises $f$ on the inequality-constrained set, $f$ and each $g_j$ are $C^1$, and a constraint qualification holds at $\mathbf{x}^*$ (for example, the gradients of the *binding* constraints are linearly independent — the **linear-independence qualification**, LICQ), then there exist $\boldsymbol\lambda^* \ge \mathbf{0}$ such that the Kuhn–Tucker conditions hold.
:::

Sufficiency follows, as before, from concavity: if $f$ is concave and each $g_j$ is convex, a Kuhn–Tucker point is a global maximiser.

The practical recipe is to guess which constraints bind, solve the resulting equality-constrained problem, and check the remaining inequalities and the signs of the multipliers. With two or three constraints the cases are few; with many, the problem is a genuine complementarity problem and one uses a solver.

::: example A capacity constraint {#ex-kt-capacity}
Maximise $\pi(x,y) = 10x - x^2 + 8y - y^2$ subject to $x + y \le 6$ and $x,y \ge 0$.
::: solution
Ignore the inequality first: unconstrained maximisation gives $10-2x = 0$, $8-2y = 0$, so $(x,y) = (5,4)$. But $5+4 = 9 > 6$, so the capacity constraint must bind. Now maximise on $x+y = 6$. The Lagrangian is $\mathcal{L} = 10x-x^2+8y-y^2 + \lambda(6-x-y)$, and stationarity gives $10-2x = \lambda = 8-2y$, so $x - y = 1$. Together with $x+y = 6$, $x^* = 3.5$, $y^* = 2.5$, $\lambda^* = 10-7 = 3 > 0$. Both outputs are positive, so the non-negativity constraints are slack. Complementary slackness holds: the capacity constraint binds and $\lambda^* > 0$. Because $\pi$ is strictly concave (Hessian $\operatorname{diag}(-2,-2)$) and the constraint is linear, this is the unique global maximum. Profit is $10\cdot 3.5 - 3.5^2 + 8\cdot 2.5 - 2.5^2 = 35 - 12.25 + 20 - 6.25 = 36.5$. The shadow price $\lambda^* = 3$ says that one extra unit of capacity would raise profit by 3.
:::
:::

::: example A slack budget {#ex-kt-slack}
Maximise $u(x,y) = 10x - x^2 + 10y - y^2$ subject to $x+y \le 20$ and $x,y \ge 0$.
::: solution
The unconstrained peak is $(5,5)$, and $5+5 = 10 \le 20$: it is feasible. So the budget is slack, $\lambda^* = 0$, and the Kuhn–Tucker point is $(5,5)$ with $\lambda^* = 0$. Complementary slackness: $\lambda^* \times (20-10) = 0$. This is a bliss-point consumer; extra income is worthless at the margin, which is exactly $\lambda^* = 0$.
:::
:::

::: widget plot
f: 10*x - x*x; 8*(6-x) - (6-x)*(6-x); (10*x-x*x) + (8*(6-x)-(6-x)*(6-x))
x: 0, 6
y: -5, 45
labels: \text{profit from } x; \text{profit from } y=6-x; \text{total on the capacity line}
caption: On the binding capacity constraint of [[#ex-kt-capacity]], $y = 6-x$ and total profit is a function of $x$ alone. Its peak is at $x = 3.5$, matching the Kuhn–Tucker point. The two single-output profit curves cross where $10-2x = 8-2(6-x)$, the equalisation of marginal profits that $\lambda$ enforces.
:::

Non-negativity is an inequality like any other. For a firm that might shut down one product, the stationarity condition in that coordinate becomes $\partial\mathcal{L}/\partial x_i \le 0$, with equality if $x_i > 0$. That is the familiar complementary-slackness form of $MR \le MC$, with equality when the good is produced.

Several constraints are handled by several multipliers. A household with two goods, a budget, and a ration $x \le \bar x$ has $\mathcal{L} = u(x,y) + \lambda(m-p_x x-p_y y) + \mu(\bar x - x)$. Complementary slackness on $\mu$ says: if the ration does not bind, $\mu = 0$ and we are back to the ordinary tangency; if it binds, $\mu > 0$ and $u_x = \lambda p_x + \mu$, so the MRS exceeds the price ratio — the household would like more $x$ than the ration allows, and $\mu$ is the money value of a marginal relaxation of the ration. Wartime coupons, foreign-exchange controls and capacity constraints in production are all of this form.

The sign convention on $\lambda$ is a standing source of confusion. This chapter writes $\mathcal{L} = f + \lambda(c-g)$, so that a larger $c$ raises $\mathcal{L}$ and $\lambda = v'(c) \ge 0$ at a maximum. Some authors write $\mathcal{L} = f - \lambda(g-c)$ (the same thing) and some write $\mathcal{L} = f + \lambda g$ with the constraint $g = 0$, in which case the sign of $\lambda$ depends on which way $g$ was written. Always compute $\lambda$ from a first-order condition rather than guessing its sign, and always state which convention is in use when reporting a shadow price.

## Where this leads

The consumer's problem, the firm's cost-minimisation problem, and the planner's problem are all Lagrangians; they occupy [[microeconomics/consumer-choice]] and the theory of the firm. Inequality constraints are the language of rationing, of limited capacity, of limited liability, and of incentive-compatibility in [[information-economics]]. The multiplier, as a function of the parameters, is the raw material of the envelope theorem in [[mathematical-economics/comparative-statics]]. In continuous time the same construction becomes a Hamiltonian, with a co-state variable playing the role of $\lambda$, in [[mathematical-economics/dynamic-optimisation]].

Linear programming is the Kuhn–Tucker problem in which $f$ and every $g_j$ are linear. The first-order conditions then say that at a vertex of the feasible polytope, the gradient of $f$ lies in the cone spanned by the gradients of the binding constraints. Simplex methods walk from vertex to vertex; interior-point methods walk through the interior with a barrier that encodes the inequalities. Duality is exact: the dual variables are the multipliers, and complementary slackness is the statement that a slack primal constraint has a zero dual price. Economists met this first as activity analysis (Koopmans) and as the diet problem; they meet it now as a planner's problem with many linear resource constraints, and as the transportation and assignment problems of [[market-design]]. The concave programmes of this chapter are the smooth analogue: unique interior solutions instead of vertices, but the same shadow-price reading of $\lambda$.

::: history
**1788, Joseph-Louis Lagrange.** *Mécanique analytique* introduces the multiplier method for equality constraints in mechanics; the economic reading as a shadow price came much later.

**1951, Harold Kuhn and Albert Tucker.** “Nonlinear programming”, in the *Proceedings of the Second Berkeley Symposium*, gives the necessary conditions for inequality-constrained problems that bear their names. (Karush had the conditions in an unpublished 1939 MSc thesis.)

**1958, Paul Samuelson.** *Linear programming and economic analysis* (with Dorfman and Solow) made the shadow-price reading of dual variables standard in economics, for linear programmes first and then for the concave programmes of this chapter.
:::

::: summary
- To maximise $f$ subject to $g(\mathbf{x}) = c$, solve $\nabla f = \lambda \nabla g$ together with the constraint. Geometrically, level sets are tangent.
- The multiplier $\lambda^*$ equals $v'(c)$, the derivative of the maximum-value function: it is the **shadow price** of the constraint.
- For inequalities $g_j \le c_j$, the **Kuhn–Tucker** conditions add $\lambda_j \ge 0$ and complementary slackness $\lambda_j (c_j - g_j) = 0$.
- Constraint qualification (typically $\nabla g \neq \mathbf{0}$, or LICQ) is required for necessity. Concavity of $f$ and convexity of the constraint set give sufficiency.
- A slack constraint has a zero multiplier; a positive multiplier means the constraint binds and is locally valuable.
:::

## Exercises

::: exercise Substitute then maximise {level=1}
Maximise $u(x,y) = xy$ subject to $x + 2y = 16$ by substituting out $y$. Confirm that the same point satisfies the Lagrange conditions, and find $\lambda^*$.
::: solution
$y = 8 - x/2$, $h(x) = x(8-x/2) = 8x - x^2/2$, $h'(x) = 8 - x = 0$, so $x^* = 8$, $y^* = 4$. Then $u_x = y = 4$, $u_y = x = 8$, and $\nabla g = (1, 2)$, so $4 = \lambda \cdot 1$ and $8 = \lambda \cdot 2$ both give $\lambda^* = 4$. The budget holds.
:::
:::

::: exercise A Cobb–Douglas share {level=1 check="6"}
Maximise $x^{1/3} y^{2/3}$ subject to $x + 2y = 18$. Find $x^*$. (Enter $x^*$.)
::: solution
For $u = x^{a} y^{1-a}$ the household spends a share $a$ of income on $x$. Here $a = 1/3$, income is $18$ and $p_x = 1$, so $x^* = (1/3)\cdot 18 / 1 = 6$. Then $p_y y = 12$ with $p_y = 2$ gives $y^* = 6$. Check: $\mathrm{MRS} = u_x/u_y = y/(2x) = 6/12 = 1/2$, and $p_x/p_y = 1/2$.
:::
:::

::: exercise Cost minimisation {level=1}
Minimise $4K + 2L$ subject to $K^{1/2} L^{1/2} = 8$. Find the cost-minimising bundle and the multiplier on the output constraint. What is minimised cost, and how does it compare with the multiplier?
::: solution
$\mathcal{L} = 4K + 2L + \lambda \bigl(8 - \sqrt{KL}\bigr)$. Stationarity: $4 = \lambda \cdot \tfrac12 \sqrt{L/K}$, $2 = \lambda \cdot \tfrac12 \sqrt{K/L}$. Dividing, $2 = L/K$, so $L = 2K$. Then $\sqrt{K \cdot 2K} = 8$, $K\sqrt{2} = 8$, $K^* = 8/\sqrt{2} = 4\sqrt{2}$, $L^* = 8\sqrt{2}$. Cost is $4\cdot 4\sqrt{2} + 2\cdot 8\sqrt{2} = 16\sqrt{2} + 16\sqrt{2} = 32\sqrt{2} \approx 45.25$. From the second stationarity equation, $\lambda^* = 4 / \sqrt{K/L} = 4 / \sqrt{1/2} = 4\sqrt{2} \approx 5.657$. Marginal cost of a CES-Cobb–Douglas with constant returns is constant, and $C(q) = 4\sqrt{2}\, q$ here because $C(8) = 32\sqrt{2}$ implies $C(q) = 4\sqrt{2}\, q$; indeed $C'(q) = 4\sqrt{2} = \lambda^*$.
:::
:::

::: exercise Two constraints {level=2}
Maximise $x + 2y$ subject to $x + y = 5$ and $x + 3y = 9$. Solve by substitution or by two multipliers, and comment on whether this is a genuine optimisation problem.
::: solution
The two linear constraints already determine a unique point: subtract, $2y = 4$, $y = 2$, $x = 3$. There is nothing left to maximise — the feasible set is a singleton. The two-multiplier Lagrangian $\mathcal{L} = x+2y + \lambda(5-x-y) + \mu(9-x-3y)$ gives $1 = \lambda + \mu$, $2 = \lambda + 3\mu$, so $\mu = 1/2$, $\lambda = 1/2$, and the constraints hold. The conditions are satisfied, but they are just the dual of a $2 \times 2$ linear system. Optimisation needs a feasible set with some room to move.
:::
:::

::: exercise A binding non-negativity constraint {level=2}
Maximise $\pi(x,y) = 8x - x^2 + 2y - y^2$ subject to $x+y \le 6$ and $x,y \ge 0$. Find the Kuhn–Tucker point.
::: solution
Unconstrained: $(x,y) = (4,1)$, and $4+1 = 5 \le 6$, so capacity is slack. Both outputs are positive, so the point $(4,1)$ with $\lambda_{\text{cap}} = 0$ is Kuhn–Tucker. Profit is $16 + 1 = 17$. (If the linear term on $y$ had been negative, say $-2y$, the unconstrained $y$ would be negative and the optimum would sit on $y = 0$.)
:::
:::

::: exercise Check complementary slackness {level=2}
A firm maximises $12x + 8y - x^2 - y^2$ subject to $x \le 4$ and $x+y \le 10$, $x,y \ge 0$. Show that the unconstrained peak violates $x \le 4$, solve with that constraint binding, and verify all Kuhn–Tucker conditions.
::: solution
Unconstrained: $(6,4)$, which has $x = 6 > 4$. Bind $x = 4$. Then the objective in $y$ is $8y - y^2$ plus a constant, maximised at $y = 4$, and $4+4 = 8 \le 10$. Multipliers: stationarity in $x$ reads $12 - 2x - \lambda_x - \lambda_{xy} = 0$. With $x = 4$, $y = 4$, $\lambda_{xy} = 0$ (capacity slack), so $12-8-\lambda_x = 0$, $\lambda_x = 4 > 0$. Stationarity in $y$: $8-2y -\lambda_{xy} = 0$ holds as $0=0$. Complementary slackness: $\lambda_x (4-x) = 0$, $\lambda_{xy}(10-x-y) = 0$. Non-negativity is slack. All conditions hold. Profit is $12\cdot 4 + 8\cdot 4 - 16 - 16 = 48+32-32 = 48$.
:::
:::

::: exercise Shadow price of a tax {level=3}
A household maximises $\ln x + \ln y$ subject to $(1+t)x + y = m$, where $t > 0$ is a tax on good $x$. Find $x^*(t,m)$, $y^*(t,m)$ and $\lambda^*(t,m)$. Compute $\partial v/\partial t$ two ways: by differentiating $v(t,m) = \ln x^* + \ln y^*$ directly, and by the envelope theorem applied to $\mathcal{L} = \ln x + \ln y + \lambda\bigl(m - (1+t)x - y\bigr)$. Confirm they agree.
::: hint
The envelope theorem says you differentiate $\mathcal{L}$ with respect to $t$ *holding $(x,y,\lambda)$ at their optimal values*.
:::
::: solution
Equalisation of weighted marginal utilities: $1/x = \lambda(1+t)$, $1/y = \lambda$, so $y = (1+t)x$ and $(1+t)x + (1+t)x = m$, hence $x^* = m/\bigl(2(1+t)\bigr)$, $y^* = m/2$, $\lambda^* = 2/m$. Indirect utility is $v = \ln\bigl(m/(2(1+t))\bigr) + \ln(m/2) = 2\ln m - \ln(1+t) - 2\ln 2$. Then $\partial v/\partial t = -1/(1+t)$. The envelope formula: $\partial\mathcal{L}/\partial t = -\lambda^* x^* = -(2/m)\cdot m/\bigl(2(1+t)\bigr) = -1/(1+t)$. They agree. The tax has a first-order cost equal to the taxed quantity times the marginal utility of money — the extra expenditure the tax forces, valued at $\lambda$.
:::
:::

::: exercise Sufficiency needs concavity {level=3}
Maximise $f(x) = x^3 - x$ subject to $-2 \le x \le 2$. Find every Kuhn–Tucker point (treat the two bounds as inequalities). Which of them is the global maximiser? Why is sufficiency of [[#thm-kt]] not available here?
::: hint
Stationarity of $\mathcal{L} = x^3 - x + \lambda_+(2-x) + \lambda_- (x+2)$ is $3x^2 - 1 - \lambda_+ + \lambda_- = 0$, with $\lambda_\pm \ge 0$ and complementary slackness on each bound.
:::
::: solution
Interior KT points have $\lambda_+ = \lambda_- = 0$ and $3x^2-1 = 0$, so $x = \pm 1/\sqrt{3}$. At $x = 2$, the upper bound binds, $\lambda_- = 0$, and $3\cdot 4 - 1 - \lambda_+ = 0$ gives $\lambda_+ = 11 > 0$. At $x = -2$, the lower bound binds, $\lambda_+ = 0$, and $3\cdot 4 - 1 + \lambda_- = 0$ gives $\lambda_- = -11$, which is *not* $\ge 0$: $x = -2$ is not a Kuhn–Tucker point (and indeed $f$ is increasing there). So the KT points are $x = \pm 1/\sqrt{3}$ and $x = 2$. Now $f(2) = 6$, $f(-1/\sqrt{3}) = 2/(3\sqrt{3}) \approx 0.385$, and $f(1/\sqrt{3}) = -2/(3\sqrt{3}) \approx -0.385$. The global maximiser is $x = 2$. The interior point $x = -1/\sqrt{3}$ is a *local* maximum ($f''(-1/\sqrt{3}) < 0$) but not global, and $x = 1/\sqrt{3}$ is a local minimum. Sufficiency fails because $f$ is not concave ($f'' = 6x$ changes sign). Kuhn–Tucker points can be local maxima, local minima, or the global maximum; concavity (or a second-order test) is what selects.
:::
:::


