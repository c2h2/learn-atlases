A factory upriver dumps effluent; a fishery downriver loses catch. The fish are scarce, the river is a sink that nobody owns, and the factory's private cost of dumping is near zero. Pigou's 1920 diagnosis was that the factory's **private marginal cost** lies below **social marginal cost**, so competitive output is too high. His instrument was a tax equal to marginal damage at the efficient point. Coase's 1960 diagnosis was that the problem is a missing bargain: if the factory and the fishery can trade rights at low cost, they will reach an efficient output regardless of who holds the right. Both claims are theorems in models. Which model applies is a positive question about transaction costs, the number of parties, and whether damage is observable. Which instrument a government *should* then use is a normative question, and it is constrained by information the government does not have.

This chapter stays with partial equilibrium: one market, a measurable externality, quasi-linear surplus so that income effects do not cloud the diagrams. General-equilibrium externalities (one person's consumption in another's utility in an Edgeworth box) obey the same first-order logic and are harder to draw. Environmental applications — the social cost of carbon, tradable permits — continue in [[environmental-economics/policy-instruments]].

## Private cost, social cost and the gap

::: definition Externality {#def-externality}
An **externality** is an unpriced effect of one agent's production or consumption on another agent's production or utility. It is **negative** when the effect harms, **positive** when it helps. It is **technological** (the case in this chapter) when it works through real quantities, not through prices; pecuniary effects that work only through prices are redistributions, not market failures, under the first welfare theorem.
:::

Pecuniary "externalities" — a new café bidding up rents, a large buyer lowering a price — change the distribution of surplus but, in a competitive complete-markets economy, do not create a Pareto gap. The first theorem already counts them. The fishery-and-factory problem is technological: the catch depends on effluent, and effluent is not a priced input of the factory.

::: definition Marginal social cost and benefit {#def-msc-msb}
For a good $q$ with inverse demand (marginal private benefit) $\mathrm{MPB}(q)$ and private marginal cost $\mathrm{MPC}(q)$, **marginal social cost** is $\mathrm{MSC}(q) = \mathrm{MPC}(q) + \mathrm{MD}(q)$, where $\mathrm{MD}(q)$ is marginal external damage. **Marginal social benefit** is $\mathrm{MSB}(q) = \mathrm{MPB}(q) + \mathrm{ME}(q)$, where $\mathrm{ME}(q)$ is marginal external benefit. Efficiency in a quasi-linear partial-equilibrium model requires $\mathrm{MSB}(q^*) = \mathrm{MSC}(q^*)$.
:::

When the externality is on the production side and demand has no external benefit, this is $\mathrm{MPB}(q^*) = \mathrm{MPC}(q^*) + \mathrm{MD}(q^*)$. Competitive unregulated firms set $\mathrm{MPB} = \mathrm{MPC}$, producing $q_c > q^*$ if $\mathrm{MD}>0$.

::: widget plot
f: 20-x; 2*x; 3*x
x: 0, 12
y: 0, 24
labels: \text{MSB (= MPB)}; \text{MPC}; \text{MSC}
caption: Inverse demand $\mathrm{MSB}=20-q$, private marginal cost $\mathrm{MPC}=2q$, marginal damage $\mathrm{MD}=q$ so $\mathrm{MSC}=3q$. Unregulated competitive output is where MSB meets MPC ($q=20/3$); the efficient output is where MSB meets MSC ($q=5$). The triangle between MSC and MSB from $q=5$ to $q=20/3$ is the deadweight loss of the unregulated externality. Compare the two intersections; the vertical gap between MSC and MPC at $q=5$ is the Pigouvian tax.
:::

::: proposition Unregulated competitive output is inefficient {#prop-unregulated}
Assume a competitive industry, a negative technological externality with $\mathrm{MD}(q)>0$, quasi-linear surplus, and no other distortions. Then $q_c > q^*$ and the deadweight loss is $\int_{q^*}^{q_c}\bigl(\mathrm{MSC}(q)-\mathrm{MSB}(q)\bigr)\,dq > 0$.
:::
::: proof
$q_c$ solves $\mathrm{MSB}(q_c)=\mathrm{MPC}(q_c)$; $q^*$ solves $\mathrm{MSB}(q^*)=\mathrm{MSC}(q^*)=\mathrm{MPC}(q^*)+\mathrm{MD}(q^*)$. Because $\mathrm{MD}>0$ and $\mathrm{MSC}$ is steeper than (or a parallel shift of) $\mathrm{MPC}$ when $\mathrm{MD}$ is non-decreasing, $q_c>q^*$. For $q\in(q^*,q_c)$, $\mathrm{MSC}(q)>\mathrm{MSB}(q)$, so the integral is positive. A small reduction in $q$ from $q_c$ raises social surplus.
:::

::: example Numbers for the widget {#ex-factory}
Inverse demand $P = 20 - q$, $\mathrm{MPC} = 2q$, $\mathrm{MD} = q$. Compute $q_c$, $q^*$, the Pigouvian tax $t^* = \mathrm{MD}(q^*)$, and the deadweight loss of laissez-faire.
::: solution
Unregulated: $20-q=2q$ so $q_c=20/3$, $P_c=40/3$. Efficient: $20-q=3q$ so $q^*=5$, $P^*=15$. Tax $t^*=\mathrm{MD}(5)=5$. Deadweight loss:

$$
\int_5^{20/3}(3q-(20-q))\,dq = \int_5^{20/3}(4q-20)\,dq = \bigl[2q^2-20q\bigr]_5^{20/3} = \frac{50}{9}\approx 5.56.
$$

After the tax, buyers pay 15, sellers receive $15-5=10$, which equals $\mathrm{MPC}(5)=10$. Tax revenue is $5\times 5=25$, a transfer, not a social cost.
:::
:::

Positive externalities reverse the inequalities: vaccination, basic research, a well-kept garden visible from the street. Unregulated $q_c < q^*$, and a Pigouvian *subsidy* equal to $\mathrm{ME}(q^*)$ restores the first-order condition. The algebra is the same with a sign change.

## Pigouvian taxes, subsidies and the information problem

::: theorem Pigouvian tax {#thm-pigou}
Under the assumptions of [[#prop-unregulated]], a specific tax $t^* = \mathrm{MD}(q^*)$ levied on the generator of the negative externality implements $q^*$. Equivalently, a cap $q \le q^*$ with tradable rights, or a mandated quantity $q^*$, implements the same allocation in this one-firm (or competitive identical-firm) model. Assumptions: MD known, no other distortions (so no second-best interaction with existing taxes), competitive price-taking, and damage a function of total $q$ only.
:::
::: proof
Faced with $t^*$, competitive firms set $\mathrm{MPC}(q)+t^* = \mathrm{MSB}(q)$. Substituting $t^*=\mathrm{MD}(q^*)$ gives the efficient first-order condition at $q^*$. Uniqueness follows if $\mathrm{MSC}-\mathrm{MSB}$ is strictly increasing, the usual case.
:::

Two observations are easy to miss. First, the tax that implements $q^*$ is marginal damage *at $q^*$*, not at $q_c$. A tax equal to $\mathrm{MD}(q_c)$ would overshoot if $\mathrm{MD}$ is rising. Second, the tax is levied on the *generator*, but in a competitive market the incidence of the tax — who is poorer after it — is shared with buyers according to elasticities, exactly as in [[public-economics/tax-incidence]]. Incidence is a distributional fact; efficiency requires only that the generator face the right *marginal* price.

::: warning Taxing "polluters" versus taxing pollution
A tax on the factory's *output* is first-best only if pollution is in fixed proportion to output. If abatement is possible (a filter, a different process), the efficient instrument taxes the *effluent*, so that the firm can choose the mix of output reduction and abatement. Output taxes, input taxes and technology standards are imperfect substitutes, ranked by how closely they hit the missing price. We return to this under Weitzman's prices-versus-quantities comparison.
:::

::: example Abatement rather than output {#ex-abatement}
A firm produces a fixed output and chooses abatement $a \in [0,1]$, with pollution $e = 1-a$, abatement cost $c(a) = 2a^2$, and marginal damage $\mathrm{MD} = 4e = 4(1-a)$. Find the efficient $a$ and a tax per unit of $e$ that implements it.
::: solution
Social cost $2a^2 + 4(1-a)$. Derivative: $4a - 4 = 0$ so $a^*=1$, wait — $4a-4=0$ gives $a=1$. Check second derivative $4>0$. At $a=1$, $\mathrm{MD}=0$ and marginal abatement cost $c'(1)=4$, while $\mathrm{MD}$ at $a=1$ is 0 — that cannot be an interior equality.

Marginal abatement cost $\mathrm{MAC} = c'(a) = 4a$. Efficient: $\mathrm{MAC}(a)=\mathrm{MD}(e)=\mathrm{MD}(1-a)$, so $4a = 4(1-a)$, $a^*=1/2$, $e^*=1/2$, $\mathrm{MD}=2$. A tax $t=2$ per unit of $e$ makes the firm minimise $2a^2 + t(1-a)$; FOC $4a - t =0$ so $a=t/4=1/2$. Taxing output would not give this firm any reason to buy the filter.
:::
:::

The information problem is that $\mathrm{MD}(q^*)$ is not written on the river. The government must estimate damage (epidemiology, hedonic house prices, contingent valuation — see [[environmental-economics/valuing-the-environment]]) and estimate the MPC and demand curves that locate $q^*$. Errors are costly, and Weitzman (1974) showed that the *relative* slopes of marginal damage and marginal abatement cost determine whether a quantity instrument (a cap) or a price instrument (a tax) has smaller expected deadweight loss when MD or MAC is uncertain. If MD is steep (a threshold, a catastrophe) and MAC is flat, a cap is more robust: being a little on the wrong side of a cliff is worse than having the wrong tax. If MD is flat (damage roughly linear) and MAC is steep, a tax is more robust.

::: quiz
Marginal damage is constant at 3; marginal abatement cost is steep and uncertain. Weitzman's comparison favours
- [ ] a quantity cap, because damage is "serious"
- [x] a tax of 3, because with flat MD the deadweight loss of a quantity error is first-order while a tax still equates MAC to 3
- [ ] zero intervention, because of uncertainty
- [ ] a subsidy to the victims
::: solution
Constant MD means the efficient tax is 3 regardless of where MAC sits. A cap set at the wrong $e$ produces a wedge between MAC and MD equal to the whole vertical gap, which is large when MAC is steep. A tax of 3 keeps $\mathrm{MAC}=3$ ex post. "Serious" damage is already in the number 3; it does not by itself favour a cap. (If MD were a vertical line at a dangerous threshold, the ranking would reverse.)
:::
:::

## The Coase theorem and its limits

::: theorem Coase theorem (efficiency claim) {#thm-coase}
If (i) property rights over the externality are well defined and tradable, (ii) parties can bargain at zero transaction cost, (iii) utility is quasi-linear (no income effects on the externality), then the bargained quantity of the externality is $q^*$, independently of which party holds the right.
:::
::: proof
The joint surplus of factory and fishery is maximised at $q^*$. With quasi-linearity that surplus is a transferable numeraire. Any disagreement point (the right assigned to one party) is a split of a smaller pie if $q \neq q^*$. Nash, Rubinstein or any bargain that exhausts gains from trade therefore selects $q^*$. Who holds the right determines the *distribution* of surplus (the factory pays the fishery, or the fishery pays the factory not to expand) but not $q^*$.
:::

Coase's 1960 article did not state a numbered theorem; Stigler named it. Coase's own emphasis was the *converse*: when transaction costs are not zero, the assignment of rights matters for efficiency as well as for distribution, and the comparison is between institutions (courts, taxes, regulation, firms) that economise on those costs differently.

Transaction costs that kill the bargain are easy to list and hard to measure: many parties (a million downstream households), hold-up and private information about MD and MAC (Myerson–Satterthwaite 1983: bilateral trade of a good with two-sided private values cannot be efficient, voluntary and budget-balanced), enforcement, and the public-good problem of paying for a negotiation when victims are many. A single fishery and a single factory on a well-monitored river is a Coasean setting; carbon dioxide in the global atmosphere is not.

::: example Bargain with numbers {#ex-coase-numbers}
A factory earns profit $16q - q^2$ (so $\mathrm{MPC}$ from profit maximisation: wait, competitive price 16? Simpler: the factory's profit is $40$ if it pollutes and $24$ if it does not. The fishery's profit is $30$ without pollution and $10$ with pollution. No other parties. Transaction costs zero. Compute joint surplus with and without pollution, the efficient rule, and the range of bargains (i) if the factory has the right to pollute, (ii) if the fishery has the right to clean water.
::: solution
Joint surplus with pollution: $40+10=50$. Without: $24+30=54$. Efficiency: no pollution (the damage $20$ exceeds the factory's gain $16$). (i) Factory has the right: status quo surplus for the factory is $40$. The fishery will pay between $16$ and $20$ to stop pollution (the factory needs at least $16$ to shut the effluent; the fishery gains $20$). (ii) Fishery has the right: status quo is no pollution. The factory would pay at most $16$ for the right to pollute; the fishery needs at least $20$. No bargain to pollute occurs. In both assignments the outcome is no pollution; the fishery's wealth is higher in (ii) by the bargained transfer that does not happen in (ii) and does happen in (i). With quasi-linearity the real allocation is the same.
:::
:::

Income effects break independence of the assignment. If the right is wealth and MD is income-elastic (a richer fishery values clean water more), assigning the right to the fishery can change $q^*$ itself. That is why [[#thm-coase]] includes quasi-linearity.

::: example A positive externality {#ex-positive}
Inverse demand (MPB) $P=16-q$, $\mathrm{MPC}=4$, marginal external benefit $\mathrm{ME}=2$ (constant). Find $q_c$, $q^*$ and the Pigouvian subsidy.
::: solution
Unregulated: $16-q=4$, $q_c=12$. Efficient: $\mathrm{MSB}=18-q=4$, $q^*=14$. Subsidy $s^*=\mathrm{ME}(q^*)=2$. The unregulated quantity is too *low*; the triangle of DWL has width $2$ and height $2$, so $\mathrm{DWL}=2$.
:::
:::

::: intuition Pigou and Coase are not enemies
Pigou prices a missing market; Coase opens the missing market as a bargain over a right. When the bargain is cheap, the tax is redundant (and a badly set tax can prevent the bargain from reaching $q^*$). When the bargain is expensive, a tax, a cap, a standard or a merger of the two firms (bringing the externality inside a single maximand — Coase's 1937 theory of the firm as well as 1960) is the remaining menu. The positive question is the size of transaction costs; the normative question is which imperfect instrument minimises the sum of remaining DWL and administrative cost.
:::

## Taxes, permits, standards and liability

Four instruments recur.

**Pigouvian tax.** Hits the right marginal price if $t=\mathrm{MD}(q^*)$. Raises revenue. Does not require the government to allocate rights among firms. Uncertain MAC means uncertain $q$.

**Tradable permits (cap-and-trade).** Hits a chosen $q$ (the cap). Tradability equalises MAC across firms, which a uniform standard does not. The initial allocation of permits is a lump-sum transfer (grandfathering versus auction) and, with competitive permit markets and no income effects, does not change efficiency. Auctioned permits are equivalent to a tax in the certainty model; they differ under uncertainty (Weitzman) and under political constraints.

**Standards and technology mandates.** A maximum $e$ per firm, or a required filter. Without tradability, firms with different MAC do not equalise, so a given $e_{\text{total}}$ is achieved at higher cost. Often used when $e$ is hard to meter (a construction-site practice) or when a tax is politically blocked.

**Liability and injunctions.** A court that makes the factory pay actual damage is a Pigouvian tax assessed after the fact; an injunction is a cap of zero unless a bargain (Coase) lifts it. Strict liability versus negligence changes care but also activity levels (Shavell 1980). Legal systems are part of the instrument menu, not an alternative to economics.

Second-best caveats. If the polluting good is already taxed for revenue, the Pigouvian formula is not just $\mathrm{MD}(q^*)$: the revenue-raising Ramsey tax and the externality tax interact (Sandmo 1975). If there is market power, a monopolist already undersupplies, and a Pigouvian tax on a monopolist who pollutes can overshoot (Buchanan 1969). If labour is taxed, the "double dividend" claim that green taxes both correct externalities and reduce the DWL of labour taxes is delicate: the green tax itself raises the cost of living and can worsen the labour-market distortion (Bovenberg and de Mooij 1994). Those are not reasons to ignore externalities; they are reasons to use the right relative prices in a model with more than one distortion.

::: application Sulphur dioxide in the United States
The 1990 US Clean Air Act Amendments created a cap-and-trade system for sulphur dioxide from power plants. The cap cut emissions by about 50 per cent relative to 1980 by 2007; estimated average abatement costs were substantially below ex-ante engineering forecasts, and permit prices were well below the worst-case numbers used in the legislative debate (Schmalensee and Stavins, *Journal of Economic Perspectives*, 2013). That is evidence that tradability equalises MAC and that MAC curves are not known in advance — Weitzman's information problem in the field. It is not, by itself, a ranking of taxes against permits for carbon dioxide, whose damages are global and persistent.
:::

## Evidence

- **Estimates of MD are wide.** The US EPA's central estimate of the social cost of carbon in 2023 analysis was of the order of USD 190 per tonne of CO$_2$ (EPA, 2023, using a 2 per cent near-term discount rate), against earlier central estimates around USD 51 (US Interagency Working Group, 2021, 3 per cent). The range is a discount-rate and damage-function dispute, not a rounding error; see [[environmental-economics/climate-economics]]. For local air pollution, Deryugina, Heutel, Miller, Molitor and Reif (2019, *American Economic Review*) use quasi-random wind to estimate that a reduction in US PM$_{2.5}$ has large mortality benefits.
- **Instruments change quantities.** The US SO$_2$ programme above; the EU Emissions Trading System, whose permit price rose from near zero in the surplus years of the early 2010s to tens of euros per tonne in the 2020s (European Commission, EUA price series); British Columbia's carbon tax from 2008, studied by Murray and Rivers (2015) and later papers, with modest reductions in emissions intensity and no clearly large negative employment effect in the aggregate studies. Effect sizes differ by identification strategy; there is no single elasticity of "pollution" to "a tax".
- **Coasean bargains happen when parties are few.** Agricultural nuisance disputes, fishery cooperatives, and some river-basin agreements look Coasean. Global climate and plastic-laden oceans do not: $n$ is large, exclusion is impossible, and MD is disputed.

::: history
A. C. Pigou's *The Economics of Welfare* (1920) distinguished marginal private and social net products and proposed taxes and bounties. Frank Knight (1924) and later Pigou debated congested roads. Ronald Coase, "The Problem of Social Cost" (*Journal of Law and Economics*, 1960), shifted the question to transaction costs and rights. William Baumol and Wallace Oates (1971, 1975) built the modern Pigouvian apparatus for the environment. Martin Weitzman, "Prices vs. Quantities" (*Review of Economic Studies*, 1974), compared instruments under uncertainty. J. H. Dales (1968) proposed tradable pollution permits; the US SO$_2$ market (1990) was the large-scale test.
:::

## Where this leads

Public goods ([[public-economics/public-goods]]) are the polar case in which the *good itself* is the externality. Environmental economics takes the instruments of this chapter to climate, fisheries and non-renewable resources. Tax incidence ([[public-economics/tax-incidence]]) determines who is poorer after a Pigouvian tax; the efficiency-cost chapter ([[public-economics/efficiency-costs-of-taxation]]) measures the triangle we computed as $50/9$. Optimal taxation ([[public-economics/optimal-taxation]]) puts Pigouvian taxes beside Ramsey taxes when the government also needs revenue.

::: summary
- An externality is an unpriced technological effect ([[#def-externality]]). Efficiency requires $\mathrm{MSB}=\mathrm{MSC}$ ([[#def-msc-msb]]).
- Unregulated competitive output is too high for a negative externality ([[#prop-unregulated]]). The Pigouvian tax equals marginal damage at $q^*$ ([[#thm-pigou]]).
- Tax the damaging *activity* (effluent), not a crude proxy, when abatement is possible.
- The Coase theorem ([[#thm-coase]]) says zero transaction costs and quasi-linearity make the assignment of rights distributional, not allocative. With transaction costs the assignment matters and Pigou, Coasean bargain, firms and courts are competing institutions.
- Taxes, tradable caps, standards and liability differ under uncertainty (Weitzman), heterogeneity of MAC, and politics. Second-best interactions with other taxes modify the formula.
- Evidence: instruments move quantities; MD estimates for carbon span a wide range; Coasean bargains are local.
:::

## Exercises

::: exercise Sign the failure {level=1}
For each, say whether the unregulated competitive quantity is too high, too low, or not a technological externality: (a) a well-kept front garden; (b) a factory bidding up wages in a competitive labour market; (c) second-hand smoke in a bar; (d) a patented idea used by many firms without a licence (ignore R&D incentives).
::: solution
(a) Positive externality: too low. (b) Pecuniary: not a technological externality; first theorem still applies. (c) Negative: too high. (d) The idea is non-rival; unlicensed use is efficient *ex post* (MSB includes all users) but wrecks the *ex ante* incentive to invent — a public-good / dynamic-externality problem, not a simple "too high" static diagnosis. Static unregulated use is not too low; R&D is.
:::
:::

::: exercise Compute $q^*$ {level=1 check="6"}
Inverse demand $\mathrm{MPB}=14-q$, $\mathrm{MPC}=2$, $\mathrm{MD}=q$. Find the efficient quantity $q^*$. (Enter $q^*$.)
::: solution
Efficiency: $14-q = 2 + q$, so $12 = 2q$ and $q^* = 6$. Unregulated would have been $14-q=2$, $q_c=12$.
:::
:::

::: exercise Pigouvian tax {level=1 check="5"}
In [[#ex-factory]], what is the Pigouvian tax $t^*$? (Enter the tax per unit.)
::: solution
$t^* = \mathrm{MD}(q^*) = 5$.
:::
:::

::: exercise Deadweight-loss triangle {level=1 check="8"}
$\mathrm{MSB}=16-q$, $\mathrm{MPC}=4$, $\mathrm{MD}=4$ (constant). Compute the deadweight loss of unregulated competition. (Enter the DWL.)
::: solution
Unregulated: $16-q=4$ so $q_c=12$. Efficient: $16-q=8$ so $q^*=8$. Marginal damage is a rectangle-triangle of height $4$ and width $4$, hence $\mathrm{DWL}=\tfrac12\times 4\times 4=8$. (Equivalently, $\tfrac12 \mathrm{MD}^2$ when demand has slope $-1$ and MPC is flat.)
:::
:::

::: exercise Incidence of a Pigouvian tax {level=2}
In [[#ex-factory]], after the tax $t^*=5$, buyers pay $15$ and sellers receive $10$. Who is "bearing" the tax, and why does that not undermine the efficiency argument?
::: solution
Relative to the unregulated price $40/3\approx 13.33$, buyers pay $15-40/3=5/3$ more and sellers receive $40/3-10=10/3$ less. Incidence is shared (sellers more, because demand is relatively more elastic than supply at these linear curves). Efficiency does not require that the *statutory* payer lose surplus; it requires that the generator face a *marginal* cost equal to MSC. The $25$ of revenue is a transfer. Distributional effects can be undone, in the second-welfare-theorem spirit, by lump-sum recycling of the revenue — if those lump sums are available.
:::
:::

::: exercise Two firms, tradable permits {level=2}
Two firms abate amounts $a_i$, with $\mathrm{MAC}_1 = a_1$ and $\mathrm{MAC}_2 = 2a_2$. Unabated emissions are $10$ each. A cap of $10$ total emissions is allocated equally ($5$ permits each) and traded. Find the permit price, each firm's abatement, and the cost saving relative to a uniform standard of $5$ units of remaining emissions each (hence $a_i=5$ each).
::: hint
Tradability equalises MAC. Remaining emissions $e_i = 10 - a_i$, $e_1+e_2=10$.
:::
::: solution
Equalised MAC: $a_1 = 2a_2 = p$. Also $a_1+a_2 = (10+10)-10=10$. Then $2a_2 + a_2 =10$, $a_2=10/3$, $a_1=20/3$, $p=20/3$. Costs: $\int \mathrm{MAC}$: $C_1=\tfrac12 a_1^2 = \tfrac12 (400/9)=200/9$, $C_2=\tfrac12 \cdot 2 \cdot a_2^2 = (10/3)^2=100/9$, total $300/9=100/3$. Uniform standard $a_i=5$: $C_1=\tfrac12\cdot 25=12.5$, $C_2=25$, total $37.5=75/2=337.5/9 > 300/9$. Saving $37.5-33.\overline{3}=4.\overline{1}$. Firm 1 (low MAC) abates more and sells permits; firm 2 buys.
:::
:::

::: exercise Coase with a number {level=2 check="16"}
A factory gains $16$ from polluting; a fishery loses $20$ if the factory pollutes. Transaction costs are zero and utility is quasi-linear. If the factory has the right to pollute, what is the smallest payment from fishery to factory that the factory will accept to stop? (Enter that number.)
::: solution
The factory must be at least as well off as when polluting, so it accepts any payment $\ge 16$. The fishery will pay up to $20$. The bargaining set is $[16,20]$; the smallest the factory accepts is $16$.
:::
:::

::: exercise Weitzman in a picture {level=2}
Marginal damage is $\mathrm{MD}=10$ (flat). Marginal abatement cost is $\mathrm{MAC}= \theta a$ with $\theta$ equally likely to be $1$ or $3$. The planner who does not observe $\theta$ can set a tax or a cap. Which instrument achieves $\mathrm{MAC}=\mathrm{MD}$ ex post, and which cannot?
::: solution
A tax of $10$ implements $a=10/\theta$, hence $\mathrm{MAC}=\theta a=10=\mathrm{MD}$ in both states. A cap must pick a single $a$ (say the expected-efficient $a$: efficient $a$ is $10$ when $\theta=1$ and $10/3$ when $\theta=3$; a single cap cannot hit both). Expected DWL is therefore zero under the tax and positive under any cap. This is Weitzman for flat MD.
:::
:::

::: exercise Monopoly plus externality {level=3}
Inverse demand $P=12-q$, a monopolist with $\mathrm{MPC}=2$, and $\mathrm{MD}=2$ (constant). Compare unregulated monopoly quantity with the social $q^*$, and say whether a Pigouvian tax of $2$ on the monopolist restores $q^*$.
::: hint
Monopoly: $MR=12-2q=\mathrm{MPC}$. Social: $P=\mathrm{MPC}+\mathrm{MD}$.
:::
::: solution
Unregulated monopoly: $12-2q=2$, $q_m=5$, $P=7$. Social: $12-q=4$, $q^*=8$. Monopoly already produces *less* than $q^*$ ($5<8$); the output contraction of market power overcompensates the expansion from the externality in these numbers. A Pigouvian tax of $2$ makes the monopolist set $12-2q=4$, so $q=4$, which is even further from $8$. Buchanan's (1969) point: stacking a first-best Pigou tax on a non-competitive market need not help. A subsidy to output, or a tax smaller than MD, or regulation of both price and pollution, is the second-best direction here. (Other numbers reverse the ranking: if MD were $8$, $q^*$ would be $2$ and $q_m=5$ would be too high.)
:::
:::

::: exercise Many victims {level=3}
One factory, $n$ identical downstream households. Each household would gain $v$ from a shutdown of the effluent; the factory would lose $\pi$ from shutting down. Bargaining requires that *every* household participate in a contract, and each household can hold out. Explain why the Coasean prediction of [[#thm-coase]] fails for large $n$ even if a court has assigned the right to the factory, and name the public-goods problem involved.
::: solution
Shutdown is a public good for the households: non-rival (all enjoy it) and, without exclusion of hold-outs, non-excludable. Each household's Nash contribution toward the bribe $\pi$ is too small by the same logic as [[public-economics/public-goods#prop-nash-under]]. Hold-out (each waits for others to pay) is free riding. Transaction costs therefore rise with $n$, condition (ii) of [[#thm-coase]] fails, and pollution may continue even though $nv>\pi$. A Pigouvian tax, a regulation, or a class-action institution that solves the hold-out is the remaining instrument.
:::
:::

::: exercise Sandmo's second best {level=3}
A commodity $q$ is polluting with constant $\mathrm{MD}=t_E$ and is also a Ramsey-taxable good. In a model with a revenue requirement and no lump-sum tax, the optimal tax on $q$ is not simply $t_E$. In one paragraph, using the additive property of Sandmo (1975), write the form of the tax and interpret.
::: solution
Sandmo's additive property: the optimal tax on a polluting good is the sum of a Ramsey term (inversely related to the good's demand elasticity, as in [[public-economics/optimal-taxation]]) and a Pigouvian term equal to marginal damage. Formally, $t_q = t_q^{\mathrm{Ramsey}} + \mathrm{MD}$, under separability assumptions that keep the externality out of the other first-order conditions. Interpretation: the government uses $q$ both as a revenue base and as the handle on an externality; it should not set $t_q=\mathrm{MD}$ if it still needs revenue and cannot levy lump-sum taxes, nor should it ignore $\mathrm{MD}$ in the Ramsey formula. The "double dividend" is not automatic, because the Ramsey term already exploits the same base.
:::
:::
