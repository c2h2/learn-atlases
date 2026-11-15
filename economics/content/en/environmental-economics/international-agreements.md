Sulphur dioxide from a British power station in the 1970s fell on Scandinavian lakes. Carbon dioxide from any chimney mixes in the atmosphere within months and warms every latitude. A fishery on the high seas is depleted by every fleet that sails there. These are **transboundary** externalities: the polluter and the damaged party are not inside one government's budget. A Pigouvian tax in one country, of the kind [[environmental-economics/policy-instruments]] designed, does not price the harm that falls abroad. An **international environmental agreement** is an attempt to put that missing price, or a missing quantity, into a treaty that sovereign states can leave.

This chapter treats free-riding among countries, the stability of self-enforcing agreements, carbon leakage, and the factual record of Montreal, Kyoto and Paris. Barrett's (1994) coalition model is the workhorse: the number of countries that stay in an agreement, when each can quit, is often small when the gains from cooperation are large. That is a positive result about incentives, not a finding that treaties are useless. Montreal worked on a different cost-benefit shape. Paris replaced a quantity cap with pledge-and-review. The models say why those designs are different; they do not rank them as moral projects.

Throughout, countries are $i = 1,\dots,N$, abatement is $a_i$, and global damage depends on $\sum_i e_i$. Profit and payoffs are in welfare units of the national planner; $\pi$ is not used.

## Transboundary externalities

