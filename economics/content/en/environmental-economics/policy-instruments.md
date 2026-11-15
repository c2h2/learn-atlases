A regulator wants two power stations to cut sulphur jointly by $8$ units. Station A can abate cheaply, station B only at a steep cost. A uniform standard — "each cuts by $4$" — meets the environmental target and wastes money: A is stopped too soon and B is pushed too far. A tax, or a market in permits, would have A cut by $6$ and B by $2$, the same $8$ units at a lower total cost. That is the **equimarginal principle**, and it is the reason economists reach for prices before they reach for technology standards.

This chapter is about *how* to hit an environmental target, taking the target as given. (How to *choose* the target, when damage must be valued in money, is [[environmental-economics/valuing-the-environment]] and [[environmental-economics/cost-benefit-analysis]].) Under certainty, a Pigouvian tax and a cap-and-trade scheme that are tuned to the same quantity are equivalent. Under uncertainty about abatement costs they are not. Weitzman's (1974) comparison of prices and quantities is the central result: when marginal damage is steep relative to marginal cost, a quantity instrument limits the welfare loss from being wrong; when marginal cost is the steep schedule, a price instrument does.

Throughout, $a$ is **abatement** (pollution reduced relative to an uncontrolled baseline) and $e$ is residual **emissions**, with $e = e_0 - a$. Marginal abatement cost $\mathrm{MAC}(a)$ is the extra private cost of one more unit of $a$; it is also, read from the other end, the marginal cost of reducing $e$. Profit is written $\Pi$ when it appears.

## Cost-effectiveness and the equimarginal principle

