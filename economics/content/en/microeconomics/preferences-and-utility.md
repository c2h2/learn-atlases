A shopper stands in front of two shelves: rice at 2 units a kilo and beans at 1 unit a kilo, with 12 units to spend. Which baskets can she afford? Among those she can afford, which will she pick? The first question is an accounting identity — a **budget set**. The second is a statement about **preferences**. Intermediate microeconomics begins by separating the two, writing each down so that it can be drawn, differentiated and later estimated, and only then putting them back together as a choice problem.

This chapter builds the consumer's primitives: the budget set determined by prices and income; a preference relation on bundles; indifference curves and the **marginal rate of substitution**; and a **utility function** that represents those preferences when they are well behaved. The actual maximisation — the Lagrangian, Marshallian demand, Roy's identity — is the next chapter ([[microeconomics/consumer-choice]]). The mathematics of level curves and partial derivatives is that of [[mathematical-economics/functions-of-several-variables]]; what is new is the economic meaning of the geometry.

Notation throughout the consumer chapters: a **bundle** is a vector $\mathbf{x} = (x_1, \dots, x_n)$ of quantities of $n$ goods, with $\mathbf{x} \ge \mathbf{0}$; **prices** are $\mathbf{p} = (p_1, \dots, p_n) \gg \mathbf{0}$; **income** (or, more accurately, expenditure) is the scalar $m > 0$. Two goods will do for pictures; the algebra is the same for $n$.

## The budget set

