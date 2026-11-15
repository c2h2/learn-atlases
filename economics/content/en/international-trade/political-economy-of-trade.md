The last chapter showed that a small-country tariff shrinks the national pie and that a large-country tariff can enlarge it only by shrinking someone else's, with a world pie that is still smaller. Yet tariffs, quotas, local-content rules and subsidies are ordinary facts of commercial policy, in high-income and low-income economies alike. This chapter asks *why*. The answers are of two kinds, and they should be kept apart. **Positive** answers treat protection as an equilibrium of political markets: concentrated winners, diffuse losers, lobbies, voters. **Normative** answers treat protection as a (claimed) correction of some other distortion: infant industries, externalities, strategic profit-shifting in oligopoly. The positive answers are the chapter's core. The normative answers are live disputes; competing theories and the evidence on each side are stated, and the chapter does not award a verdict.

Distributional costs are not an embarrassment to the gains-from-trade theorems. They are the raw material of the positive theory. Stolper–Samuelson, specific factors and Melitz exit each name a group that loses from opening and that can be organised. Whether those groups *should* be compensated, protected, or left to adjust is a value judgement plus a judgement about the cost of the instruments. The chapter will name the trade-offs and will not collapse them into a recommendation.

## Protection as political equilibrium

Producer gains from a tariff are concentrated; consumer losses are diffuse. Mancur Olson's *The Logic of Collective Action* (1965) is the political-science statement of that arithmetic: small groups with large stakes organise more cheaply than large groups with small stakes. Import-competing firms and their unions know who they are; the consumers who pay a few extra units of money per shirt generally do not form a tariff lobby. Export-oriented firms and their workers are a second concentrated group, on the other side. The pattern of protection in the data — higher tariffs and more anti-dumping in heterogeneous, declining, labour-intensive industries, lower in parts and in exports — is consistent with this, though it is also consistent with terms-of-trade motives (Grossman and Helpman 1994, 1995; Goldberg and Maggi 1999; Broda, Limão and Weinstein 2008).

