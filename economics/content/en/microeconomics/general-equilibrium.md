One market at a time is Marshall's method: the price of rice equates the demand and supply of rice, taking the price of beans as given. Léon Walras asked a more awkward question. If every market has to clear at once, and the demand for rice depends on the price of beans, is there a *vector* of prices that clears every market simultaneously? That is **general equilibrium**. In an **exchange economy** the only "supply" is households' endowments; in an economy with production, firms' supply functions sit on the other side of each market. This chapter builds the Edgeworth box, defines a **Walrasian equilibrium**, computes a few, and sketches why one exists when preferences and technologies are convex. The welfare properties of that equilibrium are the next chapter.

The consumer and firm blocks of the course are the ingredients. Household $i$ has demand $x^i(\mathbf{p}, \mathbf{p}\cdot\boldsymbol\omega^i)$ from [[microeconomics/labour-and-intertemporal-choice]]; firm $j$ has supply from [[microeconomics/competitive-markets]]. General equilibrium is the fixed point of those maps. Partial equilibrium is not *wrong* — it is a conditional statement, holding other prices fixed — but it can mislead when the omitted markets feed back strongly. A tax on petrol that is a small share of a household budget may be well analysed in one market; a tax on housing in a city, or a wage in a one-industry town, may not. The Edgeworth box is the simplest place to see the feedback: $A$'s demand for good 1 *is* $B$'s supply, and the price that clears one market has to be the price that clears the other.

## Exchange and the Edgeworth box

Two consumers $A$ and $B$, two goods, aggregate endowment $\boldsymbol\omega = \boldsymbol\omega^A + \boldsymbol\omega^B \gg \mathbf{0}$. An **allocation** $(\mathbf{x}^A, \mathbf{x}^B)$ is **feasible** if $\mathbf{x}^A + \mathbf{x}^B = \boldsymbol\omega$ and $\mathbf{x}^i \ge \mathbf{0}$. The **Edgeworth box** is the rectangle of width $\omega_1$ and height $\omega_2$: $A$'s origin at the bottom left, $B$'s at the top right, so every point in the box is a feasible allocation.