::: definition Cost-effectiveness {#def-cost-effective}
A policy that achieves a given environmental target (a cap on total emissions, a floor on abatement) is **cost-effective** if no other feasible policy achieves the same target at a lower total abatement cost. Cost-effectiveness is a necessary condition for efficiency, but it does not ask whether the target itself maximises social surplus.
:::

::: proposition Equimarginal principle {#prop-equimarginal}
Let firm $i = 1,\dots,n$ have a differentiable, strictly convex abatement-cost function $C_i(a_i)$ with $C_i'(a_i) > 0$ for $a_i > 0$, and suppose the target is $\sum_i a_i = A$. An interior cost-minimising allocation satisfies

$$
C_1'(a_1) = C_2'(a_2) = \cdots = C_n'(a_n) = \lambda,
$$ {#eq-equimarginal}

where $\lambda \ge 0$ is the shadow cost of the target. If some firm has $C_i'(0) > \lambda$, it optimally sets $a_i = 0$.
:::

::: proof
The Lagrangian is $\sum_i C_i(a_i) + \lambda \bigl(A - \sum_i a_i\bigr)$ with $a_i \ge 0$. The first-order condition for each $i$ is $C_i'(a_i) - \lambda \ge 0$, with equality if $a_i > 0$. Strict convexity of each $C_i$ makes the critical point a unique minimum.
:::

The principle is the environmental version of equalising marginal cost across plants in a multi-plant firm. A uniform *proportional* cut, or a uniform technology mandate, equalises *quantities* or *techniques*, not marginal costs, and so is not cost-effective unless firms are identical.

::: example Two stations, one target {#ex-two-stations}
Station A's marginal abatement cost is $\mathrm{MAC}_A = 2a_A$ and station B's is $\mathrm{MAC}_B = 6a_B$. Uncontrolled emissions are $10$ each. The regulator wants total abatement of $8$ (residual emissions $12$). Find the cost-effective pair $(a_A, a_B)$, the common marginal cost $\lambda$, and the extra cost of a uniform standard $a_A = a_B = 4$.
::: solution
[[#eq-equimarginal]] says $2a_A = 6a_B$ and $a_A + a_B = 8$, so $a_A = 3a_B$. Then $3a_B + a_B = 8$, $a_B = 2$, $a_A = 6$, and $\lambda = 12$. Total cost is $\int_0^6 2a\,\dd a + \int_0^2 6a\,\dd a = a_A^2 + 3 a_B^2 = 36 + 12 = 48$. Under the uniform standard, costs are $4^2 + 3\cdot 4^2 = 16 + 48 = 64$. The extra $16$ buys no extra abatement. It is the cost of ignoring that A is the cheap station.
:::
:::

::: widget plot
f: 2*x; 6*x
x: 0, 10
y: 0, 30
labels: \text{MAC}_A; \text{MAC}_B
hlines: 12
vlines: 2; 6
caption: Each station's MAC is plotted against its own abatement. The cost-effective allocation is the pair of quantities at which both curves hit the same height $\lambda = 12$, namely $a_A = 6$ and $a_B = 2$. A uniform cut of $4$ sits at different heights on the two curves. Hover to read the heights.
:::

## Command-and-control standards

A **performance standard** caps each source's emissions (or requires a percentage cut). A **technology standard** mandates a specified technique — a scrubber, a catalytic converter, a process. Both are **command-and-control** (CAC) instruments: the regulator specifies quantities or techniques rather than a price.

Standards have virtues. They are easy to explain, they can be aimed at hot spots when damages are local, and they bind even if the regulator cannot observe each firm's cost. They fail [[#prop-equimarginal]] when sources differ, they give no incentive to cut *beyond* the standard, and a technology standard freezes the choice of technique: a cheaper unmandated method is not rewarded. Baumol and Oates (1971) showed that a *uniform* tax, by contrast, equalises marginal costs without the regulator needing to know each $C_i$ — a decisive informational advantage.

::: warning Equal cuts are not fair in the sense that matters for cost
"Each plant cuts $20\%$" sounds even-handed. It is even-handed in quantities, not in burden. The high-MAC plant spends more per tonne to deliver the same percentage, and the low-MAC plant is stopped while cheap tonnes remain. Cost-effectiveness is an efficiency claim, not a claim about the distribution of profits. Distribution can be handled by how permits are *allocated*, or by how tax revenue is *returned*, without sacrificing [[#eq-equimarginal]].
:::

## Pigouvian taxes

::: definition Pigouvian tax {#def-pigou-tax}
A **Pigouvian tax** on a residual is a charge $t$ per unit of emissions (or of a perfectly correlated proxy). Faced with $t$, firm $i$ chooses $a_i$ to minimise $C_i(a_i) + t(e_{0i} - a_i)$, hence $C_i'(a_i) = t$ at an interior solution. If $t = \mathrm{MD}(e^*)$, the tax implements the efficient residual $e^*$ of [[environmental-economics/environment-and-economy#prop-msc-msb]] as well as a cost-effective allocation of whatever abatement that residual requires.
:::

The firm reveals its MAC by how much it abates. The regulator does not need to know $C_i$, only to observe emissions and to set $t$. Revenue can be returned lump-sum, used to cut other taxes (the "double dividend" claim, which is delicate once labour-market distortions are modelled; Bovenberg and de Mooij 1994), or earmarked. Who *bears* the tax is a matter of incidence: with inelastic demand for the dirty good, consumers pay; with elastic demand and inelastic supply, producers pay. Incidence is independent of who writes the cheque, as in [[public-economics/tax-incidence]].

::: example The two stations under a tax {#ex-tax}
In [[#ex-two-stations]], the regulator levies $t = 12$ per unit of residual emissions. How much does each station abate, and what does each pay in tax?
::: solution
Station A sets $2a_A = 12$, so $a_A = 6$ and residual emissions $e_A = 4$. Station B sets $6a_B = 12$, so $a_B = 2$ and $e_B = 8$. Abatement costs are $36$ and $12$ as before. Tax bills are $12 \cdot 4 = 48$ and $12 \cdot 8 = 96$. Total payments to the treasury are $144$; they are a transfer, not a social cost. Social abatement cost remains $48$. If the revenue is returned lump-sum, the stations' *net* burden is just their abatement cost plus whatever incidence the output market imposes.
:::
:::

A subsidy of $s$ per unit of *abatement* yields the same $C_i'(a_i) = s$ and the same abatement *if* the number of firms is fixed. It does not if entry is endogenous: a subsidy raises the profits of dirty industries and can attract extra firms (Kohn 1992; the "output effect"). For that reason taxes on residuals, not subsidies to abatement, are the default Pigouvian recommendation.

## Tradable permits

::: definition Cap-and-trade {#def-cap-trade}
A **tradable-permit** (cap-and-trade) scheme issues $E$ permits, each allowing one unit of emissions. Firms may trade permits. In a competitive permit market the permit price $p_E$ equalises MAC across firms at $\sum_i e_i = E$. **Grandfathering** gives permits away, usually in proportion to historical emissions; an **auction** sells them. Montgomery (1972) showed that, with competitive permit markets and full information, the equilibrium allocation of abatement is cost-effective *regardless of the initial allocation* — a Coase-like invariance for the *quantity* of abatement, not for the distribution of rents.
:::

::: proposition Tax–permit equivalence under certainty {#prop-equivalence}
Suppose MAC schedules are known and non-stochastic, the permit market is competitive, and there is no uncertainty about damage. A tax $t = \lambda$ and a cap $E = \sum_i (e_{0i} - a_i(\lambda))$, where $a_i(\lambda)$ solves $C_i'(a_i) = \lambda$, implement the same abatement allocation and the same residual. The tax raises revenue $t E$; grandfathered permits give that rent to firms; auctioned permits recover it for the state.
:::

::: proof
Under the tax, $C_i'(a_i) = t$ and total residual is whatever firms choose. Under the cap, market clearing forces $\sum e_i = E$ and competitive trading forces $C_i'(a_i) = p_E$. Setting $t = p_E = \lambda$ and $E$ equal to the implied residual produces the same $(a_i)$ and the same $e_i$. The financial difference is only who receives $\lambda E$.
:::

::: example The two stations in a permit market {#ex-permits}
The regulator issues $12$ permits and grandfathers $6$ to each station in [[#ex-two-stations]]. Find the competitive permit price and the trade.
::: solution
Cost-effectiveness still requires $\lambda = 12$, $a_A = 6$, $a_B = 2$, hence $e_A = 4$, $e_B = 8$. Station A is given $6$ permits and needs $4$, so it sells $2$. Station B is given $6$ and needs $8$, so it buys $2$. The price is $p_E = 12$. A's net financial position on the permit market is $+24$; B's is $-24$. Abatement costs are unchanged at $36$ and $12$. Relative to the tax of [[#ex-tax]], each station is richer by the value of its grandfathered endowment, $72$. Auctioning the $12$ permits would transfer that $144$ to the treasury and restore the tax's distributional outcome.
:::
:::

::: quiz
A journalist writes that "tradable permits let rich firms buy the right to pollute, so they cannot be efficient." Which response is accurate?
- [ ] The claim is right: any trade of permits raises total emissions
- [x] Trades rearrange *who* abates, not *how much* is emitted; the cap fixes the total, and trade equalises MAC
- [ ] Permits are efficient only if they are auctioned
- [ ] Efficiency requires that permits not be traded, so that each firm meets its own cap
::: solution
The cap $E$ is the environmental outcome. Trade is what delivers [[#eq-equimarginal]]. Auction versus grandfathering changes who receives the rent $\lambda E$, not the abatement allocation, under the conditions of [[#prop-equivalence]]. "Buying the right to pollute" is the point of installing a price on a residual that was previously free.
:::
:::

Hot spots qualify the invariance. If damage depends on *where* a tonne is emitted — urban $\mathrm{NO}_x$, a river's oxygen sag — a single national permit price can concentrate emissions at high-damage locations. Ambient-permit systems (Montgomery 1972) or zonal trading try to restore spatial cost-effectiveness; they are thicker to run. For a uniformly mixing stock pollutant such as $\mathrm{CO}_2$, location does not matter and a single cap is the right spatial grain.

## Prices versus quantities under uncertainty

Equivalence dies as soon as the regulator does not know the MAC schedule. A tax then delivers a certain *price* of abatement and an uncertain *quantity*; a cap delivers a certain quantity and an uncertain price. Weitzman (1974) asked which mistake is more expensive.

::: proposition Weitzman prices versus quantities {#prop-weitzman}
Let abatement $a$ have benefit $B(a)$ (avoided damage) with $B'' \le 0$, and cost $C(a,\theta)$ with $C_{aa} > 0$ and a cost shock $\theta$ unknown to the regulator but observed by firms. The regulator must choose *before* $\theta$ is realised either a tax $t$ or a quota $a_q$. Linearising $B'$ and $C_a$ around the expected-cost optimum, the expected-welfare advantage of the tax over the quota has the sign of

$$
C_{aa} - B''.
$$ {#eq-weitzman}

That is: **prices outperform quantities when MAC is steeper than marginal benefit** ($C_{aa} > \lvert B''\rvert$ in the usual case $B'' < 0$); **quantities outperform prices when marginal benefit (marginal damage, read as a function of abatement) is the steeper schedule**. Assumptions: additive uncertainty in the MAC intercept, no uncertainty in $B$, one period, interior linear-quadratic schedules, and a planner who maximises expected surplus.
:::

::: proof
Write $B'(a) = \beta - b a$ and $C_a(a,\theta) = \theta + c a$ with $b > 0$, $c > 0$ and $\E[\theta] = \bar\theta$. The expected-cost optimum is $a^* = (\beta - \bar\theta)/(b+c)$, supported by $t^* = \bar\theta + c a^*$. After $\theta$ realises, the true optimum is $a(\theta) = (\beta - \theta)/(b+c)$. A tax $t^*$ induces $a_t(\theta) = (t^* - \theta)/c$. A quota $a_q = a^*$ does not move. Expected deadweight loss is the expected triangle between $B'$ and realised $C_a$ from the chosen $a$ to $a(\theta)$. The *ex post* deadweight loss of any $a$ is $\tfrac12 (b+c)\bigl(a - a(\theta)\bigr)^2$, because $B'$ and realised $C_a$ differ by slope $b+c$. The tax induces $a_t = a^* - (\theta - \bar\theta)/c$; the quota stays at $a^*$. Subtracting $a(\theta) = a^* - (\theta - \bar\theta)/(b+c)$ and taking expectations yields

$$
\E[W_{\mathrm{tax}} - W_{\mathrm{quota}}] = \frac{\sigma^2 (c - b)}{2 c^2},
$$

whose sign is the sign of $c - b = C_{aa} - \lvert B''\rvert$. (Weitzman's original paper works with output rather than abatement; the environmental translation is this one.)
:::

::: intuition The relative-slope rule
If MAC is steep, a quota that overshoots forces firms up a cliff of cost; a tax lets them abate less when costs are high, and the environmental error is modest if $B'$ is flat. If $B'$ is steep — a threshold, a health standard with a sharp kink, a climate tipping point in a static cartoon — getting the *quantity* wrong is the expensive mistake, and a cap is the safer instrument. The result is local (linear-quadratic) and one-shot. Stock pollutants, correlated cost and damage shocks, and hybrid instruments (a cap with a price ceiling) change the ranking; Roberts and Spence (1976) and Pizer (2002) are the standard extensions.
:::

::: example A flat benefit schedule {#ex-weitzman-flat}
Expected MAC is $6 + 2a$; marginal benefit of abatement is $18 - a$ (a relatively flat $B'$). The regulator sets policy at the expected-cost optimum. Costs then realise as $12 + 2a$. Compute abatement under a tax, under a quota, and the two deadweight losses relative to the *ex post* optimum.
::: solution
Expected optimum: $6 + 2a = 18 - a$ so $3a = 12$, $a^* = 4$, $t^* = 6 + 8 = 14$. *Ex post* optimum: $12 + 2a = 18 - a$ so $3a = 6$, $a(\theta) = 2$. The tax: firms set $12 + 2a = 14$, hence $a_t = 1$. The quota stays at $a_q = 4$. Deadweight loss of the tax is the triangle from $a = 1$ to $a = 2$: height at $a=1$ is $(18-1) - (12+2) = 3$, base $1$, area $1.5$. Deadweight loss of the quota is the triangle from $a=2$ to $a=4$: height at $a=4$ is $(12+8) - (18-4) = 6$, base $2$, area $6$. The tax is four times less costly, as [[#prop-weitzman]] predicts because $c = 2 > b = 1$.
:::
:::

::: example A steep benefit schedule {#ex-weitzman-steep}
Now $B'(a) = 20 - 4a$ (steep) with the same expected MAC $6 + 2a$ and the same shock to $12 + 2a$. Repeat the comparison.
::: solution
Expected optimum: $6 + 2a = 20 - 4a$ so $6a = 14$, $a^* = 7/3$, $t^* = 6 + 14/3 = 32/3$. *Ex post*: $12 + 2a = 20 - 4a$ so $6a = 8$, $a(\theta) = 4/3$. The tax: $12 + 2a = 32/3$ gives $2a = -4/3$, so $a_t = 0$ (a corner). The quota stays at $7/3$. Deadweight loss of the tax, from $0$ to $4/3$: height at $0$ is $20 - 12 = 8$, area $\tfrac12 \cdot (4/3) \cdot 8 = 16/3 \approx 5.33$. Deadweight loss of the quota, from $4/3$ to $7/3$: height at $7/3$ is $(12 + 14/3) - (20 - 28/3) = 50/3 - 32/3 = 6$, base $1$, area $3$. The quota is now the cheaper mistake, because $b = 4 > c = 2$.
:::
:::

::: widget plot
f: 18 - b*x; 6 + 2*x; 12 + 2*x
sliders: b=1:0.4:4:0.2
x: 0, 8
y: 0, 28
labels: \text{MB}; \text{MAC expected}; \text{MAC realised}
caption: The slider is the slope $b$ of marginal benefit. At $b=1$ (the flat case of [[#ex-weitzman-flat]]) the realised MAC intersects MB near $a=2$, far from a quota of $4$ but close to what a tax of $14$ induces. Raise $b$ toward $4$ (the steep case) and the *ex post* optimum hugs the expected optimum; a quantity miss becomes expensive. Watch which instrument's implied $a$ sits closer to the realised intersection.
:::

For **climate**, two further points. First, carbon dioxide is a stock: one year's emissions shift a long-lived atmospheric stock, so year-by-year marginal damage is relatively *flat*, which is Weitzman's original argument for a carbon *tax* (and Newell and Pizer 2003; Hoel and Karp 2002 qualify this in a genuine dynamic model). Second, Weitzman later (2009) argued that *fat-tailed* climate damages can dominate any thin-tailed cost–benefit comparison — a different reason for aggressive quantity-like constraints. The two Weitzman arguments are not the same paper, and they can point at different instruments. Hybrids — a cap with a price ceiling (safety valve) and a price floor — are the practical compromise used in California's ETS and, in effect, in the EU ETS after the market-stability reserve.

## Evidence

The US Acid Rain Program (Title IV of the 1990 Clean Air Act Amendments) put a cap on power-sector $\mathrm{SO}_2$ from 1995. Emissions fell by more than half in a decade, and ex post costs came in well below ex ante industry forecasts, in part because of substitution toward low-sulphur Powder River Basin coal and unanticipated flexibility (Schmalensee and Stavins, *Review of Environmental Economics and Policy*, 2013). That episode is the textbook demonstration of [[#prop-equimarginal]] in a permit market. It is not a demonstration that every ETS will be cheap: the US $\mathrm{SO}_2$ market later collapsed as other regulations made the cap non-binding.

The EU Emissions Trading System, launched in 2005, is the world's largest carbon market. Phase 1 over-allocated; the price fell toward zero. Later phases tightened the cap and, from 2019, a market-stability reserve has withdrawn surplus allowances. The European Environment Agency reports a fall of the order of $47\%$ in emissions from stationary EU ETS installations between 2005 and 2023 (EEA, EU ETS data viewer, 2024). How much of that fall is the ETS, how much is other policies and the 2008 and 2020 demand shocks, is identified only with care (Martin, Muûls and Wagner, *Review of Environmental Economics and Policy*, 2016, survey the evidence).

Explicit carbon taxes are older than the EU ETS. Finland (1990) and Sweden (1991) were first. Sweden's rate is among the highest explicit carbon prices; the World Bank's *State and Trends of Carbon Pricing 2024* reports a cluster of national and subnational carbon prices, many still below USD $50$ per tonne $\mathrm{CO}_2$ and a few (Sweden, Switzerland, some EU allowance prices in tight years) well above. British Columbia's 2008 tax, recycled through other tax cuts, has been studied as a relatively clean quasi-experiment: Yamazaki (*Journal of Environmental Economics and Management*, 2017) finds employment effects that are small and mixed across sectors rather than a provincial collapse. Chile (2014, in force 2017) and South Africa (2019) are middle-income carbon taxes; China's national ETS (2021) began in the power sector as an *intensity* (rate-based) scheme, which is not a cap on tonnes and does not deliver [[#prop-equivalence]] without further translation.

Cost-effectiveness in the small is repeatedly confirmed: when firms can trade or face a uniform price, abatement shifts toward low-MAC sources. Cost-effectiveness in the large — whether the *level* of the tax or cap is close to $\mathrm{MD}$ — is a different and much more uncertain question, because $\mathrm{MD}$ for climate is a model output ([[environmental-economics/climate-economics]]), not a posted price.

## Where this leads

A price or a cap is only as good as the damage number it is aimed at. [[environmental-economics/valuing-the-environment]] is about estimating that number for local environmental goods; [[environmental-economics/cost-benefit-analysis]] is about using it, and a discount rate, over long horizons. Climate policy ([[environmental-economics/climate-economics]], [[environmental-economics/international-agreements]]) is this chapter's instruments applied to a global stock pollutant, with leakage and free riding as extra constraints. Innovation ([[environmental-economics/green-growth]]) is the long-run MAC curve shifting down — which neither a static tax nor a static cap guarantees without a complementary research policy.

::: history
**1971, William Baumol and Wallace Oates.** "The Use of Standards and Prices for Protection of the Environment" (*Swedish Journal of Economics*) showed that a uniform tax attains a given standard at least cost without the regulator knowing each firm's MAC.

**1972, W. David Montgomery.** "Markets in Licenses and Efficient Pollution Control Programs" (*Journal of Economic Theory*) proved that competitive trade in emission licences delivers the same cost-minimum from any initial allocation.

**1974, Martin L. Weitzman.** "Prices vs. Quantities" (*Review of Economic Studies* 41) derived [[#eq-weitzman]]. The paper is about planning under uncertainty in general; its environmental life began immediately and has not ended.
:::

::: summary
- Cost-effectiveness requires equal MAC across sources ([[#prop-equimarginal]]). Uniform quantity or technology standards violate it when firms differ.
- A Pigouvian tax $t = \mathrm{MD}(e^*)$ on the residual implements the efficient point and equalises MAC without the regulator knowing each $C_i$ ([[#def-pigou-tax]]).
- Competitive cap-and-trade with cap $E$ matching that residual is equivalent to the tax under certainty; grandfathering versus auction changes distribution, not abatement ([[#prop-equivalence]]).
- Under MAC uncertainty, Weitzman's criterion compares the slopes: prices win when MAC is steeper than marginal benefit, quantities win when marginal benefit is steeper ([[#prop-weitzman]]).
- For a stock pollutant with a flat annual MD, the static Weitzman argument favours a tax; fat tails, hot spots and political constraints pull toward caps or hybrids. The ranking is a model result, not a slogan.
- US $\mathrm{SO}_2$ trading, the EU ETS and a handful of carbon taxes are the main empirical exhibits; they show cost-shifting toward cheap abatement, not that every price is set at $\mathrm{MD}$.
:::

## Exercises

::: exercise Equimarginal arithmetic {level=1 check="4"}
$\mathrm{MAC}_1 = a_1$, $\mathrm{MAC}_2 = 2a_2$, $\mathrm{MAC}_3 = 4a_3$. Total abatement required is $7$. Find $a_1$ at the cost-effective allocation. (Enter $a_1$.)
::: solution
Equalise MAC at $\lambda$: $a_1 = \lambda$, $a_2 = \lambda/2$, $a_3 = \lambda/4$, and $\lambda + \lambda/2 + \lambda/4 = 7$. Then $(7/4)\lambda = 7$ so $\lambda = 4$. Hence $a_1 = 4$, with $a_2 = 2$ and $a_3 = 1$.
:::
:::

::: exercise Cost of the cost-effective plan {level=1 check="14"}
In the previous exercise, compute total abatement cost $\sum_i C_i(a_i)$ at the cost-effective allocation, with $C_i$ the integral of $\mathrm{MAC}_i$. (Enter the total cost.)
::: solution
$C_1 = \int_0^4 a\,\dd a = 8$, $C_2 = \int_0^2 2a\,\dd a = 4$, $C_3 = \int_0^1 4a\,\dd a = 2$. Sum $= 14$.
:::
:::

::: exercise A permit price {level=1 check="4"}
The same three firms face a competitive market in permits implementing the cap that requires total abatement $7$. What is the equilibrium permit price? (Enter the price.)
::: solution
By [[#prop-equivalence]] the permit price equals the common MAC, which was $\lambda = 4$.
:::
:::

::: exercise Who sells permits {level=2 check="2"}
In [[#ex-permits]], how many permits does station A sell? (Enter the number of permits sold by A.)
::: solution
A abates $6$ and therefore emits $4$. It is grandfathered $6$ permits, so it sells $2$.
:::
:::

::: exercise Weitzman deadweight loss, tax {level=2 check="1.5"}
In [[#ex-weitzman-flat]], what is the *ex post* deadweight loss of the tax relative to the true optimum? (Enter the DWL.)
::: solution
The tax induces $a_t = 1$; the true optimum is $a(\theta) = 2$. The triangle has base $1$ and height $3$, so $\mathrm{DWL} = 1.5$.
:::
:::

::: exercise Weitzman's sign {level=2}
MAC has slope $c = 3$ and marginal benefit of abatement has slope $b = 1$, in absolute value, with uncertainty only in the MAC intercept. According to [[#prop-weitzman]], should the regulator prefer a tax or a quota, and why? What would change if a threshold made $b = 6$?
::: solution
$c - b = 2 > 0$, so expected welfare is higher under a tax: MAC is the steeper schedule, and a quota that overshoots is expensive. If $b = 6 > c$, the inequality flips and a quota is preferred, because getting the quantity of a steep-benefit pollutant wrong is the costly mistake.
:::
:::

::: exercise Expected advantage of prices {level=3 check="4.5"}
In the linear-quadratic model of the proof of [[#prop-weitzman]], $c = 2$, $b = 1$ and $\Var(\theta) = 36$. Compute $\E[W_{\mathrm{tax}} - W_{\mathrm{quota}}] = \sigma^2 (c-b)/(2c^2)$. (Enter the value.)
::: hint
Substitute directly into the displayed formula in the proof.
:::
::: solution
$\sigma^2 (c-b)/(2c^2) = 36 \cdot (2-1)/(2\cdot 4) = 36/8 = 4.5$. The tax is better in expectation by $4.5$ units of surplus.
:::
:::

::: exercise An intensity standard {level=3}
A regulator requires that emissions per unit of output, $e/q$, not exceed $\sigma$. The firm's cost is $C(q,e)$ with $C_q > 0$, $C_e < 0$ (more emissions, holding $q$ fixed, save abatement cost). Show that the standard's Lagrange multiplier puts a wedge on the emissions choice *relative to output*, and explain in words why this is not equivalent to a cap on $e$.
::: hint
The constraint is $e - \sigma q \le 0$. Write the first-order conditions for $q$ and $e$.
:::
::: solution
The Lagrangian (cost minimisation, or profit maximisation with an output price $p$) includes $\lambda(\sigma q - e)$. The first-order condition for $e$ is $-C_e = \lambda$ (plus any output-market terms if we maximise profit). The first-order condition for $q$ includes a *credit* $\lambda \sigma$: extra output relaxes the intensity constraint. The firm can therefore comply by raising $q$ as well as by cutting $e$. A cap on $e$ has no such output credit. Intensity standards can thus expand output in dirty sectors — the same qualitative problem as an abatement subsidy with free entry. China's national ETS, as launched in 2021 for power, is an intensity scheme; translating it into a tonne cap requires a forecast of output.
:::
:::

::: exercise Second-best tax with a pre-existing labour tax {level=3}
A representative household supplies labour $L$ at a pre-existing tax $\tau_L$ and consumes a dirty good $q$ that causes damage $D(q)$. Sketch, without solving a full general-equilibrium model, why the second-best tax on $q$ may lie *below* $D'(q)$. Cite the tax-interaction logic.
::: solution
The Pigouvian tax raises the consumer price of $q$ and, if $q$ and leisure are substitutes, encourages a further shift into leisure, shrinking the already-taxed labour base. That "tax-interaction" effect is an extra marginal cost of the environmental tax. A "revenue-recycling" effect goes the other way if Pigouvian revenue is used to cut $\tau_L$. Bovenberg and de Mooij (1994) showed that, in a standard overlapping-distortion model, the interaction effect typically dominates if revenue is *not* used to cut $\tau_L$, so $t^{**} < D'(q)$. The first-best formula $t = D'(q)$ is restored only if there is a lump-sum instrument or if the labour market is undistorted. The lesson is not "never tax carbon"; it is "the number that falls out of a partial-equilibrium $\mathrm{MD}$ diagram is a benchmark, not a plug-in".
:::
:::

