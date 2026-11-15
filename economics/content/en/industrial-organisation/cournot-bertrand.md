Two firms, not one, sell a homogeneous good. Inverse demand is $p = 12 - Q$ and each firm’s marginal cost is 2. If they jointly maximised profit they would sell the monopoly quantity 5 and split the monopoly profit of 25. If they took the price as given they would sell 10 and earn nothing. What they actually earn depends on the *strategy space*. If each firm chooses a quantity, taking the other firm’s quantity as given, the Nash equilibrium is $q_1 = q_2 = 10/3$, $p = 16/3$, and each earns $100/9 \approx 11.11$. If each firm chooses a price, taking the other firm’s price as given, and buyers purchase only from the cheaper seller, the Nash equilibrium is $p_1 = p_2 = 2$ and each earns nothing. Same costs, same demand, two firms — and the equilibrium mark-up is either 40 per cent of the monopoly mark-up or zero. That is the central lesson of oligopoly theory, and it is older than Nash’s name for it: Cournot (1838) chose quantities; Bertrand (1883) chose prices.

This chapter derives both equilibria, the $N$-firm extensions, the Cournot limit theorem, differentiated-price competition (where the Bertrand paradox disappears), and the Kreps–Scheinkman argument that quantity precommitment can restore Cournot outcomes to a price-setting game. The common method is the Nash equilibrium of [[game-theory/nash-equilibrium]]: a profile of strategies such that each firm’s strategy is a best response to the others.

Profit is $\pi_i$. There is no inflation in this chapter.

## Cournot competition in quantities