::: definition Walrasian equilibrium (exchange) {#def-walras}
A **Walrasian (competitive) equilibrium** of the exchange economy is a price vector $\mathbf{p} \gg \mathbf{0}$ and a feasible allocation $(\mathbf{x}^A, \mathbf{x}^B)$ such that $\mathbf{x}^i$ maximises $u^i$ on $B(\mathbf{p}, \boldsymbol\omega^i)$ for $i = A, B$. Equivalently, aggregate excess demand $\mathbf{z}(\mathbf{p}) = x^A(\mathbf{p}, \mathbf{p}\cdot\boldsymbol\omega^A) + x^B(\mathbf{p}, \mathbf{p}\cdot\boldsymbol\omega^B) - \boldsymbol\omega$ equals zero.
:::

At an interior equilibrium each consumer's indifference curve is tangent to the common budget line through her endowment, so the two indifference curves are tangent to each other: $\mathrm{MRS}_{12}^A = \mathrm{MRS}_{12}^B = p_1/p_2$. That common slope is the equilibrium relative price. The **contract curve** (the set of points where $\mathrm{MRS}^A = \mathrm{MRS}^B$) is the locus of all such tangencies; equilibrium is the point on the contract curve that lies on the budget line through the endowment.

::: proposition Walras's law {#prop-walras-law}
If each consumer spends all her wealth, $\mathbf{p}\cdot\mathbf{z}(\mathbf{p}) = 0$ for every $\mathbf{p} \gg \mathbf{0}$, not just at equilibrium. Consequently, if $n-1$ markets clear, the $n$th market clears automatically.
:::

::: proof
Consumer $i$ satisfies $\mathbf{p}\cdot x^i(\mathbf{p}, \mathbf{p}\cdot\boldsymbol\omega^i) = \mathbf{p}\cdot\boldsymbol\omega^i$ by Walras's law of [[microeconomics/consumer-choice#thm-marshall-props]]. Summing over $i$ gives $\mathbf{p}\cdot\sum x^i = \mathbf{p}\cdot\boldsymbol\omega$, i.e. $\mathbf{p}\cdot\mathbf{z}(\mathbf{p}) = 0$. If $z_1(\mathbf{p}) = \cdots = z_{n-1}(\mathbf{p}) = 0$ and $p_n > 0$, then $p_n z_n(\mathbf{p}) = 0$ forces $z_n(\mathbf{p}) = 0$.
:::

Homogeneity of excess demand — $\mathbf{z}(\lambda\mathbf{p}) = \mathbf{z}(\mathbf{p})$ — means only *relative* prices are determined. We normalise $p_2 = 1$ throughout the examples and solve $z_1(p_1, 1) = 0$. The numeraire is a unit of account, not a special good. Any good whose equilibrium price is strictly positive will do; if one suspects a free good, one should not normalise its price to 1, because the equilibrium might want that price to be zero. In applied CGE models the numeraire is often a consumer price index or a wage, and real quantities are then measured relative to that index. The algebra of excess demand does not care, so long as the chosen numeraire is not free.

::: example Identical Cobb–Douglas, interior equilibrium {#ex-identical-cd}
$A$ has $u^A = \sqrt{x_1 x_2}$ and $\boldsymbol\omega^A = (6, 2)$; $B$ has the same utility and $\boldsymbol\omega^B = (2, 6)$. Aggregate endowment $(8, 8)$. Set $p_2 = 1$ and find the equilibrium.
::: solution
Wealth: $m^A = 6p_1 + 2$, $m^B = 2p_1 + 6$. Equal-share Cobb–Douglas: $x_1^A = (6p_1+2)/(2p_1) = 3 + 1/p_1$, $x_1^B = (2p_1+6)/(2p_1) = 1 + 3/p_1$. Market clearing:

$$
3 + \frac1{p_1} + 1 + \frac3{p_1} = 8 \implies 4 + \frac4{p_1} = 8 \implies p_1 = 1.
$$

Then $x^A = (4, 4)$, $x^B = (4, 4)$. Each consumer's MRS at $(4, 4)$ is $x_2/x_1 = 1 = p_1/p_2$. The allocation is the centre of the box, which is also on the contract curve (the diagonal, by identical homothetic preferences).
:::
:::

::: example Different preferences {#ex-different-prefs}
$A$ has $u^A = x_1^{2/3} x_2^{1/3}$ and $\boldsymbol\omega^A = (4, 0)$; $B$ has $u^B = y_1^{1/3} y_2^{2/3}$ and $\boldsymbol\omega^B = (0, 4)$. Find the equilibrium with $p_2 = 1$.
::: solution
$m^A = 4p_1$, $m^B = 4$. Then $x_1^A = (2/3)(4p_1)/p_1 = 8/3$, $y_1^B = (1/3)\cdot 4/p_1 = 4/(3p_1)$. Clearing of good 1:

$$
\frac83 + \frac{4}{3p_1} = 4 \implies \frac{8p_1 + 4}{3p_1} = 4 \implies 8p_1 + 4 = 12 p_1 \implies 4 = 4p_1 \implies p_1 = 1.
$$

$A$ consumes $(8/3, 4/3)$ (she spends one-third of wealth $4$ on good 2). $B$ consumes $(4/3, 8/3)$. Check MRS: $\mathrm{MRS}^A = 2 x_2/x_1 = 2\cdot(4/3)/(8/3) = 1$, $\mathrm{MRS}^B = y_2/(2 y_1) = (8/3)/(8/3) = 1$. Both equal $p_1$. $A$, who cares more about good 1, consumes more of it; $B$ consumes more of good 2.
:::
:::

::: widget contour
f: (x^2 * y)^(1/3)
x: 0.2, 4
y: 0.2, 4
levels: 8
gradient: false
constraint: p*x + y - 4*p
point: 2.67, 1.33
sliders: p=1:0.4:2.5:0.1
caption: Consumer $A$'s indifference curves for $u=x^{2/3} y^{1/3}$ and her budget $p x + y = 4p$ (endowment $(4,0)$). At $p=1$ the tangency is $(8/3, 4/3)$, as in [[#ex-different-prefs]]. Raise $p$ (good 1 dearer): $A$ is a net seller of good 1, so the budget line pivots through $(4,0)$ and she may consume more or less of good 1 — here $x_1^A = 8/3$ is independent of $p$, a Cobb–Douglas accident. $B$'s problem is the same picture read from the opposite corner of an $4\times 4$ box.
:::

The **offer curve** of $A$ is the locus of her demanded bundles as $p$ varies, each point the tangency of an indifference curve with a budget through $\boldsymbol\omega^A$. Equilibrium is where the two offer curves intersect (other than at the endowment, which is always on both). Drawing both offer curves in the box is the standard picture of existence in two dimensions: they start at the endowment and, with monotone preferences, must cross again.

## Existence, uniqueness, and non-convexity

::: theorem Existence of Walrasian equilibrium {#thm-existence}
Consider a pure-exchange economy with a finite number of consumers, each having a continuous, strictly monotone, strictly convex preference relation on $\R_+^n$ and a strictly positive endowment. Then a Walrasian equilibrium exists.
:::

The proof (Arrow and Debreu 1954; Debreu, *Theory of Value*, 1959) applies Kakutani's fixed-point theorem to a trimmed excess-demand correspondence on the price simplex. Continuity of demand comes from Berge's theorem; Walras's law keeps the image in a hyperplane; convexity of preferences makes demand convex-valued, which Kakutani needs. Strict monotonicity keeps equilibrium prices strictly positive. We will not reproduce the fixed-point argument; the message is that **convexity is doing real work**.

Without convexity, existence can fail. A consumer who wants *exactly* 1 unit of a discrete good, or a firm with IRS, produces a non-convex-valued demand or supply, and the usual crossing argument misses. Large numbers can restore existence in the approximate sense of the Shapley–Folkman theorem, which is why a competitive model of an industry with mild IRS at the plant level can still be a good description of the market. That is a theorem, not a licence to ignore increasing returns when they are the point of the industry.

Uniqueness is harder and rarer. The **gross-substitutes** condition — $\partial z_i/\partial p_j > 0$ for $i \neq j$ — is sufficient for uniqueness and for tatonnement stability. Cobb–Douglas excess demands satisfy it in exchange. Homothetic identical preferences give uniqueness because the economy aggregates to one consumer. In general, Sonnenschein, Mantel and Debreu (1972–1974) showed that any continuous $z$ satisfying Walras's law and homogeneity is an excess-demand function of some economy on a compact set of prices: theory alone does not restrict the shape of $z$, and multiple equilibria are possible.

::: example An equilibrium that is easy to miss {#ex-corner-eq}
$A$ has Leontief preferences $u^A = \min\set{x_1, x_2}$ and $\boldsymbol\omega^A = (1, 0)$; $B$ has $u^B = \min\set{y_1, y_2}$ and $\boldsymbol\omega^B = (0, 1)$. Find an equilibrium.
::: solution
Each consumer wants equal quantities of the two goods. At prices $(p_1, 1)$, $A$'s wealth is $p_1$, so she buys $(p_1/(p_1+1), p_1/(p_1+1))$; $B$'s wealth is $1$, so she buys $(1/(p_1+1), 1/(p_1+1))$. Aggregate demand for good 1 is $1$, equal to aggregate endowment, *for every* $p_1 > 0$. Every price is an equilibrium, and the allocation is always $x^A = \bigl(p_1/(p_1+1),\, p_1/(p_1+1)\bigr)$, $x^B$ the rest. The contract curve is the diagonal of the $1\times 1$ box; every diagonal point is an equilibrium allocation for a suitable $p$. Uniqueness of *prices* fails; uniqueness of the *allocation* also fails.
:::
:::

::: warning Normalising the wrong price
If a good is in excess supply at every strictly positive price (a satiated consumer, a free good), its equilibrium price is zero and it must not be used as numeraire. Setting $p_2 = 1$ in a textbook problem is safe only when both goods are desirable at the margin. Walras's law still holds; it just no longer upgrades $n-1$ clearings to $n$ when some $p_i = 0$.
:::

## Production: Robinson Crusoe and two sectors

A **Robinson Crusoe** economy has one consumer, who owns a technology $f$ and a time endowment $T$. He chooses labour $L$ and consumption $c = f(L)$, with leisure $\ell = T - L$. The competitive story is: the firm, taking a wage $w$ and a price $p = 1$, maximises $f(L) - w L$; the consumer, taking $w$, maximises $u(c, \ell)$ on $c + w\ell = wT$ (plus any profit, which in equilibrium is $f(L^*) - w L^*$). Equilibrium equates the firm's labour demand to the consumer's labour supply.

::: example Crusoe with a square-root technology {#ex-crusoe}
Let $u = \sqrt{c\, \ell}$, $c = \sqrt{L}$, $T = 24$. Find the planner's allocation (max $u$ subject to the technology). Then find a wage $w$ that decentralises it.
::: solution
Substitute $c = \sqrt{L}$, $\ell = 24-L$ into $u$: maximise $\tfrac12 \ln L + \ln(24-L)$ (up to constants). FOC: $1/(2L) - 1/(24-L) = 0$, so $24-L = 2L$, $L^* = 8$, $c^* = \sqrt{8} = 2\sqrt{2} \approx 2.828$, $\ell^* = 16$.

Firm: $\max_L \sqrt{L} - w L$, FOC $1/(2\sqrt{L}) = w$, so $w = 1/(2\sqrt{8}) = 1/(4\sqrt{2}) = \sqrt{2}/8 \approx 0.177$. Profit $\Pi = \sqrt{8} - w\cdot 8 = 2\sqrt{2} - \sqrt{2} = \sqrt{2}$. Consumer's full income $wT + \Pi = 24\cdot\sqrt{2}/8 + \sqrt{2} = 3\sqrt{2} + \sqrt{2} = 4\sqrt{2}$. Cobb–Douglas equal shares: $c = 2\sqrt{2}$, $w\ell = 2\sqrt{2}$, so $\ell = 2\sqrt{2}/w = 2\sqrt{2} \cdot 4\sqrt{2} = 16$. The competitive allocation matches the planner's. That is the first welfare theorem in a one-person economy, and it is why Crusoe is worth computing.
:::
:::

With two firms and two consumers the same logic applies: firms maximise profit at $(\mathbf{p}, w, r)$, households maximise utility on the budget that includes wages, rentals and profits, and markets for goods and factors clear. The **production-possibility frontier** is the image of the efficient input allocations; a competitive equilibrium is a tangency between that frontier and a community indifference curve, with price equal to both the MRS and the MRT. Two-sector models (Heckscher–Ohlin in [[international-trade]]) are this picture with extra labels.

::: quiz
In an exchange economy, Walras's law says $\mathbf{p}\cdot\mathbf{z}(\mathbf{p}) = 0$ for every $\mathbf{p}$. If, at some $\mathbf{p}$, the market for good 1 has $z_1 > 0$ (excess demand), what must be true of the other markets together?
- [ ] Each other market is in excess demand too
- [x] The remaining markets, valued at $\mathbf{p}$, are in excess supply in aggregate
- [ ] The price vector cannot be an equilibrium, and no further conclusion
- [ ] Good 1's price must be zero
::: solution
$\mathbf{p}\cdot\mathbf{z} = p_1 z_1 + \sum_{i\ge 2} p_i z_i = 0$ with $p_1 z_1 > 0$ forces $\sum_{i\ge 2} p_i z_i < 0$: excess supply, in value terms, elsewhere. That is why a single excess-demand market cannot be the whole story, and why we solve $n-1$ equations, not $n$.
:::
:::

## Evidence

General equilibrium is a theory of consistency, not a regression. What can be brought to data is more modest.

**Computable GE.** Shoven and Whalley (1984) and the subsequent CGE literature calibrate demand and production to an input–output table and a set of elasticities, then compute a new equilibrium after a tax or a tariff. The numbers are as good as the calibration; they are not estimates of $z(\mathbf{p})$. Applied trade and tax papers still use the method, with the convexity and representative-agent assumptions in view.

**Existence in the laboratory.** Chamberlin (1948) and Smith (1962) ran double-auction markets in which a competitive price emerged even with a handful of traders. The experiments support price-taking as an *outcome* of a trading rule, not just as an assumption on individual behaviour. They do not show that every economy has a unique stable equilibrium.

**Multiple equilibria and sunspots.** Cass and Shell (1983) constructed equilibria in which an extrinsic random variable ("sunspots") coordinates which of several equilibria is played. The Sonnenschein–Mantel–Debreu result says the theory cannot rule this out. Whether sunspots describe any particular market is an empirical question the theory, by itself, does not answer.

::: history
**1874, Léon Walras.** *Éléments d'économie politique pure* wrote the system of $n$ excess-demand equations and claimed a solution, counting equations and unknowns. The count is the beginning of existence theory, not the end.

**1881, Francis Ysidro Edgeworth.** *Mathematical Psychics* drew the box and the contract curve, and argued that with many traders the range of bargaining shrinks to the competitive allocation (the core converges). Debreu and Scarf (1963) made that precise.

**1930s, Abraham Wald.** Wald gave the first rigorous existence proofs for special cases, in the Vienna colloquium.

**1954, Kenneth Arrow and Gérard Debreu.** *Existence of an Equilibrium for a Competitive Economy* proved [[#thm-existence]] with production, using Kakutani. McKenzie (1954, 1959) gave a closely related proof.

**1972–1974, Sonnenschein, Mantel, Debreu.** The "anything goes" theorems on excess demand, which delimit what existence without uniqueness can deliver.
:::

## Where this leads

An equilibrium allocation is what people *do* at some $\mathbf{p}$. Whether that allocation is *efficient*, and whether every efficient allocation is an equilibrium for some $\mathbf{p}$ and some redistribution of endowments, are the two welfare theorems ([[microeconomics/welfare-theorems]]). Game theory studies the same box as a bargaining problem rather than a price-taking problem ([[game-theory]]). With production and many countries, the same equilibrium is a trade model ([[international-trade]]). Incomplete markets and asymmetric information are the point at which the existence theorem's hypotheses fail in a way that matters for [[information-economics]] and [[asset-pricing]].

::: summary
- A Walrasian equilibrium is a price vector and a feasible allocation such that each agent optimises on her budget and markets clear. Excess demand $\mathbf{z}(\mathbf{p})$ is homogeneous of degree zero and satisfies Walras's law $\mathbf{p}\cdot\mathbf{z}(\mathbf{p}) = 0$.
- In an Edgeworth box, interior equilibrium is a tangency of two indifference curves on a budget through the endowment, i.e. a point on the contract curve.
- Existence (Arrow–Debreu) uses convexity, continuity and monotonicity. Without convexity, equilibrium may fail. Uniqueness is not generic (Sonnenschein–Mantel–Debreu).
- Robinson Crusoe: the planner's allocation is decentralised by a wage equal to the marginal product, with profits returned to the consumer. Two-sector economies add a PPF and an MRT.
- Only relative prices are determined. A good in excess supply at every positive price has equilibrium price zero and is a poor numeraire.
:::

## Exercises

::: exercise A symmetric box {level=1 check="1"}
In [[#ex-identical-cd]], what is the equilibrium $p_1$ when $p_2 = 1$? (Enter the price.)
::: solution
$p_1 = 1$.
:::
:::

::: exercise Reading an allocation {level=1 check="4"}
In that same equilibrium, how many units of good 1 does $A$ consume? (Enter the quantity.)
::: solution
$x_1^A = 4$.
:::
:::

::: exercise MRS check {level=1}
At the allocation of [[#ex-different-prefs]], compute $\mathrm{MRS}^A$ and $\mathrm{MRS}^B$ and confirm they equal the price ratio.
::: solution
$A$ has $(8/3, 4/3)$, $\mathrm{MRS}^A = 2 x_2/x_1 = 1$. $B$ has $(4/3, 8/3)$, $\mathrm{MRS}^B = y_2/(2y_1) = 1$. Price ratio $p_1/p_2 = 1$.
:::
:::

::: exercise An autarkic endowment {level=2}
$A$ has $u^A = \sqrt{x_1 x_2}$, $\boldsymbol\omega^A = (4, 4)$; $B$ has the same utility, $\boldsymbol\omega^B = (4, 4)$. Find the equilibrium. Why is there no trade?
::: solution
The endowment is already at the centre of the box, on the contract curve (identical homothetic preferences). At $p_1 = 1$, each consumer demands $(4, 4)$, her endowment. Excess demand is zero. Any $p$ actually works: each demands half her wealth on each good, and with $\omega_1^A = \omega_2^A$ she always demands her endowment. No mutually beneficial trade exists.
:::
:::

::: exercise Offer-curve algebra {level=2}
For $A$ in [[#ex-identical-cd]], with $p_2 = 1$, write $x_1^A(p_1)$ and $x_2^A(p_1)$. Evaluate at $p_1 = 1$ and at $p_1 = 2$. Which of those two demanded bundles is feasible given $\boldsymbol\omega = (8, 8)$?
::: solution
$m^A = 6p_1 + 2$, so $x_1^A = m^A/(2p_1) = 3 + 1/p_1$ and $x_2^A = m^A/2 = 3p_1 + 1$. At $p_1 = 1$: $(4, 4)$, feasible. At $p_1 = 2$: $x_1^A = 3.5$, $x_2^A = 7$, feasible (the box is $8\times 8$). Notional demand can leave the box at more extreme prices — for example $p_1 = 4$ gives $x_2^A = 13 > 8$ — which is why an equilibrium has to be found, not assumed.
:::
:::

::: exercise Crusoe's wage {level=2}
In [[#ex-crusoe]], confirm that $w = \sqrt{2}/8$ equates the firm's FOC $1/(2\sqrt{L}) = w$ at $L = 8$. Compute profit and the consumer's full income.
::: solution
$1/(2\sqrt{8}) = 1/(4\sqrt{2}) = \sqrt{2}/8$ after rationalising. Profit $\Pi = 2\sqrt{2} - 8\cdot\sqrt{2}/8 = 2\sqrt{2} - \sqrt{2} = \sqrt{2}$. Full income $wT + \Pi = 24\cdot\sqrt{2}/8 + \sqrt{2} = 3\sqrt{2}+\sqrt{2} = 4\sqrt{2}$.
:::
:::

::: exercise Count the equations {level=3}
An exchange economy has 3 goods and 2 consumers. After normalising $p_3 = 1$, how many independent market-clearing equations remain? Why not 3?
::: solution
Three markets, but Walras's law makes one equation redundant, and homogeneity makes only relative prices determinate. One normalisation plus one redundant equation leaves $3-1 = 2$ independent equations in the two relative prices $(p_1, p_2)$. Writing three equations in three absolute prices would double-count.
:::
:::

::: exercise A one-good excess demand {level=3}
In a two-good exchange economy, $z_1(p_1, 1) = 6/p_1 - 2 - p_1$ (an illustrative excess demand, not derived from a particular $u$). Find the positive root of $z_1 = 0$ and confirm that $z_2$ is then zero by Walras's law if the formula came from two consumers who spend all their wealth. (You need not recover $z_2$.)
::: hint
Multiply $z_1 = 0$ by $p_1$: $6 - 2p_1 - p_1^2 = 0$.
:::
::: solution
$p_1^2 + 2p_1 - 6 = 0$, $p_1 = -1 + \sqrt{7}$ (the positive root), $\sqrt{7} \approx 2.646$, so $p_1 \approx 1.646$. (The other root $-1-\sqrt{7}$ is negative and not a price.) At that price $z_1 = 0$, so Walras's law $p_1 z_1 + z_2 = 0$ gives $z_2 = 0$ automatically.
:::
:::

::: exercise Non-convex preferences, a sketch {level=3}
A single consumer in a one-good-plus-leisure world has indifference curves that are concave to the origin over part of the box (she prefers extremes to averages). Explain in a paragraph why a budget line through her endowment might not be tangent to any indifference curve at a point she will choose, and why that threatens existence of a competitive equilibrium.
::: solution
Concave-to-the-origin indifference curves mean the consumer likes averages *less* than extremes: the upper contour set is non-convex. A straight budget line can then cut the same indifference curve twice, and the utility-maximising point on the line is at a *corner* of the budget, not at a tangency. The demand jumps from one corner to the other as the price ratio passes a critical value, and is empty of interior points in between. Excess demand is not convex-valued and may jump over zero: there is no price at which she is willing to demand exactly her endowment plus a given net trade. Kakutani's theorem no longer applies, and a Walrasian equilibrium may fail to exist. (A planner, unconstrained by linear prices, could still pick a best feasible point.)
:::
:::
