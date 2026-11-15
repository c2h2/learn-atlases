In 2024, DAC members' official development assistance was \$212 billion, 0.33 percent of their combined GNI, down 7 percent in real terms from 2023 — the first drop after five years of growth (OECD, preliminary ODA 2024). Four countries (Denmark, Luxembourg, Norway, Sweden) met the United Nations 0.7 percent target. The United States was the largest donor in dollars; much of the 2022–23 bulge had been in-donor refugee costs and aid to Ukraine. These flows are smaller than remittances to many recipient countries, smaller than private capital to the ones that attract it, and larger than the government budget of some of the poorest. Whether they raise growth, whether they improve the lives of the poor, and whether they should be replaced by trade, by industrial policy, or by nothing, are live disputes. This chapter sets out the arguments and the evidence, including the randomised-evaluation programme, without picking a side.

The institutions that aid tries, sometimes, to build are in [[development-economics/institutions-and-governance]]. The projects that RCTs evaluate — deworming, credit, fertiliser — are in the earlier micro chapters. What is new here is the *macro* of aid, the *strategy* of development policy, and the *method* of learning what works.

## What aid is, and the first-generation debate

**Official development assistance (ODA)** is, in the DAC definition, government (or official) flows to developing countries and multilateral agencies with a concessional character and the promotion of economic development and welfare as the main objective. It is not FDI, it is not remittances, and it is not military aid (though the boundary has been political). Humanitarian aid is a subset; budget support, project aid, technical assistance and debt relief are others.

The **financing-gap** tradition, from the Harrod–Domar model through the two-gap model of Chenery and Strout, treated aid as the foreign savings that close the gap between required investment and domestic saving (or between required imports and export earnings). If the incremental capital-output ratio is $v$ and the growth target is $g$, required investment is $v g$ of GDP, and aid fills $vg - s$. Easterly (2001, *The Elusive Quest for Growth*) documented that the implied relationship between aid and growth did not show up as a stable fact, and that the ICOR is not a structural constant. That is a critique of a particular planning arithmetic, not of every dollar of aid.