::: definition Cournot–Nash game {#def-cournot}
$N$ firms produce a homogeneous good. Inverse demand $p(Q)$ is differentiable and strictly decreasing in total output $Q = \sum_j q_j$. Firm $i$ has a differentiable cost $C_i(q_i)$ and chooses $q_i \ge 0$ simultaneously. Payoff is $\pi_i(q_i, q_{-i}) = p(Q)\, q_i - C_i(q_i)$. A **Cournot–Nash equilibrium** is a Nash equilibrium of this game: a profile $q^* = (q_1^*, \dots, q_N^*)$ such that $q_i^* \in \arg\max_{q_i \ge 0} \pi_i(q_i, q_{-i}^*)$ for every $i$.
:::

::: proposition Cournot first-order conditions {#prop-cournot-foc}
At an interior Cournot–Nash equilibrium,
$$
p(Q) + q_i p'(Q) = C_i'(q_i) \qquad\text{for every } i,
$$ {#eq-cournot-foc}
or equivalently $L_i = s_i / \lvert\varepsilon(Q)\rvert$ as in [[industrial-organisation/market-structure#prop-cournot-hhi]]. With linear inverse demand $p = a - bQ$ and constant marginal costs $c_i < a$, the unique interior equilibrium (when it is non-negative for all $i$) is
$$
q_i = \frac{a - N c_i + \sum_{j \neq i} c_j}{b(N+1)}.
$$ {#eq-cournot-asymmetric}
In the symmetric case $c_i = c$ for all $i$,
$$
q_i = \frac{a-c}{b(N+1)}, \qquad Q = \frac{N(a-c)}{b(N+1)}, \qquad p = \frac{a + N c}{N+1}, \qquad \pi_i = \frac{(a-c)^2}{b(N+1)^2}.
$$ {#eq-cournot-sym}
:::

::: proof
Firm $i$’s profit, writing $Q_{-i} = \sum_{j \neq i} q_j$, is $(a - b(Q_{-i}+q_i))q_i - c_i q_i$ in the linear-constant-cost case. Differentiating in $q_i$ gives $a - b Q_{-i} - 2b q_i - c_i = 0$, so
$$
q_i = \frac{a - c_i}{2b} - \frac{Q_{-i}}{2}.
$$ {#eq-cournot-br}
This is firm $i$’s **best-response (reaction) function**. Summing [[#eq-cournot-foc]] over $i$ in the linear case: $N a - N b Q - b Q - \sum c_i = 0$, hence $Q = (N a - \sum c_i)/(b(N+1))$. Then $q_i$ follows from the best response. Uniqueness of the interior critical point, and the second-order condition $-2b < 0$, give uniqueness of the interior equilibrium. If some $q_i$ so computed is negative, that firm is inactive and the remaining firms play the $(N-1)$-firm game.

The general first-order condition is the same differentiation without linearity: $\partial\pi_i/\partial q_i = p + q_i p' - C_i' = 0$.
:::

The best response [[#eq-cournot-br]] is linear and downward-sloping with slope $-1/2$: quantities are **strategic substitutes** in Bulow, Geanakoplos and Klemperer’s (1985) language. Each firm optimally absorbs half of a rival’s expansion by cutting its own output. The Nash equilibrium is the intersection of the best responses.

::: widget plot
f: (a-c)/(2*b) - x/2; (a-c)/b - 2*x
x: 0, 8
y: 0, 8
sliders: a=12:8:16:0.5; b=1:0.5:2:0.1; c=2:0:5:0.5
labels: \text{firm 1 best response } q_1(q_2); \text{firm 2 best response (inverted)}
caption: Cournot best responses with linear demand $p=a-bQ$ and common cost $c$. Horizontal axis is $q_2$, vertical axis is $q_1$. Firm 1’s best response has slope $-1/2$. Firm 2’s best response $q_2 = (a-c)/(2b) - q_1/2$ is drawn inverted, as $q_1 = (a-c)/b - 2q_2$. Their crossing is the symmetric Cournot point $q_1=q_2=(a-c)/(3b)$. Raise $a$ or cut $c$: the crossing slides out along the $45^\circ$ line. Raise $b$: both intercepts shrink and the equilibrium quantities fall.
:::

::: example Water duopoly, Cournot {#ex-cournot-water}
$p = 12 - Q$, $c_1 = c_2 = 2$. Compute the Cournot–Nash quantities, price, profits, consumer surplus and deadweight loss relative to $p = c$.
::: solution
[[#eq-cournot-sym]] with $N=2$, $a=12$, $b=1$, $c=2$: $q_i = 10/3$, $Q = 20/3$, $p = (12+4)/3 = 16/3$. Each profit is $(16/3-2)\cdot(10/3) = (10/3)^2 = 100/9$. Consumer surplus is $\tfrac12 \cdot (12-16/3) \cdot (20/3) = \tfrac12 \cdot (20/3) \cdot (20/3) = 200/9$. Competitive surplus is $50$, monopoly total surplus was $37.5$, Cournot total surplus is $200/9 + 200/9 = 400/9 \approx 44.44$, and DWL is $50 - 400/9 = 50/9 \approx 5.56$, which is $4/9$ of the monopoly DWL of $12.5$. Output is $20/3 \approx 6.67$, between monopoly $5$ and competition $10$.
:::
:::

::: example Asymmetric costs {#ex-asymmetric}
Keep $p = 12 - Q$, but set $c_1 = 1$ and $c_2 = 3$. Compute both quantities. Which firm is larger, and by how much does the cost gap of 2 translate into an output gap?
::: solution
[[#eq-cournot-asymmetric]] with $N=2$: $q_1 = (12 - 2\cdot 1 + 3)/3 = 13/3$, $q_2 = (12 - 6 + 1)/3 = 7/3$. The output gap is $13/3 - 7/3 = 2$, equal to the cost gap: $q_1 - q_2 = [(a-2c_1+c_2) - (a-2c_2+c_1)]/3 = (c_2 - c_1)$. In a linear Cournot duopoly the output gap equals the cost gap. Price is $12 - 20/3 = 16/3$, the same total output as in the symmetric $c=2$ case because $\sum c_i$ is the same. Cost asymmetry reallocates output toward the efficient firm without changing $Q$ when the *sum* of costs is held fixed.
:::
:::

::: quiz
In a symmetric Cournot market with linear demand, what happens to each firm’s profit as $N$ goes from 1 to $\infty$?
- [ ] It stays at the monopoly profit, split $N$ ways
- [x] It falls as $1/(N+1)^2$ and tends to zero
- [ ] It falls as $1/N$ and tends to a positive constant
- [ ] It rises, because the market grows
::: solution
[[#eq-cournot-sym]] gives $\pi_i = (a-c)^2/(b(N+1)^2)$. At $N=1$ this is monopoly profit $(a-c)^2/(4b)$; as $N\to\infty$ it tends to 0 like $1/N^2$, faster than a split of a fixed pie. The pie itself shrinks toward competitive total profit of zero, and it is split among more firms.
:::
:::

## The Cournot limit theorem

::: proposition Cournot limit theorem {#prop-limit}
Under the assumptions of [[#eq-cournot-sym]] (linear demand, common constant marginal cost $c$), as $N \to \infty$ one has $p \to c$, $Q \to (a-c)/b$, and $L \to 0$. More generally, if inverse demand is smooth, costs are symmetric with $C''(q) \ge 0$, and an interior symmetric Cournot equilibrium exists for every $N$, then $p_N \to C'(0+)$ whenever $N q_N$ stays bounded and residual demand becomes perfectly elastic, in particular whenever $q_N \to 0$. The HHI form $L = \mathrm{HHI}/\lvert\varepsilon\rvert$ of [[industrial-organisation/market-structure#prop-cournot-hhi]] makes the same point: equal-firm $\mathrm{HHI} = 1/N \to 0$.
:::

::: proof
From [[#eq-cournot-sym]], $p - c = (a-c)/(N+1) \to 0$. For the general case, the first-order condition is $p(Nq) + q p'(Nq) = C'(q)$. If $q \to 0$ and $Nq \to Q^* < \infty$, the middle term $q p' \to 0$ and $p(Q^*) = C'(0)$. Existence of $Q^*$ follows from $p(Nq) \ge C'(q) \ge C'(0)$ and $p$ decreasing, so $Nq$ is bounded above by the competitive output.
:::

The theorem is the formal version of the idea that competition among many quantity-setters reproduces the competitive outcome. It is not a theorem about price-setters (they get there already at $N=2$ in the next section), and it assumes the product remains homogeneous and the strategy remains a quantity.

## Bertrand competition in prices

::: definition Bertrand–Nash game, homogeneous product {#def-bertrand}
$N$ firms produce a homogeneous good at constant marginal cost $c_i$, with no capacity constraint. Firms simultaneously name prices $p_i \ge 0$. Demand $D(p)$ (the inverse of $p(Q)$) goes entirely to the firm or firms with the lowest price; if $k$ firms tie at the lowest price, they split demand equally. Profit is $\pi_i = (p_i - c_i) \times$ (quantity sold). A **Bertrand–Nash equilibrium** is a Nash equilibrium of this game.
:::

::: proposition Bertrand paradox {#prop-bertrand}
If $N \ge 2$ and $c_1 = \cdots = c_N = c$, with $D$ continuous, strictly decreasing where positive, and $D(c) > 0$, the unique Nash equilibrium is $p_i = c$ for every $i$. Each firm earns zero economic profit. If instead $c_1 < c_2 \le \cdots \le c_N$ and prices must be named on a fine grid, the low-cost firm sets a price just below $c_2$ (or the monopoly price against $D$, whichever is lower) and serves the whole market.
:::

::: proof
First, no equilibrium can have $\min_i p_i > c$: the lowest-price firm (or any tied firm) could cut its price by a fraction and capture the whole market at a still-positive margin, raising profit. No equilibrium can have $\min_i p_i < c$: that firm earns a loss and would prefer to raise the price above $c$ (or not to sell). So the lowest price is $c$. If some firm charged more than $c$ while another charged $c$, the high-price firm sells nothing and is willing to match $c$; if all charge $c$, no firm can gain by raising (it sells nothing) or by cutting (it sells at a loss). Uniqueness: a profile with two or more prices above $c$ and the rest at $c$ is an equilibrium only if the above-$c$ firms sell nothing, which they do; but any such profile is payoff-equivalent to all charging $c$. The usual statement treats $p_i = c$ for all $i$ as *the* equilibrium.

If $c_1 < c_2$ and the strategy space is continuous, there is a well-known open-set problem (firm 1 wants to charge the highest price strictly below $c_2$, which has no maximum). On a discrete grid with tick $\tau$, firm 1 charges $\min\{p^m, c_2 - \tau\}$ and firm 2 charges $c_2$. That is the economically relevant conclusion: the second-lowest cost sets the ceiling.
:::

The result is a paradox only relative to the intuition that two firms should earn two-firm profits. Relative to the logic of the game it is not paradoxical: with a homogeneous product and unlimited capacity, a price cut of a penny steals the entire market, so the incentive to undercut survives until the margin is zero. The paradox is a warning about the strategy space, not a prediction that duopolies earn zero.

::: warning Bertrand is not “price competition” in general
Calling a market “Bertrand” because firms *quote prices* is a category error. Supermarket shelves quote prices, and mark-ups are not zero. The Bertrand paradox uses three extra ingredients: a homogeneous product, constant unit costs, and unconstrained capacity. Drop any one of them and the zero-profit conclusion typically fails. Differentiated Bertrand (next section) drops homogeneity; Kreps–Scheinkman drop unconstrained capacity; increasing marginal cost drops constant unit cost. Empirical price competition is almost always one of those richer games.
:::

::: example Undercutting arithmetic {#ex-undercut}
Two firms have $c = 2$ and face $D(p) = 12 - p$. Suppose, hypothetically, both charge the Cournot price $16/3$. Compute each firm’s profit at the equal split, and the profit of firm 1 if it charges $16/3 - 0.01$ while firm 2 stays at $16/3$.
::: solution
At $p = 16/3$, $D = 12 - 16/3 = 20/3$, split $10/3$ each, profit $100/9 \approx 11.11$ each, as in [[#ex-cournot-water]]. If firm 1 undercuts by $0.01$, it serves the whole demand at $p = 16/3 - 0.01 \approx 5.323$, quantity $\approx 6.677$, margin $\approx 3.323$, profit $\approx 22.18$, almost double. The deviation is highly profitable, which is why the Cournot *price* is not a Bertrand equilibrium. (The quantity $6.677$ is not a Cournot best response to anything here; the point is the discontinuous jump in demand.)
:::
:::

## Differentiated Bertrand

When products are imperfect substitutes, a small price cut steals only some of the rival’s demand, and a positive mark-up survives.

A linear duopoly demand system that is consistent with quadratic utility is
$$
q_1 = \alpha - \beta p_1 + \gamma p_2, \qquad q_2 = \alpha - \beta p_2 + \gamma p_1,
$$ {#eq-diff-demand}
with $\beta > \gamma > 0$ (own-price effects stronger than cross-price effects) and $\alpha > 0$. Constant marginal cost $c$ is common.

::: proposition Differentiated-Bertrand Nash equilibrium {#prop-diff-bertrand}
In the linear system [[#eq-diff-demand]] with $\beta > \gamma > 0$ and common cost $c$ small enough that quantities are positive, the unique symmetric Nash equilibrium in prices is
$$
p^* = \frac{\alpha + \beta c}{2\beta - \gamma}.
$$ {#eq-diff-p}
The corresponding quantity is $q^* = \alpha - (\beta - \gamma)p^*$. Best responses are upward-sloping: prices are **strategic complements**. As $\gamma \to \beta$ (products become perfect substitutes) and $\alpha$ is rescaled so that demand stays finite, $p^* \to c$. As $\gamma \to 0$ (independent markets), $p^* \to (\alpha/\beta + c)/2$, the monopoly price of each product.
:::

::: proof
Firm 1’s profit is $(p_1 - c)(\alpha - \beta p_1 + \gamma p_2)$. The first-order condition is $\alpha - \beta p_1 + \gamma p_2 - \beta(p_1 - c) = 0$, or
$$
p_1 = \frac{\alpha + \gamma p_2 + \beta c}{2\beta}.
$$ {#eq-diff-br}
The slope in $p_2$ is $\gamma/(2\beta) \in (0, 1/2)$. Symmetry $p_1 = p_2 = p$ gives $2\beta p = \alpha + \gamma p + \beta c$, hence [[#eq-diff-p]]. Second-order condition $-2\beta < 0$. The limit statements are substitution into [[#eq-diff-p]].
:::

::: widget plot
f: (al + g*x + be*c)/(2*be); (2*be*x - al - be*c)/g
x: 0, 10
y: 0, 10
sliders: al=12:6:16:0.5; be=2:1.2:3:0.1; g=1:0.2:1.8:0.1; c=2:0:4:0.5
labels: \text{firm 1 best response } p_1(p_2); \text{firm 2 best response (inverted)}
caption: Differentiated-Bertrand best responses. Horizontal axis $p_2$, vertical $p_1$. Firm 1’s best response slopes up: a higher rival price leads you to raise your own. The inverted firm-2 schedule is $p_1 = (2\beta p_2 - \alpha - \beta c)/\gamma$. Raise the cross-price coefficient $g$: the schedules steepen toward slope $1/2$ and the crossing falls toward $c$. Set $g$ near 0: each firm prices as a monopolist.
:::

::: example Differentiated water {#ex-diff}
Take $q_i = 12 - 2 p_i + p_j$ and $c = 2$. Compute equilibrium prices, quantities and profits.
::: solution
Here $\alpha = 12$, $\beta = 2$, $\gamma = 1$. Then $p^* = (12 + 2\cdot 2)/(4-1) = 16/3$. Quantity $q^* = 12 - 2\cdot(16/3) + 16/3 = 12 - 16/3 = 20/3$. Profit $(16/3-2)\cdot(20/3) = (10/3)\cdot(20/3) = 200/9 \approx 22.22$ each. Best response [[#eq-diff-br]] is $p_1 = (12 + p_2 + 4)/4 = 4 + p_2/4$; at $p_2 = 16/3$, $p_1 = 4 + 4/3 = 16/3$. The mark-up $p^*-c = 10/3$ is the same *number* as Cournot quantity in [[#ex-cournot-water]], but that is a coincidence of these parameters, not an identity of the two games. Demand here is a different object from $p = 12 - Q$.
:::
:::

## Capacity constraints and Kreps–Scheinkman

Edgeworth (1897) observed that if firms have limited capacity, the Bertrand logic stops at the point where the undercutting firm cannot serve the extra demand. Kreps and Scheinkman (1983, *Bell Journal of Economics*) made the observation into a two-stage game: first, firms simultaneously install capacities $\bar q_i$ at a constant unit cost of capacity; second, they name prices, and a specified rationing rule assigns demand to the cheaper firm up to capacity. Under efficient rationing and a concave residual-demand construction, the unique subgame-perfect equilibrium outcome coincides with the Cournot outcome: firms install Cournot capacities and then price so as to sell them.

The theorem is fragile to the rationing rule (Davidson and Deneckere 1986) and to the cost of capacity, but its qualitative message is robust enough to use. When capacity is chosen first and is expensive to add in a hurry — cement, electricity, airline seats on a given day, hotel rooms — the right reduced-form oligopoly is closer to Cournot than to unconstrained Bertrand, even though the visible strategy in the product market is a price. When capacity can be expanded at constant unit cost as fast as orders arrive — a digital good, a licence to print — unconstrained Bertrand is the better reduced form, and with a homogeneous product the paradox is a real prediction of zero margins.

::: intuition Choosing the game
The question “are these firms Cournot or Bertrand?” is not a question about whether they name a price or a quantity in the brochure. It is a question about which variable is the *commitment*. If quantity (capacity, output that must be sold) is sticky and price clears the market, Cournot is the reduced form. If price is sticky and quantity is made to order, Bertrand is the reduced form. Kreps–Scheinkman is the hybrid in which capacity is the commitment and price is the later adjustment.
:::

## Welfare ranking and mergers in Cournot

For linear demand and constant equal costs, the welfare ranking of the three polar outcomes is unambiguous.

::: proposition Linear welfare ranking {#prop-welfare-rank}
With $p = a - bQ$ and common constant $c$, total surplus satisfies
$$
\mathrm{TS}^{\text{competition}} > \mathrm{TS}^{\text{Cournot } N} > \mathrm{TS}^{\text{Cournot } N-1} > \mathrm{TS}^{\text{monopoly}},
$$
and $\mathrm{TS}^{\text{Bertrand}} = \mathrm{TS}^{\text{competition}}$ for $N \ge 2$ under [[#prop-bertrand]]. A merger of two of $N$ symmetric Cournot firms, with no cost synergy, reduces total surplus and raises the price. The merger is equivalent to a reduction of $N$ by one in [[#eq-cournot-sym]].
:::

::: proof
Total surplus is $\int_0^Q (a - b t - c)\,\mathrm{d}t = (a-c)Q - b Q^2/2$, which is strictly increasing in $Q$ on $[0, (a-c)/b]$. The ranking of $Q$ is $Q^c = (a-c)/b > Q_N = N(a-c)/(b(N+1)) > Q_{N-1} > Q^m = (a-c)/(2b)$, hence the surplus ranking. A merger of two symmetric firms that then compete with the remaining $N-2$ as a single entity is the $(N-1)$-firm Cournot game. Price $(a+(N-1)c)/N$ exceeds $(a+Nc)/(N+1)$.
:::

The no-synergy merger result is Salant, Switzer and Reynolds (1983): in linear Cournot, a merger of two firms among $N \ge 3$ *lowers* the merging parties’ joint profit, because the insiders internalise their competition and cut output, and the outsiders expand and free-ride. That “merger paradox” is a reason to look for synergies, product differentiation, or Bertrand competition before treating a horizontal merger as privately profitable. It is used again in [[industrial-organisation/competition-policy]].

::: quiz
Two of three symmetric Cournot firms merge, with no cost change. In the linear model, the merged firm’s profit, compared with the *sum* of the two pre-merger profits, is
- [ ] higher, because concentration rises
- [x] lower: the outsiders free-ride on the insiders’ output contraction
- [ ] unchanged, by the envelope theorem
- [ ] higher if and only if the HHI increment exceeds 200
::: solution
This is the Salant–Switzer–Reynolds merger paradox, a corollary of [[#prop-welfare-rank]] and [[#eq-cournot-sym]]. Pre-merger each of three firms earns $(a-c)^2/(16b)$; two together earn $2(a-c)^2/(16b) = (a-c)^2/(8b)$. Post-merger there are two firms, each earning $(a-c)^2/(9b)$. And $1/9 < 1/8$, so the insiders lose. The HHI screen is a policy threshold, not a profit calculation.
:::
:::

## Where this leads

Product differentiation, the subject of the next chapter, is the leading way out of the Bertrand paradox that does not require capacity constraints: [[#prop-diff-bertrand]] already showed the mechanism, and Hotelling and Salop will give it a spatial foundation. Sequential quantity choice (Stackelberg) and the use of capacity as a barrier occupy [[industrial-organisation/entry-and-deterrence]]. Repeated interaction can sustain prices above the static Nash price of this chapter; that is [[industrial-organisation/collusion]]. Merger control in [[industrial-organisation/competition-policy]] uses both the Cournot merger of [[#prop-welfare-rank]] and differentiated-Bertrand simulation built on [[#eq-diff-demand]].

::: history
**1838, Antoine Augustin Cournot.** *Recherches*, Chapters VII–VIII: the duopoly first-order conditions and the $N$-firm extension, including the observation that the outcome approaches competition as $N$ grows.

**1883, Joseph Bertrand.** Review of Cournot in the *Journal des savants*: if the strategy is a price, two firms suffice for the competitive outcome.

**1897, Francis Ysidro Edgeworth.** *La teoria pura del monopolio*: with capacity constraints the Bertrand argument does not pin down a unique price; the Edgeworth cycle is the ancestor of Kreps–Scheinkman.

**1983, David M. Kreps and José A. Scheinkman.** “Quantity precommitment and Bertrand competition yield Cournot outcomes”, *Bell Journal of Economics* 14(2): the two-stage capacity-then-price game.

**1983, Stephen W. Salant, Sheldon Switzer and Robert J. Reynolds.** “Losses from horizontal merger”, *Quarterly Journal of Economics* 98(2): the merger paradox in linear Cournot.

**1985, Jeremy Bulow, John Geanakoplos and Paul Klemperer.** “Multimarket oligopoly: strategic substitutes and complements”, *Journal of Political Economy* 93(3): the taxonomy used above for quantity versus price best-response slopes.
:::

::: summary
- **Cournot** firms choose quantities. The FOC is $p + q_i p' = C_i'$. With linear demand and equal costs, $q_i = (a-c)/(b(N+1))$, $p = (a+Nc)/(N+1)$. Best responses slope down (strategic substitutes).
- As $N\to\infty$, Cournot prices tend to marginal cost (**limit theorem**). The HHI form $L = \mathrm{HHI}/\lvert\varepsilon\rvert$ is the same statement for equal firms.
- **Bertrand** firms choose prices. With a homogeneous product, constant equal costs and no capacity constraint, $p = c$ for $N \ge 2$ (**Bertrand paradox**). A penny of undercutting steals the market.
- **Differentiated Bertrand** restores a positive mark-up. Best responses slope up (strategic complements). The mark-up shrinks as products become closer substitutes.
- **Kreps–Scheinkman**: capacity chosen first, then prices, can recover Cournot. Choose the game by asking which variable is the commitment.
- A no-synergy merger of two linear Cournot firms among $N \ge 3$ is privately unprofitable (Salant–Switzer–Reynolds) and raises the price.
:::

## Exercises

::: exercise Symmetric Cournot quantity {level=1 check="3"}
Three firms, $p = 12 - Q$, $c = 0$. Compute each firm’s Cournot quantity. (Enter $q_i$.)
::: solution
$q_i = (12-0)/(1\cdot 4) = 3$. Then $Q = 9$, $p = 3$, $\pi_i = 9$. Monopoly would have been $q^m = 6$, $p^m = 6$.
:::
:::

::: exercise Cournot price {level=1 check="4.5"}
Three firms, $p = 12 - Q$, $c = 2$. Compute the Cournot price. (Enter $p$.)
::: solution
$p = (a + N c)/(N+1) = (12 + 3\cdot 2)/4 = 18/4 = 4.5$. Each quantity is $(12-2)/4 = 2.5$, total output $7.5$, and $12-7.5 = 4.5$.
:::
:::

::: exercise Bertrand homogeneous price {level=1 check="2"}
Two firms produce a homogeneous good at constant $c = 2$ with unlimited capacity, inverse demand $p = 12 - Q$. What is the Bertrand–Nash price? (Enter the price.)
::: solution
By [[#prop-bertrand]], $p_1 = p_2 = 2$. Quantity 10 is split in some fashion; profit is zero. The Cournot price of the same market is $16/3$.
:::
:::

::: exercise Best-response evaluation {level=2}
Two Cournot firms, $p = 20 - Q$, $c_1 = 2$, $c_2 = 4$. Write both best-response functions and compute the Nash equilibrium.
::: solution
From [[#eq-cournot-br]], $q_1 = (20-2)/2 - q_2/2 = 9 - q_2/2$ and $q_2 = (20-4)/2 - q_1/2 = 8 - q_1/2$. Substitute: $q_1 = 9 - \tfrac12(8 - q_1/2) = 9 - 4 + q_1/4$, so $\tfrac34 q_1 = 5$, $q_1 = 20/3$. Then $q_2 = 8 - 10/3 = 14/3$. Check [[#eq-cournot-asymmetric]]: $q_1 = (20 - 2\cdot 2 + 4)/3 = 20/3$, $q_2 = (20 - 8 + 2)/3 = 14/3$. Price $p = 20 - 34/3 = 26/3$.
:::
:::

::: exercise Differentiated Bertrand price {level=2 check="6"}
Demand is $q_i = 12 - 2p_i + p_j$ and $c = 3$. Compute the symmetric Bertrand–Nash price. (Enter $p^*$.)
::: solution
[[#eq-diff-p]] with $\alpha = 12$, $\beta = 2$, $\gamma = 1$, $c = 3$: $p^* = (12 + 2\cdot 3)/(4-1) = 18/3 = 6$. Quantity $q^* = 12 - 2\cdot 6 + 6 = 6$. Profit $(6-3)\cdot 6 = 18$ each. The best response is $p_1 = (12 + p_2 + 6)/4 = 4.5 + p_2/4$; at $p_2 = 6$ this returns 6.
:::
:::

::: exercise Merger paradox arithmetic {level=2}
Three symmetric Cournot firms, $p = a - bQ$, cost $c$. Compute the joint pre-merger profit of two of them and the post-merger profit of the merged firm (now competing as one of two). Confirm the insiders lose, and compute the outsiders’ gain.
::: solution
From [[#eq-cournot-sym]], $\pi(N) = (a-c)^2/(b(N+1)^2)$. Two insiders pre-merger: $2\pi(3) = 2(a-c)^2/(16b) = (a-c)^2/(8b)$. Post-merger the merged firm earns $\pi(2) = (a-c)^2/(9b)$. Since $1/9 < 1/8$, they lose $(a-c)^2/(72b)$. The remaining outsider had $\pi(3) = (a-c)^2/(16b)$ and now has $\pi(2) = (a-c)^2/(9b)$, a gain of $(a-c)^2 b^{-1}(1/9-1/16) = (7/144)(a-c)^2/b$. The outsider’s gain exceeds the insiders’ loss; total profit of the industry rises as $N$ falls, but the insiders do not capture the rise.
:::
:::

::: exercise Limit theorem rate {level=3}
For linear Cournot with equal costs, write $p_N - c$ as a function of $N$. How large must $N$ be to bring the mark-up down to one tenth of the monopoly mark-up? Compare with the $N$ that brings the HHI down to $500$ on the 0–10,000 scale (equal firms).
::: hint
Monopoly mark-up is $(a-c)/2$. Equal-firm HHI $= 10{,}000/N$.
:::
::: solution
$p_N - c = (a-c)/(N+1)$ and $p^m - c = (a-c)/2$, so we need $1/(N+1) \le (1/10)\cdot(1/2) = 1/20$, hence $N+1 \ge 20$, $N \ge 19$. Equal-firm HHI $= 10{,}000/N = 500$ at $N = 20$. The two numbers are close because $L = \mathrm{HHI}/\lvert\varepsilon\rvert$ and, at the Cournot point, $\lvert\varepsilon\rvert = p/(bQ) = \bigl((a+Nc)/(N+1)\bigr) \big/ \bigl(N(a-c)/(N+1)\bigr) = (a+Nc)/(N(a-c))$, which tends to $c/(a-c)$ only as $N\to\infty$ if $c>0$; near the competitive point the elasticity is large, so a small HHI is needed for a small $L$. The calculation $N \approx 20$ is the linear-demand, equal-cost illustration of [[#prop-limit]], not a policy threshold.
:::
:::

::: exercise From prices to quantities {level=3}
A differentiated Bertrand duopoly has $q_i = 24 - 3p_i + p_j$ and $c = 4$. (a) Compute $p^*$ and $q^*$. (b) Invert the demand system to obtain inverse demands $p_i(q_i, q_j)$. (c) Compute the Cournot–Nash equilibrium of the quantity game with those inverse demands and the same $c$. (d) Compare prices. Why is the Cournot price higher?
::: hint
Adding the two demand equations gives $q_1+q_2 = 48 - 2(p_1+p_2)$, and subtracting gives $q_1-q_2 = -4(p_1-p_2) + 2(p_1-p_2)$ wait — subtract carefully: $q_1-q_2 = -3(p_1-p_2) - (p_1-p_2)$ no. $q_1 - q_2 = -3p_1 + p_2 + 3p_2 - p_1 = -4p_1 + 4p_2 = -4(p_1-p_2)$. So $p_1 - p_2 = -(q_1-q_2)/4$. Together with the sum, you can solve for each $p_i$.
:::
::: solution
(a) $\alpha=24$, $\beta=3$, $\gamma=1$, $c=4$. $p^* = (24 + 3\cdot 4)/(6-1) = 36/5 = 7.2$. $q^* = 24 - 3\cdot 7.2 + 7.2 = 24 - 14.4 = 9.6$.

(b) Sum: $Q = 48 - 2(p_1+p_2)$, so $p_1+p_2 = 24 - Q/2$. Difference: $q_1-q_2 = -3p_1 + p_2 + 3p_2 - p_1 = -4p_1 + 4p_2 = -4(p_1-p_2)$, hence $p_1-p_2 = -(q_1-q_2)/4$. Then
$$
p_1 = \tfrac12 \Bigl(24 - \tfrac{Q}{2} - \tfrac{q_1-q_2}{4}\Bigr) = 12 - \tfrac{q_1+q_2}{4} - \tfrac{q_1-q_2}{8} = 12 - \tfrac{3}{8} q_1 - \tfrac{1}{8} q_2.
$$
Similarly $p_2 = 12 - \tfrac18 q_1 - \tfrac38 q_2$.

(c) Firm 1 maximises $(12 - \tfrac38 q_1 - \tfrac18 q_2 - 4)q_1 = (8 - \tfrac38 q_1 - \tfrac18 q_2)q_1$. FOC: $8 - \tfrac34 q_1 - \tfrac18 q_2 = 0$, so $6q_1 + q_2 = 64$. By symmetry $q_1=q_2$, hence $7q_1 = 64$, $q_i = 64/7 \approx 9.143$, $Q = 128/7$, $p_i = 12 - (3/8+1/8)(64/7) = 12 - (32/7) = (84-32)/7 = 52/7 \approx 7.429$.

(d) Cournot price $52/7 \approx 7.43$ exceeds Bertrand price $7.2$. Quantity competition is softer here because a quantity increase is a commitment to sell that amount even after seeing that it will depress the price; price competition lets each firm respond to a rival’s cut by cutting too, which makes the contemplated cut less attractive. Strategic substitutes versus strategic complements, in the language of [[#prop-cournot-foc]] and [[#prop-diff-bertrand]], is the same comparison.
:::
:::
