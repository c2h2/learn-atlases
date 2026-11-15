A coastal town is considering a seawall. Private landowners will not build it: each would capture only a sliver of the benefit, and none can exclude neighbours who refuse to pay. A private market for apples has no such problem. The difference is the starting point of public economics: some allocations that people would value are not delivered by voluntary exchange, and some that are delivered leave people exposed to risks or to a distribution of income that a political community may choose to change. Whether the seawall *should* be built, who should pay, and whether a government that builds it will do so at the right height, are separate questions. This chapter sets out the language in which those questions are asked.

Public economics studies the economic activity of governments — taxing, spending, regulating, insuring, redistributing — and the criteria by which that activity might be judged. It inherits from [[microeconomics/welfare-theorems]] the two fundamental theorems, and it spends the rest of the course asking what happens when their assumptions fail and what happens when the agency that is supposed to correct the failure is itself made of people with limited information and their own objectives. Throughout we separate **positive** claims (what a policy does to prices, quantities and the distribution of gains) from **normative** claims (whether those consequences are desirable). The second never follows from the first without an explicit value judgement.

## What governments do

Richard Musgrave, in *The Theory of Public Finance* (1959), organised the public budget into three **branches**. The **allocation** branch supplies goods that markets undersupply or oversupply (public goods, goods with externalities) and corrects other failures of the first welfare theorem. The **distribution** branch transfers command over goods among households, because even a Pareto-efficient allocation may be judged unfair. The **stabilisation** branch uses the budget to influence aggregate demand and employment, a topic that belongs mainly to [[macroeconomics/fiscal-policy-and-debt]] and is not the centre of this course. The three-way split is a map, not a claim that real ministries respect it: a public-employment programme is at once allocation, distribution and stabilisation.

A different cut is by instrument. Governments buy goods (schools, roads, administration); they transfer cash (pensions, unemployment benefits, family allowances); they tax (on labour, on commodities, on property, on corporations); they regulate (emissions standards, occupational licensing, financial rules); and they operate or mandate insurance (health, unemployment, disability). The mix varies enormously. In 2023 the OECD average tax-to-GDP ratio was 33.9 per cent, with France at 43.8 per cent and Mexico at 17.7 per cent (OECD, *Revenue Statistics 2024*). IMF Fiscal Monitor tables put general government *expenditure* — a broader concept, including spending financed by borrowing — at about 40.5 per cent of GDP in advanced economies in 2023, 49.5 per cent in the euro area, 37.7 per cent in the United States, 56.8 per cent in France and much lower in most low-income countries. General government *final consumption* (the national-accounts slice that is current spending on goods and services, excluding transfers) was about 24 per cent of GDP in France in 2024 and about 11 per cent in India (World Bank WDI, indicator NE.CON.GOVT.ZS). Transfers, not consumption of goods, are what make European budgets look so large relative to East Asian or African ones.

These figures are positive descriptions. They do not tell us whether France spends too much or Mexico too little. Wagner's observation that public spending tends to rise with income — sometimes called **Wagner's law**, after Adolph Wagner's late-nineteenth-century writing — is a correlation, repeatedly found in long historical series (IMF Public Finances in Modern History database), not a theorem and not a recommendation.