::: definition Aid effectiveness question {#def-aid}
The **aid-effectiveness question** is whether, and under what conditions, ODA raises growth, reduces poverty, or improves non-income outcomes, relative to a well-specified counterfactual, after accounting for who receives aid (endogenous allocation) and for what aid does to domestic politics (incentives, Dutch disease, accountability).
:::

Two poles structured the 2000s public debate. Jeffrey Sachs (*The End of Poverty*, 2005; the Millennium Villages) argued for a big push: enough aid, well targeted at agriculture, health, education and infrastructure, to lift countries out of a poverty trap. William Easterly (*The White Man's Burden*, 2006) argued that planners lack the knowledge and the incentives, that searchers who are accountable to the poor do better than plans, and that the historical record of aid-to-growth is weak. A middle, associated with the World Bank's *Assessing Aid* (Burnside and Dollar, 2000) and with later critiques, asked whether aid works *in good policy environments*. Roodman, Easterly, Levine and Roodman's replications, and a large subsequent literature, found that the Burnside–Dollar interaction is fragile to specification. There is no robust, uncontested cross-country coefficient that says "one percent of GDP in aid raises growth by $x$ points".

Micro evidence is sharper because the counterfactual is sharper: deworming, CCTs, bednets, some pedagogies, as in [[development-economics/human-capital]]. The leap from "this project had a treatment effect" to "national ODA raises growth" is the leap the rest of this chapter is about.

::: example A financing gap {#ex-gap-aid}
A planner uses $v = 3$ and wants $g = 0.05$. Domestic saving is $s = 0.10$ of GDP. How large is the implied aid gap? If $v$ is actually 5, what happens to the gap?
::: solution
Required investment is $vg = 0.15$ of GDP; the gap is $0.15 - 0.10 = 0.05$ of GDP. If $v = 5$, required investment is $0.25$ and the gap is $0.15$ of GDP. A more pessimistic ICOR triples the implied aid need. If, in addition, aid does not translate one-for-one into investment (consumption, capital flight, a rising ICOR as the easy projects are done), the arithmetic is not a forecast of growth. Easterly's critique is that this arithmetic was used as if it were.
:::
:::

::: warning Aid is not a randomised treatment at the country level
Countries that receive more aid are, on average, poorer, more conflict-affected, and more aligned with donors' politics. OLS of growth on aid/GDP is therefore not an estimate of $\partial g/\partial \text{aid}$. Instrumental-variables strategies (colonial ties, population, a donor's budget) have been used and have been criticised. A well-identified *project* RCT is not a well-identified *country* aid effect. Keep the two objects apart.
:::

## Trade strategies and industrial policy

A second live dispute is how a poor country should relate to the world economy. The **Washington Consensus**, as John Williamson named a 1989 list, emphasised macroeconomic discipline, outward orientation, and market allocation. Import-substituting industrialisation (ISI), associated with Latin America in the 1950s–70s and with parts of Africa and South Asia, used tariffs, licences and state firms to build industry behind a wall. East Asian **export-oriented** industrialisation used a different mix: undervalued real exchange rates, export discipline, directed credit, and, in Korea and Taiwan, a state that picked sectors and then forced them to compete abroad (Amsden; Wade; the later synthesis in Rodrik). China's post-1978 path combined special economic zones, a growing private sector, and a still-central state.

::: definition Industrial policy {#def-ip}
**Industrial policy** is a deliberate government attempt to shift the sectoral composition of production, typically toward manufactures or toward "new" activities, using tariffs, subsidies, credit, public investment, procurement or regulation. It is a *means*. Whether it raises productivity, and whether it is captured, are empirical questions, not parts of the definition.
:::

The case *for* industrial policy, in Rodrik's and in Justin Yifu Lin's versions, is market failure: learning-by-doing that is not internalised, coordination failures (no steel plant because no users, no users because no plant), and informational externalities from discovering what a country is good at (Hausmann and Rodrik). The case *against*, in the Krueger and later Washington-Consensus versions, is government failure: officials cannot pick winners, picked firms lobby to keep protection, and the fiscal and corruption costs exceed the learning gains. Both cases can be true in different places. South Korea in the 1970s is the exhibit for the first; a number of ISI experiences in Latin America and Africa are exhibits for the second. China's size, sequence and politics make it a poor template for a small African economy and a hard case for any simple rule.

Trade itself — the gains from comparative advantage, the costs of protection, global value chains — is the subject of [[international-trade]]. The development-policy question is whether *deviating* from static comparative advantage, temporarily, is how today's rich countries became rich (Chang's historical argument) and whether today's poor countries can repeat that deviation in a WTO world with China already occupying the factory floor ([[development-economics/structural-change]] on premature deindustrialisation).

::: proposition Infant-industry logic {#prop-infant}
Suppose a firm's unit cost falls with cumulative output, $c(Q)$, $c' < 0$, and the world price is $p$. If $c(0) > p$ but $c(Q^\star) < p$ for some reachable $Q^\star$, a *temporary* tariff or subsidy that covers the losses until $Q^\star$ can raise domestic surplus, provided the discounted learning gains exceed the discounted cost of protection *and* the policy is actually withdrawn at $Q^\star$. If the firm (or its workers) can lobby, the temporary policy may become permanent, and the second proviso fails.
:::
::: proof
(Sketch.) Without protection the firm does not start, because early units lose money. With a subsidy $s_t = c(Q_t) - p$ until $c = p$, the firm produces, $Q$ grows, and $c$ falls. Social NPV is the integral of $p - c(Q)$ after the learning period minus the integral of $c(Q) - p$ during it, discounted. That NPV can be positive. Time-inconsistency: at every $t$ with $c(Q_t) > p$ the firm wants the subsidy to continue, and if the government cannot commit, the path that was used to justify the policy is not the path that is followed. Krueger's rent-seeking cost is an extra term in the NPV, possibly large.
:::

::: example A learning schedule {#ex-infant}
Unit cost is $c(Q) = 12 - 0.02 Q$ for $Q \le 200$, then $8$. The world price is $10$. At what $Q$ does the firm become competitive, and why is a permanent tariff of 2 not the same object as a subsidy that expires at that $Q$?
::: solution
$12 - 0.02 Q = 10$ at $Q = 100$. A subsidy that expires at $Q = 100$ (or a tariff that is announced to expire and does) is an infant-industry policy. A permanent tariff of 2 keeps the firm in business after $c = 8$, generating a deadweight loss on every subsequent unit and a rent for the firm. The two policies agree in the first 100 units and disagree forever after. Histories in which "temporary" protection lasted decades are histories of the second policy.
:::
:::

::: quiz
Rodrik's case for industrial policy rests on
- [ ] the claim that governments always pick winners
- [x] identified market failures (learning, coordination, information) plus a state capable of discipline
- [ ] the Washington Consensus list of 1989
- [ ] the finding that aid never works
::: solution
The case is a market-failure case, and Rodrik is explicit that state capacity and the ability to cut off failures are part of the design. It is not a claim of official omniscience, not Williamson's 1989 list, and not a statement about ODA.
:::
:::

## Randomised evaluations as a policy method

The 2019 Nobel Prize to Banerjee, Duflo and Kremer recognised a method: take a policy that can be assigned at the person, school, village or clinic level, randomise, measure, and publish. The method has produced a body of evidence that this course has used — deworming, CCTs, microcredit, fertiliser, remedial pedagogy. It has limits, and those limits are now themselves a literature (Deaton; Pritchett and Sandefur; the "external validity" debate; general-equilibrium critiques).

::: definition Local average treatment effect {#def-late}
In an RCT with imperfect compliance, the **local average treatment effect (LATE)** is the average effect of treatment on *compliers* — those who take the treatment if and only if they are assigned to it — under the usual IV assumptions (random assignment, exclusion, monotonicity). It is not, without further assumptions, the average treatment effect (ATE) in the population, nor the effect of treating *everyone*, nor the effect of treating a different population.
:::

Limits, stated as limits rather than as dismissals:

- **External validity.** A trial in western Kenya is a trial in western Kenya. Transporting the estimate requires a theory of why the effect is what it is (Cartwright; Deaton) or a multi-site design.
- **General equilibrium.** A scholarship for 200 students does not raise teacher wages; a national scholarship might. A job programme for 500 people does not flood a labour market; a national one might (Crépon, Duflo, Gurgand, Rathelot, Zamora on France; related worries in development).
- **Political economy.** Ministries that agree to randomise are selected. A result that depends on an NGO's implementation quality may not survive a ministry's.
- **The question asked.** RCTs answer "does this programme, implemented like this, have this effect on these people?". They do not, by themselves, answer "should this country industrialise?" or "should the aid budget be doubled?". Pritchett's critique is that the big questions are not always partitionable into small randomised ones.

The reply, associated with Banerjee, Duflo, Kremer, and with the "experimentation plus theory" programme, is that a *sequence* of trials, in several countries, with a model in between, is how one generalises, and that many "big" policies are in fact bundles of small ones. Both the limits and the reply can be true. The responsible use of a trial is to state the LATE, the sample, the implementation, and the GE and political caveats.

::: widget hypothesis
test: z
tail: two
alpha: 0.05
effect: 0.2
n: 200
caption: Power in a two-arm experiment. The effect size is in standard deviations (Cohen's $d$). With $n = 200$ per arm and $d = 0.2$ (a smallish effect, typical of many education trials), power is modest: the test will often miss a real effect. Raise $n$ or the effect, or switch the tail. Underpowered trials that "find nothing" are not evidence of a zero; they are evidence of a wide confidence interval. See also [[causal-inference/randomised-experiments]].
:::

::: example Power arithmetic {#ex-power}
For an unpooled two-sample $z$-test of a difference in means, with equal arms, variance 1, two-sided $\alpha = 0.05$ and power 80 percent, $n$ per arm is about $2 \times (1.96+0.84)^2 / d^2 \approx 15.68 / d^2$. How many people per arm are needed for $d = 0.2$ and for $d = 0.1$?
::: solution
The constant is $2 \times 2.80^2 = 15.68$. For $d = 0.2$, $n \approx 15.68 / 0.04 = 392$ per arm. For $d = 0.1$, $n \approx 15.68 / 0.01 = 1{,}568$ per arm. Small effects on noisy outcomes (test scores, consumption) need large samples. A trial of 200 people per arm is well powered for $d = 0.5$ ($n \approx 63$) and underpowered for $d = 0.2$.
:::
:::

::: example Conditionality as a contract {#ex-cond}
A donor offers 200 million dollars if a government cuts a tariff, and 0 otherwise. The government's political cost of the cut is 150 million in equivalent units, and the social gain from the cut (in the donor's valuation) is 300 million. Will the government cut the tariff? What happens if the political cost is 250 million?
::: solution
If the government gets the 200 only upon cutting, it will cut when $200 - 150 > 0$, i.e. when the transfer exceeds the political cost. At a cost of 250 it will not cut, and the donor spends 0. Conditionality "works" when the money exceeds the political cost and the donor actually withholds the money on non-compliance. If the donor cannot commit to withhold — a time-inconsistency that shows up in several aid relationships — the government takes the money and skips the cut. The numbers are illustrative; the logic is a participation constraint plus a commitment problem.
:::
:::

## Putting the pieces together

A reasonable, non-partisan summary of the current evidence, not a manifesto:

- Some *targeted* interventions, cheap and tested, have high expected returns in health and in some learning programmes. That is a case for doing those things, with adaptation, not a case for any particular aid volume.
- Cross-country aid-to-growth regressions have not delivered a stable coefficient. That is a case for humility about "aid buys growth", not a proof that every dollar is wasted.
- Industrial policy has a coherent market-failure rationale and a coherent government-failure critique. Historical successes exist; so do expensive failures. State capacity ([[development-economics/institutions-and-governance]]) is part of the difference.
- Trade openness is associated with growth in a large class of episodes (East Asia; India after 1991; Eastern Europe after 1989) and with adjustment costs for particular groups. The gains-from-trade theorems of [[international-trade]] are not a distributional statement.
- RCTs are the right tool for a class of questions and the wrong tool for another class. Using them for the first and not pretending they answer the second is the professional norm this course recommends as a *methodological* stance, not as a political one.

::: application Millennium Villages and the missing counterfactual
The Millennium Villages Project, associated with Sachs, implemented a package of interventions in selected African villages. Evaluations have been contested: the project did not randomise, comparison villages were added later, and some reported gains (in malaria, in agriculture) are hard to separate from regional trends (see the debate involving Clemens, Demombynes, and the MVP team in the early 2010s). The episode is a lesson in *design*: a package can in principle be evaluated, but a package without a pre-specified counterfactual will not convince people who wanted a counterfactual. It is not, by itself, a lesson that packages cannot work.
:::

::: history
The World Bank (1944, Bretton Woods) and the colonial development and welfare acts are the institutional start of official aid; Truman's Point Four (1949) is the American start. Rosenstein-Rodan's big push (1943) and Nurkse, then Rostow's *Stages of Economic Growth* (1960), are the intellectual ancestors of Sachs. Bauer, then Easterly, are the ancestors of the scepticism. Williamson (1990) labelled the Washington Consensus; Rodrik's papers of the 2000s and *One Economics, Many Recipes* (2007) are the standard statement of the diagnostic, industrial-policy middle. Banerjee and Duflo's *Poor Economics* (2011) and the 2019 Nobel Prize marked the experimental turn. OECD DAC statistics, the World Bank's *Poverty and Shared Prosperity* / *Poverty, Prosperity and Planet* reports, and the IMF's surveillance are the current data infrastructure. The arguments these people had are still the arguments.
:::

## Where this leads

This is the last chapter of the course. The tools it has used — poverty measures, dualism, human capital, missing markets, institutions, and identification — are the tools of the rest of the atlas's global and policy sequence: [[international-trade]], [[international-finance]], [[public-economics/role-of-government]], [[causal-inference/randomised-experiments]]. Development economics does not end with a policy recipe. It ends with the ability to read a claim — about aid, about a factory, about a trial — and to say what would have to be true for the claim to hold.

::: summary
- ODA is a defined official flow (\$212 billion from DAC members in 2024, 0.33 percent of GNI). It is not the same as remittances or FDI, and it is allocated non-randomly.
- The financing-gap model is an accounting identity plus a constant ICOR; it is not a robust causal model of aid and growth (Easterly). Sachs and Easterly are poles of a debate that cross-country regressions have not settled.
- Industrial policy has an infant-industry logic ([[#prop-infant]]) and a time-inconsistency and capture problem. East Asian successes and various ISI failures are both in the record. Neutrality here means stating both.
- RCTs identify a LATE ([[#def-late]]) under stated assumptions. External validity, general equilibrium and political economy are the limits. Underpowered "nulls" are not zeros.
- Cheap, tested health and education interventions can have high micro returns without answering the "aid and growth" question. Keep project evidence and country evidence labelled as such.
:::

## Exercises

::: exercise A financing gap {level=1 check="0.05"}
$v = 3$, $g = 0.05$, $s = 0.10$. What is the implied aid/GDP gap $vg - s$? (Enter the fraction of GDP.)
::: solution
$0.15 - 0.10 = 0.05$.
:::
:::

::: exercise DAC arithmetic {level=1}
If DAC GNI is 64 trillion dollars and ODA is 0.33 percent of it, what is ODA in billions? Compare with the \$212 billion figure in the text (the two need not match exactly; GNI is a round number here).
::: solution
$0.0033 \times 64{,}000 = 211.2$ billion dollars, in the same range as the OECD's 212.
:::
:::

::: exercise Infant-industry $Q$ {level=1 check="100"}
$c(Q) = 12 - 0.02 Q$, $p = 10$. At what $Q$ does $c = p$? (Enter $Q$.)
::: solution
$12 - 0.02 Q = 10$, $Q = 100$.
:::
:::

::: exercise LATE in words {level=2}
A microcredit RCT has 40 percent take-up in the treatment group and 5 percent in the control group (some control households borrow from other NGOs). Who are the compliers, and whose effect is *not* identified?
::: solution
Compliers are those who borrow when offered the programme loan and not otherwise — about 35 percent of the sample, under monotonicity. Always-takers (the 5 percent) and never-takers (the 60 percent who refuse the offer) do not contribute to LATE. The ATE for the whole population is not identified without assumptions about those groups.
:::
:::

::: exercise Why Burnside–Dollar is fragile {level=2}
Burnside and Dollar (2000) found that aid $\times$ "good policy" predicted growth. State two specification choices that later replications showed the result was sensitive to.
::: solution
The list, in the replications (Easterly, Levine, Roodman; Roodman): the sample of years and countries (whether 1990s observations are in), the definition of the policy index, outliers (a few African observations), and whether aid is lagged or contemporaneous. Fragility means that reasonable, pre-specifiable alternatives move the interaction from significant to not. It does not mean the interaction is false; it means the cross-country design does not pin it down.
:::
:::

::: exercise A permanent tariff {level=2}
In [[#ex-infant]], after $Q = 100$, $c = 8$ and $p = 10$. A permanent tariff of 2 is left in place. Who gains, who loses, and why is this not the infant-industry optimum?
::: solution
The firm earns a rent of 2 per unit (domestic price 12, cost 8, or, if the tariff brings domestic price to 12, the usual surplus analysis: producer surplus up, consumer surplus down, deadweight loss). Consumers of the good lose. The infant-industry optimum, in [[#prop-infant]], *withdraws* protection at $Q^\star$. A permanent tariff is ordinary protection, justified, if at all, on other grounds (terms of trade, revenue, politics), not on learning.
:::
:::

::: exercise GE versus PE {level=3}
A job-training RCT in one city finds a 6 percentage-point gain in employment for trainees, with no drop in the control group's employment. A ministry scales the programme to 20 percent of the urban youth labour force. Why might the national employment effect be smaller than 6 points, even if the trial was internally valid?
::: hint
Think about vacant jobs and about wages.
:::
::: solution
In the trial, trainees are a drop in the labour market; they take jobs that would have gone to someone else only to a negligible extent. At scale, if the number of jobs is not perfectly elastic, trainees displace others (including the original control-type youth), wages may fall, and the *net* employment gain is smaller than the LATE. The trial's "no effect on controls" is a statement about a small treatment, not about a 20 percent treatment. Crépon et al. is the reference design that randomises *intensity* across markets to see this.
:::
:::

::: exercise Design a test of aid and institutions {level=3}
A donor is considering budget support to a government, hoping to "buy reform". Using this chapter and [[development-economics/institutions-and-governance]], state one reason the money might improve public goods, one reason it might delay reform, and one design (not necessarily randomised) that would help you tell the difference after five years.
::: solution
Improve: the government is cash-constrained, the money pays teachers and drugs, and a complementary information campaign cuts leakage ([[development-economics/institutions-and-governance#ex-leak]]). Delay: the money relaxes the need to tax elites, weakening the bargain that builds a tax state (a fiscal version of the "resource curse"), or it pays a patronage network. Design: pre-specify outcomes (tax/GDP, an audit-based leakage measure, a service-delivery indicator such as teacher presence), a comparison set of countries or districts that did not receive budget support, and a time window; difference-in-differences with a pre-trend check, or a synthetic control, is the realistic tool at this level. Randomising budget support across countries is not on the table. Honesty about the design's remaining threats (who was selected for support) is part of the answer.
:::
:::
