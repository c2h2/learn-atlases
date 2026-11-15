Norway's 2024 GDP per capita at PPP was about \$102,000; Niger's was about \$2,050 (World Bank WDI). The gap is too large to be a few decades of saving rates, and it is too persistent to be a sequence of unlucky droughts. A candidate "deep cause" is **institutions**: the rules, and the organisations that enforce them, which structure property, contracts, politics and the state. A rival candidate is **geography**: climate, disease, coasts, and the distribution of domesticable plants and animals. A third is **culture**: trust, time preference, and social norms. This chapter sets out the institutional view associated with North, Acemoglu, Johnson and Robinson, the geographic view associated with Diamond, Sachs and Gallup, and the evidence each side has offered. It does not declare a winner. Corruption and state capacity are treated as parts of the same bundle, with their own measurement problems.

Long-run growth accounting is in [[economic-growth/institutions-and-growth]]; this chapter is the development-economist's version, with more politics and more of the tropics.

## What institutions are

::: definition Institutions {#def-institutions}
**Institutions**, in the sense used here, are the humanly devised constraints that structure political, economic and social interaction (North 1990): property rights, the rule of law, the form of the state, the ways rulers are selected and constrained, and the informal norms that make those rules stick. **Inclusive** economic institutions, in Acemoglu and Robinson's vocabulary, allow broad participation in markets and secure property for a wide set of people; **extractive** ones concentrate surplus in a narrow elite. The pair is a spectrum, not a binary.
:::

The hypothesis is that inclusive institutions encourage investment, innovation and the creative destruction that raises productivity, while extractive institutions encourage grabbing, and that *political* institutions — who holds power, and how it is checked — decide which economic institutions survive. The hypothesis is a claim about a causal chain, not a definition of prosperity. A country can be rich and extractive for a time (oil states, some industrialising autocracies); the claim is about the *long run* and about the *distribution* of power.

State **capacity** — the ability of the state to tax, to provide order, to run a school system, to register land — is related but not identical. Besley and Persson treat capacity as an investment the state makes; a weak state cannot protect property even if it wishes to, and a strong state can protect or prey. Corruption, below, is one way predation shows up.

::: proposition A simple expropriation model {#prop-expropriate}
A household can invest $i$ at cost $i$, producing $A i$ next period, $A > 1$. With probability $p$ the ruler expropriates the output. The household invests if $(1-p) A \ge 1$, i.e. if $p \le 1 - 1/A$. A ruler who cannot commit to a low $p$ may prefer a high $p$ today, even if that kills investment, when the ruler's horizon is short or when the ruler does not internalise the household's surplus. Secure property is, in this sketch, a *commitment* problem.
:::
::: proof
The household's expected return is $(1-p)A i - i$, linear in $i$, so investment is all-or-nothing at the threshold $p = 1-1/A$. A ruler who takes $p A i$ and discounts the future heavily prefers $p$ near 1 on whatever $i$ is already in place, and then $i = 0$ thereafter. A constitution, a rival elite, an independent court, or a ruler with a long horizon (a "stationary bandit", Olson's phrase) is a way to make $p$ small enough that $i > 0$.
:::

::: example When does investment stop? {#ex-p-star}
If $A = 1.5$, how high can the expropriation probability $p$ go before investment ceases? If a reform cuts $p$ from 0.5 to 0.2, what happens?
::: solution
The threshold is $p^\star = 1 - 1/1.5 = 1/3 \approx 0.33$. At $p = 0.5 > p^\star$ the household does not invest; at $p = 0.2 < p^\star$ it does. The reform is not a small change in a continuous $i$: it is a switch. Real investment is of course not all-or-nothing, but the extensive margin — whether a factory is built, whether a tree is planted ([[development-economics/land-and-agriculture]]) — does have a threshold flavour.
:::
:::

## Colonial origins and the reversal of fortune

Acemoglu, Johnson and Robinson (2001, *AER*) used **settler mortality** in the European colonies as an instrument for expropriation risk today. Where Europeans could settle (low mortality), they built institutions that looked more like those at home; where they could not (high mortality, the disease environment of much of West Africa and the Caribbean), they built extractive institutions around minerals and plantations. Those institutions, the argument runs, persisted, and they explain a large share of today's income differences among former colonies. The first-stage relationship between historical settler mortality and current "risk of expropriation" indices is strong in their sample; the second-stage effect of institutions on log GDP per capita is large.

The paper is famous, and it is contested. Albouy (2012) criticised the mortality data; Glaeser and others argued that settlers brought *human capital*, not only institutions; Sachs and others argued that the disease environment still operates *directly* (malaria, not only through colonial institutions). AJR (2002) added a **reversal of fortune**: among former colonies, places that were relatively urbanised and densely populated in 1500 are relatively poor today, which they read as evidence that extractive institutions were imposed where there was something to extract, against a geography-is-destiny view that would have predicted persistence of the 1500 ranking. Geography-based replies note that 1500 density was itself geographic, and that the reversal is a statement about *colonies*, not about the world.

::: warning Institutions are not a residual
It is tempting to call "institutions" whatever is left after capital, labour and measured technology in a Solow accounting. That residual is TFP, and TFP is many things (misallocation, technology, human capital quality, and yes, institutions). AJR's contribution was an *instrument*, not a new name for the residual. A cross-country regression of income on a "governance indicator" from the same year, without a design for causality, is not their paper, and it is not evidence that "institutions cause growth" rather than "growth buys better-looking indicators".
:::

::: quiz
AJR (2001) instrument expropriation risk with historical settler mortality. The exclusion restriction is that settler mortality
- [ ] is uncorrelated with expropriation risk
- [x] affects income today only through institutions, not (for example) through a persistent disease burden
- [ ] must be measured without error
- [ ] is randomly assigned by a colonial lottery
::: solution
Exclusion is the "only through" claim. A direct effect of the historical disease environment on today's health, or a human-capital channel, would violate it. Measurement error in the instrument is a different problem (it can bias 2SLS), and colonial settlement was not a lottery — that is why an instrument was used.
:::
:::

## Geography and culture

Jared Diamond's *Guns, Germs and Steel* (1997) located the long-run advantage of Eurasia in the east–west axis, the distribution of domesticable species, and the resulting head start in states and germs. Gallup, Sachs and Mellinger documented that GDP per capita is higher near coasts, lower in the tropics, and lower in malaria-endemic zones, in the late-twentieth-century cross-section. Sachs has argued that a malaria-control and infrastructure agenda follows, whether or not colonial institutions also matter. Bloom and Sachs on Africa, and the later disease-and-development literature (including the malaria-eradication studies of Bleakley, and of Cutler and others in India), treat health as a cause, not only an effect.

Culture — trust (Knack and Keefer; Tabellini; Algan and Cahuc), the Protestant ethic as a historical claim, kinship systems (Todd; later Enke), and the mission-and-education literature (Woodberry; Nunn, Wantchekon, and others on Africa) — is a third cluster. Nunn and Wantchekon (2011) found that African groups more exposed to the slave trades report lower trust today; Nunn (2008) found that slave-trade exposure predicts lower modern income. Those papers are part of the institutional-and-cultural family: a historical shock, a persistent equilibrium of mistrust or of extractive politics, a current income gap. They are not a claim that "culture is everything", and they do not make geography irrelevant.

A reasonable reading of the current literature, not a consensus, is that geography, disease, colonial history, and the resulting institutions and norms are *entangled*. Instruments that isolate one channel are scarce, and they always invite the question "does the instrument operate only through this channel?". The right response in a course is to state the designs and the objections, not to pick a camp.

::: example Malaria and income {#ex-malaria}
Two neighbouring districts, similar in colonial history, differ in malaria ecology. A campaign eradicates malaria in one district. Which outcomes, in which time frame, would you want in order to separate a *direct* health-and-productivity channel from an *institutional* channel (healthier settlers, different politics)?
::: solution
Short-run: child mortality, adult anaemia, and current labour supply — these can move before institutions do. Medium-run: human capital of the cohorts who were children during eradication (Bleakley's design). Long-run: land values, who holds office, tax collection, property-rights indices. If only the short-run health and labour outcomes move, a direct channel is sufficient to explain *those* gains. If politics and property rights also move, the campaign had an institutional echo. The neighbouring-district design holds many geographic and some historical factors fixed; it does not hold all of them fixed, and spillovers of mosquitoes and of migrants need attention.
:::
:::

::: widget plot
f: 8*(1-p)*x - x^2; (1-p)*8*x
sliders: p=0.2:0:0.7:0.05
x: 0, 8
y: -2, 20
labels: \text{household surplus}; \text{expected output}
caption: A cartoon of [[#prop-expropriate]] with a quadratic cost, surplus $(1-p)A i - i^2$ and expected output $(1-p)A i$, $A = 8$. Slide the expropriation probability $p$. Investment (the $x$ that maximises the blue curve) shrinks as $p$ rises, and at high $p$ the surplus peak is near zero. This is not a calibrated economy; it is the comparative static the institutional view relies on.
:::

## Corruption and state capacity

::: definition Corruption and leakage {#def-corruption}
**Corruption** is the use of public office for private gain. In a project, **leakage** is the gap between funds (or materials) dispatched and funds (or materials) that arrive, a quantity that can be measured by expenditure tracking or by physical audit without taking a stance on whose pocket the gap entered.
:::

Corruption is hard to measure in the large: perceptions indices (Transparency International's CPI; the World Bank's Worldwide Governance Indicators) mix experts, surveys and sometimes tautology (poor countries look corrupt because they are poor). Experience surveys (bribes actually paid) and expenditure-tracking surveys are more specific. Reinikka and Svensson (2004), on Uganda, found that a newspaper campaign which published school-grant amounts cut the leakage of funds between the ministry and the school — a finding about *information* and local monitoring, not about a national culture. Olken (2007), on Indonesian road projects, compared missing materials (by engineers' estimates) with audits and with community monitoring; official audits reduced missing expenditures more than community meetings did. These are local, identified effects. They do not say that "transparency always works" or that "audits always work".

Shleifer and Vishny (1993) distinguished centralised corruption (a bribe-maximising monopolist who internalises the damage to the tax base) from decentralised corruption (many independent bribe-takers, a tragedy of the commons). The second can be worse for investment, which matches some comparisons of East Asian high-growth states with more fragmented bribe systems. It is a theory, not a ranking of countries.

State capacity to *tax* is a development outcome as well as an input. The tax/GDP ratio in many low-income countries is in the 10–15 percent range, against 30–40 percent in rich OECD countries (IMF, UNU-WIDER Government Revenue Dataset, recent years). A state that cannot tax cannot pay teachers who show up; a state that can tax can also repress. Capacity is not a synonym for benevolence.

::: application Industrial policy and the state
Whether a country "should" run industrial policy depends, among other things, on whether the state can tell a sunrise industry from a cousin of the minister, and on whether it can shut a failure down. That is a state-capacity question, and it is why the same instrument — a directed credit line, a local-content rule — is credited in South Korea in the 1970s and blamed in other places in the same decade. The argument is taken up, still without a verdict, in [[development-economics/aid-and-policy]].
:::

::: example Settler mortality as a first stage {#ex-fs}
In a fictional cross-section of 20 former colonies, log settler mortality has a coefficient of $-0.8$ (standard error 0.2) in a regression of a property-rights index on mortality and a constant. Interpret the first stage. What would a coefficient of $0$ mean for 2SLS?
::: solution
A 10 percent higher historical mortality is associated with a $0.8 \times 0.10 = 0.08$ *lower* property-rights index (the index's units depending on how it is scaled). The $t$-statistic is 4, a strong first stage by the usual rule of thumb. A coefficient of 0 would mean the instrument does not move the endogenous regressor, 2SLS would be unidentified (or extremely noisy), and there would be no AJR design. Strength of the first stage is not the same as validity of exclusion.
:::
:::

::: example A leakage calculation {#ex-leak}
A grant of 1,000 is sent to each of 100 schools. An expenditure-tracking survey finds that schools receive 600 on average. A newspaper campaign raises the received mean to 840. What was the leakage rate before and after, and what is the recovery as a share of original leakage?
::: solution
Before: leakage $400/1000 = 40$ percent. After: $160/1000 = 16$ percent. Recovery of leakage: $240/400 = 60$ percent. Reinikka and Svensson's Ugandan figures were in this spirit (their pre-campaign leakage was even higher in the mid-1990s survey). The calculation does not say where the 160 still missing went, or whether the campaign would survive a determined counter-move by officials.
:::
:::

## Evidence, stated as evidence

Cross-country correlations: income per head is strongly associated with "rule of law" and "control of corruption" indicators, with constraints on the executive (Polity, V-Dem), and with tax/GDP. It is also associated with latitude, with malaria ecology, with coastal access, and with years of schooling. Those correlations do not identify causes.

Designs that try to: AJR's settler mortality (colonies); the reversal of fortune (colonies); Nunn's slave-trade shock (Africa); the Korean peninsula as a (not randomised) partition; the work on historical missions, on legal origins (La Porta, Lopez-de-Silanes, Shleifer, Vishny — itself contested), on India's colonial land-revenue systems (Banerjee and Iyer 2005: landlord versus non-landlord districts, with later differences in agriculture and public goods). Each design has a first stage, an exclusion restriction, and a published critique. The *pattern* that historical shocks to power and to property predict current income is hard to dismiss; the *claim* that a particular index of "institutions" is the unique channel is easier to dispute.

China's growth since 1978 is the large fact that every camp must digest. Property rights in the *firm* and in *land use* were reformed without a full liberal democracy; the state remained central; coastal geography and a diaspora were not invented in 1978. The institutional view reads 1978 as a shift toward more inclusive *economic* institutions (Township and Village Enterprises, then private firms, then WTO entry) under still-extractive *political* institutions, with a question mark over the long run. The geographic view notes the coast. The human-capital view notes the schooling stock. A serious account uses more than one of these.

::: history
Douglass North's *Institutions, Institutional Change and Economic Performance* (1990) and his earlier work with Thomas made institutions a growth topic; he shared the 1993 Nobel Prize with Fogel. Acemoglu, Johnson and Robinson's 2001 and 2002 *AER* papers, and *Why Nations Fail* (2012), are the current textbook statement of the inclusive/extractive view. Diamond (1997) and Sachs's tropical-development papers are the geographic pole. Mauro (1995) began the modern cross-country corruption-and-growth regressions; Reinikka–Svensson and Olken moved the subject into field data. Besley and Persson's *Pillars of Prosperity* (2011) is the state-capacity synthesis. The debate is not settled, and a chapter that pretends it is has stopped being a development-economics chapter.
:::

## Where this leads

Aid, conditionality, and the question of whether outsiders can *build* institutions are [[development-economics/aid-and-policy]]. Growth theory's version of the deep-causes debate is [[economic-growth/institutions-and-growth]]. Property in land is [[development-economics/land-and-agriculture]]. Measurement of income, which is the left-hand side of all of these regressions, is [[development-economics/measuring-development]].

::: summary
- Institutions are the rules and organisations that structure property, contracts and politics ([[#def-institutions]]). Inclusive versus extractive is a useful spectrum, not a binary or a residual.
- A simple expropriation model makes investment a threshold in the probability of grabbing ([[#prop-expropriate]]). Secure property is a commitment problem.
- AJR (2001) used settler mortality to instrument colonial institutions; the exclusion restriction (no direct disease channel, no human-capital-only channel) is the live objection. The reversal of fortune (AJR 2002) is evidence against a naive persistence of 1500 rankings among colonies.
- Geography (tropics, malaria, coasts) and culture (trust, slave-trade shocks) are rival or complementary channels. They are entangled with institutions in the data.
- Corruption and leakage can be measured in projects (Uganda grants; Indonesian roads) and sometimes reduced by audits and information. Perception indices are not the same object.
- China's post-1978 growth is a fact every account must face; it does not, by itself, refute or confirm any one camp.
:::

## Exercises

::: exercise A threshold $p$ {level=1 check="0.5"}
In [[#prop-expropriate]], $A = 2$. What is the highest $p$ at which the household still invests? (Enter $p^\star$.)
::: solution
$p^\star = 1 - 1/2 = 0.5$.
:::
:::

::: exercise A reform that does not bite {level=1}
If $A = 1.25$ and $p$ falls from 0.30 to 0.25, does investment start? Explain.
::: solution
$p^\star = 1 - 1/1.25 = 0.20$. Both 0.30 and 0.25 exceed 0.20, so investment remains at zero. A reform that does not cross the threshold has no extensive-margin effect in this linear-return model.
:::
:::

::: exercise Leakage {level=1 check="0.4"}
Schools are sent 1,000 and receive 600. What is the leakage rate? (Enter the fraction.)
::: solution
$400/1000 = 0.4$.
:::
:::

::: exercise Exclusion {level=2}
State, in one sentence each, the exclusion restriction in AJR (2001) and one plausible violation.
::: solution
Exclusion: historical settler mortality affects current income only through current (or persistent) institutions, not through other channels. Violation: a persistent malaria ecology that both killed settlers and still cuts today's productivity, or settlers' human capital as a separate channel from the institutions they built.
:::
:::

::: exercise Reversal of fortune {level=2}
Why is a *reversal* of the 1500 urbanisation ranking among former colonies evidence against a pure, time-invariant geography theory, and why is it not evidence against geography *altogether*?
::: solution
A pure time-invariant geography theory predicts that places that were rich (or dense) in 1500, being geographically favoured, stay rich. A reversal contradicts that. Geography can still matter: disease environments that shaped *who colonised how*, coastal access that mattered more after 1500, and soils that suited plantations are geographic facts that operate *through* colonial institutions. The reversal is evidence against "geography as a fixed ranking", not against "geography as a shaper of history".
:::
:::

::: exercise Centralised versus decentralised bribes {level=2}
In the Shleifer–Vishny sketch, why might many independent bribe-takers deter investment more than a single bribe-maximising ruler?
::: solution
A single ruler internalises that a higher bribe rate shrinks the tax (or bribe) base, and so moderates the rate — like a monopolist. Independent bribe-takers each take the base as given, and the sum of rates can exceed the monopoly rate, possibly to the point where investment collapses. That is a tragedy of the commons in predation. It is a theory of *organisation* of corruption, not a claim about any named country.
:::
:::

::: exercise China {level=3}
State one institutional reading of China's post-1978 growth, one geographic reading, and one reason neither is sufficient by itself.
::: solution
Institutional: 1978 and after shifted economic institutions toward markets, use-rights in land, and (later) private firms and trade, raising $1-p$ in the expropriation sketch without a full political transition. Geographic: the coast, the rivers, and the location next to already-industrial neighbours (Japan, later the "tigers") made export-oriented manufacturing feasible once policy allowed it. Neither is sufficient: many coastal poor countries did not grow at China's rate, and many institutional reforms elsewhere did not produce a four-decade boom. Human capital, the size of the domestic market, and the particular sequence of reforms are additional pieces. A complete account is not a single channel.
:::
:::

::: exercise An audit RCT {level=3}
Olken (2007) found that a higher probability of a central audit reduced missing road expenditures in Indonesia, while community meetings did less. Give one reason community monitoring might fail even if villagers dislike leakage, and one reason the audit result might not scale to a national anti-corruption drive.
::: hint
Think about who attends the meeting, and about general-equilibrium responses by officials.
:::
::: solution
Community meetings can be captured by local elites who share in the leakage; villagers may fear retaliation; the technical information (how much asphalt a kilometre needs) may be held by the contractor. Scaling audits: officials may learn to hide leakage in ways the original audit protocol misses; the audit agency itself may become corrupt; a national campaign changes politics, not only the probability $p$ in one district. The identified local effect is still useful: it shows that a credible increase in $p$ can move missing money. It is not, by itself, a national strategy.
:::
:::