::: definition Positive and normative public economics {#def-positive-normative}
**Positive public economics** describes the effects of public policies and the political and market processes that produce them: who bears a tax, how a subsidy changes output, how voters choose a budget. **Normative public economics** evaluates policies against an explicit criterion, typically Pareto efficiency, a social welfare function, or a constrained second-best objective. A positive statement can be true or false independently of anyone's values; a normative statement is true or false only relative to the criterion adopted.
:::

::: warning Efficiency is not a complete criterion
A common slide from positive to normative is to call a policy "good" because it is Pareto improving, or "bad" because it creates deadweight loss. Pareto improvements are widely accepted as improvements, but most real policies create winners and losers. Deadweight loss is a real cost, but a tax that finances a transfer can raise social welfare under a concave social welfare function even though it creates deadweight loss. Efficiency arguments settle allocation-branch questions only when distribution is handled separately (the second welfare theorem) or when the criterion has already incorporated distribution (a social welfare function).
:::

::: example Reading a budget share {#ex-budget-share}
Country A's general government expenditure is 42 per cent of GDP; country B's is 18 per cent. A commentator concludes that A has a "larger government failure" and B is "closer to the first-best". What has gone wrong?
::: solution
The numbers are positive facts about size, not measures of failure. Country A may be financing universal health insurance and basic pensions that B leaves to families and informal markets; whether that is desirable depends on risk, information and distributional judgements, not on the expenditure ratio. Country B may have a small measured budget and large implicit regulation, or a small budget because it cannot tax. The first welfare theorem is silent on the size of a budget that corrects market failures or redistributes. Comparing 42 with 18 does not rank the two countries on efficiency or on welfare.
:::
:::

## Efficiency, the welfare theorems and market failure

Recall from [[microeconomics/welfare-theorems]] the standard competitive model: households have locally non-satiated, convex, continuous preferences and own endowments; firms have convex technologies; all goods are private (rival and excludable); there are complete markets, including markets for risk if there is uncertainty; no agent has market power; and there are no externalities. A **competitive equilibrium** is a price vector and an allocation such that households maximise utility on their budget sets, firms maximise profit, and markets clear.

::: definition Pareto efficiency {#def-pareto}
An allocation is **Pareto efficient** (or Pareto optimal) if there is no other feasible allocation that makes at least one household strictly better off and no household worse off. The **Pareto frontier** is the set of Pareto-efficient allocations. A **Pareto improvement** is a move that raises at least one utility and lowers none.
:::

::: theorem First fundamental theorem of welfare economics {#thm-fwt}
Every competitive equilibrium allocation is Pareto efficient.
:::
::: proof
Suppose, for a contradiction, that a competitive allocation $\mathbf{x}^*$ is Pareto dominated by a feasible $\mathbf{x}'$. Local non-satiation implies that $\mathbf{x}'$ costs at least as much as $\mathbf{x}^*$ at the equilibrium prices for every household, and strictly more for any household that is strictly better off. Summing the budget inequalities, the value of $\mathbf{x}'$ exceeds the value of endowments plus profits. But feasibility and profit maximisation imply that the value of $\mathbf{x}'$ cannot exceed that resource value — a contradiction. The argument requires that every good that people care about is priced (no externalities, no missing markets) and that no one is forced off a demanded bundle by a non-convexity or by quantity rationing.
:::

The first theorem is a positive statement about a model. It is not the claim that "real markets are efficient". It says that *if* the assumptions hold, equilibrium waste is zero: there is no unexploited gain from trade. Public economics begins where the assumptions fail.

::: definition Market failure {#def-market-failure}
A **market failure** is a situation in which the conclusion of [[#thm-fwt]] does not apply, so that a competitive equilibrium, if it exists, need not be Pareto efficient. Standard sources, each developed in later chapters, are: public goods ([[public-economics/public-goods]]); externalities ([[public-economics/externalities]]); market power; incomplete or asymmetric information ([[public-economics/social-insurance]], and the course [[information-economics/asymmetric-information]]); and missing markets, including missing insurance markets.
:::

A second theorem says that distribution can, in the model, be separated from efficiency.

::: theorem Second fundamental theorem of welfare economics {#thm-swt}
If preferences and technologies are convex, and other technical conditions hold, then any Pareto-efficient allocation can be obtained as a competitive equilibrium after a suitable redistribution of endowments (lump-sum transfers).
:::

The second theorem is the theoretical charter of Musgrave's distribution branch: pick a point on the Pareto frontier by transferring purchasing power, then let markets allocate. The obstacle is information. Lump-sum taxes conditioned on innate ability do not distort labour supply, but ability is private information; taxes conditioned on income *do* distort, which is why [[public-economics/optimal-taxation]] is a second-best theory. Convexity can also fail (increasing returns, fixed costs), in which case even lump-sum redistribution plus competition need not decentralise a desired allocation.

::: example A Kaldor–Hicks project {#ex-kh}
A road raises $A$'s surplus by 20 and lowers $B$'s by 12. Compensation is not paid. Is the project a Pareto improvement? Does it pass Kaldor–Hicks? Under utilitarian transferable utility, does $W$ rise?
::: solution
Not a Pareto improvement: $B$ is worse off. Kaldor–Hicks: $A$ could pay $B$ 12 and still have 8, so yes. Utilitarian $W=v_A+v_B$ with transferable utility rises by 8. Whether the road *should* be built without compensation is a further judgement about $W$ and about the feasibility of transfers; Kaldor–Hicks does not settle it.
:::
:::

::: intuition Two theorems, two jobs
The first theorem tells you when you can stop: if the assumptions hold, there is no efficiency case for intervention. The second theorem tells you that "the market" does not pick which efficient allocation you get — endowments do — so distributional policy is not an afterthought even in a first-best world. Almost every later chapter is about the collapse of one or both: either the equilibrium is inefficient, or the transfers needed to move along the frontier are not lump-sum.
:::

::: example A Pareto-efficient allocation that looks unfair {#ex-pareto-unfair}
Two people, $A$ and $B$, share 10 units of a private good. Preferences are strictly increasing. The allocation $(9, 1)$ is Pareto efficient: any move that gives $B$ more must take from $A$. So is $(5, 5)$, and so is $(10, 0)$. A social planner who maximises $u_A + u_B$ with $u_i = \ln c_i$ chooses $(5, 5)$. A planner who maximises $\min\{u_A, u_B\}$ also chooses $(5, 5)$ here. A planner who maximises $u_A$ alone chooses $(10, 0)$. All three points are efficient. Which is "best" is not a question the first theorem answers.
::: solution
Efficiency only requires that we not throw goods away and not miss mutually beneficial trades. With one good and monotonic preferences, every split of the 10 units is efficient. Ranking $(9, 1)$ against $(5, 5)$ requires a **social welfare function** (below) or some other distributive criterion. Calling $(9, 1)$ "efficient" is correct and incomplete.
:::
:::

## Social welfare and the jump to "should"

Normative public economics almost always maximises a **social welfare function** (SWF), a device introduced in its modern form by Abram Bergson (1938) and developed by Paul Samuelson. An SWF is not discovered in the data; it is a statement of the criterion being used.

::: definition Bergson–Samuelson social welfare function {#def-swf}
A **Bergson–Samuelson social welfare function** is a function $W(u_1, \dots, u_n)$ of household utilities, assumed increasing in each $u_i$. Standard special cases are **utilitarian** $W = \sum_i u_i$, **Bernoulli–Nash** (Cobb–Douglas in utilities) $W = \sum_i \ln u_i$, and **maximin** (Rawlsian, in the sense of the maximin criterion used in applied work) $W = \min_i u_i$. Concave transformations of the $u_i$ before summing encode inequality aversion in the social criterion, on top of whatever concavity is already in household utility.
:::

Two warnings travel with this definition. First, $W$ takes *utilities* as arguments, so the cardinal properties of $u_i$ matter: a utilitarian sum of $\ln c_i$ is not the same criterion as a sum of $c_i$. Second, Arrow's impossibility theorem (1951) says that no social *ranking* of alternatives can, in general, be derived from ordinal preference profiles while satisfying a short list of apparently mild axioms. Bergson–Samuelson welfare economics sidesteps Arrow by treating utilities as given cardinal inputs, not by aggregating ordinal ballots. Public-choice chapters return to the aggregation problem as a positive theory of voting ([[public-economics/public-choice]]).

::: proposition Utilitarian optimum with concave utility {#prop-utilitarian}
Suppose $W = \sum_i u(c_i)$ with $u$ strictly increasing and strictly concave, and $\sum_i c_i = C$ is a fixed pie. Then the unique utilitarian optimum is equal consumption $c_i = C/n$ for all $i$.
:::
::: proof
The Lagrangian is $\sum_i u(c_i) + \lambda\bigl(C - \sum_i c_i\bigr)$. The first-order condition $u'(c_i) = \lambda$ for every $i$, together with strict concavity of $u$ (so $u'$ is strictly decreasing), forces all $c_i$ equal. The second-order condition is negative definite on the constraint because $u'' < 0$.
:::

Equality of consumption here is a property of the *optimum of this W*, not a property of efficiency. If the pie $C$ depends on how it is split — because incentives matter — the same utilitarian $W$ will not in general choose full equality. That is the subject of [[public-economics/redistribution]] and [[public-economics/optimal-taxation]].

::: example Weighted utilitarianism {#ex-weighted}
A planner maximises $2\sqrt{c_A} + \sqrt{c_B}$ subject to $c_A + c_B = 100$. Find the optimum. Interpret the weights.
::: solution
First-order conditions: $2 \cdot \tfrac12 c_A^{-1/2} = \lambda$ and $\tfrac12 c_B^{-1/2} = \lambda$, so $c_A^{-1/2} = \tfrac12 c_B^{-1/2}$, hence $c_B^{1/2} = \tfrac12 c_A^{1/2}$, or $c_B = c_A/4$. Then $c_A + c_A/4 = 100$, so $c_A = 80$ and $c_B = 20$. The planner treats an extra util of $A$ as twice an extra util of $B$. Whether those weights are ethically warranted is a normative question the calculation does not answer. The allocation is efficient (the pie is exhausted) and unequal.
:::
:::

**Kaldor–Hicks compensation** is a different, and weaker, normative test: a change is an improvement if the winners *could* compensate the losers and still be better off, whether or not compensation is paid. Cost–benefit analysis of public projects often uses this test (a project with positive net present value of willingness to pay). The test can cycle, and it is silent on distribution unless compensation actually occurs. We will use Pareto and SWF criteria in this course; when we report a deadweight-loss number we are reporting a Kaldor–Hicks cost, and we will say so.

## Government failure

If market failure were sufficient for intervention, the course would be short. The agents who tax and spend are not a Bergson–Samuelson planner. They have limited information (they do not observe ability, they do not observe marginal damage without measurement, they do not observe willingness to pay for a public good). They face political constraints (they must win elections, bargain with legislatures, satisfy interest groups). They are themselves maximising something — re-election, budget, ideology — which need not be $W$. **Government failure** is the name for the resulting gap between the second-best policy of a constrained planner and the policy that institutions produce.

Three mechanisms, developed in [[public-economics/public-choice]], are enough to keep in mind now. **Voting** aggregates ordinal preferences badly: the median voter's preferred budget need not maximise any SWF, and majority rule can cycle. **Interest groups** organise more cheaply when the stakes are concentrated, so a small industry may obtain a tariff or a tax expenditure that a dispersed majority of consumers would reject if they voted on it alone. **Bureaucracy** (Niskanen's 1971 model is the textbook caricature) may maximise budget rather than surplus. None of this implies that government should do nothing; it implies that the comparison is between two imperfect institutions, not between a failed market and a perfect planner.

::: quiz
A competitive market for a private good is in equilibrium, preferences and technologies are convex, and there are no externalities. A politician proposes a subsidy "to help consumers". Which statement is correct?
- [ ] The first welfare theorem says the subsidy must raise social welfare.
- [x] The first welfare theorem says the unsubsidised equilibrium is Pareto efficient, so the subsidy cannot be a Pareto improvement; any case for it is distributional or second-best.
- [ ] The second welfare theorem says the subsidy is equivalent to a lump-sum transfer.
- [ ] Deadweight loss of the subsidy is zero because consumers gain.
::: solution
The unsubsidised competitive equilibrium is Pareto efficient by [[#thm-fwt]]. A subsidy that changes relative prices moves the allocation along a distorted budget, creating a deadweight loss; it is not a lump-sum transfer, so it is not the instrument of [[#thm-swt]]. Consumers of the good gain, producers may gain, and taxpayers lose: the net surplus falls. A distributional case for helping those consumers might still exist, but it should be compared with a less distorting transfer.
:::
:::

## The size and structure of the public sector

A useful positive decomposition of what governments spend, used by the IMF and the OECD, is:

- **Public goods and administration**: defence, justice, general public services — close to Musgrave's allocation branch for non-rival goods.
- **Human capital and social services**: education, health, housing — a mix of public goods, private goods with externalities, and in-kind redistribution.
- **Social protection**: pensions, unemployment, disability, family benefits — social insurance and redistribution, the subject of [[public-economics/social-insurance]] and [[public-economics/redistribution]].
- **Interest on public debt**: a consequence of past deficits, not a branch of its own.

In high-income countries the third item dominates the twentieth-century growth of the budget. In 1870, central government spending in what are now OECD countries was typically under 10 per cent of GDP (IMF historical public-finance series); the rise to 30–50 per cent is largely pensions, health and education, not "government consumption" in the everyday sense. Low- and middle-income countries often have small social-protection budgets and a larger share of spending on administration and public investment, with substantial off-budget activity (state-owned enterprises, regulation, directed credit) that the tax-to-GDP ratio misses.

**Fiscal federalism** asks which of these tasks sit at which level of government. Defence and monetary policy are almost everywhere central; local streets and refuse collection are almost everywhere local; education and health are split differently in France, Nigeria, India, Brazil and the United States. Charles Tiebout's 1956 argument that households sort across jurisdictions, developed in [[public-economics/public-choice]], is a positive theory of that split and, under strong assumptions, a normative one.

::: widget plot
f: 40 + 8*log(x+0.5); 22 + 4*log(x+0.5)
x: 0.5, 80
y: 15, 80
labels: \text{illustrative high-income path}; \text{illustrative middle-income path}
caption: Two schematic curves of public spending as a share of GDP against income per person (log scale on the idea, linear $x$ as a stand-in). Drag along the horizontal axis: both curves rise with income, but the levels differ — a reminder of Wagner's correlation, not a forecast and not a fitted regression. Real series differ by country and by whether transfers are included.
:::

The figure is illustrative. Empirical scatter plots of government size against GDP per capita (World Bank WDI, various years) show a positive slope among countries and a positive slope over time for most countries, with wide residuals: oil states, city-states, and social-democratic Europe sit far from any single curve. Those residuals are the stuff of political economy, not of a mechanical law.

::: application Measuring the public sector in a middle-income country
Take Brazil and Indonesia as a pair (World Bank WDI and OECD Revenue Statistics, accessed 2026). Brazil's tax-to-GDP ratio is in the low thirties, comparable to some OECD members; Indonesia's is much lower, in the low teens. Brazil's constitution assigns large pension and health mandates to the public budget; Indonesia's social insurance has expanded from a smaller base (the BPJS health scheme from 2014). Comparing "the size of government" across the two without looking at what the budget *does* — and at informal provision of the same services — is the mistake of [[#ex-budget-share]] at the scale of countries. Positive public economics starts with the instruments and the incidence, not with a single ratio.
:::

## Evidence

Several regularities are well documented and are stylised facts, not theorems.

- **Budgets grew with income and with wars.** Peacock and Wiseman (1961) documented a "displacement effect": UK public spending jumped in the world wars and did not fully recede. Similar ratchets appear in US and continental European series. The IMF Public Finances in Modern History database (Mauricio Villafuerte and others, updated through the 2020s) extends the pattern to a large country panel: the twentieth century is the century of the fiscal state.
- **The composition shifted toward transfers.** OECD Social Expenditure (SOCX) data show public social spending in many European countries above 25 per cent of GDP in the 2010s–2020s, against high-single-digit shares in Korea and Mexico. Education and health account for much of the rest of the modern budget.
- **Tax structures differ systematically.** OECD *Revenue Statistics 2024*: in 2023, Mexico's tax-to-GDP ratio was 17.7 per cent and France's 43.8 per cent. High-income countries rely more on personal income taxes and social security contributions; many lower-income countries rely more on trade taxes and a smaller VAT, in part because income is harder to observe (a theme of [[public-economics/tax-incidence]] and [[public-economics/optimal-taxation]]).
- **There is no tight link from budget size to growth in the cross-section once income and institutions are controlled for.** That sentence is a summary of a large, disputed literature, not a finding we will treat as settled. Easterly and Rebelo (1993) and subsequent work found that the *mix* of taxes and the *type* of spending (public investment versus transfers) matter more, in regressions, than the headline ratio. We will not rest a normative conclusion on that correlation.

::: history
Adam Smith's *Wealth of Nations* (1776) already listed defence, justice, and "public works and public institutions" that would not repay a private entrepreneur, as proper objects of the sovereign — an allocation-branch catalogue. Adolph Wagner wrote in the 1880s–1890s of a tendency for public activity to expand with economic development. A. C. Pigou's *The Economics of Welfare* (1920) gave the market-failure programme its language of private and social net products. Richard Musgrave's *The Theory of Public Finance* (1959) named the three branches. The public-choice counter-programme is conventionally dated to Buchanan and Tullock's *The Calculus of Consent* (1962) and to Arrow's *Social Choice and Individual Values* (1951). None of these authors claimed that a formula for a first-best tax was a description of legislatures.
:::

## Where this leads

The next two chapters take the allocation branch at its two textbook poles: [[public-economics/public-goods]], where the good is non-rival, and [[public-economics/externalities]], where a private activity spills over. [[public-economics/social-insurance]] and [[public-economics/redistribution]] turn to risk and to equity. The tax half of the course — [[public-economics/tax-incidence]], [[public-economics/efficiency-costs-of-taxation]], [[public-economics/optimal-taxation]] — is about financing whatever the expenditure side has chosen, and about the information constraints that make lump-sum taxes unavailable. [[public-economics/public-choice]] replaces the planner with voters, lobbies and federal governments. Environmental applications, including the social cost of carbon, continue in [[environmental-economics/environment-and-economy]].

::: summary
- Positive public economics describes effects and political processes; normative public economics evaluates them against an explicit criterion. Size of government is a positive fact ([[#def-positive-normative]]).
- The first welfare theorem says competitive equilibria are Pareto efficient when goods are private, markets are complete, and there is no market power or externality ([[#thm-fwt]]). Market failure is a failure of those assumptions ([[#def-market-failure]]).
- The second welfare theorem says any efficient allocation can be decentralised by lump-sum redistribution under convexity ([[#thm-swt]]). In practice, the information for lump-sum taxes is missing.
- A social welfare function ranks efficient allocations; utilitarianism with concave $u$ equalises consumption of a fixed pie ([[#prop-utilitarian]]). That is a property of $W$, not of efficiency.
- Government failure — information, voting, interest groups, bureaucracy — is the reason a market failure is not automatically a case for the policy a planner would choose.
- Cross-country budgets differ more in transfers and social insurance than in the consumption of public goods; Wagner's correlation is a stylised fact with large residuals.
:::

## Exercises

::: exercise Positive or normative {level=1}
Classify each statement as positive or normative, and say what extra ingredient would turn a positive statement into a policy recommendation. (a) A \$1 per litre petrol tax reduces petrol consumption by 8 per cent. (b) The government ought to tax petrol. (c) France's tax-to-GDP ratio exceeded Mexico's in 2023. (d) France's tax-to-GDP ratio is too high.
::: solution
(a) Positive: a claim about a behavioural response, true or false independently of values. To recommend the tax one needs a criterion (Pigouvian, revenue, distributional) and a comparison with alternatives. (b) Normative. (c) Positive (and, as of OECD *Revenue Statistics 2024*, true for 2023: 43.8 per cent versus 17.7 per cent). (d) Normative: "too high" relative to what $W$ or what constraint?
:::
:::

::: exercise Splits of a pie {level=1 check="4"}
Four people share 12 units of a private good; preferences are strictly increasing. How many of the allocations $(3,3,3,3)$, $(12,0,0,0)$, $(6,6,0,0)$, $(2,2,2,6)$ are Pareto efficient? (Enter the number of efficient allocations among these four.)
::: solution
With one good and monotonic preferences, every feasible split that exhausts the 12 units is Pareto efficient. All four listed allocations sum to 12, so all four are efficient. The answer is 4.
:::
:::

::: exercise Utilitarian arithmetic {level=1 check="50"}
A utilitarian planner maximises $\ln c_A + \ln c_B$ subject to $c_A + c_B = 100$. What is $c_A$ at the optimum? (Enter the consumption of $A$.)
::: solution
The first-order condition is $1/c_A = 1/c_B$, so $c_A = c_B = 50$.
:::
:::

::: exercise A market-power failure {level=2}
Inverse demand is $P = 12 - Q$ and a monopolist has constant marginal cost $MC = 2$. Competitive supply would be $P = 2$. Compute monopoly quantity and price, competitive quantity, and the deadweight-loss triangle. Which assumption of [[#thm-fwt]] fails?
::: hint
Monopoly sets marginal revenue equal to marginal cost. $MR = 12 - 2Q$.
:::
::: solution
$12 - 2Q = 2$ gives $Q_m = 5$, $P_m = 7$. Competitive: $12 - Q = 2$ so $Q_c = 10$, $P_c = 2$. Deadweight loss is the triangle $\tfrac12 (P_m - MC)(Q_c - Q_m) = \tfrac12 \times 5 \times 5 = 12.5$. The failed assumption is price-taking (no market power). This is a market failure in the sense of [[#def-market-failure]]; whether a regulator should force $P = MC$ depends on information, on how the firm covers fixed costs, and on the political alternative.
:::
:::

::: exercise Weighted utilitarianism again {level=2 check="75"}
Maximise $3\ln c_A + \ln c_B$ subject to $c_A + c_B = 100$. What is $c_A$? (Enter $A$'s consumption.)
::: solution
$3/c_A = 1/c_B$ and $c_B = 100 - c_A$ give $3(100 - c_A) = c_A$, so $300 = 4c_A$ and $c_A = 75$.
:::
:::

::: exercise Lump-sum versus distorting {level=2}
A competitive economy is at a Pareto-efficient equilibrium. The government wants to move from allocation $x$ to another Pareto-efficient allocation $y$ that the SWF ranks higher. Contrast a lump-sum transfer with a tax on one good as instruments, invoking [[#thm-swt]].
::: solution
[[#thm-swt]] says that, under convexity, there exist lump-sum transfers that make $y$ a competitive equilibrium: relative prices remain supporting prices for $y$, and only budgets change. A tax on one good changes relative prices, so the new equilibrium is off the frontier (a deadweight loss). Both instruments can move resources toward the people the SWF favours; only the lump-sum instrument does so without wasting surplus. The practical problem is that the lump-sum amounts needed typically depend on characteristics (ability, endowment) that the government cannot observe or cannot tax without creating an incentive to hide them.
:::
:::

::: exercise Kaldor–Hicks versus Pareto {level=2}
A project raises $A$'s willingness to pay by 12 and lowers $B$'s by 7, with no other effects. (a) Is the project a Pareto improvement? (b) Does it pass a Kaldor–Hicks test? (c) Under utilitarian $W = v_A + v_B$ with transferable utility, is it an improvement? (d) Under maximin, can you tell?
::: solution
(a) No: $B$ is worse off. (b) Yes: $A$ could compensate $B$ with 7 and still have 5. (c) Yes, if the $v_i$ are the willingness-to-pay numbers (transferable utility): $W$ rises by 5. (d) No: maximin needs the *levels* of welfare, not just the changes. If $B$ is already much better off than $A$, maximin may accept the project; if $B$ is the worse-off person, maximin rejects it.
:::
:::

::: exercise Why the first theorem fails with an externality {level=3}
A competitive industry has inverse demand $P = 20 - q$ and private marginal cost $MC = 2q$. Each unit of output imposes marginal damage $MD = q$ on a third party who is not compensated. Show that the competitive quantity is not Pareto efficient, compute the efficient quantity, and name the instrument Pigou would use. (The full analysis is [[public-economics/externalities]]; this exercise is only the first-theorem diagnosis.)
::: hint
Private equilibrium: $P = MC$. Efficiency: $P = MC + MD$.
:::
::: solution
Private: $20 - q = 2q$ so $q = 20/3$. Social marginal cost is $3q$; efficiency requires $20 - q = 3q$ so $q = 5$. At $q = 20/3 > 5$, the damage to the third party from the last unit exceeds the surplus of buyers and sellers on that unit, so a small reduction can make the third party better off by more than enough to compensate buyers and sellers — a Pareto improvement exists after compensation, and even without compensation the allocation is inefficient. Pigou's instrument is a tax of $MD(5) = 5$ per unit. The first theorem fails because a relevant good (clean air, or "not being damaged") is not priced.
:::
:::

::: exercise An SWF is not a vote {level=3}
Three people have ordinal rankings over three budgets $\{L, M, H\}$. Person 1: $L \succ M \succ H$. Person 2: $M \succ H \succ L$. Person 3: $H \succ L \succ M$. (a) Show that majority rule cycles. (b) Why does this not contradict the existence of a Bergson–Samuelson $W$? (c) In one sentence, what positive question does the cycle pose for public economics?
::: hint
Check pairwise votes $L$ vs $M$, $M$ vs $H$, $H$ vs $L$.
:::
::: solution
(a) $L$ beats $M$ (1 and 3), $M$ beats $H$ (1 and 2), $H$ beats $L$ (2 and 3): a cycle. (b) A Bergson–Samuelson $W$ is a function of *utilities*, a cardinal object chosen as a criterion; it is not derived from ordinal ballots. Arrow's theorem says you cannot get a complete, transitive social ranking from ordinal profiles while keeping Pareto, non-dictatorship and independence of irrelevant alternatives. (c) The positive question is how real institutions — agenda control, two-party competition, committees — pick a budget when majority rule does not.
:::
:::

::: exercise Reading OECD tax ratios {level=3}
OECD *Revenue Statistics 2024* reports an unweighted OECD average tax-to-GDP ratio of 33.9 per cent in 2023, Mexico 17.7 per cent, France 43.8 per cent. (a) Why is "unweighted" in the sentence? (b) Give two reasons Mexico's ratio can be lower without implying a smaller *role* of the state in Mexican lives. (c) If Wagner's correlation holds, what would you expect as Mexico's real GDP per capita converges toward the OECD mean — and why is that not a forecast this course is making?
::: solution
(a) Unweighted means each member country counts once, so Luxembourg and the United States count equally; a GDP-weighted average would be pulled toward the United States and Japan. (b) Informal production that is not in the tax base; oil and other non-tax revenue; a younger population with smaller pension budgets; tax expenditures and regulation that do not show up as tax/GDP; measurement of GDP itself. (c) The correlation would lead you to expect the ratio to rise with income, but composition (demography, politics, natural resources) can dominate, and a correlation is not a policy recommendation or a time-series forecast. This course does not forecast Mexico's tax ratio.
:::
:::
