A Walrasian equilibrium is a description of what people will do at some prices. It is not, by itself, a claim that they *should* do it. **Pareto efficiency** is the standard positive-to-normative bridge in this course: an allocation is efficient if no feasible alternative makes someone better off without making someone else worse off. The **first welfare theorem** says that, under local non-satiation, a Walrasian equilibrium allocation is Pareto efficient. The **second welfare theorem** says that, under convexity, every efficient allocation is a Walrasian equilibrium after a lump-sum redistribution of endowments. Together they are the theoretical case for "markets plus redistribution". They fail, in precise ways, when there are externalities, public goods, market power or missing markets — which is why those failures occupy [[public-economics]] and [[industrial-organisation]].

This chapter states the theorems, proves the first one, sketches the second, introduces social welfare functions as an extra (normative) object, and computes a Pigouvian tax and a Samuelson public-good condition. Efficiency is not equity; a Pareto-efficient allocation can be appalling by any distributional standard. The second theorem separates the two questions. Whether lump-sum transfers are available in practice is a different question, taken up in [[public-economics/role-of-government]].

## Pareto efficiency

::: definition Pareto efficiency {#def-pareto}
A feasible allocation $\mathbf{x} = (\mathbf{x}^1, \dots, \mathbf{x}^I)$ is **Pareto efficient** (Pareto optimal) if there is no other feasible allocation $\mathbf{y}$ with $u^i(\mathbf{y}^i) \ge u^i(\mathbf{x}^i)$ for all $i$ and strict inequality for at least one $i$. It is **Pareto dominated** if such a $\mathbf{y}$ exists. The **Pareto set** (contract curve, in an Edgeworth box) is the set of efficient allocations.
:::

Efficiency is a ranking of allocations, not of people. It is silent on who gets what, so long as nothing is left on the table. In an Edgeworth box the Pareto set is the locus of tangencies $\mathrm{MRS}^A = \mathrm{MRS}^B$, including the edges where one consumer is at a corner. The two axes of the box are typically efficient: giving everything to $A$ is efficient, and so is giving everything to $B$. Anyone who finds that conclusion ugly is reacting to *equity*, which Pareto efficiency does not measure.

A related interior characterisation: an allocation is efficient if and only if it maximises $u^A$ subject to $u^B \ge \bar u^B$ and feasibility, for a suitable $\bar u^B$ (and symmetrically). The Lagrangian of that problem yields $\mathrm{MRS}^A = \mathrm{MRS}^B$, and with production $\mathrm{MRS} = \mathrm{MRT}$.

::: example Efficiency in a $2\times 2$ box {#ex-pareto-box}
Two consumers, aggregate endowment $(8, 8)$. $A$ has $u^A = \sqrt{x_1 x_2}$, $B$ has $u^B = \sqrt{y_1 y_2}$. Which of the following allocations of $A$'s bundle (with the rest going to $B$) are Pareto efficient: $(4, 4)$; $(6, 2)$; $(8, 0)$?
::: solution
Identical homothetic preferences: the contract curve is the diagonal $x_2^A = x_1^A$. So $(4, 4)$ for $A$ (and $(4, 4)$ for $B$) is efficient. $(6, 2)$ for $A$ is off the diagonal: $\mathrm{MRS}^A = 2/6 = 1/3$, $\mathrm{MRS}^B = 6/2 = 3$ at $B$'s bundle $(2, 6)$. The MRS's disagree, so a small trade — $A$ gives a little of good 1 for a little of good 2 — raises both utilities. $(8, 0)$ for $A$ is a corner of the box. $B$ gets $(0, 8)$. $A$'s MRS is 0 (she has no good 2); there is no mutually improving trade because $A$ has nothing of good 2 to offer and $B$ has nothing of good 1. The corner is efficient — and extremely unequal.
:::
:::

## The two theorems

::: theorem First fundamental theorem of welfare economics {#thm-fwt}
Suppose each consumer's preferences are locally non-satiated. Then any Walrasian equilibrium allocation is Pareto efficient.
:::

::: proof
Let $(\mathbf{p}, \mathbf{x})$ be a Walrasian equilibrium, and suppose $\mathbf{y}$ is feasible and Pareto dominates $\mathbf{x}$: $u^i(\mathbf{y}^i) \ge u^i(\mathbf{x}^i)$ for all $i$, strict for some $k$. Local non-satiation plus optimality of $\mathbf{x}^i$ on the budget imply $\mathbf{p}\cdot\mathbf{y}^i \ge \mathbf{p}\cdot\mathbf{x}^i$ for all $i$, and $\mathbf{p}\cdot\mathbf{y}^k > \mathbf{p}\cdot\mathbf{x}^k$ (if $\mathbf{y}^k$ were affordable and strictly better, $\mathbf{x}^k$ would not have been chosen; if $\mathbf{y}^k$ were indifferent and cheaper, local non-satiation would produce a still-affordable strictly better bundle). Summing, $\mathbf{p}\cdot\sum\mathbf{y}^i > \mathbf{p}\cdot\sum\mathbf{x}^i = \mathbf{p}\cdot\boldsymbol\omega$. But feasibility of $\mathbf{y}$ says $\sum\mathbf{y}^i \le \boldsymbol\omega$, so $\mathbf{p}\cdot\sum\mathbf{y}^i \le \mathbf{p}\cdot\boldsymbol\omega$, a contradiction.
:::

The proof does not use convexity. It uses local non-satiation (to get a strict inequality in the value of the dominating bundle) and the definition of a budget. Market power, externalities and public goods all violate the implicit hypothesis that one agent's choice set does not depend on another's action except through $\mathbf{p}$.

::: theorem Second fundamental theorem of welfare economics {#thm-swt}
Suppose preferences are continuous, convex and strictly monotone, and the allocation $\mathbf{x}^*$ is Pareto efficient and interior. Then there exist prices $\mathbf{p}$ and a redistribution of endowments (or, equivalently, lump-sum transfers $T^i$ with $\sum T^i = 0$) such that $(\mathbf{p}, \mathbf{x}^*)$ is a Walrasian equilibrium of the redistributed economy.
:::

::: proof
Sketch. Let $P^i = \set{\mathbf{z} : u^i(\mathbf{z}) > u^i(\mathbf{x}^{*i})}$ be $i$'s strictly preferred set, and let $P = \sum_i P^i$. Convexity of preferences makes each $P^i$ convex, hence $P$ convex. Efficiency says that no point of $P$ is feasible, so in particular $P$ does not contain $\sum_i \mathbf{x}^{*i}$. Translate by $-\sum\mathbf{x}^{*i}$: the convex set $P - \sum\mathbf{x}^{*i}$ does not contain $\mathbf{0}$. A separating hyperplane yields $\mathbf{p} \neq \mathbf{0}$ with $\mathbf{p}\cdot\mathbf{z} \ge \mathbf{p}\cdot\mathbf{x}^{*i}$ for every $\mathbf{z}$ preferred by $i$, all $i$. Monotonicity forces $\mathbf{p} \gg \mathbf{0}$. Giving consumer $i$ wealth $\mathbf{p}\cdot\mathbf{x}^{*i}$ (a lump-sum transfer from the original endowment) makes $\mathbf{x}^{*i}$ affordable and, by the supporting-price property, optimal. Markets clear because $\mathbf{x}^*$ is feasible.
:::

The second theorem is the theoretical warrant for "fix the distribution with lump-sum taxes, then let markets work". Two caveats, both standard and both important. First, lump-sum taxes require knowledge of who is who; if types are hidden, a tax on endowments is no longer incentive-compatible, which is the starting point of [[public-economics/optimal-taxation]] and of [[information-economics]]. Second, convexity is used: without it, an efficient point may not be supportable by linear prices (the same non-convexity that threatened existence).

::: example Supporting prices in the box {#ex-swt}
In [[#ex-pareto-box]], the efficient allocation $x^A = (6, 6)$, $x^B = (2, 2)$ (on the diagonal of an $8\times 8$ box). Find prices and transfers from the original endowment $\boldsymbol\omega^A = (6, 2)$, $\boldsymbol\omega^B = (2, 6)$ that support it.
::: solution
At $(6, 6)$, $\mathrm{MRS}^A = 1$; at $(2, 2)$, $\mathrm{MRS}^B = 1$. Set $p_1 = p_2 = 1$. Wealth needed: $A$ needs $12$, $B$ needs $4$. Original wealth at these prices: $A$ has $6+2 = 8$, $B$ has $2+6 = 8$. Transfer $T^A = 4$, $T^B = -4$. Then $A$ buys $(6, 6)$ and $B$ buys $(2, 2)$. Without the transfer, the equilibrium of [[microeconomics/general-equilibrium#ex-identical-cd]] was $(4, 4)$ each — also efficient, but a different distribution.
:::
:::

::: warning Efficient is not "good"
The first theorem does not say that the equilibrium is just, fair, or the social optimum. It says there is no *unused* gain from trade. An equilibrium in which one person holds everything is efficient. Anyone who wants to rank efficient allocations needs an extra criterion — a social welfare function, a poverty line, a Gini constraint — and that criterion is normative. The second theorem says how, in the model, to *move* among efficient allocations; it does not say which one to move to.
:::

::: quiz
Which hypothesis is used in the first welfare theorem but not needed for existence of equilibrium?
- [ ] Convexity of preferences
- [x] Local non-satiation (for the strict inequality in the proof)
- [ ] Completeness of preferences
- [ ] A finite number of consumers
::: solution
Existence uses convexity, continuity and monotonicity. The FWT proof uses local non-satiation and budget identities; it does not use convexity. (Completeness is part of "preferences" in both theorems; finiteness is used for existence proofs of the Arrow–Debreu type but is not the distinctive FWT ingredient.)
:::
:::

## Social welfare functions

::: definition Bergson–Samuelson social welfare function {#def-swf}
A **social welfare function** (SWF) is a function $W(u^1, \dots, u^I)$ that ranks utility profiles. Standard examples: **utilitarian** $W = \sum_i u^i$; **Nash** $W = \prod_i u^i$; **maximin** (Rawlsian) $W = \min_i u^i$. A **social optimum** relative to $W$ is a feasible allocation that maximises $W$.
:::

If $W$ is increasing in each $u^i$, a social optimum is Pareto efficient (otherwise a Pareto improvement would raise $W$). The converse is false: every efficient allocation is a social optimum for *some* $W$, but a given $W$ picks one (or a few) points on the Pareto set. Under convexity, a utilitarian optimum can be decentralised by the second theorem, with transfers that equalise weighted marginal utilities of income.

Two limitations. First, the $u^i$ that enter $W$ are the *Bernoulli* or otherwise cardinal utilities of [[microeconomics/uncertainty]], or some other chosen cardinalisation — not the ordinal $u$ of [[microeconomics/preferences-and-utility#thm-ordinal]]. Interpersonal comparisons are an extra ethical input. Second, Arrow's impossibility theorem (1951, *Social Choice and Individual Values*) says that no social *ranking of alternatives* can satisfy a short list of apparently mild axioms (unrestricted domain, Pareto, independence of irrelevant alternatives, non-dictatorship) at once. Bergson–Samuelson SWFs dodge Arrow by taking utilities, not rankings of social states, as the input; they do not repeal the theorem.

::: intuition Weights are ethics
A utilitarian planner who maximises $\sum u^i$ with a concave $u^i$ over wealth will tend to equalise wealth if everyone has the same $u$. A planner who puts a large weight on $A$'s utility will not. Nothing in the first welfare theorem tells you which weights to use. Public economics treats the weights as an explicit ethical parameter ([[public-economics/redistribution]]), not as something markets reveal.
:::

## When the first theorem fails

Three failures are computed in every intermediate course. Market power is the fourth, postponed to industrial organisation.

### Externalities

An **externality** is an effect of one agent's action on another's utility or production that is not mediated by a price. The competitive FOC then equates the wrong things: private marginal cost rather than social.

::: proposition Pigouvian tax {#prop-pigou}
A competitive industry has inverse demand $p(Q)$ (marginal social benefit, if no demand-side externality) and private marginal cost $\mathrm{MPC}(Q)$. A marginal external cost $\mathrm{MD}(Q) \ge 0$ makes social marginal cost $\mathrm{MSC} = \mathrm{MPC} + \mathrm{MD}$. The competitive output $Q_c$ solves $p(Q_c) = \mathrm{MPC}(Q_c)$; the efficient output $Q^*$ solves $p(Q^*) = \mathrm{MSC}(Q^*)$. A per-unit tax $t = \mathrm{MD}(Q^*)$ on the generating activity implements $Q^*$.
:::

::: proof
Private FOC with tax: $p(Q) = \mathrm{MPC}(Q) + t$. Set $t = \mathrm{MD}(Q^*)$ and the equation is the social FOC at $Q^*$. Uniqueness if $p$ is decreasing and $\mathrm{MSC}$ increasing.
:::

::: example A linear externality {#ex-pigou}
Inverse demand $p = 12 - Q$, $\mathrm{MPC} = 2 + Q$, constant marginal damage $\mathrm{MD} = 2$. Find $Q_c$, $Q^*$, the Pigouvian tax, and the deadweight loss of the unregulated competitive output.
::: solution
Competitive: $12 - Q = 2 + Q$, $Q_c = 5$, $p_c = 7$. Social: $12 - Q = 4 + Q$, $Q^* = 4$, $p^* = 8$. Tax $t = 2$. Deadweight loss is the triangle between MSC and MB from $Q^* = 4$ to $Q_c = 5$: height $\mathrm{MSC}(5) - p(5) = 9 - 7 = 2$, width $1$, area $1$. (Equivalently $\tfrac12 \times 1 \times 2 = 1$.) After the tax, buyers pay $8$, sellers receive $6$, and $tQ^* = 8$ is tax revenue. Whether that revenue is "good" depends on how it is used; the efficiency gain is the recovered triangle of 1, independent of the transfer.
:::
:::

::: widget plot
f: 12-x; 2+x; 4+x
x: 0, 12
y: 0, 14
labels: MB=12-Q; MPC=2+Q; MSC=4+Q
caption: The externality of [[#ex-pigou]]. Competitive intersection of MB and MPC at $Q=5$; social intersection of MB and MSC at $Q=4$. The vertical gap between MSC and MPC is the constant damage $2$, which is the Pigouvian tax. Shade, in your head, the triangle with vertices at $Q=4$ and $Q=5$ between MSC and MB: that is the deadweight loss of $1$.
:::

The Coase theorem (1960) says that if property rights are well defined and bargaining is costless, the parties may reach $Q^*$ by themselves, and the tax is redundant. Transaction costs, free riding among many victims, and asymmetric information are why [[public-economics/externalities]] does not treat Coase as a universal substitute for Pigou. Both results are theorems with hypotheses; neither is a slogan.

### Public goods

A **pure public good** is non-rival (one person's consumption does not cut another's) and non-excludable. Private provision typically undersupplies it, because each consumer free-rides on the others.

::: proposition Samuelson condition {#prop-samuelson}
For a pure public good $G$ with private (numeraire) consumption $x^i$, efficiency requires

$$
\sum_{i=1}^I \mathrm{MRS}_{G, x}^i = \mathrm{MC}_G.
$$ {#eq-samuelson}

The sum of marginal willingness to pay equals marginal cost. A competitive market, in which each consumer equates her *own* MRS to the price of $G$, does not impose [[#eq-samuelson]] unless $I = 1$.
:::

::: proof
Maximise $\sum_i u^i(x^i, G)$ (or any increasing $W$) subject to $\sum_i x^i + c(G) = m$. FOC in $G$: $\sum_i u_G^i = c'(G)\, \lambda$, and $u_x^i = \lambda$, so $\sum_i (u_G^i / u_x^i) = c'(G)$.
:::

::: example Two-person public good {#ex-samuelson}
Two identical consumers, $u^i = \ln x^i + \ln G$, each with wealth $10$, marginal cost of $G$ equal to $2$, resource constraint $x^1 + x^2 + 2G = 20$. Find the Samuelson allocation. Compare with Nash private provision, in which each pays for $G$ independently and $G = g^1 + g^2$.
::: solution
Samuelson: $\mathrm{MRS}^i = x^i/G$, so $x^1/G + x^2/G = 2$. And $x^1 = x^2$ by symmetry, so $2x/G = 2$, $x = G$. Resource: $2x + 2G = 20$, $4G = 20$, $G^* = 5$, $x^* = 5$.

Private Nash: consumer $i$ maximises $\ln(10 - 2 g^i) + \ln(g^i + g^{-i})$. FOC: $-2/(10-2g^i) + 1/G = 0$, so $G = 5 - g^i$. Then $g^1 + g^2 = 5 - g^1$, and symmetry $g^i = 5/3$, $G_{\text{Nash}} = 10/3 \approx 3.33 < 5$. Free riding undersupplies the public good. (These are illustrative payoffs, not a measurement of any particular public good.)
:::
:::

::: widget riemann
f: 12-x
a: 4
b: 5
n: 6
method: mid
x: 0, 12
y: 0, 14
caption: A slice of [[#ex-pigou]]: the integral of inverse demand $12-Q$ between the efficient $Q^*=4$ and the competitive $Q_c=5$ is part of the surplus calculation. The deadweight-loss triangle is this area minus the extra social cost of those units. Raise $n$ to refine the Riemann sum. The same integral geometry measures consumer surplus in a single market without externalities.
:::

### Market power and missing markets

A monopolist equates $MR$ to $MC$, not $p$ to $MC$, and $Q_m < Q^*$. The missing surplus is the deadweight-loss triangle of [[industrial-organisation/monopoly-pricing]]. Incomplete markets — no insurance against a risk, no Arrow security for a state — mean the FWT's "every commodity has a price" hypothesis fails, and equilibrium can be constrained inefficient (Geanakoplos and Polemarchakis 1986). That is a motive for [[public-economics/social-insurance]] and for the complete-market idealisation of [[asset-pricing]].

::: history
**1906, Vilfredo Pareto.** The *Manuale* defined the efficiency criterion that bears his name, as an ordinal substitute for cardinal utility sums.

**1932 / 1938, Abba Lerner and Harold Hotelling.** The $p = MC$ prescription for efficiency in a single market; Hotelling's 1938 paper related it to consumer surplus.

**1942, Oskar Lange and 1942, Abba Lerner.** The Lange–Lerner debate on whether a planner could implement efficiency by quoting prices — a second-theorem idea, before the theorem.

**1951, Kenneth Arrow** and **1954, Arrow and Debreu; 1959, Debreu.** Arrow's "An extension of the basic theorems of classical welfare economics" (1951) and Debreu's *Theory of Value* gave the modern FWT and SWT. Arrow's *Social Choice and Individual Values* (1951) is the impossibility theorem.

**1954, Paul Samuelson.** *The pure theory of public expenditure* derived [[#eq-samuelson]].

**1960, Ronald Coase.** *The problem of social cost* stated the bargaining result now called the Coase theorem.
:::

## Where this leads

The two theorems are the organising pair of public economics: when they apply, the remaining question is distribution ([[public-economics/redistribution]]); when they fail, the remaining question is the design of a tax, a quantity, a right or a mechanism ([[public-economics/externalities]], [[public-economics/public-goods]], [[market-design]]). Industrial organisation studies the market-power failure; information economics studies the hidden-information failure. This course stops at the theorems and at the two canonical computations — Pigou and Samuelson — that show what "failure" means in numbers.

::: summary
- Pareto efficiency: no feasible Pareto improvement. It is silent on distribution. In an Edgeworth box it is the contract curve, including the corners.
- First welfare theorem: a Walrasian equilibrium is efficient, given local non-satiation. Proof: a dominating allocation would have to cost more than the endowment, but feasibility forbids that.
- Second welfare theorem: every interior efficient allocation is an equilibrium after lump-sum transfers, given convexity. Caveat: lump-sum taxes need information.
- A social welfare function ranks efficient allocations; it is a normative extra. Arrow's theorem limits rank-based social choice.
- Externalities: $p = \mathrm{MPC}$ not $p = \mathrm{MSC}$. A Pigouvian tax $t = \mathrm{MD}(Q^*)$ implements $Q^*$. Public goods: $\sum \mathrm{MRS} = \mathrm{MC}$, the Samuelson condition; Nash private provision undersupplies.
:::

## Exercises

::: exercise A dominated allocation {level=1}
In an $8\times 8$ box with identical Cobb–Douglas preferences, is $x^A = (7, 1)$ Pareto efficient? Explain in one sentence using MRS.
::: solution
No. $\mathrm{MRS}^A = 1/7$, $\mathrm{MRS}^B = 7/1 = 7$ at $B$'s bundle $(1, 7)$. The MRS's differ, so a small trade improves both utilities.
:::
:::

::: exercise Pigou quantity {level=1 check="4"}
In [[#ex-pigou]], what is the efficient output $Q^*$? (Enter the quantity.)
::: solution
$Q^* = 4$.
:::
:::

::: exercise Deadweight loss {level=1 check="1"}
In that example, what is the deadweight loss of the unregulated competitive output? (Enter the area.)
::: solution
The triangle has area $1$.
:::
:::

::: exercise A supporting price {level=2}
Two consumers, $u^A = x_1^{1/2} x_2^{1/2}$, $u^B = y_1^{1/2} y_2^{1/2}$, efficient allocation $x^A = (3, 3)$, rest of $(10, 10)$ to $B$. What relative price supports this allocation? What wealth must $A$ be given?
::: solution
$\mathrm{MRS}^A = 1$ at $(3, 3)$. Set $p_1 = p_2 = 1$. $A$ needs wealth $6$.
:::
:::

::: exercise Pigou incidence {level=2}
In [[#ex-pigou]], after the tax $t = 2$, buyers pay $8$ and sellers receive $6$. Compare with the pre-tax price $7$. Who pays more of the tax, buyers or sellers?
::: solution
Buyers pay $1$ more ($7 \to 8$); sellers receive $1$ less ($7 \to 6$). Incidence is equal, because the linear MB and MPC have slopes of equal magnitude ($1$).
:::
:::

::: exercise Samuelson numbers {level=2 check="5"}
In [[#ex-samuelson]], what is the efficient $G^*$? (Enter $G$.)
::: solution
$G^* = 5$.
:::
:::

::: exercise First theorem, a hole {level=3}
A two-person exchange economy has a Walrasian equilibrium in which $A$ consumes everything and $B$ consumes nothing. $B$ is locally non-satiated. Is the allocation Pareto efficient? Does the conclusion feel like a recommendation? Distinguish the two questions.
::: solution
By [[#thm-fwt]] the allocation is Pareto efficient: any bundle you give $B$ must come from $A$, and $A$ is (weakly) worse off. Local non-satiation of $B$ is used in the proof if one tries to dominate by giving $B$ something $A$ does not miss; but $A$ *does* miss it, because she had it. Efficiency holds. It is not a recommendation: a social welfare function that puts any positive weight on $B$ will prefer a different efficient point, reachable in the model by a lump-sum transfer ([[#thm-swt]]). The theorem answers a consistency question, not a political one.
:::
:::

::: exercise Derive the Samuelson condition {level=3}
Two consumers, $u^i = v^i(x^i, G)$, resource $x^1 + x^2 + c(G) = m$. Write the Lagrangian for $\max v^1 + v^2$ and derive [[#eq-samuelson]].
::: hint
Treat $G, x^1, x^2$ as the three instruments.
:::
::: solution
$\mathcal{L} = v^1(x^1, G) + v^2(x^2, G) + \lambda\bigl(m - x^1 - x^2 - c(G)\bigr)$. FOCs: $v_x^1 = \lambda$, $v_x^2 = \lambda$, $v_G^1 + v_G^2 = \lambda c'(G)$. Dividing, $v_G^1/v_x^1 + v_G^2/v_x^2 = c'(G)$, which is $\mathrm{MRS}^1 + \mathrm{MRS}^2 = \mathrm{MC}_G$.
:::
:::

::: exercise Second theorem and non-convexity {level=3}
A consumer has a non-convex upper contour set (she prefers extremes). An efficient allocation sits in a dent of that set. Why might no linear price support it? Relate to the existence theorem of [[microeconomics/general-equilibrium]].
::: solution
A supporting price is a hyperplane through the allocation with the preferred set on one side. If the preferred set wraps around the allocation (a dent), no straight hyperplane can separate. The second theorem's convexity hypothesis is exactly this separating-hyperplane step. The same non-convexity makes demand jump and can destroy existence of *any* equilibrium, which is why the existence theorem of [[microeconomics/general-equilibrium]] and [[#thm-swt]] share a convexity assumption. A planner not restricted to linear prices could still pick the efficient point.
:::
:::
