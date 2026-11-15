A lighthouse does not get used up when an extra ship sees it, and the keeper cannot cheaply turn the beam off for ships that have not paid. A loaf of bread is the opposite on both counts. The economic distinction is between **public goods** and **private goods**, and it is a distinction of technology and of property rights, not of whether the good is supplied by a ministry. Many things governments supply are private (food stamps, hip replacements); some public goods are supplied privately (broadcast television financed by advertising, open-source software, a neighbourhood watch). This chapter asks when voluntary provision of a non-rival good is too small, what "too small" means, and why asking people how much they value the good does not, by itself, solve the problem.

The normative benchmark is Paul Samuelson's 1954 condition: the sum of marginal rates of substitution equals the marginal rate of transformation. The positive benchmark is Nash provision by private individuals, which is typically smaller. Lindahl prices would implement Samuelson if they could be charged. They generally cannot, because the personalised prices require information that people will not volunteer. We will keep those three ideas — Samuelson, Nash, Lindahl — in separate boxes.

## Rivalry, exclusion and a taxonomy

::: definition Rivalry and excludability {#def-rival-exclude}
A good is **rival** if one person's consumption of a unit reduces the amount available to others. It is **excludable** if people who do not pay can be prevented from consuming it at reasonable cost. A **pure public good** is non-rival and non-excludable. A **pure private good** is rival and excludable.
:::

Four combinations are then a taxonomy, not a law of nature:

|  | Excludable | Non-excludable |
|---|---|---|
| Rival | Private goods (bread, shoes) | Common-pool resources (high-seas fisheries, congested unpriced roads) |
| Non-rival | Club goods (a streaming service, a patent-protected idea, a toll road below capacity) | Pure public goods (basic research results, national defence, a radio signal) |

**Club goods**, named by James Buchanan (1965), are non-rival (or only mildly rival) among members and excludable at the club's gate. **Common-pool resources** are rival but hard to exclude; Elinor Ostrom's work (1990) showed that local rules can sometimes govern them without either open access or a ministry. Congestion moves a good down the table: an empty road is a public good; a jammed road is a common pool. Digital goods have near-zero marginal cost, so they are non-rival, but exclusion is a policy choice (a paywall, a copyright term), not a physical fact.

::: warning Publicly supplied is not public
Calling a good a "public good" because a government supplies it confuses the taxonomy with an institutional fact. Education is largely rival (a seat in a classroom) and excludable (a school door); the case for public *finance* of education is about externalities, credit constraints and distribution, treated in [[public-economics/redistribution]] and in [[labour-economics/human-capital]], not about non-rivalry. Conversely, a privately run encrypted messaging protocol can be a public good in the Samuelson sense.
:::

## The Samuelson condition

There is a private numeraire $x$ (a composite consumption good) and a public good $G$, produced from the numeraire at cost $c(G)$, with $c' > 0$, $c'' \ge 0$. Household $i$ has preferences $u^i(x_i, G)$ that are increasing and differentiable, and the resource constraint is $\sum_i x_i + c(G) = \sum_i m_i$, where $m_i$ is $i$'s endowment of the numeraire. Because $G$ is non-rival, the *same* $G$ enters every utility function.

::: theorem Samuelson condition {#thm-samuelson}
A Pareto-efficient interior allocation of a pure public good satisfies

$$
\sum_{i=1}^{n} \mathrm{MRS}^i_{G x} = c'(G),
$$ {#eq-samuelson}

that is, $\sum_i \bigl(\partial u^i/\partial G\bigr)\big/\bigl(\partial u^i/\partial x_i\bigr) = \mathrm{MRT}_{G x}$. Assumptions: differentiable strictly increasing preferences, convex technologies, interior $x_i > 0$, and $G$ a pure public good in the sense of [[#def-rival-exclude]].
:::
::: proof
Maximise $u^1$ subject to $u^i \ge \bar u^i$ for $i \ge 2$ and the resource constraint. The Lagrangian is

$$
u^1(x_1, G) + \sum_{i\ge 2} \lambda_i\bigl(u^i(x_i, G) - \bar u^i\bigr) + \mu\Bigl(\sum_i m_i - \sum_i x_i - c(G)\Bigr).
$$

First-order conditions: $\partial u^1/\partial x_1 = \mu$, $\lambda_i \partial u^i/\partial x_i = \mu$ for $i \ge 2$, and

$$
\frac{\partial u^1}{\partial G} + \sum_{i\ge 2} \lambda_i \frac{\partial u^i}{\partial G} = \mu c'(G).
$$

Dividing the last equation by $\mu$ and substituting $\lambda_i/\mu = 1/(\partial u^i/\partial x_i)$ and $1/\mu = 1/(\partial u^1/\partial x_1)$ yields [[#eq-samuelson]]. The left-hand side is the vertical sum of inverse-demand (willingness-to-pay) curves; the right-hand side is marginal cost.
:::

For a private good the same proof gives $\mathrm{MRS}^i = \mathrm{MRT}$ *for each $i$ separately*: you do not add willingness to pay, because the unit $i$ consumes is not available to $j$. That is the whole difference. Graphically, market demand for a private good is a *horizontal* sum of quantities at a given price; "demand" for a public good is a *vertical* sum of prices at a given quantity.

::: widget plot
f: a*(10-x); (1-a)*(10-x); 10-x; 4
sliders: a=0.5:0.1:0.9
x: 0, 10
y: 0, 12
labels: \text{MRS}_1; \text{MRS}_2; \text{sum of MRS}; \text{MC}
caption: Two households, quasi-linear preferences. The Samuelson quantity is where the vertical sum of MRS curves meets marginal cost. Move $a$ to shift how the benefit is split: the efficient $G$ does not change in this quasi-linear example (the sum is always $10-x$), but the Lindahl shares would. Compare with a private good, where you would add quantities, not heights.
:::

::: example Two logarithmic consumers {#ex-log-samuelson}
Two people have $u^i = \ln x_i + \ln G$ and endowments $m_1 = m_2 = 10$. The public good is produced one-for-one from the numeraire, so $c(G) = G$. Find the Samuelson quantity and a pair of private consumptions that support it.
::: solution
$\mathrm{MRS}^i = x_i/G$. Samuelson: $(x_1 + x_2)/G = 1$. Resource: $x_1 + x_2 + G = 20$. Substituting, $(20 - G)/G = 1$, so $20 - G = G$ and $G = 10$. Then $x_1 + x_2 = 10$. Any split of the remaining 10 units of numeraire is compatible with efficiency; the symmetric one is $x_1 = x_2 = 5$. Check: $\mathrm{MRS}^1 + \mathrm{MRS}^2 = 5/10 + 5/10 = 1 = c'$.
:::
:::

If the public good is discrete — a bridge, either built or not — the condition becomes: build if and only if $\sum_i \mathrm{MB}_i \ge MC$, the cost–benefit test. That test is Kaldor–Hicks unless compensation is actually paid; it is a Pareto test only with compensation or with quasi-linear utility (when income effects do not disturb the ranking).

## Private provision and free riding

Now drop the planner. Each household chooses a non-negative contribution $g_i$, $G = \sum_j g_j$, and $x_i = m_i - g_i$. Household $i$ takes the others' contributions $G_{-i}$ as given (Nash). This is the model of Bergstrom, Blume and Varian (1986).

::: proposition Nash private provision is typically too small {#prop-nash-under}
In the interior Nash equilibrium of voluntary provision, household $i$ satisfies $\mathrm{MRS}^i_{Gx} = 1$ (when $c'(G) = 1$), not the Samuelson sum. With identical households and a normal public good, equilibrium $G$ is increasing in $n$ but per-person $G$ is smaller than the Samuelson level, and the gap widens with $n$.
:::
::: proof
Household $i$ maximises $u^i(m_i - g_i,\, g_i + G_{-i})$ over $g_i \ge 0$. An interior first-order condition is $-\,u_x^i + u_G^i = 0$, or $\mathrm{MRS}^i = 1$. Samuelson requires the *sum* of MRS to equal 1. With identical agents the Nash condition is $\mathrm{MRS} = 1$ for each, so $n \times \mathrm{MRS} = n > 1$ at the Nash $G$ if MRS is decreasing in $G$ along the chosen path — the Samuelson $G$ is larger. (Corner solutions: only the highest-demand agents contribute; see [[#ex-three-player]].)
:::

The name for the gap is **free riding**: $i$ enjoys $j$'s contribution and so contributes less than the social marginal benefit warrants. It is a Nash best response, not a moral failing. Experimental public-goods games (Isaac, Walker and others from the 1980s onward; surveys in Ledyard 1995 and Chaudhuri 2011) find contributions above the selfish Nash prediction in one-shot play, declining toward Nash in repeated play without punishment, and recovering when subjects can punish. The qualitative prediction — underprovision relative to Samuelson, worse in large groups — survives.

::: example Nash versus Samuelson with logs {#ex-nash-log}
Continue [[#ex-log-samuelson]]: $u^i = \ln x_i + \ln G$, $m_i = 10$, $c(G) = G$, two people. Find the symmetric Nash $G$ and compare it with Samuelson's $G = 10$.
::: solution
Player 1's first-order condition: $x_1 = G$ (because $\mathrm{MRS} = x_1/G = 1$). Symmetric: $x_1 = x_2 = G$ and $x_1 + x_2 + G = 20$, so $3G = 20$ and $G = 20/3 \approx 6.67 < 10$. Each contributes $g_i = 10 - 20/3 = 10/3$ and consumes $x_i = 20/3$. Free riding here is not that someone contributes *nothing*; it is that both contribute too little. Utilities: Nash $u = \ln(20/3) + \ln(20/3) = 2\ln(20/3)$; Samuelson (symmetric) $u = \ln 5 + \ln 10 = \ln 50$. Since $50 > (20/3)^2 \approx 44.4$, both are better off at the symmetric Samuelson point.
:::
:::

::: example Only the keenest contribute {#ex-three-player}
Three people, $u^i = a_i \ln G + x_i$ with $(a_1, a_2, a_3) = (1, 2, 3)$, quasi-linear, $c(G) = G$, and large endowments. Find Nash and Samuelson $G$.
::: solution
Quasi-linearity shuts down income effects. Samuelson: $(1+2+3)/G = 1$, so $G = 6$. Nash: player $i$'s interior condition is $a_i/G = 1$, or $G = a_i$. That cannot hold for all three. The unique Nash has only player 3 contributing, $G = 3$, and players 1 and 2 contributing zero (their MRS at $G = 3$ is $a_i/3 \le 1$). This is the **neutrality** extreme: the person who cares most provides the good; the others free-ride completely. Samuelson wants $G = 6$.
:::
:::

::: quiz
In the two-person logarithmic example, a small matching grant: the government adds $0.5$ units of $G$ for every unit a private person contributes, financed by a lump-sum tax of whatever the match costs. At the new Nash, total $G$ (private plus match) will be
- [ ] $10$, the Samuelson level, because the match "crowds in" giving
- [x] still $20/3$, if incomes are adjusted lump-sum, by the crowding-out (neutrality) property of this model
- [ ] $20$, because both the match and the original contributions add
- [ ] zero, because people stop giving
::: solution
With Cobb–Douglas (or more generally with identical homothetic preferences and interior contributions), Bergstrom–Blume–Varian neutrality says that a lump-sum-financed public contribution is offset one-for-one by private cuts, and a match-plus-lump-sum can be undone by a change in contributions that restores the original $G$ and the original private consumption. In the logarithmic example the Nash condition remains $x_i = G$ and the resource constraint is unchanged, so $G$ stays $20/3$. Real matching grants can matter when some people are at a corner ($g_i = 0$), when the grant is financed distortively, or when warm-glow (Andreoni 1989) makes $g_i$ itself an argument of utility. The textbook interior model crowds out.
:::
:::

A related positive result is **Warr neutrality** (Warr 1983): small redistributions among interior contributors do not change $G$. The public good is a common pool of contributions; who is richer among the contributors is washed out. Redistribution *to* a non-contributor, or a redistribution large enough to change the set of contributors, does change $G$.

## Lindahl prices and the revelation problem

Erik Lindahl (1919) asked whether personalised prices could implement [[#eq-samuelson]] as a market equilibrium.

::: definition Lindahl equilibrium {#def-lindahl}
A **Lindahl equilibrium** is a list of personalised prices $(\tau_1, \dots, \tau_n)$ and a level $G$ such that $\sum_i \tau_i = c'(G)$ and each $i$ would choose that same $G$ when facing $\tau_i$ as a per-unit price (that is, $\mathrm{MRS}^i_{Gx} = \tau_i$).
:::

::: proposition Lindahl implements Samuelson {#prop-lindahl}
Every Lindahl equilibrium satisfies the Samuelson condition, and under standard convexity every Samuelson allocation is a Lindahl equilibrium for suitable $(\tau_i)$ and lump-sum adjustments of income.
:::
::: proof
Summing $\mathrm{MRS}^i = \tau_i$ and using $\sum \tau_i = c'(G)$ gives [[#eq-samuelson]]. Conversely, set $\tau_i = \mathrm{MRS}^i$ at the Samuelson allocation; the sum of $\tau_i$ is $c'(G)$ by Samuelson, and each household's first-order condition holds by construction.
:::

In [[#ex-log-samuelson]] the symmetric Lindahl prices are $\tau_1 = \tau_2 = 1/2$. Each household then chooses $G$ to maximise $\ln(m_i - \tau_i G) + \ln G$. The first-order condition is $\tau_i / x_i = 1/G$, so $x_i = \tau_i G$. With $\tau_i = 1/2$ and $m_i = 10$, $10 - \tfrac12 G = \tfrac12 G$ so $G = 10$, as required.

The implementation fails as a *mechanism* because $\tau_i$ depends on $i$'s preferences. If you are asked "what is your $\tau_i$?" and your report determines your share of the cost, you understate. If your report determines whether the good is provided but not your share, you overstate. This is the **preference-revelation problem**. Mechanism design (Groves 1973; Clarke 1971; Green and Laffont 1979) produces VCG-style mechanisms that make truth-telling dominant for a public good when utility is quasi-linear, at the cost of a budget imbalance. Without quasi-linearity, Clarke–Groves and incentive compatibility, Pareto efficiency and budget balance cannot be combined in general (the Green–Laffont and Hurwicz impossibility results). That is why, in practice, public goods are voted on, not priced à la Lindahl, and why the next-best instruments are rough: tax finance plus a quantity chosen by a legislature, or a club with exclusion.

::: example Lindahl arithmetic {#ex-lindahl-num}
Two people, $\mathrm{MRS}_1=12-G$, $\mathrm{MRS}_2=8-G$, $c'(G)=4$. Find Samuelson $G$ and the Lindahl prices.
::: solution
Vertical sum $20-2G=4$ gives $G=8$. Then $\tau_1=12-8=4$ and $\tau_2=8-8=0$. Person 2 is at a corner: they pay nothing, and Samuelson still holds because $\tau_1+\tau_2=4=c'$. (If $c'$ were $6$, $G=7$, $\tau_1=5$, $\tau_2=1$.) A zero Lindahl price is the signal that one person's MRS has already hit zero.
:::
:::

::: intuition Vertical sums are not market demand
A demand curve for bread can be estimated from purchases because buyers pay a common price and reveal quantity. A vertical sum of willingness-to-pay curves for a seawall cannot: there is no common price and no purchase. Contingent-valuation surveys try to elicit the heights of those curves; they inherit the incentive problem and a list of hypothetical-bias problems familiar in [[environmental-economics/valuing-the-environment]]. Revealed-preference substitutes — Tiebout sorting, referenda, hedonic prices of houses near parks — are the applied tools.
:::

## Impure public goods, clubs and matching

Few goods are pure. Three extensions cover most applications.

**Congestion.** Let utility depend on $G$ and on $n$, the number of users. The Samuelson condition acquires a congestion term: the sum of MRS equals marginal production cost *plus* the sum of marginal congestion costs. A toll that equals marginal congestion implements the condition for a road (Pigou, Knight, Walters; see [[public-economics/externalities]]).

**Clubs.** Buchanan (1965): a club chooses facility size $G$ and membership $n$ to maximise a member's utility, with cost sharing. The first-order conditions are a Samuelson condition among members and an optimal-membership condition (the marginal member's congestion equals the cost saving from spreading the outlay). Exclusion is essential; without it the club cannot collect and cannot limit $n$.

**Warm glow and matching.** If $u^i$ depends on $g_i$ as well as on $G$ (Andreoni's warm-glow giving), crowding-out is incomplete and matching grants can raise $G$. Charitable giving in the United States is of the order of 2 per cent of GDP in ordinary years (Giving USA reports; the figure fluctuates), far from zero, which the pure Nash model with large $n$ would suggest. Warm glow, social pressure, and the fact that many "public" goods are local clubs are the usual explanations. None of them makes the Samuelson condition obsolete as a benchmark; they change the positive comparative statics of private provision.

::: application Vaccination and herd immunity
A vaccine is rival as a dose, but the *externality* of reduced transmission is a public good (non-rival protection of others). Private demand stops where private MRS equals the private price; Samuelson would add the marginal infection-reduction for others. That is why under-vaccination relative to the herd-immunity threshold is the predicted Nash outcome when infection externalities are not priced, and why the policy instruments are subsidies, mandates, or regulation rather than a Lindahl price on "being infectious". The COVID-19 vaccine campaigns of 2021–22 (WHO and national health accounts) were in this sense public-good policy. Whether a mandate is warranted is a normative question that trades the externality against liberty and against the costs of errors; the positive claim is only that private markets for doses do not add the external MRS.
:::

## Evidence

- **Laboratory public-goods games.** In the linear voluntary-contribution mechanism, the dominant strategy with selfish money-maximising players is to contribute nothing when the internal return is below one and the social return is above one. Mean contributions typically start around 40–60 per cent of the endowment and fall toward 10–20 per cent over ten rounds without punishment (Ledyard 1995; Fehr and Gächter 2000, *American Economic Review*, show that adding costly punishment sustains cooperation). These are stylised facts about a design, not estimates of the demand for national defence.
- **Crowding-out of charity.** Kingma (1989) and later studies using shocks to government grants to radio stations and other non-profits find partial crowding-out, often of the order of 20–70 cents on the dollar, not the 100 cents of the interior Nash model. Andreoni and Payne (2003, 2011) show that part of the crowd-out is a reduction in fundraising effort rather than in private demand.
- **Local public goods and sorting.** Rhode and Strumpf (2003) and a large Tiebout literature find that US municipalities are more homogeneous than random assignment would produce, consistent with sorting on local public goods and taxes, though the conditions for Tiebout *efficiency* (many jurisdictions, full mobility, no spillovers, no scale economies) are not met. We return to this in [[public-economics/public-choice]].
- **Global public goods.** Climate-change mitigation, pandemic preparedness and basic research are public goods at a scale where $n$ is the number of countries. Nordhaus (2015) and the climate-club literature argue that voluntary provision (the Nash of the Paris pledges) is far below Samuelson; that is an externality-and-public-good problem taken up in [[environmental-economics/climate-economics]].

::: history
Erik Lindahl's 1919 dissertation stated personalised cost shares for a public good. Paul Samuelson's "The Pure Theory of Public Expenditure" (*Review of Economics and Statistics*, 1954) wrote the first-order condition as a sum of MRS and emphasised that no decentralised market would reveal the terms. Charles Tiebout (1956) offered mobility among localities as a revelation device for *local* public goods. Mancur Olson's *The Logic of Collective Action* (1965) argued that large groups undersupply public goods unless selective incentives exist. Bergstrom, Blume and Varian (1986) gave the modern Nash model of private provision. Clarke (1971) and Groves (1973) constructed dominant-strategy mechanisms for quasi-linear public-good problems; Green and Laffont (1979) mapped the limits.
:::

## Where this leads

Externalities ([[public-economics/externalities]]) are the other allocation-branch failure: a private good whose *by-product* is non-rival. Social insurance ([[public-economics/social-insurance]]) treats risk-pooling as a public or club problem when selection unravels private markets. Optimal taxation ([[public-economics/optimal-taxation]]) asks how to finance $G$ when lump-sum taxes are unavailable — the second-best companion of Samuelson. Public choice ([[public-economics/public-choice]]) asks what quantity of $G$ voting actually delivers, and whether Tiebout sorting is a way out.

::: summary
- A pure public good is non-rival and non-excludable ([[#def-rival-exclude]]). Public *supply* is an institutional fact, not the definition.
- Efficiency requires the Samuelson condition: the vertical sum of MRS equals marginal cost ([[#thm-samuelson]]).
- Nash private provision equates each contributor's own MRS to marginal cost and therefore undersupplies ([[#prop-nash-under]]). Free riding is a best response.
- Lindahl prices implement Samuelson ([[#prop-lindahl]]) but are not incentive-compatible as a reporting game. Revelation is the obstacle.
- Clubs, congestion, warm glow and matching change the positive comparative statics; they do not abolish the Samuelson benchmark.
- Evidence: laboratory underprovision (with a cooperation residual), partial crowding-out of charity, imperfect Tiebout sorting, and severe underprovision of global public goods.
:::

## Exercises

::: exercise Classify the good {level=1}
Classify each as private, public, club, or common-pool, noting any dependence on congestion or policy: (a) a streaming-film subscription; (b) tuna in the open ocean; (c) a national statistical agency's published GDP figure; (d) a municipal swimming pool; (e) a dose of antibiotic.
::: solution
(a) Club: non-rival at the margin (up to server capacity) and excludable by password. (b) Common-pool: rival fish, costly exclusion on the high seas. (c) Pure public: non-rival and, once published, non-excludable. (d) Club or congested public: excludable by a gate, rival when crowded. (e) Private as a dose (rival, excludable), with a *negative externality* of resistance that is a public bad — classification of the dose and of the resistance are different objects.
:::
:::

::: exercise Vertical versus horizontal {level=1}
Inverse demands for a private good are $p = 12 - q_1$ and $p = 8 - q_2$; for a public good the same functions are individual MRS. Marginal cost is 4 in both cases. Compute the efficient total quantity of the private good and of the public good.
::: solution
Private: horizontal sum. For $p$ between 8 and 12 only person 1 buys, $q = 12 - p$; for $p < 8$, $q = 12-p+8-p = 20-2p$. Set $p = 4$: both buy, $q = 20 - 8 = 12$. Public: vertical sum of MRS at a common $G$. $\mathrm{MRS}_1 = 12-G$ (for $G \le 12$), $\mathrm{MRS}_2 = 8-G$ (for $G \le 8$). Sum $= 20 - 2G$ for $G \le 8$. Set equal to 4: $20-2G=4$, $G=8$. (At $G=8$, person 2's MRS is 0, so the sum for $G>8$ is just $12-G$, which is already below 4. So $G=8$ is the solution.) Efficient private quantity 12, efficient public quantity 8.
:::
:::

::: exercise Logs, three people {level=1 check="15"}
Three identical people, $u = \ln x_i + \ln G$, $m_i = 10$, $c(G)=G$. What is the Samuelson $G$? (Enter the efficient quantity.)
::: solution
$\sum \mathrm{MRS} = (x_1+x_2+x_3)/G = 1$ and $\sum x_i + G = 30$, so $(30-G)/G = 1$, $G=15$.
:::
:::

::: exercise Nash with three logs {level=2 check="7.5"}
In the same economy as the previous exercise, what is symmetric Nash $G$? (Enter Nash quantity.)
::: solution
Each has $x_i = G$, so $3G + G = 30$, $G = 7.5$. Underprovision relative to 15.
:::
:::

::: exercise Quasi-linear Samuelson {level=2}
Utilities $u^i = a_i \ln G + x_i$ with $a_1=2$, $a_2=4$, $c(G)=2G$ (so $c'=2$), large incomes. Find Samuelson $G$ and Lindahl prices $(\tau_1, \tau_2)$.
::: hint
Samuelson: $(a_1+a_2)/G = c'$. Lindahl: $\tau_i = a_i/G$ and $\tau_1+\tau_2=c'$.
:::
::: solution
$(2+4)/G = 2$ so $G = 3$. Then $\tau_1 = 2/3$, $\tau_2 = 4/3$, which sum to 2. Check: person $i$ facing $\tau_i$ chooses $a_i/G = \tau_i$, hence $G = a_i/\tau_i = 3$ for both.
:::
:::

::: exercise A discrete public good {level=2}
A bridge costs 12. Three people value it at 3, 6 and 8 (quasi-linear units). (a) Is it efficient to build? (b) If they contribute voluntarily in a simultaneous Nash game, contributing 0 or the whole 12 being the only options each faces — wait, they may contribute any amount and the bridge is built if $\sum g_i \ge 12$, with contributions refunded if not (a provision-point mechanism with refund). Explain why $(g_1,g_2,g_3)=(0,4,8)$ and $(0,6,6)$ can both be Nash, and why $(3,6,8)$ need not be.
::: solution
(a) $3+6+8=17>12$, so yes: surplus $5$. (b) With refund, contributing is weakly dominated unless the contribution is pivotal. At $(0,4,8)$ the sum is 12; person 2 who cuts $g_2$ unbuilds the bridge and loses $6-4=2$; person 3 who cuts loses $8-8=0$ wait — person 3 is contributing 8, value 8, so is indifferent to a small cut that unbuilds? If they cut, refund restores the contribution but the bridge vanishes, losing net value $8-8=0$, so weakly willing to stay. The exact Nash set of a provision-point mechanism is the set of contribution profiles that sum to cost and give each contributor no more than their value. $(3,6,8)$ sums to 17>12: any player can cut the excess and still have the bridge, so it is not Nash. Multiplicity of Nash (any split of 12 that does not charge anyone more than their value) is the coordination problem on top of free riding.
:::
:::

::: exercise Neutrality {level=3}
In the two-person logarithmic model of [[#ex-nash-log]], the government provides $G_0 = 2$ from a lump-sum tax of 1 on each person, and private contributions $g_i$ remain feasible. Show that the new Nash total $G$ (public plus private) equals the old Nash $20/3$.
::: hint
Write the new incomes as $9$ each and $G = 2 + g_1 + g_2$. Interior FOCs still equate $x_i$ to total $G$.
:::
::: solution
New private incomes $m_i' = 9$. Let $G = 2 + g_1 + g_2$. Interior Nash: $x_i = G$ with $x_i = 9 - g_i$. Then $g_i = 9 - G$, so $G = 2 + (9-G) + (9-G) = 20 - 2G$, hence $3G = 20$, $G=20/3$. Private contributions fall to $g_i = 9 - 20/3 = 7/3$, which is $1$ less than the original $10/3$: complete crowding-out of the government's 2 units. Resource accounting: $x_1+x_2+G = 18 + 2 = 20$ still.
:::
:::

::: exercise Mechanism-design constraint {level=3}
A planner can ask each of two quasi-linear households to report a valuation $v_i$ for a discrete public good of cost $c$, then build if $v_1+v_2 \ge c$ and charge according to a rule $t_i(v)$. Explain in words why charging each $t_i = c/2$ (equal cost shares) is not incentive-compatible, and what the pivotal (Clarke) tax charges instead. You may take $c=10$, true values $v_1=8$, $v_2=3$.
::: solution
Equal shares: person 2, whose true value is 3, pays 5 if they report truthfully and the good is built ($8+3=11>10$). They prefer to report $v_2'<2$ so that $8+v_2'<10$ and the good is not built: they then pay 0, which is better than paying 5 for a good they value at 3. Truth-telling is not a best response. The Clarke (pivotal) tax charges $i$ the *externality* imposed on the other: if $i$ is pivotal for the decision, $i$ pays the net loss imposed on the rest of the world. Here person 1 is pivotal ($3<10$ without person 1; $11\ge10$ with). Person 1 pays $c-v_2=7$, which is less than $v_1=8$, so 1 still wants the good. Person 2 is not pivotal ($8\ge10$? no, $8<10$, so without 2 the good is not built anyway — wait $8<10$, so *person 1 is not enough*. Person 2: without 2, $v_1=8<10$, not built; with 2, built. So 2 *is* pivotal and pays $c-v_1=2$, which is less than 3. Person 1 is also pivotal and pays $7$. Both tell the truth as a dominant strategy in the Groves class; the budget collects $7+2=9 \neq 10$, illustrating the typical surplus/deficit. (If neither were pivotal the Clarke taxes would be zero and the budget would fail to cover $c$.)
:::
:::

::: exercise Congestion as an impure public good {level=3}
Each of $n=5$ identical users has inverse demand $10-q_i$ for trips, and the time cost *per unit* is $c(Q)=Q/5$ with $Q=\sum q_i$. A user pays $c(Q)$ but ignores the rise in $c$ imposed on others. Find Nash total $Q$, efficient $Q$, and the toll that implements efficiency.
::: hint
An extra unit raises $c$ by $1/5$ for each of the other four users, so the external cost is $4/5$.
:::
::: solution
Nash: $10-q_i = Q/5$. Symmetric $Q=5q_i$, so $10-Q/5=Q/5$, hence $Q=25$ and $q_i=5$. Efficient: $10-q_i = Q/5 + 4/5$. Symmetric: $10-Q/5 = Q/5 + 4/5$, so $10-4/5=2Q/5$, $Q=23$. A toll of $4/5$ per unit, equal to the external congestion, implements $Q=23$. The road is an impure public good: non-excludable in this model, and partially rival through $c(Q)$.
:::
:::

::: exercise Warm glow {level=2}
Suppose $u^i = \ln x_i + \ln G + \gamma \ln g_i$ with $\gamma>0$, two identical people, $m_i=10$, $c(G)=G$. Without calculating the closed form, explain whether Nash $G$ is larger than in [[#ex-nash-log]] and whether government provision of $G_0$ still crowds out one-for-one.
::: solution
The extra term $\gamma \ln g_i$ raises the private marginal benefit of contributing, so interior Nash contributions (and $G$) are larger than at $\gamma=0$. Government $G_0$ financed lump-sum still raises total $G$ available "for free", which reduces the $\ln G$ motive to give, but it does not replace the warm-glow motive: $g_i$ itself is valued. Crowding-out is therefore partial, not one-for-one. (If $\gamma$ is large enough that the $\ln G$ term is negligible, crowding-out approaches zero.)
:::
:::
