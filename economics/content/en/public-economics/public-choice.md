The planner of the last eight chapters maximises a social welfare function subject to information and resource constraints. Legislatures maximise something else: they must win votes, bargain with parties, satisfy organised groups, and delegate to bureaux that have their own objectives. **Public choice** is the positive theory of those processes. **Fiscal federalism** is the theory of which tasks sit at which level of government, and of whether competition among jurisdictions can reveal preferences for local public goods that Lindahl prices cannot. This chapter replaces the planner with voters, lobbies, bureaucrats and mayors. It does not replace normative public economics: it constrains it. A Pigouvian tax that cannot survive a legislature is not, as a positive matter, the instrument the model implemented.

We will keep the usual split. Median-voter and Tiebout results are theorems in models. Whether US cities, Brazilian municipalities or Indian panchayats look like the models is an empirical question, and the answer is mixed. Nothing here is a recommendation of a voting rule or of a federal constitution.

## Voting and the median voter

A society must choose a single number $G$ — the size of a public good, a tax rate, a school budget — by majority rule. Each voter $i$ has a unique preferred (ideal) point $G_i^*$, and preferences are **single-peaked**: utility falls as $G$ moves away from $G_i^*$ in either direction.

::: definition Single-peaked preferences {#def-single-peaked}
Preferences over a one-dimensional policy $G\in\mathbb{R}$ are **single-peaked** if each voter has an ideal point $G_i^*$ such that if $G' < G'' \le G_i^*$ or $G_i^* \le G'' < G'$, then $G''$ is preferred to $G'$. The **median voter** is a voter whose ideal point is a median of the $\{G_i^*\}$.
:::

::: theorem Median-voter theorem {#thm-median}
If the policy space is one-dimensional and all preferences are single-peaked, then the median ideal point $G_m^*$ is a Condorcet winner: it beats any other proposal in pairwise majority vote. Two-party competition that maximises vote share (Hotelling–Downs) converges to $G_m^*$. Assumptions: odd number of voters for uniqueness, no agenda control that restricts pairwise votes, no abstention, and sincere voting (or equivalent).
:::
::: proof
Let $G_m^*$ be the median. For any $G' > G_m^*$, every voter with $G_i^* \le G_m^*$ prefers $G_m^*$ to $G'$ by single-peakedness, and those voters are at least half the electorate. Similarly for $G' < G_m^*$. So $G_m^*$ beats every alternative. In Hotelling–Downs, a party located away from $G_m^*$ can be undercut by a rival who moves closer; the only Nash equilibrium is both at $G_m^*$.
:::

The theorem is why introductory public finance often treats "the" demand for a public good as the median demand, not the Samuelson sum. That substitution is a positive claim about voting, not a normative claim about efficiency. The median $G_m^*$ equals the Samuelson $G^*$ only for special distributions of tastes and of tax shares (Bergstrom and Goodman 1973 is the empirical public-good demand paper in this tradition).

::: example Five ideal points {#ex-five}
Five voters have ideal public-good levels $1,2,3,8,10$, and preferences are single-peaked. Equal cost shares. What does majority rule pick, and how does it compare with a utilitarian sum of the five ideal points?
::: solution
The median is $3$. The utilitarian mean is $(1+2+3+8+10)/5=4.8$. Majority rule is to the left of the mean because the distribution is skewed right. If Samuelson wanted the mean (it would, with quasi-linear utility and equal weights, want a *sum of MRS*, not a mean of ideal points — different objects), the vote would not implement it. Here the positive prediction is just $G=3$.
:::
:::

Single-peakedness fails as soon as the issue is multidimensional, or as soon as preferences have two peaks (a voter who likes either a tiny government or a large one, and dislikes the middle). Then majority rule can cycle: the Condorcet paradox, already used as an exercise in [[public-economics/role-of-government]]. Arrow's 1951 theorem says the problem is deep.

::: theorem Arrow's impossibility {#thm-arrow}
There is no social welfare *function* (in Arrow's sense: a map from profiles of ordinal rankings to a complete transitive social ranking) that satisfies unrestricted domain, Pareto, independence of irrelevant alternatives, and non-dictatorship, once there are at least three alternatives and three individuals.
:::

Bergson–Samuelson $W$ is not a counterexample: it takes cardinal utilities as inputs, not ordinal ballots. Public choice takes Arrow as a positive warning: majority rule will need extra structure (a one-dimensional issue, an agenda setter, parties, a constitution) if it is to produce a stable policy. Romer and Rosenthal (1978, 1979) showed that an agenda-setting bureau, putting a take-it-or-leave-it budget against a status-quo reversion, can push $G$ away from the median toward the bureau's preferred point. That is a mechanism of **bureaucracy**, below.

::: example Downsian convergence {#ex-downs}
Two parties, a continuum of voters with ideal points uniform on $[0,1]$, single-peaked preferences, majority rule. Where do the parties locate in Nash equilibrium, and what vote share does each get?
::: solution
The median is $1/2$. Both locate at $1/2$ ([[#thm-median]]) and split the vote $50$–$50$. A party that locates at $0.6$ loses all voters in $[0,0.55)$ to a rival at $1/2$ (more precisely: the rival at $1/2$ is closer for every voter below $0.55$), hence loses. The equilibrium is not the mean of a *skewed* distribution — but here uniform, mean and median coincide. Turnout that is higher on the right would move the *effective* median right and pull both parties with it.
:::
:::

::: warning The median is not the mean and not Samuelson
A common slide is to treat the median voter's $G$ as "what the people want" and then as "what is efficient". The median is a positive prediction under [[#thm-median]]. Efficiency is the Samuelson sum, or a $W$. They coincide only for special cases. Turnout that is higher among the rich, or among the old, moves the *effective* median, which is one positive explanation of why public budgets in ageing democracies tilt toward pensions.
:::

::: quiz
Three people, three alternatives $A,B,C$. Rankings: $A\succ B\succ C$, $B\succ C\succ A$, $C\succ A\succ B$. Majority rule
- [ ] picks $A$, the first alternative
- [x] cycles: $A$ beats $B$, $B$ beats $C$, $C$ beats $A$
- [ ] picks the utilitarian winner, which is well-defined from these rankings
- [ ] is equivalent to Lindahl pricing
::: solution
Pairwise: $A$ vs $B$ is $2$–$1$ for $A$; $B$ vs $C$ is $2$–$1$ for $B$; $C$ vs $A$ is $2$–$1$ for $C$. Cycle. Ordinal rankings do not determine a utilitarian winner (cardinal intensities are missing). Lindahl pricing is a different institution, requiring preference revelation that voting does not deliver.
:::
:::

## Interest groups, rents and bureaucracy

Olson's *Logic of Collective Action* (1965) is the public-good model applied to politics: a small group with a large per-member stake organises more cheaply than a large group with a small per-member stake. Concentrated industries obtain tariffs; dispersed consumers pay them. The **deadweight loss of rent-seeking** (Tullock 1967; Krueger 1974) is the resources spent competing for the transfer, which can eat the transfer itself and more.

::: proposition Olsonian bias {#prop-olson}
If the cost of organising is a public good among the beneficiaries of a policy, then, other things equal, policies whose benefits are concentrated and whose costs are dispersed are more likely to be adopted than the reverse, even when the latter have higher social surplus. Assumptions: a simple collective-action technology, no countervailing organisation, and a legislature that responds to organised pressure.
:::

This is a positive bias, not a theorem that every tariff is inefficient (some may be Pigouvian, or terms-of-trade optimal for a large country). It is a reason the political equilibrium of environmental policy often favours *standards* (which create rents for incumbents who already comply) over *taxes* (which do not), even when Weitzman and Pigou would prefer a tax ([[public-economics/externalities]]).

Niskanen (1971) modelled a bureau that maximises its budget, subject to supplying a public good that a sponsor (a legislature) values. The bureau has private information on cost. The predicted $G$ is too large relative to the sponsor's Samuelson point. Later models (Migué and Bélanger; principal–agent bureaucracy) replace budget maximisation with slack, career concerns, or ideology. The common implication is that the supply of $G$ is not the Samuelson condition and not necessarily the median.

::: example A tariff as a public choice {#ex-tariff}
A tariff worth $10$ to each of $100$ firms and costing $2$ to each of $10\,000$ consumers (plus a DWL triangle) has a negative net surplus. Why might it pass?
::: solution
Total gain to firms $100\times 10=1000$; total loss to consumers $10\,000\times 2=20\,000$, before DWL. Net surplus is largely negative. Each firm has a stake of $10$ and there are few firms, so lobbying is a small-group public good. Each consumer has a stake of $2$ and faces a large-group free-rider problem. If the legislature responds to organised money and not to unorganised surplus, the tariff can pass. The numbers are illustrative; the sign of the Olsonian prediction is the point.
:::
:::

**Tax expenditures** — deductions, credits, reduced VAT rates — survive for the same reason: the beneficiaries are organised, the foregone revenue is a dispersed "tax increase that did not happen". Mirrlees and Atkinson–Stiglitz would often cash them out; public choice explains why they persist.

## Fiscal federalism and Tiebout

Charles Tiebout (1956) asked whether *mobility* among local jurisdictions can reveal the demand for local public goods.

::: definition Tiebout hypothesis {#def-tiebout}
The **Tiebout hypothesis** is that, with a large number of jurisdictions, free mobility, full information, no spillovers, no scale economies (or scale exhausted), and local taxes as prices, households sort into clubs that provide their preferred local public-good bundles, and the resulting allocation is efficient.
:::

::: proposition Tiebout as a club {#prop-tiebout}
Under the assumptions of [[#def-tiebout]], local public-good provision is equivalent to a system of Buchanan clubs with a land or head tax as the membership price, and the Samuelson condition holds *inside* each homogeneous jurisdiction. Heterogeneous households sort; they do not vote a median against a minority inside a mixed jurisdiction.
:::

The list of assumptions is long, and each failure is an empirical literature. Spillovers (a city park used by suburban visitors) restore a public-good problem *among* jurisdictions. Scale economies (a metro transport network) make many tiny jurisdictions inefficient. Zoning and housing-supply constraints (Glaeser, Gyourko) limit sorting. Information about local quality is imperfect. And mobility is costly, especially across languages and countries: Tiebout is a theory of *local* public goods, not of national defence.

Oates's **decentralisation theorem** (1972) is the companion normative statement: in the absence of spillovers and scale effects, local provision of a local public good, tailored to local demand, weakly dominates a uniform national bundle. The theorem is the case for subsidiarity. The case *against* is redistribution (the poor would sort into generous jurisdictions and unravel the local welfare state — a Rothschild–Stiglitz problem among places) and macroeconomic stabilisation (local governments cannot run the same deficits as a central government with a national tax base and a central bank). Musgrave's three branches therefore sit at different levels: allocation of local goods locally, redistribution and stabilisation centrally, with a grey area in the middle (education, health) that different federations assign differently.

::: widget plot
f: 8-0.8*x; 6-0.4*x; 14-1.2*x; 4
x: 0, 12
y: 0, 16
labels: \text{MRS type A}; \text{MRS type B}; \text{Samuelson sum}; \text{MC}
caption: Two types in one jurisdiction: Samuelson wants the vertical sum equal to MC (here at a larger $G$ than either type's own peak). Tiebout sorting would put type A in one town and type B in another, each setting $\mathrm{MRS}=\mathrm{MC}$. A median-voter mix in a single town would pick one type's peak and ignore the other. Move along $x$ to compare the three benchmarks: Samuelson mixed, Tiebout separated, median mixed.
:::

::: example Two towns {#ex-two-towns}
Type A (half the population) has $\mathrm{MRS}_A=8-G$, type B has $\mathrm{MRS}_B=4-G$, $c'(G)=2$, equal cost shares. Find Samuelson $G$ in a mixed city, each type's ideal $G$ under equal shares, the median (with equal numbers, either — a tie), and Tiebout $G$ in homogeneous towns.
::: solution
Mixed Samuelson: $(8-G)+(4-G)=2$ so $12-2G=2$, $G=5$. Type A's ideal, paying half of $c'=2$ so facing a tax-price of $1$: $8-G=1$, $G=7$. Type B: $4-G=1$, $G=3$. Median in a 50–50 city is undefined (a tie) or depends on turnout; a slight majority of B picks $G=3$. Tiebout: A-town $G=7$, B-town $G=3$. Neither Tiebout town is at the mixed Samuelson $G=5$; they should not be, because the mixed Samuelson is the right benchmark only if the types *must* share a $G$. If they can sort, homogeneous Samuelson is $\mathrm{MRS}=c'$ inside each town, which is what Tiebout delivers under the assumptions.
:::
:::

Intergovernmental grants complicate the picture. A matching grant for local public goods lowers the local tax-price and, in a median-voter model, raises $G$ by a substitution effect. A lump-sum grant has only an income effect. The **flypaper effect** (Hines and Thaler 1995 survey; Inman 2008) is the stylised fact that lump-sum grants raise local spending *more* than an equivalent increase in local private income — money "sticks where it hits". That is a failure of the median-voter-with-fungible-income model, and it has explanations ranging from agenda-setting bureaucracy to voter fiscal illusion to the grant being in fact matching.

::: application Federalism in India, Brazil and the European Union
India's constitution assigns expenditure and revenue across Union, states and local bodies; the Finance Commission (a constitutional body) recommends transfers. States vary widely in own-tax effort and in social spending (Reserve Bank of India, state finances; World Bank state-level reviews). Brazil's municipalities have unusually large constitutional revenue shares and responsibilities for health and primary education (the 1988 constitution); the result is a Tiebout-like laboratory with serious spillover and capacity problems (IQ and municipal public-finance research). The European Union is not a federation in the US sense: it has a small budget (of the order of 1 per cent of EU GNI in recent years, European Commission budget figures) and assigns redistribution and most public goods to member states, with a single market and a monetary union for some members. Each of these is a different point in the Musgrave–Oates assignment map. None is a test of Tiebout's full list of assumptions.
:::

## Evidence

- **Median voter.** Bergstrom and Goodman (1973) and many replications estimate local public-good demand as if the median income household were decisive; income elasticities of local spending are typically positive and less than one. The identification is fragile (the median is not randomly assigned). Romer and Rosenthal's agenda-setter evidence from US school-budget referenda is the classic rejection of a pure median.
- **Sorting.** Rhode and Strumpf (2003) find US municipalities more homogeneous than random. Bayer, Ferreira and McMillan (2007) estimate substantial willingness to pay for school and neighbour characteristics in US housing markets, a hedonic Tiebout margin. Homogeneity is not efficiency.
- **Flypaper.** Inman (2008) and later studies using quasi-experimental grants (e.g. Knight 2002; Dahlberg, Mörk, Rattsø and Ågren 2008 in Sweden) generally find a flypaper effect, with magnitudes that vary.
- **Rent-seeking.** Krueger (1974) estimated large rents from Indian trade licences in the 1960s. Modern estimates of lobbying returns (US data; Bertrand, Bombardini and Trebbi) are consistent with concentrated benefits. Cross-country corruption measures (Transparency International, World Bank Governance Indicators) correlate with resource rents and with institutional quality, with all the usual causal caveats.

::: history
Condorcet (1785) stated the jury theorem and the paradox of cyclic majorities. Harold Hotelling (1929) and Anthony Downs (1957, *An Economic Theory of Democracy*) gave the spatial-voting model. Kenneth Arrow, *Social Choice and Individual Values* (1951), proved the impossibility theorem. Charles Tiebout (1956) and Wallace Oates (*Fiscal Federalism*, 1972) founded the economics of multi-level government. James Buchanan and Gordon Tullock, *The Calculus of Consent* (1962), and Mancur Olson (1965) founded the public-choice analysis of constitutions and of groups. William Niskanen (1971) modelled bureaucracy. Anne Krueger (1974) named rent-seeking in the trade-policy context.
:::

## Where this leads

This chapter closes the course's loop. The allocation branch ([[public-economics/public-goods]], [[public-economics/externalities]]) has a Samuelson–Pigou benchmark and a voting-and-lobbying supply. The distribution branch ([[public-economics/redistribution]], [[public-economics/optimal-taxation]]) has a Mirrlees benchmark and a median-voter-plus-interest-group supply. Environmental federalism, EU fiscal rules and developing-country tax capacity are applications in [[environmental-economics/environment-and-economy]] and in development courses. The positive–normative split we started with in [[public-economics/role-of-government]] is now a split between a $W$ and an institution that does not maximise $W$.

::: summary
- Single-peaked preferences on a line make the median a Condorcet winner ([[#thm-median]]). The median is not Samuelson and not a $W$-maximum in general.
- Arrow's theorem ([[#thm-arrow]]) says ordinal aggregation needs structure. Cycles, agenda setters and parties are that structure in practice.
- Olson's concentrated-benefit bias ([[#prop-olson]]) and rent-seeking explain tariffs, standards and tax expenditures that a planner would not choose. Niskanen bureaux need not supply the median $G$.
- Tiebout ([[#def-tiebout]]) is efficiency-by-sorting under a long list of assumptions. Oates's decentralisation theorem is the normative companion; redistribution and spillovers push tasks up.
- Evidence: partial sorting, a flypaper effect, agenda-setter deviations from the median, and rent-seeking that is easier to name than to measure.
:::

## Exercises

::: exercise Median of seven {level=1 check="4"}
Ideal points $0,1,2,4,7,8,9$. What $G$ does majority rule pick? (Enter the median.)
::: solution
The fourth of seven, ordered, is $4$.
:::
:::

::: exercise Mean versus median {level=1}
In [[#ex-five]], the mean is $4.8$ and the median is $3$. If a new voter with ideal point $20$ arrives, what happens to each?
::: solution
New mean $(24+20)/6=44/6\approx 7.33$. New median: six voters, the median is any point between the third and fourth of $1,2,3,8,10,20$, i.e. between $3$ and $8$. With an even number the median-voter theorem needs a tie-break; the arrival of an extreme voter moves the mean a lot and the median little (or into an interval). Majority rule is robust to extremes in a way the mean is not.
:::
:::

::: exercise Single-peakedness {level=1}
A voter ranks a tax rate of $0$ first, $1$ second, and $0.4$ last. Are these preferences single-peaked on the line $[0,1]$?
::: solution
No. Ideal point $0$, then as we move right utility should fall, but $1$ is ranked above $0.4$. Two peaks (at $0$ and at $1$). Majority rule over $\{0,0.4,1\}$ can then cycle depending on the other voters.
:::
:::

::: exercise Agenda setter {level=2}
A bureau prefers $G=10$. The median voter prefers $G=4$. The reversion (status quo if the bureau's proposal fails) is $G=0$. The bureau makes a take-it-or-leave-it offer. What $G$ does it propose, if the median's preferences are symmetric around $4$?
::: solution
The median is indifferent between $0$ and $8$ (symmetric, distance $4$ either way). So the bureau can offer just under $8$ and win against reversion $0$. It cannot get $10$. Agenda control plus a low reversion raises $G$ from the median $4$ toward the bureau, but not all the way. (Romer–Rosenthal.)
:::
:::

::: exercise Olson arithmetic {level=2}
$n$ consumers each lose $L/n$ from a tariff; $m$ firms each gain $B/m$, with $B<L$. Organising costs $c$ per group, independently of size, and a group organises if its total stake exceeds $c$. For which $(n,m)$ does the industry organise and the consumers not?
::: solution
Industry organises if $B>c$; consumers if $L>c$. Since $B<L$, if $c$ is a *per-group* cost both organise or both do not, depending on $c$ versus $B$ and $L$. The Olson story needs organising cost that *rises* with group size, or a per-member cost with free riding inside the group: consumers fail to organise because each gets $L/n$, which is less than the private cost of participating, while firms' $B/m$ is large. If participation costs $k$ per member and free riding is complete, firms organise when $B/m>k$ and consumers when $L/n>k$. For $n\gg m$ the second fails and the first holds even with $B<L$.
:::
:::

::: exercise Tiebout versus Samuelson {level=2}
Using [[#ex-two-towns]], compute mixed-city Samuelson $G$ and the two Tiebout $G$s. Who is better off under Tiebout, and is anyone worse off?
::: solution
Mixed $G=5$. Tiebout: $7$ and $3$. Type A gets a $G$ closer to their ideal $7$ (namely $7$ rather than $5$), type B gets $3$ rather than $5$. With quasi-linear MRS as given, each type's surplus in their own town is the triangle under their MRS down to $c'$ (tax-price $1$ in the exercise's equal-share logic for a homogeneous town with $c'=1$ per person if each town has one type and $c'$ was $2$ for two types — the calibration is that each homogeneous town faces $c'=1$ per capita). Both types can be better off than in the mix, because the mix forced a compromise $G$. Nobody need be worse off if moving is free: that is the Tiebout Pareto claim under the assumptions. (If moving is costly, or if scale made $c'$ higher in small towns, the ranking can reverse.)
:::
:::

::: exercise Redistribution and mobility {level=3}
A local jurisdiction pays a generous means-tested transfer. Households can move. Using Rothschild–Stiglitz and Tiebout language, explain why local redistribution is predicted to unravel, and which level of government Oates–Musgrave would assign it to.
::: hint
Recipients want to move in; net payers want to move out.
:::
::: solution
The transfer is a public-good-like pool with adverse selection: high-cost types (poor recipients) sort in, low-cost types (rich payers) sort out. The local pool's average cost rises, generosity is cut, and in the limit local redistribution vanishes (a Tiebout–Rothschild–Stiglitz unraveling). Oates and Musgrave assign redistribution to the central government, which can tax a less mobile base and prevent sorting across the relevant border. (Some local redistribution still exists in the data, financed by land that is immobile, by federal grants, or by voters' preferences for local charity.)
:::
:::

::: exercise Flypaper {level=3}
A city receives a lump-sum grant of $100$. The median voter's income elasticity of demand for local public goods would predict that about $10$ of an extra $100$ of *private* income is spent on $G$. The flypaper effect is that $50$ of the grant is spent on $G$. Why is this a puzzle for the median-voter model, and give one explanation that does not abandon voting.
::: solution
The median-voter model with fungible income treats a lump-sum grant as extra community income; the income effect should match that of private income (about $10$ here). Spending $50$ is "too much" $G$. Explanations that keep voting: the grant is in fact matching (a hidden price effect); the reversion or agenda setter uses the grant in a Romer–Rosenthal way; voters are more willing to spend "public" money (fiscal illusion) — which is a behavioural amendment of voting, not a Niskanen bureau. A bureau-slack explanation abandons the pure median.
:::
:::

::: exercise Arrow and $W$ {level=2}
Why does a Bergson–Samuelson social welfare function $W(u_1,\dots,u_n)$ not contradict Arrow's theorem?
::: solution
Arrow aggregates *ordinal rankings*. $W$ takes *utilities* as given cardinal (or at least interpersonally comparable) inputs. The information Arrow forbids (intensities, interpersonal comparisons) is the information $W$ assumes. Public economics that maximises $W$ is not a voting procedure; public choice is the study of the voting procedures we actually have.
:::
:::

::: exercise Matching versus lump-sum grants {level=2}
A matching grant pays half of local $G$. In a median-voter diagram with tax-price on the vertical axis and $G$ on the horizontal, compare the substitution and income effects with those of a lump-sum grant of equal out-turn.
::: solution
The matching grant rotates the budget: tax-price of $G$ halves, so both substitution (cheaper $G$) and income (richer community) raise $G$. A lump-sum grant of the same *realised* amount is a parallel shift (income only). If $G$ is a normal good, matching raises $G$ more. That is why matching is used to internalise spillovers (a Pigouvian subsidy to local $G$) and why a flypaper-sized response to a lump-sum grant is too large to be an income effect alone.
:::
:::
