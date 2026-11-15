The shopper of the previous chapter can afford any bundle on or below the line $2x_1 + x_2 = 12$. She ranks those bundles with a preference relation, represented say by $u = x_1^{1/3} x_2^{2/3}$. Which point does she pick, and how does the pick change when the price of rice falls from 2 to 1? That is the **utility maximisation problem** (UMP). Its solution, as a function of prices and income, is **Marshallian demand**. The value of the problem, as a function of the same variables, is **indirect utility**. An identity of René Roy then recovers demand from indirect utility by a single differentiation — the first of several envelope tricks that run through the course.

This chapter sets up the UMP, writes the Lagrangian and the first-order conditions, solves them for the standard families of [[microeconomics/preferences-and-utility]], records the general properties of Marshallian demand (homogeneity, Walras's law, Engel aggregation), defines the indirect utility function $v(\mathbf{p}, m)$, and proves Roy's identity. The dual problem — expenditure minimisation — and the Slutsky equation wait until [[microeconomics/slutsky-and-welfare]]. The mathematical engine is constrained optimisation with equality constraints ([[mathematical-economics/constrained-optimisation]]); we state the Kuhn–Tucker version for corners but compute mostly interior tangencies.

## The utility maximisation problem

::: definition Utility maximisation problem {#def-ump}
Given a utility function $u$ on $\R_+^n$, prices $\mathbf{p} \gg \mathbf{0}$ and income $m > 0$, the **utility maximisation problem** is

$$
\max_{\mathbf{x} \ge \mathbf{0}} u(\mathbf{x}) \quad\text{subject to}\quad \mathbf{p}\cdot\mathbf{x} \le m.
$$ {#eq-ump}

A solution $\mathbf{x}^*(\mathbf{p}, m)$ is a **Marshallian (uncompensated, Walrasian) demand**. If $u$ is continuous and $B(\mathbf{p}, m)$ is compact, a solution exists. If $u$ is strictly quasiconcave the solution is unique, and we write $x_i(\mathbf{p}, m)$ for the demand for good $i$.
:::

Local non-satiation ([[microeconomics/preferences-and-utility#def-prefs]]) upgrades the inequality constraint to an equality: a slack budget would leave room for a nearby better bundle. We therefore work with $\mathbf{p}\cdot\mathbf{x} = m$ unless a non-negativity constraint $x_i = 0$ binds (a **corner**). Existence is Weierstrass: a continuous function on a nonempty compact set attains its maximum. Uniqueness is strict quasiconcavity: two distinct maxima would give a strictly better convex combination, still affordable by convexity of the budget set.

The geometry in two goods is the one drawn in every textbook: the highest indifference curve that still touches the budget line. At an interior tangency the slopes agree,

$$
\mathrm{MRS}_{12}(x_1, x_2) = \frac{p_1}{p_2},
$$ {#eq-tangency}

together with $p_1 x_1 + p_2 x_2 = m$. Equation [[#eq-tangency]] says that the rate at which the consumer is *willing* to trade equals the rate at which the market *allows* her to trade. If the MRS at every interior point exceeds $p_1/p_2$ she spends everything on good 1; if it falls short, everything on good 2. Those are the corners.

::: intuition The last-unit test
An equivalent statement of [[#eq-tangency]] is $u_1/p_1 = u_2/p_2$: the last unit of money spent on each good must yield the same marginal utility. If it did not, the consumer could move a small amount of expenditure towards the good with the higher bang-per-buck and raise $u$ without spending more. That rearrangement argument is the economic content of the Lagrangian multiplier below.
:::

## The Lagrangian and interior demand

For an interior solution ($x_i > 0$ all $i$) the constraint is the single equality $\mathbf{p}\cdot\mathbf{x} = m$. The Lagrangian of [[mathematical-economics/constrained-optimisation]] is

$$
\mathcal{L}(\mathbf{x}, \lambda) = u(\mathbf{x}) + \lambda\bigl(m - \mathbf{p}\cdot\mathbf{x}\bigr).
$$ {#eq-lagrange}

::: proposition Interior first-order conditions {#prop-foc}
Suppose $u$ is continuously differentiable and $\mathbf{x}^* \gg \mathbf{0}$ solves the UMP. Then there exists $\lambda^* \ge 0$ such that

$$
\frac{\partial u}{\partial x_i}(\mathbf{x}^*) = \lambda^* p_i \qquad\text{for all } i, \qquad \mathbf{p}\cdot\mathbf{x}^* = m.
$$ {#eq-foc}

Equivalently $\nabla u(\mathbf{x}^*) = \lambda^* \mathbf{p}$, or $\mathrm{MRS}_{ij}(\mathbf{x}^*) = p_i/p_j$ for every pair. The multiplier $\lambda^*$ is the **marginal utility of income**: $\lambda^* = \partial v/\partial m$ at the optimum, where $v$ is the indirect utility function of [[#def-indirect]].
:::

::: proof
The first-order conditions of the Lagrangian [[#eq-lagrange]] are $\partial\mathcal{L}/\partial x_i = u_i - \lambda p_i = 0$ and $\partial\mathcal{L}/\partial\lambda = m - \mathbf{p}\cdot\mathbf{x} = 0$. (A constraint qualification holds because $\mathbf{p} \neq \mathbf{0}$.) The MRS form follows by dividing two of the $u_i = \lambda p_i$ equations. That $\lambda = \partial v/\partial m$ is the envelope theorem applied to $\mathcal{L}$: differentiating the maximised Lagrangian with respect to $m$ holds $\mathbf{x}$ and $\lambda$ at their optimal values and leaves $\partial\mathcal{L}/\partial m = \lambda$. Non-negativity of $\lambda$ is monotonicity of $u$.
:::

Second-order conditions: if $u$ is quasiconcave then a point satisfying [[#eq-foc]] is a maximum (the bordered Hessian condition of [[mathematical-economics/constrained-optimisation]] holds automatically for strictly quasiconcave $u$). We will not check bordered Hessians in examples; we pick functional forms for which quasiconcavity is known.

When a non-negativity constraint $x_k \ge 0$ may bind, the first-order conditions become Kuhn–Tucker:

$$
u_i - \lambda p_i \le 0,\qquad x_i \ge 0,\qquad x_i(u_i - \lambda p_i) = 0,
$$

together with $\lambda \ge 0$, $\mathbf{p}\cdot\mathbf{x} \le m$, and complementary slackness on the budget. In two goods this says: if $x_1 = 0$, then $u_1/u_2 \le p_1/p_2$ at the chosen point (the indifference curve is flatter than the budget, so the consumer does not want to buy any of good 1). Perfect substitutes are the clean illustration.

::: example Cobb–Douglas, worked {#ex-cd-ump}
Let $u(x_1, x_2) = x_1^{1/3} x_2^{2/3}$, $p_1 = 2$, $p_2 = 1$, $m = 12$. Find the Marshallian demand and the multiplier $\lambda^*$.
::: solution
The Lagrangian is $\mathcal{L} = x_1^{1/3} x_2^{2/3} + \lambda(12 - 2x_1 - x_2)$. First-order conditions:

$$
\frac13 x_1^{-2/3} x_2^{2/3} = 2\lambda,\qquad \frac23 x_1^{1/3} x_2^{-1/3} = \lambda,\qquad 2x_1 + x_2 = 12.
$$

Dividing the first by the second eliminates $\lambda$:

$$
\frac{1/3}{2/3}\cdot\frac{x_2}{x_1} = 2 \implies \frac12\cdot\frac{x_2}{x_1} = 2 \implies x_2 = 4x_1.
$$

(The same from $\mathrm{MRS}_{12} = p_1/p_2$: $(1/2)(x_2/x_1) = 2$.) Substitute into the budget: $2x_1 + 4x_1 = 12$, so $x_1^* = 2$, $x_2^* = 8$. Then $\lambda^* = (2/3)\, 2^{1/3}\, 8^{-1/3} = (2/3)\cdot 2^{1/3}/2 = (1/3)\, 2^{1/3} \approx 0.420$. Equivalently $\lambda^* = u_2/p_2$ at the optimum.

Check: expenditure on good 1 is $2\cdot 2 = 4 = (1/3)m$; expenditure on good 2 is $8 = (2/3)m$. The shares equal the exponents. Utility at the optimum is $2^{1/3}\, 8^{2/3} = 2^{1/3}\,(2^3)^{2/3} = 2^{1/3}\cdot 2^2 = 2^{7/3} \approx 5.040$.
:::
:::

The pattern of [[#ex-cd-ump]] is general.

::: proposition Cobb–Douglas demand {#prop-cd-demand}
For $u(x_1, x_2) = x_1^a x_2^{b}$ with $a, b > 0$, Marshallian demands are

$$
x_1(\mathbf{p}, m) = \frac{a}{a+b}\cdot\frac{m}{p_1},\qquad x_2(\mathbf{p}, m) = \frac{b}{a+b}\cdot\frac{m}{p_2}.
$$ {#eq-cd-demand}

Expenditure shares are the constant fractions $a/(a+b)$ and $b/(a+b)$, independent of prices and income. Both goods are normal, own-price elasticities equal $-1$, and cross-price elasticities equal $0$.
:::

::: proof
$\mathrm{MRS}_{12} = (a/b)(x_2/x_1) = p_1/p_2$ rearranges to $a p_2 x_2 = b p_1 x_1$. Substitute $p_2 x_2 = m - p_1 x_1$: $a(m - p_1 x_1) = b p_1 x_1$, so $(a+b)p_1 x_1 = a m$. The elasticity claims: $\partial x_1/\partial p_1 = -a m/((a+b)p_1^2)$, so $\varepsilon_{11} = (\partial x_1/\partial p_1)(p_1/x_1) = -1$; $\partial x_1/\partial p_2 = 0$; $\partial x_1/\partial m = a/((a+b)p_1) > 0$.
:::

Constant shares are the reason Cobb–Douglas is the default example: once you remember "spend fraction $a/(a+b)$ on good 1", every numerical question of this type is mental arithmetic. They are also a strong empirical restriction, as Engel's law in the previous chapter already showed.

::: widget contour
f: x^(1/3) * y^(2/3)
x: 0.2, 10
y: 0.2, 16
levels: 10
gradient: true
constraint: 2*x + y - m
point: 2, 8
sliders: m=12:6:18:0.5
caption: The UMP for $u=x^{1/3} y^{2/3}$ and budget $2x+y=m$. At $m=12$ the tangency is $(2,8)$, as in [[#ex-cd-ump]]: $\nabla u$ is parallel to the constraint gradient $(2,1)$. Raise $m$; because preferences are homothetic the tangency slides out along the ray $y=4x$. Drag the point off the tangency and the gradient ceases to be normal to the budget — a feasible move along the line would raise $u$.
:::

::: example Perfect complements and a corner {#ex-complements-corner}
(a) $u = \min\set{x_1, x_2}$, $p_1 = 1$, $p_2 = 2$, $m = 12$. Find demand. (b) $u = 2x_1 + x_2$, same prices and income. Find demand.
::: solution
(a) The consumer never buys off the ray $x_1 = x_2$: leftover units of one good add nothing to $u$. Set $x_1 = x_2 = x$ in the budget: $x + 2x = 12$, so $x = 4$. Demand is $(4, 4)$, utility $4$. (The Lagrangian does not apply at the kink; this is a direct argument.)

(b) $\mathrm{MRS}_{12} = 2 > p_1/p_2 = 1/2$. The indifference curves are steeper than the budget, so the consumer climbs to the $x_1$-intercept: $x_1 = 12/1 = 12$, $x_2 = 0$. Check the Kuhn–Tucker condition at this corner: $u_1/p_1 = 2/1 = 2$ and $u_2/p_2 = 1/2$, and $2 > 1/2$, so the bang-per-buck of good 1 exceeds that of good 2, consistent with buying only good 1.
:::
:::

::: example Quasi-linear demand, interior and corner {#ex-ql}
Let $u = \ln x_1 + x_2$ with $x_1 > 0$, $p_2 = 1$, and $p_1 > 0$. Find $x_1(\mathbf{p}, m)$ and $x_2(\mathbf{p}, m)$, including the income threshold at which the consumer hits the corner $x_2 = 0$.
::: solution
Interior FOC: $u_1/u_2 = 1/x_1 = p_1/p_2 = p_1$, so $x_1 = 1/p_1$. Then $x_2 = m - p_1 x_1 = m - 1$. This is interior as long as $x_2 > 0$, i.e. $m > 1$. If $m \le 1$ the consumer cannot afford the interior $x_1$ and still have leftover for the numeraire; she sets $x_2 = 0$ and $x_1 = m/p_1$. So

$$
x_1(\mathbf{p}, m) = \begin{cases} 1/p_1 & \text{if } m > 1,\\ m/p_1 & \text{if } m \le 1, \end{cases}
\qquad
x_2(\mathbf{p}, m) = \max\set{m-1,\, 0}.
$$

For $m > 1$ the demand for good 1 is independent of income: the income effect is zero, which is the defining convenience of quasi-linearity. Notice the threshold $m = 1$ equals $p_1 \cdot (1/p_1)$ and does not depend on $p_1$ — a quirk of $v(x_1) = \ln x_1$, whose $x_1 = 1/p_1$ always costs exactly 1.
:::
:::

## Properties of Marshallian demand

Whatever $u$ generated them, interior Marshallian demands share three identities that do not need a functional form.

::: theorem Properties of Marshallian demand {#thm-marshall-props}
Let $x(\mathbf{p}, m)$ be the unique interior demand from a locally non-satiated preference relation. Then:

1. **Homogeneity of degree zero.** $x(\lambda\mathbf{p}, \lambda m) = x(\mathbf{p}, m)$ for all $\lambda > 0$. Only relative prices and real income matter.
2. **Walras's law.** $\mathbf{p}\cdot x(\mathbf{p}, m) = m$. The consumer spends all of $m$.
3. **Engel aggregation.** $\sum_i p_i \partial x_i/\partial m = 1$. The marginal propensities to consume, weighted by prices, sum to one.

If in addition $x$ is differentiable, the Cournot aggregation $\sum_i p_i \partial x_i/\partial p_j + x_j = 0$ holds for each $j$.
:::

::: proof
(1) $B(\lambda\mathbf{p}, \lambda m) = B(\mathbf{p}, m)$, so the feasible set is unchanged and so is the maximiser. (2) Local non-satiation: a slack budget would admit a better nearby bundle. (3) Differentiate Walras's law with respect to $m$: $\mathbf{p}\cdot \partial x/\partial m = 1$. Cournot: differentiate Walras's law with respect to $p_j$, remembering that $p_j$ appears both as a coefficient and inside $x$: $x_j + \mathbf{p}\cdot \partial x/\partial p_j = 0$.
:::

Homogeneity is why we can always set one price to 1 (choose a **numeraire**) without changing the problem. Walras's law is why, in an $n$-good demand system, it is enough to report $n-1$ demands. Engel aggregation is a check on computed derivatives: if you have differentiated $n$ demands with respect to $m$, the weighted sum must be 1. None of these is an empirical finding; they are accounting identities implied by the UMP. Adding-up tests in demand estimation are tests of whether the data look like some UMP, not tests of a particular $u$.

Own-price effects are not signed by [[#thm-marshall-props]]. The law of demand — $\partial x_i/\partial p_i \le 0$ — can fail for a **Giffen good**, which requires a strong negative income effect. The Slutsky equation of the next chapter is what isolates that possibility. For Cobb–Douglas and for any homothetic or quasi-linear interior demand, own-price effects are negative.

::: quiz
A consumer with locally non-satiated preferences faces $(p_1, p_2, m) = (2, 1, 12)$ and chooses $(3, 6)$. Which statement must be true?
- [ ] Her preferences are Cobb–Douglas
- [x] She would also choose $(3, 6)$ at prices $(4, 2)$ and income $24$
- [ ] Good 1 is normal
- [ ] Her MRS at $(3, 6)$ equals $1$
::: solution
Homogeneity of degree zero: scaling all prices and income by 2 leaves the budget set, hence the choice, unchanged. Cobb–Douglas is sufficient but not necessary for this choice (any preferences whose tangency at $(3,6)$ has slope $-2$ would do). Normality is not implied by a single observation. The MRS at an *interior* optimum equals the price ratio $2$, not $1$; and if $(3,6)$ were a corner the MRS need not equal the price ratio at all.
:::
:::

## Indirect utility and Roy's identity

::: definition Indirect utility function {#def-indirect}
The **indirect utility function** is the value of the UMP,

$$
v(\mathbf{p}, m) = u\bigl(x(\mathbf{p}, m)\bigr) = \max\set{u(\mathbf{x}) : \mathbf{p}\cdot\mathbf{x} \le m}.
$$ {#eq-indirect}

It is the highest utility the consumer can reach at prices $\mathbf{p}$ with income $m$.
:::

Properties of $v$ are the dual of properties of $u$ and of the budget.

::: proposition Properties of indirect utility {#prop-v}
Assume $u$ is continuous and locally non-satiated. Then $v(\mathbf{p}, m)$ is:

1. homogeneous of degree zero in $(\mathbf{p}, m)$;
2. strictly increasing in $m$ and non-increasing in each $p_i$;
3. quasiconvex in $(\mathbf{p}, m)$;
4. continuous in $(\mathbf{p}, m)$ on $\mathbf{p} \gg \mathbf{0}$, $m > 0$.

If $u$ is strictly quasiconcave then $v$ is differentiable wherever $x(\mathbf{p}, m)$ is, and $\partial v/\partial m = \lambda(\mathbf{p}, m) > 0$, the marginal utility of income.
:::

::: proof
(1) follows from homogeneity of $x$. (2) A larger $m$ enlarges the budget set, so the maximum cannot fall; local non-satiation makes the rise strict. A larger $p_i$ shrinks the budget set, so $v$ cannot rise. (3) If $v(\mathbf{p}, m) \le \bar u$ and $v(\mathbf{p}', m') \le \bar u$, then both budget sets lie in the lower contour set of $u$ at $\bar u$; any convex combination of the prices-and-income pairs has a budget set contained in the convex combination of the two budget sets, hence still in that lower contour set, so $v$ at the combination is $\le \bar u$. (4) is Berge's maximum theorem. The envelope claim is [[#prop-foc]].
:::

Quasiconvexity of $v$ is easy to forget: $v$ is *not* quasiconcave in prices. The set of price-income pairs that achieve at most $\bar u$ is convex, which is the shape one wants for expenditure minimisation in the next chapter.

The payoff of introducing $v$ is that demand can be read off it without re-solving the UMP.

::: theorem Roy's identity {#thm-roy}
If $v$ is differentiable at $(\mathbf{p}, m)$ and $\partial v/\partial m \neq 0$, Marshallian demand is

$$
x_i(\mathbf{p}, m) = -\frac{\partial v/\partial p_i}{\partial v/\partial m},\qquad i = 1, \dots, n.
$$ {#eq-roy}
:::

::: proof
Write $v(\mathbf{p}, m) = u\bigl(x(\mathbf{p}, m)\bigr)$. Differentiating with respect to $p_i$ and using the chain rule,

$$
\frac{\partial v}{\partial p_i} = \sum_j u_j \frac{\partial x_j}{\partial p_i}.
$$

At the optimum $u_j = \lambda p_j$ by [[#eq-foc]], so the right-hand side is $\lambda \sum_j p_j \partial x_j/\partial p_i$. Cournot aggregation ([[#thm-marshall-props]]) says that sum equals $-x_i$. Hence $\partial v/\partial p_i = -\lambda x_i$. The envelope theorem also gives $\partial v/\partial m = \lambda$. Dividing, $x_i = -(\partial v/\partial p_i)/(\partial v/\partial m)$.

A shorter envelope proof: the Lagrangian $\mathcal{L} = u(\mathbf{x}) + \lambda(m - \mathbf{p}\cdot\mathbf{x})$ has $\partial\mathcal{L}/\partial p_i = -\lambda x_i$ when $\mathbf{x}$ and $\lambda$ are held at their optimal values, and $\partial\mathcal{L}/\partial m = \lambda$. But $v$ equals the maximised $\mathcal{L}$, so the same ratio is [[#eq-roy]].
:::

Roy's identity is the consumer's version of Hotelling's lemma (which we will meet for profit functions in [[microeconomics/competitive-markets]]). It is why applied work sometimes specifies $v$ directly — an **indirect utility specification** — and differentiates, rather than specifying $u$ and solving a Lagrangian every time.

::: example Roy for Cobb–Douglas {#ex-roy-cd}
For $u = x_1^a x_2^{1-a}$ the indirect utility function is

$$
v(\mathbf{p}, m) = \Bigl(\frac{a}{p_1}\Bigr)^a \Bigl(\frac{1-a}{p_2}\Bigr)^{1-a} m.
$$ {#eq-cd-v}

Take $a = 1/2$, so $v = m/(2\sqrt{p_1 p_2})$. Recover $x_1$ by Roy's identity and match [[#eq-cd-demand]].
::: solution
Write $v = \tfrac12 m\, p_1^{-1/2} p_2^{-1/2}$. Then

$$
\frac{\partial v}{\partial p_1} = \frac12 m \Bigl(-\frac12\Bigr) p_1^{-3/2} p_2^{-1/2} = -\frac{m}{4}\, p_1^{-3/2} p_2^{-1/2},
$$

and $\partial v/\partial m = (1/2) p_1^{-1/2} p_2^{-1/2}$. Then

$$
x_1 = -\frac{\partial v/\partial p_1}{\partial v/\partial m} = \frac{m/4 \cdot p_1^{-3/2} p_2^{-1/2}}{(1/2)\, p_1^{-1/2} p_2^{-1/2}} = \frac{m}{2 p_1}.
$$

That is [[#eq-cd-demand]] with $a = 1/2$. For a numerical check: $p_1 = 2$, $p_2 = 1$, $m = 12$ give $x_1 = 3$, $v = 12/(2\sqrt{2}) = 3\sqrt{2} \approx 4.243$, and $u(\sqrt{3\cdot 6}) = \sqrt{18} = 3\sqrt{2}$, matching.
:::
:::

::: warning Indirect utility is not unique in the same way $u$ is not
If $u$ is replaced by $f(u)$ with $f' > 0$, then $v$ is replaced by $f(v)$. Roy's identity still holds, because the $f'$ factors in the numerator and denominator cancel. What must not be done is to treat $v(\mathbf{p}, m) = 10$ versus $v(\mathbf{p}', m) = 5$ as "twice as well off". The *sign* of $v(\mathbf{p}, m) - v(\mathbf{p}', m')$ is meaningful (an ordinal comparison of two budgets); the numerical gap is not, until we pass to the money-metric measures of [[microeconomics/slutsky-and-welfare]].
:::

::: widget plot
f: a*m/x
x: 0.5, 12
y: 0, 16
sliders: a=0.5:0.2:0.8:0.05; m=12:6:20:0.5
labels: p_1 = a m / x_1
caption: Inverse Marshallian demand for good 1 from Cobb–Douglas, $p_1 = a m / x_1$, with $p_2$ in the background (it does not appear: cross-price elasticity is zero). Raise $m$ or $a$ and the rectangular hyperbola shifts out: more income, or a stronger preference weight, and the consumer buys more at each price. This is a *slice* of $x_1(p_1, p_2, m)$ at fixed $m$; it is not a compensated (Hicksian) demand curve.
:::

## CES demand, briefly

For $u = (x_1^{\rho} + x_2^{\rho})^{1/\rho}$ with $\rho < 1$, $\rho \neq 0$, the elasticity of substitution is $\sigma = 1/(1-\rho)$ and Marshallian demands are

$$
x_i(\mathbf{p}, m) = \frac{m\, p_i^{-\sigma}}{p_1^{1-\sigma} + p_2^{1-\sigma}}.
$$ {#eq-ces-demand}

The derivation is the same Lagrangian: $\mathrm{MRS}_{12} = (x_1/x_2)^{\rho-1} = p_1/p_2$, which rearranges to $x_1/x_2 = (p_1/p_2)^{-\sigma}$, and then the budget pins down the scale. Cobb–Douglas is the limit $\rho \to 0$, $\sigma \to 1$, and [[#eq-ces-demand]] collapses to equal shares when $\sigma = 1$. Perfect substitutes are $\sigma \to \infty$; Leontief is $\sigma \to 0$.

::: example A CES calculation {#ex-ces}
Let $\sigma = 2$ (so $\rho = 1/2$), $p_1 = 4$, $p_2 = 1$, $m = 10$. Compute $(x_1, x_2)$ and the expenditure share of good 1. Compare with Cobb–Douglas ($\sigma = 1$) at the same prices.
::: solution
[[#eq-ces-demand]]: $p_1^{1-\sigma} + p_2^{1-\sigma} = 4^{-1} + 1^{-1} = 1/4 + 1 = 5/4$. Then $x_1 = 10 \cdot 4^{-2} / (5/4) = 10 \cdot (1/16) \cdot 4/5 = 40/80 = 1/2$, and $x_2 = 10 \cdot 1 / (5/4) = 8$. Expenditure on good 1 is $4 \cdot 1/2 = 2$, a share of $1/5$. Cobb–Douglas would spend half of income on each good regardless of the fourfold price gap, giving $x_1 = 5/4 = 1.25$ and $x_2 = 5$. CES with $\sigma = 2$ substitutes more aggressively towards the cheaper good.
:::
:::

## Evidence

Marshallian demands are estimated, not just solved. Two classical findings, and one identification warning, will be enough here.

**Engel curves are not rays.** As already noted, the food share falls with income (Engel's law). Working (1943) and Leser (1963) proposed $\text{share}_i = \alpha_i + \beta_i \ln m$, the Working–Leser form that became the Engel curve of the Almost Ideal Demand System (Deaton and Muellbauer 1980). A $\beta_i < 0$ for food is the standard estimate. Homothetic preferences, including Cobb–Douglas and CES, force $\beta_i = 0$ and cannot fit this. Stone–Geary utility $u = \prod (x_i - \gamma_i)^{a_i}$, with subsistence $\gamma_i$, produces linear Engel curves with a positive intercept and is the functional form behind the Linear Expenditure System that Stone estimated for the United Kingdom in 1954.

**Own-price elasticities cluster near $-1$ for broad aggregates, and much larger for varieties.** Deaton's studies of household surveys (for example Deaton 1997, *The Analysis of Household Surveys*) typically find food-price elasticities between $-0.3$ and $-0.8$ in low-income settings; Broda and Weinstein (2006) find elasticities of substitution across barcode varieties of 4 to 12. The CES parameter $\sigma$ is not a universal constant; it depends on the level of aggregation.

**The identification problem.** A regression of quantity on price does not recover $x_i(\mathbf{p}, m)$ unless income and the other prices are controlled and the remaining price variation is due to supply, not demand. That is the simultaneous-equations problem of [[principles/supply-and-demand]], and it is why modern demand papers use cost shifters, tax changes or scanner-data instruments. Nothing in Roy's identity removes the need for a research design.

::: history
**1871, William Stanley Jevons and Carl Menger.** The marginal-utility revolution posed the consumer's problem as equalising weighted marginal utilities, $u_i/p_i$, which is [[#eq-foc]] before Lagrangians.

**1874, Léon Walras.** *Éléments* wrote demand as a function of the whole price vector and imposed $\mathbf{p}\cdot x = m$, Walras's law, as an identity.

**1947, Paul Samuelson.** *Foundations of Economic Analysis* derived the properties of $x(\mathbf{p}, m)$ from the UMP by the envelope theorem and introduced revealed preference as a way to skip $u$ altogether.

**1947, René Roy.** *La distribution du revenu entre les divers biens* gave [[#eq-roy]], reading Marshallian demand off the indirect utility function. The identity is now a standard application of the envelope theorem in [[mathematical-economics/comparative-statics]].
:::

## Where this leads

Marshallian demand $x(\mathbf{p}, m)$ is the observable object: what a household buys at the prices and income it faces. It is not the right curve for welfare or for decomposing a price change, because as $p_i$ moves the consumer's utility moves with it. The next chapter constructs the **Hicksian** (compensated) demand $h(\mathbf{p}, u)$ that holds utility constant, proves the Slutsky equation linking $\partial x/\partial p$ to $\partial h/\partial p$, and measures the welfare effect of a price change by compensating and equivalent variation — money-metric integrals of Hicksian demand ([[microeconomics/slutsky-and-welfare]]). The same UMP, with a different budget, is labour supply and saving ([[microeconomics/labour-and-intertemporal-choice]]). Firms will maximise profit rather than utility, but the envelope pattern — Hotelling, Shephard — is the same ([[microeconomics/production-and-cost]], [[microeconomics/competitive-markets]]).

::: summary
- The UMP is $\max u(\mathbf{x})$ subject to $\mathbf{p}\cdot\mathbf{x} \le m$. Interior solutions equate $\mathrm{MRS}_{ij}$ to $p_i/p_j$, or $u_i/p_i$ across goods; the common value is the marginal utility of income $\lambda$.
- Cobb–Douglas demand spends a constant share of $m$ on each good, [[#eq-cd-demand]]. Perfect complements buy on the corner ray; perfect substitutes buy a corner (or any mix, if the price ratio equals the MRS). Quasi-linear demand for the non-linear good is independent of $m$ in the interior.
- Marshallian demand is homogeneous of degree zero and satisfies Walras's law. These are identities, not empirical claims.
- Indirect utility $v(\mathbf{p}, m)$ is the value of the UMP. Roy's identity recovers $x_i = -(\partial v/\partial p_i)/(\partial v/\partial m)$.
- CES demand [[#eq-ces-demand]] has a free elasticity of substitution $\sigma$; Cobb–Douglas is $\sigma = 1$.
:::

## Exercises

::: exercise A Cobb–Douglas interior {level=1 check="6"}
Let $u = x_1^{1/2} x_2^{1/2}$, $p_1 = 2$, $p_2 = 2$, $m = 24$. Find $x_1(\mathbf{p}, m)$. (Enter the quantity of good 1.)
::: solution
Equal exponents, equal prices: equal quantities, and $2x_1 + 2x_2 = 24$ with $x_1 = x_2$ gives $x_1 = 6$. From [[#eq-cd-demand]], $x_1 = (1/2)\cdot 24/2 = 6$.
:::
:::

::: exercise The multiplier {level=1}
In [[#ex-cd-ump]], $u = x_1^{1/3} x_2^{2/3}$, $(p_1, p_2, m) = (2, 1, 12)$ and $\mathbf{x}^* = (2, 8)$. Compute $u_2(\mathbf{x}^*)$ and confirm it equals $\lambda^* p_2$.
::: solution
$u_2 = (2/3) x_1^{1/3} x_2^{-1/3} = (2/3)\, 2^{1/3}\, 8^{-1/3} = (2/3)\, 2^{1/3}/2 = (1/3)\, 2^{1/3} \approx 0.420$. And $p_2 = 1$, so $\lambda^* = u_2/p_2 \approx 0.420$, matching the value computed from $u_1 = \lambda p_1$ in the example.
:::
:::

::: exercise Homogeneity check {level=1 check="3"}
A Cobb–Douglas consumer with $a = 1/2$ has $x_1(2, 1, 12) = 3$. What is $x_1(4, 2, 24)$? (Enter the quantity.)
::: solution
Homogeneity of degree zero, or direct computation $x_1 = (1/2)\cdot 24/4 = 3$. Same bundle.
:::
:::

::: exercise Perfect substitutes, two prices {level=2}
Let $u = 3x_1 + x_2$, $m = 30$. Find Marshallian demand when $(p_1, p_2) = (2, 1)$ and when $(p_1, p_2) = (4, 1)$.
::: solution
$\mathrm{MRS}_{12} = 3$. If $p_1/p_2 = 2 < 3$, buy only good 1: $x_1 = 30/2 = 15$, $x_2 = 0$. If $p_1/p_2 = 4 > 3$, buy only good 2: $x_1 = 0$, $x_2 = 30$.
:::
:::

::: exercise Quasi-linear with a corner {level=2 check="5"}
Take $u = \ln x_1 + x_2$, $p_1 = 1$, $p_2 = 1$. What is $x_1$ when $m = 5$? When $m = 0.4$? For the $m = 5$ case, enter $x_1$.
::: solution
From [[#ex-ql]], the interior is $x_1 = 1/p_1 = 1$, $x_2 = m-1$, valid for $m > 1$. At $m = 5$, $x_1 = 1$, $x_2 = 4$. At $m = 0.4 < 1$, the corner $x_2 = 0$, $x_1 = 0.4$.
:::
:::

::: exercise Roy's identity by hand {level=2}
A consumer has $v(p_1, p_2, m) = m / p_1 + \ln(p_1/p_2)$. (This $v$ is homogeneous of degree zero, as required.) Compute $x_1$ and $x_2$ by Roy's identity, and verify Walras's law.
::: hint
$\partial v/\partial p_1 = -m/p_1^2 + 1/p_1$, $\partial v/\partial m = 1/p_1$.
:::
::: solution
$x_1 = -(\partial v/\partial p_1)/(\partial v/\partial m) = \bigl(m/p_1^2 - 1/p_1\bigr) / (1/p_1) = m/p_1 - 1$. And $\partial v/\partial p_2 = -1/p_2$, so $x_2 = (1/p_2)/(1/p_1) = p_1/p_2$. Then $\mathbf{p}\cdot x = p_1(m/p_1 - 1) + p_2(p_1/p_2) = m - p_1 + p_1 = m$. Walras's law holds. (This $v$ is not generated by a globally monotone $u$ for all prices — $x_1$ is negative if $m < p_1$ — so the formula applies on the region $m > p_1$.)
:::
:::

::: exercise CES substitution {level=2}
Using [[#eq-ces-demand]] with $\sigma = 2$, $p_2 = 1$, $m = 10$, compute $x_1$ at $p_1 = 1$ and at $p_1 = 4$. What is the percentage change in $x_1$, and how does it compare with Cobb–Douglas at the same two prices?
::: solution
At $p_1 = 1$: denominator $1^{1-2} + 1 = 2$, $x_1 = 10 \cdot 1 / 2 = 5$. At $p_1 = 4$: $x_1 = 1/2$ as in [[#ex-ces]]. Quantity of good 1 falls from 5 to 0.5, a 90 per cent drop. Cobb–Douglas: $x_1 = 5/p_1$, so from 5 to $1.25$, a 75 per cent drop. The higher $\sigma$ produces a larger quantity response, which is the meaning of "easier substitution".
:::
:::

::: exercise Deriving Cobb–Douglas from the Lagrangian {level=3}
Let $u = x_1^a x_2^{1-a}$. Write the Lagrangian, obtain the first-order conditions, and derive [[#eq-cd-demand]] without quoting [[#prop-cd-demand]]. Then compute $v(\mathbf{p}, m)$ and apply Roy's identity to recover $x_1$.
::: hint
Take logs of $u$ first if you wish: $\max a\ln x_1 + (1-a)\ln x_2$ has the same solutions.
:::
::: solution
$\mathcal{L} = a\ln x_1 + (1-a)\ln x_2 + \lambda(m - p_1 x_1 - p_2 x_2)$. FOCs: $a/x_1 = \lambda p_1$, $(1-a)/x_2 = \lambda p_2$, and the budget. Then $p_1 x_1 = a/\lambda$ and $p_2 x_2 = (1-a)/\lambda$, so $m = 1/\lambda$ and $\lambda = 1/m$. Hence $x_1 = a m/p_1$, $x_2 = (1-a)m/p_2$.

Indirect utility: $v = (a m/p_1)^a ((1-a)m/p_2)^{1-a} = (a/p_1)^a ((1-a)/p_2)^{1-a} m$. Then $\partial v/\partial p_1 = -a v/p_1$, $\partial v/\partial m = v/m$, so $-\,(\partial v/\partial p_1)/(\partial v/\partial m) = (a v/p_1)\cdot(m/v) = a m/p_1$, recovering $x_1$.
:::
:::

::: exercise Kuhn–Tucker at a corner {level=3}
A consumer has $u = 2x_1 + \ln(1+x_2)$, prices $(1, 1)$ and income $m = 2$. Show that no interior point satisfies the first-order condition, and find the demand using the Kuhn–Tucker conditions.
::: hint
Compute $\mathrm{MRS}_{12} = u_1/u_2$ and compare with $p_1/p_2$. Then check the two axes.
:::
::: solution
$u_1 = 2$, $u_2 = 1/(1+x_2)$, so $\mathrm{MRS}_{12} = 2(1+x_2) \ge 2 > 1 = p_1/p_2$ at every bundle. The interior condition $\mathrm{MRS}_{12} = p_1/p_2$ is impossible.

Kuhn–Tucker: $u_i - \lambda p_i \le 0$, $x_i \ge 0$, complementary slackness, and $x_1 + x_2 = 2$. Suppose $x_2 > 0$ and $x_1 = 0$. Then $u_2 = \lambda p_2$ gives $\lambda = 1/(1+x_2) \le 1$, while $u_1 \le \lambda p_1$ gives $2 \le \lambda$, which cannot hold. Suppose both are positive: then $u_1 = \lambda p_1$ and $u_2 = \lambda p_2$ recover the impossible interior FOC. The remaining case is $x_2 = 0$, $x_1 = 2$. Then $u_1 = \lambda p_1$ gives $\lambda = 2$, and the inequality for good 2 is $u_2 = 1 \le \lambda p_2 = 2$, which holds. Demand is $(2, 0)$. Direct comparison: any $x_2 > 0$ with $x_1 = 2-x_2$ has $u = 2(2-x_2) + \ln(1+x_2) = 4 - 2x_2 + \ln(1+x_2) < 4$, because $\ln(1+x_2) < 2x_2$ for $x_2 > 0$.
:::
:::