::: definition Budget set {#def-budget}
At prices $\mathbf{p} \gg \mathbf{0}$ and income $m > 0$, the **budget set** is

$$
B(\mathbf{p}, m) = \set{\mathbf{x} \ge \mathbf{0} : \mathbf{p}\cdot\mathbf{x} \le m}.
$$ {#eq-budget}

The **budget hyperplane** (budget line, when $n=2$) is the boundary $\mathbf{p}\cdot\mathbf{x} = m$. The **relative price** of good 1 in terms of good 2 is $p_1/p_2$.
:::

With two goods the inequality $p_1 x_1 + p_2 x_2 \le m$ describes a right triangle in the non-negative quadrant, with intercepts $m/p_1$ on the $x_1$-axis and $m/p_2$ on the $x_2$-axis and slope $-p_1/p_2$. Raising $m$ with prices fixed is a parallel outward shift. Raising $p_1$ with $m$ and $p_2$ fixed pivots the line inwards around the $x_2$-intercept. Both moves will matter for demand.

The budget set is the consumer's feasible set, not her choice. Nothing in [[#def-budget]] says which point she picks; that is the job of preferences. Two observations are already useful. First, only **relative** prices and **real** income $m$ enter: $B(\lambda\mathbf{p}, \lambda m) = B(\mathbf{p}, m)$ for every $\lambda > 0$, so a uniform inflation that scales prices and income together leaves the feasible set unchanged. Second, if goods are divisible the budget set is compact and convex, which is why a continuous preference relation on it will have a best point and why convex preferences will have a convex set of best points.

::: example A weekly grocery budget {#ex-budget}
Rice costs $p_1 = 2$, beans cost $p_2 = 1$, and the shopper has $m = 12$. (a) Sketch the budget set and find the intercepts and slope. (b) Which of the bundles $(4, 4)$, $(5, 3)$, $(6, 0)$ and $(3, 7)$ are affordable? (c) If the price of rice falls to $1$, what happens to the budget line?
::: solution
(a) The line is $2x_1 + x_2 = 12$, or $x_2 = 12 - 2x_1$. Intercepts: $x_1 = 6$ kilos of rice if she buys no beans, $x_2 = 12$ kilos of beans if she buys no rice. Slope $-p_1/p_2 = -2$: each extra kilo of rice costs 2 kilos of beans.

(b) Cost of $(4,4)$ is $8+4=12$, on the line. Cost of $(5,3)$ is $10+3=13 > 12$, unaffordable. Cost of $(6,0)$ is $12$, on the line (the rice intercept). Cost of $(3,7)$ is $6+7=13 > 12$, unaffordable.

(c) The new line is $x_1 + x_2 = 12$. The beans intercept is unchanged at $12$; the rice intercept doubles to $12$. The line pivots outwards around $(0, 12)$. Every previously affordable bundle remains affordable, and new bundles with more rice become feasible.
:::
:::

::: widget plot
f: m - p*x; 12 - 2*x
x: 0, 14
y: 0, 22
sliders: p=2:0.5:4:0.1; m=12:4:20:0.5
labels: p_1 x + x_2 = m; \text{original } 2x_1+x_2=12
caption: Quantity of rice $x_1$ on the horizontal axis, beans $x_2$ on the vertical. The dashed line is the original budget $2x_1+x_2=12$. Move $p$ (the price of rice) to pivot the solid line around the beans intercept; move $m$ to shift it in parallel. Notice that doubling both $p$ and $m$ returns you to a line with the same intercepts as a different pair $(p, m)$ — only relative prices and real income matter.
:::

::: warning Affordable is not preferred
A common slip is to read a budget line as a description of what the consumer *likes*. The line is a constraint. The shopper in [[#ex-budget]] can afford $(6,0)$ and $(0,12)$ and everything in between; which of those she would actually buy is a statement about preferences, and those preferences are the next object. Confusing the two is the same error as reading a production-possibility frontier as a statement about tastes ([[principles/gains-from-trade]]).
:::

When some income is committed (rent, a licence fee) the budget set is $B(\mathbf{p}, m-F)$ for $m > F$ and empty otherwise. When a good can be bought only in integer units the set is a lattice of points under the line, and convexity arguments need more care. This course treats goods as divisible unless a corner or an integer constraint is the point of the example.

## Preference relations

The consumer ranks bundles. We write $\mathbf{x} \succsim \mathbf{y}$ for "$\mathbf{x}$ is at least as good as $\mathbf{y}$", $\mathbf{x} \succ \mathbf{y}$ for strict preference, and $\mathbf{x} \sim \mathbf{y}$ for indifference. These are not independent: $\mathbf{x} \succ \mathbf{y}$ means $\mathbf{x} \succsim \mathbf{y}$ and not $\mathbf{y} \succsim \mathbf{x}$, and $\mathbf{x} \sim \mathbf{y}$ means both $\mathbf{x} \succsim \mathbf{y}$ and $\mathbf{y} \succsim \mathbf{x}$.

::: definition Preference relation {#def-prefs}
A binary relation $\succsim$ on the consumption set $X = \R_+^n$ is a **preference relation** if it is

1. **complete**: for all $\mathbf{x}, \mathbf{y} \in X$, at least one of $\mathbf{x} \succsim \mathbf{y}$ and $\mathbf{y} \succsim \mathbf{x}$ holds;
2. **transitive**: $\mathbf{x} \succsim \mathbf{y}$ and $\mathbf{y} \succsim \mathbf{z}$ imply $\mathbf{x} \succsim \mathbf{z}$.

It is **monotone** (strictly) if $\mathbf{x} \ge \mathbf{y}$ and $\mathbf{x} \neq \mathbf{y}$ imply $\mathbf{x} \succ \mathbf{y}$, and **locally non-satiated** if for every $\mathbf{x}$ and every neighbourhood of $\mathbf{x}$ there is a $\mathbf{y}$ in the neighbourhood with $\mathbf{y} \succ \mathbf{x}$. It is **convex** if $\mathbf{x} \succsim \mathbf{y}$ implies $\lambda\mathbf{x} + (1-\lambda)\mathbf{y} \succsim \mathbf{y}$ for all $\lambda \in [0,1]$, and **strictly convex** if the combination is strictly preferred whenever $0 < \lambda < 1$ and $\mathbf{x} \neq \mathbf{y}$. It is **continuous** if the upper and lower contour sets $\set{\mathbf{x} : \mathbf{x} \succsim \mathbf{y}}$ and $\set{\mathbf{x} : \mathbf{y} \succsim \mathbf{x}}$ are closed for every $\mathbf{y}$.
:::

Completeness says the consumer can compare any two bundles; transitivity says her ranking does not cycle. Together they make $\succsim$ a complete preorder. Neither is a fact about people — laboratory experiments since the 1950s have produced intransitivities — but they are the maintained hypotheses of the standard theory, and they are what a utility function will encode.

Monotonicity is "more is better": all goods are goods, not bads. Local non-satiation is weaker and is what we actually use for Walras's law: even if some good is neutral, there is always a nearby bundle that is strictly better, so the consumer will spend all of $m$. Convexity is a taste for mixtures, or diminishing willingness to substitute. Continuity rules out jumps: if $\mathbf{x}^k \to \mathbf{x}$ and each $\mathbf{x}^k \succsim \mathbf{y}$, then $\mathbf{x} \succsim \mathbf{y}$. Lexicographic preferences, below, are complete, transitive and monotone but not continuous, and they cannot be represented by a continuous utility function.

::: intuition Why convexity
Convexity does not say the consumer likes average bundles more than extremes in some cardinal sense. It says that if she is happy with either $\mathbf{x}$ or $\mathbf{y}$, she is happy with a mix. For two goods that is the familiar bowed-in indifference curve: as you move down the curve you give up more and more of $x_2$ for each extra unit of $x_1$. Strict convexity will give a unique tangency with the budget line. Perfect substitutes are convex but not strictly convex; they produce a whole segment of best points when relative prices equal the rate of substitution, and a corner otherwise.
:::

::: quiz
Which property of $\succsim$ is used to conclude that a utility-maximising consumer spends all of her income?
- [ ] Completeness
- [ ] Transitivity
- [x] Local non-satiation
- [ ] Convexity
::: solution
Local non-satiation: if a bundle in the interior of $B(\mathbf{p}, m)$ were optimal, a nearby better bundle would also be affordable, a contradiction. Completeness and transitivity organise the ranking; convexity shapes indifference curves. Without local non-satiation the consumer might leave money unspent, and Walras's law would fail.
:::
:::

### Indifference curves

Fix a bundle $\mathbf{x}^0$. The **indifference set** (indifference curve, when $n=2$) through $\mathbf{x}^0$ is $\set{\mathbf{x} : \mathbf{x} \sim \mathbf{x}^0}$. With continuous strictly monotone preferences these are curves that slope down, do not cross, and are ranked by the "higher is better" order in the direction of more of both goods. Convex preferences give convex-to-the-origin curves (the upper contour set is convex).

Two curves cannot cross. If they did, transitivity plus the definition of indifference would put every point on either curve in the same indifference class, contradicting monotonicity as soon as one curve lies partly above the other. That is a theorem about the relation $\succsim$, not a separate axiom.

## The marginal rate of substitution

Along an indifference curve $u(x_1, x_2) = \bar u$, implicit differentiation gives

$$
\frac{\partial u}{\partial x_1}\,\dd x_1 + \frac{\partial u}{\partial x_2}\,\dd x_2 = 0,
$$

so the slope is $\dd x_2/\dd x_1 = -(\partial u/\partial x_1)/(\partial u/\partial x_2)$. The absolute value of that slope is the rate at which the consumer is willing to trade good 2 for good 1.

::: definition Marginal rate of substitution {#def-mrs}
If $u$ is differentiable and $u_2 \neq 0$, the **marginal rate of substitution** of good 1 for good 2 at $\mathbf{x}$ is

$$
\mathrm{MRS}_{12}(\mathbf{x}) = \frac{u_1(\mathbf{x})}{u_2(\mathbf{x})} = \frac{\partial u/\partial x_1}{\partial u/\partial x_2}.
$$ {#eq-mrs}

It is the amount of good 2 the consumer would give up for one more unit of good 1, staying on the same indifference curve. Equivalently, $-\mathrm{d}x_2/\mathrm{d}x_1$ along the curve.
:::

The MRS is a property of preferences, not of the budget. At a tangency the MRS will equal the price ratio $p_1/p_2$; that is a first-order condition, derived in [[microeconomics/consumer-choice]], not a definition. For now the MRS is just the slope of an indifference curve.

Because any strictly increasing transformation of $u$ represents the same preferences (next section), the *level* of $u_1$ and $u_2$ is meaningless. Their *ratio* is invariant: if $v = f(u)$ with $f' > 0$, then $v_1/v_2 = f'(u)\,u_1 / f'(u)\,u_2 = u_1/u_2$. The MRS is an ordinal object.

::: proposition Diminishing MRS and convexity {#prop-diminishing-mrs}
If $u$ is strictly quasiconcave and twice differentiable, with $u_i > 0$, then along an indifference curve $\mathrm{MRS}_{12}$ is diminishing in $x_1$: as $x_1$ rises and $x_2$ falls to hold $u$ constant, $\mathrm{MRS}_{12}$ falls. Conversely, a diminishing MRS is the differential version of strictly convex preferences in two goods.
:::

::: proof
Strict quasiconcavity means that the upper contour sets are strictly convex, so indifference curves are strictly bowed towards the origin. Parametrising a curve by $x_1$ and writing $x_2 = \xi(x_1)$, we have $\xi'(x_1) = -\mathrm{MRS}_{12}(x_1, \xi(x_1))$. Strict convexity of the upper set is equivalent to $\xi$ being strictly convex, so $\xi'' > 0$, hence $\mathrm{MRS}_{12}$ is strictly decreasing along the curve. The converse is the same argument read backwards, on a region where $u_i > 0$.
:::

::: example MRS for three standard preferences {#ex-mrs-three}
Compute $\mathrm{MRS}_{12}$ for (a) Cobb–Douglas $u = x_1^a x_2^{1-a}$ with $0 < a < 1$; (b) perfect substitutes $u = a x_1 + b x_2$ with $a, b > 0$; (c) quasi-linear $u = \ln x_1 + x_2$ ($x_1 > 0$).
::: solution
(a) $u_1 = a x_1^{a-1} x_2^{1-a}$, $u_2 = (1-a) x_1^a x_2^{-a}$, so

$$
\mathrm{MRS}_{12} = \frac{a}{1-a}\cdot\frac{x_2}{x_1}.
$$

At $(x_1, x_2) = (2, 8)$ with $a = 1/3$, $\mathrm{MRS}_{12} = (1/2)\cdot(8/2) = 2$. The MRS depends only on the *ratio* $x_2/x_1$: Cobb–Douglas preferences are homothetic.

(b) $u_1 = a$, $u_2 = b$, so $\mathrm{MRS}_{12} = a/b$, a constant. Indifference curves are straight lines with slope $-a/b$. There is no diminishing MRS; preferences are convex but not strictly convex.

(c) $u_1 = 1/x_1$, $u_2 = 1$, so $\mathrm{MRS}_{12} = 1/x_1$. The MRS depends only on $x_1$, not on $x_2$: an extra unit of the linear good does not change the willingness to pay for good 1. This is the geometric signature of quasi-linearity, and it is why income effects for good 1 will vanish in an interior solution.
:::
:::

::: widget contour
f: x^0.5 * y^0.5
x: 0.2, 12
y: 0.2, 16
levels: 12
gradient: true
constraint: 2*x + y - m
point: 3, 6
sliders: m=12:6:18:0.5
caption: Indifference curves of $u=\sqrt{x y}$ (Cobb–Douglas with equal exponents) and the budget line $2x+y=m$. Drag the point along a contour: the gradient is orthogonal to the curve, and $\mathrm{MRS}_{12}$ is the absolute slope. Raise $m$ and the constraint slides out; the tangency (where $\nabla u$ is parallel to $(2,1)$) moves along the ray $y=2x$, because these preferences are homothetic. At the original $m=12$ the tangency is $(3,6)$.
:::

## Utility representation

A function $u : X \to \R$ **represents** $\succsim$ if $\mathbf{x} \succsim \mathbf{y}$ if and only if $u(\mathbf{x}) \ge u(\mathbf{y})$. When a representation exists we can replace the relation with a numerical ranking and use calculus. Two facts govern what $u$ does and does not mean.

::: theorem Ordinal utility {#thm-ordinal}
If $u$ represents $\succsim$ and $f : \R \to \R$ is strictly increasing, then $v = f \circ u$ also represents $\succsim$. Conversely, if $u$ and $v$ both represent $\succsim$ and the range of $u$ is an interval, there is a strictly increasing $f$ with $v = f \circ u$ on that range.
:::

::: proof
If $u(\mathbf{x}) \ge u(\mathbf{y})$ then $f(u(\mathbf{x})) \ge f(u(\mathbf{y}))$ because $f$ is strictly increasing, and conversely, so $v$ represents the same ranking. For the converse, define $f$ on the range of $u$ by $f(t) = v(\mathbf{x})$ for any $\mathbf{x}$ with $u(\mathbf{x}) = t$; this is well-defined because $u(\mathbf{x}) = u(\mathbf{y})$ implies $\mathbf{x} \sim \mathbf{y}$ implies $v(\mathbf{x}) = v(\mathbf{y})$, and it is strictly increasing because $t > s$ means the corresponding bundles satisfy $\mathbf{x} \succ \mathbf{y}$, hence $v(\mathbf{x}) > v(\mathbf{y})$.
:::

Utility in this chapter is **ordinal**: only the ranking of bundles matters, not the numerical gaps between them. Saying $u(A) = 10$ and $u(B) = 5$ does not mean $A$ is "twice as good" as $B$; it means $A$ is preferred to $B$, and any increasing rewrite ($100$ and $25$, or $\ln 10$ and $\ln 5$) is just as good. Cardinal utility — unique up to affine transformations $au+b$ with $a > 0$ — appears only in [[microeconomics/uncertainty]], where the expected-utility theorem puts meaning on the curvature of $u$ over wealth. Mixing the two is a standing source of confusion.

::: warning Utility numbers are not utils
Exam scripts that add two people's utility numbers, or that interpret $u=10$ versus $u=5$ as "twice the welfare", are treating an ordinal representation as cardinal and interpersonal. Nothing in [[#thm-ordinal]] licenses either step. Social welfare functions that *do* add utilities are an extra, normative object, introduced in [[microeconomics/welfare-theorems]] and used in [[public-economics/role-of-government]]; they are not implied by individual preference representations.
:::

Existence of a continuous representation is not free.

::: theorem Debreu's representation theorem {#thm-debreu}
A preference relation on $X = \R_+^n$ that is complete, transitive and continuous can be represented by a continuous utility function $u : X \to \R$. If in addition preferences are monotone, $u$ can be taken to be increasing; if they are convex, $u$ can be taken to be quasiconcave.
:::

The proof (Gérard Debreu, *Theory of Value*, 1959, following his 1954 paper) constructs $u(\mathbf{x})$ from the intercept of the indifference set of $\mathbf{x}$ with the diagonal, using continuity to make the intercept well-defined and continuous. We will not reproduce it. The hypothesis that *is* used constantly is continuity: without it a representation may fail.

::: example Lexicographic preferences {#ex-lexicographic}
Define $\mathbf{x} \succsim \mathbf{y}$ on $\R_+^2$ by: $x_1 > y_1$, or $x_1 = y_1$ and $x_2 \ge y_2$. (Good 1 is the first criterion; good 2 breaks ties.) Show that $\succsim$ is complete, transitive and monotone, but not continuous, and that it admits no continuous utility representation.
::: solution
Any two bundles are comparable by looking first at coordinate 1 and then at coordinate 2, so completeness holds. Transitivity: if $\mathbf{x}$ beats $\mathbf{y}$ and $\mathbf{y}$ beats $\mathbf{z}$ on the first coordinate, $\mathbf{x}$ beats $\mathbf{z}$ on the first coordinate; the remaining cases (ties on the first coordinate) reduce to the ordinary order on the second. Monotonicity is immediate: more of either good, holding the other fixed, is better, and more of good 1 is better regardless of good 2.

Not continuous: take $\mathbf{y} = (1, 0)$ and the sequence $\mathbf{x}^k = (1-1/k, 100)$. Each $\mathbf{x}^k$ has a smaller first coordinate than $\mathbf{y}$, so $\mathbf{y} \succ \mathbf{x}^k$. But $\mathbf{x}^k \to (1, 100)$, and $(1, 100) \succ \mathbf{y}$. The upper contour set of $\mathbf{y}$ does not contain its limit point $(1,100)$, so it is not closed.

Suppose a continuous $u$ represented $\succsim$. Then for each $t \ge 0$ the slice $\set{x_2 : u(t, x_2)}$ would be an interval of values, and these intervals would be disjoint for different $t$ (because different first coordinates are never indifferent) and would lie in $\R$. That is an uncountable family of disjoint nonempty open intervals in $\R$, which cannot exist. Hence no continuous representation. (A discontinuous representation *does* exist, but it is of no use for calculus.)
:::
:::

Lexicographic preferences are a warning, not a working model. Every utility function in the rest of the course is continuous, and almost every one is strictly increasing and strictly quasiconcave.

## Standard families

Four families cover most of the examples, exercises and empirical specifications in intermediate microeconomics.

### Cobb–Douglas

$$
u(x_1, x_2) = x_1^a x_2^{b},\qquad a > 0,\; b > 0,
$$

or, taking logs (an increasing transformation), $a\ln x_1 + b\ln x_2$. Often we normalise $a+b=1$. Indifference curves are rectangular hyperbolas; $\mathrm{MRS}_{12} = (a/b)(x_2/x_1)$; preferences are strictly convex, strictly monotone on the positive orthant, and **homothetic** (indifference curves are radial blow-ups of each other). Cobb–Douglas will produce constant expenditure shares: the consumer spends the fraction $a/(a+b)$ of income on good 1, regardless of prices. That is why the family is the default in worked examples and a useful first specification in demand estimation.

### Perfect substitutes

$$
u(x_1, x_2) = a x_1 + b x_2,\qquad a, b > 0.
$$

Indifference curves are parallel straight lines with slope $-a/b$. The consumer cares only about a weighted sum. At a generic price ratio she buys only the cheaper good in utils-per-unit terms (a **corner solution**); if $p_1/p_2 = a/b$ she is willing to buy any mix. Red and blue pencils, or two brands of mineral water that the consumer treats as the same thing, are the usual story. Convexity holds; strict convexity does not.

### Perfect complements (Leontief)

$$
u(x_1, x_2) = \min\set{a x_1, b x_2},\qquad a, b > 0.
$$

Indifference curves are L-shaped, with corners along the ray $a x_1 = b x_2$. Left shoes and right shoes, or tea and a complementary biscuit in fixed proportions: extra units of one good with none of the other are worthless. The MRS is not defined at the corner (the kink) and is zero or infinite on the arms. The consumer always buys on the ray, in the ratio $x_1/x_2 = b/a$. Preferences are convex, monotone in the weak sense, and not differentiable at the kink; the Lagrangian of the next chapter has to be replaced by a direct argument.

### Quasi-linear

$$
u(x_1, x_2) = v(x_1) + x_2,\qquad v' > 0,\; v'' < 0.
$$

Good 2 is "the rest of expenditure", often treated as a numeraire with $p_2 = 1$. Indifference curves are vertical translates of each other. The MRS depends only on $x_1$, so the demand for good 1 is independent of income as long as the consumer is rich enough to want a positive amount of the numeraire. Quasi-linearity is the workhorse of applied welfare: consumer surplus, compensating variation and equivalent variation then coincide, which is why [[microeconomics/slutsky-and-welfare]] and [[principles/markets-and-welfare]] can shade a triangle and call it a welfare measure.

::: example Matching a story to a functional form {#ex-match-form}
For each story, name the family and write a utility function. (a) A commuter treats bus and tram as interchangeable, one-for-one. (b) A cook uses 200 g of pasta for every 100 g of sauce and throws away leftovers of either. (c) A reader spends a fixed share of her book budget on fiction and the rest on non-fiction, whatever the prices. (d) A collector's willingness to pay for one more print depends on how many she already has, but not on her holdings of a numeraire consumption good.
::: solution
(a) Perfect substitutes: $u(x_B, x_T) = x_B + x_T$. (b) Perfect complements: $u(x_P, x_S) = \min\set{x_P/2, x_S}$ if $x_P$ is grams of pasta and $x_S$ grams of sauce, so that the corner ray is $x_P = 2 x_S$. (c) Cobb–Douglas: $u = x_F^a x_N^{1-a}$ with $a$ equal to the fiction share. (d) Quasi-linear: $u = v(x_{\text{prints}}) + x_{\text{numeraire}}$ with $v$ concave.
:::
:::

A fifth family, **CES** (constant elasticity of substitution),

$$
u(x_1, x_2) = \bigl(a x_1^{\rho} + b x_2^{\rho}\bigr)^{1/\rho},\qquad \rho \le 1,\; \rho \neq 0,
$$

nests Cobb–Douglas ($\rho \to 0$), perfect substitutes ($\rho \to 1$) and Leontief ($\rho \to -\infty$). The elasticity of substitution $\sigma = 1/(1-\rho)$ is constant along indifference curves. CES is the standard specification when the question is how easily two goods stand in for each other; we will compute its demand in [[microeconomics/consumer-choice]].

## Homothetic and quasi-linear structure

Two further properties are used constantly as maintained assumptions, because they make demand and welfare tractable.

::: definition Homothetic preferences {#def-homothetic}
Preferences are **homothetic** if they are monotone and $\mathbf{x} \sim \mathbf{y}$ implies $\lambda\mathbf{x} \sim \lambda\mathbf{y}$ for all $\lambda > 0$. Equivalently, they admit a representation that is homogeneous of degree 1 (or of any positive degree: take an increasing transformation).
:::

Homothetic indifference curves look the same from the origin: the MRS depends only on the ratio $x_2/x_1$. Income–consumption curves (Engel curves in good space) are rays. Cobb–Douglas, perfect substitutes, perfect complements and CES are all homothetic; quasi-linear preferences are not, unless $v$ is linear. Homotheticity is what lets us draw a representative consumer and scale her up with aggregate income, and it is why a Cobb–Douglas example computed at one income is, up to scale, the example at every income.

Quasi-linearity, already defined, is the other tractability assumption: no income effects for the non-linear good, parallel indifference curves, a well-defined consumer surplus. It is a poor description of food or housing, for which Engel's law (the food share falls with income) has been documented since Ernst Engel's 1857 study of Belgian working-class budgets. It is a reasonable local description of a good that is a small share of expenditure, which is why applied papers on a particular market so often write $u = v(x) + y$.

::: quiz
Cobb–Douglas preferences $u = x_1^{1/3} x_2^{2/3}$ and the increasing rewrite $v = 3\ln u = \ln x_1 + 2\ln x_2$ are two representations of the same ranking. Which statement is correct?
- [ ] $v$ is a different preference relation because the numbers are different
- [x] $\mathrm{MRS}_{12}$ is $x_2/(2x_1)$ for both $u$ and $v$
- [ ] $u$ is cardinal because it is homogeneous
- [ ] Only $v$ can be used in a Lagrangian, because it is additive
::: solution
By [[#thm-ordinal]] they represent the same $\succsim$. Direct computation: $u_1/u_2 = (1/3)x_2 / ((2/3)x_1) = x_2/(2x_1)$, and $v_1/v_2 = (1/x_1)/(2/x_2) = x_2/(2x_1)$. Homogeneity of $u$ is a convenient cardinalisation, not a claim that $u$ is cardinal. Either representation can be dropped into a Lagrangian; the log form is often easier to differentiate.
:::
:::

## Evidence

The theory in this chapter is a language, not a claim that every household maximises a Cobb–Douglas function every Monday. Three kinds of evidence bear on it.

**Stated and revealed rankings.** Completeness and transitivity are tested in the laboratory by offering pairwise choices. Intransitivities appear, especially when bundles are complicated or when a decoy option is added (the attraction effect; Huber, Payne and Puto 1982). In market data, Samuelson's revealed-preference inequalities (1938) — if $\mathbf{x}(p, m)$ is chosen, then any affordable $\mathbf{y}$ is revealed worse — are a test of the existence of *some* preference relation that rationalises the choices. Varian (1982) and later Afriat-style tests find that household scanner data are often close to satisfying the inequalities, with violations that shrink when one allows a small optimisation error. The standard model is an approximation, better at the level of a budget share than at the level of a single pairwise click.

**Functional form.** Engel's law — the share of food in household expenditure falls as income rises — is one of the most replicated regularities in economics. It is already visible in Engel's 1857 Belgian tables and in the World Bank's International Comparison Program: in 2017 the food share was about 40–50 per cent in several low-income countries and about 7–15 per cent in high-income countries (World Bank ICP, 2017 comparison). Cobb–Douglas, with constant shares, cannot fit that pattern; Stone–Geary (Cobb–Douglas over quantities net of subsistence) and PIGLOG/AIDS demand systems were built to do so. Quasi-linearity cannot fit it either, for the same reason. Homotheticity is a local convenience, not a global description of food and housing.

**Substitution.** The curvature of indifference curves — how fast the MRS falls — is the elasticity of substitution, and it is identified from how budget shares respond to relative prices. Broda and Weinstein (2006), using barcode data for the United States, estimated elasticities of substitution across varieties of the same good typically between 4 and 12, far above the Cobb–Douglas value of 1, which is why variety gains from trade are large in that calibration. Between broad aggregates (food versus manufactures) estimated elasticities are much smaller, often below 1. The CES family exists so that this number can be a free parameter rather than an accident of functional form.

None of this evidence is a licence to skip the geometry. It is a reminder that when we pick $u = x_1^a x_2^{1-a}$ we are choosing a share and an elasticity, and that both are empirical objects.

::: history
**1881, Francis Ysidro Edgeworth.** *Mathematical Psychics* introduced indifference curves and the contract curve, drawn in what later became the Edgeworth box ([[microeconomics/general-equilibrium]]). Edgeworth still treated utility as cardinal.

**1906, Vilfredo Pareto.** The *Manuale di economia politica* (French edition 1909) argued that only ordinal rankings are needed for demand theory and defined the optimality criterion now called Pareto efficiency.

**1915, Eugen Slutsky.** *Sulla teoria del bilancio del consumatore* derived the decomposition of a price effect that the next two chapters will spend their time on; the paper was largely unnoticed in English until the 1930s.

**1934, John Hicks and R. G. D. Allen.** *A Reconsideration of the Theory of Value* made the MRS and the indifference map the standard undergraduate language, replacing cardinal diminishing marginal utility.

**1954–1959, Gérard Debreu.** The representation theorem and the full axiomatic treatment in *Theory of Value* (1959) are the modern justification for writing $u(\mathbf{x})$ and differentiating it.
:::

## Where this leads

The budget set and the indifference map are the two ingredients of the consumer's problem. [[microeconomics/consumer-choice]] puts them together: maximise $u(\mathbf{x})$ subject to $\mathbf{p}\cdot\mathbf{x} = m$, obtain Marshallian demand $x(\mathbf{p}, m)$ and indirect utility $v(\mathbf{p}, m)$, and recover demand from $v$ by Roy's identity. [[microeconomics/slutsky-and-welfare]] takes the dual problem — minimise expenditure subject to a utility target — and splits every price effect into substitution and income. The same geometry, with a different label on the axes, is labour–leisure choice and two-period saving ([[microeconomics/labour-and-intertemporal-choice]]), and with probabilities in place of goods it is expected utility ([[microeconomics/uncertainty]]). On the firm side, isoquants are indifference curves for output ([[microeconomics/production-and-cost]]); in general equilibrium the two consumers' maps are drawn in one Edgeworth box ([[microeconomics/general-equilibrium]]).

::: summary
- The budget set $B(\mathbf{p}, m) = \set{\mathbf{x} \ge \mathbf{0} : \mathbf{p}\cdot\mathbf{x} \le m}$ is the feasible set. Only relative prices and real income matter: $B(\lambda\mathbf{p}, \lambda m) = B(\mathbf{p}, m)$.
- A preference relation is a complete, transitive ranking of bundles. Monotonicity (or local non-satiation), convexity and continuity are extra structure used throughout the course.
- The MRS is the absolute slope of an indifference curve, $\mathrm{MRS}_{12} = u_1/u_2$. It is invariant to increasing transformations of $u$. A diminishing MRS is the two-good version of strictly convex preferences.
- Continuous complete transitive preferences admit a continuous utility representation ([[#thm-debreu]]). Utility is ordinal: only rankings, not numerical gaps, are meaningful ([[#thm-ordinal]]).
- Cobb–Douglas, perfect substitutes, perfect complements and quasi-linear preferences are the four working families; CES nests the first three. Homotheticity makes Engel curves rays; quasi-linearity kills income effects for the non-linear good.
- Lexicographic preferences show why continuity is assumed: without it there may be no continuous $u$ to differentiate.
:::

## Exercises

::: exercise Intercepts and slope {level=1}
Prices are $p_1 = 3$, $p_2 = 6$, income $m = 36$. Find the intercepts of the budget line, its slope, and the maximum amount of good 1 that can be bought. If both prices and income double, what happens to the budget set?
::: solution
Intercepts: $m/p_1 = 12$ on the $x_1$-axis, $m/p_2 = 6$ on the $x_2$-axis. Slope $-p_1/p_2 = -1/2$. Maximum $x_1$ is $12$. Doubling all prices and income leaves $B(\mathbf{p}, m)$ unchanged, by homogeneity of degree zero of the budget set.
:::
:::

::: exercise Cost of a bundle {level=1 check="14"}
With $p_1 = 2$, $p_2 = 4$ and $m = 20$, what is the cost of the bundle $(3, 2)$? (Enter the cost.)
::: solution
Cost is $2\cdot 3 + 4\cdot 2 = 6 + 8 = 14$. The bundle is affordable, because $14 \le 20$.
:::
:::

::: exercise A Cobb–Douglas MRS {level=1 check="4"}
Let $u(x_1, x_2) = x_1^{1/2} x_2^{1/2}$. Compute $\mathrm{MRS}_{12}$ at the bundle $(2, 8)$. (Enter the value of the MRS.)
::: solution
$\mathrm{MRS}_{12} = u_1/u_2 = x_2/x_1 = 8/2 = 4$. (From [[#ex-mrs-three]] with $a = 1/2$.)
:::
:::

::: exercise Perfect substitutes {level=2}
A consumer has $u = 2x_1 + x_2$, prices $(p_1, p_2) = (3, 1)$ and income $m = 12$. Which bundles on the budget line are optimal? What if instead $p_1 = 2$? What if $p_1 = 1$?
::: solution
$\mathrm{MRS}_{12} = 2$. Compare with $p_1/p_2$.

If $p_1 = 3 > 2$, good 1 is too expensive relative to the willingness to substitute: the consumer spends everything on good 2, so $\mathbf{x}^* = (0, 12)$.

If $p_1 = 2 = \mathrm{MRS}_{12}$, every bundle on the budget line $2x_1 + x_2 = 12$ is optimal.

If $p_1 = 1 < 2$, good 1 is cheap: $\mathbf{x}^* = (12, 0)$.
:::
:::

::: exercise Perfect complements {level=2 check="4"}
Let $u = \min\set{x_1, x_2}$, $p_1 = 1$, $p_2 = 2$, $m = 12$. The consumer buys on the ray $x_1 = x_2$. How many units of good 1 does she buy? (Enter that quantity.)
::: solution
On the ray $x_1 = x_2 = x$ the budget is $x + 2x = 12$, so $x = 4$. She buys $(4, 4)$. Any other affordable bundle has leftover of one good and a strictly lower $\min$.
:::
:::

::: exercise An increasing transformation {level=2}
Let $u = x_1^2 x_2$ and $v = 2\ln x_1 + \ln x_2$ on $x_1, x_2 > 0$. Show that $v = \ln u$, and verify that $\mathrm{MRS}_{12}$ is the same function of $(x_1, x_2)$ for both representations.
::: solution
$\ln u = \ln(x_1^2 x_2) = 2\ln x_1 + \ln x_2 = v$. For $u$: $u_1 = 2x_1 x_2$, $u_2 = x_1^2$, so $\mathrm{MRS}_{12} = 2x_2/x_1$. For $v$: $v_1 = 2/x_1$, $v_2 = 1/x_2$, so $\mathrm{MRS}_{12} = (2/x_1)/(1/x_2) = 2x_2/x_1$. Same ratio, as [[#thm-ordinal]] requires.
:::
:::

::: exercise Quasi-linear MRS {level=2}
For $u = \sqrt{x_1} + x_2$, compute $\mathrm{MRS}_{12}(x_1, x_2)$. Show that it does not depend on $x_2$. At which $x_1$ does $\mathrm{MRS}_{12}$ equal a price ratio $p_1/p_2 = 1/4$?
::: hint
$u_1 = 1/(2\sqrt{x_1})$, $u_2 = 1$.
:::
::: solution
$\mathrm{MRS}_{12} = u_1/u_2 = 1/(2\sqrt{x_1})$, independent of $x_2$. Set $1/(2\sqrt{x_1}) = 1/4$, so $2\sqrt{x_1} = 4$, $\sqrt{x_1} = 2$, $x_1 = 4$. (Whether this is affordable depends on $m$ and $p_2$; that is the next chapter.)
:::
:::

::: exercise A non-crossing argument {level=3}
Suppose $\succsim$ is strictly monotone. Prove that two distinct indifference curves cannot intersect.
::: hint
If they crossed at $\mathbf{z}$, transitivity would make every point on either curve indifferent to $\mathbf{z}$. Pick a point on one curve that has more of every good than a point on the other.
:::
::: solution
Suppose $\mathbf{x} \sim \mathbf{z}$ and $\mathbf{y} \sim \mathbf{z}$ with $\mathbf{x}$ not indifferent to $\mathbf{y}$ — two curves through $\mathbf{z}$. Then $\mathbf{x} \sim \mathbf{y}$ by transitivity. Strict monotonicity implies that if $\mathbf{a} \ge \mathbf{b}$ and $\mathbf{a} \neq \mathbf{b}$ then $\mathbf{a} \succ \mathbf{b}$, so no two comparable-by-more bundles can be indifferent. But if the curves are distinct, one of them contains a bundle that is strictly larger, in at least one coordinate and no smaller in the others, than a bundle on the other curve (otherwise the sets would coincide in a neighbourhood, and by connectedness they would coincide). That pair would be strictly ranked and also indifferent, a contradiction. Hence distinct indifference sets of a strictly monotone relation are disjoint.
:::
:::

::: exercise Homotheticity and the MRS {level=3}
Let $u$ be homogeneous of degree $k > 0$ and differentiable, with $u_2 \neq 0$. Prove that $\mathrm{MRS}_{12}(\lambda\mathbf{x}) = \mathrm{MRS}_{12}(\mathbf{x})$ for all $\lambda > 0$. Conclude that indifference curves of homothetic preferences have the same slope along any ray from the origin.
::: hint
Euler's theorem is not needed. Differentiate $u(\lambda\mathbf{x}) = \lambda^k u(\mathbf{x})$ with respect to each coordinate.
:::
::: solution
Differentiating $u(\lambda x_1, \lambda x_2) = \lambda^k u(x_1, x_2)$ with respect to $x_1$ gives $\lambda\, u_1(\lambda\mathbf{x}) = \lambda^k u_1(\mathbf{x})$, so $u_1(\lambda\mathbf{x}) = \lambda^{k-1} u_1(\mathbf{x})$. The same for $u_2$. Therefore

$$
\mathrm{MRS}_{12}(\lambda\mathbf{x}) = \frac{u_1(\lambda\mathbf{x})}{u_2(\lambda\mathbf{x})} = \frac{\lambda^{k-1} u_1(\mathbf{x})}{\lambda^{k-1} u_2(\mathbf{x})} = \mathrm{MRS}_{12}(\mathbf{x}).
$$

Along the ray through $\mathbf{x}$, every bundle is $\lambda\mathbf{x}$ for some $\lambda > 0$, so the MRS is constant on the ray. Homothetic indifference curves are radial scalings of one another, and a constant MRS on each ray is exactly that geometry.
:::
:::

::: exercise Drawing the four families {level=3}
On a single pair of axes, sketch an indifference curve through $(4, 4)$ for each of: Cobb–Douglas $u = x_1 x_2$; perfect substitutes $u = x_1 + x_2$; perfect complements $u = \min\set{x_1, x_2}$; and quasi-linear $u = \ln x_1 + x_2$. In each case state $\mathrm{MRS}_{12}(4, 4)$ and say whether the curve is strictly convex to the origin.
::: solution
All four curves pass through $(4, 4)$.

Cobb–Douglas: rectangular hyperbola $x_1 x_2 = 16$, $\mathrm{MRS}_{12} = x_2/x_1 = 1$, strictly convex.

Perfect substitutes: the line $x_1 + x_2 = 8$, $\mathrm{MRS}_{12} = 1$, convex but not strictly.

Perfect complements: the L with corner at $(4, 4)$, arms parallel to the axes. MRS is undefined at the corner; $0$ on the horizontal arm and $+\infty$ on the vertical arm. Convex, not strictly, not differentiable at the kink.

Quasi-linear: $\ln x_1 + x_2 = \ln 4 + 4$, or $x_2 = 4 + \ln 4 - \ln x_1$, a vertical translate of $-\ln x_1$. $\mathrm{MRS}_{12} = 1/x_1 = 1/4$. Strictly convex in $x_1$, and the slope at a given $x_1$ does not depend on which curve (which $x_2$) one is on.
:::
:::