::: definition Protection-for-sale objective {#def-pfs}
Grossman and Helpman (1994) let a government choose a vector of tariffs to maximise a weighted sum of social welfare $W$ and political contributions $C$ from organised industries:

$$
G = a\, W + C, \qquad a \ge 0.
$$ {#eq-pfs}

Organised sectors (those that overcome Olson's free-rider problem) bid for protection; unorganised sectors do not. The equilibrium tariff on an organised import-competing sector is *higher* the smaller is $a$ (the less the government weighs welfare), the larger is the sector's output, and the smaller is the import-demand elasticity — because a given tariff then creates more surplus to be captured and less DWL. Unorganised sectors may even be taxed (negative protection) to the extent that this raises $W$ or cheapens inputs for organised downstream firms.
:::

::: proposition Median-voter tariff {#prop-mayer}
In a 2 × 2 HO economy with majority voting over a tariff, and with voters who differ only in their factor ownership, Mayer (1984) shows that the equilibrium tariff is the one preferred by the median owner of the scarce factor. If the median voter is scarce-factor-intensive relative to the country's endowment (more labour-rich than the mean, in a capital-abundant country), the median voter wants a positive tariff on the labour-intensive import good. Assumptions: one-dimensional policy, majority rule, no lobbying, HO distributional effects ([[international-trade/heckscher-ohlin#thm-ss]]).
:::

::: proof Sketch.
Stolper–Samuelson maps the tariff into a real-return change for each factor. A voter's indirect utility is increasing in the tariff if and only if she is abundant in the scarce factor relative to the mean. The median of that distribution is decisive under majority rule. In a capital-abundant country the scarce factor is labour; a median voter who looks more like a worker than like a capitalist votes for a tariff on labour-intensive imports.
:::

The two models are complements. Mayer is a voter model; Grossman–Helpman is a lobby model. Goldberg and Maggi (1999), estimating [[#eq-pfs]] on US non-tariff barriers in 1983, found a large $a$ (the government weighs welfare heavily) but still a significant role for organisation. Subsequent estimates vary. The empirical literature does not claim that *only* politics, or *only* terms of trade, explain the pattern of protection; it claims that both have a detectable role, and that the small-country DWL of the last chapter is not, by itself, a prediction that tariffs will be zero.

::: example A lobby's stake {#ex-lobby}
In the small-country example of [[international-trade/tariffs-and-quotas#ex-tariff]], a tariff $t=1$ raised producer surplus by $6.25$ and cut consumer surplus by $9.375$, with revenue $1.25$ and DWL $1.875$. There are 5 producers and 10 000 consumers. Compute the stake per producer and per consumer. Why, on Olson's logic, is a producer lobby more likely than a consumer lobby?
::: solution
Per producer: $6.25/5 = 1.25$. Per consumer: $9.375/10\,000 \approx 0.00094$. The producer's stake is more than a thousand times the consumer's. Organising five firms is cheap relative to organising 10 000 buyers of a good they may not even know is imported. Revenue is a further political object: it can be spent, or promised, in ways that buy additional support. DWL is unowned and has no lobby.
:::
:::

::: example Median voter in a 2 × 2 sketch {#ex-mayer}
A capital-abundant country has 100 voters. 60 own only labour, 40 own only capital. The imported good is labour-intensive. Under majority rule over a single tariff, does the Mayer median voter want a positive tariff? What if 55 voters own capital and 45 own labour?
::: solution
The scarce factor is labour. 60 labour-only voters want a tariff by Stolper–Samuelson; 40 capital-only voters want free trade (or an import subsidy). The median voter is a labour owner, so the equilibrium tariff is positive. If the split is 55 capital / 45 labour, the median is a capital owner and the Mayer tariff is zero (or negative). The example is stark — real voters own mixed portfolios — but it is [[#prop-mayer]] in a headcount.
:::
:::

::: widget plot
f: a*(6-30*(x-0.05)^2) + 10*x
sliders: a=1.5:0.2:5
x: 0, 0.45
y: 0, 16
labels: \text{government objective } G
caption: A Grossman–Helpman-style objective $G = a W(t) + C(t)$, with $W$ peaking near free trade and $C$ rising in the tariff (the $10x$ term is the organised sector's bid). Raise $a$ (the welfare weight): the peak of $G$ slides left, toward a lower tariff. That is [[#def-pfs]] in a picture. The figure is schematic, not an estimated $G$.
:::

::: warning National welfare is not the government's objective
A common slip, once [[international-trade/tariffs-and-quotas#prop-small-tariff]] is on the board, is to infer that observed tariffs are "mistakes" which a better-informed government would correct. In [[#def-pfs]] they are *equilibrium*, given $a$ and the set of organised groups. Reducing tariffs then requires changing $a$, changing organisation costs, or changing the set of feasible instruments (a trade agreement that ties the government's hands, next chapter). Treating every tariff as a miscalculation of DWL is a category error: some are, some are the price of staying in office, and the data do not sort them for us.
:::

## Infant industries and learning

The oldest normative case for protection is that a new industry, which would have a comparative advantage once established, cannot get started because of a distortion: capital-market failure, a learning externality, or coordination. John Stuart Mill stated the argument; Charles Bastable added that the discounted future gains must cover the discounted present DWL (the **Mill–Bastable test**). Baldwin (1969) is the modern critique: if the distortion is in the capital market, the first-best instrument is in the capital market; if the learning is internal to the firm, the firm will invest in it without a tariff; if the learning spills over, a production subsidy aimed at the spillover dominates a tariff, which also distorts consumption.

::: proposition Infant-industry logic and its instrument ranking {#prop-infant}
Suppose an industry's marginal cost will fall permanently if current output is higher (learning by doing), and suppose some of that learning spills over to other firms (a positive externality). Then:

1. Free trade produces too little of the good today relative to a social planner who internalises the spillover.
2. A production subsidy aimed at the spillover, financed by a lump-sum tax, can implement the planner's output without distorting consumer prices.
3. A tariff can raise output too, but it also drives a wedge between consumer prices and world prices, adding the consumption DWL of [[international-trade/tariffs-and-quotas#prop-small-tariff]].
4. If there is *no* spillover and capital markets are complete, the firm captures the learning and no instrument is needed.

Assumptions: the learning function is known; the government can commit to remove the instrument once the externality is internalised; there is no retaliation. Relaxing commitment is the political-economy objection: infant industries rarely admit to having grown up (Baldwin 1969; Krueger and Tuncer 1982).
:::

::: proof
(1) is the definition of a positive production externality. (2) is the targeting principle (Bhagwati and Ramaswami 1963; Dixit 1985): use the instrument that acts directly on the distorted margin. (3) follows because a tariff is a production subsidy *plus* a consumption tax. (4) is the absence of a distortion. Without commitment, the second-period government still faces the lobby of [[#def-pfs]], so the instrument need not expire.
:::

::: example A Mill–Bastable sketch {#ex-bastable}
Protection would cost a DWL of 12 per year for 4 years. From year 5 onward the industry, now competitive, would yield a social surplus of 6 per year relative to never having been protected. At a zero discount rate, does the project pass Bastable? At a high enough discount rate, why might it fail even though Mill's "eventual comparative advantage" holds?
::: solution
Undiscounted: cost $48$, benefit an infinite stream of $6$, which any zero (or low) discount rate accepts. Mill's test is passed: the industry will have a comparative advantage from year 5. Bastable discounts the distant $6$s. If the discount rate is high, the present value of $6$ from year 5 on can fall below $48$. Infant-industry success in the Mill sense is not sufficient. The numbers are illustrative; real discount rates and real learning paths have to be measured, which is one of Baldwin's objections.
:::
:::

The evidence is mixed and is reported as such. East Asian industrialisation in Korea and Chinese Taipei combined export discipline with selective credit and some infant protection; the counterfactual (would they have grown as fast without the selectivity?) is not observed, and the literature has not converged (Westphal 1990; Rodrik 1995; Noland and Pack 2003). Latin American import-substituting industrialisation, 1950s–80s, produced a mixed record of industrial deepening and of high-cost, capital-intensive plants behind high ERPs, with a subsequent wave of liberalisation (Brazil, Argentina, Chile, Mexico) whose local labour-market costs were the subject of [[international-trade/specific-factors]]. China's post-1978 growth combined opening, foreign investment, and a large remaining role for industrial policy; attributing the growth to any one of those is a live dispute, not a settled decomposition. Melitz (2005) and subsequent dynamic heterogeneous-firm models show that a *temporary* tariff can, on paper, raise welfare if learning is strong and commitment is credible; they also show that the same instrument can lower welfare if entry is excessive or if the tariff lasts. The models clarify the assumptions. They do not read the history.

## Strategic trade policy

Brander and Spencer (1985) considered two firms, Home and Foreign, competing à la Cournot in a third market. A Home export subsidy can, in that model, shift oligopoly rents toward the Home firm, at Foreign's expense, and can raise Home welfare if the rent-shifting exceeds the fiscal cost. Eaton and Grossman (1986) showed that the sign of the optimal instrument *flips* under Bertrand competition (a tax, not a subsidy). Krugman (1987), "Is Free Trade Passé?", set out the argument and its fragility: the government needs to know the form of competition, the number of firms, the entry conditions, and the general-equilibrium opportunity cost of the resources, and it needs to commit without triggering equivalent Foreign policy.

::: definition Strategic export subsidy {#def-brander-spencer}
In the Brander–Spencer (1985) third-market Cournot model, a Home subsidy $s$ per unit exported shifts the Home firm's reaction function out, raising Home output and lowering Foreign output. Home welfare (Home profit minus the fiscal cost) can rise if the Foreign firm is left producing with a mark-up, so that the output that moves carries rent. Assumptions: Cournot, a third-market demand, no Home consumption of the good, no entry, no Foreign retaliation, and a known cost structure.
:::

::: example Rent-shifting in a sketch {#ex-cournot-rent}
Two Cournot firms, Home and Foreign, face third-market demand $p = 12 - Q$, with $Q = q_H + q_F$ and zero marginal cost. Without a subsidy the Nash outputs are $q_H = q_F = 4$, $p = 4$, profit $16$ each. A small Home subsidy that raises $q_H$ by $1$ and, along Foreign's reaction, cuts $q_F$ by $1/2$ (the Cournot slope) moves rent. Explain in words why Home's *profit minus subsidy cost* can rise, and why the calculation is not a licence to subsidise.
::: solution
The extra Home unit is sold at a price still above Home's marginal cost (here zero), so it earns a margin; part of that extra output replaces Foreign output that was also earning a margin — the rent shift. The subsidy cost is a transfer from Home treasury to the Home firm except insofar as it is paid on inframarginal units. Brander–Spencer is this arithmetic. It is not a licence because: demand and costs are rarely this clean; Bertrand flips the sign; entry can dissipate the rents; Foreign can subsidise too; Home may consume the good (so consumer surplus enters); and the government of [[#def-pfs]] will be lobbied to pay the subsidy whether the arithmetic works or not.
:::
:::

The Airbus–Boeing dispute is the stock illustration. Airbus received launch aid; Boeing argued that this was a subsidy that shifted rents; the EU argued that Boeing received equivalent support through military and NASA contracts. WTO panels in the 2010s found elements of prohibited or actionable subsidy on both sides (DS316, DS353). The episode is consistent with a world in which governments *try* to shift rents in a two-firm industry. It is not a demonstration that either country's policy raised that country's welfare, because the counterfactual (no aid, no military spillovers, different entry) is not observed, and because the fiscal cost and the opportunity cost of engineers are not in the panel reports. Irwin and Pavcnik (2004) and related studies of launch aid find mixed welfare numbers that depend on the assumed form of competition — which is Eaton and Grossman's point.

::: quiz
The Brander–Spencer export subsidy raises Home welfare in their Cournot third-market model. Which change of assumption can reverse the sign of the optimal instrument?
- [ ] Making the country small in the Ricardian sense
- [x] Switching from Cournot to Bertrand competition (Eaton and Grossman 1986)
- [ ] Raising the foreign firm's cost
- [ ] Rebating the subsidy as a lump sum to Home households
::: solution
Eaton and Grossman (1986): under Bertrand, the optimal strategic instrument is typically a tax, because prices are strategic complements. Smallness in Ricardo is a different model (no oligopoly rents). The Home firm's cost advantage affects the *size* of rents, not the Cournot-versus-Bertrand sign. The rebate is already in the welfare definition (profit minus fiscal cost, with the fiscal cost a transfer among Home agents except for the rent-shifting).
:::
:::

## Industrial policy: competing views

**Industrial policy** — a deliberate government attempt to shift the composition of production toward activities deemed to have extra social value — is a broader object than a tariff. It includes subsidies, credit, public procurement, local-content rules, and state enterprises. The case for it, in the tradition of Rosenstein-Rodan, Hirschman and more recently Rodrik (2004, 2008), is that coordination failures, learning externalities and information externalities (the social value of discovering what a country is good at) are not fully priced, and that a government which is close enough to the private sector to learn, and disciplined enough to cut off failures, can raise welfare. The case against, in the tradition of Baldwin, Krueger, and much of the Washington-consensus literature of the 1990s, is that the same government is the government of [[#def-pfs]]: it is lobbied, it cannot commit, it does not know the spillovers, and the instruments it actually uses (tariffs, directed credit to incumbents) fail the targeting test of [[#prop-infant]].

The evidence does not deliver a single number. Korea's Heavy and Chemical Industry drive (1973–79) mixed spectacular subsequent exporters with expensive failures; the export-discipline interpretation (firms that did not export lost support) is one reading, the comparative-advantage-following interpretation another (Noland and Pack 2003; Lane 2022 is a recent attempt to estimate the HCI's long-run effects). Japan's postwar MITI is similarly disputed. Several African and Latin American industrial policies of the same vintage did not produce East Asian results, which is either evidence that the East Asian state was different or evidence that the policy was not the cause. The US CHIPS and Science Act of 2022 and the EU's counterpart, and China's longer-running industrial policy in electronics and electric vehicles, are too recent for a completed evaluation; they are mentioned as instances of the instrument, not as scored successes or failures.

This course's job is to make the assumptions visible. If the distortion is a learning spillover, [[#prop-infant]] ranks a targeted production subsidy above a tariff. If the distortion is oligopoly rent in a third market, [[#def-brander-spencer]] applies and is fragile. If there is no distortion, [[international-trade/tariffs-and-quotas#prop-small-tariff]] applies. If the government maximises [[#eq-pfs]] rather than $W$, none of the normative rankings is a prediction of what will be chosen. Readers who come to the chapter with a prior that industrial policy "works" or "does not work" will not find that prior confirmed; they will find the conditions under which a model says it would.

::: application Trade Adjustment Assistance
The United States' Trade Adjustment Assistance (TAA), the European Globalisation Adjustment Fund, and similar programmes are the political-economy counterpart of [[international-trade/specific-factors#thm-sf-gains]]: an attempt to make the potential Pareto improvement actual. Evaluations of TAA (for example, Autor, Dorn and Hanson 2013's finding that transfers offset only a fraction of local earnings losses; David, Dorn, Hanson and Song on disability as a de facto adjustment programme) suggest that the instruments in use are not Dixit–Norman commodity-tax packages. They are a mix of training, extended unemployment insurance and, in practice, disability and place-based decline. Whether expanding TAA would raise the political feasibility of trade agreements is a positive question (some evidence from Maggi and Ossa on the political economy of agreements); whether it *should* is a value judgement about the weights on losers, not a theorem of this chapter.
:::

::: intuition Why the DWL does not lobby
The two triangles of the last chapter are a loss to no named person. The producer rectangle has a name and an address. Political equilibrium, in Olson, Mayer and Grossman–Helpman, is the conversion of those named rectangles into policy, with the triangles as a by-product. A trade agreement, in the next chapter, is a technology for making the triangles *and* the foreign rectangles (the terms-of-trade losses imposed on partners) visible to the governments that would otherwise ignore them.
:::

::: history
**1848, John Stuart Mill**, the infant-industry exception in *Principles of Political Economy*. **1890s, Friedrich List** (posthumously influential) and the American System, the developmental-state tradition. **1965, Mancur Olson**, concentrated benefits. **1969, Robert Baldwin**, the infant-industry critique. **1984, Wolfgang Mayer**, the median-voter tariff. **1985, James Brander and Barbara Spencer**, strategic export subsidies. **1994, Gene Grossman and Elhanan Helpman**, "Protection for Sale". The empirical literature on the China shock (Autor, Dorn and Hanson 2013 and after) re-opened the distributional politics of trade in high-income countries; it did not settle the industrial-policy dispute.
:::

## Where this leads

If protection is a prisoner's dilemma among large countries, or a commitment problem of a government against its future lobbies, then a **trade agreement** can raise welfare by changing the game. That is Bagwell and Staiger's (1999, 2002) terms-of-trade theory of the GATT, and it is the last chapter. If protection is a correction of a domestic distortion, the agreement has to leave room for the instrument (GATT Article XVIII, the Agreement on Subsidies, "green box" agricultural support) — which is why the legal texts are not a simple prohibition. The chapter has not recommended a tariff, a subsidy, or a ban on either. It has named who wants them, what they do under stated assumptions, and where the evidence is mixed.

::: summary
- Producer gains from protection are concentrated; consumer losses are diffuse. Olson, Mayer's median voter ([[#prop-mayer]]) and Grossman–Helpman's protection-for-sale ([[#def-pfs]]) are the positive models of why tariffs exist despite small-country DWL.
- Infant-industry protection requires a distortion (typically a learning spillover), passes a Mill–Bastable test, and is dominated by a targeted production subsidy if the subsidy is available ([[#prop-infant]]). Commitment to sunset is the political-economy difficulty. The East Asian and Latin American histories are mixed.
- Strategic trade policy can shift oligopoly rents under Cournot and can reverse sign under Bertrand ([[#def-brander-spencer]]). It demands information governments may not have. Airbus–Boeing is an illustration of the attempt, not a welfare proof.
- Industrial policy is a live dispute: coordination and learning externalities on one side, information, commitment and lobbying on the other. This chapter states both and does not score current statutes.
- Adjustment programmes are the practical counterpart of compensation theorems; their coverage is incomplete in the data.
:::

## Exercises

::: exercise Olson's arithmetic {level=1}
A tariff creates \$10 million of producer surplus, \$14 million of consumer loss, \$3 million of revenue and \$1 million of DWL. There are 20 firms and 2 million consumers. Compute the stake per firm and per consumer.
::: solution
Per firm: $10/20 = 0.5$ million. Per consumer: $14/2 = 7$ dollars (14 million over 2 million people). The firm's stake is larger by a factor of about $70\,000$. Revenue is a political resource; DWL has no owner.
:::
:::

::: exercise Who votes for a tariff {level=1}
In Mayer's HO median-voter model, a capital-abundant country imports the labour-intensive good. Which voters want a tariff, and why, using Stolper–Samuelson?
::: solution
A tariff raises the relative price of the labour-intensive good and, by [[international-trade/heckscher-ohlin#thm-ss]], raises the real wage and lowers the real rental. Labour-intensive voters want the tariff; capital-intensive voters do not. The median voter decides.
:::
:::

::: exercise Protection for sale {level=1}
In [[#eq-pfs]], what happens to the equilibrium tariff on an organised import-competing sector as $a$ rises? Interpret $a$.
::: solution
The tariff falls toward the welfare-maximising level (zero for a small country, $t^*$ for a large one). $a$ is the weight on social welfare relative to contributions: a more "welfare-minded" government, or a government less in need of contributions, sells less protection.
:::
:::

::: exercise Targeting {level=2}
A learning spillover exists in a manufacturing industry. Rank a tariff, a production subsidy, and a capital-market reform that removes a credit constraint, using [[#prop-infant]] and the targeting principle. State the assumption about government information that this ranking needs.
::: solution
If the distortion is a credit constraint, first-best is in the capital market. If it is a learning spillover, a production subsidy dominates a tariff (the tariff adds a consumption DWL). The ranking assumes the government *knows* which distortion is present and can administer the subsidy. If it does not, the political-economy models apply and the ranking is not a prediction.
:::
:::

::: exercise Cournot versus Bertrand {level=2}
State the Brander–Spencer result and Eaton and Grossman's qualification in one sentence each. Why does this pair of results make a practitioner cautious?
::: solution
Brander–Spencer: a Cournot third-market subsidy can raise Home welfare by shifting rents. Eaton–Grossman: under Bertrand the optimal instrument typically changes sign. A practitioner who does not know the form of competition does not know the sign of the intervention; "strategic trade policy" is not a robust recommendation even inside oligopoly models.
:::
:::

::: exercise Mill–Bastable {level=2}
An infant industry would impose a DWL of 10 per year for 5 years, then yield a surplus of 8 per year forever relative to never having been protected. The real discount rate is 10 per cent per year. In qualitative terms, what does the Bastable test ask you to compare? (Do not compute the present values unless you wish to; state the criterion.)
::: solution
The present value of the post-learning surplus stream must exceed the present value of the DWL stream. Mill asks whether the industry will have a comparative advantage eventually; Bastable asks whether that is *worth* the discounted DWL. A 10 per cent discount rate makes the five years of 10 costly relative to a distant stream of 8; the test can fail even if the industry "succeeds" in the mill sense.
:::
:::

::: exercise Estimating $a$ {level=3}
Goldberg and Maggi (1999) estimate a large $a$ in [[#eq-pfs]] on 1983 US data. If $a$ is large, why is there still a role for lobbies in the fitted model, and what would a test that *$a=\infty$* (pure welfare maximisation) have found?
::: hint
Even a large $a$ leaves a first-order role for contributions if organisation varies across sectors.
:::
::: solution
A large but finite $a$ means welfare weighs heavily *and* contributions still shift tariffs on the margin, especially in organised sectors with inelastic import demand. Pure welfare maximisation ($a=\infty$) would predict tariffs at the small-country zero (or the large-country $t^*$) *independent of organisation*. Goldberg and Maggi reject that: organisation still predicts protection. The finding is "politics plus a lot of welfare weight", not "politics only" and not "no politics".
:::
:::

::: exercise Commitment {level=3}
Explain, using [[#def-pfs]] and [[#prop-infant]], why a government that *wants* a temporary infant-industry tariff may fail to remove it. How can a trade agreement (next chapter) be a commitment device against that failure?
::: solution
Once the industry exists, it is an organised lobby in Grossman–Helpman; $C$ now bids for continuation even if the spillover is gone. The second-period government with $a < \infty$ sells some continuation. A trade agreement that binds the tariff (a WTO binding, a preferential schedule) raises the cost of continuation — legally, and by putting Foreign export interests into the game — and can implement the sunset the first-period government could not. That is a *commitment* use of agreements, distinct from the terms-of-trade use. Both are in Bagwell and Staiger's account.
:::
:::

::: exercise China shock politics {level=2}
Autor, Dorn and Hanson (2013) find concentrated local losses from import competition. Map this onto specific-factors losers and onto Olson. Why might the *national* consumer gain not produce an equally strong pro-trade lobby?
::: solution
The losers are owners of factors trapped in import-competing places and industries — a concentrated, geographically clustered group, cheap to organise (or to mobilise electorally). The consumer gain is a few units of money per good spread across the whole population, including people who do not know the origin of what they buy. Olson's arithmetic, plus the geography of the specific-factors model, predicts an asymmetric politics even when the national pie grows. That is a positive statement about who shows up; it is not a finding that the consumer gain is small.
:::
:::

::: exercise Scoring industrial policy {level=3}
A commentator says: "Korea proves industrial policy works; Latin America proves it fails." Using the chapter's discussion, give one reason each experience is hard to read as a proof, and state the targeting principle that would still apply if a government decided to intervene.
::: solution
Korea: the counterfactual (growth without HCI selectivity, given high saving, education and export access) is not observed; export discipline may have been the operative ingredient rather than the sectoral picks; failures were expensive. Latin America: ISI mixed with macroeconomic instability, overvalued currencies and low export discipline, so attributing the outcome to "industrial policy" as a single treatment is not identified. If a government still intervenes, [[#prop-infant]] says: identify the distortion, use the instrument that hits that margin, and prefer a production subsidy to a tariff for a learning spillover. The principle is a ranking of instruments, not a licence to ignore [[#def-pfs]].
:::
:::
