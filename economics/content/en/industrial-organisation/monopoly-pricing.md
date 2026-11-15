A single firm supplies a city’s water. Households’ weekly inverse demand is $p = 12 - q$, and the firm’s marginal cost is a constant 2. If the firm charged the competitive price, it would sell 10 units at $p = 2$ and earn no economic profit. It will not do that. It will choose a quantity at which **marginal revenue equals marginal cost**, sell 5 units at a price of 7, and earn a profit of 25. Buyers lose more surplus than the firm gains; the difference is a deadweight loss of 12.5. Those four numbers — quantity, price, profit, deadweight loss — are the uniform-price monopoly problem. This chapter derives them in general, then asks how the same firm can extract more of the buyers’ willingness to pay by charging different prices to different people, different prices for different quantities, or a single price for a bundle.

The uniform-price analysis is the benchmark for the rest of industrial organisation. Cournot oligopolists in the next chapter are firms that internalise only part of the revenue effect a monopolist internalises fully. A two-part tariff later in this chapter is a monopolist who has found a way to charge the competitive *marginal* price without giving the surplus away. Merger simulation in [[industrial-organisation/competition-policy]] is a comparison of two oligopoly equilibria, each of which is understood by contrast with this monopoly benchmark.

Throughout, profit is denoted $\pi$. There is no inflation in this chapter.

## The uniform-price monopolist

