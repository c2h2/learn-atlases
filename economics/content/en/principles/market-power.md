A firm that can raise its price without losing all of its customers has **market power**. The baker who takes a price of 4 as given, in the previous chapter, has none. A patented drug, a local water network, a branded coffee shop with a queue of loyal customers, all have some. The polar case is **monopoly**: a single seller of a good with no close substitutes. The monopolist does not have a supply curve. It chooses a point on the demand curve, and the way it does so — equate **marginal revenue** to marginal cost — produces a higher price, a lower quantity, and a deadweight loss relative to $P = \mathrm{MC}$.

This chapter derives that rule, computes the loss in the linear market of earlier chapters, and then looks briefly at price discrimination, oligopoly and monopolistic competition. The aim is a first look, not the whole of [[industrial-organisation]].

## Monopoly

::: definition Market power and monopoly {#def-monopoly}
A firm has **market power** if its residual demand curve slopes down: a rise in its price reduces, but does not wipe out, the quantity it sells. A **monopoly** is a market with a single seller. Barriers to entry — a patent, a legal franchise, increasing returns at the scale of the market (natural monopoly), or control of an essential input — are what keep it a single seller.
:::

Let inverse demand be $P = P(Q)$, with $P'(Q) < 0$. Total revenue is $R(Q) = P(Q)\,Q$, and **marginal revenue** is $R'(Q) = P(Q) + P'(Q)Q$. The second term is negative: to sell one more unit the firm must lower the price on that unit *and* on the units it was already selling (unless it can price-discriminate, below).

For linear inverse demand $P = a - bQ$,

$$
R = aQ - bQ^2, \qquad \mathrm{MR} = a - 2bQ.
$$ {#eq-linear-mr}

MR has the same intercept as demand and twice the slope. It hits zero at the midpoint of the demand curve, which is where $\lvert\varepsilon\rvert = 1$ ([[principles/elasticity#prop-revenue]]).

::: proposition Monopoly pricing {#prop-mr-mc}
A profit-maximising monopolist with differentiable revenue and cost, producing a positive finite output, chooses $Q_m$ so that $\mathrm{MR}(Q_m) = \mathrm{MC}(Q_m)$ and $\mathrm{MR}' < \mathrm{MC}'$ (typically MR decreasing and MC increasing). The price is $P_m = P(Q_m) > \mathrm{MC}(Q_m)$ whenever demand slopes down. The firm never chooses a quantity on the inelastic part of demand if MC $\ge 0$.
:::

::: proof
Profit $\Pi = R(Q) - C(Q)$ has $\Pi' = \mathrm{MR} - \mathrm{MC}$. An interior maximum requires $\mathrm{MR} = \mathrm{MC}$ and $\Pi'' \le 0$. $P - \mathrm{MC} = -P'Q > 0$ when $P' < 0$ and $Q > 0$. If $\lvert\varepsilon\rvert < 1$, then $\mathrm{MR} = P(1 + 1/\varepsilon) < 0$ (using $\varepsilon = (P/Q)(\mathrm{d}Q/\mathrm{d}P) = P/(QP')$). Then $\mathrm{MR} < 0 \le \mathrm{MC}$ cannot hold, so the firm can raise profit by cutting $Q$ (raising $P$) into the elastic region.
:::

The formula $\mathrm{MR} = P(1 + 1/\varepsilon)$ is the **Lerner** relationship: $(P - \mathrm{MC})/P = -1/\varepsilon$. The mark-up is larger the less elastic is demand. A firm facing $\varepsilon = -2$ sets $P = 2\,\mathrm{MC}$; a firm facing $\varepsilon = -5$ sets $P = 1.25\,\mathrm{MC}$. Market power, on this measure, is the inverse of the elasticity of residual demand, not a personality trait of the manager. Residual demand is more elastic when rivals’ goods are closer substitutes, when customers can wait, and when the firm is small relative to the market — which is why the competitive firm of the previous chapter, facing a horizontal residual demand, had an infinite $\lvert\varepsilon\rvert$ and a mark-up of zero.

Take $P = 30 - Q$ and $\mathrm{MC} = 6$ (constant, no fixed cost). Then $\mathrm{MR} = 30 - 2Q$. Set $30 - 2Q = 6$: $Q_m = 12$, $P_m = 18$. Competitive equilibrium would have $30 - Q = 6$, so $Q_c = 24$, $P_c = 6$. The monopolist produces half the competitive quantity in this linear, constant-MC example (a special feature of that geometry, not a general law).

::: widget plot
f: 30-x; 30-2*x; 6
x: 0, 32
y: 0, 32
labels: \text{demand}; \text{MR}; \text{MC}
caption: Linear demand $P = 30 - Q$, MR $30 - 2Q$, constant MC $= 6$. Monopoly is where MR meets MC, at $Q = 12$, then up to demand at $P = 18$. Competition is where demand meets MC, at $Q = 24$, $P = 6$. The gap between 12 and 24 is the units whose value (on demand) exceeds cost (6) and which the monopolist does not produce.
:::

::: example Surplus under monopoly {#ex-surplus-m}
With $P = 30 - Q$ and $\mathrm{MC} = 6$, compute consumer surplus, profit and deadweight loss under monopoly, and compare with competition (where $P = \mathrm{MC} = 6$ and CS $= \tfrac12\times 24\times 24 = 288$, profit 0).
::: solution
Monopoly: CS $= \tfrac12(30-18)\times 12 = 72$. Profit $= (18-6)\times 12 = 144$. Total private surplus $= 216$. Competitive total surplus $= 288$. DWL $= 288 - 216 = 72$, which is the triangle $\tfrac12(18-6)(24-12) = 72$. The monopolist captures 144 of the 216, and 72 of competitive CS is simply destroyed.
:::
:::

::: example A rising MC {#ex-rising-mc}
Demand is still $P = 30 - Q$, but $\mathrm{MC} = 6 + Q$. Find the monopoly quantity and price, and the competitive quantity (where demand meets MC).
::: solution
$\mathrm{MR} = 30 - 2Q = 6 + Q$ gives $24 = 3Q$, $Q_m = 8$, $P_m = 22$. Competitive: $30 - Q = 6 + Q$ gives $Q_c = 12$, $P_c = 18$. The monopolist still under-produces; the gap is 4 rather than 12, because MC is rising and the extra units are more expensive.
:::
:::

::: warning A monopolist does not charge “as much as it wants”
The highest price on the demand curve is the intercept, 30 in the example, at which $Q = 0$ and profit is 0. Charging 18, not 30, is what $\mathrm{MR} = \mathrm{MC}$ prescribes. Market power is the ability to set $P > \mathrm{MC}$, not the ability to pick an arbitrary point. A common related mistake is to draw a supply curve for the monopolist: there is none, because the same MC schedule produces different $Q$ for different demand curves.
:::

## Price discrimination

If the monopolist can charge different prices to different buyers, or for different units, MR is no longer $P + P'Q$ in the same way.

**First-degree** (perfect) discrimination charges each unit at the buyer’s willingness to pay. MR coincides with demand; the firm produces the competitive quantity and captures the whole surplus as profit. Efficiency is restored; distribution is not. **Third-degree** discrimination charges different *groups* different prices (student discounts, international drug prices) according to group elasticities: $P_i(1+1/\varepsilon_i) = \mathrm{MC}$. The group with more elastic demand pays less. **Second-degree** discrimination uses menus — quantity discounts, versions — to screen buyers whose types the firm cannot see. [[information-economics]] and [[industrial-organisation]] treat the mechanism.

Discrimination requires some ability to prevent resale. It can raise or lower total surplus relative to uniform monopoly pricing, depending on whether it opens a market that would otherwise not be served.

::: example Two groups {#ex-third-degree}
A firm can separate two groups. Group A has demand $Q_A = 24 - P$ (so $P = 24 - Q_A$), group B has $Q_B = 24 - 2P$ (so $P = 12 - Q_B/2$). Marginal cost is 4, and resale is impossible. Find the profit-maximising price in each group, using $\mathrm{MR} = \mathrm{MC}$ in each market separately.
::: solution
Group A: $\mathrm{MR}_A = 24 - 2Q_A = 4$, so $Q_A = 10$, $P_A = 14$. Group B: $\mathrm{TR}_B = 12Q_B - Q_B^2/2$, $\mathrm{MR}_B = 12 - Q_B = 4$, so $Q_B = 8$, $P_B = 12 - 4 = 8$. The more elastic group (B: at $P_B = 8$, $Q_B = 8$, $\varepsilon_B = -2\times 8/8 = -2$; group A at $P_A = 14$, $Q_A = 10$, $\varepsilon_A = -14/10 = -1.4$) pays the lower price, as the Lerner rule requires. Combined quantity is 18, against a uniform-price monopoly that would have to pick one $P$ for both.
:::
:::

::: quiz
A uniform-price monopolist faces $P = 30 - Q$ and $\mathrm{MC} = 6$. A first-degree discriminator faces the same demand and cost. Compared with uniform monopoly, first-degree discrimination
- [ ] raises the price to 30 and cuts quantity
- [x] raises quantity to 24 and converts CS into profit
- [ ] leaves quantity at 12 and raises CS
- [ ] produces $Q = 12$ at a price of 6
::: solution
The discriminator produces up to $P = \mathrm{MC}$, so $Q = 24$. Every unit is sold at the buyer’s willingness to pay, so CS $= 0$ and profit $= 288$, the whole competitive surplus. Quantity matches competition; the distribution of surplus does not.
:::
:::

## Oligopoly and monopolistic competition

::: definition Oligopoly and Cournot competition {#def-cournot}
An **oligopoly** is a market with a few firms, each of whose residual demand depends on what the others do. In the **Cournot** model, firms choose quantities simultaneously, the price clears the market, and each firm takes the others’ quantities as given. A **Nash equilibrium** is a list of quantities such that no firm wants to change its own quantity given the others. **Bertrand** competition instead has firms choose prices, with buyers taking the cheaper offer.
:::

**Oligopoly** is the market structure between monopoly and perfect competition. The simplest quantity model is Cournot.

With two identical firms, demand $P = 30 - (q_1+q_2)$, $\mathrm{MC} = 6$, firm 1’s revenue is $(30 - q_1 - q_2)q_1$, so $\mathrm{MR}_1 = 30 - 2q_1 - q_2$. Set equal to 6: $q_1 = (24 - q_2)/2$. Symmetrically $q_2 = (24 - q_1)/2$. The solution is $q_1 = q_2 = 8$, $Q = 16$, $P = 14$. Quantity sits between monopoly (12) and competition (24); price sits between 18 and 6.

::: example A Cournot equilibrium {#ex-cournot}
Confirm that $q_1 = q_2 = 8$ is a Nash equilibrium of the two-firm game above: given $q_2 = 8$, firm 1’s best response is 8, and symmetrically.
::: solution
Firm 1’s best response is $q_1 = (24 - q_2)/2$. At $q_2 = 8$, $q_1 = (24-8)/2 = 8$. Firm 2’s best response to 8 is 8. Neither firm wants to deviate. Profit each is $(14-6)\times 8 = 64$, against monopoly profit 144 split somehow under collusion, or competitive profit 0.
:::
:::

**Bertrand** competition — firms choose prices, and buyers take the cheaper offer — has a harsher logic with homogeneous goods and constant MC: equilibrium is $P = \mathrm{MC}$, as under competition, with two firms. The contrast with Cournot is a warning that “few firms” is not a sufficient statistic for market power; what they choose, and whether the product is homogeneous, matter.

**Monopolistic competition** (Chamberlin, 1933; Robinson, 1933) is many firms, free entry, and differentiated products, so each firm has a downward-sloping demand curve but long-run profit is zero. The tangency of demand with ATC at the chosen $Q$ implies $P = \mathrm{ATC} > \mathrm{MC}$: excess capacity, a mark-up, and no supernormal profit. The welfare economics is ambiguous: variety is valuable, and so is the $P = \mathrm{MC}$ that variety prevents.

::: intuition Why is Cournot “in between”?
Each Cournot firm internalises the effect of its own output on the price, but not the effect of its rival’s. It therefore holds back some output, but not as much as a monopolist, who internalises the effect on *all* units. As the number of Cournot firms grows, each firm’s share shrinks, MR approaches $P$, and the outcome approaches $P = \mathrm{MC}$.
:::

**Natural monopoly** is the case in which a single firm’s ATC is falling throughout the relevant range, typically because a large fixed cost is spread over more units. Two firms would then each produce at a higher ATC than one firm would. Electricity distribution, a municipal water network, and some digital platforms with large setup costs have this shape, at least over a range. Marginal-cost pricing, which efficiency still wants, then fails to cover ATC, so a regulator who insists on $P = \mathrm{MC}$ must also pay a subsidy (or accept two-part tariffs). Average-cost pricing covers cost without a subsidy and still leaves a DWL, smaller than unregulated monopoly’s. The arithmetic is in the exercises. The political economy of the regulator — capture, information, commitment — is a subject of [[public-economics]] and [[industrial-organisation]], not a reason to pretend the cost curves are those of a bakery.

## Evidence

Mark-ups — estimates of $P/\mathrm{MC}$ — have been the subject of a large recent literature. De Loecker, Eeckhout and Unger (2020, *Quarterly Journal of Economics*) estimate that the average mark-up of US listed firms rose from about 1.2 in 1980 to about 1.6 in 2016, with the rise concentrated in the upper tail. Other work, using different data and techniques, finds smaller changes. The estimates are not monopoly prices; they are average wedges, mixing market power, returns to scale and measurement of MC. Interpreting them as “monopoly has increased” is one reading, not a theorem.

Natural experiments on market structure are rarer. Bresnahan and Reiss (1991, *Journal of Political Economy*) studied local retail and professional markets in US towns and found that most of the competitive effect of entry arrived with the second and third firms, with smaller effects thereafter — closer to Bertrand’s message than to a slow Cournot march. Airline routes, cement, and cement-like commodities have their own empirical literatures in [[industrial-organisation]].

Patents, the canonical legal barrier, trade a temporary monopoly for an incentive to invent. How long the patent should last, and whether it should exist for a given class of invention, are questions of industrial policy and of [[public-economics]]; this chapter only records that a patent is a barrier, and that the DWL of the resulting monopoly is part of the cost of the incentive.

::: history
**1838, Antoine Augustin Cournot; 1933, Joan Robinson and Edward Chamberlin.** Cournot’s *Recherches sur les principes mathématiques de la théorie des richesses* solved the quantity-setting duopoly and the monopoly as a special case, with MR (in all but name) equal to MC. Bertrand’s 1883 review replaced quantities with prices. Robinson’s *The Economics of Imperfect Competition* and Chamberlin’s *The Theory of Monopolistic Competition*, both 1933, created the undergraduate vocabulary of market structure: monopoly, oligopoly, monopolistic competition, and the competitive benchmark of the previous chapter.
:::

## Where this leads

[[industrial-organisation]] takes up collusion, entry deterrence, product differentiation, and empirical mark-ups. [[game-theory]] is the language of Cournot, Bertrand and the rest. [[information-economics]] treats screening and versioning. Regulation of natural monopoly — setting $P$ near ATC, or near MC with a subsidy — is in [[public-economics]]. The welfare benchmark remains the $P = \mathrm{MC}$ of [[principles/markets-and-welfare]], with the caveats of [[principles/market-failure]] when MC is not MSC.

This atlas is for education only — not investment or financial advice, and not a recommendation to buy, sell or shun any firm.

::: summary
- Market power means a downward-sloping residual demand curve. A monopolist maximises profit at $\mathrm{MR} = \mathrm{MC}$, which yields $P > \mathrm{MC}$ and $Q < Q_{\mathrm{competitive}}$.
- For linear demand, MR has twice the slope of demand. The Lerner mark-up is $-1/\varepsilon$. A uniform-price monopolist with non-negative MC never operates where demand is inelastic.
- Deadweight loss is the surplus on units that would have been produced under $P = \mathrm{MC}$ and are not. Price discrimination can raise quantity and can transfer CS to the firm.
- Cournot quantity competition sits between monopoly and $P = \mathrm{MC}$. Bertrand price competition with homogeneous goods and constant MC jumps to $P = \mathrm{MC}$ with two firms.
- Monopolistic competition combines a mark-up with free-entry zero profit. Variety has value; so does the missing $P = \mathrm{MC}$ condition.
:::

## Exercises

::: exercise MR of a linear demand {level=1}
Inverse demand is $P = 40 - 2Q$. Write TR and MR. At what $Q$ is MR $= 0$?
::: solution
$\mathrm{TR} = 40Q - 2Q^2$, $\mathrm{MR} = 40 - 4Q$. $\mathrm{MR} = 0$ at $Q = 10$, the midpoint: demand hits $Q = 20$ at $P = 0$.
:::
:::

::: exercise Monopoly output {level=1 check="12"}
Demand $P = 30 - Q$, $\mathrm{MC} = 6$. Find the profit-maximising quantity. (Enter $Q_m$.)
::: solution
$30 - 2Q = 6$ gives $Q_m = 12$. Price is 18, but the number to enter is 12.
:::
:::

::: exercise A mark-up {level=1}
At the monopoly point of the previous exercise, compute $\varepsilon$ and check the Lerner formula $(P-\mathrm{MC})/P = -1/\varepsilon$.
::: solution
$Q = 30 - P$, $\mathrm{d}Q/\mathrm{d}P = -1$, $\varepsilon = -1\times 18/12 = -1.5$. $-1/\varepsilon = 2/3$. $(18-6)/18 = 12/18 = 2/3$. The two sides match.
:::
:::

::: exercise Deadweight loss {level=2}
With $P = 30 - Q$ and $\mathrm{MC} = 6$, compute DWL of monopoly as a triangle. Then recompute it as competitive TS minus (monopoly CS + profit).
::: solution
Triangle: $\tfrac12(18-6)(24-12) = 72$. Competitive TS $= \tfrac12\times 24\times 24 = 288$. Monopoly CS $+ \Pi = 72 + 144 = 216$. Difference 72.
:::
:::

::: exercise Three Cournot firms {level=2}
Demand $P = 30 - Q$, $\mathrm{MC} = 6$, three identical Cournot firms. Firm 1’s MR is $30 - 2q_1 - q_2 - q_3$. Find the symmetric equilibrium $q$ and $P$.
::: solution
$30 - 2q - 2q = 6$ when $q_2 = q_3 = q$, so $30 - 4q = 6$, $q = 6$, $Q = 18$, $P = 12$. Quantity is closer to competition (24) than the duopoly’s 16 was.
:::
:::

::: exercise A tax on a monopolist {level=2}
A specific tax of 6 on the monopolist of [[#ex-surplus-m]] raises MC from 6 to 12. Find the new $Q$ and $P$. How much of the tax is passed through to the buyer price, compared with the competitive pass-through of 100 per cent under constant MC?
::: solution
$30 - 2Q = 12$ gives $Q = 9$, $P = 21$. The buyer price rose from 18 to 21, a pass-through of 3 of the 6, or 50 per cent. Under competitive constant MC the price would have risen from 6 to 12, a pass-through of 100 per cent. Linear monopoly with constant MC passes through half of a specific tax to the buyer.
:::
:::

::: exercise Natural monopoly {level=3}
A water network has $C(Q) = 120 + 4Q$ and demand $P = 40 - Q$. (a) Compute ATC at the efficient quantity $P = \mathrm{MC}$. (b) Show that $P = \mathrm{MC}$ would make the firm a loss-maker. (c) Find the quantity at which $P = \mathrm{ATC}$ (average-cost, or “fair return”, pricing) by solving $40 - Q = 120/Q + 4$.
::: hint
$P = \mathrm{MC} = 4$ gives $Q = 36$. ATC $= 120/Q + 4$.
:::
::: solution
(a) $P = 4 = 40 - Q$ gives $Q = 36$. $\mathrm{ATC}(36) = 120/36 + 4 = 22/3 \approx 7.33 > 4$. (b) Revenue $4\times 36 = 144$, cost $120 + 144 = 264$, loss 120, which is exactly FC. (c) $40 - Q = 120/Q + 4$ gives $36 - Q = 120/Q$, so $36Q - Q^2 = 120$, $Q^2 - 36Q + 120 = 0$. Discriminant $1296 - 480 = 816$, $Q = 18 \pm \sqrt{204}$. The relevant root in $(0, 40)$ is $18 + \sqrt{204} \approx 18 + 14.28 = 32.28$ (the smaller root $18-14.28 = 3.72$ is on the other intersection of the rectangular hyperbola ATC with demand). At that quantity $P = \mathrm{ATC} > \mathrm{MC}$, so there is still a DWL, smaller than monopoly’s, in exchange for covering cost without a subsidy.
:::
:::

::: exercise From Cournot to competition {level=3}
$n$ identical Cournot firms face $P = a - Q$ and constant $\mathrm{MC} = c$, with $a > c$. Show that each firm produces $q = (a-c)/(n+1)$, $Q = n(a-c)/(n+1)$, and $P = (a + nc)/(n+1)$. What are the limits of $Q$ and $P$ as $n \to \infty$?
::: solution
Firm 1: $\mathrm{MR} = a - 2q_1 - (n-1)q = c$ at a symmetric point $q_1 = q$, so $a - 2q - (n-1)q = c$, $a - c = (n+1)q$, $q = (a-c)/(n+1)$. Then $Q = n(a-c)/(n+1)$ and $P = a - Q = \bigl(a + nc\bigr)/(n+1)$. As $n \to \infty$, $Q \to a-c$ and $P \to c$, the competitive point. For $a = 30$, $c = 6$, $n = 1$ recovers monopoly $Q = 12$; $n = 2$ recovers $Q = 16$; $n = 3$ recovers $Q = 18$.
:::
:::