::: definition Transboundary externality {#def-transboundary}
An externality is **transboundary** if the damaged (or benefited) parties include residents of a jurisdiction that does not control the emitting activity. A **global public bad** is the special case in which every country's emissions enter every country's damage function, as with well-mixed greenhouse gases. A **regional** transboundary pollutant (acid rain, a shared river, tropospheric ozone) damages a subset of countries.
:::

A national Pigouvian tax set at *domestic* marginal damage is too low for a global public bad: it ignores marginal damage abroad. If country $i$ has share $s_i$ of world damages and the global Pigouvian price is $\tau^*$, country $i$'s stand-alone tax is $s_i \tau^*$. With $N$ symmetric countries, $s_i = 1/N$, and stand-alone abatement is far below the cooperative level when $N$ is large.

::: proposition Non-cooperative Nash abatement {#prop-nash-abatement}
Let country $i$ have abatement cost $C_i(a_i)$, strictly convex, and let global damage be $D(\sum_j (e_j^0 - a_j))$ with $D'>0$, $D''\ge 0$. In a Nash equilibrium in abatement, $C_i'(a_i^N) = D'(\cdot) \cdot \partial S/\partial a_i$, which for a global mixing pollutant is $C_i'(a_i^N) = D'$. The cooperative (world-surplus) rule is $C_i'(a_i^*) = N \cdot D'$ in the symmetric case, or more generally $C_i'(a_i^*) = \sum_k D_k'$. Nash under-abates. Assumptions: simultaneous choice, no transfers, no treaty, interior abatement.
:::

::: proof
Country $i$ maximises $-C_i(a_i) - D_i(S)$, with $S$ the stock or the flow sum. The first-order condition equates marginal cost to *own* marginal damage. A world planner equates each country's marginal cost to the *sum* of marginal damages. With symmetry and a global public bad, that is a factor $N$.
:::

::: example Sixteen countries {#ex-sixteen}
Symmetric countries, linear MAC $C'(a) = a$, linear MD per country $d = 1$, so global MD $= N$. Nash: $a^N = 1$. Cooperative: $a^* = N$. For $N=16$, each country abates $1$ alone and $16$ together. The cooperative surplus gain per country is large, and so is the temptation to let others abate.
::: solution
Nash FOC $a = 1$. Cooperative FOC $a = 16$. World abatement $16$ versus $256$. The numbers are a cartoon of a greenhouse-gas problem with many jurisdictions: the stand-alone incentive is an order of magnitude too small. They are not a forecast of tonnes.
:::
:::

## Self-enforcing agreements

Treaties among sovereigns have no external enforcer. An agreement that a country would wish to leave, once the others stay, will be left. **Self-enforcing** means that membership is a Nash equilibrium of a membership game: each signatory prefers to stay given who else stays, and each non-signatory prefers to stay out.

::: definition Self-enforcing IEA {#def-iea}
Following Barrett (1994, *Oxford Economic Papers*) and Carraro and Siniscalco (1993), a coalition of size $k$ is **self-enforcing** if it is internally stable (no member wishes to leave) and externally stable (no outsider wishes to join). Payoffs are: coalition members play a cooperative abatement game among themselves, taking outsiders' Nash abatement as given; outsiders play Nash against the coalition. Transfers inside the coalition are allowed in some variants and not in others.
:::

::: proposition Small coalitions when gains are large {#prop-barrett}
In the standard symmetric IEA model with linear or moderately convex damage and convex abatement cost, the largest self-enforcing coalition is small (often two or three countries) when $N$ is large and the gains from full cooperation are large. When the gains from cooperation are small — because Nash is already close to cooperative — a large coalition can be stable. Assumptions: simultaneous membership, no issue linkage, no trade sanctions, symmetric countries, the payoff structure of Barrett (1994).
:::

::: proof
(Sketch.) A member who leaves a coalition of size $k$ saves her extra abatement cost and suffers the increase in damage from her own extra emissions plus the reaction of the remaining $k-1$ (who abate less once she is out). Internal stability requires that this net gain to leaving be non-positive. When damages are linear in the global total, the remaining coalition's extra abatement is a public good the leaver still enjoys, so the incentive to leave *grows* with the coalition's ambition. The $k$ that balances the two forces is typically small. When damages are very convex, or when abatement costs are linear up to a cap (Montreal-like), the coalition's abatement does not unravel as fast and larger $k$ can be stable. The result is a comparison of payoff slopes, not a theorem that "treaties fail".
:::

::: widget plot
f: N - x; 1 + 0*x
x: 1, 20
y: 0, 22
sliders: N=16:4:24:1
labels: \text{cooperative abatement } a^*=N; \text{Nash abatement } a^N=1
caption: Cartoon of [[#ex-sixteen]]: each country's cooperative abatement equals $N$, Nash abatement equals $1$. The gap $N-1$ is the gain from cooperation *and* the incentive to free-ride. Barrett's result is that a self-enforcing treaty often captures only a small part of that gap when the gap is large. Raise $N$ with the slider.
:::

Issue linkage (trade sanctions, R&D clubs), transfers, and a threat to dissolve the whole agreement if anyone leaves can support larger coalitions. They are extra instruments, and they have extra costs (trade diversion, credibility of the threat). Nordhaus's (2015, *American Economic Review*) "climate club" is a proposal to use tariffs on non-members; it is a model of linkage, not a forecast of WTO law.

## Leakage

If a coalition abates and outsiders do not, two things happen in an open economy. Carbon-intensive production can move to the outsiders (**trade leakage**). And a lower world price of oil and coal, if the coalition cuts demand, can raise outsiders' consumption (**fuel-price leakage**). The **leakage rate** is the increase in outsider emissions as a share of the coalition's cut.

::: definition Carbon leakage {#def-leakage}
**Carbon leakage** is the increase in emissions outside a climate coalition caused by the coalition's policy, as a fraction of the coalition's own emissions reduction. A rate of $0.2$ means that 20 per cent of the tonnes the coalition cuts reappear abroad. Leakage is a positive object in a trade-and-energy model. It is not a finding that unilateral policy is pointless: a rate below one still cuts world emissions.
:::

Estimates of leakage from the EU ETS and from Kyoto-period policies are typically in the range of a few per cent to around 20 per cent in ex-post industry studies, and higher in some ex-ante CGE models for energy-intensive, trade-exposed sectors (see e.g. the reviews in Fowlie and Reguant 2018, *Journal of Economic Perspectives*, and the IPCC AR6 WGIII ch. 13). The spread is a model-and-sector fact. **Border carbon adjustments** (the EU CBAM, phased in from 2023) are a policy that taxes the carbon content of imports in order to cut leakage and to protect domestic firms' competitiveness. They raise WTO-law and measurement questions this lesson does not settle. They are an application of the leakage definition, not a recommendation.

::: example A two-region cartoon {#ex-leakage}
Home abates $10$ tonnes. Foreign's emissions rise by $2$ because a steel mill moves. Leakage rate? World emissions change?
::: solution
Leakage $= 2/10 = 0.20$. World emissions fall by $8$. Unilateral policy still cuts world tonnes; it cuts them by less than the domestic inventory.
:::
:::

## Montreal, Kyoto, Paris

Three treaties, three cost-benefit shapes, three designs.

**Montreal Protocol (1987)** on ozone-depleting substances. Abatement costs, once substitutes for CFCs existed, were moderate and concentrated in a few chemical firms. Benefits (avoided skin cancer and ecosystem damage) were large and began within decades. Article 4 trade restrictions on non-parties limited leakage and raised the payoff to joining. Membership became nearly universal. Barrett (2003, *Environment and Statecraft*) treats Montreal as the case where the IEA model's "large coalition when gains are not too unevenly distributed and trade sanctions are available" applies. The ozone hole's recovery is a physical measurement (WMO/UNEP Scientific Assessment of Ozone Depletion, 2022) consistent with the treaty's cuts; it is not, by itself, a proof of the game-theoretic story.

**Kyoto Protocol (1997)** set quantity caps for Annex I countries, no caps for non-Annex I, and a 2008–2012 commitment period. The US did not ratify. Canada withdrew in 2011. The EU and others met or over-complied, in part because of the 2008 recession and because of hot air from post-Soviet collapses. World emissions rose. Kyoto is the case the Barrett model warns about: a quantity agreement that the largest emitters can sit out, with leakage and with a coalition too small to set a global price.

**Paris Agreement (2015)** replaced caps with **nationally determined contributions** (NDCs), a five-year pledge-and-review cycle, and a temperature goal ("well below $2^{\circ}\mathrm{C}$", pursue $1.5^{\circ}\mathrm{C}$). Almost every country is a party. The legal obligation is procedural (submit, report), not a tonne cap. Whether pledge-and-review closes the gap to the IPCC budgets of [[environmental-economics/climate-economics]] is an empirical question in motion: UNEP *Emissions Gap Report 2024* estimated that current NDCs put the world on a path of the order of $2.5$–$2.9^{\circ}\mathrm{C}$ of warming, with a range that depends on implementation. That is a UNEP scenario, not a forecast this atlas is making.

::: warning A treaty's legal form is not its environmental outcome
Universal membership (Paris) can coincide with a large emissions gap. Tight caps on a small coalition (Kyoto Annex I) can coincide with rising world tonnes. Montreal combined membership, trade restrictions and a favourable cost-benefit shape. Comparing the three by counting parties, or by counting tonnes in the coalition only, is the wrong comparison. World emissions, leakage and the counterfactual are the objects.
:::

::: example A factor-$N$ gap {#ex-factor-n}
$N=8$ symmetric countries, MAC $C'(a)=2a$, per-country MD $=3$. Compute Nash and cooperative abatement per country, and the ratio $a^*/a^N$.
::: solution
Nash: $2a = 3$, $a^N = 1.5$. Cooperative: $2a = 8\times 3 = 24$, $a^* = 12$. Ratio $12/1.5 = 8 = N$. With linear MD and linear MAC the gap is exactly the number of countries. That is [[#prop-nash-abatement]] in numbers.
:::
:::

::: quiz
In Barrett's standard IEA model, when the gains from full cooperation are *largest*, the self-enforcing coalition tends to be
- [ ] universal, because the treaty is valuable
- [x] small, because the incentive to leave a large ambitious coalition is then strong
- [ ] equal to $N/2$ by symmetry
::: solution
The surprising comparative static of [[#prop-barrett]]: large gains (Nash far from cooperative) make leaving a large coalition attractive. Small gains make a large coalition easy to keep. Value of cooperation and stability of cooperation are different objects.
:::
:::

::: example Free-riding in a three-country club {#ex-three-club}
Three symmetric countries. Payoffs: all three cooperate, $12$ each; a pair cooperates and the outsider free-rides, $4$ each for the pair and $13$ for the outsider; all play Nash, $1$ each. Is the grand coalition internally stable? Is a coalition of two?
::: solution
Leave the grand coalition: payoff $13 > 12$, so the grand coalition is not internally stable. Stay in a pair: $4 > 1$ (Nash), so a pair is internally stable. This is Barrett's shape: the ambitious coalition is the one a member wants to leave; a small coalition is stable. The value of full cooperation ($12$ versus $1$) is large, and that is exactly why leaving a grand coalition pays.
:::
:::

::: history
**1979, Geneva Convention on Long-Range Transboundary Air Pollution.** The first regional air-pollution treaty; later protocols (Helsinki, Oslo, Gothenburg) cut sulphur in Europe.

**1987, Montreal Protocol.** ODS phase-out with trade measures and a multilateral fund for developing countries.

**1992, UNFCCC.** The framework convention; annual COP meetings. Kyoto (1997) and Paris (2015) sit under it.

**1994, Scott Barrett.** "Self-Enforcing International Environmental Agreements" (*Oxford Economic Papers*) is the coalition-stability paper this chapter uses.

**2023, EU CBAM** begins its transitional phase. A border adjustment as a leakage instrument, still being litigated and designed.
:::

::: summary
- Transboundary externalities make a national Pigouvian tax too low. Nash abatement equates MAC to own MD; cooperation equates MAC to the sum of MDs.
- Self-enforcing IEAs, in the Barrett–Carraro–Siniscalco model, often have small stable coalitions when the gains from full cooperation are large. Linkage, transfers and sanctions are extra instruments with extra costs.
- Leakage is outsider emissions as a share of the coalition's cut. A rate below one still cuts world tonnes. Border adjustments are a leakage instrument, not a recommendation.
- Montreal, Kyoto and Paris differ in cost-benefit shape and in design (trade sanctions and substitutes; Annex I caps; pledge-and-review). Compare them on world emissions and the counterfactual, not on membership counts.
:::

## Exercises

::: exercise Nash versus cooperative {level=1 check="10"}
Symmetric linear MAC $C'(a)=a$, per-country MD $=1$, $N=10$. Report cooperative $a^*$.
::: solution
$a^* = N \times 1 = 10$.
:::
:::

::: exercise Nash abatement {level=1 check="1"}
Same parameters. Report Nash $a^N$.
::: solution
$a^N = 1$.
:::
:::

::: exercise Leakage arithmetic {level=1 check="0.15"}
Coalition cuts $40$ Mt. Outsiders rise $6$ Mt. Report the leakage rate.
::: solution
$6/40 = 0.15$.
:::
:::

::: exercise Own MD and a tax {level=2}
A country is $5\%$ of world GDP and, as a cartoon, $5\%$ of world climate damages. Global MD at the current stock is USD $200$ per tonne. What domestic carbon price equals own MD? What price would a world planner set? Why might the country still choose something in between?
::: solution
Own-MD tax $= 0.05 \times 200 = 10$ dollars per tonne. World-planner price $= 200$. In between: the country may internalise some foreign damages (altruism, reciprocity, a treaty), may care about leakage and competitiveness, or may use a higher price as industrial policy. The own-MD number is a Nash benchmark, not a prediction of legislation.
:::
:::

::: exercise Internal stability in two numbers {level=2}
A coalition of $k=3$ gives each member payoff $6$. Leaving, a member gets $7$ (Nash against a coalition of $2$). A coalition of $k=2$ gives each member $5$, and leaving that gives $4$. Which of $k=2$ and $k=3$ is internally stable?
::: solution
$k=3$: leave and get $7>6$, not internally stable. $k=2$: leave and get $4<5$, internally stable. This is the Barrett shape: the larger, more ambitious coalition is the one a member wants to leave.
:::
:::

::: exercise Montreal versus Kyoto as payoff slopes {level=2}
In two sentences, map Montreal onto "large stable coalition because the cost of joining is small once substitutes exist and non-parties can be sanctioned", and Kyoto onto "small effective coalition because the largest emitters can sit out a quantity cap". Do not conclude that one treaty was wise.
::: solution
Montreal: once CFC substitutes were commercial, $C'(a)$ was moderate, benefits were domestic as well as global (ozone overhead), and Article 4 sanctions lowered the payoff to sitting out, so internal and external stability could hold at large $k$. Kyoto: the quantity cap bound a subset of emitters, the US and later Canada could sit out, and leakage plus non-Annex I growth meant world tonnes were not the coalition's tonnes. The same IEA model generates both stories by changing cost, benefit and sanction parameters.
:::
:::

::: exercise Leakage and a border tax {level=3}
Home has a carbon price $\tau$, Foreign has $\tau=0$. Home production of steel falls, Foreign's rises. A border tax on the carbon content of steel imports, at Home's $\tau$, is introduced. Using a two-region partial-equilibrium sketch, what happens to Home output, Foreign output, Home consumption, and world emissions, if steel is homogeneous and Foreign does not retaliate? Name one assumption whose failure would reverse a piece of that.
::: hint
The border tax is a tariff on carbon content. It raises the price of imports and of Home sales at home; it does not tax Home exports unless a rebate is added.
:::
::: solution
Without a rebate on exports, the border tax protects Home sales *at home* (Home output for domestic consumption rises relative to the no-CBAM carbon price) and does not help Home exports. Foreign output for export to Home falls. Home consumption of steel falls if the consumer price rises. World emissions: leakage into Foreign's *export* sector falls; Foreign's *own* consumption of steel may rise if world prices change. Net world emissions typically fall relative to a carbon price without CBAM, but the sign on Foreign's total output is a parameter. If Foreign retaliates with its own tariff, Home's terms of trade and output can fall. If steel is differentiated, pass-through is incomplete. If the carbon content is mis-measured, the tax is just a tariff.
:::
:::

::: exercise Paris as a repeated game {level=3}
Pledge-and-review can be read as a repeated game in which NDCs are cheap talk plus a public signal, and in which future pledges can "punish" a miss. Using [[game-theory/repeated-games]] and cheap talk from [[game-theory/signalling]], what is required for review to raise abatement above Nash, and what would make it babbling?
::: solution
For review to matter, (i) a miss must be observable enough to condition future play (MRV — monitoring, reporting, verification), (ii) future play must have a punishment or a reward that the country cares about (access to finance, club goods, reputational payoffs, a climate club tariff), and (iii) the punishment must be credible, i.e. a subgame-perfect continuation. If pledges are cheap talk, preferences over others' actions do not depend on type, and no continuation value is at stake, the unique equilibrium is babbling: NDCs are ignored and abatement is Nash. Paris's design bets on (i)–(iii) being at least partly present. UNEP gap reports are evidence on *outcomes*, not on whether (ii) and (iii) hold.
:::
:::