::: definition Uniform-price monopoly {#def-monopoly}
A **uniform-price monopolist** is the sole seller of a product, facing a market inverse demand $p(q)$ that is differentiable and strictly decreasing on $q > 0$, and a cost function $C(q)$ that is differentiable, with $C(0) \ge 0$ and $C'(q) \ge 0$. The firm chooses a single price (equivalently, a single quantity) to maximise
$$
\pi(q) = p(q)\, q - C(q).
$$
Buyers are price takers. There is no price discrimination, no two-part tariff, and no other product.
:::

The assumption that the firm is the sole seller already embeds a relevant-market judgement from [[industrial-organisation/market-structure]]. The assumption of a single price is what this section maintains and the rest of the chapter relaxes.

::: proposition Marginal revenue equals marginal cost {#prop-mr-mc}
At an interior uniform-price monopoly optimum $q^m > 0$,
$$
\mathrm{MR}(q^m) = C'(q^m), \qquad \mathrm{MR}(q) := p(q) + q p'(q).
$$ {#eq-mr-mc}
If $p(q)$ is linear, $p(q) = a - b q$ with $a > 0$, $b > 0$, and marginal cost is a constant $c$ with $0 \le c < a$, then
$$
q^m = \frac{a-c}{2b}, \qquad p^m = \frac{a+c}{2}, \qquad \pi^m = \frac{(a-c)^2}{4b}.
$$ {#eq-linear-monopoly}
The same first-order condition can be written as the Lerner rule of [[industrial-organisation/market-structure#prop-lerner]]: $(p^m - C'(q^m))/p^m = 1/\lvert\varepsilon(q^m)\rvert$.
:::

::: proof
Differentiating $\pi(q)$ gives $\pi'(q) = p(q) + q p'(q) - C'(q)$. Setting $\pi'(q) = 0$ is [[#eq-mr-mc]]. The second derivative is $\pi''(q) = 2p'(q) + q p''(q) - C''(q)$; for linear demand and constant marginal cost this is $-2b < 0$, so the critical point is a maximum. Solving $a - 2bq = c$ yields $q^m = (a-c)/(2b)$ and $p^m = a - b(a-c)/(2b) = (a+c)/2$. Profit is $(p^m - c)q^m = ((a-c)/2) \cdot (a-c)/(2b) = (a-c)^2/(4b)$. The boundary $q = 0$ is worse whenever $a > c$, because $\pi'(0) = a - c > 0$.
:::

Marginal revenue lies below inverse demand whenever $q > 0$ and $p' < 0$: the firm’s extra unit sells at $p(q)$, but it also lowers the price received on every unit already being sold. For linear demand the MR curve has the same intercept as inverse demand and twice the slope, so it bisects the horizontal distance from the intercept to $p(q)$. That geometry is why $q^m$ is half the competitive quantity when $C'$ is constant.

::: widget plot
f: a - b*x; a - 2*b*x; c + 0*x
x: 0, 14
y: 0, 16
sliders: a=12:8:16:0.5; b=1:0.5:2:0.1; c=2:0:6:0.5
labels: \text{inverse demand } p=a-bq; \text{marginal revenue } a-2bq; \text{marginal cost } c
caption: Linear inverse demand, the associated marginal-revenue line, and constant marginal cost. The crossing of MR and MC is the monopoly quantity; read the price off inverse demand, not off MR. Raise $a$: both $q^m$ and $p^m$ rise. Raise $b$: demand steepens, $q^m$ falls, $p^m$ is unchanged (with linear demand and constant $c$, $p^m = (a+c)/2$ does not depend on $b$). Raise $c$: $q^m$ falls and $p^m$ rises, one-for-one in half.
:::

::: example The water monopolist {#ex-water}
Take $p = 12 - q$ and $c = 2$. Compute $q^m$, $p^m$, $\pi^m$, consumer surplus, and the competitive benchmark $(q^c, p^c)$ with $p = c$.
::: solution
[[#eq-linear-monopoly]] with $a = 12$, $b = 1$, $c = 2$ gives $q^m = 5$, $p^m = 7$, $\pi^m = 25$. Consumer surplus under monopoly is the triangle above 7 and below the demand curve: $\tfrac12 \times 5 \times 5 = 12.5$. The competitive benchmark is $p^c = 2$, $q^c = 10$, consumer surplus $\tfrac12 \times 10 \times 10 = 50$, profit 0. Buyers lose $50 - 12.5 = 37.5$ of surplus; the firm gains 25; the difference 12.5 is the deadweight loss computed in [[#prop-dwl]] below.
:::
:::

::: warning Price is read off demand, not off MR
A common mechanical error is to report the vertical coordinate of the MR–MC crossing as the monopoly *price*. That coordinate is marginal revenue, which equals marginal cost; the price is the point on *inverse demand* at the same quantity. In [[#ex-water]] the crossing is at $(q, \mathrm{MR}) = (5, 2)$; the price is 7. On the figure, always go up from $q^m$ to the demand curve.
:::

## Deadweight loss

::: proposition Monopoly deadweight loss {#prop-dwl}
Assume inverse demand $p(q)$ is strictly decreasing, $C'(q)$ is non-decreasing, and both are continuous. Let $q^c > 0$ be the competitive (efficient) output defined by $p(q^c) = C'(q^c)$, and let $q^m \in (0, q^c)$ be the uniform-price monopoly output. The **deadweight loss** of monopoly is
$$
\mathrm{DWL} = \int_{q^m}^{q^c} \bigl( p(q) - C'(q) \bigr)\, \mathrm{d}q.
$$ {#eq-dwl}
With linear demand $p = a - bq$ and constant $c$, this equals $(a-c)^2/(8b)$, which is half of monopoly profit. Total surplus (consumer surplus plus profit) falls short of the competitive total surplus $ \int_0^{q^c} (p(q) - C'(q))\,\mathrm{d}q $ by exactly the DWL; the monopolist’s profit is a transfer, not a further social loss, under these assumptions.
:::

::: proof
An extra unit $q \in (q^m, q^c)$ is valued by the marginal buyer at $p(q)$ and costs $C'(q)$ to produce. The difference is a surplus that is realised under competition and not under monopoly. Integrating gives [[#eq-dwl]]. For the linear case, $q^c = (a-c)/b$, $q^m = (a-c)/(2b)$, $p^m - c = (a-c)/2$, and the integrand is linear, so the integral is a triangle of base $(a-c)/(2b)$ and height $(a-c)/2$, area $(a-c)^2/(8b)$. Monopoly profit is $(a-c)^2/(4b)$, twice that area. Competitive total surplus is the triangle $\tfrac12 (a-c)(a-c)/b = (a-c)^2/(2b)$; monopoly total surplus is profit plus consumer surplus $\tfrac12 (p(0)-p^m)q^m = (a-c)^2/(8b)$, summing to $3(a-c)^2/(8b)$, and the gap is $(a-c)^2/(8b)$.
:::

Two comments on what [[#eq-dwl]] does *not* include. It does not subtract the monopolist’s profit: that profit is a transfer from buyers to the firm. It does not include rent-seeking costs (Posner 1975 argued that the profit itself might be dissipated in the contest for the franchise) nor X-inefficiency (Leibenstein 1966). Those are additional hypotheses, not part of the Marshallian surplus calculation. It also assumes that the competitive point is feasible, which it may not be if the cost function has a large fixed cost; a natural monopoly with declining average cost cannot cover cost at $p = C'$, and the second-best price is a different problem (average-cost pricing, two-part tariffs, or Ramsey prices in a regulated multi-product firm).

::: example Deadweight loss on the water market {#ex-dwl}
For $p = 12 - q$ and $c = 2$, compute DWL from [[#eq-dwl]] and from the linear formula. What happens to DWL if a per-unit tax of 2 is levied on the monopolist, with the proceeds returned lump-sum to buyers?
::: solution
The linear formula gives $(10)^2/(8\cdot 1) = 12.5$. Directly: $q^m = 5$, $q^c = 10$, integrand $12 - q - 2 = 10 - q$, $\int_5^{10}(10-q)\,\mathrm{d}q = [10q - q^2/2]_5^{10} = (100-50) - (50-12.5) = 12.5$.

A per-unit tax of 2 raises the firm’s marginal cost to 4. Then $q^{m'} = (12-4)/2 = 4$, $p^{m'} = 8$, and DWL relative to the *original* competitive output of 10 is $\int_4^{10}(10-q)\,\mathrm{d}q = [10q-q^2/2]_4^{10} = 50 - (40-8) = 18$. The tax, returned lump-sum, does not itself destroy the 2 per unit on units still produced; it destroys surplus by shrinking output further. (The comparison is pedagogical: it is not a recommendation of any tax.)
:::
:::

::: quiz
With linear inverse demand and constant marginal cost, monopoly quantity is half of competitive quantity. Which statement follows?
- [ ] Monopoly price is twice marginal cost
- [x] Deadweight loss is half of monopoly profit
- [ ] Consumer surplus under monopoly is half of competitive consumer surplus
- [ ] The Lerner index is $1/2$
::: solution
[[#prop-dwl]] gives $\mathrm{DWL} = (a-c)^2/(8b) = \tfrac12 \pi^m$. Monopoly price is $(a+c)/2$, which is twice $c$ only if $a = 3c$. Competitive CS is $(a-c)^2/(2b)$; monopoly CS is $(a-c)^2/(8b)$, one *quarter* of competitive CS, not one half. The Lerner index is $(a-c)/(a+c)$, which equals $1/2$ only if $a = 3c$.
:::
:::

## First-degree (perfect) price discrimination

A uniform price leaves surplus on the table: buyers who value the good above $c$ but below $p^m$ do not buy, and buyers who value it above $p^m$ keep a rent. If the monopolist can charge each buyer her willingness to pay, both of those leaks close.

::: definition Degrees of price discrimination {#def-pd}
Following Pigou’s *The Economics of Welfare* (1920): **first-degree** (perfect) price discrimination charges each unit at the buyer’s willingness to pay; **second-degree** discrimination offers a menu of quantity-or-quality packages and lets buyers self-select; **third-degree** discrimination charges different uniform prices to identifiable groups with different demands. All three require that arbitrage among buyers be limited. First-degree discrimination also requires that the firm observe (or infer) each buyer’s willingness to pay.
:::

::: proposition Efficient output under first-degree discrimination {#prop-first-degree}
A monopolist who can charge each infinitesimal unit at the inverse-demand value $p(q)$, and who has cost $C(q)$, maximises profit by producing the competitive output $q^c$ defined by $p(q^c) = C'(q^c)$. Profit equals the entire total surplus $\int_0^{q^c}(p(q)-C'(q))\,\mathrm{d}q$; consumer surplus is zero. Assumptions: the firm can prevent resale; inverse demand is the true marginal-willingness-to-pay curve; there are no income effects (quasi-linear utility).
:::

::: proof
The firm’s revenue from producing $q$ is $\int_0^q p(t)\,\mathrm{d}t$, so $\pi(q) = \int_0^q p(t)\,\mathrm{d}t - C(q)$ and $\pi'(q) = p(q) - C'(q)$. The unique interior critical point is $q^c$. Profit at $q^c$ is the area between inverse demand and marginal cost, which is total surplus.
:::

First-degree discrimination is efficient in the surplus sense and distributionally extreme. It is also informationally demanding. A two-part tariff with a uniform per-unit price, treated next, implements the same allocation when all buyers are identical, without requiring the firm to know each unit’s value separately.

::: example Perfect discrimination on the water market {#ex-first}
With $p = 12 - q$ and $c = 2$, compute the first-degree-discriminating monopolist’s output and profit, and compare with [[#ex-water]].
::: solution
$q^c = 10$. Profit is the triangle $\tfrac12 \times 10 \times 10 = 50$. Output doubles relative to uniform monopoly; profit doubles relative to $\pi^m = 25$; buyers are left with nothing rather than 12.5. Total surplus rises from 37.5 to 50, matching the DWL calculation.
:::
:::

## Two-part tariffs and second-degree discrimination

A **two-part tariff** charges a fixed fee $F$ plus a per-unit price $w$. Amusement parks, telephone plans, and many wholesale contracts are of this form. If buyers are identical, the optimal two-part tariff is simple.

::: proposition Optimal two-part tariff with identical buyers {#prop-two-part}
Suppose $n$ identical buyers each have quasi-linear demand with inverse demand $p(q)$ for an individual quantity $q$, and the monopolist has constant marginal cost $c$. The profit-maximising two-part tariff sets $w = c$ and charges a fixed fee $F$ equal to each buyer’s consumer surplus at that price. Each buyer consumes the efficient quantity; the firm extracts the whole surplus. If instead $w$ were set above $c$, the firm could raise profit by lowering $w$ toward $c$ and raising $F$ to capture the extra surplus.
:::

::: proof
At per-unit price $w$, each buyer chooses $q(w)$ with $p(q(w)) = w$ and enjoys consumer surplus $\mathrm{CS}(w) = \int_w^{p(0)} q(t)\,\mathrm{d}t$. Participation requires $F \le \mathrm{CS}(w)$. The firm sets $F = \mathrm{CS}(w)$ and earns $\pi = n\bigl(\mathrm{CS}(w) + (w-c)q(w)\bigr)$, which is $n$ times total surplus at output $q(w)$. Total surplus is maximised at $w = c$. Hence $w = c$ and $F = \mathrm{CS}(c)$.
:::

When buyers are not identical, a single two-part tariff can no longer extract everything, and the firm faces a screening problem. That is second-degree discrimination: the firm offers a *menu*, and high-demand buyers must be given a rent, otherwise they would pick the low-demand package.

A workhorse screening model uses two types. Buyer $\theta$ has utility $\theta q - q^2/2 - T$ from quantity $q$ at outlay $T$. Types $\theta_L < \theta_H$ have known frequencies $n_L, n_H$. Marginal cost is zero. The efficient quantities are $q = \theta$. The firm offers $(q_L, T_L)$ and $(q_H, T_H)$ subject to incentive compatibility and participation.

::: proposition No distortion at the top, downward distortion at the bottom {#prop-screening}
In the two-type model just stated, with quasi-linear quadratic utility, zero marginal cost, and both types served, the profit-maximising menu satisfies $q_H = \theta_H$ (efficient quantity for the high type) and
$$
q_L = \theta_L - \frac{n_H}{n_L}(\theta_H - \theta_L)
$$
if this is positive, and $q_L = 0$ otherwise. The low type’s participation constraint and the high type’s incentive-compatibility constraint bind; the high type earns an information rent $\theta_H q_L - q_L^2/2 - T_L > 0$ whenever $q_L > 0$.
:::

::: proof
Let $u(q,\theta) = \theta q - q^2/2$. Participation of $L$ is $u(q_L,\theta_L) \ge T_L$; IC of $H$ is $u(q_H,\theta_H) - T_H \ge u(q_L,\theta_H) - T_L$. At an optimum these two bind (standard: the firm wants $T$ as large as possible, and $H$’s participation is implied by $L$’s participation plus IC because $H$ likes quantity more). Then $T_L = u(q_L,\theta_L)$ and $T_H = u(q_H,\theta_H) - \bigl(u(q_L,\theta_H) - u(q_L,\theta_L)\bigr)$. Profit is
$$
n_L T_L + n_H T_H = n_L u(q_L,\theta_L) + n_H u(q_H,\theta_H) - n_H \bigl(u(q_L,\theta_H) - u(q_L,\theta_L)\bigr).
$$
The derivative in $q_H$ is $n_H(\theta_H - q_H)$, so $q_H = \theta_H$. The derivative in $q_L$ is $n_L(\theta_L - q_L) - n_H(\theta_H - \theta_L)$, so $q_L = \theta_L - (n_H/n_L)(\theta_H - \theta_L)$ when positive. The rent of $H$ is $u(q_L,\theta_H) - u(q_L,\theta_L) = (\theta_H - \theta_L)q_L$.
:::

The low type is distorted down so as to make the low package less tempting to the high type, which lets the firm extract more from $H$. The high type is undistorted because there is no higher type to protect against. This “no distortion at the top” logic reappears in regulation, in optimal income tax theory, and in the version of second-degree discrimination that uses quality rather than quantity.

::: example A two-type menu {#ex-menu}
Let $\theta_L = 2$, $\theta_H = 3$, $n_L = n_H = 1$, marginal cost zero. Compute $q_L$, $q_H$, $T_L$, $T_H$ and profits. Compare with the profit from selling only to $H$ at the efficient package, and with a uniform two-part tariff that serves both types at $w = 0$ with $F$ set to the low type’s surplus.
::: solution
$q_H = 3$, $q_L = 2 - (3-2) = 1$. Then $T_L = 2\cdot 1 - 1^2/2 = 1.5$. The high type’s rent is $(3-2)\cdot 1 = 1$, and $T_H = (3\cdot 3 - 9/2) - 1 = (9-4.5)-1 = 3.5$. Profit is $1.5 + 3.5 = 5$.

Selling only to $H$: $q_H = 3$, $T_H = 4.5$, profit $4.5$, and $L$ is excluded. Worse than 5.

A uniform two-part tariff at $w = 0$ serving both: each type takes $q = \theta$, $F$ cannot exceed the low type’s surplus $2^2/2 = 2$, profit $2F = 4$ plus zero usage margin. Worse than 5. The menu beats both the exclusion policy and the pooling two-part tariff.
:::
:::

## Third-degree discrimination and uniform pricing across markets

When the firm can identify groups — students and adults, domestic and export, peak and off-peak — but must charge a uniform price *within* each group, it faces a separate Lerner rule in each market.

::: proposition Third-degree inverse-elasticity rule {#prop-third}
A monopolist selling to $M$ segments with inverse demands $p_m(q_m)$, preventable arbitrage, and common marginal cost $C'(Q)$ at total output $Q = \sum q_m$, chooses interior quantities satisfying
$$
\mathrm{MR}_m(q_m) = C'(Q) \qquad\text{for every } m,
$$
or equivalently
$$
\frac{p_m - C'(Q)}{p_m} = \frac{1}{\lvert\varepsilon_m\rvert}.
$$
The segment with the less elastic demand pays the higher price. If discrimination is banned and the firm must charge a single $p$ in all segments, the common price satisfies a share-weighted elasticity rule, and the welfare comparison with discrimination is ambiguous in general (Schmalensee 1981; Varian 1985): discrimination raises total output if and only if it raises welfare, when marginal cost is constant, *provided* that all markets remain served under both regimes; opening a market that would not be served under uniform pricing is a separate, typically positive, welfare effect.
:::

::: proof
Profit $\sum_m p_m(q_m) q_m - C(\sum q_m)$ has derivative $p_m + q_m p_m' - C'(Q)$ in each $q_m$. Setting each to zero is $\mathrm{MR}_m = C'(Q)$, which rewrites as the Lerner rule by the same algebra as [[#prop-mr-mc]]. If $\lvert\varepsilon_1\rvert < \lvert\varepsilon_2\rvert$ then $L_1 > L_2$, hence $p_1 > p_2$ at the same $C'$. The welfare claims are not proved here: Schmalensee (1981, *American Economic Review*) shows that with constant marginal cost a necessary condition for welfare to rise is that total output rise; Varian (1985, *American Economic Review*) gives upper and lower bounds on the welfare change in terms of the output change.
:::

::: example Two linear markets {#ex-third}
Market 1 has $p_1 = 12 - q_1$; market 2 has $p_2 = 8 - q_2$; $c = 2$ is constant. Compute the discriminating prices and quantities and the profit. Then compute the uniform-price optimum (the firm must charge the same $p$ in both markets) and its profit.
::: solution
Discrimination: $\mathrm{MR}_1 = 12 - 2q_1 = 2$ gives $q_1 = 5$, $p_1 = 7$. $\mathrm{MR}_2 = 8 - 2q_2 = 2$ gives $q_2 = 3$, $p_2 = 5$. Profit $(7-2)\cdot 5 + (5-2)\cdot 3 = 25 + 9 = 34$.

Uniform price. For $p > 8$ only market 1 is active, and the monopoly price there is 7, which is below 8, so the optimum is in the both-markets region. Inverse demand is $p = 10 - Q/2$ for $Q = q_1 + q_2 \ge 4$ (equivalently $p \le 8$). Then $\mathrm{MR} = 10 - Q = 2$, so $Q = 8$, $p = 6$. Quantities $q_1 = 12-6 = 6$, $q_2 = 8-6 = 2$. Profit $(6-2)\cdot 8 = 32$. Discrimination raises profit by 2. Total output is 8 either way, so the Schmalensee necessary condition for a welfare gain is not met with slack; a full surplus comparison (left as an exercise) shows a small welfare *loss* from discrimination here, because output does not rise and the wrong buyers are served at the margin.
:::
:::

::: quiz
A monopolist sells in two separable markets and discriminates. Market A has $\lvert\varepsilon_A\rvert = 1.5$ and market B has $\lvert\varepsilon_B\rvert = 4$ at the optimum, with the same constant marginal cost. Which market has the higher price?
- [x] Market A
- [ ] Market B
- [ ] They have the same price, because marginal cost is the same
- [ ] There is not enough information
::: solution
[[#prop-third]] says $L = 1/\lvert\varepsilon\rvert$, so $L_A = 2/3 > L_B = 1/4$. The same $c$ and a larger Lerner index mean a higher price in A. Equal marginal cost equalises *marginal revenues*, not prices.
:::
:::

## Bundling

A firm that sells two products can charge for them separately, offer them only as a bundle (pure bundling), or offer both the bundle and the stand-alone goods (mixed bundling). Bundling is a form of discrimination that works off the *distribution* of willingness to pay, not off observable groups.

Adams and Yellen (1976) gave the geometry; McAfee, McMillan and Whinston (1989) gave a sufficient condition for mixed bundling to beat separate selling. A transparent special case is enough here.

Suppose two goods have zero marginal cost. A buyer’s values $(v_1, v_2)$ are independent and each uniform on $[0,1]$. Under separate selling the optimal price of each good is $1/2$, demand for each is $1/2$, and profit per buyer is $1/4 + 1/4 = 1/2$. Under pure bundling the buyer purchases if $v_1 + v_2 \ge p_b$. The sum of two independent uniforms on $[0,1]$ has a triangular density. For $p_b \in [0,1]$ the purchase probability is $1 - p_b^2/2$, and revenue $p_b(1 - p_b^2/2)$ is maximised at $p_b = \sqrt{2/3} \approx 0.816$, with profit $\sqrt{2/3}\,(1-1/3) \approx 0.544 > 1/2$. Pure bundling beats separate selling in this independent-uniform example because it reduces the dispersion of willingness to pay: people who like good 1 and not good 2 are averaged with the reverse type.

The comparison reverses for some other distributions, and mixed bundling (a bundle price plus two stand-alone prices) typically does at least as well as either extreme, because it nests both. The IO lesson is not “always bundle”. It is that a multi-product monopolist has an instrument — the relative price of the bundle — that a collection of single-product monopolists does not, and that the value of the instrument depends on the correlation of values. Negatively correlated values make bundling more attractive; perfectly positively correlated values make it redundant.

::: application Cable television and software suites
A cable operator selling a bundle of channels, or a software firm selling a suite, faces a population whose willingness to pay for individual components is imperfectly correlated. The uniform-price analysis of a single channel would leave the operator with the monopoly quantity of [[#prop-mr-mc]] on each channel. Bundling can raise both profit and, in some calibrations, the number of component-goods consumed, which is the Adams–Yellen analogue of a reduction in deadweight loss. Whether it does so in a particular case is an empirical question; the model says only which correlation structure to look for. (This is not a recommendation to buy, sell, or regulate any bundle.)
:::

## Where this leads

Uniform-price monopoly is the polar case of market power: the firm internalises the entire effect of its output on price. [[industrial-organisation/cournot-bertrand]] splits that internalisation among $N$ firms. [[industrial-organisation/product-differentiation]] gives each firm a demand curve of its own without making it a monopolist. The two-part tariff of [[#prop-two-part]] reappears as the cure for double marginalisation in [[industrial-organisation/vertical-relations]]. Third-degree discrimination is the analogue of a platform setting different prices on two sides of a market in [[industrial-organisation/platforms-and-networks]]. Competition-policy practice treats excessive pricing as an abuse only in some jurisdictions and with a high threshold; the welfare objects of this chapter — DWL, the output test for discrimination — are the economics behind those legal tests, not the tests themselves.

::: history
**1838, Cournot.** The monopoly first-order condition $\mathrm{MR} = \mathrm{MC}$ is in Chapter V of the *Recherches*, before the duopoly chapter; Cournot already draws the revenue curve and locates its maximum.

**1890, Alfred Marshall.** *Principles of Economics* gives the consumer-surplus triangle and the deadweight-loss geometry of a tax, which is the same geometry as [[#eq-dwl]] for a monopoly mark-up.

**1920, A. C. Pigou.** *The Economics of Welfare* introduces the three degrees of price discrimination used in [[#def-pd]].

**1927, Frank Ramsey; 1927, Harold Hotelling.** Ramsey’s contribution to the theory of taxation and Hotelling’s “A general mathematical theory of depreciation” (and, more directly, his 1932 “Edgeworth’s taxation paradox”) feed the later Ramsey–Boiteux pricing rule for a constrained multi-product monopolist, the natural-monopoly counterpart of [[#prop-mr-mc]].

**1978–1989, Mussa and Rosen; Maskin and Riley; Adams and Yellen; McAfee, McMillan and Whinston.** Mussa and Rosen (1978) and Maskin and Riley (1984) give the modern screening (second-degree) model; Adams and Yellen (1976) and McAfee, McMillan and Whinston (1989) give the modern analysis of bundling.
:::

::: summary
- A uniform-price monopolist sets $\mathrm{MR}(q) = \mathrm{MC}(q)$. With $p = a-bq$ and constant $c$, $q^m = (a-c)/(2b)$, $p^m = (a+c)/2$, $\pi^m = (a-c)^2/(4b)$. Price is read off demand, not off the MR–MC crossing.
- Deadweight loss is $\int_{q^m}^{q^c}(p-\mathrm{MC})\,\mathrm{d}q$, equal to $(a-c)^2/(8b)$ in the linear case — half of monopoly profit, a quarter of competitive total surplus. Profit itself is a transfer.
- First-degree discrimination produces the efficient output and transfers the whole surplus to the firm. A two-part tariff with identical buyers does the same by setting the usage price at marginal cost and extracting surplus with the fee.
- Second-degree discrimination (a menu) leaves an information rent at the top and distorts the low type downward. Third-degree discrimination equalises marginal revenues across groups; the less elastic group pays more. Welfare versus uniform pricing is ambiguous unless output rises or a new market is opened.
- Bundling is discrimination over the joint distribution of values. Independent uniform values on $[0,1]$ make pure bundling more profitable than separate selling in the zero-cost example; the result is distribution-dependent.
:::

## Exercises

::: exercise Linear monopoly arithmetic {level=1 check="6"}
Inverse demand is $p = 18 - q$ and $c = 6$ is constant. Compute the uniform-price monopoly quantity $q^m$. (Enter that quantity.)
::: solution
$q^m = (18-6)/(2\cdot 1) = 6$. Then $p^m = (18+6)/2 = 12$ and $\pi^m = (12-6)\cdot 6 = 36$, which also equals $(12)^2/4 = 36$.
:::
:::

::: exercise Deadweight loss {level=1 check="18"}
In the previous exercise, compute the deadweight loss of uniform-price monopoly. (Enter DWL.)
::: solution
$\mathrm{DWL} = (18-6)^2/(8\cdot 1) = 144/8 = 18$. Check: $q^c = 12$, triangle base $6$ and height $6$, area $18$.
:::
:::

::: exercise Lerner check {level=1 check="0.5"}
For $p = 18 - q$, $c = 6$, compute the Lerner index at the monopoly optimum. (Enter $L$ as a decimal.)
::: solution
$p^m = 12$, $L = (12-6)/12 = 0.5$. Elasticity is $\varepsilon = 12/(6\cdot(-1)) = -2$, and $1/\lvert\varepsilon\rvert = 1/2$.
:::
:::

::: exercise A two-part tariff {level=2}
A monopolist faces $n = 10$ identical buyers, each with inverse demand $p = 12 - q$ for an individual quantity, and has $c = 2$. Compute the optimal two-part tariff $(F, w)$ and the firm’s profit. Compare with uniform monopoly pricing (a single $p$, no fee) if the firm instead treats the *market* inverse demand as $P = 12 - Q/10$.
::: solution
By [[#prop-two-part]], $w = 2$ and each buyer takes $q = 10$, with $\mathrm{CS} = \tfrac12 \times 10 \times 10 = 50$, so $F = 50$. Profit is $10 \times 50 = 500$.

Uniform monopoly on market demand $P = 12 - Q/10$: this is $a = 12$, $b = 1/10$, $c = 2$, so $Q^m = (10)/(2/10) = 50$, $P^m = 7$, $\pi^m = 5 \times 50 = 250$. The two-part tariff doubles profit and doubles output, matching the first-degree comparison of [[#ex-first]] (there $n = 1$ in market units).
:::
:::

::: exercise Third-degree prices {level=2}
A firm has $c = 4$ and two markets, $p_1 = 24 - q_1$ and $p_2 = 16 - 2q_2$. Find the discriminating quantities and prices, and the profit.
::: solution
$\mathrm{MR}_1 = 24 - 2q_1 = 4$ gives $q_1 = 10$, $p_1 = 14$. $\mathrm{MR}_2 = 16 - 4q_2 = 4$ gives $4q_2 = 12$, $q_2 = 3$, $p_2 = 16-6 = 10$. Profit $(14-4)\cdot 10 + (10-4)\cdot 3 = 100 + 18 = 118$. As a check, $L_1 = 10/14 = 5/7$ and $\lvert\varepsilon_1\rvert = 14/(10\cdot 1) = 1.4 = 7/5$; $L_2 = 6/10 = 0.6$ and $\lvert\varepsilon_2\rvert = 10/(3\cdot 2) = 10/6 \approx 1.667$, and $1/1.667 = 0.6$.
:::
:::

::: exercise Screening numbers {level=2}
In the two-type model of [[#prop-screening]], take $\theta_L = 4$, $\theta_H = 6$, $n_L = 2$, $n_H = 1$, zero marginal cost. Compute $q_L$, $q_H$, $T_L$, $T_H$ and total profit. Is the low type served?
::: solution
$q_H = 6$. $q_L = 4 - (1/2)(6-4) = 4-1 = 3 > 0$, so $L$ is served. $T_L = 4\cdot 3 - 9/2 = 12 - 4.5 = 7.5$. High type’s rent is $(6-4)\cdot 3 = 6$, and $T_H = (6\cdot 6 - 36/2) - 6 = (36-18)-6 = 12$. Profit $2\times 7.5 + 12 = 27$. (If $n_H$ were much larger the formula would give $q_L \le 0$ and the firm would exclude $L$.)
:::
:::

::: exercise A specific tax versus a specific subsidy {level=3}
A monopolist faces $p = a - bq$ and constant $c$. A specific (per-unit) tax $t$ is imposed on the firm. (a) Show that the incidence on buyers is $t/2$ (the price rises by $t/2$). (b) Show that a specific *subsidy* of $s = a-c$ would implement the competitive output, and compute its budgetary cost. (c) Why is this subsidy not a first-best recommendation once one takes the funds’ opportunity cost into account? Use the linear water numbers $a=12$, $b=1$, $c=2$ for the arithmetic of (b).
::: hint
The tax is an increase in $c$. For (c), the first-best allocation is $q^c$ with no distortion on the funding side; a subsidy funded by distortionary taxation reintroduces a DWL elsewhere.
:::
::: solution
(a) $p^m(c+t) = (a + c + t)/2 = p^m(c) + t/2$. Buyers pay half of $t$; the firm’s net price $p^m - t$ falls by $t/2$. Incidence is equal because linear demand and constant MC make the MR curve twice as steep as demand, so a vertical shift of MC is split equally in the price.

(b) We need $q = (a-c)/b$, i.e. $(a - (c-s))/(2b) = (a-c)/b$, so $a - c + s = 2(a-c)$, hence $s = a-c$. With $a=12$, $c=2$, $s=10$. Output is 10, price is $12-10=2$, the firm receives $2+10=12$ per unit, profit $(12-2)\times 10 = 100$, and the budgetary cost is $10 \times 10 = 100$. The subsidy transfers 100 of public funds to the firm; buyers get the competitive surplus of 50; the DWL of monopoly is eliminated.

(c) The 100 must be raised somehow. If it is raised by a lump-sum tax, the allocation is first-best (aside from the distributional question of taxing people to pay the monopolist). If it is raised by distortionary taxes, those taxes create their own DWL, and the net welfare effect can have either sign. The calculation is a benchmark, not a policy proposal.
:::
:::

::: exercise Bundling versus separate selling {level=3}
Two goods, zero marginal cost. A buyer’s values are independent and uniform on $[0,1]$. (a) Confirm that separate selling yields profit $1/2$ per buyer at prices $1/2$, $1/2$. (b) For pure bundling with $p_b \in [0,1]$, write the profit function and show that $p_b = \sqrt{2/3}$ is the unique critical point in $(0,1)$. (c) Evaluate profit there and compare with $1/2$. (d) What would change if $v_1 = v_2$ always (perfect positive correlation)?
::: hint
For $p_b \le 1$ the area of the unit square with $v_1+v_2 < p_b$ is $p_b^2/2$. For (d), the joint distribution lies on the diagonal.
:::
::: solution
(a) Demand for good $i$ at price $p$ is $1-p$. Profit $p(1-p)$ is maximised at $p=1/2$, value $1/4$ per good, total $1/2$.

(b) $\Prob(v_1+v_2 \ge p_b) = 1 - p_b^2/2$ for $p_b \in [0,1]$. Profit $\pi(p_b) = p_b - p_b^3/2$. Then $\pi'(p_b) = 1 - 3p_b^2/2 = 0$ gives $p_b^2 = 2/3$, $p_b = \sqrt{2/3}$ (the positive root). $\pi''(p_b) = -3p_b < 0$ on $(0,1)$.

(c) $\pi = \sqrt{2/3}\,(1-1/3) = \tfrac23 \sqrt{2/3} = \tfrac{2}{3}\sqrt{\tfrac{2}{3}} \approx 0.544 > 1/2$.

(d) If $v_1 = v_2 = v$ always, the buyer’s value for the bundle is $2v$. Separate selling at $p = 1/2$ still sells each good with probability $1/2$, so profit remains $1/2$. The bundle at price $p_b$ sells iff $2v \ge p_b$, i.e. $v \ge p_b/2$, giving profit $p_b(1-p_b/2)$, which is maximised at $p_b = 1$ with profit $1/2$. Bundling cannot beat separate selling: there is no dispersion in the sum relative to the components to exploit. (At $p_b = 1$ the bundle is equivalent to two stand-alone prices of $1/2$.)
:::
:::
